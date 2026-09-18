(() => {
  const key = 'stormforge-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['system', 'light', 'dark'].includes(value);
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch (error) {
    console.warn('主题偏好无法读取，将跟随系统。', error);
  }

  function apply() {
    document.documentElement.dataset.theme = preference;
    const dark = preference === 'dark' || (preference === 'system' && system.matches);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#111519' : '#f7f8fa';
    const select = document.getElementById('theme-select');
    if (select) select.value = preference;
  }

  // Run in the head before the first paint to honor a saved preference.
  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : 'system';
      apply();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('theme-select');
    select.value = preference;
    select.closest('.theme-control').hidden = false;
    select.addEventListener('change', () => {
      preference = select.value;
      apply();
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch (error) {
        // The current page remains usable when browser storage is disabled.
        console.warn('主题已切换，但浏览器未允许保存偏好。', error);
      }
    });
  });
})();
