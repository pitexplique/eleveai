import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const longueursBank: TutorBankItemV4[] = [
  // =========================
  // LONGUEUR_MESURER
  // =========================
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un crayon ?",
    format: "qcm",
    choices: ["km", "m", "cm", "hm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un crayon mesure environ quelques dizaines de centimètres.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la distance entre deux villes ?",
    format: "qcm",
    choices: ["cm", "mm", "km", "dm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Pour une grande distance, on utilise une grande unité.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer l’épaisseur d’une pièce ?",
    format: "qcm",
    choices: ["km", "m", "cm", "mm"],
    expected: ["mm"],
    comparator: "mcq_exact",
    hint: "L’épaisseur d’un petit objet se mesure avec une petite unité.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’une salle de classe ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["m"],
    comparator: "mcq_exact",
    hint: "Une salle de classe mesure plusieurs mètres.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un sentier de randonnée à La Réunion ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Un sentier se mesure sur une grande distance.",
    tags: ["longueurs", "mesure", "reunion"],
  },

  // =========================
  // LONGUEUR_UNITES
  // =========================
  {
    kind: "fixed",
    id: "longueur_unites_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de millimètres dans 1 centimètre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "1 cm = 10 mm.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "1 m correspond à…",
    format: "qcm",
    choices: ["10 cm", "100 cm", "1000 cm", "1 cm"],
    expected: ["100 cm"],
    comparator: "mcq_exact",
    hint: "Le mètre est 100 fois plus grand que le centimètre.",
    tags: ["longueurs", "unites", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "1 km correspond à…",
    format: "qcm",
    choices: ["10 m", "100 m", "1000 m", "10000 m"],
    expected: ["1000 m"],
    comparator: "mcq_exact",
    hint: "Le kilomètre contient mille mètres.",
    tags: ["longueurs", "unites", "qcm"],
  },

  // =========================
  // LONGUEUR_CONVERTIR
  // =========================
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 2 m en cm.",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 300 cm en m.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On divise par 100.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 4 km en m.",
    format: "short",
    expected: ["4000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 70 mm en cm.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "10 mm = 1 cm.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 2,5 m en cm.",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Multiplie par 100.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 500 cm en mètres ?",
    format: "qcm",
    choices: ["5", "50", "0,5", "5000"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On divise par 100.",
    tags: ["longueurs", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 3 km en mètres ?",
    format: "qcm",
    choices: ["30", "300", "3000", "30000"],
    expected: ["3000"],
    comparator: "mcq_exact",
    hint: "1 km = 1000 m.",
    tags: ["longueurs", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Un sentier de randonnée à La Réunion mesure 5 km. Combien cela fait-il en mètres ?",
    format: "short",
    expected: ["5000"],
    comparator: "number_equal",
    hint: "Chaque kilomètre vaut 1000 mètres.",
    tags: ["longueurs", "conversion", "reunion"],
  },

  // =========================
  // LONGUEUR_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["2 m", "150 cm", "180 cm", "1 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "Convertis tout en cm.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus petite longueur ?",
    format: "qcm",
    choices: ["3 m", "250 cm", "280 cm", "320 cm"],
    expected: ["250 cm"],
    comparator: "mcq_exact",
    hint: "3 m = 300 cm.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand : 1,5 m ou 140 cm ?",
    format: "short",
    expected: ["1,5 m", "1.5 m", "150 cm"],
    comparator: "contains_keyword",
    hint: "1,5 m = 150 cm.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["90 cm", "1 m", "95 cm", "99 cm"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Quel sentier est le plus long : 3 km ou 2800 m ?",
    format: "short",
    expected: ["3 km", "3000 m"],
    comparator: "contains_keyword",
    hint: "3 km = 3000 m.",
    tags: ["longueurs", "comparaison", "reunion"],
  },

  // =========================
  // LONGUEUR_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un terrain mesure 10 m de long. On ajoute 5 m. Quelle est la nouvelle longueur ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Addition simple.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une corde mesure 2 m. On coupe 50 cm. Quelle longueur reste-t-il en cm ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "2 m = 200 cm.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une planche de 3 m est partagée en 3 parts égales. Quelle est la longueur d’une part en m ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Partage 3 m en 3 parts égales.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban de 4 m est coupé en 2 morceaux égaux. Quelle est la longueur d’un morceau ?",
    format: "qcm",
    choices: ["1 m", "2 m", "3 m", "8 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "4 ÷ 2 = 2.",
    tags: ["longueurs", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un sentier à La Réunion mesure 6 km. Une première partie fait 2 km. Quelle longueur reste-t-il à parcourir en km ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On enlève 2 km à 6 km.",
    tags: ["longueurs", "probleme", "reunion"],
  },

  // =========================
  // LONGUEUR_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "longueur_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi ne peut-on pas mesurer une ville en centimètres ?",
    format: "short",
    expected: ["unité adaptée", "trop petit", "pas adapté", "grande distance"],
    comparator: "contains_keyword",
    hint: "On choisit une unité adaptée à la taille de ce qu’on mesure.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2 m est plus grand que 150 cm.",
    format: "short",
    expected: ["200", "150", "cm", "m"],
    comparator: "contains_keyword",
    hint: "Convertis tout dans la même unité.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet mesure plus de 1 m et moins de 150 cm. Donne un exemple possible de longueur en cm.",
    format: "short",
    expected: ["101", "110", "120", "130", "140", "149"],
    comparator: "exact_text",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, un trajet fait 2 km le matin et 1500 m l’après-midi. Quelle distance totale a-t-on parcourue en mètres ?",
    format: "short",
    expected: ["3500"],
    comparator: "number_equal",
    hint: "2 km = 2000 m.",
    tags: ["longueurs", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - MESURER
  // =========================
  {
    kind: "template",
    id: "longueur_mesurer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis une unité adaptée à la taille de l’objet.",
    tags: ["longueurs", "mesure", "template"],
    generate: () => {
      const items = [
        { obj: "une gomme", good: "cm", bad: ["km", "m", "hm"] },
        { obj: "une route entre deux villes", good: "km", bad: ["cm", "mm", "dm"] },
        { obj: "un cahier", good: "cm", bad: ["km", "m", "hm"] },
        { obj: "l’épaisseur d’un ongle", good: "mm", bad: ["m", "km", "cm"] },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Quelle unité est la plus adaptée pour mesurer ${item.obj} ?`,
        format: "qcm",
        choices: shuffle([item.good, ...item.bad]),
        expected: [item.good],
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - UNITES
  // =========================
  {
    kind: "template",
    id: "longueur_unites_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    hint: "Retiens les relations entre les unités.",
    tags: ["longueurs", "unites", "template"],
    generate: () => {
      const items = [
        { q: "Combien y a-t-il de centimètres dans 1 mètre ?", a: "100" },
        { q: "Combien y a-t-il de millimètres dans 1 centimètre ?", a: "10" },
        { q: "Combien y a-t-il de mètres dans 1 kilomètre ?", a: "1000" },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: item.q,
        format: "short",
        expected: [item.a],
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - CONVERTIR
  // =========================
  {
    kind: "template",
    id: "longueur_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "conversion", "template"],
    generate: () => {
      const m = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
      return {
        text: `Convertis ${m} m en cm.`,
        format: "short",
        expected: [String(m * 100)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_convertir_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 km = 1000 m.",
    tags: ["longueurs", "conversion", "template"],
    generate: () => {
      const km = [1, 2, 3, 4, 6][Math.floor(Math.random() * 5)];
      return {
        text: `Convertis ${km} km en m.`,
        format: "short",
        expected: [String(km * 1000)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_convertir_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis avec l’unité juste.",
    tags: ["longueurs", "conversion", "qcm", "template"],
    generate: () => {
      const cm = [100, 200, 300, 400, 500][Math.floor(Math.random() * 5)];
      const good = String(cm / 100);

      return {
        text: `Combien font ${cm} cm en m ?`,
        format: "qcm",
        choices: shuffle([good, String(cm), formatComma(cm / 10), formatComma(cm / 1000)]),
        expected: [good],
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "longueur_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare dans la même unité.",
    tags: ["longueurs", "comparaison", "template"],
    generate: () => {
      const a = 100 + Math.floor(Math.random() * 200);
      const b = 100 + Math.floor(Math.random() * 200);
      const good = Math.max(a, b);

      return {
        text: `Quelle est la plus grande longueur : ${a} cm ou ${b} cm ?`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord les mètres en centimètres.",
    tags: ["longueurs", "comparaison", "template"],
    generate: () => {
      const meters = [1, 2, 3][Math.floor(Math.random() * 3)];
      const centimeters = randomInt(80, 290);
      const metersInCm = meters * 100;
      const good = metersInCm > centimeters ? `${meters} m` : `${centimeters} cm`;

      return {
        text: `Quelle est la plus grande longueur : ${meters} m ou ${centimeters} cm ?`,
        format: "short",
        expected: [good, String(Math.max(metersInCm, centimeters))],
        comparator: "contains_keyword",
      };
    },
  },

  // =========================
  // TEMPLATES - PROBLEME
  // =========================
  {
    kind: "template",
    id: "longueur_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les longueurs.",
    tags: ["longueurs", "probleme", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      const b = randomInt(2, 10);

      return {
        text: `Une corde mesure ${a} m. On ajoute ${b} m. Quelle est la nouvelle longueur ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à convertir si nécessaire.",
    tags: ["longueurs", "probleme", "template"],
    generate: () => {
      const a = randomInt(2, 6) * 100;
      const b = randomInt(10, 90);

      return {
        text: `Une ficelle mesure ${a} cm. On coupe ${b} cm. Quelle longueur reste-t-il en cm ?`,
        format: "short",
        expected: [String(a - b)],
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "longueur_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une longueur qui respecte l’encadrement.",
    tags: ["longueurs", "defi", "template"],
    generate: () => {
      const low = randomInt(1, 4) * 100;
      const high = low + 50;

      return {
        text: `Donne une longueur en cm plus grande que ${low} cm et plus petite que ${high} cm.`,
        format: "short",
        expected: [String(low + 1), String(low + 10), String(high - 1)],
        comparator: "exact_text",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la bonne unité et explique ton choix.",
    tags: ["longueurs", "defi", "template"],
    generate: () => {
      const items = [
        "un stade",
        "une aiguille",
        "une route",
        "une table",
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Quelle unité choisirais-tu pour mesurer ${item} ? Explique pourquoi.`,
        format: "short",
        expected: ["unité", "adaptée", "mesurer"],
        comparator: "contains_keyword",
      };
    },
  },
];