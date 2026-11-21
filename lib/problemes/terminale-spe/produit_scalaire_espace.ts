// Énigmes à projeter — terminale spé maths, notion produit_scalaire_espace
// (le chariot de la gare, la lampe d'architecte, la tyrolienne, le panneau
// solaire, piège du jeu vidéo en 3D, défi de la charpente de cabane). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, o, p, fleche } from "../dessins-ecole";
import { espace, vec, vecS } from "../dessins-tle";

const chariot = svg("Un chariot tiré par une corde : force F(3 ; 0 ; 4) en newtons, déplacement AB(5 ; 2 ; 0) en mètres",
  r(80, 200, 140, 80, C.craie, 0.08, 3, 6) + o(110, 296, 16, C.craie, 0, 3) + o(190, 296, 16, C.craie, 0, 3) +
    fleche(220, 220, 330, 110, C.bleu, 4) + vecS(245, 152, "F", C.bleu, 28) + t(330, 98, "(3 ; 0 ; 4)", C.bleu, 22, "start") +
    fleche(80, 350, 400, 350, C.jaune, 4) + vecS(240, 385, "AB", C.jaune, 24) + t(282, 385, "(5 ; 2 ; 0)", C.jaune, 22, "start") +
    t(240, 50, `travail = ${NB}?`, C.rose, 26));

const lampe = svg("Lampe d'architecte : le pied suit u(2 ; −1 ; 1), le bras suit v(1 ; 3 ; 1)",
  r(80, 330, 120, 20, C.craie, 0.15, 3, 4) + l(140, 330, 160, 170, C.bleu, 6) + l(160, 170, 350, 130, C.jaune, 6) +
    p("M350 130 L400 170 L330 190 Z", C.craie, 3, 0.15) + o(160, 170, 9, C.craie, 0.9, 2) +
    vecS(110, 250, "u", C.bleu, 28) + t(40, 290, "(2 ; −1 ; 1)", C.bleu, 22, "start") +
    vecS(250, 125, "v", C.jaune, 28) + t(210, 90, "(1 ; 3 ; 1)", C.jaune, 22, "start") +
    t(320, 290, `angle droit${NB}?`, C.rose, 26));

const tyrolienne = svg("Une tyrolienne entre deux arbres, de vecteur AB(12 ; 4 ; −3) en mètres, pas à l'échelle",
  l(70, 360, 70, 80, C.craie, 6) + l(410, 360, 410, 230, C.craie, 6) + o(70, 80, 40, C.bleu, 0.15, 3) + o(410, 220, 34, C.bleu, 0.15, 3) +
    l(70, 120, 410, 250, C.jaune, 4) + `<circle cx="70" cy="120" r="7" fill="${C.craie}"/><circle cx="410" cy="250" r="7" fill="${C.craie}"/>` +
    t(88, 148, "A", C.craie, 22, "start") + t(400, 285, "B", C.craie, 22, "end") +
    vecS(190, 300, "AB", C.jaune, 24) + t(230, 300, "(12 ; 4 ; −3)", C.jaune, 22, "start") + t(240, 340, "pas à l'échelle", C.pale, 17) +
    t(240, 400, `longueur du câble${NB}?`, C.rose, 24));

const panneau = svg("Un panneau solaire dans le plan 3x − y + 2z + 5 = 0 et une flèche perpendiculaire au panneau",
  t(240, 50, "panneau : 3x − y + 2z + 5 = 0", C.bleu, 24) +
    p("M70 300 L300 300 L410 220 L180 220 Z", C.bleu, 3, 0.15) + l(140, 300, 180, 220, C.pale, 1.5) + l(220, 300, 260, 220, C.pale, 1.5) + l(125, 260, 355, 260, C.pale, 1.5) +
    fleche(240, 260, 240, 110, C.rose, 4) + vecS(270, 150, "n", C.rose, 28) + t(290, 150, `= (${NB}?${NB})`, C.rose, 22, "start") +
    t(240, 390, "un vecteur normal", C.rose, 24));

const jeu = svg("Au tableau : u(2 ; 3 ; 1) et v(1 ; −1 ; 4) ; Tom écrit que u·v vaut (2 ; −3 ; 4)",
  vecS(120, 110, "u", C.bleu, 30) + t(150, 110, "(2 ; 3 ; 1)", C.bleu, 28, "start") +
    vecS(120, 170, "v", C.bleu, 30) + t(150, 170, "(1 ; −1 ; 4)", C.bleu, 28, "start") +
    t(240, 260, "Tom : « u · v = (2 ; −3 ; 4) »", C.jaune, 24) + t(240, 380, `u · v = ${NB}?`, C.rose, 26));

const charpente = (() => {
  const E = espace(170, 290, 120);
  return svg("Deux poutres d'une charpente partent du même point : u(1 ; 1 ; 0) et v(1 ; 0 ; 1) ; l'angle entre elles est inconnu",
    E.axes(1.4, 1.6, 1.6) + E.seg([0, 0, 0], [1, 1, 0], C.bleu, 6) + E.seg([0, 0, 0], [1, 0, 1], C.jaune, 6) +
      vecS(300, 340, "u", C.bleu, 24) + t(316, 340, "(1 ; 1 ; 0)", C.bleu, 22, "start") + vecS(40, 140, "v", C.jaune, 24) + t(56, 140, "(1 ; 0 ; 1)", C.jaune, 22, "start") +
      t(240, 400, `l'angle entre les poutres${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "produit_scalaire_espace",
  titre: "Énigmes du produit scalaire dans l'espace",
  description: "Le chariot de la gare, la lampe d'architecte, la tyrolienne, le panneau solaire, le piège du jeu vidéo en 3D, le défi de la charpente de cabane : produit scalaire en coordonnées, orthogonalité, norme, vecteur normal à un plan, angle entre deux vecteurs.",
  problemes: [
    {
      tag: "Énigme 1 · Le chariot de la gare",
      titre: "Le produit scalaire en coordonnées",
      question: `Un porteur tire un chariot avec une force ${vec("F")}(3 ; 0 ; 4), en newtons. Le chariot se déplace de ${vec("AB")}(5 ; 2 ; 0), en mètres.<br><br><b>Quel est le travail</b> ${vec("F")} · ${vec("AB")}, en joules ?`,
      reponse: `On multiplie coordonnée par coordonnée, puis on ajoute : 3 × 5 + 0 × 2 + 4 × 0.<br>Le travail vaut <span class="big">15 J</span>.`,
      consigne: "F(3 ; 0 ; 4) et AB(5 ; 2 ; 0) : que vaut F · AB (en joules) ?",
      verification: { type: "courte", attendus: ["15"], unite: "J" },
      dessin: chariot,
    },
    {
      tag: "Énigme 2 · La lampe d'architecte",
      titre: "L'orthogonalité",
      question: `Le pied d'une lampe d'architecte suit ${vec("u")}(2 ; −1 ; 1). Son bras suit ${vec("v")}(1 ; 3 ; 1).<br><br><b>Le bras est-il perpendiculaire</b> au pied ?`,
      reponse: `${vec("u")} · ${vec("v")} = 2 × 1 + (−1) × 3 + 1 × 1 = 2 − 3 + 1 = 0.<br>Produit scalaire nul : <span class="big">oui, ils sont orthogonaux</span>.`,
      consigne: "u(2 ; −1 ; 1) et v(1 ; 3 ; 1) : sont-ils orthogonaux ?",
      verification: { type: "qcm", choix: ["Non : aucune coordonnée n'est nulle", "Non : 2 + 3 + 1 = 6", "Oui : u · v = 0"], bonne: 2 },
      dessin: lampe,
    },
    {
      tag: "Énigme 3 · La tyrolienne",
      titre: "La norme d'un vecteur",
      question: `Une tyrolienne relie deux arbres A et B, avec ${vec("AB")}(12 ; 4 ; −3), en mètres.<br><br><b>Quelle est la longueur</b> du câble tendu ?`,
      reponse: `AB = √(12² + 4² + (−3)²) = √(144 + 16 + 9) = √169.<br>Le câble mesure <span class="big">13 m</span>.`,
      consigne: "AB(12 ; 4 ; −3) en mètres : quelle est la longueur AB ?",
      verification: { type: "courte", attendus: ["13"], unite: "m" },
      dessin: tyrolienne,
    },
    {
      tag: "Énigme 4 · Le panneau solaire",
      titre: "Un vecteur normal",
      question: `Un panneau solaire est dans le plan 3x − y + 2z + 5 = 0.<br><br><b>Quel vecteur</b> est perpendiculaire au panneau ?`,
      reponse: `Pour le plan ax + by + cz + d = 0, le vecteur (a ; b ; c) est normal.<br>Ici : <span class="big">${vec("n")}(3 ; −1 ; 2)</span>. Le 5 ne joue pas : il déplace le plan sans le tourner.`,
      consigne: "Plan 3x − y + 2z + 5 = 0 : quel vecteur lui est normal ?",
      verification: { type: "qcm", choix: ["(3 ; −1 ; 2)", "(3 ; −1 ; 5)", "(−1 ; 2 ; 5)"], bonne: 0 },
      dessin: panneau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le jeu vidéo en 3D",
      sorte: "piege",
      question: `Un jeu vidéo en 3D calcule ${vec("u")} · ${vec("v")} avec ${vec("u")}(2 ; 3 ; 1) et ${vec("v")}(1 ; −1 ; 4).<br>Tom écrit : « ${vec("u")} · ${vec("v")} = (2 ; −3 ; 4). »<br><br><b>Combien vaut</b> ${vec("u")} · ${vec("v")} ?`,
      reponse: `Le produit scalaire est un <b>nombre</b>, pas un vecteur : il faut ajouter les produits !<br>2 − 3 + 4 = <span class="big">3</span>.`,
      consigne: "u(2 ; 3 ; 1) et v(1 ; −1 ; 4) : combien vaut u · v ?",
      verification: { type: "qcm", choix: ["(2 ; −3 ; 4)", "3", "9"], bonne: 1 },
      dessin: jeu,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La charpente de cabane",
      sorte: "defi",
      question: `Deux poutres d'une cabane partent du même coin. Elles suivent ${vec("u")}(1 ; 1 ; 0) et ${vec("v")}(1 ; 0 ; 1).<br><br><b>Quel angle</b> font-elles, en degrés ?`,
      reponse: `${vec("u")} · ${vec("v")} = 1 + 0 + 0 = 1. Les deux normes valent √2.<br>cos θ = 1 ÷ (√2 × √2) = 1 ÷ 2, donc θ = <span class="big">60°</span>.`,
      consigne: "u(1 ; 1 ; 0) et v(1 ; 0 ; 1) : quel angle font-ils (en degrés) ?",
      verification: { type: "courte", attendus: ["60", "60°"], unite: "°" },
      dessin: charpente,
    },
  ],
};

export default problemes;
