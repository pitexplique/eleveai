// Énigmes à projeter — STMG (1re), notion équations et inéquations
// (la facture du serrurier, la location de pédalos, la salle de réunion carrée,
// la brasserie artisanale, piège de l'entrepôt de surgelés, défi du gazon
// synthétique). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const serrurier = svg("La facture du serrurier : 40 euros de déplacement plus 30 euros par heure, total 145 euros",
  r(80, 60, 320, 230, C.craie, 0.08, 3, 10) + t(240, 105, "FACTURE", C.craie, 28) +
    t(110, 160, "Déplacement", C.pale, 22, "start") + t(370, 160, "40 €", C.craie, 22, "end") +
    t(110, 205, "x heures × 30 €", C.pale, 22, "start") + t(370, 205, "?", C.rose, 24, "end") +
    l(110, 228, 370, 228, C.pale, 2) + t(110, 265, "Total", C.craie, 24, "start") + t(370, 265, "145 €", C.craie, 24, "end") +
    t(240, 360, `x${NB}?`, C.rose, 30));

const pedalos = svg("Location de pédalos : 12 euros fixes plus 8 euros par heure, budget 50 euros",
  r(60, 80, 360, 110, C.bleu, 0.15, 3, 12) + t(240, 125, "12 € + 8 € par heure", C.craie, 26) +
    t(240, 168, "budget : 50 € au plus", C.pale, 22) +
    t(240, 260, "12 + 8x ≤ 50", C.craie, 32) + t(240, 340, `heures${NB}?`, C.rose, 28));

const salle = svg("Une salle de réunion carrée de 81 mètres carrés, côté inconnu",
  r(130, 60, 220, 220, C.jaune, 0.2, 3) + t(240, 180, "81 m²", C.craie, 32) +
    t(240, 310, "x", C.pale, 26) + t(370, 178, "x", C.pale, 26, "start") +
    t(240, 380, `x${NB}?`, C.rose, 30));

const brasserie = svg("Le bénéfice de la brasserie : B de x égale x moins 2 fois 10 moins x",
  r(50, 110, 380, 100, C.jaune, 0.2, 3, 10) + t(240, 175, "B(x) = (x − 2)(10 − x)", C.craie, 30) +
    t(240, 280, "B(x) = 0", C.pale, 28) + t(240, 340, `pour x${NB}=${NB}?`, C.rose, 28));

const surgeles = svg("Le stock de l'entrepôt : 500 moins 20x cartons ; on veut plus de 100 cartons. Tom écrit x plus grand que 20",
  r(60, 70, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 132, "500 − 20x > 100", C.craie, 32) +
    t(240, 240, "Tom : « x > 20 »", C.pale, 26) + t(240, 330, "?", C.rose, 34));

const gazon = svg("Un carré de gazon synthétique de côté x : son aire et son périmètre ont la même valeur",
  r(140, 60, 200, 200, C.bleu, 0.25, 3) + t(240, 50, "x", C.pale, 24) + t(355, 168, "x", C.pale, 24, "start") +
    t(240, 320, "aire = périmètre", C.craie, 28) + t(240, 375, `x${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_equations",
  titre: "Énigmes d'équations et d'inéquations",
  description: "La facture du serrurier, la location de pédalos, la salle de réunion carrée, la brasserie artisanale, le piège de l'entrepôt de surgelés, le défi du gazon synthétique : équations du premier degré, inéquations, x² = a, produit nul.",
  problemes: [
    {
      tag: "Énigme 1 · La facture du serrurier",
      titre: "Une équation du premier degré",
      question: `Un serrurier facture 40 € de déplacement.<br>Il ajoute 30 € par heure de travail.<br>La facture totale vaut 145 €.<br><br><b>Combien d'heures a-t-il travaillé</b> ?`,
      reponse: `40 + 30x = 145.<br>30x = 145 − 40 = 105.<br>x = 105 ÷ 30 = <span class="big">3,5 h</span>, soit 3 h 30.`,
      consigne: "40 + 30x = 145. Combien d'heures ?",
      verification: { type: "courte", attendus: ["3,5", "3.5"], unite: "h" },
      dessin: serrurier,
    },
    {
      tag: "Énigme 2 · Les pédalos",
      titre: "Une inéquation",
      question: `Une location de pédalos coûte 12 € fixes.<br>On ajoute 8 € par heure.<br>Un groupe a 50 € au plus.<br><br><b>Combien d'heures entières au maximum</b> peut-il louer ?`,
      reponse: `12 + 8x ≤ 50, donc 8x ≤ 38, donc x ≤ 4,75.<br>En heures entières : <span class="big">4 h</span>.<br>Vérification : 4 h coûtent 44 €, 5 h coûtent 52 € (trop cher).`,
      consigne: "12 + 8x ≤ 50. Combien d'heures entières au maximum ?",
      verification: { type: "qcm", choix: ["4 h", "5 h", "6 h"], bonne: 0 },
      dessin: pedalos,
    },
    {
      tag: "Énigme 3 · La salle de réunion",
      titre: "Une équation x² = a",
      question: `Une entreprise loue une salle de réunion carrée.<br>Son aire vaut 81 m².<br><br><b>Combien mesure son côté</b> ?`,
      reponse: `x² = 81 a deux solutions : 9 et −9.<br>Une longueur est positive : le côté mesure <span class="big">9 m</span>.`,
      consigne: "x² = 81 et x est une longueur. Combien vaut x ?",
      verification: { type: "courte", attendus: ["9"], unite: "m" },
      dessin: salle,
    },
    {
      tag: "Énigme 4 · La brasserie artisanale",
      titre: "Un produit nul",
      question: `Une brasserie artisanale vend x milliers de bouteilles.<br>Son bénéfice vaut B(x) = (x − 2)(10 − x), en milliers d'euros.<br><br><b>Pour quelles valeurs de x</b> le bénéfice est-il nul ?`,
      reponse: `Un produit est nul si l'un des facteurs est nul.<br>x − 2 = 0 donne x = 2. 10 − x = 0 donne x = 10.<br>Le bénéfice est nul pour <span class="big">x = 2 et x = 10</span>.`,
      consigne: "(x − 2)(10 − x) = 0. Quelles sont les solutions ?",
      verification: { type: "qcm", choix: ["−2 et 10", "2 et 10", "20"], bonne: 1 },
      dessin: brasserie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'entrepôt de surgelés",
      sorte: "piege",
      question: `Un entrepôt de surgelés a 500 cartons en stock.<br>Il en sort 20 par jour.<br>Après x jours, il reste 500 − 20x cartons.<br>On veut garder plus de 100 cartons.<br>Tom résout 500 − 20x > 100 et trouve « x > 20 ».<br><br><b>Quelle est la bonne réponse</b> ?`,
      reponse: `500 − 20x > 100, donc −20x > −400.<br>On divise par −20, un nombre NÉGATIF : le sens change.<br><span class="big">x &lt; 20</span>.<br>Test : après 25 jours, il reste 500 − 500 = 0 carton. Tom s'est trompé.`,
      consigne: "Résous 500 − 20x > 100.",
      verification: { type: "qcm", choix: ["x > 20", "x > −20", "x < 20"], bonne: 2 },
      dessin: surgeles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le gazon synthétique",
      sorte: "defi",
      question: `Un magasin vend un carré de gazon synthétique de côté x mètres.<br>Son aire (en m²) et son périmètre (en m) ont la même valeur.<br><br><b>Combien mesure le côté</b> ?`,
      reponse: `Aire : x². Périmètre : 4x. Donc x² = 4x.<br>x² − 4x = 0, soit x(x − 4) = 0 : x = 0 ou x = 4.<br>Un côté nul n'a pas de sens : <span class="big">4 m</span> (aire 16 m², périmètre 16 m).`,
      consigne: "x² = 4x et x > 0. Combien vaut x ?",
      verification: { type: "courte", attendus: ["4"], unite: "m" },
      dessin: gazon,
    },
  ],
};

export default problemes;
