// Recalcul indépendant de la feuille « Les angles » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-angle-mesure.tsx.
//
// ⭐ Les angles sont MESURÉS sur les coordonnées des dessins `geo(…)`, relus
// dans le source : chaque arc étiqueté « 38° » doit mesurer 38° (à 0,3° près),
// chaque petit carré 90°, chaque arc doit s'appuyer sur deux traits dessinés.
// Puis, exercice par exercice, le script calcule la réponse à partir des
// nombres de l'ÉNONCÉ (ou du dessin) et la cherche écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `geo()` est refaite ici, et
// aucune étiquette ne doit sortir du cadre ni en chevaucher une autre.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-angle-mesure.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-angle-mesure.tsx", "angle_mesure", ["geo"], "6e");
const { e, vrai, verif, dit, enonceDit, dessins, essai, appels } = f;

/* ── Géométrie ───────────────────────────────────────────────────────────── */
const direction = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const tour = (x) => ((x % 360) + 360) % 360;
/** La mesure d'un arc : de `de` vers `vers`, sens inverse des aiguilles d'une montre. */
const mesure = (arc) => tour(direction(arc.en, arc.vers) - direction(arc.en, arc.de));
const arrondi = (x) => Math.round(x * 100) / 100;
const vec = (t) => [t.vers[0] - t.de[0], t.vers[1] - t.de[1]];
const norme = (v) => Math.hypot(v[0], v[1]);
const croix = (u, v) => u[0] * v[1] - u[1] * v[0];
/** Le point p est-il sur le trait t (à 1e-3 près) ? */
const surTrait = (p, t) => {
  const [u, w] = [vec(t), [p[0] - t.de[0], p[1] - t.de[1]]];
  const k = (u[0] * w[0] + u[1] * w[1]) / (norme(u) ** 2);
  return Math.abs(croix(u, w)) / norme(u) < 2e-3 && k > -1e-3 && k < 1 + 1e-3;
};
/** Les nombres suivis de ° dans les formules d'un texte. */
const degres = (texte) => [...texte.matchAll(/\$(\d+)°\$/g)].map((m) => Number(m[1]));

const figs = (k, role) => dessins("geo", k).filter((d) => !role || d.role === role).map((d) => d.args[0]);
const fig = (k, role) => {
  const g = figs(k, role)[0];
  if (!g) throw new Error(`exercice ${k} : pas de geo (${role ?? ""})`);
  return g;
};
const arc = (g, label) => {
  const a = (g.arcs ?? []).find((x) => x.label === label);
  if (!a) throw new Error(`pas d'arc « ${label} »`);
  return a;
};
const val = (g, label) => arrondi(mesure(arc(g, label)));
const point = (g, nom) => {
  const p = (g.points ?? []).find((x) => x.nom === nom);
  if (!p) throw new Error(`pas de point ${nom}`);
  return p.en;
};
/** L'angle de sommet V entre les points p et q (0 à 180). */
const angleEn = (V, p, q) => {
  const d = Math.abs(tour(direction(V, p) - direction(V, q)));
  return arrondi(Math.min(d, 360 - d));
};

/* ── Contrôles de TOUS les dessins ───────────────────────────────────────── */
const tous = appels("geo").filter((a) => a.args).map((a) => a.args[0]);
tous.forEach((g, i) => {
  for (const a of g.arcs ?? []) {
    const m = /^(\d+)°$/.exec(a.label ?? "");
    if (m) verif(`geo ${i + 1} : l'arc « ${a.label} » mesure ${m[1]}°`, mesure(a), Number(m[1]), 0.3 / Number(m[1]));
    if (a.droit) verif(`geo ${i + 1} : le petit carré est un angle droit`, mesure(a), 90, 0.003);
    // Chaque côté de l'arc part du sommet LE LONG d'un trait dessiné.
    for (const bout of [a.de, a.vers]) {
      const u = [bout[0] - a.en[0], bout[1] - a.en[1]];
      const pas = [a.en[0] + (0.05 * u[0]) / norme(u), a.en[1] + (0.05 * u[1]) / norme(u)];
      vrai(`geo ${i + 1} : l'arc « ${a.label ?? "droit"} » s'appuie sur un trait dessiné`, g.traits.some((t) => surTrait(a.en, t) && surTrait(pas, t)));
    }
  }
});

/* ── Le rendu, simulé : la mise en page de geo() refaite ici ─────────────── */
function boites(g) {
  const W = 300, HMAX = 232, m = 28;
  const reels = [];
  for (const t of g.traits) reels.push(t.de, t.vers);
  for (const p of g.points ?? []) reels.push(p.en);
  for (const a of g.arcs ?? []) reels.push(a.en);
  if (g.rapporteur) {
    const { centre: [cx, cy], rayon: r } = g.rapporteur;
    reels.push([cx - r, cy], [cx + r, cy + r]);
  }
  if (g.horloge) {
    const { centre: [cx, cy], rayon: r } = g.horloge;
    reels.push([cx - r, cy - r], [cx + r, cy + r]);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const res = [];
  const texte = (x, y, t, a, taille = 14, borne = true) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = borne ? Math.min(Math.max(x, 4 + ga), W - 4 - dr) : x;
    const by = borne ? Math.min(Math.max(y, 10), H - 8) : y;
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  const ancre = (c) => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");
  for (const a of g.arcs ?? []) {
    if (a.droit || !a.label) continue;
    const V = px(a.en);
    const a1 = Math.atan2(a.de[1] - a.en[1], a.de[0] - a.en[0]);
    const d = (mesure(a) * Math.PI) / 180;
    const r = a.rayon ?? (d < 0.7 ? 30 : 21);
    const am = a1 + d / 2;
    const L = r + (d < 0.5 ? 17 : 14);
    texte(V[0] + L * Math.cos(am), V[1] - L * Math.sin(am), a.label, ancre(Math.cos(am)));
  }
  for (const t of g.traits) if (t.nom && t.ou) texte(...px(t.ou), t.nom, "middle");
  const decal = { haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"], hg: [-7, -11, "end"], hd: [7, -11, "start"], bg: [-7, 13, "end"], bd: [7, 13, "start"] };
  for (const p of g.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, an] = decal[p.vers ?? "bas"];
    texte(x + dx, y + dy, p.nom, an, 15);
  }
  if (g.rapporteur) {
    const C = px(g.rapporteur.centre), R = g.rapporteur.rayon * s;
    for (const d of [0, 30, 60, 90, 120, 150, 180]) {
      const r = (d * Math.PI) / 180, leve = d === 0 || d === 180 ? -10 : 0;
      texte(C[0] + (R + 12) * Math.cos(r), C[1] - (R + 12) * Math.sin(r) + leve, String(180 - d), "middle", 14, false);
      texte(C[0] + (R - 20) * Math.cos(r), C[1] - (R - 20) * Math.sin(r) + leve, String(d), "middle", 14, false);
    }
  }
  if (g.horloge) {
    const C = px(g.horloge.centre), R = g.horloge.rayon * s;
    for (let h = 1; h <= 12; h++) {
      const r = ((90 - 30 * h) * Math.PI) / 180;
      texte(C[0] + (R - 17) * Math.cos(r), C[1] - (R - 17) * Math.sin(r), String(h), "middle", 14, false);
    }
  }
  return { W, H, res };
}
tous.forEach((g, i) => {
  const { W, H, res } = boites(g);
  for (const b of res) vrai(`geo ${i + 1} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H, `${b.x0.toFixed(0)}–${b.x1.toFixed(0)} × ${b.y0.toFixed(0)}–${b.y1.toFixed(0)} dans ${W} × ${H}`);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, q] = [res[a], res[b]];
      const ox = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0);
      const dy = Math.abs((p.y0 + p.y1) / 2 - (q.y0 + q.y1) / 2);
      vrai(`geo ${i + 1} : « ${p.t} » et « ${q.t} » ne se chevauchent pas`, ox <= 3 || dy >= 18, `recouvrement de ${ox.toFixed(0)} en largeur, ${dy.toFixed(0)} d'écart vertical`);
    }
});

/** La nature d'un angle, comme la feuille l'écrit. */
const nature = (x) => (x < 90 ? "aigu" : x === 90 ? "droit" : x < 180 ? "obtus" : "plat");

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = fig(1, "figure");
  const a = g.arcs[0];
  const R = point(g, "R"), V = point(g, "V"), W = point(g, "W");
  const meme = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-9;
  vrai("1. l'arc colorié est en R, de V vers W", a.plein && meme(a.en, R) && meme(a.de, V) && meme(a.vers, W));
  dit(1, "Ce sont $[RV)$ et $[RW)$.");
  dit(1, "Le nom est $\\widehat{VRW}$.");
  dit(1, "Réponse : a) $R$ ; b) $[RV)$ et $[RW)$ ; c) $\\widehat{VRW}$.");
});
essai("2", () => {
  const g = fig(2, "figure");
  const n = Object.fromEntries(["a", "b", "c", "d"].map((l) => [l, Math.round(val(g, l))]));
  ["a", "b", "c", "d"].forEach((l) => verif(`2. l'angle ${l} est dessiné à un nombre rond de degrés (${n[l]})`, val(g, l), n[l], 1e-4));
  dit(2, `Réponse : $a$ ${nature(n.a)} ; $b$ ${nature(n.b)} ; $c$ ${nature(n.c)} ; $d$ ${nature(n.d)}.`);
  vrai("2. une nature de chaque sorte", new Set(Object.values(n).map(nature)).size === 4);
});
essai("3", () => {
  const g = fig(3, "figure");
  const [A, B, C, D] = ["A", "B", "C", "D"].map((k) => point(g, k));
  const m = { A: angleEn(A, B, D), B: angleEn(B, A, C), C: angleEn(C, B, D), D: angleEn(D, A, C) };
  vrai(`3. droits en B et C, aigu en A, obtus en D (${JSON.stringify(m)})`, m.B === 90 && m.C === 90 && m.A < 90 && m.D > 90);
  dit(3, `$${Math.round(m.A)}°$ en $A$ et $${Math.round(m.D)}°$ en $D$`);
  verif("3. le schéma", val(fig(3, "schema"), `${Math.round(m.D)}°`), m.D, 1e-3);
  dit(3, "Réponse : a) $\\widehat{B}$ et $\\widehat{C}$ ; b) $\\widehat{A}$ est aigu, $\\widehat{D}$ est obtus.");
});
essai("4", () => {
  const g = fig(4, "figure");
  const m = Object.fromEntries(["1", "2", "3"].map((l) => [l, Math.round(val(g, l))]));
  const lus = degres(e(4)).sort((x, y) => x - y);
  vrai("4. les mesures de l'énoncé sont celles du dessin", JSON.stringify(Object.values(m).sort((x, y) => x - y)) === JSON.stringify(lus));
  const ordre = ["1", "2", "3"].sort((x, y) => m[x] - m[y]);
  dit(4, `b) $${ordre[0]}$, $${ordre[1]}$, $${ordre[2]}$`);
  dit(4, `c) $1$ : $${m["1"]}°$ ; $2$ : $${m["2"]}°$ ; $3$ : $${m["3"]}°$.`);
  const cote = (l) => norme([arc(g, l).de[0] - arc(g, l).en[0], arc(g, l).de[1] - arc(g, l).en[1]]);
  vrai("4. le piège : l'angle 1 a les plus longs côtés et la plus petite mesure", cote("1") > cote("2") && cote("1") > cote("3") && ordre[0] === "1");
});
essai("5", () => {
  const g = fig(5, "figure");
  const O = point(g, "O");
  verif("5. [OA) sur le 0 bleu", direction(O, point(g, "A")), 0);
  const v = arrondi(direction(O, point(g, "B")));
  verif("5. la mesure lue", val(g, "?"), v);
  dit(5, `$60 + 10 = ${v}$`);
  dit(5, `lire le nombre gris, $${180 - v}$`);
  dit(5, `b) $\\widehat{AOB} = ${v}°$.`);
});
essai("6", () => {
  const g = fig(6, "schema");
  const [x] = degres(e(6));
  verif("6. [Ox) sur le 0", direction(point(g, "O"), point(g, "x")), 0);
  verif("6. l'angle tracé", val(g, `${x}°`), x);
  dit(6, `$180 - ${x} = ${180 - x}$`);
});
essai("7", () => {
  const [a] = degres(e(7));
  dit(7, `$180 - ${a} = ${180 - a}$`);
  dit(7, `Réponse : $\\widehat{COB} = ${180 - a}°$.`);
  vrai("7. obtus", 180 - a > 90 && f.c(7).includes("angle obtus"));
  const g = fig(7, "schema");
  verif("7. le dessin", val(g, `${180 - a}°`), 180 - a);
  verif("7. A, O, B alignés", Math.abs(croix([point(g, "A")[0] - point(g, "O")[0], point(g, "A")[1]], [point(g, "B")[0] - point(g, "O")[0], point(g, "B")[1]])), 0);
});
essai("8", () => {
  const [T, a] = degres(e(8));
  dit(8, `$${T} - ${a} = ${T - a}$`);
  dit(8, `$${a} + ${T - a} = ${T}$`);
  dit(8, `Réponse : $\\widehat{BOC} = ${T - a}°$.`);
  const g = fig(8, "schema");
  verif("8. le dessin", val(g, `${T - a}°`), T - a);
  verif("8. le grand angle dessiné", angleEn(point(g, "O"), point(g, "A"), point(g, "C")), T);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = fig(9, "figure");
  const O = point(g, "O");
  verif("9. [OA) vers la gauche", direction(O, point(g, "A")), 180);
  const bleu = arrondi(direction(O, point(g, "B")));
  const v = val(g, "?");
  verif("9. la mesure = 180 − la lecture bleue", v, 180 - bleu);
  dit(9, `$150 - 5 = ${v}$`);
  vrai("9. un petit trait avant 150 gris (position 35)", bleu === 35);
  dit(9, `lire le bleu, $${bleu}$`);
  dit(9, `c) $\\widehat{AOB} = ${v}°$.`);
});
essai("10", () => {
  const [x, y] = degres(e(10));
  enonceDit(10, "de $5$ cm");
  dit(10, `$${x} + ${y} = ${x + y}$`);
  vrai("10. plat", x + y === 180);
  const g = fig(10, "schema");
  verif("10. B", direction(point(g, "O"), point(g, "B")), x, 1e-4);
  verif("10. C", direction(point(g, "O"), point(g, "C")), x + y, 1e-4);
  verif("10. OA = 5", norme(point(g, "A")), 5);
});
essai("11", () => {
  const [a] = degres(e(11));
  dit(11, `$180 - ${a} = ${180 - a}$`);
  dit(11, `$${a} + ${180 - a} + ${a} + ${180 - a} = 360$`);
  dit(11, `Réponse : $1$ : $${180 - a}°$ ; $2$ : $${a}°$ ; $3$ : $${180 - a}°$.`);
  const g = fig(11, "schema");
  verif("11. angle 1 dessiné", val(g, "1"), 180 - a, 1e-4);
  verif("11. angle 2 dessiné", val(g, "2"), a, 1e-4);
  verif("11. angle 3 dessiné", val(g, "3"), 180 - a, 1e-4);
});
essai("12", () => {
  const [a, b] = degres(e(12));
  dit(12, `$${a} + ${b} = ${a + b}$`);
  dit(12, `$360 - ${a + b} = ${360 - a - b}$`);
  vrai("12. la plus grosse part est Sami", b > a && b > 360 - a - b);
  dit(12, `Réponse : a) $${360 - a - b}°$ ; b) la part de Sami.`);
  const g = fig(12, "schema");
  verif("12. les trois parts font le tour", g.arcs.reduce((s, x) => s + mesure(x), 0), 360, 1e-6);
});
essai("13", () => {
  const [g2, g7] = figs(13, "figure");
  const depuisMidi = (p) => tour(90 - direction([0, 0], p));
  verif("13. 2 h : petite aiguille sur le 2", depuisMidi(g2.traits[0].vers), 60, 1e-4);
  verif("13. 7 h : petite aiguille sur le 7", depuisMidi(g7.traits[0].vers), 210, 1e-4);
  const a2 = arrondi(mesure(g2.arcs[0])), a7 = arrondi(mesure(g7.arcs[0]));
  verif("13. l'arc de 2 h", a2, 2 * 30);
  verif("13. l'arc de 7 h", a7, 5 * 30);
  dit(13, `$2 \\times 30 = ${a2}$`);
  dit(13, `$5 \\times 30 = ${a7}$`);
  dit(13, "$3 \\times 30 = 90$");
  dit(13, `Réponse : a) ${nature(a2)}, ${nature(a7)} ; b) $${a2}°$ et $${a7}°$ ; c) $3$ h ou $9$ h.`);
});
essai("14", () => {
  const [a, b] = degres(e(14));
  dit(14, `$${a} + ${b} = ${a + b}$`);
  dit(14, `$\\widehat{AOC} = ${a + b}°$`);
  vrai("14. aigu", a + b < 90);
  const g = fig(14, "schema");
  verif("14. AOC dessiné", val(g, `${a + b}°`), a + b);
});
essai("15", () => {
  const [T] = degres(e(15));
  const n = Number(/Il a \$(\d+)\$ baguettes/.exec(e(15))[1]);
  const g = fig(15, "figure");
  vrai(`15. ${n} baguettes dessinées`, g.traits.length === n);
  const dirs = g.traits.map((t) => direction(t.de, t.vers)).sort((x, y) => x - y);
  verif("15. l'éventail ouvert mesure T", dirs.at(-1) - dirs[0], T, 1e-4);
  const pas = T / (n - 1);
  vrai("15. baguettes régulières", dirs.every((d, i) => i === 0 || Math.abs(d - dirs[i - 1] - pas) < 1e-3));
  verif("15. l'arc ? = un espace", val(g, "?"), pas);
  dit(15, `$${T} \\div ${n - 1} = ${pas}$`);
  dit(15, `$${n - 1} \\times ${pas} = ${T}$`);
  dit(15, `Réponse : $${pas}°$.`);
});
essai("16", () => {
  const g = fig(16, "schema");
  const [A, B, C] = ["A", "B", "C"].map((k) => point(g, k));
  verif("16. AB = 6", norme([B[0] - A[0], B[1] - A[1]]), 6);
  const acb = angleEn(C, A, B);
  verif("16. ACB mesuré", acb, 180 - 45 - 45);
  dit(16, `je trouve $${acb}°$`);
  dit(16, `Réponse : $\\widehat{ACB} = ${acb}°$, c'est un angle droit.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = fig(17, "figure");
  const d = Object.fromEntries(g.traits.map((t) => [t.nom, tour(direction(t.de, t.vers))]));
  vrai("17. huit directions tous les 45°", g.traits.length === 8 && Object.values(d).sort((x, y) => x - y).every((v, i) => Math.abs(v - 45 * i) < 1e-3));
  const ecart = (p, q) => angleEn([0, 0], [Math.cos((d[p] * Math.PI) / 180), Math.sin((d[p] * Math.PI) / 180)], [Math.cos((d[q] * Math.PI) / 180), Math.sin((d[q] * Math.PI) / 180)]);
  dit(17, "$360 \\div 8 = 45$");
  dit(17, `$2 \\times 45 = ${ecart("N", "E")}$`);
  dit(17, `$3 \\times 45 = ${ecart("N", "SE")}$`);
  dit(17, `Réponse : a) $${ecart("N", "E")}°$ ; b) $${ecart("N", "NE")}°$ ; c) $${ecart("N", "S")}°$ ; d) $${ecart("N", "SE")}°$.`);
  vrai("17. E à droite, N en haut (le tour passe par l'Est)", d.N === 90 && d.E === 0 && d.SE === 315);
});
essai("18", () => {
  const n = Number(/a \$(\d+)\$ rayons/.exec(e(18))[1]);
  const a = 360 / n;
  dit(18, `$360 \\div ${n} = ${a}$`);
  dit(18, `$3 \\times ${a} = ${3 * a}$`);
  vrai("18. aucun nombre entier de places ne fait 90°", !Number.isInteger(90 / a));
  dit(18, `Deux places font $${2 * a}°$. Trois places font $${3 * a}°$.`);
  dit(18, `$180 \\div ${a} = ${180 / a}$`);
  dit(18, `Réponse : a) $${a}°$ ; b) $${3 * a}°$ ; c) non ; d) $${180 / a}$ places.`);
  const g = fig(18, "schema");
  vrai(`18. ${n} rayons dessinés`, g.traits.length === n);
  verif("18. l'arc de 3 places", val(g, `${3 * a}°`), 3 * a);
});
essai("19", () => {
  const [a, b] = degres(e(19));
  dit(19, `$${a} + ${a} = ${2 * a}$`);
  dit(19, `$180 - ${2 * a} = ${180 - 2 * a}$`);
  dit(19, `$${b} + ${b} = ${2 * b}$, puis $180 - ${2 * b} = ${180 - 2 * b}$`);
  dit(19, `Réponse : a) $${180 - 2 * a}°$ ; b) $${180 - 2 * b}°$, un angle droit.`);
  const g = fig(19, "figure");
  verif("19. l'angle entre les rayons, mesuré", val(g, "?"), 180 - 2 * a, 1e-4);
});
essai("20", () => {
  const [a, plus] = degres(e(20)).length ? degres(e(20)) : [];
  const n = Number(/de \$(\d+)°\$ de plus/.exec(e(20))[1]);
  dit(20, `$180 - ${a} = ${180 - a}$`);
  dit(20, `$${a} + ${n} = ${a + n}$`);
  dit(20, `$180 - ${a + n} = ${180 - a - n}$`);
  dit(20, `Réponse : a) ${nature(a)} ; b) $${180 - a}°$ ; c) $${a + n}°$ ; d) jusqu'à $180°$.`);
  const g = fig(20, "figure");
  verif("20. l'angle derrière, mesuré", val(g, "?"), 180 - a, 1e-4);
  vrai("20. la table est une ligne droite qui passe par la charnière", surTrait([0, 0], g.traits[0]));
  void plus;
});

f.fin();
