const STORAGE_KEY = 'ecosolar-cookie-consent';
const loaded = { ga4: false, clarity: false, bing: false };

function hasReal(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, necessary: true, ts: Date.now(), v: 1 }));
  } catch {}
}

function loadGA4(ga4Id) {
  if (loaded.ga4 || !hasReal(ga4Id)) return;
  loaded.ga4 = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ga4Id);
}

function loadClarity(clarityId) {
  if (loaded.clarity || !hasReal(clarityId)) return;
  loaded.clarity = true;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', clarityId);
}

function loadBingUet(bingUetTagId) {
  if (loaded.bing || !hasReal(bingUetTagId)) return;
  loaded.bing = true;
  window.uetq = window.uetq || [];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://bat.bing.com/bat.js';
  s.onload = function () {
    if (window.UET) {
      window.uetq = new window.UET({ ti: bingUetTagId });
      window.uetq.push('pageLoad');
    }
  };
  document.head.appendChild(s);
}

function applyConsent(consent, ids) {
  if (consent.analytics) {
    loadGA4(ids.ga4Id);
    loadClarity(ids.clarityId);
  }
  if (consent.advertising) {
    loadBingUet(ids.bingUetTagId);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('ecosolar-cookie-banner');
  if (!banner) return;

  const ids = {
    ga4Id: banner.dataset.ga4Id,
    clarityId: banner.dataset.clarityId,
    bingUetTagId: banner.dataset.bingUetId,
  };

  const bannerView = banner.querySelector('[data-cookie-view="banner"]');
  const panelView = banner.querySelector('[data-cookie-view="panel"]');
  const analyticsToggle = banner.querySelector('[data-cookie-toggle="analytics"]');
  const advertisingToggle = banner.querySelector('[data-cookie-toggle="advertising"]');

  function showBanner() {
    banner.classList.remove('hidden');
    bannerView.classList.remove('hidden');
    panelView.classList.add('hidden');
  }

  function showPanel() {
    const current = readConsent() || { analytics: false, advertising: false };
    analyticsToggle.checked = !!current.analytics;
    advertisingToggle.checked = !!current.advertising;
    banner.classList.remove('hidden');
    bannerView.classList.add('hidden');
    panelView.classList.remove('hidden');
  }

  function hideBanner() {
    banner.classList.add('hidden');
  }

  banner.querySelector('[data-cookie-accept-all]').addEventListener('click', function () {
    const consent = { analytics: true, advertising: true };
    writeConsent(consent);
    applyConsent(consent, ids);
    hideBanner();
  });

  banner.querySelector('[data-cookie-reject-all]').addEventListener('click', function () {
    const consent = { analytics: false, advertising: false };
    writeConsent(consent);
    hideBanner();
  });

  banner.querySelector('[data-cookie-customize]').addEventListener('click', showPanel);
  banner.querySelector('[data-cookie-back]').addEventListener('click', showBanner);

  banner.querySelector('[data-cookie-save]').addEventListener('click', function () {
    const consent = { analytics: analyticsToggle.checked, advertising: advertisingToggle.checked };
    writeConsent(consent);
    applyConsent(consent, ids);
    hideBanner();
  });

  const existing = readConsent();
  if (existing) {
    applyConsent(existing, ids);
  } else {
    showBanner();
  }

  window.ecosolarCookieSettings = { open: showPanel };
});
