// Énigmes à projeter — première spé maths, notion derivation_operations
// (le traiteur, les bouquets de fleurs, la fabrique de parapluies, la tache
// d'encre sur le buvard, piège de la boîte de tisane, défi de la rivière
// après l'orage). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const traiteur = svg("Le traiteur : préparer x plateaux coûte C(x) = x² + 30x + 200 euros",
  [110, 240, 370].map((x) => ell(x, 130, 55, 22, C.jaune, 0.3, 4) + o(x - 15, 122, 8, C.rose, 0.6, 2) + o(x + 15, 126, 8, C.bleu, 0.6, 2)).join("") +
    t(240, 240, "C(x) = x² + 30x + 200", C.craie, 26) +
    t(240, 370, `C′(10)${NB}?`, C.rose, 30));

const bouquets = svg("Le fleuriste vend ses bouquets p euros pièce ; il en vend 100 − 2p, et sa recette vaut R(p) = p(100 − 2p)",
  [150, 240, 330].map((x) => l(x, 200, x, 120, C.bleu, 4) + o(x, 105, 18, C.rose, 0.5, 3) + o(x - 22, 125, 12, C.jaune, 0.5, 3)).join("") +
    p("M120 190 L360 190 L330 230 L150 230 Z", C.jaune, 3, 0.2) +
    t(240, 300, "R(p) = p(100 − 2p)", C.craie, 26) +
    t(240, 380, `R′(p)${NB}?`, C.rose, 30));

const parapluies = svg("La fabrique de parapluies : le coût moyen d'un parapluie, pour x centaines, vaut (x² + 100) divisé par x",
  p("M140 160 Q240 40 340 160 Q315 145 290 160 Q265 145 240 160 Q215 145 190 160 Q165 145 140 160 Z", C.bleu, 4, 0.25) +
    p("M240 160 L240 225 Q240 245 220 245", C.craie, 4) +
    t(150, 320, "CM(x) =", C.craie, 26, "start") + t(320, 302, "x² + 100", C.craie, 24) + l(265, 312, 375, 312, C.craie, 3) + t(320, 340, "x", C.craie, 24) +
    t(240, 400, `CM′(5)${NB}?`, C.rose, 28));

const encre = svg("Une tache d'encre s'étale sur un buvard : au bout de t secondes, son rayon vaut r(t) = √(2t + 1) centimètres",
  r(60, 40, 360, 240, C.pale, 0.1, 3, 8) + o(240, 160, 90, C.bleu, 0.15, 3) + o(240, 160, 55, C.bleu, 0.3, 3) + o(240, 160, 25, C.bleu, 0.6, 3) +
    t(240, 320, "r(t) = √(2t + 1)", C.craie, 26) +
    t(240, 390, `r′(4)${NB}?`, C.rose, 30));

const tisane = svg("Une boîte de tisane à base carrée de côté x et de hauteur x + 1 : son volume vaut V(x) = x²(x + 1) ; Lina dérive chaque facteur",
  r(150, 120, 140, 160, C.jaune, 0.2, 4) + p("M150 120 l50 -40 l140 0 l-50 40 z", C.jaune, 4, 0.1) + p("M290 280 l50 -40 l0 -160", C.jaune, 4) +
    t(220, 305, "x", C.craie, 22) + t(350, 175, "x + 1", C.craie, 22, "start") +
    t(240, 350, "V(x) = x²(x + 1)", C.craie, 24) +
    t(240, 400, `Lina : V′(x) = 2x × 1${NB}?`, C.rose, 24));

const riviere = (() => {
  const R = repereXY(0, 5, 0, 6, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("Le débit d'une rivière après l'orage : Q(t) = 10t/(t² + 1) mètres cubes par seconde, t en heures ; on cherche le moment du débit maximal",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => (10 * x) / (x * x + 1), 0, 5, C.bleu, 4) +
      t(R.X(1.9), R.Y(5.4), "Q(t) = 10t/(t² + 1)", C.bleu, 22, "start") +
      t(240, 405, `débit maximal : t =${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "derivation_operations",
  titre: "Énigmes de la dérivée d'une somme, d'un produit, d'un quotient",
  description: "Le traiteur, les bouquets du fleuriste, la fabrique de parapluies, la tache d'encre sur le buvard, le piège de la boîte de tisane, le défi de la rivière après l'orage : dériver u + v, uv, u/v et g(ax + b).",
  problemes: [
    {
      tag: "Énigme 1 · Le traiteur",
      titre: "La dérivée d'une somme",
      question: `Pour préparer x plateaux-repas, un traiteur dépense C(x) = x² + 30x + 200 euros.<br><br><b>Que vaut C′(10)</b> ?`,
      reponse: `On dérive terme à terme : C′(x) = 2x + 30 (la constante 200 disparaît).<br><span class="big">C′(10) = 50</span> : vers 10 plateaux, un plateau de plus coûte environ 50 €.`,
      consigne: "C(x) = x² + 30x + 200. Que vaut C′(10) ?",
      verification: { type: "courte", attendus: ["50"] },
      dessin: traiteur,
    },
    {
      tag: "Énigme 2 · Les bouquets du fleuriste",
      titre: "La dérivée d'un produit",
      question: `Un fleuriste vend ses bouquets p euros pièce. Il en vend alors 100 − 2p. Sa recette vaut R(p) = p(100 − 2p).<br><br><b>Quelle est R′(p)</b> ?`,
      reponse: `(uv)′ = u′v + uv′ avec u = p et v = 100 − 2p : R′(p) = 1 × (100 − 2p) + p × (−2).<br><span class="big">R′(p) = 100 − 4p</span>.`,
      consigne: "R(p) = p(100 − 2p). Quelle est R′(p) ?",
      verification: { type: "qcm", choix: ["100 − 4p", "−2p", "100 − 2p"], bonne: 0 },
      dessin: bouquets,
    },
    {
      tag: "Énigme 3 · La fabrique de parapluies",
      titre: "La dérivée d'un quotient",
      question: `Pour x centaines de parapluies, le coût moyen d'un parapluie vaut CM(x) = ${frac("x² + 100", "x")} euros.<br><br><b>Que vaut CM′(5)</b> ?`,
      reponse: `(${frac("u", "v")})′ = ${frac("u′v − uv′", "v²")} : CM′(x) = ${frac("2x × x − (x² + 100)", "x²")} = ${frac("x² − 100", "x²")}.<br>CM′(5) = ${frac("25 − 100", 25)} : <span class="big">CM′(5) = −3</span>.`,
      consigne: "CM(x) = (x² + 100)/x. Que vaut CM′(5) ?",
      verification: { type: "courte", attendus: ["−3", "-3"] },
      dessin: parapluies,
    },
    {
      tag: "Énigme 4 · La tache d'encre",
      titre: "Dériver g(ax + b)",
      question: `Une goutte d'encre tombe sur un buvard. Au bout de t secondes, la tache a un rayon r(t) = √(2t + 1) cm.<br><br><b>Que vaut r′(4)</b> ?`,
      reponse: `(g(at + b))′ = a g′(at + b) : r′(t) = 2 × ${frac(1, "2√(2t + 1)")} = ${frac(1, "√(2t + 1)")}.<br>r′(4) = ${frac(1, "√9")} : <span class="big">r′(4) = ${frac(1, 3)}</span> cm par seconde.`,
      consigne: "r(t) = √(2t + 1). Que vaut r′(4) ?",
      verification: { type: "qcm", choix: ["1/6", "2/3", "1/3"], bonne: 2 },
      dessin: encre,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La boîte de tisane",
      sorte: "piege",
      question: `Une boîte de tisane a une base carrée de côté x et une hauteur x + 1. Son volume vaut V(x) = x²(x + 1).<br>Lina : « Je dérive chaque morceau : V′(x) = 2x × 1 = 2x. »<br><br><b>Quelle est la bonne dérivée</b> ?`,
      reponse: `La dérivée d'un produit n'est pas le produit des dérivées : (uv)′ = u′v + uv′.<br>V′(x) = 2x(x + 1) + x² × 1 = <span class="big">3x² + 2x</span>. Vérification : V(x) = x³ + x², dont la dérivée est 3x² + 2x.`,
      consigne: "V(x) = x²(x + 1). Quelle est V′(x) ?",
      verification: { type: "qcm", choix: ["2x", "3x² + 2x", "3x² + 1"], bonne: 1 },
      dessin: tisane,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La rivière après l'orage",
      sorte: "defi",
      question: `Après un orage, le débit d'une rivière vaut Q(t) = ${frac("10t", "t² + 1")} m³/s, t heures après la pluie.<br><br><b>À quel instant t le débit est-il maximal</b> ?`,
      reponse: `Q′(t) = ${frac("10(t² + 1) − 10t × 2t", "(t² + 1)²")} = ${frac("10(1 − t²)", "(t² + 1)²")}.<br>Pour t ≥ 0, Q′ est positive avant 1 et négative après : <span class="big">t = 1 h</span>, avec Q(1) = 5 m³/s.`,
      consigne: "Q(t) = 10t/(t² + 1), t ≥ 0. Pour quel t le débit est-il maximal ?",
      verification: { type: "courte", attendus: ["1"], unite: "h" },
      dessin: riviere,
    },
  ],
};

export default problemes;
