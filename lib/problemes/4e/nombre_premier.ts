// Énigmes à projeter — 4e, notion nombre_premier (reconnaître un nombre
// premier, les premiers entre 80 et 90, décomposer 72, partage en bouquets
// identiques, piège « 51 est premier », défi de la fraction 126/210).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// Les chaises du concert : 24 chaises en 4 rangées de 6, puis trois cartes.
const chaises = () => {
  let g = "";
  for (let j = 0; j < 4; j++)
    for (let i = 0; i < 6; i++)
      g += `<rect x="${137 + 36 * i}" y="${70 + 36 * j}" width="26" height="26" rx="4" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="2"/>`;
  const carte = (x: number, n: number) =>
    `<rect x="${x}" y="280" width="100" height="70" rx="10" ${S}/>` +
    `<text x="${x + 50}" y="328" fill="${C.craie}" font-size="36" text-anchor="middle">${n}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="24 chaises rangées en 4 rangées de 6, puis trois nombres : 21, 29 et 33">
  <text x="70" y="110" font-size="40" text-anchor="middle">🎵</text>
  ${g}
  <text x="240" y="245" fill="${C.pale}" font-size="22" text-anchor="middle">24 chaises${NB}: 4 rangées de 6</text>
  ${carte(50, 21)}${carte(190, 29)}${carte(330, 33)}
  <text x="240" y="395" fill="${C.pale}" font-size="20" text-anchor="middle">et avec ces nombres de chaises${NB}?</text>
  </svg>`;
};

// Le couloir de l'hôtel : portes 80 à 85 (rangée du haut), 86 à 90 (bas).
const hotel = () => {
  const porte = (x: number, y: number, n: number) =>
    `<rect x="${x}" y="${y}" width="56" height="90" rx="4" stroke="${C.craie}" stroke-width="3" fill="${C.jaune}" fill-opacity=".18"/>` +
    `<text x="${x + 28}" y="${y + 38}" fill="${C.craie}" font-size="24" text-anchor="middle">${n}</text>` +
    `<circle cx="${x + 45}" cy="${y + 58}" r="4" fill="${C.craie}"/>`;
  let p = "";
  for (let k = 0; k < 6; k++) p += porte(32 + 72 * k, 90, 80 + k);
  for (let k = 0; k < 5; k++) p += porte(68 + 72 * k, 220, 86 + k);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Onze portes de chambres numérotées de 80 à 90">
  <text x="240" y="60" font-size="40" text-anchor="middle">🏨</text>
  ${p}
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">8e étage${NB}: chambres 80 à 90</text>
  </svg>`;
};

// Le jeu de construction : 72 cubes en 8 rangées de 9 (case de 28 px).
const cubes = () => {
  let g = "";
  for (let j = 0; j < 8; j++)
    for (let i = 0; i < 9; i++)
      g += `<rect x="${114 + 28 * i}" y="${70 + 28 * j}" width="28" height="28" fill="${(i + j) % 2 === 0 ? C.rose : C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="1.5"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="72 petits cubes posés en 8 rangées de 9">
  <text x="240" y="50" fill="${C.craie}" font-size="24" text-anchor="middle">🧱 72 cubes</text>
  ${g}
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">8 rangées de 9</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">72 = ? × ? × …</text>
  </svg>`;
};

// Le fleuriste : 60 roses, 84 tulipes, des bouquets identiques.
const fleurs = () => {
  const bouquet = (x: number) =>
    `<path d="M${x} 360 L${x - 18} 300 L${x + 18} 300 Z" stroke="${C.pale}" stroke-width="3" fill="${C.pale}" fill-opacity=".2" stroke-linejoin="round"/>` +
    `<text x="${x}" y="292" fill="${C.rose}" font-size="26" text-anchor="middle">?</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="60 roses et 84 tulipes à répartir en bouquets identiques">
  <rect x="40" y="60" width="180" height="170" rx="14" ${S}/>
  <rect x="260" y="60" width="180" height="170" rx="14" ${S}/>
  <text x="130" y="140" font-size="54" text-anchor="middle">🌹</text>
  <text x="350" y="140" font-size="54" text-anchor="middle">🌷</text>
  <text x="130" y="200" fill="${C.rose}" font-size="26" text-anchor="middle">60 roses</text>
  <text x="350" y="200" fill="${C.jaune}" font-size="26" text-anchor="middle">84 tulipes</text>
  ${bouquet(150)}${bouquet(240)}${bouquet(330)}
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">des bouquets tous pareils</text>
  </svg>`;
};

// Le bus 51.
const bus = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bus de la ligne 51 et Tom qui dit que 51 est premier">
  <text x="240" y="70" fill="${C.rose}" font-size="24" text-anchor="middle">Tom${NB}: «${NB}51 est premier${NB}!${NB}»</text>
  <rect x="60" y="130" width="360" height="150" rx="22" ${S}/>
  <rect x="85" y="155" width="60" height="50" rx="6" stroke="${C.bleu}" stroke-width="3" fill="${C.bleu}" fill-opacity=".2"/>
  <rect x="160" y="155" width="60" height="50" rx="6" stroke="${C.bleu}" stroke-width="3" fill="${C.bleu}" fill-opacity=".2"/>
  <rect x="235" y="155" width="60" height="50" rx="6" stroke="${C.bleu}" stroke-width="3" fill="${C.bleu}" fill-opacity=".2"/>
  <rect x="320" y="150" width="80" height="44" rx="6" fill="${C.jaune}" fill-opacity=".6" stroke="${C.jaune}" stroke-width="3"/>
  <text x="360" y="182" fill="${C.craie}" font-size="30" text-anchor="middle">51</text>
  <circle cx="140" cy="290" r="28" stroke="${C.craie}" stroke-width="4" fill="${C.pale}" fill-opacity=".4"/>
  <circle cx="340" cy="290" r="28" stroke="${C.craie}" stroke-width="4" fill="${C.pale}" fill-opacity=".4"/>
  <text x="240" y="375" fill="${C.pale}" font-size="20" text-anchor="middle">impair, et il ne finit pas par 5…</text>
  </svg>`;

// Les semis : un bac et quelques pousses (décor, pas une proportion).
const semis = () => {
  let p = "";
  for (let k = 0; k < 6; k++) p += `<text x="${115 + 50 * k}" y="200" font-size="34" text-anchor="middle">🌱</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un bac de semis : 210 graines semées, 126 ont germé">
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">210 graines semées</text>
  <path d="M70 140 L410 140 L385 240 L95 240 Z" ${S}/>
  ${p}
  <text x="240" y="300" fill="${C.bleu}" font-size="26" text-anchor="middle">126 ont germé</text>
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">quelle fraction a germé${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "nombre_premier",
  titre: "Énigmes sur les nombres premiers",
  description: "Les chaises du concert, les chambres d'hôtel, les cubes du jeu de construction, les bouquets du fleuriste, le piège du bus 51, le défi des semis : reconnaître, décomposer, simplifier.",
  problemes: [
    {
      tag: "Énigme 1 · Le concert",
      titre: "Les chaises en rangées",
      question: `Pour un concert, on range 24 chaises en 4 rangées de 6.<br>Avec un nombre <b>premier</b> de chaises, c'est impossible : il faut une seule rangée.<br><br>Lequel de ces nombres est premier : 21, 29 ou 33 ?`,
      reponse: `21 = 3 × 7 : 3 rangées de 7. Pas premier.<br>33 = 3 × 11 : 3 rangées de 11. Pas premier.<br>29 n'a que deux diviseurs : 1 et 29.<br>Le nombre premier est <span class="big">29</span>.`,
      consigne: "Lequel de ces nombres est premier ?",
      verification: { type: "qcm", choix: ["21", "29", "33"], bonne: 1 },
      dessin: chaises(),
    },
    {
      tag: "Énigme 2 · À l'hôtel",
      titre: "Les chambres du 8e étage",
      question: `Au 8e étage d'un hôtel, les chambres vont de 80 à 90.<br>Malik veut une chambre au numéro <b>premier</b>.<br><br>Combien de chambres peut-il choisir ?`,
      reponse: `Les nombres pairs (80, 82, 84, 86, 88, 90) sont éliminés.<br>Restent 81, 83, 85, 87, 89. On teste 3, 5 et 7.<br>81 = 9 × 9 ; 85 = 5 × 17 ; 87 = 3 × 29.<br>83 et 89 ne sont divisibles ni par 3, ni par 5, ni par 7 : ils sont premiers.<br>Il a <span class="big">2 chambres</span> : la 83 et la 89.`,
      consigne: "Combien de chambres ont un numéro premier ?",
      verification: { type: "courte", attendus: ["2"], unite: "chambres" },
      dessin: hotel(),
    },
    {
      tag: "Énigme 3 · Le jeu de construction",
      titre: "Les 72 cubes",
      question: `Yanis a 72 petits cubes.<br>Il veut écrire 72 comme un <b>produit de facteurs premiers</b>.<br><br>Quelle est la bonne écriture ?`,
      reponse: `On divise par le plus petit nombre premier possible :<br>72 ÷ 2 = 36 ; 36 ÷ 2 = 18 ; 18 ÷ 2 = 9 ; 9 ÷ 3 = 3 ; 3 ÷ 3 = 1.<br>Donc <span class="big">72 = 2 × 2 × 2 × 3 × 3</span>.<br>8 × 9 donne bien 72, mais 8 et 9 ne sont pas premiers.<br>Contrôle : 2 × 2 × 2 = 8, 3 × 3 = 9 et 8 × 9 = 72.`,
      consigne: "Quelle est la décomposition de 72 en facteurs premiers ?",
      verification: { type: "qcm", choix: ["8 × 9", "2 × 4 × 9", "2 × 2 × 2 × 3 × 3"], bonne: 2 },
      dessin: cubes(),
    },
    {
      tag: "Énigme 4 · Chez le fleuriste",
      titre: "Des bouquets tous pareils",
      question: `Une fleuriste a 60 roses et 84 tulipes.<br>Elle fait des bouquets <b>identiques</b>, sans reste.<br><br>Combien de bouquets peut-elle faire, <b>au maximum</b> ?`,
      reponse: `On décompose : 60 = 2 × 2 × 3 × 5 et 84 = 2 × 2 × 3 × 7.<br>Facteurs communs : 2 × 2 × 3 = 12.<br>Elle fait <span class="big">12 bouquets</span>.<br>Chaque bouquet : 60 ÷ 12 = 5 roses et 84 ÷ 12 = 7 tulipes.`,
      consigne: "Combien de bouquets identiques, au maximum ?",
      verification: { type: "courte", attendus: ["12"], unite: "bouquets" },
      dessin: fleurs(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La ligne 51",
      sorte: "piege",
      question: `Tom attend le bus de la ligne 51.<br>Il dit : « 51 est impair et ne finit pas par 5. Donc 51 est premier ! »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! On teste aussi la division par 3.<br>5 + 1 = 6, et 6 est un multiple de 3.<br>Donc 51 est divisible par 3 : 51 ÷ 3 = 17.<br><span class="big">51 = 3 × 17</span> : il n'est pas premier.<br>Impair ne veut pas dire premier.`,
      consigne: "51 est-il un nombre premier ?",
      verification: { type: "qcm", choix: ["Non, car 51 = 3 × 17", "Oui, 51 est premier", "Non, car 51 est impair"], bonne: 0 },
      dessin: bus(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fraction des semis",
      sorte: "defi",
      question: `Clara a semé 210 graines de tomates.<br>126 ont germé.<br><br>Quelle fraction des graines a germé ?<br>Donne-la sous forme <b>irréductible</b>.`,
      reponse: `La fraction : ${frac(126, 210)}.<br>126 = 2 × 3 × 3 × 7 et 210 = 2 × 3 × 5 × 7.<br>On barre les facteurs communs : 2, 3 et 7.<br>Il reste <span class="big">${frac(3, 5)}</span>, soit 60 %.<br>Contrôle : 210 ÷ 5 × 3 = 126.`,
      consigne: "Quelle fraction irréductible des graines a germé ? (écris une fraction, par exemple 2/7)",
      verification: { type: "courte", attendus: ["3/5", "0,6", "60%"] },
      dessin: semis(),
    },
  ],
};

export default problemes;
