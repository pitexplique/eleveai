// Recalcul indépendant de la feuille « Les périmètres » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-aire-perimetre.tsx.
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « 2 × 17 = 34 cm » ; ici chaque
// périmètre est refait en additionnant les côtés que le dessin `plan()` TRACE,
// relus dans le source. Chaque cote chiffrée doit mesurer, sur le dessin, ce
// qu'elle annonce (une cote en cm sur un plan en m est convertie) ; sur un
// quadrillage, chaque sommet tombe sur un nœud.
// ⭐ LE RENDU : la mise en page des étiquettes de `plan()` est rejouée ici —
// viewBox de 300 de large au plus, et deux étiquettes qui se touchent sont
// refusées. Les bandes : étiquettes dans le cadre, sans chevauchement.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-aire-perimetre.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-aire-perimetre.tsx", "aire_perimetre", ["plan", "bande", "table"], "6e");
const { e, vrai, verif, dit, dessin, appels, essai } = f;

/* ── Géométrie ─────────────────────────────────────────────────────────── */
const dist = ([a, b], [c, d]) => Math.hypot(c - a, d - b);
const cotes = (pts) => pts.map((p, i) => +dist(p, pts[(i + 1) % pts.length]).toFixed(9));
const perimetre = (pts) => +cotes(pts).reduce((s, x) => s + x, 0).toFixed(9);
const lacet = (pts) => Math.abs(pts.reduce((s, [x1, y1], i) => s + x1 * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y1, 0)) / 2;
const U = { m: 1, dm: 0.1, cm: 0.01, mm: 0.001 };
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
const r9 = (x) => Math.round(x * 1e9) / 1e9;
/** « 7,5 m », « 60 cm » sur un plan en `unite` → la valeur dans l'unité du plan ; null sans nombre. */
const lit = (label, unite) => {
  const m = [...String(label).matchAll(/(\d+(?:,\d+)?)\s*(cm|dm|mm|m)\b/g)].at(-1);
  return m ? r9((nb(m[1]) * U[m[2]]) / U[unite]) : null;
};
const L8 = (s) => s.length * 8.8;

const lire = ([unite, formes]) => ({
  unite,
  formes,
  polys: formes.filter((x) => x.poly).map((x) => x.poly),
  cotesDessin: formes.filter((x) => x.cote),
  grille: formes.find((x) => x.grille),
});
const plan = (k, role) => lire(dessin("plan", k, role));

/* ── Contrôles de TOUS les plans : cotes, nœuds, rendu ─────────────────── */
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
  const poser = (M, n, t) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    et.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, a });
  };
  for (const x of formes) {
    if (x.cote) {
      const [a, b] = x.cote.map(P);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const d = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
      const M = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = [-d[1], d[0]];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (x.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, x.label);
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
    if (v === null) continue;
    verif(`${ou} : cote « ${x.label} » mesurée sur le dessin`, dist(...x.cote), v, 1e-6);
  }
  if (p.grille && (p.grille.pas ?? 1) === 1) for (const poly of p.polys) vrai(`${ou} : sommets sur les nœuds du quadrillage`, poly.flat().every(Number.isInteger));
  // Un angle droit codé est vraiment droit.
  for (const x of p.formes.filter((x) => x.droit)) {
    const [V, A, B] = x.droit;
    vrai(`${ou} : l'angle codé en ${V} est droit`, Math.abs((A[0] - V[0]) * (B[0] - V[0]) + (A[1] - V[1]) * (B[1] - V[1])) < 1e-9);
  }
  const r = rendu(p.formes);
  vrai(`${ou} : viewBox de ${Math.round(r.largeur)} de large, 300 au plus`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++)
    for (let j = i + 1; j < r.boites.length; j++) {
      const [b1, b2] = [r.boites[i], r.boites[j]];
      vrai(`${ou} : « ${b1.t} » et « ${b2.t} » ne se touchent pas`, !(Math.min(b1.d, b2.d) - Math.max(b1.g, b2.g) > 0 && Math.abs(b1.y - b2.y) < 18));
    }
}
for (const { args } of appels("bande").filter((a) => a.args)) {
  const [total, morceaux] = args;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  vrai(`bande ${total} : le total est la somme des morceaux`, nb(total.replace(/[^\d,\s]/g, "").trim()) === somme);
  vrai(`bande ${total} : le titre tient`, L8(`le tour déplié : ${total}`) <= 290);
  const u = 276 / somme;
  let x = 12, fin = -Infinity;
  for (const m of morceaux) {
    const w = m.valeur * u;
    vrai(`bande ${total} : l'étiquette « ${m.label} » dit la longueur du morceau`, nb(m.label.replace(/[^\d,]/g, "")) === m.valeur);
    if (L8(m.label) > w - 6) {
      const demi = L8(m.label) / 2;
      const cx = Math.min(Math.max(x + w / 2, 12 + demi), 288 - demi);
      vrai(`bande ${total} : « ${m.label} » (dessous) ne touche pas sa voisine`, cx - demi >= fin + 4);
      fin = cx + demi;
    }
    x += w;
  }
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [poly] = plan(1, "figure").polys;
  dit(1, `$${cotes(poly).join(" + ")} = ${perimetre(poly)}$ cm.`);
  dit(1, `Cela donne $${lacet(poly)}$ : c'est l'aire`);
  dit(1, `Réponse : le périmètre de la figure est $${perimetre(poly)}$ cm.`);
});
essai("2", () => {
  const rep = e(2).split("\\n").slice(1).map((l) => (/(Clôturer|ruban autour|bordure autour)/.test(l) ? "périmètre" : /(moquette|Peindre)/.test(l) ? "aire" : "?"));
  vrai("2. cinq travaux reconnus", rep.every((x) => x !== "?"));
  dit(2, `Réponse : ${rep.map((x, i) => `${"abcde"[i]}) ${x}`).join(" ; ")}.`);
});
essai("3", () => {
  const c = nb(/un côté de \$([^$]+)\$ cm/.exec(e(3))[1]);
  dit(3, `$4 \\times ${c} = ${4 * c}$ cm`);
  dit(3, `$${c} \\times ${c} = ${c * c}$`);
  dit(3, `Réponse : le périmètre du carré est $${4 * c}$ cm.`);
  const [, morceaux] = dessin("bande", 3);
  vrai("3. le tour déplié : quatre côtés", morceaux.length === 4 && morceaux.every((m) => m.valeur === c));
});
essai("4", () => {
  const [poly] = plan(4, "figure").polys;
  const [L, l] = cotes(poly);
  dit(4, `$${L} + ${l} = ${L + l}$ cm`);
  dit(4, `$2 \\times ${L + l} = ${perimetre(poly)}$ cm`);
  dit(4, `Réponse : le périmètre du rectangle est $${perimetre(poly)}$ cm.`);
});
essai("5", () => {
  const [poly] = plan(5, "figure").polys;
  const [a, b, c] = cotes(poly);
  dit(5, `$${t(a)} + ${t(c)} + ${t(b)} = ${t(perimetre(poly))}$ cm`);
  dit(5, `Réponse : le périmètre du triangle est $${t(perimetre(poly))}$ cm.`);
});
essai("6", () => {
  const [poly] = plan(6, "figure").polys;
  vrai("6. cinq côtés", poly.length === 5);
  dit(6, `$${cotes(poly).join(" + ")} = ${perimetre(poly)}$ cm`);
  dit(6, `Réponse : le périmètre de la façade est $${perimetre(poly)}$ cm.`);
});
essai("7", () => {
  const P = nb(/un périmètre de \$(\d+)\$ cm/.exec(e(7))[1]);
  dit(7, `$${P} \\div 4 = ${P / 4}$ cm`);
  dit(7, `$4 \\times ${P / 4} = ${P}$ cm`);
  dit(7, `Réponse : un côté mesure $${P / 4}$ cm.`);
  const [, morceaux] = dessin("bande", 7);
  vrai("7. la bande", morceaux.length === 4 && morceaux.every((m) => m.valeur === P / 4));
});
essai("8", () => {
  const p = plan(8, "figure");
  const [poly] = p.polys;
  const [Lm, lm] = cotes(poly);
  vrai("8. l'énoncé : 1,8 m et 60 cm", e(8).includes(`$${t(Lm)}$ m de long`) && e(8).includes(`$${r9(lm * 100)}$ cm de large`));
  const [L, l] = [r9(Lm * 100), r9(lm * 100)];
  dit(8, `$${t(Lm)}$ m $= ${L}$ cm`);
  dit(8, `$${L} + ${l} = ${L + l}$ cm`);
  dit(8, `$2 \\times ${L + l} = ${2 * (L + l)}$ cm, soit $${t(r9(perimetre(poly)))}$ m`);
  vrai("8. le lacet redonne le même tour", r9(perimetre(poly) * 100) === 2 * (L + l));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [A, B, C] = plan(9, "figure").polys;
  dit(9, `A : $${cotes(A).join(" + ")} = ${perimetre(A)}$ cm.`);
  dit(9, `B : $${cotes(B).join(" + ")} = ${perimetre(B)}$ cm.`);
  vrai("9. C : douze côtés de 1", cotes(C).length === 12 && cotes(C).every((x) => x === 1));
  dit(9, `C : $${C.length}$ petits côtés de $1$ cm, soit $${perimetre(C)}$ cm.`);
  vrai("9. mêmes périmètres", perimetre(A) === perimetre(B) && perimetre(B) === perimetre(C));
  dit(9, `A a plus de carreaux : $${lacet(A)}$, contre $${lacet(B)}$.`);
  vrai("9. B et C ont la même aire", lacet(B) === lacet(C));
  dit(9, `Réponse : $${perimetre(A)}$ cm chacune ; Jade a tort.`);
});
essai("10", () => {
  const [poly] = plan(10, "figure").polys;
  const P = nb(/périmètre est \$(\d+)\$ m/.exec(e(10))[1]);
  const L = nb(/longueur est \$(\d+)\$ m/.exec(e(10))[1]);
  const l = P / 2 - L;
  vrai("10. le dessin : le rectangle a ce tour", perimetre(poly) === P && cotes(poly)[0] === L && cotes(poly)[1] === l);
  dit(10, `$${P} \\div 2 = ${P / 2}$ m`);
  dit(10, `$${P / 2} - ${L} = ${l}$ m`);
  dit(10, `$2 \\times (${L} + ${l}) = 2 \\times ${L + l} = ${P}$ m`);
  dit(10, `$${P} - ${L} = ${P - L}$ m`);
  dit(10, `Réponse : la largeur est $${l}$ m.`);
});
essai("11", () => {
  const p = plan(11, "figure");
  const [poly] = p.polys;
  const cs = cotes(poly);
  const ecrits = p.cotesDessin.map((x) => lit(x.label, "cm"));
  const manquent = cs.filter((x, i) => !p.cotesDessin.some((c) => dist(...c.cote) === x && [poly[i], poly[(i + 1) % poly.length]].every((q) => c.cote.some((r) => dist(q, r) < 1e-9))));
  vrai("11. deux côtés sans nombre", manquent.length === 2 && ecrits.length === 4);
  dit(11, `$10 - 4 = ${manquent[0]}$ cm`);
  dit(11, `$7 - 4 = ${manquent[1]}$ cm`);
  dit(11, `$${cs.join(" + ")} = ${perimetre(poly)}$ cm`);
  dit(11, `Réponse : a) $${manquent[0]}$ cm et $${manquent[1]}$ cm ; b) le périmètre est $${perimetre(poly)}$ cm.`);
});
essai("12", () => {
  const P = nb(/une ficelle de \$(\d+)\$ cm/.exec(e(12))[1]);
  const L = nb(/rectangle de \$(\d+)\$ cm de long/.exec(e(12))[1]);
  dit(12, `$${P} \\div 4 = ${t(P / 4)}$ cm`);
  dit(12, `$${P} \\div 2 = ${P / 2}$ cm`);
  dit(12, `$${P / 2} - ${L} = ${P / 2 - L}$ cm`);
  dit(12, `$${P} \\div 3 = ${P / 3}$ cm`);
  dit(12, `Réponse : a) $${t(P / 4)}$ cm ; b) $${P / 2 - L}$ cm ; c) $${P / 3}$ cm.`);
  const [, morceaux] = dessin("bande", 12);
  vrai("12. la bande : L, l, L, l", JSON.stringify(morceaux.map((m) => m.valeur)) === JSON.stringify([L, P / 2 - L, L, P / 2 - L]));
});
essai("13", () => {
  const p = plan(13, "figure");
  const [poly] = p.polys;
  const portillon = lit(p.cotesDessin[1].label, "m");
  const P = perimetre(poly);
  const prix = nb(/coûte \$(\d+)\$ €/.exec(e(13))[1]);
  dit(13, `$4 \\times ${t(cotes(poly)[0])} = ${P}$ m`);
  dit(13, `$${P} - ${portillon} = ${P - portillon}$ m`);
  dit(13, `$${P - portillon} \\times ${prix} = ${(P - portillon) * prix}$ €`);
  dit(13, `Réponse : a) $${P - portillon}$ m de grillage ; b) $${(P - portillon) * prix}$ €.`);
  vrai("13. le portillon est sur un côté du carré", p.formes.find((x) => x.trait).trait.every(([, y]) => y === 7.5));
});
essai("14", () => {
  const [l, L] = [...e(14).matchAll(/\$(\d+)\$ cm/g)].map((m) => nb(m[1]));
  const P = 2 * (l + L), prix = nb(/coûte \$(\d+)\$ €/.exec(e(14))[1]);
  dit(14, `$${l} + ${L} = ${l + L}$ cm, puis $2 \\times ${l + L} = ${P}$ cm`);
  dit(14, `$${P} \\div 100 = ${t(P / 100)}$ m`);
  dit(14, `$${t(P / 100)} \\times ${prix} = ${t((P / 100) * prix)}$`);
  dit(14, `$${P} \\times ${prix} = ${t(P * prix)}$ €`);
  const [poly] = plan(14, "schema").polys;
  vrai("14. le schéma", perimetre(poly) === P);
});
essai("15", () => {
  const [ligne, L] = plan(15, "figure").polys;
  const c = nb(/carrés de \$(\d+)\$ cm/.exec(e(15))[1]);
  vrai("15. trois carrés chacun", lacet(ligne) === 3 * c * c && lacet(L) === 3 * c * c);
  dit(15, `$4 \\times ${c} = ${4 * c}$ cm`);
  const [a, b] = cotes(ligne);
  dit(15, `$${a} + ${b} = ${a + b}$, puis $2 \\times ${a + b} = ${perimetre(ligne)}$ cm`);
  dit(15, `$${cotes(L).join(" + ")} = ${perimetre(L)}$ cm`);
  vrai("15. 3 × 16 = 48 est l'énoncé", e(15).includes(`$3 \\times ${4 * c} = ${12 * c}$ cm`));
  dit(15, `Réponse : a) $${4 * c}$ cm ; b) $${perimetre(ligne)}$ cm ; c) $${perimetre(L)}$ cm`);
});
essai("16", () => {
  const c = nb(/un côté de \$([^$]+)\$ cm/.exec(e(16))[1]);
  dit(16, `a) $4 \\times ${t(c)} = ${4 * c}$ cm.`);
  dit(16, `$2 \\times ${t(c)} = ${2 * c}$ cm`);
  dit(16, `$4 \\times ${2 * c} = ${8 * c}$ cm`);
  dit(16, `$${t(c)} + 2 = ${t(c + 2)}$ cm`);
  dit(16, `$4 \\times ${t(c + 2)} = ${4 * (c + 2)}$ cm`);
  dit(16, `$${4 * (c + 2)} - ${4 * c} = ${4 * (c + 2) - 4 * c}$ cm`);
  const [grand, petit] = plan(16, "schema").polys;
  vrai("16. le schéma : 6,5 et 13", perimetre(petit) === 4 * c && perimetre(grand) === 8 * c);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [poly] = plan(17, "figure").polys;
  const [L, l] = cotes(poly);
  const P = perimetre(poly);
  dit(17, `$${L} + ${l} = ${L + l}$ m, puis $2 \\times ${L + l} = ${P}$ m`);
  dit(17, `$3 \\times ${P} = ${3 * P}$ m`);
  const n = Math.ceil(1000 / P);
  dit(17, `$${n - 1} \\times ${P} = ${(n - 1) * P}$ m`);
  dit(17, `$${n} \\times ${P} = ${t(n * P)}$ m`);
  dit(17, `Réponse : a) $${P}$ m ; b) $${3 * P}$ m ; c) $${n}$ tours.`);
});
essai("18", () => {
  const p = plan(18, "figure");
  const [poly] = p.polys;
  const cs = cotes(poly);
  const P = perimetre(poly);
  const portail = nb(/portail de \$(\d+)\$ m/.exec(e(18))[1]);
  const r = nb(/rouleaux de \$(\d+)\$ m/.exec(e(18))[1]), prix = nb(/à \$(\d+)\$ €/.exec(e(18))[1]);
  const ecrits = p.cotesDessin.map((x) => lit(x.label, "m"));
  dit(18, `$20 - 8 = ${cs[2]}$ m`);
  dit(18, `$18 - 12 = ${cs[3]}$ m`);
  dit(18, `$${cs.join(" + ")} = ${P}$ m`);
  dit(18, `$${P} - ${portail} = ${P - portail}$ m`);
  const k = Math.ceil((P - portail) / r);
  dit(18, `Il faut $${k}$ rouleaux`);
  dit(18, `$${k} \\times ${prix} = ${k * prix}$ €`);
  dit(18, `trouver $${ecrits.reduce((a, b) => a + b, 0)}$ m`);
});
essai("19", () => {
  const g = nb(/guirlande de \$(\d+)\$ m/.exec(e(19))[1]) * 100;
  const [f1, f2] = plan(19, "schema").polys;
  const [P1, P2] = [r9(perimetre(f1)), r9(perimetre(f2))];
  vrai("19. l'énoncé et le schéma", e(19).includes("$90$ cm de large et $1{,}2$ m de haut") && e(19).includes("$90$ cm sur $2{,}1$ m") && cotes(f1)[1] === 120 && cotes(f2)[1] === 210);
  dit(19, `$90 + 120 = 210$ cm, puis $2 \\times 210 = ${P1}$ cm, soit $${t(P1 / 100)}$ m`);
  dit(19, `Il reste $5 - ${t(P1 / 100)} = ${t(r9((g - P1) / 100))}$ m, soit $${g - P1}$ cm`);
  dit(19, `$90 + 210 = 300$ cm, puis $2 \\times 300 = ${P2}$ cm, soit $${P2 / 100}$ m`);
  dit(19, `Il manque $${(P2 - g) / 100}$ m`);
});
essai("20", () => {
  const [ligne, rect] = plan(20, "figure").polys;
  const n = nb(/on a \$(\d+)\$ tables/.exec(e(20))[1]);
  vrai("20. six tables dans chaque disposition", lacet(ligne) === n && lacet(rect) === n);
  const [P1, P2] = [perimetre(ligne), perimetre(rect)];
  dit(20, `$6 + 1 = 7$, puis $2 \\times 7 = ${P1}$ m. On assoit $${P1}$ personnes.`);
  dit(20, `$3 + 2 = 5$, puis $2 \\times 5 = ${P2}$ m. On assoit $${P2}$ personnes.`);
  const inv = nb(/Il y a \$(\d+)\$ invités/.exec(e(20))[1]);
  vrai("20. seule la ligne suffit", P1 >= inv && P2 < inv);
  dit(20, `$${n} \\times 4 = ${4 * n}$ places`);
  dit(20, `Réponse : a) $${P1}$ ; b) $${P2}$ ; c) la ligne`);
});

f.fin();
