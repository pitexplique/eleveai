import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "madre",    es: "madre",    fr: "mère"       },
  { slug: "padre",    es: "padre",    fr: "père"       },
  { slug: "hermano",  es: "hermano",  fr: "frère"      },
  { slug: "hermana",  es: "hermana",  fr: "sœur"       },
  { slug: "abuelo",   es: "abuelo",   fr: "grand-père" },
  { slug: "abuela",   es: "abuela",   fr: "grand-mère" },
  { slug: "hijo",     es: "hijo",     fr: "fils"       },
  { slug: "hija",     es: "hija",     fr: "fille"      },
  { slug: "tio",      es: "tío",      fr: "oncle"      },
  { slug: "tia",      es: "tía",      fr: "tante"      },
  { slug: "primo",    es: "primo",    fr: "cousin"     },
  { slug: "prima",    es: "prima",    fr: "cousine"    },
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
]);
