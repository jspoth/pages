#!/usr/bin/env python3
"""Content-hash cache-busting for the shared nav.js/common.css/dark.css.

Idempotent -- safe to run on every commit even when nothing changed. Hashes
each source file's current bytes, writes a copy under the hashed name if it
doesn't already exist, deletes stale hashed copies of that same source, and
rewrites every reference in every TRACKED HTML page to match.

Deliberately scoped to `git ls-files` for the HTML pass, not a filesystem
glob -- this directory has untracked/WIP pages (e.g. draft writeups not
ready to publish) that must never be touched or staged by this script or
the pre-commit hook that calls it. A blind glob + `git add -A` would pull
those into the very next commit and push them live.
"""
import glob
import hashlib
import os
import re
import subprocess

_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# source filename -> extension (used to build the "stem.hash.ext" pattern)
_ASSETS = {
    "nav.js": "js",
    "common.css": "css",
    "dark.css": "css",
}


def _hash_file(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]


def _tracked_html_files() -> list:
    out = subprocess.run(
        ["git", "ls-files", "*.html"], cwd=_ROOT, capture_output=True, text=True, check=True,
    )
    return [os.path.join(_ROOT, name) for name in out.stdout.splitlines() if name]


def main() -> None:
    mapping = {}  # source filename -> current hashed filename
    for source_name, ext in _ASSETS.items():
        stem = source_name[: -(len(ext) + 1)]
        digest = _hash_file(os.path.join(_ROOT, source_name))
        new_name = f"{stem}.{digest}.{ext}"
        mapping[source_name] = new_name

        new_path = os.path.join(_ROOT, new_name)
        if not os.path.exists(new_path):
            with open(os.path.join(_ROOT, source_name), "rb") as src, open(new_path, "wb") as dst:
                dst.write(src.read())

        for old_path in glob.glob(os.path.join(_ROOT, f"{stem}.*.{ext}")):
            if os.path.basename(old_path) != new_name:
                os.remove(old_path)

    changed = []
    for html_path in _tracked_html_files():
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()
        original = content
        for source_name, new_name in mapping.items():
            stem, ext = source_name.rsplit(".", 1)
            pattern = re.compile(r"/" + re.escape(stem) + r"(?:\.[0-9a-f]{8})?\." + ext + r"\b")
            content = pattern.sub("/" + new_name, content)
        if content != original:
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(content)
            changed.append(os.path.basename(html_path))

    for source_name, new_name in mapping.items():
        print(f"{source_name} -> {new_name}")
    if changed:
        print(f"updated references in: {', '.join(changed)}")


if __name__ == "__main__":
    main()
