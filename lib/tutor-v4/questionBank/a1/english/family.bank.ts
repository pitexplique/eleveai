import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Family A1 ───────────────────────────────────────────────
const WORDS = [
  { slug: "father",      en: "father",      fr: "père",        audio: "/audio/english-maths/family/a1/father.mp3"      },
  { slug: "mother",      en: "mother",      fr: "mère",        audio: "/audio/english-maths/family/a1/mother.mp3"      },
  { slug: "brother",     en: "brother",     fr: "frère",       audio: "/audio/english-maths/family/a1/brother.mp3"     },
  { slug: "sister",      en: "sister",      fr: "sœur",        audio: "/audio/english-maths/family/a1/sister.mp3"      },
  { slug: "son",         en: "son",         fr: "fils",        audio: "/audio/english-maths/family/a1/son.mp3"         },
  { slug: "daughter",    en: "daughter",    fr: "fille",       audio: "/audio/english-maths/family/a1/daughter.mp3"    },
  { slug: "grandfather", en: "grandfather", fr: "grand-père",  audio: "/audio/english-maths/family/a1/grandfather.mp3" },
  { slug: "grandmother", en: "grandmother", fr: "grand-mère",  audio: "/audio/english-maths/family/a1/grandmother.mp3" },
  { slug: "uncle",       en: "uncle",       fr: "oncle",       audio: "/audio/english-maths/family/a1/uncle.mp3"       },
  { slug: "aunt",        en: "aunt",        fr: "tante",       audio: "/audio/english-maths/family/a1/aunt.mp3"        },
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

export const familyA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_family_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family",
    microId: "en_a1_family_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a family member.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["family", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_family_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family",
    microId: "en_a1_family_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about family members.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["family", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_family_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family",
    microId: "en_a1_family_listen",
    difficulty: 2 as const,
    text: `Listen and identify the family member.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["family", "a1", "listen"],
  },
]);
