// Énigmes à projeter — 3e, notion equation_resolution (équation du premier
// degré, produit nul, deux tarifs de cinéma, triangle isocèle, piège
// x² = 3x, défi de l'épitaphe de Diophante). 21/11/2026.
// ⛔ Ne reprend pas la 4e (cadenas, balance, enclos, âges).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { frac } from "../outils";

// La balance : 5x − 7 sur un plateau, 3x + 9 sur l'autre.
const balance = svg(
  "Une balance en équilibre : 5x moins 7 d'un côté, 3x plus 9 de l'autre",
  l(240, 120, 240, 330, C.craie, 5) + l(80, 150, 400, 150, C.craie, 5) + p("M180 360 L300 360 L240 320 Z", C.craie, 4, 0.2) +
    p("M60 150 l-30 70 l120 0 l-30 -70", C.pale, 3) + p("M360 150 l-30 70 l120 0 l-30 -70", C.pale, 3) +
    t(90, 255, "5x − 7", C.bleu, 30) + t(390, 255, "3x + 9", C.jaune, 30) + t(240, 90, "=", C.rose, 40) + t(240, 405, `x = ?`.replace(" ?", `${NB}?`), C.rose, 28)
);

// Produit nul.
const produit = svg(
  "Au tableau : x moins 3, fois 2x plus 8, égale 0",
  t(240, 180, "(x − 3)(2x + 8) = 0", C.bleu, 44) + t(240, 260, "un produit est nul si…", C.craie, 26) + t(240, 330, "A × B = 0", C.pale, 26)
);

// Les deux cinémas : droites 8x et 24 + 5x, de 0 à 12 séances (1 séance = 30 px, 1 € = 2,5 px).
const cine = () => {
  const X = (n: number) => 70 + 30 * n, Y = (e: number) => 360 - 2.5 * e;
  return svg(
    "Deux tarifs de cinéma en graphique : 8 euros la séance, ou 24 euros plus 5 euros la séance",
    l(70, 360, 440, 360, C.craie, 3) + l(70, 360, 70, 50, C.craie, 3) +
      l(X(0), Y(0), X(12), Y(96), C.bleu, 4) + l(X(0), Y(24), X(12), Y(84), C.jaune, 4) +
      t(X(11.6), Y(96) - 6, "A", C.bleu, 24) + t(X(12) + 4, Y(84) + 28, "B", C.jaune, 24) +
      t(250, 410, "nombre de séances", C.pale, 16) + t(80, 45, "prix (€)", C.pale, 18, "start") +
      [0, 4, 8, 12].map((n) => t(X(n), 382, n, C.pale, 16)).join("") + t(160, 120, `même prix${NB}?`, C.rose, 26)
  );
};

// Triangle isocèle 12, 12, 9 au bon rapport : 1 cm = 25 px.
const triangle = () => {
  const h = Math.sqrt(12 * 12 - 4.5 * 4.5) * 25; // ≈ 278
  const B: [number, number] = [127.5, 360], Cc: [number, number] = [352.5, 360], A: [number, number] = [240, Math.round(360 - h)];
  return svg(
    "Un triangle isocèle : deux côtés de 2x, une base de x + 3",
    p(`M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z`, C.craie, 4, 0) + t(240, 395, "x + 3", C.bleu, 26) +
      t(160, 220, "2x", C.jaune, 28, "end") + t(320, 220, "2x", C.jaune, 28, "start") +
      t(400, 120, "périmètre", C.pale, 20) + t(400, 150, "33 cm", C.craie, 26) + t(80, 120, `base${NB}?`, C.rose, 28)
  );
};

const piege = svg(
  "Le brouillon de Jade : x au carré égale 3x, on divise par x, donc x égale 3",
  r(50, 80, 380, 230, C.craie, 0, 3, 10) + t(240, 140, "x² = 3x", C.bleu, 36) + t(240, 200, "je divise par x", C.pale, 22) + t(240, 260, "x = 3", C.bleu, 36) +
    t(400, 130, "?", C.rose, 40) + t(240, 370, "le brouillon de Jade", C.pale, 22)
);

// La vie de Diophante en bande : 1/6, 1/12, 1/7, 5 ans, 1/2, 4 ans (84 ans = 420 px).
const diophante = () => {
  const parts: [number, string, string][] = [[14, C.jaune, "1/6"], [7, C.bleu, "1/12"], [12, C.rose, "1/7"], [5, C.pale, "5"], [42, C.jaune, "1/2"], [4, C.pale, "4"]];
  let x = 30, s = "";
  for (const [a, c, e] of parts) { s += r(x, 170, a * 5, 60, c, 0.3, 2) + (a >= 7 ? t(x + a * 2.5, 210, e, C.craie, a >= 12 ? 20 : 15) : ""); x += a * 5; }
  return svg("La vie de Diophante en une bande : enfance, jeunesse, avant le mariage, avant le fils, la vie du fils, les dernières années", s +
    t(240, 140, "la vie de Diophante", C.craie, 24) + t(240, 280, "5 ans et 4 ans en gris", C.pale, 18) + t(240, 350, `âge${NB}?`, C.rose, 30));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "equation_resolution",
  titre: "Énigmes des équations",
  description: "La balance en équilibre, le produit nul, les deux tarifs du cinéma, le triangle isocèle, le piège de la division par x, le défi de l'épitaphe de Diophante : résoudre une équation du premier degré, une équation produit, mettre un problème en équation.",
  problemes: [
    {
      tag: "Énigme 1 · L'équilibre",
      titre: "La balance",
      question: `Résous l'équation :<br><br><b>5x − 7 = 3x + 9</b>`,
      reponse: `On enlève 3x des deux côtés : 2x − 7 = 9. On ajoute 7 : 2x = 16. On divise par 2 : <span class="big">x = 8</span>.<br>Vérif : 5 × 8 − 7 = 33 et 3 × 8 + 9 = 33.`,
      consigne: "Quelle est la solution de 5x − 7 = 3x + 9 ?",
      verification: {"type":"courte","attendus":["8","x=8"]},
      dessin: balance,
    },
    {
      tag: "Énigme 2 · Le produit nul",
      titre: "Deux solutions",
      question: `Résous l'équation :<br><br><b>(x − 3)(2x + 8) = 0</b>`,
      reponse: `Un produit est nul si l'un de ses facteurs est nul.<br>x − 3 = 0 donne x = 3. 2x + 8 = 0 donne x = −4.<br>Solutions : <span class="big">x = 3 ou x = −4</span>.`,
      consigne: "Quelles sont les solutions de (x − 3)(2x + 8) = 0 ?",
      verification: {"type":"qcm","choix":["x = −3 ou x = 4","x = 3 seulement","x = 3 ou x = −4"],"bonne":2},
      dessin: produit,
    },
    {
      tag: "Énigme 3 · Le cinéma",
      titre: "Deux tarifs",
      question: `Tarif A : <b>8 €</b> la séance. Tarif B : une carte à <b>24 €</b>, puis <b>5 €</b> la séance.<br><br>Pour <b>combien de séances</b> les deux tarifs coûtent-ils pareil ?`,
      reponse: `On cherche x tel que 8x = 24 + 5x. Donc 3x = 24 et <span class="big">x = 8 séances</span>.<br>Les deux coûtent alors 64 €. Au-delà de 8 séances, le tarif B est moins cher.`,
      consigne: "Pour combien de séances les deux tarifs sont-ils égaux ?",
      verification: {"type":"courte","attendus":["8"],"unite":"séances"},
      dessin: cine(),
    },
    {
      tag: "Énigme 4 · Le triangle",
      titre: "Le triangle isocèle",
      question: `Un triangle isocèle a deux côtés de <b>2x cm</b> et une base de <b>(x + 3) cm</b>. Son périmètre vaut <b>33 cm</b>.<br><br><b>Combien mesure</b> la base ?`,
      reponse: `2x + 2x + x + 3 = 33, donc 5x + 3 = 33, 5x = 30, x = 6.<br>La base mesure 6 + 3 = <span class="big">9 cm</span> (et les deux autres côtés 12 cm).<br>Vérif : 12 + 12 + 9 = 33.`,
      consigne: "Combien mesure la base du triangle ?",
      verification: {"type":"courte","attendus":["9"],"unite":"cm"},
      dessin: triangle(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Une solution perdue",
      sorte: "piege",
      question: `Jade résout <b>x² = 3x</b>. Elle divise par x des deux côtés et trouve x = 3.<br><br>A-t-elle trouvé <b>toutes</b> les solutions ?`,
      reponse: `Non ! Diviser par x est interdit si x vaut 0. Or 0² = 3 × 0 : 0 est solution.<br>Bonne méthode : x² − 3x = 0, donc x(x − 3) = 0, et <span class="big">x = 0 ou x = 3</span>.`,
      consigne: "Quelles sont les solutions de x² = 3x ?",
      verification: {"type":"qcm","choix":["x = 3 seulement","x = 0 ou x = 3","x = 0 seulement"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'épitaphe de Diophante",
      sorte: "defi",
      question: `Sur la tombe du mathématicien Diophante, on raconte qu'il était écrit :<br>« Son enfance dura ${frac(1, 6)} de sa vie. Après ${frac(1, 12)} de plus, sa barbe poussa. Après ${frac(1, 7)} de plus, il se maria. 5 ans plus tard naquit son fils, qui vécut la moitié de la vie de son père. Diophante mourut 4 ans après son fils. »<br><br><b>À quel âge</b> est-il mort ?`,
      reponse: `Avec x son âge : x/6 + x/12 + x/7 + 5 + x/2 + 4 = x.<br>Sur 84 : 14x + 7x + 12x + 42x = 75x, donc 75x/84 + 9 = x, soit 9x/84 = 9.<br>x = <span class="big">84 ans</span>. Vérif : 14 + 7 + 12 + 5 + 42 + 4 = 84.`,
      consigne: "À quel âge Diophante est-il mort ?",
      verification: {"type":"courte","attendus":["84"],"unite":"ans"},
      dessin: diophante(),
    },
  ],
};

export default problemes;
