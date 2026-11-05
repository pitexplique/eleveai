// Recalcul indépendant du lot « fonctions-1 » des feuilles STMG (05/11/2026) :
//   fct-representation, fct-taux-variation, fct-monotonie,
//   fct-equations-puissance, fct-inverse, fct-inverse-derivee.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-fonctions-1.mjs
//
// ⭐ En plus du socle : on relit les FIGURES dans la feuille elle-même (`lu`,
// `tv`) : ce qu'on demande de lire sur une courbe vient de la courbe dessinée,
// pas du corrigé. Si un dessin et une réponse divergent, l'erreur sort.
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/* ─── Relire les dessins ─── */
const canvas = (el) => el?.props?.children?.props?.figure;
/** L'ordonnée de la courbe n° i de la figure, en x (parabole ou point exact). */
const lu = (ex, x, i = 0) => {
  const c = canvas(ex.figure).courbes[i];
  if (c.type === "quadratique") return c.a * x * x + c.b * x + c.c;
  const p = c.points.find((q) => Math.abs(q.x - x) < 1e-9);
  if (p) return p.y;
  // un polynôme échantillonné, ou un point entre deux points de la ligne
  const tri = [...c.points].sort((a, b) => a.x - b.x);
  const k = tri.findIndex((q) => q.x > x);
  const [g, d] = [tri[k - 1], tri[k]];
  return g.y + ((d.y - g.y) * (x - g.x)) / (d.x - g.x);
};
const nombreTexte = (t) => Number(String(t).replace(/−/g, "-").replace(/\s/g, "").replace(",", "."));
/** Un tableau de variations : ses bornes et ses valeurs, en nombres. */
const tv = (el) => {
  const f = canvas(el);
  return { x: f.bornes.map(nombreTexte), y: f.variations.valeurs.map(nombreTexte), signes: f.derivee?.signes };
};
/** Le sens d'un morceau de tableau. */
const compareDansTableau = (t, a, b) => {
  const morceau = (v) => t.x.findIndex((_, i) => i < t.x.length - 1 && v >= t.x[i] && v <= t.x[i + 1]);
  const [m, n] = [morceau(a), morceau(b)];
  if (m !== n) return "?";
  const monte = t.y[m + 1] > t.y[m];
  return monte === a < b ? "<" : ">";
};
const taux = (f, a, b) => (f(b) - f(a)) / (b - a);
const taux2 = (xa, ya, xb, yb) => (yb - ya) / (xb - xa);
/** Dérivée numérique : pour contrôler une dérivée écrite. */
const der = (g, x) => (g(x + 1e-5) - g(x - 1e-5)) / 2e-5;
const proche = (a, b, e = 1e-4) => Math.abs(a - b) < e;
/** La plus petite valeur d'une fonction sur [a ; b], par balayage. */
const argmin = (g, a, b) => {
  let [xm, ym] = [a, g(a)];
  for (let i = 0; i <= 200000; i++) {
    const x = a + ((b - a) * i) / 200000;
    if (g(x) < ym) [xm, ym] = [x, g(x)];
  }
  return [xm, ym];
};
const arrondi = (v, n) => Math.round(v * 10 ** n) / 10 ** n;

/* ═══════════════════════ fct-representation ═══════════════════════ */
{
  const f = await feuille("fct-representation");
  const E = f.exercices;
  f.juste(1, "a)", 7); f.juste(1, "b)", 3); f.faux(1, "a)", 3);
  const g2 = (x) => 2 * x + 5;
  f.juste(2, "a)", g2(4)); f.juste(2, "b)", g2(0)); f.faux(2, "a)", 29);
  f.juste(3, "a)", lu(E[2], 0)); f.juste(3, "b)", lu(E[2], 1)); f.juste(3, "c)", lu(E[2], 3)); f.faux(3, "c)", 3);
  const g4 = (x) => 3 * x + 2; // la ligne du tableau : 5, 8, 11, 14
  f.juste(4, "a)", g4(3)); f.juste(4, "b)", (14 - 2) / 3);
  f.juste(5, "a)", 1); f.juste(5, "b)", 5 * 2); f.faux(5, "a)", 2);
  f.juste(6, null, "7x"); f.faux(6, null, "x + 7");
  f.juste(7, null, "8x + 20"); f.faux(7, null, "20x + 8");
  f.juste(8, "a)", 60 / 5); f.juste(8, "b)", 60 / 10); f.faux(8, "a)", 55);
  const T = (x) => -0.6 * x + 15;
  for (const [x, y] of [[0, 15], [1, 14.4], [2, 13.8], [5, 12]]) f.vrai(`ex.9 colonne ${x}`, proche(T(x), y));
  f.vrai("ex.9 expr. 1 fausse", !proche(15 * 0 - 0.6, 15)); f.vrai("ex.9 expr. 3 fausse", !proche(0.6 * 1 + 15, 14.4));
  f.juste(9, "a)", 2); f.juste(9, "b)", T(10)); f.faux(9, "b)", T(1000));
  f.juste(10, "a)", lu(E[9], 2)); f.juste(10, "b)", lu(E[9], 4));
  f.juste(10, "c)", [2, 6].filter((x) => proche(lu(E[9], x), 6))); f.faux(10, "c)", 2);
  const g11 = (x) => 6 * x + 450;
  f.juste(11, "a)", "6x + 450"); f.juste(11, "b)", g11(200)); f.juste(11, "c)", (2850 - 450) / 6); f.faux(11, "c)", 2850 / 6);
  const g12 = (x) => 0.2 * x + 12;
  f.juste(12, "a)", g12(0)); f.juste(12, "b)", 3); f.juste(12, "c)", g12(1) - g12(0)); f.faux(12, "b)", 2);
  f.juste(13, "a)", "faux"); f.juste(13, "b)", 62); f.juste(13, "c)", 5); f.faux(13, "a)", "vrai");
  f.vrai("ex.14 courbe = 12/x", canvas(E[13].figure).courbes[0].points.every((p) => proche(p.x * p.y, 12)));
  f.juste(14, "a)", lu(E[13], 3)); f.juste(14, "b)", lu(E[13], 6)); f.juste(14, "c)", lu(E[13], 3) * 3); f.juste(14, "d)", "12/x");
  f.juste(14, "e)", lu(E[13], 6) === lu(E[13], 3) / 2 ? "divisé par 2" : "?"); f.faux(14, "e)", "multiplié par 2"); f.faux(14, "d)", "12x");
  const g15 = (x) => 3 * x * x;
  f.juste(15, "a)", g15(10)); f.juste(15, "b)", g15(20)); f.juste(15, "c)", g15(20) / g15(10)); f.juste(15, "d)", g15(20) === 2 * g15(10) ? "vrai" : "faux"); f.faux(15, "a)", 900);
  const g16 = (x) => (7 - 4) / 2 * x + 4;
  for (const [x, y] of [[0, 4], [2, 7], [4, 10], [10, 19]]) f.vrai(`ex.16 colonne ${x}`, proche(g16(x), y));
  f.juste(16, "a)", g16(0)); f.juste(16, "b)", (7 - 4) / 2); f.juste(16, "c)", "1,5x + 4"); f.juste(16, "d)", g16(20)); f.faux(16, "b)", 3);
  const A = (x) => 12 * x, B = (x) => 8 * x + 60;
  f.juste(17, "a)", "12x"); f.juste(17, "b)", "8x + 60");
  f.juste(17, "c)", A(10) < B(10) ? "A" : "B"); f.juste(17, "d)", 60 / (12 - 8)); f.juste(17, "e)", A(20) < B(20) ? "A" : "B"); f.faux(17, "e)", "A");
  const g18 = (x) => 0.25 * x * x;
  f.juste(18, "a)", g18(20)); f.juste(18, "b)", g18(40)); f.juste(18, "c)", g18(40) / g18(20)); f.juste(18, "d)", g18(30)); f.juste(18, "e)", 900 / g18(30)); f.faux(18, "c)", 2);
  f.juste(19, "a)", "900/x"); f.juste(19, "b)", 900 / 30); f.juste(19, "c)", 900 / 45); f.juste(19, "d)", 900 / 60); f.juste(19, "e)", (900 / 60) * 2 === 900 / 30 ? "divisée par 2" : "?"); f.faux(19, "a)", "900 - x");
  const h = (x) => -0.25 * x * x + 2 * x + 1;
  f.juste(20, "a)", lu(E[19], 4)); f.vrai("ex.20 courbe = expression", [0, 2, 4, 6, 8].every((x) => proche(lu(E[19], x), h(x))));
  f.juste(20, "b)", h(2)); f.juste(20, "c)", [2, 6].filter((x) => proche(h(x), 4))); f.juste(20, "d)", h(8)); f.faux(20, "b)", 1 + 4 + 0.25);
  f.tout();
}

/* ═══════════════════════ fct-taux-variation ═══════════════════════ */
{
  const f = await feuille("fct-taux-variation");
  const E = f.exercices;
  f.juste(1, null, taux2(2, 5, 6, 13)); f.faux(1, null, 8);
  f.juste(2, null, taux2(1, 20, 5, 12)); f.faux(2, null, 2);
  f.juste(3, null, taux((x) => x * x, 1, 3)); f.faux(3, null, 8);
  f.juste(4, null, taux((x) => 2 * x * x - 3 * x, 1, 2)); f.faux(4, null, 1);
  f.vrai("ex.5 A et B sur la droite", proche(lu(E[4], 1), 2) && proche(lu(E[4], 4), 8));
  f.juste(5, null, taux2(1, 2, 4, 8)); f.faux(5, null, 0.5);
  f.juste(6, "a)", lu(E[5], 2)); f.juste(6, "b)", lu(E[5], 4)); f.juste(6, "c)", taux((x) => lu(E[5], x), 2, 4)); f.faux(6, "c)", 6);
  f.vrai("ex.6 sécante par les deux points", proche(lu(E[5], 2, 1), 2) && proche(lu(E[5], 4, 1), 8));
  f.juste(7, "a)", taux2(50, 900, 100, 1500)); f.juste(7, "b)", 1); f.faux(7, "b)", 2);
  f.juste(8, null, 200 + 15 * (5 - 2)); f.faux(8, null, 215);
  f.juste(9, "a)", taux2(2, 50, 5, 110)); f.juste(9, "b)", 110 + taux2(2, 50, 5, 110)); f.faux(9, "a)", 110 / 5);
  f.juste(10, "a)", taux2(1, 12, 3, 18)); f.juste(10, "b)", taux2(3, 18, 6, 30)); f.juste(10, "c)", taux2(3, 18, 6, 30) > taux2(1, 12, 3, 18) ? 2 : 1); f.faux(10, "c)", 1);
  const t11 = taux2(0, -18, 6, -6);
  f.juste(11, "a)", t11); f.juste(11, "b)", t11 > 0 ? "hausse" : "baisse"); f.juste(11, "c)", -6 + t11 * 3); f.faux(11, "a)", -4);
  const t12 = taux2(3, 800, 8, 500);
  f.juste(12, "a)", t12); f.juste(12, "b)", t12 > 0 ? "hausse" : "baisse"); f.juste(12, "c)", 500 + t12 * 2); f.faux(12, "a)", 60);
  const g13 = (x) => -x * x + 6 * x;
  f.vrai("ex.13 courbe = expression", [0, 1, 3, 5, 6].every((x) => proche(lu(E[12], x), g13(x))));
  f.juste(13, "a)", g13(1)); f.juste(13, "b)", g13(5)); f.juste(13, "c)", taux(g13, 1, 5)); f.juste(13, "d)", g13(3) === g13(1) ? "oui" : "non"); f.juste(13, "e)", taux(g13, 1, 3)); f.faux(13, "d)", "oui");
  f.vrai("ex.14 A et B sur la courbe", proche(lu(E[13], 2), 5) && proche(lu(E[13], 6), 3));
  f.juste(14, "a)", taux((x) => lu(E[13], x), 2, 6)); f.juste(14, "b)", -taux((x) => lu(E[13], x), 2, 6)); f.faux(14, "a)", 0.5);
  const g15 = (x) => x * x + 10 * x;
  f.juste(15, "a)", g15(2)); f.juste(15, "b)", g15(4)); f.juste(15, "c)", taux(g15, 2, 4)); f.juste(15, "d)", taux(g15, 4, 6)); f.juste(15, "e)", taux(g15, 4, 6) > taux(g15, 2, 4) ? "oui" : "non"); f.faux(15, "c)", 32);
  const t16 = taux2(2015, 4000, 2020, 4300);
  f.juste(16, "a)", t16); f.juste(16, "b)", 3); f.juste(16, "c)", 4300 + t16 * 5); f.faux(16, "b)", 1);
  f.juste(17, "a)", taux2(0, 0, 2, 23)); f.juste(17, "b)", taux2(2, 23, 4, 42)); f.juste(17, "c)", taux2(0, 0, 4, 42)); f.juste(17, "d)", taux2(0, 0, 2, 23) > taux2(2, 23, 4, 42) ? 1 : 2); f.faux(17, "b)", 42 / 4);
  const C18 = (x) => 0.5 * x * x + 4 * x + 10;
  f.juste(18, "a)", C18(2)); f.juste(18, "b)", C18(4)); f.juste(18, "c)", taux(C18, 2, 4));
  f.juste(18, "d)", ((C18(4) - C18(2)) * 100) / ((4 - 2) * 100)); f.juste(18, "e)", taux(C18, 4, 6)); f.faux(18, "d)", 700);
  const t19 = taux2(0, 80, 10, 50);
  f.juste(19, "a)", t19); f.juste(19, "b)", 50 + t19 * 4); f.juste(19, "c)", 10 + (50 - 20) / -t19); f.faux(19, "c)", 10);
  const A20 = (x) => lu(E[19], x, 0), B20 = (x) => -0.5 * x * x + 4 * x + 2;
  f.vrai("ex.20 courbe orange = expression", [0, 2, 4, 6].every((x) => proche(lu(E[19], x, 1), B20(x))));
  f.juste(20, "a)", taux(A20, 0, 6)); f.juste(20, "b)", taux(B20, 0, 6)); f.juste(20, "c)", taux(B20, 4, 6)); f.juste(20, "d)", B20(4) > B20(6) ? "faux" : "vrai"); f.faux(20, "d)", "vrai");
  f.tout();
}

/* ═══════════════════════ fct-monotonie ═══════════════════════ */
{
  const f = await feuille("fct-monotonie");
  const E = f.exercices;
  f.juste(1, null, -5 > 0 ? "croissante" : "décroissante"); f.faux(1, null, "croissante");
  f.juste(2, null, "positifs"); f.faux(2, null, "négatifs");
  f.juste(3, null, 2 < 7 ? "<" : ">"); f.faux(3, null, ">");
  f.juste(4, null, -1 < 2 ? ">" : "<"); f.faux(4, null, "<");
  const t5 = tv(E[4].figure), iMax5 = t5.y.indexOf(Math.max(...t5.y));
  f.juste(5, "a)", t5.y[iMax5]); f.juste(5, "b)", t5.x[iMax5]); f.juste(5, "c)", t5.y[t5.x.indexOf(4)]); f.faux(5, "b)", 7);
  const t6 = tv(E[5].figure);
  f.juste(6, "a)", `[${t6.x[0]} ; ${t6.x[1]}]`); f.vrai("ex.6 descend", t6.y[1] < t6.y[0]); f.juste(6, "b)", Math.min(...t6.y)); f.faux(6, "a)", "[5 ; 1]");
  // Les changements de sens se comptent sur la courbe DESSINÉE.
  const pts7 = canvas(E[6].figure).courbes[0].points;
  const sens7 = pts7.slice(1).map((p, i) => Math.sign(p.y - pts7[i].y)).filter(Boolean);
  const virages7 = sens7.slice(1).filter((s, i) => s !== sens7[i]).length;
  f.juste(7, "a)", virages7); f.juste(7, "b)", virages7 + 1); f.faux(7, "b)", 2);
  const g8 = (x) => x * x - 4 * x + 5;
  f.vrai("ex.8 courbe", [0, 2, 4].every((x) => proche(lu(E[7], x), g8(x))));
  f.juste(8, "a)", g8(2) < g8(0) ? "décroissante" : "croissante"); f.juste(8, "b)", g8(4) > g8(2) ? "croissante" : "décroissante"); f.faux(8, "a)", "croissante");
  const t9 = tv(E[8].schema);
  for (let i = 0; i < t9.x.length; i++) f.vrai(`ex.9 tableau = courbe en ${t9.x[i]}`, proche(lu(E[8], t9.x[i]), t9.y[i]));
  const pts9 = canvas(E[8].figure).courbes[0].points;
  const signes9 = pts9.slice(1).map((p, i) => Math.sign(p.y - pts9[i].y));
  f.vrai("ex.9 trois morceaux", signes9.join() === "1,1,1,-1,-1,-1,1,1");
  f.juste(9, "a)", "[3 ; 6]"); f.juste(9, "b)", Math.max(...pts9.map((p) => p.y))); f.juste(9, "c)", 2); f.juste(9, "d)", "[6 ; 8]"); f.faux(9, "b)", 3);
  const t10 = tv(E[9].figure);
  f.juste(10, "a)", compareDansTableau(t10, 2, 4)); f.juste(10, "b)", compareDansTableau(t10, 6, 10)); f.juste(10, "c)", compareDansTableau(t10, 3, 8));
  f.juste(10, "d)", `[${t10.x[1]} ; ${t10.x[2]}]`); f.faux(10, "c)", "<");
  const n11 = [[2, 30], [4, 26], [7, 20], [10, 8]], t11 = n11.slice(1).map(([x, y], i) => taux2(n11[i][0], n11[i][1], x, y));
  f.juste(11, "a)", t11[0]); f.juste(11, "b)", t11[1]); f.juste(11, "c)", t11[2]); f.juste(11, "d)", t11.every((t) => t < 0) ? "décroissant" : "croissant"); f.faux(11, "d)", "croissant");
  f.juste(12, "a)", 120 < 300 ? "<" : ">"); f.juste(12, "b)", 2500 < 2000 ? "oui" : "non"); f.juste(12, "c)", "positif"); f.faux(12, "b)", "oui");
  const g13 = (x) => x * x - 6 * x + 10, v13 = [0, 1, 2, 3, 4, 5, 6].map(g13);
  f.vrai("ex.13 tableau de valeurs", v13.join() === "10,5,2,1,2,5,10");
  const t13 = tv(E[12].schema);
  f.vrai("ex.13 schéma", t13.x.every((x, i) => g13(x) === t13.y[i]));
  f.juste(13, "a)", Math.min(...v13)); f.juste(13, "b)", v13.indexOf(Math.min(...v13))); f.juste(13, "c)", `[0 ; ${v13.indexOf(Math.min(...v13))}]`); f.juste(13, "d)", `[${v13.indexOf(Math.min(...v13))} ; 6]`); f.faux(13, "c)", "[10 ; 1]");
  const m14 = { x: [-5, 0, 4], y: [3, 1, 2] };
  f.juste(14, "a)", compareDansTableau(m14, -4, -1)); f.juste(14, "b)", compareDansTableau(m14, 1, 3)); f.juste(14, "c)", compareDansTableau(m14, -2, 2)); f.juste(14, "d)", 0); f.faux(14, "c)", "<");
  const g15 = (x) => -0.5 * x * x + 4 * x;
  f.vrai("ex.15 courbe", [0, 3, 4, 5, 8].every((x) => proche(lu(E[14], x), g15(x))));
  f.juste(15, "a)", "[0 ; 4]"); f.vrai("ex.15 sommet en 4", -4 / (2 * -0.5) === 4);
  f.juste(15, "b)", taux(g15, 1, 3) > 0 ? "positif" : "négatif"); f.juste(15, "c)", taux(g15, 5, 7) > 0 ? "positif" : "négatif"); f.juste(15, "d)", taux(g15, 3, 5)); f.vrai("ex.15 f(3) = f(5) = 7,5", g15(3) === 7.5 && g15(5) === 7.5); f.faux(15, "b)", "négatif");
  const t16 = tv(E[15].figure);
  f.juste(16, "a)", Math.max(...t16.y)); f.juste(16, "b)", Math.min(...t16.y)); f.juste(16, "c)", compareDansTableau(t16, 5, 8)); f.juste(16, "d)", compareDansTableau(t16, 2, 10)); f.faux(16, "b)", 30);
  const g17 = (x) => -x * x + 8 * x - 7, t17 = tv(E[16].schema);
  f.vrai("ex.17 courbe et schéma", [1, 4, 7].every((x) => proche(lu(E[16], x), g17(x))) && t17.x.every((x, i) => g17(x) === t17.y[i]));
  f.juste(17, "a)", g17(2)); f.juste(17, "b)", "[1 ; 4]"); f.vrai("ex.17 sommet en 4", -8 / (2 * -1) === 4); f.juste(17, "c)", g17(4)); f.juste(17, "d)", compareDansTableau(t17, 2.5, 3.5)); f.faux(17, "c)", 4);
  const t18 = tv(E[17].figure);
  f.juste(18, "a)", t18.x[t18.y.indexOf(Math.max(...t18.y))]); f.juste(18, "b)", Math.max(...t18.y)); f.juste(18, "c)", compareDansTableau(t18, 2, 4)); f.juste(18, "d)", compareDansTableau(t18, 3, 8));
  f.juste(18, "e)", compareDansTableau(t18, 8, 9) === ">" && 10 > 7 ? "non" : "oui"); f.faux(18, "d)", ">");
  const n19 = [[0, 10], [2, 14], [4, 18], [6, 12], [8, 9]], t19 = n19.slice(1).map(([x, y], i) => taux2(n19[i][0], n19[i][1], x, y)), s19 = tv(E[18].schema);
  f.juste(19, "a)", t19[0]); f.juste(19, "b)", t19[1]); f.juste(19, "c)", t19[2]); f.juste(19, "d)", t19[3]);
  f.vrai("ex.19 signes puis schéma", t19[0] > 0 && t19[1] > 0 && t19[2] < 0 && t19[3] < 0 && s19.y.join() === "10,18,9");
  f.juste(19, "e)", `[0 ; ${s19.x[1]}]`); f.juste(19, "f)", Math.max(...n19.map((p) => p[1]))); f.faux(19, "e)", "[0 ; 2]");
  const t20 = tv(E[19].figure);
  f.juste(20, "a)", compareDansTableau(t20, 1, 2)); f.juste(20, "b)", compareDansTableau(t20, 5, 6)); f.juste(20, "c)", compareDansTableau(t20, 2, 6) === "<" ? "oui" : "non");
  f.juste(20, "d)", [t20.y[2], t20.y[1]]); f.faux(20, "c)", "oui"); f.faux(20, "d)", "180 ; 60");
  f.tout();
}

/* ═══════════════════════ fct-equations-puissance ═══════════════════════ */
{
  const f = await feuille("fct-equations-puissance");
  const rc = Math.sqrt, cb = Math.cbrt;
  f.juste(1, null, [rc(49), -rc(49)]); f.faux(1, null, 7);
  f.juste(2, null, "√7 ; -√7"); f.faux(2, null, 3.5); f.faux(2, null, "√7");
  f.juste(3, null, rc(81)); f.faux(3, null, "9 ; -9"); f.faux(3, null, 81 / 2);
  f.juste(4, null, cb(27)); f.faux(4, null, "3 ; -3");
  f.juste(5, null, cb(125)); f.faux(5, null, 125 / 3);
  f.juste(6, null, cb(64)); f.faux(6, null, 64 / 3);
  f.juste(7, null, "50^(1/3)"); f.juste(7, null, "∛50"); f.faux(7, null, 3.68); f.faux(7, null, "50/3"); f.faux(7, null, "√50");
  f.juste(8, null, arrondi(cb(90), 1)); f.faux(8, null, 30);
  f.juste(9, "a)", 48 / 3); f.juste(9, "b)", [rc(48 / 3), -rc(48 / 3)]); f.juste(9, "c)", rc(48 / 3)); f.faux(9, "c)", "4 ; -4");
  f.juste(10, "a)", 35 - 10); f.juste(10, "b)", rc(35 - 10)); f.faux(10, "a)", 45);
  f.juste(11, "a)", 54 / 2); f.juste(11, "b)", cb(54 / 2)); f.juste(11, "c)", [cb(27), cb(27), 2 * cb(27)]); f.vrai("ex.11 volume", 3 * 3 * 6 === 54); f.faux(11, "a)", 54); f.faux(11, "c)", "6 ; 3 ; 3");
  f.juste(12, "a)", 84 - 20); f.juste(12, "b)", cb(84 - 20)); f.juste(12, "c)", 5 ** 3 + 20); f.faux(12, "a)", 84);
  f.juste(13, "a)", "200^(1/3)"); f.juste(13, "b)", arrondi(cb(200), 1)); f.juste(13, "c)", arrondi(5.8 ** 3, 1)); f.vrai("ex.13 5,8³", proche(5.8 ** 3, 195.112)); f.faux(13, "b)", 14.1);
  f.juste(14, "a)", (-2) ** 3); f.juste(14, "b)", (-2) ** 3 === 8 ? "vrai" : "faux"); f.juste(14, "c)", cb(8)); f.faux(14, "b)", "vrai");
  f.juste(15, "a)", 20 / 5); f.juste(15, "b)", rc(20 / 5)); f.juste(15, "c)", rc(45 / 5)); f.faux(15, "c)", "3 ; -3");
  f.juste(16, "a)", [6, -6]); f.vrai("ex.16 a)", rc(36) === 6); f.juste(16, "b)", rc(36)); f.juste(16, "c)", cb(216)); f.juste(16, "d)", (-6) ** 3 === 216 ? 2 : 1); f.faux(16, "d)", 2);
  f.juste(17, "a)", cb(64)); f.juste(17, "b)", 8 * 64); f.juste(17, "c)", cb(8 * 64)); f.juste(17, "d)", cb(8 * 64) / cb(64)); f.faux(17, "d)", 8);
  f.juste(18, "a)", 135 - 14); f.juste(18, "b)", rc(135 - 14)); f.juste(18, "c)", 81 / 3); f.juste(18, "d)", cb(81 / 3)); f.juste(18, "e)", arrondi(cb(30), 1)); f.faux(18, "a)", 149); f.faux(18, "b)", "11 ; -11"); f.faux(18, "d)", cb(81));
  f.juste(19, "a)", "5^(1/3)"); f.juste(19, "b)", arrondi(cb(5), 2)); f.juste(19, "c)", cb(5) < 1.8 ? "oui" : "non"); f.juste(19, "d)", cb(8)); f.juste(19, "e)", cb(8) < 1.8 ? "oui" : "non"); f.faux(19, "b)", 1.7);
  f.juste(20, "a)", cb((178 - 50) / 2)); f.juste(20, "b)", cb((300 - 50) / 2)); f.juste(20, "c)", (100 - 50) / 2); f.juste(20, "d)", arrondi(cb((100 - 50) / 2), 1)); f.faux(20, "a)", cb(178 / 2));
  f.tout();
}

/* ═══════════════════════ fct-inverse ═══════════════════════ */
{
  const f = await feuille("fct-inverse");
  const E = f.exercices;
  const hyp = (ex, k, i = 0) => canvas(ex.figure).courbes[i].points.every((p) => proche(p.x * p.y, k));
  f.juste(1, "a)", 1 / 2); f.juste(1, "b)", 1 / 4); f.juste(1, "c)", 1 / 0.5); f.faux(1, "c)", 0.5);
  f.vrai("ex.2 courbe = 12/x", hyp(E[1], 12));
  f.juste(2, "a)", lu(E[1], 3)); f.juste(2, "b)", lu(E[1], 6)); f.faux(2, "a)", 3);
  f.juste(3, null, 4 * 5); f.faux(3, null, 5 / 4);
  f.juste(4, "a)", 3 * 8 === 24 ? "oui" : "non"); f.juste(4, "b)", 4 * 5 === 24 ? "oui" : "non"); f.faux(4, "b)", "oui");
  f.juste(5, "a)", 10 / 100); f.juste(5, "b)", 10 / 1000); f.juste(5, "c)", 2); f.faux(5, "c)", 3);
  f.juste(6, "a)", 5 / 0.1); f.juste(6, "b)", 5 / 0.01); f.juste(6, "c)", 5 / 0.01 > 5 / 0.1 ? "grande" : "petite"); f.faux(6, "c)", "petite");
  f.juste(7, "a)", 20 / 1000); f.juste(7, "b)", "faux"); f.faux(7, "b)", "vrai");
  f.juste(8, null, (5 * 100 + 800) / 100); f.faux(8, null, 1300);
  f.juste(9, "a)", 240 / 8); f.juste(9, "b)", 240 / 12); f.juste(9, "c)", 240 / 20); f.juste(9, "d)", 8 * (240 / 8));
  f.vrai("ex.10 courbe = 18/x", hyp(E[9], 18));
  f.vrai("ex.10 180 km à 30 km/h", 180 / 30 === lu(E[9], 3));
  f.juste(10, "a)", lu(E[9], 3)); f.juste(10, "b)", lu(E[9], 6)); f.juste(10, "c)", 3 * lu(E[9], 3)); f.juste(10, "d)", "18/x"); f.faux(10, "d)", "180/x");
  const c11 = (x) => (8 * x + 1200) / x;
  f.juste(11, "a)", "8 + 1200/x"); f.juste(11, "a)", "1 200/x + 8"); f.faux(11, "a)", "(8x + 1200)/x"); f.juste(11, "b)", c11(100)); f.juste(11, "c)", c11(300)); f.juste(11, "d)", c11(600)); f.juste(11, "e)", 8); f.vrai("ex.11 limite", proche(c11(1e9), 8)); f.faux(11, "e)", 0);
  f.juste(12, "a)", "10 + 1000/x"); f.faux(12, "a)", "(10x + 1000)/x"); f.juste(12, "b)", 1000 / (15 - 10)); f.juste(12, "c)", 10 * 200 + 1000); f.faux(12, "b)", 1000 / 15);
  f.juste(13, "a)", 50 / 1); f.juste(13, "b)", 50 / 10); f.juste(13, "c)", 50 / 1000); f.juste(13, "d)", "non"); f.faux(13, "d)", "oui");
  const k14 = 2 * 9;
  f.juste(14, "a)", k14); f.juste(14, "b)", k14 / 6); f.juste(14, "c)", k14 / 1.5); f.faux(14, "c)", k14 * 1.5);
  const g15 = (x) => 2 + 12 / x;
  f.vrai("ex.15 courbe", canvas(E[14].figure).courbes[0].points.every((p) => proche(p.y, g15(p.x))));
  f.juste(15, "a)", lu(E[14], 4)); f.juste(15, "b)", lu(E[14], 12)); f.juste(15, "c)", 2); f.vrai("ex.15 limite", proche(g15(1e9), 2)); f.juste(15, "d)", "non"); f.faux(15, "c)", 0);
  const a16 = (x) => (4 * x + 600) / x, b16 = (x) => (6 * x + 200) / x;
  f.juste(16, "a)", [a16(100), b16(100)]); f.juste(16, "b)", [a16(400), b16(400)]); f.juste(16, "c)", (600 - 200) / (6 - 4)); f.vrai("ex.16 égaux en 200", proche(a16(200), b16(200)) && proche(a16(200), 7)); f.juste(16, "d)", a16(400) < b16(400) ? "A" : "B"); f.faux(16, "d)", "B"); f.faux(16, "a)", "8 ; 10");
  const g17 = (x) => 3 + 1800 / x;
  f.juste(17, "a)", g17(100)); f.juste(17, "b)", g17(300)); f.juste(17, "c)", 1800 / (12 - 3)); f.juste(17, "d)", 3); f.juste(17, "e)", "non"); f.faux(17, "c)", 150);
  f.juste(18, "a)", "6000/x"); f.juste(18, "b)", 6000 / 4); f.juste(18, "c)", 6000 / 12); f.juste(18, "d)", 6000 / 250); f.juste(18, "e)", 6000 / 24 === 6000 / 12 / 2 ? "divisée par 2" : "?"); f.juste(18, "f)", "non"); f.faux(18, "a)", "6000 - x");
  const g19 = (x) => (2 * x + 60) / x;
  f.juste(19, "a)", g19(5)); f.juste(19, "b)", g19(30)); f.juste(19, "c)", 60 / (8 - 2)); f.juste(19, "d)", g19(20) < 8 ? "oui" : "non"); f.juste(19, "e)", 2); f.faux(19, "c)", 7.5);
  f.vrai("ex.20 courbes", hyp(E[19], 6, 0) && hyp(E[19], 12, 1));
  f.juste(20, "a)", 2 * lu(E[19], 2, 0)); f.juste(20, "b)", 3 * lu(E[19], 3, 1)); f.juste(20, "c)", lu(E[19], 4, 0)); f.juste(20, "d)", lu(E[19], 4, 1)); f.juste(20, "e)", lu(E[19], 4, 1) / lu(E[19], 4, 0)); f.faux(20, "a)", 3);
  f.tout();
}

/* ═══════════════════════ fct-inverse-derivee ═══════════════════════ */
{
  const f = await feuille("fct-inverse-derivee");
  const E = f.exercices;
  /** Contrôle : l'expression dérivée écrite colle à la dérivée numérique de g. */
  const derEcrite = (nom, g, gp, xs = [1.5, 3, 7]) => f.vrai(`${nom} dérivée`, xs.every((x) => proche(der(g, x), gp(x), 1e-3)));
  /** Contrôle d'un tableau du corrigé : valeurs et signes de la dérivée. */
  const tableauJuste = (nom, schema, g, gp) => {
    const t = tv(schema);
    f.vrai(`${nom} valeurs du tableau`, t.x.every((x, i) => proche(g(x), t.y[i], 0.01)));
    f.vrai(`${nom} signes du tableau`, t.signes.every((s, i) => (gp((t.x[i] + t.x[i + 1]) / 2) > 0 ? "+" : "-") === s));
  };

  derEcrite("ex.1", (x) => 1 / x, (x) => -1 / x ** 2); f.juste(1, null, "-1/x²"); f.juste(1, null, "f'(x) = -1/x²"); f.faux(1, null, "1/x²");
  derEcrite("ex.2", (x) => 7 / x, (x) => -7 / x ** 2); f.juste(2, null, "-7/x²"); f.faux(2, null, "-1/(7x²)"); f.faux(2, null, "7/x²");
  f.juste(3, null, der((x) => 12 / x, 2).toFixed(3)); f.faux(3, null, -6);
  f.juste(4, null, der((x) => 18 / x, 3).toFixed(3)); f.faux(4, null, 2);
  f.juste(5, null, der((x) => 8 / x, 2) < 0 ? "décroissante" : "croissante"); f.faux(5, null, "croissante");
  f.juste(6, null, der((x) => -6 / x, 2) < 0 ? "décroissante" : "croissante"); f.faux(6, null, "décroissante");
  f.juste(7, null, 4 / -2 < 4 / 3 ? "<" : ">"); f.faux(7, null, ">");
  derEcrite("ex.8", (x) => 3 + 200 / x, (x) => -200 / x ** 2); f.juste(8, null, "-200/x²"); f.faux(8, null, "3 - 200/x²");

  const p9 = (x) => 2 - 200 / x ** 2;
  derEcrite("ex.9", (x) => 2 * x + 200 / x, p9); f.juste(9, "a)", "2 - 200/x²"); f.juste(9, "b)", p9(5)); f.juste(9, "c)", p9(20)); f.juste(9, "d)", p9(5) < 0 ? "baisse" : "monte"); f.faux(9, "a)", "-200/x²");
  const g10 = (x) => 6 + 300 / x;
  derEcrite("ex.10", g10, (x) => -300 / x ** 2); f.juste(10, "a)", "-300/x²"); f.juste(10, "b)", der(g10, 5) < 0 ? "décroissante" : "croissante"); f.juste(10, "c)", g10(10)); f.juste(10, "d)", g10(30)); f.faux(10, "c)", -3);
  const g11 = (x) => 6 / x, p11 = (x) => -6 / x ** 2;
  derEcrite("ex.11", g11, p11); tableauJuste("ex.11", E[10].schema, g11, p11);
  f.juste(11, "a)", "-6/x²"); f.juste(11, "b)", p11(3) < 0 ? "négatif" : "positif"); f.juste(11, "c)", g11(1)); f.juste(11, "d)", g11(6)); f.faux(11, "b)", "positif");
  const g12 = (x) => x + 100 / x, p12 = (x) => 1 - 100 / x ** 2, [x12, y12] = argmin(g12, 1, 20);
  derEcrite("ex.12", g12, p12); tableauJuste("ex.12", E[11].schema, g12, p12);
  f.vrai("ex.12 f' de chaque côté", p12(5) === -3 && p12(20) === 0.75);
  f.juste(12, "a)", "1 - 100/x²"); f.juste(12, "b)", arrondi(x12, 2)); f.juste(12, "c)", arrondi(y12, 4)); f.faux(12, "c)", 10);
  const g13 = (x) => 2 * x + 450 / x, p13 = (x) => 2 - 450 / x ** 2, [x13, y13] = argmin(g13, 5, 30);
  derEcrite("ex.13", g13, p13); tableauJuste("ex.13", E[12].schema, g13, p13);
  f.juste(13, "a)", "2 - 450/x²"); f.juste(13, "b)", arrondi(x13, 2)); f.juste(13, "c)", arrondi(y13, 4)); f.juste(13, "d)", g13(5)); f.faux(13, "b)", Math.sqrt(450));
  const g14 = (x) => -12 / x;
  derEcrite("ex.14", g14, (x) => 12 / x ** 2); f.juste(14, "a)", "12/x²"); f.juste(14, "b)", der(g14, 2) > 0 ? "croissante" : "décroissante"); f.juste(14, "c)", g14(1)); f.juste(14, "d)", g14(3)); f.faux(14, "a)", "-12/x²");
  const g15 = (x) => 6 / x;
  f.juste(15, "a)", g15(-1)); f.juste(15, "b)", g15(2)); f.juste(15, "c)", g15(-1) < g15(2) ? "<" : ">"); f.juste(15, "d)", g15(-3) < g15(-1) ? "<" : ">"); f.juste(15, "e)", g15(-1) < g15(2) ? "faux" : "vrai"); f.faux(15, "c)", ">");
  const g16 = (x) => 20 / x, p16 = (x) => -20 / x ** 2;
  derEcrite("ex.16", g16, p16); f.juste(16, "a)", g16(2)); f.juste(16, "b)", p16(2)); f.juste(16, "c)", p16(10)); f.juste(16, "d)", Math.abs(p16(2)) > Math.abs(p16(10)) ? 2 : 10); f.faux(16, "d)", 10);
  const g17 = (x) => 2 * x + 800 / x, p17 = (x) => 2 - 800 / x ** 2, [x17, y17] = argmin(g17, 5, 60);
  derEcrite("ex.17", g17, p17); tableauJuste("ex.17", E[16].schema, g17, p17);
  f.juste(17, "a)", "2 - 800/x²"); f.juste(17, "b)", arrondi(x17, 2)); f.juste(17, "c)", p17(10) < 0 ? "décroissante" : "croissante"); f.juste(17, "d)", arrondi(y17, 4)); f.faux(17, "d)", 20);
  const C18 = (x) => x * x + 5 * x + 400, g18 = (x) => C18(x) / x, p18 = (x) => 1 - 400 / x ** 2, [x18, y18] = argmin(g18, 5, 50);
  derEcrite("ex.18", g18, p18); tableauJuste("ex.18", E[17].schema, g18, p18);
  f.juste(18, "a)", "x + 5 + 400/x"); f.juste(18, "a)", "f(x) = x + 5 + 400/x"); f.faux(18, "a)", "(x² + 5x + 400)/x"); f.juste(18, "b)", "1 - 400/x²"); f.juste(18, "c)", arrondi(x18, 2)); f.juste(18, "d)", arrondi(y18, 4)); f.faux(18, "b)", "6 - 400/x²");
  const g19 = (x) => 10 + 2000 / x, p19 = (x) => -2000 / x ** 2;
  derEcrite("ex.19", g19, p19, [150, 500, 900]); tableauJuste("ex.19", E[18].schema, g19, p19);
  f.juste(19, "a)", "-2000/x²"); f.juste(19, "b)", p19(500) < 0 ? "négatif" : "positif"); f.juste(19, "c)", g19(100)); f.juste(19, "d)", g19(1000)); f.juste(19, "e)", "non"); f.faux(19, "e)", "oui");
  const g20 = (x) => 0.5 * x + 200 / x, p20 = (x) => 0.5 - 200 / x ** 2, [x20, y20] = argmin(g20, 10, 40);
  derEcrite("ex.20", g20, p20, [12, 25, 35]); tableauJuste("ex.20", E[19].schema, g20, p20);
  f.juste(20, "a)", "0,5 - 200/x²"); f.juste(20, "b)", p20(10)); f.juste(20, "c)", p20(40)); f.juste(20, "d)", arrondi(x20, 2)); f.juste(20, "e)", arrondi(y20, 4)); f.faux(20, "d)", 10);
  f.tout();
}

fin();
