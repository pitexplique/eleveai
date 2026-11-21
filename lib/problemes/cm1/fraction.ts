// Énigmes à projeter — CM1, notion fractions (la tablette de chocolat, le quart
// de la classe à la chorale, le chat sur le chemin de l'école, plus qu'une
// pizza entière, le piège du tiers et du cinquième, le défi de la bande
// coloriée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, bande, secteurs, droiteGraduee } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const chocolat = svg(
  "Une tablette de 8 carrés ; 3 carrés sont mangés",
  Array.from({ length: 8 }, (_, i) => r(100 + (i % 4) * 70, 90 + Math.floor(i / 4) * 70, 64, 64, C.jaune, i < 3 ? 0 : 0.45, 3, 6)).join("") +
    Array.from({ length: 3 }, (_, i) => t(132 + i * 70, 132, "✗", C.rose, 30)).join("") +
    t(240, 290, "Théo mange 3 carrés 🍫", C.craie, 26) + t(240, 360, `Quelle fraction${NB}?`, C.rose, 28)
);

const chorale = svg(
  "20 élèves ; un quart va à la chorale",
  Array.from({ length: 20 }, (_, i) => t(70 + (i % 10) * 38, 110 + Math.floor(i / 10) * 60, "🧒", C.craie, 32)).join("") +
    t(240, 230, "20 élèves", C.craie, 30) + t(240, 290, "🎵 un quart chante", C.bleu, 26) + t(240, 365, `Combien${NB}?`, C.rose, 30)
);

// Le chemin : maison 0, école 1, partagé en 4 ; le chat au 3e trait.
const chemin = svg(
  "Un chemin de la maison (0) à l'école (1), partagé en 4 parts égales ; le chat est au point A",
  droiteGraduee(220, 60, 420, 0, 1, 0.25, 1) + t(60, 170, "🏠", C.craie, 34) + t(420, 170, "🏫", C.craie, 34) +
    o(330, 220, 9, C.rose, 1, 2) + t(330, 190, "A 🐈", C.rose, 26) + t(240, 340, `A${NB}: quelle fraction du chemin${NB}?`, C.rose, 24)
);

const pizzas = svg(
  "Des pizzas partagées en quarts",
  secteurs(240, 170, 110, 4, 0, C.jaune) + t(240, 40, "une pizza = 4 quarts 🍕", C.craie, 24) +
    t(240, 340, `Plus qu'une pizza entière${NB}?`, C.rose, 26)
);

const tartes = svg(
  "Deux tartes pareilles : l'une en 3 parts, l'autre en 5 parts",
  secteurs(130, 170, 95, 3, 1, C.bleu) + secteurs(350, 170, 95, 5, 1, C.rose) +
    svgFrac(130, 320, 1, 3, C.bleu, 30) + svgFrac(350, 320, 1, 5, C.rose, 30) + t(240, 60, `La plus grosse part${NB}?`, C.craie, 26)
);

const bandeau = svg(
  "Une bande de 12 carreaux",
  bande(60, 120, 360, 60, 12, 0, C.bleu) + t(240, 90, "12 carreaux", C.craie, 26) +
    t(120, 260, "un tiers", C.bleu, 26) + t(360, 260, "un quart", C.rose, 26) + t(240, 340, `blancs${NB}: ?`, C.craie, 30)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "fraction",
  titre: "Énigmes sur les fractions",
  description: "La tablette de chocolat de Théo, le quart de la classe à la chorale, le chat sur le chemin de l'école, plus qu'une pizza entière, le piège du tiers et du cinquième, le défi de la bande coloriée.",
  problemes: [
    {
      tag: "Énigme 1 · Le goûter",
      titre: "La tablette de chocolat",
      question: `Une tablette a <b>8 carrés</b> pareils.<br>Théo en mange <b>3</b>.<br><br>Quelle <b>fraction</b> de la tablette a-t-il mangée ?`,
      reponse: `8 parts égales : des huitièmes.<br>Il en mange 3 : ${frac(3, 8)}.<br>Il a mangé <span class="big">3 huitièmes</span>.`,
      consigne: "Quelle fraction de la tablette Théo a-t-il mangée ?",
      verification: { type: "qcm", choix: ["3 huitièmes", "5 huitièmes", "3 cinquièmes"], bonne: 0 },
      dessin: chocolat,
    },
    {
      tag: "Énigme 2 · La chorale",
      titre: "Le quart de la classe",
      question: `La classe a <b>20 élèves</b>.<br>Un <b>quart</b> de la classe va à la chorale.<br><br><b>Combien d'élèves</b> chantent ?`,
      reponse: `Un quart : on partage en 4 parts égales.<br>20 ÷ 4 = <span class="big">5 élèves</span>.`,
      consigne: "Combien d'élèves vont à la chorale ?",
      verification: { type: "courte", attendus: ["5"], unite: "élèves" },
      dessin: chorale,
    },
    {
      tag: "Énigme 3 · Le chemin de l'école",
      titre: "Où est le chat ?",
      question: `Le chemin va de la maison (0) à l'école (1).<br>Il est partagé en <b>4 parts égales</b>.<br><br>Le chat est au point <b>A</b>. Quelle fraction du chemin ?`,
      reponse: `Chaque part est un quart.<br>A est à 3 parts de la maison : ${frac(3, 4)}.<br><span class="big">3 quarts</span> du chemin.`,
      consigne: "Quelle fraction du chemin le chat a-t-il parcourue ?",
      verification: { type: "qcm", choix: ["1 quart", "3 quarts", "4 tiers"], bonne: 1 },
      dessin: chemin,
    },
    {
      tag: "Énigme 4 · La pizzeria",
      titre: "Plus qu'une pizza",
      question: `Les pizzas sont coupées en <b>quarts</b>.<br><br>Quelle quantité fait <b>plus qu'une pizza entière</b> ?`,
      reponse: `Une pizza entière = 4 quarts = ${frac(4, 4)}.<br>Plus que 4 quarts : <span class="big">5 quarts</span> (une pizza et un quart).`,
      consigne: "Quelle quantité fait plus qu'une pizza entière ?",
      verification: { type: "qcm", choix: ["3 quarts", "4 quarts", "5 quarts"], bonne: 2 },
      dessin: pizzas,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le tiers ou le cinquième ?",
      sorte: "piege",
      question: `Deux tartes sont pareilles.<br>On prend ${frac(1, 3)} de la première, ${frac(1, 5)} de la seconde.<br><br><b>Quelle part est la plus grosse</b> ?`,
      reponse: `Le piège : 5 est plus grand que 3.<br>Mais en 5 parts, chaque part est plus petite !<br><span class="big">1 tiers</span> est plus gros.`,
      consigne: "Quelle part est la plus grosse : 1 tiers ou 1 cinquième ?",
      verification: { type: "qcm", choix: ["1 cinquième", "pareil", "1 tiers"], bonne: 2 },
      dessin: tartes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bande coloriée",
      sorte: "defi",
      question: `Une bande a <b>12 carreaux</b>.<br>Léa colorie <b>un tiers</b> en bleu, puis <b>un quart</b> en rouge.<br><br>Combien de carreaux restent <b>blancs</b> ?`,
      reponse: `Un tiers de 12 : 12 ÷ 3 = 4. Un quart de 12 : 12 ÷ 4 = 3.<br>12 − 4 − 3 = <span class="big">5 carreaux</span> blancs.`,
      consigne: "Combien de carreaux restent blancs ?",
      verification: { type: "courte", attendus: ["5"], unite: "carreaux" },
      dessin: bandeau,
    },
  ],
};

export default problemes;
