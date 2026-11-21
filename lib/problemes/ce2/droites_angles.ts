// Énigmes à projeter — CE2, notion droites, angles droits et codages (le
// coin de la feuille, le petit carré codé, les trois villes alignées, le
// milieu du pont, le piège des deux angles droits, le défi de la grille du
// morpion). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p, o } from "../dessins-ecole";

/** Un angle de sommet (x, y) : une branche horizontale et une à « deg » degrés. */
const angle = (x: number, y: number, deg: number, long = 100) => {
  const a = (deg * Math.PI) / 180;
  return l(x, y, x + long, y, C.craie, 5) + l(x, y, x + long * Math.cos(a), y - long * Math.sin(a), C.craie, 5) + o(x, y, 4, C.craie, 1, 2);
};

const troisAngles = svg(
  "Trois angles : A est aigu, B est obtus, C est droit",
  angle(20, 240, 50, 100) + angle(240, 240, 125, 90) + angle(360, 240, 90, 100) +
    t(70, 290, "A", C.jaune, 32) + t(260, 290, "B", C.jaune, 32) + t(410, 290, "C", C.jaune, 32) +
    t(240, 370, `Lequel est un angle droit${NB}?`, C.rose, 28)
);

const code = svg(
  "Un triangle avec un petit carré dans un coin",
  p("M100 300 L100 100 L380 300 Z", C.bleu, 5, 0.15) + p("M100 270 L130 270 L130 300", C.rose, 4) + o(115, 285, 30, C.rose, 0, 2) +
    t(240, 380, `Que veut dire le petit carré${NB}?`, C.rose, 28)
);

// A (60, 260) et B (200, 190) : la droite AB monte de 1 pour 2. Q (400, 90) est dessus ; P (330, 250) dessous, R (300, 70) dessus.
const villes = svg(
  "Les villes A et B, et trois autres villes P, Q et R ; une seule est alignée avec A et B",
  [[60, 260, "A", C.craie], [200, 190, "B", C.craie], [330, 250, "P", C.bleu], [400, 90, "Q", C.bleu], [300, 70, "R", C.bleu]]
      .map(([x, y, n, c]) => o(x as number, y as number, 9, c as string, 1, 2) + t((x as number) + 4, (y as number) + 38, n as string, c as string, 28)).join("") +
    t(240, 370, `Quelle ville est alignée avec A et B${NB}?`, C.rose, 24)
);

const pont = svg(
  "Un pont AB de 10 m ; M est au milieu : deux petits traits pareils sur AM et MB",
  l(50, 200, 430, 200, C.craie, 6) + o(50, 200, 6, C.craie, 1, 2) + o(430, 200, 6, C.craie, 1, 2) + o(240, 200, 6, C.rose, 1, 2) +
    t(50, 245, "A", C.craie, 28) + t(430, 245, "B", C.craie, 28) + t(240, 245, "M", C.rose, 28) +
    l(140, 188, 150, 212, C.rose, 4) + l(330, 188, 340, 212, C.rose, 4) + t(240, 140, "AB = 10 m", C.craie, 30) +
    t(240, 350, `Combien mesure AM${NB}?`, C.rose, 28)
);

const deuxAngles = svg(
  "Deux angles droits : un grand avec de longues branches, un petit avec des branches courtes",
  l(40, 300, 40, 80, C.bleu, 6) + l(40, 300, 260, 300, C.bleu, 6) + p("M40 275 L65 275 L65 300", C.bleu, 3) +
    l(340, 300, 340, 230, C.rose, 6) + l(340, 300, 410, 300, C.rose, 6) + p("M340 280 L360 280 L360 300", C.rose, 3) +
    t(240, 380, `Lequel est le plus grand angle${NB}?`, C.rose, 26)
);

const morpion = svg(
  "La grille du morpion : 2 traits horizontaux et 2 traits verticaux, qui se coupent à angle droit",
  l(190, 60, 190, 340, C.craie, 6) + l(290, 60, 290, 340, C.craie, 6) + l(100, 150, 380, 150, C.craie, 6) + l(100, 250, 380, 250, C.craie, 6) +
    t(140, 115, "✕", C.bleu, 50) + o(240, 200, 28, C.rose, 0, 5) +
    t(240, 395, `Combien d'angles droits${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "droites_angles",
  titre: "Énigmes sur les droites et les angles droits",
  description: "Trouver l'angle droit avec le coin d'une feuille, le petit carré codé, les villes alignées, le milieu du pont, le piège des deux angles droits, le défi de la grille du morpion.",
  problemes: [
    {
      tag: "Énigme 1 · Le coin de la feuille",
      titre: "L'angle droit",
      question: `Prends le coin d'une feuille.<br>Pose-le sur chaque angle.<br><br>Lequel est un <b>angle droit</b> ?`,
      reponse: `A est plus fermé que le coin. B est plus ouvert.<br>C colle au coin de la feuille : <span class="big">C</span>.`,
      consigne: "Quel angle est un angle droit ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: troisAngles,
    },
    {
      tag: "Énigme 2 · Le codage",
      titre: "Le petit carré",
      question: `Dans un coin du triangle, on voit un <b>petit carré</b>.<br><br>Que veut-il dire ?`,
      reponse: `Le petit carré est un code.<br>Il veut dire : <span class="big">un angle droit</span>.`,
      consigne: "Que veut dire le petit carré dans le coin ?",
      verification: { type: "qcm", choix: ["Un angle droit", "Un côté de 1 cm", "Un point"], bonne: 0 },
      dessin: code,
    },
    {
      tag: "Énigme 3 · La carte",
      titre: "Les villes alignées",
      question: `Trace la droite qui passe par <b>A</b> et <b>B</b>.<br><br>Quelle ville est <b>sur cette droite</b> ?`,
      reponse: `On prolonge la droite (A, B) avec la règle.<br>Elle passe par <span class="big">Q</span>. P est en dessous, R au-dessus.`,
      consigne: "Quelle ville est alignée avec A et B ?",
      verification: { type: "qcm", choix: ["P", "Q", "R"], bonne: 1 },
      dessin: villes,
    },
    {
      tag: "Énigme 4 · Le pont",
      titre: "Le milieu",
      question: `Le pont AB mesure <b>10 m</b>.<br>Les deux petits traits disent : AM = MB.<br><br>Combien mesure <b>AM</b> ?`,
      reponse: `M est le milieu : il coupe le pont en 2 parts égales.<br>5 + 5 = 10. AM = <span class="big">5 m</span>.`,
      consigne: "Combien mesure AM ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: pont,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux angles droits",
      sorte: "piege",
      question: `Les deux angles sont <b>droits</b>.<br>Le bleu a de longues branches. Le rose, des courtes.<br><br>Lequel est le plus grand angle ?`,
      reponse: `Le piège : regarder la longueur des branches.<br>Un angle, c'est l'ouverture entre les branches.<br>Deux angles droits : <span class="big">ils sont pareils</span>.`,
      consigne: "Lequel est le plus grand angle ?",
      verification: { type: "qcm", choix: ["Le bleu", "Le rose", "Ils sont pareils"], bonne: 2 },
      dessin: deuxAngles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La grille du morpion",
      sorte: "defi",
      question: `La grille du morpion a <b>2 traits</b> debout et <b>2 traits</b> couchés.<br>Ils se coupent à angle droit.<br><br>Combien d'angles droits en tout ?`,
      reponse: `Les traits se croisent en 4 points.<br>À chaque croisement : 4 angles droits.<br>4 × 4 = <span class="big">16 angles droits</span>.`,
      consigne: "Combien d'angles droits dans la grille ?",
      verification: { type: "courte", attendus: ["16"], unite: "angles droits" },
      dessin: morpion,
    },
  ],
};

export default problemes;
