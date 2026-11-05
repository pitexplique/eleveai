// Recalcul indépendant du lot « fonctions-2 » des feuilles STMG (05/11/2026) :
// lib/fiches-exercices/maths-stmg-fct-degre2-courbe.tsx, -symetrie, -factorisee,
// -factoriser, et maths-stmg-fct-degre3.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-fonctions-2.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

// ── Les outils : un produit a(x − r₁)(x − r₂)…, un milieu, une écriture ───────
const prod = (a, racines) => (x) => racines.reduce((p, r) => p * (x - r), a);
const milieu = (u, v) => (u + v) / 2;
const poly = (...c) => (x) => c.reduce((s, k) => s * x + k, 0);
const sym = (axe, x) => 2 * axe - x;
const signe = (v) => (v > 0 ? "positif" : "négatif");
/** L'ensemble où un polynôme à racines simples a le signe voulu, écrit sur la droite. */
function ensemble(a, racines, voulu) {
  const f = prod(a, racines);
  const r = [...racines].sort((p, q) => p - q);
  const bornes = [-Infinity, ...r, Infinity];
  const morceaux = [];
  for (let i = 0; i + 1 < bornes.length; i++) {
    const g = bornes[i];
    const d = bornes[i + 1];
    const t = g === -Infinity ? d - 1 : d === Infinity ? g + 1 : (g + d) / 2;
    if ((f(t) > 0) === (voulu > 0)) morceaux.push(`]${g === -Infinity ? "-∞" : g} ; ${d === Infinity ? "+∞" : d}[`);
  }
  return morceaux.join(" ∪ ");
}
/** Deux polynômes de degré au plus 3 égaux en quatre points : l'égalité d'expressions. */
const memes = (f, g) => [-2, 0, 1, 3].every((x) => Math.abs(f(x) - g(x)) < 1e-9);

/* ═══════════════════════════ fct-degre2-courbe ═══════════════════════════ */
{
  const f = await feuille("fct-degre2-courbe");
  // ★
  f.juste(1, null, -3 > 0 ? "haut" : "bas"); f.faux(1, null, "haut");
  f.juste(2, null, poly(0.5, 0, -2)(4) > poly(0.5, 0, -2)(0) ? "positif" : "négatif"); f.faux(2, null, "négatif");
  const coeffs3 = { f: 0.5, g: -4, h: 2 };
  f.juste(3, null, Object.keys(coeffs3).sort((p, q) => Math.abs(coeffs3[q]) - Math.abs(coeffs3[p]))[0]); f.juste(3, null, "g(x)"); f.faux(3, null, "h"); f.faux(3, null, "h(x)");
  f.juste(1, null, "vers le bas"); f.faux(1, null, "vers le haut");
  // Les écritures qu'un élève tape : ex. 5, 6, 7, 9, 13.
  f.juste(5, null, "f(x) = x² - 3"); f.juste(6, null, "(0;4)"); f.juste(7, null, "1 et -4"); f.juste(7, null, "x = -4 ou x = 1"); f.juste(9, "c)", "-1/2"); f.juste(13, "a)", "D(x) = 0,5x² + 5"); f.juste(13, "b)", "2 unités");
  f.juste(4, "a)", poly(2, 0, 5)(0) - poly(2, 0, 0)(0)); f.juste(4, "b)", 5 > 0 ? "haut" : "bas");
  f.juste(5, null, "x^2 - 3"); f.vrai("ex.5", poly(1, 0, -3)(2) === poly(1, 0, 0)(2) - 3); f.faux(5, null, "(x - 3)^2"); f.faux(5, null, "x^2 + 3");
  f.juste(6, null, `(0 ; ${poly(-1, 0, 4)(0)})`); f.faux(6, null, "(4 ; 0)");
  f.juste(7, null, [1, -4]); f.vrai("ex.7", prod(1, [1, -4])(1) === 0 && prod(1, [1, -4])(-4) === 0); f.faux(7, null, [-1, 4]);
  // La courbe de l'ex.8 : q = [1, -2, -3] a pour racines −1 et 3, tournée vers le haut.
  f.vrai("ex.8 figure", memes(poly(1, -2, -3), prod(1, [-1, 3])));
  f.juste(8, null, "B"); f.faux(8, null, "A");
  // ★★
  f.juste(9, "a)", [0, 6]); f.vrai("ex.9", prod(-0.5, [0, 6])(6) === 0); f.juste(9, "b)", -0.5 > 0 ? "haut" : "bas"); f.juste(9, "c)", -0.5);
  f.vrai("ex.10 figure", memes(poly(-2, 12, -10), prod(-2, [1, 5])));
  f.juste(10, "a)", [1, 5]); f.juste(10, "b)", "A"); f.faux(10, "b)", "B");
  f.juste(11, "a)", "h"); f.juste(11, "b)", "f"); f.juste(11, "c)", "haut"); f.faux(11, "a)", "f");
  f.vrai("ex.12 figure : le point 1 sur B, le 2 sur A", poly(-1, 0, 4)(1) === 3 && poly(-0.25, 0, 4)(3) === 1.75);
  f.juste(12, "a)", 1); f.juste(12, "a)", "courbe 1"); f.juste(12, "b)", poly(-1, 0, 4)(0)); f.vrai("ex.12", poly(-0.25, 0, 4)(0) === 4); f.faux(12, "a)", 2);
  f.juste(13, "a)", "0,5x^2 + 5"); f.juste(13, "b)", 5 - 3); f.juste(13, "c)", "haut"); f.faux(13, "b)", 5);
  f.juste(14, "a)", "-x^2 + 1"); f.vrai("ex.14", poly(-1, 0, 1)(3) === poly(-1, 0, 4)(3) - 3); f.juste(14, "b)", `(0 ; ${4 - 3})`); f.faux(14, "a)", "-(x - 3)^2 + 4");
  f.vrai("ex.15 figure", poly(-1, 0, 1)(0) === 1 && poly(-1, 0, 1)(2) < 1);
  f.juste(15, "a)", poly(-1, 0, 1)(0)); f.juste(15, "b)", "g"); f.faux(15, "b)", "f");
  f.juste(16, "a)", [2, 10]); f.juste(16, "b)", -1); f.juste(16, "c)", "bas"); f.faux(16, "b)", 1);
  // ★★★
  f.juste(17, "a)", "haut"); f.juste(17, "b)", poly(0.5, 0, -2)(0)); f.juste(17, "c)", "0,5x^2 + 1"); f.vrai("ex.17", poly(0.5, 0, 1)(2) === poly(0.5, 0, -2)(2) + 3); f.juste(17, "d)", Math.abs(2) > Math.abs(0.5) ? "oui" : "non");
  f.vrai("ex.18 figures", memes(poly(-0.5, 5, -8), prod(-0.5, [2, 8])) && memes(poly(-1, 10, -16), prod(-1, [2, 8])));
  f.juste(18, "a)", [2, 8]); f.juste(18, "b)", [2, 8]); f.juste(18, "c)", "Q"); f.juste(18, "d)", prod(-0.5, [2, 8])(5)); f.juste(18, "e)", prod(-1, [2, 8])(5)); f.faux(18, "c)", "P");
  f.juste(19, "a)", "h"); f.vrai("ex.19 a)", prod(2, [-1, -4])(-1) === 0); f.juste(19, "b)", "g"); f.juste(19, "c)", prod(2, [1, 4])(0)); f.juste(19, "d)", prod(-2, [1, 4])(0)); f.faux(19, "d)", 8);
  f.juste(20, "a)", "0,25x^2 + 2"); f.juste(20, "b)", poly(0.25, 0, 2)(0)); f.juste(20, "c)", 0.25 * (0 - 2) ** 2); f.juste(20, "d)", 0.25 * (0 - 2) ** 2 === poly(0.25, 0, 2)(0) ? "oui" : "non"); f.juste(20, "e)", poly(0.25, 0, 2)(2)); f.faux(20, "a)", "0,25(x + 2)^2");
  f.tout();
}

/* ══════════════════════════ fct-degre2-symetrie ══════════════════════════ */
{
  const f = await feuille("fct-degre2-symetrie");
  // ★
  f.juste(1, null, milieu(2, 6)); f.faux(1, null, 8);
  f.juste(2, null, milieu(-3, 1)); f.faux(2, null, 1);
  f.vrai("ex.3 figure", memes(poly(0.5, -2, -2.5), prod(0.5, [-1, 5])));
  f.juste(3, null, milieu(-1, 5)); f.faux(3, null, 3);
  f.vrai("ex.4 énoncé", poly(2, -8, 3)(1) === poly(2, -8, 3)(3)); f.juste(4, null, milieu(1, 3)); f.faux(4, null, 4); f.faux(4, null, -3);
  f.juste(5, null, -1 > 0 ? "minimum" : "maximum"); f.juste(5, null, "un maximum"); f.faux(5, null, "minimum"); f.faux(5, null, "un minimum");
  f.juste(6, null, poly(1, -6, 5)(3)); f.vrai("ex.6 : l'axe", poly(1, -6, 5)(0) === poly(1, -6, 5)(6)); f.faux(6, null, 3);
  f.vrai("ex.7", sym(2, 0) === 4); f.juste(7, null, 5); f.faux(7, null, 4);
  f.juste(8, null, sym(1, -2)); f.faux(8, null, 2);
  // ★★
  const b9 = poly(-1, 80, -1200);
  f.vrai("ex.9 a)", b9(0) === -1200 && b9(80) === -1200);
  f.juste(9, "a)", [0, 80]); f.juste(9, "a)", "x = 80 ou x = 0"); f.juste(9, "b)", milieu(0, 80)); f.juste(9, "c)", b9(40)); f.vrai("ex.9 maximum", b9(40) > b9(39)); f.faux(9, "a)", 80); f.faux(9, "c)", 40);
  const h10 = prod(-0.05, [0, 40]);
  f.juste(10, "a)", milieu(0, 40)); f.juste(10, "b)", h10(20));
  const h11 = prod(-0.5, [1, 7]);
  f.vrai("ex.11 figure", memes(poly(-0.5, 4, -3.5), h11)); f.vrai("ex.11 énoncé", h11(2) === 2.5);
  f.juste(11, "a)", milieu(1, 7)); f.juste(11, "b)", h11(sym(4, 2))); f.juste(11, "c)", h11(4));
  const p12 = prod(-0.1, [7, 19]);
  f.juste(12, "a)", milieu(7, 19)); f.juste(12, "a)", "13 h"); f.juste(12, "a)", "13h00"); f.juste(12, "b)", p12(13)); f.vrai("ex.12 énoncé", Math.abs(p12(9) - 2) < 1e-9); f.juste(12, "c)", sym(13, 9)); f.faux(12, "c)", 10);
  const f13 = poly(-1, 6, 0);
  f.vrai("ex.13 tableau", [f13(1), f13(2), f13(3), f13(4)].join() === "5,8,9,8");
  f.juste(13, "a)", milieu(2, 4)); f.juste(13, "b)", f13(3)); f.vrai("ex.13 c)", sym(3, 0) === 6 && f13(0) === 0); f.juste(13, "c)", f13(6)); f.faux(13, "a)", 8);
  const e14 = poly(2, -12, 10);
  f.vrai("ex.14 a)", e14(0) === 10 && e14(6) === 10);
  f.juste(14, "a)", [0, 6]); f.juste(14, "b)", milieu(0, 6)); f.juste(14, "c)", "minimum"); f.juste(14, "d)", e14(3)); f.vrai("ex.14 minimum", e14(3) < e14(2)); f.faux(14, "a)", 6); f.faux(14, "c)", "maximum"); f.faux(14, "d)", -4);
  const r15 = prod(-10, [0, 40]);
  f.vrai("ex.15 énoncé", r15(15) === 3750);
  f.juste(15, "a)", milieu(0, 40)); f.juste(15, "b)", r15(20)); f.juste(15, "c)", sym(20, 15));
  const t16 = prod(-0.5, [1, 13]);
  f.vrai("ex.16 énoncé", t16(3) === t16(11) && t16(5) === 16);
  f.juste(16, "a)", milieu(3, 11)); f.juste(16, "b)", t16(7)); f.juste(16, "c)", sym(7, 5)); f.faux(16, "c)", 11);
  // ★★★
  const b17 = prod(-0.5, [10, 70]);
  f.vrai("ex.17 énoncé", b17(20) === 250);
  f.juste(17, "a)", [10, 70]); f.juste(17, "b)", milieu(10, 70)); f.juste(17, "c)", b17(40)); f.juste(17, "d)", sym(40, 20));
  const h18 = prod(-0.25, [-4, 4]);
  f.vrai("ex.18 figure", memes(poly(-0.25, 0, 4), h18));
  f.juste(18, "a)", milieu(-4, 4)); f.juste(18, "b)", h18(0)); f.juste(18, "c)", h18(2)); f.juste(18, "d)", h18(-2)); f.juste(18, "e)", h18(2) >= 3.5 ? "oui" : "non"); f.faux(18, "e)", "oui");
  const p19 = prod(-2, [1, 9]), q19 = prod(-1, [3, 9]);
  f.vrai("ex.19 énoncé", p19(3) === 24);
  f.juste(19, "a)", milieu(1, 9)); f.juste(19, "b)", p19(5)); f.juste(19, "c)", milieu(3, 9)); f.juste(19, "d)", q19(6)); f.juste(19, "e)", sym(5, 3)); f.juste(19, "f)", p19(5) > q19(6) ? "Noa" : "Rayan"); f.faux(19, "f)", "Rayan");
  const f20 = poly(-2, 80, -600);
  f.vrai("ex.20 énoncé", f20(15) === 150 && f20(0) === -600 && f20(40) === -600);
  f.juste(20, "a)", [0, 40]); f.juste(20, "b)", milieu(0, 40)); f.juste(20, "c)", f20(20)); f.juste(20, "d)", f20(20) === 20 ? "oui" : "non"); f.juste(20, "e)", sym(20, 15)); f.vrai("ex.20 e)", f20(25) === 150); f.faux(20, "c)", 20);
  f.tout();
}

/* ═════════════════════════ fct-degre2-factorisee ═════════════════════════ */
{
  const f = await feuille("fct-degre2-factorisee");
  // ★
  f.juste(1, null, [2, -3]); f.vrai("ex.1", prod(1, [2, -3])(-3) === 0); f.faux(1, null, [-2, 3]);
  f.juste(2, null, [1, 4]); f.faux(2, null, [1, 4, 3]);
  f.juste(3, null, [0, 5]); f.faux(3, null, 5);
  f.vrai("ex.4 : x = 11 ne convient pas", (11 - 1) * (11 + 2) !== 10); f.juste(4, null, "non"); f.faux(4, null, "oui");
  f.juste(5, null, signe(2 - 3)); f.faux(5, null, "positif");
  f.vrai("ex.6 figure", memes(poly(1, -2, -3), prod(1, [-1, 3])));
  f.juste(6, null, signe(prod(1, [-1, 3])(1))); f.faux(6, null, "positif");
  f.juste(7, null, signe(prod(-2, [1, 5])(3))); f.faux(7, null, "négatif");
  f.juste(8, null, ensemble(1, [1, 4], -1)); f.faux(8, null, "]-∞ ; 1[ ∪ ]4 ; +∞["); f.faux(8, null, "[1 ; 4]");
  // ★★
  const e9 = prod(1, [-2, 3]);
  f.juste(9, "a)", [-2, 3]); f.juste(9, "b)", signe(e9(0))); f.juste(9, "c)", ensemble(1, [-2, 3], 1)); f.juste(9, "c)", "]3;+∞[ U ]-∞;-2["); f.juste(9, "c)", "]-∞ ; -2[ ou ]3 ; +∞["); f.faux(9, "c)", "]3 ; +∞["); f.faux(9, "c)", "]-2 ; 3[");
  f.vrai("ex.10 figure", memes(poly(-1, 9, -14), prod(-1, [2, 7])));
  f.juste(10, "a)", [2, 7]); f.juste(10, "b)", ensemble(-1, [2, 7], 1)); f.juste(10, "c)", prod(-1, [2, 7])(8) > 0 ? "oui" : "non");
  f.juste(11, "a)", [1, 7]); f.juste(11, "b)", ensemble(-0.5, [1, 7], 1)); f.juste(11, "c)", signe(prod(-0.5, [1, 7])(8)));
  f.juste(12, "a)", [1, 5]); f.juste(12, "b)", ensemble(1, [1, 5], -1)); f.juste(12, "c)", signe(prod(1, [1, 5])(6))); f.faux(12, "b)", "]-∞ ; 1[ ∪ ]5 ; +∞[");
  f.juste(13, "a)", signe(-5 + 4)); f.juste(13, "b)", signe(-5 - 2)); f.juste(13, "c)", signe(prod(-1, [-4, 2])(-5))); f.faux(13, "c)", "positif");
  f.juste(14, "a)", [0, 6]); f.juste(14, "b)", ensemble(2, [0, 6], -1)); f.faux(14, "a)", [0, 6, 2]);
  f.vrai("ex.15 figure", memes(poly(0.5, -1.5, -2), prod(0.5, [-1, 4])));
  f.juste(15, "a)", [-1, 4]); f.juste(15, "b)", ensemble(0.5, [-1, 4], 1)); f.juste(15, "c)", "B"); f.faux(15, "b)", "]-1 ; 4[");
  f.juste(16, "a)", signe(prod(3, [1, 2])(1.5))); f.juste(16, "b)", signe(prod(-3, [1, 2])(1.5))); f.juste(16, "c)", ensemble(-3, [1, 2], 1)); f.vrai("ex.16", Math.abs(prod(3, [1, 2])(1.5) + 0.75) < 1e-9);
  // ★★★
  const b17 = prod(-2, [10, 50]);
  f.juste(17, "a)", [10, 50]); f.juste(17, "b)", ensemble(-2, [10, 50], 1)); f.juste(17, "c)", b17(5)); f.juste(17, "d)", b17(30)); f.faux(17, "c)", 450);
  f.juste(18, "a)", [2, 10]); f.juste(18, "b)", ensemble(1, [2, 10], -1)); f.juste(18, "c)", 10 - 2); f.juste(18, "d)", signe(prod(1, [2, 10])(12)));
  f.juste(19, "a)", ensemble(-1, [1, 9], 1)); f.juste(19, "b)", ensemble(-1, [3, 7], 1));
  // L'intersection recalculée : les x (au dixième) où les deux sont positifs.
  const communs = Array.from({ length: 120 }, (_, k) => k / 10).filter((x) => prod(-1, [1, 9])(x) > 0 && prod(-1, [3, 7])(x) > 0);
  f.juste(19, "c)", `]${Math.round(communs[0] - 0.1)} ; ${Math.round(communs[communs.length - 1] + 0.1)}[`);
  f.juste(19, "d)", Math.round(communs[communs.length - 1] + 0.1) - Math.round(communs[0] - 0.1)); f.faux(19, "c)", "]1 ; 9[");
  const f20 = prod(1, [2, -5]);
  f.juste(20, "a)", [2, -5]); f.juste(20, "b)", f20(0)); f.juste(20, "c)", f20(0) > 0 ? "oui" : "non"); f.juste(20, "d)", ensemble(1, [2, -5], 1)); f.faux(20, "d)", "]-5 ; 2[");
  f.tout();
}

/* ═════════════════════════ fct-degre2-factoriser ═════════════════════════ */
{
  const f = await feuille("fct-degre2-factoriser");
  /** L'autre racine, par le produit : x₂ = (c ÷ a) ÷ x₁. */
  const autre = (a, c, x1) => c / a / x1;
  // ★
  const f1 = poly(1, -5, 6);
  f.juste(1, "a)", f1(2)); f.juste(1, "b)", f1(2) === 0 ? "oui" : "non");
  const f2 = poly(1, -1, -2);
  f.juste(2, "a)", f2(3)); f.juste(2, "b)", f2(3) === 0 ? "oui" : "non"); f.faux(2, "b)", "oui");
  f.juste(3, null, poly(1, 4, 3)(-1)); f.faux(3, null, -2);
  const f4 = poly(1, -7, 10);
  f.juste(4, null, [-2, 1, 2, 3].find((v) => f4(v) === 0)); f.faux(4, null, -2);
  f.juste(5, null, autre(1, 3, 1)); f.faux(5, null, -4);
  f.juste(6, null, autre(2, -4, 2)); f.faux(6, null, -2); f.vrai("ex.6", poly(2, -2, -4)(2) === 0 && poly(2, -2, -4)(-1) === 0);
  f.vrai("ex.7", memes(poly(1, 1, -2), prod(1, [1, autre(1, -2, 1)])));
  f.juste(7, null, "(x - 1)(x + 2)"); f.juste(7, null, "(x + 2)(x - 1)"); f.juste(7, null, "f(x) = (x-1)×(x+2)"); f.juste(7, null, "(2+x)(x-1)"); f.faux(7, null, "x^2 + x - 2"); f.faux(7, null, "(x - 1)(x - 2)");
  f.vrai("ex.8", memes(prod(1, [2, -3]), poly(1, 1, -6)));
  f.juste(8, null, "x^2 + x - 6"); f.faux(8, null, "(x - 2)(x + 3)"); f.faux(8, null, "x^2 - 6");
  // ★★
  const b9 = poly(-1, 12, -20);
  f.juste(9, "a)", b9(2)); f.juste(9, "b)", autre(-1, -20, 2)); f.vrai("ex.9 c)", memes(b9, prod(-1, [2, 10])));
  f.juste(9, "c)", "-(x - 2)(x - 10)"); f.juste(9, "c)", "(2 - x)(x - 10)"); f.juste(9, "c)", "B(x) = -1(x-10)(x-2)"); f.faux(9, "c)", "(x - 2)(x - 10)"); f.faux(9, "c)", "-x^2 + 12x - 20");
  f.vrai("ex.10", memes(prod(1, [1, -3]), poly(1, 2, -3)));
  f.juste(10, "a)", "x^2 + 2x - 3"); f.juste(10, "b)", memes(prod(2, [1, -3]), poly(2, 4, -6)) ? "oui" : "non"); f.faux(10, "a)", "x^2 + 4x - 3"); f.faux(10, "a)", "x^2 - 3");
  f.vrai("ex.11", memes(prod(1, [-2, 5]), poly(1, -3, -10)));
  f.juste(11, "a)", "x^2 - 3x - 10"); f.juste(11, "b)", memes(prod(1, [-2, 5]), poly(1, 3, -10)) ? "oui" : "non"); f.juste(11, "c)", -2 + -5 + 4); f.faux(11, "c)", 3);
  const h12 = poly(-0.5, 1, 4);
  f.juste(12, "a)", h12(4)); f.juste(12, "b)", autre(-0.5, 4, 4)); f.vrai("ex.12 c)", memes(h12, prod(-0.5, [4, -2])));
  f.juste(12, "c)", "-0,5(x - 4)(x + 2)"); f.juste(12, "c)", "-1/2(x + 2)(x - 4)"); f.juste(12, "c)", "h(x) = -0.5(x+2)(x-4)"); f.faux(12, "c)", "-0,5(x + 4)(x - 2)"); f.vrai("ex.12 piège", h12(2) === 4);
  const p13 = poly(-0.5, 5, -8);
  f.vrai("ex.13 figure", p13(2) === 0 && p13(8) === 0);
  f.juste(13, "a)", 2); f.juste(13, "b)", -0.5); f.vrai("ex.13 c)", autre(-0.5, -8, 2) === 8 && memes(p13, prod(-0.5, [2, 8])));
  f.juste(13, "c)", "-0,5(t - 2)(t - 8)"); f.faux(13, "c)", "(t - 2)(t - 8)");
  const t14 = poly(1, -3, -10);
  f.juste(14, "a)", [-2, 2, 3].find((v) => t14(v) === 0)); f.vrai("ex.14 corrigé", t14(2) === -12 && t14(3) === -10); f.juste(14, "b)", autre(1, -10, -2)); f.vrai("ex.14 c)", memes(t14, prod(1, [-2, 5])));
  f.juste(14, "c)", "(x + 2)(x - 5)"); f.faux(14, "c)", "(x - 2)(x + 5)");
  const f15 = poly(2, 0, -18);
  f.juste(15, "a)", f15(3)); f.juste(15, "b)", autre(2, -18, 3)); f.vrai("ex.15 c)", memes(f15, prod(2, [3, -3])));
  f.juste(15, "c)", "2(x - 3)(x + 3)"); f.juste(15, "d)", Math.max(3, autre(2, -18, 3))); f.faux(15, "c)", "(x - 3)(x + 3)");
  f.vrai("ex.16", memes(prod(-1, [1, 4]), poly(-1, 5, -4)));
  f.juste(16, "a)", "-x^2 + 5x - 4"); f.juste(16, "b)", poly(-1, 5, -4)(1)); f.faux(16, "a)", "-x^2 - 5x + 4");
  // ★★★
  const b17 = poly(-2, 24, -40);
  f.juste(17, "a)", b17(2)); f.juste(17, "b)", autre(-2, -40, 2)); f.vrai("ex.17 c)", memes(b17, prod(-2, [2, 10])));
  f.juste(17, "c)", "-2(x - 2)(x - 10)"); f.vrai("ex.17 d)", memes(prod(1, [2, 10]), poly(1, -12, 20))); f.juste(17, "d)", -(2 + 10)); f.faux(17, "b)", -20); f.faux(17, "d)", 24);
  f.vrai("ex.18", memes(prod(1, [3, 5]), poly(1, -8, 15)) && memes(prod(1, [3, -5]), poly(1, 2, -15)));
  f.juste(18, "a)", "x^2 - 8x + 15"); f.juste(18, "b)", "x^2 + 2x - 15"); f.juste(18, "c)", memes(prod(1, [3, 5]), poly(1, 2, -15)) ? "Jade" : "Samir"); f.juste(18, "d)", autre(1, -15, 3)); f.faux(18, "c)", "Jade");
  const b19 = poly(-10, 150, -360);
  f.juste(19, "a)", [2, 3, 4].find((v) => b19(v) === 0)); f.vrai("ex.19 corrigé", b19(2) === -100 && b19(4) === 80); f.juste(19, "b)", autre(-10, -360, 3)); f.vrai("ex.19 c)", memes(b19, prod(-10, [3, 12])));
  f.juste(19, "c)", "-10(p - 3)(p - 12)"); f.juste(19, "d)", prod(-10, [3, 12])(13)); f.faux(19, "a)", 4);
  const f20 = poly(3, -3, -36);
  f.juste(20, "a)", f20(4)); f.juste(20, "b)", f20(4) === 0 ? "oui" : "non"); f.vrai("ex.20 c)", memes(prod(1, [4, -3]), poly(1, -1, -12)));
  f.juste(20, "c)", "x^2 - x - 12"); f.juste(20, "d)", memes(prod(1, [4, -3]), f20) ? "oui" : "non"); f.vrai("ex.20 e)", memes(prod(3, [4, autre(3, -36, 4)]), f20));
  f.juste(20, "e)", "3(x - 4)(x + 3)"); f.faux(20, "e)", "(x - 4)(x + 3)");
  f.tout();
}

/* ══════════════════════════════ fct-degre3 ═══════════════════════════════ */
{
  const f = await feuille("fct-degre3");
  // ★
  f.juste(1, null, -2 > 0 ? "croissante" : "décroissante"); f.faux(1, null, "croissante");
  f.juste(2, null, poly(0.5, 0, 0, 2)(0));
  f.vrai("ex.3 énoncé", 3 * 2 ** 3 === 24); f.juste(3, null, 3 * (-2) ** 3); f.faux(3, null, 24);
  f.juste(4, null, [1, -2, 4]); f.vrai("ex.4", prod(1, [1, -2, 4])(-2) === 0); f.faux(4, null, [-1, 2, -4]);
  f.juste(5, null, [0, 3, -1]); f.faux(5, null, [-2, 3, -1]);
  const f6 = prod(1, [-1, 2, 3]);
  f.juste(6, "a)", f6(1)); f.juste(6, "b)", f6(1) === 0 ? "oui" : "non"); f.faux(6, "b)", "oui");
  const f7 = prod(1, [-3, 1, 5]);
  f.juste(7, null, [-3, 1, 3, 5].find((v) => f7(v) !== 0)); f.vrai("ex.7 corrigé", f7(3) === -24); f.faux(7, null, -3);
  f.juste(8, null, signe(prod(1, [-2, 1, 4])(5))); f.vrai("ex.8 corrigé", prod(1, [-2, 1, 4])(5) === 28); f.faux(8, null, "négatif");
  // ★★
  f.juste(9, "a)", poly(-0.5, 0, 0, 1)(0)); f.vrai("ex.9 figure", poly(-0.5, 0, 0, 1)(2) === -3 && poly(-0.5, 0, 0, 1)(-2) === 5); f.juste(9, "b)", "B"); f.faux(9, "b)", "C");
  f.juste(10, "a)", "2(x + 2)(x - 1)(x - 3)"); f.juste(10, "a)", "2(x - 3)(x + 2)(x - 1)"); f.juste(10, "b)", prod(2, [-2, 1, 3])(0)); f.faux(10, "a)", "2(x - 2)(x - 1)(x - 3)"); f.faux(10, "a)", "(x + 2)(x - 1)(x - 3)");
  f.juste(11, "a)", [-3, 1, 4]); f.juste(11, "b)", ensemble(1, [-3, 1, 4], 1)); f.juste(11, "b)", "]4;+∞[ ∪ ]-3;1["); f.juste(11, "c)", prod(1, [-3, 1, 4])(0)); f.faux(11, "b)", "]4 ; +∞[");
  f.juste(12, "a)", signe(prod(-1, [-2, 1, 3])(4))); f.juste(12, "b)", ensemble(-1, [-2, 1, 3], 1)); f.juste(12, "c)", prod(-1, [-2, 1, 3])(2)); f.faux(12, "b)", "]-2 ; 1[ ∪ ]3 ; +∞[");
  f.vrai("ex.13 figure", memes(poly(0.5, -1, -2.5, 3), prod(0.5, [-2, 1, 3])));
  f.juste(13, "a)", [-2, 1, 3]); f.juste(13, "b)", signe(prod(0.5, [-2, 1, 3])(2))); f.juste(13, "c)", "B"); f.faux(13, "c)", "A");
  const f14 = prod(1, [1, 3, 6]);
  f.juste(14, "a)", f14(3)); f.juste(14, "b)", f14(3) === 0 ? "oui" : "non"); f.juste(14, "c)", f14(4)); f.juste(14, "d)", f14(4) > 0 ? "oui" : "non");
  const f15 = (x) => 0.5 * x ** 3;
  f.vrai("ex.15 énoncé", f15(4) === 32);
  f.juste(15, "a)", f15(-4)); f.juste(15, "b)", f15(0)); f.juste(15, "c)", "0,5x^3 + 3"); f.juste(15, "d)", f15(-2) + 3); f.faux(15, "d)", 7);
  const f16 = prod(3, [0, 2, -4]);
  f.juste(16, "a)", [0, 2, -4]); f.juste(16, "b)", f16(1)); f.juste(16, "c)", signe(f16(1))); f.faux(16, "a)", [2, -4]);
  // ★★★
  const r17 = prod(-1, [2, 6, 10]);
  f.juste(17, "a)", [2, 6, 10]); f.juste(17, "b)", signe(r17(11))); f.juste(17, "c)", signe(r17(8))); f.juste(17, "d)", r17(8)); f.juste(17, "e)", r17(4)); f.faux(17, "b)", "positif");
  const f18 = prod(0.5, [-1, 2, 5]);
  f.vrai("ex.18 figure", memes(poly(0.5, -3, 1.5, 5), f18));
  f.juste(18, "a)", [-1, 2, 5]); f.juste(18, "b)", "0,5(x + 1)(x - 2)(x - 5)"); f.juste(18, "c)", f18(0)); f.juste(18, "d)", ensemble(0.5, [-1, 2, 5], -1));
  const sous = Array.from({ length: 600 }, (_, k) => (k + 0.5) / 100).filter((x) => f18(x) < 0).length / 100;
  f.juste(18, "e)", Math.round(sous)); f.faux(18, "b)", "(x + 1)(x - 2)(x - 5)");
  const f19 = poly(1, -6, 11, -6);
  f.juste(19, "a)", f19(1)); f.juste(19, "b)", f19(2)); f.juste(19, "c)", f19(4)); f.juste(19, "d)", f19(4) === 0 ? "oui" : "non"); f.vrai("ex.19 e)", memes(f19, prod(1, [1, 2, 3]))); f.juste(19, "e)", signe(f19(4)));
  const f20 = prod(-2, [-1, 1, 3]);
  f.juste(20, "a)", f20(-2)); f.juste(20, "b)", f20(2)); f.juste(20, "c)", f20(-2) > 0 ? "faux" : "vrai"); f.juste(20, "c)", "fausse"); f.faux(20, "c)", "vrai"); f.juste(20, "d)", ensemble(-2, [-1, 1, 3], 1)); f.faux(20, "d)", "]1 ; 3[");
  f.tout();
}

fin();
