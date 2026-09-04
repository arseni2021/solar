document.querySelectorAll('[data-calc]').forEach((calc) => {
  const consumInput = calc.querySelector('[data-calc-consum]');
  const tarifInput = calc.querySelector('[data-calc-tarif]');
  const ctaEl = calc.querySelector('[data-calc-cta]');

  function update() {
    if (!ctaEl) return;
    const url = new URL(ctaEl.getAttribute('href'), window.location.origin);
    if (consumInput.value) url.searchParams.set('consum', consumInput.value);
    if (tarifInput.value) url.searchParams.set('tarif', tarifInput.value);
    ctaEl.setAttribute('href', url.pathname + url.search + url.hash);
  }

  consumInput.addEventListener('input', update);
  tarifInput.addEventListener('input', update);
});
