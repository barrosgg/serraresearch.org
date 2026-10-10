import {mapLibreStyle} from '../../lib/research-design';
export function GET(){return new Response(JSON.stringify(mapLibreStyle,null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
