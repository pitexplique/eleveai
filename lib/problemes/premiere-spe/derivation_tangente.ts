// Énigmes à projeter — première spé maths, notion derivation_tangente
// (l'atelier de confitures, le relevé de la géomètre, la bille du flipper,
// l'avion du vol Zéro-G, piège des phares dans le virage, défi du spot de
// la scène). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const confitures = svg("L'atelier de confitures : le coût de production de q pots est C(q) euros, et C′(50) = 3,2",
  [70, 160, 250, 340].map((x) => r(x, 120, 70, 90, C.jaune, 0.35, 3, 8) + r(x - 4, 100, 78, 22, C.rose, 0.4, 3, 4)).join("") +
    t(240, 60, "coût de q pots : C(q) €", C.craie, 24) + t(240, 270, "C′(50) = 3,2", C.bleu, 30) +
    t(240, 370, `que signifie C′(50)${NB}?`, C.rose, 28));

const geometre = (() => {
  const R = repereXY(-1, 4, -1, 6, { gx: 90, gy: 30, gl: 310, gh: 330, px: 1, py: 1 });
  return svg("Le relevé de la géomètre : la courbe d'un vallon et sa tangente au point d'abscisse 2 ; la tangente passe par les points (1 ; 0) et (3 ; 4)",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => 0.5 * x * x, -1, 3.4, C.bleu, 4) +
      R.courbe((x) => 2 * x - 2, 0.6, 3.8, C.rose, 3) + R.point(2, 2, C.rose) + R.point(1, 0, C.jaune, 6) + R.point(3, 4, C.jaune, 6) +
      t(R.X(0.15), R.Y(5.3), "courbe de f", C.bleu, 20, "start") +
      t(240, 405, `f′(2)${NB}?`, C.rose, 28));
})();

const flipper = (() => {
  const R = repereXY(-2, 3, -1, 5, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("La glissière du flipper suit y = x² + 1 ; la bille la quitte au point d'abscisse 1 et part tout droit, sur la tangente",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x + 1, -2, 1, C.bleu, 5) + R.point(1, 2, C.rose, 10) +
      l(R.X(1), R.Y(2), R.X(2), R.Y(4), C.rose, 3, "8 8") +
      t(R.X(1.3), R.Y(4.6), "y = x² + 1", C.bleu, 22, "start") + t(R.X(1.2), R.Y(1.5), "x = 1", C.rose, 20, "start") +
      t(240, 405, `équation de la tangente${NB}?`, C.rose, 26));
})();

const zeroG = svg("L'avion du vol Zéro-G : son altitude est h(t) = −5t² + 100t + 8 000 mètres et h′(t) = −10t + 100 ; on cherche quand la tangente est horizontale",
  p("M40 330 Q240 -10 440 330", C.bleu, 4) + l(170, 150, 310, 150, C.rose, 3, "8 8") +
    p("M225 165 l30 0 l-6 -10 l-20 0 z M230 165 l-12 -10 M245 160 l4 -14", C.craie, 3, 0.3) +
    t(240, 250, "h(t) = −5t² + 100t + 8 000", C.craie, 22) + t(240, 290, "h′(t) = −10t + 100", C.bleu, 24) +
    t(240, 390, `tangente horizontale : t =${NB}?`, C.rose, 26));

const phares = (() => {
  const R = repereXY(0, 5, 0, 18, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 2, ex: 1, ey: 4, quadrillage: true });
  return svg("La route du virage suit y = x² ; la voiture est au point d'abscisse 3 et ses phares éclairent selon la tangente",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x, 0, 4.2, C.craie, 6) +
      R.courbe((x) => 6 * x - 9, 2.2, 4.5, C.jaune, 4) + R.point(3, 9, C.rose, 10) +
      t(R.X(0.3), R.Y(15), "Lina : y = 6x + 9", C.craie, 22, "start") +
      t(240, 405, `le faisceau des phares${NB}?`, C.rose, 26));
})();

const spot = (() => {
  const R = repereXY(-3, 3, -1, 13, { gx: 90, gy: 30, gl: 320, gh: 330, px: 1, py: 2, ex: 1, ey: 4 });
  return svg("Un spot posé en O, au sol, envoie un rayon qui rase la courbe du décor y = x² + 4 en un seul point",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x + 4, -3, 3, C.bleu, 4) +
      R.courbe((x) => 4 * x, 0, 3, C.jaune, 3) + R.point(0, 0, C.rose, 9) +
      t(R.X(1.45), R.Y(1.3), "y = x² + 4", C.bleu, 22, "start") + t(R.X(-0.15), R.Y(0.7), "spot", C.rose, 20, "end") +
      t(240, 405, `point de contact : a =${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "derivation_tangente",
  titre: "Énigmes de la tangente",
  description: "L'atelier de confitures, le relevé de la géomètre, la bille du flipper, l'avion du vol Zéro-G, le piège des phares dans le virage, le défi du spot de la scène : coût marginal, lire f′(a), équation de la tangente.",
  problemes: [
    {
      tag: "Énigme 1 · L'atelier de confitures",
      titre: "Interpréter un nombre dérivé",
      question: `Un atelier produit q pots de confiture pour un coût de C(q) euros. On sait que C′(50) = 3,2.<br><br><b>Que représente, à peu près, ce nombre 3,2</b> ?`,
      reponse: `C′(50) est le coût marginal : quand on passe de 50 à 51 pots, le coût augmente d'environ 3,20 €.<br>C'est donc <span class="big">≈ le coût du 51e pot</span>.`,
      consigne: "C(q) est le coût de q pots et C′(50) = 3,2. Que représente 3,2 ?",
      verification: { type: "qcm", choix: ["le coût total de 50 pots", "le prix de vente d'un pot", "≈ le coût du 51e pot"], bonne: 2 },
      dessin: confitures,
    },
    {
      tag: "Énigme 2 · Le relevé de la géomètre",
      titre: "Lire f′(a) sur un graphique",
      question: `Une géomètre trace le profil d'un vallon (la courbe de f) et sa tangente au point d'abscisse 2. La tangente passe par (1 ; 0) et (3 ; 4).<br><br><b>Que vaut f′(2)</b> ?`,
      reponse: `f′(2) est le coefficient directeur de la tangente : (4 − 0) ÷ (3 − 1) = 4 ÷ 2.<br><span class="big">f′(2) = 2</span>.`,
      consigne: "La tangente en 2 passe par (1 ; 0) et (3 ; 4). Que vaut f′(2) ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: geometre,
    },
    {
      tag: "Énigme 3 · La bille du flipper",
      titre: "L'équation d'une tangente",
      question: `La glissière d'un flipper suit la courbe de f(x) = x² + 1 (f′(x) = 2x). La bille la quitte au point d'abscisse 1 et part tout droit, sur la tangente.<br><br><b>Quelle est l'équation de cette tangente</b> ?`,
      reponse: `f(1) = 2 et f′(1) = 2. y = f′(1)(x − 1) + f(1) = 2(x − 1) + 2.<br><span class="big">y = 2x</span>.`,
      consigne: "f(x) = x² + 1, f′(x) = 2x : la tangente au point d'abscisse 1 ?",
      verification: { type: "qcm", choix: ["y = 2x", "y = 2x + 2", "y = x + 2"], bonne: 0 },
      dessin: flipper,
    },
    {
      tag: "Énigme 4 · Le vol Zéro-G",
      titre: "Une tangente horizontale",
      question: `Pour faire flotter des passagers, un avion suit une parabole. Son altitude, en mètres, vaut h(t) = −5t² + 100t + 8 000, et h′(t) = −10t + 100.<br><br><b>À quel instant t la tangente est-elle horizontale</b> ?`,
      reponse: `Tangente horizontale ⟺ h′(t) = 0 ⟺ −10t + 100 = 0 ⟺ <span class="big">t = 10 s</span>.<br>C'est le sommet du vol : h(10) = −500 + 1 000 + 8 000 = 8 500 m.`,
      consigne: "h′(t) = −10t + 100 : pour quel t la tangente est-elle horizontale ?",
      verification: { type: "courte", attendus: ["10"], unite: "s" },
      dessin: zeroG,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les phares dans le virage",
      sorte: "piege",
      question: `Dans un virage, la route suit la courbe de f(x) = x² (f′(x) = 2x). Les phares d'une voiture, au point d'abscisse 3, éclairent selon la tangente.<br>Lina : « f(3) = 9 et f′(3) = 6, donc y = 6x + 9. »<br><br><b>Quelle est l'équation de la tangente</b> ?`,
      reponse: `La formule est y = f′(a)(x − a) + f(a) : il ne faut pas oublier le « − a ».<br>y = 6(x − 3) + 9 = <span class="big">6x − 9</span>. Vérification : en x = 3, 18 − 9 = 9.`,
      consigne: "f(x) = x², f′(x) = 2x : la tangente au point d'abscisse 3 ?",
      verification: { type: "qcm", choix: ["y = 6x + 9", "y = 6x − 9", "y = 9x + 6"], bonne: 1 },
      dessin: phares,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le spot de la scène",
      sorte: "defi",
      question: `Au théâtre, le bord d'un décor suit la courbe de f(x) = x² + 4 (f′(x) = 2x). Un spot posé au sol, en O, envoie un rayon qui rase le décor.<br><br><b>En quel point d'abscisse a > 0</b> le rayon touche-t-il la courbe ?`,
      reponse: `La tangente en a : y = 2a(x − a) + a² + 4 = 2ax − a² + 4. Elle passe par O si −a² + 4 = 0, soit a² = 4.<br><span class="big">a = 2</span> : le rayon touche le décor en (2 ; 8), sur la droite y = 4x.`,
      consigne: "f(x) = x² + 4 : pour quel a > 0 la tangente en a passe-t-elle par O ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: spot,
    },
  ],
};

export default problemes;
