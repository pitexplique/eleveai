// Énigmes à projeter — 4e, notion proba_experience (issues d'un dé,
// événement contraire, probabilité en pourcentage, comparer deux jeux,
// piège « 2 cases donc une chance sur deux », défi de l'arbre à deux lancers).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// Le dé : les 6 faces, 3 colonnes (x = 60, 190, 320), 2 lignes (y = 90, 220).
const de = () => {
  let faces = "";
  for (let k = 0; k < 6; k++) {
    const x = 60 + 130 * (k % 3);
    const y = 90 + 130 * Math.floor(k / 3);
    faces += `<rect x="${x}" y="${y}" width="100" height="100" rx="14" ${S}/>`;
    faces += `<text x="${x + 50}" y="${y + 66}" fill="${C.craie}" font-size="44" text-anchor="middle">${k + 1}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Les six faces d'un dé, numérotées de 1 à 6">
  <text x="240" y="60" font-size="40" text-anchor="middle">🎲</text>
  ${faces}
  <text x="240" y="385" fill="${C.pale}" font-size="22" text-anchor="middle">5 ou 6${NB}: corde à sauter</text>
  </svg>`;
};

// Le sac de perles : 5 roses, 3 bleues, 2 jaunes (10 en tout).
const perles = () => {
  const pos: [number, number, string][] = [
    [150, 190, C.rose], [210, 190, C.bleu], [270, 190, C.rose], [330, 190, C.jaune],
    [180, 250, C.bleu], [240, 250, C.rose], [300, 250, C.jaune],
    [180, 310, C.rose], [240, 310, C.bleu], [300, 310, C.rose],
  ];
  const ronds = pos
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="22" fill="${c}" fill-opacity=".55" stroke="${c}" stroke-width="3"/>`)
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un sac de 10 perles : 5 roses, 3 bleues et 2 jaunes">
  <text x="240" y="75" fill="${C.craie}" font-size="26" text-anchor="middle">10 perles dans le sac</text>
  <path d="M120 140 Q95 345 160 365 L320 365 Q385 345 360 140" ${S}/>
  <path d="M110 140 L370 140" ${S}/>
  ${ronds}
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">5 roses, 3 bleues, 2 jaunes</text>
  </svg>`;
};

// Les cartes : 20 cartes, 5 colonnes (x = 45 + 80 i), 4 lignes (y = 70 + 78 j).
const cartes = () => {
  let jeu = "";
  for (let n = 1; n <= 20; n++) {
    const x = 45 + 80 * ((n - 1) % 5);
    const y = 70 + 78 * Math.floor((n - 1) / 5);
    jeu += `<rect x="${x}" y="${y}" width="68" height="62" rx="8" stroke="${C.craie}" stroke-width="3" fill="${C.pale}" fill-opacity=".15"/>`;
    jeu += `<text x="${x + 34}" y="${y + 41}" fill="${C.craie}" font-size="26" text-anchor="middle">${n}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Vingt cartes numérotées de 1 à 20">
  <text x="240" y="45" fill="${C.craie}" font-size="24" text-anchor="middle">🃏 20 cartes</text>
  ${jeu}
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">Mila pioche une carte au hasard</text>
  </svg>`;
};

// La tombola : jeu A 12 tickets (3 gagnants en jaune), jeu B 7 tickets (2 gagnants).
const tombola = () => {
  const ticket = (x: number, y: number, gagne: boolean) =>
    gagne
      ? `<rect x="${x}" y="${y}" width="36" height="28" rx="4" fill="${C.jaune}" fill-opacity=".7" stroke="${C.jaune}" stroke-width="3"/>`
      : `<rect x="${x}" y="${y}" width="36" height="28" rx="4" fill="none" stroke="${C.pale}" stroke-width="3"/>`;
  let a = "";
  const gagnantsA = ["0-0", "2-1", "1-3"];
  for (let j = 0; j < 4; j++)
    for (let i = 0; i < 3; i++) a += ticket(55 + 50 * i, 115 + 45 * j, gagnantsA.includes(`${i}-${j}`));
  let b = "";
  const placesB = ["0-0", "1-0", "2-0", "0-1", "1-1", "2-1", "1-2"];
  const gagnantsB = ["1-0", "2-1"];
  for (const p of placesB) {
    const [i, j] = p.split("-").map(Number);
    b += ticket(285 + 50 * i, 115 + 45 * j, gagnantsB.includes(p));
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Jeu A : 12 tickets dont 3 gagnants. Jeu B : 7 tickets dont 2 gagnants">
  <text x="125" y="75" fill="${C.craie}" font-size="26" text-anchor="middle">jeu A</text>
  <text x="355" y="75" fill="${C.craie}" font-size="26" text-anchor="middle">jeu B</text>
  <rect x="30" y="95" width="190" height="210" rx="10" ${S}/>
  <rect x="260" y="95" width="190" height="210" rx="10" ${S}/>
  ${a}
  ${b}
  <text x="125" y="345" fill="${C.craie}" font-size="22" text-anchor="middle">12 tickets</text>
  <text x="355" y="345" fill="${C.craie}" font-size="22" text-anchor="middle">7 tickets</text>
  <text x="240" y="395" fill="${C.jaune}" font-size="22" text-anchor="middle">en jaune${NB}: ticket gagnant 🎟️</text>
  </svg>`;
};

// La roue : centre (240, 210), rayon 140. GAGNÉ de −90° à 30° (120°).
// Point à 30° : (240 + 140 cos 30°, 210 + 140 sin 30°) = (361,24 ; 280).
// PERDU : le reste, 240° (grand arc).
const roue = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue à deux cases : GAGNÉ occupe un angle de 120 degrés, PERDU le reste">
  <path d="M240 210 L240 70 A140 140 0 0 1 361.24 280 Z" fill="${C.rose}" fill-opacity=".35" stroke="${C.rose}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M240 210 L361.24 280 A140 140 0 1 1 240 70 Z" fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M225 38 L255 38 L240 64 Z" fill="${C.craie}"/>
  <text x="312" y="185" fill="${C.rose}" font-size="24" text-anchor="middle">GAGNÉ</text>
  <text x="262" y="128" fill="${C.rose}" font-size="20" text-anchor="middle">120°</text>
  <text x="170" y="258" fill="${C.bleu}" font-size="24" text-anchor="middle">PERDU</text>
  <text x="240" y="395" fill="${C.pale}" font-size="21" text-anchor="middle">Kevin${NB}: «${NB}une chance sur deux${NB}!${NB}»</text>
  </svg>`;

// L'arbre des deux lancers : racine (50, 210), puis P / F, puis P / F.
const arbre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un arbre : premier lancer pile ou face, puis deuxième lancer pile ou face">
  <text x="190" y="32" fill="${C.pale}" font-size="20" text-anchor="middle">1er lancer</text>
  <text x="360" y="32" fill="${C.pale}" font-size="20" text-anchor="middle">2e lancer</text>
  <circle cx="50" cy="210" r="7" fill="${C.craie}"/>
  <path d="M55 205 L170 120 M55 215 L170 300" stroke="${C.craie}" stroke-width="3"/>
  <path d="M210 105 L338 72 M210 118 L338 162 M210 302 L338 262 M210 315 L338 352" stroke="${C.craie}" stroke-width="3"/>
  <text x="190" y="120" fill="${C.jaune}" font-size="30" text-anchor="middle">P</text>
  <text x="190" y="320" fill="${C.bleu}" font-size="30" text-anchor="middle">F</text>
  <text x="360" y="80" fill="${C.jaune}" font-size="30" text-anchor="middle">P</text>
  <text x="360" y="172" fill="${C.bleu}" font-size="30" text-anchor="middle">F</text>
  <text x="360" y="272" fill="${C.jaune}" font-size="30" text-anchor="middle">P</text>
  <text x="360" y="362" fill="${C.bleu}" font-size="30" text-anchor="middle">F</text>
  <text x="435" y="225" font-size="34" text-anchor="middle">🎬</text>
  <text x="240" y="408" fill="${C.pale}" font-size="20" text-anchor="middle">P = pile, F = face</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "proba_experience",
  titre: "Énigmes sur les probabilités",
  description: "Le dé du cours d'EPS, le sac de perles, les cartes numérotées, la tombola de la chorale, le piège de la roue, le défi des deux lancers de pièce.",
  problemes: [
    {
      tag: "Énigme 1 · Au gymnase",
      titre: "Le dé de l'atelier",
      question: `En EPS, Mme Diallo lance un dé équilibré à 6 faces.<br>Si le dé montre 5 ou 6, on fait de la corde à sauter.<br><br>Quelle est la <b>probabilité</b> de faire de la corde à sauter ?`,
      reponse: `Les issues : 1, 2, 3, 4, 5, 6. Il y en a 6, toutes aussi probables.<br>L'événement « 5 ou 6 » est réalisé par 2 issues.<br>Probabilité : ${frac(2, 6)} = <span class="big">${frac(1, 3)}</span>.<br>Une fois sur trois environ, on saute à la corde.`,
      consigne: "Quelle est la probabilité de faire de la corde à sauter ? (écris une fraction, par exemple 1/4)",
      verification: { type: "courte", attendus: ["1/3", "2/6"] },
      dessin: de(),
    },
    {
      tag: "Énigme 2 · L'atelier bijoux",
      titre: "La perle du bracelet",
      question: `Jade fabrique un bracelet.<br>Son sac contient 5 perles roses, 3 bleues et 2 jaunes.<br>Elle tire une perle au hasard.<br><br>Quelle est la probabilité que la perle <b>ne soit pas bleue</b> ?`,
      reponse: `Il y a 5 + 3 + 2 = 10 perles.<br>« Pas bleue » est le contraire de « bleue ».<br>P(bleue) = ${frac(3, 10)}, donc P(pas bleue) = 1 − ${frac(3, 10)} = <span class="big">${frac(7, 10)}</span>.<br>Vérification : 5 roses + 2 jaunes = 7 perles sur 10.`,
      consigne: "Quelle est la probabilité que la perle ne soit pas bleue ?",
      verification: { type: "qcm", choix: ["3/10", "7/10", "7/3"], bonne: 1 },
      dessin: perles(),
    },
    {
      tag: "Énigme 3 · Le jeu de cartes",
      titre: "Un multiple de 4",
      question: `Mila a 20 cartes numérotées de 1 à 20.<br>Elle en pioche une au hasard.<br><br>Quelle est la probabilité d'obtenir un <b>multiple de 4</b> ?<br>Donne-la <b>en pourcentage</b>.`,
      reponse: `Les multiples de 4 : 4, 8, 12, 16, 20. Cela fait 5 cartes.<br>Probabilité : ${frac(5, 20)} = ${frac(1, 4)} = 0,25.<br>En pourcentage : <span class="big">25 %</span>.`,
      consigne: "Quelle est la probabilité d'obtenir un multiple de 4, en pourcentage ?",
      verification: { type: "courte", attendus: ["25"], unite: "%" },
      dessin: cartes(),
    },
    {
      tag: "Énigme 4 · La chorale",
      titre: "La tombola",
      question: `À la tombola de la chorale, il y a deux jeux.<br>Jeu A : 12 tickets, dont 3 gagnants.<br>Jeu B : 7 tickets, dont 2 gagnants.<br><br>Dans quel jeu a-t-on <b>le plus de chances</b> de gagner ?`,
      reponse: `Jeu A : ${frac(3, 12)} = ${frac(1, 4)}. Jeu B : ${frac(2, 7)}.<br>Même dénominateur 28 : ${frac(1, 4)} = ${frac(7, 28)} et ${frac(2, 7)} = ${frac(8, 28)}.<br>${frac(8, 28)} est plus grand : <span class="big">le jeu B</span>.<br>Autre façon : 0,25 contre environ 0,29.`,
      consigne: "Dans quel jeu a-t-on le plus de chances de gagner ?",
      verification: { type: "qcm", choix: ["Le jeu B", "Le jeu A", "Autant dans les deux"], bonne: 0 },
      dessin: tombola(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La roue de Kevin",
      sorte: "piege",
      question: `Une roue a deux cases : GAGNÉ et PERDU.<br>La case GAGNÉ fait un angle de <b>120°</b>.<br>Kevin dit : « 2 cases, donc une chance sur deux. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Les deux cases n'ont pas la même taille : elles ne sont pas équiprobables.<br>Le tour complet fait 360°. GAGNÉ en prend 120°.<br>P(GAGNÉ) = ${frac(120, 360)} = <span class="big">${frac(1, 3)}</span>.<br>Et P(PERDU) = ${frac(2, 3)}.`,
      consigne: "Quelle est la probabilité de tomber sur GAGNÉ ?",
      verification: { type: "qcm", choix: ["1/2", "2/3", "1/3"], bonne: 2 },
      dessin: roue(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Qui choisit le film ?",
      sorte: "defi",
      question: `Léa et Sami lancent une pièce <b>deux fois</b> pour choisir le film.<br>Si Pile sort au moins une fois, Sami choisit.<br>Sinon, c'est Léa.<br><br>Quelle est la probabilité que <b>Sami</b> choisisse ?`,
      reponse: `L'arbre donne 4 issues, toutes aussi probables : PP, PF, FP, FF.<br>Pile sort au moins une fois dans PP, PF et FP : 3 issues.<br>P(Sami) = <span class="big">${frac(3, 4)}</span>, soit 75 %.<br>Léa n'a que ${frac(1, 4)} : le jeu n'est pas équitable !`,
      consigne: "Quelle est la probabilité que Sami choisisse le film ? (écris une fraction)",
      verification: { type: "courte", attendus: ["3/4", "0,75", "75%"] },
      dessin: arbre(),
    },
  ],
};

export default problemes;
