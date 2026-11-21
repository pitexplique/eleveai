// Énigmes à projeter — STMG (1re), notion dérivée : équation de la tangente (les
// vélos d'appartement, l'infirmerie d'entreprise, le fabricant de webcams, les
// lampadaires, piège des lampes solaires, défi du sable des travaux publics).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const velos = svg("Les vélos d'appartement : f de 2 égale 5 et f prime de 2 égale 3 ; équation de la tangente en x égale 2 ?",
  r(60, 50, 360, 70, C.bleu, 0.15, 3, 10) + t(240, 97, "f(2) = 5 · f′(2) = 3", C.craie, 28) +
    t(240, 190, "y = f′(a)(x − a) + f(a)", C.pale, 24) + t(240, 300, `tangente en x${NB}=${NB}2${NB}?`, C.rose, 28));

// Tangente en A (1 ; 4) de pente −2 : 1 vers la droite, 2 vers le bas.
const RI = repereXY(0, 4, 0, 6, { gh: 300 });
const infirmerie = svg("L'infirmerie d'entreprise : le point A de coordonnées 1 et 4 ; la tangente a pour pente moins 2 ; on avance de 1 vers la droite et on descend de 2",
  RI.fond + RI.point(1, 4, C.craie, 8) + t(RI.X(1) - 12, RI.Y(4) - 10, "A", C.craie, 22, "end") +
    fleche(RI.X(1), RI.Y(4), RI.X(2) - 4, RI.Y(4), C.jaune, 4) + t(RI.X(1.5), RI.Y(4) - 12, "+1", C.jaune, 20) +
    fleche(RI.X(2), RI.Y(4), RI.X(2), RI.Y(2) - 6, C.jaune, 4) + t(RI.X(2) + 18, RI.Y(3) + 6, "−2", C.jaune, 20, "start") +
    t(RI.X(2.6), RI.Y(5.4) + 8, "pente −2", C.rose, 22) +
    t(240, 400, `autre point de la tangente${NB}?`, C.rose, 24));

const webcams = svg("Le fabricant de webcams : la tangente a pour équation y égale 2 x plus 1 ; le point de coordonnées 4 et 9 est-il dessus ?",
  r(80, 60, 320, 80, C.bleu, 0.15, 3, 10) + t(240, 113, "T : y = 2x + 1", C.craie, 32) +
    t(240, 230, "M (4 ; 9)", C.craie, 30) + t(240, 320, `M sur T${NB}?`, C.rose, 30));

const lampadaires = svg("Les lampadaires : f de x égale x au carré ; f de 3 égale 9, f prime de 3 égale 6 ; ordonnée à l'origine de la tangente ?",
  r(60, 50, 360, 70, C.bleu, 0.15, 3, 10) + t(240, 97, "f(x) = x²", C.craie, 30) +
    t(240, 180, "f(3) = 9 · f′(3) = 6", C.pale, 26) + t(240, 250, "tangente : y = mx + p", C.pale, 24) +
    t(240, 340, `p${NB}=${NB}?`, C.rose, 30));

const lampes = svg("Les lampes solaires : f de 1 égale 2 et f prime de 1 égale 4 ; Sam écrit y égale 2 fois x moins 1 plus 4",
  r(60, 50, 360, 70, C.bleu, 0.15, 3, 10) + t(240, 97, "f(1) = 2 · f′(1) = 4", C.craie, 28) +
    t(240, 200, "Sam : y = 2(x − 1) + 4", C.pale, 26) + t(240, 300, `bon coefficient directeur${NB}?`, C.rose, 26));

const sable = svg("Le sable des travaux publics : S de 4 égale 10 tonnes, S prime de 4 égale moins 2 ; la tangente touche l'axe des abscisses quand ?",
  r(60, 50, 360, 70, C.jaune, 0.2, 3, 10) + t(240, 97, "S(4) = 10 · S′(4) = −2", C.craie, 28) +
    t(240, 180, "S en tonnes, x en semaines", C.pale, 22) + t(240, 245, "la tangente atteint y = 0", C.pale, 22) +
    t(240, 330, `semaine${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_tangente_equation",
  titre: "Énigmes d'équation de tangente",
  description: "Les vélos d'appartement, l'infirmerie d'entreprise, le fabricant de webcams, les lampadaires, le piège des lampes solaires, le défi du sable des travaux publics : écrire l'équation réduite d'une tangente, la construire, vérifier qu'un point est dessus.",
  problemes: [
    {
      tag: "Énigme 1 · Les vélos d'appartement",
      titre: "L'équation de la tangente",
      question: `Un fabricant de vélos d'appartement étudie une fonction f.<br>f(2) = 5 et f′(2) = 3.<br><br><b>Quelle est l'équation</b> de la tangente en x = 2 ?`,
      reponse: `y = f′(2)(x − 2) + f(2) = 3(x − 2) + 5.<br>y = 3x − 6 + 5.<br>La tangente est <span class="big">y = 3x − 1</span>.`,
      consigne: "f(2) = 5 et f′(2) = 3. Équation de la tangente en x = 2 ?",
      verification: { type: "qcm", choix: ["y = 3x − 1", "y = 5x + 3", "y = 3x + 5"], bonne: 0 },
      dessin: velos,
    },
    {
      tag: "Énigme 2 · L'infirmerie d'entreprise",
      titre: "Construire la tangente",
      question: `L'infirmerie d'une entreprise suit son stock de masques.<br>La tangente à la courbe passe par A (1 ; 4). Sa pente vaut −2.<br><br><b>Quel autre point</b> est sur cette tangente ?`,
      reponse: `Pente −2 : quand on avance de 1, on descend de 2.<br>Depuis A (1 ; 4) : x = 1 + 1 = 2 et y = 4 − 2 = 2.<br>Le point <span class="big">(2 ; 2)</span> est sur la tangente.`,
      consigne: "Tangente par A (1 ; 4), de pente −2. Quel autre point est dessus ?",
      verification: { type: "qcm", choix: ["(2 ; 6)", "(3 ; 3)", "(2 ; 2)"], bonne: 2 },
      dessin: infirmerie,
    },
    {
      tag: "Énigme 3 · Le fabricant de webcams",
      titre: "Un point sur la tangente ?",
      question: `Un fabricant de webcams trouve une tangente T : y = 2x + 1.<br><br><b>Le point M (4 ; 9)</b> est-il sur T ?`,
      reponse: `On remplace x par 4 : 2 × 4 + 1 = 9.<br>On trouve bien l'ordonnée de M.<br><span class="big">Oui</span>, M est sur T.`,
      consigne: "T : y = 2x + 1. Le point M (4 ; 9) est-il sur T ?",
      verification: { type: "qcm", choix: ["non", "oui", "seulement si x = 0"], bonne: 1 },
      dessin: webcams,
    },
    {
      tag: "Énigme 4 · Les lampadaires",
      titre: "L'ordonnée à l'origine",
      question: `Un fabricant de lampadaires étudie f(x) = x².<br>f(3) = 9 et f′(3) = 6.<br>La tangente en x = 3 s'écrit y = mx + p.<br><br><b>Que vaut p</b> ?`,
      reponse: `y = 6(x − 3) + 9 = 6x − 18 + 9.<br>y = 6x − 9.<br>p = <span class="big">−9</span>.`,
      consigne: "f(3) = 9 et f′(3) = 6. Tangente y = mx + p : que vaut p ?",
      verification: { type: "courte", attendus: ["−9", "-9"] },
      dessin: lampadaires,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les lampes solaires",
      sorte: "piege",
      question: `Un vendeur de lampes solaires étudie une fonction f.<br>f(1) = 2 et f′(1) = 4.<br>Sam écrit la tangente : y = 2(x − 1) + 4.<br><br><b>Quel est le bon coefficient directeur</b> ?`,
      reponse: `Sam a inversé f(1) et f′(1).<br>Le coefficient directeur est f′(1) = <span class="big">4</span>.<br>La bonne tangente : y = 4(x − 1) + 2 = 4x − 2.`,
      consigne: "f(1) = 2 et f′(1) = 4. Coefficient directeur de la tangente en x = 1 ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: lampes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le sable des travaux publics",
      sorte: "defi",
      question: `Une entreprise de travaux publics a un stock de sable S(x), en tonnes, à la semaine x.<br>S(4) = 10 et S′(4) = −2.<br>Elle prolonge la tangente en x = 4.<br><br><b>À quelle semaine</b> la tangente atteint-elle 0 tonne ?`,
      reponse: `Tangente : y = −2(x − 4) + 10 = −2x + 18.<br>−2x + 18 = 0 donne x = 9.<br>La tangente atteint 0 à la semaine <span class="big">9</span>.`,
      consigne: "S(4) = 10 et S′(4) = −2. Pour quel x la tangente vaut-elle 0 ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: sable,
    },
  ],
};

export default problemes;
