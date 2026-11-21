// Énigmes à projeter — 3e, notion entier_puissance (écriture scientifique,
// puissances de 10 négatives, quotients de puissances, ordre de grandeur,
// piège 10⁻² négatif, défi du dernier chiffre de 3²⁰²⁶). 21/11/2026.
// ⛔ Ne reprend pas la 4e (échiquier, vidéo, fourmi, lumière du Soleil).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, fleche } from "../dessins-ecole";

// La Terre et la Lune (pas à l'échelle : la distance serait 30 diamètres).
const lune = svg(
  "La Terre et la Lune, séparées de 384 000 km",
  o(90, 200, 55, C.bleu, 0.3) + o(400, 200, 16, C.pale, 0.4) + fleche(155, 200, 375, 200, C.rose, 3) + fleche(375, 200, 155, 200, C.rose, 3) +
    t(265, 180, "384 000 km", C.craie, 30) + t(90, 290, "Terre", C.bleu, 22) + t(400, 250, "Lune", C.pale, 22) +
    t(240, 360, `écriture scientifique${NB}?`, C.rose, 26) + t(240, 400, "pas à l'échelle", C.pale, 18)
);

// Une rangée de bactéries sur une règle de 1 cm.
const bacteries = svg(
  "Des bactéries alignées sur une règle de 1 cm",
  r(40, 210, 400, 50, C.jaune, 0.15, 3) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => l(40 + 40 * k, 210, 40 + 40 * k, k % 5 ? 225 : 235, C.craie, 2)).join("") +
    t(40, 290, "0", C.craie, 22) + t(440, 290, "1 cm", C.craie, 22) +
    [0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<ellipse cx="${70 + 46 * k}" cy="170" rx="20" ry="11" fill="${C.rose}" fill-opacity=".35" stroke="${C.rose}" stroke-width="3"/>`).join("") +
    t(240, 110, "une bactérie : 2 × 10⁻⁶ m", C.rose, 24).replace(" :", `${NB}:`) + t(240, 360, `combien sur 1 cm${NB}?`, C.rose, 26) + t(240, 400, "pas à l'échelle", C.pale, 18)
);

// Un disque dur et des photos.
const disque = svg(
  "Un disque dur de 2 téraoctets et des photos de 4 mégaoctets",
  r(60, 120, 170, 200, C.craie, 0.08, 4, 14) + o(145, 210, 55, C.pale, 0.2, 3) + o(145, 210, 8, C.craie, 1, 2) + t(145, 300, "2 × 10¹² o", C.craie, 20) +
    [0, 1, 2].map((k) => r(270 + 18 * k, 130 + 22 * k, 120, 90, C.jaune, 0.25, 3, 6) + p(`M${282 + 18 * k} ${205 + 22 * k} l30 -30 l20 18 l25 -28 l30 40`, C.bleu, 3)).join("") +
    t(355, 300, "4 × 10⁶ o", C.jaune, 22) + t(240, 380, `combien de photos${NB}?`, C.rose, 26)
);

// La Terre et une goutte : 8 milliards d'habitants qui boivent 2 L.
const eau = svg(
  "La Terre et ses 8 milliards d'habitants, qui boivent chacun 2 litres par jour",
  o(150, 200, 100, C.bleu, 0.2) + p("M110 140 q30 -20 60 0 q20 30 -10 50 q-40 10 -50 -50 Z M170 230 q30 0 40 30 q-20 30 -45 10 Z", C.jaune, 3, 0.35) +
    t(150, 345, "8 × 10⁹ habitants", C.craie, 24) +
    p("M370 120 q-50 70 -50 110 a50 50 0 0 0 100 0 q0 -40 -50 -110 Z", C.bleu, 4, 0.3) + t(370, 250, "2 L", C.bleu, 30) + t(370, 320, "par jour", C.bleu, 22) +
    t(240, 400, `en tout, chaque jour${NB}?`, C.rose, 26)
);

// Le piège : un thermomètre ? Non, une droite des nombres.
const piege = svg(
  "Une droite des nombres de moins 1 à 1, avec 10 puissance moins 2 à placer",
  l(40, 220, 440, 220, C.craie, 3) + [-1, -0.5, 0, 0.5, 1].map((v) => l(240 + 180 * v, 208, 240 + 180 * v, 232, C.craie, 3) + t(240 + 180 * v, 270, String(v).replace(".", ","), C.craie, 22)).join("") +
    t(240, 120, "10⁻²", C.rose, 54) + t(240, 340, `à gauche ou à droite de 0${NB}?`, C.rose, 24)
);

// Le défi : les derniers chiffres des puissances de 3.
const defi = svg(
  "Les puissances de 3 et leur dernier chiffre : 3, 9, 27, 81, 243, 729",
  [["3¹", "3"], ["3²", "9"], ["3³", "27"], ["3⁴", "81"], ["3⁵", "243"], ["3⁶", "729"]].map(([a, b], k) =>
    t(110, 70 + 46 * k, a, C.craie, 26) + t(200, 70 + 46 * k, "=", C.pale, 26) + t(300, 70 + 46 * k, b.slice(0, -1), C.craie, 26, "end") + t(300, 70 + 46 * k, b.slice(-1), C.rose, 26, "start")
  ).join("") + t(240, 370, "3²⁰²⁶ = …?", C.rose, 34).replace("…?", `…${NB}?`)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "entier_puissance",
  titre: "Énigmes des puissances",
  description: "La distance de la Lune, les bactéries sur une règle, le disque dur plein de photos, l'eau bue par toute la planète, le piège de 10⁻², le défi du dernier chiffre de 3²⁰²⁶ : écriture scientifique, puissances de 10 négatives, produits et quotients de puissances.",
  problemes: [
    {
      tag: "Énigme 1 · L'écriture scientifique",
      titre: "La distance de la Lune",
      question: `La Lune est à environ <b>384 000 km</b> de la Terre.<br><br>Parmi ces trois écritures, toutes égales, laquelle est l'<b>écriture scientifique</b> ?<br>38,4 × 10<sup>4</sup> · 3,84 × 10<sup>5</sup> · 384 × 10<sup>3</sup>`,
      reponse: `L'écriture scientifique est a × 10<sup>n</sup> avec <b>un seul chiffre non nul avant la virgule</b> (1 ≤ a &lt; 10).<br>C'est <span class="big">3,84 × 10<sup>5</sup> km</span>.`,
      consigne: "Quelle est l'écriture scientifique de 384 000 ?",
      verification: {"type":"qcm","choix":["38,4 × 10⁴","384 × 10³","3,84 × 10⁵"],"bonne":2},
      dessin: lune,
    },
    {
      tag: "Énigme 2 · Au microscope",
      titre: "Les bactéries en rang",
      question: `Une bactérie mesure <b>2 × 10<sup>−6</sup> m</b> de long. On les aligne bout à bout.<br><br><b>Combien</b> de bactéries faut-il pour faire <b>1 cm</b> ?`,
      reponse: `1 cm = 10<sup>−2</sup> m. On divise : 10<sup>−2</sup> ÷ (2 × 10<sup>−6</sup>) = 0,5 × 10<sup>−2 − (−6)</sup> = 0,5 × 10<sup>4</sup>.<br>Il faut <span class="big">5 000 bactéries</span>.`,
      consigne: "Combien de bactéries de 2 × 10⁻⁶ m tiennent sur 1 cm ?",
      verification: {"type":"courte","attendus":["5000","5 000","5×10^3","5x10^3"],"unite":"bactéries"},
      dessin: bacteries,
    },
    {
      tag: "Énigme 3 · Le disque dur",
      titre: "Combien de photos ?",
      question: `Un disque dur peut stocker <b>2 × 10<sup>12</sup> octets</b> (2 To). Une photo pèse <b>4 × 10<sup>6</sup> octets</b> (4 Mo).<br><br><b>Combien de photos</b> peut-on y ranger ?`,
      reponse: `(2 × 10<sup>12</sup>) ÷ (4 × 10<sup>6</sup>) = 0,5 × 10<sup>12 − 6</sup> = 0,5 × 10<sup>6</sup>.<br>On peut ranger <span class="big">500 000 photos</span>, soit 5 × 10<sup>5</sup>.`,
      consigne: "Combien de photos de 4 Mo tiennent sur un disque de 2 To ?",
      verification: {"type":"courte","attendus":["500000","500 000","5×10^5","5x10^5"],"unite":"photos"},
      dessin: disque,
    },
    {
      tag: "Énigme 4 · Toute la planète",
      titre: "L'eau bue en un jour",
      question: `La Terre compte environ <b>8 × 10<sup>9</sup></b> habitants. Chacun boit environ <b>2 L</b> d'eau par jour.<br><br>Combien de litres l'humanité boit-elle <b>en un jour</b> ? Donne l'écriture scientifique.`,
      reponse: `8 × 10<sup>9</sup> × 2 = 16 × 10<sup>9</sup> = 1,6 × 10 × 10<sup>9</sup> = <span class="big">1,6 × 10<sup>10</sup> L</span>.<br>C'est 16 milliards de litres : de quoi remplir 6 400 piscines olympiques.`,
      consigne: "Combien de litres l'humanité boit-elle en un jour ?",
      verification: {"type":"qcm","choix":["1,6 × 10¹⁰ L","1,6 × 10⁹ L","16 × 10¹⁸ L"],"bonne":0},
      dessin: eau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Un exposant négatif",
      sorte: "piege",
      question: `Sami affirme : « 10<sup>−2</sup>, c'est un nombre négatif, puisqu'il y a un signe moins. »<br><br><b>Combien vaut</b> vraiment 10<sup>−2</sup> ?`,
      reponse: `Le signe moins est dans l'<b>exposant</b>, pas devant le nombre. 10<sup>−2</sup> = 1 ÷ 10<sup>2</sup> = 1 ÷ 100 = <span class="big">0,01</span>.<br>C'est un petit nombre, mais il est <b>positif</b> : il se place juste à droite de 0.`,
      consigne: "Combien vaut 10⁻² ?",
      verification: {"type":"qcm","choix":["−100","0,01","−0,01"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le dernier chiffre",
      sorte: "defi",
      question: `Personne ne peut écrire 3<sup>2026</sup> en entier : il a presque 1 000 chiffres !<br><br>Pourtant, on peut trouver son <b>dernier chiffre</b>. Lequel est-ce ?`,
      reponse: `Les derniers chiffres des puissances de 3 tournent en boucle : 3, 9, 7, 1, puis 3, 9, 7, 1… Un tour fait 4 puissances.<br>2026 = 4 × 506 + 2 : on tombe à la 2<sup>e</sup> place du tour, comme 3<sup>2</sup>. Le dernier chiffre est <span class="big">9</span>.`,
      consigne: "Quel est le dernier chiffre de 3²⁰²⁶ ?",
      verification: {"type":"courte","attendus":["9"]},
      dessin: defi,
    },
  ],
};

export default problemes;
