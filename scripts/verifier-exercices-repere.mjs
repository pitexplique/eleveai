// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Repère et
// coordonnées » de seconde (lib/fiches-exercices/maths-seconde-repere.tsx).
//
// ⭐ L'AUTRE CHEMIN : les points de l'énoncé sont recopiés ICI, et tout est
// refait en entiers (milieux, carrés des distances, réciproque de Pythagore,
// diagonales) ; le corrigé doit ÉCRIRE le bon résultat. Les points et les
// segments dessinés sont RELUS dans le source et comparés au modèle ; les
// chaînes « a = b = c » sont évaluées.
//
//   node scripts/verifier-exercices-repere.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const mil = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
const d2 = (P, Q) => (Q[0] - P[0]) ** 2 + (Q[1] - P[1]) ** 2;
const memes = (x, y) => String(x) === String(y);
const tx = (n) => String(n).replace(".", "{,}");
const pt = ([x, y]) => `(${tx(x)}\\,;\\,${tx(y)})`;

function dessins(bloc) {
  const segments = [...bloc.matchAll(/\{ de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => m.slice(1, 5).map(Number));
  const points = [...bloc.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "([A-Z])" \}/g)].map((m) => [m[3], Number(m[1]), Number(m[2])]);
  const fenetres = [...bloc.matchAll(/vecteurs\(\s*\[(-?\d+), (-?\d+)\]/g)].map((m) => [Number(m[1]), Number(m[2])]);
  return { segments, points, fenetres };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** Les points du modèle sont ceux que l'ÉNONCÉ donne (s'il les écrit). */
  const enonceDit = (k, P) => {
    const faux = Object.entries(P).filter(([l, [x, y]]) => e(k).includes(`$${l}(`) && !e(k).includes(`$${l}(${tx(x)}\\,;\\,${tx(y)})$`));
    v.ok(`${k}. l'énoncé donne bien les points du modèle`, faux.length === 0, faux.map(([l]) => l).join(", "));
  };
  const dessinJuste = (k, P, attendus) => {
    const { segments, points, fenetres } = dessins(f.blocs[k - 1]);
    const cle = (a) => a.join(",");
    const prevus = attendus.map(([a, b]) => [...(typeof a === "string" ? P[a] : a), ...(typeof b === "string" ? P[b] : b)]);
    const manque = prevus.filter((a) => !segments.some((s) => cle(s) === cle(a)));
    const enTrop = segments.filter((s) => !prevus.some((a) => cle(a) === cle(s)));
    v.ok(`${k}. les ${segments.length} segments dessinés sont ceux du modèle`, manque.length === 0 && enTrop.length === 0, `manque ${JSON.stringify(manque)} ; en trop ${JSON.stringify(enTrop)}`);
    const mal = points.filter(([l, x, y]) => !P[l] || P[l][0] !== x || P[l][1] !== y);
    v.ok(`${k}. les ${points.length} points dessinés sont à leur place`, points.length > 0 && mal.length === 0, JSON.stringify(mal));
    const bord = fenetres.flatMap(([mn, mx]) => points.filter(([, x, y]) => [x, y].some((t) => t <= mn || t >= mx)));
    v.ok(`${k}. aucun point sur le bord du cadre`, bord.length === 0 && fenetres.every(([mn]) => mn < 0), JSON.stringify(bord));
  };
  /** Un parallélogramme ABCD : les diagonales [AC] et [BD] ont le même milieu, écrit. */
  const parallelogramme = (k, [A, B, C, D], [a, b, cc, d] = ["A", "B", "C", "D"]) => {
    const m1 = mil(A, C);
    const m2 = mil(B, D);
    v.ok(`${k}. [${a}${cc}] et [${b}${d}] ont le même milieu ${m1}`, memes(m1, m2) && c(k).split(`soit $${pt(m1)}$`).length - 1 >= 2, pt(m1));
  };

  v.titre("★ Un seul geste");
  const P1 = { A: [3, 2], B: [-3, 1], C: [-2, -3], D: [4, -3], E: [-4, 4] };
  ecrit(1, "$A(3\\,;\\,2)$, $B(-3\\,;\\,1)$, $C(-2\\,;\\,-3)$ et $D(4\\,;\\,-3)$");
  v.ok("1. l'énoncé place E(−4 ; 4)", e(1).includes("$E(-4\\,;\\,4)$"));
  dessinJuste(1, P1, []);

  const A2 = [-3, 5], B2 = [7, -1];
  v.ok("2. I = (2 ; 2)", memes(mil(A2, B2), [2, 2]) && c(2).includes("Donc $I(2\\,;\\,2)$"));
  enonceDit(2, { A: A2, B: B2 });

  v.ok("3. AB² = 100", d2([-2, -1], [4, 7]) === 100);
  enonceDit(3, { A: [-2, -1], B: [4, 7] });
  egalites(3, "\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10");

  v.ok("4. CD² = 45", d2([1, -3], [-2, 3]) === 45);
  enonceDit(4, { C: [1, -3], D: [-2, 3] });
  egalites(4, "\\sqrt{(-3)^2 + 6^2} = \\sqrt{9 + 36} = \\sqrt{45}");
  egalites(4, "\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}");
  ecrit(4, "3\\sqrt{5} \\approx 6{,}71");
  v.ok("4. 3√5 ≈ 6,71", Math.abs(3 * Math.sqrt(5) - 6.71) < 0.005);

  const I5 = [1, -2], A5 = [-3, 4], B5 = [2 * I5[0] - A5[0], 2 * I5[1] - A5[1]];
  v.ok("5. B = (5 ; −8) et I milieu de [AB]", memes(B5, [5, -8]) && memes(mil(A5, B5), I5) && c(5).includes("Ainsi $B(5\\,;\\,-8)$"));

  ecrit(6, "c'est $P(0\\,;\\,5)$");
  ecrit(6, "c'est $Q(-3\\,;\\,0)$");
  ecrit(6, "l'origine, on change les DEUX signes : $(-4\\,;\\,2)$");
  ecrit(6, "seule l'ordonnée change : $(4\\,;\\,2)$");

  v.ok("7. OC² = OD² = 5, OE² = 8", d2([0, 0], [2, 1]) === 5 && d2([0, 0], [-1, -2]) === 5 && d2([0, 0], [2, 2]) === 8);
  ecrit(7, "$OE = \\sqrt{2^2 + 2^2} = \\sqrt{8}$");
  ecrit(7, "$E$ n'est PAS sur le cercle");

  const E8 = [-4, -1], F8 = [6, 5], M8 = [1, 2];
  v.ok("8. M milieu de [EF], ME² = MF² = 34", memes(mil(E8, F8), M8) && d2(M8, E8) === 34 && d2(M8, F8) === 34);
  egalites(8, "\\sqrt{(-4 - 1)^2 + (-1 - 2)^2} = \\sqrt{25 + 9} = \\sqrt{34}");
  egalites(8, "\\sqrt{(6 - 1)^2 + (5 - 2)^2} = \\sqrt{25 + 9} = \\sqrt{34}");

  v.titre("★★ Type devoir");
  const P9 = { A: [-2, 1], B: [3, 2], C: [5, -2], D: [0, -3] };
  enonceDit(9, P9);
  parallelogramme(9, [P9.A, P9.B, P9.C, P9.D]);
  dessinJuste(9, P9, [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]]);

  const P10 = { A: [1, 1], B: [5, 3], C: [3, 7] };
  enonceDit(10, P10);
  const [ab, bc, ac] = [d2(P10.A, P10.B), d2(P10.B, P10.C), d2(P10.A, P10.C)];
  v.ok("10. AB² = BC² = 20, AC² = 40 = AB² + BC²", ab === 20 && bc === 20 && ac === 40 && ab + bc === ac);
  ecrit(10, "$AB = \\sqrt{4^2 + 2^2} = \\sqrt{20}$");
  ecrit(10, "$AB^2 + BC^2 = 20 + 20 = 40$");
  ecrit(10, "rectangle isocèle en $B$");
  dessinJuste(10, P10, [["A", "B"], ["B", "C"], ["C", "A"]]);

  const P11 = { E: [-3, -1], F: [1, 1], G: [0, 3], H: [-4, 1] };
  enonceDit(11, P11);
  parallelogramme(11, [P11.E, P11.F, P11.G, P11.H], ["E", "F", "G", "H"]);
  v.ok("11. EG² = FH² = 25 ; EF² = 20 ≠ FG² = 5", d2(P11.E, P11.G) === 25 && d2(P11.F, P11.H) === 25 && d2(P11.E, P11.F) === 20 && d2(P11.F, P11.G) === 5);
  ecrit(11, "$EG = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$");
  ecrit(11, "$FG = \\sqrt{(-1)^2 + 2^2} = \\sqrt{5}$");

  const A12 = [-1, 3], B12 = [4, 4], C12 = [6, -1];
  const m12 = mil(A12, C12);
  const D12 = [2 * m12[0] - B12[0], 2 * m12[1] - B12[1]];
  v.ok("12. D = (1 ; −2), milieux égaux", memes(D12, [1, -2]) && memes(mil(B12, D12), m12) && c(12).includes("Ainsi $D(1\\,;\\,-2)$"));
  ecrit(12, `soit $${pt(m12)}$`);

  const K = [1, 1];
  v.ok("13. KA² = KB² = KC² = 25, KG² = 32", [[4, 5], [-4, 1], [1, -4]].every((P) => d2(K, P) === 25) && d2(K, [5, -3]) === 32);
  egalites(13, "\\sqrt{32} = 4\\sqrt{2}");
  ecrit(13, "4\\sqrt{2} \\approx 5{,}66");
  v.ok("13. 4√2 ≈ 5,66", Math.abs(4 * Math.SQRT2 - 5.66) < 0.005);

  const A14 = [-2, 1], B14 = [4, 3];
  const sol14 = [...Array(41).keys()].map((i) => i - 20).filter((y) => d2([0, y], A14) === d2([0, y], B14));
  v.ok("14. un seul P(0 ; y) équidistant, y = 5", memes(sol14, [5]) && c(14).includes("Ainsi $P(0\\,;\\,5)$"));
  ecrit(14, "$PA^2 = 4 + 16 = 20$");

  const P15 = { A: [-2, 1], B: [1, 5], C: [4, 1], D: [1, -3] };
  enonceDit(15, P15);
  parallelogramme(15, [P15.A, P15.B, P15.C, P15.D]);
  v.ok("15. AB = BC = 5, AC = 6, BD = 8", d2(P15.A, P15.B) === 25 && d2(P15.B, P15.C) === 25 && d2(P15.A, P15.C) === 36 && d2(P15.B, P15.D) === 64);
  ecrit(15, "$AC = 6$ et $BD = 8$");
  dessinJuste(15, P15, [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]]);

  const P16 = { A: [1, -2], B: [5, 1], C: [-1, 4] };
  enonceDit(16, P16);
  const c16 = [d2(P16.A, P16.B), d2(P16.B, P16.C), d2(P16.A, P16.C)];
  v.ok("16. 25, 45, 40 : BC le plus grand, 25 + 40 ≠ 45", memes(c16, [25, 45, 40]) && c16[0] + c16[2] !== c16[1]);
  ecrit(16, "$AB^2 + AC^2 = 25 + 40 = 65$");
  ecrit(16, "le triangle n'est PAS rectangle");

  v.titre("★★★ Problèmes");
  const B17 = [-3, 4], E17 = [5, -2];
  v.ok("17. M = (1 ; 1), BE = 10 unités = 1 000 m, par les rues 14 unités", memes(mil(B17, E17), [1, 1]) && d2(B17, E17) === 100 && Math.abs(E17[0] - B17[0]) + Math.abs(E17[1] - B17[1]) === 14);
  ecrit(17, "soit $M(1\\,;\\,1)$");
  egalites(17, "\\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10");
  ecrit(17, "soit $14$ unités, $1\\,400$ m");
  dessinJuste(17, { B: B17, E: E17, M: [1, 1] }, [["B", "E"], ["B", [5, 4]], [[5, 4], "E"]]);

  v.ok("18. centre (52,5 ; 34), AC ≈ 125,1, PC ≈ 100", memes(mil([0, 0], [105, 68]), [52.5, 34]) && Math.abs(Math.hypot(105, 68) - 125.1) < 0.05 && Math.round(Math.hypot(94, 34)) === 100 && Math.abs(Math.hypot(94, 34) - 99.96) < 0.005);
  ecrit(18, "soit $(52{,}5\\,;\\,34)$");
  egalites(18, "\\sqrt{105^2 + 68^2} = \\sqrt{11\\,025 + 4\\,624} = \\sqrt{15\\,649}");
  egalites(18, "\\sqrt{94^2 + 34^2} = \\sqrt{8\\,836 + 1\\,156} = \\sqrt{9\\,992}");
  ecrit(18, "$P(11\\,;\\,34)$");

  const A19 = [0, 0], B19 = [6, 5], C19 = [1, 8];
  const cand = { P1: [3, 4], P2: [4, 3], P3: [-3, 4] };
  const bons = Object.entries(cand).filter(([, P]) => d2(A19, P) === 25 && d2(B19, P) === 10).map(([n]) => n);
  v.ok("19. seul P1 est à 5 de A et √10 de B, et à √20 de C", memes(bons, ["P1"]) && Object.values(cand).every((P) => d2(A19, P) === 25) && d2(C19, cand.P1) === 20);
  ecrit(19, "Le téléphone est en $P_1(3\\,;\\,4)$");
  ecrit(19, "$BP_2 = \\sqrt{4 + 4} = \\sqrt{8}$");
  ecrit(19, "$BP_3 = \\sqrt{81 + 1} = \\sqrt{82}$");
  // ⭐ L'autre intersection des deux cercles existe bien (sinon la phrase « deux antennes laissent un doute » serait fausse ici).
  const autre = [4.475, 38 / 5 - (6 * 4.475) / 5];
  v.ok("19. les deux cercles se recoupent ailleurs qu'en P1", Math.abs(d2(A19, autre) - 25) < 0.01 && Math.abs(d2(B19, autre) - 10) < 0.01);

  const P20 = { A: [2, 1], B: [32, 11], C: [26, 29], D: [-4, 19] };
  enonceDit(20, P20);
  parallelogramme(20, [P20.A, P20.B, P20.C, P20.D]);
  v.ok("20. AC² = BD² = 1 360, AB² = 1 000, BC² = 360, aire 600, clôture ≈ 101,2", d2(P20.A, P20.C) === 1360 && d2(P20.B, P20.D) === 1360 && d2(P20.A, P20.B) === 1000 && d2(P20.B, P20.C) === 360 && Math.sqrt(1000 * 360) === 600 && Math.abs(2 * (Math.sqrt(1000) + Math.sqrt(360)) - 101.2) < 0.05);
  egalites(20, "\\sqrt{24^2 + 28^2} = \\sqrt{576 + 784} = \\sqrt{1\\,360}");
  egalites(20, "\\sqrt{(-36)^2 + 8^2} = \\sqrt{1\\,296 + 64} = \\sqrt{1\\,360}");
  ecrit(20, "\\sqrt{1\\,000} \\approx 31{,}62$ m");
  ecrit(20, "\\sqrt{360} \\approx 18{,}97$ m");
  egalites(20, "\\sqrt{1\\,000} \\times \\sqrt{360} = \\sqrt{360\\,000} = 600");
  ecrit(20, "\\approx 101{,}2$ m");
  v.ok("20. 31,62 × 18,97 ≈ 599,8 (le piège)", Math.abs(31.62 * 18.97 - 599.8) < 0.05 && c(20).includes("31{,}62 \\times 18{,}97 \\approx 599{,}8"));
}

lancer({
  nom: "REPÈRE ET COORDONNÉES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-repere.tsx",
  notionId: "repere_coordonnees",
  verifier,
  casses: [
    ["ex. 1 : un point lu à l'envers", "$A(3\\\\,;\\\\,2)$, $B(-3\\\\,;\\\\,1)$", "$A(3\\\\,;\\\\,2)$, $B(1\\\\,;\\\\,-3)$"],
    ["ex. 1 : un point mal dessiné", "figure: vecteurs([-5, 6], [], [{ x: 3, y: 2, label: \"A\" }", "figure: vecteurs([-5, 6], [], [{ x: 2, y: 3, label: \"A\" }"],
    ["ex. 2 : le milieu par la différence", "Donc $I(2\\\\,;\\\\,2)$", "Donc $I(5\\\\,;\\\\,-3)$"],
    ["ex. 3 : un écart faux", "\\\\sqrt{6^2 + 8^2} = \\\\sqrt{36 + 64} = \\\\sqrt{100} = 10$.\\n⭐", "\\\\sqrt{6^2 + 6^2} = \\\\sqrt{36 + 64} = \\\\sqrt{100} = 10$.\\n⭐"],
    ["ex. 5 : B faux", "Ainsi $B(5\\\\,;\\\\,-8)$", "Ainsi $B(-1\\\\,;\\\\,1)$"],
    ["ex. 9 : un point de l'énoncé changé", "Soit $A(-2\\\\,;\\\\,1)$, $B(3\\\\,;\\\\,2)$, $C(5\\\\,;\\\\,-2)$", "Soit $A(-2\\\\,;\\\\,1)$, $B(3\\\\,;\\\\,2)$, $C(5\\\\,;\\\\,-1)$"],
    ["ex. 9 : une diagonale mal tracée", "{ de: [3, 2], vers: [0, -3], couleur: ORANGE, pointe: false },\n            ],\n            [{ x: -2, y: 1, label: \"A\" }, { x: 3, y: 2", "{ de: [3, 2], vers: [0, -2], couleur: ORANGE, pointe: false },\n            ],\n            [{ x: -2, y: 1, label: \"A\" }, { x: 3, y: 2"],
    ["ex. 10 : Pythagore faux", "$AB^2 + BC^2 = 20 + 20 = 40$", "$AB^2 + BC^2 = 20 + 20 = 45$"],
    ["ex. 12 : D faux", "Ainsi $D(1\\\\,;\\\\,-2)$", "Ainsi $D(1\\\\,;\\\\,2)$"],
    ["ex. 14 : y faux", "Ainsi $P(0\\\\,;\\\\,5)$", "Ainsi $P(0\\\\,;\\\\,4)$"],
    ["ex. 15 : une diagonale fausse", "$AC = 6$ et $BD = 8$", "$AC = 6$ et $BD = 6$"],
    ["ex. 16 : la somme des carrés fausse", "$AB^2 + AC^2 = 25 + 40 = 65$", "$AB^2 + AC^2 = 25 + 40 = 45$"],
    ["ex. 17 : le milieu faux", "soit $M(1\\\\,;\\\\,1)$", "soit $M(1\\\\,;\\\\,2)$"],
    ["ex. 18 : la diagonale fausse", "\\\\sqrt{11\\\\,025 + 4\\\\,624} = \\\\sqrt{15\\\\,649}", "\\\\sqrt{11\\\\,025 + 4\\\\,624} = \\\\sqrt{15\\\\,694}"],
    ["ex. 19 : la mauvaise position", "Le téléphone est en $P_1(3\\\\,;\\\\,4)$", "Le téléphone est en $P_2(4\\\\,;\\\\,3)$"],
    ["ex. 20 : un coin changé", "$C(26\\\\,;\\\\,29)$ et $D(-4\\\\,;\\\\,19)$", "$C(26\\\\,;\\\\,29)$ et $D(-4\\\\,;\\\\,18)$"],
  ],
});
