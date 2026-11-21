// Énigmes à projeter — CP, notion addition_soustraction : les deux
// aquariums, les oiseaux qui s'envolent, le domino, les billes de Tom et
// d'Ana, le piège des « 2 de plus », le défi des billes cachées dans le sac.
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, p, fleche } from "../dessins-ecole";
import { rang, tas } from "../dessins-cp";

const aquarium = (x: number, n: number) => r(x - 90, 90, 180, 150, C.bleu, 0.12, 3, 8) + tas("🐟", n, x - 60, 150, 3, 60, 36);
const aquariums = svg(
  "Un aquarium avec 4 poissons, un autre avec 3 poissons",
  aquarium(125, 4) + aquarium(355, 3) + t(240, 350, `Combien de poissons${NB}?`, C.rose, 30)
);

const oiseaux = svg(
  "8 oiseaux sur un fil ; 3 s'envolent",
  l(20, 260, 460, 260, C.pale, 3) + rang("🐦", 5, 60, 250, 60, 40) +
    t(340, 120, "🐦", C.craie, 40) + t(390, 90, "🐦", C.craie, 40) + t(440, 130, "🐦", C.craie, 40) +
    fleche(330, 240, 380, 160, C.rose, 3) + t(240, 360, `Combien restent${NB}?`, C.rose, 30)
);

const point = (x: number, y: number) => o(x, y, 9, C.craie, 1, 0);
const domino = svg(
  "Un domino : 5 points d'un côté, 4 points de l'autre",
  r(90, 120, 300, 150, C.craie, 0, 4, 16) + l(240, 130, 240, 260, C.craie, 3) +
    point(125, 155) + point(205, 155) + point(165, 195) + point(125, 235) + point(205, 235) +
    point(275, 155) + point(355, 155) + point(275, 235) + point(355, 235) +
    t(240, 350, `Combien de points${NB}?`, C.rose, 30)
);

const billes = svg(
  "Tom a 9 billes, Ana a 6 billes",
  t(60, 140, "Tom", C.craie, 26, "start") + rang("🔵", 9, 160, 140, 34, 26) +
    t(60, 240, "Ana", C.craie, 26, "start") + rang("🔵", 6, 160, 240, 34, 26) +
    t(240, 360, `Combien de plus pour Tom${NB}?`, C.rose, 28)
);

const piege = svg(
  "Lucas a 6 bonbons, 2 de plus que Zoé. Les bonbons de Zoé sont cachés.",
  t(60, 140, "Lucas", C.craie, 26, "start") + rang("🍬", 6, 180, 140, 44, 32) +
    t(60, 250, "Zoé", C.craie, 26, "start") + r(170, 205, 260, 70, C.pale, 0.2, 3, 10) + t(300, 252, "?", C.rose, 40) +
    t(240, 370, `Combien pour Zoé${NB}?`, C.rose, 30)
);

const defi = svg(
  "Un sac de 10 billes ; 4 billes sont sorties du sac",
  p("M120 140 Q100 290 200 300 Q300 290 280 140 Z", C.jaune, 3, 0.25) + l(130, 140, 270, 140, C.jaune, 6) +
    t(200, 230, "?", C.rose, 48) + t(200, 100, "10 billes en tout", C.craie, 26) +
    tas("🔵", 4, 350, 200, 2, 50, 36) + t(375, 310, "sorties", C.pale, 22) +
    t(240, 380, `Combien dans le sac${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "addition_soustraction",
  titre: "Énigmes sur les additions et soustractions",
  description: "Les poissons des deux aquariums, les oiseaux qui s'envolent, les points du domino, les billes de Tom et d'Ana, le piège des 2 de plus, le défi des billes cachées dans le sac.",
  problemes: [
    {
      tag: "Énigme 1 · Les aquariums",
      titre: "Les poissons",
      question: `Combien de poissons en tout ?`,
      reponse: `4 + 3 = <span class="big">7 poissons</span>.`,
      consigne: "Combien de poissons dans les deux aquariums ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: aquariums,
    },
    {
      tag: "Énigme 2 · Le fil",
      titre: "Les oiseaux",
      question: `<b>8</b> oiseaux sur le fil.<br><b>3</b> s'envolent.<br><br>Combien restent ?`,
      reponse: `8 − 3 = <span class="big">5 oiseaux</span>.`,
      consigne: "8 oiseaux, 3 s'envolent : combien restent ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: oiseaux,
    },
    {
      tag: "Énigme 3 · Le domino",
      titre: "Le domino",
      question: `Combien de points sur le domino ?`,
      reponse: `5 + 4 = <span class="big">9 points</span>.`,
      consigne: "Combien de points sur le domino ?",
      verification: { type: "qcm", choix: ["8", "9", "10"], bonne: 1 },
      dessin: domino,
    },
    {
      tag: "Énigme 4 · Les billes",
      titre: "Tom et Ana",
      question: `Tom a <b>9</b> billes.<br>Ana a <b>6</b> billes.<br><br>Tom en a combien de plus ?`,
      reponse: `De 6 à 9 : 3.<br><span class="big">3 billes de plus</span>.`,
      consigne: "Tom a 9 billes, Ana 6. Combien de plus pour Tom ?",
      verification: { type: "qcm", choix: ["15", "6", "3"], bonne: 2 },
      dessin: billes,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Les bonbons de Zoé",
      question: `Lucas a <b>6</b> bonbons.<br>Il en a <b>2 de plus</b> que Zoé.<br><br>Combien pour Zoé ?`,
      reponse: `Lucas a plus, Zoé a moins.<br>6 − 2 = <span class="big">4 bonbons</span>.`,
      consigne: "Lucas a 6 bonbons, 2 de plus que Zoé. Combien pour Zoé ?",
      verification: { type: "qcm", choix: ["4", "8", "2"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le sac de billes",
      question: `<b>10</b> billes en tout.<br><b>4</b> sont sorties.<br><br>Combien dans le sac ?`,
      reponse: `4 + ? = 10.<br>4 + 6 = 10.<br><span class="big">6 billes</span>.`,
      consigne: "10 billes en tout, 4 sorties : combien dans le sac ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
