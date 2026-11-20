// Énigmes à projeter — 4e, notion prop_echelle (le plan du zoo, la carte de
// la course cycliste, la maquette d'avion, l'album photo, piège de la piste
// de danse « l'aire double », défi des moules à gâteau).
// Les photos, la piste et les moules sont au bon rapport (mêmes pixels par
// cm ou par m dans chaque dessin) ; la carte et le plan du zoo ne le sont
// pas, c'est écrit dessus. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Le plan du zoo : des allées, trois enclos, et 1 cm marqué en bas.
const zoo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le plan d'un zoo à l'échelle 1 sur 5 000, avec un segment de 1 cm marqué">
  <rect x="40" y="30" width="400" height="250" rx="16" fill="${C.pale}" fill-opacity=".08" stroke="${C.craie}" stroke-width="3"/>
  <path d="M60 150 C140 110 220 200 300 150 S420 120 430 160" stroke="${C.jaune}" stroke-width="10" fill="none" stroke-linecap="round" stroke-opacity=".7"/>
  <path d="M240 40 L240 270" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" stroke-opacity=".7"/>
  <text x="130" y="100" font-size="44" text-anchor="middle">🦁</text>
  <text x="350" y="100" font-size="44" text-anchor="middle">🦒</text>
  <text x="140" y="250" font-size="44" text-anchor="middle">🐘</text>
  <text x="350" y="250" font-size="44" text-anchor="middle">🦓</text>
  <path d="M60 330 L120 330" stroke="${C.rose}" stroke-width="5" stroke-linecap="round"/>
  <path d="M60 320 L60 340 M120 320 L120 340" stroke="${C.rose}" stroke-width="3"/>
  ${txt(90, 372, "1 cm", C.rose, 24)}
  ${txt(90, 404, `en vrai${NB}?`, C.rose, 22)}
  ${txt(300, 340, "échelle", C.craie, 22)}
  ${svgFrac(300, 380, 1, "5 000", C.bleu, 26)}
  ${txt(420, 330, "pas à", C.pale, 20)}
  ${txt(420, 354, "l'échelle", C.pale, 20)}
  </svg>`;

// La carte de l'étape : deux villes reliées, 6,5 cm sur la carte.
const carte = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une carte : deux villes à 6,5 cm l'une de l'autre, échelle 1 sur 200 000">
  <rect x="30" y="30" width="420" height="260" rx="12" fill="${C.bleu}" fill-opacity=".06" stroke="${C.craie}" stroke-width="3"/>
  <path d="M90 220 L380 120" stroke="${C.rose}" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round"/>
  <circle cx="90" cy="220" r="9" fill="${C.craie}"/>
  <circle cx="380" cy="120" r="9" fill="${C.craie}"/>
  ${txt(90, 260, "départ", C.craie, 22)}
  ${txt(380, 90, "arrivée", C.craie, 22)}
  ${txt(250, 152, "6,5 cm", C.rose, 26)}
  <text x="150" y="110" font-size="44" text-anchor="middle">🚴</text>
  ${txt(130, 345, "carte au", C.craie, 22)}
  ${svgFrac(250, 340, 1, "200 000", C.bleu, 26)}
  ${txt(400, 345, "pas à", C.pale, 20)}
  ${txt(400, 369, "l'échelle", C.pale, 20)}
  </svg>`;

// L'avion vu de dessus : l'envergure fait 36 m, la maquette est au 1/72.
const avion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un avion vu de dessus, d'envergure 36 mètres ; la maquette est au 1 sur 72">
  <polygon points="240,170 60,225 60,240 240,215 420,240 420,225" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="228" y="70" width="24" height="262" rx="12" fill="${C.pale}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <polygon points="240,296 175,326 175,336 240,322 305,336 305,326" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 370 L420 370" stroke="${C.rose}" stroke-width="3"/>
  <path d="M60 360 L60 380 M420 360 L420 380" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 405, "36 m en vrai", C.rose, 24)}
  ${txt(110, 70, "maquette", C.craie, 22)}
  ${txt(110, 98, "au", C.craie, 22)}
  ${svgFrac(110, 136, 1, 72, C.bleu, 28)}
  ${txt(370, 100, "? cm", C.rose, 26)}
  ${txt(370, 128, "sur la", C.rose, 20)}
  ${txt(370, 152, "maquette", C.rose, 20)}
  </svg>`;

// Les photos : 6 px par cm. Petite 10 × 15 cm (60 × 90 px), grande 25 × 37,5 cm (150 × 225 px).
const photos = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une photo de 10 cm sur 15 cm et son agrandissement de 25 cm de large">
  <rect x="70" y="180" width="60" height="90" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <text x="100" y="237" font-size="30" text-anchor="middle">🌄</text>
  ${txt(100, 168, "10 cm", C.craie, 22)}
  ${txt(62, 232, "15 cm", C.craie, 22, "end")}
  <rect x="230" y="110" width="150" height="225" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <text x="305" y="240" font-size="72" text-anchor="middle">🌄</text>
  ${txt(305, 98, "25 cm", C.bleu, 24)}
  ${txt(392, 232, "?", C.rose, 30, "start")}
  ${txt(240, 392, "la même photo, agrandie", C.pale, 22)}
  </svg>`;

// La piste : 17,5 px par m. Petite 4 m (70 px), grande 8 m (140 px).
const piste = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une piste carrée de 4 m de côté et une piste de 8 m de côté ; Tom pense que l'aire passe à 32 mètres carrés">
  <rect x="50" y="130" width="70" height="70" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  ${txt(85, 172, "16 m²", C.craie, 20)}
  ${txt(85, 228, "4 m", C.craie, 22)}
  <rect x="200" y="60" width="140" height="140" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  ${txt(270, 142, "?", C.rose, 36)}
  ${txt(270, 228, "8 m", C.craie, 22)}
  <text x="415" y="120" font-size="48" text-anchor="middle">💃</text>
  <rect x="60" y="280" width="360" height="80" rx="20" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 312, `Tom${NB}: « côtés × 2,`, C.rose, 24)}
  ${txt(240, 344, `donc 32 m²${NB}»`, C.rose, 24)}
  </svg>`;

// Les moules, en perspective cavalière (fuyantes à 45°, coefficient 0,5) :
// 8 px par cm. Petit 10 × 8 × 5 cm, grand 20 × 16 × 10 cm.
const pave = (x: number, y: number, L: number, h: number, p: number, coul: string) => {
  const d = r1((p * 0.5) / Math.SQRT2);
  const xr = x + L;
  const yb = y + h;
  return `<path d="M${x} ${y} L${r1(x + d)} ${r1(y - d)} L${r1(xr + d)} ${r1(y - d)} L${xr} ${y} Z" fill="${coul}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M${xr} ${y} L${r1(xr + d)} ${r1(y - d)} L${r1(xr + d)} ${r1(yb - d)} L${xr} ${yb} Z" fill="${coul}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="${x}" y="${y}" width="${L}" height="${h}" fill="${coul}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>`;
};
const moules = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux moules en forme de pavé : le petit fait 10 cm sur 8 cm sur 5 cm, le grand a toutes ses longueurs doublées">
  ${pave(40, 260, 80, 40, 64, C.jaune)}
  ${txt(80, 328, "10 cm", C.craie, 20)}
  ${txt(34, 287, "5 cm", C.craie, 20, "end")}
  ${txt(150, 252, "8 cm", C.craie, 20, "start")}
  ${txt(90, 200, "🥚 3 œufs", C.craie, 22)}
  ${pave(220, 220, 160, 80, 128, C.rose)}
  ${txt(300, 328, "toutes les longueurs × 2", C.rose, 20)}
  ${txt(320, 150, "🥚 ? œufs", C.rose, 24)}
  ${txt(240, 395, "dessin en perspective", C.pale, 20)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "prop_echelle",
  titre: "Énigmes sur les échelles et les agrandissements",
  description: "Le plan du zoo, la carte de la course cycliste, la maquette d'avion, l'album photo, le piège de la piste de danse, le défi des moules à gâteau : lire une échelle, passer du plan à la réalité et de la réalité au plan, utiliser un rapport d'agrandissement, ses effets sur les aires et les volumes.",
  problemes: [
    {
      tag: "Énigme 1 · Le plan du zoo",
      titre: "Que vaut 1 cm ?",
      question: `Le plan du zoo est à l'échelle ${frac(1, "5 000")}.<br>Yanis pose sa règle sur le plan.<br><br>Que représente 1 cm du plan dans la réalité ?`,
      reponse: `L'échelle ${frac(1, "5 000")} veut dire : 1 cm sur le plan représente 5 000 cm en vrai.<br>Les deux nombres sont dans la même unité.<br>On convertit : 1 m = 100 cm, donc 5 000 cm = 5 000 ÷ 100 = 50 m.<br>1 cm du plan représente <span class="big">50 m</span>.`,
      consigne: "Que représente 1 cm du plan dans la réalité ?",
      verification: { type: "qcm", choix: ["5 m", "500 m", "50 m"], bonne: 2 },
      dessin: zoo(),
    },
    {
      tag: "Énigme 2 · La course cycliste",
      titre: "L'étape sur la carte",
      question: `Zoé regarde l'étape d'une course cycliste sur une carte au ${frac(1, "200 000")}.<br>Sur la carte, le départ et l'arrivée sont à 6,5 cm, en ligne droite.<br><br>Quelle est la distance réelle, en kilomètres ?`,
      reponse: `Au ${frac(1, "200 000")}, la réalité est 200 000 fois plus grande que la carte.<br>6,5 × 200 000 = 1 300 000 cm.<br>On convertit : 1 km = 100 000 cm.<br>1 300 000 ÷ 100 000 = 13.<br>La distance réelle est <span class="big">13 km</span> à vol d'oiseau.`,
      consigne: "Quelle est la distance réelle, en km ?",
      verification: { type: "courte", attendus: ["13"], unite: "km" },
      dessin: carte(),
    },
    {
      tag: "Énigme 3 · La maquette d'avion",
      titre: "Les ailes de la maquette",
      question: `Un avion de ligne a une envergure de 36 m, d'un bout d'aile à l'autre.<br>Maël construit sa maquette au ${frac(1, 72)}.<br><br>Quelle est l'envergure de la maquette, en centimètres ?`,
      reponse: `On convertit d'abord : 36 m = 3 600 cm.<br>Au ${frac(1, 72)}, la maquette est 72 fois plus petite.<br>3 600 ÷ 72 = 50.<br>L'envergure de la maquette est <span class="big">50 cm</span>.<br>Contrôle : 50 × 72 = 3 600 cm, soit 36 m.`,
      consigne: "Quelle est l'envergure de la maquette, en cm ?",
      verification: { type: "courte", attendus: ["50"], unite: "cm" },
      dessin: avion(),
    },
    {
      tag: "Énigme 4 · L'album photo",
      titre: "La photo agrandie",
      question: `Une photo mesure 10 cm de large et 15 cm de long.<br>Sami la fait agrandir : la largeur passe à 25 cm.<br><br>Quelle est la nouvelle longueur ?`,
      reponse: `Le rapport d'agrandissement : 25 ÷ 10 = 2,5.<br>Toutes les longueurs sont multipliées par 2,5.<br>15 × 2,5 = 37,5.<br>La nouvelle longueur est <span class="big">37,5 cm</span>.<br>Attention : on ne rajoute pas 15 cm partout. 15 + 15 = 30 cm déformerait la photo.`,
      consigne: "Quelle est la nouvelle longueur de la photo ?",
      verification: { type: "qcm", choix: ["30 cm", "37,5 cm", "40 cm"], bonne: 1 },
      dessin: photos(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La piste de danse",
      sorte: "piege",
      question: `Une piste de danse est un carré de 4 m de côté. Son aire est 16 m².<br>On l'agrandit : chaque côté est multiplié par 2.<br>Tom dit : « Les côtés doublent, donc l'aire double : 32 m². »<br><br><b>Quelle est vraiment l'aire de la nouvelle piste ?</b>`,
      reponse: `Tom s'est trompé !<br>Le nouveau carré a 8 m de côté : 8 × 8 = 64 m².<br>Les longueurs sont multipliées par 2, l'aire par 2 × 2 = 4.<br>16 × 4 = 64.<br>L'aire de la nouvelle piste est <span class="big">64 m²</span>.`,
      consigne: "Quelle est l'aire de la nouvelle piste ?",
      verification: { type: "qcm", choix: ["64 m²", "32 m²", "128 m²"], bonne: 0 },
      dessin: piste(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le grand moule à gâteau",
      sorte: "defi",
      question: `Le petit moule de Lila est un pavé de 10 cm × 8 cm × 5 cm.<br>Pour le remplir, sa recette demande 3 œufs.<br>Le grand moule est un agrandissement de rapport 2 du petit.<br><br>Combien d'œufs faut-il pour remplir le grand moule ?`,
      reponse: `Le grand moule mesure 20 cm × 16 cm × 10 cm.<br>Petit : 10 × 8 × 5 = 400 cm³. Grand : 20 × 16 × 10 = 3 200 cm³.<br>3 200 ÷ 400 = 8 : le volume est multiplié par 2 × 2 × 2 = 8.<br>3 × 8 = 24.<br>Il faut <span class="big">24 œufs</span>, et pas 6 !`,
      consigne: "Combien d'œufs pour le grand moule ?",
      verification: { type: "courte", attendus: ["24"] },
      dessin: moules(),
    },
  ],
};

export default problemes;
