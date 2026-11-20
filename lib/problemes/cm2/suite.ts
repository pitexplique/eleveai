// Énigmes à projeter — CM2, notion suite (de 15 en 15 sur l'horloge, de 125 en
// 125, à reculons, les tables et les chaises, le piège du « + 2 » au lieu du
// « × 2 », le défi des nombres triangulaires). 20/11/2026. Phrases courtes.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, fleche, droiteGraduee } from "../dessins-ecole";

// Une frise de 7 h 00 à 8 h 00, 1 h = 360 px : au bon rapport.
const bus = svg(
  "Une frise du temps de 7 h 00 à 8 h 00, un bus toutes les 15 minutes",
  droiteGraduee(220, 60, 420, 0, 60, 15, 15).replace(/>(\d+)<\/text>/g, (_m, v) => `>${["7 h 00", "7 h 15", "7 h 30", "7 h 45", "8 h 00"][Number(v) / 15]}</text>`) +
    ["1er", "2e", "3e", "4e"].map((n, i) => t(60 + i * 90, 190, "🚌", C.craie, 30) + t(60 + i * 90, 140, n, C.bleu, 22)).join("") +
    t(420, 190, "🚌", C.craie, 30) + t(420, 140, "5e", C.rose, 24) + t(420, 110, "?", C.rose, 30) +
    t(240, 350, "un bus toutes les 15 min", C.pale, 24)
);

const livres = svg(
  "Quatre piles de livres de plus en plus hautes, avec 125, 250, 375, 500 pages",
  [125, 250, 375, 500].map((v, i) => r(40 + i * 90, 300 - v * 0.4, 60, v * 0.4, C.bleu, 0.2, 3) + t(70 + i * 90, 290 - v * 0.4, v, C.craie, 24)).join("") +
    r(400, 50, 60, 250, C.rose, 0, 3).replace("/>", ' stroke-dasharray="8 6"/>') + t(430, 40, "?", C.rose, 36) +
    l(20, 300, 470, 300, C.craie, 3) + t(240, 370, "pages lues à la fin de chaque semaine", C.pale, 22)
);

const cuve = svg(
  "Une cuve de 1 000 litres, on enlève 75 litres chaque jour",
  r(150, 70, 180, 280, C.craie, 0, 4, 6) + r(150, 154, 180, 196, C.bleu, 0.3, 0) +
    [1000, 925, 850, 775].map((v, i) => l(330, 70 + i * 21, 345, 70 + i * 21, C.pale, 2) + t(352, 77 + i * 21, `${v} L`, C.pale, 16, "start")).join("") +
    t(352, 161, "? L", C.rose, 22, "start") + l(330, 154, 345, 154, C.rose, 3) +
    t(110, 140, "− 75 L", C.rose, 22, "end") + t(110, 168, "par jour", C.pale, 20, "end") +
    t(240, 395, `après 4 jours${NB}?`, C.rose, 26)
);

const tables = () => {
  const rang = (n: number, y: number) => {
    let s = "";
    for (let k = 0; k < n; k++) s += r(60 + k * 50, y, 50, 40, C.jaune, 0.25, 3) + o(85 + k * 50, y - 12, 8, C.bleu, 0.6, 2) + o(85 + k * 50, y + 52, 8, C.bleu, 0.6, 2);
    return s + o(48, y + 20, 8, C.bleu, 0.6, 2) + o(72 + n * 50, y + 20, 8, C.bleu, 0.6, 2);
  };
  return svg(
    "Des tables carrées en ligne avec des chaises autour : 1 table 4 chaises, 2 tables 6 chaises, 3 tables 8 chaises",
    rang(1, 50) + t(330, 78, "4 chaises", C.craie, 24, "start") +
      rang(2, 150) + t(330, 178, "6 chaises", C.craie, 24, "start") +
      rang(3, 250) + t(330, 278, "8 chaises", C.craie, 24, "start") +
      t(240, 380, `10 tables${NB}: ? chaises`, C.rose, 28)
  );
};

const plante = svg(
  "Une plante qui a 2, 4, 8 puis 16 feuilles",
  [2, 4, 8, 16].map((v, i) => t(60 + i * 110, 190, v, C.craie, 44)).join("") +
    [0, 1, 2].map((i) => fleche(80 + i * 110, 140, 150 + i * 110, 140, C.jaune, 3) + t(115 + i * 110, 120, "?", C.jaune, 22)).join("") +
    t(420, 190, "?", C.rose, 44) + t(240, 60, "🌱 → 🌿 → 🌳", C.craie, 34) +
    t(240, 300, "Noé dit : + 2, donc 18", C.rose, 26)
);

const triangles = () => {
  let s = "";
  const bases = [1, 2, 3, 4];
  let x0 = 30;
  bases.forEach((n, i) => {
    for (let ligne = 0; ligne < n; ligne++)
      for (let k = 0; k <= ligne; k++) s += o(x0 + (n - 1 - ligne) * 11 + k * 22 + 11, 150 + ligne * 22 + (4 - n) * 22, 8, C.jaune, 0.6, 2);
    s += t(x0 + n * 11, 280, [1, 3, 6, 10][i], C.craie, 30);
    x0 += n * 22 + 40;
  });
  return svg("Des billes rangées en triangles : 1, 3, 6, 10 billes", s + t(450, 280, "…", C.pale, 30) + t(240, 360, `le 8e triangle${NB}?`, C.rose, 28));
};

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "suite",
  titre: "Énigmes sur les suites de nombres",
  description: "Le bus de 15 en 15 minutes, les pages lues, la cuve qui se vide, les tables et les chaises, le piège de la plante qui double, le défi des triangles de billes.",
  problemes: [
    {
      tag: "Énigme 1 · À l'arrêt de bus",
      titre: "Le 5e bus",
      question: `Le 1er bus passe à <b>7 h 00</b>.<br>Ensuite, un bus passe toutes les <b>15 minutes</b>.<br><br>À quelle heure passe le <b>5e bus</b> ?`,
      reponse: `On avance de 15 en 15 : 7 h 00, 7 h 15, 7 h 30, 7 h 45…<br>Le 5e bus passe à <span class="big">8 h 00</span>.`,
      consigne: "À quelle heure passe le 5e bus ?",
      verification: { type: "qcm", choix: ["8 h 15", "8 h 00", "7 h 75"], bonne: 1 },
      dessin: bus,
    },
    {
      tag: "Énigme 2 · À la bibliothèque",
      titre: "Les pages lues",
      question: `Inès compte les pages lues depuis le début.<br>Fin de semaine 1 : 125. Semaine 2 : 250. Semaine 3 : 375. Semaine 4 : 500.<br><br>Combien à la fin de la <b>semaine 5</b> ?`,
      reponse: `Chaque semaine, elle lit 125 pages de plus.<br>500 + 125 = <span class="big">625 pages</span>.`,
      consigne: "Combien de pages à la fin de la semaine 5 ?",
      verification: { type: "courte", attendus: ["625"], unite: "pages" },
      dessin: livres,
    },
    {
      tag: "Énigme 3 · À la ferme",
      titre: "La cuve qui se vide",
      question: `Une cuve contient <b>1 000 L</b> d'eau.<br>Chaque jour, on prend <b>75 L</b> pour les animaux.<br><br>Combien reste-t-il <b>après 4 jours</b> ?`,
      reponse: `On recule de 75 en 75 : 1 000, 925, 850, 775, 700.<br>Ou bien : 4 × 75 = 300, et 1 000 − 300 = 700.<br>Il reste <span class="big">700 L</span>.`,
      consigne: "Combien de litres reste-t-il après 4 jours ?",
      verification: { type: "courte", attendus: ["700"], unite: "L" },
      dessin: cuve,
    },
    {
      tag: "Énigme 4 · À la cantine",
      titre: "Les tables et les chaises",
      question: `On met des tables carrées en ligne.<br>1 table : 4 chaises. 2 tables : 6 chaises. 3 tables : 8 chaises.<br><br>Combien de chaises pour <b>10 tables</b> ?`,
      reponse: `Chaque table ajoute 2 chaises.<br>Il y a 2 chaises par table, plus 1 à chaque bout.<br>10 × 2 + 2 = <span class="big">22 chaises</span>.`,
      consigne: "Combien de chaises pour 10 tables ?",
      verification: { type: "courte", attendus: ["22"], unite: "chaises" },
      dessin: tables(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La plante qui pousse",
      sorte: "piege",
      question: `Une plante a <b>2</b> feuilles, puis <b>4</b>, puis <b>8</b>, puis <b>16</b>.<br><br>Noé dit : « On ajoute 2. Le suivant est 18. »<br><b>Quel est le nombre suivant</b> ?`,
      reponse: `Non ! 2 + 2 = 4, mais 4 + 2 n'est pas 8.<br>À chaque fois, le nombre <b>double</b> : × 2.<br>16 × 2 = <span class="big">32 feuilles</span>.`,
      consigne: "Quel nombre vient après 2, 4, 8, 16 ?",
      verification: { type: "qcm", choix: ["18", "24", "32"], bonne: 2 },
      dessin: plante,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les triangles de billes",
      sorte: "defi",
      question: `On range des billes en triangles.<br>1 bille, puis 3, puis 6, puis 10…<br><br>Combien de billes dans le <b>8e triangle</b> ?`,
      reponse: `On ajoute une ligne à chaque fois : + 2, + 3, + 4…<br>1, 3, 6, 10, 15, 21, 28, 36.<br>Le 8e triangle a <span class="big">36 billes</span>.`,
      consigne: "Combien de billes dans le 8e triangle ?",
      verification: { type: "courte", attendus: ["36"], unite: "billes" },
      dessin: triangles(),
    },
  ],
};

export default problemes;
