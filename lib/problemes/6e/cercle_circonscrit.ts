// Énigmes à projeter — 6e, notion cercle_circonscrit (le cercle qui passe par
// les trois sommets, OA = OB = OC = le rayon, deux médiatrices suffisent pour
// trouver le centre, la preuve « OA = OB et OB = OC donc OA = OC », le piège
// « le centre est le milieu d'un côté », le défi des trois points alignés).
// 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-cercle-circonscrit.tsx) : les trois
// médiatrices se croisent en O ; OA = OB = OC ; le cercle de centre O passant par
// A passe par B et C ; trois points alignés n'ont pas de cercle.
// Phrases courtes (les 6e lisent difficilement). Figures exactes : centres et
// rayons CALCULÉS par les fonctions ci-dessous (croisement des médiatrices).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;
const dist = (a: P, b: P) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const milieu = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Le centre du cercle circonscrit (croisement des médiatrices), calculé. */
const centre = ([ax, ay]: P, [bx, by]: P, [cx, cy]: P): P => {
  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  const a2 = ax * ax + ay * ay, b2 = bx * bx + by * by, c2 = cx * cx + cy * cy;
  return [(a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d, (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d];
};

const point = ([x, y]: P, couleur: string = C.jaune) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="7" fill="${couleur}"/>`;
const lettre = (x: number, y: number, l: string, couleur: string = C.craie, taille = 28) =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${couleur}" font-size="${taille}" text-anchor="middle">${l}</text>`;
const seg = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.craie, largeur = 4, tirets = "") =>
  `<path d="M${r1(x1)} ${r1(y1)} L${r1(x2)} ${r1(y2)}" stroke="${couleur}" stroke-width="${largeur}" stroke-linecap="round"${tirets ? ` stroke-dasharray="${tirets}"` : ""} fill="none"/>`;
const triangle = (A: P, B: P, Cc: P, couleur: string = C.craie, largeur = 4) =>
  `<path d="M${r1(A[0])} ${r1(A[1])} L${r1(B[0])} ${r1(B[1])} L${r1(Cc[0])} ${r1(Cc[1])} Z" fill="none" stroke="${couleur}" stroke-width="${largeur}" stroke-linejoin="round"/>`;
const cercle = ([x, y]: P, r: number, couleur: string, largeur = 4, tirets = "") =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="none" stroke="${couleur}" stroke-width="${largeur}"${tirets ? ` stroke-dasharray="${tirets}"` : ""}/>`;
/** Une lettre posée à d px du point Q, dans la direction opposée au point O. */
const loin = (Q: P, O: P, d: number): P => {
  const l = dist(O, Q);
  return [Q[0] + ((Q[0] - O[0]) / l) * d, Q[1] + ((Q[1] - O[1]) / l) * d + 9];
};

/** Le petit trait « même longueur » au milieu du segment [PQ], perpendiculaire. */
const trait = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.jaune) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const l = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / l) * 11, ny = ((x2 - x1) / l) * 11;
  return `<path d="M${r1(mx - nx)} ${r1(my - ny)} L${r1(mx + nx)} ${r1(my + ny)}" stroke="${couleur}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
};

/** Le petit carré « angle droit » au sommet S, entre les côtés vers A et vers B. */
const angleDroit = ([sx, sy]: P, [ax, ay]: P, [bx, by]: P, t = 16) => {
  const la = Math.hypot(ax - sx, ay - sy), lb = Math.hypot(bx - sx, by - sy);
  const ux = ((ax - sx) / la) * t, uy = ((ay - sy) / la) * t;
  const vx = ((bx - sx) / lb) * t, vy = ((by - sy) / lb) * t;
  return `<path d="M${r1(sx + ux)} ${r1(sy + uy)} L${r1(sx + ux + vx)} ${r1(sy + uy + vy)} L${r1(sx + vx)} ${r1(sy + vy)}" stroke="${C.bleu}" stroke-width="3" fill="none"/>`;
};

/** Un point d'un cercle de centre O et de rayon r, à l'angle deg (compté vers le haut). */
const sur = (O: P, r: number, deg: number): P => [O[0] + r * Math.cos((deg * Math.PI) / 180), O[1] - r * Math.sin((deg * Math.PI) / 180)];

// 1. L'observatoire : trois étoiles sur un cercle de centre O(240 ; 215), rayon 120.
// A à 200°, B à −15°, C à 100° (triangle aux angles 57,5° ; 50° ; 72,5°).
// Cercle 1 = cercle INSCRIT (centre et rayon calculés : touche les côtés).
// Cercle 2 = cercle de même centre O, rayon 165 : autour, mais loin des sommets.
// Cercle 3 = cercle CIRCONSCRIT (centre recalculé par les médiatrices = O).
const observatoire = () => {
  const O0: P = [240, 215];
  const A = sur(O0, 120, 200), B = sur(O0, 120, -15), Cc = sur(O0, 120, 100);
  const O = centre(A, B, Cc), R = dist(O, A);
  const a = dist(B, Cc), b = dist(Cc, A), c = dist(A, B), p = a + b + c;
  const I: P = [(a * A[0] + b * B[0] + c * Cc[0]) / p, (a * A[1] + b * B[1] + c * Cc[1]) / p];
  const aire = Math.abs((B[0] - A[0]) * (Cc[1] - A[1]) - (Cc[0] - A[0]) * (B[1] - A[1])) / 2;
  const ri = aire / (p / 2);
  const l2 = sur(O, 165, 40), l3 = sur(O, 142, 140);
  const lA = loin(A, O, 26), lB = loin(B, O, 26), lC = loin(Cc, O, 26);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois étoiles A, B et C forment un triangle ; trois cercles numérotés 1, 2 et 3 sont tracés">
  ${triangle(A, B, Cc, C.pale, 3)}
  ${cercle(I, ri, C.bleu, 4)}
  ${cercle(O, 165, C.pale, 4, "10 8")}
  ${cercle(O, R, C.rose, 4)}
  ${point(A)}${point(B)}${point(Cc)}
  ${lettre(lA[0], lA[1], "A")}${lettre(lB[0], lB[1], "B")}${lettre(lC[0] + 14, lC[1], "C")}
  ${lettre(I[0], I[1] + 10, "1", C.bleu, 30)}
  ${lettre(l2[0] + 16, l2[1] - 4, "2", C.pale, 30)}
  ${lettre(l3[0], l3[1] + 10, "3", C.rose, 30)}
  <text x="240" y="400" fill="${C.craie}" font-size="22" text-anchor="middle">Lequel passe par les 3 étoiles${NB}?</text>
  </svg>`;
};

// 2. Le manège, vu de dessus : 20 px pour 1 m. Cercle de centre O(240 ; 200),
// rayon 140 px = 7 m, diamètre 280 px = 14 m. Chevaux A à 150°, B à 20°, C à 260°.
// Contrôle : le centre recalculé des trois chevaux est bien O.
const manege = () => {
  const O0: P = [240, 200];
  const A = sur(O0, 140, 150), B = sur(O0, 140, 20), Cc = sur(O0, 140, 260);
  const O = centre(A, B, Cc), R = dist(O, A);
  const g: P = [O[0] - R, O[1]], d: P = [O[0] + R, O[1]];
  const lA = loin(A, O, 30), lB = loin(B, O, 30), lC = loin(Cc, O, 30);
  const mOC = milieu(O, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un manège rond de centre O, vu de dessus ; trois chevaux A, B et C sur le bord ; le diamètre mesure 14 mètres">
  ${cercle(O, R, C.craie, 5)}
  ${triangle(A, B, Cc, C.pale, 3)}
  ${seg(g, d, C.bleu, 3, "10 8")}
  ${seg(O, Cc, C.rose, 4)}
  ${point(A)}${point(B)}${point(Cc)}${point(O, C.rose)}
  ${lettre(A[0] - 26, A[1] + 12, "A")}${lettre(B[0] + 26, B[1] + 12, "B")}${lettre(lC[0], lC[1] + 4, "C")}
  <text x="${r1(A[0])}" y="${r1(A[1] - 16)}" font-size="30" text-anchor="middle">🎠</text>
  <text x="${r1(B[0])}" y="${r1(B[1] - 16)}" font-size="30" text-anchor="middle">🎠</text>
  <text x="${r1(Cc[0] + 16)}" y="${r1(Cc[1] + 8)}" font-size="30" text-anchor="start">🎠</text>
  ${lettre(O[0] - 18, O[1] - 12, "O", C.rose)}
  <text x="320" y="190" fill="${C.bleu}" font-size="24" text-anchor="middle">14 m</text>
  <text x="${r1(mOC[0] + 22)}" y="${r1(mOC[1] + 10)}" fill="${C.rose}" font-size="30" text-anchor="start">?</text>
  <text x="20" y="34" fill="${C.pale}" font-size="20" text-anchor="start">vu de dessus</text>
  </svg>`;
};

// 3. L'assiette cassée : un morceau du bord, arc du cercle de centre (240 ; 280),
// rayon 170, de 150° à 30° (par le haut). A à 145°, B à 95°, C à 40°, sur l'arc.
// Le centre n'est PAS dessiné, aucune médiatrice non plus.
const assiette = () => {
  const Oa: P = [240, 280], r = 170;
  const d1 = sur(Oa, r, 152), d2 = sur(Oa, r, 28);
  const A = sur(Oa, r, 145), B = sur(Oa, r, 95), Cc = sur(Oa, r, 40);
  const lA = loin(A, Oa, 28), lB = loin(B, Oa, 26), lC = loin(Cc, Oa, 28);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un morceau du bord d'une assiette ronde, avec trois points A, B et C marqués sur le bord ; le centre n'est pas marqué">
  <path d="M${r1(d1[0])} ${r1(d1[1])} A${r} ${r} 0 0 1 ${r1(d2[0])} ${r1(d2[1])}" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" fill="none"/>
  ${seg(A, B, C.pale, 3, "8 7")}${seg(B, Cc, C.pale, 3, "8 7")}
  ${point(A, C.rose)}${point(B, C.rose)}${point(Cc, C.rose)}
  ${lettre(lA[0], lA[1], "A")}${lettre(lB[0], lB[1], "B")}${lettre(lC[0], lC[1], "C")}
  <text x="240" y="300" fill="${C.pale}" font-size="22" text-anchor="middle">le reste de l'assiette est perdu</text>
  <text x="240" y="380" fill="${C.rose}" font-size="24" text-anchor="middle">Où était le centre${NB}?</text>
  </svg>`;
};

// 4. L'enquête : A(90 ; 320), B(400 ; 310), C(230 ; 90).
// Centre calculé O ≈ (243,1 ; 255,6) : OA = OB = OC ≈ 166 px.
// Médiatrices tracées : celle de [AB] (un trait de codage) et celle de [BC]
// (deux traits), chacune par son milieu et par O. Celle de [AC] : NON tracée.
const enquete = () => {
  const A: P = [90, 320], B: P = [400, 310], Cc: P = [230, 90];
  const O = centre(A, B, Cc);
  const mediatrice = (X: P, Y: P, nTraits: 1 | 2) => {
    const M = milieu(X, Y);
    const l = dist(M, O);
    const u: P = [(O[0] - M[0]) / l, (O[1] - M[1]) / l];
    const debut: P = [M[0] - 45 * u[0], M[1] - 45 * u[1]], fin: P = [O[0] + 70 * u[0], O[1] + 70 * u[1]];
    const lx = dist(X, Y);
    const v: P = [(Y[0] - X[0]) / lx, (Y[1] - X[1]) / lx];
    const dec = (Q: P, k: number): P => [Q[0] + k * v[0], Q[1] + k * v[1]];
    const traits = (Q1: P, Q2: P) =>
      nTraits === 1 ? trait(Q1, Q2) : trait(dec(Q1, -5), dec(Q2, -5)) + trait(dec(Q1, 5), dec(Q2, 5));
    return `${seg(debut, fin, C.bleu, 3, "9 7")}${angleDroit(M, Y, O)}${traits(X, M)}${traits(M, Y)}`;
  };
  const mAC = milieu(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle ABC ; les médiatrices de AB et de BC sont tracées et se croisent en O ; la médiatrice de AC n'est pas tracée">
  ${seg(A, B, C.craie, 4)}${seg(B, Cc, C.craie, 4)}
  ${seg(A, Cc, C.rose, 4, "10 8")}
  ${mediatrice(A, B, 1)}${mediatrice(B, Cc, 2)}
  ${point(A, C.craie)}${point(B, C.craie)}${point(Cc, C.craie)}${point(O, C.rose)}
  ${lettre(70, 350, "A")}${lettre(424, 336, "B")}${lettre(230, 66, "C")}
  ${lettre(O[0] - 26, O[1] - 8, "O", C.rose)}
  <text x="${r1(mAC[0] - 22)}" y="${r1(mAC[1])}" fill="${C.rose}" font-size="24" text-anchor="end">et [AC]${NB}?</text>
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">en pointillés bleus : deux médiatrices</text>
  </svg>`;
};

// 5. Le piège de Noé : 24 px pour 1 cm. B(120 ; 270), C(360 ; 270) : BC = 240 px
// = 10 cm. M(240 ; 270) milieu de [BC]. A(192 ; 134,2) :
// MA = √(48² + 135,8²) = √(2 304 + 18 432) = √20 736 = 144 px = 6 cm ;
// AC = √(168² + 135,8²) = √46 656 = 216 px = 9 cm ; AB ≈ 6,4 cm.
// Cercle de Noé : centre M, rayon MB = 120 px = 5 cm. A est DEHORS (6 > 5).
const piege = () => {
  const B: P = [120, 270], Cc: P = [360, 270], M: P = [240, 270];
  const A: P = [192, 270 - Math.sqrt(144 * 144 - 48 * 48)];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle ABC ; M est le milieu de BC ; Noé trace le cercle de centre M qui passe par B et par C">
  ${cercle(M, 120, C.bleu, 4)}
  ${triangle(A, B, Cc, C.craie, 4)}
  ${seg(M, A, C.rose, 3, "8 7")}
  ${trait(B, M, C.jaune)}${trait(M, Cc, C.jaune)}
  ${point(A, C.craie)}${point(B, C.craie)}${point(Cc, C.craie)}${point(M, C.rose)}
  ${lettre(A[0] - 6, A[1] - 18, "A")}${lettre(B[0] - 24, B[1] + 10, "B")}${lettre(Cc[0] + 24, Cc[1] + 10, "C")}
  ${lettre(M[0] + 4, M[1] + 36, "M", C.rose)}
  <text x="20" y="40" fill="${C.pale}" font-size="20" text-anchor="start">BC = 10 cm</text>
  <text x="20" y="66" fill="${C.pale}" font-size="20" text-anchor="start">MA = 6 cm</text>
  <text x="460" y="40" fill="${C.bleu}" font-size="20" text-anchor="end">le cercle de Noé</text>
  </svg>`;
};

// 6. La pétanque : trois boules alignées sur une droite horizontale, y = 230.
// A(100 ; 230), B(230 ; 230), C(390 ; 230). Le cochonnet n'est pas posé.
const petanque = () => {
  const boule = (x: number, l: string) =>
    `<circle cx="${x}" cy="230" r="22" fill="${C.pale}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>` +
    `<path d="M${x - 15} 222 Q${x} 214 ${x + 15} 222 M${x - 15} 238 Q${x} 246 ${x + 15} 238" stroke="${C.craie}" stroke-width="2" fill="none"/>` +
    lettre(x, 290, l);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois boules de pétanque A, B et C alignées sur une même droite ; où poser le cochonnet ?">
  <rect x="20" y="70" width="440" height="270" rx="14" fill="${C.jaune}" fill-opacity=".1" stroke="${C.pale}" stroke-width="3"/>
  ${seg([40, 230], [440, 230], C.pale, 2, "6 8")}
  ${boule(100, "A")}${boule(230, "B")}${boule(390, "C")}
  <circle cx="300" cy="130" r="10" fill="${C.jaune}"/>
  <text x="320" y="139" fill="${C.jaune}" font-size="24" text-anchor="start">cochonnet${NB}?</text>
  <text x="40" y="320" fill="${C.pale}" font-size="20" text-anchor="start">A, B et C sont alignées</text>
  <text x="240" y="390" fill="${C.rose}" font-size="24" text-anchor="middle">À égale distance des trois${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "cercle_circonscrit",
  titre: "Énigmes sur le cercle circonscrit",
  description: "Les étoiles, le manège, l'assiette cassée, l'enquête des médiatrices, le piège de Noé, les boules de pétanque.",
  problemes: [
    {
      tag: "Énigme 1 · À l'observatoire",
      titre: "Le cercle des trois étoiles",
      question: `Trois étoiles A, B et C forment un triangle.<br>Lina veut tracer son <b>cercle circonscrit</b>.<br>Trois cercles sont dessinés.<br><br><b>Lequel</b> est le cercle circonscrit ?`,
      reponse: `Le cercle circonscrit passe par les <b>trois sommets</b> du triangle.<br>Le cercle 1 touche les côtés : il est dedans.<br>Le cercle 2 est autour, mais il ne touche pas les étoiles.<br>Seul le cercle 3 passe par A, B et C : <span class="big">c'est le cercle 3</span>.`,
      consigne: "Quel cercle est le cercle circonscrit au triangle des trois étoiles ?",
      verification: { type: "qcm", choix: ["Le cercle 1", "Le cercle 2", "Le cercle 3"], bonne: 2 },
      dessin: observatoire(),
    },
    {
      tag: "Énigme 2 · Au manège",
      titre: "Les chevaux de bois",
      question: `Trois chevaux A, B et C sont au bord du manège.<br>Le manège est le cercle circonscrit au triangle ABC.<br>Son centre O est le croisement des médiatrices.<br>Le <b>diamètre</b> du manège mesure <b>14 m</b>.<br><br>Combien mesure <b>OC</b> ?`,
      reponse: `O est le centre du cercle circonscrit : OA = OB = OC.<br>Cette longueur est le <b>rayon</b> du manège.<br>Le rayon, c'est la moitié du diamètre : 14 ÷ 2 = 7.<br><span class="big">OC = 7 m</span>, comme OA et OB.`,
      consigne: "Le diamètre du manège mesure 14 m. Combien mesure OC ?",
      verification: { type: "courte", attendus: ["7"], unite: "m" },
      dessin: manege(),
    },
    {
      tag: "Énigme 3 · En archéologie",
      titre: "L'assiette cassée",
      question: `Ilyes trouve un morceau d'assiette ancienne.<br>Il marque trois points A, B et C sur le bord.<br>Il veut retrouver le <b>centre</b> de l'assiette.<br><br>Combien de <b>médiatrices</b> doit-il tracer, au minimum ?`,
      reponse: `Il trace la médiatrice de [AB] et celle de [BC].<br>Elles se croisent en O, le centre de l'assiette.<br>La troisième passe aussi par O : elle sert seulement à vérifier.<br>Il suffit de <span class="big">2 médiatrices</span>.<br>Puis il pique le compas en O et l'ouvre jusqu'à A : il redessine l'assiette entière.`,
      consigne: "Combien de médiatrices faut-il tracer, au minimum, pour trouver le centre ?",
      verification: { type: "courte", attendus: ["2", "deux"] },
      dessin: assiette(),
    },
    {
      tag: "Énigme 4 · Chez le détective",
      titre: "La preuve de l'inspectrice",
      question: `O est sur la médiatrice de [AB].<br>O est aussi sur la médiatrice de [BC].<br>L'inspectrice Maëlle affirme : « O est aussi sur la médiatrice de [AC]. »<br><br><b>Quelle preuve</b> est la bonne ?`,
      reponse: `O est sur la médiatrice de [AB], donc OA = OB.<br>O est sur la médiatrice de [BC], donc OB = OC.<br>Alors OA = OC : O est à la même distance de A et de C.<br>Donc O est sur la médiatrice de [AC].<br><span class="big">La bonne preuve : OA = OB et OB = OC, donc OA = OC.</span><br>Les trois médiatrices se croisent en un seul point.`,
      consigne: "Quelle phrase prouve que O est sur la médiatrice de [AC] ?",
      verification: {
        type: "qcm",
        choix: ["O est le milieu de [AC]", "OA = OB et OB = OC, donc OA = OC", "Les deux médiatrices sont perpendiculaires"],
        bonne: 1,
      },
      dessin: enquete(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cercle de Noé",
      sorte: "piege",
      question: `[BC] est le plus grand côté du triangle ABC : BC = 10 cm.<br>Noé pique son compas en M, le milieu de [BC].<br>Son cercle passe par B et par C.<br>Il dit : « C'est le cercle circonscrit ! »<br>Il mesure aussi MA = 6 cm.<br><br><b>A-t-il raison ?</b>`,
      reponse: `M est le milieu de [BC] : MB = MC = 10 ÷ 2 = 5 cm.<br>Mais MA = 6 cm, et 6 n'est pas égal à 5.<br>Le cercle de Noé ne passe pas par A.<br><span class="big">Non : ce n'est pas le cercle circonscrit.</span><br>Le vrai centre est au croisement des médiatrices, pas au milieu d'un côté.`,
      consigne: "Le cercle de centre M passe par B et C, et MA = 6 cm. Est-ce le cercle circonscrit ?",
      verification: {
        type: "qcm",
        choix: ["Non : il ne passe pas par A", "Oui : il passe par B et par C", "Oui : M est le milieu de [BC]"],
        bonne: 0,
      },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cochonnet introuvable",
      sorte: "defi",
      question: `Trois boules de pétanque A, B et C sont <b>alignées</b>.<br>Léo veut poser le cochonnet à la <b>même distance</b> des trois boules.<br><br>Combien de <b>places</b> possibles pour le cochonnet ?`,
      reponse: `À la même distance de A et de B : sur la médiatrice de [AB].<br>À la même distance de B et de C : sur la médiatrice de [BC].<br>Ces deux droites sont perpendiculaires à la même droite (AC).<br>Elles sont donc parallèles : elles ne se croisent jamais.<br><span class="big">Aucune place possible !</span><br>Trois points alignés n'ont pas de cercle circonscrit.`,
      consigne: "Les trois boules sont alignées. Combien de places possibles pour le cochonnet ? (écris un nombre)",
      verification: { type: "courte", attendus: ["0", "aucune", "zéro", "zero"] },
      dessin: petanque(),
    },
  ],
};

export default problemes;
