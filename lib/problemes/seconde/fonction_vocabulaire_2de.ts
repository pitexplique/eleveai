// Énigmes à projeter — seconde, notion fonction_vocabulaire_2de (la
// calculatrice programmée, les antécédents de 9, la racine qui refuse, l'appli
// de sport, piège f(a + 1), défi du compteur f(x + 1) = f(x) + 3). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const calculatrice = svg(
  "Une calculatrice programmée avec f de x égale x au carré moins 4x",
  r(140, 40, 200, 300, C.craie, 0.08, 4, 18) + r(160, 60, 160, 70, C.bleu, 0.15, 3, 6) + t(240, 105, "f(−1) = ?", C.craie, 26).replace(" ?", `${NB}?`) +
    [0, 1, 2].map((i) => [0, 1, 2].map((j) => r(165 + 52 * j, 150 + 48 * i, 40, 36, C.pale, 0.3, 2, 6)).join("")).join("") + t(240, 385, "f(x) = x² − 4x", C.bleu, 28)
);

const carre = (() => {
  const R = repere(-4, 4, 0, 12, { gl: 320, gh: 300, gy: 30, gx: 80, pas: 1, pasE: 2 });
  return svg("La parabole de f de x égale x au carré et la droite horizontale y égale 9",
    R.fond + R.courbe((x) => x * x, -3.4, 3.4, C.bleu, 4) + l(R.X(-4), R.Y(9), R.X(4), R.Y(9), C.rose, 3, "10 6") + t(R.X(4) + 6, R.Y(9) + 6, "9", C.rose, 22, "start") +
      t(240, 400, `antécédents de 9${NB}?`, C.rose, 24));
})();

const racine = svg(
  "La fonction racine de x moins 2 et la question de son ensemble de définition",
  t(240, 140, "f(x) = √(x − 2)", C.bleu, 44) + t(240, 220, "f(1) = √(−1)  ✗", C.rose, 28) + t(240, 265, "f(6) = √4 = 2  ✓", C.jaune, 28) + t(240, 350, `pour quels x${NB}?`, C.craie, 28)
);

const sport = svg(
  "Une montre de sport : 8 kilocalories par minute",
  o(240, 170, 90, C.craie, 0.06, 5) + r(220, 50, 40, 32, C.pale, 0.4, 2, 4) + r(220, 258, 40, 32, C.pale, 0.4, 2, 4) +
    t(240, 160, "f(t) = 8t", C.bleu, 30) + t(240, 200, "kcal", C.pale, 20) + t(240, 340, "200 kcal", C.craie, 28) + t(240, 385, `en combien de minutes${NB}?`, C.rose, 24)
);

const piege = svg(
  "Au tableau : f de x égale 2x plus 1, et f de a plus 1",
  t(240, 150, "f(x) = 2x + 1", C.bleu, 44) + t(240, 250, "f(a + 1) = ?", C.rose, 44).replace(" ?", `${NB}?`)
);

const compteur = svg(
  "Un compteur : on part de 2 et on ajoute 3 à chaque pas",
  [0, 1, 2, 3].map((k) => r(40 + 105 * k, 120, 80, 80, k ? C.bleu : C.jaune, 0.15, 3, 10) + t(80 + 105 * k, 172, [2, 5, 8, 11][k], C.craie, 32) + t(80 + 105 * k, 100, `f(${k})`, C.pale, 20) +
    (k < 3 ? p(`M${122 + 105 * k} 160 l20 0`, C.rose, 3) : "")).join("") + t(240, 270, "+ 3 à chaque pas", C.rose, 26) + t(240, 350, `f(10)${NB}?`, C.craie, 34)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "fonction_vocabulaire_2de",
  titre: "Énigmes du vocabulaire des fonctions",
  description: "La calculatrice programmée, les antécédents de 9, la racine qui refuse les négatifs, l'appli de sport, le piège f(a + 1), le défi du compteur : image, antécédent, ensemble de définition, courbe.",
  problemes: [
    {
      tag: "Énigme 1 · La calculatrice",
      titre: "Une image",
      question: `Une calculatrice est programmée avec <b>f(x) = x² − 4x</b>.<br><br><b>Quelle est l'image</b> de −1 ?`,
      reponse: `f(−1) = (−1)² − 4 × (−1) = 1 + 4 = <span class="big">5</span>.<br>Les parenthèses autour de −1 évitent l'erreur −1² = −1.`,
      consigne: "Quelle est l'image de −1 par f(x) = x² − 4x ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: calculatrice,
    },
    {
      tag: "Énigme 2 · Les antécédents",
      titre: "Le carré qui vaut 9",
      question: `f est la fonction carré : <b>f(x) = x²</b>.<br><br><b>Quels sont</b> les antécédents de 9 ?`,
      reponse: `On cherche x tel que x² = 9 : x = 3 ou x = −3, car (−3)² = 9 aussi.<br>Antécédents : <span class="big">−3 et 3</span>. La droite y = 9 coupe la courbe deux fois.`,
      consigne: "Quels sont les antécédents de 9 par la fonction carré ?",
      verification: { type: "qcm", choix: ["3 seulement", "81", "−3 et 3"], bonne: 2 },
      dessin: carre,
    },
    {
      tag: "Énigme 3 · La racine",
      titre: "Où est-elle définie ?",
      question: `f(x) = <b>√(x − 2)</b>.<br><br><b>Quel est l'ensemble de définition</b> de f ?`,
      reponse: `Une racine carrée n'existe que pour un nombre positif ou nul : x − 2 ≥ 0, soit x ≥ 2.<br>D = <span class="big">[2 ; +∞[</span>. Le 2 est compris : f(2) = √0 = 0.`,
      consigne: "Ensemble de définition de √(x − 2) ?",
      verification: { type: "qcm", choix: ["[2 ; +∞[", "]2 ; +∞[", "tous les réels"], bonne: 0 },
      dessin: racine,
    },
    {
      tag: "Énigme 4 · L'appli de sport",
      titre: "200 kcal",
      question: `Une appli de sport compte <b>f(t) = 8t</b> kilocalories pour t minutes de course.<br><br><b>Combien de minutes</b> faut-il pour 200 kcal ?`,
      reponse: `On cherche l'antécédent de 200 : 8t = 200, donc t = 200 ÷ 8 = <span class="big">25 minutes</span>.`,
      consigne: "Quel est l'antécédent de 200 par f(t) = 8t ?",
      verification: { type: "courte", attendus: ["25"], unite: "min" },
      dessin: sport,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "f(a + 1)",
      sorte: "piege",
      question: `f(x) = 2x + 1.<br><br><b>Que vaut</b> f(a + 1) ?<br>A. 2a + 2 B. 2a + 3 C. a + 2`,
      reponse: `On remplace <b>x</b> par (a + 1), en entier : f(a + 1) = 2(a + 1) + 1 = 2a + 2 + 1 = <span class="big">2a + 3</span>.<br>2a + 2, c'est f(a) + 1 : ce n'est pas pareil !`,
      consigne: "f(x) = 2x + 1 : que vaut f(a + 1) ?",
      verification: { type: "qcm", choix: ["2a + 2", "2a + 3", "a + 2"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le compteur",
      sorte: "defi",
      question: `Une fonction vérifie <b>f(0) = 2</b> et, pour tout x, <b>f(x + 1) = f(x) + 3</b>.<br><br><b>Combien vaut</b> f(10) ?`,
      reponse: `De 0 à 10, on fait 10 pas de 1, et chaque pas ajoute 3.<br>f(10) = 2 + 10 × 3 = <span class="big">32</span>.<br>On devine f(x) = 3x + 2 pour les entiers.`,
      consigne: "Combien vaut f(10) ?",
      verification: { type: "courte", attendus: ["32"] },
      dessin: compteur,
    },
  ],
};

export default problemes;
