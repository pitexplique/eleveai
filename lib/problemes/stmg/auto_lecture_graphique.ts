// Énigmes à projeter — STMG (1re), notion lire une courbe
// (le marché forain de Saint-Paul, la recette du kiosque, l'agence de
// publicité, l'atelier de sérigraphie, piège du salon de toilettage, défi du
// podcast de cuisine). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { repereXY, brisee, barre } from "../dessins-1re";

const R1 = repereXY(7, 13, 0, 350, { px: 1, py: 50, ey: 100 });
const marche = svg("Le nombre de visiteurs du marché forain de Saint-Paul entre 7 h et 13 h",
  R1.fond + brisee(R1, [[7, 50], [8, 150], [9, 200], [10, 300], [11, 250], [12, 150], [13, 50]], C.bleu) +
    t(R1.X(7) + 8, 24, "visiteurs", C.pale, 17, "start") + t(462, R1.Y(0) - 10, "h", C.pale, 18, "end") +
    t(240, 400, `à 11 h${NB}?`, C.rose, 26));

const R2 = repereXY(0, 6, 0, 700, { px: 1, py: 100, ey: 100 });
const kiosque = svg("La recette du kiosque à journaux du jour 1 au jour 6",
  R2.fond + brisee(R2, [[1, 300], [2, 500], [3, 400], [4, 500], [5, 200], [6, 600]], C.bleu) +
    t(R2.X(0) + 8, 24, "recette (€)", C.pale, 17, "start") + t(462, R2.Y(0) - 10, "jour", C.pale, 18, "end") +
    t(240, 400, `500 €${NB}: quels jours${NB}?`, C.rose, 24));

const R3 = repereXY(0, 6, 80, 180, { px: 1, py: 10, ey: 40 });
const agence = svg("Le chiffre d'affaires d'une agence de publicité : l'axe vertical part de 80 et une étiquette tous les 4 carreaux",
  R3.fond + brisee(R3, [[1, 120], [2, 140], [3, 130], [4, 160], [5, 150], [6, 170]], C.bleu) +
    t(R3.X(0) + 8, 24, "k€", C.pale, 17, "start") + t(462, R3.Y(80) - 10, "mois", C.pale, 18, "end") +
    t(240, 400, `un carreau vertical${NB}?`, C.rose, 24));

const R4 = repereXY(0, 6, 0, 150, { px: 1, py: 25, ey: 50 });
const serigraphie = svg("Le coût de l'atelier de sérigraphie : C de x égale x carré plus 10 x plus 50 ; le point d'abscisse 4",
  R4.fond + R4.courbe((x) => x * x + 10 * x + 50, 0.05, 6, C.bleu, 4) + R4.point(4, 106, C.rose, 8) +
    t(R4.X(4) - 14, R4.Y(106) - 14, "?", C.rose, 26, "end") +
    t(R4.X(0) + 8, 24, "coût (centaines d'€)", C.pale, 17, "start") +
    t(240, 400, `C(4)${NB}=${NB}?`, C.rose, 26));

const R5 = repereXY(0, 4, 900, 1000, { px: 1, py: 20, ex: 100, ey: 20, quadrillage: false });
const toilettage = svg("Les rendez-vous du salon de toilettage : 950 en 2025, 1 000 en 2026, l'axe vertical part de 900",
  R5.fond + barre(R5, 0.7, 1, 950, C.bleu, 900) + barre(R5, 2.3, 1, 1000, C.jaune, 900) +
    t(R5.X(1.2), R5.Y(900) + 26, "2025", C.pale, 18) + t(R5.X(2.8), R5.Y(900) + 26, "2026", C.pale, 18) +
    t(R5.X(1.2), R5.Y(950) - 10, "950", C.craie, 20) + t(R5.X(2.8), R5.Y(1000) - 10, "1 000", C.craie, 20) +
    t(240, 400, "« On a doublé ! »", C.rose, 24));

const R6 = repereXY(0, 10, 0, 60, { px: 1, py: 10, ex: 2, ey: 10 });
const podcast = svg("Les abonnés d'un podcast de cuisine, en milliers, sur 10 mois",
  R6.fond + brisee(R6, [[0, 10], [2, 16], [4, 24], [6, 34], [8, 46], [10, 60]], C.bleu) +
    t(R6.X(0) + 8, 24, "milliers d'abonnés", C.pale, 17, "start") + t(462, R6.Y(0) - 10, "mois", C.pale, 18, "end") +
    t(240, 400, `plus de 50${NB}000${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_lecture_graphique",
  titre: "Énigmes de lecture de courbes",
  description: "Le marché forain de Saint-Paul, la recette du kiosque, l'agence de publicité, l'atelier de sérigraphie, le piège du salon de toilettage, le défi du podcast de cuisine : lire une image, des antécédents, une échelle, calculer un point, estimer un seuil.",
  problemes: [
    {
      tag: "Énigme 1 · Le marché forain",
      titre: "Lire une image",
      question: `La courbe montre le nombre de visiteurs du marché forain de Saint-Paul, à La Réunion, un vendredi matin.<br><br><b>Combien de visiteurs</b> y a-t-il à 11 h ?`,
      reponse: `On part de 11 sur l'axe horizontal.<br>On monte jusqu'à la courbe, puis on lit à gauche.<br><span class="big">250 visiteurs</span>.`,
      consigne: "Combien de visiteurs à 11 h ?",
      verification: { type: "courte", attendus: ["250"], unite: "visiteurs" },
      dessin: marche,
    },
    {
      tag: "Énigme 2 · Le kiosque à journaux",
      titre: "Lire des antécédents",
      question: `Le graphique montre la recette d'un kiosque à journaux pendant 6 jours.<br><br><b>Quels jours</b> la recette vaut-elle 500 € ?`,
      reponse: `On part de 500 sur l'axe vertical.<br>On va à droite et on note chaque point de la courbe à cette hauteur.<br><span class="big">Les jours 2 et 4</span>.<br>500 a deux antécédents.`,
      consigne: "Quels jours la recette vaut-elle 500 € ?",
      verification: { type: "qcm", choix: ["jour 6", "jours 2 et 4", "jour 3"], bonne: 1 },
      dessin: kiosque,
    },
    {
      tag: "Énigme 3 · L'agence de publicité",
      titre: "Lire l'échelle",
      question: `Le graphique montre le chiffre d'affaires mensuel d'une agence de publicité, en milliers d'euros (k€).<br>L'axe vertical commence à 80.<br><br><b>Combien vaut un petit carreau vertical</b> ?`,
      reponse: `De 80 à 120, il y a 4 carreaux.<br>40 ÷ 4 = <span class="big">10 k€</span> par carreau.`,
      consigne: "Combien vaut un carreau vertical ?",
      verification: { type: "qcm", choix: ["10 k€", "40 k€", "1 k€"], bonne: 0 },
      dessin: agence,
    },
    {
      tag: "Énigme 4 · L'atelier de sérigraphie",
      titre: "Un point de la courbe",
      question: `Un atelier imprime x centaines de tee-shirts.<br>Son coût vaut C(x) = x² + 10x + 50, en centaines d'euros.<br>Le point de la courbe d'abscisse 4 est marqué.<br><br><b>Quelle est son ordonnée</b> ?`,
      reponse: `C(4) = 4² + 10 × 4 + 50 = 16 + 40 + 50 = <span class="big">106</span>.<br>Le point est (4 ; 106) : 10 600 € pour 400 tee-shirts.`,
      consigne: "C(x) = x² + 10x + 50. Calcule C(4).",
      verification: { type: "courte", attendus: ["106"] },
      dessin: serigraphie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le salon de toilettage",
      sorte: "piege",
      question: `Un salon de toilettage pour chiens a eu 950 rendez-vous en 2025 et 1 000 en 2026.<br>Sur le graphique, la barre de 2026 est deux fois plus haute.<br>La patronne : « On a doublé ! »<br><br><b>De combien les rendez-vous ont-ils vraiment augmenté</b> ?`,
      reponse: `L'axe vertical part de 900, pas de 0 : les barres trompent.<br>Hausse : 50 rendez-vous sur 950.<br>50 ÷ 950 ≈ 0,053 : <span class="big">environ + 5 %</span>.`,
      consigne: "950 puis 1 000 rendez-vous. Quelle hausse ?",
      verification: { type: "qcm", choix: ["Ils ont doublé", "+ 50 %", "environ + 5 %"], bonne: 2 },
      dessin: toilettage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le podcast de cuisine",
      sorte: "defi",
      question: `La courbe montre le nombre d'abonnés d'un podcast de cuisine, en milliers.<br>Entre deux points, elle est droite.<br><br><b>À partir de quel mois entier</b> dépasse-t-il 50 000 abonnés ?`,
      reponse: `Au mois 8 : 46 milliers. Au mois 10 : 60 milliers.<br>Entre les deux, on gagne 14 milliers en 2 mois, soit 7 par mois.<br>Au mois 9 : 46 + 7 = 53 milliers. Dès le <span class="big">mois 9</span>.`,
      consigne: "À partir de quel mois entier plus de 50 000 abonnés ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: podcast,
    },
  ],
};

export default problemes;
