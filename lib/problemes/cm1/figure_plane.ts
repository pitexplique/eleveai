// Énigmes à projeter — CM1, notion figures planes (les triangles du tangram, le
// quadrilatère aux 4 angles droits, le plat du gâteau rond, l'écrou à 6 côtés,
// le piège du carré-rectangle, le défi des carrés cachés). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

// Le tangram dans un carré de 4 unités (1 unité = 60 px), coin en (120, 50).
const u = (x: number, y: number) => `${120 + x * 60} ${50 + y * 60}`;
const piece = (pts: number[][], c: string) => p(`M${pts.map(([x, y]) => u(x, y)).join(" L")} Z`, c, 3, 0.35);
const tangram = svg(
  "Un tangram : 7 pièces dans un carré",
  piece([[0, 0], [4, 0], [2, 2]], C.rose) + piece([[0, 0], [0, 4], [2, 2]], C.bleu) + piece([[4, 2], [4, 4], [2, 4]], C.jaune) +
    piece([[2, 2], [3, 3], [2, 4], [1, 3]], C.pale) + piece([[0, 4], [1, 3], [2, 4]], C.rose) + piece([[2, 2], [3, 1], [3, 3]], C.bleu) +
    piece([[3, 1], [4, 0], [4, 2], [3, 3]], C.jaune) + t(240, 340, "7 pièces", C.craie, 24) + t(240, 390, `Combien de triangles${NB}?`, C.rose, 26)
);

const mystere = svg(
  "Un quadrilatère caché : 4 côtés égaux, 4 angles droits",
  r(170, 70, 140, 140, C.craie, 0.05, 3, 8) + t(240, 165, "?", C.rose, 70) +
    t(240, 260, "4 côtés égaux", C.bleu, 26) + t(240, 305, "4 angles droits", C.bleu, 26) + t(240, 375, `Qui suis-je${NB}?`, C.rose, 28)
);

const gateau = svg(
  "Un gâteau rond de 12 cm de rayon",
  o(240, 180, 130, C.jaune, 0.25, 5) + o(240, 180, 5, C.craie, 1, 2) + l(240, 180, 370, 180, C.rose, 4) + t(305, 165, "12 cm", C.rose, 22) +
    t(240, 360, `le diamètre${NB}?`, C.craie, 28)
);

const hex = Array.from({ length: 6 }, (_, k) => `${(240 + 120 * Math.cos((Math.PI / 3) * k)).toFixed(1)} ${(180 + 120 * Math.sin((Math.PI / 3) * k)).toFixed(1)}`);
const ecrou = svg(
  "Un écrou en forme d'hexagone",
  p(`M${hex.join(" L")} Z`, C.pale, 5, 0.3) + o(240, 180, 50, C.craie, 0, 4) + t(240, 360, `Combien de côtés${NB}?`, C.rose, 28)
);

const carreRect = svg(
  "Un carré et un rectangle",
  r(60, 120, 140, 140, C.bleu, 0.25, 4) + t(130, 300, "carré", C.craie, 24) + r(260, 140, 170, 100, C.jaune, 0.25, 4) + t(345, 300, "rectangle", C.craie, 24) +
    t(240, 380, `Un carré est-il un rectangle${NB}?`, C.rose, 24)
);

const caches = svg(
  "Une grille de 2 carreaux sur 2",
  r(140, 70, 200, 200, C.bleu, 0.15, 5) + l(240, 70, 240, 270, C.bleu, 5) + l(140, 170, 340, 170, C.bleu, 5) +
    t(240, 350, `Combien de carrés en tout${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "figure_plane",
  titre: "Énigmes sur les figures planes",
  description: "Les triangles du tangram, le quadrilatère aux 4 angles droits, le diamètre du gâteau rond, l'écrou à 6 côtés, le piège du carré qui est aussi un rectangle, le défi des carrés cachés.",
  problemes: [
    {
      tag: "Énigme 1 · Le tangram",
      titre: "Les pièces du puzzle",
      question: `Le tangram est un puzzle de <b>7 pièces</b>.<br><br>Combien de pièces sont des <b>triangles</b> ?`,
      reponse: `2 grands, 1 moyen, 2 petits triangles.<br>Les autres : un carré et un parallélogramme.<br><span class="big">5 triangles</span>.`,
      consigne: "Combien de triangles dans le tangram ?",
      verification: { type: "courte", attendus: ["5"], unite: "triangles" },
      dessin: tangram,
    },
    {
      tag: "Énigme 2 · Qui suis-je ?",
      titre: "Le quadrilatère caché",
      question: `J'ai <b>4 côtés égaux</b>.<br>J'ai <b>4 angles droits</b>.<br><br><b>Qui suis-je</b> ?`,
      reponse: `Le losange a 4 côtés égaux, mais pas forcément d'angle droit.<br>Le rectangle a 4 angles droits, mais pas 4 côtés égaux.<br>Je suis <span class="big">le carré</span>.`,
      consigne: "Quel quadrilatère a 4 côtés égaux et 4 angles droits ?",
      verification: { type: "qcm", choix: ["le losange", "le rectangle", "le carré"], bonne: 2 },
      dessin: mystere,
    },
    {
      tag: "Énigme 3 · La pâtisserie",
      titre: "Le gâteau rond",
      question: `Le gâteau rond a un <b>rayon de 12 cm</b>.<br><br>Quel est son <b>diamètre</b> ?`,
      reponse: `Le diamètre traverse tout le cercle : c'est 2 rayons.<br>2 × 12 = <span class="big">24 cm</span>.`,
      consigne: "Quel est le diamètre du gâteau ?",
      verification: { type: "courte", attendus: ["24"], unite: "cm" },
      dessin: gateau,
    },
    {
      tag: "Énigme 4 · Le bricolage",
      titre: "L'écrou",
      question: `L'écrou a la forme d'un <b>hexagone</b>.<br><br>Combien de <b>côtés</b> a-t-il ?`,
      reponse: `« Hexa » veut dire six.<br>Un hexagone a <span class="big">6 côtés</span>.`,
      consigne: "Combien de côtés a un hexagone ?",
      verification: { type: "courte", attendus: ["6"], unite: "côtés" },
      dessin: ecrou,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Carré ou rectangle ?",
      sorte: "piege",
      question: `Un rectangle a <b>4 angles droits</b>.<br><br>Un <b>carré</b> est-il aussi un rectangle ?`,
      reponse: `Le piège : on pense qu'un rectangle doit être allongé.<br>Mais le carré a bien 4 angles droits.<br><span class="big">Oui</span> : un carré est un rectangle particulier.`,
      consigne: "Un carré est-il un rectangle ?",
      verification: { type: "qcm", choix: ["oui", "non", "seulement s'il est grand"], bonne: 0 },
      dessin: carreRect,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les carrés cachés",
      sorte: "defi",
      question: `La grille a <b>2 carreaux sur 2</b>.<br><br>Combien de <b>carrés</b> vois-tu en tout ?`,
      reponse: `4 petits carrés.<br>Et le grand carré qui les entoure : 1.<br>4 + 1 = <span class="big">5 carrés</span>.`,
      consigne: "Combien de carrés en tout dans la grille ?",
      verification: { type: "courte", attendus: ["5"], unite: "carrés" },
      dessin: caches,
    },
  ],
};

export default problemes;
