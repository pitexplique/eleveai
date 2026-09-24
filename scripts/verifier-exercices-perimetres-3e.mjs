// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Périmètres » de 3e
// (lib/fiches-exercices/maths-3e-perimetres.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE un périmètre (« 10 + 4 + 6 + 5 + 4 + 9 =
// 38 ») ; ici on le MESURE sur la figure dessinée. Chaque morceau du schéma
// (`{ de, vers }` ou `{ centre, r, angles }`) est relu dans le source ; un
// segment mesure l'hypoténuse de ses coordonnées, un arc r × angle. Le contour
// orange (`tour: true`, hors `hors`) est additionné, puis lu dans la phrase du
// corrigé. Chaque étiquette chiffrée du dessin (« 45 cm », « 0,6 m », « 750 mm »,
// « ≈ 15,7 cm ») est confrontée à la longueur réelle de son trait, unités
// converties. Les nombres du monde sont refaits par leur règle : le rayon du
// couloir 8 par le règlement (36,50 + 7 × 1,22 + 0,20), les rectangles d'aire 24
// par la liste des diviseurs, le rectangle de l'enclos par balayage.
//
//   node scripts/verifier-exercices-perimetres-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const PI = Math.PI;
const EN_CM = { mm: 0.1, cm: 1, m: 100, km: 100000 };
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Un nombre écrit comme dans la feuille : 9\,571, 15{,}7. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

/** Les morceaux dessinés d'un exercice, relus dans son source, dans l'ordre. */
function morceaux(bloc) {
  const re =
    /\{ (?:de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]|centre: \[(-?[\d.]+), (-?[\d.]+)\], r: ([\d.]+), angles: \[(-?\d+), (-?\d+)\])([^}]*)\}/g;
  return [...bloc.matchAll(re)].map((m) => {
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

/** « 45 cm », « porte 0,9 m », « ≈ 157,08 m » → valeur, décimales, unité. */
function lireEtiquette(label) {
  if (!label || label.includes("+")) return null;
  const m = /(\d[\d ]*(?:,\d+)?) (mm|cm|m|km)$/.exec(label);
  if (!m) return null;
  const txt = m[1].replace(/ /g, "");
  return { valeur: Number(txt.replace(",", ".")), dec: (txt.split(",")[1] ?? "").length, approx: label.includes("≈"), unite: m[2] };
}

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const plans = blocs.map((b) => ({ unite: /unite: "(\w+)"/.exec(b)?.[1], ms: morceaux(b), bloc: b }));
  const ms = (k) => plans[k - 1].ms;
  /** Les morceaux du CONTOUR (orange, sur le bord), et leur somme. */
  const bord = (k) => ms(k).filter((m) => m.tour && !m.hors);
  const somme = (liste) => liste.reduce((s, m) => s + m.long, 0);

  v.titre("Les dessins");
  const dessines = plans.filter((p) => p.unite && p.ms.length > 0).length;
  v.ok(`${dessines} corrigés sur 20 dessinent leur figure`, dessines === 20);
  let n = 0;
  const fautes = [];
  plans.forEach((p, i) => {
    for (const m of p.ms) {
      const e = lireEtiquette(m.label);
      if (!e) continue;
      n++;
      const attendu = (e.valeur * EN_CM[e.unite]) / EN_CM[p.unite];
      const ok = e.approx ? proche(Number(m.long.toFixed(e.dec)) * EN_CM[p.unite], e.valeur * EN_CM[e.unite], 1e-6) : proche(m.long, attendu, 1e-3);
      if (!ok) fautes.push(`${i + 1} : « ${m.label} » sur un trait de ${m.long.toFixed(4)} ${p.unite}`);
    }
  });
  v.ok(`${n} étiquettes chiffrées : chacune dit la longueur réelle de son trait`, n >= 50 && fautes.length === 0, fautes.slice(0, 3).join(" | "));

  v.titre("★ Un seul geste");
  const P1 = somme(bord(1));
  v.ok(`1. le contour dessiné mesure ${P1} m`, P1 === 38);
  dit(1, `$12 + 7 + 12 + 7 = ${P1}$ m`);
  dit(1, `2 \\times (12 + 7) = ${P1}$ m`);
  dit(1, `$12 \\times 7 = ${12 * 7}$`);
  dit(1, `il faut $${P1}$ m de grillage`);

  const [r2, q2] = [somme(bord(2).slice(0, 4)), somme(bord(2).slice(4, 8))];
  v.ok(`2. rectangle ${fr(r2)} cm, carré ${fr(q2)} cm (mesurés)`, proche(r2, 43, 1e-9) && proche(q2, 37.6, 1e-9));
  dit(2, `= 2 \\times 21{,}5 = ${fr(r2)}$ cm`);
  dit(2, `$P = 4 \\times 9{,}4 = ${fr(q2)}$ cm`);
  dit(2, `$13{,}5 \\times 8 = ${fr(13.5 * 8)}$`);
  dit(2, `Réponse : $${fr(r2)}$ cm ; $${fr(q2)}$ cm.`);

  const noms3 = Object.fromEntries([...plans[2].bloc.matchAll(/\{ en: \[(-?[\d.]+), (-?[\d.]+)\], texte: "([A-Z])" \}/g)].map((m) => [m[3], [Number(m[1]), Number(m[2])]]));
  const cotes3 = ["AB", "BC", "CD", "DE", "EA"].map((s) => {
    const lu = Number(new RegExp(`\\$${s} = (\\d+)\\$`).exec(enonces[2])?.[1]);
    const [p, q] = [noms3[s[0]], noms3[s[1]]];
    return { s, lu, mesure: p && q ? Math.hypot(q[0] - p[0], q[1] - p[1]) : NaN };
  });
  v.ok("3. les sommets nommés du dessin donnent les côtés de l'énoncé", cotes3.every((x) => proche(x.lu, x.mesure, 1e-9)), JSON.stringify(cotes3));
  const P3 = somme(bord(3));
  dit(3, `= 9 + 4 + 5 + 6 + 8 = ${P3}$ cm`);
  dit(3, `on trouve $${P3 - cotes3[4].mesure}$ cm`);
  dit(3, `le périmètre vaut $${P3}$ cm`);

  const [c4a, c4b] = ms(4).filter((m) => m.type === "arc");
  const rayons4 = ms(4).filter((m) => m.type === "segment");
  v.ok("4. le rayon dessiné part du centre du 1er cercle et vaut son rayon ; le diamètre, le double du 2e", proche(rayons4[0].long, c4a.r) && proche(rayons4[1].long, 2 * c4b.r) && proche((rayons4[1].de[0] + rayons4[1].vers[0]) / 2, c4b.centre[0]));
  v.ok("4. les deux cercles mesurés font 14π et 15π", proche(c4a.long, 14 * PI) && proche(c4b.long, 15 * PI));
  dit(4, `$14\\pi \\approx ${fr(c4a.long, 2)}$, soit environ $${fr(c4a.long, 1)}$ cm`);
  dit(4, `$15\\pi \\approx ${fr(c4b.long, 2)}$, soit environ $${fr(c4b.long, 1)}$ cm`);
  dit(4, `\\pi \\times 7^2 \\approx ${fr(PI * 49, 2)}$`);
  dit(4, `$2 \\times \\pi \\times 15 \\approx ${fr(2 * PI * 15, 2)}$ cm`);

  const d5 = 2.2 / PI;
  const [arc5, diam5] = ms(5);
  v.ok(`5. le cercle dessiné a pour tour 2,2 m et pour diamètre ${d5.toFixed(4)} m`, proche(arc5.long, 2.2, 1e-3) && proche(diam5.long, d5, 1e-3));
  dit(5, `$d = 2{,}2 \\div \\pi \\approx ${fr(d5, 2)}$ m, soit environ $${Math.round(d5 * 100)}$ cm`);
  dit(5, `$\\pi \\times 0{,}70 \\approx ${fr(PI * 0.7, 2)}$ m`);
  dit(5, `$2{,}2 \\div 3 \\approx ${fr(2.2 / 3, 2)}$`);
  dit(5, `$2{,}2 \\div (2\\pi) \\approx ${fr(1.1 / PI, 2)}$ m`);

  const P6 = somme(bord(6));
  v.ok(`6. le triangle dessiné (en cm) a pour tour ${P6}`, proche(P6, 180));
  dit(6, `$45 + 60 + 75 = ${fr(P6)}$ cm, soit $${fr(P6 / 100)}$ m`);
  dit(6, `$45 + 0{,}6 + 750 = ${fr(45 + 0.6 + 750)}$`);

  const [L7, l7] = [bord(7)[0].long, bord(7)[1].long];
  v.ok(`7. le rectangle dessiné, ${L7} sur ${l7}, a bien un tour de 34 m`, 2 * (L7 + l7) === 34 && somme(bord(7)) === 34);
  dit(7, `$34 \\div 2 = ${34 / 2}$ m`);
  dit(7, `$17 - 11 = ${l7}$ m`);
  dit(7, `$50 \\div 4 = ${fr(50 / 4)}$ cm`);
  dit(7, `$34 - 11 = ${34 - 11}$ m`);

  const arc8 = bord(8).find((m) => m.type === "arc");
  const P8 = somme(bord(8));
  v.ok("8. l'arc dessiné vaut 5π, et le diamètre qui le referme 2r", proche(arc8.long, 5 * PI) && proche(P8 - arc8.long, 2 * arc8.r));
  dit(8, `$5\\pi \\approx ${fr(arc8.long, 1)}$ cm`);
  dit(8, `$5\\pi + 10 \\approx ${fr(P8, 1)}$ cm`);
  dit(8, `$5\\pi + 10 \\approx ${fr(P8, 2)}$`);

  v.titre("★★ Type devoir");
  const pts9 = bord(9).flatMap((m) => [m.de, m.vers]);
  const [X9, Y9] = [Math.max(...pts9.map((p) => p[0])), Math.max(...pts9.map((p) => p[1]))];
  const P9 = somme(bord(9));
  const coupe9 = ms(9).find((m) => m.hors);
  const bas9 = 2 * (X9 + coupe9.de[1]);
  const haut9 = 2 * (coupe9.long + (Y9 - coupe9.de[1]));
  v.ok(`9. le L mesuré fait ${P9} cm, comme le rectangle ${X9} × ${Y9} qui l'entoure`, P9 === 38 && 2 * (X9 + Y9) === P9);
  v.ok(`9. découpé : ${bas9} + ${haut9} = ${P9} + 2 × ${coupe9.long} (le trait de découpe compté deux fois)`, bas9 + haut9 === P9 + 2 * coupe9.long);
  dit(9, `$10 + 4 + 6 + 5 + 4 + 9 = ${P9}$ cm`);
  dit(9, `$2 \\times (10 + 9) = ${2 * (X9 + Y9)}$ cm`);
  dit(9, `$${bas9} + ${haut9} = ${bas9 + haut9}$ cm`);
  dit(9, `$${bas9 + haut9} - 2 \\times ${coupe9.long} = ${P9}$`);

  const P10 = somme(bord(10));
  const arc10 = bord(10).find((m) => m.type === "arc");
  const cache10 = ms(10).find((m) => m.hors);
  v.ok("10. le contour mesuré vaut 4,2 + 0,6π ; le trait caché est le diamètre de l'arc", proche(P10, 4.2 + 0.6 * PI) && proche(cache10.long, 2 * arc10.r));
  dit(10, `= 4{,}2 + 0{,}6\\pi$ m, soit environ $${fr(P10, 2)}$ m`);
  dit(10, `environ $${fr(P10 + cache10.long, 2)}$ m`);

  const roue = ms(11).find((m) => m.type === "arc");
  const deroule = ms(11).find((m) => m.type === "segment" && m.tour);
  const t11 = PI * 2 * roue.r;
  v.ok(`11. la roue dessinée a un diamètre de ${2 * roue.r} cm, et le tour déroulé mesure π × d`, 2 * roue.r === 68 && proche(deroule.long, t11, 0.01) && proche(roue.long, t11));
  dit(11, `68\\pi \\approx ${fr(t11, 1)}$ cm, soit environ $${fr(t11 / 100, 3)}$ m`);
  const tours11 = Math.round(1e6 / t11);
  dit(11, `\\approx ${fr(tours11)}$ tours`);
  dit(11, `$1\\,500 \\times 68\\pi \\approx ${fr(Math.round(1500 * t11))}$ cm, soit environ $${fr(Math.round((1500 * t11) / 100))}$ m`);
  const faux11 = Math.round(1e4 / 2.1);
  dit(11, `$10\\,000 \\div 2{,}1 \\approx ${fr(faux11)}$ tours : $${faux11 - tours11}$ de trop`);

  const P12 = somme(bord(12));
  const porte12 = ms(12).find((m) => !m.tour && !m.hors);
  const tout12 = P12 + porte12.long;
  const n12 = Math.ceil(P12 / 2.4 - 1e-9);
  v.ok(`12. mesuré : ${fr(tout12)} m de murs, ${fr(P12)} m sans la porte, ${n12} baguettes`, proche(tout12, 15.6) && proche(P12, 14.7) && n12 === 7 && (n12 - 1) * 2.4 < P12);
  dit(12, `= 2 \\times 7{,}8 = ${fr(tout12)}$ m`);
  dit(12, `$15{,}6 - 0{,}9 = ${fr(P12)}$ m`);
  dit(12, `$14{,}7 \\div 2{,}4 = ${fr(P12 / 2.4)}$`);
  dit(12, `$6 \\times 2{,}4 = ${fr(6 * 2.4)}$ m : il manquerait $${fr(P12 - 6 * 2.4)}$ m`);
  dit(12, `Il faut donc en acheter $${n12}$`);
  dit(12, `$4{,}2 \\times 3{,}6 = ${fr(4.2 * 3.6)}$`);

  const hex = bord(13).filter((m) => m.type === "segment");
  const cercle13 = bord(13).find((m) => m.type === "arc");
  const surCercle = hex.every((m) => proche(Math.hypot(m.de[0] - cercle13.centre[0], m.de[1] - cercle13.centre[1]), cercle13.r, 1e-3));
  const P13 = somme(hex);
  v.ok(`13. six sommets sur le cercle de rayon ${cercle13.r}, six côtés égaux, tour ${P13.toFixed(3)}`, hex.length === 6 && surCercle && hex.every((m) => proche(m.long, 6, 1e-3)) && proche(P13, 36, 1e-3));
  v.ok("13. le cercle mesuré vaut 12π, plus que l'hexagone", proche(cercle13.long, 12 * PI) && cercle13.long > P13);
  dit(13, `$6 \\times 6 = ${Math.round(P13)}$ cm`);
  dit(13, `12\\pi \\approx ${fr(cercle13.long, 2)}$ cm`);
  dit(13, `$37{,}70 - 36 = ${fr(Number(cercle13.long.toFixed(2)) - 36, 2)}$ cm`);
  dit(13, `$36 \\div 12 = ${36 / 12}$`);

  const diviseurs = [...Array(24).keys()].map((i) => i + 1).filter((a) => 24 % a === 0 && a * a <= 24);
  const rects14 = [0, 1, 2, 3].map((i) => bord(14).slice(4 * i, 4 * i + 4)).map((r) => ({ a: Math.min(r[0].long, r[1].long), b: Math.max(r[0].long, r[1].long), p: somme(r) }));
  v.ok(`14. les diviseurs de 24 donnent ${diviseurs.length} rectangles, et ce sont ceux du dessin`, diviseurs.length === 4 && rects14.every((r, i) => r.a === diviseurs[i] && r.a * r.b === 24 && r.p === 2 * (r.a + r.b)));
  for (const r of rects14) dit(14, `2 \\times (${r.a} + ${r.b}) = ${r.p}$ m`);
  const notes14 = [...plans[13].bloc.matchAll(/texte: "P = (\d+) m"/g)].map((m) => Number(m[1])).sort((x, y) => x - y);
  v.ok("14. les « P = … » écrits sur le dessin sont les périmètres mesurés", JSON.stringify(notes14) === JSON.stringify(rects14.map((r) => r.p).sort((x, y) => x - y)));
  const min14 = rects14.reduce((m, r) => (r.p < m.p ? r : m));
  dit(14, `Le rectangle de $${min14.a}$ m sur $${min14.b}$ m : $${min14.p}$ m seulement`);
  dit(14, `$\\sqrt{24} \\approx ${fr(Math.sqrt(24), 2)}$ m et un périmètre d'environ $${fr(4 * Math.sqrt(24), 1)}$ m`);

  const P15 = somme(bord(15));
  const pts15 = bord(15).filter((m) => m.type === "segment").flatMap((m) => [m.de, m.vers]);
  const cote15 = Math.max(...pts15.map((p) => p[0])) - Math.min(...pts15.map((p) => p[0]));
  const encoche = bord(15).find((m) => m.type === "arc");
  const retire15 = ms(15).find((m) => m.hors);
  v.ok(`15. mesuré : carré de ${cote15}, encoche de rayon ${encoche.r}, nouveau tour 28 + 2π`, cote15 === 8 && proche(retire15.long, 2 * encoche.r) && proche(P15, 28 + 2 * PI));
  v.ok("15. le tour a augmenté", P15 > 4 * cote15);
  dit(15, `a) $4 \\times 8 = ${4 * cote15}$ cm`);
  dit(15, `$(8 - 4) \\div 2 = ${(cote15 - retire15.long) / 2}$ cm`);
  dit(15, `$24 + 4 + 2\\pi = 28 + 2\\pi \\approx ${fr(P15, 2)}$ cm`);
  dit(15, `détour de $2\\pi \\approx ${fr(2 * PI, 2)}$ cm`);

  const petit = bord(16).slice(0, 3).map((m) => m.long).sort((x, y) => x - y);
  const grand = bord(16).slice(3, 6).map((m) => m.long).sort((x, y) => x - y);
  v.ok("16. le grand triangle dessiné est le petit multiplié par 2,5", grand.every((g, i) => proche(g, 2.5 * petit[i])));
  const [p16, g16] = [petit.reduce((s, x) => s + x), grand.reduce((s, x) => s + x)];
  dit(16, `$3 + 4 + 5 = ${p16}$ cm avant, $7{,}5 + 10 + 12{,}5 = ${g16}$ cm après`);
  dit(16, `$12 \\times 2{,}5 = ${fr(p16 * 2.5)}$`);
  dit(16, `$2\\pi \\times 4 = 8\\pi \\approx ${fr(8 * PI, 2)}$ cm`);
  dit(16, `$2\\pi \\times 12 = 24\\pi \\approx ${fr(24 * PI, 2)}$ cm`);
  dit(16, `$24\\pi \\div 8\\pi = ${(24 * PI) / (8 * PI)}$`);

  v.titre("★★★ Problèmes");
  const P17 = somme(bord(17));
  const droites17 = somme(bord(17).filter((m) => m.type === "segment"));
  const virages17 = somme(bord(17).filter((m) => m.type === "arc"));
  const r17 = bord(17).find((m) => m.type === "arc").r;
  v.ok(`17. la piste dessinée : ${fr(droites17)} m de droites, deux demi-cercles de rayon ${r17}`, proche(droites17, 168.78, 1e-9) && proche(virages17, 2 * PI * 36.5));
  dit(17, `$2 \\times 84{,}39 = ${fr(droites17)}$ m`);
  dit(17, `= 73\\pi \\approx ${fr(virages17, 2)}$ m`);
  dit(17, `$168{,}78 + 73\\pi \\approx ${fr(P17, 2)}$ m`);
  const L1 = droites17 + 2 * PI * (r17 + 0.3);
  dit(17, `= 73{,}6\\pi \\approx ${fr(2 * PI * (r17 + 0.3), 2)}$ m`);
  dit(17, `$168{,}78 + 73{,}6\\pi \\approx ${fr(L1, 2)}$ m`);
  const r8 = r17 + 7 * 1.22 + 0.2;
  v.ok(`17. couloir 8 par le règlement : 36,5 + 7 × 1,22 + 0,20 = ${fr(r8)}, comme l'énoncé`, proche(r8, 45.24) && enonces[16].includes("$45{,}24$ m"));
  const L8 = droites17 + 2 * PI * r8;
  dit(17, `90{,}48\\pi \\approx ${fr(L8, 2)}$ m`);
  dit(17, `ferait $${Math.round(L8 - L1)}$ m de plus`);
  const diam17 = ms(17).filter((m) => m.hors && m.type === "segment" && proche(m.de[0], m.vers[0]));
  v.ok("17. les diamètres pointillés mesurent 2r et ne sont pas dans le contour", diam17.length >= 2 && proche(diam17[0].long, 2 * r17) && !diam17.some((m) => m.tour));
  dit(17, `deux diamètres de $${2 * r17}$ m`);

  const P18 = somme(bord(18));
  const pts18 = bord(18).filter((m) => m.type === "segment").flatMap((m) => [m.de, m.vers]);
  const [X18, Y18] = [Math.max(...pts18.map((p) => p[0])), Math.max(...pts18.map((p) => p[1]))];
  const q18 = bord(18).find((m) => m.type === "arc");
  v.ok(`18. le parc dessiné : ${X18} × ${Y18}, coin arrondi de rayon ${q18.r}, tour 800 + 50π`, X18 === 300 && Y18 === 200 && q18.r === 100 && proche(P18, 800 + 50 * PI));
  dit(18, `= 50\\pi \\approx ${fr(q18.long, 2)}$ m`);
  dit(18, `= 800 + 50\\pi \\approx ${Math.round(P18)}$ m`);
  dit(18, `(800 + 50\\pi) \\approx ${fr(1e4 / P18, 2)}$`);
  dit(18, `Dix tours ne font qu'environ $${fr(Math.round(10 * P18))}$ m : il en faut $${Math.ceil(1e4 / P18)}$`);
  dit(18, `$2 \\times (300 + 200) = ${fr(2 * (X18 + Y18))}$ m`);
  dit(18, `d'environ $${Math.round(2 * (X18 + Y18) - P18)}$ m`);

  const equateur = 2 * PI * 6378;
  dit(19, `12\\,756\\pi \\approx ${fr(Math.round(equateur))}$ km`);
  const allonge = 2 * PI * (6378000 + 1) - 2 * PI * 6378000;
  const allongeBallon = 2 * PI * (0.11 + 1) - 2 * PI * 0.11;
  v.ok(`19. allongement recalculé : Terre ${allonge.toFixed(4)} m, ballon ${allongeBallon.toFixed(4)} m, tous deux 2π`, proche(allonge, 2 * PI, 1e-6) && proche(allongeBallon, 2 * PI, 1e-9));
  dit(19, `2\\pi R + 2\\pi - 2\\pi R = 2\\pi \\approx ${fr(allonge, 2)}$ m`);
  dit(19, `2\\pi(r + 1) - 2\\pi r = 2\\pi \\approx ${fr(allongeBallon, 2)}$ m`);
  v.ok("19. arrondis au km, les deux tours sont égaux", Math.round(2 * PI * 6378.001) === Math.round(equateur));
  dit(19, `donnent tous les deux $${fr(Math.round(equateur))}$`);
  const [eq19, corde19] = ms(19).filter((m) => m.type === "arc");
  const ecart19 = ms(19).find((m) => m.label === "1 m");
  v.ok("19. sur le dessin, la corde est à 1 du cercle de l'équateur", proche(corde19.r - eq19.r, ecart19.long));

  const P20 = somme(bord(20));
  const riviere = ms(20).find((m) => m.label === "rivière");
  v.ok(`20. l'enclos dessiné : ${P20} m de grillage sur trois côtés, rivière de ${riviere.long} m non grillagée`, P20 === 120 && !riviere.tour);
  dit(20, `$c = 120 \\div 4 = ${120 / 4}$ m`);
  const l20 = [...Array(100).keys()].find((l) => 2 * (2 * l + l) === 120);
  dit(20, `$l = ${l20}$ m ; la longueur vaut $${2 * l20}$ m`);
  dit(20, `$d = 120 \\div \\pi \\approx ${fr(120 / PI, 2)}$ m`);
  dit(20, `$x = 120 - 60 = ${riviere.long}$ m`);
}

lancer({
  nom: "PÉRIMÈTRES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-perimetres.tsx",
  notionId: "aire_perimetre",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : l'aire à la place du périmètre", "il faut $38$ m de grillage", "il faut $84$ m de grillage"],
    ["ex. 2 : le rectangle dessiné trop court", "vers: [13.5, 0], label: \"13,5 cm\"", "vers: [12.5, 0], label: \"13,5 cm\""],
    ["ex. 3 : le côté qui referme oublié", "= 9 + 4 + 5 + 6 + 8 = 32$ cm", "= 9 + 4 + 5 + 6 + 8 = 24$ cm"],
    ["ex. 4 : πr² au lieu de 2πr", "14\\\\pi \\\\approx 43{,}98$", "14\\\\pi \\\\approx 153{,}94$"],
    ["ex. 5 : le rayon au lieu du diamètre", "d = 2{,}2 \\\\div \\\\pi \\\\approx 0{,}70$ m", "d = 2{,}2 \\\\div \\\\pi \\\\approx 0{,}35$ m"],
    ["ex. 6 : les unités mélangées", "$45 + 60 + 75 = 180$ cm", "$45 + 60 + 75 = 795{,}6$ cm"],
    ["ex. 7 : la largeur dessinée fausse", "vers: [11, 6], label: \"6 m\"", "vers: [11, 7], label: \"6 m\""],
    ["ex. 8 : le diamètre oublié", "$5\\\\pi + 10 \\\\approx 25{,}7$ cm", "$5\\\\pi + 10 \\\\approx 15{,}7$ cm"],
    ["ex. 9 : le trait de découpe compté", "$10 + 4 + 6 + 5 + 4 + 9 = 38$ cm", "$10 + 4 + 6 + 5 + 4 + 9 = 46$ cm"],
    ["ex. 10 : le haut du rectangle compté", "0{,}6\\\\pi$ m, soit environ $6{,}08$ m", "0{,}6\\\\pi$ m, soit environ $7{,}28$ m"],
    ["ex. 11 : l'arrondi trop tôt", "\\\\div (68\\\\pi) \\\\approx 4\\\\,681$ tours", "\\\\div (68\\\\pi) \\\\approx 4\\\\,762$ tours"],
    ["ex. 12 : six baguettes seulement", "Il faut donc en acheter $7$", "Il faut donc en acheter $6$"],
    ["ex. 13 : le cercle dessiné trop petit", "{ centre: [0, 0], r: 6, angles: [-90, 270], label: \"≈ 37,70 cm\"", "{ centre: [0, 0], r: 5.5, angles: [-90, 270], label: \"≈ 37,70 cm\""],
    ["ex. 14 : un périmètre faux", "2 \\\\times (3 + 8) = 22$ m", "2 \\\\times (3 + 8) = 24$ m"],
    ["ex. 15 : le segment retiré encore compté", "28 + 2\\\\pi \\\\approx 34{,}28$ cm", "28 + 2\\\\pi \\\\approx 38{,}28$ cm"],
    ["ex. 16 : ajouter au lieu de multiplier (dessin)", "{ de: [16, 0], vers: [16, 7.5], label: \"7,5 cm\"", "{ de: [16, 0], vers: [16, 5.5], label: \"7,5 cm\""],
    ["ex. 17 : πr au lieu de 2πr", "$168{,}78 + 73\\\\pi \\\\approx 398{,}12$ m", "$168{,}78 + 73\\\\pi \\\\approx 283{,}45$ m"],
    ["ex. 17 : un diamètre compté dans le contour", "{ de: [0, 0], vers: [0, 73], label: \"73 m\", hors: true }", "{ de: [0, 0], vers: [0, 73], label: \"73 m\", tour: true }"],
    ["ex. 18 : le coin compté carré", "800 + 50\\\\pi \\\\approx 957$ m", "800 + 50\\\\pi \\\\approx 1\\\\,000$ m"],
    ["ex. 19 : l'allongement perdu à l'arrondi", "2\\\\pi R + 2\\\\pi - 2\\\\pi R = 2\\\\pi \\\\approx 6{,}28$ m", "2\\\\pi R + 2\\\\pi - 2\\\\pi R = 2\\\\pi \\\\approx 0$ m"],
    ["ex. 20 : divisé par 2π", "d = 120 \\\\div \\\\pi \\\\approx 38{,}20$ m", "d = 120 \\\\div \\\\pi \\\\approx 19{,}10$ m"],
    ["ex. 20 : la rivière grillagée", "label: \"rivière\", couleur", "label: \"rivière\", tour: true, couleur"],
    ["une micro d'une autre notion", "micros: [\"aire_perimetre_defi\", \"aire_perimetre_cercle\"]", "micros: [\"aire_surface_calculer\", \"aire_perimetre_cercle\"]"],
    ["un $ dans un canvas", "label: \"≈ 15,7 cm\"", "label: \"$5\\\\pi$ cm\""],
  ],
});
