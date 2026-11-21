// Énigmes à projeter — 3e, notion stat_classes (séries regroupées en
// classes : les trajets à classer, le temps d'écran, les colis de la poste,
// l'histogramme des tailles, piège de l'étendue perdue, défi de l'effectif
// effacé). 21/11/2026. Notion demandée hors de France (en France, seul le
// regroupement reste visible).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const tableau = (x: number, y: number, w: number[], h: number, lignes: string[][], taille = 22, rose: [number, number][] = []) => {
  let s = "", yy = y;
  lignes.forEach((lg, i) => {
    let xx = x;
    lg.forEach((cel, j) => {
      const ro = rose.some(([a, b]) => a === i && b === j);
      s += r(xx, yy, w[j], h, j === 0 ? C.bleu : C.craie, j === 0 ? 0.15 : 0, 2) + t(xx + w[j] / 2, yy + h / 2 + taille * 0.35, cel, ro ? C.rose : j === 0 ? C.bleu : C.craie, taille);
      xx += w[j];
    });
    yy += h;
  });
  return s;
};

const vals = [5, 12, 18, 25, 9, 14, 31, 20, 11, 7, 16, 22];
const trajets = svg(
  "Les durées de trajet de 12 élèves, en minutes : 5, 12, 18, 25, 9, 14, 31, 20, 11, 7, 16, 22",
  vals.map((v, i) => r(52 + (i % 4) * 98, 60 + Math.floor(i / 4) * 80, 80, 56, C.jaune, 0.25, 3, 10) + t(92 + (i % 4) * 98, 98 + Math.floor(i / 4) * 80, v, C.craie, 26)).join("") +
    t(240, 330, "durées en minutes", C.pale, 18) + t(240, 380, `dans la classe [10${NB}; 20[${NB}?`, C.rose, 28)
);

const ecran = svg(
  "Temps d'écran par jour de 20 élèves : de 0 à 2 h : 6 élèves, de 2 à 4 h : 10, de 4 à 6 h : 4",
  tableau(22, 90, [150, 95, 95, 95], 64, [["Durée (h)", "[0 ; 2[", "[2 ; 4[", "[4 ; 6["], ["Effectif", "6", "10", "4"]], 20) +
    t(240, 280, "20 élèves", C.craie, 24) + t(240, 340, `moyenne${NB}?`, C.rose, 30)
);

const colis = svg(
  "Les masses de 40 colis : de 0 à 1 kg : 12, de 1 à 2 kg : 15, de 2 à 5 kg : 9, de 5 à 10 kg : 4",
  tableau(30, 90, [140, 75, 75, 75, 80], 64, [["Masse (kg)", "[0 ; 1[", "[1 ; 2[", "[2 ; 5[", "[5 ; 10["], ["Effectif", "12", "15", "9", "4"]], 19) +
    t(240, 280, "40 colis", C.craie, 24) + t(240, 340, `classe médiane${NB}?`, C.rose, 30)
);

// Histogramme : effectifs 5, 11, 7, 2 ; 1 élève = 22 px.
const effT = [5, 11, 7, 2];
const tailles = svg(
  "Histogramme des tailles de 25 élèves : de 140 à 150 cm : 5, de 150 à 160 : 11, de 160 à 170 : 7, de 170 à 180 : 2",
  effT.map((e, i) => r(80 + i * 85, 330 - e * 22, 85, e * 22, i < 2 ? C.bleu : C.jaune, 0.35, 3) + t(122 + i * 85, 322 - e * 22, e, C.craie, 20)).join("") +
    l(70, 330, 430, 330, C.craie, 3) + l(80, 330, 80, 70, C.craie, 3) + [140, 150, 160, 170, 180].map((v, i) => t(80 + i * 85, 356, v, C.craie, 18)).join("") +
    t(255, 385, "taille (cm)", C.craie, 18) + t(240, 412, `moins de 160 cm${NB}: quel pourcentage${NB}?`, C.rose, 20)
);

const etendue = svg(
  "Durées de 30 appels téléphoniques, en minutes, regroupées de 0 à 50 par classes de 10",
  tableau(10, 100, [90, 74, 74, 74, 74, 74], 64, [["Durée", "[0;10[", "[10;20[", "[20;30[", "[30;40[", "[40;50["], ["Effectif", "9", "11", "6", "3", "1"]], 17) +
    t(240, 270, "Lina : « étendue = 50 − 0 = 50 min »", C.bleu, 22).replace(" :", `${NB}:`).replace("« ", `«${NB}`).replace(" »", `${NB}»`) +
    t(240, 330, `sûr${NB}?`, C.rose, 30)
);

const efface = svg(
  "Les minutes de lecture par jour : de 0 à 10 : 8 élèves, de 10 à 20 : effectif effacé, de 20 à 30 : 4 ; moyenne estimée 13 min",
  tableau(18, 90, [160, 95, 95, 95], 64, [["Lecture (min)", "[0 ; 10[", "[10 ; 20[", "[20 ; 30["], ["Effectif", "8", "?", "4"]], 20, [[1, 2]]) +
    t(240, 280, "moyenne (avec les centres) : 13 min", C.craie, 22).replace(" :", `${NB}:`) + t(240, 340, `effectif effacé${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "stat_classes",
  titre: "Énigmes des séries en classes",
  description: "Les trajets à classer, le temps d'écran, les colis de la poste, l'histogramme des tailles, le piège de l'étendue perdue, le défi de l'effectif effacé : regrouper en classes, centre de classe, moyenne estimée, classe médiane, lire un histogramme.",
  problemes: [
    {
      tag: "Énigme 1 · Les trajets",
      titre: "Ranger dans les classes",
      question: `Douze élèves donnent leur durée de trajet, en minutes :<br><b>5, 12, 18, 25, 9, 14, 31, 20, 11, 7, 16, 22</b><br><br><b>Combien</b> sont dans la classe <b>[10 ; 20[</b> ?`,
      reponse: `[10 ; 20[ : de 10 compris à 20 <b>non compris</b>.<br>12, 18, 14, 11, 16 : <span class="big">5 élèves</span>. Le 20 va dans la classe suivante.`,
      consigne: "Combien d'élèves sont dans la classe [10 ; 20[ ?",
      verification: {"type":"courte","attendus":["5"],"unite":"élèves"},
      dessin: trajets,
    },
    {
      tag: "Énigme 2 · Le temps d'écran",
      titre: "La moyenne avec les centres",
      question: `Vingt élèves ont donné leur temps d'écran par jour : [0 ; 2[ h : <b>6</b> élèves, [2 ; 4[ h : <b>10</b>, [4 ; 6[ h : <b>4</b>.<br><br><b>Estime la moyenne</b> en prenant le centre de chaque classe.`,
      reponse: `Centres : 1 h, 3 h, 5 h.<br>(1 × 6 + 3 × 10 + 5 × 4) ÷ 20 = 56 ÷ 20 = <span class="big">2,8 h</span>, soit 2 h 48 min.`,
      consigne: "Quelle est la moyenne estimée, en heures ?",
      verification: {"type":"courte","attendus":["2,8"],"unite":"h"},
      dessin: ecran,
    },
    {
      tag: "Énigme 3 · Les colis",
      titre: "La classe médiane",
      question: `Un bureau de poste a pesé <b>40 colis</b> : [0 ; 1[ kg : 12, [1 ; 2[ kg : 15, [2 ; 5[ kg : 9, [5 ; 10[ kg : 4.<br><br>Dans quelle classe se trouve <b>la médiane</b> ?`,
      reponse: `40 valeurs : la médiane est entre la 20e et la 21e.<br>Effectifs cumulés : 12, puis 27. Les 20e et 21e colis sont dans <span class="big">[1 ; 2[ kg</span>.`,
      consigne: "Dans quelle classe se trouve la médiane ?",
      verification: {"type":"qcm","choix":["[1 ; 2[ kg","[0 ; 1[ kg","[2 ; 5[ kg"],"bonne":0},
      dessin: colis,
    },
    {
      tag: "Énigme 4 · L'histogramme",
      titre: "Les tailles de la classe",
      question: `L'histogramme donne les tailles des <b>25 élèves</b> d'une classe.<br><br>Quel <b>pourcentage</b> des élèves mesure <b>moins de 160 cm</b> ?`,
      reponse: `Moins de 160 cm : les deux premières classes, 5 + 11 = 16 élèves.<br>16 ÷ 25 = 0,64 = <span class="big">64 %</span>.`,
      consigne: "Quel pourcentage des élèves mesure moins de 160 cm ?",
      verification: {"type":"courte","attendus":["64"],"unite":"%"},
      dessin: tailles,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'étendue perdue",
      sorte: "piege",
      question: `Les durées de 30 appels sont regroupées en classes, de [0 ; 10[ à [40 ; 50[ minutes. Lina affirme : « L'étendue vaut 50 − 0 = 50 min. »<br><br>A-t-elle raison ?`,
      reponse: `En classes, on a perdu les valeurs exactes. L'appel le plus court dure peut-être 3 min, le plus long 41 min.<br><span class="big">On sait seulement que l'étendue est inférieure à 50 min</span>, pas sa valeur.`,
      consigne: "Lina a-t-elle raison ?",
      verification: {"type":"qcm","choix":["Oui, elle vaut 50 min","Non, elle vaut 40 min","Non, on sait seulement qu'elle est inférieure à 50 min"],"bonne":2},
      dessin: etendue,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'effectif effacé",
      sorte: "defi",
      question: `Temps de lecture par jour : [0 ; 10[ min : <b>8</b> élèves, [10 ; 20[ min : <b>effacé</b>, [20 ; 30[ min : <b>4</b>. Avec les centres des classes, la moyenne vaut <b>13 min</b>.<br><br><b>Combien d'élèves</b> ont été effacés ?`,
      reponse: `Avec x élèves au milieu : (5 × 8 + 15x + 25 × 4) ÷ (12 + x) = 13.<br>140 + 15x = 156 + 13x, donc 2x = 16 et x = <span class="big">8 élèves</span>.<br>Vérification : 260 ÷ 20 = 13.`,
      consigne: "Combien d'élèves sont dans la classe [10 ; 20[ ?",
      verification: {"type":"courte","attendus":["8"],"unite":"élèves"},
      dessin: efface,
    },
  ],
};

export default problemes;
