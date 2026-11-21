// Énigmes à projeter — CP, notion masse_contenance (les masses) : la pastèque
// et la cerise sur la balance, la pomme en cubes, le plus léger des animaux,
// l'orange et le citron, le piège du gros coussin et de la petite pierre, le
// défi du livre, des trousses et des cubes. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { balance, cubes } from "../dessins-cp";

const objet = (e: string, taille = 44) => (x: number, y: number) => t(x, y - 4, e, C.craie, taille);
const lesCubes = (n: number) => (x: number, y: number) => cubes(n, x, y);

const pasteque = svg(
  "Une balance : la pastèque descend, la cerise monte",
  balance(objet("🍉", 56), objet("🍒", 34), -1) + t(240, 395, `Le plus lourd${NB}?`, C.rose, 30)
);

const pomme = svg(
  "Une balance en équilibre : une pomme d'un côté, 3 cubes de l'autre",
  balance(objet("🍎"), lesCubes(3), 0) + t(240, 395, `La pomme = combien de cubes${NB}?`, C.rose, 26)
);

const animaux = svg(
  "Un éléphant, un chien, une fourmi",
  t(100, 220, "🐘", C.craie, 110) + t(270, 220, "🐕", C.craie, 70) + t(400, 220, "🐜", C.craie, 30) +
    t(100, 290, "éléphant", C.pale, 22) + t(270, 290, "chien", C.pale, 22) + t(400, 290, "fourmi", C.pale, 22) +
    t(240, 380, `Le plus léger${NB}?`, C.rose, 30)
);

const fruits = svg(
  "Deux balances en équilibre : l'orange vaut 4 cubes, le citron vaut 2 cubes",
  `<g transform="translate(0 30) scale(0.5)">${balance(objet("🍊", 60), (x, y) => cubes(4, x, y, 30), 0, 240, 200)}</g>` +
    `<g transform="translate(240 30) scale(0.5)">${balance(objet("🍋", 60), (x, y) => cubes(2, x, y, 30), 0, 240, 200)}</g>` +
    t(120, 290, "orange = 4 cubes", C.craie, 20) + t(360, 290, "citron = 2 cubes", C.craie, 20) +
    t(240, 360, `Le plus lourd${NB}?`, C.rose, 30)
);

const piege = svg(
  "Une balance : la petite pierre descend, le gros coussin monte",
  balance(objet("🪨", 30), (x, y) => t(x, y - 4, "🛋️", C.craie, 70), -1) + t(240, 395, `Le plus lourd${NB}?`, C.rose, 30)
);

const defi = svg(
  "Deux balances en équilibre : un livre vaut 2 trousses ; une trousse vaut 3 cubes",
  `<g transform="translate(0 30) scale(0.5)">${balance(objet("📕", 60), (x, y) => t(x - 30, y - 4, "👝", C.craie, 50) + t(x + 30, y - 4, "👝", C.craie, 50), 0, 240, 200)}</g>` +
    `<g transform="translate(240 30) scale(0.5)">${balance(objet("👝", 60), (x, y) => cubes(3, x, y, 30), 0, 240, 200)}</g>` +
    t(120, 290, "1 livre = 2 trousses", C.craie, 20) + t(360, 290, "1 trousse = 3 cubes", C.craie, 20) +
    t(240, 360, `Le livre = combien de cubes${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "masse_contenance",
  titre: "Énigmes sur les masses",
  description: "La pastèque et la cerise sur la balance, la pomme pesée en cubes, le plus léger des animaux, l'orange et le citron, le piège du gros coussin et de la petite pierre, le défi du livre et des trousses.",
  problemes: [
    {
      tag: "Énigme 1 · Le marché",
      titre: "La pastèque et la cerise",
      question: `Regarde la balance.<br><br>Qu'est-ce qui est le plus lourd ?`,
      reponse: `Le plateau qui descend<br>porte le plus lourd.<br><span class="big">La pastèque</span>.`,
      consigne: "Sur la balance, qu'est-ce qui est le plus lourd ?",
      verification: { type: "qcm", choix: ["La pastèque", "La cerise", "Pareil"], bonne: 0 },
      dessin: pasteque,
    },
    {
      tag: "Énigme 2 · La balance",
      titre: "La pomme en cubes",
      question: `La balance est droite.<br><br>La pomme pèse combien de cubes ?`,
      reponse: `Droite : c'est pareil.<br><span class="big">3 cubes</span>.`,
      consigne: "La pomme pèse combien de cubes ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: pomme,
    },
    {
      tag: "Énigme 3 · Le zoo",
      titre: "Le plus léger",
      question: `Quel animal est le plus léger ?`,
      reponse: `La fourmi est toute petite.<br><span class="big">La fourmi</span>.`,
      consigne: "Quel animal est le plus léger ?",
      verification: { type: "qcm", choix: ["L'éléphant", "Le chien", "La fourmi"], bonne: 2 },
      dessin: animaux,
    },
    {
      tag: "Énigme 4 · Les fruits",
      titre: "L'orange et le citron",
      question: `L'orange : <b>4</b> cubes.<br>Le citron : <b>2</b> cubes.<br><br>Lequel est le plus lourd ?`,
      reponse: `4 cubes, c'est plus que 2.<br><span class="big">L'orange</span>.`,
      consigne: "L'orange pèse 4 cubes, le citron 2. Lequel est le plus lourd ?",
      verification: { type: "qcm", choix: ["Le citron", "Pareil", "L'orange"], bonne: 2 },
      dessin: fruits,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Le coussin et la pierre",
      question: `Le coussin est très gros.<br><br>Qu'est-ce qui est le plus lourd ?`,
      reponse: `Gros ne veut pas dire lourd !<br>La pierre fait descendre.<br><span class="big">La pierre</span>.`,
      consigne: "Sur la balance, qu'est-ce qui est le plus lourd ?",
      verification: { type: "qcm", choix: ["Le coussin", "La pierre", "Pareil"], bonne: 1 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le livre et les trousses",
      question: `1 livre = <b>2</b> trousses.<br>1 trousse = <b>3</b> cubes.<br><br>Le livre = combien de cubes ?`,
      reponse: `3 + 3 = <span class="big">6 cubes</span>.`,
      consigne: "1 livre = 2 trousses, 1 trousse = 3 cubes. Le livre = combien de cubes ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
