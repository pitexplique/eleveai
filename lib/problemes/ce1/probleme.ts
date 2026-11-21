// Énigmes à projeter — CE1, notion problèmes (le manège, les bouquets de 10
// fleurs, l'âge de Papa et de Nina, les livres prêtés et rendus, le piège de
// Léo dans la file, le défi des vélos et des tricycles). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, p, l } from "../dessins-ecole";

const manege = svg(
  "Un manège avec 14 enfants ; 6 enfants arrivent",
  p("M120 120 L240 60 L360 120 Z", C.rose, 4, 0.25) + l(135, 120, 135, 250, C.craie, 4) + l(345, 120, 345, 250, C.craie, 4) + r(110, 250, 260, 30, C.jaune, 0.3, 4, 10) +
    t(240, 200, "14 enfants", C.craie, 28) + t(420, 200, "+ 6", C.bleu, 34) +
    t(240, 360, `Combien d'enfants${NB}?`, C.rose, 30)
);

const bouquet = (x: number) => [0, 1, 2].map((k) => t(x - 22 + k * 22, 160, "🌷", C.craie, 32)).join("") + p(`M${x - 30} 175 L${x} 250 L${x + 30} 175 Z`, C.jaune, 3, 0.3) + t(x, 290, "10", C.craie, 26);
const fleurs = svg(
  "Trois bouquets de 10 fleurs",
  bouquet(110) + bouquet(240) + bouquet(370) + t(240, 370, `Combien de fleurs${NB}?`, C.rose, 30)
);

const ages = svg(
  "Papa a 35 ans, Nina a 7 ans",
  t(150, 190, "👨", C.craie, 110) + t(150, 270, "35 ans", C.craie, 28) + t(330, 210, "👧", C.craie, 70) + t(330, 270, "7 ans", C.craie, 28) +
    t(240, 360, `Combien d'années d'écart${NB}?`, C.rose, 28)
);

const livres = svg(
  "La bibliothèque : 40 livres ; 12 prêtés ; 5 rendus",
  r(40, 90, 160, 180, C.bleu, 0.1, 4, 6) + [0, 1, 2].map((k) => l(40, 150 + k * 60, 200, 150 + k * 60, C.bleu, 3)).join("") + t(120, 135, "40 📚", C.craie, 30) +
    t(330, 140, "− 12 prêtés", C.rose, 28) + t(330, 210, "+ 5 rendus", C.jaune, 28) +
    t(240, 350, `Combien de livres${NB}?`, C.rose, 30)
);

const file = svg(
  "Une file de 5 enfants ; Léo est le 3e",
  [0, 1, 2, 3, 4].map((i) => o(80 + i * 80, 170, 26, i === 2 ? C.rose : C.bleu, 0.4, 3) + t(80 + i * 80, 240, i + 1, C.pale, 22)).join("") +
    t(240, 120, "Léo", C.rose, 26) +t(60, 300, "← devant", C.pale, 22, "start") +
    t(240, 370, `Combien derrière Léo${NB}?`, C.rose, 30)
);

const vehicules = svg(
  "Trois véhicules cachés sous des draps ; 8 roues en tout",
  [0, 1, 2].map((i) => p(`M${60 + i * 130} 240 Q${70 + i * 130} 130 ${115 + i * 130} 125 Q${160 + i * 130} 130 ${170 + i * 130} 240 Z`, C.pale, 4, 0.2) + t(115 + i * 130, 200, "?", C.craie, 40)).join("") +
    t(240, 300, "🚲 2 roues   ·   tricycle 3 roues", C.pale, 22) + t(240, 360, "8 roues en tout", C.craie, 28) + t(240, 405, `Combien de tricycles${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "probleme",
  titre: "Énigmes : des problèmes à résoudre",
  description: "Le manège, les bouquets de 10 fleurs, l'âge de Papa et de Nina, les livres prêtés et rendus, le piège de Léo dans la file, le défi des vélos et des tricycles.",
  problemes: [
    {
      tag: "Énigme 1 · La fête foraine",
      titre: "Le manège",
      question: `Il y a <b>14 enfants</b> sur le manège.<br><b>6 enfants</b> montent encore.<br><br>Combien d'enfants ?`,
      reponse: `On ajoute.<br>14 + 6 = <span class="big">20 enfants</span>.`,
      consigne: "Combien d'enfants sur le manège ?",
      verification: { type: "courte", attendus: ["20"], unite: "enfants" },
      dessin: manege,
    },
    {
      tag: "Énigme 2 · Le fleuriste",
      titre: "Les bouquets",
      question: `Le fleuriste fait <b>3 bouquets</b>.<br><b>10 fleurs</b> par bouquet.<br><br>Combien de fleurs ?`,
      reponse: `10 + 10 + 10 = 30.<br>3 × 10 = <span class="big">30 fleurs</span>.`,
      consigne: "Combien de fleurs en tout ?",
      verification: { type: "courte", attendus: ["30"], unite: "fleurs" },
      dessin: fleurs,
    },
    {
      tag: "Énigme 3 · L'anniversaire",
      titre: "Papa et Nina",
      question: `Papa a <b>35 ans</b>.<br>Nina a <b>7 ans</b>.<br><br>Combien d'années de plus a Papa ?`,
      reponse: `On cherche l'écart : 35 − 7.<br>De 7 à 10 : 3. De 10 à 35 : 25.<br>3 + 25 = <span class="big">28 ans</span>.`,
      consigne: "Combien d'années de plus a Papa ?",
      verification: { type: "qcm", choix: ["42", "28", "32"], bonne: 1 },
      dessin: ages,
    },
    {
      tag: "Énigme 4 · La bibliothèque",
      titre: "Les livres",
      question: `Il y a <b>40 livres</b>.<br>On en prête <b>12</b>.<br>Puis on en rend <b>5</b>.<br><br>Combien de livres ?`,
      reponse: `D'abord : 40 − 12 = 28.<br>Puis : 28 + 5 = <span class="big">33 livres</span>.`,
      consigne: "Combien de livres à la fin ?",
      verification: { type: "courte", attendus: ["33"], unite: "livres" },
      dessin: livres,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La file",
      sorte: "piege",
      question: `<b>5 enfants</b> font la queue.<br>Léo est le <b>3<sup>e</sup></b>.<br><br>Combien d'enfants derrière lui ?`,
      reponse: `Le piège : il est 3<sup>e</sup>, on dit « 3 ».<br>Mais on compte ceux d'après : le 4<sup>e</sup> et le 5<sup>e</sup>.<br><span class="big">2 enfants</span>.`,
      consigne: "Combien d'enfants derrière Léo ?",
      verification: { type: "qcm", choix: ["3", "5", "2"], bonne: 2 },
      dessin: file,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Vélos et tricycles",
      sorte: "defi",
      question: `<b>3 véhicules</b> : des vélos et des tricycles.<br>Un vélo : 2 roues. Un tricycle : 3 roues.<br>En tout : <b>8 roues</b>.<br><br>Combien de tricycles ?`,
      reponse: `3 vélos : 6 roues. Il manque 2 roues.<br>Un tricycle a 1 roue de plus qu'un vélo.<br>1 vélo et 2 tricycles : 2 + 3 + 3 = 8.<br><span class="big">2 tricycles</span>.`,
      consigne: "Combien de tricycles ?",
      verification: { type: "courte", attendus: ["2"], unite: "tricycles" },
      dessin: vehicules,
    },
  ],
};

export default problemes;
