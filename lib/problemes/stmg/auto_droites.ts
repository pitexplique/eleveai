// Énigmes à projeter — STMG (1re), notion droites et coefficient directeur
// (le tarif de l'électricien, le nettoyeur haute pression, le devis du
// couvreur, les croquettes de la pension pour chats, piège de la cuve de
// fioul, défi des deux loueurs de jet-skis). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(0, 3, 0, 240, { px: 1, py: 20, ey: 40 });
const electricien = svg("Le tarif de l'électricien : une droite qui passe par (0 ; 40) et (1 ; 100)",
  R1.fond + R1.courbe((x) => 60 * x + 40, 0, 3, C.bleu, 4) + R1.point(0, 40, C.rose, 7) + R1.point(1, 100, C.rose, 7) +
    t(R1.X(0) + 8, 24, "prix (€)", C.pale, 17, "start") + t(462, R1.Y(0) - 10, "h", C.pale, 18, "end") +
    t(240, 400, `y${NB}=${NB}?`, C.rose, 26));

const nettoyeur = svg("Le nettoyeur haute pression : y égale 12 x plus 6 ; deux points pour tracer la droite, x égale 0 et x égale 3",
  r(80, 80, 320, 90, C.bleu, 0.15, 3, 10) + t(240, 138, "y = 12x + 6", C.craie, 34) +
    t(240, 250, "x = 0  →  y = 6", C.pale, 26) + t(240, 310, `x = 3  →  y${NB}=${NB}?`, C.rose, 26));

const couvreur = svg("Le devis du couvreur : 2 heures pour 130 euros, 5 heures pour 250 euros ; le déplacement ?",
  r(50, 80, 170, 100, C.bleu, 0.15, 3, 10) + r(260, 80, 170, 100, C.jaune, 0.2, 3, 10) +
    t(135, 125, "2 h", C.pale, 24) + t(135, 160, "130 €", C.craie, 28) +
    t(345, 125, "5 h", C.pale, 24) + t(345, 160, "250 €", C.craie, 28) +
    t(240, 280, "y = ax + b", C.craie, 30) + t(240, 350, `déplacement${NB}: b${NB}=${NB}?`, C.rose, 26));

const croquettes = svg("Le stock de croquettes de la pension pour chats : 60 kilos, moins 3 kilos par jour ; y égale moins 3 x plus 60",
  r(150, 50, 180, 140, C.jaune, 0.2, 3, 16) + t(240, 115, "croquettes", C.pale, 22) + t(240, 160, "60 kg", C.craie, 32) +
    t(240, 245, "− 3 kg par jour", C.pale, 24) + t(240, 300, "y = −3x + 60", C.craie, 30) +
    t(240, 370, `y${NB}=${NB}0 quand${NB}?`, C.rose, 26));

const R5 = repereXY(0, 10, 0, 1000, { px: 1, py: 50, ex: 2, ey: 200 });
const fioul = svg("La cuve de fioul : une droite de 1 000 litres au jour 0 à 0 litre au jour 10 ; un carreau horizontal vaut 1 jour, un carreau vertical 50 litres",
  R5.fond + R5.courbe((x) => 1000 - 100 * x, 0, 10, C.bleu, 4) +
    t(R5.X(0) + 8, 24, "litres", C.pale, 17, "start") + t(462, R5.Y(0) + 46, "jour", C.pale, 18, "end") +
    t(240, 400, `coefficient directeur${NB}?`, C.rose, 24));

const R6 = repereXY(0, 6, 0, 200, { px: 1, py: 20, ey: 40 });
const jetski = svg("Deux loueurs de jet-skis : A, y égale 30 x ; B, y égale 20 x plus 40 ; les droites se coupent au point (4 ; 120)",
  R6.fond + R6.courbe((x) => 30 * x, 0, 6, C.bleu, 4) + R6.courbe((x) => 20 * x + 40, 0, 6, C.jaune, 4) +
    R6.point(4, 120, C.rose, 7) +
    t(R6.X(6) + 8, R6.Y(180) + 4, "A", C.bleu, 22, "start") + t(R6.X(6) + 8, R6.Y(160) + 12, "B", C.jaune, 22, "start") +
    t(R6.X(0) + 8, 24, "prix (€)", C.pale, 17, "start") + t(462, R6.Y(0) - 10, "h", C.pale, 18, "end") +
    t(240, 400, `B moins cher quand${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_droites",
  titre: "Énigmes de droites et de coefficient directeur",
  description: "Le tarif de l'électricien, le nettoyeur haute pression, le devis du couvreur, les croquettes de la pension pour chats, le piège de la cuve de fioul, le défi des deux loueurs de jet-skis : lire une équation réduite, tracer une droite, trouver a et b, comparer deux droites.",
  problemes: [
    {
      tag: "Énigme 1 · L'électricien",
      titre: "Lire l'équation réduite",
      question: `La droite donne le prix y d'un électricien, pour x heures de travail.<br>Deux points sont marqués.<br><br><b>Quelle est l'équation réduite</b> de la droite ?`,
      reponse: `En x = 0, y = 40 : b = 40, c'est le déplacement.<br>Chaque heure, le prix monte de 100 − 40 = 60 : a = 60.<br><span class="big">y = 60x + 40</span>.`,
      consigne: "Lis l'équation réduite de la droite.",
      verification: { type: "qcm", choix: ["y = 60x + 40", "y = 40x + 60", "y = 100x"], bonne: 0 },
      dessin: electricien,
    },
    {
      tag: "Énigme 2 · Le nettoyeur haute pression",
      titre: "Tracer une droite",
      question: `Un magasin loue un nettoyeur haute pression.<br>Le prix vaut y = 12x + 6, pour x jours.<br>Pour tracer la droite, on place deux points.<br>Le premier est (0 ; 6).<br><br><b>Quelle est l'ordonnée</b> du point d'abscisse 3 ?`,
      reponse: `On remplace x par 3.<br>12 × 3 + 6 = 36 + 6 = <span class="big">42</span>.<br>Le second point est (3 ; 42) : 42 € pour 3 jours.`,
      consigne: "y = 12x + 6. Calcule y pour x = 3.",
      verification: { type: "courte", attendus: ["42"] },
      dessin: nettoyeur,
    },
    {
      tag: "Énigme 3 · Le couvreur",
      titre: "Une droite par deux points",
      question: `Un couvreur fait payer un déplacement, puis un prix par heure.<br>2 h de travail coûtent 130 €.<br>5 h de travail coûtent 250 €.<br><br><b>Combien coûte le déplacement</b> ?`,
      reponse: `3 h de plus coûtent 250 − 130 = 120 €.<br>a = 120 ÷ 3 = 40 € par heure.<br>130 − 2 × 40 = 130 − 80 = <span class="big">50 €</span>.<br>La droite : y = 40x + 50.`,
      consigne: "2 h : 130 €. 5 h : 250 €. Combien vaut b ?",
      verification: { type: "courte", attendus: ["50"], unite: "€" },
      dessin: couvreur,
    },
    {
      tag: "Énigme 4 · La pension pour chats",
      titre: "Où la droite coupe l'axe",
      question: `Une pension pour chats a 60 kg de croquettes.<br>Les chats en mangent 3 kg par jour.<br>Le stock vaut y = −3x + 60, après x jours.<br><br><b>Au bout de combien de jours</b> le stock est-il vide ?`,
      reponse: `Le stock est vide quand y = 0.<br>−3x + 60 = 0, donc 3x = 60.<br>x = 60 ÷ 3 = <span class="big">20 jours</span>.`,
      consigne: "y = −3x + 60. Pour quel x a-t-on y = 0 ?",
      verification: { type: "courte", attendus: ["20"], unite: "jours" },
      dessin: croquettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La cuve de fioul",
      sorte: "piege",
      question: `La droite donne le fioul d'une cuve, en litres, jour après jour.<br>Un carreau horizontal vaut 1 jour.<br>Un carreau vertical vaut 50 litres.<br>Léo : « Elle descend de 2 carreaux par carreau : le coefficient est −2. »<br><br><b>Quel est le vrai coefficient directeur</b> ?`,
      reponse: `Les deux axes n'ont pas la même échelle.<br>En 10 jours, la cuve passe de 1 000 L à 0 L.<br>a = −1 000 ÷ 10 = <span class="big">−100</span>.<br>La cuve perd 100 litres par jour.`,
      consigne: "De 1 000 L à 0 L en 10 jours. Quel coefficient directeur ?",
      verification: { type: "qcm", choix: ["−2", "2", "−100"], bonne: 2 },
      dessin: fioul,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux loueurs de jet-skis",
      sorte: "defi",
      question: `Le loueur A fait payer 30 € l'heure : y = 30x.<br>Le loueur B fait payer 40 €, puis 20 € l'heure : y = 20x + 40.<br><br><b>Quand</b> B est-il moins cher que A ?`,
      reponse: `Les droites se coupent quand 30x = 20x + 40.<br>10x = 40, donc x = 4 : les deux coûtent 120 €.<br>Après, la droite de B est en dessous.<br><span class="big">Au-delà de 4 h</span>.`,
      consigne: "A : y = 30x. B : y = 20x + 40. Quand B est-il moins cher ?",
      verification: { type: "qcm", choix: ["dès 2 h", "au-delà de 4 h", "au-delà de 6 h"], bonne: 1 },
      dessin: jetski,
    },
  ],
};

export default problemes;
