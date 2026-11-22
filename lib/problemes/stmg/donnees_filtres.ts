// Énigmes à projeter — STMG (1re), notion filtrer des données (ET, OU, NON)
// (le cours de pilates, le bailleur social, l'aéroclub, les véhicules de
// l'entreprise de BTP, piège du club de tennis de table, défi du salon des
// métiers). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, ell } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

/** Un fichier façon tableur : en-tête pâle, puis une ligne par individu. */
const fichier = (cols: number[], tete: string[], lignes: (string | number)[][], y = 20, h = 44) => {
  const x = (480 - cols.reduce((a, b) => a + b, 0)) / 2;
  return tableau(x, y, cols, h, [tete, ...lignes], (i) => (i === 0 ? C.pale : C.craie), 20);
};

const pilates = svg("Le fichier du cours de pilates : Ana 34 ans, Bruno 52, Chloé 41, David 28, Emma 40, Farid 63",
  fichier([150, 110, 130], ["prénom", "âge", "créneau"],
    [["Ana", 34, "matin"], ["Bruno", 52, "soir"], ["Chloé", 41, "midi"], ["David", 28, "soir"], ["Emma", 40, "matin"], ["Farid", 63, "midi"]]) +
    t(240, 365, `âge 40 ans ou plus${NB}: combien${NB}?`, C.rose, 25));

const bailleur = svg("Le fichier du bailleur social : L1 T2 480 euros, L2 T3 590, L3 T3 640, L4 T4 720, L5 T3 550, L6 T2 610",
  fichier([130, 110, 150], ["logement", "type", "loyer (€)"],
    [["L1", "T2", 480], ["L2", "T3", 590], ["L3", "T3", 640], ["L4", "T4", 720], ["L5", "T3", 550], ["L6", "T2", 610]]) +
    t(240, 365, `T3 ET loyer moins de 600${NB}€`, C.rose, 25));

const aeroclub = svg("Le fichier des vols de l'aéroclub : V1 jour 60 minutes, V2 nuit 90, V3 jour 180, V4 nuit 150, V5 jour 120, V6 jour 75",
  fichier([110, 130, 150], ["vol", "moment", "durée (min)"],
    [["V1", "jour", 60], ["V2", "nuit", 90], ["V3", "jour", 180], ["V4", "nuit", 150], ["V5", "jour", 120], ["V6", "jour", 75]]) +
    t(240, 365, `nuit OU plus de 120${NB}min`, C.rose, 25));

const btp = svg("Les véhicules de l'entreprise de BTP : 6 véhicules, diesel, électrique, diesel, essence, diesel, électrique",
  fichier([140, 180], ["véhicule", "carburant"],
    [["camion 1", "diesel"], ["utilitaire 1", "électrique"], ["camion 2", "diesel"], ["utilitaire 2", "essence"], ["pelleteuse", "diesel"], ["voiture", "électrique"]]) +
    t(240, 365, `NON diesel${NB}: combien${NB}?`, C.rose, 26));

const tennis = svg("Le club de tennis de table : 30 joueurs en compétition, 20 juniors, dont 12 juniors en compétition",
  ell(175, 220, 135, 95, C.bleu, 0.15, 3) + ell(305, 220, 135, 95, C.jaune, 0.15, 3) +
    t(140, 70, "compétition : 30", C.bleu, 22) + t(350, 70, "juniors : 20", C.jaune, 22) +
    t(240, 230, "12", C.craie, 30) +
    t(240, 375, `compétition OU juniors${NB}?`, C.rose, 25));

const metiers = svg("Le salon des métiers : 200 visiteurs, 120 lycéens, 90 venus en bus, dont 50 lycéens venus en bus",
  t(240, 40, "200 visiteurs", C.craie, 26) +
    ell(175, 190, 135, 90, C.bleu, 0.15, 3) + ell(305, 190, 135, 90, C.jaune, 0.15, 3) +
    t(135, 85, "lycéens : 120", C.bleu, 21) + t(355, 85, "en bus : 90", C.jaune, 21) +
    t(240, 200, "50", C.craie, 30) +
    t(240, 340, "ni lycéen, ni en bus :", C.pale, 23) + t(240, 385, `combien${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "donnees_filtres",
  titre: "Énigmes des filtres sur des données (ET, OU, NON)",
  description: "Le cours de pilates, le bailleur social, l'aéroclub, les véhicules de l'entreprise de BTP, le piège du club de tennis de table, le défi du salon des métiers : filtrer un fichier avec un critère, avec ET, avec OU, avec NON.",
  problemes: [
    {
      tag: "Énigme 1 · Le cours de pilates",
      titre: "Filtrer avec un critère",
      question: `Un studio de pilates tient le fichier de son cours.<br>La gérante filtre les inscrits de 40 ans ou plus.<br><br><b>Combien d'inscrits</b> garde le filtre ?`,
      reponse: `40 ans ou plus : Bruno (52), Chloé (41), Emma (40) et Farid (63).<br>Emma compte : 40, c'est « 40 ou plus ».<br><span class="big">4 inscrits</span>.`,
      consigne: "Combien d'inscrits ont 40 ans ou plus ?",
      verification: { type: "courte", attendus: ["4"], unite: "inscrits" },
      dessin: pilates,
    },
    {
      tag: "Énigme 2 · Le bailleur social",
      titre: "Filtrer avec ET",
      question: `Un bailleur social cherche un logement pour une famille.<br>Il filtre : type T3 <b>ET</b> loyer de moins de 600 €.<br><br><b>Combien de logements</b> garde le filtre ?`,
      reponse: `ET : les deux critères à la fois.<br>Les T3 : L2, L3, L5. Moins de 600 € parmi eux : L2 (590) et L5 (550).<br><span class="big">2 logements</span>.`,
      consigne: "T3 ET moins de 600 € : combien de logements ?",
      verification: { type: "qcm", choix: ["2", "3", "4"], bonne: 0 },
      dessin: bailleur,
    },
    {
      tag: "Énigme 3 · L'aéroclub",
      titre: "Filtrer avec OU",
      question: `Un aéroclub relit ses vols de la semaine.<br>Il filtre : vol de nuit <b>OU</b> vol de plus de 120 minutes.<br><br><b>Combien de vols</b> garde le filtre ?`,
      reponse: `OU : au moins un des deux critères.<br>De nuit : V2, V4. Plus de 120 min : V3, V4 (V5 fait 120 pile : non).<br>V4 ne compte qu'une fois : V2, V3, V4.<br><span class="big">3 vols</span>.`,
      consigne: "Nuit OU plus de 120 min : combien de vols ?",
      verification: { type: "courte", attendus: ["3"], unite: "vols" },
      dessin: aeroclub,
    },
    {
      tag: "Énigme 4 · L'entreprise de BTP",
      titre: "Filtrer avec NON",
      question: `Une entreprise de BTP liste ses 6 véhicules.<br>Elle filtre : <b>NON</b> diesel.<br><br><b>Combien de véhicules</b> garde le filtre ?`,
      reponse: `NON diesel : tous ceux qui ne roulent pas au diesel.<br>3 véhicules diesel sur 6, donc 6 − 3 = <span class="big">3 véhicules</span>.`,
      consigne: "NON diesel : combien de véhicules ?",
      verification: { type: "courte", attendus: ["3"], unite: "véhicules" },
      dessin: btp,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le club de tennis de table",
      sorte: "piege",
      question: `Un club de tennis de table compte 30 joueurs en compétition et 20 juniors.<br>12 juniors font de la compétition.<br>Tom : « Compétition OU juniors : 30 + 20 = 50 joueurs. »<br><br><b>Combien de joueurs</b> sont en compétition OU juniors ?`,
      reponse: `Tom compte deux fois les 12 juniors en compétition.<br>30 + 20 − 12 = <span class="big">38 joueurs</span>.`,
      consigne: "Compétition OU juniors : combien de joueurs ?",
      verification: { type: "qcm", choix: ["50", "38", "12"], bonne: 1 },
      dessin: tennis,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le salon des métiers",
      sorte: "defi",
      question: `Un salon des métiers a reçu 200 visiteurs.<br>120 sont des lycéens.<br>90 sont venus en bus.<br>50 lycéens sont venus en bus.<br><br><b>Combien de visiteurs</b> ne sont NI lycéens, NI venus en bus ?`,
      reponse: `Lycéens OU en bus : 120 + 90 − 50 = 160.<br>Le contraire : 200 − 160 = <span class="big">40 visiteurs</span>.`,
      consigne: "Ni lycéens, ni en bus : combien de visiteurs ?",
      verification: { type: "qcm", choix: ["160", "50", "40"], bonne: 2 },
      dessin: metiers,
    },
  ],
};

export default problemes;
