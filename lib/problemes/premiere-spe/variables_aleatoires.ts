// Énigmes à projeter — première spé maths, notion variables_aleatoires
// (la pêche aux canards, les buts du club de hockey, le barista, la loterie du
// village, piège des boîtes mystère, défi des petits chevaux). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { frac } from "../outils";

/** Un tableau de loi à deux lignes : valeurs (en bleu) et probabilités. */
const loi = (titre: string, vals: string[], probas: string[], y = 60) =>
  tableau(25, y, [110, ...vals.map(() => 330 / vals.length)], 64, [[titre, ...vals], ["proba", ...probas]],
    (i, j) => (j === 0 ? C.pale : i === 0 ? C.bleu : C.craie), 22);

const canards = svg("La pêche aux canards : 10 canards valent 0 point, 6 valent 1 point, 3 valent 2 points, 1 vaut 5 points",
  tableau(25, 60, [110, 82, 82, 82, 84], 64, [["points", 0, 1, 2, 5], ["canards", 10, 6, 3, 1]],
    (i, j) => (j === 0 ? C.pale : i === 0 ? C.bleu : j >= 3 ? C.jaune : C.craie), 24) +
    t(240, 250, "20 canards · on en pêche un au hasard", C.pale, 22) + t(240, 370, `P(X ≥ 2)${NB}?`, C.rose, 30));

const hockey = svg("Loi du nombre de buts par match : 0 but avec 0,1, 1 but avec 0,3, 2 buts avec 0,4, 3 buts avec 0,2",
  loi("buts", ["0", "1", "2", "3"], ["0,1", "0,3", "0,4", "0,2"]) + t(240, 360, `E(X)${NB}?`, C.rose, 30));

const barista = svg("Loi du temps de préparation du barista : 2 minutes avec 0,5, 6 minutes avec 0,5 ; l'espérance vaut 4 minutes",
  loi("temps", ["2 min", "6 min"], ["0,5", "0,5"]) + t(240, 270, "E(X) = 4 min", C.jaune, 24) + t(240, 370, `σ(X)${NB}?`, C.rose, 30));

const loterie = svg("Loi du lot d'un billet de la loterie : 0 euro avec 0,7, 5 euros avec 0,25, 50 euros avec une probabilité inconnue",
  loi("lot", ["0 €", "5 €", "50 €"], ["0,7", "0,25", "?"]) + t(240, 360, `E(X)${NB}?`, C.rose, 30));

const boites = svg("Les boîtes mystère : un objet de 1 euro avec 0,9, de 10 euros avec 0,09, de 100 euros avec 0,01 ; Sacha fait la moyenne des trois valeurs",
  loi("valeur", ["1 €", "10 €", "100 €"], ["0,9", "0,09", "0,01"], 40) +
    t(240, 250, "Sacha : « (1 + 10 + 100) ÷ 3 = 37 € »", C.bleu, 22) + t(240, 370, `E(X)${NB}?`, C.rose, 30));

const chevaux = (() => {
  let s = t(118, 48, "max", C.pale, 20);
  for (let i = 1; i <= 6; i++) s += t(130 + 46 * i, 48, i, C.bleu, 22) + t(130, 42 + 42 * i + 6, i, C.bleu, 22);
  for (let i = 1; i <= 6; i++)
    for (let j = 1; j <= 6; j++) {
      const x = 130 + 46 * j, y = 48 + 42 * i, m = Math.max(i, j);
      if (m === 6) s += r(x - 21, y - 29, 42, 38, C.jaune, 0.3, 2, 6);
      s += t(x, y, m, m === 6 ? C.jaune : C.craie, 22);
    }
  return svg("Tableau des 36 lancers de deux dés : dans chaque case, le plus grand des deux ; le 6 apparaît 11 fois",
    s + l(100, 62, 440, 62, C.pale, 2) + l(152, 22, 152, 315, C.pale, 2) + t(240, 385, `E(X)${NB}?`, C.rose, 30));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "variables_aleatoires",
  titre: "Énigmes des variables aléatoires",
  description: "La pêche aux canards, les buts du club de hockey, le barista, la loterie du village, le piège des boîtes mystère, le défi des petits chevaux : loi d'une variable aléatoire, P(X ≥ a), espérance, écart-type, probabilité manquante.",
  problemes: [
    {
      tag: "Énigme 1 · La pêche aux canards",
      titre: "Lire une loi",
      question: `À la fête, 20 canards flottent : 10 valent 0 point, 6 valent 1 point, 3 valent 2 points et 1 vaut 5 points. On en pêche un au hasard. X est le nombre de points.<br><br><b>Que vaut P(X ≥ 2)</b> ?`,
      reponse: `{X ≥ 2} : le canard vaut 2 ou 5 points. Il y en a 3 + 1 = 4.<br>P(X ≥ 2) = ${frac(4, 20)} = <span class="big">0,2</span>.`,
      consigne: "20 canards : 10 à 0 point, 6 à 1, 3 à 2, 1 à 5. Que vaut P(X ≥ 2) ?",
      verification: { type: "courte", attendus: ["0,2", "0.2", "1/5", "4/20", "20%", "20 %"] },
      dessin: canards,
    },
    {
      tag: "Énigme 2 · Le club de hockey",
      titre: "Calculer une espérance",
      question: `X est le nombre de buts marqués par un club de hockey lors d'un match (loi au tableau).<br><br><b>Que vaut E(X)</b> ?`,
      reponse: `E(X) = 0 × 0,1 + 1 × 0,3 + 2 × 0,4 + 3 × 0,2 = 0 + 0,3 + 0,8 + 0,6.<br>E(X) = <span class="big">1,7</span> : en moyenne, 1,7 but par match sur un grand nombre de matchs.`,
      consigne: "X = 0 (0,1), 1 (0,3), 2 (0,4), 3 (0,2) : que vaut E(X) ?",
      verification: { type: "courte", attendus: ["1,7", "1.7"] },
      dessin: hockey,
    },
    {
      tag: "Énigme 3 · Le barista",
      titre: "Calculer un écart-type",
      question: `Un barista prépare un café en 2 min (probabilité 0,5) ou en 6 min (probabilité 0,5). L'espérance du temps X vaut 4 min.<br><br><b>Que vaut l'écart-type σ(X)</b> ?`,
      reponse: `V(X) = 0,5 × (2 − 4)² + 0,5 × (6 − 4)² = 2 + 2 = 4 (min²).<br>σ(X) = √4 = <span class="big">2 min</span> : le temps s'écarte en moyenne de 2 min de 4 min.`,
      consigne: "X = 2 min (0,5) ou 6 min (0,5), E(X) = 4 min : que vaut σ(X) ?",
      verification: { type: "qcm", choix: ["4 min", "2 min", "16 min"], bonne: 1 },
      dessin: barista,
    },
    {
      tag: "Énigme 4 · La loterie du village",
      titre: "Une probabilité manquante",
      question: `À la loterie du village, un billet donne un lot X : 0 € (probabilité 0,7), 5 € (0,25) ou 50 €. La probabilité du lot de 50 € est effacée.<br><br><b>Que vaut E(X)</b> ?`,
      reponse: `Les probabilités font 1 : P(X = 50) = 1 − 0,7 − 0,25 = 0,05.<br>E(X) = 0 + 5 × 0,25 + 50 × 0,05 = 1,25 + 2,5 = <span class="big">3,75 €</span>.`,
      consigne: "Lot : 0 € (0,7), 5 € (0,25), 50 € (probabilité effacée). Que vaut E(X) ?",
      verification: { type: "courte", attendus: ["3,75", "3.75"], unite: "€" },
      dessin: loterie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les boîtes mystère",
      sorte: "piege",
      question: `Une boutique vend des boîtes mystère. L'objet vaut 1 € (probabilité 0,9), 10 € (0,09) ou 100 € (0,01).<br>Sacha : « En moyenne, (1 + 10 + 100) ÷ 3 = 37 €. »<br><br><b>Que vaut E(X)</b> ?`,
      reponse: `Les trois valeurs ne sont pas également probables : on pondère par les probabilités.<br>E(X) = 1 × 0,9 + 10 × 0,09 + 100 × 0,01 = 0,9 + 0,9 + 1 = <span class="big">2,80 €</span>.`,
      consigne: "X = 1 € (0,9), 10 € (0,09), 100 € (0,01) : que vaut E(X) ?",
      verification: { type: "qcm", choix: ["2,80 €", "37 €", "111 €"], bonne: 0 },
      dessin: boites,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les petits chevaux",
      sorte: "defi",
      question: `Aux petits chevaux, Mamie invente une règle : on lance deux dés et on avance du plus grand des deux. X est ce plus grand nombre.<br><br><b>Que vaut E(X)</b>, environ ?`,
      reponse: `Le tableau compte 2k − 1 cases où le plus grand vaut k : P(X = k) = ${frac("2k − 1", 36)}.<br>E(X) = ${frac("1×1 + 2×3 + 3×5 + 4×7 + 5×9 + 6×11", 36)} = ${frac(161, 36)} ≈ <span class="big">4,47</span> (bien plus que 3,5 avec un seul dé).`,
      consigne: "Deux dés, X = le plus grand des deux : que vaut E(X), environ ?",
      verification: { type: "qcm", choix: ["3,5", "6", "environ 4,47"], bonne: 2 },
      dessin: chevaux,
    },
  ],
};

export default problemes;
