// Énigmes à projeter — STMG (1re), notion fonction monotone sur un intervalle
// (la moissonneuse-batteuse, le dépôt de bouteilles de gaz, l'exposition de
// bonsaïs, les cartouches d'encre, piège des parasols, défi de la gare
// routière de Saint-Denis). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

/** Un tableau de variations dessiné à la main : xs aux abscisses données, valeurs en haut (h) ou en bas (b). */
const variations = (cols: { x: number; v: string; s: string; haut: boolean }[], y = 70) => {
  let s = r(20, y, 440, 190, C.craie, 0, 3) + l(110, y, 110, y + 190, C.craie, 2) + l(20, y + 55, 460, y + 55, C.craie, 2) +
    t(65, y + 37, "x", C.pale, 24) + t(65, y + 130, "f", C.pale, 24);
  cols.forEach((c) => (s += t(c.x, y + 37, c.s, C.craie, 22) + t(c.x, c.haut ? y + 88 : y + 175, c.v, C.craie, 22)));
  for (let k = 0; k + 1 < cols.length; k++) {
    const a = cols[k], b = cols[k + 1];
    const ya = a.haut ? y + 96 : y + 152, yb = b.haut ? y + 96 : y + 152;
    s += fleche(a.x + 26, ya, b.x - 26, yb, C.bleu, 3);
  }
  return s;
};

const R1 = repereXY(0, 8, 0, 220, { px: 1, py: 20, ey: 40 });
const moissonneuse = svg("La moissonneuse-batteuse : sa valeur en milliers d'euros, de 200 à l'année 0 à environ 55 à l'année 8 ; la courbe descend",
  R1.fond + R1.courbe((x) => 200 * Math.pow(0.85, x), 0.03, 8, C.bleu, 4) +
    t(R1.X(0) + 8, 24, "milliers d'€", C.pale, 17, "start") + t(462, R1.Y(0) - 10, "années", C.pale, 18, "end") +
    t(240, 400, `sur [0${NB};${NB}8]${NB}?`, C.rose, 26));

const R2 = repereXY(0, 7, 0, 320, { px: 1, py: 40, ey: 80 });
const gaz = svg("Le dépôt de bouteilles de gaz : le stock descend de 300 au jour 0 à 60 au jour 4, puis remonte à 240 au jour 7",
  R2.fond + brisee(R2, [[0, 300], [4, 60], [7, 240]], C.bleu, 4) +
    R2.point(0, 300, C.bleu, 7) + R2.point(4, 60, C.bleu, 7) + R2.point(7, 240, C.bleu, 7) +
    t(R2.X(0) + 8, 24, "bouteilles", C.pale, 17, "start") + t(462, R2.Y(0) - 10, "jour", C.pale, 18, "end") +
    t(240, 400, `croissant sur${NB}?`, C.rose, 26));

const bonsais = svg("L'exposition de bonsaïs : tableau de variations, f croissante de 200 au jour 0 à 800 au jour 12",
  variations([{ x: 170, v: "200", s: "0", haut: false }, { x: 410, v: "800", s: "12", haut: true }]) +
    t(240, 330, "visiteurs depuis l'ouverture", C.pale, 22) + t(240, 385, `le plus grand nombre${NB}?`, C.rose, 26));

const cartouches = svg("Les cartouches d'encre : semaines 0 à 4 ; 120, 105, 90, 75, 60 cartouches",
  r(10, 70, 110, 50, C.pale, 0.3, 2) + t(65, 103, "semaine", C.craie, 19) + r(10, 120, 110, 50, C.bleu, 0.25, 2) + t(65, 153, "stock", C.craie, 20) +
    ["0", "1", "2", "3", "4"].map((n, k) => r(120 + k * 70, 70, 70, 50, C.pale, 0.3, 2) + t(155 + k * 70, 103, n, C.craie, 22)).join("") +
    ["120", "105", "90", "75", "60"].map((v, k) => r(120 + k * 70, 120, 70, 50, C.bleu, 0.1, 2) + t(155 + k * 70, 153, v, C.craie, 21)).join("") +
    t(240, 270, "chaque semaine : ?", C.pale, 26) + t(240, 350, `taux de variation${NB}?`, C.rose, 28));

const parasols = svg("Les parasols : ventes 20 au mois 1, 35 au mois 2, 25 au mois 3, 40 au mois 4 ; Léo dit que f est croissante",
  r(10, 70, 110, 50, C.pale, 0.3, 2) + t(65, 103, "mois", C.craie, 20) + r(10, 120, 110, 50, C.jaune, 0.25, 2) + t(65, 153, "ventes", C.craie, 20) +
    ["1", "2", "3", "4"].map((n, k) => r(120 + k * 85, 70, 85, 50, C.pale, 0.3, 2) + t(162 + k * 85, 103, n, C.craie, 22)).join("") +
    ["20", "35", "25", "40"].map((v, k) => r(120 + k * 85, 120, 85, 50, C.jaune, 0.1, 2) + t(162 + k * 85, 153, v, C.craie, 22)).join("") +
    t(240, 260, "Léo : « f(1) &lt; f(4) »", C.pale, 24) + t(240, 310, "« donc f est croissante »", C.pale, 24) + t(240, 380, "?", C.rose, 34));

const gare = svg("La gare routière de Saint-Denis : tableau de variations de l'affluence ; 100 à 6 h, 900 à 8 h, 200 à 14 h, 700 à 18 h, 300 à 20 h",
  variations([
    { x: 140, v: "100", s: "6 h", haut: false }, { x: 220, v: "900", s: "8 h", haut: true },
    { x: 300, v: "200", s: "14 h", haut: false }, { x: 370, v: "700", s: "18 h", haut: true },
    { x: 435, v: "300", s: "20 h", haut: false },
  ]) + t(240, 330, "voyageurs par heure", C.pale, 22) + t(240, 385, `combien de fois 500${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_monotonie",
  titre: "Énigmes de fonctions croissantes et décroissantes",
  description: "La moissonneuse-batteuse, le dépôt de bouteilles de gaz, l'exposition de bonsaïs, les cartouches d'encre, le piège des parasols, le défi de la gare routière de Saint-Denis : reconnaître une fonction croissante ou décroissante, lire et utiliser un tableau de variations, relier le sens de variation au signe du taux.",
  problemes: [
    {
      tag: "Énigme 1 · La moissonneuse-batteuse",
      titre: "Croissante ou décroissante ?",
      question: `Un agriculteur achète une moissonneuse-batteuse.<br>La courbe donne sa valeur, en milliers d'euros, année après année.<br><br><b>Comment est cette fonction</b> sur [0 ; 8] ?`,
      reponse: `Quand les années passent, la courbe descend.<br>Entre deux années, le taux de variation est négatif.<br>La fonction est <span class="big">décroissante</span> : la machine perd de la valeur.`,
      consigne: "Lis la courbe. Comment est la fonction sur [0 ; 8] ?",
      verification: { type: "qcm", choix: ["décroissante", "croissante", "ni l'une ni l'autre"], bonne: 0 },
      dessin: moissonneuse,
    },
    {
      tag: "Énigme 2 · Les bouteilles de gaz",
      titre: "Trouver l'intervalle",
      question: `Un dépôt vend des bouteilles de gaz.<br>La courbe donne son stock, jour après jour.<br>Au jour 4, le camion de livraison arrive.<br><br><b>Sur quel intervalle</b> le stock est-il croissant ?`,
      reponse: `De 0 à 4, la courbe descend : le stock baisse.<br>De 4 à 7, elle monte : les livraisons remplissent le dépôt.<br>Le stock est croissant sur <span class="big">[4 ; 7]</span>.`,
      consigne: "Lis la courbe. Sur quel intervalle le stock est-il croissant ?",
      verification: { type: "qcm", choix: ["[0 ; 4]", "[4 ; 7]", "[0 ; 7]"], bonne: 1 },
      dessin: gaz,
    },
    {
      tag: "Énigme 3 · L'exposition de bonsaïs",
      titre: "Lire un tableau de variations",
      question: `Une exposition de bonsaïs dure 12 jours.<br>f(x) est le nombre de visiteurs depuis l'ouverture, au jour x.<br>Le tableau de variations est donné.<br><br><b>Quel est le plus grand nombre</b> de visiteurs sur [0 ; 12] ?`,
      reponse: `f est croissante sur [0 ; 12].<br>Elle est donc la plus grande à la fin, au jour 12.<br>Le maximum vaut <span class="big">800</span>.`,
      consigne: "f croît de 200 à 800 sur [0 ; 12]. Quel est son maximum ?",
      verification: { type: "courte", attendus: ["800"], unite: "visiteurs" },
      dessin: bonsais,
    },
    {
      tag: "Énigme 4 · Les cartouches d'encre",
      titre: "Le signe du taux",
      question: `Un bureau note son stock de cartouches d'encre chaque semaine.<br><br><b>Quel est le taux de variation</b> d'une semaine à la suivante ?`,
      reponse: `105 − 120 = −15, puis 90 − 105 = −15, et ainsi de suite.<br>Le taux vaut <span class="big">−15</span> à chaque fois.<br>Il est négatif : le stock est décroissant.`,
      consigne: "120 ; 105 ; 90 ; 75 ; 60. Quel est le taux d'une semaine à l'autre ?",
      verification: { type: "courte", attendus: ["-15", "−15"] },
      dessin: cartouches,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les parasols",
      sorte: "piege",
      question: `Une boutique de plage note ses ventes de parasols.<br>f(x) est le nombre de ventes au mois x.<br>Léo : « f(1) &lt; f(4), donc f est croissante sur [1 ; 4]. »<br><br><b>Léo a-t-il raison</b> ?`,
      reponse: `Croissante veut dire : elle monte TOUT le temps.<br>Or f(2) = 35 et f(3) = 25 : les ventes baissent.<br><span class="big">Non</span> : f baisse entre 2 et 3.`,
      consigne: "20 ; 35 ; 25 ; 40. f est-elle croissante sur [1 ; 4] ?",
      verification: { type: "qcm", choix: ["oui, il a raison", "on ne peut rien dire", "non : f baisse entre 2 et 3"], bonne: 2 },
      dessin: parasols,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La gare routière de Saint-Denis",
      sorte: "defi",
      question: `La gare routière de Saint-Denis compte ses voyageurs.<br>f(x) est le nombre de voyageurs par heure, à x heures.<br>Le tableau de variations est donné, de 6 h à 20 h.<br><br><b>Combien de fois</b> f vaut-elle 500 ?`,
      reponse: `De 6 h à 8 h, f monte de 100 à 900 : elle passe une fois par 500.<br>De 8 h à 14 h, elle descend à 200 : une fois.<br>De 14 h à 18 h, elle monte à 700 : une fois. De 18 h à 20 h, elle descend à 300 : une fois.<br><span class="big">4 fois</span>.`,
      consigne: "Lis le tableau de variations. Combien de fois f vaut-elle 500 ?",
      verification: { type: "courte", attendus: ["4"], unite: "fois" },
      dessin: gare,
    },
  ],
};

export default problemes;
