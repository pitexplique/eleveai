import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── 15 reasoning verbs B1 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "estimate",     en: "estimate",     fr: "estimer",       audio: "/audio/english-maths/verbs/b1/estimate.mp3"     },
  { slug: "explain",      en: "explain",      fr: "expliquer",     audio: "/audio/english-maths/verbs/b1/explain.mp3"      },
  { slug: "justify",      en: "justify",      fr: "justifier",     audio: "/audio/english-maths/verbs/b1/justify.mp3"      },
  { slug: "simplify",     en: "simplify",     fr: "simplifier",    audio: "/audio/english-maths/verbs/b1/simplify.mp3"     },
  { slug: "convert",      en: "convert",      fr: "convertir",     audio: "/audio/english-maths/verbs/b1/convert.mp3"      },
  { slug: "represent",    en: "represent",    fr: "représenter",   audio: "/audio/english-maths/verbs/b1/represent.mp3"    },
  { slug: "deduce",       en: "deduce",       fr: "déduire",       audio: "/audio/english-maths/verbs/b1/deduce.mp3"       },
  { slug: "conclude",     en: "conclude",     fr: "conclure",      audio: "/audio/english-maths/verbs/b1/conclude.mp3"     },
  { slug: "prove",        en: "prove",        fr: "prouver",       audio: "/audio/english-maths/verbs/b1/prove.mp3"        },
  { slug: "factorise",    en: "factorise",    fr: "factoriser",    audio: "/audio/english-maths/verbs/b1/factorise.mp3"    },
  { slug: "expand",       en: "expand",       fr: "développer",    audio: "/audio/english-maths/verbs/b1/expand.mp3"       },
  { slug: "reduce",       en: "reduce",       fr: "réduire",       audio: "/audio/english-maths/verbs/b1/reduce.mp3"       },
  { slug: "substitute",   en: "substitute",   fr: "substituer",    audio: "/audio/english-maths/verbs/b1/substitute.mp3"   },
  { slug: "evaluate",     en: "evaluate",     fr: "évaluer",       audio: "/audio/english-maths/verbs/b1/evaluate.mp3"     },
  { slug: "demonstrate",  en: "demonstrate",  fr: "démontrer",     audio: "/audio/english-maths/verbs/b1/demonstrate.mp3"  },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.en !== exclude).map((w) => w.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const verbsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_en_to_fr",
    difficulty: 2 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a reasoning or method verb used in maths.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["verbs", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["verbs", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_listen",
    difficulty: 3 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 10)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["verbs", "b1", "listen"],
  },
]);
