// Énigmes à projeter — STMG (1re), notion degré 3 : courbe, racines et signe
// (le bureau d'études, les poufs cubiques, la parfumerie, les vêtements de
// travail, piège du coffre-fort, défi du conseiller financier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(-3, 3, -4, 8, { px: 1, py: 2, ey: 4 });
const bureau = svg("Le bureau d'études : une courbe de degré 3 qui descend, passe par 0 ; 2, vaut 6 en moins 2 et moins 2 en 2",
  R1.fond + R1.courbe((x) => -0.5 * x * x * x + 2, -2, 2, C.bleu, 5) + R1.point(0, 2, C.rose, 7) +
    t(R1.X(0) + 14, R1.Y(2) - 12, "(0 ; 2)", C.craie, 18, "start") +
    t(240, 400, `quelle expression${NB}?`, C.rose, 26));

const poufs = svg("Les poufs cubiques : P de x égale 2x au cube plus 15 ; P de 3 ?",
  r(70, 90, 340, 100, C.jaune, 0.2, 3, 10) + t(240, 155, "P(x) = 2x³ + 15", C.craie, 34) +
    t(240, 250, "x = côté, en dm", C.pale, 22) + t(240, 330, `P(3)${NB}=${NB}?`, C.rose, 30));

const parfumerie = svg("La parfumerie : P de x égale 2 fois x moins 1 fois x moins 3 fois x moins 6",
  r(30, 90, 420, 100, C.bleu, 0.15, 3, 10) + t(240, 155, "P(x) = 2(x − 1)(x − 3)(x − 6)", C.craie, 28) +
    t(240, 280, `les racines${NB}?`, C.rose, 28));

// Tableau de signes : colonnes 0 (165), 1 (205), 4 (290), 7 (375), 10 (445).
const ligne = (y: number, vals: [number, string][]) => vals.map(([x, v]) => t(x, y, v, C.craie, 22)).join("");
const travail = svg("Tableau de signes de x moins 1 fois x moins 4 fois x moins 7 pour x entre 0 et 10 ; la ligne de P est à compléter",
  t(240, 40, "P(x) = (x − 1)(x − 4)(x − 7)", C.craie, 24) +
    r(10, 60, 460, 300, C.craie, 0, 3) + l(120, 60, 120, 360, C.craie, 2) +
    [110, 172, 234, 296].map((y) => l(10, y, 470, y, C.craie, 2)).join("") +
    t(65, 94, "x", C.pale, 22) + t(65, 150, "x − 1", C.pale, 20) + t(65, 212, "x − 4", C.pale, 20) + t(65, 274, "x − 7", C.pale, 20) + t(65, 336, "P(x)", C.pale, 20) +
    ligne(94, [[140, "0"], [205, "1"], [290, "4"], [375, "7"], [450, "10"]]) +
    ligne(150, [[170, "−"], [205, "0"], [248, "+"], [333, "+"], [415, "+"]]) +
    ligne(212, [[170, "−"], [248, "−"], [290, "0"], [333, "+"], [415, "+"]]) +
    ligne(274, [[170, "−"], [248, "−"], [333, "−"], [375, "0"], [415, "+"]]) +
    t(290, 336, "?", C.rose, 28));

const coffre = svg("Le coffre-fort cubique : P de x égale x au cube moins 27 ; Léo dit que la racine est 9",
  r(70, 70, 340, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "P(x) = x³ − 27", C.craie, 34) +
    t(240, 240, "Léo : « racine 9,", C.pale, 24) + t(240, 290, "car 27 ÷ 3 = 9 »", C.pale, 24) +
    t(240, 370, "?", C.rose, 34));

const conseiller = svg("Le conseiller financier : P de x égale x au cube moins 6x au carré plus 11x moins 6 ; P de 1, P de 2, P de 3 égalent 0 ; P de 4 ?",
  r(20, 60, 440, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "P(x) = x³ − 6x² + 11x − 6", C.craie, 28) +
    t(240, 215, "P(1) = P(2) = P(3) = 0", C.pale, 24) + t(240, 265, "P(x) = (x − 1)(x − 2)(x − 3)", C.pale, 22) +
    t(240, 350, `P(4)${NB}=${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_degre3",
  titre: "Énigmes de degré 3",
  description: "Le bureau d'études, les poufs cubiques, la parfumerie, les vêtements de travail, le piège du coffre-fort, le défi du conseiller financier : associer une courbe à ax³ + b, lire les racines d'une forme factorisée, trouver un signe et vérifier une racine.",
  problemes: [
    {
      tag: "Énigme 1 · Le bureau d'études",
      titre: "Associer une courbe",
      question: `Un bureau d'études trace une courbe de degré 3.<br>Elle descend. Elle passe par le point (0 ; 2).<br><br><b>Quelle est son expression</b> ?`,
      reponse: `Elle descend : a est négatif.<br>En x = 0, elle vaut 2 : on ajoute 2.<br><span class="big">f(x) = −0,5x³ + 2</span>.`,
      consigne: "Courbe de degré 3 qui descend, passe par (0 ; 2). Quelle expression ?",
      verification: { type: "qcm", choix: ["f(x) = −0,5x³ + 2", "f(x) = 0,5x³ + 2", "f(x) = −0,5x³"], bonne: 0 },
      dessin: bureau,
    },
    {
      tag: "Énigme 2 · Les poufs cubiques",
      titre: "Calculer avec ax³ + b",
      question: `Une marque vend des poufs en forme de cube, de côté x dm.<br>Le prix vaut P(x) = 2x³ + 15, en euros.<br><br><b>Combien coûte</b> un pouf de 3 dm de côté ?`,
      reponse: `3³ = 3 × 3 × 3 = 27.<br>2 × 27 = 54. 54 + 15 = 69.<br>Le pouf coûte <span class="big">69 €</span>.`,
      consigne: "P(x) = 2x³ + 15. Calcule P(3).",
      verification: { type: "courte", attendus: ["69"], unite: "€" },
      dessin: poufs,
    },
    {
      tag: "Énigme 3 · La parfumerie",
      titre: "Les trois racines",
      question: `Une parfumerie étudie P(x) = 2(x − 1)(x − 3)(x − 6).<br><br><b>Quelles sont les racines</b> de P ?`,
      reponse: `Un produit est nul si un facteur est nul.<br>Le 2 n'est jamais nul.<br>x − 1 = 0, x − 3 = 0 ou x − 6 = 0 : les racines sont <span class="big">1, 3 et 6</span>.`,
      consigne: "P(x) = 2(x − 1)(x − 3)(x − 6). Quelles sont les racines ?",
      verification: { type: "qcm", choix: ["−1, −3 et −6", "1, 3 et 6", "2, 1, 3 et 6"], bonne: 1 },
      dessin: parfumerie,
    },
    {
      tag: "Énigme 4 · Les vêtements de travail",
      titre: "Le tableau de signes",
      question: `Une enseigne de vêtements de travail étudie P(x) = (x − 1)(x − 4)(x − 7).<br>x va de 0 à 10.<br><br><b>Donne un entier x</b> entre 4 et 7 pour lequel P(x) est négatif.`,
      reponse: `Entre 4 et 7 : x − 1 est +, x − 4 est +, x − 7 est −.<br>+ × + × − donne − : P(x) est négatif.<br>Les entiers qui marchent : <span class="big">5 ou 6</span>.`,
      consigne: "P(x) = (x − 1)(x − 4)(x − 7). Un entier entre 4 et 7 avec P(x) < 0 ?",
      verification: { type: "courte", attendus: ["5", "6"] },
      dessin: travail,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le coffre-fort",
      sorte: "piege",
      question: `Un coffre-fort est un cube de côté x dm.<br>On étudie P(x) = x³ − 27.<br>Léo : « La racine est 9, car 27 ÷ 3 = 9. »<br><br><b>Quelle est la racine</b> ?`,
      reponse: `x³, c'est x × x × x, pas 3 × x.<br>9 × 9 × 9 = 729 : P(9) n'est pas nul.<br>3 × 3 × 3 = 27 : la racine est <span class="big">3</span>.`,
      consigne: "P(x) = x³ − 27. Quelle est la racine ?",
      verification: { type: "qcm", choix: ["9, car 27 ÷ 3 = 9", "27", "3, car 3 × 3 × 3 = 27"], bonne: 2 },
      dessin: coffre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le conseiller financier",
      sorte: "defi",
      question: `Un conseiller financier étudie P(x) = x³ − 6x² + 11x − 6.<br>Il vérifie que P(1) = P(2) = P(3) = 0.<br>Donc P(x) = (x − 1)(x − 2)(x − 3).<br><br><b>Combien vaut P(4)</b> ?`,
      reponse: `Avec la forme factorisée : P(4) = 3 × 2 × 1 = 6.<br>Avec la forme développée : 64 − 96 + 44 − 6 = 6.<br>P(4) = <span class="big">6</span>.`,
      consigne: "P(x) = (x − 1)(x − 2)(x − 3). Calcule P(4).",
      verification: { type: "courte", attendus: ["6"] },
      dessin: conseiller,
    },
  ],
};

export default problemes;
