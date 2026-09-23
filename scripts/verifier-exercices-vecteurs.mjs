// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les vecteurs du
// plan » de seconde (lib/fiches-exercices/maths-seconde-vecteurs.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque vecteur est recalculé ici depuis les POINTS de
// l'énoncé (arrivée moins départ), puis on exige que le corrigé ÉCRIVE le bon
// résultat ; chaque flèche dessinée (`de`, `vers`) et chaque point étiqueté
// sont RELUS dans le source et comparés au modèle ; les déterminants et les
// normes sont refaits en entiers ; les chaînes « a = b = c » sont évaluées.
//
//   node scripts/verifier-exercices-vecteurs.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const vec = (P, Q) => [Q[0] - P[0], Q[1] - P[1]];
const add = (...us) => us.reduce((s, u) => [s[0] + u[0], s[1] + u[1]], [0, 0]);
const mul = (k, u) => [k * u[0], k * u[1]];
const det = (u, v) => u[0] * v[1] - u[1] * v[0];
const n2 = (u) => u[0] ** 2 + u[1] ** 2;
const coord = ([x, y]) => `(${String(x).replace("-", "-")}\\,;\\,${y})`;

/** Les flèches et les points étiquetés d'un bloc d'exercice, relus dans le source. */
function dessins(bloc) {
  const fleches = [...bloc.matchAll(/\{ de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => m.slice(1, 5).map(Number));
  const points = [...bloc.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "([A-Z])" \}/g)].map((m) => [m[3], Number(m[1]), Number(m[2])]);
  const fenetres = [...bloc.matchAll(/vecteurs\(\s*\[(-?\d+), (-?\d+)\]/g)].map((m) => [Number(m[1]), Number(m[2])]);
  return { fleches, points, fenetres };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte, quoi = texte) => v.ok(`${k}. le corrigé écrit ${quoi}`, c(k).includes(texte), texte);
  /** Le vecteur calculé ICI, écrit tel quel dans le corrigé. */
  const vecteurEcrit = (k, nom, u) => ecrit(k, `${nom}\\,${coord(u)}`, `${nom.replace(/\\vec\{([^}]+)\}/g, "$1")} ${u.join(" ; ")}`);
  const deter = (k, u, w, texte) => {
    const [a, b] = texte.split(" = ")[0].split(" - ");
    const lu = eval(`${a.replace(/\\times/g, "*")} - (${b.replace(/\\times/g, "*")})`);
    v.ok(`${k}. déterminant de (${u}) et (${w}) = ${det(u, w)}`, lu === det(u, w) && c(k).includes(texte), texte);
    egalites(k, texte);
  };
  /** Chaque flèche du bloc joint deux points du modèle (ou deux positions prévues), et chaque point est à sa place. */
  const dessinJuste = (k, P, attendues) => {
    const { fleches, points, fenetres } = dessins(f.blocs[k - 1]);
    const cle = (a) => a.join(",");
    const vues = new Set(fleches.map(cle));
    const prevues = attendues.map(([de, vers]) => [...(typeof de === "string" ? P[de] : de), ...(typeof vers === "string" ? P[vers] : vers)]);
    const manque = prevues.filter((a) => !vues.has(cle(a)));
    const enTrop = fleches.filter((a) => !prevues.some((p) => cle(p) === cle(a)));
    v.ok(`${k}. les ${fleches.length} flèches dessinées sont celles du modèle`, fleches.length > 0 && manque.length === 0 && enTrop.length === 0, `manque ${JSON.stringify(manque)} ; en trop ${JSON.stringify(enTrop)}`);
    const mal = points.filter(([l, x, y]) => !P[l] || P[l][0] !== x || P[l][1] !== y);
    v.ok(`${k}. les ${points.length} points étiquetés sont à leur place`, mal.length === 0, JSON.stringify(mal));
    // ⛔ Un point sur le bord : son étiquette sort du cadre (fiche de cours, 09/09).
    const bord = fenetres.flatMap(([mn, mx]) => points.filter(([, x, y]) => [x, y].some((t) => t <= mn || t >= mx)));
    v.ok(`${k}. aucun point sur le bord du cadre`, bord.length === 0 && fenetres.every(([mn]) => mn < 0), JSON.stringify(bord));
  };

  v.titre("★ Un seul geste");
  // 1. Quatre vecteurs relevés sur la figure.
  const P1 = { A: [-4, 2], B: [-2, 3], C: [1, 1], D: [3, 2], E: [-2, -2], F: [-4, -3], G: [-2, -4], H: [2, -2] };
  const AB1 = vec(P1.A, P1.B);
  v.ok("1. CD = AB, EF = −AB, GH = 2AB", String(vec(P1.C, P1.D)) === String(AB1) && String(vec(P1.E, P1.F)) === String(mul(-1, AB1)) && String(vec(P1.G, P1.H)) === String(mul(2, AB1)));
  for (const t of ["$\\vec{CD} = \\vec{AB}$", "$\\vec{EF} = -\\vec{AB}$", "$\\vec{GH} = 2\\vec{AB}$", "soit $(2\\,;\\,1)$", "soit $(-2\\,;\\,-1)$", "soit $(4\\,;\\,2)$"]) ecrit(1, t);
  dessinJuste(1, P1, [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"]]);

  const A2 = [-1, 2], B2 = [5, -6];
  vecteurEcrit(2, "soit $\\vec{AB}", vec(A2, B2));
  vecteurEcrit(2, "$\\vec{BA}", vec(B2, A2));
  v.ok("2. ‖AB‖ = 10", n2(vec(A2, B2)) === 100);
  egalites(2, "\\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10");

  for (const t of ["\\vec{RS} + \\vec{ST} = \\vec{RT}", "\\vec{AB} + \\vec{BL} = \\vec{AL}", "\\vec{DE} + \\vec{ED} = \\vec{DD} = \\vec{0}", "\\vec{WU} + \\vec{UV} = \\vec{WV}$"]) ecrit(3, t);

  const u4 = [4, -2], v4 = [-1, 5];
  vecteurEcrit(4, "$3\\vec{u}", mul(3, u4));
  vecteurEcrit(4, "$-\\vec{u}", mul(-1, u4));
  vecteurEcrit(4, "$\\dfrac{1}{2}\\vec{u}", mul(0.5, u4));
  ecrit(4, `soit $${coord(add(u4, v4))}$`, "u + v = (3 ; 3)");
  ecrit(4, `soit $${coord(add(u4, mul(-1, v4)))}$`, "u − v = (5 ; −7)");

  const P5 = { A: [1, 2], B: [4, 3], C: [6, 6] };
  P5.D = add(P5.C, mul(-1, vec(P5.A, P5.B)));
  v.ok("5. D = C − AB = (3 ; 5), et AD = BC", String(P5.D) === "3,5" && String(vec(P5.A, P5.D)) === String(vec(P5.B, P5.C)));
  ecrit(5, "Ainsi $D(3\\,;\\,5)$");
  const faux5 = add(P5.C, vec(P5.A, P5.B));
  ecrit(5, `$D(${faux5[0]}\\,;\\,${faux5[1]})$`, "le D du piège (AB = CD)");
  dessinJuste(5, P5, [["A", "B"], ["D", "C"]]);

  const P6 = { A: [3, 2], B: [5, 3] };
  const AB6 = vec(P6.A, P6.B);
  P6.M = add(P6.A, mul(2, AB6));
  P6.N = add(P6.A, mul(-1, AB6));
  const P6p = add(P6.B, AB6);
  v.ok("6. M = (7 ; 4), N = (1 ; 1), P = M", String(P6.M) === "7,4" && String(P6.N) === "1,1" && String(P6p) === String(P6.M));
  ecrit(6, "$M$ est en $(7\\,;\\,4)$");
  ecrit(6, "$N$ est en $(1\\,;\\,1)$");
  ecrit(6, "$P = M$");
  dessinJuste(6, P6, [["A", "B"], ["A", "B"], ["B", "M"], ["A", "N"]]);

  deter(7, [2, -3], [-6, 9], "2 \\times 9 - (-3) \\times (-6) = 18 - 18 = 0");
  deter(7, [2, -3], [4, -5], "2 \\times (-5) - (-3) \\times 4 = -10 + 12 = 2");
  v.ok("7. v = −3u", String(mul(-3, [2, -3])) === "-6,9" && c(7).includes("$\\vec{v} = -3\\vec{u}$"));

  const u8 = [-5, 12];
  v.ok("8. ‖u‖ = 13, ‖3u‖ = 39, ‖−2u‖ = 26", n2(u8) === 169 && n2(mul(3, u8)) === 1521 && n2(mul(-2, u8)) === 26 ** 2);
  egalites(8, "\\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13");
  egalites(8, "\\sqrt{225 + 1\\,296} = \\sqrt{1\\,521} = 39");
  vecteurEcrit(8, "$3\\vec{u}", mul(3, u8));
  ecrit(8, "= 2 \\times 13 = 26$");

  v.titre("★★ Type devoir");
  // 9. Sans repère : on joue chaque simplification sur des points quelconques.
  const Q9 = { A: [2, 7], B: [-3, 1], C: [5, -4], D: [0, 9], M: [-6, 2], O: [4, 4] };
  const V = (s) => vec(Q9[s[0]], Q9[s[1]]);
  const memes = (x, y) => String(x) === String(y);
  v.ok("9a. AB − CB = AC", memes(add(V("AB"), mul(-1, V("CB"))), V("AC")) && c(9).includes("= \\vec{AC}$"));
  v.ok("9b. MA − MB = BA", memes(add(V("MA"), mul(-1, V("MB"))), V("BA")) && c(9).includes("= \\vec{BA}$.\\n"));
  v.ok("9c. AB + CD − CB = AD", memes(add(V("AB"), V("CD"), mul(-1, V("CB"))), V("AD")) && c(9).includes("= \\vec{AD}$"));
  v.ok("9d. OA − OB + AB = 0", memes(add(V("OA"), mul(-1, V("OB")), V("AB")), [0, 0]) && c(9).includes("= \\vec{0}$"));

  const P10 = { A: [-3, -2], B: [1, -1], C: [-2, 2] };
  P10.D = add(P10.A, vec(P10.A, P10.B), vec(P10.A, P10.C));
  v.ok("10. D = (2 ; 3) et BD = AC", String(P10.D) === "2,3" && memes(vec(P10.B, P10.D), vec(P10.A, P10.C)));
  ecrit(10, "soit $D(2\\,;\\,3)$");
  vecteurEcrit(10, "$\\vec{AD}", vec(P10.A, P10.D));
  vecteurEcrit(10, "$\\vec{BD}", vec(P10.B, P10.D));
  ecrit(10, "Donc $\\vec{BD} = \\vec{AC}$");
  dessinJuste(10, P10, [["A", "B"], ["A", "C"], ["A", "D"]]);

  const P11 = { A: [-2, 1], B: [1, 3], C: [7, 7], D: [4, 6] };
  deter(11, vec(P11.A, P11.B), vec(P11.A, P11.C), "3 \\times 6 - 2 \\times 9 = 18 - 18 = 0");
  deter(11, vec(P11.A, P11.B), vec(P11.A, P11.D), "3 \\times 5 - 2 \\times 6 = 15 - 12 = 3");
  vecteurEcrit(11, "$\\vec{AC}", vec(P11.A, P11.C));
  vecteurEcrit(11, "$\\vec{AD}", vec(P11.A, P11.D));

  const P12 = { E: [1, -2], F: [3, 2], G: [-1, 4], H: [2, 10] };
  deter(12, vec(P12.E, P12.F), vec(P12.G, P12.H), "2 \\times 6 - 4 \\times 3 = 12 - 12 = 0");
  deter(12, vec(P12.E, P12.F), vec(P12.E, P12.G), "2 \\times 6 - 4 \\times (-2) = 12 + 8 = 20");
  vecteurEcrit(12, "$\\vec{EG}", vec(P12.E, P12.G));

  const P13 = { A: [-3, -2], B: [1, 1], C: [4, -3], D: [0, -6] };
  v.ok("13. AB = DC, AB = AD = 5, AC = BD = √50", memes(vec(P13.A, P13.B), vec(P13.D, P13.C)) && n2(vec(P13.A, P13.B)) === 25 && n2(vec(P13.A, P13.D)) === 25 && n2(vec(P13.A, P13.C)) === 50 && n2(vec(P13.B, P13.D)) === 50);
  for (const [nom, de, a] of [["$\\vec{AD}", "A", "D"], ["$\\vec{AC}", "A", "C"], ["$\\vec{BD}", "B", "D"]]) vecteurEcrit(13, nom, vec(P13[de], P13[a]));
  egalites(13, "\\sqrt{4^2 + 3^2} = \\sqrt{25} = 5");
  egalites(13, "\\sqrt{49 + 1} = \\sqrt{50}");
  ecrit(13, "$ABCD$ est un CARRÉ");
  dessinJuste(13, P13, [["A", "B"], ["D", "C"]]);

  const A14 = [2, -1], B14 = [-1, 3];
  const M14 = add(A14, mul(3, vec(A14, B14)));
  const N14 = add(A14, mul(-1, vec(A14, B14)));
  v.ok("14. M = (−7 ; 11), N = (5 ; −5), A milieu de [NB], AM = 15", String(M14) === "-7,11" && String(N14) === "5,-5" && (N14[0] + B14[0]) / 2 === A14[0] && (N14[1] + B14[1]) / 2 === A14[1] && n2(vec(A14, M14)) === 225);
  ecrit(14, "soit $M(-7\\,;\\,11)$");
  ecrit(14, "soit $N(5\\,;\\,-5)$");
  ecrit(14, "$AM = 3 \\times 5 = 15$");

  const w15 = add(mul(2, [1, 2]), mul(-3, [3, -1]));
  v.ok("15. w = (−7 ; 7), ‖w‖² = 98, k = 3", String(w15) === "-7,7" && n2(w15) === 98 && det([1, 2], [3, 6]) === 0);
  vecteurEcrit(15, "soit $\\vec{w}", w15);
  egalites(15, "\\sqrt{49 + 49} = \\sqrt{98} = \\sqrt{49 \\times 2} = 7\\sqrt{2}");
  ecrit(15, "donc $k = 3$");

  const P16 = { A: [1, 5], B: [-2, -1], C: [6, 1] };
  const I16 = [(P16.B[0] + P16.C[0]) / 2, (P16.B[1] + P16.C[1]) / 2];
  const somme16 = add(vec(P16.A, P16.B), vec(P16.A, P16.C));
  v.ok("16. I = (2 ; 0), AB + AC = 2AI = (2 ; −10)", String(I16) === "2,0" && memes(somme16, mul(2, vec(P16.A, I16))) && String(somme16) === "2,-10");
  ecrit(16, "soit $I(2\\,;\\,0)$");
  ecrit(16, `leur somme est $${coord(somme16)}$`);
  vecteurEcrit(16, "$2\\vec{AI}", mul(2, vec(P16.A, I16)));

  v.titre("★★★ Problèmes");
  const u17 = [0, 4], v17 = [3, 0];
  v.ok("17. u + v = (3 ; 4), norme 5 ; w = (−3 ; 4) de norme 5 ; w + v vers le nord", String(add(u17, v17)) === "3,4" && n2(add(u17, v17)) === 25 && n2([-3, 4]) === 25 && add([-3, 4], v17)[0] === 0);
  ecrit(17, "soit $(3\\,;\\,4)$");
  ecrit(17, "Ainsi $\\vec{w}\\,(-3\\,;\\,4)$");
  egalites(17, "3 \\times \\dfrac{1}{4} = 0{,}75");
  ecrit(17, "soit $15$ minutes");
  dessinJuste(17, { O: [0, 0] }, [[[0, 0], [0, 4]], [[0, 4], [3, 4]], [[0, 0], [3, 4]]]);

  const pas18 = [[3, 1], [-1, 4], [2, -2]];
  const RP = add(...pas18);
  const marche = pas18.reduce((s, u) => s + Math.sqrt(n2(u)), 0);
  v.ok("18. RP = (4 ; 3), 5 km, 7,5 min, marche ≈ 10,1 km", String(RP) === "4,3" && n2(RP) === 25 && (5 / 40) * 60 === 7.5 && Math.abs(marche - 10.1) < 0.05);
  ecrit(18, "donc $\\vec{RP}\\,(4\\,;\\,3)$");
  egalites(18, "0{,}125 \\times 60 = 7{,}5");
  v.ok("18. les trois normes arrondies sont justes", [[10, "3{,}16"], [17, "4{,}12"], [8, "2{,}83"]].every(([n, t]) => Math.abs(Math.sqrt(n) - Number(t.replace("{,}", "."))) < 0.005 && c(18).includes(t)));
  // Les pas de la randonnée, bout à bout depuis le refuge.
  const etapes = pas18.reduce((l, u) => [...l, add(l[l.length - 1], u)], [[0, 0]]);
  dessinJuste(18, { R: [0, 0], P: RP }, [...etapes.slice(0, -1).map((p, i) => [p, etapes[i + 1]]), [[0, 0], RP]]);

  const F1 = [3, 4], F2 = [3, -4];
  v.ok("19. 500 N chacun, total (6 ; 0) = 600 N, frottement (−6 ; 0)", n2(F1) === 25 && n2(F2) === 25 && String(add(F1, F2)) === "6,0" && String(mul(-1, add(F1, F2))) === "-6,0");
  ecrit(19, "$\\vec{F_1} + \\vec{F_2}\\,(6\\,;\\,0)$");
  ecrit(19, "donc $\\vec{F}\\,(-6\\,;\\,0)$");
  ecrit(19, "coûte ici $400$ N");
  dessinJuste(19, { O: [0, 0] }, [[[0, 0], F1], [[0, 0], F2], [[0, 0], add(F1, F2)]]);

  const P20 = { A: [1, 1], B: [4, 3] };
  const AB20 = vec(P20.A, P20.B);
  const y20 = P20.A[1] + (AB20[1] * (10 - P20.A[0])) / AB20[0];
  P20.C = [10, y20];
  P20.M = add(P20.A, mul(2 / 3, vec(P20.A, P20.C)));
  v.ok("20. C = (10 ; 7), D(13 ; 8) hors rangée, (13 ; 9) dessus, M = (7 ; 5), AB ≈ 3,61", y20 === 7 && det(AB20, vec(P20.A, [13, 8])) === -3 && det(AB20, vec(P20.A, [13, 9])) === 0 && String(P20.M) === "7,5" && Math.abs(Math.sqrt(n2(AB20)) - 3.61) < 0.005);
  ecrit(20, "Ainsi $C(10\\,;\\,7)$");
  egalites(20, "3 \\times 7 - 2 \\times 12 = 21 - 24 = -3");
  ecrit(20, "soit $M(7\\,;\\,5)$");
  ecrit(20, "\\approx 3{,}61$ m");
  dessinJuste(20, P20, [["A", "B"], ["A", "C"]]);
}

lancer({
  nom: "LES VECTEURS DU PLAN · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-vecteurs.tsx",
  notionId: "vecteurs_plan",
  verifier,
  casses: [
    ["ex. 1 : une flèche de l'énoncé déplacée", "            [-5, 4],\n            [\n              { de: [-4, 2], vers: [-2, 3] },\n              { de: [1, 1], vers: [3, 2] },", "            [-5, 4],\n            [\n              { de: [-4, 2], vers: [-2, 3] },\n              { de: [1, 1], vers: [3, 3] },"],
    ["ex. 2 : départ moins arrivée", "soit $\\\\vec{AB}\\\\,(6\\\\,;\\\\,-8)$", "soit $\\\\vec{AB}\\\\,(-6\\\\,;\\\\,8)$"],
    ["ex. 4 : le moins d'un moins perdu", "soit $(5\\\\,;\\\\,-7)$", "soit $(3\\\\,;\\\\,-7)$"],
    ["ex. 5 : le point D faux", "Ainsi $D(3\\\\,;\\\\,5)$", "Ainsi $D(3\\\\,;\\\\,4)$"],
    ["ex. 6 : un point N mal placé sur le dessin", "{ x: 1, y: 1, label: \"N\" }", "{ x: 1, y: 2, label: \"N\" }"],
    ["ex. 7 : (−3) × (−6) compté négatif", "= 18 - 18 = 0$ : $\\\\vec{u}$", "= 18 + 18 = 36$ : $\\\\vec{u}$"],
    ["ex. 8 : la norme de 3u fausse", "\\\\sqrt{1\\\\,521} = 39", "\\\\sqrt{1\\\\,521} = 37"],
    ["ex. 9 : MA − MB = AB (le piège)", "= \\\\vec{BM} + \\\\vec{MA} = \\\\vec{BA}$", "= \\\\vec{BM} + \\\\vec{MA} = \\\\vec{AB}$"],
    ["ex. 10 : D faux", "soit $D(2\\\\,;\\\\,3)$", "soit $D(3\\\\,;\\\\,3)$"],
    ["ex. 11 : un déterminant faux", "= 15 - 12 = 3", "= 15 - 12 = 0"],
    ["ex. 13 : la flèche DC mal tracée", "{ de: [0, -6], vers: [4, -3], couleur: ORANGE }", "{ de: [0, -6], vers: [4, -2], couleur: ORANGE }"],
    ["ex. 14 : M calculé depuis B", "soit $M(-7\\\\,;\\\\,11)$", "soit $M(-10\\\\,;\\\\,15)$"],
    ["ex. 15 : 4 − (−3) = 1", "soit $\\\\vec{w}\\\\,(-7\\\\,;\\\\,7)$", "soit $\\\\vec{w}\\\\,(-7\\\\,;\\\\,1)$"],
    ["ex. 17 : la dérive fausse", "3 \\\\times \\\\dfrac{1}{4} = 0{,}75", "3 \\\\times \\\\dfrac{1}{4} = 0{,}5"],
    ["ex. 18 : une étape de la randonnée mal dessinée", "{ de: [3, 1], vers: [2, 5] },", "{ de: [3, 1], vers: [2, 4] },"],
    ["ex. 19 : la force totale fausse", "$\\\\vec{F_1} + \\\\vec{F_2}\\\\,(6\\\\,;\\\\,0)$", "$\\\\vec{F_1} + \\\\vec{F_2}\\\\,(6\\\\,;\\\\,8)$"],
    ["ex. 20 : l'ordonnée de C fausse", "Ainsi $C(10\\\\,;\\\\,7)$", "Ainsi $C(10\\\\,;\\\\,8)$"],
  ],
});
