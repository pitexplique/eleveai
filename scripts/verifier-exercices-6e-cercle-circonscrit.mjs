// Recalcul indépendant de la feuille « Médiatrices et cercle circonscrit » de
// 6e (30/09/2026) : lib/fiches-exercices/maths-6e-cercle-circonscrit.tsx.
//
// ⭐ L'AUTRE CHEMIN : le composant `geo` trace les médiatrices par « milieu +
// perpendiculaire » ; ce script, lui, trouve le centre du cercle circonscrit
// en RÉSOLVANT deux équations (X est à égale distance de A et B, et de A et C :
// 2 (B − A)·X = |B|² − |A|², idem pour C), puis vérifie :
//   · que le point O dessiné est ce centre (au centième près) ;
//   · que O est sur CHAQUE médiatrice dessinée (OX = OY) ;
//   · que chaque cercle « de centre X passant par Y » passe bien par les points
//     que le corrigé annonce, et rate ceux qu'il annonce ratés ;
//   · chaque distance de l'énoncé, mesurée sur les coordonnées.
// ⭐ LE RENDU : la mise en page de `geo` est rejouée (même calcul que le
// composant) : cadre de 300 au plus ; aucune étiquette sur une autre, sur un
// point, sur un trait (côté, médiatrice, segment) ni sur un cercle. Et la
// longueur des phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-cercle-circonscrit.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-cercle-circonscrit.tsx", "cercle_circonscrit", ["geo"], "6e");
const { e, vrai, dit, dessin, essai, appels, feuille } = f;

const TAILLE = 14;
const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const presque = (a, b, tol = 0.01) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/** Le centre du cercle circonscrit, par les équations (Cramer). null si alignés. */
function centre(A, B, C) {
  const [a1, b1, c1] = [2 * (B[0] - A[0]), 2 * (B[1] - A[1]), B[0] ** 2 + B[1] ** 2 - A[0] ** 2 - A[1] ** 2];
  const [a2, b2, c2] = [2 * (C[0] - A[0]), 2 * (C[1] - A[1]), C[0] ** 2 + C[1] ** 2 - A[0] ** 2 - A[1] ** 2];
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-12) return null;
  return [(c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det];
}

/* ── Le rendu de `geo`, rejoué ──────────────────────────────────────────── */
const SIGNES = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };
const boite = (x, y, t, d, e0) => {
  const w = [...t].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const ee = sx !== 0 && sy !== 0 ? e0 * 0.7 : e0;
  return { t, cx: x + sx * (ee + w / 2), cy: y + sy * (ee + TAILLE / 2), w, h: TAILLE };
};
/** Un segment [p ; q] coupe-t-il la boîte (réduite d'un pixel) ? Liang–Barsky. */
function coupe(b, p, q) {
  const [x0, x1, y0, y1] = [b.cx - b.w / 2 + 1, b.cx + b.w / 2 - 1, b.cy - b.h / 2 + 1, b.cy + b.h / 2 - 1];
  let [t0, t1] = [0, 1];
  const [dx, dy] = [q[0] - p[0], q[1] - p[1]];
  for (const [pp, qq] of [[-dx, p[0] - x0], [dx, x1 - p[0]], [-dy, p[1] - y0], [dy, y1 - p[1]]]) {
    if (pp === 0) {
      if (qq < 0) return false;
    } else {
      const r = qq / pp;
      if (pp < 0) t0 = Math.max(t0, r);
      else t1 = Math.min(t1, r);
      if (t0 > t1) return false;
    }
  }
  return true;
}
/** Un cercle (centre c, rayon r, en pixels) passe-t-il dans la boîte ? */
function cercleCoupe(b, c, r) {
  const [x0, x1, y0, y1] = [b.cx - b.w / 2 + 1, b.cx + b.w / 2 - 1, b.cy - b.h / 2 + 1, b.cy + b.h / 2 - 1];
  const proche = Math.hypot(Math.max(x0 - c[0], 0, c[0] - x1), Math.max(y0 - c[1], 0, c[1] - y1));
  const loin = Math.max(...[[x0, y0], [x0, y1], [x1, y0], [x1, y1]].map((k) => dist(k, c)));
  return proche < r && loin > r;
}
function renduGeo(o, nom) {
  const P = Object.fromEntries(o.points.map((p) => [p.nom, p.en]));
  const arcs = (o.arcs ?? []).map((a) => {
    const [c, p, q] = [P[a.centre], P[a.de], P[a.a]];
    const r = dist(c, p);
    const t0 = Math.atan2(p[1] - c[1], p[0] - c[0]) - 0.17;
    let t1 = Math.atan2(q[1] - c[1], q[0] - c[0]) + 0.17;
    while (t1 < t0) t1 += 2 * Math.PI;
    return Array.from({ length: 41 }, (_, i) => [c[0] + r * Math.cos(t0 + ((t1 - t0) * i) / 40), c[1] + r * Math.sin(t0 + ((t1 - t0) * i) / 40)]);
  });
  const xs = [], ys = [];
  for (const p of o.points) if (!p.cache) xs.push(p.en[0]), ys.push(p.en[1]);
  for (const c of o.cercles ?? []) {
    const r = dist(P[c.centre], P[c.par]);
    xs.push(P[c.centre][0] - r, P[c.centre][0] + r), ys.push(P[c.centre][1] - r, P[c.centre][1] + r);
  }
  for (const a of arcs) for (const q of a) xs.push(q[0]), ys.push(q[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(230 / (x1 - x0), 170 / Math.max(y1 - y0, 2));
  const M = 34, W = (x1 - x0) * s + 2 * M, H = Math.max(y1 - y0, 2) * s + 2 * M;
  const px = (p) => [M + (p[0] - x0) * s, M + (y1 - p[1]) * s];
  const borne = (b) => ({ ...b, cx: Math.min(Math.max(b.cx, b.w / 2 + 2), W - b.w / 2 - 2), cy: Math.min(Math.max(b.cy, b.h / 2 + 2), H - b.h / 2 - 2) });
  // Les traits dessinés.
  const traits = [];
  if (o.polygone) {
    const q = [...o.polygone].map((k) => px(P[k]));
    q.forEach((a, i) => (q.length > 2 || i === 0) && traits.push([a, q[(i + 1) % q.length]]));
  }
  const L = 2 * Math.hypot(x1 - x0, y1 - y0);
  for (const m of [...(o.mediatrices ?? []), ...(o.pointillees ?? [])]) {
    const [a, b] = [P[m[0]], P[m[1]]];
    const mil = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const l = dist(a, b);
    const n = [-(b[1] - a[1]) / l, (b[0] - a[0]) / l];
    traits.push([px([mil[0] - L * n[0], mil[1] - L * n[1]]), px([mil[0] + L * n[0], mil[1] + L * n[1]])]);
  }
  for (const g of o.segments ?? []) traits.push([px(P[g.de]), px(P[g.a])]);
  const ronds = (o.cercles ?? []).map((c) => [px(P[c.centre]), dist(P[c.centre], P[c.par]) * s]);
  // Les étiquettes.
  const boites = [];
  for (const g of o.segments ?? []) {
    if (!g.label) continue;
    const [a, b] = [px(P[g.de]), px(P[g.a])];
    boites.push({ ...borne(boite((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, g.label, g.vers ?? "h", 6)), seg: g });
  }
  for (const p of o.points) if (!p.cache) boites.push(borne(boite(...px(p.en), p.nom, p.vers ?? "hd", p.ecart ?? 6)));
  vrai(`${nom} : cadre de ${Math.round(W)} de large, 300 au plus`, W <= 300);
  for (let i = 0; i < boites.length; i++) for (let j = i + 1; j < boites.length; j++) {
    const [a, b] = [boites[i], boites[j]];
    vrai(`${nom} : « ${a.t} » et « ${b.t} » ne se touchent pas`, !(Math.abs(a.cx - b.cx) < (a.w + b.w) / 2 && Math.abs(a.cy - b.cy) < (a.h + b.h) / 2));
  }
  const points = o.points.filter((p) => !p.cache).map((p) => px(p.en));
  for (const b of boites) {
    vrai(`${nom} : « ${b.t} » n'est posé sur aucun point`, points.every(([x, y]) => !(Math.abs(x - b.cx) < b.w / 2 + 2 && Math.abs(y - b.cy) < b.h / 2 + 2)));
    const traitsVus = b.seg ? traits.filter(([p, q]) => !(p === px(P[b.seg.de]) && q === px(P[b.seg.a]))) : traits;
    const touches = traitsVus.filter(([p, q]) => coupe(b, p, q) && !(b.seg && dist(p, px(P[b.seg.de])) + dist(q, px(P[b.seg.a])) < 1e-6));
    vrai(`${nom} : « ${b.t} » ne tombe sur aucun trait`, touches.length === 0, touches.map(([p, q]) => `(${p.map(Math.round)})–(${q.map(Math.round)})`).join(" "));
    vrai(`${nom} : « ${b.t} » ne tombe sur aucun cercle`, ronds.every(([c, r]) => !cercleCoupe(b, c, r)));
  }
}
for (const a of appels("geo")) if (a.args) renduGeo(a.args[0], `geo ${a.index}`);

/* ── Les phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus) ───── */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    .flatMap((x) => x.replace(/\$[^$]*\$/g, "N").split(/\\n|(?<=[.!?;])\s+/))
    .map((p) => p.trim())
    .filter(Boolean);
  const mots = phrases.map((p) => p.split(/\s+/).filter((m) => /[\wÀ-ÿ]/.test(m)).length);
  const longues = phrases.filter((_, i) => mots[i] > 20);
  const moyenne = somme(mots) / mots.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, ${Math.max(...mots)} au plus`);
  vrai("phrases de 20 mots au plus", longues.length === 0, longues.slice(0, 3).join(" | "));
  vrai(`12 mots en moyenne (${moyenne.toFixed(1)}), 13 au plus`, moyenne <= 13);
}

/** La figure de l'exercice k : points par nom + contrôles du centre. */
const lire = (k, role) => {
  const [o] = dessin("geo", k, role);
  const P = Object.fromEntries(o.points.map((p) => [p.nom, p.en]));
  return { o, P };
};
/** O est-il le centre du cercle circonscrit à XYZ, et sur chaque médiatrice dessinée ? */
const controleCentre = (k, role, [X, Y, Z] = ["A", "B", "C"], nomO = "O") => {
  const { o, P } = lire(k, role);
  const c = centre(P[X], P[Y], P[Z]);
  vrai(`${k}. ${nomO} est le centre du cercle circonscrit (calculé : ${c.map((v) => v.toFixed(3)).join(" ; ")})`, dist(c, P[nomO]) < 0.01);
  for (const m of [...(o.mediatrices ?? []), ...(o.pointillees ?? [])]) vrai(`${k}. ${nomO} est sur la médiatrice de [${m}]`, presque(dist(P[nomO], P[m[0]]), dist(P[nomO], P[m[1]])));
  for (const cc of o.cercles ?? []) if (cc.centre === nomO) vrai(`${k}. le cercle de centre ${nomO} passe par ${X}, ${Y}, ${Z}`, [X, Y, Z].every((q) => presque(dist(P[nomO], P[q]), dist(P[nomO], P[cc.par]))));
  return { o, P, R: dist(P[nomO], P[X]) };
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const { o } = controleCentre(1, "figure");
  vrai("1. trois médiatrices et le cercle", o.mediatrices.length === 3 && o.cercles.length === 1);
  dit(1, "Réponse : a) les médiatrices ; b) elles passent par un même point ; c) le cercle circonscrit.");
});
essai("2", () => {
  const { R } = controleCentre(2, "figure");
  vrai("2. OA = 4 sur le dessin", presque(R, 4));
  dit(2, `$OB = OA = ${R}$ cm`);
  dit(2, `$OC = OA = ${R}$ cm`);
  dit(2, `Réponse : $OB = ${R}$ cm et $OC = ${R}$ cm.`);
});
essai("3", () => {
  const { o } = controleCentre(3, "schema");
  vrai("3. deux médiatrices pleines, la troisième en pointillés", o.mediatrices.length === 2 && o.pointillees.length === 1);
  dit(3, "Réponse : $2$ médiatrices.");
});
essai("4", () => {
  const { R } = controleCentre(4, "schema");
  vrai("4. le rayon dessiné : 3,5", presque(R, 3.5));
  dit(4, "$3{,}5 \\times 2 = 7$ cm");
  dit(4, "$OA = OB = OC = 3{,}5$ cm");
});
essai("5", () => {
  const { o, P } = controleCentre(5, "figure");
  vrai("5. une seule médiatrice, codée", o.mediatrices.join() === "AB" && o.codage === true);
  vrai("5. OA = OB sur le dessin", presque(dist(P.O, P.A), dist(P.O, P.B)));
  dit(5, "Réponse : $OA = OB$, par la propriété de la médiatrice.");
});
essai("6", () => {
  const { P } = lire(6, "figure");
  const c = centre(P.A, P.B, P.C);
  vrai("6. Q est le centre", dist(c, P.Q) < 0.01);
  const r1 = (x) => (Math.round(x * 10) / 10).toString().replace(".", "{,}");
  for (const X of ["P", "Q", "R"]) {
    const [a, b, cc] = ["A", "B", "C"].map((S) => r1(dist(P[X], P[S])));
    vrai(`6. ${X} : ${a}, ${b}, ${cc} mesurés = l'énoncé`, e(6).includes(`${X} : $${X}A = ${a}$ cm, $${X}B = ${b}$ cm, $${X}C = ${cc}$ cm.`));
  }
  vrai("6. P sur la médiatrice de [AB], pas sur les autres", presque(dist(P.P, P.A), dist(P.P, P.B)) && !presque(dist(P.P, P.C), dist(P.P, P.A), 0.05));
  vrai("6. R sur la médiatrice de [AC], pas sur les autres", presque(dist(P.R, P.A), dist(P.R, P.C)) && !presque(dist(P.R, P.B), dist(P.R, P.A), 0.05));
  dit(6, "Réponse : a) Q ; b) P sur celle de $[AB]$, R sur celle de $[AC]$.");
});
essai("7", () => {
  const { P } = controleCentre(7, "figure");
  vrai("7. P sur la médiatrice de [AB] : PA = PB", presque(dist(P.P, P.A), dist(P.P, P.B)));
  vrai(`7. le cercle de Tom rate C (PC = ${dist(P.P, P.C).toFixed(2)}, PA = ${dist(P.P, P.A).toFixed(2)})`, Math.abs(dist(P.P, P.C) - dist(P.P, P.A)) > 1);
  vrai("7. P n'est pas O", dist(P.P, P.O) > 1);
  dit(7, "Réponse : a) oui, par les deux ; b) par B, mais pas par C.");
});
essai("8", () => {
  const { P, o } = lire(8, "schema");
  vrai("8. A, B, C alignés", centre(P.A, P.B, P.C) === null);
  vrai("8. AB = 3, BC = 4 comme l'énoncé", dist(P.A, P.B) === 3 && dist(P.B, P.C) === 4);
  // Deux médiatrices de côtés portés par la même droite : même direction, donc parallèles.
  const dir = (m) => [P[m[1]][0] - P[m[0]][0], P[m[1]][1] - P[m[0]][1]];
  const [u, v] = o.mediatrices.map(dir);
  vrai("8. médiatrices parallèles (côtés colinéaires)", Math.abs(u[0] * v[1] - u[1] * v[0]) < 1e-12);
  dit(8, "Réponse : a) non, elles sont parallèles ; b) non.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const { o } = controleCentre(9, "schema");
  vrai("9. la construction : deux médiatrices, la vérification en pointillés, le cercle", o.mediatrices.length === 2 && o.pointillees.join() === "CA" && o.cercles.length === 1);
  dit(9, "L'ordre est ②, ④, ③, ①.");
});
essai("10", () => {
  const { P } = controleCentre(10, "figure");
  vrai("10. OA = OB = OC sur le dessin", presque(dist(P.O, P.A), dist(P.O, P.B)) && presque(dist(P.O, P.B), dist(P.O, P.C)));
  dit(10, "Réponse : $OA = OB$ ; $OB = OC$ ; $OA = OC$ ; la médiatrice de $[AC]$.");
});
essai("11", () => {
  const { P } = controleCentre(11, "figure");
  const [CA, CB] = [[P.A[0] - P.C[0], P.A[1] - P.C[1]], [P.B[0] - P.C[0], P.B[1] - P.C[1]]];
  vrai("11. angle obtus en C (produit scalaire < 0)", CA[0] * CB[0] + CA[1] * CB[1] < 0);
  // O hors du triangle : O et C de part et d'autre de (AB).
  const cote = (Q) => Math.sign((P.B[0] - P.A[0]) * (Q[1] - P.A[1]) - (P.B[1] - P.A[1]) * (Q[0] - P.A[0]));
  vrai("11. O de l'autre côté de [AB] que C", cote(P.O) !== cote(P.C) && cote(P.O) !== 0);
  dit(11, "Réponse : a) dehors ; b) oui ; c) non, c'est normal.");
});
essai("12", () => {
  const { P, R } = controleCentre(12, "figure");
  vrai("12. isocèle en A", dist(P.A, P.B) === dist(P.A, P.C));
  vrai("12. A sur la médiatrice de [BC]", presque(dist(P.A, P.B), dist(P.A, P.C)));
  vrai("12. OA = 5 sur le dessin, comme l'énoncé", presque(R, 5) && e(12).includes("$OA = 5$ cm"));
  dit(12, `Donc $OB = OA = ${R}$ cm.`);
  dit(12, `Donc $OC = OB = ${R}$ cm.`);
});
essai("13", () => {
  const { P, o } = lire(13, "figure");
  for (const X of ["P", "Q", "R"]) vrai(`13. ${X} sur la médiatrice de [AB]`, presque(dist(P[X], P.A), dist(P[X], P.B)));
  vrai("13. deux cercles de centres différents, tous deux par A et B", o.cercles.length === 2 && o.cercles.every((c) => presque(dist(P[c.centre], P.B), dist(P[c.centre], P.A))));
  // Un point nommé ne doit pas tomber SUR un cercle dessiné (on le croirait dessus).
  for (const X of ["P", "Q", "R"]) for (const c of o.cercles) if (c.centre !== X) vrai(`13. ${X} loin du cercle de centre ${c.centre}`, Math.abs(dist(P[X], P[c.centre]) - dist(P[c.centre], P.A)) > 0.8);
  dit(13, "Réponse : a) oui ; b) une infinité, centres sur la médiatrice ; c) un seul.");
});
essai("14", () => {
  const { P, R } = controleCentre(14, "schema", ["D", "E", "F"], "K");
  vrai("14. KD = 6", presque(R, 6));
  vrai("14. M sur le cercle, N dedans (KN = 5)", presque(dist(P.K, P.M), 6) && presque(dist(P.K, P.N), 5));
  dit(14, `$KE = KF = KD = ${R}$ cm`);
  dit(14, `$${R} \\times 2 = ${2 * R}$ cm.`);
});
essai("15", () => {
  const { P } = controleCentre(15, "schema");
  const [ab, bc, ca] = [dist(P.A, P.B), dist(P.B, P.C), dist(P.C, P.A)];
  vrai(`15. équilatéral (${ab.toFixed(3)}, ${bc.toFixed(3)}, ${ca.toFixed(3)})`, presque(ab, bc) && presque(bc, ca));
  vrai("15. chaque médiatrice passe par le sommet opposé", presque(dist(P.C, P.A), dist(P.C, P.B)) && presque(dist(P.A, P.B), dist(P.A, P.C)) && presque(dist(P.B, P.A), dist(P.B, P.C)));
  dit(15, "Réponse : a) car $CA = CB$ ; b) oui ; c) au point commun, à l'intérieur.");
});
essai("16", () => {
  controleCentre(16, "schema");
  dit(16, "Réponse : a) faux ; b) vrai ; c) vrai ; d) faux.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const f1 = controleCentre(17, "figure");
  controleCentre(17, "schema");
  vrai("17. le puits caché dans la figure d'énoncé", f1.o.points.find((p) => p.nom === "O").cache === true);
  vrai("17. OA = 5 unités de 100 m = 500 m", presque(f1.R, 5));
  dit(17, "$OA = OB = OC = 500$ m");
  dit(17, "$400 < 500$");
});
essai("18", () => {
  const f1 = controleCentre(18, "figure");
  controleCentre(18, "schema");
  vrai("18. le centre caché dans la figure d'énoncé", f1.o.points.find((p) => p.nom === "O").cache === true);
  vrai("18. OA = 12", presque(f1.R, 12));
  dit(18, `$${f1.R} \\times 2 = ${2 * f1.R}$ cm.`);
  dit(18, `b) $${2 * f1.R}$ cm.`);
});
essai("19", () => {
  const { o } = controleCentre(19, "figure");
  vrai("19. deux médiatrices codées", o.mediatrices.length === 2 && o.codage === true);
  for (const m of ["$OA = OB$", "$OB = OC$", "$OA = OC$", "médiatrice de $[AC]$"]) dit(19, m);
});
essai("20", () => {
  const { P, R } = controleCentre(20, "figure");
  vrai("20. un rectangle de 8 sur 6", dist(P.A, P.B) === 8 && dist(P.B, P.C) === 6 && dist(P.C, P.D) === 8 && dist(P.D, P.A) === 6);
  vrai("20. O à 5 des quatre coins", ["A", "B", "C", "D"].every((k) => presque(dist(P.O, P[k]), 5)) && presque(R, 5));
  vrai("20. la médiatrice de [AB] est celle de [CD]", presque(dist(P.O, P.C), dist(P.O, P.D)));
  dit(20, `$${R} \\times 2 = ${2 * R}$ dm.`);
});

f.fin();
