const study = document.querySelector<HTMLElement>('bell-study');

if (study) initialize(study);

function initialize(root: HTMLElement) {
  function get<T extends HTMLElement>(selector: string, parent: ParentNode = root): T {
    const element = parent.querySelector<T>(selector);
    if (!element) throw new Error('Missing bell study control ' + selector);
    return element;
  }

  const tabs = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-chapter]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('.case-panel'));
  const chapters = panels.map(panel => panel.id);
  const landscape = get<HTMLImageElement>('[data-landscape]');
  const cutaway = get<HTMLImageElement>('[data-cutaway]');
  const caption = get('[data-caption]');
  const audio = get<HTMLAudioElement>('[data-bell]');
  const listen = get<HTMLButtonElement>('[data-listen]', document);
  const soundLabel = get('[data-listen-label]', listen);
  const soundMessage = get('[data-sound-message]');
  const state = get('[data-state]');
  const gate = get('[data-gate]');
  const bellIcon = get('[data-bell-icon]');
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const count = get<HTMLSelectElement>('[data-count]');
  const delay = get<HTMLSelectElement>('[data-delay]');
  const next = get<HTMLAnchorElement>('[data-next]');
  const studyHead = get('.study-head');
  let active = '';
  let strikes = 0;
  let opened = false;
  let pending: number | undefined;

  function syncAudio() {
    const playing = !audio.paused && !audio.ended;
    listen.setAttribute('aria-pressed', String(playing));
    soundLabel.textContent = playing ? '停止钟声' : '听一声钟';
  }
  function stopAudio() {
    audio.pause();
    if (audio.readyState) audio.currentTime = 0;
    syncAudio();
  }
  function playBell() {
    soundMessage.hidden = true;
    if (audio.readyState) audio.currentTime = 0;
    void audio.play().catch((error: Error) => {
      if (error.name === 'AbortError') return;
      soundMessage.textContent = '钟声未能播放。你仍可以通过机关状态观察开门时机。';
      soundMessage.hidden = false;
      syncAudio();
    });
  }
  function reset() {
    window.clearTimeout(pending);
    pending = undefined;
    opened = false;
    strikes = 0;
    gate.classList.remove('is-open');
    for (const animation of bellIcon.getAnimations()) animation.cancel();
    state.textContent = '山门已关闭';
    stopAudio();
  }
  function openGate() {
    pending = undefined;
    opened = true;
    gate.classList.add('is-open');
    state.textContent = '山门已开启';
  }
  function ring() {
    playBell();
    if (motion.matches) {
      for (const animation of bellIcon.getAnimations()) animation.cancel();
      bellIcon.animate({ transform: ['rotate(0deg)', 'rotate(-20deg)', 'rotate(13deg)', 'rotate(-5deg)', 'rotate(0deg)'] },
        { duration: 520, easing: 'ease-out' });
    }
    if (opened || pending !== undefined) return;
    strikes++;
    const required = active === 'make' ? Number(count.value) : 1;
    if (strikes < required) {
      state.textContent = '已敲 ' + strikes + ' 次，还差 ' + (required - strikes) + ' 次';
      return;
    }
    const wait = active === 'make' ? Number(delay.value) : 450;
    if (wait === 0) {
      openGate();
    } else {
      state.textContent = '钟已响，等待开门';
      pending = window.setTimeout(openGate, wait);
    }
  }

  function show(id: string) {
    if (!chapters.includes(id) || id === active) return;
    active = id;
    reset();
    for (const tab of tabs) {
      const selected = tab.dataset.chapter === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const panel of panels) panel.hidden = panel.id !== id;
    const outside = id === 'observe';
    landscape.hidden = !outside;
    cutaway.hidden = outside;
    caption.textContent = outside ? '原创概念插画 · 玩家眼中的山门与钟亭' : '原创概念插画 · 钟亭与山门的分解视图';
    const following = tabs[(chapters.indexOf(id) + 1) % chapters.length];
    next.href = following.hash;
    next.textContent = (id === 'make' ? '回到' : '下一层 · ') + get('strong', following).textContent + ' →';
  }

  function visit(id: string, scroll = true) {
    show(id);
    const hash = '#' + id;
    if (location.hash !== hash) history.pushState(null, '', hash);
    if (scroll) studyHead.scrollIntoView({ block: 'start' });
  }

  function linked(event: MouseEvent) {
    if (event.button || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = event.currentTarget as HTMLAnchorElement;
    const id = link.hash.slice(1);
    if (!chapters.includes(id)) return;
    event.preventDefault();
    visit(id);
    if (event.detail === 0 && !link.hasAttribute('data-chapter')) {
      get('#' + id).focus({ preventScroll: true });
    }
  }

  get('.chapters').setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', chapters[index]);
    tab.addEventListener('click', linked);
    tab.addEventListener('keydown', event => {
      let target = index;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else if (event.key === ' ') {
        event.preventDefault();
        visit(chapters[index]);
        return;
      } else return;
      event.preventDefault();
      tabs[target].focus({ preventScroll: true });
      visit(chapters[target], false);
    });
  });
  for (const panel of panels) {
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
  }
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-enter-study], [data-next]')) link.addEventListener('click', linked);
  const restore = () => {
    const id = location.hash.slice(1);
    const named = chapters.includes(id);
    show(named ? id : 'open');
    if (named) requestAnimationFrame(() => studyHead.scrollIntoView({ block: 'start' }));
  };
  window.addEventListener('hashchange', restore);
  window.addEventListener('pagehide', reset);
  audio.addEventListener('play', syncAudio);
  audio.addEventListener('ended', syncAudio);
  audio.addEventListener('pause', syncAudio);
  listen.addEventListener('click', () => audio.paused || audio.ended ? playBell() : stopAudio());
  get('[data-ring]').addEventListener('click', ring);
  get('[data-reset]').addEventListener('click', reset);
  count.addEventListener('change', reset);
  delay.addEventListener('change', reset);
  for (const control of [listen, next, get('[data-playback]'), get('[data-recipe]')]) control.hidden = false;
  root.dataset.ready = '';
  restore();
}
