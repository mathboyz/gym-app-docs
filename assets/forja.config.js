/* Forja — configuración Tailwind compartida (única fuente de verdad).
   Cargar SIEMPRE después del CDN de Tailwind y antes de forja.css. */

/* Consola limpia en los mockups: silenciar el aviso del CDN de Tailwind
   (es esperado al usar el CDN; en prod va PostCSS) e inyectar favicon
   para evitar el 404 de /favicon.ico en todas las páginas. */
(function () {
  // aplicar tema guardado antes del primer paint (evita parpadeo)
  try { if (localStorage.getItem('fj-theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {}
  const _warn = console.warn;
  console.warn = function () {
    if (typeof arguments[0] === 'string' && arguments[0].indexOf('cdn.tailwindcss.com') !== -1) return;
    return _warn.apply(console, arguments);
  };
  if (document.head && !document.querySelector('link[rel="icon"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#FB5215"/><path d="M12 4c1 3-1 5-2 6 1 0 4-1 5 2 2 4-2 8-3 8 2-4-1-5-2-5 .5 2-1 3-2 3-2 0-3-2-3-4 0-3 4-5 4-7 0-1-1-2-2-3 4 0 8 1 8 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    document.head.appendChild(link);
  }
})();

window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: { 50:'#FFF3EE',100:'#FFE2D6',200:'#FFC4AD',300:'#FF9E78',400:'#FF7340',500:'#FB5215',600:'#E0410A',700:'#B83309',800:'#92290B',900:'#76240E' },
        ink: { 950:'#0C0D10',900:'#131519',850:'#181B20',800:'#1F232B',700:'#2B303A',600:'#3A4150',500:'#5A6172',400:'#8A91A1',300:'#B6BCC8',200:'#D7DBE2',100:'#EAECF1',50:'#F6F7F9' },
        success:'#18A957', warning:'#E8A317', danger:'#E5484D', info:'#3E7BFA',
        tier: { bronce:'#C77B3C', plata:'#AEB7C4', oro:'#ECC04A', platino:'#61D2C4', diamante:'#6AA8FF' },
      },
      fontFamily: { display:['"Space Grotesk"','sans-serif'], sans:['Inter','sans-serif'], mono:['"JetBrains Mono"','monospace'] },
      borderRadius: { md:'12px', lg:'16px', xl:'20px', '2xl':'24px' },
      boxShadow: { sm:'0 1px 3px rgba(0,0,0,.08)', md:'0 6px 18px rgba(0,0,0,.12)', lg:'0 16px 40px rgba(0,0,0,.20)', glow:'0 6px 20px rgba(251,82,21,.35)' },
    }
  }
};
