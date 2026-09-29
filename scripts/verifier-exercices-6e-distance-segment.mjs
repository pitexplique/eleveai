// Recalcul indépendant de la feuille « Distances et milieu d'un segment » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-distance-segment.tsx.
//
// ⭐ Chaque `geo(…)` est relu dans le source : chaque cote est MESURÉE sur les
// coordonnées, chaque codage de longueurs égales vérifié, la règle lue (ses
// graduations sont les vraies abscisses), les arcs de compas contrôlés ; puis
// le script recalcule chaque résultat annoncé à partir des nombres relus dans
// l'énoncé ou le dessin, et le cherche dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `geo()` est refaite ici, aucune
// étiquette ne doit sortir du cadre, en chevaucher une autre ou couvrir un point.
// ⭐ LA LECTURE (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») : chaque
// phrase compte 20 mots au plus, 13 en moyenne.
// Usage : node scripts/verifier-exercices-6e-distance-segment.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-distance-segment.tsx", "distance_segment", ["geo"], "6e");
const { vrai, verif, dit, enonceDit, dessins, essai, appels, e } = f;
const { BLEU } = f.constantes;

/* ── Outils ──────────────────────────────────────────────────────────────── */
const EPS = 1e-6;
const egal = (p, q, eps = EPS) => Math.abs(p[0] - q[0]) < eps && Math.abs(p[1] - q[1]) < eps;
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const aligne = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) < 1e-6;
/** Un nombre comme la feuille l'écrit : 2{,}25. */
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");
/** Un nombre lu dans le texte : « 4{,}5 » → 4.5. */
const nb = (s) => Number(s.replace("{,}", "."));
/** La valeur `X = 4{,}5` lue dans l'énoncé k. */
const lu = (k, nom) => {
  const m = e(k).match(new RegExp(`\\$${nom.replace(/[[\]()]/g, "\\$&")} = ([\\d{},]+)\\$`));
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

/* ── Contrôles de TOUTES les figures ─────────────────────────────────────── */
const toutes = [];
f.feuille.blocs.forEach((_, i) => dessins("geo", i + 1).forEach((d) => toutes.push({ k: i + 1, role: d.role, g: d.args[0] })));
vrai(`${toutes.length} figures relues, autant que d'appels`, toutes.length === appels("geo").length);
toutes.forEach(({ k, role, g }) => {
  const n = `${k} (${role})`;
  for (const c of g.cotes ?? []) {
    const v = nb(c.t.split(" ")[0].replace(",", "{,}"));
    const d = dist(c.de, c.vers);
    vrai(`${n} : la cote « ${c.t} » est la vraie longueur (${d.toFixed(3)})`, Math.abs(d - v) <= Math.max(0.02, v * 0.005));
  }
  const parN = {};
  for (const cd of g.codes ?? []) (parN[cd.n] ??= []).push(dist(cd.de, cd.vers));
  for (const [nbT, ls] of Object.entries(parN)) vrai(`${n} : les segments codés ${nbT} trait(s) sont égaux`, ls.every((l) => Math.abs(l - ls[0]) < 1e-6), ls.join(" / "));
  if (g.regle) {
    const ys = [...(g.segs ?? []).flatMap((s) => [s.de[1], s.vers[1]]), ...(g.points ?? []).map((p) => p.en[1])];
    vrai(`${n} : la règle est sous la figure`, ys.every((y) => y > g.regle.y) && Number.isInteger(g.regle.de) && Number.isInteger(g.regle.a));
    for (const p of g.points ?? []) vrai(`${n} : ${p.nom} au-dessus de la règle`, p.en[0] >= g.regle.de && p.en[0] <= g.regle.a);
  }
});

/* ── Le rendu, simulé : la mise en page de geo() refaite ici ─────────────── */
function boites(g) {
  const W = 300, HMAX = 210, m = 26;
  const bas = g.regle ? 34 : 0;
  const reels = [];
  for (const s of g.segs ?? []) reels.push(s.de, s.vers);
  for (const p of g.points ?? []) reels.push(p.en);
  for (const t of g.textes ?? []) reels.push(t.en);
  for (const a of g.arcs ?? []) for (const d of [a.de, a.a]) reels.push([a.centre[0] + a.rayon * Math.cos((d * Math.PI) / 180), a.centre[1] + a.rayon * Math.sin((d * Math.PI) / 180)]);
  if (g.regle) reels.push([g.regle.de, g.regle.y], [g.regle.a, g.regle.y]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m - bas) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m + bas);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - m - bas - (p[1] - y0) * s];
  const res = [];
  const texte = (x, y, t, a, taille, borne = true) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = borne ? Math.min(Math.max(x, 4 + ga), W - 4 - dr) : x;
    const by = borne ? Math.min(Math.max(y, 10), H - 8) : y;
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  const decal = { hd: [7, -10, "start"], hg: [-7, -10, "end"], bd: [7, 12, "start"], bg: [-7, 12, "end"], haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"] };
  if (g.regle) for (let v = g.regle.de; v <= g.regle.a; v++) texte(px([v, g.regle.y])[0], px([v, g.regle.y])[1] + 21, String(v), "middle", 14, false);
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
  const [d, sg, dd] = g.segs;
  const [A, B, C, D, E, F] = ["A", "B", "C", "D", "E", "F"].map((x) => P(g, x));
  const surSeg = (p, s) => aligne(s.de, s.vers, p) && p[0] >= Math.min(s.de[0], s.vers[0]) && p[0] <= Math.max(s.de[0], s.vers[0]);
  vrai("1. tracé 1 : une droite qui dépasse A et B des deux côtés", surSeg(A, d) && surSeg(B, d) && !egal(d.de, A) && !egal(d.vers, B));
  vrai("1. tracé 2 : un segment qui s'arrête en C et D", egal(sg.de, C) && egal(sg.vers, D));
  vrai("1. tracé 3 : une demi-droite qui part de E et dépasse F", egal(dd.de, E) && surSeg(F, dd) && !egal(dd.vers, F));
  dit(1, "Réponse : $1$ : $(AB)$ ; $2$ : $[CD]$ ; $3$ : $[EF)$.");
});
essai("2", () => {
  const g = g1(2, "schema");
  verif("2. le schéma : AB = 6", dist(P(g, "A"), P(g, "B")), 6);
  dit(2, "Réponse : a) $AB$ ; b) $[AB]$ ; c) $(AB)$ ; d) $AB = 6$ cm.");
});
essai("3", () => {
  const g = g1(3, "figure");
  const [p, q] = [P(g, "P")[0], P(g, "Q")[0]];
  dit(3, `$P$ est sur $${tx(p)}$, et $Q$ est sur $${tx(q)}$`);
  dit(3, `$${tx(q)} - ${tx(p)} = ${tx(q - p)}$`);
  dit(3, `Réponse : $PQ = ${tx(q - p)}$ cm.`);
  vrai("3. le piège : P n'est pas sur le 0", p !== 0);
});
essai("4", () => {
  const rs = lu(4, "RS");
  dit(4, `$${tx(rs)} \\div 2 = ${tx(rs / 2)}$`);
  dit(4, `Réponse : $RM = ${tx(rs / 2)}$ cm.`);
  dit(4, `$${tx(2 * rs)}$ cm, le double`);
});
essai("5", () => {
  const tk = lu(5, "TK");
  dit(5, `$TU = ${tx(tk)} + ${tx(tk)} = ${tx(2 * tk)}$`);
  dit(5, `Réponse : $TU = ${tx(2 * tk)}$ cm.`);
});
essai("6", () => {
  const g = g1(6, "figure");
  const [a, b] = [P(g, "G")[0], P(g, "H")[0]];
  dit(6, `$GH = ${tx(b)} - ${tx(a)} = ${tx(b - a)}$ cm`);
  dit(6, `$${tx(b - a)} \\div 2 = ${tx((b - a) / 2)}$ cm`);
  dit(6, `$${tx(a)} + ${tx((b - a) / 2)} = ${tx((a + b) / 2)}$`);
  dit(6, `Réponse : $I$ est sur la graduation $${tx((a + b) / 2)}$.`);
  dit(6, `placer $I$ sur $${tx(b / 2)}$, la moitié de $${tx(b)}$`);
  vrai("6. le schéma place I", egal(P(g1(6, "schema"), "I"), milieu(P(g, "G"), P(g, "H"))));
});
essai("7", () => {
  const g = g1(7, "figure");
  const chemins = {};
  for (const s of g.segs) chemins[s.couleur] = (chemins[s.couleur] ?? 0) + dist(s.de, s.vers);
  const court = Object.entries(chemins).sort((a, b) => a[1] - b[1])[0][0];
  const nom = g.textes.find((t) => t.couleur === court).t;
  vrai("7. le plus court est le chemin tout droit", court === BLEU && Math.abs(chemins[BLEU] - dist(P(g, "A"), P(g, "B"))) < EPS);
  dit(7, `Réponse : le chemin $${nom}$, le segment $[AB]$.`);
  dit(7, `Le chemin $${nom}$ va tout droit`);
});
essai("8", () => {
  const [ac, cb] = [lu(8, "AC"), lu(8, "CB")];
  dit(8, `$${tx(ac)} + ${tx(cb)} = ${tx(ac + cb)}$ cm`);
  dit(8, `Réponse : a) non ; b) $${tx(ac + cb)}$ cm ; c) sur le segment $[AB]$.`);
  vrai("8. 9 cm dépasse AC + CB", 9 > ac + cb);
  const [g1a, g1b] = geos(8, "schema");
  vrai("8. schéma 1 : C sur [AB], AB = 7", aligne(P(g1a, "A"), P(g1a, "B"), P(g1a, "C")) && Math.abs(dist(P(g1a, "A"), P(g1a, "B")) - 7) < EPS);
  vrai("8. schéma 2 : C hors de [AB], AB < 7", !aligne(P(g1b, "A"), P(g1b, "B"), P(g1b, "C")) && dist(P(g1b, "A"), P(g1b, "B")) < 7);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = g1(9, "schema");
  const [A, B, I, J, M] = ["A", "B", "I", "J", "M"].map((x) => P(g, x));
  const r = g.arcs[0].rayon;
  vrai("9. même écartement pour les quatre arcs, plus que la moitié de [AB]", g.arcs.every((a) => a.rayon === r) && r > dist(A, B) / 2);
  for (const X of [I, J]) vrai("9. I et J à la distance r de A et de B", Math.abs(dist(A, X) - r) < 0.005 && Math.abs(dist(B, X) - r) < 0.005);
  // Chaque croisement est sur un arc de A ET un arc de B.
  const surArc = (X, a) => {
    if (!egal(a.centre, A) && !egal(a.centre, B)) return false;
    let t = (Math.atan2(X[1] - a.centre[1], X[0] - a.centre[0]) * 180) / Math.PI;
    const [lo, hi] = [Math.min(a.de, a.a), Math.max(a.de, a.a)];
    for (const k of [-360, 0, 360]) if (t + k >= lo && t + k <= hi) return true;
    return false;
  };
  for (const X of [I, J]) vrai("9. le croisement est sur un arc de A et un arc de B", g.arcs.some((a) => egal(a.centre, A) && surArc(X, a)) && g.arcs.some((a) => egal(a.centre, B) && surArc(X, a)));
  vrai("9. M est le milieu, sur (IJ)", egal(M, milieu(A, B)) && aligne(I, J, M));
});
essai("10", () => {
  const g = g1(10, "figure");
  const [A, B, O] = ["A", "B", "O"].map((x) => P(g, x));
  vrai("10. OA = OB, mais O n'est pas sur [AB]", Math.abs(dist(O, A) - dist(O, B)) < EPS && !aligne(A, B, O));
  const ab = lu(10, "AB");
  dit(10, `$AM = ${tx(ab)} \\div 2 = ${tx(ab / 2)}$ cm`);
  vrai("10. le schéma place M au milieu", egal(P(g1(10, "schema"), "M"), milieu(A, B)));
});
essai("11", () => {
  const [ef, fg] = [lu(11, "EF"), lu(11, "FG")];
  dit(11, `$EF + FG = ${tx(ef)} + ${tx(fg)} = ${tx(ef + fg)}$ cm`);
  const cas = [...e(11).matchAll(/\$EG = ([\d{},]+)\$ cm/g)].map((m) => nb(m[1]));
  vrai("11. a) égalité, b) plus court", cas[0] === ef + fg && cas[1] < ef + fg);
  dit(11, "Réponse : a) oui ; b) non.");
});
essai("12", () => {
  const ab = nb(e(12).match(/de \$(\d+)\$ cm/)[1]);
  const an = lu(12, "AN");
  const am = ab / 2;
  dit(12, `$AM = ${tx(ab)} \\div 2 = ${tx(am)}$ cm`);
  dit(12, `$NM = AM - AN = ${tx(am)} - ${tx(an)} = ${tx(am - an)}$ cm`);
  dit(12, `$NB = AB - AN = ${tx(ab)} - ${tx(an)} = ${tx(ab - an)}$ cm`);
  dit(12, `$AN + NM + MB = ${tx(an)} + ${tx(am - an)} + ${tx(am)} = ${tx(ab)}$ cm`);
});
essai("13", () => {
  const ab = lu(13, "AB");
  const am = ab / 2, an = am / 2, np = an / 2;
  dit(13, `$AM = ${tx(ab)} \\div 2 = ${tx(am)}$ cm`);
  dit(13, `$AN = ${tx(am)} \\div 2 = ${tx(an)}$ cm`);
  dit(13, `$NP = ${tx(an)} \\div 2 = ${tx(np)}$ cm`);
  dit(13, `$AP = AN + NP = ${tx(an)} + ${tx(np)} = ${tx(an + np)}$ cm`);
  dit(13, `$PB = AB - AP = ${tx(ab)} - ${tx(an + np)} = ${tx(ab - an - np)}$ cm`);
  const g = g1(13, "figure");
  const [A, N, Pp, M, B] = ["A", "N", "P", "M", "B"].map((x) => P(g, x));
  vrai("13. la figure : M, N, P aux bons milieux", egal(M, milieu(A, B)) && egal(N, milieu(A, M)) && egal(Pp, milieu(N, M)) && Math.abs(dist(A, B) - ab) < EPS);
});
essai("14", () => {
  const [ar, rb, ab] = [lu(14, "AR"), lu(14, "RB"), lu(14, "AB")];
  dit(14, `$${tx(ar)} + ${tx(rb)} = ${tx(ar + rb)}$ km`);
  dit(14, `$${tx(ar + rb)} - ${tx(ab)} = ${tx(ar + rb - ab)}$ km`);
  vrai("14. le refuge n'est pas sur [AB]", ar + rb > ab);
});
essai("15", () => {
  const [ab, bc] = [lu(15, "AB"), lu(15, "BC")];
  dit(15, `$AC = ${tx(ab)} + ${tx(bc)} = ${tx(ab + bc)}$ cm`);
  const g = g1(15, "schema");
  const [A, C, D] = ["A", "C", "D"].map((x) => P(g, x));
  vrai("15. le schéma : D hors de (AC), AD + DC > AC", !aligne(A, C, D) && dist(A, D) + dist(D, C) > dist(A, C));
});
essai("16", () => {
  const g = g1(16, "figure");
  const [a, m] = [P(g, "A")[0], P(g, "M")[0]];
  const b = 2 * m - a;
  dit(16, `$AM = ${tx(m)} - ${tx(a)} = ${tx(m - a)}$ cm`);
  dit(16, `$${tx(m)} + ${tx(m - a)} = ${tx(b)}$`);
  dit(16, `$AB = ${tx(m - a)} + ${tx(m - a)} = ${tx(b - a)}$ cm`);
  dit(16, `Réponse : $B$ sur la graduation $${tx(b)}$ ; $AB = ${tx(b - a)}$ cm.`);
  dit(16, `placer $B$ sur $${tx(2 * m)}$, le double de $${tx(m)}$`);
  vrai("16. le schéma place B", egal(P(g1(16, "schema"), "B"), [b, P(g, "A")[1]]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = g1(17, "figure");
  const [E, C, S] = ["E", "C", "S"].map((x) => P(g, x));
  const [ec, cs, es] = [dist(E, C), dist(C, S), dist(E, S)];
  dit(17, `$${ec} + ${cs} = ${ec + cs}$ m`);
  vrai("17. le raccourci est plus court, et mesure bien 500 m sur le plan", es < ec + cs && Math.abs(es - 500) < EPS);
  dit(17, `$90 + ${cs} = ${90 + cs}$ m`);
  vrai("17. 90 m est impossible : 90 + 300 < 400", 90 + cs < ec);
  dit(17, `$${ec} - ${cs} = ${ec - cs}$ m`);
  dit(17, `$${ec + cs} - ${es} = ${ec + cs - es}$ m gagnés`);
});
essai("18", () => {
  const [a, b, c] = [lu(18, "S_1S_2"), lu(18, "S_2S_3"), lu(18, "S_1S_3")];
  vrai("18. S1S2 + S2S3 = S1S3", Math.abs(a + b - c) < EPS);
  dit(18, `$${tx(a)} + ${tx(b)} = ${tx(c)}$ km`);
  dit(18, `$S_1S_4 = ${tx(c)} \\div 2 = ${tx(c / 2)}$ km`);
  dit(18, `$S_2S_4 = ${tx(c / 2)} - ${tx(a)} = ${tx(c / 2 - a)}$ km, soit $${Math.round((c / 2 - a) * 1000)}$ m`);
  const g = g1(18, "schema");
  vrai("18. le schéma place S4 au milieu", egal(P(g, "S4"), milieu(P(g, "S1"), P(g, "S3"))));
});
essai("19", () => {
  const L = nb(e(19).match(/soit \$(\d+)\$ cm/)[1]);
  dit(19, `$${L} \\div 2 = ${L / 2}$ cm`);
  dit(19, `à $${L / 4}$ cm et à $${(3 * L) / 4}$ cm`);
  dit(19, `$${L} \\div 4 = ${L / 4}$ cm chacun`);
  dit(19, `$8$ morceaux de $${L} \\div 8 = ${tx(L / 8)}$ cm`);
  const g = g1(19, "schema");
  const marques = g.points.filter((p) => /^\d+$/.test(p.nom));
  vrai("19. le schéma : 3 marques, chacune à sa graduation", marques.length === 3 && marques.every((p) => p.en[0] === Number(p.nom)));
});
essai("20", () => {
  const ech = nb(e(20).match(/représente \$(\d+)\$ m/)[1]);
  const pa = nb(e(20).match(/à \$(\d+)\$ cm l'un de l'autre/)[1]);
  const [pr, ra] = [...e(20).matchAll(/à \$(\d+)\$ cm de \$[PA]\$/g)].map((m) => nb(m[1]));
  dit(20, `$PT = ${pa} \\div 2 = ${tx(pa / 2)}$ cm`);
  dit(20, `$${tx(pa / 2)} \\times ${ech} = ${(pa / 2) * ech}$ m`);
  dit(20, `$PR + RA = ${pr} + ${ra} = ${pr + ra}$ cm`);
  vrai("20. R est sur [PA]", pr + ra === pa);
  dit(20, `$RT = PT - PR = ${tx(pa / 2)} - ${pr} = ${tx(pa / 2 - pr)}$ cm`);
  dit(20, `$${tx(pa / 2 - pr)} \\times ${ech} = ${(pa / 2 - pr) * ech}$ m`);
  const g = g1(20, "schema");
  vrai("20. le schéma place T au milieu et R à 2 cm", egal(P(g, "T"), milieu(P(g, "P"), P(g, "A"))) && dist(P(g, "P"), P(g, "R")) === pr);
});

f.fin();
