import audit from '../../data/model-audit.json';
export const GET=()=>new Response(JSON.stringify(audit,null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});
