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

    // selectores tipo chip (día, etc.) con estado hardcodeado inline → forzar visual
    document.addEventListener('click', e => {
      const pick = e.target.closest('[data-pick]');
      if (!pick || pick.hasAttribute('onclick')) return;
      const grp = pick.parentElement;
      grp && grp.querySelectorAll('[data-pick]').forEach(x => {
        const on = x === pick;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.style.setProperty('border', on ? '2px solid var(--fj-brand)' : '1px solid var(--fj-ink-200)', 'important');
        x.style.setProperty('background', on ? 'rgba(251,82,21,.12)' : 'var(--fj-ink-100)', 'important');
        x.querySelectorAll('span').forEach((s, i) => s.style.setProperty('color', on ? 'var(--fj-brand)' : (i === 0 ? 'var(--fj-ink-400)' : 'var(--fj-ink-700)'), 'important'));
      });
    });

    // segments / pills / selectores sin handler propio → seleccionar en el grupo
    document.addEventListener('click', e => {
      const seg = e.target.closest('.a-seg > *, .fj-pill, [aria-selected]');
      if (!seg || seg.hasAttribute('onclick') || seg.hasAttribute('data-pick')) return;
      if (seg.closest('a[href]:not([href="#"])')) return;
      const grp = seg.closest('.a-seg, .fj-pills') || seg.parentElement;
      if (grp) grp.querySelectorAll('[aria-selected]').forEach(x => x.setAttribute('aria-selected', x === seg ? 'true' : 'false'));
    });

    // feedback genérico: cualquier botón/enlace-stub sin destino real → toast
    function appMsg(l) {
      if (/enviar|guardar resultado|inscrib|confirmar|^lanzar|registrar/i.test(l)) return '¡Listo! 🙌';
      if (/reservar/i.test(l)) return 'Clase reservada ✓';
      if (/aceptar|^retar|sumarme/i.test(l)) return 'Reto enviado ⚡';
      if (/like|me gusta/i.test(l)) return '❤️';
      if (/coment/i.test(l)) return 'Comentario enviado (demo)';
      if (/compartir/i.test(l)) return 'Compartido (demo)';
      if (/seguir/i.test(l)) return 'Siguiendo ✓';
      if (/reproducir|^video/i.test(l)) return 'Reproduciendo… (demo)';
      if (/galer|c[áa]mara|foto|adjuntar|subir/i.test(l)) return 'Archivo seleccionado (demo)';
      if (/filtr/i.test(l)) return 'Filtros aplicados (demo)';
      if (/m[áa]s opciones|opciones/i.test(l)) return 'Opciones (demo)';
      if (/agregar|^\+|añadir|nueva|nuevo/i.test(l)) return 'Agregado (demo)';
      if (/cancelar/i.test(l)) return 'Cancelado (demo)';
      return 'Hecho (demo)';
    }
    document.addEventListener('click', e => {
      const el = e.target.closest('a, button'); if (!el) return;
      if (el.getAttribute('onclick')) return;
      if (el.closest('a[href]:not([href="#"])')) return;
      if (el.closest('[onclick]')) return;
      if (el.matches('.a-switch,.a-seg > *,.fj-pill,.app-tab,[data-fj-close],[aria-selected],[data-pick]')) return;
      const href = el.getAttribute('href');
      if (el.tagName === 'A' && href === '#') e.preventDefault();
      const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ');
      ForjaApp.toast(appMsg(label));
    });
  }
  function toast(msg) {
    let w = document.querySelector('.fj-toast-wrap');
    if (!w) { w = document.createElement('div'); w.className = 'fj-toast-wrap'; document.body.appendChild(w); }
    const t = document.createElement('div'); t.className = 'fj-toast'; t.textContent = msg; w.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; setTimeout(() => t.remove(), 260); }, 2000);
  }

  // modal de confirmación reutilizable (ej. "confirmar asistencia")
  function confirmModal({ title, body, confirmLabel, onConfirm }) {
    let backdrop = document.querySelector('.fj-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'fj-modal-backdrop';
      backdrop.innerHTML = `<div class="fj-modal" role="dialog" aria-modal="true">
        <div class="fj-modal-icon">${svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>')}</div>
        <p class="fj-modal-title"></p>
        <p class="fj-modal-body"></p>
        <div class="fj-modal-actions">
          <button class="a-btn a-btn-primary" data-modal-confirm></button>
          <button class="a-btn a-btn-ghost" data-modal-cancel>Volver</button>
        </div>
      </div>`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop || e.target.closest('[data-modal-cancel]')) {
          backdrop.setAttribute('data-open', 'false');
        }
      });
    }
    backdrop.querySelector('.fj-modal-title').textContent = title;
    backdrop.querySelector('.fj-modal-body').textContent = body;
    const confirmBtn = backdrop.querySelector('[data-modal-confirm]');
    confirmBtn.textContent = confirmLabel;
    confirmBtn.onclick = () => {
      backdrop.setAttribute('data-open', 'false');
      onConfirm && onConfirm();
    };
    backdrop.setAttribute('data-open', 'true');
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
    isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; },
    toast,
    confirmModal
  };

  document.addEventListener('DOMContentLoaded', init);
})();
