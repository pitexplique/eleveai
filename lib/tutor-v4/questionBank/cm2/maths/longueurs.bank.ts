import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
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

function formatNumber(n: number) {
  return Number.isInteger(n)
    ? String(n)
    : String(Math.round(n * 100) / 100).replace(".", ",");
}

export const longueursBank: TutorBankItemV4[] = [
  /* ============================================================
     LONGUEUR_COMPARER
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_longueur_comparer_fixed_1_m_cm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle longueur est la plus grande ?",
    format: "qcm",
    choices: ["1 m", "50 cm", "10 cm", "5 cm"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Comparer des longueurs, c’est déterminer laquelle est la plus grande, la plus petite ou si elles sont égales.",
      "On convertit dans la même unité avant de comparer.",
      "1 m = 100 cm, donc 1 m est plus grand que 50 cm, 10 cm et 5 cm.",
      "La plus grande longueur est 1 m."
    ),
    tags: ["cm2", "longueur", "comparer", "m_cm", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_comparer_fixed_2_egalite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["1 m = 100 cm", "1 m = 10 cm", "1 cm = 100 m", "1 km = 100 m"],
    expected: ["1 m = 100 cm"],
    comparator: "mcq_exact",
    hint: "Un mètre contient 100 centimètres.",
    explanation: exp(
      "Pour comparer ou convertir des longueurs, il faut connaître les relations entre unités.",
      "On utilise les égalités de référence.",
      "1 m = 100 cm.",
      "L’égalité correcte est 1 m = 100 cm."
    ),
    tags: ["cm2", "longueur", "comparer", "egalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_comparer_fixed_3_cm_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare : 120 cm et 1 m.",
    format: "qcm",
    choices: ["120 cm est plus grand", "1 m est plus grand", "ils sont égaux"],
    expected: ["120 cm est plus grand"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Pour comparer deux longueurs, on les met dans la même unité.",
      "On convertit 1 m en centimètres.",
      "1 m = 100 cm. Or 120 cm > 100 cm.",
      "120 cm est plus grand que 1 m."
    ),
    tags: ["cm2", "longueur", "comparer", "cm_m", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_longueur_comparer_tpl_1_cm_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis les mètres en centimètres.",
    tags: ["cm2", "longueur", "comparer", "template", "cm_m"],
    generate: () => {
      const metres = randomChoice([1, 2, 3, 4]);
      const cm = metres * 100 + randomChoice([-30, -10, 20, 50]);
      const metreCm = metres * 100;

      const expected =
        cm > metreCm
          ? `${cm} cm est plus grand`
          : cm < metreCm
            ? `${metres} m est plus grand`
            : "ils sont égaux";

      return {
        text: `Compare : ${cm} cm et ${metres} m.`,
        format: "qcm",
        choices: makeChoices(expected, [
          `${cm} cm est plus grand`,
          `${metres} m est plus grand`,
          "ils sont égaux",
        ]),
        expected: [expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des longueurs, on les écrit dans la même unité.",
          "On convertit les mètres en centimètres.",
          `${metres} m = ${metreCm} cm. On compare donc ${cm} cm et ${metreCm} cm.`,
          expected === "ils sont égaux"
            ? "Les deux longueurs sont égales."
            : `Donc ${expected}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_comparer_tpl_2_km_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "1 km = 1 000 m.",
    tags: ["cm2", "longueur", "comparer", "km_m", "template"],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4]);
      const metres = km * 1000 + randomChoice([-200, -50, 100, 300]);
      const kmEnM = km * 1000;

      const expected =
        metres > kmEnM
          ? `${metres} m est plus grand`
          : metres < kmEnM
            ? `${km} km est plus grand`
            : "ils sont égaux";

      return {
        text: `Compare : ${km} km et ${metres} m.`,
        format: "qcm",
        choices: makeChoices(expected, [
          `${km} km est plus grand`,
          `${metres} m est plus grand`,
          "ils sont égaux",
        ]),
        expected: [expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des kilomètres et des mètres, on convertit dans la même unité.",
          "On convertit les kilomètres en mètres.",
          `${km} km = ${kmEnM} m. On compare ${kmEnM} m et ${metres} m.`,
          expected === "ils sont égaux"
            ? "Les deux longueurs sont égales."
            : `Donc ${expected}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_longueur_comparer_fixed_4_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “80 cm est plus grand que 1 m parce que 80 est plus grand que 1.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut tenir compte des unités.",
    explanation: exp(
      "Comparer des longueurs demande de comparer les valeurs dans la même unité.",
      "On ne compare pas seulement les nombres écrits : il faut regarder les unités.",
      "1 m = 100 cm. Donc 80 cm est plus petit que 100 cm.",
      "L’élève a tort : 80 cm est plus petit que 1 m."
    ),
    tags: ["cm2", "longueur", "comparer", "erreur", "unites", "qcm"],
  },

  /* ============================================================
     LONGUEUR_CONVERTIR
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_1_m_cm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Convertis : 3 m = ? cm",
    format: "qcm",
    choices: ["300", "30", "3", "3 000"],
    expected: ["300"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Convertir une longueur, c’est changer d’unité sans changer la longueur réelle.",
      "Pour passer des mètres aux centimètres, on multiplie par 100.",
      "3 m = 3 × 100 = 300 cm.",
      "3 m = 300 cm."
    ),
    tags: ["cm2", "longueur", "convertir", "m_cm", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_2_km_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Convertis : 2 km = ? m",
    format: "qcm",
    choices: ["2 000", "200", "20", "2"],
    expected: ["2 000"],
    comparator: "mcq_exact",
    hint: "1 km = 1 000 m.",
    explanation: exp(
      "Convertir une longueur, c’est l’écrire dans une autre unité.",
      "Pour passer des kilomètres aux mètres, on multiplie par 1 000.",
      "2 km = 2 × 1 000 = 2 000 m.",
      "2 km = 2 000 m."
    ),
    tags: ["cm2", "longueur", "convertir", "km_m", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_3_cm_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis : 250 cm = ? m",
    format: "qcm",
    choices: ["2,5", "25", "250", "0,25"],
    expected: ["2,5"],
    comparator: "mcq_exact",
    hint: "100 cm = 1 m.",
    explanation: exp(
      "Convertir des centimètres en mètres, c’est regrouper les centimètres par paquets de 100.",
      "Pour passer des centimètres aux mètres, on divise par 100.",
      "250 ÷ 100 = 2,5.",
      "250 cm = 2,5 m."
    ),
    tags: ["cm2", "longueur", "convertir", "cm_m", "decimal", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_1_m_cm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour passer de m à cm, multiplie par 100.",
    tags: ["cm2", "longueur", "convertir", "m_cm", "template"],
    generate: () => {
      const m = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const cm = m * 100;

      return {
        text: `Convertis : ${m} m = ? cm`,
        format: "short",
        expected: [String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "Convertir, c’est changer d’unité sans changer la longueur.",
          "Pour passer des mètres aux centimètres, on multiplie par 100.",
          `${m} × 100 = ${cm}.`,
          `${m} m = ${cm} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_2_km_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour passer de km à m, multiplie par 1 000.",
    tags: ["cm2", "longueur", "convertir", "km_m", "template"],
    generate: () => {
      const km = randomChoice([2, 3, 4, 5, 6, 8]);
      const m = km * 1000;

      return {
        text: `Convertis : ${km} km = ? m`,
        format: "short",
        expected: [String(m)],
        comparator: "number_equal",
        explanation: exp(
          "Convertir des kilomètres en mètres permet d’exprimer une même distance dans une unité plus petite.",
          "Pour passer des kilomètres aux mètres, on multiplie par 1 000.",
          `${km} × 1 000 = ${m}.`,
          `${km} km = ${m} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_3_cm_m_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer de cm à m, divise par 100.",
    tags: ["cm2", "longueur", "convertir", "cm_m", "decimal", "template"],
    generate: () => {
      const cm = randomChoice([120, 150, 175, 250, 320, 450]);
      const m = cm / 100;
      const expected = formatNumber(m);

      return {
        text: `Convertis : ${cm} cm = ? m`,
        format: "short",
        expected: [String(m), expected],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des centimètres en mètres, on utilise 1 m = 100 cm.",
          "On divise le nombre de centimètres par 100.",
          `${cm} ÷ 100 = ${expected}.`,
          `${cm} cm = ${expected} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_4_m_km_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer de m à km, divise par 1 000.",
    tags: ["cm2", "longueur", "convertir", "m_km", "decimal", "template"],
    generate: () => {
      const metres = randomChoice([500, 750, 1200, 1500, 2500, 3500]);
      const km = metres / 1000;
      const expected = formatNumber(km);

      return {
        text: `Convertis : ${metres} m = ? km`,
        format: "short",
        expected: [String(km), expected],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des mètres en kilomètres, on utilise 1 km = 1 000 m.",
          "On divise le nombre de mètres par 1 000.",
          `${metres} ÷ 1 000 = ${expected}.`,
          `${metres} m = ${expected} km.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_4_erreur_sens",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “4 m = 40 cm.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Convertir demande de connaître le rapport entre les unités.",
      "Pour passer de mètres à centimètres, on multiplie par 100.",
      "4 m = 4 × 100 = 400 cm, pas 40 cm.",
      "L’élève a tort."
    ),
    tags: ["cm2", "longueur", "convertir", "erreur", "m_cm", "qcm"],
  },
  /* ============================================================
     LONGUEUR_CONVERTIR — TABLEAUX DE CONVERSION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_5_tableau_cm_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text:
      "Dans un tableau de conversion, on place 3 dans la colonne m. " +
      "Quelle est la valeur en cm ?",
    format: "qcm",
    choices: ["300 cm", "30 cm", "3 cm", "3 000 cm"],
    expected: ["300 cm"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Un tableau de conversion aide à changer d’unité.",
      "On place le chiffre dans la bonne colonne puis on lit la valeur dans l’unité demandée.",
      "3 m = 3 × 100 = 300 cm.",
      "La valeur est 300 cm."
    ),
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "m_cm", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_6_tableau_km_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text:
      "Dans un tableau de conversion, on place 2 dans la colonne km. " +
      "Quelle est la valeur en m ?",
    format: "qcm",
    choices: ["2 000 m", "200 m", "20 m", "2 m"],
    expected: ["2 000 m"],
    comparator: "mcq_exact",
    hint: "1 km = 1 000 m.",
    explanation: exp(
      "Un tableau de conversion permet de passer d’une unité à une autre.",
      "On utilise la relation entre kilomètres et mètres.",
      "2 km = 2 × 1 000 = 2 000 m.",
      "La valeur est 2 000 m."
    ),
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "km_m", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_7_tableau_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text:
      "Dans un tableau de conversion, 1,5 m correspond à combien de cm ?",
    format: "qcm",
    choices: ["150 cm", "15 cm", "1,5 cm", "1 500 cm"],
    expected: ["150 cm"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm, donc 0,5 m = 50 cm.",
    explanation: exp(
      "Un nombre décimal peut aussi être converti avec un tableau de conversion.",
      "On convertit les mètres en centimètres en multipliant par 100.",
      "1,5 m = 1,5 × 100 = 150 cm.",
      "1,5 m correspond à 150 cm."
    ),
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "decimal", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_5_tableau_m_cm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans le tableau, passer de m à cm revient à multiplier par 100.",
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "m_cm", "template"],
    generate: () => {
      const m = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const cm = m * 100;

      return {
        text:
          `Dans un tableau de conversion, on place ${m} dans la colonne m. ` +
          `Quelle valeur lit-on en cm ?`,
        format: "short",
        expected: [String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau de conversion permet de changer d’unité.",
          "Pour passer des mètres aux centimètres, on multiplie par 100.",
          `${m} m = ${m} × 100 = ${cm} cm.`,
          `On lit ${cm} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_6_tableau_cm_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer de cm à m, on divise par 100.",
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "cm_m", "template"],
    generate: () => {
      const cm = randomChoice([120, 150, 200, 250, 300, 450, 500, 750]);
      const m = cm / 100;
      const expected = formatNumber(m);

      return {
        text:
          `Dans un tableau de conversion, on place ${cm} dans la colonne cm. ` +
          `Quelle valeur lit-on en m ?`,
        format: "short",
        expected: [String(m), expected],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des centimètres en mètres, on peut utiliser un tableau de conversion.",
          "On regroupe les centimètres par paquets de 100.",
          `${cm} cm = ${cm} ÷ 100 = ${expected} m.`,
          `On lit ${expected} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_7_tableau_km_m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer de km à m, on multiplie par 1 000.",
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "km_m", "template"],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4, 5, 6, 8]);
      const m = km * 1000;

      return {
        text:
          `Dans un tableau de conversion, on place ${km} dans la colonne km. ` +
          `Quelle valeur lit-on en m ?`,
        format: "short",
        expected: [String(m)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau de conversion aide à passer d’une grande unité à une plus petite.",
          "Pour passer de kilomètres à mètres, on multiplie par 1 000.",
          `${km} km = ${km} × 1 000 = ${m} m.`,
          `On lit ${m} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_convertir_tpl_8_tableau_m_km",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer de m à km, on divise par 1 000.",
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "m_km", "template"],
    generate: () => {
      const metres = randomChoice([500, 750, 1000, 1500, 2000, 2500, 3000]);
      const km = metres / 1000;
      const expected = formatNumber(km);

      return {
        text:
          `Dans un tableau de conversion, on place ${metres} dans la colonne m. ` +
          `Quelle valeur lit-on en km ?`,
        format: "short",
        expected: [String(km), expected],
        comparator: "number_equal",
        explanation: exp(
          "Le tableau de conversion permet de lire une longueur dans une autre unité.",
          "Pour passer de mètres à kilomètres, on divise par 1 000.",
          `${metres} m = ${metres} ÷ 1 000 = ${expected} km.`,
          `On lit ${expected} km.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_fixed_8_tableau_piege_zeros",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text:
      "Un élève utilise un tableau de conversion et écrit : 5 m = 50 cm. " +
      "A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Dans un tableau de conversion, chaque changement d’unité doit respecter les colonnes.",
      "Pour passer de mètres à centimètres, on multiplie par 100.",
      "5 m = 5 × 100 = 500 cm, pas 50 cm.",
      "L’élève a tort."
    ),
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "erreur", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_convertir_open_1_tableau_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment utiliser un tableau de conversion pour convertir des longueurs.",
    format: "open",
    expected: ["placer", "unité", "colonne", "convertir"],
    comparator: "contains_keyword",
    hint: "Parle de la colonne de départ et de l’unité d’arrivée.",
    explanation: exp(
      "Un tableau de conversion sert à changer l’unité d’une longueur.",
      "On place le nombre dans la colonne de l’unité de départ, puis on lit ou complète jusqu’à l’unité demandée.",
      "Par exemple, 3 m se lit 300 cm car 1 m = 100 cm.",
      "Il faut placer le nombre dans la bonne colonne puis lire la valeur dans l’unité demandée."
    ),
    tags: ["cm2", "longueur", "convertir", "tableau_conversion", "open", "methode"],
  },
  /* ============================================================
     LONGUEUR_ESTIMER
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_longueur_estimer_fixed_1_crayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient le mieux pour mesurer la longueur d’un crayon ?",
    format: "qcm",
    choices: ["cm", "km", "m", "tonne"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un crayon est un petit objet.",
    explanation: exp(
      "Estimer une longueur, c’est choisir une valeur ou une unité raisonnable.",
      "On choisit une unité adaptée à la taille de l’objet.",
      "Un crayon mesure souvent autour de 15 cm.",
      "L’unité la plus adaptée est le centimètre."
    ),
    tags: ["cm2", "longueur", "estimer", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_estimer_fixed_2_trajet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient le mieux pour mesurer la distance entre deux villes ?",
    format: "qcm",
    choices: ["km", "cm", "mm", "gramme"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Entre deux villes, la distance est grande.",
    explanation: exp(
      "Estimer une longueur demande de choisir une unité adaptée.",
      "Pour une grande distance, on utilise une grande unité.",
      "La distance entre deux villes se mesure généralement en kilomètres.",
      "L’unité adaptée est le kilomètre."
    ),
    tags: ["cm2", "longueur", "estimer", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_estimer_fixed_3_margouillat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "reunion",
    text: "Un petit margouillat mesure environ...",
    format: "qcm",
    choices: ["12 cm", "12 km", "12 m", "12 mm seulement"],
    expected: ["12 cm"],
    comparator: "mcq_exact",
    hint: "Un margouillat tient dans la main ou sur un mur.",
    explanation: exp(
      "Estimer, c’est choisir une mesure vraisemblable.",
      "On compare avec des objets connus.",
      "12 km ou 12 m sont impossibles pour un margouillat. 12 mm serait très petit.",
      "Une longueur d’environ 12 cm est vraisemblable."
    ),
    tags: ["cm2", "longueur", "estimer", "reunion", "margouillat", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_longueur_estimer_tpl_1_choisir_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis une unité adaptée à la taille de l’objet.",
    tags: ["cm2", "longueur", "estimer", "unite", "template"],
    generate: () => {
      const item = randomChoice([
        {
          objet: "la longueur d’une gomme",
          correct: "cm",
          wrongs: ["km", "m", "litre"],
          reason: "Une gomme est un petit objet.",
        },
        {
          objet: "la distance entre deux quartiers",
          correct: "km",
          wrongs: ["cm", "mm", "gramme"],
          reason: "Entre deux quartiers, la distance est assez grande.",
        },
        {
          objet: "la hauteur d’une porte",
          correct: "m",
          wrongs: ["km", "mm", "litre"],
          reason: "Une porte mesure environ 2 mètres.",
        },
        {
          objet: "l’épaisseur d’une pièce de monnaie",
          correct: "mm",
          wrongs: ["km", "m", "kg"],
          reason: "Une pièce est très fine.",
        },
      ]);

      return {
        text: `Quelle unité convient le mieux pour mesurer ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer une longueur, c’est choisir une unité raisonnable.",
          "On compare l’objet avec des longueurs que l’on connaît.",
          item.reason,
          `L’unité la plus adaptée est ${item.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_estimer_tpl_2_ordre_grandeur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Élimine les mesures impossibles.",
    tags: ["cm2", "longueur", "estimer", "ordre_grandeur", "template"],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une règle d’écolier",
          correct: "30 cm",
          wrongs: ["30 km", "30 m", "30 mm"],
          explanation: "Une règle d’écolier mesure souvent environ 30 cm.",
        },
        {
          objet: "une piscine",
          correct: "25 m",
          wrongs: ["25 cm", "25 km", "25 mm"],
          explanation: "Une piscine peut mesurer environ 25 m.",
        },
        {
          objet: "un trajet en voiture entre deux villes",
          correct: "25 km",
          wrongs: ["25 cm", "25 mm", "25 m seulement"],
          explanation: "Un trajet entre deux villes se mesure souvent en kilomètres.",
        },
      ]);

      return {
        text: `Quelle estimation est la plus raisonnable pour ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation doit être raisonnable.",
          "On élimine les unités ou valeurs impossibles.",
          item.explanation,
          `L’estimation la plus raisonnable est ${item.correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_longueur_estimer_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi on ne mesure pas la distance entre Saint-Pierre et Saint-Denis en centimètres.",
    format: "open",
    expected: ["distance", "grande", "kilomètres", "centimètres"],
    comparator: "contains_keyword",
    hint: "Les centimètres servent plutôt aux petites longueurs.",
    explanation: exp(
      "Estimer une longueur demande de choisir une unité adaptée.",
      "On utilise de petites unités pour les petites longueurs et de grandes unités pour les grandes distances.",
      "La distance entre Saint-Pierre et Saint-Denis est une grande distance.",
      "On utilise donc les kilomètres plutôt que les centimètres."
    ),
    tags: ["cm2", "longueur", "estimer", "open", "reunion", "unite"],
  },

  /* ============================================================
     LONGUEUR_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_longueur_defi_fixed_1_trajet_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une randonnée fait 3 km le matin et 1 500 m l’après-midi. Quelle est la distance totale en mètres ?",
    format: "qcm",
    choices: ["4 500", "1 503", "3 500", "4 000"],
    expected: ["4 500"],
    comparator: "mcq_exact",
    hint: "Convertis 3 km en mètres.",
    explanation: exp(
      "Un défi de longueur peut mélanger plusieurs unités.",
      "On convertit tout dans la même unité avant de calculer.",
      "3 km = 3 000 m. Donc 3 000 m + 1 500 m = 4 500 m.",
      "La distance totale est 4 500 m."
    ),
    tags: ["cm2", "longueur", "defi", "reunion", "km_m", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_longueur_defi_tpl_1_distance_totale",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis les kilomètres en mètres, puis additionne.",
    tags: ["cm2", "longueur", "defi", "addition", "conversion", "template"],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4]);
      const metres = randomChoice([250, 500, 750, 1200, 1500]);
      const total = km * 1000 + metres;

      return {
        text: `Un parcours mesure ${km} km puis ${metres} m. Quelle est la distance totale en mètres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un problème mélange kilomètres et mètres, il faut convertir.",
          "On convertit les kilomètres en mètres puis on additionne.",
          `${km} km = ${km * 1000} m. Donc ${km * 1000} + ${metres} = ${total}.`,
          `La distance totale est ${total} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_defi_tpl_2_comparer_trajets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Convertis tout en mètres pour comparer.",
    tags: ["cm2", "longueur", "defi", "comparer", "reunion", "template"],
    generate: () => {
      const km = randomChoice([2, 3, 4]);
      const extra = randomChoice([100, 300, 600]);
      const trajetA = km * 1000;
      const trajetB = trajetA + extra;

      return {
        text: `À La Réunion, le trajet A mesure ${km} km. Le trajet B mesure ${trajetB} m. Quel trajet est le plus long ?`,
        format: "qcm",
        choices: ["trajet A", "trajet B", "ils sont égaux"],
        expected: ["trajet B"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux trajets, on les exprime dans la même unité.",
          "On convertit les kilomètres en mètres.",
          `${km} km = ${trajetA} m. Or ${trajetB} m est plus grand que ${trajetA} m.`,
          "Le trajet B est le plus long."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_longueur_defi_tpl_3_margouillats_file",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Multiplie la longueur d’un margouillat par le nombre de margouillats.",
    tags: ["cm2", "longueur", "defi", "reunion", "margouillat", "multiplication", "template"],
    generate: () => {
      const longueur = randomChoice([10, 12, 15]);
      const nombre = randomChoice([6, 8, 10, 12]);
      const totalCm = longueur * nombre;
      const totalM = totalCm / 100;

      return {
        text: `Un margouillat mesure environ ${longueur} cm. Si ${nombre} margouillats se mettent bout à bout, quelle longueur totale cela fait-il en cm ?`,
        format: "short",
        expected: [String(totalCm)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi de longueur peut utiliser une multiplication.",
          "On multiplie la longueur d’un objet par le nombre d’objets.",
          `${longueur} × ${nombre} = ${totalCm} cm.`,
          `La longueur totale est ${totalCm} cm, soit ${formatNumber(totalM)} m.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_longueur_defi_fixed_2_erreur_addition_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 2 km + 300 m et répond 302 m. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut convertir 2 km en mètres.",
    explanation: exp(
      "On ne peut pas additionner correctement des longueurs si les unités sont mélangées.",
      "On convertit d’abord les kilomètres en mètres.",
      "2 km = 2 000 m. Donc 2 000 m + 300 m = 2 300 m.",
      "L’élève a tort : la réponse est 2 300 m."
    ),
    tags: ["cm2", "longueur", "defi", "erreur", "conversion", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_longueur_defi_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème avec plusieurs unités de longueur.",
    format: "open",
    expected: ["convertir", "même", "unité", "calcul"],
    comparator: "contains_keyword",
    hint: "Avant de calculer, il faut souvent convertir.",
    explanation: exp(
      "Un problème de longueurs peut mélanger plusieurs unités.",
      "On choisit une unité commune, puis on convertit toutes les longueurs dans cette unité.",
      "Par exemple, pour calculer 2 km + 300 m, on écrit 2 km = 2 000 m, puis on calcule 2 000 + 300.",
      "La méthode est : convertir dans la même unité, puis calculer."
    ),
    tags: ["cm2", "longueur", "defi", "open", "methode"],
  },
];