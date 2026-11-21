// Énigmes à projeter — 3e, notion algo_programmation (le lutin calculateur,
// le robot qui trace un pentagone, le livret d'épargne en boucle, le drone
// et ses coordonnées, piège du « répéter jusqu'à » qui dépasse, défi de
// l'algorithme d'Euclide par soustractions). Blocs façon Scratch, chaque
// programme déroulé pas à pas. 21/11/2026.
// ⛔ Ne reprend pas la 4e (couveuse, arrosage, vies, téléphérique, volley, Syracuse).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";

/** Un bloc façon Scratch : rectangle arrondi pâle, texte craie. */
const bloc = (x: number, y: number, w: number, s: string, coul: string, h = 36) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${coul}" fill-opacity=".18" stroke="${coul}" stroke-width="2"/>` +
  t(x + 10, y + h - 10, s, C.craie, 20, "start");

const lutin = svg(
  "Un programme : demander un nombre, le multiplier par 3, ajouter 5, multiplier par 2, dire le résultat",
  bloc(30, 40, 330, `demander «${NB}un nombre${NB}?${NB}»`, C.pale) + bloc(30, 90, 330, "mettre r à réponse × 3", C.bleu) + bloc(30, 140, 330, "ajouter 5 à r", C.bleu) +
    bloc(30, 190, 330, "mettre r à r × 2", C.bleu) + bloc(30, 240, 330, "dire r", C.pale) + t(420, 80, "🐱", C.craie, 50) +
    t(240, 330, "on entre 4", C.craie, 24) + t(240, 380, `le lutin dit${NB}?`, C.rose, 26)
);

// Le pentagone tracé par le robot (côté 80 px).
const pentagone = () => {
  let x = 300, y = 330, a = 0, d = `M${x} ${y}`;
  for (let k = 0; k < 5; k++) { x += 80 * Math.cos(a); y -= 80 * Math.sin(a); d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; a += (72 * Math.PI) / 180; }
  return d;
};
const robot = svg(
  "Un programme : stylo en position d'écriture, répéter 5 fois avancer de 80 et tourner d'un angle inconnu ; à côté, le pentagone régulier tracé",
  bloc(20, 40, 250, "stylo en position", C.pale) + bloc(20, 90, 200, "répéter 5 fois", C.jaune) + bloc(50, 140, 200, "avancer de 80", C.bleu) +
    bloc(50, 190, 200, "tourner ↺ de", C.bleu).replace('width="200"', 'width="200"') + t(222, 216, "?", C.rose, 26) + bloc(20, 240, 200, "fin de répéter", C.jaune) +
    `<path d="${pentagone()}" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>` + t(240, 395, `angle pour un pentagone régulier${NB}?`, C.rose, 22)
);

const livret = svg(
  "Un programme : mettre épargne à 100, répéter 3 fois mettre épargne à épargne × 1,1, puis dire épargne",
  bloc(30, 50, 300, "mettre épargne à 100", C.bleu) + bloc(30, 100, 200, "répéter 3 fois", C.jaune) + bloc(60, 150, 340, "mettre épargne à épargne × 1,1", C.bleu) +
    bloc(30, 200, 200, "fin de répéter", C.jaune) + bloc(30, 250, 200, "dire épargne", C.pale) + t(420, 90, "🐷", C.craie, 46) +
    t(240, 350, `le lutin dit${NB}?`, C.rose, 26)
);

const drone = svg(
  "Un programme : aller à x 0, y 0 ; répéter 4 fois : ajouter 30 à x, ajouter moins 20 à y",
  bloc(30, 40, 260, "aller à x : 0  y : 0", C.bleu).replace(/ : /g, `${NB}:${NB}`) + bloc(30, 90, 200, "répéter 4 fois", C.jaune) + bloc(60, 140, 230, "ajouter 30 à x", C.bleu) +
    bloc(60, 190, 230, "ajouter −20 à y", C.bleu) + bloc(30, 240, 200, "fin de répéter", C.jaune) + t(410, 90, "🚁", C.craie, 46) +
    l(330, 200, 460, 200, C.pale, 2) + l(345, 140, 345, 290, C.pale, 2) + t(455, 220, "x", C.pale, 18) + t(358, 150, "y", C.pale, 18) +
    t(240, 350, `position finale${NB}: y = ?`, C.rose, 26).replace(" ?", `${NB}?`)
);

const jusqua = svg(
  "Un programme : mettre n à 0 ; répéter jusqu'à n plus grand que 10 : ajouter 3 à n ; puis dire n",
  bloc(30, 50, 220, "mettre n à 0", C.bleu) + bloc(30, 100, 300, "répéter jusqu'à n &gt; 10", C.jaune) + bloc(60, 150, 220, "ajouter 3 à n", C.bleu) +
    bloc(30, 200, 200, "fin de répéter", C.jaune) + bloc(30, 250, 160, "dire n", C.pale) + t(400, 100, "🐱", C.craie, 46) +
    t(240, 345, "Ilan : « il dit 10 »", C.bleu, 22).replace(" :", `${NB}:`).replace("« ", `«${NB}`).replace(" »", `${NB}»`) + t(240, 390, `vrai${NB}?`, C.rose, 26)
);

const euclide = svg(
  "Un programme : a vaut 84, b vaut 36 ; répéter jusqu'à a égale b : si a plus grand que b alors a prend a moins b, sinon b prend b moins a ; puis dire a",
  bloc(20, 20, 200, "mettre a à 84", C.bleu) + bloc(240, 20, 200, "mettre b à 36", C.bleu) + bloc(20, 70, 280, "répéter jusqu'à a = b", C.jaune) +
    bloc(50, 120, 230, "si a &gt; b alors", C.jaune) + bloc(80, 170, 250, "mettre a à a − b", C.bleu) + bloc(50, 220, 100, "sinon", C.jaune) +
    bloc(80, 270, 250, "mettre b à b − a", C.bleu) + bloc(20, 320, 200, "fin de répéter", C.jaune) + bloc(20, 370, 120, "dire a", C.pale) +
    t(400, 395, `le lutin dit${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "algo_programmation",
  titre: "Énigmes sur l'algorithmique et la programmation",
  description: "Le lutin calculateur, le robot qui trace un pentagone, le livret d'épargne en boucle, le drone et ses coordonnées, le piège du « répéter jusqu'à » qui dépasse, le défi de l'algorithme d'Euclide : dérouler un programme Scratch, boucles et variables, angles de rotation, coordonnées.",
  problemes: [
    {
      tag: "Énigme 1 · Le lutin calculateur",
      titre: "Que dit le lutin ?",
      question: `On lance le programme et on entre le nombre <b>4</b>.<br><br><b>Quel nombre</b> le lutin dit-il ?`,
      reponse: `r = 4 × 3 = 12, puis 12 + 5 = 17, puis 17 × 2 = <span class="big">34</span>.<br>Le programme calcule (3x + 5) × 2.`,
      consigne: "Quel nombre le lutin dit-il quand on entre 4 ?",
      verification: {"type":"courte","attendus":["34"]},
      dessin: lutin,
    },
    {
      tag: "Énigme 2 · Le robot dessinateur",
      titre: "Le pentagone",
      question: `Le robot répète 5 fois : <b>avancer de 80</b>, puis <b>tourner</b>. Il doit tracer un <b>pentagone régulier</b> et revenir à son point de départ.<br><br>De <b>combien de degrés</b> doit-il tourner ?`,
      reponse: `En 5 virages, le robot fait un tour complet sur lui-même : 360°.<br>À chaque virage : 360 ÷ 5 = <span class="big">72°</span>. (L'angle intérieur du pentagone, lui, vaut 180 − 72 = 108°.)`,
      consigne: "De combien de degrés le robot doit-il tourner ?",
      verification: {"type":"courte","attendus":["72"],"unite":"°"},
      dessin: robot,
    },
    {
      tag: "Énigme 3 · Le livret",
      titre: "L'épargne qui grossit",
      question: `Zoé place 100 € sur un livret qui rapporte 10 % par an. Le programme simule <b>3 ans</b>.<br><br><b>Que dit le lutin</b> à la fin ?`,
      reponse: `On déroule : 100 → 110 → 121 → <span class="big">133,1</span>.<br>Multiplier par 1,1, c'est ajouter 10 %. Chaque année, les intérêts rapportent eux aussi.`,
      consigne: "Quel nombre le lutin dit-il à la fin ?",
      verification: {"type":"courte","attendus":["133,1"],"unite":"€"},
      dessin: livret,
    },
    {
      tag: "Énigme 4 · Le drone",
      titre: "Où est le drone ?",
      question: `Le drone de livraison part de l'origine (0 ; 0). Il répète 4 fois : <b>ajouter 30 à x</b>, puis <b>ajouter −20 à y</b>.<br><br>Quelle est son <b>ordonnée y</b> à la fin ?`,
      reponse: `x augmente de 30 quatre fois : 120. y diminue de 20 quatre fois : 0 − 80.<br>Le drone arrive en (120 ; −80) : y = <span class="big">−80</span>.`,
      consigne: "Quelle est l'ordonnée y finale du drone ?",
      verification: {"type":"courte","attendus":["-80","−80"]},
      dessin: drone,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Jusqu'à quand ?",
      sorte: "piege",
      question: `Le programme part de n = 0 et répète « ajouter 3 à n » <b>jusqu'à ce que n &gt; 10</b>. Ilan dit : « Le lutin dit 10. »<br><br><b>Que dit vraiment</b> le lutin ?`,
      reponse: `On déroule : 3, 6, 9 (pas encore plus grand que 10), puis 12 : la boucle s'arrête.<br>Le lutin dit <span class="big">12</span>. n ne passe jamais par 10 : il va de 3 en 3.`,
      consigne: "Quel nombre le lutin dit-il ?",
      verification: {"type":"qcm","choix":["12","9","10"],"bonne":0},
      dessin: jusqua,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'algorithme d'Euclide",
      sorte: "defi",
      question: `Au départ, <b>a = 84</b> et <b>b = 36</b>. Tant qu'ils sont différents, on retire le plus petit du plus grand.<br><br><b>Que dit le lutin</b> à la fin ?`,
      reponse: `(84 ; 36) → (48 ; 36) → (12 ; 36) → (12 ; 24) → (12 ; 12) : stop.<br>Le lutin dit <span class="big">12</span>, le plus grand diviseur commun de 84 et 36.<br>Une pièce de 84 dm sur 36 dm se carrelle avec des carreaux de 12 dm, sans découpe.`,
      consigne: "Quel nombre le lutin dit-il à la fin ?",
      verification: {"type":"courte","attendus":["12"]},
      dessin: euclide,
    },
  ],
};

export default problemes;
