// Recalcul indépendant des feuilles STMG de la famille « dérivation » (05/11/2026) :
// lib/fiches-exercices/maths-stmg-der-*.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-derivation.mjs
//
// Les fonctions sont écrites ici sous forme de coefficients (du plus haut degré au
// plus bas), reprises des énoncés : la dérivée, les images, les tangentes et les
// racines sont RECALCULÉES, jamais recopiées.
import { readFileSync } from "node:fs";
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

// ─── Outils ────────────────────────────────────────────────────────────────
const val = (c, x) => c.reduce((s, k) => s * x + k, 0);
const der = (c) => c.slice(0, -1).map((k, i) => k * (c.length - 1 - i));
const pente = (c, a, b) => (val(c, b) - val(c, a)) / (b - a);
const proche = (a, b) => Math.abs(a - b) < 1e-9;
const num = (x) => String(Number(x.toFixed(10))).replace(".", ",");
/** L'expression d'un polynôme, écrite comme un élève au clavier. */
const expr = (c, v = "x") => {
  let s = "";
  c.forEach((k, i) => {
    const p = c.length - 1 - i;
    if (k === 0) return;
    const a = Math.abs(k);
    const lettre = p === 0 ? "" : p === 1 ? v : `${v}^${p}`;
    const corps = p !== 0 && a === 1 ? lettre : `${num(a)}${lettre}`;
    s += s ? (k < 0 ? ` - ${corps}` : ` + ${corps}`) : (k < 0 ? `-${corps}` : corps);
  });
  return s || "0";
};
/** y = mx + p à partir de la tangente en a. */
const tangente = (c, a, v = "x") => {
  const m = val(der(c), a), p = val(c, a) - m * a;
  return `y = ${expr([m, p], v)}`;
};
const droite = (m, y0, a, v = "x") => `y = ${expr([m, y0 - m * a], v)}`;
/** Racines entières d'un polynôme sur un intervalle, par balayage. */
const zeros = (c, de, a) => {
  const r = [];
  for (let x = de; x <= a; x += 0.5) if (Math.abs(val(c, x)) < 1e-9) r.push(x);
  return r;
};
/** Le dessin figure bien dans le source de la feuille. */
const source = (slug) => readFileSync(new URL(`../lib/fiches-exercices/maths-stmg-${slug}.tsx`, import.meta.url), "utf8");

// ═══════════════════ der-secante-tangente ═══════════════════
{
  const f = await feuille("der-secante-tangente");
  const src = source("der-secante-tangente");
  const dessin = (m) => f.vrai(`secante : dessin ${m}`, src.includes(m));

  f.juste(1, null, (8 - 2) / (3 - 1)); f.faux(1, null, (3 - 1) / (8 - 2));
  // Ex. 2 : la droite y = x + 2 coupe y = x² en -1 et 2.
  const r2 = zeros([1, -1, -2], -3, 3);
  f.juste(2, null, r2); f.faux(2, null, [1, 4]); dessin("{ q: [1, 0, 0] }, { q: [0, 1, 2], couleur: ORANGE }");
  const c3 = [1, 0, 1];
  f.juste(3, "a)", val(c3, 1)); f.juste(3, "b)", val(c3, 3)); f.juste(3, "c)", pente(c3, 1, 3)); f.faux(3, "c)", 8);
  // Ex. 4 : la droite est bien tangente en 1 (même image, même pente).
  const c4 = [-1, 0, 4];
  f.vrai("ex.4 tangente", proche(val(der(c4), 1), -2) && proche(val(c4, 1), -2 * 1 + 5));
  f.juste(4, null, "tangente"); f.juste(4, null, "la tangente"); f.faux(4, null, "sécante"); dessin("{ q: [-1, 0, 4] }, { q: [0, -2, 5], couleur: ORANGE }");
  // Ex. 5 : 0,5x² - 2 = x - 2 a deux solutions.
  const r5 = zeros([0.5, -1, 0], -5, 5);
  f.juste(5, "a)", r5.length); f.juste(5, "b)", "sécante"); f.faux(5, "b)", "tangente");
  f.juste(6, null, "faux"); f.faux(6, null, "vrai");
  // Ex. 7 : x² en 2, les pentes valent 4 + h.
  const c7 = [1, 0, 0];
  f.vrai("ex.7 suite", [1, 0.1, 0.01].every((h, i) => proche(pente(c7, 2, 2 + h), [5, 4.1, 4.01][i])));
  f.juste(7, null, val(der(c7), 2)); f.faux(7, null, "4,01");
  // Ex. 8 : x² + x en 3, pente 7 + h.
  const c8 = [1, 1, 0];
  f.vrai("ex.8 7 + h", proche(pente(c8, 3, 3.5), 7.5));
  f.juste(8, null, val(der(c8), 3)); f.faux(8, null, 3);

  const c9 = [2, 0, 0];
  f.juste(9, "a)", pente(c9, 3, 4)); f.juste(9, "b)", pente(c9, 3, 3.1)); f.juste(9, "c)", pente(c9, 3, 3.01)); f.juste(9, "d)", val(der(c9), 3)); f.faux(9, "b)", "1,22");
  f.dit(9, "18{,}1202");
  const c10 = [-1, 6, 0], m10 = pente(c10, 1, 3);
  f.juste(10, "a)", val(c10, 1)); f.juste(10, "b)", val(c10, 3)); f.juste(10, "c)", m10); f.juste(10, "d)", droite(m10, val(c10, 1), 1, "t")); f.faux(10, "a)", 7); f.faux(10, "d)", "y = 2(t - 1) + 5");
  dessin("{ q: [-1, 6, 0] }, { q: [0, 2, 3], couleur: ORANGE }");
  const c11 = [0.5, -3, 5.5];
  f.juste(11, "a)", zeros(der(c11), -1, 7)[0]); f.juste(11, "b)", val(der(c11), 3)); f.juste(11, "c)", val(c11, 3)); dessin("{ q: [0.5, -3, 5.5] }");
  const c12 = [1, -4, 5];
  f.vrai("ex.12 S'(3) = 2", proche(val(der(c12), 3), 2));
  f.juste(12, "a)", val(c12, 3));
  f.juste(12, "b)", proche(2 * 3 - 4, val(c12, 3)) ? "oui" : "non"); f.juste(12, "c)", proche(3 * 3 - 7, val(c12, 3)) ? "oui" : "non");
  f.juste(12, "d)", val(der(c12), 3) === 2 ? "rouge" : "bleue"); f.faux(12, "d)", "bleue");
  const c13 = [-1, 8, 0];
  f.vrai("ex.13 tableau", [0.5, 0.1, 0.01].every((h, i) => proche(pente(c13, 3, 3 + h), [1.5, 1.9, 1.99][i])));
  f.juste(13, "a)", val(c13, 3)); f.juste(13, "b)", val(c13, 4)); f.juste(13, "c)", pente(c13, 3, 4)); f.juste(13, "d)", val(der(c13), 3)); f.faux(13, "d)", "1,99");
  const c14 = [-0.5, 0, 4];
  f.juste(14, "a)", pente(c14, 0, 2)); f.juste(14, "b)", "tangente"); f.juste(14, "c)", val(der(c14), 0)); f.faux(14, "a)", 1);
  dessin("{ q: [-0.5, 0, 4] }, { q: [0, -1, 4], couleur: ORANGE }");
  const c15 = [2, -3, 1];
  f.vrai("ex.15 R'(2) = 5", proche(val(der(c15), 2), 5));
  f.juste(15, "a)", val(c15, 2)); f.juste(15, "b)", proche(5 * 2 - 7, val(c15, 2)) ? "oui" : "non");
  f.juste(15, "c)", proche(5 * 2 - 7, val(c15, 2)) && 5 === val(der(c15), 2) ? "oui" : "non");
  f.vrai("ex.15 d) passe par A", proche(4 * 2 - 5, val(c15, 2)));
  f.juste(15, "d)", 4 === val(der(c15), 2) ? "oui" : "non"); f.faux(15, "d)", "oui");
  const t16 = { 0: 2, 1: 3, 2: 6, 3: 11, 4: 18 };
  const m16 = (t16[3] - t16[1]) / 2;
  f.juste(16, "a)", m16); f.juste(16, "b)", (t16[4] - t16[2]) / 2); f.juste(16, "c)", droite(m16, t16[1], 1)); f.faux(16, "a)", 8);
  dessin("[3, 11]");

  const c17 = [-5, 5, 10];
  f.juste(17, "a)", pente(c17, 1, 2)); f.juste(17, "b)", pente(c17, 1, 1.1)); f.juste(17, "c)", pente(c17, 1, 1.01)); f.juste(17, "d)", val(der(c17), 1));
  f.juste(17, "e)", val(der(c17), 1) < 0 ? "descend" : "monte"); f.faux(17, "d)", "-5,05");
  const c18 = [-0.5, 3, 0];
  f.vrai("ex.18 points", proche(val(c18, 1), 2.5) && proche(val(c18, 3), 4.5) && !proche(val(c18, 2), 4.5));
  f.vrai("ex.18 tangente verte", proche(val(der(c18), 1), 2) && proche(2 * 1 + 0.5, 2.5) && proche(2 * 2 + 0.5, 4.5));
  f.juste(18, "a)", "verte"); f.juste(18, "b)", pente(c18, 1, 3)); f.juste(18, "c)", (4.5 - 2.5) / (2 - 1)); f.juste(18, "d)", val(der(c18), 1)); f.faux(18, "a)", "orange");
  const c19 = [1, 2, 1];
  f.juste(19, "a)", val(c19, 2)); f.juste(19, "b)", val(c19, 3)); f.juste(19, "c)", pente(c19, 2, 3)); f.juste(19, "d)", val(der(c19), 2));
  f.vrai("ex.19 e) passe par A", proche(5 * 2 - 1, val(c19, 2)));
  f.juste(19, "e)", val(der(c19), 2) === 5 ? "oui" : "non"); f.faux(19, "e)", "oui"); f.faux(19, "d)", 7);
  const c20 = [-0.5, 5, 0], m20 = pente(c20, 2, 4);
  f.vrai("ex.20 P'(2) = 3", proche(val(der(c20), 2), 3));
  f.juste(20, "a)", m20); f.juste(20, "b)", droite(m20, val(c20, 2), 2)); f.juste(20, "c)", zeros(der(c20), 0, 10)[0]);
  f.juste(20, "d)", proche(3 * 2 + 3, val(c20, 2)) ? "oui" : "non"); f.faux(20, "d)", "oui");
  dessin("{ q: [-0.5, 5, 0] }");
  f.tout();
}

// ═══════════════════ der-nombre-derive ═══════════════════
{
  const f = await feuille("der-nombre-derive");
  const src = source("der-nombre-derive");
  const dessin = (m) => f.vrai(`nombre-derive : dessin ${m}`, src.includes(m));

  const c1 = [1, 0, 0];
  f.vrai("ex.1 suite", [0.5, 0.1, 0.01].every((h, i) => proche(pente(c1, 3, 3 + h), [6.5, 6.1, 6.01][i])));
  f.juste(1, null, val(der(c1), 3)); f.faux(1, null, "6,01");
  const c2 = [1, -2, 0];
  f.juste(2, null, pente(c2, 1, 4)); f.faux(2, null, 7 / 3);
  f.juste(3, null, 3); f.faux(3, null, -1); f.faux(3, null, 3 * 2 - 1);
  f.juste(4, null, (6 - 2) / (3 - 1)); f.faux(4, null, 4);
  const c5 = [0.5, 0, 1];
  f.vrai("ex.5 tangente", proche(val(der(c5), 2), 2) && proche(2 * 2 - 1, val(c5, 2)) && proche(2 * 3 - 1, 5));
  f.juste(5, null, val(der(c5), 2)); f.faux(5, null, val(c5, 2)); dessin("{ q: [0.5, 0, 1] }, { q: [0, 2, -1], couleur: ORANGE }");
  const c6 = [-1, 0, 3];
  f.vrai("ex.6 tangente", proche(val(der(c6), 1), -2) && proche(-2 * 1 + 4, val(c6, 1)));
  f.juste(6, null, val(der(c6), 1) < 0 ? "négatif" : "positif"); f.juste(6, null, "négative"); f.faux(6, null, "positif"); dessin("{ q: [-1, 0, 3] }, { q: [0, -2, 4], couleur: ORANGE }");
  const c7 = [1, -4, 3];
  f.juste(7, null, zeros(der(c7), -1, 5)[0]); f.faux(7, null, val(c7, 2)); dessin("{ q: [1, -4, 3] }");
  f.juste(8, null, 12); f.juste(8, null, "environ 12 €"); f.faux(8, null, 100);

  const c9 = [1, 4, 0];
  f.vrai("ex.9 d'(t) = 2t + 4", proche(val(der(c9), 7), 2 * 7 + 4));
  f.juste(9, "a)", pente(c9, 2, 4)); f.juste(9, "b)", val(der(c9), 2)); f.juste(9, "c)", val(der(c9), 4)); f.faux(9, "a)", val(c9, 4) / 4);
  f.juste(10, "a)", -30 < 0 ? "diminue" : "augmente"); f.juste(10, "b)", Math.abs(-30)); f.juste(10, "c)", 400 - 30); f.faux(10, "a)", "augmente");
  const c11 = [-0.5, 1, 2.5];
  f.vrai("ex.11 points et tangentes", proche(val(c11, -1), 1) && proche(val(c11, 1), 3) && proche(val(c11, 3), 1)
    && proche(2 * -1 + 3, 1) && proche(-2 * 3 + 7, 1));
  f.juste(11, "a)", val(der(c11), -1)); f.juste(11, "b)", val(der(c11), 1)); f.juste(11, "c)", val(der(c11), 3));
  f.juste(11, "d)", `[-2 ; ${zeros(der(c11), -5, 5)[0]}]`); f.faux(11, "d)", "[1 ; 5]");
  dessin("{ q: [-0.5, 1, 2.5] }");
  f.juste(12, "a)", -1); f.juste(12, "b)", 3); f.juste(12, "c)", 3 * 2 - 1); f.faux(12, "c)", 3);
  const c13 = [0.05, 20, 500];
  f.vrai("ex.13 C'", proche(val(der(c13), 7), 0.1 * 7 + 20));
  f.juste(13, "a)", val(der(c13), 40)); f.juste(13, "b)", val(c13, 41) - val(c13, 40)); f.juste(13, "c)", 30 > val(der(c13), 40) ? "oui" : "non");
  const c14 = [0.5, 1, 0];
  f.vrai("ex.14 d)", proche(pente(c14, 4, 4.01), 5.005));
  f.juste(14, "a)", val(c14, 4)); f.juste(14, "b)", pente(c14, 4, 5)); f.juste(14, "c)", pente(c14, 4, 4.1)); f.juste(14, "d)", val(der(c14), 4)); f.faux(14, "c)", "0,505");
  const c15 = [0.25, 0, 2];
  f.vrai("ex.15 tangente", proche(val(der(c15), 2), 1) && proche(2 + 1, val(c15, 2)) && proche(4 + 1, 5));
  f.juste(15, "a)", val(c15, 2)); f.juste(15, "b)", val(der(c15), 2)); f.juste(15, "c)", tangente(c15, 2)); f.faux(15, "c)", "y = x"); f.faux(15, "a)", val(der(c15), 2));
  dessin("{ q: [0.25, 0, 2] }, { q: [0, 1, 1], couleur: ORANGE }");
  const c16 = [-1, 0, 3, 0];
  const signe = (x) => (x > 0 ? "positif" : "négatif");
  f.vrai("ex.16 points", val(c16, -2) === 2 && val(c16, 0) === 0 && val(c16, 2) === -2);
  f.juste(16, "a)", signe(val(der(c16), -2))); f.juste(16, "b)", signe(val(der(c16), 0))); f.juste(16, "c)", signe(val(der(c16), 2))); f.juste(16, "d)", zeros(der(c16), -3, 3)); f.faux(16, "a)", "positif");
  dessin("{ p: [-1, 0, 3, 0] }");

  const c17 = [0.02, 3, 200], d17 = der(c17);
  f.juste(17, "a)", val(d17, 100)); f.juste(17, "b)", val(d17, 200)); f.juste(17, "c)", 9 > val(d17, 100) ? "oui" : "non"); f.juste(17, "d)", 9 > val(d17, 200) ? "oui" : "non");
  f.juste(17, "e)", (9 - 3) / 0.04); f.vrai("ex.17 e)", proche(val(d17, 150), 9));
  const c18 = [-1, 20, 0], d18 = der(c18);
  f.juste(18, "a)", val(d18, 0)); f.juste(18, "b)", val(d18, 5)); f.juste(18, "c)", pente(c18, 0, 5)); f.juste(18, "d)", zeros(d18, 0, 20)[0]); f.juste(18, "e)", val(c18, 10)); f.faux(18, "d)", 20);
  const c19 = [0.5, -4, 10], d19 = der(c19);
  f.vrai("ex.19 points et tangentes", val(c19, 2) === 4 && val(c19, 4) === 2 && val(c19, 6) === 4 && -2 * 2 + 8 === 4 && 2 * 6 - 8 === 4);
  f.juste(19, "a)", val(d19, 2)); f.juste(19, "b)", val(d19, 6)); f.juste(19, "c)", zeros(d19, 0, 8)[0]); f.juste(19, "d)", val(c19, 4)); f.juste(19, "d)", `${val(c19, 4) * 100} €`); f.juste(19, "e)", val(c19, 7) > val(c19, 6) ? "augmente" : "diminue");
  f.faux(19, "a)", 4); dessin("{ q: [0.5, -4, 10] }");
  f.juste(20, "a)", 40 * 1000); f.juste(20, "a)", "40 milliers"); f.juste(20, "b)", 2 * 1000); f.juste(20, "c)", 40 + 2); f.juste(20, "d)", 40 * 1000 === 2000 ? "vrai" : "faux"); f.faux(20, "d)", "vrai");
  f.tout();
}

// ═══════════════════ der-tangente-equation ═══════════════════
{
  const f = await feuille("der-tangente-equation");
  const src = source("der-tangente-equation");
  const dessin = (m) => f.vrai(`tangente : dessin ${m}`, src.includes(m));
  const oui = (c) => (c ? "oui" : "non");
  const sur = (m, p, x, y) => proche(m * x + p, y);

  f.juste(1, null, droite(4, 3, 2)); f.juste(1, null, "y = -5 + 4x"); f.juste(1, null, "4x - 5"); f.faux(1, null, "y = 3x + 4"); f.faux(1, null, "y = 4(x - 2) + 3");
  f.juste(2, null, droite(1, 6, 1)); f.faux(2, null, "y = x + 6");
  f.juste(3, null, droite(-3, 2, -1)); f.faux(3, null, "y = -3x + 5");
  f.juste(4, null, 2 - 1.5 * 4); f.faux(4, null, 2);
  f.juste(5, null, 1 + 2 * (2 - 1)); f.faux(5, null, 2);
  f.juste(6, null, 3 + -2 * (8 - 4)); f.faux(6, null, 1);
  f.juste(7, null, oui(sur(2, -1, 1, 3))); f.faux(7, null, "oui");
  f.juste(8, null, -2 * 3 + 9); f.faux(8, null, 15);

  const c9 = [1, -3, 1];
  f.vrai("ex.9 M'", proche(val(der(c9), 5), 2 * 5 - 3));
  f.juste(9, "a)", val(c9, 2)); f.juste(9, "b)", val(der(c9), 2)); f.juste(9, "c)", tangente(c9, 2, "t")); f.faux(9, "c)", "y = t - 1");
  f.juste(10, "a)", droite(0.8, 15, 10, "t")); f.juste(10, "b)", 0.8 * 11 + (15 - 8)); f.juste(10, "c)", 0.8 * 10.5 + (15 - 8)); f.faux(10, "b)", 12);
  const c11 = [3, -2, 5], m11 = val(der(c11), 1), p11 = val(c11, 1) - m11;
  f.vrai("ex.11 A'", proche(val(der(c11), 4), 6 * 4 - 2));
  f.juste(11, "a)", tangente(c11, 1)); f.juste(11, "b)", oui(sur(m11, p11, 3, 14))); f.juste(11, "c)", oui(sur(m11, p11, 2, 9))); f.juste(11, "d)", m11 * 5 + p11); f.faux(11, "c)", "oui");
  const c12 = [0.5, -2, 3], m12 = val(der(c12), 4), p12 = val(c12, 4) - 4 * m12;
  f.vrai("ex.12 A sur la courbe", val(c12, 4) === 3); f.vrai("ex.12 f(5) du piège", val(c12, 5) === 5.5);
  f.juste(12, "a)", m12); f.juste(12, "b)", m12 * 5 + p12); f.juste(12, "c)", p12); f.juste(12, "d)", tangente(c12, 4)); f.faux(12, "b)", "5,5");
  dessin("{ q: [0.5, -2, 3] }, { q: [0, 2, -5], couleur: ORANGE }");
  const c13 = [0.5, 10, 100], t13 = val(der(c13), 20);
  f.vrai("ex.13 C'", proche(val(der(c13), 7), 7 + 10));
  f.juste(13, "a)", val(c13, 20)); f.juste(13, "b)", t13); f.juste(13, "c)", tangente(c13, 20)); f.juste(13, "d)", t13 * 21 + (val(c13, 20) - t13 * 20)); f.juste(13, "e)", val(c13, 21));
  const c14 = [1, -6, 11];
  f.vrai("ex.14 H'", proche(val(der(c14), 9), 2 * 9 - 6));
  f.juste(14, "a)", val(der(c14), 3)); f.juste(14, "b)", val(c14, 3)); f.juste(14, "c)", `y = ${val(c14, 3)}`); f.faux(14, "c)", "y = 2x");
  const c15 = [1, 0, -3, 1], m15 = val(der(c15), 2), p15 = val(c15, 2) - 2 * m15;
  f.vrai("ex.15 f'", proche(val(der(c15), 4), 3 * 16 - 3));
  f.juste(15, "a)", val(c15, 2)); f.juste(15, "b)", m15); f.juste(15, "c)", tangente(c15, 2)); f.juste(15, "d)", oui(sur(m15, p15, 3, 12)));
  const c16 = [-1, 4, 0];
  f.vrai("ex.16 g'", proche(val(der(c16), 6), -2 * 6 + 4));
  const m1 = val(der(c16), 1), p1 = val(c16, 1) - m1, m3 = val(der(c16), 3), p3 = val(c16, 3) - 3 * m3;
  f.juste(16, "a)", tangente(c16, 1)); f.juste(16, "b)", tangente(c16, 3)); f.juste(16, "c)", oui(sur(m1, p1, 2, 5) && sur(m3, p3, 2, 5))); f.faux(16, "b)", "y = 2x - 3");
  dessin("{ q: [-1, 4, 0] }, { q: [0, 2, 1], couleur: ORANGE }, { q: [0, -2, 9], couleur: ORANGE }");

  const c17 = [-1, 8, 0], m17 = val(der(c17), 2), p17 = val(c17, 2) - 2 * m17;
  f.juste(17, "a)", expr(der(c17), "t")); f.juste(17, "b)", val(c17, 2)); f.juste(17, "c)", m17); f.juste(17, "d)", tangente(c17, 2, "t")); f.juste(17, "e)", m17 * 2.5 + p17); f.juste(17, "f)", val(c17, 2.5));
  f.juste(17, "a)", `A'(t) = ${expr(der(c17), "t")}`);
  const c18 = [0.5, 2, 10], m18 = val(der(c18), 4), p18 = val(c18, 4) - 4 * m18;
  f.juste(18, "a)", expr(der(c18), "t")); f.juste(18, "b)", tangente(c18, 4, "t")); f.juste(18, "c)", m18 * 5 + p18); f.juste(18, "d)", val(c18, 5)); f.juste(18, "e)", val(c18, 5) - (m18 * 5 + p18)); f.juste(18, "e)", `${(val(c18, 5) - (m18 * 5 + p18)) * 1000} €`); f.faux(18, "a)", "0,5t + 2");
  const c19 = [1, 2, 0], x19 = (8 - 2) / 2;
  f.juste(19, "a)", expr(der(c19))); f.juste(19, "b)", x19); f.juste(19, "c)", val(c19, x19)); f.juste(19, "d)", tangente(c19, x19)); f.juste(19, "e)", oui(proche(8 * 1 + (val(c19, x19) - 8 * x19), -1))); f.faux(19, "b)", 2);
  const c20 = [1, -3, 0, 2], m20 = val(der(c20), 1), p20 = val(c20, 1) - m20;
  f.juste(20, "a)", expr(der(c20))); f.juste(20, "b)", [val(c20, 1), m20]); f.juste(20, "c)", tangente(c20, 1)); f.juste(20, "d)", oui(sur(m20, p20, 3, -6)));
  f.vrai("ex.20 tangente horizontale en 2", val(der(c20), 2) === 0); f.juste(20, "e)", `y = ${val(c20, 2)}`); f.faux(20, "e)", "y = 0");
  f.tout();
}

// ═══════════════════ der-formules ═══════════════════
{
  const f = await feuille("der-formules");
  const src = source("der-formules");
  const dessin = (m) => f.vrai(`formules : dessin ${m}`, src.includes(m));

  const c1 = [1, 0, 0]; f.juste(1, "a)", expr(der(c1))); f.juste(1, "a)", "f'(x) = 2x"); f.juste(1, "b)", val(der(c1), 3)); f.faux(1, "b)", 9); f.faux(1, "a)", "x");
  const c2 = [1, 0, 0, 0]; f.juste(2, "a)", expr(der(c2))); f.juste(2, "b)", val(der(c2), 2)); f.faux(2, "a)", "3x^3");
  f.juste(3, null, expr(der([5, 0, 0]))); f.faux(3, null, "5x");
  f.juste(4, null, expr(der([-2, 0, 0, 0]))); f.faux(4, null, "6x^2");
  f.juste(5, null, expr(der([4, 7]))); f.faux(5, null, 11);
  f.vrai("ex.6", expr(der([6, 0, 0])) === "12x"); f.juste(6, null, expr(der([6, 0, 0])) === "6x" ? "vrai" : "faux"); f.faux(6, null, "vrai");
  f.juste(7, null, expr(der([1, 3, 0]))); f.faux(7, null, "2x + 3x");
  f.juste(8, null, expr(der([1, 1, 0, 0]))); f.faux(8, null, "x^5");

  const c9 = [0.8, 0, 0]; f.juste(9, "a)", expr(der(c9), "t")); f.juste(9, "b)", val(der(c9), 5)); f.faux(9, "b)", val(c9, 5));
  f.juste(10, "a)", expr(der(c1))); f.juste(10, "b)", val(der(c1), 10)); f.juste(10, "c)", val(der(c1), 10) * 0.2); f.juste(10, "d)", val(c1, 10.2) - val(c1, 10)); f.faux(10, "c)", 20);
  f.juste(11, "a)", expr(der(c2))); f.juste(11, "b)", val(der(c2), 5)); f.juste(11, "c)", val(der(c2), 5) * 0.1); f.faux(11, "b)", 225);
  const c12 = [2, 0, 0, 0]; f.juste(12, "a)", expr(der(c12))); f.juste(12, "b)", val(der(c12), 2)); f.juste(12, "c)", Math.sqrt(150 / 6)); f.faux(12, "c)", 25);
  const c13 = [-1, 8, 5]; f.juste(13, "a)", expr(der(c13))); f.juste(13, "b)", val(der(c13), 2)); f.juste(13, "c)", val(der(c13), 2) + 5); f.faux(13, "a)", "-2x + 13");
  const c14 = [-0.5, 0, 0];
  f.vrai("ex.14 tangente", proche(val(c14, 3), -3 * 3 + 4.5) && val(der(c14), 3) === -3);
  f.juste(14, "a)", expr(der(c14))); f.juste(14, "b)", val(der(c14), 3)); f.faux(14, "a)", "x"); f.faux(14, "b)", val(c14, 3)); dessin("{ q: [-0.5, 0, 0] }, { q: [0, -3, 4.5], couleur: ORANGE }");
  const c15 = [3, -6, 15]; f.juste(15, "a)", expr(der(c15), "t")); f.juste(15, "b)", val(der(c15), 2)); f.faux(15, "a)", "6t - 2");
  const c16 = [2, 0, 1]; f.juste(16, "a)", expr(der(c16), "t")); f.juste(16, "b)", 12 / 4); f.juste(16, "c)", val(c16, 3)); f.vrai("ex.16", val(der(c16), 3) === 12);

  const c17 = [-5, 0, 20]; f.juste(17, "a)", expr(der(c17), "t")); f.juste(17, "b)", val(der(c17), 1)); f.juste(17, "c)", Math.sqrt(20 / 5)); f.juste(17, "d)", val(der(c17), 2)); f.juste(17, "e)", 20 * 3.6);
  f.vrai("ex.17 fond", val(c17, 2) === 0); f.faux(17, "c)", 0);
  const a18 = [3, 0, 0], b18 = [1, 0, 0, 0];
  f.juste(18, "a)", expr(der(a18))); f.juste(18, "b)", expr(der(b18))); f.juste(18, "c)", [val(der(a18), 3), val(der(b18), 3)]); f.juste(18, "d)", [val(der(a18), 2), val(der(b18), 2)]);
  f.juste(18, "e)", val(der(b18), 3) > val(der(a18), 3) ? "B" : "A"); f.faux(18, "e)", "A"); f.faux(18, "c)", [27, 18]);
  f.vrai("ex.18 égalité", val(a18, 3) === 27 && val(b18, 3) === 27);
  const c19 = [1, -6, 9, 4], d19 = der(c19);
  f.juste(19, "a)", expr(d19, "t")); f.juste(19, "b)", val(d19, 0)); f.juste(19, "c)", val(d19, 2)); f.juste(19, "d)", [val(d19, 1), val(d19, 3)]); f.juste(19, "e)", val(d19, 2) < 0 ? "descend" : "monte");
  const P = [8, 0, 0], Q = [2, 0, 0], R = [4, 0, 0];
  f.juste(20, "a)", expr(der(P))); f.juste(20, "b)", expr(der(Q))); f.juste(20, "c)", expr(der(R)));
  f.juste(20, "d)", ["P", "Q", "R"][[P, Q, R].findIndex((c) => expr(der(c)) === "4x")]); f.faux(20, "d)", "R"); f.faux(20, "d)", "P");
  f.juste(20, "e)", 4 * 10); f.juste(20, "f)", val(Q, 10));
  f.tout();
}

/** Le produit de deux polynômes, pour vérifier une forme factorisée. */
const fois = (a, b) => {
  const r = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (r[i + j] += x * y)));
  return r;
};
const memes = (a, b) => a.length === b.length && a.every((x, i) => proche(x, b[i]));
const fact = (k, ...facteurs) => facteurs.reduce((p, q) => fois(p, q), [k]);
const moins = (a, b) => {
  const n = Math.max(a.length, b.length);
  const A = [...Array(n - a.length).fill(0), ...a], B = [...Array(n - b.length).fill(0), ...b];
  return A.map((x, i) => x - B[i]);
};

// ═══════════════════ der-polynome ═══════════════════
{
  const f = await feuille("der-polynome");
  const oui = (c) => (c ? "oui" : "non");

  f.juste(1, null, expr(der([1, -7, -7]))); f.faux(1, null, "2x"); f.faux(1, null, "2x - 7x");
  f.juste(2, null, expr(der([4, 6, 1]))); f.faux(2, null, "4x + 6");
  f.juste(3, null, expr(der([-1, 4, 0]))); f.faux(3, null, "2x + 4");
  f.juste(4, null, expr(der([2, -1, 5, -1]))); f.faux(4, null, "6x^3 - 2x^2 + 5");
  f.juste(5, null, expr(der([1, 0, -5, -9]))); f.faux(5, null, "3x^2 - 14");
  const c6 = [3, -7, 2]; f.juste(6, "a)", expr(der(c6))); f.juste(6, "b)", val(der(c6), 5)); f.faux(6, "b)", val(c6, 5)); f.dit(6, "42");
  f.vrai("ex.6 f(5) du piège", val(c6, 5) === 42);
  const c7 = [1, 0, -2, 3]; f.juste(7, "a)", expr(der(c7), "t")); f.juste(7, "b)", val(der(c7), 2)); f.faux(7, "b)", 34);
  const c8 = [1, 0, -27, 4]; f.juste(8, "a)", expr(der(c8))); f.juste(8, "a)", `f'(x) = ${expr(der(c8))}`); f.faux(8, "a)", "3(x + 3)(x - 3)"); f.juste(8, "b)", oui(memes(der(c8), fact(3, [1, 3], [1, -3])))); f.faux(8, "b)", "non");

  const c9 = [1, 6, 80]; f.juste(9, "a)", expr(der(c9))); f.juste(9, "b)", val(der(c9), 20)); f.juste(9, "c)", val(c9, 21) - val(c9, 20)); f.faux(9, "a)", "2x + 86");
  const c10 = [-1, 10, 5]; f.juste(10, "a)", expr(der(c10), "t")); f.juste(10, "b)", val(der(c10), 3)); f.juste(10, "c)", val(der(c10), 3) === 9 ? "vrai" : "faux");
  f.vrai("ex.10 Lucas", val(der(c10), 3) + 5 === 9); f.faux(10, "b)", 9);
  const c11 = [2, -24, 90]; f.juste(11, "a)", expr(der(c11))); f.juste(11, "b)", zeros(der(c11), 0, 20)[0]); f.juste(11, "c)", val(c11, 6));
  const c12 = [0.5, -2, 10]; f.juste(12, "a)", expr(der(c12), "t")); f.juste(12, "b)", 3 + 2); f.juste(12, "c)", val(c12, 5)); f.vrai("ex.12 pente", val(der(c12), 5) === 3); f.faux(12, "a)", "0,5t - 2");
  const c13 = [1, -3, -9, 4], F13 = fact(3, [1, 1], [1, -3]);
  f.juste(13, "a)", expr(der(c13))); f.juste(13, "a)", `S'(x) = ${expr(der(c13))}`); f.faux(13, "a)", "3(x + 1)(x - 3)"); f.juste(13, "b)", oui(memes(der(c13), F13))); f.juste(13, "c)", val(F13, 3)); f.juste(13, "d)", val(der(c13), 1));
  const c14 = [2, 3, -12, 0], F14 = fact(6, [1, -2], [1, 1]);
  f.juste(14, "a)", expr(der(c14))); f.juste(14, "b)", val(der(c14), 1)); f.juste(14, "c)", val(F14, 1)); f.juste(14, "d)", oui(memes(der(c14), F14))); f.faux(14, "d)", "oui");
  const c15 = [2, -6, 0, 1], F15 = fact(6, [1, 0], [1, -2]);
  f.juste(15, "a)", oui(memes(der(c15), F15))); f.juste(15, "b)", zeros(F15, -5, 5)); f.juste(15, "c)", val(der(c15), 1)); f.faux(15, "b)", 2);
  const g16 = [-0.5, 3, 30], h16 = [0.1, -1, 0, 40];
  f.vrai("ex.16 populations positives", [0, 2, 4, 6, 8, 10].every((x) => val(g16, x) > 0 && val(h16, x) > 0));
  f.juste(16, "a)", expr(der(g16))); f.juste(16, "b)", val(der(g16), 4)); f.juste(16, "c)", expr(der(h16))); f.juste(16, "d)", val(der(h16), 10)); f.faux(16, "c)", "0,1x^2 - 2x");

  const c17 = [0.1, -3, 40, 100], d17 = der(c17);
  f.juste(17, "a)", expr(d17)); f.juste(17, "b)", val(d17, 10)); f.juste(17, "c)", val(d17, 20)); f.juste(17, "d)", oui(val(d17, 10) < 25)); f.juste(17, "e)", oui(val(d17, 20) < 25)); f.faux(17, "e)", "oui");
  const c18 = [-1, 6, 0, 0], F18 = fact(-3, [1, 0], [1, -4]);
  f.juste(18, "a)", expr(der(c18), "t")); f.juste(18, "b)", oui(memes(der(c18), F18))); f.juste(18, "c)", zeros(F18, -5, 10)); f.juste(18, "d)", val(c18, 4)); f.juste(18, "e)", val(der(c18), 2));
  const c19 = [1, -12, 36, 0], F19 = fact(3, [1, -2], [1, -6]);
  f.juste(19, "a)", expr(der(c19), "t")); f.juste(19, "b)", oui(memes(der(c19), F19))); f.juste(19, "c)", zeros(F19, 0, 10)); f.juste(19, "d)", val(F19, 4)); f.juste(19, "e)", val(c19, 2)); f.faux(19, "e)", 0);
  const c20 = [3, -4, -9, 8];
  f.juste(20, "a)", expr(der(c20))); f.juste(20, "b)", val(der(c20), 2)); f.juste(20, "c)", val([9, -8, -9, 0], 2)); f.juste(20, "d)", der(c20).length - 1); f.faux(20, "a)", "9x^3 - 8x^2 - 9x");
  f.tout();
}

// ═══════════════════ der-variations ═══════════════════
{
  const f = await feuille("der-variations");
  const src = source("der-variations");
  const dessin = (m) => f.vrai(`variations : dessin ${m}`, src.includes(m));
  const signe = (v) => (v > 0 ? "positif" : "négatif");
  const sens = (v) => (v > 0 ? "croissante" : "décroissante");
  /** Le tableau du corrigé porte bien les valeurs recalculées. */
  const tab = (c, bornes, signes, F, V) => {
    const vals = bornes.map((x) => val(c, x));
    const interieurs = signes.map((_, i) => (val(der(c), (bornes[i] + bornes[i + 1]) / 2) > 0 ? "+" : "-"));
    f.vrai(`variations : signes ${F} ${bornes}`, interieurs.join() === signes.join());
    const f2 = F && F !== "f" ? `, "${F}"` : "";
    const v2 = V ? `, "${V}"` : "";
    dessin(`tableauDerivee([${bornes.join(", ")}], [${signes.map((s) => `"${s}"`).join(", ")}], [${vals.map((v) => String(Number(v.toFixed(6)))).join(", ")}]${f2}${v2})`);
  };

  f.juste(1, "a)", 6 / 2); f.juste(1, "b)", signe(val([2, -6], 4))); f.faux(1, "b)", "négatif"); f.faux(1, "a)", 6);
  f.juste(2, "a)", 12 / 4); f.juste(2, "b)", signe(val([-4, 12], 0))); f.faux(2, "b)", "négatif");
  f.juste(3, null, "décroissante"); f.faux(3, null, "négative"); f.faux(3, null, "croissante");
  f.juste(4, null, "positif"); f.juste(4, null, "positif ou nul"); f.juste(4, null, "≥ 0"); f.faux(4, null, "négatif");
  f.juste(5, "a)", sens(1)); f.juste(5, "b)", sens(-1)); f.faux(5, "a)", "décroissante");
  const c6 = [1, -6, 2];
  f.juste(6, "a)", expr(der(c6))); f.juste(6, "b)", zeros(der(c6), -1, 7)[0]); f.juste(6, "c)", val(c6, 3)); f.faux(6, "c)", 0); tab(c6, [-1, 3, 7], ["-", "+"]);
  const c7 = [2, -8, 0];
  f.juste(7, "a)", zeros(der(c7), 0, 4)[0]); f.juste(7, "b)", val(c7, 2)); f.faux(7, "b)", 2); tab(c7, [0, 2, 4], ["-", "+"]);
  const v8 = [-2, 6, 1];
  f.juste(8, "a)", Math.max(...v8)); f.juste(8, "b)", [0, 4, 8][v8.indexOf(Math.max(...v8))]); f.juste(8, "c)", Math.min(...v8)); f.juste(8, "d)", [0, 4, 8][v8.indexOf(Math.min(...v8))]); f.faux(8, "c)", 1);
  dessin('figure: tableauDerivee([0, 4, 8], ["+", "-"], [-2, 6, 1])');

  const d9 = [-1, 3];
  f.juste(9, "a)", signe(val(d9, 0))); f.juste(9, "b)", signe(val(d9, 4))); f.juste(9, "c)", sens(val(d9, 0))); f.juste(9, "d)", val(d9, 2) > 0 && val(d9, 4) < 0 ? "maximum" : "minimum"); f.faux(9, "c)", "décroissante");
  dessin("{ q: [0, -1, 3] }");
  const c10 = [1, -8, 30];
  f.juste(10, "a)", expr(der(c10), "t")); f.juste(10, "b)", zeros(der(c10), 0, 8)[0]); f.juste(10, "c)", signe(val(der(c10), 0))); f.juste(10, "d)", val(c10, 4)); f.faux(10, "d)", 4); tab(c10, [0, 4, 8], ["-", "+"], "A", "t");
  const c11 = [-2, 24, 20];
  f.juste(11, "a)", expr(der(c11), "t")); f.juste(11, "b)", zeros(der(c11), 0, 10)[0]); f.juste(11, "c)", val(c11, 6)); f.juste(11, "d)", val(c11, 10)); tab(c11, [0, 6, 10], ["+", "-"], "T", "t");
  const F12 = fact(2, [1, 3], [1, -2]);
  f.juste(12, "a)", zeros(F12, -5, 5)); f.juste(12, "b)", signe(val(F12, 0))); f.juste(12, "c)", signe(val(F12, 3))); f.juste(12, "d)", sens(val(F12, 0))); f.faux(12, "a)", [3, -2]);
  const c13 = [1, 0, -12, 0];
  f.vrai("ex.13 forme", memes(der(c13), fact(3, [1, 2], [1, -2])));
  f.juste(13, "a)", -2); f.vrai("ex.13 max local", val(der(c13), -3) > 0 && val(der(c13), -1) < 0);
  f.juste(13, "b)", 2); f.vrai("ex.13 min local", val(der(c13), 1) < 0 && val(der(c13), 3) > 0);
  f.juste(13, "c)", val(c13, -2)); f.juste(13, "d)", val(c13, 2)); f.faux(13, "c)", -16); tab(c13, [-4, -2, 2, 4], ["+", "-", "+"], "h");
  const F14 = fact(-1, [1, -2], [1, -5]);
  f.juste(14, "a)", zeros(F14, 0, 7)); f.juste(14, "b)", signe(val(F14, 3))); f.juste(14, "c)", signe(val(F14, 0)));
  f.juste(14, "d)", val(F14, 4) > 0 && val(F14, 6) < 0 ? 5 : 2); f.juste(14, "e)", val(F14, 1) < 0 && val(F14, 3) > 0 ? 2 : 5); f.faux(14, "b)", "négatif");
  const c15 = [-1, 10, -16];
  f.juste(15, "a)", expr(der(c15))); f.juste(15, "b)", zeros(der(c15), 0, 10)[0]); f.juste(15, "c)", val(c15, 5)); f.juste(15, "d)", [val(c15, 0), val(c15, 10)]); f.juste(15, "e)", "[0 ; 5]"); f.juste(15, "e)", "[0 ; 5["); f.faux(15, "e)", "[-16 ; 9]"); f.faux(15, "e)", "[5 ; 10]"); tab(c15, [0, 5, 10], ["+", "-"], "g");
  f.juste(16, "a)", "descend"); f.juste(16, "b)", "au-dessus"); f.juste(16, "b)", "au dessus"); f.juste(16, "c)", "non"); f.faux(16, "a)", "monte"); f.faux(16, "b)", "au-dessous");

  const c17 = [-0.5, 6, 10];
  f.juste(17, "a)", expr(der(c17), "t")); f.juste(17, "b)", zeros(der(c17), 0, 12)[0]); f.juste(17, "c)", val(c17, 6)); f.juste(17, "d)", 6 + 6); f.juste(17, "d)", "midi"); f.juste(17, "d)", "12h00"); f.juste(17, "e)", val(c17, 18 - 6)); f.faux(17, "d)", 6); tab(c17, [0, 6, 12], ["+", "-"], "S", "t");
  const c18 = [1, -9, 24, 10], d18 = der(c18);
  f.vrai("ex.18 forme", memes(d18, fact(3, [1, -2], [1, -4])));
  const b18 = [0, 2, 4, 5], v18 = b18.map((x) => val(c18, x)), max18 = Math.max(...v18), min18 = Math.min(...v18);
  f.juste(18, "a)", zeros(d18, 0, 5)); f.juste(18, "b)", val(c18, 2)); f.juste(18, "c)", val(c18, 4)); f.juste(18, "d)", [val(c18, 0), val(c18, 5)]); f.juste(18, "d)", "10 et 30"); f.juste(18, "e)", max18);
  f.juste(18, "f)", b18.filter((x) => val(c18, x) === max18)); f.juste(18, "g)", min18); f.faux(18, "g)", 26); f.faux(18, "f)", 2); tab(c18, b18, ["+", "-", "+"], "P", "t");
  const d19 = [1, -2, -3];
  f.juste(19, "a)", zeros(d19, -3, 5)); f.juste(19, "b)", signe(val(d19, 0))); f.juste(19, "c)", sens(val(d19, 0))); f.juste(19, "d)", val(d19, -2) > 0 && val(d19, 0) < 0 ? -1 : 3); f.juste(19, "e)", val(d19, 2) < 0 && val(d19, 4) > 0 ? 3 : -1); f.faux(19, "e)", 1);
  dessin("{ q: [1, -2, -3] }");
  const c20 = [1, 0, 3, 1], g20 = [1, 0, 0, 0];
  f.juste(20, "a)", expr(der(c20))); f.juste(20, "b)", signe(Math.min(...[-3, -1, 0, 1, 3].map((x) => val(der(c20), x))))); f.juste(20, "c)", "non");
  f.juste(20, "d)", val(der(g20), 0)); f.juste(20, "e)", signe(val(der(g20), -1) > 0 && val(der(g20), 1) > 0 ? 1 : -1)); f.juste(20, "f)", val(der(g20), -1) * val(der(g20), 1) < 0 ? "oui" : "non"); f.faux(20, "f)", "oui");
  f.tout();
}

// ═══════════════════ der-optimisation ═══════════════════
{
  const f = await feuille("der-optimisation");
  const src = source("der-optimisation");
  const dessin = (m) => f.vrai(`optimisation : dessin ${m}`, src.includes(m));
  const tab = (c, bornes, signes, F, V) => {
    const vals = bornes.map((x) => val(c, x));
    const interieurs = signes.map((_, i) => (val(der(c), (bornes[i] + bornes[i + 1]) / 2) > 0 ? "+" : "-"));
    f.vrai(`optimisation : signes ${F} ${bornes}`, interieurs.join() === signes.join());
    const f2 = F && F !== "B" ? `, "${F}"` : "";
    const v2 = V ? `, "${V}"` : "";
    dessin(`tableauDerivee([${bornes.join(", ")}], [${signes.map((s) => `"${s}"`).join(", ")}], [${vals.map((v) => String(Number(v.toFixed(6)))).join(", ")}]${f2}${v2})`);
  };
  const racine = (d) => -d[1] / d[0];

  const c1 = [-1, 40, -100];
  f.juste(1, "a)", expr(der(c1))); f.juste(1, "b)", racine(der(c1))); f.faux(1, "b)", 40);
  const c2 = [-3, 240, -1000];
  f.vrai("ex.2 max en 40", racine(der(c2)) === 40); f.juste(2, null, val(c2, 40)); f.faux(2, null, 40);
  const c3 = [1, -60, 1200];
  f.juste(3, null, racine(der(c3))); f.faux(3, null, 60);
  const c4 = [0.5, -20, 300];
  f.vrai("ex.4 min en 20", racine(der(c4)) === 20); f.juste(4, null, val(c4, 20)); f.faux(4, null, 0);
  f.juste(5, null, "minimum"); f.faux(5, null, "maximum");
  f.juste(6, "a)", "maximum"); f.juste(6, "b)", 25); f.faux(6, "b)", 50); f.faux(6, "a)", "minimum");
  f.juste(7, null, [15, 2250]); f.faux(7, null, [2250, 15]);
  f.juste(8, null, 2); f.faux(8, null, 1); f.faux(8, null, 3);

  const C9 = [1, 10, 50], B9 = moins([30, 0], C9);
  f.juste(9, "a)", expr(B9)); f.juste(9, "b)", expr(der(B9))); f.juste(9, "c)", racine(der(B9))); f.juste(9, "d)", val(B9, 10)); f.faux(9, "a)", "-x^2 + 40x + 50"); tab(B9, [0, 10, 20], ["+", "-"]);
  const R10 = fois([1, 0], [-20, 300]), p10 = racine(der(R10));
  f.juste(10, "a)", expr(der(R10), "p")); f.juste(10, "b)", p10); f.juste(10, "c)", 300 - 20 * p10); f.juste(10, "d)", val(R10, p10)); f.faux(10, "c)", 300); tab(R10, [0, 7.5, 15], ["+", "-"], "R", "p");
  const B11 = [-1, 0, 75, -20];
  f.vrai("ex.11 forme", memes(der(B11), fact(-3, [1, -5], [1, 5])));
  f.juste(11, "a)", zeros(der(B11), 0, 10)[0]); f.juste(11, "b)", val(B11, 5)); f.juste(11, "c)", val(B11, 10)); f.juste(11, "d)", [5, val(B11, 5)]); f.faux(11, "a)", -5); tab(B11, [0, 5, 10], ["+", "-"]);
  const D12 = [1, -15, 63, 20];
  f.vrai("ex.12 forme", memes(der(D12), fact(3, [1, -3], [1, -7])));
  f.juste(12, "a)", val(der(D12), 5) < 0 ? "négatif" : "positif"); f.juste(12, "b)", [3, 7, 10].reduce((m, x) => (val(D12, x) < val(D12, m) ? x : m), 3)); f.juste(12, "c)", val(D12, 7)); f.faux(12, "b)", 3); tab(D12, [3, 7, 10], ["-", "+"], "D");
  const C13 = [0.1, -12, 500], x13 = racine(der(C13));
  f.juste(13, "a)", expr(der(C13))); f.juste(13, "b)", x13); f.juste(13, "c)", val(C13, x13)); f.juste(13, "d)", val(C13, x13) / 100); f.faux(13, "d)", 140); tab(C13, [0, 60, 120], ["-", "+"], "C");
  const v14 = { 0: -100, 40: 1500, 60: 700 };
  const x14 = [0, 40, 60].reduce((m, x) => (v14[x] > v14[m] ? x : m), 0);
  f.juste(14, "a)", x14); f.juste(14, "b)", v14[x14]); f.juste(14, "c)", 3); f.faux(14, "a)", 60); f.faux(14, "c)", 1);
  dessin('figure: tableauDerivee([0, 40, 60], ["+", "-"], [-100, 1500, 700])');
  const C15 = [0.001, -0.16, 12], v15 = racine(der(C15));
  f.juste(15, "a)", expr(der(C15), "v")); f.juste(15, "b)", v15); f.juste(15, "c)", val(C15, v15)); f.juste(15, "d)", [v15, val(C15, v15)]); f.faux(15, "d)", [5.6, 80]); tab(C15, [40, 80, 120], ["-", "+"], "C", "v");
  const B16 = [-0.5, 20, 100], x16 = racine(der(B16));
  f.juste(16, "a)", expr(der(B16))); f.juste(16, "b)", x16); f.juste(16, "c)", val(B16, x16)); f.juste(16, "d)", [x16, val(B16, x16)]); tab(B16, [0, 20, 40], ["+", "-"]);

  const R17 = fois([1, 0], [-20, 800]), p17 = racine(der(R17));
  f.juste(17, "a)", expr(R17, "p")); f.juste(17, "a)", `R(p) = ${expr(R17, "p")}`); f.faux(17, "a)", "p(800 - 20p)"); f.juste(17, "b)", expr(der(R17), "p")); f.juste(17, "c)", p17); f.juste(17, "d)", 800 - 20 * p17); f.juste(17, "e)", val(R17, p17)); f.faux(17, "d)", 800); tab(R17, [0, 20, 40], ["+", "-"], "R", "p");
  const C18 = [1, -12, 60, 100], B18 = moins([120, 0], C18);
  f.juste(18, "a)", expr(B18)); f.juste(18, "b)", expr(der(B18))); f.juste(18, "c)", memes(der(B18), fact(-3, [1, -10], [1, 2])) ? "oui" : "non"); f.juste(18, "d)", zeros(der(B18), 0, 15)[0]); f.juste(18, "e)", val(B18, 10)); f.faux(18, "a)", "-x^3 - 12x^2 + 60x - 100"); tab(B18, [0, 10, 15], ["+", "-"]);
  const C19 = [2, -120, 2500], x19 = racine(der(C19));
  f.juste(19, "a)", expr(der(C19))); f.juste(19, "b)", x19); f.juste(19, "c)", val(C19, x19)); f.juste(19, "d)", val(C19, 40)); f.juste(19, "e)", val(C19, 40) - val(C19, x19)); f.faux(19, "e)", 10);
  const C20 = [1, -24, 200], x20 = racine(der(C20));
  f.juste(20, "a)", x20); f.juste(20, "b)", val(C20, x20)); f.juste(20, "c)", x20 === 56 ? "vrai" : "faux"); f.juste(20, "d)", [x20, val(C20, x20)]); f.faux(20, "d)", [56, 12]); f.faux(20, "c)", "vrai"); tab(C20, [0, 12, 24], ["-", "+"], "C", "t");
  f.tout();
}

fin();
