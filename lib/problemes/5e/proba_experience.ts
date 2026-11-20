// Énigmes à projeter — 5e, notion proba_experience (vocabulaire,
// probabilité d'un événement simple). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;

// Un dé vu de face (points du 1 au 6 selon n).
const de = (x: number, y: number, n: number, c: string = C.craie) => {
  const p: Record<number, [number, number][]> = {
    1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  return `<rect x="${x - 45}" y="${y - 45}" width="90" height="90" rx="14" fill="none" stroke="${c}" stroke-width="4"/>` +
    p[n].map(([a, b]) => `<circle cx="${x + 24 * a}" cy="${y + 24 * b}" r="8" fill="${c}"/>`).join("");
};

const deSix = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un dé à six faces">
  ${de(100, 140, 1)}${de(240, 140, 2)}${de(380, 140, 3)}
  ${de(100, 270, 4)}${de(240, 270, 5)}${de(380, 270, 6, C.rose)}
  ${etiq(240, 385, "P(obtenir 6) = ?", C.rose, 28)}
  </svg>`;

// Un sac : 3 rouges, 5 bleues, 2 vertes (en jaune sur le dessin, la palette n'a pas de vert).
const sac = () => {
  const boules: [number, number, string][] = [
    [170, 230, C.rose], [215, 210, C.rose], [260, 235, C.rose], [190, 280, C.bleu], [240, 275, C.bleu],
    [290, 280, C.bleu], [305, 230, C.bleu], [215, 320, C.bleu], [265, 320, C.jaune], [160, 320, C.jaune],
  ];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un sac avec 3 boules rouges, 5 bleues et 2 jaunes">
  <path d="M150 150 Q110 360 150 370 L330 370 Q370 360 330 150 Z" fill="${C.pale}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M150 150 Q240 120 330 150" stroke="${C.craie}" stroke-width="4" fill="none"/>
  ${boules.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="20" fill="${c}" fill-opacity=".6" stroke="${c}" stroke-width="3"/>`).join("")}
  ${etiq(240, 70, "on tire une boule au hasard", C.craie, 24)}
  ${etiq(240, 410, "3 rouges · 5 bleues · 2 jaunes", C.pale, 20)}
  </svg>`;
};

const impossible = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un dé à six faces et trois événements">
  ${de(240, 150, 5)}
  ${etiq(240, 270, "on lance un dé à 6 faces", C.craie, 24)}
  ${etiq(240, 330, "lequel est impossible ?", C.rose, 28)}
  </svg>`;

// Un jeu de 32 cartes : 4 couleurs de 8 cartes.
const cartes = () => {
  const coul: [string, string][] = [["♥", C.rose], ["♦", C.rose], ["♣", C.craie], ["♠", C.craie]];
  let s = "";
  coul.forEach(([sym, c], i) => {
    for (let k = 0; k < 8; k++) s += `<rect x="${40 + 48 * k}" y="${60 + 75 * i}" width="40" height="60" rx="5" fill="none" stroke="${C.pale}" stroke-width="2"/><text x="${60 + 48 * k}" y="${100 + 75 * i}" fill="${c}" font-size="24" text-anchor="middle">${sym}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un jeu de 32 cartes : 8 cœurs, 8 carreaux, 8 trèfles, 8 piques">
  ${s}
  ${etiq(240, 395, "P(tirer un cœur) = ?", C.rose, 26)}
  </svg>`;
};

const piece = (x: number, y: number, t: string, c: string) =>
  `<circle cx="${x}" cy="${y}" r="34" fill="${c}" fill-opacity=".25" stroke="${c}" stroke-width="4"/>` + etiq(x, y + 8, t, C.craie, 22);
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Cinq lancers qui ont donné pile, et un sixième lancer inconnu">
  ${[0, 1, 2, 3, 4].map((i) => piece(60 + 75 * i, 170, "P", C.jaune)).join("")}
  <circle cx="435" cy="170" r="34" fill="none" stroke="${C.rose}" stroke-width="4" stroke-dasharray="8 6"/>
  ${etiq(435, 180, "?", C.rose, 30)}
  ${etiq(240, 80, "5 fois pile de suite…", C.craie, 26)}
  ${etiq(240, 290, "« Cette fois, ce sera face, c'est sûr ! »", C.rose, 24)}
  </svg>`;

const deuxPieces = () => `<svg viewBox="0 0 480 420" role="img" aria-label="On lance deux pièces en même temps">
  ${piece(160, 150, "?", C.jaune)}${piece(320, 150, "?", C.bleu)}
  ${etiq(160, 220, "pièce 1", C.jaune, 22)}${etiq(320, 220, "pièce 2", C.bleu, 22)}
  ${etiq(240, 300, "P(pile et pile) = ?", C.rose, 30)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "proba_experience",
  titre: "Énigmes de probabilités",
  description: "Probabilités en 5e : obtenir 6 avec un dé, tirer une boule bleue, événement impossible, tirer un cœur, piège des cinq piles, deux pièces à la fois. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le dé",
      titre: "Obtenir un 6",
      question: `On lance un dé équilibré à <b>6 faces</b>.<br><br><b>Quelle est la probabilité</b> d'obtenir un 6 ?`,
      reponse: `Il y a 6 issues, toutes avec la même chance. Une seule donne 6.<br>La probabilité est <span class="big">${frac(1, 6)}</span>.`,
      consigne: "Quelle est la probabilité d'obtenir 6 ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["1/6"] },
      dessin: deSix(),
    },
    {
      tag: "Énigme 2 · Le sac de boules",
      titre: "Une boule bleue",
      question: `Un sac contient <b>3 boules rouges</b>, <b>5 bleues</b> et <b>2 jaunes</b>.<br>On tire une boule au hasard.<br><br><b>Quelle est la probabilité</b> qu'elle soit bleue ?`,
      reponse: `Il y a 3 + 5 + 2 = 10 boules, dont 5 bleues.<br>P = ${frac(5, 10)} = <span class="big">${frac(1, 2)}</span> : une chance sur deux.`,
      consigne: "Quelle est la probabilité de tirer une boule bleue ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["1/2", "5/10", "0,5"] },
      dessin: sac(),
    },
    {
      tag: "Énigme 3 · Le vocabulaire",
      titre: "L'événement impossible",
      question: `On lance un dé à 6 faces.<br><br><b>Quel événement est impossible ?</b>`,
      reponse: `Les faces vont de 1 à 6 : on ne peut jamais obtenir 7.<br><span class="big">« Obtenir 7 »</span> est impossible : sa probabilité est 0.`,
      consigne: "Quel événement est impossible ?",
      verification: { type: "qcm", choix: ["Obtenir 7", "Obtenir un nombre pair", "Obtenir 1"], bonne: 0 },
      dessin: impossible(),
    },
    {
      tag: "Énigme 4 · Le jeu de cartes",
      titre: "Tirer un cœur",
      question: `Un jeu de <b>32 cartes</b> contient <b>8 cœurs</b>.<br>On tire une carte au hasard.<br><br><b>Quelle est la probabilité</b> de tirer un cœur ?`,
      reponse: `8 cœurs sur 32 cartes : P = ${frac(8, 32)} = <span class="big">${frac(1, 4)}</span>.`,
      consigne: "Quelle est la probabilité de tirer un cœur ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["1/4", "8/32", "0,25"] },
      dessin: cartes(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Cinq piles de suite",
      sorte: "piege",
      question: `Une pièce équilibrée est tombée <b>5 fois sur pile</b>.<br>Jules dit : « La prochaine fois, ce sera face, c'est sûr ! »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! La pièce n'a pas de mémoire.<br>Au 6<sup>e</sup> lancer, c'est toujours <span class="big">${frac(1, 2)} pour pile et ${frac(1, 2)} pour face</span>.`,
      consigne: "Que peut-on dire du 6e lancer ?",
      verification: { type: "qcm", choix: ["Face est plus probable", "Une chance sur 2 pour chacun", "Pile est plus probable"], bonne: 1 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Deux pièces à la fois",
      sorte: "defi",
      question: `On lance <b>deux pièces</b> en même temps.<br><br><b>Quelle est la probabilité</b> d'obtenir pile et pile ?`,
      reponse: `Les issues : PP, PF, FP, FF. Il y en a 4, avec la même chance. Une seule est PP.<br>P = <span class="big">${frac(1, 4)}</span>. (Pas ${frac(1, 3)} : PF et FP sont deux issues différentes.)`,
      consigne: "Quelle est la probabilité d'obtenir pile et pile ?",
      verification: { type: "qcm", choix: ["1/2", "1/3", "1/4"], bonne: 2 },
      dessin: deuxPieces(),
    },
  ],
};

export default problemes;
