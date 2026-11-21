// Énigmes à projeter — STMG (1re), notion indice base 100
// (l'ananas Victoria du marché de Saint-Pierre (974), l'auto-école, le salon de
// thé, les deux marques de lunettes de soleil, piège de la salle de padel, défi
// du barbier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

/** Un tableau à deux lignes et trois colonnes, centré (largeur 400). */
const tab = (lignes: (string | number)[][], y = 110) =>
  tableau(40, y, [140, 130, 130], 64, lignes, (i, j) => (i === 0 || j === 0 ? C.pale : C.craie), 24);

/** Deux barres d'indice sur une même base (y = 320). */
const deuxBarres = (h1: number, h2: number, v1: string, v2: string, a1: string, a2: string) =>
  l(70, 320, 410, 320, C.craie, 3) +
  r(110, 320 - h1, 90, h1, C.jaune, 0.3, 3) + r(280, 320 - h2, 90, h2, C.jaune, 0.3, 3) +
  t(155, 308 - h1, v1, C.jaune, 24) + t(325, 308 - h2, v2, C.jaune, 24) +
  t(155, 352, a1, C.craie, 22) + t(325, 352, a2, C.craie, 22);

const ananas = svg("L'ananas Victoria : indice 100 en 2020, indice 132 en 2026",
  tab([["année", "2020", "2026"], ["indice", "100", "132"]]) +
    t(240, 330, `évolution du prix :${NB}?`, C.rose, 28));

const autoEcole = svg("L'auto-école : 80 000 € en 2022, indice 100 ; 96 000 € en 2026, indice inconnu",
  tab([["année", "2022", "2026"], ["chiffre", "80 000 €", "96 000 €"], ["indice", "100", "?"]], 90) +
    t(240, 360, "base 100 en 2022", C.pale, 24));

const salon = svg("Le salon de thé : indice 125 en 2024, indice 140 en 2026",
  deuxBarres(150, 168, "125", "140", "2024", "2026") +
    t(240, 400, `taux d'évolution :${NB}?`, C.rose, 26));

const lunettes = svg("Deux marques de lunettes de soleil : base 100 en 2020, en 2026 indice 130 pour A et 118 pour B",
  tab([["marque", "A", "B"], ["2020", "100", "100"], ["2026", "130", "118"]], 90) +
    t(240, 360, `la plus forte hausse :${NB}?`, C.rose, 26));

const padel = svg("La salle de padel : indice 120 en 2025, indice 150 en 2026. Léo dit : plus 30 %",
  deuxBarres(144, 180, "120", "150", "2025", "2026") +
    t(240, 400, `Léo :${NB}« + 30 % »${NB}?`, C.rose, 26));

const barbier = svg("Le barbier : en 2026 la coupe coûte 27 €, indice 108 ; en 2020 indice 100, prix inconnu",
  tab([["année", "2020", "2026"], ["prix", "?", "27 €"], ["indice", "100", "108"]], 90) +
    t(240, 360, `prix en 2020 :${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_indice",
  titre: "Énigmes d'indices base 100",
  description: "L'ananas Victoria, l'auto-école, le salon de thé, les deux marques de lunettes de soleil, le piège de la salle de padel, le défi du barbier : lire un indice, le calculer, passer d'un indice à un taux, comparer deux séries.",
  problemes: [
    {
      tag: "Énigme 1 · L'ananas Victoria",
      titre: "Lire un indice",
      question: `Au marché de Saint-Pierre, on suit le prix du kilo d'ananas Victoria.<br>Base 100 en 2020. En 2026, l'indice vaut 132.<br><br><b>Comment le prix a-t-il évolué</b> entre 2020 et 2026 ?`,
      reponse: `L'indice passe de 100 à 132 : il gagne 32 points.<br>Avec la base 100, cela fait <span class="big">+ 32 %</span>.<br>L'indice ne donne pas le prix : il donne l'évolution depuis 2020.`,
      consigne: "Base 100 en 2020, indice 132 en 2026. Comment le prix a-t-il évolué ?",
      verification: { type: "qcm", choix: ["+ 132 %", "+ 3,2 %", "+ 32 %"], bonne: 2 },
      dessin: ananas,
    },
    {
      tag: "Énigme 2 · L'auto-école",
      titre: "Calculer un indice",
      question: `Une auto-école a fait 80 000 € de chiffre d'affaires en 2022.<br>En 2026, elle fait 96 000 €.<br>On prend la base 100 en 2022.<br><br><b>Quel est l'indice en 2026</b> ?`,
      reponse: `Indice = 96 000 ÷ 80 000 × 100 = 1,2 × 100 = <span class="big">120</span>.<br>Le chiffre d'affaires a augmenté de 20 %.`,
      consigne: "80 000 € en 2022 (base 100), 96 000 € en 2026. Quel est l'indice en 2026 ?",
      verification: { type: "courte", attendus: ["120"] },
      dessin: autoEcole,
    },
    {
      tag: "Énigme 3 · Le salon de thé",
      titre: "D'un indice à l'autre",
      question: `On suit le nombre de clients d'un salon de thé.<br>Indice 125 en 2024, indice 140 en 2026 (même base).<br><br><b>Quel est le taux d'évolution</b> entre 2024 et 2026, en pourcentage ?`,
      reponse: `Taux = (140 − 125) ÷ 125 = 15 ÷ 125 = 0,12.<br><span class="big">+ 12 %</span>. On divise par l'indice de DÉPART, pas par 100.`,
      consigne: "Indice 125 en 2024, indice 140 en 2026. Quel est le taux d'évolution en % ?",
      verification: { type: "courte", attendus: ["12", "+12", "12%", "+12%"], unite: "%" },
      dessin: salon,
    },
    {
      tag: "Énigme 4 · Les lunettes de soleil",
      titre: "Comparer deux séries",
      question: `On suit les ventes de deux marques de lunettes de soleil.<br>Base 100 en 2020 pour les deux.<br>En 2026 : indice 130 pour A, indice 118 pour B.<br><br><b>Quelle marque a la plus forte hausse</b> depuis 2020 ?`,
      reponse: `A : + 30 %. B : + 18 %.<br><span class="big">La marque A</span>.<br>Attention : les indices ne disent pas quelle marque vend le PLUS de lunettes.`,
      consigne: "Base 100 en 2020. En 2026 : A a l'indice 130, B l'indice 118. Quelle marque a la plus forte hausse ?",
      verification: { type: "qcm", choix: ["la marque A", "la marque B", "les deux pareil"], bonne: 0 },
      dessin: lunettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La salle de padel",
      sorte: "piege",
      question: `On suit les abonnés d'une salle de padel.<br>Indice 120 en 2025, indice 150 en 2026.<br>Léo : « 150 − 120 = 30, donc + 30 %. »<br><br><b>Quel est le vrai taux d'évolution</b> ?`,
      reponse: `Taux = 30 ÷ 120 = 0,25, soit <span class="big">+ 25 %</span>.<br>30 points ne font 30 % que si l'on part de 100.`,
      consigne: "Indice 120 en 2025, indice 150 en 2026. Quel est le taux d'évolution ?",
      verification: { type: "qcm", choix: ["+ 30 %", "+ 25 %", "+ 50 %"], bonne: 1 },
      dessin: padel,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le barbier",
      sorte: "defi",
      question: `Chez le barbier, la coupe coûte 27 € en 2026.<br>Base 100 en 2020. L'indice de 2026 vaut 108.<br><br><b>Combien coûtait la coupe en 2020</b> ?`,
      reponse: `L'indice 108 veut dire : prix de 2020 × 1,08 = 27 €.<br>Prix de 2020 = 27 ÷ 1,08 = <span class="big">25 €</span>.`,
      consigne: "Une coupe coûte 27 € en 2026, indice 108 (base 100 en 2020). Combien coûtait-elle en 2020 ?",
      verification: { type: "courte", attendus: ["25"], unite: "€" },
      dessin: barbier,
    },
  ],
};

export default problemes;
