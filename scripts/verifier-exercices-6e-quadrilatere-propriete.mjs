// Recalcul indépendant de la feuille « Propriétés des quadrilatères » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-quadrilatere-propriete.tsx.
//
// ⭐ Chaque `quad(…)` est relu et MESURÉ : angles et côtés étiquetés, codages
// (traits = côtés égaux, chevrons = côtés parallèles, angles droits, angle
// droit au croisement des diagonales), sommets sur les nœuds du quadrillage,
// sommet caché d'une figure à compléter (aucun codage ne le trahit). Le script
// reconnaît la NATURE de chaque figure dessinée et celle qu'on peut AFFIRMER
// avec ses codages, recalcule chaque réponse à partir des nombres de l'énoncé
// et la cherche dans le corrigé. Le diagramme de Venn est relu et rangé à
// nouveau à partir des descriptions de l'énoncé.
// ⭐ Le RENDU est simulé : la mise en page de `quad()` est refaite ici.
// ⭐ La LECTURE (Frédéric, 30/09) : phrases de 20 mots au plus, 13 en moyenne.
// Usage : node scripts/verifier-exercices-6e-quadrilatere-propriete.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-quadrilatere-propriete.tsx", "quadrilatere_propriete", ["quad"], "6e");
const { e, vrai, verif, dit, enonceDit, dessins, dessin, essai, appels, feuille } = f;

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
const croisement = (a, c, b, d) => {
  const r = vec(a, c), s = vec(b, d);
  const t = croix(vec(a, b), s) / croix(r, s);
  return [a[0] + t * r[0], a[1] + t * r[1]];
};
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const proche = (a, b, eps = 1e-3) => Math.abs(a - b) < eps;
const memePoint = (p, q) => dist(p, q) < 1e-6;
function nature(pts) {
  const droits = S.every((k) => proche(angle(pts, k), 90, 1e-2));
  const egaux = ["BC", "CD", "DA"].every((cc) => proche(cote(pts, cc), cote(pts, "AB"), 2e-3));
  if (droits && egaux) return "carré";
  if (droits) return "rectangle";
  if (egaux) return "losange";
  return para(pts, "AB", "CD") && para(pts, "BC", "DA") ? "parallélogramme" : "aucun des trois";
}
function affirmable(o) {
  const droits = (o.droits ?? []).length === 4;
  const egaux = (o.egaux ?? []).some((g) => g.length === 4);
  const paras = (o.paralleles ?? []).length === 2;
  return droits && egaux ? "carré" : droits ? "rectangle" : egaux ? "losange" : paras ? "parallélogramme" : "rien";
}
const diagEgales = (pts) => proche(dist(pts.A, pts.C), dist(pts.B, pts.D), 1e-4);
const diagPerp = (pts) => Math.abs(scal(vec(pts.A, pts.C), vec(pts.B, pts.D))) < 1e-4;
/** Le quatrième sommet d'un parallélogramme ABCD (rectangle, losange, carré) : D = A + C − B. */
const quatrieme = (pts) => [pts.A[0] + pts.C[0] - pts.B[0], pts.A[1] + pts.C[1] - pts.B[1]];
const nb = (s) => parseFloat(String(s).replace(/\{,\}/g, ".").replace(",", "."));
const nombres = (texte) => [...texte.matchAll(/\$([^$]*)\$/g)].flatMap((m) => [...m[1].matchAll(/\d+(?:\{,\}\d+)?/g)].map((x) => nb(x[0])));
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
  for (const [k, lab] of Object.entries(o.angles ?? {})) {
    const m = /^(\d+)°$/.exec(lab);
    vrai(`${n} : l'angle en ${k} étiqueté ${lab} mesure ${angle(pts, k).toFixed(2)}°`, !!m && Math.abs(angle(pts, k) - Number(m[1])) < 0.3);
  }
  for (const [cc, lab] of Object.entries(o.cotes ?? {})) vrai(`${n} : [${cc}] étiqueté ${lab} mesure ${cote(pts, cc).toFixed(3)}`, Math.abs(cote(pts, cc) - nb(lab)) < 0.005);
  for (const g of o.egaux ?? []) vrai(`${n} : côtés codés égaux (${g})`, g.every((cc) => proche(cote(pts, cc), cote(pts, g[0]), 2e-3)));
  for (const g of o.paralleles ?? []) vrai(`${n} : côtés à chevrons parallèles (${g})`, g.every((cc) => para(pts, cc, g[0])));
  for (const k of o.droits ?? []) verif(`${n} : angle droit en ${k}`, angle(pts, k), 90, 1e-4);
  if (o.diagDroit) vrai(`${n} : diagonales perpendiculaires`, diagPerp(pts));
  const af = affirmable(o), na = nature(pts);
  const compatible = { carré: ["carré"], rectangle: ["rectangle", "carré"], losange: ["losange", "carré"], parallélogramme: ["parallélogramme", "rectangle", "losange", "carré"], rien: ["carré", "rectangle", "losange", "parallélogramme", "aucun des trois"] }[af];
  vrai(`${n} : codage « ${af} » compatible avec la figure (${na})`, compatible.includes(na));
  if (o.grille) vrai(`${n} : sommets sur les nœuds du quadrillage`, [...S.map((k) => pts[k]), ...(o.cadre ?? [])].every((p) => p.every((v) => Number.isInteger(v))));
  if (o.ouvert) {
    // Le sommet caché ne se trahit pas : aucun codage, aucune longueur sur ses côtés.
    const touche = [...(o.droits ?? []), ...Object.keys(o.cotes ?? {}), ...(o.egaux ?? []).flat(), ...(o.paralleles ?? []).flat(), ...Object.keys(o.angles ?? {})].filter((x) => x.includes("D"));
    vrai(`${n} : sommet D caché, aucun codage ne le touche`, touche.length === 0 && !o.diagonales && !o.centre && !o.diagDroit, touche.join(","));
  }
  vrai(`${n} : A, B, C, D tournent dans le même sens (quadrilatère non croisé)`, S.every((k, j) => croix(vec(pts[k], pts[S[(j + 1) % 4]]), vec(pts[S[(j + 1) % 4]], pts[S[(j + 2) % 4]])) > 0));
});

/* ── Le rendu, simulé : la mise en page de quad() refaite ici ────────────── */
function boites({ pts, o }) {
  const W = 260, H = 200, MARGE = 36;
  const reels = [...S.map((k) => pts[k]), ...(o.cadre ?? [])];
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
  if (o.centre) texte(Op[0] + 9, Op[1] - 11, o.centre, "start", 15);
  for (const k of o.ouvert ? ["A", "B", "C"] : S) {
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
  const [ab, bc] = [nb(o.cotes.AB), nb(o.cotes.BC)];
  vrai("1. rectangle dessiné", nature(pts) === "rectangle" && affirmable(o) === "rectangle");
  verif("1. CD mesuré", cote(pts, "CD"), ab);
  verif("1. DA mesuré", cote(pts, "DA"), bc);
  vrai("1. deux paires de côtés parallèles", para(pts, "AB", "CD") && para(pts, "BC", "DA"));
  dit(1, `Réponse : a) $CD = ${ab}$ cm et $DA = ${bc}$ cm ; b) $2$ paires.`);
});
essai("2", () => {
  const [c] = nombres(e(2));
  const { pts } = q1(2, "figure");
  vrai("2. losange de côté 6", nature(pts) === "losange" && proche(cote(pts, "AB"), c));
  dit(2, `$4 \\times ${c} = ${4 * c}$`);
  dit(2, `Réponse : a) $${c}$ cm chacun ; b) $${4 * c}$ cm.`);
});
essai("3", () => {
  const [d] = nombres(e(3));
  const { pts } = q1(3, "figure");
  vrai("3. rectangle aux diagonales de 10", nature(pts) === "rectangle" && proche(dist(pts.A, pts.C), d) && proche(dist(pts.B, pts.D), d));
  dit(3, `Réponse : $SU = ${d}$ cm.`);
});
essai("4", () => {
  const { pts } = q1(4, "figure");
  vrai("4. losange non carré, diagonales perpendiculaires et inégales", nature(pts) === "losange" && diagPerp(pts) && !diagEgales(pts));
  vrai("4. le schéma code l'angle droit", q1(4, "schema").o.diagDroit === true);
  dit(4, "Réponse : $90°$, un angle droit.");
});
essai("5", () => {
  const { pts, o } = q1(5, "schema");
  vrai("5. le schéma : un parallélogramme quelconque, chevrons codés", nature(pts) === "parallélogramme" && affirmable(o) === "parallélogramme");
  dit(5, "Réponse : a) rectangle ; b) losange ; c) carré ; d) parallélogramme.");
});
essai("6", () => {
  const [a, b] = quads(6, "figure");
  vrai("6. un losange non carré, puis un carré, les deux à 4 côtés égaux codés", nature(a.pts) === "losange" && affirmable(a.o) === "losange" && nature(b.pts) === "carré" && affirmable(b.o) === "carré" && proche(cote(a.pts, "AB"), cote(b.pts, "AB")));
  dit(6, "Réponse : non. On peut seulement dire que c'est un losange.");
});
essai("7", () => {
  const { pts, o } = q1(7, "figure");
  vrai("7. figure ouverte, D caché", o.ouvert === true);
  const D = quatrieme(pts);
  vrai("7. D = A + C − B est bien le D de la figure, et ABCD est un carré", memePoint(D, pts.D) && nature(pts) === "carré");
  const [dx, dy] = vec(pts.A, D);
  vrai("7. D est 3 carreaux au-dessus de A", dx === 0 && dy === 3);
  dit(7, `Réponse : $D$ est $${dy}$ carreaux au-dessus de $A$.`);
  dit(7, `$[AB]$ et $[BC]$ mesurent $${cote(pts, "AB")}$ carreaux.`);
});
essai("8", () => {
  const [c] = nombres(e(8));
  const { pts } = q1(8, "schema");
  vrai("8. le schéma : un carré de 4", nature(pts) === "carré" && proche(cote(pts, "AB"), c));
  dit(8, `Contrôle : $[CD]$ mesure $${c}$ cm.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [r, l] = quads(9, "figure");
  vrai("9. un rectangle et un losange, non carrés", nature(r.pts) === "rectangle" && nature(l.pts) === "losange");
  dit(9, "Réponse : a) des côtés égaux ; b) des angles droits.");
});
essai("10", () => {
  const [r, l] = quads(10, "schema");
  vrai("10. rectangle : diagonales égales, non perpendiculaires", nature(r.pts) === "rectangle" && diagEgales(r.pts) && !diagPerp(r.pts));
  vrai("10. losange : diagonales perpendiculaires, inégales", nature(l.pts) === "losange" && diagPerp(l.pts) && !diagEgales(l.pts));
  dit(10, "Réponse : a) vrai ; b) faux ; c) faux ; d) vrai.");
});
essai("11", () => {
  const [L, l] = nombres(e(11));
  dit(11, `$${L} + ${tx(l)} + ${L} + ${tx(l)} = ${tx(2 * (L + l))}$ cm`);
  const { pts } = q1(11, "schema");
  vrai("11. le schéma : 6 sur 3,5", nature(pts) === "rectangle" && proche(cote(pts, "AB"), L) && proche(cote(pts, "BC"), l));
  dit(11, `Réponse : le périmètre vaut $${tx(2 * (L + l))}$ cm.`);
});
essai("12", () => {
  const [c] = nombres(e(12));
  const { pts } = q1(12, "schema");
  vrai("12. losange de côté 4 : C à 4 de B et de D", nature(pts) === "losange" && proche(cote(pts, "BC"), c) && proche(cote(pts, "CD"), c));
  dit(12, `$C$ est à $${c}$ cm de $B$ et à $${c}$ cm de $D$.`);
});
essai("13", () => {
  const [a, b] = quads(13, "figure");
  const conseq = (o) => {
    const k = Object.keys(o.cotes ?? {});
    return k.length === 2 && k.some((x) => k.some((y) => x !== y && [...x].some((l) => y.includes(l))));
  };
  vrai("13. IJKL : deux côtés CONSÉCUTIFS de 5 cm", conseq(a.o) && nature(a.pts) === "carré");
  vrai("13. MNPQ : deux côtés OPPOSÉS de 5 cm, rectangle non carré", !conseq(b.o) && nature(b.pts) === "rectangle");
  dit(13, "Réponse : seul $IJKL$ est sûrement un carré.");
});
essai("14", () => {
  const { pts, o } = q1(14, "figure");
  vrai("14. figure ouverte", o.ouvert === true);
  const D = quatrieme(pts);
  vrai("14. D = A + C − B, losange", memePoint(D, pts.D) && nature(pts) === "losange");
  const [dx, dy] = vec(pts.C, D);
  vrai("14. de C à D : 3 à gauche, 2 en haut", dx === -3 && dy === 2);
  const [ax, ay] = vec(pts.A, pts.B);
  dit(14, `De $A$ à $B$ : $${ax}$ carreaux à droite, $${-ay}$ vers le bas.`);
  dit(14, `Réponse : $D$ est $${-dx}$ carreaux à gauche de $C$ et $${dy}$ carreaux plus haut.`);
});
essai("15", () => {
  const { pts, o } = q1(15, "figure");
  vrai("15. deux paires codées, parallélogramme sans angle droit", (o.paralleles ?? []).length === 2 && nature(pts) === "parallélogramme" && !(o.droits ?? []).length);
  dit(15, "Réponse : a) $2$ paires ; b) un parallélogramme ; c) non.");
});
essai("16", () => {
  const [zones, noms] = dessin("venn", 16);
  vrai("16. les cercles : rectangle et losange", noms.a === "rectangle" && noms.b === "losange");
  enonceDit(16, "$ABCD$ est un rectangle de $8$ cm sur $2$ cm.");
  enonceDit(16, "$IJKL$ est un carré.");
  enonceDit(16, "$EFGH$ est un losange sans angle droit.");
  enonceDit(16, "$MNPQ$ a des côtés de $2$, $3$, $4$ et $5$ cm.");
  // Rangement recalculé : rectangle ? losange ?
  const range = { ABCD: [true, 8 === 2], IJKL: [true, true], EFGH: [false, true], MNPQ: [2 === 4 && 3 === 5, false] };
  const zone = ([r, l]) => (r && l ? "commun" : r ? "aSeul" : l ? "bSeul" : "dehors");
  for (const [nm, v] of Object.entries(range)) vrai(`16. ${nm} dans la zone ${zone(v)}`, (zones[zone(v)] ?? []).includes(nm));
  dit(16, "Réponse : le carré est à la fois rectangle et losange.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [L, l, d1, d2] = nombres(e(17));
  dit(17, `$${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}$ m`);
  dit(17, `$${L} \\div 2 = ${L / 2}$ m`);
  vrai("17. les diagonales mesurées diffèrent", d1 !== d2);
  const vraie = Math.hypot(L, l);
  vrai(`17. mesures vraisemblables : la vraie diagonale (${vraie.toFixed(1)} m) est entre les deux`, d1 < vraie && vraie < d2);
  const { pts } = q1(17, "figure");
  vrai("17. le plan dessiné", nature(pts) === "rectangle" && proche(cote(pts, "AB"), L) && proche(cote(pts, "BC"), l));
  dit(17, `Réponse : a) $${2 * (L + l)}$ m ; b) un rectangle de $${L / 2}$ m sur $${l}$ m ; c) non.`);
});
essai("18", () => {
  const [cote80, carreau] = nombres(e(18));
  dit(18, `$${cote80} \\div ${carreau} = ${cote80 / carreau}$ carreaux`);
  const { pts, o } = q1(18, "figure");
  const K = o.cadre;
  vrai("18. le foulard : un carré de 4 carreaux", K.length === 4 && dist(K[0], K[1]) === cote80 / carreau && dist(K[1], K[2]) === cote80 / carreau);
  vrai("18. M, N, P, Q milieux des bords", S.every((k, j) => memePoint(pts[k], milieu(K[j], K[(j + 1) % 4]))));
  vrai("18. chaque côté traverse un carré de 2 sur 2", ["AB", "BC", "CD", "DA"].every((cc) => vec(pts[cc[0]], pts[cc[1]]).every((v) => Math.abs(v) === 2)));
  vrai("18. MNPQ est un carré", nature(pts) === "carré");
  dit(18, "Réponse : a) $4$ carreaux ; b) ils sont égaux ; c) un carré.");
});
essai("19", () => {
  const [n, c] = nombres(e(19));
  dit(19, `$${n} \\times ${c} = ${n * c}$ cm`);
  const [a, b] = quads(19, "figure");
  vrai("19. les pailles : un losange puis un carré, côté 12", nature(a.pts) === "losange" && nature(b.pts) === "carré" && proche(cote(a.pts, "AB"), c) && proche(cote(b.pts, "AB"), c));
  dit(19, `Réponse : a) un losange, $${n * c}$ cm ; b) oui ; c) oui, avec des angles droits ; d) non.`);
});
essai("20", () => {
  const { pts, o } = q1(20, "figure");
  vrai("20. figure ouverte, angle droit en B", o.ouvert === true && proche(angle(pts, "B"), 90, 1e-6));
  const D = quatrieme(pts);
  const [ab, bc] = [cote(pts, "AB"), cote(pts, "BC")];
  vrai("20. D = A + C − B", memePoint(D, pts.D) && nature(pts) === "rectangle");
  dit(20, `Je monte de $${D[1] - pts.A[1]}$ carreaux au-dessus de $A$ : c'est $D$.`);
  dit(20, `$${ab} + ${bc} + ${ab} + ${bc} = ${2 * (ab + bc)}$ m`);
  const [r, car] = quads(20, "schema");
  vrai("20. schéma : le rectangle, puis le carré de côté AB", nature(r.pts) === "rectangle" && nature(car.pts) === "carré" && proche(cote(car.pts, "AB"), ab));
  dit(20, `Réponse : a) $${bc}$ carreaux au-dessus de $A$ ; b) $${2 * (ab + bc)}$ m ; c) $${ab}$ carreaux au-dessus de $B$ et de $A$.`);
});

f.fin();
