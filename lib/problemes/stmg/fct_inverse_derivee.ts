// Énigmes à projeter — STMG (Tle), fonction inverse : dérivée et variations
// (le salon de massage, la rizerie, l'huilerie, le loueur d'échafaudages,
// piège du papetier, défi du fabricant de chauffe-eau). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu, t1 = 32) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : t1)).join("") +
    t(240, 365, question, C.rose, 28));

const massage = carte("Le salon de massage : f de x égale 12 sur x ; f prime de x égale moins 12 sur x au carré ; f prime de 2 ?",
  ["f(x) = 12 ÷ x", "f′(x) = −12 ÷ x²", "x = 2"], `f′(2)${NB}=${NB}?`);

const R1 = repereXY(0, 5, 0, 2.5, { px: 1, py: 0.5 });
const rizerie = svg("La rizerie : la courbe de f de x égale 1 sur x pour x positif ; f prime de x égale moins 1 sur x au carré",
  R1.fond + R1.courbe((x) => 1 / x, 0.42, 5, C.bleu, 4) +
    t(R1.X(0) + 8, 24, "tonnes par sac", C.pale, 17, "start") + t(462, R1.Y(0) + 46, "sacs", C.pale, 18, "end") +
    t(330, 110, "f′(x) = −1 ÷ x²", C.craie, 24) + t(240, 405, `f croissante ou décroissante${NB}?`, C.rose, 24));

const huilerie = carte("L'huilerie : coût moyen C M de x égale x plus 100 sur x ; dérivée 1 moins 100 sur x au carré ; quand vaut-elle 0 ?",
  ["CM(x) = x + 100 ÷ x", "CM′(x) = 1 − 100 ÷ x²", "x > 0"], `CM′(x)${NB}=${NB}0${NB}?`, C.jaune);

/** Tableau de variations à trois colonnes avec la ligne du signe de la dérivée. */
const y0 = 40;
const echafaudage = svg("Le loueur d'échafaudages : tableau de variations de g ; g prime négatif puis 0 en 5 puis positif ; g vaut 78 en 1, point d'interrogation en 5, 37,5 en 10",
  r(20, y0, 440, 250, C.craie, 0, 3) + l(110, y0, 110, y0 + 250, C.craie, 2) +
    l(20, y0 + 55, 460, y0 + 55, C.craie, 2) + l(20, y0 + 110, 460, y0 + 110, C.craie, 2) +
    t(65, y0 + 37, "x", C.pale, 24) + t(65, y0 + 92, "g′(x)", C.pale, 22) + t(65, y0 + 190, "g", C.pale, 24) +
    t(150, y0 + 37, "1", C.craie, 22) + t(285, y0 + 37, "5", C.craie, 22) + t(420, y0 + 37, "10", C.craie, 22) +
    t(218, y0 + 92, "−", C.craie, 26) + t(285, y0 + 92, "0", C.craie, 22) + t(352, y0 + 92, "+", C.craie, 26) +
    l(285, y0 + 55, 285, y0 + 110, C.craie, 1, "6 5") +
    t(150, y0 + 145, "78", C.craie, 22) + t(285, y0 + 238, "?", C.rose, 28) + t(420, y0 + 145, "37,5", C.craie, 22) +
    fleche(176, y0 + 154, 259, y0 + 214, C.bleu, 3) + fleche(311, y0 + 214, 394, y0 + 154, C.bleu, 3) +
    t(240, 345, "g(x) = 3x + 75 ÷ x", C.craie, 24) + t(240, 400, `le coût le plus bas${NB}?`, C.rose, 26));

const papetier = carte("Le papetier : f de x égale 5 sur x ; l'apprenti écrit f prime de x égale 5 sur x au carré ; f prime de 1 ?",
  ["f(x) = 5 ÷ x", "l'apprenti : f′(x) = 5 ÷ x²", "x = 1"], `f′(1)${NB}=${NB}?`);

const chauffeEau = carte("Le fabricant de chauffe-eau : coût moyen 2 x plus 50 plus 800 sur x ; pour quelle valeur de x est-il le plus bas ?",
  ["CM(x) = 2x + 50 + 800 ÷ x", "coût moyen en €", "x chauffe-eau par jour"], `CM le plus bas${NB}: x${NB}=${NB}?`, C.jaune, 26);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_inverse_derivee",
  titre: "Énigmes de la dérivée de la fonction inverse",
  description: "Le salon de massage, la rizerie, l'huilerie, le loueur d'échafaudages, le piège du papetier, le défi du fabricant de chauffe-eau : utiliser la dérivée de 1 ÷ x, en déduire le sens de variation, et trouver le minimum d'un coût moyen de la forme ax + b + c ÷ x.",
  problemes: [
    {
      tag: "Énigme 1 · Le salon de massage",
      titre: "Calculer un nombre dérivé",
      question: `Un salon de massage partage 12 heures de rendez-vous entre x masseuses.<br>Chacune travaille f(x) = 12 ÷ x heures.<br>La dérivée est f′(x) = −12 ÷ x².<br><br><b>Que vaut f′(2)</b> ?`,
      reponse: `f′(2) = −12 ÷ 2² = −12 ÷ 4 = <span class="big">−3</span>.<br>Le nombre dérivé est négatif : f diminue autour de x = 2.`,
      consigne: "Que vaut f′(2) ?",
      verification: { type: "courte", attendus: ["-3", "−3"] },
      dessin: massage,
    },
    {
      tag: "Énigme 2 · La rizerie",
      titre: "Le sens de variation",
      question: `Une rizerie partage 1 tonne de riz entre x sacs : f(x) = 1 ÷ x.<br>Sa dérivée est f′(x) = −1 ÷ x².<br>Un carré x² est toujours positif.<br><br><b>Comment varie f</b> sur ]0 ; +∞[ ?`,
      reponse: `x² > 0, donc −1 ÷ x² &lt; 0 : f′(x) est toujours négative.<br>f est <span class="big">décroissante</span> sur ]0 ; +∞[ : plus il y a de sacs, moins chaque sac pèse.`,
      consigne: "Comment varie f ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "constante"], bonne: 1 },
      dessin: rizerie,
    },
    {
      tag: "Énigme 3 · L'huilerie",
      titre: "Annuler la dérivée",
      question: `Une huilerie produit x centaines de litres d'huile.<br>Son coût moyen est CM(x) = x + 100 ÷ x.<br>Sa dérivée est CM′(x) = 1 − 100 ÷ x².<br><br><b>Pour quelle valeur de x</b> (positive) a-t-on CM′(x) = 0 ?`,
      reponse: `1 − 100 ÷ x² = 0, donc 100 ÷ x² = 1, donc x² = 100.<br>x est positif : <span class="big">x = 10</span>.<br>Vérification : 1 − 100 ÷ 100 = 0.`,
      consigne: "Pour quelle valeur de x ?",
      verification: { type: "courte", attendus: ["10", "x = 10", "x=10"] },
      dessin: huilerie,
    },
    {
      tag: "Énigme 4 · Le loueur d'échafaudages",
      titre: "Lire le minimum",
      question: `Un loueur d'échafaudages calcule son coût moyen par jour : g(x) = 3x + 75 ÷ x euros, pour x jours (x entre 1 et 10).<br>Le tableau de variations est au tableau.<br><br><b>Quel est le coût moyen le plus bas</b> ?`,
      reponse: `Le minimum est atteint en x = 5.<br>g(5) = 3 × 5 + 75 ÷ 5 = 15 + 15 = <span class="big">30 €</span>.<br>Avant 5 jours, g descend ; après, g remonte.`,
      consigne: "Quel est le coût moyen le plus bas ?",
      verification: { type: "qcm", choix: ["30 €", "5 €", "78 €"], bonne: 0 },
      dessin: echafaudage,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le papetier",
      sorte: "piege",
      question: `Un papetier partage 5 ramettes entre x bureaux : f(x) = 5 ÷ x.<br>L'apprenti écrit : f′(x) = 5 ÷ x².<br><br><b>Que vaut vraiment f′(1)</b> ?`,
      reponse: `La dérivée de 1 ÷ x est −1 ÷ x² : il ne faut pas oublier le signe moins.<br>Donc f′(x) = 5 × (−1 ÷ x²) = −5 ÷ x².<br>f′(1) = <span class="big">−5</span> : f est décroissante.`,
      consigne: "Que vaut f′(1) ?",
      verification: { type: "qcm", choix: ["5", "1", "−5"], bonne: 2 },
      dessin: papetier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le fabricant de chauffe-eau",
      sorte: "defi",
      question: `Un fabricant produit x chauffe-eau par jour (x > 0).<br>Son coût moyen est CM(x) = 2x + 50 + 800 ÷ x euros.<br><br><b>Combien de chauffe-eau par jour</b> rendent le coût moyen le plus bas ?`,
      reponse: `CM′(x) = 2 − 800 ÷ x².<br>CM′(x) = 0 donne x² = 400, donc x = 20.<br>Avant 20, CM′ est négative ; après, positive : c'est un minimum.<br><span class="big">20 chauffe-eau</span>, pour CM(20) = 40 + 50 + 40 = 130 €.`,
      consigne: "Combien de chauffe-eau par jour ?",
      verification: { type: "courte", attendus: ["20", "20 chauffe-eau"] },
      dessin: chauffeEau,
    },
  ],
};

export default problemes;
