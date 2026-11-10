// lib/tutor-v4/questionBank/cp/maths/reperage.bank.ts
//
// Le repérage dans l'espace au CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Les élèves consolident les compétences développées au cycle 1 pour
//     décrire des positions et des déplacements en utilisant différents types
//     de repères, EN SE LIMITANT À L'ESPACE DE LA CLASSE » ;
//   — le vocabulaire est donné mot pour mot : gauche, droite ; sur, sous,
//     entre, devant, derrière, au-dessus, en dessous ;
//   — repérer la position de ses camarades sur un PLAN de la classe, et
//     retrouver un objet caché dont la position est indiquée sur un plan ;
//   — construire et reproduire des assemblages de cubes et de pavés à partir
//     d'un modèle en trois dimensions ou d'une photo ;
//   — les instructions de déplacement : avancer, reculer, tourner à droite,
//     tourner à gauche, monter, descendre ;
//   — « Les déplacements à programmer comprennent au maximum dix instructions,
//     dont deux virages. »
//   ⛔ AUCUNE COORDONNÉE. Pas de (4 ; 2) au CP : le couple de nombres arrive
//     plus tard. On parle de cases, de « vers la droite », « vers le haut ».
//
// LE PIÈGE DE LA NOTION : la gauche de qui ? Quand deux personnes se font
// face, leurs gauches sont opposées.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS (Frédéric : « regarde s'il y a bien des
// images et que ça soit un peu fun ; fais attention à leur âge »). Chaque
// gabarit tire une SITUATION (un animal ou le robot, un prénom de la troupe)
// × une TOURNURE × des nombres. Les dessins :
//   — `reperage` en QUADRILLAGE NU : `showAxes: false`, `showCoordinates:
//     false` (donc aucun nombre écrit), les objets posés AU CENTRE des cases
//     (x + 0,5) avec un emoji pour étiquette. Le chemin n'est dessiné que
//     quand la question porte sur sa LECTURE (combien de cases, premier
//     déplacement), jamais quand la question est « où arrive-t-il ? ». On
//     n'utilise pas `target.hidden` : le « ? » se pose SUR la bonne case.
//   — `objets` pour gauche, droite, entre : une rangée dessinée, lue de
//     gauche à droite par l'enfant.
//   — `solide_3d` (assemblage de cubes) pour compter les cubes d'un modèle,
//     tous visibles (une seule épaisseur).
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  ObjetId,
  ObjetsCanvasData,
  ReperageCanvasData,
  Solide3DCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { ReperageStep } from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le cadeau » → « au cadeau », « la pomme » → « à la pomme ». */
const au = (gn: string) => (gn.startsWith("le ") ? `au ${gn.slice(3)}` : `à ${gn}`);
/** « le cadeau » → « du cadeau », « la pomme » → « de la pomme ». */
const du = (gn: string) => (gn.startsWith("le ") ? `du ${gn.slice(3)}` : `de ${gn}`);
const pl = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;
/** « de Nina », mais « d'Amir », « d'Inès ». */
const deNom = (n: string) => (/^[AEIOUYÉÈ]/.test(n) ? `d'${n}` : `de ${n}`);

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Enzo",
] as const;

/* ---------- Le quadrillage nu : des cases, aucun nombre ---------- */

type Pos = { x: number; y: number };
type Dir = "droite" | "gauche" | "haut" | "bas";
type Pas = { dir: Dir; n: number };

const COLS = 6;
const ROWS = 4;
const VERS: Record<Dir, string> = {
  droite: "vers la droite",
  gauche: "vers la gauche",
  haut: "vers le haut",
  bas: "vers le bas",
};
const CONTRAIRE: Record<Dir, Dir> = { droite: "gauche", gauche: "droite", haut: "bas", bas: "haut" };
const dirTexte = (p: Pas) => `${pl(p.n, "case")} ${VERS[p.dir]}`;

function bouge(p: Pos, pas: Pas): Pos {
  if (pas.dir === "droite") return { x: p.x + pas.n, y: p.y };
  if (pas.dir === "gauche") return { x: p.x - pas.n, y: p.y };
  if (pas.dir === "haut") return { x: p.x, y: p.y + pas.n };
  return { x: p.x, y: p.y - pas.n };
}
const suit = (p: Pos, pas: readonly Pas[]) => pas.reduce(bouge, p);
const dedans = (p: Pos, cols = COLS, rows = ROWS) => p.x >= 0 && p.x < cols && p.y >= 0 && p.y < rows;
const meme = (a: Pos, b: Pos) => a.x === b.x && a.y === b.y;

type Mobile = { e: string; nom: string; il: "il" | "elle" };
const MOBILES: readonly Mobile[] = [
  { e: "🤖", nom: "le robot", il: "il" },
  { e: "🐭", nom: "la souris", il: "elle" },
  { e: "🐰", nom: "le lapin", il: "il" },
  { e: "🐞", nom: "la coccinelle", il: "elle" },
  { e: "🐦", nom: "Pic", il: "il" },
  { e: "🐢", nom: "la tortue", il: "elle" },
  { e: "🐶", nom: "le chien", il: "il" },
  { e: "🐱", nom: "le chat", il: "il" },
  { e: "🦖", nom: "le petit dinosaure", il: "il" },
  { e: "🐸", nom: "la grenouille", il: "elle" },
];

type Cible = { e: string; nom: string };
const CIBLES: readonly Cible[] = [
  { e: "🍎", nom: "la pomme" },
  { e: "⭐", nom: "l'étoile" },
  { e: "🏠", nom: "la maison" },
  { e: "🌳", nom: "l'arbre" },
  { e: "🎁", nom: "le cadeau" },
  { e: "🧀", nom: "le fromage" },
  { e: "🌸", nom: "la fleur" },
  { e: "🍪", nom: "le biscuit" },
  { e: "💎", nom: "le trésor" },
  { e: "🥕", nom: "la carotte" },
  { e: "🐟", nom: "le poisson" },
  { e: "🎈", nom: "le ballon" },
  { e: "🍌", nom: "la banane" },
  { e: "🚀", nom: "la fusée" },
];
const choixCible = (c: Cible) => `${c.nom} ${c.e}`;

type Marque = { p: Pos; label: string; color?: string };
const COULEURS = ["#f97316", "#22c55e", "#3b82f6", "#a855f7", "#eab308"];

function quadrillage(
  marques: Marque[],
  opts: { cols?: number; rows?: number; chemin?: { depart: Marque; pas: Pas[] } } = {},
): ReperageCanvasData {
  const cols = opts.cols ?? COLS;
  const rows = opts.rows ?? ROWS;
  const c = (p: Pos) => ({ x: p.x + 0.5, y: p.y + 0.5 });
  return {
    kind: "reperage",
    grid: { rows, cols },
    points: marques.map((m, i) => ({ ...c(m.p), label: m.label, color: m.color ?? COULEURS[i % COULEURS.length] })),
    path: opts.chemin
      ? {
          start: { ...c(opts.chemin.depart.p), label: opts.chemin.depart.label, color: "#ef4444" },
          steps: opts.chemin.pas.map((p): ReperageStep => ({ direction: p.dir, count: p.n })),
          showArrows: true,
        }
      : undefined,
    display: { showGrid: true, showAxes: false, showCoordinates: false, showPointLabels: true, showTarget: false },
    // ⭐ Un dessin ÉTROIT : mis à l'échelle de sa carte (≈ 360 px), il grossit les emoji
    // et les cases. À 340 de large, les emoji ne faisaient que 14 px (rendu du 10/11).
    size: rows === 1 ? { width: 300, height: 100 } : { width: 260, height: 64 + rows * 44 },
  };
}

/* ---------- La rangée d'objets dessinés ---------- */

type Obj = { quoi: ObjetId; nom: string; mot: string };
const OBJETS: readonly Obj[] = [
  { quoi: "ballon", nom: "le ballon", mot: "ballon" },
  { quoi: "pomme", nom: "la pomme", mot: "pomme" },
  { quoi: "livre", nom: "le livre", mot: "livre" },
  { quoi: "chat", nom: "le chat", mot: "chat" },
  { quoi: "fleur", nom: "la fleur", mot: "fleur" },
  { quoi: "voiture", nom: "la voiture", mot: "voiture" },
  { quoi: "bateau", nom: "le bateau", mot: "bateau" },
  { quoi: "tasse", nom: "la tasse", mot: "tasse" },
  { quoi: "banane", nom: "la banane", mot: "banane" },
  { quoi: "chapeau", nom: "le chapeau", mot: "chapeau" },
  { quoi: "poisson", nom: "le poisson", mot: "poisson" },
  { quoi: "oiseau", nom: "l'oiseau", mot: "oiseau" },
  { quoi: "etoile", nom: "l'étoile", mot: "étoile" },
  { quoi: "cartable", nom: "le cartable", mot: "cartable" },
  { quoi: "cle", nom: "la clé", mot: "clé" },
  { quoi: "papillon", nom: "le papillon", mot: "papillon" },
  { quoi: "verre", nom: "le verre", mot: "verre" },
  { quoi: "maison", nom: "la maison", mot: "maison" },
];

function rangee(objs: readonly Obj[], colonnes?: number): ObjetsCanvasData {
  return {
    kind: "objets",
    elements: objs.map((o) => ({ quoi: o.quoi, label: o.mot })),
    colonnes: colonnes ?? objs.length,
    mode: "couleur",
    size: { width: colonnes === 1 ? 170 : 360 },
  };
}

/* ---------- Une fabrique de gabarit ---------- */

function tpl(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => TutorGeneratedQuestionV4,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", "reperage", ...tags, "template"],
    generate,
  };
}

/* ---------- Vocabulaire ---------- */

const PETITS = [
  "le chat", "le ballon", "la poupée", "le doudou", "la trousse", "le livre",
  "la pomme", "le cartable", "la balle", "le camion", "le panier", "la tortue",
] as const;
const GRANDS = ["la table", "la chaise", "le lit", "le banc", "le tabouret", "le coffre", "le bureau", "le canapé"] as const;
const PAIRES = [
  { mot: "sur", contraire: "sous", autres: ["devant", "derrière"] },
  { mot: "sous", contraire: "sur", autres: ["devant", "derrière"] },
  { mot: "devant", contraire: "derrière", autres: ["sur", "sous"] },
  { mot: "derrière", contraire: "devant", autres: ["sur", "sous"] },
] as const;

const LIEUX_FILE = [
  "À la cantine", "Devant le toboggan", "Pour monter dans le bus", "À la piscine",
  "Pour le goûter", "Devant la classe", "Au zoo", "À la boulangerie", "Au cirque",
  "À la bibliothèque", "Devant le manège", "À la kermesse",
] as const;

/* ---------- Gauche et droite : qui regarde ? ---------- */

const GESTES = [
  { quoi: "lève sa main", fin: "" },
  { quoi: "tient un ballon dans sa main", fin: "" },
  { quoi: "a une montre au poignet", fin: "" },
  { quoi: "montre la porte avec sa main", fin: "" },
  { quoi: "a un bracelet au bras", fin: "" },
  { quoi: "tient une glace dans sa main", fin: "" },
  { quoi: "a un pansement au genou", fin: "" },
] as const;
const FACE = [
  "est en face de toi, à la cantine",
  "est face à toi, dans la cour",
  "est en face de toi, pour le jeu du miroir",
  "est en face de toi, au goûter",
] as const;
const MEME_SENS = [
  "est devant toi dans la file, dos à toi",
  "est à côté de toi et regarde dans le même sens",
  "marche devant toi, dans le même sens",
  "est à côté de toi, face au tableau",
] as const;
const QUESTIONS_COTE = [
  "Pour toi, c'est de quel côté ?",
  "De ton côté à toi, c'est où ?",
  "Tu vois ça de quel côté ?",
] as const;

/* ---------- Assemblages de cubes ---------- */

type Cube = { x: number; y: number; z: number };
function modele(): { nom: string; cubes: Cube[] } {
  // ⛔ Pas de pont : en perspective, son arche se cache derrière le pilier de
  // droite (rendu du 10/11) — l'enfant n'y voit qu'un bloc.
  const forme = randomChoice(["tour", "mur", "escalier", "L"] as const);
  if (forme === "tour") {
    const h = randomInt(3, 6);
    return { nom: "la tour", cubes: Array.from({ length: h }, (_, z) => ({ x: 0, y: 0, z })) };
  }
  if (forme === "mur") {
    const l = randomInt(2, 4);
    const h = randomInt(2, 3);
    const cubes: Cube[] = [];
    for (let x = 0; x < l; x++) for (let z = 0; z < h; z++) cubes.push({ x, y: 0, z });
    return { nom: "le mur", cubes };
  }
  if (forme === "escalier") {
    const m = randomInt(2, 4);
    const cubes: Cube[] = [];
    for (let x = 0; x < m; x++) for (let z = 0; z <= x; z++) cubes.push({ x, y: 0, z });
    return { nom: "l'escalier", cubes };
  }
  const h = randomInt(2, 4);
  const l = randomInt(2, 4);
  const cubes: Cube[] = [];
  for (let z = 0; z < h; z++) cubes.push({ x: 0, y: 0, z });
  for (let x = 1; x < l; x++) cubes.push({ x, y: 0, z: 0 });
  return { nom: "la chaise", cubes };
}
const dessinCubes = (cubes: Cube[]): Solide3DCanvasData => ({
  kind: "solide_3d",
  solide: "assemblage_cubes",
  cubes,
  display: { showLabels: false, showDimensions: false, showUnitCubes: true },
  size: { width: 300, height: 300 },
});

/* ---------- Les tirages sur quadrillage ---------- */

/** Un départ, deux pas (un horizontal, un vertical), et trois arrivées
 *  fausses mais plausibles : un pas inversé, une case de trop, une de moins. */
function tirerDeuxPas(): { depart: Pos; pas: Pas[]; fin: Pos; leurres: Pos[] } {
  for (;;) {
    const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
    const h: Pas = { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 3) };
    const v: Pas = { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 2) };
    const pas = randomChoice([true, false]) ? [h, v] : [v, h];
    const fin = suit(depart, pas);
    if (!dedans(fin)) continue;
    const variantes: Pas[][] = [];
    pas.forEach((p, i) => {
      const avec = (q: Pas) => pas.map((r, k) => (k === i ? q : r));
      variantes.push(avec({ dir: CONTRAIRE[p.dir], n: p.n }), avec({ dir: p.dir, n: p.n + 1 }));
      if (p.n > 1) variantes.push(avec({ dir: p.dir, n: p.n - 1 }));
    });
    const vus: Pos[] = [];
    for (const v2 of shuffle(variantes)) {
      const q = suit(depart, v2);
      if (dedans(q) && !meme(q, depart) && !meme(q, fin) && !vus.some((w) => meme(w, q))) vus.push(q);
    }
    if (vus.length >= 3) return { depart, pas, fin, leurres: vus.slice(0, 3) };
  }
}

/** Un chemin de deux ou trois morceaux qui tourne à chaque fois. */
function tirerChemin(morceaux: number): { depart: Pos; pas: Pas[] } {
  for (;;) {
    const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
    const pas: Pas[] = [];
    let horizontal = randomChoice([true, false]);
    for (let i = 0; i < morceaux; i++) {
      pas.push(
        horizontal
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 3) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 2) },
      );
      horizontal = !horizontal;
    }
    // Chaque étape doit rester dans le quadrillage, et le chemin ne repasse
    // pas par sa case de départ.
    let p = depart;
    let ok = true;
    for (const s of pas) {
      p = bouge(p, s);
      if (!dedans(p) || meme(p, depart)) ok = false;
    }
    if (ok) return { depart, pas };
  }
}

export const reperageBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_REPERAGE_VOCABULAIRE — sur, sous, entre, devant, derrière
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_vocabulaire_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "La trousse est posée SUR la table. Où est la table par rapport à la trousse ?",
    format: "qcm",
    choices: ["sous la trousse", "sur la trousse", "à côté de la trousse", "devant la trousse"],
    expected: ["sous la trousse"],
    comparator: "mcq_exact",
    hint: "Si l'un est dessus, l'autre est forcément dessous.",
    explanation: exp(
      "« Sur » et « sous » sont deux mots qui vont ensemble : ils décrivent la même situation vue des deux côtés.",
      "On regarde qui est en haut et qui est en bas.",
      "La trousse est en haut, la table en bas. Donc la trousse est sur la table, et la table est sous la trousse.",
      "La table est sous la trousse.",
    ),
    tags: ["cp", "reperage", "vocabulaire", "definition", "qcm"],
  },
  tpl(
    "cp_reperage_vocabulaire_tpl_3",
    "cp_reperage_vocabulaire",
    1,
    "Chaque mot de position a son contraire : sur et sous, devant et derrière.",
    ["vocabulaire"],
    () => {
      const p = randomChoice(PAIRES);
      const petit = randomChoice(PETITS);
      const grand = randomChoice(GRANDS);
      const n = randomChoice(PRENOMS);
      const phrase = randomChoice([
        `${cap(petit)} est ${p.mot} ${grand}. Où est ${grand} ?`,
        `${n} met ${petit} ${p.mot} ${grand}. Où est ${grand} ?`,
        `Regarde : ${petit} est ${p.mot} ${grand}. Où se trouve ${grand} ?`,
        `${n} dit : « ${cap(petit)} est ${p.mot} ${grand}. » Où est ${grand} ?`,
      ]);
      const bonne = `${p.contraire} ${petit}`;
      return {
        text: phrase,
        format: "qcm",
        choices: makeChoices(bonne, [`${p.mot} ${petit}`, ...p.autres.map((a) => `${a} ${petit}`)]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les mots de position vont par paires : sur et sous, devant et derrière.",
          "On garde la même scène et on la dit dans l'autre sens.",
          `Si ${petit} est ${p.mot} ${grand}, alors ${grand} est ${p.contraire} ${petit}. Rien n'a bougé : seule la phrase change.`,
          `${cap(grand)} est ${bonne}.`,
        ),
      };
    },
  ),
  tpl(
    "cp_reperage_vocabulaire_tpl_1",
    "cp_reperage_vocabulaire",
    2,
    "Entre, c'est au milieu : un objet d'un côté, un objet de l'autre.",
    ["vocabulaire", "canvas"],
    () => {
      const objs = shuffle(OBJETS).slice(0, 4);
      const i = randomInt(1, 2);
      const [a, b] = shuffle([objs[i - 1], objs[i + 1]]);
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `Regarde la rangée. Quel objet est entre ${a.nom} et ${b.nom} ?`,
        `Pic a caché une graine sous l'objet entre ${a.nom} et ${b.nom}. Lequel ?`,
        `${n} montre l'objet placé entre ${a.nom} et ${b.nom}. Lequel est-ce ?`,
        `Qu'y a-t-il entre ${a.nom} et ${b.nom} ?`,
      ]);
      const bonne = objs[i].nom;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, objs.map((o) => o.nom)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Être « entre » deux objets, c'est avoir l'un d'un côté et l'autre de l'autre côté.",
          "On trouve les deux objets nommés, puis on regarde celui qui est au milieu.",
          `${cap(a.nom)} et ${b.nom} sont voisins de ${bonne} : ${bonne} est au milieu.`,
          `C'est ${bonne}.`,
        ),
        canvas: rangee(objs),
      };
    },
  ),
  tpl(
    "cp_reperage_vocabulaire_tpl_2",
    "cp_reperage_vocabulaire",
    3,
    "Dans une file, le premier n'a personne devant lui.",
    ["vocabulaire"],
    () => {
      const [a, b, c] = shuffle(PRENOMS).slice(0, 3);
      const lieu = randomChoice(LIEUX_FILE);
      const q = randomChoice([
        { t: "Qui est ENTRE les deux autres ?", r: b },
        { t: "Qui est le premier de la file ?", r: a },
        { t: "Qui est tout au bout de la file ?", r: c },
        { t: `Qui est juste derrière ${a} ?`, r: b },
        { t: `Qui est juste devant ${c} ?`, r: b },
      ]);
      return {
        text: `${lieu}, ${a} est devant ${b}, et ${b} est devant ${c}. ${q.t}`,
        format: "qcm",
        choices: makeChoices(q.r, [a, b, c]),
        expected: [q.r],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une file, celui qui est devant passe en premier ; être « entre », c'est avoir quelqu'un devant et quelqu'un derrière.",
          "On range les trois enfants dans l'ordre de la file.",
          `L'ordre de la file est : ${a}, puis ${b}, puis ${c}.`,
          `C'est ${q.r}.`,
        ),
      };
    },
  ),
  tpl(
    "cp_reperage_vocabulaire_tpl_4",
    "cp_reperage_vocabulaire",
    3,
    "Au-dessus, c'est plus haut ; en dessous, c'est plus bas.",
    ["vocabulaire", "canvas"],
    () => {
      const objs = shuffle(OBJETS).slice(0, 3);
      const n = randomChoice(PRENOMS);
      const lieu = randomChoice([
        `Sur l'étagère ${deNom(n)}`,
        "Sur l'étagère de la classe",
        `Dans l'armoire ${deNom(n)}`,
        "Sur l'étagère de la cabane",
      ]);
      const q = randomChoice([
        { t: `qu'y a-t-il juste au-dessus ${du(objs[1].nom)} ?`, r: objs[0].nom },
        { t: `qu'y a-t-il juste en dessous ${du(objs[1].nom)} ?`, r: objs[2].nom },
        { t: "qu'y a-t-il tout en haut ?", r: objs[0].nom },
        { t: "qu'y a-t-il tout en bas ?", r: objs[2].nom },
        { t: `qu'y a-t-il au-dessus ${du(objs[2].nom)} et en dessous ${du(objs[0].nom)} ?`, r: objs[1].nom },
      ]);
      return {
        text: `${lieu}, ${q.t}`,
        format: "qcm",
        choices: makeChoices(q.r, objs.map((o) => o.nom)),
        expected: [q.r],
        comparator: "mcq_exact",
        explanation: exp(
          "Au-dessus veut dire plus haut, en dessous veut dire plus bas.",
          "On lit l'étagère de haut en bas.",
          `En haut, ${objs[0].nom} ; au milieu, ${objs[1].nom} ; en bas, ${objs[2].nom}.`,
          `C'est ${q.r}.`,
        ),
        canvas: rangee(objs, 1),
      };
    },
  ),

  /* =========================================================
     CP_REPERAGE_GAUCHE_DROITE — LE piège : la gauche de qui ?
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_gauche_droite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_gauche_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Tu es assis en face de Naïla. Elle lève sa main droite. De quel côté la vois-tu, toi ?",
    format: "qcm",
    choices: ["à ta gauche", "à ta droite", "devant toi", "derrière toi"],
    expected: ["à ta gauche"],
    comparator: "mcq_exact",
    hint: "Vous êtes face à face : vos côtés sont inversés.",
    explanation: exp(
      "La gauche et la droite dépendent de la personne qui regarde.",
      "On se met à la place de l'autre, ou on imagine qu'on se retourne.",
      "Quand deux personnes se font face, elles ne regardent pas dans le même sens : la main droite de Naïla se trouve du côté de ta main gauche. Sa droite à elle, c'est ta gauche à toi.",
      "Tu la vois à ta gauche.",
    ),
    tags: ["cp", "reperage", "gauche_droite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_gauche_droite_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_gauche_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Tu marches dans le couloir, et un camarade marche juste devant toi, dans le même sens. Il tourne à droite. De quel côté dois-tu tourner pour le suivre ?",
    format: "qcm",
    choices: ["à droite aussi", "à gauche", "tout droit", "en arrière"],
    expected: ["à droite aussi"],
    comparator: "mcq_exact",
    hint: "Vous regardez tous les deux dans la même direction.",
    explanation: exp(
      "Deux personnes tournées dans le même sens ont la même gauche et la même droite.",
      "On vérifie d'abord si l'on regarde dans le même sens que l'autre.",
      "Ici, vous avancez tous les deux dans le même sens : sa droite est aussi ta droite. C'est seulement en se faisant FACE que les côtés s'inversent.",
      "Tu tournes à droite aussi.",
    ),
    tags: ["cp", "reperage", "gauche_droite", "piege", "qcm"],
  },
  tpl(
    "cp_reperage_gauche_droite_tpl_2",
    "cp_reperage_gauche_droite",
    2,
    "Ta main gauche te montre le côté gauche de la rangée.",
    ["gauche_droite", "canvas"],
    () => {
      const objs = shuffle(OBJETS).slice(0, 4);
      const n = randomChoice(PRENOMS);
      const intro = randomChoice([
        "Regarde la rangée.",
        `${n} a posé ces objets sur la table.`,
        `Voici l'étagère ${deNom(n)}.`,
        "Pic regarde ces objets.",
      ]);
      const i = randomInt(1, 2);
      const x = objs[i];
      const q = randomChoice([
        { t: `Quel objet est juste à gauche ${du(x.nom)} ?`, r: objs[i - 1].nom, piege: objs[i + 1].nom },
        { t: `Quel objet est juste à droite ${du(x.nom)} ?`, r: objs[i + 1].nom, piege: objs[i - 1].nom },
        { t: "Quel objet est tout à gauche ?", r: objs[0].nom, piege: objs[3].nom },
        { t: "Quel objet est tout à droite ?", r: objs[3].nom, piege: objs[0].nom },
      ]);
      return {
        text: `${intro} ${q.t}`,
        format: "qcm",
        choices: makeChoices(q.r, [q.piege, ...objs.map((o) => o.nom)]),
        expected: [q.r],
        comparator: "mcq_exact",
        explanation: exp(
          "La gauche, c'est le côté de ta main gauche ; la droite, celui de ta main droite.",
          "On lève la main gauche, puis on lit la rangée de gauche à droite.",
          `De gauche à droite, on voit : ${objs.map((o) => o.nom).join(", ")}.`,
          `C'est ${q.r}.`,
        ),
        canvas: rangee(objs),
      };
    },
  ),
  tpl(
    "cp_reperage_gauche_droite_tpl_1",
    "cp_reperage_gauche_droite",
    4,
    "Demande-toi d'abord si vous regardez dans le même sens.",
    ["gauche_droite", "piege"],
    () => {
      const faceAFace = randomChoice([true, false]);
      const cote = randomChoice(["droite", "gauche"] as const);
      const autre = cote === "droite" ? "gauche" : "droite";
      const bonne = faceAFace ? `à ta ${autre}` : `à ta ${cote}`;
      const n = randomChoice(PRENOMS);
      const pose = randomChoice(faceAFace ? FACE : MEME_SENS);
      const geste = randomChoice(GESTES);
      const genou = geste.quoi.endsWith("genou") || geste.quoi.endsWith("poignet") || geste.quoi.endsWith("bras");
      const coteAccorde = genou ? (cote === "droite" ? "droit" : "gauche") : cote;
      return {
        text: `${n} ${pose}. ${n} ${geste.quoi} ${coteAccorde}. ${randomChoice(QUESTIONS_COTE)}`,
        format: "qcm",
        choices: makeChoices(bonne, [faceAFace ? `à ta ${cote}` : `à ta ${autre}`, "devant toi", "derrière toi"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La gauche et la droite dépendent du sens dans lequel on regarde.",
          "On se demande si l'autre regarde dans le même sens que soi.",
          faceAFace
            ? `Vous êtes face à face : vos côtés sont inversés. Son côté ${cote} est de ton côté ${autre}.`
            : `Vous regardez dans le même sens : vos côtés sont les mêmes. Son côté ${cote} est aussi ton côté ${cote}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  ),
  tpl(
    "cp_reperage_gauche_droite_tpl_3",
    "cp_reperage_gauche_droite",
    4,
    "Ton ami est en face : sa gauche est de ton côté droit.",
    ["gauche_droite", "piege", "canvas"],
    () => {
      const objs = shuffle(OBJETS).slice(0, 4);
      const n = randomChoice(PRENOMS);
      const ou = randomChoice([
        "de l'autre côté de la table",
        "de l'autre côté de l'étagère",
        "de l'autre côté du banc",
        "derrière les objets, face à toi",
      ]);
      // Pour l'ami en face, l'ordre est renversé.
      const q = randomChoice([
        { t: `Pour ${n}, quel objet est tout à gauche ?`, r: objs[3].nom, piege: objs[0].nom },
        { t: `Pour ${n}, quel objet est tout à droite ?`, r: objs[0].nom, piege: objs[3].nom },
        { t: `Pour ${n}, quel objet est juste à gauche ${du(objs[1].nom)} ?`, r: objs[2].nom, piege: objs[0].nom },
        { t: `Pour ${n}, quel objet est juste à droite ${du(objs[2].nom)} ?`, r: objs[1].nom, piege: objs[3].nom },
      ]);
      return {
        text: `${n} est en face de toi, ${ou}. ${q.t}`,
        format: "qcm",
        choices: makeChoices(q.r, [q.piege, ...objs.map((o) => o.nom)]),
        expected: [q.r],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on se fait face, la gauche de l'un est la droite de l'autre.",
          `On se met à la place ${deNom(n)} : on lit la rangée dans l'autre sens.`,
          `Pour toi, de gauche à droite : ${objs.map((o) => o.nom).join(", ")}. Pour ${n}, c'est l'inverse : ${[...objs].reverse().map((o) => o.nom).join(", ")}.`,
          `C'est ${q.r}.`,
        ),
        canvas: rangee(objs),
      };
    },
  ),

  /* =========================================================
     CP_REPERAGE_QUADRILLAGE — le plan, les cases
     ⛔ Un quadrillage NU : aucun nombre écrit, aucun axe.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_quadrillage_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert le plan de la classe ?",
    format: "qcm",
    choices: [
      "à montrer où sont placées les choses, vues de dessus",
      "à mesurer la longueur de la classe",
      "à dessiner joliment la classe",
      "à compter les élèves",
    ],
    expected: ["à montrer où sont placées les choses, vues de dessus"],
    comparator: "mcq_exact",
    hint: "Un plan, c'est comme si on regardait la classe depuis le plafond.",
    explanation: exp(
      "Un plan est une représentation de l'espace vue de dessus : il montre les positions.",
      "On imagine qu'on regarde la pièce depuis le plafond, sans les hauteurs.",
      "Sur un plan de la classe, chaque table, la porte et le tableau ont une place. On peut alors dire où se trouve un objet sans être dans la pièce.",
      "Le plan sert à montrer où sont placées les choses, vues de dessus.",
    ),
    tags: ["cp", "reperage", "plan", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_quadrillage_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_quadrillage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le plan de la classe, le trésor est caché sous la table qui est juste à côté de la porte, du côté du tableau. Combien de tables faut-il regarder ?",
    format: "qcm",
    choices: ["une seule", "toutes les tables", "deux tables", "aucune"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Deux indications ensemble ne laissent qu'une seule possibilité.",
    explanation: exp(
      "Plusieurs indications de position se combinent pour désigner un seul endroit.",
      "On garde d'abord les tables près de la porte, puis parmi elles celle du côté du tableau.",
      "« À côté de la porte » laisse peut-être deux tables. « Du côté du tableau » n'en garde qu'une. Deux indications suffisent souvent : c'est pour cela qu'on les donne ensemble.",
      "Il ne faut regarder qu'une seule table.",
    ),
    tags: ["cp", "reperage", "plan", "definition", "qcm"],
  },
  tpl(
    "cp_reperage_quadrillage_tpl_2",
    "cp_reperage_quadrillage",
    2,
    "Pose ton doigt sur l'animal et compte les cases une par une.",
    ["plan", "canvas"],
    () => {
      for (;;) {
        const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const horizontal = randomChoice([true, false]);
        const pas: Pas = horizontal
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 4) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 3) };
        const fin = bouge(depart, pas);
        if (!dedans(fin)) continue;
        const m = randomChoice(MOBILES);
        const c = randomChoice(CIBLES);
        const canvas = quadrillage([
          { p: depart, label: m.e, color: "#ef4444" },
          { p: fin, label: c.e },
        ]);
        if (randomChoice([true, false])) {
          const text = randomChoice([
            `${cap(m.nom)} ${m.e} va tout droit jusqu'${au(c.nom)} ${c.e}. Combien de cases fait-${m.il} ?`,
            `Combien de cases ${m.nom} ${m.e} doit-${m.il} faire pour aller ${au(c.nom)} ${c.e} ?`,
            `${cap(m.nom)} ${m.e} veut ${c.nom} ${c.e}. Compte les cases : combien en fait-${m.il} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(pas.n)],
            comparator: "number_equal",
            explanation: exp(
              "Sur un quadrillage, on compte les cases franchies, une par une.",
              "On pose le doigt sur la case de départ, puis on avance case par case.",
              `${cap(c.nom)} est à ${dirTexte(pas)} : ${m.nom} fait ${pl(pas.n, "case")}.`,
              `${cap(m.il)} fait ${pl(pas.n, "case")}.`,
            ),
            canvas,
          };
        }
        const bonne = VERS[pas.dir];
        const text = randomChoice([
          `Dans quel sens ${m.nom} ${m.e} doit-${m.il} aller pour attraper ${c.nom} ${c.e} ?`,
          `${cap(m.nom)} ${m.e} veut aller ${au(c.nom)} ${c.e}. Vers où va-t-${m.il} ?`,
          `Pour trouver ${c.nom} ${c.e}, où doit aller ${m.nom} ${m.e} ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: makeChoices(bonne, Object.values(VERS)),
          expected: [bonne],
          comparator: "mcq_exact",
          explanation: exp(
            "Sur un quadrillage, on se déplace vers la droite, la gauche, le haut ou le bas.",
            "On regarde où est le but par rapport à l'animal.",
            `${cap(c.nom)} est ${bonne} par rapport ${au(m.nom)}.`,
            `${cap(m.il)} doit aller ${bonne}.`,
          ),
          canvas,
        };
      }
    },
  ),
  tpl(
    "cp_reperage_quadrillage_tpl_1",
    "cp_reperage_quadrillage",
    3,
    "Fais le premier déplacement avec ton doigt, puis le second.",
    ["plan", "canvas"],
    () => {
      const { depart, pas, fin, leurres } = tirerDeuxPas();
      const m = randomChoice(MOBILES);
      const n = randomChoice(PRENOMS);
      const cibles = shuffle(CIBLES).slice(0, 4);
      const etapes = `${dirTexte(pas[0])}, puis ${dirTexte(pas[1])}`;
      const text = randomChoice([
        `${cap(m.nom)} ${m.e} fait ${etapes}. Où arrive-t-${m.il} ?`,
        `${cap(m.nom)} ${m.e} avance : ${etapes}. Que trouve-t-${m.il} ?`,
        `${n} guide ${m.nom} ${m.e} : « ${cap(etapes)}. » Où va-t-${m.il} ?`,
        `Suis ${m.nom} ${m.e} : ${etapes}. Sur quoi s'arrête-t-${m.il} ?`,
      ]);
      const bonne = choixCible(cibles[0]);
      return {
        text,
        format: "qcm",
        choices: shuffle(cibles.map(choixCible)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un déplacement sur un quadrillage se fait étape par étape, en comptant les cases.",
          "On suit la première indication avec le doigt, puis la seconde à partir de là.",
          `Depuis ${m.nom}, on fait ${dirTexte(pas[0])}, puis ${dirTexte(pas[1])} : on tombe sur ${cibles[0].nom}.`,
          `${cap(m.il)} arrive sur ${cibles[0].nom}.`,
        ),
        canvas: quadrillage([
          { p: depart, label: m.e, color: "#ef4444" },
          { p: fin, label: cibles[0].e },
          ...leurres.map((p, k) => ({ p, label: cibles[k + 1].e })),
        ]),
      };
    },
  ),
  tpl(
    "cp_reperage_quadrillage_tpl_3",
    "cp_reperage_quadrillage",
    3,
    "Pars du repère donné et compte les cases dans le bon sens.",
    ["plan", "canvas"],
    () => {
      for (;;) {
        const repere = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const horizontal = randomChoice([true, false]);
        const pas: Pas = horizontal
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 3) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 2) };
        const fin = bouge(repere, pas);
        if (!dedans(fin)) continue;
        const cand = [
          bouge(repere, { dir: CONTRAIRE[pas.dir], n: pas.n }),
          bouge(repere, { dir: pas.dir, n: pas.n + 1 }),
          bouge(repere, { dir: pas.dir, n: pas.n - 1 }),
          bouge(repere, { dir: horizontal ? "haut" : "droite", n: pas.n }),
          bouge(repere, { dir: horizontal ? "bas" : "gauche", n: pas.n }),
        ].filter((p) => dedans(p) && !meme(p, repere) && !meme(p, fin));
        const leurres = shuffle(cand).slice(0, 3);
        if (leurres.length < 2) continue;
        const [r, ...cibles] = shuffle(CIBLES).slice(0, 5);
        const ou = {
          droite: `${pl(pas.n, "case")} à droite ${du(r.nom)}`,
          gauche: `${pl(pas.n, "case")} à gauche ${du(r.nom)}`,
          haut: `${pl(pas.n, "case")} au-dessus ${du(r.nom)}`,
          bas: `${pl(pas.n, "case")} en dessous ${du(r.nom)}`,
        }[pas.dir];
        const n = randomChoice(PRENOMS);
        const text = randomChoice([
          `Qu'y a-t-il ${ou} ${r.e} ?`,
          `${n} cherche ce qui est ${ou} ${r.e}. Qu'est-ce que c'est ?`,
          `Pic s'est posé ${ou} ${r.e}. Sur quoi est-il ?`,
          `Regarde le plan. Que vois-tu ${ou} ${r.e} ?`,
        ]);
        const bonne = choixCible(cibles[0]);
        return {
          text,
          format: "qcm",
          choices: shuffle(cibles.slice(0, leurres.length + 1).map(choixCible)),
          expected: [bonne],
          comparator: "mcq_exact",
          explanation: exp(
            "Sur un plan, on retrouve une place en partant d'un repère connu.",
            "On pose le doigt sur le repère, puis on compte les cases dans le sens indiqué.",
            `Depuis ${r.nom}, on fait ${dirTexte(pas)} : on tombe sur ${cibles[0].nom}.`,
            `C'est ${cibles[0].nom}.`,
          ),
          canvas: quadrillage([
            { p: repere, label: r.e, color: "#64748b" },
            { p: fin, label: cibles[0].e },
            ...leurres.map((p, k) => ({ p, label: cibles[k + 1].e })),
          ]),
        };
      }
    },
  ),
  tpl(
    "cp_reperage_quadrillage_tpl_4",
    "cp_reperage_quadrillage",
    4,
    "Compte les cases sur le côté, puis vers le haut ou le bas, et ajoute.",
    ["plan", "canvas"],
    () => {
      for (;;) {
        const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const fin = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const dx = Math.abs(fin.x - depart.x);
        const dy = Math.abs(fin.y - depart.y);
        if (!dx || !dy) continue;
        const m = randomChoice(MOBILES);
        const c = randomChoice(CIBLES);
        const text = randomChoice([
          `${cap(m.nom)} ${m.e} va ${au(c.nom)} ${c.e}, sans aller en biais. Combien de cases au moins ?`,
          `Pour attraper ${c.nom} ${c.e}, ${m.nom} ${m.e} ne va jamais en biais. Combien de cases fait-${m.il} au moins ?`,
          `${cap(m.nom)} ${m.e} rejoint ${c.nom} ${c.e} par le plus court chemin, sans biais. Combien de cases ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(dx + dy)],
          comparator: "number_equal",
          explanation: exp(
            "Sans aller en biais, on se déplace sur le côté puis vers le haut ou le bas.",
            "On compte les cases sur le côté, puis les cases vers le haut ou le bas, et on ajoute.",
            `${pl(dx, "case")} sur le côté et ${pl(dy, "case")} en hauteur : ${dx} + ${dy} = ${dx + dy}.`,
            `${cap(m.il)} fait au moins ${pl(dx + dy, "case")}.`,
          ),
          canvas: quadrillage([
            { p: depart, label: m.e, color: "#ef4444" },
            { p: fin, label: c.e },
          ]),
        };
      }
    },
  ),

  /* =========================================================
     CP_REPERAGE_DEPLACEMENT — décrire un déplacement
  ========================================================= */
  tpl(
    "cp_reperage_deplacement_tpl_2",
    "cp_reperage_deplacement",
    3,
    "Compte les cases de chaque flèche, puis ajoute.",
    ["deplacement", "canvas"],
    () => {
      const { depart, pas } = tirerChemin(randomChoice([2, 3]));
      const m = randomChoice(MOBILES);
      const c = randomChoice(CIBLES);
      const total = pas.reduce((s, p) => s + p.n, 0);
      const text = randomChoice([
        `Regarde le chemin ${du(m.nom)} ${m.e}. Combien de cases fait-${m.il} en tout ?`,
        `${cap(m.nom)} ${m.e} suit les flèches jusqu'${au(c.nom)} ${c.e}. Combien de cases en tout ?`,
        `Compte les cases du chemin ${du(m.nom)} ${m.e}. Combien y en a-t-il ?`,
        `${cap(m.nom)} ${m.e} va chercher ${c.nom} ${c.e}. Combien de cases parcourt-${m.il} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour décrire un chemin, on compte les cases de chaque morceau.",
          "On compte les cases flèche par flèche, puis on ajoute.",
          `${pas.map((p) => p.n).join(" + ")} = ${total}.`,
          `${cap(m.il)} fait ${pl(total, "case")} en tout.`,
        ),
        canvas: quadrillage([{ p: suit(depart, pas), label: c.e }], {
          chemin: { depart: { p: depart, label: m.e }, pas },
        }),
      };
    },
  ),
  tpl(
    "cp_reperage_deplacement_tpl_3",
    "cp_reperage_deplacement",
    3,
    "Regarde la flèche qui part de l'animal.",
    ["deplacement", "canvas"],
    () => {
      const { depart, pas } = tirerChemin(2);
      const m = randomChoice(MOBILES);
      const c = randomChoice(CIBLES);
      const premier = randomChoice([true, false]);
      const vise = premier ? pas[0] : pas[1];
      const autre = premier ? pas[1] : pas[0];
      const bonne = dirTexte(vise);
      const leurres = [
        dirTexte({ dir: CONTRAIRE[vise.dir], n: vise.n }),
        dirTexte({ dir: vise.dir, n: vise.n + 1 }),
        dirTexte(autre),
        dirTexte({ dir: CONTRAIRE[autre.dir], n: autre.n }),
      ];
      const quel = premier ? "premier" : "dernier";
      const text = randomChoice([
        `Regarde le chemin ${du(m.nom)} ${m.e}. Quel est son ${quel} déplacement ?`,
        `${cap(m.nom)} ${m.e} va ${au(c.nom)} ${c.e}. Que fait-${m.il} en ${quel} ?`,
        `Décris le ${quel} morceau du chemin ${du(m.nom)} ${m.e}.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Décrire un déplacement, c'est dire le sens et le nombre de cases.",
          `On regarde la ${premier ? "première" : "dernière"} flèche : son sens, puis ses cases.`,
          `Le chemin fait ${dirTexte(pas[0])}, puis ${dirTexte(pas[1])}.`,
          `Le ${quel} déplacement est : ${bonne}.`,
        ),
        canvas: quadrillage([{ p: suit(depart, pas), label: c.e }], {
          chemin: { depart: { p: depart, label: m.e }, pas },
        }),
      };
    },
  ),
  {
    kind: "fixed",
    id: "cp_reperage_deplacement_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot avance de 4 cases, puis recule de 4 cases. Où se trouve-t-il ?",
    format: "qcm",
    choices: [
      "à son point de départ",
      "8 cases plus loin",
      "4 cases plus loin",
      "on ne peut pas savoir",
    ],
    expected: ["à son point de départ"],
    comparator: "mcq_exact",
    hint: "Reculer d'autant qu'on a avancé, cela annule le déplacement.",
    explanation: exp(
      "Avancer et reculer sont deux déplacements contraires.",
      "On suit le robot case par case, dans l'ordre des instructions.",
      "Il avance de 4 cases, puis il refait le même chemin à l'envers : 4 - 4 = 0. Il revient exactement là où il était.",
      "Il est revenu à son point de départ.",
    ),
    tags: ["cp", "reperage", "deplacement", "piege", "qcm"],
  },
  tpl(
    "cp_reperage_deplacement_tpl_1",
    "cp_reperage_deplacement",
    4,
    "Avance avec ton doigt, puis reviens en arrière.",
    ["deplacement", "canvas"],
    () => {
      const COLS1 = 8;
      for (;;) {
        const a = randomInt(3, 7);
        const r = randomInt(1, a - 1);
        const fin = a - r;
        const leurres = shuffle(
          [a, a + r, fin + 1, fin - 1].filter((x, k, t) => x >= 1 && x < COLS1 && x !== fin && t.indexOf(x) === k),
        ).slice(0, 3);
        if (leurres.length < 3) continue;
        const m = randomChoice(MOBILES);
        const cibles = shuffle(CIBLES).slice(0, 4);
        const mouv = `avance de ${pl(a, "case")} vers la droite, puis recule de ${pl(r, "case")}`;
        const canvas = quadrillage(
          [
            { p: { x: 0, y: 0 }, label: m.e, color: "#ef4444" },
            { p: { x: fin, y: 0 }, label: cibles[0].e },
            ...leurres.map((x, k) => ({ p: { x, y: 0 }, label: cibles[k + 1].e })),
          ],
          { cols: COLS1, rows: 1 },
        );
        if (randomChoice([true, false])) {
          const text = randomChoice([
            `${cap(m.nom)} ${m.e} ${mouv}. Où s'arrête-t-${m.il} ?`,
            `Sur la piste, ${m.nom} ${m.e} ${mouv}. Que trouve-t-${m.il} ?`,
            `Suis ${m.nom} ${m.e} : ${m.il} ${mouv}. Où est-${m.il} ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: shuffle(cibles.map(choixCible)),
            expected: [choixCible(cibles[0])],
            comparator: "mcq_exact",
            explanation: exp(
              "Reculer défait une partie de ce qu'on a avancé.",
              "On avance case par case avec le doigt, puis on revient en arrière.",
              `${a} cases en avant, ${r} en arrière : ${a} - ${r} = ${fin}. ${cap(m.il)} s'arrête ${pl(fin, "case")} après son départ, sur ${cibles[0].nom}.`,
              `${cap(m.il)} s'arrête sur ${cibles[0].nom}.`,
            ),
            canvas,
          };
        }
        const text = randomChoice([
          `${cap(m.nom)} ${m.e} ${mouv}. À combien de cases de son départ est-${m.il} ?`,
          `Sur la piste, ${m.nom} ${m.e} ${mouv}. Combien de cases le séparent du départ ?`,
          `${cap(m.nom)} ${m.e} ${mouv}. De combien de cases s'est-${m.il} éloigné${m.il === "elle" ? "e" : ""} ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(fin)],
          comparator: "number_equal",
          explanation: exp(
            "Reculer défait une partie de ce qu'on a avancé.",
            "On avance d'abord, puis on retire ce qu'on a reculé.",
            `${a} - ${r} = ${fin}.`,
            `${cap(m.il)} est à ${pl(fin, "case")} de son départ.`,
          ),
          canvas,
        };
      }
    },
  ),

  /* =========================================================
     CP_REPERAGE_ASSEMBLAGE — reproduire un tas de cubes
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_assemblage_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une photo, on voit une tour de cubes. Certains cubes sont cachés derrière les autres. Que faut-il faire pour reproduire la tour exactement ?",
    format: "qcm",
    choices: [
      "regarder la tour sous plusieurs côtés",
      "compter seulement les cubes qu'on voit",
      "prendre le plus de cubes possible",
      "deviner au hasard",
    ],
    expected: ["regarder la tour sous plusieurs côtés"],
    comparator: "mcq_exact",
    hint: "Une seule photo ne montre jamais tout.",
    explanation: exp(
      "Une photo montre un assemblage depuis un seul côté : elle en cache une partie.",
      "On tourne autour du modèle, ou on regarde plusieurs photos prises de côtés différents.",
      "Un cube caché derrière un autre n'apparait sur aucune photo prise de face. En regardant de côté et de derrière, on découvre les cubes manquants.",
      "Il faut regarder la tour sous plusieurs côtés.",
    ),
    tags: ["cp", "reperage", "assemblage", "piege", "qcm"],
  },
  tpl(
    "cp_reperage_assemblage_tpl_1",
    "cp_reperage_assemblage",
    3,
    "Compte les cubes rangée par rangée, en partant du bas.",
    ["assemblage", "canvas"],
    () => {
      const { nom, cubes } = modele();
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `${n} veut construire ${nom} du dessin. Combien de cubes lui faut-il ?`,
        `Combien de cubes y a-t-il dans ${nom} ${deNom(n)} ?`,
        `Compte les cubes de ${nom}. Combien y en a-t-il ?`,
        `${n} copie ${nom} du modèle. Combien de cubes doit-on prendre ?`,
        `Pic regarde ${nom} en cubes. Combien de cubes vois-tu ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(cubes.length)],
        comparator: "number_equal",
        explanation: exp(
          "Pour reproduire un assemblage, on compte ses cubes sans en oublier.",
          "On compte rangée par rangée, du bas vers le haut.",
          `En comptant rangée par rangée, on trouve ${pl(cubes.length, "cube")}.`,
          `Il faut ${pl(cubes.length, "cube")}.`,
        ),
        canvas: dessinCubes(cubes),
      };
    },
  ),
  tpl(
    "cp_reperage_assemblage_tpl_3",
    "cp_reperage_assemblage",
    3,
    "Compte tous les cubes du modèle, puis enlève ceux déjà posés.",
    ["assemblage", "canvas"],
    () => {
      const { nom, cubes } = modele();
      const k = randomInt(1, cubes.length - 1);
      const n = randomChoice(PRENOMS);
      const poses = k === 1 ? "1 cube est posé" : `${k} cubes sont posés`;
      const text = randomChoice([
        `${n} a déjà posé ${pl(k, "cube")}. Combien en manque-t-il pour finir ${nom} ?`,
        `Pour copier ${nom}, ${n} a ${pl(k, "cube")}. Combien de cubes manque-t-il ?`,
        `${n} construit ${nom} du dessin. ${cap(poses)}. Combien en reste-t-il à poser ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(cubes.length - k)],
        comparator: "number_equal",
        explanation: exp(
          "Pour finir une copie, on compare le modèle et ce qui est déjà fait.",
          "On compte les cubes du modèle, puis on enlève ceux déjà posés.",
          `Le modèle a ${pl(cubes.length, "cube")}. ${cubes.length} - ${k} = ${cubes.length - k}.`,
          `Il manque ${pl(cubes.length - k, "cube")}.`,
        ),
        canvas: dessinCubes(cubes),
      };
    },
  ),
  tpl(
    "cp_reperage_assemblage_tpl_2",
    "cp_reperage_assemblage",
    4,
    "Compte ceux qu'on voit, puis pense à ceux qui sont derrière.",
    ["assemblage", "piege"],
    () => {
      const visibles = randomInt(4, 8);
      const caches = randomInt(1, 3);
      const total = visibles + caches;
      const n = randomChoice(PRENOMS);
      const quoi = randomChoice(["une tour", "un château", "un mur", "un pont", "une maison", "une fusée"]);
      const text = randomChoice([
        `Sur la photo d'${quoi}, on voit ${visibles} cubes. ${caches === 1 ? "1 cube est caché" : `${caches} cubes sont cachés`} derrière. Combien de cubes en tout ?`,
        `${n} construit ${quoi}. On voit ${visibles} cubes, et ${caches === 1 ? "1 cube est caché" : `${caches} cubes sont cachés`}. Combien de cubes en tout ?`,
        `En tournant autour de ${quoi}, ${n} trouve ${caches === 1 ? "1 cube caché" : `${caches} cubes cachés`}. De face, on en voit ${visibles}. Combien en tout ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un assemblage contient parfois des cubes qu'aucune photo de face ne montre.",
          "On ajoute les cubes cachés à ceux qu'on avait comptés.",
          `${visibles} + ${caches} = ${total}. Compter seulement ce qu'on voit aurait donné ${visibles}, et la copie aurait été fausse.`,
          `Il y a ${total} cubes en tout.`,
        ),
      };
    },
  ),

  /* =========================================================
     CP_REPERAGE_DEFI — le point de vue, et le chemin retour
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Tu es allé à la cantine en tournant à droite au bout du couloir. Pour revenir en classe, de quel côté dois-tu tourner ?",
    format: "qcm",
    choices: ["à gauche", "à droite", "tout droit", "on ne peut pas savoir"],
    expected: ["à gauche"],
    comparator: "mcq_exact",
    hint: "Au retour, tu marches dans l'autre sens.",
    explanation: exp(
      "Pour refaire un chemin à l'envers, chaque virage devient son contraire.",
      "On refait le trajet dans l'autre sens, en inversant la gauche et la droite.",
      "À l'aller, tu as tourné à droite. Au retour, tu marches dans l'autre sens : le même coin se prend à gauche.",
      "Il faut tourner à gauche.",
    ),
    tags: ["cp", "reperage", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot pivote d'un quart de tour à droite, puis encore d'un quart de tour à droite. Où regarde-t-il maintenant ?",
    format: "qcm",
    choices: [
      "exactement derrière lui",
      "à sa droite",
      "à sa gauche",
      "devant lui, comme au départ",
    ],
    expected: ["exactement derrière lui"],
    comparator: "mcq_exact",
    hint: "Deux quarts de tour, cela fait un demi-tour.",
    explanation: exp(
      "Un quart de tour fait pivoter d'un coin ; deux quarts de tour du même côté font un demi-tour.",
      "On tourne une première fois, on regarde, puis on tourne une seconde fois.",
      "Après le premier quart de tour, le robot regarde vers sa droite d'avant. Après le second, il a fait la moitié d'un tour complet : il regarde exactement dans la direction opposée à celle du départ.",
      "Il regarde exactement derrière lui.",
    ),
    tags: ["cp", "reperage", "defi", "piege", "qcm"],
  },
  tpl(
    "cp_reperage_defi_tpl_1",
    "cp_reperage_defi",
    5,
    "Un programme compte au plus dix instructions, dont deux virages.",
    ["defi"],
    () => {
      // ⚠️ Les bornes doivent laisser passer les DEUX réponses.
      const avancees = randomInt(5, 10);
      const virages = randomInt(0, 3);
      const total = avancees + virages;
      const trop = total > 10 || virages > 2;
      const bonne = trop ? "non" : "oui";
      const m = randomChoice(MOBILES.filter((x) => x.nom !== "Pic"));
      const n = randomChoice(PRENOMS);
      const v = virages === 0 ? "aucun virage" : virages === 1 ? "1 virage" : `${virages} virages`;
      const text = randomChoice([
        `${n} programme ${m.nom} ${m.e} : ${avancees} « avancer » et ${v}. Règle : 10 instructions au plus, 2 virages au plus. Permis ?`,
        `Le programme ${du(m.nom)} ${m.e} a ${avancees} « avancer » et ${v}. Règle : 10 instructions au plus, 2 virages au plus. Est-il permis ?`,
        `Règle du jeu : 10 instructions au plus, dont 2 virages. ${n} écrit ${avancees} « avancer » et ${v} pour ${m.nom} ${m.e}. C'est bon ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un programme de déplacement a une longueur limitée : au plus dix instructions, dont deux virages.",
          "On compte toutes les instructions, virages compris, puis on vérifie les deux règles.",
          `${avancees} + ${virages} = ${total} instructions, dont ${v}. ${
            total > 10 && virages > 2
              ? `${total} dépasse 10, et ${virages} virages dépassent 2 : les deux règles sont brisées.`
              : total > 10
                ? `${total} dépasse 10 : le programme est trop long.`
                : virages > 2
                  ? `Le total tient dans 10, mais ${virages} virages dépassent les 2 permis.`
                  : `${total} ne dépasse pas 10, et il n'y a pas plus de 2 virages : c'est permis.`
          }`,
          trop ? "Non, ce programme n'est pas permis." : "Oui, ce programme est permis.",
        ),
      };
    },
  ),
  tpl(
    "cp_reperage_defi_tpl_2",
    "cp_reperage_defi",
    5,
    "Pour revenir, on part de la fin du chemin, dans l'autre sens.",
    ["defi", "piege", "canvas"],
    () => {
      const { depart, pas } = tirerChemin(2);
      const n = randomChoice(PRENOMS);
      const c = randomChoice(CIBLES.filter((x) => x.e !== "🏠"));
      const dernier = pas[1];
      const bonne = dirTexte({ dir: CONTRAIRE[dernier.dir], n: dernier.n });
      const text = randomChoice([
        `${n} va de la maison 🏠 ${au(c.nom)} ${c.e} par ce chemin. Pour rentrer, que faut-il faire d'abord ?`,
        `Pic a volé de la maison 🏠 ${au(c.nom)} ${c.e}. Pour revenir, quel est son premier déplacement ?`,
        `Le chemin va de la maison 🏠 ${au(c.nom)} ${c.e}. Pour le refaire à l'envers, par quoi commence-t-on ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [
          dirTexte(dernier),
          dirTexte({ dir: CONTRAIRE[pas[0].dir], n: pas[0].n }),
          dirTexte(pas[0]),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour refaire un chemin à l'envers, on part de la fin et chaque déplacement change de sens.",
          "On regarde le DERNIER morceau du chemin, et on le fait dans l'autre sens.",
          `Le chemin finit par ${dirTexte(dernier)}. Au retour, on commence donc par ${bonne}.`,
          `On commence par ${bonne}.`,
        ),
        canvas: quadrillage([{ p: suit(depart, pas), label: c.e }], {
          chemin: { depart: { p: depart, label: "🏠" }, pas },
        }),
      };
    },
  ),
  tpl(
    "cp_reperage_defi_tpl_3",
    "cp_reperage_defi",
    5,
    "Au retour, tu marches dans l'autre sens : le virage change de côté.",
    ["defi", "piege"],
    () => {
      const cote = randomChoice(["droite", "gauche"] as const);
      const inverse = cote === "droite" ? "gauche" : "droite";
      const n = randomChoice(PRENOMS);
      const lieu = randomChoice([
        "à la cantine", "à la bibliothèque", "au gymnase", "à l'infirmerie",
        "dans la cour", "à la piscine", "à la boulangerie", "au parc",
        "chez sa mamie", "au marché",
      ]);
      const ou = randomChoice(["au bout du couloir", "au coin de la rue", "après le portail", "au grand arbre"]);
      const text = randomChoice([
        `Pour aller ${lieu}, ${n} tourne à ${cote} ${ou}. Au retour, de quel côté tourne-t-on ?`,
        `${n} va ${lieu} : ${ou}, on tourne à ${cote}. Et pour revenir ?`,
        `À l'aller ${lieu}, on tourne à ${cote} ${ou}. ${n} rentre. Où tourne-t-on ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(`à ${inverse}`, [`à ${cote}`, "tout droit", "on fait demi-tour"]),
        expected: [`à ${inverse}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour refaire un chemin à l'envers, chaque virage devient son contraire.",
          "On refait le trajet dans l'autre sens, en échangeant la gauche et la droite.",
          `À l'aller, on tourne à ${cote}. Au retour, on arrive par l'autre côté : le même coin se prend à ${inverse}.`,
          `On tourne à ${inverse}.`,
        ),
      };
    },
  ),
];
