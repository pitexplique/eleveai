// Énigmes à projeter — 3e, notion litteral_calcul (double distributivité,
// factoriser x² − 49, programme de calcul prouvé, le terrain (x + 3)(x − 3),
// piège −2(x − 4), défi 1 001 × 999 de tête). 21/11/2026.
// ⛔ Ne reprend pas la 4e (concert, dojo, patio, trampoline, cadre photo).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

// (x + 3)(x + 5) : le rectangle découpé en 4 (x dessiné = 6, 1 = 26 px).
const rectangle = svg(
  "Un rectangle de côtés x + 3 et x + 5, découpé en quatre morceaux",
  r(80, 80, 156, 156, C.bleu, 0.2, 3) + r(236, 80, 130, 156, C.jaune, 0.25, 3) + r(80, 236, 156, 78, C.jaune, 0.25, 3) + r(236, 236, 130, 78, C.rose, 0.25, 3) +
    t(158, 65, "x", C.craie, 26) + t(301, 65, "5", C.craie, 26) + t(65, 165, "x", C.craie, 26, "end") + t(65, 282, "3", C.craie, 26, "end") +
    t(158, 165, "x²", C.bleu, 26) + t(301, 165, "5x", C.jaune, 26) + t(158, 282, "3x", C.jaune, 26) + t(301, 282, "15", C.rose, 26) +
    t(240, 375, `(x + 3)(x + 5) = ?`.replace(" ?", `${NB}?`), C.rose, 28)
);

// x² − 49 au tableau.
const facto = svg(
  "Au tableau : factoriser x au carré moins 49",
  t(240, 170, "x² − 49", C.bleu, 64) + t(240, 250, "= ( … )( … )", C.craie, 40) + t(240, 340, "a² − b² = (a − b)(a + b)", C.pale, 22)
);

// Le programme de calcul en 4 étapes.
const programme = svg(
  "Un programme de calcul en quatre étapes",
  ["Choisir un nombre", "Ajouter 1", "Élever au carré", "Soustraire le carré du nombre de départ"].map((e, k) =>
    r(50, 40 + 72 * k, 380, 52, k ? C.craie : C.bleu, 0.08, 3, 10) + t(240, 74 + 72 * k, e, C.craie, k === 3 ? 18 : 22) + (k < 3 ? l(240, 92 + 72 * k, 240, 112 + 72 * k, C.pale, 3) : "")
  ).join("") + t(240, 375, `et avec 100${NB}?`, C.rose, 28)
);

// Le terrain carré (x = 8 m) et le rectangle (x + 3) × (x − 3) : 1 m = 26 px.
const terrain = svg(
  "Un terrain carré de côté x, et un rectangle de côtés x + 3 et x − 3 dessiné par-dessus",
  r(80, 70, 208, 208, C.pale, 0.12, 3).replace("/>", ' stroke-dasharray="10 6"/>') + r(80, 148, 286, 130, C.jaune, 0.25, 4) +
    t(184, 55, "x", C.pale, 24) + t(68, 178, "x", C.pale, 24, "end") + t(223, 305, "x + 3", C.jaune, 24) + t(380, 220, "x − 3", C.jaune, 22, "start").replace('x="380"', 'x="374"') +
    t(240, 370, `l'aire change-t-elle${NB}?`, C.rose, 26) + t(240, 405, "dessiné pour x = 8", C.pale, 16)
);

const piege = svg(
  "Le cahier de Malo : moins 2 fois parenthèse x moins 4 égale moins 2x moins 8",
  r(40, 90, 400, 200, C.craie, 0, 3, 10) + [150, 200, 250].map((y) => l(60, y, 420, y, C.pale, 1)).join("") +
    t(240, 190, "−2(x − 4) = −2x − 8", C.bleu, 38) + t(400, 140, "✓ ?", C.rose, 30) + t(240, 350, "le cahier de Malo", C.pale, 22)
);

const defi = svg(
  "1 001 fois 999, à calculer de tête sans poser l'opération",
  t(240, 170, "1 001 × 999", C.bleu, 60) + t(240, 250, "de tête, en 10 secondes", C.craie, 26) + t(240, 330, "🧠 ⏱", C.craie, 40)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "litteral_calcul",
  titre: "Énigmes du calcul littéral",
  description: "Le rectangle en quatre morceaux, x² − 49 à factoriser, le programme de calcul à prouver, le terrain carré transformé, le piège du signe moins, le défi 1 001 × 999 de tête : double distributivité, identités remarquables, factorisation et preuve.",
  problemes: [
    {
      tag: "Énigme 1 · Développer",
      titre: "Le rectangle en quatre",
      question: `Développe et réduis :<br><br><b>(x + 3)(x + 5)</b><br><br>Le rectangle découpé t'aide : additionne les quatre morceaux.`,
      reponse: `(x + 3)(x + 5) = x² + 5x + 3x + 15 = <span class="big">x² + 8x + 15</span>.<br>Chaque terme de la première parenthèse multiplie chaque terme de la seconde.`,
      consigne: "Quelle est la forme développée de (x + 3)(x + 5) ?",
      verification: {"type":"qcm","choix":["x² + 15","x² + 8x + 15","2x + 8"],"bonne":1},
      dessin: rectangle,
    },
    {
      tag: "Énigme 2 · Factoriser",
      titre: "Une différence de carrés",
      question: `Factorise :<br><br><b>x² − 49</b>`,
      reponse: `49 = 7², donc x² − 49 = x² − 7², de la forme a² − b².<br>x² − 49 = <span class="big">(x − 7)(x + 7)</span>.<br>Vérif : (x − 7)(x + 7) = x² + 7x − 7x − 49 = x² − 49.`,
      consigne: "Quelle est la forme factorisée de x² − 49 ?",
      verification: {"type":"qcm","choix":["(x − 7)(x + 7)","(x − 7)²","x(x − 49)"],"bonne":0},
      dessin: facto,
    },
    {
      tag: "Énigme 3 · Le programme de calcul",
      titre: "Toujours le même tour ?",
      question: `Avec 4 : 4 + 1 = 5, 5² = 25, 25 − 4² = 25 − 16 = 9.<br>Prouve que le résultat vaut toujours <b>2x + 1</b> si on choisit x.<br><br><b>Quel résultat</b> obtient-on en choisissant 100 ?`,
      reponse: `Avec x : (x + 1)² − x² = x² + 2x + 1 − x² = <b>2x + 1</b>. C'est prouvé pour tous les nombres.<br>Avec 100 : 2 × 100 + 1 = <span class="big">201</span>, sans calculer 101² !`,
      consigne: "Quel résultat donne le programme avec 100 ?",
      verification: {"type":"courte","attendus":["201"]},
      dessin: programme,
    },
    {
      tag: "Énigme 4 · Le terrain",
      titre: "Plus long, moins large",
      question: `Un terrain carré a un côté de <b>x mètres</b>. On l'allonge de <b>3 m</b> dans un sens et on le raccourcit de <b>3 m</b> dans l'autre.<br><br>L'aire change-t-elle ? <b>De combien de m²</b> ?`,
      reponse: `Nouvelle aire : (x + 3)(x − 3) = x² − 9.<br>L'aire <span class="big">diminue de 9 m²</span>, quel que soit x !<br>Exemple : x = 8 donne 64 m² puis 11 × 5 = 55 m².`,
      consigne: "De combien de m² l'aire diminue-t-elle ?",
      verification: {"type":"courte","attendus":["9"],"unite":"m²"},
      dessin: terrain,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le signe moins",
      sorte: "piege",
      question: `Malo a développé :<br><br><b>−2(x − 4) = −2x − 8</b><br><br>A-t-il raison ? Sinon, quelle est la bonne réponse ?`,
      reponse: `−2 multiplie aussi le −4 : (−2) × (−4) = +8.<br>−2(x − 4) = <span class="big">−2x + 8</span>.<br>Vérif avec x = 0 : −2 × (−4) = 8, et pas −8.`,
      consigne: "Quelle est la forme développée de −2(x − 4) ?",
      verification: {"type":"qcm","choix":["−2x − 8","−2x + 8","2x − 8"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Un calcul éclair",
      sorte: "defi",
      question: `Calcule <b>de tête</b>, en quelques secondes :<br><br><b>1 001 × 999</b><br><br>Indice : 1 001 = 1 000 + 1 et 999 = 1 000 − 1.`,
      reponse: `(1 000 + 1)(1 000 − 1) = 1 000² − 1² = 1 000 000 − 1 = <span class="big">999 999</span>.<br>L'identité (a + b)(a − b) = a² − b² fait le travail.`,
      consigne: "Combien vaut 1 001 × 999 ?",
      verification: {"type":"courte","attendus":["999999","999 999"]},
      dessin: defi,
    },
  ],
};

export default problemes;
