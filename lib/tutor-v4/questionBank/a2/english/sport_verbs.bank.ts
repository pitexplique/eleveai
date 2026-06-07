import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport verbs A2 ────────────────────────────────────────────────────────────
const WORDS = [
  { slug: "run",     en: "run",     fr: "courir",        audio: "/audio/english-maths/sport_verbs/a2/run.mp3"     },
  { slug: "jump",    en: "jump",    fr: "sauter",        audio: "/audio/english-maths/sport_verbs/a2/jump.mp3"    },
  { slug: "throw",   en: "throw",   fr: "lancer",        audio: "/audio/english-maths/sport_verbs/a2/throw.mp3"   },
  { slug: "catch",   en: "catch",   fr: "attraper",      audio: "/audio/english-maths/sport_verbs/a2/catch.mp3"   },
  { slug: "kick",    en: "kick",    fr: "frapper",       audio: "/audio/english-maths/sport_verbs/a2/kick.mp3"    },
  { slug: "score",   en: "score",   fr: "marquer",       audio: "/audio/english-maths/sport_verbs/a2/score.mp3"   },
  { slug: "win",     en: "win",     fr: "gagner",        audio: "/audio/english-maths/sport_verbs/a2/win.mp3"     },
  { slug: "lose",    en: "lose",    fr: "perdre",        audio: "/audio/english-maths/sport_verbs/a2/lose.mp3"    },
  { slug: "train",   en: "train",   fr: "s'entraîner",   audio: "/audio/english-maths/sport_verbs/a2/train.mp3"   },
  { slug: "sprint",  en: "sprint",  fr: "sprinter",      audio: "/audio/english-maths/sport_verbs/a2/sprint.mp3"  },
  { slug: "measure", en: "measure", fr: "mesurer",       audio: "/audio/english-maths/sport_verbs/a2/measure.mp3" },
  { slug: "record",  en: "record",  fr: "enregistrer",   audio: "/audio/english-maths/sport_verbs/a2/record.mp3"  },
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

export const sportVerbsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_sport_verbs_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_verbs",
    microId: "en_a2_sport_verbs_en_to_fr",
    difficulty: 1 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a sport action verb.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_verbs", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_verbs_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_verbs",
    microId: "en_a2_sport_verbs_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about sport actions.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_verbs", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_verbs_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_verbs",
    microId: "en_a2_sport_verbs_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct sport verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 9)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_verbs", "a2", "listen"],
  },
]);
