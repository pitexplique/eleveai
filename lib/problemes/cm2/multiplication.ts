// Énigmes à projeter — CM2, notion multiplication (les rangées du cinéma, les
// cartons de craies, un décimal × un entier, l'ordre de grandeur, le piège des
// zéros de 30 × 40, le défi produit et somme). 20/11/2026. Phrases courtes.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, grille } from "../dessins-ecole";

// 18 rangées de 24 fauteuils : 1 fauteuil = 14 px (336 × 252), au bon rapport.
const cinema = svg(
  "Une salle de cinéma vue de haut : 18 rangées de 24 fauteuils",
  r(70, 30, 340, 22, C.pale, 0.3, 3) + t(240, 47, "écran", C.craie, 18) +
    grille(72, 80, 24, 18, 14, C.bleu, 1) + r(72, 80, 336, 252, C.bleu, 0.12, 3) +
    t(240, 370, "24 fauteuils par rangée", C.craie, 22) + t(40, 210, "18", C.jaune, 28) + t(40, 240, "rangées", C.jaune, 16) +
    t(240, 405, `Combien de fauteuils${NB}?`, C.rose, 24)
);

const craies = svg(
  "Un carton qui contient 4 boîtes de 25 craies",
  r(110, 120, 260, 180, C.jaune, 0.18, 4, 6) +
    [0, 1, 2, 3].map((i) => r(125 + (i % 2) * 120, 135 + Math.floor(i / 2) * 82, 110, 72, C.bleu, 0.15, 3, 4) + t(180 + (i % 2) * 120, 180 + Math.floor(i / 2) * 82, "25", C.craie, 30)).join("") +
    t(240, 95, "1 carton = 4 boîtes de 25 craies", C.craie, 22) + t(240, 360, `12 cartons${NB}: ? craies`, C.rose, 28)
);

const metro = svg(
  "Six tickets de métro à 1,85 € chacun",
  [0, 1, 2, 3, 4, 5].map((i) => r(40 + (i % 3) * 140, 90 + Math.floor(i / 3) * 110, 120, 80, C.bleu, 0.15, 3, 8) + t(100 + (i % 3) * 140, 140 + Math.floor(i / 3) * 110, "1,85 €", C.craie, 26)).join("") +
    t(240, 60, "🚇 métro", C.pale, 24) + t(240, 360, `6 tickets${NB}: ? €`, C.rose, 30)
);

const salades = svg(
  "Un potager : 49 rangs de 21 salades (pas à l'échelle)",
  [0, 1, 2, 3, 4].map((j) => [0, 1, 2, 3, 4, 5, 6].map((i) => t(80 + i * 50, 100 + j * 45, "🥬", C.craie, 28)).join("") + t(440, 100 + j * 45, "…", C.pale, 28)).join("") +
    t(240, 330, "49 rangs de 21 salades", C.craie, 26) + t(240, 370, `environ${NB}?`, C.rose, 28) + t(240, 405, "pas à l'échelle", C.pale, 18)
);

const perles = svg(
  "Une boîte de perles : 30 rangées de 40 perles, et le calcul de Lina 30 × 40 = 120",
  r(60, 60, 360, 170, C.jaune, 0.12, 4, 10) +
    [0, 1, 2, 3, 4].map((j) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<circle cx="${90 + i * 33}" cy="${85 + j * 30}" r="9" fill="${[C.rose, C.bleu, C.jaune][(i + j) % 3]}" fill-opacity=".55"/>`).join("")).join("") +
    t(240, 290, "30 × 40 = 120", C.craie, 40) + t(240, 340, "dit Lina", C.pale, 22) + t(240, 390, "30 rangées de 40 perles", C.pale, 20)
);

const devinette = svg(
  "Deux nombres cachés : leur produit vaut 36, leur somme vaut 13",
  r(80, 80, 100, 100, C.bleu, 0.15, 4, 12) + t(130, 150, "?", C.bleu, 56) + t(240, 150, "×", C.craie, 48) + r(300, 80, 100, 100, C.jaune, 0.15, 4, 12) + t(350, 150, "?", C.jaune, 56) +
    t(240, 240, "produit = 36", C.craie, 32) + t(240, 300, "somme = 13", C.craie, 32) + t(240, 380, `le plus grand${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "multiplication",
  titre: "Énigmes sur la multiplication",
  description: "Les fauteuils du cinéma, les cartons de craies, six tickets de métro, l'ordre de grandeur du potager, le piège des zéros de Lina, le défi des deux nombres cachés.",
  problemes: [
    {
      tag: "Énigme 1 · Au cinéma",
      titre: "Les fauteuils de la salle",
      question: `Une salle de cinéma a <b>18 rangées</b>.<br>Chaque rangée a <b>24 fauteuils</b>.<br><br><b>Combien de fauteuils</b> en tout ?`,
      reponse: `18 × 24 = 18 × 20 + 18 × 4.<br>360 + 72 = <span class="big">432 fauteuils</span>.`,
      consigne: "Combien de fauteuils dans la salle ?",
      verification: { type: "courte", attendus: ["432"], unite: "fauteuils" },
      dessin: cinema,
    },
    {
      tag: "Énigme 2 · À l'école",
      titre: "Les cartons de craies",
      question: `Un carton contient <b>4 boîtes</b>.<br>Chaque boîte contient <b>25 craies</b>.<br><br>L'école reçoit <b>12 cartons</b>. Combien de craies ?`,
      reponse: `Un carton : 4 × 25 = 100 craies.<br>12 cartons : 12 × 100 = <span class="big">1 200 craies</span>.`,
      consigne: "Combien de craies dans 12 cartons ?",
      verification: { type: "courte", attendus: ["1200"], unite: "craies" },
      dessin: craies,
    },
    {
      tag: "Énigme 3 · Dans le métro",
      titre: "Six tickets",
      question: `Un ticket de métro coûte <b>1,85 €</b>.<br><br>Combien coûtent <b>6 tickets</b> ?`,
      reponse: `6 × 1 € = 6 €, et 6 × 0,85 € = 5,10 €.<br>6 + 5,10 = <span class="big">11,10 €</span>.`,
      consigne: "Combien coûtent 6 tickets à 1,85 € ?",
      verification: { type: "courte", attendus: ["11,10", "11,1", "11.10", "11.1"], unite: "€" },
      dessin: metro,
    },
    {
      tag: "Énigme 4 · Au potager",
      titre: "Environ combien de salades ?",
      question: `Un jardinier plante <b>49 rangs</b>.<br>Chaque rang a <b>21 salades</b>.<br><br>Sans poser l'opération : <b>environ</b> combien de salades ?`,
      reponse: `49, c'est presque 50. 21, c'est presque 20.<br>50 × 20 = 1 000. Il y a <span class="big">environ 1 000 salades</span>.<br>(Le calcul exact donne 1 029.)`,
      consigne: "Environ combien de salades ?",
      verification: { type: "qcm", choix: ["Environ 1 000", "Environ 100", "Environ 10 000"], bonne: 0 },
      dessin: salades,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les perles de Lina",
      sorte: "piege",
      question: `Une boîte a <b>30 rangées</b> de <b>40 perles</b>.<br><br>Lina écrit : <b>30 × 40 = 120</b>.<br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! 3 × 4 = 12, mais il reste deux zéros.<br>30 × 40 = 3 × 4 × 10 × 10 = <span class="big">1 200 perles</span>.`,
      consigne: "Combien font 30 × 40 ?",
      verification: { type: "courte", attendus: ["1200"], unite: "perles" },
      dessin: perles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux nombres cachés",
      sorte: "defi",
      question: `Je pense à deux nombres entiers.<br>Leur <b>produit</b> fait <b>36</b>. Leur <b>somme</b> fait <b>13</b>.<br><br>Quel est le <b>plus grand</b> des deux ?`,
      reponse: `On cherche dans les tables : 36 = 1 × 36 = 2 × 18 = 3 × 12 = 4 × 9 = 6 × 6.<br>Seul 4 + 9 fait 13.<br>Le plus grand est <span class="big">9</span>.`,
      consigne: "Quel est le plus grand des deux nombres ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: devinette,
    },
  ],
};

export default problemes;
