// Énigmes à projeter — 3e, notion sym_transformation (homothéties : rapport
// 2, rapport −1, le vidéoprojecteur, l'aire du motif agrandi, piège du
// rapport −2, défi des deux homothéties qui s'annulent). 21/11/2026.
// ⛔ La 4e a déjà la symétrie, la translation et la rotation (ambulance,
// drone, horloge, moulin) : ici, surtout l'homothétie, nouvelle en 3e.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p } from "../dessins-ecole";
import { type P, poly, pt, seg } from "../dessins-3e";

const homo = (O: P, k: number, q: P): P => [Math.round((O[0] + k * (q[0] - O[0])) * 10) / 10, Math.round((O[1] + k * (q[1] - O[1])) * 10) / 10];

// O, A, A' : OA = 3 cm, 1 cm = 60 px.
const rapport2 = () => {
  const O: P = [60, 300], A: P = [60 + 180 * 0.8, 300 - 180 * 0.6], A2 = homo(O, 2, A);
  return svg("L'homothétie de centre O et de rapport 2 : le point A et son image A'",
    seg(O, A2, C.pale, 2, "8 6") + seg(O, A, C.bleu, 5) + pt(O, "O", -16, 24) + pt(A, "A", -4, -16, C.bleu) + pt(A2, "A'", 18, -8, C.rose) +
      t(110, 245, "3 cm", C.bleu, 22, "end").replace('x="110"', 'x="128"') + t(380, 330, "rapport k = 2", C.craie, 24) + t(380, 370, `OA'${NB}?`, C.rose, 26) +
      t(240, 405, "au bon rapport", C.pale, 16));
};

// Le drapeau et son image par l'homothétie de centre O, rapport −1.
const rapportMoins1 = () => {
  const O: P = [240, 210];
  const F: P[] = [[300, 260], [300, 130], [380, 155], [300, 180]];
  return svg("Un fanion et son image par l'homothétie de centre O et de rapport moins 1",
    poly(F, C.bleu, 4, 0.25) + poly(F.map((q) => homo(O, -1, q)), C.rose, 4, 0.25) + F.map((q) => seg(q, homo(O, -1, q), C.pale, 1.5, "4 6")).join("") +
      pt(O, "O", -18, -8) + t(240, 380, `rapport −1${NB}: c'est quoi${NB}?`, C.rose, 24));
};

// Le vidéoprojecteur : écran à 3 m (1,5 m de large) puis à 4 m ; 1 m = 80 px.
const projecteur = () => {
  const O: P = [50, 210];
  const h1 = 0.75 * 80, h2 = 1 * 80;
  return svg("Un vidéoprojecteur : à 3 m, l'image fait 1,5 m de large ; on recule l'écran à 4 m",
    p("M30 195 l30 0 l0 30 l-30 0 Z", C.craie, 3, 0.3) + l(O[0], O[1], 370, 210 - h2, C.jaune, 2, "6 5") + l(O[0], O[1], 370, 210 + h2, C.jaune, 2, "6 5") +
      l(290, 210 - h1, 290, 210 + h1, C.bleu, 6) + l(370, 210 - h2, 370, 210 + h2, C.rose, 6) +
      t(290, 120, "3 m", C.bleu, 20) + t(290, 300, "1,5 m", C.bleu, 20) + t(370, 105, "4 m", C.rose, 20) + t(410, 215, "?", C.rose, 34) +
      t(240, 380, "distances mesurées depuis la lampe", C.pale, 16) + t(240, 405, "au bon rapport", C.pale, 16));
};

// Le motif de mosaïque : losange, puis son image de rapport 3.
const mosaique = () => {
  const O: P = [70, 330];
  const M: P[] = [[100, 300], [130, 290], [120, 320], [90, 330]].map(([x, y]) => [x, y] as P);
  return svg("Un petit motif de mosaïque de 5 cm² et son agrandissement de rapport 3",
    poly(M, C.jaune, 3, 0.5) + poly(M.map((q) => homo(O, 3, q)), C.jaune, 4, 0.2) + M.map((q) => seg(O, homo(O, 3, q), C.pale, 1.5, "4 6")).join("") + pt(O, "O", -16, 20) +
      t(140, 345, "5 cm²", C.craie, 20, "start").replace('x="140"', 'x="128"') + t(330, 130, "k = 3", C.craie, 26) + t(330, 180, `aire${NB}?`, C.rose, 28));
};

// Rapport −2 : [AB] de 4 cm et son image, 1 cm = 20 px.
const piege = () => {
  const O: P = [250, 170], A: P = [290, 130], B: P = [290 + 48, 130 + 64];
  const A2 = homo(O, -2, A), B2 = homo(O, -2, B);
  return svg("Le segment AB de 4 cm et son image A'B' par l'homothétie de centre O et de rapport moins 2",
    seg(A, B, C.bleu, 5) + seg(A2, B2, C.rose, 5) + seg(A, A2, C.pale, 1.5, "4 6") + seg(B, B2, C.pale, 1.5, "4 6") +
      pt(O, "O", 16, 24) + pt(A, "A", -14, -10, C.bleu) + pt(B, "B", 16, -10, C.bleu) + pt(A2, "A'", -18, 22, C.rose) + pt(B2, "B'", -22, 8, C.rose) +
      t(300, 60, "AB = 4 cm", C.bleu, 22) + t(300, 380, "k = −2", C.craie, 24) + t(140, 380, `A'B'${NB}?`, C.rose, 26));
};

// Deux homothéties de centre O : −2 puis −0,5.
const defi = () => {
  const O: P = [240, 220];
  const T: P[] = [[270, 190], [310, 190], [270, 150]];
  const T1 = T.map((q) => homo(O, -2, q));
  return svg("Un triangle bleu, son image par l'homothétie de rapport moins 2, puis l'image de cette image par l'homothétie de rapport moins 0,5",
    poly(T, C.bleu, 4, 0.35) + poly(T1, C.jaune, 4, 0.15).replace("/>", ' stroke-dasharray="10 6"/>') + pt(O, "O", -18, -6) +
      t(240, 40, "1) rapport −2 → jaune", C.jaune, 20) + t(240, 380, `2) rapport −0,5 → où${NB}?`, C.rose, 22));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "sym_transformation",
  titre: "Énigmes des transformations",
  description: "Le point et son image de rapport 2, le fanion de rapport −1, le vidéoprojecteur, le motif de mosaïque agrandi, le piège du rapport −2, le défi des deux homothéties qui s'annulent : l'homothétie, ses longueurs et ses aires.",
  problemes: [
    {
      tag: "Énigme 1 · Rapport 2",
      titre: "Le point image",
      question: `A' est l'image de A par l'homothétie de centre O et de rapport <b>2</b>. On sait que <b>OA = 3 cm</b>.<br><br><b>Combien mesure</b> OA' ?`,
      reponse: `Rapport 2 positif : A' est sur la demi-droite [OA), deux fois plus loin de O.<br>OA' = 2 × 3 = <span class="big">6 cm</span>.`,
      consigne: "Combien mesure OA' ?",
      verification: {"type":"courte","attendus":["6"],"unite":"cm"},
      dessin: rapport2(),
    },
    {
      tag: "Énigme 2 · Rapport −1",
      titre: "Une vieille connaissance",
      question: `Le fanion bleu a pour image le fanion rose par l'homothétie de centre O et de rapport <b>−1</b>.<br><br>Cette transformation, tu la connais déjà sous un autre nom. <b>Lequel</b> ?`,
      reponse: `Rapport −1 : chaque point part de l'autre côté de O, à la même distance.<br>C'est la <span class="big">symétrie centrale</span> de centre O : la figure fait un demi-tour.`,
      consigne: "L'homothétie de rapport −1, c'est quelle transformation ?",
      verification: {"type":"qcm","choix":["Une symétrie centrale","Une translation","Une symétrie axiale"],"bonne":0},
      dessin: rapportMoins1(),
    },
    {
      tag: "Énigme 3 · Le vidéoprojecteur",
      titre: "Reculer l'écran",
      question: `La lampe d'un vidéoprojecteur est à <b>3 m</b> de l'écran : l'image fait <b>1,5 m</b> de large. On recule l'écran à <b>4 m</b> de la lampe.<br><br><b>Quelle est</b> la nouvelle largeur de l'image ?`,
      reponse: `L'image à 4 m est l'agrandissement de l'image à 3 m par l'homothétie de centre la lampe et de rapport 4 ÷ 3.<br>Largeur : 1,5 × 4 ÷ 3 = <span class="big">2 m</span>.`,
      consigne: "Quelle est la largeur de l'image à 4 m ?",
      verification: {"type":"courte","attendus":["2"],"unite":"m"},
      dessin: projecteur(),
    },
    {
      tag: "Énigme 4 · La mosaïque",
      titre: "Le motif agrandi",
      question: `Un petit motif de mosaïque a une aire de <b>5 cm²</b>. On l'agrandit par une homothétie de rapport <b>3</b>.<br><br><b>Quelle est</b> l'aire du grand motif ?`,
      reponse: `Les longueurs sont multipliées par 3, donc les aires par 3² = 9.<br>Aire : 5 × 9 = <span class="big">45 cm²</span>, et pas 15 cm² !`,
      consigne: "Quelle est l'aire du motif agrandi ?",
      verification: {"type":"courte","attendus":["45"],"unite":"cm²"},
      dessin: mosaique(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Une longueur négative ?",
      sorte: "piege",
      question: `[A'B'] est l'image de [AB] par l'homothétie de centre O et de rapport <b>−2</b>. On sait que <b>AB = 4 cm</b>.<br><br><b>Combien mesure</b> A'B' ?`,
      reponse: `Le signe moins dit seulement que l'image passe <b>de l'autre côté</b> de O. Une longueur n'est jamais négative !<br>A'B' = 2 × 4 = <span class="big">8 cm</span>.`,
      consigne: "Combien mesure A'B' ?",
      verification: {"type":"qcm","choix":["−8 cm","8 cm","2 cm"],"bonne":1},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Aller-retour",
      sorte: "defi",
      question: `On applique au triangle bleu l'homothétie de centre O et de rapport <b>−2</b> : il devient le triangle jaune.<br>Puis on applique au triangle jaune l'homothétie de même centre O et de rapport <b>−0,5</b>.<br><br><b>Où arrive</b> le triangle ?`,
      reponse: `Les rapports se multiplient : (−2) × (−0,5) = 1.<br>Une homothétie de rapport 1 ne bouge rien : <span class="big">le triangle revient exactement à sa place</span>.`,
      consigne: "Où arrive le triangle après les deux homothéties ?",
      verification: {"type":"qcm","choix":["Il est symétrique du bleu par rapport à O","Il est deux fois plus petit que le bleu","Il revient exactement à sa place"],"bonne":2},
      dessin: defi(),
    },
  ],
};

export default problemes;
