// Énigmes à projeter — STMG (1re), notion fonction : représenter et noter
// (l'atelier de reliure, la salle d'attente du cabinet de radiologie, la
// station-service, le minibus partagé, piège du miroitier, défi de la
// location de sono). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

/** Un tableau de valeurs en colonnes : x en haut, f(x) dessous. */
const tab = (xs: string[], nom: string, vals: string[], c: string, y = 70, w = 74) => {
  const x0 = 470 - xs.length * w;
  let s = r(10, y, x0 - 10, 50, C.pale, 0.3, 2) + t((10 + x0) / 2, y + 33, "jours", C.craie, 20) +
    r(10, y + 50, x0 - 10, 50, c, 0.25, 2) + t((10 + x0) / 2, y + 83, nom, C.craie, 20);
  xs.forEach((x, k) => (s += r(x0 + k * w, y, w, 50, C.pale, 0.3, 2) + t(x0 + k * w + w / 2, y + 33, x, C.craie, 22) +
    r(x0 + k * w, y + 50, w, 50, c, 0.1, 2) + t(x0 + k * w + w / 2, y + 83, vals[k], C.craie, 20)));
  return s;
};

const reliure = svg("L'atelier de reliure : C de x égale 6 x plus 40, le coût de x carnets ; C de 10 ?",
  r(150, 50, 180, 110, C.jaune, 0.2, 3, 12) + t(240, 95, "carnets", C.pale, 22) + t(240, 140, "x", C.craie, 34) +
    t(240, 250, "C(x) = 6x + 40", C.craie, 32) + t(240, 340, `C(10)${NB}=${NB}?`, C.rose, 30));

const R2 = repereXY(8, 12, 0, 10, { px: 1, py: 1, ey: 2 });
const radiologie = svg("La salle d'attente du cabinet de radiologie : nombre de patients selon l'heure ; 2 à 8 h, 6 à 9 h, 9 à 10 h, 5 à 11 h, 1 à 12 h",
  R2.fond + brisee(R2, [[8, 2], [9, 6], [10, 9], [11, 5], [12, 1]], C.bleu, 4) +
    [[8, 2], [9, 6], [10, 9], [11, 5], [12, 1]].map(([x, y]) => R2.point(x, y, C.bleu, 7)).join("") +
    t(R2.X(8) + 8, 24, "patients", C.pale, 17, "start") + t(462, R2.Y(0) + 46, "h", C.pale, 18, "end") +
    t(240, 400, `f(10)${NB}=${NB}?`, C.rose, 26));

const station = svg("La station-service : le gazole à 1,80 euro le litre ; x litres, quel prix ?",
  r(150, 50, 180, 150, C.bleu, 0.15, 3, 14) + t(240, 105, "gazole", C.pale, 24) + t(240, 160, "1,80 € / L", C.craie, 32) +
    t(240, 270, "x litres  →  f(x) €", C.pale, 26) + t(240, 350, `quelle écriture${NB}?`, C.rose, 28));

const R4 = repereXY(0, 30, 0, 140, { px: 5, py: 20, ey: 40 });
const minibus = svg("Le minibus partagé : 600 euros divisés par x personnes ; la courbe descend ; un point en x égale 20",
  R4.fond + R4.courbe((x) => 600 / x, 5, 30, C.bleu, 4) + l(R4.X(20), R4.Y(0), R4.X(20), R4.Y(30), C.rose, 2, "8 6") +
    R4.point(20, 30, C.rose, 7) +
    t(R4.X(0) + 8, 24, "€ par personne", C.pale, 17, "start") + t(462, R4.Y(0) + 46, "personnes", C.pale, 18, "end") +
    t(300, 90, "f(x) = 600 ÷ x", C.craie, 24) + t(240, 400, `chacun paie${NB}?`, C.rose, 26));

const miroir = svg("Le miroitier : un miroir carré de 1 mètre de côté coûte 40 euros ; un miroir carré de 2 mètres de côté, combien ?",
  r(50, 170, 90, 90, C.bleu, 0.2, 3) + t(95, 222, "40 €", C.craie, 22) + t(95, 290, "1 m", C.pale, 20) +
    r(230, 80, 180, 180, C.jaune, 0.15, 3) + l(320, 80, 320, 260, C.jaune, 2, "8 6") + l(230, 170, 410, 170, C.jaune, 2, "8 6") +
    t(320, 290, "2 m", C.pale, 20) + t(240, 360, `Tom${NB}: « 80 € »${NB}?`, C.rose, 26));

const sono = svg("La location de sono : 1 jour, 70 euros ; 2 jours, 110 ; 3 jours, 150 ; 4 jours, 190 ; combien de jours pour 470 euros ?",
  tab(["1", "2", "3", "4"], "prix (€)", ["70", "110", "150", "190"], C.bleu) +
    t(240, 280, "+ 40 € par jour", C.jaune, 26) + t(240, 360, `470 €${NB}: combien de jours${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_representation",
  titre: "Énigmes de fonctions : représenter et noter",
  description: "L'atelier de reliure, la salle d'attente du cabinet de radiologie, la station-service, le minibus partagé, le piège du miroitier, le défi de la location de sono : calculer une image, lire un graphique, écrire f(x) et x ↦ f(x), passer d'un tableau à une expression.",
  problemes: [
    {
      tag: "Énigme 1 · L'atelier de reliure",
      titre: "Calculer une image",
      question: `Un atelier de reliure fabrique des carnets.<br>Le coût de x carnets vaut C(x) = 6x + 40, en euros.<br><br><b>Combien vaut C(10)</b> ?`,
      reponse: `On remplace x par 10.<br>6 × 10 + 40 = 60 + 40 = <span class="big">100 €</span>.<br>10 carnets coûtent 100 €.`,
      consigne: "C(x) = 6x + 40. Calcule C(10).",
      verification: { type: "courte", attendus: ["100"], unite: "€" },
      dessin: reliure,
    },
    {
      tag: "Énigme 2 · Le cabinet de radiologie",
      titre: "Lire une image sur un graphique",
      question: `Un cabinet de radiologie compte ses patients en salle d'attente.<br>f(x) est le nombre de patients à x heures.<br><br><b>Que vaut f(10)</b> ?`,
      reponse: `On part de 10 sur l'axe des heures.<br>On monte jusqu'à la courbe, puis on lit l'axe vertical.<br>f(10) = <span class="big">9</span> : 9 patients attendent à 10 h.`,
      consigne: "Lis le graphique : que vaut f(10) ?",
      verification: { type: "qcm", choix: ["9", "10", "6"], bonne: 0 },
      dessin: radiologie,
    },
    {
      tag: "Énigme 3 · La station-service",
      titre: "La bonne notation",
      question: `Une station-service vend le gazole 1,80 € le litre.<br>f(x) est le prix de x litres.<br><br><b>Quelle écriture est juste</b> ?`,
      reponse: `On part de x litres. On obtient 1,8 × x euros.<br>La flèche va du nombre de litres vers le prix.<br><span class="big">f : x ↦ 1,8x</span>, c'est-à-dire f(x) = 1,8x.`,
      consigne: "x litres à 1,80 € le litre. Quelle écriture est juste ?",
      verification: { type: "qcm", choix: ["f : 1,8 ↦ x", "f : x ↦ 1,8x", "f(x) = x + 1,8"], bonne: 1 },
      dessin: station,
    },
    {
      tag: "Énigme 4 · Le minibus partagé",
      titre: "Une grandeur en 1 sur x",
      question: `Un club loue un minibus 600 €.<br>Les x personnes du voyage partagent le prix.<br>Chacun paie f(x) = 600 ÷ x euros.<br><br><b>Combien paie chacun</b> s'ils sont 20 ?`,
      reponse: `On remplace x par 20.<br>600 ÷ 20 = <span class="big">30 €</span>.<br>Sur la courbe, le point d'abscisse 20 a pour ordonnée 30.`,
      consigne: "f(x) = 600 ÷ x. Calcule f(20).",
      verification: { type: "courte", attendus: ["30"], unite: "€" },
      dessin: minibus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le miroitier",
      sorte: "piege",
      question: `Un miroitier vend des miroirs carrés à 40 € le m².<br>Un miroir de 1 m de côté coûte 40 €.<br>Tom : « Côté 2 fois plus grand, prix 2 fois plus grand : 80 €. »<br><br><b>Combien coûte</b> le miroir de 2 m de côté ?`,
      reponse: `Le prix dépend de l'aire, pas du côté : f(x) = 40x².<br>L'aire vaut 2 × 2 = 4 m² : 4 carrés de 1 m².<br>40 × 4 = <span class="big">160 €</span>.`,
      consigne: "40 € le m². Combien coûte un miroir carré de 2 m de côté ?",
      verification: { type: "qcm", choix: ["80 €", "120 €", "160 €"], bonne: 2 },
      dessin: miroir,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La location de sono",
      sorte: "defi",
      question: `Un magasin loue une sono pour les fêtes.<br>Le tableau donne le prix selon le nombre de jours.<br><br><b>Combien de jours</b> peut-on louer pour 470 € ?`,
      reponse: `Chaque jour ajoute 40 €. Pour 1 jour : 70 = 40 + 30.<br>Donc f(x) = 40x + 30.<br>40x + 30 = 470, donc 40x = 440.<br>x = 440 ÷ 40 = <span class="big">11 jours</span>.`,
      consigne: "70 ; 110 ; 150 ; 190 €. Combien de jours pour 470 € ?",
      verification: { type: "courte", attendus: ["11"], unite: "jours" },
      dessin: sono,
    },
  ],
};

export default problemes;
