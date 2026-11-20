// Énigmes à projeter — 4e, notion trigo_cosinus (la rampe du skate-park,
// le fil du cerf-volant, la tyrolienne, la rampe du camion, piège de
// l'échelle des pompiers, défi du portique de la balançoire).
// Toutes les figures sont au bon rapport : angles tracés avec cos et sin,
// coordonnées calculées ci-dessous. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const RAD = Math.PI / 180;
type P = [number, number];
const seg = (a: P, b: P, att = S) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;
const pt = (p: P, nom: string, dx: number, dy: number, coul: string = C.craie) =>
  `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${coul}"/>` +
  `<text x="${r1(p[0] + dx)}" y="${r1(p[1] + dy)}" fill="${coul}" font-size="24" text-anchor="middle">${nom}</text>`;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22) =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="middle">${t}</text>`;
const BLEU_TRAIT = `stroke="${C.bleu}" stroke-width="4" stroke-linecap="round" fill="none"`;
const SOL = `stroke="${C.pale}" stroke-width="3"`;

// Un arc d'angle de sommet o, de la direction d1 à la direction d2 (en degrés,
// sens trigonométrique, y vers le haut à l'écran), rayon r.
const arc = (o: P, d1: number, d2: number, r: number, coul: string = C.jaune) => {
  const a: P = [r1(o[0] + r * Math.cos(d1 * RAD)), r1(o[1] - r * Math.sin(d1 * RAD))];
  const b: P = [r1(o[0] + r * Math.cos(d2 * RAD)), r1(o[1] - r * Math.sin(d2 * RAD))];
  const sens = d2 > d1 ? 0 : 1;
  return `<path d="M${a[0]} ${a[1]} A${r} ${r} 0 0 ${sens} ${b[0]} ${b[1]}" stroke="${coul}" stroke-width="4" fill="none"/>`;
};
// Le petit carré de l'angle droit en o, côtés vers u et v (vecteurs unitaires).
const droit = (o: P, u: P, v: P, t = 18) =>
  `<path d="M${r1(o[0] + t * u[0])} ${r1(o[1] + t * u[1])} L${r1(o[0] + t * u[0] + t * v[0])} ${r1(o[1] + t * u[1] + t * v[1])} L${r1(o[0] + t * v[0])} ${r1(o[1] + t * v[1])}" stroke="${C.craie}" stroke-width="3" fill="none"/>`;

// Le skate-park : rampe BC, sol AB = 340 px, angle en B de 30°,
// AC = 340 × tan 30° ≈ 196,3 px. Rectangle en A.
const skate = () => {
  const B: P = [60, 340], A: P = [400, 340], Cc: P = [400, r1(340 - 340 * Math.tan(30 * RAD))];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une rampe de skate vue de côté : triangle ABC rectangle en A, angle de 30 degrés en B">
  <path d="M${B[0]} ${B[1]} L${A[0]} ${A[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.pale}" fill-opacity=".2" stroke="none"/>
  ${seg([30, 340], [460, 340], SOL)}
  ${seg(B, Cc, `stroke="${C.jaune}" stroke-width="7" stroke-linecap="round" fill="none"`)}
  ${seg(B, A)}${seg(A, Cc)}
  ${droit(A, [-1, 0], [0, -1])}
  ${arc(B, 0, 30, 70)}
  ${txt(158, 328, "30°", C.jaune)}
  <text x="250" y="150" font-size="40" text-anchor="middle">🛹</text>
  ${pt(A, "A", 20, 30)}${pt(B, "B", -10, 30)}${pt(Cc, "C", 22, -6)}
  ${txt(240, 400, `L'angle étudié${NB}: l'angle en B`, C.pale, 20)}
  </svg>`;
};

// Le cerf-volant : 7 px par mètre. Fil EK = 50 m, sol EH = 40 m, hauteur HK = 30 m.
const cerfVolant = () => {
  const E: P = [80, 360], H: P = [360, 360], K: P = [360, 150];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cerf-volant au bout d'un fil de 50 mètres ; 40 mètres au sol, 30 mètres de hauteur ; triangle rectangle en H">
  ${seg([30, 360], [460, 360], SOL)}
  ${seg(E, K, `stroke="${C.craie}" stroke-width="3" stroke-linecap="round" fill="none"`)}
  ${seg(H, K, `stroke="${C.pale}" stroke-width="3" stroke-dasharray="8 8" fill="none"`)}
  ${droit(H, [-1, 0], [0, -1])}
  ${arc(E, 0, r1(Math.atan2(210, 280) / RAD), 60)}
  <path d="M360 110 L385 150 L360 190 L335 150 Z" fill="${C.rose}" fill-opacity=".35" stroke="${C.rose}" stroke-width="3"/>
  <text x="58" y="352" font-size="34" text-anchor="middle">🧒</text>
  ${pt(E, "E", -10, 34)}${pt(H, "H", 16, 32)}${pt(K, "K", 46, 0, C.rose)}
  ${txt(200, 240, "50 m")}
  ${txt(220, 392, "40 m")}
  ${txt(410, 268, "30 m", C.pale)}
  </svg>`;
};

// La tyrolienne : 5 px par mètre. Câble TA = 80 m = 400 px, angle 15° en A.
// PA = 400 cos 15° ≈ 386,4 px ; PT = 400 sin 15° ≈ 103,5 px.
const tyrolienne = () => {
  const A: P = [450, 330];
  const P0: P = [r1(450 - 400 * Math.cos(15 * RAD)), 330];
  const T: P = [P0[0], r1(330 - 400 * Math.sin(15 * RAD))];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une tyrolienne : un câble de 80 mètres descend de T vers A, avec un angle de 15 degrés par rapport à l'horizontale">
  <rect x="${P0[0] - 40}" y="${T[1]}" width="22" height="${360 - T[1]}" fill="${C.pale}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>
  <text x="${P0[0] - 28}" y="${T[1] - 14}" font-size="40" text-anchor="middle">🌳</text>
  ${seg(T, A, `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"`)}
  ${seg(P0, A, `stroke="${C.bleu}" stroke-width="3" stroke-dasharray="10 8" fill="none"`)}
  ${seg(P0, T, `stroke="${C.pale}" stroke-width="3" stroke-dasharray="6 6" fill="none"`)}
  ${droit(P0, [1, 0], [0, -1])}
  ${arc(A, 180, 165, 80)}
  ${txt(352, 322, "15°", C.jaune)}
  <text x="250" y="262" font-size="30" text-anchor="middle">🧗</text>
  ${pt(T, "T", -2, -14)}${pt(A, "A", 0, 32)}${pt(P0, "P", 0, 32, C.bleu)}
  ${txt(300, 228, "80 m")}
  ${txt(250, 370, "?", C.rose, 30)}
  ${txt(240, 410, "pas de vent, câble bien tendu", C.pale, 20)}
  </svg>`;
};

// La rampe du camion : 80 px par mètre. Rampe BC = 5 m = 400 px,
// sol BA = 4,8 m = 384 px, hauteur AC = √(25 − 23,04) = 1,4 m = 112 px.
const camion = () => {
  const B: P = [40, 350], A: P = [424, 350], Cc: P = [424, 238];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une rampe de 5 mètres monte du sol jusqu'au plancher d'un camion ; 4,8 mètres au sol ; l'angle en B est inconnu">
  <rect x="424" y="150" width="50" height="88" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <rect x="424" y="238" width="50" height="80" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  ${seg([20, 350], [470, 350], SOL)}
  ${seg(B, Cc, `stroke="${C.jaune}" stroke-width="7" stroke-linecap="round" fill="none"`)}
  ${seg(A, Cc, `stroke="${C.pale}" stroke-width="3" stroke-dasharray="6 6" fill="none"`)}
  ${droit(A, [-1, 0], [0, -1])}
  ${arc(B, 0, 16.3, 90)}
  ${txt(172, 344, "?", C.rose, 28)}
  <text x="300" y="250" font-size="34" text-anchor="middle">📦</text>
  ${pt(B, "B", 0, 32)}${pt(A, "A", 0, 32)}${pt(Cc, "C", -18, -14)}
  ${txt(232, 262, "5 m")}
  ${txt(232, 392, "4,8 m")}
  </svg>`;
};

// L'échelle des pompiers : 25 px par mètre. Échelle BC = 12 m = 300 px,
// angle 70° en B ; BA = 300 cos 70° ≈ 102,6 px, AC = 300 sin 70° ≈ 281,9 px.
const pompiers = () => {
  const B: P = [180, 370];
  const A: P = [r1(180 + 300 * Math.cos(70 * RAD)), 370];
  const Cc: P = [A[0], r1(370 - 300 * Math.sin(70 * RAD))];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une échelle de pompiers de 12 mètres contre un mur, angle de 70 degrés avec le sol ; la distance entre le pied et le mur est inconnue">
  <rect x="${A[0]}" y="60" width="90" height="310" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <text x="${A[0] + 45}" y="130" font-size="34" text-anchor="middle">🔥</text>
  ${seg([40, 370], [460, 370], SOL)}
  ${seg(B, Cc, `stroke="${C.rose}" stroke-width="6" stroke-linecap="round" fill="none"`)}
  ${droit(A, [-1, 0], [0, -1])}
  ${arc(B, 0, 70, 55)}
  ${txt(232, 340, "70°", C.jaune)}
  <text x="110" y="360" font-size="34" text-anchor="middle">🚒</text>
  ${pt(B, "B", -6, 34)}${pt(A, "A", 12, 34)}${pt(Cc, "C", -22, 0)}
  ${txt(190, 220, "12 m")}
  ${txt(232, 410, "?", C.rose, 28)}
  </svg>`;
};

// Le portique : 150 px par mètre. Pieds B et D à 1,6 m (240 px), montants
// de 2 m (300 px), sommet S à √3,36 ≈ 1,833 m (275 px) au-dessus de H.
const portique = () => {
  const B: P = [120, 370], D: P = [360, 370], H: P = [240, 370];
  const Sm: P = [240, r1(370 - 150 * Math.sqrt(3.36))];
  const angle = Math.acos(0.4) / RAD;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le portique d'une balançoire vu de côté : deux montants de 2 mètres, pieds écartés de 1,6 mètre ; l'angle d'un montant avec le sol est inconnu">
  ${seg([40, 370], [440, 370], SOL)}
  ${seg(B, Sm)}${seg(D, Sm)}
  ${seg(Sm, H, `stroke="${C.pale}" stroke-width="3" stroke-dasharray="6 6" fill="none"`)}
  ${seg([234, Sm[1] + 8], [234, 300], `stroke="${C.bleu}" stroke-width="2" fill="none"`)}
  <rect x="220" y="300" width="40" height="8" fill="${C.bleu}"/>
  ${arc(B, 0, r1(angle), 50)}
  ${txt(186, 362, "?", C.rose, 26)}
  ${pt(B, "B", -8, 34)}${pt(D, "D", 8, 34)}${pt(Sm, "S", 0, -14)}${pt(H, "H", 16, -10, C.pale)}
  ${txt(140, 220, "2 m")}${txt(340, 220, "2 m")}
  ${txt(240, 412, "BD = 1,6 m", C.craie, 20)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "trigo_cosinus",
  titre: "Énigmes sur le cosinus",
  description: "La rampe du skate-park, le fil du cerf-volant, la tyrolienne, la rampe du camion, le piège de l'échelle des pompiers, le défi du portique : repérer l'adjacent et l'hypoténuse, écrire le cosinus, calculer une longueur ou un angle à la calculatrice.",
  problemes: [
    {
      tag: "Énigme 1 · Le skate-park",
      titre: "Le côté qui touche l'angle",
      question: `La rampe de Yanis est un triangle ABC rectangle en A.<br>La planche [BC] monte du sol jusqu'en C.<br>On étudie l'angle en B, celui que fait la rampe avec le sol.<br><br>Quel est le côté adjacent à l'angle en B ?`,
      reponse: `L'hypoténuse est en face de l'angle droit : c'est [BC], la rampe.<br>Le côté adjacent touche l'angle en B sans être l'hypoténuse.<br>Les côtés qui touchent B sont [BC] et [AB].<br>Donc l'adjacent est <span class="big">[AB], le sol</span>.<br>[AC] ne touche pas B : c'est le côté opposé.`,
      consigne: "Quel est le côté adjacent à l'angle en B ?",
      verification: { type: "qcm", choix: ["[BC], la rampe", "[AC], la hauteur", "[AB], le sol"], bonne: 2 },
      dessin: skate(),
    },
    {
      tag: "Énigme 2 · Le cerf-volant",
      titre: "Le fil et le sol",
      question: `Clara tient son cerf-volant au bout d'un fil EK de 50 m.<br>Le cerf-volant est à 30 m de hauteur, juste au-dessus de H.<br>Au sol, EH mesure 40 m. Le triangle EHK est rectangle en H.<br><br>Que vaut le cosinus de l'angle en E ?`,
      reponse: `L'hypoténuse est en face de l'angle droit : c'est le fil EK = 50 m.<br>L'adjacent à l'angle en E est EH = 40 m. La hauteur 30 m ne sert pas.<br>cos E = adjacent ÷ hypoténuse = EH ÷ EK = 40 ÷ 50.<br>cos E = <span class="big">0,8</span>.<br>Contrôle : 0,8 est bien entre 0 et 1.`,
      consigne: "Que vaut le cosinus de l'angle en E ?",
      verification: { type: "courte", attendus: ["0,8", "0.8", "4/5", "40/50"] },
      dessin: cerfVolant(),
    },
    {
      tag: "Énigme 3 · La tyrolienne",
      titre: "Au-dessus de la rivière",
      question: `Une tyrolienne descend de l'arbre T jusqu'au point A.<br>Le câble TA mesure 80 m. Il fait un angle de 15° avec l'horizontale.<br>Le triangle TPA est rectangle en P.<br><br>Quelle est la distance horizontale PA, arrondie au dixième de mètre ?`,
      reponse: `L'angle étudié est en A. L'hypoténuse est le câble TA = 80 m.<br>L'adjacent à l'angle en A est PA.<br>cos A = PA ÷ TA, donc cos 15° = PA ÷ 80.<br>PA = 80 × cos 15° ≈ 80 × 0,9659 ≈ 77,27.<br>PA ≈ <span class="big">77,3 m</span>.<br>Contrôle : 77,3 m est plus court que le câble de 80 m.`,
      consigne: "Quelle est la distance PA, au dixième de mètre ?",
      verification: { type: "courte", attendus: ["77,3", "77.3"], unite: "m" },
      dessin: tyrolienne(),
    },
    {
      tag: "Énigme 4 · Le camion de livraison",
      titre: "La pente de la rampe",
      question: `Pour charger les colis, Mehdi pose une rampe BC de 5 m.<br>Au sol, de B jusqu'au camion, il y a 4,8 m. Le triangle ABC est rectangle en A.<br><br>Quel angle la rampe fait-elle avec le sol, arrondi au degré ?`,
      reponse: `L'angle cherché est en B. L'hypoténuse est la rampe BC = 5 m.<br>L'adjacent à l'angle en B est AB = 4,8 m.<br>cos B = 4,8 ÷ 5 = 0,96.<br>Avec la touche cos⁻¹ : B ≈ 16,26°.<br>La rampe fait un angle d'environ <span class="big">16°</span> avec le sol.<br>74°, c'est l'angle en C, pas celui du sol.`,
      consigne: "Quel angle la rampe fait-elle avec le sol, au degré ?",
      verification: { type: "qcm", choix: ["16°", "74°", "0,96°"], bonne: 0 },
      dessin: camion(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'échelle des pompiers",
      sorte: "piege",
      question: `L'échelle des pompiers mesure 12 m. Elle fait un angle de 70° avec le sol.<br>Le triangle ABC est rectangle en A, au pied du mur.<br>Enzo écrit : AB = 12 ÷ cos 70° ≈ 35,1 m.<br><br><b>Quelle est la vraie distance AB, au dixième ?</b>`,
      reponse: `Enzo s'est trompé ! 35,1 m est plus long que l'échelle : impossible.<br>L'adjacent est toujours plus court que l'hypoténuse.<br>cos B = AB ÷ BC, donc cos 70° = AB ÷ 12.<br>On connaît l'hypoténuse : on <b>multiplie</b>. AB = 12 × cos 70° ≈ 12 × 0,342 ≈ 4,10.<br><span class="big">AB ≈ 4,1 m</span>.`,
      consigne: "Quelle est la distance AB entre le pied de l'échelle et le mur ?",
      verification: { type: "qcm", choix: ["35,1 m", "4,1 m", "11,3 m"], bonne: 1 },
      dessin: pompiers(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le portique de la balançoire",
      sorte: "defi",
      question: `Vu de côté, le portique d'une balançoire forme un triangle BSD.<br>Les deux montants [SB] et [SD] mesurent 2 m chacun.<br>Les pieds B et D sont écartés de 1,6 m.<br><br>Quel angle un montant fait-il avec le sol, arrondi au degré ?`,
      reponse: `BSD n'est pas rectangle. Mais SB = SD : il est isocèle.<br>La hauteur [SH] le coupe en deux triangles rectangles en H.<br>H est au milieu de [BD], donc BH = 1,6 ÷ 2 = 0,8 m.<br>Dans SHB : cos B = BH ÷ SB = 0,8 ÷ 2 = 0,4.<br>Avec cos⁻¹ : B ≈ 66,4°. L'angle vaut environ <span class="big">66°</span>.<br>Piège : écrire cos B = 1,6 ÷ 2 = 0,8 donne 37°. Faux : 1,6 m n'est pas un côté du triangle rectangle.`,
      consigne: "Quel angle un montant fait-il avec le sol, au degré ?",
      verification: { type: "courte", attendus: ["66"], unite: "°" },
      dessin: portique(),
    },
  ],
};

export default problemes;
