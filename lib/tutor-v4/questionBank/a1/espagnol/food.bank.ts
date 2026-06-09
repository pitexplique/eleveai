import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "agua",    es: "agua",    fr: "eau",              audio: "/audio/espagnol/food/agua.mp3"    },
  { slug: "pan",     es: "pan",     fr: "pain",             audio: "/audio/espagnol/food/pan.mp3"     },
  { slug: "leche",   es: "leche",   fr: "lait",             audio: "/audio/espagnol/food/leche.mp3"   },
  { slug: "fruta",   es: "fruta",   fr: "fruit",            audio: "/audio/espagnol/food/fruta.mp3"   },
  { slug: "manzana", es: "manzana", fr: "pomme",            audio: "/audio/espagnol/food/manzana.mp3" },
  { slug: "naranja", es: "naranja", fr: "orange (fruit)",   audio: "/audio/espagnol/food/naranja.mp3" },
  { slug: "carne",   es: "carne",   fr: "viande",           audio: "/audio/espagnol/food/carne.mp3"   },
  { slug: "pescado", es: "pescado", fr: "poisson",          audio: "/audio/espagnol/food/pescado.mp3" },
  { slug: "arroz",   es: "arroz",   fr: "riz",              audio: "/audio/espagnol/food/arroz.mp3"   },
  { slug: "verdura", es: "verdura", fr: "légume",           audio: "/audio/espagnol/food/verdura.mp3" },
  { slug: "huevo",   es: "huevo",   fr: "œuf",              audio: "/audio/espagnol/food/huevo.mp3"   },
  { slug: "queso",   es: "queso",   fr: "fromage",          audio: "/audio/espagnol/food/queso.mp3"   },
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
  {
    kind: "fixed" as const,
    id: `es_a1_food_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_food",
    microId: "es_a1_food_listen",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `L'aliment entendu est "${word.es}" (${word.fr}).`,
  },
]);
