import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "casa",    es: "casa",    fr: "maison"     },
  { slug: "cocina",  es: "cocina",  fr: "cuisine"    },
  { slug: "salon",   es: "salón",   fr: "salon"      },
  { slug: "dormitorio", es: "dormitorio", fr: "chambre" },
  { slug: "bano",    es: "baño",    fr: "salle de bain" },
  { slug: "jardin",  es: "jardín",  fr: "jardin"     },
  { slug: "puerta",  es: "puerta",  fr: "porte"      },
  { slug: "ventana", es: "ventana", fr: "fenêtre"    },
  { slug: "mesa",    es: "mesa",    fr: "table"      },
  { slug: "silla",   es: "silla",   fr: "chaise"     },
  { slug: "cama",    es: "cama",    fr: "lit"        },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const houseA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_house_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_house",
    microId: "es_a1_house_es_to_fr",
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
    id: `es_a1_house_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_house",
    microId: "es_a1_house_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
