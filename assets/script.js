(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const year = document.querySelector('#current-year');
  const savedTheme = localStorage.getItem('pc-theme');
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (systemDark ? 'dark' : 'light');
  if (year) year.textContent = String(new Date().getFullYear());
  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('pc-theme', nextTheme);
  });
  menuButton?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded','false');
  }));
  const items=document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{threshold:.10});
    items.forEach(item=>observer.observe(item));
  } else items.forEach(item=>item.classList.add('visible'));
})();
