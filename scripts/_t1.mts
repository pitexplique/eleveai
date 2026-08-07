import { chercher } from '../lib/matrice/moteur';
const q=(p:any,s:string)=>console.log(`  ${p.padEnd(9)} "${s}"`.padEnd(44), JSON.stringify(chercher({quiEsTu:p,question:s,chip:null}).recommandations.map(r=>r.ressource.titre)));
console.log('=== « guide de survie » ===');
for (const n of ['4e','6e','seconde','terminale'] as const) q(n,'guide de survie');
console.log('=== « cahier de vacances » ===');
for (const n of ['cp','ce1','ce2','cm1','cm2','4e','terminale'] as const) q(n,'cahier de vacances');
console.log('=== rien de demandé, au primaire ===');
for (const n of ['cp','ce1','ce2','cm1'] as const) q(n,'');
