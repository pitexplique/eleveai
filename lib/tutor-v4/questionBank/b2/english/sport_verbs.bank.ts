import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport verbs B2 — modélisation, optimisation ───────────────────────────────
const WORDS = [
  { slug: "model",       en: "model",       fr: "modéliser",     audio: "/audio/english-maths/sport_verbs/b2/model.mp3"       },
  { slug: "derive",      en: "derive",      fr: "dériver",       audio: "/audio/english-maths/sport_verbs/b2/derive.mp3"      },
  { slug: "optimise",    en: "optimise",    fr: "optimiser",     audio: "/audio/english-maths/sport_verbs/b2/optimise.mp3"    },
  { slug: "maximise",    en: "maximise",    fr: "maximiser",     audio: "/audio/english-maths/sport_verbs/b2/maximise.mp3"    },
  { slug: "minimise",    en: "minimise",    fr: "minimiser",     audio: "/audio/english-maths/sport_verbs/b2/minimise.mp3"    },
  { slug: "simulate",    en: "simulate",    fr: "simuler",       audio: "/audio/english-maths/sport_verbs/b2/simulate.mp3"    },
  { slug: "predict",     en: "predict",     fr: "prédire",       audio: "/audio/english-maths/sport_verbs/b2/predict.mp3"     },
  { slug: "extrapolate", en: "extrapolate", fr: "extrapoler",    audio: "/audio/english-maths/sport_verbs/b2/extrapolate.mp3" },
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

export const sportVerbsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_sport_verbs_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_verbs",
    microId: "en_b2_sport_verbs_en_to_fr",
    difficulty: 3 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's used in mathematical modelling and sport science.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_verbs", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_verbs_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_verbs",
    microId: "en_b2_sport_verbs_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about optimisation and modelling.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_verbs", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_verbs_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_verbs",
    microId: "en_b2_sport_verbs_listen",
    difficulty: 4 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_verbs", "b2", "listen"],
  },
]);
