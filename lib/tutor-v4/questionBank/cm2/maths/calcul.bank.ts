// lib/tutor-v4/questionBank/cm2/maths/calcul.bank.ts
//
// Le CALCUL du CM2 : calcul mental, addition et soustraction posées,
// décimaux, priorités, défis. ⭐ 14/11/2026 — réécrites en GÉNÉRATEURS (bloc
// « GÉNÉRATEURS ET DESSINS » plus bas). Les items figés justes sont gardés
// (leurs id aussi) ; les gabarits figés sur cinq paires de nombres, les
// « open » et le défi à la Réunion une fois sur deux sont partis.

import type {
  CalculPoseCanvasData,
  CanvasFigure,
  SchemaBarreCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { atelier, cap, entre, etapes, fr, melange, qcm, un } from "../../cm1/maths/trous-outils";

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function calculPoseCanvas(data: {
  operation: "addition" | "soustraction" | "multiplication" | "division";
  numbers: Array<number | string>;
  result?: number | string;
  retenues?: string[];
  questionLabel?: string;
  title?: string;
  display?: {
    showResult?: boolean;
    showRetenues?: boolean;
    compact?: boolean;
  };
}) {
  return {
    kind: "calcul_pose" as const,
    operation: data.operation,
    title: data.title,
    numbers: data.numbers.map(String),
    result: data.result !== undefined ? String(data.result) : undefined,
    retenues: data.retenues,
    questionLabel: data.questionLabel,
    display: {
      showResult: data.display?.showResult ?? false,
      showRetenues: data.display?.showRetenues ?? false,
      compact: data.display?.compact ?? false,
    },
  };
}

/* ═════ Les items figés justes, gardés tels quels (leurs id aussi). ═════ */

const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_1_double",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 25 + 25.",
    format: "qcm",
    choices: ["50", "40", "55", "100"],
    expected: ["50"],
    comparator: "mcq_exact",
    hint: "25 + 25, c’est le double de 25.",
    explanation: exp(
      "Calculer mentalement, c’est utiliser une stratégie simple sans poser l’opération.",
      "On peut reconnaître un double.",
      "25 + 25 = 50.",
      "Le résultat est 50."
    ),
    tags: ["cm2", "calcul", "mental", "double", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_2_complement_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 37 pour obtenir 100 ?",
    format: "qcm",
    choices: ["63", "73", "53", "67"],
    expected: ["63"],
    comparator: "mcq_exact",
    hint: "Cherche le complément à 100.",
    explanation: exp(
      "Un complément permet d’atteindre un nombre cible.",
      "Pour aller de 37 à 100, on calcule 100 - 37.",
      "100 - 37 = 63.",
      "Il faut ajouter 63."
    ),
    tags: ["cm2", "calcul", "mental", "complement", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_mental_fixed_3_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : 48 + 25 = 63. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Ajoute 20 puis 5.",
    explanation: exp(
      "Pour calculer mentalement, on peut décomposer un nombre.",
      "On ajoute 20 puis 5.",
      "48 + 20 = 68, puis 68 + 5 = 73.",
      "L’élève a tort : 48 + 25 = 73."
    ),
    tags: ["cm2", "calcul", "mental", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_addition_posee_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 245 + 132.",
    format: "qcm",
    choices: ["377", "367", "387", "113"],
    expected: ["377"],
    comparator: "mcq_exact",
    hint: "Additionne les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une addition posée permet d’additionner des nombres en alignant les chiffres par rang.",
      "On additionne les unités, les dizaines, puis les centaines.",
      "245 + 132 = 377.",
      "Le résultat est 377."
    ),
    tags: ["cm2", "calcul", "addition_posee", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "addition",
      numbers: [245, 132],
      result: 377,
      title: "Addition posée",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_calcul_addition_posee_fixed_2_erreur_alignement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Pour poser 45 + 203, faut-il aligner les unités sous les unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les chiffres doivent être alignés par rang.",
    explanation: exp(
      "Dans une addition posée, les chiffres sont alignés selon leur rang.",
      "Les unités se placent sous les unités, les dizaines sous les dizaines.",
      "Dans 45 + 203, le 5 et le 3 sont dans la colonne des unités.",
      "Oui, il faut aligner les unités sous les unités."
    ),
    tags: ["cm2", "calcul", "addition_posee", "alignement", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_soustraction_posee_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 586 - 243.",
    format: "qcm",
    choices: ["343", "333", "353", "829"],
    expected: ["343"],
    comparator: "mcq_exact",
    hint: "Soustrais colonne par colonne.",
    explanation: exp(
      "Une soustraction posée permet de calculer une différence.",
      "On aligne les chiffres par rang et on soustrait colonne par colonne.",
      "586 - 243 = 343.",
      "Le résultat est 343."
    ),
    tags: ["cm2", "calcul", "soustraction_posee", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "soustraction",
      numbers: [586, 243],
      result: 343,
      title: "Soustraction posée",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_calcul_soustraction_posee_fixed_2_erreur_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 352 - 187 en faisant parfois le plus grand chiffre moins le plus petit dans chaque colonne. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans une soustraction, l’ordre des nombres est important.",
    explanation: exp(
      "Dans une soustraction, on ne peut pas changer l’ordre des chiffres colonne par colonne.",
      "On doit respecter le nombre du haut et utiliser une retenue si nécessaire.",
      "Pour 352 - 187, on ne fait pas 7 - 2 dans la colonne des unités.",
      "La méthode de l’élève est incorrecte."
    ),
    tags: ["cm2", "calcul", "soustraction_posee", "erreur", "retenue", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_addition_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 3,4 + 2,5.",
    format: "qcm",
    choices: ["5,9", "5,8", "6,9", "3,65"],
    expected: ["5,9"],
    comparator: "mcq_exact",
    hint: "Additionne les dixièmes avec les dixièmes.",
    explanation: exp(
      "Pour additionner des nombres décimaux, on aligne les virgules.",
      "On additionne les unités avec les unités et les dixièmes avec les dixièmes.",
      "3,4 + 2,5 = 5,9.",
      "Le résultat est 5,9."
    ),
    tags: ["cm2", "calcul", "decimal", "addition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_addition_fixed_2_erreur_virgule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 4,5 + 2,35 en alignant les nombres à droite sans aligner les virgules. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour les décimaux, il faut aligner les virgules.",
    explanation: exp(
      "Dans une addition décimale, les chiffres doivent être alignés par rang.",
      "On aligne les virgules pour mettre unités sous unités, dixièmes sous dixièmes.",
      "4,5 peut s’écrire 4,50. Donc 4,50 + 2,35 = 6,85.",
      "Il faut aligner les virgules."
    ),
    tags: ["cm2", "calcul", "decimal", "addition", "erreur", "virgule", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_soustraction_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7,8 - 2,3.",
    format: "qcm",
    choices: ["5,5", "5,3", "4,5", "10,1"],
    expected: ["5,5"],
    comparator: "mcq_exact",
    hint: "Soustrais les dixièmes avec les dixièmes.",
    explanation: exp(
      "Pour soustraire des décimaux, on aligne les virgules.",
      "On soustrait les chiffres de même rang.",
      "7,8 - 2,3 = 5,5.",
      "Le résultat est 5,5."
    ),
    tags: ["cm2", "calcul", "decimal", "soustraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_decimal_soustraction_fixed_2_erreur_virgule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer 8 - 2,35, peut-on écrire 8 comme 8,00 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ajouter des zéros après la virgule ne change pas la valeur.",
    explanation: exp(
      "Un nombre décimal peut avoir plusieurs écritures égales.",
      "On peut ajouter des zéros après la virgule pour aligner les rangs.",
      "8 = 8,0 = 8,00.",
      "Oui, on peut écrire 8 comme 8,00."
    ),
    tags: ["cm2", "calcul", "decimal", "soustraction", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_priorite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 4 + 3 × 5.",
    format: "qcm",
    choices: ["19", "35", "20", "17"],
    expected: ["19"],
    comparator: "mcq_exact",
    hint: "La multiplication se fait avant l’addition.",
    explanation: exp(
      "Les priorités opératoires indiquent l’ordre des calculs.",
      "On effectue la multiplication avant l’addition.",
      "3 × 5 = 15, puis 4 + 15 = 19.",
      "Le résultat est 19."
    ),
    tags: ["cm2", "calcul", "priorite", "multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_priorite_fixed_2_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 2 + 5 × 4 en faisant d’abord 2 + 5. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La multiplication est prioritaire.",
    explanation: exp(
      "Les priorités opératoires donnent l’ordre des calculs.",
      "Sans parenthèses, on fait d’abord la multiplication.",
      "5 × 4 = 20, puis 2 + 20 = 22.",
      "L’élève a tort."
    ),
    tags: ["cm2", "calcul", "priorite", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_defi_fixed_1_probleme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Lina achète 3 cahiers à 4 € chacun et un stylo à 2 €. Combien paie-t-elle au total ?",
    format: "qcm",
    choices: ["14 €", "12 €", "10 €", "18 €"],
    expected: ["14 €"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord le prix des 3 cahiers.",
    explanation: exp(
      "Un défi de calcul peut demander plusieurs étapes.",
      "On calcule d’abord le prix des cahiers, puis on ajoute le stylo.",
      "3 × 4 = 12, puis 12 + 2 = 14.",
      "Lina paie 14 €."
    ),
    tags: ["cm2", "calcul", "defi", "probleme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_calcul_defi_fixed_2_priorite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule : 100 - (4 × 8 + 12).",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Calcule d’abord la parenthèse.",
    explanation: exp(
      "Un défi de calcul peut utiliser les priorités opératoires.",
      "On calcule d’abord dans la parenthèse, puis on soustrait.",
      "4 × 8 = 32, puis 32 + 12 = 44. Enfin 100 - 44 = 56.",
      "Le résultat est 56."
    ),
    tags: ["cm2", "calcul", "defi", "priorite", "parentheses"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS (micros sans vidéo), sur le modèle
   du CM1 (cm1/maths/calcul.bank.ts, commit 48966de5), au niveau CM2 :
   nombres jusqu'aux centaines de mille, décimaux jusqu'aux millièmes,
   priorités avec parenthèses, défis en plusieurs étapes.
   Avant : 2 à 5 squelettes par micro, 16 à 19 répétitions sur 20, des
   gabarits figés sur cinq paires de nombres, des « open », un défi à la
   Réunion une fois sur deux, et le résultat écrit sous l'opération posée.
   Chaque gabarit tire une SITUATION (métiers, sport, cuisine, jardin, jeux…)
   × une TOURNURE × des nombres, et pose sa figure : l'opération posée
   (`calcul_pose`, résultat caché) ou le schéma en barres (`schema_barre`).
   ⛔ CM2 = zéro clavier : que des QCM. Les leurres sont les VRAIES erreurs
   d'élève, calculées : retenue oubliée, somme d'une colonne écrite en
   entier, petit chiffre ôté du grand, virgules mal alignées, parties
   entières et décimales additionnées à part, calcul de gauche à droite.
   ⛔ Division : « ÷ ». La Réunion : une situation sur ~25, pas plus.
   ═══════════════════════════════════════════════════════════════════════ */

type Q = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Mila", "Anaïs", "Yasmine"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam", "Nathan"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
type Metier = readonly [string, string];
/** Un prénom, et souvent son métier : « Nina, boulangère, ». */
function perso(metier?: Metier, sauf?: string): Perso {
  const f = Math.random() < 0.5;
  const nom = un((f ? NOMS_F : NOMS_M).filter((n) => n !== sauf));
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}
const VOY = /^[aeiouéèêàâîôûœh]/i;
const de = (mot: string) => (VOY.test(mot) ? `d'${mot}` : `de ${mot}`);
const que = (mot: string) => (VOY.test(mot) ? `qu'${mot}` : `que ${mot}`);
const avec = (u?: string) => (v: number) => (u ? `${fr(v)} ${u}` : fr(v));
/** « 3,80 € », « 12 € ». */
function euro(v: number): string {
  const c = Math.round(v * 100);
  return c % 100 === 0 ? `${fr(c / 100)} €` : `${fr(Math.floor(c / 100))},${String(c % 100).padStart(2, "0")} €`;
}

/** QCM de nombres : d'abord les vraies erreurs, puis des voisins (± pas) s'il en manque. */
function qcmF(juste: number, erreurs: number[], ecr: (v: number) => string, pas: number, voisins: number[] = []) {
  const arr = (v: number) => Math.round(v * 1000) / 1000;
  const J = arr(juste);
  const vals: number[] = [];
  const pousse = (v: number) => {
    const a = arr(v);
    if (a > 0 && a !== J && !vals.includes(a) && ecr(a) !== ecr(J) && vals.length < 3) vals.push(a);
  };
  for (const v of melange(erreurs.filter((x) => Number.isFinite(x)))) pousse(v);
  for (const v of melange(voisins)) pousse(v);
  for (let k = 1; vals.length < 3 && k < 40; k++) {
    pousse(J + k * pas);
    pousse(J - k * pas);
  }
  return qcm(ecr(J), vals.map(ecr));
}

const CALCULE = (x: string) => [
  `Calcule ${x}.`,
  `Effectue ${x}.`,
  `Combien fait ${x} ?`,
  `Quel est le résultat de ${x} ?`,
  `Que vaut ${x} ?`,
  `Trouve le résultat de ${x}.`,
  `${x} = ?`,
  `Complète : ${x} = …`,
];
const phrase = (...morceaux: string[]) => morceaux.filter(Boolean).join(" ");
const REGARDE = ["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?", "Est-ce juste ?"];

/* ───────── Chiffres : les vraies erreurs, calculées ───────── */

/** Les chiffres, unités d'abord. */
const rangs = (n: number) => String(Math.round(n)).split("").reverse().map(Number);
const RANGS = ["unités", "dizaines", "centaines", "milliers", "dizaines de mille", "centaines de mille", "millions"];

function nbRetenuesAdd(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let c = 0;
  let k = 0;
  for (let i = 0; i < L; i++) {
    const s = D.reduce((t, d) => t + (d[i] ?? 0), 0) + c;
    c = Math.floor(s / 10);
    if (c && i < L - 1) k++;
  }
  return k;
}
/** Retenue oubliée : chaque colonne garde son chiffre des unités, la dernière écrit tout. */
function addSansRetenue(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let v = 0;
  for (let i = 0; i < L; i++) {
    const s = D.reduce((t, d) => t + (d[i] ?? 0), 0);
    v += (i === L - 1 ? s : s % 10) * 10 ** i;
  }
  return v;
}
/** Chaque colonne écrit sa somme EN ENTIER : 8 + 6 → « 14 » sous les unités. */
function addToutEcrit(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let t = "";
  for (let i = L - 1; i >= 0; i--) t += String(D.reduce((s, d) => s + (d[i] ?? 0), 0));
  return Number(t);
}
function detailAdd(nums: number[]): string {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let c = 0;
  const out: string[] = [];
  for (let i = 0; i < L; i++) {
    const ch = D.filter((d) => d[i] !== undefined).map((d) => d[i]);
    const s = ch.reduce((t, x) => t + x, 0) + c;
    const expr = [...ch.map(String), ...(c ? [`${c} de retenue`] : [])].join(" + ");
    if (i < L - 1 && s >= 10) out.push(`${RANGS[i]} : ${expr} = ${s}, j'écris ${s % 10} et je retiens ${Math.floor(s / 10)}`);
    else out.push(`${RANGS[i]} : ${expr} = ${s}`);
    c = Math.floor(s / 10);
  }
  return `${cap(out.join(" ; "))}.`;
}

function nbRetenuesSub(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  let c = 0;
  let k = 0;
  for (let i = 0; i < A.length; i++) {
    const bas = (B[i] ?? 0) + c;
    c = A[i] < bas ? 1 : 0;
    k += c;
  }
  return k;
}
/** Le petit chiffre ôté du grand, colonne par colonne : 452 − 178 → 334. */
function subPetitDuGrand(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  return A.reduce((v, x, i) => v + Math.abs(x - (B[i] ?? 0)) * 10 ** i, 0);
}
/** On ajoute la dizaine en haut… et on oublie de retenir 1 en bas. */
function subSansRetenue(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  return A.reduce((v, x, i) => v + ((x - (B[i] ?? 0) + 10) % 10) * 10 ** i, 0);
}

/** Tire jusqu'à ce que la condition tienne. */
function tirer<T>(f: () => T, ok: (t: T) => boolean, essais = 800): T {
  let t = f();
  for (let i = 0; i < essais && !ok(t); i++) t = f();
  return t;
}

/* ───────── Décimaux : tout se compte en MILLIÈMES ───────── */

/** Nombre de décimales utiles d'un nombre donné en millièmes. */
const decimales = (c: number) => (c % 1000 === 0 ? 0 : c % 100 === 0 ? 1 : c % 10 === 0 ? 2 : 3);
/** Écriture française d'un nombre en millièmes : « 12,45 ». */
const frM = (c: number) => fr(c / 1000);
/** Écriture POSÉE à p décimales, zéros ajoutés : « 12,450 ». */
function poseM(c: number, p: number): string {
  if (p === 0) return String(Math.round(c / 1000));
  const x = Math.round(c / 10 ** (3 - p));
  const s = String(x).padStart(p + 1, "0");
  return `${s.slice(0, -p)},${s.slice(-p)}`;
}
const enEntiers = (c: number, p: number) => Math.round(c / 10 ** (3 - p));
const deEntiers = (x: number, p: number) => x * 10 ** (3 - p);
/** Chiffres sans la virgule, alignés à droite : virgules mal alignées. */
function malAligne(ca: number, cb: number, op: 1 | -1): number {
  const pa = decimales(ca);
  const pb = decimales(cb);
  const xa = enEntiers(ca, pa);
  const xb = enEntiers(cb, pb);
  const p = Math.max(pa, pb);
  return Math.round(((xa + op * xb) / 10 ** p) * 1000);
}
/** Parties entières ensemble, parties décimales ensemble, sans retenue : 4,7 + 3,5 → « 7,12 ». */
function partsSeparees(ca: number, cb: number): number | null {
  const p = Math.max(decimales(ca), decimales(cb));
  if (p === 0) return null;
  const q = 10 ** (3 - p);
  const ea = Math.floor(ca / 1000);
  const eb = Math.floor(cb / 1000);
  const da = Math.round((ca % 1000) / q);
  const db = Math.round((cb % 1000) / q);
  const sd = da + db;
  if (sd < 10 ** p) return null;
  return Math.round((ea + eb) * 1000 + (sd / 10 ** String(sd).length) * 1000);
}
/** Un décimal en millièmes, à d décimales exactement, entre min et max (en unités). */
function decimal(min: number, max: number, d: 0 | 1 | 2 | 3): number {
  return tirer(() => {
    const q = 10 ** (3 - d);
    return Math.round(entre(min * 1000, max * 1000) / q) * q;
  }, (c) => decimales(c) === d && c > 0);
}
/** Écritures d'une opération sur deux décimaux (en millièmes). */
function opDec(ca: number, cb: number, op: 1 | -1) {
  const p = Math.max(decimales(ca), decimales(cb));
  const r = ca + op * cb;
  const A = enEntiers(ca, p);
  const B = enEntiers(cb, p);
  const leurres = [
    op === 1 ? deEntiers(addSansRetenue([A, B]), p) : deEntiers(subSansRetenue(A, B), p),
    ...(op === -1 ? [deEntiers(subPetitDuGrand(A, B), p)] : []),
    ...(decimales(ca) !== decimales(cb) ? [malAligne(ca, cb, op)] : []),
    ...(op === 1 ? [partsSeparees(ca, cb) ?? NaN] : []),
  ].filter((v) => Number.isFinite(v) && v > 0 && v !== r);
  return { p, r, leurres, poses: [poseM(ca, p), poseM(cb, p)] };
}
const expDec = (ca: number, cb: number, op: 1 | -1) => {
  const { p, r, poses } = opDec(ca, cb, op);
  const s = op === 1 ? "+" : "−";
  return etapes(
    "on aligne les virgules (unités sous unités, dixièmes sous dixièmes, centièmes sous centièmes), on complète par des zéros, on calcule comme avec des entiers, puis on place la virgule du résultat sous les autres.",
    `${poses[0]} ${s} ${poses[1]} = ${poseM(r, p)}.`,
    `${frM(ca)} ${s} ${frM(cb)} = ${frM(r)}.`,
  );
};
const pasDe = (c: number) => [1, 0.1, 0.01, 0.001][decimales(c)];

/* ───────── Les dessins ───────── */

const TITRE_POSE = { addition: "Addition posée", soustraction: "Soustraction posée" } as const;
function pose(op: "addition" | "soustraction", nombres: string[], o: { resultat?: string; label?: string; col?: number } = {}): CalculPoseCanvasData {
  return {
    kind: "calcul_pose",
    operation: op,
    title: TITRE_POSE[op],
    numbers: nombres.map((s) => s.replace(/\s/g, "")),
    ...(o.resultat ? { result: o.resultat.replace(/\s/g, "") } : {}),
    ...(o.label ? { questionLabel: o.label } : {}),
    ...(o.col !== undefined ? { highlight: { col: o.col } } : {}),
    display: { showResult: !!o.resultat, showRetenues: false },
  };
}
type Part = { label: string; value?: string; unknown?: boolean };
function barre(parts: Part[], total: string, label?: string, etiquettes = parts.length <= 4): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    ...(label ? { questionLabel: label } : {}),
    display: { showTotal: true, showPartLabels: etiquettes, showValues: true, showQuestion: !!label },
  };
}
/** Un énoncé en euros dont les choix sont des nombres nus : l'unité dans chaque choix. */
function euroSiBesoin(q: Q): Q {
  if (q.format !== "qcm" || !/€/.test(q.text) || !q.choices?.every((c) => /^\d[\d\s]*(,\d+)?$/.test(c))) return q;
  const e = (c: string) => `${c} €`;
  return { ...q, choices: q.choices.map(e), expected: q.expected.map(e) };
}
function avecEuros(fab: ReturnType<typeof atelier>): ReturnType<typeof atelier> {
  return (n, difficulty, hint, generate) => fab(n, difficulty, hint, () => euroSiBesoin(generate()));
}
const fois = (k: number, v: string, label = ""): Part[] => Array.from({ length: k }, () => ({ label, value: v }));
const inconnu = (label = ""): Part => ({ label, unknown: true });
const val = (v: number | string, label = ""): Part => ({ label, value: typeof v === "number" ? fr(v) : v });

/* ═════════════════════ CALCUL MENTAL (★1 ★2 ★3) ═════════════════════ */

const MEN = avecEuros(atelier("cm2", "calcul", "calcul_mental", "cm2_"));
const DE_TETE = ["De tête :", "Sans poser l'opération :", "Calcul mental :", "Dans ta tête :", ""];
const tete = (x: string) =>
  phrase(un(DE_TETE), un([`calcule ${x}.`, `combien fait ${x} ?`, `que vaut ${x} ?`, `${x} = ?`, `trouve ${x}.`])).replace(/^([a-zé])/, (c) => c.toUpperCase());

/** Le double oublie sa retenue ; la moitié chiffre par chiffre ; le complément « chaque chiffre à 10 ». */
const doubleSansRetenue = (n: number) => rangs(n).reduce((v, x, i) => v + ((2 * x) % 10) * 10 ** i, 0);
const moitieChiffres = (n: number) => rangs(n).reduce((v, x, i) => v + Math.floor(x / 2) * 10 ** i, 0);
const complementChiffres = (n: number, cible: number) => {
  const R = rangs(n);
  const L = String(cible).length - 1;
  let v = 0;
  for (let i = 0; i < L; i++) v += (10 - (R[i] ?? 0)) % 10 * 10 ** i;
  return v || cible - n + 10;
};

type SitDouble = { u?: string; phr: (p: Perso, n: string) => string };
const SIT_DOUBLE: readonly SitDouble[] = [
  { phr: (p, n) => `${p.nom} a ${n} abonnés. Sa cousine en a deux fois plus. Combien d'abonnés a sa cousine ?` },
  { phr: (_p, n) => `Un carton contient ${n} crayons. Combien de crayons dans deux cartons ?` },
  { u: "m", phr: (p, n) => `${p.nom} marche ${n} jusqu'au gymnase, puis autant pour revenir. Quelle distance en tout ?` },
  { u: "g", phr: (p, n) => `Une recette demande ${n} de farine. ${p.nom} la prépare en double. Combien de farine faut-il ?` },
  { phr: (p, n) => `Au premier niveau, ${p.nom} marque ${n} points ; au second, deux fois plus. Combien marque-t-${p.il} au second ?` },
  { u: "€", phr: (_p, n) => `Une trottinette coûte ${n}. Combien coûtent deux trottinettes identiques ?` },
  { phr: (_p, n) => `Une école compte ${n} élèves ; sa voisine en compte deux fois plus. Combien d'élèves dans l'école voisine ?` },
  { u: "km", phr: (_p, n) => `Un chauffeur routier roule ${n} à l'aller et autant au retour. Combien de kilomètres en tout ?` },
  { phr: (_p, n) => `Une vidéo a ${n} vues le lundi et deux fois plus le mardi. Combien de vues le mardi ?` },
  { u: "L", phr: (_p, n) => `Une cuve contient ${n} d'eau ; une autre en contient le double. Combien de litres dans la seconde ?` },
  { phr: (p, n) => `${p.nom}, fleuriste, vend ${n} roses en mai et deux fois plus en juin. Combien en juin ?` },
];
type SitMoitie = { u?: string; phr: (p: Perso, n: string) => string };
const SIT_MOITIE: readonly SitMoitie[] = [
  { phr: (p, n) => `${p.nom} partage ${n} cartes en deux paquets égaux. Combien de cartes dans chaque paquet ?` },
  { u: "cm", phr: (_p, n) => `Une couturière coupe un ruban de ${n} en deux morceaux égaux. Combien mesure chaque morceau ?` },
  { phr: (_p, n) => `${n} coureurs forment deux groupes égaux. Combien de coureurs par groupe ?` },
  { u: "€", phr: (p, n) => `${p.nom} et sa sœur se partagent ${n} à égalité. Combien chacun reçoit-il ?` },
  { u: "km", phr: (p, n) => `${p.nom} doit parcourir ${n} à vélo. ${cap(p.il)} s'arrête à la moitié. Quelle distance a-t-${p.il} parcourue ?` },
  { u: "L", phr: (_p, n) => `Une piscine gonflable de ${n} est remplie à moitié. Combien de litres d'eau contient-elle ?` },
  { phr: (_p, n) => `Un cinéma a ${n} places ; la moitié est occupée. Combien de places sont occupées ?` },
  { u: "g", phr: (p, n) => `${p.nom} utilise la moitié d'un sac de ${n} de farine pour un gâteau. Combien de grammes utilise-t-${p.il} ?` },
  { phr: (_p, n) => `Une agricultrice récolte ${n} pommes et en vend la moitié. Combien en vend-elle ?` },
];
type SitComp = { u?: string; phr: (p: Perso, n: string, cible: string) => string };
const SIT_COMP: readonly SitComp[] = [
  { u: "€", phr: (p, n, c) => `${p.nom} a ${n}. ${cap(p.il)} veut acheter un ordinateur à ${c}. Combien lui manque-t-il ?` },
  { phr: (p, n, c) => `Un roman a ${c} pages. ${p.nom} en a lu ${n}. Combien de pages lui reste-t-il ?` },
  { phr: (p, n, c) => `Dans un jeu, il faut ${c} points pour passer au niveau suivant. ${p.nom} en a ${n}. Combien lui en manque-t-il ?` },
  { u: "L", phr: (_p, n, c) => `Une citerne de ${c} contient déjà ${n} d'eau. Combien de litres faut-il ajouter pour la remplir ?` },
  { u: "m", phr: (p, n, c) => `${p.nom} doit nager ${c} ; ${p.il} a déjà nagé ${n}. Combien de mètres lui reste-t-il ?` },
  { phr: (_p, n, c) => `Un stade a ${c} places ; ${n} billets sont déjà vendus. Combien de places restent libres ?` },
  { u: "cm", phr: (_p, n, c) => `Un menuisier a une planche de ${c}. Il en scie ${n}. Quelle longueur reste-t-il ?` },
  { u: "€", phr: (p, n, c) => `${p.nom} paie un article de ${n} avec ${c}. Combien lui rend-on ?` },
  { u: "km", phr: (p, n, c) => `Une pilote doit parcourir ${c} ; elle en a déjà fait ${n}. Combien de kilomètres lui reste-t-il ?` },
  { phr: (_p, n, c) => `Une imprimante doit tirer ${c} feuilles ; ${n} sont déjà imprimées. Combien en reste-t-il ?` },
];

const MEN_ITEMS: TutorBankItemV4[] = [
  MEN(101, 1, "Le double : double les centaines, les dizaines, puis les unités.", () => {
    const n = entre(26, 249);
    const r = 2 * n;
    const ctx = Math.random() < 0.55;
    const s0 = un(SIT_DOUBLE);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n)) : un([`Quel est le double de ${n} ?`, `Calcule de tête le double de ${n}.`, tete(`${n} + ${n}`), tete(`2 × ${n}`)]),
      ...qcmF(r, [doubleSansRetenue(n), n + 2, r + 10, r - 10], e, 10),
      explanation: etapes("on double chaque morceau du nombre, puis on ajoute.", `${n} + ${n} = ${2 * (n - (n % 10))} + ${2 * (n % 10)} = ${r}.`, `Le double de ${n} est ${r}.`),
      canvas: barre([val(n), val(n)], "?", "deux fois le même nombre"),
    };
  }),
  MEN(102, 1, "La moitié, c'est partager en deux parts égales.", () => {
    const h = tirer(() => entre(13, 249), (x) => moitieChiffres(2 * x) !== x);
    const n = 2 * h;
    const ctx = Math.random() < 0.55;
    const s0 = un(SIT_MOITIE);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n)) : un([`Quelle est la moitié de ${n} ?`, `Calcule de tête la moitié de ${n}.`, tete(`${n} ÷ 2`), `Partage ${n} en deux parts égales : combien dans chaque part ?`]),
      ...qcmF(h, [moitieChiffres(n), 2 * n, n - 2, h + 10], e, 10),
      explanation: etapes("on cherche le nombre qui, ajouté à lui-même, donne le nombre de départ.", `${h} + ${h} = ${n}, donc ${n} ÷ 2 = ${h}.`, `La moitié de ${n} est ${h}.`),
      canvas: barre([inconnu(), inconnu()], fr(n), "deux parts égales"),
    };
  }),
  MEN(103, 1, "× 10, × 100, × 1 000 : chaque chiffre prend une valeur 10, 100 ou 1 000 fois plus grande.", () => {
    const par = un([10, 100, 100, 1000]);
    const n = par === 1000 ? entre(12, 95) : par === 100 ? entre(12, 480) : entre(102, 4800);
    const r = n * par;
    const ctx = Math.random() < 0.45;
    const obj = un([["paquets", "feuilles"], ["boîtes", "trombones"], ["sachets", "graines"], ["cartons", "cahiers"], ["rouleaux", "étiquettes"], ["caisses", "boulons"], ["palettes", "briques"]] as const);
    const autres = [10, 100, 1000].filter((k) => k !== par).map((k) => n * k);
    return {
      text: ctx
        ? un([`Un des ${obj[0]} contient ${fr(n)} ${obj[1]}. Combien ${de(obj[1])} dans ${fr(par)} ${obj[0]} ?`, `Une usine remplit ${fr(par)} ${obj[0]} de ${fr(n)} ${obj[1]}. Combien ${de(obj[1])} en tout ?`])
        : un([tete(`${fr(n)} × ${fr(par)}`), `Multiplie ${fr(n)} par ${fr(par)} de tête.`, `Combien font ${fr(par)} fois ${fr(n)} ?`]),
      ...qcmF(r, [...autres, n + par], avec(), par),
      explanation: etapes(`multiplier par ${fr(par)}, c'est rendre chaque chiffre ${fr(par)} fois plus grand : les unités deviennent des ${par === 10 ? "dizaines" : par === 100 ? "centaines" : "milliers"}.`, `${fr(n)} × ${fr(par)} = ${fr(r)}.`, `Le résultat est ${fr(r)}.`),
      ...(par === 10 ? { canvas: barre(fois(10, fr(n)), "?", `10 fois ${fr(n)}`, false) } : {}),
    };
  }),
  MEN(104, 1, "Ajouter ou enlever des centaines : seul le chiffre des centaines change (sauf passage au millier).", () => {
    const plus = Math.random() < 0.55;
    const pasK = un([100, 100, 10, 1000]);
    const k = pasK * entre(2, 7);
    const n = plus ? entre(1205, 8890) : entre(k + 1100, 9890);
    const r = plus ? n + k : n - k;
    const p = perso();
    const sit = un([
      () => (plus ? `${p.nom} a ${fr(n)} points et en gagne ${fr(k)}. Quel est son score ?` : `${p.nom} a ${fr(n)} points et en perd ${fr(k)}. Quel est son score ?`),
      () => (plus ? `Un parc accueille ${fr(n)} visiteurs ; ${fr(k)} arrivent encore. Combien sont-ils ?` : `Un parc accueille ${fr(n)} visiteurs ; ${fr(k)} repartent. Combien en reste-t-il ?`),
      () => (plus ? `${p.nom} a ${fr(n)} € d'économies et reçoit ${fr(k)} €. Combien a-t-${p.il} ?` : `${p.nom} a ${fr(n)} € d'économies et dépense ${fr(k)} €. Combien lui reste-t-il ?`),
      () => tete(`${fr(n)} ${plus ? "+" : "−"} ${fr(k)}`),
      () => tete(`${fr(n)} ${plus ? "+" : "−"} ${fr(k)}`),
    ]);
    const d = k / pasK;
    return {
      text: sit(),
      ...qcmF(r, plus ? [n + d, n + d * (pasK / 10), r + pasK] : [n - d, n - d * (pasK / 10), r - pasK], avec(), pasK),
      explanation: etapes(`${plus ? "ajouter" : "enlever"} ${fr(k)}, c'est ${plus ? "ajouter" : "enlever"} ${d} ${pasK === 10 ? "dizaines" : pasK === 100 ? "centaines" : "milliers"}.`, `${fr(n)} ${plus ? "+" : "−"} ${fr(k)} = ${fr(r)}.`, `Le résultat est ${fr(r)}.`),
      canvas: plus ? barre([val(n), val(k)], "?") : barre([inconnu("?"), val(k)], fr(n)),
    };
  }),
  MEN(105, 1, "Cherche combien il manque pour arriver à la centaine suivante.", () => {
    const n = tirer(() => entre(1210, 9880), (x) => x % 100 !== 0 && x % 10 !== 0);
    const cible = Math.ceil(n / 100) * 100;
    const r = cible - n;
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_COMP.filter((s) => s.u !== "€"));
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n), e(cible)) : un([`Combien faut-il ajouter à ${fr(n)} pour arriver à ${fr(cible)} ?`, `Complète : ${fr(n)} + … = ${fr(cible)}.`, tete(`${fr(cible)} − ${fr(n)}`), `Quel nombre ajouter à ${fr(n)} pour obtenir ${fr(cible)} ?`]),
      ...qcmF(r, [complementChiffres(n % 100, 100), r + 10, r - 10, 100 - (n % 10)], e, 1),
      explanation: etapes("on va d'abord à la dizaine suivante, puis à la centaine.", `${fr(n)} + ${r} = ${fr(cible)}.`, `Il faut ajouter ${r}.`),
      canvas: barre([val(n), inconnu("?")], fr(cible)),
    };
  }),
  MEN(201, 2, "Va d'abord à la dizaine, puis à la centaine, puis jusqu'au bout.", () => {
    const mille = Math.random() < 0.5;
    const n = mille ? tirer(() => entre(105, 985), (x) => x % 10 !== 0) : tirer(() => entre(11, 89), (x) => x % 10 !== 0 && x % 10 !== 5);
    const cible = mille ? 1000 : 100;
    const r = cible - n;
    const ctx = Math.random() < 0.55;
    const s0 = un(SIT_COMP);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n), e(cible)) : un([`Quel nombre faut-il ajouter à ${n} pour obtenir ${fr(cible)} ?`, `Complète : ${n} + … = ${fr(cible)}.`, tete(`${fr(cible)} − ${n}`), `Quel est le complément de ${n} à ${fr(cible)} ?`]),
      ...qcmF(r, [complementChiffres(n, cible), r + 10, r - 10, r + 100], e, 1),
      explanation: etapes(`on complète jusqu'à la dizaine, puis jusqu'à ${fr(cible)}.`, `${n} + ${Math.ceil(n / 10) * 10 - n} = ${Math.ceil(n / 10) * 10} ; ${Math.ceil(n / 10) * 10} + ${cible - Math.ceil(n / 10) * 10} = ${fr(cible)}.`, `Il faut ajouter ${r}.`),
      canvas: barre([val(n), inconnu("?")], fr(cible)),
    };
  }),
  MEN(202, 2, "× 4, c'est le double du double ; × 5, c'est × 10 puis la moitié.", () => {
    const k = un([4, 5]);
    const n = k === 5 ? 2 * entre(11, 99) : entre(13, 149);
    const r = k * n;
    const ctx = Math.random() < 0.45;
    const p = perso();
    const sit = un([
      () => `Une roue de voiture coûte ${n} €. Combien coûtent ${k} roues ?`,
      () => `${p.nom} range ${n} cartes dans chacune de ses ${k} boîtes. Combien de cartes en tout ?`,
      () => `Une course de relais compte ${k} coureurs ; chacun court ${n} m. Quelle distance en tout ?`,
      () => `Un livreur dépose ${n} colis par jour pendant ${k} jours. Combien de colis en tout ?`,
      () => `Une salle a ${k} rangées de ${n} sièges. Combien de sièges en tout ?`,
    ]);
    return {
      text: ctx ? sit() : un([tete(`${n} × ${k}`), tete(`${k} × ${n}`), `Multiplie ${n} par ${k} de tête.`]),
      ...qcmF(r, k === 5 ? [n * 10, n + 5, r + 10, n * 10 * 2] : [2 * n, n + 4, r + 4, 8 * n], avec(), k),
      explanation: k === 5
        ? etapes("× 5, c'est × 10 puis la moitié.", `${n} × 10 = ${fr(n * 10)}, et la moitié de ${fr(n * 10)} est ${fr(r)}.`, `${n} × 5 = ${fr(r)}.`)
        : etapes("× 4, c'est le double, puis encore le double.", `le double de ${n} est ${2 * n} ; le double de ${2 * n} est ${r}.`, `${n} × 4 = ${r}.`),
      canvas: barre(fois(k, String(n)), "?", `${k} fois ${n}`, false),
    };
  }),
  MEN(203, 2, "Ajouter 99, c'est ajouter 100 puis enlever 1.", () => {
    const op = un(["+9", "+99", "-99", "+999", "-9", "-999", "+199"] as const);
    const k = Number(op.slice(1));
    const plus = op.startsWith("+");
    const n = k === 999 ? entre(1205, 8890) : k >= 99 ? entre(230, 4890) : entre(123, 989);
    const r = plus ? n + k : n - k;
    const rond = k + 1;
    const p = perso();
    const quoi = un(["billes", "points", "images", "timbres", "abonnés", "pas", "vues"]);
    const ctx = Math.random() < 0.4;
    return {
      text: ctx
        ? plus ? `${p.nom} a ${fr(n)} ${quoi}. ${cap(p.il)} en gagne ${k}. Combien en a-t-${p.il} maintenant ?` : `${p.nom} a ${fr(n)} ${quoi}. ${cap(p.il)} en perd ${k}. Combien lui en reste-t-il ?`
        : tete(`${fr(n)} ${plus ? "+" : "−"} ${k}`),
      ...qcmF(r, plus ? [n + rond, n + rond + 1, n + k - 10] : [n - rond, n - rond - 1, n - k + 10], avec(), 1),
      explanation: plus
        ? etapes(`ajouter ${k}, c'est ajouter ${fr(rond)} puis enlever 1.`, `${fr(n)} + ${fr(rond)} = ${fr(n + rond)} ; ${fr(n + rond)} − 1 = ${fr(r)}.`, `${fr(n)} + ${k} = ${fr(r)}.`)
        : etapes(`enlever ${k}, c'est enlever ${fr(rond)} puis rajouter 1.`, `${fr(n)} − ${fr(rond)} = ${fr(n - rond)} ; ${fr(n - rond)} + 1 = ${fr(r)}.`, `${fr(n)} − ${k} = ${fr(r)}.`),
      canvas: plus ? barre([val(n), val(k)], "?") : barre([inconnu("?"), val(k)], fr(n)),
    };
  }),
  MEN(204, 2, "Ajoute les centaines, puis les dizaines, puis les unités.", () => {
    const [a, b] = tirer(() => [entre(123, 689), entre(36, 289)], ([x, y]) => (x % 10) + (y % 10) >= 10);
    const r = a + b;
    const p = perso();
    const ctx = Math.random() < 0.5;
    const sit = un([
      () => `${p.nom} a ${a} € et gagne ${b} € en vendant ses jouets. Combien a-t-${p.il} maintenant ?`,
      () => `Un train transporte ${a} voyageurs ; ${b} montent à la gare. Combien sont-ils maintenant ?`,
      () => `${p.nom} lit ${a} pages en mars et ${b} pages en avril. Combien de pages en tout ?`,
      () => `Une équipe de basket marque ${a} points en un mois et ${b} le mois suivant. Combien de points au total ?`,
      () => `Une apicultrice récolte ${a} g de miel, puis ${b} g. Combien de grammes en tout ?`,
      () => `Une bibliothèque prête ${a} livres en mai et ${b} en juin. Combien de prêts en tout ?`,
    ]);
    return {
      text: ctx ? sit() : tete(`${a} + ${b}`),
      ...qcmF(r, [addSansRetenue([a, b]), r - 10, r + 10, r + 100], avec(), 1),
      explanation: etapes("on ajoute les centaines, puis les dizaines, puis les unités.", `${a} + ${b - (b % 10)} = ${a + b - (b % 10)} ; ${a + b - (b % 10)} + ${b % 10} = ${r}.`, `${a} + ${b} = ${r}.`),
      canvas: barre([val(a), val(b)], "?"),
    };
  }),
  MEN(205, 2, "÷ 10, ÷ 100 : chaque chiffre prend une valeur 10 ou 100 fois plus petite.", () => {
    const par = un([10, 100]);
    const q = par === 10 ? entre(23, 980) : entre(12, 95);
    const n = q * par;
    const p = perso();
    const ctx = Math.random() < 0.45;
    const [t, u] = un<readonly [string, string | undefined]>([
      [`${p.nom} range ${fr(n)} photos dans ${par} albums identiques. Combien de photos par album ?`, undefined],
      [`${fr(n)} € sont partagés entre ${par} associations, à parts égales. Combien reçoit chacune ?`, "€"],
      [`Une usine emballe ${fr(n)} biscuits par paquets de ${par}. Combien de paquets ?`, undefined],
      [`Un rouleau de ${fr(n)} cm est coupé en ${par} morceaux égaux. Combien mesure chaque morceau ?`, "cm"],
      [`Un camion transporte ${fr(n)} kg répartis en ${par} caisses identiques. Combien pèse une caisse ?`, "kg"],
    ]);
    return {
      text: ctx ? t : un([tete(`${fr(n)} ÷ ${par}`), `Divise ${fr(n)} par ${par} de tête.`, `Combien de fois ${par} dans ${fr(n)} ?`]),
      ...qcmF(q, par === 10 ? [n / 100, n * 10, n - 10] : [n / 10, n * 100, n - 100].filter(Number.isInteger), avec(ctx ? u : undefined), 1, [q + 10, q - 10]),
      explanation: etapes(`diviser par ${par}, c'est rendre chaque chiffre ${par} fois plus petit : on enlève ${par === 10 ? "le 0" : "les deux 0"} de la fin.`, `${fr(n)} ÷ ${par} = ${fr(q)}.`, `Le résultat est ${fr(q)}.`),
      ...(par === 10 ? { canvas: barre(Array.from({ length: 10 }, () => inconnu()), fr(n), "10 parts égales", false) } : {}),
    };
  }),
  MEN(301, 3, "× 9, c'est × 10 puis enlever le nombre ; × 99, c'est × 100 puis enlever le nombre.", () => {
    const par = un([9, 9, 99, 11]);
    const n = par === 99 ? entre(12, 68) : entre(23, 189);
    const r = n * par;
    const rond = par === 11 ? 10 : par + 1;
    const ctx = Math.random() < 0.4;
    const p = perso();
    return {
      text: ctx
        ? un([`Une place de concert coûte ${par} €. Combien coûtent ${n} places ?`, `${p.nom} range ${par} cartes dans chacune de ses ${n} boîtes. Combien de cartes en tout ?`, `Un car fait ${par} trajets par semaine. Combien de trajets en ${n} semaines ?`, `Un club achète ${n} maillots à ${par} € l'un. Combien paie-t-il ?`])
        : un([tete(`${n} × ${par}`), `Multiplie ${n} par ${par} de tête.`, tete(`${par} × ${n}`)]),
      ...qcmF(r, par === 11 ? [n * 10, n * 10 + 1, n * 12] : [n * rond, n * rond - 1, n * rond + n], avec(), 1),
      explanation: par === 11
        ? etapes("× 11, c'est × 10 puis on ajoute une fois le nombre.", `${n} × 10 = ${fr(n * 10)} ; ${fr(n * 10)} + ${n} = ${fr(r)}.`, `${n} × 11 = ${fr(r)}.`)
        : etapes(`× ${par}, c'est × ${rond} puis on enlève une fois le nombre.`, `${n} × ${rond} = ${fr(n * rond)} ; ${fr(n * rond)} − ${n} = ${fr(r)}.`, `${n} × ${par} = ${fr(r)}.`),
      canvas: par === 11 ? barre([val(n * 10, `${n} × 10`), val(n)], "?", `${n} × 11`) : barre([inconnu(`${n} × ${par}`), val(n)], fr(n * rond), `${n} × ${rond}`),
    };
  }),
  MEN(302, 3, "Complète d'abord à la centaine, puis au millier, puis jusqu'au bout.", () => {
    const dixMille = Math.random() < 0.5;
    const cible = dixMille ? 10000 : 1000;
    const n = dixMille ? 10 * tirer(() => entre(105, 985), (x) => x % 10 !== 0) : 10 * tirer(() => entre(11, 99), (x) => x % 10 !== 0);
    const r = cible - n;
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_COMP);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n), e(cible)) : un([`Quel nombre faut-il ajouter à ${fr(n)} pour obtenir ${fr(cible)} ?`, `Complète : ${fr(n)} + … = ${fr(cible)}.`, tete(`${fr(cible)} − ${fr(n)}`), `Quel est le complément de ${fr(n)} à ${fr(cible)} ?`]),
      ...qcmF(r, [complementChiffres(n, cible), r + 100, r - 100, r + 1000], e, 10),
      explanation: etapes(`on va jusqu'à la centaine suivante, puis jusqu'à ${fr(cible)}.`, `${fr(n)} + ${fr(Math.ceil(n / 100) * 100 - n)} = ${fr(Math.ceil(n / 100) * 100)} ; puis + ${fr(cible - Math.ceil(n / 100) * 100)} = ${fr(cible)}.`, `Il faut ajouter ${fr(r)}.`),
      canvas: barre([val(n), inconnu("?")], fr(cible)),
    };
  }),
  MEN(303, 3, "Choisis la méthode qui transforme le calcul en calcul facile.", () => {
    const sorte = un(["x5", "p99", "m199", "x9", "x4", "x99", "x50", "m98"] as const);
    const n = sorte === "x4" || sorte === "x5" || sorte === "x50" ? 2 * entre(12, 99) : sorte === "m199" || sorte === "m98" ? entre(312, 889) : entre(123, 889);
    const C: Record<typeof sorte, [string, string, string[]]> = {
      x5: [`${n} × 5`, `${n} × 10, puis la moitié`, [`${n} + 5`, `${n} × 10, puis le double`, `${n} × 10, puis enlever 5`]],
      x50: [`${n} × 50`, `${n} × 100, puis la moitié`, [`${n} × 100, puis le double`, `${n} × 10, puis la moitié`, `${n} × 100, puis enlever 50`]],
      p99: [`${n} + 99`, `${n} + 100, puis enlever 1`, [`${n} + 100, puis ajouter 1`, `${n} + 90, puis ajouter 1`, `${n} − 100, puis ajouter 1`]],
      m199: [`${n} − 199`, `${n} − 200, puis ajouter 1`, [`${n} − 200, puis enlever 1`, `${n} − 100, puis enlever 99`, `${n} + 200, puis enlever 1`]],
      m98: [`${n} − 98`, `${n} − 100, puis ajouter 2`, [`${n} − 100, puis enlever 2`, `${n} − 90, puis enlever 2`, `${n} − 100, puis ajouter 8`]],
      x9: [`${n} × 9`, `${n} × 10, puis enlever ${n}`, [`${n} × 10, puis enlever 1`, `${n} × 10, puis ajouter ${n}`, `${n} + 9`]],
      x99: [`${n} × 99`, `${n} × 100, puis enlever ${n}`, [`${n} × 100, puis enlever 1`, `${n} × 100, puis enlever 99`, `${n} × 10, puis enlever ${n}`]],
      x4: [`${n} × 4`, `le double de ${n}, puis encore le double`, [`le double de ${n}, puis ajouter 2`, `${n} + 4`, `la moitié de ${n}, puis le double`]],
    };
    const [expr, juste, faux] = C[sorte];
    const p = perso();
    return {
      text: un([`Quelle méthode permet de calculer ${expr} de tête ?`, `Pour calculer ${expr} mentalement, que fais-tu ?`, `${p.nom} veut calculer ${expr} sans poser l'opération. Quelle méthode marche ?`, `Quelle astuce donne ${expr} ?`]),
      ...qcm(juste, faux),
      explanation: etapes("on remplace le calcul par un calcul avec un nombre rond, puis on corrige.", `${expr} : ${juste}.`, `La bonne méthode : ${juste}.`),
    };
  }),
  MEN(304, 3, "Un nombre proche d'un nombre rond : calcule avec le rond, puis corrige.", () => {
    const sorte = un(["prix99", "prix999", "plus999", "moins999"] as const);
    const p = perso();
    if (sorte === "prix99" || sorte === "prix999") {
      const pr = sorte === "prix99" ? 99 : 999;
      const k = entre(3, 9);
      const r = k * pr;
      const obj = sorte === "prix99" ? un(["trottinettes", "casques", "tentes", "montres", "lampes", "chaises de bureau"]) : un(["ordinateurs", "vélos électriques", "tableaux interactifs", "frigos", "téléviseurs"]);
      const pour = un(["un club", "une école", "une colonie", "un centre de loisirs", "une médiathèque", "un collège"]);
      return {
        text: `${p.nom} achète ${k} ${obj} à ${fr(pr)} € pour ${pour}. Combien paie-t-${p.il} ?`,
        ...qcmF(r, [k * (pr + 1), k * (pr + 1) + k, k * (pr + 1) - 1], avec("€"), 1),
        explanation: etapes(`${fr(pr)}, c'est ${fr(pr + 1)} − 1.`, `${k} × ${fr(pr + 1)} = ${fr(k * (pr + 1))} ; ${fr(k * (pr + 1))} − ${k} = ${fr(r)}.`, `${p.nom} paie ${fr(r)} €.`),
        canvas: barre(fois(k, fr(pr)), "?", `${k} fois ${fr(pr)} €`, false),
      };
    }
    const n = entre(1205, 8890);
    const plus = sorte === "plus999";
    const r = plus ? n + 999 : n - 999;
    const quoi = un(["points", "abonnés", "pas", "visiteurs", "vues"]);
    return {
      text: plus ? `${p.nom} a ${fr(n)} ${quoi}, puis en gagne 999. Combien en a-t-${p.il} maintenant ?` : `${p.nom} a ${fr(n)} ${quoi}, puis en perd 999. Combien lui en reste-t-il ?`,
      ...qcmF(r, plus ? [n + 1000, n + 1001, n + 990] : [n - 1000, n - 1001, n - 990], avec(), 1),
      explanation: plus ? etapes("+ 999, c'est + 1 000 puis − 1.", `${fr(n)} + 1 000 = ${fr(n + 1000)} ; ${fr(n + 1000)} − 1 = ${fr(r)}.`, `Il en a ${fr(r)}.`) : etapes("− 999, c'est − 1 000 puis + 1.", `${fr(n)} − 1 000 = ${fr(n - 1000)} ; ${fr(n - 1000)} + 1 = ${fr(r)}.`, `Il en reste ${fr(r)}.`),
      canvas: plus ? barre([val(n), val(999)], "?") : barre([inconnu("?"), val(999)], fr(n)),
    };
  }),
  MEN(305, 3, "Double ou moitié d'un grand nombre : les milliers, puis les centaines, puis le reste.", () => {
    const double = Math.random() < 0.5;
    const n = double ? entre(1150, 4890) : 2 * tirer(() => entre(560, 4490), (x) => moitieChiffres(2 * x) !== x);
    const r = double ? 2 * n : n / 2;
    const p = perso();
    const sit = un([
      () => (double ? `${p.nom} a ${fr(n)} abonnés ; sa cousine en a deux fois plus. Combien en a-t-elle ?` : `${p.nom} partage ${fr(n)} € en deux parts égales. Combien vaut une part ?`),
      () => (double ? `Un TGV transporte ${fr(n)} voyageurs à l'aller et autant au retour. Combien en tout ?` : `${fr(n)} coureurs d'un marathon forment deux vagues égales. Combien par vague ?`),
      () => (double ? `Une boulangerie utilise ${fr(n)} g de beurre ; on double la recette. Combien de grammes ?` : `Un sentier de ${fr(n)} m : ${p.nom} s'arrête à la moitié. Quelle distance a-t-${p.il} faite ?`),
      () => (double ? `Quel est le double de ${fr(n)} ?` : `Quelle est la moitié de ${fr(n)} ?`),
      () => tete(double ? `${fr(n)} × 2` : `${fr(n)} ÷ 2`),
    ]);
    return {
      text: sit(),
      ...qcmF(r, double ? [doubleSansRetenue(n), r + 100, r - 1000] : [moitieChiffres(n), 2 * n, r + 50, r - 500], avec(), 10),
      explanation: double
        ? etapes("on double les milliers, puis le reste, et on ajoute.", `2 × ${fr(n - (n % 1000))} = ${fr(2 * (n - (n % 1000)))} ; 2 × ${n % 1000} = ${fr(2 * (n % 1000))} ; ${fr(2 * (n - (n % 1000)))} + ${fr(2 * (n % 1000))} = ${fr(r)}.`, `Le double de ${fr(n)} est ${fr(r)}.`)
        : etapes("on cherche le nombre qui, doublé, redonne le nombre de départ.", `${fr(r)} + ${fr(r)} = ${fr(n)}.`, `La moitié de ${fr(n)} est ${fr(r)}.`),
      canvas: double ? barre([val(n), val(n)], "?", "deux fois le même nombre") : barre([inconnu(), inconnu()], fr(n), "deux parts égales"),
    };
  }),
];

/* ═════════════════════ ADDITION POSÉE (★1 ★2 ★3) ═════════════════════ */

const ADD = atelier("cm2", "calcul", "calcul_addition_posee", "cm2_");

/** Deux quantités qu'on réunit. `max` : la plus grande valeur vraisemblable. `u` : l'unité. */
type SitAdd = { m?: Metier; quoi: string; u?: string; max: number; phr: (p: Perso, a: string, b: string) => string };
const SIT_ADD: readonly SitAdd[] = [
  { m: ["libraire", "libraire"], quoi: "livres", max: 9999, phr: (p, a, b) => `${p.txt} vend ${a} livres en novembre et ${b} livres en décembre.` },
  { m: ["boulangère", "boulanger"], quoi: "baguettes", max: 9999, phr: (p, a, b) => `${p.txt} vend ${a} baguettes en janvier et ${b} en février.` },
  { m: ["jardinière", "jardinier"], quoi: "bulbes", max: 9999, phr: (p, a, b) => `${p.txt} plante ${a} bulbes de tulipes dans un parc et ${b} dans un autre.` },
  { m: ["infirmière", "infirmier"], quoi: "kilomètres", u: "km", max: 99999, phr: (p, a, b) => `${p.txt} roule ${a} pour ses visites une année et ${b} l'année suivante.` },
  { m: ["organisatrice", "organisateur"], quoi: "spectateurs", max: 99999, phr: (p, a, b) => `${p.txt} compte ${a} spectateurs le samedi d'un festival et ${b} le dimanche.` },
  { quoi: "points", max: 999999, phr: (p, a, b) => `${p.txt} marque ${a} points au premier monde d'un jeu vidéo et ${b} au deuxième.` },
  { m: ["guide", "guide"], quoi: "visiteurs", max: 999999, phr: (p, a, b) => `${p.txt} note qu'un musée a reçu ${a} visiteurs l'an dernier et ${b} cette année.` },
  { m: ["agricultrice", "agriculteur"], quoi: "kilogrammes", u: "kg", max: 99999, phr: (p, a, b) => `${p.txt} récolte ${a} de pommes de terre, puis ${b} la semaine suivante.` },
  { m: ["apicultrice", "apiculteur"], quoi: "grammes", u: "g", max: 99999, phr: (p, a, b) => `${p.txt} récolte ${a} de miel en juin et ${b} en juillet.` },
  { m: ["pilote", "pilote"], quoi: "kilomètres", u: "km", max: 999999, phr: (p, a, b) => `${p.txt} vole ${a} une année et ${b} l'année suivante.` },
  { m: ["caissière", "caissier"], quoi: "billets", max: 99999, phr: (p, a, b) => `${p.txt} vend ${a} billets de cinéma en été et ${b} en automne.` },
  { m: ["bibliothécaire", "bibliothécaire"], quoi: "livres", max: 99999, phr: (p, a, b) => `${p.txt} prête ${a} livres au premier semestre et ${b} au second.` },
  { m: ["fleuriste", "fleuriste"], quoi: "roses", max: 9999, phr: (p, a, b) => `${p.txt} vend ${a} roses pour la Saint-Valentin et ${b} pour la fête des mères.` },
  { m: ["photographe", "photographe"], quoi: "photos", max: 99999, phr: (p, a, b) => `${p.txt} enregistre ${a} photos sur un disque et ${b} sur un autre.` },
  { m: ["youtubeuse", "youtubeur"], quoi: "vues", max: 999999, phr: (p, a, b) => `Une vidéo ${de(p.nom)} fait ${a} vues le premier mois et ${b} le deuxième.` },
  { quoi: "habitants", max: 999999, phr: (_p, a, b) => `Une ville compte ${a} habitants et sa voisine ${b}.` },
  { m: ["informaticienne", "informaticien"], quoi: "téléchargements", max: 999999, phr: (p, a, b) => `L'application ${de(p.nom)} est téléchargée ${a} fois en mai et ${b} fois en juin.` },
  { m: ["cycliste", "cycliste"], quoi: "mètres", u: "m", max: 99999, phr: (p, a, b) => `${p.txt} parcourt ${a} le matin et ${b} l'après-midi.` },
  { m: ["chauffeuse de bus", "chauffeur de bus"], quoi: "voyageurs", max: 99999, phr: (p, a, b) => `${p.txt} transporte ${a} voyageurs en mars et ${b} en avril.` },
  { m: ["vétérinaire", "vétérinaire"], quoi: "euros", u: "€", max: 99999, phr: (p, a, b) => `Le cabinet ${de(p.nom)} achète un appareil à ${a} et une table à ${b}.` },
  { m: ["entraîneuse", "entraîneur"], quoi: "spectateurs", max: 99999, phr: (p, a, b) => `${p.txt} compte ${a} spectateurs au premier match et ${b} au second.` },
  { m: ["marchande", "marchand"], quoi: "letchis", max: 9999, phr: (p, a, b) => `${p.txt} vend ${a} letchis au marché de Saint-Paul en décembre et ${b} en janvier.` },
];
const Q_TOTAL = (quoi: string) => [`Combien ${de(quoi)} en tout ?`, `Combien ${de(quoi)} au total ?`, "Quel est le total ?", `Pose l'addition : combien ${de(quoi)} en tout ?`, `Combien cela fait-il ${de(quoi)} ?`];
const PRE_ADD = ["", "Pose l'addition.", "Pose en colonnes.", "Aligne bien les chiffres.", "Commence par les unités."];

const leurresAdd = (nums: number[]) => {
  const s = nums.reduce((t, x) => t + x, 0);
  const tout = addToutEcrit(nums);
  return [addSansRetenue(nums), ...(String(tout).length <= String(s).length + 1 ? [tout] : [])];
};
const voisinsAdd = (s: number) => [s + 10, s - 10, s + 100, s - 100, s + 1000];
const expAdd = (nums: number[]) =>
  etapes(
    "on pose les nombres en colonnes, unités sous unités, et on commence par les unités ; une colonne qui dépasse 9 donne une retenue.",
    detailAdd(nums),
    `${nums.map(fr).join(" + ")} = ${fr(nums.reduce((t, x) => t + x, 0))}.`,
  );

function qAddNu(ra: [number, number], rb: [number, number], ok: (k: number) => boolean): Q {
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => ok(nbRetenuesAdd([x, y])));
  const s = a + b;
  return {
    text: phrase(un(PRE_ADD), un(CALCULE(`${fr(a)} + ${fr(b)}`))),
    ...qcmF(s, leurresAdd([a, b]), avec(), 10, voisinsAdd(s)),
    explanation: expAdd([a, b]),
    canvas: pose("addition", [String(a), String(b)]),
  };
}
function qAddSit(ra: [number, number], rb: [number, number], ok: (k: number) => boolean): Q {
  // Les grands nombres ne vont qu'aux situations où ils sont vraisemblables.
  const s0 = un(SIT_ADD.filter((s) => s.max >= ra[1] + rb[1]));
  const p = perso(s0.m);
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => ok(nbRetenuesAdd([x, y])));
  const s = a + b;
  const e = avec(s0.u);
  return {
    text: phrase(s0.phr(p, e(a), e(b)), un(Q_TOTAL(s0.quoi))),
    ...qcmF(s, leurresAdd([a, b]), e, 10, voisinsAdd(s)),
    explanation: expAdd([a, b]),
    canvas: pose("addition", [String(a), String(b)]),
  };
}

/** Trois quantités. */
type Sit3 = { quoi: string; u?: string; phr: (p: Perso, a: string, b: string, c: string) => string };
const SIT_ADD3: readonly Sit3[] = [
  { quoi: "kilomètres", u: "km", phr: (_p, a, b, c) => `Un chauffeur routier parcourt ${a} en janvier, ${b} en février et ${c} en mars.` },
  { quoi: "élèves", phr: (_p, a, b, c) => `Trois collèges comptent ${a}, ${b} et ${c} élèves.` },
  { quoi: "kilogrammes", u: "kg", phr: (_p, a, b, c) => `Un camion livre ${a} de farine, ${b} de sucre et ${c} de sel.` },
  { quoi: "pages", phr: (p, a, b, c) => `${p.nom} lit ${a} pages en un trimestre, ${b} au suivant et ${c} au dernier.` },
  { quoi: "visiteurs", phr: (_p, a, b, c) => `Un parc d'attractions accueille ${a} visiteurs en juin, ${b} en juillet et ${c} en août.` },
  { quoi: "points", phr: (p, a, b, c) => `Dans un jeu, ${p.nom} gagne ${a} points, puis ${b}, puis ${c}.` },
  { quoi: "œufs", phr: (_p, a, b, c) => `Une ferme ramasse ${a} œufs en avril, ${b} en mai et ${c} en juin.` },
  { quoi: "mètres", u: "m", phr: (p, a, b, c) => `${p.nom} nage ${a} en une semaine, ${b} la suivante et ${c} la troisième.` },
  { quoi: "repas", phr: (_p, a, b, c) => `La cantine sert ${a} repas en septembre, ${b} en octobre et ${c} en novembre.` },
  { quoi: "litres", u: "L", phr: (_p, a, b, c) => `Une citerne reçoit ${a} d'eau en mars, ${b} en avril et ${c} en mai.` },
  { quoi: "tickets", phr: (_p, a, b, c) => `Le caissier du zoo vend ${a} tickets en mai, ${b} en juin et ${c} en juillet.` },
  { quoi: "euros", u: "€", phr: (_p, a, b, c) => `Une association récolte ${a} à une brocante, ${b} à un loto et ${c} à une tombola.` },
];
function qAdd3(r: [number, number]): Q {
  const s0 = un(SIT_ADD3);
  const p = perso();
  const nums = tirer(() => [entre(...r), entre(...r), entre(...r)], (t) => nbRetenuesAdd(t) >= 2);
  const s = nums.reduce((t, x) => t + x, 0);
  const e = avec(s0.u);
  const nu = Math.random() < 0.3;
  return {
    text: nu
      ? phrase(un(PRE_ADD), un(CALCULE(nums.map(fr).join(" + "))))
      : phrase(s0.phr(p, e(nums[0]), e(nums[1]), e(nums[2])), un(Q_TOTAL(s0.quoi))),
    ...qcmF(s, leurresAdd(nums), nu ? avec() : e, 10, voisinsAdd(s)),
    explanation: expAdd(nums),
    canvas: pose("addition", nums.map(String)),
  };
}
/** Un nombre plus court : l'aligner sur la droite. */
function qAddAligne(ra: [number, number], rb: [number, number]): Q {
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => nbRetenuesAdd([x, y]) >= 1);
  const s = a + b;
  return {
    text: phrase(un(["Attention à l'alignement.", "Pose en colonnes, les unités sous les unités.", "Un des nombres est plus court.", ""]), un(CALCULE(`${fr(a)} + ${fr(b)}`))),
    ...qcmF(s, [a + b * 10, a + b * 100, addSansRetenue([a, b])], avec(), 10, voisinsAdd(s)),
    explanation: etapes(`on aligne le dernier chiffre de ${fr(b)} sous le dernier chiffre de ${fr(a)} : unités sous unités.`, detailAdd([a, b]), `${fr(a)} + ${fr(b)} = ${fr(s)}.`),
    canvas: pose("addition", [String(a), String(b)]),
  };
}

const ADD_ITEMS: TutorBankItemV4[] = [
  ADD(101, 1, "Pose l'addition : unités sous unités, puis commence par les unités.", () => qAddNu([1002, 8899], [102, 989], (k) => k <= 1)),
  ADD(102, 1, "Pose l'addition en alignant les unités.", () => qAddSit([1050, 6899], [105, 2899], (k) => k <= 1)),
  ADD(103, 1, "Quand une colonne dépasse 9, on écrit les unités et on retient la dizaine.", () => {
    const [a, b] = tirer(() => [entre(1105, 6989), entre(105, 2999)], ([x, y]) => (x % 10) + (y % 10) >= 12);
    const x = a % 10;
    const y = b % 10;
    const s = x + y;
    const L = Math.max(String(a).length, String(b).length);
    const juste = `J'écris ${s % 10} et je retiens 1.`;
    return {
      text: phrase(
        `On pose ${fr(a)} + ${fr(b)}.`,
        un([`Aux unités : ${x} + ${y} = ${s}.`, `Colonne des unités : ${x} + ${y} = ${s}.`, `On commence par les unités : ${x} + ${y} = ${s}.`]),
        un(["Que fais-tu ?", "Qu'écris-tu ?", "Comment continues-tu ?", "Quelle est la bonne façon de faire ?"]),
      ),
      ...qcm(juste, [`J'écris ${s} sous les unités.`, `J'écris 1 et je retiens ${s % 10}.`, `J'écris ${s % 10} et je ne retiens rien.`]),
      explanation: etapes("une colonne ne contient qu'un chiffre : on écrit les unités et on retient la dizaine dans la colonne suivante.", `${x} + ${y} = ${s} = 1 dizaine et ${s % 10} unités.`, juste),
      canvas: pose("addition", [String(a), String(b)], { col: L - 1, label: "La colonne des unités" }),
    };
  }),
  ADD(104, 1, "Les unités sous les unités, même si un nombre est plus court.", () => qAddAligne([1020, 8890], [12, 98])),
  ADD(201, 2, "Attention aux retenues : il peut y en avoir plusieurs.", () => qAddSit([10050, 58990], [1205, 39980], (k) => k >= 2)),
  ADD(202, 2, "Un nombre plus court : aligne son dernier chiffre sous les unités.", () => qAddAligne([10200, 89900], [105, 989])),
  ADD(203, 2, "Additionne les trois nombres colonne par colonne, sans oublier les retenues.", () => qAdd3([1020, 4890])),
  ADD(204, 2, "Pose l'addition : commence par les unités et reporte les retenues.", () => qAddNu([10200, 79900], [1020, 19990], (k) => k >= 2)),
  ADD(301, 3, "Refais l'addition toi-même, colonne par colonne.", () => {
    const sorte = un(["juste", "oubli", "oubli", "tout", "tout", "aligne"] as const);
    const [a, b] = sorte === "aligne"
      ? tirer(() => [entre(10200, 89900), entre(105, 989)], ([x, y]) => nbRetenuesAdd([x, y]) >= 1)
      : tirer(() => [entre(10500, 68900), entre(2050, 29800)], ([x, y]) => nbRetenuesAdd([x, y]) >= 2 && String(addToutEcrit([x, y])).length <= 7);
    const s = a + b;
    const R = sorte === "juste" ? s : sorte === "oubli" ? addSansRetenue([a, b]) : sorte === "tout" ? addToutEcrit([a, b]) : a + b * 10;
    const p = perso();
    const I = cap(p.il);
    const C = {
      juste: "C'est juste.",
      oubli: `${I} a oublié une retenue.`,
      tout: `${I} a écrit la somme d'une colonne en entier, sans retenue.`,
      aligne: `${I} n'a pas aligné les unités.`,
    };
    return {
      text: phrase(`${p.nom} a posé ${fr(a)} + ${fr(b)} et a trouvé ${fr(R)}.`, un(REGARDE)),
      ...qcm(C[sorte], Object.values(C)),
      explanation: etapes("on refait l'addition posée, colonne par colonne, en reportant chaque retenue.", detailAdd([a, b]), `${fr(a)} + ${fr(b)} = ${fr(s)}${R === s ? " : c'est juste" : `, et non ${fr(R)}`}.`),
      ...(sorte === "aligne" ? {} : { canvas: pose("addition", [String(a), String(b)], { resultat: String(R), label: `Le calcul ${de(p.nom)}` }) }),
    };
  }),
  ADD(302, 3, "Pose l'addition : plusieurs retenues t'attendent.", () => qAddSit([105000, 589900], [12050, 299800], (k) => k >= 3)),
  ADD(303, 3, "Trois grands nombres : additionne colonne par colonne, retenues comprises.", () => qAdd3([10200, 39800])),
  ADD(304, 3, "Retrouve le chiffre caché : refais la colonne avec sa retenue.", () => {
    const [a, b] = tirer(() => [entre(10500, 68900), entre(2050, 29800)], ([x, y]) => nbRetenuesAdd([x, y]) >= 2);
    const s = a + b;
    const S = String(s);
    // Le chiffre demandé : celui d'une colonne qui reçoit une retenue.
    const D = [rangs(a), rangs(b)];
    const avecRet = [1, 2, 3].filter((i) => (D[0][i - 1] ?? 0) + (D[1][i - 1] ?? 0) >= 10 && i < S.length);
    const i = avecRet.length ? un(avecRet) : 1;
    const juste = rangs(s)[i];
    const sansRet = ((D[0][i] ?? 0) + (D[1][i] ?? 0)) % 10;
    return {
      text: phrase(`On pose ${fr(a)} + ${fr(b)}.`, un([`Quel est le chiffre des ${RANGS[i]} du résultat ?`, `Quel chiffre écrit-on dans la colonne des ${RANGS[i]} ?`, `Dans le résultat, quel est le chiffre des ${RANGS[i]} ?`])),
      ...qcm(String(juste), [String(sansRet), String((juste + 1) % 10), String((juste + 9) % 10), String(rangs(s)[i + 1] ?? (juste + 2) % 10)]),
      explanation: etapes("on additionne colonne par colonne depuis les unités, sans oublier la retenue qui arrive de la colonne d'avant.", detailAdd([a, b]), `Le chiffre des ${RANGS[i]} est ${juste}.`),
      canvas: pose("addition", [String(a), String(b)], { col: Math.max(String(a).length, String(b).length) - 1 - i, label: `La colonne des ${RANGS[i]}` }),
    };
  }),
];

/* ═════════════════════ SOUSTRACTION POSÉE (★1 ★3) ═════════════════════ */

const SUB = atelier("cm2", "calcul", "calcul_soustraction_posee", "cm2_");

type SitSub = { m?: Metier; quoi: string; u?: string; max: number; phr: (p: Perso, a: string, b: string) => string };
const SIT_SUB: readonly SitSub[] = [
  { m: ["libraire", "libraire"], quoi: "livres", max: 9999, phr: (p, a, b) => `${p.txt} a ${a} livres en stock et en vend ${b}.` },
  { m: ["boulangère", "boulanger"], quoi: "croissants", max: 9999, phr: (p, a, b) => `${p.txt} prépare ${a} croissants pour un salon et en vend ${b}.` },
  { m: ["cycliste", "cycliste"], quoi: "kilomètres", u: "km", max: 99999, phr: (p, a, b) => `${p.txt} veut parcourir ${a} dans l'année et a déjà roulé ${b}.` },
  { m: ["agricultrice", "agriculteur"], quoi: "kilogrammes", u: "kg", max: 99999, phr: (p, a, b) => `${p.txt} récolte ${a} de pommes et en vend ${b}.` },
  { quoi: "points", max: 999999, phr: (p, a, b) => `Dans un jeu vidéo, ${p.nom} a ${a} points et en perd ${b} dans un piège.` },
  { m: ["pilote", "pilote"], quoi: "kilomètres", u: "km", max: 999999, phr: (p, a, b) => `${p.txt} doit voler ${a} cette année et en a déjà parcouru ${b}.` },
  { m: ["fleuriste", "fleuriste"], quoi: "roses", max: 9999, phr: (p, a, b) => `${p.txt} reçoit ${a} roses et en vend ${b}.` },
  { m: ["randonneuse", "randonneur"], quoi: "mètres", u: "m", max: 99999, phr: (p, a, b) => `${p.txt} suit un sentier de ${a} et en a déjà marché ${b}.` },
  { quoi: "places", max: 99999, phr: (_p, a, b) => `Un stade a ${a} places ; ${b} sont déjà occupées.` },
  { m: ["imprimeuse", "imprimeur"], quoi: "feuilles", max: 99999, phr: (p, a, b) => `${p.txt} a ${a} feuilles et en utilise ${b}.` },
  { quoi: "euros", u: "€", max: 99999, phr: (p, a, b) => `${p.nom} a ${a} sur son compte et dépense ${b}.` },
  { m: ["jardinière", "jardinier"], quoi: "litres", u: "L", max: 99999, phr: (p, a, b) => `Une citerne contient ${a} d'eau ; ${p.txt} en utilise ${b} pour arroser.` },
  { m: ["livreuse", "livreur"], quoi: "colis", max: 99999, phr: (p, a, b) => `${p.txt} doit livrer ${a} colis dans le mois ; ${p.il} en a déjà livré ${b}.` },
  { m: ["vétérinaire", "vétérinaire"], quoi: "doses", max: 9999, phr: (p, a, b) => `${p.txt} reçoit ${a} doses de vaccin et en utilise ${b}.` },
  { m: ["couturière", "couturier"], quoi: "centimètres", u: "cm", max: 99999, phr: (p, a, b) => `${p.txt} a un rouleau de ${a} de tissu et en coupe ${b}.` },
  { quoi: "habitants", max: 999999, phr: (_p, a, b) => `Une ville comptait ${a} habitants ; ${b} sont partis vivre ailleurs.` },
  { m: ["youtubeuse", "youtubeur"], quoi: "abonnés", max: 999999, phr: (p, a, b) => `${p.txt} vise ${a} abonnés et en a déjà ${b}.` },
  { m: ["informaticienne", "informaticien"], quoi: "fichiers", max: 999999, phr: (p, a, b) => `${p.txt} doit copier ${a} fichiers ; ${b} sont déjà copiés.` },
  { quoi: "pages", max: 9999, phr: (p, a, b) => `Une encyclopédie a ${a} pages ; ${p.nom} en a déjà lu ${b}.` },
  { m: ["marchande", "marchand"], quoi: "letchis", max: 9999, phr: (p, a, b) => `${p.txt} apporte ${a} letchis au marché de Saint-Pierre et en vend ${b}.` },
];
const Q_RESTE = (quoi: string) => [`Combien ${de(quoi)} reste-t-il ?`, "Combien en reste-t-il ?", `Quel nombre ${de(quoi)} reste-t-il ?`, "Pose la soustraction : combien en reste-t-il ?"];
const PRE_SUB = ["", "Pose la soustraction.", "Pose en colonnes.", "Le plus grand nombre en haut.", "Commence par les unités."];

const leurresSub = (a: number, b: number) => [subPetitDuGrand(a, b), subSansRetenue(a, b)];
const voisinsSub = (r: number) => [r + 10, r - 10, r + 100, r - 100, r + 1000];
const expSub = (a: number, b: number) =>
  etapes(
    "on pose le grand nombre en haut, unités sous unités, et on commence par les unités ; si le chiffre du haut est trop petit, on lui ajoute une dizaine et on retient 1 pour la colonne suivante.",
    `${fr(a)} − ${fr(b)} = ${fr(a - b)}.`,
    `Vérification : ${fr(a - b)} + ${fr(b)} = ${fr(a)}.`,
  );

function qSubNu(ra: [number, number], rb: [number, number], ok: (a: number, b: number) => boolean): Q {
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => x - y > 10 && ok(x, y));
  const r = a - b;
  return {
    text: phrase(un(PRE_SUB), un(CALCULE(`${fr(a)} − ${fr(b)}`))),
    ...qcmF(r, leurresSub(a, b), avec(), 10, voisinsSub(r)),
    explanation: expSub(a, b),
    canvas: pose("soustraction", [String(a), String(b)]),
  };
}
function qSubSit(ra: [number, number], rb: [number, number], ok: (a: number, b: number) => boolean): Q {
  const s0 = un(SIT_SUB.filter((s) => s.max >= ra[1]));
  const p = perso(s0.m);
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => x - y > 10 && ok(x, y));
  const r = a - b;
  const e = avec(s0.u);
  return {
    text: phrase(s0.phr(p, e(a), e(b)), un(Q_RESTE(s0.quoi))),
    ...qcmF(r, [...leurresSub(a, b), a + b], e, 10, voisinsSub(r)),
    explanation: expSub(a, b),
    canvas: pose("soustraction", [String(a), String(b)]),
  };
}
const aDesZeros = (a: number) => /0/.test(String(a).slice(1));

/** Comparer : l'écart entre deux quantités. */
type SitEcart = { quoi: string; u?: string; phr: (p: Perso, q: Perso, a: string, b: string) => string; qs: (p: Perso, q: Perso) => string[] };
const SIT_ECART: readonly SitEcart[] = [
  { quoi: "points", phr: (p, q, a, b) => `À un jeu vidéo, ${p.nom} a ${a} points et ${q.nom} ${b} points.`, qs: (p, q) => [`Combien de points ${p.nom} a-t-${p.il} de plus ${que(q.nom)} ?`, "Quel est l'écart entre leurs scores ?"] },
  { quoi: "abonnés", phr: (p, q, a, b) => `${p.nom} a ${a} abonnés et ${q.nom} en a ${b}.`, qs: (p, q) => [`Combien d'abonnés ${p.nom} a-t-${p.il} de plus ${que(q.nom)} ?`, `Combien d'abonnés manque-t-il à ${q.nom} pour en avoir autant ${que(p.nom)} ?`] },
  { quoi: "mètres", u: "m", phr: (_p, _q, a, b) => `Un avion vole à ${a} d'altitude, un hélicoptère à ${b}.`, qs: () => ["Quel est l'écart d'altitude ?", "De combien de mètres l'avion vole-t-il plus haut ?"] },
  { quoi: "habitants", phr: (_p, _q, a, b) => `Une ville compte ${a} habitants, sa voisine ${b}.`, qs: () => ["Combien d'habitants de plus dans la première ville ?", "Quel est l'écart entre les deux villes ?"] },
  { quoi: "kilogrammes", u: "kg", phr: (_p, _q, a, b) => `Un camion chargé pèse ${a}, une camionnette chargée ${b}.`, qs: () => ["De combien de kilogrammes le camion est-il plus lourd ?", "Quelle est la différence de masse ?"] },
  { quoi: "pas", phr: (p, q, a, b) => `En une semaine, ${p.nom} fait ${a} pas et ${q.nom} ${b} pas.`, qs: (p, q) => [`Combien de pas ${p.nom} a-t-${p.il} faits de plus ${que(q.nom)} ?`, "Quel est l'écart entre leurs nombres de pas ?"] },
  { quoi: "euros", u: "€", phr: (_p, _q, a, b) => `Une voiture coûte ${a} et une moto ${b}.`, qs: () => ["Combien la voiture coûte-t-elle de plus ?", "Quelle est la différence de prix ?"] },
  { quoi: "spectateurs", phr: (_p, _q, a, b) => `Un festival attire ${a} spectateurs, un match ${b}.`, qs: () => ["Combien de spectateurs de plus au festival ?", "Quel est l'écart entre les deux publics ?"] },
  { quoi: "kilomètres", u: "km", phr: (_p, _q, a, b) => `Une pilote vole ${a} une année et ${b} l'année suivante.`, qs: () => ["Combien de kilomètres de plus la première année ?", "Quel est l'écart entre les deux distances ?"] },
  { quoi: "vues", phr: (p, _q, a, b) => `La vidéo ${de(p.nom)} fait ${a} vues ; celle de son frère ${b}.`, qs: () => ["Combien de vues de plus pour la vidéo la plus vue ?", "Quelle est la différence de vues ?"] },
  { quoi: "livres", phr: (_p, _q, a, b) => `La médiathèque a ${a} livres, la bibliothèque de l'école ${b}.`, qs: () => ["Combien de livres de plus à la médiathèque ?", "Quelle est la différence ?"] },
];

const SUB_ITEMS: TutorBankItemV4[] = [
  SUB(101, 1, "Pose la soustraction : le plus grand nombre en haut, unités sous unités.", () => qSubNu([2205, 9899], [102, 1989], (a, b) => nbRetenuesSub(a, b) <= 1)),
  SUB(102, 1, "Pose la soustraction en alignant les unités.", () => qSubSit([2205, 8999], [105, 1999], (a, b) => nbRetenuesSub(a, b) <= 1)),
  SUB(103, 1, "Si le chiffre du haut est trop petit, ajoute-lui une dizaine et retiens 1.", () => {
    const [a, b] = tirer(() => [entre(2301, 9989), entre(102, 1989)], ([x, y]) => x % 10 < y % 10 && x - y > 50);
    const x = a % 10;
    const y = b % 10;
    const juste = `Je calcule ${x + 10} − ${y} = ${x + 10 - y} et je retiens 1.`;
    return {
      text: phrase(
        `On pose ${fr(a)} − ${fr(b)}.`,
        un([`Aux unités, on ne peut pas enlever ${y} à ${x}.`, `Aux unités : ${x} − ${y}, c'est impossible.`, `Colonne des unités : ${x} est plus petit que ${y}.`]),
        un(["Que fais-tu ?", "Comment fais-tu ?", "Quelle est la bonne façon de faire ?", "Qu'écris-tu ?"]),
      ),
      ...qcm(juste, [`Je calcule ${y} − ${x} = ${y - x}.`, `J'écris 0 aux unités.`, `Je calcule ${x + 10} − ${y} = ${x + 10 - y} et je ne retiens rien.`]),
      explanation: etapes("on ajoute une dizaine au chiffre du haut, et on retient 1 qu'on ajoute au chiffre des dizaines du bas.", `${x + 10} − ${y} = ${x + 10 - y}.`, juste),
      canvas: pose("soustraction", [String(a), String(b)], { col: String(a).length - 1, label: "La colonne des unités" }),
    };
  }),
  SUB(104, 1, "Une soustraction se vérifie par une addition.", () => {
    const [a, b] = tirer(() => [entre(2310, 9890), entre(120, 1990)], ([x, y]) => x - y > 50 && nbRetenuesSub(x, y) >= 1);
    const r = a - b;
    const p = perso();
    const juste = `${fr(r)} + ${fr(b)}`;
    return {
      text: phrase(`${p.nom} a calculé ${fr(a)} − ${fr(b)} = ${fr(r)}.`, un(["Quel calcul permet de vérifier ?", "Comment vérifier son résultat ?", "Quelle addition sert à vérifier ?", "Quelle opération prouve que c'est juste ?"])),
      ...qcm(juste, [`${fr(r)} − ${fr(b)}`, `${fr(a)} + ${fr(b)}`, `${fr(r)} + ${fr(a)}`]),
      explanation: etapes("si on rajoute ce qu'on a enlevé au résultat, on doit retrouver le nombre du départ.", `${fr(r)} + ${fr(b)} = ${fr(a)}.`, `On vérifie avec ${juste}.`),
      canvas: pose("soustraction", [String(a), String(b)], { resultat: String(r), label: `Le calcul ${de(p.nom)}` }),
    };
  }),
  SUB(301, 3, "Attention aux zéros : on ajoute une dizaine et on retient 1.", () => qSubSit([10002, 90900], [1205, 49800], (a, b) => aDesZeros(a) && nbRetenuesSub(a, b) >= 2)),
  SUB(302, 3, "Pour trouver un écart, on soustrait le plus petit nombre du plus grand.", () => {
    const s0 = un(SIT_ECART);
    const p = perso();
    const q = perso(undefined, p.nom);
    const [a, b] = tirer(() => [entre(10310, 98900), entre(1120, 59990)], ([x, y]) => x - y > 500 && nbRetenuesSub(x, y) >= 2);
    const r = a - b;
    const e = avec(s0.u);
    return {
      text: phrase(s0.phr(p, q, e(a), e(b)), un(s0.qs(p, q))),
      ...qcmF(r, [a + b, ...leurresSub(a, b)], e, 10, voisinsSub(r)),
      explanation: expSub(a, b),
      canvas: pose("soustraction", [String(a), String(b)]),
    };
  }),
  SUB(303, 3, "Refais la soustraction toi-même, colonne par colonne.", () => {
    const sorte = un(["juste", "petit", "petit", "oubli", "oubli", "plus"] as const);
    const [a, b] = tirer(() => [entre(10200, 98900), entre(2050, 49800)], ([x, y]) => x - y > 100 && nbRetenuesSub(x, y) >= 2);
    const r = a - b;
    const R = sorte === "juste" ? r : sorte === "petit" ? subPetitDuGrand(a, b) : sorte === "oubli" ? subSansRetenue(a, b) : a + b;
    const p = perso();
    const I = cap(p.il);
    const C = {
      juste: "C'est juste.",
      petit: `${I} a enlevé le petit chiffre du grand dans une colonne.`,
      oubli: `${I} a oublié de reporter une retenue.`,
      plus: `${I} a additionné au lieu de soustraire.`,
    };
    return {
      text: phrase(`${p.nom} a posé ${fr(a)} − ${fr(b)} et a trouvé ${fr(R)}.`, un(REGARDE)),
      ...qcm(C[sorte], Object.values(C)),
      explanation: etapes("on refait la soustraction et on vérifie par une addition.", `${fr(a)} − ${fr(b)} = ${fr(r)} ; ${fr(r)} + ${fr(b)} = ${fr(a)}.`, R === r ? "C'est juste." : `Le bon résultat est ${fr(r)}, et non ${fr(R)}.`),
      canvas: pose("soustraction", [String(a), String(b)], { resultat: String(R), label: `Le calcul ${de(p.nom)}` }),
    };
  }),
  SUB(304, 3, "Des zéros en haut : chaque colonne demande une retenue.", () => {
    const [a, b] = tirer(() => [entre(1, 9) * 10000 + un([0, 0, 100 * entre(1, 9), 10 * entre(1, 9), 1000 * entre(1, 9)]), entre(1205, 8980)], ([x, y]) => x - y > 500 && nbRetenuesSub(x, y) >= 3);
    const r = a - b;
    return {
      text: phrase(un(["Attention aux zéros.", "Pose la soustraction.", "Des zéros en haut : attention aux retenues.", ""]), un(CALCULE(`${fr(a)} − ${fr(b)}`))),
      ...qcmF(r, leurresSub(a, b), avec(), 10, voisinsSub(r)),
      explanation: expSub(a, b),
      canvas: pose("soustraction", [String(a), String(b)]),
    };
  }),
  SUB(305, 3, "De grands nombres : reporte toutes les retenues.", () => qSubSit([105000, 989000], [12050, 498000], (a, b) => nbRetenuesSub(a, b) >= 3)),
];

/* ═════════════════════ DÉCIMAUX : ADDITION ET SOUSTRACTION (★2 ★3) ═════════════════════ */

const DAD = atelier("cm2", "calcul", "calcul_decimal_addition", "cm2_");
const DSU = atelier("cm2", "calcul", "calcul_decimal_soustraction", "cm2_");

/** `mil` : l'unité supporte les millièmes (kg → g, km → m, L → mL, m → mm). */
type SitDec = { m?: Metier; u: string; mil?: true; phr: (p: Perso, a: string, b: string) => string; qs: (p: Perso) => string[] };
const SIT_DEC_ADD: readonly SitDec[] = [
  { m: ["couturière", "couturier"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} coud un ruban de ${a} au bout d'un ruban de ${b}.`, qs: (p) => [`Quelle longueur obtient-${p.il} ?`, "Combien mesure le ruban en tout ?"] },
  { m: ["athlète", "athlète"], u: "km", mil: true, phr: (p, a, b) => `${p.txt} court ${a} le matin et ${b} le soir.`, qs: (p) => [`Quelle distance court-${p.il} dans la journée ?`, "Combien de kilomètres en tout ?"] },
  { m: ["jardinière", "jardinier"], u: "L", mil: true, phr: (p, a, b) => `${p.txt} verse ${a} d'eau, puis ${b}, dans un bac.`, qs: () => ["Combien de litres y a-t-il dans le bac ?", "Quelle quantité d'eau a-t-on versée en tout ?"] },
  { m: ["primeuse", "primeur"], u: "kg", mil: true, phr: (p, a, b) => `${p.txt} pèse ${a} de pommes et ${b} de poires.`, qs: () => ["Quelle masse de fruits en tout ?", "Combien pèsent les fruits ensemble ?"] },
  { m: ["menuisière", "menuisier"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} met bout à bout une planche de ${a} et une planche de ${b}.`, qs: () => ["Quelle longueur obtient-on ?", "Combien mesurent les deux planches ensemble ?"] },
  { u: "m", phr: (p, a, b) => `Au saut en longueur, ${p.nom} saute ${a} au premier essai et ${b} au second.`, qs: () => ["Quelle longueur au total ?", "Combien de mètres en ajoutant les deux sauts ?"] },
  { m: ["postière", "postier"], u: "kg", mil: true, phr: (p, a, b) => `${p.txt} pèse un colis de ${a} et un colis de ${b}.`, qs: () => ["Combien pèsent-ils ensemble ?", "Quelle est la masse totale ?"] },
  { m: ["randonneuse", "randonneur"], u: "km", mil: true, phr: (p, a, b) => `${p.txt} marche ${a} avant la pause et ${b} après.`, qs: (p) => [`Quelle distance a-t-${p.il} parcourue ?`, "Combien de kilomètres en tout ?"] },
  { m: ["cuisinière", "cuisinier"], u: "L", mil: true, phr: (p, a, b) => `${p.txt} mélange ${a} de lait et ${b} de crème.`, qs: () => ["Quel volume obtient-on ?", "Combien de litres de mélange ?"] },
  { u: "cm", phr: (p, a, b) => `La plante ${de(p.nom)} mesure ${a} ; elle grandit encore de ${b}.`, qs: () => ["Combien mesure-t-elle maintenant ?", "Quelle est sa nouvelle taille ?"] },
  { m: ["nageuse", "nageur"], u: "km", mil: true, phr: (p, a, b) => `${p.txt} nage ${a} lundi et ${b} mercredi.`, qs: (p) => [`Quelle distance nage-t-${p.il} en tout ?`, "Combien de kilomètres au total ?"] },
  { m: ["maçonne", "maçon"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} construit un mur de ${a}, puis le prolonge de ${b}.`, qs: () => ["Quelle longueur fait le mur maintenant ?", "Combien mesure le mur en tout ?"] },
  { m: ["pharmacienne", "pharmacien"], u: "kg", mil: true, phr: (p, a, b) => `${p.txt} reçoit un carton de ${a} et un carton de ${b}.`, qs: () => ["Quelle est la masse des deux cartons ?", "Combien pèsent-ils en tout ?"] },
  { m: ["chimiste", "chimiste"], u: "L", mil: true, phr: (p, a, b) => `${p.txt} verse ${a} d'un liquide et ${b} d'un autre dans une cuve.`, qs: () => ["Quel volume y a-t-il dans la cuve ?", "Combien de litres en tout ?"] },
];
const OBJ_PRIX: readonly (readonly [string, number, number])[] = [
  ["un livre", 5, 19], ["un cahier", 1, 4], ["une trousse", 3, 12], ["un ballon", 6, 25], ["une gourde", 4, 15], ["un jeu de cartes", 2, 9],
  ["un puzzle", 8, 29], ["une boîte de crayons", 3, 11], ["un T-shirt", 7, 24], ["une place de cinéma", 6, 12], ["un pot de peinture", 4, 16],
  ["un bouquet de fleurs", 9, 28], ["une tarte", 8, 22], ["un sandwich", 3, 7], ["une BD", 9, 18], ["un casque audio", 15, 49], ["une raquette", 12, 39], ["un jeu de société", 14, 45],
];
/** Un prix en millièmes, avec des centimes non ronds. */
const prix = (o: readonly [string, number, number]) => tirer(() => 50 * entre(o[1] * 20, o[2] * 20), (c) => decimales(c) === 2);

function qDecAddMes(da: 0 | 1 | 2 | 3, db: 0 | 1 | 2 | 3): Q {
  const s0 = un(SIT_DEC_ADD.filter((s) => (da < 3 && db < 3) || s.mil));
  const p = perso(s0.m);
  const [ca, cb] = tirer(() => (Math.random() < 0.5 ? [decimal(1, 29, da), decimal(0, 9, db)] : [decimal(0, 9, db), decimal(1, 29, da)]), ([x, y]) => x > 0 && y > 0);
  const { r, leurres, poses } = opDec(ca, cb, 1);
  const e = (c: number) => `${frM(c)} ${s0.u}`;
  return {
    text: phrase(s0.phr(p, e(ca), e(cb)), un(s0.qs(p))),
    ...qcmF(r / 1000, leurres.map((c) => c / 1000), avec(s0.u), pasDe(r), [r / 1000 + 1, r / 1000 - 1, r / 1000 + 0.1]),
    explanation: expDec(ca, cb, 1),
    canvas: pose("addition", poses),
  };
}

const DAD_ITEMS: TutorBankItemV4[] = [
  DAD(201, 2, "Aligne les virgules : dixièmes sous dixièmes. 10 dixièmes font 1 unité.", () => {
    const [ca, cb] = tirer(() => [decimal(1, 99, 1), decimal(1, 49, 1)], ([x, y]) => (x % 1000) + (y % 1000) >= 1000);
    const { r, leurres, poses } = opDec(ca, cb, 1);
    return {
      text: phrase(un(["", "Pose l'addition.", "Aligne les virgules.", "Pose en colonnes."]), un(CALCULE(`${frM(ca)} + ${frM(cb)}`))),
      ...qcmF(r / 1000, leurres.map((c) => c / 1000), avec(), 0.1, [r / 100, r / 1000 + 1]),
      explanation: expDec(ca, cb, 1),
      canvas: pose("addition", poses),
    };
  }),
  DAD(202, 2, "Des prix : deux chiffres après la virgule, les centimes. 100 centimes font 1 euro.", () => {
    const o1 = un(OBJ_PRIX);
    const o2 = un(OBJ_PRIX.filter((o) => o !== o1));
    const p = perso();
    const [ca, cb] = tirer(() => [prix(o1), prix(o2)], ([x, y]) => (x % 1000) + (y % 1000) >= 1000);
    const r = ca + cb;
    const A = enEntiers(ca, 2);
    const B = enEntiers(cb, 2);
    return {
      text: phrase(
        un([`${p.nom} achète ${o1[0]} à ${euro(ca / 1000)} et ${o2[0]} à ${euro(cb / 1000)}.`, `Au magasin, ${o1[0]} coûte ${euro(ca / 1000)} et ${o2[0]} ${euro(cb / 1000)}.`, `${p.nom} prend ${o1[0]} (${euro(ca / 1000)}) et ${o2[0]} (${euro(cb / 1000)}).`]),
        un([`Combien paie-t-${p.il} en tout ?`, "Quel est le prix total ?", "Combien cela coûte-t-il ensemble ?", "Quelle somme faut-il payer ?"]),
      ),
      ...qcmF(r / 1000, [addSansRetenue([A, B]) / 100, (r - 1000) / 1000, (r + 100) / 1000], euro, 0.1),
      explanation: expDec(ca, cb, 1),
      canvas: pose("addition", [poseM(ca, 2), poseM(cb, 2)]),
    };
  }),
  DAD(203, 2, "Aligne les virgules, même quand les nombres n'ont pas autant de chiffres après la virgule.", () => qDecAddMes(un([1, 2] as const), un([1, 1, 2] as const))),
  DAD(204, 2, "Un dixième sous un dixième : complète par des zéros si besoin.", () => {
    const sorte = un(["d1d2", "d0d1", "d0d2", "d1d2"] as const);
    const [ca, cb] = sorte === "d1d2" ? [decimal(1, 79, 1), decimal(0, 9, 2)] : sorte === "d0d1" ? [decimal(2, 99, 0), decimal(0, 19, 1)] : [decimal(2, 99, 0), decimal(0, 19, 2)];
    const [x, y] = Math.random() < 0.5 ? [ca, cb] : [cb, ca];
    const { r, leurres, poses } = opDec(x, y, 1);
    return {
      text: phrase(un(["Attention aux virgules.", "Aligne bien les virgules.", "Pose l'addition.", ""]), un(CALCULE(`${frM(x)} + ${frM(y)}`))),
      ...qcmF(r / 1000, leurres.map((c) => c / 1000), avec(), pasDe(r), [r / 1000 + 1]),
      explanation: expDec(x, y, 1),
      canvas: pose("addition", poses),
    };
  }),
  DAD(301, 3, "Des millièmes : trois chiffres après la virgule. Aligne les virgules et complète par des zéros.", () => qDecAddMes(3, un([1, 2, 3] as const))),
  DAD(302, 3, "Refais l'addition en alignant les virgules.", () => {
    const sorte = un(["juste", "aligne", "aligne", "parts", "parts", "oubli"] as const);
    const [ca, cb] = sorte === "aligne"
      ? tirer(() => [decimal(1, 29, 1), decimal(0, 9, un([2, 3] as const))], ([x, y]) => y > 0 && malAligne(x, y, 1) !== x + y)
      : tirer(() => [decimal(1, 29, un([1, 2] as const)), decimal(1, 9, 1)], ([x, y]) => partsSeparees(x, y) !== null && nbRetenuesAdd([enEntiers(x, 2), enEntiers(y, 2)]) >= 1);
    const r = ca + cb;
    const p = Math.max(decimales(ca), decimales(cb));
    const R = sorte === "juste" ? r : sorte === "aligne" ? malAligne(ca, cb, 1) : sorte === "parts" ? (partsSeparees(ca, cb) ?? r) : deEntiers(addSansRetenue([enEntiers(ca, p), enEntiers(cb, p)]), p);
    const juste = R === r ? "juste" : sorte;
    const q = perso();
    const I = cap(q.il);
    const C = {
      juste: "C'est juste.",
      aligne: `${I} n'a pas aligné les virgules.`,
      parts: `${I} a additionné les parties entières, puis les parties décimales, chacune à part.`,
      oubli: `${I} a oublié une retenue.`,
    };
    return {
      text: phrase(`${q.nom} a calculé ${frM(ca)} + ${frM(cb)} et a trouvé ${frM(R)}.`, un(REGARDE)),
      ...qcm(C[juste], Object.values(C)),
      explanation: expDec(ca, cb, 1),
      canvas: sorte === "aligne"
        ? pose("addition", [frM(ca), frM(cb)], { resultat: frM(R), label: `La pose ${de(q.nom)}` })
        : sorte === "parts"
          ? pose("addition", [poseM(ca, p), poseM(cb, p)])
          : pose("addition", [poseM(ca, p), poseM(cb, p)], { resultat: poseM(R, p), label: `Le calcul ${de(q.nom)}` }),
    };
  }),
  DAD(303, 3, "Trois prix : aligne les trois virgules.", () => {
    const os = melange([...OBJ_PRIX]).slice(0, 3);
    const p = perso();
    const cs = tirer(() => os.map(prix), (t) => nbRetenuesAdd(t.map((c) => enEntiers(c, 2))) >= 2);
    const r = cs.reduce((t, x) => t + x, 0);
    return {
      text: phrase(`${p.nom} achète ${os[0][0]} à ${euro(cs[0] / 1000)}, ${os[1][0]} à ${euro(cs[1] / 1000)} et ${os[2][0]} à ${euro(cs[2] / 1000)}.`, un([`Combien paie-t-${p.il} ?`, "Quel est le prix total ?", `Quelle somme dépense-t-${p.il} ?`, "Combien coûtent les trois achats ?"])),
      ...qcmF(r / 1000, [addSansRetenue(cs.map((c) => enEntiers(c, 2))) / 100, (r - 1000) / 1000, (r + 1000) / 1000], euro, 0.1),
      explanation: etapes("on aligne les virgules des trois prix et on additionne colonne par colonne, en commençant par les centimes.", `${cs.map((c) => poseM(c, 2)).join(" + ")} = ${poseM(r, 2)}.`, `Le total est ${euro(r / 1000)}.`),
      canvas: pose("addition", cs.map((c) => poseM(c, 2))),
    };
  }),
  DAD(304, 3, "Un nombre entier a une virgule cachée : 7 = 7,000. Aligne les virgules.", () => {
    const sorte = un(["d0d3", "d1d3", "d2d3", "d0d3"] as const);
    const [ca, cb] = sorte === "d0d3" ? [decimal(2, 99, 0), decimal(0, 9, 3)] : sorte === "d1d3" ? [decimal(1, 49, 1), decimal(0, 9, 3)] : [decimal(1, 49, 2), decimal(0, 9, 3)];
    const [x, y] = Math.random() < 0.5 ? [ca, cb] : [cb, ca];
    const { r, leurres, poses } = opDec(x, y, 1);
    return {
      text: phrase(un(["Attention aux virgules.", "Aligne bien les virgules.", "Pose l'addition.", "Complète par des zéros.", ""]), un(CALCULE(`${frM(x)} + ${frM(y)}`))),
      ...qcmF(r / 1000, leurres.map((c) => c / 1000), avec(), 0.001, [r / 1000 + 1, r / 1000 + 0.1]),
      explanation: expDec(x, y, 1),
      canvas: pose("addition", poses),
    };
  }),
];

type SitDecSub = { m?: Metier; u: string; mil?: true; phr: (p: Perso, a: string, b: string) => string; qs: (p: Perso) => string[] };
const SIT_DEC_SUB: readonly SitDecSub[] = [
  { m: ["couturière", "couturier"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} a un ruban de ${a} et en coupe ${b}.`, qs: () => ["Quelle longueur de ruban reste-t-il ?", "Combien mesure le morceau qui reste ?"] },
  { m: ["jardinière", "jardinier"], u: "L", mil: true, phr: (p, a, b) => `Le bac contient ${a} d'eau ; ${p.txt} en verse ${b} sur les tomates.`, qs: () => ["Combien de litres reste-t-il ?", "Quelle quantité d'eau reste dans le bac ?"] },
  { m: ["primeuse", "primeur"], u: "kg", mil: true, phr: (p, a, b) => `${p.txt} a ${a} de cerises et en vend ${b}.`, qs: () => ["Quelle masse de cerises lui reste-t-il ?", "Combien de kilogrammes reste-t-il ?"] },
  { m: ["menuisière", "menuisier"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} scie ${b} d'une planche de ${a}.`, qs: () => ["Quelle longueur reste-t-il ?", "Combien mesure la chute ?"] },
  { m: ["cycliste", "cycliste"], u: "km", mil: true, phr: (p, a, b) => `${p.txt} doit parcourir ${a} ; ${p.il} a déjà roulé ${b}.`, qs: () => ["Combien de kilomètres lui reste-t-il ?", "Quelle distance reste à parcourir ?"] },
  { m: ["cuisinière", "cuisinier"], u: "L", mil: true, phr: (p, a, b) => `${p.txt} a ${a} de lait et en utilise ${b} pour une crème.`, qs: () => ["Combien de lait reste-t-il ?", "Quelle quantité de lait reste-t-il ?"] },
  { m: ["peintre", "peintre"], u: "L", mil: true, phr: (p, a, b) => `${p.txt} a un pot de ${a} de peinture et en utilise ${b}.`, qs: () => ["Combien de litres reste-t-il ?", "Quelle quantité de peinture reste-t-il ?"] },
  { m: ["boulangère", "boulanger"], u: "kg", mil: true, phr: (p, a, b) => `${p.txt} a un sac de ${a} de farine et en prend ${b} pour le pain.`, qs: () => ["Combien de farine reste-t-il ?", "Quelle masse de farine reste dans le sac ?"] },
  { u: "m", mil: true, phr: (p, a, b) => `Une corde mesure ${a}. ${p.nom} en coupe ${b} pour une balançoire.`, qs: () => ["Quelle longueur de corde reste-t-il ?", "Combien mesure le reste de la corde ?"] },
  { m: ["livreuse", "livreur"], u: "kg", mil: true, phr: (p, a, b) => `Le camion ${de(p.nom)} transporte ${a} ; on décharge ${b}.`, qs: () => ["Quelle masse reste dans le camion ?", "Combien de kilogrammes reste-t-il ?"] },
  { m: ["électricienne", "électricien"], u: "m", mil: true, phr: (p, a, b) => `${p.txt} a ${a} de câble et en pose ${b} dans une maison.`, qs: () => ["Quelle longueur de câble lui reste-t-il ?", "Combien de mètres reste-t-il ?"] },
  { u: "cm", phr: (p, a, b) => `Un crayon neuf mesure ${a} ; ${p.nom} en use ${b} en le taillant.`, qs: () => ["Combien mesure-t-il maintenant ?", "Quelle longueur reste-t-il ?"] },
];
type SitEcartDec = { u: string; premierPlusGrand: boolean; plage: [number, number]; phr: (p: Perso, q: Perso, a: string, b: string) => string; qs: (p: Perso, q: Perso) => string[] };
const SIT_ECART_DEC: readonly SitEcartDec[] = [
  { u: "m", premierPlusGrand: true, plage: [1500, 4800], phr: (p, q, a, b) => `Au saut en longueur, ${p.nom} saute ${a} et ${q.nom} ${b}.`, qs: (p) => [`De combien ${p.nom} a-t-${p.il} sauté plus loin ?`, "Quel est l'écart entre les deux sauts ?"] },
  { u: "m", premierPlusGrand: false, plage: [1120, 1950], phr: (p, _q, a, b) => `${p.nom} mesure ${a} et son père ${b}.`, qs: (p) => [`De combien son père est-il plus grand ${que(p.nom)} ?`, "Quelle est la différence de taille ?"] },
  { u: "kg", premierPlusGrand: false, plage: [2500, 24000], phr: (_p, _q, a, b) => `Un chat pèse ${a} et un chien ${b}.`, qs: () => ["Quelle est la différence de masse ?", "De combien de kilogrammes le chien est-il plus lourd ?"] },
  { u: "km", premierPlusGrand: false, plage: [400, 9800], phr: (p, q, a, b) => `${p.nom} habite à ${a} du collège, ${q.nom} à ${b}.`, qs: (_p, q) => [`De combien ${q.nom} habite-t-${q.il} plus loin ?`, "Quel est l'écart entre ces distances ?"] },
  { u: "s", premierPlusGrand: false, plage: [7800, 14500], phr: (p, q, a, b) => `Au 50 mètres, ${p.nom} met ${a} et ${q.nom} ${b}.`, qs: (p) => [`Combien de secondes ${p.nom} a-t-${p.il} d'avance ?`, "Quel est l'écart entre leurs temps ?"] },
  { u: "L", premierPlusGrand: false, plage: [250, 2500], phr: (_p, _q, a, b) => `Une bouteille contient ${a} d'eau, une gourde ${b}.`, qs: () => ["Quelle est la différence de contenance ?", "Combien de litres de plus dans la gourde ?"] },
  { u: "kg", premierPlusGrand: true, plage: [1200, 9800], phr: (_p, _q, a, b) => `Une valise pèse ${a}, un sac à dos ${b}.`, qs: () => ["De combien la valise est-elle plus lourde ?", "Quelle est la différence de masse ?"] },
];

function qDecSubMes(da: 0 | 1 | 2 | 3, db: 1 | 2 | 3): Q {
  const s0 = un(SIT_DEC_SUB.filter((s) => (da < 3 && db < 3) || s.mil));
  const p = perso(s0.m);
  const [ca, cb] = tirer(() => [decimal(3, 29, da), decimal(0, 9, db)], ([x, y]) => y > 0 && x - y > 500);
  const { r, leurres, poses } = opDec(ca, cb, -1);
  const e = (c: number) => `${frM(c)} ${s0.u}`;
  return {
    text: phrase(s0.phr(p, e(ca), e(cb)), un(s0.qs(p))),
    ...qcmF(r / 1000, [...leurres, ca + cb].map((c) => c / 1000), avec(s0.u), pasDe(r), [r / 1000 + 1]),
    explanation: expDec(ca, cb, -1),
    canvas: pose("soustraction", poses),
  };
}

const DSU_ITEMS: TutorBankItemV4[] = [
  DSU(201, 2, "Aligne les virgules. Si le chiffre du haut est trop petit, échange 1 unité contre 10 dixièmes.", () => {
    const [ca, cb] = tirer(() => [decimal(5, 99, 1), decimal(0, 49, 1)], ([x, y]) => y > 0 && x - y > 500 && x % 1000 < y % 1000);
    const { r, leurres, poses } = opDec(ca, cb, -1);
    return {
      text: phrase(un(["", "Pose la soustraction.", "Aligne les virgules.", "Pose en colonnes."]), un(CALCULE(`${frM(ca)} − ${frM(cb)}`))),
      ...qcmF(r / 1000, [...leurres, ca + cb].map((c) => c / 1000), avec(), 0.1, [r / 1000 + 1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(202, 2, "Rendre la monnaie : le billet moins le prix, virgules alignées.", () => {
    const o = un(OBJ_PRIX);
    const p = perso();
    const ca = prix(o);
    const B = un([10, 20, 50, 100].filter((b) => b * 1000 > ca + 500));
    const r = B * 1000 - ca;
    const A = enEntiers(B * 1000, 2);
    const C = enEntiers(ca, 2);
    return {
      text: phrase(
        un([`${p.nom} achète ${o[0]} à ${euro(ca / 1000)} et paie avec un billet de ${B} €.`, `${cap(o[0])} coûte ${euro(ca / 1000)}. ${p.nom} donne un billet de ${B} €.`, `À la caisse, ${o[0]} coûte ${euro(ca / 1000)} ; ${p.nom} tend un billet de ${B} €.`]),
        un(["Combien lui rend-on ?", "Quelle somme doit-on lui rendre ?", `Combien de monnaie récupère-t-${p.il} ?`]),
      ),
      ...qcmF(r / 1000, [subSansRetenue(A, C) / 100, subPetitDuGrand(A, C) / 100, (r + 1000) / 1000, (r - 1000) / 1000], euro, 0.1),
      explanation: etapes("on pose le prix du billet avec ses centimes (des zéros) et on soustrait le prix, virgules alignées.", `${poseM(B * 1000, 2)} − ${poseM(ca, 2)} = ${poseM(r, 2)}.`, `On lui rend ${euro(r / 1000)}.`),
      canvas: pose("soustraction", [poseM(B * 1000, 2), poseM(ca, 2)]),
    };
  }),
  DSU(203, 2, "Aligne les virgules, puis soustrais colonne par colonne.", () => qDecSubMes(un([1, 2] as const), un([1, 2] as const))),
  DSU(301, 3, "Un nombre entier a une virgule cachée : 8 = 8,0 = 8,000.", () => {
    const d = un([1, 2, 3] as const);
    const [ca, cb] = tirer(() => [decimal(3, 40, 0), decimal(1, 9, d)], ([x, y]) => x - y > 500);
    const r = ca - cb;
    const ignore = (Math.floor(ca / 1000) - Math.floor(cb / 1000)) * 1000 + (cb % 1000);
    const { leurres, poses } = opDec(ca, cb, -1);
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_DEC_SUB.filter((s) => d < 3 || s.mil));
    const p = perso(s0.m);
    const ecr = ctx ? avec(s0.u) : avec();
    return {
      text: ctx ? phrase(s0.phr(p, `${frM(ca)} ${s0.u}`, `${frM(cb)} ${s0.u}`), un(s0.qs(p))) : phrase(un(["Attention : un des nombres est entier.", "Aligne les virgules.", "Complète par des zéros.", ""]), un(CALCULE(`${frM(ca)} − ${frM(cb)}`))),
      ...qcmF(r / 1000, [ignore, ...leurres].map((c) => c / 1000), ecr, pasDe(cb), [r / 1000 + 1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(302, 3, "Complète par des zéros pour avoir autant de chiffres après la virgule.", () => {
    const [ca, cb] = tirer(() => [decimal(3, 49, un([1, 2] as const)), decimal(0, 9, 3)], ([x, y]) => y > 0 && x - y > 500);
    const { r, leurres, poses } = opDec(ca, cb, -1);
    return {
      text: phrase(un(["Attention aux virgules.", "Aligne bien les virgules.", "Pose la soustraction.", ""]), un(CALCULE(`${frM(ca)} − ${frM(cb)}`))),
      ...qcmF(r / 1000, leurres.map((c) => c / 1000), avec(), 0.001, [r / 1000 + 1, r / 1000 + 0.1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(303, 3, "Refais la soustraction en alignant les virgules.", () => {
    const sorte = un(["juste", "aligne", "aligne", "petit", "petit", "oubli"] as const);
    const [ca, cb] = sorte === "aligne"
      ? tirer(() => [decimal(3, 49, un([2, 3] as const)), decimal(1, 9, 1)], ([x, y]) => x - y > 500 && malAligne(x, y, -1) > 0 && malAligne(x, y, -1) !== x - y)
      : tirer(() => [decimal(3, 49, un([1, 2] as const)), decimal(1, 19, 1)], ([x, y]) => x - y > 500 && nbRetenuesSub(enEntiers(x, 2), enEntiers(y, 2)) >= 1);
    const p = Math.max(decimales(ca), decimales(cb));
    const A = enEntiers(ca, p);
    const B = enEntiers(cb, p);
    const r = ca - cb;
    const R = sorte === "juste" ? r : sorte === "aligne" ? malAligne(ca, cb, -1) : sorte === "petit" ? deEntiers(subPetitDuGrand(A, B), p) : deEntiers(subSansRetenue(A, B), p);
    const juste = R === r ? "juste" : sorte;
    const q = perso();
    const I = cap(q.il);
    const C = {
      juste: "C'est juste.",
      aligne: `${I} n'a pas aligné les virgules.`,
      petit: `${I} a enlevé le petit chiffre du grand dans une colonne.`,
      oubli: `${I} a oublié de reporter une retenue.`,
    };
    return {
      text: phrase(`${q.nom} a calculé ${frM(ca)} − ${frM(cb)} et a trouvé ${frM(R)}.`, un(REGARDE)),
      ...qcm(C[juste], Object.values(C)),
      explanation: expDec(ca, cb, -1),
      canvas: sorte === "aligne"
        ? pose("soustraction", [frM(ca), frM(cb)], { resultat: frM(R), label: `La pose ${de(q.nom)}` })
        : pose("soustraction", [poseM(ca, p), poseM(cb, p)], { resultat: poseM(R, p), label: `Le calcul ${de(q.nom)}` }),
    };
  }),
  DSU(304, 3, "Un écart : le plus grand moins le plus petit, virgules alignées.", () => {
    const s0 = un(SIT_ECART_DEC);
    const p = perso();
    const q = perso(undefined, p.nom);
    const dans = () => tirer(() => decimal(s0.plage[0] / 1000, s0.plage[1] / 1000, un([1, 2, 3] as const)), (c) => c >= s0.plage[0] && c <= s0.plage[1]);
    const [g, pt] = tirer(() => [dans(), dans()], ([x, y]) => x - y > 50);
    const [a, b] = s0.premierPlusGrand ? [g, pt] : [pt, g];
    const { r, leurres, poses } = opDec(g, pt, -1);
    const e = (c: number) => `${frM(c)} ${s0.u}`;
    return {
      text: phrase(s0.phr(p, q, e(a), e(b)), un(s0.qs(p, q))),
      ...qcmF(r / 1000, [...leurres, g + pt].map((c) => c / 1000), avec(s0.u), pasDe(r)),
      explanation: expDec(g, pt, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(305, 3, "Des millièmes : aligne les virgules et échange quand il le faut.", () => qDecSubMes(un([2, 3] as const), 3)),
];

/* ═════════════════════ PRIORITÉS OPÉRATOIRES (★2 ★3) ═════════════════════ */

const PRI = atelier("cm2", "calcul", "calcul_priorite", "cm2_");
const PRE_PRI = ["", "Attention aux priorités.", "Respecte les priorités.", "Réfléchis à l'ordre des calculs.", "Les parenthèses d'abord, s'il y en a."];
const DEMANDE_RES = ["Quel est le bon résultat ?", "Quel résultat aurait-il fallu trouver ?", "Corrige son calcul : quel est le résultat ?"];

type Sorte = "a+bc" | "a-bc" | "bc+a" | "(a+b)c" | "a(b+c)" | "a(b-c)" | "ab+cd" | "ab-cd" | "a+b÷c" | "a-(b+c)" | "(a-b)÷c" | "(a+b)(c-d)" | "a-(b-c)";
/** Une expression, son résultat juste et ses erreurs d'élève. */
type Expr = { e: string; r: number; faux: number[]; premier: string; autre: string; exp: string; barre?: SchemaBarreCanvasData };
function exprPri(sorte: Sorte): Expr {
  switch (sorte) {
    case "a+bc": {
      const [a, b, c] = [entre(5, 60), entre(3, 12), entre(3, 9)];
      return { e: `${a} + ${b} × ${c}`, r: a + b * c, faux: [(a + b) * c, a + b + c, b * c], premier: `${b} × ${c}`, autre: `${a} + ${b}`, exp: `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${a + b * c}.`, barre: barre([val(a), ...fois(c, String(b))], "?", `${a}, puis ${c} fois ${b}`, false) };
    }
    case "bc+a": {
      const [a, b, c] = [entre(5, 60), entre(3, 12), entre(3, 9)];
      return { e: `${b} × ${c} + ${a}`, r: b * c + a, faux: [b * (c + a), b + c + a, b * c], premier: `${b} × ${c}`, autre: `${c} + ${a}`, exp: `${b} × ${c} = ${b * c}, puis ${b * c} + ${a} = ${b * c + a}.`, barre: barre([...fois(c, String(b)), val(a)], "?", `${c} fois ${b}, puis ${a}`, false) };
    }
    case "a-bc": {
      const [b, c] = [entre(3, 12), entre(3, 9)];
      const a = entre(b * c + 5, b * c + 90);
      return { e: `${a} − ${b} × ${c}`, r: a - b * c, faux: [(a - b) * c, a - b - c, a + b * c], premier: `${b} × ${c}`, autre: `${a} − ${b}`, exp: `${b} × ${c} = ${b * c}, puis ${a} − ${b * c} = ${a - b * c}.`, barre: barre([...fois(c, String(b)), inconnu("?")], String(a), `${a}, moins ${c} fois ${b}`, false) };
    }
    case "(a+b)c": {
      const [a, b, c] = [entre(5, 25), entre(5, 25), entre(2, 6)];
      return { e: `(${a} + ${b}) × ${c}`, r: (a + b) * c, faux: [a + b * c, a + b + c, a * c + b], premier: `${a} + ${b}`, autre: `${b} × ${c}`, exp: `d'abord la parenthèse : ${a} + ${b} = ${a + b}, puis ${a + b} × ${c} = ${(a + b) * c}.`, barre: barre(fois(c, String(a + b), `${a} + ${b}`), "?", `${c} fois (${a} + ${b})`, c <= 4) };
    }
    case "a(b+c)": {
      const [a, b, c] = [entre(2, 6), entre(5, 25), entre(5, 25)];
      return { e: `${a} × (${b} + ${c})`, r: a * (b + c), faux: [a * b + c, a + b + c, a * c + b], premier: `${b} + ${c}`, autre: `${a} × ${b}`, exp: `d'abord la parenthèse : ${b} + ${c} = ${b + c}, puis ${a} × ${b + c} = ${a * (b + c)}.`, barre: barre(fois(a, String(b + c), `${b} + ${c}`), "?", `${a} fois (${b} + ${c})`, a <= 4) };
    }
    case "a(b-c)": {
      const a = entre(2, 9);
      const c = entre(3, 20);
      const b = entre(c + 2, c + 25);
      return { e: `${a} × (${b} − ${c})`, r: a * (b - c), faux: [a * b - c, b - c, a * (b + c)], premier: `${b} − ${c}`, autre: `${a} × ${b}`, exp: `d'abord la parenthèse : ${b} − ${c} = ${b - c}, puis ${a} × ${b - c} = ${a * (b - c)}.`, barre: barre(fois(a, String(b - c), `${b} − ${c}`), "?", `${a} fois (${b} − ${c})`, a <= 4) };
    }
    case "ab+cd": {
      const [a, b, c, d] = [entre(3, 12), entre(2, 6), entre(3, 12), entre(2, 6)];
      return { e: `${a} × ${b} + ${c} × ${d}`, r: a * b + c * d, faux: [(a * b + c) * d, a * b + c, a + b + c + d], premier: `${a} × ${b} et ${c} × ${d}`, autre: `${b} + ${c}`, exp: `les deux multiplications d'abord : ${a} × ${b} = ${a * b} et ${c} × ${d} = ${c * d}, puis ${a * b} + ${c * d} = ${a * b + c * d}.`, barre: barre([...fois(b, String(a)), ...fois(d, String(c))], "?", `${b} fois ${a}, puis ${d} fois ${c}`, false) };
    }
    case "ab-cd": {
      const [c, d] = [entre(2, 9), entre(2, 6)];
      const [a, b] = tirer(() => [entre(5, 15), entre(3, 9)], ([x, y]) => x * y > c * d + 5);
      return { e: `${a} × ${b} − ${c} × ${d}`, r: a * b - c * d, faux: [(a * b - c) * d, a * b - c, a * b + c * d], premier: `${a} × ${b} et ${c} × ${d}`, autre: `${b} − ${c}`, exp: `les deux multiplications d'abord : ${a} × ${b} = ${a * b} et ${c} × ${d} = ${c * d}, puis ${a * b} − ${c * d} = ${a * b - c * d}.`, barre: barre([val(c * d, `${c} × ${d}`), inconnu("?")], `${a} × ${b} = ${a * b}`) };
    }
    case "a+b÷c": {
      const c = entre(2, 9);
      const b = c * entre(3, 12);
      const a = entre(5, 60);
      const faux = (a + b) % c === 0 ? [(a + b) / c, a + b + c, b / c] : [a + b + c, b / c, a + b];
      return { e: `${a} + ${b} ÷ ${c}`, r: a + b / c, faux, premier: `${b} ÷ ${c}`, autre: `${a} + ${b}`, exp: `la division d'abord : ${b} ÷ ${c} = ${b / c}, puis ${a} + ${b / c} = ${a + b / c}.`, barre: barre([val(a), val(b / c, `${b} ÷ ${c}`)], "?") };
    }
    case "(a-b)÷c": {
      const c = entre(2, 9);
      const q = entre(3, 15);
      const b = entre(5, 40);
      const a = b + c * q;
            return { e: `(${a} − ${b}) ÷ ${c}`, r: q, faux: [a - b, b % c === 0 ? a - b / c : NaN, a - b - c], premier: `${a} − ${b}`, autre: `${b} ÷ ${c}`, exp: `d'abord la parenthèse : ${a} − ${b} = ${a - b}, puis ${a - b} ÷ ${c} = ${q}.`, barre: barre(Array.from({ length: c }, () => inconnu()), `${a} − ${b}`, `${c} parts égales`, false) };
    }
    case "(a+b)(c-d)": {
      const [a, b] = [entre(2, 12), entre(2, 12)];
      const d = entre(2, 9);
      const c = d + entre(2, 6);
      return { e: `(${a} + ${b}) × (${c} − ${d})`, r: (a + b) * (c - d), faux: [a + b * c - d, (a + b) * c - d, a + b + c - d], premier: `${a} + ${b} et ${c} − ${d}`, autre: `${b} × ${c}`, exp: `d'abord les deux parenthèses : ${a} + ${b} = ${a + b} et ${c} − ${d} = ${c - d}, puis ${a + b} × ${c - d} = ${(a + b) * (c - d)}.`, barre: barre(fois(c - d, String(a + b), `${a} + ${b}`), "?", `${c - d} fois (${a} + ${b})`, c - d <= 4) };
    }
    case "a-(b-c)": {
      const c = entre(3, 30);
      const b = c + entre(5, 40);
      const a = b + entre(10, 80);
      return { e: `${a} − (${b} − ${c})`, r: a - (b - c), faux: [a - b - c, b - c, a + b - c], premier: `${b} − ${c}`, autre: `${a} − ${b}`, exp: `d'abord la parenthèse : ${b} − ${c} = ${b - c}, puis ${a} − ${b - c} = ${a - (b - c)}.`, barre: barre([val(b - c, `${b} − ${c}`), inconnu("?")], String(a)) };
    }
    default: {
      const [b, c] = [entre(15, 90), entre(15, 90)];
      const a = entre(b + c + 10, b + c + 200);
      return { e: `${a} − (${b} + ${c})`, r: a - b - c, faux: [a - b + c, a + b + c, a - b], premier: `${b} + ${c}`, autre: `${a} − ${b}`, exp: `d'abord la parenthèse : ${b} + ${c} = ${b + c}, puis ${a} − ${b + c} = ${a - b - c}.`, barre: barre([val(b), val(c), inconnu("?")], String(a), `on enlève ${b} et ${c}`) };
    }
  }
}
function qPri(sortes: Sorte[]): Q {
  const x = exprPri(un(sortes));
  return {
    text: phrase(un(PRE_PRI), un(CALCULE(x.e))),
    ...qcmF(x.r, x.faux, avec(), 1),
    explanation: etapes("dans un calcul, on fait d'abord les parenthèses, puis les multiplications et les divisions, enfin les additions et les soustractions.", x.exp, `${x.e} = ${x.r}.`),
    ...(x.barre ? { canvas: x.barre } : {}),
  };
}

/** Un achat ou un comptage : quelle expression le traduit ? */
type SitExpr = { phr: (p: Perso, k: number, x: number, y: number) => string; q: (p: Perso) => string };
const SIT_EXPR: readonly SitExpr[] = [
  { phr: (p, k, x, y) => `${p.nom} achète ${k} cahiers à ${x} € et une trousse à ${y} €.`, q: (p) => `Quel calcul donne ce qu'${p.il} paie ?` },
  { phr: (p, k, x, y) => `${p.nom} achète ${k} places de cinéma à ${x} € et un pot de pop-corn à ${y} €.`, q: () => "Quel calcul donne le prix total ?" },
  { phr: (_p, k, x, y) => `Un tournoi réunit ${k} équipes de ${x} joueurs et ${y} arbitres.`, q: () => "Quel calcul donne le nombre de personnes ?" },
  { phr: (p, k, x, y) => `${p.nom}, fleuriste, prépare ${k} bouquets de ${x} roses et garde ${y} roses à part.`, q: () => "Quel calcul donne le nombre de roses ?" },
  { phr: (p, k, x, y) => `${p.nom} cuit ${k} plaques de ${x} croissants et ${y} croissants de plus.`, q: () => "Quel calcul donne le nombre de croissants ?" },
  { phr: (_p, k, x, y) => `Un car a ${k} rangées de ${x} sièges, plus ${y} sièges au fond.`, q: () => "Quel calcul donne le nombre de sièges ?" },
  { phr: (p, k, x, y) => `${p.nom}, peintre, achète ${k} pots de peinture à ${x} € et un rouleau à ${y} €.`, q: () => "Quel calcul donne le prix à payer ?" },
  { phr: (p, k, x, y) => `${p.nom} lit ${x} pages par jour pendant ${k} jours, puis ${y} pages le week-end.`, q: () => "Quel calcul donne le nombre de pages lues ?" },
  { phr: (p, k, x, y) => `${p.nom} plante ${k} rangées de ${x} salades et ${y} salades dans un bac.`, q: () => "Quel calcul donne le nombre de salades ?" },
  { phr: (p, k, x, y) => `${p.nom} gagne ${k} fois ${x} points, puis un bonus de ${y} points.`, q: () => "Quel calcul donne son score ?" },
  { phr: (_p, k, x, y) => `Une éleveuse a ${k} enclos de ${x} chèvres et ${y} chèvres dans le pré.`, q: () => "Quel calcul donne le nombre de chèvres ?" },
  { phr: (_p, k, x, y) => `Un serveur porte ${k} plateaux de ${x} verres et ${y} verres à la main.`, q: () => "Quel calcul donne le nombre de verres ?" },
];
/** Chaque lot contient deux sortes de choses : la parenthèse. */
const SIT_LOTS = [
  (k: number, a: number, b: number) => `Chacun des ${k} sachets contient ${a} bonbons à la fraise et ${b} à la menthe.`,
  (k: number, a: number, b: number) => `Dans chacune des ${k} classes, il y a ${a} filles et ${b} garçons.`,
  (k: number, a: number, b: number) => `Chacune des ${k} équipes a ${a} joueurs et ${b} remplaçants.`,
  (k: number, a: number, b: number) => `Chaque bouquet compte ${a} roses et ${b} tulipes ; la fleuriste en fait ${k}.`,
  (k: number, a: number, b: number) => `Chaque étagère porte ${a} romans et ${b} BD ; la bibliothèque a ${k} étagères.`,
  (k: number, a: number, b: number) => `Chaque panier contient ${a} pommes et ${b} poires ; le marchand prépare ${k} paniers.`,
  (k: number, a: number, b: number) => `Chaque boîte de jeu contient ${a} pions rouges et ${b} pions bleus. Le club a ${k} boîtes.`,
  (k: number, a: number, b: number) => `Chaque rangée du potager a ${a} salades et ${b} poireaux. Il y a ${k} rangées.`,
  (k: number, a: number, b: number) => `Chaque carton contient ${a} cahiers et ${b} classeurs ; l'école reçoit ${k} cartons.`,
  (k: number, a: number, b: number) => `Chaque menu coûte ${a} € de plat et ${b} € de dessert ; une famille prend ${k} menus.`,
];

const PRI_ITEMS: TutorBankItemV4[] = [
  PRI(201, 2, "La multiplication passe avant l'addition et la soustraction.", () => qPri(["a+bc", "a+bc", "bc+a", "a-bc"])),
  PRI(202, 2, "Les parenthèses se calculent en premier.", () => qPri(["(a+b)c", "a(b+c)", "a-(b+c)", "a(b-c)"])),
  PRI(203, 2, "D'abord les parenthèses, puis × et ÷, enfin + et −.", () => {
    const x = exprPri(un(["a+bc", "a-bc", "a(b+c)", "a(b-c)", "a+b÷c", "a-(b+c)", "(a-b)÷c", "a-(b-c)"] as const));
    const p = perso();
    return {
      text: un([`Dans ${x.e}, quel calcul fais-tu en premier ?`, `Pour calculer ${x.e}, par quoi commences-tu ?`, `${p.nom} doit calculer ${x.e}. Par quel calcul commencer ?`, `${x.e} : quelle opération faut-il effectuer d'abord ?`]),
      ...qcm(x.premier, [x.autre, "On calcule de gauche à droite.", "L'ordre n'a pas d'importance."]),
      explanation: etapes("d'abord les parenthèses, puis × et ÷, enfin + et −.", x.exp, `On commence par ${x.premier}.`),
      ...(x.barre ? { canvas: x.barre } : {}),
    };
  }),
  PRI(204, 2, "La multiplication ou la division d'abord, même si elle est écrite à droite.", () => qPri(["a+bc", "a-bc", "a+b÷c", "a+b÷c"])),
  PRI(205, 2, "Avec des parenthèses, on calcule d'abord ce qu'elles contiennent.", () => {
    const sans = Math.random() < 0.5;
    const [a, b, c] = [entre(3, 25), entre(2, 12), entre(2, 9)];
    const e1 = `${a} + ${b} × ${c}`;
    const e2 = `(${a} + ${b}) × ${c}`;
    const [e, r] = sans ? [e1, a + b * c] : [e2, (a + b) * c];
    return {
      text: phrase(un([`Compare ${e1} et ${e2}.`, `On a écrit ${e1} et ${e2}.`, `Deux calculs se ressemblent : ${e1} et ${e2}.`, `Attention aux parenthèses : ${e1} et ${e2}.`]), un([`Que vaut ${e} ?`, `Combien fait ${e} ?`, `Calcule ${e}.`, `Quel est le résultat de ${e} ?`])),
      ...qcmF(r, [sans ? (a + b) * c : a + b * c, a + b + c], avec(), 1),
      explanation: etapes("les parenthèses changent l'ordre des calculs.", `${e1} = ${a} + ${b * c} = ${a + b * c} ; ${e2} = ${a + b} × ${c} = ${(a + b) * c}.`, `${e} = ${r}.`),
      canvas: sans ? barre([val(a), ...fois(c, String(b))], "?", e1, false) : barre(fois(c, String(a + b), `${a} + ${b}`), "?", e2, c <= 4),
    };
  }),
  PRI(301, 3, "Deux multiplications, deux parenthèses : on les calcule toutes avant le reste.", () => qPri(["ab+cd", "ab-cd", "(a+b)(c-d)", "(a-b)÷c", "a-(b-c)"])),
  PRI(302, 3, "Traduis l'énoncé : les objets identiques, c'est une multiplication ; un lot de deux sortes, une parenthèse.", () => {
    const p = perso();
    if (Math.random() < 0.5) {
      const s0 = un(SIT_EXPR);
      const [k, x, y] = [entre(3, 9), entre(3, 15), entre(2, 25)];
      const juste = Math.random() < 0.5 ? `${k} × ${x} + ${y}` : `${y} + ${k} × ${x}`;
      return {
        text: phrase(s0.phr(p, k, x, y), s0.q(p)),
        ...qcm(juste, [`(${y} + ${k}) × ${x}`, `${k} × (${x} + ${y})`, `${k} + ${x} + ${y}`, `${k} × ${x} × ${y}`]),
        explanation: etapes(`${k} fois ${x}, c'est ${k} × ${x} ; on ajoute ensuite ${y}. Pas besoin de parenthèses : la multiplication passe en premier.`, `${k} × ${x} + ${y} = ${k * x} + ${y} = ${k * x + y}.`, `Le bon calcul : ${juste}.`),
        canvas: barre([...fois(k, String(x)), val(y)], "?", `${k} fois ${x}, puis ${y}`, false),
      };
    }
    const [k, a, b] = [entre(3, 9), entre(3, 25), entre(2, 15)];
    const e = Math.random() < 0.5 ? `(${a} + ${b}) × ${k}` : `${k} × (${a} + ${b})`;
    return {
      text: phrase(un(SIT_LOTS)(k, a, b), un(["Quel calcul donne le total ?", "Quelle expression permet de trouver le total ?", "Quel calcul faut-il écrire ?"])),
      ...qcm(e, [`${a} + ${b} × ${k}`, `${a} × ${k} + ${b}`, `${a} + ${b} + ${k}`]),
      explanation: etapes(`chaque lot contient ${a} + ${b} : la parenthèse dit qu'on additionne avant de multiplier.`, `${e} = ${a + b} × ${k} = ${(a + b) * k}.`, `Le bon calcul : ${e}.`),
      canvas: barre(fois(k, String(a + b), `${a} + ${b}`), "?", `${k} lots de ${a} + ${b}`, k <= 4),
    };
  }),
  PRI(303, 3, "On ne calcule pas de gauche à droite : × et ÷ d'abord.", () => {
    const x = exprPri(un(["a+bc", "a-bc", "ab+cd", "ab-cd", "a+b÷c"] as const));
    const p = perso();
    const R = x.faux[0];
    return {
      text: phrase(`${p.nom} calcule ${x.e} de gauche à droite et trouve ${R}.`, un(DEMANDE_RES)),
      ...qcmF(x.r, [R, ...x.faux.slice(1)], avec(), 1),
      explanation: etapes("× et ÷ passent avant + et −.", x.exp, `${x.e} = ${x.r}, et non ${R}.`),
      ...(x.barre ? { canvas: x.barre } : {}),
    };
  }),
  PRI(304, 3, "Où mettre les parenthèses ? Teste chaque écriture.", () => {
    const sorte = un(["(a+b)c", "a(b+c)", "a-(b+c)", "(a-b)c"] as const);
    const [a, b, c] = sorte === "a-(b+c)" ? [entre(60, 150), entre(10, 30), entre(5, 20)] : sorte === "(a-b)c" ? [entre(12, 40), entre(2, 10), entre(2, 6)] : [entre(2, 15), entre(2, 15), entre(2, 9)];
    const ecr: Record<typeof sorte, { juste: string; r: number; sans: string; faux: string[] }> = {
      "(a+b)c": { juste: `(${a} + ${b}) × ${c}`, r: (a + b) * c, sans: `${a} + ${b} × ${c}`, faux: [`${a} + (${b} × ${c})`, `${a} + ${b} × ${c}`] },
      "a(b+c)": { juste: `${a} × (${b} + ${c})`, r: a * (b + c), sans: `${a} × ${b} + ${c}`, faux: [`(${a} × ${b}) + ${c}`, `${a} × ${b} + ${c}`] },
      "a-(b+c)": { juste: `${a} − (${b} + ${c})`, r: a - (b + c), sans: `${a} − ${b} + ${c}`, faux: [`(${a} − ${b}) + ${c}`, `${a} − ${b} + ${c}`] },
      "(a-b)c": { juste: `(${a} − ${b}) × ${c}`, r: (a - b) * c, sans: `${a} − ${b} × ${c}`, faux: [`${a} − (${b} × ${c})`, `${a} − ${b} × ${c}`] },
    };
    const E = ecr[sorte];
    const p = perso();
    return {
      text: phrase(un([`${p.nom} veut obtenir ${E.r} avec ${E.sans}.`, `On veut que ${E.sans} donne ${E.r}.`, `${p.nom} écrit ${E.sans} et veut trouver ${E.r}.`]), un(["Où faut-il placer les parenthèses ?", "Quelle écriture donne ce résultat ?", "Quelle écriture choisir ?"])),
      ...qcm(E.juste, [...E.faux, `(${E.sans})`]),
      explanation: etapes("les parenthèses obligent à faire leur calcul en premier : on teste chaque écriture.", `${E.juste} = ${E.r}.`, `La bonne écriture : ${E.juste}.`),
      canvas: sorte === "(a+b)c" ? barre(fois(c, String(a + b), `${a} + ${b}`), "?", `${c} fois (${a} + ${b})`, c <= 4)
        : sorte === "a(b+c)" ? barre(fois(a, String(b + c), `${b} + ${c}`), "?", `${a} fois (${b} + ${c})`, a <= 4)
          : sorte === "a-(b+c)" ? barre([val(b), val(c), inconnu("?")], String(a), `on enlève ${b} et ${c}`)
            : barre(fois(c, String(a - b), `${a} − ${b}`), "?", `${c} fois (${a} − ${b})`, c <= 4),
    };
  }),
  PRI(305, 3, "Chaque lot contient la même chose : on calcule d'abord un lot (la parenthèse).", () => {
    const [k, a, b] = [entre(3, 9), entre(3, 25), entre(2, 15)];
    const r = (a + b) * k;
    const sit = un(SIT_LOTS);
    const euros = /€/.test(sit(1, 1, 1));
    const e = avec(euros ? "€" : undefined);
    return {
      text: phrase(sit(k, a, b), un(euros ? ["Combien paie la famille ?", "Quel est le prix total ?", "Combien coûtent les menus ?"] : ["Combien y en a-t-il en tout ?", "Quel est le total ?", "Combien cela fait-il en tout ?"])),
      ...qcmF(r, [a + b * k, a + b + k, a * k + b], e, 1),
      explanation: etapes("on calcule un lot, puis on multiplie par le nombre de lots.", `(${a} + ${b}) × ${k} = ${a + b} × ${k} = ${r}.`, `Le total est ${r}.`),
      canvas: barre(fois(k, String(a + b), `${a} + ${b}`), "?", `${k} lots de ${a} + ${b}`, k <= 4),
    };
  }),
];

/* ═════════════════════ DÉFIS DE CALCUL (★4 ★5) ═════════════════════ */

const DEF = avecEuros(atelier("cm2", "calcul", "calcul_defi", "cm2_"));

type SitEtapes = { m?: Metier; quoi: string; phr: (p: Perso, a: string, b: string, c: string) => string };
const SIT_ETAPES: readonly SitEtapes[] = [
  { m: ["libraire", "libraire"], quoi: "livres", phr: (p, a, b, c) => `${p.txt} a ${a} livres. ${cap(p.il)} en reçoit ${b}, puis en vend ${c}.` },
  { m: ["boulangère", "boulanger"], quoi: "croissants", phr: (p, a, b, c) => `${p.txt} a cuit ${a} croissants pour un salon. ${cap(p.il)} en cuit encore ${b}, puis en vend ${c}.` },
  { m: ["bibliothécaire", "bibliothécaire"], quoi: "livres", phr: (p, a, b, c) => `La médiathèque ${de(p.nom)} a ${a} livres. Elle en reçoit ${b}, puis en donne ${c} à des écoles.` },
  { quoi: "abonnés", phr: (p, a, b, c) => `${p.nom} a ${a} abonnés. ${cap(p.il)} en gagne ${b}, puis en perd ${c}.` },
  { quoi: "euros", phr: (p, a, b, c) => `${p.nom} a ${a} € sur son compte. ${cap(p.il)} reçoit ${b} €, puis dépense ${c} €.` },
  { quoi: "voyageurs", phr: (_p, a, b, c) => `Un aéroport accueille ${a} voyageurs le matin ; ${b} arrivent l'après-midi et ${c} s'envolent.` },
  { m: ["magasinière", "magasinier"], quoi: "colis", phr: (p, a, b, c) => `${p.txt} a ${a} colis. ${cap(p.il)} en reçoit ${b} et en expédie ${c}.` },
  { quoi: "points", phr: (p, a, b, c) => `Dans un jeu, ${p.nom} a ${a} points. ${cap(p.il)} en gagne ${b}, puis en perd ${c}.` },
  { quoi: "habitants", phr: (_p, a, b, c) => `Un village compte ${a} habitants. ${b} s'installent dans l'année et ${c} déménagent.` },
  { m: ["fermière", "fermier"], quoi: "œufs", phr: (p, a, b, c) => `${p.txt} a ${a} œufs. Les poules en pondent ${b}, puis ${p.il} en vend ${c}.` },
  { quoi: "spectateurs", phr: (_p, a, b, c) => `Un festival accueille ${a} spectateurs le matin ; ${b} arrivent l'après-midi et ${c} partent le soir.` },
  { quoi: "bouteilles", phr: (p, a, b, c) => `Le magasin ${de(p.nom)} a ${a} bouteilles d'eau. Il en reçoit ${b}, puis en vend ${c}.` },
];
const Q_FIN = (quoi: string) => [`Combien ${de(quoi)} y a-t-il à la fin ?`, `À la fin, combien ${de(quoi)} reste-t-il ?`, `Combien ${de(quoi)} au bout du compte ?`];

type SitPaquets = { quoi: string; phr: (p: Perso, k: number, n: number, m: number) => string };
const SIT_PAQUETS: readonly SitPaquets[] = [
  { quoi: "œufs", phr: (_p, k, n, m) => `Un fermier remplit ${k} plateaux de ${n} œufs ; il lui reste ${m} œufs.` },
  { quoi: "crayons", phr: (p, k, n, m) => `${p.nom} range les crayons de l'école : ${k} boîtes de ${n}, et ${m} crayons en plus.` },
  { quoi: "chaises", phr: (_p, k, n, m) => `Pour un concert, on installe ${k} rangées de ${n} chaises et ${m} chaises au bord.` },
  { quoi: "élèves", phr: (_p, k, n, m) => `Pour une sortie, ${k} cars de ${n} élèves partent, et ${m} élèves vont en minibus.` },
  { quoi: "gâteaux", phr: (_p, k, n, m) => `Une pâtissière prépare ${k} plateaux de ${n} gâteaux et ${m} gâteaux pour la vitrine.` },
  { quoi: "plants", phr: (_p, k, n, m) => `Une maraîchère plante ${k} rangées de ${n} plants de tomates et ${m} plants en pots.` },
  { quoi: "billes", phr: (p, k, n, m) => `${p.nom} a ${k} sachets de ${n} billes et ${m} billes dans sa poche.` },
  { quoi: "bouteilles", phr: (_p, k, n, m) => `Un magasin reçoit ${k} packs de ${n} bouteilles et ${m} bouteilles à l'unité.` },
  { quoi: "livres", phr: (_p, k, n, m) => `Une bibliothèque a ${k} étagères de ${n} livres et ${m} livres sur une table.` },
  { quoi: "photos", phr: (p, k, n, m) => `${p.nom} colle ${k} pages de ${n} photos dans un album, et ${m} photos sur la couverture.` },
  { quoi: "briques", phr: (_p, k, n, m) => `Une maçonne empile ${k} palettes de ${n} briques et ${m} briques à part.` },
];
const OBJ_PL: readonly (readonly [string, number, number])[] = [
  ["cahiers", 2, 4], ["stylos", 2, 3], ["places de cinéma", 7, 11], ["tickets de manège", 2, 4], ["livres", 6, 15], ["bracelets", 3, 7],
  ["paquets de cartes", 3, 6], ["maillots", 12, 25], ["balles de tennis", 2, 5], ["magazines", 3, 6], ["pots de miel", 4, 9], ["ballons", 8, 19],
];
const GROUPES: readonly (readonly [string, string, "il" | "elle"])[] = [["classes", "classe", "elle"], ["équipes", "équipe", "elle"], ["tables", "table", "elle"], ["paniers", "panier", "il"], ["groupes", "groupe", "il"], ["familles", "famille", "elle"], ["clubs", "club", "il"]];

const DEF_ITEMS: TutorBankItemV4[] = [
  DEF(101, 4, "Fais les étapes dans l'ordre de l'histoire : d'abord ce qui arrive, puis ce qui part.", () => {
    const s0 = un(SIT_ETAPES);
    const p = perso(s0.m);
    const a = entre(1205, 8890);
    const b = entre(450, 4800);
    const c = entre(600, a + b - 300);
    const r = a + b - c;
    return {
      text: phrase(s0.phr(p, fr(a), fr(b), fr(c)), un(Q_FIN(s0.quoi))),
      ...qcmF(r, [a + b, a + b + c, a - b - c, a - b + c], avec(), 10),
      explanation: etapes("on ajoute ce qui arrive, puis on enlève ce qui part.", `${fr(a)} + ${fr(b)} = ${fr(a + b)} ; ${fr(a + b)} − ${fr(c)} = ${fr(r)}.`, `Il y en a ${fr(r)} à la fin.`),
      canvas: barre([val(a, "au début"), val(b, "en plus")], "?", `puis on enlève ${fr(c)}`),
    };
  }),
  DEF(102, 4, "Les paquets identiques : une multiplication ; puis ajoute ce qui reste.", () => {
    const s0 = un(SIT_PAQUETS);
    const p = perso();
    const [k, n, m] = [entre(6, 25), entre(12, 48), entre(3, 11)];
    const r = k * n + m;
    return {
      text: phrase(s0.phr(p, k, n, m), un([`Combien ${de(s0.quoi)} en tout ?`, `Combien ${de(s0.quoi)} y a-t-il au total ?`, "Quel est le total ?"])),
      ...qcmF(r, [k * n, k + n + m, k * (n + m), k * n - m], avec(), 1),
      explanation: etapes("d'abord la multiplication des paquets, puis on ajoute le reste.", `${k} × ${n} = ${k * n} ; ${k * n} + ${m} = ${r}.`, `Il y en a ${r} en tout.`),
      canvas: barre([val(k * n, `${k} × ${n}`), val(m)], "?", `${k} paquets de ${n}, et ${m}`),
    };
  }),
  DEF(103, 4, "D'abord le prix des achats, puis la monnaie rendue.", () => {
    const o = un(OBJ_PL);
    const p = perso();
    const [k, x] = [entre(3, 9), entre(o[1], o[2])];
    const billets = [20, 50, 100, 200, 500].filter((b) => b > k * x + 2);
    const B = Math.random() < 0.7 ? billets[0] : un(billets);
    const r = B - k * x;
    return {
      text: phrase(
        un([`${p.nom} achète ${k} ${o[0]} à ${x} € l'unité et paie avec un billet de ${B} €.`, `${p.nom} paie ${k} ${o[0]} à ${x} € chacun avec un billet de ${B} €.`, `Pour son club, ${p.nom} prend ${k} ${o[0]} à ${x} € pièce et donne ${B} €.`]),
        un(["Combien lui rend-on ?", "Quelle somme lui rend-on ?", `Combien de monnaie récupère-t-${p.il} ?`]),
      ),
      ...qcmF(r, [k * x, B - x, B - k - x, r + 1], avec("€"), 1),
      explanation: etapes("on calcule d'abord le prix des achats, puis on l'enlève du billet.", `${k} × ${x} = ${k * x} ; ${B} − ${k * x} = ${r}.`, `On lui rend ${r} €.`),
      canvas: barre([val(k * x, `${k} × ${x} €`), inconnu("rendu")], `${B} €`),
    };
  }),
  DEF(104, 4, "Calcule les deux totaux, puis leur écart.", () => {
    const p = perso();
    const q = perso(undefined, p.nom);
    const k = entre(6, 15);
    const [n1, n2] = tirer(() => [entre(15, 48), entre(8, 40)], ([x, y]) => x > y + 1);
    const r = k * (n1 - n2);
    const sit = un([
      () => `${p.nom} lit ${n1} pages par jour, ${q.nom} ${n2} pages par jour, pendant ${k} jours.`,
      () => `Pendant ${k} jours, ${p.nom} fait ${n1} pompes par jour et ${q.nom} ${n2}.`,
      () => `${p.nom} range ${k} étagères de ${n1} livres, ${q.nom} ${k} étagères de ${n2} livres.`,
      () => `${p.nom} gagne ${n1} points à chaque partie, ${q.nom} ${n2} points ; ils jouent ${k} parties.`,
      () => `${p.nom} économise ${n1} € par mois, ${q.nom} ${n2} € par mois, pendant ${k} mois.`,
    ]);
    return {
      text: phrase(sit(), `Combien ${p.nom} en a-t-${p.il} de plus ${que(q.nom)} à la fin ?`),
      ...qcmF(r, [k * n1, n1 - n2, k * n1 + k * n2, k * n1 - n2], avec(), 1),
      explanation: etapes("on calcule chaque total, puis on soustrait.", `${k} × ${n1} = ${k * n1} ; ${k} × ${n2} = ${k * n2} ; ${k * n1} − ${k * n2} = ${r}.`, `${p.nom} en a ${r} de plus.`),
      canvas: barre([val(k * n2, q.nom), inconnu("de plus")], String(k * n1), `le total ${de(p.nom)}`),
    };
  }),
  DEF(105, 4, "Cherche ce qu'il faut calculer AVANT de répondre à la question.", () => {
    const o = un(OBJ_PL);
    const p = perso();
    const [k, x] = [entre(3, 9), entre(o[1], o[2])];
    const billets = [20, 50, 100, 200, 500].filter((b) => b > k * x + 2);
    const B = Math.random() < 0.7 ? billets[0] : un(billets);
    return {
      text: phrase(`${p.nom} achète ${k} ${o[0]} à ${x} € l'unité et paie avec un billet de ${B} €.`, un(["Quel calcul fais-tu en premier pour trouver la monnaie ?", "Par quel calcul commencer ?", "Quelle est la première étape ?"])),
      ...qcm(`${k} × ${x}`, [`${B} − ${x}`, `${B} − ${k}`, `${k} + ${x}`]),
      explanation: etapes("pour la monnaie, il faut d'abord le prix des achats.", `${k} × ${x} = ${k * x}, puis ${B} − ${k * x} = ${B - k * x}.`, `On commence par ${k} × ${x}.`),
      canvas: barre([val(k * x, `${k} × ${x} €`), inconnu("rendu")], `${B} €`),
    };
  }),
  DEF(201, 5, "Trois étapes : le total, ce qu'on garde, puis le partage.", () => {
    const g = un(GROUPES);
    const s = un([["cartons", "crayons"], ["sacs", "billes"], ["caisses", "pommes"], ["paquets", "feuilles"], ["boîtes", "biscuits"], ["lots", "livres"], ["palettes", "bouteilles"]] as const);
    const p = perso(["directrice", "directeur"]);
    const [k, n, e] = tirer(() => [entre(4, 12), 5 * entre(4, 20), entre(3, 9)], ([kk, nn, ee]) => kk * nn > ee * 5);
    const garde = tirer(() => entre(4, 40), (x) => (k * n - x) % e === 0 && k * n - x > 0);
    const r = (k * n - garde) / e;
    return {
      text: phrase(`${p.txt} reçoit ${k} ${s[0]} de ${n} ${s[1]}.`, `${cap(p.il)} en garde ${garde}, puis partage le reste entre ${e} ${g[0]}.`, `Combien ${de(s[1])} chaque ${g[1]} reçoit-${g[2]} ?`),
      ...qcmF(r, [k * n - garde, (k * n) / e, (k * n + garde) / e, k * n].filter((v) => Number.isInteger(v)), avec(), 1),
      explanation: etapes("le total, puis on enlève ce qu'on garde, puis on partage.", `${k} × ${n} = ${k * n} ; ${k * n} − ${garde} = ${k * n - garde} ; ${k * n - garde} ÷ ${e} = ${r}.`, `Chaque ${g[1]} reçoit ${r} ${s[1]}.`),
      canvas: barre([val(garde, "gardés"), ...Array.from({ length: e }, () => inconnu())], `${k} × ${n}`, `${e} parts égales`, false),
    };
  }),
  DEF(202, 5, "Les prix décimaux : le total des achats, puis la monnaie.", () => {
    const o = un(OBJ_PRIX);
    const o2 = un(OBJ_PRIX.filter((x) => x !== o));
    const p = perso();
    const k = entre(2, 4);
    const [cx, cy] = tirer(() => [prix(o), prix(o2)], ([x, y]) => k * x + y < 95000);
    const tot = k * cx + cy;
    const B = un([20, 50, 100].filter((b) => b * 1000 > tot + 1000));
    const r = B * 1000 - tot;
    return {
      text: phrase(`${p.nom} achète ${o[0]} à ${euro(cx / 1000)} pour chacun de ses ${k} cousins, et ${o2[0]} à ${euro(cy / 1000)} pour ${p.il === "il" ? "lui" : "elle"}.`, `${cap(p.il)} paie avec un billet de ${B} €.`, un(["Combien lui rend-on ?", `Quelle monnaie récupère-t-${p.il} ?`, "Quelle somme doit-on lui rendre ?"])),
      ...qcmF(r / 1000, [tot / 1000, (B * 1000 - k * cx) / 1000, (B * 1000 - cx - cy) / 1000, (r + 1000) / 1000], euro, 0.1),
      explanation: etapes("le prix des achats d'abord, puis le billet moins ce prix.", `${k} × ${poseM(cx, 2)} = ${poseM(k * cx, 2)} ; ${poseM(k * cx, 2)} + ${poseM(cy, 2)} = ${poseM(tot, 2)} ; ${poseM(B * 1000, 2)} − ${poseM(tot, 2)} = ${poseM(r, 2)}.`, `On lui rend ${euro(r / 1000)}.`),
      canvas: barre([val(poseM(k * cx, 2), `${k} fois`), val(poseM(cy, 2)), inconnu("rendu")], `${B} €`),
    };
  }),
  DEF(203, 5, "Remonte le calcul à l'envers : défais la dernière opération en premier.", () => {
    const sorte = un(["xa", "x-a", "+ax"] as const);
    const p = perso();
    const k = entre(3, 12);
    const a = entre(5, 60);
    const x = sorte === "x-a" ? entre(Math.ceil(a / k) + 3, 80) : entre(5, 80);
    const R = sorte === "xa" ? x * k + a : sorte === "x-a" ? x * k - a : (x + a) * k;
    const dit = sorte === "xa" ? `le multiplie par ${k}, puis ajoute ${a}` : sorte === "x-a" ? `le multiplie par ${k}, puis enlève ${a}` : `lui ajoute ${a}, puis multiplie le tout par ${k}`;
    const faux = sorte === "xa" ? [(R + a) / k, R / k - a, R - a] : sorte === "x-a" ? [(R - a) / k, R / k + a, R + a] : [R / k + a, R - a, R / k];
    return {
      text: phrase(
        un([
          `${p.nom} pense à un nombre. ${cap(p.il)} ${dit} : ${p.il} trouve ${fr(R)}.`,
          `Devinette ${de(p.nom)} : « Je pense à un nombre. Je ${sorte === "+ax" ? `lui ajoute ${a}, puis je multiplie le tout par ${k}` : `le multiplie par ${k}, puis j'${sorte === "xa" ? "ajoute" : "enlève"} ${a}`}. Je trouve ${fr(R)}. »`,
        ]),
        un(["Quel est ce nombre ?", `À quel nombre ${p.nom} a-t-${p.il} pensé ?`, "Trouve le nombre de départ."]),
      ),
      ...qcmF(x, faux.filter((v) => Number.isInteger(v)), avec(), 1),
      explanation: sorte === "xa"
        ? etapes(`on défait à l'envers : on enlève ${a}, puis on divise par ${k}.`, `${fr(R)} − ${a} = ${fr(R - a)} ; ${fr(R - a)} ÷ ${k} = ${x}.`, `Le nombre est ${x}.`)
        : sorte === "x-a"
          ? etapes(`on défait à l'envers : on rajoute ${a}, puis on divise par ${k}.`, `${fr(R)} + ${a} = ${fr(R + a)} ; ${fr(R + a)} ÷ ${k} = ${x}.`, `Le nombre est ${x}.`)
          : etapes(`on défait à l'envers : on divise par ${k}, puis on enlève ${a}.`, `${fr(R)} ÷ ${k} = ${R / k} ; ${R / k} − ${a} = ${x}.`, `Le nombre est ${x}.`),
      canvas: sorte === "+ax"
        ? barre(Array.from({ length: k }, () => inconnu(`? + ${a}`)), fr(R), `${k} fois (le nombre + ${a})`, k <= 4)
        : sorte === "xa"
          ? barre([inconnu(`${k} fois le nombre`), val(a)], fr(R))
          : barre([inconnu(`${k} fois le nombre`)], `${fr(R)} + ${a}`),
    };
  }),
  DEF(204, 5, "Un aller-retour, c'est deux fois le trajet.", () => {
    const p = perso();
    const d = 10 * entre(45, 195);
    const k = entre(3, 12);
    const r = 2 * k * d;
    const lieu = un(["le collège", "la piscine", "le stade", "la boulangerie", "la médiathèque", "le parc", "la gare", "le conservatoire"]);
    return {
      text: phrase(un([`${p.nom} habite à ${fr(d)} m de ${lieu}.`, `Entre la maison ${de(p.nom)} et ${lieu}, il y a ${fr(d)} m.`]), `${cap(p.il)} fait ${k} allers-retours dans le mois.`, un([`Quelle distance parcourt-${p.il} en tout ?`, "Combien de mètres en tout ?", "Quelle distance totale ?"])),
      ...qcmF(r, [k * d, 2 * d + k, 2 * d * (k + 1)], avec("m"), 10),
      explanation: etapes("un aller-retour = 2 trajets ; on multiplie par le nombre d'allers-retours.", `2 × ${fr(d)} = ${fr(2 * d)} ; ${fr(2 * d)} × ${k} = ${fr(r)}.`, `${cap(p.il)} parcourt ${fr(r)} m.`),
      canvas: barre([val(d, "aller"), val(d, "retour")], "?", `un aller-retour, ${k} fois`),
    };
  }),
  DEF(205, 5, "Un budget : ce qui reste = le budget − (tous les achats).", () => {
    const p = perso(["trésorière", "trésorier"]);
    const club = un(["Le club de foot", "La chorale", "Le club de théâtre", "L'association du quartier", "Le club d'échecs", "La classe de CM2"]);
    const o1 = un([["ballons", 12, 25], ["livres", 8, 18], ["jeux", 15, 35], ["tee-shirts", 9, 16], ["gourdes", 6, 14]] as const);
    const o2 = un([["maillots", 18, 30], ["affiches", 3, 9], ["casquettes", 7, 13], ["médailles", 4, 8], ["trophées", 20, 40]] as const);
    const [k1, x1, k2, x2] = [entre(3, 9), entre(o1[1], o1[2]), entre(2, 8), entre(o2[1], o2[2])];
    const depense = k1 * x1 + k2 * x2;
    const B = 50 * Math.ceil((depense + entre(20, 150)) / 50);
    const r = B - depense;
    return {
      text: phrase(`${club} a un budget de ${fr(B)} €.`, `${p.txt} achète ${k1} ${o1[0]} à ${x1} € et ${k2} ${o2[0]} à ${x2} €.`, un(["Combien reste-t-il dans le budget ?", "Quelle somme reste-t-il ?", "Combien d'euros reste-t-il ?"])),
      ...qcmF(r, [B - k1 * x1 - k2 - x2, B - (k1 + k2) * (x1 + x2), B - k1 * x1, B - x1 - x2], avec("€"), 1),
      explanation: etapes("on calcule chaque achat, on les additionne, puis on enlève le tout du budget : budget − (achat 1 + achat 2).", `${k1} × ${x1} = ${k1 * x1} ; ${k2} × ${x2} = ${k2 * x2} ; ${k1 * x1} + ${k2 * x2} = ${depense} ; ${fr(B)} − ${depense} = ${r}.`, `Il reste ${r} €.`),
      canvas: barre([val(k1 * x1, `${k1} × ${x1} €`), val(k2 * x2, `${k2} × ${x2} €`), inconnu("reste")], `${fr(B)} €`),
    };
  }),
];

/* ═════════════════════ LA BANQUE ═════════════════════ */

export const calculBank: TutorBankItemV4[] = [
  ...FIGES,
  ...MEN_ITEMS,
  ...ADD_ITEMS,
  ...SUB_ITEMS,
  ...DAD_ITEMS,
  ...DSU_ITEMS,
  ...PRI_ITEMS,
  ...DEF_ITEMS,
];
