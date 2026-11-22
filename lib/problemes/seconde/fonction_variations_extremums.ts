// Énigmes à projeter — seconde, notion fonction_variations_extremums (la
// serre, comparer sans calculer, le coût minimal, l'enclos de 40 m, piège des
// deux morceaux croissants, défi de la boîte sans couvercle). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, fleche } from "../dessins-ecole";
import { repere } from "../dessins-2de";

// Tableau de variations : x, puis flèches.
const serre = svg(
  "Le tableau de variations de la température dans une serre de 6 heures à 22 heures",
  r(30, 80, 420, 190, C.craie, 0, 3) + l(30, 130, 450, 130, C.craie, 3) + l(120, 80, 120, 270, C.craie, 3) +
    t(75, 113, "heure", C.craie, 18) + t(75, 210, "T (°C)", C.craie, 18) + t(145, 113, "6", C.craie, 22) + t(285, 113, "14", C.craie, 22) + t(425, 113, "22", C.craie, 22) +
    t(145, 255, "18", C.craie, 22) + t(285, 160, "32", C.bleu, 24) + t(425, 255, "20", C.craie, 22) + fleche(165, 240, 260, 170, C.rose, 3) + fleche(310, 170, 405, 240, C.rose, 3) +
    t(240, 350, `la plus haute température${NB}?`, C.rose, 24)
);

const decroissante = (() => {
  const R = repere(0, 10, 0, 6, { gl: 380, gh: 260, gy: 40, gx: 60, pas: 1, pasE: 1, etiquettes: false });
  return svg("Une fonction strictement décroissante sur l'intervalle de 0 à 10, avec x égale 3 et x égale 7",
    R.fond + R.courbe((x) => 5.5 - 0.45 * x - 0.01 * x * x, 0, 10, C.bleu, 5) + l(R.X(3), R.Y(0), R.X(3), R.Y(5.5 - 1.35 - 0.09), C.jaune, 3, "8 6") +
      l(R.X(7), R.Y(0), R.X(7), R.Y(5.5 - 3.15 - 0.49), C.jaune, 3, "8 6") + t(R.X(3), R.Y(0) + 28, "3", C.craie, 22) + t(R.X(7), R.Y(0) + 28, "7", C.craie, 22) +
      t(R.X(0), R.Y(0) + 28, "0", C.pale, 18) + t(R.X(10), R.Y(0) + 28, "10", C.pale, 18) + t(240, 395, `f(3) ou f(7)${NB}?`, C.rose, 26));
})();

const cout = (() => {
  const R = repere(0, 6, 0, 10, { gl: 330, gh: 300, gy: 30, gx: 90, pas: 1, pasE: 2 });
  return svg("La courbe du coût C de x égale x au carré moins 6x plus 10, en forme de U",
    R.fond + R.courbe((x) => x * x - 6 * x + 10, 0, 6, C.bleu, 5) + t(R.X(4.6), R.Y(9.2), "C(x)", C.bleu, 22) + t(240, 400, `le coût minimal${NB}?`, C.rose, 24));
})();

const enclos = svg(
  "Un enclos rectangulaire fait avec 40 mètres de clôture",
  r(90, 110, 300, 150, C.jaune, 0.12, 4).replace("/>", ` stroke-dasharray="14 8"/>`) + t(240, 95, "20 − x", C.craie, 24) + t(78, 192, "x", C.craie, 24, "end") +
    p("M150 245 q10 -20 20 0 M300 245 q10 -20 20 0", C.pale, 3) + t(240, 192, "40 m de clôture", C.craie, 22) + t(240, 340, `la plus grande aire${NB}?`, C.rose, 26)
);

const piege = (() => {
  const R = repere(0, 5, 0, 6, { gl: 360, gh: 260, gy: 40, gx: 70, pasE: 1 });
  return svg("Une fonction croissante sur 0 2, qui retombe, puis croissante sur 3 5",
    R.fond + R.courbe((x) => 1 + 2 * x, 0, 2, C.bleu, 5) + R.courbe((x) => 5 - 4 * (x - 2), 2, 3, C.pale, 3) + R.courbe((x) => 1 + 0.5 * (x - 3), 3, 5, C.bleu, 5) +
      t(240, 395, `f(1) &lt; f(4)${NB}?`, C.rose, 26));
})();

// La boîte : carré de 12 cm (1 cm = 20 px), coins de x = 2 cm.
const boite = svg(
  "Un carré de carton de 12 centimètres, on découpe un carré de côté x à chaque coin pour plier une boîte",
  r(120, 40, 240, 240, C.jaune, 0.15, 4) + [[120, 40], [320, 40], [120, 240], [320, 240]].map(([x, y]) => r(x, y, 40, 40, C.rose, 0.3, 2)).join("") +
    l(160, 80, 320, 80, C.pale, 2, "6 6") + l(160, 240, 320, 240, C.pale, 2, "6 6") + l(160, 80, 160, 240, C.pale, 2, "6 6") + l(320, 80, 320, 240, C.pale, 2, "6 6") +
    t(240, 30, "12 cm", C.craie, 22) + t(140, 66, "x", C.rose, 20) + t(240, 330, "V = x(12 − 2x)²", C.bleu, 28) + t(240, 385, `quel x pour le plus grand volume${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "fonction_variations_extremums",
  titre: "Énigmes des variations et des extremums",
  description: "La serre, comparer sans calculer, le coût minimal, l'enclos de 40 m, le piège des deux morceaux croissants, le défi de la boîte sans couvercle : tableau de variations, maximum, minimum, comparer des images.",
  problemes: [
    {
      tag: "Énigme 1 · La serre",
      titre: "Le tableau de variations",
      question: `La température d'une serre monte de <b>18 °C</b> à 6 h jusqu'à <b>32 °C</b> à 14 h, puis descend jusqu'à <b>20 °C</b> à 22 h.<br><br><b>Quel est le maximum</b> de la température entre 6 h et 22 h ?`,
      reponse: `Le tableau de variations monte puis descend : le sommet est à 14 h.<br>Le maximum est <span class="big">32 °C</span>, atteint à 14 h.`,
      consigne: "Quel est le maximum de la température, en °C ?",
      verification: { type: "courte", attendus: ["32"], unite: "°C" },
      dessin: serre,
    },
    {
      tag: "Énigme 2 · Comparer sans calculer",
      titre: "Ça descend",
      question: `f est <b>strictement décroissante</b> sur [0 ; 10]. On ne connaît pas sa formule.<br><br><b>Que peut-on dire</b> de f(3) et f(7) ?`,
      reponse: `Décroissante : quand x augmente, f(x) diminue. Or 3 &lt; 7.<br>Donc <span class="big">f(3) > f(7)</span> : une fonction décroissante change l'ordre.`,
      consigne: "f strictement décroissante sur [0 ; 10] : comparer f(3) et f(7).",
      verification: { type: "qcm", choix: ["f(3) < f(7)", "f(3) > f(7)", "On ne peut pas savoir"], bonne: 1 },
      dessin: decroissante,
    },
    {
      tag: "Énigme 3 · Le coût minimal",
      titre: "Au fond du U",
      question: `Le coût de fabrication est <b>C(x) = x² − 6x + 10</b> milliers d'euros, pour x centaines de pièces.<br>On remarque que C(x) = (x − 3)² + 1.<br><br><b>Quel est le coût minimal</b> ?`,
      reponse: `(x − 3)² est un carré : il vaut au moins 0, et 0 pour x = 3.<br>Donc C(x) ≥ 1, avec C(3) = 1. Coût minimal : 1 millier d'euros, soit <span class="big">1 000 €</span>, pour 300 pièces.`,
      consigne: "Quel est le coût minimal ?",
      verification: { type: "qcm", choix: ["1 000 €", "10 000 €", "3 000 €"], bonne: 0 },
      dessin: cout,
    },
    {
      tag: "Énigme 4 · L'enclos",
      titre: "40 m de clôture",
      question: `Avec <b>40 m</b> de clôture, on fait un enclos rectangulaire de côtés x et 20 − x. Son aire vaut A(x) = x(20 − x) = 100 − (x − 10)².<br><br><b>Quelle est l'aire maximale</b> ?`,
      reponse: `(x − 10)² vaut au moins 0, donc A(x) ≤ 100, et A(10) = 100.<br>Aire maximale : <span class="big">100 m²</span>, pour un carré de 10 m de côté.`,
      consigne: "Quelle est l'aire maximale de l'enclos, en m² ?",
      verification: { type: "courte", attendus: ["100"], unite: "m²" },
      dessin: enclos,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux morceaux qui montent",
      sorte: "piege",
      question: `f est croissante sur [0 ; 2] et croissante sur [3 ; 5].<br><br>A-t-on <b>forcément</b> f(1) &lt; f(4) ?<br>A. Oui, toujours B. Non, jamais C. Pas forcément`,
      reponse: `Entre 2 et 3, f peut redescendre ! Sur le dessin : f(1) = 3 et f(4) = 1,5.<br><span class="big">Pas forcément</span>. On ne compare que deux nombres d'un <b>même</b> intervalle où f est croissante.`,
      consigne: "f croissante sur [0 ; 2] et sur [3 ; 5] : a-t-on forcément f(1) < f(4) ?",
      verification: { type: "qcm", choix: ["Oui, toujours", "Non, jamais", "Pas forcément"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La boîte sans couvercle",
      sorte: "defi",
      question: `Dans un carré de carton de <b>12 cm</b>, on découpe un carré de côté x à chaque coin, puis on plie : le volume vaut <b>V(x) = x(12 − 2x)²</b>.<br><br>Parmi x = 1, 2, 3, 4, <b>lequel donne le plus grand volume</b> ?`,
      reponse: `V(1) = 1 × 10² = 100 ; V(2) = 2 × 8² = 128 ; V(3) = 3 × 6² = 108 ; V(4) = 4 × 4² = 64.<br>Le plus grand : <span class="big">x = 2</span>, avec 128 cm³. Le volume monte puis redescend.`,
      consigne: "Parmi 1, 2, 3, 4, quel x donne le plus grand volume ?",
      verification: { type: "courte", attendus: ["2"], unite: "cm" },
      dessin: boite,
    },
  ],
};

export default problemes;
