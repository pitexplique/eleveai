// Énigmes à projeter — première (sans spé maths), notion lin_affine_lecture
// (le parking à vélos, l'aquarium, le photographe de mariage, les letchis du
// marché de Saint-Pierre, piège de la consigne à bagages, défi de la laverie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

const droites = (() => {
  const R = repereXY(0, 5, 0, 12, { gx: 80, gy: 40, gl: 330, gh: 270, px: 1, ex: 1, py: 1, ey: 2 });
  return svg("Trois droites : d1 d'équation y = x + 2, d2 d'équation y = 2x, d3 d'équation y = 2x + 1",
    R.fond + R.courbe((x) => x + 2, 0, 5, C.bleu, 4) + R.courbe((x) => 2 * x, 0, 5, C.jaune, 4) + R.courbe((x) => 2 * x + 1, 0, 5, C.craie, 4) +
      t(R.X(5) + 8, R.Y(7) + 6, "d1", C.bleu, 19, "start") + t(R.X(5) + 8, R.Y(10) + 12, "d2", C.jaune, 19, "start") + t(R.X(5) + 8, R.Y(11) - 2, "d3", C.craie, 19, "start") +
      t(R.X(0) + 10, 28, "prix (€)", C.pale, 17, "start") + t(R.X(5), R.Y(0) + 46, "heures", C.pale, 17, "end") +
      t(240, 405, `f(x) = 2x + 1${NB}: quelle droite${NB}?`, C.rose, 24));
})();

const aquarium = (() => {
  const R = repereXY(0, 6, 0, 45, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 5, ey: 10 });
  return svg("Remplissage d'un aquarium : une droite passe par (0 ; 10) et (5 ; 35)",
    R.fond + R.courbe((x) => 10 + 5 * x, 0, 6, C.bleu, 4) + R.point(0, 10, C.jaune, 8) + R.point(5, 35, C.jaune, 8) +
      t(R.X(0) + 16, R.Y(10) + 24, "(0 ; 10)", C.jaune, 18, "start") + t(R.X(5) + 14, R.Y(35) + 24, "(5 ; 35)", C.jaune, 18, "start") +
      t(R.X(0) + 10, 28, "volume (L)", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "minutes", C.pale, 17, "end") +
      t(240, 405, `a = ${NB}? (L par minute)`, C.rose, 24));
})();

const photographe = (() => {
  const R = repereXY(0, 40, 0, 400, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 10, py: 50, ey: 100 });
  return svg("Tarif d'un photographe par morceaux : de 0 à 20 photos, 10 euros la photo ; au-delà, 6 euros la photo ; ligne brisée (0 ; 0), (20 ; 200), (40 ; 320)",
    R.fond + brisee(R, [[0, 0], [20, 200], [40, 320]], C.bleu, 4) + R.point(20, 200, C.jaune, 7) +
      t(R.X(20) - 10, R.Y(200) - 14, "(20 ; 200)", C.jaune, 18, "end") +
      t(R.X(0) + 10, 28, "prix (€)", C.pale, 17, "start") + t(R.X(40), R.Y(0) + 46, "photos", C.pale, 17, "end") +
      t(240, 405, `30 photos${NB}: combien${NB}?`, C.rose, 24));
})();

const letchis = (() => {
  const R = repereXY(0, 10, 0, 600, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 100, ey: 100 });
  return svg("Marché des letchis : demande D(p) = 500 − 50p, offre O(p) = 100p − 250 ; les deux droites se coupent en un point",
    R.fond + R.courbe((x) => 500 - 50 * x, 0, 10, C.bleu, 4) + R.courbe((x) => 100 * x - 250, 2.5, 8.5, C.jaune, 4) + R.point(5, 250, C.rose, 8) +
      t(R.X(1) + 4, R.Y(500) - 4, "demande", C.bleu, 18, "start") + t(R.X(7.2), R.Y(370), "offre", C.jaune, 18, "start") +
      t(R.X(0) + 10, 28, "quantité (kg)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "prix p (€ le kg)", C.pale, 17, "end") +
      t(240, 405, `le prix d'équilibre${NB}?`, C.rose, 24));
})();

const bagages = (() => {
  const R = repereXY(0, 12, 0, 24, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 2, ey: 4 });
  return svg("Tarif d'une consigne à bagages : 3 euros l'heure les 4 premières heures, puis 1 euro l'heure ; ligne brisée (0 ; 0), (4 ; 12), (12 ; 20)",
    R.fond + brisee(R, [[0, 0], [4, 12], [12, 20]], C.bleu, 4) + R.point(4, 12, C.jaune, 7) +
      t(R.X(4) - 10, R.Y(12) - 14, "(4 ; 12)", C.jaune, 18, "end") +
      t(R.X(0) + 10, 28, "prix (€)", C.pale, 17, "start") + t(R.X(12), R.Y(0) + 46, "heures", C.pale, 17, "end") +
      t(240, 405, `10 heures${NB}: combien${NB}?`, C.rose, 24));
})();

const laverie = (() => {
  const R = repereXY(0, 10, 0, 45, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 5, ey: 10 });
  return svg("Deux formules de laverie : A, 4 euros par lavage ; B, 15 euros par mois plus 1,50 euro par lavage ; deux droites",
    R.fond + R.courbe((x) => 4 * x, 0, 10, C.bleu, 4) + R.courbe((x) => 15 + 1.5 * x, 0, 10, C.jaune, 4) +
      t(R.X(10) + 8, R.Y(40) + 6, "A", C.bleu, 20, "start") + t(R.X(10) + 8, R.Y(30) + 6, "B", C.jaune, 20, "start") +
      t(R.X(0) + 10, 28, "prix du mois (€)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "lavages", C.pale, 17, "end") +
      t(240, 405, `B moins cher dès combien${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_affine_lecture",
  titre: "Énigmes des fonctions affines en graphique",
  description: "Le parking à vélos, l'aquarium, le photographe de mariage, les letchis du marché de Saint-Pierre, le piège de la consigne à bagages, le défi de la laverie : reconnaître la droite d'une fonction affine, lire un coefficient, lire un tarif par morceaux, trouver un point d'équilibre entre offre et demande.",
  problemes: [
    {
      tag: "Énigme 1 · Le parking à vélos",
      titre: "Reconnaître la droite",
      question: `Un parking à vélos gardé coûte 1 € à l'entrée, puis 2 € par heure : f(x) = 2x + 1.<br><br><b>Quelle droite</b> représente f ?`,
      reponse: `La droite de f coupe l'axe vertical en b = 1 et monte de 2 quand x augmente de 1.<br>d1 coupe en 2, d2 passe par 0 : c'est <span class="big">la droite d3</span>.`,
      consigne: "f(x) = 2x + 1 : quelle droite représente f ?",
      verification: { type: "qcm", choix: ["La droite d1", "La droite d2", "La droite d3"], bonne: 2 },
      dessin: droites,
    },
    {
      tag: "Énigme 2 · L'aquarium",
      titre: "Lire le coefficient directeur",
      question: `On remplit un aquarium. La droite donne le volume d'eau selon le temps. Elle passe par (0 ; 10) et (5 ; 35).<br><br><b>Combien de litres</b> par minute ?`,
      reponse: `a = (35 − 10) ÷ (5 − 0) = 25 ÷ 5 = <span class="big">5 L par minute</span>.<br>Il y avait déjà 10 L au départ : f(t) = 5t + 10.`,
      consigne: "La droite passe par (0 ; 10) et (5 ; 35) : combien de litres par minute ?",
      verification: { type: "courte", attendus: ["5"], unite: "L par minute" },
      dessin: aquarium,
    },
    {
      tag: "Énigme 3 · Le photographe de mariage",
      titre: "Un tarif par morceaux",
      question: `Un photographe de mariage fait payer 10 € la photo jusqu'à 20 photos. Au-delà, chaque photo en plus coûte 6 €.<br><br><b>Combien</b> coûtent 30 photos ?`,
      reponse: `Les 20 premières : 20 × 10 = 200 €. Les 10 suivantes : 10 × 6 = 60 €.<br>Total : 200 + 60 = <span class="big">260 €</span>. La droite change de pente en x = 20.`,
      consigne: "10 € la photo jusqu'à 20, puis 6 € la photo : combien coûtent 30 photos ?",
      verification: { type: "courte", attendus: ["260"], unite: "€" },
      dessin: photographe,
    },
    {
      tag: "Énigme 4 · Les letchis de Saint-Pierre",
      titre: "Le point d'équilibre",
      question: `Au marché de Saint-Pierre, pour les letchis, la demande est D(p) = 500 − 50p et l'offre O(p) = 100p − 250 (en kg, p en € le kg).<br><br><b>Quel est</b> le prix d'équilibre ?`,
      reponse: `À l'équilibre, l'offre égale la demande : 500 − 50p = 100p − 250, donc 750 = 150p et p = 5.<br><span class="big">5 € le kg</span>, et on échange 500 − 250 = 250 kg.`,
      consigne: "D(p) = 500 − 50p et O(p) = 100p − 250 : quel est le prix d'équilibre ?",
      verification: { type: "qcm", choix: ["5 € le kg", "250 € le kg", "2,50 € le kg"], bonne: 0 },
      dessin: letchis,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La consigne à bagages",
      sorte: "piege",
      question: `Une consigne à bagages de gare coûte 3 € l'heure pendant les 4 premières heures, puis 1 € l'heure.<br><br><b>Combien</b> paie-t-on pour 10 heures ?`,
      reponse: `On ne fait pas 10 × 3 ! Les 4 premières heures : 4 × 3 = 12 €. Les 6 suivantes : 6 × 1 = 6 €.<br>Total : <span class="big">18 €</span>.`,
      consigne: "3 € l'heure les 4 premières heures, puis 1 € l'heure : combien pour 10 heures ?",
      verification: { type: "qcm", choix: ["30 €", "18 €", "10 €"], bonne: 1 },
      dessin: bagages,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La laverie",
      sorte: "defi",
      question: `Une laverie propose deux formules. A : 4 € par lavage. B : 15 € par mois, plus 1,50 € par lavage.<br><br><b>À partir de combien</b> de lavages par mois B est-elle moins chère ?`,
      reponse: `Les droites se coupent quand 4n = 15 + 1,5n, donc 2,5n = 15 et n = 6 (24 € dans les deux cas).<br>Au-delà, B est moins chère : à partir de <span class="big">7 lavages</span> (28 € contre 25,50 €).`,
      consigne: "A : 4 € par lavage ; B : 15 € + 1,50 € par lavage. À partir de combien de lavages B est-elle moins chère ?",
      verification: { type: "courte", attendus: ["7"], unite: "lavages" },
      dessin: laverie,
    },
  ],
};

export default problemes;
