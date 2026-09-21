// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La racine carrée » de
// seconde (lib/fiches-exercices/maths-seconde-racines.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé devine un carré parfait (« 45 = 9 × 5 ») ; ici
// on le CHERCHE — le plus grand carré qui divise n, par essais successifs — et
// on vérifie que ce qui reste ne contient plus aucun carré. Chaque expression
// (somme, produit, développement) est ensuite évaluée en décimal et comparée à
// la forme a√b du corrigé, qui doit se LIRE dans sa phrase.
//
//   node scripts/verifier-exercices-racines.mjs

import { Q, D, fois, moins, egal, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/** n = k² × m, avec k le plus grand possible (m sans facteur carré). */
function simplifie(n) {
  let k = 1;
  for (let i = 2; i * i <= n; i++) if (n % (i * i) === 0) k = i;
  return { k, m: n / (k * k) };
}
const sansCarre = (m) => simplifie(m).k === 1;
const racTex = ({ k, m }) => (m === 1 ? `${k}` : k === 1 ? `\\sqrt{${m}}` : `${k}\\sqrt{${m}}`);
const proche = (x, y) => Math.abs(x - y) < 1e-9;
/** Arrondi à d décimales, écrit comme dans la feuille : 22{,}36. */
const arrondi = (x, d) => tex(D(x.toFixed(d)));

function verifier(source, v) {
  const { corrections } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** √n simplifié par la recherche du plus grand carré, et lu « = k√m$ ». */
  const simp = (k, n, suffixe = "$") => {
    const s = simplifie(n);
    v.ok(`${k}. √${n} = ${racTex(s)} (${n} = ${s.k}² × ${s.m}, et ${s.m} sans carré)`, s.k * s.k * s.m === n && sansCarre(s.m));
    dit(k, `= ${racTex(s)}${suffixe}`);
    return s;
  };

  v.titre("★ Un seul geste");
  v.ok("1. 9² = 81, 0,3² = 0,09, (2/3)² = 4/9, 0² = 0", 9 * 9 === 81 && egal(fois(D("0,3"), D("0,3")), D("0,09")) && egal(fois(Q(2, 3), Q(2, 3)), Q(4, 9)));
  dit(1, "\\sqrt{81} = 9$");
  dit(1, "\\sqrt{0{,}09} = 0{,}3$");
  dit(1, "= \\dfrac{2}{3}$");
  dit(1, "\\sqrt{0} = 0$");
  v.ok("1. le piège : 0,03² = 0,0009", egal(fois(D("0,03"), D("0,03")), D("0,0009")));
  dit(1, `0{,}03^2 = ${tex(fois(D("0,03"), D("0,03")))}$`);

  const existe = [-16, 3 - 5, 5 - 3].map((x) => x >= 0);
  v.ok("2. √(−16) et √(3 − 5) n'existent pas, √(5 − 3) existe", JSON.stringify(existe) === "[false,false,true]");
  dit(2, `-\\sqrt{16} = ${-Math.sqrt(16)}$`);
  dit(2, `3 - 5 = ${3 - 5}$`);
  dit(2, `\\sqrt{5 - 3} = \\sqrt{2} \\approx ${arrondi(Math.SQRT2, 2)}$`);

  for (const [x, phrase] of [[-6, "= \\sqrt{36} = 6$"], [3, "\\sqrt{3^2} = \\sqrt{9} = 3$"], [-0.5, "\\sqrt{(-0{,}5)^2} = 0{,}5$"], [-10, "\\sqrt{x^2} = 10$"]]) {
    v.ok(`3. √((${x})²) = |${x}|`, proche(Math.sqrt(x * x), Math.abs(x)));
    dit(3, phrase);
  }

  v.ok("4. 2 × 8 = 16 = 4², 3 × 27 = 81 = 9², 25 × 36 = 900 = 30²", 2 * 8 === 16 && 3 * 27 === 81 && 25 * 36 === 30 * 30);
  dit(4, "= \\sqrt{16} = 4$");
  dit(4, "= \\sqrt{81} = 9$");
  dit(4, "5 \\times 6 = 30$");

  v.ok("5. (√7)² = 7, √5 × √5 = 5, (3√2)² = 18", proche(Math.sqrt(7) ** 2, 7) && proche(Math.sqrt(5) * Math.sqrt(5), 5) && proche((3 * Math.SQRT2) ** 2, 18));
  dit(5, "\\left(\\sqrt{7}\\right)^2 = 7$");
  dit(5, "\\left(\\sqrt{5}\\right)^2 = 5$");
  dit(5, "9 \\times 2 = 18$");

  simp(6, 12);
  simp(6, 45);
  simp(6, 98);

  v.ok("7. 2√20 = √80, mais 20 contient encore un carré", 4 * 20 === 80 && !sansCarre(20));
  dit(7, "2\\sqrt{20} = 2 \\times 2\\sqrt{5} = 4\\sqrt{5}$");
  simp(7, 80, "$ en une seule étape");
  simp(7, 300);

  dit(8, `= ${2 + 5}\\sqrt{3}$`);
  dit(8, `= ${7 - 1}\\sqrt{5}$`);
  v.ok("8. √9 + √16 = 7 mais √(9 + 16) = 5", Math.sqrt(9) + Math.sqrt(16) === 7 && Math.sqrt(9 + 16) === 5);
  dit(8, "3 + 4 = 7$");
  dit(8, "\\sqrt{25} = 5$");

  v.titre("★★ Type devoir");
  /** Une somme de racines ramenée à a√m : chaque terme simplifié par la
   *  recherche du carré, et la somme comparée en décimal. */
  const somme = (k, termes, m, phraseFinale) => {
    let a = 0;
    for (const [coef, n] of termes) {
      const s = simplifie(n);
      v.ok(`${k}. ${coef}√${n} a bien le radical √${m}`, s.m === m);
      a += coef * s.k;
    }
    const decimal = termes.reduce((t, [coef, n]) => t + coef * Math.sqrt(n), 0);
    v.ok(`${k}. la somme vaut ${a}√${m} (${decimal.toFixed(6)})`, proche(decimal, a * Math.sqrt(m)));
    dit(k, phraseFinale(a));
  };
  somme(9, [[1, 45], [1, 20]], 5, (a) => `= ${a}\\sqrt{5}$.`);
  v.ok("9. et ce n'est pas √65", !proche(Math.sqrt(45) + Math.sqrt(20), Math.sqrt(65)));
  somme(10, [[1, 27], [-1, 12], [1, 3]], 3, (a) => `(3 - 2 + 1)\\sqrt{3} = ${a}\\sqrt{3}$`);
  somme(11, [[2, 50], [-3, 18], [1, 32]], 2, (a) => `(10 - 9 + 4)\\sqrt{2} = ${a}\\sqrt{2}$`);
  v.ok("11. 2 × 5 = 10, 3 × 3 = 9, 10 − 9 + 4 = 5", 2 * simplifie(50).k === 10 && 3 * simplifie(18).k === 9 && 10 - 9 + 4 === 5);

  v.ok("12. √3 × √12 = √36 = 6, et D = 6 − 2√3", 3 * 12 === 36 && proche(Math.sqrt(3) * (Math.sqrt(12) - 2), 6 - 2 * Math.sqrt(3)));
  dit(12, "= \\sqrt{36} = 6$");
  dit(12, "$D = 6 - 2\\sqrt{3}$");

  v.ok("13. (√5 + 1)(√5 − 1) = 4", proche((Math.sqrt(5) + 1) * (Math.sqrt(5) - 1), 4));
  dit(13, "$E = 5 - 1 = 4$");

  // En fractions exactes : 2 − 2,24 et 3 − 2,24, lus dans le corrigé.
  dit(14, `2 - 2{,}24 = ${tex(moins(Q(2), D("2,24")))}$`);
  dit(14, `3 - 2{,}24 = ${tex(moins(Q(3), D("2,24")))}$`);
  v.ok("14. 2 − √5 < 0 < 3 − √5", 2 - Math.sqrt(5) < 0 && 3 - Math.sqrt(5) > 0);
  v.ok("14. √((2 − √5)²) = √5 − 2 et √((3 − √5)²) = 3 − √5", proche(Math.sqrt((2 - Math.sqrt(5)) ** 2), Math.sqrt(5) - 2) && proche(Math.sqrt((3 - Math.sqrt(5)) ** 2), 3 - Math.sqrt(5)));
  dit(14, "\\right)^2} = \\sqrt{5} - 2$");
  dit(14, "\\right)^2} = 3 - \\sqrt{5}$");

  const verdicts = [
    proche(Math.sqrt(9 + 16), Math.sqrt(9) + Math.sqrt(16)),
    [[2, 8], [3, 12], [0, 5], [7, 11]].every(([a, b]) => proche(Math.sqrt(a * b), Math.sqrt(a) * Math.sqrt(b))),
    proche(Math.SQRT2 + Math.SQRT2, Math.sqrt(4)),
    proche(Math.SQRT2 + Math.SQRT2, Math.sqrt(8)),
  ];
  v.ok("15. faux, vrai, faux, vrai", JSON.stringify(verdicts) === "[false,true,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(15, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
  dit(15, `\\approx ${arrondi(2 * Math.SQRT2, 2)}$`);

  v.ok("16. √1 = 1, 1,5² = 2,25, 3² = 9, 0,5² = 0,25", egal(fois(D("1,5"), D("1,5")), D("2,25")) && egal(fois(D("0,5"), D("0,5")), D("0,25")));
  dit(16, "\\sqrt{2{,}25} = 1{,}5$");
  // Le point du dessin est bien celui du corrigé.
  v.ok("16. le dessin marque (2,25 ; 1,5)", source.includes("x: 2.25, y: 1.5") && Math.sqrt(2.25) === 1.5);
  dit(16, "$x = 3^2 = 9$");
  dit(16, `\\sqrt{0{,}5} \\approx ${arrondi(Math.sqrt(0.5), 2)}$`);
  v.ok("16. 0,5² < 0,5 < √0,5", 0.25 < 0.5 && 0.5 < Math.sqrt(0.5));
  dit(16, "0{,}5^2 < 0{,}5 < \\sqrt{0{,}5}$");

  v.titre("★★★ Problèmes");
  v.ok("17. 20² + 10² = 500", 20 ** 2 + 10 ** 2 === 500);
  simp(17, 500, "$ m");
  const d17 = 10 * Math.sqrt(5);
  dit(17, `\\approx ${arrondi(d17, 2)}$ m`);
  dit(17, `= ${tex(D((30 - Number(d17.toFixed(2))).toFixed(2)))}$ m`);

  v.ok("18. AB² = 12, BC² = 27, AC² = 39 et 12 + 27 = 39", 4 * 3 === 12 && 9 * 3 === 27 && 12 + 27 === 39);
  dit(18, "= 12 + 27 = 39 = AC^2$");
  v.ok("18. 39 est sans carré : le périmètre 5√3 + √39 ne se réduit pas", sansCarre(39) && sansCarre(3));
  dit(18, "= 5\\sqrt{3} + \\sqrt{39}$");
  v.ok("18. aire = (2√3 × 3√3) ÷ 2 = 9", proche((2 * Math.sqrt(3) * 3 * Math.sqrt(3)) / 2, 9));
  dit(18, "= 9$ cm²");

  simp(19, 28, "$ cm");
  simp(19, 56, "$ cm");
  v.ok("19. 56 = 2 × 28, et √56 est bien la diagonale d'un carré de côté √28", 56 === 2 * 28 && proche(Math.hypot(Math.sqrt(28), Math.sqrt(28)), Math.sqrt(56)));
  dit(19, "$d^2 = 56$ cm²");

  dit(20, `\\approx ${arrondi(29.7 / 21, 3)}$`);
  v.ok("20. 29,7 ÷ 21 et √2 ont le même arrondi au millième", (29.7 / 21).toFixed(3) === Math.SQRT2.toFixed(3));
  v.ok("20. 1 ÷ (√2 ÷ 2) = √2", proche(1 / (Math.SQRT2 / 2), Math.SQRT2));
  dit(20, "= \\sqrt{2}$.");
  dit(20, `${Math.round(Math.SQRT2 * 100)}\\,\\%$`);
}

lancer({
  nom: "LA RACINE CARRÉE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-racines.tsx",
  notionId: "racine_carree_2de",
  verifier,
  casses: [
    ["ex. 6 : √45 = 5√3", "\\\\sqrt{9} \\\\times \\\\sqrt{5} = 3\\\\sqrt{5}$", "\\\\sqrt{9} \\\\times \\\\sqrt{5} = 5\\\\sqrt{3}$"],
    ["ex. 7 : on s'arrête à 2√20", "donc $\\\\sqrt{80} = 4\\\\sqrt{5}$ en une seule étape", "donc $\\\\sqrt{80} = 2\\\\sqrt{20}$ en une seule étape"],
    ["ex. 9 : A = √65", "= 5\\\\sqrt{5}$.\\n⛔", "= \\\\sqrt{65}$.\\n⛔"],
    ["ex. 11 : le coefficient de départ oublié", "(10 - 9 + 4)\\\\sqrt{2} = 5\\\\sqrt{2}$", "(10 - 9 + 4)\\\\sqrt{2} = 4\\\\sqrt{2}$"],
    ["ex. 14 : la racine rend un négatif", "= \\\\sqrt{5} - 2$", "= 2 - \\\\sqrt{5}$"],
    ["ex. 15 : √2 + √2 = √4 déclaré vrai", "c) FAUX.", "c) VRAI."],
    ["ex. 17 : un arrondi faux", "\\\\approx 22{,}36$ m", "\\\\approx 22{,}37$ m"],
    ["ex. 18 : l'aire fausse", "= 9$ cm²", "= 18$ cm²"],
    ["ex. 20 : le piège du zoom", "c'est le zoom de $141\\\\,\\\\%$", "c'est le zoom de $200\\\\,\\\\%$"],
    ["une micro inconnue du coach", "micros: [\"racine_domaine\"],\n        },\n        {\n          enonce: \"Calculer.", "micros: [\"racine_inconnue\"],\n        },\n        {\n          enonce: \"Calculer."],
    ["un $ dans un canvas", "values: [\"3√5\"", "values: [\"$3\\\\sqrt{5}$\""],
  ],
});
