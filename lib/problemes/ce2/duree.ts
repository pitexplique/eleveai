// Énigmes à projeter — CE2, notion temps et durées (le réveil, le film en
// minutes, la séance de piscine, les deux semaines de vacances, le piège du
// train de 9 h 50, le défi de la bougie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

/** Une horloge à aiguilles (h de 1 à 12, m en minutes). */
const horloge = (cx: number, cy: number, R: number, h: number, m: number) => {
  let s = o(cx, cy, R, C.craie, 0.04, 5);
  for (let k = 1; k <= 12; k++) {
    const a = (k * Math.PI) / 6;
    s += t(cx + (R - 26) * Math.sin(a), cy - (R - 26) * Math.cos(a) + 9, k, C.craie, 24);
  }
  const am = (m * Math.PI) / 30, ah = ((h % 12) + m / 60) * (Math.PI / 6);
  s += l(cx, cy, cx + (R - 30) * Math.sin(am), cy - (R - 30) * Math.cos(am), C.bleu, 5);
  s += l(cx, cy, cx + (R - 62) * Math.sin(ah), cy - (R - 62) * Math.cos(ah), C.rose, 8);
  return s + o(cx, cy, 6, C.craie, 1, 2);
};

const reveil = svg(
  "Un réveil qui montre 7 h 15 : la petite aiguille juste après le 7, la grande sur le 3",
  horloge(240, 190, 150, 7, 15) + t(240, 385, `Quelle heure, ce matin${NB}?`, C.rose, 28)
);

const film = svg(
  "Un film de 1 h 30 min",
  r(90, 90, 300, 180, C.craie, 0.08, 5, 10) + t(240, 200, "🎬", C.craie, 70) + t(240, 320, "1 h 30 min", C.bleu, 36) + t(240, 385, `en minutes${NB}?`, C.rose, 28)
);

const piscine = svg(
  "La séance de piscine commence à 10 h et finit à 10 h 45",
  horloge(120, 180, 100, 10, 0) + horloge(360, 180, 100, 10, 45) + t(120, 320, "début", C.craie, 24) + t(360, 320, "fin", C.craie, 24) +
    t(240, 385, `Combien de temps${NB}?`, C.rose, 28)
);

const calendrier = svg(
  "Un calendrier : deux semaines de vacances coloriées",
  ["L", "M", "M", "J", "V", "S", "D"].map((j, i) => t(70 + i * 57, 90, j, C.pale, 22)).join("") +
    Array.from({ length: 21 }, (_, k) => r(45 + (k % 7) * 57, 105 + Math.floor(k / 7) * 60, 50, 50, k < 14 ? C.jaune : C.craie, k < 14 ? 0.35 : 0, 2, 4)).join("") +
    t(240, 330, "vacances : 2 semaines", C.craie, 26) + t(240, 385, `Combien de jours${NB}?`, C.rose, 28)
);

const train = svg(
  "Le train part à 9 h 50 ; le trajet dure 20 minutes",
  r(60, 120, 300, 110, C.bleu, 0.2, 4, 20) + [0, 1, 2].map((i) => r(90 + i * 85, 140, 60, 45, C.craie, 0.05, 3, 4)).join("") +
    o(120, 240, 18, C.craie, 0.3, 4) + o(300, 240, 18, C.craie, 0.3, 4) + l(30, 260, 450, 260, C.pale, 4) +
    t(240, 90, "départ 9 h 50", C.craie, 28) + t(240, 310, "trajet : 20 min", C.craie, 26) + t(240, 380, `Heure d'arrivée${NB}?`, C.rose, 28)
);

const bougie = svg(
  "Une bougie de 6 cm allumée à 18 h ; elle brûle 1 cm toutes les 10 minutes",
  r(200, 140, 80, 180, C.jaune, 0.3, 4, 4) + `<path d="M240 140 Q222 110 240 80 Q258 110 240 140 Z" fill="${C.rose}" fill-opacity="0.5" stroke="${C.rose}" stroke-width="3"/>` +
    Array.from({ length: 7 }, (_, k) => l(290, 140 + k * 30, 305, 140 + k * 30, C.craie, 2)).join("") + t(345, 240, "6 cm", C.craie, 24) +
    t(110, 240, "18 h", C.bleu, 30) + t(240, 365, "1 cm toutes les 10 min", C.craie, 24) + t(240, 405, `Éteinte à quelle heure${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "duree",
  titre: "Énigmes sur le temps et les durées",
  description: "Lire l'heure sur le réveil, le film en minutes, la séance de piscine, deux semaines de vacances, le piège du train de 9 h 50, le défi de la bougie qui fond.",
  problemes: [
    {
      tag: "Énigme 1 · Le réveil",
      titre: "Quelle heure est-il ?",
      question: `C'est le matin. Regarde le réveil.<br>La petite aiguille dit l'heure.<br>La grande dit les minutes.<br><br>Quelle heure est-il ?`,
      reponse: `La petite aiguille vient de passer le 7 : 7 heures.<br>La grande est sur le 3 : 3 × 5 = 15 minutes.<br><span class="big">7 h 15</span>.`,
      consigne: "Quelle heure indique le réveil ?",
      verification: { type: "qcm", choix: ["3 h 07", "7 h 15", "7 h 03"], bonne: 1 },
      dessin: reveil,
    },
    {
      tag: "Énigme 2 · Le cinéma",
      titre: "Le film",
      question: `Le film dure <b>1 h 30 min</b>.<br><br>Combien de <b>minutes</b> ?`,
      reponse: `1 h = 60 min.<br>60 + 30 = <span class="big">90 minutes</span>.`,
      consigne: "1 h 30 min, c'est combien de minutes ?",
      verification: { type: "courte", attendus: ["90"], unite: "min" },
      dessin: film,
    },
    {
      tag: "Énigme 3 · La piscine",
      titre: "La séance",
      question: `La séance commence à <b>10 h</b>.<br>Elle finit à <b>10 h 45</b>.<br><br>Combien de temps dure-t-elle ?`,
      reponse: `De 10 h à 10 h 45, l'heure ne change pas.<br>La grande aiguille avance de 45 minutes.<br><span class="big">45 min</span>.`,
      consigne: "Combien de temps dure la séance ?",
      verification: { type: "qcm", choix: ["10 min", "1 h 45", "45 min"], bonne: 2 },
      dessin: piscine,
    },
    {
      tag: "Énigme 4 · Le calendrier",
      titre: "Les vacances",
      question: `Les vacances durent <b>2 semaines</b>.<br>Une semaine a <b>7 jours</b>.<br><br>Combien de jours de vacances ?`,
      reponse: `2 × 7 = <span class="big">14 jours</span>.<br>On peut compter les cases jaunes.`,
      consigne: "Combien de jours dans 2 semaines ?",
      verification: { type: "courte", attendus: ["14"], unite: "jours" },
      dessin: calendrier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le train",
      sorte: "piege",
      question: `Le train part à <b>9 h 50</b>.<br>Le trajet dure <b>20 minutes</b>.<br><br>À quelle heure arrive-t-il ?`,
      reponse: `Le piège : écrire 9 h 70. Une heure n'a que 60 minutes !<br>9 h 50 + 10 min = 10 h. Puis + 10 min.<br><span class="big">10 h 10</span>.`,
      consigne: "À quelle heure arrive le train ?",
      verification: { type: "qcm", choix: ["9 h 70", "10 h 10", "10 h 20"], bonne: 1 },
      dessin: train,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bougie",
      sorte: "defi",
      question: `La bougie mesure <b>6 cm</b>.<br>Elle fond de <b>1 cm toutes les 10 minutes</b>.<br>On l'allume à <b>18 h</b>.<br><br>À quelle heure s'éteint-elle ?`,
      reponse: `6 cm, c'est 6 fois 10 minutes = 60 minutes.<br>60 minutes = 1 heure.<br>18 h + 1 h = <span class="big">19 h</span>.`,
      consigne: "À quelle heure la bougie s'éteint-elle ?",
      verification: { type: "qcm", choix: ["19 h", "18 h 06", "18 h 60"], bonne: 0 },
      dessin: bougie,
    },
  ],
};

export default problemes;
