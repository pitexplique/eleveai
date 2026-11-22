// Énigmes à projeter — terminale spé maths, notion fonction_exponentielle
// (la jacinthe d'eau, la coopérative agricole, la barre du forgeron, deux fermes
// d'escargots, piège du microscope, défi des deux virus informatiques). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** e puissance quelque chose, dans un texte de dessin (rien après). */
const ex = (puis: string) => `e<tspan dy="-12" font-size="17">${puis}</tspan>`;

const jacinthe = (() => {
  const R = repereXY(0, 10, 0, 4000, { gx: 90, gy: 70, gl: 340, gh: 250, px: 1, py: 500, ex: 2, ey: 1000 });
  return svg("Courbe du nombre de plants N(t) = 500 fois exponentielle de 0,2t, pour t de 0 à 10 semaines : de 500 à environ 3 700",
    R.fond + R.courbe((x) => 500 * Math.exp(0.2 * x), 0, 10, C.bleu, 4) + R.point(0, 500, C.rose, 7) +
      t(R.X(0) + 12, 40, `N(t) = 500 ${ex("0,2t")}`, C.bleu, 24, "start") +
      t(240, 405, `combien de plants au départ${NB}?`, C.rose, 22));
})();

const cooperative = svg("Le capital de la coopérative : multiplié par e entre 0 et 10 ans ; on cherche par combien il est multiplié en 20 ans",
  t(240, 70, `C(t) = C₀ × ${ex("0,1t")}`, C.bleu, 30) +
    l(60, 220, 420, 220, C.craie, 3) + l(60, 208, 60, 232, C.craie, 3) + l(240, 208, 240, 232, C.craie, 3) + l(420, 208, 420, 232, C.craie, 3) +
    t(60, 262, "0", C.pale, 22) + t(240, 262, "10 ans", C.pale, 22) + t(420, 262, "20 ans", C.pale, 22) +
    fleche(75, 180, 225, 180, C.jaune, 3) + t(150, 160, "× e", C.jaune, 24) +
    fleche(75, 310, 405, 310, C.rose, 3) + t(240, 345, `× ?`, C.rose, 26) +
    t(240, 400, `en 20 ans, multiplié par${NB}?`, C.rose, 22));

const forgeron = (() => {
  const R = repereXY(0, 20, 0, 800, { gx: 90, gy: 70, gl: 340, gh: 250, px: 2, py: 100, ex: 4, ey: 200 });
  return svg("Courbe de la température de la barre T(t) = 20 + 780 fois exponentielle de −0,2t, de 800 °C au départ vers 20 °C",
    R.fond + R.courbe((x) => 20 + 780 * Math.exp(-0.2 * x), 0, 20, C.rose, 4) + R.point(0, 800, C.jaune, 7) +
      t(R.X(3), R.Y(700), `T(t) = 20 + 780 ${ex("−0,2t")}`, C.bleu, 22, "start") + t(R.X(3), R.Y(560), "en °C, t en minutes", C.pale, 18, "start") +
      t(240, 405, `T′(0) =${NB}?`, C.rose, 22));
})();

const escargots = (() => {
  const R = repereXY(0, 6, 0, 7, { gx: 80, gy: 70, gl: 350, gh: 250, px: 1, py: 1, ex: 1, ey: 1 });
  return svg("Deux courbes : A(t) = exponentielle de 0,3t part de 1 et B(t) = exponentielle de 0,1t + 0,8 part d'environ 2,2 ; elles se croisent",
    R.fond + R.courbe((x) => Math.exp(0.3 * x), 0, 6, C.bleu, 4) + R.courbe((x) => Math.exp(0.1 * x + 0.8), 0, 6, C.jaune, 4) +
      t(R.X(5.2), R.Y(6.7), "A", C.bleu, 24) + t(R.X(5.6), R.Y(3.1), "B", C.jaune, 24) +
      t(R.X(0) + 12, 40, `A(t) = ${ex("0,3t")}`, C.bleu, 22, "start") + t(R.X(2.9), 40, `B(t) = ${ex("0,1t + 0,8")}`, C.jaune, 22, "start") +
      t(240, 405, `quand A = B${NB}?`, C.rose, 22));
})();

const microscope = svg("Le zoom du microscope : on agrandit par e au cube, puis par e au carré ; Sami écrit e puissance 6",
  t(240, 80, "zoom n° 1 : ×  e³", C.bleu, 30) + t(240, 150, "zoom n° 2 : ×  e²", C.bleu, 30) +
    l(110, 190, 370, 190, C.craie, 3) + t(240, 250, "Sami : en tout ×  e⁶", C.craie, 28) +
    t(240, 380, `Sami a-t-il raison${NB}?`, C.rose, 24));

const virus = svg("Tableau : pour t = 10, t puissance 10 vaut 10 milliards et exponentielle de t vaut environ 22 026",
  t(240, 60, "deux virus, t en heures", C.pale, 22) +
    t(150, 130, "t = 10", C.craie, 26) +
    t(240, 200, "virus A : t¹⁰ = 10 000 000 000", C.bleu, 24) + t(240, 260, "virus B : eᵗ ≈ 22 026", C.jaune, 24) +
    t(240, 320, "et à la longue ?", C.craie, 24) +
    t(240, 395, `qui l'emporte${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "fonction_exponentielle",
  titre: "Énigmes de la fonction exponentielle",
  description: "La jacinthe d'eau, la coopérative agricole, la barre du forgeron, les deux fermes d'escargots, le piège du microscope, le défi des deux virus : e⁰ = 1, propriétés algébriques, dérivée de e^(u), équation, croissance comparée.",
  problemes: [
    {
      tag: "Énigme 1 · La jacinthe d'eau",
      titre: "Que vaut e⁰ ?",
      question: `La jacinthe d'eau envahit un canal. Après t semaines, il y a N(t) = 500 e<sup>0,2t</sup> plants.<br><br><b>Combien de plants</b> y a-t-il au départ ?`,
      reponse: `Au départ, t = 0 : N(0) = 500 × e<sup>0</sup> = 500 × 1.<br><span class="big">500 plants</span>.`,
      consigne: "N(t) = 500 e^(0,2t) : combien de plants au départ (t = 0) ?",
      verification: { type: "courte", attendus: ["500"], unite: "plants" },
      dessin: jacinthe,
    },
    {
      tag: "Énigme 2 · La coopérative agricole",
      titre: "e^a × e^b = e^(a+b)",
      question: `Le capital d'une coopérative agricole vaut C(t) = C₀ e<sup>0,1t</sup> après t ans. En 10 ans, il est multiplié par e.<br><br><b>Par combien</b> est-il multiplié en 20 ans ?`,
      reponse: `e<sup>0,1 × 20</sup> = e<sup>2</sup> = e<sup>1</sup> × e<sup>1</sup> : deux fois « × e ».<br><span class="big">× e² ≈ 7,39</span>.`,
      consigne: "C(t) = C₀ e^(0,1t) : en 20 ans, le capital est multiplié par ?",
      verification: { type: "qcm", choix: ["e² (soit e × e)", "2e (soit e + e)", "e¹⁰"], bonne: 0 },
      dessin: cooperative,
    },
    {
      tag: "Énigme 3 · La barre du forgeron",
      titre: "Dériver e^(u)",
      question: `Une barre de fer sort de la forge. Sa température est T(t) = 20 + 780 e<sup>−0,2t</sup>, en °C, après t minutes.<br><br><b>Combien vaut T′(0)</b>, sa vitesse de refroidissement au départ ?`,
      reponse: `(e<sup>u</sup>)′ = u′ e<sup>u</sup> : T′(t) = 780 × (−0,2) e<sup>−0,2t</sup> = −156 e<sup>−0,2t</sup>.<br>T′(0) = <span class="big">−156 °C/min</span> : elle perd 156 °C par minute au début.`,
      consigne: "T(t) = 20 + 780 e^(−0,2t) : combien vaut T′(0) ?",
      verification: { type: "courte", attendus: ["−156", "-156"], unite: "°C/min" },
      dessin: forgeron,
    },
    {
      tag: "Énigme 4 · Les deux fermes d'escargots",
      titre: "Une équation avec exponentielle",
      question: `Deux fermes élèvent des escargots. Après t mois, l'une en a A(t) = e<sup>0,3t</sup> milliers, l'autre B(t) = e<sup>0,1t + 0,8</sup> milliers.<br><br><b>Après combien de mois</b> en ont-elles autant ?`,
      reponse: `e<sup>a</sup> = e<sup>b</sup> revient à a = b : 0,3t = 0,1t + 0,8, soit 0,2t = 0,8.<br>Après <span class="big">4 mois</span>.`,
      consigne: "e^(0,3t) = e^(0,1t + 0,8) : après combien de mois ?",
      verification: { type: "courte", attendus: ["4", "t=4"], unite: "mois" },
      dessin: escargots,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le microscope",
      sorte: "piege",
      question: `Un microscope numérique agrandit une image par e³, puis encore par e².<br>Sami : « En tout, c'est × e⁶, car 3 × 2 = 6. »<br><br><b>Par combien</b> l'image est-elle agrandie ?`,
      reponse: `e³ × e² = e<sup>3 + 2</sup> : on <b>additionne</b> les exposants, on ne les multiplie pas.<br><span class="big">× e⁵</span> (environ 148).`,
      consigne: "Un agrandissement par e³, puis par e² : agrandi par combien en tout ?",
      verification: { type: "qcm", choix: ["e⁶", "e⁵", "e¹"], bonne: 1 },
      dessin: microscope,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux virus informatiques",
      sorte: "defi",
      question: `Après t heures, le virus A a infecté t<sup>10</sup> fichiers, le virus B e<sup>t</sup> fichiers. À t = 10, A est très loin devant.<br><br><b>À la longue</b>, lequel en infecte le plus ?`,
      reponse: `Croissance comparée : ${"e<sup>t</sup>"} ÷ t<sup>10</sup> tend vers +∞ quand t tend vers +∞. L'exponentielle l'emporte sur toute puissance.<br>B passe devant vers t ≈ 36 h : <span class="big">le virus B</span>.`,
      consigne: "t^10 ou e^t : lequel est le plus grand quand t devient très grand ?",
      verification: { type: "qcm", choix: ["t¹⁰ (virus A)", "Ils finissent égaux", "eᵗ (virus B)"], bonne: 2 },
      dessin: virus,
    },
  ],
};

export default problemes;
