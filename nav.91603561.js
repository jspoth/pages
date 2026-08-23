// Sets theme + nav-collapsed state before first paint to prevent flash
(function () {
  var t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  var n = localStorage.getItem('navCollapsed') === '1' ? 'collapsed' : 'expanded';
  document.documentElement.setAttribute('data-nav', n);
  var icon = document.createElement('link');
  icon.rel = 'icon'; icon.type = 'image/svg+xml'; icon.href = '/favicon.svg';
  document.head.appendChild(icon);
})();

function toggleTheme() {
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  var btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}

function toggleNavCollapsed() {
  var collapsed = document.documentElement.getAttribute('data-nav') === 'collapsed';
  document.documentElement.setAttribute('data-nav', collapsed ? 'expanded' : 'collapsed');
  localStorage.setItem('navCollapsed', collapsed ? '0' : '1');
  var btn = document.getElementById('nav-collapse-toggle');
  if (btn) btn.textContent = collapsed ? '❮' : '❯';
}

// Home first, then projects newest-added first.
var NAV_LINKS = [
  { href: '/',                    label: 'Home'                  },
  { href: '/model-router.html',   label: 'LLM Router'            },
  { href: '/music.html',          label: 'AI for Music'          },
  { href: '/blast-radius.html',   label: 'Blast Radius Analyzer' },
  { href: '/cost-optimizer.html', label: 'Cost Optimizer'        },
  { href: '/chat.html',           label: 'Cost Insights'         },
  { href: '/dr.html',             label: 'DR'                    },
  { href: '/lessons.html',        label: 'Where AI Got It Wrong' },
];

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  nav.innerHTML = '';
  var path = window.location.pathname;

  // Logo
  var logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'logo';
  logo.textContent = 'JP';
  nav.appendChild(logo);

  // Desktop-only sidebar collapse toggle (hidden on mobile via CSS,
  // where the hamburger below already handles show/hide)
  var collapseBtn = document.createElement('button');
  collapseBtn.id = 'nav-collapse-toggle';
  collapseBtn.onclick = toggleNavCollapsed;
  collapseBtn.setAttribute('aria-label', 'Toggle sidebar');
  collapseBtn.textContent = document.documentElement.getAttribute('data-nav') === 'collapsed' ? '❯' : '❮';
  nav.appendChild(collapseBtn);

  // Checkbox toggle — CSS-only mobile menu trigger
  var toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.id = 'nav-toggle';
  nav.appendChild(toggle);

  // Hamburger label
  var hamburger = document.createElement('label');
  hamburger.setAttribute('for', 'nav-toggle');
  hamburger.className = 'nav-hamburger';
  hamburger.textContent = '☰';
  nav.appendChild(hamburger);

  // Page links — must follow toggle for sibling selector to work on mobile
  NAV_LINKS.forEach(function (link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    if (path === link.href || (link.href.length > 1 && path === link.href.replace('.html', ''))) {
      a.style.color = '#2980b9';
    }
    nav.appendChild(a);
  });

  // Contact — points to #contact section if present, else mailto
  var u = 'jspotharaju', d = 'gmail.com';
  var contact = document.createElement('a');
  contact.id = 'contact-nav';
  contact.textContent = 'Contact';
  contact.href = document.getElementById('contact') ? '#contact' : 'mailto:' + u + '@' + d;
  nav.appendChild(contact);

  // Theme toggle button
  var btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.onclick = toggleTheme;
  btn.setAttribute('style', 'background:none;border:none;cursor:pointer;font-size:1.1em;padding:0;margin-left:8px;vertical-align:middle;line-height:1;');
  btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  nav.appendChild(btn);
});
