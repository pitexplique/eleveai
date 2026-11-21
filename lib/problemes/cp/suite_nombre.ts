// Énigmes à projeter — CP, notion suite_nombre : le collier rose-bleu, les
// marches de l'escalier, les sachets de 10 bonbons, le kangourou de 2 en 2,
// le piège de la carte après 19, le défi de la 10e perle. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, o, l, p } from "../dessins-ecole";
import { carte } from "../dessins-cp";

const perle = (x: number, y: number, c: string) => o(x, y, 22, c, 0.55, 3);
const fil = (y: number) => l(20, y, 460, y, C.pale, 2);

const collier = svg(
  "Un collier : rose, bleue, rose, bleue, rose, puis une perle cachée",
  fil(170) + [C.rose, C.bleu, C.rose, C.bleu, C.rose].map((c, i) => perle(60 + i * 70, 170, c)).join("") +
    o(410, 170, 22, C.craie, 0, 3) + t(410, 180, "?", C.craie, 28) +
    t(240, 320, `Quelle perle${NB}?`, C.rose, 30)
);

const marche = (k: number, v: string, c: string = C.craie) => {
  const x = 40 + k * 80, y = 330 - k * 50;
  return p(`M${x} ${y} L${x} ${y - 50} L${x + 80} ${y - 50}`, C.craie, 3) + t(x + 40, y - 12, v, c, 28);
};
const escalier = svg(
  "Un escalier : les marches 11, 12, 13, une marche cachée, puis 15",
  marche(0, "11") + marche(1, "12") + marche(2, "13") + marche(3, "?", C.rose) + marche(4, "15") +
    t(110, 380, `La marche cachée${NB}?`, C.rose, 26, "start")
);

const sachet = (x: number, v: string, c: string = C.jaune) =>
  p(`M${x - 40} 110 L${x + 40} 110 L${x + 34} 220 L${x - 34} 220 Z`, c, 3, 0.2) + t(x, 160, "🍬", C.craie, 30) + t(x, 205, v, C.craie, 28);
const sachets = svg(
  "Des sachets : 10 bonbons, 20 bonbons, 30 bonbons, puis un sachet caché",
  sachet(70, "10") + sachet(180, "20") + sachet(290, "30") + sachet(400, "?", C.rose) +
    t(240, 300, "+10 à chaque fois", C.pale, 24) + t(240, 370, `Le sachet caché${NB}?`, C.rose, 30)
);

const saut = (x1: number, x2: number) => p(`M${x1} 230 Q${(x1 + x2) / 2} 150 ${x2} 230`, C.rose, 3);
const kangourou = svg(
  "Le kangourou saute de 2 en 2 : 2, 4, 6, puis une case cachée",
  t(60, 140, "🦘", C.craie, 50) + saut(60, 170) + saut(170, 280) + saut(280, 390) +
    carte(60, 270, 2) + carte(170, 270, 4) + carte(280, 270, 6) + carte(390, 270, "?", C.rose) +
    t(240, 380, `Où arrive-t-il${NB}?`, C.rose, 30)
);

const piege = svg(
  "Des cartes : 17, 18, 19, puis une carte cachée",
  carte(75, 180, 17) + carte(185, 180, 18) + carte(295, 180, 19) + carte(405, 180, "?", C.rose) +
    t(240, 330, `Quelle carte${NB}?`, C.rose, 30)
);

const defi = svg(
  "Un collier : rose, bleue, bleue, rose, bleue, bleue, puis la suite cachée jusqu'à la 10e perle",
  fil(150) + [C.rose, C.bleu, C.bleu, C.rose, C.bleu, C.bleu].map((c, i) => perle(40 + i * 58, 150, c)).join("") +
    t(395, 160, "…", C.craie, 34) + t(240, 240, "On continue pareil.", C.pale, 24) +
    t(240, 340, `La 10e perle${NB}?`, C.rose, 32)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "suite_nombre",
  titre: "Énigmes sur les suites",
  description: "Continuer le collier rose et bleu, trouver la marche cachée, les sachets de 10 bonbons, le kangourou qui saute de 2 en 2, le piège de la carte après 19, le défi de la 10e perle.",
  problemes: [
    {
      tag: "Énigme 1 · Le collier",
      titre: "Le collier de Léna",
      question: `Rose, bleue, rose, bleue…<br><br>Quelle perle vient ensuite ?`,
      reponse: `Après une rose, une bleue.<br><span class="big">Une perle bleue</span>.`,
      consigne: "Quelle perle vient ensuite dans le collier ?",
      verification: { type: "qcm", choix: ["Rose", "Jaune", "Bleue"], bonne: 2 },
      dessin: collier,
    },
    {
      tag: "Énigme 2 · L'escalier",
      titre: "La marche cachée",
      question: `11, 12, 13… 15.<br><br>Quelle marche est cachée ?`,
      reponse: `Après 13 vient 14.<br><span class="big">14</span>.`,
      consigne: "Quel nombre est caché sur la marche ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: escalier,
    },
    {
      tag: "Énigme 3 · Les bonbons",
      titre: "Les sachets de bonbons",
      question: `10, 20, 30…<br><br>Combien dans le sachet caché ?`,
      reponse: `On ajoute 10.<br>30, puis <span class="big">40</span>.`,
      consigne: "10, 20, 30… quel nombre vient ensuite ?",
      verification: { type: "courte", attendus: ["40"] },
      dessin: sachets,
    },
    {
      tag: "Énigme 4 · Le kangourou",
      titre: "Les sauts du kangourou",
      question: `Il saute de <b>2 en 2</b>.<br>2, 4, 6…<br><br>Où arrive-t-il ?`,
      reponse: `6, puis 7, <b>8</b>.<br><span class="big">8</span>.`,
      consigne: "2, 4, 6… quel nombre vient ensuite ?",
      verification: { type: "qcm", choix: ["8", "7", "10"], bonne: 0 },
      dessin: kangourou,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Après 19",
      question: `17, 18, 19…<br><br>Quelle est la carte cachée ?`,
      reponse: `Pas 110 !<br>Après 19, on change de dizaine.<br><span class="big">20</span>.`,
      consigne: "Quel nombre vient juste après 19 ?",
      verification: { type: "qcm", choix: ["110", "10", "20"], bonne: 2 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La 10e perle",
      question: `Rose, bleue, bleue, rose, bleue, bleue…<br><br>De quelle couleur est la <b>10e</b> perle ?`,
      reponse: `7e rose, 8e bleue, 9e bleue,<br>10e : <span class="big">rose</span>.`,
      consigne: "De quelle couleur est la 10e perle du collier ?",
      verification: { type: "qcm", choix: ["Bleue", "Rose", "On ne peut pas savoir"], bonne: 1 },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
