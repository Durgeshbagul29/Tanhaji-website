// Optional GA4 loader + event helper. Does nothing until gaMeasurementId is set in site-config.js.
(function () {
  var id = (window.TANHAJI_CONFIG || {}).gaMeasurementId;
  window.dataLayer = window.dataLayer || [];
  window.trackEvent = function (name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  };
  if (id && /^G-[A-Z0-9]+$/.test(id)) {
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(tag);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
  // Count clicks on store buttons (Google Play, App Store, Steam, Amazon)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.href, store = null;
    if (h.indexOf('play.google.com') > -1) store = 'google_play';
    else if (h.indexOf('apps.apple.com') > -1) store = 'app_store';
    else if (h.indexOf('store.steampowered.com') > -1) store = 'steam';
    else if (h.indexOf('amazon.com') > -1) store = 'amazon';
    if (store) window.trackEvent('store_click', { store: store, link_url: h });
  });
})();
