// Énigmes à projeter — terminale spé maths, notion primitive_integrale
// (la fontaine du parc, le métro automatique, le vitrail de la chapelle,
// l'éolienne, piège du piston de la pompe, défi du logo de l'appli). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

type Rep = ReturnType<typeof repereXY>;
/** La zone entre f (en haut) et g (en bas), de a à b. */
const zone = (R: Rep, f: (x: number) => number, g: (x: number) => number, a: number, b: number, c: string, op = 0.3) => {
  const n = 60;
  let d = "";
  for (let k = 0; k <= n; k++) { const x = a + ((b - a) * k) / n; d += `${k ? "L" : "M"}${R.X(x)} ${R.Y(f(x))} `; }
  for (let k = n; k >= 0; k--) { const x = a + ((b - a) * k) / n; d += `L${R.X(x)} ${R.Y(g(x))} `; }
  return p(d + "Z", c, 0, op);
};

const fontaine = svg("La fontaine du parc : le débit est f(t) = 3t² + 2 litres par minute ; on cherche le volume V(t) écoulé, avec V(0) = 0",
  p("M240 60 Q200 130 240 160 Q280 130 240 60 Z", C.bleu, 3, 0.3) +
    t(240, 220, "débit : f(t) = 3t² + 2", C.bleu, 28) + t(240, 260, "(en litres par minute)", C.pale, 20) +
    t(240, 320, "V′(t) = f(t) · V(0) = 0", C.craie, 26) + t(240, 390, `V(t) =${NB}?`, C.rose, 28));

const metro = (() => {
  const R = repereXY(0, 20, 0, 14, { gx: 80, gy: 50, gl: 350, gh: 270, px: 2, py: 2, ex: 4, ey: 4 });
  return svg("Vitesse du métro v(t) = 0,6 t de t = 0 à t = 20 secondes : une droite de 0 à 12 mètres par seconde ; la zone sous la droite est coloriée",
    R.fond + zone(R, (x) => 0.6 * x, () => 0, 0, 20, C.jaune) + R.courbe((x) => 0.6 * x, 0, 20, C.bleu, 4) +
      t(R.X(0) + 14, R.Y(12.5), "v(t) = 0,6 t (m/s)", C.bleu, 22, "start") + t(R.X(20), R.Y(0) - 12, "t (s)", C.pale, 18, "end") +
      t(240, 405, `distance en 20 s${NB}?`, C.rose, 24));
})();

const vitrail = (() => {
  const R = repereXY(-3, 3, -1, 5, { gx: 80, gy: 50, gl: 330, gh: 300, px: 1, py: 1, ex: 1, ey: 1 });
  return svg("Vitrail en forme d'arche : la zone sous la parabole y = 4 − x² et au-dessus de l'axe, de x = −2 à x = 2",
    R.fond.replace(">0</text>", "></text>").replace(/>−?2<\/text>/g, "></text>") + zone(R, (x) => 4 - x * x, () => 0, -2, 2, C.bleu, 0.3) + R.courbe((x) => 4 - x * x, -2, 2, C.bleu, 4) +
      t(R.X(0.6), R.Y(4.4), "y = 4 − x²", C.bleu, 22, "start") +
      t(240, 405, `aire du vitrail${NB}?`, C.rose, 24));
})();

const eolienne = (() => {
  const R = repereXY(0, 6, 0, 10, { gx: 80, gy: 50, gl: 350, gh: 280, px: 1, py: 1, ex: 1, ey: 2 });
  return svg("Puissance de l'éolienne P(t) = 6t − t² pendant 6 heures : elle monte jusqu'à 9 kilowatts à t = 3 puis redescend ; une droite en pointillés à 6 kilowatts",
    R.fond + R.courbe((x) => 6 * x - x * x, 0, 6, C.bleu, 4) + l(R.X(0), R.Y(6), R.X(6), R.Y(6), C.rose, 3, "8 6") +
      t(R.X(3), R.Y(2.6), "P(t) = 6t − t² (kW)", C.bleu, 22) + t(R.X(6) - 4, R.Y(6) - 12, "moyenne ?", C.rose, 20, "end") +
      t(R.X(5.5), R.Y(0) - 12, "t (h)", C.pale, 18, "end") +
      t(240, 405, `puissance moyenne${NB}?`, C.rose, 24));
})();

const piston = (() => {
  const R = repereXY(0, 7, -1.5, 1.5, { gx: 80, gy: 60, gl: 350, gh: 260, px: 1, py: 0.5, ex: 1, ey: 0.5 });
  const tau = 2 * Math.PI;
  return svg("Vitesse du piston v(t) = sin t de t = 0 à t = 2π : la courbe est au-dessus de l'axe de 0 à π, puis en dessous de π à 2π ; les deux zones ont la même aire",
    R.fond.replace(">0</text>", "></text>").replace(">3</text>", "></text>").replace(">6</text>", "></text>") + zone(R, Math.sin, () => 0, 0, Math.PI, C.jaune) + zone(R, () => 0, Math.sin, Math.PI, tau, C.rose) +
      R.courbe(Math.sin, 0, tau, C.bleu, 4) +
      t(R.X(1.57), R.Y(0.35), "+", C.craie, 30) + t(R.X(4.71), R.Y(-0.6), "−", C.craie, 30) +
      t(R.X(7), R.Y(1.2), "v(t) = sin t", C.bleu, 22, "end") +
      t(240, 405, `distance parcourue${NB}?`, C.rose, 24));
})();

const logo = (() => {
  const R = repereXY(0, 1.2, 0, 1.2, { gx: 90, gy: 50, gl: 300, gh: 300, px: 0.25, py: 0.25, ex: 0.5, ey: 0.5 });
  return svg("Logo en forme de feuille : la zone entre la courbe y = racine de x (en haut) et la parabole y = x² (en bas), de x = 0 à x = 1",
    R.fond + zone(R, Math.sqrt, (x) => x * x, 0, 1, C.jaune, 0.35) + R.courbe(Math.sqrt, 0, 1.2, C.bleu, 4) + R.courbe((x) => x * x, 0, 1.095, C.rose, 4) +
      t(R.X(0.62), R.Y(1.05), "y = √x", C.bleu, 22, "end") + t(R.X(0.78), R.Y(0.3), "y = x²", C.rose, 22, "start") +
      t(240, 405, `aire de la feuille${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "primitive_integrale",
  titre: "Énigmes des primitives et intégrales",
  description: "La fontaine du parc, le métro automatique, le vitrail de la chapelle, l'éolienne, le piège du piston de la pompe, le défi du logo de l'appli : primitive, intégrale, aire, valeur moyenne, aire entre deux courbes.",
  problemes: [
    {
      tag: "Énigme 1 · La fontaine du parc",
      titre: "Reconnaître une primitive",
      question: `Le débit d'une fontaine est f(t) = 3t² + 2, en litres par minute. Le volume écoulé V(t) vérifie V′ = f et V(0) = 0.<br><br><b>Que vaut V(t)</b> ?`,
      reponse: `On cherche une primitive de 3t² + 2 : la dérivée de t³ est 3t², celle de 2t est 2.<br><span class="big">V(t) = t³ + 2t</span>, et V(0) = 0.`,
      consigne: "f(t) = 3t² + 2 et V(0) = 0 : que vaut la primitive V(t) ?",
      verification: { type: "qcm", choix: ["t³ + 2t", "6t", "3t³ + 2t"], bonne: 0 },
      dessin: fontaine,
    },
    {
      tag: "Énigme 2 · Le métro automatique",
      titre: "Une distance, une intégrale",
      question: `Un métro automatique démarre. Sa vitesse est v(t) = 0,6t, en m/s, pendant les 20 premières secondes.<br><br><b>Quelle distance</b> parcourt-il en 20 s ?`,
      reponse: `d = ∫<sub>0</sub><sup>20</sup> 0,6t dt = [0,3t²]<sub>0</sub><sup>20</sup> = 0,3 × 400 − 0.<br>Il parcourt <span class="big">120 m</span> (l'aire du triangle : 20 × 12 ÷ 2).`,
      consigne: "v(t) = 0,6t de 0 à 20 s : quelle distance en mètres ?",
      verification: { type: "courte", attendus: ["120"], unite: "m" },
      dessin: metro,
    },
    {
      tag: "Énigme 3 · Le vitrail de la chapelle",
      titre: "Une intégrale, une aire",
      question: `Un vitrail a la forme de la zone sous la courbe y = 4 − x², au-dessus de l'axe, pour x de −2 à 2 (unité : le dm).<br><br><b>Quelle est son aire</b> ?`,
      reponse: `A = ∫<sub>−2</sub><sup>2</sup> (4 − x²) dx = [4x − ${frac("x³", 3)}]<sub>−2</sub><sup>2</sup> = (8 − ${frac(8, 3)}) − (−8 + ${frac(8, 3)}).<br>A = 16 − ${frac(16, 3)} = <span class="big">${frac(32, 3)} ≈ 10,7 dm²</span>.`,
      consigne: "Aire sous y = 4 − x² de x = −2 à x = 2, en dm² ?",
      verification: { type: "courte", attendus: ["32/3", "10,7", "10.7", "10,67", "10.67"], unite: "dm²" },
      dessin: vitrail,
    },
    {
      tag: "Énigme 4 · L'éolienne",
      titre: "La valeur moyenne",
      question: `Pendant une matinée de 6 heures, une éolienne fournit la puissance P(t) = 6t − t², en kW.<br><br><b>Quelle est sa puissance moyenne</b> ?`,
      reponse: `m = ${frac(1, 6)} ∫<sub>0</sub><sup>6</sup> (6t − t²) dt = ${frac(1, 6)} [3t² − ${frac("t³", 3)}]<sub>0</sub><sup>6</sup> = ${frac(1, 6)} (108 − 72).<br>m = <span class="big">6 kW</span> (le pic, lui, vaut 9 kW).`,
      consigne: "P(t) = 6t − t² sur [0 ; 6] : quelle est la valeur moyenne, en kW ?",
      verification: { type: "courte", attendus: ["6"], unite: "kW" },
      dessin: eolienne,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le piston de la pompe",
      sorte: "piege",
      question: `Le piston d'une pompe a la vitesse v(t) = sin t, en cm/s, de t = 0 à t = 2π.<br>Lucas : « ∫<sub>0</sub><sup>2π</sup> sin t dt = 0, donc le piston n'a parcouru aucune distance. »<br><br><b>Quelle distance</b> a-t-il parcourue ?`,
      reponse: `L'intégrale vaut 0 : l'aller (+2) et le retour (−2) s'annulent. Le piston revient à son point de départ.<br>Mais la distance compte les deux : 2 + 2 = <span class="big">4 cm</span>.`,
      consigne: "v(t) = sin t de 0 à 2π : quelle distance le piston a-t-il parcourue ?",
      verification: { type: "qcm", choix: ["0 cm", "4 cm", "2π cm"], bonne: 1 },
      dessin: piston,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le logo de l'appli",
      sorte: "defi",
      question: `Le logo d'une appli est une feuille : la zone entre y = √x (en haut) et y = x² (en bas), pour x de 0 à 1 (unité : le cm).<br><br><b>Quelle est l'aire de la feuille</b> ?`,
      reponse: `A = ∫<sub>0</sub><sup>1</sup> (√x − x²) dx = [${frac(2, 3)} x√x − ${frac("x³", 3)}]<sub>0</sub><sup>1</sup> = ${frac(2, 3)} − ${frac(1, 3)}.<br>A = <span class="big">${frac(1, 3)} cm²</span> : un tiers du carré de côté 1.`,
      consigne: "Aire entre y = √x et y = x² sur [0 ; 1] ?",
      verification: { type: "qcm", choix: ["1/2 cm²", "2/3 cm²", "1/3 cm²"], bonne: 2 },
      dessin: logo,
    },
  ],
};

export default problemes;
