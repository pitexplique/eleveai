// Énigmes à projeter — CM2, notion symetrie (la lettre sans axe, les axes du
// carré, la tache de peinture pliée, les axes du rectangle, le piège de la
// diagonale du rectangle, le défi des axes du cercle). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, grille } from "../dessins-ecole";

const lettres = svg(
  "Trois lettres : A, H et F",
  [["A", C.bleu], ["H", C.jaune], ["F", C.rose]].map(([s, c], i) => r(40 + i * 145, 90, 110, 150, c, 0.1, 3, 10) + t(95 + i * 145, 205, s, c, 110)).join("") +
    t(240, 330, `Quelle lettre n'a aucun axe${NB}?`, C.craie, 24)
);

const carre = svg(
  "Un carré et ses axes de symétrie en pointillés",
  r(120, 60, 240, 240, C.bleu, 0.15, 4) + l(240, 40, 240, 320, C.rose, 3, "10 8") + l(100, 180, 380, 180, C.rose, 3, "10 8") +
    t(240, 370, `combien d'axes en tout${NB}?`, C.rose, 26)
);

// La feuille pliée : axe vertical, la tache à 3 carreaux à gauche (1 carreau = 40 px).
const tache = svg(
  "Une feuille quadrillée avec un axe de pliage ; une tache de peinture à 3 carreaux de l'axe",
  grille(40, 60, 10, 6, 40, C.pale, 1) + l(240, 40, 240, 320, C.rose, 4, "10 8") + o(140, 180, 16, C.bleu, 0.7, 3) +
    t(240, 30, "pli", C.rose, 18) + t(240, 365, "on plie la feuille", C.pale, 20) + t(240, 400, `tache ↔ image${NB}: ? carreaux`, C.rose, 22)
);

// Le rectangle 6 × 3 (1 = 50 px).
const rectangle = svg(
  "Un rectangle qui n'est pas un carré",
  r(90, 100, 300, 150, C.jaune, 0.2, 4) + t(240, 330, `combien d'axes de symétrie${NB}?`, C.rose, 24)
);

// Le rectangle et sa diagonale : on plie le long de la diagonale, les coins ne tombent pas l'un sur l'autre.
const diagonale = svg(
  "Un rectangle et sa diagonale ; une fois plié le long de la diagonale, le triangle déborde",
  r(60, 120, 300, 150, C.jaune, 0.2, 4) + l(60, 270, 360, 120, C.rose, 3, "10 8") +
    `<path d="M60 270 L360 120 L241 30 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="6 6"/>` +
    t(400, 360, "après pliage", C.bleu, 18, "end") + t(60, 360, `Ana${NB}: «${NB}c'est un axe${NB}»`, C.craie, 20, "start")
);

const cercle = svg(
  "Un cercle et plusieurs axes de symétrie qui passent par son centre",
  o(240, 190, 140, C.bleu, 0.12, 4) + [0, 30, 60, 90, 120, 150].map((d) => {
    const a = (d * Math.PI) / 180;
    return l(240 - 160 * Math.cos(a), 190 - 160 * Math.sin(a), 240 + 160 * Math.cos(a), 190 + 160 * Math.sin(a), C.rose, 2, "8 6");
  }).join("") + o(240, 190, 5, C.craie, 1, 2) + t(240, 395, `combien d'axes${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "symetrie",
  titre: "Énigmes sur la symétrie",
  description: "La lettre sans axe, les axes du carré, la tache de peinture pliée, les axes du rectangle, le piège de la diagonale d'Ana, le défi du cercle.",
  problemes: [
    {
      tag: "Énigme 1 · L'alphabet",
      titre: "La lettre sans axe",
      question: `Voici trois lettres : <b>A</b>, <b>H</b> et <b>F</b>.<br><br><b>Laquelle n'a aucun axe</b> de symétrie ?`,
      reponse: `A a un axe vertical. H en a deux : vertical et horizontal.<br><span class="big">F n'en a aucun</span> : ses barres vont toutes du même côté.`,
      consigne: "Quelle lettre n'a aucun axe de symétrie ?",
      verification: { type: "qcm", choix: ["A", "H", "F"], bonne: 2 },
      dessin: lettres,
    },
    {
      tag: "Énigme 2 · Le carré",
      titre: "Les axes du carré",
      question: `On a tracé deux axes de symétrie du carré.<br>Il y en a d'autres !<br><br><b>Combien d'axes</b> a le carré en tout ?`,
      reponse: `Les deux médianes : verticale et horizontale.<br>Et les deux diagonales !<br>Le carré a <span class="big">4 axes</span> de symétrie.`,
      consigne: "Combien d'axes de symétrie a un carré ?",
      verification: { type: "courte", attendus: ["4"], unite: "axes" },
      dessin: carre,
    },
    {
      tag: "Énigme 3 · À l'atelier peinture",
      titre: "La tache pliée",
      question: `Une tache de peinture fraîche est à <b>3 carreaux</b> de la ligne de pli.<br>On plie la feuille : la tache fait son image de l'autre côté.<br><br>À combien de carreaux de la tache est son <b>image</b> ?`,
      reponse: `L'image est aussi à 3 carreaux du pli, de l'autre côté.<br>3 + 3 = <span class="big">6 carreaux</span>.`,
      consigne: "À combien de carreaux de la tache est son image ?",
      verification: { type: "courte", attendus: ["6"], unite: "carreaux" },
      dessin: tache,
    },
    {
      tag: "Énigme 4 · Le rectangle",
      titre: "Les axes du rectangle",
      question: `Ce rectangle n'est <b>pas un carré</b>.<br><br><b>Combien d'axes</b> de symétrie a-t-il ?`,
      reponse: `On peut le plier en deux dans la longueur et dans la largeur.<br>Le rectangle a <span class="big">2 axes</span> de symétrie.`,
      consigne: "Combien d'axes de symétrie a un rectangle qui n'est pas un carré ?",
      verification: { type: "qcm", choix: ["4", "2", "1"], bonne: 1 },
      dessin: rectangle,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La diagonale d'Ana",
      sorte: "piege",
      question: `Ana dit : « La diagonale d'un rectangle est un axe de symétrie. Il est coupé en deux triangles pareils ! »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Les deux triangles sont bien pareils… mais plie le long de la diagonale : les coins ne tombent pas l'un sur l'autre !<br><span class="big">Non, la diagonale n'est pas un axe</span> (sauf pour un carré).`,
      consigne: "La diagonale d'un rectangle (pas carré) est-elle un axe de symétrie ?",
      verification: { type: "qcm", choix: ["Non", "Oui, toujours", "Oui, si on plie bien"], bonne: 0 },
      dessin: diagonale,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les axes du cercle",
      sorte: "defi",
      question: `On a tracé 6 axes de symétrie du cercle.<br><br>Combien d'axes a un cercle <b>en tout</b> ?`,
      reponse: `Chaque droite qui passe par le centre est un axe.<br>On peut en tracer autant qu'on veut : <span class="big">une infinité</span>.`,
      consigne: "Combien d'axes de symétrie a un cercle ?",
      verification: { type: "qcm", choix: ["6", "Une infinité", "12"], bonne: 1 },
      dessin: cercle,
    },
  ],
};

export default problemes;
