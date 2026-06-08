import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "once",         es: "once",         fr: "onze"         },
  { slug: "doce",         es: "doce",         fr: "douze"        },
  { slug: "trece",        es: "trece",        fr: "treize"       },
  { slug: "catorce",      es: "catorce",      fr: "quatorze"     },
  { slug: "quince",       es: "quince",       fr: "quinze"       },
  { slug: "veinte",       es: "veinte",       fr: "vingt"        },
  { slug: "treinta",      es: "treinta",      fr: "trente"       },
  { slug: "cuarenta",     es: "cuarenta",     fr: "quarante"     },
  { slug: "cincuenta",    es: "cincuenta",    fr: "cinquante"    },
  { slug: "sesenta",      es: "sesenta",      fr: "soixante"     },
  { slug: "setenta",      es: "setenta",      fr: "soixante-dix" },
  { slug: "ochenta",      es: "ochenta",      fr: "quatre-vingts"},
  { slug: "noventa",      es: "noventa",      fr: "quatre-vingt-dix" },
  { slug: "cien",         es: "cien",         fr: "cent"         },
  { slug: "mil",          es: "mil",          fr: "mille"        },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const numbersA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_numbers_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_numbers",
    microId: "es_a1_numbers_es_to_fr",
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
    id: `es_a1_numbers_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_numbers",
    microId: "es_a1_numbers_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
