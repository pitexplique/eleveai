// Recalcul indépendant de la feuille « Les aires » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-aire-surface.tsx.
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « 8 × 3 = 24 » ; ici chaque aire est
// refaite par la FORMULE DU LACET sur les coordonnées que le dessin `plan()`
// TRACE, relues dans le source. Chaque cote chiffrée doit mesurer, sur le
// dessin, ce qu'elle annonce (une cote en m sur un plan en cm est convertie) ;
// chaque trou est DANS sa figure ; chaque angle codé est droit.
// ⭐ LE RENDU : la mise en page des étiquettes de `plan()` est rejouée ici —
// viewBox de 300 de large au plus, et deux étiquettes qui se touchent sont
// refusées.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-aire-surface.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-aire-surface.tsx", "aire_surface", ["plan", "table"], "6e");
const { e, vrai, verif, dit, dessin, appels, essai } = f;

/* ── Géométrie ─────────────────────────────────────────────────────────── */
const lacet = (pts) => Math.abs(pts.reduce((s, [x1, y1], i) => s + x1 * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y1, 0)) / 2;
const dist = ([a, b], [c, d]) => Math.hypot(c - a, d - b);
const cotes = (pts) => pts.map((p, i) => +dist(p, pts[(i + 1) % pts.length]).toFixed(9));
const perimetre = (pts) => cotes(pts).reduce((s, x) => s + x, 0);
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
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
const UL = { m: 1, dm: 0.1, cm: 0.01 };
const lit = (label, unite) => {
  const m = [...String(label).matchAll(/(\d+(?:,\d+)?)\s*(cm|dm|m)\b/g)].at(-1);
  return m ? r9((nb(m[1]) * UL[m[2]]) / UL[unite]) : null;
};

const lire = ([unite, formes]) => ({ unite, formes, polys: formes.filter((x) => x.poly).map((x) => x.poly), trous: formes.filter((x) => x.fond === "trou").map((x) => x.poly), cotesDessin: formes.filter((x) => x.cote), grille: formes.find((x) => x.grille) });
const plan = (k, role) => lire(dessin("plan", k, role));
const aires = (p) => p.polys.map(lacet);

/* ── Contrôles de TOUS les plans ─────────────────────────────────────────── */
function rendu(formes) {
  const geo = [];
  for (const x of formes) {
    if (x.poly) geo.push(...x.poly);
    else if (x.grille) geo.push([x.grille[0], x.grille[1]], [x.grille[2], x.grille[3]]);
    else if (x.trait) geo.push(...x.trait);
    else if (x.cote) geo.push(...x.cote);
    else if (x.droit) geo.push(x.droit[0]);
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
  for (const x of formes) {
    if (x.cote) {
      const [a, b] = x.cote.map(P);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const M = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (x.sens === -1) n = [-n[0], -n[1]];
      const an = ancre(n[0]);
      const d = an === "middle" ? 14 : 8;
      et.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t: x.label, a: an });
    } else if (x.texte) et.push({ x: P(x.en)[0], y: P(x.en)[1], t: x.texte, a: "middle" });
  }
  const boites = et.map((q) => {
    const L = q.t.length * 14 * 0.56;
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
    const v = lit(x.label, p.unite);
    if (v !== null) verif(`${ou} : cote « ${x.label} » mesurée sur le dessin`, dist(...x.cote), v, 1e-6);
  }
  if (p.grille) {
    const pas = p.grille.pas ?? 1;
    for (const poly of p.polys) vrai(`${ou} : sommets sur les nœuds du quadrillage`, poly.flat().every((v) => Number.isInteger(r9(v / pas))));
  }
  for (const x of p.formes.filter((x) => x.droit)) {
    const [V, A, B] = x.droit;
    vrai(`${ou} : l'angle codé en ${V} est droit`, Math.abs((A[0] - V[0]) * (B[0] - V[0]) + (A[1] - V[1]) * (B[1] - V[1])) < 1e-9);
  }
  for (const tr of p.trous) vrai(`${ou} : le trou est dans la figure`, tr.every((q) => couvre(q, p.polys[0])));
  const r = rendu(p.formes);
  vrai(`${ou} : viewBox de ${Math.round(r.largeur)} de large, 300 au plus`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++)
    for (let j = i + 1; j < r.boites.length; j++) {
      const [b1, b2] = [r.boites[i], r.boites[j]];
      vrai(`${ou} : « ${b1.t} » et « ${b2.t} » ne se touchent pas`, !(Math.min(b1.d, b2.d) - Math.max(b1.g, b2.g) > 0 && Math.abs(b1.y - b2.y) < 18));
    }
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [poly] = plan(1, "figure").polys;
  const [L, l] = cotes(poly);
  dit(1, `Le rectangle a $${l}$ rangées de $${L}$ carreaux.`);
  dit(1, `$${L} \\times ${l} = ${lacet(poly)}$`);
  dit(1, `$${L} + ${l} + ${L} + ${l} = ${perimetre(poly)}$`);
  dit(1, `Réponse : l'aire du rectangle est $${lacet(poly)}$ cm².`);
});
essai("2", () => {
  const c = nb(/un côté de \$(\d+)\$ cm/.exec(e(2))[1]);
  dit(2, `$${c} \\times ${c} = ${c * c}$ cm²`);
  dit(2, `$${c} + ${c} = ${2 * c}$, ou $4 \\times ${c} = ${4 * c}$`);
  vrai("2. le schéma", lacet(plan(2, "schema").polys[0]) === c * c);
});
essai("3", () => {
  const [poly] = plan(3, "schema").polys;
  const [L, l] = cotes(poly);
  vrai("3. l'énoncé", e(3).includes(`$${t(L)}$ m sur $${t(l)}$ m`));
  dit(3, `$${t(L)} \\times ${t(l)} = ${t(r9(lacet(poly)))}$ m²`);
  dit(3, `Réponse : l'aire du tapis est $${t(r9(lacet(poly)))}$ m².`);
});
essai("4", () => {
  const A = nb(/une aire de \$(\d+)\$ m²/.exec(e(4))[1]);
  const c = Math.sqrt(A);
  vrai("4. un carré parfait", Number.isInteger(c));
  dit(4, `$${c} \\times ${c} = ${A}$`);
  dit(4, `$${A / 4}$ m`);
  dit(4, `Réponse : un côté mesure $${c}$ m.`);
  vrai("4. le schéma", lacet(plan(4, "schema").polys[0]) === A);
});
essai("5", () => {
  const [A, B, C] = aires(plan(5, "figure"));
  const p = plan(5, "figure");
  dit(5, `A : $6 \\times 2 = ${A}$ cm²`);
  dit(5, `$4 \\times 4 = ${B}$ cm²`);
  dit(5, `C : $5 \\times 3 = ${C}$ cm²`);
  const r = [["A", A], ["B", B], ["C", C]].sort((a, b) => a[1] - b[1]);
  dit(5, `$${r.map((x) => x[1]).join(" < ")}$`);
  dit(5, `Réponse : ${r.map((x) => x[0]).join(", puis ")}.`);
  vrai("5. A est la plus longue", cotes(p.polys[0])[0] === Math.max(...p.polys.map((q) => cotes(q)[0])));
});
essai("6", () => {
  const A = nb(/une aire de \$(\d+)\$ m²/.exec(e(6))[1]), l = nb(/largeur est \$(\d+)\$ m/.exec(e(6))[1]);
  dit(6, `$${A} \\div ${l} = ${A / l}$ m`);
  dit(6, `$${A / l} \\times ${l} = ${A}$ m²`);
  vrai("6. le schéma", lacet(plan(6, "schema").polys[0]) === A);
});
essai("7", () => {
  const [poly] = plan(7, "figure").polys;
  const A = lacet(poly);
  dit(7, `$8 \\times 3 = 24$ cm²`);
  dit(7, `$7 - 3 = 4$ cm de haut. $3 \\times 4 = 12$ cm²`);
  dit(7, `$24 + 12 = ${A}$ cm²`);
  dit(7, `$21 + 15 = ${A}$ cm²`);
  dit(7, `$8 \\times 7 = 56$ cm²`);
  vrai("7. les deux découpages", 8 * 3 + 3 * 4 === A && 3 * 7 + 5 * 3 === A);
});
essai("8", () => {
  const [A, B] = aires(plan(8, "figure"));
  vrai("8. même aire", A === B);
  dit(8, `A : $10 \\times 3 = ${A}$ cm²`);
  dit(8, `B : $6 \\times 5 = ${B}$ cm²`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [ter, bas] = aires(plan(9, "figure"));
  dit(9, `$8 \\times 5 = ${ter}$ m²`);
  dit(9, `$3 \\times 2 = ${bas}$ m²`);
  dit(9, `$${ter} - ${bas} = ${ter - bas}$ m²`);
  dit(9, `trouver $${ter + bas}$ m²`);
});
essai("10", () => {
  const [U] = plan(10, "figure").polys;
  const A = lacet(U);
  const morceaux = aires(plan(10, "schema"));
  vrai("10. les trois morceaux recouvrent le U", morceaux.reduce((a, b) => a + b, 0) === A);
  dit(10, `$7 \\times 2 = ${morceaux[0]}$ cm²`);
  dit(10, `$2 \\times 3 = ${morceaux[1]}$ cm²`);
  dit(10, `$${morceaux.join(" + ")} = ${A}$ cm²`);
  const xs = U.map((q) => q[0]), ys = U.map((q) => q[1]);
  const R = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
  dit(10, `$7 \\times 5 = ${R}$ cm²`);
  dit(10, `$3 \\times 3 = ${R - A}$ cm²`);
  dit(10, `$${R} - ${R - A} = ${A}$ cm²`);
});
essai("11", () => {
  const [L, l] = [...e(11).matchAll(/\$(\d+)\$ cm/g)].map((m) => nb(m[1]));
  const P = 2 * (L + l), c = P / 4;
  dit(11, `$${L} + ${l} = ${L + l}$, puis $2 \\times ${L + l} = ${P}$ cm`);
  dit(11, `$${L} \\times ${l} = ${L * l}$ cm²`);
  dit(11, `$${P} \\div 4 = ${c}$ cm`);
  dit(11, `$${c} \\times ${c} = ${c * c}$ cm²`);
  vrai("11. le carré gagne", c * c > L * l);
  const [r, q] = aires(plan(11, "schema"));
  vrai("11. le schéma", r === L * l && q === c * c);
});
essai("12", () => {
  const p = plan(12, "figure");
  const [mur, porte] = aires(p);
  dit(12, `$4 \\times 2{,}5 = ${mur}$ m²`);
  dit(12, `$0{,}8 \\times 2 = ${t(r9(porte))}$ m²`);
  const peint = r9(mur - porte);
  dit(12, `$${mur} - ${t(r9(porte))} = ${t(peint)}$ m²`);
  const pot = nb(/couvre \$(\d+)\$ m²/.exec(e(12))[1]);
  vrai("12. deux pots", Math.ceil(peint / pot) === 2);
  dit(12, `Réponse : a) $${t(peint)}$ m² ; b) $${Math.ceil(peint / pot)}$ pots.`);
  vrai("12. la porte touche le sol", p.trous[0].some((q) => q[1] === 0));
});
essai("13", () => {
  const p = plan(13, "figure");
  const [poly] = p.polys;
  const m2 = r9(lacet(poly) / 10000), dm2 = r9(lacet(poly) / 100);
  const pas = p.grille.pas;
  const aff = r9((pas * pas) / 100);
  dit(13, `$1{,}5 \\times 1 = ${t(m2)}$ m²`);
  dit(13, `$${t(m2)} \\times 100 = ${dm2}$ dm²`);
  dit(13, `$5 \\times 5 = ${aff}$ dm²`);
  dit(13, `$${dm2} \\div ${aff} = ${dm2 / aff}$ affiches`);
  const [L, l] = cotes(poly);
  dit(13, `$${L / pas}$ affiches par rangée, $${l / pas}$ rangées. $${L / pas} \\times ${l / pas} = ${(L / pas) * (l / pas)}$`);
  vrai("13. les deux comptes", dm2 / aff === (L / pas) * (l / pas));
});
essai("14", () => {
  const L = [...e(14).matchAll(/(A|B|C) : un (rectangle|carré) de \$(\d+)\$ m(?: sur \$(\d+)\$ m)?/g)].map((m) => ({ n: m[1], a: nb(m[3]) * (m[4] ? nb(m[4]) : nb(m[3])) }));
  vrai("14. trois terrains", L.length === 3);
  dit(14, `A : $30 \\times 20 = ${L[0].a}$ m²`);
  dit(14, `B : $25 \\times 25 = ${L[1].a}$ m²`);
  dit(14, `C : $40 \\times 15 = ${L[2].a}$ m²`);
  const max = L.reduce((a, b) => (b.a > a.a ? b : a));
  dit(14, `Réponse : le terrain ${max.n}, avec $${max.a}$ m².`);
  const [, lig] = dessin("tableau", 14);
  vrai("14. le tableau", L.every((x, i) => nb(lig[i + 1]) === x.a));
});
essai("15", () => {
  const p = plan(15, "figure");
  const [croix] = p.polys;
  vrai("15. tous les côtés mesurent 2 m", cotes(croix).every((x) => x === 2));
  const A = lacet(croix);
  dit(15, `$2 \\times 2 = 4$ m²`);
  dit(15, `$5 \\times 4 = ${A}$ m²`);
  dit(15, `$6 \\times 6 = 36$ m²`);
  vrai("15. cinq carrés", A / 4 === 5);
});
essai("16", () => {
  const [grand, petit] = plan(16, "figure").polys;
  const [a, b] = [lacet(petit), lacet(grand)];
  vrai("16. les deux côtés doublés", cotes(grand)[0] === 2 * cotes(petit)[0] && cotes(grand)[1] === 2 * cotes(petit)[1]);
  dit(16, `$3 \\times 2 = ${a}$ cm²`);
  dit(16, `$6 \\times 4 = ${b}$ cm²`);
  dit(16, `$${b} = ${b / a} \\times ${a}$`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [poly] = plan(17, "figure").polys;
  const cs = cotes(poly);
  const A = lacet(poly);
  dit(17, `$6 - 4 = ${cs[2]}$ m`);
  dit(17, `$5 - 3 = ${cs[3]}$ m`);
  dit(17, `$18 + 8 = ${A}$ m²`);
  const paq = nb(/couvre \$(\d+)\$ m²/.exec(e(17))[1]), prix = nb(/coûte \$(\d+)\$ €/.exec(e(17))[1]);
  dit(17, `$${A} \\div ${paq} = ${A / paq}$ paquets`);
  dit(17, `$${A / paq} \\times ${prix} = ${(A / paq) * prix}$ €`);
});
essai("18", () => {
  const p = plan(18, "figure");
  const [j, allee, pot] = aires(p);
  const pel = j - allee - pot;
  dit(18, `$15 \\times 10 = ${j}$ m²`);
  dit(18, `$15 \\times 1 = ${allee}$ m²`);
  dit(18, `$4 \\times 4 = ${pot}$ m²`);
  dit(18, `$${j} - ${allee} - ${pot} = ${pel}$ m²`);
  const sac = nb(/pour \$(\d+)\$ m²/.exec(e(18))[1]);
  const k = Math.ceil(pel / sac);
  dit(18, `Il faut $${k}$ sacs`);
  vrai("18. les trous ne se chevauchent pas", !p.trous[1].some((q) => dedans(q, p.trous[0])));
});
essai("19", () => {
  const p = plan(19, "figure");
  const [poly] = p.polys;
  const [L, l] = cotes(poly);
  const pas = p.grille.pas;
  dit(19, `$240 \\div 30 = ${L / pas}$ carreaux`);
  dit(19, `$180 \\div 30 = ${l / pas}$ rangées`);
  const n = (L / pas) * (l / pas);
  dit(19, `$${L / pas} \\times ${l / pas} = ${n}$ carreaux`);
  const dm2 = r9(lacet(poly) / 100), m2 = r9(lacet(poly) / 10000), c = r9((pas * pas) / 100);
  dit(19, `$2{,}4 \\times 1{,}8 = ${t(m2)}$ m², soit $${dm2}$ dm²`);
  dit(19, `$3 \\times 3 = ${c}$ dm²`);
  dit(19, `$${dm2} \\div ${c} = ${dm2 / c}$`);
  vrai("19. les deux comptes", dm2 / c === n);
});
essai("20", () => {
  const P = nb(/a \$(\d+)\$ m de grillage/.exec(e(20))[1]);
  const demi = P / 2;
  dit(20, `$${P} \\div 2 = ${demi}$ m`);
  const rect = Array.from({ length: Math.floor(demi / 2) }, (_, i) => [demi - 1 - i, 1 + i]);
  const [, lignes] = dessin("table", 20);
  vrai("20. le tableau liste tous les rectangles", lignes.length === rect.length && lignes.every((l, i) => parseFloat(l[0]) === rect[i][0] && parseFloat(l[1]) === rect[i][1] && parseFloat(l[2]) === rect[i][0] * rect[i][1]));
  const best = rect.reduce((a, b) => (b[0] * b[1] > a[0] * a[1] ? b : a));
  vrai("20. le meilleur est le carré", best[0] === best[1]);
  dit(20, `le carré de $${best[0]}$ m de côté, avec $${best[0] * best[1]}$ m²`);
  dit(20, `$11 \\times 1 = 11$ m²`);
});

f.fin();
