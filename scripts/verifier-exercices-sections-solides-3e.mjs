// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les sections planes de
// solides » de 3e (lib/fiches-exercices/maths-3e-sections-solides.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé APPLIQUE une règle (« parallèle à une face,
// donc un rectangle identique à la face », « k = distance au sommet ÷ hauteur »,
// « r² = R² − d² »). Ici on ne l'applique pas : on COUPE.
// - Pavés, cubes et pyramides sont donnés par leurs sommets en coordonnées
//   (x ; y ; z) et leurs arêtes. Le plan coupe chaque arête ; les points de
//   coupe, rangés autour de leur centre, forment le polygone de la section, dont
//   on mesure les côtés et les angles. La nature (carré, rectangle, triangle) en
//   sort toute seule.
// - Cône : on coupe une GÉNÉRATRICE (le segment sommet → bord de la base) par le
//   plan ; le rayon de la section est l'abscisse du point de coupe.
// - Boule et tronc : le rayon d'une section est cherché par DICHOTOMIE sur
//   l'équation de la sphère x² + y² + z² = R² (ou du cercle), pas par la formule.
// Chaque résultat est ensuite lu dans la phrase du corrigé, et les dessins
// (rectangles, profils, cercles coupés, triangles OHM) sont relus dans le source.
//
//   node scripts/verifier-exercices-sections-solides-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Géométrie dans l'espace, à la main ─────────────────────────────────── */

const sous = (p, q) => p.map((x, i) => x - q[i]);
const scal = (p, q) => p.reduce((s, x, i) => s + x * q[i], 0);
const vect = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
const norme = (p) => Math.sqrt(scal(p, p));
const dist = (p, q) => norme(sous(p, q));
const proche = (x, y, eps = 1e-6) => Math.abs(x - y) < eps;

/** Un pavé : A(0;0;0), B(L;0;0), C(L;l;0), D(0;l;0), et E, F, G, H au-dessus. */
function pave(L, l, h) {
  const bas = [[0, 0, 0], [L, 0, 0], [L, l, 0], [0, l, 0]];
  const sommets = [...bas, ...bas.map(([x, y]) => [x, y, h])];
  const aretes = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return { sommets, aretes };
}
/** Une pyramide régulière à base carrée de côté c (centrée), de sommet (0;0;H). */
function pyramide(c, H) {
  const m = c / 2;
  const sommets = [[-m, -m, 0], [m, -m, 0], [m, m, 0], [-m, m, 0], [0, 0, H]];
  const aretes = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]];
  return { sommets, aretes };
}
/** Une pyramide à base TRIANGULAIRE, de sommet (0;0;H). */
function pyramideTriangle(H) {
  const sommets = [[0, 0, 0], [6, 0, 0], [2, 5, 0], [2, 2, H]];
  const aretes = [[0, 1], [1, 2], [2, 0], [0, 3], [1, 3], [2, 3]];
  return { sommets, aretes };
}

/** La section d'un polyèdre par le plan { n · X = c } : les points où le plan
 *  coupe les arêtes, rangés autour de leur centre. */
function section({ sommets, aretes }, n, c) {
  const pts = [];
  const ajoute = (p) => {
    if (!pts.some((q) => dist(p, q) < 1e-9)) pts.push(p);
  };
  for (const [i, j] of aretes) {
    const P = sommets[i];
    const Q = sommets[j];
    const s = scal(n, P) - c;
    const t = scal(n, Q) - c;
    if (Math.abs(s) < 1e-12) ajoute(P);
    if (Math.abs(t) < 1e-12) ajoute(Q);
    if (s * t < 0) ajoute(P.map((x, k) => x + (s / (s - t)) * (Q[k] - x)));
  }
  if (pts.length < 3) return pts;
  const G = pts.reduce((g, p) => g.map((x, k) => x + p[k] / pts.length), [0, 0, 0]);
  const u = sous(pts[0], G);
  const w = vect(n, u);
  return pts.sort((p, q) => Math.atan2(scal(sous(p, G), w), scal(sous(p, G), u)) - Math.atan2(scal(sous(q, G), w), scal(sous(q, G), u)));
}

/** La nature d'un polygone, lue sur ses côtés et ses angles. */
function nature(poly) {
  const n = poly.length;
  const cotes = poly.map((p, i) => dist(p, poly[(i + 1) % n]));
  if (n === 3) {
    const [a, b, c] = cotes;
    return { nom: proche(a, b) || proche(b, c) || proche(a, c) ? "triangle isocèle" : "triangle", cotes };
  }
  if (n === 4) {
    const droits = poly.every((p, i) => proche(scal(sous(poly[(i + n - 1) % n], p), sous(poly[(i + 1) % n], p)), 0));
    if (droits) {
      const dims = [...new Set(cotes.map((x) => +x.toFixed(6)))].sort((x, y) => y - x);
      return { nom: dims.length === 1 ? "carré" : "rectangle", cotes, dims };
    }
  }
  return { nom: `polygone à ${n} côtés`, cotes };
}

/** Le demi-côté d'une corde : le x ≥ 0 tel que x² + d² = R², par dichotomie.
 *  null si le plan ne touche pas la boule. */
function rayonParDichotomie(R, d) {
  if (d > R) return null;
  let [a, b] = [0, R];
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2;
    if (m * m + d * d < R * R) a = m;
    else b = m;
  }
  return (a + b) / 2;
}

/** Cône de sommet (0;0;H) et de base de rayon R dans z = 0 : on coupe la
 *  génératrice qui va du sommet à (R;0;0) par le plan z = H − h (h mesuré du
 *  sommet). Le rayon de la section est l'abscisse du point de coupe. */
function rayonCone(R, H, h) {
  const S = [0, 0, H];
  const P = [R, 0, 0];
  const z = H - h;
  const t = (S[2] - z) / (S[2] - P[2]);
  return S[0] + t * (P[0] - S[0]);
}

/** Un nombre écrit comme dans la feuille : 1\,566{,}61. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

/* ── La lecture des dessins ─────────────────────────────────────────────── */

const num = (t) => Number(t);
const rectanglesDe = (bloc) => [...bloc.matchAll(/\{ l: ([\d.]+), h: ([\d.]+)/g)].map((m) => ({ l: num(m[1]), h: num(m[2]) }));
const cerclesDe = (bloc) => [...bloc.matchAll(/cercleCoupe\(([\d.]+), ([\d.]+)/g)].map((m) => ({ R: num(m[1]), d: num(m[2]) }));
const profilsDe = (bloc) => [...bloc.matchAll(/profil\(([\d.]+), ([\d.]+), ([\d.]+)/g)].map((m) => ({ base: num(m[1]), H: num(m[2]), h: num(m[3]) }));
const trianglesDe = (bloc) =>
  [...bloc.matchAll(/A: \[([\d.]+), ([\d.]+)\], B: \[([\d.]+), ([\d.]+)\], C: \[([\d.]+), ([\d.]+)\]/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1).map(Number);
    return { AB: Math.hypot(bx - ax, by - ay), BC: Math.hypot(cx - bx, cy - by), CA: Math.hypot(ax - cx, ay - cy), droitEnB: proche((ax - bx) * (cx - bx) + (ay - by) * (cy - by), 0, 1e-6) };
  });
const coupesDe = (bloc) => [...bloc.matchAll(/coupe\("([a-z_]+)", "([a-z_]+)", "([^"]*)"\)/g)].map((m) => ({ solide: m[1], section: m[2], legende: m[3] }));

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** Le schéma de l'exercice k montre-t-il ce solide coupé ainsi ? */
  const montre = (k, solide, sect) => v.ok(`${k}. le schéma montre ${solide} coupé « ${sect} »`, coupesDe(b(k)).some((x) => x.solide === solide && x.section === sect));
  /** Les rectangles dessinés de l'exercice k, dans l'ordre. */
  const rects = (k, attendus, quoi) => {
    const lus = rectanglesDe(b(k));
    v.ok(`${k}. rectangles dessinés : ${quoi}`, lus.length === attendus.length && lus.every((r, i) => proche(r.l, attendus[i][0], 0.006) && proche(r.h, attendus[i][1], 0.006)), `lu ${JSON.stringify(lus)}`);
  };
  /** Le triangle OHM (ou ABC) dessiné : rectangle en B, côtés d, r, R. */
  const tri = (k, AB, BC, CA, tol = 0.006) => {
    const t = trianglesDe(b(k))[0];
    v.ok(`${k}. triangle dessiné rectangle en B, côtés ${+AB.toFixed(2)} ; ${+BC.toFixed(2)} ; ${+CA.toFixed(2)}`, !!t && t.droitEnB && proche(t.AB, AB, tol) && proche(t.BC, BC, tol) && proche(t.CA, CA, tol * 2), t ? JSON.stringify(t) : "pas de triangle");
  };

  /* ── Les dessins d'ÉNONCÉ ne donnent pas la réponse ──────────────────── */
  v.titre("Les dessins");
  v.ok("le canvas de coupe éteint le nom de la section", /showSectionName: false/.test(source) && !/showSectionName: true/.test(source));
  const enonceFigures = blocs.map((bl, i) => [i + 1, bl.split("correction:")[0]]).filter(([, avant]) => avant.includes("figure:"));
  const bavardes = enonceFigures.filter(([, avant]) => coupesDe(avant).some((x) => /carré|rectangle|disque|triangle|réduction/.test(x.legende)));
  v.ok(`${enonceFigures.length} figures d'énoncé, aucune légende ne nomme la section`, enonceFigures.length >= 2 && bavardes.length === 0, bavardes.map(([k]) => k).join(", "));
  const dessinees = blocs.filter((bl) => /schema:/.test(bl.split("micros:")[0])).length;
  v.ok(`${dessinees} corrigés dessinés sur 20`, dessinees >= 16);

  v.titre("★ Un seul geste");
  // 1. Le cylindre coupé parallèlement à la base : tous les points de la coupe
  // sont à la même distance de l'axe.
  const R1 = 2;
  const pts1 = [...Array(12).keys()].map((i) => [R1 * Math.cos(i), R1 * Math.sin(i), 3]);
  v.ok("1. coupe parallèle à la base : tous les points à la distance R de l'axe (un disque)", pts1.every((p) => proche(Math.hypot(p[0], p[1]), R1)));
  dit(1, "La section est un disque, de même rayon");
  montre(1, "cylindre", "parallele_base");

  // 2. Rubik's Cube : coupe à mi-hauteur.
  const s2 = nature(section(pave(5.7, 5.7, 5.7), [0, 0, 1], 2));
  v.ok(`2. section trouvée : ${s2.nom} de ${s2.dims}`, s2.nom === "carré" && proche(s2.dims[0], 5.7));
  dit(2, "la section est un CARRÉ");
  dit(2, `$4 \\times 5{,}7 = ${fr(s2.cotes.reduce((a, x) => a + x, 0), 1)}$ cm`);
  rects(2, [[5.7, 5.7]], "un carré de 5,7");

  // 3. Le pavé 8 × 5 × 3, coupé parallèlement à trois faces.
  const P3 = pave(8, 5, 3);
  const d3 = [nature(section(P3, [0, 0, 1], 1.2)), nature(section(P3, [1, 0, 0], 4)), nature(section(P3, [0, 1, 0], 2))].map((s) => s.dims);
  v.ok(`3. sections trouvées : ${d3.map((d) => d.join(" × ")).join(" ; ")}`, JSON.stringify(d3) === "[[8,5],[5,3],[8,3]]");
  d3.forEach(([L, l]) => dit(3, `un rectangle de $${L}$ cm sur $${l}$ cm`));
  dit(3, `Réponse : $${d3[0][0]}$ cm sur $${d3[0][1]}$ cm ; $${d3[1][0]}$ cm sur $${d3[1][1]}$ cm ; $${d3[2][0]}$ cm sur $${d3[2][1]}$ cm.`);
  rects(3, d3, "8 × 5, 5 × 3, 8 × 3");

  // 4. La meule : plan contenant l'axe (y = 0), largeur = 2 × demi-corde.
  const larg4 = 2 * rayonParDichotomie(35, 0);
  v.ok(`4. largeur de la coupe axiale : ${+larg4.toFixed(6)} cm`, proche(larg4, 70));
  dit(4, "$70 \\div 2 = 35$ cm");
  dit(4, `b) un rectangle de $${Math.round(larg4)}$ cm sur $10$ cm.`);
  montre(4, "cylindre", "parallele_axe");
  rects(4, [[larg4, 10]], "70 × 10");

  // 5. La boîte de conserve.
  const larg5 = 2 * rayonParDichotomie(4, 0);
  v.ok("5. coupe axiale : 8 cm de large, pas 4", proche(larg5, 8));
  ["a) FAUX.", "b) VRAI.", "c) FAUX."].forEach((p) => dit(5, p));
  dit(5, `$2 \\times 4 = ${Math.round(larg5)}$ cm`);
  dit(5, `un rectangle de $${Math.round(larg5)}$ cm sur $11$ cm`);
  rects(5, [[larg5, 11]], "8 × 11");

  // 6. La pyramide de base 6, hauteur 10, coupée à z = 5.
  const s6 = nature(section(pyramide(6, 10), [0, 0, 1], 5));
  v.ok(`6. section trouvée en coupant les arêtes : ${s6.nom} de ${s6.dims}`, s6.nom === "carré" && proche(s6.dims[0], 3));
  dit(6, "$k = 5 \\div 10 = 0{,}5$");
  dit(6, `$6 \\times 0{,}5 = ${fr(s6.dims[0])}$ cm`);
  rects(6, [[6, 6], [s6.dims[0], s6.dims[0]]], "la base 6 et la section 3");

  // 7. Le cône : rayon 5, hauteur 12, coupé à 3 cm du sommet.
  const r7 = rayonCone(5, 12, 3);
  v.ok(`7. rayon lu sur la génératrice : ${r7}`, proche(r7, 1.25));
  dit(7, "$k = 3 \\div 12 = 0{,}25$");
  dit(7, `$5 \\times 0{,}25 = ${fr(r7)}$ cm`);
  const p7 = profilsDe(b(7))[0];
  v.ok("7. profil dessiné : base = diamètre 10, hauteur 12, coupe à 3 du sommet", !!p7 && p7.base === 10 && p7.H === 12 && p7.h === 3);

  // 8. L'orange.
  const r8 = rayonParDichotomie(4, 2.4);
  v.ok(`8. rayon de la section, par dichotomie : ${+r8.toFixed(6)}`, proche(r8, 3.2));
  dit(8, "$HM^2 = OM^2 - OH^2 = 4^2 - 2{,}4^2 = 16 - 5{,}76 = 10{,}24$");
  dit(8, `$HM = \\sqrt{10{,}24} = ${fr(+r8.toFixed(6))}$ cm`);
  v.ok("8. cercle coupé : R = 4, d = 2,4", JSON.stringify(cerclesDe(b(8))) === '[{"R":4,"d":2.4}]');
  tri(8, 2.4, r8, 4);

  v.titre("★★ Type devoir");
  // 9. Cube d'arête 4, plan contenant [AE] et [CG] : x − y = 0.
  const s9 = nature(section(pave(4, 4, 4), [1, -1, 0], 0));
  v.ok(`9. section trouvée : ${s9.nom} de ${s9.dims.map((x) => x.toFixed(4)).join(" × ")}`, s9.nom === "rectangle" && proche(s9.dims[0], Math.hypot(4, 4)) && proche(s9.dims[1], 4));
  dit(9, "c'est un RECTANGLE");
  dit(9, `$AC = \\sqrt{32} \\approx ${fr(s9.dims[0], 2)}$ cm`);
  dit(9, `$4 \\times \\sqrt{32} \\approx ${fr(s9.dims[0] * s9.dims[1], 2)}$ cm²`);
  tri(9, 4, 4, s9.dims[0]);
  rects(9, [[s9.dims[0], 4]], "≈ 5,66 × 4");
  montre(9, "cube", "diagonale");

  // 10. La boîte à chaussures, coupée par x = 10.
  const s10 = nature(section(pave(33, 20, 12), [1, 0, 0], 10));
  const diag10 = Math.hypot(...s10.dims);
  v.ok(`10. section trouvée : ${s10.nom} ${s10.dims.join(" × ")}, diagonale ${diag10.toFixed(4)}`, s10.nom === "rectangle" && s10.dims.join() === "20,12");
  dit(10, "$d^2 = 20^2 + 12^2 = 400 + 144 = 544$");
  dit(10, `$d = \\sqrt{544} \\approx ${fr(diag10, 2)}$ cm`);
  dit(10, `$20 \\times 12 = ${s10.dims[0] * s10.dims[1]}$ cm²`);
  rects(10, [[20, 12]], "20 × 12");
  v.ok("10. la diagonale dessinée porte la bonne valeur", b(10).includes(`diag: "≈ ${fr(diag10, 2).replace("{,}", ",")} cm"`));

  // 11. Le tronc : corde à 15 cm du centre d'un disque de rayon 25.
  const hm11 = rayonParDichotomie(25, 15);
  v.ok(`11. demi-largeur par dichotomie : ${+hm11.toFixed(6)}`, proche(hm11, 20));
  dit(11, "$HM^2 = OM^2 - OH^2 = 625 - 225 = 400$");
  dit(11, `$2 \\times 20 = ${Math.round(2 * hm11)}$ cm`);
  v.ok("11. cercle coupé : R = 25, d = 15", JSON.stringify(cerclesDe(b(11))) === '[{"R":25,"d":15}]');
  tri(11, 15, hm11, 25);

  // 12. La boule de rayon 13 et quatre plans.
  const r12 = [5, 0, 13, 15].map((d) => rayonParDichotomie(13, d));
  v.ok(`12. rayons : ${r12.map((r) => (r === null ? "rien" : +r.toFixed(6))).join(" ; ")}`, proche(r12[0], 12) && proche(r12[1], 13) && proche(r12[2], 0) && r12[3] === null);
  dit(12, "$r^2 = 13^2 - 5^2 = 169 - 25 = 144$, donc $r = 12$ cm");
  dit(12, "donc $r = 13$ cm");
  dit(12, "$r^2 = 169 - 169 = 0$");
  dit(12, "Il n'y a pas de section");
  tri(12, 5, r12[0], 13);

  // 13. Le cornet : rayon 3, hauteur 12, glace jusqu'à 8 cm de la pointe.
  const r13 = rayonCone(3, 12, 8);
  v.ok(`13. rayon lu sur la génératrice : ${+r13.toFixed(6)}`, proche(r13, 2));
  dit(13, `$3 \\times \\dfrac{2}{3} = ${fr(+r13.toFixed(6))}$ cm`);
  dit(13, `$\\pi \\times 2^2 = 4\\pi \\approx ${fr(Math.PI * r13 * r13, 2)}$ cm²`);
  const p13 = profilsDe(b(13))[0];
  v.ok("13. profil dessiné : diamètre 6, hauteur 12, coupe à 8 de la pointe", !!p13 && p13.base === 6 && p13.H === 12 && p13.h === 8);

  // 14. La pyramide de base 9, hauteur 12, coupée à 8 cm AU-DESSUS de la base.
  const s14 = nature(section(pyramide(9, 12), [0, 0, 1], 8));
  v.ok(`14. section trouvée : ${s14.nom} de ${+s14.dims[0].toFixed(6)}`, s14.nom === "carré" && proche(s14.dims[0], 3));
  dit(14, "$12 - 8 = 4$ cm du sommet");
  dit(14, `$9 \\times \\dfrac{1}{3} = ${fr(+s14.dims[0].toFixed(6))}$ cm`);
  dit(14, `$81 \\div 9 = ${81 / Math.round(s14.dims[0]) ** 2}$`);
  const p14 = profilsDe(b(14))[0];
  v.ok("14. profil dessiné : base 9, hauteur 12, coupe à 4 du sommet (pas 8)", !!p14 && p14.base === 9 && p14.H === 12 && p14.h === 4);
  rects(14, [[9, 9], [3, 3]], "base 9, section 3");

  // 15. Les natures, retrouvées une à une.
  const n15 = [
    rayonParDichotomie(5, 2) !== null ? "disque" : "?",
    nature(section(pave(3, 3, 3), [0, 1, 0], 1)).nom,
    nature(section(pave(6, 6, 9), [1, -1, 0], 0)).nom === "rectangle" ? "rectangle" : "?",
    // cône : le plan par l'axe coupe le cône selon le sommet et deux points diamétralement opposés
    nature([[0, 0, 7], [-4, 0, 0], [4, 0, 0]]).nom,
    nature(section(pyramideTriangle(6), [0, 0, 1], 2)).nom,
    "disque",
  ];
  v.ok(`15. natures recalculées : ${n15.join(" ; ")}`, n15.join(" ; ") === "disque ; carré ; rectangle ; triangle isocèle ; triangle ; disque");
  dit(15, `Réponse : ${n15.join(" ; ")}.`);
  montre(15, "cone", "verticale");

  // 16. Le cylindre de rayon 3.
  const larg16 = 2 * rayonParDichotomie(3, 0);
  v.ok("16. coupe axiale : 6 de large, donc un carré pour une hauteur de 6", proche(larg16, 6));
  dit(16, "il faut une hauteur de $6$ cm");
  dit(16, `$d = \\sqrt{72} \\approx ${fr(Math.hypot(6, 6), 2)}$ cm`);
  const maxLarg16 = Math.max(...[...Array(300).keys()].map((i) => 2 * rayonParDichotomie(3, i / 100)));
  v.ok(`16. largeur maximale d'une coupe parallèle à l'axe : ${+maxLarg16.toFixed(6)} < 10`, maxLarg16 < 10 && proche(maxLarg16, 6));
  tri(16, 6, 6, Math.hypot(6, 6));

  v.titre("★★★ Problèmes");
  // 17. La pyramide du Louvre, coupée à 10,8 m du sol.
  const L17 = pyramide(35.4, 21.6);
  const s17 = nature(section(L17, [0, 0, 1], 10.8));
  const cote17 = s17.dims[0];
  v.ok(`17. section trouvée : ${s17.nom} de ${+cote17.toFixed(6)} m`, s17.nom === "carré" && proche(cote17, 17.7));
  dit(17, "$k = 10{,}8 \\div 21{,}6 = 0{,}5$");
  dit(17, `$35{,}4 \\times 0{,}5 = ${fr(+cote17.toFixed(6))}$ m`);
  dit(17, `$d^2 = 17{,}7^2 + 17{,}7^2 = ${fr(+(2 * cote17 * cote17).toFixed(6))}$`);
  dit(17, `\\approx ${fr(Math.hypot(cote17, cote17), 2)}$ m`);
  // d) la hauteur du sol où le côté vaut 8,85 : par dichotomie sur z.
  let [za, zb] = [0, 21.6];
  for (let i = 0; i < 100; i++) {
    const m = (za + zb) / 2;
    if (nature(section(L17, [0, 0, 1], m)).dims[0] > 8.85) za = m;
    else zb = m;
  }
  v.ok(`17. côté 8,85 m à ${za.toFixed(4)} m du sol`, proche(za, 16.2, 1e-6));
  dit(17, `$21{,}6 - 5{,}4 = ${fr(+za.toFixed(6))}$ m du sol`);
  const p17 = profilsDe(b(17))[0];
  v.ok("17. profil dessiné : 35,4 ; 21,6 ; coupe à 10,8 du sommet", !!p17 && p17.base === 35.4 && p17.H === 21.6 && p17.h === 10.8);
  rects(17, [[35.4, 35.4], [cote17, cote17]], "35,4 et 17,7");

  // 18. La Terre.
  const r18 = rayonParDichotomie(6371, 4797);
  v.ok(`18. rayon du parallèle, par dichotomie : ${r18.toFixed(3)} km`, Math.round(r18) === 4193);
  dit(18, `$r^2 = 6\\,371^2 - 4\\,797^2 = ${fr(6371 ** 2)} - ${fr(4797 ** 2)} = ${fr(6371 ** 2 - 4797 ** 2)}$`);
  dit(18, `\\approx ${fr(Math.round(r18))}$ km`);
  dit(18, `$2 \\times \\pi \\times ${fr(+r18.toFixed(2), 2)} \\approx ${fr(Math.round(2 * Math.PI * r18))}$ km`);
  dit(18, `$2 \\times \\pi \\times 6\\,371 \\approx ${fr(Math.round(2 * Math.PI * 6371))}$ km`);
  v.ok("18. cercle coupé : R = 6371, d = 4797", JSON.stringify(cerclesDe(b(18))) === '[{"R":6371,"d":4797}]');
  tri(18, 4797, r18, 6371, 0.01);
  // Le plan le plus proche du centre donne le plus grand rayon.
  const rs18 = [0, 1000, 3000, 4797, 6000].map((d) => rayonParDichotomie(6371, d));
  v.ok("18. le rayon décroît quand le plan s'éloigne du centre", rs18.every((r, i) => i === 0 || r < rs18[i - 1]));

  // 19. La pastèque : R = 15, disque de rayon 12 voulu → d par dichotomie.
  let [da, db] = [0, 15];
  for (let i = 0; i < 200; i++) {
    const m = (da + db) / 2;
    if (rayonParDichotomie(15, m) > 12) da = m;
    else db = m;
  }
  v.ok(`19. distance au centre : ${da.toFixed(6)} cm`, proche(da, 9));
  dit(19, "$d^2 = R^2 - r^2 = 225 - 144 = 81$, donc $d = 9$ cm");
  const r19 = rayonParDichotomie(15, 12);
  v.ok(`19. à 12 cm du centre : rayon ${+r19.toFixed(6)}, diamètre ${+(2 * r19).toFixed(6)}`, proche(r19, 9));
  dit(19, `$r = ${fr(+r19.toFixed(6))}$ cm. Le diamètre de la face vaut $${fr(+(2 * r19).toFixed(6))}$ cm`);
  v.ok("19. deux coupes : ±9 donnent le même disque", proche(rayonParDichotomie(15, Math.abs(-da)), 12, 1e-6));
  tri(19, 9, 12, 15);

  // 20. Le conteneur : plan vertical par [AE] et [CG].
  const C20 = pave(5.9, 2.35, 2.39);
  const s20 = nature(section(C20, [2.35, -5.9, 0], 0));
  const plancher = s20.dims[0];
  const diag20 = Math.hypot(plancher, 2.39);
  v.ok(`20. section trouvée : ${s20.nom} ${plancher.toFixed(4)} × ${s20.dims[1]}`, s20.nom === "rectangle" && proche(s20.dims[1], 2.39));
  dit(20, `$\\sqrt{40{,}332\\,5} \\approx ${fr(plancher, 2)}$ m`);
  dit(20, `$\\sqrt{46{,}044\\,6} \\approx ${fr(diag20, 2)}$ m`);
  v.ok(`20. ${fr(plancher, 2)} < 6,5 < ${fr(diag20, 2)} : pas à plat, oui en biais`, plancher < 6.5 && 6.5 < diag20);
  dit(20, "C'est moins que $6{,}5$ m : la perche ne tient pas à plat");
  dit(20, "la perche tient en biais");
  montre(20, "pave_droit", "diagonale");
  tri(20, +plancher.toFixed(2), 2.39, diag20, 0.006);
}

lancer({
  nom: "LES SECTIONS PLANES DE SOLIDES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-sections-solides.tsx",
  notionId: "sections_solides",
  classe: "3e",
  verifier,
  casses: [
    ["le canvas écrit la réponse", "showSectionName: false, showCallouts", "showSectionName: true, showCallouts"],
    ["ex. 9 : la légende de l'énoncé nomme la section", "\"le plan contient les arêtes [AE] et [CG]\"", "\"la section est un rectangle\""],
    ["ex. 2 : le périmètre faux", "$4 \\\\times 5{,}7 = 22{,}8$ cm", "$4 \\\\times 5{,}7 = 32{,}49$ cm"],
    ["ex. 3 : deux dimensions échangées", "un rectangle de $5$ cm sur $3$ cm", "un rectangle de $8$ cm sur $3$ cm"],
    ["ex. 4 : la meule coupée donne un disque", "b) un rectangle de $70$ cm sur $10$ cm.", "b) un disque de rayon $35$ cm."],
    ["ex. 5 : le rayon pris pour la largeur", "{ l: 8, h: 11, bas", "{ l: 4, h: 11, bas"],
    ["ex. 6 : la section de pyramide pas réduite", "{ l: 3, h: 3, bas: \"la section : 3 cm\" }", "{ l: 6, h: 6, bas: \"la section : 3 cm\" }"],
    ["ex. 7 : k compté depuis la base", "$5 \\\\times 0{,}25 = 1{,}25$ cm", "$5 \\\\times 0{,}75 = 3{,}75$ cm"],
    ["ex. 8 : la section a le rayon de la boule", "$HM = \\\\sqrt{10{,}24} = 3{,}2$ cm", "$HM = \\\\sqrt{10{,}24} = 4$ cm"],
    ["ex. 8 : le triangle OHM faux", "C: [3.2, 2.4]", "C: [4, 2.4]"],
    ["ex. 9 : l'aire arrondie fausse", "\\\\approx 22{,}63$ cm²", "\\\\approx 16$ cm²"],
    ["ex. 10 : la diagonale additionnée", "$d = \\\\sqrt{544} \\\\approx 23{,}32$ cm", "$d = 20 + 12 = 32$ cm"],
    ["ex. 11 : la largeur = le diamètre", "$2 \\\\times 20 = 40$ cm", "$2 \\\\times 25 = 50$ cm"],
    ["ex. 11 : le cercle coupé ailleurs", "cercleCoupe(25, 15,", "cercleCoupe(25, 20,"],
    ["ex. 12 : une section derrière la boule", "Il n'y a pas de section", "La section est un point"],
    ["ex. 13 : l'aire du disque fausse", "4\\\\pi \\\\approx 12{,}57$", "4\\\\pi \\\\approx 12{,}56$"],
    ["ex. 14 : k = 8 ÷ 12", "profil(9, 12, 4,", "profil(9, 12, 8,"],
    ["ex. 15 : le cylindre axial donne un disque", "Réponse : disque ; carré ; rectangle ;", "Réponse : disque ; carré ; disque ;"],
    ["ex. 16 : la diagonale du carré", "$d = \\\\sqrt{72} \\\\approx 8{,}49$ cm", "$d = \\\\sqrt{72} \\\\approx 12$ cm"],
    ["ex. 17 : la hauteur comptée depuis le sommet", "$21{,}6 - 5{,}4 = 16{,}2$ m du sol", "$21{,}6 - 16{,}2 = 5{,}4$ m du sol"],
    ["ex. 18 : le parallèle avec le rayon de la Terre", "\\\\approx 26\\\\,343$ km", "\\\\approx 40\\\\,030$ km."],
    ["ex. 18 : le triangle OHM faux", "C: [4192.66, 4797]", "C: [6371, 4797]"],
    ["ex. 19 : Pythagore avec les diamètres", "$d^2 = R^2 - r^2 = 225 - 144 = 81$, donc $d = 9$ cm", "$d^2 = R^2 - r^2 = 900 - 576 = 324$, donc $d = 18$ cm"],
    ["ex. 20 : la diagonale du plancher", "$\\\\sqrt{40{,}332\\\\,5} \\\\approx 6{,}35$ m", "$\\\\sqrt{40{,}332\\\\,5} \\\\approx 6{,}53$ m"],
    ["une micro d'une autre notion", "micros: [\"section_cone_pyramide\"],\n        },\n        {\n          enonce:\n            \"Un cône", "micros: [\"volume_section\"],\n        },\n        {\n          enonce:\n            \"Un cône"],
    ["un $ dans une consigne", "consigne: \"Des solides réels.", "consigne: \"Des solides réels $R$."],
  ],
});
