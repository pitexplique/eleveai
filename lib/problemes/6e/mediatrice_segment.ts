// Énigmes à projeter — 6e, notion mediatrice_segment (reconnaître la
// médiatrice, PA = PB sur la médiatrice, le compas et son écartement, le centre
// d'un cercle sur la médiatrice d'une corde, le piège « elle passe par le
// milieu, donc c'est la médiatrice », le défi du point à égale distance de
// trois points). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-mediatrice-segment.tsx) : la
// médiatrice de [AB] est une droite perpendiculaire à [AB] qui passe par son
// milieu ; si P est sur la médiatrice, PA = PB ; si KA = KB, K est sur la
// médiatrice ; au compas, le même écartement depuis A et depuis B.
// Phrases courtes (les 6e lisent difficilement). Figures exactes : coordonnées
// calculées (notées dans chaque fonction), codages calculés par les outils.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;

const point = ([x, y]: P, couleur: string = C.jaune) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="7" fill="${couleur}"/>`;
const lettre = (x: number, y: number, l: string, couleur: string = C.craie) =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${couleur}" font-size="28" text-anchor="middle">${l}</text>`;
const seg = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.craie, largeur = 4, tirets = "") =>
  `<path d="M${r1(x1)} ${r1(y1)} L${r1(x2)} ${r1(y2)}" stroke="${couleur}" stroke-width="${largeur}" stroke-linecap="round"${tirets ? ` stroke-dasharray="${tirets}"` : ""} fill="none"/>`;

/** Le petit trait « même longueur » au milieu du segment [PQ], perpendiculaire. */
const trait = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.rose) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const l = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / l) * 11;
  const ny = ((x2 - x1) / l) * 11;
  return `<path d="M${r1(mx - nx)} ${r1(my - ny)} L${r1(mx + nx)} ${r1(my + ny)}" stroke="${couleur}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
};

/** Le petit carré « angle droit » au sommet S, entre les côtés vers A et vers B. */
const angleDroit = ([sx, sy]: P, [ax, ay]: P, [bx, by]: P, t = 18) => {
  const la = Math.hypot(ax - sx, ay - sy);
  const lb = Math.hypot(bx - sx, by - sy);
  const ux = ((ax - sx) / la) * t, uy = ((ay - sy) / la) * t;
  const vx = ((bx - sx) / lb) * t, vy = ((by - sy) / lb) * t;
  return `<path d="M${r1(sx + ux)} ${r1(sy + uy)} L${r1(sx + ux + vx)} ${r1(sy + uy + vy)} L${r1(sx + vx)} ${r1(sy + vy)}" stroke="${C.bleu}" stroke-width="3" fill="none"/>`;
};

// 1. Le terrain de foot : les deux buts A(60 ; 210) et B(420 ; 210), milieu
// I(240 ; 210), codé AI = IB (un trait chacun). Trois lignes tracées de y = 90
// à y = 330 :
// ligne 1 : passe par I mais penchée à 65° (de (184 ; 90) à (296 ; 330) :
//   pente 240 ÷ 112 ≈ 2,14 = tan 65°) → pas perpendiculaire ;
// ligne 2 : verticale x = 360 → perpendiculaire (codée) mais pas par I ;
// ligne 3 : verticale x = 240 → perpendiculaire (codée) ET par I.
const foot = () => {
  const A: P = [60, 210], B: P = [420, 210], I: P = [240, 210];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain de foot entre deux buts A et B, le milieu de AB codé, et trois lignes numérotées 1, 2 et 3">
  <rect x="40" y="70" width="400" height="280" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  ${seg(A, B, C.craie, 5)}
  ${seg([184, 90], [296, 330], C.jaune, 4)}
  ${seg([360, 90], [360, 330], C.pale, 4)}
  ${seg([240, 90], [240, 330], C.rose, 4)}
  ${angleDroit([360, 210], [420, 210], [360, 90])}${angleDroit(I, B, [240, 90])}
  ${trait(A, I)}${trait(I, B)}
  ${point(A, C.craie)}${point(B, C.craie)}
  ${lettre(60, 250, "A")}${lettre(420, 250, "B")}
  ${lettre(176, 58, "1", C.jaune)}${lettre(240, 58, "3", C.rose)}${lettre(360, 58, "2", C.pale)}
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">Quelle ligne est la médiatrice${NB}?</text>
  </svg>`;
};

// 2. Le sentier en forêt : 20 px pour 1 m. A(140 ; 300), B(340 ; 300) :
// AB = 200 px = 10 m. Le sentier est la médiatrice : x = 240 (milieu H(240 ; 300),
// angle droit codé, AH = HB codés). Lucas en P(240 ; 60) :
// PA = √(100² + 240²) = √67 600 = 260 px = 13 m (triangle 5-12-13) ; PB = 260 px aussi.
const foret = () => {
  const A: P = [140, 300], B: P = [340, 300], H: P = [240, 300], Pt: P = [240, 60];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux arbres A et B ; le sentier est la médiatrice de AB ; Lucas, sur le sentier, est à 13 mètres de A">
  ${seg([240, 30], [240, 365], C.bleu, 4, "10 8")}
  ${seg(A, B, C.craie, 4)}
  ${angleDroit(H, B, Pt)}${trait(A, H)}${trait(H, B)}
  ${seg(Pt, A, C.craie, 4)}
  ${seg(Pt, B, C.rose, 4, "9 7")}
  ${point(A, C.craie)}${point(B, C.craie)}${point(Pt, C.rose)}
  <text x="98" y="312" font-size="40" text-anchor="middle">🌲</text>
  <text x="382" y="312" font-size="40" text-anchor="middle">🌲</text>
  ${lettre(140, 338, "A")}${lettre(340, 338, "B")}
  <text x="258" y="52" fill="${C.rose}" font-size="24" text-anchor="start">Lucas (P)</text>
  <text x="178" y="182" fill="${C.craie}" font-size="24" text-anchor="end">13 m</text>
  <text x="302" y="182" fill="${C.rose}" font-size="28" text-anchor="start">?</text>
  <text x="252" y="360" fill="${C.pale}" font-size="20" text-anchor="start">sentier</text>
  <text x="240" y="402" fill="${C.rose}" font-size="24" text-anchor="middle">Combien mesure PB${NB}?</text>
  </svg>`;
};

// 3. La carte au trésor : 40 px pour 1 cm. A(120 ; 230), B(360 ; 230) :
// AB = 240 px = 6 cm. Aucun arc dessiné (ce serait donner la réponse).
const carte = () => {
  const A: P = [120, 230], B: P = [360, 230];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une carte au trésor : deux palmiers A et B à 6 centimètres l'un de l'autre sur la carte">
  <rect x="30" y="80" width="420" height="250" rx="16" fill="${C.jaune}" fill-opacity=".12" stroke="${C.pale}" stroke-width="3"/>
  ${seg(A, B, C.craie, 4)}
  ${point(A, C.craie)}${point(B, C.craie)}
  <text x="120" y="200" font-size="40" text-anchor="middle">🌴</text>
  <text x="360" y="200" font-size="40" text-anchor="middle">🌴</text>
  ${lettre(120, 268, "A")}${lettre(360, 268, "B")}
  <path d="M120 298 L360 298 M120 289 L120 307 M360 289 L360 307" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <text x="240" y="288" fill="${C.craie}" font-size="24" text-anchor="middle">6 cm</text>
  <text x="240" y="50" fill="${C.pale}" font-size="22" text-anchor="middle">même écartement depuis A et depuis B</text>
  <text x="240" y="380" fill="${C.rose}" font-size="24" text-anchor="middle">Quel écartement de compas${NB}?</text>
  </svg>`;
};

// 4. Le vieux puits, vu de dessus : cercle de centre O(240 ; 200), rayon 150.
// A à 150° : (240 − 129,9 ; 200 + 75) = (110,1 ; 275).
// B à 60° : (240 + 75 ; 200 + 129,9) = (315 ; 329,9).
// (angles comptés vers le bas de l'écran). Le centre n'est PAS dessiné.
const puits = () => {
  const O: P = [240, 200], r = 150;
  const sur = (deg: number, d = r): P => [O[0] + d * Math.cos((deg * Math.PI) / 180), O[1] + d * Math.sin((deg * Math.PI) / 180)];
  const A = sur(150), B = sur(60);
  const lA = sur(150, 178), lB = sur(60, 176);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le bord rond d'un puits vu de dessus, avec deux points A et B sur le bord reliés par une corde ; le centre n'est pas marqué">
  <circle cx="240" cy="200" r="150" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="5"/>
  ${seg(A, B, C.jaune, 5)}
  ${point(A, C.rose)}${point(B, C.rose)}
  ${lettre(lA[0], lA[1] + 10, "A")}${lettre(lB[0] + 8, lB[1] + 10, "B")}
  <text x="20" y="34" fill="${C.pale}" font-size="20" text-anchor="start">vu de dessus</text>
  <text x="240" y="405" fill="${C.rose}" font-size="24" text-anchor="middle">Par où passe la médiatrice${NB}?</text>
  </svg>`;
};

// 5. Le piège de Léo : A(80 ; 260), B(400 ; 260), milieu I(240 ; 260), codé.
// La droite d passe par I à 60° de [IB] : direction (cos 60° ; −sin 60°)
// = (0,5 ; −0,866). De I − 150·u = (165 ; 389,9) à I + 150·u = (315 ; 130,1).
// Arc de l'angle 60° : rayon 44, de 0° à 60°.
const piege = () => {
  const A: P = [80, 260], B: P = [400, 260], I: P = [240, 260];
  const u: P = [Math.cos(Math.PI / 3), -Math.sin(Math.PI / 3)];
  const d1: P = [I[0] - 150 * u[0], I[1] - 150 * u[1]], d2: P = [I[0] + 150 * u[0], I[1] + 150 * u[1]];
  const fin: P = [I[0] + 44 * u[0], I[1] + 44 * u[1]];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un segment AB et son milieu I codé ; une droite d passe par I et fait un angle de 60 degrés avec le segment">
  ${seg(A, B, C.craie, 5)}
  ${seg(d1, d2, C.bleu, 4)}
  <path d="M284 260 A44 44 0 0 0 ${r1(fin[0])} ${r1(fin[1])}" stroke="${C.jaune}" stroke-width="4" fill="none"/>
  <text x="300" y="236" fill="${C.jaune}" font-size="24" text-anchor="start">60°</text>
  ${trait(A, I)}${trait(I, B)}
  ${point(A, C.craie)}${point(B, C.craie)}${point(I, C.rose)}
  ${lettre(80, 298, "A")}${lettre(400, 298, "B")}${lettre(260, 296, "I")}
  ${lettre(d2[0] + 22, d2[1] + 8, "d", C.bleu)}
  <text x="240" y="50" fill="${C.rose}" font-size="24" text-anchor="middle">d est-elle la médiatrice de [AB]${NB}?</text>
  </svg>`;
};

// 6. Le défi des trois copains : cercle (non dessiné) de centre O(240 ; 215),
// rayon 150 px (pas à l'échelle des 250 m, mais OA = OB = OC exactement).
// A à 200° : (99 ; 266,3). B à 330° : (369,9 ; 290). C à 100° : (214 ; 67,3)
// (angles comptés vers le haut de l'écran : y = 215 − 150 sin a).
// Médiatrice de [AB] : par son milieu (234,5 ; 278,2) et par O.
// Médiatrice de [BC] : par son milieu (292 ; 178,6) et par O.
// Contrôle : OA = OB = OC = 150 px.
const copains = () => {
  const O: P = [240, 215], r = 150;
  const sur = (deg: number): P => [O[0] + r * Math.cos((deg * Math.PI) / 180), O[1] - r * Math.sin((deg * Math.PI) / 180)];
  const A = sur(200), B = sur(330), Cc = sur(100);
  // Codage : un trait sur les moitiés de [AB], deux traits sur celles de [BC]
  // (les deux segments n'ont pas la même longueur).
  const mediatrice = (X: P, Y: P, nTraits: 1 | 2) => {
    const M: P = [(X[0] + Y[0]) / 2, (X[1] + Y[1]) / 2];
    const l = Math.hypot(O[0] - M[0], O[1] - M[1]);
    const u: P = [(O[0] - M[0]) / l, (O[1] - M[1]) / l];
    const debut: P = [M[0] - 40 * u[0], M[1] - 40 * u[1]], fin: P = [O[0] + 55 * u[0], O[1] + 55 * u[1]];
    const lx = Math.hypot(Y[0] - X[0], Y[1] - X[1]);
    const v: P = [(Y[0] - X[0]) / lx, (Y[1] - X[1]) / lx];
    const decale = (Q: P, d: number): P => [Q[0] + d * v[0], Q[1] + d * v[1]];
    const traits = (Q1: P, Q2: P) =>
      nTraits === 1
        ? trait(Q1, Q2, C.jaune)
        : trait(decale(Q1, -5), decale(Q2, -5), C.jaune) + trait(decale(Q1, 5), decale(Q2, 5), C.jaune);
    return `${seg(debut, fin, C.bleu, 3, "9 7")}${angleDroit(M, Y, O, 15)}${traits(X, M)}${traits(M, Y)}`;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois maisons A, B et C ; le point O est sur la médiatrice de AB et sur la médiatrice de BC ; OA vaut 250 mètres">
  <path d="M${r1(A[0])} ${r1(A[1])} L${r1(B[0])} ${r1(B[1])} L${r1(Cc[0])} ${r1(Cc[1])} Z" fill="none" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  ${mediatrice(A, B, 1)}${mediatrice(B, Cc, 2)}
  ${seg(O, A, C.rose, 4)}
  ${seg(O, Cc, C.pale, 3, "6 6")}
  ${point(A, C.craie)}${point(B, C.craie)}${point(Cc, C.craie)}${point(O, C.rose)}
  ${lettre(78, 292, "A")}${lettre(394, 314, "B")}${lettre(214, 46, "C")}
  ${lettre(264, 244, "O", C.rose)}
  <text x="156" y="222" fill="${C.rose}" font-size="22" text-anchor="middle">250 m</text>
  <text x="240" y="400" fill="${C.rose}" font-size="24" text-anchor="middle">Combien mesure OC${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "mediatrice_segment",
  titre: "Énigmes sur la médiatrice d'un segment",
  description: "La ligne du terrain de foot, le sentier entre deux arbres, le compas de la carte au trésor, le centre du vieux puits, le piège de la droite penchée, le défi du point à égale distance de trois maisons.",
  problemes: [
    {
      tag: "Énigme 1 · Au football",
      titre: "La ligne du milieu",
      question: `Les deux buts sont en <b>A</b> et en <b>B</b>.<br>L'arbitre veut tracer la <b>médiatrice</b> de [AB].<br>Trois lignes sont dessinées.<br><br>Laquelle est la médiatrice ?`,
      reponse: `La médiatrice a deux conditions.<br>Elle passe par le milieu de [AB].<br>Elle est perpendiculaire à [AB].<br>La ligne 1 passe par le milieu, mais elle est penchée.<br>La ligne 2 est perpendiculaire, mais pas au milieu.<br>C'est <span class="big">la ligne 3</span>.`,
      consigne: "Ligne 1 : par le milieu, penchée. Ligne 2 : perpendiculaire, pas au milieu. Ligne 3 : les deux. Laquelle est la médiatrice ?",
      verification: { type: "qcm", choix: ["La ligne 1", "La ligne 2", "La ligne 3"], bonne: 2 },
      dessin: foot(),
    },
    {
      tag: "Énigme 2 · En forêt",
      titre: "Le sentier entre deux arbres",
      question: `Deux arbres sont en <b>A</b> et en <b>B</b>.<br>Le sentier est la médiatrice de [AB].<br>Lucas marche sur le sentier, au point P.<br>Il est à <b>13 m</b> de l'arbre A.<br><br>À quelle distance est-il de l'arbre B ?`,
      reponse: `P est sur la médiatrice de [AB].<br>Tout point de la médiatrice est à égale distance de A et de B.<br>Donc PB = PA.<br>PB = <span class="big">13 m</span>.`,
      consigne: "P est sur la médiatrice de [AB] et PA = 13 m. Combien mesure PB ?",
      verification: { type: "courte", attendus: ["13"], unite: "m" },
      dessin: foret(),
    },
    {
      tag: "Énigme 3 · La carte au trésor",
      titre: "Le bon écartement",
      question: `Sur la carte, deux palmiers A et B sont à <b>6 cm</b>.<br>Yanis trace la médiatrice de [AB] au compas.<br>Il garde le même écartement depuis A et depuis B.<br>Les arcs doivent se croiser en <b>deux</b> points.<br><br>Quel écartement peut-il prendre ?`,
      reponse: `Les deux arcs doivent se croiser, au-dessus et en dessous.<br>Avec 2 cm : 2 + 2 = 4 cm. C'est moins que 6 cm : ils ne se touchent pas.<br>Avec 3 cm : 3 + 3 = 6 cm. Ils se touchent en un seul point, le milieu.<br>Avec 4 cm : 4 + 4 = 8 cm. C'est plus que 6 cm : deux croisements.<br>Il prend <span class="big">4 cm</span>.`,
      consigne: "AB = 6 cm. Au compas, quel écartement donne deux croisements pour tracer la médiatrice ?",
      verification: { type: "qcm", choix: ["4 cm", "2 cm", "3 cm"], bonne: 0 },
      dessin: carte(),
    },
    {
      tag: "Énigme 4 · Le vieux puits",
      titre: "Le centre caché",
      question: `Le bord du puits est un cercle.<br>Son centre O n'est pas marqué.<br>Rose pose deux cailloux A et B sur le bord.<br>Elle trace la médiatrice de la corde [AB].<br><br>Par quel point passe-t-elle à coup sûr ?`,
      reponse: `O est le centre du cercle.<br>A et B sont sur le cercle : OA et OB sont deux rayons.<br>Donc OA = OB.<br>Un point à égale distance de A et de B est sur la médiatrice.<br>Elle passe par <span class="big">le centre O</span>.`,
      consigne: "A et B sont sur un cercle de centre O. Par quel point passe toujours la médiatrice de [AB] ?",
      verification: { type: "qcm", choix: ["Par le point A", "Par le centre O", "Par n'importe quel point du bord"], bonne: 1 },
      dessin: puits(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La droite penchée",
      sorte: "piege",
      question: `I est le milieu de [AB].<br>Léo trace une droite d qui passe par I.<br>Elle fait un angle de <b>60°</b> avec [AB].<br>Il dit : « d est la médiatrice de [AB] ! »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Passer par le milieu ne suffit pas.<br>La médiatrice doit aussi être perpendiculaire à [AB].<br>Perpendiculaire, c'est un angle droit : 90°.<br>Ici, l'angle fait 60° : d est penchée.<br>La médiatrice fait <span class="big">90°</span> avec [AB].`,
      consigne: "La médiatrice de [AB] passe par le milieu. Quel angle fait-elle avec [AB] ?",
      verification: { type: "courte", attendus: ["90"], unite: "°" },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le rendez-vous des trois copains",
      sorte: "defi",
      question: `Trois copains habitent en A, en B et en C.<br>Le point O est sur la médiatrice de [AB].<br>O est aussi sur la médiatrice de [BC].<br>O est à <b>250 m</b> de la maison A.<br><br>À quelle distance est-il de la maison C ?`,
      reponse: `O est sur la médiatrice de [AB] : OB = OA = 250 m.<br>O est sur la médiatrice de [BC] : OC = OB = 250 m.<br>O est à la même distance des trois maisons.<br>OC = <span class="big">250 m</span>.`,
      consigne: "O est sur la médiatrice de [AB] et sur celle de [BC]. OA = 250 m. Combien mesure OC ?",
      verification: { type: "courte", attendus: ["250"], unite: "m" },
      dessin: copains(),
    },
  ],
};

export default problemes;
