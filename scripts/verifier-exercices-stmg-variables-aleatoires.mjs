// Recalcul indépendant des 6 feuilles STMG de la famille « variables aléatoires »
// (05/11/2026) : lib/fiches-exercices/maths-stmg-va-*.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-variables-aleatoires.mjs
import { readFileSync } from "node:fs";
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

const somme = (t) => t.reduce((a, b) => a + b, 0);
const fois = (x, p) => somme(x.map((v, i) => v * p[i]));
/** Un coefficient binomial, par le triangle de Pascal (jamais de factorielle). */
const C = (n, k) => {
  let ligne = [1];
  for (let i = 0; i < n; i++) ligne = [1, ...ligne.slice(1).map((v, j) => v + ligne[j]), 1];
  return ligne[k];
};
const ligneP = (n) => Array.from({ length: n + 1 }, (_, k) => C(n, k));
const B = (n, p, k) => C(n, k) * p ** k * (1 - p) ** (n - k);

/* ═══ va-loi-probabilite ═══ */
{
  const f = await feuille("va-loi-probabilite");
  f.juste(1, null, [0, 1, 2]); f.faux(1, null, [0, 1]);
  f.juste(2, null, "C"); f.faux(2, null, "B");
  const l3 = [0.3, 0.4, 0.2, 0.1];
  f.juste(3, null, l3[0] + l3[1]); f.faux(3, null, l3[1]);
  const l4 = [0.5, 0.3, 0.15, 0.05];
  f.juste(4, null, l4[2] + l4[3]); f.faux(4, null, l4[3]);
  f.juste(5, null, 1 - 0.85); f.faux(5, null, 0.85);
  f.juste(6, null, 1 - (0.25 + 0.35 + 0.1)); f.faux(6, null, 0.7);
  f.juste(7, "a)", somme([0.2, 0.5, 0.4])); f.juste(7, "b)", Math.abs(somme([0.2, 0.5, 0.4]) - 1) < 1e-9 ? "oui" : "non"); f.faux(7, "b)", "oui");
  f.juste(8, null, 15 / (30 + 15 + 5)); f.faux(8, null, 15);
  // ★★
  const e9 = [55, 25, 15, 5], t9 = somme(e9);
  f.juste(9, "a)", e9.map((e) => e / t9)); f.juste(9, "b)", somme(e9.map((e) => e / t9))); f.faux(9, "a)", e9);
  const e10 = [12, 5, 2, 1], t10 = somme(e10);
  f.juste(10, "a)", e10.map((e) => e / t10)); f.juste(10, "b)", (e10[2] + e10[3]) / t10); f.faux(10, "b)", e10[2] / t10);
  f.vrai("ex.10 total 20", t10 === 20);
  f.juste(11, "a)", (2 + 1) / 10); f.juste(11, "b)", 4 / 10); f.juste(11, "c)", (3 + 2 + 1) / 10); f.faux(11, "a)", 0.2);
  f.vrai("ex.11 total 10", 2 + 1 + 3 + 4 === 10);
  const l12 = [0.6, 0.2, 0.15, 0.05];
  f.juste(12, "a)", l12[0] + l12[1]); f.juste(12, "b)", l12[2] + l12[3]); f.juste(12, "c)", l12[0]); f.juste(12, "d)", l12[2] + l12[3]); f.faux(12, "c)", 0.8);
  f.juste(13, "a)", "C"); f.juste(13, "b)", "B"); f.juste(13, "c)", "A"); f.juste(13, "d)", "D"); f.faux(13, "b)", "A");
  const p14 = 1 - (0.45 + 0.3 + 0.05);
  f.juste(14, "a)", p14); f.juste(14, "b)", 0.3 + p14 + 0.05); f.faux(14, "b)", 0.3);
  f.juste(15, "a)", 0.7 - 0.1 + 0.4); f.juste(15, "b)", [0.7, -0.1, 0.4].every((x) => x >= 0 && x <= 1) ? "oui" : "non"); f.faux(15, "b)", "oui");
  const e16 = [81, 52, 17], t16 = somme(e16);
  f.vrai("ex.16 total 150", t16 === 150);
  f.juste(16, "a)", e16[0] / t16); f.juste(16, "b)", e16[1] / t16); f.juste(16, "c)", e16[2] / t16); f.juste(16, "d)", 0.54 + 0.35 + 0.11); f.faux(16, "a)", 81 / 3);
  f.vrai("ex.16 b) arrondi", Math.round((e16[1] / t16) * 100) === 35); f.vrai("ex.16 c) arrondi", Math.round((e16[2] / t16) * 100) === 11);
  // ★★★
  const e17 = [70, 60, 40, 20, 10], t17 = somme(e17);
  f.vrai("ex.17 total 200", t17 === 200);
  const l17 = e17.map((e) => e / t17);
  f.juste(17, "a)", l17); f.juste(17, "b)", l17[0] + l17[1]); f.juste(17, "c)", l17[2] + l17[3] + l17[4]); f.juste(17, "d)", l17[3] + l17[4]);
  const e18 = [35, 8, 4, 2, 1], t18 = somme(e18);
  f.vrai("ex.18 total 50", t18 === 50);
  const l18 = e18.map((e) => e / t18);
  f.juste(18, "a)", l18); f.juste(18, "b)", l18[2] + l18[3] + l18[4]); f.juste(18, "c)", somme(l18.slice(1))); f.juste(18, "d)", somme(l18.slice(1)) > 1 / 4 ? "vrai" : "faux"); f.faux(18, "d)", "faux");
  const l19 = [0.4, 0.3, 0.2, 0.2];
  f.juste(19, "a)", somme(l19)); f.juste(19, "b)", "non"); const d19 = 1 - (l19[0] + l19[1] + l19[2]);
  f.juste(19, "c)", d19); f.juste(19, "d)", l19[2] + d19); f.faux(19, "d)", 0.4);
  const e20 = [10, 18, 8, 4], t20 = somme(e20);
  f.vrai("ex.20 total 40", t20 === 40);
  const l20 = e20.map((e) => e / t20);
  f.juste(20, "a)", l20); f.juste(20, "b)", l20[0] + l20[1]); f.juste(20, "c)", l20[2] + l20[3]); f.juste(20, "d)", 200 * (l20[2] + l20[3]));
  f.tout();
}

/* ═══ va-esperance ═══ */
{
  const f = await feuille("va-esperance");
  f.juste(1, null, fois([1, 2, 3], [0.5, 0.3, 0.2])); f.faux(1, null, 1);
  f.juste(2, null, fois([0, 10, 20], [0.6, 0.3, 0.1])); f.faux(2, null, (0 + 10 + 20) / 3);
  f.juste(3, null, fois([0, 1, 2, 3], [0.4, 0.3, 0.2, 0.1]));
  f.juste(4, null, fois([-100, 0, 200], [0.3, 0.2, 0.5])); f.faux(4, null, 130);
  f.juste(5, null, 40 * 1.5); f.juste(6, null, "B"); f.faux(6, null, "A");
  const net7 = fois([10 - 2, -2], [0.2, 0.8]);
  f.juste(7, "a)", net7); f.juste(7, "b)", Math.abs(net7) < 1e-9 ? "équitable" : "non"); f.faux(7, "a)", 2);
  const a8 = 1000 * 0.5, b8 = 3000 * 0.2;
  f.juste(8, "a)", a8); f.juste(8, "b)", b8); f.juste(8, "c)", b8 > a8 ? "B" : "A"); f.faux(8, "c)", "A");
  // ★★
  f.juste(9, null, fois([1500, 0], [0.04, 0.96])); f.faux(9, null, 6000);
  f.juste(10, null, 20 * 0.1 + 5 * 0.2);
  f.juste(11, "a)", [20 - 4, 10 - 4, 0 - 4]); const e11 = fois([16, 6, -4], [0.1, 0.1, 1 - 0.1 - 0.1]);
  f.juste(11, "b)", e11); f.juste(11, "c)", e11 < 0 ? "défavorable" : "favorable"); f.faux(11, "a)", [16, 6, 0]);
  const e12 = fois([8 - 5, -5], [0.5, 0.5]);
  f.juste(12, "a)", e12); f.juste(12, "b)", e12 === 0 ? "oui" : "non"); f.juste(12, "c)", 5 / 0.5);
  const la = 3000 * 0.6, to = 8000 * 0.2;
  f.juste(13, "a)", la); f.juste(13, "b)", to); f.juste(13, "c)", la > to ? "lavande" : "tournesol"); f.juste(13, "c)", "la lavande"); f.faux(13, "c)", "tournesol");
  f.juste(5, null, "environ 60 buts"); f.juste(16, "b)", "environ 630 kWh"); f.juste(19, "c)", "l'école"); f.juste(20, "c)", "en plein air"); f.juste(20, "e)", "en salle"); f.faux(20, "e)", "en plein air"); f.juste(11, "c)", "défavorable au joueur"); f.faux(11, "c)", "favorable au joueur");
  const al = 2000 * 0.4;
  f.juste(14, "a)", al); f.juste(14, "b)", 900 > al ? "garantie" : "aléatoire"); f.faux(14, "b)", "aléatoire");
  const e15 = fois([0, 1, 2, 4], [0.3, 0.4, 0.2, 0.1]);
  f.juste(15, "a)", e15); f.juste(15, "b)", 250 * e15);
  const e16 = fois([10, 20, 30], [0.2, 0.5, 0.3]);
  f.juste(16, "a)", e16); f.juste(16, "b)", 30 * e16); f.faux(16, "a)", 20);
  // ★★★
  const c17 = [30, 15, 4, 1], l17 = c17.map((c) => c / somme(c17));
  f.vrai("ex.17 total 50", somme(c17) === 50);
  const b17 = fois([0, 2, 10, 20], l17);
  f.juste(17, "a)", l17); f.juste(17, "b)", b17); f.juste(17, "c)", b17 - 2); f.juste(17, "d)", b17 - 2 < 0 ? "défavorable" : "favorable"); f.juste(17, "e)", 500 * (2 - b17)); f.faux(17, "c)", b17);
  const e18 = 200 * 0.1 + 600 * 0.02;
  f.juste(18, "a)", e18); f.juste(18, "b)", e18); f.juste(18, "c)", 40 - e18); f.juste(18, "d)", 5000 * (40 - e18)); f.faux(18, "d)", 5000 * 40);
  const m19 = fois([12000, -1000], [0.25, 0.75]), s19 = fois([5000, -500], [0.6, 0.4]);
  f.juste(19, "a)", m19); f.juste(19, "b)", s19); f.juste(19, "c)", s19 > m19 ? "école" : "mairie"); f.juste(19, "d)", 10 * (s19 - m19)); f.faux(19, "a)", 3000);
  const p20 = fois([20000, -5000], [0.7, 0.3]), q20 = fois([20000, -5000], [0.6, 0.4]);
  f.juste(20, "a)", p20); f.juste(20, "b)", 12000); f.juste(20, "c)", p20 > 12000 ? "plein air" : "salle"); f.juste(20, "d)", q20); f.juste(20, "e)", q20 > 12000 ? "plein air" : "salle"); f.faux(20, "d)", fois([20000, -5000], [0.6, 0.3]));
  f.tout();
}

/* ═══ va-bernoulli ═══ */
{
  const f = await feuille("va-bernoulli");
  f.juste(1, null, "oui"); f.juste(2, null, "non"); f.faux(2, null, "oui");
  f.juste(3, null, fois([0, 1], [1 - 0.3, 0.3])); f.faux(3, null, 0.5);
  f.juste(4, "a)", 0.85); f.juste(4, "b)", 1 - 0.85); f.faux(4, "a)", 0.15);
  f.juste(5, null, fois([0, 1], [0.65, 0.35])); f.faux(5, null, 0.65);
  f.juste(6, null, "A"); f.faux(6, null, "D");
  f.juste(7, null, 100 * 20); f.faux(7, null, 120);
  f.vrai("ex.8 total 400", 40 + 150 + 170 + 40 === 400);
  f.juste(8, null, 150 + 170); f.faux(8, null, 170);
  // ★★
  f.juste(9, null, "B"); f.faux(9, null, "D");
  f.juste(10, "a)", fois([0, 1], [0.8, 0.2])); f.juste(10, "b)", "non");
  f.juste(11, "a)", 15 / 100); f.juste(11, "b)", 400 * 0.15); f.faux(11, "a)", 15);
  f.juste(12, "a)", "A"); f.juste(12, "b)", "B"); f.faux(12, "b)", "C");
  const r13 = [0.12, 0.87, 0.45, 0.63, 0.05], x13 = r13.map((r) => (r < 0.4 ? 1 : 0));
  f.juste(13, "a)", x13); f.juste(13, "b)", somme(x13) / r13.length); f.faux(13, "a)", [1, 0, 1, 0, 1]);
  f.juste(14, "a)", 500 * 40); f.juste(14, "b)", 500); f.juste(14, "c)", 14 / 40); f.faux(14, "b)", 20000);
  f.vrai("ex.15 total 400", 30 + 170 + 160 + 40 === 400);
  f.juste(15, "a)", 170 + 160); f.juste(15, "b)", 30 + 40); f.juste(15, "c)", (170 + 160) / 400); f.faux(15, "b)", 30);
  f.juste(16, null, "C"); f.faux(16, null, "D");
  // ★★★
  const r17 = [0.03, 0.57, 0.92, 0.08, 0.41, 0.66, 0.15, 0.74, 0.29, 0.88], n17 = r17.filter((r) => r < 0.1).length;
  f.juste(17, "a)", "A"); f.juste(17, "b)", n17); f.juste(17, "c)", n17 / r17.length); f.juste(17, "d)", "non"); f.faux(17, "b)", 3);
  f.vrai("ex.18 total 200", 16 + 84 + 82 + 18 === 200);
  f.juste(18, "a)", 200 * 50); f.juste(18, "b)", 84 + 82); f.juste(18, "c)", (84 + 82) / 200); f.juste(18, "d)", "non"); f.faux(18, "c)", 166 / 10000);
  f.juste(19, "a)", "oui"); f.juste(19, "b)", 1 / 4); f.juste(19, "c)", 1 - 1 / 4); f.juste(19, "d)", fois([0, 1], [3 / 4, 1 / 4])); f.juste(19, "e)", 400 / 4);
  f.juste(20, "a)", "B"); f.juste(20, "b)", 1000 * 25); f.juste(20, "c)", 1000); f.juste(20, "d)", 18 / 25); f.faux(20, "d)", 18 / 1000);
  f.tout();
}

/* ═══ va-binomiale-reconnaitre ═══ */
{
  const f = await feuille("va-binomiale-reconnaitre");
  /** Tous les chemins de n lettres S/E. */
  const chemins = (n) => (n === 0 ? [""] : chemins(n - 1).flatMap((c) => [c + "S", c + "E"]));
  const avecK = (n, k) => chemins(n).filter((c) => c.split("S").length - 1 === k);
  const proba = (c, p) => [...c].reduce((a, l) => a * (l === "S" ? p : 1 - p), 1);
  f.juste(1, null, "oui"); f.juste(2, null, "non"); f.faux(2, null, "oui");
  f.juste(3, "a)", 30); f.juste(3, "b)", 0.2); f.faux(3, "b)", 30);
  f.juste(4, "a)", 16); f.juste(4, "b)", 25 / 100); f.faux(4, "b)", 25);
  f.juste(5, "a)", "A"); f.juste(5, "b)", "B"); f.faux(5, "a)", "C");
  f.juste(6, null, avecK(2, 1).length); f.faux(6, null, 1);
  f.juste(7, null, avecK(3, 2).join(" ; ")); f.juste(7, null, [...avecK(3, 2)].reverse().join(" ; ")); f.faux(7, null, "SSE ; SES ; SSS");
  f.juste(8, null, "B"); f.faux(8, null, "A");
  // ★★
  f.juste(9, null, proba("SES", 0.4)); f.faux(9, null, 1.4);
  f.juste(10, "a)", avecK(2, 2).length); f.juste(10, "b)", proba("SS", 0.7)); f.juste(10, "c)", proba("ES", 0.7));
  f.juste(10, "d)", somme(avecK(2, 1).map((c) => proba(c, 0.7)))); f.faux(10, "d)", 0.21);
  f.juste(11, null, "B"); f.faux(11, null, "D");
  f.juste(12, "a)", 4 / 12); f.juste(12, "b)", (4 - 1) / (12 - 1)); f.juste(12, "c)", 4 / 12 === 3 / 11 ? "oui" : "non"); f.faux(12, "b)", 3 / 12);
  f.juste(13, "a)", 0.1 === 0.4 ? "oui" : "non"); f.juste(13, "b)", "C"); f.faux(13, "a)", "oui"); f.faux(13, "b)", "B"); f.faux(13, "b)", "D");
  f.juste(14, "a)", "oui"); f.juste(14, "b)", 8); f.juste(14, "c)", 0.6); f.juste(14, "d)", 8); f.faux(14, "d)", 8 * 0.6);
  f.juste(15, "a)", 20); f.juste(15, "b)", 1 - 10 / 100); f.faux(15, "b)", 0.1);
  f.juste(16, "a)", "oui"); f.juste(16, "b)", 5); f.juste(16, "c)", 8 / 20); f.juste(16, "d)", "non"); f.faux(16, "b)", 20);
  // ★★★
  f.juste(17, "a)", 3); f.juste(17, "b)", 0.2); f.juste(17, "c)", chemins(3).length); f.juste(17, "d)", avecK(3, 1).length); f.juste(17, "e)", proba("ESE", 0.2));
  f.juste(17, "f)", somme(avecK(3, 1).map((c) => proba(c, 0.2)))); f.vrai("ex.17 f) = B(3 ; 0,2)", Math.abs(B(3, 0.2, 1) - 0.384) < 1e-9); f.faux(17, "e)", proba("SES", 0.2));
  f.juste(18, "a)", "A"); f.juste(18, "b)", 6 / 15); f.juste(18, "c)", 5 / 14); f.juste(18, "d)", 4); f.juste(18, "e)", 6 / 15); f.faux(18, "d)", 15); f.faux(18, "c)", 5 / 15);
  f.juste(19, "a)", 50); f.juste(19, "b)", 0.04); f.juste(19, "c)", 50); f.juste(19, "d)", "vrai"); f.juste(19, "e)", 0.04 === 1 - 0.96 ** 50 ? "vrai" : "faux"); f.faux(19, "e)", "vrai");
  f.juste(20, "a)", "oui"); f.juste(20, "b)", "non"); f.juste(20, "c)", "non"); f.juste(20, "d)", 20); f.juste(20, "e)", 0.15); f.faux(20, "b)", "oui");
  f.tout();
}

/* ═══ va-binomiale-coefficients ═══ */
{
  const f = await feuille("va-binomiale-coefficients");
  // Le triangle dessiné dans la feuille : chaque ligne écrite en clair doit être juste.
  const source = readFileSync(new URL("../lib/fiches-exercices/maths-stmg-va-binomiale-coefficients.tsx", import.meta.url), "utf8");
  for (let n = 0; n <= 10; n++) f.vrai(`triangle, ligne ${n}`, source.includes(`"${ligneP(n).join(" ")}"`));
  const entre = (n, ks) => somme(ks.map((k) => C(n, k)));
  f.juste(1, null, "A"); f.faux(1, null, "B");
  f.juste(2, null, C(5, 2)); f.faux(2, null, 5);
  f.juste(3, "a)", C(6, 0)); f.juste(3, "b)", C(6, 6)); f.faux(3, "a)", 0);
  f.juste(4, "a)", C(7, 1)); f.juste(4, "b)", C(7, 3));
  f.juste(5, null, C(2, 1)); f.faux(5, null, 1);
  f.juste(6, null, ligneP(3));
  f.juste(7, null, C(5, 1) + C(5, 2)); f.faux(7, null, C(5, 1) * C(5, 2));
  f.juste(8, null, ligneP(5)); f.faux(8, null, [1, 5, 10, 10, 5]);
  // ★★
  f.juste(9, "a)", 9 - 7); f.juste(9, "b)", C(9, 7)); f.vrai("ex.9 donnée", C(9, 2) === 36);
  f.juste(10, "a)", somme(ligneP(6))); f.juste(10, "b)", 2 ** 6); f.faux(10, "b)", 12);
  f.juste(11, "a)", entre(4, [2, 3, 4])); f.juste(11, "b)", entre(4, [0, 1])); f.faux(11, "a)", C(4, 2));
  f.vrai("ex.12 données", C(7, 2) === 21 && C(8, 3) === 56);
  f.juste(12, null, C(8, 3) - C(7, 2)); f.vrai("ex.12 résultat", C(8, 3) - C(7, 2) === C(7, 3)); f.faux(12, null, 77);
  f.juste(13, "a)", ligneP(8)); f.juste(13, "b)", C(8, 4)); f.faux(13, "b)", 56);
  f.juste(14, "a)", C(5, 3)); f.juste(14, "b)", C(5, 5 - 2));
  f.juste(15, "a)", "SSS ; SSE ; SES ; ESS"); f.juste(15, "b)", entre(3, [2, 3])); f.faux(15, "a)", "SSE ; SES ; ESS");
  f.juste(16, "a)", C(6, 3)); f.juste(16, "b)", C(6, 3) <= 1 ? "oui" : "non"); f.faux(16, "b)", "oui");
  // ★★★
  f.juste(17, "a)", ligneP(9)); f.juste(17, "b)", ligneP(10)); f.juste(17, "c)", C(10, 5)); f.juste(17, "d)", somme(ligneP(10))); f.faux(17, "a)", [1, 9, 36, 84, 126, 84, 36, 9, 1]);
  f.juste(18, "a)", 2 ** 4); f.juste(18, "b)", C(4, 2)); f.juste(18, "c)", entre(4, [3, 4])); f.juste(18, "d)", entre(4, [0, 1])); f.faux(18, "c)", C(4, 4));
  f.juste(19, "a)", C(5, 2) + C(5, 3)); f.juste(19, "b)", somme(ligneP(6))); f.juste(19, "c)", C(6, 2) + C(6, 3)); f.vrai("ex.19 c)", C(7, 3) === 35); f.faux(19, "c)", 6 + 20);
  f.juste(20, "a)", C(10, 8)); f.juste(20, "b)", C(10, 2)); f.juste(20, "c)", entre(10, [8, 9, 10])); f.juste(20, "d)", 2 ** 10); f.faux(20, "c)", 55);
  f.tout();
}

/* ═══ va-binomiale-calcul ═══ */
{
  const f = await feuille("va-binomiale-calcul");
  // Le corrigé annonce ces arrondis : on les compare au millième exact.
  const mil = (nom, v, attendu) => f.vrai(`${nom} arrondi`, Math.round(v * 1000) / 1000 === attendu);
  f.juste(1, null, B(3, 0.2, 0)); f.faux(1, null, B(3, 0.2, 3)); f.faux(1, null, 0.513);
  f.juste(2, null, B(3, 0.5, 3)); f.faux(2, null, 1.5);
  // Tolérance d'une demi-unité : le millième voisin est refusé, l'arrondi repris des valeurs arrondies aussi.
  f.faux(5, null, 0.411); f.faux(6, null, 0.264); f.faux(11, "b)", 0.231); f.faux(13, "c)", 0.264); f.faux(13, "c)", 0.262); f.faux(17, "c)", 0.082); f.faux(16, "c)", 0.529);
  f.juste(3, null, B(5, 0.4, 0)); f.faux(3, null, 0.4 ** 5); mil("ex.3", B(5, 0.4, 0), 0.078);
  f.juste(4, null, B(3, 0.6, 2)); f.faux(4, null, 0.6 ** 2 * 0.4);
  f.juste(5, null, B(4, 0.2, 1)); f.faux(5, null, 0.2 * 0.8 ** 3); mil("ex.5", B(4, 0.2, 1), 0.41);
  f.juste(6, null, B(4, 0.3, 2)); f.faux(6, null, 0.3 ** 2 * 0.7 ** 2); mil("ex.6", B(4, 0.3, 2), 0.265);
  f.juste(7, null, 1 - B(3, 0.1, 0)); f.faux(7, null, 0.3);
  f.juste(8, null, 50 * 0.2); f.faux(8, null, 50.2);
  // ★★
  f.juste(9, "a)", B(5, 0.1, 0)); f.juste(9, "b)", 1 - B(5, 0.1, 0)); f.faux(9, "a)", 0.1 ** 5); mil("ex.9 a", B(5, 0.1, 0), 0.59); mil("ex.9 b", 1 - B(5, 0.1, 0), 0.41);
  f.juste(10, null, "A"); f.faux(10, null, "D"); f.vrai("ex.10 : 15 chemins", C(6, 2) === 15);
  f.juste(11, "a)", C(5, 3)); f.juste(11, "b)", B(5, 0.4, 3)); f.faux(11, "b)", 10 * 0.4 ** 2 * 0.6 ** 3); mil("ex.11", B(5, 0.4, 3), 0.23);
  f.juste(12, "a)", B(6, 0.25, 0)); f.juste(12, "b)", 1 - B(6, 0.25, 0)); mil("ex.12 a", B(6, 0.25, 0), 0.178); mil("ex.12 b", 1 - B(6, 0.25, 0), 0.822);
  const p013 = B(5, 0.2, 0), p113 = B(5, 0.2, 1);
  f.juste(13, "a)", p013); f.juste(13, "b)", p113); f.juste(13, "c)", 1 - p013 - p113); f.faux(13, "c)", 1 - p013); mil("ex.13 c", 1 - p013 - p113, 0.263);
  f.juste(14, "a)", 200 * 0.05); f.juste(14, "b)", 6 / 40); f.faux(14, "b)", 240);
  f.juste(15, "a)", 20 / 80); f.juste(15, "b)", 200 * (20 / 80));
  const p516 = B(5, 0.7, 5), p416 = B(5, 0.7, 4);
  f.juste(16, "a)", p516); f.juste(16, "b)", p416); f.juste(16, "c)", p516 + p416); f.faux(16, "b)", 0.7 ** 4 * 0.3); mil("ex.16 a", p516, 0.168); mil("ex.16 b", p416, 0.36); mil("ex.16 c", p516 + p416, 0.528);
  // ★★★
  const p017 = B(5, 0.1, 0), p117 = B(5, 0.1, 1);
  f.juste(17, "a)", p017); f.juste(17, "b)", p117); f.juste(17, "c)", 1 - p017 - p117); f.juste(17, "d)", 5 * 0.1); f.juste(17, "e)", 1000 * 5 * 0.1); f.faux(17, "c)", 1 - p017); mil("ex.17 c", 1 - p017 - p117, 0.081);
  const t = [6, 5, 4].map((k) => B(6, 0.75, k));
  f.juste(18, "a)", t[0]); f.juste(18, "b)", t[1]); f.juste(18, "c)", t[2]); f.juste(18, "d)", somme(t)); f.juste(18, "e)", 6 * 0.75); f.faux(18, "c)", 20 * 0.75 ** 4 * 0.25 ** 2);
  mil("ex.18 a", t[0], 0.178); mil("ex.18 b", t[1], 0.356); mil("ex.18 c", t[2], 0.297); mil("ex.18 d", somme(t), 0.831); f.vrai("ex.18 triangle", ligneP(6).join() === "1,6,15,20,15,6,1");
  f.juste(19, "a)", B(10, 0.2, 0)); f.juste(19, "b)", 1 - B(10, 0.2, 0)); f.juste(19, "c)", C(10, 2)); f.juste(19, "d)", B(10, 0.2, 2)); f.juste(19, "e)", 10 * 0.2); f.faux(19, "d)", 45 * 0.2 ** 2 * 0.8 ** 2); mil("ex.19 a", B(10, 0.2, 0), 0.107); mil("ex.19 d", B(10, 0.2, 2), 0.302);
  f.juste(20, "a)", B(4, 0.1, 0)); f.juste(20, "b)", B(4, 0.2, 0)); f.juste(20, "c)", 1 - B(4, 0.2, 0)); f.juste(20, "d)", 4 * 0.1); f.juste(20, "e)", 4 * 0.2); f.juste(20, "f)", 4 * 0.1 < 4 * 0.2 ? "A" : "B"); f.faux(20, "c)", B(4, 0.2, 0));
  f.tout();
}
fin();
