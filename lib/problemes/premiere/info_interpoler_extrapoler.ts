// Énigmes à projeter — première (sans spé maths), notion info_interpoler_extrapoler
// (le ressort du labo, la chorale, le rôti au four, la taille du bébé, piège
// du glacier des Alpes, défi des voitures électriques et diesel). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

type Pt = [number, number];
const nuage = (R: ReturnType<typeof repereXY>, pts: Pt[], c: string = C.bleu) => pts.map(([x, y]) => R.point(x, y, c, 7)).join("");

const ressort = (() => {
  const R = repereXY(0, 600, 0, 35, { gx: 80, gy: 40, gl: 340, gh: 270, px: 50, ex: 100, py: 5, ey: 5 });
  return svg("Nuage de l'allongement d'un ressort selon la masse : mesures à 100, 200, 400 et 500 g ; droite y = 0,05x + 2 ; un trait à 300 g",
    R.fond + R.courbe((x) => 0.05 * x + 2, 0, 600, C.jaune, 3) + l(R.X(300), R.Y(0), R.X(300), R.Y(17), C.rose, 3, "8 6") +
      nuage(R, [[100, 7.2], [200, 11.8], [400, 22.3], [500, 26.7]]) +
      t(R.X(300) + 8, R.Y(3), "300 g", C.rose, 17, "start") +
      t(R.X(0) + 8, R.Y(35) + 20, "longueur (cm)", C.pale, 17, "start") + t(R.X(600), R.Y(0) + 46, "masse (g)", C.pale, 17, "end") +
      t(240, 405, `quelle longueur à 300 g${NB}?`, C.rose, 24));
})();

const chorale = (() => {
  const R = repereXY(0, 9, 0, 100, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 10, ey: 20 });
  return svg("Nuage des choristes de 2019 (rang 0) à 2024 (rang 5), droite y = 6x + 40 prolongée en pointillés jusqu'au rang 8",
    R.fond + R.courbe((x) => 6 * x + 40, 0, 5, C.jaune, 3) +
      `<path d="M${R.X(5)} ${R.Y(70)} L${R.X(8.5)} ${R.Y(91)}" stroke="${C.jaune}" stroke-width="3" stroke-dasharray="8 6"/>` +
      nuage(R, [[0, 41], [1, 45], [2, 53], [3, 57], [4, 65], [5, 69]]) +
      t(R.X(0) + 8, R.Y(100) + 20, "choristes", C.pale, 17, "start") + t(R.X(9), R.Y(0) + 46, "rang (0 = 2019)", C.pale, 17, "end") +
      t(240, 405, `combien en 2027${NB}?`, C.rose, 24));
})();

const roti = (() => {
  const R = repereXY(0, 6, 0, 200, { gx: 80, gy: 40, gl: 340, gh: 270, px: 0.5, ex: 1, py: 20, ey: 40 });
  return svg("Nuage des temps de cuisson de rôtis de 1 à 3 kg, zone des mesures teintée ; trois flèches à 0,5 kg, 2,5 kg et 5 kg",
    r(R.X(1), R.Y(200), R.X(3) - R.X(1), R.Y(0) - R.Y(200), C.bleu, 0.12, 0) + R.fond +
      nuage(R, [[1, 50], [1.5, 68], [2, 84], [2.5, 101], [3, 116]]) +
      t(R.X(2), R.Y(165), "mesures", C.bleu, 17) +
      l(R.X(0.5), R.Y(0) - 14, R.X(0.5), R.Y(0) - 2, C.rose, 4) + l(R.X(2.5), R.Y(0) - 14, R.X(2.5), R.Y(0) - 2, C.rose, 4) + l(R.X(5), R.Y(0) - 14, R.X(5), R.Y(0) - 2, C.rose, 4) +
      t(R.X(0) + 8, R.Y(200) + 20, "cuisson (min)", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "masse (kg)", C.pale, 17, "end") +
      t(240, 405, `laquelle est une interpolation${NB}?`, C.rose, 24));
})();

const bebe = (() => {
  const R = repereXY(0, 12, 40, 70, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 5, ey: 5 });
  return svg("Nuage de la taille d'un bébé de 0 à 12 mois et la droite y = 0,7x + 50",
    R.fond + R.courbe((x) => 0.7 * x + 50, 0, 12, C.jaune, 3) +
      nuage(R, [[0, 50], [2, 51.5], [4, 52.6], [6, 54.4], [8, 55.4], [10, 57.1], [12, 58.3]]) +
      t(R.X(12) - 4, R.Y(46), "y = 0,7x + 50", C.jaune, 18, "end") +
      t(R.X(0) + 8, R.Y(70) + 20, "taille (cm)", C.pale, 17, "start") + t(R.X(12), R.Y(40) + 46, "âge (mois)", C.pale, 17, "end") +
      t(240, 405, `et à 20 ans${NB}?`, C.rose, 24));
})();

const glacier = (() => {
  const R = repereXY(0, 55, -20, 70, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 10, py: 10, ey: 20 });
  return svg("Épaisseur d'un glacier, droite y = −1,5x + 60 de 2000 (x = 0) à 2050 : elle passe sous l'axe après x = 40",
    R.fond + R.courbe((x) => -1.5 * x + 60, 0, 20, C.bleu, 4) +
      `<path d="M${R.X(20)} ${R.Y(30)} L${R.X(50)} ${R.Y(-15)}" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="8 6"/>` +
      nuage(R, [[0, 61], [5, 52], [10, 46], [15, 37], [20, 30]], C.jaune) + R.point(50, -15, C.rose, 8) +
      t(R.X(50) + 12, R.Y(-15) + 6, "2050", C.rose, 17, "start") +
      t(R.X(0) + 8, R.Y(70) + 20, "épaisseur (m)", C.pale, 17, "start") + t(R.X(55), R.Y(-20) + 46, "années après 2000", C.pale, 17, "end") +
      t(240, 405, `l'épaisseur en 2050${NB}?`, C.rose, 24));
})();

const voitures = (() => {
  const R = repereXY(0, 8, 0, 1400, { gx: 90, gy: 40, gl: 330, gh: 270, px: 1, ex: 1, py: 200, ey: 200 });
  return svg("Deux droites d'ajustement : voitures électriques y = 120x + 300, diesel y = −40x + 1 100 ; x = 0 en 2020",
    R.fond + R.courbe((x) => 120 * x + 300, 0, 8, C.bleu, 4) + R.courbe((x) => -40 * x + 1100, 0, 8, C.jaune, 4) +
      t(R.X(7.6), R.Y(1300), "électriques", C.bleu, 18, "end") + t(R.X(7.6), R.Y(640), "diesel", C.jaune, 18, "end") +
      t(R.X(0) + 8, R.Y(1400) + 20, "ventes", C.pale, 17, "start") + t(R.X(8), R.Y(0) + 46, "rang (0 = 2020)", C.pale, 17, "end") +
      t(240, 405, `en quelle année à égalité${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_interpoler_extrapoler",
  titre: "Énigmes pour interpoler et extrapoler",
  description: "Le ressort du laboratoire, la chorale, le rôti au four, la taille du bébé, le piège du glacier des Alpes, le défi des voitures électriques et diesel : estimer une valeur dans les mesures ou au-delà, et voir les limites d'une extrapolation.",
  problemes: [
    {
      tag: "Énigme 1 · Le ressort",
      titre: "Interpoler",
      question: `Au labo, on accroche des masses à un ressort : 100, 200, 400 et 500 g. L'ajustement donne y = 0,05x + 2 (x en g, y en cm).<br><br><b>Quelle longueur</b> estimer pour 300 g ?`,
      reponse: `300 g est entre les mesures : c'est une <b>interpolation</b>.<br>0,05 × 300 + 2 = 15 + 2 = <span class="big">17 cm</span>.`,
      consigne: "y = 0,05x + 2 avec x = 300 g : quelle longueur, en cm ?",
      verification: { type: "courte", attendus: ["17"], unite: "cm" },
      dessin: ressort,
    },
    {
      tag: "Énigme 2 · La chorale",
      titre: "Extrapoler",
      question: `Une chorale compte ses membres de 2019 à 2024. L'ajustement donne y = 6x + 40, avec x = 0 en 2019.<br><br><b>Combien de choristes</b> prévoir en 2027 ?`,
      reponse: `2027 est après les mesures : c'est une <b>extrapolation</b>, avec x = 2027 − 2019 = 8.<br>6 × 8 + 40 = 48 + 40 = <span class="big">88 choristes</span>, si la tendance continue.`,
      consigne: "y = 6x + 40 avec x = 0 en 2019 : combien de choristes en 2027 ?",
      verification: { type: "courte", attendus: ["88"], unite: "choristes" },
      dessin: chorale,
    },
    {
      tag: "Énigme 3 · Le rôti",
      titre: "Dedans ou dehors",
      question: `Un cuisinier a noté le temps de cuisson de rôtis de 1 kg à 3 kg.<br><br><b>Quelle estimation</b> est une interpolation ?`,
      reponse: `Interpoler, c'est estimer <b>à l'intérieur</b> des mesures, ici entre 1 et 3 kg.<br>0,5 kg et 5 kg sont dehors (extrapolations). <span class="big">2,5 kg</span> est dedans.`,
      consigne: "Les mesures vont de 1 à 3 kg : quelle estimation est une interpolation ?",
      verification: { type: "qcm", choix: ["Pour un rôti de 0,5 kg", "Pour un rôti de 2,5 kg", "Pour un rôti de 5 kg"], bonne: 1 },
      dessin: roti,
    },
    {
      tag: "Énigme 4 · La taille du bébé",
      titre: "Jusqu'où croire le modèle ?",
      question: `La taille d'un bébé pendant sa première année suit à peu près y = 0,7x + 50 (x en mois, y en cm).<br>À 20 ans (240 mois), le modèle donne 0,7 × 240 + 50 = 218 cm.<br><br><b>Que conclure</b> ?`,
      reponse: `Le calcul est juste, mais la croissance ralentit beaucoup après la première année.<br><span class="big">On ne peut pas extrapoler si loin</span> : le modèle ne vaut que de 0 à 12 mois.`,
      consigne: "Le modèle de 0 à 12 mois donne 218 cm à 20 ans : que conclure ?",
      verification: { type: "qcm", choix: ["On ne peut pas extrapoler si loin", "Il mesurera 2,18 m à 20 ans", "Le calcul 0,7 × 240 + 50 est faux"], bonne: 0 },
      dessin: bebe,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le glacier des Alpes",
      sorte: "piege",
      question: `L'épaisseur d'un glacier fond depuis 2000. L'ajustement donne y = −1,5x + 60 (x en années après 2000, y en m).<br><br><b>Quelle épaisseur</b> le modèle donne-t-il en 2050 ?`,
      reponse: `−1,5 × 50 + 60 = −15 : une épaisseur <b>négative</b> n'a pas de sens.<br><span class="big">Le modèle ne vaut plus</span> : il prévoit plutôt la fin du glacier vers 2040 (−1,5x + 60 = 0 donne x = 40).`,
      consigne: "Le modèle y = −1,5x + 60 donne −15 m en 2050 : quelle réponse donner ?",
      verification: { type: "qcm", choix: ["−15 m d'épaisseur", "15 m d'épaisseur", "Le modèle ne vaut plus : une épaisseur n'est pas négative"], bonne: 2 },
      dessin: glacier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Électrique contre diesel",
      sorte: "defi",
      question: `Un concessionnaire ajuste ses ventes depuis 2020 (x = 0) : voitures électriques y = 120x + 300, diesel y = −40x + 1 100.<br><br><b>En quelle année</b> les ventes seraient-elles égales ?`,
      reponse: `120x + 300 = −40x + 1 100, donc 160x = 800 et x = 5.<br>Soit 2020 + 5 = <span class="big">2025</span>, avec 900 voitures de chaque sorte.`,
      consigne: "120x + 300 = −40x + 1 100 avec x = 0 en 2020 : en quelle année les ventes sont-elles égales ?",
      verification: { type: "courte", attendus: ["2025"] },
      dessin: voitures,
    },
  ],
};

export default problemes;
