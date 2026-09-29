// Recalcul indépendant de la feuille « Les angles du triangle et le triangle possible » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-triangle-propriete.tsx.
//
// ⭐ Chaque `tri(…)` est relu dans le source et MESURÉ : un angle étiqueté
// « 64° » doit mesurer 64° sur les coordonnées (à 0,3° près), un côté
// étiqueté « 7,5 cm » doit mesurer 7,5, les côtés codés égaux doivent l'être,
// le petit carré doit marquer 90°. Puis le script recalcule chaque réponse
// (somme des angles, inégalité triangulaire, nature) à partir des nombres de
// l'ÉNONCÉ, la compare au dessin, et la cherche écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `tri()` est refaite ici, aucune
// étiquette ne doit sortir du cadre ni en chevaucher une autre.
// Usage : node scripts/verifier-exercices-6e-triangle-propriete.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-triangle-propriete.tsx", "triangle_propriete", ["tri", "longueurs", "geo"], "6e");
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

/* ── geo() : les deux figures sans triangle fermé (8 et 20) ──────────────── */
const vecT = (t) => [t.vers[0] - t.de[0], t.vers[1] - t.de[1]];
const surTrait = (p, t) => {
  const u = vecT(t), w = [p[0] - t.de[0], p[1] - t.de[1]];
  const n = Math.hypot(...u);
  const k = (u[0] * w[0] + u[1] * w[1]) / (n * n);
  return Math.abs(u[0] * w[1] - u[1] * w[0]) / n < 2e-3 && k > -1e-3 && k < 1 + 1e-3;
};
const geos = appels("geo").filter((a) => a.args).map((a) => a.args[0]);
geos.forEach((g, i) => {
  for (const a of g.arcs ?? []) {
    const m = /^(\d+)°$/.exec(a.label ?? "");
    if (m) vrai(`geo ${i + 1} : l'arc « ${a.label} » mesure ${mesureLibre(a).toFixed(2)}°`, Math.abs(mesureLibre(a) - Number(m[1])) < 0.3);
    for (const bout of [a.de, a.vers]) {
      const u = [bout[0] - a.en[0], bout[1] - a.en[1]];
      const n = Math.hypot(...u);
      const pas = [a.en[0] + (0.05 * u[0]) / n, a.en[1] + (0.05 * u[1]) / n];
      vrai(`geo ${i + 1} : l'arc « ${a.label} » s'appuie sur un trait dessiné`, g.traits.some((t) => surTrait(a.en, t) && surTrait(pas, t)));
    }
  }
  // Le rendu simulé (copie de verifier-exercices-6e-angle-mesure.mjs).
  const W = 300, HMAX = 232, m = 28;
  const reels = [...g.traits.flatMap((t) => [t.de, t.vers]), ...(g.points ?? []).map((p) => p.en), ...(g.arcs ?? []).map((a) => a.en)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const res = [];
  const texte = (x, y, t, an, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = an === "start" ? [0, l] : an === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr), by = Math.min(Math.max(y, 10), H - 8);
    res.push({ t, x0: bx - ga, x1: bx + dr, y0: by - taille / 2, y1: by + taille / 2 });
  };
  const ancre = (c) => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");
  for (const a of g.arcs ?? []) {
    if (a.droit || !a.label) continue;
    const V = px(a.en);
    const a1 = Math.atan2(a.de[1] - a.en[1], a.de[0] - a.en[0]);
    const d = (mesureLibre(a) * Math.PI) / 180;
    const r = a.rayon ?? (d < 0.7 ? 30 : 21);
    const am = a1 + d / 2, L = r + (d < 0.5 ? 17 : 14);
    texte(V[0] + L * Math.cos(am), V[1] - L * Math.sin(am), a.label, ancre(Math.cos(am)));
  }
  const decal = { haut: [0, -13, "middle"], bas: [0, 15, "middle"], gauche: [-9, 0, "end"], droite: [9, 0, "start"], hg: [-7, -11, "end"], hd: [7, -11, "start"], bg: [-7, 13, "end"], bd: [7, 13, "start"] };
  for (const p of g.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, an] = decal[p.vers ?? "bas"];
    texte(x + dx, y + dy, p.nom, an, 15);
  }
  for (const b of res) vrai(`geo ${i + 1} : « ${b.t} » dans le cadre`, b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H);
  for (let a = 0; a < res.length; a++)
    for (let b = a + 1; b < res.length; b++) {
      const [p, q] = [res[a], res[b]];
      const oxx = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0);
      const dy = Math.abs((p.y0 + p.y1) / 2 - (q.y0 + q.y1) / 2);
      vrai(`geo ${i + 1} : « ${p.t} » et « ${q.t} » ne se chevauchent pas`, oxx <= 3 || dy >= 18);
    }
});

/** Les nombres suivis de ° dans les formules d'un texte. */
const degres = (texte) => [...texte.matchAll(/\$(\d+)°\$/g)].map((m) => Number(m[1]));
/** Les lignes d'un énoncé (le `\n` est écrit tel quel dans le source). */
const lignes = (t) => t.split(/\\n|\n/);
/** Le verdict de l'inégalité triangulaire, sur trois longueurs. */
const verdict = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const somme = Math.round((s[0] + s[1]) * 1000) / 1000;
  return somme > s[2] ? "oui" : somme === s[2] ? "plat" : "non";
};
/** Les cas d'un appel longueurs() de l'exercice k. */
const cas = (k) => dessins("longueurs", k)[0].args[0];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { pts } = tri1(1, "figure");
  const [a, b, c] = ["A", "B", "C"].map((k) => Math.round(angle(pts, k)));
  dit(1, `$${a} + ${b} = ${a + b}$, puis $${a + b} + ${c} = ${a + b + c}$`);
  vrai("1. la somme fait 180", a + b + c === 180);
});
essai("2", () => {
  const [a, b] = degres(e(2));
  dit(2, `$${a} + ${b} = ${a + b}$`);
  dit(2, `$180 - ${a + b} = ${180 - a - b}$`);
  dit(2, `$${a} + ${b} + ${180 - a - b} = 180$`);
  dit(2, `$180 - ${a} = ${180 - a}$`);
  dit(2, `Réponse : $${180 - a - b}°$.`);
  verif("2. le schéma", angle(tri1(2, "schema").pts, "C"), 180 - a - b, 1e-3);
});
essai("3", () => {
  const [a] = degres(e(3));
  dit(3, `$90 + ${a} = ${90 + a}$`);
  dit(3, `$180 - ${90 + a} = ${90 - a}$`);
  dit(3, `$${a} + ${90 - a} = 90$`);
  dit(3, `Réponse : $${90 - a}°$.`);
  verif("3. le schéma", angle(tri1(3, "schema").pts, "C"), 90 - a, 1e-3);
});
essai("4", () => {
  const trios = lignes(e(4)).slice(1).map((l) => nombres(l));
  const v = trios.map(verdict);
  const mots = v.map((x) => (x === "oui" ? "oui" : "non"));
  dit(4, `Réponse : a) ${mots[0]} ; b) ${mots[1]} ; c) ${mots[2]}.`);
  vrai("4. c) est le cas aplati", v[2] === "plat");
  const cs = cas(4);
  vrai("4. le dessin reprend les trois trios", cs.every((x, i) => JSON.stringify([...x.petits, x.grand].sort((p, q) => p - q)) === JSON.stringify([...trios[i]].sort((p, q) => p - q))));
  trios.forEach((t, i) => {
    const s = [...t].sort((p, q) => p - q);
    dit(4, `$${s[0]} + ${s[1]} = ${s[0] + s[1]}$`);
    void i;
  });
});
essai("5", () => {
  const [l1, l2] = lignes(e(5)).slice(1).map((l) => nombres(l));
  const s1 = l1.reduce((x, y) => x + y), s2 = l2.reduce((x, y) => x + y);
  dit(5, `$${l1[0] + l1[1]} + ${l1[2]} = ${s1}$`);
  dit(5, `$${l2[0] + l2[1]} + ${l2[2]} = ${s2}$`);
  vrai("5. a) non, b) oui", s1 !== 180 && s2 === 180);
  const { pts } = tri1(5, "schema");
  verif("5. le schéma : 72° au sommet", angle(pts, "C"), l2[0], 1e-3);
});
essai("6", () => {
  const [a, b] = degres(e(6));
  dit(6, `$${a} + ${b} = ${a + b}$`);
  dit(6, `$180 - ${a + b} = ${180 - a - b}$`);
  dit(6, `$180 - ${a} = ${180 - a}$`);
  dit(6, `Réponse : $${180 - a - b}°$.`);
  verif("6. le schéma", angle(tri1(6, "schema").pts, "C"), 180 - a - b, 1e-3);
});
essai("7", () => {
  dit(7, "Il reste $180 - 90 = 90$");
  const { pts, o } = tri1(7, "schema");
  vrai("7. rectangle en A", o.droit === "A" && Math.abs(angle(pts, "A") - 90) < 1e-6);
  verif("7. les deux autres font 90", angle(pts, "B") + angle(pts, "C"), 90, 1e-6);
});
essai("8", () => {
  const [a, b] = degres(e(8));
  dit(8, `$${a} + ${b} = ${a + b}$`);
  vrai("8. plus de 180", a + b > 180);
  const g = dessins("geo", 8)[0].args[0];
  const [ra, rb] = [g.traits[1], g.traits[2]];
  const dirA = direction(ra.de, ra.vers), dirB = direction(rb.de, rb.vers);
  vrai("8. les deux côtés s'écartent (ne se coupent pas au-dessus)", dirA > dirB);
  vrai("8. les angles dessinés", Math.abs(mesureLibre(g.arcs[0]) - a) < 0.3 && Math.abs(mesureLibre(g.arcs[1]) - b) < 0.3);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a, b] = degres(e(9));
  dit(9, `$${a} + ${b} = ${a + b}$. Puis $180 - ${a + b} = ${180 - a - b}$.`);
  vrai("9. angle droit", 180 - a - b === 90);
  verif("9. le schéma", angle(tri1(9, "schema").pts, "C"), 90, 1e-3);
});
essai("10", () => {
  const [b] = degres(e(10));
  dit(10, `$${b} + ${b} = ${2 * b}$`);
  dit(10, `$180 - ${2 * b} = ${180 - 2 * b}$`);
  dit(10, `$${180 - 2 * b} + ${b} + ${b} = 180$`);
  dit(10, `Réponse : a) $${b}°$ ; b) $${180 - 2 * b}°$.`);
  const { pts } = tri1(10, "figure");
  verif("10. l'apex dessiné", angle(pts, "C"), 180 - 2 * b, 1e-3);
});
essai("11", () => {
  const [p, q] = nombres(lignes(e(11))[0]);
  const troisiemes = nombres(lignes(e(11))[2]);
  const v = troisiemes.map((x) => verdict([p, q, x]));
  vrai(`11. verdicts ${v}`, JSON.stringify(v) === JSON.stringify(["non", "plat", "oui", "non"]));
  for (const x of troisiemes) {
    // Les deux petits côtés, dans l'ordre où le corrigé les écrit (le 4 d'abord).
    const t = [p, q, x];
    const s = t.filter((_, i) => i !== t.indexOf(Math.max(...t)));
    dit(11, `$${s[0]} + ${s[1]} = ${s[0] + s[1]}$`);
  }
  dit(11, "Réponse : a) non ; b) non ; c) oui ; d) non.");
  vrai("11. le dessin reprend les quatre cas", cas(11).every((c, i) => c.grand === Math.max(p, q, troisiemes[i])));
});
essai("12", () => {
  const [a, b, c] = nombres(e(12));
  dit(12, `$${a} + ${b} = ${a + b}$`);
  vrai("12. impossible", verdict([a, b, c]) === "non");
  vrai("12. le dessin", cas(12)[0].grand === c && cas(12)[0].petits.join() === [a, b].join());
});
essai("13", () => {
  const [a] = degres(e(13));
  dit(13, `$90 + ${a} = ${90 + a}$`);
  dit(13, `$180 - ${90 + a} = ${90 - a}$`);
  dit(13, `Réponse : $${90 - a}°$.`);
  const { pts } = tri1(13, "figure");
  verif("13. l'angle au mur, mesuré", angle(pts, "C"), 90 - a, 1e-3);
});
essai("14", () => {
  const [ext, a] = degres(e(14));
  const c = 180 - ext, b = 180 - a - c;
  dit(14, `$180 - ${ext} = ${c}$`);
  dit(14, `$${a} + ${c} = ${a + c}$. Puis $180 - ${a + c} = ${b}$.`);
  dit(14, `Réponse : a) $${c}°$ ; b) $${b}°$.`);
  const { pts, o } = tri1(14, "figure");
  verif("14. angle en C dessiné", angle(pts, "B"), c, 1e-3);
  verif("14. angle en B dessiné", angle(pts, "A"), b, 1e-3);
  vrai("14. B, C, D alignés", alignes(pts.A, pts.B, o.points[0].en));
});
essai("15", () => {
  const [g1, g2] = tris(15, "figure");
  vrai("15. mêmes angles", ["A", "B", "C"].every((k) => Math.abs(angle(g1.pts, k) - angle(g2.pts, k)) < 1e-3));
  vrai("15. DEF plus grand", cote(g2.pts, "AB") > cote(g1.pts, "AB"));
  dit(15, "Réponse : a) vrai ; b) vrai ; c) faux.");
});
essai("16", () => {
  const [b] = degres(e(16));
  const [x, y] = [...e(16).matchAll(/= (\d+)°\$/g)].map((m) => Number(m[1]));
  const A = x + y, C = 180 - b - A;
  dit(16, `$${x} + ${y} = ${A}$`);
  dit(16, `$${b} + ${A} = ${b + A}$. Puis $180 - ${b + A} = ${C}$.`);
  dit(16, `$180 - ${b} - ${x} = ${180 - b - x}$`);
  dit(16, `$180 - ${A} - ${y} = ${180 - A - y}$`);
  dit(16, `$${180 - b - x} + ${180 - A - y} = 180$`);
  vrai("16. A = C", A === C);
  const { pts, o } = tri1(16, "figure");
  verif("16. angle en C dessiné", angle(pts, "B"), C, 1e-3);
  vrai("16. D sur [BC]", alignes(pts.A, pts.B, o.points[0].en));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [top] = degres(e(17));
  const base = (180 - top) / 2;
  dit(17, `$180 - ${top} = ${180 - top}$`);
  dit(17, `$${180 - top} \\div 2 = ${base}$`);
  dit(17, `$${base} + 90 = ${base + 90}$. Puis $180 - ${base + 90} = ${90 - base}$.`);
  dit(17, `$${90 - base} + ${90 - base} = ${top}$`);
  const { pts } = tri1(17, "figure");
  verif("17. angle du bas dessiné", angle(pts, "A"), base, 1e-3);
  dit(17, "$3 + 3 = 6$ m. C'est plus petit que $6{,}5$ m");
  vrai("17. c) impossible", verdict([3, 3, 6.5]) === "non");
});
essai("18", () => {
  const [ab, bc] = nombres(lignes(e(18))[0]);
  const ac = nombres(lignes(e(18))[1]);
  const v = ac.map((x) => verdict([ab, bc, x]));
  vrai(`18. verdicts ${v}`, JSON.stringify(v) === JSON.stringify(["non", "oui", "plat", "non"]));
  dit(18, `$${ab} + ${bc} = ${ab + bc}$, égal.`);
  dit(18, `Le détour allonge de $${ab + bc} - 15 = ${ab + bc - 15}$ km.`);
});
essai("19", () => {
  const trios = [];
  for (let a = 1; a <= 10; a++) for (let b = a; b <= 10; b++) { const c = 10 - a - b; if (c >= b) trios.push([a, b, c]); }
  dit(19, trios.map(([a, b, c]) => `$${a}+${b}+${c}$`).join(", ") + ".");
  const ok = trios.filter((t) => verdict(t) === "oui");
  vrai(`19. deux triangles possibles (${ok.map((t) => t.join("-"))})`, ok.length === 2 && ok.every((t) => new Set(t).size === 2));
  dit(19, `Réponse : a) non ; b) $${ok[0].join("$-$")}$ et $${ok[1].join("$-$")}$ ; c) isocèles.`);
  vrai("19. a) 1-4-5 aplati", verdict([1, 4, 5]) === "plat");
});
essai("20", () => {
  const [a, b] = degres(e(20));
  dit(20, `$${a} + ${b} = ${a + b}$. Puis $180 - ${a + b} = ${180 - a - b}$.`);
  dit(20, `$${a} + ${b} + ${180 - a - b} = 180$`);
  const { pts } = tri1(20, "figure");
  verif("20. le triangle dessiné", angle(pts, "C"), 180 - a - b, 1e-3);
  const g = dessins("geo", 20)[0].args[0];
  verif("20. les trois coins font un angle plat", g.arcs.reduce((s, x) => s + mesureLibre(x), 0), 180, 1e-6);
  verif("20. le coin « ? » = le troisième angle", mesureLibre(g.arcs[2]), 180 - a - b, 1e-3);
});

f.fin();
