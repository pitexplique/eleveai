// Énigmes à projeter — CM2, notion probabilite (impossible, certain, possible ;
// la roue des couleurs ; les faces paires du dé ; le piège « après 4 piles,
// face a plus de chances » ; le défi des deux sachets de letchis). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, p, secteursCouleurs } from "../dessins-ecole";

const sac = (x: number, y: number, billes: string[]) =>
  p(`M${x - 80} ${y - 60} L${x + 80} ${y - 60} L${x + 100} ${y + 90} L${x - 100} ${y + 90} Z`, C.pale, 4, 0.08) +
  billes.map((c, i) => o(x - 60 + (i % 4) * 40, y - 20 + Math.floor(i / 4) * 40, 15, c, 0.6, 2)).join("");

const rouges = svg(
  "Un sac qui contient 5 billes rouges et aucune bille verte",
  sac(240, 170, [C.rose, C.rose, C.rose, C.rose, C.rose]) + t(240, 320, "5 billes rouges", C.craie, 24) + t(240, 370, `tirer une verte${NB}?`, C.rose, 26)
);

const de = svg(
  "Un dé à 6 faces",
  r(160, 90, 160, 160, C.craie, 0.05, 5, 22) + [[200, 130], [280, 130], [200, 170], [280, 170], [200, 210], [280, 210]].map(([x, y]) => o(x, y, 11, C.craie, 1, 0)).join("") +
    t(240, 320, "un nombre plus petit que 7", C.craie, 24) + t(240, 365, `certain, possible ou impossible${NB}?`, C.rose, 22)
);

// La roue : 8 parts égales, 3 jaunes et 5 bleues.
const roue = svg(
  "Une roue partagée en 8 parts égales : 3 jaunes et 5 bleues",
  secteursCouleurs(240, 190, 140, [C.jaune, C.bleu, C.bleu, C.jaune, C.bleu, C.bleu, C.jaune, C.bleu]) + p("M240 30 L228 8 L252 8 Z", C.rose, 3, 0.8) +
    t(240, 385, `la couleur qui a le plus de chances${NB}?`, C.rose, 22)
);

const pair = svg(
  "Les six faces d'un dé : 1, 2, 3, 4, 5, 6",
  [1, 2, 3, 4, 5, 6].map((n, i) => r(30 + i * 72, 130, 60, 60, C.craie, 0.04, 3, 10) + t(60 + i * 72, 172, n, C.craie, 32)).join("") +
    t(240, 280, `combien de faces paires${NB}?`, C.rose, 26)
);

const pieces = svg(
  "Une pièce lancée 4 fois : pile, pile, pile, pile ; et le 5e lancer ?",
  [0, 1, 2, 3].map((i) => o(70 + i * 85, 160, 34, C.jaune, 0.3, 4) + t(70 + i * 85, 168, "P", C.craie, 26)).join("") +
    o(410, 160, 34, C.rose, 0, 4).replace("/>", ' stroke-dasharray="8 6"/>') + t(410, 172, "?", C.rose, 34) +
    t(240, 270, "P = pile", C.pale, 20) + t(240, 330, `«${NB}maintenant, ce sera face${NB}!${NB}»`, C.craie, 24)
);

const letchis = svg(
  "Deux sachets de bonbons : sachet A, 2 au letchi et 2 à la menthe ; sachet B, 3 au letchi et 6 à la menthe",
  sac(125, 160, [C.rose, C.rose, C.bleu, C.bleu]) + t(125, 300, "sachet A", C.craie, 24) +
    sac(355, 160, [C.rose, C.rose, C.rose, C.bleu, C.bleu, C.bleu, C.bleu, C.bleu]) + o(355, 238, 15, C.bleu, 0.6, 2) + t(355, 300, "sachet B", C.craie, 24) +
    o(130, 355, 12, C.rose, 0.6, 2) + t(150, 362, "letchi", C.craie, 20, "start") + o(290, 355, 12, C.bleu, 0.6, 2) + t(310, 362, "menthe", C.craie, 20, "start")
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "probabilite",
  titre: "Énigmes sur les probabilités",
  description: "La bille verte, le dé et le nombre plus petit que 7, la roue des couleurs, les faces paires, le piège des quatre piles, le défi des sachets de bonbons au letchi.",
  problemes: [
    {
      tag: "Énigme 1 · Le sac de billes",
      titre: "La bille verte",
      question: `Un sac contient <b>5 billes rouges</b>. Rien d'autre.<br>On tire une bille sans regarder.<br><br>« Tirer une bille <b>verte</b> », c'est…`,
      reponse: `Il n'y a aucune bille verte dans le sac.<br>C'est <span class="big">impossible</span>.`,
      consigne: "Tirer une bille verte, c'est :",
      verification: { type: "qcm", choix: ["certain", "possible", "impossible"], bonne: 2 },
      dessin: rouges,
    },
    {
      tag: "Énigme 2 · Le jeu de dé",
      titre: "Plus petit que 7",
      question: `On lance un dé à 6 faces.<br><br>« Obtenir un nombre <b>plus petit que 7</b> », c'est…`,
      reponse: `Les faces vont de 1 à 6 : toutes sont plus petites que 7.<br>C'est <span class="big">certain</span>.`,
      consigne: "Obtenir un nombre plus petit que 7, c'est :",
      verification: { type: "qcm", choix: ["certain", "impossible", "possible"], bonne: 0 },
      dessin: de,
    },
    {
      tag: "Énigme 3 · La roue de la kermesse",
      titre: "La roue des couleurs",
      question: `La roue a <b>8 parts égales</b> : 3 jaunes et 5 bleues.<br>On la fait tourner.<br><br><b>Quelle couleur</b> a le plus de chances de sortir ?`,
      reponse: `Le bleu a 5 parts sur 8, le jaune 3 sur 8.<br><span class="big">Le bleu</span> a le plus de chances.`,
      consigne: "Quelle couleur a le plus de chances ?",
      verification: { type: "qcm", choix: ["Le jaune", "Le bleu", "Autant de chances"], bonne: 1 },
      dessin: roue,
    },
    {
      tag: "Énigme 4 · Le jeu de dé",
      titre: "Les nombres pairs",
      question: `On lance un dé à 6 faces.<br><br>Sur les 6 faces, <b>combien</b> donnent un nombre <b>pair</b> ?`,
      reponse: `Les nombres pairs : 2, 4 et 6.<br>Il y a <span class="big">3 faces</span> sur 6 : une chance sur deux.`,
      consigne: "Combien de faces du dé donnent un nombre pair ?",
      verification: { type: "courte", attendus: ["3"], unite: "faces" },
      dessin: pair,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les quatre piles",
      sorte: "piege",
      question: `Inès lance une pièce : pile, pile, pile, pile !<br>Elle dit : « Au 5e lancer, face a plus de chances. »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! La pièce ne se souvient pas des lancers d'avant.<br>À chaque lancer : une chance sur deux pour pile, une sur deux pour face.<br><span class="big">Autant de chances</span>.`,
      consigne: "Au 5e lancer :",
      verification: { type: "qcm", choix: ["face a plus de chances", "pile a plus de chances", "autant de chances"], bonne: 2 },
      dessin: pieces,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les bonbons au letchi",
      sorte: "defi",
      question: `Tu veux un bonbon au <b>letchi</b>. Tu tires sans regarder.<br>Sachet A : 2 au letchi, 2 à la menthe.<br>Sachet B : 3 au letchi, 6 à la menthe.<br><br><b>Quel sachet</b> choisis-tu ?`,
      reponse: `Sachet A : 2 letchis sur 4, la moitié.<br>Sachet B : 3 letchis sur 9, le tiers.<br>La moitié, c'est plus que le tiers : <span class="big">le sachet A</span>.`,
      consigne: "Quel sachet donne le plus de chances d'avoir un letchi ?",
      verification: { type: "qcm", choix: ["Le sachet A", "Le sachet B", "C'est pareil"], bonne: 0 },
      dessin: letchis,
    },
  ],
};

export default problemes;
