import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Travel A2 ──────────────────────────────────────────
const WORDS = [
  { slug: "airport",  en: "airport",  fr: "aéroport",  audio: "/audio/english-maths/travel/a2/airport.mp3"  },
  { slug: "passport", en: "passport", fr: "passeport", audio: "/audio/english-maths/travel/a2/passport.mp3" },
  { slug: "ticket",   en: "ticket",   fr: "billet",    audio: "/audio/english-maths/travel/a2/ticket.mp3"   },
  { slug: "hotel",    en: "hotel",    fr: "hôtel",     audio: "/audio/english-maths/travel/a2/hotel.mp3"    },
  { slug: "luggage",  en: "luggage",  fr: "bagages",   audio: "/audio/english-maths/travel/a2/luggage.mp3"  },
  { slug: "flight",   en: "flight",   fr: "vol",       audio: "/audio/english-maths/travel/a2/flight.mp3"   },
  { slug: "bus",      en: "bus",      fr: "bus",       audio: "/audio/english-maths/travel/a2/bus.mp3"      },
  { slug: "train",    en: "train",    fr: "train",     audio: "/audio/english-maths/travel/a2/train.mp3"    },
  { slug: "taxi",     en: "taxi",     fr: "taxi",      audio: "/audio/english-maths/travel/a2/taxi.mp3"     },
  { slug: "map",      en: "map",      fr: "carte",     audio: "/audio/english-maths/travel/a2/map.mp3"      },
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

export const travelA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_travel_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_travel",
    microId: "en_a2_travel_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a travel or transport word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["travel", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_travel_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_travel",
    microId: "en_a2_travel_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about travelling and transport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["travel", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_travel_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_travel",
    microId: "en_a2_travel_listen",
    difficulty: 2 as const,
    text: `Listen and identify the travel word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["travel", "a2", "listen"],
  },
]);
