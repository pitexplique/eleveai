// Énigmes à projeter — 6e, notion bissectrice_angle (deux parts égales, le
// pliage qui donne la moitié, retrouver l'angle entier, la bissectrice d'un
// angle plat, le piège « la bissectrice fait toujours 45° », le défi des
// bissectrices successives). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-bissectrice-angle.tsx) : la
// bissectrice partage l'angle en deux angles égaux, côte à côte ; une part vaut
// la moitié de l'angle, l'angle vaut le double d'une part ; on plie un côté sur
// l'autre ; 45° seulement pour un angle droit.
// Phrases courtes (les 6e lisent difficilement). Figures exactes : demi-droites
// tracées avec cos et sin (angles comptés vers le haut de l'écran :
// x = Ox + L cos a, y = Oy − L sin a), coordonnées notées dans chaque fonction.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Le point à la distance L de O, dans la direction a (en degrés). */
const vers = ([ox, oy]: P, L: number, a: number): P => [ox + L * Math.cos(rad(a)), oy - L * Math.sin(rad(a))];

const seg = ([x1, y1]: P, [x2, y2]: P, couleur: string = C.craie, largeur = 4, tirets = "") =>
  `<path d="M${r1(x1)} ${r1(y1)} L${r1(x2)} ${r1(y2)}" stroke="${couleur}" stroke-width="${largeur}" stroke-linecap="round"${tirets ? ` stroke-dasharray="${tirets}"` : ""} fill="none"/>`;

/** Arc de cercle de centre O, rayon r, de la direction a1 à la direction a2 (a1 < a2). */
const arc = (O: P, r: number, a1: number, a2: number, couleur: string, largeur = 4) => {
  const [x1, y1] = vers(O, r, a1), [x2, y2] = vers(O, r, a2);
  return `<path d="M${r1(x1)} ${r1(y1)} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${r1(x2)} ${r1(y2)}" stroke="${couleur}" stroke-width="${largeur}" fill="none"/>`;
};

/** Secteur plein (l'intérieur de l'angle), opacité faible pour lire les textes. */
const secteur = (O: P, L: number, a1: number, a2: number, couleur: string, opacite = ".15") => {
  const [x1, y1] = vers(O, L, a1), [x2, y2] = vers(O, L, a2);
  return `<path d="M${O[0]} ${O[1]} L${r1(x1)} ${r1(y1)} A${L} ${L} 0 0 0 ${r1(x2)} ${r1(y2)} Z" fill="${couleur}" fill-opacity="${opacite}" stroke="none"/>`;
};

const texte = ([x, y]: P, t: string, couleur: string = C.craie, taille = 24, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${couleur}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

const point = ([x, y]: P, couleur: string = C.craie) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="7" fill="${couleur}"/>`;

// 1. L'éventail : sommet O(240 ; 340), côtés à 40° et à 140° (angle de 100°),
// longueur 260 : (439,2 ; 172,9) et (40,8 ; 172,9). La baguette à 80° :
// (285,1 ; 83,9). Parts : 80 − 40 = 40° et 140 − 80 = 60° (40 + 60 = 100).
// Étiquettes : « 40° » à 60°, à 120 px de O → (300 ; 236) ; « 60° » à 110°,
// à 125 px → (197,2 ; 222,5).
const eventail = () => {
  const O: P = [240, 340];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un éventail ouvert : un angle de 100 degrés, partagé par une baguette en un angle de 40 degrés et un angle de 60 degrés">
  ${secteur(O, 260, 40, 140, C.jaune)}
  ${seg(O, vers(O, 260, 40), C.craie, 5)}${seg(O, vers(O, 260, 140), C.craie, 5)}
  ${seg(O, vers(O, 260, 80), C.bleu, 4, "10 7")}
  ${arc(O, 70, 40, 80, C.jaune)}${arc(O, 92, 80, 140, C.rose)}
  ${texte(vers(O, 120, 60), "40°", C.jaune, 26)}
  ${texte(vers(O, 128, 112), "60°", C.rose, 26)}
  ${point(O)}${texte([240, 374], "O", C.craie, 26)}
  ${texte([300, 76], "baguette", C.bleu, 22, "start")}
  ${texte([240, 402], `Est-ce la bissectrice${NB}?`, C.rose, 24)}
  </svg>`;
};

// 2. Le coin de papier : sommet O(240 ; 330), côtés à 25° et à 155° (angle de
// 130°), longueur 230 : (448,5 ; 232,8) et (31,5 ; 232,8). Le pli à 90° :
// (240 ; 100). Deux arcs « ? » : de 25° à 90° et de 90° à 155°.
const origami = () => {
  const O: P = [240, 330];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un coin de papier de 130 degrés ; un pli en pointillés amène un côté sur l'autre ; les deux angles faits par le pli sont à trouver">
  ${secteur(O, 230, 25, 155, C.bleu, ".18")}
  ${seg(O, vers(O, 230, 25), C.craie, 5)}${seg(O, vers(O, 230, 155), C.craie, 5)}
  ${seg(O, vers(O, 230, 90), C.jaune, 4, "10 7")}
  ${arc(O, 82, 25, 90, C.rose)}${arc(O, 82, 90, 155, C.rose)}
  ${texte(vers(O, 118, 57.5), "?", C.rose, 30)}${texte(vers(O, 118, 122.5), "?", C.rose, 30)}
  ${texte([252, 118], "pli", C.jaune, 22, "start")}
  ${point(O)}${texte([240, 366], "O", C.craie, 26)}
  ${texte([240, 50], `le coin du papier${NB}: 130°`, C.craie, 24)}
  ${texte([240, 405], `Le pli fait quel angle avec un côté${NB}?`, C.rose, 22)}
  </svg>`;
};

// 3. La lampe frontale : sommet O(60 ; 210), axe du faisceau à 0° (pointillés),
// bords à +35° et −35°, longueur 300 : (305,7 ; 37,9) et (305,7 ; 382,1).
// Arc de 0° à 35° (rayon 100) étiqueté 35° à 17,5°, 132 px → (185,9 ; 170,3).
// Grand arc rose de −35° à 35° (rayon 190) : l'angle entier, à trouver.
const lampe = () => {
  const O: P = [60, 210];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le faisceau d'une lampe frontale ; son axe partage le faisceau en deux ; entre l'axe et un bord, 35 degrés">
  ${secteur(O, 300, -35, 35, C.jaune, ".15")}
  ${seg(O, vers(O, 300, 35), C.craie, 4)}${seg(O, vers(O, 300, -35), C.craie, 4)}
  ${seg(O, vers(O, 330, 0), C.bleu, 3, "10 7")}
  ${arc(O, 100, 0, 35, C.jaune)}
  ${arc(O, 190, -35, 35, C.rose, 3)}
  ${texte(vers(O, 132, 17.5), "35°", C.jaune, 26)}
  ${texte([400, 200], "axe", C.bleu, 22, "start")}
  ${point(O)}${texte([30, 220], "O", C.craie, 26)}
  ${texte([240, 402], `L'angle du faisceau${NB}?`, C.rose, 24)}
  </svg>`;
};

// 4. Le carrefour : la route droite de (30 ; 260) à (450 ; 260), le chemin part
// de O(240 ; 260) vers le haut, à 90° (bissectrice de l'angle plat). L'angle
// droit n'est PAS codé (c'est la réponse). Arcs « ? » de 0° à 90° et de 90° à 180°.
const carrefour = () => {
  const O: P = [240, 260];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une route toute droite et un chemin qui part d'un point O de la route ; le chemin partage l'angle plat en deux angles égaux">
  ${seg([30, 260], [450, 260], C.craie, 6)}
  ${seg(O, [240, 70], C.bleu, 5, "12 8")}
  ${arc(O, 62, 0, 90, C.rose)}${arc(O, 62, 90, 180, C.rose)}
  ${texte(vers(O, 96, 45), "?", C.rose, 30)}${texte(vers(O, 96, 135), "?", C.rose, 30)}
  <text x="100" y="246" font-size="38" text-anchor="middle">🚗</text>
  ${texte([252, 92], "chemin", C.bleu, 22, "start")}
  ${texte([420, 294], "route", C.pale, 22, "end")}
  ${point(O)}${texte([240, 296], "O", C.craie, 26)}
  ${texte([240, 340], `angle plat${NB}: 180°`, C.craie, 24)}
  ${texte([240, 400], `Quel angle avec la route${NB}?`, C.rose, 24)}
  </svg>`;
};

// 5. Le piège d'Hugo : sommet O(80 ; 330), côtés à 0° et 70°, longueur 300 :
// (380 ; 330) et (182,6 ; 48,1). Sa demi-droite à 45° : (292,1 ; 117,9).
// Parts : 45° (de 0° à 45°) et 70 − 45 = 25° (de 45° à 70°), à trouver « ? ».
// La vraie bissectrice (35°) n'est pas dessinée.
const piege = () => {
  const O: P = [80, 330];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un angle de 70 degrés ; Hugo trace une demi-droite à 45 degrés d'un côté ; l'autre part est à trouver">
  ${secteur(O, 300, 0, 70, C.bleu, ".12")}
  ${seg(O, vers(O, 300, 0), C.craie, 5)}${seg(O, vers(O, 300, 70), C.craie, 5)}
  ${seg(O, vers(O, 300, 45), C.jaune, 4, "10 7")}
  ${arc(O, 95, 0, 45, C.jaune)}${arc(O, 118, 45, 70, C.rose)}
  ${texte(vers(O, 132, 22.5), "45°", C.jaune, 26)}
  ${texte(vers(O, 152, 59), "?", C.rose, 30)}
  ${texte([300, 108], "Hugo", C.jaune, 22, "start")}
  ${texte([340, 50], "angle de 70°", C.craie, 24)}
  ${point(O)}${texte([56, 360], "O", C.craie, 26)}
  ${texte([240, 400], `Est-ce la bissectrice${NB}?`, C.rose, 24)}
  </svg>`;
};

// 6. Le défi : sommet O(150 ; 330). [OA) à 0°, [OD) à 30°, [OC) à 60°,
// [OB) à 120°, longueur 260 : A(410 ; 330), D(375,2 ; 200), C(280 ; 104,8),
// B(20 ; 104,8). AOC = COB = 60° (arcs doubles jaunes), AOD = DOC = 30°
// (arcs simples bleus). L'angle DOB (de 30° à 120°) est à trouver : 90°.
const defi = () => {
  const O: P = [150, 330];
  const L = 260;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un angle AOB de 120 degrés ; OC est sa bissectrice ; OD est la bissectrice de l'angle AOC ; l'angle DOB est à trouver">
  ${seg(O, vers(O, L, 0), C.craie, 5)}${seg(O, vers(O, L, 120), C.craie, 5)}
  ${seg(O, vers(O, L, 60), C.jaune, 4)}${seg(O, vers(O, L, 30), C.bleu, 4)}
  ${arc(O, 150, 3, 57, C.jaune, 3)}${arc(O, 158, 3, 57, C.jaune, 3)}
  ${arc(O, 150, 63, 117, C.jaune, 3)}${arc(O, 158, 63, 117, C.jaune, 3)}
  ${arc(O, 110, 3, 27, C.bleu, 3)}${arc(O, 110, 33, 57, C.bleu, 3)}
  ${arc(O, 60, 30, 120, C.rose, 4)}
  ${texte(vers(O, 88, 75), "?", C.rose, 30)}
  ${texte([430, 342], "A", C.craie, 28)}${texte([396, 200], "D", C.bleu, 28)}
  ${texte([296, 96], "C", C.jaune, 28)}${texte([36, 96], "B", C.craie, 28)}
  ${point(O)}${texte([150, 366], "O", C.craie, 26)}
  ${texte([340, 50], "AOB = 120°", C.craie, 24)}
  ${texte([300, 400], `Combien mesure DOB${NB}?`, C.rose, 24)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "bissectrice_angle",
  titre: "Énigmes sur la bissectrice d'un angle",
  description: "La baguette de l'éventail, le pli d'origami, le faisceau de la lampe frontale, le chemin du carrefour, le piège des 45°, le défi des deux bissectrices de suite.",
  problemes: [
    {
      tag: "Énigme 1 · L'éventail",
      titre: "La baguette du milieu ?",
      question: `L'éventail de Mei est ouvert à <b>100°</b>.<br>Une baguette part du sommet O.<br>Elle coupe l'angle en <b>40°</b> et <b>60°</b>.<br><br>Est-ce la bissectrice de l'angle ?`,
      reponse: `La bissectrice partage l'angle en deux angles ÉGAUX.<br>Ici, les deux parts font 40° et 60°.<br>40° et 60°, ce n'est pas pareil.<br>Passer par le sommet ne suffit pas.<br><span class="big">Non, les parts ne sont pas égales</span>.`,
      consigne: "Une demi-droite coupe un angle de 100° en 40° et 60°. Est-ce sa bissectrice ?",
      verification: { type: "qcm", choix: ["Non : les deux parts ne sont pas égales", "Oui : elle part du sommet", "Oui : elle est dans l'angle"], bonne: 0 },
      dessin: eventail(),
    },
    {
      tag: "Énigme 2 · En origami",
      titre: "Le pli coin sur coin",
      question: `Kenji a un coin de papier de <b>130°</b>.<br>Il plie la feuille par le sommet.<br>Un côté tombe pile sur l'autre.<br><br>Quel angle fait le pli avec chaque côté ?`,
      reponse: `Un côté tombe sur l'autre : le pli est la bissectrice.<br>Il coupe l'angle en deux parts égales.<br>130 ÷ 2 = 65.<br>Vérification : 65 + 65 = 130.<br>Le pli fait <span class="big">65°</span> avec chaque côté.`,
      consigne: "On plie un angle de 130° pour amener un côté sur l'autre. Quel angle fait le pli avec chaque côté ?",
      verification: { type: "qcm", choix: ["45°", "60°", "65°"], bonne: 2 },
      dessin: origami(),
    },
    {
      tag: "Énigme 3 · En spéléologie",
      titre: "Le faisceau de la lampe",
      question: `Ambre explore une grotte.<br>Sa lampe frontale éclaire comme un angle.<br>L'axe de la lampe est la bissectrice de cet angle.<br>Entre l'axe et un bord : <b>35°</b>.<br><br>Combien mesure l'angle du faisceau ?`,
      reponse: `L'axe partage l'angle en deux parts égales.<br>Chaque part fait 35°.<br>L'angle entier vaut le double d'une part.<br>35 × 2 = 70. Vérification : 70 ÷ 2 = 35.<br>Le faisceau mesure <span class="big">70°</span>.`,
      consigne: "La bissectrice d'un angle fait 35° avec chaque côté. Combien mesure l'angle entier ?",
      verification: { type: "courte", attendus: ["70"], unite: "°" },
      dessin: lampe(),
    },
    {
      tag: "Énigme 4 · Au carrefour",
      titre: "Le chemin bien au milieu",
      question: `Une route est toute droite.<br>En O, un chemin part de la route.<br>Le chemin est la bissectrice de l'angle plat.<br><br>Quel angle fait le chemin avec la route ?`,
      reponse: `La route droite forme un angle plat : 180°.<br>Le chemin le partage en deux parts égales.<br>180 ÷ 2 = 90.<br>90°, c'est un angle droit.<br>Le chemin fait <span class="big">90°</span> avec la route.`,
      consigne: "Quel angle fait la bissectrice d'un angle plat avec chacun de ses côtés ?",
      verification: { type: "qcm", choix: ["45°", "90°", "180°"], bonne: 1 },
      dessin: carrefour(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Toujours 45° ?",
      sorte: "piege",
      question: `Hugo trace un angle de <b>70°</b>.<br>Il dit : « La bissectrice fait toujours 45° ! »<br>Il trace une demi-droite à 45° d'un côté.<br><br><b>A-t-il raison ?</b> Que vaut la vraie part ?`,
      reponse: `Non ! Regarde l'autre part : 70 − 45 = 25°.<br>45° et 25° : les parts ne sont pas égales.<br>45°, c'est seulement pour un angle droit (90 ÷ 2).<br>Ici : 70 ÷ 2 = 35. Vérification : 35 + 35 = 70.<br>Chaque part fait <span class="big">35°</span>.`,
      consigne: "Un angle mesure 70°. Combien mesure chacun des deux angles faits par sa bissectrice ?",
      verification: { type: "courte", attendus: ["35"], unite: "°" },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Deux bissectrices de suite",
      sorte: "defi",
      question: `L'angle AOB mesure <b>120°</b>.<br>[OC) est la bissectrice de l'angle AOB.<br>[OD) est la bissectrice de l'angle AOC.<br><br>Combien mesure l'angle <b>DOB</b> ?`,
      reponse: `[OC) coupe 120° en deux : AOC = COB = 60°.<br>[OD) coupe 60° en deux : AOD = DOC = 30°.<br>DOB = DOC + COB = 30 + 60 = 90°.<br>Vérification : 120 − 30 = 90. Surprise : un angle droit !<br>DOB mesure <span class="big">90°</span>.`,
      consigne: "AOB = 120°, [OC) bissectrice de AOB, [OD) bissectrice de AOC. Combien mesure l'angle DOB ?",
      verification: { type: "courte", attendus: ["90"], unite: "°" },
      dessin: defi(),
    },
  ],
};

export default problemes;
