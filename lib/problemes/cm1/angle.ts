// Énigmes à projeter — CM1, notion angles (le coin du cahier, les angles droits
// de la porte, l'éventail le plus ouvert, la voile du bateau, le piège de
// l'angle penché, le défi de la lettre E). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

// Un angle de sommet (x, y), d'ouverture « deg », première branche tournée de « depart » degrés.
const angle = (x: number, y: number, deg: number, long: number, c: string = C.craie, depart = 0) => {
  const a1 = (-depart * Math.PI) / 180, a2 = (-(depart + deg) * Math.PI) / 180;
  const P = (a: number, d: number) => `${(x + d * Math.cos(a)).toFixed(1)} ${(y + d * Math.sin(a)).toFixed(1)}`;
  return p(`M${P(a1, long)} L${x} ${y} L${P(a2, long)}`, c, 5) + p(`M${P(a1, 34)} A34 34 0 0 0 ${P(a2, 34)}`, c, 2);
};
const coinDroit = (x: number, y: number, s: number, c: string, depart = 0) => {
  const a = (-depart * Math.PI) / 180, b = a - Math.PI / 2;
  const P = (u: number, v: number) => `${(x + u * Math.cos(a) + v * Math.cos(b)).toFixed(1)} ${(y + u * Math.sin(a) + v * Math.sin(b)).toFixed(1)}`;
  return p(`M${P(s, 0)} L${P(s, s)} L${P(0, s)}`, c, 2);
};

const cahier = svg(
  "Le coin d'un cahier",
  r(120, 90, 280, 230, C.bleu, 0.15, 4, 2) + [130, 160, 190, 220, 250, 280].map((y) => l(130, y, 390, y, C.pale, 1.5)).join("") +
    coinDroit(120, 320, 26, C.rose, 0) + t(100, 345, "le coin", C.rose, 22, "end") + t(240, 385, `Quel angle${NB}?`, C.rose, 28)
);

const porte = svg(
  "Une porte rectangulaire",
  r(160, 50, 160, 290, C.jaune, 0.25, 5, 2) + `<circle cx="295" cy="200" r="8" fill="${C.craie}"/>` +
    t(240, 385, `Combien d'angles droits${NB}?`, C.rose, 26)
);

const eventails = svg(
  "Trois angles A, B, C",
  angle(40, 250, 40, 120, C.bleu) + t(100, 300, "A", C.craie, 30) +
    angle(190, 250, 70, 100, C.bleu) + t(230, 300, "B", C.craie, 30) +
    angle(330, 250, 120, 100, C.bleu) + t(330, 300, "C", C.craie, 30) +
    t(240, 380, `Le plus ouvert${NB}?`, C.rose, 28)
);

// La voile : un triangle rectangle (angle droit en bas à gauche).
const voile = svg(
  "Un bateau avec une voile en triangle rectangle",
  p("M180 70 L180 290 L360 290 Z", C.craie, 4, 0.08) + coinDroit(180, 290, 22, C.rose, 0) +
    p("M110 300 L410 300 L370 340 L150 340 Z", C.bleu, 4, 0.3) + t(240, 395, `Combien d'angles aigus${NB}?`, C.rose, 26)
);

const penche = svg(
  "Un angle penché",
  angle(170, 290, 90, 170, C.bleu, 30) + coinDroit(170, 290, 26, C.rose, 30) + t(240, 380, `droit, aigu ou obtus${NB}?`, C.rose, 26)
);

const lettreE = svg(
  "La lettre E en bâtons",
  l(170, 70, 170, 330, C.craie, 12) + l(170, 70, 330, 70, C.craie, 12) + l(170, 200, 300, 200, C.craie, 12) + l(170, 330, 330, 330, C.craie, 12) +
    t(240, 395, `Combien d'angles droits${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "angle",
  titre: "Énigmes sur les angles",
  description: "Le coin du cahier, les angles droits de la porte, l'angle le plus ouvert, la voile du bateau, le piège de l'angle penché, le défi de la lettre E.",
  problemes: [
    {
      tag: "Énigme 1 · Le cahier",
      titre: "Le coin du cahier",
      question: `Regarde le coin du cahier.<br><br>Quel est cet <b>angle</b> ?`,
      reponse: `L'équerre se pose pile dans le coin.<br>C'est un <span class="big">angle droit</span>.`,
      consigne: "Le coin du cahier est un angle…",
      verification: { type: "qcm", choix: ["aigu", "droit", "obtus"], bonne: 1 },
      dessin: cahier,
    },
    {
      tag: "Énigme 2 · La porte",
      titre: "Les coins de la porte",
      question: `La porte est un <b>rectangle</b>.<br><br>Combien d'<b>angles droits</b> a-t-elle ?`,
      reponse: `Un rectangle a 4 coins.<br>Les 4 sont des angles droits : <span class="big">4</span>.`,
      consigne: "Combien d'angles droits a la porte ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: porte,
    },
    {
      tag: "Énigme 3 · L'éventail",
      titre: "L'angle le plus ouvert",
      question: `Voici trois angles : <b>A</b>, <b>B</b> et <b>C</b>.<br><br>Lequel est le <b>plus ouvert</b> ?`,
      reponse: `On regarde l'écart entre les deux branches.<br>A est aigu, B est aigu, C est obtus.<br>Le plus ouvert : <span class="big">C</span>.`,
      consigne: "Quel angle est le plus ouvert ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: eventails,
    },
    {
      tag: "Énigme 4 · Le bateau",
      titre: "La voile",
      question: `La voile est un triangle.<br>Elle a <b>un angle droit</b> en bas.<br><br>Combien d'<b>angles aigus</b> a-t-elle ?`,
      reponse: `Un triangle a 3 angles.<br>Un est droit. Les deux autres sont plus petits : aigus.<br><span class="big">2 angles aigus</span>.`,
      consigne: "Combien d'angles aigus a la voile ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: voile,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'angle penché",
      sorte: "piege",
      question: `Cet angle est <b>penché</b>.<br><br>Est-il droit, aigu ou obtus ?`,
      reponse: `Le piège : il est penché, il ne « ressemble » pas à un coin.<br>Mais l'équerre s'y pose parfaitement.<br>C'est un <span class="big">angle droit</span>.`,
      consigne: "Cet angle penché est…",
      verification: { type: "qcm", choix: ["droit", "aigu", "obtus"], bonne: 0 },
      dessin: penche,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La lettre E",
      sorte: "defi",
      question: `La lettre <b>E</b> est faite de bâtons.<br><br>Combien d'<b>angles droits</b> vois-tu ?`,
      reponse: `En haut : 1. En bas : 1.<br>Au milieu, le bâton fait 2 angles droits : au-dessus et en dessous.<br>1 + 2 + 1 = <span class="big">4 angles droits</span>.`,
      consigne: "Combien d'angles droits dans la lettre E ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: lettreE,
    },
  ],
};

export default problemes;
