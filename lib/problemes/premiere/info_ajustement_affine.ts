// Énigmes à projeter — première (sans spé maths), notion info_ajustement_affine
// (les trois enquêtes, la salle d'escalade, la glace du lac canadien, la
// batterie du drone, piège des bornes de recharge, défi du potager de
// courgettes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

type Pt = [number, number];
const nuage = (R: ReturnType<typeof repereXY>, pts: Pt[], c: string = C.bleu, rayon = 7) => pts.map(([x, y]) => R.point(x, y, c, rayon)).join("");

const enquetes = (() => {
  const mini = (gx: number) => repereXY(0, 10, 0, 10, { gx, gy: 70, gl: 125, gh: 210, etiquettes: false, quadrillage: false });
  const A = mini(25), B = mini(180), Cc = mini(335);
  return svg("Trois nuages : A dispersé au hasard (pointure et note), B qui monte de plus en plus vite (jours et vues), C presque aligné (km et litres)",
    t(87, 45, "pointure / note", C.pale, 16) + t(242, 45, "jours / vues", C.pale, 16) + t(397, 45, "km / litres", C.pale, 16) +
      A.fond + nuage(A, [[1, 6], [2, 2], [3, 8], [4, 4], [5, 9], [6, 3], [7, 7], [8, 5], [9, 2]], C.bleu, 5) +
      B.fond + nuage(B, [[1, 0.6], [2, 0.8], [3, 1.1], [4, 1.5], [5, 2.1], [6, 3], [7, 4.3], [8, 6.2], [9, 9]], C.bleu, 5) +
      Cc.fond + nuage(Cc, [[1, 1.2], [2, 1.9], [3, 3.1], [4, 3.8], [5, 5.1], [6, 5.8], [7, 7.1], [8, 7.9], [9, 9]], C.bleu, 5) +
      t(87, 320, "A", C.craie, 30) + t(242, 320, "B", C.craie, 30) + t(397, 320, "C", C.craie, 30) +
      t(240, 390, `lequel s'ajuste par une droite${NB}?`, C.rose, 24));
})();

const escalade = (() => {
  const R = repereXY(0, 12, 0, 100, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 10, ey: 20 });
  return svg("Nuage des abonnés d'une salle d'escalade selon les mois ; une droite passe par (0 ; 30) et (10 ; 80)",
    R.fond + R.courbe((x) => 5 * x + 30, 0, 12, C.jaune, 3) +
      nuage(R, [[1, 33], [2, 42], [3, 44], [4, 51], [5, 54], [6, 61], [7, 64], [8, 71], [9, 74], [11, 86]]) +
      R.point(0, 30, C.rose, 9) + R.point(10, 80, C.rose, 9) +
      t(R.X(10) + 10, R.Y(80) + 28, "(10 ; 80)", C.rose, 18, "start") + t(R.X(0) + 14, R.Y(30) + 26, "(0 ; 30)", C.rose, 18, "start") +
      t(R.X(0) + 8, R.Y(100) + 20, "abonnés", C.pale, 17, "start") + t(R.X(12), R.Y(0) + 46, "mois", C.pale, 17, "end") +
      t(240, 405, `l'équation de la droite${NB}?`, C.rose, 24));
})();

const lac = (() => {
  const R = repereXY(0, 30, 0, 50, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 5, py: 5, ey: 10 });
  return svg("Nuage de l'épaisseur de glace d'un lac selon les jours de froid, et la droite y = 1,5x + 4",
    R.fond + R.courbe((x) => 1.5 * x + 4, 0, 30, C.bleu, 3) +
      nuage(R, [[2, 8], [5, 11], [8, 15], [11, 21], [14, 25], [17, 30]], C.jaune) +
      t(R.X(18), R.Y(12), "y = 1,5x + 4", C.bleu, 18, "start") +
      t(R.X(0) + 8, R.Y(50) + 20, "glace (cm)", C.pale, 17, "start") + t(R.X(30), R.Y(0) + 46, "jours de froid", C.pale, 17, "end") +
      t(240, 405, `et après 24 jours${NB}?`, C.rose, 24));
})();

const drone = (() => {
  const R = repereXY(0, 80, 0, 70, { gx: 80, gy: 40, gl: 340, gh: 270, px: 10, ex: 10, py: 10, ey: 10 });
  return svg("Nuage de la batterie d'un drone selon les minutes de vol, la droite y = −0,8x + 60 et un trait à 20 %",
    R.fond + l(R.X(0), R.Y(20), R.X(80), R.Y(20), C.rose, 3, "8 6") + R.courbe((x) => -0.8 * x + 60, 0, 75, C.bleu, 3) +
      nuage(R, [[0, 61], [10, 51], [20, 45], [30, 35], [40, 29]], C.jaune) +
      t(R.X(80) - 4, R.Y(20) - 10, "20 %", C.rose, 17, "end") + t(R.X(30), R.Y(62), "y = −0,8x + 60", C.bleu, 18, "start") +
      t(R.X(0) + 8, R.Y(70) + 20, "batterie (%)", C.pale, 17, "start") + t(R.X(80), R.Y(0) + 46, "minutes de vol", C.pale, 17, "end") +
      t(240, 405, `quand reste-t-il 20 %${NB}?`, C.rose, 24));
})();

const bornes = (() => {
  const R = repereXY(0, 6, 0, 400, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 50, ey: 100 });
  return svg("Nuage des bornes de recharge d'une ville, de 2020 (rang 0) à 2024 (rang 4), et la droite y = 40x + 120",
    R.fond + R.courbe((x) => 40 * x + 120, 0, 6, C.bleu, 3) +
      nuage(R, [[0, 115], [1, 165], [2, 195], [3, 245], [4, 280]], C.jaune) +
      t(R.X(0) + 14, R.Y(380), "y = 40x + 120", C.bleu, 18, "start") +
      t(R.X(6), R.Y(0) + 46, "rang de l'année (0 = 2020)", C.pale, 17, "end") +
      t(240, 405, `combien de bornes en 2025${NB}?`, C.rose, 24));
})();

const courgettes = (() => {
  const R = repereXY(0, 11, 0, 40, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 5, ey: 10 });
  return svg("Deux groupes de points : (1 ; 8), (1,5 ; 9), (3,5 ; 13) de point moyen G1 (2 ; 10), et (7 ; 26), (7,5 ; 27), (9,5 ; 31) de point moyen G2 (8 ; 28)",
    R.fond + nuage(R, [[1, 8], [1.5, 9], [3.5, 13], [7, 26], [7.5, 27], [9.5, 31]]) +
      R.point(2, 10, C.rose, 9) + R.point(8, 28, C.rose, 9) +
      t(R.X(2) - 4, R.Y(10) - 16, "G1", C.rose, 20, "end") + t(R.X(8) - 4, R.Y(28) - 16, "G2", C.rose, 20, "end") +
      t(R.X(0) + 8, R.Y(40) + 20, "courgettes (kg)", C.pale, 17, "start") + t(R.X(11), R.Y(0) + 46, "heures de soleil par jour", C.pale, 17, "end") +
      t(240, 405, `et pour 10 h de soleil${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_ajustement_affine",
  titre: "Énigmes de l'ajustement affine",
  description: "Les trois enquêtes, la salle d'escalade, la glace du lac canadien, la batterie du drone, le piège des bornes de recharge, le défi du potager de courgettes : reconnaître un ajustement affine pertinent, trouver la droite et s'en servir pour calculer.",
  problemes: [
    {
      tag: "Énigme 1 · Les trois enquêtes",
      titre: "Un ajustement pertinent",
      question: `Trois enquêtes donnent trois nuages de points.<br><br><b>Pour lequel</b> un ajustement par une droite est-il pertinent ?`,
      reponse: `A est dispersé au hasard : aucun lien. B monte de plus en plus vite : c'est une courbe.<br><span class="big">Le nuage C</span> : ses points sont presque alignés.`,
      consigne: "Quel nuage a des points presque alignés ?",
      verification: { type: "qcm", choix: ["Le nuage A", "Le nuage B", "Le nuage C"], bonne: 2 },
      dessin: enquetes,
    },
    {
      tag: "Énigme 2 · La salle d'escalade",
      titre: "Trouver la droite",
      question: `Une salle d'escalade compte ses abonnés chaque mois depuis l'ouverture. On trace une droite d'ajustement par (0 ; 30) et (10 ; 80).<br><br><b>Quelle est son équation</b> ?`,
      reponse: `Coefficient directeur : (80 − 30) ÷ (10 − 0) = 50 ÷ 10 = 5. Ordonnée à l'origine : 30.<br><span class="big">y = 5x + 30</span> : environ 5 abonnés de plus chaque mois.`,
      consigne: "La droite passe par (0 ; 30) et (10 ; 80) : quelle est son équation ?",
      verification: { type: "qcm", choix: ["y = 5x + 30", "y = 30x + 5", "y = 8x + 30"], bonne: 0 },
      dessin: escalade,
    },
    {
      tag: "Énigme 3 · Le lac gelé",
      titre: "Calculer avec la droite",
      question: `Au Canada, on mesure l'épaisseur de glace d'un lac. L'ajustement donne y = 1,5x + 4 (x en jours de froid, y en cm).<br><br><b>Quelle épaisseur</b> prévoit-on après 24 jours de froid ?`,
      reponse: `On remplace x par 24 : 1,5 × 24 + 4 = 36 + 4 = 40.<br>On prévoit <span class="big">40 cm de glace</span> : de quoi patiner sans crainte.`,
      consigne: "y = 1,5x + 4 avec x = 24 jours : quelle épaisseur de glace, en cm ?",
      verification: { type: "courte", attendus: ["40"], unite: "cm" },
      dessin: lac,
    },
    {
      tag: "Énigme 4 · Le drone",
      titre: "Résoudre avec la droite",
      question: `La batterie d'un drone baisse pendant le vol. L'ajustement donne y = −0,8x + 60 (x en minutes, y en %).<br><br><b>Au bout de combien de minutes</b> reste-t-il 20 % ?`,
      reponse: `On résout −0,8x + 60 = 20 : −0,8x = −40, donc x = 40 ÷ 0,8 = 50.<br>Au bout de <span class="big">50 minutes</span> : il est temps de faire atterrir le drone.`,
      consigne: "−0,8x + 60 = 20 : au bout de combien de minutes reste-t-il 20 % ?",
      verification: { type: "courte", attendus: ["50"], unite: "min" },
      dessin: drone,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les bornes de recharge",
      sorte: "piege",
      question: `Une ville compte ses bornes de recharge pour voitures électriques. L'ajustement donne y = 40x + 120, où x est le <b>rang</b> de l'année (x = 0 en 2020).<br><br><b>Combien de bornes</b> prévoit-on en 2025 ?`,
      reponse: `En 2025, x ne vaut pas 2025 mais 5 (2025 − 2020).<br>40 × 5 + 120 = <span class="big">320 bornes</span>. Avec x = 2025, on trouverait 81 120 bornes : absurde !`,
      consigne: "y = 40x + 120 avec x = 0 en 2020 : combien de bornes en 2025 ?",
      verification: { type: "qcm", choix: ["81 120 bornes", "320 bornes", "200 bornes"], bonne: 1 },
      dessin: bornes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le potager de courgettes",
      sorte: "defi",
      question: `Un potager partage ses mesures en deux groupes. Les points moyens sont G1(2 ; 10) et G2(8 ; 28). La droite d'ajustement passe par G1 et G2.<br><br><b>Combien de kilos</b> de courgettes prévoit-elle pour 10 h de soleil ?`,
      reponse: `Coefficient : (28 − 10) ÷ (8 − 2) = 18 ÷ 6 = 3. Puis 10 = 3 × 2 + b, donc b = 4 : y = 3x + 4.<br>Pour x = 10 : 3 × 10 + 4 = <span class="big">34 kg</span>.`,
      consigne: "La droite passe par G1(2 ; 10) et G2(8 ; 28) : combien de kilos pour x = 10 ?",
      verification: { type: "courte", attendus: ["34"], unite: "kg" },
      dessin: courgettes,
    },
  ],
};

export default problemes;
