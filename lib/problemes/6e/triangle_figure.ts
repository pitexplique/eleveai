// Énigmes à projeter — 6e, notion triangle_figure (nommer un triangle, le côté
// opposé à un sommet, reconnaître un triangle selon ses côtés, puis selon ses
// angles, le piège de l'angle droit « pas en bas », le défi du vitrail). 20/11/2026.
// ⛔ Ni somme des angles (180°) ni triangle constructible : la fiche 6e
// (lib/fiches/maths-6e-triangles.tsx) les a passés à triangle_propriete.
// Phrases courtes (les 6e lisent difficilement). Angles dessinés à la bonne
// mesure (coordonnées calculées avec cos/sin, notées dans chaque fonction).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Trois étoiles : pas de longueur annoncée, pas d'échelle à tenir.
const ciel = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois étoiles V, D et A reliées en triangle dans le ciel">
  <path d="M150 110 L360 90 L260 300 Z" fill="${C.bleu}" fill-opacity=".1" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  <text x="150" y="122" font-size="34" text-anchor="middle">⭐</text>
  <text x="360" y="102" font-size="34" text-anchor="middle">⭐</text>
  <text x="260" y="312" font-size="34" text-anchor="middle">⭐</text>
  <text x="112" y="100" fill="${C.craie}" font-size="28" text-anchor="middle">V</text>
  <text x="398" y="85" fill="${C.craie}" font-size="28" text-anchor="middle">D</text>
  <text x="260" y="350" fill="${C.craie}" font-size="28" text-anchor="middle">A</text>
  <text x="60" y="250" font-size="30" text-anchor="middle">🌙</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Un autre nom${NB}?</text>
  </svg>`;

// Trois balises, pas de longueur annoncée.
const orientation = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois balises M, N et P reliées par des chemins en triangle">
  <path d="M90 300 L250 90 L400 280 Z" fill="${C.jaune}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4"/>
  <circle cx="90" cy="300" r="9" fill="${C.rose}"/>
  <circle cx="250" cy="90" r="9" fill="${C.rose}"/>
  <circle cx="400" cy="280" r="9" fill="${C.rose}"/>
  <text x="62" y="330" fill="${C.craie}" font-size="28" text-anchor="middle">M</text>
  <text x="250" y="62" fill="${C.craie}" font-size="28" text-anchor="middle">N</text>
  <text x="428" y="305" fill="${C.craie}" font-size="28" text-anchor="middle">P</text>
  <text x="245" y="240" font-size="40" text-anchor="middle">🧭</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Le côté opposé à N${NB}?</text>
  </svg>`;

// Le fanion : 6 px pour 1 cm. Base 30 cm = 180 px sur le mât (x = 100, y de 90 à 270).
// Côtés de 50 cm : hauteur √(50² − 15²) ≈ 47,7 cm ≈ 286,2 px, pointe en (386,2 ; 180).
const fanion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un fanion en triangle : 30 centimètres sur le mât, deux côtés de 50 centimètres">
  <path d="M100 50 L100 380" stroke="${C.pale}" stroke-width="6"/>
  <path d="M100 90 L386.2 180 L100 270 Z" fill="${C.rose}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <text x="86" y="188" fill="${C.bleu}" font-size="24" text-anchor="end">30 cm</text>
  <text x="252" y="118" fill="${C.bleu}" font-size="24" text-anchor="middle">50 cm</text>
  <text x="252" y="262" fill="${C.bleu}" font-size="24" text-anchor="middle">50 cm</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">Quel triangle, selon ses côtés${NB}?</text>
  </svg>`;

// Le toit du chalet : base de (90 ; 280) à (390 ; 280), sommet en (240 ; 193,4)
// car 150 × tan 30° ≈ 86,6. L'angle du haut ouvre vraiment 120°.
// Arc de rayon 40 : de (205,4 ; 213,4) à (274,6 ; 213,4).
const chalet = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le toit d'un chalet en triangle, avec un angle de 120 degrés en haut">
  <text x="400" y="80" font-size="40" text-anchor="middle">🏔️</text>
  <rect x="120" y="280" width="240" height="80" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <path d="M90 280 L240 193.4 L390 280 Z" fill="${C.rose}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <path d="M205.4 213.4 A40 40 0 0 0 274.6 213.4" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="240" y="262" fill="${C.bleu}" font-size="24" text-anchor="middle">120°</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Quel triangle, selon ses angles${NB}?</text>
  </svg>`;

// Le pliage : angle droit en R (240 ; 100), côtés à 40° de l'horizontale.
// u = (cos 40°, sin 40°), v = (−sin 40°, cos 40°) : u ⟂ v. R + 200u = (393,2 ; 228,6),
// R + 170v = (130,7 ; 230,2). Carré d'angle droit de 24 px.
const origami = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle de papier posé avec son angle droit en haut">
  <path d="M240 100 L393.2 228.6 L130.7 230.2 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M258.4 115.4 L243 133.8 L224.6 118.4" fill="none" stroke="${C.rose}" stroke-width="3"/>
  <text x="240" y="60" fill="${C.pale}" font-size="20" text-anchor="middle">angle droit en haut</text>
  <text x="240" y="300" fill="${C.craie}" font-size="22" text-anchor="middle">Noé${NB}: «${NB}Il n'est pas rectangle.</text>
  <text x="240" y="332" fill="${C.craie}" font-size="22" text-anchor="middle">L'angle droit n'est pas en bas.${NB}»</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// Le vitrail : un carré de 260 px et ses deux diagonales.
const vitrail = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un vitrail carré coupé par ses deux diagonales">
  <rect x="110" y="50" width="260" height="260" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="5"/>
  <path d="M110 50 L370 310 M370 50 L110 310" stroke="${C.craie}" stroke-width="5"/>
  <text x="240" y="370" fill="${C.pale}" font-size="20" text-anchor="middle">un carré et ses deux diagonales</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de triangles${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "triangle_figure",
  titre: "Énigmes sur les triangles",
  description: "Le triangle des étoiles, les balises de la course d'orientation, le fanion de la kermesse, le toit du chalet, le piège du pliage, le défi du vitrail.",
  problemes: [
    {
      tag: "Énigme 1 · Dans le ciel",
      titre: "Le triangle des étoiles",
      question: `Un soir d'été, Lina regarde trois étoiles.<br>Elle les appelle V, D et A.<br>Elle trace le triangle <b>VDA</b>.<br><br>Quel autre nom peut-elle lui donner ?`,
      reponse: `Un triangle se nomme avec ses <b>3 sommets</b>.<br>Chaque sommet est écrit une seule fois.<br>L'ordre des lettres ne compte pas.<br>VD : il manque un sommet. DDA : D est écrit deux fois.<br>Le triangle VDA s'appelle aussi <span class="big">DAV</span>.`,
      consigne: "Quel nom désigne aussi le triangle VDA ?",
      verification: { type: "qcm", choix: ["DAV", "VD", "DDA"], bonne: 0 },
      dessin: ciel(),
    },
    {
      tag: "Énigme 2 · En course d'orientation",
      titre: "Le chemin des balises",
      question: `Trois balises M, N et P forment un triangle.<br>Des chemins droits les relient.<br>Malik veut prendre le chemin qui <b>ne passe pas par N</b>.<br><br>Quel est le <b>côté opposé</b> au sommet N ?`,
      reponse: `Le côté opposé à un sommet ne touche pas ce sommet.<br>Les côtés [MN] et [NP] passent par N.<br>Il reste le côté [MP].<br>Le côté opposé à N est <span class="big">[MP]</span>.`,
      consigne: "Dans le triangle MNP, quel est le côté opposé au sommet N ? (écris-le comme [AB])",
      verification: { type: "courte", attendus: ["[MP]", "MP", "[PM]", "PM"] },
      dessin: orientation(),
    },
    {
      tag: "Énigme 3 · À la kermesse",
      titre: "Le fanion",
      question: `Jade découpe un fanion en triangle.<br>Le côté sur le mât mesure <b>30 cm</b>.<br>Les deux autres côtés mesurent <b>50 cm</b> chacun.<br><br>Quel triangle est-ce, <b>selon ses côtés</b> ?`,
      reponse: `On compare les trois longueurs : 30 cm, 50 cm, 50 cm.<br>Deux côtés ont la même longueur : 50 cm.<br>Le troisième est différent : il n'est pas équilatéral.<br>Le fanion est un triangle <span class="big">isocèle</span>.`,
      consigne: "Un triangle a des côtés de 30 cm, 50 cm et 50 cm. Quel triangle est-ce, selon ses côtés ?",
      verification: { type: "qcm", choix: ["Équilatéral", "Quelconque", "Isocèle"], bonne: 2 },
      dessin: fanion(),
    },
    {
      tag: "Énigme 4 · En montagne",
      titre: "Le toit du chalet",
      question: `Le toit d'un chalet forme un triangle.<br>L'angle du haut mesure <b>120°</b>.<br><br>Quel triangle est-ce, <b>selon ses angles</b> ?`,
      reponse: `Un angle droit mesure 90°.<br>120° est plus grand que 90° : c'est un angle <b>obtus</b>.<br>Un triangle qui a un angle obtus est obtusangle.<br>Le toit est un triangle <span class="big">obtusangle</span>.`,
      consigne: "Un triangle a un angle de 120°. Quel triangle est-ce, selon ses angles ? (un seul mot)",
      verification: { type: "courte", attendus: ["obtusangle", "obtus"] },
      dessin: chalet(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le pliage de Noé",
      sorte: "piege",
      question: `Noé plie une feuille. Il obtient un triangle.<br>Le triangle a un <b>angle droit</b>, en haut.<br>Noé dit : « Il n'est pas rectangle. L'angle droit n'est pas en bas. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! La place de l'angle droit ne compte pas.<br>On peut tourner la feuille : l'angle reste droit.<br>Un triangle avec un angle droit est rectangle.<br>Le pliage est un triangle <span class="big">rectangle</span>.`,
      consigne: "Un triangle a un angle droit en haut. Est-il rectangle ?",
      verification: { type: "qcm", choix: ["Oui, Noé a raison", "Non : il est rectangle", "Non : il est équilatéral"], bonne: 1 },
      dessin: origami(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vitrail",
      sorte: "defi",
      question: `Un vitrail est un <b>carré</b>.<br>Deux baguettes suivent ses <b>deux diagonales</b>.<br><br>Combien de <b>triangles</b> vois-tu en tout ?<br>Quelle est leur famille ?`,
      reponse: `D'abord les petits : 4 triangles autour du centre.<br>Puis les grands : une diagonale coupe le carré en 2 triangles.<br>Avec les 2 diagonales : 2 + 2 = 4 grands triangles.<br>4 + 4 = 8. Il y a <span class="big">8 triangles</span>.<br>Tous ont un angle droit et deux côtés égaux : ils sont rectangles et isocèles.`,
      consigne: "Un carré est coupé par ses deux diagonales. Combien de triangles vois-tu en tout ?",
      verification: { type: "courte", attendus: ["8"], unite: "triangles" },
      dessin: vitrail(),
    },
  ],
};

export default problemes;
