import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Biology A2 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "cell",           en: "cell",           fr: "cellule",        audio: "/audio/english-maths/science_biology/a2/cell.mp3"           },
  { slug: "nucleus",        en: "nucleus",        fr: "noyau",          audio: "/audio/english-maths/science_biology/a2/nucleus.mp3"        },
  { slug: "tissue",         en: "tissue",         fr: "tissu",          audio: "/audio/english-maths/science_biology/a2/tissue.mp3"         },
  { slug: "organ",          en: "organ",          fr: "organe",         audio: "/audio/english-maths/science_biology/a2/organ.mp3"          },
  { slug: "organism",       en: "organism",       fr: "organisme",      audio: "/audio/english-maths/science_biology/a2/organism.mp3"       },
  { slug: "reproduction",   en: "reproduction",   fr: "reproduction",   audio: "/audio/english-maths/science_biology/a2/reproduction.mp3"   },
  { slug: "photosynthesis", en: "photosynthesis", fr: "photosynthèse",  audio: "/audio/english-maths/science_biology/a2/photosynthesis.mp3" },
  { slug: "digestion",      en: "digestion",      fr: "digestion",      audio: "/audio/english-maths/science_biology/a2/digestion.mp3"      },
  { slug: "respiration",    en: "respiration",    fr: "respiration",    audio: "/audio/english-maths/science_biology/a2/respiration.mp3"    },
  { slug: "evolution",      en: "evolution",      fr: "évolution",      audio: "/audio/english-maths/science_biology/a2/evolution.mp3"      },
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

export const scienceBiologyA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_science_biology_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_biology",
    microId: "en_a2_science_biology_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a biology term (SVT).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_biology", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_biology_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_biology",
    microId: "en_a2_science_biology_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about living organisms in biology.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_biology", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_biology_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_biology",
    microId: "en_a2_science_biology_listen",
    difficulty: 3 as const,
    text: `Listen and identify the biology term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_biology", "a2", "listen"],
  },
]);
