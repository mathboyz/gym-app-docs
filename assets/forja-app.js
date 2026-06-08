/* ===========================================================================
   Forja APP — chrome móvil. Inyecta la bottom tab bar desde data-app-tab del
   <body>. El tema (claro/oscuro) lo aplica forja.config.js (compartido).
   =========================================================================== */
(function () {
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const TABS = [
    { id:'hoy',     label:'Hoy',      href:'hoy.html',        icon:'<path d="M3 9.5 12 3l9 6.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>' },
    { id:'reservar',label:'Reservar', href:'reservar.html',   icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
    { id:'ranking', label:'Ranking',  href:'ranking.html',    fab:true, icon:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 9a2 2 0 0 1-2-2V5h4M19 9a2 2 0 0 0 2-2V5h-4"/>' },
    { id:'social',  label:'Comunidad',    href:'red-social.html', icon:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' },
    { id:'perfil',  label:'Perfil',   href:'perfil.html',     icon:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  ];

  function buildTabbar(active) {
    const items = TABS.map(t => {
      if (t.fab) return `<a href="${t.href}" class="app-tab app-tab-fab" ${t.id===active?'aria-current="page"':''} aria-label="${t.label}"><span class="app-fab">${svg(t.icon)}</span></a>`;
      return `<a href="${t.href}" class="app-tab" ${t.id===active?'aria-current="page"':''}>${svg(t.icon)}<span>${t.label}</span></a>`;
    }).join('');
    return `<nav class="app-tabbar">${items}</nav>`;
  }

  function init() {
    const b = document.body;
    const active = b.dataset.appTab;
    if (active) {
      const bar = document.createElement('div');
      bar.innerHTML = buildTabbar(active);
      (document.querySelector('.app-frame') || b).appendChild(bar.firstChild);
    }
    // toggles genéricos
    document.addEventListener('click', e => {
      const sw = e.target.closest('.a-switch');
      // sólo manejar switches SIN onclick propio (evita doble-toggle)
      if (sw && !sw.hasAttribute('onclick')) sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  }

  // toggle de tema reutilizable (para ajustes)
  window.ForjaApp = {
    toggleTheme() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('fj-theme', dark ? 'light' : 'dark'); } catch (e) {}
      return !dark;
    },
    isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
