import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Geopolitics B2 ─────────────────────────────────────
const WORDS = [
  { slug: "sovereignty",   en: "sovereignty",   fr: "souveraineté",  audio: "/audio/english-maths/geopolitics/b2/sovereignty.mp3"   },
  { slug: "territory",     en: "territory",     fr: "territoire",    audio: "/audio/english-maths/geopolitics/b2/territory.mp3"     },
  { slug: "conflict",      en: "conflict",      fr: "conflit",       audio: "/audio/english-maths/geopolitics/b2/conflict.mp3"      },
  { slug: "diplomacy",     en: "diplomacy",     fr: "diplomatie",    audio: "/audio/english-maths/geopolitics/b2/diplomacy.mp3"     },
  { slug: "treaty",        en: "treaty",        fr: "traité",        audio: "/audio/english-maths/geopolitics/b2/treaty.mp3"        },
  { slug: "globalisation", en: "globalisation", fr: "mondialisation",audio: "/audio/english-maths/geopolitics/b2/globalisation.mp3" },
  { slug: "development",   en: "development",   fr: "développement", audio: "/audio/english-maths/geopolitics/b2/development.mp3"   },
  { slug: "inequality",    en: "inequality",    fr: "inégalité",     audio: "/audio/english-maths/geopolitics/b2/inequality.mp3"    },
  { slug: "alliance",      en: "alliance",      fr: "alliance",      audio: "/audio/english-maths/geopolitics/b2/alliance.mp3"      },
  { slug: "sanction",      en: "sanction",      fr: "sanction",      audio: "/audio/english-maths/geopolitics/b2/sanction.mp3"      },
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

export const geopoliticsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_geopolitics_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geopolitics",
    microId: "en_b2_geopolitics_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a geopolitics or international relations term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geopolitics", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_geopolitics_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geopolitics",
    microId: "en_b2_geopolitics_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about international politics and world affairs.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["geopolitics", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_geopolitics_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geopolitics",
    microId: "en_b2_geopolitics_listen",
    difficulty: 4 as const,
    text: `Listen and identify the geopolitics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["geopolitics", "b2", "listen"],
  },
]);
