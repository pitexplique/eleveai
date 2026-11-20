// Énigmes à projeter — 5e, notion algo_construire (écrire, compléter et
// modifier un programme, façon Scratch). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const bloc = (x: number, y: number, w: number, txt: string, c: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="40" rx="8" fill="${c}" fill-opacity=".2" stroke="${c}" stroke-width="3"/>` +
  `<text x="${x + 14}" y="${y + 28}" fill="${C.craie}" font-size="21">${txt}</text>`;
const boucle = (x: number, y: number, w: number, titre: string, k: number) =>
  `<path d="M${x} ${y} L${x + w} ${y} L${x + w} ${y + 40} L${x + 26} ${y + 40} L${x + 26} ${y + 40 + 46 * k} L${x + w} ${y + 40 + 46 * k} L${x + w} ${y + 76 + 46 * k} L${x} ${y + 76 + 46 * k} Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>` +
  `<text x="${x + 14}" y="${y + 28}" fill="${C.craie}" font-size="21">${titre}</text>`;

// Hexagone régulier de côté 70, centre (370 ; 290).
const hexagone = () => {
  const pts = [0, 1, 2, 3, 4, 5].map((k) => `${(370 + 70 * Math.cos((Math.PI / 3) * k)).toFixed(1)} ${(290 + 70 * Math.sin((Math.PI / 3) * k)).toFixed(1)}`);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un hexagone régulier et le programme répéter ? fois avancer de 70, tourner de 60 degrés">
  ${boucle(20, 40, 280, "répéter ? fois", 2)}
  ${bloc(46, 80, 240, "avancer de 70", C.bleu)}
  ${bloc(46, 126, 240, "tourner de 60 degrés", C.bleu)}
  <path d="M${pts.join(" L")} Z" fill="${C.rose}" fill-opacity=".15" stroke="${C.rose}" stroke-width="4" stroke-linejoin="round"/>
  </svg>`;
};

const pair = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme à compléter : si ? alors dire pair, sinon dire impair">
  ${bloc(60, 40, 340, "demander un nombre", C.rose)}
  <path d="M60 100 L420 100 L420 140 L86 140 L86 186 L420 186 L420 226 L86 226 L86 272 L420 272 L420 300 L60 300 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  <text x="74" y="128" fill="${C.craie}" font-size="21">si</text>
  <rect x="100" y="106" width="200" height="28" rx="14" fill="none" stroke="${C.rose}" stroke-width="3" stroke-dasharray="6 5"/>
  <text x="200" y="128" fill="${C.rose}" font-size="22" text-anchor="middle">?</text>
  <text x="312" y="128" fill="${C.craie}" font-size="21">alors</text>
  ${bloc(92, 143, 260, "dire « pair »", C.bleu)}
  <text x="74" y="214" fill="${C.craie}" font-size="21">sinon</text>
  ${bloc(92, 229, 260, "dire « impair »", C.bleu)}
  </svg>`;

const agrandir = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme qui trace un carré de côté 50, et un carré de côté 80 à obtenir">
  ${boucle(20, 40, 280, "répéter 4 fois", 2)}
  ${bloc(46, 80, 240, "avancer de 50", C.bleu)}
  ${bloc(46, 126, 240, "tourner de 90 degrés", C.bleu)}
  <rect x="60" y="280" width="100" height="100" fill="none" stroke="${C.pale}" stroke-width="4"/>
  <text x="110" y="408" fill="${C.pale}" font-size="20" text-anchor="middle">côté 50</text>
  <rect x="260" y="220" width="160" height="160" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="4"/>
  <text x="340" y="408" fill="${C.rose}" font-size="20" text-anchor="middle">côté 80 : on veut ça</text>
  </svg>`;

const compteur = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un compteur qui part de 0 et gagne 5 à chaque tour jusqu'à 100">
  ${bloc(60, 40, 340, "mettre compteur à 0", C.rose)}
  ${boucle(60, 90, 340, "répéter ? fois", 1)}
  ${bloc(86, 130, 300, "ajouter 5 à compteur", C.rose)}
  ${bloc(60, 220, 340, "dire compteur", C.bleu)}
  <text x="240" y="330" fill="${C.jaune}" font-size="28" text-anchor="middle">on veut qu'il dise 100</text>
  </svg>`;

// Le programme faux : tourner de 45 degrés. On dessine les 4 premiers traits (côté 80).
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme qui devait tracer un carré mais tourne de 45 degrés">
  ${boucle(20, 30, 280, "répéter 4 fois", 2)}
  ${bloc(46, 70, 240, "avancer de 100", C.bleu)}
  ${bloc(46, 116, 240, "tourner de 45 degrés", C.rose)}
  <path d="M120 400 L200 400 L256.6 343.4 L256.6 263.4 L200 206.8" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <text x="380" y="300" fill="${C.rose}" font-size="26" text-anchor="middle">pas un carré !</text>
  <text x="380" y="340" fill="${C.pale}" font-size="20" text-anchor="middle">réduit, même forme</text>
  </svg>`;

// Un escalier de 5 marches de 20 × 20 (30 px par marche).
const escalier = () => {
  let d = "M30 400";
  for (let k = 0; k < 5; k++) d += ` L${30 + 30 * k} ${370 - 30 * k} L${60 + 30 * k} ${370 - 30 * k}`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un escalier de 5 marches tracé par le lutin">
  ${boucle(196, 20, 274, "répéter 5 fois", 4)}
  ${bloc(222, 60, 236, "avancer de 20", C.bleu)}
  ${bloc(222, 106, 236, "tourner à gauche de 90", C.bleu)}
  ${bloc(222, 152, 236, "avancer de 20", C.bleu)}
  ${bloc(222, 198, 236, "tourner à droite de 90", C.bleu)}
  <path d="${d}" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <text x="380" y="380" fill="${C.jaune}" font-size="24" text-anchor="middle">longueur du trait : ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "algo_construire",
  titre: "Énigmes pour écrire un programme",
  description: "Écrire et modifier un programme en 5e (Scratch) : tracer un hexagone, tester si un nombre est pair, agrandir un carré, régler un compteur, piège de l'angle, l'escalier du lutin. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Tracer une figure",
      titre: "L'hexagone du lutin",
      question: `On veut tracer un <b>hexagone régulier</b> (6 côtés égaux).<br><br><b>Quel nombre</b> faut-il écrire dans « répéter ? fois » ?`,
      reponse: `Un côté et un virage par tour de boucle. 6 côtés, et 6 × 60° = 360° : le tour complet.<br>On écrit <span class="big">6</span>.`,
      consigne: "Combien de fois faut-il répéter ?",
      verification: { type: "courte", attendus: ["6"], unite: "fois" },
      dessin: hexagone(),
    },
    {
      tag: "Énigme 2 · Compléter",
      titre: "Pair ou impair ?",
      question: `Le lutin doit dire « pair » quand le nombre est pair.<br><br><b>Quelle condition</b> faut-il écrire à la place du « ? » ?`,
      reponse: `Un nombre pair se divise par 2 sans reste.<br>On écrit : <span class="big">le reste de nombre ÷ 2 = 0</span>.`,
      consigne: "Quelle condition faut-il écrire ?",
      verification: { type: "qcm", choix: ["nombre ÷ 2 = 0", "le reste de nombre ÷ 2 = 0", "nombre > 2"], bonne: 1 },
      dessin: pair(),
    },
    {
      tag: "Énigme 3 · Modifier",
      titre: "Un carré plus grand",
      question: `Ce programme trace un carré de côté <b>50</b>.<br>On veut un carré de côté <b>80</b>.<br><br><b>Que faut-il changer ?</b>`,
      reponse: `Le nombre de côtés et l'angle restent les mêmes. Seule la longueur change.<br>On remplace <span class="big">avancer de 50 par avancer de 80</span>.`,
      consigne: "Que faut-il changer dans le programme ?",
      verification: { type: "qcm", choix: ["tourner de 90 → tourner de 80", "répéter 4 fois → répéter 8 fois", "avancer de 50 → avancer de 80"], bonne: 2 },
      dessin: agrandir(),
    },
    {
      tag: "Énigme 4 · Le compteur",
      titre: "Jusqu'à 100",
      question: `Le compteur part de <b>0</b> et gagne <b>5</b> à chaque tour.<br>On veut qu'il dise <b>100</b> à la fin.<br><br><b>Combien de fois</b> faut-il répéter ?`,
      reponse: `Il faut ajouter 5 jusqu'à faire 100 : 100 ÷ 5 = 20.<br>On répète <span class="big">20 fois</span>.`,
      consigne: "Combien de fois faut-il répéter ?",
      verification: { type: "courte", attendus: ["20"], unite: "fois" },
      dessin: compteur(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré raté",
      sorte: "piege",
      question: `Sami veut tracer un <b>carré</b>. Il écrit « tourner de 45 degrés ».<br>Le dessin n'est pas un carré !<br><br><b>Quel angle</b> faut-il écrire ?`,
      reponse: `Un carré a 4 angles droits : à chaque coin, le lutin fait un quart de tour.<br>On écrit <span class="big">90 degrés</span> (4 × 90 = 360).`,
      consigne: "De combien de degrés faut-il tourner pour un carré ?",
      verification: { type: "courte", attendus: ["90"], unite: "°" },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'escalier du lutin",
      sorte: "defi",
      question: `Le lutin trace un escalier avec ce programme.<br><br><b>Quelle est la longueur totale</b> du trait tracé ?`,
      reponse: `À chaque tour : 20 + 20 = 40 pas. Il y a 5 tours.<br>5 × 40 = <span class="big">200 pas</span>.`,
      consigne: "Quelle est la longueur totale du trait, en pas ?",
      verification: { type: "courte", attendus: ["200"], unite: "pas" },
      dessin: escalier(),
    },
  ],
};

export default problemes;
