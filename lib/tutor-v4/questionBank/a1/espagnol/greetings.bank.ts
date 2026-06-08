import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "hola",          es: "hola",           fr: "bonjour / salut"   },
  { slug: "adios",         es: "adiós",           fr: "au revoir"         },
  { slug: "buenos_dias",   es: "buenos días",     fr: "bonjour (matin)"   },
  { slug: "buenas_tardes", es: "buenas tardes",   fr: "bonsoir / bonjour (après-midi)" },
  { slug: "buenas_noches", es: "buenas noches",   fr: "bonne nuit"        },
  { slug: "por_favor",     es: "por favor",       fr: "s'il vous plaît"   },
  { slug: "gracias",       es: "gracias",         fr: "merci"             },
  { slug: "de_nada",       es: "de nada",         fr: "de rien"           },
  { slug: "perdon",        es: "perdón",           fr: "pardon / excuse-moi" },
  { slug: "como_te_llamas",es: "¿Cómo te llamas?",fr: "Comment tu t'appelles ?" },
  { slug: "me_llamo",      es: "me llamo",        fr: "je m'appelle"      },
  { slug: "cuantos_anos",  es: "¿Cuántos años tienes?", fr: "Quel âge as-tu ?" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const greetingsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_greetings_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_greetings",
    microId: "es_a1_greetings_es_to_fr",
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
    id: `es_a1_greetings_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_greetings",
    microId: "es_a1_greetings_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
