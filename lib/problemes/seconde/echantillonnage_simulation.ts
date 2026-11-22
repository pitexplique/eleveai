// Énigmes à projeter — seconde, notion echantillonnage_simulation (la pièce
// suspecte, les boutures de vanille à Saint-André (974), la simulation en
// Python, les bonbons rouges, piège de la série de faces, défi du sondage).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";
import { frac } from "../outils";

// Un segment gradué de v0 à v1 entre x = 40 et x = 440, à la hauteur y.
const axe = (y: number, v0: number, v1: number, pasE: number, ecrit: (v: number) => string) => {
  const X = (v: number) => 40 + ((v - v0) / (v1 - v0)) * 400;
  let s = l(30, y, 450, y, C.craie, 3);
  for (let v = v0; v <= v1 + 1e-9; v += pasE) s += l(X(v), y - 8, X(v), y + 8, C.craie, 2) + t(X(v), y + 34, ecrit(v), C.pale, 18);
  return { s, X };
};
const virgule = (v: number) => String(+v.toFixed(2)).replace(".", ",");

const piece = (() => {
  const A = axe(220, 0.3, 0.7, 0.1, virgule);
  return svg("L'intervalle de 0,4 à 0,6 sur un axe, et la fréquence observée 0,54 à l'intérieur",
    A.s + r(A.X(0.4), 204, A.X(0.6) - A.X(0.4), 32, C.bleu, 0.2, 3, 4) + o(A.X(0.54), 220, 9, C.rose, 1, 0) +
      t(A.X(0.54), 175, "0,54", C.rose, 22) + t(240, 90, "100 lancers : 54 piles", C.craie, 26) + t(240, 345, `pièce truquée${NB}?`, C.rose, 28));
})();

// Une bouture : une tige et deux feuilles.
const bouture = (x: number, y: number, prise: boolean) =>
  l(x, y, x, y - 34, prise ? C.bleu : C.pale, 3) + (prise ? p(`M${x} ${y - 20} q-14 -6 -16 -18 q12 0 16 18 M${x} ${y - 26} q14 -6 16 -18 q-12 0 -16 18`, C.bleu, 2, 0.4) : "");
const vanille = svg(
  "400 boutures de vanille, 340 ont pris",
  Array.from({ length: 20 }, (_, k) => bouture(48 + 43 * (k % 10), 130 + 70 * Math.floor(k / 10), k !== 6 && k !== 13 && k !== 19)).join("") +
    t(240, 60, "Saint-André : 400 boutures", C.craie, 24) + t(240, 270, "340 ont pris", C.bleu, 26) + t(240, 340, `fréquence${NB}?`, C.rose, 30)
);

const python = svg(
  "Un programme Python qui lance 6 000 fois un dé et compte les 6",
  r(30, 30, 420, 250, C.craie, 0.05, 3, 10) +
    [["from random import randint", 0], ["n = 0", 0], ["for k in range(6000):", 0], ["if randint(1, 6) == 6:", 1], ["n = n + 1", 2], ["print(n)", 0]]
      .map(([s, i], k) => t(55 + 32 * (i as number), 72 + 38 * k, s as string, k === 3 ? C.bleu : C.craie, 21, "start")).join("") +
    t(240, 350, `environ quel nombre affiché${NB}?`, C.rose, 24)
);

const bonbons = svg(
  "Un paquet de bonbons : estimer la part de bonbons rouges à 0,05 près",
  Array.from({ length: 24 }, (_, k) => o(70 + 49 * (k % 8), 80 + 50 * Math.floor(k / 8), 18, k % 3 === 0 ? C.rose : k % 3 === 1 ? C.jaune : C.bleu, 0.4, 2)).join("") +
    t(240, 270, "f − 0,05 ≤ p ≤ f + 0,05", C.bleu, 24) + t(240, 340, `combien de bonbons${NB}?`, C.rose, 28)
);

const serie = svg(
  "Cinq lancers de pièce, cinq fois face, puis un point d'interrogation",
  [0, 1, 2, 3, 4].map((k) => o(60 + 72 * k, 160, 30, C.jaune, 0.25, 3) + t(60 + 72 * k, 170, "F", C.craie, 28)).join("") +
    o(420, 160, 30, C.rose, 0, 3) + t(420, 172, "?", C.rose, 32) + t(240, 290, `P(pile) au 6e lancer${NB}?`, C.rose, 28)
);

const sondage = (() => {
  const A = axe(230, 0.45, 0.6, 0.05, virgule);
  return svg("L'intervalle de 0,488 à 0,552 sur un axe, qui déborde sous 0,5",
    A.s + r(A.X(0.488), 214, A.X(0.552) - A.X(0.488), 32, C.bleu, 0.2, 3, 4) + l(A.X(0.5), 150, A.X(0.5), 248, C.rose, 3, "8 6") +
      t(A.X(0.5), 135, "la moitié", C.rose, 20) + t(240, 70, "1 000 personnes : 52 % pour", C.craie, 24) + t(240, 360, `plus de la moitié${NB}?`, C.rose, 28));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "echantillonnage_simulation",
  titre: "Énigmes de l'échantillonnage",
  description: "La pièce suspecte, les boutures de vanille, la simulation en Python, les bonbons rouges, le piège de la série de faces, le défi du sondage : fréquence observée, fluctuation, intervalle à 95 %, taille d'échantillon.",
  problemes: [
    {
      tag: "Énigme 1 · La pièce suspecte",
      titre: "54 piles sur 100",
      question: `Sur <b>100 lancers</b>, une pièce donne <b>54 piles</b>. Pour une pièce équilibrée, 95 % des échantillons de taille 100 donnent une fréquence dans [0,5 − ${frac(1, "√100")} ; 0,5 + ${frac(1, "√100")}].<br><br><b>La pièce est-elle truquée</b> ?`,
      reponse: `${frac(1, "√100")} = 0,1 : l'intervalle est [0,4 ; 0,6].<br>0,54 est dedans : <span class="big">rien d'anormal</span>. Une petite différence avec 0,5, c'est la fluctuation.`,
      consigne: "54 piles sur 100 lancers : la pièce est-elle truquée ?",
      verification: { type: "qcm", choix: ["Rien d'anormal", "Oui, truquée", "On ne peut rien dire du tout"], bonne: 0 },
      dessin: piece,
    },
    {
      tag: "Énigme 2 · Les boutures de vanille",
      titre: "La fréquence observée",
      question: `À Saint-André, un planteur a mis en terre <b>400 boutures</b> de vanille. <b>340</b> ont pris racine.<br><br><b>Quelle est la fréquence</b> des boutures qui ont pris ?`,
      reponse: `Fréquence = effectif ÷ total = 340 ÷ 400 = <span class="big">0,85</span>, soit 85 %.`,
      consigne: "Quelle est la fréquence des boutures qui ont pris ?",
      verification: { type: "courte", attendus: ["0,85", "0.85", "85%"] },
      dessin: vanille,
    },
    {
      tag: "Énigme 3 · La simulation",
      titre: "Six mille lancers en une seconde",
      question: `Ce programme Python lance <b>6 000 fois</b> un dé équilibré et compte les 6.<br><br><b>Environ quel nombre</b> affiche-t-il ?`,
      reponse: `La probabilité d'un 6 est ${frac(1, 6)}.<br>6 000 × ${frac(1, 6)} = <span class="big">1 000</span> environ. Le nombre change à chaque exécution : 985, 1 012…`,
      consigne: "Environ combien de 6 sur 6 000 lancers simulés ?",
      verification: { type: "courte", attendus: ["1000"] },
      dessin: python,
    },
    {
      tag: "Énigme 4 · Les bonbons rouges",
      titre: "La bonne taille d'échantillon",
      question: `Une confiserie veut estimer la part p de bonbons rouges. Avec un échantillon de taille n, p est dans [f − ${frac(1, "√n")} ; f + ${frac(1, "√n")}] (à 95 %).<br><br>Pour une précision de <b>0,05</b>, combien de bonbons faut-il ?`,
      reponse: `On veut ${frac(1, "√n")} = 0,05, donc √n = 1 ÷ 0,05 = 20.<br>n = 20² = <span class="big">400</span> bonbons.`,
      consigne: "Combien de bonbons faut-il pour une précision de 0,05 ?",
      verification: { type: "courte", attendus: ["400"], unite: "bonbons" },
      dessin: bonbons,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Cinq faces de suite",
      sorte: "piege",
      question: `Une pièce équilibrée vient de tomber <b>5 fois de suite</b> sur face.<br>Yanis : « Au prochain lancer, pile a plus de chances. »<br><br><b>Quelle est la probabilité</b> de pile au 6<sup>e</sup> lancer ?`,
      reponse: `La pièce n'a pas de mémoire : chaque lancer est indépendant des autres.<br>P(pile) = <span class="big">${frac(1, 2)}</span>, comme toujours.`,
      consigne: "Après 5 faces de suite, probabilité de pile au lancer suivant ?",
      verification: { type: "qcm", choix: ["Moins de 1/2", "1/2", "Plus de 1/2"], bonne: 1 },
      dessin: serie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le sondage",
      sorte: "defi",
      question: `Sur <b>1 000</b> personnes interrogées, <b>52 %</b> veulent garder l'heure d'été toute l'année.<br>On a ${frac(1, "√1000")} ≈ 0,032.<br><br>Peut-on dire que <b>plus de la moitié</b> de la population le veut ?`,
      reponse: `À 95 % : p est dans [0,52 − 0,032 ; 0,52 + 0,032] = [0,488 ; 0,552].<br>Cet intervalle contient des valeurs sous 0,5 : <span class="big">non, pas sûr</span>.`,
      consigne: "52 % sur 1 000 personnes : est-on sûr que plus de la moitié le veut ?",
      verification: { type: "qcm", choix: ["Oui, c'est sûr", "Oui, à 95 %", "Non, pas sûr"], bonne: 2 },
      dessin: sondage,
    },
  ],
};

export default problemes;
