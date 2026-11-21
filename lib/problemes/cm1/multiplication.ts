// Énigmes à projeter — CM1, notion multiplication (les bouquets de 10 roses, le
// verger de 16 rangées, la piscine de la classe, l'ordre de grandeur des
// cartons, le piège des deux sacs de billes, le défi du mur et de sa fenêtre). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, grille } from "../dessins-ecole";

const bouquets = svg(
  "23 bouquets de 10 roses",
  Array.from({ length: 6 }, (_, i) => t(70 + i * 68, 170, "💐", C.craie, 56)).join("") + t(240, 75, "1 bouquet = 10 roses", C.craie, 26) +
    t(240, 260, "23 bouquets", C.craie, 34) + t(240, 350, `Combien de roses${NB}?`, C.rose, 28)
);

const verger = svg(
  "Un verger de 16 rangées de 25 arbres",
  Array.from({ length: 40 }, (_, i) => t(56 + (i % 10) * 41, 80 + Math.floor(i / 10) * 50, "🌳", C.craie, 30)).join("") +
    t(240, 300, "16 rangées de 25 arbres", C.craie, 28) + t(240, 340, "(pas tous dessinés)", C.pale, 20) + t(240, 390, `Combien d'arbres${NB}?`, C.rose, 26)
);

const piscine = svg(
  "Une entrée de piscine à 4 € pour 27 élèves",
  r(60, 200, 360, 110, C.bleu, 0.25, 4, 16) + `<path d="M80 250 Q120 235 160 250 T240 250 T320 250 T400 250" fill="none" stroke="${C.bleu}" stroke-width="3"/>` +
    r(150, 70, 180, 80, C.jaune, 0.25, 4, 10) + t(240, 122, "entrée 4 €", C.craie, 30) + t(240, 365, `27 élèves${NB}: ? €`, C.rose, 30)
);

const cartons = svg(
  "48 cartons de 21 cahiers",
  Array.from({ length: 8 }, (_, i) => r(50 + (i % 4) * 98, 70 + Math.floor(i / 4) * 90, 82, 72, C.jaune, 0.2, 3, 4) + t(91 + (i % 4) * 98, 114 + Math.floor(i / 4) * 90, "21", C.craie, 26)).join("") +
    t(240, 285, "48 cartons de 21 cahiers", C.craie, 26) + t(240, 318, "(pas tous dessinés)", C.pale, 18) + t(240, 360, `Environ combien${NB}?`, C.rose, 28)
);

const sacs = svg(
  "Sacs de Lina : 6 sacs de 8 billes. Sacs de Nils : 8 sacs de 6 billes",
  Array.from({ length: 6 }, (_, i) => r(30 + (i % 3) * 66, 90 + Math.floor(i / 3) * 80, 54, 60, C.rose, 0.2, 3, 14) + t(57 + (i % 3) * 66, 130 + Math.floor(i / 3) * 80, "8", C.craie, 26)).join("") +
    Array.from({ length: 8 }, (_, i) => r(258 + (i % 4) * 54, 90 + Math.floor(i / 4) * 80, 44, 60, C.bleu, 0.2, 3, 12) + t(280 + (i % 4) * 54, 130 + Math.floor(i / 4) * 80, "6", C.craie, 24)).join("") +
    t(130, 300, "Lina", C.craie, 28) + t(360, 300, "Nils", C.craie, 28) + t(240, 380, `Qui a le plus de billes${NB}?`, C.rose, 26)
);

// Le mur : 15 carreaux sur 12 rangées (pas de 22 px), fenêtre de 4 × 3.
const mur = svg(
  "Un mur de 12 rangées de 15 carreaux, avec une fenêtre de 4 carreaux sur 3",
  grille(75, 40, 15, 12, 22, C.pale, 1.5) + r(75 + 5 * 22, 40 + 3 * 22, 4 * 22, 3 * 22, C.bleu, 0.45, 3) +
    t(240, 340, "15 carreaux × 12 rangées", C.craie, 24) + t(240, 385, `fenêtre${NB}: 4 × 3`, C.bleu, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "multiplication",
  titre: "Énigmes sur la multiplication",
  description: "Les bouquets de 10 roses, le verger de 16 rangées, l'entrée de la piscine pour la classe, l'ordre de grandeur des cartons de cahiers, le piège des sacs de billes, le défi du mur et de sa fenêtre.",
  problemes: [
    {
      tag: "Énigme 1 · Chez le fleuriste",
      titre: "Les bouquets de roses",
      question: `La fleuriste fait <b>23 bouquets</b>.<br>Chaque bouquet a <b>10 roses</b>.<br><br><b>Combien de roses</b> lui faut-il ?`,
      reponse: `23 × 10 : 23 dizaines.<br>23 dizaines = <span class="big">230 roses</span>.`,
      consigne: "Combien de roses pour 23 bouquets de 10 ?",
      verification: { type: "courte", attendus: ["230"], unite: "roses" },
      dessin: bouquets,
    },
    {
      tag: "Énigme 2 · Le verger",
      titre: "Les rangées d'arbres",
      question: `Un verger a <b>16 rangées</b>.<br>Chaque rangée a <b>25 arbres</b>.<br><br><b>Combien d'arbres</b> dans le verger ?`,
      reponse: `10 × 25 = 250. 6 × 25 = 150.<br>250 + 150 = <span class="big">400 arbres</span>.`,
      consigne: "Combien d'arbres dans 16 rangées de 25 ?",
      verification: { type: "courte", attendus: ["400"], unite: "arbres" },
      dessin: verger,
    },
    {
      tag: "Énigme 3 · À la piscine",
      titre: "L'entrée de la classe",
      question: `L'entrée de la piscine coûte <b>4 €</b> par élève.<br>La classe a <b>27 élèves</b>.<br><br><b>Combien</b> faut-il payer ?`,
      reponse: `27 × 4 = 20 × 4 + 7 × 4.<br>80 + 28 = <span class="big">108 €</span>.`,
      consigne: "Combien coûtent 27 entrées à 4 € ?",
      verification: { type: "courte", attendus: ["108"], unite: "€" },
      dessin: piscine,
    },
    {
      tag: "Énigme 4 · L'école",
      titre: "Les cartons de cahiers",
      question: `L'école reçoit <b>48 cartons</b>.<br>Chaque carton a <b>21 cahiers</b>.<br><br>Il y a <b>environ</b> combien de cahiers ?`,
      reponse: `48, c'est presque 50. 21, c'est presque 20.<br>50 × 20 = 1 000. Environ <span class="big">1 000 cahiers</span>.<br>(Le calcul exact donne 1 008.)`,
      consigne: "Environ combien de cahiers dans 48 cartons de 21 ?",
      verification: { type: "qcm", choix: ["100", "1 000", "10 000"], bonne: 1 },
      dessin: cartons,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les sacs de billes",
      sorte: "piege",
      question: `Lina a <b>6 sacs de 8</b> billes.<br>Nils a <b>8 sacs de 6</b> billes.<br><br><b>Qui a le plus</b> de billes ?`,
      reponse: `Nils a plus de sacs, mais ils sont plus petits.<br>6 × 8 = 48 et 8 × 6 = 48.<br><span class="big">Ils en ont autant</span>.`,
      consigne: "Qui a le plus de billes ?",
      verification: { type: "qcm", choix: ["Autant", "Lina", "Nils"], bonne: 0 },
      dessin: sacs,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le mur de la salle de bain",
      sorte: "defi",
      question: `Un mur a <b>12 rangées de 15</b> carreaux.<br>Une fenêtre prend la place de <b>4 × 3</b> carreaux.<br><br><b>Combien de carreaux</b> faut-il poser ?`,
      reponse: `Tout le mur : 12 × 15 = 180.<br>La fenêtre : 4 × 3 = 12.<br>180 − 12 = <span class="big">168 carreaux</span>.`,
      consigne: "Combien de carreaux faut-il poser ?",
      verification: { type: "courte", attendus: ["168"], unite: "carreaux" },
      dessin: mur,
    },
  ],
};

export default problemes;
