// Énigmes à projeter — CE1, notion longueurs (le crayon sur la règle, la
// longueur d'un lit, les deux tables bout à bout, le ruban de 1 m coupé, le
// piège du saut de 1 m contre 90 cm, le défi des trois crayons). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

/** Une règle graduée en cm, de x0, pas px par cm, n cm. */
const regle = (x0: number, y: number, pas: number, n: number) => {
  let s = r(x0 - 12, y, pas * n + 24, 60, C.jaune, 0.2, 3, 4);
  for (let k = 0; k <= n; k++) s += l(x0 + k * pas, y, x0 + k * pas, y + 22, C.craie, 2) + t(x0 + k * pas, y + 48, k, C.craie, 18);
  return s;
};
const crayon = (x1: number, x2: number, y: number, c: string = C.bleu) =>
  r(x1, y - 14, x2 - x1 - 30, 28, c, 0.35, 3, 3) + p(`M${x2 - 30} ${y - 14} L${x2} ${y} L${x2 - 30} ${y + 14} Z`, c, 3, 0.15);

const mesure = svg(
  "Un crayon posé sur une règle, de 0 à 8 cm",
  crayon(40, 40 + 8 * 40, 150) + regle(40, 190, 40, 10) + l(40, 120, 40, 180, C.pale, 2, "6 5") + l(360, 120, 360, 180, C.pale, 2, "6 5") +
    t(240, 340, `Le crayon mesure${NB}?`, C.rose, 30)
);

const lit = svg(
  "Un lit d'enfant",
  r(80, 170, 320, 70, C.bleu, 0.25, 4, 8) + r(80, 130, 30, 130, C.craie, 0.3, 3, 4) + r(370, 150, 30, 110, C.craie, 0.3, 3, 4) + r(115, 150, 80, 25, C.craie, 0, 3, 10) +
    l(80, 290, 400, 290, C.rose, 3) + t(240, 325, "environ 2…", C.rose, 30) + t(240, 385, `cm${NB}? m${NB}? km${NB}?`, C.pale, 26)
);

const tables = svg(
  "Deux tables bout à bout : 80 cm et 60 cm",
  r(40, 150, 240, 30, C.jaune, 0.35, 3) + l(55, 180, 55, 260, C.craie, 4) + l(265, 180, 265, 260, C.craie, 4) +
    r(280, 150, 180, 30, C.bleu, 0.35, 3) + l(295, 180, 295, 260, C.craie, 4) + l(445, 180, 445, 260, C.craie, 4) +
    t(160, 135, "80 cm", C.craie, 26) + t(370, 135, "60 cm", C.craie, 26) + t(240, 350, `La grande table mesure${NB}?`, C.rose, 28)
);

const ruban = svg(
  "Un ruban de 1 m ; on coupe 30 cm",
  r(40, 150, 280, 40, C.rose, 0.3, 3) + r(320, 150, 120, 40, C.pale, 0.1, 3) + l(320, 120, 320, 220, C.craie, 3, "8 6") +
    t(380, 240, "✂️ 30 cm", C.craie, 24) + l(40, 110, 440, 110, C.craie, 3) + t(240, 95, "1 m", C.craie, 26) +
    t(180, 240, "?", C.rose, 32) + t(240, 350, `Combien reste-t-il${NB}?`, C.rose, 30)
);

const sauts = svg(
  "Jade saute 1 m ; Hugo saute 90 cm",
  t(80, 150, "Jade", C.bleu, 26) + p("M140 150 Q240 40 340 150", C.bleu, 4) + t(360, 150, "1 m", C.craie, 30, "start") +
    t(80, 270, "Hugo", C.jaune, 26) + p("M140 270 Q230 170 320 270", C.jaune, 4) + t(340, 270, "90 cm", C.craie, 30, "start") +
    t(240, 370, `Qui saute le plus loin${NB}?`, C.rose, 30)
);

const crayons = svg(
  "Trois crayons pareils bout à bout : 30 cm en tout",
  crayon(40, 170, 170, C.bleu) + crayon(175, 305, 170, C.jaune) + crayon(310, 440, 170, C.rose) +
    l(40, 120, 440, 120, C.craie, 3) + t(240, 105, "30 cm", C.craie, 28) + t(240, 320, `Un crayon mesure${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "longueur",
  titre: "Énigmes sur les longueurs",
  description: "Le crayon mesuré à la règle, la longueur d'un lit, les deux tables bout à bout, le ruban de 1 m coupé, le piège du saut de 1 m contre 90 cm, le défi des trois crayons pareils.",
  problemes: [
    {
      tag: "Énigme 1 · La trousse",
      titre: "Le crayon",
      question: `Le crayon est posé sur la règle.<br>Il part de <b>0</b>.<br><br>Combien mesure-t-il ?`,
      reponse: `Il part de 0 et finit sur 8.<br>Il mesure <span class="big">8 cm</span>.`,
      consigne: "Combien mesure le crayon, en cm ?",
      verification: { type: "courte", attendus: ["8"], unite: "cm" },
      dessin: mesure,
    },
    {
      tag: "Énigme 2 · La chambre",
      titre: "Le lit",
      question: `Le lit de Nour mesure environ <b>2…</b><br><br>Quelle est la bonne unité ?`,
      reponse: `2 cm : c'est la taille d'un ongle !<br>2 km : c'est une longue promenade.<br>Le lit mesure environ <span class="big">2 m</span>.`,
      consigne: "Le lit mesure environ 2… ?",
      verification: { type: "qcm", choix: ["2 cm", "2 km", "2 m"], bonne: 2 },
      dessin: lit,
    },
    {
      tag: "Énigme 3 · Le repas de fête",
      titre: "Les tables",
      question: `On met deux tables bout à bout.<br><b>80 cm</b> et <b>60 cm</b>.<br><br>Combien mesure la grande table ?`,
      reponse: `On ajoute les longueurs.<br>80 + 60 = <span class="big">140 cm</span>.`,
      consigne: "Combien mesurent les deux tables, en cm ?",
      verification: { type: "courte", attendus: ["140"], unite: "cm" },
      dessin: tables,
    },
    {
      tag: "Énigme 4 · Le paquet cadeau",
      titre: "Le ruban",
      question: `Le ruban mesure <b>1 m</b>.<br>On coupe <b>30 cm</b>.<br><br>Combien reste-t-il ?`,
      reponse: `1 m = 100 cm.<br>100 − 30 = <span class="big">70 cm</span>.`,
      consigne: "Combien de ruban reste-t-il ?",
      verification: { type: "qcm", choix: ["70 cm", "29 cm", "130 cm"], bonne: 0 },
      dessin: ruban,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le saut en longueur",
      sorte: "piege",
      question: `Jade saute <b>1 m</b>.<br>Hugo saute <b>90 cm</b>.<br><br>Qui saute le plus loin ?`,
      reponse: `Le piège : 90 est plus grand que 1.<br>Mais 1 m = 100 cm.<br>100 cm, c'est plus que 90 cm : <span class="big">Jade</span>.`,
      consigne: "Qui saute le plus loin ?",
      verification: { type: "qcm", choix: ["Hugo", "Jade", "Ils sautent pareil"], bonne: 1 },
      dessin: sauts,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois crayons",
      sorte: "defi",
      question: `<b>3 crayons pareils</b>, bout à bout.<br>Ils mesurent <b>30 cm</b> en tout.<br><br>Combien mesure un crayon ?`,
      reponse: `On cherche le même nombre 3 fois.<br>10 + 10 + 10 = 30.<br>Un crayon : <span class="big">10 cm</span>.`,
      consigne: "Combien mesure un crayon, en cm ?",
      verification: { type: "courte", attendus: ["10"], unite: "cm" },
      dessin: crayons,
    },
  ],
};

export default problemes;
