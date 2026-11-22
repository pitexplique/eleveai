// Énigmes à projeter — première (sans spé maths), notion auto_lecture_graphique
// (la température d'une journée, la marée, les visites d'un site web, le câble
// du pont, piège de l'axe qui ne part pas de 0, défi de la distance de
// freinage). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repere, type Repere } from "../dessins-2de";

/** Une ligne brisée par des points. */
const brisee = (R: Repere, pts: [number, number][], c: string = C.bleu, ep = 5) =>
  p(pts.map(([x, y], k) => `${k ? "L" : "M"}${R.X(x)} ${R.Y(y)}`).join(" "), c, ep);

const temperature = (() => {
  const R = repere(0, 24, 0, 30, { gl: 340, gh: 290, gy: 30, gx: 90, pasE: 6, pas: 3 });
  return svg("La température d'une journée : 12 degrés à minuit, 10 à 6 h, 26 à 14 h, 18 à 20 h, 14 à minuit",
    R.fond + brisee(R, [[0, 12], [6, 10], [14, 26], [20, 18], [24, 14]], C.rose) +
      l(R.X(14), R.Y(0), R.X(14), R.Y(26), C.bleu, 2.5, "8 6") + t(R.X(14) + 10, R.Y(0) - 12, "14 h", C.bleu, 18, "start") +
      t(R.X(24), R.Y(0) + 46, "heure", C.pale, 17, "end") + t(R.X(0) + 8, R.Y(30) - 8, "°C", C.pale, 17, "start") +
      t(240, 400, `la température à 14 h${NB}?`, C.rose, 24));
})();

const maree = (() => {
  const R = repere(0, 12, 0, 7, { gl: 340, gh: 280, gy: 40, gx: 90, pasE: 1, pas: 1 });
  return svg("La hauteur de la marée entre 0 et 12 heures, qui monte et descend deux fois entre 2 et 6 mètres ; un trait à 4 mètres",
    R.fond + brisee(R, [[0, 2], [3, 6], [6, 2], [9, 6], [12, 2]], C.bleu) +
      l(R.X(0), R.Y(4), R.X(12), R.Y(4), C.rose, 3, "8 6") + t(R.X(12) + 6, R.Y(4) + 6, "4 m", C.rose, 18, "start") +
      t(R.X(12), R.Y(0) + 46, "heure", C.pale, 17, "end") + t(240, 405, `combien de fois 4 m${NB}?`, C.rose, 24));
})();

const site = (() => {
  const R = repere(0, 6, 0, 40, { gl: 330, gh: 270, gy: 50, gx: 100, pasE: 10, pas: 10 });
  const mois = ["J", "F", "M", "A", "M", "J"];
  const v = [12, 18, 22, 30, 26, 34];
  let s = "";
  v.forEach((y, i) => { s += r(R.X(i + 0.2), R.Y(y), R.X(0.6) - R.X(0), R.Y(0) - R.Y(y), C.bleu, 0.35, 2, 2) + t(R.X(i + 0.5), R.Y(0) + 24, mois[i], C.pale, 16); });
  return svg("Les visites d'un site web par mois, en milliers ; en avril, la barre monte à 30",
    R.fond + s + t(R.X(0) + 6, 34, "milliers de visites", C.pale, 17, "start") +
      t(R.X(3.5), R.Y(30) - 10, "avril", C.rose, 18) + t(240, 405, `combien de visites${NB}?`, C.rose, 24));
})();

const pont = (() => {
  const R = repere(-4, 4, 0, 18, { gl: 320, gh: 290, gy: 30, gx: 110, pasE: 2, pas: 2 });
  return svg("Le câble d'un pont suit la courbe y = x² + 1 ; le point A(3 ; 10) est marqué",
    R.fond + R.courbe((x) => x * x + 1, -4, 4, C.bleu, 5) + R.point(3, 10, C.rose, 8) +
      t(R.X(3) - 14, R.Y(10) + 6, "A(3 ; 10)", C.rose, 18, "end") + t(R.X(-1.2), R.Y(15), "y = x² + 1", C.bleu, 20, "end") +
      t(240, 400, `A est-il sur le câble${NB}?`, C.rose, 24));
})();

const ventes = (() => {
  const R = repere(0, 2, 95, 105, { gl: 300, gh: 270, gy: 40, gx: 120, pasE: 5, pas: 1 });
  return svg("Deux barres de ventes, 98 puis 102 ; l'axe vertical commence à 95, ce qui exagère l'écart",
    R.fond.replace(">0</text>", "></text>") + r(R.X(0.25), R.Y(98), R.X(0.5) - R.X(0), R.Y(95) - R.Y(98), C.bleu, 0.35, 3) + r(R.X(1.25), R.Y(102), R.X(0.5) - R.X(0), R.Y(95) - R.Y(102), C.jaune, 0.35, 3) +
      t(R.X(0.5), R.Y(98) - 10, "98", C.craie, 20) + t(R.X(1.5), R.Y(102) - 10, "102", C.craie, 20) +
      t(240, 30, "« Les ventes explosent ! »", C.craie, 20) + t(240, 405, `la vraie hausse${NB}?`, C.rose, 26));
})();

const freinage = (() => {
  const R = repere(0, 130, 0, 90, { gl: 330, gh: 280, gy: 40, gx: 100, pasE: 20, pas: 10 });
  return svg("La distance de freinage d = 0,005 v² ; un trait horizontal à 50 mètres",
    R.fond + R.courbe((v) => 0.005 * v * v, 0, 130, C.bleu, 5) +
      l(R.X(0), R.Y(50), R.X(130), R.Y(50), C.rose, 3, "8 6") + t(R.X(130) - 4, R.Y(50) - 10, "50 m", C.rose, 18, "end") +
      t(R.X(60), R.Y(60), "d = 0,005v²", C.bleu, 20, "end") + t(R.X(130), R.Y(0) + 46, "km/h", C.pale, 17, "end") +
      t(240, 405, `à quelle vitesse${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_lecture_graphique",
  titre: "Énigmes pour lire un graphique",
  description: "La température d'une journée, la marée, les visites d'un site web, le câble du pont, le piège de l'axe qui ne part pas de 0, le défi de la distance de freinage : images, antécédents, unités et échelles, équation d'une courbe.",
  problemes: [
    {
      tag: "Énigme 1 · La journée",
      titre: "Lire une image",
      question: `Le graphique donne la température d'une ville au cours d'une journée.<br><br><b>Quelle température</b> fait-il à 14 h ?`,
      reponse: `On part de 14 sur l'axe des heures, on monte jusqu'à la courbe, puis on lit à gauche.<br>Il fait <span class="big">26 °C</span> : c'est le plus chaud de la journée.`,
      consigne: "D'après la courbe, quelle température fait-il à 14 h ?",
      verification: { type: "courte", attendus: ["26"], unite: "°C" },
      dessin: temperature,
    },
    {
      tag: "Énigme 2 · La marée",
      titre: "Compter les antécédents",
      question: `Dans un port, la hauteur d'eau monte et descend avec la marée.<br><br>Entre 0 h et 12 h, <b>combien de fois</b> la hauteur vaut-elle exactement 4 m ?`,
      reponse: `On trace la droite horizontale à 4 m et on compte les points de rencontre.<br>Elle coupe la courbe <span class="big">4 fois</span> : 4 a quatre antécédents (vers 1 h 30, 4 h 30, 7 h 30, 10 h 30).`,
      consigne: "Combien de fois la hauteur vaut-elle 4 m entre 0 h et 12 h ?",
      verification: { type: "qcm", choix: ["2 fois", "4 fois", "1 fois"], bonne: 1 },
      dessin: maree,
    },
    {
      tag: "Énigme 3 · Le site web",
      titre: "Lire l'unité",
      question: `Le graphique donne les visites d'un site web chaque mois. L'axe est gradué <b>en milliers</b>.<br><br><b>Combien de visites</b> en avril ?`,
      reponse: `La barre d'avril monte à 30, et l'unité est le millier.<br>30 × 1 000 = <span class="big">30 000 visites</span>.`,
      consigne: "La barre d'avril monte à 30, en milliers de visites : combien de visites ?",
      verification: { type: "qcm", choix: ["30 000 visites", "30 visites", "3 000 visites"], bonne: 0 },
      dessin: site,
    },
    {
      tag: "Énigme 4 · Le câble du pont",
      titre: "Un point sur la courbe ?",
      question: `Le câble d'un pont suit la courbe d'équation y = x² + 1.<br><br><b>Le point A(3 ; 10)</b> est-il sur le câble ?`,
      reponse: `On remplace x par 3 : 3² + 1 = 9 + 1 = 10.<br>On trouve l'ordonnée de A : <span class="big">oui</span>, A est sur la courbe.`,
      consigne: "Le point A(3 ; 10) est-il sur la courbe y = x² + 1 ?",
      verification: { type: "qcm", choix: ["Non, il est au-dessus", "Non, il est en dessous", "Oui"], bonne: 2 },
      dessin: pont,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'axe qui ne part pas de 0",
      sorte: "piege",
      question: `Un journal titre « Les ventes explosent ! » avec ce graphique : la barre de droite paraît bien plus haute.<br>Les ventes passent de <b>98</b> à <b>102</b> milliers.<br><br><b>De quel pourcentage</b> ont-elles augmenté, arrondi à l'unité ?`,
      reponse: `L'axe commence à 95, pas à 0 : l'écart est grossi !<br>(102 − 98) ÷ 98 ≈ 0,04 : une hausse de <span class="big">4 %</span> seulement.`,
      consigne: "De 98 à 102 milliers : quelle hausse en %, arrondie à l'unité ?",
      verification: { type: "courte", attendus: ["4"], unite: "%" },
      dessin: ventes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La distance de freinage",
      sorte: "defi",
      question: `Sur route sèche, la distance de freinage d'une voiture est environ d = 0,005v², en mètres (v en km/h).<br><br><b>À quelle vitesse</b> la distance de freinage atteint-elle 50 m ?`,
      reponse: `0,005v² = 50, donc v² = 50 ÷ 0,005 = 10 000.<br>v > 0, donc <span class="big">v = 100 km/h</span>. Le graphique le confirme. Deux fois plus vite, quatre fois plus loin !`,
      consigne: "0,005v² = 50 avec v > 0 : que vaut v, en km/h ?",
      verification: { type: "courte", attendus: ["100"], unite: "km/h" },
      dessin: freinage,
    },
  ],
};

export default problemes;
