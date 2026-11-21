// Énigmes à projeter — CE1, notion solides (la boîte de conserve, la brique
// de lait, la tour de cubes, le solide qui ne s'empile pas, le piège de la
// feuille carrée, le défi de l'empreinte dans la pâte à modeler). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, p, ell } from "../dessins-ecole";

const conserve = svg(
  "Une boîte de conserve",
  ell(240, 110, 90, 26, C.pale, 0.2, 4) + l(150, 110, 150, 290, C.craie, 4) + l(330, 110, 330, 290, C.craie, 4) +
    p("M150 290 A90 26 0 0 0 330 290", C.craie, 4) + r(150, 160, 180, 70, C.rose, 0.3, 0) + t(240, 205, "Tomates", C.craie, 22) +
    t(240, 370, `Quel solide${NB}?`, C.rose, 30)
);

const brique = svg(
  "Une brique de lait",
  p("M160 110 L300 110 L340 80 L200 80 Z", C.pale, 4, 0.2) + p("M300 110 L340 80 L340 280 L300 310 Z", C.bleu, 4, 0.25) + r(160, 110, 140, 200, C.bleu, 0.12, 4) +
    t(230, 220, "LAIT", C.bleu, 28) + t(240, 375, `Quel solide${NB}?`, C.rose, 30)
);

const cube = (x: number, y: number, c: string) => r(x, y, 50, 50, c, 0.35, 3);
const tour = svg(
  "Une tour de 4 cubes et, à côté, une tour de 3 cubes",
  [0, 1, 2, 3].map((k) => cube(150, 270 - k * 50, C.bleu)).join("") + [0, 1, 2].map((k) => cube(250, 270 - k * 50, C.jaune)).join("") +
    l(100, 320, 380, 320, C.pale, 4) + t(240, 385, `Combien de cubes${NB}?`, C.rose, 30)
);

/** Un solide en boîte (cube ou pavé) vu en perspective : coin bas gauche (x, y), largeur l, hauteur h, profondeur d. */
const boite = (x: number, y: number, lg: number, h: number, d: number, c: string) =>
  r(x, y - h, lg, h, c, 0.3, 4) + p(`M${x} ${y - h} L${x + d} ${y - h - d} L${x + lg + d} ${y - h - d} L${x + lg} ${y - h} Z`, c, 4, 0.15) +
  p(`M${x + lg} ${y - h} L${x + lg + d} ${y - h - d} L${x + lg + d} ${y - d} L${x + lg} ${y} Z`, c, 4, 0.45);

const empiler = svg(
  "Trois solides : A un cube, B une boule, C un pavé",
  boite(45, 260, 80, 80, 25, C.bleu) + t(95, 300, "A", C.craie, 26) +
    o(240, 215, 46, C.rose, 0.3, 4) + ell(225, 200, 14, 8, C.rose, 0.5, 0) + t(240, 300, "B", C.craie, 26) +
    boite(320, 260, 110, 50, 25, C.jaune) + t(390, 300, "C", C.craie, 26) +
    t(240, 380, `Lequel roule et ne s'empile pas${NB}?`, C.rose, 26)
);

const feuille = svg(
  "Une feuille de papier carrée, toute plate, vue de côté : un trait",
  r(120, 70, 180, 180, C.jaune, 0.25, 4) + t(210, 170, "feuille", C.craie, 24) +
    l(340, 160, 440, 160, C.jaune, 3) + t(390, 140, "de côté", C.pale, 20) +
    t(240, 350, `Est-ce un cube${NB}?`, C.rose, 30)
);

const empreinte = svg(
  "Une boîte de conserve posée debout sur de la pâte à modeler",
  ell(240, 110, 70, 20, C.pale, 0.2, 4) + l(170, 110, 170, 230, C.craie, 4) + l(310, 110, 310, 230, C.craie, 4) + p("M170 230 A70 20 0 0 0 310 230", C.craie, 4) +
    r(80, 240, 320, 50, C.rose, 0.25, 4, 10) + t(240, 370, `Quelle trace dans la pâte${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "solides",
  titre: "Énigmes sur les solides",
  description: "La boîte de conserve, la brique de lait, les tours de cubes, le solide qui roule et ne s'empile pas, le piège de la feuille carrée, le défi de l'empreinte dans la pâte à modeler.",
  problemes: [
    {
      tag: "Énigme 1 · Le placard",
      titre: "La boîte de conserve",
      question: `Voici une boîte de conserve.<br>Deux ronds, un dessus et un dessous.<br><br>Quel solide est-ce ?`,
      reponse: `Deux faces rondes, et elle roule couchée.<br>C'est un <span class="big">cylindre</span>.`,
      consigne: "Quel solide est la boîte de conserve ?",
      verification: { type: "qcm", choix: ["Un cube", "Un cylindre", "Une boule"], bonne: 1 },
      dessin: conserve,
    },
    {
      tag: "Énigme 2 · Le petit-déjeuner",
      titre: "La brique de lait",
      question: `La brique de lait a 6 faces.<br>Ce sont des rectangles.<br><br>Quel solide est-ce ?`,
      reponse: `6 faces rectangles : c'est un <span class="big">pavé</span>.<br>Un cube aurait 6 faces carrées.`,
      consigne: "Quel solide est la brique de lait ?",
      verification: { type: "qcm", choix: ["Un pavé", "Un cône", "Un cylindre"], bonne: 0 },
      dessin: brique,
    },
    {
      tag: "Énigme 3 · Les jeux",
      titre: "Les tours de cubes",
      question: `Sacha fait deux tours.<br>Une tour de <b>4 cubes</b>, une tour de <b>3 cubes</b>.<br><br>Combien de cubes ?`,
      reponse: `4 + 3 = <span class="big">7 cubes</span>.`,
      consigne: "Combien de cubes en tout ?",
      verification: { type: "courte", attendus: ["7"], unite: "cubes" },
      dessin: tour,
    },
    {
      tag: "Énigme 4 · La construction",
      titre: "Le solide qui roule",
      question: `Un cube, une boule, un pavé.<br><br>Lequel roule et ne peut pas faire une tour ?`,
      reponse: `Le cube et le pavé ont des faces plates : ils s'empilent.<br>La boule n'a pas de face plate.<br><span class="big">La boule</span> (B).`,
      consigne: "Quel solide ne s'empile pas ?",
      verification: { type: "qcm", choix: ["Le pavé", "Le cube", "La boule"], bonne: 2 },
      dessin: empiler,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La feuille carrée",
      sorte: "piege",
      question: `La feuille de papier est un <b>carré</b>.<br><br>Est-ce un cube ?`,
      reponse: `Le piège : un cube a des faces carrées.<br>Mais la feuille est plate : de côté, c'est un trait.<br><span class="big">Non</span> : c'est une figure plane, un carré.`,
      consigne: "La feuille carrée est-elle un cube ?",
      verification: { type: "qcm", choix: ["Oui", "Non", "C'est une boule"], bonne: 1 },
      dessin: feuille,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'empreinte",
      sorte: "defi",
      question: `On pose la boîte de conserve <b>debout</b>.<br>On appuie dans la pâte à modeler.<br><br>Quelle trace voit-on ?`,
      reponse: `La boîte touche la pâte par son dessous.<br>Le dessous est un disque.<br>La trace : <span class="big">un rond</span>.`,
      consigne: "Quelle trace laisse la boîte posée debout ?",
      verification: { type: "qcm", choix: ["Un carré", "Un triangle", "Un rond"], bonne: 2 },
      dessin: empreinte,
    },
  ],
};

export default problemes;
