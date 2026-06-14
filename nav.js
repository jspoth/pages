// Runs synchronously — sets theme before first paint to prevent flash
(function () {
  var t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
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

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('nav');
  if (nav) {
    var logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'logo';
    logo.textContent = 'JP';
    nav.insertBefore(logo, nav.firstChild);

    var toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.id = 'nav-toggle';
    nav.insertBefore(toggle, logo.nextSibling);

    var hamburger = document.createElement('label');
    hamburger.setAttribute('for', 'nav-toggle');
    hamburger.className = 'nav-hamburger';
    hamburger.textContent = '☰';
    nav.insertBefore(hamburger, toggle.nextSibling);
  }

  var u = 'jspotharaju', d = 'gmail.com';
  var contact = document.getElementById('contact-nav');
  if (contact) {
    if (document.getElementById('contact')) {
      contact.href = '#contact';
    } else {
      contact.href = 'mailto:' + u + '@' + d;
    }
  }

  var btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent =
    document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';

});
