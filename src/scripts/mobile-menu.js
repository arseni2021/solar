const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
btn?.addEventListener('click', () => {
  const isHidden = menu?.classList.contains('hidden');
  menu?.classList.toggle('hidden');
  btn.setAttribute('aria-expanded', String(!!isHidden));
});
