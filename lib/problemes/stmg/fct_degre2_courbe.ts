// Énigmes à projeter — STMG (1re), notion degré 2 : la parabole
// (l'arche gonflable de la course, les réflecteurs de lampes torches, le
// gravier du paysagiste, le fabricant de rollers, piège de l'arceau du casque
// audio, défi de la ligne électrique). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(-3, 3, 0, 5, { px: 1, py: 1 });
const arche = svg("L'arche gonflable d'arrivée : une parabole tournée vers le bas, sommet en (0 ; 4), qui touche le sol en moins 2 et 2",
  R1.fond + R1.courbe((x) => -x * x + 4, -2, 2, C.bleu, 5) + R1.point(0, 4, C.rose, 7) +
    t(R1.X(0) + 14, R1.Y(4) - 12, "(0 ; 4)", C.craie, 18, "start") +
    t(R1.X(-3) + 8, 24, "hauteur (m)", C.pale, 17, "start") +
    t(240, 400, `quelle expression${NB}?`, C.rose, 26));

const R2 = repereXY(-3, 3, 0, 5, { px: 1, py: 1 });
const lampes = svg("Deux réflecteurs de lampes torches : f de x égale 0,5 x au carré, large ; g de x égale 2 x au carré, étroite",
  R2.fond + R2.courbe((x) => 0.5 * x * x, -3, 3, C.bleu, 4) + R2.courbe((x) => 2 * x * x, -1.58, 1.58, C.jaune, 4) +
    t(448, R2.Y(4.5) + 6, "f", C.bleu, 22, "start") + t(R2.X(1.58) + 10, R2.Y(5) + 18, "g", C.jaune, 22, "start") +
    t(150, 376, "f(x) = 0,5x²", C.bleu, 20) + t(330, 376, "g(x) = 2x²", C.jaune, 20) +
    t(240, 410, `la plus étroite${NB}?`, C.rose, 24));

const gravier = svg("Le gravier du paysagiste : f de x égale 2 x au carré ; avec la livraison, g de x égale 2 x au carré plus 150 ; g de 10 ?",
  r(70, 60, 340, 80, C.bleu, 0.15, 3, 10) + t(240, 112, "f(x) = 2x²", C.craie, 30) +
    r(70, 160, 340, 80, C.jaune, 0.2, 3, 10) + t(240, 212, "g(x) = 2x² + 150", C.craie, 30) +
    t(240, 290, "courbe de g = courbe de f, 150 plus haut", C.pale, 20) + t(240, 360, `g(10)${NB}=${NB}?`, C.rose, 28));

const R4 = repereXY(0, 10, -20, 40, { px: 1, py: 10, ex: 100, ey: 20 });
const rollers = svg("Le fabricant de rollers : B de x égale moins 2 fois x moins 1 fois x moins 9 ; la parabole coupe l'axe en 1 et en un autre point",
  R4.fond + R4.courbe((x) => -2 * (x - 1) * (x - 9), 0.04, 10, C.bleu, 4) +
    R4.point(1, 0, C.rose, 7) + R4.point(9, 0, C.rose, 7) +
    t(R4.X(1) + 4, R4.Y(0) + 28, "1", C.craie, 20, "start") + t(R4.X(9) - 4, R4.Y(0) + 28, "?", C.rose, 24, "end") +
    t(R4.X(0) + 8, 24, "milliers d'€", C.pale, 17, "start") + t(462, R4.Y(0) - 10, "x", C.pale, 18, "end") +
    t(240, 400, "B(x) = −2(x − 1)(x − 9)", C.craie, 24));

const casque = svg("L'arceau du casque audio : f de x égale moins 3 x au carré ; Léa dit plus ouverte que x au carré",
  r(90, 70, 300, 90, C.bleu, 0.15, 3, 10) + t(240, 128, "f(x) = −3x²", C.craie, 34) +
    t(240, 230, "Léa : « −3 est petit »", C.pale, 24) + t(240, 280, "« donc plus ouverte que x² »", C.pale, 24) +
    t(240, 360, "?", C.rose, 34));

const R6 = repereXY(-10, 10, 0, 10, { px: 2, py: 1, ex: 5, ey: 2 });
const ligne = svg("La ligne électrique : un câble entre deux pylônes en moins 10 et 10 ; y égale 0,05 x au carré plus b ; 8 mètres aux pylônes",
  R6.fond + l(R6.X(-10) + 4, R6.Y(0), R6.X(-10) + 4, R6.Y(9), C.craie, 6) + l(R6.X(10) - 4, R6.Y(0), R6.X(10) - 4, R6.Y(9), C.craie, 6) +
    R6.courbe((x) => 0.05 * x * x + 3, -9.8, 9.8, C.jaune, 4) +
    t(R6.X(-10) + 4, R6.Y(9) - 10, "8 m", C.craie, 18) + t(R6.X(10) - 4, R6.Y(9) - 10, "8 m", C.craie, 18) +
    t(R6.X(0) + 12, R6.Y(3) + 30, "?", C.rose, 26, "start") +
    t(240, 400, "y = 0,05x² + b", C.craie, 24));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_degre2_courbe",
  titre: "Énigmes de paraboles",
  description: "L'arche gonflable de la course, les réflecteurs de lampes torches, le gravier du paysagiste, le fabricant de rollers, le piège de l'arceau du casque audio, le défi de la ligne électrique : associer une parabole à son expression, lire le rôle de a et de b, trouver où elle coupe l'axe.",
  problemes: [
    {
      tag: "Énigme 1 · L'arche gonflable",
      titre: "Associer une parabole",
      question: `À l'arrivée d'une course, une arche gonflable a la forme d'une parabole.<br>Elle est tournée vers le bas. Son sommet est à 4 m de haut.<br><br><b>Quelle est son expression</b> ?`,
      reponse: `Tournée vers le bas : a est négatif.<br>En x = 0, la hauteur vaut 4 : on ajoute 4.<br><span class="big">f(x) = −x² + 4</span>.`,
      consigne: "Parabole vers le bas, sommet (0 ; 4). Quelle expression ?",
      verification: { type: "qcm", choix: ["f(x) = −x² + 4", "f(x) = x² + 4", "f(x) = −x²"], bonne: 0 },
      dessin: arche,
    },
    {
      tag: "Énigme 2 · Les lampes torches",
      titre: "Le rôle de a",
      question: `Un fabricant de lampes torches dessine deux réflecteurs.<br>f(x) = 0,5x² et g(x) = 2x².<br><br><b>Quel réflecteur est le plus étroit</b> ?`,
      reponse: `Plus a est grand, plus la parabole monte vite.<br>2 est plus grand que 0,5.<br>Le plus étroit est <span class="big">g</span>.`,
      consigne: "f(x) = 0,5x², g(x) = 2x². Lequel est le plus étroit ?",
      verification: { type: "qcm", choix: ["f, car 0,5 est plus petit", "g, car 2 est plus grand que 0,5", "ils ont la même forme"], bonne: 1 },
      dessin: lampes,
    },
    {
      tag: "Énigme 3 · Le paysagiste",
      titre: "Le rôle de b",
      question: `Un paysagiste couvre de gravier une cour carrée de x mètres de côté.<br>Le gravier coûte f(x) = 2x² euros.<br>Il ajoute 150 € de livraison : g(x) = 2x² + 150.<br><br><b>Combien vaut g(10)</b> ?`,
      reponse: `2 × 10² = 2 × 100 = 200.<br>200 + 150 = <span class="big">350 €</span>.<br>La courbe de g, c'est celle de f montée de 150.`,
      consigne: "g(x) = 2x² + 150. Calcule g(10).",
      verification: { type: "courte", attendus: ["350"], unite: "€" },
      dessin: gravier,
    },
    {
      tag: "Énigme 4 · Les rollers",
      titre: "Où la parabole coupe l'axe",
      question: `Un fabricant vend x centaines de paires de rollers.<br>Son bénéfice vaut B(x) = −2(x − 1)(x − 9), en milliers d'euros.<br>Le bénéfice est nul pour x = 1.<br><br><b>Pour quel autre x</b> est-il nul ?`,
      reponse: `Un produit est nul si un facteur est nul.<br>x − 1 = 0 donne x = 1. x − 9 = 0 donne <span class="big">x = 9</span>.<br>La parabole coupe l'axe en 1 et en 9.`,
      consigne: "B(x) = −2(x − 1)(x − 9). Nul pour x = 1 et pour x = ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: rollers,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'arceau du casque audio",
      sorte: "piege",
      question: `Une designer dessine l'arceau d'un casque audio : f(x) = −3x².<br>Léa : « −3 est plus petit que 1. La parabole est plus ouverte que celle de x². »<br><br><b>Comment est vraiment</b> cette parabole ?`,
      reponse: `Le signe de a donne le sens : −3 est négatif, elle est tournée vers le bas.<br>L'ouverture dépend de 3, sans le signe : 3 est plus grand que 1.<br>Elle est <span class="big">plus étroite, tournée vers le bas</span>.`,
      consigne: "f(x) = −3x². Comment est la parabole, comparée à x² ?",
      verification: { type: "qcm", choix: ["plus ouverte, tournée vers le haut", "plus ouverte, tournée vers le bas", "plus étroite, tournée vers le bas"], bonne: 2 },
      dessin: casque,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La ligne électrique",
      sorte: "defi",
      question: `Un câble électrique pend entre deux pylônes, en x = −10 et x = 10.<br>Sa hauteur vaut y = 0,05x² + b, en mètres.<br>Aux pylônes, le câble est à 8 m du sol.<br><br><b>À quelle hauteur</b> est-il au milieu ?`,
      reponse: `En x = 10 : 0,05 × 100 + b = 8.<br>5 + b = 8, donc b = 3.<br>Au milieu, x = 0 : y = b = <span class="big">3 m</span>.`,
      consigne: "y = 0,05x² + b, et y = 8 pour x = 10. Hauteur au milieu ?",
      verification: { type: "courte", attendus: ["3"], unite: "m" },
      dessin: ligne,
    },
  ],
};

export default problemes;
