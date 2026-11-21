// Énigmes à projeter — CE2, notion solides (le dé du jeu de l'oie, le chapeau
// de fête, les faces du carton de déménagement, le solide qui roule, le piège
// des sommets de la pyramide, le défi du grand cube en petits cubes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, ell } from "../dessins-ecole";

const poly = (pts: number[][], c: string = C.craie, op = 0.15, ep = 4) =>
  p("M" + pts.map(([x, y]) => `${x} ${y}`).join(" L") + " Z", c, ep, op);

/** Un pavé vu en perspective : face avant (x, y, larg, haut), profondeur d ; n = découpage en petits cubes. */
const pave = (x: number, y: number, w: number, h: number, d: number, c: string = C.bleu, n = 1) => {
  let s = poly([[x, y], [x + d, y - d], [x + w + d, y - d], [x + w, y]], c, 0.35) +
    poly([[x + w, y], [x + w + d, y - d], [x + w + d, y + h - d], [x + w, y + h]], c, 0.5) + r(x, y, w, h, c, 0.2, 4);
  for (let i = 1; i < n; i++) {
    const a = (w * i) / n, b = (h * i) / n, e = (d * i) / n;
    s += l(x + a, y, x + a, y + h, C.craie, 3) + l(x, y + b, x + w, y + b, C.craie, 3) +
      l(x + a, y, x + a + d, y - d, C.craie, 3) + l(x + e, y - e, x + w + e, y - e, C.craie, 3) +
      l(x + w + e, y - e, x + w + e, y + h - e, C.craie, 3) + l(x + w, y + b, x + w + d, y + b - d, C.craie, 3);
  }
  return s;
};

const de = svg(
  "Un dé à jouer, avec ses points",
  pave(150, 140, 150, 150, 70, C.craie) +
    [[185, 175], [265, 175], [225, 215], [185, 255], [265, 255]].map(([x, y]) => o(x, y, 11, C.rose, 1, 2)).join("") +
    t(240, 385, `Quel solide${NB}?`, C.rose, 30)
);

const chapeau = svg(
  "Un chapeau de fête pointu, avec un pompon",
  poly([[240, 70], [150, 300], [330, 300]], C.jaune, 0.3) + ell(240, 300, 90, 22, C.jaune, 0.4, 4) +
    o(240, 60, 16, C.rose, 0.6, 3) + l(195, 185, 285, 185, C.rose, 3, "8 6") + l(172, 245, 308, 245, C.bleu, 3, "8 6") +
    t(400, 120, "🥳", C.craie, 56) + t(240, 385, `Quel solide${NB}?`, C.rose, 30)
);

const carton = svg(
  "Un carton de déménagement fermé, en forme de pavé",
  pave(100, 150, 220, 140, 80, C.jaune) + t(210, 230, "LIVRES", C.craie, 26) +
    t(240, 385, `Combien de faces${NB}?`, C.rose, 30)
);

const roule = svg(
  "Trois solides posés sur la table : A un cube, B une pyramide, C une boule",
  l(40, 300, 440, 300, C.pale, 4) +
    pave(70, 210, 80, 80, 25, C.bleu) + poly([[190, 300], [290, 300], [245, 190]], C.jaune, 0.3) + poly([[290, 300], [315, 280], [245, 190]], C.jaune, 0.5) +
    o(375, 252, 46, C.rose, 0.3, 4) +
    t(120, 345, "A", C.jaune, 30) + t(245, 345, "B", C.jaune, 30) + t(375, 345, "C", C.jaune, 30) +
    t(240, 400, `Lequel roule${NB}?`, C.rose, 28)
);

// Pyramide à base carrée : base en perspective, sommet en haut ; arêtes cachées en pointillés.
const pyramide = svg(
  "Une pyramide à base carrée ; une arête de la base et une arête vers le sommet sont cachées",
  poly([[110, 300], [300, 300], [380, 240], [240, 70]], C.jaune, 0.25) + l(240, 70, 300, 300, C.craie, 4) +
    l(110, 300, 190, 240, C.pale, 3, "8 6") + l(190, 240, 380, 240, C.pale, 3, "8 6") + l(190, 240, 240, 70, C.pale, 3, "8 6") +
    t(240, 375, `Combien de sommets${NB}?`, C.rose, 28)
);

const grandCube = svg(
  "Un grand cube fait de petits cubes : 2 petits cubes sur chaque arête",
  pave(140, 150, 160, 160, 80, C.bleu, 2) + t(220, 340, "2 petits cubes par arête", C.pale, 20) +
    t(240, 395, `Combien de petits cubes${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "solides",
  titre: "Énigmes sur les solides",
  description: "Le dé du jeu de société, le chapeau de fête pointu, les faces du carton de déménagement, le solide qui roule, le piège des sommets de la pyramide, le défi du grand cube fait de petits cubes.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu de société",
      titre: "Le dé",
      question: `Chloé lance le dé.<br>Toutes ses faces sont des <b>carrés</b>.<br><br>Quel est ce solide ?`,
      reponse: `6 faces carrées, toutes pareilles.<br>Le dé est <span class="big">un cube</span>.`,
      consigne: "Quel solide est le dé ?",
      verification: { type: "qcm", choix: ["Une pyramide", "Un cube", "Un pavé"], bonne: 1 },
      dessin: de,
    },
    {
      tag: "Énigme 2 · L'anniversaire",
      titre: "Le chapeau de fête",
      question: `Le chapeau a une <b>pointe</b> en haut.<br>En bas, un <b>rond</b>.<br><br>Quel est ce solide ?`,
      reponse: `Une pointe et une base ronde.<br>C'est <span class="big">un cône</span>.`,
      consigne: "Quel solide est le chapeau de fête ?",
      verification: { type: "qcm", choix: ["Un cône", "Un cylindre", "Une pyramide"], bonne: 0 },
      dessin: chapeau,
    },
    {
      tag: "Énigme 3 · Le déménagement",
      titre: "Le carton",
      question: `Le carton est fermé.<br>C'est un <b>pavé</b>.<br><br>Combien a-t-il de faces ?`,
      reponse: `Devant et derrière : 2.<br>Dessus et dessous : 2.<br>Gauche et droite : 2.<br>2 + 2 + 2 = <span class="big">6 faces</span>.`,
      consigne: "Combien de faces a le carton ?",
      verification: { type: "courte", attendus: ["6"], unite: "faces" },
      dessin: carton,
    },
    {
      tag: "Énigme 4 · La table de jeu",
      titre: "Le solide qui roule",
      question: `On pousse doucement trois solides.<br><br>Lequel va <b>rouler</b> ?`,
      reponse: `Le cube et la pyramide ont des faces plates : ils glissent ou restent.<br>La boule est toute ronde.<br>C'est <span class="big">la boule C</span>.`,
      consigne: "Quel solide va rouler ?",
      verification: { type: "qcm", choix: ["Le cube A", "La pyramide B", "La boule C"], bonne: 2 },
      dessin: roule,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les sommets de la pyramide",
      sorte: "piege",
      question: `La pyramide a une base <b>carrée</b>.<br>Les pointillés sont cachés derrière.<br><br>Combien a-t-elle de sommets ?`,
      reponse: `Le piège : on oublie un sommet caché, ou la pointe.<br>La base carrée : 4 sommets.<br>La pointe en haut : 1.<br>4 + 1 = <span class="big">5 sommets</span>.`,
      consigne: "Combien de sommets a la pyramide à base carrée ?",
      verification: { type: "qcm", choix: ["5", "4", "8"], bonne: 0 },
      dessin: pyramide,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le grand cube",
      sorte: "defi",
      question: `Léo construit un grand cube avec des petits cubes.<br>Chaque arête a <b>2 petits cubes</b>.<br><br>Combien de petits cubes en tout ?`,
      reponse: `L'étage du bas : 2 rangées de 2, donc 4.<br>L'étage du haut : encore 4.<br>4 + 4 = <span class="big">8 petits cubes</span>.`,
      consigne: "Combien de petits cubes faut-il ?",
      verification: { type: "courte", attendus: ["8"], unite: "petits cubes" },
      dessin: grandCube,
    },
  ],
};

export default problemes;
