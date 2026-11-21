// Énigmes à projeter — première (sans spé maths), notion info_nuage
// (la fromagerie, les heures de révision, la route du volcan (974), les
// voitures d'occasion, piège des glaces et des coups de soleil, défi de la
// consommation d'essence). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

type Pt = [number, number];
const nuage = (R: ReturnType<typeof repereXY>, pts: Pt[], c: string = C.bleu) => pts.map(([x, y]) => R.point(x, y, c, 7)).join("");

const fromagerie = (() => {
  const R = repereXY(0, 14, 0, 40, { gx: 80, gy: 40, gl: 350, gh: 270, px: 2, ex: 2, py: 5, ey: 10 });
  return svg("Nuage de points : âge d'affinage d'un fromage et prix au kilo ; 2 mois 14 €, 4 mois 18 €, 6 mois 22 €, 8 mois 25 €, 10 mois 30 €, 12 mois 34 €",
    R.fond + nuage(R, [[2, 14], [4, 18], [6, 22], [10, 30], [12, 34]]) + R.point(8, 25, C.rose, 8) +
      t(R.X(0) + 8, R.Y(40) + 20, "prix (€/kg)", C.pale, 17, "start") + t(R.X(14), R.Y(0) + 46, "mois d'affinage", C.pale, 17, "end") +
      t(240, 405, `le prix à 8 mois${NB}?`, C.rose, 24));
})();

const revisions = (() => {
  const R = repereXY(0, 6, 0, 20, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("Nuage de points des heures de révision et des notes : 1 h 8, 2 h 10, 3 h 11, 4 h 11, 5 h 15",
    R.fond + nuage(R, [[1, 8], [2, 10], [3, 11], [4, 11], [5, 15]]) +
      t(R.X(0) + 8, R.Y(20) + 20, "note sur 20", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "heures de révision", C.pale, 17, "end") +
      t(240, 405, `quel point est mal placé${NB}?`, C.rose, 24));
})();

const volcan = (() => {
  const R = repereXY(0, 2500, 0, 35, { gx: 80, gy: 40, gl: 350, gh: 270, px: 250, ex: 500, py: 5, ey: 5 });
  return svg("Nuage de points sur la route du volcan : altitude et température ; 0 m 29 °C, 500 m 26 °C, 1 000 m 23 °C, 1 500 m 20 °C, 2 000 m 17 °C, 2 300 m 15 °C",
    R.fond + nuage(R, [[0, 29], [500, 26], [1000, 23], [1500, 20], [2000, 17], [2300, 15]], C.jaune) +
      t(R.X(0) + 8, R.Y(35) + 20, "température (°C)", C.pale, 17, "start") + t(R.X(2500), R.Y(0) + 46, "altitude (m)", C.pale, 17, "end") +
      t(240, 405, `quelle tendance${NB}?`, C.rose, 24));
})();

const occasion = (() => {
  const R = repereXY(0, 9, 0, 24, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("Nuage de points de 8 voitures d'occasion : âge et prix en milliers d'euros ; 18, 15, 13, 11, 9, 8, 6 et 5 ; un trait à 10",
    R.fond + l(R.X(0), R.Y(10), R.X(9), R.Y(10), C.rose, 3, "8 6") +
      nuage(R, [[1, 18], [2, 15], [3, 13], [4, 11], [5, 9], [6, 8], [7, 6], [8, 5]]) +
      t(R.X(9) - 4, R.Y(10) - 10, "10 000 €", C.rose, 17, "end") +
      t(R.X(0) + 8, R.Y(24) + 20, "prix (milliers d'€)", C.pale, 17, "start") + t(R.X(9), R.Y(0) + 46, "âge (ans)", C.pale, 17, "end") +
      t(240, 405, `combien au-dessus de 10 000 €${NB}?`, C.rose, 24));
})();

const glaces = (() => {
  const R = repereXY(0, 10, 0, 50, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 5, ey: 10 });
  return svg("Nuage de points de six semaines d'été : glaces vendues et coups de soleil ; le nuage monte",
    R.fond + nuage(R, [[2, 8], [3, 14], [5, 20], [6, 27], [8, 35], [9, 41]], C.rose) +
      t(R.X(0) + 8, R.Y(50) + 20, "coups de soleil", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "glaces (centaines)", C.pale, 17, "end") +
      t(240, 405, `faut-il interdire les glaces${NB}?`, C.rose, 24));
})();

const essence = (() => {
  const R = repereXY(40, 140, 4, 7, { gx: 80, gy: 40, gl: 340, gh: 270, px: 10, ex: 20, py: 0.5, ey: 1 });
  return svg("Nuage de points : vitesse et consommation d'une voiture ; 50 km/h 6,5 L, 70 km/h 5,4 L, 90 km/h 5 L, 110 km/h 5,6 L, 130 km/h 6,8 L",
    R.fond + nuage(R, [[50, 6.5], [70, 5.4], [90, 5.0], [110, 5.6], [130, 6.8]], C.jaune) +
      t(R.X(40) + 8, R.Y(7) + 20, "L pour 100 km", C.pale, 17, "start") + t(R.X(140), R.Y(4) + 46, "vitesse (km/h)", C.pale, 17, "end") +
      t(240, 405, `à quelle vitesse consomme-t-elle le moins${NB}?`, C.rose, 21));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_nuage",
  titre: "Énigmes des nuages de points",
  description: "La fromagerie, les heures de révision, la route du volcan à La Réunion, les voitures d'occasion, le piège des glaces et des coups de soleil, le défi de la consommation d'essence : lire, construire un nuage de points et décrire sa tendance.",
  problemes: [
    {
      tag: "Énigme 1 · La fromagerie",
      titre: "Lire un point",
      question: `Un fromager affine ses fromages plus ou moins longtemps. Le nuage donne le prix au kilo selon la durée d'affinage.<br><br><b>Quel est le prix</b> du fromage affiné 8 mois ?`,
      reponse: `On part de 8 sur l'axe horizontal, on monte jusqu'au point rose, puis on lit l'axe vertical.<br>Le point a pour coordonnées (8 ; 25) : <span class="big">25 € le kilo</span>.`,
      consigne: "Le point rose est au-dessus de 8 mois : quel est le prix au kilo ?",
      verification: { type: "courte", attendus: ["25"], unite: "€/kg" },
      dessin: fromagerie,
    },
    {
      tag: "Énigme 2 · Les révisions",
      titre: "Construire un nuage",
      question: `Inès a noté ses heures de révision et ses notes : 1 h → 8 ; 2 h → 10 ; 3 h → 11 ; 4 h → 14 ; 5 h → 15.<br><br>Elle a placé les points. <b>Lequel</b> est mal placé ?`,
      reponse: `Le point de 4 h est à la hauteur 11, alors que la note est 14.<br>C'est <span class="big">celui de 4 h</span> : il faut le monter en (4 ; 14).`,
      consigne: "La note après 4 h de révision est 14 : quel point est mal placé ?",
      verification: { type: "qcm", choix: ["Celui de 2 h", "Celui de 4 h", "Celui de 5 h"], bonne: 1 },
      dessin: revisions,
    },
    {
      tag: "Énigme 3 · La route du volcan",
      titre: "Décrire une tendance",
      question: `À La Réunion, on monte de la côte jusqu'au Piton de la Fournaise. On relève la température à six altitudes.<br><br><b>Comment évolue</b> la température quand on monte ?`,
      reponse: `Les points descendent de gauche à droite, presque en ligne droite : environ 3 °C de moins tous les 500 m.<br>La température <span class="big">baisse, presque en ligne droite</span> : prévoir un pull au sommet !`,
      consigne: "Les points descendent presque en ligne droite : comment évolue la température quand on monte ?",
      verification: { type: "qcm", choix: ["Elle baisse, presque en ligne droite", "Elle monte", "Elle ne suit aucune tendance"], bonne: 0 },
      dessin: volcan,
    },
    {
      tag: "Énigme 4 · Les voitures d'occasion",
      titre: "Compter des points",
      question: `Un garage vend 8 voitures d'occasion. Le nuage donne leur âge et leur prix.<br><br><b>Combien de voitures</b> coûtent plus de 10 000 € ?`,
      reponse: `On compte les points au-dessus du trait rose : 18, 15, 13 et 11 milliers d'euros.<br>Soit <span class="big">4 voitures</span>, les plus récentes : le nuage descend, le prix baisse avec l'âge.`,
      consigne: "Combien de points sont au-dessus du trait des 10 000 € ?",
      verification: { type: "courte", attendus: ["4"], unite: "voitures" },
      dessin: occasion,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les glaces et les coups de soleil",
      sorte: "piege",
      question: `Sur une plage, chaque semaine d'été, on compte les glaces vendues et les coups de soleil soignés. Le nuage monte.<br><br>Faut-il <b>interdire les glaces</b> pour éviter les coups de soleil ?`,
      reponse: `Un nuage qui monte montre un <b>lien</b>, pas une cause. Les deux grimpent quand il fait beau et chaud.<br><span class="big">Non : c'est le soleil qui fait monter les deux</span>.`,
      consigne: "Le nuage glaces / coups de soleil monte : faut-il interdire les glaces ?",
      verification: { type: "qcm", choix: ["Oui : les glaces causent les coups de soleil", "Oui : le nuage est croissant", "Non : c'est le soleil qui fait monter les deux"], bonne: 2 },
      dessin: glaces,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La vitesse qui consomme le moins",
      sorte: "defi",
      question: `On mesure la consommation d'une voiture à cinq vitesses. Le nuage n'est ni croissant ni décroissant.<br><br><b>À quelle vitesse</b> la voiture consomme-t-elle le moins ?`,
      reponse: `Le nuage descend puis remonte : la consommation est la plus basse au point (90 ; 5).<br>Soit <span class="big">90 km/h</span>. Trop lent ou trop vite, on gaspille de l'essence.`,
      consigne: "Le nuage descend puis remonte : à quelle vitesse la consommation est-elle la plus basse ?",
      verification: { type: "courte", attendus: ["90"], unite: "km/h" },
      dessin: essence,
    },
  ],
};

export default problemes;
