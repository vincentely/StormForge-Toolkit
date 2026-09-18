import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://stormforge.vollagames.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
