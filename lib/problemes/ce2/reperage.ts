// Énigmes à projeter — CE2, notion repérage sur quadrillage (le coffre au
// trésor, la case D1, l'étagère des jouets, la bataille navale, le piège de
// la main droite, le défi du robot). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, grille } from "../dessins-ecole";

// Quadrillage A → E (colonnes) et 1 → 4 (lignes, 1 en bas), carreau de 60 px, coin haut gauche (90, 50).
const X0 = 90, Y0 = 50, PAS = 60;
const cx = (col: string) => X0 + ("ABCDE".indexOf(col) + 0.5) * PAS;
const cy = (lig: number) => Y0 + (4 - lig + 0.5) * PAS;
const plan = (corps: string) =>
  grille(X0, Y0, 5, 4, PAS, C.pale, 2) +
  "ABCDE".split("").map((c) => t(cx(c), Y0 + 4 * PAS + 30, c, C.bleu, 24)).join("") +
  [1, 2, 3, 4].map((n) => t(X0 - 22, cy(n) + 8, n, C.bleu, 24)).join("") + corps;

const tresor = svg(
  "Un quadrillage de A à E et de 1 à 4 ; le coffre est en colonne C, ligne 2",
  plan(t(cx("C"), cy(2) + 16, "💰", C.craie, 40) + t(cx("A"), cy(4) + 14, "🌴", C.craie, 36)) + t(240, 385, `La case du trésor${NB}?`, C.rose, 28)
);

const objets = svg(
  "Un quadrillage : un ballon en B4, une pomme en D1, une fleur en E3, un chat en A2",
  plan(t(cx("B"), cy(4) + 14, "⚽", C.craie, 36) + t(cx("D"), cy(1) + 14, "🍎", C.craie, 36) + t(cx("E"), cy(3) + 14, "🌼", C.craie, 36) + t(cx("A"), cy(2) + 14, "🐈", C.craie, 36)) +
    t(240, 385, `Qu'y a-t-il en D1${NB}?`, C.rose, 28)
);

const etagere = svg(
  "Une étagère, de gauche à droite : un ours, une poupée, un camion, un ballon",
  r(30, 230, 420, 16, C.jaune, 0.4, 3, 2) + ["🧸", "🪆", "🚚", "⚽"].map((e, i) => t(85 + i * 103, 220, e, C.craie, 64)).join("") +
    t(30, 290, "gauche", C.pale, 20, "start") + t(450, 290, "droite", C.pale, 20, "end") +
    t(240, 370, `À droite de la poupée${NB}?`, C.rose, 28)
);

const navale = svg(
  "Bataille navale : un bateau occupe B3, C3 et D3 ; on tire en C3",
  plan(r(cx("B") - 26, cy(3) - 20, 2 * PAS + 52, 40, C.bleu, 0.4, 3, 18) +
    l(cx("C") - 16, cy(3) - 16, cx("C") + 16, cy(3) + 16, C.rose, 5) + l(cx("C") + 16, cy(3) - 16, cx("C") - 16, cy(3) + 16, C.rose, 5)) +
    t(240, 385, `Tir en C3${NB}: que dire${NB}?`, C.rose, 28)
);

const main = svg(
  "Tom est face à toi ; il lève sa main droite, qui est du côté gauche de l'écran",
  o(240, 110, 40, C.craie, 0.1, 4) + t(240, 122, "🙂", C.craie, 44) + l(240, 150, 240, 270, C.craie, 6) +
    l(240, 180, 160, 100, C.rose, 6) + l(240, 180, 320, 230, C.craie, 6) + l(240, 270, 200, 350, C.craie, 6) + l(240, 270, 280, 350, C.craie, 6) +
    t(110, 85, "sa main droite", C.rose, 22) + t(240, 400, `De quel côté, pour toi${NB}?`, C.rose, 26)
);

const robot = svg(
  "Le robot part de la case A1 ; il va de 3 cases vers la droite puis de 2 cases vers le haut",
  plan(t(cx("A"), cy(1) + 14, "🤖", C.craie, 36)) +
    t(420, 110, "→ → →", C.jaune, 22) + t(420, 150, "puis", C.pale, 18) + t(420, 185, "↑ ↑", C.jaune, 22) +
    t(240, 385, `Où arrive le robot${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "reperage",
  titre: "Énigmes de repérage sur quadrillage",
  description: "La case du coffre au trésor, ce qui se cache en D1, l'étagère des jouets, la bataille navale, le piège de la main droite de Tom, le défi du robot qui se déplace.",
  problemes: [
    {
      tag: "Énigme 1 · L'île au trésor",
      titre: "La case du coffre",
      question: `Sur la carte, les colonnes ont une <b>lettre</b>.<br>Les lignes ont un <b>nombre</b>.<br><br>Dans quelle case est le trésor ?`,
      reponse: `On descend de la colonne : C.<br>On suit la ligne : 2.<br>La case <span class="big">C2</span>.`,
      consigne: "Dans quelle case est le trésor ?",
      verification: { type: "qcm", choix: ["B2", "C2", "C3"], bonne: 1 },
      dessin: tresor,
    },
    {
      tag: "Énigme 2 · La chasse aux objets",
      titre: "La case D1",
      question: `Trouve la colonne <b>D</b>.<br>Puis la ligne <b>1</b>.<br><br>Qu'y a-t-il dans la case D1 ?`,
      reponse: `Colonne D, ligne 1 (en bas).<br>C'est <span class="big">la pomme</span>.`,
      consigne: "Qu'y a-t-il dans la case D1 ?",
      verification: { type: "qcm", choix: ["la pomme", "le ballon", "la fleur"], bonne: 0 },
      dessin: objets,
    },
    {
      tag: "Énigme 3 · La chambre",
      titre: "L'étagère des jouets",
      question: `Sur l'étagère : l'ours, la poupée, le camion, le ballon.<br><br>Quel jouet est <b>juste à droite</b> de la poupée ?`,
      reponse: `On part de la poupée et on va vers la droite.<br>Juste à côté : <span class="big">le camion</span>.`,
      consigne: "Quel jouet est juste à droite de la poupée ?",
      verification: { type: "qcm", choix: ["l'ours", "le ballon", "le camion"], bonne: 2 },
      dessin: etagere,
    },
    {
      tag: "Énigme 4 · La bataille navale",
      titre: "Le tir en C3",
      question: `Le bateau occupe les cases <b>B3, C3 et D3</b>.<br>Ton ami tire en <b>C3</b>.<br><br>Que dis-tu ?`,
      reponse: `C3 est une case du bateau : il est touché.<br>Mais B3 et D3 restent : il n'est pas coulé.<br><span class="big">Touché</span>.`,
      consigne: "Le tir en C3 : que dis-tu ?",
      verification: { type: "qcm", choix: ["Dans l'eau", "Touché", "Coulé"], bonne: 1 },
      dessin: navale,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La main de Tom",
      sorte: "piege",
      question: `Tom est <b>face à toi</b>.<br>Il lève sa <b>main droite</b>.<br><br>De quel côté est-elle, pour toi ?`,
      reponse: `Le piège : la droite de Tom n'est pas ta droite.<br>Il te regarde : tout est inversé.<br>Sa main droite est <span class="big">à ta gauche</span>.`,
      consigne: "La main droite de Tom est de quel côté pour toi ?",
      verification: { type: "qcm", choix: ["À ta gauche", "À ta droite", "Au milieu"], bonne: 0 },
      dessin: main,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le robot",
      sorte: "defi",
      question: `Le robot part de la case <b>A1</b>.<br>Il avance de <b>3 cases vers la droite</b>.<br>Puis de <b>2 cases vers le haut</b>.<br><br>Dans quelle case arrive-t-il ?`,
      reponse: `A1 → B1 → C1 → D1 (3 cases à droite).<br>D1 → D2 → D3 (2 cases en haut).<br>Il arrive en <span class="big">D3</span>.`,
      consigne: "Dans quelle case arrive le robot ?",
      verification: { type: "courte", attendus: ["D3"] },
      dessin: robot,
    },
  ],
};

export default problemes;
