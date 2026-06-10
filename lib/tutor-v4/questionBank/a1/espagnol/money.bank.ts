import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "comprar", es: "comprar", fr: "acheter",          audio: "/audio/espagnol/money/a1/comprar.mp3" },
  { slug: "vender",  es: "vender",  fr: "vendre",           audio: "/audio/espagnol/money/a1/vender.mp3"  },
  { slug: "pagar",   es: "pagar",   fr: "payer",            audio: "/audio/espagnol/money/a1/pagar.mp3"   },
  { slug: "precio",  es: "precio",  fr: "prix",             audio: "/audio/espagnol/money/a1/precio.mp3"  },
  { slug: "dinero",  es: "dinero",  fr: "argent",           audio: "/audio/espagnol/money/a1/dinero.mp3"  },
  { slug: "moneda",  es: "moneda",  fr: "pièce de monnaie", audio: "/audio/espagnol/money/a1/moneda.mp3"  },
  { slug: "billete", es: "billete", fr: "billet",           audio: "/audio/espagnol/money/a1/billete.mp3" },
  { slug: "euro",    es: "euro",    fr: "euro",             audio: "/audio/espagnol/money/a1/euro.mp3"    },
  { slug: "caro",    es: "caro",    fr: "cher",             audio: "/audio/espagnol/money/a1/caro.mp3"    },
  { slug: "barato",  es: "barato",  fr: "bon marché",       audio: "/audio/espagnol/money/a1/barato.mp3"  },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const moneyA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_money_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_money",
    microId: "es_a1_money_es_to_fr",
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
    id: `es_a1_money_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_money",
    microId: "es_a1_money_fr_to_es",
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
    id: `es_a1_money_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_money",
    microId: "es_a1_money_listen",
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
