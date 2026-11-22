// Énigmes à projeter — première (sans spé maths), notion auto_resolution_graphique
// (le parapente, l'air de la chambre, le food-truck, le lac de barrage, piège
// de l'imprimante 3D en pause, défi du bambou et du tournesol). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

const parapente = (() => {
  const R = repereXY(0, 10, 0, 1200, { gx: 100, gy: 40, gl: 330, gh: 280, px: 1, ex: 2, py: 200, ey: 200 });
  return svg("L'altitude d'un parapente : 200 m au départ, 1 000 m à 4 minutes, 200 m à 10 minutes ; un trait à 600 m",
    R.fond + brisee(R, [[0, 200], [4, 1000], [10, 200]], C.bleu) +
      l(R.X(0), R.Y(600), R.X(10), R.Y(600), C.rose, 3, "8 6") + t(R.X(10) + 6, R.Y(600) + 6, "600", C.rose, 17, "start") +
      t(R.X(0) + 8, R.Y(1200) + 20, "altitude (m)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "min", C.pale, 17, "end") +
      t(240, 405, `quand est-il à 600 m${NB}?`, C.rose, 24));
})();

const chambre = (() => {
  const R = repereXY(0, 8, 0, 1400, { gx: 100, gy: 40, gl: 330, gh: 280, px: 1, ex: 1, py: 200, ey: 200 });
  return svg("Le taux de CO2 d'une chambre pendant la nuit : 500 ppm au coucher, 750 à 2 h, 1 000 à 5 h, 1 300 à 8 h ; un trait à 1 000 ppm",
    R.fond + brisee(R, [[0, 500], [2, 750], [5, 1000], [8, 1300]], C.jaune) +
      l(R.X(0), R.Y(1000), R.X(8), R.Y(1000), C.rose, 3, "8 6") + t(R.X(0) + 8, R.Y(1000) - 10, "on aère", C.rose, 17, "start") +
      t(R.X(0) + 8, R.Y(1400) + 20, "CO₂ (ppm)", C.pale, 17, "start") + t(R.X(8), R.Y(0) + 46, "heures de sommeil", C.pale, 17, "end") +
      t(240, 405, `combien d'heures sous 1 000${NB}?`, C.rose, 24));
})();

const foodtruck = (() => {
  const R = repereXY(0, 14, -14, 14, { gx: 70, gy: 30, gl: 370, gh: 300, px: 1, ex: 2, py: 2, ey: 4 });
  const fond = R.fond.replace(/<text[^>]*>2<\/text>/, "").replace(/<text[^>]*>12<\/text>/, "");
  return svg("Le bénéfice d'un food-truck selon le nombre de repas : la courbe est sous l'axe avant 2 et après 12, au-dessus entre les deux",
    fond + t(R.X(2) - 6, R.Y(0) - 8, "2", C.pale, 17, "end") + t(R.X(12) + 6, R.Y(0) - 8, "12", C.pale, 17, "start") + R.courbe((x) => -0.5 * (x - 2) * (x - 12), 0, 14, C.bleu, 5) +
      t(R.X(14), R.Y(-14) + 22, "dizaines de repas", C.pale, 16, "end") + t(R.X(0) + 8, R.Y(14) + 18, "centaines d'€", C.pale, 16, "start") +
      t(240, 400, `quand gagne-t-il de l'argent${NB}?`, C.rose, 24));
})();

const barrage = (() => {
  const R = repereXY(0, 12, 0, 50, { gx: 90, gy: 40, gl: 340, gh: 280, px: 1, ex: 1, py: 10, ey: 10 });
  return svg("Le niveau d'un lac de barrage sur un an : 30 m au départ, 42 m au mois 3, 18 m au mois 9, 26 m au mois 12",
    R.fond + brisee(R, [[0, 30], [3, 42], [9, 18], [12, 26]], C.bleu) +
      t(R.X(0) + 8, R.Y(50) + 20, "niveau (m)", C.pale, 17, "start") + t(R.X(12), R.Y(0) + 46, "mois", C.pale, 17, "end") +
      t(240, 405, `combien de mois de baisse${NB}?`, C.rose, 24));
})();

const imprimante = (() => {
  const R = repereXY(0, 5, 0, 12, { gx: 100, gy: 40, gl: 320, gh: 280, px: 1, ex: 1, py: 2, ey: 2 });
  return svg("La hauteur d'un objet imprimé en 3D : 0 cm au départ, 6 cm à 2 h, toujours 6 cm à 3 h, 10 cm à 5 h ; un trait à 6 cm",
    R.fond + l(R.X(0), R.Y(6), R.X(5), R.Y(6), C.rose, 3, "8 6") + brisee(R, [[0, 0], [2, 6], [3, 6], [5, 10]], C.jaune) +
      t(R.X(5) + 6, R.Y(6) + 6, "6", C.rose, 17, "start") + t(R.X(2.5), R.Y(6) - 14, "pause", C.pale, 17) +
      t(R.X(0) + 8, R.Y(12) + 20, "hauteur (cm)", C.pale, 17, "start") + t(R.X(5), R.Y(0) + 46, "h", C.pale, 17, "end") +
      t(240, 405, `quand mesure-t-il 6 cm${NB}?`, C.rose, 24));
})();

const bambou = (() => {
  const R = repereXY(0, 7, 0, 50, { gx: 90, gy: 40, gl: 340, gh: 280, px: 1, ex: 1, py: 5, ey: 10 });
  return svg("Deux courbes : le bambou y = t², le tournesol y = 4t + 5 ; elles se coupent en t = 5",
    R.fond + R.courbe((x) => x * x, 0, 7, C.bleu, 5) + R.courbe((x) => 4 * x + 5, 0, 7, C.jaune, 5) +
      t(R.X(6.6), R.Y(46), "bambou", C.bleu, 18, "end") + t(R.X(0.3), R.Y(16), "tournesol", C.jaune, 18, "start") +
      t(R.X(0) + 8, R.Y(50) + 20, "hauteur (cm)", C.pale, 17, "start") + t(R.X(7), R.Y(0) + 46, "jours", C.pale, 17, "end") +
      t(240, 405, `quand le bambou dépasse-t-il${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_resolution_graphique",
  titre: "Énigmes pour résoudre graphiquement",
  description: "Le parapente, l'air de la chambre, le food-truck, le lac de barrage, le piège de l'imprimante 3D en pause, le défi du bambou et du tournesol : résoudre f(x) = k et f(x) < k sur une courbe, lire un signe et des variations.",
  problemes: [
    {
      tag: "Énigme 1 · Le parapente",
      titre: "Résoudre f(x) = k",
      question: `Le graphique donne l'altitude d'un parapente pendant son vol de 10 minutes.<br><br><b>À quels moments</b> est-il à 600 m d'altitude ?`,
      reponse: `On trace la droite horizontale y = 600 et on lit les abscisses des points de rencontre.<br>Elle coupe la courbe deux fois : <span class="big">à 2 min et à 7 min</span>. Une seule valeur ne suffit pas !`,
      consigne: "D'après la courbe, à quels moments le parapente est-il à 600 m ?",
      verification: { type: "qcm", choix: ["À 4 min seulement", "À 2 min seulement", "À 2 min et à 7 min"], bonne: 2 },
      dessin: parapente,
    },
    {
      tag: "Énigme 2 · L'air de la chambre",
      titre: "Sous un seuil",
      question: `Dans une chambre fermée, le taux de CO₂ monte pendant la nuit. Au-dessus de <b>1 000 ppm</b>, il faudrait aérer.<br><br><b>Pendant combien d'heures</b> l'air reste-t-il sous 1 000 ppm ?`,
      reponse: `On cherche où la courbe est <b>sous</b> la droite y = 1 000 : de 0 h à 5 h de sommeil.<br>L'air reste bon pendant <span class="big">5 heures</span>, puis il faudrait ouvrir la fenêtre.`,
      consigne: "D'après la courbe, combien d'heures l'air reste-t-il sous 1 000 ppm ?",
      verification: { type: "courte", attendus: ["5"], unite: "heures" },
      dessin: chambre,
    },
    {
      tag: "Énigme 3 · Le food-truck",
      titre: "Lire un signe",
      question: `La courbe donne le bénéfice d'un food-truck en une soirée (en centaines d'euros), selon le nombre de repas vendus (en dizaines).<br><br><b>Pour combien de repas</b> gagne-t-il de l'argent ?`,
      reponse: `Il gagne de l'argent quand le bénéfice est <b>positif</b> : la courbe est au-dessus de l'axe entre 2 et 12.<br>Soit <span class="big">entre 20 et 120 repas</span>. Trop de repas, c'est trop de frais (personnel, achats).`,
      consigne: "Le bénéfice est positif pour x entre 2 et 12 dizaines : pour combien de repas gagne-t-il de l'argent ?",
      verification: { type: "qcm", choix: ["Moins de 20 repas", "Entre 20 et 120 repas", "Plus de 70 repas"], bonne: 1 },
      dessin: foodtruck,
    },
    {
      tag: "Énigme 4 · Le lac de barrage",
      titre: "Lire les variations",
      question: `Le graphique donne le niveau d'eau d'un lac de barrage pendant un an.<br><br><b>Pendant combien de mois</b> le niveau baisse-t-il ?`,
      reponse: `La courbe monte de 0 à 3, descend de 3 à 9, puis remonte de 9 à 12.<br>Le niveau baisse du mois 3 au mois 9 : <span class="big">6 mois</span>.`,
      consigne: "Le niveau baisse du mois 3 au mois 9 : combien de mois ?",
      verification: { type: "courte", attendus: ["6"], unite: "mois" },
      dessin: barrage,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'imprimante en pause",
      sorte: "piege",
      question: `Une imprimante 3D fabrique une figurine. Elle s'arrête une heure pour changer de bobine de fil.<br><br><b>À quels moments</b> la figurine mesure-t-elle 6 cm ?`,
      reponse: `La droite y = 6 ne coupe pas la courbe en un point : elle la touche sur tout un palier !<br>La figurine mesure 6 cm <span class="big">de 2 h à 3 h</span> : une infinité de solutions, tout l'intervalle [2 ; 3].`,
      consigne: "La courbe reste à 6 cm pendant la pause : à quels moments la figurine mesure-t-elle 6 cm ?",
      verification: { type: "qcm", choix: ["De 2 h à 3 h", "À 2 h seulement", "À 6 h"], bonne: 0 },
      dessin: imprimante,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le bambou et le tournesol",
      sorte: "defi",
      question: `Une pousse de bambou mesure t² cm après t jours. Un tournesol mesure 4t + 5 cm.<br><br><b>À partir de quel jour</b> le bambou est-il plus grand que le tournesol ?`,
      reponse: `Les courbes se coupent en t = 5 : 5² = 25 et 4 × 5 + 5 = 25.<br>Avant, le tournesol est devant ; après, la courbe du bambou passe au-dessus : <span class="big">après le 5e jour</span>.`,
      consigne: "Le bambou mesure t² cm, le tournesol 4t + 5 cm : après quel jour le bambou est-il plus grand ?",
      verification: { type: "courte", attendus: ["5"], unite: "jours" },
      dessin: bambou,
    },
  ],
};

export default problemes;
