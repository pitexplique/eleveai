// Énigmes à projeter — CE2, notion figures planes (les panneaux de la route,
// l'alvéole de l'abeille, le cerf-volant losange, le cercle au compas, le
// piège du carreau posé sur la pointe, le défi des triangles du fanion). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Le petit carré d'angle droit au sommet (vx, vy), entre les côtés qui vont vers a et vers b. */
const coin = (vx: number, vy: number, ax: number, ay: number, bx: number, by: number, k = 16) => {
  const na = Math.hypot(ax - vx, ay - vy), nb = Math.hypot(bx - vx, by - vy);
  const ux = ((ax - vx) / na) * k, uy = ((ay - vy) / na) * k, wx = ((bx - vx) / nb) * k, wy = ((by - vy) / nb) * k;
  const f = (x: number) => x.toFixed(1);
  return p(`M${f(vx + ux)} ${f(vy + uy)} L${f(vx + ux + wx)} ${f(vy + uy + wy)} L${f(vx + wx)} ${f(vy + wy)}`, C.jaune, 3);
};
/** Un petit trait de codage au milieu du côté (même longueur). */
const code = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, n = Math.hypot(x2 - x1, y2 - y1);
  const px = (-(y2 - y1) / n) * 9, py = ((x2 - x1) / n) * 9;
  return l(mx - px, my - py, mx + px, my + py, C.rose, 4);
};
const poly = (pts: number[][], c: string = C.craie, op = 0.15) =>
  p("M" + pts.map(([x, y]) => `${x} ${y}`).join(" L") + " Z", c, 5, op);

const panneaux = svg(
  "Trois panneaux : A est rond, B est carré, C est un triangle",
  [100, 240, 380].map((x) => l(x, 200, x, 330, C.pale, 6)).join("") +
    o(100, 140, 58, C.rose, 0.2, 6) + r(185, 85, 110, 110, C.bleu, 0.2, 6, 4) + poly([[380, 82], [442, 192], [318, 192]], C.rose, 0.2) +
    t(100, 365, "A", C.jaune, 30) + t(240, 365, "B", C.jaune, 30) + t(380, 365, "C", C.jaune, 30) +
    t(240, 408, `Le triangle${NB}?`, C.rose, 26)
);

// Hexagone régulier de centre (240, 190), rayon 115.
const hexa = [0, 1, 2, 3, 4, 5].map((k) => [240 + 115 * Math.cos((Math.PI / 3) * k), 190 + 115 * Math.sin((Math.PI / 3) * k)].map((v) => Math.round(v)));
const alveole = svg(
  "Une alvéole de ruche, en forme d'hexagone, avec une abeille",
  poly(hexa, C.jaune, 0.3) + t(240, 210, "🍯", C.craie, 54) + t(400, 70, "🐝", C.craie, 48) +
    t(240, 385, `Combien de côtés${NB}?`, C.rose, 28)
);

const cerf = svg(
  "Un cerf-volant : 4 côtés de même longueur, aucun angle droit",
  poly([[240, 50], [320, 170], [240, 290], [160, 170]], C.bleu, 0.25) +
    l(240, 50, 240, 290, C.pale, 2, "6 6") + l(160, 170, 320, 170, C.pale, 2, "6 6") +
    code(240, 50, 320, 170) + code(320, 170, 240, 290) + code(240, 290, 160, 170) + code(160, 170, 240, 50) +
    p("M240 290 Q215 320 245 340 Q275 360 250 385", C.pale, 3) +
    t(410, 170, "même", C.rose, 20) + t(410, 195, "longueur", C.rose, 20) +
    t(240, 412, `Quelle figure${NB}?`, C.rose, 26)
);

const compas = svg(
  "Un cercle de centre O ; le rayon OA mesure 4 cm ; P est un autre point du cercle",
  o(240, 185, 130, C.craie, 0, 5) + o(240, 185, 5, C.craie, 1, 2) + t(240, 220, "O", C.craie, 24) +
    l(240, 185, 370, 185, C.bleu, 4) + o(370, 185, 5, C.bleu, 1, 2) + t(392, 192, "A", C.bleu, 24) + t(305, 175, "4 cm", C.bleu, 22) +
    o(148, 93, 5, C.rose, 1, 2) + t(130, 82, "P", C.rose, 24) + l(240, 185, 148, 93, C.rose, 3, "8 6") +
    t(240, 365, "pas à l'échelle", C.pale, 18) + t(240, 403, `OP = ? cm`, C.rose, 28)
);

const S = [[240, 70], [355, 185], [240, 300], [125, 185]];
const carreau = svg(
  "Un carreau posé sur la pointe : 4 côtés de même longueur et 4 angles droits",
  poly(S, C.jaune, 0.25) +
    S.map(([x, y], i) => coin(x, y, S[(i + 3) % 4][0], S[(i + 3) % 4][1], S[(i + 1) % 4][0], S[(i + 1) % 4][1])).join("") +
    S.map(([x, y], i) => code(x, y, S[(i + 1) % 4][0], S[(i + 1) % 4][1])).join("") +
    t(240, 370, `Un carré${NB}?`, C.rose, 30)
);

const fanion = svg(
  "Un fanion triangulaire coupé par deux traits qui partent de la pointe du haut",
    poly([[240, 50], [80, 320], [420, 320]], C.rose, 0.15) + l(240, 50, 190, 320, C.craie, 4) + l(240, 50, 300, 320, C.craie, 4) +
    t(240, 385, `Combien de triangles${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "figures_planes",
  titre: "Énigmes sur les figures planes",
  description: "Le panneau triangle, les côtés de l'alvéole de l'abeille, le cerf-volant en losange, le rayon du cercle tracé au compas, le piège du carreau posé sur la pointe, le défi des triangles cachés dans le fanion.",
  problemes: [
    {
      tag: "Énigme 1 · La route",
      titre: "Les panneaux",
      question: `Voici trois panneaux de la route.<br><br>Lequel a la forme d'un <b>triangle</b> ?`,
      reponse: `Un triangle a 3 côtés et 3 sommets.<br>Le rond n'a pas de côté, le carré en a 4.<br>C'est <span class="big">le panneau C</span>.`,
      consigne: "Quel panneau est un triangle ?",
      verification: { type: "qcm", choix: ["Le panneau A", "Le panneau B", "Le panneau C"], bonne: 2 },
      dessin: panneaux,
    },
    {
      tag: "Énigme 2 · La ruche",
      titre: "L'alvéole de l'abeille",
      question: `L'abeille range son miel dans une <b>alvéole</b>.<br><br>Combien de côtés a cette figure ?`,
      reponse: `On compte en tournant : 1, 2, 3, 4, 5, 6.<br><span class="big">6 côtés</span>. C'est un hexagone.`,
      consigne: "Combien de côtés a l'alvéole ?",
      verification: { type: "courte", attendus: ["6"], unite: "côtés" },
      dessin: alveole,
    },
    {
      tag: "Énigme 3 · Le jour de vent",
      titre: "Le cerf-volant",
      question: `Le cerf-volant a <b>4 côtés de même longueur</b>.<br>Il n'a <b>aucun angle droit</b>.<br><br>Quelle est cette figure ?`,
      reponse: `4 côtés égaux, sans angle droit.<br>Ce n'est pas un carré : il lui faudrait des angles droits.<br>C'est <span class="big">un losange</span>.`,
      consigne: "Quelle figure est le cerf-volant ?",
      verification: { type: "qcm", choix: ["Un losange", "Un carré", "Un rectangle"], bonne: 0 },
      dessin: cerf,
    },
    {
      tag: "Énigme 4 · Le compas",
      titre: "Le cercle d'Inès",
      question: `Inès trace un cercle de centre <b>O</b>.<br>Le rayon OA mesure <b>4 cm</b>.<br>Le point P est sur le cercle.<br><br>Combien mesure OP ?`,
      reponse: `Tous les points du cercle sont à la même distance du centre.<br>OP = OA = <span class="big">4 cm</span>.`,
      consigne: "Combien mesure OP, en centimètres ?",
      verification: { type: "courte", attendus: ["4"], unite: "cm" },
      dessin: compas,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carreau sur la pointe",
      sorte: "piege",
      question: `Le carreau est posé <b>sur la pointe</b>.<br>Ses 4 côtés ont la même longueur.<br>Il a 4 angles droits.<br><br>Est-ce un carré ?`,
      reponse: `Le piège : tourné, il ressemble à un losange.<br>Mais tourner ne change pas la figure !<br>4 côtés égaux et 4 angles droits : <span class="big">oui, c'est un carré</span>.`,
      consigne: "Le carreau posé sur la pointe est-il un carré ?",
      verification: { type: "qcm", choix: ["Oui, c'est un carré", "Non, c'est un losange", "Non, c'est un rectangle"], bonne: 0 },
      dessin: carreau,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les triangles du fanion",
      sorte: "defi",
      question: `Le fanion est un triangle.<br>On trace <b>2 traits</b> depuis la pointe du haut.<br><br>Combien de triangles en tout ?`,
      reponse: `Les 3 petits : 3.<br>Deux petits collés : 2 de plus.<br>Le grand fanion : 1.<br>3 + 2 + 1 = <span class="big">6 triangles</span>.`,
      consigne: "Combien de triangles vois-tu en tout ?",
      verification: { type: "courte", attendus: ["6"], unite: "triangles" },
      dessin: fanion,
    },
  ],
};

export default problemes;
