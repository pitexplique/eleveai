// Énigmes à projeter — CM2, notion division (boîtes d'œufs, le reste des
// sachets, le prix d'une nuit, un quotient décimal, le piège des cars où l'on
// arrondit au-dessus, le défi « quotient et reste connus »). 20/11/2026.
// ⛔ Division avec « ÷ », jamais 5/2.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l } from "../dessins-ecole";

const oeufs = svg(
  "156 œufs à ranger dans des boîtes de 12",
  [0, 1].map((b) => r(50 + b * 200, 90, 180, 80, C.jaune, 0.15, 4, 8) + [0, 1].map((j) => [0, 1, 2, 3, 4, 5].map((i) => o(70 + b * 200 + i * 28, 112 + j * 36, 11, C.craie, 0.08, 2)).join("")).join("")).join("") +
    t(240, 220, "1 boîte = 12 œufs", C.craie, 26) + t(240, 280, "156 œufs 🥚", C.craie, 30) + t(240, 350, `Combien de boîtes${NB}?`, C.rose, 28)
);

const sachets = svg(
  "100 bonbons à mettre en sachets de 8",
  [0, 1, 2].map((i) => r(60 + i * 130, 80, 100, 120, C.rose, 0.12, 4, 14) + t(110 + i * 130, 150, "8", C.craie, 40)).join("") +
    t(240, 250, "100 bonbons 🍬", C.craie, 30) + t(240, 295, "sachets de 8", C.pale, 24) + t(240, 360, `Combien en reste-t-il${NB}?`, C.rose, 26)
);

const gite = svg(
  "Un gîte loué 7 nuits pour 378 €",
  `<path d="M120 200 L240 100 L360 200" fill="${C.jaune}" fill-opacity=".25" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>` +
    r(140, 200, 200, 110, C.craie, 0.06, 4) + r(220, 250, 40, 60, C.bleu, 0.3, 3) +
    t(240, 60, "7 nuits = 378 €", C.craie, 30) + t(240, 370, `1 nuit${NB}: ? €`, C.rose, 30)
);

// Un ruban de 9 m : 1 m = 44 px (396 px), coupé en 4 morceaux de 99 px.
const ruban = svg(
  "Un ruban de 9 m coupé en 4 morceaux égaux",
  r(42, 150, 396, 36, C.rose, 0.3, 3) +
    [1, 2, 3].map((k) => l(42 + k * 99, 135, 42 + k * 99, 200, C.craie, 3, "6 5")).join("") +
    t(240, 120, "9 m", C.craie, 32) + t(91, 240, "?", C.rose, 32) + t(240, 330, "4 morceaux égaux ✂️", C.pale, 24)
);

const cars = svg(
  "245 élèves et des cars de 50 places",
  [0, 1, 2, 3].map((i) => r(20 + i * 112, 110, 100, 60, C.bleu, 0.2, 3, 10) + t(70 + i * 112, 150, "50", C.craie, 26)).join("") +
    t(240, 70, "🚌 un car = 50 places", C.craie, 26) + t(240, 240, "245 élèves", C.craie, 34) + t(240, 320, `Combien de cars${NB}?`, C.rose, 28)
);

const mystere = svg(
  "Un nombre mystère : divisé par 7, quotient 12, reste 3",
  r(170, 60, 140, 90, C.jaune, 0.2, 4, 12) + t(240, 122, "?", C.jaune, 56) +
    t(240, 210, "? ÷ 7", C.craie, 36) + t(240, 270, "quotient 12", C.bleu, 30) + t(240, 320, "reste 3", C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "division",
  titre: "Énigmes sur la division",
  description: "Les boîtes d'œufs, le reste des sachets de bonbons, le prix d'une nuit au gîte, le ruban coupé en quatre, le piège des cars, le défi du nombre mystère.",
  problemes: [
    {
      tag: "Énigme 1 · À la ferme",
      titre: "Les boîtes d'œufs",
      question: `Une fermière a <b>156 œufs</b>.<br>Elle les range dans des boîtes de <b>12</b>.<br><br><b>Combien de boîtes</b> remplit-elle ?`,
      reponse: `156 ÷ 12 = ?<br>10 boîtes, c'est 120 œufs. Il reste 36 œufs, soit 3 boîtes.<br>10 + 3 = <span class="big">13 boîtes</span>.`,
      consigne: "Combien de boîtes de 12 œufs ?",
      verification: { type: "courte", attendus: ["13"], unite: "boîtes" },
      dessin: oeufs,
    },
    {
      tag: "Énigme 2 · À la fête",
      titre: "Le reste des bonbons",
      question: `Mia a <b>100 bonbons</b>.<br>Elle fait des sachets de <b>8 bonbons</b>.<br><br><b>Combien de bonbons restent</b> hors des sachets ?`,
      reponse: `12 × 8 = 96, et 13 × 8 = 104 : c'est trop.<br>Elle fait 12 sachets. 100 − 96 = 4.<br>Il reste <span class="big">4 bonbons</span>.`,
      consigne: "Combien de bonbons restent ?",
      verification: { type: "courte", attendus: ["4"], unite: "bonbons" },
      dessin: sachets,
    },
    {
      tag: "Énigme 3 · En vacances",
      titre: "Le prix d'une nuit",
      question: `Une famille loue un gîte pour <b>7 nuits</b>.<br>Elle paie <b>378 €</b>.<br><br>Combien coûte <b>une nuit</b> ?`,
      reponse: `378 ÷ 7 = ?<br>7 × 50 = 350. Il reste 28, et 28 ÷ 7 = 4.<br>Une nuit coûte <span class="big">54 €</span>.`,
      consigne: "Combien coûte une nuit ?",
      verification: { type: "qcm", choix: ["56 €", "54 €", "45 €"], bonne: 1 },
      dessin: gite,
    },
    {
      tag: "Énigme 4 · À l'atelier",
      titre: "Le ruban coupé",
      question: `Un ruban mesure <b>9 m</b>.<br>On le coupe en <b>4 morceaux égaux</b>.<br><br>Combien mesure <b>un morceau</b> ?`,
      reponse: `9 ÷ 4 = 2, reste 1 m.<br>1 m = 100 cm, et 100 ÷ 4 = 25 cm.<br>Un morceau mesure <span class="big">2,25 m</span>.`,
      consigne: "Combien mesure un morceau, en mètres ?",
      verification: { type: "courte", attendus: ["2,25", "2.25"], unite: "m" },
      dessin: ruban,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les cars de la sortie",
      sorte: "piege",
      question: `<b>245 élèves</b> partent en sortie.<br>Un car a <b>50 places</b>.<br><br><b>Combien de cars</b> faut-il ?`,
      reponse: `245 ÷ 50 = 4, reste 45.<br>4 cars ne suffisent pas : 45 élèves resteraient à l'école !<br>Il faut <span class="big">5 cars</span>.`,
      consigne: "Combien de cars faut-il ?",
      verification: { type: "qcm", choix: ["4 cars", "4,9 cars", "5 cars"], bonne: 2 },
      dessin: cars,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre mystère",
      sorte: "defi",
      question: `Je divise un nombre par <b>7</b>.<br>Le quotient est <b>12</b>. Le reste est <b>3</b>.<br><br><b>Quel est ce nombre</b> ?`,
      reponse: `On remonte : 7 × 12 = 84.<br>On ajoute le reste : 84 + 3 = <span class="big">87</span>.<br>Vérification : 87 ÷ 7 = 12, reste 3.`,
      consigne: "Quel est le nombre mystère ?",
      verification: { type: "courte", attendus: ["87"] },
      dessin: mystere,
    },
  ],
};

export default problemes;
