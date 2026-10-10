import {googleMapStyle} from '../../lib/research-design';
export function GET(){return new Response(JSON.stringify(googleMapStyle,null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
