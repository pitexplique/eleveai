// Énigmes à projeter — première (sans spé maths), notion info_point_moyen
// (l'apiculteur, la salle de sport, le glacier ambulant, le coursier à vélo,
// piège de l'appli de langues, défi de la pépinière). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

type Pt = [number, number];
const nuage = (R: ReturnType<typeof repereXY>, pts: Pt[], c: string = C.bleu) => pts.map(([x, y]) => R.point(x, y, c, 7)).join("");
const croix = (R: ReturnType<typeof repereXY>, x: number, y: number, c: string = C.rose) =>
  l(R.X(x) - 8, R.Y(y) - 8, R.X(x) + 8, R.Y(y) + 8, c, 4) + l(R.X(x) - 8, R.Y(y) + 8, R.X(x) + 8, R.Y(y) - 8, c, 4);

const apiculteur = (() => {
  const R = repereXY(0, 10, 0, 100, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 10, ey: 20 });
  return svg("Nuage de points de quatre apiculteurs : 2 ruches 28 kg, 4 ruches 52 kg, 6 ruches 66 kg, 8 ruches 94 kg",
    R.fond + nuage(R, [[2, 28], [4, 52], [6, 66], [8, 94]], C.jaune) +
      t(R.X(0) + 8, R.Y(100) + 20, "miel (kg)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "ruches", C.pale, 17, "end") +
      t(240, 405, `l'ordonnée du point moyen${NB}?`, C.rose, 24));
})();

const sport = (() => {
  const R = repereXY(10, 70, 0, 16, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 10, py: 2, ey: 4 });
  return svg("Nuage de cinq clients : âge et séances par mois (20 ; 13), (30 ; 10), (45 ; 9), (50 ; 5), (55 ; 3) ; trois croix A (40 ; 10), B (40 ; 8), C (35 ; 8)",
    R.fond + nuage(R, [[20, 13], [30, 10], [45, 9], [50, 5], [55, 3]]) +
      croix(R, 40, 10) + croix(R, 40, 8) + croix(R, 35, 8) +
      t(R.X(40) + 12, R.Y(10) - 8, "A", C.rose, 20, "start") + t(R.X(40) + 12, R.Y(8) + 22, "B", C.rose, 20, "start") + t(R.X(35) - 12, R.Y(8) + 22, "C", C.rose, 20, "end") +
      t(R.X(10) + 8, R.Y(16) + 20, "séances par mois", C.pale, 17, "start") + t(R.X(70), R.Y(0) + 46, "âge (ans)", C.pale, 17, "end") +
      t(240, 405, `où est le point moyen${NB}?`, C.rose, 24));
})();

const glacier = (() => {
  const R = repereXY(18, 32, 60, 220, { gx: 90, gy: 40, gl: 330, gh: 270, px: 1, ex: 2, py: 20, ey: 40 });
  return svg("Nuage de cinq jours : température et cornets vendus ; point moyen G (25 ; 140) ; une droite de coefficient directeur 12 passe par G",
    R.fond + R.courbe((x) => 12 * x - 160, 19, 31, C.jaune, 3) + nuage(R, [[20, 85], [23, 110], [24, 130], [28, 175], [30, 200]]) +
      R.point(25, 140, C.rose, 9) + t(R.X(25) - 14, R.Y(140) - 4, "G", C.rose, 22, "end") +
      t(R.X(18) + 8, R.Y(220) + 20, "cornets vendus", C.pale, 17, "start") + t(R.X(32), R.Y(60) + 46, "température (°C)", C.pale, 17, "end") +
      t(240, 405, `y = 12x + b${NB}: b${NB}?`, C.rose, 24));
})();

const coursier = (() => {
  const R = repereXY(0, 8, 0, 32, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 4, ey: 8 });
  return svg("Nuage de cinq livraisons : distance et durée (1 ; 12), (3 ; 16), (5 ; 23), (5 ; 24), (6 ; 25) ; point moyen G (4 ; 20)",
    R.fond + nuage(R, [[1, 12], [3, 16], [5, 23], [5, 24], [6, 25]]) + R.point(4, 20, C.rose, 9) +
      t(R.X(4) - 14, R.Y(20) - 6, "G", C.rose, 22, "end") +
      t(R.X(0) + 8, R.Y(32) + 20, "durée (min)", C.pale, 17, "start") + t(R.X(8), R.Y(0) + 46, "distance (km)", C.pale, 17, "end") +
      t(240, 405, `quelle droite passe par G${NB}?`, C.rose, 24));
})();

const langues = (() => {
  const R = repereXY(0, 11, 0, 24, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("Nuage de quatre élèves : heures par semaine sur une appli de langues et dizaines de mots retenus (1 ; 5), (2 ; 6), (3 ; 7), (10 ; 22)",
    R.fond + nuage(R, [[1, 5], [2, 6], [3, 7], [10, 22]], C.jaune) +
      t(R.X(0) + 8, R.Y(24) + 20, "mots (dizaines)", C.pale, 17, "start") + t(R.X(11), R.Y(0) + 46, "heures par semaine", C.pale, 17, "end") +
      t(240, 405, `le point moyen${NB}?`, C.rose, 24));
})();

const pepiniere = (() => {
  const R = repereXY(0, 12, 0, 25, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 5, ey: 5 });
  return svg("Nuage de trois plants (2 ; 8), (5 ; 12), (7 ; 17) et point moyen G (6 ; 15) ; le quatrième plant est inconnu",
    R.fond + nuage(R, [[2, 8], [5, 12], [7, 17]]) + R.point(6, 15, C.rose, 9) +
      t(R.X(6) - 14, R.Y(15) - 6, "G", C.rose, 22, "end") +
      t(R.X(0) + 8, R.Y(25) + 20, "hauteur (cm)", C.pale, 17, "start") + t(R.X(12), R.Y(0) + 46, "âge (mois)", C.pale, 17, "end") +
      t(240, 405, `où est le 4e plant${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_point_moyen",
  titre: "Énigmes du point moyen",
  description: "L'apiculteur, la salle de sport, le glacier ambulant, le coursier à vélo, le piège de l'appli de langues, le défi de la pépinière : calculer les coordonnées du point moyen, le placer, et savoir que la droite d'ajustement passe par lui.",
  problemes: [
    {
      tag: "Énigme 1 · L'apiculteur",
      titre: "Calculer le point moyen",
      question: `Quatre apiculteurs ont 2, 4, 6 et 8 ruches. Ils ont récolté 28, 52, 66 et 94 kg de miel.<br><br><b>Quelle est l'ordonnée</b> du point moyen G ?`,
      reponse: `L'ordonnée de G est la moyenne des y : (28 + 52 + 66 + 94) ÷ 4 = 240 ÷ 4 = 60.<br>L'abscisse : (2 + 4 + 6 + 8) ÷ 4 = 5. Donc <span class="big">G(5 ; 60)</span>.`,
      consigne: "Moyenne de 28, 52, 66 et 94 kg : quelle est l'ordonnée du point moyen ?",
      verification: { type: "courte", attendus: ["60"], unite: "kg" },
      dessin: apiculteur,
    },
    {
      tag: "Énigme 2 · La salle de sport",
      titre: "Placer le point moyen",
      question: `Une salle de sport note l'âge de cinq clients et leurs séances par mois : (20 ; 13), (30 ; 10), (45 ; 9), (50 ; 5), (55 ; 3).<br><br><b>Quelle croix</b> est le point moyen ?`,
      reponse: `x̄ = (20 + 30 + 45 + 50 + 55) ÷ 5 = 200 ÷ 5 = 40 ; ȳ = (13 + 10 + 9 + 5 + 3) ÷ 5 = 40 ÷ 5 = 8.<br>G(40 ; 8) : c'est <span class="big">la croix B</span>.`,
      consigne: "Le point moyen a pour coordonnées (40 ; 8) : quelle croix est-ce ?",
      verification: { type: "qcm", choix: ["La croix A", "La croix B", "La croix C"], bonne: 1 },
      dessin: sport,
    },
    {
      tag: "Énigme 3 · Le glacier ambulant",
      titre: "La droite passe par G",
      question: `Un glacier note la température et les cornets vendus. Le point moyen est G(25 ; 140). La droite d'ajustement a pour équation y = 12x + b.<br><br><b>Combien vaut b</b> ?`,
      reponse: `La droite d'ajustement passe par le point moyen : 140 = 12 × 25 + b.<br>140 = 300 + b, donc <span class="big">b = −160</span>. L'équation est y = 12x − 160.`,
      consigne: "La droite y = 12x + b passe par G(25 ; 140) : combien vaut b ?",
      verification: { type: "courte", attendus: ["-160", "−160"] },
      dessin: glacier,
    },
    {
      tag: "Énigme 4 · Le coursier à vélo",
      titre: "La bonne droite",
      question: `Un coursier note la distance et la durée de cinq livraisons. Le point moyen est G(4 ; 20).<br><br><b>Quelle droite</b> peut être sa droite d'ajustement ?`,
      reponse: `La droite doit passer par G : on remplace x par 4.<br>3 × 4 + 5 = 17 ; 2 × 4 + 8 = 16 ; 3 × 4 + 8 = 20. C'est <span class="big">y = 3x + 8</span>.`,
      consigne: "Le point moyen est G(4 ; 20) : quelle droite passe par G ?",
      verification: { type: "qcm", choix: ["y = 3x + 5", "y = 2x + 8", "y = 3x + 8"], bonne: 2 },
      dessin: coursier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'appli de langues",
      sorte: "piege",
      question: `Quatre élèves utilisent une appli de langues : (1 ; 5), (2 ; 6), (3 ; 7), (10 ; 22).<br>Léo dit : « G est au milieu du premier et du dernier point. »<br><br><b>Quel est</b> le point moyen ?`,
      reponse: `Le point moyen utilise <b>tous</b> les points : x̄ = (1 + 2 + 3 + 10) ÷ 4 = 4 ; ȳ = (5 + 6 + 7 + 22) ÷ 4 = 10.<br><span class="big">G(4 ; 10)</span>. Le milieu des extrêmes, (5,5 ; 13,5), oublie les trois autres élèves.`,
      consigne: "Points (1 ; 5), (2 ; 6), (3 ; 7), (10 ; 22) : quel est le point moyen ?",
      verification: { type: "qcm", choix: ["G(4 ; 10)", "G(5,5 ; 13,5)", "G(10 ; 22)"], bonne: 0 },
      dessin: langues,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le plant oublié",
      sorte: "defi",
      question: `Une pépinière mesure quatre plants. L'étiquette du 4e est effacée. Les trois autres : (2 ; 8), (5 ; 12), (7 ; 17). Le point moyen est G(6 ; 15).<br><br><b>Quelle est la hauteur</b> du 4e plant ?`,
      reponse: `Les 4 hauteurs ont pour somme 4 × 15 = 60. Déjà : 8 + 12 + 17 = 37. Il reste 60 − 37 = 23.<br>Le 4e plant mesure <span class="big">23 cm</span> (et il a 4 × 6 − 14 = 10 mois).`,
      consigne: "4 plants, G(6 ; 15), hauteurs connues 8, 12 et 17 cm : quelle hauteur pour le 4e ?",
      verification: { type: "courte", attendus: ["23"], unite: "cm" },
      dessin: pepiniere,
    },
  ],
};

export default problemes;
