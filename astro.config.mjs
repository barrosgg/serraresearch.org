import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://barrosgg.github.io',
  base: '/serraresearch.org',
  trailingSlash: 'always',
  output: 'static',
  devToolbar: {enabled:false},
  integrations: [sitemap({serialize(item){
    const pairs=[['','en/'],['privacidade/','en/privacy/'],['cookies/','en/cookies/'],['acessibilidade/','en/accessibility/'],['publicacoes/','en/publications/'],['design-system/','en/design-system/']];
    const root='https://barrosgg.github.io/serraresearch.org/';
    const pair=pairs.find(p=>p.some(route=>root+route===item.url));
    if(pair)item.links=[{lang:'pt-BR',url:root+pair[0]},{lang:'en',url:root+pair[1]}];
    return item;
  },filter: page => !page.includes('/modelo/') && !page.includes('/template/') && !page.includes('/404/'), i18n: {defaultLocale:'pt', locales:{pt:'pt-BR',en:'en'}}})],
  vite: {build: {assetsInlineLimit: 0}},
});
