// Énigmes à projeter — CM2, notion tableau (les prêts de la bibliothèque :
// lire une case, un total, comparer ; les horaires du bus ; le piège du foot et
// du basket qui ne s'ajoutent pas ; le défi du tableau à double entrée).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Un tableau : lignes de cellules, la 1re ligne et la 1re colonne en titre. */
const tableau = (x: number, y: number, larg: number[], h: number, cases: string[][], taille = 22) => {
  let s = "";
  cases.forEach((ligne, j) => {
    let cx = x;
    ligne.forEach((v, i) => {
      const titre = i === 0 || j === 0;
      s += r(cx, y + j * h, larg[i], h, titre ? C.pale : C.bleu, titre ? 0.2 : 0.05, 2) + t(cx + larg[i] / 2, y + j * h + h / 2 + taille / 3, v, v.includes("?") ? C.rose : C.craie, taille);
      cx += larg[i];
    });
  });
  return s;
};

const PRETS = [
  ["", "lundi", "mardi", "total"],
  ["romans", "12", "15", "27"],
  ["BD", "20", "?", "38"],
  ["documentaires", "8", "6", "14"],
  ["total", "40", "?", "?"],
];
const prets = (titre: string) =>
  svg("Le tableau des livres prêtés par la bibliothèque, lundi et mardi : romans, BD, documentaires", t(240, 50, "📚 livres prêtés", C.craie, 24) + tableau(20, 80, [150, 100, 100, 90], 56, PRETS, 20) + t(240, 395, titre, C.rose, 24));

const bus = svg(
  "Les horaires du bus : gare 8 h 10, mairie 8 h 25, école 8 h 32",
  t(240, 60, "🚌 ligne 3", C.craie, 26) + tableau(60, 100, [180, 180], 60, [["arrêt", "passage"], ["Gare", "8 h 10"], ["Mairie", "8 h 25"], ["École", "8 h 32"]], 24) +
    t(240, 385, `de la gare à l'école${NB}?`, C.rose, 24)
);

const sports = svg(
  "Un sondage dans une classe de 25 élèves : 15 aiment le foot, 12 aiment le basket",
  t(240, 60, "25 élèves", C.craie, 28) + tableau(70, 100, [200, 140], 64, [["sport", "aiment"], ["⚽ foot", "15"], ["🏀 basket", "12"]], 26) +
    t(240, 340, `«${NB}15 + 12 = 27 élèves${NB}» dit Tom`, C.craie, 22)
);

const classe = svg(
  "Un tableau à double entrée à compléter : filles et garçons, demi-pensionnaires et externes, 28 élèves",
  tableau(20, 80, [120, 115, 115, 90], 64, [["", "filles", "garçons", "total"], ["demi-pension", "10", "", "20"], ["externes", "", "?", ""], ["total", "16", "", "28"]], 18)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "tableau",
  titre: "Énigmes sur les tableaux",
  description: "Les prêts de la bibliothèque (une case, un total, le livre préféré), les horaires du bus, le piège du sondage foot et basket, le défi du tableau à double entrée.",
  problemes: [
    {
      tag: "Énigme 1 · À la bibliothèque",
      titre: "Les BD du mardi",
      question: `Le tableau montre les livres prêtés lundi et mardi.<br>Une case est cachée.<br><br><b>Combien de BD</b> ont été prêtées mardi ?`,
      reponse: `Ligne des BD : 20 lundi, 38 en tout.<br>38 − 20 = <span class="big">18 BD</span> mardi.`,
      consigne: "Combien de BD mardi ?",
      verification: { type: "courte", attendus: ["18"], unite: "BD" },
      dessin: prets(`BD du mardi${NB}?`),
    },
    {
      tag: "Énigme 2 · À la bibliothèque",
      titre: "Le total du mardi",
      question: `Regarde la colonne du <b>mardi</b>.<br>(Mardi, on a prêté 18 BD.)<br><br><b>Combien de livres</b> ont été prêtés mardi en tout ?`,
      reponse: `15 romans + 18 BD + 6 documentaires.<br>15 + 18 + 6 = <span class="big">39 livres</span>.`,
      consigne: "Combien de livres prêtés mardi en tout ?",
      verification: { type: "courte", attendus: ["39"], unite: "livres" },
      dessin: prets(`total du mardi${NB}?`),
    },
    {
      tag: "Énigme 3 · À la bibliothèque",
      titre: "Le livre préféré",
      question: `Sur les deux jours, <b>quel type de livre</b> a été le plus prêté ?`,
      reponse: `On lit la colonne « total » : romans 27, BD 38, documentaires 14.<br><span class="big">Les BD</span> ont été le plus prêtées.`,
      consigne: "Quel type de livre a été le plus prêté ?",
      verification: { type: "qcm", choix: ["Les romans", "Les documentaires", "Les BD"], bonne: 2 },
      dessin: prets(`le plus prêté${NB}?`),
    },
    {
      tag: "Énigme 4 · À l'arrêt de bus",
      titre: "Les horaires",
      question: `Voici les horaires du bus de la ligne 3.<br><br>Combien de <b>minutes</b> dure le trajet de la <b>Gare</b> à l'<b>École</b> ?`,
      reponse: `De 8 h 10 à 8 h 32.<br>32 − 10 = <span class="big">22 minutes</span>.`,
      consigne: "Combien de minutes de la Gare à l'École ?",
      verification: { type: "courte", attendus: ["22"], unite: "min" },
      dessin: bus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Foot et basket",
      sorte: "piege",
      question: `Dans une classe de <b>25 élèves</b>, 15 aiment le foot et 12 aiment le basket.<br>Tom dit : « 15 + 12 = 27, la classe a 27 élèves ! »<br><br>Combien d'élèves aiment <b>les deux</b>, au moins ?`,
      reponse: `La classe n'a que 25 élèves. Certains aiment les deux sports : on les a comptés deux fois !<br>27 − 25 = 2. Au moins <span class="big">2 élèves</span> aiment les deux.`,
      consigne: "Combien d'élèves, au moins, aiment le foot et le basket ?",
      verification: { type: "qcm", choix: ["2", "27", "0"], bonne: 0 },
      dessin: sports,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tableau à compléter",
      sorte: "defi",
      question: `Une classe a <b>28 élèves</b>, dont <b>16 filles</b>.<br><b>20 élèves</b> mangent à la cantine, dont <b>10 filles</b>.<br><br>Combien de <b>garçons externes</b> ?`,
      reponse: `Garçons : 28 − 16 = 12.<br>Garçons à la cantine : 20 − 10 = 10.<br>Garçons externes : 12 − 10 = <span class="big">2</span>.`,
      consigne: "Combien de garçons sont externes ?",
      verification: { type: "courte", attendus: ["2"], unite: "garçons" },
      dessin: classe,
    },
  ],
};

export default problemes;
