import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Physical geography B1 ───────────────────────────────
const WORDS = [
  { slug: "relief",      en: "relief",      fr: "relief",       audio: "/audio/english-maths/physical_geography/b1/relief.mp3"      },
  { slug: "altitude",    en: "altitude",    fr: "altitude",     audio: "/audio/english-maths/physical_geography/b1/altitude.mp3"    },
  { slug: "longitude",   en: "longitude",   fr: "longitude",    audio: "/audio/english-maths/physical_geography/b1/longitude.mp3"   },
  { slug: "coordinates", en: "coordinates", fr: "coordonnées",  audio: "/audio/english-maths/physical_geography/b1/coordinates.mp3" },
  { slug: "hemisphere",  en: "hemisphere",  fr: "hémisphère",   audio: "/audio/english-maths/physical_geography/b1/hemisphere.mp3"  },
  { slug: "equator",     en: "equator",     fr: "équateur",     audio: "/audio/english-maths/physical_geography/b1/equator.mp3"     },
  { slug: "tropics",     en: "tropics",     fr: "tropiques",    audio: "/audio/english-maths/physical_geography/b1/tropics.mp3"     },
  { slug: "erosion",     en: "erosion",     fr: "érosion",      audio: "/audio/english-maths/physical_geography/b1/erosion.mp3"     },
  { slug: "sediment",    en: "sediment",    fr: "sédiment",     audio: "/audio/english-maths/physical_geography/b1/sediment.mp3"    },
  { slug: "tectonic",    en: "tectonic",    fr: "tectonique",   audio: "/audio/english-maths/physical_geography/b1/tectonic.mp3"    },
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

export const physicalGeographyB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_physical_geography_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_physical_geography",
    microId: "en_b1_physical_geography_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a physical geography term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["physical_geography", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_physical_geography_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_physical_geography",
    microId: "en_b1_physical_geography_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about the Earth's structure and geography.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["physical_geography", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_physical_geography_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_physical_geography",
    microId: "en_b1_physical_geography_listen",
    difficulty: 3 as const,
    text: `Listen and identify the geography term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["physical_geography", "b1", "listen"],
  },
]);
