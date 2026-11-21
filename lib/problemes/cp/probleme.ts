// Énigmes à projeter — CP, notion probleme : le panier de pommes, le bus qui
// se vide, les cerises par deux, les enfants et les chaises, le piège des
// vaches et des moutons, le défi des deux tours de cubes. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, fleche } from "../dessins-ecole";
import { rang } from "../dessins-cp";

const panier = svg(
  "Papa met 5 pommes dans le panier, Maman en met 3",
  t(90, 90, "Papa", C.craie, 24) + rang("🍎", 5, 30, 140, 32, 28) +
    t(390, 90, "Maman", C.craie, 24) + rang("🍎", 3, 358, 140, 32, 28) +
    fleche(110, 170, 200, 230, C.pale, 3) + fleche(390, 170, 290, 230, C.pale, 3) +
    p("M170 240 L310 240 L290 320 L190 320 Z", C.jaune, 3, 0.25) + t(240, 290, "🧺", C.craie, 40) +
    t(240, 385, `Combien de pommes${NB}?`, C.rose, 30)
);

const bus = svg(
  "Un bus avec 9 enfants ; 4 enfants descendent",
  r(30, 100, 300, 130, C.jaune, 0.25, 3, 14) + rang("🙂", 5, 70, 170, 52, 32) + o(90, 238, 18, C.craie, 0, 3) + o(270, 238, 18, C.craie, 0, 3) +
    t(240, 70, "9 enfants dans le bus", C.craie, 24) +
    rang("🙂", 4, 360, 300, 32, 26) + fleche(330, 200, 400, 260, C.rose, 3) + t(410, 340, "4 descendent", C.pale, 20) +
    t(170, 385, `Combien restent${NB}?`, C.rose, 28)
);

const cerises = svg(
  "3 enfants ; chacun reçoit 2 cerises",
  [0, 1, 2].map((i) => t(100 + i * 140, 140, "🧒", C.craie, 50) + rang("🍒", 2, 80 + i * 140, 220, 40, 32)).join("") +
    t(240, 290, "2 cerises chacun", C.pale, 24) + t(240, 370, `Combien de cerises${NB}?`, C.rose, 30)
);

const chaises = svg(
  "6 enfants et 4 chaises ; un enfant par chaise",
  rang("🧒", 6, 50, 140, 76, 44) + rang("🪑", 4, 50, 250, 76, 44) +
    t(240, 370, `Combien restent debout${NB}?`, C.rose, 28)
);

const piege = svg(
  "Dans le pré : 3 vaches et 4 moutons",
  r(20, 90, 440, 200, C.pale, 0.1, 2, 20) + rang("🐄", 3, 80, 160, 70, 48) + rang("🐑", 4, 120, 250, 70, 44) +
    t(240, 370, `Combien de vaches${NB}?`, C.rose, 30)
);

const defi = svg(
  "Une tour rose de 5 cubes et une tour bleue de 2 cubes",
  l(60, 300, 420, 300, C.pale, 3) +
    [0, 1, 2, 3, 4].map((i) => r(120, 250 - i * 40, 40, 40, C.rose, 0.35, 3, 3)).join("") +
    [0, 1].map((i) => r(300, 250 - i * 40, 40, 40, C.bleu, 0.35, 3, 3)).join("") +
    t(140, 335, "5 cubes", C.craie, 22) + t(320, 335, "2 cubes", C.craie, 22) +
    t(240, 395, `Combien de cubes pour être pareil${NB}?`, C.rose, 24)
);


const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "probleme",
  titre: "Énigmes : petits problèmes",
  description: "Le panier de pommes de Papa et Maman, le bus qui se vide, les cerises par deux, les enfants et les chaises, le piège des vaches et des moutons, le défi des deux tours de cubes.",
  problemes: [
    {
      tag: "Énigme 1 · Le panier",
      titre: "Les pommes",
      question: `Papa met <b>5</b> pommes.<br>Maman met <b>3</b> pommes.<br><br>Combien dans le panier ?`,
      reponse: `5 + 3 = <span class="big">8 pommes</span>.`,
      consigne: "Papa met 5 pommes, Maman 3. Combien dans le panier ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: panier,
    },
    {
      tag: "Énigme 2 · Le bus",
      titre: "Le bus de l'école",
      question: `<b>9</b> enfants dans le bus.<br><b>4</b> descendent.<br><br>Combien restent ?`,
      reponse: `9 − 4 = <span class="big">5 enfants</span>.`,
      consigne: "9 enfants, 4 descendent : combien restent dans le bus ?",
      verification: { type: "qcm", choix: ["13", "4", "5"], bonne: 2 },
      dessin: bus,
    },
    {
      tag: "Énigme 3 · Le goûter",
      titre: "Les cerises",
      question: `<b>3</b> enfants.<br><b>2</b> cerises chacun.<br><br>Combien de cerises ?`,
      reponse: `2 + 2 + 2 = <span class="big">6 cerises</span>.`,
      consigne: "3 enfants, 2 cerises chacun : combien de cerises ?",
      verification: { type: "qcm", choix: ["6", "5", "2"], bonne: 0 },
      dessin: cerises,
    },
    {
      tag: "Énigme 4 · La ronde",
      titre: "Les chaises",
      question: `<b>6</b> enfants, <b>4</b> chaises.<br>Un enfant par chaise.<br><br>Combien restent debout ?`,
      reponse: `6 − 4 = <span class="big">2 enfants</span>.`,
      consigne: "6 enfants, 4 chaises : combien restent debout ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: chaises,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Le pré",
      question: `<b>3</b> vaches et <b>4</b> moutons.<br><br>Combien de vaches ?`,
      reponse: `On ne compte que les vaches !<br><span class="big">3 vaches</span>.`,
      consigne: "3 vaches et 4 moutons : combien de vaches ?",
      verification: { type: "qcm", choix: ["3", "7", "4"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux tours",
      question: `Tour rose : <b>5</b> cubes.<br>Tour bleue : <b>2</b> cubes.<br><br>Combien de cubes ajouter à la bleue ?`,
      reponse: `2 + 3 = 5.<br><span class="big">3 cubes</span>.`,
      consigne: "Tour rose 5 cubes, tour bleue 2 : combien de cubes ajouter à la bleue ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
