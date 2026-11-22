// Énigmes à projeter — seconde, notion analyse_graphique_2de : une seule
// courbe (une ligne brisée, lecture exacte) par les points (−3 ; −1),
// (−1 ; 3), (1 ; −1), (3 ; 3), (5 ; 1). Lire une image, compter des
// antécédents, résoudre f(x) ≥ 3, le maximum, piège des coordonnées
// inversées, défi « exactement 3 solutions ». 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const PTS: [number, number][] = [[-3, -1], [-1, 3], [1, -1], [3, 3], [5, 1]];
const courbe = (extra: (R: ReturnType<typeof repere>) => string, label: string, bas: string) => {
  const R = repere(-4, 6, -2, 4, { gl: 380, gh: 300, gy: 30, gx: 60 });
  const d = PTS.map(([x, y], k) => `${k ? "L" : "M"}${R.X(x)} ${R.Y(y)}`).join(" ");
  return svg(label, R.fond + `<path d="${d}" fill="none" stroke="${C.bleu}" stroke-width="5" stroke-linejoin="round"/>` +
    t(R.X(4.2), R.Y(3.3), "courbe de f", C.bleu, 24) + extra(R) + t(240, 405, bas, C.rose, 24));
};
const horiz = (R: ReturnType<typeof repere>, y: number, c: string = C.rose) => l(R.X(-4), R.Y(y), R.X(6), R.Y(y), c, 3, "10 6");

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "analyse_graphique_2de",
  titre: "Énigmes de lecture graphique",
  description: "Une courbe à lire : une image, le nombre d'antécédents, résoudre f(x) ≥ 3, le maximum, le piège des coordonnées inversées, le défi des trois solutions : tout ce qui se lit sur la courbe d'une fonction.",
  problemes: [
    {
      tag: "Énigme 1 · Une image",
      titre: "Lire f(−1)",
      question: `Voici la courbe d'une fonction f, définie sur [−3 ; 5].<br><br><b>Combien vaut</b> f(−1) ?`,
      reponse: `On part de x = −1 sur l'axe horizontal, on monte jusqu'à la courbe, on lit la hauteur.<br>f(−1) = <span class="big">3</span>.`,
      consigne: "Combien vaut f(−1) sur la courbe ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: courbe((R) => l(R.X(-1), R.Y(0), R.X(-1), R.Y(3), C.jaune, 3, "8 6") + R.point(-1, 0, C.jaune, 7), "La courbe de f et le repère, avec x égale moins 1 marqué", `f(−1)${NB}?`),
    },
    {
      tag: "Énigme 2 · Des antécédents",
      titre: "Combien de fois 1 ?",
      question: `Sur la même courbe :<br><br><b>Combien d'antécédents</b> le nombre 1 a-t-il par f ?`,
      reponse: `On trace la droite horizontale y = 1 et on compte les points de rencontre avec la courbe.<br>x = −2, x = 0, x = 2 et x = 5 : <span class="big">4 antécédents</span>.`,
      consigne: "Combien d'antécédents a le nombre 1 ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: courbe((R) => horiz(R, 1), "La courbe de f et la droite horizontale y égale 1", `combien d'antécédents de 1${NB}?`),
    },
    {
      tag: "Énigme 3 · Une inéquation",
      titre: "f(x) ≥ 3",
      question: `Sur la même courbe :<br><br><b>Quelles sont les solutions</b> de f(x) ≥ 3 ?`,
      reponse: `On cherche les points de la courbe <b>sur ou au-dessus</b> de la droite y = 3.<br>La courbe ne fait que toucher cette droite, en x = −1 et x = 3.<br>Solutions : <span class="big">{−1 ; 3}</span>, deux nombres seulement.`,
      consigne: "Solutions de f(x) ≥ 3 sur la courbe ?",
      verification: { type: "qcm", choix: ["[−1 ; 3]", "{−1 ; 3}", "aucune"], bonne: 1 },
      dessin: courbe((R) => horiz(R, 3), "La courbe de f et la droite horizontale y égale 3", `f(x) ≥ 3${NB}?`),
    },
    {
      tag: "Énigme 4 · Le maximum",
      titre: "Le plus haut",
      question: `Sur la même courbe :<br><br><b>Quel est le maximum</b> de f sur [−3 ; 5] ?`,
      reponse: `Le point le plus haut de la courbe est à la hauteur 3, atteint deux fois : en x = −1 et en x = 3.<br>Le maximum est <span class="big">3</span>. (5 est une abscisse, pas une hauteur.)`,
      consigne: "Quel est le maximum de f sur [−3 ; 5] ?",
      verification: { type: "qcm", choix: ["5", "−1", "3"], bonne: 2 },
      dessin: courbe(() => "", "La courbe de f sur l'intervalle de moins 3 à 5", `le maximum${NB}?`),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Sur la courbe ?",
      sorte: "piege",
      question: `Sur la même courbe :<br><br><b>Lequel</b> de ces points est sur la courbe ?<br>A. (−1 ; 3) B. (3 ; −1) C. (3 ; 1)`,
      reponse: `Un point (x ; y) est sur la courbe quand y = f(x).<br>f(−1) = 3 : <span class="big">(−1 ; 3)</span> y est.<br>(3 ; −1) inverse les coordonnées : f(3) vaut 3, pas −1.`,
      consigne: "Quel point est sur la courbe de f ?",
      verification: { type: "qcm", choix: ["(−1 ; 3)", "(3 ; −1)", "(3 ; 1)"], bonne: 0 },
      dessin: courbe(() => "", "La courbe de f, trois points à tester", `lequel est sur la courbe${NB}?`),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Exactement 3 solutions",
      sorte: "defi",
      question: `Sur la même courbe, on fait glisser la droite horizontale y = m.<br><br><b>Pour quelles valeurs de m</b> l'équation f(x) = m a-t-elle <b>exactement 3</b> solutions ?`,
      reponse: `Pour m = 1 : 4 solutions ; entre 1 et 3 : 4 aussi. Pour m = −1 : 2 solutions (x = −3 et x = 1).<br>Entre −1 et 1, la droite coupe 3 segments seulement (le dernier reste entre 1 et 3).<br><span class="big">m ∈ ]−1 ; 1[</span>.`,
      consigne: "Pour quels m l'équation f(x) = m a-t-elle exactement 3 solutions ?",
      verification: { type: "courte", attendus: ["]−1;1[", "]-1;1["] },
      dessin: courbe((R) => horiz(R, 0.4, C.jaune) + t(R.X(5.6), R.Y(0.4) - 10, "y = m", C.jaune, 20, "end"), "La courbe de f et une droite horizontale mobile y égale m", `exactement 3 solutions${NB}?`),
    },
  ],
};

export default problemes;
