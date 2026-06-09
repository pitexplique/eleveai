import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "madre",   es: "madre",   fr: "mère",       audio: "/audio/espagnol/family/madre.mp3"   },
  { slug: "padre",   es: "padre",   fr: "père",       audio: "/audio/espagnol/family/padre.mp3"   },
  { slug: "hermano", es: "hermano", fr: "frère",      audio: "/audio/espagnol/family/hermano.mp3" },
  { slug: "hermana", es: "hermana", fr: "sœur",       audio: "/audio/espagnol/family/hermana.mp3" },
  { slug: "abuelo",  es: "abuelo",  fr: "grand-père", audio: "/audio/espagnol/family/abuelo.mp3"  },
  { slug: "abuela",  es: "abuela",  fr: "grand-mère", audio: "/audio/espagnol/family/abuela.mp3"  },
  { slug: "hijo",    es: "hijo",    fr: "fils",       audio: "/audio/espagnol/family/hijo.mp3"    },
  { slug: "hija",    es: "hija",    fr: "fille",      audio: "/audio/espagnol/family/hija.mp3"    },
  { slug: "tio",     es: "tío",     fr: "oncle",      audio: "/audio/espagnol/family/tio.mp3"     },
  { slug: "tia",     es: "tía",     fr: "tante",      audio: "/audio/espagnol/family/tia.mp3"     },
  { slug: "primo",   es: "primo",   fr: "cousin",     audio: "/audio/espagnol/family/primo.mp3"   },
  { slug: "prima",   es: "prima",   fr: "cousine",    audio: "/audio/espagnol/family/prima.mp3"   },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const familyA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_family_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_family",
    microId: "es_a1_family_es_to_fr",
    difficulty: 1 as const,
    text: `Que signifie "${word.es}" en français ?`,
    format: "qcm" as const,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    explanation: `"${word.es}" = "${word.fr}".`,
  },
  {
    kind: "fixed" as const,
    id: `es_a1_family_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_family",
    microId: "es_a1_family_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
  {
    kind: "fixed" as const,
    id: `es_a1_family_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_family",
    microId: "es_a1_family_listen",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `Le mot entendu est "${word.es}" (${word.fr}).`,
  },
]);
