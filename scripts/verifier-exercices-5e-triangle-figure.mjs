// Recalcul indépendant de la feuille « Les triangles » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-triangle-figure.tsx.
//
// ⭐ Chaque `tri(…)` est relu dans le source et MESURÉ : un angle étiqueté
// « 64° » doit mesurer 64° sur les coordonnées (à 0,3° près), un côté
// étiqueté « 7,5 cm » doit mesurer 7,5, les côtés codés égaux doivent l'être,
// le petit carré doit marquer 90°. Puis le script recalcule chaque réponse
// (somme des angles, inégalité triangulaire, nature) à partir des nombres de
// l'ÉNONCÉ, la compare au dessin, et la cherche écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `tri()` est refaite ici, aucune
// étiquette ne doit sortir du cadre ni en chevaucher une autre.
// Usage : node scripts/verifier-exercices-5e-triangle-figure.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-triangle-figure.tsx", "triangle_figure", ["tri", "longueurs"]);
const { c, e, vrai, verif, dit, enonceDit, dessins, dessin, essai, appels } = f;

/* ── Géométrie ───────────────────────────────────────────────────────────── */
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const angleEn = (V, p, q) => {
  const [u, w] = [[p[0] - V[0], p[1] - V[1]], [q[0] - V[0], q[1] - V[1]]];
  return (Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))) * 180) / Math.PI;
};
const voisins = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const angle = (pts, k) => angleEn(pts[k], pts[voisins[k][0]], pts[voisins[k][1]]);
const cote = (pts, cc) => dist(pts[cc[0]], pts[cc[1]]);
const tour = (x) => ((x % 360) + 360) % 360;
const direction = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const mesureLibre = (a) => tour(direction(a.en, a.vers) - direction(a.en, a.de));
const nb = (s) => parseFloat(String(s).replace(/\{,\}/g, ".").replace(",", "."));
/** Les nombres des formules $…$ d'un texte, dans l'ordre (les \widehat{…} écartés). */
const nombres = (texte) => [...texte.matchAll(/\$([^$]*)\$/g)].flatMap((m) => [...m[1].replace(/\\widehat\{[^}]*\}/g, "").matchAll(/\d+(?:\{,\}\d+)?/g)].map((x) => nb(x[0])));
/** Comme la feuille les écrit : 5{,}5. */
const tx = (x) => String(Math.round(x * 1000) / 1000).replace(".", "{,}");
const alignes = (p, q, r) => Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])) < 1e-3;

const tris = (k, role) => dessins("tri", k).filter((d) => !role || d.role === role).map((d) => ({ pts: d.args[0], o: d.args[1] ?? {} }));
const tri1 = (k, role) => {
  const t = tris(k, role)[0];
  if (!t) throw new Error(`exercice ${k} : pas de tri (${role ?? ""})`);
  return t;
};

/* ── Contrôles de TOUS les triangles ─────────────────────────────────────── */
const tous = appels("tri").filter((a) => a.args).map((a) => ({ pts: a.args[0], o: a.args[1] ?? {} }));
tous.forEach(({ pts, o }, i) => {
  const n = `tri ${i + 1}`;
  for (const [k, lab] of Object.entries(o.angles ?? {})) {
    const m = /^(\d+)°$/.exec(lab);
    if (m) vrai(`${n} : l'angle en ${k} étiqueté ${lab} mesure ${angle(pts, k).toFixed(2)}°`, Math.abs(angle(pts, k) - Number(m[1])) < 0.3);
  }
  if (o.droit) verif(`${n} : angle droit en ${o.droit}`, angle(pts, o.droit), 90, 1e-4);
  for (const [cc, lab] of Object.entries(o.cotes ?? {})) {
    const m = /^(≈ )?(\d+(?:,\d+)?) (cm|m|km)$/.exec(lab);
    vrai(`${n} : étiquette de côté lisible (${lab})`, !!m);
    if (m) vrai(`${n} : [${cc}] étiqueté ${lab} mesure ${cote(pts, cc).toFixed(3)}`, Math.abs(cote(pts, cc) - nb(m[2])) < (m[1] ? 0.05 : 0.005));
  }
  const eg = o.egaux ?? [];
  vrai(`${n} : les côtés codés égaux le sont`, eg.every((cc) => Math.abs(cote(pts, cc) - cote(pts, eg[0])) < 2e-3));
  // Un côté NON codé n'est pas égal à un côté codé (sinon le codage ment par omission).
  const autres = ["AB", "BC", "CA"].filter((cc) => !eg.includes(cc));
  if (eg.length) vrai(`${n} : aucun côté égal aux côtés codés n'est oublié`, autres.every((cc) => Math.abs(cote(pts, cc) - cote(pts, eg[0])) > 0.05));
  for (const l of o.libres ?? []) {
    const m = /^(\d+)°$/.exec(l.label);
    if (m) vrai(`${n} : l'arc libre ${l.label} mesure ${mesureLibre(l).toFixed(2)}°`, Math.abs(mesureLibre(l) - Number(m[1])) < 0.3);
  }
});

/* ── Le rendu, simulé : la mise en page de tri() refaite ici ─────────────── */
function boites({ pts, o }) {
  const W = 260, H = 200, MARGE = 36;
  const reels = [pts.A, pts.B, pts.C, ...(o.lignes ?? []).flatMap((l) => [l.de, l.vers]), ...(o.points ?? []).map((p) => p.en)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P = { A: px(pts.A), B: px(pts.B), C: px(pts.C) };
  const G = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
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
    const [p, q] = voisins[k].map((v) => P[v]);
    const u1 = unit(p[0] - V[0], p[1] - V[1]), u2 = unit(q[0] - V[0], q[1] - V[1]);
    const ouvert = (Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180) / Math.PI;
    const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
    const loin = 17 + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
    texte(V[0] + bi[0] * loin, V[1] + bi[1] * loin, o.angles[k], "middle");
  }
  for (const a of o.libres ?? []) {
    const V = px(a.en);
    const a1 = Math.atan2(a.de[1] - a.en[1], a.de[0] - a.en[0]);
    const d = (mesureLibre(a) * Math.PI) / 180;
    const r = d < 0.7 ? 30 : 20;
    const am = a1 + d / 2;
    const L = r + (d < 0.7 ? 16 : 14);
    texte(V[0] + L * Math.cos(am), V[1] - L * Math.sin(am), a.label, ancre(Math.cos(am)));
  }
  for (const cc of ["AB", "BC", "CA"]) {
    const t = o.cotes?.[cc];
    if (!t) continue;
    const [p, q] = [P[cc[0]], P[cc[1]]];
    const M = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    let n = unit(-(q[1] - p[1]), q[0] - p[0]);
    if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
    texte(M[0] + n[0] * 14, M[1] + n[1] * 14, t, ancre(n[0]));
  }
  for (const p of o.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, a] = p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
    texte(x + dx, y + dy, p.nom, a, 15);
  }
  for (const k of ["A", "B", "C"]) {
    const V = P[k];
    const d = unit(V[0] - G[0], V[1] - G[1]);
    texte(V[0] + d[0] * 15, V[1] + d[1] * 15, o.noms?.[k] ?? k, ancre(d[0]), 15);
  }
  return { W, H, res };
}
tous.forEach((t, i) => {
  const { W, H, res } = boites(t);
  for (const b of res) vrai(`tri ${i + 1} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, q] = [res[a], res[b]];
      const ox = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0);
      const dy = Math.abs((p.y0 + p.y1) / 2 - (q.y0 + q.y1) / 2);
      vrai(`tri ${i + 1} : « ${p.t} » et « ${q.t} » ne se chevauchent pas`, ox <= 3 || dy >= 18, `recouvrement ${ox.toFixed(0)}, écart vertical ${dy.toFixed(0)}`);
    }
});

/* ── longueurs() : même simulation (mesuré au rendu le 29/09 : « 9 cm » et « plat » sortaient) ── */
appels("longueurs").filter((a) => a.args).forEach(({ args: [cas, unite = "cm"] }, i) => {
  const h = 98, W = 260, H = h * cas.length;
  const s = 200 / Math.max(...cas.map((x) => Math.max(x.grand, x.petits[0] + x.petits[1])));
  const res = [];
  // Boîte d'un texte posé sur sa ligne de base : 11 au-dessus, 4 en dessous (police 14).
  const texte = (x, y, t, a) => {
    const l = t.length * 14 * 0.6;
    const [ga, dr] = a === "end" ? [l, 0] : [l / 2, l / 2];
    res.push({ t, x0: x - ga, x1: x + dr, y0: y - 11, y1: y + 4 });
  };
  cas.forEach(({ grand, petits: [a, b] }, j) => {
    const y = j * h, x0 = 22;
    const somme = Math.round((a + b) * 1000) / 1000;
    texte(x0 + (grand * s) / 2, y + 18, `${grand} ${unite}`, "middle");
    texte(x0 + (a * s) / 2, y + 72, String(a), "middle");
    texte(x0 + a * s + (b * s) / 2, y + 72, String(b), "middle");
    texte(254, y + 92, somme > grand ? "triangle" : somme === grand ? "plat" : "pas de triangle", "end");
  });
  for (const b of res) vrai(`longueurs ${i + 1} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, q] = [res[a], res[b]];
      const ox = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0);
      const oy = Math.min(p.y1, q.y1) - Math.max(p.y0, q.y0);
      vrai(`longueurs ${i + 1} : « ${p.t} » et « ${q.t} » ne se chevauchent pas`, ox <= 0 || oy <= -3);
    }
});

/** Le verdict de l'inégalité triangulaire, sur trois longueurs. */
const verdict = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const somme = Math.round((s[0] + s[1]) * 1000) / 1000;
  return somme > s[2] ? "oui" : somme === s[2] ? "plat" : "non";
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { o } = tri1(1, "figure");
  const [R, S, T] = [o.noms.A, o.noms.B, o.noms.C];
  dit(1, `celui qui NE touche PAS $${R}$ : c'est $[${S}${T}]$`);
  dit(1, `Réponse : a) $${R}$, $${S}$, $${T}$ et $[${R}${S}]$, $[${S}${T}]$, $[${T}${R}]$ ; b) $[${S}${T}]$ ; c) $[${S}${R}]$ et $[${S}${T}]$.`);
});
essai("2", () => {
  const [k, p] = tris(2, "figure");
  vrai("2. KLM : angle droit en K et KL = KM", Math.abs(angle(k.pts, "A") - 90) < 1e-6 && Math.abs(cote(k.pts, "AB") - cote(k.pts, "CA")) < 1e-9);
  vrai("2. PQR : trois côtés égaux", ["AB", "BC", "CA"].every((cc) => Math.abs(cote(p.pts, cc) - 4) < 1e-3));
  dit(2, "Réponse : $KLM$ est rectangle isocèle en $K$ ; $PQR$ est équilatéral.");
});
essai("3", () => {
  const lignes = e(3).split("\\n").slice(1).map(nombres);
  const nature = (l, i) => (i === 1 ? (l.includes(90) && l.reduce((a, b) => a + b) === 180 ? "rectangle" : "?") : new Set(l.length === 1 ? [l[0], l[0], l[0]] : l).size === 1 ? "équilatéral" : new Set(l).size === 2 ? "isocèle" : "aucune nature particulière");
  const natures = lignes.map(nature);
  vrai(`3. natures recalculées (${natures})`, natures.join() === "isocèle,rectangle,équilatéral,aucune nature particulière");
  dit(3, `Réponse : a) ${natures[0]} ; b) ${natures[1]} ; c) ${natures[2]} ; d) ${natures[3]}.`);
  const { pts, o } = tri1(3, "schema");
  vrai("3. le schéma est le triangle du a)", JSON.stringify(Object.values(o.cotes).map(nb).sort()) === JSON.stringify([...lignes[0]].sort()) && Math.abs(cote(pts, "BC") - 6.5) < 1e-3);
});
essai("4", () => {
  const lignes = e(4).split("\\n").slice(1).map(nombres);
  const v = lignes.map(verdict);
  vrai(`4. verdicts (${v})`, v.join() === "non,oui,plat");
  lignes.forEach((l) => {
    const s = [...l].sort((a, b) => a - b);
    dit(4, `$${tx(s[0])} + ${tx(s[1])} = ${tx(s[0] + s[1])}$`);
  });
  dit(4, "Réponse : a) non ; b) oui ; c) non, il est aplati.");
  const [cas] = dessin("longueurs", 4);
  vrai("4. le dessin porte les trois cas", cas.every((x, i) => JSON.stringify([x.grand, ...x.petits].sort((a, b) => a - b)) === JSON.stringify([...lignes[i]].sort((a, b) => a - b))));
});
essai("5", () => {
  const [a, b] = nombres(e(5));
  const { pts, o } = tri1(5, "figure");
  const x = 180 - a - b;
  vrai("5. l'angle F dessiné", Math.abs(angle(pts, "C") - x) < 0.3 && o.angles.A === `${a}°` && o.angles.B === `${b}°`);
  dit(5, `$${a} + ${b} = ${a + b}$`);
  dit(5, `$\\widehat{F} = 180° - ${a + b}° = ${x}°$`);
  dit(5, `$${a} + ${b} + ${x} = 180$`);
  dit(5, `Réponse : $\\widehat{F} = ${x}°$.`);
});
essai("6", () => {
  const [k] = nombres(e(6));
  dit(6, `$90 + ${k} = ${90 + k}$, puis $180 - ${90 + k} = ${90 - k}$`);
  dit(6, `$90 - ${k} = ${90 - k}$`);
  dit(6, `Réponse : $\\widehat{M} = ${90 - k}°$.`);
  const { pts } = tri1(6, "schema");
  vrai("6. le schéma", Math.abs(angle(pts, "B") - k) < 0.3 && Math.abs(angle(pts, "C") - (90 - k)) < 0.3);
});
essai("7", () => {
  const [a] = nombres(e(7));
  const b = (180 - a) / 2;
  dit(7, `$180 - ${a} = ${180 - a}$`);
  dit(7, `$${180 - a} \\div 2 = ${b}$`);
  dit(7, `$${a} + ${b} + ${b} = 180$`);
  dit(7, `Réponse : $\\widehat{B} = \\widehat{C} = ${b}°$.`);
});
essai("8", () => {
  const [ab, ac, bc] = nombres(e(8));
  const { pts, o } = tri1(8, "schema");
  vrai("8. le triangle dessiné a les longueurs de l'énoncé", Math.abs(cote(pts, "AB") - ab) < 1e-3 && Math.abs(cote(pts, "CA") - ac) < 1e-3 && Math.abs(cote(pts, "BC") - bc) < 1e-3 && o.arcs === true);
  vrai("8. il existe", verdict([ab, ac, bc]) === "oui");
  dit(8, `$${tx(ac)} + ${tx(bc)} = ${tx(ac + bc)}$, plus grand que $${tx(ab)}$`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a, b, ...choix] = nombres(e(9));
  const bons = choix.filter((x) => verdict([a, b, x]) === "oui");
  vrai(`9. les bonnes baguettes : ${bons}`, bons.join() === "5,13");
  dit(9, `$${a} + 3 = 8 < ${b}$`);
  dit(9, `$${a} + 4 = ${b}$, égal à $${b}$ : aplati`);
  dit(9, `$${a} + 5 = 10 > ${b}$`);
  dit(9, `$${a} + ${b} = ${a + b} > 13$`);
  dit(9, `$${a + b} < 15$`);
  dit(9, `Réponse : les baguettes de $${bons[0]}$ cm et de $${bons[1]}$ cm.`);
  const [cas] = dessin("longueurs", 9);
  vrai("9. le schéma : les deux cas aplatis", cas.every((x) => verdict([x.grand, ...x.petits]) === "plat"));
});
essai("10", () => {
  const [rs, r, s] = nombres(e(10));
  const t = 180 - r - s;
  dit(10, `$${r} + ${s} = ${r + s}$, et $180 - ${r + s} = ${t}$`);
  dit(10, `Réponse : b) $\\widehat{T} = ${t}°$.`);
  const { pts } = tri1(10, "schema");
  vrai("10. le triangle dessiné", Math.abs(cote(pts, "AB") - rs) < 1e-3 && Math.abs(angle(pts, "A") - r) < 0.3 && Math.abs(angle(pts, "B") - s) < 0.3);
});
essai("11", () => {
  const [ef, eg, a] = nombres(e(11));
  const fg = Math.sqrt(ef * ef + eg * eg - 2 * ef * eg * Math.cos((a * Math.PI) / 180));
  const { pts } = tri1(11, "schema");
  verif("11. FG dessiné = FG calculé (loi des cosinus, contrôle du script seulement)", cote(pts, "BC"), fg, 1e-4);
  dit(11, `$FG \\approx ${tx(Math.round(fg * 10) / 10)}$ cm`);
  vrai("11. obtus", a > 90);
});
essai("12", () => {
  const [b, a] = nombres(e(12));
  const cc = 180 - a - b;
  dit(12, `$${b} + ${a} = ${a + b}$, et $180 - ${a + b} = ${cc}$`);
  vrai("12. deux angles égaux, en B et C", cc === b);
  dit(12, "Réponse : a) $\\widehat{C} = 72°$ ; b) isocèle en $A$, avec $AB = AC$.");
});
essai("13", () => {
  const lignes = e(13).split("\\n").slice(1).map(nombres);
  lignes[3] = [90, ...lignes[3]];
  const sommes = lignes.map((l) => l.reduce((x, y) => x + y));
  dit(13, `$95 + 45 + 40 = ${sommes[0]}$`);
  dit(13, `$100 + 90 = ${sommes[1]}$`);
  dit(13, `$61 + 59 + 62 = ${sommes[2]}$`);
  dit(13, `$90 + 48 + 42 = ${sommes[3]}$`);
  const v = sommes.map((s, i) => (s === 180 && lignes[i].length === 3 ? "oui" : "non"));
  dit(13, `Réponse : a) ${v[0]} ; b) ${v[1]} ; c) ${v[2]} ; d) ${v[3]}.`);
});
essai("14", () => {
  const [a, b] = nombres(e(14));
  const cc = 180 - a - b;
  const { pts } = tri1(14, "figure");
  vrai("14. l'angle C dessiné", Math.abs(angle(pts, "C") - cc) < 0.3);
  vrai("14. AB = AC sur le dessin", Math.abs(cote(pts, "AB") - cote(pts, "CA")) < 1e-3);
  dit(14, `$${a} + ${b} = ${a + b}$, et $180 - ${a + b} = ${cc}$`);
  dit(14, `Réponse : a) $\\widehat{C} = ${cc}°$ ; b) isocèle ; c) $AB = AC$.`);
});
essai("15", () => {
  const [a, ext] = nombres(e(15));
  const acb = 180 - ext, b = 180 - a - acb;
  const { pts, o } = tri1(15, "figure");
  const D = o.points.find((p) => p.nom === "D").en;
  vrai("15. B, C, D alignés, D au-delà de C", alignes(pts.B, pts.C, D) && D[0] > pts.C[0]);
  vrai("15. l'angle B dessiné", Math.abs(angle(pts, "B") - b) < 0.3);
  dit(15, `$\\widehat{ACB} = 180° - ${ext}° = ${acb}°$`);
  dit(15, `$${a} + ${acb} = ${a + acb}$, et $180 - ${a + acb} = ${b}$`);
  dit(15, `Réponse : a) $\\widehat{ACB} = ${acb}°$ ; b) $\\widehat{ABC} = ${b}°$.`);
});
essai("16", () => {
  const [np, base] = nombres(e(16));
  const m = 180 - 2 * base;
  dit(16, `$${base} + ${base} = ${2 * base}$, et $180 - ${2 * base} = ${m}$`);
  dit(16, `Réponse : b) $\\widehat{NMP} = ${m}°$.`);
  const { pts } = tri1(16, "schema");
  vrai("16. le triangle dessiné", Math.abs(cote(pts, "AB") - np) < 1e-3 && Math.abs(angle(pts, "C") - m) < 0.3);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [sol, pan, court, a] = nombres(e(17));
  const { pts } = tri1(17, "figure");
  vrai("17. la tente dessinée", Math.abs(cote(pts, "AB") - sol) < 1e-3 && Math.abs(cote(pts, "BC") - pan) < 1e-3 && Math.abs(cote(pts, "CA") - pan) < 1e-3);
  vrai(`17. l'angle à la base mesure environ ${a}° (${angle(pts, "A").toFixed(2)})`, Math.round(angle(pts, "A")) === a);
  vrai("17. des pans de 1,1 m ne ferment pas", verdict([court, court, sol]) === "non");
  dit(17, `$${tx(court)} + ${tx(court)} = ${tx(2 * court)}$, plus petit que $${tx(sol)}$`);
  dit(17, `$${a} + ${a} = ${2 * a}$, et $180 - ${2 * a} = ${180 - 2 * a}$`);
  dit(17, `$\\widehat{C} \\approx ${180 - 2 * a}°$`);
  dit(17, `En dessous de $${tx(sol / 2)}$ m chacun`);
});
essai("18", () => {
  const [ab, bc] = nombres(e(18));
  dit(18, `$AC < ${ab} + ${bc} = ${ab + bc}$`);
  dit(18, `$AC > ${ab} - ${bc} = ${ab - bc}$`);
  dit(18, `$${ab - bc} + ${bc} = ${ab}$`);
  vrai("18. 15 km impossible, 7 km possible", verdict([ab, bc, 15]) === "non" && verdict([ab, bc, 7]) === "oui");
  dit(18, `$${bc} + 7 = ${bc + 7} > ${ab}$`);
  dit(18, `Réponse : a) entre $${ab - bc}$ et $${ab + bc}$ km`);
  const [cas] = dessin("longueurs", 18);
  vrai("18. le schéma : 4 km aplati, 15 km impossible", verdict([cas[0].grand, ...cas[0].petits]) === "plat" && verdict([cas[1].grand, ...cas[1].petits]) === "non");
});
essai("19", () => {
  const { pts, o } = tri1(19, "figure");
  const D = o.points[0].en;
  vrai("19. D est sur [AC]", alignes(pts.A, pts.C, D) && D[1] > 0 && D[1] < pts.A[1]);
  const [x, y] = o.libres.map(mesureLibre);
  const A = angle(pts, "A"), B = angle(pts, "B");
  verif("19. angle au sommet 36°", A, 36, 1e-4);
  verif("19. [BD] partage B en deux", x, y, 1e-4);
  verif("19. x = 36", x, B / 2, 1e-4);
  const bdc = 180 - x - angle(pts, "C");
  verif("19. BDC mesuré sur le dessin", angleEn(D, pts.B, pts.C), bdc, 1e-3);
  vrai("19. BDC isocèle en B, ABD isocèle en D (longueurs)", Math.abs(dist(pts.B, D) - dist(pts.B, pts.C)) < 1e-3 && Math.abs(dist(D, pts.A) - dist(D, pts.B)) < 1e-3);
  dit(19, `$${180 - Math.round(A)} \\div 2 = ${Math.round(B)}$`);
  dit(19, `$x = y = ${Math.round(B)} \\div 2 = ${Math.round(x)}$`);
  dit(19, `$\\widehat{BDC} = 180 - ${Math.round(x + angle(pts, "C"))} = ${Math.round(bdc)}$`);
  dit(19, `$\\widehat{ADB} = 180 - ${Math.round(bdc)} = ${180 - Math.round(bdc)}$`);
});
essai("20", () => {
  const [ab, a, b] = nombres(e(20));
  const cc = 180 - a - b;
  const { pts } = tri1(20, "schema");
  vrai("20. le triangle dessiné", Math.abs(cote(pts, "AB") - ab) < 1e-3 && Math.abs(angle(pts, "A") - a) < 0.3 && Math.abs(angle(pts, "B") - b) < 0.3);
  vrai("20. isocèle en B : BC = BA", Math.abs(cote(pts, "BC") - ab) < 1e-3);
  dit(20, `$${a} + ${b} = ${a + b}$, et $180 - ${a + b} = ${cc}$`);
  dit(20, `$BC = ${ab}$ km`);
  const ac = Math.round(cote(pts, "CA") * 10) / 10;
  dit(20, `$AC \\approx ${tx(ac)}$ cm`);
  dit(20, `environ $${tx(ac)}$ km du phare $A$`);
});

f.fin();
