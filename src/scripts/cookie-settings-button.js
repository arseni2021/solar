document.querySelectorAll('[data-open-cookie-settings]').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.ecosolarCookieSettings?.open();
  });
});
