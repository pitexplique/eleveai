// Énigmes à projeter — 4e, notion fraction_nombre (le tir à l'arc : fractions
// égales par simplification, le puzzle de 1 000 pièces : fraction
// irréductible, le laboratoire : de la fraction au décimal, le mur
// d'escalade : comparer au même dénominateur, piège de Nathan qui « barre
// les 2 », défi du 100e chiffre de 1/7 : un rationnel dont l'écriture
// décimale ne s'arrête pas).
// Dessins au bon rapport : grille du puzzle 10 × 10 (1 case = 10 pièces,
// 84 cases), éprouvette 280 px = 1 L, murs de même hauteur partagés en 8 et
// en 12 parts égales. Pas de La Réunion. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Le tableau des scores : trois archers.
const tirArc = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le tableau des scores du club de tir à l'arc : Mia 12 tirs réussis sur 16, Léo 9 sur 12, Sam 14 sur 20">
  ${txt(240, 60, "tirs réussis", C.pale, 22)}
  <path d="M60 185 L420 185 M60 275 L420 275" stroke="${C.pale}" stroke-width="2" fill="none"/>
  ${txt(80, 150, "Mia", C.craie, 28, "start")}
  ${txt(80, 240, "Léo", C.craie, 28, "start")}
  ${txt(80, 330, "Sam", C.craie, 28, "start")}
  <text x="200" y="152" font-size="34" text-anchor="middle">🎯</text>
  <text x="200" y="242" font-size="34" text-anchor="middle">🎯</text>
  <text x="200" y="332" font-size="34" text-anchor="middle">🎯</text>
  ${txt(400, 150, "12 sur 16", C.bleu, 28, "end")}
  ${txt(400, 240, "9 sur 12", C.bleu, 28, "end")}
  ${txt(400, 330, "14 sur 20", C.bleu, 28, "end")}
  </svg>`;

// Le puzzle : 1 case = 10 pièces, donc 100 cases pour 1 000 et 84 cases pour 840.
const puzzle = () => {
  let s = "";
  for (let k = 0; k < 100; k++) {
    const i = Math.floor(k / 10), j = k % 10;
    const pose = k < 84;
    s += `<rect x="${110 + 26 * j}" y="${60 + 26 * i}" width="26" height="26" fill="${pose ? C.bleu : "none"}" fill-opacity="${pose ? ".35" : "1"}" stroke="${C.pale}" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une grille de 100 cases pour le puzzle de 1 000 pièces ; chaque case vaut 10 pièces ; 84 cases sont coloriées">
  ${s}
  <rect x="110" y="60" width="260" height="260" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${txt(240, 356, `840 pièces posées sur 1${NB}000`, C.craie, 22)}
  ${txt(240, 392, "1 case = 10 pièces", C.pale, 20)}
  </svg>`;
};

// L'éprouvette : 280 px = 1 L, grandes graduations tous les 0,1 L (28 px),
// petites tous les 0,025 L (7 px).
const labo = () => {
  let s = "";
  for (let k = 0; k <= 40; k++) {
    const y = 360 - 7 * k;
    const grand = k % 4 === 0;
    s += `<path d="M200 ${y} L${grand ? 222 : 212} ${y}" stroke="${C.craie}" stroke-width="${grand ? 2.5 : 1.2}" fill="none"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une éprouvette graduée de 0 à 1 litre, vide ; il faut y verser trois huitièmes de litre">
  <rect x="200" y="70" width="60" height="290" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  ${txt(190, 368, "0", C.craie, 20, "end")}
  ${txt(190, 228, "0,5", C.craie, 20, "end")}
  ${txt(190, 88, "1 L", C.craie, 20, "end")}
  ${txt(370, 140, "il faut", C.pale, 22)}
  ${svgFrac(355, 205, 3, 8, C.bleu, 40)}
  ${txt(390, 216, "L", C.bleu, 30, "start")}
  ${txt(370, 300, `lire =${NB}?`, C.rose, 24)}
  <text x="370" y="370" font-size="36" text-anchor="middle">🧪</text>
  </svg>`;
};

// Le mur : deux copies du même mur (300 px), l'une en 8 parts (37,5 px),
// l'autre en 12 parts (25 px).
const escalade = () => {
  let s = "";
  for (let k = 1; k < 8; k++) s += `<path d="M120 ${r1(360 - 37.5 * k)} L180 ${r1(360 - 37.5 * k)}" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
  for (let k = 1; k < 12; k++) s += `<path d="M300 ${360 - 25 * k} L360 ${360 - 25 * k}" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le même mur d'escalade dessiné deux fois : à gauche partagé en 8 parts égales pour Jade, à droite en 12 parts égales pour Hugo">
  <rect x="120" y="60" width="60" height="300" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  <rect x="300" y="60" width="60" height="300" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  ${svgFrac(65, 210, 5, 8, C.bleu, 34)}
  ${svgFrac(415, 210, 7, 12, C.rose, 34)}
  ${txt(150, 394, "Jade", C.bleu, 24)}
  ${txt(330, 394, "Hugo", C.rose, 24)}
  ${txt(240, 210, `qui${NB}?`, C.pale, 24)}
  </svg>`;
};

// Le piège : 12/24 et la fausse simplification de Nathan.
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Nathan barre le chiffre 2 en haut et en bas de douze vingt-quatrièmes et écrit un quart">
  ${svgFrac(140, 190, 12, 24, C.craie, 64)}
  <path d="M215 175 L265 175 M253 165 L265 175 L253 185" stroke="${C.pale}" stroke-width="3" fill="none"/>
  ${svgFrac(330, 190, 1, 4, C.rose, 64)}
  ${txt(410, 210, "?", C.rose, 48)}
  <rect x="60" y="318" width="360" height="52" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 352, `Nathan${NB}: «${NB}je barre les 2${NB}»`, C.rose, 24)}
  </svg>`;

// Le défi : une calculatrice qui affiche 1 ÷ 7.
const calculatrice = () => {
  const touches = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−"];
  let s = "";
  touches.forEach((t, k) => {
    const x = 132 + 56 * (k % 4), y = 196 + 52 * Math.floor(k / 4);
    s += `<rect x="${x}" y="${y}" width="48" height="40" rx="8" fill="none" stroke="${C.pale}" stroke-width="2"/>`;
    s += txt(x + 24, y + 28, t, C.craie, 22);
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une calculatrice qui affiche 0,142857142857 après le calcul 1 divisé par 7">
  ${txt(240, 56, "1 ÷ 7 =", C.pale, 24)}
  <rect x="110" y="80" width="260" height="300" rx="20" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <rect x="128" y="100" width="224" height="72" rx="8" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="2"/>
  ${txt(340, 147, "0,142857142857", C.craie, 24, "end")}
  ${s}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "fraction_nombre",
  titre: "Énigmes sur les fractions et les nombres rationnels",
  description: "Le tir à l'arc, le puzzle de 1 000 pièces, l'éprouvette du laboratoire, le mur d'escalade, le piège de la simplification qui barre les chiffres, le défi du 100e chiffre de 1/7 : fractions égales, fraction irréductible, écriture décimale, comparaison, nombres rationnels.",
  problemes: [
    {
      tag: "Énigme 1 · Au tir à l'arc",
      titre: "Les trois archers",
      question: `Au club de tir à l'arc, Mia réussit <b>12 tirs sur 16</b>.<br>Léo réussit <b>9 tirs sur 12</b>.<br>Sam réussit <b>14 tirs sur 20</b>.<br><br>Lesquels ont exactement la même réussite ?`,
      reponse: `On écrit la part de tirs réussis de chacun, puis on simplifie.<br>Mia : ${frac(12, 16)} = ${frac(3, 4)}, en divisant en haut et en bas par 4.<br>Léo : ${frac(9, 12)} = ${frac(3, 4)}, en divisant en haut et en bas par 3.<br>Sam : ${frac(14, 20)} = ${frac(7, 10)}, en divisant en haut et en bas par 2.<br>Ce sont <span class="big">Mia et Léo</span>.<br>Contrôle en décimal : 0,75 pour Mia et Léo, 0,7 pour Sam.<br>⚠ Sam a le plus de tirs réussis, mais il a aussi tiré le plus.`,
      consigne: "Lesquels ont exactement la même réussite ?",
      verification: { type: "qcm", choix: ["Mia et Sam", "Léo et Sam", "Mia et Léo"], bonne: 2 },
      dessin: tirArc(),
    },
    {
      tag: "Énigme 2 · Le puzzle",
      titre: "Le puzzle de Chloé",
      question: `Le puzzle de Chloé compte <b>1 000 pièces</b>.<br>Elle en a déjà posé <b>840</b>.<br><br>Quelle fraction du puzzle a-t-elle posée ? Donne la fraction <b>irréductible</b>.`,
      reponse: `Pièces posées sur le total : ${frac(840, 1000)}.<br>On divise en haut et en bas par 10 : ${frac(84, 100)}.<br>Puis par 4 : ${frac(21, 25)}.<br>21 = 3 × 7 et 25 = 5 × 5 : plus aucun diviseur commun.<br>Chloé a posé <span class="big">${frac(21, 25)}</span> du puzzle.<br>Contrôle : 21 ÷ 25 = 0,84 et 840 ÷ 1 000 = 0,84.`,
      consigne: "Quelle fraction irréductible du puzzle a-t-elle posée ? Écris-la sous la forme a/b.",
      verification: { type: "courte", attendus: ["21/25"] },
      dessin: puzzle(),
    },
    {
      tag: "Énigme 3 · Au laboratoire",
      titre: "L'éprouvette d'Amir",
      question: `Pour une expérience, Amir doit verser ${frac(3, 8)} L d'eau.<br>Son éprouvette est graduée avec des nombres décimaux.<br><br>Quel nombre doit-il lire sur l'éprouvette ?`,
      reponse: `Une fraction est un quotient : ${frac(3, 8)} = 3 ÷ 8.<br>On pose la division : 3 ÷ 8 = 0,375.<br>Il doit lire <span class="big">0,375 L</span>.<br>Contrôle : 0,375 × 8 = 3.<br>Autre chemin : ${frac(1, 8)} = 0,125, et 3 × 0,125 = 0,375.<br>⚠ 3,8 L n'est pas ${frac(3, 8)} L : la barre de fraction n'est pas une virgule.`,
      consigne: "Quel nombre décimal doit-il lire sur l'éprouvette, en litres ?",
      verification: { type: "courte", attendus: ["0,375"], unite: "L" },
      dessin: labo(),
    },
    {
      tag: "Énigme 4 · En escalade",
      titre: "Le mur d'escalade",
      question: `Jade et Hugo grimpent sur le même mur d'escalade.<br>Jade s'arrête aux ${frac(5, 8)} de la hauteur.<br>Hugo s'arrête aux ${frac(7, 12)} de la hauteur.<br><br>Qui est monté le plus haut ?`,
      reponse: `On met les deux fractions au même dénominateur : 24.<br>${frac(5, 8)} = ${frac(15, 24)}, en multipliant en haut et en bas par 3.<br>${frac(7, 12)} = ${frac(14, 24)}, en multipliant en haut et en bas par 2.<br>15 parts de 24, c'est plus que 14 parts de 24.<br><span class="big">Jade</span> est montée le plus haut.<br>Contrôle : 5 ÷ 8 = 0,625 et 7 ÷ 12 ≈ 0,583.<br>⚠ 7 et 12 sont plus grands que 5 et 8 : cela ne suffit pas pour comparer.`,
      consigne: "Qui est monté le plus haut ?",
      verification: { type: "qcm", choix: ["Hugo", "Jade", "À la même hauteur"], bonne: 1 },
      dessin: escalade(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les 2 barrés",
      sorte: "piege",
      question: `Nathan veut simplifier ${frac(12, 24)}.<br>Il barre le chiffre 2 en haut et le chiffre 2 en bas.<br>Il obtient ${frac(1, 4)}.<br><br><b>Que vaut vraiment cette fraction ?</b>`,
      reponse: `Nathan s'est trompé : on ne barre jamais des chiffres !<br>Simplifier, c'est diviser le numérateur ET le dénominateur par un même nombre.<br>12 et 24 sont tous les deux divisibles par 12 : ${frac(12, 24)} = ${frac(1, 2)}.<br>La fraction vaut <span class="big">${frac(1, 2)}</span>.<br>Contrôle : 24 est le double de 12.<br>Et le quart de 24, c'est 6, pas 12.`,
      consigne: "Que vaut vraiment la fraction 12/24 ?",
      verification: { type: "qcm", choix: ["1/2", "1/4", "1/12"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le 100e chiffre",
      sorte: "defi",
      question: `Zoé tape 1 ÷ 7 sur sa calculatrice.<br>L'écran affiche 0,142857142857.<br>Elle se demande si les chiffres continuent toujours ainsi.<br><br>Quel est le <b>100<sup>e</sup> chiffre</b> après la virgule ?`,
      reponse: `On pose 1 ÷ 7 : les restes sont 3, 2, 6, 4, 5, puis de nouveau 1.<br>On retombe sur le départ : le bloc 142857 se répète sans fin.<br>Ce bloc a 6 chiffres, et 100 = 6 × 16 + 4.<br>16 blocs complets font 96 chiffres. Les 4 suivants sont 1, 4, 2, 8.<br>Le 100<sup>e</sup> chiffre est <span class="big">8</span>.<br>${frac(1, 7)} est bien un nombre rationnel, même si son écriture décimale ne s'arrête jamais.`,
      consigne: "Quel est le 100e chiffre après la virgule de 1 ÷ 7 ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: calculatrice(),
    },
  ],
};

export default problemes;
