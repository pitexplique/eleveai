// Énigmes à projeter — CE2, notion partages et groupements (les cartes du
// jeu, les boîtes d'œufs, les bonbons et le reste, les équipes de 3, le piège
// des pédalos, le défi des billes mystère). Pas de division posée au CE2 :
// on partage, on groupe, on s'appuie sur les tables. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, ell } from "../dessins-ecole";

const cartes = svg(
  "24 cartes à partager entre 4 enfants",
  Array.from({ length: 24 }, (_, k) => r(42 + (k % 12) * 34, 70 + Math.floor(k / 12) * 56, 26, 44, C.bleu, 0.3, 2, 4)).join("") +
    [0, 1, 2, 3].map((i) => t(90 + i * 100, 280, "🧒", C.craie, 52)).join("") +
    t(240, 380, `Combien de cartes chacun${NB}?`, C.rose, 28)
);

const oeufs = svg(
  "30 œufs à ranger dans des boîtes de 6",
  Array.from({ length: 30 }, (_, k) => ell(50 + (k % 10) * 42, 90 + Math.floor(k / 10) * 50, 15, 20, C.jaune, 0.35, 3)).join("") +
    r(150, 260, 180, 70, C.pale, 0.1, 4, 8) + [0, 1, 2].map((i) => o(190 + i * 50, 280, 12, C.pale, 0, 2) + o(190 + i * 50, 312, 12, C.pale, 0, 2)).join("") +
    t(240, 380, `Combien de boîtes de 6${NB}?`, C.rose, 28)
);

const bonbons = svg(
  "17 bonbons à partager entre 5 enfants",
  Array.from({ length: 17 }, (_, k) => o(60 + (k % 9) * 45, 100 + Math.floor(k / 9) * 55, 16, [C.rose, C.jaune, C.bleu][k % 3], 0.45, 3)).join("") +
    [0, 1, 2, 3, 4].map((i) => t(80 + i * 80, 280, "🧒", C.craie, 46)).join("") +
    t(240, 375, "17 bonbons, 5 enfants", C.rose, 28)
);

const equipes = svg(
  "21 enfants en équipes de 3",
  Array.from({ length: 21 }, (_, k) => o(50 + (k % 7) * 63, 100 + Math.floor(k / 7) * 70, 20, C.bleu, 0.35, 3)).join("") +
    t(240, 330, "équipes de 3", C.craie, 28) + t(240, 385, `Combien d'équipes${NB}?`, C.rose, 28)
);

const pedalos = svg(
  "22 enfants ; 4 places dans chaque pédalo",
  [0, 1].map((i) => `<path d="M${70 + i * 200} 200 Q${150 + i * 200} 250 ${230 + i * 200} 200 Z" fill="${C.jaune}" fill-opacity="0.35" stroke="${C.jaune}" stroke-width="4"/>` +
    [0, 1, 2, 3].map((k) => o(100 + i * 200 + k * 34, 185, 12, C.craie, 0.2, 2)).join("")).join("") +
    t(240, 110, "22 enfants", C.craie, 32) + t(240, 300, "4 places par pédalo", C.craie, 26) +
    t(240, 375, `Combien de pédalos${NB}?`, C.rose, 28)
);

const mystere = svg(
  "Un sac de billes : partagées entre 2, il en reste 1 ; partagées entre 5, il en reste 0",
  `<path d="M180 120 Q240 80 300 120 L330 260 Q240 300 150 260 Z" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="4"/>` + t(240, 215, "?", C.rose, 70) +
    t(240, 330, "entre 2 : il en reste 1", C.craie, 24) + t(240, 365, "entre 5 : il en reste 0", C.craie, 24) + t(240, 400, "entre 10 et 20 billes", C.pale, 22)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "division",
  titre: "Énigmes sur les partages et groupements",
  description: "Les 24 cartes à partager, les boîtes de 6 œufs, les bonbons et ce qui reste, les équipes de 3, le piège des pédalos, le défi des billes mystère.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu de cartes",
      titre: "Le partage des cartes",
      question: `<b>24 cartes</b> pour <b>4 enfants</b>.<br>Chacun a le même nombre.<br><br>Combien de cartes pour chacun ?`,
      reponse: `On cherche dans la table de 4 : 4 × 6 = 24.<br>Chacun a <span class="big">6 cartes</span>.`,
      consigne: "Combien de cartes pour chaque enfant ?",
      verification: { type: "courte", attendus: ["6"], unite: "cartes" },
      dessin: cartes,
    },
    {
      tag: "Énigme 2 · À la ferme",
      titre: "Les boîtes d'œufs",
      question: `La poule a pondu. Il y a <b>30 œufs</b>.<br>Une boîte contient <b>6 œufs</b>.<br><br>Combien de boîtes faut-il ?`,
      reponse: `On fait des paquets de 6 : 6, 12, 18, 24, 30.<br>5 paquets : 5 × 6 = 30. <span class="big">5 boîtes</span>.`,
      consigne: "Combien de boîtes de 6 pour 30 œufs ?",
      verification: { type: "courte", attendus: ["5"], unite: "boîtes" },
      dessin: oeufs,
    },
    {
      tag: "Énigme 3 · Le goûter",
      titre: "Les bonbons et le reste",
      question: `<b>17 bonbons</b> pour <b>5 enfants</b>.<br>Chacun a le même nombre.<br><br>Combien chacun ? Combien en reste-t-il ?`,
      reponse: `5 × 3 = 15 et 5 × 4 = 20 (trop).<br>Chacun a 3 bonbons. 17 − 15 = 2.<br><span class="big">3 chacun, il en reste 2</span>.`,
      consigne: "Combien de bonbons chacun, et combien en reste-t-il ?",
      verification: { type: "qcm", choix: ["4 chacun, il en reste 0", "3 chacun, il en reste 1", "3 chacun, il en reste 2"], bonne: 2 },
      dessin: bonbons,
    },
    {
      tag: "Énigme 4 · Le sport",
      titre: "Les équipes de 3",
      question: `<b>21 enfants</b> font du sport.<br>On fait des équipes de <b>3</b>.<br><br>Combien d'équipes ?`,
      reponse: `Dans la table de 3 : 3 × 7 = 21.<br><span class="big">7 équipes</span>.`,
      consigne: "Combien d'équipes de 3 avec 21 enfants ?",
      verification: { type: "qcm", choix: ["7", "6", "18"], bonne: 0 },
      dessin: equipes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les pédalos",
      sorte: "piege",
      question: `<b>22 enfants</b> vont faire du pédalo.<br>Un pédalo a <b>4 places</b>.<br><br>Combien de pédalos pour que <b>tout le monde</b> monte ?`,
      reponse: `4 × 5 = 20 : 5 pédalos pleins.<br>Le piège : il reste 2 enfants sur le quai !<br>Il faut un pédalo de plus : <span class="big">6 pédalos</span>.`,
      consigne: "Combien de pédalos faut-il pour 22 enfants ?",
      verification: { type: "qcm", choix: ["5", "6", "4"], bonne: 1 },
      dessin: pedalos,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les billes mystère",
      sorte: "defi",
      question: `J'ai entre <b>10 et 20</b> billes.<br>Partagées entre 2, il en reste <b>1</b>.<br>Partagées entre 5, il n'en reste <b>aucune</b>.<br><br>Combien de billes ?`,
      reponse: `Entre 5 sans reste : 10, 15 ou 20.<br>Entre 2, il en reste 1 : le nombre est impair.<br>Seul 15 est impair : <span class="big">15 billes</span>.`,
      consigne: "Combien ai-je de billes ?",
      verification: { type: "courte", attendus: ["15"], unite: "billes" },
      dessin: mystere,
    },
  ],
};

export default problemes;
