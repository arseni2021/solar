document.querySelectorAll('form.request-form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const successEl = form.querySelector('.form-success');
    const errorEl = form.querySelector('.form-error');
    successEl?.classList.add('hidden');
    errorEl?.classList.add('hidden');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        successEl?.classList.remove('hidden');
      } else {
        errorEl?.classList.remove('hidden');
      }
    } catch {
      errorEl?.classList.remove('hidden');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
