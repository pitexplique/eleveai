// Énigmes à projeter — CM1, notion symétrie (le dessin qui a un axe, le point à
// reporter de l'autre côté, le panneau « cédez le passage », les lettres du
// mot TOMATE, le piège de l'écart doublé, le défi de la feuille pliée deux
// fois). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, grille } from "../dessins-ecole";

const dessins = svg(
  "Trois dessins : un cœur, la lettre F, le chiffre 7",
  p("M110 230 C40 170 60 100 110 130 C160 100 180 170 110 230 Z", C.rose, 5, 0.3) + t(110, 300, "cœur", C.pale, 22) +
    t(240, 220, "F", C.bleu, 120) + t(240, 300, "lettre", C.pale, 22) + t(370, 220, "7", C.jaune, 120) + t(370, 300, "chiffre", C.pale, 22) +
    t(240, 380, `Lequel a un axe de symétrie${NB}?`, C.rose, 24)
);

// Le quadrillage : axe vertical au milieu ; un point à 3 carreaux à gauche.
const report = svg(
  "Un quadrillage avec un axe vertical ; un point à 3 carreaux à gauche de l'axe",
  grille(60, 60, 8, 5, 45, C.pale, 1.5) + l(240, 40, 240, 310, C.rose, 4, "10 6") + o(105, 150, 9, C.bleu, 1, 2) + t(105, 130, "A", C.bleu, 24) +
    t(240, 360, `Le symétrique de A${NB}: à combien de carreaux de l'axe${NB}?`, C.craie, 18)
);

const panneau = svg(
  "Un panneau triangulaire « cédez le passage », pointe en bas",
  p("M100 90 L380 90 L240 330 Z", C.rose, 10, 0.15) + p("M140 112 L340 112 L240 285 Z", C.craie, 2) +
    t(240, 385, `Combien d'axes de symétrie${NB}?`, C.rose, 24)
);

const tomate = svg(
  "Le mot TOMATE",
  t(240, 220, "TOMATE", C.craie, 100) + t(240, 330, `Combien de lettres ont un axe vertical${NB}?`, C.rose, 20)
);

// L'écart : axe vertical ; un carré à 2 carreaux de l'axe.
const ecart = svg(
  "Un carré à 2 carreaux à gauche de l'axe",
  grille(60, 80, 8, 4, 45, C.pale, 1.5) + l(240, 60, 240, 280, C.rose, 4, "10 6") + r(105, 125, 45, 45, C.bleu, 0.45, 3) +
    t(195, 115, "2", C.craie, 22) + p("M150 100 L240 100", C.craie, 2) +
    t(240, 350, `Entre le carré et son symétrique${NB}?`, C.craie, 22)
);

const feuille = svg(
  "Une feuille pliée en deux, puis encore en deux, puis trouée",
  r(40, 120, 140, 180, C.jaune, 0.15, 3) + l(110, 120, 110, 300, C.pale, 2, "6 5") + l(40, 210, 180, 210, C.pale, 2, "6 5") + t(110, 100, "2 plis", C.craie, 22) +
    t(240, 220, "→", C.pale, 40) + r(300, 140, 90, 100, C.jaune, 0.3, 3) + o(345, 190, 14, C.craie, 0.6, 2) + t(345, 120, "1 trou", C.craie, 22) +
    t(240, 370, `En dépliant${NB}: combien de trous${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "symetrie",
  titre: "Énigmes sur la symétrie",
  description: "Le dessin qui a un axe de symétrie, le point à reporter de l'autre côté, le panneau « cédez le passage », les lettres du mot TOMATE, le piège de l'écart doublé, le défi de la feuille pliée deux fois.",
  problemes: [
    {
      tag: "Énigme 1 · Les dessins",
      titre: "Lequel a un axe ?",
      question: `Voici un cœur, la lettre F et le chiffre 7.<br><br>Lequel a un <b>axe de symétrie</b> ?`,
      reponse: `On plie le dessin : les deux moitiés doivent se superposer.<br>Le F et le 7 ne marchent pas.<br>C'est <span class="big">le cœur</span>.`,
      consigne: "Quel dessin a un axe de symétrie ?",
      verification: { type: "qcm", choix: ["le cœur", "la lettre F", "le chiffre 7"], bonne: 0 },
      dessin: dessins,
    },
    {
      tag: "Énigme 2 · Le quadrillage",
      titre: "Le point de l'autre côté",
      question: `Le point A est à <b>3 carreaux</b> à gauche de l'axe.<br><br>Son symétrique est à <b>combien de carreaux</b> à droite de l'axe ?`,
      reponse: `Le symétrique est à la même distance de l'axe, de l'autre côté.<br><span class="big">3 carreaux</span> à droite.`,
      consigne: "À combien de carreaux de l'axe est le symétrique de A ?",
      verification: { type: "courte", attendus: ["3"], unite: "carreaux" },
      dessin: report,
    },
    {
      tag: "Énigme 3 · Le code de la route",
      titre: "Le panneau triangulaire",
      question: `Le panneau « cédez le passage » est un triangle.<br>Ses <b>3 côtés sont égaux</b>.<br><br>Combien d'<b>axes de symétrie</b> a-t-il ?`,
      reponse: `On peut le plier en deux de 3 façons.<br>Chaque axe passe par un sommet et le milieu du côté en face.<br><span class="big">3 axes</span>.`,
      consigne: "Combien d'axes de symétrie a le panneau ?",
      verification: { type: "qcm", choix: ["1", "0", "3"], bonne: 2 },
      dessin: panneau,
    },
    {
      tag: "Énigme 4 · Les lettres",
      titre: "Le mot TOMATE",
      question: `Regarde le mot <b>TOMATE</b>, écrit en capitales.<br><br>Combien de lettres ont un <b>axe de symétrie vertical</b> ?`,
      reponse: `T, O, M, A, T : oui, on peut les plier de haut en bas.<br>E : son axe est horizontal, pas vertical.<br><span class="big">5 lettres</span>.`,
      consigne: "Combien de lettres de TOMATE ont un axe vertical ?",
      verification: { type: "courte", attendus: ["5"], unite: "lettres" },
      dessin: tomate,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'écart doublé",
      sorte: "piege",
      question: `Le carré bleu est à <b>2 carreaux</b> de l'axe.<br>On dessine son symétrique.<br><br>Combien de carreaux <b>entre le carré et son symétrique</b> ?`,
      reponse: `Le piège : répondre 2.<br>2 carreaux jusqu'à l'axe, puis 2 de l'autre côté.<br>2 + 2 = <span class="big">4 carreaux</span>.`,
      consigne: "Combien de carreaux entre le carré et son symétrique ?",
      verification: { type: "qcm", choix: ["4", "2", "0"], bonne: 0 },
      dessin: ecart,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La feuille pliée deux fois",
      sorte: "defi",
      question: `Tu plies une feuille en deux.<br>Puis tu la plies <b>encore en deux</b>.<br>Tu fais <b>un trou</b> avec un crayon.<br><br>Combien de <b>trous</b> en dépliant ?`,
      reponse: `Après 2 plis, il y a 4 épaisseurs de papier.<br>Le crayon les traverse toutes.<br><span class="big">4 trous</span>, symétriques par les deux plis.`,
      consigne: "Combien de trous en dépliant la feuille ?",
      verification: { type: "courte", attendus: ["4"], unite: "trous" },
      dessin: feuille,
    },
  ],
};

export default problemes;
