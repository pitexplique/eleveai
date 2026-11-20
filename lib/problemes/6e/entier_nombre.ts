// Énigmes à projeter — 6e, notion entier_nombre (écrire en chiffres un grand
// nombre dit en lettres, le rang d'un chiffre, ranger des scores, décomposer
// avec des cartons, le piège du nombre de centaines, le défi des cartes).
// 20/11/2026. Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = "\u00a0";
/** Un nombre à la française : espace insécable entre les classes. */
const n = (x: number) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, NB);

// Le fossile : une ammonite (spirale) et le tableau des classes, vide.
const fossile = () => {
  let pts = "";
  for (let k = 0; k <= 160; k++) {
    const t = (k / 160) * 4 * Math.PI;
    const r = 5 + 5.2 * t;
    pts += `${k ? "L" : "M"}${(240 + r * Math.cos(t)).toFixed(1)} ${(110 + r * Math.sin(t)).toFixed(1)} `;
  }
  const groupes = [
    { x: 45, nom: "millions" },
    { x: 180, nom: "milliers" },
    { x: 315, nom: "unités" },
  ];
  let s = "";
  for (const g of groupes) {
    s += `<text x="${g.x + 60}" y="210" fill="${C.bleu}" font-size="22" text-anchor="middle">${g.nom}</text>`;
    ["c", "d", "u"].forEach((l, i) => {
      s += `<text x="${g.x + 20 + 40 * i}" y="240" fill="${C.pale}" font-size="20" text-anchor="middle">${l}</text>`;
      s += `<rect x="${g.x + 40 * i}" y="250" width="40" height="50" fill="none" stroke="${C.craie}" stroke-width="2"/>`;
    });
    s += `<rect x="${g.x}" y="250" width="120" height="50" fill="none" stroke="${C.bleu}" stroke-width="4"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un fossile en spirale et un tableau des classes vide : millions, milliers, unités">
  <path d="${pts}" fill="none" stroke="${C.jaune}" stroke-width="4" stroke-linecap="round"/>
  ${s}
  <text x="240" y="370" fill="${C.rose}" font-size="24" text-anchor="middle">Écris le nombre en chiffres.</text>
  </svg>`;
};

// Le compteur de la voiture : 235 748 km, un chiffre par case.
const compteur = () => {
  let s = "";
  "235748".split("").forEach((ch, i) => {
    const x = 75 + 50 * i;
    s += `<rect x="${x}" y="150" width="50" height="70" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="${x + 25}" y="200" fill="${C.craie}" font-size="40" text-anchor="middle">${ch}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le compteur d'une voiture qui affiche 235 748 kilomètres">
  <text x="240" y="100" font-size="60" text-anchor="middle">🚗</text>
  <rect x="60" y="135" width="330" height="100" rx="12" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  ${s}
  <text x="410" y="200" fill="${C.craie}" font-size="30">km</text>
  <text x="240" y="320" fill="${C.rose}" font-size="24" text-anchor="middle">Le chiffre des dizaines de mille${NB}?</text>
  </svg>`;
};

// Le tableau des scores : trois joueurs, scores alignés à droite.
const scores = () => {
  const lignes = [
    ["Inès", 98750],
    ["Tom", 102300],
    ["Lila", 99980],
  ] as const;
  let s = "";
  lignes.forEach(([nom, sc], i) => {
    const y = 160 + 70 * i;
    s += `<text x="90" y="${y}" fill="${C.bleu}" font-size="30">${nom}</text>`;
    s += `<text x="400" y="${y}" fill="${C.craie}" font-size="30" text-anchor="end">${n(sc)}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau des scores de trois joueurs : Inès, Tom et Lila">
  <text x="240" y="75" font-size="44" text-anchor="middle">🎮</text>
  <rect x="60" y="110" width="360" height="210" rx="12" fill="none" stroke="${C.craie}" stroke-width="4"/>
  ${s}
  <text x="240" y="375" fill="${C.rose}" font-size="24" text-anchor="middle">Range du plus petit au plus grand.</text>
  </svg>`;
};

// L'imprimerie : 3 cartons de 10 000, 7 paquets de 100, 5 affiches seules.
const imprimerie = () => {
  let s = "";
  for (let i = 0; i < 3; i++) {
    const x = 50 + 140 * i;
    s += `<rect x="${x}" y="50" width="100" height="80" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="${x + 50}" y="98" fill="${C.craie}" font-size="22" text-anchor="middle">${n(10000)}</text>`;
  }
  for (let i = 0; i < 7; i++) {
    const x = 65 + 50 * i;
    s += `<rect x="${x}" y="175" width="40" height="55" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="2"/>`;
    s += `<text x="${x + 20}" y="210" fill="${C.craie}" font-size="20" text-anchor="middle">100</text>`;
  }
  for (let i = 0; i < 5; i++) {
    const x = 150 + 40 * i;
    s += `<rect x="${x}" y="275" width="26" height="36" fill="none" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois cartons de 10 000 affiches, sept paquets de 100 affiches et cinq affiches seules">
  ${s}
  <text x="240" y="160" fill="${C.pale}" font-size="20" text-anchor="middle">cartons</text>
  <text x="240" y="258" fill="${C.pale}" font-size="20" text-anchor="middle">paquets</text>
  <text x="240" y="340" fill="${C.pale}" font-size="20" text-anchor="middle">affiches seules</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">Combien d'affiches en tout${NB}?</text>
  </svg>`;
};

// Le verger : 4 352 pommes, des cagettes de 100, et ce que dit Sami.
const verger = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tas de pommes et une cagette de cent pommes">
  <text x="240" y="70" fill="${C.craie}" font-size="32" text-anchor="middle">${n(4352)} pommes 🍎</text>
  <rect x="140" y="110" width="200" height="90" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4"/>
  <path d="M140 140 L340 140 M140 170 L340 170" stroke="${C.craie}" stroke-width="2"/>
  <text x="240" y="240" fill="${C.craie}" font-size="24" text-anchor="middle">1 cagette = 100 pommes</text>
  <text x="240" y="310" fill="${C.bleu}" font-size="24" text-anchor="middle">Sami dit${NB}: 3 cagettes pleines.</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// Les cinq cartes : 4, 0, 9, 2, 7.
const cartes = () => {
  let s = "";
  [4, 0, 9, 2, 7].forEach((ch, i) => {
    const x = 50 + 80 * i;
    s += `<rect x="${x}" y="90" width="64" height="90" rx="8" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="3"/>`;
    s += `<text x="${x + 32}" y="152" fill="${C.craie}" font-size="48" text-anchor="middle">${ch}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Cinq cartes avec les chiffres 4, 0, 9, 2 et 7">
  <text x="240" y="55" fill="${C.pale}" font-size="22" text-anchor="middle">chaque carte, une seule fois</text>
  ${s}
  <text x="240" y="260" fill="${C.craie}" font-size="26" text-anchor="middle">le plus grand nombre</text>
  <text x="240" y="300" fill="${C.rose}" font-size="26" text-anchor="middle">plus petit que ${n(50000)}</text>
  <text x="240" y="370" fill="${C.pale}" font-size="30" text-anchor="middle">_ _ _ _ _</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "entier_nombre",
  titre: "Énigmes sur les grands nombres",
  description: "Le fossile du musée, le compteur de la voiture, les scores du jeu vidéo, les affiches de l'imprimerie, le piège des cagettes de pommes, le défi des cinq cartes.",
  problemes: [
    {
      tag: "Énigme 1 · Au musée",
      titre: "L'âge du fossile",
      question: `Yanis visite un musée.<br>Une pancarte dit : ce fossile a<br><b>trois millions cinq cent quatre mille ans</b>.<br><br>Écris cet âge <b>en chiffres</b>.`,
      reponse: `On remplit le tableau, classe par classe.<br>Classe des millions : <b>3</b>.<br>Classe des milliers : cinq cent quatre, donc <b>504</b>.<br>Classe des unités : rien, donc <b>000</b>.<br>Le fossile a <span class="big">${n(3504000)} ans</span>.`,
      consigne: "Écris en chiffres : trois millions cinq cent quatre mille.",
      verification: { type: "courte", attendus: ["3504000"], unite: "ans" },
      dessin: fossile(),
    },
    {
      tag: "Énigme 2 · En voiture",
      titre: "Le compteur",
      question: `Le compteur de la voiture de Karim affiche <b>${n(235748)} km</b>.<br><br>Quel est le <b>chiffre des dizaines de mille</b> ?`,
      reponse: `On lit la classe des milliers : 235.<br>2 : centaines de mille. 3 : dizaines de mille. 5 : unités de mille.<br>Le chiffre des dizaines de mille est <span class="big">3</span>.`,
      consigne: "Dans 235 748, quel est le chiffre des dizaines de mille ?",
      verification: { type: "qcm", choix: ["5", "3", "2"], bonne: 1 },
      dessin: compteur(),
    },
    {
      tag: "Énigme 3 · Au jeu vidéo",
      titre: "Les meilleurs scores",
      question: `Trois amis jouent au même jeu.<br>Inès : <b>${n(98750)}</b>. Tom : <b>${n(102300)}</b>. Lila : <b>${n(99980)}</b>.<br><br>Range les joueurs du <b>plus petit</b> score au <b>plus grand</b>.`,
      reponse: `Tom a 6 chiffres, les autres 5. Tom a le plus grand score.<br>Inès et Lila : même chiffre des dizaines de mille, 9.<br>Chiffre des unités de mille : 8 pour Inès, 9 pour Lila. Donc ${n(98750)} &lt; ${n(99980)}.<br>L'ordre : <span class="big">Inès, Lila, Tom</span>.`,
      consigne: "Range les joueurs du plus petit score au plus grand.",
      verification: { type: "qcm", choix: ["Lila, Inès, Tom", "Tom, Lila, Inès", "Inès, Lila, Tom"], bonne: 2 },
      dessin: scores(),
    },
    {
      tag: "Énigme 4 · À l'imprimerie",
      titre: "Les affiches",
      question: `L'imprimerie livre des affiches.<br><b>3 cartons</b> de ${n(10000)} affiches.<br><b>7 paquets</b> de 100 affiches.<br>Et <b>5 affiches</b> seules.<br><br>Combien d'affiches en tout ?`,
      reponse: `Cartons : 3 × ${n(10000)} = ${n(30000)}.<br>Paquets : 7 × 100 = 700.<br>On ajoute : ${n(30000)} + 700 + 5 = ${n(30705)}.<br>Attention : 0 millier et 0 dizaine, on écrit les zéros.<br>Il y a <span class="big">${n(30705)} affiches</span>.`,
      consigne: "Combien d'affiches en tout ?",
      verification: { type: "courte", attendus: ["30705"], unite: "affiches" },
      dessin: imprimerie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les cagettes de pommes",
      sorte: "piege",
      question: `Au verger, on a cueilli <b>${n(4352)} pommes</b>.<br>On les range par <b>100</b> dans des cagettes.<br>Sami dit : « Le chiffre des centaines est 3. Donc 3 cagettes pleines. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! 3 cagettes, c'est seulement 300 pommes.<br>Le <b>chiffre</b> des centaines est 3. Mais le <b>nombre</b> de centaines est 43.<br>Vérifie : 43 × 100 = ${n(4300)}. Il reste 52 pommes, moins de 100.<br>On remplit <span class="big">43 cagettes</span>.`,
      consigne: "Combien de cagettes de 100 pommes sont pleines avec 4 352 pommes ?",
      verification: { type: "qcm", choix: ["43 cagettes", "3 cagettes", "435 cagettes"], bonne: 0 },
      dessin: verger(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les cinq cartes",
      sorte: "defi",
      question: `Tu as 5 cartes : <b>4, 0, 9, 2, 7</b>.<br>Tu utilises chaque carte une seule fois.<br><br>Écris le <b>plus grand nombre</b> possible<br>qui reste <b>plus petit que ${n(50000)}</b>.`,
      reponse: `5 cartes : un nombre à 5 chiffres.<br>Pour rester sous ${n(50000)}, le premier chiffre est plus petit que 5. Le plus grand possible : <b>4</b>.<br>Ensuite, les autres du plus grand au plus petit : 9, 7, 2, 0.<br>Le nombre est <span class="big">${n(49720)}</span>.`,
      consigne: "Avec 4, 0, 9, 2, 7 : le plus grand nombre plus petit que 50 000 ?",
      verification: { type: "courte", attendus: ["49720"] },
      dessin: cartes(),
    },
  ],
};

export default problemes;
