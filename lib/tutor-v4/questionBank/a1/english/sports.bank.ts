import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sports names A1 ───────────────────────────────────────────────────────────
const SPORTS = [
  { slug: "football",    en: "football",    fr: "football",       audio: "/audio/english-maths/sports/a1/football.mp3"    },
  { slug: "basketball",  en: "basketball",  fr: "basket-ball",    audio: "/audio/english-maths/sports/a1/basketball.mp3"  },
  { slug: "athletics",   en: "athletics",   fr: "athlétisme",     audio: "/audio/english-maths/sports/a1/athletics.mp3"   },
  { slug: "swimming",    en: "swimming",    fr: "natation",       audio: "/audio/english-maths/sports/a1/swimming.mp3"    },
  { slug: "cycling",     en: "cycling",     fr: "cyclisme",       audio: "/audio/english-maths/sports/a1/cycling.mp3"     },
  { slug: "tennis",      en: "tennis",      fr: "tennis",         audio: "/audio/english-maths/sports/a1/tennis.mp3"      },
  { slug: "rugby",       en: "rugby",       fr: "rugby",          audio: "/audio/english-maths/sports/a1/rugby.mp3"       },
  { slug: "surfing",     en: "surfing",     fr: "surf",           audio: "/audio/english-maths/sports/a1/surfing.mp3"     },
  { slug: "running",     en: "running",     fr: "course à pied",  audio: "/audio/english-maths/sports/a1/running.mp3"     },
  { slug: "volleyball",  en: "volleyball",  fr: "volley-ball",    audio: "/audio/english-maths/sports/a1/volleyball.mp3"  },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = SPORTS.filter((w) => w.fr !== exclude).map((w) => w.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = SPORTS.filter((w) => w.en !== exclude).map((w) => w.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const sportsA1Bank: TutorBankItemV4[] = SPORTS.flatMap((sport, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_sports_en_to_fr_${sport.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sports",
    microId: "en_a1_sports_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${sport.en}" mean in French?`,
    format: "qcm" as const,
    choices: [sport.fr, ...distractorsFr(sport.fr, idx)],
    expected: [sport.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a sport or physical activity.`,
    explanation: `"${sport.en}" means "${sport.fr}" in French.`,
    tags: ["sports", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_sports_fr_to_en_${sport.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sports",
    microId: "en_a1_sports_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${sport.fr}" in English?`,
    format: "qcm" as const,
    choices: [sport.en, ...distractorsEn(sport.en, idx + 4)],
    expected: [sport.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${sport.en[0].toUpperCase()}".`,
    explanation: `"${sport.fr}" is "${sport.en}" in English.`,
    tags: ["sports", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_sports_listen_${sport.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sports",
    microId: "en_a1_sports_listen",
    difficulty: 2 as const,
    text: `Listen and identify the sport.`,
    format: "qcm" as const,
    choices: [sport.en, ...distractorsEn(sport.en, idx + 7)],
    expected: [sport.en],
    comparator: "mcq_exact" as const,
    audioSrc: sport.audio,
    hint: `Listen carefully.`,
    explanation: `The sport you heard is "${sport.en}" (${sport.fr}).`,
    tags: ["sports", "a1", "listen"],
  },
]);
