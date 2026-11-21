// Énigmes à projeter — CE1, notion repérage sur quadrillage (la carotte du
// potager, l'étagère à trois niveaux, la fourmi qui va vers la fleur, le
// poisson de l'aquarium, le piège de la ligne du haut, le défi des trois
// indices). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, grille } from "../dessins-ecole";

// Quadrillage A → D (colonnes) et 1 → 3 (lignes, 1 en bas), carreau de 70 px, coin haut gauche (100, 50).
const X0 = 100, Y0 = 50, PAS = 70;
const cx = (col: string) => X0 + ("ABCD".indexOf(col) + 0.5) * PAS;
const cy = (lig: number) => Y0 + (3 - lig + 0.5) * PAS;
const plan = (corps: string) =>
  grille(X0, Y0, 4, 3, PAS, C.pale, 2) +
  "ABCD".split("").map((c) => t(cx(c), Y0 + 3 * PAS + 32, c, C.bleu, 26)).join("") +
  [1, 2, 3].map((n) => t(X0 - 24, cy(n) + 9, n, C.bleu, 26)).join("") + corps;
const em = (col: string, lig: number, e: string) => t(cx(col), cy(lig) + 16, e, C.craie, 42);

const potager = svg(
  "Un potager quadrillé : une carotte en B3, une salade en D1, une tomate en A1",
  plan(em("B", 3, "🥕") + em("D", 1, "🥬") + em("A", 1, "🍅")) + t(240, 375, `La case de la carotte${NB}?`, C.rose, 28)
);

const etagere = svg(
  "Une étagère à 3 niveaux : en haut un livre, au milieu un ours, en bas un ballon",
  r(130, 50, 220, 270, C.jaune, 0.1, 4, 4) + l(130, 140, 350, 140, C.jaune, 4) + l(130, 230, 350, 230, C.jaune, 4) +
    t(240, 125, "📘", C.craie, 56) + t(240, 215, "🧸", C.craie, 56) + t(240, 305, "⚽", C.craie, 56) +
    t(240, 385, `Qu'y a-t-il sous l'ours${NB}?`, C.rose, 28)
);

const fourmi = svg(
  "Une bande de cases : la fourmi dans la 1re case, la fleur dans la 4e case",
  grille(60, 140, 6, 1, 60, C.pale, 2) + t(90, 186, "🐜", C.craie, 40) + t(270, 186, "🌸", C.craie, 40) +
    t(240, 300, "La fourmi va vers la droite.", C.pale, 24) + t(240, 370, `Combien de cases${NB}?`, C.rose, 30)
);

const aquarium = svg(
  "Un aquarium quadrillé : un poisson en C2, une étoile de mer en A1, une bulle en D3",
  plan(r(X0, Y0, 4 * PAS, 3 * PAS, C.bleu, 0.1, 0) + em("C", 2, "🐟") + em("A", 1, "⭐") + em("D", 3, "🫧")) +
    t(240, 375, `La case du poisson${NB}?`, C.rose, 28)
);

const soleil = svg(
  "Un quadrillage : lignes 1, 2, 3 (1 en bas) ; un soleil dans la ligne du haut",
  plan(em("C", 3, "☀️")) + t(240, 375, `La ligne du soleil${NB}?`, C.rose, 28)
);

const indices = svg(
  "Un quadrillage vide de A à D et de 1 à 3 ; trois indices",
  plan("") + t(240, 365, `Colonne B · pas la ligne 1 · sous la ligne 3`, C.jaune, 20) + t(240, 405, `Où suis-je${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "reperage",
  titre: "Énigmes de repérage sur quadrillage",
  description: "La case de la carotte dans le potager, l'étagère à trois niveaux, la fourmi qui va vers la fleur, le poisson de l'aquarium, le piège de la ligne du haut, le défi des trois indices.",
  problemes: [
    {
      tag: "Énigme 1 · Le potager",
      titre: "La carotte",
      question: `Le potager est quadrillé.<br>On lit la <b>lettre</b>, puis le <b>chiffre</b>.<br><br>Où est la carotte ?`,
      reponse: `La carotte est dans la colonne B.<br>Elle est sur la ligne 3.<br>Case <span class="big">B3</span>.`,
      consigne: "Dans quelle case est la carotte ?",
      verification: { type: "qcm", choix: ["B3", "D1", "A3"], bonne: 0 },
      dessin: potager,
    },
    {
      tag: "Énigme 2 · La chambre",
      titre: "L'étagère",
      question: `L'étagère a 3 niveaux.<br>L'ours est au milieu.<br><br>Qu'y a-t-il <b>sous</b> l'ours ?`,
      reponse: `Sous : plus bas.<br>Sous l'ours, il y a <span class="big">le ballon</span>.<br>Le livre est au-dessus.`,
      consigne: "Qu'y a-t-il sous l'ours ?",
      verification: { type: "qcm", choix: ["Le livre", "Le ballon", "Rien"], bonne: 1 },
      dessin: etagere,
    },
    {
      tag: "Énigme 3 · Le jardin",
      titre: "La fourmi",
      question: `La fourmi veut aller sur la fleur.<br>Elle avance case par case.<br><br>Combien de cases vers la droite ?`,
      reponse: `On compte les sauts, pas les cases de départ.<br>1, 2, 3.<br><span class="big">3 cases</span>.`,
      consigne: "Combien de cases vers la droite pour la fourmi ?",
      verification: { type: "courte", attendus: ["3"], unite: "cases" },
      dessin: fourmi,
    },
    {
      tag: "Énigme 4 · L'aquarium",
      titre: "Le poisson",
      question: `L'aquarium est quadrillé.<br><br>Dans quelle case est le poisson ?`,
      reponse: `Colonne C, ligne 2.<br>Case <span class="big">C2</span>.`,
      consigne: "Dans quelle case est le poisson ? (ex. A1)",
      verification: { type: "courte", attendus: ["C2"] },
      dessin: aquarium,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La ligne du haut",
      sorte: "piege",
      question: `Le soleil est dans la ligne <b>du haut</b>.<br><br>Quel est le numéro de cette ligne ?`,
      reponse: `Le piège : « en haut » fait penser à « 1 ».<br>Mais ici, la ligne 1 est <b>en bas</b>.<br>La ligne du haut : <span class="big">3</span>.`,
      consigne: "Quel est le numéro de la ligne du soleil ?",
      verification: { type: "qcm", choix: ["1", "A", "3"], bonne: 2 },
      dessin: soleil,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois indices",
      sorte: "defi",
      question: `Je suis dans la colonne <b>B</b>.<br>Je ne suis pas sur la ligne <b>1</b>.<br>Je suis <b>sous</b> la ligne 3.<br><br>Dans quelle case suis-je ?`,
      reponse: `Colonne B : B1, B2 ou B3.<br>Pas la ligne 1 : B2 ou B3.<br>Sous la ligne 3 : <span class="big">B2</span>.`,
      consigne: "Dans quelle case suis-je ? (ex. A1)",
      verification: { type: "courte", attendus: ["B2"] },
      dessin: indices,
    },
  ],
};

export default problemes;
