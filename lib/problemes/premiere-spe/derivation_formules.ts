// Énigmes à projeter — première spé maths, notion derivation_formules
// (le bloc de pâte à modeler, la galette des rois, le géranium du Tampon,
// le haut-parleur de la fanfare, piège de la toile du peintre, défi du
// chapiteau du cirque). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const pate = svg("Un bloc cubique de pâte à modeler d'arête a centimètres : son volume est V(a) = a³",
  r(140, 150, 150, 150, C.bleu, 0.3, 4) + p("M140 150 l60 -60 l150 0 l-60 60 z", C.bleu, 4, 0.15) + p("M290 300 l60 -60 l0 -150", C.bleu, 4) +
    l(290, 150, 350, 90, C.bleu, 4) + t(215, 330, "a = 3 cm", C.craie, 22) + t(240, 50, "V(a) = a³", C.craie, 24) +
    t(240, 395, `V′(3)${NB}?`, C.rose, 30));

const galette = svg("Une galette des rois partagée en x parts égales : chaque part vaut p(x) = 1/x de la galette",
  o(240, 175, 120, C.jaune, 0.3, 4) + [0, 90, 180, 270].map((a) => l(240, 175, 240 + 120 * Math.cos((a * Math.PI) / 180), 175 + 120 * Math.sin((a * Math.PI) / 180), C.jaune, 3)).join("") +
    o(300, 225, 8, C.rose, 1, 2) + t(240, 335, "une part : p(x) = 1/x", C.craie, 24) +
    t(240, 395, `p′(4)${NB}?`, C.rose, 30));

const geranium = svg("Une parcelle carrée de géranium au Tampon : pour une aire de x mètres carrés, le côté vaut c(x) = √x",
  r(130, 50, 220, 220, C.bleu, 0.12, 4) +
    [0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3, 4].map((j) => o(152 + 44 * j, 72 + 44 * i, 9, C.rose, 0.5, 2)).join("")).join("") +
    t(240, 300, "aire x m² · côté c(x) = √x", C.craie, 22) +
    t(240, 385, `c′(100)${NB}?`, C.rose, 30));

const fanfare = svg("Le haut-parleur de la fanfare : à d mètres, l'intensité du son vaut I(d) = 1/d², c'est-à-dire d⁻²",
  r(60, 120, 50, 80, C.craie, 0.2, 4) + p("M110 120 l60 -50 l0 180 l-60 -50 z", C.craie, 4, 0.15) +
    [60, 100, 140].map((k) => p(`M${170 + k * 0.4} ${160 - k * 0.8} Q${210 + k} 160 ${170 + k * 0.4} ${160 + k * 0.8}`, C.bleu, 3)).join("") +
    t(240, 320, "I(d) = 1/d² = d⁻²", C.craie, 26) +
    t(240, 385, `I′(d)${NB}?`, C.rose, 30));

const toile = svg("La toile carrée du peintre, de côté c : son aire vaut A(c) = c² ; Mila calcule A(5) = 25 puis dérive 25",
  l(180, 250, 155, 355, C.jaune, 5) + l(300, 250, 325, 355, C.jaune, 5) + l(240, 250, 240, 355, C.jaune, 5) +
    r(150, 70, 180, 180, C.bleu, 0.15, 4) + t(240, 170, "A(c) = c²", C.craie, 26) + t(380, 170, "c = 5", C.craie, 22, "start") +
    t(240, 405, `Mila : 25 dérivé = 0${NB}?`, C.rose, 24));

const chapiteau = (() => {
  const R = repereXY(0, 5, 0, 3, { gx: 90, gy: 30, gl: 320, gh: 330, px: 1, py: 1 });
  return svg("Sous le chapiteau du cirque, la toile suit y = 1/x ; un câble tendu part du haut du poteau, au point (0 ; 1), et touche la toile en un seul point",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => 1 / x, 1 / 3, 5, C.bleu, 4) +
      R.courbe((x) => 1 - x / 4, 0, 4, C.jaune, 3) + R.point(0, 1, C.rose, 9) +
      t(R.X(2.6), R.Y(2.4), "toile : y = 1/x", C.bleu, 22, "start") +
      t(240, 405, `point de contact : a =${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "derivation_formules",
  titre: "Énigmes des formules de dérivation",
  description: "Le bloc de pâte à modeler, la galette des rois, le géranium du Tampon, le haut-parleur de la fanfare, le piège de la toile du peintre, le défi du chapiteau du cirque : dériver x², x³, 1/x, √x et xⁿ.",
  problemes: [
    {
      tag: "Énigme 1 · La pâte à modeler",
      titre: "La dérivée du cube",
      question: `Un bloc de pâte à modeler est un cube d'arête a cm. Son volume vaut V(a) = a³.<br><br><b>Que vaut V′(3)</b> ?`,
      reponse: `(x³)′ = 3x², donc V′(a) = 3a² et V′(3) = 3 × 9.<br><span class="big">V′(3) = 27</span> : vers a = 3, le volume gagne environ 27 cm³ par centimètre d'arête.`,
      consigne: "V(a) = a³. Que vaut V′(3) ?",
      verification: { type: "courte", attendus: ["27"] },
      dessin: pate,
    },
    {
      tag: "Énigme 2 · La galette des rois",
      titre: "La dérivée de l'inverse",
      question: `On partage une galette des rois en x parts égales. Une part vaut p(x) = ${frac(1, "x")} de la galette.<br><br><b>Que vaut p′(4)</b> ?`,
      reponse: `(${frac(1, "x")})′ = −${frac(1, "x²")}, donc p′(4) = −${frac(1, 16)}.<br><span class="big">p′(4) = −${frac(1, 16)}</span> : la part rétrécit quand on ajoute un convive.`,
      consigne: "p(x) = 1/x. Que vaut p′(4) ?",
      verification: { type: "qcm", choix: ["1/16", "−1/16", "−1/8"], bonne: 1 },
      dessin: galette,
    },
    {
      tag: "Énigme 3 · Le géranium du Tampon",
      titre: "La dérivée de la racine carrée",
      question: `Au Tampon, une parcelle de géranium est un carré. Pour une aire de x m², son côté vaut c(x) = √x mètres.<br><br><b>Que vaut c′(100)</b> ?`,
      reponse: `(√x)′ = ${frac(1, "2√x")}, donc c′(100) = ${frac(1, "2 × 10")} = ${frac(1, 20)}.<br><span class="big">c′(100) = 0,05</span> : vers 100 m², un mètre carré de plus allonge le côté d'environ 5 cm.`,
      consigne: "c(x) = √x. Que vaut c′(100) (en décimal) ?",
      verification: { type: "courte", attendus: ["0,05", "0.05", "1/20"] },
      dessin: geranium,
    },
    {
      tag: "Énigme 4 · La fanfare",
      titre: "Dériver une puissance négative",
      question: `À d mètres du haut-parleur d'une fanfare, l'intensité du son vaut I(d) = ${frac(1, "d²")} = d<sup>−2</sup>.<br><br><b>Quelle est la dérivée I′(d)</b> ?`,
      reponse: `(x<sup>n</sup>)′ = n x<sup>n−1</sup>, même pour n = −2.<br><span class="big">I′(d) = −2d<sup>−3</sup></span>, c'est-à-dire −${frac(2, "d³")}.`,
      consigne: "I(d) = d⁻². Quelle est I′(d) ?",
      verification: { type: "qcm", choix: ["−2d⁻³", "−2d⁻¹", "2d⁻³"], bonne: 0 },
      dessin: fanfare,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La toile du peintre",
      sorte: "piege",
      question: `Une toile carrée de côté c a pour aire A(c) = c².<br>Mila : « A(5) = 25, et la dérivée du nombre 25 est 0, donc A′(5) = 0. »<br><br><b>Que vaut vraiment A′(5)</b> ?`,
      reponse: `On dérive d'abord la fonction, puis on remplace : A′(c) = 2c.<br><span class="big">A′(5) = 10</span>. Dériver le nombre A(5) donne toujours 0 : ça ne dit rien.`,
      consigne: "A(c) = c². Que vaut A′(5) ?",
      verification: { type: "qcm", choix: ["0", "25", "10"], bonne: 2 },
      dessin: toile,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le chapiteau du cirque",
      sorte: "defi",
      question: `Sous un chapiteau, la toile suit la courbe de f(x) = ${frac(1, "x")} (x > 0). Un câble droit part du haut d'un poteau, au point (0 ; 1), et touche la toile en un seul point : il est tangent.<br><br><b>En quel point d'abscisse a</b> touche-t-il la toile ?`,
      reponse: `Tangente en a : y = −${frac(1, "a²")}(x − a) + ${frac(1, "a")} = −${frac("x", "a²")} + ${frac(2, "a")}.<br>Elle passe par (0 ; 1) si ${frac(2, "a")} = 1 : <span class="big">a = 2</span>. Le câble touche la toile en (2 ; 0,5).`,
      consigne: "f(x) = 1/x : pour quel a la tangente en a passe-t-elle par (0 ; 1) ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: chapiteau,
    },
  ],
};

export default problemes;
