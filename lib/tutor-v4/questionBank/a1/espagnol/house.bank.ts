import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "casa",       es: "casa",       fr: "maison",        audio: "/audio/espagnol/house/casa.mp3"       },
  { slug: "cocina",     es: "cocina",     fr: "cuisine",       audio: "/audio/espagnol/house/cocina.mp3"     },
  { slug: "salon",      es: "salón",      fr: "salon",         audio: "/audio/espagnol/house/salon.mp3"      },
  { slug: "dormitorio", es: "dormitorio", fr: "chambre",       audio: "/audio/espagnol/house/dormitorio.mp3" },
  { slug: "bano",       es: "baño",       fr: "salle de bain", audio: "/audio/espagnol/house/bano.mp3"       },
  { slug: "jardin",     es: "jardín",     fr: "jardin",        audio: "/audio/espagnol/house/jardin.mp3"     },
  { slug: "puerta",     es: "puerta",     fr: "porte",         audio: "/audio/espagnol/house/puerta.mp3"     },
  { slug: "ventana",    es: "ventana",    fr: "fenêtre",       audio: "/audio/espagnol/house/ventana.mp3"    },
  { slug: "mesa",       es: "mesa",       fr: "table",         audio: "/audio/espagnol/house/mesa.mp3"       },
  { slug: "silla",      es: "silla",      fr: "chaise",        audio: "/audio/espagnol/house/silla.mp3"      },
  { slug: "cama",       es: "cama",       fr: "lit",           audio: "/audio/espagnol/house/cama.mp3"       },
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
  {
    kind: "fixed" as const,
    id: `es_a1_house_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_house",
    microId: "es_a1_house_listen",
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
