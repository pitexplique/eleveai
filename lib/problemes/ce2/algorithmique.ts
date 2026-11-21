// Énigmes à projeter — CE2, notion algorithmique (le lapin et son code, la
// souris et le fromage, le robot aspirateur, la flèche de l'abeille qui se
// trompe, le piège du robot qui tourne à sa droite, le défi de la répétition). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, o, fleche, grille } from "../dessins-ecole";

// Quadrillage A → F (colonnes) et 1 → 4 (lignes, 1 en bas), carreau de 60 px, coin haut gauche (60, 30).
const X0 = 60, Y0 = 30, PAS = 60;
const cx = (col: string) => X0 + ("ABCDEF".indexOf(col) + 0.5) * PAS;
const cy = (lig: number) => Y0 + (4 - lig + 0.5) * PAS;
const plan = (corps: string) =>
  grille(X0, Y0, 6, 4, PAS, C.pale, 2) +
  "ABCDEF".split("").map((c) => t(cx(c), Y0 + 4 * PAS + 28, c, C.bleu, 22)).join("") +
  [1, 2, 3, 4].map((n) => t(X0 - 20, cy(n) + 8, n, C.bleu, 22)).join("") + corps;
const mettre = (e: string, col: string, lig: number) => t(cx(col), cy(lig) + 13, e, C.craie, 36);

const lapin = svg(
  "Le lapin est en A1 ; son code est : droite, droite, droite, haut",
  plan(mettre("🐰", "A", 1)) + t(240, 345, "→ → → ↑", C.jaune, 32) + t(240, 395, `Où arrive le lapin${NB}?`, C.rose, 26)
);

const souris = svg(
  "La souris est en A1, le fromage en C3",
  plan(mettre("🐭", "A", 1) + mettre("🧀", "C", 3)) + t(240, 360, `Quel code mène au fromage${NB}?`, C.rose, 26)
);

const aspirateur = svg(
  "Le robot aspirateur est en A1, sa base de recharge en D3",
  plan(mettre("🤖", "A", 1) + mettre("🔌", "D", 3)) + t(240, 360, `Le code le plus court${NB}?`, C.rose, 26)
);

const abeille = svg(
  "L'abeille est en B2, la fleur en D3 ; le code écrit est : 1 droite, 2 bas, 3 droite",
  plan(mettre("🐝", "B", 2) + mettre("🌼", "D", 3)) +
    t(150, 345, "1", C.pale, 18) + t(240, 345, "2", C.pale, 18) + t(330, 345, "3", C.pale, 18) +
    t(150, 385, "→", C.jaune, 34) + t(240, 385, "↓", C.jaune, 34) + t(330, 385, "→", C.jaune, 34)
);

// Le robot vu de dessus : il regarde vers le bas de l'écran.
const robot = svg(
  "Le robot vu de dessus regarde vers le bas de l'écran",
  o(240, 150, 60, C.bleu, 0.25, 4) + o(220, 180, 8, C.craie, 1, 2) + o(260, 180, 8, C.craie, 1, 2) +
    fleche(240, 220, 240, 300, C.jaune, 5) + t(240, 330, "il regarde par ici", C.jaune, 20) +
    t(60, 155, "gauche", C.pale, 20) + t(60, 180, "de l'écran", C.pale, 18) + t(420, 155, "droite", C.pale, 20) + t(420, 180, "de l'écran", C.pale, 18) +
    t(240, 395, `Il tourne à SA droite${NB}!`, C.rose, 26)
);

const repete = svg(
  "Le robot est en A1 ; le programme dit : répète 3 fois (droite, haut)",
  plan(mettre("🤖", "A", 1)) + t(240, 345, "répète 3 fois : → ↑", C.jaune, 28) + t(240, 395, `Où arrive le robot${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "algorithmique",
  titre: "Énigmes d'algorithmique",
  description: "Le code de flèches du lapin, le bon code pour la souris et le fromage, le code le plus court du robot aspirateur, la flèche fausse de l'abeille, le piège du robot qui tourne à sa droite, le défi du programme qui se répète.",
  problemes: [
    {
      tag: "Énigme 1 · Le clapier",
      titre: "Le code du lapin",
      question: `Le lapin part de <b>A1</b>.<br>Chaque flèche le fait avancer d'une case.<br><br>Où arrive-t-il ?`,
      reponse: `Trois fois → : A1, B1, C1, D1.<br>Puis ↑ : D2.<br>Il arrive en <span class="big">D2</span>.`,
      consigne: "Dans quelle case arrive le lapin ?",
      verification: { type: "qcm", choix: ["C2", "D2", "D1"], bonne: 1 },
      dessin: lapin,
    },
    {
      tag: "Énigme 2 · La cuisine",
      titre: "La souris et le fromage",
      question: `La souris est en <b>A1</b>.<br>Le fromage est en <b>C3</b>.<br><br>Quel code la mène au fromage ?`,
      reponse: `→ → ↑ arrive en C2 : trop bas.<br>↑ ↑ → arrive en B3 : pas assez loin.<br>→ ↑ → ↑ arrive en C3.<br>C'est <span class="big">→ ↑ → ↑</span>.`,
      consigne: "Quel code mène la souris au fromage ?",
      verification: { type: "qcm", choix: ["→ → ↑", "↑ ↑ →", "→ ↑ → ↑"], bonne: 2 },
      dessin: souris,
    },
    {
      tag: "Énigme 3 · La maison",
      titre: "Le robot aspirateur",
      question: `Le robot aspirateur est en <b>A1</b>.<br>Sa base est en <b>D3</b>.<br><br>Combien de flèches, au <b>minimum</b> ?`,
      reponse: `De A à D : 3 flèches →.<br>De 1 à 3 : 2 flèches ↑.<br>3 + 2 = <span class="big">5 flèches</span>.`,
      consigne: "Combien de flèches au minimum pour aller à la base ?",
      verification: { type: "courte", attendus: ["5"], unite: "flèches" },
      dessin: aspirateur,
    },
    {
      tag: "Énigme 4 · Le jardin",
      titre: "La flèche fausse",
      question: `L'abeille veut aller sur la fleur.<br>Son code a <b>une flèche fausse</b>.<br><br>Laquelle ?`,
      reponse: `De B2, il faut aller 2 fois à droite et 1 fois en haut.<br>La flèche 2 descend : elle est fausse.<br>C'est <span class="big">la flèche 2</span>, il fallait ↑.`,
      consigne: "Quelle flèche est fausse dans le code de l'abeille ?",
      verification: { type: "qcm", choix: ["La flèche 2", "La flèche 1", "La flèche 3"], bonne: 0 },
      dessin: abeille,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le robot qui tourne",
      sorte: "piege",
      question: `Le robot regarde vers le <b>bas de l'écran</b>.<br>Il tourne à <b>sa droite</b>.<br><br>Vers où regarde-t-il maintenant ?`,
      reponse: `Le piège : sa droite n'est pas la droite de l'écran.<br>Il nous fait face, comme quelqu'un en face de toi.<br>Il regarde <span class="big">vers la gauche de l'écran</span>.`,
      consigne: "Vers où regarde le robot après avoir tourné à sa droite ?",
      verification: { type: "qcm", choix: ["Vers la droite de l'écran", "Vers la gauche de l'écran", "Vers le haut de l'écran"], bonne: 1 },
      dessin: robot,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le programme qui se répète",
      sorte: "defi",
      question: `Le robot part de <b>A1</b>.<br>Le programme dit : <b>répète 3 fois</b> → ↑.<br><br>Dans quelle case arrive-t-il ?`,
      reponse: `1re fois : B2.<br>2e fois : C3.<br>3e fois : D4.<br>Il arrive en <span class="big">D4</span>.`,
      consigne: "Dans quelle case arrive le robot ?",
      verification: { type: "courte", attendus: ["D4"] },
      dessin: repete,
    },
  ],
};

export default problemes;
