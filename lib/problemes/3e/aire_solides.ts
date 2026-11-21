// Énigmes à projeter — 3e, notion aire_solides (aires latérales et totales :
// le papier cadeau du cube, l'étiquette de la boîte de conserve, peindre une
// chambre, le cuir du ballon de basket, piège de l'arête doublée, défi du
// patron du chapeau pointu). 21/11/2026. Notion hors programme français
// (masquée en France, gardée pour /pays).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";

const cube = (x: number, y: number, a: number, c: string, op = 0.2) => {
  const d = a * 0.4;
  return p(`M${x} ${y} L${x + a} ${y} L${x + a} ${y + a} L${x} ${y + a} Z`, c, 4, op) +
    p(`M${x} ${y} L${x + d} ${y - d} L${x + a + d} ${y - d} L${x + a} ${y} M${x + a + d} ${y - d} L${x + a + d} ${y + a - d} L${x + a} ${y + a}`, c, 4);
};

// Le cube cadeau de 20 cm, ruban rose.
const cadeau = svg(
  "Une boîte cadeau en forme de cube de 20 cm d'arête",
  cube(130, 170, 170, C.bleu) + l(215, 170, 215, 340, C.rose, 6) + l(130, 255, 300, 255, C.rose, 6) + l(215, 170, 249, 102, C.rose, 6) +
    p("M249 102 q-30 -40 -50 -10 q20 20 50 10 q30 -40 50 -10 q-20 20 -50 10", C.rose, 4) +
    t(215, 372, "20 cm", C.craie, 22) + t(240, 405, `papier${NB}?`, C.rose, 24)
);

// La boîte de conserve : r = 4 cm, h = 11 cm ; 1 cm = 20 px.
const conserve = svg(
  "Une boîte de conserve cylindrique de 4 cm de rayon et 11 cm de haut, entourée d'une étiquette",
  r(160, 90, 160, 220, C.jaune, 0.35, 0) + p("M160 90 L160 310 A80 18 0 0 0 320 310 L320 90", C.craie, 4, 0) + ell(240, 90, 80, 18, C.pale, 0.2, 4) +
    p("M160 310 A80 18 0 0 0 320 310", C.jaune, 0) + l(240, 90, 320, 90, C.craie, 3) + t(328, 97, "4 cm", C.craie, 18, "start") +
    l(385, 90, 385, 310, C.craie, 2) + t(393, 206, "11 cm", C.craie, 22, "start") + t(240, 210, `étiquette${NB}?`, C.rose, 26) +
    t(240, 400, "au bon rapport", C.pale, 16)
);

// La chambre : pavé 4 × 3 × 2,5 m vu de l'intérieur (pas à l'échelle).
const chambre = svg(
  "Une chambre de 4 m sur 3 m et 2,5 m de haut, avec une porte et une fenêtre",
  p("M70 110 L330 110 L330 300 L70 300 Z", C.jaune, 4, 0.15) + p("M330 110 L420 60 L420 250 L330 300", C.jaune, 4, 0.08) +
    r(100, 190, 55, 110, C.craie, 0.15, 3) + r(220, 150, 80, 60, C.bleu, 0.3, 3) + l(260, 150, 260, 210, C.bleu, 2) +
    t(200, 330, "4 m", C.craie, 22) + t(392, 300, "3 m", C.craie, 22, "start").replace('x="392"', 'x="384"') + t(58, 210, "2,5 m", C.craie, 22, "end").replace('x="58"', 'x="62"') +
    t(240, 40, "2 couches · 1 pot = 12 m²", C.rose, 22) + t(240, 380, "porte + fenêtre = 3 m²", C.craie, 20) + t(240, 410, "pas à l'échelle", C.pale, 16)
);

// Le ballon de basket : diamètre 24 cm.
const ballon = svg(
  "Un ballon de basket de 24 cm de diamètre",
  o(240, 200, 140, C.jaune, 0.4, 5) + l(100, 200, 380, 200, C.craie, 3) + l(240, 60, 240, 340, C.craie, 3) +
    p("M140 102 Q200 200 140 298", C.craie, 3) + p("M340 102 Q280 200 340 298", C.craie, 3) +
    t(205, 190, "24 cm", C.craie, 22) + t(240, 395, `cuir${NB}?`, C.rose, 26)
);

// Deux cubes : 10 cm et 20 cm (1 cm = 7 px).
const deuxCubes = svg(
  "Un petit cube de 10 cm d'arête peint avec un pot, et un grand cube de 20 cm d'arête",
  cube(50, 260, 70, C.bleu, 0.25) + cube(230, 190, 140, C.bleu, 0.25) + t(85, 360, "10 cm", C.craie, 20) + t(300, 360, "20 cm", C.craie, 20) +
    t(85, 220, "1 pot", C.craie, 22) + t(330, 120, `? pots`, C.rose, 26) + t(240, 405, "au bon rapport", C.pale, 16)
);

// Le chapeau pointu (r = 9, h = 12, g = 15 cm ; 1 cm = 8 px) et son patron : secteur de 216°.
const chapeau = svg(
  "Un chapeau pointu en forme de cône de 9 cm de rayon et 12 cm de haut, et son patron en secteur de disque",
  p("M38 220 L110 124 L182 220", C.rose, 4, 0.2) + ell(110, 220, 72, 16, C.rose, 0.1, 3) + l(110, 124, 110, 220, C.pale, 2, "6 5") + l(110, 220, 182, 220, C.craie, 2) +
    t(146, 262, "9 cm", C.craie, 18) + t(102, 180, "12", C.craie, 18, "end") +
    p("M330 230 L215.9 267.1 A120 120 0 1 1 444.1 267.1 Z", C.rose, 4, 0.2) + t(330, 210, `?°`, C.rose, 26) + t(280, 236, "15 cm", C.craie, 18) +
    t(240, 330, "patron : on le découpe, on le roule", C.craie, 18).replace(" :", `${NB}:`) + t(240, 400, "au bon rapport", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "aire_solides",
  titre: "Énigmes des aires des solides",
  description: "Le papier cadeau du cube, l'étiquette de la boîte de conserve, peindre une chambre, le cuir du ballon de basket, le piège de l'arête doublée, le défi du patron du chapeau pointu : aires latérales et totales du pavé, du cube, du cylindre, de la boule et du cône.",
  problemes: [
    {
      tag: "Énigme 1 · Le cadeau",
      titre: "Le papier cadeau",
      question: `Une boîte cadeau est un <b>cube</b> de <b>20 cm</b> d'arête.<br><br>Quelle surface de papier faut-il, au minimum, pour la recouvrir entièrement ?`,
      reponse: `Un cube a 6 faces carrées. 6 × 20² = 6 × 400 = <span class="big">2 400 cm²</span>.`,
      consigne: "Quelle surface de papier faut-il au minimum, en cm² ?",
      verification: {"type":"courte","attendus":["2400"],"unite":"cm²"},
      dessin: cadeau,
    },
    {
      tag: "Énigme 2 · La boîte de conserve",
      titre: "L'étiquette",
      question: `Une boîte de conserve est un cylindre de rayon <b>4 cm</b> et de hauteur <b>11 cm</b>. L'étiquette fait tout le tour et toute la hauteur.<br><br><b>Quelle est son aire</b>, au cm² près ?`,
      reponse: `Déroulée, l'étiquette est un rectangle : longueur = périmètre du cercle = 2π × 4 = 8π, largeur = 11 cm.<br>Aire latérale : 2π × 4 × 11 = 88π ≈ <span class="big">276 cm²</span>.`,
      consigne: "Quelle est l'aire de l'étiquette, au cm² près ?",
      verification: {"type":"courte","attendus":["276"],"unite":"cm²"},
      dessin: conserve,
    },
    {
      tag: "Énigme 3 · La chambre",
      titre: "Peindre les murs",
      question: `Une chambre mesure <b>4 m</b> sur <b>3 m</b>, avec <b>2,5 m</b> de hauteur. On peint les quatre murs, sauf la porte et la fenêtre (3 m² en tout), en <b>deux couches</b>. Un pot couvre <b>12 m²</b>.<br><br><b>Combien de pots</b> faut-il acheter ?`,
      reponse: `Murs : (4 + 3) × 2 × 2,5 = 35 m², moins 3 m² = 32 m².<br>Deux couches : 64 m². 64 ÷ 12 ≈ 5,3 : 5 pots ne suffisent pas, il faut <span class="big">6 pots</span>.`,
      consigne: "Combien de pots faut-il acheter ?",
      verification: {"type":"qcm","choix":["6 pots","5 pots","3 pots"],"bonne":0},
      dessin: chambre,
    },
    {
      tag: "Énigme 4 · Le ballon",
      titre: "Le cuir du ballon",
      question: `Un ballon de basket a un diamètre de <b>24 cm</b>. L'aire d'une sphère de rayon r vaut <b>4πr²</b>.<br><br>Quelle surface de cuir recouvre le ballon, au cm² près ?`,
      reponse: `r = 12 cm. Aire = 4 × π × 12² = 576π ≈ <span class="big">1 810 cm²</span>.<br>Soit 4 fois l'aire d'un disque de même rayon.`,
      consigne: "Quelle surface de cuir recouvre le ballon, au cm² près ?",
      verification: {"type":"courte","attendus":["1810"],"unite":"cm²"},
      dessin: ballon,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'arête doublée",
      sorte: "piege",
      question: `Pour peindre toutes les faces d'un cube de <b>10 cm</b> d'arête, il faut <b>un pot</b> de peinture.<br><br>Combien de pots faut-il pour un cube de <b>20 cm</b> d'arête ?`,
      reponse: `Arête × 2, donc chaque face a une aire × 2² = × 4.<br>Il faut <span class="big">4 pots</span> (et pas 2, ni 8 : le 8, c'est pour le volume).`,
      consigne: "Combien de pots faut-il pour le cube de 20 cm ?",
      verification: {"type":"qcm","choix":["2 pots","4 pots","8 pots"],"bonne":1},
      dessin: deuxCubes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le patron du chapeau pointu",
      sorte: "defi",
      question: `On veut fabriquer un chapeau pointu en forme de <b>cône</b> : rayon <b>9 cm</b>, hauteur <b>12 cm</b>. On le découpe dans un <b>secteur de disque</b>, puis on le roule.<br><br><b>Quel est l'angle</b> du secteur ?`,
      reponse: `Pythagore : la génératrice vaut √(9² + 12²) = √225 = 15 cm, c'est le rayon du secteur.<br>L'arc doit faire le tour de la base : 2π × 9 = 18π, sur un cercle entier de 2π × 15 = 30π.<br>Angle : 360° × 18π ÷ 30π = <span class="big">216°</span>. Aire du chapeau : π × 9 × 15 ≈ 424 cm².`,
      consigne: "Quel est l'angle du secteur, en degrés ?",
      verification: {"type":"courte","attendus":["216"],"unite":"°"},
      dessin: chapeau,
    },
  ],
};

export default problemes;
