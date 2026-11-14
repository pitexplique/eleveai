// lib/tutor-v4/questionBank/ce1/maths/algorithmique.bank.ts
//
// Les instructions et les déplacements codés du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) : « comprendre,
// utiliser et produire une suite d'instructions qui codent un déplacement en
// utilisant un vocabulaire spatial précis ». Le texte donne le vocabulaire du
// robot sur son tapis quadrillé : « avancer de deux cases », « pivoter d'un
// quart de tour à droite », « pivoter d'un quart de tour à gauche ». Au CE1,
// les déplacements à programmer comportent au maximum QUINZE instructions,
// dont quatre virages — au CP, c'était dix instructions et deux virages.
//
// LE PIÈGE DE LA NOTION : « pivoter » ne fait pas avancer. Un quart de tour
// change la direction, pas la position. L'élève qui compte les instructions
// croit avoir avancé de cinq cases alors qu'il n'en a fait que trois.
//
// Second piège, celui de la répétition : répéter trois fois « avancer de 2 »
// fait avancer de 6 cases, pas de 5 ni de 3.
//
// ⚠️ On privilégie les GÉNÉRATEURS : un programme dont on change les nombres
// pose une question neuve à chaque tirage.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, gab, prenom, qcm, qcmN, un } from "./geo-outils-ce1";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
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

const anciens: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ALGO_INSTRUCTION — suivre un programme
     LE piège : « pivoter » ne fait pas avancer.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_instruction_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Le robot suit ce programme. De combien de cases avance-t-il en tout ?",
    canvas: { kind: "scratch", title: "Le programme", blocks: [{ type: "event", text: "▶ départ" }, { type: "move", value: "2 cases" }, { type: "turn", text: "tourner d'un quart de tour à droite" }, { type: "move", value: "1 case" }], display: { compact: true } } as CanvasFigure,
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Pivoter change la direction, pas la position.",
    explanation: exp(
      "Dans un programme de déplacement, seules les instructions « avancer » font changer de case.",
      "On additionne uniquement les cases parcourues, sans compter les virages.",
      "Le robot avance de 2, puis pivote sur place — il ne bouge pas de case —, puis avance de 1 : 2 + 1 = 3 cases.",
      "Il s'est déplacé de 3 cases.",
    ),
    tags: ["ce1", "algorithmique", "instruction", "piege"],
  },
  {
    kind: "template",
    id: "ce1_algo_instruction_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    hint: "Ne compte que les « avancer ».",
    tags: ["ce1", "algorithmique", "instruction", "piege", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 4);
      const total = a + b + c;
      const virages = randomInt(1, 3);
      return {
        text: `Un robot reçoit ce programme : avancer de ${a}, pivoter d'un quart de tour, avancer de ${b}, pivoter d'un quart de tour, avancer de ${c}. De combien de cases s'est-il déplacé en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Seules les instructions « avancer » déplacent le robot d'une case à l'autre.",
          "On additionne les cases des instructions « avancer », et on ignore les pivots.",
          `${a} + ${b} + ${c} = ${total}. Les ${virages > 1 ? "deux pivots" : "pivots"} changent la direction, pas la position.`,
          `Il s'est déplacé de ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_instruction_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les instructions dans l'ordre, une par une.",
    tags: ["ce1", "algorithmique", "instruction", "template"],
    generate: () => {
      const depart = randomInt(1, 3);
      const avance = randomInt(2, 5);
      const recule = randomInt(1, avance);
      const arrivee = depart + avance - recule;
      return {
        text: `Un robot est sur la case ${depart}. Il reçoit : avancer de ${avance} cases, puis reculer de ${recule} case${recule > 1 ? "s" : ""}. Sur quelle case arrive-t-il ?`,
        format: "short",
        expected: [String(arrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Un programme s'exécute dans l'ordre : une instruction après l'autre.",
          "On part de la case de départ et on applique chaque instruction à la suite.",
          `${depart} + ${avance} = ${depart + avance}, puis ${depart + avance} - ${recule} = ${arrivee}.`,
          `Il arrive sur la case ${arrivee}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_DEPLACEMENT — écrire le programme
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_deplacement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Pour qu'un autre élève retrouve le même chemin, que doit contenir le programme qu'on lui écrit ?",
    format: "qcm",
    choices: [
      "les instructions dans l'ordre exact du déplacement",
      "seulement le point d'arrivée",
      "le nombre de cases, sans les virages",
      "une description de la salle",
    ],
    expected: ["les instructions dans l'ordre exact du déplacement"],
    comparator: "mcq_exact",
    hint: "Le robot ne devine rien : il exécute ce qui est écrit, dans l'ordre écrit.",
    explanation: exp(
      "Coder un déplacement, c'est écrire toutes les instructions, dans l'ordre où il faut les faire.",
      "On suit le chemin en écrivant chaque avancée et chaque virage au moment où ils arrivent.",
      "Si une instruction manque ou si l'ordre change, le chemin n'est plus le même. Le point d'arrivée seul ne dit pas par où passer.",
      "Il doit contenir les instructions dans l'ordre exact du déplacement.",
    ),
    tags: ["ce1", "algorithmique", "deplacement", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_algo_deplacement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les avancées et les virages séparément.",
    tags: ["ce1", "algorithmique", "deplacement", "template"],
    generate: () => {
      const avancees = randomInt(2, 5);
      const virages = randomInt(1, 4);
      const total = avancees + virages;
      const quoi = randomChoice(["instructions en tout", "virages", "instructions « avancer »"] as const);
      const bonne = quoi === "instructions en tout" ? total : quoi === "virages" ? virages : avancees;
      return {
        text: `Un programme contient ${avancees} instructions « avancer » et ${virages} instruction${virages > 1 ? "s" : ""} « pivoter ». Combien y a-t-il de ${quoi} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Un programme de déplacement mélange deux sortes d'instructions : avancer, et pivoter.",
          "On compte séparément chaque sorte, puis on répond à ce qui est demandé.",
          `Il y a ${avancees} « avancer » et ${virages} « pivoter », soit ${total} instructions en tout. Au CE1, un programme peut aller jusqu'à quinze instructions, dont quatre virages.`,
          `Il y en a ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_REPETITION — répéter un bloc
     LE piège : répéter 3 fois « avancer de 2 » fait 6, pas 5.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_repetition_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "Le robot répète 3 fois « avancer de 2 cases ». De combien de cases avance-t-il ?",
    canvas: { kind: "scratch", title: "Le programme", blocks: [{ type: "event", text: "▶ départ" }, { type: "repeat", times: 3, children: [{ type: "move", value: "2 cases" }] }], display: { compact: true } } as CanvasFigure,
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases, l'une après l'autre.",
    explanation: exp(
      "Répéter une instruction, c'est la refaire entièrement à chaque tour.",
      "On additionne autant de fois que le programme le demande.",
      "2 + 2 + 2 = 6, ou 3 × 2 = 6. Le robot avance de 6 cases, pas de 5 : le premier « avancer de 2 » compte lui aussi.",
      "Il avance de 6 cases.",
    ),
    tags: ["ce1", "algorithmique", "repetition", "piege"],
  },
  {
    kind: "template",
    id: "ce1_algo_repetition_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie ce qui est répété par le nombre de tours.",
    tags: ["ce1", "algorithmique", "repetition", "template"],
    generate: () => {
      const fois = randomInt(2, 6);
      const cases = randomInt(2, 5);
      const total = fois * cases;
      return {
        text: `Un robot répète ${fois} fois l'instruction « avancer de ${cases} cases ». De combien de cases avance-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Répéter une instruction, c'est la refaire en entier à chaque tour.",
          "On multiplie ce qui est répété par le nombre de tours.",
          `${fois} × ${cases} = ${total}. Chaque tour ajoute ${cases} cases, et il y a ${fois} tours.`,
          `Il avance de ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_repetition_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 5,
    theme: "neutral",
    hint: "Une répétition remplace plusieurs instructions écrites à la suite.",
    tags: ["ce1", "algorithmique", "repetition", "template"],
    generate: () => {
      const fois = randomInt(3, 6);
      const cases = randomInt(1, 4);
      return {
        text: `Un programme écrit « avancer de ${cases} » ${fois} fois de suite. Combien d'instructions économise-t-on en écrivant « répéter ${fois} fois : avancer de ${cases} » ?`,
        format: "short",
        expected: [String(fois - 1)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition sert à écrire une seule fois ce qu'on veut faire plusieurs fois.",
          "On compare le nombre de lignes des deux écritures.",
          `Sans répétition, il faut ${fois} lignes. Avec la répétition, il n'en reste qu'une : on en économise ${fois} - 1 = ${fois - 1}.`,
          `On économise ${fois - 1} instructions.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_DEFI — les défis
  ========================================================= */
  {
    kind: "template",
    id: "ce1_algo_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quatre quarts de tour font un tour complet.",
    tags: ["ce1", "algorithmique", "defi", "template"],
    generate: () => {
      const quarts = randomChoice([2, 3, 4] as const);
      const bonne =
        quarts === 4
          ? "il regarde de nouveau dans la même direction qu'au départ"
          : quarts === 2
            ? "il regarde dans la direction opposée"
            : "il regarde vers la gauche du départ";
      return {
        text: `Un robot pivote ${quarts} fois d'un quart de tour vers la droite, sans avancer. Où regarde-t-il à la fin ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il regarde de nouveau dans la même direction qu'au départ",
          "il regarde dans la direction opposée",
          "il regarde vers la gauche du départ",
          "il a avancé de plusieurs cases",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quart de tour change la direction du robot, mais pas sa case.",
          "On tourne pas à pas : quatre quarts de tour font un tour complet.",
          quarts === 4
            ? "Après quatre quarts de tour, le robot a fait un tour entier : il regarde exactement là où il regardait au départ."
            : quarts === 2
              ? "Deux quarts de tour font un demi-tour : le robot regarde dans la direction opposée."
              : "Trois quarts de tour vers la droite, c'est la même chose qu'un quart de tour vers la gauche.",
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais le tour du carré en comptant les côtés.",
    tags: ["ce1", "algorithmique", "defi", "template"],
    generate: () => {
      const cote = randomInt(2, 5);
      const total = cote * 4;
      const quoi = randomChoice(["cases", "virages"] as const);
      const bonne = quoi === "cases" ? total : 4;
      return {
        text: `Un robot fait le tour complet d'un carré de ${cote} cases de côté, en revenant à son point de départ. Combien de ${quoi} au total ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Faire le tour d'un carré, c'est parcourir ses quatre côtés et tourner à chaque coin.",
          "On compte séparément les cases parcourues et les virages.",
          `Le carré a 4 côtés de ${cote} cases : ${cote} × 4 = ${total} cases. Et il y a 4 coins, donc 4 virages.`,
          `Il y en a ${bonne}.`,
        ),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins.
   Mesuré ce jour-là : 2 à 7 squelettes par micro, 13 à 19 répétitions sur 20,
   et AUCUN dessin. Le programme se MONTRE maintenant en blocs (canvas
   `scratch`), et le chemin se lit sur un quadrillage fléché (canvas
   `reperage`). Le robot change : robot de la classe, coccinelle, petit train,
   tortue, Pic le paille-en-queue… Les items figés sont gardés ; les anciens
   gabarits sont remplacés (mêmes ids).
   ═════════════════════════════════════════════════════════════════════════ */

const NA = "algorithmique";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(NA, micro, id, d, hint, gen);
// ⭐ 14/11/2026 : des noms COURTS (« la voiture télécommandée » allongeait chaque énoncé).
const ROBOTS: [string, boolean][] = [["le robot Zip", false], ["la coccinelle", true], ["le petit train", false], ["la tortue", true], ["Pic", false], ["la fourmi", true], ["le robot-chien", false], ["la petite voiture", true], ["le robot Bip", false], ["la souris", true]];
/** Un robot, avec ses pronoms : r = son nom, il = « il »/« elle ». */
function robot() {
  const [r, f] = un(ROBOTS);
  return { r, il: f ? "elle" : "il", Il: f ? "Elle" : "Il" };
}
/** « de le robot » → « du robot ». */
const de = (r: string) => (r.startsWith("le ") ? "du " + r.slice(3) : "de " + r);
const cases = (n: number) => `${n} case${n > 1 ? "s" : ""}`;

type Bloc = { type: "event" | "move" | "turn" | "repeat"; text?: string; value?: string | number; times?: number; children?: Bloc[] };
const DEPART: Bloc = { type: "event", text: "▶ départ" };
const avance = (n: number): Bloc => ({ type: "move", value: cases(n) });
const recule = (n: number): Bloc => ({ type: "turn", text: `reculer de ${cases(n)}` });
const tourne = (sens: "droite" | "gauche"): Bloc => ({ type: "turn", text: `tourner d'un quart de tour à ${sens}` });
const programme = (blocs: Bloc[], titre = "Le programme"): CanvasFigure => ({ kind: "scratch", title: titre, blocks: [DEPART, ...blocs], display: { compact: true } }) as CanvasFigure;

/* ─────────────── ce1_algo_instruction ─────────────── */
const AI = "ce1_algo_instruction";

/** Le robot est sur une piste numérotée : avancer, reculer. */
function surLaPiste(ctx: boolean) {
  const { r, il, Il } = robot();
  const depart = entre(0, 5);
  const a = entre(2, 6);
  const b = entre(1, a - 1);
  const avecTroisieme = !ctx ? false : Math.random() < 0.5;
  const c = avecTroisieme ? entre(1, 4) : 0;
  const arrivee = depart + a - b + c;
  const blocs = [avance(a), recule(b), ...(avecTroisieme ? [avance(c)] : [])];
  const debut = ctx ? un([`${cap(r)} est sur la case ${depart} de la piste.`, `${cap(r)} part de la case ${depart}.`, `C'est la course ! ${cap(r)} est sur la case ${depart}.`]) : `${cap(r)} est sur la case ${depart}.`;
  return {
    text: `${debut} ${un([`Sur quelle case arrive-t-${il} ?`, `Où s'arrête-t-${il} ?`, "Quelle est sa case d'arrivée ?"])}`,
    ...qcmN(arrivee, [depart + a + b + c, arrivee + 1, arrivee - 1, a - b + c]),
    canvas: programme(blocs),
    explanation: etapes("on fait les instructions dans l'ordre, une par une.", `${depart} + ${a} = ${depart + a}, puis ${depart + a} − ${b} = ${depart + a - b}${avecTroisieme ? `, puis + ${c} = ${arrivee}` : ""}.`, `${Il} arrive sur la case ${arrivee}.`),
  };
}

/** Un programme avec des virages : combien de cases en tout ? combien d'instructions ? */
function lireProgramme() {
  const n = entre(2, 3);
  const pas = Array.from({ length: n }, () => entre(1, 5));
  const sens = Array.from({ length: n - 1 }, () => un(["droite", "gauche"] as const));
  const blocs: Bloc[] = [];
  pas.forEach((p, k) => {
    blocs.push(avance(p));
    if (k < n - 1) blocs.push(tourne(sens[k]));
  });
  const { r, il } = robot();
  const total = pas.reduce((a, b) => a + b, 0);
  const cas = un(["cases", "cases", "virages", "instructions"] as const);
  const juste = cas === "cases" ? total : cas === "virages" ? n - 1 : blocs.length;
  const q = cas === "cases" ? [`De combien de cases avance-t-${il} en tout ?`, `Combien de cases parcourt-${il} ?`] : cas === "virages" ? [`Combien de fois tourne-t-${il} ?`, `Combien de virages fait-${il} ?`] : ["Combien d'instructions y a-t-il après le départ ?", "Compte les instructions sous « départ »."];
  return {
    text: `${un([`Voici le programme ${de(r)}.`, `${prenom()} a écrit ce programme pour ${r}.`, `${cap(r)} suit ce programme.`])} ${un(q)}`,
    ...qcmN(juste, cas === "cases" ? [total + n - 1, total + 1, total - 1, blocs.length] : [juste + 1, juste - 1, total]),
    canvas: programme(blocs),
    explanation: etapes(cas === "cases" ? "on additionne les « avancer » ; tourner ne fait pas avancer." : "on lit les blocs un par un.", cas === "cases" ? `${pas.join(" + ")} = ${total}.` : `On compte : ${juste}.`, `La réponse : ${juste}.`),
  };
}

/* ─────────────── ce1_algo_deplacement (codage en flèches) ─────────────── */
const AD = "ce1_algo_deplacement";
type Dir = "haut" | "bas" | "gauche" | "droite";
const FL: Record<Dir, string> = { haut: "↑", bas: "↓", gauche: "←", droite: "→" };
const code = (pas: { direction: Dir; count: number }[]) => pas.map((p) => FL[p.direction].repeat(p.count)).join(" ");

function cheminFleche(nb: number) {
  for (;;) {
    let x = entre(1, 5); // x ≤ 5 : le nom écrit à droite du point ne sort pas du cadre
    let y = entre(1, 5);
    const start = { x, y };
    const steps: { direction: Dir; count: number }[] = [];
    let prec: Dir | "" = "";
    let ok = true;
    // Le chemin ne repasse jamais par un nœud déjà vu : sinon les flèches se
    // chevauchent et le dessin devient illisible.
    const vus = new Set([`${x},${y}`]);
    for (let k = 0; k < nb; k++) {
      const opp: Record<string, Dir> = { haut: "bas", bas: "haut", gauche: "droite", droite: "gauche" };
      const d = un((["haut", "bas", "gauche", "droite"] as Dir[]).filter((v) => v !== prec && v !== opp[prec as string]));
      const c = entre(2, 3); // une flèche d'une seule case est trop courte pour se lire
      x += d === "droite" ? c : d === "gauche" ? -c : 0;
      y += d === "haut" ? c : d === "bas" ? -c : 0;
      if (x < 1 || x > 5 || y < 1 || y > 5) ok = false;
      for (let p = 1; p <= c; p++) {
        const cle = `${x - (d === "droite" ? c - p : d === "gauche" ? p - c : 0)},${y - (d === "haut" ? c - p : d === "bas" ? p - c : 0)}`;
        if (vus.has(cle)) ok = false;
        vus.add(cle);
      }
      steps.push({ direction: d, count: c });
      prec = d;
    }
    const loin = Math.abs(x - start.x) + Math.abs(y - start.y) >= 3;
    if (ok && loin) return { start, steps, fin: { x, y } };
  }
}

function quelCode(nb: number) {
  const { start, steps, fin } = cheminFleche(nb);
  const h = un(["Pic", "Nina", "Téo", "Zoé", "Ravi", "le robot"]);
  const juste = code(steps);
  const inv: Record<Dir, Dir> = { haut: "bas", bas: "haut", gauche: "droite", droite: "gauche" };
  const faux = [
    code(steps.map((s, k) => (k === 0 ? { ...s, direction: inv[s.direction] } : s))),
    code(steps.map((s, k) => (k === steps.length - 1 ? { ...s, count: s.count + 1 } : s))),
    code(steps.map((s, k) => (k === 0 ? { ...s, count: s.count === 1 ? 2 : s.count - 1 } : s))),
    code([...steps].reverse()),
  ];
  return {
    text: `${un(["", "C'est le jeu du robot.", "On code un chemin.", "Direction le trésor !"])} ${un([`Quel code fait le chemin ${de(h)} ?`, `Quel code de flèches décrit ce chemin ?`, `${prenom()} veut coder ce chemin. Quel code choisir ?`])}`.trim(),
    ...qcm(juste, faux),
    canvas: { kind: "reperage", grid: { rows: 6, cols: 7 }, path: { start: { ...start, label: h }, steps, showArrows: true }, target: { ...fin, label: "★", hidden: false }, display: { showAxes: false, showCoordinates: false } } as CanvasFigure,
    explanation: etapes("une flèche = une case, dans le sens de la flèche.", steps.map((s) => `${cases(s.count)} ${s.direction === "haut" ? "vers le haut" : s.direction === "bas" ? "vers le bas" : s.direction === "gauche" ? "à gauche" : "à droite"}`).join(", puis ") + ".", `Le code : ${juste}.`),
  };
}

function combienDeFleches() {
  const { start, steps, fin } = cheminFleche(entre(2, 3));
  const n = steps.reduce((a, s) => a + s.count, 0);
  const [h, court] = un([["Pic", "Pic"], ["la tortue", "Tortue"], ["le robot", "Robot"], ["la fourmi", "Fourmi"], ["Nina", "Nina"], ["Téo", "Téo"]] as const);
  return {
    text: `${un([`${prenom()} code le chemin ${de(h)} avec des flèches.`, `On écrit le code du chemin ${de(h)}.`, `Pour aller à l'étoile, il faut coder le chemin.`])} ${un(["Combien de flèches faut-il ?", "Combien de flèches en tout ?"])}`,
    ...qcmN(n, [steps.length, n + 1, n - 1]),
    canvas: { kind: "reperage", grid: { rows: 6, cols: 7 }, path: { start: { ...start, label: court }, steps, showArrows: true }, target: { ...fin, label: "★", hidden: false }, display: { showAxes: false, showCoordinates: false } } as CanvasFigure,
    explanation: etapes("une flèche par case parcourue.", steps.map((s) => s.count).join(" + ") + ` = ${n}.`, `Il faut ${n} flèches.`),
  };
}

/* ─────────────── ce1_algo_repetition ─────────────── */
const AR = "ce1_algo_repetition";

function repeterAvancer(avecFin: boolean) {
  const fois = entre(2, 5);
  const a = entre(2, 5);
  const b = avecFin ? entre(1, 4) : 0;
  const n = fois * a + b;
  const { r, il } = robot();
  const blocs: Bloc[] = [{ type: "repeat", times: fois, children: [avance(a)] }, ...(avecFin ? [avance(b)] : [])];
  return {
    text: `${un([`Voici le programme ${de(r)}.`, `${prenom()} programme ${r}.`, `${cap(r)} part de la case 0.`])} ${un([`De combien de cases avance-t-${il} en tout ?`, `Combien de cases parcourt-${il} ?`, `Sur quelle case arrive-t-${il} ?`])}`,
    ...qcmN(n, [fois + a + b, a + b, n + a, n - a]),
    canvas: programme(blocs),
    explanation: etapes("« répéter » fait la même chose plusieurs fois.", `${Array.from({ length: fois }, () => a).join(" + ")} = ${fois * a}${avecFin ? `, puis + ${b} = ${n}` : ""}.`, `${n} cases.`),
  };
}

function figureTracee() {
  const cote = entre(2, 5);
  const cas = un(["carre", "aller_retour", "escalier"] as const);
  const { r, il, Il } = robot();
  if (cas === "carre") {
    return {
      text: `${cap(r)} laisse une trace en roulant. ${un([`Quelle figure dessine-t-${il} ?`, "Quelle forme trace ce programme ?"])}`,
      ...qcm("un carré", ["un triangle", "un trait droit", "un rectangle très long"]),
      canvas: programme([{ type: "repeat", times: 4, children: [avance(cote), tourne("droite")] }]),
      explanation: etapes("on suit la boucle 4 fois.", `4 côtés de ${cases(cote)}, et 4 quarts de tour : ${il} revient au départ.`, "C'est un carré."),
    };
  }
  if (cas === "aller_retour") {
    const fois = entre(2, 4);
    return {
      text: `${cap(r)} est sur la case 0. ${un([`Où est-${il} à la fin ?`, `Sur quelle case finit-${il} ?`])}`,
      ...qcm("sur la case 0", [`sur la case ${cote}`, `sur la case ${2 * cote}`, `sur la case ${fois * cote}`]),
      canvas: programme([{ type: "repeat", times: fois, children: [avance(cote), recule(cote)] }]),
      explanation: etapes(`à chaque tour, ${il} avance puis recule d'autant.`, `+${cote} puis −${cote} : ${il} revient sur 0, ${fois} fois.`, `${Il} finit sur la case 0.`),
    };
  }
  const fois = entre(2, 4);
  return {
    text: `${cap(r)} monte un escalier. ${un([`De combien de cases avance-t-${il} en tout ?`, `Combien de cases parcourt-${il} ?`])}`,
    ...qcmN(fois * 2, [fois, fois * 2 + 1, fois + 2]),
    canvas: programme([{ type: "repeat", times: fois, children: [avance(1), tourne("gauche"), avance(1), tourne("droite")] }]),
    explanation: etapes(`dans la boucle, ${il} avance 2 fois d'une case.`, `${fois} fois 2 cases = ${fois * 2} cases.`, `${fois * 2} cases.`),
  };
}

/** Écrire plus court avec « répéter » : combien de fois ? */
function combienDeFois() {
  const a = entre(2, 4);
  const fois = entre(3, 6);
  return {
    text: `${prenom()} a écrit ${fois} fois « avancer de ${cases(a)} ». ${un(["Avec « répéter », combien de fois faut-il répéter ?", "Quel nombre écrire dans « répéter … fois » ?"])}`,
    ...qcmN(fois, [a, fois * a, fois - 1, fois + 1]),
    canvas: programme(Array.from({ length: fois }, () => avance(a)), "Le programme long"),
    explanation: etapes("« répéter » remplace des blocs identiques mis à la suite.", `Il y a ${fois} blocs pareils.`, `Répéter ${fois} fois : avancer de ${cases(a)}.`),
  };
}

/* ─────────────── ce1_algo_defi ─────────────── */
const AF = "ce1_algo_defi";

function nombreManquant() {
  const depart = entre(0, 4);
  const a = entre(2, 5);
  const x = entre(1, 5);
  const cible = depart + a + x;
  const { r } = robot();
  return {
    text: `Défi ! ${cap(r)} va de la case ${depart} à ${cible}. ${un(["Quel nombre manque dans le programme ?", "Que mettre à la place de « ? » ?"])}`,
    ...qcmN(x, [cible - depart, cible, x + 1, x - 1]),
    canvas: programme([avance(a), { type: "move", value: "? cases" }]),
    explanation: etapes("on calcule sa case après le premier bloc.", `${depart} + ${a} = ${depart + a}. De ${depart + a} à ${cible}, il manque ${x}.`, `Il faut écrire ${x}.`),
  };
}

function ouRegarde() {
  const sens = un(["droite", "gauche"] as const);
  const n = entre(1, 4);
  const net = sens === "droite" ? n % 4 : (4 - (n % 4)) % 4;
  const reponses = ["vers le haut, comme au départ", "vers la droite", "vers le bas", "vers la gauche"];
  const juste = reponses[net];
  const { r, il, Il } = robot();
  return {
    text: `Défi ! ${cap(r)} regarde vers le haut. ${un([`Vers où regarde-t-${il} à la fin ?`, `Vers où est-${il} tourné${il === "elle" ? "e" : ""} à la fin ?`])}`,
    ...qcm(juste, reponses.filter((x) => x !== juste)),
    canvas: programme(n > 1 ? [{ type: "repeat", times: n, children: [tourne(sens)] }] : [tourne(sens)]),
    explanation: etapes("un quart de tour à droite : haut → droite → bas → gauche → haut.", `${n} quart${n > 1 ? "s" : ""} de tour à ${sens}.`, `${Il} regarde ${juste}.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(AI, "ce1_algo_instruction_tpl_1", 4, "Tourner ne fait pas avancer.", () => (Math.random() < 0.5 ? lireProgramme() : surLaPiste(true))),
  g(AI, "ce1_algo_instruction_tpl_2", 3, "Fais les instructions dans l'ordre.", () => surLaPiste(false)),
  g(AI, "ce1_algo_instruction_tpl_3", 3, "Lis les blocs un par un.", () => lireProgramme()),

  g(AD, "ce1_algo_deplacement_tpl_1", 4, "Une flèche = une case.", () => (Math.random() < 0.6 ? quelCode(3) : combienDeFleches())),
  g(AD, "ce1_algo_deplacement_tpl_2", 3, "Une flèche = une case, dans le sens de la flèche.", () => (Math.random() < 0.6 ? quelCode(2) : combienDeFleches())),

  g(AR, "ce1_algo_repetition_tpl_1", 4, "« Répéter 3 fois », c'est faire 3 fois la même chose.", () => (Math.random() < 0.6 ? repeterAvancer(false) : combienDeFois())),
  g(AR, "ce1_algo_repetition_tpl_2", 5, "Suis la boucle, tour après tour.", () => (Math.random() < 0.5 ? repeterAvancer(true) : figureTracee())),
  g(AR, "ce1_algo_repetition_tpl_3", 4, "« Répéter » remplace des blocs pareils.", () => combienDeFois()),

  g(AF, "ce1_algo_defi_tpl_1", 5, "Un quart de tour à droite : haut, droite, bas, gauche.", () => ouRegarde()),
  g(AF, "ce1_algo_defi_tpl_2", 5, "Calcule où il est après le premier bloc.", () => (Math.random() < 0.5 ? nombreManquant() : figureTracee())),
];

export const algorithmiqueBank: TutorBankItemV4[] = [...anciens.filter((i) => i.kind !== "template"), ...nouveaux];
