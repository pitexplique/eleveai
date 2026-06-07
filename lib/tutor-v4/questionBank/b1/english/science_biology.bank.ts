import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Biology B1 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "chromosome", en: "chromosome", fr: "chromosome",  audio: "/audio/english-maths/science_biology/b1/chromosome.mp3" },
  { slug: "enzyme",     en: "enzyme",     fr: "enzyme",      audio: "/audio/english-maths/science_biology/b1/enzyme.mp3"     },
  { slug: "protein",    en: "protein",    fr: "protéine",    audio: "/audio/english-maths/science_biology/b1/protein.mp3"    },
  { slug: "membrane",   en: "membrane",   fr: "membrane",    audio: "/audio/english-maths/science_biology/b1/membrane.mp3"   },
  { slug: "mutation",   en: "mutation",   fr: "mutation",    audio: "/audio/english-maths/science_biology/b1/mutation.mp3"   },
  { slug: "hormone",    en: "hormone",    fr: "hormone",     audio: "/audio/english-maths/science_biology/b1/hormone.mp3"    },
  { slug: "antibody",   en: "antibody",   fr: "anticorps",   audio: "/audio/english-maths/science_biology/b1/antibody.mp3"   },
  { slug: "ecosystem",  en: "ecosystem",  fr: "écosystème",  audio: "/audio/english-maths/science_biology/b1/ecosystem.mp3"  },
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

export const scienceBiologyB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_science_biology_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_biology",
    microId: "en_b1_science_biology_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a biology term (SVT — level B1).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_biology", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_biology_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_biology",
    microId: "en_b1_science_biology_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about cells, genetics and living systems.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_biology", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_biology_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_biology",
    microId: "en_b1_science_biology_listen",
    difficulty: 3 as const,
    text: `Listen and identify the biology term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_biology", "b1", "listen"],
  },
]);
