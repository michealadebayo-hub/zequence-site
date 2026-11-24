// Cookie consent: Google Analytics loads only after the visitor accepts.
// Pages define window.dataLayer / gtag() as a queue before this script runs.
(function () {
  var GA_ID = 'G-DZF2RX40V1';
  var KEY = 'zq-cookie-consent'; // 'granted' | 'denied'
  var loaded = false;

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function clearAnalyticsCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') === 0) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  function closeBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;
    var el = document.createElement('div');
    el.id = 'cookie-banner';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie choices');
    el.className = 'fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 text-sm text-gray-700 shadow-panel';
    el.innerHTML =
      '<p class="font-bold text-night">Cookies</p>' +
      '<p class="mt-2 leading-6">We use optional analytics cookies (Google Analytics) to understand how the site is used. ' +
      'They are only set if you accept. See our <a href="privacy.html" class="font-semibold text-cobalt underline">privacy policy</a>.</p>' +
      '<div class="mt-4 flex flex-wrap gap-3">' +
      '<button type="button" data-consent="granted" class="rounded-full bg-night px-5 py-2.5 font-bold text-white transition hover:bg-cobalt">Accept analytics</button>' +
      '<button type="button" data-consent="denied" class="rounded-full border border-line px-5 py-2.5 font-bold text-night transition hover:border-cobalt hover:text-cobalt">Reject</button>' +
      '</div>';
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      var choice = btn.getAttribute('data-consent');
      setChoice(choice);
      if (choice === 'granted') {
        loadAnalytics();
      } else {
        clearAnalyticsCookies();
        if (loaded) { location.reload(); return; }
      }
      closeBanner();
    });
    document.body.appendChild(el);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    showBanner();
  });

  if (getChoice() === 'granted') {
    loadAnalytics();
  } else if (getChoice() !== 'denied') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
