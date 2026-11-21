// Énigmes à projeter — seconde, notion signes_expression_2de (le marchand de
// glaces, le produit négatif, les zéros du tableau, le logiciel qui affiche
// « erreur », piège x² > 9, défi du cadre photo). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const glaces = (() => {
  const R = repere(0, 6, -6, 6, { gl: 300, gh: 300, gy: 40, gx: 110, pas: 1, pasE: 2 });
  return svg("La droite du bénéfice B de x égale 2x moins 6, qui coupe l'axe en 3",
    R.fond + R.courbe((x) => 2 * x - 6, 0, 6, C.bleu, 5) + p("M425 140 l20 60 l20 -60 Z", C.jaune, 3, 0.4) + `<circle cx="445" cy="126" r="20" fill="${C.rose}" fill-opacity="0.4"/>` +
      t(R.X(4.6), R.Y(5.2), "B(x) = 2x − 6", C.bleu, 20, "end") + t(240, 395, `bénéfice positif quand${NB}?`, C.rose, 24));
})();

// Tableau de signes de (x − 2)(x + 5).
const tableau = (lignes: [string, string[]][], zeros: string[], y0 = 80) => {
  const n = lignes.length + 1, h = 50, cols = zeros.length;
  let s = r(30, y0, 420, n * h, C.craie, 0, 3) + l(140, y0, 140, y0 + n * h, C.craie, 3);
  for (let k = 1; k < n; k++) s += l(30, y0 + k * h, 450, y0 + k * h, C.craie, k === 1 ? 3 : 1.5);
  s += t(85, y0 + 33, "x", C.craie, 22) + t(160, y0 + 33, "−∞", C.pale, 18, "start") + t(440, y0 + 33, "+∞", C.pale, 18, "end");
  const pos = zeros.map((_, k) => 140 + (310 * (k + 1)) / (cols + 1));
  const bornes = [140, ...pos, 450];
  zeros.forEach((z, k) => (s += t(pos[k], y0 + 33, z, C.craie, 22)));
  lignes.forEach(([nom, signes], i) => {
    s += t(85, y0 + (i + 1) * h + 33, nom, C.craie, 18);
    signes.forEach((sg, j) => {
      const x = j % 2 ? pos[(j - 1) / 2] : (bornes[j / 2] + bornes[j / 2 + 1]) / 2;
      s += t(x, y0 + (i + 1) * h + 33, sg, sg === "+" ? C.bleu : sg === "−" ? C.rose : C.craie, 22);
    });
  });
  return s;
};

const produit = svg(
  "Le tableau de signes de x moins 2 fois x plus 5, à compléter",
  tableau([["x + 5", ["−", "0", "+", "", "+"]], ["x − 2", ["−", "", "−", "0", "+"]], ["produit", ["?", "", "?", "", "?"]]], ["−5", "2"]) +
    t(240, 360, `(x − 2)(x + 5) &lt; 0${NB}?`, C.rose, 26)
);

const zeros = svg(
  "Un produit de trois facteurs : x moins 1, x plus 4, 2x moins 6",
  t(240, 160, "(x − 1)(x + 4)(2x − 6)", C.bleu, 34) + t(240, 250, "= 0", C.craie, 34) + t(240, 340, `pour combien de valeurs${NB}?`, C.rose, 26)
);

const erreur = svg(
  "Un écran de calculatrice qui affiche erreur",
  r(110, 80, 260, 190, C.craie, 0.08, 4, 18) + r(135, 105, 210, 70, C.bleu, 0.15, 3, 6) + t(240, 150, "ERREUR", C.rose, 30) +
    t(240, 230, "f(x) = (x + 3) ÷ (x − 2)", C.craie, 20) + t(240, 350, `pour quel x${NB}?`, C.rose, 28)
);

const piege = svg(
  "Au tableau : x au carré strictement supérieur à 9",
  t(240, 170, "x² > 9", C.bleu, 70) + t(240, 280, "x > 3 ?", C.craie, 34).replace(" ?", `${NB}?`) + t(240, 340, "et x = −4 ?", C.craie, 26).replace(" ?", `${NB}?`)
);

// Cadre de périmètre 20 cm : largeur x, longueur 10 − x (exemple 3 × 7, 1 cm = 26 px).
const cadre = svg(
  "Un cadre photo rectangulaire de périmètre 20 centimètres, de côtés x et 10 moins x",
  r(58, 110, 182, 78, C.jaune, 0.3, 4) + t(149, 98, "10 − x", C.craie, 22) + t(48, 157, "x", C.craie, 22, "end") +
    t(360, 135, "périmètre 20 cm", C.craie, 20) + t(360, 175, "aire ≥ 21 cm²", C.bleu, 22) + t(240, 330, `quelles valeurs de x${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "signes_expression_2de",
  titre: "Énigmes du signe d'une expression",
  description: "Le marchand de glaces, le produit négatif, les zéros d'un produit, le logiciel qui affiche « erreur », le piège x² > 9, le défi du cadre photo : signe de ax + b, tableau de signes d'un produit et d'un quotient.",
  problemes: [
    {
      tag: "Énigme 1 · Le marchand de glaces",
      titre: "Le bénéfice",
      question: `Le bénéfice d'un marchand de glaces est <b>B(x) = 2x − 6</b> (en centaines d'euros, pour x centaines de glaces).<br><br><b>Quand</b> le bénéfice est-il strictement positif ?`,
      reponse: `2x − 6 > 0 ⟺ 2x > 6 ⟺ <span class="big">x > 3</span>.<br>Au-delà de 300 glaces vendues, il gagne de l'argent. À 300 tout juste, B = 0.`,
      consigne: "Pour quels x a-t-on 2x − 6 > 0 ?",
      verification: { type: "qcm", choix: ["x > 3", "x > 6", "x < 3"], bonne: 0 },
      dessin: glaces,
    },
    {
      tag: "Énigme 2 · Le produit",
      titre: "Négatif où ?",
      question: `<b>Pour quels x</b> a-t-on (x − 2)(x + 5) &lt; 0 ?`,
      reponse: `x + 5 change de signe en −5, x − 2 en 2. Le produit est négatif quand les deux facteurs ont des signes contraires : entre −5 et 2.<br>Solution : <span class="big">]−5 ; 2[</span>.<br>Test : x = 0 donne (−2)(5) = −10 &lt; 0 ✓.`,
      consigne: "Solutions de (x − 2)(x + 5) < 0 ?",
      verification: { type: "qcm", choix: ["]−∞ ; −5[ ∪ ]2 ; +∞[", "]−5 ; 2[", "]−2 ; 5["], bonne: 1 },
      dessin: produit,
    },
    {
      tag: "Énigme 3 · Les zéros",
      titre: "Trois facteurs",
      question: `<b>Pour combien de valeurs</b> de x le produit (x − 1)(x + 4)(2x − 6) vaut-il 0 ?`,
      reponse: `Un produit est nul quand un de ses facteurs est nul : x = 1, x = −4 ou 2x = 6, soit x = 3.<br><span class="big">3 valeurs</span> : ce seront les 3 zéros du tableau de signes.`,
      consigne: "Combien de valeurs annulent (x − 1)(x + 4)(2x − 6) ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: zeros,
    },
    {
      tag: "Énigme 4 · Le logiciel",
      titre: "Erreur !",
      question: `Un logiciel calcule <b>f(x) = (x + 3) ÷ (x − 2)</b>. Pour une seule valeur de x, il affiche « erreur ».<br><br><b>Laquelle</b> ?`,
      reponse: `On ne divise pas par 0 : x − 2 = 0 pour <span class="big">x = 2</span>.<br>C'est la valeur interdite, la double barre ‖ du tableau de signes.`,
      consigne: "Quelle est la valeur interdite de (x + 3) ÷ (x − 2) ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: erreur,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "x² > 9",
      sorte: "piege",
      question: `<b>Pour quels x</b> a-t-on x² > 9 ?<br>A. x > 3 B. x > ±3 C. x &lt; −3 ou x > 3`,
      reponse: `Attention aux négatifs : (−4)² = 16 > 9 !<br>x² − 9 = (x − 3)(x + 3) > 0 quand les deux facteurs ont le même signe.<br><span class="big">x &lt; −3 ou x > 3</span>.`,
      consigne: "Pour quels x a-t-on x² > 9 ?",
      verification: { type: "qcm", choix: ["x > 3", "x > ±3", "x < −3 ou x > 3"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cadre photo",
      sorte: "defi",
      question: `Un cadre rectangulaire a un périmètre de <b>20 cm</b> : ses côtés mesurent x et 10 − x.<br>On veut une aire d'<b>au moins 21 cm²</b>.<br><br><b>Pour quelles valeurs de x</b> ? Donne l'intervalle.`,
      reponse: `x(10 − x) ≥ 21 ⟺ x² − 10x + 21 ≤ 0 ⟺ (x − 3)(x − 7) ≤ 0.<br>Le produit est négatif ou nul entre ses deux zéros : <span class="big">x ∈ [3 ; 7]</span>.<br>Vérif : 3 × 7 = 21 ; 5 × 5 = 25.`,
      consigne: "Intervalle des x tels que x(10 − x) ≥ 21 ?",
      verification: { type: "courte", attendus: ["[3;7]", "[3,7]"] },
      dessin: cadre,
    },
  ],
};

export default problemes;
