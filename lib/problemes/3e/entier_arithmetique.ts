// Énigmes à projeter — 3e, notion entier_arithmetique (diviseurs de 36,
// décomposition de 84, plus grand carreau = PGCD, fraction irréductible,
// piège de 91, défi des cigales 13 et 17 ans). 21/11/2026.
// ⛔ Ne reprend pas la 4e (bouquets, bus 51, phares, macarons).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

// 36 jetons rangés en rectangles : 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6.
const jetons = () => {
  let s = "";
  for (let i = 0; i < 4; i++) for (let j = 0; j < 9; j++) s += o(100 + 34 * j, 90 + 34 * i, 12, C.jaune, 0.5, 2);
  return svg("36 jetons rangés en 4 rangées de 9", s +
    t(240, 255, "4 × 9 = 36", C.craie, 28) + t(240, 300, "et 1 × 36, 2 × 18, 3 × 12…", C.pale, 22) + t(240, 370, `combien de diviseurs${NB}?`, C.rose, 26));
};

// L'arbre de 84.
const arbre = svg(
  "L'arbre de décomposition de 84 : 84 = 2 × 42, 42 = 2 × 21, 21 = 3 × 7",
  t(240, 70, "84", C.craie, 34) + l(225, 80, 160, 125, C.pale, 3) + l(255, 80, 320, 125, C.pale, 3) + t(150, 155, "2", C.rose, 30) + t(320, 155, "42", C.craie, 30) +
    l(305, 165, 250, 205, C.pale, 3) + l(335, 165, 390, 205, C.pale, 3) + t(245, 235, "2", C.rose, 30) + t(395, 235, "21", C.craie, 30) +
    l(380, 245, 330, 285, C.pale, 3) + l(410, 245, 450, 285, C.pale, 3) + t(325, 315, "3", C.rose, 30) + t(450, 315, "7", C.rose, 30) +
    t(170, 390, `84 = ?${NB}`, C.rose, 30)
);

// La pièce de 360 cm × 270 cm : 1 cm = 1 px ; carreaux de 90 cm en tirets.
const piece = () => {
  let s = r(100, 60, 360, 270, C.bleu, 0.12, 4);
  for (let i = 1; i < 4; i++) s += l(100 + 90 * i, 60, 100 + 90 * i, 330, C.bleu, 2, "8 8");
  for (let j = 1; j < 3; j++) s += l(100, 60 + 90 * j, 460, 60 + 90 * j, C.bleu, 2, "8 8");
  return svg("Une pièce de 360 cm sur 270 cm, avec des carreaux carrés en pointillés", s +
    t(280, 45, "360 cm", C.craie, 24) + t(90, 203, "270 cm", C.craie, 22, "end") + t(145, 115, "?", C.rose, 34) + t(280, 385, `le plus grand carreau${NB}?`, C.rose, 26));
};

// Les 126 élèves de 3e : 84 demi-pensionnaires (en barres : 1 élève = 3 px).
const cantine = svg(
  "126 élèves de 3e, dont 84 mangent à la cantine",
  r(51, 150, 378, 70, C.pale, 0.1, 3) + r(51, 150, 252, 70, C.jaune, 0.4, 3) + t(177, 195, "84 à la cantine", C.craie, 22) +
    t(240, 130, "126 élèves de 3e", C.craie, 24) + t(240, 360, `fraction irréductible${NB}?`, C.rose, 26)
);

// Le piège : 91.
const piege = svg(
  "Le nombre 91 : impair, il ne finit ni par 0 ni par 5",
  t(240, 200, "91", C.bleu, 110) + t(240, 280, "impair · pas dans la table de 3", C.pale, 20) + t(240, 340, `premier${NB}?`, C.rose, 32)
);

// Les cigales : deux frises de 13 et 17 ans.
const cigales = () => {
  let s = l(40, 150, 440, 150, C.pale, 2) + l(40, 280, 440, 280, C.pale, 2);
  // 221 ans sur 400 px : 1 an ≈ 1,81 px.
  for (let k = 0; k <= 17; k++) s += o(40 + 13 * k * (400 / 221), 150, 6, C.jaune, 1, 2);
  for (let k = 0; k <= 13; k++) s += o(40 + 17 * k * (400 / 221), 280, 6, C.bleu, 1, 2);
  return svg("Deux frises : les cigales de 13 ans et celles de 17 ans sortent ensemble en 2026, puis de nouveau plus tard", s +
    t(52, 120, "cigales de 13 ans", C.jaune, 20, "start") + t(52, 250, "cigales de 17 ans", C.bleu, 20, "start") +
    t(40, 330, "2026", C.craie, 20) + t(440, 330, "?", C.rose, 30) + l(440, 135, 440, 295, C.rose, 3, "6 6") + l(40, 135, 40, 295, C.craie, 3, "6 6") +
    t(240, 395, "frise au bon rapport", C.pale, 18));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "entier_arithmetique",
  titre: "Énigmes des multiples et diviseurs",
  description: "Les jetons de 36, l'arbre de 84, le plus grand carreau de la pièce, la cantine en fraction irréductible, le piège de 91, le défi des cigales qui sortent ensemble : diviseurs, nombres premiers, décomposition, PGCD et fraction irréductible.",
  problemes: [
    {
      tag: "Énigme 1 · Les diviseurs",
      titre: "Les jetons de 36",
      question: `On veut ranger <b>36 jetons</b> en rectangle, toutes les rangées pleines.<br><br><b>Combien de diviseurs</b> a le nombre 36 ?`,
      reponse: `On les cherche par paires : 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6.<br>Diviseurs : 1, 2, 3, 4, 6, 9, 12, 18, 36. Il y en a <span class="big">9</span>.<br>6 × 6 ne compte qu'une fois : c'est pour ça que le nombre est impair.`,
      consigne: "Combien de diviseurs a 36 ?",
      verification: {"type":"courte","attendus":["9"],"unite":"diviseurs"},
      dessin: jetons(),
    },
    {
      tag: "Énigme 2 · Décomposer",
      titre: "L'arbre de 84",
      question: `Voici trois écritures égales à 84 :<br>2 × 42 · 4 × 21 · 2² × 3 × 7<br><br>Laquelle est la <b>décomposition en produit de facteurs premiers</b> ?`,
      reponse: `Un facteur premier n'a que deux diviseurs : 1 et lui-même. 42, 4 et 21 ne sont pas premiers.<br>La décomposition est <span class="big">84 = 2² × 3 × 7</span> : on ne peut plus rien casser.`,
      consigne: "Quelle est la décomposition de 84 en facteurs premiers ?",
      verification: {"type":"qcm","choix":["2² × 3 × 7","2 × 42","4 × 21"],"bonne":0},
      dessin: arbre,
    },
    {
      tag: "Énigme 3 · Le carreleur",
      titre: "Le plus grand carreau",
      question: `Une pièce mesure <b>360 cm sur 270 cm</b>. Le carreleur veut des carreaux <b>carrés</b>, tous pareils, <b>sans aucune découpe</b>, et les plus grands possible.<br><br><b>Quel est le côté</b> d'un carreau ?`,
      reponse: `Le côté doit diviser 360 et 270 : on cherche leur <b>plus grand diviseur commun</b>.<br>360 = 2³ × 3² × 5 et 270 = 2 × 3³ × 5, donc PGCD = 2 × 3² × 5 = <span class="big">90 cm</span>.<br>Il pose 4 × 3 = 12 carreaux.`,
      consigne: "Quel est le côté du plus grand carreau possible ?",
      verification: {"type":"courte","attendus":["90"],"unite":"cm"},
      dessin: piece(),
    },
    {
      tag: "Énigme 4 · La cantine",
      titre: "Une fraction irréductible",
      question: `Dans un collège, <b>84</b> des <b>126</b> élèves de 3e mangent à la cantine.<br><br>Écris cette proportion sous forme de <b>fraction irréductible</b>.`,
      reponse: `84 = 2² × 3 × 7 et 126 = 2 × 3² × 7. Leur PGCD est 2 × 3 × 7 = 42.<br>84 ÷ 42 = 2 et 126 ÷ 42 = 3 : la fraction vaut <span class="big">2/3</span>.<br>Deux élèves de 3e sur trois mangent à la cantine.`,
      consigne: "Quelle est la fraction irréductible égale à 84/126 ?",
      verification: {"type":"courte","attendus":["2/3"]},
      dessin: cantine,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Il a l'air premier…",
      sorte: "piege",
      question: `Lina dit : « 91 est impair, il n'est pas dans la table de 3 ni dans celle de 5. Donc il est premier. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Il faut tester tous les nombres premiers jusqu'à √91 ≈ 9,5 : 2, 3, 5 et <b>7</b>.<br>91 ÷ 7 = 13. Donc <span class="big">91 = 7 × 13</span> : il n'est pas premier.`,
      consigne: "91 est-il un nombre premier ?",
      verification: {"type":"qcm","choix":["Oui, 91 est premier","Non, car 91 est pair","Non, car 91 = 7 × 13"],"bonne":2},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les cigales",
      sorte: "defi",
      question: `En Amérique, certaines cigales vivent sous terre et sortent <b>tous les 13 ans</b>. D'autres sortent <b>tous les 17 ans</b>.<br>Imaginons que les deux sortent ensemble en <b>2026</b>.<br><br>En <b>quelle année</b> sortiront-elles de nouveau ensemble ?`,
      reponse: `On cherche le plus petit multiple commun de 13 et 17. Ils sont premiers, donc c'est 13 × 17 = 221 ans.<br>2026 + 221 = <span class="big">2247</span>.<br>Des cycles premiers évitent de croiser trop souvent les autres espèces : c'est une ruse de la nature !`,
      consigne: "En quelle année sortiront-elles de nouveau ensemble ?",
      verification: {"type":"courte","attendus":["2247"]},
      dessin: cigales(),
    },
  ],
};

export default problemes;
