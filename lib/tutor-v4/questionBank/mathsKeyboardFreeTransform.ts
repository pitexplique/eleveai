// Transforme les questions à RÉPONSE TAPÉE (format "short", réponse numérique)
// en QCM cliquables, pour supprimer la saisie clavier en primaire (CM1/CM2).
// Demande du principal (20/06/2026) : en CM1/CM2 les élèves tapent trop
// lentement → on remplace la frappe par un clic.
//
// Principe : on garde EXACTEMENT expected[0] comme bonne réponse (l'évaluateur
// compare le choix cliqué à expected, cf. lib/tutor/evaluation/comparators.ts),
// et on fabrique 3 distracteurs numériques proches, en conservant l'unité et le
// format (virgule décimale, « 18 cm », « 18cm »…) de la bonne réponse.
//
// Questions "open" (rédaction) : seules celles qui demandent « quelle opération
// choisir ? » deviennent un QCM des 4 opérations ; toutes les autres
// (« Explique pourquoi/comment… », conceptuel) sont RETIRÉES de la banque.

import type {
  ComparatorName,
  QuestionFormat,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

type Parsed = {
  value: number;
  decimals: number;
  usesComma: boolean;
};

// Extrait le nombre en tête de la chaîne : « 18 », « 18 cm », « 2,5 », « 1000 ».
// Refuse les chaînes dont le suffixe commence par un chiffre (ex. « 1 000 » avec
// espace milliers) pour éviter de mal découper — par sécurité on ne convertit
// alors pas.
function parseNumeric(raw: string): Parsed | null {
  const m = raw.trim().match(/^(-?\d+(?:[.,]\d+)?)(.*)$/s);
  if (!m) return null;

  const numPart = m[1];
  const rest = m[2].trim();
  if (/^\d/.test(rest)) return null; // « 1 000 » → suffixe commence par un chiffre

  const usesComma = numPart.includes(",");
  const normalized = numPart.replace(",", ".");
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;

  const decimals = normalized.includes(".")
    ? normalized.split(".")[1].length
    : 0;

  return { value, decimals, usesComma };
}

// Reconstruit une chaîne identique à l'originale mais avec un autre nombre :
// préserve le suffixe (unité, espaces) et le style (virgule / point).
function withNumber(original: string, parsed: Parsed, newValue: number): string {
  const m = original.match(/^(\s*)(-?\d+(?:[.,]\d+)?)(.*)$/s);
  if (!m) return original;

  let numStr =
    parsed.decimals > 0 ? newValue.toFixed(parsed.decimals) : String(newValue);
  if (parsed.usesComma) numStr = numStr.replace(".", ",");

  return `${m[1]}${numStr}${m[3]}`;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// On vise 3 distracteurs PÉDAGOGIQUES et variés (pas trois nombres collés à la
// bonne réponse) : un « voisin » proche, une erreur d'ordre de grandeur (±10),
// et une erreur d'échelle (×2 ou ÷2). On pioche un candidat valide dans chaque
// groupe, puis on complète si besoin.
function pickDistractorValues(parsed: Parsed): number[] {
  const v = parsed.value;
  const step =
    parsed.decimals > 0
      ? Number(Math.pow(10, -parsed.decimals).toFixed(parsed.decimals))
      : 1;
  const round = (x: number) =>
    parsed.decimals > 0 ? Number(x.toFixed(parsed.decimals)) : Math.round(x);

  const groups = [
    [v + step, v - step, v + 2 * step, v - 2 * step], // voisins proches
    [v + 10 * step, v - 10 * step, v + 5 * step, v - 5 * step], // ordre de grandeur
    [round(v * 2), round(v / 2), round(v * 3)], // échelle
  ];

  const out: number[] = [];
  const isValid = (c: number) =>
    c !== v &&
    (c >= 0 || v < 0) && // pas de négatif, sauf si la réponse est négative
    (parsed.decimals > 0 || Number.isInteger(c)) &&
    !out.includes(c);

  // Un candidat par groupe (dans un ordre aléatoire interne).
  for (const group of groups) {
    if (out.length >= 3) break;
    const pick = shuffle(group.map(round)).find(isValid);
    if (pick !== undefined) out.push(pick);
  }

  // Complète si un groupe n'a rien donné (petits nombres, etc.).
  if (out.length < 3) {
    const fillers = groups.flat().map(round);
    for (const c of fillers) {
      if (out.length >= 3) break;
      if (isValid(c)) out.push(c);
    }
  }

  return out;
}

type QcmOverride = {
  format: QuestionFormat;
  choices: string[];
  comparator: ComparatorName;
  /**
   * Réécrit la réponse attendue quand les propositions ne sortent PAS de
   * `expected` — c'est le cas des QCM d'opérations, fabriqués à partir d'une
   * table d'étiquettes. Laissé vide pour les « short » numériques, dont
   * `expected[0]` est déjà l'une des propositions.
   */
  expected?: string[];
};

// Calcule les champs QCM à appliquer si la question est un "short" numérique.
// Renvoie null si rien à convertir (autre format, réponse non numérique…).
function qcmOverride(
  format: QuestionFormat,
  expected: string[]
): QcmOverride | null {
  if (format !== "short") return null;

  const correct = expected[0];
  if (typeof correct !== "string") return null;

  const parsed = parseNumeric(correct);
  if (!parsed) return null;

  const distractors = pickDistractorValues(parsed).map((v) =>
    withNumber(correct, parsed, v)
  );

  // Choix uniques (correct + 3 distracteurs distincts).
  const unique: string[] = [];
  for (const choice of [correct, ...distractors]) {
    if (!unique.includes(choice)) unique.push(choice);
  }
  if (unique.length < 4) return null;

  return {
    format: "qcm",
    choices: shuffle(unique).slice(0, 4),
    comparator: "mcq_exact",
  };
}

// --- Questions "open" (rédaction) ---------------------------------------
// On ne garde QUE le sous-ensemble convertible proprement : les énoncés qui
// demandent « quelle opération choisir ? » deviennent un QCM des 4 opérations.
// Tout le reste (« Explique pourquoi… », « Explique comment… », conceptuel) est
// RETIRÉ : pas de clavier en primaire et pas de QCM bricolé incohérent.

const OPERATIONS = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
] as const;

const OPERATION_LABELS: Record<string, string> = {
  addition: "Addition",
  soustraction: "Soustraction",
  multiplication: "Multiplication",
  division: "Division",
};

function operationOverride(
  text: string,
  expected: string[]
): QcmOverride | null {
  if (!/quelle\s+op[ée]ration/i.test(text)) return null;

  // Une seule opération attendue, sinon ambigu → on ne convertit pas.
  const found = OPERATIONS.filter((op) => expected.includes(op));
  if (found.length !== 1) return null;

  // ⚠️ `expected` EST RÉÉCRIT, et ce n'est pas cosmétique (corrigé le 15/08).
  // Les propositions sortent d'ici, pas de `expected` : sans cette ligne
  // l'item gardait la liste de mots-clés de sa version tapée
  // (["240", "136", "addition", "total", "376"]) et `expected[0]` était un
  // NOMBRE, alors qu'aucune proposition n'est un nombre.
  // L'élève, lui, n'était pas pénalisé — `mcq_exact` accepte n'importe quel
  // élément de la liste et normalise la casse. Mais tout code qui lit
  // `expected[0]` comme « la bonne réponse » comptait un clic juste comme
  // faux : c'est ce que fait `construireBilan` dans le moteur des épreuves
  // nationales (`reponses[index] === q.expected[0]`), et c'est le contrat
  // écrit en tête de ce fichier.
  // On garde l'étiquette telle qu'elle est affichée, pas le mot en minuscules :
  // la proposition cliquée et la réponse attendue doivent être la MÊME chaîne.
  return {
    format: "qcm",
    choices: shuffle(OPERATIONS.map((op) => OPERATION_LABELS[op])),
    comparator: "mcq_exact",
    expected: [OPERATION_LABELS[found[0]]],
  };
}

type Resolution =
  | { kind: "keep" }
  | { kind: "drop" }
  | { kind: "override"; override: QcmOverride };

function resolve(
  format: QuestionFormat,
  text: string,
  expected: string[]
): Resolution {
  if (format === "short") {
    const override = qcmOverride(format, expected);
    return override ? { kind: "override", override } : { kind: "keep" };
  }
  if (format === "open") {
    const override = operationOverride(text, expected);
    return override ? { kind: "override", override } : { kind: "drop" };
  }
  return { kind: "keep" };
}

function transformItem(item: TutorBankItemV4): TutorBankItemV4 | null {
  if (item.kind === "fixed") {
    const r = resolve(item.format, item.text, item.expected);
    if (r.kind === "drop") return null;
    return r.kind === "override" ? { ...item, ...r.override } : item;
  }

  // Template : on « renifle » une génération pour repérer les "open" à retirer
  // (le format n'est connu qu'à l'exécution de generate()).
  let sniff: ReturnType<typeof item.generate> | null = null;
  try {
    sniff = item.generate();
  } catch {
    sniff = null;
  }
  if (sniff && resolve(sniff.format, sniff.text, sniff.expected).kind === "drop") {
    return null;
  }

  const originalGenerate = item.generate;
  return {
    ...item,
    generate: () => {
      const q = originalGenerate();
      const r = resolve(q.format, q.text, q.expected);
      return r.kind === "override" ? { ...q, ...r.override } : q;
    },
  };
}

export function applyMathsKeyboardFree(
  bank: TutorBankItemV4[]
): TutorBankItemV4[] {
  return bank
    .map(transformItem)
    .filter((item): item is TutorBankItemV4 => item !== null);
}
