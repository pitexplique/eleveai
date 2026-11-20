// Énigmes à projeter — 6e, notion triangle_propriete (la somme des angles
// vérifiée, l'angle manquant, le triangle impossible, les angles du triangle
// isocèle, le piège du triangle agrandi, le défi des baguettes).
// 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-triangle-propriete.tsx) : les
// 3 angles font 180° pour TOUS les triangles ; angle manquant = 180 moins les
// deux autres ; isocèle : deux angles égaux ; triangle possible : les deux
// petits côtés ensemble DÉPASSENT le grand (égal = triangle tout plat).
// Phrases courtes (les 6e lisent difficilement). Figures exactes : le sommet
// est calculé par la loi des sinus à partir des vrais angles (fonction `tri`),
// les longueurs des baguettes et planches sont proportionnelles.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;
const rad = (d: number) => (d * Math.PI) / 180;

/** Un triangle de base horizontale [AB] de longueur L (B à droite de A),
 *  d'angle a en A et b en B. Le sommet C est au-dessus. */
const tri = (A: P, L: number, a: number, b: number): [P, P, P] => {
  const B: P = [A[0] + L, A[1]];
  const ac = (L * Math.sin(rad(b))) / Math.sin(rad(a + b));
  const Cc: P = [r1(A[0] + ac * Math.cos(rad(a))), r1(A[1] - ac * Math.sin(rad(a)))];
  return [A, B, Cc];
};

const poly = (pts: P[], couleur: string, opacite = ".18") =>
  `<path d="M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z" fill="${couleur}" fill-opacity="${opacite}" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>`;

/** L'arc de l'angle au sommet S (entre les côtés vers A et vers B),
 *  et son étiquette posée sur la bissectrice, à la distance d. */
const angle = ([sx, sy]: P, [ax, ay]: P, [bx, by]: P, etiquette = "", couleur: string = C.jaune, r = 34, d = 66) => {
  const a1 = Math.atan2(ay - sy, ax - sx);
  const a2 = Math.atan2(by - sy, bx - sx);
  let e = a2 - a1;
  while (e > Math.PI) e -= 2 * Math.PI;
  while (e <= -Math.PI) e += 2 * Math.PI;
  const sweep = e > 0 ? 1 : 0;
  const x1 = r1(sx + r * Math.cos(a1)), y1 = r1(sy + r * Math.sin(a1));
  const x2 = r1(sx + r * Math.cos(a2)), y2 = r1(sy + r * Math.sin(a2));
  const m = a1 + e / 2;
  const tx = r1(sx + d * Math.cos(m)), ty = r1(sy + d * Math.sin(m) + 8);
  const arc = `<path d="M${x1} ${y1} A${r} ${r} 0 0 ${sweep} ${x2} ${y2}" stroke="${couleur}" stroke-width="4" fill="none"/>`;
  const txt = etiquette
    ? `<text x="${tx}" y="${ty}" fill="${etiquette === "?" ? C.rose : C.craie}" font-size="24" text-anchor="middle">${etiquette}</text>`
    : "";
  return arc + txt;
};

/** Le petit trait « même longueur » au milieu du segment [PQ]. */
const trait = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.rose) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const l = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / l) * 12;
  const ny = ((x2 - x1) / l) * 12;
  return `<path d="M${r1(mx - nx)} ${r1(my - ny)} L${r1(mx + nx)} ${r1(my + ny)}" stroke="${couleur}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
};

/** Une baguette (ou planche) horizontale de longueur l px, étiquette à gauche. */
const baguette = (x: number, y: number, l: number, etiquette: string, couleur: string = C.jaune) =>
  `<rect x="${x}" y="${y - 9}" width="${l}" height="18" rx="6" fill="${couleur}" fill-opacity=".55" stroke="${C.craie}" stroke-width="3"/>` +
  `<text x="${x - 14}" y="${y + 8}" fill="${C.craie}" font-size="24" text-anchor="end">${etiquette}</text>`;

// 1. Le cerf-volant : angles 45° en A, 65° en B, donc 70° en C.
// A(90 ; 330), base 300 px. AC = 300 × sin 65° ÷ sin 70° ≈ 289,3 px.
// C ≈ (294,6 ; 125,4).
const cerfVolant = () => {
  const [A, B, Cc] = tri([90, 330], 300, 45, 65);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cerf-volant en triangle : ses angles mesurent 45 degrés, 65 degrés et 70 degrés">
  ${poly([A, B, Cc], C.bleu, ".2")}
  ${angle(A, B, Cc, `45°`)}${angle(B, Cc, A, `65°`)}${angle(Cc, A, B, `70°`, C.jaune, 34, 74)}
  <path d="M${B[0]} ${B[1]} Q 430 370 455 345" stroke="${C.pale}" stroke-width="3" fill="none"/>
  <text x="420" y="80" font-size="40" text-anchor="middle">🪁</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Ces mesures vont-elles ensemble${NB}?</text>
  </svg>`;
};

// 2. Le phare : angle 50° au bateau (gauche), 95° au rocher (droite).
// Base 150 px : bateau (110 ; 330), rocher (260 ; 330).
// Côté bateau-phare = 150 × sin 95° ÷ sin 145° ≈ 260,5 px → phare ≈ (277,5 ; 130,4).
// L'angle au phare (35°) est marqué « ? ».
const phare = () => {
  const [Ba, R, Ph] = tri([110, 330], 150, 50, 95);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle phare, bateau, rocher : 50 degrés au bateau, 95 degrés au rocher, l'angle au phare est à trouver">
  ${poly([Ba, R, Ph], C.jaune, ".15")}
  ${angle(Ba, R, Ph, `50°`, C.bleu, 34, 62)}${angle(R, Ph, Ba, `95°`, C.bleu, 28, 52)}${angle(Ph, Ba, R, "?", C.rose, 40, 82)}
  ${[Ba, R, Ph].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${C.craie}"/>`).join("")}
  <text x="${Ph[0] + 18}" y="${Ph[1] - 14}" fill="${C.craie}" font-size="24" text-anchor="start">phare</text>
  <text x="${Ba[0]}" y="${Ba[1] + 36}" fill="${C.craie}" font-size="24" text-anchor="middle">⛵ bateau</text>
  <text x="${R[0] + 10}" y="${R[1] + 36}" fill="${C.craie}" font-size="24" text-anchor="start">rocher</text>
  <text x="240" y="402" fill="${C.rose}" font-size="26" text-anchor="middle">Quel angle au phare${NB}?</text>
  </svg>`;
};

// 3. La menuiserie : planches de 3 dm, 4 dm et 8 dm, 40 px pour 1 dm
// → 120 px, 160 px, 320 px.
const menuiserie = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois planches de 3 décimètres, 4 décimètres et 8 décimètres">
  <text x="420" y="60" font-size="40" text-anchor="middle">🪚</text>
  ${baguette(120, 120, 120, "3 dm")}
  ${baguette(120, 190, 160, "4 dm")}
  ${baguette(120, 260, 320, "8 dm")}
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Un triangle avec ces 3 planches${NB}?</text>
  </svg>`;

// 4. La boulangerie : un chausson en triangle isocèle, sommet 50°.
// Base 220 px, angles de base 65° : hauteur 110 × tan 65° ≈ 235,9 px.
// A(130 ; 330), B(350 ; 330), sommet ≈ (240 ; 94,1). Angle au sommet 2 × 25° = 50°.
const chausson = () => {
  const [A, B, S] = tri([130, 330], 220, 65, 65);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un chausson en triangle isocèle : deux côtés codés égaux, l'angle du haut mesure 50 degrés, les deux angles du bas sont à trouver">
  ${poly([A, B, S], C.jaune, ".35")}
  ${trait(A, S)}${trait(B, S)}
  ${angle(S, A, B, `50°`, C.bleu, 40, 86)}${angle(A, B, S, "?", C.rose, 34, 62)}${angle(B, S, A, "?", C.rose, 34, 62)}
  <text x="400" y="80" font-size="40" text-anchor="middle">🥐</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien mesure un angle du bas${NB}?</text>
  </svg>`;
};

// 5. Le planétarium : le même triangle (70°, 60°, 50°) en petit (base 80 px)
// et projeté en grand (base 240 px, 3 fois plus grand).
// Petit : A(40 ; 330), B(120 ; 330), C ≈ (70,9 ; 245). Grand : A(190 ; 330),
// B(430 ; 330), C ≈ (282,8 ; 75,1).
const planetarium = () => {
  const [a, b, c] = tri([40, 330], 80, 70, 60);
  const [A, B, Cc] = tri([190, 330], 240, 70, 60);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un petit triangle d'angles 70, 60 et 50 degrés, et le même triangle projeté en grand au plafond">
  ${poly([a, b, c], C.bleu, ".2")}
  ${poly([A, B, Cc], C.bleu, ".2")}
  ${angle(A, B, Cc)}${angle(B, Cc, A)}${angle(Cc, A, B)}
  <text x="80" y="222" fill="${C.craie}" font-size="20" text-anchor="middle">70°, 60°, 50°</text>
  <text x="80" y="362" fill="${C.pale}" font-size="20" text-anchor="middle">petit</text>
  <text x="310" y="362" fill="${C.pale}" font-size="20" text-anchor="middle">au plafond</text>
  <text x="240" y="402" fill="${C.rose}" font-size="22" text-anchor="middle">Léo${NB}: «${NB}Plus grand, donc plus de 180°${NB}!${NB}»</text>
  </svg>`;
};

// 6. Les baguettes : 2 cm, 3 cm, 4 cm, 5 cm, 50 px pour 1 cm
// → 100, 150, 200, 250 px.
const baguettes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre baguettes de 2, 3, 4 et 5 centimètres">
  ${baguette(130, 90, 100, "2 cm", C.bleu)}
  ${baguette(130, 160, 150, "3 cm", C.bleu)}
  ${baguette(130, 230, 200, "4 cm", C.bleu)}
  ${baguette(130, 300, 250, "5 cm", C.bleu)}
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">3 baguettes${NB}: combien de triangles${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "triangle_propriete",
  titre: "Énigmes sur les angles du triangle",
  description: "Les angles du cerf-volant, l'angle du phare, les planches du menuisier, le chausson isocèle, le piège du triangle géant, le défi des baguettes : 6 énigmes de 6e à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Au cerf-volant",
      titre: "Les angles du cerf-volant",
      question: `Zoé a un cerf-volant en forme de triangle.<br>Elle mesure ses trois angles.<br>Elle trouve <b>45°</b>, <b>65°</b> et <b>70°</b>.<br><br>Ces trois mesures vont-elles ensemble ?`,
      reponse: `Dans un triangle, les trois angles font 180° en tout.<br>On ajoute : 45 + 65 = 110.<br>Puis 110 + 70 = 180.<br>Le total fait bien 180°.<br><span class="big">Oui : 45° + 65° + 70° = 180°</span>.`,
      consigne: "Un triangle a des angles de 45°, 65° et 70°. Ces mesures sont-elles possibles ?",
      verification: { type: "qcm", choix: ["Non : le total fait 170°", "Oui : le total fait 180°", "Non : le total fait 190°"], bonne: 1 },
      dessin: cerfVolant(),
    },
    {
      tag: "Énigme 2 · Au phare",
      titre: "L'angle du phare",
      question: `Le phare, un bateau et un rocher forment un triangle.<br>L'angle au bateau mesure <b>50°</b>.<br>L'angle au rocher mesure <b>95°</b>.<br><br>Combien mesure l'angle au phare ?`,
      reponse: `Les trois angles font 180° en tout.<br>On ajoute les deux angles connus : 50 + 95 = 145.<br>On retire de 180 : 180 − 145 = 35.<br>Vérification : 50 + 95 + 35 = 180.<br>L'angle au phare mesure <span class="big">35°</span>.`,
      consigne: "Un triangle a un angle de 50° et un angle de 95°. Combien mesure le troisième angle ?",
      verification: { type: "courte", attendus: ["35"], unite: "°" },
      dessin: phare(),
    },
    {
      tag: "Énigme 3 · À la menuiserie",
      titre: "Les trois planches",
      question: `Le menuisier a trois planches.<br>Elles mesurent <b>3 dm</b>, <b>4 dm</b> et <b>8 dm</b>.<br>Il veut les assembler en triangle.<br><br>Est-ce possible ?`,
      reponse: `On ajoute les deux petites planches : 3 + 4 = 7.<br>La grande mesure 8 dm.<br>7 est plus petit que 8.<br>Les deux petites ne se rejoignent pas.<br><span class="big">Non, aucun triangle</span>.`,
      consigne: "Peut-on faire un triangle avec des côtés de 3 dm, 4 dm et 8 dm ?",
      verification: { type: "qcm", choix: ["Oui, un triangle", "On ne peut pas savoir", "Non, aucun triangle"], bonne: 2 },
      dessin: menuiserie(),
    },
    {
      tag: "Énigme 4 · À la boulangerie",
      titre: "Le chausson isocèle",
      question: `Le boulanger fait un chausson en triangle <b>isocèle</b>.<br>L'angle du haut mesure <b>50°</b>.<br>Les deux angles du bas sont égaux.<br><br>Combien mesure un angle du bas ?`,
      reponse: `Les trois angles font 180°.<br>On retire l'angle du haut : 180 − 50 = 130.<br>Il reste 130° pour les deux angles du bas.<br>Ils sont égaux : 130 ÷ 2 = 65.<br>Vérification : 50 + 65 + 65 = 180.<br>Un angle du bas mesure <span class="big">65°</span>.`,
      consigne: "Un triangle isocèle a un angle du haut de 50°. Combien mesure chaque angle du bas ?",
      verification: { type: "courte", attendus: ["65"], unite: "°" },
      dessin: chausson(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le triangle géant",
      sorte: "piege",
      question: `Léo dessine un triangle : <b>70°</b>, <b>60°</b> et <b>50°</b>.<br>Au planétarium, on le projette en très grand au plafond.<br>Léo dit : « Il est plus grand, donc ses angles font plus de 180° ! »<br><br><b>Combien font les trois angles du grand triangle ?</b>`,
      reponse: `Le grand triangle a la même forme.<br>Ses angles restent 70°, 60° et 50°.<br>70 + 60 + 50 = 180.<br>Petit ou grand, c'est vrai pour TOUS les triangles.<br>Léo se trompe : <span class="big">180°, comme le petit</span>.`,
      consigne: "Un triangle de 70°, 60° et 50° est projeté en très grand. Combien font ses trois angles ensemble ?",
      verification: { type: "qcm", choix: ["180°, comme le petit", "Plus de 180°", "540°, 3 fois plus"], bonne: 0 },
      dessin: planetarium(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les quatre baguettes",
      sorte: "defi",
      question: `Maé a 4 baguettes : <b>2 cm</b>, <b>3 cm</b>, <b>4 cm</b> et <b>5 cm</b>.<br>Elle en prend 3 pour faire un triangle.<br><br>Combien de triangles différents peut-elle faire ?`,
      reponse: `Il y a 4 façons de choisir 3 baguettes.<br>2, 3, 4 : 2 + 3 = 5, plus grand que 4. Oui.<br>2, 3, 5 : 2 + 3 = 5, égal à 5. Triangle tout plat : non.<br>2, 4, 5 : 2 + 4 = 6, plus grand que 5. Oui.<br>3, 4, 5 : 3 + 4 = 7, plus grand que 5. Oui.<br>Elle peut faire <span class="big">3 triangles</span>.`,
      consigne: "Avec des baguettes de 2 cm, 3 cm, 4 cm et 5 cm, combien de triangles peut-on faire en prenant 3 baguettes ?",
      verification: { type: "courte", attendus: ["3"], unite: "triangles" },
      dessin: baguettes(),
    },
  ],
};

export default problemes;
