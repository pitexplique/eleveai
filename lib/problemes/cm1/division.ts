// Énigmes à projeter — CM1, notion division (le partage des billes, les
// bouquets de tulipes, l'album photo et son reste, le cadeau payé à quatre, le
// piège des coups de ciseaux, le défi des rangs de la classe). 21/11/2026.
// ⛔ Division avec « ÷ », jamais 5/2.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const billes = svg(
  "84 billes à partager entre 4 enfants",
  Array.from({ length: 24 }, (_, i) => o(110 + (i % 8) * 34, 80 + Math.floor(i / 8) * 34, 13, [C.bleu, C.rose, C.jaune][i % 3], 0.45, 2)).join("") +
    t(240, 220, "84 billes", C.craie, 32) + ["🧒", "👧", "👦", "🧒"].map((e, i) => t(90 + i * 100, 300, e, C.craie, 46)).join("") +
    t(240, 385, `Chacun${NB}: ? billes`, C.rose, 28)
);

const tulipes = svg(
  "50 tulipes en bouquets de 7",
  Array.from({ length: 7 }, (_, i) => t(70 + i * 57, 120, "🌷", C.craie, 46)).join("") + t(240, 175, "1 bouquet = 7 tulipes", C.pale, 24) +
    t(240, 250, "50 tulipes", C.craie, 34) + t(240, 340, `Combien de bouquets complets${NB}?`, C.rose, 24)
);

const album = svg(
  "Un album : 5 photos par page, 37 photos",
  [0, 1].map((k) => r(70 + k * 170, 60, 170, 200, C.craie, 0.04, 4, 6) + [0, 1, 2, 3, 4].map((i) => r(85 + k * 170 + (i % 2) * 75, 75 + Math.floor(i / 2) * 60, 65, 48, C.bleu, 0.25, 2, 4)).join("")).join("") +
    t(240, 310, "37 photos · 5 par page", C.craie, 26) + t(240, 370, `Pages pleines${NB}? Photos en plus${NB}?`, C.rose, 22)
);

const cadeau = svg(
  "Un cadeau de 96 € payé par 4 amis",
  r(170, 80, 140, 120, C.rose, 0.25, 4, 6) + l(240, 80, 240, 200, C.jaune, 8) + l(170, 140, 310, 140, C.jaune, 8) + t(240, 60, "🎁", C.craie, 40) +
    t(240, 250, "96 €", C.craie, 40) + t(240, 300, "4 amis paient pareil", C.pale, 24) + t(240, 370, `Chacun${NB}: ? €`, C.rose, 28)
);

// La ficelle : 30 m = 390 px, 6 morceaux de 65 px, 5 coups de ciseaux.
const ficelle = svg(
  "Une ficelle de 30 m coupée en morceaux de 5 m",
  l(45, 180, 435, 180, C.jaune, 8) + [1, 2, 3, 4, 5].map((k) => t(45 + k * 65, 160, "✂", C.rose, 26) + l(45 + k * 65, 168, 45 + k * 65, 192, C.craie, 3)).join("") +
    t(240, 100, "30 m", C.craie, 32) + t(77, 230, "5 m", C.pale, 20) + t(240, 330, `Combien de coups de ciseaux${NB}?`, C.rose, 24)
);

const rangs = svg(
  "Des élèves en rangs de 4 : il en reste 1 ; en rangs de 3 : il n'en reste aucun",
  Array.from({ length: 4 }, (_, i) => t(80 + i * 34, 100, "🧍", C.craie, 30)).join("") + t(250, 100, "rangs de 4 → reste 1", C.craie, 22, "start") +
    Array.from({ length: 3 }, (_, i) => t(80 + i * 34, 180, "🧍", C.craie, 30)).join("") + t(250, 180, "rangs de 3 → reste 0", C.craie, 22, "start") +
    t(240, 280, "entre 20 et 30 élèves", C.bleu, 28) + t(240, 350, `Combien d'élèves${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "division",
  titre: "Énigmes sur la division",
  description: "Le partage des 84 billes, les bouquets de tulipes, l'album photo et son reste, le cadeau payé à quatre, le piège des coups de ciseaux, le défi des rangs de la classe.",
  problemes: [
    {
      tag: "Énigme 1 · La récré",
      titre: "Le partage des billes",
      question: `<b>4 enfants</b> se partagent <b>84 billes</b>.<br>Chacun en a autant.<br><br><b>Combien de billes</b> pour chacun ?`,
      reponse: `84 ÷ 4 : 8 dizaines ÷ 4 = 2 dizaines. 4 unités ÷ 4 = 1.<br>84 ÷ 4 = <span class="big">21 billes</span>.`,
      consigne: "Combien de billes pour chacun ?",
      verification: { type: "courte", attendus: ["21"], unite: "billes" },
      dessin: billes,
    },
    {
      tag: "Énigme 2 · Chez la fleuriste",
      titre: "Les bouquets de tulipes",
      question: `Mia a <b>50 tulipes</b>.<br>Elle fait des bouquets de <b>7 tulipes</b>.<br><br>Combien de <b>bouquets complets</b> ?`,
      reponse: `7 × 7 = 49. 7 × 8 = 56, c'est trop.<br>50 ÷ 7 : <span class="big">7 bouquets</span>, et il reste 1 tulipe.`,
      consigne: "Combien de bouquets complets de 7 tulipes ?",
      verification: { type: "courte", attendus: ["7"], unite: "bouquets" },
      dessin: tulipes,
    },
    {
      tag: "Énigme 3 · L'album photo",
      titre: "La dernière page",
      question: `Nora colle <b>37 photos</b>.<br>Elle met <b>5 photos</b> par page.<br><br>Combien de <b>pages pleines</b> ? Combien de photos <b>en plus</b> ?`,
      reponse: `5 × 7 = 35. 37 − 35 = 2.<br><span class="big">7 pages pleines</span> et 2 photos en plus.`,
      consigne: "Combien de pages pleines, et combien de photos en plus ?",
      verification: { type: "qcm", choix: ["6 pages, 7 en plus", "7 pages, 3 en plus", "7 pages, 2 en plus"], bonne: 2 },
      dessin: album,
    },
    {
      tag: "Énigme 4 · L'anniversaire",
      titre: "Le cadeau à quatre",
      question: `<b>4 amis</b> offrent un cadeau de <b>96 €</b>.<br>Chacun paie la même somme.<br><br>Combien paie <b>chacun</b> ?`,
      reponse: `96 ÷ 4 : 80 ÷ 4 = 20 et 16 ÷ 4 = 4.<br>20 + 4 = <span class="big">24 €</span>.`,
      consigne: "Combien paie chacun ?",
      verification: { type: "courte", attendus: ["24"], unite: "€" },
      dessin: cadeau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les coups de ciseaux",
      sorte: "piege",
      question: `Une ficelle mesure <b>30 m</b>.<br>On la coupe en morceaux de <b>5 m</b>.<br><br>Combien de <b>coups de ciseaux</b> ?`,
      reponse: `30 ÷ 5 = 6 morceaux.<br>Le piège : le dernier morceau n'a pas besoin d'être coupé !<br><span class="big">5 coups de ciseaux</span>.`,
      consigne: "Combien de coups de ciseaux ?",
      verification: { type: "qcm", choix: ["6", "5", "25"], bonne: 1 },
      dessin: ficelle,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les rangs de la classe",
      sorte: "defi",
      question: `La classe a entre <b>20 et 30</b> élèves.<br>En rangs de 4, il reste <b>1</b> élève.<br>En rangs de 3, il ne reste <b>personne</b>.<br><br><b>Combien d'élèves</b> ?`,
      reponse: `Rangs de 4, reste 1 : 21, 25 ou 29.<br>Lequel est dans la table de 3 ? 21 = 3 × 7.<br><span class="big">21 élèves</span>.`,
      consigne: "Combien d'élèves dans la classe ?",
      verification: { type: "courte", attendus: ["21"], unite: "élèves" },
      dessin: rangs,
    },
  ],
};

export default problemes;
