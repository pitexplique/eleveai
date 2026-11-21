// Énigmes à projeter — CE2, notion périmètres (le bac à sable, le jardin à
// quatre côtés, le rectangle du quadrillage, l'enclos carré des poules, le
// piège du coin coupé, le défi de la ficelle de 20 cm). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, grille } from "../dessins-ecole";

const bac = svg(
  "Un bac à sable rectangulaire de 3 m sur 2 m",
  r(90, 100, 300, 200, C.jaune, 0.25, 5) + t(240, 85, "3 m", C.craie, 30) + t(60, 210, "2 m", C.craie, 30) + t(240, 215, "⛱️", C.craie, 50) +
    t(240, 370, `Le tour du bac${NB}?`, C.rose, 30)
);

const jardin = svg(
  "Un jardin à 4 côtés : 50 m, 30 m, 40 m et 20 m",
  p("M80 290 L420 290 L380 110 L150 150 Z", C.bleu, 5, 0.15) +
    t(250, 330, "50 m", C.craie, 26) + t(435, 200, "30 m", C.craie, 26) + t(265, 115, "40 m", C.craie, 26) + t(80, 215, "20 m", C.craie, 26) +
    t(240, 395, `Le tour du jardin${NB}? (pas à l'échelle)`, C.rose, 22)
);

// Quadrillage : carreau de 50 px = 1 cm.
const quadrillage = svg(
  "Un rectangle de 4 carreaux sur 2 carreaux ; un carreau mesure 1 cm",
  grille(40, 60, 8, 5, 50, C.pale, 1.5) + r(90, 110, 200, 100, C.bleu, 0.3, 5) +
    t(360, 300, "1 carreau = 1 cm", C.craie, 22) + t(240, 380, `Le tour du rectangle${NB}?`, C.rose, 28)
);

const enclos = svg(
  "Un enclos carré de 6 m de côté pour les poules",
  r(120, 70, 240, 240, C.jaune, 0.15, 5) + t(240, 60, "6 m", C.craie, 28) + t(200, 200, "🐔", C.craie, 50) + t(290, 250, "🐔", C.craie, 40) +
    t(240, 380, `Combien de grillage${NB}?`, C.rose, 28)
);

// Rectangle 4 × 3 carreaux (pas 60), coin en haut à droite coupé (1 × 1).
const coin = svg(
  "Un rectangle de 4 carreaux sur 3, puis le même avec un carreau coupé dans un coin",
  grille(20, 90, 4, 3, 45, C.pale, 1) + r(20, 90, 180, 135, C.bleu, 0.25, 4) + t(110, 260, "avant", C.craie, 22) +
    grille(260, 90, 4, 3, 45, C.pale, 1) + p("M260 90 L395 90 L395 135 L440 135 L440 225 L260 225 Z", C.rose, 4, 0.25) + t(350, 260, "après", C.craie, 22) +
    t(240, 350, `Le tour du terrain${NB}?`, C.rose, 28)
);

const ficelle = svg(
  "Une ficelle de 20 cm forme un rectangle ; un côté mesure 6 cm",
  p("M40 90 Q140 60 240 90 T440 90", C.jaune, 5) + t(240, 60, "20 cm de ficelle", C.craie, 24) +
    r(110, 160, 240, 160, C.jaune, 0, 5) + t(230, 345, "6 cm", C.craie, 26) + t(385, 245, "?", C.rose, 40) +
    t(240, 400, `L'autre côté${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "perimetre",
  titre: "Énigmes sur les périmètres",
  description: "Le tour du bac à sable, le jardin à quatre côtés, le rectangle du quadrillage, le grillage de l'enclos carré, le piège du coin coupé, le défi de la ficelle de 20 cm.",
  problemes: [
    {
      tag: "Énigme 1 · Le parc",
      titre: "Le bac à sable",
      question: `Le bac à sable est un rectangle.<br>Il mesure <b>3 m</b> sur <b>2 m</b>.<br><br>Quelle est la longueur de son tour ?`,
      reponse: `Le tour : 3 + 2 + 3 + 2.<br>= <span class="big">10 m</span>.`,
      consigne: "Quel est le périmètre du bac à sable ?",
      verification: { type: "courte", attendus: ["10"], unite: "m" },
      dessin: bac,
    },
    {
      tag: "Énigme 2 · Le jardin",
      titre: "Les quatre côtés",
      question: `Le jardin a <b>4 côtés</b> :<br>50 m, 30 m, 40 m et 20 m.<br><br>Quelle est la longueur de son tour ?`,
      reponse: `On ajoute tous les côtés.<br>50 + 30 + 40 + 20 = <span class="big">140 m</span>.`,
      consigne: "Quel est le périmètre du jardin ?",
      verification: { type: "courte", attendus: ["140"], unite: "m" },
      dessin: jardin,
    },
    {
      tag: "Énigme 3 · Le quadrillage",
      titre: "Le rectangle bleu",
      question: `Le rectangle fait <b>4 carreaux</b> sur <b>2 carreaux</b>.<br>Un carreau mesure <b>1 cm</b>.<br><br>Quelle est la longueur de son tour ?`,
      reponse: `On compte les côtés de carreaux tout autour.<br>4 + 2 + 4 + 2 = <span class="big">12 cm</span>.`,
      consigne: "Quel est le périmètre du rectangle bleu ?",
      verification: { type: "qcm", choix: ["8 cm", "12 cm", "6 cm"], bonne: 1 },
      dessin: quadrillage,
    },
    {
      tag: "Énigme 4 · Le poulailler",
      titre: "L'enclos carré",
      question: `L'enclos des poules est un <b>carré</b>.<br>Un côté mesure <b>6 m</b>.<br><br>Combien de mètres de grillage pour faire le tour ?`,
      reponse: `Un carré a 4 côtés égaux.<br>6 + 6 + 6 + 6 = 4 × 6 = <span class="big">24 m</span>.`,
      consigne: "Combien de mètres de grillage ?",
      verification: { type: "qcm", choix: ["12 m", "36 m", "24 m"], bonne: 2 },
      dessin: enclos,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le coin coupé",
      sorte: "piege",
      question: `On coupe un carreau dans le coin du terrain.<br><br>Le tour du terrain change-t-il ?`,
      reponse: `Avant : 4 + 3 + 4 + 3 = 14 côtés de carreau.<br>Après : on perd 2 côtés, mais on en gagne 2 dans le creux.<br>Toujours 14 : <span class="big">il reste pareil</span>.`,
      consigne: "Le tour du terrain change-t-il ?",
      verification: { type: "qcm", choix: ["Il reste pareil", "Il diminue", "Il augmente"], bonne: 0 },
      dessin: coin,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La ficelle",
      sorte: "defi",
      question: `Avec une ficelle de <b>20 cm</b>, on fait un rectangle.<br>Un côté mesure <b>6 cm</b>.<br><br>Combien mesure l'autre côté ?`,
      reponse: `Deux côtés de 6 cm : 6 + 6 = 12 cm.<br>Il reste 20 − 12 = 8 cm pour les deux autres côtés.<br>8 = 4 + 4 : <span class="big">4 cm</span>.`,
      consigne: "Combien mesure l'autre côté ?",
      verification: { type: "courte", attendus: ["4"], unite: "cm" },
      dessin: ficelle,
    },
  ],
};

export default problemes;
