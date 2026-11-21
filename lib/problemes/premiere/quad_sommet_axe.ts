// Énigmes à projeter — première (sans spé maths), notion quad_sommet_axe
// (la fusée du feu d'artifice, le pont en arc, la balle de tennis, le miroir
// solaire, piège de la piste de BMX, défi du cratère Commerson). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const fusee = svg("Hauteur d'une fusée de feu d'artifice : f(x) = −3x² + 6x + 1 ; deux formes possibles, en cloche vers le bas ou en creux vers le haut",
  cadre(40, ["f(x) = −3x² + 6x + 1"], C.bleu, 26) +
    `<path d="M110 290 Q170 170 230 290" fill="none" stroke="${C.craie}" stroke-width="4"/>` + t(170, 320, "∩", C.pale, 22) +
    `<path d="M260 190 Q320 310 380 190" fill="none" stroke="${C.craie}" stroke-width="4"/>` + t(320, 320, "∪", C.pale, 22) +
    t(240, 385, `vers le haut ou vers le bas${NB}?`, C.rose, 24));

const pont = (() => {
  const R = repereXY(0, 10, 0, 10, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Pont en arc : f(x) = −(x − 2)(x − 8), pieds en x = 2 et x = 8",
    R.fond + R.courbe((x) => -(x - 2) * (x - 8), 2, 8, C.bleu, 4) + R.point(2, 0, C.jaune, 8) + R.point(8, 0, C.jaune, 8) +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "x (m)", C.pale, 17, "end") +
      t(240, 405, `l'axe de symétrie${NB}?`, C.rose, 24));
})();

const tennis = (() => {
  const R = repereXY(0, 10, 0, 10, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2, quadrillage: false });
  return svg("Balle de tennis : h(x) = −0,5(x − 1)(x − 9), de x = 1 à x = 9",
    R.fond + R.courbe((x) => -0.5 * (x - 1) * (x - 9), 1, 9, C.bleu, 4) +
      t(R.X(5), R.Y(8) - 18, "?", C.jaune, 24) +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "distance (m)", C.pale, 17, "end") +
      t(240, 405, `la hauteur maximale${NB}?`, C.rose, 24));
})();

const miroir = (() => {
  const R = repereXY(-1, 7, 0, 10, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Coupe d'un miroir solaire : parabole d'axe x = 3 ; f(1) = 7 ; on cherche f(5)",
    R.fond + l(R.X(3), R.Y(0), R.X(3), R.Y(10), C.rose, 3, "8 6") + R.courbe((x) => (x - 3) * (x - 3) + 3, 0.4, 5.6, C.bleu, 4) +
      R.point(1, 7, C.jaune, 8) +
      R.point(5, 7, C.pale, 8) + t(R.X(5) + 14, R.Y(7) + 28, "?", C.jaune, 22, "start") +
      t(R.X(3) + 8, R.Y(9.6) + 6, "x = 3", C.rose, 18, "start") +
      t(240, 405, `f(1) = 7${NB}: f(5)${NB}?`, C.rose, 24));
})();

const bmx = svg("Piste de BMX en creux : f(x) = 0,5(x + 4)(x − 2)",
  cadre(40, ["f(x) = 0,5(x + 4)(x − 2)"], C.bleu, 26) +
    t(240, 190, "l'axe passe au milieu des deux racines", C.pale, 20) +
    t(240, 385, `l'axe de symétrie${NB}?`, C.rose, 24));

const cratere = (() => {
  const R = repereXY(-4, 8, -4, 6, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 1, ey: 2 });
  return svg("Coupe d'un cratère : parabole qui passe par A(−2 ; 5) et B(6 ; 5) ; le fond est à l'altitude −3",
    R.fond + l(R.X(-4), R.Y(-3), R.X(8), R.Y(-3), C.rose, 3, "8 6") + R.courbe((x) => 0.5 * (x - 2) * (x - 2) - 3, -2, 6, C.bleu, 4) +
      R.point(-2, 5, C.jaune, 8) + R.point(6, 5, C.jaune, 8) +
      t(R.X(-2) - 14, R.Y(5) + 7, "A", C.jaune, 20, "end") + t(R.X(6) + 14, R.Y(5) + 7, "B", C.jaune, 20, "start") +
      t(R.X(7.8), R.Y(-3) - 10, "fond : −3", C.rose, 18, "end") +
      t(240, 405, `l'abscisse du fond${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "quad_sommet_axe",
  titre: "Énigmes du sommet et de l'axe d'une parabole",
  description: "La fusée du feu d'artifice, le pont en arc, la balle de tennis, le miroir solaire, le piège de la piste de BMX, le défi du cratère Commerson : prévoir l'allure avec le signe de a, trouver l'axe de symétrie au milieu des racines, calculer le sommet, utiliser la symétrie.",
  problemes: [
    {
      tag: "Énigme 1 · Le feu d'artifice",
      titre: "L'allure selon a",
      question: `La hauteur d'une fusée de feu d'artifice est f(x) = −3x² + 6x + 1.<br><br><b>Comment</b> est tournée sa parabole ?`,
      reponse: `Seul le signe de a, le nombre devant x², compte : a = −3 &lt; 0.<br>La parabole est <span class="big">tournée vers le bas (∩)</span> : la fusée monte, puis redescend.`,
      consigne: "f(x) = −3x² + 6x + 1 : comment est tournée la parabole ?",
      verification: { type: "qcm", choix: ["Vers le bas, car a = −3 < 0", "Vers le haut, car 6 > 0", "Vers le haut, car 1 > 0"], bonne: 0 },
      dessin: fusee,
    },
    {
      tag: "Énigme 2 · Le pont en arc",
      titre: "L'axe de symétrie",
      question: `Un pont en arc enjambe une rivière : f(x) = −(x − 2)(x − 8). Ses pieds sont en x = 2 et x = 8.<br><br><b>Quel est</b> l'axe de symétrie de l'arc ?`,
      reponse: `L'axe passe au milieu des deux racines : (2 + 8) ÷ 2 = 5.<br>C'est la droite <span class="big">x = 5</span>.`,
      consigne: "f(x) = −(x − 2)(x − 8) : l'axe de symétrie est x = … ?",
      verification: { type: "courte", attendus: ["5", "x = 5", "x=5"] },
      dessin: pont,
    },
    {
      tag: "Énigme 3 · La balle de tennis",
      titre: "Les coordonnées du sommet",
      question: `La hauteur d'une balle de tennis est h(x) = −0,5(x − 1)(x − 9), en m.<br><br><b>Quelle est</b> sa hauteur maximale ?`,
      reponse: `L'axe est au milieu des racines : (1 + 9) ÷ 2 = 5. Le sommet est en x = 5.<br>h(5) = −0,5 × 4 × (−4) = <span class="big">8 m</span>. Sommet S(5 ; 8).`,
      consigne: "h(x) = −0,5(x − 1)(x − 9) : quelle est la hauteur maximale ?",
      verification: { type: "courte", attendus: ["8"], unite: "m" },
      dessin: tennis,
    },
    {
      tag: "Énigme 4 · Le miroir solaire",
      titre: "Utiliser la symétrie",
      question: `Un miroir solaire a une coupe en parabole, d'axe x = 3. On sait que f(1) = 7.<br><br><b>Combien vaut</b> f(5), sans calcul ?`,
      reponse: `1 et 5 sont à la même distance de l'axe : 3 − 1 = 2 et 5 − 3 = 2.<br>Par symétrie, <span class="big">f(5) = f(1) = 7</span>.`,
      consigne: "Parabole d'axe x = 3 avec f(1) = 7 : combien vaut f(5) ?",
      verification: { type: "qcm", choix: ["f(5) = 5", "f(5) = 7", "f(5) = 9"], bonne: 1 },
      dessin: miroir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La piste de BMX",
      sorte: "piege",
      question: `Le creux d'une piste de BMX a la forme f(x) = 0,5(x + 4)(x − 2).<br><br><b>Quel est</b> son axe de symétrie ?`,
      reponse: `Les racines sont x = −4 (car x + 4 = 0) et x = 2. Attention au signe !<br>Milieu : (−4 + 2) ÷ 2 = −2 ÷ 2, donc <span class="big">x = −1</span>.`,
      consigne: "f(x) = 0,5(x + 4)(x − 2) : quel est l'axe de symétrie ?",
      verification: { type: "qcm", choix: ["x = 3", "x = 1", "x = −1"], bonne: 2 },
      dessin: bmx,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cratère Commerson",
      sorte: "defi",
      question: `Sur la route du volcan, on modélise la coupe du cratère Commerson par une parabole. Ses deux bords sont A(−2 ; 5) et B(6 ; 5). Le fond est à −3.<br><br><b>Quelle est l'abscisse</b> du fond ?`,
      reponse: `A et B ont la même ordonnée : ils sont symétriques par rapport à l'axe. Axe : (−2 + 6) ÷ 2 = 2.<br>Le fond est le sommet S(2 ; −3) : abscisse <span class="big">2</span>.`,
      consigne: "Parabole passant par A(−2 ; 5) et B(6 ; 5) : quelle est l'abscisse du sommet ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: cratere,
    },
  ],
};

export default problemes;
