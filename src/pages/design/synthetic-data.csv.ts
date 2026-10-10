import {researchDesignCsv} from '../../lib/research-design';
export function GET(){return new Response(researchDesignCsv(),{headers:{'Content-Type':'text/csv; charset=utf-8'}});}
