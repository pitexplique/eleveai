// Énigmes à projeter — CM2, notion perimetre (la clôture du potager, le côté du
// carré, le fanion triangulaire, la figure en L sur quadrillage, le piège du
// rectangle long et du carré, le défi des 24 allumettes). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, grille } from "../dessins-ecole";

// Le potager 12 m × 8 m : 1 m = 25 px (300 × 200).
const potager = svg(
  "Un potager rectangulaire de 12 m sur 8 m, avec une clôture",
  r(90, 90, 300, 200, C.jaune, 0.15, 5) + r(90, 90, 300, 200, C.craie, 0, 2).replace("/>", ' stroke-dasharray="4 10"/>') +
    t(240, 75, "12 m", C.craie, 26) + t(80, 196, "8 m", C.craie, 26, "end") + t(240, 205, "🥕 🥬 🍅", C.craie, 34) + t(240, 360, `longueur de la clôture${NB}?`, C.rose, 26)
);

// Le carré de périmètre 36 cm : côté 9 cm = 225 px (1 cm = 25 px).
const carre = svg(
  "Un carré dont le tour mesure 36 cm",
  r(127, 60, 225, 225, C.bleu, 0.15, 4) + t(240, 182, "périmètre", C.craie, 22) + t(240, 215, "36 cm", C.craie, 30) + t(240, 325, `côté${NB}= ? cm`, C.rose, 28)
);

// Le fanion : côtés 5, 6, 7 cm, 1 cm = 40 px. A(80,300) B(360,300), C(189,132) : AC = 200 px, BC = 240 px.
const fanion = svg(
  "Un fanion triangulaire de côtés 5 cm, 6 cm et 7 cm",
  p("M80 300 L360 300 L189 132 Z", C.rose, 4, 0.2) + t(220, 335, "7 cm", C.craie, 24) + t(115, 200, "5 cm", C.craie, 24, "end") + t(300, 200, "6 cm", C.craie, 24, "start") +
    t(240, 395, `tour du fanion${NB}?`, C.rose, 26)
);

// La figure en L : 4 × 3 carreaux sans le coin 2 × 2 (1 carreau = 1 cm = 60 px).
const enL = svg(
  "Une figure en L sur un quadrillage : un rectangle de 4 sur 3 carreaux sans un coin de 2 sur 2",
  grille(60, 60, 6, 4, 60, C.pale, 1) + p("M120 60 L360 60 L360 120 L240 120 L240 240 L120 240 Z", C.bleu, 5, 0.25) +
    t(240, 320, "1 carreau = 1 cm", C.pale, 20) + t(240, 375, `périmètre${NB}?`, C.rose, 28)
);

// Rectangle 10 cm × 2 cm et carré de 6 cm : 1 cm = 30 px.
const deux = svg(
  "Un rectangle de 10 cm sur 2 cm et un carré de 6 cm de côté",
  r(40, 60, 300, 60, C.jaune, 0.25, 4) + t(190, 50, "10 cm", C.craie, 22) + t(350, 98, "2 cm", C.craie, 20, "start") +
    r(150, 170, 180, 180, C.bleu, 0.2, 4) + t(240, 265, "6 cm", C.craie, 24) + t(240, 395, `le plus grand périmètre${NB}?`, C.rose, 24)
);

const allumettes = svg(
  "Des allumettes : 24 allumettes pour faire le tour d'un rectangle",
  [0, 1, 2, 3, 4, 5, 6, 7].map((i) => r(70 + i * 44, 80, 8, 70, C.jaune, 0.5, 2, 3) + `<circle cx="${74 + i * 44}" cy="80" r="7" fill="${C.rose}" fill-opacity=".8"/>`).join("") +
    t(240, 200, "× 3 = 24 allumettes", C.craie, 26) + r(160, 240, 160, 100, C.pale, 0, 3).replace("/>", ' stroke-dasharray="10 6"/>') + t(240, 300, "?", C.rose, 40) +
    t(240, 395, "1 allumette = 1 unité", C.pale, 18)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "perimetre",
  titre: "Énigmes sur les périmètres",
  description: "La clôture du potager, le côté du carré, le tour du fanion, la figure en L, le piège du rectangle et du carré, le défi des 24 allumettes.",
  problemes: [
    {
      tag: "Énigme 1 · Au potager",
      titre: "La clôture",
      question: `Un potager rectangulaire mesure <b>12 m</b> sur <b>8 m</b>.<br>On met une clôture tout autour.<br><br><b>Quelle longueur</b> de clôture ?`,
      reponse: `Le tour : 12 + 8 + 12 + 8.<br>Ou bien (12 + 8) × 2 = 20 × 2 = <span class="big">40 m</span>.`,
      consigne: "Quelle longueur de clôture faut-il ?",
      verification: { type: "courte", attendus: ["40"], unite: "m" },
      dessin: potager,
    },
    {
      tag: "Énigme 2 · Le carré",
      titre: "Le côté caché",
      question: `Le tour d'un carré mesure <b>36 cm</b>.<br><br>Combien mesure <b>un côté</b> ?`,
      reponse: `Un carré a 4 côtés égaux.<br>36 ÷ 4 = <span class="big">9 cm</span>.`,
      consigne: "Combien mesure un côté du carré ?",
      verification: { type: "courte", attendus: ["9"], unite: "cm" },
      dessin: carre,
    },
    {
      tag: "Énigme 3 · La fête de l'école",
      titre: "Le fanion",
      question: `Un fanion a la forme d'un triangle.<br>Ses côtés mesurent <b>5 cm</b>, <b>6 cm</b> et <b>7 cm</b>.<br><br>On colle un galon tout autour. <b>Quelle longueur</b> ?`,
      reponse: `On ajoute les trois côtés.<br>5 + 6 + 7 = <span class="big">18 cm</span>.`,
      consigne: "Quelle longueur de galon ?",
      verification: { type: "courte", attendus: ["18"], unite: "cm" },
      dessin: fanion,
    },
    {
      tag: "Énigme 4 · Sur le quadrillage",
      titre: "La figure en L",
      question: `La figure bleue est tracée sur un quadrillage.<br>Un carreau mesure <b>1 cm</b> de côté.<br><br><b>Quel est son périmètre</b> ?`,
      reponse: `On fait le tour en comptant les côtés de carreaux :<br>4 + 1 + 2 + 2 + 2 + 3 = <span class="big">14 cm</span>.`,
      consigne: "Quel est le périmètre de la figure en L ?",
      verification: { type: "qcm", choix: ["12 cm", "10 cm", "14 cm"], bonne: 2 },
      dessin: enL,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le long rectangle",
      sorte: "piege",
      question: `Un rectangle mesure <b>10 cm</b> sur <b>2 cm</b>.<br>Un carré a <b>6 cm</b> de côté.<br>Tom dit : « Le rectangle est plus long, son tour est plus grand. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `On calcule ! Rectangle : (10 + 2) × 2 = 24 cm.<br>Carré : 4 × 6 = 24 cm.<br><span class="big">Ils ont le même périmètre</span>.`,
      consigne: "Quelle figure a le plus grand périmètre ?",
      verification: { type: "qcm", choix: ["Ils ont le même", "Le rectangle", "Le carré"], bonne: 0 },
      dessin: deux,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les 24 allumettes",
      sorte: "defi",
      question: `Avec <b>24 allumettes</b>, on fait le tour d'un rectangle.<br>Une allumette = 1 unité. On n'en casse aucune.<br><br>Quelle est la <b>plus grande aire</b> possible ?`,
      reponse: `Longueur + largeur = 12. On essaie : 11 × 1 = 11, 10 × 2 = 20, 9 × 3 = 27, 8 × 4 = 32, 7 × 5 = 35, 6 × 6 = 36.<br>Le carré gagne : <span class="big">36 unités d'aire</span>.`,
      consigne: "Quelle est la plus grande aire possible, en carreaux ?",
      verification: { type: "courte", attendus: ["36"], unite: "carreaux" },
      dessin: allumettes,
    },
  ],
};

export default problemes;
