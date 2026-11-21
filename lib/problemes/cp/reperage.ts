// Énigmes à projeter — CP, notion reperage (repérage dans l'espace) : le chat
// sous la table, l'étagère, l'enfant du milieu, la pomme à gauche du verre,
// le piège de la file devant la porte, le défi des trois animaux empilés.
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";

const table = svg(
  "Une table ; un chat est couché sous la table",
  r(90, 140, 300, 20, C.jaune, 0.4, 3, 4) + l(110, 160, 110, 290, C.jaune, 6) + l(370, 160, 370, 290, C.jaune, 6) +
    l(40, 292, 440, 292, C.pale, 3) + t(240, 280, "🐈", C.craie, 60) + t(240, 125, "🍽️", C.craie, 34) +
    t(240, 370, `Où est le chat${NB}?`, C.rose, 30)
);

const etagere = svg(
  "Une étagère à trois planches : un livre en haut, un ballon au milieu, un ours en bas",
  r(120, 60, 240, 270, C.jaune, 0, 4, 4) + l(120, 150, 360, 150, C.jaune, 4) + l(120, 240, 360, 240, C.jaune, 4) +
    t(240, 135, "📘", C.craie, 56) + t(240, 225, "⚽", C.craie, 56) + t(240, 315, "🧸", C.craie, 56) +
    t(240, 390, `Qu'est-ce qui est en bas${NB}?`, C.rose, 28)
);

const enfant = (x: number, nom: string) => t(x, 190, "🧒", C.craie, 70) + t(x, 250, nom, C.craie, 26);
const milieu = svg(
  "Trois enfants en ligne : Léo, Sami, Ana",
  enfant(100, "Léo") + enfant(240, "Sami") + enfant(380, "Ana") +
    t(240, 360, `Qui est entre Léo et Ana${NB}?`, C.rose, 28)
);

const pomme = svg(
  "Une pomme, puis un verre de lait à sa droite",
  l(40, 250, 440, 250, C.pale, 3) + t(160, 240, "🍎", C.craie, 70) + t(320, 240, "🥛", C.craie, 70) +
    t(240, 350, `La pomme est où${NB}?`, C.rose, 30)
);

const piege = svg(
  "Une file de 5 enfants qui marchent vers une porte à droite ; Tim est le 4e en partant de la gauche",
  [0, 1, 2, 3, 4].map((i) => t(50 + i * 70, 200, "🧒", C.craie, 54)).join("") +
    t(260, 250, "Tim", C.rose, 26) + r(400, 90, 60, 140, C.jaune, 0.3, 3, 4) + t(430, 165, "🚪", C.craie, 40) +
    fleche(60, 290, 380, 290, C.pale, 3) + t(220, 320, "ils vont vers la porte", C.pale, 20) +
    t(240, 385, `Combien d'enfants devant Tim${NB}?`, C.rose, 26)
);

const defi = svg(
  "Une étagère à trois planches vides ; à côté, un chien, un lapin et un chat",
  r(60, 60, 220, 270, C.jaune, 0, 4, 4) + l(60, 150, 280, 150, C.jaune, 4) + l(60, 240, 280, 240, C.jaune, 4) +
    t(170, 125, "?", C.pale, 40) + t(170, 215, "?", C.pale, 40) + t(170, 305, "?", C.pale, 40) +
    t(330, 200, "🐕", C.craie, 40) + t(385, 200, "🐇", C.craie, 40) + t(440, 200, "🐈", C.craie, 40) +
    t(240, 390, `Qui est en bas${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "reperage",
  titre: "Énigmes de repérage dans l'espace",
  description: "Le chat sous la table, ce qui est en bas de l'étagère, l'enfant du milieu, la pomme à gauche du verre, le piège de la file devant la porte, le défi des trois animaux sur l'étagère.",
  problemes: [
    {
      tag: "Énigme 1 · La cuisine",
      titre: "Le chat",
      question: `Où est le chat ?`,
      reponse: `L'assiette est sur la table.<br>Le chat est <span class="big">sous la table</span>.`,
      consigne: "Le chat est-il sur la table ou sous la table ?",
      verification: { type: "qcm", choix: ["Sur la table", "Sous la table", "Loin de la table"], bonne: 1 },
      dessin: table,
    },
    {
      tag: "Énigme 2 · La chambre",
      titre: "L'étagère",
      question: `Qu'est-ce qui est en bas ?`,
      reponse: `En haut, le livre.<br>Au milieu, le ballon.<br>En bas : <span class="big">l'ours</span>.`,
      consigne: "Sur l'étagère, qu'est-ce qui est en bas ?",
      verification: { type: "qcm", choix: ["Le livre", "Le ballon", "L'ours"], bonne: 2 },
      dessin: etagere,
    },
    {
      tag: "Énigme 3 · La photo",
      titre: "Au milieu",
      question: `Qui est entre Léo et Ana ?`,
      reponse: `Entre, c'est au milieu.<br><span class="big">Sami</span>.`,
      consigne: "Qui est entre Léo et Ana ?",
      verification: { type: "qcm", choix: ["Léo", "Ana", "Sami"], bonne: 2 },
      dessin: milieu,
    },
    {
      tag: "Énigme 4 · Le goûter",
      titre: "La pomme et le verre",
      question: `La pomme est à gauche<br>ou à droite du verre ?`,
      reponse: `On regarde l'image.<br>La pomme est <span class="big">à gauche</span>.`,
      consigne: "Sur l'image, la pomme est-elle à gauche ou à droite du verre ?",
      verification: { type: "qcm", choix: ["À gauche", "À droite", "Dessus"], bonne: 0 },
      dessin: pomme,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "La file",
      question: `Les enfants vont vers la porte.<br><br>Combien d'enfants devant Tim ?`,
      reponse: `Devant, c'est vers la porte !<br>Un seul enfant.<br><span class="big">1</span>.`,
      consigne: "Les enfants vont vers la porte. Combien d'enfants devant Tim ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les animaux sur l'étagère",
      question: `Le chat est au-dessus du chien.<br>Le chien est au-dessus du lapin.<br><br>Qui est en bas ?`,
      reponse: `En haut le chat,<br>puis le chien.<br>En bas : <span class="big">le lapin</span>.`,
      consigne: "Le chat est au-dessus du chien, le chien au-dessus du lapin. Qui est en bas ?",
      verification: { type: "qcm", choix: ["Le chat", "Le lapin", "Le chien"], bonne: 1 },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
