import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "hola",           es: "hola",                   fr: "bonjour / salut",                       audio: "/audio/espagnol/greetings/hola.mp3"           },
  { slug: "adios",          es: "adiós",                  fr: "au revoir",                             audio: "/audio/espagnol/greetings/adios.mp3"          },
  { slug: "buenos_dias",    es: "buenos días",            fr: "bonjour (matin)",                       audio: "/audio/espagnol/greetings/buenos_dias.mp3"    },
  { slug: "buenas_tardes",  es: "buenas tardes",          fr: "bonsoir / bonjour (après-midi)",        audio: "/audio/espagnol/greetings/buenas_tardes.mp3"  },
  { slug: "buenas_noches",  es: "buenas noches",          fr: "bonne nuit",                            audio: "/audio/espagnol/greetings/buenas_noches.mp3"  },
  { slug: "por_favor",      es: "por favor",              fr: "s'il vous plaît",                       audio: "/audio/espagnol/greetings/por_favor.mp3"      },
  { slug: "gracias",        es: "gracias",                fr: "merci",                                 audio: "/audio/espagnol/greetings/gracias.mp3"        },
  { slug: "de_nada",        es: "de nada",                fr: "de rien",                               audio: "/audio/espagnol/greetings/de_nada.mp3"        },
  { slug: "perdon",         es: "perdón",                 fr: "pardon / excuse-moi",                   audio: "/audio/espagnol/greetings/perdon.mp3"         },
  { slug: "como_te_llamas", es: "¿Cómo te llamas?",      fr: "Comment tu t'appelles ?",               audio: "/audio/espagnol/greetings/como_te_llamas.mp3" },
  { slug: "me_llamo",       es: "me llamo",               fr: "je m'appelle",                          audio: "/audio/espagnol/greetings/me_llamo.mp3"       },
  { slug: "cuantos_anos",   es: "¿Cuántos años tienes?", fr: "Quel âge as-tu ?",                      audio: "/audio/espagnol/greetings/cuantos_anos.mp3"   },
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
  {
    kind: "fixed" as const,
    id: `es_a1_greetings_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_greetings",
    microId: "es_a1_greetings_listen",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `La phrase entendue est "${word.es}" (${word.fr}).`,
  },
]);
