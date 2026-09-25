// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Périmètres » de 4e
// (lib/fiches-exercices/maths-4e-perimetres.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE un périmètre (« 12 + 3 + 4 + … = 42 ») ;
// ici on le MESURE sur la figure dessinée. Chaque `plan({ … })` du source est
// relu, morceau par morceau (`{ de, vers }` ou `{ centre, r, angles }`) ; un
// segment mesure l'hypoténuse de ses coordonnées, un arc r × angle. Le contour
// orange (`tour: true`, hors `hors`) est additionné, puis lu dans la phrase du
// corrigé. Chaque étiquette chiffrée d'un dessin (« 0,4 m », « 300 mm »,
// « 2,2 dm », « ≈ 12,57 cm ») est confrontée à la longueur réelle de son trait,
// unités converties. Les côtés trouvés par Pythagore sont refaits par
// l'hypoténuse des coordonnées, l'angle droit par un produit scalaire nul ; le
// flocon de l'étape 1 est RECONSTRUIT depuis le triangle de l'étape 0 et
// comparé au dessin ; les nombres du monde (terrain, court) sont confrontés à
// leur règlement.
//
//   node scripts/verifier-exercices-perimetres-4e.mjs

import { lireFeuille, lancer, Q, fois, egal, versNombre } from "./verifier-exercices-commun.mjs";

const PI = Math.PI;
const EN_CM = { mm: 0.1, cm: 1, dm: 10, m: 100, km: 100000 };
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Un nombre écrit comme dans la feuille : 5\,190, 12{,}57. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

const RE_MORCEAU =
  /\{ (?:de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]|centre: \[(-?[\d.]+), (-?[\d.]+)\], r: ([\d.]+), angles: \[(-?\d+), (-?\d+)\])([^}]*)\}/g;

function morceaux(texte) {
  return [...texte.matchAll(RE_MORCEAU)].map((m) => {
    const reste = m[10];
    const commun = { label: /label: "([^"]*)"/.exec(reste)?.[1], tour: /tour: true/.test(reste), hors: /hors: true/.test(reste) };
    if (m[1] !== undefined) {
      const [a, b, c, d] = m.slice(1, 5).map(Number);
      return { type: "segment", de: [a, b], vers: [c, d], long: Math.hypot(c - a, d - b), ...commun };
    }
    const [cx, cy, r, a0, a1] = m.slice(5, 10).map(Number);
    return { type: "arc", centre: [cx, cy], r, angles: [a0, a1], long: (r * Math.abs(a1 - a0) * PI) / 180, ...commun };
  });
}

/** Les `plan({ … })` d'un exercice, avec leur rôle (figure de l'énoncé ou schéma du corrigé). */
function plansDe(bloc) {
  const idx = [...bloc.matchAll(/\bplan\(\{/g)].map((m) => m.index);
  return idx.map((debut, i) => {
    const texte = bloc.slice(debut, idx[i + 1] ?? bloc.length);
    const avant = bloc.slice(0, debut);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    return { role, unite: /unite: "(\w+)"/.exec(texte)?.[1], ms: morceaux(texte), texte };
  });
}

/** « 45 cm », « 2,2 dm », « ≈ 12,57 cm » → valeur, décimales, unité. */
function lireEtiquette(label) {
  if (!label) return null;
  const m = /(\d[\d ]*(?:,\d+)?) (mm|cm|dm|m|km)$/.exec(label);
  if (!m) return null;
  const txt = m[1].replace(/ /g, "");
  return { valeur: Number(txt.replace(",", ".")), dec: (txt.split(",")[1] ?? "").length, approx: label.includes("≈"), unite: m[2] };
}

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const tousPlans = blocs.map(plansDe);
  const schemas = (k) => tousPlans[k - 1].filter((p) => p.role === "schema");
  const figures = (k) => tousPlans[k - 1].filter((p) => p.role === "figure");
  /** Le contour (orange, sur le bord) du i-ème schéma de l'exercice k. */
  const bord = (k, i = 0) => schemas(k)[i].ms.filter((m) => m.tour && !m.hors);
  const somme = (liste) => liste.reduce((s, m) => s + m.long, 0);
  const P = (k, i = 0) => somme(bord(k, i));
  const coords = (p) => JSON.stringify(p.ms.map((m) => [m.de, m.vers, m.centre, m.r]));

  v.titre("Les dessins");
  const dessines = blocs.filter((_, i) => schemas(i + 1).some((p) => p.unite && p.ms.length > 0)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const avecFigure = blocs.filter((_, i) => figures(i + 1).length > 0).length;
  v.ok(`${avecFigure} énoncés ont aussi leur figure`, avecFigure >= 3);
  let n = 0;
  const fautes = [];
  tousPlans.forEach((plans, i) =>
    plans.forEach((p) => {
      for (const m of p.ms) {
        const e = lireEtiquette(m.label);
        if (!e) continue;
        n++;
        const attendu = (e.valeur * EN_CM[e.unite]) / EN_CM[p.unite];
        const ok = e.approx ? proche(Number(m.long.toFixed(e.dec)) * EN_CM[p.unite], e.valeur * EN_CM[e.unite], 1e-6) : proche(m.long, attendu, 1e-3);
        if (!ok) fautes.push(`${i + 1} : « ${m.label} » sur un trait de ${m.long.toFixed(4)} ${p.unite}`);
      }
    }),
  );
  v.ok(`${n} étiquettes chiffrées : chacune dit la longueur réelle de son trait`, n >= 60 && fautes.length === 0, fautes.slice(0, 3).join(" | "));

  v.titre("★ Un seul geste");
  const P1 = P(1);
  const [L1, l1] = [bord(1)[0].long, bord(1)[1].long];
  v.ok(`1. le cadre dessiné, ${L1} × ${l1}, a pour tour ${P1}`, P1 === 50 && 2 * (L1 + l1) === P1);
  dit(1, `$${L1} + ${l1} + ${L1} + ${l1} = ${P1}$ cm`);
  dit(1, `$2 \\times (${L1} + ${l1}) = ${P1}$ cm`);
  dit(1, `$${L1} \\times ${l1} = ${L1 * l1}$`);
  dit(1, `il faut $${P1}$ cm de baguette`);

  const [a2, b2] = [P(2, 0), P(2, 1)];
  v.ok(`2. rectangles mesurés : ${fr(a2)} cm et ${fr(b2)} cm`, proche(a2, 41) && proche(b2, 330));
  dit(2, `= 2 \\times 20{,}5 = ${fr(a2)}$ cm`);
  dit(2, `= 2 \\times 165 = ${fr(b2)}$ cm, soit $${fr(b2 / 100)}$ m`);
  dit(2, `$2 \\times (1{,}2 + 45) = ${fr(2 * (1.2 + 45))}$`);
  dit(2, `Réponse : $${fr(a2)}$ cm ; $${fr(b2)}$ cm, soit $${fr(b2 / 100)}$ m.`);

  const [a3, b3] = [P(3, 0), P(3, 1)];
  const cote3 = bord(3, 1)[0].long;
  v.ok(`3. carrés mesurés : tour ${fr(a3)} cm ; tour ${fr(b3)} m pour un côté de ${fr(cote3)}`, proche(a3, 30) && proche(b3, 46) && bord(3, 1).every((m) => proche(m.long, cote3)));
  dit(3, `$P = 4 \\times 7{,}5 = ${fr(a3)}$ cm`);
  dit(3, `$46 \\div 4 = ${fr(46 / 4)}$ m`);
  dit(3, `$46 \\div 2 = ${46 / 2}$ m`);
  dit(3, `tour de $${4 * (46 / 2)}$ m`);

  const [a4, b4] = [P(4, 0), P(4, 1)];
  v.ok(`4. triangles mesurés : ${fr(a4, 1)} cm et ${fr(b4, 1)} cm, le second équilatéral`, proche(a4, 26.5, 1e-3) && proche(b4, 25.5, 1e-3) && bord(4, 1).every((m) => proche(m.long, 8.5, 1e-3)));
  dit(4, `$9 + 6{,}5 + 11 = ${fr(a4, 1)}$ cm`);
  dit(4, `$P = 3 \\times 8{,}5 = ${fr(3 * 8.5)}$ cm`);

  const t5 = bord(5).map((m) => m.long);
  v.ok(`5. triangle dessiné : base ${t5[0]}, côtés égaux ${t5[1].toFixed(4)} et ${t5[2].toFixed(4)}, tour ${somme(bord(5)).toFixed(4)}`, proche(t5[1], t5[2], 1e-9) && proche(somme(bord(5)), 31, 1e-3) && /périmètre de \$31\$ cm/.test(enonces[4]));
  dit(5, `$31 - 9 = ${31 - 9}$ cm`);
  dit(5, `$22 \\div 2 = ${22 / 2}$ cm`);
  dit(5, `$9 + 11 + 11 = ${9 + 11 + 11}$`);

  const [L6, l6] = [bord(6)[0].long, bord(6)[1].long];
  v.ok(`6. rectangle dessiné ${fr(L6)} × ${fr(l6)}, tour ${fr(P(6))}`, proche(P(6), 52) && proche(l6, 9.5));
  dit(6, `$52 \\div 2 = ${52 / 2}$ m`);
  dit(6, `$26 - 9{,}5 = ${fr(L6)}$ m`);
  dit(6, `$52 - 9{,}5 = ${fr(52 - 9.5)}$ m`);

  const cache7 = schemas(7)[0].ms.find((m) => m.hors);
  const toit7 = bord(7).slice(2, 4);
  v.ok(`7. maison : ${bord(7).length} côtés sur le contour, toit équilatéral sur le côté caché de ${fr(cache7.long)}`, bord(7).length === 5 && toit7.every((m) => proche(m.long, cache7.long, 1e-3)));
  const P7 = P(7);
  dit(7, `$5 \\times 6{,}5 = ${fr(P7, 1)}$ cm`);
  dit(7, `= ${fr(4 * cache7.long)} + ${fr(3 * cache7.long)} = ${fr(7 * cache7.long)}$ cm`);
  dit(7, `$${fr(7 * cache7.long)} - 2 \\times 6{,}5 = ${fr(P7, 1)}$`);

  const P8 = P(8);
  v.ok(`8. le quadrilatère dessiné (en cm) a pour tour ${P8.toFixed(4)}`, proche(P8, 117, 1e-3));
  dit(8, `$40 + 25 + 30 + 22 = ${fr(P8, 0)}$ cm, soit $${fr(117 / 100)}$ m`);
  dit(8, `$0{,}4 + 25 + 300 + 2{,}2 = ${fr(0.4 + 25 + 300 + 2.2)}$`);

  v.titre("★★ Type devoir");
  const b9 = bord(9);
  const somme9 = /\$(12(?: \+ \d+)+) = (\d+)\$ cm/.exec(c(9));
  const termes9 = somme9 ? somme9[1].split(" + ").map(Number) : [];
  v.ok(`9. les termes écrits (${termes9.join(" + ")}) sont les côtés dessinés, dans l'ordre du tour`, termes9.length === b9.length && termes9.every((t, i) => proche(t, b9[i].long)));
  v.ok("9. la figure de l'énoncé est l'escalier du corrigé", coords(figures(9)[0]) === coords(schemas(9)[0]));
  const pts9 = b9.flatMap((m) => [m.de, m.vers]);
  const [X9, Y9] = [Math.max(...pts9.map((p) => p[0])), Math.max(...pts9.map((p) => p[1]))];
  const P9 = P(9);
  v.ok(`9. l'escalier mesuré fait ${P9} cm, comme le rectangle ${X9} × ${Y9}`, P9 === 42 && 2 * (X9 + Y9) === P9);
  dit(9, `$12 \\div 3 = ${X9 / 3}$ cm`);
  dit(9, `$9 \\div 3 = ${Y9 / 3}$ cm`);
  dit(9, `= ${P9}$ cm`);
  dit(9, `$2 \\times (12 + 9) = ${2 * (X9 + Y9)}$ cm`);
  dit(9, `$12 + 9 = ${X9 + Y9}$ cm`);

  const [ab10, bc10, ca10] = bord(10);
  const u10 = [ab10.de[0] - ab10.vers[0], ab10.de[1] - ab10.vers[1]];
  const w10 = [bc10.vers[0] - bc10.de[0], bc10.vers[1] - bc10.de[1]];
  v.ok(`10. angle droit en B (produit scalaire ${u10[0] * w10[0] + u10[1] * w10[1]}), hypoténuse mesurée ${ca10.long}`, u10[0] * w10[0] + u10[1] * w10[1] === 0 && ca10.long === 17 && ab10.long ** 2 + bc10.long ** 2 === 289);
  dit(10, `= 15^2 + 8^2 = 225 + 64 = ${15 ** 2 + 8 ** 2}$`);
  dit(10, `$AC = \\sqrt{289} = ${ca10.long}$ cm`);
  dit(10, `$15 + 8 + 17 = ${P(10)}$ cm`);
  dit(10, `$15 + 8 = ${15 + 8}$ cm`);

  const arc11 = bord(11).find((m) => m.type === "arc");
  v.ok(`11. l'arc dessiné est un quart de cercle de rayon ${arc11.r}, les deux rayons ferment la figure`, arc11.r === 8 && proche(arc11.long, 4 * PI) && proche(P(11), 16 + 4 * PI));
  dit(11, `$2 \\times \\pi \\times 8 = 16\\pi$ cm`);
  dit(11, `$16\\pi \\div 4 = 4\\pi \\approx ${fr(arc11.long, 2)}$ cm`);
  dit(11, `= 16 + 4\\pi \\approx ${fr(P(11), 2)}$ cm`);

  const tri12 = P(12, 0);
  const rect12 = bord(12, 1);
  const l12 = [...Array(50).keys()].find((l) => l > 0 && 6 * l === Math.round(tri12));
  v.ok(`12. triangle équilatéral mesuré ${fr(tri12, 3)} ; rectangle ${rect12[0].long} × ${rect12[1].long}, tour ${P(12, 1)}, longueur double`, proche(tri12, 42, 1e-3) && bord(12, 0).every((m) => proche(m.long, 14, 1e-3)) && rect12[1].long === l12 && rect12[0].long === 2 * l12 && P(12, 1) === 42);
  dit(12, `$3 \\times 14 = ${Math.round(tri12)}$ cm`);
  dit(12, `$l = 42 \\div 6 = ${l12}$ cm`);
  dit(12, `$2 \\times ${l12} = ${2 * l12}$ cm`);
  dit(12, `$2 \\times (14 + 7) = ${P(12, 1)}$`);
  dit(12, `dont le tour fait $${2 * (28 + 14)}$ cm`);

  const obl13 = bord(13)[1];
  const haut13 = schemas(13)[0].ms.find((m) => m.hors);
  v.ok(`13. côté oblique mesuré ${obl13.long}, hauteur ${haut13.long}, dépassement ${7 - haut13.de[0]}`, obl13.long === 5 && haut13.long === 4 && (7 - haut13.de[0]) ** 2 + 4 ** 2 === 25);
  v.ok("13. la figure de l'énoncé a le même contour", JSON.stringify(figures(13)[0].ms.map((m) => [m.de, m.vers])) === JSON.stringify(bord(13).map((m) => [m.de, m.vers])));
  const P13 = P(13);
  dit(13, `$7 - 4 = ${7 - 4}$ m`);
  dit(13, `$3^2 + 4^2 = 9 + 16 = ${9 + 16}$`);
  dit(13, `$\\sqrt{25} = ${obl13.long}$ m`);
  dit(13, `$7 + 5 + 4 + 4 = ${P13}$ m`);
  dit(13, `$20 \\times 3{,}25 = ${fr(P13 * 3.25)}$ €`);

  const petit14 = bord(14).slice(0, 4);
  const grand14 = bord(14).slice(4, 8);
  const dims = (r) => [r[0].long, r[1].long];
  const [pL, pl] = dims(petit14);
  const [gL, gl] = dims(grand14);
  v.ok(`14. le grand rectangle dessiné (${gL} × ${gl}) est le petit (${pL} × ${pl}) multiplié par 3`, proche(gL, 3 * pL) && proche(gl, 3 * pl));
  const [p14, g14] = [somme(petit14), somme(grand14)];
  dit(14, `= 2 \\times 9 = ${fr(p14)}$ cm`);
  dit(14, `= 2 \\times 27 = ${fr(g14)}$ cm`);
  dit(14, `$54 \\div 18 = ${g14 / p14}$`);
  dit(14, `de $${fr(pL * pl)}$ cm² à $${fr(gL * gl)}$ cm²`);
  dit(14, `multipliée par $${fr((gL * gl) / (pL * pl))}$`);
  dit(14, `$${fr(pL + 3)}$ cm sur $${fr(pl + 3)}$ cm`);
  dit(14, `son tour fait $${fr(2 * (pL + 3 + pl + 3))}$ cm`);

  const b15 = bord(15);
  const caches15 = schemas(15)[0].ms.filter((m) => m.hors);
  v.ok(`15. croix : ${b15.length} côtés de 3 sur le contour, ${caches15.length} côtés du carré central cachés`, b15.length === 12 && b15.every((m) => m.long === 3) && caches15.length === 4);
  v.ok("15. la figure de l'énoncé est la croix du corrigé", coords(figures(15)[0]) === coords(schemas(15)[0]));
  const colles15 = 2 * caches15.length;
  const pts15 = b15.flatMap((m) => [m.de, m.vers]);
  const cote15 = Math.max(...pts15.map((p) => p[0])) - Math.min(...pts15.map((p) => p[0]));
  dit(15, `$4 \\times 3 = ${b15.length}$ côtés`);
  dit(15, `$12 \\times 3 = ${P(15)}$ cm`);
  dit(15, `$3 + 3 + 3 = ${cote15}$ cm`);
  dit(15, `$4 \\times 9 = ${4 * cote15}$ cm`);
  dit(15, `$5 \\times 12 = ${5 * 12}$ cm`);
  dit(15, `$60 - ${colles15} \\times 3 = ${60 - colles15 * 3}$`);
  v.ok("15. le carré qui contient la croix a le même tour", 4 * cote15 === P(15) && 60 - colles15 * 3 === P(15));

  const b16 = bord(16);
  const rayons16 = b16.map((m) => Math.hypot(...m.de));
  v.ok(`16. octogone : ${b16.length} côtés de ${b16[0].long.toFixed(4)}, sommets à égale distance du centre`, b16.length === 8 && b16.every((m) => proche(m.long, 30, 1e-3)) && rayons16.every((r) => proche(r, rayons16[0], 1e-3)));
  const P16 = Math.round(P(16));
  dit(16, `$8 \\times 30 = ${P16}$ cm, soit $${fr(P16 / 100)}$ m`);
  dit(16, `$240 \\div 3 = ${P16 / 3}$ cm`);
  dit(16, `$240 \\div 4 = ${P16 / 4}$ cm`);
  dit(16, `triangle de $${3 * (P16 / 4)}$ cm de tour`);

  v.titre("★★★ Problèmes");
  const [L17, l17] = [bord(17)[0].long, bord(17)[1].long];
  v.ok(`17. terrain ${L17} × ${l17} : dans les bornes de la Loi 1 (100–110 × 64–75)`, L17 >= 100 && L17 <= 110 && l17 >= 64 && l17 <= 75);
  const rond = schemas(17)[0].ms.find((m) => m.type === "arc");
  const rayon17 = schemas(17)[0].ms.find((m) => m.label === "9,15 m");
  const mediane = schemas(17)[0].ms.find((m) => m.type === "segment" && m.hors && m.de[0] === m.vers[0]);
  v.ok("17. rond central au milieu, rayon dessiné = 9,15, ligne médiane hors du contour", rond.hors && rond.r === 9.15 && proche(rayon17.long, rond.r) && rond.centre[0] === L17 / 2 && rond.centre[1] === l17 / 2 && mediane.de[0] === L17 / 2 && !mediane.tour);
  const P17 = P(17);
  dit(17, `= 2 \\times ${L17 + l17} = ${P17}$ m`);
  dit(17, `$5\\,000 \\div 346 \\approx ${fr(5000 / P17, 2)}$`);
  const n17 = Math.ceil(5000 / P17);
  dit(17, `$14 \\times 346 = ${fr((n17 - 1) * P17)}$ m`);
  dit(17, `Il faut $${n17}$ tours, soit $${fr(n17 * P17)}$ m`);
  dit(17, `= 18{,}3\\pi \\approx ${fr(2 * PI * rond.r, 2)}$ m`);
  dit(17, `$105 \\times 68 = ${fr(L17 * l17)}$`);

  const b18 = bord(18);
  const double18 = somme(b18.slice(0, 4));
  const simple18 = somme(b18.slice(4, 8));
  const [ys0, ys1] = [b18[4].de[1], b18[6].de[1]];
  v.ok(`18. court de double ${fr(double18, 2)} m, simple ${fr(simple18, 2)} m, couloirs égaux (${fr(ys0, 2)} et ${fr(10.97 - ys1, 2)})`, proche(double18, 69.48, 1e-9) && proche(simple18, 64, 1e-9) && proche(ys0, 10.97 - ys1, 1e-9));
  dit(18, `= 2 \\times 34{,}74 = ${fr(double18, 2)}$ m`);
  dit(18, `= 2 \\times 32 = ${fr(simple18)}$ m`);
  dit(18, `$69{,}48 - 64 = ${fr(double18 - simple18, 2)}$ m`);
  dit(18, `$10{,}97 - 8{,}23 = ${fr(10.97 - 8.23, 2)}$ m`);
  dit(18, `$2 \\times 2{,}74 = ${fr(2 * 2.74, 2)}$ m`);

  // Le flocon : périmètres par fractions exactes, étape par étape.
  let [nSeg, lSeg] = [3, Q(27)];
  const perims = [];
  for (let e = 0; e <= 4; e++) {
    perims.push(fois(Q(nSeg), lSeg));
    nSeg *= 4;
    lSeg = fois(lSeg, Q(1, 3));
  }
  v.ok(`19. périmètres recalculés : ${perims.map(versNombre).join(", ")}`, perims.every((p, i) => i === 0 || egal(p, fois(perims[i - 1], Q(4, 3)))));
  v.ok("19. l'étape 0 dessinée a pour tour 81", proche(P(19, 0), versNombre(perims[0]), 1e-3));
  // Reconstruction de l'étape 1 depuis le triangle dessiné.
  const tri19 = bord(19, 0).map((m) => m.de);
  const pointe = (p, q) => {
    const d = [(q[0] - p[0]) / 3, (q[1] - p[1]) / 3];
    const a = [p[0] + d[0], p[1] + d[1]];
    const b = [p[0] + 2 * d[0], p[1] + 2 * d[1]];
    const [cs, sn] = [Math.cos(-PI / 3), Math.sin(-PI / 3)];
    return [p, a, [a[0] + d[0] * cs - d[1] * sn, a[1] + d[0] * sn + d[1] * cs], b];
  };
  const attendu19 = [0, 1, 2].flatMap((i) => pointe(tri19[i], tri19[(i + 1) % 3]));
  const b19 = bord(19, 1);
  v.ok("19. le contour de l'étape 1 est une chaîne fermée (chaque segment part où finit le précédent)", b19.every((m, i) => { const q = b19[(i + 1) % b19.length].de; return proche(m.vers[0], q[0]) && proche(m.vers[1], q[1]); }));
  const dessin19 = b19.map((m) => m.de);
  v.ok(`19. l'étape 1 dessinée (${dessin19.length} sommets) est le flocon reconstruit depuis le triangle`, dessin19.length === 12 && dessin19.every((p, i) => proche(p[0], attendu19[i][0], 1e-3) && proche(p[1], attendu19[i][1], 1e-3)));
  v.ok("19. l'étape 1 dessinée a pour tour 108", proche(P(19, 1), versNombre(perims[1]), 1e-3));
  dit(19, `$3 \\times 27 = ${versNombre(perims[0])}$ cm`);
  dit(19, `$12 \\times 9 = ${versNombre(perims[1])}$ cm`);
  dit(19, `$48 \\times 3 = ${versNombre(perims[2])}$ cm`);
  dit(19, `soit $${versNombre(perims[3])}$ cm`);
  dit(19, `$81 \\times \\dfrac{4}{3} = ${versNombre(perims[1])}$`);
  dit(19, `$192 \\times \\dfrac{4}{3} = ${versNombre(perims[4])}$ cm`);
  dit(19, `$81 + 3 \\times 9 = ${81 + 27}$`);

  const [c1, c2, c3] = bord(20);
  const u20 = [c1.de[0] - c1.vers[0], c1.de[1] - c1.vers[1]];
  const w20 = [c3.de[0] - c3.vers[0], c3.de[1] - c3.vers[1]];
  v.ok(`20. pré : angle droit (produit scalaire ${u20[0] * w20[0] + u20[1] * w20[1]}), côtés ${c1.long}, ${c3.long}, hypoténuse mesurée ${c2.long}`, u20[0] * w20[0] + u20[1] * w20[1] === 0 && c2.long === 75);
  const P20 = P(20);
  const poteaux = bord(20).map((m) => m.long / 2.5);
  v.ok(`20. poteaux par côté : ${poteaux.join(", ")} (entiers : un poteau à chaque coin)`, poteaux.every(Number.isInteger));
  const nP = poteaux.reduce((s, x) => s + x, 0);
  dit(20, `= 3\\,600 + 2\\,025 = ${fr(60 ** 2 + 45 ** 2)}$`);
  dit(20, `$\\sqrt{5\\,625} = ${c2.long}$ m`);
  dit(20, `$60 + 45 + 75 = ${P20}$ m`);
  dit(20, `$180 \\div 2{,}5 = ${P20 / 2.5}$ poteaux`);
  dit(20, `$24 + 18 + 30 = ${nP}$`);
  dit(20, `$180 \\times 2{,}40 = ${fr(P20 * 2.4)}$ €`);
  dit(20, `$72 \\times 4{,}50 = ${fr(nP * 4.5)}$ €`);
  dit(20, `$432 + 324 = ${fr(P20 * 2.4 + nP * 4.5)}$ €`);
  dit(20, `$72 + 1 = ${nP + 1}$ poteaux`);
}

lancer({
  nom: "PÉRIMÈTRES · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-perimetres.tsx",
  notionId: "aire_perimetre",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : l'aire à la place du périmètre", "il faut $50$ cm de baguette", "il faut $150$ cm de baguette"],
    ["ex. 2 : les unités mélangées", "= 2 \\\\times 165 = 330$ cm", "= 2 \\\\times 165 = 92{,}4$ cm"],
    ["ex. 3 : diviser par 2 au lieu de 4", "$46 \\\\div 4 = 11{,}5$ m", "$46 \\\\div 4 = 23$ m"],
    ["ex. 4 : triangle dessiné faux", "vers: [0.125, 6.4988], label: \"11 cm\"", "vers: [0.125, 5.4988], label: \"11 cm\""],
    ["ex. 5 : s'arrêter à 22", "$22 \\\\div 2 = 11$ cm", "$22 \\\\div 2 = 22$ cm"],
    ["ex. 6 : une seule largeur retirée", "$26 - 9{,}5 = 16{,}5$ m", "$26 - 9{,}5 = 42{,}5$ m"],
    ["ex. 7 : le côté caché compté", "{ de: [0, 6.5], vers: [6.5, 6.5], label: \"caché\", hors: true", "{ de: [0, 6.5], vers: [6.5, 6.5], label: \"caché\", tour: true"],
    ["ex. 8 : une étiquette d'unité fausse", "label: \"2,2 dm\"", "label: \"2,2 cm\""],
    ["ex. 9 : un terme de l'escalier faux", "$12 + 3 + 4 + 3 + 4 + 3 + 4 + 9 = 42$ cm", "$12 + 3 + 4 + 3 + 3 + 3 + 4 + 9 = 42$ cm"],
    ["ex. 10 : l'hypoténuse oubliée", "$15 + 8 + 17 = 40$ cm", "$15 + 8 + 17 = 23$ cm"],
    ["ex. 11 : les rayons oubliés", "= 16 + 4\\\\pi \\\\approx 28{,}57$ cm", "= 16 + 4\\\\pi \\\\approx 12{,}57$ cm"],
    ["ex. 12 : 3l au lieu de 6l", "$l = 42 \\\\div 6 = 7$ cm", "$l = 42 \\\\div 6 = 14$ cm"],
    ["ex. 13 : l'oblique prise pour la hauteur (dessin)", "{ de: [7, 0], vers: [4, 4], label: \"5 m\"", "{ de: [7, 0], vers: [4, 4], label: \"4 m\""],
    ["ex. 14 : ajouter 3 au lieu de multiplier (dessin)", "{ de: [24, 0], vers: [24, 10.5], label: \"10,5 cm\"", "{ de: [24, 0], vers: [24, 6.5], label: \"10,5 cm\""],
    ["ex. 15 : les cinq périmètres additionnés", "$12 \\\\times 3 = 36$ cm", "$12 \\\\times 3 = 60$ cm"],
    ["ex. 16 : un côté de l'octogone de travers", "{ de: [15, -36.2132], vers: [36.2132, -15], tour: true }", "{ de: [15, -36.2132], vers: [36.2132, -14], tour: true }"],
    ["ex. 17 : terrain hors règlement", "{ de: [0, 0], vers: [105, 0], label: \"105 m\"", "{ de: [0, 0], vers: [115, 0], label: \"105 m\""],
    ["ex. 17 : un tour de moins", "Il faut $15$ tours, soit $5\\\\,190$ m", "Il faut $14$ tours, soit $5\\\\,190$ m"],
    ["ex. 18 : une seule largeur d'écart", "$69{,}48 - 64 = 5{,}48$ m", "$69{,}48 - 64 = 2{,}74$ m"],
    ["ex. 19 : la pointe vers l'intérieur", "{ de: [9, 0], vers: [13.5, -7.7942], label: \"9 cm\"", "{ de: [9, 0], vers: [13.5, 7.7942], label: \"9 cm\""],
    ["ex. 19 : le tour qui ne change pas", "$12 \\\\times 9 = 108$ cm", "$12 \\\\times 9 = 81$ cm"],
    ["ex. 20 : le poteau de trop", "$180 \\\\div 2{,}5 = 72$ poteaux", "$180 \\\\div 2{,}5 = 73$ poteaux"],
    ["ex. 20 : total faux", "$432 + 324 = 756$ €", "$432 + 324 = 746$ €"],
    ["une micro d'une autre notion", "micros: [\"aire_perimetre_defi\", \"aire_perimetre_triangle\"]", "micros: [\"aire_surface_calculer\", \"aire_perimetre_triangle\"]"],
    ["un $ dans un canvas", "label: \"≈ 12,57 cm\"", "label: \"$4\\\\pi$ cm\""],
  ],
});
