// Recalcul indépendant de la feuille « La bissectrice d'un angle » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-bissectrice-angle.tsx.
//
// ⭐ Les angles sont MESURÉS sur les coordonnées des dessins `geo(…)`, relus
// dans le source : chaque arc étiqueté « 38° » doit mesurer 38° (à 0,3° près),
// chaque petit carré 90°, chaque arc doit s'appuyer sur deux traits dessinés.
// Deux parts jumelles d'un même angle doivent être égales, et chaque
// bissectrice dessinée doit tomber à la moitié de son angle. Puis, exercice
// par exercice, le script calcule la réponse à partir des nombres de
// l'ÉNONCÉ (ou du dessin) et la cherche écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `geo()` est refaite ici, et
// aucune étiquette ne doit sortir du cadre ni en chevaucher une autre.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-bissectrice-angle.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-bissectrice-angle.tsx", "bissectrice_angle", ["geo"], "6e");
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

/** Les nombres (entiers ou décimaux) des formules d'un texte, dans l'ordre. */
const nombres = (texte) => [...texte.matchAll(/\$([^$]*)\$/g)].flatMap((m) => [...m[1].replace(/\\widehat\{[^}]*\}/g, "").matchAll(/\d+(?:\{,\}\d+)?/g)].map((x) => Number(x[0].replace("{,}", "."))));
/** Comme la feuille l'écrit : 22{,}5. */
const tx = (x) => String(x).replace(".", "{,}");

/* ── Chaque bissectrice dessinée (trait ORANGE plein ou pointillé) partage-t-elle
   un angle de la figure en deux ? Relu sur les coordonnées. ─────────────── */
tous.forEach((g, i) => {
  for (const a of g.arcs ?? []) {
    // Deux arcs de même étiquette en degrés, côte à côte, au même sommet : ils doivent être égaux.
    const jumeau = (g.arcs ?? []).find((b) => b !== a && b.label === a.label && b.en[0] === a.en[0] && b.en[1] === a.en[1] && Math.hypot(b.de[0] - a.vers[0], b.de[1] - a.vers[1]) < 1e-9);
    if (jumeau && /°$/.test(a.label)) verif(`geo ${i + 1} : les deux parts « ${a.label} » sont égales`, mesure(a), mesure(jumeau), 1e-3);
  }
});

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [g1, g2] = figs(1, "figure");
  const [a1, b1] = g1.arcs.map((a) => Math.round(mesure(a)));
  const [a2, b2] = g2.arcs.map((a) => Math.round(mesure(a)));
  vrai("1. figure 1 : parts égales ; figure 2 : inégales", a1 === b1 && a2 !== b2);
  verif("1. les deux angles entiers sont égaux (le piège de l'œil)", a1 + b1, a2 + b2);
  dit(1, `mesurent $${a1}°$ et $${b1}°$. Elles sont égales.`);
  dit(1, `mesurent $${a2}°$ et $${b2}°$. Elles ne sont pas égales.`);
  dit(1, "Réponse : a) oui ; b) non.");
});
essai("2", () => {
  const [a] = degres(e(2));
  dit(2, `$${a} \\div 2 = ${a / 2}$`);
  dit(2, "$90 \\div 2 = 45$");
  dit(2, "$180 \\div 2 = 90$");
  dit(2, `Réponse : a) $${a / 2}°$ ; b) $45°$ ; c) $90°$.`);
  verif("2. le schéma", val(fig(2, "schema"), `${a / 2}°`), a / 2);
});
essai("3", () => {
  const g = fig(3, "figure");
  const v = val(g, "?");
  verif("3. [OA) sur le 0 bleu", direction(point(g, "O"), point(g, "A")), 0);
  dit(3, `$150 - 10 = ${v}$`);
  dit(3, `$${v} \\div 2 = ${v / 2}$`);
  dit(3, `Réponse : a) $${v}°$ ; b) au $${v / 2}$ bleu.`);
  const s = fig(3, "schema");
  verif("3. le schéma : la bissectrice à la moitié", val(s, `${v / 2}°`), v / 2);
});
essai("4", () => {
  const [a] = degres(e(4));
  const g = fig(4, "figure");
  verif("4. l'angle dessiné", val(g, `${a}°`), a);
  const pli = g.traits.find((t) => t.nom === "pli");
  verif("4. le pli est à la moitié", direction(pli.de, pli.vers), a / 2, 1e-4);
  dit(4, `$${a} \\div 2 = ${a / 2}$`);
  dit(4, `b) $${a / 2}°$ chacune.`);
});
essai("5", () => {
  const [a] = degres(e(5));
  dit(5, `$${a} + ${a} = ${2 * a}$`);
  dit(5, `répondre $${tx(a / 2)}°$`);
  dit(5, `Réponse : $\\widehat{AOB} = ${2 * a}°$.`);
  verif("5. le schéma", val(fig(5, "schema"), `${2 * a}°`), 2 * a);
});
essai("6", () => {
  const [a] = degres(e(6));
  dit(6, `$${a} \\div 2 = ${a / 2}$`);
  dit(6, `$${a / 2} + ${a / 2} = ${a}$`);
  dit(6, `Réponse : $\\widehat{xOm} = ${a / 2}°$.`);
  const g = fig(6, "schema");
  verif("6. y dessiné", direction(point(g, "O"), point(g, "y")), a, 1e-4);
  verif("6. m dessiné", direction(point(g, "O"), point(g, "m")), a / 2, 1e-4);
});
essai("7", () => {
  const g = fig(7, "figure");
  const O = point(g, "O");
  const lire = (n) => arrondi(direction(O, point(g, n)));
  const B = lire("B");
  const [d, ee, ff] = ["D", "E", "F"].map(lire);
  dit(7, `$[OB)$ passe par $${B}$`);
  dit(7, `$${B} \\div 2 = ${B / 2}$`);
  dit(7, `$[OD)$ passe par $${d}$, $[OE)$ par $${ee}$, $[OF)$ par $${ff}$.`);
  vrai("7. seule E est à la moitié", ee === B / 2 && d !== B / 2 && ff !== B / 2);
  vrai("7. graduations lisibles (multiples de 5)", [B, d, ee, ff].every((x) => x % 5 === 0));
  dit(7, "Réponse : $[OE)$.");
});
essai("8", () => {
  const g = fig(8, "figure");
  const O = point(g, "O");
  const [A, M, N, B] = ["A", "M", "N", "B"].map((n) => arrondi(direction(O, point(g, n))));
  vrai("8. M à la moitié, N non", M === (A + B) / 2 && N !== (A + B) / 2);
  dit(8, `mesurent $${M - A}°$ et $${B - M}°$`);
  dit(8, "Réponse : a) faux ; b) vrai ; c) vrai ; d) faux.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a] = degres(e(9));
  dit(9, `$${a} \\div 2 = ${a / 2}$`);
  dit(9, `à $${180 - a / 2}°$ de $[Ox)$`);
  const g = fig(9, "schema");
  verif("9. y dessiné", direction(point(g, "O"), point(g, "y")), a, 1e-4);
  verif("9. z dessiné", direction(point(g, "O"), point(g, "z")), a / 2, 1e-4);
  dit(9, `Réponse : $[Oz)$ fait $${a / 2}°$ avec $[Ox)$ et $${a / 2}°$ avec $[Oy)$.`);
});
essai("10", () => {
  const [a] = degres(e(10));
  dit(10, `$\\widehat{AOB} = ${a} + ${a} = ${2 * a}$`);
  dit(10, `$\\widehat{BOD} = 180 - ${2 * a} = ${180 - 2 * a}$`);
  dit(10, `Réponse : a) $${2 * a}°$ ; b) $${180 - 2 * a}°$.`);
  const g = fig(10, "figure");
  verif("10. BOD dessiné", val(g, "?"), 180 - 2 * a, 1e-4);
  const O = point(g, "O");
  verif("10. [OC) est la bissectrice de AOB (dessin)", tour(direction(O, point(g, "A")) - direction(O, point(g, "C"))), tour(direction(O, point(g, "C")) - direction(O, point(g, "B"))), 1e-3);
});
essai("11", () => {
  const a = 90 / 2, b = a / 2, c = b / 2;
  dit(11, `$90 \\div 2 = ${a}$`);
  dit(11, `$${a} \\div 2 = ${tx(b)}$`);
  dit(11, `$${tx(b)} \\div 2 = ${tx(c)}$`);
  dit(11, `Réponse : a) $${a}°$ ; b) $${tx(b)}°$ ; c) $${tx(c)}°$.`);
  const g = fig(11, "schema");
  verif("11. l'arc « 22,5° » mesure 22,5", val(g, "22,5°"), b);
  verif("11. l'arc « 45° »", val(g, "45°"), a);
});
essai("12", () => {
  const g = fig(12, "figure");
  const [A, B, C, M] = ["A", "B", "C", "M"].map((n) => point(g, n));
  vrai("12. ABC équilatéral", [angleEn(A, B, C), angleEn(B, A, C), angleEn(C, A, B)].every((x) => Math.abs(x - 60) < 1e-3));
  verif("12. l'arc ? en A", val(g, "?"), 30, 1e-4);
  verif("12. AMB", angleEn(M, A, B), 90);
  verif("12. M milieu de [BC]", Math.hypot(M[0] - B[0], M[1] - B[1]), Math.hypot(M[0] - C[0], M[1] - C[1]));
  dit(12, "$60 \\div 2 = 30$");
  dit(12, "Réponse : a) deux angles de $30°$ ; b) $90°$, un angle droit.");
});
essai("13", () => {
  const [p, q] = degres(e(13));
  const g = fig(13, "figure");
  verif("13. les deux arcs", val(g, `${p}°`) + val(g, `${q}°`), 360);
  dit(13, `$${p} + ${q} = 360$`);
  dit(13, `$${p} \\div 2 = ${p / 2}$`);
  dit(13, `Réponse : a) $360°$ ; b) l'angle de $${p}°$ ; c) $${p / 2}°$.`);
  vrai("13. le saillant est le plus petit", p < 180 && q > 180);
});
essai("14", () => {
  dit(14, "$180 \\div 2 = 90$");
  dit(14, "$90 \\div 2 = 45$");
  dit(14, "$90 + 45 = 135$");
  dit(14, "Réponse : a) $90°$ et $90°$ ; b) elles sont perpendiculaires ; c) $135°$.");
  verif("14. le schéma", val(fig(14, "schema"), "135°"), 135);
});
essai("15", () => {
  const [a, t] = degres(e(15));
  dit(15, `$${a} - ${t} = ${a - t}$`);
  dit(15, `$${a} \\div 2 = ${a / 2}$`);
  dit(15, `Réponse : a) $${a - t}°$ ; b) non ; c) à $${a / 2}°$.`);
  const g = fig(15, "figure");
  verif("15. l'arc ? mesure le reste", val(g, "?"), a - t, 1e-4);
});
essai("16", () => {
  const [a] = degres(e(16));
  const c = a / 2, d = c / 2;
  dit(16, `$${a} \\div 2 = ${c}$`);
  dit(16, `$${c} \\div 2 = ${d}$`);
  dit(16, `$${d} + ${c} = ${d + c}$`);
  dit(16, `$\\widehat{AOD} + \\widehat{DOB} = ${d} + ${d + c} = ${a}$`);
  dit(16, `Réponse : a) $${c}°$ et $${d}°$ ; b) $${d + c}°$.`);
  verif("16. le schéma", val(fig(16, "schema"), `${d + c}°`), d + c);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const parts = [180, 90, 45, 22.5];
  dit(17, "$180 \\div 2 = 90$");
  dit(17, "$360 \\div 90 = 4$");
  dit(17, "$90 \\div 2 = 45$");
  dit(17, "$360 \\div 45 = 8$");
  dit(17, "$45 \\div 2 = 22{,}5$");
  vrai("17. 16 parts de 22,5", 360 / parts[3] === 16 && f.c(17).includes("il y a $16$ parts"));
  const g = fig(17, "schema");
  vrai("17. 8 rayons, tous les 45°", g.traits.length === 4 && g.traits.every((t) => Math.abs(tour(direction(t.de, t.vers)) % 45) < 1e-3));
});
essai("18", () => {
  const [a] = degres(e(18));
  const b = Number(/= (\d+)°\$/.exec(e(18))[1]);
  const cob = 180 - a;
  dit(18, `$\\widehat{COB} = 180 - ${a} = ${cob}$`);
  dit(18, `$${a} \\div 2 = ${a / 2}$`);
  dit(18, `$${cob} \\div 2 = ${cob / 2}$`);
  dit(18, `$\\widehat{MON} = ${a / 2} + ${cob / 2} = 90$`);
  dit(18, `Les moitiés font $${b / 2}°$ et $${(180 - b) / 2}°$. Et $${b / 2} + ${(180 - b) / 2} = 90$.`);
  const g = fig(18, "figure");
  const O = point(g, "O");
  verif("18. M bissectrice de AOC (dessin)", direction(O, point(g, "M")), (direction(O, point(g, "A")) + direction(O, point(g, "C"))) / 2, 1e-4);
  verif("18. N bissectrice de COB (dessin)", direction(O, point(g, "N")), (direction(O, point(g, "B")) + direction(O, point(g, "C"))) / 2, 1e-4);
  verif("18. MON droit (dessin)", angleEn(O, point(g, "M"), point(g, "N")), 90);
});
essai("19", () => {
  const g = fig(19, "figure");
  const [p] = degres(f.c(19));
  verif("19. la part dessinée", val(g, `${p}°`), p);
  dit(19, `$${p} + ${p} = ${2 * p}$`);
  dit(19, `de $${2 * p}°$ au rapporteur`);
  dit(19, `marque la graduation $${p}$ : c'est $${2 * p} \\div 2$`);
  verif("19. y dessiné à 2p", direction(point(g, "O"), point(g, "y")), 2 * p, 1e-4);
});
essai("20", () => {
  const [a, t, z, l] = degres(e(20));
  for (const x of [t, z, l]) dit(20, `$${a} - ${x} = ${a - x}$`);
  vrai("20. seule Zoé tombe juste", z === a / 2 && t !== a / 2 && l !== a / 2);
  dit(20, `Réponse : a) $${t}$ et $${a - t}$ ; $${z}$ et $${a - z}$ ; $${l}$ et $${a - l}$ ; b) Zoé ; c) une seule.`);
  verif("20. le schéma", val(fig(20, "schema"), `${a / 2}°`), a / 2);
});

f.fin();
