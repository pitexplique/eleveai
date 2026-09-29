// Recalcul indépendant de la feuille « Les quadrilatères » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-quadrilatere-figure.tsx.
//
// ⭐ Chaque `quad(…)` est relu et MESURÉ : angles et côtés étiquetés (à 0,3° et
// 0,005 près), codages vérifiés (traits = côtés égaux, angles droits), sommets
// sur les nœuds quand le quadrillage est dessiné. Le script reconnaît la NATURE
// de chaque figure dessinée ET celle qu'on peut AFFIRMER avec ses seuls codages
// (le cœur de la notion : on ne conclut que sur ce qui est codé), recalcule
// chaque réponse à partir des nombres de l'énoncé et la cherche dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `quad()` est refaite ici.
// ⭐ La LECTURE (Frédéric, 30/09 : « ils ont parfois du mal à lire ») : chaque
// phrase des énoncés et des corrigés fait 20 mots au plus, 13 en moyenne.
// Usage : node scripts/verifier-exercices-6e-quadrilatere-figure.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-quadrilatere-figure.tsx", "quadrilatere_figure", ["quad"], "6e");
const { e, c, vrai, verif, dit, enonceDit, dessins, dessin, essai, appels, feuille } = f;

/* ── Géométrie ───────────────────────────────────────────────────────────── */
const S = ["A", "B", "C", "D"];
const VOISINS = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
const croix = (u, v) => u[0] * v[1] - u[1] * v[0];
const scal = (u, v) => u[0] * v[0] + u[1] * v[1];
const angleEn = (V, p, q) => (Math.acos(scal(vec(V, p), vec(V, q)) / (dist(V, p) * dist(V, q))) * 180) / Math.PI;
const angle = (pts, k) => angleEn(pts[k], pts[VOISINS[k][0]], pts[VOISINS[k][1]]);
const cote = (pts, cc) => dist(pts[cc[0]], pts[cc[1]]);
const para = (pts, c1, c2) => Math.abs(croix(vec(pts[c1[0]], pts[c1[1]]), vec(pts[c2[0]], pts[c2[1]]))) / (cote(pts, c1) * cote(pts, c2)) < 1e-4;
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const proche = (a, b, eps = 1e-3) => Math.abs(a - b) < eps;
/** La nature de la figure DESSINÉE, lue sur ses coordonnées. */
function nature(pts) {
  const droits = S.every((k) => proche(angle(pts, k), 90, 1e-2));
  const egaux = ["BC", "CD", "DA"].every((cc) => proche(cote(pts, cc), cote(pts, "AB"), 2e-3));
  if (droits && egaux) return "carré";
  if (droits) return "rectangle";
  if (egaux) return "losange";
  return para(pts, "AB", "CD") && para(pts, "BC", "DA") ? "parallélogramme" : "aucun des trois";
}
/** La nature qu'on peut AFFIRMER avec les seuls codages. */
function affirmable(o) {
  const droits = (o.droits ?? []).length === 4;
  const egaux = (o.egaux ?? []).some((g) => g.length === 4);
  return droits && egaux ? "carré" : droits ? "rectangle" : egaux ? "losange" : "rien";
}
const nb = (s) => parseFloat(String(s).replace(/\{,\}/g, ".").replace(",", "."));
const nombres = (texte) => [...texte.matchAll(/\$([^$]*)\$/g)].flatMap((m) => [...m[1].matchAll(/\d+(?:\{,\}\d+)?/g)].map((x) => nb(x[0])));
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");

const quads = (k, role) => dessins("quad", k).filter((d) => !role || d.role === role).map((d) => ({ pts: d.args[0], o: d.args[1] ?? {} }));
const q1 = (k, role) => {
  const q = quads(k, role)[0];
  if (!q) throw new Error(`exercice ${k} : pas de quad (${role ?? ""})`);
  return q;
};
/** Le nom affiché d'un sommet. */
const nom = (o, k) => o.noms?.[k] ?? k;
/** Les 8 noms corrects d'un quadrilatère (on tourne autour, dans un sens ou dans l'autre). */
const nomsCorrects = (o) => {
  const l = S.map((k) => nom(o, k));
  const res = new Set();
  for (let d = 0; d < 4; d++) {
    res.add([0, 1, 2, 3].map((i) => l[(d + i) % 4]).join(""));
    res.add([0, 1, 2, 3].map((i) => l[(d - i + 4) % 4]).join(""));
  }
  return res;
};

/* ── Contrôles de TOUS les quadrilatères ─────────────────────────────────── */
const tous = appels("quad").filter((a) => a.args).map((a) => ({ pts: a.args[0], o: a.args[1] ?? {} }));
tous.forEach(({ pts, o }, i) => {
  const n = `quad ${i + 1}`;
  for (const [k, lab] of Object.entries(o.angles ?? {})) {
    const m = /^(\d+)°$/.exec(lab);
    vrai(`${n} : l'angle en ${k} étiqueté ${lab} mesure ${angle(pts, k).toFixed(2)}°`, !!m && Math.abs(angle(pts, k) - Number(m[1])) < 0.3);
  }
  for (const [cc, lab] of Object.entries(o.cotes ?? {})) vrai(`${n} : [${cc}] étiqueté ${lab} mesure ${cote(pts, cc).toFixed(3)}`, Math.abs(cote(pts, cc) - nb(lab)) < 0.005);
  for (const g of o.egaux ?? []) vrai(`${n} : côtés codés égaux (${g})`, g.every((cc) => proche(cote(pts, cc), cote(pts, g[0]), 2e-3)));
  for (const k of o.droits ?? []) verif(`${n} : angle droit en ${k}`, angle(pts, k), 90, 1e-4);
  // Un codage ne ment pas : ce qu'on peut affirmer est compatible avec la figure dessinée.
  const af = affirmable(o), na = nature(pts);
  const compatible = { carré: ["carré"], rectangle: ["rectangle", "carré"], losange: ["losange", "carré"], rien: ["carré", "rectangle", "losange", "parallélogramme", "aucun des trois"] }[af];
  vrai(`${n} : codage « ${af} » compatible avec la figure (${na})`, compatible.includes(na));
  if (o.grille) vrai(`${n} : sommets sur les nœuds du quadrillage`, S.every((k) => pts[k].every((v) => Number.isInteger(v))));
  vrai(`${n} : A, B, C, D tournent dans le même sens (quadrilatère non croisé)`, S.every((k, j) => croix(vec(pts[k], pts[S[(j + 1) % 4]]), vec(pts[S[(j + 1) % 4]], pts[S[(j + 2) % 4]])) > 0));
});

/* ── Le rendu, simulé : la mise en page de quad() refaite ici ────────────── */
function boites({ pts, o }) {
  const W = 260, H = 200, MARGE = 36;
  const reels = S.map((k) => pts[k]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C), D: px(pts.D) };
  const G = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
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

/* ── La lecture : des phrases courtes (Frédéric, 30/09) ──────────────────── */
{
  const textes = [...feuille.enonces, ...feuille.corrections];
  const phrases = textes.flatMap((t) => t.split(/\\n|(?<=[.?!])\s+/u)).map((p) => p.trim()).filter(Boolean);
  const mots = (p) => p.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const longues = phrases.filter((p) => mots(p) > 20);
  vrai(`phrases de 20 mots au plus (${longues.length} trop longues)`, longues.length === 0, longues.slice(0, 3).join(" | "));
  const moyenne = phrases.reduce((s, p) => s + mots(p), 0) / phrases.length;
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { pts, o } = q1(1, "figure");
  const bons = nomsCorrects(o);
  vrai("1. figure quelconque", nature(pts) === "aucun des trois");
  vrai("1. RSTU, STUR, RUTS sont corrects ; RTSU ne l'est pas", ["RSTU", "STUR", "RUTS"].every((x) => bons.has(x)) && !bons.has("RTSU"));
  enonceDit(1, "$RTSU$");
  dit(1, "Réponse : a) par exemple $RSTU$ et $STUR$ ; b) non.");
});
essai("2", () => {
  const { o } = q1(2, "figure");
  const [A, B, C, D] = S.map((k) => nom(o, k));
  vrai("2. diagonales dessinées", o.diagonales === true);
  dit(2, `Les diagonales sont $[${A}${C}]$ et $[${B}${D}]$.`);
  dit(2, `C'est $[${C}${D}]$.`);
  dit(2, `Réponse : a) $[${A}${C}]$ et $[${B}${D}]$ ; b) $[${C}${D}]$ ; c) $[${B}${C}]$ et $[${D}${A}]$.`);
});
for (const [k, af, na, rep] of [
  [3, "rectangle", "rectangle", "Réponse : $ABCD$ est un rectangle."],
  [4, "losange", "losange", "Réponse : $PQRS$ est un losange."],
  [5, "carré", "carré", "Réponse : c'est un carré."],
  [6, "rectangle", "carré", "Réponse : c'est un rectangle ; on ne peut pas dire plus."],
])
  essai(String(k), () => {
    const { pts, o } = q1(k, "figure");
    vrai(`${k}. on peut affirmer « ${af} » (lu : ${affirmable(o)})`, affirmable(o) === af);
    vrai(`${k}. la figure dessinée est un ${na} (lu : ${nature(pts)})`, nature(pts) === na);
    dit(k, rep);
  });
essai("5 bis", () => vrai("5. le carré est penché (aucun côté horizontal)", !proche(q1(5, "figure").pts.B[1], 0)));
essai("7", () => {
  const [a, b] = quads(7, "schema");
  vrai("7. un carré puis un rectangle", nature(a.pts) === "carré" && nature(b.pts) === "rectangle" && affirmable(a.o) === "carré" && affirmable(b.o) === "rectangle");
  dit(7, "Réponse : a) $4$ angles droits ; b) les côtés.");
});
essai("8", () => {
  const [cote8] = nombres(e(8));
  const { pts, o } = q1(8, "figure");
  vrai("8. le dessin : un carré du côté de l'énoncé", affirmable(o) === "carré" && proche(cote(pts, "AB"), cote8));
  dit(8, `$4 \\times ${tx(cote8)} = ${tx(4 * cote8)}$`);
  dit(8, `soit $${tx(2 * cote8)}$ cm`);
  dit(8, `Réponse : $${tx(4 * cote8)}$ cm.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const lignes = [...e(9).matchAll(/\$([A-Z]{4})\$ : ([^\\]*)/g)].map((m) => [m[1], m[2]]);
  vrai(`9. quatre descriptions lues (${lignes.length})`, lignes.length === 4);
  const natures = lignes.map(([, d]) => {
    const droits = /\$4\$ angles droits/.test(d);
    const n = [...d.matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
    const egaux = /\$4\$ côtés de/.test(d);
    const deuxLongueurs = /côtés de \$\d+\$ cm et \$\d+\$ cm/.test(d);
    vrai(`9. « ${d.slice(0, 30)}… » : cas reconnu`, droits || egaux || n.length === 4);
    return droits && egaux ? "carré" : droits && deuxLongueurs ? "rectangle" : egaux && /aucun angle droit/.test(d) ? "losange" : "aucun des trois";
  });
  const [, rangs] = dessin("trace", 9);
  vrai("9. la table du corrigé", JSON.stringify(rangs) === JSON.stringify(lignes.map(([nm], i) => [nm, natures[i]])), JSON.stringify(rangs));
  dit(9, `Réponse : ${natures.join(", ")}.`);
});
essai("10", () => {
  const [r, l] = quads(10, "figure");
  vrai("10. un rectangle (non carré) et un losange (non carré)", nature(r.pts) === "rectangle" && nature(l.pts) === "losange");
  vrai("10. rectangle de 5 sur 2 carreaux", cote(r.pts, "AB") === 5 && cote(r.pts, "BC") === 2);
  vrai("10. chaque côté du losange : 2 carreaux sur 3", ["AB", "BC", "CD", "DA"].every((cc) => {
    const v = vec(l.pts[cc[0]], l.pts[cc[1]]).map(Math.abs).sort();
    return v[0] === 2 && v[1] === 3;
  }));
  dit(10, "Ses côtés font $5$ carreaux et $2$ carreaux");
  dit(10, "Réponse : $ABCD$ est un rectangle, $EFGH$ un losange.");
});
essai("11", () => {
  vrai("11. le schéma : un carré codé", affirmable(q1(11, "schema").o) === "carré");
  dit(11, "Réponse : a) vrai ; b) faux ; c) vrai ; d) faux.");
});
essai("12", () => {
  const { o } = q1(12, "figure");
  const [A, B, C, D] = S.map((k) => nom(o, k));
  const bons = nomsCorrects(o);
  vrai("12. VXWY est un nom faux", !bons.has("VXWY") && bons.has("VWXY"));
  enonceDit(12, `$[${A}${C}]$ est-il un côté ou une diagonale ?`);
  enonceDit(12, `Et $[${B}${C}]$ ?`);
  dit(12, `Réponse : a) une diagonale ; b) un côté ; c) $${D}$ ; d) non.`);
});
essai("13", () => {
  const [L, l] = nombres(e(13));
  const { pts } = q1(13, "figure");
  vrai("13. le dessin : L et l de l'énoncé", proche(cote(pts, "AB"), L) && proche(cote(pts, "BC"), l));
  dit(13, `$${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}$`);
  dit(13, `faire $${L} + ${l} = ${L + l}$`);
  dit(13, `Réponse : a) $${2 * (L + l)}$ m ; b) non.`);
});
essai("14", () => {
  const [p] = nombres(e(14));
  dit(14, `$${p} \\div 4 = ${p / 4}$`);
  dit(14, `$4 \\times ${p / 4} = ${p}$`);
  const { pts, o } = q1(14, "schema");
  vrai("14. le schéma : un carré du côté trouvé", affirmable(o) === "carré" && proche(cote(pts, "AB"), p / 4));
  dit(14, `Réponse : $${p / 4}$ m.`);
});
essai("15", () => {
  const [p, L] = nombres(e(15));
  const l = p / 2 - L;
  dit(15, `$${p} \\div 2 = ${p / 2}$`);
  dit(15, `$${p / 2} - ${L} = ${l}$`);
  dit(15, `$${L} + ${l} + ${L} + ${l} = ${p}$`);
  dit(15, `$${p} - ${L} = ${p - L}$`);
  const { pts } = q1(15, "schema");
  vrai("15. le schéma : 9 sur 6", proche(cote(pts, "AB"), L) && proche(cote(pts, "BC"), l));
  dit(15, `Réponse : $${l}$ cm.`);
});
essai("16", () => {
  const { pts, o } = q1(16, "figure");
  vrai("16. codage : losange ; figure : losange, pas carré", affirmable(o) === "losange" && nature(pts) === "losange");
  const a = Number(o.angles.A.replace("°", ""));
  dit(16, `un angle mesure $${a}°$`);
  vrai("16. l'angle n'est pas droit", a !== 90);
  dit(16, "Réponse : non, c'est un losange.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [rangees, colonnes, carre, r2, c2] = nombres(e(17));
  const { pts, o } = q1(17, "figure");
  vrai("17. la tablette dessinée : 6 carreaux sur 4", cote(pts, "AB") === colonnes && cote(pts, "BC") === rangees && o.grille === true && nature(pts) === "rectangle");
  const [L, l] = [colonnes * carre, rangees * carre];
  dit(17, `Longueur : $${colonnes} \\times ${carre} = ${L}$ cm.`);
  dit(17, `Largeur : $${rangees} \\times ${carre} = ${l}$ cm.`);
  dit(17, `$${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}$ cm.`);
  vrai("17. le morceau : 4 sur 4", r2 === 4 && c2 === 4);
  dit(17, `$${c2} \\times ${carre} = ${c2 * carre}$ cm`);
  dit(17, `Réponse : a) un rectangle ; b) $${L}$ cm et $${l}$ cm ; c) $${2 * (L + l)}$ cm ; d) un carré.`);
});
essai("18", () => {
  const [a, b] = nombres(e(18)).filter((x) => x !== 4);
  dit(18, `$4 \\times ${a} = ${4 * a}$ cm`);
  dit(18, `$${tx(b)} - ${a} = ${tx(b - a)}$ cm`);
  const [car, bande] = quads(18, "schema");
  vrai("18. le carré de 21 et la bande de 21 sur 8,7", nature(car.pts) === "carré" && proche(cote(car.pts, "AB"), a) && nature(bande.pts) === "rectangle" && proche(cote(bande.pts, "BC"), b - a));
  dit(18, `Réponse : a) non ; b) $${a}$ cm ; c) $${4 * a}$ cm ; d) un rectangle de $${a}$ cm sur $${tx(b - a)}$ cm.`);
});
essai("19", () => {
  const { pts } = q1(19, "figure");
  const n = cote(pts, "AB"), m = cote(pts, "BC");
  let carres = 0, autres = 0;
  for (let x0 = 0; x0 < n; x0++) for (let x1 = x0 + 1; x1 <= n; x1++) for (let y0 = 0; y0 < m; y0++) for (let y1 = y0 + 1; y1 <= m; y1++) (x1 - x0 === y1 - y0 ? carres++ : autres++);
  vrai("19. grand carré de 2 sur 2", n === 2 && m === 2 && nature(pts) === "carré");
  dit(19, `$4 + 1 = ${carres}$ carrés`);
  dit(19, `Cela fait $${autres}$ rectangles`);
  dit(19, `$${carres} + ${autres} = ${carres + autres}$ rectangles`);
  dit(19, `Réponse : a) $${carres}$ ; b) $${autres}$ ; c) $${carres + autres}$.`);
});
essai("20", () => {
  const { pts, o } = q1(20, "schema");
  vrai("20. le schéma : le losange du b), côté 5, angle 60°", nature(pts) === "losange" && proche(cote(pts, "AB"), 5) && proche(angle(pts, "A"), 60, 0.01));
  enonceDit(20, "Un de mes angles mesure $60°$.");
  dit(20, "Réponse : a) rectangle ; b) losange ; c) carré ; d) carré.");
});

f.fin();
