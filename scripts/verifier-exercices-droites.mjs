// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les droites du
// plan » de seconde (lib/fiches-exercices/maths-seconde-droites.tsx).
//
// ⭐ L'AUTRE CHEMIN : les droites sont recalculées ICI depuis les points (ou le
// point et le vecteur) de l'énoncé, en fractions exactes ; les systèmes sont
// résolus par Cramer, pas par la méthode du corrigé. Puis chaque droite
// DESSINÉE (`{ a, b, c }`), chaque point et chaque flèche sont relus dans le
// source : la droite dessinée doit être proportionnelle à la droite calculée,
// et chaque point doit être sur les droites où le corrigé le place.
//
//   node scripts/verifier-exercices-droites.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

/** La droite par deux points, a x + b y + c = 0. */
const parDeux = ([x1, y1], [x2, y2]) => [y2 - y1, x1 - x2, x2 * y1 - x1 * y2];
/** La droite par un point et un vecteur directeur. */
const parVecteur = ([x, y], [u, v]) => [v, -u, u * y - v * x];
const memeDroite = (l, m) => Math.abs(l[0] * m[1] - l[1] * m[0]) < 1e-9 && Math.abs(l[0] * m[2] - l[2] * m[0]) < 1e-9 && Math.abs(l[1] * m[2] - l[2] * m[1]) < 1e-9;
const sur = ([x, y], [a, b, c]) => Math.abs(a * x + b * y + c) < 1e-9;
/** Cramer : l'intersection de deux droites, ou null si elles sont parallèles. */
const inter = ([a, b, c], [d, e, f]) => { const D = a * e - b * d; return Math.abs(D) < 1e-12 ? null : [(b * f - c * e) / D, (c * d - a * f) / D]; };
const proche = (P, Q) => Math.abs(P[0] - Q[0]) < 1e-9 && Math.abs(P[1] - Q[1]) < 1e-9;

function dessin(bloc) {
  const lignes = [...bloc.matchAll(/\{ a: (-?[\d.]+), b: (-?[\d.]+), c: (-?[\d.]+)/g)].map((m) => m.slice(1, 4).map(Number));
  const points = Object.fromEntries([...bloc.matchAll(/\{ x: ([-\d. /]+), y: ([-\d. /]+), label: "([A-Z])" \}/g)].map((m) => [m[3], [Function(`return ${m[1]}`)(), Function(`return ${m[2]}`)()]]));
  const fleches = [...bloc.matchAll(/\{ de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => m.slice(1, 5).map(Number));
  return { lignes, points, fleches };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** Les droites dessinées dans le bloc k sont EXACTEMENT celles du modèle (à un facteur près), dans l'ordre. */
  const dessinees = (k, attendues) => {
    const d = dessin(f.blocs[k - 1]).lignes;
    const n = attendues.length;
    const ok = d.length % n === 0 && d.length > 0 && d.every((l, i) => memeDroite(l, attendues[i % n]));
    v.ok(`${k}. ${d.length} droite(s) dessinée(s), celles du modèle`, ok, JSON.stringify(d));
  };
  /** Chaque point dessiné est au bon endroit. */
  const pointsJustes = (k, P) => {
    const d = dessin(f.blocs[k - 1]).points;
    const mal = Object.entries(d).filter(([l, Q]) => !P[l] || !proche(P[l], Q));
    v.ok(`${k}. les points dessinés ${Object.keys(d).join(", ")} sont à leur place`, Object.keys(d).length > 0 && mal.length === 0, JSON.stringify(mal));
  };

  v.titre("★ Un seul geste");
  const A1 = [1, 1], B1 = [3, 5], C1 = [0, 3], D1 = [4, 1];
  const d1 = parDeux(A1, B1), d2 = parDeux(C1, D1);
  v.ok("1. d1 : y = 2x − 1 et d2 : y = −0,5x + 3", memeDroite(d1, [2, -1, -1]) && memeDroite(d2, [-0.5, -1, 3]));
  ecrit(1, "Donc $d_1 : y = 2x - 1$");
  ecrit(1, "Donc $d_2 : y = -0{,}5x + 3$");
  dessinees(1, [d1, d2]);
  pointsJustes(1, { A: A1, B: B1, C: C1, D: D1 });

  const d_2 = parDeux([1, 4], [3, -2]);
  v.ok("2. (AB) : y = −3x + 7", memeDroite(d_2, [-3, -1, 7]));
  ecrit(2, "Ainsi $(AB) : y = -3x + 7$");
  egalites(2, "\\dfrac{-2 - 4}{3 - 1} = \\dfrac{-6}{2} = -3");
  dessinees(2, [d_2]);
  pointsJustes(2, { A: [1, 4], B: [3, -2] });

  const v3 = parDeux([2, -2], [2, 5]), h3 = parDeux([-3, 4], [5, 4]);
  v.ok("3. (AB) : x = 2 (b = 0) et (CD) : y = 4", memeDroite(v3, [1, 0, -2]) && v3[1] === 0 && memeDroite(h3, [0, 1, -4]));
  ecrit(3, "son équation est $x = 2$");
  ecrit(3, "son équation est $y = 4$");
  dessinees(3, [v3, h3]);
  pointsJustes(3, { A: [2, -2], B: [2, 5], C: [-3, 4], D: [5, 4] });

  const A4 = [-3, 3], B4 = [3, 0];
  v.ok("4. (1 ; 3) dirige y = 3x − 2 ; (5 ; 2) dirige 2x − 5y + 1 = 0 ; AB = (6 ; −3)", memeDroite(parVecteur([0, -2], [1, 3]), [3, -1, -2]) && 2 * 5 + -5 * 2 === 0 && memeDroite(parDeux(A4, B4), parVecteur(A4, [6, -3])));
  ecrit(4, "$\\vec{u}\\,(1\\,;\\,3)$");
  ecrit(4, "$\\vec{v}\\,(5\\,;\\,2)$");
  ecrit(4, "$\\vec{AB}\\,(6\\,;\\,-3)$");
  dessinees(4, [[3, -1, -2], parDeux(A4, B4)]);
  pointsJustes(4, { A: A4, B: B4 });
  const fl4 = dessin(f.blocs[3]).fleches.filter((x) => x.length);
  v.ok("4. les flèches dessinées dirigent leurs droites", fl4.some(([a, b, cc, d]) => a === 0 && b === -2 && cc - a === 1 && d - b === 3) && fl4.some(([a, b, cc, d]) => a === -3 && b === 3 && cc === 3 && d === 0));

  const d5 = [3, -2, -4];
  v.ok("5. A sur d, B non (−8), C(4 ; 4)", sur([2, 1], d5) && 3 * 0 - 2 * 2 - 4 === -8 && sur([4, 4], d5));
  ecrit(5, "$3 \\times 0 - 2 \\times 2 - 4 = -8$");
  ecrit(5, "Ainsi $C(4\\,;\\,4)$");
  dessinees(5, [d5]);
  pointsJustes(5, { A: [2, 1], B: [0, 2], C: [4, 4] });

  v.ok("6. 4x + 2y − 6 = 0 ⇔ y = −2x + 3", memeDroite([4, 2, -6], [-2, -1, 3]));
  ecrit(6, "$y = -2x + 3$");
  dessinees(6, [[4, 2, -6]]);

  const D7 = [[2, -1, 1], [2, 1, -1], [2, -1, -5], [4, -2, 3]];
  const pentes = D7.map(([a, b]) => -a / b);
  v.ok("7. pentes 2, −2, 2, 2 : d1, d3, d4 parallèles et distinctes", String(pentes) === "2,-2,2,2" && !memeDroite(D7[0], D7[2]) && !memeDroite(D7[0], D7[3]) && !memeDroite(D7[2], D7[3]));
  ecrit(7, "$y = 2x + 1{,}5$");
  dessinees(7, D7);

  const I8 = inter([1, -1, 1], [2, 1, -7]);
  v.ok("8. I = (2 ; 3)", proche(I8, [2, 3]));
  ecrit(8, "$I(2\\,;\\,3)$");
  dessinees(8, [[1, -1, 1], [2, 1, -7]]);
  pointsJustes(8, { I: I8 });

  v.titre("★★ Type devoir");
  const d9 = parVecteur([1, -2], [3, 1]);
  v.ok("9. d : x − 3y − 7 = 0", memeDroite(d9, [1, -3, -7]));
  ecrit(9, "Donc $d : x - 3y - 7 = 0$");
  dessinees(9, [d9]);
  pointsJustes(9, { A: [1, -2] });

  const d10 = parDeux([-2, 3], [7, -3]);
  v.ok("10. (AB) : 2x + 3y − 5 = 0", memeDroite(d10, [2, 3, -5]));
  ecrit(10, "$2x + 3y - 5 = 0$");
  egalites(10, "2 \\times 7 + 3 \\times (-3) - 5 = 14 - 9 - 5 = 0");
  dessinees(10, [d10]);
  pointsJustes(10, { A: [-2, 3], B: [7, -3] });

  const d11 = parVecteur([2, 4], [1, -3]);
  v.ok("11. d' : y = −3x + 10, A pas sur d", memeDroite(d11, [-3, -1, 10]) && !sur([2, 4], [3, 1, -5]));
  ecrit(11, "Ainsi $d' : y = -3x + 10$");
  dessinees(11, [[3, 1, -5], d11]);
  pointsJustes(11, { A: [2, 4] });

  const d12 = parVecteur([-2, 2], [1, 2]);
  v.ok("12. d' : 2x − y + 6 = 0", memeDroite(d12, [2, -1, 6]));
  ecrit(12, "Ainsi $d' : 2x - y + 6 = 0$");
  dessinees(12, [[2, -1, 3], d12]);
  pointsJustes(12, { B: [-2, 2] });

  const S13 = inter([2, 1, -7], [1, -1, 1]);
  v.ok("13. solution (2 ; 3)", proche(S13, [2, 3]));
  ecrit(13, "La solution est le couple $(2\\,;\\,3)$");
  dessinees(13, [[2, 1, -7], [1, -1, 1]]);
  pointsJustes(13, { S: S13 });

  const S14 = inter([3, 2, -12], [5, -4, -20]);
  v.ok("14. solution (4 ; 0)", proche(S14, [4, 0]));
  ecrit(14, "La solution est $(4\\,;\\,0)$");
  dessinees(14, [[3, 2, -12], [5, -4, -20]]);
  pointsJustes(14, { S: S14 });

  v.ok("15. a) aucune solution (parallèles distinctes) ; b) même droite", inter([2, -1, -3], [-4, 2, -1]) === null && !memeDroite([2, -1, -3], [-4, 2, -1]) && memeDroite([1, 2, -4], [3, 6, -12]));
  egalites(15, "2 \\times 2 - (-1) \\times (-4) = 4 - 4 = 0");
  ecrit(15, "$0 = 7$");
  dessinees(15, [[2, -1, -3], [-4, 2, -1], [1, 2, -4]]);

  const I16 = inter([2, -1, -1], [1, 2, -13]);
  v.ok("16. I = (3 ; 5) et C(5 ; 4) sur d2", proche(I16, [3, 5]) && sur([5, 4], [1, 2, -13]));
  ecrit(16, "Donc $I(3\\,;\\,5)$");
  dessinees(16, [[2, -1, -1], [1, 2, -13]]);
  pointsJustes(16, { I: I16, C: [5, 4] });

  v.titre("★★★ Problèmes");
  const R17 = inter([4, -1, 0], [2, 1, -12]);
  v.ok("17. rencontre en t = 2, d = 8", proche(R17, [2, 8]));
  ecrit(17, "Ils se croisent à $11$ h, à $8$ km du refuge");
  v.ok("17. le repère dessine d = 4t et d = 12 − 2t, et marque (2 ; 8)", f.blocs[16].includes("{ q: [0, 4, 0] }") && f.blocs[16].includes("{ q: [0, -2, 12], couleur: ORANGE }") && f.blocs[16].includes("[{ x: 2, y: 8 }]"));

  const S18 = inter([1, 1, -250], [15, 10, -3250]);
  v.ok("18. 150 adultes, 100 enfants ; 2 250 € ≈ 69 %", proche(S18, [150, 100]) && Math.round((2250 / 3250) * 100) === 69);
  ecrit(18, "On a vendu $150$ places adultes et $100$ places enfants");
  const barres18 = [...f.blocs[17].matchAll(/value: (\d+)/g)].map((m) => Number(m[1]));
  v.ok("18. le diagramme porte 2 250 et 1 000 €", String(barres18) === "2250,1000");

  const A19 = [1, 6], B19 = [7, 8], C19 = [5, 2];
  const I19 = [(B19[0] + C19[0]) / 2, (B19[1] + C19[1]) / 2], J19 = [(A19[0] + C19[0]) / 2, (A19[1] + C19[1]) / 2];
  const AI = parDeux(A19, I19), BJ = parDeux(B19, J19);
  const G19 = inter(AI, BJ);
  const Gmoy = [(A19[0] + B19[0] + C19[0]) / 3, (A19[1] + B19[1] + C19[1]) / 3];
  const K19 = [(A19[0] + B19[0]) / 2, (A19[1] + B19[1]) / 2];
  v.ok("19. I(6 ; 5), J(3 ; 4), (AI) : x + 5y − 31 = 0, (BJ) : x − y + 1 = 0", proche(I19, [6, 5]) && proche(J19, [3, 4]) && memeDroite(AI, [1, 5, -31]) && memeDroite(BJ, [1, -1, 1]));
  v.ok("19. G = (13/3 ; 16/3) = la moyenne des sommets, et la 3e médiane y passe", proche(G19, [13 / 3, 16 / 3]) && proche(G19, Gmoy) && sur(G19, parDeux(C19, K19)));
  ecrit(19, "$x + 5y - 31 = 0$");
  ecrit(19, "$x - y + 1 = 0$");
  ecrit(19, "Ainsi $G\\left(\\dfrac{13}{3}\\,;\\,\\dfrac{16}{3}\\right)$");
  dessinees(19, [AI, BJ]);
  pointsJustes(19, { A: A19, B: B19, C: C19, I: I19, J: J19, G: G19 });

  const T20 = parVecteur([1, 1], [3, 2]), cote = [1, 1, -12];
  const Q20 = inter(T20, cote), SQ = parDeux([4, 1], [7, 5]);
  v.ok("20. trajectoire 2x − 3y + 1 = 0, côte en Q(7 ; 5), R dessus, (SQ) : 4x − 3y − 13 = 0 évite R", memeDroite(T20, [2, -3, 1]) && proche(Q20, [7, 5]) && sur([4, 3], T20) && memeDroite(SQ, [4, -3, -13]) && !sur([4, 3], SQ));
  ecrit(20, "soit $2x - 3y + 1 = 0$");
  ecrit(20, "soit $4x - 3y - 13 = 0$");
  egalites(20, "2 \\times 4 - 3 \\times 3 + 1 = 0");
  egalites(20, "4 \\times 4 - 3 \\times 3 - 13 = -6");
  dessinees(20, [T20, cote, SQ]);
  pointsJustes(20, { P: [1, 1], Q: Q20, R: [4, 3], S: [4, 1] });
}

lancer({
  nom: "LES DROITES DU PLAN · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-droites.tsx",
  notionId: "droites_plan",
  verifier,
  casses: [
    ["ex. 1 : une droite de l'énoncé changée", "figure: droites([-3, 6], [{ a: 2, b: -1, c: -1 }", "figure: droites([-3, 6], [{ a: 2, b: -1, c: 1 }"],
    ["ex. 1 : la pente de d2 fausse", "Donc $d_2 : y = -0{,}5x + 3$", "Donc $d_2 : y = -2x + 3$"],
    ["ex. 2 : p faux", "Ainsi $(AB) : y = -3x + 7$", "Ainsi $(AB) : y = -3x + 1$"],
    ["ex. 3 : la verticale écrite y = 2", "son équation est $x = 2$", "son équation est $y = 2$"],
    ["ex. 4 : (a ; b) au lieu de (−b ; a)", "$\\\\vec{v}\\\\,(5\\\\,;\\\\,2)$", "$\\\\vec{v}\\\\,(2\\\\,;\\\\,-5)$"],
    ["ex. 5 : un point mal placé", "{ x: 4, y: 4, label: \"C\" }", "{ x: 4, y: 3, label: \"C\" }"],
    ["ex. 7 : une droite dessinée fausse", "{ a: 4, b: -2, c: 3, couleur: VERT }", "{ a: 4, b: -3, c: 3, couleur: VERT }"],
    ["ex. 9 : l'équation fausse", "Donc $d : x - 3y - 7 = 0$", "Donc $d : x - 3y + 7 = 0$"],
    ["ex. 10 : le point B déplacé", "{ x: 7, y: -3, label: \"B\" }", "{ x: 7, y: -2, label: \"B\" }"],
    ["ex. 11 : le p de d gardé", "Ainsi $d' : y = -3x + 10$", "Ainsi $d' : y = -3x + 5$"],
    ["ex. 13 : la solution fausse", "La solution est le couple $(2\\\\,;\\\\,3)$", "La solution est le couple $(3\\\\,;\\\\,2)$"],
    ["ex. 14 : une droite du système mal dessinée", "{ a: 5, b: -4, c: -20, couleur: ORANGE }", "{ a: 5, b: 4, c: -20, couleur: ORANGE }"],
    ["ex. 16 : l'intersection fausse", "Donc $I(3\\\\,;\\\\,5)$", "Donc $I(3\\\\,;\\\\,4)$"],
    ["ex. 18 : la répartition fausse", "On a vendu $150$ places adultes et $100$ places enfants", "On a vendu $100$ places adultes et $150$ places enfants"],
    ["ex. 19 : G mal dessiné", "{ x: 13 / 3, y: 16 / 3, label: \"G\" }", "{ x: 13 / 3, y: 5, label: \"G\" }"],
    ["ex. 20 : la côte mal dessinée", "{ a: 1, b: 1, c: -12, couleur: VERT }", "{ a: 1, b: 1, c: -11, couleur: VERT }"],
  ],
});
