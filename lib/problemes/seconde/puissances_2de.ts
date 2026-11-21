// Énigmes à projeter — seconde, notion puissances_2de (la distance au
// Soleil, les bactéries, la clé USB, la feuille pliée, piège 2³ + 2³,
// défi du chiffre des unités de 7²⁰²⁶). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const soleil = svg(
  "La Terre et le Soleil, séparés de 150 millions de kilomètres, pas à l'échelle",
  o(110, 190, 70, C.jaune, 0.5, 4) + o(390, 190, 18, C.bleu, 0.5, 3) + l(185, 190, 365, 190, C.craie, 3, "10 8") +
    t(275, 170, "150 000 000 km", C.craie, 24) + t(110, 300, "Soleil", C.jaune, 22) + t(390, 240, "Terre", C.bleu, 20) +
    t(240, 350, "(pas à l'échelle)", C.pale, 18) + t(240, 395, `écriture scientifique${NB}?`, C.rose, 26)
);

// Les bactéries : 1 → 2 → 4 → 8 (dessinées), puis « … 3 h ».
const bacteries = () => {
  let s = "";
  [1, 2, 4, 8].forEach((n, k) => {
    for (let i = 0; i < n; i++) s += o(70 + 110 * k + (i % 2) * 26 - (n > 1 ? 13 : 0), 140 + Math.floor(i / 2) * 30 - (n > 2 ? 30 : 0), 11, C.bleu, 0.4, 2);
    s += t(70 + 110 * k, 270, `${20 * k} min`, C.pale, 18);
  });
  return svg("Des bactéries qui doublent toutes les 20 minutes : 1, 2, 4, 8", s + t(240, 330, "× 2 toutes les 20 min", C.craie, 26) + t(240, 385, `après 3 h${NB}?`, C.rose, 28));
};

const cle = svg(
  "Une clé USB de 64 gigaoctets et des photos de 4 mégaoctets",
  r(110, 120, 200, 90, C.bleu, 0.25, 4, 14) + r(310, 140, 60, 50, C.pale, 0.4, 3, 4) + t(210, 178, "64 Go", C.craie, 32) +
    t(240, 270, "1 Go = 10⁹ octets", C.pale, 22) + t(240, 305, "1 Mo = 10⁶ octets", C.pale, 22) + t(240, 360, `photos de 4 Mo${NB}: combien${NB}?`, C.rose, 24)
);

const pliage = svg(
  "Une feuille de 0,1 millimètre pliée en deux, puis encore, 10 fois",
  r(60, 230, 120, 6, C.craie, 0.3, 2) + t(120, 270, "0,1 mm", C.pale, 20) +
    r(220, 220, 80, 16, C.craie, 0.3, 2) + l(220, 228, 300, 228, C.craie, 1.5) + t(260, 270, "1 pli", C.pale, 20) +
    r(340, 200, 60, 36, C.craie, 0.3, 2) + l(340, 209, 400, 209, C.craie, 1.5) + l(340, 218, 400, 218, C.craie, 1.5) + l(340, 227, 400, 227, C.craie, 1.5) + t(370, 270, "2 plis", C.pale, 20) +
    t(240, 120, "× 2 à chaque pli", C.craie, 28) + t(240, 360, `épaisseur après 10 plis${NB}?`, C.rose, 26)
);

const piege = svg(
  "Au tableau : 2 puissance 3 plus 2 puissance 3",
  t(240, 180, "2³ + 2³ = ?", C.bleu, 64).replace(" ?", `${NB}?`) + t(240, 290, "2⁶   4³   2⁴", C.craie, 34)
);

const unites = svg(
  "Les chiffres des unités des puissances de 7 : 7, 9, 3, 1, puis ça recommence",
  t(130, 90, "7¹ = 7", C.craie, 26) + t(130, 135, "7² = 49", C.craie, 26) + t(130, 180, "7³ = 343", C.craie, 26) + t(130, 225, "7⁴ = 2 401", C.craie, 26) + t(130, 270, "7⁵ = 16 807", C.craie, 26) +
    p("M260 80 C300 120 300 220 260 260", C.jaune, 3) + t(385, 180, "7, 9, 3, 1…", C.jaune, 28) + t(240, 360, `7²⁰²⁶ finit par${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "puissances_2de",
  titre: "Énigmes des puissances",
  description: "La distance au Soleil, les bactéries qui doublent, la clé USB, la feuille pliée dix fois, le piège 2³ + 2³, le défi du chiffre des unités de 7²⁰²⁶ : écriture scientifique et règles de calcul sur les puissances.",
  problemes: [
    {
      tag: "Énigme 1 · Le Soleil",
      titre: "150 millions de km",
      question: `La Terre est à environ <b>150 000 000 km</b> du Soleil.<br><br><b>Quelle est l'écriture scientifique</b> de cette distance ?`,
      reponse: `Écriture scientifique : a × 10ⁿ avec 1 ≤ a < 10.<br>150 000 000 = 1,5 × 100 000 000 = <span class="big">1,5 × 10⁸ km</span>.<br>On a déplacé la virgule de 8 rangs.`,
      consigne: "Quelle est l'écriture scientifique de 150 000 000 ?",
      verification: { type: "qcm", choix: ["1,5 × 10⁸", "1,5 × 10⁷", "15 × 10⁸"], bonne: 0 },
      dessin: soleil,
    },
    {
      tag: "Énigme 2 · Les bactéries",
      titre: "Le double toutes les 20 min",
      question: `Dans un laboratoire, une bactérie se divise en deux <b>toutes les 20 minutes</b>.<br><br>En partant d'<b>une</b> bactérie, <b>combien</b> y en a-t-il au bout de <b>3 heures</b> ?`,
      reponse: `3 h = 180 min = 9 fois 20 min : on double 9 fois.<br>1 × 2⁹ = <span class="big">512 bactéries</span>.`,
      consigne: "Combien de bactéries au bout de 3 heures ?",
      verification: { type: "courte", attendus: ["512"], unite: "bactéries" },
      dessin: bacteries(),
    },
    {
      tag: "Énigme 3 · La clé USB",
      titre: "64 Go de photos",
      question: `Une clé USB contient <b>64 Go</b>. Une photo pèse <b>4 Mo</b>.<br>1 Go = 10⁹ octets et 1 Mo = 10⁶ octets.<br><br><b>Combien de photos</b> peut-on y mettre ?`,
      reponse: `(64 × 10⁹) ÷ (4 × 10⁶) = (64 ÷ 4) × 10⁹⁻⁶ = 16 × 10³.<br>Soit <span class="big">16 000 photos</span>.`,
      consigne: "Combien de photos de 4 Mo sur une clé de 64 Go ?",
      verification: { type: "qcm", choix: ["1 600", "16 000", "160 000"], bonne: 1 },
      dessin: cle,
    },
    {
      tag: "Énigme 4 · La feuille pliée",
      titre: "Dix plis",
      question: `Une feuille de papier a une épaisseur de <b>0,1 mm</b>. À chaque pli, l'épaisseur double.<br><br><b>Quelle épaisseur</b> après <b>10 plis</b> ?`,
      reponse: `0,1 × 2¹⁰ = 0,1 × 1 024 = <span class="big">102,4 mm</span>.<br>Plus de 10 cm : c'est pour ça qu'on n'arrive pas à la plier 10 fois !`,
      consigne: "Quelle épaisseur en mm après 10 plis ?",
      verification: { type: "courte", attendus: ["102,4"], unite: "mm" },
      dessin: pliage,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "2³ + 2³",
      sorte: "piege",
      question: `<b>Que vaut</b> 2³ + 2³ ?<br>A. 2⁶ B. 4³ C. 2⁴`,
      reponse: `On n'ajoute pas les exposants dans une <b>somme</b> : ça, c'est pour un produit (2³ × 2³ = 2⁶).<br>2³ + 2³ = 8 + 8 = 16 = 2 × 2³ = <span class="big">2⁴</span>.`,
      consigne: "Que vaut 2³ + 2³ ?",
      verification: { type: "qcm", choix: ["2⁶", "4³", "2⁴"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le dernier chiffre",
      sorte: "defi",
      question: `Personne ne peut écrire 7²⁰²⁶ en entier : il a plus de 1 700 chiffres !<br><br><b>Par quel chiffre</b> se termine-t-il ?`,
      reponse: `Les unités des puissances de 7 tournent : 7, 9, 3, 1, puis 7, 9…, tous les 4 exposants.<br>2026 = 4 × 506 + 2 : on tombe à la 2e place du cycle, comme 7² = 49.<br>7²⁰²⁶ se termine par <span class="big">9</span>.`,
      consigne: "Par quel chiffre se termine 7 puissance 2026 ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: unites,
    },
  ],
};

export default problemes;
