// Recalcul indépendant de la feuille « La symétrie axiale » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-sym-axiale.tsx.
//
// ⭐ Chaque `grille(…)` est relue dans le source : le script calcule lui-même
// l'image de chaque point par l'axe (réflexion), vérifie chaque couple
// (X, X') dessiné, que la figure orange est l'image de la bleue, chaque codage
// (traits égaux, angle droit), compte les axes des figures en testant les
// plis, puis cherche dans le corrigé les distances en carreaux qu'il a
// comptées. Les nombres de l'énoncé sont relus dans le texte.
// ⭐ Le RENDU est simulé : la mise en page de `grille()` est refaite ici, aucune
// étiquette ne doit sortir du cadre, en chevaucher une autre ou couvrir un point.
// ⭐ LA LECTURE (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») : chaque
// phrase des énoncés, corrigés et rappels compte 20 mots au plus, 13 en moyenne.
// Usage : node scripts/verifier-exercices-6e-sym-axiale.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-sym-axiale.tsx", "sym_axiale", ["grille"], "6e");
const { c, e, vrai, verif, dit, enonceDit, dessins, essai, appels } = f;
const { BLEU, ORANGE } = f.constantes;

/* ── Outils ──────────────────────────────────────────────────────────────── */
const EPS = 1e-6;
const egal = (p, q, eps = EPS) => Math.abs(p[0] - q[0]) < eps && Math.abs(p[1] - q[1]) < eps;
const milieu = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
/** L'image de p par la symétrie d'axe la droite (a, b). */
const reflet = (p, [a, b]) => {
  const d = [b[0] - a[0], b[1] - a[1]];
  const t = ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2);
  const h = [a[0] + t * d[0], a[1] + t * d[1]];
  return [2 * h[0] - p[0], 2 * h[1] - p[1]];
};
/** Distance d'un point à la droite (a, b). */
const aLAxe = (p, [a, b]) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / dist(a, b);
const cle = (p) => `${p[0].toFixed(4)};${p[1].toFixed(4)}`;
const memeEnsemble = (a, b) => JSON.stringify([...new Set(a.map(cle))].sort()) === JSON.stringify([...new Set(b.map(cle))].sort());
/** Les segments d'une ligne (fermée sauf `ouvert`), chacun écrit dans un ordre fixe. */
const segments = (l) => {
  const n = l.pts.length;
  const res = [];
  const ferme = n > 2 && !l.ouvert;
  for (let i = 0; i < (ferme ? n : n - 1); i++) res.push([cle(l.pts[i]), cle(l.pts[(i + 1) % n])].sort().join("|"));
  return res;
};
const segsDe = (lignes) => [...new Set(lignes.flatMap(segments))].sort();
/** La figure (ensemble de segments) est-elle sa propre image par l'axe ? */
const invariante = (lignes, axe) => JSON.stringify(segsDe(lignes)) === JSON.stringify(segsDe(lignes.map((l) => ({ ...l, pts: l.pts.map((p) => reflet(p, axe)) }))));
const boite = (lignes) => {
  const pts = lignes.flatMap((l) => l.pts);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
};
/** Les quatre plis candidats par le centre de la boîte : vertical, horizontal, deux diagonales. */
const plis = (b) => {
  const O = [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2];
  return [[O, [O[0], O[1] + 1]], [O, [O[0] + 1, O[1]]], [O, [O[0] + 1, O[1] + 1]], [O, [O[0] + 1, O[1] - 1]]];
};
const nbAxes = (lignes) => plis(boite(lignes)).filter((a) => invariante(lignes, a)).length;
/** Aire d'un polygone (formule des lacets). */
const aire = (pts) => Math.abs(pts.reduce((s, p, i) => s + p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1], 0)) / 2;
/** Un nombre comme la feuille l'écrit : 1{,}5. */
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");

const lire = (a) => ({ taille: a[0], lignes: a[1], points: a[2] ?? [], extras: a[3] ?? {} });
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
const axe0 = (g) => {
  const a = (g.extras.axes ?? []).find((x) => !x.pointilles);
  if (!a) throw new Error("pas d'axe plein");
  return [a.de, a.vers];
};

/* ── Contrôles de TOUTES les grilles ─────────────────────────────────────── */
const toutes = [];
f.feuille.blocs.forEach((_, i) => dessins("grille", i + 1).forEach((d) => toutes.push({ k: i + 1, role: d.role, g: lire(d.args) })));
vrai(`${toutes.length} grilles relues, autant que d'appels`, toutes.length === appels("grille").length);
toutes.forEach(({ k, role, g }) => {
  const n = `${k} (${role})`;
  const [w, h] = g.taille;
  const dedans = (p, strict) => (strict ? p[0] > 0 && p[0] < w && p[1] > 0 && p[1] < h : p[0] >= 0 && p[0] <= w && p[1] >= 0 && p[1] <= h);
  for (const p of g.points) vrai(`${n} : ${p.nom || "point"} strictement dans le cadre`, dedans(p.en, true));
  for (const l of g.lignes) vrai(`${n} : les lignes restent dans le cadre`, l.pts.every((p) => dedans(p, false)));
  for (const a of g.extras.axes ?? []) vrai(`${n} : l'axe reste dans le cadre`, dedans(a.de, false) && dedans(a.vers, false));
  // Les codages : mêmes traits, mêmes longueurs ; angle droit vraiment droit.
  const parN = {};
  for (const cd of g.extras.codes ?? []) (parN[cd.n] ??= []).push(dist(cd.de, cd.vers));
  for (const [nb, ls] of Object.entries(parN)) vrai(`${n} : les segments codés ${nb} trait(s) sont égaux`, ls.every((l) => Math.abs(l - ls[0]) < 0.01), ls.map((l) => l.toFixed(3)).join(" / "));
  for (const d of g.extras.droits ?? []) vrai(`${n} : l'angle droit codé est droit`, Math.abs((d.a[0] - d.en[0]) * (d.b[0] - d.en[0]) + (d.a[1] - d.en[1]) * (d.b[1] - d.en[1])) < 0.01);
  if (!(g.extras.axes ?? []).some((a) => !a.pointilles) || (k === 11 && role === "figure")) return;
  const axe = axe0(g);
  // Chaque couple (X, X') dessiné : X' est l'image de X.
  for (const p of g.points) {
    const image = g.points.find((q) => q.nom === `${p.nom}'`);
    if (p.nom && image) vrai(`${n} : ${p.nom}' est l'image de ${p.nom}`, egal(reflet(p.en, axe), image.en, 0.01));
  }
  // La figure orange est l'image de la bleue.
  const bleues = g.lignes.filter((l) => (l.couleur ?? BLEU) === BLEU);
  const oranges = g.lignes.filter((l) => l.couleur === ORANGE);
  if (bleues.length === 1 && oranges.length === 1) vrai(`${n} : la figure orange est l'image de la bleue`, memeEnsemble(bleues[0].pts.map((p) => reflet(p, axe)), oranges[0].pts));
});

/* ── Le rendu, simulé : la mise en page de grille() refaite ici ──────────── */
function boites(g) {
  const [w, h] = g.taille;
  const W = 300, M = 10;
  const u = Math.min((W - 2 * M) / w, (W - 2 * M) / h);
  const H = Math.round(h * u + 2 * M);
  const ox = (W - w * u) / 2;
  const px = (p) => [ox + p[0] * u, M + (h - p[1]) * u];
  const res = [];
  const texte = (x, y, t, a, taille) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  const decal = { hd: [7, -10, "start"], hg: [-7, -10, "end"], bd: [7, 12, "start"], bg: [-7, 12, "end"], haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"] };
  for (const p of g.points) {
    if (!p.nom) continue;
    const [x, y] = px(p.en);
    const [dx, dy, a] = decal[p.vers ?? "hd"];
    texte(x + dx, y + dy, p.nom, a, 15);
  }
  for (const a of g.extras.axes ?? []) if (a.nom && a.ou) texte(...px(a.ou), a.nom, "middle", 15);
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
  for (const b of res)
    for (const p of g.points) {
      const [x, y] = px(p.en);
      vrai(`${n} : l'étiquette « ${b.t} » ne couvre pas le point ${p.nom || "(sans nom)"}`, !(x > b.x0 + 1 && x < b.x1 - 1 && y > b.y0 + 1 && y < b.y1 - 1));
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
  const axe = axe0(g);
  const [F, ...candidats] = g.lignes;
  const image = F.pts.map((p) => reflet(p, axe));
  const centre = (l) => [l.pts.reduce((s, p) => s + p[0], 0) / l.pts.length, l.pts.reduce((s, p) => s + p[1], 0) / l.pts.length];
  const nomDe = (l) => {
    const [cx, cy] = centre(l);
    return g.extras.textes.reduce((m, t) => (dist(t.en, [cx, cy]) < dist(m.en, [cx, cy]) ? t : m)).t;
  };
  const bons = candidats.filter((l) => memeEnsemble(l.pts, image));
  vrai("1. une seule figure est l'image", bons.length === 1);
  const glisse = candidats.find((l) => memeEnsemble(l.pts, F.pts.map(([x, y]) => [x + 5, y - 5])));
  const autrePli = candidats.find((l) => memeEnsemble(l.pts, F.pts.map((p) => reflet(p, [[0, 5], [10, 5]]))));
  vrai("1. les deux autres : un glissement et un pli horizontal", !!glisse && !!autrePli);
  dit(1, `Réponse : la figure $${nomDe(bons[0])}$.`);
  dit(1, `La figure $${nomDe(glisse)}$ a seulement glissé`);
  dit(1, `La figure $${nomDe(autrePli)}$ est retournée, mais par un pli horizontal`);
  const coin = F.pts.reduce((m, p) => (p[1] < m[1] || (p[1] === m[1] && p[0] < m[0]) ? p : m));
  dit(1, `Le coin en bas à gauche de $F$ est à $${aLAxe(coin, axe)}$ carreaux à gauche de $(d)$`);
  vrai("1. l'image du coin est un coin de la bonne figure", bons[0].pts.some((p) => egal(p, reflet(coin, axe))));
});
essai("2", () => {
  const g = g1(2, "figure");
  const axe = axe0(g);
  const [A, B, C] = ["A", "B", "C"].map((x) => P(g, x));
  vrai("2. A à gauche, B à droite, C sur l'axe", A[0] < 5 && B[0] > 5 && aLAxe(C, axe) === 0);
  dit(2, `$A$ est à $${aLAxe(A, axe)}$ carreaux à gauche de $(d)$. Je place $A'$ à $${aLAxe(A, axe)}$ carreaux à droite.`);
  dit(2, `$B$ est à $${aLAxe(B, axe)}$ carreaux à droite de $(d)$. Je place $B'$ à $${aLAxe(B, axe)}$ carreaux à gauche.`);
  dit(2, "$C' = C$");
});
essai("3", () => {
  const g = g1(3, "schema");
  const axe = axe0(g);
  vrai("3. H milieu de [AA'], sur l'axe", egal(milieu(P(g, "A"), P(g, "A'")), P(g, "H")) && aLAxe(P(g, "H"), axe) < EPS);
  vrai("3. M sur l'axe", aLAxe(P(g, "M"), axe) < EPS);
  dit(3, "Réponse : a) faux ; b) vrai ; c) vrai ; d) vrai ; e) faux.");
});
essai("4", () => {
  const g = g1(4, "figure");
  const axe = axe0(g);
  const [E, F] = ["E", "F"].map((x) => P(g, x));
  dit(4, `$E$ est à $${aLAxe(E, axe)}$ carreaux à gauche de $(d)$ : $E'$ est à $${aLAxe(E, axe)}$ carreaux à droite`);
  dit(4, `$F$ est à $${aLAxe(F, axe)}$ carreaux à gauche de $(d)$ : $F'$ est à $${aLAxe(F, axe)}$ carreaux à droite`);
  const [E2, F2] = [reflet(E, axe), reflet(F, axe)];
  vrai("4. [EF] penche vers la droite, [E'F'] vers la gauche", (F[0] - E[0]) * (F[1] - E[1]) > 0 && (F2[0] - E2[0]) * (F2[1] - E2[1]) < 0);
  verif("4. E'F' = EF", dist(E2, F2), dist(E, F));
});
essai("5", () => {
  const g = g1(5, "figure");
  const axe = axe0(g);
  vrai("5. l'axe est horizontal", axe[0][1] === axe[1][1]);
  const [R, S, T] = ["R", "S", "T"].map((x) => P(g, x));
  dit(5, `$R$ est à $${aLAxe(R, axe)}$ carreaux au-dessus de $(d)$ : $R'$ est à $${aLAxe(R, axe)}$ carreaux en dessous.`);
  vrai("5. S est sur l'axe", aLAxe(S, axe) === 0);
  dit(5, `$T$ est à $${aLAxe(T, axe)}$ carreaux au-dessus de $(d)$ : $T'$ est à $${aLAxe(T, axe)}$ carreaux en dessous.`);
});
essai("6", () => {
  const g = g1(6, "schema");
  vrai("6. M milieu de [BC], M' milieu de [B'C']", egal(milieu(P(g, "B"), P(g, "C")), P(g, "M")) && egal(milieu(P(g, "B'"), P(g, "C'")), P(g, "M'")));
  const ab = e(6).match(/\$AB = ([\d{},]+)\$ cm/)[1], ang = e(6).match(/= (\d+)°\$/)[1], ai = e(6).match(/est \$(\d+)\$ cm²/)[1];
  dit(6, `$A'B' = AB = ${ab}$ cm`);
  dit(6, `= ${ang}°$`);
  dit(6, `Réponse : a) $${ab}$ cm ; b) $${ang}°$ ; c) $${ai}$ cm² ; d) le milieu de $[B'C']$.`);
});
essai("7", () => {
  const g = g1(7, "schema");
  const n = g.lignes.map((l) => nbAxes([l]));
  vrai(`7. losange 2, segment 2, triangle 1 (${n})`, JSON.stringify(n) === "[2,2,1]");
  // Les axes dessinés : chacun est un pli de sa figure, et il y en a autant que de plis.
  const dessines = g.lignes.map((l) => {
    const b = boite([l]);
    return (g.extras.axes ?? []).filter((a) => [a.de, a.vers].every((p) => p[0] >= b.x0 - 3 && p[0] <= b.x1 + 3) && Math.abs(milieu(a.de, a.vers)[0] - (b.x0 + b.x1) / 2) < 3);
  });
  dessines.forEach((as, i) => vrai(`7. figure ${i + 1} : ${as.length} axe(s) dessiné(s), tous des plis`, as.length === n[i] && as.every((a) => invariante([g.lignes[i]], [a.de, a.vers]))));
  dit(7, `Réponse : a) $${n[0]}$ ; b) $${n[1]}$ ; c) $${n[2]}$.`);
});
essai("8", () => {
  enonceDit(8, "$AH = 2{,}5$ cm");
  dit(8, `$AA' = 2{,}5 + 2{,}5 = ${tx(2.5 + 2.5)}$ cm`);
  const g = g1(8, "schema");
  vrai("8. le schéma : H milieu de [AA'] sur l'axe", egal(milieu(P(g, "A"), P(g, "A'")), P(g, "H")) && aLAxe(P(g, "H"), axe0(g)) < EPS);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = g1(9, "figure");
  const axe = axe0(g);
  const pas = { A: "1", B: "2", C: "3" };
  for (const x of ["A", "B", "C"]) {
    const p = P(g, x);
    const n = aLAxe(p, axe) / Math.SQRT2; // un pas = une diagonale de carreau
    const im = reflet(p, axe);
    vrai(`9. ${x} : ${pas[x]} pas jusqu'à l'axe`, Math.abs(n - Number(pas[x])) < EPS);
    dit(9, `$${x}'$ est à $${im[0] - p[0]}$ carreaux à droite et $${p[1] - im[1]}$ en bas de $${x}$`);
  }
  dit(9, "De $A$, il faut $1$ pas");
  dit(9, "De $B$, il faut $2$ pas");
  dit(9, "De $C$, il faut $3$ pas");
});
essai("10", () => {
  const g = g1(10, "figure");
  const axe = axe0(g);
  const [chalet] = g.lignes;
  const ys = chalet.pts.map((p) => p[1]);
  dit(10, `Le bas du chalet est à $${Math.min(...ys) - 5}$ carreau au-dessus de $(d)$`);
  dit(10, `Le haut des murs est à $${chalet.pts[2][1] - 5}$ carreaux au-dessus`);
  dit(10, `$T$ est à $${aLAxe(P(g, "T"), axe)}$ carreaux au-dessus : $T'$ est à $${aLAxe(P(g, "T"), axe)}$ carreaux en dessous.`);
  const b = boite([chalet]);
  enonceDit(10, `Le chalet mesure $${b.x1 - b.x0}$ carreaux de large`);
  dit(10, `c) $${b.x1 - b.x0}$ carreaux.`);
  const s = g1(10, "schema");
  const reflet2 = s.lignes[1];
  vrai("10. le toit du reflet est en bas", reflet(P(g, "T"), axe)[1] === Math.min(...reflet2.pts.map((p) => p[1])));
});
essai("11", () => {
  const g = g1(11, "figure");
  const axe = axe0(g);
  const faux = ["A", "B", "C", "D"].filter((x) => !egal(reflet(P(g, x), axe), P(g, `${x}'`)));
  vrai(`11. un seul point faux (${faux})`, faux.length === 1);
  const x = faux[0];
  dit(11, `$${x}$ : $${aLAxe(P(g, x), axe)}$ carreaux à gauche ; mais $${x}'$ est à $${aLAxe(P(g, `${x}'`), axe)}$ carreaux à droite. Faux.`);
  for (const y of ["A", "B", "C"]) dit(11, `$${y}$ : $${aLAxe(P(g, y), axe)}$ carreau`);
  dit(11, `Réponse : a) $${x}'$ ; b) à $${aLAxe(P(g, x), axe)}$ carreaux à droite de $(d)$`);
  vrai("11. le schéma le corrige", egal(P(g1(11, "schema"), `${x}'`), reflet(P(g, x), axe)));
});
essai("12", () => {
  const g = g1(12, "figure");
  const lettre = (x0, x1) => g.lignes.filter((l) => l.pts.every((p) => p[0] >= x0 && p[0] <= x1));
  const n = [[0, 5], [5, 10], [10, 15], [15, 20]].map(([a, b]) => nbAxes(lettre(a, b)));
  vrai(`12. M 1, E 1, H 2, Z 0 (${n})`, JSON.stringify(n) === "[1,1,2,0]");
  dit(12, `Réponse : M : $${n[0]}$ ; E : $${n[1]}$ ; H : $${n[2]}$ ; Z : $${n[3]}$.`);
  const s = g1(12, "schema");
  vrai("12. le schéma dessine chaque axe, et seulement eux", s.extras.axes.length === n.reduce((a, b) => a + b, 0) && s.extras.axes.every((a) => [[0, 5], [5, 10], [10, 15]].some(([x0, x1]) => invariante(lettre(x0, x1), [a.de, a.vers]))));
});
essai("13", () => {
  const g = g1(13, "schema");
  const [A, B, C, M] = ["A", "B", "C", "M"].map((x) => P(g, x));
  const lu = (x) => Number(e(13).match(new RegExp(`\\$${x} = ([\\d{},]+)\\$`))[1].replace("{,}", "."));
  const [ab, bc, ac] = [lu("AB"), lu("BC"), lu("AC")];
  vrai("13. le schéma a les longueurs de l'énoncé", Math.abs(dist(A, B) - ab) < 0.02 && Math.abs(dist(B, C) - bc) < 0.02 && Math.abs(dist(A, C) - ac) < 0.02);
  dit(13, `$${tx(ab)} + ${tx(bc)} + ${tx(ac)} = ${tx(ab + bc + ac)}$ cm`);
  vrai("13. M sur [BC] à 2 de B, M' à 2 de B'", Math.abs(dist(B, M) - 2) < EPS && Math.abs(dist(P(g, "B'"), P(g, "M'")) - 2) < EPS);
  dit(13, "$B'M' = BM = 2$ cm");
});
essai("14", () => {
  const g = g1(14, "figure");
  const axe = axe0(g);
  const [demi] = g.lignes;
  const loin = Math.max(...demi.pts.map((p) => aLAxe(p, axe)));
  dit(14, `Le coin le plus à gauche est à $${loin}$ carreaux de $(d)$`);
  dit(14, `$${loin} + ${loin} = ${2 * loin}$ carreaux`);
  vrai("14. les deux bouts sont sur l'axe", aLAxe(demi.pts[0], axe) === 0 && aLAxe(demi.pts.at(-1), axe) === 0);
  const s = g1(14, "schema");
  vrai("14. le sapin complété a (d) pour axe", invariante(s.lignes, axe));
  dit(14, `il mesure $${2 * loin}$ carreaux au plus large`);
});
essai("15", () => {
  const g = g1(15, "figure");
  const xs = ["A", "B", "C"].map((x) => milieu(P(g, x), P(g, `${x}'`)));
  vrai("15. un même axe vertical pour les trois couples", xs.every((m) => Math.abs(m[0] - xs[0][0]) < EPS) && ["A", "B", "C"].every((x) => P(g, x)[1] === P(g, `${x}'`)[1]));
  const bb = P(g, "B'")[0] - P(g, "B")[0], cc = P(g, "C'")[0] - P(g, "C")[0];
  dit(15, `De $B$ à $B'$ : $${bb}$ carreaux vers la droite. La moitié : $${tx(bb / 2)}$ carreau.`);
  dit(15, `de $C$ à $C'$, $${cc}$ carreaux. La moitié : $${tx(cc / 2)}$ carreaux.`);
  const s = g1(15, "schema");
  vrai("15. le schéma trace cet axe", axe0(s)[0][0] === xs[0][0] && axe0(s)[1][0] === xs[0][0]);
  vrai("15. l'axe n'est pas sur une ligne du quadrillage", !Number.isInteger(xs[0][0]));
});
essai("16", () => {
  const g = g1(16, "schema");
  const axe = axe0(g);
  const [A, H, A2] = ["A", "H", "A'"].map((x) => P(g, x));
  enonceDit(16, "$3{,}2$ cm de $(d)$");
  vrai("16. le schéma : AH = 3,2, H sur l'axe, [AH] perpendiculaire", Math.abs(dist(A, H) - 3.2) < 0.005 && aLAxe(H, axe) < 0.005 && Math.abs(aLAxe(A, axe) - 3.2) < 0.005);
  vrai("16. A' est l'image de A", egal(reflet(A, axe), A2, 0.01));
  dit(16, `$AA' = AH + HA' = 3{,}2 + 3{,}2 = ${tx(6.4)}$ cm`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = g1(17, "figure");
  const axe = axe0(g);
  const [demi] = g.lignes;
  const a = aire(demi.pts); // le polygone se ferme le long de l'axe
  verif("17. la moitié : 16 carreaux", a, 16);
  dit(17, `Total : $12 + 4 = ${a}$ carreaux.`);
  dit(17, `$${a} + ${a} = ${2 * a}$ carreaux, soit $${2 * a}$ cm²`);
  const cotes = demi.pts.slice(1).map((p, i) => dist(demi.pts[i], p));
  vrai("17. 7 côtés de 2 cm hors de l'axe", cotes.length === 7 && cotes.every((l) => l === 2));
  const per = cotes.reduce((s, l) => s + l, 0);
  dit(17, `$7$ côtés de $2$ cm, soit $${per}$ cm`);
  dit(17, `$${per} + ${per} = ${2 * per}$ cm`);
  const s = g1(17, "schema");
  const entier = [{ pts: [...demi.pts, ...s.lignes[1].pts.slice(1, -1).reverse()] }];
  vrai("17. le logo entier a 2 axes", nbAxes(entier) === 2);
  vrai("17. le logo complété est l'image de la moitié", memeEnsemble(s.lignes[1].pts, demi.pts.map((p) => reflet(p, axe))));
});
essai("18", () => {
  const g = g1(18, "figure");
  const axe = axe0(g);
  const [A, B] = ["A", "B"].map((x) => P(g, x));
  const B2 = reflet(B, axe);
  dit(18, `$B$ est à $${aLAxe(B, axe)}$ carreaux au-dessus de la bande : $B'$ est à $${aLAxe(B, axe)}$ carreaux en dessous`);
  // I : là où [AB'] coupe la bande (y = 3).
  const yb = axe[0][1];
  const t = (A[1] - yb) / (A[1] - B2[1]);
  const I = [A[0] + t * (B2[0] - A[0]), yb];
  vrai("18. [AB'] descend d'un carreau par carreau", B2[0] - A[0] === A[1] - B2[1]);
  dit(18, `$A$ est à $${aLAxe(A, axe)}$ carreaux au-dessus de la bande`);
  dit(18, `$I$ est sur la bande, à $${I[0] - A[0]}$ carreaux à droite de la colonne de $A$.`);
  const s = g1(18, "schema");
  vrai("18. le schéma place I", egal(P(s, "I"), I));
  verif("18. IB = IB'", dist(I, B), dist(I, B2));
  verif("18. AI + IB = AB'", dist(A, I) + dist(I, B), dist(A, B2));
  vrai("18. viser à mi-chemin serait faux", Math.abs((A[0] + B[0]) / 2 - I[0]) > 0.5);
});
essai("19", () => {
  const g = g1(19, "figure");
  const objets = [...g.lignes.map((l) => ({ type: "p", pts: l.pts, fond: l.fond })), ...(g.extras.cercles ?? []).map((ci) => ({ type: "c", pts: [ci.centre], r: ci.rayon, fond: ci.fond }))];
  const signature = (o) => `${o.type}|${o.fond}|${o.r ?? ""}|${[...new Set(o.pts.map(cle))].sort().join(" ")}`;
  const drapeau = (x0, x1) => objets.filter((o) => o.pts.every((p) => p[0] >= x0 && p[0] <= x1));
  const axes = (os) => {
    const b = boite(os.filter((o) => o.type === "p"));
    const S = os.map(signature).sort().join("#");
    return plis(b).filter((a) => os.map((o) => signature({ ...o, pts: o.pts.map((p) => reflet(p, a)) })).sort().join("#") === S).length;
  };
  const n = [[0, 7.5], [7.5, 14.5], [14.5, 20]].map(([a, b]) => axes(drapeau(a, b)));
  vrai(`19. France 1, Japon 2, Suisse 4 (${n})`, JSON.stringify(n) === "[1,2,4]");
  dit(19, `Réponse : France : $${n[0]}$ ; Japon : $${n[1]}$ ; Suisse : $${n[2]}$.`);
  const suisse = drapeau(14.5, 20).find((o) => o.fond === f.constantes.ROUGE);
  const b = boite([suisse]);
  vrai("19. le drapeau suisse est un carré", b.x1 - b.x0 === b.y1 - b.y0);
  const fr = drapeau(0, 7.5).find((o) => o.fond === f.constantes.BLANC);
  vrai("19. sans les couleurs, le drapeau français aurait 2 axes", nbAxes([{ pts: fr.pts }]) === 2);
});
essai("20", () => {
  const g = g1(20, "figure");
  const [d1, d2] = g.extras.axes.map((a) => [a.de, a.vers]);
  const [q] = g.lignes;
  const a = aire(q.pts);
  dit(20, `Total : $6 + 2 = ${a}$ carreaux.`);
  dit(20, `$4 \\times ${a} = ${4 * a}$ carreaux`);
  const s = g1(20, "schema");
  const q1 = q.pts.map((p) => reflet(p, d1));
  vrai("20. le morceau orange est l'image par (d1)", memeEnsemble(s.lignes[1].pts, q1));
  vrai("20. les deux morceaux du bas sont les images par (d2)", memeEnsemble(s.lignes[2].pts, q.pts.map((p) => reflet(p, d2))) && memeEnsemble(s.lignes[3].pts, q1.map((p) => reflet(p, d2))));
  const tout = s.lignes.map((l) => ({ pts: l.pts }));
  vrai("20. la figure dépliée a 2 axes", nbAxes(tout) === 2);
  const b = boite(tout);
  dit(20, `mesure $${b.x1 - b.x0}$ carreaux de large et $${b.y1 - b.y0}$ de haut`);
  verif("20. la figure dépliée : 32 carreaux", s.lignes.reduce((t, l) => t + aire(l.pts), 0), 4 * a);
});

f.fin();
