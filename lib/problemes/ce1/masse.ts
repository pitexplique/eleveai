// Énigmes à projeter — CE1, notion masses (la plume, la poupée et la
// voiture en cubes, le cartable, les deux paquets de pâtes, le piège du
// ballon et de la boule de pétanque, le défi de l'ananas en kiwis). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, p } from "../dessins-ecole";

/** Une balance à deux plateaux ; penche = +1 : le plateau gauche descend. */
type Charge = (x: number, y: number) => string;
const balance = (cx: number, cy: number, larg: number, penche: number, gauche: Charge, droite: Charge, pw = 50) => {
  const d = penche * 18;
  const xg = cx - larg / 2, xd = cx + larg / 2, yg = cy + d - 16, yd = cy - d - 16;
  return l(cx, cy, cx, cy + 110, C.craie, 5) + l(cx - 45, cy + 110, cx + 45, cy + 110, C.craie, 5) + l(xg, yg + 16, xd, yd + 16, C.craie, 5) + o(cx, cy, 6, C.craie, 0.5, 3) +
    l(xg, yg + 16, xg, yg, C.pale, 4) + l(xd, yd + 16, xd, yd, C.pale, 4) +
    p(`M${xg - pw} ${yg} L${xg + pw} ${yg}`, C.pale, 5) + p(`M${xd - pw} ${yd} L${xd + pw} ${yd}`, C.pale, 5) +
    gauche(xg, yg - 3) + droite(xd, yd - 3);
};
const cubes = (n: number): Charge => (x, y) => [...Array(n)].map((_, i) => r(x - 36 + (i % 3) * 24, y - 22 - Math.floor(i / 3) * 24, 22, 22, C.bleu, 0.4, 2)).join("");
const emo = (e: string, taille = 50): Charge => (x, y) => t(x, y - 6, e, C.craie, taille);

const plume = svg(
  "Une plume ; elle pèse environ 1 quoi ?",
  t(240, 220, "🪶", C.craie, 140) + t(240, 330, "1 ?", C.rose, 40) + t(240, 390, `g${NB}? kg${NB}? m${NB}?`, C.pale, 26)
);

const jouets = svg(
  "Balance 1 : la poupée et 6 cubes en équilibre. Balance 2 : la voiture et 4 cubes en équilibre",
  t(120, 60, "1", C.jaune, 26) + balance(120, 170, 150, 0, emo("🪆", 44), cubes(6), 40) +
    t(360, 60, "2", C.jaune, 26) + balance(360, 170, 150, 0, emo("🚗", 44), cubes(4), 40) +
    t(240, 380, `Combien de cubes de plus${NB}?`, C.rose, 28)
);

const cartable = svg(
  "Une trousse de 300 g et un livre de 500 g",
  r(50, 150, 160, 70, C.jaune, 0.3, 4, 30) + t(130, 195, "300 g", C.craie, 28) +
    r(280, 100, 140, 170, C.bleu, 0.25, 4, 6) + t(350, 195, "500 g", C.craie, 28) +
    t(240, 350, `Les deux ensemble${NB}?`, C.rose, 30)
);

const paquet = (x: number) => r(x - 70, 110, 140, 170, C.jaune, 0.25, 4, 8) + t(x, 185, "🍝", C.craie, 44) + t(x, 245, "500 g", C.craie, 28);
const pates = svg(
  "Deux paquets de pâtes de 500 g",
  paquet(140) + paquet(340) + t(240, 360, `Les deux paquets${NB}?`, C.rose, 30)
);

const piege = svg(
  "Une balance : un gros ballon monte, une petite boule de pétanque descend",
  balance(240, 195, 260, -1, (x, y) => o(x, y - 50, 50, C.rose, 0.25, 3), (x, y) => o(x, y - 18, 18, C.craie, 0.6, 3), 60) +
    t(110, 345, "ballon", C.rose, 24) + t(370, 345, "boule", C.craie, 24) +
    t(240, 395, `Le plus lourd${NB}?`, C.rose, 30)
);

const ananas = svg(
  "Balance 1 : 1 ananas = 2 mangues. Balance 2 : 1 mangue = 3 kiwis",
  t(120, 60, "1", C.jaune, 26) + balance(120, 170, 150, 0, emo("🍍", 44), (x, y) => t(x - 14, y - 6, "🥭", C.craie, 30) + t(x + 16, y - 6, "🥭", C.craie, 30), 40) +
    t(360, 60, "2", C.jaune, 26) + balance(360, 170, 150, 0, emo("🥭", 36), (x, y) => [-24, 0, 24].map((d) => t(x + d, y - 6, "🥝", C.craie, 24)).join(""), 40) +
    t(240, 380, `1 ananas = ? kiwis`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "masse",
  titre: "Énigmes sur les masses",
  description: "La masse d'une plume, la poupée et la voiture pesées en cubes, la trousse et le livre, les deux paquets de pâtes, le piège du ballon et de la boule de pétanque, le défi de l'ananas en kiwis.",
  problemes: [
    {
      tag: "Énigme 1 · L'oiseau",
      titre: "La plume",
      question: `Une plume pèse environ <b>1…</b><br><br>Quelle est la bonne unité ?`,
      reponse: `1 kg : c'est un paquet de sucre !<br>1 m : c'est une longueur, pas une masse.<br>Une plume pèse environ <span class="big">1 g</span>, et souvent moins !`,
      consigne: "Une plume pèse environ 1… ?",
      verification: { type: "qcm", choix: ["1 g", "1 kg", "1 m"], bonne: 0 },
      dessin: plume,
    },
    {
      tag: "Énigme 2 · La salle de jeux",
      titre: "La poupée et la voiture",
      question: `La poupée pèse comme <b>6 cubes</b>.<br>La voiture pèse comme <b>4 cubes</b>.<br><br>La poupée pèse combien de cubes de plus ?`,
      reponse: `6 − 4 = 2.<br>La poupée pèse <span class="big">2 cubes</span> de plus.`,
      consigne: "Combien de cubes de plus pour la poupée ?",
      verification: { type: "courte", attendus: ["2"], unite: "cubes" },
      dessin: jouets,
    },
    {
      tag: "Énigme 3 · Le cartable",
      titre: "Trousse et livre",
      question: `La trousse pèse <b>300 g</b>.<br>Le livre pèse <b>500 g</b>.<br><br>Combien pèsent-ils ensemble ?`,
      reponse: `On ajoute.<br>300 + 500 = <span class="big">800 g</span>.`,
      consigne: "Combien pèsent la trousse et le livre ensemble ?",
      verification: { type: "courte", attendus: ["800"], unite: "g" },
      dessin: cartable,
    },
    {
      tag: "Énigme 4 · Les courses",
      titre: "Les pâtes",
      question: `Deux paquets de pâtes.<br><b>500 g</b> chacun.<br><br>Combien pèsent les deux paquets ?`,
      reponse: `500 + 500 = 1 000 g.<br>1 000 g, c'est <span class="big">1 kg</span>.`,
      consigne: "Combien pèsent les deux paquets ?",
      verification: { type: "qcm", choix: ["10 kg", "1 kg", "100 g"], bonne: 1 },
      dessin: pates,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ballon et la boule",
      sorte: "piege",
      question: `Sur la balance : un <b>gros ballon</b> et une <b>petite boule</b> de pétanque.<br>La boule descend.<br><br>Lequel est le plus lourd ?`,
      reponse: `Le piège : le ballon est plus gros.<br>Mais le plateau qui descend porte le plus lourd.<br>Le plus lourd : <span class="big">la boule</span>.`,
      consigne: "Lequel est le plus lourd ?",
      verification: { type: "qcm", choix: ["Le ballon", "Ils pèsent pareil", "La boule"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'ananas et les kiwis",
      sorte: "defi",
      question: `<b>1 ananas</b> pèse comme <b>2 mangues</b>.<br><b>1 mangue</b> pèse comme <b>3 kiwis</b>.<br><br>1 ananas pèse comme combien de kiwis ?`,
      reponse: `On remplace chaque mangue par 3 kiwis.<br>3 + 3 = 6.<br>1 ananas = <span class="big">6 kiwis</span>.`,
      consigne: "1 ananas pèse comme combien de kiwis ?",
      verification: { type: "courte", attendus: ["6"], unite: "kiwis" },
      dessin: ananas,
    },
  ],
};

export default problemes;
