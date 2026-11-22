// Énigmes à projeter — seconde, notion probabilites_ensemble_fini (la roue de
// la kermesse, le roi ou le cœur, le 7 avec deux dés, au moins un pile, piège
// des 11 sommes, défi du chevalier de Méré). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, secteursCouleurs } from "../dessins-ecole";
import { frac } from "../outils";

const roue = svg(
  "Une roue de 8 parts égales : 3 roses, 3 jaunes, 2 bleues",
  secteursCouleurs(240, 180, 140, [C.rose, C.jaune, C.bleu, C.rose, C.jaune, C.rose, C.bleu, C.jaune]) +
    `<path d="M240 20 l-14 -14 h28 Z" fill="${C.craie}"/>` + t(240, 375, `P(bleu)${NB}?`, C.rose, 30)
);

// 32 cartes : 4 couleurs × 8 valeurs ; cœurs en rose, rois en jaune.
const VAL = ["7", "8", "9", "10", "V", "D", "R", "As"];
const COUL = ["cœur", "carreau", "trèfle", "pique"];
const cartes = svg(
  "Un jeu de 32 cartes : 4 lignes, cœur, carreau, trèfle, pique, et 8 valeurs du 7 à l'as. La ligne cœur et la colonne des rois sont coloriées",
  COUL.map((nom, i) => t(92, 72 + 62 * i, nom, i === 0 ? C.rose : C.pale, 18, "end") +
    VAL.map((v, j) => {
      const coeur = i === 0, roi = j === 6;
      const c = coeur && roi ? C.rose : coeur ? C.rose : roi ? C.jaune : C.pale;
      return r(104 + 45 * j, 44 + 62 * i, 38, 50, c, coeur || roi ? 0.3 : 0.06, 2, 5) + t(123 + 45 * j, 76 + 62 * i, v, C.craie, 18);
    }).join("")).join("") +
    t(240, 340, "un roi OU un cœur", C.craie, 24) + t(240, 390, `combien de cartes${NB}?`, C.rose, 24)
);

const deuxDes = svg(
  "Le tableau des 36 sommes de deux dés, les six cases qui valent 7 sont coloriées",
  [1, 2, 3, 4, 5, 6].map((a, i) => t(110, 92 + 44 * i, a, C.bleu, 20) + t(158 + 50 * i, 50, a, C.jaune, 20) +
    [1, 2, 3, 4, 5, 6].map((b, j) => r(135 + 50 * j, 64 + 44 * i, 46, 40, a + b === 7 ? C.rose : C.pale, a + b === 7 ? 0.3 : 0.05, 2, 4) +
      t(158 + 50 * j, 92 + 44 * i, a + b, a + b === 7 ? C.rose : C.craie, 20)).join("")).join("") +
    t(240, 375, `P(somme = 7)${NB}?`, C.rose, 28)
);

const pieces = svg(
  "Les 8 résultats de trois lancers de pièce : PPP, PPF, PFP, PFF, FPP, FPF, FFP, FFF",
  ["PPP", "PPF", "PFP", "PFF", "FPP", "FPF", "FFP", "FFF"].map((s, k) =>
    r(30 + 108 * (k % 4), 80 + 100 * Math.floor(k / 4), 96, 64, k === 7 ? C.rose : C.bleu, k === 7 ? 0.3 : 0.1, 2, 8) +
    t(78 + 108 * (k % 4), 122 + 100 * Math.floor(k / 4), s, k === 7 ? C.rose : C.craie, 26)).join("") +
    t(240, 330, "P = pile, F = face", C.pale, 20) + t(240, 385, `au moins un pile${NB}?`, C.rose, 28)
);

const sommes = svg(
  "Les sommes possibles de deux dés : de 2 à 12, onze résultats",
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v, k) => o(40 + 40 * k, 150, 17, k === 10 ? C.rose : C.bleu, 0.15, 2) + t(40 + 40 * k, 157, v, C.craie, 17)).join("") +
    t(240, 240, "11 sommes possibles", C.craie, 24) + t(240, 320, `donc P(12) = 1 sur 11${NB}?`, C.rose, 26)
);

// Quatre dés pour le défi.
const de = (x: number, y: number) => r(x, y, 70, 70, C.craie, 0.04, 3, 12) + o(x + 35, y + 35, 7, C.craie, 1, 0);
const mere = svg(
  "Quatre dés lancés : obtenir au moins un six",
  de(45, 110) + de(150, 110) + de(255, 110) + de(360, 110) + t(240, 70, "4 lancers d'un dé", C.pale, 22) +
    t(240, 270, "au moins un 6", C.craie, 26) + t(240, 340, `plus d'une chance sur deux${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "probabilites_ensemble_fini",
  titre: "Énigmes des probabilités",
  description: "La roue de la kermesse, le roi ou le cœur, le 7 avec deux dés, au moins un pile, le piège des onze sommes, le défi du chevalier de Méré : équiprobabilité, réunion, événement contraire.",
  problemes: [
    {
      tag: "Énigme 1 · La roue de la kermesse",
      titre: "Huit parts égales",
      question: `La roue de la kermesse a <b>8 parts égales</b> : 3 roses, 3 jaunes, 2 bleues. On gagne une peluche si la flèche s'arrête sur le <b>bleu</b>.<br><br><b>Quelle est la probabilité</b> de gagner ?`,
      reponse: `Les 8 parts ont la même chance. 2 sont bleues.<br>P(bleu) = ${frac(2, 8)} = <span class="big">${frac(1, 4)}</span>, soit 0,25.`,
      consigne: "Quelle est la probabilité de tomber sur le bleu ?",
      verification: { type: "courte", attendus: ["1/4", "2/8", "0,25", "0.25"] },
      dessin: roue,
    },
    {
      tag: "Énigme 2 · Le roi ou le cœur",
      titre: "Ne pas compter deux fois",
      question: `On tire une carte au hasard dans un jeu de <b>32 cartes</b>.<br><br><b>Quelle est la probabilité</b> de tirer un roi <b>ou</b> un cœur ?`,
      reponse: `4 rois + 8 cœurs = 12, mais le roi de cœur est compté deux fois.<br>12 − 1 = 11 cartes. P = <span class="big">${frac(11, 32)}</span>.`,
      consigne: "Dans un jeu de 32 cartes, probabilité de tirer un roi ou un cœur ?",
      verification: { type: "qcm", choix: ["12/32", "11/32", "4/32"], bonne: 1 },
      dessin: cartes,
    },
    {
      tag: "Énigme 3 · Le 7 avec deux dés",
      titre: "Pour sortir de prison",
      question: `Dans un jeu de plateau, on sort de prison en faisant <b>7</b> avec deux dés.<br><br><b>Quelle est la probabilité</b> d'obtenir une somme de 7 ?`,
      reponse: `Deux dés : 6 × 6 = 36 cas, tous de même chance.<br>7 = 1 + 6 = 2 + 5 = 3 + 4 = 4 + 3 = 5 + 2 = 6 + 1 : 6 cas.<br>P = ${frac(6, 36)} = <span class="big">${frac(1, 6)}</span>.`,
      consigne: "Quelle est la probabilité d'obtenir une somme de 7 avec deux dés ?",
      verification: { type: "courte", attendus: ["1/6", "6/36"] },
      dessin: deuxDes,
    },
    {
      tag: "Énigme 4 · Au moins un pile",
      titre: "Le contraire, c'est plus court",
      question: `Léo lance <b>trois fois</b> une pièce équilibrée.<br><br><b>Quelle est la probabilité</b> d'obtenir <b>au moins un</b> pile ?`,
      reponse: `Le contraire de « au moins un pile » : « aucun pile », soit FFF. Un cas sur 8.<br>P = 1 − ${frac(1, 8)} = <span class="big">${frac(7, 8)}</span>.`,
      consigne: "Trois lancers de pièce : probabilité d'obtenir au moins un pile ?",
      verification: { type: "qcm", choix: ["7/8", "3/8", "1/2"], bonne: 0 },
      dessin: pieces,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Onze sommes",
      sorte: "piege",
      question: `Avec deux dés, la somme va de 2 à 12 : <b>11 résultats</b> possibles.<br>Lina dit : « Donc P(somme = 12) = 1 sur 11. »<br><br><b>Quelle est la vraie probabilité</b> ?`,
      reponse: `Les 11 sommes n'ont pas la même chance ! 7 se fait de 6 façons, 12 d'une seule : 6 + 6.<br>Sur les 36 cas : P = <span class="big">${frac(1, 36)}</span>.`,
      consigne: "Avec deux dés, quelle est la probabilité d'obtenir une somme de 12 ?",
      verification: { type: "qcm", choix: ["1/11", "1/12", "1/36"], bonne: 2 },
      dessin: sommes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le chevalier de Méré",
      sorte: "defi",
      question: `Au XVII<sup>e</sup> siècle, le chevalier de Méré pariait qu'il ferait <b>au moins un 6</b> en lançant <b>4 fois</b> un dé.<br><br><b>Quelle est sa probabilité</b> de gagner ? Arrondir au centième.`,
      reponse: `Contraire : aucun 6 en 4 lancers. P = (${frac(5, 6)})⁴ = ${frac(625, 1296)} ≈ 0,48.<br>Donc P(au moins un 6) ≈ 1 − 0,48 = <span class="big">0,52</span>. Un peu plus d'une chance sur deux : il gagnait souvent !`,
      consigne: "Probabilité d'obtenir au moins un 6 en 4 lancers de dé, au centième ?",
      verification: { type: "courte", attendus: ["0,52", "0.52"] },
      dessin: mere,
    },
  ],
};

export default problemes;
