/* ===========================================================================
   Forja — chrome + comportamientos compartidos del backoffice.
   - Inyecta sidebar (colapsable a rail) + topbar desde data-attrs del <body>.
   - Barra flotante de guardar (dirty state).  - Drawer lateral.  - Drag&drop.
   Uso mínimo en cada página:
     <body data-page="dashboard" data-title="Dashboard" data-eyebrow="Forja Box · Providencia">
   Inmersivo (calendario/constructor): NO usa el chrome estándar, arma su propia barra.
   =========================================================================== */
(function () {
  const I = {
    dashboard:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    clientes:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendario:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clases:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    rutinas:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    ejercicios:'<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
    planes:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    pagos:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    mensajes:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    metricas:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    resenas:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>',
    competencias:'<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',
    config:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  };
  const svg = (p, s) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s||2}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const NAV = [
    { id:'dashboard',    label:'Dashboard',     href:'dashboard.html' },
    { id:'clientes',     label:'Clientes',      href:'clientes.html' },
    { id:'calendario',   label:'Calendario',    href:'calendario.html' },
    { id:'clases',       label:'Clases',        href:'tipo-clases.html' },
    { id:'rutinas',      label:'Rutinas',       href:'rutinas.html' },
    { id:'ejercicios',   label:'Ejercicios',    href:'ejercicios.html' },
    { id:'planes',       label:'Planes',        href:'planes.html' },
    { id:'pagos',        label:'Pagos',         href:'pagos.html' },
    { id:'mensajes',     label:'Mensajes',      href:'mensajes.html' },
    { id:'metricas',     label:'Métricas',      href:'metricas.html' },
    { id:'resenas',      label:'Reseñas',       href:'resenas.html' },
    { id:'competencias', label:'Competencias',  href:'competencias.html' },
    { id:'config',       label:'Configuración', href:'configuracion.html' },
  ];

  function buildSidebar(active) {
    const items = NAV.map(n =>
      `<a href="${n.href}" class="fj-nav-item" ${n.id===active?'aria-current="page"':''}>
         ${svg(I[n.id])}<span class="fj-nav-label">${n.label}</span><span class="fj-tip">${n.label}</span>
       </a>`).join('');
    return `<aside class="fj-sidebar">
      <div class="fj-side-head">
        <span class="fj-logo-mark">${svg('<path d="M12 2c1 3-1 5-2 6 1 0 4-1 5 2 2 4-2 8-3 8 2-4-1-5-2-5 .5 2-1 3-2 3-2 0-3-2-3-4 0-3 4-5 4-7 0-1-1-2-2-3 4 0 8 1 8 6"/>','2.5')}</span>
        <span class="fj-logo-word">Forja<span style="color:var(--fj-brand)">.</span></span>
      </div>
      <nav class="fj-nav">${items}</nav>
      <div class="fj-side-foot">
        <div class="fj-side-user">
          <span class="fj-avatar">VF</span>
          <div class="fj-side-user-meta"><p style="font-size:13px;font-weight:600;margin:0">Vale Fuentes</p><p style="font-size:11px;color:var(--fj-ink-400);margin:0">Admin · Forja Box</p></div>
        </div>
      </div>
    </aside>`;
  }

  const themeIcon = () => document.documentElement.getAttribute('data-theme') === 'dark'
    ? svg('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/>')
    : svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>');

  // Ícono de colapsar: chevrons que apuntan « (colapsar) / » (expandir) — NO hamburguesa
  const collapseIcon = collapsed => collapsed
    ? svg('<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>')
    : svg('<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>');

  const NOTIFS = [
    { ic:'pago', tone:'brand', unread:true, t:'<b>3 comprobantes</b> por aprobar', s:'Camila Soto, Pancho Díaz y 1 más', time:'hace 2 h' },
    { ic:'warn', tone:'warning', unread:true, t:'<b>Ignacio Vera</b> tiene un pago vencido', s:'Pack 10 sesiones · desde el 1 jun', time:'hace 6 h' },
    { ic:'user', tone:'info', unread:true, t:'Nuevo cliente registrado', s:'Sebastián Mora · Plan 3x semana', time:'hace 4 h' },
    { ic:'cal', tone:'neutral', unread:false, t:'<b>2 clases de mañana</b> sin rutina', s:'CrossFit 07:00 · Halterofilia 09:00', time:'hace 8 h' },
    { ic:'trophy', tone:'success', unread:false, t:'Javiera Núñez completó 50 clases', s:'Logro desbloqueado', time:'hace 10 h' },
  ];
  const NIC = {
    pago:['rgba(251,82,21,.12)','#E0410A','<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'],
    warn:['rgba(232,163,23,.16)','#9A6A09','<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'],
    user:['rgba(62,123,250,.12)','#2350B0','<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>'],
    cal:['var(--fj-ink-100)','#5A6172','<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'],
    trophy:['rgba(24,169,87,.12)','#0F7A3F','<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 9a2 2 0 0 1-2-2V5h4M19 9a2 2 0 0 0 2-2V5h-4"/>'],
  };
  function notifPanel() {
    const items = NOTIFS.map(n => {
      const [bg, col, path] = NIC[n.ic];
      return `<div class="fj-notif-item ${n.unread?'unread':''}">
        <span class="fj-notif-ic" style="background:${bg};color:${col}"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>
        <div style="flex:1;min-width:0;padding-right:14px"><p style="font-size:13px;color:var(--fj-ink-800);line-height:1.4;margin:0">${n.t}</p>
          <p style="font-size:12px;color:var(--fj-ink-400);margin:2px 0 0">${n.s}</p>
          <p class="fj-mono" style="font-size:10.5px;color:var(--fj-ink-300);margin:4px 0 0">${n.time}</p></div>
      </div>`;
    }).join('');
    return `<div class="fj-notif-panel" hidden>
      <div class="fj-notif-head">
        <div><p class="fj-eyebrow">Bandeja</p><p style="font-family:'Space Grotesk';font-weight:700;font-size:16px;margin:1px 0 0">Notificaciones</p></div>
        <button data-fj-mark class="text-xs font-semibold" style="color:var(--fj-brand-600);background:none;border:0;cursor:pointer">Marcar leídas</button>
      </div>
      <div class="fj-notif-list">${items}</div>
      <div class="fj-notif-foot"><a href="#" class="text-sm font-semibold" style="color:var(--fj-ink-600)">Ver todas las notificaciones</a></div>
    </div>`;
  }

  function buildTopbar(b, collapsed) {
    const cta = b.dataset.ctaLabel
      ? `<a href="${b.dataset.ctaHref||'#'}" class="fj-btn fj-btn-primary">${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>','2.5')}${b.dataset.ctaLabel}</a>` : '';
    return `<header class="fj-topbar">
      <div style="display:flex;align-items:center;gap:14px;min-width:0">
        <button class="fj-collapse-btn" data-fj-collapse title="Colapsar menú (⌘B)">${collapseIcon(collapsed)}</button>
        <div style="min-width:0"><p class="fj-eyebrow">${b.dataset.eyebrow||'Forja Box · Providencia'}</p><h1 class="fj-title">${b.dataset.title||''}</h1></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="fj-search">${svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>')}<input type="text" placeholder="Buscar cliente, clase…"></div>
        ${cta}
        <button class="fj-icon-btn" data-fj-theme title="Cambiar tema" aria-label="Cambiar tema">${themeIcon()}</button>
        <div class="fj-notif">
          <button class="fj-icon-btn" data-fj-notif title="Notificaciones" aria-label="Notificaciones" style="position:relative">${svg('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>')}<span class="fj-notif-dot">3</span></button>
          ${notifPanel()}
        </div>
      </div>
    </header>`;
  }

  function initChrome() {
    const b = document.body;
    if (b.hasAttribute('data-immersive') || !b.hasAttribute('data-page')) return;
    // Mover el NODO de contenido (no re-stringificar) para preservar los event
    // listeners que los scripts inline de la página ya engancharon, y la savebar.
    const startCollapsed = localStorage.getItem('fj-collapsed') === 'true';
    const content = document.querySelector('[data-fj-content]');
    const main = document.createElement('div');
    main.className = 'fj-main';
    main.innerHTML = buildTopbar(b, startCollapsed);
    const contentWrap = document.createElement('main');
    contentWrap.className = 'fj-content';
    contentWrap.id = 'fj-content';
    if (content) contentWrap.appendChild(content);   // <- mueve el nodo, conserva listeners
    main.appendChild(contentWrap);
    const shell = document.createElement('div');
    shell.className = 'fj-shell';
    shell.id = 'fj-shell';
    shell.innerHTML = buildSidebar(b.dataset.page);
    shell.appendChild(main);
    b.prepend(shell);                                 // <- no vacía el body (savebar intacta)

    // estado colapsado persistente
    if (startCollapsed) shell.setAttribute('data-collapsed', 'true');
    const btn = shell.querySelector('[data-fj-collapse]');
    const toggle = () => {
      const c = shell.getAttribute('data-collapsed') === 'true';
      shell.setAttribute('data-collapsed', String(!c));
      localStorage.setItem('fj-collapsed', String(!c));
      btn.innerHTML = collapseIcon(!c);
      btn.title = !c ? 'Expandir menú (⌘B)' : 'Colapsar menú (⌘B)';
    };
    btn.addEventListener('click', toggle);
    document.addEventListener('keydown', e => { if ((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='b'){ e.preventDefault(); toggle(); }});

    // toggle de tema (claro/oscuro)
    const tBtn = shell.querySelector('[data-fj-theme]');
    if (tBtn) tBtn.addEventListener('click', () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('fj-theme', dark ? 'light' : 'dark'); } catch (e) {}
      tBtn.innerHTML = themeIcon();
    });

    // dropdown de notificaciones
    const nBtn = shell.querySelector('[data-fj-notif]');
    const nPanel = shell.querySelector('.fj-notif-panel');
    if (nBtn && nPanel) {
      nBtn.addEventListener('click', e => { e.stopPropagation(); nPanel.hidden = !nPanel.hidden; });
      document.addEventListener('click', e => { if (!e.target.closest('.fj-notif')) nPanel.hidden = true; });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') nPanel.hidden = true; });
      const mark = nPanel.querySelector('[data-fj-mark]');
      if (mark) mark.addEventListener('click', () => {
        nPanel.querySelectorAll('.fj-notif-item.unread').forEach(i => i.classList.remove('unread'));
        const dot = nBtn.querySelector('.fj-notif-dot'); if (dot) dot.remove();
      });
    }
  }

  /* ---- Barra flotante de guardar -------------------------------------------- */
  const SaveBar = {
    el: null,
    mount(opts={}) {
      const bar = document.createElement('div');
      bar.className = 'fj-savebar';
      bar.innerHTML = `<div class="fj-savebar-inner">
        <span class="fj-savebar-msg">${opts.msg||'Tienes cambios sin guardar'}</span>
        <button class="fj-btn fj-btn-ghost fj-btn-sm" data-fj-discard>Descartar</button>
        <button class="fj-btn fj-btn-primary fj-btn-sm" data-fj-save>Guardar cambios</button></div>`;
      document.body.appendChild(bar);
      this.el = bar;
      bar.querySelector('[data-fj-discard]').addEventListener('click', () => { this.hide(); opts.onDiscard && opts.onDiscard(); });
      bar.querySelector('[data-fj-save]').addEventListener('click', () => { opts.onSave && opts.onSave(); });
      return this;
    },
    show(){ this.el && this.el.classList.add('is-visible'); },
    hide(){ this.el && this.el.classList.remove('is-visible'); },
    /* auto: muestra la barra cuando cambia cualquier input dentro de `scope` */
    bindDirty(scope, opts={}) {
      this.mount(opts);
      const root = typeof scope==='string' ? document.querySelector(scope) : scope;
      if (!root) return this;
      const on = () => this.show();
      root.addEventListener('input', on);
      root.addEventListener('change', on);
      return this;
    }
  };

  /* ---- Drawer lateral -------------------------------------------------------- */
  const Drawer = {
    open(html, opts={}) {
      let ov = document.querySelector('.fj-drawer-overlay');
      let dw = document.querySelector('.fj-drawer');
      if (!ov){ ov=document.createElement('div'); ov.className='fj-drawer-overlay'; document.body.appendChild(ov); }
      if (!dw){ dw=document.createElement('aside'); dw.className='fj-drawer'; document.body.appendChild(dw); }
      dw.innerHTML = html;
      ov.classList.add('is-open');
      requestAnimationFrame(()=>dw.classList.add('is-open'));
      ov.onclick = () => this.close();
      dw.querySelectorAll('[data-fj-close]').forEach(b=>b.addEventListener('click',()=>this.close()));
    },
    close() {
      const ov=document.querySelector('.fj-drawer-overlay'), dw=document.querySelector('.fj-drawer');
      dw && dw.classList.remove('is-open'); ov && ov.classList.remove('is-open');
    }
  };

  /* ---- Drag & drop minimal (constructor de rutina) --------------------------
     dragSource: [data-fj-drag] -> al soltar en [data-fj-dropzone] llama onDrop(payload, zone) */
  const DnD = {
    init(opts={}) {
      let payload=null;
      document.addEventListener('dragstart', e=>{
        const s=e.target.closest('[data-fj-drag]'); if(!s) return;
        payload=s.getAttribute('data-fj-drag'); e.dataTransfer.effectAllowed='copy'; s.classList.add('opacity-50');
      });
      document.addEventListener('dragend', e=>{ const s=e.target.closest('[data-fj-drag]'); s&&s.classList.remove('opacity-50'); });
      document.addEventListener('dragover', e=>{ const z=e.target.closest('[data-fj-dropzone]'); if(z){ e.preventDefault(); z.classList.add('fj-dropping'); }});
      document.addEventListener('dragleave', e=>{ const z=e.target.closest('[data-fj-dropzone]'); z&&z.classList.remove('fj-dropping'); });
      document.addEventListener('drop', e=>{
        const z=e.target.closest('[data-fj-dropzone]'); if(!z) return; e.preventDefault(); z.classList.remove('fj-dropping');
        opts.onDrop && opts.onDrop(payload, z);
      });
    }
  };

  window.Forja = { initChrome, SaveBar, Drawer, DnD, svg };
  document.addEventListener('DOMContentLoaded', initChrome);
})();
