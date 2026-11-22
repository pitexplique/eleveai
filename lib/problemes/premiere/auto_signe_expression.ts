// Énigmes à projeter — première (sans spé maths), notion auto_signe_expression
// (la fusée à eau, la vente de gâteaux de l'association, la chambre froide, la
// carte de transport, piège de x² = 3x où l'on divise par x, défi des entiers
// gagnants). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repere, tableau } from "../dessins-2de";

const fusee = (() => {
  const R = repere(0, 4.5, 0, 9, { gl: 340, gh: 290, gy: 30, gx: 90, pasE: 1, pas: 1 });
  return svg("La hauteur de la fusée à eau, t fois 8 moins 2t : une arche qui part de 0 et retombe au sol",
    R.fond + R.courbe((x) => x * (8 - 2 * x), 0, 4, C.bleu, 5) + R.point(0, 0, C.craie, 7) + R.point(4, 0, C.rose, 8) +
      t(R.X(2), R.Y(8) - 14, "h(t) = t(8 − 2t)", C.bleu, 20) + t(R.X(4), R.Y(0) - 16, "?", C.rose, 24) +
      t(R.X(4.5), R.Y(0) + 46, "t (s)", C.pale, 17, "end") + t(240, 400, `quand retombe-t-elle${NB}?`, C.rose, 24));
})();

const gateaux = (() => {
  const R = repere(0, 30, -30, 30, { gl: 330, gh: 290, gy: 30, gx: 100, pasE: 10, pas: 10 });
  return svg("Le bénéfice 2x moins 30 : une droite qui coupe l'axe des abscisses en 15",
    R.fond + R.courbe((x) => 2 * x - 30, 0, 30, C.jaune, 5) + R.point(15, 0, C.rose, 8) +
      t(R.X(20), R.Y(24), "B(x) = 2x − 30", C.jaune, 18, "end") +
      t(240, 400, `quand est-il positif${NB}?`, C.rose, 24));
})();

const froide = svg("Le tableau de signes de (x − 1)(x − 5) : plus, zéro, moins, zéro, plus",
  tableau(20, 70, [120, 46, 46, 46, 46, 46, 46, 46], 56, [
    ["x", "0", "", "1", "", "5", "", "8"],
    ["x − 1", "", "−", "0", "+", "", "+", ""],
    ["x − 5", "", "−", "", "−", "0", "+", ""],
    ["produit", "", "+", "0", "?", "0", "+", ""],
  ], (i, j) => (i === 3 && j === 4 ? C.rose : i === 0 ? C.pale : C.craie), 20) +
    t(240, 330, "T(x) = (x − 1)(x − 5)", C.bleu, 22) + t(240, 395, `quand T est-elle négative${NB}?`, C.rose, 24));

const carte = (() => {
  const R = repere(0, 6, -6, 12, { gl: 330, gh: 290, gy: 30, gx: 100, pasE: 2, pas: 2 });
  return svg("Le crédit de la carte, 12 moins 3x, décroît et devient nul pour 4 trajets",
    R.fond + R.courbe((x) => 12 - 3 * x, 0, 6, C.bleu, 5) + R.point(4, 0, C.rose, 8) +
      t(R.X(2.4), R.Y(9.6), "C(x) = 12 − 3x", C.bleu, 18, "start") +
      t(240, 400, `et après 4 trajets${NB}?`, C.rose, 24));
})();

const divise = svg("x² = 3x : un élève divise par x et ne trouve que 3",
  t(240, 80, "x² = 3x", C.craie, 40) + l(240, 100, 140, 170, C.pale, 3) + l(240, 100, 340, 170, C.pale, 3) +
    r(50, 180, 180, 110, C.rose, 0.12, 3, 10) + t(140, 220, "÷ x", C.rose, 24) + t(140, 265, "x = 3 seulement", C.rose, 20) +
    r(250, 180, 180, 110, C.bleu, 0.12, 3, 10) + t(340, 220, "x(x − 3) = 0", C.bleu, 22) + t(340, 265, "x = 3 ou x = ?", C.bleu, 20) +
    t(240, 385, `la solution oubliée${NB}?`, C.rose, 26));

const gagnants = (() => {
  let s = "";
  for (let n = 0; n <= 11; n++) {
    const x = 50 + n * 35;
    const dedans = n > 2 && n < 9;
    s += l(x, 200, x, 214, C.craie, 2) + t(x, 245, n, dedans ? C.bleu : C.pale, 18);
    if (dedans) s += `<circle cx="${x}" cy="207" r="8" fill="${C.bleu}"/>`;
  }
  return svg("Une droite des entiers de 0 à 11 ; le produit (n − 2)(n − 9) est négatif entre 2 et 9",
    t(240, 90, "(n − 2)(n − 9) &lt; 0", C.craie, 30) + l(40, 207, 445, 207, C.craie, 3) + s +
      `<circle cx="120" cy="207" r="9" fill="none" stroke="${C.rose}" stroke-width="3"/><circle cx="365" cy="207" r="9" fill="none" stroke="${C.rose}" stroke-width="3"/>` +
      t(240, 385, `combien d'entiers${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_signe_expression",
  titre: "Énigmes du signe d'une expression",
  description: "La fusée à eau, la vente de gâteaux, la chambre froide, la carte de transport, le piège de x² = 3x, le défi des entiers gagnants : équation produit nul, signe d'une expression du premier degré, tableau de signes d'un produit.",
  problemes: [
    {
      tag: "Énigme 1 · La fusée à eau",
      titre: "Un produit nul",
      question: `Au club de sciences, la hauteur d'une fusée à eau est h(t) = t(8 − 2t), en mètres, t secondes après le départ.<br><br><b>Au bout de combien de secondes</b> retombe-t-elle au sol ?`,
      reponse: `Au sol, h(t) = 0 : t = 0 (le départ) ou 8 − 2t = 0.<br>8 − 2t = 0 donne <span class="big">t = 4 s</span>.`,
      consigne: "t(8 − 2t) = 0 avec t > 0 : que vaut t ?",
      verification: { type: "courte", attendus: ["4"], unite: "s" },
      dessin: fusee,
    },
    {
      tag: "Énigme 2 · La vente de gâteaux",
      titre: "Le signe de ax + b",
      question: `Une association vend des gâteaux pour un voyage. Son bénéfice, pour x gâteaux vendus, est B(x) = 2x − 30, en euros.<br><br><b>À partir de quand</b> le bénéfice est-il positif ?`,
      reponse: `2x − 30 > 0, donc 2x > 30 et x > 15.<br>Il faut vendre <span class="big">plus de 15 gâteaux</span>. Le coefficient 2 est positif : B est négatif avant 15, positif après.`,
      consigne: "B(x) = 2x − 30 : pour quels x le bénéfice est-il positif ?",
      verification: { type: "qcm", choix: ["Plus de 15 gâteaux", "Plus de 30 gâteaux", "Plus de 2 gâteaux"], bonne: 0 },
      dessin: gateaux,
    },
    {
      tag: "Énigme 3 · La chambre froide",
      titre: "Un tableau de signes",
      question: `Pendant une panne, la température d'une chambre froide est T(x) = (x − 1)(x − 5) en °C, x heures après minuit, pour x entre 0 et 8.<br><br><b>Quand</b> la température est-elle négative ?`,
      reponse: `x − 1 change de signe en 1, x − 5 en 5. Entre les deux, un facteur est positif et l'autre négatif.<br>T est négative <span class="big">entre 1 h et 5 h</span>.`,
      consigne: "T(x) = (x − 1)(x − 5) pour x entre 0 et 8 : quand T est-elle négative ?",
      verification: { type: "qcm", choix: ["Avant 1 h", "Entre 1 h et 5 h", "Après 5 h"], bonne: 1 },
      dessin: froide,
    },
    {
      tag: "Énigme 4 · La carte de transport",
      titre: "Un coefficient négatif",
      question: `Après x trajets, le crédit d'une carte de bus est C(x) = 12 − 3x, en euros.<br><br><b>Quel est le signe</b> de C(x) pour x > 4 ?`,
      reponse: `12 − 3x = 0 pour x = 4. Le coefficient de x est −3, négatif : C décroît.<br>Pour x > 4, C(x) est <span class="big">négatif</span> : la carte est à découvert.`,
      consigne: "C(x) = 12 − 3x : quel est le signe de C(x) pour x > 4 ?",
      verification: { type: "qcm", choix: ["Positif", "Nul", "Négatif"], bonne: 2 },
      dessin: carte,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Diviser par x",
      sorte: "piege",
      question: `Inès cherche les nombres dont le carré est égal au triple : x² = 3x.<br>Elle divise par x et trouve x = 3.<br><br><b>Quelle solution</b> a-t-elle oubliée ?`,
      reponse: `On ne divise pas par x : x peut valoir 0 !<br>x² − 3x = 0, donc x(x − 3) = 0 : x = 3 ou <span class="big">x = 0</span>.`,
      consigne: "x² = 3x : quelle solution oublie-t-on en divisant par x ?",
      verification: { type: "courte", attendus: ["0"] },
      dessin: divise,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les entiers gagnants",
      sorte: "defi",
      question: `Dans un jeu, un entier n est gagnant si (n − 2)(n − 9) &lt; 0.<br><br><b>Combien d'entiers</b> sont gagnants ?`,
      reponse: `Le produit est négatif entre ses deux racines : 2 &lt; n &lt; 9.<br>Les entiers 3, 4, 5, 6, 7, 8 : <span class="big">6 entiers</span> (2 et 9 donnent 0, pas un nombre négatif).`,
      consigne: "Combien d'entiers n vérifient (n − 2)(n − 9) < 0 ?",
      verification: { type: "courte", attendus: ["6", "six"] },
      dessin: gagnants,
    },
  ],
};

export default problemes;
