// Énigmes à projeter — 3e, notion pythagore_theoreme (la diagonale de la
// télé, la réciproque 20-21-29, la diagonale du terrain de foot, le
// parapluie dans la valise, piège de l'hypoténuse, défi de la spirale de
// Théodore). 21/11/2026. ⛔ Ne reprend pas la 4e (corde à 13 nœuds,
// raccourci, chat dans l'arbre, puzzle des carrés, 6-8-11, diagonale du carré).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { type P, seg, poly, pt, angleDroit, milieu } from "../dessins-3e";

// La télé 80 × 60 cm : 1 cm = 4 px.
const tele = svg(
  "Un écran de télévision de 80 cm sur 60 cm et sa diagonale",
  r(80, 70, 320, 240, C.craie, 0.08, 6, 6) + l(80, 310, 400, 70, C.rose, 4, "12 8") + l(200, 310, 180, 350, C.craie, 4) + l(280, 310, 300, 350, C.craie, 4) +
    t(240, 55, "80 cm", C.craie, 24) + t(70, 196, "60 cm", C.craie, 24, "end").replace('x="70"', 'x="74"') + t(270, 180, "?", C.rose, 40) + t(240, 395, "au bon rapport", C.pale, 16)
);

// Triangle 20-21-29 : 1 cm = 10 px, angle droit non marqué (c'est la question).
const reciproque = () => {
  const A: P = [100, 330], B: P = [310, 330], Cc: P = [100, 130];
  return svg("Un triangle de côtés 20 cm, 21 cm et 29 cm",
    poly([A, B, Cc], C.craie, 4, 0) + t(205, 365, "21 cm", C.craie, 24) + t(88, 236, "20 cm", C.craie, 24, "end") + t(230, 215, "29 cm", C.craie, 24, "start") +
      t(125, 315, "?", C.rose, 34) + t(380, 120, `rectangle${NB}?`, C.rose, 24));
};

// Terrain de foot 105 × 68 m : 1 m = 3,6 px.
const foot = svg(
  "Un terrain de football de 105 m sur 68 m et sa diagonale",
  r(51, 80, 378, 245, C.bleu, 0.12, 4) + l(240, 80, 240, 325, C.craie, 2) + `<circle cx="240" cy="202.5" r="33" fill="none" stroke="${C.craie}" stroke-width="2"/>` +
    r(51, 152, 59, 101, C.craie, 0, 2) + r(370, 152, 59, 101, C.craie, 0, 2) + l(51, 325, 429, 80, C.rose, 4, "12 8") +
    t(240, 62, "105 m", C.craie, 24) + t(240, 360, `diagonale${NB}?`, C.rose, 26) + t(240, 400, "au bon rapport", C.pale, 16)
);

// La valise 60 × 40 × 25 en perspective cavalière (pas à l'échelle).
const valise = svg(
  "Une valise en forme de pavé de 60 cm sur 40 cm sur 25 cm et un parapluie de 75 cm",
  p("M70 200 L330 200 L330 320 L70 320 Z", C.jaune, 4, 0.15) + p("M70 200 L150 130 L410 130 L330 200 M410 130 L410 250 L330 320", C.jaune, 4) +
    l(70, 320, 410, 130, C.rose, 3, "10 7") + l(70, 320, 150, 250, C.pale, 2, "6 6") + l(150, 250, 410, 250, C.pale, 2, "6 6") + l(150, 250, 150, 130, C.pale, 2, "6 6") +
    t(200, 350, "60 cm", C.craie, 22) + t(390, 300, "40 cm", C.craie, 22, "start").replace('x="390"', 'x="378"') + t(55, 265, "25", C.craie, 22, "end") +
    l(110, 60, 390, 60, C.bleu, 6) + p("M110 60 q-12 0 -12 14", C.bleu, 5) + t(250, 45, "parapluie : 75 cm", C.bleu, 22).replace(" :", `${NB}:`) + t(240, 405, "pas à l'échelle", C.pale, 16)
);

// Triangle rectangle en A : AB = 5, BC = 13, AC = 12 ; 1 cm = 24 px.
const piege = () => {
  const A: P = [90, 330], B: P = [90, 210], Cc: P = [378, 330];
  const m = milieu(B, Cc, 14, -14);
  return svg("Le triangle ABC rectangle en A, avec AB = 5 cm et BC = 13 cm",
    poly([A, B, Cc], C.craie, 4, 0) + angleDroit(A, B, Cc) + pt(A, "A", -18, 22) + pt(B, "B", -18, -6) + pt(Cc, "C", 18, 22) +
      t(76, 278, "5", C.craie, 26, "end") + t(m[0], m[1], "13", C.craie, 26) + t(234, 365, `AC${NB}?`, C.rose, 26) +
      t(240, 90, "Léo : AC² = 13² + 5²", C.bleu, 24).replace(" :", `${NB}:`) + t(240, 405, "au bon rapport", C.pale, 16));
};

// La spirale de Théodore : 15 triangles, côté 1 = 42 px.
const spirale = () => {
  const O: P = [240, 210], u = 42;
  let s = "", a = 0, x: P = [O[0] + u, O[1]];
  let sum = "";
  for (let k = 1; k <= 15; k++) {
    const rlen = Math.sqrt(k) * u;
    const d = Math.atan(1 / Math.sqrt(k));
    const pa: P = [Math.round((O[0] + rlen * Math.cos(-a)) * 10) / 10, Math.round((O[1] + rlen * Math.sin(-a)) * 10) / 10];
    a += d;
    const pb: P = [Math.round((O[0] + Math.sqrt(k + 1) * u * Math.cos(-a)) * 10) / 10, Math.round((O[1] + Math.sqrt(k + 1) * u * Math.sin(-a)) * 10) / 10];
    s += poly([O, pa, pb], k === 15 ? C.rose : C.bleu, 2, k === 15 ? 0.35 : 0.08) + seg(pa, pb, C.craie, 3);
    x = pb;
  }
  sum = seg(O, x, C.rose, 4);
  return svg("La spirale de Théodore : des triangles rectangles collés, avec un côté de 1 à chaque fois", s + sum + t(240, 405, "chaque côté extérieur mesure 1", C.pale, 16));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "pythagore_theoreme",
  titre: "Énigmes de Pythagore",
  description: "La diagonale de la télé, le triangle 20-21-29, la diagonale du terrain de foot, le parapluie dans la valise, le piège de l'hypoténuse, le défi de la spirale de Théodore : théorème de Pythagore, réciproque, et Pythagore dans l'espace.",
  problemes: [
    {
      tag: "Énigme 1 · La télé",
      titre: "Les pouces de l'écran",
      question: `Un écran de télé mesure <b>80 cm</b> de large et <b>60 cm</b> de haut.<br><br>Combien mesure sa <b>diagonale</b> ?`,
      reponse: `La diagonale est l'hypoténuse d'un triangle rectangle : d² = 80² + 60² = 6 400 + 3 600 = 10 000.<br>d = √10 000 = <span class="big">100 cm</span>. En magasin, on dirait « 39 pouces » (1 pouce ≈ 2,54 cm).`,
      consigne: "Combien mesure la diagonale de l'écran ?",
      verification: {"type":"courte","attendus":["100"],"unite":"cm"},
      dessin: tele,
    },
    {
      tag: "Énigme 2 · La réciproque",
      titre: "Rectangle ou pas ?",
      question: `Un triangle a pour côtés <b>20 cm, 21 cm et 29 cm</b>.<br><br>Est-il <b>rectangle</b> ?`,
      reponse: `Plus grand côté : 29. D'une part 29² = 841. D'autre part 20² + 21² = 400 + 441 = 841.<br>Les deux sont égaux : d'après la réciproque de Pythagore, <span class="big">il est rectangle</span>, l'angle droit face au côté de 29 cm.`,
      consigne: "Le triangle 20 cm, 21 cm, 29 cm est-il rectangle ?",
      verification: {"type":"qcm","choix":["Oui, il est rectangle","Non, il n'est pas rectangle","On ne peut pas savoir"],"bonne":0},
      dessin: reciproque(),
    },
    {
      tag: "Énigme 3 · Le terrain de foot",
      titre: "Une course en diagonale",
      question: `Un terrain de football mesure <b>105 m</b> sur <b>68 m</b>. Un joueur court d'un coin au coin opposé, en ligne droite.<br><br><b>Quelle distance</b> parcourt-il, arrondie au mètre ?`,
      reponse: `d² = 105² + 68² = 11 025 + 4 624 = 15 649.<br>d = √15 649 ≈ <span class="big">125 m</span>.`,
      consigne: "Quelle distance parcourt-il, arrondie au mètre ?",
      verification: {"type":"courte","attendus":["125"],"unite":"m"},
      dessin: foot,
    },
    {
      tag: "Énigme 4 · La valise",
      titre: "Le parapluie trop long ?",
      question: `Une valise a la forme d'un pavé de <b>60 cm × 40 cm × 25 cm</b>. On veut y ranger un parapluie de <b>75 cm</b>, qui ne se plie pas.<br><br>Peut-il <b>tenir</b> dans la valise ?`,
      reponse: `À plat, la diagonale du fond : √(60² + 40²) = √5 200 ≈ 72,1 cm. Trop court !<br>En biais, d'un coin du fond au coin opposé du haut : √(5 200 + 25²) = √5 825 ≈ 76,3 cm.<br><span class="big">Oui, en diagonale de la valise</span>, mais pas à plat.`,
      consigne: "Le parapluie de 75 cm tient-il dans la valise ?",
      verification: {"type":"qcm","choix":["Oui, à plat au fond","Non, jamais","Oui, mais seulement en biais dans la valise"],"bonne":2},
      dessin: valise,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Où est l'hypoténuse ?",
      sorte: "piege",
      question: `ABC est rectangle en A, avec <b>AB = 5 cm</b> et <b>BC = 13 cm</b>.<br>Léo écrit : AC² = 13² + 5² = 194.<br><br><b>Combien mesure</b> vraiment AC ?`,
      reponse: `L'hypoténuse est le côté <b>face à l'angle droit</b> : c'est BC, le plus long.<br>BC² = AB² + AC², donc AC² = 169 − 25 = 144 et AC = <span class="big">12 cm</span>.<br>Le résultat de Léo, √194 ≈ 13,9 cm, serait plus long que l'hypoténuse : impossible !`,
      consigne: "Combien mesure AC ?",
      verification: {"type":"courte","attendus":["12"],"unite":"cm"},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La spirale de Théodore",
      sorte: "defi",
      question: `On colle des triangles rectangles. Le premier a deux côtés de 1 autour de l'angle droit. Chaque nouveau triangle a pour côtés de l'angle droit l'hypoténuse du précédent et un côté de 1.<br><br><b>Combien de triangles</b> faut-il pour qu'une hypoténuse mesure exactement 4 ?`,
      reponse: `Hypoténuses : √2, puis √(2 + 1) = √3, puis √4 = 2, puis √5… Le n-ième triangle a une hypoténuse de √(n + 1).<br>√(n + 1) = 4 donne n + 1 = 16, donc <span class="big">15 triangles</span>. C'est le triangle rose du dessin.`,
      consigne: "Combien de triangles pour une hypoténuse de 4 ?",
      verification: {"type":"courte","attendus":["15"],"unite":"triangles"},
      dessin: spirale(),
    },
  ],
};

export default problemes;
