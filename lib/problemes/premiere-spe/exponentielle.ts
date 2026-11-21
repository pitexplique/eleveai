// Énigmes à projeter — première spé maths, notion exponentielle
// (les nénuphars de l'étang, le bol de soupe, l'expérience des tartines en
// SVT, la cloche du temple, piège de la nuée de criquets, défi du funiculaire).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, ell } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Un exposant dans un texte de dessin : la base, puis l'exposant en haut, puis la suite. */
const ex = (base: string, e: string, suite = "") =>
  `${base}<tspan dy="-12" font-size="17">${e}</tspan><tspan dy="12"${/^\s/.test(suite) ? ` dx="6"` : ""}>${suite.replace(/^\s+/, "")}</tspan>`;

const nenuphars = svg("Les nénuphars de l'étang : leur surface vaut S(t) = 3 × e puissance t mètres carrés, t en semaines",
  ell(240, 150, 190, 100, C.bleu, 0.2, 4) +
    [[170, 120, 34], [260, 170, 26], [310, 110, 22], [200, 190, 18]].map(([x, y, k]) => o(x, y, k, C.jaune, 0.35, 3)).join("") +
    t(240, 310, ex("S(t) = 3e", "t", `${NB}m²`), C.craie, 28) +
    t(240, 380, `en 2 semaines : × combien${NB}?`, C.rose, 26));

const soupe = svg("Le bol de soupe refroidit : sa température vaut T(t) = 20 + 70 × e puissance −0,1t degrés, t en minutes",
  ell(240, 150, 130, 30, C.jaune, 0.3, 4) + `<path d="M110 150 Q120 260 240 262 Q360 260 370 150" fill="none" stroke="${C.craie}" stroke-width="4"/>` +
    [190, 240, 290].map((x) => `<path d="M${x} 110 q12 -16 0 -32 q-12 -16 0 -32" fill="none" stroke="${C.pale}" stroke-width="3"/>`).join("") +
    t(240, 320, ex("T(t) = 20 + 70e", "−0,1t"), C.craie, 26) +
    t(240, 385, `T′(0) =${NB}?`, C.rose, 28));

const tartines = svg("L'expérience des tartines en SVT : deux moisissures couvrent A(t) = e puissance 2t − 1 et B(t) = e puissance t + 3 millimètres carrés",
  r(60, 60, 160, 150, C.jaune, 0.3, 4, 18) + r(260, 60, 160, 150, C.jaune, 0.3, 4, 18) +
    o(140, 135, 30, C.bleu, 0.4, 3) + o(340, 135, 44, C.rose, 0.3, 3) +
    t(140, 250, ex("A(t) = e", "2t − 1"), C.bleu, 24) + t(340, 250, ex("B(t) = e", "t + 3"), C.rose, 24) +
    t(240, 370, `A(t) = B(t) pour t =${NB}?`, C.craie, 26));

const cloche = svg("La cloche du temple : n secondes après le coup, le son a pour intensité I(n) = 80 × e puissance −0,5n",
  `<path d="M180 220 Q180 80 240 80 Q300 80 300 220 Z" fill="${C.jaune}" fill-opacity="0.35" stroke="${C.craie}" stroke-width="4"/>` +
    l(160, 220, 320, 220, C.craie, 5) + o(240, 232, 12, C.craie, 0.5, 3) + l(240, 60, 240, 80, C.craie, 4) +
    [1, 2, 3].map((k) => `<path d="M${320 + 22 * k} ${150 - 18 * k} q${14 + 4 * k} ${18 * k} 0 ${36 * k}" fill="none" stroke="${C.pale}" stroke-width="3"/>`).join("") +
    t(240, 310, ex("I(n) = 80e", "−0,5n"), C.craie, 26) +
    t(240, 380, `(I(n)) : quelle suite${NB}?`, C.rose, 26));

const criquets = svg("La nuée de criquets : la population est multipliée par e puissance 3 la première semaine, puis par e puissance 4 la deuxième",
  [[110, 90], [190, 130], [280, 80], [360, 140], [150, 180], [320, 200], [240, 170]].map(([x, y]) =>
    ell(x, y, 22, 9, C.jaune, 0.5, 3) + l(x - 4, y - 6, x - 16, y - 22, C.craie, 2) + l(x + 4, y - 6, x + 18, y - 20, C.craie, 2)).join("") +
    t(240, 290, ex("× e", "3", `${NB}puis × e`) + `<tspan dy="-12" font-size="17">4</tspan>`, C.craie, 28) +
    t(240, 370, `en tout : × combien${NB}?`, C.rose, 26));

const funiculaire = (() => {
  const R = repereXY(-3, 2, -1, 6, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1, ex: 2, ey: 2 });
  return svg("Le funiculaire : le rail suit la courbe de la fonction exponentielle, le câble suit la droite y = x + 1",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => Math.exp(x), -3, 1.75, C.bleu, 4) +
      R.courbe((x) => x + 1, -1.5, 2, C.jaune, 4) + R.point(0, 1, C.rose, 8) +
      t(R.X(-2.8), R.Y(4.5), ex("y = e", "x"), C.bleu, 22, "start") +
      t(R.X(-2.9), R.Y(1.3), "y = x + 1", C.jaune, 22, "start") +
      t(240, 405, `combien de points communs${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "exponentielle",
  titre: "Énigmes de la fonction exponentielle",
  description: "Les nénuphars de l'étang, le bol de soupe, l'expérience des tartines, la cloche du temple, le piège de la nuée de criquets, le défi du funiculaire : propriétés algébriques, dérivée de e^(ax+b), équations, suites géométriques, position de la courbe et de sa tangente.",
  problemes: [
    {
      tag: "Énigme 1 · Les nénuphars de l'étang",
      titre: "Ajouter dans l'exposant, c'est multiplier",
      question: `Sur un étang, les nénuphars couvrent S(t) = 3e<sup>t</sup> m², où t est le temps en semaines.<br><br><b>Par combien la surface est-elle multipliée en 2 semaines</b> ?`,
      reponse: `S(t + 2) = 3e<sup>t + 2</sup> = 3e<sup>t</sup> × e<sup>2</sup> = S(t) × e<sup>2</sup>.<br>La surface est <span class="big">multipliée par e<sup>2</sup></span>, soit environ 7,4.`,
      consigne: "S(t) = 3e^t. Par combien la surface est-elle multipliée en 2 semaines ?",
      verification: { type: "qcm", choix: ["par e²", "par 2e", "par e + 2"], bonne: 0 },
      dessin: nenuphars,
    },
    {
      tag: "Énigme 2 · Le bol de soupe",
      titre: "Dériver e^(ax + b)",
      question: `Un bol de soupe refroidit. Après t minutes, sa température vaut T(t) = 20 + 70e<sup>−0,1t</sup> en °C.<br><br><b>Combien vaut T′(0)</b>, la vitesse de refroidissement au départ ?`,
      reponse: `La dérivée de e<sup>kt</sup> est ke<sup>kt</sup> : T′(t) = 70 × (−0,1)e<sup>−0,1t</sup> = −7e<sup>−0,1t</sup>.<br><span class="big">T′(0) = −7 °C par minute</span> : au début, la soupe perd 7 °C par minute.`,
      consigne: "T(t) = 20 + 70e^(−0,1t). Combien vaut T′(0) ?",
      verification: { type: "courte", attendus: ["−7", "-7"], unite: "°C/min" },
      dessin: soupe,
    },
    {
      tag: "Énigme 3 · Les tartines de SVT",
      titre: "Une équation avec des exponentielles",
      question: `En SVT, deux moisissures poussent sur deux tartines. Après t jours, elles couvrent A(t) = e<sup>2t − 1</sup> et B(t) = e<sup>t + 3</sup> mm².<br><br><b>Après combien de jours</b> couvrent-elles la même surface ?`,
      reponse: `e<sup>a</sup> = e<sup>b</sup> ⟺ a = b. Donc 2t − 1 = t + 3, soit t = 4.<br><span class="big">Après 4 jours</span> : les deux surfaces valent e<sup>7</sup> mm².`,
      consigne: "e^(2t − 1) = e^(t + 3). Pour quel t ?",
      verification: { type: "courte", attendus: ["4"], unite: "jours" },
      dessin: tartines,
    },
    {
      tag: "Énigme 4 · La cloche du temple",
      titre: "Une suite cachée dans l'exponentielle",
      question: `On frappe une cloche. n secondes après, le son a pour intensité I<sub>n</sub> = 80e<sup>−0,5n</sup>.<br><br><b>Quelle est la nature de la suite (I<sub>n</sub>)</b> ?`,
      reponse: `I<sub>n+1</sub> = 80e<sup>−0,5n − 0,5</sup> = I<sub>n</sub> × e<sup>−0,5</sup>.<br><span class="big">Géométrique de raison e<sup>−0,5</sup></span> ≈ 0,61 : à chaque seconde, le son perd environ 39 %.`,
      consigne: "I(n) = 80e^(−0,5n). Quelle est la nature de la suite ?",
      verification: { type: "qcm", choix: ["arithmétique de raison −0,5", "géométrique de raison e^(−0,5)", "ni arithmétique ni géométrique"], bonne: 1 },
      dessin: cloche,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La nuée de criquets",
      sorte: "piege",
      question: `Une nuée de criquets est multipliée par e<sup>3</sup> la première semaine, puis par e<sup>4</sup> la deuxième.<br>Inès : « En tout, elle est multipliée par e<sup>12</sup>. »<br><br><b>Par combien est-elle multipliée en tout</b> ?`,
      reponse: `e<sup>3</sup> × e<sup>4</sup> = e<sup>3 + 4</sup> : on additionne les exposants, on ne les multiplie pas.<br><span class="big">Par e<sup>7</sup></span>, soit environ 1 097.`,
      consigne: "× e³ puis × e⁴. Par combien la nuée est-elle multipliée en tout ?",
      verification: { type: "qcm", choix: ["par e¹²", "par 12e", "par e⁷"], bonne: 2 },
      dessin: criquets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le funiculaire",
      sorte: "defi",
      question: `Le rail d'un funiculaire suit la courbe de y = e<sup>x</sup>. Un câble tendu suit la droite y = x + 1.<br><br><b>Combien de points communs</b> ont le rail et le câble ?`,
      reponse: `Soit h(x) = e<sup>x</sup> − x − 1. h′(x) = e<sup>x</sup> − 1 : négative avant 0, positive après. Le minimum est h(0) = 0.<br>Donc e<sup>x</sup> ≥ x + 1, avec égalité seulement en 0 : <span class="big">un seul point commun</span>, (0 ; 1). Le câble est la tangente en 0.`,
      consigne: "y = e^x et y = x + 1 : combien de points communs ?",
      verification: { type: "courte", attendus: ["1", "un"] },
      dessin: funiculaire,
    },
  ],
};

export default problemes;
