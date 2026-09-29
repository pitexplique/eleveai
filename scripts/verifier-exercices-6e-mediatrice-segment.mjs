// Recalcul indépendant de la feuille « La médiatrice d'un segment » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-mediatrice-segment.tsx.
//
// ⭐ Chaque `geo(…)` est relu dans le source : chaque cote est MESURÉE sur les
// coordonnées, chaque codage de longueurs égales et chaque angle droit
// vérifiés ; chaque médiatrice dessinée est contrôlée (perpendiculaire au
// segment ET passant par son milieu), chaque point annoncé « à égale
// distance » l'est, les arcs de compas et les cercles sont relus. Puis le
// script recalcule chaque résultat annoncé et le cherche dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `geo()` est refaite ici, aucune
// étiquette ne doit sortir du cadre, en chevaucher une autre ou couvrir un point.
// ⭐ LA LECTURE (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») : chaque
// phrase compte 20 mots au plus, 13 en moyenne.
// Usage : node scripts/verifier-exercices-6e-mediatrice-segment.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-mediatrice-segment.tsx", "mediatrice_segment", ["geo"], "6e");
const { vrai, dit, dessins, essai, appels, e } = f;
const { VERT, VIOLET, ORANGE } = f.constantes;

/* ── Outils ──────────────────────────────────────────────────────────────── */
const EPS = 1e-6;
const egal = (p, q, eps = EPS) => Math.abs(p[0] - q[0]) < eps && Math.abs(p[1] - q[1]) < eps;
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
/** Distance du point p à la droite (a, b). */
const aLaDroite = (p, a, b) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / dist(a, b);
const perp = (s, A, B) => Math.abs(((s.vers[0] - s.de[0]) * (B[0] - A[0]) + (s.vers[1] - s.de[1]) * (B[1] - A[1])) / (dist(s.de, s.vers) * dist(A, B))) < 0.005;
const parMilieu = (s, A, B) => aLaDroite(milieu(A, B), s.de, s.vers) < 0.01;
/** Le segment tracé porte-t-il la médiatrice de [AB] ? */
const estMediatrice = (s, A, B) => perp(s, A, B) && parMilieu(s, A, B);
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");
const nb = (s) => Number(s.replace("{,}", "."));
const lu = (k, nom) => {
  const m = e(k).match(new RegExp(`\\$${nom} = ([\\d{},]+)\\$`));
  if (!m) throw new Error(`${k} : « ${nom} = … » absent de l'énoncé`);
  return nb(m[1]);
};

const geos = (k, role) => dessins("geo", k).filter((d) => !role || d.role === role).map((d) => d.args[0]);
const g1 = (k, role) => {
  const g = geos(k, role)[0];
  if (!g) throw new Error(`exercice ${k} : pas de geo (${role ?? ""})`);
  return g;
};
const P = (g, nom) => {
  const p = (g.points ?? []).find((x) => x.nom === nom);
  if (!p) throw new Error(`pas de point ${nom}`);
  return p.en;
};
const verts = (g) => (g.segs ?? []).filter((s) => s.couleur === VERT);

/* ── Contrôles de TOUTES les figures ─────────────────────────────────────── */
const toutes = [];
f.feuille.blocs.forEach((_, i) => dessins("geo", i + 1).forEach((d) => toutes.push({ k: i + 1, role: d.role, g: d.args[0] })));
vrai(`${toutes.length} figures relues, autant que d'appels`, toutes.length === appels("geo").length);
toutes.forEach(({ k, role, g }) => {
  const n = `${k} (${role})`;
  for (const c of g.cotes ?? []) {
    const v = nb(c.t.split(" ")[0].replace(",", "{,}"));
    const d = dist(c.de, c.vers);
    vrai(`${n} : la cote « ${c.t} » est la vraie longueur (${d.toFixed(3)})`, Math.abs(d - v) <= 0.02);
  }
  const parN = {};
  for (const cd of g.codes ?? []) (parN[cd.n] ??= []).push(dist(cd.de, cd.vers));
  for (const [nbT, ls] of Object.entries(parN)) vrai(`${n} : les segments codés ${nbT} trait(s) sont égaux`, ls.every((l) => Math.abs(l - ls[0]) < 0.01), ls.map((l) => l.toFixed(3)).join(" / "));
  for (const d of g.droits ?? []) {
    const [u, v] = [[d.a[0] - d.en[0], d.a[1] - d.en[1]], [d.b[0] - d.en[0], d.b[1] - d.en[1]]];
    vrai(`${n} : l'angle droit codé est droit`, Math.abs((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) < 0.005);
  }
});

/* ── Le rendu, simulé : la mise en page de geo() refaite ici ─────────────── */
function boites(g) {
  const W = 300, HMAX = 230, m = 26;
  const reels = [];
  for (const s of g.segs ?? []) reels.push(s.de, s.vers);
  for (const p of g.points ?? []) reels.push(p.en);
  for (const t of g.textes ?? []) reels.push(t.en);
  for (const a of g.arcs ?? []) for (const d of [a.de, a.a]) reels.push([a.centre[0] + a.rayon * Math.cos((d * Math.PI) / 180), a.centre[1] + a.rayon * Math.sin((d * Math.PI) / 180)]);
  for (const c of g.cercles ?? []) reels.push([c.centre[0] - c.rayon, c.centre[1] - c.rayon], [c.centre[0] + c.rayon, c.centre[1] + c.rayon]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const res = [];
  const texte = (x, y, t, a, taille) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  const decal = { hd: [7, -10, "start"], hg: [-7, -10, "end"], bd: [7, 12, "start"], bg: [-7, 12, "end"], haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"] };
  for (const p of g.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, a] = decal[p.vers ?? "haut"];
    texte(x + dx, y + dy, p.nom, a, 15);
  }
  for (const c of g.cotes ?? []) {
    const [p, q] = [px(c.de), px(c.vers)];
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    const t = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
    const sens = c.cote ?? 1;
    texte((p[0] + q[0]) / 2 + t[1] * sens * 15, (p[1] + q[1]) / 2 - t[0] * sens * 15, c.t, "middle", 14);
  }
  for (const t of g.textes ?? []) texte(...px(t.en), t.t, "middle", 16);
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
  for (const b of res)
    for (const p of g.points ?? []) {
      const [x, y] = px(p.en);
      vrai(`${n} : l'étiquette « ${b.t} » ne couvre pas le point ${p.nom}`, !(x > b.x0 + 1 && x < b.x1 - 1 && y > b.y0 + 1 && y < b.y1 - 1));
    }
});

/* ── La lecture : des phrases courtes ────────────────────────────────────── */
{
  const src = f.feuille.series;
  const chaines = [...src.matchAll(/(?:enonce|correction|titre|consigne):\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  for (const [, r] of src.matchAll(/rappel: \[([\s\S]*?)\n\s+\],/g)) chaines.push(...[...r.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]));
  const phrases = chaines.flatMap((s) => s.split(/\\n|(?<=[.!?;])\s+/)).map((p) => p.replace(/\$[^$]*\$/g, "X").trim()).filter(Boolean);
  const mots = (p) => p.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const longues = phrases.filter((p) => mots(p) > 20);
  vrai(`phrases de 20 mots au plus (${longues.length} trop longues)`, longues.length === 0, longues.slice(0, 3).map((p) => `[${mots(p)}] ${p.slice(0, 70)}`).join(" | "));
  const moyenne = phrases.reduce((s, p) => s + mots(p), 0) / phrases.length;
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
  console.log(`lecture : ${phrases.length} phrases, ${moyenne.toFixed(1)} mots en moyenne, ${Math.max(...phrases.map(mots))} au plus`);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = g1(1, "figure");
  const [A, B] = [P(g, "A"), P(g, "B")];
  const droites = g.segs.filter((s) => s.couleur === VIOLET);
  const nom = (s) => {
    const haut = s.de[1] > s.vers[1] ? s.de : s.vers;
    return g.textes.reduce((m, t) => (dist(t.en, haut) < dist(m.en, haut) ? t : m)).t;
  };
  const etat = Object.fromEntries(droites.map((s) => [nom(s), [perp(s, A, B), parMilieu(s, A, B)]]));
  vrai(`1. droite 1 perpendiculaire hors du milieu, 2 par le milieu sans angle droit, 3 les deux (${JSON.stringify(etat)})`, JSON.stringify(etat) === JSON.stringify({ 1: [true, false], 2: [false, true], 3: [true, true] }));
  vrai("1. M est le milieu codé", egal(P(g, "M"), milieu(A, B)));
  dit(1, "Réponse : la droite $3$.");
});
essai("2", () => {
  const g = g1(2, "schema");
  vrai("2. le schéma trace la médiatrice", estMediatrice(verts(g)[0], P(g, "A"), P(g, "B")));
  dit(2, "Réponse : a) perpendiculaire, milieu ; b) une seule ; c) une droite.");
});
essai("3", () => {
  const pe = lu(3, "PE");
  dit(3, `$PF = PE = ${tx(pe)}$ cm.`);
  const g = g1(3, "schema");
  const [E, F, Pp] = ["E", "F", "P"].map((x) => P(g, x));
  vrai("3. le schéma : P sur la médiatrice, PE = PF = 5,3", estMediatrice(verts(g)[0], E, F) && Math.abs(dist(Pp, E) - pe) < 0.005 && Math.abs(dist(Pp, F) - pe) < 0.005);
});
essai("4", () => {
  const g = g1(4, "schema");
  const [U, V, G] = ["U", "V", "G"].map((x) => P(g, x));
  vrai("4. le schéma : GU = GV = 4,1, G sur la médiatrice", Math.abs(dist(G, U) - 4.1) < 0.005 && Math.abs(dist(G, V) - 4.1) < 0.005 && estMediatrice(verts(g)[0], U, V));
  dit(4, "Réponse : $G$ est sur la médiatrice de $[UV]$.");
});
essai("5", () => {
  const ab = nb(e(5).match(/de \$([\d{},]+)\$ cm/)[1]);
  dit(5, `$${tx(ab)} \\div 2 = ${tx(ab / 2)}$ cm`);
  dit(5, `à $${tx(ab / 2)}$ cm de $A$`);
  const g = g1(5, "schema");
  const [A, B, M] = ["A", "B", "M"].map((x) => P(g, x));
  vrai("5. le schéma : AB = 7,4, M milieu, médiatrice tracée", Math.abs(dist(A, B) - ab) < EPS && egal(M, milieu(A, B)) && estMediatrice(verts(g)[0], A, B));
});
essai("6", () => {
  const g = g1(6, "schema");
  vrai("6. le pli est la médiatrice de [RS]", estMediatrice(verts(g)[0], P(g, "R"), P(g, "S")));
  dit(6, "Réponse : le pli est la médiatrice de $[RS]$.");
});
essai("7", () => {
  const g = g1(7, "figure");
  const [A, B, M, N, K] = ["A", "B", "M", "N", "K"].map((x) => P(g, x));
  const d = verts(g)[0];
  vrai("7. (d) est la médiatrice ; M et N sur (d) ; K hors de (d)", estMediatrice(d, A, B) && aLaDroite(M, d.de, d.vers) < EPS && aLaDroite(N, d.de, d.vers) < EPS && aLaDroite(K, d.de, d.vers) > 0.5);
  const ma = g.cotes.find((c) => egal(c.de, M)).t.split(" ")[0];
  const nb2 = g.cotes.find((c) => egal(c.de, N)).t.split(" ")[0];
  dit(7, `$MB = MA = ${ma.replace(",", "{,}")}$ cm`);
  dit(7, `$NA = NB = ${nb2.replace(",", "{,}")}$ cm`);
  vrai("7. K est plus près de B que de A", dist(K, B) < dist(K, A));
});
essai("8", () => {
  const g = g1(8, "schema");
  const [A, B, Z, M] = ["A", "B", "Z", "M"].map((x) => P(g, x));
  vrai("8. Z à 3 cm de A et de B, sur la médiatrice ; M milieu", Math.abs(dist(Z, A) - 3) < 0.005 && Math.abs(dist(Z, B) - 3) < 0.005 && aLaDroite(Z, verts(g)[0].de, verts(g)[0].vers) < EPS && egal(M, milieu(A, B)));
  dit(8, "Réponse : a) vrai ; b) vrai ; c) vrai ; d) faux.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = g1(9, "schema");
  const [A, B, I, J] = ["A", "B", "I", "J"].map((x) => P(g, x));
  const r = g.arcs[0].rayon;
  vrai("9. même écartement, plus que la moitié de [AB]", g.arcs.every((a) => a.rayon === r) && r > dist(A, B) / 2);
  for (const X of [I, J]) vrai("9. I et J à la distance r de A et de B", Math.abs(dist(A, X) - r) < 0.005 && Math.abs(dist(B, X) - r) < 0.005);
  const surArc = (X, c) =>
    g.arcs.some((a) => {
      if (!egal(a.centre, c)) return false;
      const t = (Math.atan2(X[1] - c[1], X[0] - c[0]) * 180) / Math.PI;
      return [-360, 0, 360].some((k) => t + k >= Math.min(a.de, a.a) && t + k <= Math.max(a.de, a.a));
    });
  for (const X of [I, J]) vrai("9. chaque croisement est sur un arc de A et un arc de B", surArc(X, A) && surArc(X, B));
  const d = verts(g)[0];
  vrai("9. la droite tracée est la médiatrice et passe par I et J", estMediatrice(d, A, B) && aLaDroite(I, d.de, d.vers) < 0.01 && aLaDroite(J, d.de, d.vers) < 0.01);
});
essai("10", () => {
  const g = g1(10, "figure");
  const [A, B, C, D] = ["A", "B", "C", "D"].map((x) => P(g, x));
  const ca = nb(e(10).match(/CA = CB = ([\d{},]+)\$/)[1]), da = nb(e(10).match(/DA = DB = ([\d{},]+)\$/)[1]);
  vrai("10. la figure : CA = CB = 5, DA = DB = 3,5", [dist(C, A), dist(C, B)].every((x) => Math.abs(x - ca) < 0.005) && [dist(D, A), dist(D, B)].every((x) => Math.abs(x - da) < 0.005));
  const s = g1(10, "schema");
  const d = verts(s)[0];
  vrai("10. la médiatrice passe par C et par D", estMediatrice(d, A, B) && aLaDroite(C, d.de, d.vers) < EPS && aLaDroite(D, d.de, d.vers) < EPS);
});
essai("11", () => {
  const g = g1(11, "figure");
  const [O, Pp, Q, M] = ["O", "P", "Q", "M"].map((x) => P(g, x));
  const r = g.cercles[0].rayon;
  vrai("11. P et Q sur le cercle de centre O", egal(g.cercles[0].centre, O) && Math.abs(dist(O, Pp) - r) < EPS && Math.abs(dist(O, Q) - r) < EPS);
  const d = verts(g)[0];
  vrai("11. la perpendiculaire par O coupe [PQ] en son milieu M", perp(d, Pp, Q) && aLaDroite(O, d.de, d.vers) < EPS && egal(M, milieu(Pp, Q)));
  const pq = nb(e(11).match(/mesure \$(\d+)\$ cm/)[1]);
  vrai("11. PQ = 6 sur la figure", Math.abs(dist(Pp, Q) - pq) < EPS);
  dit(11, `$PM = ${pq} \\div 2 = ${tx(pq / 2)}$ cm.`);
});
essai("12", () => {
  const g = g1(12, "figure");
  const c = g.cercles[0];
  const [A, B, C] = ["A", "B", "C"].map((x) => P(g, x));
  vrai("12. A, B, C sur le cercle", [A, B, C].every((X) => Math.abs(dist(c.centre, X) - c.rayon) < EPS));
  const s = g1(12, "schema");
  const [dAB, dBC] = verts(s);
  vrai("12. le schéma trace les médiatrices de [AB] et de [BC]", estMediatrice(dAB, A, B) && estMediatrice(dBC, B, C));
  vrai("12. elles se coupent au centre O", aLaDroite(c.centre, dAB.de, dAB.vers) < 0.01 && aLaDroite(c.centre, dBC.de, dBC.vers) < 0.01 && egal(P(s, "O"), c.centre));
});
essai("13", () => {
  const [ma, ab] = [lu(13, "MA"), lu(13, "AB")];
  dit(13, `$MB = MA = ${tx(ma)}$ cm`);
  dit(13, `$${tx(ma)} + ${tx(ma)} + ${tx(ab)} = ${tx(2 * ma + ab)}$ cm`);
  const g = g1(13, "schema");
  const [A, B, M] = ["A", "B", "M"].map((x) => P(g, x));
  vrai("13. le schéma : MA = MB = 4,2, AB = 5", Math.abs(dist(M, A) - ma) < 0.005 && Math.abs(dist(M, B) - ma) < 0.005 && Math.abs(dist(A, B) - ab) < EPS);
});
essai("14", () => {
  const g = g1(14, "schema");
  const [A, B, S] = ["A", "B", "S"].map((x) => P(g, x));
  vrai("14. S est sur la route", S[1] === 0);
  vrai("14. SA = SB", Math.abs(dist(S, A) - dist(S, B)) < 0.005);
  dit(14, `environ $${tx(Math.round(dist(S, A) * 10) / 10)}$ cm`);
  const d = verts(g)[0];
  vrai("14. la droite tracée est la médiatrice et passe par S", estMediatrice(d, A, B) && aLaDroite(S, d.de, d.vers) < 0.01);
  const enFace = [milieu(A, B)[0], 0];
  vrai("14. le piège : en face du milieu, SA ≠ SB", Math.abs(dist(enFace, A) - dist(enFace, B)) > 0.3);
});
essai("15", () => {
  const g = g1(15, "figure");
  const [S, T, R] = ["S", "T", "R"].map((x) => P(g, x));
  vrai("15. la figure : RS = RT = 5, ST = 6", Math.abs(dist(R, S) - 5) < EPS && Math.abs(dist(R, T) - 5) < EPS && Math.abs(dist(S, T) - 6) < EPS);
  dit(15, `$SH = ${dist(S, T)} \\div 2 = ${dist(S, T) / 2}$ cm.`);
  const s = g1(15, "schema");
  const d = verts(s)[0];
  vrai("15. la médiatrice de [ST] passe par R, H milieu", estMediatrice(d, S, T) && aLaDroite(R, d.de, d.vers) < EPS && egal(P(s, "H"), milieu(S, T)));
});
essai("16", () => {
  const g = g1(16, "schema");
  const [A, B, K, L] = ["A", "B", "K", "L"].map((x) => P(g, x));
  const d = verts(g)[0];
  vrai("16. K hors de la médiatrice, KA = 3, KB ≠ 3", estMediatrice(d, A, B) && aLaDroite(K, d.de, d.vers) > 0.5 && Math.abs(dist(K, A) - 3) < 0.005 && Math.abs(dist(K, B) - 3) > 0.5);
  vrai("16. LA = 4 et LB = 4,5", Math.abs(dist(L, A) - lu(16, "LA")) < 0.005 && Math.abs(dist(L, B) - lu(16, "LB")) < 0.005);
  dit(16, "Réponse : a) non ; b) non.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const s = g1(17, "schema");
  const [A, B, C, O] = ["A", "B", "C", "O"].map((x) => P(s, x));
  vrai("17. OA = OB = OC", Math.abs(dist(O, A) - dist(O, B)) < EPS && Math.abs(dist(O, B) - dist(O, C)) < EPS);
  const ds = verts(s);
  vrai("17. les trois médiatrices tracées, toutes par O", estMediatrice(ds[0], A, B) && estMediatrice(ds[1], B, C) && estMediatrice(ds[2], A, C) && ds.every((d) => aLaDroite(O, d.de, d.vers) < 0.01));
  const g = g1(17, "figure");
  vrai("17. les écoles de la figure sont celles du schéma", ["A", "B", "C"].every((x) => egal(P(g, x), P(s, x))));
});
essai("18", () => {
  const g = g1(18, "figure");
  const arc = g.arcs[0];
  const [A, B, C] = ["A", "B", "C"].map((x) => P(g, x));
  vrai("18. A, B, C sur le bord de l'assiette", [A, B, C].every((X) => Math.abs(dist(arc.centre, X) - arc.rayon) < 0.005));
  const s = g1(18, "schema");
  const [dAB, dBC] = verts(s);
  vrai("18. les médiatrices de [AB] et [BC] passent par le centre", estMediatrice(dAB, A, B) && estMediatrice(dBC, B, C) && [dAB, dBC].every((d) => aLaDroite(arc.centre, d.de, d.vers) < 0.01));
  const ob = lu(18, "OB");
  vrai("18. OB = 6 sur le dessin", Math.abs(dist(P(s, "O"), B) - ob) < EPS);
  dit(18, `$2 \\times ${ob} = ${2 * ob}$ cm`);
});
essai("19", () => {
  const g = g1(19, "figure");
  const [A, B, C, D] = ["A", "B", "C", "D"].map((x) => P(g, x));
  vrai("19. AB = AD = 3, CB = CD = 5", [dist(A, B), dist(A, D)].every((x) => Math.abs(x - 3) < 0.005) && [dist(C, B), dist(C, D)].every((x) => Math.abs(x - 5) < 0.005));
  const s = g1(19, "schema");
  const I = P(s, "I");
  const d = verts(s)[0];
  vrai("19. (AC) est la médiatrice de [BD], I au milieu", estMediatrice(d, B, D) && egal(I, milieu(B, D)));
  vrai("19. I n'est pas le milieu de [AC]", Math.abs(dist(I, A) - dist(I, C)) > 0.5);
});
essai("20", () => {
  const s = g1(20, "schema");
  const [Pp, Q] = [P(s, "P"), P(s, "Q")];
  const frontiere = s.segs.find((x) => x.couleur === ORANGE);
  vrai("20. la frontière est la médiatrice de [PQ]", estMediatrice(frontiere, Pp, Q));
  vrai("20. 35 < 42 : la vache va en Q", 35 < 42);
  dit(20, "Réponse : a) la médiatrice de $[PQ]$ ; b) en $Q$ ; c) $50$ m.");
  vrai("20. l'énoncé : 42 m de P, 35 m de Q, 50 m de P", /\$42\$ m de \$P\$ et à \$35\$ m de \$Q\$/.test(e(20)) && /\$50\$ m de \$P\$/.test(e(20)));
});

f.fin();
