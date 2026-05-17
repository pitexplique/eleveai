// lib/tutor-v4/question-banks/maths/cm1/durees.bank.ts

import type {
  TutorBankItemV4,
  DureeCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  const uniqueWrongs = wrongs.filter((w) => w !== correct);
  return shuffle([correct, ...uniqueWrongs.slice(0, 3)]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function dureeCanvas(data: Omit<DureeCanvasData, "kind">): DureeCanvasData {
  return {
    kind: "duree",
    ...data,
  };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatHour(hour: number, minute: number) {
  return `${hour} h ${pad2(minute)}`;
}

function watchColors(index = 0): DureeCanvasData["colors"] {
  const palettes: NonNullable<DureeCanvasData["colors"]>[] = [
    {
      face: "#fefce8",
      bezel: "#0f172a",
      hourHand: "#2563eb",
      minuteHand: "#ef4444",
      accent: "#f59e0b",
      strap: "#38bdf8",
      text: "#0f172a",
    },
    {
      face: "#ecfeff",
      bezel: "#155e75",
      hourHand: "#7c3aed",
      minuteHand: "#f97316",
      accent: "#22c55e",
      strap: "#a7f3d0",
      text: "#0f172a",
    },
    {
      face: "#fff1f2",
      bezel: "#be123c",
      hourHand: "#0f172a",
      minuteHand: "#2563eb",
      accent: "#facc15",
      strap: "#fecdd3",
      text: "#0f172a",
    },
  ];

  return palettes[index % palettes.length];
}

function totalMinutes(hour: number, minute: number) {
  return hour * 60 + minute;
}

function fromMinutes(total: number) {
  const hour = Math.floor(total / 60);
  const minute = total % 60;

  return { hour, minute };
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${pad2(m)}`;
}

export const dureesBank: TutorBankItemV4[] = [
  // ============================================================
  // DUREE_LIRE
  // Lire une heure ou une durée
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_001_heure_pleine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["3 h 00", "12 h 15", "6 h 00", "3 h 30"],
    expected: ["3 h 00"],
    comparator: "mcq_exact",
    hint: "La grande aiguille est sur le 12 : il est pile une heure.",
    explanation: exp(
      "Lire l’heure, c’est observer les deux aiguilles.",
      "La petite aiguille indique l’heure. La grande aiguille indique les minutes.",
      "La grande aiguille est sur 12, donc il y a 00 minute. La petite aiguille indique 3.",
      "L’horloge indique 3 h 00."
    ),
    tags: ["cm1", "duree", "lire", "horloge", "heure_pleine", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Quelle heure ?",
      time: {
        hour: 3,
        minute: 0,
        label: "Heure pleine",
      },
      colors: watchColors(0),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_002_demie_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["4 h 30", "4 h 00", "5 h 30", "6 h 20"],
    expected: ["4 h 30"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 6 indique 30 minutes.",
    explanation: exp(
      "Une demi-heure correspond à 30 minutes.",
      "On lit d’abord les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 6, donc cela fait 30 minutes. La petite aiguille est entre 4 et 5.",
      "L’horloge indique 4 h 30."
    ),
    tags: ["cm1", "duree", "lire", "demi_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "La demi-heure",
      time: {
        hour: 4,
        minute: 30,
        label: "Demi-heure",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "template",
    id: "cm1_duree_lire_tpl_001_heures_pleines",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Quand la grande aiguille est sur 12, les minutes valent 00.",
    tags: ["cm1", "duree", "lire", "heure_pleine", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      const correct = formatHour(hour, 0);

      return {
        text: "Quelle heure indique l’horloge ?",
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(hour, 30),
          formatHour(hour + 1, 0),
          formatHour(Math.max(1, hour - 1), 0),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une heure pleine s’écrit avec 00 minute.",
          "La grande aiguille sur 12 indique 00 minute.",
          `La petite aiguille indique ${hour}.`,
          `L’horloge indique ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "horloge",
          title: "Heure pleine",
          time: {
            hour,
            minute: 0,
            label: "À lire",
          },
          colors: watchColors(hour),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_lire_tpl_002_quart_demie_trois_quarts",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur l’horloge : 3 veut dire 15 min, 6 veut dire 30 min, 9 veut dire 45 min.",
    tags: ["cm1", "duree", "lire", "quart", "demi", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([2, 3, 5, 6, 7, 8, 9]);
      const minute = randomChoice([15, 30, 45]);
      const correct = formatHour(hour, minute);

      return {
        text: "Quelle heure indique l’horloge ?",
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(hour, 0),
          formatHour(hour, minute === 15 ? 45 : 15),
          formatHour(hour + 1, minute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La grande aiguille sert à lire les minutes.",
          "On repère la position de la grande aiguille : 3 pour 15 min, 6 pour 30 min, 9 pour 45 min.",
          `Ici, les aiguilles indiquent ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "horloge",
          title: "Quart, demi ou trois quarts ?",
          time: {
            hour,
            minute,
            label: "À lire",
          },
          colors: watchColors(hour + minute),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_lire_tpl_003_affichage_digital",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans 08:20, le nombre avant les deux points donne les heures et le nombre après donne les minutes.",
    tags: ["cm1", "duree", "lire", "digital", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([7, 8, 9, 10, 13, 14, 16, 17]);
      const minute = randomChoice([0, 5, 10, 15, 20, 30, 45]);
      const correct = formatHour(hour, minute);

      return {
        text: `L’affichage indique ${pad2(hour)}:${pad2(minute)}. Comment écrit-on cette heure ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${minute} h ${pad2(hour)}`,
          formatHour(hour + 1, minute),
          formatHour(hour, minute === 0 ? 30 : 0),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une heure peut être écrite avec deux points, comme sur un réveil.",
          "Le nombre avant les deux points donne les heures. Le nombre après donne les minutes.",
          `${pad2(hour)}:${pad2(minute)} s’écrit ${correct}.`,
          `La bonne écriture est ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "digital",
          title: "Affichage numérique",
          digital: {
            text: `${pad2(hour)}:${pad2(minute)}`,
            label: "Lis l’heure",
          },
          colors: watchColors(hour + minute),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_lire_tpl_004_minutes_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque grand nombre de l’horloge vaut 5 minutes pour la grande aiguille.",
    tags: ["cm1", "duree", "lire", "minutes_par_5", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([1, 2, 4, 5, 7, 8, 10]);
      const minute = randomChoice([5, 10, 20, 25, 35, 40, 50, 55]);
      const correct = formatHour(hour, minute);

      return {
        text: "Quelle heure indique l’horloge ?",
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(hour, minute === 55 ? 50 : minute + 5),
          formatHour(hour + 1, minute),
          formatHour(hour, 0),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une horloge, la grande aiguille indique les minutes.",
          "Chaque grand nombre vaut 5 minutes : 1 vaut 5 min, 2 vaut 10 min, etc.",
          `Ici, l’heure indiquée est ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "horloge",
          title: "Lecture par 5 minutes",
          time: {
            hour,
            minute,
            label: "Observe bien",
          },
          colors: watchColors(minute),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_lire_tpl_005_open_expliquer_lecture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique le rôle de la petite aiguille et de la grande aiguille.",
    tags: ["cm1", "duree", "lire", "open", "expliquer", "canvas"],
    generate: () => {
      const hour = randomChoice([3, 4, 6, 8, 9]);
      const minute = randomChoice([15, 30, 45]);
      const correct = formatHour(hour, minute);

      return {
        text: `L’horloge indique ${correct}. Explique comment tu peux le savoir.`,
        format: "open",
        expected: ["petite", "grande", "aiguille"],
        comparator: "contains_keyword",
        explanation:
          `On observe les deux aiguilles. La petite aiguille indique les heures : ici ${hour}. ` +
          `La grande aiguille indique les minutes : ici ${minute} minutes. ` +
          `Donc l’horloge indique ${correct}.`,
        canvas: dureeCanvas({
          variant: "horloge",
          title: "Explique comme un champion",
          time: {
            hour,
            minute,
            label: "À expliquer",
          },
          colors: watchColors(hour + minute),
        }),
      };
    },
  },

    // ============================================================
  // DUREE_CONVERTIR
  // Convertir des durées simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_convertir_fixed_001_1h_60min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 1 heure ?",
    format: "qcm",
    choices: ["60", "100", "30", "24"],
    expected: ["60"],
    comparator: "mcq_exact",
    hint: "Une heure contient 60 minutes.",
    explanation:
      "Une heure contient 60 minutes. C’est une règle importante pour travailler sur les durées.",
    tags: ["cm1", "duree", "convertir", "heure_minute", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_duree_convertir_fixed_002_demie_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Une demi-heure correspond à...",
    format: "qcm",
    choices: ["30 min", "50 min", "15 min", "60 min"],
    expected: ["30 min"],
    comparator: "mcq_exact",
    hint: "Une demi-heure, c’est la moitié de 60 minutes.",
    explanation:
      "Une heure contient 60 minutes. La moitié de 60 est 30. Donc une demi-heure correspond à 30 minutes.",
    tags: ["cm1", "duree", "convertir", "demi_heure", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_001_heures_minutes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour convertir des heures en minutes, multiplie par 60.",
    tags: ["cm1", "duree", "convertir", "heures_minutes", "template"],
    generate: () => {
      const h = randomChoice([2, 3, 4, 5]);
      const result = h * 60;

      return {
        text: `Combien font ${h} heures en minutes ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `1 heure contient 60 minutes. Donc ${h} heures font ${h} × 60 = ${result} minutes.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_002_minutes_heures_exactes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de groupes de 60 minutes on peut faire.",
    tags: ["cm1", "duree", "convertir", "minutes_heures", "template"],
    generate: () => {
      const h = randomChoice([1, 2, 3, 4]);
      const minutes = h * 60;
      const correct = `${h} h`;

      return {
        text: `${minutes} minutes correspondent à...`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${minutes} h`,
          `${h * 10} h`,
          `${h} min`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `${minutes} minutes, c’est ${h} groupe(s) de 60 minutes. Donc ${minutes} minutes correspondent à ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_003_minutes_h_min_simples",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "60 minutes font 1 heure. Il faut ensuite regarder les minutes restantes.",
    tags: ["cm1", "duree", "convertir", "minutes_h_min", "template"],
    generate: () => {
      const h = randomChoice([1, 2]);
      const m = randomChoice([15, 20, 30, 45]);
      const total = h * 60 + m;
      const correct = `${h} h ${pad2(m)}`;

      return {
        text: `${total} minutes correspondent à...`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${h} h ${total}`,
          `${h + 1} h ${pad2(m)}`,
          `${m} h ${pad2(h)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `${total} minutes = ${h} heure(s) complète(s) et ${m} minutes. Donc ${total} minutes correspondent à ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_004_minutes_secondes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 minute = 60 secondes.",
    tags: ["cm1", "duree", "convertir", "minutes_secondes", "template"],
    generate: () => {
      const min = randomChoice([2, 3, 4, 5, 10]);
      const result = min * 60;

      return {
        text: `Combien font ${min} minutes en secondes ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          `1 minute contient 60 secondes. Donc ${min} minutes font ${min} × 60 = ${result} secondes.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_005_secondes_minutes_exactes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "60 secondes font 1 minute.",
    tags: ["cm1", "duree", "convertir", "secondes_minutes", "template"],
    generate: () => {
      const min = randomChoice([1, 2, 3, 4, 5]);
      const seconds = min * 60;
      const correct = `${min} min`;

      return {
        text: `${seconds} secondes correspondent à...`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${seconds} min`,
          `${min} s`,
          `${min * 10} min`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `60 secondes font 1 minute. Donc ${seconds} secondes correspondent à ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_006_quarts_demi_heures",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Un quart d’heure vaut 15 minutes. Une demi-heure vaut 30 minutes.",
    tags: ["cm1", "duree", "convertir", "quart", "demi", "template"],
    generate: () => {
      const item = randomChoice([
        {
          text: "un quart d’heure",
          correct: "15 min",
          wrongs: ["30 min", "45 min", "60 min"],
          explanation:
            "Un quart d’heure, c’est un quart de 60 minutes. Cela correspond à 15 minutes.",
        },
        {
          text: "une demi-heure",
          correct: "30 min",
          wrongs: ["15 min", "45 min", "60 min"],
          explanation:
            "Une demi-heure, c’est la moitié de 60 minutes. Cela correspond à 30 minutes.",
        },
        {
          text: "trois quarts d’heure",
          correct: "45 min",
          wrongs: ["15 min", "30 min", "60 min"],
          explanation:
            "Trois quarts d’heure correspondent à 15 + 15 + 15 = 45 minutes.",
        },
      ]);

      return {
        text: `${item.text} correspond à...`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_convertir_tpl_007_open_base_60",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Dès qu’on atteint 60 minutes, cela fait une heure.",
    tags: ["cm1", "duree", "convertir", "open", "base_60", "erreur"],
    generate: () => {
      const minutes = randomChoice([65, 70, 75, 80, 90]);
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const correct = `${h} h ${pad2(m)}`;

      return {
        text: `Un élève écrit : “${minutes} minutes = 0 h ${minutes}”. Explique pourquoi cette écriture n’est pas la meilleure.`,
        format: "open",
        expected: ["60", "heure", "minutes"],
        comparator: "contains_keyword",
        explanation:
          `On ne garde pas ${minutes} minutes après le h, car 60 minutes forment 1 heure. ` +
          `${minutes} minutes correspondent à ${correct}.`,
      };
    },
  },
    // ============================================================
  // DUREE_CALCULER
  // Calculer une durée simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_001_ecart_1h",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Une activité commence à 8 h 00 et finit à 9 h 00. Quelle est sa durée en minutes ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "De 8 h à 9 h, il y a 1 heure.",
    explanation:
      "De 8 h 00 à 9 h 00, il y a 1 heure. Or 1 heure = 60 minutes. La durée est donc 60 minutes.",
    tags: ["cm1", "duree", "calculer", "ecart", "heure", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Début et fin",
      start: {
        hour: 8,
        minute: 0,
        label: "Début",
      },
      end: {
        hour: 9,
        minute: 0,
        label: "Fin",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_002_ajouter_30min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une séance commence à 10 h 15 et dure 30 minutes. À quelle heure se termine-t-elle ?",
    format: "qcm",
    choices: ["10 h 45", "10 h 30", "11 h 15", "9 h 45"],
    expected: ["10 h 45"],
    comparator: "mcq_exact",
    hint: "Ajoute 30 minutes à 10 h 15.",
    explanation:
      "On ajoute la durée à l’heure de départ. 10 h 15 + 30 min = 10 h 45. La séance se termine à 10 h 45.",
    tags: ["cm1", "duree", "calculer", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "On ajoute 30 minutes",
      frise: {
        startLabel: "10 h 15",
        endLabel: "10 h 45",
        steps: [
          {
            label: "+ 30 min",
            minutes: 30,
            color: "#22c55e",
          },
        ],
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_001_ecart_meme_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    hint: "Les deux horaires sont dans la même heure : soustrais les minutes.",
    tags: ["cm1", "duree", "calculer", "ecart", "meme_heure", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([8, 9, 10, 14, 15, 16]);
      const startMinute = randomChoice([0, 5, 10, 15, 20]);
      const duration = randomChoice([10, 15, 20, 25, 30]);
      const endMinute = startMinute + duration;

      return {
        text: `Une activité commence à ${formatHour(hour, startMinute)} et finit à ${formatHour(hour, endMinute)}. Quelle est sa durée en minutes ?`,
        format: "short",
        expected: [String(duration)],
        comparator: "number_equal",
        explanation:
          `Les deux horaires sont dans la même heure. On calcule l’écart entre les minutes : ${endMinute} - ${startMinute} = ${duration}. ` +
          `La durée est ${duration} minutes.`,
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Durée dans la même heure",
          start: {
            hour,
            minute: startMinute,
            label: "Début",
          },
          end: {
            hour,
            minute: endMinute,
            label: "Fin",
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_002_ecart_jusqua_heure_suivante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte combien de minutes il manque pour arriver à l’heure suivante.",
    tags: ["cm1", "duree", "calculer", "heure_suivante", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([8, 9, 10, 13, 14, 15, 16]);
      const startMinute = randomChoice([5, 10, 15, 20, 30, 40, 45]);
      const duration = 60 - startMinute;

      return {
        text: `Une activité commence à ${formatHour(hour, startMinute)} et finit à ${formatHour(hour + 1, 0)}. Quelle est sa durée ?`,
        format: "qcm",
        choices: makeChoices(`${duration} min`, [
          `${startMinute} min`,
          "60 min",
          `${duration + 10} min`,
        ]),
        expected: [`${duration} min`],
        comparator: "mcq_exact",
        explanation:
          `On cherche combien de minutes il manque pour arriver à l’heure suivante. ` +
          `De ${formatHour(hour, startMinute)} à ${formatHour(hour + 1, 0)}, il y a ${duration} minutes.`,
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Jusqu’à l’heure suivante",
          start: {
            hour,
            minute: startMinute,
            label: "Début",
          },
          end: {
            hour: hour + 1,
            minute: 0,
            label: "Fin",
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_003_ajouter_sans_changement_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Ajoute les minutes à l’heure de départ.",
    tags: ["cm1", "duree", "calculer", "heure_fin", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 14, 15, 16]);
      const startMinute = randomChoice([0, 5, 10, 15, 20]);
      const duration = randomChoice([10, 15, 20, 25, 30]);
      const endMinute = startMinute + duration;
      const correct = formatHour(startHour, endMinute);

      return {
        text: `Une séance commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. À quelle heure se termine-t-elle ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(startHour, startMinute),
          formatHour(startHour, Math.min(55, endMinute + 5)),
          formatHour(startHour + 1, endMinute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `On ajoute ${duration} minutes à l’heure de départ. ` +
          `${formatHour(startHour, startMinute)} + ${duration} min = ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Heure de fin",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#22c55e",
              },
            ],
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_004_ajouter_avec_changement_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux aller jusqu’à l’heure suivante, puis ajouter ce qu’il reste.",
    tags: ["cm1", "duree", "calculer", "passage_heure", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 13, 14, 15, 16]);
      const startMinute = randomChoice([35, 40, 45, 50]);
      const duration = randomChoice([15, 20, 25, 30]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      const toNextHour = 60 - startMinute;
      const remaining = duration - toNextHour;

      const steps =
        remaining > 0
          ? [
              {
                label: `+ ${toNextHour} min`,
                minutes: toNextHour,
                color: "#38bdf8",
              },
              {
                label: `+ ${remaining} min`,
                minutes: remaining,
                color: "#f97316",
              },
            ]
          : [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#22c55e",
              },
            ];

      return {
        text: `Une activité commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. À quelle heure se termine-t-elle ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(startHour, (startMinute + duration) % 60),
          formatHour(end.hour + 1, end.minute),
          formatHour(startHour, startMinute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `On ajoute ${duration} minutes à ${formatHour(startHour, startMinute)}. ` +
          `Cela donne ${correct}. Attention : quand on dépasse 60 minutes, on passe à l’heure suivante.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Attention au passage d’heure",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps,
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_005_duree_entre_deux_horaires",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’écart entre l’heure de début et l’heure de fin.",
    tags: ["cm1", "duree", "calculer", "ecart", "template", "double_horloge"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 13, 14, 15]);
      const startMinute = randomChoice([0, 10, 15, 20, 30]);
      const duration = randomChoice([30, 40, 45, 50, 60, 75]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatDuration(duration);

      return {
        text: `Une séance commence à ${formatHour(startHour, startMinute)} et se termine à ${formatHour(end.hour, end.minute)}. Quelle est sa durée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${duration} h`,
          `${duration % 60} min`,
          formatDuration(duration + 15),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `La durée est le temps écoulé entre les deux horaires. ` +
          `De ${formatHour(startHour, startMinute)} à ${formatHour(end.hour, end.minute)}, il y a ${formatDuration(duration)}.`,
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Durée entre deux horaires",
          start: {
            hour: startHour,
            minute: startMinute,
            label: "Début",
          },
          end: {
            hour: end.hour,
            minute: end.minute,
            label: "Fin",
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_calculer_tpl_006_open_expliquer_heure_fin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique comment tu ajoutes les minutes.",
    tags: ["cm1", "duree", "calculer", "open", "expliquer", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 14, 15]);
      const startMinute = randomChoice([10, 15, 20, 30, 40]);
      const duration = randomChoice([20, 30, 35, 45]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `Une activité commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. ` +
          `Elle se termine à ${correct}. Explique comment on peut le trouver.`,
        format: "open",
        expected: ["minutes", "ajoute"],
        comparator: "contains_keyword",
        explanation:
          `On ajoute la durée à l’heure de départ. ` +
          `${formatHour(startHour, startMinute)} + ${duration} minutes = ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Explique ton calcul",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#22c55e",
              },
            ],
          },
          colors: watchColors(duration),
        }),
      };
    },
  },
    // ============================================================
  // DUREE_PROBLEME
  // Résoudre un problème simple de durées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_001_bus_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "À Saint-Pierre, il est 7 h 10. Le bus part à 7 h 25. Dans combien de minutes part-il ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Compte de 7 h 10 à 7 h 25.",
    explanation:
      "On cherche un temps d’attente : c’est une durée entre deux horaires. " +
      "De 7 h 10 à 7 h 25, il y a 15 minutes. " +
      "Le bus part donc dans 15 minutes.",
    tags: ["cm1", "duree", "probleme", "bus", "reunion", "attente", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Attente du bus",
      start: {
        hour: 7,
        minute: 10,
        label: "Maintenant",
      },
      end: {
        hour: 7,
        minute: 25,
        label: "Départ",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_002_cuisson_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un gâteau est mis au four à 16 h 20. Il doit cuire 30 minutes. À quelle heure sera-t-il cuit ?",
    format: "qcm",
    choices: ["16 h 50", "16 h 30", "17 h 20", "15 h 50"],
    expected: ["16 h 50"],
    comparator: "mcq_exact",
    hint: "Ajoute 30 minutes à 16 h 20.",
    explanation:
      "On cherche une heure de fin. Pour cela, on ajoute la durée de cuisson à l’heure de départ. " +
      "16 h 20 + 30 minutes = 16 h 50. " +
      "Le gâteau sera donc cuit à 16 h 50.",
    tags: ["cm1", "duree", "probleme", "cuisson", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Cuisson du gâteau",
      frise: {
        startLabel: "16 h 20",
        endLabel: "16 h 50",
        steps: [
          {
            label: "+ 30 min",
            minutes: 30,
            color: "#22c55e",
          },
        ],
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_001_attente_bus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "reunion",
    hint: "Calcule le temps entre maintenant et l’heure de départ.",
    tags: ["cm1", "duree", "probleme", "bus", "reunion", "attente", "template", "canvas"],
    generate: () => {
      const nowHour = randomChoice([6, 7, 8, 15, 16]);
      const nowMinute = randomChoice([0, 5, 10, 15, 20, 25, 30]);
      const wait = randomChoice([10, 15, 20, 25, 30]);
      const end = fromMinutes(totalMinutes(nowHour, nowMinute) + wait);

      return {
        text:
          `À La Réunion, il est ${formatHour(nowHour, nowMinute)}. ` +
          `Le prochain bus part à ${formatHour(end.hour, end.minute)}. ` +
          `Dans combien de minutes part-il ?`,
        format: "short",
        expected: [String(wait)],
        comparator: "number_equal",
        explanation:
          "On cherche un temps d’attente. " +
          `Il faut donc calculer la durée entre ${formatHour(nowHour, nowMinute)} et ${formatHour(end.hour, end.minute)}. ` +
          `Cette durée est de ${wait} minutes. ` +
          `Le bus part dans ${wait} minutes.`,
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Prochain bus",
          start: {
            hour: nowHour,
            minute: nowMinute,
            label: "Maintenant",
          },
          end: {
            hour: end.hour,
            minute: end.minute,
            label: "Bus",
          },
          colors: watchColors(wait),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_002_cuisson_sans_passage_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Ajoute la durée de cuisson à l’heure de début.",
    tags: ["cm1", "duree", "probleme", "cuisson", "heure_fin", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([10, 11, 15, 16, 17]);
      const startMinute = randomChoice([0, 5, 10, 15, 20]);
      const duration = randomChoice([15, 20, 25, 30]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `Un plat commence à cuire à ${formatHour(startHour, startMinute)}. ` +
          `La cuisson dure ${duration} minutes. À quelle heure sera-t-il prêt ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(startHour, startMinute),
          formatHour(end.hour, Math.min(55, end.minute + 10)),
          formatHour(startHour + 1, end.minute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On cherche l’heure de fin de cuisson. " +
          `On ajoute donc ${duration} minutes à ${formatHour(startHour, startMinute)}. ` +
          `${formatHour(startHour, startMinute)} + ${duration} min = ${correct}. ` +
          `Le plat sera prêt à ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Cuisson",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#22c55e",
              },
            ],
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_003_ecole_recreation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne la durée du travail et la durée de la récréation.",
    tags: ["cm1", "duree", "probleme", "ecole", "addition_durees", "template"],
    generate: () => {
      const travail = randomChoice([30, 35, 40, 45]);
      const recreation = randomChoice([10, 15, 20]);
      const total = travail + recreation;

      return {
        text:
          `Une classe travaille pendant ${travail} minutes, puis sort en récréation pendant ${recreation} minutes. ` +
          `Combien de temps cela dure-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Les deux durées se suivent. Pour connaître la durée totale, on les additionne. " +
          `${travail} + ${recreation} = ${total}. ` +
          `Cela dure donc ${total} minutes en tout.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_004_sport_heure_fin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "sport",
    hint: "Ajoute la durée de l’entraînement à l’heure de début.",
    tags: ["cm1", "duree", "probleme", "sport", "heure_fin", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 14, 15, 16]);
      const startMinute = randomChoice([0, 10, 15, 20, 30, 40]);
      const duration = randomChoice([30, 40, 45, 50]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `Un entraînement commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. ` +
          `À quelle heure se termine-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(startHour, startMinute),
          formatHour(end.hour, (end.minute + 10) % 60),
          formatHour(end.hour + 1, end.minute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On cherche une heure de fin. " +
          `On ajoute la durée de l’entraînement à l’heure de début : ${formatHour(startHour, startMinute)} + ${duration} minutes. ` +
          `On obtient ${correct}. ` +
          `L’entraînement se termine donc à ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Entraînement",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#38bdf8",
              },
            ],
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_005_marche_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les deux durées de marche.",
    tags: ["cm1", "duree", "probleme", "marche", "reunion", "addition_durees", "template", "frise"],
    generate: () => {
      const marche1 = randomChoice([15, 20, 25, 30]);
      const marche2 = randomChoice([10, 15, 20, 25]);
      const total = marche1 + marche2;

      return {
        text:
          `À La Réunion, Lina marche ${marche1} minutes jusqu’au bord de mer, ` +
          `puis encore ${marche2} minutes pour rejoindre sa famille. ` +
          `Combien de minutes a-t-elle marché en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "On cherche la durée totale de marche. " +
          `Lina marche d’abord ${marche1} minutes, puis encore ${marche2} minutes. ` +
          `On additionne : ${marche1} + ${marche2} = ${total}. ` +
          `Elle a marché ${total} minutes en tout.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Marche à La Réunion",
          frise: {
            startLabel: "Départ",
            endLabel: `${total} min`,
            steps: [
              {
                label: `+ ${marche1} min`,
                minutes: marche1,
                color: "#22c55e",
              },
              {
                label: `+ ${marche2} min`,
                minutes: marche2,
                color: "#f97316",
              },
            ],
          },
          colors: watchColors(total),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_006_passage_heure_guidé",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Va d’abord jusqu’à l’heure suivante, puis ajoute les minutes restantes.",
    tags: ["cm1", "duree", "probleme", "passage_heure", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 15, 16]);
      const startMinute = randomChoice([35, 40, 45, 50]);
      const duration = randomChoice([20, 25, 30, 35]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      const toNextHour = 60 - startMinute;
      const remaining = duration - toNextHour;

      const steps =
        remaining > 0
          ? [
              {
                label: `+ ${toNextHour} min`,
                minutes: toNextHour,
                color: "#38bdf8",
              },
              {
                label: `+ ${remaining} min`,
                minutes: remaining,
                color: "#f97316",
              },
            ]
          : [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#22c55e",
              },
            ];

      return {
        text:
          `Un dessin animé commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. ` +
          `À quelle heure se termine-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(startHour, (startMinute + duration) % 60),
          formatHour(end.hour + 1, end.minute),
          formatHour(startHour, startMinute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Ici, il faut faire attention au passage à l’heure suivante. " +
          `On part de ${formatHour(startHour, startMinute)} et on ajoute ${duration} minutes. ` +
          `Quand les minutes atteignent 60, on passe à l’heure suivante. ` +
          `On arrive donc à ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Passage à l’heure suivante",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps,
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_probleme_tpl_007_open_expliquer_attente",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Explique comment tu comptes les minutes entre les deux horaires.",
    tags: ["cm1", "duree", "probleme", "open", "expliquer", "attente", "reunion", "template"],
    generate: () => {
      const nowHour = randomChoice([7, 8, 15, 16]);
      const nowMinute = randomChoice([5, 10, 15, 20, 25]);
      const wait = randomChoice([10, 15, 20, 25]);
      const end = fromMinutes(totalMinutes(nowHour, nowMinute) + wait);

      return {
        text:
          `À La Réunion, il est ${formatHour(nowHour, nowMinute)}. ` +
          `Le bus part à ${formatHour(end.hour, end.minute)}. ` +
          `Il part dans ${wait} minutes. Explique comment on peut le trouver.`,
        format: "open",
        expected: ["minutes", "attente"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on cherche le temps d’attente entre les deux horaires. " +
          `On compte les minutes de ${formatHour(nowHour, nowMinute)} à ${formatHour(end.hour, end.minute)}. ` +
          `On trouve ${wait} minutes. Le bus part donc dans ${wait} minutes.`,
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Explique l’attente",
          start: {
            hour: nowHour,
            minute: nowMinute,
            label: "Maintenant",
          },
          end: {
            hour: end.hour,
            minute: end.minute,
            label: "Départ",
          },
          colors: watchColors(wait),
        }),
      };
    },
  },
    // ============================================================
  // DUREE_DEFI
  // Résoudre un défi de durées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_001_erreur_1h75",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : “1 h 75, c’est correct.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dès qu’on a 60 minutes, cela fait 1 heure.",
    explanation:
      "L’élève confond avec une écriture en base 100. " +
      "Dans les durées, 60 minutes forment 1 heure. " +
      "Donc on ne laisse pas 75 minutes après le h. " +
      "75 min = 1 h 15, donc 1 h 75 correspondrait à 2 h 15. L’écriture 1 h 75 n’est pas correcte.",
    tags: ["cm1", "duree", "defi", "erreur", "base_60", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_002_comparer_1h20_90min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle durée est la plus longue : 1 h 20 ou 90 min ?",
    format: "qcm",
    choices: ["1 h 20", "90 min", "elles sont égales"],
    expected: ["90 min"],
    comparator: "mcq_exact",
    hint: "Convertis 1 h 20 en minutes.",
    explanation:
      "Pour comparer deux durées, on les écrit dans la même unité. " +
      "1 h 20 = 60 min + 20 min = 80 min. " +
      "On compare donc 80 min et 90 min. " +
      "90 min est plus long que 1 h 20.",
    tags: ["cm1", "duree", "defi", "comparer", "conversion", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_001_corriger_minutes_trop_grandes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme les minutes en heures dès que tu peux faire un groupe de 60.",
    tags: ["cm1", "duree", "defi", "base_60", "corriger", "template"],
    generate: () => {
      const minutes = randomChoice([65, 70, 75, 80, 90, 100]);
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const correct = `${h} h ${pad2(m)}`;

      return {
        text: `${minutes} minutes correspondent à...`,
        format: "qcm",
        choices: makeChoices(correct, [
          `0 h ${minutes}`,
          `${h} h ${minutes}`,
          `${minutes} h`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Les durées ne fonctionnent pas comme les nombres décimaux : on regroupe les minutes par paquets de 60. " +
          `${minutes} min = ${h} h et ${m} min. ` +
          `Donc ${minutes} minutes correspondent à ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_002_comparer_durees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis la durée en heures et minutes en minutes.",
    tags: ["cm1", "duree", "defi", "comparer", "template"],
    generate: () => {
      const h = randomChoice([1, 2]);
      const m = randomChoice([10, 15, 20, 30, 45]);
      const totalA = h * 60 + m;

      const difference = randomChoice([-20, -15, -10, 10, 15, 20]);
      const totalB = totalA + difference;

      const durationA = `${h} h ${pad2(m)}`;
      const durationB = `${totalB} min`;

      const correct = totalA > totalB ? durationA : durationB;

      return {
        text: `Quelle durée est la plus longue : ${durationA} ou ${durationB} ?`,
        format: "qcm",
        choices: shuffle([durationA, durationB, "elles sont égales"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour comparer deux durées, on les écrit dans la même unité. " +
          `${durationA} = ${totalA} min. ` +
          `On compare donc ${totalA} min et ${totalB} min. ` +
          `La durée la plus longue est ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_003_probleme_deux_etapes_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les durées, puis ajoute le total à l’heure de départ.",
    tags: ["cm1", "duree", "defi", "reunion", "deux_etapes", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([6, 7, 8, 14, 15]);
      const startMinute = randomChoice([0, 10, 20, 30, 40]);
      const marche = randomChoice([20, 25, 30, 35]);
      const pause = randomChoice([10, 15, 20]);
      const total = marche + pause;
      const end = fromMinutes(totalMinutes(startHour, startMinute) + total);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `À La Réunion, Noa part marcher à ${formatHour(startHour, startMinute)}. ` +
          `Il marche ${marche} minutes, puis fait une pause de ${pause} minutes. ` +
          `À quelle heure a-t-il terminé ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(end.hour, (end.minute + 10) % 60),
          formatHour(startHour, startMinute),
          formatHour(end.hour + 1, end.minute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Le problème a deux étapes : une marche puis une pause. " +
          `On commence par additionner les durées : ${marche} + ${pause} = ${total} minutes. ` +
          `Ensuite, on ajoute ${total} minutes à l’heure de départ : ${formatHour(startHour, startMinute)}. ` +
          `Noa termine à ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Marche et pause",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${marche} min`,
                minutes: marche,
                color: "#22c55e",
              },
              {
                label: `+ ${pause} min`,
                minutes: pause,
                color: "#f59e0b",
              },
            ],
          },
          colors: watchColors(total),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_004_trouver_depart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver l’heure de départ, on enlève la durée à l’heure d’arrivée.",
    tags: ["cm1", "duree", "defi", "heure_depart", "template"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 14, 15, 16]);
      const startMinute = randomChoice([0, 10, 15, 20, 30]);
      const duration = randomChoice([20, 30, 40, 45]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);

      const start = formatHour(startHour, startMinute);
      const arrival = formatHour(end.hour, end.minute);

      return {
        text:
          `Un atelier se termine à ${arrival}. Il a duré ${duration} minutes. ` +
          `À quelle heure a-t-il commencé ?`,
        format: "qcm",
        choices: makeChoices(start, [
          formatHour(end.hour, end.minute),
          formatHour(startHour + 1, startMinute),
          formatHour(startHour, Math.min(55, startMinute + 10)),
        ]),
        expected: [start],
        comparator: "mcq_exact",
        explanation:
          "Cette fois, on connaît l’heure de fin et la durée. " +
          "Pour retrouver l’heure de début, on recule dans le temps. " +
          `${arrival} moins ${duration} minutes donne ${start}. ` +
          `L’atelier a donc commencé à ${start}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Retrouver le départ",
          frise: {
            startLabel: start,
            endLabel: arrival,
            steps: [
              {
                label: `+ ${duration} min`,
                minutes: duration,
                color: "#38bdf8",
              },
            ],
          },
          colors: watchColors(duration),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_005_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que 60 minutes forment 1 heure.",
    tags: ["cm1", "duree", "defi", "open", "erreur", "base_60", "template"],
    generate: () => {
      const minutes = randomChoice([70, 75, 80, 90]);
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const correct = `${h} h ${pad2(m)}`;

      return {
        text:
          `Un élève écrit : “${minutes} minutes = 0 h ${minutes}”. ` +
          `Corrige son erreur et explique.`,
        format: "open",
        expected: ["60", "heure", "minutes"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève oublie que 60 minutes forment 1 heure. " +
          `Il ne faut donc pas écrire 0 h ${minutes}. ` +
          `${minutes} minutes correspondent à ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_duree_defi_tpl_006_open_strategie_probleme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Explique les deux étapes : additionner les durées, puis trouver l’heure de fin.",
    tags: ["cm1", "duree", "defi", "open", "strategie", "reunion", "template", "frise"],
    generate: () => {
      const startHour = randomChoice([6, 7, 8, 15]);
      const startMinute = randomChoice([0, 10, 20, 30]);
      const a = randomChoice([15, 20, 25]);
      const b = randomChoice([10, 15, 20]);
      const total = a + b;
      const end = fromMinutes(totalMinutes(startHour, startMinute) + total);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `À La Réunion, une sortie commence à ${formatHour(startHour, startMinute)}. ` +
          `Il y a ${a} minutes de marche puis ${b} minutes d’attente. ` +
          `La sortie finit à ${correct}. Explique comment on peut le vérifier.`,
        format: "open",
        expected: ["additionne", "minutes"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on additionne d’abord les deux durées. " +
          `${a} + ${b} = ${total} minutes. ` +
          `Puis on ajoute ${total} minutes à ${formatHour(startHour, startMinute)}. ` +
          `On arrive bien à ${correct}.`,
        canvas: dureeCanvas({
          variant: "frise",
          title: "Vérifier la sortie",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${a} min`,
                minutes: a,
                color: "#22c55e",
              },
              {
                label: `+ ${b} min`,
                minutes: b,
                color: "#f97316",
              },
            ],
          },
          colors: watchColors(total),
        }),
      };
    },
  },
];