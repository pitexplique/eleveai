import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "agua",      es: "agua",      fr: "eau"         },
  { slug: "pan",       es: "pan",       fr: "pain"        },
  { slug: "leche",     es: "leche",     fr: "lait"        },
  { slug: "fruta",     es: "fruta",     fr: "fruit"       },
  { slug: "manzana",   es: "manzana",   fr: "pomme"       },
  { slug: "naranja",   es: "naranja",   fr: "orange (fruit)" },
  { slug: "carne",     es: "carne",     fr: "viande"      },
  { slug: "pescado",   es: "pescado",   fr: "poisson"     },
  { slug: "arroz",     es: "arroz",     fr: "riz"         },
  { slug: "verdura",   es: "verdura",   fr: "légume"      },
  { slug: "huevo",     es: "huevo",     fr: "œuf"         },
  { slug: "queso",     es: "queso",     fr: "fromage"     },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const foodA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_food_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_food",
    microId: "es_a1_food_es_to_fr",
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
    id: `es_a1_food_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_food",
    microId: "es_a1_food_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
