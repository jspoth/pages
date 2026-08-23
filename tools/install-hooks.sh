#!/bin/sh
# One-time setup: copies tools/pre-commit (the tracked source) into
# .git/hooks/pre-commit (not tracked by git, so this has to be run once
# per clone/machine). Re-run this if tools/pre-commit itself changes.
set -e
cd "$(dirname "$0")/.."
cp tools/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo "Installed pre-commit hook -> .git/hooks/pre-commit"
