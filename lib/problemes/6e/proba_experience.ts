// Énigmes à projeter — 6e, notion proba_experience (impossible / possible /
// certain, lister et compter les issues, comparer les chances sur une roue,
// estimer « 9 chances sur 10 », le piège de la pièce qui « se souviendrait »,
// le défi des deux sacs).
// 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-probabilites.tsx) : expérience
// aléatoire, issue, impossible / possible / certain ; on liste toutes les
// issues puis on compte celles qui font gagner (« 2 issues sur 6 ») ; le plus
// grand secteur a le plus de chances ; une chance se range entre 0 et 1 ;
// pile : une chance sur deux. Pas de fraction écrite : on dit « … sur … ».
// Phrases courtes (les 6e lisent difficilement). Chaque dessin a exactement
// le nombre de billes, tickets ou secteurs annoncé (compté dans les commentaires).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

const r1 = (v: number) => Math.round(v * 10) / 10;
const rad = (d: number) => (d * Math.PI) / 180;

const bille = (x: number, y: number, couleur: string) =>
  `<circle cx="${x}" cy="${y}" r="20" fill="${couleur}" fill-opacity=".85" stroke="${C.craie}" stroke-width="3"/>`;

/** Un sac (rectangle arrondi + lien en haut). */
const sac = (x: number, y: number, l: number, h: number) =>
  `<path d="M${x + l / 2 - 30} ${y} L${x + l / 2 - 14} ${y - 22} L${x + l / 2 + 14} ${y - 22} L${x + l / 2 + 30} ${y}" stroke="${C.craie}" stroke-width="3" fill="none"/>` +
  `<rect x="${x}" y="${y}" width="${l}" height="${h}" rx="44" fill="${C.pale}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>`;

// 1. La tombola : 10 tickets numérotés de 1 à 10, 2 rangées de 5.
// Tickets 70 × 52 px, écart 14 px : 5 × 70 + 4 × 14 = 406 px, de x = 37 à 443.
const tombola = () => {
  const tickets = Array.from({ length: 10 }, (_, i) => {
    const x = 37 + (i % 5) * 84;
    const y = i < 5 ? 110 : 186;
    return `<rect x="${x}" y="${y}" width="70" height="52" rx="8" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>` +
      `<text x="${x + 35}" y="${y + 36}" fill="${C.craie}" font-size="28" text-anchor="middle">${i + 1}</text>`;
  }).join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Dix tickets de tombola numérotés de 1 à 10">
  <text x="240" y="70" font-size="40" text-anchor="middle">🎟️</text>
  <rect x="20" y="92" width="440" height="164" rx="14" fill="none" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  ${tickets}
  <text x="240" y="310" fill="${C.craie}" font-size="24" text-anchor="middle">«${NB}un nombre plus petit que 11${NB}»</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Impossible, possible ou certain${NB}?</text>
  </svg>`;
};

// 2. Le jeu de dés : les 6 faces 1 à 6, carrés de 60 px, écart 12 px :
// 6 × 60 + 5 × 12 = 420 px, de x = 30 à 450.
const des = () => {
  const faces = Array.from({ length: 6 }, (_, i) => {
    const x = 30 + i * 72;
    return `<rect x="${x}" y="150" width="60" height="60" rx="10" fill="none" stroke="${C.craie}" stroke-width="4"/>` +
      `<text x="${x + 30}" y="192" fill="${C.craie}" font-size="32" text-anchor="middle">${i + 1}</text>`;
  }).join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Les six faces d'un dé : 1, 2, 3, 4, 5 et 6">
  <text x="240" y="90" font-size="44" text-anchor="middle">🎲</text>
  ${faces}
  <text x="240" y="280" fill="${C.craie}" font-size="24" text-anchor="middle">Gagné si plus grand que 2</text>
  <text x="240" y="360" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'issues gagnantes${NB}?</text>
  </svg>`;
};

// 3. La roue : centre (240 ; 200), rayon 150, 8 secteurs égaux de 45°.
// Décalés de 22,5° : la flèche du haut pointe au milieu d'une part.
// Ordre depuis le haut, sens des aiguilles : J B J G J B J B
// → 4 jaunes, 3 bleus, 1 gris (4 + 3 + 1 = 8).
const roue = () => {
  const ordre = [C.jaune, C.bleu, C.jaune, C.pale, C.jaune, C.bleu, C.jaune, C.bleu];
  const cx = 240, cy = 200, r = 150;
  const secteurs = ordre.map((couleur, k) => {
    const a1 = rad(-112.5 + 45 * k), a2 = rad(-112.5 + 45 * (k + 1));
    return `<path d="M${cx} ${cy} L${r1(cx + r * Math.cos(a1))} ${r1(cy + r * Math.sin(a1))} A${r} ${r} 0 0 1 ${r1(cx + r * Math.cos(a2))} ${r1(cy + r * Math.sin(a2))} Z" fill="${couleur}" fill-opacity=".85" stroke="${C.craie}" stroke-width="3"/>`;
  }).join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue de 8 parts égales : 4 jaunes, 3 bleues et 1 grise">
  ${secteurs}
  <circle cx="${cx}" cy="${cy}" r="10" fill="${C.craie}"/>
  <path d="M226 20 L254 20 L240 48 Z" fill="${C.rose}" stroke="${C.craie}" stroke-width="2"/>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle couleur a le plus de chances${NB}?</text>
  </svg>`;
};

// 4. La loterie de classe : un sac de 10 jetons, 9 bleus et 1 jaune.
// Rangées : 4 (y = 180), 3 (y = 236), 3 (y = 292) → 4 + 3 + 3 = 10.
// Le jaune est le dernier de la 3e rangée.
const loterie = () => {
  const pos: [number, number][] = [
    [165, 180], [215, 180], [265, 180], [315, 180],
    [190, 236], [240, 236], [290, 236],
    [190, 292], [240, 292], [290, 292],
  ];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un sac de 10 jetons : 9 bleus et 1 jaune">
  ${sac(120, 130, 240, 210)}
  ${pos.map(([x, y], i) => bille(x, y, i === 9 ? C.jaune : C.bleu)).join("")}
  <text x="410" y="90" font-size="40" text-anchor="middle">🎁</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de chances sur 10${NB}?</text>
  </svg>`;
};

// 5. La pièce : trois « P » (pile) déjà sortis, le 4e lancer est « ? ».
const piece = () => {
  const pieces = [90, 190, 290]
    .map((x) => `<circle cx="${x}" cy="170" r="40" fill="${C.jaune}" fill-opacity=".45" stroke="${C.craie}" stroke-width="4"/>` +
      `<text x="${x}" y="182" fill="${C.craie}" font-size="34" text-anchor="middle">P</text>`)
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois lancers de pièce donnent pile, le quatrième lancer est à venir">
  ${pieces}
  <circle cx="390" cy="170" r="40" fill="none" stroke="${C.rose}" stroke-width="4" stroke-dasharray="10 8"/>
  <text x="390" y="183" fill="${C.rose}" font-size="36" text-anchor="middle">?</text>
  <text x="240" y="260" fill="${C.pale}" font-size="20" text-anchor="middle">P = pile, F = face</text>
  <text x="240" y="330" fill="${C.craie}" font-size="22" text-anchor="middle">Nina${NB}: «${NB}Maintenant, c'est face${NB}!${NB}»</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-elle raison${NB}?</text>
  </svg>`;
};

// 6. Les deux sacs : A = 2 jaunes + 1 bleue (3 billes) ;
// B = 4 jaunes + 3 bleues (7 billes).
const deuxSacs = () => {
  const a: [number, number, string][] = [[95, 175, C.jaune], [155, 175, C.jaune], [125, 235, C.bleu]];
  const b: [number, number, string][] = [
    [305, 165, C.jaune], [355, 165, C.jaune], [405, 165, C.jaune],
    [330, 220, C.jaune], [380, 220, C.bleu],
    [330, 275, C.bleu], [380, 275, C.bleu],
  ];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Sac A : 2 billes jaunes et 1 bleue. Sac B : 4 billes jaunes et 3 bleues">
  <text x="125" y="90" fill="${C.craie}" font-size="26" text-anchor="middle">Sac A</text>
  <text x="355" y="90" fill="${C.craie}" font-size="26" text-anchor="middle">Sac B</text>
  ${sac(45, 130, 160, 170)}
  ${sac(270, 130, 170, 180)}
  ${[...a, ...b].map(([x, y, c]) => bille(x, y, c)).join("")}
  <text x="240" y="365" fill="${C.craie}" font-size="22" text-anchor="middle">Pour gagner${NB}: tirer une bille jaune.</text>
  <text x="240" y="402" fill="${C.rose}" font-size="26" text-anchor="middle">Quel sac choisir${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "proba_experience",
  titre: "Énigmes sur le hasard et les probabilités",
  description: "Le ticket de la tombola, les issues du dé, la roue de la chance, la loterie de classe, le piège de la pièce, le défi des deux sacs : 6 énigmes de probabilités de 6e à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · À la tombola",
      titre: "Le ticket de la tombola",
      question: `À la tombola, il y a <b>10 tickets</b>.<br>Ils portent les nombres de 1 à 10.<br>Hugo tire un ticket au hasard.<br><br>« Tirer un nombre plus petit que 11 » : impossible, possible ou certain ?`,
      reponse: `On regarde tous les tickets : de 1 à 10.<br>Ils sont tous plus petits que 11.<br>Quel que soit le ticket, ça arrive.<br>Un événement qui arrive toujours est certain.<br>C'est <span class="big">certain</span>.`,
      consigne: "On tire un ticket parmi 10 tickets numérotés de 1 à 10. « Tirer un nombre plus petit que 11 », c'est :",
      verification: { type: "qcm", choix: ["Impossible", "Possible", "Certain"], bonne: 2 },
      dessin: tombola(),
    },
    {
      tag: "Énigme 2 · Au jeu de dés",
      titre: "Le dé de Lina",
      question: `Lina lance un dé à <b>6 faces</b>.<br>Elle gagne si le dé tombe sur un nombre <b>plus grand que 2</b>.<br><br>Combien d'issues la font gagner ?`,
      reponse: `On liste toutes les issues : 1, 2, 3, 4, 5, 6.<br>Plus grand que 2 : 3, 4, 5 et 6.<br>Attention : le 2 n'est pas plus grand que 2.<br>Lina gagne avec <span class="big">4 issues sur 6</span>.`,
      consigne: "Avec un dé à 6 faces, combien d'issues donnent un nombre plus grand que 2 ?",
      verification: { type: "courte", attendus: ["4"], unite: "issues" },
      dessin: des(),
    },
    {
      tag: "Énigme 3 · À la roue de la chance",
      titre: "La roue de la chance",
      question: `À la fête de l'école, Adam fait tourner une roue.<br>Elle a <b>8 parts égales</b>.<br>Il y a 4 parts jaunes, 3 bleues et 1 grise.<br><br>Quelle couleur a le plus de chances de sortir ?`,
      reponse: `Les 8 parts ont la même taille.<br>Chaque part a autant de chances.<br>Jaune : 4 parts. Bleu : 3 parts. Gris : 1 part.<br>4 est le plus grand nombre de parts.<br>C'est <span class="big">le jaune</span> (4 chances sur 8).`,
      consigne: "Une roue a 8 parts égales : 4 jaunes, 3 bleues, 1 grise. Quelle couleur a le plus de chances ?",
      verification: { type: "qcm", choix: ["Le jaune", "Le bleu", "Le gris"], bonne: 0 },
      dessin: roue(),
    },
    {
      tag: "Énigme 4 · À la loterie de classe",
      titre: "Le sac de jetons",
      question: `Pour la loterie de classe, un sac contient <b>10 jetons</b>.<br>Il y a <b>9 jetons bleus</b> et <b>1 jaune</b>.<br>Sami tire un jeton sans regarder.<br><br>Combien de chances sur 10 de tirer un bleu ?`,
      reponse: `Il y a 10 jetons : 10 issues.<br>9 jetons sont bleus : 9 issues donnent bleu.<br>Sami a 9 chances sur 10.<br>C'est très probable : proche de 1 (certain).<br>Mais pas certain : le jaune peut sortir.<br>Il a <span class="big">9 chances sur 10</span>.`,
      consigne: "Un sac a 9 jetons bleus et 1 jaune. Combien de chances sur 10 de tirer un bleu ?",
      verification: { type: "courte", attendus: ["9", "9 sur 10"], unite: "sur 10" },
      dessin: loterie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La pièce qui se souvient ?",
      sorte: "piege",
      question: `Pour choisir l'équipe qui commence, Nina lance une pièce.<br>Elle a eu <b>pile</b>, <b>pile</b>, <b>pile</b>.<br>Elle dit : « Maintenant, face a plus de chances ! »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! La pièce n'a pas de mémoire.<br>À chaque lancer, il y a 2 issues : pile ou face.<br>Pile et face ont toujours une chance sur deux.<br>Les lancers d'avant ne changent rien.<br><span class="big">Pile et face ont autant de chances</span>.`,
      consigne: "Une pièce est tombée 3 fois sur pile. Au 4e lancer, que peut-on dire ?",
      verification: { type: "qcm", choix: ["Face a plus de chances", "Pile et face ont autant de chances", "Pile a plus de chances"], bonne: 1 },
      dessin: piece(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux sacs",
      sorte: "defi",
      question: `Pour gagner, il faut tirer une bille <b>jaune</b>.<br>Sac A : <b>2 jaunes</b> et <b>1 bleue</b>.<br>Sac B : <b>4 jaunes</b> et <b>3 bleues</b>.<br>Le sac B a plus de jaunes.<br><br>Quel sac donne le plus de chances ?`,
      reponse: `Imagine le sac A en double : 4 jaunes et 2 bleues.<br>Les chances ne changent pas : 2 jaunes pour 1 bleue.<br>Le sac B a aussi 4 jaunes, mais 3 bleues.<br>Une bleue de plus : moins de chances.<br>Sac A : 2 chances sur 3. Sac B : 4 chances sur 7.<br>Il faut choisir <span class="big">le sac A</span>.`,
      consigne: "Sac A : 2 jaunes et 1 bleue. Sac B : 4 jaunes et 3 bleues. Quel sac donne le plus de chances de tirer jaune : A ou B ?",
      verification: { type: "courte", attendus: ["A", "sac A", "le sac A"] },
      dessin: deuxSacs(),
    },
  ],
};

export default problemes;
