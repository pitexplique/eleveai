// lib/tutor-v4/questionBank/cp/maths/algorithmique.bank.ts
//
// Les instructions et les déplacements codés du CP, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) : au CP,
// l'initiation à la pensée informatique n'a pas de rubrique à elle. Elle vit
// dans deux endroits du programme, et c'est de là que sortent ces questions.
//   — dans « Le repérage dans l'espace » : « Utiliser et produire une SUITE
//     D'INSTRUCTIONS qui codent un déplacement en utilisant un vocabulaire
//     spatial précis. » Les instructions sont nommées : avancer, reculer,
//     tourner à droite, tourner à gauche, monter, descendre. Pour un robot sur
//     tapis quadrillé : « avancer d'une case », « pivoter d'un quart de tour à
//     droite », « pivoter d'un quart de tour à gauche ». Et la contrainte
//     chiffrée : « Les déplacements à programmer comprennent au maximum DIX
//     INSTRUCTIONS, DONT DEUX VIRAGES. » ;
//   — dans « Les nombres entiers » : « Utiliser les nombres ordinaux dans le
//     cadre de l'étude de SUITES DE SYMBOLES, de formes, de lettres ou de
//     nombres. » Le BO donne ses exemples : dans « ABABAB… », quelle est la
//     dix-neuvième lettre ? dans « △○□△○□… », quel est le vingtième symbole ?
//   ⛔ Pas de programmation Scratch au CP. Le canvas `scratch` ne sert ici que
//     de CARTES D'INSTRUCTIONS (« avancer de 2 cases », « répéter 3 fois »),
//     écrites en mots, comme les cartes du robot de la classe.
//
// LE PIÈGE DE LA NOTION : l'ordre des instructions. Son cousin vit dans les
// suites répétitives : on croit reconnaitre le motif après deux symboles,
// alors qu'il en fait trois.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS. Chaque gabarit tire une SITUATION
// (le robot, un animal, un prénom de la troupe) × une TOURNURE × des nombres.
// Les dessins :
//   — `reperage` en QUADRILLAGE NU (aucun axe, aucun nombre), les objets au
//     centre des cases, les flèches de codage « → ↑ » écrites dans l'énoncé.
//     Le chemin n'est JAMAIS dessiné quand on demande où il mène ;
//   — `scratch` pour montrer les cartes d'instructions ;
//   — `objets` pour les suites répétitives : le début de la suite est
//     dessiné, l'objet demandé ne l'est jamais.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  ObjetId,
  ObjetsCanvasData,
  ReperageCanvasData,
  ScratchBlockData,
  ScratchCanvasData,
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

const RANGS = [
  "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième",
  "septième", "huitième", "neuvième", "dixième", "onzième", "douzième",
  "treizième", "quatorzième", "quinzième", "seizième", "dix-septième",
  "dix-huitième", "dix-neuvième", "vingtième",
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const au = (gn: string) => (gn.startsWith("le ") ? `au ${gn.slice(3)}` : `à ${gn}`);
const du = (gn: string) => (gn.startsWith("le ") ? `du ${gn.slice(3)}` : `de ${gn}`);
const pl = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;
const deNom = (n: string) => (/^[AEIOUYÉÈ]/.test(n) ? `d'${n}` : `de ${n}`);

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Enzo",
] as const;

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

/* ---------- Le quadrillage nu et les flèches de codage ---------- */

type Pos = { x: number; y: number };
type Dir = "droite" | "gauche" | "haut" | "bas";
type Pas = { dir: Dir; n: number };
const COLS = 6;
const ROWS = 4;
const FLECHE: Record<Dir, string> = { droite: "→", gauche: "←", haut: "↑", bas: "↓" };
const VERS: Record<Dir, string> = {
  droite: "vers la droite",
  gauche: "vers la gauche",
  haut: "vers le haut",
  bas: "vers le bas",
};
const CONTRAIRE: Record<Dir, Dir> = { droite: "gauche", gauche: "droite", haut: "bas", bas: "haut" };
/** « → → ↑ » : une flèche par case, comme les cartes de codage. */
const code = (pas: readonly Pas[]) => pas.flatMap((p) => Array.from({ length: p.n }, () => FLECHE[p.dir])).join(" ");

function bouge(p: Pos, pas: Pas): Pos {
  if (pas.dir === "droite") return { x: p.x + pas.n, y: p.y };
  if (pas.dir === "gauche") return { x: p.x - pas.n, y: p.y };
  if (pas.dir === "haut") return { x: p.x, y: p.y + pas.n };
  return { x: p.x, y: p.y - pas.n };
}
const suit = (p: Pos, pas: readonly Pas[]) => pas.reduce(bouge, p);
const dedans = (p: Pos) => p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS;
const meme = (a: Pos, b: Pos) => a.x === b.x && a.y === b.y;

type Marque = { p: Pos; label: string; color?: string };
const COULEURS = ["#f97316", "#22c55e", "#3b82f6", "#a855f7", "#eab308"];

function quadrillage(marques: Marque[]): ReperageCanvasData {
  return {
    kind: "reperage",
    grid: { rows: ROWS, cols: COLS },
    points: marques.map((m, i) => ({
      x: m.p.x + 0.5,
      y: m.p.y + 0.5,
      label: m.label,
      color: m.color ?? COULEURS[i % COULEURS.length],
    })),
    display: { showGrid: true, showAxes: false, showCoordinates: false, showPointLabels: true, showTarget: false },
    // ⭐ Étroit : mis à l'échelle de sa carte, il grossit les emoji (rendu du 10/11).
    size: { width: 260, height: 64 + ROWS * 44 },
  };
}

/** Un chemin de `k` morceaux qui tourne à chaque fois, et des arrivées
 *  fausses mais plausibles : un morceau à l'envers, une case de trop ou de
 *  moins. */
function tirerTrajet(k: number): { depart: Pos; pas: Pas[]; fin: Pos; leurres: { pas: Pas[]; fin: Pos }[] } {
  for (;;) {
    const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
    const pas: Pas[] = [];
    let horizontal = randomChoice([true, false]);
    for (let i = 0; i < k; i++) {
      pas.push(
        horizontal
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 3) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 2) },
      );
      horizontal = !horizontal;
    }
    let p = depart;
    let ok = true;
    for (const s of pas) {
      p = bouge(p, s);
      if (!dedans(p) || meme(p, depart)) ok = false;
    }
    if (!ok) continue;
    const fin = p;
    const variantes: Pas[][] = [];
    pas.forEach((s, i) => {
      const avec = (q: Pas) => pas.map((r, j) => (j === i ? q : r));
      variantes.push(avec({ dir: CONTRAIRE[s.dir], n: s.n }), avec({ dir: s.dir, n: s.n + 1 }));
      if (s.n > 1) variantes.push(avec({ dir: s.dir, n: s.n - 1 }));
    });
    const leurres: { pas: Pas[]; fin: Pos }[] = [];
    for (const v of shuffle(variantes)) {
      const q = suit(depart, v);
      if (dedans(q) && !meme(q, depart) && !meme(q, fin) && !leurres.some((l) => meme(l.fin, q))) {
        leurres.push({ pas: v, fin: q });
      }
    }
    if (leurres.length >= 3) return { depart, pas, fin, leurres: leurres.slice(0, 3) };
  }
}

/* ---------- Les cartes d'instructions ---------- */

const carte = (texte: string): ScratchBlockData => ({ type: "turn", text: texte });
const cartes = (blocks: ScratchBlockData[], title = "Le programme"): ScratchCanvasData => ({
  kind: "scratch",
  title,
  blocks,
  display: { compact: true },
});

/* ---------- Les objets des suites ---------- */

type Obj = { quoi: ObjetId; nom: string };
const OBJETS: readonly Obj[] = [
  { quoi: "pomme", nom: "la pomme" },
  { quoi: "banane", nom: "la banane" },
  { quoi: "etoile", nom: "l'étoile" },
  { quoi: "fleur", nom: "la fleur" },
  { quoi: "ballon", nom: "le ballon" },
  { quoi: "poisson", nom: "le poisson" },
  { quoi: "chat", nom: "le chat" },
  { quoi: "papillon", nom: "le papillon" },
  { quoi: "soleil", nom: "le soleil" },
  { quoi: "nuage", nom: "le nuage" },
  { quoi: "feuille", nom: "la feuille" },
  { quoi: "voiture", nom: "la voiture" },
  { quoi: "bateau", nom: "le bateau" },
  { quoi: "oiseau", nom: "l'oiseau" },
  { quoi: "tasse", nom: "la tasse" },
  { quoi: "livre", nom: "le livre" },
];

/** Un motif (« ABB », « ABC »…) habillé d'objets tirés au hasard. */
function tirerSuite(motifs: readonly string[]) {
  const motif = randomChoice(motifs);
  const lettres = [...new Set(Array.from(motif))];
  const objs = shuffle(OBJETS).slice(0, lettres.length + 1);
  const deLettre = (l: string) => objs[lettres.indexOf(l)];
  const absent = objs[lettres.length];
  const terme = (i: number) => deLettre(motif[i % motif.length]);
  const montres = motif.length >= 4 ? 8 : 6;
  const canvas: ObjetsCanvasData = {
    kind: "objets",
    elements: Array.from({ length: montres }, (_, i) => ({ quoi: terme(i).quoi })),
    colonnes: montres === 8 ? 4 : 6,
    mode: "couleur",
    size: { width: montres === 8 ? 300 : 400 },
  };
  return { motif, objs: objs.slice(0, lettres.length), absent, terme, montres, canvas };
}

const INTRO_SUITE = [
  "Regarde la suite.",
  "Pic a rangé ces objets.",
  "Voici la guirlande",
  "Voici la frise",
] as const;
const introSuite = () => {
  const i = randomChoice(INTRO_SUITE);
  return i.startsWith("Voici") ? `${i} ${deNom(randomChoice(PRENOMS))}.` : i;
};

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
    notionId: "algorithmique",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", "algorithmique", ...tags, "template"],
    generate,
  };
}

const INSTRUCTIONS = [
  { carte: "avancer d'une case", sens: "il va une case en avant" },
  { carte: "reculer d'une case", sens: "il va une case en arrière" },
  { carte: "pivoter à droite", sens: "il tourne sur place vers sa droite" },
  { carte: "pivoter à gauche", sens: "il tourne sur place vers sa gauche" },
  { carte: "monter d'une case", sens: "il va une case vers le haut" },
  { carte: "descendre d'une case", sens: "il va une case vers le bas" },
] as const;

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ALGO_INSTRUCTION — suivre les instructions, dans l'ordre
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_instruction_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot reçoit « avance de 2 cases, puis tourne à droite ». Un autre reçoit « tourne à droite, puis avance de 2 cases ». Arrivent-ils au même endroit ?",
    format: "qcm",
    choices: [
      "non, l'ordre des instructions change le trajet",
      "oui, ce sont les mêmes instructions",
      "oui, s'ils partent du même endroit",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre des instructions change le trajet"],
    comparator: "mcq_exact",
    hint: "Fais les deux trajets avec ton doigt sur la table.",
    explanation: exp(
      "Une suite d'instructions se lit dans l'ordre : chaque instruction part de là où la précédente s'est arrêtée.",
      "On exécute les deux programmes séparément, une instruction à la fois.",
      "Le premier robot avance d'abord de 2 cases tout droit, et ne tourne qu'après : il finit 2 cases plus loin. Le second tourne sur place, puis avance de 2 cases dans une autre direction : il finit ailleurs. Mêmes instructions, autre ordre, autre arrivée.",
      "Non : l'ordre des instructions change le trajet.",
    ),
    tags: ["cp", "algorithmique", "instruction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_algo_instruction_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_instruction",
    difficulty: 2,
    theme: "neutral",
    text: "Que fait un robot quand il reçoit l'instruction « pivoter d'un quart de tour à droite » ?",
    format: "qcm",
    choices: [
      "il tourne sur place, sans changer de case",
      "il avance d'une case vers la droite",
      "il recule d'une case",
      "il fait un tour complet",
    ],
    expected: ["il tourne sur place, sans changer de case"],
    comparator: "mcq_exact",
    hint: "Pivoter, c'est se retourner ; avancer, c'est se déplacer.",
    explanation: exp(
      "Pivoter, c'est changer de direction sans quitter sa case.",
      "On distingue les instructions qui déplacent de celles qui font tourner.",
      "Après un quart de tour à droite, le robot est toujours sur la même case : c'est seulement son regard qui a changé de direction. Il faudra une instruction « avancer » pour qu'il se déplace.",
      "Il tourne sur place, sans changer de case.",
    ),
    tags: ["cp", "algorithmique", "instruction", "piege", "qcm"],
  },
  tpl(
    "cp_algo_instruction_tpl_2",
    "cp_algo_instruction",
    2,
    "Lis bien le verbe de la carte : avancer, reculer, pivoter, monter, descendre.",
    ["instruction", "canvas"],
    () => {
      const ins = randomChoice(INSTRUCTIONS);
      const m = randomChoice(MOBILES.filter((x) => x.il === "il"));
      const n = randomChoice(PRENOMS);
      if (randomChoice([true, false, true])) {
        const text = randomChoice([
          `${n} donne cette carte ${au(m.nom)} ${m.e}. Que fait-il ?`,
          `${cap(m.nom)} ${m.e} lit la carte. Que va-t-il faire ?`,
          `Voici la carte ${du(m.nom)} ${m.e}. Que fait-il ?`,
          `${n} montre la carte ${au(m.nom)} ${m.e}. Comment bouge-t-il ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: makeChoices(ins.sens, INSTRUCTIONS.map((x) => x.sens)),
          expected: [ins.sens],
          comparator: "mcq_exact",
          explanation: exp(
            "Une instruction dit au robot UNE chose à faire.",
            "On lit le verbe de la carte : il dit le mouvement.",
            `La carte dit « ${ins.carte} » : ${ins.sens}.`,
            `${cap(ins.sens)}.`,
          ),
          canvas: cartes([carte(ins.carte)], "La carte"),
        };
      }
      const text = randomChoice([
        `Quelle carte faut-il pour que ${m.nom} ${m.e} fasse ceci : ${ins.sens.replace("il ", "")} ?`,
        `${n} veut que ${m.nom} ${m.e} ${ins.sens.replace("il va", "aille").replace("il tourne", "tourne")}. Quelle carte choisir ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(ins.carte, INSTRUCTIONS.map((x) => x.carte)),
        expected: [ins.carte],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque carte dit un seul mouvement.",
          "On cherche la carte dont le verbe dit ce mouvement.",
          `« ${cap(ins.carte)} » : ${ins.sens}.`,
          `Il faut la carte « ${ins.carte} ».`,
        ),
      };
    },
  ),
  tpl(
    "cp_algo_instruction_tpl_1",
    "cp_algo_instruction",
    3,
    "Suis les cartes une par une, dans l'ordre, de haut en bas.",
    ["instruction", "canvas"],
    () => {
      const a = randomInt(2, 6);
      const nb = randomChoice([2, 3]);
      const blocs: ScratchBlockData[] = [carte(`avancer de ${pl(a, "case")}`)];
      let pos = a;
      const etapes = [`on avance de ${a}`];
      for (let i = 1; i < nb; i++) {
        const recule = pos > 1 && randomChoice([true, false]);
        const b = recule ? randomInt(1, pos - 1) : randomInt(1, 3);
        pos = recule ? pos - b : pos + b;
        blocs.push(carte(`${recule ? "reculer" : "avancer"} de ${pl(b, "case")}`));
        etapes.push(`on ${recule ? "recule" : "avance"} de ${b}`);
      }
      const m = randomChoice(MOBILES);
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `Voici le programme ${du(m.nom)} ${m.e}. À combien de cases du départ s'arrête-t-${m.il} ?`,
        `${n} a écrit ce programme pour ${m.nom} ${m.e}. À combien de cases du départ finit-${m.il} ?`,
        `${cap(m.nom)} ${m.e} suit les cartes dans l'ordre. Combien de cases le séparent du départ, à la fin ?`,
        `Lis les cartes ${du(m.nom)} ${m.e}, de haut en bas. À combien de cases du départ finit-${m.il} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(pos)],
        comparator: "number_equal",
        explanation: exp(
          "On exécute les instructions dans l'ordre, en repartant à chaque fois d'où l'on s'est arrêté.",
          "On lit les cartes de haut en bas ; avancer ajoute, reculer enlève.",
          `${cap(etapes.join(", puis "))} : ${pl(pos, "case")} du départ.`,
          `${cap(m.il)} s'arrête à ${pl(pos, "case")} du départ.`,
        ),
        canvas: cartes(blocs),
      };
    },
  ),
  tpl(
    "cp_algo_instruction_tpl_3",
    "cp_algo_instruction",
    3,
    "Une flèche, c'est une case. Suis les flèches avec ton doigt.",
    ["instruction", "canvas"],
    () => {
      const { depart, pas, fin, leurres } = tirerTrajet(2);
      const m = randomChoice(MOBILES);
      const n = randomChoice(PRENOMS);
      const cibles = shuffle(CIBLES).slice(0, 4);
      const c = code(pas);
      const text = randomChoice([
        `${cap(m.nom)} ${m.e} suit les flèches ${c}. Où arrive-t-${m.il} ?`,
        `${n} code le chemin ${du(m.nom)} ${m.e} : ${c}. Que trouve-t-${m.il} ?`,
        `Programme ${du(m.nom)} ${m.e} : ${c}. Sur quoi s'arrête-t-${m.il} ?`,
        `Fais avancer ${m.nom} ${m.e} : ${c}. Où va-t-${m.il} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(cibles.map(choixCible)),
        expected: [choixCible(cibles[0])],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque flèche fait avancer d'une case dans son sens.",
          "On suit les flèches une par une, dans l'ordre, avec le doigt.",
          `${pas.map((p) => `${pl(p.n, "case")} ${VERS[p.dir]}`).join(", puis ")} : on arrive sur ${cibles[0].nom}.`,
          `${cap(m.il)} arrive sur ${cibles[0].nom}.`,
        ),
        canvas: quadrillage([
          { p: depart, label: m.e, color: "#ef4444" },
          { p: fin, label: cibles[0].e },
          ...leurres.map((l, k) => ({ p: l.fin, label: cibles[k + 1].e })),
        ]),
      };
    },
  ),
  tpl(
    "cp_algo_instruction_tpl_4",
    "cp_algo_instruction",
    4,
    "Lis les flèches dans l'ordre, sans en sauter une.",
    ["instruction", "canvas"],
    () => {
      const { depart, pas, fin, leurres } = tirerTrajet(3);
      const m = randomChoice(MOBILES);
      const n = randomChoice(PRENOMS);
      const cibles = shuffle(CIBLES).slice(0, 4);
      const c = code(pas);
      const text = randomChoice([
        `${cap(m.nom)} ${m.e} suit ce long code : ${c}. Où arrive-t-${m.il} ?`,
        `${n} a écrit ${c} pour ${m.nom} ${m.e}. Que trouve-t-${m.il} au bout ?`,
        `Le code ${du(m.nom)} ${m.e} est ${c}. Sur quoi s'arrête-t-${m.il} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(cibles.map(choixCible)),
        expected: [choixCible(cibles[0])],
        comparator: "mcq_exact",
        explanation: exp(
          "Un programme se lit dans l'ordre : chaque flèche part de la case où l'on est.",
          "On suit les flèches une par une avec le doigt.",
          `${pas.map((p) => `${pl(p.n, "case")} ${VERS[p.dir]}`).join(", puis ")} : on arrive sur ${cibles[0].nom}.`,
          `${cap(m.il)} arrive sur ${cibles[0].nom}.`,
        ),
        canvas: quadrillage([
          { p: depart, label: m.e, color: "#ef4444" },
          { p: fin, label: cibles[0].e },
          ...leurres.map((l, k) => ({ p: l.fin, label: cibles[k + 1].e })),
        ]),
      };
    },
  ),

  /* =========================================================
     CP_ALGO_DEPLACEMENT — coder un déplacement
     Avec la contrainte du BO : dix instructions, deux virages.
  ========================================================= */
  tpl(
    "cp_algo_deplacement_tpl_3",
    "cp_algo_deplacement",
    3,
    "Une flèche pour chaque case à franchir.",
    ["deplacement", "canvas"],
    () => {
      for (;;) {
        const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const pas: Pas = randomChoice([true, false])
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(2, 5) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 3) };
        const fin = bouge(depart, pas);
        if (!dedans(fin)) continue;
        const m = randomChoice(MOBILES);
        const c = randomChoice(CIBLES);
        const f = FLECHE[pas.dir];
        const text = randomChoice([
          `Combien de flèches ${f} faut-il pour mener ${m.nom} ${m.e} ${au(c.nom)} ${c.e} ?`,
          `${cap(m.nom)} ${m.e} veut ${c.nom} ${c.e}. Combien de flèches ${f} faut-il écrire ?`,
          `Code le chemin ${du(m.nom)} ${m.e} jusqu'${au(c.nom)} ${c.e}. Combien de flèches ${f} ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(pas.n)],
          comparator: "number_equal",
          explanation: exp(
            "Coder un déplacement, c'est écrire une flèche pour chaque case.",
            "On compte les cases à franchir, une par une.",
            `${cap(c.nom)} est à ${pl(pas.n, "case")} ${VERS[pas.dir]} : il faut ${pas.n} flèche${pas.n > 1 ? "s" : ""} ${f}.`,
            `Il faut ${pas.n} flèche${pas.n > 1 ? "s" : ""}.`,
          ),
          canvas: quadrillage([
            { p: depart, label: m.e, color: "#ef4444" },
            { p: fin, label: c.e },
          ]),
        };
      }
    },
  ),
  tpl(
    "cp_algo_deplacement_tpl_4",
    "cp_algo_deplacement",
    3,
    "Regarde où est le but : à droite, à gauche, en haut ou en bas ?",
    ["deplacement", "canvas"],
    () => {
      for (;;) {
        const depart = { x: randomInt(0, COLS - 1), y: randomInt(0, ROWS - 1) };
        const pas: Pas = randomChoice([true, false])
          ? { dir: randomChoice(["droite", "gauche"] as const), n: randomInt(1, 4) }
          : { dir: randomChoice(["haut", "bas"] as const), n: randomInt(1, 3) };
        const fin = bouge(depart, pas);
        if (!dedans(fin)) continue;
        const m = randomChoice(MOBILES);
        const c = randomChoice(CIBLES);
        const n = randomChoice(PRENOMS);
        const bonne = FLECHE[pas.dir];
        const text = randomChoice([
          `Quelle flèche faut-il pour mener ${m.nom} ${m.e} ${au(c.nom)} ${c.e} ?`,
          `${n} code le chemin ${du(m.nom)} ${m.e} vers ${c.nom} ${c.e}. Quelle flèche faut-il ?`,
          `${cap(m.nom)} ${m.e} veut ${c.nom} ${c.e}. Quelle flèche doit-${m.il} suivre ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: shuffle(["→", "←", "↑", "↓"]),
          expected: [bonne],
          comparator: "mcq_exact",
          explanation: exp(
            "Chaque flèche montre un sens : → droite, ← gauche, ↑ haut, ↓ bas.",
            "On regarde où est le but par rapport à l'animal.",
            `${cap(c.nom)} est ${VERS[pas.dir]} : c'est la flèche ${bonne}.`,
            `C'est la flèche ${bonne}.`,
          ),
          canvas: quadrillage([
            { p: depart, label: m.e, color: "#ef4444" },
            { p: fin, label: c.e },
          ]),
        };
      }
    },
  ),
  tpl(
    "cp_algo_deplacement_tpl_1",
    "cp_algo_deplacement",
    4,
    "Compte les cases, puis les virages : les deux comptent comme des instructions.",
    ["deplacement"],
    () => {
      const cases = randomInt(3, 7);
      const virages = randomInt(1, 2);
      const total = cases + virages;
      const m = randomChoice(MOBILES.filter((x) => x.nom !== "Pic"));
      const n = randomChoice(PRENOMS);
      const v = virages === 1 ? "1 virage" : `${virages} virages`;
      const text = randomChoice([
        `Le programme ${du(m.nom)} ${m.e} : avancer de ${cases} cases, et ${v}. Combien d'instructions en tout ?`,
        `${n} fait avancer ${m.nom} ${m.e} de ${cases} cases, avec ${v}. Combien d'instructions faut-il ?`,
        `Une carte par case, une carte par virage. ${cap(m.nom)} ${m.e} fait ${cases} cases et ${v}. Combien de cartes ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque avancée d'une case et chaque virage compte pour une instruction.",
          "On additionne les avancées et les virages.",
          `${cases} avancées + ${v} = ${total} instructions. On oublie souvent le virage, qui ne fait pourtant pas avancer.`,
          `Il faut ${total} instructions.`,
        ),
      };
    },
  ),
  tpl(
    "cp_algo_deplacement_tpl_2",
    "cp_algo_deplacement",
    4,
    "Au retour, chaque virage se prend de l'autre côté.",
    ["deplacement", "piege"],
    () => {
      const cote = randomChoice(["droite", "gauche"] as const);
      const inverse = cote === "droite" ? "gauche" : "droite";
      const cases = randomInt(2, 5);
      const m = randomChoice(MOBILES.filter((x) => x.nom !== "Pic"));
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `À l'aller, ${m.nom} ${m.e} avance de ${cases} cases puis tourne à ${cote}. Au retour, où tourne-t-${m.il} ?`,
        `${n} guide ${m.nom} ${m.e} : ${cases} cases, puis un virage à ${cote}. Pour revenir, de quel côté tourner ?`,
        `${cap(m.nom)} ${m.e} est allé${m.il === "elle" ? "e" : ""} au but en tournant à ${cote}. Pour rentrer, où tourne-t-${m.il} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(`à ${inverse}`, [`à ${cote}`, "tout droit", "pas de virage"]),
        expected: [`à ${inverse}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Refaire un trajet à l'envers demande d'inverser chaque virage.",
          "On parcourt le trajet dans l'autre sens, en échangeant droite et gauche.",
          `À l'aller, on tourne à ${cote}. Au retour, on arrive par l'autre côté : le même coin se prend à ${inverse}.`,
          `Il faut tourner à ${inverse}.`,
        ),
      };
    },
  ),
  tpl(
    "cp_algo_deplacement_tpl_5",
    "cp_algo_deplacement",
    4,
    "Essaie chaque code avec ton doigt sur le quadrillage.",
    ["deplacement", "canvas"],
    () => {
      const { depart, pas, fin, leurres } = tirerTrajet(2);
      const m = randomChoice(MOBILES);
      const c = randomChoice(CIBLES);
      const n = randomChoice(PRENOMS);
      const bonne = code(pas);
      const text = randomChoice([
        `Quel code mène ${m.nom} ${m.e} ${au(c.nom)} ${c.e} ?`,
        `${n} veut amener ${m.nom} ${m.e} ${au(c.nom)} ${c.e}. Quel code choisir ?`,
        `${cap(m.nom)} ${m.e} cherche ${c.nom} ${c.e}. Quel programme est le bon ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, leurres.map((l) => code(l.pas))),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un code donne une flèche par case, dans l'ordre du trajet.",
          "On compte les cases sur le côté et en hauteur, puis on écrit les flèches.",
          `Il faut ${pas.map((p) => `${pl(p.n, "case")} ${VERS[p.dir]}`).join(", puis ")} : ${bonne}.`,
          `Le bon code est ${bonne}.`,
        ),
        canvas: quadrillage([
          { p: depart, label: m.e, color: "#ef4444" },
          { p: fin, label: c.e },
        ]),
      };
    },
  ),

  /* =========================================================
     CP_ALGO_SUITE_LOGIQUE — les suites répétitives du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_suite_logique_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la suite qui se répète « ABABAB… », quelle est la dix-neuvième lettre ?",
    format: "qcm",
    choices: ["A", "B", "C", "on ne peut pas savoir"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Les A sont aux places 1, 3, 5, 7… toutes les places impaires.",
    explanation: exp(
      "Dans une suite répétitive, le motif revient toujours identique : on peut donc prévoir n'importe quelle place.",
      "On repère quelles places occupe chaque lettre, puis on regarde où tombe le rang cherché.",
      "Le motif « AB » fait deux lettres. Le A occupe les places 1, 3, 5, 7… et le B les places 2, 4, 6, 8… La dix-neuvième place est impaire, comme la première : c'est donc un A.",
      "La dix-neuvième lettre est A.",
    ),
    tags: ["cp", "algorithmique", "suite_logique", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_algo_suite_logique_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 5,
    theme: "neutral",
    text: "On voit le début d'une suite : « A B A B A C A B A C… ». Peut-on dire que le motif est « AB » ?",
    format: "qcm",
    choices: [
      "non, il faut regarder toute la suite avant de décider",
      "oui, les deux premières lettres suffisent",
      "oui, puisque la suite commence par AB",
      "on ne peut jamais trouver un motif",
    ],
    expected: ["non, il faut regarder toute la suite avant de décider"],
    comparator: "mcq_exact",
    hint: "Regarde la sixième lettre : est-ce bien un B ?",
    explanation: exp(
      "Un motif ne se devine pas sur les deux premiers symboles : il faut vérifier qu'il se répète vraiment.",
      "On teste le motif supposé sur toute la suite écrite.",
      "Avec le motif « AB », la suite ferait A B A B A B A B. Or la sixième lettre est un C, pas un B. Le vrai motif est plus long : « ABABAC », qui fait six lettres.",
      "Non : il faut regarder toute la suite avant de décider.",
    ),
    tags: ["cp", "algorithmique", "suite_logique", "piege", "qcm"],
  },
  tpl(
    "cp_algo_suite_logique_tpl_2",
    "cp_algo_suite_logique",
    3,
    "Cherche l'endroit où la suite recommence comme au début.",
    ["suite_logique", "canvas"],
    () => {
      const s = tirerSuite(["AB", "ABC", "AAB", "ABB"]);
      const text = `${introSuite()} ${randomChoice([
        "Combien d'objets a le motif qui se répète ?",
        "Le motif revient tout le temps. Combien d'objets a-t-il ?",
        "Combien d'objets faut-il avant que la suite recommence ?",
        "Trouve le motif. Combien d'objets compte-t-il ?",
      ])}`;
      return {
        text,
        format: "short",
        expected: [String(s.motif.length)],
        comparator: "number_equal",
        explanation: exp(
          "Le motif d'une suite répétitive est le plus petit morceau qui revient à l'identique.",
          "On cherche à partir de quel objet la suite recommence comme au début.",
          `Le motif est : ${Array.from(s.motif).map((_, i) => s.terme(i).nom).join(", ")}. Puis tout recommence.`,
          `Le motif a ${s.motif.length} objets.`,
        ),
        canvas: s.canvas,
      };
    },
  ),
  tpl(
    "cp_algo_suite_logique_tpl_3",
    "cp_algo_suite_logique",
    3,
    "Dis la suite à voix haute, et continue-la.",
    ["suite_logique", "canvas"],
    () => {
      const s = tirerSuite(["AB", "ABC", "AAB", "ABB"]);
      const bon = s.terme(s.montres).nom;
      const text = `${introSuite()} ${randomChoice([
        "Quel objet vient ensuite ?",
        "Quel est le prochain objet ?",
        "Que faut-il mettre après le dernier ?",
        "Continue la suite : quel objet vient maintenant ?",
      ])}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bon, [...s.objs.map((o) => o.nom), s.absent.nom]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite répétitive, le motif revient toujours dans le même ordre.",
          "On repère le motif, puis on regarde où l'on en est dans ce motif.",
          `Le motif est : ${Array.from(s.motif).map((_, i) => s.terme(i).nom).join(", ")}. Après le dernier objet dessiné vient ${bon}.`,
          `C'est ${bon}.`,
        ),
        canvas: s.canvas,
      };
    },
  ),
  tpl(
    "cp_algo_suite_logique_tpl_1",
    "cp_algo_suite_logique",
    4,
    "Repère le motif, puis compte les objets jusqu'à la place demandée.",
    ["suite_logique", "canvas"],
    () => {
      const s = tirerSuite(["AB", "ABC", "AAB", "ABB"]);
      const rang = randomInt(s.montres + 1, 20);
      const bon = s.terme(rang - 1).nom;
      const text = `${introSuite()} ${randomChoice([
        `La suite continue. Quel sera le ${RANGS[rang - 1]} objet ?`,
        `Quel objet sera à la ${RANGS[rang - 1]} place ?`,
        `On continue la suite. Quel est le ${RANGS[rang - 1]} objet ?`,
      ])}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bon, [...s.objs.map((o) => o.nom), s.absent.nom]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite répétitive, le motif revient identique : on peut prévoir n'importe quelle place.",
          "On repère le motif, puis on compte les objets un à un jusqu'à la place demandée.",
          `Le motif a ${s.motif.length} objets. En comptant place par place jusqu'à la ${RANGS[rang - 1]}, on tombe sur ${bon}.`,
          `C'est ${bon}.`,
        ),
        canvas: s.canvas,
      };
    },
  ),
  tpl(
    "cp_algo_suite_logique_tpl_4",
    "cp_algo_suite_logique",
    5,
    "Le motif peut être plus long qu'il n'y parait : vérifie-le sur toute la suite.",
    ["suite_logique", "piege", "canvas"],
    () => {
      const s = tirerSuite(["AABB", "ABCC", "ABBC", "AAAB", "ABAC"]);
      const enPlus = randomChoice([true, false]);
      const rang = enPlus ? randomInt(s.montres + 2, 20) : s.montres + 1;
      const bon = s.terme(rang - 1).nom;
      const text = `${introSuite()} ${
        enPlus
          ? randomChoice([`Quel sera le ${RANGS[rang - 1]} objet ?`, `Quel objet sera à la ${RANGS[rang - 1]} place ?`])
          : randomChoice(["Attention au motif ! Quel objet vient ensuite ?", "Le motif est long. Quel est le prochain objet ?"])
      }`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bon, [...s.objs.map((o) => o.nom), s.absent.nom]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Un motif ne se devine pas sur les deux premiers objets : il faut vérifier qu'il se répète vraiment.",
          "On cherche le motif sur toute la suite dessinée, puis on compte.",
          `Le motif est : ${Array.from(s.motif).map((_, i) => s.terme(i).nom).join(", ")} (${s.motif.length} objets). À la ${RANGS[rang - 1]} place, on trouve ${bon}.`,
          `C'est ${bon}.`,
        ),
        canvas: s.canvas,
      };
    },
  ),

  /* =========================================================
     CP_ALGO_DEFI — la boucle, et le programme trop long
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot exécute : « répéter 3 fois : avancer de 2 cases ». De combien de cases avance-t-il en tout ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases : additionne trois fois 2.",
    explanation: exp(
      "Répéter une instruction, c'est la faire plusieurs fois de suite.",
      "On additionne autant de fois qu'il y a de répétitions.",
      "2 + 2 + 2 = 6. Le robot avance donc de 6 cases. Répondre 5 reviendrait à compter les répétitions et les cases dans le même sac.",
      "Il avance de 6 cases.",
    ),
    tags: ["cp", "algorithmique", "defi", "piege"],
  },
  tpl(
    "cp_algo_defi_tpl_1",
    "cp_algo_defi",
    5,
    "Additionne autant de fois qu'il y a de répétitions.",
    ["defi", "canvas"],
    () => {
      const fois = randomInt(2, 4);
      const cases = randomInt(2, 4);
      const total = fois * cases;
      const m = randomChoice(MOBILES);
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `Voici le programme ${du(m.nom)} ${m.e}. De combien de cases avance-t-${m.il} en tout ?`,
        `${n} a écrit ce programme pour ${m.nom} ${m.e}. Combien de cases fait-${m.il} en tout ?`,
        `${cap(m.nom)} ${m.e} suit ces cartes. Combien de cases parcourt-${m.il} ?`,
        `Lis la boucle ${du(m.nom)} ${m.e}. De combien de cases avance-t-${m.il} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition fait recommencer la même instruction, autant de fois qu'il est écrit.",
          "On additionne le déplacement autant de fois qu'il y a de répétitions.",
          `${Array.from({ length: fois }, () => cases).join(" + ")} = ${total}. Répondre ${fois + cases}, ce serait ajouter les répétitions et les cases.`,
          `${cap(m.il)} avance de ${total} cases.`,
        ),
        canvas: cartes([{ type: "repeat", times: fois, children: [carte(`avancer de ${pl(cases, "case")}`)] }]),
      };
    },
  ),
  tpl(
    "cp_algo_defi_tpl_2",
    "cp_algo_defi",
    5,
    "Une répétition remplace plusieurs instructions écrites à la suite.",
    ["defi"],
    () => {
      const ecrites = randomInt(3, 6);
      // ⚠️ Le raccourci est tantôt fidèle, tantôt faux : sinon la réponse
      // serait toujours « oui » et se retiendrait sans lire l'énoncé.
      const fidele = randomChoice([true, false]);
      const fois = fidele ? ecrites : ecrites + randomChoice([-1, 1]);
      const m = randomChoice(MOBILES.filter((x) => x.nom !== "Pic"));
      const n = randomChoice(PRENOMS);
      const text = randomChoice([
        `${cap(m.nom)} ${m.e} a ${ecrites} cartes « avancer d'une case ». ${n} écrit « répéter ${fois} fois : avancer d'une case ». Même trajet ?`,
        `${n} raccourcit le programme ${du(m.nom)} ${m.e} : ${ecrites} cartes « avancer d'une case » deviennent « répéter ${fois} fois : avancer d'une case ». C'est pareil ?`,
        `${ecrites} cartes « avancer d'une case », ou « répéter ${fois} fois : avancer d'une case » : ${m.nom} ${m.e} fait-${m.il} la même chose ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [fidele ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une répétition ne change pas ce que fait le robot, à condition de répéter le bon nombre de fois.",
          "On déplie la répétition et on compare avec la liste écrite en entier.",
          fidele
            ? `« Répéter ${fois} fois », déplié, donne ${fois} instructions à la suite : exactement la liste de départ.`
            : `« Répéter ${fois} fois », déplié, donne ${fois} instructions, alors que le programme de départ en comptait ${ecrites}.`,
          fidele ? "Oui, c'est le même trajet." : "Non : le raccourci ne répète pas le bon nombre de fois.",
        ),
      };
    },
  ),
  tpl(
    "cp_algo_defi_tpl_3",
    "cp_algo_defi",
    5,
    "Ajoute le même nombre de cases, encore et encore, jusqu'au but.",
    ["defi"],
    () => {
      const fois = randomInt(2, 5);
      const cases = randomInt(2, 3);
      const total = fois * cases;
      const m = randomChoice(MOBILES.filter((x) => x.nom !== "Pic"));
      const c = randomChoice(CIBLES);
      const text = randomChoice([
        `${cap(c.nom)} ${c.e} est à ${total} cases ${du(m.nom)} ${m.e}. Avec « répéter … fois : avancer de ${cases} cases », combien de fois répéter ?`,
        `${cap(m.nom)} ${m.e} doit avancer de ${total} cases. Chaque tour de boucle fait ${cases} cases. Combien de tours ?`,
        `Pour aller ${au(c.nom)} ${c.e}, il faut ${total} cases. La boucle fait avancer de ${cases} cases. Combien de fois la répéter ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(fois)],
        comparator: "number_equal",
        explanation: exp(
          "Une boucle fait avancer du même nombre de cases à chaque tour.",
          "On ajoute ce nombre, tour après tour, jusqu'à atteindre le but.",
          `${Array.from({ length: fois }, () => cases).join(" + ")} = ${total} : il faut ${fois} tours.`,
          `Il faut répéter ${fois} fois.`,
        ),
      };
    },
  ),
];
