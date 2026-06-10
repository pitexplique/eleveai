import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "camisa",   es: "camisa",   fr: "chemise",    audio: "/audio/espagnol/clothes/a1/camisa.mp3"   },
  { slug: "pantalon", es: "pantalón", fr: "pantalon",   audio: "/audio/espagnol/clothes/a1/pantalon.mp3" },
  { slug: "zapato",   es: "zapato",   fr: "chaussure",  audio: "/audio/espagnol/clothes/a1/zapato.mp3"   },
  { slug: "vestido",  es: "vestido",  fr: "robe",       audio: "/audio/espagnol/clothes/a1/vestido.mp3"  },
  { slug: "falda",    es: "falda",    fr: "jupe",       audio: "/audio/espagnol/clothes/a1/falda.mp3"    },
  { slug: "calcetin", es: "calcetín", fr: "chaussette", audio: "/audio/espagnol/clothes/a1/calcetin.mp3" },
  { slug: "abrigo",   es: "abrigo",   fr: "manteau",    audio: "/audio/espagnol/clothes/a1/abrigo.mp3"   },
  { slug: "gorra",    es: "gorra",    fr: "casquette",  audio: "/audio/espagnol/clothes/a1/gorra.mp3"    },
  { slug: "bufanda",  es: "bufanda",  fr: "écharpe",    audio: "/audio/espagnol/clothes/a1/bufanda.mp3"  },
  { slug: "sudadera", es: "sudadera", fr: "sweat",      audio: "/audio/espagnol/clothes/a1/sudadera.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const clothesA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_clothes_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_clothes",
    microId: "es_a1_clothes_es_to_fr",
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
    id: `es_a1_clothes_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_clothes",
    microId: "es_a1_clothes_fr_to_es",
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
    id: `es_a1_clothes_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_clothes",
    microId: "es_a1_clothes_listen",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `Le vêtement entendu est "${word.es}" (${word.fr}).`,
  },
]);
