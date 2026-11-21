// Énigmes à projeter — CE1, notion figures planes (les côtés du sandwich,
// la forme de la porte, les ronds du robot, le carré parmi les rectangles, le
// piège du ballon de rugby, le défi des deux triangles). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, p, ell, grille } from "../dessins-ecole";

const sandwich = svg(
  "Un sandwich coupé en triangle",
  p("M120 290 L360 290 L120 90 Z", C.jaune, 5, 0.3) +
    t(240, 370, `Combien de côtés${NB}?`, C.rose, 30)
);

const objets = svg(
  "Trois objets : une porte (A), une horloge ronde (B), une part de fromage en pointe (C)",
  r(55, 90, 90, 180, C.jaune, 0.3, 4, 2) + o(125, 185, 5, C.craie, 1, 2) + t(100, 310, "A", C.craie, 26) +
    o(240, 180, 60, C.bleu, 0.15, 4) + l(240, 180, 240, 140, C.craie, 4) + l(240, 180, 270, 180, C.craie, 4) + t(240, 310, "B", C.craie, 26) +
    p("M340 260 L440 260 L440 130 Z", C.jaune, 4, 0.45) + t(400, 310, "C", C.craie, 26) +
    t(240, 385, `La porte a quelle forme${NB}?`, C.rose, 26)
);

const robot = svg(
  "Un robot dessiné avec des formes : tête carrée, deux yeux ronds, corps rectangle, deux roues rondes",
  r(190, 60, 100, 90, C.bleu, 0.2, 4) + o(220, 100, 12, C.craie, 0.8, 3) + o(260, 100, 12, C.craie, 0.8, 3) +
    r(165, 160, 150, 120, C.jaune, 0.25, 4) + o(195, 300, 22, C.craie, 0.2, 4) + o(285, 300, 22, C.craie, 0.2, 4) +
    l(240, 60, 240, 35, C.craie, 3) + p("M225 125 L255 125", C.craie, 3) +
    t(240, 385, `Combien de ronds${NB}?`, C.rose, 30)
);

const quatre = svg(
  "Un quadrillage avec trois figures à 4 côtés : A rectangle 4 carreaux sur 2, B carré 3 sur 3, C rectangle 3 sur 1",
  grille(40, 60, 10, 5, 40, C.pale, 1.5) +
    r(80, 100, 160, 80, C.bleu, 0.3, 4) + t(160, 150, "A", C.craie, 26) +
    r(280, 100, 120, 120, C.rose, 0.3, 4) + t(340, 170, "B", C.craie, 26) +
    r(80, 220, 120, 40, C.jaune, 0.35, 4) + t(140, 250, "C", C.craie, 24) +
    t(240, 330, "Compte les carreaux de chaque côté.", C.pale, 22) + t(240, 390, `Lequel est un carré${NB}?`, C.rose, 28)
);

const rugby = svg(
  "Un ballon de rugby, rond mais aplati",
  ell(240, 180, 140, 85, C.jaune, 0.3, 5) + l(190, 180, 290, 180, C.craie, 3) + [210, 230, 250, 270].map((x) => l(x, 170, x, 190, C.craie, 3)).join("") +
    t(240, 350, `Est-ce un cercle${NB}?`, C.rose, 30)
);

const triangles = svg(
  "Deux triangles pareils, avec un angle droit, posés côte à côte",
  p("M60 260 L200 260 L60 120 Z", C.bleu, 4, 0.3) + p("M260 120 L400 120 L400 260 Z", C.rose, 4, 0.3) +
    t(230, 200, "+", C.craie, 40) + t(240, 340, "On les colle par le grand côté.", C.pale, 22) +
    t(240, 395, `Quelle forme obtient-on${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "figures_planes",
  titre: "Énigmes sur les figures planes",
  description: "Les côtés du sandwich en triangle, la forme de la porte, les ronds du robot, le carré parmi les rectangles, le piège du ballon de rugby, le défi des deux triangles collés.",
  problemes: [
    {
      tag: "Énigme 1 · Le pique-nique",
      titre: "Le sandwich",
      question: `Le sandwich est coupé en <b>triangle</b>.<br><br>Combien de côtés a-t-il ?`,
      reponse: `Un triangle a 3 côtés droits et 3 sommets.<br><span class="big">3 côtés</span>.`,
      consigne: "Combien de côtés a un triangle ?",
      verification: { type: "courte", attendus: ["3"], unite: "côtés" },
      dessin: sandwich,
    },
    {
      tag: "Énigme 2 · La maison",
      titre: "La porte",
      question: `Voici une porte, une horloge et un fromage.<br><br>Quelle forme a la porte ?`,
      reponse: `4 côtés, 4 angles droits, 2 côtés longs et 2 courts.<br>La porte est un <span class="big">rectangle</span>.`,
      consigne: "Quelle forme a la porte ?",
      verification: { type: "qcm", choix: ["Un triangle", "Un cercle", "Un rectangle"], bonne: 2 },
      dessin: objets,
    },
    {
      tag: "Énigme 3 · Le robot",
      titre: "Les ronds du robot",
      question: `Tom dessine un robot avec des formes.<br><br>Combien de <b>ronds</b> ?`,
      reponse: `2 yeux et 2 roues.<br>2 + 2 = <span class="big">4 ronds</span>.`,
      consigne: "Combien de ronds dans le robot ?",
      verification: { type: "courte", attendus: ["4"], unite: "ronds" },
      dessin: robot,
    },
    {
      tag: "Énigme 4 · Le quadrillage",
      titre: "Le carré",
      question: `Trois figures à 4 côtés.<br>Un carré a <b>4 côtés de même longueur</b>.<br><br>Lequel est un carré ?`,
      reponse: `A : 4 carreaux sur 2. C : 3 sur 1. Pas pareil.<br>B : 3 carreaux sur 3. Pareil !<br>Le carré : <span class="big">B</span>.`,
      consigne: "Quelle figure est un carré ?",
      verification: { type: "qcm", choix: ["B", "A", "C"], bonne: 0 },
      dessin: quatre,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ballon de rugby",
      sorte: "piege",
      question: `Le ballon de rugby est tout rond sur le bord.<br><br>Est-ce un cercle ?`,
      reponse: `Le piège : il n'a pas de coin, comme un cercle.<br>Mais il est aplati : plus long que haut.<br><span class="big">Non</span>, ce n'est pas un cercle.`,
      consigne: "Le ballon de rugby est-il un cercle ?",
      verification: { type: "qcm", choix: ["Oui", "Non", "C'est un carré"], bonne: 1 },
      dessin: rugby,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux triangles",
      sorte: "defi",
      question: `Deux triangles pareils.<br>On les colle par leur <b>grand côté</b>.<br><br>Quelle forme obtient-on ?`,
      reponse: `Chaque triangle est la moitié d'un carré.<br>Collés : 4 côtés pareils, 4 angles droits.<br>Un <span class="big">carré</span>.`,
      consigne: "Quelle forme obtient-on ?",
      verification: { type: "qcm", choix: ["Un cercle", "Un carré", "Un triangle"], bonne: 1 },
      dessin: triangles,
    },
  ],
};

export default problemes;
