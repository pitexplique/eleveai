// Énigmes à projeter — 6e, notion distance_segment ((AB), [AB] et AB, le
// milieu d'un segment, le plus court chemin AC + CB plus grand que AB,
// l'alignement, le piège « PA = PB donc milieu », le défi des milieux emboîtés).
// 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-distance-segment.tsx) : (AB) est
// une droite, [AB] un segment, AB un nombre ; le milieu est SUR le segment et
// à égale distance des deux bouts ; un détour rallonge toujours ; AC + CB = AB
// seulement si C est sur [AB].
// Phrases courtes (les 6e lisent difficilement). Figures exactes : échelle et
// coordonnées notées dans chaque fonction.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

const point = (x: number, y: number, couleur: string = C.jaune) =>
  `<circle cx="${x}" cy="${y}" r="8" fill="${couleur}"/>`;
const lettre = (x: number, y: number, l: string, couleur: string = C.craie) =>
  `<text x="${x}" y="${y}" fill="${couleur}" font-size="30" text-anchor="middle">${l}</text>`;

// 1. La corde à linge : deux crochets A(90 ; 140) et B(390 ; 140), la corde
// tendue de A à B (elle s'arrête aux deux crochets). Pas de mesure.
// Poteaux de y = 140 à y = 330.
const linge = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une corde à linge tendue entre deux crochets A et B, avec du linge">
  <path d="M90 140 L90 330 M390 140 L390 330" stroke="${C.pale}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M90 140 L390 140" stroke="${C.bleu}" stroke-width="5" stroke-linecap="round" fill="none"/>
  ${point(90, 140)}${point(390, 140)}
  ${lettre(90, 120, "A")}${lettre(390, 120, "B")}
  <text x="180" y="195" font-size="44" text-anchor="middle">👕</text>
  <text x="300" y="190" font-size="38" text-anchor="middle">🧦</text>
  <text x="240" y="60" fill="${C.pale}" font-size="22" text-anchor="middle">la corde s'arrête en A et en B</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Son nom en maths${NB}?</text>
  </svg>`;

// 2. Le terrain de badminton : 13,40 m × 6,10 m, 30 px pour 1 m
// → 402 × 183 px. x de 39 à 441, y de 110 à 293. Filet au milieu : x = 240.
// Flèche « ? » de x = 39 à x = 240 (en haut), flèche 13,40 m de 39 à 441 (en bas).
const badminton = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain de badminton de 13,40 mètres de long, le filet au milieu">
  <rect x="39" y="110" width="402" height="183" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <path d="M240 98 L240 305" stroke="${C.pale}" stroke-width="6" stroke-dasharray="6 5" fill="none"/>
  <text x="252" y="140" fill="${C.pale}" font-size="20" text-anchor="start">filet</text>
  <text x="340" y="215" font-size="40" text-anchor="middle">🏸</text>
  <path d="M39 75 L240 75 M39 66 L39 84 M240 66 L240 84" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="140" y="62" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <path d="M39 325 L441 325 M39 316 L39 334 M441 316 L441 334" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <text x="240" y="360" fill="${C.craie}" font-size="24" text-anchor="middle">13,40 m</text>
  <text x="240" y="402" fill="${C.rose}" font-size="24" text-anchor="middle">Du fond au filet${NB}?</text>
  </svg>`;

// 3. Les villages : AC = 5 km, CB = 7 km, AB = 9 km, 30 px pour 1 km.
// A(105 ; 300), B(375 ; 300) : AB = 270 px. C : à 57 ÷ 18 ≈ 3,17 km de A en
// horizontal (95 px), hauteur √(25 − 10,03) ≈ 3,87 km (116 px) → C(200 ; 184).
// Contrôle : AC ≈ 149,9 px (5 km), CB ≈ 209,9 px (7 km).
const pigeon = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois villages A, C et B : la route va de A à C puis de C à B, le vol tout droit de A à B est à trouver">
  <path d="M105 300 L200 184 L375 300" stroke="${C.craie}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
  <path d="M105 300 L375 300" stroke="${C.bleu}" stroke-width="4" stroke-dasharray="10 8" fill="none"/>
  ${point(105, 300)}${point(375, 300)}${point(200, 184)}
  ${lettre(80, 312, "A")}${lettre(402, 312, "B")}${lettre(200, 166, "C")}
  <text x="140" y="232" fill="${C.craie}" font-size="24" text-anchor="end">5 km</text>
  <text x="300" y="228" fill="${C.craie}" font-size="24" text-anchor="start">7 km</text>
  <text x="240" y="340" fill="${C.bleu}" font-size="28" text-anchor="middle">?</text>
  <text x="400" y="110" font-size="44" text-anchor="middle">🐦</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">Le vol tout droit de A à B${NB}?</text>
  </svg>`;

// 4. Les bouées : A(70 ; 280) et B(410 ; 280) ; la bouée C est cachée dans le
// brouillard (ellipse de centre (240 ; 272), posée SUR la ligne [AB] pour ne
// rien suggérer). On ne dessine pas C : sa place
// est la question. Les mesures sont écrites en haut.
const kayak = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux bouées A et B, la bouée C cachée dans le brouillard ; AC 120 mètres, CB 180 mètres, AB 300 mètres">
  <path d="M30 340 Q60 328 90 340 T150 340 T210 340 T270 340 T330 340 T390 340 T450 340" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="M70 280 L410 280" stroke="${C.pale}" stroke-width="3" stroke-dasharray="8 7" fill="none"/>
  ${point(70, 280, C.rose)}${point(410, 280, C.rose)}
  ${lettre(70, 316, "A")}${lettre(410, 316, "B")}
  <ellipse cx="240" cy="272" rx="120" ry="58" fill="${C.pale}" fill-opacity=".45"/>
  <text x="240" y="262" fill="${C.craie}" font-size="28" text-anchor="middle">C${NB}?</text>
  <text x="70" y="250" font-size="36" text-anchor="middle">🛶</text>
  <text x="240" y="50" fill="${C.craie}" font-size="24" text-anchor="middle">AC = 120 m   CB = 180 m</text>
  <text x="240" y="88" fill="${C.craie}" font-size="24" text-anchor="middle">AB = 300 m</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">C est-elle sur [AB]${NB}?</text>
  </svg>`;

// 5. Théo et les deux arbres : 40 px pour 1 m. A(80 ; 260), B(400 ; 260) :
// AB = 320 px = 8 m. Théo en P(240 ; 140) : PA = PB = √(160² + 120²) = 200 px
// = 5 m (triangle 3-4-5 : 4 m en horizontal, 3 m en hauteur).
const arbres = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux arbres A et B à 8 mètres l'un de l'autre ; Théo est à 5 mètres de chacun, au-dessus du segment">
  <path d="M80 260 L400 260" stroke="${C.craie}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M80 260 L240 140 L400 260" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="9 7" fill="none"/>
  ${point(80, 260, C.craie)}${point(400, 260, C.craie)}${point(240, 140, C.rose)}
  <text x="80" y="230" font-size="36" text-anchor="middle">🌳</text>
  <text x="400" y="230" font-size="36" text-anchor="middle">🌳</text>
  ${lettre(56, 272, "A")}${lettre(426, 272, "B")}
  <text x="240" y="118" fill="${C.rose}" font-size="26" text-anchor="middle">Théo</text>
  <text x="150" y="186" fill="${C.bleu}" font-size="24" text-anchor="end">5 m</text>
  <text x="330" y="186" fill="${C.bleu}" font-size="24" text-anchor="start">5 m</text>
  <text x="240" y="295" fill="${C.craie}" font-size="24" text-anchor="middle">8 m</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Est-il au milieu de [AB]${NB}?</text>
  </svg>`;

// 6. Le ruban : AB = 32 m, 12 px pour 1 m → 384 px. A x = 48, M x = 240
// (16 m), N x = 336 (24 m), P x = 384 (28 m), B x = 432 (32 m). Ligne y = 200.
const ruban = () => {
  const pts: [number, string][] = [[48, "A"], [240, "M"], [336, "N"], [384, "P"], [432, "B"]];
  const marques = pts
    .map(([x, l]) => `<path d="M${x} 186 L${x} 214" stroke="${C.craie}" stroke-width="4" fill="none"/>${lettre(x, 250, l, l === "P" ? C.rose : C.craie)}`)
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un ruban AB de 32 mètres ; M milieu de AB, N milieu de MB, P milieu de NB">
  <path d="M48 200 L432 200" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" fill="none"/>
  ${marques}
  <path d="M48 300 L432 300 M48 291 L48 309 M432 291 L432 309" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <text x="240" y="335" fill="${C.craie}" font-size="24" text-anchor="middle">32 m</text>
  <path d="M48 140 L384 140 M48 131 L48 149 M384 131 L384 149" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="216" y="125" fill="${C.rose}" font-size="26" text-anchor="middle">AP${NB}= ?</text>
  <text x="240" y="60" fill="${C.pale}" font-size="20" text-anchor="middle">M, N, P${NB}: trois milieux l'un dans l'autre</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "distance_segment",
  titre: "Énigmes sur les distances et le milieu d'un segment",
  description: "La corde à linge, le filet de badminton, le vol du pigeon, les bouées du kayak, le piège de Théo entre deux arbres, le défi des milieux emboîtés.",
  problemes: [
    {
      tag: "Énigme 1 · Sur le balcon",
      titre: "La corde à linge",
      question: `Nina tend une corde à linge.<br>Elle va du crochet <b>A</b> au crochet <b>B</b>.<br>Elle s'arrête en A et en B.<br><br>Comment s'appelle la corde, en maths ?`,
      reponse: `Une droite ne s'arrête jamais : ce n'est pas (AB).<br>AB sans rien, c'est une longueur : un nombre.<br>La corde est un dessin qui s'arrête en A et en B.<br>C'est <span class="big">le segment [AB]</span>.`,
      consigne: "Une corde tendue s'arrête en A et en B. Comment l'appelle-t-on en maths ?",
      verification: { type: "qcm", choix: ["La droite (AB)", "La longueur AB", "Le segment [AB]"], bonne: 2 },
      dessin: linge(),
    },
    {
      tag: "Énigme 2 · Au badminton",
      titre: "Le filet de badminton",
      question: `Un terrain de badminton mesure <b>13,40 m</b> de long.<br>Le filet est pile <b>au milieu</b>.<br>Malik sert depuis le fond du terrain.<br><br>À quelle distance du filet est le fond ?`,
      reponse: `Le milieu partage la longueur en deux parts égales.<br>13,40 ÷ 2 = 6,70.<br>Vérification : 6,70 + 6,70 = 13,40.<br>Le fond est à <span class="big">6,70 m</span> du filet.`,
      consigne: "Un terrain de 13,40 m a son filet au milieu. À quelle distance du filet est le fond ?",
      verification: { type: "courte", attendus: ["6,70", "6,7", "6.70", "6.7"], unite: "m" },
      dessin: badminton(),
    },
    {
      tag: "Énigme 3 · Au pigeonnier",
      titre: "Le vol du pigeon",
      question: `Paul va du village <b>A</b> au village <b>B</b>.<br>La route passe par C, et elle tourne en C.<br>AC = <b>5 km</b> et CB = <b>7 km</b>.<br>Son pigeon vole tout droit de A à B.<br><br>Quelle distance peut-il voler ?`,
      reponse: `Par la route : 5 + 7 = 12 km.<br>Tout droit, c'est le plus court chemin.<br>La route tourne en C : elle fait un détour.<br>Le vol fait donc moins de 12 km.<br>Seule réponse possible : <span class="big">9 km</span>.`,
      consigne: "AC = 5 km et CB = 7 km, et C n'est pas sur [AB]. Quelle peut être la distance AB ?",
      verification: { type: "qcm", choix: ["9 km", "12 km", "13 km"], bonne: 0 },
      dessin: pigeon(),
    },
    {
      tag: "Énigme 4 · En kayak",
      titre: "Les trois bouées",
      question: `Inès fait du kayak entre trois bouées.<br>De A à C : <b>120 m</b>. De C à B : <b>180 m</b>.<br>De A à B tout droit : <b>300 m</b>.<br>La bouée C est cachée dans le brouillard.<br><br>Est-elle sur le segment [AB] ?`,
      reponse: `On additionne : AC + CB = 120 + 180 = 300 m.<br>On compare : 300 m, c'est pile AB.<br>Pas de détour : A, C et B sont alignés.<br><span class="big">Oui, C est sur [AB]</span>.`,
      consigne: "AC = 120 m, CB = 180 m et AB = 300 m. Le point C est-il sur le segment [AB] ?",
      verification: { type: "qcm", choix: ["Non, C fait un détour", "Oui, C est sur [AB]", "On ne peut pas savoir"], bonne: 1 },
      dessin: kayak(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Théo entre deux arbres",
      sorte: "piege",
      question: `Deux arbres A et B sont à <b>8 m</b> l'un de l'autre.<br>Théo est à <b>5 m</b> de A et à <b>5 m</b> de B.<br>Il dit : « Je suis au milieu de [AB] ! »<br><br><b>A-t-il raison ?</b> Où est le vrai milieu ?`,
      reponse: `Non ! Le milieu doit aussi être SUR le segment.<br>Par Théo : 5 + 5 = 10 m. C'est plus que 8 m : un détour.<br>Théo n'est donc pas sur [AB].<br>Le vrai milieu M est sur [AB] : 8 ÷ 2 = 4.<br>M est à <span class="big">4 m de A</span> (et 4 m de B).`,
      consigne: "A et B sont à 8 m l'un de l'autre. À combien de mètres de A est le milieu M de [AB] ?",
      verification: { type: "courte", attendus: ["4"], unite: "m" },
      dessin: arbres(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les milieux emboîtés",
      sorte: "defi",
      question: `Jade tend un ruban [AB] de <b>32 m</b>.<br>M est le milieu de [AB].<br>N est le milieu de [MB].<br>P est le milieu de [NB].<br><br>Combien mesure <b>AP</b> ?`,
      reponse: `M milieu de [AB] : AM = MB = 32 ÷ 2 = 16 m.<br>N milieu de [MB] : MN = NB = 16 ÷ 2 = 8 m.<br>P milieu de [NB] : NP = PB = 8 ÷ 2 = 4 m.<br>AP = 16 + 8 + 4 = 28 m. Vérification : 32 − 4 = 28.<br>AP mesure <span class="big">28 m</span>.`,
      consigne: "AB = 32 m. M est le milieu de [AB], N celui de [MB], P celui de [NB]. Combien mesure AP ?",
      verification: { type: "courte", attendus: ["28"], unite: "m" },
      dessin: ruban(),
    },
  ],
};

export default problemes;
