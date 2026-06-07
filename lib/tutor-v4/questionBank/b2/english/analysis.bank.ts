import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Analysis vocabulary B2 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "derivative",  en: "derivative",  fr: "dérivée",       audio: "/audio/english-maths/analysis/b2/derivative.mp3"  },
  { slug: "integral",    en: "integral",    fr: "intégrale",     audio: "/audio/english-maths/analysis/b2/integral.mp3"    },
  { slug: "limit",       en: "limit",       fr: "limite",        audio: "/audio/english-maths/analysis/b2/limit.mp3"       },
  { slug: "asymptote",   en: "asymptote",   fr: "asymptote",     audio: "/audio/english-maths/analysis/b2/asymptote.mp3"   },
  { slug: "sequence",    en: "sequence",    fr: "suite",         audio: "/audio/english-maths/analysis/b2/sequence.mp3"    },
  { slug: "series",      en: "series",      fr: "série",         audio: "/audio/english-maths/analysis/b2/series.mp3"      },
  { slug: "continuous",  en: "continuous",  fr: "continu",       audio: "/audio/english-maths/analysis/b2/continuous.mp3"  },
  { slug: "convergent",  en: "convergent",  fr: "convergent",    audio: "/audio/english-maths/analysis/b2/convergent.mp3"  },
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

export const analysisB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_analysis_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_analysis",
    microId: "en_b2_analysis_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a term used in calculus and mathematical analysis.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["analysis", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_analysis_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_analysis",
    microId: "en_b2_analysis_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about analysis: sequences, derivatives, limits…`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["analysis", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_analysis_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_analysis",
    microId: "en_b2_analysis_listen",
    difficulty: 4 as const,
    text: `Listen and identify the analysis term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["analysis", "b2", "listen"],
  },
]);
