// lib/tutor-v4/question-banks/maths/cm2/durees.bank.ts

import type {
  TutorBankItemV4,
  DureeCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
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

export const dureesBank: TutorBankItemV4[] = [
  // ============================================================
  // DUREE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_1_heure_pleine",
    niveau: "cm2",
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
    hint: "La grande aiguille est sur 12 : il est pile une heure.",
    explanation: exp(
      "Lire une heure, c’est repérer la petite aiguille des heures et la grande aiguille des minutes.",
      "On regarde d’abord la grande aiguille, puis la petite aiguille.",
      "La grande aiguille est sur 12 : cela fait 00 minute. La petite aiguille indique 3.",
      "L’horloge indique 3 h 00."
    ),
    tags: ["cm2", "duree", "lire", "horloge", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Montre colorée",
      time: {
        hour: 3,
        minute: 0,
        label: "Quelle heure ?",
      },
      colors: watchColors(0),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_2_demie",
    niveau: "cm2",
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
      "Sur une horloge, la grande aiguille sur le 6 indique 30 minutes.",
      "La petite aiguille est entre 4 et 5, donc il est 4 h 30.",
      "L’heure indiquée est 4 h 30."
    ),
    tags: ["cm2", "duree", "lire", "demi_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Lecture de l’heure",
      time: {
        hour: 4,
        minute: 30,
        label: "Demi-heure",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_3_quart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["7 h 15", "7 h 03", "3 h 35", "7 h 45"],
    expected: ["7 h 15"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 3 indique 15 minutes.",
    explanation: exp(
      "Un quart d’heure correspond à 15 minutes.",
      "On lit les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 3, donc 15 minutes. La petite aiguille est après 7.",
      "L’heure indiquée est 7 h 15."
    ),
    tags: ["cm2", "duree", "lire", "quart_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Quart d’heure",
      time: {
        hour: 7,
        minute: 15,
        label: "1 quart d’heure",
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_4_moins_quart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["8 h 45", "9 h 45", "8 h 15", "9 h 15"],
    expected: ["8 h 45"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 9 indique 45 minutes.",
    explanation: exp(
      "Trois quarts d’heure correspondent à 45 minutes.",
      "On lit les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 9 : cela fait 45 minutes. La petite aiguille approche de 9, donc il est 8 h 45.",
      "L’heure indiquée est 8 h 45."
    ),
    tags: ["cm2", "duree", "lire", "45_minutes", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Montre colorée",
      time: {
        hour: 8,
        minute: 45,
        label: "Presque 9 h",
      },
      colors: watchColors(0),
    }),
  },

  {
    kind: "template",
    id: "cm2_duree_lire_tpl_1_heures_simples",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la grande aiguille pour les minutes.",
    tags: ["cm2", "duree", "lire", "template", "horloge", "canvas"],
    generate: () => {
      const hour = randomChoice([2, 3, 5, 6, 8, 9, 10]);
      const minute = randomChoice([0, 15, 30, 45]);
      const correct = formatHour(hour, minute);

      return {
        text: "Quelle heure indique l’horloge ?",
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(hour, (minute + 15) % 60),
          formatHour(hour + 1, minute),
          formatHour(Math.max(1, hour - 1), minute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire une horloge, c’est lire les heures et les minutes.",
          "La petite aiguille donne l’heure et la grande aiguille donne les minutes.",
          `Ici, l’horloge indique ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "horloge",
          title: "Quelle heure ?",
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
    id: "cm2_duree_lire_tpl_2_numerique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis d’abord les heures, puis les minutes.",
    tags: ["cm2", "duree", "lire", "digital", "template", "canvas"],
    generate: () => {
      const hour = randomChoice([8, 9, 10, 13, 14, 16, 17]);
      const minute = randomChoice([5, 10, 20, 30, 45, 50]);
      const correct = formatHour(hour, minute);

      return {
        text: `L’affichage indique ${hour}:${pad2(minute)}. Comment écrit-on cette heure ?`,
        format: "qcm",
        // ⚠️ Le piège « minutes sans le zéro » ne mord qu'en dessous de 10 :
        // au-delà, il s'écrit comme la bonne réponse. Et à 10 h 10, le piège
        // des aiguilles échangées y tombe aussi — il ne restait alors qu'une
        // proposition en face. Deux secours qui ne peuvent pas coïncider.
        choices: makeChoices(correct, [
          `${hour} h ${minute}`,
          `${minute} h ${pad2(hour)}`,
          `${hour + 1} h ${pad2(minute)}`,
          `${hour - 1} h ${pad2(minute)}`,
          `${hour} h ${pad2(60 - minute)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une heure peut s’écrire avec un affichage numérique ou avec l’écriture en heures et minutes.",
          "On transforme l’écriture avec deux points en écriture avec h.",
          `${hour}:${pad2(minute)} s’écrit ${correct}.`,
          `La bonne écriture est ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "digital",
          digital: {
            text: `${hour}:${pad2(minute)}`,
            label: "Affichage numérique",
          },
          colors: watchColors(minute),
        }),
      };
    },
  },

  // ============================================================
  // DUREE_CONVERTIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_1_heure_minutes",
    niveau: "cm2",
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
    hint: "1 heure = 60 minutes.",
    explanation: exp(
      "Une heure contient 60 minutes.",
      "Pour convertir des heures en minutes, on multiplie par 60.",
      "1 h = 60 min.",
      "Il y a 60 minutes dans 1 heure."
    ),
    tags: ["cm2", "duree", "convertir", "heure_minute", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_2_deux_heures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien font 2 heures en minutes ?",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "1 h = 60 min, donc 2 h = 2 × 60 min.",
    explanation: exp(
      "Une heure contient 60 minutes.",
      "On multiplie le nombre d’heures par 60.",
      "2 × 60 = 120.",
      "2 heures font 120 minutes."
    ),
    tags: ["cm2", "duree", "convertir", "heures_minutes"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_3_90min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "90 minutes correspondent à...",
    format: "qcm",
    choices: ["1 h 30", "1 h 90", "2 h 30", "90 h"],
    expected: ["1 h 30"],
    comparator: "mcq_exact",
    hint: "60 min = 1 h. Il reste 30 min.",
    explanation: exp(
      "Pour convertir des minutes en heures et minutes, on cherche combien de fois il y a 60 minutes.",
      "On retire 60 minutes pour faire une heure complète.",
      "90 min = 60 min + 30 min = 1 h 30.",
      "90 minutes correspondent à 1 h 30."
    ),
    tags: ["cm2", "duree", "convertir", "90min", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_4_secondes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 3 minutes en secondes ?",
    format: "short",
    expected: ["180"],
    comparator: "number_equal",
    hint: "1 minute = 60 secondes.",
    explanation: exp(
      "Une minute contient 60 secondes.",
      "Pour convertir des minutes en secondes, on multiplie par 60.",
      "3 × 60 = 180.",
      "3 minutes font 180 secondes."
    ),
    tags: ["cm2", "duree", "convertir", "minutes_secondes"],
  },

  {
    kind: "template",
    id: "cm2_duree_convertir_tpl_1_heures_minutes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre d’heures par 60.",
    tags: ["cm2", "duree", "convertir", "template"],
    generate: () => {
      const h = randomChoice([2, 3, 4, 5, 6]);
      const result = h * 60;

      return {
        text: `Combien font ${h} heures en minutes ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "1 heure contient 60 minutes.",
          "On multiplie le nombre d’heures par 60.",
          `${h} × 60 = ${result}.`,
          `${h} heures font ${result} minutes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_duree_convertir_tpl_2_minutes_h_min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les heures complètes de 60 minutes.",
    tags: ["cm2", "duree", "convertir", "template"],
    generate: () => {
      const h = randomChoice([1, 2, 3]);
      const m = randomChoice([10, 15, 20, 30, 45]);
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
        explanation: exp(
          "Pour convertir des minutes en heures et minutes, on cherche les paquets de 60 minutes.",
          "On décompose la durée en heures complètes et minutes restantes.",
          `${total} min = ${h} × 60 min + ${m} min.`,
          `${total} minutes correspondent à ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_duree_convertir_tpl_3_minutes_secondes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 minute = 60 secondes.",
    tags: ["cm2", "duree", "convertir", "secondes", "template"],
    generate: () => {
      const min = randomChoice([2, 3, 4, 5, 6, 10]);
      const result = min * 60;

      return {
        text: `Combien font ${min} minutes en secondes ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une minute contient 60 secondes.",
          "On multiplie le nombre de minutes par 60.",
          `${min} × 60 = ${result}.`,
          `${min} minutes font ${result} secondes.`
        ),
      };
    },
  },

  // ============================================================
  // DUREE_CALCULER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_calculer_fixed_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un cours commence à 8 h 00 et finit à 9 h 00. Quelle est sa durée en minutes ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "De 8 h à 9 h, il y a 1 heure.",
    explanation: exp(
      "Calculer une durée, c’est chercher le temps écoulé entre deux instants.",
      "On compte le temps entre l’heure de début et l’heure de fin.",
      "De 8 h 00 à 9 h 00, il y a 1 heure, donc 60 minutes.",
      "La durée est 60 minutes."
    ),
    tags: ["cm2", "duree", "calculer", "horaires", "canvas"],
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
    id: "cm2_duree_calculer_fixed_2_45min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une activité commence à 14 h 15 et finit à 15 h 00. Quelle est sa durée ?",
    format: "qcm",
    choices: ["45 min", "15 min", "1 h 15", "30 min"],
    expected: ["45 min"],
    comparator: "mcq_exact",
    hint: "De 14 h 15 à 15 h 00, il manque 45 minutes.",
    explanation: exp(
      "Une durée est le temps écoulé entre un début et une fin.",
      "On peut avancer jusqu’à l’heure suivante.",
      "De 14 h 15 à 15 h 00, il y a 45 minutes.",
      "La durée est 45 min."
    ),
    tags: ["cm2", "duree", "calculer", "45min", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Combien de temps ?",
      start: {
        hour: 14,
        minute: 15,
        label: "Début",
      },
      end: {
        hour: 15,
        minute: 0,
        label: "Fin",
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_calculer_fixed_3_fin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un film commence à 17 h 40 et dure 1 h 50. À quelle heure se termine-t-il ?",
    format: "qcm",
    choices: ["19 h 30", "18 h 90", "19 h 20", "18 h 30"],
    expected: ["19 h 30"],
    comparator: "mcq_exact",
    hint: "Ajoute d’abord 1 h, puis 50 min.",
    explanation: exp(
      "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
      "On peut ajouter les heures puis les minutes.",
      "17 h 40 + 1 h = 18 h 40. Puis 18 h 40 + 50 min = 19 h 30.",
      "Le film se termine à 19 h 30."
    ),
    tags: ["cm2", "duree", "calculer", "heure_fin", "cinema", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Film : calcul de l’heure de fin",
      frise: {
        startLabel: "17 h 40",
        endLabel: "19 h 30",
        steps: [
          {
            label: "+ 1 h",
            minutes: 60,
            color: "#38bdf8",
          },
          {
            label: "+ 50 min",
            minutes: 50,
            color: "#f97316",
          },
        ],
      },
      colors: watchColors(0),
    }),
  },

  {
    kind: "template",
    id: "cm2_duree_calculer_tpl_1_ecart_minutes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule la différence entre les deux horaires.",
    tags: ["cm2", "duree", "calculer", "template", "canvas"],
    generate: () => {
      const startHour = randomChoice([8, 9, 10, 14, 15]);
      const startMinute = randomChoice([0, 10, 15, 20, 30]);
      const duration = randomChoice([20, 30, 40, 45, 50, 60]);
      const startTotal = totalMinutes(startHour, startMinute);
      const end = fromMinutes(startTotal + duration);

      return {
        text: `Une activité commence à ${formatHour(startHour, startMinute)} et finit à ${formatHour(end.hour, end.minute)}. Quelle est sa durée en minutes ?`,
        format: "short",
        expected: [String(duration)],
        comparator: "number_equal",
        explanation: exp(
          "La durée est le temps entre le début et la fin.",
          "On calcule l’écart entre les deux horaires.",
          `${formatHour(end.hour, end.minute)} - ${formatHour(startHour, startMinute)} = ${duration} min.`,
          `La durée est ${duration} minutes.`
        ),
        canvas: dureeCanvas({
          variant: "double_horloge",
          title: "Durée à trouver",
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
    id: "cm2_duree_calculer_tpl_2_heure_fin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute la durée à l’heure de départ.",
    tags: ["cm2", "duree", "calculer", "heure_fin", "template"],
    generate: () => {
      const startHour = randomChoice([8, 9, 13, 14, 16]);
      const startMinute = randomChoice([0, 10, 15, 30, 40]);
      const duration = randomChoice([30, 45, 60, 75, 90]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      return {
        text: `Une séance commence à ${formatHour(startHour, startMinute)} et dure ${formatDuration(duration)}. À quelle heure se termine-t-elle ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(end.hour + 1, end.minute),
          formatHour(startHour, startMinute),
          formatHour(end.hour, (end.minute + 15) % 60),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
          "On peut convertir la durée en minutes puis l’ajouter.",
          `${formatHour(startHour, startMinute)} + ${formatDuration(duration)} = ${correct}.`,
          `La séance se termine à ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "frise",
          title: "Heure de fin",
          frise: {
            startLabel: formatHour(startHour, startMinute),
            endLabel: correct,
            steps: [
              {
                label: `+ ${formatDuration(duration)}`,
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
    id: "cm2_duree_calculer_tpl_3_duree_h_min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par les minutes ou avance par étapes.",
    tags: ["cm2", "duree", "calculer", "h_min", "template"],
    generate: () => {
      const startHour = randomChoice([7, 8, 9, 13, 14]);
      const startMinute = randomChoice([5, 10, 15, 20, 30]);
      const duration = randomChoice([70, 80, 95, 105, 110, 125]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatDuration(duration);

      return {
        text: `Un trajet commence à ${formatHour(startHour, startMinute)} et se termine à ${formatHour(end.hour, end.minute)}. Quelle est sa durée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${Math.floor(duration / 60)} h`,
          `${duration} h`,
          `${duration % 60} min`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour calculer une durée, on mesure l’écart entre deux horaires.",
          "On peut convertir les deux horaires en minutes depuis le début de la journée.",
          `${formatHour(end.hour, end.minute)} - ${formatHour(startHour, startMinute)} = ${duration} min = ${correct}.`,
          `La durée est ${correct}.`
        ),
      };
    },
  },

  // ============================================================
  // DUREE_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_probleme_fixed_1_bus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "À Saint-Pierre, le bus part à 7 h 25. Il est 7 h 10. Dans combien de minutes le bus part-il ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Compte de 7 h 10 à 7 h 25.",
    explanation: exp(
      "Un problème de durée demande souvent de calculer un temps d’attente.",
      "On calcule l’écart entre l’heure actuelle et l’heure de départ.",
      "De 7 h 10 à 7 h 25, il y a 15 minutes.",
      "Le bus part dans 15 minutes."
    ),
    tags: ["cm2", "duree", "probleme", "bus", "reunion"],
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
    id: "cm2_duree_probleme_fixed_2_cuisson",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un gâteau doit cuire 45 minutes. On l’enfourne à 16 h 20. À quelle heure sera-t-il cuit ?",
    format: "qcm",
    choices: ["17 h 05", "16 h 65", "17 h 15", "16 h 45"],
    expected: ["17 h 05"],
    comparator: "mcq_exact",
    hint: "Ajoute 45 minutes à 16 h 20.",
    explanation: exp(
      "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
      "On peut aller jusqu’à 17 h puis ajouter le reste.",
      "De 16 h 20 à 17 h 00, il y a 40 minutes. Il reste 5 minutes, donc 17 h 05.",
      "Le gâteau sera cuit à 17 h 05."
    ),
    tags: ["cm2", "duree", "probleme", "cuisson", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Cuisson du gâteau",
      frise: {
        startLabel: "16 h 20",
        endLabel: "17 h 05",
        steps: [
          {
            label: "+ 40 min",
            minutes: 40,
            color: "#f97316",
          },
          {
            label: "+ 5 min",
            minutes: 5,
            color: "#22c55e",
          },
        ],
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_probleme_fixed_3_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "sport",
    text: "Un entraînement commence à 9 h 35 et dure 1 h 20. À quelle heure se termine-t-il ?",
    format: "qcm",
    choices: ["10 h 55", "10 h 35", "11 h 20", "9 h 55"],
    expected: ["10 h 55"],
    comparator: "mcq_exact",
    hint: "Ajoute 1 h puis 20 minutes.",
    explanation: exp(
      "Un horaire de fin s’obtient en ajoutant la durée à l’horaire de début.",
      "On ajoute d’abord l’heure entière, puis les minutes.",
      "9 h 35 + 1 h = 10 h 35. Puis 10 h 35 + 20 min = 10 h 55.",
      "L’entraînement se termine à 10 h 55."
    ),
    tags: ["cm2", "duree", "probleme", "sport", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_duree_probleme_tpl_1_bus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Calcule le temps d’attente.",
    tags: ["cm2", "duree", "probleme", "bus", "reunion", "template"],
    generate: () => {
      const nowHour = randomChoice([6, 7, 8, 15, 16]);
      const nowMinute = randomChoice([0, 5, 10, 15, 20, 25, 30]);
      const wait = randomChoice([10, 15, 20, 25, 30, 35]);
      const end = fromMinutes(totalMinutes(nowHour, nowMinute) + wait);

      return {
        text: `À La Réunion, il est ${formatHour(nowHour, nowMinute)}. Le prochain bus part à ${formatHour(end.hour, end.minute)}. Dans combien de minutes part-il ?`,
        format: "short",
        expected: [String(wait)],
        comparator: "number_equal",
        explanation: exp(
          "Le temps d’attente est une durée entre maintenant et le départ.",
          "On calcule l’écart entre les deux horaires.",
          `${formatHour(end.hour, end.minute)} - ${formatHour(nowHour, nowMinute)} = ${wait} min.`,
          `Le bus part dans ${wait} minutes.`
        ),
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
    id: "cm2_duree_probleme_tpl_2_cinema",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Ajoute la durée du film à l’heure de début.",
    tags: ["cm2", "duree", "probleme", "cinema", "template"],
    generate: () => {
      const startHour = randomChoice([13, 14, 15, 16, 17]);
      const startMinute = randomChoice([0, 10, 20, 30, 40]);
      const duration = randomChoice([80, 90, 100, 110, 120]);
      const end = fromMinutes(totalMinutes(startHour, startMinute) + duration);
      const correct = formatHour(end.hour, end.minute);

      return {
        text: `Un film commence à ${formatHour(startHour, startMinute)} et dure ${duration} minutes. À quelle heure se termine-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(end.hour - 1, end.minute),
          formatHour(end.hour, (end.minute + 10) % 60),
          `${end.hour} h ${duration}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
          "On peut convertir la durée en heures et minutes.",
          `${duration} min = ${formatDuration(duration)}. Donc ${formatHour(startHour, startMinute)} + ${formatDuration(duration)} = ${correct}.`,
          `Le film se termine à ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_duree_probleme_tpl_3_ecole",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les deux durées.",
    tags: ["cm2", "duree", "probleme", "ecole", "template"],
    generate: () => {
      const duree1 = randomChoice([45, 50, 55, 60]);
      const pause = randomChoice([10, 15, 20]);
      const total = duree1 + pause;

      return {
        text: `Une activité dure ${duree1} minutes, puis il y a une pause de ${pause} minutes. Quelle est la durée totale ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand deux durées se suivent, on les additionne.",
          "On ajoute la durée de l’activité et la durée de la pause.",
          `${duree1} + ${pause} = ${total}.`,
          `La durée totale est ${total} minutes.`
        ),
      };
    },
  },

  // ============================================================
  // DUREE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_1_confusion_base_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “1 h 75, c’est correct car 75 minutes existent.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dès qu’on atteint 60 minutes, on forme une heure.",
    explanation: exp(
      "Les durées en heures et minutes utilisent une base de 60 minutes.",
      "On ne laisse pas 75 minutes dans l’écriture h/min.",
      "75 min = 1 h 15. Donc 1 h 75 = 2 h 15.",
      "L’élève a tort : on n’écrit pas 1 h 75."
    ),
    tags: ["cm2", "duree", "defi", "erreur", "base_60", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_2_comparer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle durée est la plus longue : 1 h 20 ou 90 min ?",
    format: "qcm",
    choices: ["1 h 20", "90 min", "elles sont égales"],
    expected: ["90 min"],
    comparator: "mcq_exact",
    hint: "Convertis 1 h 20 en minutes.",
    explanation: exp(
      "Pour comparer deux durées, il est souvent utile de les écrire dans la même unité.",
      "On convertit 1 h 20 en minutes.",
      "1 h 20 = 60 + 20 = 80 min. Or 90 min est plus grand que 80 min.",
      "La durée la plus longue est 90 min."
    ),
    tags: ["cm2", "duree", "defi", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_3_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, Léa part marcher à 6 h 50. Elle marche 35 min, fait une pause de 20 min, puis marche encore 25 min. À quelle heure finit-elle ?",
    format: "qcm",
    choices: ["8 h 10", "7 h 50", "8 h 20", "7 h 30"],
    expected: ["8 h 10"],
    comparator: "mcq_exact",
    hint: "Additionne toutes les durées : marche + pause + marche.",
    explanation: exp(
      "Un problème de durée peut avoir plusieurs étapes.",
      "On additionne toutes les durées puis on les ajoute à l’heure de départ.",
      "35 + 20 + 25 = 80 min = 1 h 20. 6 h 50 + 1 h 20 = 8 h 10.",
      "Léa finit à 8 h 10."
    ),
    tags: ["cm2", "duree", "defi", "reunion", "marche", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Randonnée du matin",
      frise: {
        startLabel: "6 h 50",
        endLabel: "8 h 10",
        steps: [
          {
            label: "+ 35 min",
            minutes: 35,
            color: "#22c55e",
          },
          {
            label: "+ 20 min",
            minutes: 20,
            color: "#f59e0b",
          },
          {
            label: "+ 25 min",
            minutes: 25,
            color: "#38bdf8",
          },
        ],
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "template",
    id: "cm2_duree_defi_tpl_1_base_60",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "60 minutes forment 1 heure.",
    tags: ["cm2", "duree", "defi", "base_60", "template"],
    generate: () => {
      const minutes = randomChoice([65, 70, 75, 80, 90, 100]);
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const correct = formatDuration(minutes);

      return {
        text: `${minutes} minutes correspondent à...`,
        format: "qcm",
        choices: makeChoices(correct, [
          `0 h ${minutes}`,
          `${h} h ${minutes}`,
          `${m} h ${pad2(h)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les durées en heures et minutes utilisent des groupes de 60 minutes.",
          "On cherche combien d’heures complètes on peut former.",
          `${minutes} min = ${h} h ${pad2(m)}.`,
          `${minutes} minutes correspondent à ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_duree_defi_tpl_2_comparer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Convertis tout en minutes.",
    tags: ["cm2", "duree", "defi", "comparer", "template"],
    generate: () => {
      const h = randomChoice([1, 2]);
      const m = randomChoice([10, 15, 20, 30, 45]);
      const totalA = h * 60 + m;
      const totalB = totalA + randomChoice([-15, -10, 10, 15, 20]);
      const durationA = `${h} h ${pad2(m)}`;
      const durationB = `${totalB} min`;

      const correct =
        totalA > totalB
          ? durationA
          : totalB > totalA
            ? durationB
            : "elles sont égales";

      return {
        text: `Quelle durée est la plus longue : ${durationA} ou ${durationB} ?`,
        format: "qcm",
        choices: shuffle([durationA, durationB, "elles sont égales"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux durées, on les écrit dans la même unité.",
          "On convertit la durée en heures et minutes en minutes.",
          `${durationA} = ${totalA} min. On compare ${totalA} min et ${totalB} min.`,
          `La bonne réponse est : ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_duree_defi_tpl_3_probleme_plusieurs_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Additionne les trois durées, puis ajoute-les à l’heure de départ.",
    tags: ["cm2", "duree", "defi", "reunion", "template"],
    generate: () => {
      const startHour = randomChoice([6, 7, 8, 14]);
      const startMinute = randomChoice([0, 10, 20, 30, 40]);
      const a = randomChoice([20, 25, 30, 35]);
      const b = randomChoice([10, 15, 20]);
      const c = randomChoice([20, 25, 30]);
      const total = a + b + c;
      const end = fromMinutes(totalMinutes(startHour, startMinute) + total);
      const correct = formatHour(end.hour, end.minute);

      return {
        text:
          `À La Réunion, un élève part à ${formatHour(startHour, startMinute)}. ` +
          `Il marche ${a} min, attend ${b} min, puis marche encore ${c} min. ` +
          `À quelle heure arrive-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatHour(end.hour, (end.minute + 10) % 60),
          formatHour(end.hour - 1, end.minute),
          formatHour(startHour, startMinute),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème à plusieurs étapes, on additionne les durées successives.",
          "On ajoute ensuite cette durée totale à l’heure de départ.",
          `${a} + ${b} + ${c} = ${total} min. ${formatHour(startHour, startMinute)} + ${formatDuration(total)} = ${correct}.`,
          `Il arrive à ${correct}.`
        ),
        canvas: dureeCanvas({
          variant: "frise",
          title: "Trajet en plusieurs étapes",
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
                color: "#f59e0b",
              },
              {
                label: `+ ${c} min`,
                minutes: c,
                color: "#38bdf8",
              },
            ],
          },
          colors: watchColors(total),
        }),
      };
    },
  },
];