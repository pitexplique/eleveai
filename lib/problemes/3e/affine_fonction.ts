// Énigmes à projeter — 3e, notion affine_fonction (le taxi, linéaire ou
// affine, lire a et b sur une droite, la voiture électrique, piège « deux
// fois plus loin, deux fois plus cher », défi Celsius = Fahrenheit). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const repere = (X: (v: number) => number, Y: (v: number) => number, xs: number[], ys: number[], x0: number, x1: number, y0: number, y1: number) =>
  xs.map((v) => l(X(v), Y(y0), X(v), Y(y1), C.pale, 1)).join("") + ys.map((v) => l(X(x0), Y(v), X(x1), Y(v), C.pale, 1)).join("") +
  l(X(x0), Y(0), X(x1) + 10, Y(0), C.craie, 3) + l(X(0), Y(y0), X(0), Y(y1) - 10, C.craie, 3);

const taxi = svg(
  "Un taxi : 4 euros au départ, puis 1,50 euro par kilomètre",
  r(80, 170, 320, 90, C.jaune, 0.3, 4, 20) + p("M140 170 l30 -50 l140 0 l30 50", C.jaune, 4, 0.15) + r(200, 98, 80, 22, C.craie, 0.8, 2, 4) + t(240, 115, "TAXI", C.jaune, 16) +
    `<circle cx="150" cy="265" r="26" fill="${C.craie}"/><circle cx="330" cy="265" r="26" fill="${C.craie}"/>` +
    t(240, 335, "4 € + 1,50 € par km", C.craie, 26) + t(240, 385, `10 km${NB}: ? €`, C.rose, 28)
);

const trois = svg(
  "Trois fonctions au tableau : f de x égale 3x, g de x égale 3x plus 1, h de x égale x au carré",
  t(240, 110, "f(x) = 3x", C.bleu, 40) + t(240, 190, "g(x) = 3x + 1", C.jaune, 40) + t(240, 270, "h(x) = x²", C.rose, 40) + t(240, 360, `laquelle est linéaire${NB}?`, C.craie, 26)
);

// La droite passe par (0 ; 2) et (3 ; 8) : 1 unité = 40 px en x, 30 px en y.
const droite = () => {
  const X = (v: number) => 120 + 40 * v, Y = (v: number) => 380 - 30 * v;
  return svg("Une droite dans un repère, qui passe par les points (0 ; 2) et (3 ; 8)",
    repere(X, Y, [-2, -1, 1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], -2, 7, 0, 11.5) +
      l(X(-1), Y(0), X(4.5), Y(11), C.bleu, 4) + `<circle cx="${X(0)}" cy="${Y(2)}" r="7" fill="${C.rose}"/><circle cx="${X(3)}" cy="${Y(8)}" r="7" fill="${C.rose}"/>` +
      t(X(0) - 10, Y(2) + 4, "2", C.rose, 20, "end") + t(X(3) + 14, Y(8) + 6, "(3 ; 8)", C.rose, 20, "start") + t(X(1), 410, "1", C.pale, 16) + t(X(0) - 10, Y(1) + 6, "1", C.pale, 16, "end") +
      t(380, 120, `f(x) = ?`.replace(" ?", `${NB}?`), C.bleu, 26));
};

// La batterie : 20 % au départ, +1,5 % par minute.
const batterie = svg(
  "Une batterie de voiture électrique chargée à 20 %, qui gagne 1,5 % par minute",
  r(100, 120, 260, 120, C.craie, 0, 5, 12) + r(360, 155, 22, 50, C.craie, 1, 0, 4) + r(108, 128, 49, 104, C.bleu, 0.45, 0) + r(108 + 49, 128, 147, 104, C.bleu, 0.12, 0) +
    l(108 + 196, 120, 108 + 196, 240, C.rose, 3, "8 6") + t(132, 195, "20 %", C.craie, 22) + t(304, 270, "80 %", C.rose, 24) +
    t(240, 330, "+1,5 % par minute", C.bleu, 26) + t(240, 385, `combien de minutes${NB}?`, C.rose, 26)
);

// Le prix du taxi : f(x) = 1,5x + 4, de 0 à 20 km (1 km = 17 px, 1 € = 8 px).
const piege = () => {
  const X = (v: number) => 70 + 17 * v, Y = (v: number) => 370 - 8 * v;
  return svg("Le prix du taxi en fonction de la distance : une droite qui ne part pas de zéro",
    repere(X, Y, [5, 10, 15, 20], [10, 20, 30, 40], 0, 21, 0, 40) + l(X(0), Y(4), X(20), Y(34), C.jaune, 4) +
      `<circle cx="${X(10)}" cy="${Y(19)}" r="7" fill="${C.bleu}"/><circle cx="${X(20)}" cy="${Y(34)}" r="7" fill="${C.rose}"/>` +
      t(X(10), 395, "10", C.pale, 18) + t(X(20), 395, "20 km", C.pale, 18) + t(X(0) - 8, Y(20) + 6, "20", C.pale, 16, "end") + t(X(0) - 8, Y(40) + 6, "40 €", C.pale, 16, "end") +
      t(X(10) - 10, Y(19) - 16, "19 €", C.bleu, 22, "end") + t(X(20) - 6, Y(34) - 18, `? €`, C.rose, 24, "end"));
};

const thermo = svg(
  "Deux thermomètres : un en degrés Celsius, un en degrés Fahrenheit",
  [130, 350].map((x, k) => r(x - 18, 60, 36, 260, C.craie, 0, 4, 18) + `<circle cx="${x}" cy="335" r="30" fill="${C.rose}" fill-opacity=".6" stroke="${C.craie}" stroke-width="4"/>` +
    r(x - 8, 180, 16, 150, C.rose, 0.6, 0) + t(x, 400, k ? "°F" : "°C", C.craie, 26)).join("") +
    t(240, 150, "F = 1,8 C + 32", C.bleu, 24) + t(240, 230, `C = F${NB}?`, C.rose, 32)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "affine_fonction",
  titre: "Énigmes des fonctions affines",
  description: "Le prix du taxi, la fonction linéaire cachée, la droite à décoder, la recharge de la voiture électrique, le piège « deux fois plus loin, deux fois plus cher », le défi Celsius = Fahrenheit : f(x) = ax + b, coefficient directeur, ordonnée à l'origine.",
  problemes: [
    {
      tag: "Énigme 1 · Le taxi",
      titre: "Le prix de la course",
      question: `Un taxi coûte <b>4 €</b> au départ, puis <b>1,50 €</b> par kilomètre. Le prix vaut f(x) = 1,5x + 4 pour x kilomètres.<br><br><b>Combien coûte</b> une course de 10 km ?`,
      reponse: `f(10) = 1,5 × 10 + 4 = 15 + 4 = <span class="big">19 €</span>.`,
      consigne: "Combien coûte une course de 10 km ?",
      verification: {"type":"courte","attendus":["19"],"unite":"€"},
      dessin: taxi,
    },
    {
      tag: "Énigme 2 · Linéaire ?",
      titre: "Trois fonctions",
      question: `Voici trois fonctions :<br>f(x) = 3x · g(x) = 3x + 1 · h(x) = x²<br><br><b>Laquelle est linéaire</b> ?`,
      reponse: `Une fonction linéaire s'écrit <b>ax</b> : elle traduit une situation de proportionnalité.<br>C'est <span class="big">f(x) = 3x</span>. g est affine (b = 1), h n'est ni l'une ni l'autre.`,
      consigne: "Laquelle de ces fonctions est linéaire ?",
      verification: {"type":"qcm","choix":["g(x) = 3x + 1","h(x) = x²","f(x) = 3x"],"bonne":2},
      dessin: trois,
    },
    {
      tag: "Énigme 3 · Décoder une droite",
      titre: "Trouver a et b",
      question: `La droite représente une fonction affine f. Elle passe par les points <b>(0 ; 2)</b> et <b>(3 ; 8)</b>.<br><br><b>Quelle est</b> l'expression de f(x) ?`,
      reponse: `b se lit sur l'axe vertical : b = 2.<br>Quand x avance de 3, f(x) monte de 8 − 2 = 6 : a = 6 ÷ 3 = 2.<br>Donc <span class="big">f(x) = 2x + 2</span>.`,
      consigne: "Quelle est l'expression de f(x) ?",
      verification: {"type":"qcm","choix":["f(x) = 2x + 2","f(x) = 3x + 2","f(x) = 2x + 3"],"bonne":0},
      dessin: droite(),
    },
    {
      tag: "Énigme 4 · La recharge",
      titre: "La voiture électrique",
      question: `La batterie d'une voiture électrique est chargée à <b>20 %</b>. Sur la borne, elle gagne <b>1,5 % par minute</b>.<br><br>Au bout de <b>combien de minutes</b> atteint-elle 80 % ?`,
      reponse: `Charge après t minutes : c(t) = 1,5t + 20.<br>1,5t + 20 = 80, donc 1,5t = 60 et t = 60 ÷ 1,5 = <span class="big">40 minutes</span>.`,
      consigne: "Au bout de combien de minutes la batterie atteint-elle 80 % ?",
      verification: {"type":"courte","attendus":["40"],"unite":"min"},
      dessin: batterie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux fois plus loin",
      sorte: "piege",
      question: `On reprend le taxi : f(x) = 1,5x + 4. La course de 10 km coûte 19 €.<br>Hugo dit : « 20 km, c'est deux fois plus loin, donc 38 €. »<br><br><b>Combien coûte</b> vraiment la course de 20 km ?`,
      reponse: `f(20) = 1,5 × 20 + 4 = 30 + 4 = <span class="big">34 €</span>.<br>Les 4 € du départ ne se paient qu'une fois : le prix n'est <b>pas proportionnel</b> à la distance. La droite ne passe pas par l'origine.`,
      consigne: "Combien coûte la course de 20 km ?",
      verification: {"type":"qcm","choix":["38 €","34 €","23 €"],"bonne":1},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le même nombre",
      sorte: "defi",
      question: `Aux États-Unis, on mesure la température en degrés Fahrenheit : <b>F = 1,8 C + 32</b>, où C est la température en degrés Celsius.<br><br>À <b>quelle température</b> les deux thermomètres affichent-ils le même nombre ?`,
      reponse: `On cherche C tel que C = 1,8 C + 32. Donc −0,8 C = 32 et C = 32 ÷ (−0,8) = <span class="big">−40</span>.<br>Vérif : 1,8 × (−40) + 32 = −72 + 32 = −40. À −40°, il fait aussi froid dans les deux unités !`,
      consigne: "À quelle température °C et °F affichent-ils le même nombre ?",
      verification: {"type":"courte","attendus":["-40","−40"],"unite":"°"},
      dessin: thermo,
    },
  ],
};

export default problemes;
