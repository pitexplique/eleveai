// Énigmes à projeter — CM1, notion suites de nombres (la tirelire de 5 en 5, le
// compte à rebours de 25 en 25, la règle des niveaux du jeu, le collier de
// perles, le piège de la plante, le défi des carrés d'allumettes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const tirelire = svg(
  "Une tirelire : 5 €, 10 €, 15 € ; chaque semaine 5 € de plus",
  t(120, 220, "🐷", C.craie, 130) +
    ["5 €", "10 €", "15 €", "…"].map((s, i) => r(260, 70 + i * 62, 160, 48, C.jaune, i < 3 ? 0.25 : 0, 3, 10) + t(340, 104 + i * 62, s, C.craie, 26)).join("") +
    t(240, 390, `après 8 semaines${NB}?`, C.rose, 28)
);

const fusee = svg(
  "Un compte à rebours : 200, 175, 150, puis 125, 100",
  t(400, 260, "🚀", C.craie, 110) +
    ["200", "175", "150", "125", "100", "?"].map((s, i) => t(60 + (i % 3) * 110, 130 + Math.floor(i / 3) * 90, s, i === 5 ? C.rose : C.craie, 38)).join("") +
    t(240, 360, "de 25 en 25", C.pale, 26)
);

const niveaux = svg(
  "Les points des niveaux d'un jeu : 3, 7, 11, 15",
  ["3", "7", "11", "15"].map((s, i) => o(80 + i * 106, 180, 40, C.bleu, 0.2, 4) + t(80 + i * 106, 192, s, C.craie, 32)).join("") +
    [0, 1, 2].map((i) => t(133 + i * 106, 130, "?", C.rose, 28)).join("") +
    t(240, 300, `Quelle est la règle${NB}?`, C.rose, 28)
);

// Le collier : bleue, rouge, rouge, et on recommence.
const motif = [C.bleu, C.rose, C.rose];
const collier = svg(
  "Un collier : une perle bleue, deux perles rouges, et on recommence",
  l(30, 170, 450, 170, C.pale, 2) +
    Array.from({ length: 9 }, (_, i) => o(55 + i * 46, 170, 18, motif[i % 3], 0.5, 3)).join("") +
    t(240, 110, "bleue, rouge, rouge, bleue…", C.craie, 24) + t(240, 290, `la 20e perle${NB}?`, C.rose, 32)
);

// La plante : 1, 3, 5 cm ; hauteurs au bon rapport (1 cm = 22 px).
const plante = svg(
  "Une plante mesure 1 cm, puis 3 cm, puis 5 cm",
  l(40, 330, 440, 330, C.pale, 3) +
    [1, 3, 5].map((h, i) => l(100 + i * 110, 330, 100 + i * 110, 330 - h * 22, C.bleu, 6) + t(100 + i * 110, 315 - h * 22, "🌱", C.craie, 26) + t(100 + i * 110, 370, `jour ${i + 1}`, C.pale, 18) + t(140 + i * 110, 300, `${h} cm`, C.craie, 18)).join("") +
    t(430, 250, "?", C.rose, 44) + t(430, 370, "jour 6", C.rose, 18)
);

// Les carrés d'allumettes : 1, 2, 3 carrés côte à côte.
const carres = (x: number, y: number, n: number) => {
  let s = "";
  for (let i = 0; i <= n; i++) s += l(x + i * 34, y, x + i * 34, y + 34, C.jaune, 5);
  for (let i = 0; i < n; i++) s += l(x + i * 34, y, x + (i + 1) * 34, y, C.jaune, 5) + l(x + i * 34, y + 34, x + (i + 1) * 34, y + 34, C.jaune, 5);
  return s;
};
const allumettes = svg(
  "Des carrés d'allumettes : 1 carré = 4, 2 carrés = 7, 3 carrés = 10 allumettes",
  carres(40, 120, 1) + t(57, 200, "4", C.craie, 28) + carres(130, 120, 2) + t(164, 200, "7", C.craie, 28) + carres(260, 120, 3) + t(311, 200, "10", C.craie, 28) +
    t(240, 290, `6 carrés${NB}: ? allumettes`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "suite",
  titre: "Énigmes sur les suites de nombres",
  description: "La tirelire de 5 en 5, le compte à rebours de 25 en 25, la règle des niveaux du jeu, la 20e perle du collier, le piège de la plante, le défi des carrés d'allumettes.",
  problemes: [
    {
      tag: "Énigme 1 · La tirelire",
      titre: "De 5 en 5",
      question: `Lou met <b>5 €</b> dans sa tirelire chaque semaine.<br>Elle a 5 €, puis 10 €, puis 15 €…<br><br>Combien a-t-elle <b>après 8 semaines</b> ?`,
      reponse: `On compte de 5 en 5 : 5, 10, 15, 20, 25, 30, 35, 40.<br>8 fois 5 = <span class="big">40 €</span>.`,
      consigne: "Combien Lou a-t-elle après 8 semaines ?",
      verification: { type: "courte", attendus: ["40"], unite: "€" },
      dessin: tirelire,
    },
    {
      tag: "Énigme 2 · La fusée",
      titre: "Le compte à rebours",
      question: `On compte à l'envers, de <b>25 en 25</b> :<br>200, 175, 150, 125, 100…<br><br>Quel nombre vient <b>après 100</b> ?`,
      reponse: `On enlève 25 à chaque fois.<br>100 − 25 = <span class="big">75</span>.`,
      consigne: "Quel nombre vient après 100 ?",
      verification: { type: "courte", attendus: ["75"] },
      dessin: fusee,
    },
    {
      tag: "Énigme 3 · Le jeu",
      titre: "La règle des niveaux",
      question: `Au jeu, les niveaux donnent <b>3, 7, 11, 15</b> points.<br><br><b>Quelle est la règle</b> ?`,
      reponse: `3 + 4 = 7. 7 + 4 = 11. 11 + 4 = 15.<br>La règle : <span class="big">+ 4</span> à chaque niveau.`,
      consigne: "Quelle est la règle de la suite 3, 7, 11, 15 ?",
      verification: { type: "qcm", choix: ["+ 3", "× 2", "+ 4"], bonne: 2 },
      dessin: niveaux,
    },
    {
      tag: "Énigme 4 · Le collier",
      titre: "La 20e perle",
      question: `Sur le collier : une perle <b>bleue</b>, deux perles <b>rouges</b>.<br>Puis on recommence.<br><br>De quelle couleur est la <b>20e perle</b> ?`,
      reponse: `Le motif a 3 perles. Les perles 3, 6, 9… 18 finissent un motif.<br>La 19e est bleue, la 20e est <span class="big">rouge</span>.`,
      consigne: "De quelle couleur est la 20e perle ?",
      verification: { type: "qcm", choix: ["bleue", "rouge", "on ne peut pas savoir"], bonne: 1 },
      dessin: collier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La plante qui pousse",
      sorte: "piege",
      question: `Une plante mesure <b>1 cm</b> le jour 1.<br>Elle grandit de <b>2 cm</b> chaque jour : 1, 3, 5…<br><br>Combien mesure-t-elle le <b>jour 6</b> ?`,
      reponse: `Le piège : 6 × 2 = 12. Mais elle partait de 1 cm !<br>1, 3, 5, 7, 9, 11.<br>Le jour 6 : <span class="big">11 cm</span>.`,
      consigne: "Combien mesure la plante le jour 6 ?",
      verification: { type: "courte", attendus: ["11"], unite: "cm" },
      dessin: plante,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les carrés d'allumettes",
      sorte: "defi",
      question: `1 carré : <b>4</b> allumettes.<br>2 carrés côte à côte : <b>7</b>.<br>3 carrés : <b>10</b>.<br><br>Combien d'allumettes pour <b>6 carrés</b> ?`,
      reponse: `Chaque carré en plus demande 3 allumettes.<br>4, 7, 10, 13, 16, 19.<br><span class="big">19 allumettes</span>.`,
      consigne: "Combien d'allumettes pour 6 carrés ?",
      verification: { type: "courte", attendus: ["19"], unite: "allumettes" },
      dessin: allumettes,
    },
  ],
};

export default problemes;
