// Énigmes à projeter — CE1, notion additions et soustractions (l'album
// d'autocollants, les poules qui sortent, les quilles tombées, le collier de 50
// perles, le piège des « 8 de moins », le défi de la pyramide de briques).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, fleche } from "../dessins-ecole";

const album = svg(
  "Un album avec 25 autocollants ; une pochette de 12 autocollants en plus",
  r(50, 90, 170, 200, C.bleu, 0.15, 4, 10) + t(135, 175, "⭐", C.craie, 50) + t(135, 245, "25", C.craie, 44) +
    t(250, 200, "+", C.craie, 50) +
    r(290, 130, 140, 120, C.jaune, 0.2, 4, 10) + t(360, 185, "⭐⭐", C.craie, 30) + t(360, 230, "12", C.craie, 36) +
    t(240, 360, `Combien d'autocollants${NB}?`, C.rose, 30)
);

const poules = svg(
  "Un poulailler avec 48 poules ; 15 poules sortent",
  p("M50 220 L150 130 L250 220", C.rose, 4, 0.2) + r(70, 220, 160, 110, C.craie, 0, 4) + t(150, 285, "48 🐔", C.craie, 34) +
    fleche(250, 280, 340, 280, C.jaune, 4) + t(400, 270, "🐔", C.craie, 40) + t(400, 320, "15 sortent", C.jaune, 22) +
    t(240, 385, `Combien restent dedans${NB}?`, C.rose, 28)
);

const quille = (x: number, n: string, tombee: boolean) =>
  tombee
    ? `<g transform="rotate(90 ${x} 200)">` + p(`M${x - 18} 250 Q${x - 22} 190 ${x - 10} 160 Q${x} 140 ${x + 10} 160 Q${x + 22} 190 ${x + 18} 250 Z`, C.rose, 3, 0.25) + `</g>` + t(x, 210, n, C.craie, 24)
    : p(`M${x - 18} 250 Q${x - 22} 190 ${x - 10} 160 Q${x} 140 ${x + 10} 160 Q${x + 22} 190 ${x + 18} 250 Z`, C.pale, 3, 0.15) + t(x, 215, n, C.pale, 22);
const quilles = svg(
  "Quatre quilles : 20, 30 et 5 sont tombées ; 10 est debout",
  quille(65, "20", true) + quille(180, "10", false) + quille(300, "30", true) + quille(415, "5", true) +
    t(240, 320, "Les quilles roses sont tombées.", C.pale, 22) + t(240, 380, `Combien de points${NB}?`, C.rose, 30)
);

const collier = svg(
  "Un collier qui doit avoir 50 perles ; il y en a déjà 32",
  t(240, 90, "50 perles", C.craie, 26) + l(50, 105, 430, 105, C.craie, 3) + l(50, 97, 50, 113, C.craie, 3) + l(430, 97, 430, 113, C.craie, 3) +
    r(50, 130, 243, 60, C.bleu, 0.35, 3) + r(293, 130, 137, 60, C.pale, 0, 3) + t(171, 170, "32 déjà", C.craie, 26) + t(361, 170, "?", C.rose, 32) +
    t(240, 280, "Il faut 50 perles en tout.", C.craie, 26) + t(240, 360, `Combien en manque-t-il${NB}?`, C.rose, 28)
);

const images = svg(
  "Tom a 30 images ; Léa a une barre plus longue de 8 ; Léa : ?",
  t(60, 135, "Tom", C.craie, 24, "start") + r(130, 105, 240, 44, C.bleu, 0.3, 3) + t(250, 136, "30", C.craie, 26) +
    t(60, 225, "Léa", C.craie, 24, "start") + r(130, 195, 240, 44, C.jaune, 0.3, 3) + r(370, 195, 64, 44, C.rose, 0.3, 3) + t(402, 226, "8", C.craie, 24) + t(250, 226, "?", C.craie, 26) +
    t(240, 310, "Tom a 8 images de moins que Léa.", C.pale, 22) + t(240, 375, `Combien pour Léa${NB}?`, C.rose, 30)
);

const brique = (x: number, y: number, s: string, c: string) => r(x, y, 110, 60, c, 0.2, 3, 4) + t(x + 55, y + 41, s, s === "?" ? C.rose : C.craie, 30);
const pyramide = svg(
  "Une pyramide de briques : en bas 10, 20, 15 ; au-dessus deux briques vides ; en haut ?",
  brique(185, 70, "?", C.rose) + brique(130, 140, "", C.jaune) + brique(240, 140, "", C.jaune) +
    brique(75, 210, "10", C.bleu) + brique(185, 210, "20", C.bleu) + brique(295, 210, "15", C.bleu) +
    t(240, 330, "Chaque brique = les deux du dessous.", C.pale, 22) + t(240, 385, `La brique du haut${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "addition_soustraction",
  titre: "Énigmes sur les additions et soustractions",
  description: "L'album d'autocollants, les poules qui sortent du poulailler, les quilles tombées, le collier de 50 perles, le piège des « 8 de moins », le défi de la pyramide de briques.",
  problemes: [
    {
      tag: "Énigme 1 · L'album",
      titre: "Les autocollants",
      question: `Inès a <b>25</b> autocollants.<br>On lui en donne <b>12</b>.<br><br>Combien en a-t-elle ?`,
      reponse: `25 + 12 = <span class="big">37</span>.<br>20 + 10 = 30, et 5 + 2 = 7.`,
      consigne: "Combien d'autocollants a Inès ?",
      verification: { type: "courte", attendus: ["37"], unite: "autocollants" },
      dessin: album,
    },
    {
      tag: "Énigme 2 · La ferme",
      titre: "Les poules",
      question: `Il y a <b>48</b> poules.<br><b>15</b> poules sortent.<br><br>Combien restent dedans ?`,
      reponse: `48 − 15 = <span class="big">33</span>.<br>40 − 10 = 30, et 8 − 5 = 3.`,
      consigne: "Combien de poules restent dans le poulailler ?",
      verification: { type: "courte", attendus: ["33"], unite: "poules" },
      dessin: poules,
    },
    {
      tag: "Énigme 3 · Le bowling",
      titre: "Les quilles",
      question: `Les quilles roses sont tombées.<br>On compte les points écrits dessus.<br><br>Combien de points ?`,
      reponse: `Tombées : 20, 30 et 5.<br>La 10 est debout : elle ne compte pas.<br>20 + 30 + 5 = <span class="big">55 points</span>.`,
      consigne: "Combien de points avec les quilles tombées ?",
      verification: { type: "courte", attendus: ["55"], unite: "points" },
      dessin: quilles,
    },
    {
      tag: "Énigme 4 · Le collier",
      titre: "Les perles",
      question: `Le collier aura <b>50</b> perles.<br>Il y en a déjà <b>32</b>.<br><br>Combien en manque-t-il ?`,
      reponse: `De 32 à 40 : 8.<br>De 40 à 50 : 10.<br>8 + 10 = <span class="big">18 perles</span>.`,
      consigne: "Combien de perles manque-t-il ?",
      verification: { type: "courte", attendus: ["18"], unite: "perles" },
      dessin: collier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les images",
      sorte: "piege",
      question: `Tom a <b>30</b> images.<br>Il a <b>8 images de moins</b> que Léa.<br><br>Combien d'images a Léa ?`,
      reponse: `Le piège : le mot « moins » fait penser à −.<br>Mais c'est Tom qui en a moins. Léa en a <b>plus</b>.<br>30 + 8 = <span class="big">38 images</span>.`,
      consigne: "Combien d'images a Léa ?",
      verification: { type: "qcm", choix: ["38", "22", "30"], bonne: 0 },
      dessin: images,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La pyramide de briques",
      sorte: "defi",
      question: `Chaque brique = les <b>deux briques du dessous</b> ajoutées.<br>En bas : <b>10, 20, 15</b>.<br><br>Quel nombre en haut ?`,
      reponse: `Au milieu : 10 + 20 = 30 et 20 + 15 = 35.<br>En haut : 30 + 35 = <span class="big">65</span>.`,
      consigne: "Quel nombre va dans la brique du haut ?",
      verification: { type: "courte", attendus: ["65"] },
      dessin: pyramide,
    },
  ],
};

export default problemes;
