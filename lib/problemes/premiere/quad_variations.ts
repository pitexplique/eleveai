// Énigmes à projeter — première (sans spé maths), notion quad_variations
// (le producteur de melons, le bassin de plongée, le saut de la sauterelle, les
// casques de vélo, piège de l'arroseur de jardin, défi du musée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const melons = (() => {
  const R = repereXY(0, 20, 0, 45, { gx: 80, gy: 40, gl: 340, gh: 270, px: 2, ex: 4, py: 5, ey: 10 });
  return svg("Bénéfice d'un producteur de melons : B(x) = −(x − 4)(x − 16), une parabole tournée vers le bas entre 4 et 16",
    R.fond + R.courbe((x) => -(x - 4) * (x - 16), 4, 16, C.bleu, 4) + t(R.X(10), R.Y(36) - 14, "?", C.jaune, 24) +
      t(R.X(0) + 10, 28, "bénéfice (k€)", C.pale, 17, "start") + t(R.X(20), R.Y(0) + 46, "melons (tonnes)", C.pale, 17, "end") +
      t(240, 405, `le bénéfice maximal${NB}?`, C.rose, 24));
})();

const bassin = (() => {
  const R = repereXY(0, 8, -20, 4, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 2, ey: 4 });
  return svg("Fond d'un bassin de plongée : f(x) = 2(x − 1)(x − 7), une parabole en creux entre 1 et 7",
    R.fond + R.courbe((x) => 2 * (x - 1) * (x - 7), 1, 7, C.bleu, 4) + l(R.X(4), R.Y(4), R.X(4), R.Y(-20), C.rose, 3, "8 6") +
      t(R.X(4) + 8, R.Y(1.2), "x = 4", C.rose, 18, "start") +
      t(R.X(0) + 10, 28, "profondeur (dm)", C.pale, 17, "start") +
      t(240, 405, `minimum ou maximum${NB}?`, C.rose, 24));
})();

const sauterelle = svg("Tableau de variations de f(x) = −0,5(x − 2)(x − 10) : f monte, puis descend ; la valeur de x où elle change est inconnue",
  t(240, 40, "f(x) = −0,5(x − 2)(x − 10)", C.bleu, 22) +
    r(40, 70, 400, 180, C.craie, 0, 3) + l(40, 120, 440, 120, C.craie, 2) + l(120, 70, 120, 250, C.craie, 2) +
    t(80, 103, "x", C.craie, 22) + t(80, 192, "f", C.craie, 22) +
    t(155, 103, "−∞", C.craie, 22) + t(280, 103, "?", C.jaune, 26) + t(410, 103, "+∞", C.craie, 22) +
    fleche(160, 232, 262, 145, C.bleu, 4) + fleche(298, 145, 400, 232, C.bleu, 4) +
    t(240, 385, `f monte jusqu'à x = ${NB}?`, C.rose, 24));

const casques = (() => {
  const R = repereXY(0, 10, 0, 30, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 5, ey: 10, quadrillage: false });
  return svg("Coût moyen de casques de vélo : parabole tournée vers le haut, minimum en x = 5 ; deux traits en x = 7 et x = 9",
    R.fond + R.courbe((x) => (x - 5) * (x - 5) + 2, 0, 10, C.bleu, 4) + l(R.X(5), R.Y(0), R.X(5), R.Y(30), C.rose, 3, "8 6") +
      l(R.X(7), R.Y(0), R.X(7), R.Y(6), C.jaune, 3, "6 5") + l(R.X(9), R.Y(0), R.X(9), R.Y(18), C.jaune, 3, "6 5") +
      t(R.X(5) + 8, R.Y(28), "x = 5", C.rose, 18, "start") +
      t(R.X(0) + 10, 28, "coût moyen (€)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "centaines de casques", C.pale, 17, "end") +
      t(240, 405, `f(7) ou f(9)${NB}: le plus petit${NB}?`, C.rose, 24));
})();

const arroseur = (() => {
  const R = repereXY(0, 7, 0, 3, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 0.5, ey: 1 });
  return svg("Jet d'un arroseur de jardin : h(x) = −0,2x(x − 6), de x = 0 à x = 6",
    R.fond + R.courbe((x) => -0.2 * x * (x - 6), 0, 6, C.bleu, 4) +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(7), R.Y(0) + 46, "distance (m)", C.pale, 17, "end") +
      t(240, 405, `le maximum de h${NB}?`, C.rose, 24));
})();

const musee = (() => {
  const R = repereXY(8, 20, 0, 10, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 1, ey: 2, quadrillage: false, etiquettes: true });
  return svg("Visiteurs d'un musée selon l'heure : parabole tournée vers le bas, sommet à 14 h",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => 9 - 0.25 * (x - 14) * (x - 14), 8, 20, C.bleu, 4) +
      l(R.X(14), R.Y(0), R.X(14), R.Y(10), C.rose, 3, "8 6") + t(R.X(14) + 8, R.Y(9.8) + 6, "14 h", C.rose, 18, "start") +
      t(R.X(8) + 10, 28, "visiteurs (centaines)", C.pale, 17, "start") + t(R.X(20), R.Y(0) + 46, "heure", C.pale, 17, "end") +
      t(240, 405, `10 h, 16 h ou 19 h${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "quad_variations",
  titre: "Énigmes des variations d'une fonction du second degré",
  description: "Le producteur de melons, le bassin de plongée, le saut de la sauterelle, les casques de vélo, le piège de l'arroseur de jardin, le défi du musée : trouver un maximum ou un minimum, dresser le tableau de variations, comparer deux images sans les calculer.",
  problemes: [
    {
      tag: "Énigme 1 · Le producteur de melons",
      titre: "Le maximum",
      question: `Un producteur vend x tonnes de melons. Son bénéfice, en k€, est B(x) = −(x − 4)(x − 16).<br><br><b>Quel est</b> son bénéfice maximal ?`,
      reponse: `a = −1 &lt; 0 : il y a un maximum, sur l'axe. Axe : (4 + 16) ÷ 2 = 10.<br>B(10) = −(6) × (−6) = <span class="big">36 k€</span>, pour 10 tonnes.`,
      consigne: "B(x) = −(x − 4)(x − 16) : quel est le bénéfice maximal (en k€) ?",
      verification: { type: "courte", attendus: ["36"], unite: "k€" },
      dessin: melons,
    },
    {
      tag: "Énigme 2 · Le bassin de plongée",
      titre: "Minimum ou maximum",
      question: `Le fond d'un bassin de plongée a la forme f(x) = 2(x − 1)(x − 7), en dm. Son axe est x = 4.<br><br>En x = 4, f a-t-elle <b>un minimum ou un maximum</b> ?`,
      reponse: `a = 2 > 0 : la parabole est en creux (∪). Sur l'axe, f a un <span class="big">minimum</span>.<br>f(4) = 2 × 3 × (−3) = −18 : le point le plus profond est à 18 dm.`,
      consigne: "f(x) = 2(x − 1)(x − 7), axe x = 4 : minimum ou maximum en x = 4 ?",
      verification: { type: "qcm", choix: ["Un minimum, car a = 2 > 0", "Un maximum, car a = 2 > 0", "Un minimum, car 7 > 1"], bonne: 0 },
      dessin: bassin,
    },
    {
      tag: "Énigme 3 · Le saut de la sauterelle",
      titre: "Le tableau de variations",
      question: `Le saut d'une sauterelle suit f(x) = −0,5(x − 2)(x − 10).<br><br><b>Jusqu'à quelle valeur</b> de x la fonction f est-elle croissante ?`,
      reponse: `a = −0,5 &lt; 0 : f monte, puis descend. Elle change sur l'axe : (2 + 10) ÷ 2 = 6.<br>f est croissante jusqu'à <span class="big">x = 6</span>, puis décroissante.`,
      consigne: "f(x) = −0,5(x − 2)(x − 10) : jusqu'à quelle valeur de x f est-elle croissante ?",
      verification: { type: "courte", attendus: ["6", "x = 6", "x=6"] },
      dessin: sauterelle,
    },
    {
      tag: "Énigme 4 · Les casques de vélo",
      titre: "Comparer sans calculer",
      question: `Le coût moyen de fabrication de casques de vélo est une parabole tournée vers le haut. Son minimum est en x = 5.<br><br><b>Que peut-on dire</b> de f(7) et f(9) ?`,
      reponse: `Après le minimum (x ≥ 5), f est croissante. Or 7 &lt; 9.<br>Donc <span class="big">f(7) &lt; f(9)</span>, sans aucun calcul.`,
      consigne: "Parabole vers le haut, minimum en x = 5 : comparer f(7) et f(9).",
      verification: { type: "qcm", choix: ["f(7) > f(9)", "f(7) = f(9)", "f(7) < f(9)"], bonne: 2 },
      dessin: casques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'arroseur de jardin",
      sorte: "piege",
      question: `Le jet d'un arroseur de jardin suit h(x) = −0,2x(x − 6), en m.<br><br><b>Quel est</b> le maximum de h ?`,
      reponse: `L'axe est x = 3 : c'est <b>où</b> le maximum est atteint, pas sa valeur !<br>h(3) = −0,2 × 3 × (−3) = <span class="big">1,8 m</span>.`,
      consigne: "h(x) = −0,2x(x − 6) : quel est le maximum de h ?",
      verification: { type: "qcm", choix: ["3 m", "1,8 m", "6 m"], bonne: 1 },
      dessin: arroseur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le musée",
      sorte: "defi",
      question: `Le nombre de visiteurs d'un musée suit une parabole tournée vers le bas, de sommet à 14 h.<br><br><b>À quelle heure</b> y a-t-il le plus de visiteurs : 10 h, 16 h ou 19 h ?`,
      reponse: `Plus on est près de l'axe, plus il y a de visiteurs. Distances à 14 h : 4 h, 2 h et 5 h.<br>La plus proche est <span class="big">16 h</span>. (Ensuite 10 h, puis 19 h.)`,
      consigne: "Parabole vers le bas, sommet à 14 h : à quelle heure le plus de visiteurs, 10 h, 16 h ou 19 h ?",
      verification: { type: "courte", attendus: ["16", "16 h", "16h"], unite: "h" },
      dessin: musee,
    },
  ],
};

export default problemes;
