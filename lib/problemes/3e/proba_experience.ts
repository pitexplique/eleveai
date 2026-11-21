// Énigmes à projeter — 3e, notion proba_experience (la machine à capsules,
// les deux penalties, les chaussettes dans le noir, le 6 des petits chevaux,
// piège des 11 sommes, défi des trois portes). 21/11/2026.
// ⛔ Ne reprend pas la 4e (dé d'EPS, perles, cartes, tombola, roue, deux pièces).
import type { ProblemesNotion } from "../types";
import { frac } from "../outils";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

// La machine : 5 robots (bleu), 4 dinos (jaune), 3 licornes (rose).
const coul = [...Array(5).fill(C.bleu), ...Array(4).fill(C.jaune), ...Array(3).fill(C.rose)];
const ordre = [0, 5, 9, 1, 6, 10, 2, 7, 3, 11, 8, 4];
const capsules = svg(
  "Une machine à capsules : 5 robots, 4 dinosaures et 3 licornes",
  o(200, 150, 110, C.craie, 0, 4) + ordre.map((k, i) => o(132 + (i % 4) * 45, 105 + Math.floor(i / 4) * 45, 19, coul[k], 0.5, 3)).join("") +
    r(130, 260, 140, 110, C.craie, 0.1, 4, 8) + o(200, 300, 16, C.craie, 0, 3) + r(180, 340, 40, 22, C.craie, 0, 3) +
    o(345, 120, 12, C.bleu, 0.5, 3) + t(365, 128, "5 robots", C.craie, 20, "start") + o(345, 165, 12, C.jaune, 0.5, 3) + t(365, 173, "4 dinos", C.craie, 20, "start") +
    o(345, 210, 12, C.rose, 0.5, 3) + t(365, 218, "3 licornes", C.craie, 20, "start") + t(360, 320, `pas un robot${NB}?`, C.rose, 22)
);

// L'arbre des deux penalties.
const arbre = svg(
  "Un arbre à deux niveaux : chaque penalty est marqué avec la probabilité 0,8 et raté avec 0,2",
  l(50, 210, 190, 110, C.craie, 3) + l(50, 210, 190, 310, C.craie, 3) +
    l(250, 110, 380, 60, C.craie, 3) + l(250, 110, 380, 160, C.craie, 3) + l(250, 310, 380, 260, C.craie, 3) + l(250, 310, 380, 360, C.craie, 3) +
    t(220, 118, "but", C.bleu, 20) + t(220, 318, "raté", C.pale, 20) + t(410, 66, "but", C.bleu, 20) + t(410, 166, "raté", C.pale, 20) + t(410, 266, "but", C.bleu, 20) + t(410, 366, "raté", C.pale, 20) +
    t(105, 145, "0,8", C.craie, 20) + t(105, 290, "0,2", C.craie, 20) + t(305, 70, "0,8", C.craie, 18) + t(305, 160, "0,2", C.craie, 18) + t(305, 270, "0,8", C.craie, 18) + t(305, 360, "0,2", C.craie, 18) +
    r(386, 42, 50, 34, C.rose, 0, 3) + t(240, 405, `deux buts${NB}?`, C.rose, 24)
);

// Le tiroir : 3 chaussettes noires, 2 blanches.
const chaussette = (x: number, y: number, c: string, op: number) =>
  p(`M${x} ${y} L${x + 30} ${y} L${x + 30} ${y + 70} Q${x + 30} ${y + 95} ${x + 5} ${y + 95} L${x - 20} ${y + 95} Q${x - 32} ${y + 95} ${x - 32} ${y + 82} Q${x - 32} ${y + 70} ${x - 15} ${y + 68} L${x} ${y + 62} Z`, c, 3, op);
const tiroir = svg(
  "Un tiroir avec 3 chaussettes noires et 2 chaussettes blanches",
  r(40, 90, 400, 200, C.jaune, 0.12, 4, 6) + chaussette(100, 130, C.craie, 0.75) + chaussette(170, 140, C.craie, 0.75) + chaussette(240, 125, C.craie, 0.75) +
    chaussette(320, 135, C.pale, 0.12) + chaussette(395, 128, C.pale, 0.12) + r(200, 300, 80, 16, C.jaune, 0.4, 3, 6) +
    t(240, 60, "dans le noir, on en prend 2", C.craie, 22) + t(240, 370, `la même couleur${NB}?`, C.rose, 26)
);

const de = (x: number, y: number, a: number, pts: [number, number][], c: string = C.craie) =>
  r(x, y, a, a, c, 0.08, 4, 12) + pts.map(([u, v]) => `<circle cx="${x + u * a}" cy="${y + v * a}" r="${a / 12}" fill="${c}"/>`).join("");
const six: [number, number][] = [[0.28, 0.25], [0.28, 0.5], [0.28, 0.75], [0.72, 0.25], [0.72, 0.5], [0.72, 0.75]];
const chevaux = svg(
  "Deux dés : il faut au moins un 6 pour sortir un cheval",
  de(90, 110, 120, six, C.bleu) + de(270, 110, 120, [], C.rose) + t(330, 188, "?", C.rose, 54) +
    t(240, 60, "Pour sortir : au moins un 6", C.craie, 24).replace(" :", `${NB}:`) + t(240, 320, "on lance les deux dés", C.craie, 22) + t(240, 370, `probabilité${NB}?`, C.rose, 26)
);

const sommes = svg(
  "Deux dés et les sommes possibles de 2 à 12",
  de(110, 60, 90, [[0.5, 0.5]]) + de(280, 60, 90, [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]]) +
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s, i) => r(20 + i * 40, 200, 36, 40, s === 7 ? C.rose : C.craie, s === 7 ? 0.2 : 0, 2, 6) + t(38 + i * 40, 228, s, s === 7 ? C.rose : C.craie, 18)).join("") +
    t(240, 300, "Tom : « 11 sommes possibles,", C.bleu, 22).replace(" :", `${NB}:`).replace("« ", `«${NB}`) + t(240, 330, "donc P(7) = 1 sur 11. »", C.bleu, 22).replace(" »", `${NB}»`) + t(240, 390, `vrai${NB}?`, C.rose, 26)
);

const portes = svg(
  "Trois portes fermées : derrière l'une, une voiture ; derrière les deux autres, une chèvre. L'animateur ouvre une porte avec une chèvre",
  [0, 1, 2].map((i) => r(45 + i * 140, 90, 110, 200, i === 2 ? C.pale : C.jaune, i === 2 ? 0.08 : 0.3, 4, 6) + t(100 + i * 140, 70, i + 1, C.craie, 26)).join("") +
    o(130, 195, 6, C.craie, 1, 0) + o(270, 195, 6, C.craie, 1, 0) + t(380, 200, "🐐", C.craie, 60) +
    t(100, 330, "ton choix", C.bleu, 20) + t(240, 330, "changer ?", C.rose, 20).replace(" ?", `${NB}?`) + t(380, 330, "ouverte", C.pale, 20) + t(240, 390, "rester ou changer de porte ?", C.rose, 22).replace(" ?", `${NB}?`)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "proba_experience",
  titre: "Énigmes des probabilités",
  description: "La machine à capsules, les deux penalties, les chaussettes dans le noir, le 6 des petits chevaux, le piège des 11 sommes, le défi des trois portes : probabilité d'un événement, événement contraire, expériences à deux épreuves, arbres et tableaux.",
  problemes: [
    {
      tag: "Énigme 1 · La machine à capsules",
      titre: "Pas un robot ?",
      question: `Une machine contient <b>12 capsules</b> identiques : 5 robots, 4 dinosaures et 3 licornes. On en obtient une au hasard.<br><br>Quelle est la probabilité de <b>ne pas</b> avoir un robot ?`,
      reponse: `Pas un robot : 4 + 3 = 7 capsules sur 12.<br>P = <span class="big">${frac(7, 12)}</span>, ou 1 − ${frac(5, 12)} (événement contraire).`,
      consigne: "Quelle est la probabilité de ne pas avoir un robot ? (fraction)",
      verification: {"type":"courte","attendus":["7/12"]},
      dessin: capsules,
    },
    {
      tag: "Énigme 2 · Les penalties",
      titre: "Deux buts de suite",
      question: `Maya réussit un penalty avec une probabilité de <b>0,8</b>. Elle en tire <b>deux</b>, et chaque tir ne dépend pas de l'autre.<br><br>Quelle est la probabilité qu'elle <b>marque les deux</b> ?`,
      reponse: `Sur l'arbre, on suit la branche « but, puis but » et on multiplie : 0,8 × 0,8 = <span class="big">0,64</span>.<br>Soit 64 chances sur 100.`,
      consigne: "Quelle est la probabilité qu'elle marque les deux penalties ?",
      verification: {"type":"courte","attendus":["0,64","64/100","16/25"]},
      dessin: arbre,
    },
    {
      tag: "Énigme 3 · Les chaussettes",
      titre: "Dans le noir",
      question: `Un tiroir contient <b>3 chaussettes noires</b> et <b>2 blanches</b>. Dans le noir, on en prend <b>deux</b>, l'une après l'autre.<br><br>Quelle est la probabilité d'avoir <b>deux chaussettes de la même couleur</b> ?`,
      reponse: `Sans remise ! Deux noires : ${frac(3, 5)} × ${frac(2, 4)} = ${frac(6, 20)}. Deux blanches : ${frac(2, 5)} × ${frac(1, 4)} = ${frac(2, 20)}.<br>Total : ${frac(8, 20)} = <span class="big">${frac(2, 5)}</span>.`,
      consigne: "Quelle est la probabilité d'avoir deux chaussettes de la même couleur ?",
      verification: {"type":"qcm","choix":["2/5","13/25","1/2"],"bonne":0},
      dessin: tiroir,
    },
    {
      tag: "Énigme 4 · Les petits chevaux",
      titre: "Au moins un 6",
      question: `Aux petits chevaux, on lance <b>deux dés</b>. Pour sortir un cheval, il faut <b>au moins un 6</b>.<br><br>Quelle est la probabilité de pouvoir sortir ?`,
      reponse: `On passe par le contraire : « aucun 6 ». Chaque dé : ${frac(5, 6)}. Les deux : ${frac(5, 6)} × ${frac(5, 6)} = ${frac(25, 36)}.<br>Au moins un 6 : 1 − ${frac(25, 36)} = <span class="big">${frac(11, 36)}</span>, moins d'une chance sur trois.`,
      consigne: "Quelle est la probabilité d'avoir au moins un 6 ? (fraction)",
      verification: {"type":"courte","attendus":["11/36"]},
      dessin: chevaux,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les onze sommes",
      sorte: "piege",
      question: `On lance deux dés et on fait la somme. Tom dit : « Il y a 11 sommes possibles, de 2 à 12, donc la probabilité d'avoir 7 est 1 sur 11. »<br><br>Quelle est la vraie probabilité d'obtenir <b>7</b> ?`,
      reponse: `Les 11 sommes ne sont pas équiprobables ! Il y a 6 × 6 = 36 couples de dés.<br>7 s'obtient 6 fois : 1-6, 2-5, 3-4, 4-3, 5-2, 6-1. P = ${frac(6, 36)} = <span class="big">${frac(1, 6)}</span> (et 12 : seulement ${frac(1, 36)}).`,
      consigne: "Quelle est la probabilité d'obtenir une somme de 7 ?",
      verification: {"type":"qcm","choix":["1/11","1/12","1/6"],"bonne":2},
      dessin: sommes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois portes",
      sorte: "defi",
      question: `Un jeu télé : derrière une porte, une voiture ; derrière les deux autres, une chèvre. Tu choisis la porte 1. L'animateur, qui sait tout, ouvre une autre porte : une chèvre.<br><br>Si tu <b>changes</b> de porte, quelle est ta probabilité de gagner la voiture ?`,
      reponse: `Ton premier choix est bon 1 fois sur 3 : en changeant, tu perds.<br>Il est mauvais 2 fois sur 3 : l'animateur ouvre l'autre chèvre, et changer te donne la voiture.<br>En changeant : <span class="big">${frac(2, 3)}</span>. Il vaut mieux changer !`,
      consigne: "Si tu changes de porte, quelle est ta probabilité de gagner ?",
      verification: {"type":"qcm","choix":["1/3","2/3","1/2"],"bonne":1},
      dessin: portes,
    },
  ],
};

export default problemes;
