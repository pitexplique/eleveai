// Énigmes à projeter — 5e, notion parallelogramme (côtés, angles,
// diagonales, parallélogrammes particuliers). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="24" text-anchor="middle">${t}</text>`;

// 30 px par cm : AB = 7 cm (210 px), AD = 4 cm (120 px, penché à 60°).
const cotes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le parallélogramme ABCD : AB = 7 cm et BC = 4 cm">
  <path d="M60 300 L270 300 L330 196 L120 196 Z" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  ${etiq(50, 330, "A")}${etiq(280, 330, "B")}${etiq(345, 190, "C")}${etiq(110, 186, "D")}
  ${etiq(165, 330, "7 cm", C.bleu)}${etiq(335, 255, "4 cm", C.bleu)}
  <text x="240" y="390" fill="${C.rose}" font-size="28" text-anchor="middle">périmètre : ?</text>
  </svg>`;

// Angle en A de 65° au bon rapport.
const angles = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le parallélogramme ABCD avec un angle de 65 degrés en A">
  <path d="M70 300 L330 300 L397.6 155 L137.6 155 Z" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M110 300 A40 40 0 0 0 86.9 263.7" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  ${etiq(125, 285, "65°", C.bleu)}
  <path d="M295 300 A35 35 0 0 1 344.8 268.3" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${etiq(310, 260, "?", C.rose)}
  ${etiq(58, 330, "A")}${etiq(340, 330, "B")}${etiq(412, 150, "C")}${etiq(125, 145, "D")}
  </svg>`;

// Jardin ABCD, allées en diagonale qui se croisent en O (240 ; 220).
const jardin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un jardin en parallélogramme avec deux allées en diagonale et un arroseur au croisement">
  <path d="M60 320 L340 320 L420 120 L140 120 Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 320 L420 120 M340 320 L140 120" stroke="${C.pale}" stroke-width="6" stroke-opacity=".6"/>
  <circle cx="240" cy="220" r="10" fill="${C.bleu}"/>
  ${etiq(48, 345, "A")}${etiq(352, 345, "B")}${etiq(432, 112, "C")}${etiq(128, 112, "D")}
  ${etiq(330, 155, "AC = 10 m", C.craie)}
  ${etiq(150, 250, "?", C.rose)}
  <text x="240" y="390" fill="${C.bleu}" font-size="22" text-anchor="middle">l'arroseur est au croisement des allées</text>
  </svg>`;

// Deux diagonales de même longueur (300 px) qui se coupent en leur milieu, à 60°.
const diagonales = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux segments de même longueur qui se coupent en leur milieu">
  <path d="M110.1 135 L369.9 285 M369.9 135 L110.1 285" stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="110.1" cy="135" r="7" fill="${C.rose}"/><circle cx="369.9" cy="285" r="7" fill="${C.rose}"/>
  <circle cx="369.9" cy="135" r="7" fill="${C.rose}"/><circle cx="110.1" cy="285" r="7" fill="${C.rose}"/>
  <circle cx="240" cy="210" r="6" fill="${C.craie}"/>
  <text x="240" y="70" fill="${C.craie}" font-size="22" text-anchor="middle">même longueur, même milieu</text>
  <text x="240" y="360" fill="${C.rose}" font-size="26" text-anchor="middle">on relie les 4 bouts : ?</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un quadrilatère avec seulement deux côtés parallèles">
  <path d="M60 300 L420 300 L330 140 L170 140 Z" fill="${C.rose}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M230 292 L246 300 L230 308 M240 132 L256 140 L240 148" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="240" y="80" fill="${C.rose}" font-size="26" text-anchor="middle">« deux côtés parallèles : c'est un</text>
  <text x="240" y="112" fill="${C.rose}" font-size="26" text-anchor="middle">parallélogramme ! »</text>
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">les flèches : côtés parallèles</text>
  </svg>`;

// Angles de 45° en B et 135° en A, au bon rapport.
const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un parallélogramme : l'angle en A vaut trois fois l'angle en B">
  <path d="M60 300 L300 300 L420.2 179.8 L180.2 179.8 Z" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  ${etiq(50, 330, "B")}${etiq(310, 330, "A")}${etiq(435, 172, "D")}${etiq(170, 170, "C")}
  ${etiq(120, 290, "x", C.bleu)}${etiq(300, 270, "3x", C.rose)}
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">l'angle en A : ?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "parallelogramme",
  titre: "Énigmes sur les parallélogrammes",
  description: "Parallélogrammes en 5e : périmètre, angles consécutifs, diagonales et milieu, reconnaître un rectangle, piège du trapèze, angles x et 3x. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le tour du parallélogramme",
      titre: "Le périmètre",
      question: `ABCD est un parallélogramme. <b>AB = 7 cm</b> et <b>BC = 4 cm</b>.<br><br><b>Quel est son périmètre ?</b>`,
      reponse: `Les côtés opposés ont la même longueur : CD = 7 cm et DA = 4 cm.<br>7 + 4 + 7 + 4 = <span class="big">22 cm</span>.`,
      consigne: "Quel est le périmètre de ABCD, en cm ?",
      verification: { type: "courte", attendus: ["22"], unite: "cm" },
      dessin: cotes(),
    },
    {
      tag: "Énigme 2 · Les angles",
      titre: "L'angle en B",
      question: `ABCD est un parallélogramme. L'angle en <b>A</b> mesure <b>65°</b>.<br><br><b>Combien mesure l'angle en B ?</b>`,
      reponse: `Deux angles consécutifs d'un parallélogramme font 180° ensemble.<br>180 − 65 = <span class="big">115°</span>.`,
      consigne: "Combien mesure l'angle en B ?",
      verification: { type: "courte", attendus: ["115"], unite: "°" },
      dessin: angles(),
    },
    {
      tag: "Énigme 3 · Au jardin",
      titre: "L'arroseur",
      question: `Un jardin a la forme d'un parallélogramme ABCD. Deux allées suivent ses diagonales.<br>L'allée [AC] mesure <b>10 m</b>.<br><br><b>À quelle distance de A</b> est l'arroseur, au croisement des allées ?`,
      reponse: `Les diagonales d'un parallélogramme se coupent en leur milieu.<br>L'arroseur est au milieu de [AC] : 10 ÷ 2 = <span class="big">5 m</span>.`,
      consigne: "À quelle distance de A est l'arroseur, en m ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: jardin(),
    },
    {
      tag: "Énigme 4 · Reconnaître",
      titre: "Les diagonales égales",
      question: `Les diagonales d'un quadrilatère ont la <b>même longueur</b> et le <b>même milieu</b>.<br><br><b>Quel est ce quadrilatère ?</b>`,
      reponse: `Même milieu : c'est un parallélogramme. Diagonales de même longueur en plus : c'est un <span class="big">rectangle</span>.`,
      consigne: "Quel est ce quadrilatère ?",
      verification: { type: "qcm", choix: ["Un losange", "Un rectangle", "Un trapèze"], bonne: 1 },
      dessin: diagonales(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Une seule paire",
      sorte: "piege",
      question: `Ce quadrilatère a <b>deux côtés parallèles</b>.<br>Enzo dit : « C'est un parallélogramme. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Un parallélogramme a ses côtés opposés parallèles <b>deux à deux</b> : deux paires.<br>Ici, une seule paire : c'est un <span class="big">trapèze</span>.`,
      consigne: "Ce quadrilatère est-il un parallélogramme ?",
      verification: { type: "qcm", choix: ["Non : il faut deux paires de côtés parallèles", "Oui", "Oui, si les côtés sont longs"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Trois fois plus grand",
      sorte: "defi",
      question: `Dans un parallélogramme ABCD, l'angle en <b>A</b> est <b>3 fois</b> plus grand que l'angle en <b>B</b>.<br><br><b>Combien mesure l'angle en A ?</b>`,
      reponse: `A et B sont consécutifs : x + 3x = 4x = 180°, donc x = 45°.<br>L'angle en A mesure 3 × 45 = <span class="big">135°</span>.`,
      consigne: "Combien mesure l'angle en A ?",
      verification: { type: "courte", attendus: ["135"], unite: "°" },
      dessin: defi(),
    },
  ],
};

export default problemes;
