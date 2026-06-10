import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "metro",      es: "metro",      fr: "mètre",        audio: "/audio/espagnol/sport_measurements/a1/metro.mp3"      },
  { slug: "kilometro",  es: "kilómetro",  fr: "kilomètre",    audio: "/audio/espagnol/sport_measurements/a1/kilometro.mp3"  },
  { slug: "centimetro", es: "centímetro", fr: "centimètre",   audio: "/audio/espagnol/sport_measurements/a1/centimetro.mp3" },
  { slug: "kilogramo",  es: "kilogramo",  fr: "kilogramme",   audio: "/audio/espagnol/sport_measurements/a1/kilogramo.mp3"  },
  { slug: "hora",       es: "hora",       fr: "heure",        audio: "/audio/espagnol/sport_measurements/a1/hora.mp3"       },
  { slug: "minuto",     es: "minuto",     fr: "minute",       audio: "/audio/espagnol/sport_measurements/a1/minuto.mp3"     },
  { slug: "segundo",    es: "segundo",    fr: "seconde",      audio: "/audio/espagnol/sport_measurements/a1/segundo.mp3"    },
  { slug: "vuelta",     es: "vuelta",     fr: "tour de piste",audio: "/audio/espagnol/sport_measurements/a1/vuelta.mp3"     },
  { slug: "carrera",    es: "carrera",    fr: "course",       audio: "/audio/espagnol/sport_measurements/a1/carrera.mp3"    },
  { slug: "gol",        es: "gol",        fr: "but",          audio: "/audio/espagnol/sport_measurements/a1/gol.mp3"        },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const sportMeasurementsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_sport_measurements_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_sport_measurements",
    microId: "es_a1_sport_measurements_es_to_fr",
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
    id: `es_a1_sport_measurements_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_sport_measurements",
    microId: "es_a1_sport_measurements_fr_to_es",
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
    id: `es_a1_sport_measurements_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_sport_measurements",
    microId: "es_a1_sport_measurements_listen",
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
