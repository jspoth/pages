// Runs synchronously — sets theme before first paint to prevent flash
(function () {
  var t = localStorage.getItem('theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

function toggleTheme() {
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  var btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', function () {
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
