// lib/tutor-v4/question-banks/maths/cm1/algorithmique.bank.ts
// Règles CM1 : QCM uniquement (sauf short numérique), max templates, 5-6+ questions/microskill

import type { TutorBankItemV4, ScratchCanvasData } from "@/lib/tutor-v4/types";

// ── HELPERS ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function scratchCanvas(
  title: string,
  blocks: ScratchCanvasData["blocks"]
): ScratchCanvasData {
  return { kind: "scratch", title, blocks };
}

const DIRS = ["Nord", "Sud", "Est", "Ouest"] as const;
type Dir = typeof DIRS[number];

function tournerDroite(d: Dir): Dir {
  const map: Record<Dir, Dir> = { Nord: "Est", Est: "Sud", Sud: "Ouest", Ouest: "Nord" };
  return map[d];
}
function tournerGauche(d: Dir): Dir {
  const map: Record<Dir, Dir> = { Nord: "Ouest", Ouest: "Sud", Sud: "Est", Est: "Nord" };
  return map[d];
}
function demiTour(d: Dir): Dir {
  const map: Record<Dir, Dir> = { Nord: "Sud", Sud: "Nord", Est: "Ouest", Ouest: "Est" };
  return map[d];
}

// ── ALGO_INSTRUCTION ─────────────────────────────────────────────────────────

const algoInstruction: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-algo-inst-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Qu'est-ce qu'une instruction dans un programme ?",
    format: "qcm",
    choices: makeChoices("Une action précise à exécuter", ["Un nombre au hasard", "Un dessin libre", "Une erreur volontaire"]),
    expected: ["Une action précise à exécuter"],
    comparator: "mcq_exact",
    hint: "Une instruction dit à la machine quoi faire.",
    explanation: "Une instruction est une commande précise : avancer, tourner, dire quelque chose…",
    tags: ["instruction", "définition"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Dans quel ordre un programme exécute-t-il ses instructions ?",
    format: "qcm",
    choices: makeChoices("De haut en bas, dans l'ordre", ["De bas en haut", "Au hasard", "Seulement la première"]),
    expected: ["De haut en bas, dans l'ordre"],
    comparator: "mcq_exact",
    hint: "Comme on lit un livre.",
    explanation: "Un programme lit et exécute les instructions de haut en bas, une par une.",
    tags: ["instruction", "ordre"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Programme : (1) Avancer (2) Tourner à droite (3) Avancer. Quelle est la 2e instruction ?",
    format: "qcm",
    choices: makeChoices("Tourner à droite", ["Avancer", "S'arrêter", "Reculer"]),
    expected: ["Tourner à droite"],
    comparator: "mcq_exact",
    hint: "Compte les instructions dans l'ordre.",
    explanation: "La 2e instruction est 'Tourner à droite'.",
    tags: ["instruction", "lecture"],
  },
  {
    kind: "template",
    id: "cm1-algo-inst-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 2, theme: "neutral",
    hint: "Lis les instructions dans l'ordre et compte.",
    tags: ["instruction", "comptage"],
    generate: () => {
      const actions = ["Avancer", "Tourner à droite", "Tourner à gauche", "Reculer", "S'arrêter", "Sauter"];
      const n = pickOne([3, 4, 5] as const);
      const program: string[] = [];
      for (let i = 0; i < n; i++) program.push(pickOne(actions));
      const pos = Math.floor(Math.random() * n);
      const ordinals = ["1ère", "2e", "3e", "4e", "5e"];
      const correct = program[pos];
      const wrongs = actions.filter(a => a !== correct).slice(0, 3);
      return {
        text: `Programme : ${program.map((a, i) => `(${i + 1}) ${a}`).join(" · ")}. Quelle est la ${ordinals[pos]} instruction ?`,
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `La ${ordinals[pos]} instruction est "${correct}".`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-inst-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 2, theme: "neutral",
    hint: "Compte toutes les instructions numérotées.",
    tags: ["instruction", "comptage"],
    generate: () => {
      const actions = ["Avancer", "Tourner", "Reculer", "Sauter", "S'arrêter"];
      const n = pickOne([3, 4, 5, 6] as const);
      const program: string[] = [];
      for (let i = 0; i < n; i++) program.push(pickOne(actions));
      const wrongs = [String(n - 1), String(n + 1), String(n + 2)];
      return {
        text: `Programme : ${program.map((a, i) => `(${i + 1}) ${a}`).join(" · ")}. Combien y a-t-il d'instructions ?`,
        choices: makeChoices(String(n), wrongs),
        expected: [String(n)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Il y a ${n} instructions numérotées de 1 à ${n}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Quelle instruction permet à un robot de changer de direction ?",
    format: "qcm",
    choices: makeChoices("Tourner", ["Avancer", "Compter", "Effacer"]),
    expected: ["Tourner"],
    comparator: "mcq_exact",
    hint: "Pour changer de direction, il faut tourner.",
    explanation: "'Tourner' modifie la direction sans déplacer le robot.",
    tags: ["instruction", "direction"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Programme : (1) Avancer (2) Sauter (3) Tourner. Quelle est la 3e instruction ?",
    format: "qcm",
    choices: makeChoices("Tourner", ["Avancer", "Sauter", "Reculer"]),
    expected: ["Tourner"],
    comparator: "mcq_exact",
    hint: "Compte les instructions dans l'ordre.",
    explanation: "La 3e instruction est 'Tourner'.",
    tags: ["instruction", "lecture"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-006",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 1, theme: "neutral",
    text: "Quelle instruction permet à un robot de se déplacer vers l'avant ?",
    format: "qcm",
    choices: makeChoices("Avancer", ["Tourner", "Dire", "Attendre"]),
    expected: ["Avancer"],
    comparator: "mcq_exact",
    hint: "Pour se déplacer en avant, le robot avance.",
    explanation: "'Avancer' déplace le robot vers l'avant.",
    tags: ["instruction", "déplacement"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-007",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 2, theme: "neutral",
    text: "Quelle instruction affiche un message sans déplacer le robot ?",
    format: "qcm",
    choices: makeChoices("Dire quelque chose", ["Avancer", "Tourner", "Reculer"]),
    expected: ["Dire quelque chose"],
    comparator: "mcq_exact",
    hint: "Elle fait parler le robot.",
    explanation: "'Dire' affiche un message ; le robot ne bouge pas.",
    tags: ["instruction", "message"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-inst-008",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_instruction",
    difficulty: 2, theme: "neutral",
    text: "Programme : (1) Avancer (2) Avancer (3) Tourner (4) Avancer. Combien de fois trouve-t-on l'instruction 'Avancer' ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte uniquement les 'Avancer'.",
    explanation: "L'instruction 'Avancer' apparaît 3 fois (instructions 1, 2 et 4).",
    tags: ["instruction", "comptage"],
  },
];

// ── ALGO_DEPLACEMENT ─────────────────────────────────────────────────────────

const algoDeplacement: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-algo-dep-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 1, theme: "neutral",
    hint: "Tourne à droite depuis ta direction de départ.",
    tags: ["déplacement", "direction", "droite"],
    generate: () => {
      const depart = pickOne(DIRS);
      const arrivee = tournerDroite(depart);
      const wrongs = DIRS.filter(d => d !== arrivee) as string[];
      return {
        text: `Un robot regarde vers le ${depart}. Il tourne à droite. Dans quelle direction regarde-t-il ?`,
        choices: makeChoices(arrivee, wrongs),
        expected: [arrivee],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `${depart} → droite → ${arrivee}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-dep-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 1, theme: "neutral",
    hint: "Tourne à gauche depuis ta direction de départ.",
    tags: ["déplacement", "direction", "gauche"],
    generate: () => {
      const depart = pickOne(DIRS);
      const arrivee = tournerGauche(depart);
      const wrongs = DIRS.filter(d => d !== arrivee) as string[];
      return {
        text: `Un robot regarde vers le ${depart}. Il tourne à gauche. Dans quelle direction regarde-t-il ?`,
        choices: makeChoices(arrivee, wrongs),
        expected: [arrivee],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `${depart} → gauche → ${arrivee}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-dep-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    hint: "Un demi-tour = direction opposée.",
    tags: ["déplacement", "demi-tour"],
    generate: () => {
      const depart = pickOne(DIRS);
      const arrivee = demiTour(depart);
      const wrongs = DIRS.filter(d => d !== arrivee) as string[];
      return {
        text: `Un robot regarde vers le ${depart}. Il fait un demi-tour. Dans quelle direction regarde-t-il ?`,
        choices: makeChoices(arrivee, wrongs),
        expected: [arrivee],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `Demi-tour depuis ${depart} → ${arrivee} (direction opposée).`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-dep-t004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    hint: "Additionne les cases. Tourner ne fait pas avancer.",
    tags: ["déplacement", "addition"],
    generate: () => {
      const a = pickOne([2, 3, 4, 5] as const);
      const b = pickOne([2, 3, 4, 5] as const);
      return {
        text: `Un robot avance de ${a} cases, tourne à droite, puis avance de ${b} cases. Combien de cases au total ?`,
        expected: [String(a + b)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${a} + ${b} = ${a + b} cases. Tourner ne déplace pas.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-dep-t005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    hint: "Applique les deux tournants l'un après l'autre.",
    tags: ["déplacement", "séquence"],
    generate: () => {
      const depart = pickOne(DIRS);
      const t1 = pickOne(["droite", "gauche"] as const);
      const t2 = pickOne(["droite", "gauche"] as const);
      const apres1 = t1 === "droite" ? tournerDroite(depart) : tournerGauche(depart);
      const final = t2 === "droite" ? tournerDroite(apres1) : tournerGauche(apres1);
      const wrongs = DIRS.filter(d => d !== final) as string[];
      return {
        text: `Un robot regarde le ${depart}. Il tourne à ${t1}, puis à ${t2}. Où regarde-t-il ?`,
        choices: makeChoices(final, wrongs),
        expected: [final],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `${depart} → ${t1} → ${apres1} → ${t2} → ${final}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-dep-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    text: "Un robot fait 2 demi-tours. Dans quelle direction regarde-t-il par rapport au départ ?",
    format: "qcm",
    choices: makeChoices("La même direction qu'au départ", ["La direction opposée", "À droite du départ", "À gauche du départ"]),
    expected: ["La même direction qu'au départ"],
    comparator: "mcq_exact",
    hint: "2 × 180° = 360° = tour complet.",
    explanation: "2 demi-tours = 360°, le robot revient à sa direction initiale.",
    tags: ["déplacement", "demi-tour"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-dep-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    text: "Un robot regarde le Nord. Il tourne deux fois à droite. Où regarde-t-il ?",
    format: "qcm",
    choices: makeChoices("Sud", ["Nord", "Est", "Ouest"]),
    expected: ["Sud"],
    comparator: "mcq_exact",
    hint: "Nord → Est → Sud.",
    explanation: "Nord → droite → Est → droite → Sud.",
    tags: ["déplacement", "direction"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-dep-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    text: "Un robot avance de 3 cases, puis recule de 1 case. À combien de cases du départ se trouve-t-il ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "3 cases en avant, 1 case en arrière.",
    explanation: "3 - 1 = 2. Le robot est à 2 cases du départ.",
    tags: ["déplacement", "avancer", "reculer"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-dep-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 1, theme: "neutral",
    text: "Un robot regarde l'Est. Il fait un demi-tour. Où regarde-t-il ?",
    format: "qcm",
    choices: makeChoices("Ouest", ["Est", "Nord", "Sud"]),
    expected: ["Ouest"],
    comparator: "mcq_exact",
    hint: "Un demi-tour = direction opposée.",
    explanation: "L'opposé de l'Est est l'Ouest.",
    tags: ["déplacement", "demi-tour"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-dep-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_deplacement",
    difficulty: 2, theme: "neutral",
    text: "Un robot avance de 4 cases, tourne à gauche, puis avance de 3 cases. Combien de cases a-t-il parcourues en tout ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Additionne les cases. Tourner ne déplace pas.",
    explanation: "4 + 3 = 7 cases. Le tournant ne compte pas.",
    tags: ["déplacement", "addition"],
  },
];

// ── ALGO_PROGRAMME ────────────────────────────────────────────────────────────

const algoProgramme: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-algo-prog-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 1, theme: "neutral",
    text: "Quel bloc lance toujours un programme Scratch ?",
    format: "qcm",
    choices: makeChoices("Quand 🚩 est cliqué", ["Avancer de 10 pas", "Répéter 10 fois", "Dire Bonjour"]),
    expected: ["Quand 🚩 est cliqué"],
    comparator: "mcq_exact",
    hint: "C'est toujours le premier bloc, tout en haut.",
    explanation: "'Quand 🚩 est cliqué' est le déclencheur qui lance le programme.",
    tags: ["programme", "déclencheur"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 1, theme: "neutral",
    text: "Que fait ce programme Scratch ?",
    format: "qcm",
    choices: makeChoices("Il avance de 10 pas puis dit Bonjour", ["Il dit Bonjour 10 fois", "Il recule puis dit Bonjour", "Il tourne puis avance"]),
    expected: ["Il avance de 10 pas puis dit Bonjour"],
    comparator: "mcq_exact",
    canvas: scratchCanvas("Programme simple", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
      { type: "say", text: "Dire Bonjour" },
    ]),
    hint: "Lis les blocs de haut en bas.",
    explanation: "Ordre d'exécution : avancer, puis dire Bonjour.",
    tags: ["programme", "scratch", "lecture"],
  },
  {
    kind: "template",
    id: "cm1-algo-prog-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    hint: "Additionne tous les pas.",
    tags: ["programme", "scratch", "calcul"],
    generate: () => {
      const a = pickOne([5, 10, 15, 20] as const);
      const b = pickOne([5, 10, 15, 20] as const);
      return {
        text: `Programme : Avancer de ${a} pas, puis Avancer de ${b} pas. Combien de pas au total ?`,
        expected: [String(a + b)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${a} + ${b} = ${a + b} pas.`,
        canvas: scratchCanvas("Calcul de pas", [
          { type: "event", text: "Quand 🚩 est cliqué" },
          { type: "move", text: `Avancer de ${a} pas`, value: a },
          { type: "move", text: `Avancer de ${b} pas`, value: b },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-prog-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    hint: "Le dernier bloc = celui tout en bas.",
    tags: ["programme", "ordre", "dernier"],
    generate: () => {
      const fins = ["Dire Bravo", "Dire Terminé", "S'arrêter", "Tourner de 90°"];
      const fin = pickOne(fins);
      const wrongs = fins.filter(f => f !== fin);
      return {
        text: "Quel est le dernier bloc à s'exécuter ?",
        choices: makeChoices(fin, wrongs),
        expected: [fin],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: "Le dernier bloc exécuté est toujours celui tout en bas.",
        canvas: scratchCanvas("Ordre", [
          { type: "event", text: "Quand 🚩 est cliqué" },
          { type: "move", text: "Avancer de 10 pas", value: 10 },
          { type: "turn", text: "Tourner de 90°", value: 90 },
          { type: "say", text: fin },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-prog-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 3, theme: "neutral",
    hint: "Compte les blocs sans le déclencheur.",
    tags: ["programme", "comptage"],
    generate: () => {
      const n = pickOne([2, 3, 4] as const);
      const moves = Array.from({ length: n }, (_, i) => ({
        type: "move" as const,
        text: `Avancer de ${(i + 1) * 10} pas`,
        value: (i + 1) * 10,
      }));
      const wrongs = [String(n - 1), String(n + 1), String(n + 2)];
      return {
        text: "Combien d'instructions (sans le déclencheur) contient ce programme ?",
        choices: makeChoices(String(n), wrongs),
        expected: [String(n)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Il y a ${n} instructions après le déclencheur.`,
        canvas: scratchCanvas("Compter", [
          { type: "event", text: "Quand 🚩 est cliqué" },
          ...moves,
        ]),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    text: "Blocs : Avancer · Tourner · Avancer. Dans quel ordre s'exécutent-ils ?",
    format: "qcm",
    choices: makeChoices("Avancer, Tourner, Avancer", ["Tourner, Avancer, Avancer", "Avancer, Avancer, Tourner", "Au hasard"]),
    expected: ["Avancer, Tourner, Avancer"],
    comparator: "mcq_exact",
    hint: "Toujours de haut en bas.",
    explanation: "L'ordre d'exécution est l'ordre de lecture : de haut en bas.",
    tags: ["programme", "ordre"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    text: "Que dit le lutin à la fin de ce programme ?",
    format: "qcm",
    choices: makeChoices("Bonjour", ["Au revoir", "Rien", "Bravo"]),
    expected: ["Bonjour"],
    comparator: "mcq_exact",
    canvas: scratchCanvas("Programme avec message", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
      { type: "say", text: "Dire Bonjour" },
    ]),
    hint: "Lis le dernier bloc.",
    explanation: "Le dernier bloc fait dire 'Bonjour' au lutin.",
    tags: ["programme", "scratch", "lecture"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 1, theme: "neutral",
    text: "Où se place le bloc déclencheur dans un programme Scratch ?",
    format: "qcm",
    choices: makeChoices("Tout en haut", ["Tout en bas", "Au milieu", "N'importe où"]),
    expected: ["Tout en haut"],
    comparator: "mcq_exact",
    hint: "C'est le premier bloc lu.",
    explanation: "Le bloc déclencheur (Quand 🚩 est cliqué) se place tout en haut du programme.",
    tags: ["programme", "déclencheur"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-006",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    text: "Dans ce programme, de combien de pas le lutin avance-t-il en tout ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    canvas: scratchCanvas("Total de pas", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 20 pas", value: 20 },
      { type: "move", text: "Avancer de 30 pas", value: 30 },
    ]),
    hint: "Additionne tous les blocs Avancer.",
    explanation: "20 + 30 = 50 pas.",
    tags: ["programme", "scratch", "calcul"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-prog-007",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_programme",
    difficulty: 2, theme: "neutral",
    text: "Quel bloc s'exécute juste après le déclencheur dans ce programme ?",
    format: "qcm",
    choices: makeChoices("Avancer de 10 pas", ["Tourner de 90°", "Dire Fini", "Quand 🚩 est cliqué"]),
    expected: ["Avancer de 10 pas"],
    comparator: "mcq_exact",
    canvas: scratchCanvas("Premier bloc", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
      { type: "turn", text: "Tourner de 90°", value: 90 },
      { type: "say", text: "Dire Fini" },
    ]),
    hint: "C'est le bloc juste sous le déclencheur.",
    explanation: "Après le déclencheur, le premier bloc exécuté est 'Avancer de 10 pas'.",
    tags: ["programme", "scratch", "ordre"],
  },
];

// ── ALGO_REPETITION ───────────────────────────────────────────────────────────

const algoRepetition: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-algo-rep-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 1, theme: "neutral",
    text: "À quoi sert le bloc 'Répéter X fois' dans Scratch ?",
    format: "qcm",
    choices: makeChoices("À exécuter plusieurs fois les mêmes instructions", ["À avancer plus vite", "À effacer le dessin", "À changer de couleur"]),
    expected: ["À exécuter plusieurs fois les mêmes instructions"],
    comparator: "mcq_exact",
    hint: "Répéter = faire la même chose plusieurs fois.",
    explanation: "Le bloc 'Répéter' évite de copier-coller : il exécute les instructions le nombre de fois indiqué.",
    tags: ["répétition", "définition"],
  },
  {
    kind: "template",
    id: "cm1-algo-rep-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    hint: "Répétitions × pas = total.",
    tags: ["répétition", "multiplication"],
    generate: () => {
      const pas = pickOne([5, 10, 15, 20] as const);
      const fois = pickOne([2, 3, 4, 5, 6] as const);
      return {
        text: `Programme : Répéter ${fois} fois "Avancer de ${pas} pas". Combien de pas au total ?`,
        expected: [String(pas * fois)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${fois} × ${pas} = ${pas * fois} pas.`,
        canvas: scratchCanvas("Répétition", [
          { type: "event", text: "Quand 🚩 est cliqué" },
          { type: "repeat", text: `Répéter ${fois} fois`, times: fois },
          { type: "move", text: `Avancer de ${pas} pas`, value: pas },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-rep-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    hint: "La figure a autant de côtés que de répétitions.",
    tags: ["répétition", "figure"],
    generate: () => {
      const figures = [
        { cotes: 3, nom: "triangle", angle: 120 },
        { cotes: 4, nom: "carré", angle: 90 },
        { cotes: 6, nom: "hexagone", angle: 60 },
      ] as const;
      const fig = pickOne(figures);
      const wrongs = figures.filter(f => f.nom !== fig.nom).map(f => `un ${f.nom}`);
      return {
        text: `Répéter ${fig.cotes} fois : "Avancer 50 pas · Tourner ${fig.angle}°". Quelle figure est dessinée ?`,
        choices: makeChoices(`un ${fig.nom}`, wrongs),
        expected: [`un ${fig.nom}`],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${fig.cotes} côtés avec ${fig.angle}° = un ${fig.nom}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-rep-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    hint: "Total ÷ pas = répétitions.",
    tags: ["répétition", "division"],
    generate: () => {
      const pas = pickOne([5, 10, 20] as const);
      const fois = pickOne([2, 3, 4, 5] as const);
      const total = pas * fois;
      const wrongs = [String(fois - 1), String(fois + 1), String(fois + 2)];
      return {
        text: `On veut avancer de ${total} pas en répétant "Avancer de ${pas} pas". Combien de répétitions ?`,
        choices: makeChoices(String(fois), wrongs),
        expected: [String(fois)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${total} ÷ ${pas} = ${fois} répétitions.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-rep-t004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 3, theme: "neutral",
    hint: "(répétitions × pas) + pas hors boucle.",
    tags: ["répétition", "calcul"],
    generate: () => {
      const pas = pickOne([10, 20] as const);
      const fois = pickOne([3, 4, 5] as const);
      const extra = pickOne([5, 10, 15] as const);
      const total = pas * fois + extra;
      return {
        text: `Programme : Répéter ${fois} fois "Avancer de ${pas} pas", puis Avancer de ${extra} pas. Combien au total ?`,
        expected: [String(total)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `(${fois} × ${pas}) + ${extra} = ${pas * fois} + ${extra} = ${total} pas.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-rep-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    text: "Programme : Répéter 4 fois 'Tourner de 90°'. L'angle total parcouru est de…",
    format: "qcm",
    choices: ["90°", "180°", "270°", "360°"],
    expected: ["360°"],
    comparator: "mcq_exact",
    hint: "4 × 90° = ?",
    explanation: "4 × 90° = 360°. Le robot a fait un tour complet.",
    tags: ["répétition", "angle"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-rep-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    text: "Dans ce programme, de combien de pas le lutin avance-t-il en tout ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    canvas: scratchCanvas("Répétition", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "repeat", text: "Répéter 3 fois", times: 3 },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
    ]),
    hint: "3 × 10.",
    explanation: "3 × 10 = 30 pas.",
    tags: ["répétition", "multiplication"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-rep-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 5 fois 'Tourner de 72°'. Quel est l'angle total parcouru ?",
    format: "short",
    expected: ["360"],
    comparator: "number_equal",
    hint: "5 × 72°.",
    explanation: "5 × 72° = 360°. Le robot fait un tour complet (utile pour un pentagone).",
    tags: ["répétition", "angle"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-rep-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    text: "Pour dessiner un triangle, combien de fois faut-il répéter 'Avancer · Tourner' ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Un triangle a 3 côtés.",
    explanation: "Un triangle a 3 côtés, donc on répète 3 fois.",
    tags: ["répétition", "figure"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-rep-006",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 2 fois 'Avancer de 10 pas · Avancer de 5 pas'. Combien de pas au total ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Chaque répétition fait 10 + 5 pas.",
    explanation: "Chaque tour fait 10 + 5 = 15 pas. 2 × 15 = 30 pas.",
    tags: ["répétition", "calcul"],
  },
];

// ── ALGO_LOGIQUE ──────────────────────────────────────────────────────────────

const algoLogique: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-algo-log-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 1, theme: "neutral",
    hint: "Trouve la règle et applique-la.",
    tags: ["logique", "suite"],
    generate: () => {
      const start = pickOne([1, 2, 3, 5] as const);
      const step = pickOne([1, 2, 3, 5, 10] as const);
      const seq = Array.from({ length: 4 }, (_, i) => start + i * step);
      const next = start + 4 * step;
      const wrongs = [String(next - 1), String(next + 1), String(next + step)];
      return {
        text: `Suite : ${seq.join(", ")}, … Quel est le nombre suivant ?`,
        choices: makeChoices(String(next), wrongs),
        expected: [String(next)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Règle : +${step}. ${seq[3]} + ${step} = ${next}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-log-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    hint: "Calcule la différence entre deux termes consécutifs.",
    tags: ["logique", "règle"],
    generate: () => {
      const start = pickOne([2, 3, 5, 10] as const);
      const step = pickOne([2, 3, 4, 5] as const);
      const seq = Array.from({ length: 4 }, (_, i) => start + i * step);
      const wrongs = [String(step - 1), String(step + 1), String(step * 2)];
      return {
        text: `Suite : ${seq.join(", ")}. Quelle est la règle ?`,
        choices: makeChoices(`+${step}`, wrongs.map(n => `+${n}`)),
        expected: [`+${step}`],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `La règle est +${step}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-log-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    hint: "Cherche la valeur qui respecte la règle.",
    tags: ["logique", "trou"],
    generate: () => {
      const start = pickOne([2, 4, 5, 10] as const);
      const step = pickOne([2, 3, 5] as const);
      const pos = pickOne([1, 2, 3] as const);
      const seq = Array.from({ length: 5 }, (_, i) => start + i * step);
      const missing = seq[pos];
      const display = seq.map((n, i) => i === pos ? "…" : String(n)).join(", ");
      const wrongs = [String(missing - step), String(missing + step), String(missing + 1)];
      return {
        text: `Suite : ${display}. Quelle valeur remplace les … ?`,
        choices: makeChoices(String(missing), wrongs),
        expected: [String(missing)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Règle +${step}. La valeur manquante est ${missing}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 1, theme: "neutral",
    text: "Motif : ⭐🔴⭐🔴⭐… Quelle forme vient ensuite ?",
    format: "qcm",
    choices: makeChoices("🔴", ["⭐", "🔵", "🟩"]),
    expected: ["🔴"],
    comparator: "mcq_exact",
    hint: "Le motif alterne ⭐ puis 🔴.",
    explanation: "Après ⭐ vient 🔴 (alternance régulière).",
    tags: ["logique", "motif"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    text: "Si le nombre est pair, avancer. Sinon, tourner. Le nombre est 6. Que fait le robot ?",
    format: "qcm",
    choices: makeChoices("Il avance", ["Il tourne", "Il fait les deux", "Il s'arrête"]),
    expected: ["Il avance"],
    comparator: "mcq_exact",
    hint: "6 est-il pair ?",
    explanation: "6 est pair, condition vraie → le robot avance.",
    tags: ["logique", "condition", "pair"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    text: "Si le score > 10, dire Bravo. Sinon, ne rien faire. Le score est 7. Que se passe-t-il ?",
    format: "qcm",
    choices: makeChoices("Rien ne se passe", ["Il dit Bravo", "Il dit 7", "Il s'arrête"]),
    expected: ["Rien ne se passe"],
    comparator: "mcq_exact",
    hint: "7 est-il supérieur à 10 ?",
    explanation: "7 < 10, condition fausse → rien ne se passe.",
    tags: ["logique", "condition", "si/sinon"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 1, theme: "neutral",
    text: "Suite : 2, 4, 6, 8, … Quel est le nombre suivant ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "On ajoute 2 à chaque fois.",
    explanation: "Règle : +2. 8 + 2 = 10.",
    tags: ["logique", "suite"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    text: "Motif : 🔺🔺🟦🔺🔺🟦… Quelle forme vient ensuite ?",
    format: "qcm",
    choices: makeChoices("🔺", ["🟦", "⭐", "🔴"]),
    expected: ["🔺"],
    comparator: "mcq_exact",
    hint: "Le motif est : deux 🔺 puis un 🟦, qui se répète.",
    explanation: "Après chaque 🟦, le motif recommence par 🔺.",
    tags: ["logique", "motif"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-006",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    text: "Si le nombre est impair, tourner. Sinon, avancer. Le nombre est 5. Que fait le robot ?",
    format: "qcm",
    choices: makeChoices("Il tourne", ["Il avance", "Il s'arrête", "Il recule"]),
    expected: ["Il tourne"],
    comparator: "mcq_exact",
    hint: "5 est-il pair ou impair ?",
    explanation: "5 est impair, la condition est vraie → le robot tourne.",
    tags: ["logique", "condition", "impair"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-log-007",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_logique",
    difficulty: 2, theme: "neutral",
    text: "Si le score ≥ 10, dire Gagné. Sinon, dire Perdu. Le score est 12. Que dit le robot ?",
    format: "qcm",
    choices: makeChoices("Gagné", ["Perdu", "12", "Rien"]),
    expected: ["Gagné"],
    comparator: "mcq_exact",
    hint: "12 est-il supérieur ou égal à 10 ?",
    explanation: "12 ≥ 10, condition vraie → le robot dit 'Gagné'.",
    tags: ["logique", "condition", "si/sinon"],
  },
];

// ── ALGO_DEFI ─────────────────────────────────────────────────────────────────

const algoDefi: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-algo-def-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    hint: "Additionne tous les déplacements. Tourner ne déplace pas.",
    tags: ["défi", "déplacement"],
    generate: () => {
      const a = pickOne([2, 3, 4] as const);
      const b = pickOne([2, 3, 4] as const);
      const c = pickOne([1, 2, 3] as const);
      return {
        text: `Programme : Avancer ${a} cases · Tourner à droite · Avancer ${b} cases · Tourner à gauche · Avancer ${c} cases. Combien de cases au total ?`,
        expected: [String(a + b + c)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${a} + ${b} + ${c} = ${a + b + c} cases. Les tournants ne comptent pas.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-def-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    hint: "Répétitions × pas par boucle.",
    tags: ["défi", "répétition"],
    generate: () => {
      const pas = pickOne([5, 10, 20] as const);
      const fois = pickOne([3, 4, 5, 6] as const);
      return {
        text: `Programme : Répéter ${fois} fois "Avancer de ${pas} pas". Combien de pas au total ?`,
        expected: [String(pas * fois)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${fois} × ${pas} = ${pas * fois} pas.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-algo-def-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    hint: "Suis les instructions une par une.",
    tags: ["défi", "direction"],
    generate: () => {
      const depart = pickOne(DIRS);
      const t1 = pickOne(["droite", "gauche"] as const);
      const t2 = pickOne(["droite", "gauche"] as const);
      const apres1 = t1 === "droite" ? tournerDroite(depart) : tournerGauche(depart);
      const final = t2 === "droite" ? tournerDroite(apres1) : tournerGauche(apres1);
      const wrongs = DIRS.filter(d => d !== final) as string[];
      return {
        text: `Robot : part vers le ${depart}, tourne à ${t1}, puis tourne à ${t2}. Où regarde-t-il ?`,
        choices: makeChoices(final, wrongs),
        expected: [final],
        format: "qcm",
        comparator: "mcq_exact" as const,
        explanation: `${depart} → ${t1} → ${apres1} → ${t2} → ${final}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-001",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 3 fois 'Avancer 4 cases · Tourner à droite'. Le robot revient-il au départ ?",
    format: "qcm",
    choices: makeChoices("Non, il faut 4 répétitions pour un carré", ["Oui, après 3 tours", "Non, il faut 2 répétitions", "Non, il faut 6 répétitions"]),
    expected: ["Non, il faut 4 répétitions pour un carré"],
    comparator: "mcq_exact",
    hint: "Combien de côtés a un carré ?",
    explanation: "Un carré a 4 côtés. 3 répétitions ne font que 3 côtés sur 4.",
    tags: ["défi", "carré"],
  },
  {
    kind: "template",
    id: "cm1-algo-def-t004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    hint: "Compte le nombre de fois que chaque instruction est exécutée.",
    tags: ["défi", "répétition", "comptage"],
    generate: () => {
      const fois = pickOne([2, 3, 4, 5] as const);
      const n = fois * 1; // 1 instruction dans la boucle
      const wrongs = [String(n - 1), String(n + 1), String(n + fois)];
      return {
        text: `Programme : Répéter ${fois} fois "Avancer". Combien de fois l'instruction "Avancer" est-elle exécutée ?`,
        choices: makeChoices(String(n), wrongs),
        expected: [String(n)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `L'instruction est dans la boucle → elle s'exécute ${fois} fois.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 4 fois 'Avancer de 5 pas · Tourner de 90°'. Quelle figure dessine le robot ?",
    format: "qcm",
    choices: makeChoices("un carré", ["un triangle", "un cercle", "un hexagone"]),
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "4 côtés et des angles de 90°.",
    explanation: "4 côtés égaux avec des angles de 90° forment un carré.",
    tags: ["défi", "carré", "figure"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-003",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 3 fois 'Avancer de 6 pas', puis Avancer de 4 pas. Combien de pas au total ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "(3 × 6) + 4.",
    explanation: "(3 × 6) + 4 = 18 + 4 = 22 pas.",
    tags: ["défi", "répétition", "calcul"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-004",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 4, theme: "neutral",
    text: "Un robot regarde le Nord. Il tourne à droite, avance, tourne à droite, avance. Vers quelle direction regarde-t-il à la fin ?",
    format: "qcm",
    choices: makeChoices("Sud", ["Nord", "Est", "Ouest"]),
    expected: ["Sud"],
    comparator: "mcq_exact",
    hint: "Deux quarts de tour à droite.",
    explanation: "Nord → droite → Est → droite → Sud.",
    tags: ["défi", "direction"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-005",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 4, theme: "neutral",
    text: "Programme : Répéter 2 fois 'Avancer de 3 cases · Reculer de 1 case'. À combien de cases du départ le robot finit-il ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Chaque tour fait gagner 3 − 1 cases.",
    explanation: "Chaque tour fait avancer de 3 − 1 = 2 cases. 2 × 2 = 4 cases.",
    tags: ["défi", "répétition", "déplacement"],
  },
  {
    kind: "fixed",
    id: "cm1-algo-def-006",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 3 fois 'Avancer · Avancer'. Combien de fois l'instruction 'Avancer' est-elle exécutée ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "2 'Avancer' par tour, répétés 3 fois.",
    explanation: "Il y a 2 'Avancer' dans la boucle, répétés 3 fois : 2 × 3 = 6.",
    tags: ["défi", "répétition", "comptage"],
  },
];

// ── EXPORT ────────────────────────────────────────────────────────────────────

export const algorithmiqueBank: TutorBankItemV4[] = [
  ...algoInstruction,
  ...algoDeplacement,
  ...algoProgramme,
  ...algoRepetition,
  ...algoLogique,
  ...algoDefi,
];



