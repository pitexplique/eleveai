// Énigmes à projeter — 4e, notion quadrilatere_parallelogramme (les pièces du
// vitrail : reconnaître le parallélogramme au quadrillage, la lampe de bureau
// et les angles, l'étiquette de confiture et les diagonales, la lanterne en
// papier : démontrer par les diagonales, piège de la vigne : le côté oblique
// pris pour la hauteur, défi du chocolatier : deux hauteurs pour une aire).
// Figures exactes : vitrail à 24 px par carreau ; lampe à 1 px = 1 unité,
// angle de 65° en A (cos/sin) ; étiquette à 20 px par cm, AC = 16 cm,
// BD = 12 cm, diagonales à 60° ; lanterne à 10 px par cm, baguettes de 30 cm
// et 20 cm coupées en leur milieu ; vigne à 30 px par m (base 10, côté 6,
// hauteur 5) ; chocolat à 22 px par cm (AB = 12, AD = 8, hauteur 5,
// hauteur relative à (AD) = 7,5). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const rad = (deg: number) => (deg * Math.PI) / 180;
type P = { x: number; y: number };
const poly = (pts: P[]) => "M" + pts.map((p) => `${r1(p.x)} ${r1(p.y)}`).join(" L") + " Z";

// Le vitrail : 24 px par carreau, X = 24 + 24 gx, Y = 396 − 24 gy (18 × 14 carreaux).
// Pièce 1 (trapèze) en (1 ; 9) : (0;0) (5;0) (4;3) (1;3) — un seul couple de côtés parallèles.
// Pièce 2 (parallélogramme) en (9 ; 9) : (0;0) (5;0) (7;3) (2;3) — côtés (5;0) et (2;3) deux fois.
// Pièce 3 (quelconque) en (5 ; 2) : (0;0) (5;0) (7;4) (2;3) — (2;4) et (2;3) pas parallèles,
// (5;1) et (5;0) pas parallèles.
const vitrail = () => {
  const G = (gx: number, gy: number): P => ({ x: 24 + 24 * gx, y: 396 - 24 * gy });
  const piece = (ox: number, oy: number, pts: [number, number][]) => pts.map(([a, b]) => G(ox + a, oy + b));
  const p1 = piece(1, 9, [[0, 0], [5, 0], [4, 3], [1, 3]]);
  const p2 = piece(9, 9, [[0, 0], [5, 0], [7, 3], [2, 3]]);
  const p3 = piece(5, 2, [[0, 0], [5, 0], [7, 4], [2, 3]]);
  let grille = "";
  for (let i = 0; i <= 18; i++) grille += `M${24 + 24 * i} 60 L${24 + 24 * i} 396 `;
  for (let j = 0; j <= 14; j++) grille += `M24 ${396 - 24 * j} L456 ${396 - 24 * j} `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois pièces de verre à quatre côtés, numérotées 1, 2 et 3, dessinées sur un quadrillage">
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".45" fill="none"/>
  <path d="${poly(p1)}" fill="${C.bleu}" fill-opacity=".3" stroke="${C.bleu}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${poly(p2)}" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${poly(p3)}" fill="${C.rose}" fill-opacity=".3" stroke="${C.rose}" stroke-width="3" stroke-linejoin="round"/>
  ${txt(G(3.5, 13).x, G(3.5, 13).y - 8, "1", C.bleu, 26)}
  ${txt(G(13, 13).x, G(13, 13).y - 8, "2", C.jaune, 26)}
  ${txt(G(4, 4).x - 6, G(4, 4).y, "3", C.rose, 26, "end")}
  ${txt(240, 40, "le vitrail", C.pale, 22)}
  </svg>`;
};

// La lampe : A (80 ; 320), B (330 ; 320), AB = 250 px ; AD = 180 px à 65°.
// D = (80 + 180 cos 65° ; 320 − 180 sin 65°) ≈ (156,1 ; 156,9) ; C = B + (D − A) ≈ (406,1 ; 156,9).
const lampe = () => {
  const A = { x: 80, y: 320 };
  const B = { x: 330, y: 320 };
  const v = { x: 180 * Math.cos(rad(65)), y: -180 * Math.sin(rad(65)) };
  const D = { x: A.x + v.x, y: A.y + v.y };
  const Cc = { x: B.x + v.x, y: B.y + v.y };
  const aA = { x: A.x + 45 * Math.cos(rad(65)), y: A.y - 45 * Math.sin(rad(65)) };
  const aB = { x: B.x + 45 * Math.cos(rad(65)), y: B.y - 45 * Math.sin(rad(65)) };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le bras d'une lampe de bureau forme un parallélogramme ABCD ; l'angle en A mesure 65 degrés, l'angle en B est inconnu">
  <text x="60" y="80" font-size="44" text-anchor="middle">💡</text>
  <path d="${poly([A, B, Cc, D])}" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M125 320 A45 45 0 0 0 ${r1(aA.x)} ${r1(aA.y)}" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <path d="M285 320 A45 45 0 0 1 ${r1(aB.x)} ${r1(aB.y)}" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${txt(140, 300, "65°", C.jaune, 22, "start")}
  ${txt(300, 278, "?", C.rose, 28)}
  ${txt(A.x - 12, A.y + 10, "A", C.craie, 24, "end")}
  ${txt(B.x + 4, B.y + 30, "B", C.craie, 24)}
  ${txt(Cc.x + 4, Cc.y - 12, "C", C.craie, 24)}
  ${txt(D.x - 4, D.y - 12, "D", C.craie, 24)}
  ${txt(240, 395, "ABCD est un parallélogramme", C.pale, 22)}
  </svg>`;
};

// L'étiquette : 20 px par cm, O (240 ; 210). AC horizontale, 16 cm = 320 px :
// A (80 ; 210), C (400 ; 210). BD = 12 cm = 240 px à 60° :
// B = O + 120 (cos 60° ; −sin 60°) ≈ (300 ; 106,1), D ≈ (180 ; 313,9).
// Contrôle : AB = DC = (220 ; −103,9).
const etiquette = () => {
  const O = { x: 240, y: 210 };
  const A = { x: 80, y: 210 };
  const Cc = { x: 400, y: 210 };
  const B = { x: 240 + 120 * Math.cos(rad(60)), y: 210 - 120 * Math.sin(rad(60)) };
  const D = { x: 240 - 120 * Math.cos(rad(60)), y: 210 + 120 * Math.sin(rad(60)) };
  // Petits traits de codage : deux sur [OA] et [OC], un sur [OB] et [OD].
  const mi = (p: P, q: P) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const trait = (m: P, dx: number) => `M${r1(m.x + dx - 4)} ${r1(m.y + 9)} L${r1(m.x + dx + 4)} ${r1(m.y - 9)} `;
  const mOA = mi(O, A), mOC = mi(O, Cc), mOB = mi(O, B), mOD = mi(O, D);
  const codes = trait(mOA, -4) + trait(mOA, 4) + trait(mOC, -4) + trait(mOC, 4);
  const c1 = `M${r1(mOB.x - 8)} ${r1(mOB.y - 4.6)} L${r1(mOB.x + 8)} ${r1(mOB.y + 4.6)} M${r1(mOD.x - 8)} ${r1(mOD.y - 4.6)} L${r1(mOD.x + 8)} ${r1(mOD.y + 4.6)}`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une étiquette en forme de parallélogramme ABCD ; ses diagonales se coupent en O ; la diagonale AC mesure 16 cm et OB mesure 6 cm ; la longueur BD est inconnue">
  <text x="420" y="70" font-size="44" text-anchor="middle">🍓</text>
  <path d="${poly([A, B, Cc, D])}" fill="${C.rose}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M${A.x} ${A.y} L${Cc.x} ${Cc.y}" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <path d="M${r1(B.x)} ${r1(B.y)} L${r1(D.x)} ${r1(D.y)}" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="${codes}" stroke="${C.jaune}" stroke-width="2.5" fill="none"/>
  <path d="${c1}" stroke="${C.bleu}" stroke-width="2.5" fill="none"/>
  <circle cx="${O.x}" cy="${O.y}" r="5" fill="${C.craie}"/>
  ${txt(A.x - 12, A.y + 8, "A", C.craie, 24, "end")}
  ${txt(B.x + 6, B.y - 12, "B", C.craie, 24)}
  ${txt(Cc.x + 12, Cc.y + 8, "C", C.craie, 24, "start")}
  ${txt(D.x - 6, D.y + 30, "D", C.craie, 24)}
  ${txt(O.x - 10, O.y + 30, "O", C.craie, 22, "end")}
  ${txt(150, 375, "AC = 16 cm", C.jaune, 22)}
  ${txt(330, 375, "OB = 6 cm", C.bleu, 22)}
  ${txt(240, 405, `BD${NB}?`, C.rose, 24)}
  </svg>`;
};

// La lanterne : 10 px par cm, O (240 ; 215). AC = 30 cm (150 px de chaque côté)
// à 20° : A ≈ (99 ; 266,3), C ≈ (381 ; 163,7). BD = 20 cm (100 px de chaque côté)
// à 110° : B ≈ (205,8 ; 121), D ≈ (274,2 ; 309). O est le milieu des deux baguettes.
const lanterne = () => {
  const O = { x: 240, y: 215 };
  const u = { x: Math.cos(rad(20)), y: -Math.sin(rad(20)) };
  const w = { x: Math.cos(rad(110)), y: -Math.sin(rad(110)) };
  const A = { x: O.x - 150 * u.x, y: O.y - 150 * u.y };
  const Cc = { x: O.x + 150 * u.x, y: O.y + 150 * u.y };
  const B = { x: O.x + 100 * w.x, y: O.y + 100 * w.y };
  const D = { x: O.x - 100 * w.x, y: O.y - 100 * w.y };
  // Codage : deux traits au milieu de [OA] et [OC], un trait au milieu de [OB] et [OD].
  const code = (m: P, d: P, n: number) => {
    const nx = -d.y, ny = d.x;
    let s = "";
    for (let k = 0; k < n; k++) {
      const c = { x: m.x + (k - (n - 1) / 2) * 7 * d.x, y: m.y + (k - (n - 1) / 2) * 7 * d.y };
      s += `M${r1(c.x - 9 * nx)} ${r1(c.y - 9 * ny)} L${r1(c.x + 9 * nx)} ${r1(c.y + 9 * ny)} `;
    }
    return s;
  };
  const m = (p: P) => ({ x: (p.x + O.x) / 2, y: (p.y + O.y) / 2 });
  const codes = code(m(A), u, 2) + code(m(Cc), u, 2) + code(m(B), w, 1) + code(m(D), w, 1);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une lanterne en papier : deux baguettes AC et BD se croisent en O, le milieu de chacune ; le papier tendu entre leurs bouts forme le quadrilatère ABCD">
  <text x="420" y="70" font-size="44" text-anchor="middle">🏮</text>
  <path d="${poly([A, B, Cc, D])}" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${r1(A.x)} ${r1(A.y)} L${r1(Cc.x)} ${r1(Cc.y)} M${r1(B.x)} ${r1(B.y)} L${r1(D.x)} ${r1(D.y)}" stroke="${C.craie}" stroke-width="5" fill="none"/>
  <path d="${codes}" stroke="${C.rose}" stroke-width="2.5" fill="none"/>
  <circle cx="${O.x}" cy="${O.y}" r="6" fill="${C.rose}"/>
  ${txt(A.x - 12, A.y + 8, "A", C.craie, 24, "end")}
  ${txt(B.x, B.y - 14, "B", C.craie, 24)}
  ${txt(Cc.x + 12, Cc.y + 8, "C", C.craie, 24, "start")}
  ${txt(D.x, D.y + 32, "D", C.craie, 24)}
  ${txt(O.x + 14, O.y + 30, "O", C.rose, 22, "start")}
  ${txt(140, 395, "AC = 30 cm", C.pale, 22)}
  ${txt(340, 395, "BD = 20 cm", C.pale, 22)}
  </svg>`;
};

// La vigne : 30 px par m. A (40 ; 320), B (340 ; 320) : base 10 m.
// Hauteur 5 m = 150 px ; côté oblique 6 m = 180 px ; décalage √(36 − 25) = √11 ≈ 3,317 m ≈ 99,5 px.
// D ≈ (139,5 ; 170), C ≈ (439,5 ; 170), pied de la hauteur H ≈ (139,5 ; 320).
const vigne = () => {
  const dx = 30 * Math.sqrt(11);
  const A = { x: 40, y: 320 };
  const B = { x: 340, y: 320 };
  const D = { x: 40 + dx, y: 170 };
  const Cc = { x: 340 + dx, y: 170 };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une vigne en forme de parallélogramme : la base mesure 10 m, le côté oblique 6 m et la hauteur 5 m ; Théo calcule 10 fois 6 égale 60 mètres carrés">
  <text x="440" y="80" font-size="44" text-anchor="middle">🍇</text>
  <path d="${poly([A, B, Cc, D])}" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M${r1(D.x)} 170 L${r1(D.x)} 320" stroke="${C.jaune}" stroke-width="3" stroke-dasharray="9 6" fill="none"/>
  <path d="M${r1(D.x)} 306 L${r1(D.x + 14)} 306 L${r1(D.x + 14)} 320" stroke="${C.jaune}" stroke-width="2.5" fill="none"/>
  ${txt(190, 352, "10 m", C.craie, 22)}
  ${txt(78, 238, "6 m", C.craie, 22, "end")}
  ${txt(D.x + 10, 258, "5 m", C.jaune, 22, "start")}
  ${txt(A.x - 4, A.y + 30, "A", C.craie, 22)}
  ${txt(B.x, B.y + 30, "B", C.craie, 22)}
  ${txt(D.x, D.y - 12, "D", C.craie, 22)}
  ${txt(Cc.x - 6, Cc.y - 12, "C", C.craie, 22)}
  <rect x="40" y="368" width="400" height="44" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 398, `Théo${NB}: 10 × 6 = 60 m²`, C.rose, 22)}
  </svg>`;
};

// Le chocolat : 22 px par cm. A (30 ; 300), B (294 ; 300) : AB = 12 cm = 264 px.
// AD = 8 cm = 176 px, hauteur 5 cm = 110 px, décalage √39 ≈ 6,245 cm ≈ 137,4 px :
// D ≈ (167,4 ; 190), C ≈ (431,4 ; 190). Pied de la hauteur issue de D sur (AB) : (167,4 ; 300).
// Hauteur relative à (AD) issue de B : pied F sur la droite (AD), au-delà de D,
// à AB × cos A = 264 × √39/8 ≈ 206,1 px de A ; BF = 264 × 5/8 = 165 px = 7,5 cm.
const chocolat = () => {
  const dx = 22 * Math.sqrt(39);
  const A = { x: 30, y: 300 };
  const B = { x: 294, y: 300 };
  const D = { x: 30 + dx, y: 190 };
  const Cc = { x: 294 + dx, y: 190 };
  const u = { x: dx / 176, y: -110 / 176 };
  const t = 264 * u.x;
  const F = { x: A.x + t * u.x, y: A.y + t * u.y };
  const E = { x: A.x + (t + 20) * u.x, y: A.y + (t + 20) * u.y };
  // Petit carré d'angle droit en F, côté 12 px.
  const n = { x: (B.x - F.x) / 165, y: (B.y - F.y) / 165 };
  const q1 = { x: F.x - 12 * u.x, y: F.y - 12 * u.y };
  const q2 = { x: q1.x + 12 * n.x, y: q1.y + 12 * n.y };
  const q3 = { x: F.x + 12 * n.x, y: F.y + 12 * n.y };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une plaque de chocolat en forme de parallélogramme ABCD : AB mesure 12 cm, AD mesure 8 cm, la hauteur relative à AB mesure 5 cm ; la hauteur relative au côté AD, tracée depuis B, est inconnue">
  <text x="430" y="80" font-size="44" text-anchor="middle">🍫</text>
  <path d="${poly([A, B, Cc, D])}" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M${r1(D.x)} ${r1(D.y)} L${r1(E.x)} ${r1(E.y)}" stroke="${C.pale}" stroke-width="2.5" stroke-dasharray="6 6" fill="none"/>
  <path d="M${r1(D.x)} 190 L${r1(D.x)} 300" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="9 6" fill="none"/>
  <path d="M${r1(D.x)} 288 L${r1(D.x + 12)} 288 L${r1(D.x + 12)} 300" stroke="${C.bleu}" stroke-width="2" fill="none"/>
  <path d="M${r1(B.x)} ${r1(B.y)} L${r1(F.x)} ${r1(F.y)}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="9 6" fill="none"/>
  <path d="M${r1(q1.x)} ${r1(q1.y)} L${r1(q2.x)} ${r1(q2.y)} L${r1(q3.x)} ${r1(q3.y)}" stroke="${C.rose}" stroke-width="2" fill="none"/>
  ${txt(162, 332, "12 cm", C.craie, 22)}
  ${txt(86, 236, "8 cm", C.craie, 22, "end")}
  ${txt(D.x + 8, 262, "5 cm", C.bleu, 22, "start")}
  ${txt(F.x + 18, F.y - 2, "F", C.rose, 22, "start")}
  ${txt(260, 220, "?", C.rose, 28)}
  ${txt(A.x, A.y + 30, "A", C.craie, 22)}
  ${txt(B.x, B.y + 30, "B", C.craie, 22)}
  ${txt(D.x - 14, D.y - 4, "D", C.craie, 22, "end")}
  ${txt(Cc.x, Cc.y - 12, "C", C.craie, 22)}
  ${txt(240, 385, `hauteur relative à [AD]${NB}?`, C.rose, 22)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "quadrilatere_parallelogramme",
  titre: "Énigmes sur le parallélogramme",
  description: "Les pièces du vitrail, la lampe de bureau, l'étiquette de confiture, la lanterne en papier, le piège de la vigne, le défi du chocolatier : reconnaître un parallélogramme, ses angles, ses diagonales, le démontrer et calculer son aire.",
  problemes: [
    {
      tag: "Énigme 1 · Le vitrail",
      titre: "Laquelle est un parallélogramme ?",
      question: `Un maître verrier découpe trois pièces de verre.<br>Elles ont toutes quatre côtés.<br>Une seule est un parallélogramme.<br><br>Laquelle ? Compte les carreaux pour le démontrer.`,
      reponse: `Un parallélogramme a ses côtés opposés parallèles deux à deux.<br>Pièce 1 : en bas 5 carreaux, en haut 3. Un seul couple de côtés parallèles : c'est un trapèze.<br>Pièce 3 : côté gauche, 2 vers la droite et 3 vers le haut.<br>Côté droit, 2 vers la droite et 4 vers le haut. Pas parallèles.<br>Pièce 2 : en bas et en haut, 5 carreaux à plat.<br>Sur les côtés, 2 à droite et 3 en haut, les deux fois.<br>Donc c'est la <span class="big">pièce 2</span>.`,
      consigne: "Quelle pièce est un parallélogramme ?",
      verification: { type: "qcm", choix: ["la pièce 1 (bleue)", "la pièce 2 (jaune)", "la pièce 3 (rose)"], bonne: 1 },
      dessin: vitrail(),
    },
    {
      tag: "Énigme 2 · La lampe de bureau",
      titre: "L'angle du bras",
      question: `Le bras d'une lampe de bureau forme un parallélogramme ABCD.<br>L'angle en A mesure 65°.<br><br>Combien mesure l'angle en B ?`,
      reponse: `Dans un parallélogramme, deux angles qui se suivent font 180° ensemble.<br>Les angles en A et en B se suivent.<br>Donc l'angle en B vaut 180 − 65 = 115.<br>Il mesure <span class="big">115°</span>.<br>Contrôle : les angles opposés sont égaux. C = 65°, D = 115°.<br>65 + 115 + 65 + 115 = 360.`,
      consigne: "Combien mesure l'angle en B, en degrés ?",
      verification: { type: "courte", attendus: ["115"], unite: "°" },
      dessin: lampe(),
    },
    {
      tag: "Énigme 3 · L'étiquette de confiture",
      titre: "La seconde diagonale",
      question: `Une étiquette de confiture est un parallélogramme ABCD.<br>Ses diagonales se coupent en O.<br>La diagonale [AC] mesure 16 cm.<br>Le segment [OB] mesure 6 cm.<br><br>Combien mesure la diagonale [BD] ?`,
      reponse: `Propriété : les diagonales d'un parallélogramme se coupent en leur milieu.<br>Donc O est le milieu de [BD].<br>OD = OB = 6 cm.<br>BD = 6 + 6 = 12.<br>La diagonale mesure <span class="big">12 cm</span>.<br>Attention : les diagonales n'ont pas la même longueur. 16 cm ne sert pas ici.`,
      consigne: "Combien mesure la diagonale [BD] ?",
      verification: { type: "courte", attendus: ["12"], unite: "cm" },
      dessin: etiquette(),
    },
    {
      tag: "Énigme 4 · La lanterne en papier",
      titre: "Deux baguettes croisées",
      question: `Mia fabrique une lanterne.<br>Elle croise deux baguettes : [AC] de 30 cm et [BD] de 20 cm.<br>Elle les attache en O, le milieu de chacune.<br>Le papier relie les bouts A, B, C et D.<br><br>Comment démontrer que ABCD est un parallélogramme ?`,
      reponse: `Les baguettes sont les diagonales de ABCD.<br>On sait que O est le milieu de [AC] et le milieu de [BD].<br>Propriété : si les diagonales d'un quadrilatère se coupent en leur milieu, alors c'est un parallélogramme.<br>Donc <span class="big">ABCD est un parallélogramme</span>.<br>Se couper ne suffit pas : c'est le milieu qui compte.`,
      consigne: "Quelle phrase démontre que ABCD est un parallélogramme ?",
      verification: { type: "qcm", choix: ["Ses diagonales se coupent en leur milieu.", "Ses diagonales se coupent en O.", "Il a l'air penché sur le dessin."], bonne: 0 },
      dessin: lanterne(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La vigne de Théo",
      sorte: "piege",
      question: `Une vigne a la forme d'un parallélogramme.<br>Sa base mesure 10 m et son côté oblique 6 m.<br>Sa hauteur mesure 5 m.<br>Théo calcule : 10 × 6 = 60 m².<br><br><b>Théo a-t-il raison ?</b>`,
      reponse: `Théo s'est trompé ! Il a pris le côté oblique pour la hauteur.<br>L'aire d'un parallélogramme vaut base × hauteur.<br>La hauteur est perpendiculaire à la base : c'est 5 m.<br>Aire : 10 × 5 = 50.<br>La vigne mesure <span class="big">50 m²</span>.<br>Le côté de 6 m sert pour le périmètre, pas pour l'aire.`,
      consigne: "Quelle est l'aire de la vigne ?",
      verification: { type: "qcm", choix: ["60 m², Théo a raison", "30 m², c'est 10 × 6 ÷ 2", "50 m², c'est 10 × 5"], bonne: 2 },
      dessin: vigne(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La plaque du chocolatier",
      sorte: "defi",
      question: `Un chocolatier coule une plaque en parallélogramme ABCD.<br>AB = 12 cm et AD = 8 cm.<br>La hauteur relative à [AB] mesure 5 cm.<br><br>Combien mesure la hauteur relative à [AD] ?`,
      reponse: `On calcule l'aire avec la base [AB] : 12 × 5 = 60 cm².<br>L'aire ne change pas si on prend [AD] comme base.<br>Donc 8 × hauteur = 60.<br>Hauteur : 60 ÷ 8 = 7,5.<br>Elle mesure <span class="big">7,5 cm</span>.<br>Contrôle : 8 × 7,5 = 60. Son pied F tombe en dehors de la plaque.`,
      consigne: "Combien mesure la hauteur relative à [AD] ?",
      verification: { type: "courte", attendus: ["7,5", "7.5"], unite: "cm" },
      dessin: chocolat(),
    },
  ],
};

export default problemes;
