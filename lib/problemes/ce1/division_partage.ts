// Énigmes à projeter — CE1, notion partages et groupements (les fraises
// dans 3 bols, les paires de chaussettes, les canoës de 2 places, la moitié
// des marrons, le piège des voitures de 4 places, le défi des bonbons
// partagés deux fois). Pas de division écrite au CE1. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, ell, p } from "../dessins-ecole";

const fraises = svg(
  "12 fraises et 3 bols vides",
  [...Array(12)].map((_, i) => t(60 + (i % 6) * 72, 110 + Math.floor(i / 6) * 60, "🍓", C.craie, 40)).join("") +
    [0, 1, 2].map((i) => p(`M${70 + i * 140} 210 Q${120 + i * 140} 290 ${170 + i * 140} 210 Z`, C.bleu, 4, 0.15)).join("") +
    t(240, 340, "3 enfants, autant chacun", C.pale, 24) + t(240, 395, `Combien de fraises par bol${NB}?`, C.rose, 26)
);

const chaussettes = svg(
  "20 chaussettes",
  [...Array(20)].map((_, i) => t(60 + (i % 5) * 90, 90 + Math.floor(i / 5) * 62, "🧦", C.craie, 44)).join("") +
    t(240, 350, "1 paire = 2 chaussettes", C.pale, 24) + t(240, 400, `Combien de paires${NB}?`, C.rose, 28)
);

const canoe = (x: number) => p(`M${x - 60} 250 Q${x} 300 ${x + 60} 250 Z`, C.jaune, 4, 0.3) + o(x - 18, 238, 9, C.craie, 0.7, 2) + o(x + 18, 238, 9, C.craie, 0.7, 2);
const canoes = svg(
  "14 enfants ; un canoë de 2 places",
  [...Array(14)].map((_, i) => o(45 + (i % 7) * 65, 80 + Math.floor(i / 7) * 55, 16, C.bleu, 0.4, 3)).join("") +
    canoe(240) + t(240, 320, "2 places par canoë", C.pale, 24) + t(240, 385, `Combien de canoës${NB}?`, C.rose, 30)
);

const marrons = svg(
  "40 marrons : 4 sacs de 10 ; deux enfants",
  [0, 1, 2, 3].map((i) => p(`M${55 + i * 100} 230 Q${45 + i * 100} 140 ${95 + i * 100} 130 Q${145 + i * 100} 140 ${135 + i * 100} 230 Z`, C.jaune, 4, 0.25) + t(95 + i * 100, 200, "10", C.craie, 30)).join("") +
    t(240, 95, "🌰 40 marrons", C.craie, 28) + t(240, 300, "La moitié pour Sami", C.pale, 24) + t(240, 370, `Combien pour Sami${NB}?`, C.rose, 30)
);

const voiture = (x: number) => r(x - 70, 160, 140, 60, C.rose, 0.2, 4, 18) + [0, 1, 2, 3].map((k) => r(x - 56 + k * 30, 172, 22, 22, C.craie, 0, 2, 4)).join("") +
  o(x - 40, 225, 13, C.craie, 0.8, 2) + o(x + 40, 225, 13, C.craie, 0.8, 2);
const voitures = svg(
  "10 enfants ; une voiture de 4 places",
  [...Array(10)].map((_, i) => o(40 + i * 44, 90, 15, C.bleu, 0.4, 3)).join("") + voiture(240) +
    t(240, 300, "4 places par voiture", C.pale, 24) + t(240, 370, `Combien de voitures${NB}?`, C.rose, 30)
);

const bonbons = svg(
  "Un sac de bonbons ; partagé entre 2 enfants : 6 chacun ; puis entre 3 enfants : ?",
  p("M60 260 Q50 120 120 100 Q190 120 180 260 Z", C.rose, 4, 0.2) + t(120, 200, "🍬", C.craie, 50) +
    t(330, 120, `2 enfants${NB}: 6 chacun`, C.craie, 26) + t(330, 230, `3 enfants${NB}: ?`, C.rose, 30) +
    t(240, 350, "Le même sac", C.pale, 24)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "division_partage",
  titre: "Énigmes sur les partages et groupements",
  description: "Les fraises dans trois bols, les paires de chaussettes, les canoës de deux places, la moitié des marrons, le piège des voitures de 4 places, le défi des bonbons partagés deux fois.",
  problemes: [
    {
      tag: "Énigme 1 · Le dessert",
      titre: "Les fraises",
      question: `Il y a <b>12 fraises</b>.<br>On les partage dans <b>3 bols</b>.<br>Chaque bol en a autant.<br><br>Combien par bol ?`,
      reponse: `On distribue une fraise à chaque bol, et on recommence.<br>4 + 4 + 4 = 12.<br><span class="big">4 fraises</span> par bol.`,
      consigne: "Combien de fraises dans chaque bol ?",
      verification: { type: "courte", attendus: ["4"], unite: "fraises" },
      dessin: fraises,
    },
    {
      tag: "Énigme 2 · Le linge",
      titre: "Les chaussettes",
      question: `Papa a lavé <b>20 chaussettes</b>.<br>Il fait des paires de <b>2</b>.<br><br>Combien de paires ?`,
      reponse: `On fait des groupes de 2.<br>10 groupes de 2 = 20.<br><span class="big">10 paires</span>.`,
      consigne: "Combien de paires avec 20 chaussettes ?",
      verification: { type: "courte", attendus: ["10"], unite: "paires" },
      dessin: chaussettes,
    },
    {
      tag: "Énigme 3 · La rivière",
      titre: "Les canoës",
      question: `<b>14 enfants</b> font du canoë.<br>Un canoë a <b>2 places</b>.<br><br>Combien de canoës ?`,
      reponse: `Des groupes de 2 : 2, 4, 6, 8, 10, 12, 14.<br>On a compté 7 fois.<br><span class="big">7 canoës</span>.`,
      consigne: "Combien de canoës pour 14 enfants ?",
      verification: { type: "courte", attendus: ["7"], unite: "canoës" },
      dessin: canoes,
    },
    {
      tag: "Énigme 4 · La forêt",
      titre: "Les marrons",
      question: `Sami et sa sœur ont <b>40 marrons</b>.<br>Sami prend <b>la moitié</b>.<br><br>Combien en a Sami ?`,
      reponse: `4 sacs de 10 : 2 sacs chacun.<br>20 + 20 = 40.<br>Sami a <span class="big">20 marrons</span>.`,
      consigne: "Combien de marrons a Sami ?",
      verification: { type: "qcm", choix: ["20", "4", "10"], bonne: 0 },
      dessin: marrons,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les voitures",
      sorte: "piege",
      question: `<b>10 enfants</b> vont au stade.<br>Une voiture a <b>4 places</b> pour eux.<br><br>Combien de voitures faut-il ?`,
      reponse: `2 voitures : 4 + 4 = 8 enfants.<br>Le piège : il reste 2 enfants à pied !<br>Il faut <span class="big">3 voitures</span>.`,
      consigne: "Combien de voitures faut-il ?",
      verification: { type: "qcm", choix: ["2", "4", "3"], bonne: 2 },
      dessin: voitures,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le sac de bonbons",
      sorte: "defi",
      question: `Un sac de bonbons pour <b>2 enfants</b> : <b>6 chacun</b>.<br>Le même sac pour <b>3 enfants</b>.<br><br>Combien chacun ?`,
      reponse: `D'abord, le sac : 6 + 6 = 12 bonbons.<br>Pour 3 : 4 + 4 + 4 = 12.<br><span class="big">4 bonbons</span> chacun.`,
      consigne: "Combien de bonbons pour chacun des 3 enfants ?",
      verification: { type: "courte", attendus: ["4"], unite: "bonbons" },
      dessin: bonbons,
    },
  ],
};

export default problemes;
