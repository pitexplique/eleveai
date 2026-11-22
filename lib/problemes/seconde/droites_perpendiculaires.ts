// Énigmes à projeter — seconde, notion droites_perpendiculaires (le pixel art,
// le plan des deux rues, le chemin de la ferme vers la voie ferrée, les balises
// de la course d'orientation, piège de la bande du billard, défi du nageur qui
// rejoint la côte). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, grille } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac } from "../outils";

const pixel = (() => {
  const X = (u: number) => 40 + 40 * u, Y = (v: number) => 340 - 40 * v;
  return svg("Sur un quadrillage, une droite qui monte de 3 carreaux pour 1 vers la droite, et une droite perpendiculaire qui descend de 1 carreau",
    grille(40, 20, 10, 8, 40) + l(X(3), Y(0), X(5.33), Y(7), C.bleu, 5) + l(X(1), Y(4), X(10), Y(1), C.rose, 5) +
      l(X(4), Y(3), X(7), Y(3), C.jaune, 4, "8 6") + l(X(7), Y(3), X(7), Y(2), C.jaune, 4, "8 6") +
      t(X(5.5), Y(3) - 10, "?", C.jaune, 24) + t(X(7) + 10, Y(2.5) + 7, "1", C.jaune, 22, "start") + t(X(5.4), Y(7) + 20, "d", C.bleu, 22, "start") +
      t(240, 395, `combien de carreaux${NB}?`, C.rose, 26));
})();

const rues = (() => {
  const R = repere(-1, 5, 0, 8, { gl: 240, gh: 320, gy: 20, gx: 120, pasE: 1 });
  return svg("Les droites y égale 3x plus 1 et y égale moins un tiers de x plus 5, qui se coupent",
    R.fond + R.courbe((x) => 3 * x + 1, -1 / 3, 7 / 3, C.bleu, 5) + R.courbe((x) => -x / 3 + 5, -1, 5, C.jaune, 5) +
      t(R.X(2.3) + 8, R.Y(7.6), "y = 3x + 1", C.bleu, 17, "start") + t(R.X(5), R.Y(3.4) + 32, "y = −x ÷ 3 + 5", C.jaune, 17, "end") +
      t(240, 400, `perpendiculaires${NB}?`, C.rose, 26));
})();

const ferme = (() => {
  const R = repere(0, 6, 0, 6, { gl: 300, gh: 300, gy: 20, gx: 110, pasE: 1 });
  return svg("La voie ferrée y égale 2x, la ferme au point 4 ; 1 et le chemin perpendiculaire en pointillés",
    R.fond + R.courbe((x) => 2 * x, 0, 3, C.bleu, 5) + R.courbe((x) => -0.5 * x + 3, 0, 6, C.rose, 3).replace("/>", ` stroke-dasharray="10 8"/>`) +
      R.point(4, 1, C.jaune, 8) + t(R.X(4), R.Y(1) + 30, "F(4 ; 1)", C.jaune, 18) + t(R.X(3) + 8, R.Y(5.8), "y = 2x", C.bleu, 18, "start") +
      t(R.X(5.6), R.Y(0.2) - 14, "?", C.rose, 26) + t(240, 400, `l'équation du chemin${NB}?`, C.rose, 26));
})();

const balises = (() => {
  const R = repere(0, 5, 0, 5, { gl: 300, gh: 300, gy: 20, gx: 110, pasE: 1 });
  return svg("Le triangle des balises A en 0 ; 0, B en 4 ; 2 et C en 3 ; 4",
    R.fond + `<path d="M${R.X(0)} ${R.Y(0)} L${R.X(4)} ${R.Y(2)} L${R.X(3)} ${R.Y(4)} Z" fill="${C.jaune}" fill-opacity="0.15" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>` +
      R.point(0, 0, C.rose, 7) + R.point(4, 2, C.rose, 7) + R.point(3, 4, C.rose, 7) +
      t(R.X(1.3), R.Y(0) - 6, "A", C.rose, 22) + t(R.X(4) + 12, R.Y(2) + 8, "B(4 ; 2)", C.rose, 18, "start") + t(R.X(3), R.Y(4) - 14, "C(3 ; 4)", C.rose, 18) +
      t(240, 400, `l'angle droit${NB}?`, C.rose, 26));
})();

const billard = (() => {
  const R = repere(-2, 2, -3, 3, { gl: 200, gh: 300, gy: 20, gx: 150, pasE: 1 });
  return svg("La bande y égale moins 4x plus 1 et la trajectoire perpendiculaire de la bille",
    R.fond + R.courbe((x) => -4 * x + 1, -0.5, 1, C.bleu, 5) + R.courbe((x) => 0.25 * x + 1, -2, 2, C.rose, 4).replace("/>", ` stroke-dasharray="10 8"/>`) +
      R.point(0, 1, C.craie, 6) + t(R.X(1) + 10, R.Y(-2.6), "y = −4x + 1", C.bleu, 17, "start") + t(R.X(2) + 6, R.Y(1.5) - 6, `pente${NB}?`, C.rose, 18, "start") +
      t(240, 400, `la pente perpendiculaire${NB}?`, C.rose, 24));
})();

const nageur = (() => {
  const R = repere(0, 7, 0, 6, { gl: 350, gh: 300, gy: 20, gx: 80, pasE: 1 });
  return svg("La côte suit la droite y égale 2x ; le nageur est au point 6 ; 2 ; le chemin le plus court arrive perpendiculairement",
    `<path d="M${R.X(0)} ${R.Y(0)} L${R.X(3)} ${R.Y(6)} L${R.X(7)} ${R.Y(6)} L${R.X(7)} ${R.Y(0)} Z" fill="${C.bleu}" fill-opacity="0.12" stroke="none"/>` +
      R.fond + R.courbe((x) => 2 * x, 0, 3, C.jaune, 5) + R.courbe((x) => -0.5 * x + 5, 2, 6, C.rose, 3).replace("/>", ` stroke-dasharray="10 8"/>`) +
      R.point(6, 2, C.rose, 8) + t(R.X(6) + 12, R.Y(2) + 30, "nageur (6 ; 2)", C.rose, 18, "end") + R.point(2, 4, C.craie, 6) + t(R.X(2) - 12, R.Y(4) + 6, "?", C.craie, 24, "end") +
      t(R.X(1.2) - 8, R.Y(4.6), "côte", C.jaune, 18, "end") + t(R.X(5.4), R.Y(5.2), "mer", C.bleu, 20) + t(240, 400, `le point d'arrivée${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "droites_perpendiculaires",
  titre: "Énigmes des droites perpendiculaires",
  description: "Le pixel art, le plan des deux rues, le chemin de la ferme, les balises de la course d'orientation, le piège de la bande du billard, le défi du nageur : droites perpendiculaires quand le produit des coefficients directeurs vaut −1.",
  problemes: [
    {
      tag: "Énigme 1 · Le pixel art",
      titre: "Tourner d'un quart de tour",
      question: `Dans un dessin en pixels, la droite d monte de <b>3 carreaux</b> quand on avance de <b>1</b> : sa pente est 3.<br>On trace la droite perpendiculaire à d. Elle descend de <b>1 carreau</b>.<br><br><b>De combien de carreaux</b> avance-t-elle vers la droite ?`,
      reponse: `La pente perpendiculaire vaut −${frac(1, 3)} : on descend de 1 en avançant de 3.<br>Elle avance de <span class="big">3 carreaux</span>. Vérification : 3 × (−${frac(1, 3)}) = −1.`,
      consigne: "Pente de d : 3. La perpendiculaire descend de 1 carreau : de combien avance-t-elle ?",
      verification: { type: "courte", attendus: ["3"], unite: "carreaux" },
      dessin: pixel,
    },
    {
      tag: "Énigme 2 · Les deux rues",
      titre: "Un carrefour à angle droit ?",
      question: `Sur le plan d'un nouveau quartier, une rue suit y = 3x + 1, une autre suit y = −${frac("x", 3)} + 5.<br><br><b>Les deux rues sont-elles perpendiculaires</b> ?`,
      reponse: `On multiplie les coefficients directeurs : 3 × (−${frac(1, 3)}) = −1.<br><span class="big">Oui</span> : le produit vaut −1, le carrefour est à angle droit.`,
      consigne: "Les droites y = 3x + 1 et y = −x ÷ 3 + 5 sont-elles perpendiculaires ?",
      verification: { type: "qcm", choix: ["Oui, car 3 × (−1 ÷ 3) = −1", "Non, car les pentes sont différentes", "Non, car 3 + (−1 ÷ 3) ≠ 0"], bonne: 0 },
      dessin: rues,
    },
    {
      tag: "Énigme 3 · Le chemin de la ferme",
      titre: "Droit vers la voie ferrée",
      question: `Une voie ferrée suit la droite y = 2x. On trace un chemin <b>perpendiculaire</b> à la voie, qui part de la ferme F(4 ; 1).<br><br><b>Quelle est l'équation</b> du chemin ?`,
      reponse: `Pente perpendiculaire : m × 2 = −1, donc m = −0,5. Le chemin : y = −0,5x + b.<br>Il passe par F : 1 = −0,5 × 4 + b, donc b = 3. <span class="big">y = −0,5x + 3</span>.`,
      consigne: "Quelle est l'équation de la perpendiculaire à y = 2x passant par F(4 ; 1) ?",
      verification: { type: "qcm", choix: ["y = 2x − 7", "y = −0,5x + 3", "y = −0,5x + 1"], bonne: 1 },
      dessin: ferme,
    },
    {
      tag: "Énigme 4 · La course d'orientation",
      titre: "Trois balises",
      question: `Trois balises sont en A(0 ; 0), B(4 ; 2) et C(3 ; 4).<br><br><b>En quel sommet</b> le triangle ABC est-il rectangle ?`,
      reponse: `Pentes : (AB) : ${frac(2, 4)} = 0,5 ; (BC) : ${frac("4 − 2", "3 − 4")} = −2 ; (AC) : ${frac(4, 3)}.<br>0,5 × (−2) = −1 : (AB) ⊥ (BC). Le triangle est rectangle en <span class="big">B</span>.`,
      consigne: "A(0 ; 0), B(4 ; 2), C(3 ; 4) : en quel sommet le triangle est-il rectangle ?",
      verification: { type: "qcm", choix: ["A", "C", "B"], bonne: 2 },
      dessin: balises,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La bande du billard",
      sorte: "piege",
      question: `Dans un jeu de billard sur écran, une bande suit la droite y = −4x + 1. La bille part <b>perpendiculairement</b> à la bande.<br><br><b>Quelle est la pente</b> de sa trajectoire ?`,
      reponse: `Ni 4, ni −${frac(1, 4)} : il faut changer le signe <b>et</b> inverser.<br>m × (−4) = −1, donc m = ${frac(1, 4)} = <span class="big">0,25</span>.`,
      consigne: "Quelle est la pente d'une perpendiculaire à y = −4x + 1 ?",
      verification: { type: "courte", attendus: ["0,25", "1/4"] },
      dessin: billard,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nageur et la côte",
      sorte: "defi",
      question: `Une côte toute droite suit y = 2x. Un nageur est en (6 ; 2). Il rejoint la côte par le chemin <b>le plus court</b> : perpendiculaire à la côte.<br><br><b>En quel point</b> arrive-t-il ?`,
      reponse: `Le chemin a pour pente −0,5 et passe par (6 ; 2) : y = −0,5x + 5.<br>On égalise : 2x = −0,5x + 5, donc 2,5x = 5 et x = 2, puis y = 4. Il arrive en <span class="big">(2 ; 4)</span>.`,
      consigne: "Coordonnées du pied de la perpendiculaire à y = 2x passant par (6 ; 2) ?",
      verification: { type: "courte", attendus: ["(2;4)", "2;4", "(2,4)"] },
      dessin: nageur,
    },
  ],
};

export default problemes;
