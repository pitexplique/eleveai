// Énigmes à projeter — première (sans spé maths), notion auto_equations (les
// deux taxis, le tatami carré, la prime partagée, le forfait de ski, piège du
// carré qui vaut 16, défi des deux robinets). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac } from "../outils";

const taxis = (() => {
  const R = repere(0, 10, 0, 18, { gl: 340, gh: 290, gy: 30, gx: 90, pasE: 2, pas: 2 });
  return svg("Le prix de deux taxis selon la distance : 3 plus 1,5 x et 6 plus x ; les droites se croisent",
    R.fond + R.courbe((x) => 3 + 1.5 * x, 0, 10, C.bleu, 5) + R.courbe((x) => 6 + x, 0, 10, C.jaune, 5) + R.point(6, 12, C.rose, 8) +
      t(R.X(2) + 14, R.Y(6) + 30, "A", C.bleu, 22) + t(R.X(2) - 8, R.Y(8) - 28, "B", C.jaune, 22) +
      t(R.X(10), R.Y(0) + 46, "km", C.pale, 17, "end") + t(240, 400, `même prix pour${NB}?`, C.rose, 26));
})();

const tatami = svg("Un tatami carré de 2,25 mètres carrés vu de dessus",
  r(130, 60, 220, 220, C.jaune, 0.25, 4, 4) +
    t(240, 175, "2,25 m²", C.craie, 28) + t(240, 310, "x", C.craie, 24) + t(110, 176, "x", C.craie, 24, "end") +
    t(240, 385, `le côté${NB}?`, C.rose, 28));

const prime = (() => {
  let s = "";
  for (let i = 0; i < 8; i++) s += `<circle cx="${75 + i * 47}" cy="200" r="18" fill="${C.bleu}" fill-opacity="0.25" stroke="${C.bleu}" stroke-width="3"/>` + t(75 + i * 47, 250, "15", C.craie, 18);
  return svg("Une prime de 120 euros partagée : chacun reçoit 15 euros",
    r(160, 60, 160, 70, C.jaune, 0.25, 3, 10) + t(240, 105, "120 €", C.craie, 28) + s +
      t(240, 300, "15 € chacun", C.pale, 20) + t(240, 385, `combien de personnes${NB}?`, C.rose, 26));
})();

const ski = svg("Le forfait de ski : 25 euros de location plus 18 euros par jour, budget 150 euros",
  p("M60 300 L200 120 L260 190 L320 90 L440 300 Z", C.pale, 4, 0.15) + p("M300 116 L320 90 L340 116", C.craie, 4) +
    r(60, 40, 170, 60, C.bleu, 0.15, 3, 8) + t(145, 78, "25 € + 18 €/jour", C.craie, 18) +
    r(300, 320, 140, 46, C.jaune, 0.2, 3, 8) + t(370, 350, "150 € max", C.craie, 18) +
    t(170, 400, `combien de jours${NB}?`, C.rose, 26));

const carre16 = svg("Le carré d'un nombre vaut 16 : deux nombres conviennent",
  t(240, 100, "? × ? = 16", C.craie, 40) +
    r(70, 160, 140, 90, C.bleu, 0.15, 3, 10) + t(140, 215, "4 × 4", C.bleu, 28) +
    r(270, 160, 140, 90, C.jaune, 0.15, 3, 10) + t(340, 215, "(−4) × (−4)", C.jaune, 24) +
    t(240, 385, `combien de solutions${NB}?`, C.rose, 26));

const robinets = svg("Deux robinets remplissent la même cuve : l'un en 3 heures, l'autre en 6 heures",
  p("M130 60 H180 V80 H160 V100", C.bleu, 5) + p("M350 60 H300 V80 H320 V100", C.jaune, 5) +
    l(160, 110, 160, 160, C.bleu, 3, "6 6") + l(320, 110, 320, 160, C.jaune, 3, "6 6") +
    r(110, 170, 260, 170, C.craie, 0, 4, 6) + r(114, 260, 252, 76, C.bleu, 0.25, 0) +
    t(120, 50, "3 h", C.bleu, 22, "end") + t(360, 50, "6 h", C.jaune, 22, "start") +
    t(240, 395, `les deux ensemble${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_equations",
  titre: "Énigmes des équations et inéquations",
  description: "Les deux taxis, le tatami carré, la prime partagée, le forfait de ski, le piège du carré qui vaut 16, le défi des deux robinets : ax + b = cx + d, x² = a, a/x = b, inéquation du premier degré.",
  problemes: [
    {
      tag: "Énigme 1 · Les deux taxis",
      titre: "Quand les prix se rejoignent",
      question: `Le taxi A coûte <b>3 €</b> plus <b>1,50 €</b> par km. Le taxi B coûte <b>6 €</b> plus <b>1 €</b> par km.<br><br><b>Pour combien de km</b> les deux prix sont-ils égaux ?`,
      reponse: `3 + 1,5x = 6 + x<br>1,5x − x = 6 − 3, donc 0,5x = 3 et <span class="big">x = 6 km</span>.<br>Vérification : 3 + 9 = 12 € et 6 + 6 = 12 €.`,
      consigne: "Résous 3 + 1,5x = 6 + x : pour combien de km les prix sont-ils égaux ?",
      verification: { type: "courte", attendus: ["6"], unite: "km" },
      dessin: taxis,
    },
    {
      tag: "Énigme 2 · Le tatami",
      titre: "x² = a",
      question: `Un tatami carré a une aire de <b>2,25 m²</b>.<br><br><b>Quelle est la longueur</b> de son côté ?`,
      reponse: `x² = 2,25, avec x > 0 (une longueur).<br>x = √2,25 = <span class="big">1,5 m</span>, car 1,5 × 1,5 = 2,25.`,
      consigne: "Un carré de 2,25 m² : quelle est la longueur de son côté ?",
      verification: { type: "qcm", choix: ["1,5 m", "1,125 m", "0,15 m"], bonne: 0 },
      dessin: tatami,
    },
    {
      tag: "Énigme 3 · La prime partagée",
      titre: "a/x = b",
      question: `Une équipe de bénévoles se partage une prime de <b>120 €</b>. Chacun reçoit <b>15 €</b>.<br>Si x est le nombre de bénévoles : ${frac(120, "x")} = 15.<br><br><b>Combien sont-ils</b> ?`,
      reponse: `${frac(120, "x")} = 15, donc 120 = 15x et x = 120 ÷ 15 = <span class="big">8</span> bénévoles.`,
      consigne: "120/x = 15 : que vaut x ?",
      verification: { type: "qcm", choix: ["1 800", "8", "105"], bonne: 1 },
      dessin: prime,
    },
    {
      tag: "Énigme 4 · Le forfait de ski",
      titre: "Une inéquation de budget",
      question: `Au ski, Nils paie <b>25 €</b> de location, puis <b>18 €</b> par jour de forfait. Son budget est de <b>150 €</b>.<br><br><b>Combien de jours</b> peut-il skier au maximum ?`,
      reponse: `25 + 18x ≤ 150, donc 18x ≤ 125 et x ≤ 6,9…<br>x est un nombre entier de jours : <span class="big">6 jours</span> (7 jours coûteraient 151 €).`,
      consigne: "25 + 18x ≤ 150, x entier : combien de jours au maximum ?",
      verification: { type: "qcm", choix: ["7 jours", "6,9 jours", "6 jours"], bonne: 2 },
      dessin: ski,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Un carré qui vaut 16",
      sorte: "piege",
      question: `Dans un jeu, le nombre mystère, élevé au carré, donne <b>16</b>.<br><br><b>Combien de nombres</b> peuvent être le nombre mystère ?`,
      reponse: `4² = 16, mais aussi (−4)² = 16 !<br>x² = 16 a <span class="big">2 solutions</span> : −4 et 4.`,
      consigne: "x² = 16 : combien de solutions ?",
      verification: { type: "courte", attendus: ["2", "deux"] },
      dessin: carre16,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux robinets",
      sorte: "defi",
      question: `Un robinet remplit une cuve en <b>3 h</b>, un autre en <b>6 h</b>.<br><br>Ouverts ensemble, <b>en combien d'heures</b> remplissent-ils la cuve ?`,
      reponse: `En 1 h : ${frac(1, 3)} + ${frac(1, 6)} = ${frac(3, 6)} = ${frac(1, 2)} de la cuve.<br>${frac(1, "x")} = ${frac(1, 2)}, donc <span class="big">x = 2 h</span>.`,
      consigne: "Un robinet remplit la cuve en 3 h, l'autre en 6 h : en combien d'heures ensemble ?",
      verification: { type: "courte", attendus: ["2"], unite: "h" },
      dessin: robinets,
    },
  ],
};

export default problemes;
