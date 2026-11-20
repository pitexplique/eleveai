// Énigmes à projeter — 6e, notion sym_axiale (reconnaître une symétrie, l'image
// d'un point à la même distance, les longueurs conservées, les axes d'une
// figure, le piège des diagonales du rectangle, le défi du motif en pixels avec
// des carreaux sur l'axe). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-symetrie.tsx) : même distance de
// l'axe, l'image garde longueurs, angles et aires ; carré 4 axes, rectangle 2.
// Phrases courtes (les 6e lisent difficilement). Figures exactes : coordonnées
// calculées (notées dans chaque fonction).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Trois panneaux de 160 px, axe pointillé au milieu de chacun (cx = 80, 240, 400).
// Drapeau de gauche : mât x = cx − 25 (y 120 → 260), pointe en (cx − 70 ; 150).
// A : le drapeau a glissé (mât cx + 70, pointe vers la gauche en cx + 25).
// B : le vrai reflet (mât cx + 25, pointe en cx + 70).
// C : retourné tête en bas (demi-tour autour de (cx ; 190)).
const drapeau = (mat: number, haut: number, bas: number, y1: number, y2: number, pointe: number, yp: number, couleur: string) =>
  `<path d="M${mat} ${haut} L${mat} ${bas}" stroke="${C.craie}" stroke-width="4"/>
  <path d="M${mat} ${y1} L${mat} ${y2} L${pointe} ${yp} Z" fill="${couleur}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>`;
const panneaux = () => {
  const p = (cx: number, lettre: string, image: string) =>
    `<path d="M${cx} 90 L${cx} 300" stroke="${C.rose}" stroke-width="3" stroke-dasharray="10 7"/>
  ${drapeau(cx - 25, 120, 260, 120, 180, cx - 70, 150, C.jaune)}
  ${image}
  <text x="${cx}" y="345" fill="${C.craie}" font-size="30" text-anchor="middle">${lettre}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois dessins A, B et C : à chaque fois un drapeau, un axe en pointillés et un autre drapeau de l'autre côté">
  <path d="M160 70 L160 360 M320 70 L320 360" stroke="${C.pale}" stroke-width="2"/>
  ${p(80, "A", drapeau(150, 120, 260, 120, 180, 105, 150, C.bleu))}
  ${p(240, "B", drapeau(265, 120, 260, 120, 180, 310, 150, C.bleu))}
  ${p(400, "C", drapeau(425, 120, 260, 260, 200, 470, 230, C.bleu))}
  <text x="240" y="45" fill="${C.pale}" font-size="20" text-anchor="middle">l'axe en pointillés</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Lequel est un reflet${NB}?</text>
  </svg>`;
};

// L'étang : carreaux de 30 px, x de 90 à 390, y de 40 à 370. L'eau (l'axe) en
// y = 220. L'oiseau en (240 ; 70) : 150 px = 5 carreaux au-dessus. Pas de reflet dessiné.
const etang = () => {
  let g = "";
  for (let x = 90; x <= 390; x += 30) g += `M${x} 40 L${x} 370 `;
  for (let y = 40; y <= 370; y += 30) g += `M90 ${y} L390 ${y} `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un quadrillage : un oiseau à 5 carreaux au-dessus de la surface de l'eau">
  <rect x="90" y="220" width="300" height="150" fill="${C.bleu}" fill-opacity=".15"/>
  <path d="${g}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".6"/>
  <path d="M70 220 L410 220" stroke="${C.bleu}" stroke-width="5"/>
  <text x="440" y="228" fill="${C.bleu}" font-size="22" text-anchor="middle">eau</text>
  <circle cx="240" cy="70" r="8" fill="${C.rose}"/>
  <text x="290" y="82" font-size="36" text-anchor="middle">🐦</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">Où est son reflet${NB}?</text>
  </svg>`;
};

// Le cerf-volant : 5 px pour 1 cm, axe x = 240. T (240 ; 50), G (120 ; 140),
// D (360 ; 140), B (240 ; 330,3). TG = √(120² + 90²) = 150 px = 30 cm.
// GB = √(120² + 190,3²) ≈ 225 px = 45 cm.
const cerfVolant = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un cerf-volant symétrique : à gauche, un côté de 30 centimètres et un côté de 45 centimètres">
  <path d="M240 30 L240 355" stroke="${C.rose}" stroke-width="3" stroke-dasharray="10 7"/>
  <path d="M240 50 L120 140 L240 330.3 L360 140 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <text x="168" y="85" fill="${C.bleu}" font-size="24" text-anchor="end">30 cm</text>
  <text x="165" y="255" fill="${C.bleu}" font-size="24" text-anchor="end">45 cm</text>
  <text x="315" y="85" fill="${C.bleu}" font-size="26" text-anchor="start">?</text>
  <text x="318" y="255" fill="${C.bleu}" font-size="26" text-anchor="start">?</text>
  <text x="252" y="345" fill="${C.rose}" font-size="20" text-anchor="start">axe</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Son périmètre${NB}?</text>
  </svg>`;

// L'étoile de mer : 5 bras réguliers, centre (240 ; 195), pointes à 150 px,
// creux à 65 px, tous les 36° (cos/sin). Aucun axe dessiné.
const etoile = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une étoile de mer à cinq bras égaux">
  <path d="M240.0 45.0 L278.2 142.4 L382.7 148.6 L301.8 215.1 L328.2 316.4 L240.0 260.0 L151.8 316.4 L178.2 215.1 L97.3 148.6 L201.8 142.4 Z" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="240" cy="195" r="6" fill="${C.craie}"/>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'axes${NB}?</text>
  </svg>`;

// La table de ping-pong : un rectangle de 300 × 180 px. En pointillés, les
// 4 droites de Tom : les 2 médianes et les 2 diagonales.
const pingPong = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une table rectangulaire avec, en pointillés, ses deux médianes et ses deux diagonales">
  <rect x="90" y="60" width="300" height="180" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="5"/>
  <path d="M240 60 L240 240 M90 150 L390 150 M90 60 L390 240 M390 60 L90 240" stroke="${C.rose}" stroke-width="3" stroke-dasharray="10 7"/>
  <text x="420" y="60" font-size="34" text-anchor="middle">🏓</text>
  <text x="240" y="300" fill="${C.craie}" font-size="24" text-anchor="middle">Tom${NB}: «${NB}4 axes de symétrie${NB}!${NB}»</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// Le motif en pixels : carreaux de 40 px, x de 100 à 380, y de 60 à 300.
// L'axe x = 240 passe au MILIEU de la colonne 220 → 260.
// Sur l'axe : 3 carreaux (y 100, 140, 180). À gauche : 4 carreaux,
// (180 ; 140), (180 ; 180), (180 ; 220), (140 ; 220).
const pixels = () => {
  let g = "";
  for (let x = 100; x <= 380; x += 40) g += `M${x} 60 L${x} 300 `;
  for (let y = 60; y <= 300; y += 40) g += `M100 ${y} L380 ${y} `;
  const c = (x: number, y: number) => `<rect x="${x}" y="${y}" width="40" height="40" fill="${C.jaune}" fill-opacity=".55"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un quadrillage : trois carreaux coloriés sur l'axe, coupés en deux par lui, et quatre carreaux coloriés à gauche">
  ${c(220, 100)}${c(220, 140)}${c(220, 180)}
  ${c(180, 140)}${c(180, 180)}${c(180, 220)}${c(140, 220)}
  <path d="${g}" stroke="${C.pale}" stroke-width="1.5"/>
  <path d="M240 35 L240 325" stroke="${C.rose}" stroke-width="4" stroke-dasharray="10 7"/>
  <text x="240" y="28" fill="${C.rose}" font-size="20" text-anchor="middle">axe</text>
  <text x="240" y="360" fill="${C.pale}" font-size="20" text-anchor="middle">la moitié droite est à compléter</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de carreaux en tout${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "sym_axiale",
  titre: "Énigmes sur la symétrie axiale",
  description: "Les drapeaux du carnaval, l'oiseau de l'étang, le cerf-volant, l'étoile de mer, le piège de la table de ping-pong, le défi du motif en pixels.",
  problemes: [
    {
      tag: "Énigme 1 · Au carnaval",
      titre: "Les drapeaux du carnaval",
      question: `Ana décore un char de carnaval.<br>Elle colle un drapeau de chaque côté d'un ruban.<br>Le ruban est l'axe en pointillés.<br><br>Dans quel dessin les drapeaux sont-ils <b>symétriques</b> ?`,
      reponse: `On plie en pensée le long de l'axe.<br>En A, le drapeau a glissé : il n'est pas retourné.<br>En C, il est tête en bas : le pli ne le superpose pas.<br>En B, il est retourné comme dans un miroir.<br>Les drapeaux symétriques sont en <span class="big">B</span>.`,
      consigne: "Dans quel dessin les deux drapeaux sont-ils symétriques par rapport à l'axe ?",
      verification: { type: "qcm", choix: ["Le dessin A", "Le dessin B", "Le dessin C"], bonne: 1 },
      dessin: panneaux(),
    },
    {
      tag: "Énigme 2 · À l'étang",
      titre: "L'oiseau et son reflet",
      question: `Un oiseau vole au-dessus d'un étang.<br>Il est à <b>5 carreaux</b> au-dessus de l'eau.<br>L'eau fait miroir : elle est l'axe de symétrie.<br><br>Combien de carreaux séparent l'oiseau de son <b>reflet</b> ?`,
      reponse: `Le reflet est de l'autre côté de l'axe.<br>Il est à la même distance : 5 carreaux sous l'eau.<br>De l'oiseau à l'eau : 5 carreaux. De l'eau au reflet : 5 carreaux.<br>5 + 5 = 10. Il y a <span class="big">10 carreaux</span>.`,
      consigne: "Un point est à 5 carreaux d'un axe. Combien de carreaux le séparent de son image ?",
      verification: { type: "courte", attendus: ["10"], unite: "carreaux" },
      dessin: etang(),
    },
    {
      tag: "Énigme 3 · Au parc",
      titre: "Le cerf-volant",
      question: `Le cerf-volant de Yanis a un axe de symétrie.<br>À gauche, un côté mesure <b>30 cm</b>.<br>L'autre côté de gauche mesure <b>45 cm</b>.<br><br>Quel est le <b>périmètre</b> du cerf-volant ?`,
      reponse: `La symétrie garde les longueurs.<br>À droite, on retrouve 30 cm et 45 cm.<br>On ajoute les quatre côtés : 30 + 45 + 30 + 45.<br>75 + 75 = 150. Le périmètre est <span class="big">150 cm</span>.`,
      consigne: "Un cerf-volant symétrique a deux côtés de 30 cm et deux côtés de 45 cm. Quel est son périmètre ?",
      verification: { type: "courte", attendus: ["150"], unite: "cm" },
      dessin: cerfVolant(),
    },
    {
      tag: "Énigme 4 · À l'aquarium",
      titre: "L'étoile de mer",
      question: `À l'aquarium, Maëlle observe une étoile de mer.<br>Elle a <b>5 bras</b> tous pareils.<br>Elle cherche les plis qui marchent.<br><br>Combien d'<b>axes de symétrie</b> a l'étoile ?`,
      reponse: `Un axe part du bout d'un bras.<br>Il passe par le centre.<br>Il coupe en deux le creux d'en face.<br>Chaque bras donne un axe : 5 bras, 5 axes.<br>L'étoile a <span class="big">5 axes</span>.`,
      consigne: "Combien d'axes de symétrie a une étoile à 5 bras tous pareils ?",
      verification: { type: "qcm", choix: ["1 axe", "2 axes", "5 axes"], bonne: 2 },
      dessin: etoile(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La table de ping-pong",
      sorte: "piege",
      question: `La table de ping-pong est un <b>rectangle</b>.<br>Ce n'est pas un carré.<br>Tom dit : « Elle a 4 axes de symétrie. Les 2 diagonales en sont. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! On plie le long d'une diagonale.<br>Les deux moitiés ne se superposent pas : les coins dépassent.<br>Une diagonale n'est pas un axe du rectangle.<br>Il reste les 2 droites qui passent par les milieux des côtés.<br>Le rectangle a <span class="big">2 axes</span>.`,
      consigne: "Combien d'axes de symétrie a un rectangle qui n'est pas un carré ?",
      verification: { type: "qcm", choix: ["Non : il en a 2", "Oui : il en a 4", "Non : il en a 1"], bonne: 0 },
      dessin: pingPong(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le motif en pixels",
      sorte: "defi",
      question: `Léon dessine un motif en pixels.<br><b>3 carreaux</b> sont coupés en deux par l'axe.<br><b>4 carreaux</b> sont à gauche de l'axe.<br>Il complète le motif par symétrie.<br><br>Combien de carreaux colorés aura le motif <b>en entier</b> ?`,
      reponse: `Un carreau coupé par l'axe est sa propre image.<br>Les 3 carreaux de l'axe ne bougent pas : 3 carreaux.<br>Les 4 carreaux de gauche ont 4 images à droite : 4 + 4 = 8.<br>3 + 8 = 11. Le motif aura <span class="big">11 carreaux</span>.<br>Attention : 7 × 2 = 14, c'est faux.`,
      consigne: "Un motif a 3 carreaux coupés par l'axe et 4 carreaux à gauche. Complété par symétrie, combien a-t-il de carreaux ?",
      verification: { type: "courte", attendus: ["11"], unite: "carreaux" },
      dessin: pixels(),
    },
  ],
};

export default problemes;
