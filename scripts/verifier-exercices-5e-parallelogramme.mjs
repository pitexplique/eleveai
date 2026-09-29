// Recalcul indépendant de la feuille « Le parallélogramme » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-parallelogramme.tsx.
//
// ⭐ Chaque `quad(…)` est relu et MESURÉ : angles, côtés et moitiés de
// diagonales étiquetés (à 0,3° et 0,005 près), codages vérifiés (chevrons =
// côtés parallèles, traits = côtés égaux, angles droits, diagonales
// perpendiculaires, moitiés codées égales, centre = milieu des deux
// diagonales). Le script reconnaît aussi la NATURE de chaque figure dessinée
// (parallélogramme, losange, rectangle, carré, trapèze), recalcule chaque
// réponse à partir des nombres de l'énoncé et la cherche dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `quad()` est refaite ici.
// Usage : node scripts/verifier-exercices-5e-parallelogramme.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-parallelogramme.tsx", "parallelogramme", ["quad"]);
const { e, vrai, verif, dit, enonceDit, dessins, essai, appels } = f;

/* ── Géométrie ───────────────────────────────────────────────────────────── */
const S = ["A", "B", "C", "D"];
const VOISINS = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
const croix = (u, v) => u[0] * v[1] - u[1] * v[0];
const scal = (u, v) => u[0] * v[0] + u[1] * v[1];
const angleEn = (V, p, q) => (Math.acos(scal(vec(V, p), vec(V, q)) / (dist(V, p) * dist(V, q))) * 180) / Math.PI;
const angle = (pts, k) => angleEn(pts[k], pts[VOISINS[k][0]], pts[VOISINS[k][1]]);
const cote = (pts, c) => dist(pts[c[0]], pts[c[1]]);
const para = (pts, c1, c2) => Math.abs(croix(vec(pts[c1[0]], pts[c1[1]]), vec(pts[c2[0]], pts[c2[1]]))) / (cote(pts, c1) * cote(pts, c2)) < 1e-4;
const croisement = (a, c, b, d) => {
  const r = vec(a, c), s = vec(b, d);
  const t = croix(vec(a, b), s) / croix(r, s);
  return [a[0] + t * r[0], a[1] + t * r[1]];
};
const O = (pts) => croisement(pts.A, pts.C, pts.B, pts.D);
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const proche = (a, b, eps = 1e-3) => Math.abs(a - b) < eps;
const memePoint = (p, q) => dist(p, q) < 1e-3;
/** La nature de la figure DESSINÉE, lue sur ses coordonnées. */
function nature(pts) {
  const paraAB = para(pts, "AB", "CD"), paraBC = para(pts, "BC", "DA");
  if (!(paraAB && paraBC)) return paraAB || paraBC ? "trapèze" : "quelconque";
  const losange = proche(cote(pts, "AB"), cote(pts, "BC"));
  const rectangle = proche(angle(pts, "A"), 90, 1e-3);
  return losange && rectangle ? "carré" : losange ? "losange" : rectangle ? "rectangle" : "parallélogramme";
}
const nb = (s) => parseFloat(String(s).replace(/\{,\}/g, ".").replace(",", "."));
const nombres = (texte) => [...texte.matchAll(/\$([^$]*)\$/g)].flatMap((m) => [...m[1].replace(/\\widehat\{[^}]*\}/g, "").replace(/[a-zA-Z]_?\d/g, "").matchAll(/\d+(?:\{,\}\d+)?/g)].map((x) => nb(x[0])));
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");

const quads = (k, role) => dessins("quad", k).filter((d) => !role || d.role === role).map((d) => ({ pts: d.args[0], o: d.args[1] ?? {} }));
const q1 = (k, role) => {
  const q = quads(k, role)[0];
  if (!q) throw new Error(`exercice ${k} : pas de quad (${role ?? ""})`);
  return q;
};

/* ── Contrôles de TOUS les quadrilatères ─────────────────────────────────── */
const tous = appels("quad").filter((a) => a.args).map((a) => ({ pts: a.args[0], o: a.args[1] ?? {} }));
tous.forEach(({ pts, o }, i) => {
  const n = `quad ${i + 1}`;
  const c = O(pts);
  for (const [k, lab] of Object.entries(o.angles ?? {})) {
    const m = /^(\d+)°$/.exec(lab);
    if (m) vrai(`${n} : l'angle en ${k} étiqueté ${lab} mesure ${angle(pts, k).toFixed(2)}°`, Math.abs(angle(pts, k) - Number(m[1])) < 0.3);
  }
  for (const [cc, lab] of Object.entries(o.cotes ?? {})) vrai(`${n} : [${cc}] étiqueté ${lab} mesure ${cote(pts, cc).toFixed(3)}`, Math.abs(cote(pts, cc) - nb(lab)) < 0.005);
  for (const [dm, lab] of Object.entries(o.demi ?? {})) vrai(`${n} : ${dm} étiqueté ${lab} mesure ${dist(c, pts[dm[1]]).toFixed(3)}`, Math.abs(dist(c, pts[dm[1]]) - nb(lab)) < 0.005);
  for (const g of o.egaux ?? []) vrai(`${n} : côtés codés égaux (${g})`, g.every((cc) => proche(cote(pts, cc), cote(pts, g[0]))));
  for (const g of o.paralleles ?? []) vrai(`${n} : côtés à chevrons parallèles (${g})`, g.every((cc) => para(pts, cc, g[0])));
  // Un codage de parallèles ne ment pas par omission : une paire parallèle non codée serait trompeuse.
  if (o.paralleles) vrai(`${n} : toute paire de côtés parallèles est codée`, [["AB", "CD"], ["BC", "DA"]].every(([a, b]) => !para(pts, a, b) || o.paralleles.some((g) => g.includes(a) && g.includes(b))));
  for (const k of o.droits ?? []) verif(`${n} : angle droit en ${k}`, angle(pts, k), 90, 1e-4);
  if (o.diagDroit) vrai(`${n} : diagonales perpendiculaires`, Math.abs(scal(vec(pts.A, pts.C), vec(pts.B, pts.D))) < 1e-3);
  for (const g of o.moities ?? []) vrai(`${n} : moitiés de diagonales codées égales`, g.every((dm) => proche(dist(c, pts[dm[1]]), dist(c, pts[g[0][1]]))));
  if (o.centre) vrai(`${n} : le centre est le milieu des deux diagonales`, memePoint(c, milieu(pts.A, pts.C)) && memePoint(c, milieu(pts.B, pts.D)));
  vrai(`${n} : A, B, C, D tournent dans le même sens (quadrilatère non croisé)`, S.every((k, j) => croix(vec(pts[k], pts[S[(j + 1) % 4]]), vec(pts[S[(j + 1) % 4]], pts[S[(j + 2) % 4]])) > 0));
});

/* ── Le rendu, simulé : la mise en page de quad() refaite ici ────────────── */
function boites({ pts, o }) {
  const W = 260, H = 200, MARGE = 36;
  const reels = [...S.map((k) => pts[k]), ...(o.points ?? []).map((p) => p.en)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
  const Op = croisement(P.A, P.C, P.B, P.D);
  const unit = (x, y) => {
    const n = Math.hypot(x, y) || 1;
    return [x / n, y / n];
  };
  const ancre = (dx) => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");
  const res = [];
  const texte = (x, y, t, a, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  for (const k of Object.keys(o.angles ?? {})) {
    const V = P[k];
    const [p, q] = VOISINS[k].map((v) => P[v]);
    const u1 = unit(p[0] - V[0], p[1] - V[1]), u2 = unit(q[0] - V[0], q[1] - V[1]);
    const ouvert = (Math.acos(Math.max(-1, Math.min(1, scal(u1, u2)))) * 180) / Math.PI;
    const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
    const loin = 17 + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
    texte(V[0] + bi[0] * loin, V[1] + bi[1] * loin, o.angles[k], "middle");
  }
  for (const cc of ["AB", "BC", "CD", "DA"]) {
    const t = o.cotes?.[cc];
    if (!t) continue;
    const [p, q] = [P[cc[0]], P[cc[1]]];
    const M = milieu(p, q);
    let n = unit(-(q[1] - p[1]), q[0] - p[0]);
    if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
    texte(M[0] + n[0] * 14, M[1] + n[1] * 14, t, ancre(n[0]));
  }
  for (const dm of Object.keys(o.demi ?? {})) {
    const k = dm[1];
    const V = P[k];
    const M = milieu(Op, V);
    const t = unit(V[0] - Op[0], V[1] - Op[1]);
    let n = [-t[1], t[0]];
    const [p, q] = VOISINS[k].map((v) => unit(P[v][0] - Op[0], P[v][1] - Op[1]));
    const w = scal(p, t) <= scal(q, t) ? p : q;
    if (scal(n, w) < 0) n = [-n[0], -n[1]];
    texte(M[0] + n[0] * 11, M[1] + n[1] * 11, o.demi[dm], ancre(n[0]));
  }
  for (const p of o.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, a] = p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
    texte(x + dx, y + dy, p.nom, a, 15);
  }
  if (o.centre) texte(Op[0] + 9, Op[1] - 11, o.centre, "start", 15);
  for (const k of S) {
    const V = P[k];
    const d = unit(V[0] - G[0], V[1] - G[1]);
    texte(V[0] + d[0] * 15, V[1] + d[1] * 15, o.noms?.[k] ?? k, ancre(d[0]), 15);
  }
  return { W, H, res };
}
tous.forEach((q, i) => {
  const { W, H, res } = boites(q);
  for (const b of res) vrai(`quad ${i + 1} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, r] = [res[a], res[b]];
      const ox = Math.min(p.x1, r.x1) - Math.max(p.x0, r.x0);
      const dy = Math.abs((p.y0 + p.y1) / 2 - (r.y0 + r.y1) / 2);
      vrai(`quad ${i + 1} : « ${p.t} » et « ${r.t} » ne se chevauchent pas`, ox <= 3 || dy >= 18, `recouvrement ${ox.toFixed(0)}, écart vertical ${dy.toFixed(0)}`);
    }
});

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [a, b] = quads(1, "figure");
  vrai(`1. natures dessinées : ${nature(a.pts)}, ${nature(b.pts)}`, nature(a.pts) === "parallélogramme" && nature(b.pts) === "trapèze");
  dit(1, "Réponse : $ABCD$ est un parallélogramme ; $MNPQ$ est un trapèze.");
});
essai("2", () => {
  const { pts, o } = q1(2, "figure");
  const [ef, fg] = [nb(o.cotes.AB), nb(o.cotes.BC)];
  vrai("2. parallélogramme dessiné", nature(pts) === "parallélogramme");
  dit(2, `$${tx(ef)} + ${tx(fg)} + ${tx(ef)} + ${tx(fg)} = ${tx(2 * (ef + fg))}$ cm`);
  dit(2, `$${tx(ef)} + ${tx(fg)} = ${tx(ef + fg)}$ cm`);
  dit(2, `Réponse : $GH = ${tx(ef)}$ cm, $HE = ${tx(fg)}$ cm, et le périmètre vaut $${tx(2 * (ef + fg))}$ cm.`);
});
essai("3", () => {
  const [k] = nombres(e(3));
  dit(3, `$\\widehat{L} = 180° - ${k}° = ${180 - k}°$`);
  dit(3, `$${k} + ${180 - k} + ${k} + ${180 - k} = 360$`);
  dit(3, `Réponse : $\\widehat{L} = ${180 - k}°$, $\\widehat{M} = ${k}°$, $\\widehat{N} = ${180 - k}°$.`);
  vrai("3. le schéma", proche(angle(q1(3, "schema").pts, "A"), k, 0.01));
});
essai("4", () => {
  const [ri, su] = nombres(e(4));
  const { pts } = q1(4, "figure");
  const c = O(pts);
  vrai("4. le dessin : RI et SU de l'énoncé", proche(dist(c, pts.A), ri) && proche(dist(pts.B, pts.D), su, 2e-3) && nature(pts) === "parallélogramme");
  dit(4, `$RT = 2 \\times ${tx(ri)} = ${tx(2 * ri)}$ cm`);
  dit(4, `$IS = ${tx(su)} \\div 2 = ${tx(su / 2)}$ cm`);
  dit(4, `Réponse : $IT = ${tx(ri)}$ cm, $RT = ${tx(2 * ri)}$ cm et $IS = ${tx(su / 2)}$ cm.`);
});
essai("5", () => {
  const { pts } = q1(5, "figure");
  const c = O(pts);
  const im = (k) => S.find((j) => memePoint(pts[j], [2 * c[0] - pts[k][0], 2 * c[1] - pts[k][1]]));
  vrai("5. A → C, B → D", im("A") === "C" && im("B") === "D");
  dit(5, `Réponse : a) $${im("A")}$ et $${im("B")}$ ; b) $[${im("A")}${im("B")}]$ ; c) $\\widehat{${im("A")}${im("B")}${im("C")}}$.`);
});
essai("6", () => {
  dit(6, "Réponse : a) rectangle ; b) losange ; c) losange ; d) carré.");
  const { pts } = q1(6, "schema");
  vrai("6. le schéma est un losange, pas un carré", nature(pts) === "losange");
  dit(6, "$180 - 90 = 90$");
});
essai("7", () => {
  const [ab, ad, a] = nombres(e(7));
  const { pts } = q1(7, "schema");
  vrai("7. le parallélogramme construit", nature(pts) === "parallélogramme" && proche(cote(pts, "AB"), ab) && proche(cote(pts, "DA"), ad) && proche(angle(pts, "A"), a, 0.01));
  dit(7, `à $${tx(ad)}$ cm de $B$ et à $${tx(ab)}$ cm de $D$`);
  dit(7, `mesurer $${a}°$ lui aussi`);
});
essai("8", () => {
  const pts8 = Object.fromEntries([...e(8).matchAll(/\$([A-D])\((\d+)\\,;\\,(\d+)\)\$/g)].map((m) => [m[1], [Number(m[2]), Number(m[3])]]));
  const c = milieu(pts8.A, pts8.C);
  const D = [2 * c[0] - pts8.B[0], 2 * c[1] - pts8.B[1]];
  dit(8, `Donc $O(${tx(c[0])}\\,;\\,${tx(c[1])})$.`);
  dit(8, `Réponse : $D(${tx(D[0])}\\,;\\,${tx(D[1])})$.`);
  vrai("8. le schéma place D", memePoint(q1(8, "schema").pts.D, D));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [somme] = nombres(e(9));
  const a = somme / 2;
  dit(9, `$${somme} \\div 2 = ${a}$`);
  dit(9, `$\\widehat{B} = 180° - ${a}° = ${180 - a}°$`);
  dit(9, `Réponse : $\\widehat{A} = \\widehat{C} = ${a}°$ et $\\widehat{B} = \\widehat{D} = ${180 - a}°$.`);
});
essai("10", () => {
  const { pts } = q1(10, "schema");
  const c = O(pts);
  vrai("10. a) O milieu de [AC] mais pas de [BD]", memePoint(c, milieu(pts.A, pts.C)) && !memePoint(c, milieu(pts.B, pts.D)));
  enonceDit(10, "$OA = OC = 3$ cm, $OB = 5$ cm et $OD = 4$ cm");
  dit(10, "Réponse : a) non ; b) oui ; c) oui ; d) non.");
});
essai("11", () => {
  vrai("11. le schéma : un rectangle", nature(q1(11, "schema").pts) === "rectangle");
  dit(11, "Réponse : a) rectangle ; b) losange ; c) carré ; d) losange.");
  dit(11, "($8 \\neq 5$)");
});
essai("12", () => {
  const [cote4, a] = nombres(e(12));
  const { pts } = q1(12, "figure");
  vrai("12. losange dessiné", nature(pts) === "losange" && proche(cote(pts, "AB"), cote4));
  verif("12. l'angle B dessiné", angle(pts, "B"), 180 - a, 1e-3);
  vrai("12. diagonales perpendiculaires sur le dessin", Math.abs(scal(vec(pts.A, pts.C), vec(pts.B, pts.D))) < 1e-3);
  dit(12, `$4 \\times ${tx(cote4)} = ${tx(4 * cote4)}$ cm`);
  dit(12, `$180° - ${a}° = ${180 - a}°$`);
  dit(12, `Réponse : a) $${tx(4 * cote4)}$ cm ; b) $\\widehat{B} = \\widehat{D} = ${180 - a}°$ et $\\widehat{C} = ${a}°$ ; c) $90°$.`);
});
essai("13", () => {
  const [eg] = nombres(e(13));
  const { pts } = q1(13, "figure");
  vrai("13. rectangle dessiné, EG de l'énoncé", nature(pts) === "rectangle" && proche(dist(pts.A, pts.C), eg) && proche(dist(pts.B, pts.D), eg));
  dit(13, `$FH = EG = ${tx(eg)}$ cm`);
  dit(13, `$OE = ${tx(eg)} \\div 2 = ${tx(eg / 2)}$ cm`);
  dit(13, `Réponse : a) $${tx(eg)}$ cm ; b) $OE = OF = ${tx(eg / 2)}$ cm ; c) isocèle en $O$.`);
});
essai("14", () => {
  const { pts } = q1(14, "figure");
  vrai("14. diagonales de même longueur", proche(dist(pts.A, pts.C), dist(pts.B, pts.D)));
  vrai("14. et pourtant un trapèze : elles ne se coupent pas en leur milieu", nature(pts) === "trapèze" && !memePoint(O(pts), milieu(pts.A, pts.C)));
  dit(14, "Réponse : a) non ; b) non, il faut d'abord que ce soit un parallélogramme.");
});
essai("15", () => {
  const [ac, bd] = nombres(e(15));
  const { pts } = q1(15, "schema");
  vrai("15. losange de diagonales 7 et 4", nature(pts) === "losange" && proche(dist(pts.A, pts.C), ac) && proche(dist(pts.B, pts.D), bd));
  dit(15, `à $${tx(ac / 2)}$ cm de $A$`);
  dit(15, `à $${bd} \\div 2 = ${tx(bd / 2)}$ cm chacun`);
});
essai("16", () => {
  const [ac, bd, a] = nombres(e(16));
  const { pts } = q1(16, "schema");
  vrai("16. diagonales de 6 cm, même milieu, à 50°", proche(dist(pts.A, pts.C), ac) && proche(dist(pts.B, pts.D), bd) && proche(angleEn(O(pts), pts.C, pts.D), a, 0.01));
  vrai("16. la figure dessinée est un rectangle, pas un carré", nature(pts) === "rectangle");
  dit(16, "Réponse : $ABCD$ est un rectangle.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [c15, a] = nombres(e(17));
  vrai("17. le schéma : un losange à 64°", nature(q1(17, "schema").pts) === "losange" && proche(angle(q1(17, "schema").pts, "A"), a, 0.01));
  enonceDit(17, `mesurent $${c15}$ cm`);
  dit(17, `$180° - ${a}° = ${180 - a}°$`);
  dit(17, `Réponse : a) un losange ; b) $${a}°$, $${180 - a}°$ et $${180 - a}°$ ; c) $90°$ ; d) oui, avec quatre angles de $90°$.`);
});
essai("18", () => {
  const [c3, a] = nombres(e(18));
  const { pts } = q1(18, "figure");
  vrai("18. losange de côté 3 à 60°", nature(pts) === "losange" && proche(cote(pts, "AB"), c3) && proche(angle(pts, "A"), a, 0.01));
  verif("18. BD = côté (triangle équilatéral)", dist(pts.B, pts.D), c3, 1e-4);
  dit(18, `$360 \\div ${180 - a} = ${360 / (180 - a)}$`);
  dit(18, `$360 \\div ${a} = ${360 / a}$`);
  dit(18, `$${180 - a} \\div 2 = ${(180 - a) / 2}$`);
  dit(18, `Réponse : a) $${a}°$, $${180 - a}°$ et $${180 - a}°$ ; b) $${360 / (180 - a)}$ ; c) $${360 / a}$ ; d) $BD = ${c3}$ cm.`);
});
essai("19", () => {
  const [ab, am, om] = nombres(e(19));
  const { pts, o } = q1(19, "figure");
  const c = O(pts);
  const [M, M2] = o.points.map((p) => p.en);
  vrai("19. M sur [AB] avec AM = 4", proche(M[1], 0) && proche(dist(pts.A, M), am) && proche(cote(pts, "AB"), ab));
  vrai("19. M' image de M, sur [CD]", memePoint(M2, [2 * c[0] - M[0], 2 * c[1] - M[1]]) && proche(M2[1], pts.C[1]));
  verif("19. OM", dist(c, M), om, 1e-9);
  dit(19, `$MM' = 2 \\times ${tx(om)} = ${tx(2 * om)}$ cm`);
  verif("19. CM' = AM", dist(pts.C, M2), am, 1e-9);
  dit(19, `$CM' = AM = ${am}$ cm`);
});
essai("20", () => {
  const [L, l, a] = nombres(e(20));
  const [r, p] = quads(20, "figure");
  vrai("20. avant : un rectangle 40 × 30", nature(r.pts) === "rectangle" && proche(cote(r.pts, "AB"), L) && proche(cote(r.pts, "DA"), l));
  vrai("20. après : un parallélogramme aux mêmes côtés", nature(p.pts) === "parallélogramme" && proche(cote(p.pts, "AB"), L) && proche(cote(p.pts, "DA"), l, 1e-3));
  vrai("20. diagonales différentes après la poussée", !proche(dist(p.pts.A, p.pts.C), dist(p.pts.B, p.pts.D), 0.5));
  dit(20, `$${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}$ cm`);
  dit(20, `$180° - ${a}° = ${180 - a}°$`);
  dit(20, `Réponse : a) un parallélogramme, mais plus un rectangle ; b) non, $${2 * (L + l)}$ cm ; c) $${a}°$, $${180 - a}°$ et $${180 - a}°$ ; d) non.`);
});

f.fin();
