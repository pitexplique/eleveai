// Recalcul indépendant de la feuille « Proportions et pourcentages » de STMG
// (05/11/2026) : lib/fiches-exercices/maths-stmg-auto-proportion.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-auto-proportion.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

const f = await feuille("auto-proportion");

// ★
f.juste(1, null, 10 / 40); f.faux(1, null, 40 / 10);
f.juste(2, null, 8 / (8 + 32)); f.faux(2, null, 25);
f.juste(3, "a)", "0,75"); f.juste(3, "b)", "75 %"); f.faux(3, "b)", "0,75");
f.juste(4, null, "0,08"); f.faux(4, null, "0,8"); f.faux(4, null, "8 %");
f.juste(5, "a)", `${0.4 * 100} %`); f.juste(5, "b)", "12,5 %"); f.vrai("ex.5 b)", 1 / 8 === 0.125); f.juste(5, "c)", `${1.5 * 100} %`);
f.juste(6, null, (240 * 25) / 100); f.faux(6, null, 240 - 25);
f.juste(7, "a)", (300 * 10) / 100); f.juste(7, "b)", (90 * 50) / 100); f.juste(7, "c)", (1200 * 20) / 100);
f.juste(8, null, 0.5 * 0.2); f.faux(8, null, "70 %");

// ★★
f.juste(9, "a)", 80 / 200); f.juste(9, "b)", 20 / 80); f.faux(9, "b)", "10 %");
const tous = 120 + 60 + 20;
f.juste(10, "a)", tous); f.juste(10, "b)", String(120 / tous).replace(".", ",")); f.juste(10, "b)", "0,60"); f.juste(10, "c)", 60 / tous); f.juste(10, "d)", "1/10"); f.vrai("ex.10 d)", 20 / tous === 0.1);
f.juste(11, "a)", (350 * 20) / 100); f.juste(11, "b)", 350 * 1.2); f.juste(11, "c)", 50 / (20 / 100));
f.juste(12, "a)", (12000 * 65) / 100); f.juste(12, "b)", 12000 * 0.35); f.juste(12, "c)", 100 - 65);
f.juste(13, "a)", 0.4 * 0.25); f.juste(13, "b)", 600 * 0.4 * 0.25); f.faux(13, "a)", "25 %");
f.juste(14, "a)", 0.6 * 0.5); f.juste(14, "b)", 120 * 0.6 * 0.5);
f.juste(15, null, 0.025 * 0.7); f.juste(15, null, "environ 1,75 %"); f.faux(15, null, "17,5 %");
f.juste(16, "a)", 18 / 24); f.juste(16, "b)", 21 / 30); f.juste(16, "c)", 18 / 24 > 21 / 30 ? "Inès" : "Maëlle"); f.faux(16, "c)", "Maëlle");

// ★★★
f.juste(17, "a)", 2000 * 0.4); f.juste(17, "b)", 2000 * 0.4 * 0.3); f.juste(17, "c)", 0.4 * 0.3); f.juste(17, "d)", 2000 * 0.4 * 0.3 <= 300 ? "oui" : "non");
const femmes = 5000 * 0.3, hommes = 5000 - femmes;
f.juste(18, "a)", [femmes, hommes]); f.juste(18, "b)", [femmes * 0.8, hommes * 0.9]); f.juste(18, "c)", (femmes * 0.8 + hommes * 0.9) / 5000); f.faux(18, "c)", "85 %");
const inv = 1200 * 0.15;
f.juste(19, "a)", inv); f.juste(19, "b)", [inv * 0.5, inv * 0.3, inv * 0.2]); f.juste(19, "c)", (inv * 0.5) / 1200); f.juste(19, "d)", (inv * 0.2) / 1200); f.faux(19, "d)", "20 %");
f.juste(20, "a)", 2500000 * 0.4); f.juste(20, "b)", 2500000 * 0.4 * 0.25); f.juste(20, "c)", 0.4 * 0.25); f.juste(20, "d)", 0.4 * 0.25 === 0.65 ? "vrai" : "faux");

f.tout();
fin();
