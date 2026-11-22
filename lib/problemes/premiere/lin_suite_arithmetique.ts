// Énigmes à projeter — première (sans spé maths), notion lin_suite_arithmetique
// (les trois cagnottes, la lampe du vide-grenier, le footing du dimanche, le
// parking relais, piège de la plante grimpante, défi des arbres de la commune). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 30 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 32 + 30 * k, s, c, taille)).join("");

const cagnottes = svg("Trois cagnottes en ligne, semaine après semaine : A 2, 4, 8, 16 euros ; B 5, 9, 13, 17 euros ; C 1, 4, 9, 16 euros",
  cadre(30, ["A · 2 € ; 4 € ; 8 € ; 16 €"]) + cadre(110, ["B · 5 € ; 9 € ; 13 € ; 17 €"]) + cadre(190, ["C · 1 € ; 4 € ; 9 € ; 16 €"]) +
    t(240, 320, "on ajoute toujours le même nombre…", C.pale, 19) +
    t(240, 385, `laquelle est arithmétique${NB}?`, C.rose, 24));

const lampe = (() => {
  const R = repereXY(0, 4, 0, 35, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 5, ey: 5 });
  const v = [30, 27.5, 25, 22.5];
  return svg("Prix d'une lampe au vide-grenier selon l'heure : 30 euros, 27,50 euros, 25 euros, 22,50 euros",
    R.fond + v.map((y, k) => R.point(k, y, C.jaune, 8)).join("") +
      t(R.X(0) + 10, 28, "prix (€)", C.pale, 17, "start") + t(R.X(4), R.Y(0) + 46, "heure n", C.pale, 17, "end") +
      t(240, 405, `la raison r${NB}?`, C.rose, 24));
})();

const footing = svg("Relation de récurrence : u(0) = 20 minutes ; u(n + 1) = u(n) + 15",
  cadre(40, ["u(0) = 20 min", "u(n + 1) = u(n) + 15"], C.bleu, 24) +
    t(240, 220, "u(0) → u(1) → u(2) → u(3)", C.craie, 22) + t(240, 260, "+ 15   + 15   + 15", C.pale, 20) +
    t(240, 385, `u(3)${NB}?`, C.rose, 26));

const parking = svg("Tableau des places d'un parking relais : n = 0, 1, 2, 3 ; u indice n = 350, 362, 374, 386",
  tableau(30, 80, [100, 80, 80, 80, 80], 60, [["n", 0, 1, 2, 3], ["uₙ", 350, 362, 374, 386]], (i, j) => (j === 0 ? C.pale : i === 1 && j === 3 ? C.jaune : C.craie), 22) +
    t(240, 270, "u₂ s'écrit aussi u(2)", C.pale, 20) +
    t(240, 385, `u(2)${NB}?`, C.rose, 26));

const plante = (() => {
  const R = repereXY(0, 10, 0, 140, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 20, ey: 20 });
  let s = "";
  for (let k = 0; k <= 3; k++) s += R.point(k, 50 + 8 * k, C.bleu, 7);
  return svg("Hauteur d'une plante grimpante : 50 cm à la semaine 0, puis 8 cm de plus chaque semaine ; les 4 premières mesures",
    R.fond + s + t(R.X(0) + 10, 28, "hauteur (cm)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "semaine n", C.pale, 17, "end") +
      t(240, 405, `à la 10e mesure${NB}?`, C.rose, 24));
})();

const arbres = svg("Arbres plantés par une commune : u(5) = 40 et u(12) = 61 ; suite arithmétique",
  cadre(40, ["u(5) = 40", "u(12) = 61"], C.bleu, 24) +
    t(240, 210, "de u(5) à u(12) : 7 fois la raison", C.pale, 20) +
    t(240, 385, `u(20)${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_suite_arithmetique",
  titre: "Énigmes des suites arithmétiques",
  description: "Les trois cagnottes, la lampe du vide-grenier, le footing du dimanche, le parking relais, le piège de la plante grimpante, le défi des arbres de la commune : reconnaître une suite arithmétique, trouver sa raison, utiliser u(n + 1) = u(n) + r, passer de u(n) à uₙ, calculer un terme.",
  problemes: [
    {
      tag: "Énigme 1 · Les trois cagnottes",
      titre: "Reconnaître une suite arithmétique",
      question: `Trois cagnottes en ligne affichent leur montant chaque semaine.<br><br><b>Laquelle</b> suit une suite arithmétique ?`,
      reponse: `A : on double (×2). C : +3, +5, +7, ça change.<br><span class="big">La cagnotte B</span> : +4 chaque semaine. La raison est r = 4.`,
      consigne: "Quelle cagnotte suit une suite arithmétique ?",
      verification: { type: "qcm", choix: ["La cagnotte A", "La cagnotte B", "La cagnotte C"], bonne: 1 },
      dessin: cagnottes,
    },
    {
      tag: "Énigme 2 · La lampe du vide-grenier",
      titre: "Trouver la raison",
      question: `Au vide-grenier, une lampe coûte 30 € à 8 h. Toutes les heures, son prix baisse : 27,50 € ; 25 € ; 22,50 €.<br><br><b>Quelle est la raison</b> de cette suite ?`,
      reponse: `On fait la différence de deux termes qui se suivent : 27,5 − 30 = −2,5.<br>C'est toujours la même : <span class="big">r = −2,5</span>. Une raison négative : le prix baisse.`,
      consigne: "Prix 30 ; 27,5 ; 25 ; 22,5 : quelle est la raison de la suite ?",
      verification: { type: "qcm", choix: ["−2,5", "2,5", "27,5"], bonne: 0 },
      dessin: lampe,
    },
    {
      tag: "Énigme 3 · Le footing du dimanche",
      titre: "La relation de récurrence",
      question: `Inès court 20 minutes le premier dimanche : u(0) = 20. Chaque dimanche, elle ajoute 15 minutes : u(n + 1) = u(n) + 15.<br><br><b>Combien vaut</b> u(3) ?`,
      reponse: `u(1) = 20 + 15 = 35 ; u(2) = 35 + 15 = 50 ; u(3) = 50 + 15 = <span class="big">65 min</span>.<br>Plus d'une heure de course au 4<sup>e</sup> dimanche !`,
      consigne: "u(0) = 20 et u(n + 1) = u(n) + 15 : combien vaut u(3) ?",
      verification: { type: "courte", attendus: ["65"], unite: "min" },
      dessin: footing,
    },
    {
      tag: "Énigme 4 · Le parking relais",
      titre: "Deux notations",
      question: `Un parking relais ajoute des places chaque année. Le tableau donne uₙ, le nombre de places l'année n.<br><br><b>Combien vaut</b> u(2) ?`,
      reponse: `u(2) et u₂, c'est le même nombre : le terme de rang 2.<br>On lit sous n = 2 : <span class="big">374 places</span>.`,
      consigne: "Dans le tableau, combien vaut u(2) ?",
      verification: { type: "courte", attendus: ["374"], unite: "places" },
      dessin: parking,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La plante grimpante",
      sorte: "piege",
      question: `Une plante grimpante mesure 50 cm à la semaine 0 : u(0) = 50. Elle gagne 8 cm par semaine.<br><br><b>Quelle hauteur</b> donne la 10<sup>e</sup> mesure ?`,
      reponse: `La 1<sup>re</sup> mesure est u(0) : la 10<sup>e</sup> est donc u(9), pas u(10) !<br>u(9) = 50 + 9 × 8 = 50 + 72 = <span class="big">122 cm</span>.`,
      consigne: "u(0) = 50, +8 cm par semaine : quelle hauteur à la 10e mesure ?",
      verification: { type: "qcm", choix: ["130 cm", "58 cm", "122 cm"], bonne: 2 },
      dessin: plante,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les arbres de la commune",
      sorte: "defi",
      question: `Une commune plante des arbres chaque année. Le nombre total d'arbres suit une suite arithmétique : u(5) = 40 et u(12) = 61.<br><br><b>Combien vaut</b> u(20) ?`,
      reponse: `De u(5) à u(12), on ajoute 7 fois la raison : 7r = 61 − 40 = 21, donc r = 3.<br>u(20) = u(5) + 15 × 3 = 40 + 45 = <span class="big">85 arbres</span>.`,
      consigne: "Suite arithmétique avec u(5) = 40 et u(12) = 61 : combien vaut u(20) ?",
      verification: { type: "courte", attendus: ["85"], unite: "arbres" },
      dessin: arbres,
    },
  ],
};

export default problemes;
