// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Multiples, diviseurs,
// pair et impair » de seconde (lib/fiches-exercices/maths-seconde-arithmetique.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé liste les diviseurs et les multiples ; ici, le
// plus grand diviseur commun se calcule par l'algorithme d'EUCLIDE (divisions
// successives) et les diviseurs par essais un à un. Les listes du corrigé sont
// reconstruites par le script et doivent s'y LIRE, écrites de la même façon.
//
//   node scripts/verifier-exercices-arithmetique.mjs

import { Q, plus, egal, identiques, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const pgcd = (a, b) => (b === 0 ? a : pgcd(b, a % b));
const ppcm = (a, b) => (a / pgcd(a, b)) * b;
const diviseurs = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
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

  const restes4 = [[96, 8], [75, 6], [104, 13], [100, 7], [57, 1]].map(([a, b]) => a % b);
  v.ok("4. restes : 0, 3, 0, 2, 0", JSON.stringify(restes4) === "[0,3,0,2,0]");
  ["$96 = 8 \\times 12$", "$75 = 6 \\times 12 + 3$", "$104 = 13 \\times 8$", "$100 = 7 \\times 14 + 2$", "$57 = 1 \\times 57$"].forEach((p) => dit(4, p));

  for (const n of [45, 64, 84]) {
    dit(5, `Les diviseurs de $${n}$ sont ${liste(diviseurs(n))}`, `les ${diviseurs(n).length} diviseurs de ${n}, recalculés un à un`);
  }
  v.ok("5. 64 seul a un nombre impair de diviseurs", [45, 64, 84].map((n) => diviseurs(n).length).join() === "6,7,12");

  for (const [a, b] of [[42, 56], [90, 126], [17, 51]]) {
    const g = pgcd(a, b);
    dit(6, `= \\frac{${a / g}}{${b / g}}$`, `${a}/${b} = ${a / g}/${b / g} (Euclide : ${g})`);
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

  dit(11, `les diviseurs de $66$ sont ${liste(diviseurs(66))}`);
  dit(11, `Ceux de $90$ sont ${liste(diviseurs(90))}`);
  v.ok("11. Euclide : pgcd(66, 90) = 6", pgcd(66, 90) === 6);
  dit(11, "Le plus grand vaut $6$");
  dit(11, "$\\frac{66}{90} = \\frac{11}{15}$");
  v.ok("11. 11/15 est irréductible", pgcd(11, 15) === 1);

  v.ok("12. ppcm(12, 18) = 36", ppcm(12, 18) === 36);
  dit(12, "$36 = 12 \\times 3$");
  v.ok("12. 5/12 + 7/18 = 29/36, irréductible", egal(plus(Q(5, 12), Q(7, 18)), Q(29, 36)) && pgcd(29, 36) === 1);
  dit(12, "= \\frac{29}{36}$");
  v.ok("12. le piège 174/216 vaut bien 29/36 (÷ 6)", 5 * 18 + 7 * 12 === 174 && 12 * 18 === 216 && pgcd(174, 216) === 6 && 174 / 6 === 29);

  const l13 = Array.from({ length: 51 }, (_, i) => 100 + i).filter((n) => n % 4 === 0 && n % 6 === 0);
  dit(13, `Il reste ${liste(l13)}`, `divisibles par 4 et 6 de 100 à 150, essai par essai : ${l13.join(", ")}`);
  v.ok("13. les multiples de 24 oublieraient 108 et 132", 108 % 24 !== 0 && 132 % 24 !== 0 && 120 % 24 === 0 && 144 % 24 === 0);

  const vf14 = [
    Array.from({ length: 50 }, (_, i) => 2 * i + 1).every((n) => n % 3 === 0),
    Array.from({ length: 50 }, (_, i) => 2 * i + 1).every((n) => (n + 3) % 2 === 1),
    Array.from({ length: 100 }, (_, i) => 6 * i).every((n) => n % 3 === 0),
    Array.from({ length: 100 }, (_, i) => ppcm(4, 6) * i).every((n) => n % 24 === 0),
  ];
  v.ok("14. faux, faux, vrai, faux", JSON.stringify(vf14) === "[false,false,true,false]");
  ["a) FAUX.", "b) FAUX.", "c) VRAI.", "d) FAUX."].forEach((p) => dit(14, p));
  v.ok("14. 12 est divisible par 4 et 6, pas par 24", 12 % 4 === 0 && 12 % 6 === 0 && 12 % 24 !== 0);

  v.ok("15. Euclide : pgcd(126, 90) = 18 ; 7 roses et 5 lys", pgcd(126, 90) === 18 && 126 / 18 === 7 && 90 / 18 === 5);
  dit(15, "$126 = 18 \\times 7$");
  dit(15, "Il peut faire $18$ bouquets");
  dit(15, "$7$ roses et $5$ lys");

  v.ok("16. ppcm(20, 30) = 60 : à 7 h", ppcm(20, 30) === 60);
  dit(16, "Le plus petit multiple commun est $60$");
  dit(16, "à $7$ h");

  v.titre("★★★ Problèmes");
  v.ok("17. Euclide : pgcd(360, 270) = 90 ; 4 × 3 = 12 carreaux", pgcd(360, 270) === 90 && (360 / 90) * (270 / 90) === 12);
  dit(17, "$360 = 90 \\times 4$");
  dit(17, "Un carreau mesure $90$ cm de côté");
  dit(17, "$4 \\times 3 = 12$ carreaux");
  v.ok("17. le piège : 30 convient, mais 108 carreaux", 360 % 30 === 0 && 270 % 30 === 0 && (360 / 30) * (270 / 30) === 108);

  v.ok("18. ppcm(48, 18) = 144 ; 3 et 8 tours", ppcm(48, 18) === 144 && 144 / 48 === 3 && 144 / 18 === 8);
  dit(18, "$144 = 18 \\times 8$");
  dit(18, "après $144$ dents");
  dit(18, "$144 \\div 48 = 3$ tours");
  dit(18, "$144 \\div 18 = 8$ tours");

  v.ok("19. n² − 1 = (n − 1)(n + 1)", identiques("x^2 - 1", "(x - 1)(x + 1)"));
  dit(19, "$n^2 - 1 = (n - 1)(n + 1)$");
  v.ok("19. 99 999 999 = 10 000² − 1 = 9 999 × 10 001", 10000 ** 2 - 1 === 99999999 && 9999 * 10001 === 99999999);
  dit(19, "$99\\,999\\,999 = 9\\,999 \\times 10\\,001$");
  v.ok("19. n impair : n² − 1 = 4k(k + 1)", identiques("(2x + 1)^2 - 1", "4x(x + 1)"));
  v.ok("19. 48 = 4 × 12, pour n = 7", 7 ** 2 - 1 === 48 && 3 * 4 === 12);
  v.ok("19. pour n impair de 1 à 99, n² − 1 est un multiple de 4", Array.from({ length: 50 }, (_, i) => 2 * i + 1).every((n) => (n * n - 1) % 4 === 0));
  dit(19, "= 4k(k + 1)$");

  v.ok("20. ppcm(13, 17) = 221 ; 2245 et 1803", ppcm(13, 17) === 221 && 2024 + 221 === 2245 && 2024 - 221 === 1803);
  dit(20, "en $2024 + 221 = 2245$");
  dit(20, "$2024 - 221 = 1803$");
  v.ok("20. ppcm(4, 12) = 12 et ppcm(4, 13) = 52", ppcm(4, 12) === 12 && ppcm(4, 13) === 52);
  dit(20, "tous les $4 \\times 13 = 52$ ans");
}

lancer({
  nom: "MULTIPLES, DIVISEURS, PAIR ET IMPAIR · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-arithmetique.tsx",
  notionId: "arithmetique_entiers",
  verifier,
  casses: [
    ["ex. 1 : un diviseur oublié", "$12$, $18$ et $36$ : il y en a $9$", "$18$ et $36$ : il y en a $8$"],
    ["ex. 4 : le reste oublié", "b) $75 = 6 \\\\times 12 + 3$", "b) $75 = 6 \\\\times 12$"],
    ["ex. 5 : un diviseur oublié", "$28$, $42$ et $84$", "$28$ et $84$"],
    ["ex. 6 : une simplification inachevée", "= \\\\frac{5}{7}$", "= \\\\frac{45}{63}$"],
    ["ex. 7 : le reste oublié", "Il faut $5$ cars", "Il faut $4$ cars"],
    ["ex. 11 : une simplification inachevée", "$\\\\frac{66}{90} = \\\\frac{11}{15}$", "$\\\\frac{66}{90} = \\\\frac{22}{30}$"],
    ["ex. 13 : les multiples de 24 seulement", "Il reste $108$, $120$, $132$ et $144$", "Il reste $120$ et $144$"],
    ["ex. 14 : la règle du 24 déclarée vraie", "d) FAUX.", "d) VRAI."],
    ["ex. 15 : le plus petit multiple au lieu du diviseur", "Il peut faire $18$ bouquets", "Il peut faire $630$ bouquets"],
    ["ex. 18 : un nombre de tours faux", "$144 \\\\div 18 = 8$ tours", "$144 \\\\div 18 = 9$ tours"],
    ["ex. 20 : une année fausse", "en $2024 + 221 = 2245$", "en $2024 + 221 = 2255$"],
    ["un $ dans un canvas", "values: [\"5×9\"", "values: [\"$5 \\\\times 9$\""],
  ],
});
