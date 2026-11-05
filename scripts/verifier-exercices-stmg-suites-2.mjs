// Recalcul indépendant des feuilles STMG du lot « suites-2 » (05/11/2026) :
// suite-modeliser, suite-seuil, suite-terme-general, suite-moyennes, suite-somme,
// suite-somme-situations, suite-comparer. Chaque réponse est recalculée à partir
// des données de l'énoncé, puis passée au vrai correcteur du site.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-suites-2.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/** Les termes de proche en proche : la suite u(0), …, u(n). */
const geo = (u0, q, n) => Array.from({ length: n + 1 }, (_, k) => u0 * q ** k);
const ari = (u0, r, n) => Array.from({ length: n + 1 }, (_, k) => u0 + r * k);
const somme = (t) => t.reduce((s, v) => s + v, 0);
/** Le premier rang où la condition est vraie. */
const rang = (t, cond) => t.findIndex(cond);
/** Valeur acquise de versements en début de période, addition directe. */
const acquise = (V, q, n) => somme(Array.from({ length: n }, (_, k) => V * q ** (k + 1)));

/* ═══════════════ suite-modeliser ═══════════════ */
{
  const f = await feuille("suite-modeliser");
  f.juste(1, null, "arithmétique"); f.faux(1, null, "géométrique");
  f.juste(2, null, "géométrique"); f.faux(2, null, "arithmétique");
  f.juste(3, "a)", "géométrique"); f.juste(3, "b)", "arithmétique");
  f.juste(4, "a)", 1 + 8 / 100); f.juste(4, "b)", 1 - 30 / 100); f.faux(4, "b)", 0.3);
  f.juste(5, "a)", 400); f.juste(5, "b)", "u(n) + 25"); f.juste(5, "b)", "25 + u(n)"); f.juste(5, "b)", "u(n+1) = u(n) + 25"); f.faux(5, "b)", "1,25 × u(n)");
  f.juste(6, null, 2029 - 2022); f.faux(6, null, 8);
  f.juste(7, "a)", 1 + 5 / 100); f.juste(7, "b)", 1000 * 1.05); f.faux(7, "a)", 0.05);
  f.juste(8, null, "B"); f.faux(8, null, "C"); f.vrai("modeliser ex.8 : 2023 + 5", 2023 + 5 === 2028);
  const s9 = ari(850, 40, 3);
  f.juste(9, "a)", 40); f.juste(9, "b)", "u(n) + 40"); f.juste(9, "c)", 2027 - 2024); f.juste(9, "d)", s9[2027 - 2024]);
  const s10 = geo(2000, 1.1, 3);
  f.juste(10, "a)", "1,1 × u(n)"); f.juste(10, "a)", "1,1u(n)"); f.juste(10, "b)", s10.slice(1)); f.juste(10, "c)", 2023 + 3); f.faux(10, "b)", [2200, 2400, 2600]);
  f.juste(11, "a)", "géométrique"); f.juste(11, "b)", "0,75 × u(n)"); f.juste(11, "c)", geo(80, 0.75, 3)[3]); f.faux(11, "c)", 20);
  const s12 = geo(2000, 1.04, 3);
  f.juste(12, "a)", s12[1]); f.juste(12, "b)", s12[2]); f.juste(12, "c)", s12[3]); f.faux(12, "c)", 2240);
  const simple13 = 5000 + 3 * (5000 * 0.1), comp13 = geo(5000, 1.1, 3)[3];
  f.juste(13, "a)", simple13); f.juste(13, "b)", comp13); f.juste(13, "c)", comp13 - simple13);
  f.juste(14, "a)", "arithmétique"); f.juste(14, "b)", 190 - 160); f.vrai("modeliser ex.14 A", 220 - 190 === 30 && 250 - 220 === 30);
  f.juste(14, "c)", "géométrique"); f.juste(14, "d)", 240 / 160); f.vrai("modeliser ex.14 B", 360 / 240 === 1.5 && 540 / 360 === 1.5);
  f.juste(15, "a)", 2030 - 2024); f.juste(15, "b)", ari(120, 15, 6)[6]); f.juste(15, "c)", "C"); f.faux(15, "a)", 2030);
  const s16 = geo(1500, 1.2, 3);
  f.juste(16, "a)", "1,2 × u(n)"); f.juste(16, "b)", 2025 - 2022); f.juste(16, "c)", s16.slice(1)); f.faux(16, "a)", "u(n) + 20");
  const q20 = 2000 * 1.05 ** 20;
  f.juste(17, "a)", [120, 2000 * 0.05]); f.juste(17, "b)", 2000 + 20 * 120); f.juste(17, "c)", Math.round(q20)); f.juste(17, "d)", q20 > 4400 ? "P" : "F"); f.vrai("modeliser ex.17 : 1,05^20", Math.abs(1.05 ** 20 - 2.6533) < 0.0001);
  const tA = 12000 + 3 * 700, tB = geo(12000, 1.05, 3)[3];
  f.juste(18, "a)", "arithmétique"); f.juste(18, "b)", 1.05); f.juste(18, "c)", 2028 - 2025); f.juste(18, "d)", tA); f.juste(18, "e)", Math.round(tB)); f.juste(18, "f)", tA > tB ? "A" : "B"); f.faux(18, "f)", "B");
  const c19 = geo(4000, 1.1, 4);
  f.juste(19, "a)", 4000 + 4 * 400); f.juste(19, "b)", c19.slice(1)); f.juste(19, "c)", c19[4] - 5600); f.juste(19, "d)", "composés"); f.faux(19, "d)", "simples");
  const v20 = geo(20000, 0.82, 3);
  f.juste(20, "a)", "0,82 × u(n)"); f.juste(20, "b)", v20.slice(1, 3)); f.juste(20, "c)", Math.round(v20[3])); f.juste(20, "d)", "A"); f.faux(20, "a)", "0,18 × u(n)");
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(12, "c)", 2249.72); f.faux(17, "c)", 5306); f.faux(17, "c)", 5308); f.faux(18, "e)", 13891); f.faux(20, "c)", 11028);
  f.juste(1, null, "la suite arithmétique"); f.juste(2, null, "suite géométrique"); f.juste(19, "d)", "composé"); f.juste(19, "d)", "intérêts composés");
  f.juste(5, "b)", "u(n+1) = 25 + u(n)"); f.juste(10, "a)", "u(n+1) = u(n) × 1,1"); f.juste(10, "a)", "u(n+1) = 1,1u(n)"); f.juste(16, "a)", "u(n+1)=1,2*u(n)");
  f.tout();
}

/* ═══════════════ suite-seuil ═══════════════ */
{
  const f = await feuille("suite-seuil");
  f.juste(1, null, rang(geo(500, 1.2, 5).map(Math.round), (v) => v > 800)); f.faux(1, null, 864);
  f.vrai("seuil ex.1 tableau", geo(500, 1.2, 5).map(Math.round).join() === "500,600,720,864,1037,1244");
  f.juste(2, null, rang(geo(3000, 0.8, 5).map(Math.round), (v) => v < 1300)); f.faux(2, null, 3);
  f.vrai("seuil ex.2 tableau", geo(3000, 0.8, 5).map(Math.round).join() === "3000,2400,1920,1536,1229,983");
  f.juste(3, null, rang(ari(2, 2, 5), (v) => v > 7)); f.faux(3, null, 8);
  f.juste(4, null, ari(1, 2, 5)[5] - 8); f.faux(4, null, 4);
  f.juste(5, null, rang(geo(1000, 1.5, 5), (v) => v > 3000)); f.faux(5, null, 2);
  f.juste(6, null, rang(ari(40, 30, 10), (v) => v > 200)); f.faux(6, null, 7);
  f.juste(7, null, "A"); f.faux(7, null, "B");
  f.juste(8, null, rang([800, 1120, 1568, 2195], (v, k) => v > 1200 + 100 * k)); f.vrai("seuil ex.8 B", geo(800, 1.4, 3).map(Math.round).join() === "800,1120,1568,2195");
  const c9 = geo(3000, 1.1, 5);
  f.juste(9, "a)", c9[3]); f.juste(9, "b)", rang(c9, (v) => v > 4000)); f.faux(9, "b)", 3);
  const l10 = geo(320, 1.25, 5).map(Math.round), r10 = rang(l10, (v) => v > 700);
  f.vrai("seuil ex.10 tableau", l10.join() === "320,400,500,625,781,977");
  f.juste(10, "a)", r10); f.juste(10, "b)", 2023 + r10); f.faux(10, "b)", 2028);
  f.juste(11, "a)", 1 - 0.3); f.juste(11, "b)", rang(geo(200, 0.7, 8), (v) => v < 50)); f.faux(11, "b)", 3);
  const l12 = ari(12, -2, 5), r12 = rang(l12, (v) => v < 5);
  f.juste(12, "a)", r12); f.juste(12, "b)", 2025 + r12); f.juste(12, "c)", 5 - l12[5]);
  const A13 = ari(5, 1, 4), B13 = geo(0.75, 2, 4), r13 = rang(B13, (v, k) => v > A13[k]);
  f.juste(13, "a)", r13); f.juste(13, "b)", r13 - 1); f.faux(13, "b)", 4);
  const A14 = ari(1400, 100, 3), B14 = geo(800, 1.5, 3), r14 = rang(B14, (v, k) => v > A14[k]);
  f.vrai("seuil ex.14 tableau", B14.join() === "800,1200,1800,2700");
  f.juste(14, "a)", r14); f.juste(14, "b)", r14 - 1); f.juste(14, "c)", A14[1] - B14[1]);
  let u15 = 1500, n15 = 0;
  while (u15 < 3000) { u15 *= 1.2; n15++; }
  f.juste(15, "a)", n15); f.juste(15, "b)", u15); f.faux(15, "a)", 3);
  let u16 = 2000, n16 = 0;
  while (u16 > 1000) { u16 *= 0.75; n16++; }
  f.juste(16, "a)", "B"); f.juste(16, "b)", n16); f.faux(16, "a)", "A");
  const l17 = geo(12, 1.2, 8), r17 = rang(l17, (v) => v > 25);
  f.juste(17, "a)", 1.2); f.juste(17, "b)", Number(l17[3].toFixed(2))); f.juste(17, "c)", r17); f.juste(17, "d)", 2024 + r17); f.faux(17, "c)", 4);
  const A18 = ari(2000, 120, 7), B18 = geo(1600, 1.1, 7).map(Math.round), r18 = rang(B18, (v, k) => v > A18[k]);
  f.vrai("seuil ex.18 tableau", B18.join() === "1600,1760,1936,2130,2343,2577,2834,3118");
  f.juste(18, "a)", r18); f.juste(18, "b)", r18 - 1); f.juste(18, "c)", B18[6] - A18[6]); f.faux(18, "a)", 5);
  const l19 = ari(13, -2, 6);
  f.juste(19, "a)", rang(l19, (v) => v < 6)); f.juste(19, "b)", 6 - l19[6]); f.juste(19, "c)", l19[1] - l19[0]); f.juste(19, "d)", "A"); f.faux(19, "c)", 2);
  const A20 = geo(4000, 1.05, 6), B20 = geo(2500, 1.2, 6);
  f.juste(20, "a)", rang(B20, (v) => v > 5000)); f.juste(20, "b)", rang(A20, (v) => v > 5000)); f.juste(20, "c)", rang(B20, (v, k) => v > A20[k])); f.juste(20, "d)", A20[3] > B20[3] ? "Aïcha" : "Timéo"); f.faux(20, "d)", "Timéo");
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(17, "b)", 20.73); f.juste(9, "b)", "au bout de 4 ans"); f.juste(11, "b)", "au bout de 4 heures"); f.juste(20, "a)", "au bout de 4 ans");
  f.tout();
}

/* ═══════════════ suite-terme-general ═══════════════ */
{
  const f = await feuille("suite-terme-general");
  // Une expression passe au correcteur sous plusieurs écritures justes.
  f.juste(1, null, "25 + 7n"); f.juste(1, null, "7n + 25"); f.juste(1, null, "u(n) = 7n + 25"); f.faux(1, null, "7 + 25n");
  f.juste(2, null, "100 - 8n"); f.juste(2, null, "-8n + 100"); f.faux(2, null, "100 + 8n");
  f.juste(3, null, 12 * 20 + 40);
  f.juste(4, null, "500 × 1,2^n"); f.juste(4, null, "500*1,2^n"); f.faux(4, null, "500 × 1,2 × n");
  f.juste(5, null, 800 * 0.5 ** 3); f.faux(5, null, 1200);
  f.juste(6, null, 300 / 200); f.vrai("terme ex.6", 450 / 300 === 1.5 && 675 / 450 === 1.5); f.faux(6, null, 100);
  f.juste(7, "a)", 120); f.juste(7, "b)", 1 - 5 / 100); f.faux(7, "b)", 0.05);
  const nature = (a, b, c) => (b - a === c - b ? "arithmétique" : Math.abs(b / a - c / b) < 1e-9 ? "géométrique" : "aucune");
  f.juste(8, null, nature(5, 12, 19));
  f.juste(9, "a)", 12); f.juste(9, "b)", "60 + 12n"); f.juste(9, "c)", 60 + 12 * (2035 - 2024));
  f.juste(10, "a)", 1 + 25 / 100); f.juste(10, "b)", "2000 × 1,25^n"); f.juste(10, "c)", Math.round(2000 * 1.25 ** 6)); f.faux(10, "c)", 15000);
  f.juste(11, "a)", "40000 × 0,9^n"); f.juste(11, "b)", 40000 * 0.9 ** 5); f.faux(11, "b)", 20000); f.vrai("terme ex.11 : 0,9^5", Math.abs(0.9 ** 5 - 0.59049) < 1e-9);
  f.juste(12, null, 3200 / 2 ** 4); f.faux(12, null, 400);
  const r13 = (350 - 150) / 10;
  f.juste(13, "a)", r13); f.juste(13, "b)", `150 + ${r13}n`); f.faux(13, "a)", 35);
  f.juste(14, "a)", [6 - 4, 9 - 6]); f.juste(14, "b)", [6 / 4, 9 / 6]); f.juste(14, "c)", nature(4, 6, 9)); f.faux(14, "c)", "aucune");
  f.juste(15, "a)", nature(8, 12, 20)); f.juste(15, "b)", nature(6, 18, 54));
  f.juste(16, "a)", "900 - 4n"); f.juste(16, "b)", 900 - 4 * (2075 - 2025)); f.faux(16, "b)", 900 - 4 * 75);
  f.juste(17, "a)", [2650 / 2500, 2809 / 2650]); f.juste(17, "b)", nature(2500, 2650, 2809)); f.juste(17, "c)", "2500 × 1,06^n"); f.juste(17, "d)", Math.round(2500 * 1.06 ** 10));
  f.juste(18, "a)", nature(40, 52, 64)); f.juste(18, "b)", "40 + 12n"); f.juste(18, "c)", 40 + 12 * 10);
  let n18 = 0; while (40 + 12 * n18 <= 200) n18++;
  f.juste(18, "d)", 2020 + n18); f.faux(18, "d)", 2033); f.vrai("terme ex.18 : u(13)", 40 + 12 * 13 === 196);
  f.juste(19, "a)", 1 / 2); f.juste(19, "b)", "800 × 0,5^n"); f.juste(19, "c)", 800 * 0.5 ** (24 / 6)); f.juste(19, "d)", 15 / 0.5 ** 5);
  f.juste(20, "a)", "300 + 40n"); f.juste(20, "b)", "300 × 1,1^n"); f.juste(20, "c)", 300 + 40 * 8); f.juste(20, "d)", Math.round(300 * 1.1 ** 8)); f.juste(20, "e)", 300 * 1.1 ** 8 > 620 ? "Paloma" : "Lucas"); f.faux(20, "e)", "Lucas");
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(10, "c)", 7630); f.faux(17, "d)", 4478); f.faux(20, "d)", 644); f.faux(11, "b)", 23619); f.faux(19, "d)", 800);
  f.juste(8, null, "la suite arithmétique"); f.juste(15, "a)", "aucun"); f.juste(15, "a)", "aucune des deux"); f.faux(15, "b)", "aucune");
  f.tout();
}

/* ═══════════════ suite-moyennes ═══════════════ */
{
  const f = await feuille("suite-moyennes");
  const ma = (a, b) => (a + b) / 2;
  const mg = (a, b) => Math.sqrt(a * b);
  f.juste(1, null, ma(18, 46)); f.faux(1, null, 64);
  f.juste(2, null, ma(7, 12)); f.faux(2, null, 10);
  f.juste(3, null, 2 * 40 - 24); f.faux(3, null, 16);
  f.juste(4, null, mg(4, 25)); f.faux(4, null, 14.5);
  f.juste(5, null, mg(3, 48)); f.faux(5, null, 144);
  f.juste(6, "a)", ma(2, 18)); f.juste(6, "b)", mg(2, 18));
  f.juste(7, null, ma(16, 30)); f.faux(7, null, 14);
  f.juste(8, null, mg(5, 20)); f.faux(8, null, 12.5);
  f.juste(9, null, ma(120, 180));
  f.juste(10, "a)", mg(2000, 2880)); f.juste(10, "b)", mg(2000, 2880) / 2000); f.faux(10, "a)", ma(2000, 2880));
  f.juste(11, null, 2 * 80 - 64); f.faux(11, null, 16);
  f.juste(12, "a)", mg(500, 720)); f.juste(12, "b)", mg(500, 720) / 500); f.juste(12, "c)", (mg(500, 720) / 500 - 1)); f.faux(12, "a)", ma(500, 720));
  const k13 = 1.6 * 0.9;
  f.juste(13, "a)", k13); f.juste(13, "b)", Math.sqrt(k13)); f.juste(13, "c)", Math.sqrt(k13) - 1); f.faux(13, "c)", "25 %");
  f.juste(14, "a)", mg(2, 50)); f.juste(14, "b)", ma(2, 50)); f.juste(14, "c)", 2 * 50); f.juste(14, "d)", "B"); f.faux(14, "d)", "A"); f.vrai("moyennes ex.14 : 26²", ma(2, 50) ** 2 === 676);
  f.juste(15, "a)", ma(8, 18)); f.juste(15, "b)", mg(8, 18)); f.juste(15, "c)", 12 === mg(8, 18) ? "géométrique" : "arithmétique");
  f.juste(16, "a)", ma(9000, 49000)); f.juste(16, "b)", mg(9000, 49000));
  f.juste(17, "a)", mg(800, 968)); f.juste(17, "b)", mg(800, 968) / 800); f.juste(17, "c)", mg(800, 968) / 800 - 1); f.juste(17, "d)", [ma(800, 968), ma(800, 968) - mg(800, 968)]);
  const k18 = mg(200, 450) / 200, e18 = ma(200, 450) - 200;
  f.juste(18, "a)", mg(200, 450)); f.juste(18, "b)", k18); f.juste(18, "c)", 450 * k18); f.juste(18, "d)", ma(200, 450)); f.juste(18, "e)", 450 + e18);
  f.juste(19, "a)", 2 * 70 - 58); f.juste(19, "b)", ma(58, 90)); f.juste(19, "c)", ma(58, 90) >= 70 ? "oui" : "non"); f.juste(19, "d)", 2 * 75 - 58); f.faux(19, "a)", 12);
  f.juste(20, "a)", [8000 / 4000, 4000 / 8000]); f.juste(20, "b)", 2 * 0.5); f.juste(20, "c)", mg(2, 0.5)); f.juste(20, "d)", ma(2, 0.5)); f.juste(20, "e)", 4000 * 1.25 * 1.25 === 4000 ? "vrai" : "faux"); f.vrai("moyennes ex.20 : 6 250", 4000 * 1.25 * 1.25 === 6250);
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.juste(15, "c)", "la géométrique"); f.faux(15, "c)", "arithmétique"); f.juste(20, "e)", "non"); f.faux(20, "e)", "vrai");
  f.tout();
}

/* ═══════════════ suite-somme ═══════════════ */
{
  const f = await feuille("suite-somme");
  // Le recalcul additionne directement les termes, sans la formule du corrigé.
  const sigma = (bas, haut, terme) => { let s = 0; for (let k = bas; k <= haut; k++) s += terme(k); return s; };
  const carres = (k) => k * k;
  f.juste(1, null, sigma(1, 4, carres)); f.faux(1, null, 16);
  f.juste(2, null, sigma(1, 5, (k) => k)); f.faux(2, null, 10);
  f.juste(3, null, sigma(2, 6, (k) => k)); f.faux(3, null, 21);
  f.juste(4, "a)", 3); f.juste(4, "b)", 7); f.faux(4, "b)", 6); f.vrai("somme ex.4", sigma(3, 7, (k) => k) === 3 + 4 + 5 + 6 + 7);
  f.juste(5, null, 9 - 0 + 1); f.faux(5, null, 9);
  f.juste(6, null, somme(ari(5, 3, 4))); f.faux(6, null, 44);
  f.juste(7, "a)", 12 - 1 + 1); f.juste(7, "b)", 10 - 3 + 1); f.faux(7, "b)", 7);
  f.juste(8, null, somme(geo(3, 2, 3)));
  const c9 = ari(10, 2, 7);
  f.juste(9, "a)", c9[7]); f.juste(9, "b)", c9.length); f.juste(9, "c)", somme(c9)); f.faux(9, "a)", 26);
  const c10 = ari(18, 2, 14);
  f.juste(10, "a)", c10[14]); f.juste(10, "b)", somme(c10)); f.faux(10, "a)", 48);
  const c11 = geo(5, 3, 4);
  f.juste(11, "a)", c11.length); f.juste(11, "b)", somme(c11));
  const c12 = geo(4, 2, 5);
  f.juste(12, "a)", "B"); f.juste(12, "b)", somme(c12)); f.faux(12, "b)", (6 * (4 + 128)) / 2); f.vrai("somme ex.12 : u(5)", c12[5] === 128);
  f.juste(13, "a)", sigma(1, 4, (k) => k ** 3)); f.juste(13, "b)", Number(sigma(1, 4, (k) => 1 / k).toFixed(2))); f.faux(13, "a)", 30);
  f.juste(14, "a)", Math.sqrt(25)); f.juste(14, "b)", "k^2"); f.juste(14, "b)", "k²"); f.juste(14, "c)", sigma(1, 5, carres)); f.faux(14, "b)", "2k");
  f.juste(15, null, somme(geo(200, 1.5, 3)));
  const c16 = ari(500, -30, 10);
  f.juste(16, "a)", c16[10]); f.juste(16, "b)", somme(c16)); f.faux(16, "b)", 3500);
  const c17 = ari(12, 1.5, 15);
  f.juste(17, "a)", c17[15]); f.juste(17, "b)", c17.length); f.juste(17, "c)", somme(c17)); f.juste(17, "d)", somme(c17) > 400 ? "oui" : "non"); f.faux(17, "a)", 36);
  const S5 = somme(geo(200, 2, 4)), S6 = somme(geo(200, 2, 5));
  f.juste(18, "a)", S5); f.juste(18, "b)", S6); f.juste(18, "c)", S5 >= 10000 ? 5 : 6); f.vrai("somme ex.18 : u(5)", geo(200, 2, 5)[5] === 6400);
  const A19 = ari(1000, 200, 7), B19 = geo(500, 1.5, 7);
  f.juste(19, "a)", A19[7]); f.juste(19, "b)", somme(A19)); f.juste(19, "c)", Math.round(somme(B19))); f.juste(19, "d)", somme(B19) > somme(A19) ? "B" : "A");
  f.faux(19, "c)", 36172); f.vrai("somme ex.19 piège", Math.round(B19[7]) === 8543 && Math.round((8 * (500 + 8543)) / 2) === 36172);
  f.juste(20, "a)", carres(6)); f.juste(20, "b)", sigma(1, 6, carres)); f.juste(20, "c)", sigma(1, 7, carres)); f.faux(20, "b)", 216);
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(13, "b)", 2.09); f.faux(19, "c)", 24630); f.juste(14, "b)", "k au carré");
  f.tout();
}

/* ═══════════════ suite-somme-situations ═══════════════ */
{
  const f = await feuille("suite-somme-situations");
  f.juste(1, null, "somme"); f.faux(1, null, "terme");
  f.juste(2, "a)", "terme"); f.juste(2, "b)", "somme");
  f.juste(3, null, 3 * 12 * 100); f.faux(3, null, 300);
  f.juste(4, null, 24 * 270 - 6000); f.faux(4, null, 6480);
  f.juste(5, null, 36 * 250);
  f.juste(6, "a)", 1000 * 1.03); f.juste(6, "b)", 1000 * 1.03 ** 3); f.faux(6, "b)", 1090);
  f.juste(7, null, 3245 - 3 * 1000); f.faux(7, null, 3245);
  f.juste(8, null, 4800 / 24);
  f.juste(9, "a)", 500 * 1.04 ** 3); f.juste(9, "b)", 500 * 1.04 ** 2); f.juste(9, "c)", 500 * 1.04); f.juste(9, "d)", Math.round(acquise(500, 1.04, 3))); f.faux(9, "d)", 1500);
  f.juste(10, "a)", 1 + 5 / 100); f.juste(10, "b)", 4); f.juste(10, "c)", Math.round(acquise(1000, 1.05, 4))); f.faux(10, "c)", Math.round(1000 * (1.05 ** 4 - 1) / 0.05));
  f.vrai("situations ex.10 : formule du corrigé", Math.abs(1000 * 1.05 * (1.05 ** 4 - 1) / 0.05 - acquise(1000, 1.05, 4)) < 1e-6);
  const a11 = acquise(2000, 1.03, 5);
  f.juste(11, "a)", 5 * 2000); f.juste(11, "b)", Math.round(a11)); f.juste(11, "c)", Math.round(a11) - 10000); f.faux(11, "c)", 300);
  f.juste(12, "a)", 48 * 215); f.juste(12, "b)", 48 * 215 - 9000);
  f.juste(13, "a)", 6600 + 600); f.juste(13, "b)", (6600 + 600) / 36); f.faux(13, "b)", Number((6600 / 36).toFixed(2)));
  f.juste(14, "a)", "B"); f.juste(14, "b)", 6 * 800); f.faux(14, "a)", "A");
  const c15 = geo(200, 1.1, 5);
  f.juste(15, "a)", "terme"); f.juste(15, "b)", "somme"); f.juste(15, "c)", Math.round(c15[5])); f.juste(15, "d)", Math.round(somme(c15)));
  const c16 = ari(7800, 240, 5);
  f.juste(16, "a)", "somme"); f.juste(16, "b)", c16[5]); f.juste(16, "c)", somme(c16)); f.faux(16, "c)", 7800 * 6);
  const a17 = acquise(800, 1.02, 4);
  f.juste(17, "a)", 4 * 800); f.juste(17, "b)", Math.round(a17)); f.juste(17, "c)", Math.round(a17) - 3200); f.juste(17, "d)", a17 >= 3400 ? "oui" : "non"); f.faux(17, "d)", "oui");
  const cA = 60 * 280 - 15000, cB = 48 * 340 - 15000;
  f.juste(18, "a)", cA); f.juste(18, "b)", cB); f.juste(18, "c)", cB < cA ? "B" : "A"); f.juste(18, "d)", 340 - 280); f.faux(18, "c)", "A");
  const c19 = 24 * 270 - 6000, a19 = acquise(2000, 1.03, 3);
  f.juste(19, "a)", c19); f.juste(19, "b)", Math.round(a19)); f.juste(19, "c)", Math.round(a19) - 6000); f.juste(19, "d)", c19 + Math.round(a19) - 6000); f.faux(19, "d)", c19 - (Math.round(a19) - 6000));
  const a20 = acquise(1200, 1.05, 10);
  f.juste(20, "a)", "somme"); f.juste(20, "b)", Math.round(1200 * 1.05 ** 10)); f.juste(20, "c)", 1200 * 1.05); f.juste(20, "d)", Math.round(a20)); f.juste(20, "e)", Math.round(a20) - 12000); f.faux(20, "d)", Math.round(12000 * 1.05 ** 10));
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(6, "b)", 1092.72); f.faux(9, "a)", 562.44); f.faux(9, "d)", 1624); f.faux(10, "c)", 4525); f.faux(11, "b)", 10938); f.faux(11, "c)", 938);
  f.faux(15, "c)", 323); f.faux(15, "d)", 1544); f.faux(17, "b)", 3364); f.faux(17, "c)", 164); f.faux(19, "b)", 6368); f.faux(19, "c)", 368); f.faux(19, "d)", 848);
  f.faux(20, "b)", 1956); f.faux(20, "d)", 15849); f.faux(20, "e)", 3849);
  f.juste(1, null, "une somme"); f.juste(2, "a)", "un terme"); f.faux(2, "a)", "une somme");
  f.tout();
}

/* ═══════════════ suite-comparer ═══════════════ */
{
  const f = await feuille("suite-comparer");
  const arr = (t) => t.map(Math.round);
  f.juste(1, null, 1.2 > 1.01 ? "B" : "A"); f.faux(1, null, "A");
  const A2 = geo(2400, 1.02, 4), B2 = geo(1200, 1.25, 4);
  f.vrai("comparer ex.2 tableau", arr(A2).join() === "2400,2448,2497,2547,2598" && arr(B2).join() === "1200,1500,1875,2344,2930");
  f.juste(2, null, rang(B2, (v, k) => v > A2[k])); f.faux(2, null, 2930);
  f.juste(3, null, 1000 * 1.1 ** 40 > 1000 + 500 * 40 ? "géométrique" : "arithmétique"); f.faux(3, null, "arithmétique");
  f.vrai("comparer ex.3 valeurs", 1000 + 500 * 10 === 6000 && Math.round(1000 * 1.1 ** 10) === 2594 && 1000 + 500 * 40 === 21000 && Math.round(1000 * 1.1 ** 40) === 45259);
  const A4 = ari(3000, 1000, 5), B4 = geo(300, 2, 5);
  f.vrai("comparer ex.4 tableau", A4.join() === "3000,4000,5000,6000,7000,8000" && B4.join() === "300,600,1200,2400,4800,9600");
  f.juste(4, null, rang(B4, (v, k) => v > A4[k]));
  f.juste(5, null, 3000 + 4 * (3000 * 0.05));
  f.juste(6, null, 3000 * 1.05 ** 4); f.faux(6, null, 3600); f.faux(6, null, 3000 * 1.05 * 4);
  f.juste(7, "a)", "0,5 %"); f.vrai("comparer ex.7 a)", 6 / 12 === 0.5); f.juste(7, "b)", `${String(6 / 4).replace(".", ",")} %`); f.faux(7, "b)", "2 %");
  f.juste(8, "a)", "arithmétique"); f.juste(8, "b)", "géométrique"); f.faux(8, "a)", "géométrique");
  const A9 = geo(2500, 1.02, 6), B9 = geo(1100, 1.2, 6), r9 = rang(B9, (v, k) => v > A9[k]);
  f.vrai("comparer ex.9 tableau", arr(A9).join() === "2500,2550,2601,2653,2706,2760,2815" && arr(B9).join() === "1100,1320,1584,1901,2281,2737,3285");
  f.juste(9, "a)", r9); f.juste(9, "b)", r9 - 1); f.juste(9, "c)", 2500 - 1100); f.faux(9, "a)", 5);
  const A10 = ari(5000, 800, 5), B10 = geo(200, 2.5, 5), r10 = rang(B10, (v, k) => v > A10[k]);
  f.vrai("comparer ex.10 tableau", arr(A10).join() === "5000,5800,6600,7400,8200,9000" && arr(B10).join() === "200,500,1250,3125,7813,19531");
  f.juste(10, "a)", r10); f.juste(10, "b)", r10 - 1); f.juste(10, "c)", "A");
  const s11 = 5000 + 5 * (5000 * 0.08), c11 = 5000 * 1.08 ** 5;
  f.juste(11, "a)", s11); f.juste(11, "b)", c11); f.juste(11, "c)", Math.round(c11 - s11));
  f.juste(12, "a)", 10000 * 0.03); f.juste(12, "b)", 1.03); f.juste(12, "c)", 10000 + 10 * 300); f.juste(12, "d)", Math.round(10000 * 1.03 ** 10)); f.faux(12, "a)", 3);
  f.juste(13, "a)", "1 %"); f.vrai("comparer ex.13 a)", 12 / 12 === 1); f.juste(13, "b)", Number((1.01 ** 12).toFixed(4))); f.juste(13, "c)", `${String(((1.01 ** 12 - 1) * 100).toFixed(2)).replace(".", ",")} %`); f.juste(13, "d)", 1.01 ** 12 > 1.12 ? "oui" : "non"); f.faux(13, "c)", "12 %");
  f.juste(14, "a)", "2 %"); f.vrai("comparer ex.14 a)", 8 / 4 === 2); f.juste(14, "b)", Number((1.02 ** 4).toFixed(4))); f.juste(14, "c)", Number((1.0194 ** 4).toFixed(4))); f.juste(14, "d)", Math.abs(1.0194 ** 4 - 1.08) < Math.abs(1.02 ** 4 - 1.08) ? "B" : "A"); f.faux(14, "d)", "A");
  f.vrai("comparer ex.14 : 1,94 %", Math.abs((1.08 ** 0.25 - 1) * 100 - 1.94) < 0.005);
  f.juste(15, "a)", "2 %"); f.vrai("comparer ex.15 a)", 4 / 2 === 2); f.juste(15, "b)", 1.02 ** 2); f.juste(15, "c)", 1.02 ** 2 - 1); f.faux(15, "c)", "4 %");
  f.juste(16, "a)", Math.round(5000 * 1.03 ** 10)); f.juste(16, "b)", Math.round(2000 * 1.3 ** 10)); f.juste(16, "c)", 1.3 > 1.03 ? "B" : "A");
  const a17 = (n) => 8000 + n * (8000 * 0.06), b17 = (n) => 8000 * 1.05 ** n;
  f.juste(17, "a)", a17(5)); f.juste(17, "b)", Math.round(b17(5))); f.juste(17, "c)", a17(10)); f.juste(17, "d)", Math.round(b17(10))); f.juste(17, "e)", a17(5) > b17(5) ? "A" : "B"); f.juste(17, "f)", a17(10) > b17(10) ? "A" : "B");
  const A18 = ari(2000, 100, 13), B18 = geo(2000, 1.04, 13);
  f.vrai("comparer ex.18 tableau", arr(B18.slice(10)).join() === "2960,3079,3202,3330" && A18.slice(10).join() === "3000,3100,3200,3300");
  f.juste(18, "a)", "arithmétique"); f.juste(18, "b)", 1.04); f.juste(18, "c)", rang(B18, (v, k) => k > 0 && v > A18[k])); f.juste(18, "d)", Math.round(B18[13]) - A18[13]); f.faux(18, "c)", 11);
  f.juste(19, "a)", "0,5 %"); f.vrai("comparer ex.19 a)", 6 / 12 === 0.5); f.juste(19, "b)", Number((1.005 ** 12).toFixed(4))); f.juste(19, "c)", Math.round(10000 * 1.005 ** 12)); f.juste(19, "d)", 10000 * 1.06); f.juste(19, "e)", Math.round(10000 * 1.005 ** 12) - 10600);
  f.juste(19, "f)", (1.06 ** (1 / 12) - 1) * 100 < 0.5 ? "équivalent" : "proportionnel"); f.vrai("comparer ex.19 : 0,49 %", Math.abs((1.06 ** (1 / 12) - 1) * 100 - 0.49) < 0.005); f.faux(19, "f)", "proportionnel");
  const a20 = (n) => 2000 + 500 * n, b20 = (n) => 2000 * 1.1 ** n;
  f.juste(20, "a)", a20(10)); f.juste(20, "b)", Math.round(b20(10))); f.juste(20, "c)", a20(20)); f.juste(20, "d)", Math.round(b20(20))); f.juste(20, "e)", a20(10) > b20(10) ? "A" : "B"); f.juste(20, "f)", a20(20) > b20(20) ? "A" : "B");
  // Relecture du 05/11 : tolérance d'une demi-unité, écritures d'élève, réponses données trop tôt.
  f.faux(6, null, 3646.51); f.faux(11, "b)", 7346.65); f.faux(11, "c)", 348); f.faux(12, "d)", 13440); f.faux(13, "b)", 1.1269); f.faux(13, "c)", "12,69 %");
  f.faux(14, "b)", 1.0825); f.faux(14, "c)", 1.08); f.faux(16, "a)", 6721); f.faux(16, "b)", 27573); f.faux(17, "b)", 10211); f.faux(17, "d)", 13032);
  f.faux(19, "b)", 1.0618); f.faux(19, "c)", 10618); f.faux(19, "e)", 18); f.faux(20, "b)", 5188); f.faux(20, "d)", 13456);
  f.juste(3, null, "la suite géométrique"); f.juste(19, "f)", "le taux équivalent");
  f.tout();
}

fin();
