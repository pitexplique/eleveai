// Énigmes à projeter — 6e, notion quadrilatere_figure (les diagonales, le
// losange reconnu à ses codages, carré ou rectangle, les côtés opposés, le
// piège du carré posé sur la pointe, le défi des rectangles cachés).
// 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-quadrilateres.tsx) : nommer ABCD
// dans l'ordre du tour, côtés opposés / consécutifs, 2 diagonales ; rectangle
// = 4 angles droits, losange = 4 côtés égaux, carré = les deux ; on lit les
// codages, pas l'allure ; un carré est aussi un rectangle.
// Phrases courtes (les 6e lisent difficilement). Figures exactes : coordonnées
// calculées (notées dans chaque fonction), codages calculés par les outils.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;

/** Le petit trait « même longueur » au milieu du segment [PQ], perpendiculaire. */
const trait = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.rose) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const l = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / l) * 12;
  const ny = ((x2 - x1) / l) * 12;
  return `<path d="M${r1(mx - nx)} ${r1(my - ny)} L${r1(mx + nx)} ${r1(my + ny)}" stroke="${couleur}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
};

/** Le petit carré « angle droit » au sommet S, entre les côtés vers A et vers B. */
const angleDroit = ([sx, sy]: P, [ax, ay]: P, [bx, by]: P, t = 20) => {
  const la = Math.hypot(ax - sx, ay - sy);
  const lb = Math.hypot(bx - sx, by - sy);
  const ux = ((ax - sx) / la) * t, uy = ((ay - sy) / la) * t;
  const vx = ((bx - sx) / lb) * t, vy = ((by - sy) / lb) * t;
  return `<path d="M${r1(sx + ux)} ${r1(sy + uy)} L${r1(sx + ux + vx)} ${r1(sy + uy + vy)} L${r1(sx + vx)} ${r1(sy + vy)}" stroke="${C.bleu}" stroke-width="3" fill="none"/>`;
};

const poly = (pts: P[], couleur: string, opacite = ".18") =>
  `<path d="M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z" fill="${couleur}" fill-opacity="${opacite}" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>`;

// 1. Le skatepark : un quadrilatère quelconque A(110 ; 110), B(360 ; 80),
// C(400 ; 300), D(90 ; 320). Aucune diagonale dessinée.
const skatepark = () => {
  const A: P = [110, 110], B: P = [360, 80], Cc: P = [400, 300], D: P = [90, 320];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre modules A, B, C et D reliés en un quadrilatère ABCD, sans diagonale tracée">
  ${poly([A, B, Cc, D], C.pale, ".12")}
  ${[A, B, Cc, D].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.jaune}"/>`).join("")}
  <text x="88" y="98" fill="${C.craie}" font-size="30" text-anchor="middle">A</text>
  <text x="384" y="70" fill="${C.craie}" font-size="30" text-anchor="middle">B</text>
  <text x="428" y="318" fill="${C.craie}" font-size="30" text-anchor="middle">C</text>
  <text x="66" y="342" fill="${C.craie}" font-size="30" text-anchor="middle">D</text>
  <text x="245" y="215" font-size="40" text-anchor="middle">🛹</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Où est une diagonale${NB}?</text>
  </svg>`;
};

// 2. Le carreau : un losange de centre (240 ; 200), demi-diagonales 150 et 90.
// Côté √(150² + 90²) ≈ 174,9 px pour les quatre. Angle en haut ≈ 118°, pas droit.
const carreau = () => {
  const G: P = [90, 200], H: P = [240, 110], Dr: P = [390, 200], B: P = [240, 290];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un carreau à quatre côtés codés de même longueur, sans angle droit codé">
  ${poly([G, H, Dr, B], C.bleu, ".18")}
  ${trait(G, H)}${trait(H, Dr)}${trait(Dr, B)}${trait(B, G)}
  <text x="240" y="70" fill="${C.pale}" font-size="20" text-anchor="middle">un trait${NB}= même longueur</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle est sa nature${NB}?</text>
  </svg>`;
};

// 3. Le terrain de rugby : 100 m × 70 m, 3 px pour 1 m → 300 × 210 px.
// x de 90 à 390, y de 70 à 280. 4 angles droits codés.
const rugby = () => {
  const A: P = [90, 70], B: P = [390, 70], Cc: P = [390, 280], D: P = [90, 280];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain rectangulaire de 100 mètres sur 70 mètres, quatre angles droits codés">
  ${poly([A, B, Cc, D], C.jaune, ".15")}
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  <text x="240" y="55" fill="${C.craie}" font-size="24" text-anchor="middle">100 m</text>
  <text x="400" y="183" fill="${C.craie}" font-size="24" text-anchor="start">70 m</text>
  <text x="240" y="190" font-size="40" text-anchor="middle">🏉</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Est-ce un carré${NB}?</text>
  </svg>`;
};

// 4. Le court de tennis ABCD : AB = 24 m, BC = 11 m, 12 px pour 1 m
// → 288 × 132 px. x de 96 à 384, y de 110 à 242.
const tennis = () => {
  const A: P = [96, 110], B: P = [384, 110], Cc: P = [384, 242], D: P = [96, 242];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le rectangle ABCD : AB mesure 24 mètres, BC mesure 11 mètres, CD est à trouver">
  ${poly([A, B, Cc, D], C.bleu, ".15")}
  <path d="M240 110 L240 242" stroke="${C.craie}" stroke-width="2" stroke-dasharray="8 6" fill="none"/>
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  <text x="78" y="100" fill="${C.craie}" font-size="30" text-anchor="middle">A</text>
  <text x="402" y="100" fill="${C.craie}" font-size="30" text-anchor="middle">B</text>
  <text x="402" y="272" fill="${C.craie}" font-size="30" text-anchor="middle">C</text>
  <text x="78" y="272" fill="${C.craie}" font-size="30" text-anchor="middle">D</text>
  <text x="240" y="95" fill="${C.craie}" font-size="24" text-anchor="middle">24 m</text>
  <text x="398" y="184" fill="${C.craie}" font-size="24" text-anchor="start">11 m</text>
  <text x="240" y="280" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <text x="420" y="60" font-size="36" text-anchor="middle">🎾</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Combien mesure [CD]${NB}?</text>
  </svg>`;
};

// 5. Le panneau « route prioritaire » : un carré de côté 200 px tourné de 45°,
// centre (240 ; 190) ; demi-diagonale 200 ÷ √2 ≈ 141,4 px.
// Codages : 4 côtés égaux ET 4 angles droits.
const panneau = () => {
  const h = 141.4;
  const H: P = [240, r1(190 - h)], Dr: P = [r1(240 + h), 190], B: P = [240, r1(190 + h)], G: P = [r1(240 - h), 190];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un panneau posé sur la pointe : quatre côtés codés égaux et quatre angles droits codés">
  ${poly([H, Dr, B, G], C.jaune, ".35")}
  ${trait(H, Dr)}${trait(Dr, B)}${trait(B, G)}${trait(G, H)}
  ${angleDroit(H, G, Dr)}${angleDroit(Dr, H, B)}${angleDroit(B, Dr, G)}${angleDroit(G, B, H)}
  <text x="240" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">Max${NB}: «${NB}C'est un losange${NB}!${NB}»</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;
};

// 6. L'étagère : 13 cm × 5 cm, 28 px pour 1 cm → 364 × 140 px.
// x de 58 à 422, y de 110 à 250. Cloisons en x = 198 (5 cm) et x = 338 (10 cm).
// Trois cases : 5 × 5, 5 × 5, 3 × 5.
const etagere = () => {
  const A: P = [58, 110], B: P = [422, 110], Cc: P = [422, 250], D: P = [58, 250];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une étagère rectangulaire coupée par deux cloisons en trois cases : 5 centimètres, 5 centimètres et 3 centimètres de large, 5 centimètres de haut">
  ${poly([A, B, Cc, D], C.jaune, ".15")}
  <path d="M198 110 L198 250 M338 110 L338 250" stroke="${C.craie}" stroke-width="4" fill="none"/>
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  <text x="128" y="285" fill="${C.craie}" font-size="22" text-anchor="middle">5 cm</text>
  <text x="268" y="285" fill="${C.craie}" font-size="22" text-anchor="middle">5 cm</text>
  <text x="380" y="285" fill="${C.craie}" font-size="22" text-anchor="middle">3 cm</text>
  <text x="50" y="188" fill="${C.craie}" font-size="22" text-anchor="end">5</text>
  <text x="50" y="212" fill="${C.craie}" font-size="22" text-anchor="end">cm</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de rectangles${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "quadrilatere_figure",
  titre: "Énigmes sur les quadrilatères",
  description: "Les diagonales du skatepark, le carreau du carreleur, le terrain de rugby, le court de tennis, le piège du panneau penché, le défi des rectangles cachés dans l'étagère.",
  problemes: [
    {
      tag: "Énigme 1 · Au skatepark",
      titre: "Les modules du skatepark",
      question: `Au skatepark, il y a <b>4 modules</b> : A, B, C et D.<br>Ils forment le quadrilatère <b>ABCD</b>.<br>Noé veut rouler sur une <b>diagonale</b>.<br><br>Quel trajet doit-il prendre ?`,
      reponse: `Une diagonale relie deux sommets qui ne se suivent pas.<br>A et B se suivent : [AB] est un côté.<br>B et C se suivent : [BC] est un côté.<br>A et C ne se suivent pas : [AC] est une diagonale.<br>Noé roule sur <span class="big">[AC]</span>.`,
      consigne: "Dans le quadrilatère ABCD, quel segment est une diagonale ?",
      verification: { type: "qcm", choix: ["[AB]", "[BC]", "[AC]"], bonne: 2 },
      dessin: skatepark(),
    },
    {
      tag: "Énigme 2 · Chez le carreleur",
      titre: "Le carreau du carreleur",
      question: `Un carreleur pose un carreau.<br>Ses <b>4 côtés</b> sont codés de même longueur.<br><b>Aucun angle droit</b> n'est codé.<br><br>Quelle est la nature du carreau ?`,
      reponse: `Les petits traits disent : même longueur.<br>4 côtés égaux : c'est un losange ou un carré.<br>Aucun angle droit n'est codé.<br>On ne peut pas dire « carré ».<br>Le carreau est un <span class="big">losange</span>.`,
      consigne: "Un quadrilatère a 4 côtés codés égaux et aucun angle droit codé. Quelle est sa nature ?",
      verification: { type: "qcm", choix: ["Un rectangle", "Un losange", "Un carré"], bonne: 1 },
      dessin: carreau(),
    },
    {
      tag: "Énigme 3 · Au rugby",
      titre: "Le terrain de rugby",
      question: `Le terrain de rugby a <b>4 angles droits</b>.<br>Il mesure <b>100 m</b> de long.<br>Il mesure <b>70 m</b> de large.<br><br>Est-ce un carré ?`,
      reponse: `4 angles droits : c'est un rectangle.<br>Un carré a aussi 4 côtés égaux.<br>Ici, 100 m et 70 m : les côtés ne sont pas égaux.<br>Ce n'est <span class="big">pas un carré, c'est un rectangle</span>.`,
      consigne: "Un quadrilatère a 4 angles droits, des côtés de 100 m et de 70 m. Est-ce un carré ?",
      verification: { type: "qcm", choix: ["Non, c'est un rectangle", "Oui, il a 4 angles droits", "Non, c'est un losange"], bonne: 0 },
      dessin: rugby(),
    },
    {
      tag: "Énigme 4 · Au tennis",
      titre: "Le court de tennis",
      question: `Le court de tennis est le rectangle <b>ABCD</b>.<br>Le côté [AB] mesure <b>24 m</b>.<br>Le côté [BC] mesure <b>11 m</b>.<br><br>Combien mesure le côté <b>[CD]</b> ?`,
      reponse: `[CD] ne touche pas [AB] : c'est le côté opposé.<br>Dans un rectangle, les côtés opposés ont la même longueur.<br>[CD] mesure comme [AB].<br>[CD] mesure <span class="big">24 m</span>.`,
      consigne: "ABCD est un rectangle avec AB = 24 m et BC = 11 m. Combien mesure [CD] ?",
      verification: { type: "courte", attendus: ["24"], unite: "m" },
      dessin: tennis(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le panneau penché",
      sorte: "piege",
      question: `Sur la route, Max voit un panneau jaune.<br>Ses <b>4 côtés</b> sont codés égaux.<br>Ses <b>4 angles</b> sont codés droits.<br>Max dit : « Il est penché, ce n'est pas un carré ! »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! On lit les codages, pas l'allure.<br>4 côtés égaux et 4 angles droits : les deux à la fois.<br>C'est un carré, posé sur sa pointe.<br>Un carré penché reste un carré.<br>(C'est aussi un losange : un losange qui a 4 angles droits.)<br>Le panneau est un <span class="big">carré</span>.`,
      consigne: "Un quadrilatère penché a 4 côtés égaux et 4 angles droits. Est-ce un carré ?",
      verification: { type: "qcm", choix: ["Max a raison : ce n'est pas un carré", "Max a tort : c'est un carré", "On ne peut pas savoir"], bonne: 1 },
      dessin: panneau(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les rectangles cachés",
      sorte: "defi",
      question: `Inès dessine une étagère.<br>Deux cloisons la coupent en <b>3 cases</b>.<br>Les cases font 5 cm, 5 cm et 3 cm de large.<br>Toutes ont 4 angles droits.<br><br>Combien de <b>rectangles</b> vois-tu en tout ?`,
      reponse: `Les 3 cases seules : 3 rectangles.<br>Attention : les 2 carrés comptent. Un carré est un rectangle.<br>Deux cases côte à côte : 5 + 5 et 5 + 3, donc 2 rectangles.<br>L'étagère entière : 1 rectangle.<br>3 + 2 + 1 = 6. Il y a <span class="big">6 rectangles</span>.`,
      consigne: "Une étagère rectangulaire est coupée en 3 cases (5 cm, 5 cm, 3 cm). Combien de rectangles en tout ?",
      verification: { type: "courte", attendus: ["6"], unite: "rectangles" },
      dessin: etagere(),
    },
  ],
};

export default problemes;
