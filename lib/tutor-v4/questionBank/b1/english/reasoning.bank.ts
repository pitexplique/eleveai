import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Reasoning phrases B1 ──────────────────────────────────────────────────────
const PHRASES = [
  { slug: "therefore",       en: "therefore",           fr: "donc",                    audio: "/audio/english-maths/reasoning/b1/therefore.mp3"       },
  { slug: "given_that",      en: "given that",          fr: "étant donné que",         audio: "/audio/english-maths/reasoning/b1/given_that.mp3"      },
  { slug: "let_x_be",        en: "let x be",            fr: "soit x",                  audio: "/audio/english-maths/reasoning/b1/let_x_be.mp3"        },
  { slug: "we_know_that",    en: "we know that",        fr: "on sait que",             audio: "/audio/english-maths/reasoning/b1/we_know_that.mp3"    },
  { slug: "it_follows_that", en: "it follows that",     fr: "il s'ensuit que",         audio: "/audio/english-maths/reasoning/b1/it_follows_that.mp3" },
  { slug: "if_and_only_if",  en: "if and only if",      fr: "si et seulement si",      audio: "/audio/english-maths/reasoning/b1/if_and_only_if.mp3"  },
  { slug: "we_can_deduce",   en: "we can deduce that",  fr: "on peut déduire que",     audio: "/audio/english-maths/reasoning/b1/we_can_deduce.mp3"   },
  { slug: "which_gives",     en: "which gives",         fr: "ce qui donne",            audio: "/audio/english-maths/reasoning/b1/which_gives.mp3"     },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = PHRASES.filter((p) => p.fr !== exclude).map((p) => p.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = PHRASES.filter((p) => p.en !== exclude).map((p) => p.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const reasoningB1Bank: TutorBankItemV4[] = PHRASES.flatMap((phrase, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_reasoning_en_to_fr_${phrase.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_reasoning",
    microId: "en_b1_reasoning_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${phrase.en}" mean in French?`,
    format: "qcm" as const,
    choices: [phrase.fr, ...distractorsFr(phrase.fr, idx)],
    expected: [phrase.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a reasoning phrase used in maths proofs.`,
    explanation: `"${phrase.en}" means "${phrase.fr}" in French.`,
    tags: ["reasoning", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_reasoning_fr_to_en_${phrase.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_reasoning",
    microId: "en_b1_reasoning_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${phrase.fr}" in English?`,
    format: "qcm" as const,
    choices: [phrase.en, ...distractorsEn(phrase.en, idx + 4)],
    expected: [phrase.en],
    comparator: "mcq_exact" as const,
    hint: `Think about logical connectors and reasoning language.`,
    explanation: `"${phrase.fr}" is "${phrase.en}" in English.`,
    tags: ["reasoning", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_reasoning_listen_${phrase.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_reasoning",
    microId: "en_b1_reasoning_listen",
    difficulty: 3 as const,
    text: `Listen and choose the correct reasoning phrase.`,
    format: "qcm" as const,
    choices: [phrase.en, ...distractorsEn(phrase.en, idx + 6)],
    expected: [phrase.en],
    comparator: "mcq_exact" as const,
    audioSrc: phrase.audio,
    hint: `Listen for key connector words.`,
    explanation: `The phrase you heard is "${phrase.en}" (${phrase.fr}).`,
    tags: ["reasoning", "b1", "listen"],
  },
]);
