// Recalcul indépendant de la feuille « L'aire et ses unités » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-aire-unite.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque aire est refaite par la FORMULE DU LACET sur les
// coordonnées que le dessin `plan()` TRACE ; les carreaux entiers sont COMPTÉS
// un par un (ses quatre coins dans la figure), les demi-carreaux s'en
// déduisent. Chaque cote chiffrée est relue à l'échelle (une cote en cm sur un
// plan en dm est convertie). Les conversions : le script connaît seulement
// 1 m² = 100 dm² = 10 000 cm², et vérifie qu'aucune conversion hors programme
// (cm² ↔ m² directe, km², mm²) n'est DEMANDÉE.
// ⭐ LE RENDU : la mise en page des étiquettes de `plan()` est rejouée ici.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-aire-unite.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-aire-unite.tsx", "aire_unite", ["plan", "carreCent", "table"], "6e");
const { e, vrai, verif, dit, dessin, appels, essai, src } = f;

/* ── Géométrie ─────────────────────────────────────────────────────────── */
const lacet = (pts) => Math.abs(pts.reduce((s, [x1, y1], i) => s + x1 * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * y1, 0)) / 2;
const dist = ([a, b], [c, d]) => Math.hypot(c - a, d - b);
const perimetre = (pts) => pts.reduce((s, p, i) => s + dist(p, pts[(i + 1) % pts.length]), 0);
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
/** Les carreaux entiers d'un polygone, rangée par rangée (de bas en haut). */
const rangees = (poly) => {
  const ys = poly.map((p) => p[1]), xs = poly.map((p) => p[0]);
  const res = [];
  for (let y = Math.min(...ys); y < Math.max(...ys); y++) {
    let n = 0;
    for (let x = Math.min(...xs); x < Math.max(...xs); x++) if ([[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]].every((q) => couvre(q, poly))) n++;
    res.push(n);
  }
  return res;
};
const somme = (a) => a.reduce((s, x) => s + x, 0);

const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const UL = { km: 1000, m: 1, dm: 0.1, cm: 0.01, mm: 0.001 };
/** Aires en m². */
const UA = { "km²": 1e6, "m²": 1, "dm²": 1e-2, "cm²": 1e-4, "mm²": 1e-6 };
const convA = (v, de, vers) => r9((v * UA[de]) / UA[vers]);
const lit = (label, unite) => {
  const m = [...String(label).matchAll(/(\d+(?:,\d+)?)\s*(cm|dm|mm|m)\b/g)].at(-1);
  return m ? r9((nb(m[1]) * UL[m[2]]) / UL[unite]) : null;
};

const lire = ([unite, formes]) => ({ unite, formes, polys: formes.filter((x) => x.poly).map((x) => x.poly), cotesDessin: formes.filter((x) => x.cote), grille: formes.find((x) => x.grille) });
const plan = (k, role) => lire(dessin("plan", k, role));

/* ── Contrôles de TOUS les plans ─────────────────────────────────────────── */
function rendu(formes) {
  const geo = [];
  for (const x of formes) {
    if (x.poly) geo.push(...x.poly);
    else if (x.grille) geo.push([x.grille[0], x.grille[1]], [x.grille[2], x.grille[3]]);
    else if (x.trait) geo.push(...x.trait);
    else if (x.cote) geo.push(...x.cote);
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
    for (const poly of p.polys) vrai(`${ou} : sommets sur les nœuds (ou au demi) du quadrillage`, poly.flat().every((v) => Number.isInteger(r9((2 * v) / pas))));
  }
  const r = rendu(p.formes);
  vrai(`${ou} : viewBox de ${Math.round(r.largeur)} de large, 300 au plus`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++)
    for (let j = i + 1; j < r.boites.length; j++) {
      const [b1, b2] = [r.boites[i], r.boites[j]];
      vrai(`${ou} : « ${b1.t} » et « ${b2.t} » ne se touchent pas`, !(Math.min(b1.d, b2.d) - Math.max(b1.g, b2.g) > 0 && Math.abs(b1.y - b2.y) < 18));
    }
}
for (const { args } of appels("carreCent").filter((a) => a.args)) {
  const [grande, colorees] = args;
  vrai(`carreCent ${grande} : m ou dm, 0 à 100 cases`, ["m", "dm"].includes(grande) && Number.isInteger(colorees) && colorees >= 0 && colorees <= 100);
}

/* ⛔ Aucune conversion hors programme DEMANDÉE : pas de « … cm² en m² », pas de km² ni de mm² à convertir. */
const demandes = [...src.matchAll(/\$[^$]+\$ ([a-z]+²) en ([a-z]+²)/g)].map((m) => `${m[1]}→${m[2]}`);
vrai(`conversions demandées : m² ↔ dm² ou dm² ↔ cm² seulement (${demandes})`, demandes.every((d) => ["m²→dm²", "dm²→m²", "dm²→cm²", "cm²→dm²"].includes(d)));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  // Grandeur (L ou A) et ordre de grandeur, en m ou en m² : une seule unité plausible.
  const lignes = e(1).split("\\n").slice(1);
  const attendu = [["feuille", "A", [0.03, 0.1]], ["couloir", "L", [5, 30]], ["chambre", "A", [6, 25]], ["timbre", "L", [0.015, 0.05]]];
  const offertes = ["cm", "cm²", "m", "m²"];
  const val = (u) => (u.endsWith("²") ? ["A", UA[u]] : ["L", UL[u]]);
  const rep = attendu.map(([mot, g, [lo, hi]], i) => {
    vrai(`1. la ligne ${i + 1} parle de ${mot}`, lignes[i].includes(mot) && lignes[i].includes(g === "A" ? "surface" : "de l"));
    const v = nb(/\$(\d+)\$/.exec(lignes[i])[1]);
    const ok = offertes.filter((u) => val(u)[0] === g && v * val(u)[1] >= lo && v * val(u)[1] <= hi);
    vrai(`1. ${mot} : une seule unité plausible (${ok})`, ok.length === 1);
    return ok[0];
  });
  dit(1, `Réponse : ${rep.map((u, i) => `${"abcd"[i]}) ${u}`).join(" ; ")}.`);
});
essai("2", () => {
  const [poly] = plan(2, "figure").polys;
  const r = rangees(poly);
  vrai("2. que des carreaux entiers", somme(r) === lacet(poly));
  dit(2, `$${r.join(" + ")} = ${somme(r)}$ carreaux`);
  dit(2, `Réponse : l'aire de la figure est $${lacet(poly)}$ cm².`);
});
essai("3", () => {
  const [poly] = plan(3, "figure").polys;
  const r = rangees(poly), A = lacet(poly), entiers = somme(r), demis = (A - entiers) * 2;
  dit(3, `$${r.filter((x) => x > 0).join(" + ")} = ${entiers}$`);
  dit(3, `J'en compte $${demis}$.`);
  dit(3, `$${demis}$ moitiés font $${demis / 2}$ carreaux`);
  dit(3, `$${entiers} + ${demis / 2} = ${A}$ carreaux, soit $${A}$ cm²`);
  dit(3, `et trouver $${entiers + demis}$`);
  dit(3, `Réponse : a) $${entiers}$ ; b) $${demis}$ ; c) $${A}$ cm².`);
});
essai("4", () => {
  const p = plan(4, "figure");
  const [a, b] = p.polys;
  const g2 = p.formes.filter((x) => x.grille)[1];
  vrai("4. le même rectangle", lacet(a) === lacet(b) && perimetre(a) === perimetre(b));
  const n1 = lacet(a), n2 = lacet(b) / (g2.pas * g2.pas);
  dit(4, `soit $${n1}$ carrés de $1$ cm`);
  dit(4, `Lou : $${n2}$ carrés de $${g2.pas}$ cm de côté`);
  dit(4, `l'aire est $${n1}$ cm²`);
  dit(4, `Réponse : a) $${n1}$ et $${n2}$`);
});
essai("5", () => {
  const p = plan(5, "figure");
  const [grand] = p.polys;
  const cote = dist(grand[0], grand[1]);
  vrai("5. le carré fait 1 m = 10 dm", cote === 10 && lit(p.cotesDessin[0].label, "dm") === 10);
  dit(5, `a) Une rangée contient $${cote}$ petits carrés.`);
  dit(5, `b) Il y a $${cote}$ rangées.`);
  dit(5, `$${cote} \\times ${cote} = ${lacet(grand)}$ petits carrés`);
  vrai("5. 1 m² = 100 dm²", convA(1, "m²", "dm²") === lacet(grand));
  dit(5, `c) $1$ m² $= ${lacet(grand)}$ dm²`);
});
essai("6", () => {
  const L = e(6).split("\\n").slice(1).map((l) => /\$([^$]+)\$ ([a-z]+²) en ([a-z]+²)/.exec(l)).map((m) => ({ v: nb(m[1]), de: m[2], vers: m[3] }));
  const res = L.map((l) => convA(l.v, l.de, l.vers));
  L.forEach((l, i) => dit(6, UA[l.de] > UA[l.vers] ? `$${t(l.v)} \\times 100 = ${t(res[i])}$ ${l.vers}` : `$${t(l.v)} \\div 100 = ${t(res[i])}$ ${l.vers}`));
  dit(6, `Réponse : ${L.map((l, i) => `${"abcd"[i]}) $${t(res[i])}$ ${l.vers}`).join(" ; ")}.`);
});
essai("7", () => {
  const [A, B] = plan(7, "figure").polys;
  vrai("7. A est le carré de 1 cm", lacet(A) === 1 && dist(A[0], A[1]) === 1);
  vrai("7. B est le rectangle de 1 cm sur 2 cm", dist(B[0], B[1]) === 1 && dist(B[1], B[2]) === 2);
  dit(7, `son aire est $${lacet(B)}$ cm²`);
  vrai("7. 1 mm² < 1 cm²", UA["mm²"] < UA["cm²"]);
  dit(7, `Réponse : a) vrai ; b) faux, $${lacet(B)}$ cm² ; c) vrai ; d) faux.`);
});
essai("8", () => {
  const L = e(8).split("\\n").slice(1).map((l) => /\$([^$]+)\$ ([a-z]+²) = \$([^$]+)\$/.exec(l)).map((m) => ({ v: nb(m[1]), de: m[2], w: nb(m[3]) }));
  const rep = L.map((l) => ["m²", "dm²", "cm²"].filter((u) => convA(l.v, l.de, u) === l.w));
  vrai("8. une seule unité possible par ligne", rep.every((r) => r.length === 1));
  L.forEach((l, i) => dit(8, `$${t(l.v)}$ ${l.de} $= ${t(l.w)}$ ${rep[i][0]}`));
  dit(8, `Réponse : ${rep.map((r, i) => `${"abc"[i]}) ${r[0]}`).join(" ; ")}.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [A, B] = plan(9, "figure").polys;
  const r = rangees(A), aA = lacet(A), entiers = somme(r), demis = (aA - entiers) * 2;
  dit(9, `a) Je compte les carreaux entiers de A : $${entiers}$.`);
  dit(9, `coupent $${demis}$ carreaux en deux`);
  dit(9, `$${demis}$ moitiés font $${demis / 2}$ carreaux. $${entiers} + ${demis / 2} = ${aA}$ cm²`);
  dit(9, `B a $2$ rangées de $4$ carreaux : $${lacet(B)}$ cm²`);
  vrai("9. même aire", aA === lacet(B));
  dit(9, `et trouver $${entiers + demis}$ cm²`);
  // Le découpage du schéma : triangle ôté + triangle recollé = A redevenu rectangle.
  const [trou, reste, recolle] = plan(9, "schema").polys;
  vrai("9. le triangle déplacé est le même", lacet(trou) === lacet(recolle));
  vrai("9. reste + triangle recollé = A", lacet(reste) + lacet(recolle) === aA && lacet(trou) + lacet(reste) === aA);
});
essai("10", () => {
  const [piece, cuisine, bain] = plan(10, "figure").polys.map(lacet);
  dit(10, `soit $${piece}$ m²`);
  dit(10, `La cuisine : $2$ rangées de $3$ carreaux, soit $${cuisine}$ m²`);
  dit(10, `La salle de bain : $2$ rangées de $3$ carreaux, soit $${bain}$ m²`);
  const tot = piece + cuisine + bain;
  dit(10, `$${piece} + ${cuisine} + ${bain} = ${tot}$ m²`);
  const annonce = nb(/studio de \$(\d+)\$ m²/.exec(e(10))[1]);
  vrai("10. l'annonce se trompe", annonce !== tot);
  dit(10, `Réponse : a) $${piece}$ m², $${cuisine}$ m² et $${bain}$ m² ; b) $${tot}$ m² ; c) non.`);
});
essai("11", () => {
  const nappe = nb(/aire de \$([^$]+)\$ m²/.exec(e(11))[1]), serv = nb(/aire de \$([^$]+)\$ dm²/.exec(e(11))[1]);
  const nDm = convA(nappe, "m²", "dm²");
  dit(11, `$${t(nappe)} \\times 100 = ${t(nDm)}$ dm²`);
  dit(11, `$${serv} \\times 100 = ${t(convA(serv, "dm²", "cm²"))}$ cm²`);
  const k = Math.floor(nDm / serv);
  dit(11, `$${k} \\times ${serv} = ${k * serv}$ : $${k}$ serviettes, il reste $${nDm - k * serv}$ dm²`);
  dit(11, `$${k + 1} \\times ${serv} = ${(k + 1) * serv}$ : c'est trop`);
  dit(11, `Réponse : a) $${t(nDm)}$ dm² ; b) $${t(convA(serv, "dm²", "cm²"))}$ cm² ; c) $${k}$ serviettes.`);
  const [, col] = dessin("carreCent", 11);
  vrai("11. le carré découpé colorie une serviette", col === serv);
});
essai("12", () => {
  const p = plan(12, "figure");
  const [poly] = p.polys;
  const pas = p.grille.pas;
  const nDm = lacet(poly) / (pas * pas);
  vrai("12. une case du quadrillage fait 1 dm", pas === 10);
  dit(12, `$${dist(poly[0], poly[1])}$ cm, c'est $${dist(poly[0], poly[1]) / 10}$ dm`);
  dit(12, `Son aire est $${nDm}$ dm²`);
  const mur = nb(/couvrir \$(\d+)\$ m²/.exec(e(12))[1]);
  const murDm = convA(mur, "m²", "dm²");
  dit(12, `$${mur}$ m² $= ${murDm}$ dm²`);
  dit(12, `$${murDm} \\div ${nDm} = ${murDm / nDm}$ carreaux`);
  dit(12, `Réponse : a) $${nDm}$ carrés, soit $${nDm}$ dm² ; b) $${murDm / nDm}$ carreaux.`);
});
essai("13", () => {
  const [A, B] = plan(13, "figure").polys;
  vrai("13. même aire", lacet(A) === lacet(B));
  dit(13, `A : une rangée de $8$ carreaux, soit $${lacet(A)}$ cm²`);
  dit(13, `$8 + 1 + 8 + 1 = ${perimetre(A)}$ cm`);
  dit(13, `$4 + 2 + 4 + 2 = ${perimetre(B)}$ cm`);
  vrai("13. périmètres différents", perimetre(A) !== perimetre(B));
});
essai("14", () => {
  const L = [...e(14).split("\\n")[1].matchAll(/\$([^$]+)\$ ([a-z]+²)/g)].map((m) => ({ ecrit: `$${m[1]}$ ${m[2]}`, dm: convA(nb(m[1]), m[2], "dm²") }));
  vrai("14. quatre aires, chacune à une étape du dm² (cm², dm² ou m²)", L.length === 4 && L.every((x) => /^\$[^$]+\$ (cm²|dm²|m²)$/.test(x.ecrit)));
  const r = [...L].sort((a, b) => a.dm - b.dm);
  dit(14, `$${r.map((x) => t(x.dm)).join(" < ")}$`);
  dit(14, `Réponse : ${r.map((x) => x.ecrit).join(", puis ")}.`);
  dit(14, `$250 \\div 100 = ${t(L[1].dm)}$ dm²`);
  dit(14, `$0{,}05 \\times 100 = ${t(L[2].dm)}$ dm²`);
  const [ent, lig] = dessin("tableau", 14);
  vrai("14. le tableau", L.every((x, i) => nb(lig[i + 1]) === x.dm && ent[i + 1] === x.ecrit.replace(/\$/g, "").replace("{,}", ",")));
});
essai("15", () => {
  const cs = plan(15, "figure").polys;
  const c = cs.map((q) => dist(q[0], q[1]));
  vrai("15. côtés 1, 2 et 3", JSON.stringify(c) === "[1,2,3]");
  dit(15, `Côté $2$ cm : $2 \\times 2 = ${lacet(cs[1])}$ carreaux. Côté $3$ cm : $3 \\times 3 = ${lacet(cs[2])}$ carreaux.`);
  dit(15, `l'aire est multipliée par $${lacet(cs[1]) / lacet(cs[0])}$`);
  dit(15, `$10 \\times 10 = ${10 * 10}$`);
  vrai("15. 1 dm² = 100 cm²", convA(1, "dm²", "cm²") === 100);
});
essai("16", () => {
  const [grande, col, devoile] = dessin("carreCent", 16, "figure");
  vrai("16. la figure ne donne pas la réponse", devoile === false);
  vrai("16. Tom compte une rangée", col === 10 && grande === "dm");
  dit(16, `Tom a compté une seule rangée de $${col}$ carrés`);
  dit(16, `$10 \\times 10 = ${convA(1, "dm²", "cm²")}$. Donc $1$ dm² $= ${convA(1, "dm²", "cm²")}$ cm²`);
  dit(16, `$5 \\times 100 = ${convA(5, "dm²", "cm²")}$ cm²`);
  dit(16, `Réponse : a) les $${10 - col / 10}$ autres rangées`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const p = plan(17, "figure");
  const [bac, salade] = p.polys;
  const aBac = lacet(bac), aSal = lacet(salade);
  vrai("17. le bac : 1 m de côté, 100 dm²", aBac === convA(1, "m²", "dm²"));
  vrai("17. la salade : 20 cm de côté, 4 dm²", dist(salade[0], salade[1]) === lit("20 cm", "dm") && e(17).includes(`soit $${aSal}$ dm²`));
  dit(17, `$${aBac} \\div ${aSal} = ${aBac / aSal}$ salades`);
  const n = nb(/Elle plante \$(\d+)\$ salades/.exec(e(17))[1]);
  dit(17, `$${n} \\times ${aSal} = ${n * aSal}$ dm²`);
  dit(17, `$${aBac} - ${n * aSal} = ${aBac - n * aSal}$ dm². Donc $${aBac - n * aSal}$ radis`);
  dit(17, `Réponse : a) $${aBac}$ dm² ; b) $${aBac / aSal}$ salades ; c) $${aBac - n * aSal}$ radis.`);
});
essai("18", () => {
  const [carre, losange] = plan(18, "figure").polys;
  const A = lacet(carre), L = lacet(losange);
  const entiers = somme(rangees(losange)), demis = (L - entiers) * 2;
  dit(18, `$${A}$ cm²`);
  dit(18, `Le losange a $${entiers}$ carreaux entiers`);
  dit(18, `Ses bords coupent $${demis}$ carreaux en deux. $${demis}$ moitiés font $${demis / 2}$ carreaux.`);
  dit(18, `$${entiers} + ${demis / 2} = ${L}$ cm²`);
  dit(18, `$${A} - ${L} = ${A - L}$ cm²`);
  dit(18, `$${A} \\div 100 = ${t(convA(A, "cm²", "dm²"))}$ dm²`);
  dit(18, `et trouver $${entiers + demis}$`);
});
essai("19", () => {
  const [salle, dalle] = plan(19, "figure").polys;
  const r = rangees(salle), A = lacet(salle);
  vrai("19. la salle : que des carreaux entiers", somme(r) === A);
  dit(19, `$${r.join(" + ")} = ${A}$ m²`);
  const aDalle = convA(lacet(dalle), "m²", "dm²");
  vrai("19. la dalle dessinée : 50 cm de côté, 25 dm²", dist(dalle[0], dalle[1]) === 0.5 && e(19).includes(`aire de $${aDalle}$ dm²`));
  const parM2 = convA(1, "m²", "dm²") / aDalle;
  dit(19, `$${convA(1, "m²", "dm²")} \\div ${aDalle} = ${parM2}$ dalles`);
  dit(19, `$${A} \\times ${parM2} = ${A * parM2}$ dalles`);
  const k = Math.ceil((A * parM2) / 10);
  dit(19, `Il faut $${k}$ paquets`);
  dit(19, `Réponse : a) $${A}$ m² ; b) $${parM2}$ ; c) $${A * parM2}$ dalles ; d) $${k}$ paquets.`);
});
essai("20", () => {
  const lignes = e(20).split("\\n").slice(1);
  const attendu = [["timbre", [2e-4, 2e-3]], ["écran", [5e-3, 3e-2]], ["terrain", [4000, 12000]], ["ville", [1e7, 1e9]], ["épingle", [1e-7, 1e-5]]];
  const rep = attendu.map(([mot, [lo, hi]], i) => {
    vrai(`20. la ligne ${i + 1} parle de ${mot}`, lignes[i].includes(mot));
    const v = nb(/\$([^$]+)\$/.exec(lignes[i])[1]);
    const ok = Object.keys(UA).filter((u) => v * UA[u] >= lo && v * UA[u] <= hi);
    vrai(`20. ${mot} : une seule unité plausible (${ok})`, ok.length === 1);
    return ok[0];
  });
  dit(20, `Réponse : ${rep.map((u, i) => `${"abcde"[i]}) ${u}`).join(" ; ")}.`);
});

f.fin();
