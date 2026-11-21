// Énigmes à projeter — CE1, notion droites et segments (les arbres alignés,
// les segments de la maison, le plus long segment du quadrillage, le trait
// fait à la règle, le piège des flèches, le défi des quatre points reliés).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, grille } from "../dessins-ecole";

const arbre = (x: number, y: number, nom: string) => t(x, y + 14, "🌳", C.craie, 40) + t(x + 28, y - 18, nom, C.bleu, 22);
const arbres = svg(
  "Cinq arbres A, B, C, D, E ; A, C et E sont sur une même ligne droite",
  arbre(70, 300, "A") + arbre(200, 220, "C") + arbre(330, 140, "E") + arbre(120, 120, "B") + arbre(380, 290, "D") +
    t(240, 385, `Quels arbres sont alignés${NB}?`, C.rose, 28)
);

const maison = svg(
  "Une maison faite de segments : un carré et un toit en pointe",
  p("M140 180 L240 90 L340 180", C.rose, 5) + l(140, 180, 340, 180, C.bleu, 5) + l(140, 180, 140, 320, C.bleu, 5) + l(340, 180, 340, 320, C.bleu, 5) + l(140, 320, 340, 320, C.bleu, 5) +
    [[140, 180], [240, 90], [340, 180], [140, 320], [340, 320]].map(([x, y]) => o(x, y, 6, C.craie, 1, 2)).join("") +
    t(240, 385, `Combien de segments${NB}?`, C.rose, 30)
);

const segments = svg(
  "Un quadrillage avec trois segments : A long de 4 carreaux, B de 6 carreaux, C de 3 carreaux",
  grille(60, 60, 8, 5, 45, C.pale, 1.5) +
    l(105, 105, 285, 105, C.bleu, 6) + t(40, 113, "A", C.bleu, 24) +
    l(105, 195, 375, 195, C.rose, 6) + t(40, 203, "B", C.rose, 24) +
    l(105, 285, 240, 285, C.jaune, 6) + t(40, 293, "C", C.jaune, 24) +
    t(240, 385, `Le plus long${NB}?`, C.rose, 30)
);

const traits = svg(
  "Trois traits : A ondulé, B droit, C cassé",
  t(50, 108, "A", C.craie, 26) + p("M90 100 Q140 60 190 100 Q240 140 290 100 Q340 60 400 100", C.bleu, 5) +
    t(50, 198, "B", C.craie, 26) + l(90, 190, 400, 190, C.bleu, 5) +
    t(50, 288, "C", C.craie, 26) + p("M90 290 L190 270 L280 300 L400 270", C.bleu, 5) +
    t(240, 385, `Le trait fait à la règle${NB}?`, C.rose, 28)
);

const fleches = svg(
  "Deux segments de même longueur : l'un avec des pointes vers l'extérieur, l'autre vers l'intérieur",
  l(130, 130, 350, 130, C.bleu, 5) + p("M155 105 L130 130 L155 155", C.bleu, 4) + p("M325 105 L350 130 L325 155", C.bleu, 4) + t(80, 140, "A", C.bleu, 26) +
    l(130, 250, 350, 250, C.rose, 5) + p("M105 225 L130 250 L105 275", C.rose, 4) + p("M375 225 L350 250 L375 275", C.rose, 4) + t(70, 260, "B", C.rose, 26) +
    t(240, 370, `Le trait le plus long${NB}?`, C.rose, 28)
);

const points = svg(
  "Quatre points posés comme les coins d'un carré",
  [[140, 100], [340, 100], [140, 280], [340, 280]].map(([x, y]) => o(x, y, 10, C.bleu, 1, 2)).join("") +
    t(240, 345, "On relie chaque point à tous les autres.", C.pale, 22) + t(240, 395, `Combien de segments${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "droites_segments",
  titre: "Énigmes sur les droites et les segments",
  description: "Les arbres alignés, les segments de la maison, le plus long segment du quadrillage, le trait fait à la règle, le piège des flèches, le défi des quatre points reliés.",
  problemes: [
    {
      tag: "Énigme 1 · Le parc",
      titre: "Les arbres alignés",
      question: `Il y a 5 arbres.<br>Trois sont sur une même <b>ligne droite</b>.<br><br>Lesquels ?`,
      reponse: `On pose la règle sur A.<br>Elle passe par C, puis par E.<br>Alignés : <span class="big">A, C, E</span>.`,
      consigne: "Quels arbres sont alignés ?",
      verification: { type: "qcm", choix: ["A, B, C", "A, C, E", "B, C, D"], bonne: 1 },
      dessin: arbres,
    },
    {
      tag: "Énigme 2 · Le dessin",
      titre: "La maison",
      question: `Lina dessine une maison à la règle.<br>Chaque trait droit est un segment.<br><br>Combien de segments ?`,
      reponse: `Le carré : 4 segments.<br>Le toit : 2 segments.<br>4 + 2 = <span class="big">6 segments</span>.`,
      consigne: "Combien de segments pour la maison ?",
      verification: { type: "courte", attendus: ["6"], unite: "segments" },
      dessin: maison,
    },
    {
      tag: "Énigme 3 · Le quadrillage",
      titre: "Le plus long segment",
      question: `Trois segments sur le quadrillage.<br>On compte les carreaux.<br><br>Lequel est le plus long ?`,
      reponse: `A : 4 carreaux. B : 6 carreaux. C : 3 carreaux.<br>Le plus long : <span class="big">B</span>.`,
      consigne: "Quel segment est le plus long ?",
      verification: { type: "qcm", choix: ["A", "C", "B"], bonne: 2 },
      dessin: segments,
    },
    {
      tag: "Énigme 4 · La règle",
      titre: "Le bon trait",
      question: `Trois traits : A, B et C.<br><br>Lequel est fait <b>à la règle</b> ?`,
      reponse: `A est ondulé. C est cassé : il change de direction.<br>Le trait tout droit : <span class="big">B</span>.`,
      consigne: "Quel trait est fait à la règle ?",
      verification: { type: "qcm", choix: ["B", "A", "C"], bonne: 0 },
      dessin: traits,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les flèches",
      sorte: "piege",
      question: `Regarde les deux traits A et B.<br>Les pointes changent.<br><br>Quel trait est le plus long ?`,
      reponse: `Le piège : B a l'air plus long à cause des pointes.<br>Avec la règle : A et B mesurent pareil.<br><span class="big">Ils sont pareils</span>.`,
      consigne: "Quel trait est le plus long ?",
      verification: { type: "qcm", choix: ["A", "Ils sont pareils", "B"], bonne: 1 },
      dessin: fleches,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les quatre points",
      sorte: "defi",
      question: `Il y a <b>4 points</b>.<br>On relie chaque point à <b>tous</b> les autres.<br><br>Combien de segments ?`,
      reponse: `Les 4 côtés du carré : 4.<br>Les 2 traits en croix au milieu : 2.<br>4 + 2 = <span class="big">6 segments</span>.`,
      consigne: "Combien de segments pour relier les 4 points ?",
      verification: { type: "courte", attendus: ["6"], unite: "segments" },
      dessin: points,
    },
  ],
};

export default problemes;
