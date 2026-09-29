// Recalcul indépendant de la feuille « Les angles » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-angle-mesure.tsx.
//
// ⭐ Les angles sont MESURÉS sur les coordonnées des dessins `geo(…)`, relus
// dans le source : chaque arc étiqueté « 38° » doit mesurer 38° (à 0,3° près),
// chaque petit carré 90°, chaque arc doit s'appuyer sur deux traits dessinés,
// les traits à chevrons doivent être parallèles. Puis, exercice par exercice,
// le script calcule la réponse (soustraction, somme, position des angles
// autour d'une sécante) et la cherche écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `geo()` est refaite ici, et
// aucune étiquette ne doit sortir du cadre ni en chevaucher une autre.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-angle-mesure.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-angle-mesure.tsx", "angle_mesure", ["geo"]);
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
const paralleles = (t1, t2) => Math.abs(croix(vec(t1), vec(t2))) / (norme(vec(t1)) * norme(vec(t2))) < 1e-3;
/** Le point p est-il sur le trait t (à 1e-3 près) ? */
const surTrait = (p, t) => {
  const [u, w] = [vec(t), [p[0] - t.de[0], p[1] - t.de[1]]];
  const k = (u[0] * w[0] + u[1] * w[1]) / (norme(u) ** 2);
  return Math.abs(croix(u, w)) / norme(u) < 2e-3 && k > -1e-3 && k < 1 + 1e-3;
};

/** Les figures `geo` de l'exercice k (d'un rôle donné, ou toutes). */
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
const memePoint = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-3;

/**
 * Où est un angle, autour d'une sécante qui coupe deux droites ? `haut` : au-
 * dessus de la droite qui porte son sommet ; `droite` : à droite de la sécante
 * (orientée vers le haut). Interne : entre les deux droites.
 */
function position(g, a, droites, secante) {
  const bis = tour(direction(a.en, a.de) + mesure(a) / 2);
  const b = [Math.cos((bis * Math.PI) / 180), Math.sin((bis * Math.PI) / 180)];
  const d = droites.find((t) => surTrait(a.en, t));
  if (!d) throw new Error(`le sommet de l'arc « ${a.label} » n'est sur aucune des droites`);
  let u = vec(d);
  if (u[0] < 0) u = [-u[0], -u[1]];
  let s = vec(secante);
  if (s[1] < 0) s = [-s[0], -s[1]];
  const haut = croix(u, b) > 0;
  const droite = croix(s, b) < 0;
  const autre = droites.find((t) => t !== d);
  const versAutre = croix(u, [autre.de[0] - a.en[0], autre.de[1] - a.en[1]]) > 0;
  return { droiteSommet: d, haut, droite, interne: haut === versAutre };
}
const correspondants = (p, q) => p.droiteSommet !== q.droiteSommet && p.haut === q.haut && p.droite === q.droite;
const alternesInternes = (p, q) => p.droiteSommet !== q.droiteSommet && p.interne && q.interne && p.droite !== q.droite;

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
  const parChevrons = {};
  for (const t of g.traits) if (t.chevrons) (parChevrons[t.chevrons] ??= []).push(t);
  for (const groupe of Object.values(parChevrons)) vrai(`geo ${i + 1} : les traits à chevrons sont parallèles`, groupe.every((t) => paralleles(t, groupe[0])));
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

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = fig(1, "figure");
  const [a, b] = [val(g, "38°"), val(g, "67°")];
  const A = point(g, "A"), B = point(g, "B"), C = point(g, "C");
  vrai("1. l'arc de 38° va de A à B, celui de 67° de B à C", memePoint(arc(g, "38°").de, A) && memePoint(arc(g, "38°").vers, B) && memePoint(arc(g, "67°").de, B) && memePoint(arc(g, "67°").vers, C));
  dit(1, `$${a} + ${b} = ${a + b}$`);
  dit(1, `$\\widehat{AOC} = ${a + b}°$`);
  vrai("1. AOC obtus", a + b > 90 && a + b < 180);
  dit(1, `Réponse : a) $\\widehat{AOB} = ${a}°$ et $\\widehat{BOC} = ${b}°$`);
  dit(1, "un angle obtus");
});
essai("2", () => {
  const g = fig(2, "figure");
  const O = point(g, "O");
  verif("2. [OA) sur le 0 bleu (vers la droite)", direction(O, point(g, "A")), 0);
  const v = arrondi(direction(O, point(g, "B")));
  verif("2. la mesure lue", val(g, "?"), v);
  dit(2, `$90 + 10 + 10 = ${v}$`);
  dit(2, `$\\widehat{AOB} = ${v}°$`);
  dit(2, `lire le nombre gris, $${180 - v}$`);
  vrai("2. obtus", v > 90 && v < 180);
  dit(2, `Réponse : $\\widehat{AOB} = ${v}°$, un angle obtus.`);
});
essai("3", () => {
  const g = fig(3, "schema");
  enonceDit(3, "mesure $145°$");
  verif("3. [Ox) sur le 0", direction(point(g, "O"), point(g, "x")), 0);
  verif("3. l'angle tracé", val(g, "145°"), 145);
  dit(3, `$180 - 145 = ${180 - 145}$`);
});
essai("4", () => {
  const g = fig(4, "figure");
  const lus = [...e(4).matchAll(/\$(\d+)°\$/g)].map((m) => Number(m[1])).sort((x, y) => x - y);
  const mes = Object.fromEntries(["a", "b", "c", "d"].map((l) => [l, Math.round(val(g, l))]));
  vrai("4. les quatre mesures dessinées sont celles de l'énoncé", JSON.stringify(Object.values(mes).sort((x, y) => x - y)) === JSON.stringify(lus));
  ["a", "b", "c", "d"].forEach((l) => verif(`4. l'angle ${l} dessiné à ${mes[l]}°`, val(g, l), mes[l], 0.003));
  dit(4, `Réponse : $a = ${mes.a}°$ ; $b = ${mes.b}°$ ; $c = ${mes.c}°$ ; $d = ${mes.d}°$.`);
  vrai("4. d aigu et a obtus (le piège)", mes.d < 90 && mes.a > 90);
});
essai("5", () => {
  const [x, y, z] = [...e(5).matchAll(/\$(\d+)°\$/g)].map((m) => Number(m[1]));
  dit(5, `$90 - ${x} = ${90 - x}$`);
  dit(5, `$180 - ${y} = ${180 - y}$`);
  vrai("5. c) : plus de 90°, pas de complémentaire", z > 90 && /c\) Non/.test(f.c(5)));
  dit(5, `Réponse : a) $${90 - x}°$ ; b) $${180 - y}°$ ; c) non.`);
  const [ga, gb] = figs(5, "schema");
  verif("5. le dessin du a)", val(ga, `${90 - x}°`), 90 - x);
  verif("5. le dessin du b)", val(gb, `${180 - y}°`), 180 - y);
});
essai("6", () => {
  const [x] = [...e(6).matchAll(/\$(\d+)°\$/g)].map((m) => Number(m[1]));
  dit(6, `$180 - ${x} = ${180 - x}$`);
  dit(6, `$${x} + ${180 - x} + ${x} + ${180 - x} = 360$`);
  dit(6, `Réponse : $${x}°$, $${180 - x}°$ et $${180 - x}°$.`);
  const g = fig(6, "schema");
  const somme = (g.arcs ?? []).reduce((s, a) => s + mesure(a), 0);
  verif("6. les quatre arcs font le tour", somme, 360, 1e-6);
});
essai("7", () => {
  const g = fig(7, "figure");
  const droites = g.traits.filter((t) => t.chevrons);
  const secante = g.traits.find((t) => !t.chevrons);
  const pos = Object.fromEntries(["1", "2", "3", "4"].map((l) => [l, position(g, arc(g, l), droites, secante)]));
  const corr1 = ["2", "3", "4"].filter((l) => correspondants(pos["1"], pos[l]));
  const alt2 = ["1", "3", "4"].filter((l) => alternesInternes(pos["2"], pos[l]));
  vrai(`7. un seul correspondant à 1 (${corr1}) et un seul alterne-interne avec 2 (${alt2})`, corr1.length === 1 && alt2.length === 1);
  dit(7, `Les angles $1$ et $${corr1[0]}$ sont correspondants.`);
  dit(7, `Les angles $2$ et $${alt2[0]}$ sont alternes-internes.`);
  vrai("7. 1 et 2 : même sommet, face à face", memePoint(arc(g, "1").en, arc(g, "2").en) && pos["1"].haut !== pos["2"].haut && pos["1"].droite !== pos["2"].droite);
  vrai("7. le piège : 4 est interne, du même côté que 2", pos["4"].interne && pos["4"].droite === pos["2"].droite);
  dit(7, `Réponse : a) l'angle $${corr1[0]}$ ; b) l'angle $${alt2[0]}$ ; c) opposés par le sommet.`);
});
essai("8", () => {
  const g = fig(8, "figure");
  const droites = g.traits.filter((t) => t.chevrons);
  const secante = g.traits.find((t) => !t.chevrons);
  vrai("8. les deux angles sont alternes-internes", alternesInternes(position(g, arc(g, "64°"), droites, secante), position(g, arc(g, "?"), droites, secante)));
  verif("8. l'angle cherché, mesuré", val(g, "?"), 64);
  dit(8, "l'angle cherché mesure $64°$");
  dit(8, "Réponse : l'angle en $B$ mesure $64°$.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = fig(9, "figure");
  const O = point(g, "O");
  const [a, b] = [arrondi(direction(O, point(g, "A"))), arrondi(direction(O, point(g, "B")))];
  dit(9, `$[OA)$ passe par $${a}$ et $[OB)$ passe par $${b}$`);
  dit(9, `$${b} - ${a} = ${b - a}$`);
  verif("9. l'arc mesure l'écart", val(g, "?"), b - a);
  dit(9, `$\\widehat{AOB} = ${b - a}°$`);
  dit(9, `on lit $${180 - a}$ et $${180 - b}$, et $${180 - a} - ${180 - b} = ${b - a}$`);
  vrai("9. aigu", b - a < 90 && /Il est aigu/.test(f.c(9)));
});
essai("10", () => {
  const [x, y] = [...e(10).matchAll(/= (\d+)°\$/g)].map((m) => Number(m[1]));
  enonceDit(10, "de $6$ cm");
  dit(10, `$${x} + ${y} = ${x + y}$`);
  vrai("10. complémentaires", x + y === 90);
  const g = fig(10, "schema");
  verif("10. [OA] de 6", norme([point(g, "A")[0] - point(g, "O")[0], point(g, "A")[1] - point(g, "O")[1]]), 6);
  verif("10. B à 23°", direction(point(g, "O"), point(g, "B")), x, 1e-4);
  verif("10. C à 90°", direction(point(g, "O"), point(g, "C")), x + y, 1e-4);
});
essai("11", () => {
  const [boc, aod] = [...e(11).matchAll(/= (\d+)°\$/g)].map((m) => Number(m[1]));
  const cod = 180 - boc - aod, coa = cod + aod;
  dit(11, `$${boc} + ${aod} = ${boc + aod}$`);
  dit(11, `$180 - ${boc + aod} = ${cod}$`);
  dit(11, `$${cod} + ${aod} = ${coa}$`);
  dit(11, `$${boc} + ${coa} = 180$`);
  dit(11, `Réponse : a) $\\widehat{COD} = ${cod}°$`);
  const g = fig(11, "schema");
  verif("11. COD dessiné", val(g, `${cod}°`), cod);
  vrai("11. A, O, B alignés", Math.abs(croix([point(g, "A")[0] - point(g, "O")[0], point(g, "A")[1]], [point(g, "B")[0] - point(g, "O")[0], point(g, "B")[1]])) < 1e-9);
});
essai("12", () => {
  const g = fig(12, "figure");
  const [a, b] = [val(g, "52°"), val(g, "71°")];
  const v = Object.fromEntries(["1", "2", "3", "4"].map((l) => [l, Math.round(val(g, l))]));
  vrai("12. angle 1 = 180 − 52 − 71", v["1"] === 180 - a - b);
  vrai("12. 2, 3, 4 opposés à 52, 71, 1", v["2"] === a && v["3"] === b && v["4"] === v["1"]);
  dit(12, `$180 - ${a} - ${b} = ${v["1"]}$`);
  dit(12, `Réponse : $1$ : $${v["1"]}°$ ; $2$ : $${v["2"]}°$ ; $3$ : $${v["3"]}°$ ; $4$ : $${v["4"]}°$.`);
  dit(12, `$${a} + ${b} + ${v["1"]} + ${v["2"]} + ${v["3"]} + ${v["4"]} = 360$`);
});
essai("13", () => {
  const g = fig(13, "figure");
  const droites = g.traits.filter((t) => t.chevrons);
  const secante = g.traits.find((t) => !t.chevrons);
  const [p, q] = [position(g, arc(g, "118°"), droites, secante), position(g, arc(g, "?"), droites, secante)];
  vrai("13. ni alternes-internes ni correspondants", !alternesInternes(p, q) && !correspondants(p, q));
  vrai("13. même côté, entre les parallèles", p.interne && q.interne && p.droite === q.droite);
  const x = arrondi(val(g, "?"));
  verif("13. l'angle en B", x, 180 - 118);
  dit(13, `$180 - 118 = ${x}$`);
  dit(13, `l'angle en $B$ mesure $${x}°$`);
  dit(13, `$118 + ${x} = 180$`);
});
essai("14", () => {
  const [ga, gb] = figs(14, "figure");
  const d = (g, n) => g.traits.find((t) => t.nom === n);
  const secA = ga.traits.find((t) => !t.nom), secB = gb.traits.find((t) => !t.nom);
  const [pa, qa] = [position(ga, arc(ga, "81°"), [d(ga, "(d1)"), d(ga, "(d2)")], secA), position(ga, arc(ga, "79°"), [d(ga, "(d1)"), d(ga, "(d2)")], secA)];
  vrai("14a. 81° et 79° sont correspondants", correspondants(pa, qa));
  vrai("14a. (d1) et (d2) NE sont PAS parallèles", !paralleles(d(ga, "(d1)"), d(ga, "(d2)")));
  const ecart = Math.abs(direction(d(ga, "(d1)").de, d(ga, "(d1)").vers) - direction(d(ga, "(d2)").de, d(ga, "(d2)").vers));
  verif("14a. un écart de 2°", ecart, 81 - 79, 1e-3);
  dit(14, "$81 \\neq 79$");
  dit(14, `un écart de $${81 - 79}°$ ne se voit pas`);
  const [pb, qb] = gb.arcs.map((a) => position(gb, a, [d(gb, "(d3)"), d(gb, "(d4)")], secB));
  vrai("14b. alternes-internes égaux", alternesInternes(pb, qb) && Math.abs(mesure(gb.arcs[0]) - mesure(gb.arcs[1])) < 1e-3);
  vrai("14b. (d3) et (d4) parallèles", paralleles(d(gb, "(d3)"), d(gb, "(d4)")));
  dit(14, "Réponse : a) non ; b) oui.");
});
essai("15", () => {
  const g = fig(15, "figure");
  const [a1, a2] = [val(g, "1"), val(g, "2")];
  verif("15. angle 1", a1, 32, 0.01);
  verif("15. angle 2", a2, 41, 0.01);
  enonceDit(15, "l'un fait $32°$, l'autre $41°$");
  const cote = (a) => norme([a.de[0] - a.en[0], a.de[1] - a.en[1]]);
  vrai("15. les côtés de l'angle 1 sont plus longs", cote(arc(g, "1")) > 2 * cote(arc(g, "2")));
  dit(15, `l'angle $2$ mesure $${Math.round(a2)}°$`);
  dit(15, `L'angle $1$ mesure $${Math.round(a1)}°$`);
});
essai("16", () => {
  const g = fig(16, "schema");
  const O = point(g, "O");
  verif("16. [Ox) vers la gauche", direction(O, point(g, "x")), 180);
  verif("16. [Oz) prolonge [Ox)", direction(O, point(g, "z")), 0);
  enonceDit(16, "de $75°$");
  dit(16, `$180 - 75 = ${180 - 75}$`);
  const bleu = arrondi(direction(O, point(g, "y")));
  dit(16, `$[Oy)$ passe justement par $${bleu}$`);
  vrai("16. la graduation bleue donne yOz", bleu === 180 - 75);
  dit(16, `$\\widehat{yOz} = ${180 - 75}°$.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = fig(17, "figure");
  const droites = g.traits.filter((t) => t.chevrons);
  const [boul, rue] = g.traits.filter((t) => !t.chevrons);
  vrai("17. la rue est perpendiculaire aux avenues", Math.abs(vec(rue)[0] * vec(droites[0])[0] + vec(rue)[1] * vec(droites[0])[1]) < 1e-9);
  const donne = val(g, "124°");
  const [p, q] = [position(g, arc(g, "124°"), droites, boul), position(g, arc(g, "x"), droites, boul)];
  vrai("17. 124° et x alternes-internes", alternesInternes(p, q));
  const x = Math.round(val(g, "x")), y = Math.round(val(g, "y"));
  vrai("17. x = 124", x === donne);
  vrai("17. y = 90 − (180 − 124)", y === 90 - (180 - donne));
  dit(17, `$180 - ${donne} = ${180 - donne}$`);
  dit(17, `$y = 90 - ${180 - donne} = ${y}$`);
  dit(17, `Réponse : a) $${donne}°$ ; b) $x = ${x}°$ ; c) $${180 - donne}°$ ; d) $y = ${y}°$.`);
});
essai("18", () => {
  const entre = (h, mn) => {
    const d = Math.abs(30 * (h % 12) + mn / 2 - 6 * mn);
    return Math.min(d, 360 - d);
  };
  enonceDit(18, "Un tour complet mesure $360°$");
  dit(18, `$360 \\div 12 = ${360 / 12}$`);
  dit(18, `$5 \\times 30 = ${entre(5, 0)}$`);
  dit(18, `$3 \\times 30 = ${entre(9, 0)}$`);
  dit(18, `$30 \\div 2 = 15$`);
  dit(18, `$15 + 60 = ${entre(3, 30)}$`);
  dit(18, `Réponse : a) $30°$ ; b) $${entre(5, 0)}°$, obtus ; c) $${entre(9, 0)}°$, droit ; d) $${entre(3, 30)}°$.`);
  // Les aiguilles dessinées : angle compté depuis midi dans le sens des aiguilles d'une montre.
  const depuisMidi = (p) => tour(90 - direction([0, 0], p));
  const [g5, g330] = figs(18, "schema");
  vrai("18. à 5 h : petite aiguille sur 5, grande sur 12", Math.abs(depuisMidi(g5.traits[0].vers) - 150) < 0.01 && Math.abs(depuisMidi(g5.traits[1].vers)) < 0.01);
  vrai("18. à 3 h 30 : petite aiguille à mi-chemin de 3 et 4, grande sur 6", Math.abs(depuisMidi(g330.traits[0].vers) - 105) < 0.01 && Math.abs(depuisMidi(g330.traits[1].vers) - 180) < 0.01);
  verif("18. l'arc de 3 h 30", val(g330, "75°"), entre(3, 30));
});
essai("19", () => {
  const g = fig(19, "figure");
  const [a, b] = [val(g, "35°"), val(g, "48°")];
  verif("19. l'angle de la pointe, mesuré", val(g, "?"), a + b, 1e-4);
  dit(19, `$\\widehat{AMB} = ${a}° + ${b}° = ${a + b}°$`);
  dit(19, `Réponse : $\\widehat{AMB} = ${a + b}°$.`);
  const s = fig(19, "schema");
  const d3 = s.traits.find((t) => t.nom === "(d3)");
  vrai("19. (d3) passe par M", surTrait(point(s, "M"), d3));
});
essai("20", () => {
  const g = fig(20, "figure");
  const [r1, r2] = g.traits.filter((t) => t.couleur === f.constantes.ORANGE);
  vrai("20. les deux rayons sont parallèles", paralleles(r1, r2));
  const [p1, p2] = g.traits.filter((t) => t.couleur === f.constantes.VIOLET);
  vrai("20. chaque rayon passe par le haut de son poteau", surTrait(p1.vers, r1) && surTrait(p2.vers, r2));
  const a = arrondi(val(g, "a")), b = arrondi(val(g, "b"));
  verif("20. a = 41", a, 41);
  verif("20. b = 180 − 90 − 41", b, 180 - 90 - 41);
  dit(20, `$b = 180 - 90 - 41 = ${b}$`);
  dit(20, `$41 + ${b} = 90$`);
  dit(20, `Réponse : a) $a = ${a}°$ ; b) $b = ${b}°$ ; c) plus courte.`);
  const s = fig(20, "schema");
  const bouts = s.arcs.map((x) => ({ l: x.label, x: x.en[0] }));
  vrai("20. à 58°, l'ombre est plus courte", bouts.find((x) => x.l === "58°").x < bouts.find((x) => x.l === "41°").x);
});

f.fin();
