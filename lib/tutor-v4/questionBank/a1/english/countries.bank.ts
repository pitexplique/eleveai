import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Countries A1 ───────────────────────────────────────
const WORDS = [
  { slug: "france",     en: "France",     fr: "France",       audio: "/audio/english-maths/countries/a1/france.mp3"     },
  { slug: "reunion",    en: "Réunion",    fr: "La Réunion",   audio: "/audio/english-maths/countries/a1/reunion.mp3"    },
  { slug: "madagascar", en: "Madagascar", fr: "Madagascar",   audio: "/audio/english-maths/countries/a1/madagascar.mp3" },
  { slug: "mauritius",  en: "Mauritius",  fr: "Maurice",      audio: "/audio/english-maths/countries/a1/mauritius.mp3"  },
  { slug: "africa",     en: "Africa",     fr: "Afrique",      audio: "/audio/english-maths/countries/a1/africa.mp3"     },
  { slug: "europe",     en: "Europe",     fr: "Europe",       audio: "/audio/english-maths/countries/a1/europe.mp3"     },
  { slug: "asia",       en: "Asia",       fr: "Asie",         audio: "/audio/english-maths/countries/a1/asia.mp3"       },
  { slug: "america",    en: "America",    fr: "Amérique",     audio: "/audio/english-maths/countries/a1/america.mp3"    },
  { slug: "australia",  en: "Australia",  fr: "Australie",    audio: "/audio/english-maths/countries/a1/australia.mp3"  },
  { slug: "india",      en: "India",      fr: "Inde",         audio: "/audio/english-maths/countries/a1/india.mp3"      },
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

export const countriesA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_countries_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_countries",
    microId: "en_a1_countries_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a country or continent.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["countries", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_countries_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_countries",
    microId: "en_a1_countries_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about countries and continents.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["countries", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_countries_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_countries",
    microId: "en_a1_countries_listen",
    difficulty: 2 as const,
    text: `Listen and identify the country or continent.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The place you heard is "${word.en}" (${word.fr}).`,
    tags: ["countries", "a1", "listen"],
  },
]);
