// Énigmes à projeter — 6e, notion algo_programmation (l'ordre des blocs du
// robot planteur, un déplacement sur quadrillage, une boucle de sauts, la
// figure tracée par « répéter 3 fois avancer, tourner de 120° », le piège du
// demi-tour : distance parcourue ≠ distance au départ, défi : remonter un
// programme à boucle). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-algorithmique.tsx) : blocs façon
// Scratch, lus de haut en bas ; « tourner » ne fait faire aucun pas.
// Chaque programme a été exécuté pas à pas (étapes écrites dans les réponses).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${x}" y="${y}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

/** Un bloc de programme : rectangle arrondi, texte à gauche. */
const bloc = (x: number, y: number, l: number, t: string, coul: string) =>
  `<rect x="${x}" y="${y}" width="${l}" height="44" rx="8" fill="${coul}" fill-opacity=".2" stroke="${coul}" stroke-width="3"/>` +
  txt(x + 14, y + 30, t, C.craie, 22, "start");

/** Le bloc « répéter n fois » qui entoure `h` pixels de blocs intérieurs. */
const repeter = (x: number, y: number, l: number, n: number, h: number) =>
  `<path d="M${x} ${y} L${x + l} ${y} L${x + l} ${y + 44} L${x + 30} ${y + 44} L${x + 30} ${y + 52 + h} L${x + l} ${y + 52 + h} L${x + l} ${y + 80 + h} L${x} ${y + 80 + h} Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>` +
  txt(x + 14, y + 30, `répéter ${n} fois`, C.craie, 22, "start");

const depart = (x: number, y: number) => txt(x, y, "🚩 départ", C.craie, 22, "start");

// Le robot planteur : les blocs 2 et 3 sont inversés.
const planteur = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le programme du robot : creuser un trou, reboucher le trou, poser la graine, arroser">
  ${depart(80, 50)}
  ${bloc(80, 70, 320, "1. creuser un trou", C.bleu)}
  ${bloc(80, 126, 320, "2. reboucher le trou", C.bleu)}
  ${bloc(80, 182, 320, "3. poser la graine", C.bleu)}
  ${bloc(80, 238, 320, "4. arroser", C.bleu)}
  ${txt(420, 160, "🌻", C.craie, 40)}
  ${txt(240, 330, "Le robot lit de haut en bas.", C.pale, 22)}
  ${txt(240, 385, `Que se passe-t-il${NB}?`, C.rose, 30)}
  </svg>`;

// Le quadrillage : 6 colonnes × 5 lignes, cases de 50 px, de (90 ; 60) à (390 ; 310).
// Départ case (colonne 0 ; ligne 4), tourné vers la droite. Arrivée (4 ; 2).
const salon = () => {
  let g = "";
  for (let i = 0; i <= 6; i++) g += `M${90 + 50 * i} 60 L${90 + 50 * i} 310 `;
  for (let j = 0; j <= 5; j++) g += `M90 ${60 + 50 * j} L390 ${60 + 50 * j} `;
  const lettre = (c: number, l: number, t: string) => txt(90 + 50 * c + 25, 60 + 50 * l + 35, t, C.rose, 30);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un quadrillage de 6 cases sur 5. Le robot part de la case en bas à gauche, tourné vers la droite. Trois cases A, B, C">
  <path d="${g}" stroke="${C.pale}" stroke-width="2" fill="none"/>
  <path d="M100 270 L132 285 L100 300 Z" fill="${C.bleu}" fill-opacity=".8" stroke="${C.bleu}" stroke-width="2" stroke-linejoin="round"/>
  ${lettre(3, 2, "A")}
  ${lettre(4, 1, "B")}
  ${lettre(4, 2, "C")}
  ${txt(115, 345, "départ", C.bleu, 22)}
  ${txt(240, 395, `Sur quelle case arrive-t-il${NB}?`, C.rose, 26)}
  </svg>`;
};

// La corde à sauter : 1 bloc, puis une boucle de 2 blocs.
const corde = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Programme : sauter 2 fois, puis répéter 5 fois : sauter 3 fois et taper des mains">
  ${depart(70, 50)}
  ${bloc(70, 66, 300, "sauter 2 fois", C.bleu)}
  ${repeter(70, 122, 300, 5, 100)}
  ${bloc(100, 170, 270, "sauter 3 fois", C.bleu)}
  ${bloc(100, 222, 270, "taper des mains", C.rose)}
  ${txt(420, 200, "🤸", C.craie, 40)}
  ${txt(240, 375, `Combien de sauts en tout${NB}?`, C.rose, 28)}
  </svg>`;

// Le traceur de lignes : la boucle seule, la figure n'est pas dessinée.
const traceur = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Programme du robot traceur : répéter 3 fois : avancer de 100 pas, tourner de 120 degrés">
  ${depart(70, 70)}
  ${repeter(70, 90, 320, 3, 100)}
  ${bloc(100, 138, 290, "avancer de 100 pas", C.bleu)}
  ${bloc(100, 190, 290, "tourner de 120°", C.bleu)}
  ${txt(240, 330, "Le robot trace en avançant.", C.pale, 22)}
  ${txt(240, 385, `Quelle figure${NB}?`, C.rose, 30)}
  </svg>`;

// Le piège : avancer 4, deux quarts de tour à droite, avancer 4.
const tondeuse = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Programme de la tondeuse : avancer de 4 cases, tourner à droite, tourner à droite, avancer de 4 cases">
  ${depart(70, 46)}
  ${bloc(70, 60, 340, "avancer de 4 cases", C.bleu)}
  ${bloc(70, 112, 340, "tourner à droite", C.bleu)}
  ${bloc(70, 164, 340, "tourner à droite", C.bleu)}
  ${bloc(70, 216, 340, "avancer de 4 cases", C.bleu)}
  ${txt(240, 312, `Léo${NB}: «${NB}Elle est à 8 cases du départ.${NB}»`, C.craie, 22)}
  ${txt(240, 385, `Vrai ou faux${NB}?`, C.rose, 32)}
  </svg>`;

// Le défi : choisir un nombre, répéter 3 fois × 2, ajouter 5 → 45.
const machine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Programme : choisir un nombre, répéter 3 fois multiplier par 2, ajouter 5. Le lutin dit 45">
  ${depart(60, 42)}
  ${bloc(60, 56, 320, "choisir un nombre", C.pale)}
  ${repeter(60, 108, 320, 3, 48)}
  ${bloc(90, 156, 290, "multiplier par 2", C.bleu)}
  ${bloc(60, 244, 320, "ajouter 5", C.bleu)}
  ${bloc(60, 296, 320, "dire le résultat", C.pale)}
  ${txt(430, 330, "45", C.rose, 40)}
  ${txt(240, 392, `Quel nombre au départ${NB}?`, C.rose, 28)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "algo_programmation",
  titre: "Énigmes d'algorithmique et de programmation",
  description: "Défis maths à projeter en 6e : le robot planteur, le robot aspirateur sur quadrillage, la corde à sauter, la figure du robot traceur, le piège du demi-tour, la machine à remonter.",
  problemes: [
    {
      tag: "Énigme 1 · Au champ",
      titre: "Le robot planteur",
      question: `Un robot plante des graines de tournesol.<br>Léna a écrit son programme.<br>Mais elle a <b>inversé</b> les blocs 2 et 3.<br><br>Que se passe-t-il ?`,
      reponse: `Le robot lit dans l'ordre. Il creuse, puis il rebouche le trou vide.<br>Ensuite, il pose la graine sur la terre, et il l'arrose.<br><span class="big">La graine reste posée sur la terre.</span><br>La machine fait ce qui est écrit, pas ce qu'on voulait.`,
      consigne: "Les blocs 2 et 3 sont inversés. Que se passe-t-il ?",
      verification: { type: "qcm", choix: ["La graine reste posée sur la terre", "Rien ne change, la graine est plantée", "Le robot plante deux graines"], bonne: 0 },
      dessin: planteur(),
    },
    {
      tag: "Énigme 2 · Dans le salon",
      titre: "Le robot aspirateur",
      question: `Le robot part de la case <b>départ</b>. Il regarde <b>vers la droite</b>.<br>Avancer de 3 cases. Tourner à gauche.<br>Avancer de 2 cases. Tourner à droite.<br>Avancer de 1 case.<br><br>Sur quelle case arrive-t-il ?`,
      reponse: `Avancer de 3 : il va 3 cases à droite.<br>Tourner à gauche : il regarde vers le haut. Avancer de 2 : il monte de 2 cases.<br>Tourner à droite : il regarde de nouveau vers la droite. Avancer de 1.<br>En tout : 4 cases à droite, 2 cases en haut. Il arrive en <span class="big">case C</span>.`,
      consigne: "Sur quelle case le robot arrive-t-il ?",
      verification: { type: "qcm", choix: ["Case A", "Case B", "Case C"], bonne: 2 },
      dessin: salon(),
    },
    {
      tag: "Énigme 3 · À la corde à sauter",
      titre: "Les sauts de Maëlle",
      question: `Maëlle suit ce programme à la corde à sauter.<br>D'abord, elle saute 2 fois.<br>Puis une boucle se répète <b>5 fois</b>.<br><br>Combien de <b>sauts</b> fait-elle en tout ?`,
      reponse: `La boucle fait 3 sauts à chaque tour : 5 × 3 = 15 sauts.<br>Taper des mains n'est pas un saut.<br>On ajoute les 2 sauts du début : 2 + 15 = <span class="big">17 sauts</span>.<br>Vérif en comptant : 2, puis 5, 8, 11, 14, 17 ✓`,
      consigne: "Combien de sauts Maëlle fait-elle en tout ?",
      verification: { type: "courte", attendus: ["17"], unite: "sauts" },
      dessin: corde(),
    },
    {
      tag: "Énigme 4 · Au terrain de sport",
      titre: "Le robot traceur",
      question: `Un robot trace des lignes sur le terrain.<br>Il suit ce programme.<br>Il trace un trait chaque fois qu'il avance.<br><br>Quelle <b>figure</b> trace-t-il ?`,
      reponse: `Il trace 3 traits de 100 pas : 3 côtés égaux.<br>Il tourne 3 fois de 120° : 3 × 120° = 360°. Il revient au départ.<br>À chaque coin, l'angle de la figure mesure 180° − 120° = 60°.<br>C'est <span class="big">un triangle équilatéral</span>.`,
      consigne: "Quelle figure le robot trace-t-il ?",
      verification: { type: "qcm", choix: ["Un carré", "Un triangle équilatéral", "Un hexagone"], bonne: 1 },
      dessin: traceur(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La tondeuse de Léo",
      sorte: "piege",
      question: `Une tondeuse robot suit ce programme.<br>Léo dit : « Elle a avancé de 4 cases, puis de 4 cases. Elle est à 8 cases du départ. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Deux quarts de tour à droite, c'est un <b>demi-tour</b>.<br>La tondeuse repart en arrière, de 4 cases.<br>Elle a parcouru 8 cases, mais <span class="big">elle est revenue au départ</span>.`,
      consigne: "Léo dit que la tondeuse est à 8 cases du départ. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Non : elle est revenue au départ", "Oui, elle est à 8 cases", "Non : elle est à 4 cases"], bonne: 0 },
      dessin: tondeuse(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La machine à remonter",
      sorte: "defi",
      question: `Yanis choisit un nombre et lance ce programme.<br>À la fin, le lutin dit <b>45</b>.<br><br>Quel nombre Yanis a-t-il choisi ?`,
      reponse: `On remonte le programme, de bas en haut.<br>Avant « ajouter 5 » : 45 − 5 = 40.<br>Avant les 3 « multiplier par 2 » : 40 ÷ 2 = 20, 20 ÷ 2 = 10, 10 ÷ 2 = 5.<br>Yanis a choisi <span class="big">5</span>. Vérif : 5, 10, 20, 40, puis 40 + 5 = 45 ✓`,
      consigne: "Quel nombre Yanis a-t-il choisi au départ ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: machine(),
    },
  ],
};

export default problemes;
