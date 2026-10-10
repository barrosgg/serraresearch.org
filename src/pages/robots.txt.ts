import {origin,path} from '../lib/site';
export function GET(){return new Response(`User-agent: *\nAllow: /\nDisallow: ${path('publicacoes/modelo')}\nDisallow: ${path('en/publications/template')}\nSitemap: ${origin}${path('sitemap-index.xml').replace(/\/$/,'')}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
