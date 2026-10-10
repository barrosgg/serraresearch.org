import type { Locale } from '../i18n';
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const origin = 'https://barrosgg.github.io';
export const email = 'oi@serraresearch.org';
export const company = {name:'Serra Research', legalName:'Serra Research Pesquisa e Engenharia de Dados', taxId:'00.000.000/0000-00', location:'R. Dr. Renato Paes de Barros, 33 — Itaim Bibi, São Paulo — SP, 04530-000'};
export const path = (route = '') => `${base}/${route.replace(/^\//, '').replace(/\/$/, '')}${route ? '/' : ''}`;
export const home = (lang: Locale) => path(lang === 'en' ? 'en' : '');
export const routes = {
 publications: {pt:'publicacoes',en:'en/publications'},
 privacy: {pt:'privacidade',en:'en/privacy'},
 cookies: {pt:'cookies',en:'en/cookies'},
 accessibility: {pt:'acessibilidade',en:'en/accessibility'},
 designSystem: {pt:'design-system',en:'en/design-system'},
 template: {pt:'publicacoes/modelo',en:'en/publications/template'},
} as const;
export const link = (key:keyof typeof routes,lang:Locale) => path(routes[key][lang]);
export const sections = ['atuacao','dados','projetos','metodologia','publicacoes','contato'];
