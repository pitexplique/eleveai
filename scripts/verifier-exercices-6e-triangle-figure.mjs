// Recalcul indépendant de la feuille « Les triangles » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-triangle-figure.tsx.
//
// ⭐ Chaque `tri(…)` est relu dans le source et MESURÉ : un angle étiqueté
// « 64° » doit mesurer 64° sur les coordonnées (à 0,3° près), un côté
// étiqueté « 7,5 cm » doit mesurer 7,5, les côtés codés égaux doivent l'être,
// le petit carré doit marquer 90°. Puis le script relit la NATURE de chaque
// triangle sur ses coordonnées (côtés égaux, sommet principal, plus grand
// angle), recalcule chaque périmètre à partir des nombres de l'ÉNONCÉ, et
// cherche la réponse écrite dans le corrigé.
// ⭐ Le RENDU est simulé : la mise en page de `tri()` est refaite ici, aucune
// étiquette ne doit sortir du cadre ni en chevaucher une autre.
// (Socle et simulation repris de verifier-exercices-5e-triangle-figure.mjs ;
// le bloc `longueurs()` y reste, sans appel sur cette feuille.)
// Usage : node scripts/verifier-exercices-6e-triangle-figure.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-triangle-figure.tsx", "triangle_figure", ["tri"], "6e");
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

/** Les lignes d'un énoncé (le `\n` est écrit tel quel dans le source). */
const lignes = (t) => t.split(/\\n|\n/);

/** La nature d'un triangle selon ses côtés, lue sur les coordonnées. */
const natureCotes = (pts) => {
  const l = ["AB", "BC", "CA"].map((cc) => cote(pts, cc));
  const eg = (a, b) => Math.abs(a - b) < 2e-3 * Math.max(a, b);
  const n = [eg(l[0], l[1]), eg(l[1], l[2]), eg(l[2], l[0])].filter(Boolean).length;
  return n === 3 ? "équilatéral" : n === 1 ? "isocèle" : "quelconque";
};
/** Le sommet principal d'un isocèle : celui qui touche les deux côtés égaux. */
const sommetPrincipal = (pts) => ["A", "B", "C"].find((k) => {
  const [p, q] = voisins[k];
  return Math.abs(dist(pts[k], pts[p]) - dist(pts[k], pts[q])) < 2e-3;
});
/** La nature selon les angles. */
const natureAngles = (pts) => {
  const m = Math.max(...["A", "B", "C"].map((k) => angle(pts, k)));
  return Math.abs(m - 90) < 1e-3 ? "rectangle" : m > 90 ? "obtusangle" : "aigu";
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { o } = tri1(1, "schema");
  const [p, i, n] = [o.noms.A, o.noms.B, o.noms.C];
  const perm = [[p, i, n], [p, n, i], [i, p, n], [i, n, p], [n, p, i], [n, i, p]].map((x) => `$${x.join("")}$`);
  dit(1, perm.join(", ") + ".");
  dit(1, `Il y a $${perm.length}$ noms.`);
  dit(1, `Réponse : a) $${p}${i}${n}$ ; b) $6$ noms ; c) non, $[${p}${n}]$ est un côté.`);
});
essai("2", () => {
  const { o } = tri1(2, "schema");
  const [M, U, R] = [o.noms.A, o.noms.B, o.noms.C];
  enonceDit(2, `Dans le triangle $${M}${U}${R}$`);
  dit(2, `Le côté opposé à $${U}$ ne touche pas $${U}$. C'est $[${M}${R}]$.`);
  dit(2, `Le sommet opposé à $[${U}${R}]$ n'est pas sur ce côté. C'est $${M}$.`);
  vrai("2. le côté surligné est [MR]", o.lignes[0].vers[0] === 3.5 && o.lignes[0].de[0] === 0);
});
essai("3", () => {
  const [a, b] = tris(3, "figure");
  vrai("3. VEI isocèle, BEC équilatéral (sur le dessin)", natureCotes(a.pts) === "isocèle" && natureCotes(b.pts) === "équilatéral");
  const s = a.o.noms[sommetPrincipal(a.pts)];
  dit(3, `il est isocèle en $${s}$`);
  dit(3, `Réponse : $${Object.values(a.o.noms).join("")}$ est isocèle en $${s}$ ; $${Object.values(b.o.noms).join("")}$ est équilatéral.`);
});
essai("4", () => {
  const cas = lignes(e(4)).slice(1).map((l) => nombres(l));
  const nat = cas.map((xs) => {
    const n = new Set(xs).size;
    return n === 1 ? "équilatéral" : n === 2 ? "isocèle" : "quelconque";
  });
  dit(4, `Réponse : a) ${nat[0]} ; b) ${nat[1]} ; c) ${nat[2]} ; d) ${nat[3]}.`);
  vrai("4. d) : deux longueurs proches mais différentes", Math.max(...cas[3]) - Math.min(...cas[3]) <= 0.5 && nat[3] === "isocèle");
  const { pts } = tri1(4, "schema");
  vrai("4. le schéma est le cas a)", natureCotes(pts) === "isocèle" && Math.abs(cote(pts, "AB") - cas[0][1]) < 1e-3);
});
essai("5", () => {
  const [r, ob] = tris(5, "figure");
  vrai("5. EGL rectangle en E", natureAngles(r.pts) === "rectangle" && r.o.droit === "A" && r.o.noms.A === "E");
  vrai("5. HUT obtusangle (104° en H)", natureAngles(ob.pts) === "obtusangle" && Math.abs(angle(ob.pts, "A") - 104) < 0.3);
  dit(5, "Réponse : a) rectangle en $E$ ; b) obtusangle ; c) un triangle aigu.");
});
essai("6", () => {
  const { pts, o } = tri1(6, "figure");
  verif("6. angle droit en A", angle(pts, "A"), 90, 1e-6);
  const [M, T] = [o.noms.B, o.noms.C];
  dit(6, `Le côté opposé à l'angle droit ne touche pas $A$. C'est $[${M}${T}]$.`);
  vrai("6. [MT] est le plus long côté", cote(pts, "BC") > cote(pts, "AB") && cote(pts, "BC") > cote(pts, "CA"));
  dit(6, `Réponse : a) en $A$ ; b) $[A${M}]$ et $[A${T}]$ ; c) $[${M}${T}]$.`);
});
essai("7", () => {
  const { pts, o } = tri1(7, "schema");
  const s = o.noms[sommetPrincipal(pts)];
  vrai("7. isocèle en U sur le dessin", natureCotes(pts) === "isocèle" && s === "U");
  dit(7, `Le triangle est isocèle en $${s}$.`);
  dit(7, `Réponse : a) isocèle ; b) en $${s}$.`);
});
essai("8", () => {
  const { pts, o } = tri1(8, "figure");
  const P = o.points[0].en;
  vrai("8. P est sur [RI]", alignes(pts.A, pts.B, P) && P[0] > pts.A[0] && P[0] < pts.B[0]);
  vrai("8. le segment part de Z vers P", o.lignes[0].de[0] === pts.C[0] && o.lignes[0].vers[0] === P[0]);
  dit(8, "Il y a donc $3$ triangles.");
  dit(8, "Réponse : a) $3$ ; b) $RPZ$, $PIZ$ et $RIZ$.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [k, g] = tris(9, "figure");
  vrai("9. KIT rectangle isocèle en K", natureAngles(k.pts) === "rectangle" && natureCotes(k.pts) === "isocèle" && k.o.noms[sommetPrincipal(k.pts)] === "K");
  vrai("9. GNU isocèle en U, obtusangle", natureAngles(g.pts) === "obtusangle" && g.o.noms[sommetPrincipal(g.pts)] === "U");
  dit(9, "Réponse : $KIT$ rectangle isocèle en $K$ ; $GNU$ isocèle en $U$ et obtusangle.");
});
essai("10", () => {
  const [P] = nombres(e(10));
  const c = Math.round((P / 3) * 1000) / 1000;
  dit(10, `$${tx(P)} \\div 3 = ${tx(c)}$`);
  dit(10, `$${tx(c)} + ${tx(c)} + ${tx(c)} = ${tx(P)}$`);
  const { pts } = tri1(10, "schema");
  verif("10. le schéma", cote(pts, "AB"), c);
  vrai("10. équilatéral", natureCotes(pts) === "équilatéral");
});
essai("11", () => {
  const [a, b] = nombres(e(11));
  dit(11, `$${a} + ${a} + ${b} = ${2 * a + b}$`);
  dit(11, `$${a} + ${b} + ${b}$`);
  dit(11, `Réponse : $${2 * a + b}$ cm.`);
  const { pts } = tri1(11, "schema");
  verif("11. le schéma : IV", cote(pts, "CA"), a, 1e-4);
  verif("11. le schéma : VE", cote(pts, "AB"), b);
});
essai("12", () => {
  const [P, b] = nombres(e(12));
  const c = (P - b) / 2;
  dit(12, `$${P} - ${b} = ${P - b}$`);
  dit(12, `$${P - b} \\div 2 = ${c}$`);
  dit(12, `$${c} + ${c} + ${b} = ${P}$`);
  dit(12, `Réponse : $EN = ${c}$ cm.`);
  verif("12. le schéma", cote(tri1(12, "schema").pts, "BC"), c, 1e-4);
});
essai("13", () => {
  const { pts, o } = tri1(13, "figure");
  const s = o.noms[sommetPrincipal(pts)];
  vrai("13. isocèle en C, base plus courte", natureCotes(pts) === "isocèle" && s === "C" && cote(pts, "AB") < cote(pts, "BC") - 0.5);
  dit(13, `Le triangle est isocèle en $${s}$.`);
});
essai("14", () => {
  const { pts } = tri1(14, "figure");
  const m = ["A", "B", "C"].map((k) => angle(pts, k));
  const max = Math.max(...m);
  vrai("14. le plus grand angle est en U (C)", m[2] === max);
  vrai(`14. il mesure 97° (${max.toFixed(2)})`, Math.abs(max - 97) < 0.3);
  dit(14, "Je lis $97°$.");
  vrai("14. obtusangle", natureAngles(pts) === "obtusangle");
  dit(14, "Réponse : a) $97°$ ; b) obtusangle.");
});
essai("15", () => {
  const [ab, ac] = nombres(e(15));
  const { pts, o } = tri1(15, "schema");
  verif("15. AB", cote(pts, "AB"), ab);
  verif("15. AC", cote(pts, "CA"), ac);
  const bc = Math.round(cote(pts, "BC") * 1000) / 1000;
  dit(15, `$BC = ${tx(bc)}$ cm`);
  vrai("15. rectangle en A, pas isocèle", o.droit === "A" && natureCotes(pts) === "quelconque");
});
essai("16", () => {
  const { pts } = tri1(16, "schema");
  vrai("16. d) isocèle obtusangle à 100°", natureCotes(pts) === "isocèle" && Math.abs(angle(pts, "C") - 100) < 0.3);
  dit(16, "Réponse : a) équilatéral ; b) rectangle isocèle ; c) quelconque ; d) isocèle obtusangle.");
  vrai("16. c) 5, 6, 8 : trois longueurs différentes", new Set(nombres(lignes(e(16))[3])).size === 3);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const { pts } = tri1(17, "figure");
  const c = cote(pts, "AB");
  vrai("17. équilatéral", natureCotes(pts) === "équilatéral");
  dit(17, `$${Math.round(c)} + ${Math.round(c)} + ${Math.round(c)} = ${Math.round(3 * c)}$`);
  dit(17, `$${Math.round(3 * c)}$ cm, soit $${tx(Math.round(3 * c) / 100)}$ m`);
  verif("17. angle de 60°", angle(pts, "A"), 60, 1e-5);
  vrai("17. aigu", natureAngles(pts) === "aigu");
});
essai("18", () => {
  const { pts, o } = tri1(18, "figure");
  const Cc = o.points[0].en;
  const AB = dist(pts.C, pts.A), AD = dist(pts.C, pts.B), BD = dist(pts.A, pts.B);
  const CB = dist(Cc, pts.A), CD = dist(Cc, pts.B);
  verif("18. AB", AB, 30, 1e-5);
  verif("18. AD", AD, 30, 1e-5);
  verif("18. BD", BD, 40, 1e-5);
  verif("18. CB", CB, 55, 1e-5);
  verif("18. CD", CD, 55, 1e-5);
  const [nAB, nCB] = [30, 55];
  vrai("18. l'énoncé donne ces longueurs", e(18).includes(`$AB = AD = ${nAB}$ cm`) && e(18).includes(`$CB = CD = ${nCB}$ cm`) && e(18).includes("$[BD]$ de $40$ cm"));
  dit(18, `$30 + 30 + 40 = ${30 + 30 + 40}$`);
  dit(18, `$55 + 55 + 40 = ${55 + 55 + 40}$`);
  dit(18, `$30 + 30 + 55 + 55 = ${30 + 30 + 55 + 55}$`);
  dit(18, `additionner les deux périmètres, $${100 + 150}$ cm`);
});
essai("19", () => {
  const { pts } = tri1(19, "figure");
  vrai("19. isocèle en C", natureCotes(pts) === "isocèle" && sommetPrincipal(pts) === "C");
  const [aC, aA] = [angle(pts, "C"), angle(pts, "A")];
  vrai(`19. les deux autres ≈ 71° (${aA.toFixed(2)})`, Math.abs(aA - 71) < 0.5);
  dit(19, `$9 + 9 + 6 = 24$`);
  dit(19, `L'angle en $C$ mesure $${Math.round(aC)}°$.`);
  vrai("19. aigu", natureAngles(pts) === "aigu");
});
essai("20", () => {
  const { pts, o } = tri1(20, "figure");
  const [I, J, K] = o.points.map((p) => p.en);
  const mil = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const meme = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-3;
  vrai("20. I, J, K milieux de [AB], [BC], [CA]", meme(I, mil(pts.A, pts.B)) && meme(J, mil(pts.B, pts.C)) && meme(K, mil(pts.C, pts.A)));
  verif("20. côté 8", cote(pts, "AB"), 8, 1e-5);
  verif("20. petit côté 4", dist(I, J), 4, 1e-5);
  dit(20, "$4 + 4 + 4 = 12$");
  dit(20, "$8 + 8 + 8 = 24$");
  dit(20, "$4 \\times 12 = 48$");
  dit(20, "En tout : $5$ triangles.");
});

f.fin();
