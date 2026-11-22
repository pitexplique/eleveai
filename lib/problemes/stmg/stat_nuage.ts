// Énigmes à projeter — STMG (1re), notion nuage de points
// (la boutique en ligne de housses de canapé, le cabinet d'ostéopathe, les
// chaudières du chauffagiste, le hammam, piège des six communes, défi de la
// fabrique de pain d'épices). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(0, 700, 0, 80, { px: 100, py: 10, ey: 20 });
const housses = svg("Nuage de points de la boutique de housses : pub 100 à 600 euros, commandes 20, 30, 35, 50, 55, 70",
  R1.fond + ([[100, 20], [200, 30], [300, 35], [400, 50], [500, 55], [600, 70]] as const).map(([x, y]) => R1.point(x, y, C.bleu, 8)).join("") +
    t(R1.X(0) + 8, 22, "commandes", C.pale, 17, "start") + t(R1.X(700), R1.Y(0) + 46, "pub (€)", C.pale, 17, "end") +
    t(240, 405, `pub de 400${NB}€ : commandes${NB}?`, C.rose, 24));

const R2 = repereXY(0, 5, 0, 60, { py: 10 });
const osteo = svg("Trois points A, B et C : A en 3 et 40, B en 4 et 30, C en 3 et 30 ; lequel représente la 3e année avec 40 patients ?",
  R2.fond + R2.point(3, 40, C.rose, 9) + R2.point(4, 30, C.jaune, 9) + R2.point(3, 30, C.bleu, 9) +
    t(R2.X(3) - 16, R2.Y(40) - 12, "A", C.rose, 24, "end") + t(R2.X(4) + 16, R2.Y(30) - 12, "B", C.jaune, 24, "start") +
    t(R2.X(3) - 16, R2.Y(30) + 26, "C", C.bleu, 24, "end") +
    t(R2.X(0) + 8, 22, "patients", C.pale, 17, "start") + t(R2.X(5), R2.Y(0) + 46, "année", C.pale, 17, "end") +
    t(240, 405, `(3${NB}; 40) : quel point${NB}?`, C.rose, 24));

const R3 = repereXY(0, 20, 60, 100, { px: 2, ex: 4, py: 5, ey: 10 });
const chaudieres = svg("Nuage des chaudières : âge 2, 5, 8, 10, 14, 18 ans ; rendement 95, 90, 86, 82, 75, 70 pour cent",
  R3.fond + ([[2, 95], [5, 90], [8, 86], [10, 82], [14, 75], [18, 70]] as const).map(([x, y]) => R3.point(x, y, C.bleu, 8)).join("") +
    t(R3.X(0) + 8, 22, "rendement (%)", C.pale, 17, "start") + t(R3.X(0), R3.Y(60) + 24, "0", C.pale, 17) + t(R3.X(20), R3.Y(60) + 46, "âge (ans)", C.pale, 17, "end") +
    t(240, 405, `quelle tendance${NB}?`, C.rose, 25));

const R4 = repereXY(0, 30, 0, 140, { px: 3, ex: 6, py: 10, ey: 20 });
const hammam = svg("Nuage du hammam : température 12 à 27 degrés, entrées 120, 105, 90, 80, 60, 50",
  R4.fond + ([[12, 120], [15, 105], [18, 90], [21, 80], [24, 60], [27, 50]] as const).map(([x, y]) => R4.point(x, y, C.bleu, 8)).join("") +
    t(R4.X(0) + 8, 22, "entrées", C.pale, 17, "start") + t(R4.X(30), R4.Y(0) + 46, "température (°C)", C.pale, 17, "end") +
    t(240, 405, `90 entrées : quelle température${NB}?`, C.rose, 24));

const R5 = repereXY(0, 70, 0, 35, { px: 10, py: 5, ey: 10 });
const communes = svg("Nuage de six communes : restaurants 10 à 60, feux rouges 6, 10, 14, 18, 24, 28",
  R5.fond + ([[10, 6], [20, 10], [30, 14], [40, 18], [50, 24], [60, 28]] as const).map(([x, y]) => R5.point(x, y, C.bleu, 8)).join("") +
    t(R5.X(0) + 8, 22, "feux rouges", C.pale, 17, "start") + t(R5.X(70), R5.Y(0) + 46, "restaurants", C.pale, 17, "end") +
    t(240, 405, `qui explique quoi${NB}?`, C.rose, 25));

const R6 = repereXY(0, 6, 0, 50, { gy: 120, gh: 200, py: 10 });
const epices = svg("Pain d'épices : le tableau dit 20, 30, 25, 40, 45 kilos pour les mois 1 à 5 ; le nuage place le mois 3 à 35",
  tableau(20, 12, [80, 76, 76, 76, 76, 76], 38, [["mois", 1, 2, 3, 4, 5], ["kg", 20, 30, 25, 40, 45]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    R6.fond + ([[1, 20], [2, 30], [3, 35], [4, 40], [5, 45]] as const).map(([x, y]) => R6.point(x, y, C.bleu, 8)).join("") +
    t(R6.X(6), R6.Y(0) + 46, "mois", C.pale, 17, "end") +
    t(240, 405, `quel point est faux${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_nuage",
  titre: "Énigmes du nuage de points",
  description: "La boutique en ligne de housses de canapé, le cabinet d'ostéopathe, les chaudières du chauffagiste, le hammam, le piège des six communes, le défi de la fabrique de pain d'épices : placer et lire un point, décrire la tendance d'un nuage, ne pas confondre lien et cause.",
  problemes: [
    {
      tag: "Énigme 1 · Les housses de canapé",
      titre: "Lire un point du nuage",
      question: `Une boutique en ligne vend des housses de canapé.<br>Chaque point : le budget pub d'un mois et le nombre de commandes.<br><br><b>Combien de commandes</b> le mois où la pub a coûté 400 € ?`,
      reponse: `On part de 400 sur l'axe horizontal et on monte jusqu'au point.<br>On lit à gauche : <span class="big">50 commandes</span>.`,
      consigne: "Pub de 400 € : combien de commandes ?",
      verification: { type: "courte", attendus: ["50"], unite: "commandes" },
      dessin: housses,
    },
    {
      tag: "Énigme 2 · Le cabinet d'ostéopathe",
      titre: "Placer un point",
      question: `Un ostéopathe note ses patients par semaine, année après année.<br>La 3e année, il en a 40 par semaine.<br><br><b>Quel point</b> représente cette année : A, B ou C ?`,
      reponse: `Le point s'écrit (3 ; 40) : 3 sur l'axe horizontal, 40 sur l'axe vertical.<br><span class="big">Le point A</span>.`,
      consigne: "Quel point représente (3 ; 40) ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 0 },
      dessin: osteo,
    },
    {
      tag: "Énigme 3 · Les chaudières",
      titre: "La tendance du nuage",
      question: `Un chauffagiste relève l'âge et le rendement de 6 chaudières.<br><br><b>Quelle est la tendance</b> du nuage ?`,
      reponse: `Plus la chaudière est vieille, plus son rendement baisse.<br>Le nuage descend : <span class="big">tendance décroissante</span>.`,
      consigne: "Quelle est la tendance du nuage ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "aucune tendance"], bonne: 1 },
      dessin: chaudieres,
    },
    {
      tag: "Énigme 4 · Le hammam",
      titre: "Lire une abscisse",
      question: `Un hammam compte ses entrées selon la température dehors.<br><br>Un jour, il y a eu 90 entrées.<br><b>Quelle température</b> faisait-il ce jour-là ?`,
      reponse: `On part de 90 sur l'axe vertical et on va jusqu'au point.<br>On descend lire en bas : <span class="big">18 °C</span>.`,
      consigne: "90 entrées : quelle température ?",
      verification: { type: "courte", attendus: ["18"], unite: "°C" },
      dessin: hammam,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les six communes",
      sorte: "piege",
      question: `On compare 6 communes : nombre de restaurants et nombre de feux rouges.<br>Le nuage monte.<br>Sam : « Les restaurants font pousser les feux rouges ! »<br><br><b>Quelle explication</b> est la bonne ?`,
      reponse: `Le nuage montre un lien, pas une cause.<br>Une grande commune a beaucoup d'habitants : plus de restaurants et plus de feux rouges.<br><span class="big">Les grandes communes ont plus des deux</span>.`,
      consigne: "Quelle explication est la bonne ?",
      verification: { type: "qcm", choix: ["les restaurants causent les feux rouges", "les feux rouges attirent les restaurants", "les grandes communes ont plus des deux"], bonne: 2 },
      dessin: communes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fabrique de pain d'épices",
      sorte: "defi",
      question: `Une fabrique de pain d'épices note ses ventes (en kg) sur 5 mois.<br>Un stagiaire a tracé le nuage, mais un point est mal placé.<br><br><b>Quel mois</b> est mal placé ?`,
      reponse: `On compare chaque point au tableau.<br>Le mois 3 : le tableau dit 25 kg, le point est à 35.<br><span class="big">Le mois 3</span>.`,
      consigne: "Quel mois est mal placé ?",
      verification: { type: "courte", attendus: ["3", "mois 3", "le mois 3"] },
      dessin: epices,
    },
  ],
};

export default problemes;
