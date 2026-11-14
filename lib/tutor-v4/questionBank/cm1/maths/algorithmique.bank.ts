// lib/tutor-v4/question-banks/maths/cm1/algorithmique.bank.ts
// Règles CM1 : QCM uniquement (sauf short numérique), max templates, 5-6+ questions/microskill

import type {
  DifficultyLevel,
  ReperageCanvasData,
  ScratchBlockData,
  ScratchCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { SuiteCanvasData } from "@/lib/tutor-v4/types_canvas";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { entre, etapes, melange, qcm, un } from "./trous-outils";

// ── HELPERS ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function scratchCanvas(
  title: string,
  blocks: ScratchCanvasData["blocks"]
): ScratchCanvasData {
  return { kind: "scratch", title, blocks };
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
    hint: "2 demi-tours font un tour complet.",
    explanation: "2 demi-tours font un tour complet : le robot revient à sa direction initiale.",
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
      { type: "event", text: "quand le drapeau vert est cliqué" },
      { type: "move", value: "10 pas" },
      { type: "say", text: "« Bonjour »" },
    ]),
    hint: "Lis les blocs de haut en bas.",
    explanation: "Ordre d'exécution : avancer, puis dire Bonjour.",
    tags: ["programme", "scratch", "lecture"],
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
      { type: "event", text: "quand le drapeau vert est cliqué" },
      { type: "move", value: "10 pas" },
      { type: "say", text: "« Bonjour »" },
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
      { type: "event", text: "quand le drapeau vert est cliqué" },
      { type: "move", value: "20 pas" },
      { type: "move", value: "30 pas" },
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
    choices: makeChoices("Avancer de 10 pas", ["Tourner d’un quart de tour", "Dire Fini", "Quand 🚩 est cliqué"]),
    expected: ["Avancer de 10 pas"],
    comparator: "mcq_exact",
    canvas: scratchCanvas("Premier bloc", [
      { type: "event", text: "quand le drapeau vert est cliqué" },
      { type: "move", value: "10 pas" },
      { type: "turn", text: "Tourner d’un quart de tour", value: 90 },
      { type: "say", text: "« Fini »" },
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
    kind: "fixed",
    id: "cm1-algo-rep-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_repetition",
    difficulty: 2, theme: "neutral",
    text: "Programme : Répéter 4 fois 'Tourner d’un quart de tour'. En tout, le robot a fait…",
    format: "qcm",
    choices: ["un quart de tour", "un demi-tour", "trois quarts de tour", "un tour complet"],
    expected: ["un tour complet"],
    comparator: "mcq_exact",
    hint: "Compte les quarts de tour.",
    explanation: "4 quarts de tour font un tour complet.",
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
      { type: "event", text: "quand le drapeau vert est cliqué" },
      { type: "repeat", times: 3, children: [{ type: "move", value: "10 pas" }] },
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
    text: "Programme : Répéter 5 fois 'Tourner d’un cinquième de tour'. Combien de tours complets le robot a-t-il faits ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "5 cinquièmes de tour, combien de tours ?",
    explanation: "5 cinquièmes de tour font un tour complet (utile pour un pentagone).",
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
    kind: "fixed",
    id: "cm1-algo-def-002",
    niveau: "cm1", matiere: "maths",
    notionId: "algorithmique", microId: "algo_defi",
    difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 4 fois 'Avancer de 5 pas · Tourner d’un quart de tour'. Quelle figure dessine le robot ?",
    format: "qcm",
    choices: makeChoices("un carré", ["un triangle", "un cercle", "un hexagone"]),
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "4 côtés et des angles droits.",
    explanation: "4 côtés égaux avec des angles droits forment un carré.",
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

/* ═════════════════════════════════════════════════════════════════════════
   LES GABARITS (14/11/2026) — SITUATION × TOURNURE × NOMBRES.
   ⛔ Mesuré le 14/11 : 11 à 34 squelettes par micro (575 pour algo_instruction,
   mais 14 répétitions sur 20 à ★1), 10 à 18 répétitions sur 20, 0 % de dessins
   sur quatre micros sur six. Chaque étoile servie a maintenant 4 gabarits au
   moins : QUI est programmé (22 situations : robot aspirateur, tortue, drone de
   livraison, fourmi robot, chasse au trésor, métiers…) × la tournure × les
   nombres.
   ⭐ Le dessin montre le PROGRAMME (blocs à la Scratch), le QUADRILLAGE (départ
   et points A à D) ou la ROSE des directions (la flèche dit où regarde le
   robot) — jamais la réponse.
   ⭐ Les pièges sont des erreurs d'élève : tourner à droite de L'ÉCRAN et non
   du robot, compter la case de départ, « répéter 4 fois » exécuté une fois,
   l'ordre des instructions inversé, lire le programme de bas en haut, compter
   le drapeau vert comme une instruction, « plus de 5 » pris pour « 5 ou plus ».
   ═════════════════════════════════════════════════════════════════════════ */

type Unite = "cases" | "pas" | "cm" | "m";
/** Qui est programmé. `mot` : l'étiquette courte posée sur le dessin. */
type Sit = { n: string; f: boolean; u: Unite; mot: string; cibles: string[] };
const SITS: Sit[] = [
  { n: "le robot aspirateur", f: false, u: "cm", mot: "robot", cibles: ["le canapé", "la miette", "la chaussette"] },
  { n: "la tortue du logiciel de dessin", f: true, u: "pas", mot: "tortue", cibles: ["l'étoile", "le point rouge", "la maison"] },
  { n: "le drone de livraison", f: false, u: "m", mot: "drone", cibles: ["le colis", "la boîte aux lettres", "le jardin"] },
  { n: "la fourmi robot", f: true, u: "cases", mot: "fourmi", cibles: ["la miette de pain", "la fourmilière", "le grain de sucre"] },
  { n: "le pirate de la chasse au trésor", f: false, u: "pas", mot: "pirate", cibles: ["le trésor", "le coffre", "le palmier"] },
  { n: "le robot du cuisinier", f: false, u: "cm", mot: "robot", cibles: ["la casserole", "le frigo", "l'évier"] },
  { n: "le robot rangeur de la bibliothèque", f: false, u: "m", mot: "robot", cibles: ["l'étagère", "le livre", "le bureau"] },
  { n: "la tondeuse robot", f: true, u: "m", mot: "tondeuse", cibles: ["le portail", "l'arbre", "la cabane"] },
  { n: "le rover martien", f: false, u: "m", mot: "rover", cibles: ["le cratère", "le rocher", "la fusée"] },
  { n: "la voiture téléguidée", f: true, u: "cm", mot: "voiture", cibles: ["le garage", "la porte", "le ballon"] },
  { n: "le robot de la classe", f: false, u: "cases", mot: "robot", cibles: ["l'étoile", "la pomme", "le livre"] },
  { n: "le lutin de Scratch", f: false, u: "pas", mot: "lutin", cibles: ["le chat", "la pomme", "le ballon"] },
  { n: "le chien robot", f: false, u: "pas", mot: "chien", cibles: ["la niche", "l'os", "la balle"] },
  { n: "le robot pompier", f: false, u: "m", mot: "robot", cibles: ["le feu", "la bouche d'incendie", "le camion"] },
  { n: "le robot ramasseur de balles", f: false, u: "m", mot: "robot", cibles: ["la balle", "le filet", "le panier"] },
  { n: "le chariot robot de l'entrepôt", f: false, u: "m", mot: "chariot", cibles: ["le carton", "le quai", "la palette"] },
  { n: "la coccinelle robot", f: true, u: "cases", mot: "coccinelle", cibles: ["la fleur", "la feuille", "le soleil"] },
  { n: "le sous-marin jaune", f: false, u: "m", mot: "sous-marin", cibles: ["le corail", "le coquillage", "l'épave"] },
  { n: "le robot de l'infirmière", f: false, u: "m", mot: "robot", cibles: ["la chambre", "le lit", "la pharmacie"] },
  { n: "le héros du jeu vidéo", f: false, u: "cases", mot: "héros", cibles: ["la clé", "la porte", "le trésor"] },
  { n: "le robot du jardinier", f: false, u: "m", mot: "robot", cibles: ["le potager", "le puits", "la serre"] },
  { n: "l'abeille robot", f: true, u: "cases", mot: "abeille", cibles: ["la fleur", "la ruche", "le pot de miel"] },
];
const PRENOMS_F = ["Lina", "Zoé", "Inès", "Jade", "Nora", "Léa", "Maya", "Chloé", "Sarah", "Emma"];
const PRENOMS_M = ["Téo", "Malo", "Amir", "Tom", "Yanis", "Sacha", "Noé", "Ravi", "Hugo", "Adam"];
const prenom = () => un([...PRENOMS_F, ...PRENOMS_M]);
const deP = (p: string) => (/^[AEIOUYÉÈÎ]/.test(p) ? `d'${p}` : `de ${p}`);
const il = (s: Sit) => (s.f ? "elle" : "il");
const leLa = (s: Sit) => (s.f ? "la" : "le");
const duS = (s: Sit) => (s.n.startsWith("le ") ? `du ${s.n.slice(3)}` : `de ${s.n}`);
const aLa = (c: string) => (c.startsWith("le ") ? `au ${c.slice(3)}` : `à ${c}`);
const court = (c: string) => c.replace(/^(le |la |l'|l’)/, "");
const uT = (n: number, u: Unite) => (u === "cases" ? `${n} case${n > 1 ? "s" : ""}` : `${n} ${u}`);
const MOT_U: Record<Unite, string> = { cases: "cases", pas: "pas", cm: "centimètres", m: "mètres" };
/** Une longueur plausible pour un déplacement, selon l'unité. */
function lg(u: Unite): number {
  if (u === "cases") return entre(2, 6);
  if (u === "pas") return un([10, 15, 20, 25, 30, 40, 50, 60]);
  if (u === "cm") return un([10, 20, 30, 40, 50, 60, 70, 80]);
  return entre(2, 15);
}
/** Une longueur plus petite que `a`, dans la même unité. */
function moinsQue(u: Unite, a: number): number {
  const l = u === "pas" ? [5, 10, 15, 20, 25, 30] : u === "cm" ? [5, 10, 20, 30, 40] : [1, 2, 3, 4, 5, 6, 7, 8];
  const ok = l.filter((v) => v < a);
  return ok.length ? un(ok) : 1;
}
const Cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ORD = ["première", "deuxième", "troisième", "quatrième", "cinquième", "sixième"];
const ORDM = ["premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième"];

/** Trois pièges au plus, pris dans l'ordre des listes : jamais deux fois le même, jamais la bonne réponse. */
function pieges(juste: string, ...listes: Array<Array<string | undefined>>) {
  const out: string[] = [];
  for (const l of listes) for (const x of l) if (x && x !== juste && !out.includes(x) && out.length < 3) out.push(x);
  return qcm(juste, out);
}
/** QCM de nombres : pièges distincts en valeur, complétés par des voisins s'il en manque. */
function qcmF(juste: number, faux: number[], ecr: (v: number) => string = String) {
  const vals: number[] = [];
  for (const v of faux) if (v > 0 && v !== juste && !vals.includes(v) && vals.length < 3) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 40; k++) {
    for (const v of [juste + k, juste - k]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(ecr(juste), vals.map(ecr));
}

// ── Les blocs ──
const DRAPEAU: ScratchBlockData = { type: "event", text: "quand le drapeau vert est cliqué" };
const DEBUT: ScratchBlockData = { type: "event", text: "début" };
const avB = (n: number | "?", u: Unite): ScratchBlockData => ({ type: "move", value: n === "?" ? "?" : uT(n, u) });
/** Un bloc bleu au texte libre (le bloc « move » n'écrit que « avancer de … »). */
const bleu = (text: string): ScratchBlockData => ({ type: "turn", text });
const reB = (n: number, u: Unite) => bleu(`reculer de ${uT(n, u)}`);
const TD = bleu("tourner à droite");
const TG = bleu("tourner à gauche");
const DT = bleu("faire demi-tour");
const ditB = (m: string): ScratchBlockData => ({ type: "say", text: `« ${m} »` });
const etape = (text: string): ScratchBlockData => ({ type: "operator", text });
const STYLO: ScratchBlockData = { type: "pen", text: "poser le stylo" };
const boucle = (k: number | "?", children: ScratchBlockData[]): ScratchBlockData => ({
  type: "repeat",
  // « ? » : le nombre de tours est ce qu'on cherche — le bloc écrit « répéter ? fois ».
  times: k as number,
  children,
});
function prog(titre: string, blocks: ScratchBlockData[], tete: ScratchBlockData | null = DRAPEAU): ScratchCanvasData {
  return { kind: "scratch", title: titre, blocks: tete ? [tete, ...blocks] : blocks, display: { showSprite: true, compact: true } };
}

const MSG = ["Bonjour !", "Hop !", "Me voilà !", "Bravo !", "J'arrive !", "Coucou !", "Trouvé !", "Mission réussie !", "C'est parti !", "Au travail !"];
type Action = { b: ScratchBlockData; t: string; c: string };
/** Les actions d'un programme de robot : le bloc, son texte, et la phrase « il … ». */
function actionsRobot(S: Sit): Action[] {
  const a = lg(S.u);
  const r = moinsQue(S.u, lg(S.u) + 5);
  const m = un(MSG);
  return [
    { b: avB(a, S.u), t: `avancer de ${uT(a, S.u)}`, c: `avance de ${uT(a, S.u)}` },
    { b: reB(r, S.u), t: `reculer de ${uT(r, S.u)}`, c: `recule de ${uT(r, S.u)}` },
    { b: TD, t: "tourner à droite", c: "tourne à droite" },
    { b: TG, t: "tourner à gauche", c: "tourne à gauche" },
    { b: ditB(m), t: `dire « ${m} »`, c: `dit « ${m} »` },
    { b: etape("allumer sa lampe"), t: "allumer sa lampe", c: "allume sa lampe" },
    { b: etape("jouer un son"), t: "jouer un son", c: "joue un son" },
    { b: DT, t: "faire demi-tour", c: "fait demi-tour" },
    { b: etape("changer de couleur"), t: "changer de couleur", c: "change de couleur" },
  ];
}
/** k actions toutes différentes. */
const tirerActions = (S: Sit, k: number) => melange(actionsRobot(S)).slice(0, k);

const fab =
  (microId: string, p: string) =>
  (n: number, difficulty: DifficultyLevel, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 => ({
    kind: "template",
    id: `cm1-algo-${p}-g${String(n).padStart(2, "0")}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "algorithmique",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["algorithmique", microId, "gabarit"],
    generate,
  });

// ── Le quadrillage ──
type D4 = "haut" | "droite" | "bas" | "gauche";
const TOUR: D4[] = ["haut", "droite", "bas", "gauche"];
const aDroite = (d: D4) => TOUR[(TOUR.indexOf(d) + 1) % 4];
const aGauche = (d: D4) => TOUR[(TOUR.indexOf(d) + 3) % 4];
const oppose = (d: D4) => TOUR[(TOUR.indexOf(d) + 2) % 4];
const tourne = (d: D4, s: "droite" | "gauche") => (s === "droite" ? aDroite(d) : aGauche(d));
const DX: Record<D4, number> = { haut: 0, droite: 1, bas: 0, gauche: -1 };
const DY: Record<D4, number> = { haut: 1, droite: 0, bas: -1, gauche: 0 };
const FL: Record<D4, string> = { haut: "↑", droite: "→", bas: "↓", gauche: "←" };
const CARD: Record<D4, string> = { haut: "Nord", droite: "Est", bas: "Sud", gauche: "Ouest" };
const VERS_CARD: Record<D4, string> = { haut: "vers le Nord", droite: "vers l'Est", bas: "vers le Sud", gauche: "vers l'Ouest" };
const ECRAN: Record<D4, string> = {
  haut: "vers le haut de l'écran",
  droite: "vers la droite de l'écran",
  bas: "vers le bas de l'écran",
  gauche: "vers la gauche de l'écran",
};
const VERS: Record<D4, string> = { haut: "vers le haut", droite: "vers la droite", bas: "vers le bas", gauche: "vers la gauche" };
const SENS_MOT: Record<D4, string> = { haut: "en haut", droite: "à droite", bas: "en bas", gauche: "à gauche" };
// 6 au plus : un point sur le bord droit ou haut perd son étiquette (vu au CE2, 10/11).
const dans = (x: number, y: number) => x >= 0 && y >= 0 && x <= 6 && y <= 6;
const grille = (points: ReperageCanvasData["points"], path?: ReperageCanvasData["path"]): ReperageCanvasData => ({
  kind: "reperage",
  grid: { rows: 7, cols: 7 },
  display: { showGrid: true, showAxes: false, showCoordinates: false, showPointLabels: true },
  points,
  ...(path ? { path } : {}),
});
/** La rose des directions : la flèche bleue montre où regarde le robot. */
function rose(face: D4, mot: string, ecran = false): ReperageCanvasData {
  const L: Record<D4, string> = ecran ? { haut: "haut", droite: "droite", bas: "bas", gauche: "gauche" } : CARD;
  const gris = "#64748b";
  return {
    kind: "reperage",
    grid: { rows: 6, cols: 6 },
    display: { showGrid: true, showAxes: false, showCoordinates: false, showPointLabels: true },
    points: [
      { x: 3, y: 5, label: L.haut, color: gris },
      { x: 3, y: 1, label: L.bas, color: gris },
      { x: 5, y: 3, label: L.droite, color: gris },
      { x: 1, y: 3, label: L.gauche, color: gris },
    ],
    path: { start: { x: 3, y: 3, label: mot, color: "#2563eb" }, steps: [{ direction: face, count: 1 }], showArrows: true, color: "#2563eb" },
  };
}
const code = (l: Array<[D4, number]>) => l.flatMap(([d, k]) => Array(k).fill(FL[d])).join(" ");
const cases = (n: number) => `${n} case${n > 1 ? "s" : ""}`;
/** Le départ et quatre points possibles A, B, C, D : un seul est l'arrivée. */
function quatrePoints(x: number, y: number, juste: [number, number], faux: Array<[number, number]>, depart = "Départ") {
  const vus = new Set([`${x},${y}`, `${juste[0]},${juste[1]}`]);
  const autres: Array<[number, number]> = [];
  const voisins: Array<[number, number]> = [[juste[0] + 1, juste[1]], [juste[0], juste[1] + 1], [juste[0] - 1, juste[1]], [juste[0], juste[1] - 1]];
  for (const [u, v] of [...faux, ...voisins]) {
    if (autres.length < 3 && dans(u, v) && !vus.has(`${u},${v}`)) {
      vus.add(`${u},${v}`);
      autres.push([u, v]);
    }
  }
  const places = melange([juste, ...autres]);
  const lettres = ["A", "B", "C", "D"];
  const i = places.indexOf(juste);
  return {
    juste: `le point ${lettres[i]}`,
    faux: lettres.slice(0, places.length).filter((_, k) => k !== i).map((l) => `le point ${l}`),
    points: [{ x, y, label: depart, color: "#2563eb" }, ...places.map(([u, v], k) => ({ x: u, y: v, label: lettres[k], color: "#f59e0b" }))],
  };
}
/** Un trait sur le côté et un en hauteur, dans un ordre au hasard. */
function deuxTraits() {
  const h = un<D4>(["droite", "gauche"]);
  const v = un<D4>(["haut", "bas"]);
  const kh = entre(1, 4);
  const kv = un([1, 2, 3, 4].filter((n) => n !== kh));
  const l: Array<[D4, number]> = Math.random() < 0.5 ? [[h, kh], [v, kv]] : [[v, kv], [h, kh]];
  return { h, v, kh, kv, l };
}
function departPour(dx: number, dy: number) {
  return { x: dx >= 0 ? entre(0, 6 - dx) : entre(-dx, 6), y: dy >= 0 ? entre(0, 6 - dy) : entre(-dy, 6) };
}
/** Exécute un programme relatif (avancer, tourner) sur le quadrillage. */
type Pas = ["av", number] | ["d" | "g" | "dt"];
const longueurDe = (s: Pas) => (s as ["av", number])[1];
function marcher(x: number, y: number, face: D4, p: Pas[]) {
  let ok = dans(x, y);
  for (const s of p) {
    if (s[0] === "av") {
      for (let k = 0; k < longueurDe(s); k++) {
        x += DX[face];
        y += DY[face];
        if (!dans(x, y)) ok = false;
      }
    } else face = s[0] === "d" ? aDroite(face) : s[0] === "g" ? aGauche(face) : oppose(face);
  }
  return { x, y, face, ok };
}
const PAS_TXT = (s: Pas) =>
  s[0] === "av" ? `avancer de ${cases(longueurDe(s))}` : s[0] === "d" ? "tourner à droite" : s[0] === "g" ? "tourner à gauche" : "faire demi-tour";
/** Tire jusqu'à obtenir un cas qui tient dans la grille. */
function essai<T>(f: () => T | null): T {
  for (let k = 0; k < 400; k++) {
    const r = f();
    if (r) return r;
  }
  return f() as T;
}

/* ───────────── algo_instruction ───────────── */
const GI = fab("algo_instruction", "inst");
type Routine = { t: string; e: string[] };
// ⛔ Chaque routine a un ordre FORCÉ : deux étapes voisines ne peuvent pas s'échanger
// (le gabarit « deux étapes inversées » en dépend).
const ROUTINES: Routine[] = [
  { t: "la recette des crêpes", e: ["verser la farine dans le saladier", "ajouter les œufs et le lait", "mélanger la pâte", "verser une louche dans la poêle", "retourner la crêpe"] },
  { t: "les étapes du pain du boulanger", e: ["peser la farine", "ajouter l'eau et le sel", "pétrir la pâte", "laisser lever la pâte", "cuire le pain au four"] },
  { t: "les étapes pour se laver les mains", e: ["ouvrir le robinet", "mouiller ses mains", "frotter avec du savon", "rincer ses mains", "fermer le robinet"] },
  { t: "les étapes pour planter une graine", e: ["creuser un petit trou", "poser la graine dans le trou", "reboucher le trou", "arroser la terre"] },
  { t: "les étapes du pansement de l'infirmière", e: ["mettre des gants", "nettoyer la plaie", "sécher la plaie", "poser le pansement"] },
  { t: "la recette du jus d'orange", e: ["couper les oranges en deux", "presser les oranges", "verser le jus dans le verre", "boire le jus"] },
  { t: "les étapes de la mécanicienne pour changer une roue", e: ["retourner le vélo", "démonter la roue crevée", "monter la roue neuve", "serrer les écrous", "remettre le vélo à l'endroit"] },
  { t: "les étapes pour nourrir le poisson rouge", e: ["ouvrir la boîte de nourriture", "prendre une pincée de nourriture", "jeter la pincée dans l'aquarium", "regarder le poisson manger"] },
  { t: "la recette du gâteau de la pâtissière", e: ["préparer la pâte", "verser la pâte dans le moule", "mettre le moule au four", "sortir le gâteau du four", "démouler le gâteau"] },
  { t: "les étapes pour partir à vélo", e: ["mettre son casque", "monter sur le vélo", "pédaler", "freiner pour s'arrêter"] },
  { t: "les étapes pour appeler mamie", e: ["prendre le téléphone", "composer le numéro", "attendre que mamie décroche", "dire « Bonjour mamie ! »"] },
  { t: "les étapes du pompier devant un feu", e: ["brancher le tuyau", "ouvrir la lance", "arroser le feu", "fermer la lance"] },
  { t: "les étapes du fleuriste pour rempoter une plante", e: ["mettre de la terre au fond du pot", "poser la plante dans le pot", "ajouter de la terre autour", "arroser la plante"] },
  { t: "les étapes pour se brosser les dents", e: ["mettre du dentifrice sur la brosse", "brosser ses dents", "cracher", "rincer sa brosse"] },
  { t: "les étapes pour envoyer une lettre", e: ["écrire la lettre", "glisser la lettre dans l'enveloppe", "fermer l'enveloppe", "poster l'enveloppe"] },
  { t: "les étapes du bain du chien chez la toiletteuse", e: ["mouiller le chien", "savonner le chien", "rincer le chien", "sécher le chien"] },
  { t: "la recette de la soupe du cuisinier", e: ["éplucher les légumes", "couper les légumes", "cuire les légumes dans l'eau", "mixer la soupe", "servir la soupe"] },
];
const introR = (t: string, P: string) =>
  un([`Voici ${t}.`, `${P} suit ${t}.`, `${P} recopie ${t} dans son cahier.`, `Sur l'affiche de la classe, on lit ${t}.`, `${P} a rangé ${t} en blocs.`]);

const GAB_INSTRUCTION: TutorBankItemV4[] = [
  // ★1 — lire une étape d'une routine de la vie.
  GI(1, 1, "Un programme se lit de haut en bas, une étape après l'autre.", () => {
    const R = un(ROUTINES);
    const k = R.e.length;
    const P = prenom();
    const i = un([0, 1, 2, k - 1]);
    const q =
      i === 0
        ? un(["Quelle est la première étape ?", "Par quoi commence-t-on ?", "Que fait-on en premier ?"])
        : i === k - 1
          ? un(["Quelle est la dernière étape ?", "Par quoi finit-on ?", "Que fait-on en dernier ?"])
          : un([`Quelle est la ${ORD[i]} étape ?`, `Quelle étape vient en ${ORD[i]} ?`, `Quelle est l'étape numéro ${i + 1} ?`]);
    return {
      text: `${introR(R.t, P)} ${q}`,
      ...pieges(R.e[i], [R.e[k - 1 - i], R.e[i + 1], R.e[i - 1]], melange([...R.e])),
      explanation: etapes(
        "On lit les étapes de haut en bas, dans l'ordre, sans en sauter.",
        `Étape ${i + 1} sur ${k} : « ${R.e[i]} ».`,
        k - 1 - i === i ? `La réponse est « ${R.e[i]} ».` : `La réponse est « ${R.e[i]} ». En lisant de bas en haut, on aurait trouvé « ${R.e[k - 1 - i]} ».`,
      ),
      canvas: prog(R.t.charAt(0).toUpperCase() + R.t.slice(1), R.e.map(etape), null),
    };
  }),
  // ★1 — la n-ième instruction d'un robot (le drapeau vert ne compte pas).
  GI(2, 1, "Le drapeau vert lance le programme : ce n'est pas une instruction. On compte les blocs dessous.", () => {
    const S = un(SITS);
    const k = entre(4, 5);
    const A = tirerActions(S, k);
    const i = entre(0, k - 1);
    const q = un([
      `Quelle est la ${ORD[i]} instruction ?`,
      `Quelle instruction exécute-t-${il(S)} en ${ORD[i]} ?`,
      `Quel est le ${ORDM[i]} bloc sous le drapeau vert ?`,
    ]);
    return {
      text: `${S.n.charAt(0).toUpperCase() + S.n.slice(1)} ${un(["exécute ce programme.", "suit ce programme.", "reçoit ce programme."])} ${q}`,
      ...pieges(A[i].t, [i === 0 ? "quand le drapeau vert est cliqué" : A[i - 1].t, A[k - 1 - i].t, A[i + 1]?.t], A.map((a) => a.t)),
      explanation: etapes(
        "Le drapeau vert démarre le programme ; on compte les instructions juste en dessous, de haut en bas.",
        A.map((a, j) => `${j + 1}. ${a.t}`).join(" · "),
        `La ${ORD[i]} instruction est « ${A[i].t} ».`,
      ),
      canvas: prog(`Le programme ${duS(S)}`, A.map((a) => a.b)),
    };
  }),
  // ★1 — compter des instructions.
  GI(3, 1, "On compte les blocs sous le drapeau vert, un par un.", () => {
    const S = un(SITS);
    if (Math.random() < 0.5) {
      const k = entre(3, 6);
      const A = Array.from({ length: k }, () => un(actionsRobot(S)));
      return {
        text: `${un([`Voici le programme ${duS(S)}.`, `On programme ${S.n}.`, `${S.n.charAt(0).toUpperCase() + S.n.slice(1)} attend le drapeau vert.`])} ${un([
          `Combien d'instructions ${S.n} va-t-${il(S)} exécuter ?`,
          "Combien d'instructions ce programme contient-il ?",
          "Combien de blocs y a-t-il sous le drapeau vert ?",
        ])}`,
        ...qcmF(k, [k + 1, k - 1, k + 2]),
        explanation: etapes(
          "Le drapeau vert lance le programme, mais ce n'est pas une instruction.",
          `On compte les blocs dessous : ${A.map((a) => a.t).join(", ")}.`,
          `Il y a ${k} instructions (et pas ${k + 1} : le drapeau ne compte pas).`,
        ),
        canvas: prog(`Le programme ${duS(S)}`, A.map((a) => a.b)),
      };
    }
    const c = entre(2, 4);
    const nr = entre(1, 2);
    const autres = tirerActions(S, 9).filter((a) => !a.t.startsWith("avancer") && !a.t.startsWith("reculer")).slice(0, entre(1, 2));
    const blocs: ScratchBlockData[] = melange([
      ...Array.from({ length: c }, () => avB(lg(S.u), S.u)),
      ...Array.from({ length: nr }, () => reB(moinsQue(S.u, 30), S.u)),
      ...autres.map((a) => a.b),
    ]);
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${S.n.charAt(0).toUpperCase() + S.n.slice(1)} suit ce programme.`])} ${un([
        "Combien de blocs « avancer » contient-il ?",
        "Combien de fois trouve-t-on l'instruction « avancer » ?",
        `Combien de fois ${S.n} avance-t-${il(S)} ?`,
      ])}`,
      ...qcmF(c, [c + nr, blocs.length, c - 1]),
      explanation: etapes(
        "On ne compte que les blocs « avancer » : « reculer » n'est pas « avancer ».",
        `Il y a ${c} blocs « avancer », ${nr} « reculer » et ${autres.length} autre${autres.length > 1 ? "s" : ""}.`,
        `L'instruction « avancer » apparaît ${c} fois.`,
      ),
      canvas: prog(`Le programme ${duS(S)}`, blocs),
    };
  }),
  // ★1 — à quoi sert chaque bloc.
  GI(4, 1, "Avancer et reculer déplacent, tourner change de direction, dire fait parler.", () => {
    const S = un(SITS);
    const a = lg(S.u);
    const r = moinsQue(S.u, a + 5);
    const m = un(MSG);
    const sens = un(["droite", "gauche"]);
    const T = { av: `avancer de ${uT(a, S.u)}`, re: `reculer de ${uT(r, S.u)}`, tg: `tourner à ${sens}`, dit: `dire « ${m} »` };
    const B: Record<keyof typeof T, ScratchBlockData> = { av: avB(a, S.u), re: reB(r, S.u), tg: bleu(T.tg), dit: ditB(m) };
    const cle = un(["av", "re", "tg", "dit"] as const);
    const N = S.n;
    const Q: Record<keyof typeof T, string[]> = {
      av: [`Quel bloc fait aller ${N} vers l'avant ?`, `Avec quel bloc ${N} avance-t-${il(S)} ?`],
      re: [`Quel bloc fait revenir ${N} en arrière ?`, `Avec quel bloc ${N} recule-t-${il(S)} ?`],
      tg: [`Quel bloc fait changer de direction ${N}, sans ${leLa(S)} déplacer ?`, `Avec quel bloc ${N} change-t-${il(S)} de direction ?`],
      dit: [`Quel bloc fait parler ${N} ?`, `Avec quel bloc ${N} affiche-t-${il(S)} un message ?`],
    };
    return {
      text: `${un(["Voici quatre blocs.", `Voici quatre blocs ${duS(S)}.`, "On a sorti quatre blocs."])} ${un(Q[cle])}`,
      ...qcm(T[cle], Object.values(T).filter((x) => x !== T[cle])),
      explanation: etapes(
        "Chaque bloc donne un ordre précis.",
        "Avancer et reculer déplacent ; tourner change seulement la direction ; dire affiche un message.",
        `Le bon bloc est « ${T[cle]} ».`,
      ),
      canvas: prog("Quatre blocs", melange(Object.values(B)), null),
    };
  }),
  // ★2 — deux étapes inversées.
  GI(5, 2, "Vérifie chaque étape : peut-on vraiment la faire avant la suivante ?", () => {
    const R = un(ROUTINES);
    const k = R.e.length;
    const P = prenom();
    const i = entre(0, k - 2);
    const vu = [...R.e];
    [vu[i], vu[i + 1]] = [vu[i + 1], vu[i]];
    const paire = (a: string, b: string) => `« ${a} » et « ${b} »`;
    const faux: string[] = [];
    for (let j = 0; j < k - 1; j++) if (j !== i) faux.push(paire(vu[j], vu[j + 1]));
    return {
      text: `${P} a recopié ${R.t}, mais deux étapes qui se suivent ont été échangées. ${un([
        "Lesquelles ?",
        "Quelles étapes faut-il remettre dans l'ordre ?",
        "Quelles sont les deux étapes inversées ?",
      ])}`,
      ...qcm(paire(vu[i], vu[i + 1]), faux),
      explanation: etapes(
        "Dans un programme, l'ordre compte : on vérifie chaque étape avec la suivante.",
        `Il faut d'abord « ${R.e[i]} », et seulement ensuite « ${R.e[i + 1]} ».`,
        `Les étapes inversées sont ${paire(vu[i], vu[i + 1])}.`,
      ),
      canvas: prog("Le programme recopié", vu.map(etape), null),
    };
  }),
  // ★2 — avancer, reculer, avancer.
  GI(6, 2, "Avancer éloigne du départ, reculer en rapproche.", () => {
    const S = un(SITS);
    const a = lg(S.u) + (S.u === "cases" ? 1 : 0);
    const r = moinsQue(S.u, a);
    const b = lg(S.u);
    const fin = a - r + b;
    return {
      text: `${S.n.charAt(0).toUpperCase() + S.n.slice(1)} ${un(["part de sa base, en ligne droite.", "roule tout droit sur une ligne.", "se déplace sur une ligne droite."])} ${un([
        `À combien de ${MOT_U[S.u]} de son départ est-${il(S)} à la fin ?`,
        `À la fin, quelle distance ${leLa(S)} sépare de son départ ?`,
        `Où s'arrête-t-${il(S)} ? Donne sa distance au départ.`,
      ])}`,
      ...qcmF(fin, [a + r + b, a + b, a - r], (v) => uT(v, S.u)),
      explanation: etapes(
        "On suit les blocs dans l'ordre : on ajoute quand on avance, on enlève quand on recule.",
        `${a} − ${r} + ${b} = ${fin}.`,
        `${il(S) === "il" ? "Il" : "Elle"} est à ${uT(fin, S.u)} du départ.`,
      ),
      canvas: prog(`Le programme ${duS(S)}`, [avB(a, S.u), reB(r, S.u), avB(b, S.u)]),
    };
  }),
  // ★2 — le bloc qui manque.
  GI(7, 2, "Cherche ce qui manque pour arriver au total.", () => {
    const S = un(SITS);
    const c = un(S.cibles);
    const a = lg(S.u);
    const x = lg(S.u);
    const T = a + x;
    const bas = Math.random() < 0.5;
    return {
      text: `${S.n.charAt(0).toUpperCase() + S.n.slice(1)} doit avancer de ${uT(T, S.u)} en tout pour arriver ${aLa(c)}. Un bloc manque dans son programme. ${un([
        "Lequel ?",
        "Quel bloc faut-il mettre à la place du « ? » ?",
        "Par quel bloc remplacer le « ? » ?",
      ])}`,
      ...qcm(`avancer de ${uT(x, S.u)}`, [`avancer de ${uT(T, S.u)}`, `reculer de ${uT(x, S.u)}`, `avancer de ${uT(T + a, S.u)}`]),
      explanation: etapes(
        "On cherche ce qu'il faut ajouter au bloc déjà écrit pour atteindre le total.",
        `${a} + ? = ${T}, donc ? = ${T} − ${a} = ${x}.`,
        `Il manque le bloc « avancer de ${uT(x, S.u)} ».`,
      ),
      canvas: prog(`Le programme ${duS(S)}`, bas ? [avB(a, S.u), bleu("?")] : [bleu("?"), avB(a, S.u)]),
    };
  }),
  // ★2 — juste avant, juste après.
  GI(8, 2, "Repère le bloc nommé, puis regarde juste au-dessus ou juste en dessous.", () => {
    const S = un(SITS);
    const A = tirerActions(S, 5);
    const apres = Math.random() < 0.5;
    const i = apres ? entre(0, 3) : entre(1, 4);
    const j = apres ? i + 1 : i - 1;
    const autre = apres ? A[i - 1] : A[i + 1];
    return {
      text: `Voici le programme ${duS(S)}. ${un([
        `Quelle instruction vient juste ${apres ? "après" : "avant"} « ${A[i].t} » ?`,
        `Que fait-${il(S)} juste ${apres ? "après" : "avant"} « ${A[i].t} » ?`,
        `Quel bloc est juste ${apres ? "sous" : "au-dessus de"} « ${A[i].t} » ?`,
      ])}`,
      ...pieges(A[j].t, [autre?.t, A[i].t], A.map((a) => a.t)),
      explanation: etapes(
        "On lit de haut en bas : « après » = le bloc juste en dessous, « avant » = le bloc juste au-dessus.",
        `« ${A[i].t} » est la ${ORD[i]} instruction ; juste ${apres ? "après" : "avant"}, on lit « ${A[j].t} ».`,
        `C'est « ${A[j].t} ».`,
      ),
      canvas: prog(`Le programme ${duS(S)}`, A.map((a) => a.b)),
    };
  }),
];

/* ───────────── algo_deplacement ───────────── */
const GD = fab("algo_deplacement", "dep");

const GAB_DEPLACEMENT: TutorBankItemV4[] = [
  // ★1 — suivre un code de flèches.
  GD(1, 1, "Chaque flèche fait avancer d'une case dans sa direction.", () => {
    const S = un(SITS);
    const { h, v, kh, kv, l } = deuxTraits();
    const { x, y } = departPour(DX[h] * kh, DY[v] * kv);
    const jx = x + DX[h] * kh;
    const jy = y + DY[v] * kv;
    const q = quatrePoints(x, y, [jx, jy], [
      [x - DX[h] * kh, jy],
      [jx, y - DY[v] * kv],
      [x + DX[h] * kv, y + DY[v] * kh],
      [x + DX[h] * (kh - 1), jy],
    ]);
    return {
      text: `${Cap(S.n)} suit ce code : ${code(l)}. ${un([`Sur quel point arrive-t-${il(S)} ?`, `Où s'arrête-t-${il(S)} ?`, `Quel point atteint-${il(S)} ?`])}`,
      ...qcm(q.juste, q.faux),
      explanation: etapes(
        "Une flèche = une case dans le sens de la flèche. On part du point Départ.",
        `${cases(kh)} ${SENS_MOT[h]} et ${cases(kv)} ${SENS_MOT[v]}.`,
        `${Cap(il(S))} arrive sur ${q.juste}.`,
      ),
      canvas: grille(q.points),
    };
  }),
  // ★1 — choisir le bon code.
  GD(2, 1, "Compte les cases sur le côté, puis en hauteur.", () => {
    const S = un(SITS);
    const c = un(S.cibles);
    const { h, v, kh, kv, l } = deuxTraits();
    const { x, y } = departPour(DX[h] * kh, DY[v] * kv);
    const juste = code(l);
    return {
      text: un([
        `Quel code mène ${S.n} jusqu'${aLa(c)} ?`,
        `${Cap(S.n)} veut aller ${aLa(c)}. Quel code choisir ?`,
        `Aide ${S.n} à aller ${aLa(c)}. Quel est le bon code ?`,
      ]),
      ...qcm(juste, [
        code(l.map(([d]) => [d, d === h ? kv : kh] as [D4, number])),
        code(l.map(([d, k]) => [d === h ? oppose(h) : d, k] as [D4, number])),
        code(l.map(([d, k]) => [d === v ? oppose(v) : d, k] as [D4, number])),
        code(l.map(([d, k], i) => [d, i === 0 ? k + 1 : k] as [D4, number])),
      ]),
      explanation: etapes(
        "Une flèche par case, dans le sens du trajet.",
        `Du départ ${aLa(c)} : ${cases(kh)} ${SENS_MOT[h]} et ${cases(kv)} ${SENS_MOT[v]}.`,
        `Le bon code est ${juste}.`,
      ),
      canvas: grille([
        { x, y, label: "Départ", color: "#2563eb" },
        { x: x + DX[h] * kh, y: y + DY[v] * kv, label: court(c), color: "#f59e0b" },
      ]),
    };
  }),
  // ★1 — un quart de tour (rose des directions).
  GD(3, 1, "Tourner à droite, c'est tourner dans le sens des aiguilles d'une montre : Nord → Est → Sud → Ouest.", () => {
    const S = un(SITS);
    const face = un(TOUR);
    const sens = un(["droite", "gauche"] as const);
    const fin = tourne(face, sens);
    const autre = tourne(face, sens === "droite" ? "gauche" : "droite");
    return {
      text: `${Cap(S.n)} regarde ${VERS_CARD[face]}. ${Cap(il(S))} tourne d'un quart de tour à ${sens}. ${un([
        `Vers où regarde-t-${il(S)} maintenant ?`,
        `Dans quelle direction regarde-t-${il(S)} ?`,
        `Quelle direction ${S.n} regarde-t-${il(S)} à présent ?`,
      ])}`,
      ...pieges(CARD[fin], [CARD[autre], CARD[oppose(fin)], CARD[face]], TOUR.map((d) => CARD[d])),
      explanation: etapes(
        "Un quart de tour à droite : Nord → Est → Sud → Ouest → Nord. À gauche, c'est l'inverse.",
        `${CARD[face]}, un quart de tour à ${sens} : ${CARD[fin]}.`,
        `${Cap(il(S))} regarde ${VERS_CARD[fin]}.`,
      ),
      canvas: rose(face, S.mot),
    };
  }),
  // ★1 — compter les cases d'un chemin.
  GD(4, 1, "On compte les cases parcourues, pas la case de départ.", () =>
    essai(() => {
      const S = un(SITS);
      const c = un(S.cibles);
      const nb = entre(2, 3);
      const d0 = un(TOUR);
      const dirs: D4[] = [d0];
      while (dirs.length < nb) {
        const prec = dirs[dirs.length - 1];
        dirs.push(un([aDroite(prec), aGauche(prec)]));
      }
      const ks = dirs.map(() => entre(1, 3));
      const x0 = entre(0, 6);
      const y0 = entre(0, 6);
      const p = marcher(x0, y0, dirs[0], ks.flatMap((k, i): Pas[] => (i === 0 ? [["av", k]] : [[dirs[i] === aDroite(dirs[i - 1]) ? "d" : "g"] as Pas, ["av", k]])));
      if (!p.ok) return null;
      const tot = ks.reduce((s, k) => s + k, 0);
      return {
        text: `${Cap(S.n)} va ${aLa(c)} en suivant le chemin fléché. ${un([
          `Combien de cases parcourt-${il(S)} ?`,
          `De combien de cases se déplace-t-${il(S)} en tout ?`,
          "Combien de cases compte son trajet ?",
        ])}`,
        ...qcmF(tot, [tot + 1, nb, Math.max(...ks), tot - 1]),
        explanation: etapes(
          "On compte chaque case où l'on arrive ; la case de départ ne compte pas.",
          `${ks.join(" + ")} = ${tot}.`,
          `${Cap(il(S))} parcourt ${cases(tot)}.`,
        ),
        canvas: grille([{ x: p.x, y: p.y, label: court(c), color: "#f59e0b" }], {
          start: { x: x0, y: y0, label: "Départ", color: "#2563eb" },
          steps: dirs.map((d, i) => ({ direction: d, count: ks[i] })),
          showArrows: true,
        }),
      };
    }),
  ),
  // ★2 — la droite du robot n'est pas celle de l'écran.
  GD(5, 2, "Mets-toi à la place du robot : sa droite n'est pas forcément la droite de l'écran.", () => {
    const S = un(SITS);
    const face = un<D4>(["bas", "bas", "gauche", "droite", "haut"]);
    const sens = un(["droite", "gauche"] as const);
    const fin = tourne(face, sens);
    return {
      text: `Sur l'écran, ${S.n} regarde ${ECRAN[face]} (la flèche bleue). ${Cap(il(S))} tourne d'un quart de tour à sa ${sens}. ${un([
        `Vers où regarde-t-${il(S)} maintenant ?`,
        `Dans quelle direction regarde-t-${il(S)} sur l'écran ?`,
        `Où regarde-t-${il(S)} après avoir tourné ?`,
      ])}`,
      ...pieges(ECRAN[fin], [ECRAN[sens], ECRAN[oppose(fin)], ECRAN[face]], TOUR.map((d) => ECRAN[d])),
      explanation: etapes(
        `On tourne comme ${S.n}, pas comme l'écran : à droite, c'est dans le sens des aiguilles d'une montre.`,
        `${Cap(VERS[face])}, un quart de tour à sa ${sens} : ${VERS[fin]}.`,
        `${Cap(il(S))} regarde ${ECRAN[fin]}.`,
      ),
      canvas: rose(face, S.mot, true),
    };
  }),
  // ★2 — un programme avancer / tourner sur le quadrillage.
  GD(6, 2, "Avance d'abord dans la direction de la flèche, puis tourne comme le robot.", () =>
    essai(() => {
      const S = un(SITS);
      const face = un(TOUR);
      const a = entre(1, 3);
      const b = entre(1, 3);
      const sens = un(["droite", "gauche"] as const);
      const x = entre(0, 6);
      const y = entre(0, 6);
      const P: Pas[] = [["av", a], [sens === "droite" ? "d" : "g"], ["av", b]];
      const j = marcher(x, y, face, P);
      if (!j.ok) return null;
      const f1 = marcher(x, y, face, [["av", a], [sens === "droite" ? "g" : "d"], ["av", b]]);
      const f2 = marcher(x, y, face, [["av", b], [sens === "droite" ? "d" : "g"], ["av", a]]);
      const f3 = marcher(x, y, face, [["av", a + 1], [sens === "droite" ? "d" : "g"], ["av", b]]);
      const q = quatrePoints(x, y, [j.x, j.y], [[f1.x, f1.y], [f2.x, f2.y], [f3.x, f3.y]], `Départ ${FL[face]}`);
      if (q.faux.length < 2) return null;
      return {
        text: `${Cap(S.n)} est au départ et regarde ${VERS[face]} (flèche ${FL[face]}). Programme : ${P.map(PAS_TXT).join(", ")}. ${un([
          `Sur quel point arrive-t-${il(S)} ?`,
          `Où s'arrête-t-${il(S)} ?`,
          `Quel point atteint-${il(S)} ?`,
        ])}`,
        ...qcm(q.juste, q.faux),
        explanation: etapes(
          "On avance dans la direction où le robot regarde ; on tourne à SA droite ou à SA gauche.",
          `${cases(a)} ${VERS[face]}, puis ${il(S)} regarde ${VERS[tourne(face, sens)]} et fait ${cases(b)}.`,
          `${Cap(il(S))} arrive sur ${q.juste}.`,
        ),
        canvas: grille(q.points),
      };
    }),
  ),
  // ★2 — deux changements de direction.
  GD(7, 2, "Fais les tours un par un, dans l'ordre.", () => {
    const S = un(SITS);
    const face = un(TOUR);
    const T = [un(["d", "g", "dt"] as const), un(["d", "g"] as const)];
    const TXT = { d: "tourne d'un quart de tour à droite", g: "tourne d'un quart de tour à gauche", dt: "fait un demi-tour" };
    const app = (d: D4, t: "d" | "g" | "dt") => (t === "d" ? aDroite(d) : t === "g" ? aGauche(d) : oppose(d));
    const m = app(face, T[0]);
    const fin = app(m, T[1]);
    return {
      text: `${Cap(S.n)} regarde ${VERS_CARD[face]}. ${Cap(il(S))} ${TXT[T[0]]}, puis ${il(S)} ${TXT[T[1]]}. ${un([
        `Vers où regarde-t-${il(S)} à la fin ?`,
        `Quelle direction regarde-t-${il(S)} maintenant ?`,
        "Dans quelle direction finit-on ?",
      ])}`,
      ...pieges(CARD[fin], [CARD[m], CARD[oppose(fin)], CARD[face]], TOUR.map((d) => CARD[d])),
      explanation: etapes(
        "Chaque tour part de la direction obtenue au tour d'avant.",
        `${CARD[face]} → ${CARD[m]} → ${CARD[fin]}.`,
        `${Cap(il(S))} regarde ${VERS_CARD[fin]}.`,
      ),
      canvas: rose(face, S.mot),
    };
  }),
  // ★2 — le code du retour.
  GD(8, 2, "Pour revenir, on refait le chemin à l'envers : flèches dans l'autre sens, dans l'ordre inverse.", () => {
    const S = un(SITS);
    const c = un(S.cibles);
    const { h, v, kh, kv, l } = deuxTraits();
    const { x, y } = departPour(DX[h] * kh, DY[v] * kv);
    const retour = code([...l].reverse().map(([d, k]) => [oppose(d), k] as [D4, number]));
    return {
      text: `${Cap(S.n)} a suivi le code ${code(l)} pour aller ${aLa(c)}. ${un([
        `Quel code ${leLa(S)} ramène au départ ?`,
        "Quel code faut-il pour revenir au départ ?",
        `Pour rentrer au départ, quel code doit-${il(S)} suivre ?`,
      ])}`,
      ...qcm(retour, [
        code(l),
        code([...l].reverse()),
        code([...l].reverse().map(([d, k], i) => [i === 0 ? oppose(d) : d, k] as [D4, number])),
        code([...l].reverse().map(([d, k], i) => [oppose(d), i === 0 ? k + 1 : k] as [D4, number])),
      ]),
      explanation: etapes(
        "Chaque flèche du retour va dans le sens opposé : → devient ←, ↑ devient ↓.",
        `Aller : ${code(l)}. Retour : ${retour}.`,
        `Le code du retour est ${retour}.`,
      ),
      canvas: grille([
        { x, y, label: "Départ", color: "#2563eb" },
        { x: x + DX[h] * kh, y: y + DY[v] * kv, label: court(c), color: "#f59e0b" },
      ]),
    };
  }),
];

/* ───────────── algo_programme ───────────── */
const GP = fab("algo_programme", "prog");

const GAB_PROGRAMME: TutorBankItemV4[] = [
  // ★1 — la première action.
  GP(1, 1, "Le drapeau vert démarre ; la première action est le bloc juste en dessous.", () => {
    const S = un(SITS);
    const A = tirerActions(S, entre(3, 4));
    return {
      text: `On clique sur le drapeau vert : ${S.n} ${un(["démarre.", "se met en marche.", "commence son programme."])} ${un([
        `Que fait-${il(S)} en premier ?`,
        "Quelle est sa première action ?",
        "Quel bloc s'exécute en premier ?",
      ])}`,
      ...pieges(A[0].t, ["quand le drapeau vert est cliqué", A[A.length - 1].t, A[1].t]),
      explanation: etapes(
        "Le drapeau vert lance le programme, puis les blocs s'exécutent de haut en bas.",
        `Juste sous le drapeau : « ${A[0].t} ».`,
        `${Cap(il(S))} commence par « ${A[0].t} ».`,
      ),
      canvas: prog(Cap(S.n), A.map((a) => a.b)),
    };
  }),
  // ★1 — le message dit.
  GP(2, 1, "Lis les blocs « dire » de haut en bas.", () => {
    const S = un(SITS);
    const [m1, m2, m3] = melange([...MSG]);
    const A = tirerActions(S, 9).filter((a) => !a.t.startsWith("dire")).slice(0, 2);
    const blocs = [A[0].b, ditB(m1), A[1].b, ditB(m2)];
    const fin = Math.random() < 0.5;
    const juste = fin ? m2 : m1;
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`])} ${
        fin
          ? un([`Que dit ${S.n} à la fin ?`, `Quel est le dernier message ${duS(S)} ?`, `Quel message affiche-t-${il(S)} en dernier ?`])
          : un([`Que dit ${S.n} en premier ?`, `Quel est le premier message ${duS(S)} ?`, `Quel message affiche-t-${il(S)} d'abord ?`])
      }`,
      ...qcm(`« ${juste} »`, [`« ${fin ? m1 : m2} »`, `« ${m3} »`]),
      explanation: etapes(
        "On lit les blocs de haut en bas et on repère les blocs violets « dire ».",
        `Premier message : « ${m1} ». Dernier message : « ${m2} ».`,
        `La réponse est « ${juste} ».`,
      ),
      canvas: prog(Cap(S.n), blocs),
    };
  }),
  // ★1 — raconter un programme court.
  GP(3, 1, "Raconte les blocs dans l'ordre, de haut en bas.", () => {
    const S = un(SITS);
    const [X, Y] = tirerActions(S, 2);
    const I = Cap(il(S));
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `On clique sur le drapeau vert.`, `${Cap(S.n)} reçoit ce programme.`])} ${un([
        "Quelle phrase raconte ce programme ?",
        `Que fait ${S.n} ?`,
        "Que se passe-t-il ?",
      ])}`,
      ...qcm(`${I} ${X.c}, puis ${il(S)} ${Y.c}.`, [
        `${I} ${Y.c}, puis ${il(S)} ${X.c}.`,
        `${I} ${X.c}, et c'est tout.`,
        `${I} ${Y.c}, et c'est tout.`,
      ]),
      explanation: etapes(
        "Les blocs s'exécutent tous, l'un après l'autre, de haut en bas.",
        `D'abord « ${X.t} », ensuite « ${Y.t} ».`,
        `${I} ${X.c}, puis ${il(S)} ${Y.c}.`,
      ),
      canvas: prog(Cap(S.n), [X.b, Y.b]),
    };
  }),
  // ★2 — la distance totale.
  GP(4, 2, "Additionne les blocs « avancer » ; tourner ne fait pas avancer.", () => {
    const S = un(SITS);
    const n = entre(2, 3);
    const L = Array.from({ length: n }, () => lg(S.u));
    const blocs: ScratchBlockData[] = [];
    L.forEach((v, i) => {
      if (i > 0) blocs.push(un([TD, TG]));
      blocs.push(avB(v, S.u));
    });
    if (Math.random() < 0.5) blocs.push(ditB(un(MSG)));
    const tot = L.reduce((s, v) => s + v, 0);
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`, `On programme ${S.n}.`])} ${un([
        `De combien de ${MOT_U[S.u]} avance-t-${il(S)} en tout ?`,
        `Quelle distance parcourt-${il(S)} en tout ?`,
        `Combien de ${MOT_U[S.u]} fait-${il(S)} en tout ?`,
      ])}`,
      ...qcmF(tot, [tot - L[L.length - 1], tot - L[0], Math.max(...L), tot + L.length - 1], (v) => uT(v, S.u)),
      explanation: etapes(
        "On additionne tous les blocs « avancer ». Tourner change la direction, pas la distance.",
        `${L.join(" + ")} = ${tot}.`,
        `${Cap(il(S))} avance de ${uT(tot, S.u)} en tout.`,
      ),
      canvas: prog(Cap(S.n), blocs),
    };
  }),
  // ★2 — raconter un programme de trois blocs (l'ordre compte).
  GP(5, 2, "L'ordre des blocs est l'ordre des actions.", () => {
    const S = un(SITS);
    const [X, Y, Z] = tirerActions(S, 3);
    const I = Cap(il(S));
    const p = il(S);
    const ph = (a: Action, b: Action, c: Action) => `${I} ${a.c}, puis ${b.c}, puis ${c.c}.`;
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} exécute ce programme.`, "On clique sur le drapeau vert."])} ${un([
        "Quelle phrase raconte ce programme dans l'ordre ?",
        `Que fait ${S.n}, dans l'ordre ?`,
        "Quelle phrase dit exactement ce qui se passe ?",
      ])}`,
      ...qcm(ph(X, Y, Z), [ph(X, Z, Y), ph(Y, X, Z), ph(Z, Y, X)]),
      explanation: etapes(
        "On lit les blocs de haut en bas : c'est l'ordre dans lequel ils s'exécutent.",
        `1. ${X.t} · 2. ${Y.t} · 3. ${Z.t}.`,
        `${Cap(p)} ${X.c}, puis ${Y.c}, puis ${Z.c}.`,
      ),
      canvas: prog(Cap(S.n), [X.b, Y.b, Z.b]),
    };
  }),
  // ★2 — juste après le message.
  GP(6, 2, "Trouve le bloc « dire », puis lis le bloc juste en dessous.", () => {
    const S = un(SITS);
    const m = un(MSG);
    const A = tirerActions(S, 9).filter((a) => !a.t.startsWith("dire")).slice(0, 3);
    const pos = entre(1, 2);
    const blocs = [...A.map((a) => a.b)];
    blocs.splice(pos, 0, ditB(m));
    const apres = A[pos];
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`])} ${un([
        `Que fait ${S.n} juste après avoir dit « ${m} » ?`,
        `Quelle instruction suit le message « ${m} » ?`,
        `Après « ${m} », que fait-${il(S)} ?`,
      ])}`,
      ...pieges(apres.t, [A[pos - 1].t, A[A.length - 1].t, `dire « ${m} »`], A.map((a) => a.t)),
      explanation: etapes(
        "On repère le bloc « dire », puis on lit celui juste en dessous.",
        `Sous « dire « ${m} » » se trouve « ${apres.t} ».`,
        `${Cap(il(S))} fait ensuite « ${apres.t} ».`,
      ),
      canvas: prog(Cap(S.n), blocs),
    };
  }),
  // ★3 — le nombre qui manque.
  GP(7, 3, "Total − ce qui est déjà écrit = ce qui manque.", () => {
    const S = un(SITS);
    const c = un(S.cibles);
    const a = lg(S.u);
    const b = lg(S.u);
    const x = lg(S.u);
    const T = a + b + x;
    const sens = un([TD, TG]);
    const pos = entre(0, 2);
    const L: Array<number | "?"> = [a, b];
    L.splice(pos, 0, "?");
    const blocs: ScratchBlockData[] = [avB(L[0], S.u), sens, avB(L[1], S.u), un([TD, TG]), avB(L[2], S.u)];
    return {
      text: `${Cap(S.n)} doit parcourir ${uT(T, S.u)} en tout pour arriver ${aLa(c)}. ${un([
        "Quel nombre faut-il écrire à la place du « ? » ?",
        "Que faut-il mettre dans le bloc « avancer de ? » ?",
        "Quelle longueur manque dans le programme ?",
      ])}`,
      ...qcmF(x, [T - a, T - b, a + b, T], (v) => uT(v, S.u)),
      explanation: etapes(
        "On enlève du total les longueurs déjà écrites ; les blocs « tourner » ne comptent pas.",
        `${T} − ${a} − ${b} = ${x}.`,
        `Il faut écrire ${uT(x, S.u)}.`,
      ),
      canvas: prog(Cap(S.n), blocs),
    };
  }),
  // ★3 — la figure tracée au stylo.
  GP(8, 3, "Compte les côtés tracés et compare leurs longueurs.", () => {
    const S = un(SITS.filter((s) => s.u !== "cases"));
    const sens = un([TD, TG]);
    const a = lg(S.u);
    let b = lg(S.u);
    while (b === a) b = lg(S.u);
    const v = un(["carre", "rectangle", "ouverte"] as const);
    const L = v === "carre" ? [a, a, a, a] : v === "rectangle" ? [a, b, a, b] : [a, b, a];
    const blocs: ScratchBlockData[] = [STYLO];
    L.forEach((n, i) => {
      if (i > 0) blocs.push(sens);
      blocs.push(avB(n, S.u));
    });
    const OUV = "une ligne de 3 côtés, pas fermée";
    const juste = v === "carre" ? "un carré" : v === "rectangle" ? "un rectangle" : OUV;
    const faux = v === "carre" ? ["un triangle", OUV, "un trait droit"] : v === "rectangle" ? ["un carré", "un triangle", OUV] : ["un triangle", "un rectangle", "un carré"];
    return {
      text: `${Cap(S.n)} ${un(["pose son stylo et suit ce programme.", "trace son chemin avec un stylo.", `laisse un trait derrière ${S.f ? "elle" : "lui"}.`])} ${un([
        `Quelle figure trace-t-${il(S)} ?`,
        `Que dessine-t-${il(S)} ?`,
        "Quelle forme obtient-on ?",
      ])}`,
      ...qcm(juste, faux),
      explanation: etapes(
        "Chaque bloc « avancer » trace un côté ; chaque « tourner » fait un angle droit.",
        `${L.length} côtés : ${L.map((n) => uT(n, S.u)).join(", ")}.`,
        v === "ouverte" ? "Il manque le 4e côté : la figure n'est pas fermée." : v === "carre" ? "4 côtés égaux et des angles droits : un carré." : "Côtés opposés égaux, angles droits : un rectangle.",
      ),
      canvas: prog(Cap(S.n), blocs),
    };
  }),
  // ★3 — allers et retours sur une ligne.
  GP(9, 3, "Avancer éloigne, reculer rapproche : suis les blocs un par un.", () =>
    essai(() => {
      const S = un(SITS);
      const a = lg(S.u) + (S.u === "cases" ? 2 : 0);
      const r = moinsQue(S.u, a);
      const b = lg(S.u);
      const s = moinsQue(S.u, a - r + b);
      const fin = a - r + b - s;
      if (fin <= 0) return null;
      return {
        text: `${Cap(S.n)} ${un(["fait des allers et retours sur une ligne droite.", "avance et recule sur un couloir tout droit.", "se déplace sur une seule ligne."])} ${un([
          `À combien de ${MOT_U[S.u]} de son départ finit-${il(S)} ?`,
          `Quelle distance ${leLa(S)} sépare du départ à la fin ?`,
          `Où est-${il(S)} à la fin, par rapport au départ ?`,
        ])}`,
        ...qcmF(fin, [a + r + b + s, a + b, a - r + b], (v) => uT(v, S.u)),
        explanation: etapes(
          "On ajoute les avancées et on enlève les reculs, dans l'ordre.",
          `${a} − ${r} + ${b} − ${s} = ${fin}.`,
          `${Cap(il(S))} finit à ${uT(fin, S.u)} du départ.`,
        ),
        canvas: prog(Cap(S.n), [avB(a, S.u), reB(r, S.u), avB(b, S.u), reB(s, S.u)]),
      };
    }),
  ),
];

/* ───────────── algo_repetition ───────────── */
const GR = fab("algo_repetition", "rep");
type Vie = { qui: string; f: boolean; bloc: (n: number) => string; obj: string; q: string };
const VIE: Vie[] = [
  { qui: "la boulangère", f: true, bloc: (n) => `poser ${n} croissants sur la plaque`, obj: "croissants", q: "Combien de croissants pose-t-elle ?" },
  { qui: "le jardinier", f: false, bloc: (n) => `planter ${n} graines`, obj: "graines", q: "Combien de graines plante-t-il ?" },
  { qui: "la bibliothécaire", f: true, bloc: (n) => `ranger ${n} livres`, obj: "livres", q: "Combien de livres range-t-elle ?" },
  { qui: "le cuisinier", f: false, bloc: (n) => `casser ${n} œufs`, obj: "œufs", q: "Combien d'œufs casse-t-il ?" },
  { qui: "la fleuriste", f: true, bloc: (n) => `mettre ${n} roses dans le bouquet`, obj: "roses", q: "Combien de roses met-elle ?" },
  { qui: "le facteur", f: false, bloc: (n) => `déposer ${n} lettres`, obj: "lettres", q: "Combien de lettres dépose-t-il ?" },
  { qui: "la coach de sport", f: true, bloc: (n) => `faire ${n} sauts`, obj: "sauts", q: "Combien de sauts fait-elle ?" },
  { qui: "le robot de l'entrepôt", f: false, bloc: (n) => `empiler ${n} cartons`, obj: "cartons", q: "Combien de cartons empile-t-il ?" },
  { qui: "la maîtresse", f: true, bloc: (n) => `distribuer ${n} cahiers`, obj: "cahiers", q: "Combien de cahiers distribue-t-elle ?" },
  { qui: "le pâtissier", f: false, bloc: (n) => `poser ${n} fraises sur la tarte`, obj: "fraises", q: "Combien de fraises pose-t-il ?" },
  { qui: "l'apicultrice", f: true, bloc: (n) => `remplir ${n} pots de miel`, obj: "pots", q: "Combien de pots remplit-elle ?" },
  { qui: "le vétérinaire", f: false, bloc: (n) => `donner ${n} croquettes au chiot`, obj: "croquettes", q: "Combien de croquettes donne-t-il ?" },
  { qui: "la fourmi robot", f: true, bloc: (n) => `porter ${n} graines`, obj: "graines", q: "Combien de graines porte-t-elle ?" },
  { qui: "le maçon", f: false, bloc: (n) => `poser ${n} briques`, obj: "briques", q: "Combien de briques pose-t-il ?" },
];
/** Des actions sans nombre, pour compter les tours d'une boucle. */
const GESTES = [
  { t: "taper dans ses mains", q: "tape-t-elle dans ses mains", f: true, l: ["Au club de musique,", "En chorale,", "Pendant la danse,"] },
  { t: "sauter", q: "saute-t-il", f: false, l: ["En gym,", "Pendant la récréation,", "Au trampoline,"] },
  { t: "frapper la balle", q: "frappe-t-elle la balle", f: true, l: ["Au tennis,", "Au club de ping-pong,", "Pendant l'entraînement,"] },
  { t: "sonner la cloche", q: "sonne-t-il la cloche", f: false, l: ["À la fête de l'école,", "Au début du spectacle,"] },
  { t: "lancer le ballon", q: "lance-t-il le ballon", f: false, l: ["Au basket,", "Au handball,", "En sport,"] },
  { t: "faire une roulade", q: "fait-elle une roulade", f: true, l: ["En gym,", "Au club de judo,"] },
  { t: "jouer une note", q: "joue-t-elle une note", f: true, l: ["Au club de musique,", "Au conservatoire,", "Pendant la répétition,"] },
  { t: "dire « Hop ! »", q: "dit-il « Hop ! »", f: false, l: ["Pendant le jeu,", "Au centre de loisirs,", "À la fête de l'école,"] },
];
const quiVie = (V: Vie) => un([V.qui, `${V.qui} du village`, `${V.qui} de l'école`].slice(0, V.qui.includes("robot") || V.qui.includes("fourmi") ? 1 : 3));

const GAB_REPETITION: TutorBankItemV4[] = [
  // ★1 — combien de fois la boucle tourne.
  GR(1, 1, "« Répéter 5 fois » : ce qui est dans la boucle se fait 5 fois, pas une seule.", () => {
    const S = un(SITS);
    const k = entre(2, 9);
    const n = lg(S.u);
    const avance = Math.random() < 0.5;
    const A = avance ? { b: avB(n, S.u), t: `avancer de ${uT(n, S.u)}` } : un(tirerActions(S, 9).filter((a) => !a.t.startsWith("avancer") && !a.t.startsWith("reculer")));
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`, `On programme ${S.n} avec une boucle.`])} ${un([
        `Combien de fois ${S.n} exécute-t-${il(S)} « ${A.t} » ?`,
        `Combien de fois le bloc « ${A.t} » s'exécute-t-il ?`,
        `Combien de fois l'action « ${A.t} » est-elle faite ?`,
      ])}`,
      ...qcmF(k, [1, k + 1, avance ? n : 2 * k, 2 * k]),
      explanation: etapes(
        "Tout ce qui est dans la boucle « répéter » se fait autant de fois que le nombre écrit.",
        `« Répéter ${k} fois » : « ${A.t} » se fait ${k} fois.`,
        `La réponse est ${k}.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [A.b])]),
    };
  }),
  // ★1 — remplacer des blocs identiques par une boucle.
  GR(2, 1, "Compte les blocs identiques : c'est le nombre de répétitions.", () => {
    const S = un(SITS);
    const k = entre(3, 6);
    const A = Math.random() < 0.5 ? { b: avB(lg(S.u), S.u), t: "" } : un(tirerActions(S, 9));
    const t = A.b.type === "move" ? `avancer de ${A.b.value}` : A.t;
    const r = (n: number) => `répéter ${n} fois « ${t} »`;
    return {
      text: `${un([`Le programme ${duS(S)} répète le même bloc.`, `${Cap(S.n)} a un programme très long.`, "Ce programme est trop long."])} ${un([
        "Quelle boucle fait la même chose ?",
        "Par quelle boucle peut-on le raccourcir ?",
        "Quel bloc « répéter » le remplace ?",
      ])}`,
      ...qcm(r(k), [r(k + 1), r(k - 1), r(1)]),
      explanation: etapes(
        "Quand un même bloc se suit plusieurs fois, une boucle « répéter » le remplace.",
        `Le bloc « ${t} » est écrit ${k} fois.`,
        `On peut écrire « ${r(k)} ».`,
      ),
      canvas: prog(Cap(S.n), Array.from({ length: k }, () => A.b)),
    };
  }),
  // ★1 — une boucle dans la vie de tous les jours.
  GR(3, 1, "On compte combien de fois la boucle se répète.", () => {
    const G = un(GESTES);
    const P = un(G.f ? PRENOMS_F : PRENOMS_M);
    const k = entre(2, 9);
    const lieu = un(G.l);
    return {
      text: `${lieu} ${P} suit ce programme. ${un([
        `Combien de fois ${P} ${G.q} ?`,
        `Combien de fois fait-on « ${G.t} » ?`,
        `Combien de fois le bloc « ${G.t} » se fait-il ?`,
      ])}`,
      ...qcmF(k, [1, k + 1, k - 1]),
      explanation: etapes(
        "« Répéter » fait le geste autant de fois que le nombre écrit.",
        `« Répéter ${k} fois » : ${k} fois « ${G.t} ».`,
        `La réponse est ${k}.`,
      ),
      canvas: prog(`Le programme ${deP(P)}`, [boucle(k, [etape(G.t)])], DEBUT),
    };
  }),
  // ★2 — des quarts de tour répétés.
  GR(4, 2, "Deux quarts de tour font un demi-tour, quatre font un tour complet.", () => {
    const S = un(SITS);
    const k = entre(2, 4);
    const sens = un(["droite", "gauche"] as const);
    if (Math.random() < 0.5) {
      const TXT = ["", "un quart de tour", "un demi-tour", "trois quarts de tour", "un tour complet"];
      return {
        text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} tourne sur place.`])} ${un([
          `Au total, de combien a-t-${il(S)} tourné ?`,
          `Qu'a fait ${S.n} en tout ?`,
          "Combien a-t-on tourné en tout ?",
        ])}`,
        ...qcm(TXT[k], TXT.slice(1).filter((_, i) => i + 1 !== k)),
        explanation: etapes(
          "« Tourner à droite » = un quart de tour. On compte les quarts de tour.",
          `${k} quarts de tour.`,
          `${Cap(il(S))} a fait ${TXT[k]}.`,
        ),
        canvas: prog(Cap(S.n), [boucle(k, [sens === "droite" ? TD : TG])]),
      };
    }
    const face = un(TOUR);
    let fin = face;
    for (let i = 0; i < k; i++) fin = tourne(fin, sens);
    return {
      text: `${Cap(S.n)} regarde ${VERS_CARD[face]}. Programme : répéter ${k} fois « tourner à ${sens} ». ${un([
        `Vers où regarde-t-${il(S)} à la fin ?`,
        "Quelle direction regarde-t-on à la fin ?",
        `Dans quelle direction ${S.n} finit-${il(S)} ?`,
      ])}`,
      ...pieges(CARD[fin], [CARD[tourne(face, sens)], CARD[face], CARD[oppose(fin)]], TOUR.map((d) => CARD[d])),
      explanation: etapes(
        "On fait les quarts de tour un par un, autant de fois que la boucle le dit.",
        `${CARD[face]}${Array.from({ length: k }, (_, i) => {
          let d = face;
          for (let j = 0; j <= i; j++) d = tourne(d, sens);
          return ` → ${CARD[d]}`;
        }).join("")}.`,
        `${Cap(il(S))} regarde ${VERS_CARD[fin]}.`,
      ),
      canvas: rose(face, S.mot),
    };
  }),
  // ★2 — une boucle « avancer » : on multiplie.
  GR(5, 2, "Nombre de répétitions × longueur d'un pas de boucle.", () => {
    const S = un(SITS);
    const k = entre(2, 6);
    const n = lg(S.u);
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`, `On lance ${S.n}.`])} ${un([
        `De combien de ${MOT_U[S.u]} avance-t-${il(S)} en tout ?`,
        `Quelle distance parcourt-${il(S)} en tout ?`,
        `Combien de ${MOT_U[S.u]} fait-${il(S)} au total ?`,
      ])}`,
      ...qcmF(k * n, [k + n, n, (k + 1) * n], (v) => uT(v, S.u)),
      explanation: etapes(
        "La boucle refait « avancer » à chaque tour : on multiplie.",
        `${k} × ${n} = ${k * n}.`,
        `${Cap(il(S))} avance de ${uT(k * n, S.u)}.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(n, S.u)])]),
    };
  }),
  // ★2 — une boucle dans un métier.
  GR(6, 2, "La boucle refait la même action : on multiplie.", () => {
    const V = un(VIE);
    const k = entre(2, 6);
    const n = entre(2, 6);
    const P = un(V.f ? PRENOMS_F : PRENOMS_M);
    const qui = V.qui.includes("robot") || V.qui.includes("fourmi") ? Cap(V.qui) : un([Cap(quiVie(V)), `${P}, ${V.qui},`]);
    return {
      text: `${qui} suit ce programme. ${un([V.q, `En tout, combien de ${V.obj} ?`, `Combien de ${V.obj} au total ?`])}`,
      ...qcmF(k * n, [k + n, n, k, (k + 1) * n]),
      explanation: etapes(
        "Le bloc dans la boucle se refait à chaque tour : on multiplie.",
        `${k} × ${n} = ${k * n}.`,
        `${k * n} ${V.obj} en tout.`,
      ),
      canvas: prog(`Le programme ${V.qui.startsWith("le ") ? `du ${V.qui.slice(3)}` : `de ${V.qui}`}`, [boucle(k, [etape(V.bloc(n))])], DEBUT),
    };
  }),
  // ★2 — quelle figure dessine la boucle ?
  GR(7, 2, "Chaque tour de boucle trace un côté ; compte les côtés.", () => {
    const S = un(SITS.filter((s) => s.u !== "cases"));
    const a = lg(S.u);
    let b = lg(S.u);
    while (b === a) b = lg(S.u);
    const sens = un([TD, TG]);
    const v = un(["carre", "rectangle", "trois"] as const);
    const UN = "un seul côté";
    const OUV = "3 côtés, la figure n'est pas fermée";
    const corps = v === "rectangle" ? [avB(a, S.u), sens, avB(b, S.u), sens] : [avB(a, S.u), sens];
    const k = v === "carre" ? 4 : v === "rectangle" ? 2 : 3;
    const juste = v === "carre" ? "un carré" : v === "rectangle" ? "un rectangle" : OUV;
    const faux = v === "carre" ? [UN, "un triangle", OUV] : v === "rectangle" ? ["un carré", "deux côtés seulement", "un triangle"] : ["un triangle", "un carré", UN];
    return {
      text: `${Cap(S.n)} ${un(["pose son stylo, puis suit ce programme.", "dessine avec son stylo.", "trace son chemin au stylo."])} ${un([
        "Quelle figure obtient-on ?",
        `Que trace-t-${il(S)} ?`,
        "Que voit-on à la fin ?",
      ])}`,
      ...qcm(juste, faux),
      explanation: etapes(
        "On déroule la boucle : chaque « avancer » trace un côté, chaque « tourner » fait un angle droit.",
        v === "rectangle" ? `2 tours × 2 côtés = 4 côtés : ${uT(a, S.u)}, ${uT(b, S.u)}, ${uT(a, S.u)}, ${uT(b, S.u)}.` : `${k} tours = ${k} côtés de ${uT(a, S.u)}.`,
        v === "carre" ? "4 côtés égaux et des angles droits : un carré." : v === "rectangle" ? "Côtés opposés égaux, angles droits : un rectangle." : "Il manque un côté : la figure n'est pas fermée.",
      ),
      canvas: prog(Cap(S.n), [STYLO, boucle(k, corps)]),
    };
  }),
  // ★3 — combien de répétitions pour un total ?
  GR(8, 3, "Total ÷ longueur d'un tour de boucle = nombre de répétitions.", () => {
    const S = un(SITS);
    const c = un(S.cibles);
    const k = entre(3, 8);
    const n = S.u === "cases" ? entre(2, 3) : S.u === "m" ? entre(2, 5) : un([5, 10, 20]);
    const T = k * n;
    return {
      text: `${Cap(S.n)} doit parcourir ${uT(T, S.u)} pour arriver ${aLa(c)}. ${un([
        "Quel nombre faut-il écrire dans « répéter ? fois » ?",
        "Combien de fois faut-il répéter la boucle ?",
        "Combien de répétitions faut-il ?",
      ])}`,
      ...qcmF(k, [T - n, T, k + 1, k - 1]),
      explanation: etapes(
        `Chaque tour de boucle fait ${uT(n, S.u)} : on cherche combien de fois ${n} dans ${T}.`,
        `${T} ÷ ${n} = ${k}, car ${k} × ${n} = ${T}.`,
        `Il faut répéter ${k} fois.`,
      ),
      canvas: prog(Cap(S.n), [boucle("?", [avB(n, S.u)])]),
    };
  }),
  // ★3 — avancer puis reculer dans la boucle.
  GR(9, 3, "Calcule ce que fait UN tour de boucle, puis multiplie.", () => {
    const S = un(SITS);
    const a = lg(S.u) + (S.u === "cases" ? 1 : 0);
    const b = moinsQue(S.u, a);
    const k = entre(2, 5);
    const fin = k * (a - b);
    return {
      text: `${Cap(S.n)} ${un(["avance et recule en ligne droite.", "fait des pas en avant et en arrière.", "se déplace sur une ligne."])} ${un([
        `À combien de ${MOT_U[S.u]} du départ est-${il(S)} à la fin ?`,
        `Où finit-${il(S)}, par rapport à son départ ?`,
        "À quelle distance du départ s'arrête-t-on ?",
      ])}`,
      ...qcmF(fin, [k * (a + b), a - b, k * a], (v) => uT(v, S.u)),
      explanation: etapes(
        "Un tour de boucle : on avance puis on recule. On calcule ce qu'il reste, puis on multiplie.",
        `Un tour : ${a} − ${b} = ${a - b}. ${k} tours : ${k} × ${a - b} = ${fin}.`,
        `${Cap(il(S))} finit à ${uT(fin, S.u)} du départ.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(a, S.u), reB(b, S.u)])]),
    };
  }),
  // ★3 — une boucle, puis un bloc après.
  GR(10, 3, "D'abord la boucle (on multiplie), puis le bloc sous la boucle (une seule fois).", () => {
    const S = un(SITS);
    const k = entre(2, 5);
    const n = lg(S.u);
    const m = lg(S.u);
    const tot = k * n + m;
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`])} ${un([
        `De combien de ${MOT_U[S.u]} avance-t-${il(S)} en tout ?`,
        `Quelle distance parcourt-${il(S)} au total ?`,
        `Combien de ${MOT_U[S.u]} fait-${il(S)} en tout ?`,
      ])}`,
      ...qcmF(tot, [k * (n + m), k * n, n + m], (v) => uT(v, S.u)),
      explanation: etapes(
        "Le bloc sous la boucle n'est pas répété : il se fait une seule fois.",
        `${k} × ${n} + ${m} = ${k * n} + ${m} = ${tot}.`,
        `${Cap(il(S))} avance de ${uT(tot, S.u)}.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(n, S.u)]), avB(m, S.u)]),
    };
  }),
  // ★3 — combien d'instructions exécutées ?
  GR(11, 3, "Blocs dans la boucle × nombre de répétitions.", () => {
    const S = un(SITS);
    const k = entre(2, 6);
    const nb = entre(2, 3);
    const A = tirerActions(S, nb);
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`])} ${un([
        `Combien d'instructions ${S.n} exécute-t-${il(S)} en tout ?`,
        "Combien de blocs sont exécutés en tout ?",
        "Combien d'actions sont faites au total ?",
      ])}`,
      ...qcmF(k * nb, [k, nb, k + nb, k * nb + 1]),
      explanation: etapes(
        "À chaque tour de boucle, tous les blocs de la boucle s'exécutent.",
        `${nb} blocs × ${k} tours = ${k * nb}.`,
        `${k * nb} instructions en tout.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, A.map((a) => a.b))]),
    };
  }),
];

/* ───────────── algo_logique ───────────── */
const GL = fab("algo_logique", "log");
type Motif = { intro: (P: string) => string; obj: string; quel: string; m: boolean; e: string[] };
const MOTIFS: Motif[] = [
  { intro: (P) => `${P} enfile des perles pour un collier.`, obj: "perle", quel: "Quelle perle", m: false, e: ["🔴", "🔵", "🟡", "🟢"] },
  { intro: () => "Pour la fête de l'école, on accroche des fanions.", obj: "fanion", quel: "Quel fanion", m: true, e: ["🟥", "🟦", "🟨", "🟩"] },
  { intro: () => "Le marchand range ses fruits sur l'étal.", obj: "fruit", quel: "Quel fruit", m: true, e: ["🍎", "🍌", "🍐", "🍊"] },
  { intro: () => "La jardinière plante une bordure de fleurs.", obj: "fleur", quel: "Quelle fleur", m: false, e: ["🌷", "🌻", "🌼", "🌹"] },
  { intro: () => "Le carreleur pose des carreaux.", obj: "carreau", quel: "Quel carreau", m: true, e: ["⬛", "⬜", "🟫", "🟪"] },
  { intro: () => "Au zoo, les animaux défilent.", obj: "animal", quel: "Quel animal", m: true, e: ["🐘", "🦒", "🦁", "🐒"] },
  { intro: (P) => `${P} dessine une frise dans son cahier.`, obj: "forme", quel: "Quelle forme", m: false, e: ["⭐", "🔺", "⚫", "🔷"] },
  { intro: () => "Le pâtissier aligne ses gâteaux en vitrine.", obj: "gâteau", quel: "Quel gâteau", m: true, e: ["🍪", "🧁", "🍩", "🍰"] },
  { intro: () => "À la cantine, on sert les légumes dans cet ordre.", obj: "légume", quel: "Quel légume", m: true, e: ["🥕", "🥦", "🌽", "🍆"] },
  { intro: () => "Dans l'aquarium, les poissons nagent en file.", obj: "poisson", quel: "Quel poisson", m: true, e: ["🐟", "🐠", "🐡", "🦐"] },
  { intro: (P) => `${P} décore le sapin avec une guirlande.`, obj: "décoration", quel: "Quelle décoration", m: false, e: ["🔔", "⭐", "🎁", "🕯️"] },
  { intro: () => "Le robot trieur pose des balles sur le tapis.", obj: "balle", quel: "Quelle balle", m: false, e: ["⚽", "🏀", "🎾", "🏐"] },
];
const FORMES_MOTIF = [[0, 1], [0, 1, 1], [0, 0, 1], [0, 1, 2], [0, 0, 1, 1], [0, 1, 2, 1]];
function tirerMotif() {
  const M = un(MOTIFS);
  const forme = un(FORMES_MOTIF);
  const e = melange([...M.e]);
  const per = forme.map((i) => e[i]);
  const absent = e.find((x) => !per.includes(x)) ?? e[3];
  return { M, per, absent };
}
const suiteCanvas = (titre: string, terms: Array<string | number>, labels = false): SuiteCanvasData => ({
  kind: "suite",
  theme: "nombre",
  titre,
  terms,
  ...(terms.indexOf("?") >= 0 ? { missingIndex: terms.indexOf("?") } : {}),
  display: { showIcons: false, showArrows: false, showRule: false, showLabels: labels },
});

type Cond = {
  qui: string; f: boolean; si: string; alors: string; oui: string; non: string; autres: string[]; vrai: string; faux: string;
};
const CONDS: Cond[] = [
  { qui: "le robot aspirateur", f: false, si: "il touche un mur", alors: "tourner à droite", oui: "Il tourne à droite.", non: "Il ne tourne pas.", autres: ["Il tourne à gauche.", "Il s'éteint."], vrai: "Il arrive contre le mur du salon.", faux: "Devant lui, le salon est vide." },
  { qui: "la lampe du jardin", f: true, si: "il fait nuit", alors: "s'allumer", oui: "Elle s'allume.", non: "Elle reste éteinte.", autres: ["Elle clignote.", "Elle sonne."], vrai: "Le soleil est couché, il fait nuit noire.", faux: "C'est midi, le soleil brille." },
  { qui: "le robot du jardinier", f: false, si: "la terre est sèche", alors: "arroser la plante", oui: "Il arrose la plante.", non: "Il n'arrose pas la plante.", autres: ["Il coupe la plante.", "Il plante une graine."], vrai: "La terre est toute sèche.", faux: "Il vient de pleuvoir : la terre est mouillée." },
  { qui: "le cycliste", f: false, si: "le feu est rouge", alors: "s'arrêter", oui: "Il s'arrête.", non: "Il continue de rouler.", autres: ["Il fait demi-tour.", "Il descend du vélo et s'assoit."], vrai: "Le feu passe au rouge.", faux: "Le feu est vert." },
  { qui: "le four du boulanger", f: false, si: "le pain est doré", alors: "sonner", oui: "Il sonne.", non: "Il ne sonne pas.", autres: ["Il s'éteint.", "Il ouvre sa porte."], vrai: "Le pain est bien doré.", faux: "Le pain est encore tout blanc." },
  { qui: "le héros du jeu vidéo", f: false, si: "il touche une pièce", alors: "gagner 1 point", oui: "Il gagne 1 point.", non: "Il ne gagne pas de point.", autres: ["Il perd 1 point.", "Il gagne 2 points."], vrai: "Il saute et attrape une pièce d'or.", faux: "Il saute mais rate la pièce." },
  { qui: "la pompière", f: true, si: "l'alarme sonne", alors: "mettre son casque", oui: "Elle met son casque.", non: "Elle ne met pas son casque.", autres: ["Elle enlève ses bottes.", "Elle éteint l'alarme."], vrai: "L'alarme de la caserne sonne.", faux: "La caserne est calme, rien ne sonne." },
  { qui: "le robot trieur", f: false, si: "la balle est rouge", alors: "la mettre dans le bac rouge", oui: "Il la met dans le bac rouge.", non: "Il ne la met pas dans le bac rouge.", autres: ["Il la met dans le bac bleu.", "Il la jette."], vrai: "Une balle rouge arrive sur le tapis.", faux: "Une balle verte arrive sur le tapis." },
  { qui: "le chien robot", f: false, si: "on l'appelle", alors: "aboyer", oui: "Il aboie.", non: "Il n'aboie pas.", autres: ["Il s'assoit.", "Il court en rond."], vrai: "Malo l'appelle très fort.", faux: "Personne ne l'appelle." },
  { qui: "la vétérinaire", f: true, si: "le chat a de la fièvre", alors: "lui donner un médicament", oui: "Elle lui donne un médicament.", non: "Elle ne lui donne pas de médicament.", autres: ["Elle lui coupe les griffes.", "Elle le pèse deux fois."], vrai: "Le thermomètre montre que le chat a de la fièvre.", faux: "Le thermomètre montre que le chat n'a pas de fièvre." },
  { qui: "le drone de livraison", f: false, si: "sa batterie est presque vide", alors: "rentrer à la base", oui: "Il rentre à la base.", non: "Il ne rentre pas à la base.", autres: ["Il lâche son colis.", "Il fait demi-tour deux fois."], vrai: "Sa batterie est presque vide.", faux: "Sa batterie est pleine." },
  { qui: "la gardienne de but", f: true, si: "le ballon part à gauche", alors: "plonger à gauche", oui: "Elle plonge à gauche.", non: "Elle ne plonge pas à gauche.", autres: ["Elle plonge à droite.", "Elle sort du terrain."], vrai: "Le ballon part à gauche.", faux: "Le ballon part à droite." },
  { qui: "le parapluie automatique", f: false, si: "il pleut", alors: "s'ouvrir", oui: "Il s'ouvre.", non: "Il reste fermé.", autres: ["Il se casse.", "Il s'envole."], vrai: "La pluie commence à tomber.", faux: "Le ciel est tout bleu." },
];

type Seuil = {
  qui: string; f: boolean; mesure: (v: number) => string; cond: (s: number) => string; test: (v: number, s: number) => boolean;
  s: () => number; v: (s: number) => number; alors: string; sinon: string; oui: string; non: string;
};
const autour = (s: number, e: number) => un([s, s, s - e, s + e, s - 2 * e, s + 2 * e]);
const SEUILS: Seuil[] = [
  { qui: "la borne du manège", f: true, mesure: (v) => `Un enfant mesure ${v} cm.`, cond: (s) => `la taille est de ${s} cm ou plus`, test: (v, s) => v >= s, s: () => un([110, 120, 130]), v: (s) => autour(s, 5), alors: "dire « Tu peux monter ! »", sinon: "dire « Attends encore un peu ! »", oui: "Elle dit « Tu peux monter ! ».", non: "Elle dit « Attends encore un peu ! »." },
  { qui: "le robot de la poste", f: false, mesure: (v) => `Un colis pèse ${v} kg.`, cond: (s) => `le colis pèse plus de ${s} kg`, test: (v, s) => v > s, s: () => un([5, 8, 10]), v: (s) => autour(s, 1), alors: "le poser sur le tapis rouge", sinon: "le poser sur le tapis bleu", oui: "Il le pose sur le tapis rouge.", non: "Il le pose sur le tapis bleu." },
  { qui: "le jeu de l'ordinateur", f: false, mesure: (v) => `Le score de la partie est ${v}.`, cond: (s) => `le score est plus grand que ${s}`, test: (v, s) => v > s, s: () => un([10, 20, 50]), v: (s) => autour(s, 2), alors: "dire « Gagné ! »", sinon: "dire « Encore un essai ! »", oui: "Il dit « Gagné ! ».", non: "Il dit « Encore un essai ! »." },
  { qui: "le chauffage de la classe", f: false, mesure: (v) => `Le thermomètre affiche ${v} °C.`, cond: (s) => `la température est plus petite que ${s} °C`, test: (v, s) => v < s, s: () => un([18, 19, 20]), v: (s) => autour(s, 1), alors: "s'allumer", sinon: "rester éteint", oui: "Il s'allume.", non: "Il reste éteint." },
  { qui: "la tondeuse robot", f: true, mesure: (v) => `L'herbe mesure ${v} cm.`, cond: (s) => `l'herbe mesure plus de ${s} cm`, test: (v, s) => v > s, s: () => un([6, 8, 10]), v: (s) => autour(s, 1), alors: "tondre la pelouse", sinon: "rester dans son abri", oui: "Elle tond la pelouse.", non: "Elle reste dans son abri." },
  { qui: "le robot rangeur de la bibliothèque", f: false, mesure: (v) => `Un livre a ${v} pages.`, cond: (s) => `le livre a plus de ${s} pages`, test: (v, s) => v > s, s: () => un([100, 200]), v: (s) => autour(s, 10), alors: "le ranger en haut", sinon: "le ranger en bas", oui: "Il le range en haut.", non: "Il le range en bas." },
  { qui: "la tirelire robot", f: true, mesure: (v) => `Elle contient ${v} €.`, cond: (s) => `il y a ${s} € ou plus`, test: (v, s) => v >= s, s: () => un([15, 20, 30]), v: (s) => autour(s, 2), alors: "dire « Tu peux acheter le livre ! »", sinon: "dire « Encore un peu de patience ! »", oui: "Elle dit « Tu peux acheter le livre ! ».", non: "Elle dit « Encore un peu de patience ! »." },
  { qui: "la machine à trier les pommes", f: true, mesure: (v) => `Une pomme pèse ${v} g.`, cond: (s) => `la pomme pèse plus de ${s} g`, test: (v, s) => v > s, s: () => un([150, 200]), v: (s) => autour(s, 10), alors: "la mettre dans la grande caisse", sinon: "la mettre dans la petite caisse", oui: "Elle la met dans la grande caisse.", non: "Elle la met dans la petite caisse." },
  { qui: "la maître-nageuse", f: true, mesure: (v) => `L'eau de la piscine est à ${v} °C.`, cond: (s) => `l'eau est à ${s} °C ou plus`, test: (v, s) => v >= s, s: () => un([24, 26]), v: (s) => autour(s, 1), alors: "ouvrir le bassin", sinon: "garder le bassin fermé", oui: "Elle ouvre le bassin.", non: "Elle garde le bassin fermé." },
];

type SuiteCtx = { intro: string; u: string; q: string[] };
const SUITES_CTX: SuiteCtx[] = [
  { intro: "Le drone monte par paliers :", u: "m", q: ["À quelle hauteur sera le palier suivant ?", "Quel est le palier suivant ?"] },
  { intro: "Chaque semaine, la plante de la classe mesure", u: "cm", q: ["Combien mesurera-t-elle la semaine suivante ?", "Quelle sera sa taille ensuite ?"] },
  { intro: "Le boulanger sort ses fournées. Total de croissants cuits :", u: "croissants", q: ["Quel total après la fournée suivante ?", "Quel nombre vient ensuite ?"] },
  { intro: "Semaine après semaine, la tirelire de Malo contient", u: "€", q: ["Combien contiendra-t-elle ensuite ?", "Quelle somme vient ensuite ?"] },
  { intro: "Au jeu vidéo, le score passe à", u: "points", q: ["Quel score vient ensuite ?", "Quel sera le score suivant ?"] },
  { intro: "La fourmi robot a porté, en tout,", u: "graines", q: ["Combien en aura-t-elle porté ensuite ?", "Quel nombre vient ensuite ?"] },
  { intro: "Le chariot de l'entrepôt a empilé, en tout,", u: "cartons", q: ["Quel nombre vient ensuite ?", "Combien de cartons ensuite ?"] },
  { intro: "Le compteur du chien robot affiche", u: "pas", q: ["Que va-t-il afficher ensuite ?", "Quel nombre vient ensuite ?"] },
  { intro: "La tortue trace des traits de plus en plus longs :", u: "pas", q: ["Quelle longueur aura le trait suivant ?", "Quel est le trait suivant ?"] },
  { intro: "La coureuse note ses tours de piste :", u: "tours", q: ["Quel nombre vient ensuite ?", "Combien notera-t-elle ensuite ?"] },
];
const avecU = (n: number | string, u: string) => (u === "€" ? `${n} €` : `${n} ${u}`);

const GAB_LOGIQUE: TutorBankItemV4[] = [
  // ★1 — continuer un motif.
  GL(1, 1, "Repère le morceau qui se répète, puis continue-le.", () => {
    const { M, per, absent } = tirerMotif();
    const P = prenom();
    const L = per.length * 2 + entre(0, per.length - 1);
    const vus = Array.from({ length: L }, (_, i) => per[i % per.length]);
    const juste = per[L % per.length];
    return {
      text: `${M.intro(P)} ${un(["Le motif se répète toujours.", "On suit toujours le même motif.", ""])} ${un([`${M.quel} vient ensuite ?`, `${M.quel} faut-il mettre à la place du « ? » ?`, `Quel est le ${M.obj} suivant ?`])}`.replace(/  +/g, " "),
      ...pieges(juste, [per[(L + 1) % per.length], vus[L - 1], absent], per),
      explanation: etapes(
        "On cherche le morceau qui se répète, puis on le continue.",
        `Le motif : ${per.join(" ")}, puis il recommence.`,
        `Ensuite vient ${juste}.`,
      ),
      canvas: suiteCanvas("Le motif", [...vus, "?"]),
    };
  }),
  // ★1 — si… alors.
  GL(2, 1, "Si la condition est vraie, on fait l'action. Sinon, on ne la fait pas.", () => {
    const C = un(CONDS);
    const v = Math.random() < 0.5;
    return {
      text: `${Cap(C.qui)} suit ce programme. ${v ? C.vrai : C.faux} ${un([`Que fait-${C.f ? "elle" : "il"} ?`, "Que se passe-t-il ?", `Que va faire ${C.qui} ?`])}`,
      ...qcm(v ? C.oui : C.non, [v ? C.non : C.oui, ...C.autres]),
      explanation: etapes(
        `On regarde la condition : « ${C.si} ». Est-ce vrai ?`,
        v ? "Oui, la condition est vraie : on fait l'action." : "Non, la condition est fausse : on ne fait pas l'action.",
        v ? C.oui : C.non,
      ),
      canvas: prog(Cap(C.qui), [{ type: "if", condition: C.si, children: [etape(C.alors)] }], null),
    };
  }),
  // ★1 — continuer une suite de nombres.
  GL(3, 1, "Calcule l'écart entre deux nombres voisins, puis ajoute-le.", () => {
    const C = un(SUITES_CTX);
    const step = un([2, 3, 4, 5, 10, 25]);
    const d0 = entre(2, 9) * (step >= 10 ? step : 1);
    const seq = Array.from({ length: 4 }, (_, i) => d0 + i * step);
    const next = d0 + 4 * step;
    return {
      text: `${C.intro} ${seq.map((n) => avecU(n, C.u)).join(", ")}… ${un(C.q)}`,
      ...qcmF(next, [next + 1, next + step, seq[3] + 1, next - 1], (v) => avecU(v, C.u)),
      explanation: etapes(
        "On cherche ce qu'on ajoute à chaque fois.",
        `${seq[1]} − ${seq[0]} = ${step}, donc on ajoute ${step} : ${seq[3]} + ${step} = ${next}.`,
        `Ensuite vient ${avecU(next, C.u)}.`,
      ),
      canvas: suiteCanvas("Les nombres", [...seq, "?"]),
    };
  }),
  // ★2 — si… alors… sinon avec un seuil.
  GL(4, 2, "Compare le nombre à la condition. Attention : « plus de 5 » ne contient pas 5.", () => {
    const S = un(SEUILS);
    const s = S.s();
    const v = S.v(s);
    const ok = S.test(v, s);
    const I = S.f ? "elle" : "il";
    return {
      text: `${Cap(S.qui)} suit ce programme. ${S.mesure(v)} ${un([`Que fait-${I} ?`, "Que se passe-t-il ?", `Que va faire ${S.qui} ?`])}`,
      ...qcm(ok ? S.oui : S.non, [ok ? S.non : S.oui, `${Cap(I)} fait les deux actions.`, `${Cap(I)} ne fait rien du tout.`]),
      explanation: etapes(
        `On teste la condition « ${S.cond(s)} ». Vrai : on fait « alors ». Faux : on fait « sinon ». Jamais les deux.`,
        `Avec ${v}, la condition est ${ok ? "vraie" : "fausse"}.`,
        ok ? S.oui : S.non,
      ),
      canvas: prog(Cap(S.qui), [{ type: "if_else", condition: S.cond(s), children: [etape(S.alors)], elseChildren: [etape(S.sinon)] }], null),
    };
  }),
  // ★2 — pair ou impair, plus grand ou plus petit.
  GL(5, 2, "Teste la condition avec le nombre tiré : vrai → « alors », faux → « sinon ».", () => {
    const S = un(SITS);
    const n = entre(1, 20);
    const a = entre(1, 4);
    const r = entre(1, 3);
    const k = entre(5, 12);
    const T = un([
      { c: "le nombre est pair", t: n % 2 === 0, e: `${n} est ${n % 2 === 0 ? "pair" : "impair"}` },
      { c: "le nombre est impair", t: n % 2 === 1, e: `${n} est ${n % 2 === 0 ? "pair" : "impair"}` },
      { c: `le nombre est plus grand que ${k}`, t: n > k, e: `${n} ${n > k ? "est" : "n'est pas"} plus grand que ${k}` },
      { c: `le nombre est plus petit que ${k}`, t: n < k, e: `${n} ${n < k ? "est" : "n'est pas"} plus petit que ${k}` },
    ]);
    const al = `avancer de ${cases(a)}`;
    const si = `reculer de ${cases(r)}`;
    const I = il(S);
    const oui = `${Cap(I)} avance de ${cases(a)}.`;
    const non = `${Cap(I)} recule de ${cases(r)}.`;
    const tir = un([`${Cap(S.n)} tire la carte ${n}.`, n <= 6 ? `Le dé ${duS(S)} donne ${n}.` : `La roue ${duS(S)} s'arrête sur ${n}.`, `On donne le nombre ${n} ${aLa(S.n)}.`]);
    return {
      text: `${tir} ${un(["Voici son programme.", "Le programme est prêt.", ""])} ${un([`Que fait-${I} ?`, "Que se passe-t-il ?", "Quel bloc s'exécute ?"])}`.replace(/  +/g, " "),
      ...qcm(T.t ? oui : non, [T.t ? non : oui, `${Cap(I)} avance de ${cases(a)}, puis recule de ${cases(r)}.`, `${Cap(I)} ne bouge pas.`]),
      explanation: etapes(
        `On teste « ${T.c} ».`,
        `${T.e} : la condition est ${T.t ? "vraie" : "fausse"}.`,
        T.t ? oui : non,
      ),
      canvas: prog(Cap(S.n), [{ type: "if_else", condition: T.c, children: [avB(a, "cases")], elseChildren: [bleu(si)] }]),
    };
  }),
  // ★2 — le nombre qui manque, ou la règle.
  GL(6, 2, "Cherche ce qui change d'un nombre au suivant : on ajoute, on enlève ou on double ?", () => {
    const C = un(SUITES_CTX);
    const mode = un(["plus", "plus", "moins", "double"] as const);
    const step = mode === "double" ? 2 : un([2, 3, 4, 5, 10]);
    const d0 = mode === "double" ? entre(2, 5) : mode === "moins" ? entre(6, 9) * step : entre(2, 20);
    const f = (i: number) => (mode === "plus" ? d0 + i * step : mode === "moins" ? d0 - i * step : d0 * 2 ** i);
    const seq = Array.from({ length: 5 }, (_, i) => f(i));
    const regle = mode === "plus" ? `on ajoute ${step}` : mode === "moins" ? `on enlève ${step}` : "on double";
    if (Math.random() < 0.5) {
      const autres = mode === "double" ? ["on ajoute 2", `on ajoute ${d0}`, "on triple"] : [`on ajoute ${step + 1}`, mode === "plus" ? `on enlève ${step}` : `on ajoute ${step}`, `on ajoute ${2 * step}`, "on double"];
      return {
        text: `${C.intro} ${seq.slice(0, 4).map((n) => avecU(n, C.u)).join(", ")}… ${un(["Quelle est la règle ?", "Comment passe-t-on d'un nombre au suivant ?", "Quelle règle suit cette suite ?"])}`,
        ...qcm(regle, autres),
        explanation: etapes("On compare deux nombres qui se suivent.", `${seq[0]} → ${seq[1]} → ${seq[2]} : ${regle}.`, `La règle : ${regle}.`),
        canvas: suiteCanvas("Les nombres", seq.slice(0, 4)),
      };
    }
    const pos = entre(1, 3);
    const vus: Array<number | string> = seq.map((n, i) => (i === pos ? "?" : n));
    const juste = seq[pos];
    return {
      text: `${C.intro} ${vus.map((n) => (n === "?" ? "…" : avecU(n, C.u))).join(", ")}. ${un(["Quel nombre manque ?", "Que faut-il écrire à la place des points ?", "Quel nombre a été effacé ?"])}`,
      ...qcmF(juste, [seq[pos - 1] + 1, seq[pos + 1] + (mode === "moins" ? -1 : 1), juste + (mode === "double" ? 2 : step), juste - 1]),
      explanation: etapes("On trouve la règle avec deux nombres voisins visibles, puis on l'applique.", `Règle : ${regle}. ${seq[pos - 1]} → ${juste} → ${seq[pos + 1]}.`, `Il manque ${juste}.`),
      canvas: suiteCanvas("Les nombres", vus),
    };
  }),
  // ★2 — le motif loin devant.
  GL(7, 2, "Le motif recommence tous les quelques éléments : compte par paquets.", () => {
    const { M, per, absent } = tirerMotif();
    const P = prenom();
    const p = per.length;
    const n = entre(9, 20);
    const juste = per[(n - 1) % p];
    const vus = Array.from({ length: p * 2 }, (_, i) => per[i % p]);
    return {
      text: `${M.intro(P)} Le motif se répète toujours. ${un([`${M.quel} sera ${M.m ? "le" : "la"} ${n}e ?`, `En continuant, que trouvera-t-on en ${n}e position ?`])}`,
      ...pieges(juste, [per[n % p], per[(n - 2 + p) % p], absent], per),
      explanation: etapes(
        `Le motif ${per.join(" ")} a ${p} éléments : il recommence à chaque fois.`,
        `${n} = ${Math.floor((n - 1) / p)} × ${p} + ${((n - 1) % p) + 1} : on est au rang ${((n - 1) % p) + 1} du motif.`,
        `En ${n}e position : ${juste}.`,
      ),
      canvas: suiteCanvas("Le début du motif", vus, true),
    };
  }),
];

/* ───────────── algo_defi ───────────── */
const GF = fab("algo_defi", "def");

const GAB_DEFI: TutorBankItemV4[] = [
  // ★3 — un trajet avec deux virages.
  GF(1, 3, "Avance dans la direction du regard ; à chaque virage, tourne comme le robot.", () =>
    essai(() => {
      const S = un(SITS);
      const face = un(TOUR);
      const [a, b, c] = [entre(1, 3), entre(1, 3), entre(1, 2)];
      const t1 = un(["d", "g"] as const);
      const t2 = un(["d", "g"] as const);
      const x = entre(0, 6);
      const y = entre(0, 6);
      const P: Pas[] = [["av", a], [t1], ["av", b], [t2], ["av", c]];
      const j = marcher(x, y, face, P);
      if (!j.ok) return null;
      const inv = (t: "d" | "g") => (t === "d" ? "g" : "d");
      const f1 = marcher(x, y, face, [["av", a], [inv(t1)], ["av", b], [t2], ["av", c]]);
      const f2 = marcher(x, y, face, [["av", a], [t1], ["av", b], [inv(t2)], ["av", c]]);
      const f3 = marcher(x, y, face, [["av", a], [inv(t1)], ["av", b], [inv(t2)], ["av", c]]);
      const q = quatrePoints(x, y, [j.x, j.y], [[f1.x, f1.y], [f2.x, f2.y], [f3.x, f3.y]], `Départ ${FL[face]}`);
      if (q.faux.length < 3) return null;
      return {
        text: `${Cap(S.n)} part du départ en regardant ${VERS[face]} (flèche ${FL[face]}). Programme : ${P.map(PAS_TXT).join(", ")}. ${un([
          `Sur quel point arrive-t-${il(S)} ?`,
          `Où s'arrête-t-${il(S)} ?`,
          `Quel point atteint-${il(S)} à la fin ?`,
        ])}`,
        ...qcm(q.juste, q.faux),
        explanation: etapes(
          "On suit les blocs un par un : on avance dans la direction du regard ; « tourner à droite » = à SA droite.",
          `${cases(a)} ${VERS[face]}, puis ${cases(b)} ${VERS[tourne(face, t1 === "d" ? "droite" : "gauche")]}, puis ${cases(c)} ${VERS[j.face]}.`,
          `${Cap(il(S))} arrive sur ${q.juste}.`,
        ),
        canvas: grille(q.points),
      };
    }),
  ),
  // ★3 — boucle + virage + bloc final : la distance.
  GF(2, 3, "Dans la boucle, on multiplie ; les virages ne comptent pas ; le bloc après la boucle se fait une fois.", () => {
    const S = un(SITS);
    const k = entre(2, 5);
    const a = lg(S.u);
    const b = lg(S.u);
    const tot = k * a + b;
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`, `On programme ${S.n}.`])} ${un([
        `Quelle distance parcourt-${il(S)} en tout ?`,
        `De combien de ${MOT_U[S.u]} avance-t-${il(S)} au total ?`,
        `Combien de ${MOT_U[S.u]} fait-${il(S)} en tout ?`,
      ])}`,
      ...qcmF(tot, [k * (a + b), a + b, k * a, tot + k], (v) => uT(v, S.u)),
      explanation: etapes(
        "La boucle refait « avancer » à chaque tour ; tourner ne fait pas de distance.",
        `${k} × ${a} + ${b} = ${k * a} + ${b} = ${tot}.`,
        `${Cap(il(S))} parcourt ${uT(tot, S.u)}.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(a, S.u), un([TD, TG])]), avB(b, S.u)]),
    };
  }),
  // ★3 — deux programmes : lequel va le plus loin ?
  GF(3, 3, "Calcule la distance de chaque programme ; la boucle compte plusieurs fois.", () =>
    essai(() => {
    const S = un(SITS);
    const k = entre(3, 5);
    const a = S.u === "cases" ? entre(2, 4) : lg(S.u);
    const A = k * a;
    const egal = Math.random() < 0.25;
    const b1 = S.u === "cases" ? entre(2, 6) : lg(S.u);
    const b2 = egal ? A - b1 : Math.max(1, A - b1 + un([-2, -1, 1, 2]) * (S.u === "cases" || S.u === "m" ? 1 : 5));
    if (b2 <= 0) return null;
    const B = b1 + b2;
    const juste = A === B ? "Ils vont aussi loin l'un que l'autre." : A > B ? "Le programme A." : "Le programme B.";
    return {
      text: `${Cap(S.n)} peut suivre deux programmes. ${un([`Avec lequel va-t-${il(S)} le plus loin ?`, `Quel programme ${leLa(S)} fait avancer le plus ?`, "Lequel des deux mène le plus loin ?"])}`,
      ...qcm(juste, ["Le programme A.", "Le programme B.", "Ils vont aussi loin l'un que l'autre.", "On ne peut pas savoir."]),
      explanation: etapes(
        "On calcule la distance de chaque programme. « Répéter » compte autant de fois que le nombre écrit.",
        `A : ${k} × ${a} = ${A}. B : ${b1} + ${b2} = ${B}.`,
        A === B ? "Les deux font la même distance." : `${A > B ? "A" : "B"} va plus loin (${Math.max(A, B)} contre ${Math.min(A, B)}).`,
      ),
      canvas: prog(
        Cap(S.n),
        [{ type: "event", text: "programme A" }, boucle(k, [avB(a, S.u)]), { type: "event", text: "programme B" }, avB(b1, S.u), avB(b2, S.u)],
        null,
      ),
    };
    }),
  ),
  // ★3 — la direction après une suite d'instructions.
  GF(4, 3, "Avancer ne change pas la direction ; seuls les « tourner » et « demi-tour » la changent.", () => {
    const S = un(SITS);
    const face = un(TOUR);
    const T = [un(["d", "g", "dt"] as const), un(["d", "g"] as const), un(["d", "g", "dt"] as const)];
    const p: Pas[] = [];
    T.forEach((t) => {
      p.push(["av", entre(1, 4)]);
      p.push([t]);
    });
    if (Math.random() < 0.5) p.push(["av", entre(1, 3)]);
    const fin = marcher(0, 0, face, p).face;
    const sansDT = marcher(0, 0, face, p.filter((s) => s[0] !== "dt")).face;
    return {
      text: `${Cap(S.n)} regarde ${VERS_CARD[face]}. Programme : ${p.map(PAS_TXT).join(", ")}. ${un([
        `Vers où regarde-t-${il(S)} à la fin ?`,
        "Quelle direction regarde-t-on à la fin ?",
        `Dans quelle direction ${S.n} finit-${il(S)} ?`,
      ])}`,
      ...pieges(CARD[fin], [CARD[sansDT], CARD[oppose(fin)], CARD[face]], TOUR.map((d) => CARD[d])),
      explanation: etapes(
        "On ne regarde que les virages, dans l'ordre : « avancer » garde la même direction.",
        `${CARD[face]}${(() => {
          let d = face;
          return p.filter((s) => s[0] !== "av").map((s) => {
            d = s[0] === "d" ? aDroite(d) : s[0] === "g" ? aGauche(d) : oppose(d);
            return ` → ${CARD[d]}`;
          }).join("");
        })()}.`,
        `${Cap(il(S))} regarde ${VERS_CARD[fin]}.`,
      ),
      canvas: rose(face, S.mot),
    };
  }),
  // ★4 — une boucle sur le quadrillage.
  GF(5, 4, "Déroule la boucle : écris chaque tour, l'un après l'autre.", () =>
    essai(() => {
      const S = un(SITS);
      const face = un(TOUR);
      const k = entre(2, 3);
      const a = entre(1, 3);
      const t = un(["d", "g"] as const);
      const x = entre(0, 6);
      const y = entre(0, 6);
      const corps: Pas[] = [["av", a], [t]];
      const P: Pas[] = Array.from({ length: k }, () => corps).flat();
      const j = marcher(x, y, face, P);
      if (!j.ok) return null;
      const f1 = marcher(x, y, face, corps);
      const f2 = marcher(x, y, face, Array.from({ length: k + 1 }, () => corps).flat());
      const f3 = marcher(x, y, face, Array.from({ length: k }, () => [["av", a], [t === "d" ? "g" : "d"]] as Pas[]).flat());
      const q = quatrePoints(x, y, [j.x, j.y], [[f1.x, f1.y], [f2.x, f2.y], [f3.x, f3.y]], `Départ ${FL[face]}`);
      if (q.faux.length < 3) return null;
      return {
        text: `${Cap(S.n)} part du départ en regardant ${VERS[face]}. Programme : répéter ${k} fois « avancer de ${cases(a)}, tourner à ${t === "d" ? "droite" : "gauche"} ». ${un([
          `Sur quel point arrive-t-${il(S)} ?`,
          `Où s'arrête-t-${il(S)} ?`,
          `Quel point atteint-${il(S)} ?`,
        ])}`,
        ...qcm(q.juste, q.faux),
        explanation: etapes(
          `La boucle se fait ${k} fois, pas une seule : on déroule chaque tour.`,
          Array.from({ length: k }, (_, i) => {
            const d = marcher(x, y, face, Array.from({ length: i }, () => corps).flat()).face;
            return `tour ${i + 1} : ${cases(a)} ${VERS[d]}`;
          }).join(" ; ") + ".",
          `${Cap(il(S))} arrive sur ${q.juste}.`,
        ),
        canvas: grille(q.points),
      };
    }),
  ),
  // ★4 — beaucoup de quarts de tour.
  GF(6, 4, "Quatre quarts de tour ramènent à la direction de départ : enlève les paquets de 4.", () => {
    const S = un(SITS);
    const face = un(TOUR);
    const k = entre(5, 11);
    const sens = un(["droite", "gauche"] as const);
    let fin = face;
    for (let i = 0; i < k; i++) fin = tourne(fin, sens);
    let faux1 = face;
    for (let i = 0; i < k % 4 + 1; i++) faux1 = tourne(faux1, sens);
    return {
      text: `${Cap(S.n)} regarde ${VERS_CARD[face]}. Programme : répéter ${k} fois « tourner à ${sens} ». ${un([
        `Vers où regarde-t-${il(S)} à la fin ?`,
        "Quelle direction regarde-t-on à la fin ?",
        `Dans quelle direction ${S.n} s'arrête-t-${il(S)} ?`,
      ])}`,
      ...pieges(CARD[fin], [CARD[faux1], CARD[tourne(face, sens)], CARD[oppose(fin)]], TOUR.map((d) => CARD[d])),
      explanation: etapes(
        "4 quarts de tour = un tour complet : on revient à la même direction.",
        `${k} = ${Math.floor(k / 4)} × 4 + ${k % 4} : il reste ${k % 4} quart${k % 4 > 1 ? "s" : ""} de tour à ${sens}.`,
        `${Cap(il(S))} regarde ${VERS_CARD[fin]}.`,
      ),
      canvas: rose(face, S.mot),
    };
  }),
  // ★4 — boucle avancer/reculer puis un bloc final.
  GF(7, 4, "Un tour de boucle : avance − recule. Multiplie, puis ajoute le bloc final.", () => {
    const S = un(SITS);
    const a = lg(S.u) + (S.u === "cases" ? 1 : 0);
    const b = moinsQue(S.u, a);
    const k = entre(2, 4);
    const c = lg(S.u);
    const fin = k * (a - b) + c;
    return {
      text: `${Cap(S.n)} ${un(["se déplace sur une ligne droite.", "avance et recule tout droit.", "roule sur un couloir tout droit."])} ${un([
        `À combien de ${MOT_U[S.u]} du départ finit-${il(S)} ?`,
        `Où s'arrête-t-${il(S)}, par rapport au départ ?`,
        "À quelle distance du départ est-on à la fin ?",
      ])}`,
      ...qcmF(fin, [k * (a + b) + c, a - b + c, k * (a - b + c), k * a + c], (v) => uT(v, S.u)),
      explanation: etapes(
        "Un tour de boucle : on avance puis on recule. Le bloc sous la boucle se fait une seule fois.",
        `${k} × (${a} − ${b}) + ${c} = ${k * (a - b)} + ${c} = ${fin}.`,
        `${Cap(il(S))} finit à ${uT(fin, S.u)} du départ.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(a, S.u), reB(b, S.u)]), avB(c, S.u)]),
    };
  }),
  // ★4 — deux boucles l'une après l'autre.
  GF(8, 4, "Calcule chaque boucle séparément, puis additionne.", () => {
    const S = un(SITS);
    const k = entre(2, 5);
    const m = entre(2, 4);
    const a = lg(S.u);
    const b = lg(S.u);
    const tot = k * a + m * b;
    return {
      text: `${un([`Voici le programme ${duS(S)}.`, `${Cap(S.n)} suit ce programme.`, `On programme ${S.n} avec deux boucles.`])} ${un([
        `Quelle distance parcourt-${il(S)} en tout ?`,
        `De combien de ${MOT_U[S.u]} avance-t-${il(S)} au total ?`,
        `Combien de ${MOT_U[S.u]} fait-${il(S)} en tout ?`,
      ])}`,
      ...qcmF(tot, [(k + m) * (a + b), k * a + b, a + b, (k + m) * a], (v) => uT(v, S.u)),
      explanation: etapes(
        "Chaque boucle se calcule à part ; le virage entre les deux ne fait pas de distance.",
        `${k} × ${a} + ${m} × ${b} = ${k * a} + ${m * b} = ${tot}.`,
        `${Cap(il(S))} parcourt ${uT(tot, S.u)}.`,
      ),
      canvas: prog(Cap(S.n), [boucle(k, [avB(a, S.u)]), un([TD, TG]), boucle(m, [avB(b, S.u)])]),
    };
  }),
];

// ── EXPORT ────────────────────────────────────────────────────────────────────

export const algorithmiqueBank: TutorBankItemV4[] = [
  ...algoInstruction,
  ...GAB_INSTRUCTION,
  ...algoDeplacement,
  ...GAB_DEPLACEMENT,
  ...algoProgramme,
  ...GAB_PROGRAMME,
  ...algoRepetition,
  ...GAB_REPETITION,
  ...algoLogique,
  ...GAB_LOGIQUE,
  ...algoDefi,
  ...GAB_DEFI,
];



