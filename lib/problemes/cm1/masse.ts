// Énigmes à projeter — CM1, notion masses (le sac de farine en grammes, le
// colis de la poste, la masse d'une fraise, les trois pastèques, le piège des
// deux paquets, le défi des ananas et des oranges). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const farine = svg(
  "Un sac de farine de 3 kg",
  p("M150 90 L330 90 L350 330 L130 330 Z", C.craie, 4, 0.06) + t(240, 200, "FARINE", C.pale, 30) + t(240, 260, "3 kg", C.craie, 44) +
    t(240, 390, `en grammes${NB}?`, C.rose, 28)
);

const colis = svg(
  "Un colis : un livre de 450 g, une boîte de 300 g, un jeu de 750 g",
  r(140, 170, 200, 150, C.jaune, 0.2, 4, 6) + l(240, 170, 240, 320, C.jaune, 3) + t(240, 260, "📦", C.craie, 50) +
    t(90, 80, "📕 450 g", C.craie, 24) + t(240, 80, "🎁 300 g", C.craie, 24) + t(390, 80, "🎲 750 g", C.craie, 24) + t(240, 385, `le colis${NB}: ? g`, C.rose, 28)
);

const fraise = svg(
  "Une fraise : 20 quoi ?",
  t(240, 220, "🍓", C.craie, 150) + t(240, 340, "20 ?", C.rose, 40) + t(240, 395, `g${NB}? kg${NB}? t${NB}?`, C.pale, 24)
);

const pasteques = svg(
  "Trois pastèques : 1 050 g, 1 kg 30 g, 1 kg 200 g",
  [["A", "1 050 g"], ["B", "1 kg 30 g"], ["C", "1 kg 200 g"]].map(([n, m], i) =>
    `<ellipse cx="${90 + i * 150}" cy="170" rx="62" ry="48" fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="4"/>` + t(90 + i * 150, 180, n, C.craie, 30) + t(90 + i * 150, 260, m, C.craie, 22)).join("") +
    t(240, 360, `La plus lourde${NB}?`, C.rose, 28)
);

const paquets = svg(
  "Paquet A : 2 kg ; paquet B : 1 800 g",
  r(70, 130, 140, 130, C.rose, 0.2, 4, 8) + t(140, 190, "A", C.craie, 34) + t(140, 240, "2 kg", C.craie, 30) +
    r(270, 110, 160, 150, C.bleu, 0.2, 4, 8) + t(350, 180, "B", C.craie, 34) + t(350, 230, "1 800 g", C.craie, 30) +
    t(240, 350, `Le plus lourd${NB}?`, C.rose, 28)
);

// La balance : 2 ananas d'un côté, 6 oranges de l'autre.
const balance = svg(
  "Une balance en équilibre : 2 ananas d'un côté, 6 oranges de l'autre ; une orange pèse 200 g",
  l(240, 110, 240, 300, C.craie, 5) + l(160, 300, 320, 300, C.craie, 5) + l(60, 130, 420, 130, C.craie, 5) + o(240, 130, 8, C.craie, 0.5, 3) +
    p("M40 210 L180 210", C.pale, 5) + l(110, 130, 60, 210, C.pale, 2) + l(110, 130, 160, 210, C.pale, 2) + t(85, 200, "🍍", C.craie, 40) + t(135, 200, "🍍", C.craie, 40) +
    p("M300 210 L450 210", C.pale, 5) + l(375, 130, 310, 210, C.pale, 2) + l(375, 130, 440, 210, C.pale, 2) +
    [0, 1, 2, 3, 4, 5].map((i) => t(318 + (i % 3) * 38, 200 - Math.floor(i / 3) * 30, "🍊", C.craie, 28)).join("") +
    t(375, 260, "🍊 = 200 g", C.craie, 22) + t(240, 380, `un ananas${NB}: ? g`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "masse",
  titre: "Énigmes sur les masses",
  description: "Le sac de farine en grammes, le colis de la poste, la masse d'une fraise, les trois pastèques, le piège des deux paquets, le défi des ananas et des oranges sur la balance.",
  problemes: [
    {
      tag: "Énigme 1 · La pâtisserie",
      titre: "Le sac de farine",
      question: `Le pâtissier ouvre un sac de farine de <b>3 kg</b>.<br><br>Combien de <b>grammes</b> de farine ?`,
      reponse: `1 kg = 1 000 g.<br>3 kg = 3 × 1 000 = <span class="big">3 000 g</span>.`,
      consigne: "3 kg, c'est combien de grammes ?",
      verification: { type: "courte", attendus: ["3000"], unite: "g" },
      dessin: farine,
    },
    {
      tag: "Énigme 2 · À la poste",
      titre: "Le colis",
      question: `Dans le colis : un livre de <b>450 g</b>, une boîte de <b>300 g</b>, un jeu de <b>750 g</b>.<br><br>Combien pèse le colis, en <b>grammes</b> ?`,
      reponse: `450 + 300 = 750. 750 + 750 = 1 500.<br><span class="big">1 500 g</span>, soit 1 kg 500 g.`,
      consigne: "Combien pèse le colis, en grammes ?",
      verification: { type: "courte", attendus: ["1500"], unite: "g" },
      dessin: colis,
    },
    {
      tag: "Énigme 3 · Le panier de fruits",
      titre: "La masse d'une fraise",
      question: `Une fraise pèse environ <b>20…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `20 kg : un gros chien. 20 t : un camion plein !<br>Une fraise pèse environ <span class="big">20 g</span>.`,
      consigne: "Quelle est la masse d'une fraise ?",
      verification: { type: "qcm", choix: ["20 g", "20 kg", "20 t"], bonne: 0 },
      dessin: fraise,
    },
    {
      tag: "Énigme 4 · Le marché",
      titre: "Les trois pastèques",
      question: `Pastèque A : <b>1 050 g</b>.<br>Pastèque B : <b>1 kg 30 g</b>.<br>Pastèque C : <b>1 kg 200 g</b>.<br><br>Quelle est la <b>plus lourde</b> ?`,
      reponse: `Tout en grammes : A = 1 050 g, B = 1 030 g, C = 1 200 g.<br>La plus lourde : <span class="big">C, 1 kg 200 g</span>.`,
      consigne: "Quelle pastèque est la plus lourde ?",
      verification: { type: "qcm", choix: ["1 050 g", "1 kg 30 g", "1 kg 200 g"], bonne: 2 },
      dessin: pasteques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux paquets",
      sorte: "piege",
      question: `Le paquet A pèse <b>2 kg</b>.<br>Le paquet B pèse <b>1 800 g</b>.<br><br><b>Lequel est le plus lourd</b> ?`,
      reponse: `Le piège : 1 800 est plus grand que 2.<br>Mais les unités sont différentes ! 2 kg = 2 000 g.<br>2 000 g &gt; 1 800 g : <span class="big">le paquet A</span>.`,
      consigne: "Quel paquet est le plus lourd ?",
      verification: { type: "qcm", choix: ["Le paquet B", "Le paquet A", "Ils pèsent pareil"], bonne: 1 },
      dessin: paquets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Ananas et oranges",
      sorte: "defi",
      question: `La balance est en équilibre.<br>D'un côté, <b>2 ananas</b>. De l'autre, <b>6 oranges</b>.<br>Une orange pèse <b>200 g</b>.<br><br>Combien pèse <b>un ananas</b> ?`,
      reponse: `6 oranges : 6 × 200 = 1 200 g.<br>2 ananas pèsent 1 200 g. Un ananas : 1 200 ÷ 2 = <span class="big">600 g</span>.`,
      consigne: "Combien pèse un ananas, en grammes ?",
      verification: { type: "courte", attendus: ["600"], unite: "g" },
      dessin: balance,
    },
  ],
};

export default problemes;
