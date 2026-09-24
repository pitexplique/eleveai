// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Calculer un volume »
// de 3e (lib/fiches-exercices/maths-3e-volumes.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé APPLIQUE une formule. Ici :
// - les pavés se COMPTENT, cube unité par cube unité (des additions, pas le
//   produit L × l × h) — en dm pour la piscine, ce qui donne directement des
//   litres ;
// - l'aire d'une base de prisme se calcule par la formule du lacet sur les
//   sommets du polygone (pas « base × hauteur ÷ 2 ») ;
// - le 1/3 du cône et de la pyramide, le 4/3 de la boule ne sont PAS écrits :
//   le volume est la somme de 20 000 tranches fines (disques ou carrés), et le
//   coefficient de π en sort tout seul ;
// - les coefficients de π restent des fractions EXACTES, arrondies seulement
//   à l'écriture, comme dans le corrigé ;
// - k³ est vérifié contre le volume DIRECT du solide agrandi ou réduit ;
// - les conversions passent par les longueurs : 1 m = 10 dm, cubé.
// Puis chaque dessin est relu dans le source : `pave(55, 35, 30`, `cone(3, 6`…
//
//   node scripts/verifier-exercices-volumes-3e.mjs

import { lireFeuille, lancer, Q, D, fois, div, plus, moins, egal, versNombre } from "./verifier-exercices-commun.mjs";

/* ── Les autres chemins ─────────────────────────────────────────────────── */

/** Un pavé à dimensions entières, compté cube par cube (additions seulement). */
function compter(a, b, c) {
  let n = 0;
  for (let k = 0; k < c; k++) for (let j = 0; j < b; j++) for (let i = 0; i < a; i++) n++;
  return n;
}

/** Aire d'un polygone par la formule du lacet, exacte. */
function lacet(sommets) {
  let s = Q(0);
  sommets.forEach(([x, y], i) => {
    const [x2, y2] = sommets[(i + 1) % sommets.length];
    s = plus(s, moins(fois(D(x), D(y2)), fois(D(x2), D(y))));
  });
  return div(s.n < 0n ? Q(-s.n, s.d) : s, Q(2));
}

/** ∫ f(z) dz sur [a ; b], par 20 000 tranches (point milieu). */
function tranches(f, a, b, n = 20000) {
  const dz = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * dz) * dz;
  return s;
}
/** Coefficient de π du volume d'un cône de rayon r et de hauteur h, en disques. */
const coefCone = (r, h) => tranches((z) => ((r * z) / h) ** 2, 0, h);
/** Coefficient de π du volume d'une boule de rayon r, en disques. */
const coefBoule = (r) => tranches((z) => r * r - z * z, -r, r);
/** Volume d'une pyramide à base carrée de côté c, en tranches carrées. */
const volPyramide = (c, h) => tranches((z) => ((c * z) / h) ** 2, 0, h);
const proche = (x, y, eps = 1e-6) => Math.abs(x - y) <= eps * Math.max(1, Math.abs(y));

/** Un nombre écrit comme dans la feuille : `1\,539{,}38`, `113{,}10`. */
function fr(x, d = 0) {
  const [e, f] = x.toFixed(d).split(".");
  const g = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${g}{,}${f}` : g;
}
/** Une fraction exacte écrite en décimal fini : 122{,}5 ; 57\,750. */
const frQ = (q) => {
  const x = versNombre(q);
  for (let d = 0; d < 8; d++) if (Math.abs(+x.toFixed(d) - x) < 1e-12) return fr(x, d);
  throw new Error(`décimal infini : ${q.n}/${q.d}`);
};
/** Écriture scientifique à quatre chiffres : 1{,}083 \times 10^{12}. */
function sci4(x) {
  const e = Math.floor(Math.log10(x));
  return `${fr(x / 10 ** e, 3)} \\times 10^{${e}}`;
}
const pi = (q) => versNombre(q) * Math.PI;
const MILLE = fois(fois(Q(10), Q(10)), Q(10)); // 1 m³ = (10 dm)³ dm³ ; 1 dm³ = (10 cm)³ cm³

/* ── La lecture des dessins ─────────────────────────────────────────────── */

const appels = (bloc, nom) => [...bloc.matchAll(new RegExp(`\\b${nom}\\(([\\d.]+)(?:, ([\\d.]+))?(?:, ([\\d.]+))?(?:, ([\\d.]+))?[,)]`, "g"))].map((m) => m.slice(1).filter((x) => x !== undefined).map(Number));

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** Le k-ième exercice dessine-t-il ces solides, avec ces nombres, dans l'ordre ? */
  const dessine = (k, nom, attendus) => {
    const lus = appels(b(k), nom);
    const ok = lus.length === attendus.length && lus.every((l, i) => l.length === attendus[i].length && l.every((x, j) => proche(x, attendus[i][j], 1e-3)));
    v.ok(`${k}. dessin ${nom}${attendus.map((a) => `(${a.join(", ")})`).join(" ")}`, ok, `lu ${JSON.stringify(lus)}`);
  };
  const memeEchelle = (k, cte, n = 2) => v.ok(`${k}. ${n} solides à la même échelle (${cte})`, (b(k).match(new RegExp(`ech: ${cte}\\b`, "g")) ?? []).length === n);

  v.titre("Les dessins");
  const dessinees = blocs.filter((bl) => /schema:/.test(bl.split("micros:")[0])).length;
  v.ok(`${dessinees} corrigés dessinés sur 20`, dessinees >= 18);
  const tailles = [...source.matchAll(/fontSize=\{(\d+)\}/g)].map((m) => +m[1]);
  v.ok("texte des dessins à 13 au moins", !/fontSize=\{(?:[1-9]|1[0-2])\}/.test(source) && /const F = 1[3-9];/.test(source), tailles.join(","));
  v.ok("empilés sur téléphone, côte à côte à l'impression", source.includes("grid-cols-1") && source.includes("sm:grid-cols-2 print:grid-cols-2"));

  v.titre("★ Un seul geste");
  // 1. Les cubes, comptés.
  const n1 = compter(6, 5, 4);
  const couche1 = compter(6, 5, 1);
  v.ok(`1. ${couche1} cubes par couche, ${n1} en tout (comptés)`, couche1 === 30 && n1 === 120);
  dit(1, `$6 \\times 5 = ${couche1}$ cubes`);
  dit(1, `$30 \\times 4 = ${n1}$ cubes`);
  dit(1, `Réponse : $${couche1}$ cubes par couche, $${n1}$ cubes en tout, $${n1}$ cm³.`);
  dessine(1, "pave", [[6, 5, 4], [6, 5, 4]]);

  // 2. Le carton.
  const V2 = compter(55, 35, 30);
  dit(2, `$55 \\times 35 = ${fr(compter(55, 35, 1))}$ cm²`);
  dit(2, `$V = 1\\,925 \\times 30 = ${fr(V2)}$ cm³`);
  dit(2, `Réponse : $V = ${fr(V2)}$ cm³.`);
  dit(2, "$55 + 35 + 30 = 120$");
  dessine(2, "pave", [[55, 35, 30]]);

  // 3. La tente : base par le lacet.
  const B3 = lacet([["0", "0"], ["1.6", "0"], ["0.8", "1.2"]]);
  const V3 = fois(B3, D("2.1"));
  dit(3, `$1{,}6 \\times 1{,}2 \\div 2 = ${frQ(B3)}$ m²`);
  dit(3, `$V = ${frQ(B3)} \\times 2{,}1 = ${frQ(V3)}$ m³`);
  dit(3, `$1{,}6 \\times 1{,}2 \\times 2{,}1 = ${frQ(fois(V3, Q(2)))}$ m³`, "le piège vaut le double");
  dessine(3, "prisme", [[1.6, 0, 1.2, 2.1]]);

  // 4. Le verre : r = 3,5.
  const k4 = fois(fois(D("3.5"), D("3.5")), Q(10));
  const k4d = fois(fois(Q(7), Q(7)), Q(10));
  v.ok("4. le diamètre donne 4 fois trop", egal(k4d, fois(k4, Q(4))));
  dit(4, `$V = 12{,}25\\pi \\times 10 = ${frQ(k4)}\\pi \\approx ${fr(pi(k4), 2)}$ cm³`);
  dit(4, `$\\pi \\times 7^2 \\times 10 = ${frQ(k4d)}\\pi \\approx ${fr(pi(k4d), 2)}$ cm³`);
  dessine(4, "cylindre", [[3.5, 10]]);

  // 5. Le cornet : le tiers sort des tranches.
  const k5 = coefCone(2.5, 12);
  v.ok(`5. cône en 20 000 disques : ${k5.toFixed(6)} π, le tiers de 75 π`, proche(k5, 25) && proche(k5 * 3, 6.25 * 12));
  dit(5, `$V = 75\\pi \\div 3 = ${fr(k5)}\\pi \\approx ${fr(k5 * Math.PI, 2)}$ cm³`);
  dit(5, `$75\\pi \\approx ${fr(75 * Math.PI, 2)}$ cm³`);
  dessine(5, "cone", [[2.5, 12]]);

  // 6. La boule de pétanque : le 4/3 sort des tranches.
  const k6 = coefBoule(4);
  v.ok(`6. boule en 20 000 disques : ${k6.toFixed(6)} π = 256/3 π`, proche(k6, 256 / 3));
  dit(6, `$V = \\dfrac{4}{3} \\times \\pi \\times 64 = \\dfrac{256}{3}\\pi \\approx ${fr(k6 * Math.PI, 2)}$ cm³`);
  dit(6, `$4\\pi r^2 = 4\\pi \\times 16 = 64\\pi \\approx ${fr(64 * Math.PI, 2)}$`);
  dessine(6, "boule", [[4]]);

  // 7. Les dés : k³ contre le volume direct.
  const [p7, g7] = [compter(2, 2, 2), compter(6, 6, 6)];
  const k7 = 6 / 2;
  v.ok(`7. ${g7} ÷ ${p7} = ${g7 / p7} = ${k7}³`, g7 / p7 === k7 ** 3);
  dit(7, `$k^3 = 3 \\times 3 \\times 3 = ${k7 ** 3}$`);
  dit(7, `$8 \\times 27 = ${g7}$ cm³`);
  dit(7, `Réponse : $k = 3$ ; le volume est multiplié par $27$ ; le dé géant fait $${g7}$ cm³.`);
  dessine(7, "pave", [[2, 2, 2], [6, 6, 6]]);
  memeEchelle(7, "ECH_DES");

  // 8. Les conversions, par les longueurs.
  v.ok("8. (10 dm)³ = 1 000 dm³", egal(MILLE, Q(1000)));
  const a8 = fois(D("3.4"), MILLE);
  const b8 = div(Q(750), MILLE);
  const c8 = div(Q(45), MILLE);
  dit(8, `soit $${frQ(a8)}$ L.`);
  dit(8, `soit $${frQ(b8)}$ L.`);
  dit(8, `Réponse : $${frQ(a8)}$ L ; $${frQ(b8)}$ L ; $${frQ(c8)}$ m³.`);
  dessine(8, "pave", [[10, 10, 10]]);

  v.titre("★★ Type devoir");
  // 9. La piscine : comptée en dm³, c'est-à-dire en litres.
  const L9 = compter(250, 125, 18);
  const V9 = fois(fois(Q(25), D("12.5")), D("1.8"));
  v.ok(`9. ${L9} cubes d'un litre = ${frQ(V9)} m³ × 1 000`, egal(fois(V9, MILLE), Q(L9)));
  const t9 = div(V9, Q(50));
  const min9 = fois(moins(t9, Q(11)), Q(60));
  dit(9, `$V = 312{,}5 \\times 1{,}8 = ${frQ(V9)}$ m³`);
  dit(9, `$562{,}5 \\times 1\\,000 = ${fr(L9)}$ L`);
  dit(9, `$562{,}5 \\div 50 = ${frQ(t9)}$ h`);
  dit(9, `remplis en $11$ h $${frQ(min9)}$ min`);
  dessine(9, "pave", [[25, 12.5, 1.8]]);

  // 10. Le hangar : la façade par le lacet.
  const B10 = lacet([["0", "0"], ["8", "0"], ["8", "3"], ["4", "5"], ["0", "3"]]);
  const V10 = fois(B10, Q(10));
  dit(10, `Façade : $24 + 8 = ${frQ(B10)}$ m²`);
  dit(10, `$V = 32 \\times 10 = ${frQ(V10)}$ m³`);
  v.ok("10. 320 > 300 : le chauffage ne suffit pas", versNombre(V10) > 300 && c(10).includes("le chauffage ne suffit pas"));
  dessine(10, "prisme", [[8, 3, 2, 10], [8, 3, 2, 10]]);

  // 11. La cuve.
  const k11 = fois(fois(D("0.6"), D("0.6")), D("1.5"));
  const l11 = fois(k11, MILLE);
  const t11 = fois(l11, Q(3, 4));
  dit(11, `$V = 0{,}36\\pi \\times 1{,}5 = ${frQ(k11)}\\pi \\approx ${fr(pi(k11), 3)}$ m³`);
  dit(11, `$0{,}54\\pi \\times 1\\,000 = ${frQ(l11)}\\pi \\approx ${fr(pi(l11))}$ L`);
  dit(11, `$\\dfrac{3}{4} \\times 540\\pi = ${frQ(t11)}\\pi \\approx ${fr(pi(t11))}$ L`);
  const k11f = fois(fois(D("1.2"), D("1.2")), D("1.5"));
  dit(11, `$${frQ(k11f)}\\pi \\approx ${fr(pi(k11f), 3)}$ m³`, "le piège du diamètre");
  dessine(11, "cylindre", [[0.6, 1.5]]);

  // 12. Le ballon.
  const r12 = 69 / (2 * Math.PI);
  const V12 = coefBoule(r12) * Math.PI;
  dit(12, `$r = \\dfrac{69}{2\\pi} \\approx ${fr(r12, 2)}$ cm`);
  dit(12, `$V \\approx ${fr(V12)}$ cm³. Comme`);
  dit(12, `$V \\approx ${fr(V12 / 1000, 1)}$ L`);
  dit(12, `$4\\pi r^2 \\approx ${fr(4 * Math.PI * r12 * r12)}$`);
  dessine(12, "boule", [[+r12.toFixed(2)]]);

  // 13. Khéops : en tranches carrées.
  const V13 = div(fois(fois(Q(230), Q(230)), Q(147)), Q(3));
  v.ok(`13. pyramide en 20 000 tranches carrées : ${volPyramide(230, 147).toFixed(1)} m³`, proche(volPyramide(230, 147), versNombre(V13)));
  dit(13, `$V = 7\\,776\\,300 \\div 3 = ${frQ(V13)}$ m³`);
  dit(13, `$52\\,900 \\times 147 = ${frQ(fois(V13, Q(3)))}$ m³`);
  dit(13, `\\div 562{,}5 \\approx ${fr(versNombre(V13) / 562.5, 1)}$`);
  dessine(13, "pyramide", [[230, 147]]);

  // 14. Le verre à cocktail : k³ contre le petit cône calculé directement.
  const plein14 = coefCone(4.5, 9);
  const k14 = div(Q(6), Q(9));
  const k14c = fois(fois(k14, k14), k14);
  const petit14 = coefCone(4.5 * versNombre(k14), 6);
  v.ok(`14. petit cône direct ${petit14.toFixed(6)} π = ${plein14.toFixed(4)} π × 8/27`, proche(petit14, plein14 * versNombre(k14c)) && egal(k14c, Q(8, 27)));
  dit(14, `= 60{,}75\\pi \\approx ${fr(plein14 * Math.PI, 2)}$ cm³`);
  dit(14, `$k = 6 \\div 9 = \\dfrac{2}{3}$`);
  dit(14, `$60{,}75\\pi \\times \\dfrac{8}{27} = ${fr(petit14)}\\pi \\approx ${fr(petit14 * Math.PI, 2)}$ cm³`);
  dit(14, `$\\dfrac{8}{27} \\approx ${fr(8 / 27, 3)}$`);
  dit(14, `$40{,}5\\pi \\approx ${fr(plein14 * (2 / 3) * Math.PI, 2)}$ cm³`, "le piège × k");
  dessine(14, "cone", [[4.5, 9], [4.5 * 2 / 3, 6]]);
  memeEchelle(14, "ECH_VERRE");
  v.ok("14. le jus dessiné jusqu'à 6 cm", /niveau: 6\b/.test(b(14)));

  // 15. La maquette : k³ contre ses dimensions.
  const V15 = fois(fois(D("2.5"), Q(2)), D("1.6"));
  const k15 = Q(1, 20);
  const maq15 = [250, 200, 160].map((x) => fois(Q(x), k15));
  const cm315 = maq15.reduce((a, x) => fois(a, x), Q(1));
  v.ok(`15. maquette ${maq15.map(frQ).join(" × ")} cm = ${frQ(cm315)} cm³ = V × k³`, egal(div(cm315, MILLE), fois(fois(V15, MILLE), fois(fois(k15, k15), k15))) && egal(div(cm315, MILLE), Q(1)));
  dit(15, `$V = 2{,}5 \\times 2 \\times 1{,}6 = ${frQ(V15)}$ m³, soit $8 \\times 1\\,000 = ${frQ(fois(V15, MILLE))}$ L`);
  dit(15, `$8\\,000 \\div 8\\,000 = ${frQ(div(cm315, MILLE))}$ L`);
  dit(15, `$12{,}5 \\times 10 \\times 8 = ${frQ(cm315)}$ cm³`);
  dit(15, `annoncer $${frQ(div(fois(V15, MILLE), Q(20)))}$ L`, "le piège ÷ 20");
  dessine(15, "pave", [[2.5, 2, 1.6], maq15.map(versNombre)]);

  // 16. Cube, cylindre, boule.
  const cyl16 = 3 * 3 * 6;
  const b16 = coefBoule(3);
  v.ok(`16. boule ÷ cylindre = ${(b16 / cyl16).toFixed(6)} = 2/3`, proche(b16 / cyl16, 2 / 3));
  dit(16, `$V = 6^3 = ${compter(6, 6, 6)}$ cm³`);
  dit(16, `$V = \\pi \\times 3^2 \\times 6 = ${cyl16}\\pi \\approx ${fr(cyl16 * Math.PI, 2)}$ cm³`);
  dit(16, `= ${fr(b16)}\\pi \\approx ${fr(b16 * Math.PI, 2)}$ cm³`);
  v.ok("16. ordre : boule < cylindre < cube", b16 * Math.PI < cyl16 * Math.PI && cyl16 * Math.PI < 216 && c(16).includes("la boule, puis le cylindre, puis le cube"));
  dit(16, "= \\dfrac{2}{3}$");
  dessine(16, "boule", [[3]]);
  dessine(16, "cylindre", [[3, 6]]);
  dessine(16, "pave", [[6, 6, 6]]);
  memeEchelle(16, "ECH_TRIO", 3);

  v.titre("★★★ Problèmes");
  // 17. Le silo.
  const cyl17 = 9 * 10;
  const cone17 = coefCone(3, 2.4);
  const tot17 = cyl17 + cone17;
  v.ok(`17. cône en disques : ${cone17.toFixed(6)} π`, proche(cone17, 7.2));
  dit(17, `$90\\pi + ${fr(cone17, 1)}\\pi = ${fr(tot17, 1)}\\pi \\approx ${fr(tot17 * Math.PI, 1)}$ m³`);
  dit(17, `\\times 0{,}78 \\approx ${fr(tot17 * Math.PI * 0.78)}$ t`);
  dit(17, `\\div 30 \\approx ${fr((tot17 * Math.PI) / 30, 2)}$`);
  dit(17, `il en faut $${Math.ceil((tot17 * Math.PI) / 30)}$`);
  const faux17 = cyl17 + 3 * cone17;
  dit(17, `$${fr(faux17, 1)}\\pi \\approx ${fr(faux17 * Math.PI, 1)}$ m³ : $${fr((faux17 - tot17) * Math.PI)}$ m³`, "le piège sans le tiers");
  dessine(17, "silo", [[3, 10, 2.4], [3, 10, 2.4]]);

  // 18. La Terre et la Lune : rapport des volumes contre k³.
  const VT = coefBoule(6371) * Math.PI;
  const VL = coefBoule(1737.4) * Math.PI;
  const k18 = 6371 / 1737.4;
  v.ok(`18. V_T ÷ V_L = ${(VT / VL).toFixed(4)} ; k³ = ${(k18 ** 3).toFixed(4)}`, proche(VT / VL, k18 ** 3, 1e-6));
  dit(18, `\\approx ${sci4(VT)}$ km³`);
  dit(18, `\\approx ${sci4(VL)}$ km³`);
  dit(18, `\\approx ${fr(VT / VL, 1)}$. Il faudrait environ $${Math.round(VT / VL)}$ Lunes`);
  dit(18, `\\approx ${fr(k18, 3)}$`);
  dit(18, `environ $${Math.round(k18 ** 3)}$ Lunes, pas $${fr(k18, 1)}$`);
  dessine(18, "boule", [[6371], [1737.4]]);
  memeEchelle(18, "ECH_TERRE_LUNE");

  // 19. La pluie : 1 mm sur 1 m², c'est 1 L.
  const k19 = fois(fois(D("0.5"), D("0.5")), D("1.2"));
  const cuve19 = pi(fois(k19, MILLE));
  const pluie19 = fois(Q(80), div(Q(12), MILLE)); // 12 mm = 12/1 000 m
  const litres19 = fois(pluie19, MILLE);
  v.ok("19. 1 mm de pluie sur 1 m² = 1 L", egal(fois(fois(Q(1), div(Q(1), MILLE)), MILLE), Q(1)));
  dit(19, `$0{,}3\\pi \\times 1\\,000 = 300\\pi \\approx ${fr(cuve19)}$ L`);
  dit(19, `$V = 80 \\times 0{,}012 = ${frQ(pluie19)}$ m³, soit $${frQ(litres19)}$ L`);
  v.ok(`19. ${frQ(litres19)} L > ${fr(cuve19)} L, débord ≈ ${fr(versNombre(litres19) - cuve19)} L`, versNombre(litres19) > cuve19 && c(19).includes(`environ $${fr(versNombre(litres19) - cuve19)}$ L débordent`));
  dit(19, `soit environ $${fr((cuve19 / 1000 / 80) * 1000, 1)}$ mm`);
  dessine(19, "pave", [[10, 8, 0.012]]);
  v.ok("19. le toit dessiné fait 80 m²", 10 * 8 === 80);
  dessine(19, "cylindre", [[0.5, 1.2]]);

  // 20. Le cornet et la boule.
  const cone20 = coefCone(3, 10);
  const boule20 = coefBoule(3);
  const hMax = tranches(() => 1, 0, 1) * (boule20 / (coefCone(3, 1) * 1)); // volume d'un cône ∝ h
  dit(20, `= ${fr(cone20)}\\pi \\approx ${fr(cone20 * Math.PI, 2)}$ cm³`);
  dit(20, `= ${fr(boule20)}\\pi \\approx ${fr(boule20 * Math.PI, 2)}$ cm³`);
  dit(20, `= ${fr(boule20 - cone20)}\\pi \\approx ${fr((boule20 - cone20) * Math.PI, 2)}$ cm³`);
  v.ok(`20. profondeur pour la boule : ${hMax.toFixed(6)} cm, et le cône de cette hauteur la contient exactement`, proche(coefCone(3, hMax), boule20) && c(20).includes(`donc $h = ${fr(hMax)}$ cm`));
  dit(20, `deux boules et demie`, "le piège : 90π ÷ 36π = 2,5");
  v.ok("20. 90π ÷ 36π = 2,5", proche((3 * cone20) / boule20, 2.5));
  dessine(20, "boule", [[3]]);
  dessine(20, "cone", [[3, 10]]);
  memeEchelle(20, "ECH_CORNET");
}

lancer({
  nom: "CALCULER UN VOLUME · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-volumes.tsx",
  notionId: "volume_solide",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : les dimensions additionnées", "$120$ cubes en tout, $120$ cm³.", "$120$ cubes en tout, $15$ cm³."],
    ["ex. 1 : la boîte dessinée fausse", "schema: avec(pave(6, 5, 4,", "schema: avec(pave(6, 5, 5,"],
    ["ex. 2 : le produit faux", "$V = 1\\\\,925 \\\\times 30 = 57\\\\,750$", "$V = 1\\\\,925 \\\\times 30 = 57\\\\,570$"],
    ["ex. 3 : le ÷ 2 du triangle oublié", "$V = 0{,}96 \\\\times 2{,}1 = 2{,}016$ m³", "$V = 1{,}92 \\\\times 2{,}1 = 4{,}032$ m³"],
    ["ex. 4 : le diamètre pour le rayon", "$V = 12{,}25\\\\pi \\\\times 10 = 122{,}5\\\\pi \\\\approx 384{,}85$", "$V = 49\\\\pi \\\\times 10 = 490\\\\pi \\\\approx 1\\\\,539{,}38$"],
    ["ex. 5 : le 1/3 du cône oublié", "$V = 75\\\\pi \\\\div 3 = 25\\\\pi \\\\approx 78{,}54$", "$V = 75\\\\pi \\\\approx 235{,}62$"],
    ["ex. 6 : 4πr² pour le volume", "\\\\dfrac{256}{3}\\\\pi \\\\approx 268{,}08$ cm³.\\n⛔", "64\\\\pi \\\\approx 201{,}06$ cm³.\\n⛔"],
    ["ex. 7 : × k au lieu de × k³", "$8 \\\\times 27 = 216$ cm³", "$8 \\\\times 3 = 24$ cm³"],
    ["ex. 7 : les dés à deux échelles", "pave(2, 2, 2, { L: \"2 cm\" }, { ech: ECH_DES, grille: true })", "pave(2, 2, 2, { L: \"2 cm\" }, { grille: true })"],
    ["ex. 8 : m³ → L d'un seul rang", "soit $3\\\\,400$ L.", "soit $34$ L."],
    ["ex. 9 : 1 m³ = 100 L", "$562{,}5 \\\\times 1\\\\,000 = 562\\\\,500$ L", "$562{,}5 \\\\times 100 = 56\\\\,250$ L"],
    ["ex. 9 : 11,25 h lu 11 h 25", "remplis en $11$ h $15$ min", "remplis en $11$ h $25$ min"],
    ["ex. 10 : le hangar dessiné faux", "figure: prisme(8, 3, 2, 10,", "figure: prisme(8, 3, 3, 10,"],
    ["ex. 11 : le diamètre dessiné en rayon", "cylindre(0.6, 1.5,", "cylindre(1.2, 1.5,"],
    ["ex. 12 : le ballon arrondi trop tôt", "5\\\\,547$ cm³. Comme", "5\\\\,545$ cm³. Comme"],
    ["ex. 13 : le 1/3 de la pyramide oublié", "$V = 7\\\\,776\\\\,300 \\\\div 3 = 2\\\\,592\\\\,100$ m³", "$V = 7\\\\,776\\\\,300$ m³"],
    ["ex. 14 : le jus réduit par k", "\\\\dfrac{8}{27} = 18\\\\pi \\\\approx 56{,}55$", "\\\\dfrac{2}{3} = 40{,}5\\\\pi \\\\approx 127{,}23$"],
    ["ex. 14 : le petit cône dessiné sans réduire le rayon", "cone(3, 6,", "cone(4.5, 6,"],
    ["ex. 15 : le volume divisé par 20", "$8\\\\,000 \\\\div 8\\\\,000 = 1$ L", "$8\\\\,000 \\\\div 20 = 400$ L"],
    ["ex. 16 : le diamètre dans la boule", "\\\\dfrac{4}{3} \\\\times 27\\\\pi = 36\\\\pi \\\\approx 113{,}10$", "\\\\dfrac{4}{3} \\\\times 216\\\\pi = 288\\\\pi \\\\approx 904{,}78$"],
    ["ex. 17 : le cône du silo sans son tiers", "Silo : $90\\\\pi + 7{,}2\\\\pi = 97{,}2\\\\pi \\\\approx 305{,}4$", "Silo : $90\\\\pi + 21{,}6\\\\pi = 111{,}6\\\\pi \\\\approx 350{,}6$"],
    ["ex. 17 : dix bennes suffiraient", "il en faut $11$", "il en faut $10$"],
    ["ex. 18 : la Terre contient 3,7 Lunes", "environ $49$ Lunes, pas $3{,}7$", "environ $3{,}7$ Lunes, pas $49$"],
    ["ex. 18 : la Lune à une autre échelle", "{ ech: ECH_TERRE_LUNE }), \"la Lune", "{}), \"la Lune"],
    ["ex. 19 : les mm pas convertis", "$V = 80 \\\\times 0{,}012 = 0{,}96$ m³", "$V = 80 \\\\times 12 = 960$ m³"],
    ["ex. 20 : le cornet sans son tiers", "= 30\\\\pi \\\\approx 94{,}25$ cm³.\\nBoule", "= 90\\\\pi \\\\approx 282{,}74$ cm³.\\nBoule"],
    ["une micro d'une autre notion", "micros: [\"volume_prisme\"],\n        },\n        {\n          enonce:\n            \"Un verre à cocktail", "micros: [\"volume_section\"],\n        },\n        {\n          enonce:\n            \"Un verre à cocktail"],
    ["un $ dans une consigne", "consigne: \"Des solides réels.", "consigne: \"Des solides réels $V$."],
    ["un texte de dessin à 11", "const F = 13;", "const F = 11;"],
  ],
});
