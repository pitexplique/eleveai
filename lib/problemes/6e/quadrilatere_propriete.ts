// Énigmes à projeter — 6e, notion quadrilatere_propriete (lire un codage,
// relier propriétés et nature, conclure, compléter un rectangle en carré, le
// piège « 2 paires de côtés parallèles, donc rectangle », le défi des
// étiquettes du carré). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-quadrilatere-propriete.tsx) :
// petit carré = angle droit, traits = même longueur, même chevron = côtés
// parallèles ; 2 paires de côtés parallèles : parallélogramme ; 4 angles droits :
// rectangle ; 4 côtés égaux : losange ; les deux : carré ; on conclut avec ce
// qui est codé, jamais à l'œil.
// ⚠ Pas de doublon avec quadrilatere_figure.ts (diagonale, carreau losange,
// rugby « pas un carré », côtés opposés du tennis, carré penché, rectangles
// cachés).
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

/** n chevrons « côtés parallèles » au milieu de [PQ], pointés de P vers Q.
 *  Deux côtés parallèles reçoivent le même nombre de chevrons, dans le même sens. */
const chevron = ([x1, y1]: P, [x2, y2]: P, n: number) => {
  const l = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / l, uy = (y2 - y1) / l;
  const vx = -uy, vy = ux;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  let s = "";
  for (let k = 0; k < n; k++) {
    const d = (k - (n - 1) / 2) * 12;
    const cx = mx + ux * d, cy = my + uy * d;
    s += `<path d="M${r1(cx - ux * 7 + vx * 9)} ${r1(cy - uy * 7 + vy * 9)} L${r1(cx + ux * 4)} ${r1(cy + uy * 4)} L${r1(cx - ux * 7 - vx * 9)} ${r1(cy - uy * 7 - vy * 9)}" stroke="${C.jaune}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  }
  return s;
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

const lettre = (x: number, y: number, l: string) =>
  `<text x="${x}" y="${y}" fill="${C.craie}" font-size="30" text-anchor="middle">${l}</text>`;

// 1. La vitre de la véranda : A(100 ; 110), B(300 ; 110), C(380 ; 310),
// D(100 ; 310). AB = AD = 200 px (codés d'un trait). Angles droits en A et D
// (AB horizontal, AD vertical, DC horizontal). Angle B ≈ 111,8°, angle C ≈ 68,2°
// (somme 360°) : pas droits, pas codés.
const vitre = () => {
  const A: P = [100, 110], B: P = [300, 110], Cc: P = [380, 310], D: P = [100, 310];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une vitre ABCD : deux angles droits codés en A et en D, et deux côtés codés de même longueur, AB et AD">
  ${poly([A, B, Cc, D], C.bleu, ".18")}
  ${angleDroit(A, B, D)}${angleDroit(D, A, Cc)}
  ${trait(A, B)}${trait(A, D)}
  ${lettre(80, 100, "A")}${lettre(318, 100, "B")}${lettre(404, 336, "C")}${lettre(80, 340, "D")}
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'angles droits${NB}?</text>
  </svg>`;
};

// 2. Le demi-terrain de volley : 9 m × 9 m, 25 px pour 1 m → 225 × 225 px.
// x de 127,5 à 352,5 ; y de 80 à 305. Le filet sur le côté gauche (x = 127,5).
// 4 angles droits codés, « 9 m » écrit sur les 4 côtés.
const volley = () => {
  const A: P = [127.5, 80], B: P = [352.5, 80], Cc: P = [352.5, 305], D: P = [127.5, 305];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un demi-terrain de volley : quatre angles droits codés et quatre côtés de 9 mètres">
  ${poly([A, B, Cc, D], C.jaune, ".15")}
  <path d="M127.5 66 L127.5 319" stroke="${C.pale}" stroke-width="6" stroke-dasharray="6 5" fill="none"/>
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  <text x="240" y="60" fill="${C.craie}" font-size="24" text-anchor="middle">9 m</text>
  <text x="240" y="337" fill="${C.craie}" font-size="24" text-anchor="middle">9 m</text>
  <text x="364" y="200" fill="${C.craie}" font-size="24" text-anchor="start">9 m</text>
  <text x="112" y="200" fill="${C.craie}" font-size="24" text-anchor="end">9 m</text>
  <text x="127.5" y="52" fill="${C.pale}" font-size="20" text-anchor="middle">filet</text>
  <text x="240" y="207" font-size="40" text-anchor="middle">🏐</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle est sa nature${NB}?</text>
  </svg>`;
};

// 3. Le panneau solaire : un rectangle A(90 ; 100), B(390 ; 100), C(390 ; 250),
// D(90 ; 250), 300 × 150 px. Codage : un chevron sur [AB] et [DC], deux
// chevrons sur [AD] et [BC] ; UN SEUL angle droit codé, en D.
const panneauSolaire = () => {
  const A: P = [90, 100], B: P = [390, 100], Cc: P = [390, 250], D: P = [90, 250];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un panneau solaire ABCD : deux paires de côtés parallèles codées par des chevrons, et un seul angle droit codé en D">
  ${poly([A, B, Cc, D], C.bleu, ".2")}
  ${chevron(A, B, 1)}${chevron(D, Cc, 1)}${chevron(A, D, 2)}${chevron(B, Cc, 2)}
  ${angleDroit(D, A, Cc)}
  ${lettre(70, 92, "A")}${lettre(410, 92, "B")}${lettre(410, 280, "C")}${lettre(70, 280, "D")}
  <text x="440" y="50" font-size="36" text-anchor="middle">☀️</text>
  <text x="240" y="320" fill="${C.pale}" font-size="20" text-anchor="middle">même chevron${NB}= côtés parallèles</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle est sa nature${NB}?</text>
  </svg>`;
};

// 4. Le tapis de yoga : 180 cm × 60 cm, 2 px pour 1 cm → 360 × 120 px.
// x de 60 à 420, y de 140 à 260. 4 angles droits codés. Aucune ligne de coupe
// dessinée (ce serait la réponse).
const tapis = () => {
  const A: P = [60, 140], B: P = [420, 140], Cc: P = [420, 260], D: P = [60, 260];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tapis rectangulaire de 180 centimètres sur 60 centimètres, quatre angles droits codés">
  ${poly([A, B, Cc, D], C.rose, ".2")}
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  <text x="240" y="125" fill="${C.craie}" font-size="24" text-anchor="middle">180 cm</text>
  <text x="48" y="196" fill="${C.craie}" font-size="22" text-anchor="end">60</text>
  <text x="48" y="220" fill="${C.craie}" font-size="22" text-anchor="end">cm</text>
  <text x="240" y="80" font-size="40" text-anchor="middle">🧘</text>
  <text x="240" y="330" fill="${C.rose}" font-size="26" text-anchor="middle">Le plus grand carré${NB}:</text>
  <text x="240" y="365" fill="${C.rose}" font-size="26" text-anchor="middle">quel côté${NB}?</text>
  </svg>`;
};

// 5. La pièce de puzzle de Léa : un parallélogramme A(70 ; 280), B(310 ; 280),
// C(390 ; 141,4), D(150 ; 141,4). AB = DC = 240 px ; AD = BC = 160 px à 60°
// (160 × cos 60° = 80 ; 160 × sin 60° ≈ 138,6). Angles 60° et 120° : aucun droit.
// Un chevron sur [AB] et [DC], deux sur [AD] et [BC].
const puzzle = () => {
  const A: P = [70, 280], B: P = [310, 280], Cc: P = [390, 141.4], D: P = [150, 141.4];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une pièce ABCD avec deux paires de côtés parallèles codées, sans aucun angle droit codé">
  ${poly([A, B, Cc, D], C.jaune, ".2")}
  ${chevron(A, B, 1)}${chevron(D, Cc, 1)}${chevron(A, D, 2)}${chevron(B, Cc, 2)}
  ${lettre(52, 306, "A")}${lettre(318, 310, "B")}${lettre(410, 134, "C")}${lettre(136, 128, "D")}
  <text x="240" y="60" fill="${C.pale}" font-size="20" text-anchor="middle">même chevron${NB}= côtés parallèles</text>
  <text x="240" y="342" fill="${C.craie}" font-size="22" text-anchor="middle">Léa${NB}: «${NB}2 paires de côtés parallèles,</text>
  <text x="240" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">donc c'est un rectangle${NB}!${NB}»</text>
  <text x="240" y="402" fill="${C.rose}" font-size="24" text-anchor="middle">A-t-elle raison${NB}?</text>
  </svg>`;
};

// 6. Le carré codé : A(160 ; 70), B(320 ; 70), C(320 ; 230), D(160 ; 230),
// côté 160 px. 4 côtés codés égaux, 4 angles droits codés.
// Quatre étiquettes : boîtes de 200 × 40 en (30 ; 262), (250 ; 262),
// (30 ; 314), (250 ; 314).
const etiquettes = () => {
  const A: P = [160, 70], B: P = [320, 70], Cc: P = [320, 230], D: P = [160, 230];
  const boite = (x: number, y: number, mot: string) =>
    `<rect x="${x}" y="${y}" width="200" height="40" rx="8" fill="none" stroke="${C.pale}" stroke-width="3"/>` +
    `<text x="${x + 100}" y="${y + 28}" fill="${C.craie}" font-size="22" text-anchor="middle">${mot}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré codé, quatre côtés égaux et quatre angles droits, et quatre étiquettes : parallélogramme, rectangle, losange, carré">
  ${poly([A, B, Cc, D], C.bleu, ".18")}
  ${trait(A, B)}${trait(B, Cc)}${trait(Cc, D)}${trait(D, A)}
  ${angleDroit(A, B, D)}${angleDroit(B, A, Cc)}${angleDroit(Cc, B, D)}${angleDroit(D, A, Cc)}
  ${boite(30, 262, "parallélogramme")}${boite(250, 262, "rectangle")}
  ${boite(30, 314, "losange")}${boite(250, 314, "carré")}
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'étiquettes vont${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "quadrilatere_propriete",
  titre: "Énigmes sur les propriétés des quadrilatères",
  description: "La vitre du vitrier, le terrain de volley, le panneau solaire, le tapis de yoga, le piège des côtés parallèles, le défi des étiquettes du carré.",
  problemes: [
    {
      tag: "Énigme 1 · Chez le vitrier",
      titre: "La vitre de la véranda",
      question: `Sacha est vitrier. Il lit le plan d'une vitre.<br>Sur le plan, les marques sont des <b>codages</b>.<br><br>Combien d'<b>angles droits</b> le codage montre-t-il ?`,
      reponse: `Un petit carré dans un coin : un angle droit.<br>Il y en a un en A et un en D.<br>Les deux petits traits disent autre chose : AB = AD.<br>Le codage montre <span class="big">2 angles droits</span>.`,
      consigne: "Sur le plan de la vitre ABCD, combien d'angles droits sont codés ?",
      verification: { type: "courte", attendus: ["2", "deux"], unite: "angles droits" },
      dessin: vitre(),
    },
    {
      tag: "Énigme 2 · Au volley",
      titre: "Le demi-terrain de volley",
      question: `Yanis regarde un demi-terrain de volley.<br>Il a <b>4 angles droits</b>.<br>Ses <b>4 côtés</b> mesurent <b>9 m</b>.<br><br>Quelle est sa nature ?`,
      reponse: `4 angles droits : c'est un rectangle.<br>4 côtés égaux : c'est un losange.<br>Il est les deux à la fois.<br>Le demi-terrain est un <span class="big">carré</span>.`,
      consigne: "Un quadrilatère a 4 angles droits et 4 côtés de 9 m. Quelle est sa nature ?",
      verification: { type: "qcm", choix: ["Un rectangle, pas un carré", "Un losange, pas un carré", "Un carré"], bonne: 2 },
      dessin: volley(),
    },
    {
      tag: "Énigme 3 · Sur le toit",
      titre: "Le panneau solaire",
      question: `Clara pose un panneau solaire ABCD.<br>Ses côtés opposés sont <b>parallèles</b> deux à deux.<br>Un seul angle droit est codé : en <b>D</b>.<br><br>Quelle est la nature du panneau ?`,
      reponse: `2 paires de côtés parallèles : c'est un parallélogramme.<br>[AD] est perpendiculaire à [DC].<br>Or [AB] est parallèle à [DC].<br>Donc [AD] est aussi perpendiculaire à [AB].<br>Même chose aux autres coins : les 4 angles sont droits.<br>Le panneau est un <span class="big">rectangle</span>.`,
      consigne: "ABCD a 2 paires de côtés parallèles et un angle droit en D. Quelle est sa nature ?",
      verification: { type: "qcm", choix: ["Un rectangle", "Un losange", "On ne peut pas savoir"], bonne: 0 },
      dessin: panneauSolaire(),
    },
    {
      tag: "Énigme 4 · Au yoga",
      titre: "Le tapis de yoga",
      question: `Zoé a un tapis rectangulaire de <b>180 cm</b> sur <b>60 cm</b>.<br>Elle veut y couper un morceau <b>carré</b>.<br>Le plus grand possible.<br><br>Combien mesure le côté du carré ?`,
      reponse: `Le morceau garde les angles droits du tapis.<br>Pour un carré, il faut en plus deux côtés qui se suivent égaux.<br>Le carré doit tenir dans la largeur : 60 cm au plus.<br>Le plus grand a donc un côté de 60 cm, et l'autre aussi.<br>Le côté du carré mesure <span class="big">60 cm</span>.<br>(Et 180 ÷ 60 = 3 : elle peut couper 3 carrés.)`,
      consigne: "Dans un tapis rectangulaire de 180 cm sur 60 cm, on coupe le plus grand carré possible. Combien mesure son côté ?",
      verification: { type: "courte", attendus: ["60"], unite: "cm" },
      dessin: tapis(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La pièce de puzzle",
      sorte: "piege",
      question: `Léa trouve une pièce de puzzle.<br>Elle a <b>2 paires de côtés parallèles</b>.<br><b>Aucun angle droit</b> n'est codé.<br>Léa dit : « Alors c'est un rectangle ! »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! 2 paires de côtés parallèles : c'est un parallélogramme.<br>Pour dire « rectangle », il faut aussi un angle droit.<br>Ici, aucun n'est codé. Et on ne se fie pas à l'œil.<br>Léa se trompe : c'est un <span class="big">parallélogramme</span>.`,
      consigne: "Un quadrilatère a 2 paires de côtés parallèles et aucun angle droit codé. Est-ce forcément un rectangle ?",
      verification: { type: "qcm", choix: ["Oui, Léa a raison", "Non : c'est un parallélogramme", "Non : c'est un losange"], bonne: 1 },
      dessin: puzzle(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les étiquettes du carré",
      sorte: "defi",
      question: `Hugo a 4 étiquettes : <b>parallélogramme</b>, <b>rectangle</b>, <b>losange</b>, <b>carré</b>.<br>Il veut les coller sur un carré.<br>Il ne colle que celles qui disent vrai.<br><br>Combien d'étiquettes peut-il coller ?`,
      reponse: `Le carré a 4 angles droits : c'est un rectangle.<br>Il a 4 côtés égaux : c'est un losange.<br>Ses côtés opposés sont parallèles : c'est un parallélogramme.<br>Et c'est bien un carré.<br>Hugo colle <span class="big">4 étiquettes</span>.`,
      consigne: "Parallélogramme, rectangle, losange, carré : combien de ces noms sont vrais pour un carré ?",
      verification: { type: "courte", attendus: ["4", "quatre"], unite: "étiquettes" },
      dessin: etiquettes(),
    },
  ],
};

export default problemes;
