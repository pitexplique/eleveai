// Énigmes à projeter — CM1, notion tables de multiplication (les boîtes de
// crayons, les pattes des araignées, l'erreur du cahier, les paquets de cartes,
// le piège des 7 rangées de 7, le défi du nombre des tables de 6 et 8). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const crayons = svg(
  "7 boîtes de 6 crayons",
  Array.from({ length: 7 }, (_, b) => {
    const x = 30 + (b % 4) * 110, y = 70 + Math.floor(b / 4) * 130;
    return r(x, y, 92, 100, C.bleu, 0.12, 3, 8) + Array.from({ length: 6 }, (_, i) => r(x + 8 + i * 13, y + 20, 9, 66, [C.rose, C.jaune, C.bleu][i % 3], 0.5, 2, 2)).join("");
  }).join("") + t(240, 370, `7 boîtes de 6 crayons${NB}: ?`, C.rose, 28)
);

const araignees = svg(
  "9 araignées de 8 pattes",
  Array.from({ length: 9 }, (_, i) => t(80 + (i % 5) * 80, 140 + Math.floor(i / 5) * 100, "🕷️", C.craie, 56)).join("") +
    t(240, 320, "8 pattes chacune", C.pale, 26) + t(240, 375, `Combien de pattes${NB}?`, C.rose, 28)
);

const cahier = svg(
  "Le cahier de Malo : 7 × 8 = 56, 6 × 9 = 54, 8 × 4 = 36",
  r(80, 60, 320, 270, C.craie, 0.04, 3, 6) + [100, 160, 220, 280].map((y) => `<path d="M95 ${y + 46} L385 ${y + 46}" stroke="${C.bleu}" stroke-width="1.5" stroke-opacity=".5"/>`).join("") +
    t(240, 135, "7 × 8 = 56", C.craie, 34) + t(240, 195, "6 × 9 = 54", C.craie, 34) + t(240, 255, "8 × 4 = 36", C.craie, 34) +
    t(240, 385, `Quelle ligne est fausse${NB}?`, C.rose, 26)
);

const cartes = svg(
  "63 cartes en paquets de 9",
  Array.from({ length: 9 }, (_, i) => r(150 + i * 14, 90 + i * 6, 70, 100, C.rose, 0.15, 3, 8)).join("") +
    t(240, 270, "63 cartes 🃏", C.craie, 32) + t(240, 315, "paquets de 9", C.pale, 24) + t(240, 380, `Combien de paquets${NB}?`, C.rose, 28)
);

const chaises = svg(
  "7 rangées de 7 chaises",
  Array.from({ length: 49 }, (_, i) => r(110 + (i % 7) * 38, 50 + Math.floor(i / 7) * 38, 26, 26, C.jaune, 0.35, 2, 4)).join("") +
    t(240, 365, `7 rangées de 7 chaises${NB}: ?`, C.rose, 28)
);

const mystere = svg(
  "Un nombre dans la table de 6 et dans la table de 8, entre 40 et 50",
  r(170, 60, 140, 100, C.jaune, 0.2, 4, 12) + t(240, 130, "?", C.jaune, 64) +
    t(240, 220, "table de 6 ✔", C.bleu, 28) + t(240, 265, "table de 8 ✔", C.bleu, 28) + t(240, 320, "entre 40 et 50", C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "tables_multiplication",
  titre: "Énigmes sur les tables de multiplication",
  description: "Les boîtes de crayons, les pattes des araignées, l'erreur du cahier de Malo, les paquets de cartes, le piège des 7 rangées de 7 chaises, le défi du nombre des tables de 6 et de 8.",
  problemes: [
    {
      tag: "Énigme 1 · La papeterie",
      titre: "Les boîtes de crayons",
      question: `Une boîte contient <b>6 crayons</b>.<br>La maîtresse achète <b>7 boîtes</b>.<br><br><b>Combien de crayons</b> en tout ?`,
      reponse: `7 boîtes de 6 : 7 × 6.<br>7 × 6 = <span class="big">42 crayons</span>.`,
      consigne: "Combien de crayons dans 7 boîtes de 6 ?",
      verification: { type: "courte", attendus: ["42"], unite: "crayons" },
      dessin: crayons,
    },
    {
      tag: "Énigme 2 · Au jardin",
      titre: "Les pattes des araignées",
      question: `Une araignée a <b>8 pattes</b>.<br>Sur le mur, il y a <b>9 araignées</b>.<br><br><b>Combien de pattes</b> en tout ?`,
      reponse: `9 × 8 = 72.<br>Astuce : 10 × 8 = 80, puis 80 − 8 = 72.<br><span class="big">72 pattes</span>.`,
      consigne: "Combien de pattes ont 9 araignées ?",
      verification: { type: "courte", attendus: ["72"], unite: "pattes" },
      dessin: araignees,
    },
    {
      tag: "Énigme 3 · Le cahier de Malo",
      titre: "L'erreur cachée",
      question: `Malo a écrit trois résultats.<br>Un seul est <b>faux</b>.<br><br><b>Lequel</b> ?`,
      reponse: `7 × 8 = 56 : juste. 6 × 9 = 54 : juste.<br>8 × 4 = 32, pas 36.<br>La ligne fausse : <span class="big">8 × 4 = 36</span>.`,
      consigne: "Quelle ligne est fausse ?",
      verification: { type: "qcm", choix: ["8 × 4 = 36", "7 × 8 = 56", "6 × 9 = 54"], bonne: 0 },
      dessin: cahier,
    },
    {
      tag: "Énigme 4 · Le jeu de cartes",
      titre: "Les paquets de 9",
      question: `Léo a <b>63 cartes</b>.<br>Il fait des paquets de <b>9 cartes</b>.<br><br><b>Combien de paquets</b> fait-il ?`,
      reponse: `Dans la table de 9 : 7 × 9 = 63.<br>Il fait <span class="big">7 paquets</span>.`,
      consigne: "Combien de paquets de 9 cartes avec 63 cartes ?",
      verification: { type: "courte", attendus: ["7"], unite: "paquets" },
      dessin: cartes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les chaises du spectacle",
      sorte: "piege",
      question: `Dans la salle, il y a <b>7 rangées</b>.<br>Chaque rangée a <b>7 chaises</b>.<br><br><b>Combien de chaises</b> ?`,
      reponse: `Le piège : 7 + 7 = 14, ou écrire 77.<br>7 rangées de 7, c'est 7 × 7.<br>7 × 7 = <span class="big">49 chaises</span>.`,
      consigne: "Combien de chaises dans 7 rangées de 7 ?",
      verification: { type: "qcm", choix: ["14", "77", "49"], bonne: 2 },
      dessin: chaises,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre des deux tables",
      sorte: "defi",
      question: `Je suis dans la <b>table de 6</b>.<br>Je suis aussi dans la <b>table de 8</b>.<br>Je suis entre <b>40 et 50</b>.<br><br><b>Qui suis-je</b> ?`,
      reponse: `Table de 6 entre 40 et 50 : 42 et 48.<br>Table de 8 : 40 et 48.<br>Le nombre : <span class="big">48</span> (6 × 8).`,
      consigne: "Quel nombre est dans la table de 6 et de 8, entre 40 et 50 ?",
      verification: { type: "courte", attendus: ["48"] },
      dessin: mystere,
    },
  ],
};

export default problemes;
