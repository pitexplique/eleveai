// Énigmes à projeter — 5e, notion algo_programmation (lire et exécuter un
// programme, façon Scratch). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Un bloc de programme : rectangle arrondi + texte.
const bloc = (x: number, y: number, w: number, txt: string, c: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="40" rx="8" fill="${c}" fill-opacity=".2" stroke="${c}" stroke-width="3"/>` +
  `<text x="${x + 14}" y="${y + 28}" fill="${C.craie}" font-size="21">${txt}</text>`;
// Une boucle « répéter » qui entoure k blocs.
const boucle = (x: number, y: number, w: number, titre: string, k: number) =>
  `<path d="M${x} ${y} L${x + w} ${y} L${x + w} ${y + 40} L${x + 26} ${y + 40} L${x + 26} ${y + 40 + 46 * k} L${x + w} ${y + 40 + 46 * k} L${x + w} ${y + 76 + 46 * k} L${x} ${y + 76 + 46 * k} Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>` +
  `<text x="${x + 14}" y="${y + 28}" fill="${C.craie}" font-size="21">${titre}</text>`;

const calcul = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme de calcul : choisir 5, multiplier par 3, ajouter 4">
  ${bloc(90, 60, 300, "Choisir un nombre : 5", C.bleu)}
  ${bloc(90, 130, 300, "Le multiplier par 3", C.rose)}
  ${bloc(90, 200, 300, "Ajouter 4", C.rose)}
  ${bloc(90, 270, 300, "Dire le résultat", C.bleu)}
  <text x="240" y="370" fill="${C.jaune}" font-size="30" text-anchor="middle">le lutin dit : ?</text>
  </svg>`;

const figure = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme : répéter 4 fois avancer de 50, tourner de 90 degrés">
  ${bloc(70, 50, 300, "quand le drapeau est cliqué", C.jaune)}
  ${boucle(70, 100, 300, "répéter 4 fois", 2)}
  ${bloc(96, 140, 260, "avancer de 50", C.bleu)}
  ${bloc(96, 186, 260, "tourner de 90 degrés", C.bleu)}
  <text x="240" y="350" fill="${C.rose}" font-size="30" text-anchor="middle">quelle figure ?</text>
  </svg>`;

const score = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme : mettre score à 0, répéter 5 fois ajouter 3 à score">
  ${bloc(70, 50, 300, "mettre score à 0", C.rose)}
  ${boucle(70, 100, 300, "répéter 5 fois", 1)}
  ${bloc(96, 140, 260, "ajouter 3 à score", C.rose)}
  ${bloc(70, 230, 300, "dire score", C.bleu)}
  <text x="240" y="350" fill="${C.jaune}" font-size="30" text-anchor="middle">score = ?</text>
  </svg>`;

const condition = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme : si nombre plus grand que 10 alors dire Grand sinon dire Petit ; nombre vaut 7">
  ${bloc(60, 40, 340, "mettre nombre à 7", C.rose)}
  <path d="M60 100 L400 100 L400 140 L86 140 L86 186 L400 186 L400 226 L86 226 L86 272 L400 272 L400 300 L60 300 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  <text x="74" y="128" fill="${C.craie}" font-size="21">si nombre &gt; 10 alors</text>
  ${bloc(92, 143, 260, "dire « Grand »", C.bleu)}
  <text x="74" y="214" fill="${C.craie}" font-size="21">sinon</text>
  ${bloc(92, 229, 260, "dire « Petit »", C.bleu)}
  <text x="240" y="370" fill="${C.rose}" font-size="30" text-anchor="middle">le lutin dit : ?</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme : choisir 3, ajouter 4, multiplier par 2 ; Tom trouve 11">
  ${bloc(90, 50, 300, "Choisir un nombre : 3", C.bleu)}
  ${bloc(90, 115, 300, "Ajouter 4", C.rose)}
  ${bloc(90, 180, 300, "Multiplier le résultat par 2", C.rose)}
  <text x="240" y="290" fill="${C.rose}" font-size="28" text-anchor="middle">Tom : « 3 + 4 × 2 = 11 »</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">on suit les blocs dans l'ordre</text>
  </svg>`;

// Triangle équilatéral de côté 150 : (165 ; 300), (315 ; 300), (240 ; 170).
const triangle = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle équilatéral et le programme répéter 3 fois avancer de 100, tourner de ? degrés">
  ${boucle(20, 30, 280, "répéter 3 fois", 2)}
  ${bloc(46, 70, 240, "avancer de 100", C.bleu)}
  ${bloc(46, 116, 240, "tourner de ? degrés", C.bleu)}
  <path d="M165 360 L315 360 L240 230 Z" fill="${C.rose}" fill-opacity=".15" stroke="${C.rose}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M315 360 L375 360" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5"/>
  <path d="M345 360 A30 30 0 0 0 300 334" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="365" y="335" fill="${C.jaune}" font-size="26">?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "algo_programmation",
  titre: "Énigmes sur la lecture d'un programme",
  description: "Lire et exécuter un programme en 5e (Scratch) : programme de calcul, la figure tracée, une variable score, une condition si-sinon, piège de l'ordre des blocs, l'angle du triangle. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le programme de calcul",
      titre: "Ce que dit le lutin",
      question: `Le lutin suit ce programme.<br><br><b>Quel nombre dit-il</b> à la fin ?`,
      reponse: `5 × 3 = 15, puis 15 + 4 = 19.<br>Le lutin dit <span class="big">19</span>.`,
      consigne: "Quel nombre dit le lutin ?",
      verification: { type: "courte", attendus: ["19"] },
      dessin: calcul(),
    },
    {
      tag: "Énigme 2 · Le stylo du lutin",
      titre: "La figure tracée",
      question: `Le lutin a le stylo baissé et exécute ce programme.<br><br><b>Quelle figure trace-t-il ?</b>`,
      reponse: `4 côtés de 50 pas, et un quart de tour à chaque fois.<br>Il trace <span class="big">un carré</span>.`,
      consigne: "Quelle figure trace le lutin ?",
      verification: { type: "qcm", choix: ["Un carré", "Un triangle", "Un hexagone"], bonne: 0 },
      dessin: figure(),
    },
    {
      tag: "Énigme 3 · La variable",
      titre: "Le score à la fin",
      question: `Lis ce programme.<br><br><b>Que vaut score</b> à la fin ?`,
      reponse: `score part de 0 et gagne 3, cinq fois : 3 + 3 + 3 + 3 + 3 = 5 × 3 = 15.<br>score vaut <span class="big">15</span>.`,
      consigne: "Que vaut score à la fin ?",
      verification: { type: "courte", attendus: ["15"] },
      dessin: score(),
    },
    {
      tag: "Énigme 4 · Si… sinon",
      titre: "Grand ou petit ?",
      question: `Dans ce programme, nombre vaut <b>7</b>.<br><br><b>Que dit le lutin ?</b>`,
      reponse: `7 &gt; 10 ? Non, c'est faux. Le programme va dans « sinon ».<br>Le lutin dit <span class="big">« Petit »</span>.`,
      consigne: "Que dit le lutin ?",
      verification: { type: "qcm", choix: ["Grand", "Rien", "Petit"], bonne: 2 },
      dessin: condition(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'ordre des blocs",
      sorte: "piege",
      question: `On lance ce programme avec <b>3</b>.<br>Tom calcule 3 + 4 × 2 = 11.<br><br><b>A-t-il raison ?</b> Quel résultat donne le programme ?`,
      reponse: `Non ! Le programme fait les blocs dans l'ordre : d'abord 3 + 4 = 7, puis 7 × 2.<br>C'est (3 + 4) × 2 = <span class="big">14</span>.`,
      consigne: "Quel résultat donne le programme avec 3 ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tour du triangle",
      sorte: "defi",
      question: `On veut tracer un <b>triangle équilatéral</b> avec ce programme.<br><br><b>De combien de degrés</b> le lutin doit-il tourner ?`,
      reponse: `Le lutin tourne de l'angle <b>extérieur</b>, pas de 60°. En 3 virages, il fait un tour complet : 360°.<br>360 ÷ 3 = <span class="big">120°</span>.`,
      consigne: "De combien de degrés doit tourner le lutin ?",
      verification: { type: "courte", attendus: ["120"], unite: "°" },
      dessin: triangle(),
    },
  ],
};

export default problemes;
