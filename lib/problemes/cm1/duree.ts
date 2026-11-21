// Énigmes à projeter — CM1, notion durées (la fin de la récréation, le gâteau
// en minutes, la durée du match, dans 10 jours, le piège des 75 minutes, le
// défi du prochain bus). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

// Une horloge : h heures, m minutes.
const horloge = (cx: number, cy: number, R: number, h: number, m: number) => {
  let s = o(cx, cy, R, C.craie, 0.05, 5);
  for (let k = 1; k <= 12; k++) {
    const a = (k * Math.PI) / 6;
    s += t(cx + (R - 22) * Math.sin(a), cy - (R - 22) * Math.cos(a) + 8, k, C.craie, 18);
  }
  const am = (m * Math.PI) / 30, ah = ((h % 12) + m / 60) * (Math.PI / 6);
  s += l(cx, cy, cx + (R - 30) * Math.sin(am), cy - (R - 30) * Math.cos(am), C.bleu, 4);
  s += l(cx, cy, cx + (R - 55) * Math.sin(ah), cy - (R - 55) * Math.cos(ah), C.rose, 7);
  return s + o(cx, cy, 5, C.craie, 1, 2);
};

const recre = svg(
  "Une horloge à 10 h 15 ; la récréation dure 15 minutes",
  horloge(240, 180, 130, 10, 15) + t(240, 350, "la récré dure 15 min", C.craie, 24) + t(240, 395, `Elle finit à${NB}?`, C.rose, 26)
);

const gateau = svg(
  "Un gâteau cuit 1 h 20 min",
  r(130, 120, 220, 170, C.craie, 0.06, 4, 12) + r(160, 150, 160, 100, C.jaune, 0.25, 3, 6) + t(240, 220, "🎂", C.craie, 50) +
    t(240, 80, "cuisson : 1 h 20 min", C.craie, 26) + t(240, 360, `en minutes${NB}?`, C.rose, 28)
);

const match = svg(
  "Un match de 14 h 45 à 16 h 15",
  t(240, 90, "⚽", C.craie, 50) + r(50, 150, 160, 70, C.bleu, 0.15, 3, 10) + t(130, 197, "14 h 45", C.craie, 30) + t(240, 197, "→", C.pale, 30) +
    r(270, 150, 160, 70, C.bleu, 0.15, 3, 10) + t(350, 197, "16 h 15", C.craie, 30) + t(130, 250, "début", C.pale, 20) + t(350, 250, "fin", C.pale, 20) +
    t(240, 340, `Durée du match${NB}?`, C.rose, 28)
);

const jours = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
const calendrier = svg(
  "Un calendrier : aujourd'hui lundi ; dans 10 jours ?",
  jours.map((j, i) => r(30 + i * 62, 120, 56, 56, i === 0 ? C.jaune : C.craie, i === 0 ? 0.3 : 0.04, 3, 6) + t(58 + i * 62, 156, j, C.craie, 18)).join("") +
    jours.map((j, i) => r(30 + i * 62, 186, 56, 56, C.craie, 0.04, 3, 6) + t(58 + i * 62, 222, j, C.pale, 18)).join("") +
    t(240, 90, "📅 aujourd'hui : lundi", C.craie, 24) + t(240, 330, `Dans 10 jours${NB}?`, C.rose, 28)
);

const film = svg(
  "Un film de 75 minutes",
  r(110, 110, 260, 160, C.craie, 0.08, 5, 12) + t(240, 210, "🎬", C.craie, 60) + t(240, 70, "75 minutes", C.craie, 32) +
    t(240, 340, `en heures et minutes${NB}?`, C.rose, 26)
);

const bus = svg(
  "Un bus toutes les 20 minutes à partir de 7 h 10 ; tu arrives à 8 h 05",
  t(90, 130, "🚌", C.craie, 70) + r(180, 70, 250, 120, C.jaune, 0.15, 3, 10) + t(305, 115, "1er bus : 7 h 10", C.craie, 22) + t(305, 160, "puis toutes les 20 min", C.craie, 20) +
    t(240, 260, "tu arrives à 8 h 05", C.bleu, 28) + t(240, 340, `le prochain bus${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "duree",
  titre: "Énigmes sur les durées",
  description: "La fin de la récréation, le gâteau en minutes, la durée du match, le jour dans 10 jours, le piège des 75 minutes du film, le défi du prochain bus.",
  problemes: [
    {
      tag: "Énigme 1 · La récréation",
      titre: "La fin de la récré",
      question: `La récréation commence à <b>10 h 15</b>.<br>Elle dure <b>15 minutes</b>.<br><br>À <b>quelle heure</b> finit-elle ?`,
      reponse: `10 h 15 + 15 min.<br>15 + 15 = 30 : elle finit à <span class="big">10 h 30</span>.`,
      consigne: "À quelle heure finit la récréation ? (écris par exemple 9h45)",
      verification: { type: "courte", attendus: ["10h30", "10:30", "10h30min"] },
      dessin: recre,
    },
    {
      tag: "Énigme 2 · En cuisine",
      titre: "La cuisson du gâteau",
      question: `Le gâteau cuit <b>1 h 20 min</b>.<br><br>Combien de <b>minutes</b> en tout ?`,
      reponse: `1 h = 60 min.<br>60 + 20 = <span class="big">80 minutes</span>.`,
      consigne: "1 h 20 min, c'est combien de minutes ?",
      verification: { type: "courte", attendus: ["80"], unite: "min" },
      dessin: gateau,
    },
    {
      tag: "Énigme 3 · Le match",
      titre: "La durée du match",
      question: `Le match commence à <b>14 h 45</b>.<br>Il finit à <b>16 h 15</b>.<br><br><b>Combien de temps</b> dure-t-il ?`,
      reponse: `14 h 45 → 15 h : 15 min. 15 h → 16 h : 1 h. 16 h → 16 h 15 : 15 min.<br>15 min + 1 h + 15 min = <span class="big">1 h 30 min</span>.`,
      consigne: "Combien de temps dure le match ?",
      verification: { type: "qcm", choix: ["1 h 30 min", "1 h 70 min", "2 h 30 min"], bonne: 0 },
      dessin: match,
    },
    {
      tag: "Énigme 4 · Le calendrier",
      titre: "Dans 10 jours",
      question: `Aujourd'hui, nous sommes <b>lundi</b>.<br><br><b>Quel jour</b> serons-nous dans <b>10 jours</b> ?`,
      reponse: `Dans 7 jours : de nouveau lundi.<br>Encore 3 jours : mardi, mercredi, jeudi.<br>Nous serons <span class="big">jeudi</span>.`,
      consigne: "Quel jour serons-nous dans 10 jours ?",
      verification: { type: "qcm", choix: ["mercredi", "jeudi", "vendredi"], bonne: 1 },
      dessin: calendrier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les 75 minutes",
      sorte: "piege",
      question: `Le film dure <b>75 minutes</b>.<br>Kim dit : « Ça fait 1 h 75 ».<br><br>Combien en <b>heures et minutes</b> ?`,
      reponse: `Le piège : une heure n'a pas 100 minutes, mais 60 !<br>75 = 60 + 15.<br>75 minutes = <span class="big">1 h 15 min</span>.`,
      consigne: "75 minutes, c'est combien en heures et minutes ?",
      verification: { type: "qcm", choix: ["1 h 75 min", "7 h 5 min", "1 h 15 min"], bonne: 2 },
      dessin: film,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le prochain bus",
      sorte: "defi",
      question: `Le premier bus part à <b>7 h 10</b>.<br>Puis un bus part <b>toutes les 20 minutes</b>.<br>Tu arrives à l'arrêt à <b>8 h 05</b>.<br><br>À quelle heure part <b>ton bus</b> ?`,
      reponse: `7 h 10, 7 h 30, 7 h 50, puis 8 h 10.<br>Le bus de 7 h 50 est parti. Ton bus : <span class="big">8 h 10</span>.`,
      consigne: "À quelle heure part ton bus ? (écris par exemple 9h45)",
      verification: { type: "courte", attendus: ["8h10", "08h10", "8:10", "08:10", "8h10min"] },
      dessin: bus,
    },
  ],
};

export default problemes;
