// Énigmes à projeter — CM1, notion probabilités simples (le tiroir de
// chaussettes : certain, possible, impossible ; la phrase du hasard ; les deux
// boîtes de jetons ; tous les menus de la cantine ; le piège des trois « face » ;
// le défi des jetons à ajouter). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, o } from "../dessins-ecole";

const chaussette = (x: number, y: number) =>
  p(`M${x} ${y} L${x + 24} ${y} L${x + 24} ${y + 50} L${x + 46} ${y + 62} Q${x + 54} ${y + 82} ${x + 32} ${y + 82} L${x} ${y + 68} Z`, C.bleu, 3, 0.4);
const tiroir = svg(
  "Un tiroir ouvert avec 4 chaussettes bleues",
  r(70, 110, 340, 170, C.pale, 0.15, 3, 10) + r(60, 270, 360, 50, C.craie, 0.15, 3, 8) + o(240, 295, 8, C.craie, 1, 2) +
    chaussette(100, 150) + chaussette(175, 150) + chaussette(250, 150) + chaussette(325, 150) +
    t(240, 70, "4 chaussettes bleues", C.craie, 24) + t(240, 385, `Une rose${NB}?`, C.rose, 28)
);

const piece = svg(
  "Une pièce de monnaie lancée en l'air, avec un point d'interrogation",
  o(240, 180, 90, C.jaune, 0.35, 5) + o(240, 180, 70, C.jaune, 0, 2) + t(240, 200, "?", C.craie, 64) +
    t(240, 385, `pile ou face${NB}?`, C.rose, 28)
);

const jeton = (x: number, y: number, c: string) => o(x, y, 20, c, 0.5, 3);
const boites = svg(
  "Boîte A : 3 jetons jaunes et 1 bleu. Boîte B : 1 jeton jaune et 3 bleus",
  r(40, 110, 180, 170, C.craie, 0, 3, 10) + r(260, 110, 180, 170, C.craie, 0, 3, 10) +
    t(130, 90, "boîte A", C.craie, 26) + t(350, 90, "boîte B", C.craie, 26) +
    jeton(95, 165, C.jaune) + jeton(165, 165, C.jaune) + jeton(95, 230, C.jaune) + jeton(165, 230, C.bleu) +
    jeton(315, 165, C.bleu) + jeton(385, 165, C.bleu) + jeton(315, 230, C.jaune) + jeton(385, 230, C.bleu) +
    t(240, 370, `Pour un jaune${NB}?`, C.rose, 28)
);

const menus = svg(
  "La cantine : entrée carottes ou tomates ; dessert glace, fruit ou yaourt",
  t(130, 60, "entrée", C.craie, 26) + t(350, 60, "dessert", C.craie, 26) +
    r(50, 90, 160, 70, C.jaune, 0.15, 3, 10) + t(130, 135, "🥕 carottes", C.craie, 22) +
    r(50, 190, 160, 70, C.jaune, 0.15, 3, 10) + t(130, 235, "🍅 tomates", C.craie, 22) +
    r(270, 80, 160, 60, C.bleu, 0.15, 3, 10) + t(350, 120, "🍦 glace", C.craie, 22) +
    r(270, 160, 160, 60, C.bleu, 0.15, 3, 10) + t(350, 200, "🍎 fruit", C.craie, 22) +
    r(270, 240, 160, 60, C.bleu, 0.15, 3, 10) + t(350, 280, "🥛 yaourt", C.craie, 22) +
    t(240, 370, `Combien de menus${NB}?`, C.rose, 28)
);

const lancers = svg(
  "Trois pièces tombées sur face, puis une quatrième avec un point d'interrogation",
  [1, 2, 3].map((k) => o(20 + k * 95, 190, 40, C.jaune, 0.35, 4) + t(20 + k * 95, 200, "face", C.craie, 20) + t(20 + k * 95, 270, `${k}ᵉ`, C.pale, 20)).join("") +
    o(400, 190, 40, C.rose, 0.2, 4) + t(400, 204, "?", C.rose, 40) + t(400, 270, "4ᵉ", C.pale, 20) +
    t(240, 370, `Et le 4ᵉ lancer${NB}?`, C.rose, 28)
);

const sac = svg(
  "Un sac avec 2 jetons jaunes et 5 jetons bleus ; on veut ajouter des jetons jaunes",
  p("M110 140 Q100 330 240 330 Q380 330 370 140 Z", C.pale, 4, 0.12) + p("M150 140 Q240 100 330 140", C.pale, 4) +
    jeton(170, 190, C.jaune) + jeton(230, 190, C.jaune) + jeton(290, 190, C.bleu) +
    jeton(170, 250, C.bleu) + jeton(230, 250, C.bleu) + jeton(290, 250, C.bleu) + jeton(240, 300, C.bleu) +
    jeton(420, 120, C.jaune) + t(420, 80, "+ ?", C.rose, 30) +
    t(240, 385, `Plus de chances pour le jaune${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "probabilite",
  titre: "Énigmes de probabilités",
  description: "Le tiroir de chaussettes (certain, possible ou impossible), la phrase du hasard, les deux boîtes de jetons, tous les menus de la cantine, le piège des trois « face », le défi des jetons à ajouter.",
  problemes: [
    {
      tag: "Énigme 1 · Le tiroir",
      titre: "Certain, possible ou impossible ?",
      question: `Dans le tiroir, il y a <b>4 chaussettes bleues</b>. Rien d'autre.<br>Tom en prend une sans regarder.<br><br>Prendre une chaussette <b>rose</b>, c'est…`,
      reponse: `Il n'y a aucune chaussette rose.<br>C'est <span class="big">impossible</span>.`,
      consigne: "Tom prend une chaussette sans regarder. Prendre une chaussette rose, c'est :",
      verification: { type: "qcm", choix: ["certain", "possible", "impossible"], bonne: 2 },
      dessin: tiroir,
    },
    {
      tag: "Énigme 2 · Le hasard",
      titre: "Quelle phrase parle du hasard ?",
      question: `Une seule phrase parle du <b>hasard</b>.<br>On ne peut pas savoir à l'avance.<br><br>Laquelle ?`,
      reponse: `Après lundi, c'est toujours mardi. 2 + 2 fait toujours 4.<br>La pièce, on ne sait pas : <span class="big">c'est le hasard</span>.`,
      consigne: "Quelle phrase parle du hasard ?",
      verification: { type: "qcm", choix: ["Après lundi vient mardi.", "La pièce tombera sur pile.", "2 + 2 font 4."], bonne: 1 },
      dessin: piece,
    },
    {
      tag: "Énigme 3 · Les deux boîtes",
      titre: "Comparer les chances",
      question: `Lina veut tirer un jeton <b>jaune</b>, sans regarder.<br><br>Dans quelle boîte a-t-elle le <b>plus de chances</b> ?`,
      reponse: `Boîte A : 3 jaunes sur 4 jetons.<br>Boîte B : 1 jaune sur 4 jetons.<br>Elle choisit <span class="big">la boîte A</span>.`,
      consigne: "Dans quelle boîte Lina a-t-elle le plus de chances de tirer un jeton jaune ?",
      verification: { type: "qcm", choix: ["la boîte A", "la boîte B", "autant dans les deux"], bonne: 0 },
      dessin: boites,
    },
    {
      tag: "Énigme 4 · La cantine",
      titre: "Tous les menus",
      question: `À la cantine, on choisit <b>une entrée</b> et <b>un dessert</b>.<br><br>Combien de <b>menus différents</b> peut-on faire ?`,
      reponse: `Avec les carottes : 3 desserts, donc 3 menus.<br>Avec les tomates : encore 3 menus.<br>3 + 3 = <span class="big">6 menus</span>.`,
      consigne: "Combien de menus différents (une entrée et un dessert) peut-on faire ?",
      verification: { type: "courte", attendus: ["6"], unite: "menus" },
      dessin: menus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Trois fois face",
      sorte: "piege",
      question: `Inès lance une pièce. Elle tombe <b>3 fois</b> sur face.<br>Elle la lance une <b>4ᵉ fois</b>.<br><br>Que peut-on dire ?`,
      reponse: `Le piège : croire que pile « doit » sortir.<br>La pièce ne se souvient de rien.<br><span class="big">Autant de chances</span> pour pile et pour face.`,
      consigne: "Au 4e lancer, que peut-on dire ?",
      verification: { type: "qcm", choix: ["Autant de chances pour pile et pour face.", "Plus de chances pour pile.", "Plus de chances pour face."], bonne: 0 },
      dessin: lancers,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les jetons à ajouter",
      sorte: "defi",
      question: `Le sac a <b>2 jetons jaunes</b> et <b>5 bleus</b>.<br>On ajoute des jetons jaunes.<br><br>Combien <b>au moins</b> pour avoir plus de chances de tirer jaune ?`,
      reponse: `Il faut plus de jaunes que de bleus : au moins 6 jaunes.<br>6 − 2 = <span class="big">4 jetons</span> à ajouter.`,
      consigne: "Combien de jetons jaunes faut-il ajouter, au moins, pour avoir plus de chances de tirer jaune que bleu ?",
      verification: { type: "courte", attendus: ["4"], unite: "jetons" },
      dessin: sac,
    },
  ],
};

export default problemes;
