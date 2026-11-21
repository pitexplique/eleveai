// Énigmes à projeter — CE2, notion symétrie (la carte découpée pliée, la
// coccinelle et le miroir, les lettres de la kermesse, l'axe du papillon, le
// piège de la serviette pliée en diagonale, le défi des axes du carré). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, ell, grille } from "../dessins-ecole";

const carte = svg(
  "Une feuille pliée en deux ; un demi-cœur est dessiné contre le pli",
  r(150, 60, 190, 260, C.craie, 0.08, 3) + l(150, 60, 150, 320, C.bleu, 4, "10 7") + t(150, 345, "pli", C.bleu, 20) +
    p("M150 125 C170 75 270 80 268 150 C266 210 200 250 150 295", C.rose, 5, 0.25) + t(395, 120, "✂️", C.craie, 48) +
    t(240, 395, `Je déplie${NB}: je vois${NB}?`, C.rose, 28)
);

// Quadrillage 8 × 4, carreau 45 px, de x = 60 à 420 ; l'axe est la ligne x = 240.
const coccinelle = svg(
  "Un quadrillage avec un axe ; la coccinelle est à 2 carreaux à gauche de l'axe ; les points C, A, B sont à 1, 2 et 3 carreaux à droite",
  grille(60, 50, 8, 4, 45, C.pale, 1.5) + l(240, 30, 240, 250, C.bleu, 5) + t(240, 280, "axe", C.bleu, 20) +
    t(150, 155, "🐞", C.craie, 34) +
    [[285, "C"], [330, "A"], [375, "B"]].map(([x, s]) => o(x as number, 140, 7, C.rose, 1, 2) + t(x as number, 125, s as string, C.rose, 24)).join("") +
    t(240, 370, `Où est son reflet${NB}?`, C.rose, 28)
);

const lettres = svg(
  "Les lettres A, F et M découpées dans du carton",
  ["A", "F", "M"].map((s, i) => r(48 + i * 140, 90, 104, 150, C.jaune, 0.15, 3, 8) + t(100 + i * 140, 210, s, C.craie, 110)).join("") +
    t(240, 320, "Un axe vertical, du haut en bas", C.pale, 20) + t(240, 380, `Laquelle n'en a pas${NB}?`, C.rose, 28)
);

const papillon = svg(
  "Un papillon et trois traits : A horizontal, B vertical au milieu du corps, C vertical à droite",
  ell(180, 160, 60, 50, C.bleu, 0.3, 4) + ell(300, 160, 60, 50, C.bleu, 0.3, 4) + ell(195, 250, 42, 36, C.jaune, 0.35, 4) + ell(285, 250, 42, 36, C.jaune, 0.35, 4) +
    ell(240, 205, 10, 85, C.craie, 0.6, 3) + p("M235 125 Q220 90 205 80 M245 125 Q260 90 275 80", C.craie, 3) +
    l(70, 205, 410, 205, C.rose, 3, "10 7") + t(55, 212, "A", C.rose, 26) +
    l(240, 50, 240, 330, C.rose, 3, "10 7") + t(240, 360, "B", C.rose, 26) +
    l(390, 50, 390, 330, C.rose, 3, "10 7") + t(390, 360, "C", C.rose, 26) +
    t(240, 405, `L'axe de symétrie${NB}?`, C.rose, 26)
);

const serviette = svg(
  "Une serviette rectangulaire, plus longue que large, avec sa diagonale en pointillés",
  r(90, 110, 300, 160, C.jaune, 0.2, 4, 4) + l(90, 270, 390, 110, C.rose, 4, "10 7") + t(300, 215, "pli ?", C.rose, 24) +
    t(240, 365, `Les deux moitiés${NB}: pareilles${NB}?`, C.rose, 26)
);

const mouchoir = svg(
  "Un mouchoir carré",
  r(130, 70, 220, 220, C.bleu, 0.2, 4, 3) + r(145, 85, 190, 190, C.bleu, 0, 2, 2) +
    t(240, 370, `Combien d'axes${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "symetrie",
  titre: "Énigmes sur la symétrie",
  description: "La carte découpée dans une feuille pliée, le reflet de la coccinelle, la lettre sans axe vertical, l'axe du papillon, le piège de la serviette pliée en diagonale, le défi des axes de symétrie du carré.",
  problemes: [
    {
      tag: "Énigme 1 · La carte de fête",
      titre: "Le demi-cœur",
      question: `Nora plie une feuille en deux.<br>Elle découpe un <b>demi-cœur</b> contre le pli.<br><br>Que voit-elle en dépliant ?`,
      reponse: `Le pli est un axe de symétrie.<br>Le demi-cœur apparaît des deux côtés.<br>Elle voit <span class="big">un cœur entier</span>.`,
      consigne: "Que voit Nora en dépliant la feuille ?",
      verification: { type: "qcm", choix: ["Un demi-cœur", "Deux petits cœurs", "Un cœur entier"], bonne: 2 },
      dessin: carte,
    },
    {
      tag: "Énigme 2 · Le miroir",
      titre: "Le reflet de la coccinelle",
      question: `La coccinelle est à <b>2 carreaux</b> à gauche de l'axe.<br><br>Où est son reflet : C, A ou B ?`,
      reponse: `Le reflet est de l'autre côté.<br>Il est à la même distance : 2 carreaux.<br>C'est <span class="big">le point A</span>.`,
      consigne: "Où est le reflet de la coccinelle ?",
      verification: { type: "qcm", choix: ["Le point A", "Le point B", "Le point C"], bonne: 0 },
      dessin: coccinelle,
    },
    {
      tag: "Énigme 3 · La kermesse",
      titre: "Les lettres en carton",
      question: `On plie chaque lettre du haut vers le bas, en son milieu.<br><br>Quelle lettre <b>n'a pas</b> deux moitiés pareilles ?`,
      reponse: `A : les deux côtés sont pareils.<br>M aussi.<br>F a ses barres d'un seul côté.<br>C'est <span class="big">F</span>.`,
      consigne: "Quelle lettre n'a pas d'axe de symétrie vertical ?",
      verification: { type: "qcm", choix: ["A", "M", "F"], bonne: 2 },
      dessin: lettres,
    },
    {
      tag: "Énigme 4 · Le jardin",
      titre: "L'axe du papillon",
      question: `Voici un papillon et trois traits.<br><br>Quel trait est son <b>axe de symétrie</b> ?`,
      reponse: `On plie le long du trait.<br>Avec B, les ailes de gauche tombent sur celles de droite.<br>C'est <span class="big">le trait B</span>.`,
      consigne: "Quel trait est l'axe de symétrie du papillon ?",
      verification: { type: "qcm", choix: ["Le trait A", "Le trait B", "Le trait C"], bonne: 1 },
      dessin: papillon,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La serviette",
      sorte: "piege",
      question: `La serviette est un <b>rectangle</b>.<br>On la plie sur la <b>diagonale</b>.<br><br>Les deux moitiés tombent-elles l'une sur l'autre ?`,
      reponse: `Le piège : la diagonale coupe en deux parts égales.<br>Mais en pliant, les coins dépassent !<br><span class="big">Non, elles dépassent</span>. La diagonale n'est pas un axe.`,
      consigne: "Pliée sur la diagonale, les deux moitiés se superposent-elles ?",
      verification: { type: "qcm", choix: ["Non, elles dépassent", "Oui, exactement", "Seulement au milieu"], bonne: 0 },
      dessin: serviette,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les axes du carré",
      sorte: "defi",
      question: `Le mouchoir est un <b>carré</b>.<br>On cherche tous les plis où les deux moitiés tombent pile.<br><br>Combien d'axes de symétrie ?`,
      reponse: `Le pli du milieu, de haut en bas : 1.<br>De gauche à droite : 2.<br>Les deux diagonales : 4.<br><span class="big">4 axes</span>.`,
      consigne: "Combien d'axes de symétrie a le carré ?",
      verification: { type: "courte", attendus: ["4"], unite: "axes" },
      dessin: mouchoir,
    },
  ],
};

export default problemes;
