// Énigmes à projeter — CP, notion algorithmique (instructions et déplacements
// codés) : le robot qui suit → → ↑, la flèche vers la maison, les flèches
// jusqu'au trésor, le bon code vers l'étoile, le piège de la case de départ,
// le défi du rocher à contourner. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, grille } from "../dessins-ecole";

const X0 = 65, Y0 = 50, PAS = 70;
const cx = (c: number) => X0 + PAS * c + PAS / 2;
const cy = (l: number) => Y0 + PAS * l + PAS / 2;
const dans = (c: number, l: number, e: string, taille = 42) => t(cx(c), cy(l) + 15, e, C.craie, taille);
const plateau = (objets: [number, number, string][]) => grille(X0, Y0, 5, 3, PAS) + objets.map(([c, l, e]) => dans(c, l, e)).join("");
const code = (s: string, y = 310) => r(140, y - 36, 200, 52, C.bleu, 0.15, 3, 10) + t(240, y + 2, s, C.bleu, 34);

const suivre = svg(
  "Un quadrillage : le robot en bas à gauche, une fraise, une banane, du raisin ; le code est → → ↑",
  plateau([[0, 2, "🤖"], [2, 1, "🍓"], [3, 2, "🍌"], [2, 0, "🍇"]]) + code("→  →  ↑") +
    t(240, 395, `Où arrive le robot${NB}?`, C.rose, 28)
);

const maison = svg(
  "Un quadrillage : le robot, et la maison juste à sa droite",
  plateau([[1, 1, "🤖"], [2, 1, "🏠"]]) + t(240, 340, `Quelle flèche${NB}?`, C.rose, 30)
);

const tresor = svg(
  "Un quadrillage : le robot à gauche, le trésor sur la même ligne, 3 cases plus loin",
  plateau([[0, 1, "🤖"], [3, 1, "💎"]]) + t(240, 340, `Combien de flèches →${NB}?`, C.rose, 30)
);

const etoile = svg(
  "Un quadrillage : le robot en bas à gauche, l'étoile en haut, une colonne plus à droite",
  plateau([[0, 2, "🤖"], [1, 0, "⭐"]]) +
    t(85, 320, "A : ↑ → →", C.craie, 28, "start") + t(85, 355, "B : → ↑ ↑", C.craie, 28, "start") + t(85, 390, "C : ↑ ↑ ↑", C.craie, 28, "start") +
    t(400, 355, `Le bon code${NB}?`, C.rose, 24)
);

const piege = svg(
  "Une bande de 6 cases numérotées de 1 à 6 ; le robot est sur la case 2",
  [0, 1, 2, 3, 4, 5].map((i) => r(30 + i * 70, 150, 70, 70, C.craie, 0, 3) + t(65 + i * 70, 250, i + 1, C.pale, 24)).join("") +
    t(135, 202, "🤖", C.craie, 42) + code("avance de 3", 90) +
    t(240, 350, `Sur quelle case${NB}?`, C.rose, 30)
);

const defi = svg(
  "Un quadrillage : le robot, un rocher juste à sa droite, puis le drapeau",
  plateau([[0, 1, "🤖"], [1, 1, "🪨"], [2, 1, "🚩"]]) +
    t(240, 320, "On ne passe pas sur le rocher.", C.pale, 22) + t(240, 375, `Le moins de flèches${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "algorithmique",
  titre: "Énigmes de déplacements codés",
  description: "Suivre le code → → ↑ du robot, la flèche vers la maison, les flèches jusqu'au trésor, le bon code vers l'étoile, le piège de la case de départ, le défi du rocher à contourner.",
  problemes: [
    {
      tag: "Énigme 1 · Le robot gourmand",
      titre: "Suivre le code",
      question: `Le robot suit le code.<br><br>Où arrive-t-il ?`,
      reponse: `→ : une case.<br>→ : une case.<br>↑ : une case en haut.<br><span class="big">La fraise</span>.`,
      consigne: "Le robot suit → → ↑. Où arrive-t-il ?",
      verification: { type: "qcm", choix: ["La banane", "Le raisin", "La fraise"], bonne: 2 },
      dessin: suivre,
    },
    {
      tag: "Énigme 2 · La maison",
      titre: "Rentrer à la maison",
      question: `Quelle flèche pour aller à la maison ?`,
      reponse: `La maison est à droite.<br><span class="big">→</span>.`,
      consigne: "Quelle flèche mène le robot à la maison ?",
      verification: { type: "qcm", choix: ["→", "↑", "←"], bonne: 0 },
      dessin: maison,
    },
    {
      tag: "Énigme 3 · Le trésor",
      titre: "Les flèches du trésor",
      question: `Combien de flèches → pour le trésor ?`,
      reponse: `Une flèche, une case.<br>→ → →<br><span class="big">3 flèches</span>.`,
      consigne: "Combien de flèches → pour aller au trésor ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: tresor,
    },
    {
      tag: "Énigme 4 · L'étoile",
      titre: "Le bon code",
      question: `Quel code mène à l'étoile ?`,
      reponse: `→ puis ↑ ↑.<br><span class="big">Le code B</span>.`,
      consigne: "Quel code mène le robot à l'étoile ?",
      verification: { type: "qcm", choix: ["A : ↑ → →", "B : → ↑ ↑", "C : ↑ ↑ ↑"], bonne: 1 },
      dessin: etoile,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "La case de départ",
      question: `Le robot avance de <b>3</b> cases.<br><br>Sur quelle case arrive-t-il ?`,
      reponse: `On ne compte pas la case de départ !<br>3, 4, 5.<br><span class="big">Case 5</span>.`,
      consigne: "Le robot est sur la case 2. Il avance de 3 cases. Sur quelle case arrive-t-il ?",
      verification: { type: "qcm", choix: ["Case 4", "Case 5", "Case 3"], bonne: 1 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le rocher",
      question: `Un rocher bloque le chemin.<br><br>Combien de flèches, au moins ?`,
      reponse: `↑ → → ↓<br>On fait le tour du rocher.<br><span class="big">4 flèches</span>.`,
      consigne: "Le robot contourne le rocher pour aller au drapeau. Combien de flèches, au moins ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
