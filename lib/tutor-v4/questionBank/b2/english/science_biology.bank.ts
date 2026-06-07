import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Biology B2 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "genome",       en: "genome",       fr: "génome",        audio: "/audio/english-maths/science_biology/b2/genome.mp3"       },
  { slug: "mitosis",      en: "mitosis",      fr: "mitose",        audio: "/audio/english-maths/science_biology/b2/mitosis.mp3"      },
  { slug: "metabolism",   en: "metabolism",   fr: "métabolisme",   audio: "/audio/english-maths/science_biology/b2/metabolism.mp3"   },
  { slug: "homeostasis",  en: "homeostasis",  fr: "homéostasie",   audio: "/audio/english-maths/science_biology/b2/homeostasis.mp3"  },
  { slug: "catalyst",     en: "catalyst",     fr: "catalyseur",    audio: "/audio/english-maths/science_biology/b2/catalyst.mp3"     },
  { slug: "neural",       en: "neural",       fr: "neural",        audio: "/audio/english-maths/science_biology/b2/neural.mp3"       },
  { slug: "biodiversity", en: "biodiversity", fr: "biodiversité",  audio: "/audio/english-maths/science_biology/b2/biodiversity.mp3" },
  { slug: "meiosis",      en: "meiosis",      fr: "méiose",        audio: "/audio/english-maths/science_biology/b2/meiosis.mp3"      },
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

export const scienceBiologyB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_science_biology_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_biology",
    microId: "en_b2_science_biology_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an advanced biology term (SVT terminale).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_biology", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_biology_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_biology",
    microId: "en_b2_science_biology_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about genetics, cell division and life processes.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_biology", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_biology_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_biology",
    microId: "en_b2_science_biology_listen",
    difficulty: 4 as const,
    text: `Listen and identify the biology term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_biology", "b2", "listen"],
  },
]);
