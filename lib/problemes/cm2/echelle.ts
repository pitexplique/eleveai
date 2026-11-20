// Énigmes à projeter — CM2, notion echelle (le plan de la maison, la carte des
// villages, le terrain de foot sur le plan, la maquette du bateau, le piège
// des millimètres, le défi de l'aire réelle). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, grille } from "../dessins-ecole";

// Le plan : 1 cm du plan = 40 px. Cuisine 3 cm = 120 px.
const plan = svg(
  "Le plan d'une maison : la cuisine mesure 3 cm sur le plan, 1 cm représente 2 m",
  grille(60, 80, 9, 6, 40, C.pale, 1) + r(60, 80, 120, 80, C.jaune, 0.3, 4) + t(120, 128, "cuisine", C.craie, 20) +
    r(180, 80, 200, 160, C.bleu, 0.15, 4) + t(280, 168, "salon", C.craie, 20) +
    l(60, 60, 180, 60, C.rose, 3) + t(120, 50, "3 cm", C.rose, 20) +
    l(60, 340, 100, 340, C.craie, 4) + t(110, 347, "= 2 m", C.craie, 20, "start") + t(60, 380, "1 cm du plan", C.pale, 16, "start")
);

const carte = svg(
  "Une carte : deux villages à 4 cm l'un de l'autre, 1 cm représente 5 km",
  r(30, 40, 420, 260, C.jaune, 0.08, 3, 8) + o(100, 170, 12, C.rose, 0.6, 3) + o(260, 170, 12, C.rose, 0.6, 3) +
    t(100, 145, "Arbois", C.craie, 20) + t(260, 145, "Bellac", C.craie, 20) + l(100, 200, 260, 200, C.rose, 3, "8 6") + t(180, 230, "4 cm", C.rose, 22) +
    l(330, 260, 370, 260, C.craie, 4) + t(350, 285, "1 cm = 5 km", C.craie, 18) + t(240, 360, `distance réelle${NB}?`, C.rose, 26)
);

const foot = svg(
  "Un terrain de foot de 100 m de long, à dessiner sur un plan où 1 cm représente 10 m",
  r(60, 110, 360, 200, C.bleu, 0.15, 4) + l(240, 110, 240, 310, C.craie, 3) + o(240, 210, 40, C.craie, 0, 3) +
    r(60, 170, 40, 80, C.craie, 0, 3) + r(380, 170, 40, 80, C.craie, 0, 3) + t(240, 90, "100 m", C.craie, 26) +
    t(240, 360, "1 cm du plan = 10 m", C.pale, 22) + t(240, 400, `sur le plan${NB}: ? cm`, C.rose, 26)
);

const bateau = svg(
  "Un vrai bateau de 10 m et sa maquette : 1 cm de maquette pour 50 cm de bateau",
  `<path d="M40 200 L440 200 L400 260 L80 260 Z" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>` +
    l(240, 200, 240, 70, C.craie, 4) + t(240, 290, "le vrai bateau : 10 m", C.craie, 24) +
    `<path d="M200 350 L280 350 L272 362 L208 362 Z" fill="${C.jaune}" fill-opacity=".4" stroke="${C.jaune}" stroke-width="3"/>` + l(240, 350, 240, 325, C.craie, 2) +
    t(240, 395, "maquette : ? cm", C.rose, 24) + t(420, 360, "1 cm ↔ 50 cm", C.pale, 16, "end")
);

// Le segment de 35 mm (1 mm = 8 px = 280 px).
const regle = () => {
  let s = "";
  for (let k = 0; k <= 40; k++) s += l(60 + k * 8, 200, 60 + k * 8, k % 10 ? (k % 5 ? 212 : 218) : 226, C.craie, k % 10 ? 1.5 : 3) + (k % 10 ? "" : t(60 + k * 8, 250, `${k / 10}`, C.craie, 20));
  return svg(
    "Un chemin de 35 mm sur un plan où 1 cm représente 2 m",
    r(50, 195, 340, 70, C.jaune, 0.15, 2) + s + l(60, 160, 340, 160, C.rose, 5) + t(200, 145, "35 mm", C.rose, 24) + t(400, 250, "cm", C.pale, 18, "start") +
      t(240, 330, "1 cm du plan = 2 m", C.pale, 22) + t(240, 380, `«${NB}35 × 2 = 70 m${NB}» dit Lou`, C.craie, 24)
  );
};

const piece = svg(
  "Une pièce rectangulaire de 4 cm sur 2 cm sur le plan, 1 cm représente 3 m",
  grille(80, 90, 8, 4, 40, C.pale, 1) + r(80, 90, 160, 80, C.rose, 0.25, 4) + t(160, 80, "4 cm", C.rose, 20) + t(70, 136, "2 cm", C.rose, 20, "end") +
    t(240, 290, "1 cm du plan = 3 m", C.craie, 24) + t(240, 350, `aire réelle${NB}?`, C.rose, 28) + t(240, 395, "un carreau = 1 cm du plan", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "echelle",
  titre: "Énigmes sur les échelles",
  description: "Le plan de la cuisine, la carte des deux villages, le terrain de foot sur le plan, la maquette du bateau, le piège des millimètres de Lou, le défi de l'aire réelle.",
  problemes: [
    {
      tag: "Énigme 1 · Le plan de la maison",
      titre: "La cuisine",
      question: `Sur le plan, <b>1 cm</b> représente <b>2 m</b> en vrai.<br>La cuisine mesure <b>3 cm</b> sur le plan.<br><br>Quelle est sa <b>vraie longueur</b> ?`,
      reponse: `Chaque centimètre du plan vaut 2 m.<br>3 × 2 = <span class="big">6 m</span>.`,
      consigne: "Quelle est la vraie longueur de la cuisine ?",
      verification: { type: "courte", attendus: ["6"], unite: "m" },
      dessin: plan,
    },
    {
      tag: "Énigme 2 · La carte",
      titre: "Les deux villages",
      question: `Sur la carte, <b>1 cm</b> représente <b>5 km</b>.<br>Les deux villages sont à <b>4 cm</b> l'un de l'autre.<br><br>Quelle est la <b>distance réelle</b> ?`,
      reponse: `4 × 5 = <span class="big">20 km</span>.`,
      consigne: "Quelle est la distance réelle entre les villages ?",
      verification: { type: "courte", attendus: ["20"], unite: "km" },
      dessin: carte,
    },
    {
      tag: "Énigme 3 · Le terrain de foot",
      titre: "Dessiner le terrain",
      question: `Un terrain de foot mesure <b>100 m</b> de long.<br>Sur le plan, <b>1 cm</b> représente <b>10 m</b>.<br><br>Combien de <b>cm</b> sur le plan ?`,
      reponse: `On cherche combien de fois 10 m dans 100 m.<br>100 ÷ 10 = <span class="big">10 cm</span>.`,
      consigne: "Combien de centimètres sur le plan ?",
      verification: { type: "courte", attendus: ["10"], unite: "cm" },
      dessin: foot,
    },
    {
      tag: "Énigme 4 · La maquette",
      titre: "Le petit bateau",
      question: `Un vrai bateau mesure <b>10 m</b>.<br>Sur la maquette, <b>1 cm</b> représente <b>50 cm</b>.<br><br>Combien mesure la <b>maquette</b> ?`,
      reponse: `D'abord, la même unité : 10 m = 1 000 cm.<br>1 000 ÷ 50 = <span class="big">20 cm</span>.`,
      consigne: "Combien mesure la maquette ?",
      verification: { type: "qcm", choix: ["2 cm", "20 cm", "50 cm"], bonne: 1 },
      dessin: bateau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les millimètres de Lou",
      sorte: "piege",
      question: `Sur le plan, <b>1 cm</b> représente <b>2 m</b>.<br>Lou mesure un chemin : <b>35 mm</b>.<br>Elle dit : « 35 × 2 = 70 m. »<br><br><b>Quelle est la vraie longueur</b> ?`,
      reponse: `Attention à l'unité ! L'échelle parle de centimètres.<br>35 mm = 3,5 cm. Puis 3,5 × 2 = <span class="big">7 m</span>.`,
      consigne: "Quelle est la vraie longueur du chemin ?",
      verification: { type: "qcm", choix: ["7 m", "70 m", "3,5 m"], bonne: 0 },
      dessin: regle(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'aire de la pièce",
      sorte: "defi",
      question: `Sur le plan, <b>1 cm</b> représente <b>3 m</b>.<br>Une pièce rectangulaire mesure <b>4 cm</b> sur <b>2 cm</b>.<br><br>Quelle est son <b>aire réelle</b> ?`,
      reponse: `Vraies longueurs : 4 × 3 = 12 m et 2 × 3 = 6 m.<br>Aire : 12 × 6 = <span class="big">72 m²</span>.<br>(Et pas 8 × 3 = 24 !)`,
      consigne: "Quelle est l'aire réelle de la pièce, en m² ?",
      verification: { type: "courte", attendus: ["72"], unite: "m²" },
      dessin: piece,
    },
  ],
};

export default problemes;
