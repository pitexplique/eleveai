// Énigmes à projeter — première (sans spé maths), notion lin_affine
// (le plombier, la facture d'eau, la piscine qu'on vide, le vélo cargo,
// piège du camion-citerne, défi du vendeur à la commission). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const plombier = svg("Tarif d'un plombier : 40 euros de déplacement, plus 35 euros par heure",
  cadre(40, ["déplacement : 40 €", "+ 35 € par heure de travail"], C.bleu, 24) +
    t(240, 230, "x heures → f(x) euros", C.pale, 20) +
    t(240, 385, `f(x) = ${NB}?`, C.rose, 26));

const eau = svg("Tableau d'une facture d'eau : 10 mètres cubes, 47 euros ; 30 mètres cubes, 107 euros",
  tableau(40, 70, [160, 120, 120], 60, [["eau (m³)", 10, 30], ["facture (€)", 47, 107]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "f(x) = ax + b", C.bleu, 22) +
    t(240, 385, `a = ${NB}?`, C.rose, 26));

const piscine = (() => {
  const R = repereXY(0, 20, 0, 60, { gx: 80, gy: 40, gl: 340, gh: 270, px: 2, ex: 4, py: 10, ey: 10 });
  return svg("Volume d'une piscine qu'on vide : f(t) = 50 − 2,5t mètres cubes, de t = 0 à t = 20 heures",
    R.fond + R.courbe((x) => 50 - 2.5 * x, 0, 20, C.bleu, 4) +
      t(R.X(0) + 10, 28, "volume (m³)", C.pale, 17, "start") + t(R.X(20), R.Y(0) + 46, "heures t", C.pale, 17, "end") +
      t(R.X(11), R.Y(48), "f(t) = 50 − 2,5t", C.bleu, 20, "start") +
      t(240, 405, `croissante ou décroissante${NB}?`, C.rose, 24));
})();

const cargo = svg("Tableau de location d'un vélo cargo : 2 heures, 13 euros ; 5 heures, 22 euros",
  tableau(40, 70, [160, 120, 120], 60, [["heures", 2, 5], ["prix (€)", 13, 22]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "prix = ax + b", C.bleu, 22) +
    t(240, 385, `f(0) = ${NB}?`, C.rose, 26));

const citerne = (() => {
  const R = repereXY(0, 25, 0, 1400, { gx: 90, gy: 40, gl: 330, gh: 270, px: 5, ex: 5, py: 200, ey: 400 });
  return svg("Camion-citerne qui se vide : 1 200 litres à 5 minutes, 300 litres à 20 minutes, une droite",
    R.fond + R.courbe((x) => 1500 - 60 * x, 5 / 3, 25, C.bleu, 4) +
      R.point(5, 1200, C.jaune, 8) + R.point(20, 300, C.jaune, 8) +
      t(R.X(5) + 18, R.Y(1200) - 8, "(5 ; 1 200)", C.jaune, 18, "start") + t(R.X(20) - 14, R.Y(300) + 28, "(20 ; 300)", C.jaune, 18, "end") +
      t(R.X(0) + 10, 28, "volume (L)", C.pale, 17, "start") + t(R.X(25), R.Y(0) + 46, "minutes", C.pale, 17, "end") +
      t(240, 405, `le coefficient directeur${NB}?`, C.rose, 24));
})();

const vendeur = svg("Tableau du salaire d'un vendeur : 2 000 euros de ventes, 1 500 euros ; 5 000 euros de ventes, 1 740 euros ; 8 000 euros de ventes, inconnu",
  tableau(30, 70, [150, 90, 90, 90], 60, [["ventes (€)", "2 000", "5 000", "8 000"], ["salaire (€)", "1 500", "1 740", "?"]], (i, j) => (j === 0 ? C.pale : i === 1 && j === 3 ? C.jaune : C.craie), 21) +
    t(240, 250, "un fixe + un pourcentage des ventes", C.pale, 20) +
    t(240, 385, `salaire pour 8 000 €${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_affine",
  titre: "Énigmes des fonctions affines",
  description: "Le plombier, la facture d'eau, la piscine qu'on vide, le vélo cargo, le piège du camion-citerne, le défi du vendeur à la commission : écrire f(x) = ax + b, calculer le coefficient directeur comme un taux d'accroissement, trouver le sens de variation avec le signe de a.",
  problemes: [
    {
      tag: "Énigme 1 · Le plombier",
      titre: "Écrire l'expression",
      question: `Un plombier facture 40 € de déplacement, puis 35 € par heure de travail.<br><br><b>Quelle fonction</b> donne le prix f(x) pour x heures ?`,
      reponse: `Le prix par heure est le coefficient a = 35. Le déplacement, payé une fois, est b = 40.<br><span class="big">f(x) = 35x + 40</span>. Pour 2 h : 70 + 40 = 110 €.`,
      consigne: "40 € de déplacement et 35 € par heure : quelle fonction donne le prix pour x heures ?",
      verification: { type: "qcm", choix: ["f(x) = 35x + 40", "f(x) = 40x + 35", "f(x) = 75x"], bonne: 0 },
      dessin: plombier,
    },
    {
      tag: "Énigme 2 · La facture d'eau",
      titre: "Le taux d'accroissement",
      question: `Une facture d'eau est une fonction affine du volume. Pour 10 m³, on paie 47 €. Pour 30 m³, on paie 107 €.<br><br><b>Combien vaut</b> le coefficient a ?`,
      reponse: `a = (107 − 47) ÷ (30 − 10) = 60 ÷ 20 = <span class="big">3</span>.<br>Le m³ coûte 3 €. Et b = 47 − 30 = 17 € d'abonnement.`,
      consigne: "f(10) = 47 et f(30) = 107 : combien vaut le coefficient a ?",
      verification: { type: "courte", attendus: ["3"], unite: "€ par m³" },
      dessin: eau,
    },
    {
      tag: "Énigme 3 · La piscine qu'on vide",
      titre: "Le sens de variation",
      question: `On vide une piscine. Son volume, en m³, après t heures est f(t) = 50 − 2,5t.<br><br><b>Comment varie</b> la fonction f ?`,
      reponse: `Le coefficient de t est a = −2,5, et −2,5 &lt; 0.<br>f est <span class="big">décroissante</span> : on perd 2,5 m³ par heure.`,
      consigne: "f(t) = 50 − 2,5t : la fonction est-elle croissante, décroissante ou constante ?",
      verification: { type: "qcm", choix: ["Croissante, car 50 > 0", "Décroissante, car −2,5 < 0", "Constante"], bonne: 1 },
      dessin: piscine,
    },
    {
      tag: "Énigme 4 · Le vélo cargo",
      titre: "Retrouver b",
      question: `Louer un vélo cargo coûte 13 € pour 2 h et 22 € pour 5 h. Le prix est une fonction affine de la durée.<br><br><b>Combien</b> coûte la prise en charge, f(0) ?`,
      reponse: `a = (22 − 13) ÷ (5 − 2) = 9 ÷ 3 = 3 € par heure.<br>13 = 3 × 2 + b, donc b = 13 − 6 = <span class="big">7 €</span>. f(x) = 3x + 7.`,
      consigne: "13 € pour 2 h et 22 € pour 5 h : combien vaut f(0) ?",
      verification: { type: "courte", attendus: ["7"], unite: "€" },
      dessin: cargo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le camion-citerne",
      sorte: "piege",
      question: `Un camion-citerne se vide. À 5 min, il reste 1 200 L. À 20 min, il reste 300 L.<br><br><b>Quel est</b> le coefficient directeur de la droite ?`,
      reponse: `a = (300 − 1 200) ÷ (20 − 5) = −900 ÷ 15 = <span class="big">−60</span>.<br>Le signe compte : le volume baisse de 60 L par minute. « 60 » oublie que la droite descend.`,
      consigne: "1 200 L à 5 min et 300 L à 20 min : quel est le coefficient directeur ?",
      verification: { type: "qcm", choix: ["60", "−900", "−60"], bonne: 2 },
      dessin: citerne,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vendeur à la commission",
      sorte: "defi",
      question: `Un vendeur touche un fixe et un pourcentage de ses ventes. Avec 2 000 € de ventes, il gagne 1 500 €. Avec 5 000 €, il gagne 1 740 €.<br><br><b>Combien</b> gagne-t-il avec 8 000 € de ventes ?`,
      reponse: `De 2 000 à 5 000 €, +3 000 € de ventes donnent +240 € (8 %). De 5 000 à 8 000 €, encore +3 000 €, donc encore +240 €.<br>1 740 + 240 = <span class="big">1 980 €</span>. (Fixe : 1 500 − 160 = 1 340 €.)`,
      consigne: "1 500 € pour 2 000 € de ventes, 1 740 € pour 5 000 € : combien pour 8 000 € ?",
      verification: { type: "courte", attendus: ["1980", "1 980"], unite: "€" },
      dessin: vendeur,
    },
  ],
};

export default problemes;
