import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Mathematical phrases / expressions A2 ────────────────────────────────────
const EXPRS = [
  { slug: "equals",           en: "equals",              fr: "est égal à",          audio: "/audio/english-maths/expressions/a2/equals.mp3"           },
  { slug: "result_is",        en: "the result is",       fr: "le résultat est",      audio: "/audio/english-maths/expressions/a2/result_is.mp3"        },
  { slug: "greater_than",     en: "is greater than",     fr: "est supérieur à",      audio: "/audio/english-maths/expressions/a2/greater_than.mp3"     },
  { slug: "less_than",        en: "is less than",        fr: "est inférieur à",      audio: "/audio/english-maths/expressions/a2/less_than.mp3"        },
  { slug: "sum_of",           en: "the sum of",          fr: "la somme de",          audio: "/audio/english-maths/expressions/a2/sum_of.mp3"           },
  { slug: "difference_of",    en: "the difference of",   fr: "la différence de",     audio: "/audio/english-maths/expressions/a2/difference_of.mp3"    },
  { slug: "product_of",       en: "the product of",      fr: "le produit de",        audio: "/audio/english-maths/expressions/a2/product_of.mp3"       },
  { slug: "quotient_of",      en: "the quotient of",     fr: "le quotient de",       audio: "/audio/english-maths/expressions/a2/quotient_of.mp3"      },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = EXPRS.filter((e) => e.fr !== exclude).map((e) => e.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = EXPRS.filter((e) => e.en !== exclude).map((e) => e.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const expressionsA2Bank: TutorBankItemV4[] = EXPRS.flatMap((expr, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_expressions_en_to_fr_${expr.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_expressions",
    microId: "en_a2_expressions_en_to_fr",
    difficulty: 2 as const,
    text: `What does the expression "${expr.en}" mean in French?`,
    format: "qcm" as const,
    choices: [expr.fr, ...distractorsFr(expr.fr, idx)],
    expected: [expr.fr],
    comparator: "mcq_exact" as const,
    hint: `Think about maths operations and comparisons.`,
    explanation: `"${expr.en}" means "${expr.fr}" in French.`,
    tags: ["expressions", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_expressions_fr_to_en_${expr.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_expressions",
    microId: "en_a2_expressions_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${expr.fr}" in English?`,
    format: "qcm" as const,
    choices: [expr.en, ...distractorsEn(expr.en, idx + 4)],
    expected: [expr.en],
    comparator: "mcq_exact" as const,
    hint: `It's a mathematical phrase used to describe a result or comparison.`,
    explanation: `"${expr.fr}" is expressed as "${expr.en}" in English.`,
    tags: ["expressions", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_expressions_listen_${expr.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_expressions",
    microId: "en_a2_expressions_listen",
    difficulty: 3 as const,
    text: `Listen and choose the correct expression.`,
    format: "qcm" as const,
    choices: [expr.en, ...distractorsEn(expr.en, idx + 2)],
    expected: [expr.en],
    comparator: "mcq_exact" as const,
    audioSrc: expr.audio,
    hint: `Focus on key words like "sum", "product", "greater"…`,
    explanation: `The expression you heard is "${expr.en}" (${expr.fr}).`,
    tags: ["expressions", "a2", "listen"],
  },
]);
