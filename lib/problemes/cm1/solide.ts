// Énigmes à projeter — CM1, notion solides (le ballon, les sommets du morceau
// de sucre, le rouleau d'essuie-tout, la tente de camping, le piège de la boîte
// à pizza, le défi de l'escalier de cubes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";

// Un cube en perspective : coin avant bas-gauche (x, y), côté a, décalage d.
const cube = (x: number, y: number, a: number, d: number, c: string = C.bleu) =>
  p(`M${x} ${y} L${x + a} ${y} L${x + a} ${y - a} L${x} ${y - a} Z`, c, 3, 0.25) +
  p(`M${x} ${y - a} L${x + d} ${y - a - d} L${x + a + d} ${y - a - d} L${x + a} ${y - a} Z`, c, 3, 0.12) +
  p(`M${x + a} ${y} L${x + a + d} ${y - d} L${x + a + d} ${y - a - d} L${x + a} ${y - a} Z`, c, 3, 0.4);

const ballon = svg(
  "Un ballon de foot",
  t(240, 230, "⚽", C.craie, 170) + t(240, 360, `Quel solide${NB}?`, C.rose, 28)
);

const sucre = svg(
  "Un morceau de sucre en forme de cube",
  cube(150, 300, 150, 60, C.pale) + [[150, 300], [300, 300], [300, 150], [150, 150], [210, 90], [360, 90], [360, 240]].map(([x, y]) => o(x, y, 7, C.rose, 1, 2)).join("") +
    t(240, 380, `Combien de sommets${NB}?`, C.rose, 26)
);

const rouleau = svg(
  "Un rouleau d'essuie-tout",
  ell(240, 90, 80, 26, C.craie, 0.08, 4) + l(160, 90, 160, 310, C.craie, 4) + l(320, 90, 320, 310, C.craie, 4) +
    p("M160 310 A80 26 0 0 0 320 310", C.craie, 4) + ell(240, 90, 22, 8, C.craie, 0.3, 3) + t(240, 380, `Quel solide${NB}?`, C.rose, 28)
);

const tente = svg(
  "Une tente de camping en forme de prisme à base triangulaire",
  p("M90 300 L190 120 L290 300 Z", C.jaune, 4, 0.35) + p("M190 120 L380 80 L450 250 L290 300", C.jaune, 4, 0.15) + l(290, 300, 190, 120, C.jaune, 4) + t(240, 380, `Combien de faces${NB}?`, C.rose, 26)
);

const pizza = svg(
  "Une boîte à pizza carrée et plate",
  p("M80 260 L320 260 L320 300 L80 300 Z", C.jaune, 4, 0.3) + p("M80 260 L170 190 L410 190 L320 260 Z", C.jaune, 4, 0.15) + p("M320 260 L410 190 L410 230 L320 300 Z", C.jaune, 4, 0.4) +
    t(245, 235, "🍕", C.craie, 30) + t(240, 120, `Toutes ses faces sont des carrés${NB}?`, C.rose, 22)
);

// L'escalier de 3 marches (vue de face) : 1 + 2 + 3 cubes.
const escalier = svg(
  "Un escalier de cubes : 3 marches = 6 cubes",
  [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [2, 2]].map(([i, j]) => r(60 + i * 50, 230 - j * 50, 50, 50, C.bleu, 0.3, 3)).join("") +
    t(110, 300, "3 marches : 6 cubes", C.craie, 20) + t(360, 200, "4 marches", C.rose, 26) + t(360, 240, `${NB}? cubes`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "solide",
  titre: "Énigmes sur les solides",
  description: "Le ballon, les sommets du morceau de sucre, le rouleau d'essuie-tout, la tente de camping, le piège de la boîte à pizza, le défi de l'escalier de cubes.",
  problemes: [
    {
      tag: "Énigme 1 · Le sport",
      titre: "Le ballon",
      question: `Un ballon est bien rond, de tous les côtés.<br><br>Quel <b>solide</b> est-ce ?`,
      reponse: `Le cube a des faces plates. Le cylindre aussi, en haut et en bas.<br>Le ballon est une <span class="big">sphère</span>.`,
      consigne: "Quel solide a la forme d'un ballon ?",
      verification: { type: "qcm", choix: ["un cube", "un cylindre", "une sphère"], bonne: 2 },
      dessin: ballon,
    },
    {
      tag: "Énigme 2 · Le petit-déjeuner",
      titre: "Le morceau de sucre",
      question: `Le morceau de sucre est un <b>cube</b>.<br><br>Combien de <b>sommets</b> a-t-il ?`,
      reponse: `4 sommets en haut, 4 sommets en bas.<br>4 + 4 = <span class="big">8 sommets</span>.<br>(Un est caché derrière !)`,
      consigne: "Combien de sommets a un cube ?",
      verification: { type: "courte", attendus: ["8"], unite: "sommets" },
      dessin: sucre,
    },
    {
      tag: "Énigme 3 · La cuisine",
      titre: "Le rouleau d'essuie-tout",
      question: `Regarde le rouleau d'essuie-tout.<br><br>Quel <b>solide</b> est-ce ?`,
      reponse: `Deux disques pareils, en haut et en bas, et un tube.<br>C'est un <span class="big">cylindre</span>.`,
      consigne: "Quel solide a la forme d'un rouleau d'essuie-tout ?",
      verification: { type: "qcm", choix: ["un cône", "un cylindre", "une pyramide"], bonne: 1 },
      dessin: rouleau,
    },
    {
      tag: "Énigme 4 · Le camping",
      titre: "La tente",
      question: `La tente est un <b>prisme</b> : deux triangles devant et derrière, des rectangles sur les côtés et au sol.<br><br>Combien de <b>faces</b> a-t-elle ?`,
      reponse: `2 triangles (devant, derrière).<br>3 rectangles (deux pentes et le sol).<br>2 + 3 = <span class="big">5 faces</span>.`,
      consigne: "Combien de faces a la tente ?",
      verification: { type: "courte", attendus: ["5"], unite: "faces" },
      dessin: tente,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La boîte à pizza",
      sorte: "piege",
      question: `La boîte à pizza est <b>carrée</b> et <b>plate</b>.<br><br>Ses 6 faces sont-elles toutes des <b>carrés</b> ?`,
      reponse: `Le piège : « boîte carrée » ne veut pas dire « cube ».<br>Le dessus et le dessous sont des carrés.<br>Les 4 bords sont des rectangles fins : <span class="big">2 carrés et 4 rectangles</span>.`,
      consigne: "Quelles sont les faces de la boîte à pizza ?",
      verification: { type: "qcm", choix: ["6 carrés", "2 carrés et 4 rectangles", "6 rectangles"], bonne: 1 },
      dessin: pizza,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'escalier de cubes",
      sorte: "defi",
      question: `Un escalier de <b>3 marches</b> demande <b>6 cubes</b>.<br><br>Combien de cubes pour un escalier de <b>4 marches</b> ?`,
      reponse: `3 marches : 1 + 2 + 3 = 6.<br>4 marches : on ajoute une colonne de 4.<br>1 + 2 + 3 + 4 = <span class="big">10 cubes</span>.`,
      consigne: "Combien de cubes pour un escalier de 4 marches ?",
      verification: { type: "courte", attendus: ["10"], unite: "cubes" },
      dessin: escalier,
    },
  ],
};

export default problemes;
