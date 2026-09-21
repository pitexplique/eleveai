// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Multiples, diviseurs
// et nombres premiers » de seconde (lib/fiches-exercices/maths-seconde-arithmetique.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé décompose en facteurs premiers ; ici, le plus
// grand diviseur commun se calcule par l'algorithme d'EUCLIDE (divisions
// successives), les diviseurs par essais un à un, les nombres premiers par
// crible. Les décompositions du corrigé sont reconstruites par le script et
// doivent s'y LIRE, écrites de la même façon.
//
//   node scripts/verifier-exercices-arithmetique.mjs

import { Q, plus, egal, identiques, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const pgcd = (a, b) => (b === 0 ? a : pgcd(b, a % b));
const ppcm = (a, b) => (a / pgcd(a, b)) * b;
const diviseurs = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const CRIBLE = (() => {
  const p = Array(200).fill(true);
  p[0] = p[1] = false;
  for (let i = 2; i * i < 200; i++) if (p[i]) for (let j = i * i; j < 200; j += i) p[j] = false;
  return p;
})();
const premier = (n) => (n < 200 ? CRIBLE[n] : diviseurs(n).length === 2);
/** 60 → « 2^2 \times 3 \times 5 », comme dans la feuille. */
function decomposition(n) {
  const f = [];
  for (let p = 2; n > 1; p++) {
    let e = 0;
    while (n % p === 0) {
      n /= p;
      e++;
    }
    if (e) f.push(e > 1 ? `${p}^${e}` : `${p}`);
  }
  return f.join(" \\times ");
}
const liste = (ns) => ns.map((n) => `$${n}$`).join(", ").replace(/, ([^,]*)$/, " et $1");

function verifier(source, v) {
  const f = lireFeuille(source);
  const { dit } = outilsAlgebre(v, f);

  v.titre("★ Un seul geste");
  v.ok("1. 91 = 7 × 13 et 125 = 5 × 25", 91 % 7 === 0 && 91 / 7 === 13 && 125 / 5 === 25);
  dit(1, "$91 = 7 \\times 13$");
  dit(1, "$125 = 5 \\times 25$");
  const d36 = diviseurs(36);
  dit(1, `${liste(d36)} : il y en a $${d36.length}$`, `les ${d36.length} diviseurs de 36, recalculés un à un`);

  v.ok("2. 46 pair, 71 impair, 0 pair", 46 % 2 === 0 && 71 % 2 === 1 && 0 % 2 === 0);
  ["$46 = 2 \\times 23$", "$71 = 2 \\times 35 + 1$", "$0 = 2 \\times 0$"].forEach((p) => dit(2, p));

  const div = (n) => [2, 3, 4, 5, 9].map((d) => n % d === 0);
  v.ok("3. 2 340 divisible par 2, 3, 4, 5 et 9", JSON.stringify(div(2340)) === "[true,true,true,true,true]");
  v.ok("3. 1 011 divisible par 3 seulement", JSON.stringify(div(1011)) === "[false,true,false,false,false]" && 1011 / 3 === 337);
  dit(3, "$1\\,011 = 3 \\times 337$");
  dit(3, "$2 + 3 + 4 + 0 = 9$");

  const p4 = [29, 51, 57, 97, 1].map(premier);
  v.ok("4. 29 et 97 premiers ; 51, 57 et 1 non (crible)", JSON.stringify(p4) === "[true,false,false,true,false]");
  dit(4, "$51 = 3 \\times 17$");
  dit(4, "$57 = 3 \\times 19$");
  dit(4, `$\\sqrt{29} \\approx ${Math.sqrt(29).toFixed(1).replace(".", "{,}")}$`);
  dit(4, `$\\sqrt{97} \\approx ${Math.sqrt(97).toFixed(1).replace(".", "{,}")}$`);
  v.ok("4. « il est premier » deux fois (29 et 97)", (f.corrections[3] ?? "").split(": il est premier.").length - 1 === 2);

  for (const n of [60, 84, 126]) dit(5, `$${n} = ${decomposition(n)}$`, `${n} = ${decomposition(n)}, recalculé`);

  for (const [a, b] of [[42, 56], [90, 126], [17, 51]]) {
    const g = pgcd(a, b);
    dit(6, `= \\dfrac{${a / g}}{${b / g}}$`, `${a}/${b} = ${a / g}/${b / g} (Euclide : ${g})`);
  }
  v.ok("6. le piège 45/63 se simplifie encore par 9", pgcd(45, 63) === 9 && 90 / 2 === 45 && 126 / 2 === 63);

  v.ok("7. 250 = 53 × 4 + 38, donc 5 cars", Math.floor(250 / 53) === 4 && 250 % 53 === 38 && Math.ceil(250 / 53) === 5);
  dit(7, "$250 = 53 \\times 4 + 38$");
  dit(7, "Il faut $5$ cars");
  dit(7, "transporte $38$ élèves");

  v.ok("8. 35 + 63 = 98 = 7 × 14", 35 + 63 === 98 && 98 / 7 === 14);
  dit(8, "= 98 = 7 \\times 14$");
  dit(8, "$7a + 7b = 7(a + b)$");

  v.titre("★★ Type devoir");
  v.ok("9. 49 = 2 × 24 + 1, et (2k + 1)² = 2(2k² + 2k) + 1", 49 === 2 * 24 + 1 && identiques("(2x + 1)^2", "2(2x^2 + 2x) + 1"));
  dit(9, "$7^2 = 49 = 2 \\times 24 + 1$");
  dit(9, "= 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$");

  let ok10 = true;
  for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) ok10 &&= (2 * a + 1) + (2 * b + 1) === 2 * (a + b + 1) && (2 * a + 1) * (2 * b + 1) === 2 * (2 * a * b + a + b) + 1;
  v.ok("10. les deux identités, pour a et b de −6 à 6", ok10);
  dit(10, "= 2a + 2b + 2 = 2(a + b + 1)$");
  dit(10, "= 4ab + 2a + 2b + 1 = 2(2ab + a + b) + 1$");

  dit(11, `$198 = 2 \\times 99 = ${decomposition(198)}$`);
  dit(11, `$308 = 4 \\times 77 = ${decomposition(308)}$`);
  v.ok("11. Euclide : pgcd(198, 308) = 22", pgcd(198, 308) === 22);
  dit(11, "vaut $2 \\times 11 = 22$");
  dit(11, `= \\dfrac{${198 / 22}}{${308 / 22}}$`);
  v.ok("11. 9/14 est irréductible", pgcd(9, 14) === 1);

  v.ok("12. ppcm(12, 18) = 36", ppcm(12, 18) === 36);
  dit(12, `$12 = ${decomposition(12)}$ et $18 = ${decomposition(18)}$`);
  v.ok("12. 5/12 + 7/18 = 29/36, irréductible", egal(plus(Q(5, 12), Q(7, 18)), Q(29, 36)) && pgcd(29, 36) === 1 && premier(29));
  dit(12, "= \\dfrac{29}{36}$");
  v.ok("12. le piège 174/216 vaut bien 29/36 (÷ 6)", 5 * 18 + 7 * 12 === 174 && 12 * 18 === 216 && pgcd(174, 216) === 6 && 174 / 6 === 29);

  const p13 = Array.from({ length: 21 }, (_, i) => 40 + i).filter(premier);
  dit(13, `Il reste ${liste(p13)}`, `les premiers de 40 à 60, par crible : ${p13.join(", ")}`);
  v.ok("13. 49 = 7 × 7 n'est pas premier", !premier(49));

  const vf14 = [
    Array.from({ length: 50 }, (_, i) => 2 * i + 1).every(premier),
    [[2, 3], [3, 5], [5, 7], [7, 11]].every(([a, b]) => (a + b) % 2 === 0),
    Array.from({ length: 100 }, (_, i) => 6 * i).every((n) => n % 3 === 0),
    Array.from({ length: 100 }, (_, i) => ppcm(4, 6) * i).every((n) => n % 24 === 0),
  ];
  v.ok("14. faux, faux, vrai, faux", JSON.stringify(vf14) === "[false,false,true,false]");
  ["a) FAUX.", "b) FAUX.", "c) VRAI.", "d) FAUX."].forEach((p) => dit(14, p));
  v.ok("14. 12 est divisible par 4 et 6, pas par 24", 12 % 4 === 0 && 12 % 6 === 0 && 12 % 24 !== 0);

  v.ok("15. Euclide : pgcd(126, 90) = 18 ; 7 roses et 5 lys", pgcd(126, 90) === 18 && 126 / 18 === 7 && 90 / 18 === 5);
  dit(15, "Il peut faire $18$ bouquets");
  dit(15, "$7$ roses et $5$ lys");

  v.ok("16. ppcm(20, 30) = 60 : à 7 h", ppcm(20, 30) === 60);
  dit(16, `$20 = ${decomposition(20)}$, $30 = ${decomposition(30)}$`);
  dit(16, "$2^2 \\times 3 \\times 5 = 60$");
  dit(16, "à $7$ h");

  v.titre("★★★ Problèmes");
  v.ok("17. Euclide : pgcd(360, 270) = 90 ; 4 × 3 = 12 carreaux", pgcd(360, 270) === 90 && (360 / 90) * (270 / 90) === 12);
  dit(17, `$360 = ${decomposition(360)}$ et $270 = ${decomposition(270)}$`);
  dit(17, "Un carreau mesure $90$ cm de côté");
  dit(17, "$4 \\times 3 = 12$ carreaux");
  v.ok("17. le piège : 30 convient, mais 108 carreaux", 360 % 30 === 0 && 270 % 30 === 0 && (360 / 30) * (270 / 30) === 108);

  v.ok("18. ppcm(48, 18) = 144 ; 3 et 8 tours", ppcm(48, 18) === 144 && 144 / 48 === 3 && 144 / 18 === 8);
  dit(18, `$48 = ${decomposition(48)}$ et $18 = ${decomposition(18)}$`);
  dit(18, "après $144$ dents");
  dit(18, "$144 \\div 48 = 3$ tours");
  dit(18, "$144 \\div 18 = 8$ tours");

  v.ok("19. n² − 1 = (n − 1)(n + 1)", identiques("x^2 - 1", "(x - 1)(x + 1)"));
  dit(19, "$n^2 - 1 = (n - 1)(n + 1)$");
  v.ok("19. 99 999 999 = 10 000² − 1 = 9 999 × 10 001", 10000 ** 2 - 1 === 99999999 && 9999 * 10001 === 99999999);
  dit(19, "$99\\,999\\,999 = 9\\,999 \\times 10\\,001$");
  v.ok("19. pour n = 2 : 3, premier", premier(2 ** 2 - 1));
  v.ok("19. pour n de 3 à 60, n² − 1 n'est jamais premier", Array.from({ length: 58 }, (_, i) => i + 3).every((n) => !premier(n * n - 1)));

  v.ok("20. ppcm(13, 17) = 221 ; 2245 et 1803", ppcm(13, 17) === 221 && 2024 + 221 === 2245 && 2024 - 221 === 1803);
  dit(20, "en $2024 + 221 = 2245$");
  dit(20, "$2024 - 221 = 1803$");
  v.ok("20. ppcm(4, 12) = 12 et ppcm(4, 13) = 52", ppcm(4, 12) === 12 && ppcm(4, 13) === 52);
  dit(20, "tous les $4 \\times 13 = 52$ ans");
}

lancer({
  nom: "MULTIPLES, DIVISEURS ET NOMBRES PREMIERS · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-arithmetique.tsx",
  notionId: "arithmetique_entiers",
  verifier,
  casses: [
    ["ex. 1 : un diviseur oublié", "$12$, $18$ et $36$ : il y en a $9$", "$18$ et $36$ : il y en a $8$"],
    ["ex. 4 : 51 déclaré premier", "b) $51 = 3 \\\\times 17$ : il n'est pas premier.", "b) $51$ est premier."],
    ["ex. 5 : une décomposition fausse", "soit $84 = 2^2 \\\\times 3 \\\\times 7$", "soit $84 = 2 \\\\times 6 \\\\times 7$"],
    ["ex. 6 : une simplification inachevée", "= \\\\dfrac{5}{7}$", "= \\\\dfrac{45}{63}$"],
    ["ex. 7 : le reste oublié", "Il faut $5$ cars", "Il faut $4$ cars"],
    ["ex. 11 : un diviseur commun faux", "$\\\\dfrac{198}{308} = \\\\dfrac{9}{14}$", "$\\\\dfrac{198}{308} = \\\\dfrac{18}{28}$"],
    ["ex. 13 : 49 gardé parmi les premiers", "Il reste $41$, $43$, $47$, $53$ et $59$", "Il reste $41$, $43$, $47$, $49$, $53$ et $59$"],
    ["ex. 14 : la règle du 24 déclarée vraie", "d) FAUX.", "d) VRAI."],
    ["ex. 15 : le plus petit multiple au lieu du diviseur", "Il peut faire $18$ bouquets", "Il peut faire $630$ bouquets"],
    ["ex. 18 : un nombre de tours faux", "$144 \\\\div 18 = 8$ tours", "$144 \\\\div 18 = 9$ tours"],
    ["ex. 20 : une année fausse", "en $2024 + 221 = 2245$", "en $2024 + 221 = 2255$"],
    ["un $ dans un canvas", "values: [\"2² × 3 × 5\"", "values: [\"$2^2 \\\\times 3 \\\\times 5$\""],
  ],
});
