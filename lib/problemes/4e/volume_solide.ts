// Énigmes à projeter — 4e, notion volume_solide (le bac à sable, la barre de
// chocolat en prisme, l'atelier savon, le bassin des tortues, piège du tambour
// « diamètre au lieu du rayon », défi du laboratoire : de l'eau versée d'un
// pavé dans un bocal cylindrique).
// Perspective cavalière : fuyantes à 45°, coefficient 0,5. Le bac, la barre,
// le bassin, le tambour et le défi sont au bon rapport (mêmes pixels par cm
// ou par m dans chaque dessin) ; le savon ne l'est pas, c'est écrit dessus.
// π : valeur de la calculatrice, arrondi annoncé dans chaque énoncé. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Un pavé en perspective cavalière : face avant L × h en vrai, profondeur p
// dessinée à 45° et réduite de moitié.
const pave = (x: number, y: number, L: number, h: number, p: number, coul: string) => {
  const d = r1((p * 0.5) / Math.SQRT2);
  const xr = x + L;
  const yb = y + h;
  return `<path d="M${x} ${y} L${r1(x + d)} ${r1(y - d)} L${r1(xr + d)} ${r1(y - d)} L${xr} ${y} Z" fill="${coul}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M${xr} ${y} L${r1(xr + d)} ${r1(y - d)} L${r1(xr + d)} ${r1(yb - d)} L${xr} ${yb} Z" fill="${coul}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="${x}" y="${y}" width="${L}" height="${h}" fill="${coul}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>` +
    `<path d="M${x} ${yb} L${r1(x + d)} ${r1(yb - d)} L${r1(xr + d)} ${r1(yb - d)} M${r1(x + d)} ${r1(yb - d)} L${r1(x + d)} ${r1(y - d)}" stroke="${C.pale}" stroke-width="2" stroke-dasharray="7 6" fill="none"/>`;
};

// Le bac à sable : 150 px par m. 2 m (300 px) × 0,4 m (60 px), profondeur
// 1,5 m (225 px, dessinée 112,5 px à 45°, soit 79,5 px en x et en y).
const bac = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bac à sable en forme de pavé droit : 2 m de long, 1,5 m de large, 0,4 m de haut">
  ${pave(50, 230, 300, 60, 225, C.jaune)}
  ${txt(200, 326, "2 m", C.craie, 24)}
  ${txt(42, 268, "0,4 m", C.craie, 22, "end")}
  ${txt(80, 184, "1,5 m", C.craie, 22, "end")}
  <text x="240" y="110" font-size="48" text-anchor="middle">🪣</text>
  ${txt(240, 385, `sable${NB}: ? m³`, C.rose, 26)}
  </svg>`;

// La barre de chocolat : 34 px par cm. Triangle de base 4 cm (136 px) et de
// hauteur 3 cm (102 px). Longueur 20 cm, dessinée 10 cm (340 px) à 45° :
// 240,4 px en x et en y. Les arêtes cachées sont en pointillés.
const barre = () => {
  const ax = 50, ay = 385, bx = 186, sx = 118, sy = 283, d = 240.4;
  const p = (x: number, y: number) => `${r1(x)} ${r1(y)}`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une barre de chocolat en prisme droit : la base est un triangle de 4 cm de base et 3 cm de hauteur, la barre fait 20 cm de long">
  <path d="M${p(ax, ay)} L${p(ax + d, ay - d)} L${p(bx + d, ay - d)} M${p(ax + d, ay - d)} L${p(sx + d, sy - d)}" stroke="${C.pale}" stroke-width="2" stroke-dasharray="7 6" fill="none"/>
  <path d="M${p(sx, sy)} L${p(sx + d, sy - d)} L${p(bx + d, ay - d)} L${p(bx, ay)} Z" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${p(ax, ay)} L${p(bx, ay)} L${p(sx, sy)} Z" fill="${C.jaune}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${sx} ${sy} L${sx} ${ay}" stroke="${C.bleu}" stroke-width="2.5" stroke-dasharray="6 5"/>
  ${txt(sx, 412, "4 cm", C.craie, 22)}
  <text x="0" y="0" fill="${C.bleu}" font-size="20" text-anchor="middle" transform="translate(${sx + 21} 352) rotate(-90)">3 cm</text>
  ${txt(340, 290, "20 cm", C.craie, 22, "start")}
  ${txt(130, 110, "🍫", C.craie, 48)}
  ${txt(130, 160, "? cm³", C.rose, 26)}
  </svg>`;
};

// Le savon en cœur : la base est un cœur, épaisseur 4 cm. Pas à l'échelle.
const coeur = (dy: number) =>
  `M240 ${150 + dy} C240 ${110 + dy} 180 ${80 + dy} 150 ${115 + dy} C120 ${150 + dy} 150 ${195 + dy} 240 ${245 + dy} C330 ${195 + dy} 360 ${150 + dy} 330 ${115 + dy} C300 ${80 + dy} 240 ${110 + dy} 240 ${150 + dy} Z`;
const savon = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un savon en forme de cœur : l'aire de la base vaut 45 centimètres carrés, l'épaisseur 4 cm ; il y a 900 centimètres cubes de pâte">
  <path d="${coeur(50)}" fill="${C.rose}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <path d="${coeur(0)}" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  ${txt(240, 180, "45 cm²", C.craie, 24)}
  <path d="M380 140 L380 190" stroke="${C.bleu}" stroke-width="3"/>
  <path d="M370 140 L390 140 M370 190 L390 190" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(396, 173, "4 cm", C.bleu, 22, "start")}
  <rect x="80" y="320" width="320" height="56" rx="14" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3"/>
  ${txt(240, 357, `pâte${NB}: 900 cm³`, C.craie, 24)}
  ${txt(240, 50, "pas à l'échelle", C.pale, 20)}
  </svg>`;

// Le bassin des tortues : 3,5 px par cm. 80 cm (280 px) × 40 cm (140 px),
// profondeur 50 cm (175 px, dessinée 87,5 px à 45°, soit 61,9 px en x et en y).
const bassin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bassin en forme de pavé droit de 80 cm de long, 50 cm de large et 40 cm de haut, rempli d'eau pour des tortues">
  ${pave(60, 170, 280, 140, 175, C.bleu)}
  ${txt(200, 345, "80 cm", C.craie, 24)}
  ${txt(52, 248, "40 cm", C.craie, 22, "end")}
  ${txt(84, 132, "50 cm", C.craie, 22, "end")}
  <text x="200" y="260" font-size="56" text-anchor="middle">🐢</text>
  ${txt(240, 395, "combien de litres ?".replace(" ?", `${NB}?`), C.rose, 26)}
  </svg>`;

// Le tambour : 6 px par cm. Diamètre 40 cm (240 px), hauteur 30 cm (180 px).
const tambour = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tambour en forme de cylindre de 40 cm de diamètre et 30 cm de haut ; Léa calcule pi fois 40 fois 40 fois 30">
  <path d="M60 110 L60 290 A120 30 0 0 0 300 290 L300 110" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <ellipse cx="180" cy="110" rx="120" ry="30" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <path d="M60 110 L300 110" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(180, 100, "40 cm", C.bleu, 22)}
  <path d="M325 110 L325 290" stroke="${C.craie}" stroke-width="3"/>
  <path d="M315 110 L335 110 M315 290 L335 290" stroke="${C.craie}" stroke-width="3"/>
  ${txt(342, 208, "30 cm", C.craie, 22, "start")}
  <text x="180" y="225" font-size="48" text-anchor="middle">🥁</text>
  <rect x="40" y="345" width="400" height="56" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 382, `Léa${NB}: π × 40 × 40 × 30`, C.rose, 24)}
  </svg>`;

// Le défi : 6 px par cm. Bac pavé 20 cm (120 px) × 9 cm (54 px), profondeur
// 10 cm (60 px, dessinée 30 px à 45°, soit 21,2 px en x et en y).
// Bocal : diamètre 20 cm (120 px), hauteur 15 cm (90 px), dessiné vide
// pour ne pas montrer le niveau cherché.
const transvase = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bac plein d'eau de 20 cm sur 10 cm sur 9 cm, versé dans un bocal cylindrique de 10 cm de rayon">
  ${pave(30, 200, 120, 54, 60, C.bleu)}
  ${txt(90, 286, "20 cm", C.craie, 22)}
  ${txt(24, 235, "9 cm", C.craie, 20, "end")}
  ${txt(178, 182, "10 cm", C.craie, 20, "start")}
  ${txt(100, 140, "plein d'eau", C.bleu, 22)}
  <path d="M200 230 L250 230" stroke="${C.rose}" stroke-width="4" stroke-linecap="round"/>
  <path d="M240 220 L252 230 L240 240" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M290 160 L290 250 A60 16 0 0 0 410 250 L410 160" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <ellipse cx="350" cy="160" rx="60" ry="16" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M350 160 L410 160" stroke="${C.jaune}" stroke-width="3"/>
  ${txt(380, 150, "10 cm", C.jaune, 20)}
  ${txt(350, 225, "?", C.rose, 36)}
  ${txt(240, 330, "rayon du bocal : 10 cm".replace(" :", `${NB}:`), C.pale, 22)}
  ${txt(240, 380, "quelle hauteur d'eau ?".replace(" ?", `${NB}?`), C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "volume_solide",
  titre: "Énigmes sur les volumes",
  description: "Le bac à sable, la barre de chocolat, l'atelier savon, le bassin des tortues, le piège du tambour, le défi du laboratoire : calculer le volume d'un pavé, d'un prisme et d'un cylindre avec « aire de base × hauteur », convertir des cm³ en litres.",
  problemes: [
    {
      tag: "Énigme 1 · Le bac à sable",
      titre: "Combien de sable ?",
      question: `Le bac à sable de l'école est un pavé droit.<br>Il mesure 2 m de long, 1,5 m de large et 0,4 m de haut.<br><br>Quel volume de sable faut-il pour le remplir, en m³ ?`,
      reponse: `Volume d'un pavé : longueur × largeur × hauteur.<br>Toutes les mesures sont en mètres : le volume sera en m³.<br>2 × 1,5 = 3, puis 3 × 0,4 = 1,2.<br>Il faut <span class="big">1,2 m³</span> de sable.`,
      consigne: "Quel volume de sable faut-il, en m³ ?",
      verification: { type: "courte", attendus: ["1,2"], unite: "m³" },
      dessin: bac(),
    },
    {
      tag: "Énigme 2 · Le goûter",
      titre: "La barre en triangle",
      question: `Une barre de chocolat a la forme d'un prisme droit.<br>Sa base est un triangle de 4 cm de base et 3 cm de hauteur.<br>La barre fait 20 cm de long.<br><br>Quel est son volume ?`,
      reponse: `Volume d'un prisme : aire de la base × hauteur du prisme.<br>Aire du triangle : 4 × 3 ÷ 2 = 6 cm².<br>La hauteur du prisme, c'est sa longueur : 20 cm.<br>6 × 20 = 120.<br>Le volume de la barre est <span class="big">120 cm³</span>.<br>Attention : sans le « ÷ 2 », on trouverait 240 cm³, le double.`,
      consigne: "Quel est le volume de la barre de chocolat ?",
      verification: { type: "qcm", choix: ["240 cm³", "120 cm³", "60 cm³"], bonne: 1 },
      dessin: barre(),
    },
    {
      tag: "Énigme 3 · L'atelier savon",
      titre: "Des savons en cœur",
      question: `Inès fabrique des savons en forme de cœur.<br>La base du cœur a une aire de 45 cm². Chaque savon fait 4 cm d'épaisseur.<br>Elle a préparé 900 cm³ de pâte.<br><br>Combien de savons peut-elle faire ?`,
      reponse: `La base n'est ni un rectangle ni un triangle, mais on connaît son aire.<br>Volume d'un savon : aire de la base × hauteur = 45 × 4 = 180 cm³.<br>Nombre de savons : 900 ÷ 180 = 5.<br>Inès peut faire <span class="big">5 savons</span>.<br>Contrôle : 5 × 180 = 900 cm³.`,
      consigne: "Combien de savons Inès peut-elle faire ?",
      verification: { type: "courte", attendus: ["5"], unite: "savons" },
      dessin: savon(),
    },
    {
      tag: "Énigme 4 · Les tortues d'eau",
      titre: "Le bassin en litres",
      question: `Le bassin des tortues de Malo est un pavé droit.<br>Il mesure 80 cm de long, 50 cm de large et 40 cm de haut.<br><br>Combien de litres d'eau faut-il pour le remplir ?`,
      reponse: `Volume : 80 × 50 × 40 = 160 000 cm³.<br>1 L = 1 dm³ = 1 000 cm³.<br>160 000 ÷ 1 000 = 160.<br>Il faut <span class="big">160 L</span> d'eau.<br>Autre chemin : en dm, 8 × 5 × 4 = 160 dm³, soit 160 L.`,
      consigne: "Combien de litres d'eau faut-il pour remplir le bassin ?",
      verification: { type: "qcm", choix: ["16 L", "1 600 L", "160 L"], bonne: 2 },
      dessin: bassin(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le tambour",
      sorte: "piege",
      question: `Un tambour a la forme d'un cylindre de 40 cm de diamètre et 30 cm de haut.<br>Léa calcule son volume : « π × 40 × 40 × 30 ».<br><br><b>Quel est le vrai volume, arrondi au cm³ ?</b>`,
      reponse: `Léa s'est trompée : la formule utilise le <b>rayon</b>, pas le diamètre !<br>Rayon : 40 ÷ 2 = 20 cm.<br>Aire de la base : π × 20 × 20 = 400π cm².<br>Volume : 400π × 30 = 12 000π ≈ 37 699,1 cm³.<br>Le volume du tambour est d'environ <span class="big">37 699 cm³</span>, soit environ 37,7 L.<br>Le calcul de Léa donne 4 fois trop : environ 150 796 cm³.`,
      consigne: "Quel est le volume du tambour, arrondi au cm³ ?",
      verification: { type: "qcm", choix: ["37 699 cm³", "150 796 cm³", "3 770 cm³"], bonne: 0 },
      dessin: tambour(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'eau change de forme",
      sorte: "defi",
      question: `Au laboratoire, Chloé remplit d'eau un bac en forme de pavé : 20 cm × 10 cm × 9 cm.<br>Elle verse toute l'eau dans un bocal cylindrique de 10 cm de rayon.<br><br>Quelle hauteur l'eau atteint-elle dans le bocal ? Arrondis au millimètre.`,
      reponse: `Volume de l'eau : 20 × 10 × 9 = 1 800 cm³. Il ne change pas quand on la verse.<br>Aire de la base du bocal : π × 10 × 10 = 100π ≈ 314,16 cm².<br>Volume = aire de base × hauteur, donc hauteur = volume ÷ aire de base.<br>1 800 ÷ 100π ≈ 5,73.<br>L'eau monte à environ <span class="big">5,7 cm</span>.`,
      consigne: "Quelle hauteur l'eau atteint-elle dans le bocal, au millimètre près (en cm) ?",
      verification: { type: "courte", attendus: ["5,7"], unite: "cm" },
      dessin: transvase(),
    },
  ],
};

export default problemes;
