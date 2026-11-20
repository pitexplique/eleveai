// Énigmes à projeter — 4e, notion prop_ratio (l'étagère de la bibliothèque,
// le jus de fruits, le terrarium à trois couches, le relais à partager,
// piège du refuge « 3/5 du total », défi des timbres par l'écart).
// Les barres de parts sont au bon rapport : toutes les cases ont la même taille.
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
// n cases égales côte à côte, de largeur w et de hauteur h, à partir de (x, y).
const cases = (x: number, y: number, n: number, w: number, h: number, coul: string, opac = 0.35) => {
  let s = "";
  for (let k = 0; k < n; k++) {
    s += `<rect x="${r1(x + k * w)}" y="${y}" width="${w}" height="${h}" fill="${coul}" fill-opacity="${opac}" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return s;
};

// L'étagère : 18 BD (dos de 18 px) en haut, 24 romans (dos de 14 px) en bas.
const etagere = () => {
  let s = "";
  for (let k = 0; k < 18; k++) {
    const h = 70 + ((k * 7) % 3) * 8;
    s += `<rect x="${78 + k * 18}" y="${170 - h}" width="16" height="${h}" fill="${C.jaune}" fill-opacity=".45" stroke="${C.craie}" stroke-width="1.5"/>`;
  }
  for (let k = 0; k < 24; k++) {
    const h = 80 + ((k * 5) % 4) * 6;
    s += `<rect x="${72 + k * 14}" y="${320 - h}" width="12" height="${h}" fill="${C.bleu}" fill-opacity=".35" stroke="${C.craie}" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une étagère : 18 bandes dessinées en haut, 24 romans en bas">
  ${s}
  <rect x="50" y="170" width="380" height="10" fill="${C.pale}"/>
  <rect x="50" y="320" width="380" height="10" fill="${C.pale}"/>
  <rect x="50" y="40" width="10" height="290" fill="${C.pale}"/>
  <rect x="420" y="40" width="10" height="290" fill="${C.pale}"/>
  ${txt(240, 214, "18 BD", C.jaune, 24)}
  ${txt(240, 366, "24 romans", C.bleu, 24)}
  ${txt(240, 406, `BD${NB}: romans = ?`, C.rose, 24)}
  </svg>`;
};

// Le jus : orange 5 parts, mangue 3 parts, cases de 60 px.
const jus = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux barres de parts égales : 5 parts de jus d'orange, 3 parts de jus de mangue">
  <text x="40" y="160" font-size="36" text-anchor="middle">🍊</text>
  <text x="40" y="290" font-size="36" text-anchor="middle">🥭</text>
  ${cases(80, 120, 5, 60, 56, C.jaune)}
  ${cases(80, 250, 3, 60, 56, C.rose)}
  <path d="M80 102 L80 92 L380 92 L380 102" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  ${txt(230, 80, "30 cL d'orange", C.jaune, 24)}
  ${txt(300, 288, "? cL", C.rose, 26, "start")}
  ${txt(240, 390, `orange${NB}: mangue = 5${NB}: 3`, C.craie, 24)}
  </svg>`;

// Le terrarium : 6 parts de 45 px. En bas l'argile (2 parts = 90 px), puis le
// sable (1 part = 45 px), en haut la terre (3 parts = 135 px).
const terrarium = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrarium en trois couches : argile en bas, sable au milieu, terre en haut, d'épaisseurs 2, 1 et 3 parts">
  <rect x="90" y="90" width="180" height="135" fill="${C.jaune}" fill-opacity=".35"/>
  <rect x="90" y="225" width="180" height="45" fill="${C.pale}" fill-opacity=".2"/>
  <rect x="90" y="270" width="180" height="90" fill="${C.rose}" fill-opacity=".25"/>
  <path d="M90 50 L90 360 L270 360 L270 50" stroke="${C.craie}" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <path d="M90 225 L270 225 M90 270 L270 270" stroke="${C.craie}" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="180" y="88" font-size="40" text-anchor="middle">🌱</text>
  ${txt(290, 165, `terre${NB}: 600 g`, C.craie, 22, "start")}
  ${txt(290, 255, "sable", C.pale, 22, "start")}
  ${txt(290, 322, `argile${NB}: ?`, C.rose, 24, "start")}
  ${txt(240, 404, `sable${NB}: terre${NB}: argile = 1${NB}: 3${NB}: 2`, C.craie, 22)}
  </svg>`;

// Le relais : 8 cases de 50 px, 3 pour Inès, 5 pour Paul.
const relais = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une course de 1 600 mètres en 8 parts égales : 3 parts pour Inès, 5 parts pour Paul">
  <path d="M40 150 L40 140 L440 140 L440 150" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(240, 126, "1 600 m en tout", C.craie, 24)}
  ${cases(40, 165, 3, 50, 60, C.jaune)}
  ${cases(190, 165, 5, 50, 60, C.bleu, 0.3)}
  ${txt(115, 260, "Inès", C.jaune, 24)}
  ${txt(315, 260, "Paul", C.bleu, 24)}
  <text x="115" y="320" font-size="40" text-anchor="middle">🏃‍♀️</text>
  <text x="315" y="320" font-size="40" text-anchor="middle">🏃</text>
  ${txt(240, 395, `Inès${NB}: Paul = 3${NB}: 5`, C.craie, 24)}
  </svg>`;

// Le refuge : pas de figure à l'échelle, seulement les données et l'idée de Hugo.
const refuge = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un refuge : 40 animaux, chiens et chats dans le ratio 3 : 5 ; Hugo pense qu'il y a 24 chiens">
  <text x="150" y="130" font-size="70" text-anchor="middle">🐶</text>
  <text x="330" y="130" font-size="70" text-anchor="middle">🐱</text>
  ${txt(240, 200, `chiens${NB}: chats = 3${NB}: 5`, C.craie, 26)}
  ${txt(240, 245, "40 animaux en tout", C.pale, 24)}
  <rect x="70" y="290" width="340" height="70" rx="20" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 335, `Hugo${NB}: « 24 chiens »`, C.rose, 26)}
  </svg>`;

// Les timbres : cases de 46 px ; Ana 7 parts, Bilal 4 parts ; l'écart (3 parts) en rose.
const timbres = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux barres : Ana 7 parts, Bilal 4 parts ; les 3 parts de plus d'Ana valent 36 timbres">
  ${txt(60, 152, "Ana", C.craie, 24)}
  ${txt(60, 262, "Bilal", C.craie, 24)}
  ${cases(110, 115, 4, 46, 56, C.bleu, 0.3)}
  ${cases(294, 115, 3, 46, 56, C.rose, 0.35)}
  ${cases(110, 225, 4, 46, 56, C.bleu, 0.3)}
  <path d="M294 98 L294 88 L432 88 L432 98" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${txt(363, 74, "36 de plus", C.rose, 24)}
  <text x="370" y="270" font-size="38" text-anchor="middle">✉️</text>
  ${txt(240, 350, `Ana${NB}: Bilal = 7${NB}: 4`, C.craie, 24)}
  ${txt(240, 395, `En tout${NB}?`, C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "prop_ratio",
  titre: "Énigmes sur les ratios",
  description: "L'étagère de la bibliothèque, le jus de fruits, le terrarium, le relais à partager, le piège du refuge, le défi des timbres : simplifier un ratio, l'écrire en quotients égaux, utiliser trois termes, partager une quantité selon un ratio.",
  problemes: [
    {
      tag: "Énigme 1 · La bibliothèque",
      titre: "Le ratio de l'étagère",
      question: `Sur l'étagère de Nora, il y a 18 BD et 24 romans.<br><br>Quel est le ratio BD : romans, simplifié au maximum ?`,
      reponse: `On écrit le ratio dans l'ordre de la question : BD : romans = 18 : 24.<br>On divise les deux nombres par 6, leur plus grand diviseur commun.<br>18 ÷ 6 = 3 et 24 ÷ 6 = 4.<br>BD : romans = <span class="big">3 : 4</span>.<br>Pour 3 BD, il y a 4 romans. 4 : 3 serait le ratio romans : BD.`,
      consigne: "Quel est le ratio BD : romans, simplifié ?",
      verification: { type: "qcm", choix: ["4 : 3", "3 : 4", "3 : 7"], bonne: 1 },
      dessin: etagere(),
    },
    {
      tag: "Énigme 2 · Le jus de fruits",
      titre: "Orange et mangue",
      question: `Kenji mélange du jus d'orange et du jus de mangue.<br>Le ratio orange : mangue est 5 : 3.<br>Il verse 30 cL de jus d'orange.<br><br>Combien de centilitres de jus de mangue doit-il ajouter ?`,
      reponse: `Le ratio 5 : 3 donne l'égalité de quotients ${frac("o", 5)} = ${frac("m", 3)}.<br>Avec o = 30 : ${frac(30, 5)} = 6. Une part vaut 6 cL.<br>Donc ${frac("m", 3)} = 6, et m = 6 × 3 = 18.<br>Il ajoute <span class="big">18 cL</span> de jus de mangue.<br>Contrôle : 30 : 18, en divisant par 6, redonne 5 : 3.`,
      consigne: "Combien de cL de jus de mangue ?",
      verification: { type: "courte", attendus: ["18"], unite: "cL" },
      dessin: jus(),
    },
    {
      tag: "Énigme 3 · Le terrarium",
      titre: "Trois couches",
      question: `Pour son terrarium, Lou met trois couches.<br>Le ratio sable : terre : argile est 1 : 3 : 2.<br>Elle met 600 g de terre.<br><br>Combien de grammes de billes d'argile faut-il ?`,
      reponse: `La terre compte pour 3 parts : 600 ÷ 3 = 200. Une part vaut 200 g.<br>L'argile compte pour 2 parts : 2 × 200 = 400.<br>Il faut <span class="big">400 g</span> d'argile.<br>Et le sable : 1 × 200 = 200 g.<br>Contrôle : 200 : 600 : 400, en divisant par 200, redonne 1 : 3 : 2.`,
      consigne: "Combien de grammes d'argile ?",
      verification: { type: "courte", attendus: ["400"], unite: "g" },
      dessin: terrarium(),
    },
    {
      tag: "Énigme 4 · Le relais",
      titre: "Le partage de la course",
      question: `Inès et Paul courent un relais de 1 600 m.<br>Ils se partagent la distance selon le ratio Inès : Paul = 3 : 5.<br><br>Combien de mètres court Inès ?`,
      reponse: `On compte les parts : 3 + 5 = 8 parts.<br>Une part : 1 600 ÷ 8 = 200 m.<br>Inès court 3 parts : 3 × 200 = 600.<br>Inès court <span class="big">600 m</span>, Paul 5 × 200 = 1 000 m.<br>Contrôle : 600 + 1 000 = 1 600.`,
      consigne: "Combien de mètres court Inès ?",
      verification: { type: "qcm", choix: ["600 m", "533 m", "960 m"], bonne: 0 },
      dessin: relais(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les chiens du refuge",
      sorte: "piege",
      question: `Un refuge accueille 40 animaux : des chiens et des chats.<br>Le ratio chiens : chats est 3 : 5.<br>Hugo dit : « Les chiens font ${frac(3, 5)} des animaux. 40 × 3 ÷ 5 = 24. »<br><br><b>Combien y a-t-il vraiment de chiens ?</b>`,
      reponse: `Hugo s'est trompé ! Avec 24 chiens, il resterait 16 chats.<br>Or 24 : 16 = 3 : 2, pas 3 : 5.<br>Le 5 compte les parts des chats, pas le total.<br>Le total compte 3 + 5 = 8 parts. Une part : 40 ÷ 8 = 5.<br>Chiens : 3 × 5 = 15. Chats : 5 × 5 = 25.<br>Il y a <span class="big">15 chiens</span>.`,
      consigne: "Combien y a-t-il de chiens ?",
      verification: { type: "qcm", choix: ["24", "25", "15"], bonne: 2 },
      dessin: refuge(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La collection de timbres",
      sorte: "defi",
      question: `Ana et Bilal collectionnent les timbres.<br>Le ratio Ana : Bilal est 7 : 4.<br>Ana a 36 timbres de plus que Bilal.<br><br>Combien de timbres ont-ils en tout ?`,
      reponse: `L'écart aussi se compte en parts : 7 − 4 = 3 parts.<br>Ces 3 parts valent 36 timbres. Une part : 36 ÷ 3 = 12.<br>Ana : 7 × 12 = 84. Bilal : 4 × 12 = 48.<br>Contrôle : 84 − 48 = 36.<br>En tout : 84 + 48 = <span class="big">132 timbres</span>.`,
      consigne: "Combien de timbres ont-ils en tout ?",
      verification: { type: "courte", attendus: ["132"] },
      dessin: timbres(),
    },
  ],
};

export default problemes;
