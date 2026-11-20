// Énigmes à projeter — CM2, notion duree (la fin du film, la durée du trajet
// en train, les secondes en minutes, les jours du stage, le piège 1,5 h =
// 1 h 50, le défi de la bougie). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

// Une horloge : aiguilles à h heures et m minutes.
const horloge = (cx: number, cy: number, R: number, h: number, m: number, c: string = C.craie) => {
  let s = o(cx, cy, R, c, 0.05, 4);
  for (let k = 0; k < 12; k++) {
    const a = (k * Math.PI) / 6;
    s += l(cx + (R - 10) * Math.sin(a), cy - (R - 10) * Math.cos(a), cx + R * Math.sin(a), cy - R * Math.cos(a), c, 3);
  }
  const am = (m * Math.PI) / 30, ah = (((h % 12) + m / 60) * Math.PI) / 6;
  return s + l(cx, cy, cx + R * 0.8 * Math.sin(am), cy - R * 0.8 * Math.cos(am), C.bleu, 4) + l(cx, cy, cx + R * 0.5 * Math.sin(ah), cy - R * 0.5 * Math.cos(ah), C.rose, 6) + o(cx, cy, 5, c, 1, 2);
};

const film = svg(
  "Un film commence à 14 h 35 et dure 1 h 50 min",
  horloge(130, 190, 90, 14, 35) + t(130, 320, "début : 14 h 35", C.craie, 22) +
    r(270, 130, 180, 110, C.jaune, 0.15, 4, 10) + t(360, 180, "🎬 durée", C.craie, 24) + t(360, 220, "1 h 50 min", C.craie, 26) + t(360, 320, `fin${NB}?`, C.rose, 28)
);

const train = svg(
  "Un train part à 9 h 47 et arrive à 11 h 15",
  t(240, 120, "🚆", C.craie, 70) + l(60, 200, 420, 200, C.craie, 4) + o(60, 200, 10, C.bleu, 1, 2) + o(420, 200, 10, C.rose, 1, 2) +
    t(60, 250, "départ", C.pale, 20) + t(60, 285, "9 h 47", C.craie, 28) + t(420, 250, "arrivée", C.pale, 20) + t(420, 285, "11 h 15", C.craie, 28) +
    t(240, 370, `durée du trajet${NB}?`, C.rose, 28)
);

const chrono = svg(
  "Un chronomètre : la course a duré 150 secondes",
  o(240, 200, 120, C.craie, 0.05, 5) + r(222, 55, 36, 26, C.craie, 0.2, 3, 4) + t(240, 215, "150 s", C.craie, 50) + t(240, 380, `en minutes et secondes${NB}?`, C.rose, 26)
);

const stage = () => {
  const j = ["L", "M", "M", "J", "V", "S", "D"];
  let s = j.map((d, i) => t(70 + i * 57, 80, d, C.pale, 20)).join("");
  for (let k = 0; k < 14; k++) {
    const x = 45 + (k % 7) * 57, y = 100 + Math.floor(k / 7) * 70, n = k + 3;
    const dedans = n <= 14;
    s += r(x, y, 50, 56, dedans ? C.jaune : C.pale, dedans ? 0.3 : 0.05, 2, 4) + t(x + 25, y + 37, n, C.craie, 22);
  }
  return svg("Un calendrier du lundi 3 au dimanche 16 : le stage va du lundi 3 au vendredi 14", s + t(240, 320, "stage : du lundi 3 au vendredi 14", C.craie, 22) + t(240, 380, `Combien de jours${NB}?`, C.rose, 26));
};

const lina = svg(
  "Lina a couru 1,5 heure ; elle dit 1 h 50 min",
  horloge(240, 170, 110, 1, 30) + t(240, 330, `«${NB}1,5 h = 1 h 50 min${NB}»`, C.rose, 28) + t(240, 375, "dit Lina", C.pale, 20)
);

// La bougie : 15 cm = 300 px (1 cm = 20 px).
const bougie = svg(
  "Une bougie de 15 cm qui brûle 2 cm par heure, allumée à 18 h 00",
  r(200, 80, 80, 300, C.jaune, 0.25, 4, 6) + l(240, 80, 240, 55, C.craie, 3) + `<ellipse cx="240" cy="40" rx="10" ry="18" fill="${C.rose}" fill-opacity=".6"/>` +
    l(300, 280, 330, 280, C.rose, 3, "6 4") + t(340, 288, "5 cm", C.rose, 20, "start") + t(110, 200, "15 cm", C.craie, 24) + t(110, 240, "− 2 cm", C.pale, 20) + t(110, 265, "par heure", C.pale, 18) +
    t(390, 120, "allumée", C.pale, 18) + t(390, 145, "à 18 h 00", C.craie, 20) + t(390, 360, `5 cm${NB}: ? h`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "duree",
  titre: "Énigmes sur les durées",
  description: "La fin du film, le trajet en train, la course de 150 secondes, les jours du stage, le piège de l'heure et demie de Lina, le défi de la bougie.",
  problemes: [
    {
      tag: "Énigme 1 · Au cinéma",
      titre: "La fin du film",
      question: `Un film commence à <b>14 h 35</b>.<br>Il dure <b>1 h 50 min</b>.<br><br><b>À quelle heure</b> finit-il ?`,
      reponse: `14 h 35 + 1 h = 15 h 35.<br>15 h 35 + 25 min = 16 h 00, puis + 25 min = 16 h 25.<br>Le film finit à <span class="big">16 h 25</span>.`,
      consigne: "À quelle heure finit le film ?",
      verification: { type: "courte", attendus: ["16h25", "16h25min", "16:25"] },
      dessin: film,
    },
    {
      tag: "Énigme 2 · En train",
      titre: "Le trajet",
      question: `Le train part à <b>9 h 47</b>.<br>Il arrive à <b>11 h 15</b>.<br><br><b>Combien de temps</b> dure le trajet ?`,
      reponse: `9 h 47 → 10 h 00 : 13 min.<br>10 h 00 → 11 h 15 : 1 h 15 min.<br>13 min + 1 h 15 min = <span class="big">1 h 28 min</span>.`,
      consigne: "Combien de temps dure le trajet ?",
      verification: { type: "courte", attendus: ["1h28", "1h28min", "88min", "88"] },
      dessin: train,
    },
    {
      tag: "Énigme 3 · Au stade",
      titre: "Le chronomètre",
      question: `Une course a duré <b>150 secondes</b>.<br><br>Cela fait combien de <b>minutes et secondes</b> ?`,
      reponse: `1 min = 60 s. 2 min = 120 s.<br>150 − 120 = 30.<br>La course a duré <span class="big">2 min 30 s</span>.`,
      consigne: "150 secondes, c'est combien ?",
      verification: { type: "qcm", choix: ["1 min 50 s", "1 min 30 s", "2 min 30 s"], bonne: 2 },
      dessin: chrono,
    },
    {
      tag: "Énigme 4 · Le stage de cuisine",
      titre: "Les jours du stage",
      question: `Un stage de cuisine va du <b>lundi 3</b> au <b>vendredi 14</b>, ces deux jours compris.<br>Il a lieu <b>tous les jours</b>, week-end compris.<br><br><b>Combien de jours</b> dure-t-il ?`,
      reponse: `On compte du 3 au 14 : 14 − 3 = 11… mais il faut compter le 3 aussi !<br>11 + 1 = <span class="big">12 jours</span>.`,
      consigne: "Combien de jours dure le stage ?",
      verification: { type: "courte", attendus: ["12"], unite: "jours" },
      dessin: stage(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La course de Lina",
      sorte: "piege",
      question: `Lina a couru pendant <b>1,5 h</b>.<br>Elle dit : « 1,5 h, c'est 1 h 50 min. »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! Une heure n'a pas 100 minutes, elle en a 60.<br>0,5 h, c'est une demi-heure : 30 min.<br>1,5 h = <span class="big">1 h 30 min</span>.`,
      consigne: "1,5 h, c'est combien ?",
      verification: { type: "qcm", choix: ["1 h 50 min", "1 h 30 min", "1 h 05 min"], bonne: 1 },
      dessin: lina,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bougie",
      sorte: "defi",
      question: `Une bougie mesure <b>15 cm</b>.<br>Elle perd <b>2 cm par heure</b>.<br>On l'allume à <b>18 h 00</b>.<br><br><b>À quelle heure</b> mesurera-t-elle 5 cm ?`,
      reponse: `Elle doit perdre 15 − 5 = 10 cm.<br>10 ÷ 2 = 5 heures.<br>18 h + 5 h = <span class="big">23 h 00</span>.`,
      consigne: "À quelle heure la bougie mesurera-t-elle 5 cm ?",
      verification: { type: "courte", attendus: ["23h", "23h00", "23:00"] },
      dessin: bougie,
    },
  ],
};

export default problemes;
