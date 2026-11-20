// Énigmes à projeter — 4e, notion aire_perimetre (l'affiche à encadrer :
// rectangle avec deux unités, le plateau d'échecs : du nombre de cases au
// côté du carré, le panneau « Danger » : du périmètre au côté d'un triangle
// équilatéral, la fenêtre du château : figure composée avec un demi-cercle,
// piège de la photocopieuse : longueurs × 2 donne périmètre × 2, pas × 4,
// défi du temple en escalier : les marches se « replient » sur la base).
// Figures au bon rapport : affiche 250 px/m (300 × 200), case 28 px,
// panneau équilatéral de 240 px, fenêtre 120 px/m, plans 10 px/cm,
// temple 20 px/m (base 320 px, hauteur 160 px). Pas de La Réunion. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// L'affiche : 1,2 m × 0,8 m à 250 px/m → 300 × 200 px.
const affiche = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une affiche rectangulaire de 1,2 mètre sur 80 centimètres, entourée d'une baguette de bois">
  <rect x="90" y="110" width="300" height="200" fill="none" stroke="${C.jaune}" stroke-width="10"/>
  <circle cx="320" cy="160" r="24" fill="${C.jaune}" fill-opacity=".35"/>
  <path d="M100 300 L180 200 L240 260 L290 215 L380 300" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  ${txt(240, 92, "1,2 m", C.craie, 24)}
  ${txt(76, 218, "80 cm", C.craie, 24, "end")}
  ${txt(240, 362, `baguette =${NB}? m`, C.rose, 24)}
  <text x="430" y="62" font-size="36" text-anchor="middle">🖼️</text>
  </svg>`;

// Le plateau d'échecs : 8 × 8 cases de 28 px → 224 px.
const echiquier = () => {
  let s = "";
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if ((i + j) % 2 === 1)
        s += `<rect x="${128 + 28 * j}" y="${90 + 28 * i}" width="28" height="28" fill="${C.pale}" fill-opacity=".45"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un plateau d'échecs carré de 64 cases ; chaque case mesure 4,5 centimètres de côté">
  ${txt(240, 62, "64 cases", C.pale, 22)}
  ${s}
  <rect x="128" y="90" width="224" height="224" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <rect x="128" y="90" width="28" height="28" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(240, 356, `1 case${NB}: 4,5 cm`, C.bleu, 24)}
  ${txt(240, 396, `ruban =${NB}? cm`, C.rose, 24)}
  </svg>`;
};

// Le panneau : triangle équilatéral de côté 240 px, hauteur 240 × √3 ÷ 2 ≈ 207,8 px.
const panneau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un panneau Danger en forme de triangle équilatéral ; la bande réfléchissante fait tout le tour, 2,7 mètres">
  ${txt(240, 60, `tour${NB}: 2,7 m`, C.bleu, 24)}
  <path d="M120 330 L360 330 L240 122.2 Z" stroke="${C.rose}" stroke-width="10" stroke-linejoin="round" fill="none"/>
  <text x="240" y="300" fill="${C.craie}" font-size="90" text-anchor="middle">!</text>
  <path d="M240 320 L240 340 M173.1 222.1 L186.9 230.1 M293.1 230.1 L306.9 222.1" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(240, 372, `côté =${NB}? cm`, C.rose, 24)}
  ${txt(240, 400, "triangle équilatéral", C.pale, 20)}
  </svg>`;

// La fenêtre, 120 px/m : 1 m → 120 px, 1,5 m → 180 px, rayon 0,5 m → 60 px.
const fenetre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une fenêtre de château : un rectangle de 1 mètre de large et 1,5 mètre de haut, surmonté d'un demi-cercle">
  <path d="M180 360 L180 180 A60 60 0 0 1 300 180 L300 360 Z" stroke="${C.craie}" stroke-width="4" fill="none"/>
  <path d="M180 180 L300 180" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  ${txt(240, 392, "1 m", C.craie, 22)}
  ${txt(168, 278, "1,5 m", C.craie, 22, "end")}
  ${txt(310, 128, "demi-cercle", C.pale, 20, "start")}
  ${txt(390, 262, "joint", C.rose, 24)}
  ${txt(390, 292, `=${NB}? m`, C.rose, 24)}
  <text x="70" y="80" font-size="40" text-anchor="middle">🏰</text>
  </svg>`;

// Les plans, 10 px/cm : petit 10 × 7 cm → 100 × 70 px, grand 20 × 14 cm → 200 × 140 px.
const photocopie = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le plan d'un jardin, rectangle de 10 centimètres sur 7, et son agrandissement où toutes les longueurs sont multipliées par 2 ; Sacha annonce 136 centimètres">
  <rect x="70" y="170" width="100" height="70" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  ${txt(120, 160, "10 cm", C.craie, 20)}
  ${txt(62, 212, "7 cm", C.craie, 20, "end")}
  ${txt(120, 270, "P = 34 cm", C.bleu, 20)}
  <path d="M182 205 L228 205 M218 197 L228 205 L218 213" stroke="${C.pale}" stroke-width="3" fill="none"/>
  ${txt(205, 190, "× 2", C.pale, 20)}
  <rect x="240" y="135" width="200" height="140" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  ${txt(340, 212, `P =${NB}?`, C.bleu, 24)}
  ${txt(240, 80, "toutes les longueurs × 2", C.pale, 22)}
  <rect x="80" y="328" width="320" height="50" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 361, `Sacha${NB}: «${NB}136 cm${NB}»`, C.rose, 24)}
  </svg>`;

// Le temple, 20 px/m : base 16 m → 320 px, hauteur 8 m → 160 px, marches de 2 m (40 px).
// Dessus des marches : 30 + 40 + 30 + 120 + 30 + 30 + 40 = 320 px = la base.
const temple = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le profil d'un temple en escalier : quatre marches de chaque côté, de tailles différentes ; la base mesure 16 mètres et la hauteur 8 mètres">
  ${txt(240, 60, `guirlande =${NB}? m`, C.rose, 24)}
  ${txt(240, 150, "marches de tailles différentes", C.pale, 20)}
  <polygon points="80,360 80,320 110,320 110,280 150,280 150,240 180,240 180,200 300,200 300,240 330,240 330,280 360,280 360,320 400,320 400,360" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <path d="M425 200 L425 360 M417 200 L433 200 M417 360 L433 360" stroke="${C.bleu}" stroke-width="2" fill="none"/>
  ${txt(436, 288, "8 m", C.bleu, 22, "start")}
  ${txt(240, 394, "16 m", C.craie, 22)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "aire_perimetre",
  titre: "Énigmes sur les périmètres",
  description: "L'affiche à encadrer, le plateau d'échecs, le panneau Danger, la fenêtre du château, le piège de la photocopieuse, le défi du temple en escalier : périmètres du rectangle, du carré, du triangle, d'une figure avec un demi-cercle, et agrandissement.",
  problemes: [
    {
      tag: "Énigme 1 · Chez l'encadreur",
      titre: "La baguette de l'affiche",
      question: `Inès encadre une affiche de <b>1,2 m</b> sur <b>80 cm</b>.<br>Une baguette de bois fait tout le tour de l'affiche.<br><br>Quelle longueur de baguette faut-il, en mètres ?`,
      reponse: `On met tout dans la même unité : 80 cm = 0,8 m.<br>Périmètre d'un rectangle : 2 × (L + l).<br>2 × (1,2 + 0,8) = 2 × 2 = 4.<br>Il faut <span class="big">4 m</span> de baguette.<br>Contrôle en centimètres : 2 × (120 + 80) = 400 cm = 4 m.<br>⚠ 2 × (1,2 + 80) = 162,4 mélange des mètres et des centimètres.`,
      consigne: "Quelle longueur de baguette faut-il, en mètres ?",
      verification: { type: "courte", attendus: ["4"], unite: "m" },
      dessin: affiche(),
    },
    {
      tag: "Énigme 2 · Au club d'échecs",
      titre: "Le ruban du plateau",
      question: `Le plateau d'échecs est un <b>carré</b> de <b>64 cases</b>.<br>Chaque case est un carré de <b>4,5 cm</b> de côté.<br>Léon colle un ruban sur tout le bord du plateau.<br><br>Quelle est la longueur du ruban ?`,
      reponse: `64 cases rangées en carré : 8 rangées de 8, car 8 × 8 = 64.<br>Un côté du plateau : 8 × 4,5 = 36 cm.<br>Périmètre du carré : 4 × 36 = 144.<br>Le ruban mesure <span class="big">144 cm</span>.<br>⚠ 64 × 4,5 = 288 compte toutes les cases, même celles du milieu.<br>⚠ Les 28 cases du bord donnent 126 cm : on oublie que chaque coin compte deux côtés.`,
      consigne: "Quelle est la longueur du ruban ?",
      verification: { type: "qcm", choix: ["126 cm", "144 cm", "288 cm"], bonne: 1 },
      dessin: echiquier(),
    },
    {
      tag: "Énigme 3 · Sur la route",
      titre: "Le panneau Danger",
      question: `Un panneau « Danger » est un <b>triangle équilatéral</b>.<br>Une bande réfléchissante fait tout le tour : elle mesure <b>2,7 m</b>.<br><br>Combien mesure un côté du panneau ?`,
      reponse: `Équilatéral : les trois côtés ont la même longueur.<br>Le périmètre vaut donc 3 fois le côté.<br>Côté : 2,7 ÷ 3 = 0,9 m, c'est-à-dire 90 cm.<br>Le côté mesure <span class="big">90 cm</span>.<br>Contrôle : 90 + 90 + 90 = 270 cm = 2,7 m.<br>⚠ 1,35 m, c'est 2,7 ÷ 2 : un triangle a trois côtés, pas deux.<br>⚠ 0,9 m ne fait pas 9 cm, car 1 m = 100 cm.`,
      consigne: "Combien mesure un côté du panneau ?",
      verification: { type: "qcm", choix: ["90 cm", "9 cm", "1,35 m"], bonne: 0 },
      dessin: panneau(),
    },
    {
      tag: "Énigme 4 · Au château",
      titre: "Le joint de la fenêtre",
      question: `La fenêtre de la tour a un haut arrondi.<br>C'est un rectangle de <b>1 m</b> de large et <b>1,5 m</b> de haut, surmonté d'un <b>demi-cercle</b>.<br>On pose un joint sur tout le contour.<br><br>Quelle longueur de joint faut-il ? Arrondis au centimètre.`,
      reponse: `Le contour : le bas, les deux côtés et l'arc du haut.<br>Le trait en pointillés est à l'intérieur : il ne compte pas.<br>Parties droites : 1 + 1,5 + 1,5 = 4 m.<br>Le cercle entier aurait 1 m de diamètre : π × 1 ≈ 3,14 m.<br>Le demi-cercle : π ÷ 2 ≈ 1,57 m.<br>Total : 4 + 1,57 = 5,57.<br>Il faut environ <span class="big">5,57 m</span> de joint.`,
      consigne: "Quelle longueur de joint faut-il, en mètres, arrondie au centimètre ?",
      verification: { type: "courte", attendus: ["5,57", "5,571", "5,5708", "5,6"], unite: "m" },
      dessin: fenetre(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La photocopieuse",
      sorte: "piege",
      question: `Sacha agrandit le plan de son jardin à la photocopieuse.<br>Toutes les longueurs sont multipliées par 2.<br>Le petit plan a un périmètre de <b>34 cm</b>.<br>Sacha dit : « L'aire est multipliée par 4, donc le périmètre aussi : 136 cm. »<br><br><b>Quel est le vrai périmètre du grand plan ?</b>`,
      reponse: `Sacha s'est trompé ! Le périmètre est une somme de longueurs.<br>Chaque côté double, donc la somme double aussi.<br>34 × 2 = 68.<br>Le grand plan a un périmètre de <span class="big">68 cm</span>.<br>Contrôle : le grand plan mesure 20 cm sur 14 cm. 2 × (20 + 14) = 68 cm.<br>C'est l'aire qui est multipliée par 4 : 70 cm² devient 280 cm².`,
      consigne: "Quel est le périmètre du grand plan ?",
      verification: { type: "qcm", choix: ["136 cm", "34 cm", "68 cm"], bonne: 2 },
      dessin: photocopie(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le temple en escalier",
      sorte: "defi",
      question: `Un temple ancien a un profil en escalier, avec des marches de tailles différentes.<br>On connaît seulement deux mesures : la base fait <b>16 m</b> et la hauteur <b>8 m</b>.<br>Pour un spectacle, une guirlande suit tout le contour, base comprise.<br><br>Quelle longueur de guirlande faut-il ?`,
      reponse: `On range les morceaux du contour en deux familles.<br>Les morceaux horizontaux du haut : glissés vers le haut, ils couvrent toute la base, 16 m.<br>Les morceaux verticaux : on monte 8 m à gauche, on redescend 8 m à droite, soit 16 m.<br>On ajoute la base : 16 m.<br>16 + 16 + 16 = 48.<br>Il faut <span class="big">48 m</span> de guirlande.<br>La taille des marches ne change rien : c'est le périmètre d'un rectangle de 16 m sur 8 m.`,
      consigne: "Quelle longueur de guirlande faut-il, en mètres ?",
      verification: { type: "courte", attendus: ["48"], unite: "m" },
      dessin: temple(),
    },
  ],
};

export default problemes;
