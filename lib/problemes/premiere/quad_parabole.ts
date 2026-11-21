// Énigmes à projeter — première (sans spé maths), notion quad_parabole
// (le saut du dauphin, les antennes paraboliques, la rampe de skate, la balle de
// golf, piège de l'atelier de savons, défi de l'arche du stade). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const dauphin = (() => {
  const R = repereXY(-1, 7, -6, 6, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Trois paraboles : P1 tournée vers le bas, racines 0 et 4 ; P2 tournée vers le haut, racines 0 et 4 ; P3 tournée vers le bas, racines 2 et 6",
    R.fond + R.courbe((x) => -x * (x - 4), -0.3, 4.3, C.bleu, 4) + R.courbe((x) => x * (x - 4), -0.2, 4.2, C.jaune, 4) + R.courbe((x) => -(x - 2) * (x - 6), 1.7, 6.3, C.craie, 4) +
      t(R.X(2), R.Y(4) - 12, "P1", C.bleu, 19) + t(R.X(2), R.Y(-4) + 28, "P2", C.jaune, 19) + t(R.X(4), R.Y(4) - 12, "P3", C.craie, 19) +
      t(240, 405, `h(x) = −x(x − 4)${NB}: laquelle${NB}?`, C.rose, 24));
})();

const antennes = (() => {
  const R = repereXY(-4, 4, 0, 8, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Deux paraboles : f(x) = 0,5x² et g(x) = 2x² ; g est plus serrée",
    R.fond + R.courbe((x) => 0.5 * x * x, -4, 4, C.bleu, 4) + R.courbe((x) => 2 * x * x, -2, 2, C.jaune, 4) +
      t(R.X(3.3) + 10, R.Y(4.4), "f", C.bleu, 22, "start") + t(R.X(2) + 10, R.Y(7.4), "g", C.jaune, 22, "start") +
      t(240, 405, `la plus ouverte${NB}?`, C.rose, 24));
})();

const skate = (() => {
  const R = repereXY(-3, 3, 0, 6, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Deux rampes de skate : f(x) = 0,5x² au sol, et g(x) = 0,5x² + 1,2, la même rampe surélevée",
    R.fond + R.courbe((x) => 0.5 * x * x, -3, 3, C.pale, 3) + R.courbe((x) => 0.5 * x * x + 1.2, -3, 3, C.bleu, 4) + R.point(0, 1.2, C.jaune, 8) +
      t(R.X(0) + 14, R.Y(1.2) - 12, "?", C.jaune, 22, "start") +
      t(R.X(2.2) + 10, R.Y(1.6), "f", C.pale, 20, "start") + t(R.X(2) - 12, R.Y(4), "g", C.bleu, 22, "end") +
      t(R.X(-3) + 10, 28, "hauteur (m)", C.pale, 17, "start") +
      t(240, 405, `le point le plus bas de g${NB}?`, C.rose, 24));
})();

const golf = (() => {
  const R = repereXY(0, 20, 0, 12, { gx: 80, gy: 40, gl: 340, gh: 270, px: 2, ex: 4, py: 2, ey: 4 });
  return svg("Trajectoire d'une balle de golf : h(x) = −0,1x² + 2x ; un trait en pointillés en x = 5",
    R.fond + R.courbe((x) => -0.1 * x * x + 2 * x, 0, 20, C.bleu, 4) +
      l(R.X(5), R.Y(0), R.X(5), R.Y(7.5), C.jaune, 3, "7 5") + R.point(5, 7.5, C.jaune, 8) +
      t(R.X(5) + 14, R.Y(7.5) + 28, "?", C.jaune, 22, "start") +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(20), R.Y(0) + 46, "distance (m)", C.pale, 17, "end") +
      t(240, 405, `h(5)${NB}?`, C.rose, 26));
})();

const savons = svg("Bénéfice d'un atelier de savons : B(x) = −(x − 2)(x − 10) ; on cherche quand B(x) = 0",
  cadre(40, ["B(x) = −(x − 2)(x − 10)"], C.bleu, 26) +
    t(240, 180, "un produit est nul…", C.pale, 20) + t(240, 215, "… quand un facteur est nul", C.pale, 20) +
    t(240, 385, `B(x) = 0 pour x = ${NB}?`, C.rose, 24));

const arche = (() => {
  const R = repereXY(0, 40, 0, 25, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 10, py: 5, ey: 5 });
  return svg("Arche d'un stade : y = a x (x − 40), pieds en 0 et 40 mètres ; hauteur 20 mètres au milieu",
    R.fond + R.courbe((x) => -0.05 * x * (x - 40), 0, 40, C.bleu, 4) +
      l(R.X(20), R.Y(0), R.X(20), R.Y(20), C.jaune, 3, "7 5") + t(R.X(20) + 10, R.Y(10), "20 m", C.jaune, 20, "start") +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(40), R.Y(0) + 46, "largeur (m)", C.pale, 17, "end") +
      t(240, 405, `y = a·x(x − 40)${NB}: a = ${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "quad_parabole",
  titre: "Énigmes des paraboles",
  description: "Le saut du dauphin, les antennes paraboliques, la rampe de skate, la balle de golf, le piège de l'atelier de savons, le défi de l'arche du stade : associer une parabole à son expression, voir le rôle de a et de c, calculer une image, lire les racines dans la forme factorisée.",
  problemes: [
    {
      tag: "Énigme 1 · Le saut du dauphin",
      titre: "Associer une parabole",
      question: `Un dauphin saute hors de l'eau. Sa hauteur est h(x) = −x(x − 4).<br><br><b>Quelle parabole</b> représente h ?`,
      reponse: `Racines : x = 0 et x = 4. Et a = −1 &lt; 0 : la parabole est tournée vers le bas.<br>P2 est tournée vers le haut, P3 a les racines 2 et 6 : c'est <span class="big">P1</span>.`,
      consigne: "h(x) = −x(x − 4) : quelle parabole représente h ?",
      verification: { type: "qcm", choix: ["La parabole P1", "La parabole P2", "La parabole P3"], bonne: 0 },
      dessin: dauphin,
    },
    {
      tag: "Énigme 2 · Les antennes paraboliques",
      titre: "Le rôle de a",
      question: `La coupe de deux antennes paraboliques : f(x) = 0,5x² et g(x) = 2x².<br><br><b>Laquelle</b> est la plus ouverte (la plus large) ?`,
      reponse: `Plus a est grand, plus la parabole est serrée. Ici 0,5 &lt; 2.<br>La plus ouverte est <span class="big">f</span> : en x = 2, f vaut 2 et g vaut déjà 8.`,
      consigne: "f(x) = 0,5x² et g(x) = 2x² : laquelle est la plus ouverte ?",
      verification: { type: "qcm", choix: ["g, car 2 > 0,5", "Elles sont pareilles", "f, car 0,5 < 2"], bonne: 2 },
      dessin: antennes,
    },
    {
      tag: "Énigme 3 · La rampe de skate",
      titre: "Le rôle de c",
      question: `Une rampe de skate a la forme f(x) = 0,5x². On la pose sur une estrade : g(x) = 0,5x² + 1,2 (en m).<br><br><b>À quelle hauteur</b> est le point le plus bas de g ?`,
      reponse: `Ajouter c = 1,2 décale toute la parabole de 1,2 vers le haut.<br>Le point le plus bas passe de (0 ; 0) à (0 ; 1,2) : <span class="big">1,2 m</span>.`,
      consigne: "g(x) = 0,5x² + 1,2 : à quelle hauteur est le point le plus bas ?",
      verification: { type: "courte", attendus: ["1,2", "1.2"], unite: "m" },
      dessin: skate,
    },
    {
      tag: "Énigme 4 · La balle de golf",
      titre: "Calculer une image",
      question: `La hauteur d'une balle de golf est h(x) = −0,1x² + 2x, avec x la distance parcourue (en m).<br><br><b>Quelle hauteur</b> à 5 m du départ ?`,
      reponse: `h(5) = −0,1 × 5² + 2 × 5 = −0,1 × 25 + 10 = −2,5 + 10.<br>h(5) = <span class="big">7,5 m</span>.`,
      consigne: "h(x) = −0,1x² + 2x : combien vaut h(5) ?",
      verification: { type: "courte", attendus: ["7,5", "7.5"], unite: "m" },
      dessin: golf,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'atelier de savons",
      sorte: "piege",
      question: `Un atelier vend x centaines de savons. Son bénéfice est B(x) = −(x − 2)(x − 10).<br><br><b>Pour quelles valeurs</b> de x le bénéfice est-il nul ?`,
      reponse: `x − 2 = 0 donne x = 2 ; x − 10 = 0 donne x = 10. Le signe « − » devant ne change pas les racines.<br><span class="big">x = 2 et x = 10</span>. « −2 et −10 » : erreur de signe classique !`,
      consigne: "B(x) = −(x − 2)(x − 10) : pour quelles valeurs de x a-t-on B(x) = 0 ?",
      verification: { type: "qcm", choix: ["x = −2 et x = −10", "x = 2 et x = 10", "x = 2 et x = −10"], bonne: 1 },
      dessin: savons,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'arche du stade",
      sorte: "defi",
      question: `L'arche d'un stade a ses pieds en x = 0 et x = 40 (en m) : y = a·x(x − 40). Au milieu, elle monte à 20 m.<br><br><b>Combien vaut</b> a ?`,
      reponse: `Le milieu est x = 20 : a × 20 × (20 − 40) = 20, donc a × (−400) = 20.<br>a = 20 ÷ (−400) = <span class="big">−0,05</span>. Négatif : l'arche est tournée vers le bas.`,
      consigne: "y = a·x(x − 40) vaut 20 en x = 20 : combien vaut a ?",
      verification: { type: "courte", attendus: ["-0,05", "−0,05", "-0.05"] },
      dessin: arche,
    },
  ],
};

export default problemes;
