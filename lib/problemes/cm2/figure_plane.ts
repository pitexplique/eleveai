// Énigmes à projeter — CM2, notion figure_plane (l'alvéole hexagonale, rayon et
// diamètre du cerceau, le quadrilatère mystère, le panneau triangulaire, le
// piège du carré posé sur sa pointe, le défi des triangles cachés). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p } from "../dessins-ecole";

const hexa = (cx: number, cy: number, R: number) =>
  "M" + [0, 1, 2, 3, 4, 5].map((k) => `${(cx + R * Math.cos((k * Math.PI) / 3)).toFixed(1)} ${(cy + R * Math.sin((k * Math.PI) / 3)).toFixed(1)}`).join(" L") + " Z";

const ruche = svg(
  "Des alvéoles de ruche en forme d'hexagones",
  [[150, 150], [240, 202], [330, 150], [150, 254], [330, 254], [240, 98]].map(([x, y]) => p(hexa(x, y, 60), C.jaune, 4, 0.25)).join("") +
    t(240, 210, "🐝", C.craie, 40) + t(240, 380, `combien de côtés${NB}?`, C.rose, 26)
);

// Le cerceau : rayon 40 cm = 140 px.
const cerceau = svg(
  "Un cerceau : son rayon mesure 40 cm",
  o(240, 190, 140, C.rose, 0, 8) + o(240, 190, 5, C.craie, 1, 2) + l(240, 190, 380, 190, C.bleu, 4) + t(310, 175, "40 cm", C.bleu, 24) +
    l(100, 190, 240, 190, C.pale, 3, "8 6") + t(240, 380, `diamètre${NB}?`, C.rose, 28)
);

const mystere = svg(
  "Un quadrilatère mystère : 4 côtés égaux et 4 angles droits",
  p("M150 80 L330 80 L330 260 L150 260 Z", C.bleu, 4, 0.15) +
    ["M150 100 L170 100 L170 80", "M310 80 L310 100 L330 100", "M330 240 L310 240 L310 260", "M170 260 L170 240 L150 240"].map((d) => p(d, C.rose, 3)).join("") +
    [[240, 80], [330, 170], [240, 260], [150, 170]].map(([x, y]) => (x === 240 ? l(x - 4, y - 10, x + 4, y + 10, C.craie, 3) : l(x - 10, y - 4, x + 10, y + 4, C.craie, 3))).join("") +
    t(240, 330, "4 côtés égaux, 4 angles droits", C.craie, 22) + t(240, 380, `qui suis-je${NB}?`, C.rose, 26)
);

const panneau = svg(
  "Un panneau de danger en forme de triangle, ses trois côtés mesurent 70 cm",
  p("M240 60 L400 337 L80 337 Z", C.rose, 8, 0.15) + t(240, 280, "!", C.craie, 110) +
    t(140, 190, "70 cm", C.craie, 22, "end") + t(340, 190, "70 cm", C.craie, 22, "start") + t(240, 380, "70 cm", C.craie, 22)
);

const penche = svg(
  "Un carré posé sur une de ses pointes, comme un losange",
  p("M240 50 L370 180 L240 310 L110 180 Z", C.jaune, 4, 0.2) +
    p("M225 65 L240 80 L255 65", C.rose, 3) +
    t(240, 370, `«${NB}ce n'est plus un carré${NB}», dit Noé`, C.craie, 22)
);

const triangles = svg(
  "Un grand triangle coupé par deux traits qui partent du sommet du haut",
  p("M240 50 L430 330 L50 330 Z", C.bleu, 4, 0.12) + l(240, 50, 180, 330, C.bleu, 4) + l(240, 50, 320, 330, C.bleu, 4) +
    t(240, 385, `combien de triangles${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "figure_plane",
  titre: "Énigmes sur les figures planes",
  description: "Les alvéoles de la ruche, le cerceau, le quadrilatère mystère, le panneau triangulaire, le piège du carré penché, le défi des triangles cachés.",
  problemes: [
    {
      tag: "Énigme 1 · Dans la ruche",
      titre: "Les alvéoles",
      question: `Les abeilles fabriquent des alvéoles en forme d'<b>hexagone</b>.<br><br><b>Combien de côtés</b> a un hexagone ?`,
      reponse: `« Hexa » veut dire six.<br>Un hexagone a <span class="big">6 côtés</span>.`,
      consigne: "Combien de côtés a un hexagone ?",
      verification: { type: "courte", attendus: ["6"], unite: "côtés" },
      dessin: ruche,
    },
    {
      tag: "Énigme 2 · En sport",
      titre: "Le cerceau",
      question: `Le <b>rayon</b> d'un cerceau mesure <b>40 cm</b>.<br><br>Combien mesure son <b>diamètre</b> ?`,
      reponse: `Le diamètre traverse tout le cercle en passant par le centre.<br>C'est 2 rayons : 2 × 40 = <span class="big">80 cm</span>.`,
      consigne: "Combien mesure le diamètre du cerceau ?",
      verification: { type: "courte", attendus: ["80"], unite: "cm" },
      dessin: cerceau,
    },
    {
      tag: "Énigme 3 · Le quadrilatère mystère",
      titre: "Qui suis-je ?",
      question: `J'ai <b>4 côtés égaux</b>.<br>J'ai <b>4 angles droits</b>.<br><br><b>Qui suis-je</b> ?`,
      reponse: `Le losange a 4 côtés égaux, mais pas toujours des angles droits.<br>Le rectangle a 4 angles droits, mais pas toujours 4 côtés égaux.<br>Je suis <span class="big">le carré</span>.`,
      consigne: "Quel quadrilatère a 4 côtés égaux et 4 angles droits ?",
      verification: { type: "qcm", choix: ["Le losange", "Le rectangle", "Le carré"], bonne: 2 },
      dessin: mystere,
    },
    {
      tag: "Énigme 4 · Sur la route",
      titre: "Le panneau de danger",
      question: `Un panneau de danger est un triangle.<br>Ses <b>trois côtés</b> mesurent tous <b>70 cm</b>.<br><br>C'est un triangle…`,
      reponse: `Trois côtés égaux : c'est un triangle <span class="big">équilatéral</span>.<br>(Il est aussi isocèle, mais « équilatéral » est plus précis.)`,
      consigne: "Le panneau est un triangle :",
      verification: { type: "qcm", choix: ["rectangle", "équilatéral", "quelconque"], bonne: 1 },
      dessin: panneau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré penché",
      sorte: "piege",
      question: `Noé tourne un carré. Il le pose sur une pointe.<br>Il dit : « Ce n'est plus un carré, c'est un losange. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Tourner une figure ne change ni ses côtés ni ses angles.<br>Il a toujours 4 côtés égaux et 4 angles droits.<br><span class="big">C'est toujours un carré</span> (un carré est aussi un losange).`,
      consigne: "Le carré posé sur une pointe est-il encore un carré ?",
      verification: { type: "qcm", choix: ["Oui, c'est toujours un carré", "Non, c'est un losange qui n'est pas un carré", "Non, c'est un rectangle"], bonne: 0 },
      dessin: penche,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les triangles cachés",
      sorte: "defi",
      question: `Un grand triangle est coupé par <b>deux traits</b> qui partent du sommet du haut.<br><br><b>Combien de triangles</b> vois-tu en tout ?`,
      reponse: `3 petits triangles.<br>2 triangles faits de 2 petits.<br>1 grand triangle fait des 3.<br>3 + 2 + 1 = <span class="big">6 triangles</span>.`,
      consigne: "Combien de triangles en tout ?",
      verification: { type: "courte", attendus: ["6"], unite: "triangles" },
      dessin: triangles,
    },
  ],
};

export default problemes;
