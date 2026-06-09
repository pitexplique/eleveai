import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "rojo",     es: "rojo",    fr: "rouge",  audio: "/audio/espagnol/colors/rojo.mp3"     },
  { slug: "azul",     es: "azul",    fr: "bleu",   audio: "/audio/espagnol/colors/azul.mp3"     },
  { slug: "verde",    es: "verde",   fr: "vert",   audio: "/audio/espagnol/colors/verde.mp3"    },
  { slug: "amarillo", es: "amarillo",fr: "jaune",  audio: "/audio/espagnol/colors/amarillo.mp3" },
  { slug: "negro",    es: "negro",   fr: "noir",   audio: "/audio/espagnol/colors/negro.mp3"    },
  { slug: "blanco",   es: "blanco",  fr: "blanc",  audio: "/audio/espagnol/colors/blanco.mp3"   },
  { slug: "naranja",  es: "naranja", fr: "orange", audio: "/audio/espagnol/colors/naranja.mp3"  },
  { slug: "rosa",     es: "rosa",    fr: "rose",   audio: "/audio/espagnol/colors/rosa.mp3"     },
  { slug: "morado",   es: "morado",  fr: "violet", audio: "/audio/espagnol/colors/morado.mp3"   },
  { slug: "marron",   es: "marrón",  fr: "marron", audio: "/audio/espagnol/colors/marron.mp3"   },
  { slug: "gris",     es: "gris",    fr: "gris",   audio: "/audio/espagnol/colors/gris.mp3"     },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const colorsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_colors_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_colors",
    microId: "es_a1_colors_es_to_fr",
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
    id: `es_a1_colors_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_colors",
    microId: "es_a1_colors_fr_to_es",
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
    id: `es_a1_colors_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_colors",
    microId: "es_a1_colors_listen",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `La couleur entendue est "${word.es}" (${word.fr}).`,
  },
]);
