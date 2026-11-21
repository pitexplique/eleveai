// Énigmes à projeter — seconde, notion polynomes_division (le bénéfice nul,
// la division par x − 1, les trois productions, la méthode de Horner, piège
// du reste par x + 1, défi du nombre a). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const B = (x: number) => x ** 3 - 6 * x * x + 11 * x - 6;

const benefice = svg(
  "Le bénéfice B de x égale x au cube moins 6 x carré plus 11 x moins 6, et la question B de 1",
  t(240, 120, "B(x) = x³ − 6x² + 11x − 6", C.bleu, 30) + t(240, 180, "B en milliers d'euros", C.pale, 20) + t(240, 210, "x en milliers d'objets", C.pale, 20) +
    t(240, 320, `B(1)${NB}?`, C.rose, 34)
);

// La division posée de x³ − 6x² + 11x − 6 par x − 1.
const division = svg(
  "La division de x cube moins 6 x carré plus 11 x moins 6 par x moins 1, le quotient est à trouver",
  t(40, 90, "x³ − 6x² + 11x − 6", C.craie, 26, "start") + l(300, 60, 300, 200, C.craie, 3) + l(300, 105, 450, 105, C.craie, 3) +
    t(315, 92, "x − 1", C.bleu, 26, "start") + t(315, 145, "?", C.rose, 30, "start") +
    t(40, 140, "reste : 0", C.pale, 22, "start") + t(240, 290, "(x − 1) × Q(x) = B(x)", C.craie, 24) + t(240, 360, `le quotient Q(x)${NB}?`, C.rose, 26)
);

const productions = (() => {
  const R = repere(0, 4, -2, 2, { gl: 340, gh: 280, gy: 30, gx: 80, pasE: 1 });
  return svg("La courbe du bénéfice, qui coupe l'axe des abscisses en 1, 2 et 3",
    R.fond + R.courbe(B, 0.6, 3.4, C.bleu, 5) + R.point(1, 0, C.rose, 7) + t(R.X(4) - 4, R.Y(1.6), "B", C.bleu, 22, "end") +
      t(240, 380, "B(x) = (x − 1)(x² − 5x + 6)", C.craie, 20) + t(240, 410, `la plus grande racine${NB}?`, C.rose, 24));
})();

// Le tableau de Horner : 2, −3, 4, −5 en x = 2.
const horner = svg(
  "Le tableau de Horner pour 2 x cube moins 3 x carré plus 4 x moins 5, en x égale 2",
  t(240, 60, "P(x) = 2x³ − 3x² + 4x − 5", C.craie, 26) +
    [2, "−3", 4, "−5"].map((v, k) => t(150 + 80 * k, 130, v, C.craie, 26)).join("") + t(70, 190, "x = 2", C.bleu, 22) +
    l(100, 150, 440, 150, C.craie, 2) + l(100, 210, 440, 210, C.craie, 3) + l(110, 100, 110, 250, C.craie, 3) +
    t(150, 245, 2, C.bleu, 26) + t(230, 245, 1, C.bleu, 26) + t(310, 245, "?", C.rose, 26) + t(390, 245, "?", C.rose, 26) +
    t(230, 185, 4, C.pale, 20) + t(310, 185, "?", C.pale, 20) + t(390, 185, "?", C.pale, 20) +
    t(240, 340, `P(2)${NB}?`, C.rose, 30)
);

const reste = svg(
  "Au tableau : P de x égale x cube plus 2x moins 1, divisé par x plus 1",
  t(240, 110, "P(x) = x³ + 2x − 1", C.craie, 30) + t(240, 180, "divisé par  x + 1", C.bleu, 28) + r(130, 220, 220, 60, C.rose, 0.08, 3, 10) +
    t(240, 260, `le reste = P(1)${NB}?`, C.rose, 26)
);

const nombreA = svg(
  "x moins 2 divise x cube plus a x moins 4 : trouver a",
  t(240, 110, "x³ + ax − 4", C.craie, 34) + t(240, 180, "est divisible par", C.pale, 22) + t(240, 240, "x − 2", C.bleu, 34) +
    t(240, 360, `a${NB}?`, C.rose, 34)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "polynomes_division",
  titre: "Énigmes des polynômes",
  description: "Le bénéfice nul, la division par x − 1, les trois productions, la méthode de Horner, le piège du reste par x + 1, le défi du nombre a : racine d'un polynôme, division euclidienne, factorisation, Horner.",
  problemes: [
    {
      tag: "Énigme 1 · Le bénéfice nul",
      titre: "Une racine évidente",
      question: `Le bénéfice d'une entreprise est <b>B(x) = x³ − 6x² + 11x − 6</b> milliers d'euros, pour x milliers d'objets.<br><br><b>Que vaut</b> B(1) ?`,
      reponse: `B(1) = 1 − 6 + 11 − 6 = <span class="big">0</span>.<br>Le bénéfice est nul pour 1 000 objets : 1 est une <b>racine</b> de B.`,
      consigne: "B(x) = x³ − 6x² + 11x − 6. Que vaut B(1) ?",
      verification: { type: "courte", attendus: ["0"] },
      dessin: benefice,
    },
    {
      tag: "Énigme 2 · La division",
      titre: "Diviser par x − 1",
      question: `1 est racine de B(x) = x³ − 6x² + 11x − 6, donc B(x) = (x − 1) × Q(x).<br><br><b>Quel est</b> le polynôme Q(x) ?`,
      reponse: `On pose la division : x³ ÷ x = x², puis −5x², puis +6.<br>Q(x) = <span class="big">x² − 5x + 6</span>. Vérification : (x − 1)(x² − 5x + 6) = x³ − 6x² + 11x − 6.`,
      consigne: "x³ − 6x² + 11x − 6 = (x − 1) × Q(x). Quel est Q(x) ?",
      verification: { type: "qcm", choix: ["x² − 5x + 6", "x² − 6x + 11", "x² + 5x − 6"], bonne: 0 },
      dessin: division,
    },
    {
      tag: "Énigme 3 · Les trois productions",
      titre: "Toutes les racines",
      question: `B(x) = (x − 1)(x² − 5x + 6).<br><br>Le bénéfice est nul pour trois productions. <b>Quelle est la plus grande</b>, en milliers d'objets ?`,
      reponse: `x² − 5x + 6 = (x − 2)(x − 3) : deux nombres de somme 5 et de produit 6.<br>Racines : 1, 2 et 3. La plus grande : <span class="big">3</span>, soit 3 000 objets.`,
      consigne: "B(x) = (x − 1)(x² − 5x + 6). Quelle est la plus grande racine ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: productions,
    },
    {
      tag: "Énigme 4 · La méthode de Horner",
      titre: "Sans calculer de puissance",
      question: `P(x) = 2x³ − 3x² + 4x − 5. Horner : on part de 2, puis on fait « × 2, + le coefficient suivant », trois fois.<br><br><b>Que vaut</b> P(2) ?`,
      reponse: `2 → 2 × 2 − 3 = 1 → 1 × 2 + 4 = 6 → 6 × 2 − 5 = 7.<br>P(2) = <span class="big">7</span>. Vérification : 16 − 12 + 8 − 5 = 7.`,
      consigne: "P(x) = 2x³ − 3x² + 4x − 5. Que vaut P(2) ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: horner,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le reste par x + 1",
      sorte: "piege",
      question: `Le reste de la division de P(x) par x − a vaut P(a).<br>P(x) = x³ + 2x − 1.<br><br><b>Quel est le reste</b> de la division de P(x) par <b>x + 1</b> ?`,
      reponse: `x + 1 = x − (−1) : ici a = −1, pas 1 !<br>P(−1) = −1 − 2 − 1 = <span class="big">−4</span>.`,
      consigne: "P(x) = x³ + 2x − 1. Reste de la division par x + 1 ?",
      verification: { type: "qcm", choix: ["2", "−4", "0"], bonne: 1 },
      dessin: reste,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre a",
      sorte: "defi",
      question: `On veut que x³ + ax − 4 soit divisible par x − 2.<br><br><b>Quelle valeur</b> faut-il donner à a ?`,
      reponse: `Divisible par x − 2 : le reste P(2) doit être nul.<br>8 + 2a − 4 = 0, donc 2a = −4, <span class="big">a = −2</span>. Vérification : x³ − 2x − 4 = (x − 2)(x² + 2x + 2).`,
      consigne: "Pour quelle valeur de a, x³ + ax − 4 est-il divisible par x − 2 ?",
      verification: { type: "qcm", choix: ["a = 2", "a = −4", "a = −2"], bonne: 2 },
      dessin: nombreA,
    },
  ],
};

export default problemes;
