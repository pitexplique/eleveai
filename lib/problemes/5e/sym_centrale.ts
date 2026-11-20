// Énigmes à projeter — 5e, notion sym_centrale (construire le symétrique,
// centre de symétrie, propriétés). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Quadrillage de 40 px, centre O en (240 ; 200).
const grille = (x0: number, x1: number, y0: number, y1: number) => {
  let s = "";
  for (let x = x0; x <= x1; x += 40) s += `<path d="M${x} ${y0} L${x} ${y1}" stroke="${C.pale}" stroke-width="1"/>`;
  for (let y = y0; y <= y1; y += 40) s += `<path d="M${x0} ${y} L${x1} ${y}" stroke="${C.pale}" stroke-width="1"/>`;
  return s;
};
const point = (x: number, y: number, n: string, c: string, dx = 12, dy = -10) =>
  `<circle cx="${x}" cy="${y}" r="8" fill="${c}"/><text x="${x + dx}" y="${y + dy}" fill="${c}" font-size="26">${n}</text>`;

// A = O + (−3 ; −2) ; B, C, D = O + (3 ; −2), (−3 ; 2), (3 ; 2).
const quadrillage = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Sur un quadrillage, le point A, le centre O et trois points B, C, D">
  ${grille(40, 440, 40, 360)}
  ${point(240, 200, "O", C.craie, 12, 28)}
  ${point(120, 120, "A", C.rose)}
  ${point(360, 120, "B", C.bleu)}
  ${point(120, 280, "C", C.bleu)}
  ${point(360, 280, "D", C.bleu)}
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">le symétrique de A par rapport à O ?</text>
  </svg>`;

const mots = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois mots : MAI, SOS, ÉTÉ">
  <text x="240" y="80" fill="${C.pale}" font-size="22" text-anchor="middle">tourne la feuille d'un demi-tour…</text>
  <text x="240" y="170" fill="${C.bleu}" font-size="60" text-anchor="middle" font-family="Arial, sans-serif">MAI</text>
  <text x="240" y="260" fill="${C.jaune}" font-size="60" text-anchor="middle" font-family="Arial, sans-serif">SOS</text>
  <text x="240" y="350" fill="${C.rose}" font-size="60" text-anchor="middle" font-family="Arial, sans-serif">ÉTÉ</text>
  </svg>`;

// Segment [AB] de 6 cm (30 px par cm), centre O ; [A'B'] en pointillés.
const segment = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le segment AB de 6 cm et son symétrique par rapport au point O">
  <path d="M40 120 L220 120" stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"/>
  <text x="130" y="100" fill="${C.bleu}" font-size="24" text-anchor="middle">6 cm</text>
  <text x="30" y="110" fill="${C.bleu}" font-size="24" text-anchor="end">A</text><text x="230" y="110" fill="${C.bleu}" font-size="24">B</text>
  <path d="M40 120 L440 280 M220 120 L260 280" stroke="${C.pale}" stroke-width="2" stroke-dasharray="5 6"/>
  <circle cx="240" cy="200" r="7" fill="${C.craie}"/><text x="252" y="196" fill="${C.craie}" font-size="24">O</text>
  <path d="M260 280 L440 280" stroke="${C.rose}" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 8"/>
  <text x="450" y="310" fill="${C.rose}" font-size="24">A'</text><text x="245" y="310" fill="${C.rose}" font-size="24">B'</text>
  <text x="350" y="350" fill="${C.rose}" font-size="28" text-anchor="middle">? cm</text>
  </svg>`;

// Un parallélogramme, un triangle isocèle, un trapèze.
const figures = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois figures : un parallélogramme, un triangle isocèle et un trapèze">
  <path d="M30 260 L120 260 L150 160 L60 160 Z" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M190 260 L290 260 L240 140 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M330 260 L450 260 L420 160 L360 160 Z" fill="${C.rose}" fill-opacity=".2" stroke="${C.rose}" stroke-width="4" stroke-linejoin="round"/>
  <text x="90" y="310" fill="${C.craie}" font-size="26" text-anchor="middle">1</text>
  <text x="240" y="310" fill="${C.craie}" font-size="26" text-anchor="middle">2</text>
  <text x="390" y="310" fill="${C.craie}" font-size="26" text-anchor="middle">3</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">laquelle a un centre de symétrie ?</text>
  </svg>`;

// A, O, A' alignés : 50 px par cm, AO = 3 cm.
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le point A à 3 cm du centre O, et son symétrique A'">
  <path d="M90 210 L390 210" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 6"/>
  ${point(90, 210, "A", C.bleu, -10, -18)}
  ${point(240, 210, "O", C.craie, -8, -18)}
  ${point(390, 210, "A'", C.rose, -10, -18)}
  <path d="M90 250 L240 250" stroke="${C.bleu}" stroke-width="3"/><text x="165" y="280" fill="${C.bleu}" font-size="24" text-anchor="middle">3 cm</text>
  <path d="M90 320 L390 320" stroke="${C.rose}" stroke-width="3"/><text x="240" y="355" fill="${C.rose}" font-size="26" text-anchor="middle">AA' = ?</text>
  </svg>`;

// Repère : origine (60 ; 340), 50 px par unité. A(1 ; 2), O(3 ; 1).
const repere = () => {
  let s = "";
  for (let k = 0; k <= 7; k++) s += `<path d="M${60 + 50 * k} 90 L${60 + 50 * k} 340" stroke="${C.pale}" stroke-width="1"/>`;
  for (let k = 0; k <= 5; k++) s += `<path d="M60 ${340 - 50 * k} L410 ${340 - 50 * k}" stroke="${C.pale}" stroke-width="1"/>`;
  for (let k = 1; k <= 7; k++) s += `<text x="${60 + 50 * k}" y="368" fill="${C.craie}" font-size="18" text-anchor="middle">${k}</text>`;
  for (let k = 1; k <= 5; k++) s += `<text x="48" y="${346 - 50 * k}" fill="${C.craie}" font-size="18" text-anchor="end">${k}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère avec le point A de coordonnées 1 ; 2 et le centre O de coordonnées 3 ; 1">
  ${s}
  <path d="M60 340 L425 340 M60 340 L60 75" stroke="${C.craie}" stroke-width="3"/>
  <text x="48" y="368" fill="${C.craie}" font-size="18" text-anchor="end">0</text>
  ${point(110, 240, "A", C.bleu)}
  ${point(210, 290, "O", C.craie)}
  <text x="330" y="160" fill="${C.rose}" font-size="28" text-anchor="middle">A' ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "sym_centrale",
  titre: "Énigmes sur la symétrie centrale",
  description: "Symétrie centrale en 5e : le symétrique sur un quadrillage, les mots qui supportent un demi-tour, longueur conservée, figure à centre de symétrie, piège de la distance AA', coordonnées du symétrique. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Sur le quadrillage",
      titre: "Le bon symétrique",
      question: `On cherche le symétrique du point A par rapport au point <b>O</b>.<br><br><b>Est-ce B, C ou D ?</b>`,
      reponse: `De A à O : 3 carreaux à droite, 2 vers le bas. On continue pareil après O.<br>C'est <span class="big">D</span> : O est le milieu de [AD]. (B et C sont des symétriques par rapport à une droite.)`,
      consigne: "Quel point est le symétrique de A par rapport à O ?",
      verification: { type: "qcm", choix: ["B", "C", "D"], bonne: 2 },
      dessin: quadrillage(),
    },
    {
      tag: "Énigme 2 · Le demi-tour",
      titre: "Le mot qui ne change pas",
      question: `On fait faire un <b>demi-tour</b> à la feuille.<br><br><b>Quel mot</b> se lit encore pareil ?`,
      reponse: `S et O ont un centre de symétrie : après un demi-tour, ils restent S et O.<br>C'est <span class="big">SOS</span>. M, A, É et T se retrouvent à l'envers.`,
      consigne: "Quel mot se lit pareil après un demi-tour ?",
      verification: { type: "qcm", choix: ["MAI", "SOS", "ÉTÉ"], bonne: 1 },
      dessin: mots(),
    },
    {
      tag: "Énigme 3 · Ce qui se conserve",
      titre: "La longueur du symétrique",
      question: `Le segment [AB] mesure <b>6 cm</b>.<br>[A'B'] est son symétrique par rapport au point O.<br><br><b>Combien mesure [A'B'] ?</b>`,
      reponse: `La symétrie centrale conserve les longueurs.<br>[A'B'] mesure <span class="big">6 cm</span>. Les deux segments sont même parallèles.`,
      consigne: "Combien mesure [A'B'], en cm ?",
      verification: { type: "courte", attendus: ["6"], unite: "cm" },
      dessin: segment(),
    },
    {
      tag: "Énigme 4 · Les figures",
      titre: "Le centre de symétrie",
      question: `Voici trois figures.<br><br><b>Laquelle a un centre de symétrie ?</b>`,
      reponse: `Le parallélogramme : après un demi-tour autour du point où se croisent ses diagonales, il retombe sur lui-même.<br>C'est la <span class="big">figure 1</span>.`,
      consigne: "Quelle figure a un centre de symétrie ?",
      verification: { type: "qcm", choix: ["Figure 1", "Figure 2", "Figure 3"], bonne: 0 },
      dessin: figures(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La distance AA'",
      sorte: "piege",
      question: `Le point A est à <b>3 cm</b> du centre O.<br>A' est le symétrique de A par rapport à O.<br><br>Yanis dit : « AA' = 3 cm. » <b>A-t-il raison ?</b>`,
      reponse: `Non ! O est le <b>milieu</b> de [AA'] : OA' = 3 cm aussi.<br>AA' = 3 + 3 = <span class="big">6 cm</span>.`,
      consigne: "Combien mesure AA', en cm ?",
      verification: { type: "courte", attendus: ["6"], unite: "cm" },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les coordonnées du symétrique",
      sorte: "defi",
      question: `Dans le repère, A a pour coordonnées <b>(1 ; 2)</b> et O <b>(3 ; 1)</b>.<br><br><b>Quelles sont les coordonnées de A'</b>, symétrique de A par rapport à O ?`,
      reponse: `De A à O : +2 en abscisse, −1 en ordonnée. On recommence après O : 3 + 2 = 5 et 1 − 1 = 0.<br>A' a pour coordonnées <span class="big">(5 ; 0)</span>.`,
      consigne: "Quelles sont les coordonnées de A' ? (écris-les comme (x;y))",
      verification: { type: "courte", attendus: ["(5;0)", "5;0", "(5,0)"] },
      dessin: repere(),
    },
  ],
};

export default problemes;
