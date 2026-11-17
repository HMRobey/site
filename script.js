/* Progressive enhancement: content and native disclosures work without JS. */
(() => {
  'use strict';
  document.body.classList.add('js');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
  window.matchMedia('(min-width:761px)').addEventListener('change', closeMenu);
  const content = {
    direction: ['A roadmap the business can use.', 'Translate commercial priorities into investment decisions, clear ownership and a practical delivery plan.'],
    assurance: ['A clear view of risk and responsibility.', 'Connect security governance and business continuity to client requirements and the way the organisation operates.'],
    delivery: ['Decisions carried through to delivery.', 'Bring service operations, suppliers and technical implementation together, with clear standards and accountable ownership.']
  };
  const tabs = [...document.querySelectorAll('[data-priority]')];
  const panel = document.querySelector('#priority-content');
  function activate(tab, focus = false) {
    tabs.forEach(t => { const selected = t === tab; t.setAttribute('aria-selected', String(selected)); t.tabIndex = selected ? 0 : -1; });
    const copy = content[tab.dataset.priority];
    panel.querySelector('h3').textContent = copy[0]; panel.querySelector('p').textContent = copy[1];
    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); activate(tabs[next], true); }
    });
  });
  document.querySelector('.print-button').addEventListener('click', () => window.print());
  let printState = [];
  window.addEventListener('beforeprint', () => { printState = [...document.querySelectorAll('details')].map(el => [el, el.open]); printState.forEach(([el]) => { el.open = true; }); });
  window.addEventListener('afterprint', () => { printState.forEach(([el, open]) => { el.open = open; }); });
})();
