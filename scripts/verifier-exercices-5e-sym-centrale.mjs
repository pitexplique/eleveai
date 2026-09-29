// Recalcul indépendant de la feuille « La symétrie centrale » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-sym-centrale.tsx.
//
// ⭐ Chaque `grille(…)` est relue dans le source : le script calcule lui-même
// l'image de chaque point (2·O − M), vérifie que le centre O est le MILIEU de
// chaque couple (X, X') dessiné, que la figure orange est bien l'image de la
// figure bleue, puis cherche dans le corrigé les coordonnées qu'il a
// calculées. Les coordonnées de l'énoncé sont relues dans le texte.
// ⭐ Le RENDU est simulé : la mise en page de `grille()` est refaite ici, aucune
// étiquette ne doit sortir du cadre ni en chevaucher une autre (nombres du
// quadrillage compris).
// Usage : node scripts/verifier-exercices-5e-sym-centrale.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-sym-centrale.tsx", "sym_centrale", ["grille"]);
const { c, e, vrai, dit, enonceDit, dessins, essai, appels } = f;
const { BLEU, ORANGE } = f.constantes;

/* ── Outils ──────────────────────────────────────────────────────────────── */
const sym = (O, p) => [2 * O[0] - p[0], 2 * O[1] - p[1]];
const egal = (p, q) => Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9;
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const cle = (p) => `${p[0]};${p[1]}`;
const memeEnsemble = (a, b) => JSON.stringify(a.map(cle).sort()) === JSON.stringify(b.map(cle).sort());
/** Un nombre comme la feuille l'écrit : 5{,}5. */
const tx = (x) => String(x).replace(".", "{,}");
/** Des coordonnées comme la feuille les écrit : 8\,;\,3. */
const co = (p) => `${tx(p[0])}\\,;\\,${tx(p[1])}`;
/** Les points « X(a ; b) » d'un texte. */
const pointsDe = (texte) => Object.fromEntries([...texte.matchAll(/\$([A-Z]'?)\((\d+(?:\{,\}\d+)?)\\,;\\,(\d+(?:\{,\}\d+)?)\)\$/g)].map((m) => [m[1], [Number(m[2].replace("{,}", ".")), Number(m[3].replace("{,}", "."))]]));

const lire = (a) => ({ fenetre: a[0], lignes: a[1], points: a[2] ?? [], extras: a[3] ?? {} });
const grilles = (k, role) => dessins("grille", k).filter((d) => !role || d.role === role).map((d) => lire(d.args));
const g1 = (k, role) => {
  const g = grilles(k, role)[0];
  if (!g) throw new Error(`exercice ${k} : pas de grille (${role ?? ""})`);
  return g;
};
const P = (g, nom) => {
  const p = g.points.find((x) => x.nom === nom);
  if (!p) throw new Error(`pas de point ${nom}`);
  return p.en;
};
const images = (g, noms) => noms.map((n) => sym(P(g, "O"), P(g, n)));

/* ── Contrôles de TOUTES les grilles ─────────────────────────────────────── */
const toutes = [];
f.feuille.blocs.forEach((_, i) => dessins("grille", i + 1).forEach((d) => toutes.push({ k: i + 1, role: d.role, g: lire(d.args) })));
vrai(`${toutes.length} grilles relues, autant que d'appels`, toutes.length === appels("grille").length);
toutes.forEach(({ k, role, g }) => {
  const n = `${k} (${role})`;
  const [min, max] = g.fenetre;
  for (const p of g.points) vrai(`${n} : ${p.nom || "point"} strictement dans la fenêtre`, p.en.every((v) => v > min && v < max));
  for (const l of g.lignes) for (const p of l.pts) vrai(`${n} : les lignes restent dans la fenêtre`, p.every((v) => v >= min && v <= max));
  const O = g.points.find((p) => p.nom === "O");
  if (!O || (k === 14 && role === "figure")) return;
  // O est le milieu de chaque couple (X, X') dessiné.
  for (const p of g.points) {
    const image = g.points.find((q) => q.nom === `${p.nom}'`);
    if (p.nom && image) vrai(`${n} : O milieu de [${p.nom}${p.nom}']`, egal(milieu(p.en, image.en), O.en));
  }
  // La figure orange est l'image de la figure bleue.
  const bleues = g.lignes.filter((l) => (l.couleur ?? BLEU) === BLEU);
  const oranges = g.lignes.filter((l) => l.couleur === ORANGE);
  if (bleues.length === 1 && oranges.length === 1) vrai(`${n} : la figure orange est l'image de la bleue`, memeEnsemble(bleues[0].pts.map((p) => sym(O.en, p)), oranges[0].pts));
});

/* ── Le rendu, simulé : la mise en page de grille() refaite ici ──────────── */
function boites(g) {
  const [min, max] = g.fenetre;
  const W = 300, G = 30, D = 12, HAUT = 12, BAS = 26;
  const u = (W - G - D) / (max - min);
  const H = Math.round(HAUT + u * (max - min) + BAS);
  const px = (p) => [G + (p[0] - min) * u, HAUT + (max - p[1]) * u];
  const pas = u < 24 ? 2 : 1;
  const res = [];
  const texte = (x, y, t, a, taille, borne = true) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = borne ? Math.min(Math.max(x, 4 + ga), W - 4 - dr) : x;
    const by = borne ? Math.min(Math.max(y, 10), H - 8) : y;
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  for (let k = min; k <= max; k++)
    if ((k - min) % pas === 0) {
      texte(px([k, min])[0], HAUT + u * (max - min) + 17 - 5, String(k), "middle", 14, false);
      texte(G - 6, px([min, k])[1], String(k), "end", 14, false);
    }
  const decal = { hd: [7, -10, "start"], hg: [-7, -10, "end"], bd: [7, 12, "start"], bg: [-7, 12, "end"], haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"] };
  for (const p of g.points) {
    if (!p.nom) continue;
    const [x, y] = px(p.en);
    const [dx, dy, a] = decal[p.vers ?? "hd"];
    texte(x + dx, y + dy, p.nom, a, 15);
  }
  for (const t of g.extras.textes ?? []) texte(...px(t.en), t.t, "middle", 16);
  return { W, H, res, px };
}
toutes.forEach(({ k, role, g }) => {
  const { W, H, res, px } = boites(g);
  const n = `${k} (${role})`;
  for (const b of res) vrai(`${n} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, q] = [res[a], res[b]];
      const ox = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0);
      const dy = Math.abs((p.y0 + p.y1) / 2 - (q.y0 + q.y1) / 2);
      vrai(`${n} : « ${p.t} » et « ${q.t} » ne se chevauchent pas`, ox <= 3 || dy >= 18, `recouvrement ${ox.toFixed(0)}, écart vertical ${dy.toFixed(0)}`);
    }
  // Une étiquette ne cache pas un autre point dessiné.
  for (const b of res.filter((r) => /^[A-Z]'?$/.test(r.t)))
    for (const p of g.points) {
      const [x, y] = px(p.en);
      vrai(`${n} : l'étiquette « ${b.t} » ne couvre pas le point ${p.nom || "(sans nom)"}`, !(x > b.x0 + 1 && x < b.x1 - 1 && y > b.y0 + 1 && y < b.y1 - 1));
    }
});

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = g1(1, "figure");
  const O = P(g, "O");
  const [F, ...candidats] = g.lignes;
  const image = F.pts.map((p) => sym(O, p));
  const centre = (l) => [l.pts.reduce((s, p) => s + p[0], 0) / l.pts.length, l.pts.reduce((s, p) => s + p[1], 0) / l.pts.length];
  const nomDe = (l) => {
    const [cx, cy] = centre(l);
    return g.extras.textes.reduce((m, t) => (Math.hypot(t.en[0] - cx, t.en[1] - cy) < Math.hypot(m.en[0] - cx, m.en[1] - cy) ? t : m)).t;
  };
  const bons = candidats.filter((l) => memeEnsemble(l.pts, image));
  vrai("1. une seule figure est l'image", bons.length === 1);
  const miroir = candidats.find((l) => memeEnsemble(l.pts, F.pts.map(([x, y]) => [2 * O[0] - x, y])));
  const glisse = candidats.find((l) => memeEnsemble(l.pts, F.pts.map(([x, y]) => [x, y - 5])));
  vrai("1. les deux autres : un miroir vertical et un glissement vers le bas", !!miroir && !!glisse);
  dit(1, `Réponse : la figure $${nomDe(bons[0])}$.`);
  dit(1, `La figure $${nomDe(miroir)}$ est le reflet`);
  dit(1, `La figure $${nomDe(glisse)}$ a seulement glissé vers le bas`);
  dit(1, `en $(${co(sym(O, [2, 6]))})$`);
  dit(1, `va en $(${co(sym(O, [4, 9]))})$`);
});
essai("2", () => {
  const g = g1(2, "figure");
  const [a, b] = images(g, ["A", "B"]);
  dit(2, `Réponse : $A'(${co(a)})$ et $B'(${co(b)})$.`);
});
essai("3", () => {
  enonceDit(3, "$OA = 3{,}7$ cm");
  dit(3, "$AA' = 3{,}7 + 3{,}7 = 7{,}4$ cm");
  dit(3, "$OA' = OA = 3{,}7$ cm");
});
essai("4", () => {
  const g = g1(4, "figure");
  const [m, n] = images(g, ["M", "N"]);
  dit(4, `Réponse : $M'(${co(m)})$ et $N'(${co(n)})$.`);
});
essai("5", () => {
  const g = g1(5, "figure");
  const [a, b, cc] = images(g, ["A", "B", "C"]);
  dit(5, `Réponse : $A'(${co(a)})$, $B'(${co(b)})$ et $C'(${co(cc)})$.`);
  vrai("5. B le plus haut, B' le plus bas", P(g, "B")[1] === Math.max(...["A", "B", "C"].map((x) => P(g, x)[1])) && b[1] === Math.min(a[1], b[1], cc[1]));
});
essai("6", () => {
  const g = g1(6, "schema");
  vrai("6. O milieu de [AB] : A et B s'échangent", egal(sym(P(g, "O"), P(g, "A")), P(g, "B")));
  dit(6, "Réponse : a) $O$ ; b) $B$ et $A$ ; c) $[AB]$ lui-même ; d) non.");
});
essai("7", () => {
  const g = g1(7, "schema");
  const [R, S, T] = ["R", "S", "T"].map((x) => P(g, x));
  const rs = Math.hypot(S[0] - R[0], S[1] - R[1]), rt = Math.hypot(T[0] - R[0], T[1] - R[1]);
  vrai("7. le dessin : RS = 3, RT = 4, angle droit en R", rs === 3 && rt === 4 && (S[0] - R[0]) * (T[0] - R[0]) + (S[1] - R[1]) * (T[1] - R[1]) === 0);
  enonceDit(7, `$RS = ${rs}$ cm et $RT = ${rt}$ cm`);
  dit(7, `$${rs} \\times ${rt} \\div 2 = ${(rs * rt) / 2}$ cm²`);
  dit(7, `Réponse : $R'S' = ${rs}$ cm ; $R'T' = ${rt}$ cm ; $90°$ ; $${(rs * rt) / 2}$ cm².`);
});
essai("8", () => {
  const g = g1(8, "figure");
  const O = milieu(P(g, "A"), P(g, "A'"));
  dit(8, `Réponse : $O(${co(O)})$.`);
  vrai("8. le schéma place O au milieu", egal(P(g1(8, "schema"), "O"), O));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = g1(9, "figure");
  const noms = ["A", "B", "C", "D"];
  const im = images(g, noms);
  dit(9, `Réponse : $A'(${co(im[0])})$, $B'(${co(im[1])})$, $C'(${co(im[2])})$ et $D'(${co(im[3])})$`);
  const pointe = noms[noms.map((n) => P(g, n)[0]).indexOf(Math.max(...noms.map((n) => P(g, n)[0])))];
  vrai("9. la pointe est B, et B' est le plus à gauche", pointe === "B" && im[1][0] === Math.min(...im.map((p) => p[0])));
  dit(9, "la flèche image pointe vers la gauche");
});
essai("10", () => {
  const g = g1(10, "figure");
  vrai("10. O milieu de [AB]", egal(milieu(P(g, "A"), P(g, "B")), P(g, "O")));
  const [cc] = images(g, ["C"]);
  dit(10, `$C'(${co(cc)})$`);
  dit(10, `Réponse : a) $B$ et $A$ ; b) $C'(${co(cc)})$ ; c) le triangle $BAC'$ ; d) un parallélogramme.`);
});
essai("11", () => {
  const pts = pointsDe(e(11));
  const [p, q] = [sym(pts.O, pts.P), sym(pts.O, pts.Q)];
  dit(11, `Réponse : a) $P'(${co(p)})$ et $Q'(${co(q)})$`);
  const croix = (pts.Q[0] - pts.P[0]) * (p[1] - q[1]) - (pts.Q[1] - pts.P[1]) * (p[0] - q[0]);
  vrai("11. (d) et (d') parallèles", croix === 0);
  const g = g1(11, "schema");
  vrai("11. le schéma porte les points de l'énoncé", ["P", "Q", "O"].every((n) => egal(P(g, n), pts[n])));
  dit(11, `de $P$ à $Q$ : $${pts.Q[0] - pts.P[0]}$ à droite, $${pts.Q[1] - pts.P[1]}$ en haut`);
});
essai("12", () => {
  const g = g1(12, "schema");
  const centres = g.points.map((p) => p.en);
  vrai("12. le N et le Z sont symétriques par rapport à leur centre", g.lignes.every((l, i) => memeEnsemble(l.pts.map((p) => sym(centres[i], p)), l.pts)));
  dit(12, "Réponse : H, N, S, Z et X.");
});
essai("13", () => {
  const pts = pointsDe(e(13));
  const [E, F, G] = ["E", "F", "G"].map((n) => sym(pts.O, pts[n]));
  dit(13, `Réponse : a) $E'(${co(E)})$, $F'(${co(F)})$, $G'(${co(G)})$`);
  vrai("13. E', F', G' alignés", (F[0] - G[0]) * (E[1] - F[1]) === (F[1] - G[1]) * (E[0] - F[0]));
  const g = g1(13, "schema");
  const [c1, c2] = g.extras.cercles;
  vrai("13. le cercle image : centre F', même rayon", egal(c1.centre, pts.F) && egal(c2.centre, F) && c1.rayon === c2.rayon && c1.rayon === 1.5);
  enonceDit(13, "rayon $1{,}5$ carreau");
});
essai("14", () => {
  const g = g1(14, "figure");
  const O = P(g, "O");
  const faux = ["A", "B", "C"].filter((n) => !egal(milieu(P(g, n), P(g, `${n}'`)), O));
  vrai(`14. un seul point faux (${faux})`, faux.length === 1);
  const juste = sym(O, P(g, faux[0]));
  dit(14, `Réponse : a) $${faux[0]}'$ ; b) en $(${co(juste)})$.`);
  vrai("14. le schéma le corrige", egal(P(g1(14, "schema"), `${faux[0]}'`), juste));
});
essai("15", () => {
  const g = g1(15, "figure");
  const ms = ["P", "Q", "R"].map((n) => milieu(P(g, n), P(g, `${n}'`)));
  vrai("15. un même centre pour les trois couples", ms.every((m) => egal(m, ms[0])));
  dit(15, `Réponse : $O(${co(ms[0])})$.`);
  vrai("15. le centre n'est pas sur un nœud", !ms[0].every(Number.isInteger));
});
essai("16", () => {
  const pts = pointsDe(e(16));
  const [a, b] = [sym(pts.O, pts.A), sym(pts.O, pts.B)];
  dit(16, `Réponse : a) $A'(${co(a)})$ et $B'(${co(b)})$`);
  vrai("16. [A'B'] horizontal, de même longueur", a[1] === b[1] && Math.abs(a[0] - b[0]) === Math.abs(pts.A[0] - pts.B[0]));
  dit(16, `$A'B' = ${Math.max(a[0], b[0])} - ${Math.min(a[0], b[0])} = ${Math.abs(a[0] - b[0])}$`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = g1(17, "figure");
  const [terrain] = g.lignes;
  const [K, , K2] = terrain.pts;
  const O = P(g, "O");
  vrai("17. O est le centre du terrain", egal(milieu(K, K2), O));
  enonceDit(17, "un carreau représente $10$ m");
  const long = (terrain.pts[1][0] - terrain.pts[0][0]) * 10, larg = (terrain.pts[2][1] - terrain.pts[1][1]) * 10;
  enonceDit(17, `un rectangle de $${long}$ m sur $${larg}$ m`);
  vrai("17. K est le coin tracé", egal(P(g, "K"), K));
  dit(17, `$K'(${co(sym(O, K))})$`);
  const Pp = P(g, "P");
  vrai("17. P à 11 m de la ligne de but", Math.abs((Pp[0] - K[0]) * 10 - 11) < 1e-9);
  const pp = Math.round((sym(O, Pp)[0] - Pp[0]) * 10 * 1e6) / 1e6;
  dit(17, `$PP' = ${long} - 11 - 11 = ${pp}$ m`);
  dit(17, `$M'(${co(sym(O, P(g, "M")))})$`);
});
essai("18", () => {
  const g = g1(18, "figure");
  const O = P(g, "O");
  const pips = g.points.filter((p) => !p.nom).map((p) => p.en);
  const bas = pips.filter((p) => p[1] < O[1]), haut = pips.filter((p) => p[1] > O[1]);
  vrai("18. le domino 3-5", bas.length === 3 && haut.length === 5);
  vrai("18. chaque face a un centre de symétrie (son point du milieu)", [bas, haut].every((face) => {
    const m = [face.reduce((s, p) => s + p[0], 0) / face.length, face.reduce((s, p) => s + p[1], 0) / face.length];
    return memeEnsemble(face.map((p) => sym(m, p)), face);
  }));
  vrai("18. après le demi-tour, le 3 est en haut : le domino change", !memeEnsemble(pips.map((p) => sym(O, p)), pips) && bas.map((p) => sym(O, p)).every((p) => p[1] > O[1]));
  enonceDit(18, "contient $28$ dominos");
  dit(18, "Il y en a $7$.");
  vrai("18. 7 doubles de 0 à 6", [0, 1, 2, 3, 4, 5, 6].length === 7);
});
essai("19", () => {
  const pts = pointsDe(e(19));
  const O = milieu(pts.A, pts.C);
  const D = sym(O, pts.B);
  dit(19, `Donc $O(${co(O)})$.`);
  dit(19, `$D(${co(D)})$`);
  const g = g1(19, "schema");
  vrai("19. le schéma place D", egal(P(g, "D"), D));
  vrai("19. ABCD parallélogramme : AB et DC même trajet", pts.B[0] - pts.A[0] === pts.C[0] - D[0] && pts.B[1] - pts.A[1] === pts.C[1] - D[1]);
});
essai("20", () => {
  const g = g1(20, "figure");
  const [a, b, cc] = images(g, ["A", "B", "C"]);
  dit(20, `Réponse : a) $A'(${co(a)})$, $B'(${co(b)})$ et $C'(${co(cc)})$`);
  const [A, B, C, O] = ["A", "B", "C", "O"].map((n) => P(g, n));
  const ab = Math.hypot(B[0] - A[0], B[1] - A[1]), ac = Math.hypot(C[0] - A[0], C[1] - A[1]);
  vrai("20. rectangle en A", (B[0] - A[0]) * (C[0] - A[0]) + (B[1] - A[1]) * (C[1] - A[1]) === 0);
  dit(20, `$${ab} \\times ${ac} \\div 2 = ${(ab * ac) / 2}$ cm²`);
  dit(20, `$${(ab * ac) / 2} + ${(ab * ac) / 2} = ${ab * ac}$ cm²`);
  const oc = Math.hypot(C[0] - O[0], C[1] - O[1]);
  enonceDit(20, `$OC = ${oc}$ cm`);
  dit(20, `$CC' = 2 \\times ${oc} = ${2 * oc}$ cm`);
});

f.fin();
