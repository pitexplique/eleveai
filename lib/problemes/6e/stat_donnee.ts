// Énigmes à projeter — 6e, notion stat_donnee (lire un diagramme en barres,
// lire un diagramme circulaire, prélever dans un tableau, comparer deux
// données, le piège de l'axe qui ne commence pas à 0, le défi de la barre
// effacée). 20/11/2026. Phrases courtes (les 6e lisent difficilement).
// ⛔ Les barres sont calculées depuis les valeurs : hauteurs exactes.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const n = (x: number) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, NB);

type Barre = { nom: string[]; v: number | null; vraie?: number };

/** Diagramme en barres : axe de `min` à `max`, graduation tous les `pas`,
 *  lignes fines tous les `fin`. Origine (80, 360), haut de l'axe y = 60. */
const barres = (titre: string, min: number, max: number, pas: number, fin: number, data: Barre[], label: string) => {
  const ech = 300 / (max - min);
  const y = (v: number) => 360 - (v - min) * ech;
  let s = "";
  for (let v = min; v <= max + 1e-9; v += fin) {
    s += `<path d="M80 ${y(v)} L440 ${y(v)}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".5"/>`;
  }
  for (let v = min; v <= max + 1e-9; v += pas) {
    s += `<path d="M72 ${y(v)} L80 ${y(v)}" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="66" y="${y(v) + 7}" fill="${C.craie}" font-size="20" text-anchor="end">${v}</text>`;
  }
  const larg = 60, ecart = (360 - 20) / data.length;
  data.forEach((b, i) => {
    const x = 90 + ecart * i + (ecart - larg) / 2;
    if (b.v === null) {
      s += `<rect x="${x}" y="200" width="${larg}" height="160" fill="none" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6"/>`;
      s += `<text x="${x + larg / 2}" y="290" fill="${C.rose}" font-size="36" text-anchor="middle">?</text>`;
    } else {
      s += `<rect x="${x}" y="${y(b.v)}" width="${larg}" height="${360 - y(b.v)}" fill="${C.bleu}" fill-opacity=".45" stroke="${C.bleu}" stroke-width="3"/>`;
    }
    b.nom.forEach((l, k) => {
      s += `<text x="${x + larg / 2}" y="${388 + 22 * k}" fill="${C.craie}" font-size="20" text-anchor="middle">${l}</text>`;
    });
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="${label}">
  <text x="260" y="35" fill="${C.craie}" font-size="22" text-anchor="middle">${titre}</text>
  ${s}
  <path d="M80 50 L80 360 L445 360" fill="none" stroke="${C.craie}" stroke-width="3"/>
  </svg>`;
};

// Les oiseaux du jardin : merle 6, moineau 14, mésange 10, pigeon 4.
const oiseaux = () =>
  barres("Oiseaux comptés 🐦", 0, 16, 2, 2, [
    { nom: ["merle"], v: 6 },
    { nom: ["moineau"], v: 14 },
    { nom: ["mésange"], v: 10 },
    { nom: ["pigeon"], v: 4 },
  ], "Un diagramme en barres des oiseaux comptés dans le jardin, axe gradué de 2 en 2");

// L'atelier de musique : 20 élèves, guitare la moitié, piano et batterie un quart.
const musique = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un diagramme circulaire : guitare, piano et batterie">
  <path d="M170 210 L170 70 A140 140 0 0 1 170 350 Z" fill="${C.bleu}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M170 210 L170 350 A140 140 0 0 1 30 210 Z" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M170 210 L30 210 A140 140 0 0 1 170 70 Z" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <text x="245" y="218" fill="${C.craie}" font-size="22" text-anchor="middle">guitare</text>
  <text x="113" y="275" fill="${C.craie}" font-size="22" text-anchor="middle">piano</text>
  <text x="113" y="160" fill="${C.craie}" font-size="22" text-anchor="middle">batterie</text>
  <text x="395" y="190" fill="${C.craie}" font-size="26" text-anchor="middle">20 élèves</text>
  <text x="395" y="240" font-size="40" text-anchor="middle">🎵</text>
  <text x="395" y="300" fill="${C.rose}" font-size="26" text-anchor="middle">piano${NB}?</text>
  </svg>`;

// Le refuge : tableau à double entrée (chiens, chats) × (janvier, février, mars).
const refuge = () => {
  const cols = ["janvier", "février", "mars"];
  const lignes: [string, number[]][] = [
    ["🐶 chiens", [7, 5, 9]],
    ["🐱 chats", [4, 8, 6]],
  ];
  let s = "";
  cols.forEach((c, j) => {
    s += `<text x="${210 + 100 * j}" y="128" fill="${C.bleu}" font-size="20" text-anchor="middle">${c}</text>`;
  });
  lignes.forEach(([nom, vals], i) => {
    const y = 150 + 60 * i;
    s += `<text x="95" y="${y + 38}" fill="${C.craie}" font-size="22" text-anchor="middle">${nom}</text>`;
    vals.forEach((v, j) => {
      s += `<text x="${210 + 100 * j}" y="${y + 40}" fill="${C.craie}" font-size="28" text-anchor="middle">${v}</text>`;
    });
  });
  let g = "";
  [90, 150, 210, 270].forEach((y) => (g += `<path d="M30 ${y} L460 ${y}" stroke="${C.craie}" stroke-width="2"/>`));
  [30, 160, 260, 360, 460].forEach((x) => (g += `<path d="M${x} 90 L${x} 270" stroke="${C.craie}" stroke-width="2"/>`));
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau des chiens et des chats adoptés en janvier, février et mars">
  <text x="240" y="55" fill="${C.craie}" font-size="24" text-anchor="middle">Animaux adoptés au refuge</text>
  ${g}
  ${s}
  <text x="240" y="340" fill="${C.rose}" font-size="24" text-anchor="middle">Chats adoptés en février${NB}?</text>
  </svg>`;
};

// Le podomètre d'Awa : lundi 8 400, mardi 6 900, mercredi 11 200 pas.
const pas = () => {
  const lignes: [string, number][] = [
    ["lundi", 8400],
    ["mardi", 6900],
    ["mercredi", 11200],
  ];
  let s = "";
  lignes.forEach(([j, v], i) => {
    const y = 160 + 60 * i;
    s += `<text x="150" y="${y + 40}" fill="${C.craie}" font-size="26" text-anchor="middle">${j}</text>`;
    s += `<text x="380" y="${y + 40}" fill="${C.craie}" font-size="28" text-anchor="end">${n(v)}</text>`;
  });
  let g = "";
  [100, 160, 220, 280, 340].forEach((y) => (g += `<path d="M50 ${y} L430 ${y}" stroke="${C.craie}" stroke-width="2"/>`));
  [50, 250, 430].forEach((x) => (g += `<path d="M${x} 100 L${x} 340" stroke="${C.craie}" stroke-width="2"/>`));
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau du nombre de pas d'Awa lundi, mardi et mercredi">
  <text x="240" y="70" font-size="40" text-anchor="middle">👟</text>
  ${g}
  <text x="150" y="140" fill="${C.bleu}" font-size="22" text-anchor="middle">jour</text>
  <text x="340" y="140" fill="${C.bleu}" font-size="22" text-anchor="middle">nombre de pas</text>
  ${s}
  <text x="240" y="390" fill="${C.rose}" font-size="24" text-anchor="middle">Mercredi, combien de plus que mardi${NB}?</text>
  </svg>`;
};

// La mascotte : axe de 50 à 58 (il ne commence PAS à 0). Tornade 52, Éclair 56.
// Hauteurs : 2 × 37,5 = 75 px et 6 × 37,5 = 225 px : la barre semble 3 fois plus haute.
const mascotte = () =>
  barres(`Hugo${NB}: «${NB}3 fois plus${NB}!${NB}»`, 50, 58, 2, 2, [
    { nom: ["Tornade"], v: 52 },
    { nom: ["Éclair"], v: 56 },
  ], "Un diagramme en barres des votes pour Tornade et Éclair, axe gradué de 50 à 58");

// Les sorties : 28 élèves. Piscine 9, zoo 7, cinéma 4, accrobranche effacée (8).
const sorties = () =>
  barres("28 élèves, 1 vote chacun", 0, 10, 2, 1, [
    { nom: ["piscine"], v: 9 },
    { nom: ["zoo"], v: 7 },
    { nom: ["cinéma"], v: 4 },
    { nom: ["accro-", "branche"], v: null },
  ], "Un diagramme en barres des sorties choisies par 28 élèves, la barre de l'accrobranche est effacée");

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "stat_donnee",
  titre: "Énigmes sur les tableaux et graphiques",
  description: "Les oiseaux du jardin, l'atelier de musique, le refuge pour animaux, le podomètre d'Awa, le piège du vote de la mascotte, le défi de la barre effacée.",
  problemes: [
    {
      tag: "Énigme 1 · Au jardin",
      titre: "Les oiseaux",
      question: `Chloé compte les oiseaux du jardin.<br>Elle trace un <b>diagramme en barres</b>.<br><br>Combien de <b>moineaux</b> a-t-elle comptés ?`,
      reponse: `On cherche la barre « moineau ».<br>Son sommet arrive entre 12 et 16, sur la ligne 14.<br>L'axe monte de 2 en 2 : 0, 2, 4… 12, 14.<br>Chloé a compté <span class="big">14 moineaux</span>.`,
      consigne: "Combien de moineaux Chloé a-t-elle comptés ?",
      verification: { type: "courte", attendus: ["14"], unite: "moineaux" },
      dessin: oiseaux(),
    },
    {
      tag: "Énigme 2 · En musique",
      titre: "L'atelier de musique",
      question: `L'atelier de musique a <b>20 élèves</b>.<br>Chacun choisit un instrument.<br>Le <b>diagramme circulaire</b> montre leurs choix.<br><br>Combien d'élèves ont choisi le <b>piano</b> ?`,
      reponse: `La guitare prend la moitié du disque.<br>Le piano prend un quart du disque.<br>Un quart de 20 : 20 ÷ 4 = 5.<br>Vérifie : guitare 10, piano 5, batterie 5. 10 + 5 + 5 = 20.<br><span class="big">5 élèves</span> ont choisi le piano.`,
      consigne: "Combien d'élèves ont choisi le piano ?",
      verification: { type: "qcm", choix: ["10 élèves", "4 élèves", "5 élèves"], bonne: 2 },
      dessin: musique(),
    },
    {
      tag: "Énigme 3 · Au refuge",
      titre: "Les adoptions",
      question: `Un refuge note ses adoptions dans un <b>tableau</b>.<br><br>Combien de <b>chats</b> ont été adoptés en <b>février</b> ?`,
      reponse: `On prend la ligne des chats.<br>On prend la colonne de février.<br>La case où elles se croisent : 8.<br>Attention : 5, c'est la ligne des chiens.<br><span class="big">8 chats</span> ont été adoptés en février.`,
      consigne: "Combien de chats ont été adoptés en février ?",
      verification: { type: "courte", attendus: ["8"], unite: "chats" },
      dessin: refuge(),
    },
    {
      tag: "Énigme 4 · En sciences",
      titre: "Le podomètre d'Awa",
      question: `Awa porte un podomètre.<br>Il compte ses pas chaque jour.<br><br>Mercredi, combien de pas a-t-elle faits <b>de plus</b> que mardi ?`,
      reponse: `Mercredi : ${n(11200)} pas. Mardi : ${n(6900)} pas.<br>On calcule l'écart : ${n(11200)} − ${n(6900)} = ${n(4300)}.<br>Vérifie : ${n(6900)} + ${n(4300)} = ${n(11200)}.<br>Mercredi, Awa a fait <span class="big">${n(4300)} pas</span> de plus.`,
      consigne: "Mercredi, combien de pas de plus que mardi ?",
      verification: { type: "qcm", choix: ["4 300 pas", "5 700 pas", "4 700 pas"], bonne: 0 },
      dessin: pas(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vote de la mascotte",
      sorte: "piege",
      question: `Le collège vote pour le nom de sa mascotte.<br>Hugo regarde le graphique.<br>Il dit : « Éclair a 3 fois plus de votes que Tornade ! »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Regarde l'axe : il commence à <b>50</b>, pas à 0.<br>Tornade : 52 votes. Éclair : 56 votes.<br>Écart : 56 − 52 = 4. Et 3 × 52 = 156, très loin de 56.<br>Éclair a seulement <span class="big">4 votes de plus</span>.`,
      consigne: "Hugo dit : « 3 fois plus de votes ». A-t-il raison ?",
      verification: { type: "qcm", choix: ["Oui : 3 fois plus de votes", "Non : 4 votes de plus", "Non : 6 votes de plus"], bonne: 1 },
      dessin: mascotte(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La barre effacée",
      sorte: "defi",
      question: `<b>28 élèves</b> votent pour la sortie de fin d'année.<br>Chacun vote une seule fois.<br>La barre de l'<b>accrobranche</b> est effacée.<br><br>Combien d'élèves ont voté pour l'accrobranche ?`,
      reponse: `On lit les barres : piscine 9, zoo 7, cinéma 4.<br>On ajoute : 9 + 7 + 4 = 20.<br>Il reste : 28 − 20 = 8.<br>Vérifie : 9 + 7 + 4 + 8 = 28.<br><span class="big">8 élèves</span> ont voté pour l'accrobranche.`,
      consigne: "Combien d'élèves ont voté pour l'accrobranche ?",
      verification: { type: "courte", attendus: ["8"], unite: "élèves" },
      dessin: sorties(),
    },
  ],
};

export default problemes;
