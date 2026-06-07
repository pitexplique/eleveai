import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Environment B1 ─────────────────────────────────────
const WORDS = [
  { slug: "ecosystem",      en: "ecosystem",      fr: "écosystème",       audio: "/audio/english-maths/environment/b1/ecosystem.mp3"      },
  { slug: "biodiversity",   en: "biodiversity",   fr: "biodiversité",     audio: "/audio/english-maths/environment/b1/biodiversity.mp3"   },
  { slug: "deforestation",  en: "deforestation",  fr: "déforestation",    audio: "/audio/english-maths/environment/b1/deforestation.mp3"  },
  { slug: "pollution",      en: "pollution",      fr: "pollution",        audio: "/audio/english-maths/environment/b1/pollution.mp3"      },
  { slug: "conservation",   en: "conservation",   fr: "conservation",     audio: "/audio/english-maths/environment/b1/conservation.mp3"   },
  { slug: "habitat",        en: "habitat",        fr: "habitat",          audio: "/audio/english-maths/environment/b1/habitat.mp3"        },
  { slug: "climate_change", en: "climate change", fr: "changement climatique", audio: "/audio/english-maths/environment/b1/climate_change.mp3" },
  { slug: "renewable",      en: "renewable",      fr: "renouvelable",     audio: "/audio/english-maths/environment/b1/renewable.mp3"      },
  { slug: "sustainability", en: "sustainability", fr: "durabilité",       audio: "/audio/english-maths/environment/b1/sustainability.mp3" },
  { slug: "species",        en: "species",        fr: "espèce",           audio: "/audio/english-maths/environment/b1/species.mp3"        },
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

export const environmentB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_environment_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_environment",
    microId: "en_b1_environment_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an environment or ecology term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["environment", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_environment_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_environment",
    microId: "en_b1_environment_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about nature, ecology and the environment.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["environment", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_environment_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_environment",
    microId: "en_b1_environment_listen",
    difficulty: 3 as const,
    text: `Listen and identify the environment term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["environment", "b1", "listen"],
  },
]);
