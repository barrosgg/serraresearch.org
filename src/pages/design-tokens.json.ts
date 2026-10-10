import {designTokens} from '../lib/design-system';
export function GET(){return new Response(JSON.stringify(designTokens,null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
