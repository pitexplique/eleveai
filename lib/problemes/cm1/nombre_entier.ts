// Énigmes à projeter — CM1, notion nombres entiers (le podomètre de Mamie, le
// chiffre des milliers du village, le meilleur score, les briques du camion,
// le piège du « deux mille cinq », le défi des cinq cartes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const podometre = svg(
  "Un podomètre affiche 12 408 pas",
  r(130, 90, 220, 200, C.bleu, 0.15, 5, 40) + r(160, 140, 160, 70, C.craie, 0.08, 3, 10) +
    t(240, 190, "12 408", C.craie, 44) + t(240, 260, "pas 👟", C.pale, 26) + t(240, 370, `Comment le lire${NB}?`, C.rose, 28)
);

const cases = ["3", "5", "7", "6", "0"];
const noms = ["d. mille", "milliers", "centaines", "dizaines", "unités"];
const village = svg(
  "Un tableau de numération avec le nombre 35 760",
  t(240, 70, "35 760 habitants 🏘️", C.craie, 30) +
    cases.map((c, i) => r(40 + i * 80, 150, 80, 90, i === 1 ? C.jaune : C.craie, i === 1 ? 0.25 : 0.05, 3) + t(80 + i * 80, 212, c, C.craie, 44) + t(80 + i * 80, 275, noms[i], C.pale, 15)).join("") +
    t(240, 360, `le chiffre des milliers${NB}?`, C.rose, 26)
);

const scores = svg(
  "Trois scores à un jeu : Noa 40 950, Inès 49 050, Sami 45 900",
  [["Noa", "40 950"], ["Inès", "49 050"], ["Sami", "45 900"]].map(([n, s], i) =>
    r(60, 70 + i * 90, 360, 70, C.bleu, 0.12, 3, 12) + t(90, 116 + i * 90, n, C.craie, 28, "start") + t(390, 116 + i * 90, s, C.craie, 30, "end")).join("") +
    t(240, 385, `Qui a le plus de points${NB}? 🎮`, C.rose, 26)
);

const briques = svg(
  "3 palettes de 10 000 briques, 4 paquets de 100 briques et 7 briques seules",
  [0, 1, 2].map((i) => r(30 + i * 95, 130, 85, 85, C.rose, 0.25, 3, 4) + t(72 + i * 95, 182, "10 000", C.craie, 18)).join("") +
    [0, 1, 2, 3].map((i) => r(320 + (i % 2) * 50, 130 + Math.floor(i / 2) * 45, 42, 38, C.jaune, 0.3, 3, 3) + t(341 + (i % 2) * 50, 155 + Math.floor(i / 2) * 45, "100", C.craie, 15)).join("") +
    [0, 1, 2, 3, 4, 5, 6].map((i) => r(160 + i * 24, 250, 18, 12, C.rose, 0.5, 2, 1)).join("") +
    t(240, 70, "🚚 le camion", C.craie, 28) + t(240, 370, `Combien de briques${NB}?`, C.rose, 28)
);

const panneau = svg(
  "Un panneau de montagne : deux mille cinq mètres",
  l(240, 230, 240, 380, C.pale, 8) + r(80, 110, 320, 120, C.jaune, 0.2, 4, 10) +
    t(240, 160, "deux mille cinq", C.craie, 32) + t(240, 205, "mètres ⛰️", C.craie, 26) + t(240, 70, `En chiffres${NB}?`, C.rose, 28)
);

const cartes = svg(
  "Cinq cartes : 4, 0, 7, 2, 9",
  ["4", "0", "7", "2", "9"].map((c, i) => r(45 + i * 82, 120, 66, 96, C.bleu, 0.15, 4, 10) + t(78 + i * 82, 186, c, C.craie, 46)).join("") +
    t(240, 290, "le plus petit nombre", C.craie, 26) + t(240, 330, "à 5 chiffres", C.craie, 26) + t(240, 385, `chaque carte une fois${NB}!`, C.pale, 22)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "nombre_entier",
  titre: "Énigmes sur les nombres entiers",
  description: "Le podomètre de Mamie, le chiffre des milliers du village, le meilleur score au jeu, les briques du camion, le piège du « deux mille cinq », le défi des cinq cartes.",
  problemes: [
    {
      tag: "Énigme 1 · La promenade",
      titre: "Le podomètre de Mamie",
      question: `Le podomètre de Mamie affiche <b>12 408</b> pas.<br><br><b>Comment se lit</b> ce nombre ?`,
      reponse: `12 408 = 12 milliers et 408 unités.<br>On lit <span class="big">douze mille quatre cent huit</span>.`,
      consigne: "Comment se lit le nombre 12 408 ?",
      verification: { type: "qcm", choix: ["douze mille quatre cent huit", "mille deux cent quarante-huit", "douze mille quarante-huit"], bonne: 0 },
      dessin: podometre,
    },
    {
      tag: "Énigme 2 · Le village",
      titre: "Le chiffre des milliers",
      question: `Un village compte <b>35 760</b> habitants.<br><br>Quel est le <b>chiffre des milliers</b> ?`,
      reponse: `3 dizaines de mille, 5 milliers, 7 centaines, 6 dizaines, 0 unité.<br>Le chiffre des milliers est <span class="big">5</span>.`,
      consigne: "Quel est le chiffre des milliers de 35 760 ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: village,
    },
    {
      tag: "Énigme 3 · Le jeu vidéo",
      titre: "Le meilleur score",
      question: `Noa a <b>40 950</b> points.<br>Inès a <b>49 050</b> points.<br>Sami a <b>45 900</b> points.<br><br><b>Qui a le plus de points</b> ?`,
      reponse: `Tous ont 4 dizaines de mille. On regarde les milliers : 0, 9 et 5.<br>9 est le plus grand : c'est <span class="big">Inès</span>.`,
      consigne: "Qui a le plus de points ?",
      verification: { type: "qcm", choix: ["Sami", "Inès", "Noa"], bonne: 1 },
      dessin: scores,
    },
    {
      tag: "Énigme 4 · Le chantier",
      titre: "Les briques du camion",
      question: `Le camion apporte <b>3 palettes de 10 000</b> briques.<br>Il apporte aussi <b>4 paquets de 100</b> briques et <b>7</b> briques seules.<br><br><b>Combien de briques</b> en tout ?`,
      reponse: `30 000 + 400 + 7.<br>Il n'y a pas de milliers ni de dizaines : on écrit des 0.<br><span class="big">30 407 briques</span>.`,
      consigne: "Combien de briques en tout ?",
      verification: { type: "courte", attendus: ["30407"], unite: "briques" },
      dessin: briques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux mille cinq",
      sorte: "piege",
      question: `En montagne, un panneau dit : <b>« deux mille cinq mètres »</b>.<br><br>Écris ce nombre <b>en chiffres</b>.`,
      reponse: `Le piège : écrire 2 000 puis 5, soit 20 005.<br>Deux mille cinq = 2 milliers et 5 unités.<br><span class="big">2 005</span> mètres.`,
      consigne: "Écris « deux mille cinq » en chiffres.",
      verification: { type: "courte", attendus: ["2005"], unite: "m" },
      dessin: panneau,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les cinq cartes",
      sorte: "defi",
      question: `Tu as les cartes <b>4, 0, 7, 2, 9</b>.<br>Tu utilises chaque carte une fois.<br><br>Quel est le <b>plus petit nombre à 5 chiffres</b> ?`,
      reponse: `Le 0 ne peut pas être devant : ce ne serait plus 5 chiffres.<br>Devant, le plus petit après 0 : le 2. Puis 0, 4, 7, 9.<br><span class="big">20 479</span>.`,
      consigne: "Quel est le plus petit nombre à 5 chiffres avec les cartes 4, 0, 7, 2, 9 ?",
      verification: { type: "courte", attendus: ["20479"] },
      dessin: cartes,
    },
  ],
};

export default problemes;
