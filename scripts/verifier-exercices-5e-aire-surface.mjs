// Recalcul indépendant de la feuille « Les aires » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-aire-surface.tsx.
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « 5 × 4 ÷ 2 = 10 cm² » ; ici chaque aire
// est refaite par la FORMULE DU LACET sur les coordonnées que le dessin `plan()`
// TRACE, relues dans le source. Les carreaux entiers de l'exercice 1 sont
// COMPTÉS un par un. Chaque cote chiffrée doit mesurer, sur le dessin, ce
// qu'elle annonce ; chaque hauteur doit tomber PERPENDICULAIREMENT sur la droite
// d'un côté ; sur un quadrillage, chaque sommet tombe sur un nœud.
// ⭐ LE RENDU : la mise en page des étiquettes de `plan()` est rejouée ici
// (même calcul que le composant) — viewBox de 300 de large au plus (police 14 →
// 11 px à 375), et deux étiquettes qui se touchent sont refusées.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-aire-surface.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-aire-surface.tsx", "aire_surface", ["plan"]);
const { e, vrai, verif, dit, dessin, dessins, essai, appels } = f;

/* ── Géométrie ─────────────────────────────────────────────────────────── */
const lacet = (pts) => {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
const dist = ([a, b], [c, d]) => Math.hypot(c - a, d - b);
const perimetre = (pts) => pts.reduce((s, p, i) => s + dist(p, pts[(i + 1) % pts.length]), 0);
const cotes = (pts) => pts.map((p, i) => dist(p, pts[(i + 1) % pts.length]));
/** P est-il dans le polygone ou sur son bord ? */
const surBord = ([x, y], poly) =>
  poly.some((P, i) => {
    const Q = poly[(i + 1) % poly.length];
    const croix = (Q[0] - P[0]) * (y - P[1]) - (Q[1] - P[1]) * (x - P[0]);
    return Math.abs(croix) < 1e-9 && Math.min(P[0], Q[0]) - 1e-9 <= x && x <= Math.max(P[0], Q[0]) + 1e-9 && Math.min(P[1], Q[1]) - 1e-9 <= y && y <= Math.max(P[1], Q[1]) + 1e-9;
  });
const dedans = ([x, y], poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const couvre = (p, poly) => dedans(p, poly) || surBord(p, poly);

/** « 7,5 cm », « ? = 8 cm » → { v: 7.5, u: "cm" } ; null sans nombre. */
const lit = (label) => {
  const m = [...String(label).matchAll(/(\d+(?:[ ,]\d+)?)\s*(cm|dm|m)\b/g)].at(-1);
  return m ? { v: Number(m[1].replace(" ", "").replace(",", ".")), u: m[2] } : null;
};

/** Les formes d'un plan, rangées. */
const lire = ([unite, formes]) => ({
  unite,
  formes,
  polys: formes.filter((x) => x.poly),
  hauts: formes.filter((x) => x.haut),
  cotesDessin: formes.filter((x) => x.cote),
  grille: formes.find((x) => x.grille),
});
const plan = (k, role) => lire(dessin("plan", k, role));
const aires = (p) => p.polys.map((x) => lacet(x.poly));

/* ── Contrôles de TOUS les plans : cotes, hauteurs, nœuds, rendu ──────── */
const TAILLE = 14;
function rendu(formes) {
  // Même calcul que `plan()` dans la feuille : échelle, centre, étiquettes, viewBox.
  const geo = [];
  for (const x of formes) {
    if (x.poly) geo.push(...x.poly);
    else if (x.grille) geo.push([x.grille[0], x.grille[1]], [x.grille[2], x.grille[3]]);
    else if (x.trait) geo.push(...x.trait);
    else if (x.haut) geo.push(...x.haut);
    else if (x.cote) geo.push(...x.cote);
    else if (x.droit) geo.push(x.droit[0]);
    else if (x.point) geo.push(x.point);
    else geo.push(x.en);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]) => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];
  const centres = formes.flatMap((x) => (x.poly ? x.poly.map(P) : []));
  const C = centres.length ? [centres.reduce((a, p) => a + p[0], 0) / centres.length, centres.reduce((a, p) => a + p[1], 0) / centres.length] : [100, 80];
  const et = [];
  const ancre = (nx) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M, n, t) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    et.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, a });
  };
  const unit = (a, b) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  };
  for (const x of formes) {
    if (x.haut && x.label) {
      const [S, H] = x.haut.map(P);
      const d = unit(S, H);
      let n = [-d[1], d[0]];
      if (n[0] < 0 || (n[0] === 0 && n[1] > 0)) n = [-n[0], -n[1]];
      if (x.sens === -1) n = [-n[0], -n[1]];
      poser([(S[0] + H[0]) / 2, (S[1] + H[1]) / 2], n, x.label);
    } else if (x.cote) {
      const [a, b] = x.cote.map(P);
      const d = unit(a, b);
      const M = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = [-d[1], d[0]];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (x.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, x.label);
    } else if (x.point) {
      const p = P(x.point);
      const L = Math.hypot(p[0] - C[0], p[1] - C[1]);
      poser(p, L < 1 ? [0, -1] : [(p[0] - C[0]) / L, (p[1] - C[1]) / L], x.label);
    } else if (x.texte) et.push({ x: P(x.en)[0], y: P(x.en)[1], t: x.texte, a: "middle" });
  }
  const boites = et.map((q) => {
    const L = q.t.length * TAILLE * 0.56;
    const g = q.a === "start" ? q.x : q.a === "end" ? q.x - L : q.x - L / 2;
    return { t: q.t, g, d: g + L, y: q.y };
  });
  let [bx0, bx1] = [0, (x1 - x0) * s];
  for (const b of boites) [bx0, bx1] = [Math.min(bx0, b.g), Math.max(bx1, b.d)];
  return { largeur: bx1 - bx0 + 12, boites };
}

for (const a of appels("plan")) {
  if (!a.args) continue;
  const p = lire(a.args);
  const ou = `plan(${p.unite}) ${a.index}`;
  for (const x of p.cotesDessin) {
    const l = lit(x.label);
    if (!l) continue;
    vrai(`${ou} : cote « ${x.label} » dans l'unité du plan`, l.u === p.unite);
    verif(`${ou} : cote « ${x.label} » mesurée sur le dessin`, dist(...x.cote), l.v, 1e-3);
  }
  for (const x of p.hauts) {
    const [S, H] = x.haut;
    const l = lit(x.label ?? "");
    if (l) verif(`${ou} : hauteur « ${x.label} » mesurée sur le dessin`, dist(S, H), l.v, 1e-3);
    // Le pied est sur la DROITE d'un côté, et la hauteur lui est perpendiculaire.
    const ok = p.polys.some(({ poly }) =>
      poly.some((A, i) => {
        const B = poly[(i + 1) % poly.length];
        const u = [B[0] - A[0], B[1] - A[1]];
        const surDroite = Math.abs(u[0] * (H[1] - A[1]) - u[1] * (H[0] - A[0])) < 1e-6;
        const perp = Math.abs(u[0] * (S[0] - H[0]) + u[1] * (S[1] - H[1])) < 1e-6;
        return surDroite && perp && poly.some((V) => dist(V, S) < 1e-9);
      }),
    );
    vrai(`${ou} : la hauteur « ${x.label ?? ""} » part d'un sommet et tombe à angle droit sur un côté`, ok);
  }
  if (p.grille && (p.grille.pas ?? 1) === 1) for (const { poly } of p.polys) vrai(`${ou} : sommets sur les nœuds du quadrillage`, poly.flat().every(Number.isInteger));
  const r = rendu(p.formes);
  vrai(`${ou} : viewBox de ${Math.round(r.largeur)} de large, 300 au plus (police ≥ 11 px à 375)`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++)
    for (let j = i + 1; j < r.boites.length; j++) {
      const [b1, b2] = [r.boites[i], r.boites[j]];
      const recouvre = Math.min(b1.d, b2.d) - Math.max(b1.g, b2.g) > 0 && Math.abs(b1.y - b2.y) < 18;
      vrai(`${ou} : « ${b1.t} » et « ${b2.t} » ne se touchent pas`, !recouvre);
    }
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const p = plan(1, "figure");
  const [poly] = p.polys.map((x) => x.poly);
  const A = lacet(poly);
  const [gx0, gy0, gx1, gy1] = p.grille.grille;
  const rangees = [];
  for (let y = gy0; y < gy1; y++) {
    let n = 0;
    for (let x = gx0; x < gx1; x++) if ([[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]].every((q) => couvre(q, poly))) n++;
    rangees.push(n);
  }
  const entiers = rangees.reduce((a, b) => a + b, 0);
  const demis = (A - entiers) * 2;
  verif("1. aire (lacet)", A, 14);
  dit(1, `$${rangees.join(" + ")} = ${entiers}$`);
  dit(1, `ce sont $${demis}$ demi-carreaux`);
  dit(1, `$${entiers} + ${demis / 2} = ${A}$ carreaux`);
  dit(1, `et trouver $${entiers + demis}$`);
  dit(1, `Réponse : $${entiers}$ carreaux entiers, $${demis}$ demi-carreaux, une aire de $${A}$ cm².`);
});
essai("2", () => {
  const p = plan(2, "figure");
  const [A, B] = p.polys.map((x) => x.poly);
  const [aA, aB] = [lacet(A), lacet(B)];
  vrai("2. même aire", aA === aB);
  dit(2, `$3 \\times 4 = ${aA}$ carreaux`);
  dit(2, `$6 + 6 = ${aB}$ carreaux`);
  dit(2, `A : $${cotes(A).join(" + ")} = ${perimetre(A)}$ cm.`);
  dit(2, `B : $${cotes(B).join(" + ")} = ${perimetre(B)}$ cm.`);
  vrai("2. périmètres différents", perimetre(A) !== perimetre(B));
  dit(2, `Réponse : $${aA}$ cm² chacune ; périmètres $${perimetre(A)}$ cm et $${perimetre(B)}$ cm ; Nina a tort.`);
});
essai("3", () => {
  const p = plan(3, "schema");
  const A = lacet(p.polys[0].poly);
  const b = lit(p.cotesDessin[0].label).v, h = lit(p.hauts[0].label).v;
  vrai("3. l'énoncé donne base et hauteur", e(3).includes(`$${b}$ cm`) && e(3).includes(`$${h}$ cm`));
  verif("3. lacet = b × h ÷ 2", A, (b * h) / 2);
  dit(3, `$${b} \\times ${h} = ${b * h}$ cm²`);
  dit(3, `$${b * h} \\div 2 = ${A}$ cm²`);
  dit(3, `Réponse : l'aire du triangle $ABC$ est $${A}$ cm².`);
});
essai("4", () => {
  const p = plan(4, "figure");
  const [D, E, F] = p.polys[0].poly;
  const A = lacet([D, E, F]);
  const b = dist(D, E), h = dist(...p.hauts[0].haut), ef = dist(E, F);
  vrai("4. angle obtus en E", (D[0] - E[0]) * (F[0] - E[0]) + (D[1] - E[1]) * (F[1] - E[1]) < 0);
  vrai("4. le pied de la hauteur est hors de [DE]", p.hauts[0].haut[1][0] > Math.max(D[0], E[0]));
  dit(4, `$${b} \\times ${h} \\div 2 = ${b * h} \\div 2 = ${t(A)}$ cm²`);
  dit(4, `$${b} \\times ${ef} \\div 2 = ${t((b * ef) / 2)}$ cm²`);
  dit(4, `Réponse : l'aire du triangle $DEF$ est $${t(A)}$ cm².`);
});
essai("5", () => {
  const p = plan(5, "figure");
  const poly = p.polys[0].poly;
  const A = lacet(poly), b = dist(poly[0], poly[1]), h = dist(...p.hauts[0].haut), cote = dist(poly[0], poly[3]);
  dit(5, `$${b} \\times ${h} = ${A}$ cm²`);
  dit(5, `$${b} \\times ${cote} = ${b * cote}$ cm²`);
  dit(5, `trouver $${t(A / 2)}$ cm²`);
  dit(5, `Réponse : l'aire de $IJKL$ est $${A}$ cm².`);
});
essai("6", () => {
  const [aire, b] = [42, 7];
  vrai("6. l'énoncé", e(6).includes(`aire de $${aire}$ cm² et une base de $${b}$ cm`));
  const h = aire / b;
  dit(6, `$${aire} \\div ${b} = ${h}$`);
  dit(6, `$${aire} \\times 2 \\div ${b} = ${(aire * 2) / b}$ cm`);
  const p = plan(6, "schema");
  verif("6. le dessin : lacet = 42", lacet(p.polys[0].poly), aire);
  verif("6. le dessin : hauteur", dist(...p.hauts[0].haut), h);
  dit(6, `Réponse : la hauteur mesure $${h}$ cm.`);
});
essai("7", () => {
  const p = plan(7, "schema");
  const [r, tr] = aires(p);
  vrai("7. l'énoncé : 5 m, 3 m, 2 m", ["$5$ m de large", "$3$ m de haut", "à $2$ m au-dessus"].every((m) => e(7).includes(m)));
  dit(7, `$5 \\times 3 = ${r}$ m²`);
  dit(7, `$5 \\times 2 \\div 2 = ${tr}$ m²`);
  dit(7, `$${r} + ${tr} = ${r + tr}$ m²`);
  dit(7, `$${r} + ${2 * tr} = ${r + 2 * tr}$ m²`);
  dit(7, `Réponse : le mur a une aire de $${r + tr}$ m².`);
});
essai("8", () => {
  const p = plan(8, "schema");
  const [g, o] = aires(p);
  vrai("8. l'ouverture est dans le cadre", p.polys[1].poly.every((q) => couvre(q, p.polys[0].poly)));
  dit(8, `$20 \\times 15 = ${g}$ cm²`);
  dit(8, `$14 \\times 9 = ${o}$ cm²`);
  dit(8, `$${g} - ${o} = ${g - o}$ cm²`);
  dit(8, `Réponse : le bois a une aire de $${g - o}$ cm².`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const p = plan(9, "figure");
  const poly = p.polys[0].poly;
  const A = lacet(poly);
  const [B, C, Asom] = poly;
  const bc = dist(B, C), ac = dist(Asom, C), hA = dist(...p.hauts[0].haut);
  dit(9, `$${bc} \\times ${hA} \\div 2 = ${bc * hA} \\div 2 = ${A}$ cm²`);
  const hB = (2 * A) / ac;
  dit(9, `$${2 * A} \\div ${t(ac)} = ${hB}$`);
  dit(9, `$${A} \\div ${t(ac)} = ${A / ac}$ cm`);
  const s = plan(9, "schema");
  verif("9. le schéma : hauteur issue de B", dist(...s.hauts[0].haut), hB);
  dit(9, `Réponse : a) $${A}$ cm² ; b) la hauteur issue de $B$ mesure $${hB}$ cm.`);
});
essai("10", () => {
  const p = plan(10, "schema");
  const poly = p.polys[0].poly;
  const A = lacet(poly);
  const [R, S, T] = poly;
  const [b, h, g] = [dist(R, S), dist(R, T), dist(S, T)];
  vrai("10. l'énoncé donne les trois côtés", [b, h, g].every((x) => e(10).includes(`$${t(x)}$ m`)));
  dit(10, `$${t(h)} \\times ${t(b)} \\div 2 = ${t(b * h)} \\div 2 = ${t(A)}$ m²`);
  dit(10, `$${t(A)} \\times 15 = ${t(A * 15)}$`);
  const hc = (2 * A) / g;
  verif("10. hauteur relative au grand côté", hc, 2.88);
  verif("10. le schéma : la couture", dist(...p.hauts[0].haut), hc);
  dit(10, `$${t(2 * A)} \\div ${g} = ${t(hc)}$`);
  dit(10, `$${g} \\times ${t(h)} \\div 2 = ${t((g * h) / 2)}$ m²`);
  dit(10, `Réponse : a) $${t(A)}$ m² ; b) $129{,}60$ € ; c) la couture mesure $${t(hc)}$ m.`);
});
essai("11", () => {
  const p = plan(11, "figure");
  const [rect, para] = p.polys.map((x) => x.poly);
  const [aR, aP] = [lacet(rect), lacet(para)];
  const aC = 7 * 3;
  vrai("11. mêmes baguettes : mêmes côtés", JSON.stringify(cotes(rect).sort()) === JSON.stringify(cotes(para).sort()));
  dit(11, `$7 \\times 5 = ${aR}$ cm²`);
  dit(11, `$7 \\times 4 = ${aP}$ cm²`);
  dit(11, `$7 \\times 3 = ${aC}$ cm²`);
  dit(11, `$7 + 5 + 7 + 5 = ${perimetre(para)}$ cm`);
  dit(11, `Réponse : a) $${aR}$ cm² ; b) $${aP}$ cm² ; c) $${aC}$ cm² ; d) même périmètre, $${perimetre(rect)}$ cm, mais l'aire diminue.`);
});
essai("12", () => {
  const A = lacet(plan(12, "figure").polys[0].poly);
  const morceaux = aires(plan(12, "schema"));
  verif("12. les morceaux recouvrent le trapèze", morceaux.reduce((a, b) => a + b, 0), A);
  dit(12, `$1 \\times 4 \\div 2 = ${morceaux[0]}$ cm²`);
  dit(12, `$5 \\times 4 = ${morceaux[1]}$ cm²`);
  dit(12, `$2 \\times 4 \\div 2 = ${morceaux[2]}$ cm²`);
  dit(12, `$${morceaux.join(" + ")} = ${A}$ cm²`);
  dit(12, `Réponse : l'aire du trapèze est $${A}$ cm².`);
});
essai("13", () => {
  const p = plan(13, "figure");
  const [j, m, b] = aires(p);
  vrai("13. les trous sont dans le jardin", p.polys.slice(1).every((x) => x.poly.every((q) => couvre(q, p.polys[0].poly))));
  const pel = j - m - b;
  dit(13, `$12 \\times 8 = ${j}$ m²`);
  dit(13, `$4 \\times 3 \\div 2 = ${m}$ m²`);
  dit(13, `$2 \\times 1{,}5 = ${b}$ m²`);
  dit(13, `$${j} - ${m} - ${b} = ${pel}$ m²`);
  dit(13, `$${pel} \\div 30 = ${t(pel / 30)}$`);
  dit(13, `il en faut $${Math.ceil(pel / 30)}$`);
  dit(13, `$${j} + ${m} + ${b} = ${j + m + b}$ m²`);
});
essai("14", () => {
  const p = plan(14, "figure");
  const [a, b, cc] = aires(p);
  vrai("14. trois aires égales", a === b && b === cc);
  dit(14, `$2 \\times 4 = ${a}$ cm²`);
  dit(14, `$4 \\times 4 \\div 2 = ${cc}$ cm²`);
  const C = p.polys[2].poly;
  vrai("14. la hauteur de C tombe hors de sa base", C[2][0] > Math.max(C[0][0], C[1][0]));
  dit(14, `Réponse : $${a}$ cm² chacune ; Emma a tort.`);
});
essai("15", () => {
  const p = plan(15, "schema");
  const poly = p.polys[0].poly;
  const A = lacet(poly), b = dist(poly[0], poly[1]), h = dist(...p.hauts[0].haut), cote = dist(poly[0], poly[3]);
  vrai("15. l'énoncé : 150, 80, 100", [b, h, cote].every((x) => e(15).includes(`$${x}$ m`)));
  dit(15, `$${b} \\times ${h} = ${t(A)}$ m²`);
  dit(15, `$${t(A)} \\times 0{,}7 = ${t(A * 0.7)}$ kg`);
  dit(15, `de $${t(b * cote - A)}$ m²`);
  vrai("15. le voisin", e(15).includes(`$${b} \\times ${cote} = ${t(b * cote)}$`));
});
essai("16", () => {
  const poly = plan(16, "figure").polys[0].poly;
  const A = lacet(poly);
  const deuxTri = aires(plan(16, "schema"));
  dit(16, `$7 \\times 3 \\div 2 = 21 \\div 2 = ${t(deuxTri[0])}$ dm²`);
  dit(16, `$${t(deuxTri[0])} + ${t(deuxTri[1])} = ${A}$ dm²`);
  // Le rectangle englobant et ses quatre coins, triangle par triangle.
  const xs = poly.map((q) => q[0]), ys = poly.map((q) => q[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const R = (x1 - x0) * (y1 - y0);
  const coinsPts = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const coins = poly.map((q, i) => {
    const r = poly[(i + 1) % poly.length];
    const coin = coinsPts.find((k) => (k[0] === q[0] || k[0] === r[0]) && (k[1] === q[1] || k[1] === r[1]));
    return lacet([q, r, coin]);
  });
  verif("16. rectangle moins coins", R - coins.reduce((a, b) => a + b, 0), A);
  const ordre = [...coins].sort((a, b) => b - a);
  dit(16, `$${R} - ${ordre.map(t).join(" - ")} = ${A}$ dm²`);
  dit(16, `$${R} - ${ordre.map((x) => t(2 * x)).join(" - ")} = ${R - 2 * ordre.reduce((a, b) => a + b, 0)}$`);
  dit(16, `Réponse : le cerf-volant a une aire de $${A}$ dm².`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [pot, comp, fr] = aires(plan(17, "figure"));
  const gaz = pot - comp - fr;
  dit(17, `$10 \\times 6 = ${pot}$ m²`);
  dit(17, `$2 \\times 2 \\div 2 = ${comp}$ m²`);
  dit(17, `$4 \\times 3 = ${fr}$ m²`);
  dit(17, `$${pot} - ${comp} - ${fr} = ${gaz}$ m²`);
  dit(17, `$${gaz} \\div 10 = ${t(gaz / 10)}$`);
  dit(17, `il en faut $${Math.ceil(gaz / 10)}$`);
  dit(17, `$${fr} \\times 4 = ${fr * 4}$ fraisiers`);
  dit(17, `Réponse : $${pot}$ m² ; $${comp}$ m² et $${fr}$ m² ; $${gaz}$ m² de gazon ; $${Math.ceil(gaz / 10)}$ paquets ; $${fr * 4}$ fraisiers.`);
});
essai("18", () => {
  const p = plan(18, "figure");
  const [v, o, b] = aires(p);
  const tot = v + o + b;
  verif("18. le drapeau entier", tot, 150 * 100);
  dit(18, `$150 \\times 100 = ${t(tot)}$ cm²`);
  dit(18, `$100 \\times 75 \\div 2 = ${t(100 * 75)} \\div 2 = ${t(b)}$ cm²`);
  vrai("18. deux bandes égales", v === o);
  dit(18, `$${t(tot)} - ${t(b)} = ${t(tot - b)}$ cm²`);
  dit(18, `$${t(tot - b)} \\div 2 = ${t(v)}$ cm²`);
  dit(18, `$${t(7500)} - ${t(b / 2)} = ${t(v)}$ cm²`);
  vrai("18. un quart", b * 4 === tot);
  dit(18, `$${t(b)} \\times 4 = ${t(tot)}$`);
});
essai("19", () => {
  const p = plan(19, "figure");
  const [terrain, maison] = aires(p);
  dit(19, `$40 \\times 20 = 800$ m²`);
  dit(19, `$40 \\times 10 \\div 2 = 400 \\div 2 = 200$ m²`);
  dit(19, `$800 + 200 = ${t(terrain)}$ m²`);
  dit(19, `$${t(terrain)} \\times 85 = ${t(terrain * 85)}$ €`);
  dit(19, `$12 \\times 9 = ${maison}$ m²`);
  dit(19, `$${t(terrain)} - ${maison} = ${terrain - maison}$ m²`);
  vrai("19. la maison est dans le terrain", p.polys[1].poly.every((q) => couvre(q, p.polys[0].poly)));
});
essai("20", () => {
  const p = plan(20, "schema");
  const [para, tri] = aires(p);
  vrai("20. même aire", para === tri);
  dit(20, `$36 \\times 25 = ${para}$ m²`);
  const h = (2 * para) / 45;
  verif("20. le dessin : hauteur du triangle", dist(...p.hauts[1].haut), h);
  dit(20, `$${t(2 * para)} \\div 45 = ${h}$`);
  dit(20, `$36 \\times 25 \\div 2 = ${para} \\div 2 = ${para / 2}$ m²`);
  dit(20, `$${para} \\div 45 = ${para / 45}$ m`);
  dit(20, `Réponse : a) $${para}$ m² ; b) $${h}$ m ; c) non, $${para / 2}$ m², la moitié.`);
});

f.fin();
