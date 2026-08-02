// lib/tutor-v4/question-banks/maths/cm1/calcul.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
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
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const calculBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 248 + 136 ?",
    format: "qcm",
    choices: ["384","374","394","386"],
    expected: ["384"],
    comparator: "mcq_exact",
    hint: "Pose l'addition et n'oublie pas la retenue.",
    explanation: "8 + 6 = 14 (je pose 4, je retiens 1) ; 4 + 3 + 1 = 8 ; 2 + 1 = 3. Résultat : 384.",
    tags: ["cm1","calcul","calcul_addition_posee","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 405 − 178 ?",
    format: "qcm",
    choices: ["227","237","217","327"],
    expected: ["227"],
    comparator: "mcq_exact",
    hint: "Pose la soustraction en alignant les chiffres.",
    explanation: "405 − 178 = 227. On vérifie : 178 + 227 = 405.",
    tags: ["cm1","calcul","calcul_soustraction_posee","guide","qcm"],
  },

    // ============================================================
  // CALCUL_MENTAL
  // Calculer mentalement
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_001_double_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 18 + 18",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "18 + 18, c’est le double de 18.",
    explanation: exp(
      "Calculer mentalement, c’est utiliser une stratégie rapide sans poser l’opération.",
      "Ici, on reconnaît un double.",
      "18 + 18 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "calcul", "mental", "double", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_002_complement_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 64 pour obtenir 100 ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Cherche le complément à 100.",
    explanation: exp(
      "Un complément à 100 est le nombre qu’il faut ajouter pour arriver à 100.",
      "On peut calculer 100 - 64.",
      "100 - 64 = 36.",
      "Il faut ajouter 36."
    ),
    tags: ["cm1", "calcul", "mental", "complement_100", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_003_qcm_strategie_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle stratégie est pratique pour calculer 28 × 5 ?",
    format: "qcm",
    choices: [
      "faire 28 × 10 puis diviser par 2",
      "faire 28 + 5",
      "faire 28 - 5",
      "faire 28 ÷ 5",
    ],
    expected: ["faire 28 × 10 puis diviser par 2"],
    comparator: "mcq_exact",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation: exp(
      "Multiplier par 5 peut se faire avec une stratégie rapide.",
      "On multiplie par 10 puis on prend la moitié.",
      "28 × 10 = 280, puis la moitié de 280 est 140.",
      "La stratégie correcte est : faire 28 × 10 puis diviser par 2."
    ),
    tags: ["cm1", "calcul", "mental", "strategie", "par_5", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_004_erreur_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que 43 × 10 = 4300. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 ajoute un seul zéro pour un entier.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "Pour un entier, on écrit un zéro à droite.",
      "43 × 10 = 430, et non 4300.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "calcul", "mental", "erreur", "par_10", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_open_001_strategie_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une stratégie pour calculer mentalement 32 × 5.",
    format: "open",
    expected: ["10", "moitié", "32", "160"],
    comparator: "contains_keyword",
    hint: "Tu peux passer par 32 × 10.",
    explanation: exp(
      "Multiplier par 5 peut se faire avec une stratégie.",
      "On peut multiplier par 10 puis prendre la moitié.",
      "32 × 10 = 320, puis la moitié de 320 est 160.",
      "Donc 32 × 5 = 160."
    ),
    tags: ["cm1", "calcul", "mental", "open", "strategie", "par_5", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_open_002_soustraction_proche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une stratégie pour calculer mentalement 92 - 39.",
    format: "open",
    expected: ["40", "1", "92", "53"],
    comparator: "contains_keyword",
    hint: "Tu peux enlever 40 puis rajouter 1.",
    explanation: exp(
      "Pour soustraire mentalement, on peut utiliser un nombre proche.",
      "Enlever 39, c’est enlever 40 puis rajouter 1.",
      "92 - 40 = 52, puis 52 + 1 = 53.",
      "Donc 92 - 39 = 53."
    ),
    tags: ["cm1", "calcul", "mental", "open", "soustraction", "strategie", "fixed"],
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_001_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Le double, c’est le nombre ajouté à lui-même.",
    tags: ["cm1", "calcul", "mental", "double", "template"],
    generate: () => {
      const n = randomInt(12, 49);
      const result = n * 2;

      return {
        text: `Calcule mentalement le double de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le double d’un nombre correspond à deux fois ce nombre.",
          "On peut calculer le nombre ajouté à lui-même.",
          `${n} + ${n} = ${result}.`,
          `Le double de ${n} est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_002_moitie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "La moitié, c’est partager en deux parts égales.",
    tags: ["cm1", "calcul", "mental", "moitie", "template"],
    generate: () => {
      const half = randomInt(10, 45);
      const n = half * 2;

      return {
        text: `Calcule mentalement la moitié de ${n}.`,
        format: "short",
        expected: [String(half)],
        comparator: "number_equal",
        explanation: exp(
          "La moitié d’un nombre est le résultat d’un partage en deux parts égales.",
          "On divise le nombre par 2.",
          `${n} ÷ 2 = ${half}.`,
          `La moitié de ${n} est ${half}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_003_complement_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien il manque pour arriver à 100.",
    tags: ["cm1", "calcul", "mental", "complement_100", "template"],
    generate: () => {
      const n = randomChoice([15, 20, 25, 35, 40, 45, 55, 60, 65, 75, 80, 85]);
      const result = 100 - n;

      return {
        text: `Quel nombre faut-il ajouter à ${n} pour obtenir 100 ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un complément à 100 est le nombre qu’il faut ajouter pour atteindre 100.",
          "On calcule la différence avec 100.",
          `100 - ${n} = ${result}.`,
          `Il faut ajouter ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_004_complement_100_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne mentalement pour atteindre 100.",
    tags: ["cm1", "calcul", "mental", "complement_100", "qcm", "template"],
    generate: () => {
      const n = randomChoice([28, 36, 47, 52, 68, 74, 83]);
      const result = 100 - n;

      return {
        text: `Quel complément permet d’obtenir 100 ? ${n} + ? = 100`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(result + 10),
          String(Math.max(1, result - 10)),
          String(n),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un complément à 100 complète un nombre pour obtenir 100.",
          "On cherche ce qu’il manque à 100.",
          `100 - ${n} = ${result}.`,
          `Le complément est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_005_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 10 revient à écrire un zéro à droite.",
    tags: ["cm1", "calcul", "mental", "par_10", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const result = n * 10;

      return {
        text: `Calcule : ${n} × 10`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 rend un nombre 10 fois plus grand.",
          "Pour un entier, on écrit un zéro à droite.",
          `${n} × 10 = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_006_par_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un entier, multiplier par 100 revient à écrire deux zéros à droite.",
    tags: ["cm1", "calcul", "mental", "par_100", "template"],
    generate: () => {
      const n = randomInt(2, 99);
      const result = n * 100;

      return {
        text: `Calcule : ${n} × 100`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 100 rend un nombre 100 fois plus grand.",
          "Pour un entier, on écrit deux zéros à droite.",
          `${n} × 100 = ${result}.`,
          `La réponse est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_007_erreur_par_10_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 10 ajoute un seul zéro pour un entier.",
    tags: ["cm1", "calcul", "mental", "par_10", "erreur", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const wrong = n * 100;
      const correct = n * 10;

      return {
        text: `Un élève dit que ${n} × 10 = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10 rend le nombre 10 fois plus grand.",
          "Pour un entier, cela revient à écrire un zéro à droite.",
          `${n} × 10 = ${correct}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_008_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.",
    tags: ["cm1", "calcul", "mental", "par_5", "template"],
    generate: () => {
      const n = randomChoice([12, 14, 16, 18, 22, 24, 26, 28, 32, 34, 36, 38]);
      const result = n * 5;

      return {
        text: `Calcule mentalement : ${n} × 5`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 5 peut se faire en passant par ×10.",
          "On multiplie par 10 puis on prend la moitié.",
          `${n} × 10 = ${n * 10}, puis la moitié de ${n * 10} est ${result}.`,
          `Donc ${n} × 5 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_009_par_9",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 9, c’est faire ×10 puis enlever le nombre.",
    tags: ["cm1", "calcul", "mental", "par_9", "template"],
    generate: () => {
      const n = randomInt(11, 39);
      const result = n * 9;

      return {
        text: `Calcule mentalement : ${n} × 9`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 9 peut se faire à partir de ×10.",
          "On multiplie par 10 puis on enlève une fois le nombre.",
          `${n} × 10 = ${n * 10}, puis ${n * 10} - ${n} = ${result}.`,
          `Donc ${n} × 9 = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_010_addition_decomposition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose le deuxième nombre en dizaines et unités.",
    tags: ["cm1", "calcul", "mental", "addition", "decomposition", "template"],
    generate: () => {
      const a = randomInt(20, 69);
      const dizaines = randomChoice([20, 30, 40]);
      const unites = randomInt(1, 9);
      const b = dizaines + unites;
      const result = a + b;

      return {
        text: `Calcule mentalement : ${a} + ${b}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Décomposer un nombre peut faciliter l’addition mentale.",
          `On peut écrire ${b} = ${dizaines} + ${unites}.`,
          `${a} + ${dizaines} = ${a + dizaines}, puis ${a + dizaines} + ${unites} = ${result}.`,
          `Donc ${a} + ${b} = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_011_soustraction_proche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlever 29, c’est enlever 30 puis rajouter 1.",
    tags: ["cm1", "calcul", "mental", "soustraction", "strategie", "template"],
    generate: () => {
      const a = randomInt(60, 99);
      const b = randomChoice([19, 29, 39, 49]);
      const proche = b + 1;
      const result = a - b;

      return {
        text: `Calcule mentalement : ${a} - ${b}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire mentalement, on peut utiliser un nombre proche plus simple.",
          `Enlever ${b}, c’est enlever ${proche} puis rajouter 1.`,
          `${a} - ${proche} = ${a - proche}, puis ${a - proche} + 1 = ${result}.`,
          `Donc ${a} - ${b} = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_012_qcm_choisir_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la méthode la plus rapide.",
    tags: ["cm1", "calcul", "mental", "strategie", "qcm", "template"],
    generate: () => {
      const n = randomChoice([22, 24, 26, 28, 32, 34, 36]);
      const correct = `faire ${n} × 10 puis diviser par 2`;

      return {
        text: `Quelle stratégie est pratique pour calculer ${n} × 5 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `faire ${n} + 5`,
          `faire ${n} - 5`,
          `faire ${n} ÷ 5`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 5 peut se faire rapidement.",
          "On peut multiplier par 10 puis prendre la moitié.",
          `${n} × 10 = ${n * 10}, puis la moitié de ${n * 10} est ${n * 5}.`,
          `La stratégie efficace est : ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_013_erreur_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie avec la stratégie ×10 puis moitié.",
    tags: ["cm1", "calcul", "mental", "erreur", "par_5", "template", "qcm"],
    generate: () => {
      const n = randomChoice([18, 24, 26, 32, 34, 38]);
      const correctResult = n * 5;
      const wrongResult = correctResult - randomChoice([5, 10, 15]);

      return {
        text: `Un élève dit que ${n} × 5 = ${wrongResult}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour vérifier une multiplication par 5, on peut passer par ×10.",
          "On multiplie par 10 puis on prend la moitié.",
          `${n} × 10 = ${n * 10}, puis la moitié est ${correctResult}.`,
          `Donc ${n} × 5 = ${correctResult}, et non ${wrongResult}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_014_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "reunion",
    hint: "Même prix répété plusieurs fois : on multiplie.",
    tags: ["cm1", "calcul", "mental", "reunion", "marche", "template"],
    generate: () => {
      const prix = randomChoice([3, 4, 5, 6, 8]);
      const quantite = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = prix * quantite;

      return {
        text: `Au marché de Saint-Pierre, un sachet coûte ${prix} €. Combien coûtent ${quantite} sachets ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un même prix est répété plusieurs fois, on utilise une multiplication.",
          "On multiplie le prix d’un sachet par le nombre de sachets.",
          `${prix} × ${quantite} = ${total}.`,
          `Les ${quantite} sachets coûtent ${total} € en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_mental_tpl_015_reunion_ecologie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque groupe ramasse la même quantité.",
    tags: ["cm1", "calcul", "mental", "reunion", "ecologie", "template"],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6]);
      const dechets = randomChoice([8, 10, 12, 15]);
      const total = groupes * dechets;

      return {
        text: `Sur une plage de La Réunion, ${groupes} groupes ramassent chacun ${dechets} déchets. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand plusieurs groupes ont la même quantité, on peut multiplier.",
          "On multiplie le nombre de groupes par le nombre de déchets par groupe.",
          `${groupes} × ${dechets} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
      };
    },
  },
    // ============================================================
  // CALCUL_ADDITION_POSEE
  // Poser une addition
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une addition posée, pourquoi faut-il aligner les unités sous les unités, les dizaines sous les dizaines ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour écrire plus vite",
      "pour éviter les retenues",
      "pour changer l’ordre des nombres",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position.",
    explanation: exp(
      "Une addition posée organise les nombres en colonnes.",
      "On aligne les chiffres de même rang : unités, dizaines, centaines.",
      "Cela permet d’additionner les unités avec les unités, les dizaines avec les dizaines.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["248", "37"],
      result: "285",
      questionLabel: "Observe l’alignement des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "addition_posee", "methode", "qcm", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 124 + 253.",
    format: "short",
    expected: ["377"],
    comparator: "number_equal",
    hint: "Pose l’addition en alignant les unités, les dizaines et les centaines.",
    explanation: exp(
      "Une addition posée permet d’additionner les nombres colonne par colonne.",
      "On aligne les unités, les dizaines et les centaines.",
      "124 + 253 = 377.",
      "Le résultat est 377."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["124", "253"],
      result: "377",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "addition_posee", "modele", "short", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_open_001_erreur_alignement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 248 + 37 mais il écrit le 37 sous le 248 sans aligner les unités. Explique pourquoi son résultat risque d’être faux.",
    format: "open",
    expected: ["unités", "dizaines", "aligner", "colonnes", "rang"],
    comparator: "contains_keyword",
    hint: "Regarde où doivent être placés le 7 et le 3.",
    explanation: exp(
      "Dans une addition posée, chaque chiffre doit être placé selon son rang.",
      "On aligne les unités avec les unités et les dizaines avec les dizaines.",
      "Dans 248 + 37, le 7 doit être sous le 8 et le 3 sous le 4.",
      "Si les chiffres ne sont pas alignés, on additionne des rangs différents et le résultat peut être faux."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Attention à l’alignement",
      numbers: ["248", "37"],
      result: "285",
      questionLabel: "Le 7 doit être sous les unités.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "addition_posee", "open", "erreur", "alignement", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_001_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne colonne par colonne.",
    tags: ["cm1", "calcul", "addition_posee", "sans_retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [123, 254],
        [312, 146],
        [421, 238],
        [503, 264],
        [615, 172],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une addition posée permet d’additionner les nombres par colonnes.",
          "On aligne les unités, dizaines et centaines.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_002_avec_retenue_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Si la somme des unités dépasse 9, il y a une retenue.",
    tags: ["cm1", "calcul", "addition_posee", "retenue", "unites", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [247, 136],
        [358, 124],
        [469, 215],
        [576, 218],
        [684, 129],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une retenue apparaît quand une colonne dépasse 9.",
          "On additionne les unités, puis les dizaines, puis les centaines en reportant la retenue si nécessaire.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition avec retenue",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention à la retenue.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_003_avec_retenues",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Il peut y avoir plusieurs retenues.",
    tags: ["cm1", "calcul", "addition_posee", "retenues", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [487, 356],
        [596, 287],
        [678, 245],
        [749, 186],
        [865, 278],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une addition posée, plusieurs colonnes peuvent produire une retenue.",
          "On additionne chaque colonne en reportant les retenues au bon rang.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition avec retenues",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "N’oublie pas les retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_004_nombre_de_chiffres_differents",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Aligne toujours les unités sous les unités.",
    tags: ["cm1", "calcul", "addition_posee", "alignement", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [248, 37],
        [506, 78],
        [732, 49],
        [615, 86],
        [904, 57],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Quand les nombres n’ont pas le même nombre de chiffres, l’alignement est très important.",
          "On aligne les unités sous les unités, puis les dizaines sous les dizaines.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition — alignement",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Aligne les unités.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_005_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose l’addition ou calcule colonne par colonne.",
    tags: ["cm1", "calcul", "addition_posee", "qcm", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [236, 157],
        [428, 276],
        [519, 384],
        [674, 128],
        [785, 246],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;
      const correct = String(result);

      return {
        text: `Quel est le résultat de ${a} + ${b} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(result + 10),
          String(result - 10),
          String(result + 100),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le résultat, on peut poser l’addition.",
          "On additionne les chiffres de même rang.",
          `${a} + ${b} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_006_erreur_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’addition colonne par colonne.",
    tags: ["cm1", "calcul", "addition_posee", "erreur", "qcm", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [248, 137],
        [359, 264],
        [486, 275],
        [572, 349],
        [684, 287],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;
      const wrong = result + randomChoice([-10, 10, -100, 100]);

      return {
        text: `Un élève affirme que ${a} + ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une addition permet de repérer une erreur.",
          "On peut refaire l’addition colonne par colonne.",
          `${a} + ${b} = ${result}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Vérifier une addition",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Vérifie le calcul annoncé.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_007_open_probleme_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux quantités et écris une phrase-réponse.",
    tags: ["cm1", "calcul", "addition_posee", "open", "probleme", "reunion", "template"],
    generate: () => {
      const a = randomChoice([128, 245, 376, 489]);
      const b = randomChoice([57, 86, 138, 249]);
      const total = a + b;

      return {
        text: `Pendant une sortie à La Réunion, une classe observe ${a} plantes le matin et ${b} plantes l’après-midi. Explique comment trouver le nombre total de plantes observées.`,
        format: "open",
        expected: [String(a), String(b), "addition", "total", String(total)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un problème de total, on utilise souvent une addition.",
          "On additionne les plantes observées le matin et l’après-midi.",
          `${a} + ${b} = ${total}.`,
          `La classe a observé ${total} plantes au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_008_open_demarche_alignement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique l’importance des colonnes.",
    tags: ["cm1", "calcul", "addition_posee", "open", "demarche", "alignement", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [248, 37],
        [506, 78],
        [732, 49],
        [615, 86],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Explique comment poser correctement l’addition ${a} + ${b}.`,
        format: "open",
        expected: ["unités", "dizaines", "aligner", "colonnes", String(result)],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour poser une addition, il faut respecter le rang des chiffres.",
          "On aligne les unités sous les unités, les dizaines sous les dizaines, les centaines sous les centaines.",
          `${a} + ${b} = ${result}.`,
          "Une bonne présentation aide à éviter les erreurs."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition posée",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Explique l’alignement.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_009_open_erreur_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Une retenue oubliée change la colonne suivante.",
    tags: ["cm1", "calcul", "addition_posee", "open", "erreur", "retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [287, 156],
        [458, 276],
        [679, 184],
        [596, 327],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a + b;

      return {
        text: `Un élève pose ${a} + ${b}, mais il oublie une retenue. Explique pourquoi son résultat peut être faux.`,
        format: "open",
        expected: ["retenue", "colonne", "dizaines", "centaines", String(result)],
        comparator: "contains_keyword",
        explanation: exp(
          "Une retenue doit être reportée dans la colonne suivante.",
          "Si elle est oubliée, la colonne suivante est mal calculée.",
          `${a} + ${b} = ${result}.`,
          "Oublier une retenue peut donc changer le résultat final."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition avec retenue",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_010_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les deux prix.",
    tags: ["cm1", "calcul", "addition_posee", "reunion", "marche", "template", "canvas"],
    generate: () => {
      const a = randomChoice([125, 238, 345, 456]);
      const b = randomChoice([67, 128, 246, 389]);
      const total = a + b;

      return {
        text: `Au marché de Saint-Pierre, une famille dépense ${a} € sur un stand et ${b} € sur un autre stand. Combien dépense-t-elle au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver une dépense totale, on additionne les dépenses.",
          "On peut poser l’addition pour éviter les erreurs.",
          `${a} + ${b} = ${total}.`,
          `La famille dépense ${total} € au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition — marché",
          numbers: [String(a), String(b)],
          result: String(total),
          questionLabel: "On cherche le total.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_addition_posee_tpl_011_probleme_trois_nombres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les trois nombres.",
    tags: ["cm1", "calcul", "addition_posee", "probleme", "trois_nombres", "template", "canvas"],
    generate: () => {
      const a = randomChoice([125, 236, 347]);
      const b = randomChoice([58, 124, 216]);
      const c = randomChoice([37, 86, 149]);
      const total = a + b + c;

      return {
        text: `Une école reçoit ${a} cahiers, puis ${b} cahiers, puis encore ${c} cahiers. Combien de cahiers reçoit-elle au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver un total avec plusieurs arrivées, on additionne toutes les quantités.",
          "On peut poser l’addition avec les trois nombres.",
          `${a} + ${b} + ${c} = ${total}.`,
          `L’école reçoit ${total} cahiers au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition de trois nombres",
          numbers: [String(a), String(b), String(c)],
          result: String(total),
          questionLabel: "Additionne les trois quantités.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // CALCUL_SOUSTRACTION_POSEE
  // Poser une soustraction
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une soustraction posée, pourquoi faut-il aligner les unités sous les unités et les dizaines sous les dizaines ?",
    format: "qcm",
    choices: [
      "pour soustraire les chiffres de même rang",
      "pour écrire moins de chiffres",
      "pour éviter de calculer",
      "pour changer le plus grand nombre",
    ],
    expected: ["pour soustraire les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position.",
    explanation: exp(
      "Une soustraction posée organise les nombres en colonnes.",
      "On aligne les chiffres de même rang : unités, dizaines, centaines.",
      "Cela permet de soustraire les unités avec les unités, les dizaines avec les dizaines.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["384", "126"],
      result: "258",
      questionLabel: "Observe l’alignement des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "soustraction_posee", "methode", "qcm", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 486 - 253.",
    format: "short",
    expected: ["233"],
    comparator: "number_equal",
    hint: "Pose la soustraction en alignant les unités, les dizaines et les centaines.",
    explanation: exp(
      "Une soustraction posée permet de soustraire les nombres colonne par colonne.",
      "On aligne les unités, les dizaines et les centaines.",
      "486 - 253 = 233.",
      "Le résultat est 233."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["486", "253"],
      result: "233",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "soustraction_posee", "modele", "short", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_open_001_erreur_alignement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 506 - 78 mais il n’aligne pas les unités. Explique pourquoi son résultat risque d’être faux.",
    format: "open",
    expected: ["unités", "dizaines", "aligner", "colonnes", "rang"],
    comparator: "contains_keyword",
    hint: "Regarde où doivent être placés le 8 et le 7.",
    explanation: exp(
      "Dans une soustraction posée, chaque chiffre doit être placé selon son rang.",
      "On aligne les unités avec les unités et les dizaines avec les dizaines.",
      "Dans 506 - 78, le 8 doit être sous le 6 et le 7 sous le 0.",
      "Si les chiffres ne sont pas alignés, on soustrait des rangs différents et le résultat peut être faux."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Attention à l’alignement",
      numbers: ["506", "78"],
      result: "428",
      questionLabel: "Le 8 doit être sous les unités.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "soustraction_posee", "open", "erreur", "alignement", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_001_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustrais colonne par colonne.",
    tags: ["cm1", "calcul", "soustraction_posee", "sans_retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [486, 253],
        [759, 326],
        [684, 241],
        [975, 432],
        [867, 315],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une soustraction posée permet de soustraire les nombres par colonnes.",
          "On aligne les unités, dizaines et centaines.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_002_avec_retenue_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Si on ne peut pas soustraire dans une colonne, il faut échanger une dizaine.",
    tags: ["cm1", "calcul", "soustraction_posee", "retenue", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [532, 218],
        [746, 329],
        [851, 437],
        [964, 548],
        [673, 259],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une soustraction posée, il faut parfois faire un échange.",
          "Si les unités du haut sont trop petites, on échange une dizaine contre 10 unités.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction avec échange",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention à l’échange.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_003_zeros",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Les zéros demandent souvent des échanges successifs.",
    tags: ["cm1", "calcul", "soustraction_posee", "zero", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [506, 78],
        [700, 245],
        [804, 359],
        [900, 486],
        [1000, 527],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une soustraction avec des zéros demande de bien gérer les échanges.",
          "On échange une centaine ou une dizaine quand la colonne ne permet pas de soustraire directement.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction avec zéros",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux échanges.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_004_nombre_de_chiffres_differents",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Aligne toujours les unités sous les unités.",
    tags: ["cm1", "calcul", "soustraction_posee", "alignement", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [506, 78],
        [732, 49],
        [615, 86],
        [904, 57],
        [830, 95],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Quand les nombres n’ont pas le même nombre de chiffres, l’alignement est très important.",
          "On aligne les unités sous les unités, puis les dizaines sous les dizaines.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — alignement",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Aligne les unités.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_005_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la soustraction ou calcule colonne par colonne.",
    tags: ["cm1", "calcul", "soustraction_posee", "qcm", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [684, 257],
        [728, 349],
        [905, 468],
        [846, 278],
        [1000, 375],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;
      const correct = String(result);

      return {
        text: `Quel est le résultat de ${a} - ${b} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(result + 10),
          String(Math.max(0, result - 10)),
          String(result + 100),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le résultat, on peut poser la soustraction.",
          "On soustrait les chiffres de même rang.",
          `${a} - ${b} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_006_erreur_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie la soustraction colonne par colonne.",
    tags: ["cm1", "calcul", "soustraction_posee", "erreur", "qcm", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [532, 218],
        [746, 329],
        [851, 437],
        [964, 548],
        [700, 245],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;
      const wrong = result + randomChoice([-10, 10, -100, 100]);

      return {
        text: `Un élève affirme que ${a} - ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une soustraction permet de repérer une erreur.",
          "On peut refaire la soustraction colonne par colonne.",
          `${a} - ${b} = ${result}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Vérifier une soustraction",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Vérifie le calcul annoncé.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_007_open_probleme_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "On cherche ce qui reste.",
    tags: ["cm1", "calcul", "soustraction_posee", "open", "probleme", "reunion", "template"],
    generate: () => {
      const total = randomChoice([245, 368, 472, 586]);
      const vendus = randomChoice([57, 86, 128, 249]);
      const reste = total - vendus;

      return {
        text: `Au marché de Saint-Pierre, un vendeur avait ${total} fruits. Il en vend ${vendus}. Explique comment trouver combien de fruits il lui reste.`,
        format: "open",
        expected: [String(total), String(vendus), "soustraction", "reste", String(reste)],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche ce qui reste après un retrait, on utilise une soustraction.",
          "On soustrait les fruits vendus au nombre de fruits du départ.",
          `${total} - ${vendus} = ${reste}.`,
          `Il reste ${reste} fruits.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_008_open_demarche_alignement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique l’importance des colonnes.",
    tags: ["cm1", "calcul", "soustraction_posee", "open", "demarche", "alignement", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [506, 78],
        [732, 49],
        [615, 86],
        [904, 57],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Explique comment poser correctement la soustraction ${a} - ${b}.`,
        format: "open",
        expected: ["unités", "dizaines", "aligner", "colonnes", String(result)],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour poser une soustraction, il faut respecter le rang des chiffres.",
          "On aligne les unités sous les unités, les dizaines sous les dizaines, les centaines sous les centaines.",
          `${a} - ${b} = ${result}.`,
          "Une bonne présentation aide à éviter les erreurs."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction posée",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Explique l’alignement.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_009_open_erreur_echange",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Si on ne peut pas soustraire dans une colonne, il faut faire un échange.",
    tags: ["cm1", "calcul", "soustraction_posee", "open", "erreur", "echange", "template", "canvas"],
    generate: () => {
      const pairs: [number, number][] = [
        [532, 218],
        [746, 329],
        [851, 437],
        [700, 245],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a - b;

      return {
        text: `Un élève pose ${a} - ${b}, mais il oublie de faire un échange. Explique pourquoi son résultat peut être faux.`,
        format: "open",
        expected: ["échange", "dizaine", "unité", "colonne", String(result)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une soustraction, un échange est parfois nécessaire.",
          "Si le chiffre du haut est trop petit dans une colonne, on échange une dizaine contre 10 unités, ou une centaine contre 10 dizaines.",
          `${a} - ${b} = ${result}.`,
          "Sans échange, certaines colonnes sont mal calculées."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction avec échange",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux échanges.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_010_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 3,
    theme: "reunion",
    hint: "On cherche l’écart entre les deux distances.",
    tags: ["cm1", "calcul", "soustraction_posee", "reunion", "distance", "template", "canvas"],
    generate: () => {
      const total = randomChoice([125, 238, 345, 456]);
      const parcouru = randomChoice([67, 128, 146, 189]);
      const reste = total - parcouru;

      return {
        text: `Une randonnée fait ${total} hm. Une classe a déjà parcouru ${parcouru} hm. Combien d’hectomètres reste-t-il à parcourir ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche ce qui reste, on utilise une soustraction.",
          "On soustrait la distance déjà parcourue à la distance totale.",
          `${total} - ${parcouru} = ${reste}.`,
          `Il reste ${reste} hm à parcourir.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — randonnée",
          numbers: [String(total), String(parcouru)],
          result: String(reste),
          questionLabel: "On cherche ce qui reste.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_soustraction_posee_tpl_011_comparer_ecart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour trouver un écart, on soustrait le plus petit nombre au plus grand.",
    tags: ["cm1", "calcul", "soustraction_posee", "ecart", "template", "canvas"],
    generate: () => {
      const a = randomChoice([625, 742, 856, 934]);
      const b = randomChoice([258, 376, 489, 517]);
      const ecart = a - b;

      return {
        text: `Une école A a ${a} livres et une école B a ${b} livres. Combien de livres l’école A a-t-elle de plus ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver combien il y a de plus, on calcule un écart.",
          "On soustrait le plus petit nombre au plus grand.",
          `${a} - ${b} = ${ecart}.`,
          `L’école A a ${ecart} livres de plus.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — écart",
          numbers: [String(a), String(b)],
          result: String(ecart),
          questionLabel: "On cherche l’écart.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // CALCUL_MULTIPLICATION_POSEE
  // Poser une multiplication simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_multiplication_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour éviter de connaître les tables",
      "pour changer le résultat",
      "pour écrire moins de lignes",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Les unités, dizaines et centaines n’ont pas la même valeur.",
    explanation: exp(
      "Une multiplication posée organise le calcul en colonnes.",
      "On respecte le rang des chiffres : unités, dizaines, centaines.",
      "Cela évite de mélanger les valeurs des chiffres.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
      questionLabel: "Observe le rang des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_multiplication_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 123 × 3.",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Multiplie 3 par les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une multiplication posée permet de multiplier un nombre par étapes.",
      "On multiplie chaque chiffre du nombre du haut par le nombre du bas.",
      "123 × 3 = 369.",
      "Le résultat est 369."
    ),
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["123", "3"],
      result: "369",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_multiplication_posee_open_001_erreur_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 mais oublie une retenue. Explique pourquoi son résultat risque d’être faux.",
    format: "open",
    expected: ["retenue", "colonne", "reporter", "multiplier", "résultat"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change la colonne suivante.",
    explanation: exp(
      "Dans une multiplication posée, une retenue doit être reportée dans la colonne suivante.",
      "On multiplie colonne par colonne et on ajoute les retenues au bon moment.",
      "Si une retenue est oubliée, une colonne est mal calculée.",
      "Le résultat final peut donc être faux."
    ),
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "open",
      "erreur",
      "retenue",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_001_un_chiffre_sans_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "sans_retenue",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [112, 2],
        [123, 3],
        [211, 4],
        [221, 3],
        [312, 2],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée permet de calculer en colonnes.",
          "On multiplie chaque chiffre du nombre par le chiffre du bas.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_002_un_chiffre_avec_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie colonne par colonne et pense aux retenues.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "retenue",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [247, 4],
        [358, 3],
        [469, 5],
        [576, 4],
        [684, 6],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une multiplication posée peut nécessiter des retenues.",
          "On multiplie chaque colonne et on reporte les retenues.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec retenues",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_003_avec_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro est un chiffre : il garde sa place.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "zero",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [204, 3],
        [305, 5],
        [406, 4],
        [507, 6],
        [608, 3],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication posée, chaque chiffre compte, même le zéro.",
          "On multiplie chaque chiffre en respectant son rang.",
          `${a} × ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec zéro",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Le zéro garde son rang.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_004_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la multiplication ou vérifie avec une estimation.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [126, 4],
        [234, 3],
        [315, 5],
        [428, 4],
        [536, 3],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;
      const correct = String(result);

      return {
        text: `Quel est le résultat de ${a} × ${b} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(result + 10),
          String(Math.max(0, result - 10)),
          String(result + 100),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le résultat, on peut poser la multiplication.",
          "On multiplie chaque colonne en pensant aux retenues.",
          `${a} × ${b} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication posée",
          numbers: [String(a), String(b)],
          result: String(result),
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_005_erreur_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais la multiplication ou estime le résultat.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "erreur",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [126, 4],
        [234, 5],
        [315, 4],
        [428, 3],
        [506, 6],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;
      const wrong = result + randomChoice([-20, 20, -100, 100]);

      return {
        text: `Un élève affirme que ${a} × ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une multiplication permet de repérer une erreur.",
          "On peut refaire le calcul ou estimer le résultat.",
          `${a} × ${b} = ${result}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Vérifier une multiplication",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Vérifie le calcul annoncé.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_006_estimation_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Arrondis le premier nombre pour obtenir un ordre de grandeur.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "estimation",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([198, 203, 297, 402, 498]);
      const b = randomChoice([3, 4, 5, 6]);
      const rounded = Math.round(a / 100) * 100;
      const approx = rounded * b;

      return {
        text: `Avant de calculer exactement ${a} × ${b}, quel ordre de grandeur est raisonnable ?`,
        format: "qcm",
        choices: makeChoices(`environ ${approx}`, [
          `environ ${approx + 1000}`,
          "environ 20",
          `environ ${Math.max(0, approx - 1000)}`,
        ]),
        expected: [`environ ${approx}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation permet de vérifier si un résultat est raisonnable.",
          "On arrondit le nombre le plus compliqué.",
          `${a} est proche de ${rounded}, donc ${a} × ${b} est proche de ${rounded} × ${b} = ${approx}.`,
          `Un ordre de grandeur raisonnable est environ ${approx}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_007_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 3,
    theme: "reunion",
    hint: "Même quantité répétée plusieurs fois : on multiplie.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "probleme",
      "reunion",
      "template",
      "canvas",
    ],
    generate: () => {
      const sacs = randomChoice([12, 15, 18, 24]);
      const fruits = randomChoice([6, 8, 9]);
      const total = sacs * fruits;

      return {
        text: `Au marché de Saint-Pierre, il y a ${sacs} sacs contenant chacun ${fruits} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer des groupes égaux.",
          "On multiplie le nombre de sacs par le nombre de fruits dans chaque sac.",
          `${sacs} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Problème — marché",
          numbers: [String(sacs), String(fruits)],
          result: String(total),
          questionLabel: "On peut poser la multiplication.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_008_open_probleme_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Explique pourquoi on utilise une multiplication.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "open",
      "probleme",
      "reunion",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([12, 15, 18, 24]);
      const objets = randomChoice([6, 8, 9, 12]);
      const total = groupes * objets;

      return {
        text: `Pour une sortie à Mafate, on prépare ${groupes} sachets avec ${objets} biscuits dans chaque sachet. Explique comment trouver le nombre total de biscuits.`,
        format: "open",
        expected: [
          String(groupes),
          String(objets),
          "multiplication",
          "total",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand une même quantité est répétée plusieurs fois, on utilise une multiplication.",
          "On multiplie le nombre de sachets par le nombre de biscuits dans chaque sachet.",
          `${groupes} × ${objets} = ${total}.`,
          `Il y a ${total} biscuits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_009_open_demarche_posee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique les étapes : unités, dizaines, centaines, retenues.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "open",
      "demarche",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [247, 4],
        [358, 3],
        [469, 5],
        [576, 4],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;

      return {
        text: `Explique comment poser correctement la multiplication ${a} × ${b}.`,
        format: "open",
        expected: [
          "unités",
          "dizaines",
          "centaines",
          "retenue",
          String(result),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour poser une multiplication, on multiplie chaque chiffre en respectant son rang.",
          "On commence par les unités, puis les dizaines, puis les centaines, en reportant les retenues si nécessaire.",
          `${a} × ${b} = ${result}.`,
          "Une bonne méthode évite les erreurs de rang et de retenue."
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication posée",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Explique les étapes.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_010_open_erreur_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Le zéro garde sa place dans le nombre.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "open",
      "erreur",
      "zero",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [number, number][] = [
        [204, 3],
        [305, 5],
        [406, 4],
        [507, 6],
      ];

      const [a, b] = randomChoice(pairs);
      const result = a * b;

      return {
        text: `Un élève calcule ${a} × ${b} et oublie le zéro dans le nombre ${a}. Explique pourquoi son résultat risque d’être faux.`,
        format: "open",
        expected: ["zéro", "rang", "unités", "dizaines", String(result)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un nombre, le zéro peut garder une place importante.",
          "Si on oublie le zéro, on change la valeur du nombre.",
          `${a} × ${b} = ${result}.`,
          "Oublier le zéro peut donc changer complètement le calcul."
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec zéro",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Le zéro garde son rang.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_multiplication_posee_tpl_011_reunion_ecologie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Chaque groupe ramasse la même quantité.",
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "reunion",
      "ecologie",
      "template",
      "canvas",
    ],
    generate: () => {
      const groupes = randomChoice([12, 15, 18, 21]);
      const dechets = randomChoice([6, 8, 9, 12]);
      const total = groupes * dechets;

      return {
        text: `Sur une plage de La Réunion, ${groupes} groupes ramassent chacun ${dechets} déchets. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer le total de groupes égaux.",
          "On multiplie le nombre de groupes par le nombre de déchets par groupe.",
          `${groupes} × ${dechets} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Problème — écologie",
          numbers: [String(groupes), String(dechets)],
          result: String(total),
          questionLabel: "On peut poser la multiplication.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // CALCUL_DECIMAL_ADDITION
  // Additionner des nombres décimaux simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_addition_fixed_001_methode_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une addition posée avec des nombres décimaux, pourquoi faut-il aligner les virgules ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour écrire plus vite",
      "pour supprimer les décimaux",
      "pour éviter les zéros",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Les unités doivent être sous les unités, les dixièmes sous les dixièmes.",
    explanation: exp(
      "Dans un nombre décimal, chaque chiffre a une valeur selon sa position.",
      "Pour poser une addition de décimaux, on aligne les virgules.",
      "Ainsi, les unités sont sous les unités, les dixièmes sous les dixièmes, les centièmes sous les centièmes.",
      "Il faut donc aligner les virgules pour additionner les chiffres de même rang."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition décimale",
      numbers: ["12,4", "3,25"],
      result: "15,65",
      questionLabel: "Observe l’alignement des virgules.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "virgule",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_addition_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4,2 + 3,5.",
    format: "short",
    expected: ["7,7", "7.7"],
    comparator: "number_equal",
    hint: "Additionne les unités avec les unités et les dixièmes avec les dixièmes.",
    explanation: exp(
      "Additionner des nombres décimaux demande de respecter les rangs des chiffres.",
      "On aligne les virgules pour additionner les unités avec les unités et les dixièmes avec les dixièmes.",
      "4,2 + 3,5 = 7,7.",
      "Le résultat est 7,7."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition décimale",
      numbers: ["4,2", "3,5"],
      result: "7,7",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_addition_open_001_erreur_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 12,4 + 3,25 mais il n’aligne pas les virgules. Explique pourquoi son résultat risque d’être faux.",
    format: "open",
    expected: ["virgules", "unités", "dixièmes", "centièmes", "aligner"],
    comparator: "contains_keyword",
    hint: "Les chiffres de même rang doivent être dans la même colonne.",
    explanation: exp(
      "Dans une addition décimale, l’alignement des virgules est essentiel.",
      "Il permet de placer les unités sous les unités, les dixièmes sous les dixièmes et les centièmes sous les centièmes.",
      "Dans 12,4 + 3,25, on peut écrire 12,40 pour mieux aligner les centièmes.",
      "Si les virgules ne sont pas alignées, on mélange les rangs et le résultat peut être faux."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Attention aux virgules",
      numbers: ["12,4", "3,25"],
      result: "15,65",
      questionLabel: "Les virgules doivent être alignées.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "open",
      "erreur",
      "virgule",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_001_dixiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les unités puis les dixièmes.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "dixiemes",
      "template",
      "canvas",
    ],
    generate: () => {
      const aEntier = randomInt(1, 8);
      const bEntier = randomInt(1, 8);
      const aDixieme = randomInt(1, 8);
      const bDixieme = randomInt(1, 9 - aDixieme);

      const aText = `${aEntier},${aDixieme}`;
      const bText = `${bEntier},${bDixieme}`;
      const result = aEntier + bEntier + (aDixieme + bDixieme) / 10;
      const resultText = String(result).replace(".", ",");

      return {
        text: `Calcule : ${aText} + ${bText}.`,
        format: "short",
        expected: [resultText, resultText.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des décimaux, on aligne les virgules.",
          "On additionne les unités avec les unités et les dixièmes avec les dixièmes.",
          `${aText} + ${bText} = ${resultText}.`,
          `Le résultat est ${resultText}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition décimale",
          numbers: [aText, bText],
          result: resultText,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_002_dixiemes_retenue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Si les dixièmes dépassent 10 dixièmes, cela fait une unité de plus.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "dixiemes",
      "retenue",
      "template",
      "canvas",
    ],
    generate: () => {
      const aEntier = randomInt(1, 8);
      const bEntier = randomInt(1, 8);
      const aDixieme = randomChoice([6, 7, 8, 9]);
      const bDixieme = randomChoice([5, 6, 7, 8, 9]);

      const aText = `${aEntier},${aDixieme}`;
      const bText = `${bEntier},${bDixieme}`;
      const totalDixiemes = aDixieme + bDixieme;
      const result = aEntier + bEntier + totalDixiemes / 10;
      const resultText = String(Number(result.toFixed(1))).replace(".", ",");

      return {
        text: `Calcule : ${aText} + ${bText}.`,
        format: "short",
        expected: [resultText, resultText.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Dans une addition de décimaux, il peut y avoir une retenue.",
          "Si les dixièmes font 10 dixièmes ou plus, cela ajoute une unité.",
          `${aText} + ${bText} = ${resultText}.`,
          `Le résultat est ${resultText}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition décimale avec retenue",
          numbers: [aText, bText],
          result: resultText,
          questionLabel: "Attention aux dixièmes.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_003_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Aligne les virgules : les centièmes doivent être sous les centièmes.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "centiemes",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [string, string, string][] = [
        ["3,25", "2,14", "5,39"],
        ["4,32", "1,26", "5,58"],
        ["6,15", "2,24", "8,39"],
        ["5,43", "3,12", "8,55"],
        ["7,21", "1,36", "8,57"],
      ];

      const [a, b, result] = randomChoice(pairs);

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des nombres avec des centièmes, on aligne les virgules.",
          "On additionne les centièmes avec les centièmes, les dixièmes avec les dixièmes, puis les unités.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition de centièmes",
          numbers: [a, b],
          result,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_004_dixiemes_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux ajouter un zéro final : 4,2 = 4,20.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "zero_final",
      "virgule",
      "template",
      "canvas",
    ],
    generate: () => {
      const pairs: [string, string, string][] = [
        ["4,2", "3,15", "7,35"],
        ["6,5", "2,24", "8,74"],
        ["7,3", "1,42", "8,72"],
        ["2,8", "5,16", "7,96"],
        ["9,1", "3,27", "12,37"],
      ];

      const [a, b, result] = randomChoice(pairs);

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Quand les nombres n’ont pas le même nombre de chiffres après la virgule, on peut ajouter un zéro final.",
          "Ce zéro ne change pas la valeur mais aide à aligner les centièmes.",
          `${a} + ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition — virgules alignées",
          numbers: [a, b],
          result,
          questionLabel: "Tu peux ajouter un zéro final.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_005_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Pose l’addition en alignant les virgules.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string, string[]][] = [
        ["2,4", "3,25", "5,65", ["5,29", "56,5", "5,49"]],
        ["6,8", "1,35", "8,15", ["7,15", "8,05", "81,5"]],
        ["4,7", "2,18", "6,88", ["6,25", "6,78", "68,8"]],
        ["8,5", "3,42", "11,92", ["11,47", "12,92", "119,2"]],
      ];

      const [a, b, result, wrongs] = randomChoice(cases);

      return {
        text: `Quel est le résultat de ${a} + ${b} ?`,
        format: "qcm",
        choices: makeChoices(result, wrongs),
        expected: [result],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour additionner des décimaux, il faut aligner les virgules.",
          "On additionne les chiffres de même rang.",
          `${a} + ${b} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition décimale",
          numbers: [a, b],
          result,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_006_erreur_virgule_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’alignement des virgules.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "erreur",
      "virgule",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string, string][] = [
        ["12,4", "3,25", "15,65", "4,49"],
        ["8,6", "2,35", "10,95", "4,21"],
        ["15,7", "4,28", "19,98", "5,85"],
        ["9,5", "6,42", "15,92", "7,37"],
      ];

      const [a, b, result, wrong] = randomChoice(cases);

      return {
        text: `Un élève affirme que ${a} + ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur fréquente consiste à mal aligner les virgules.",
          "On doit additionner les unités avec les unités, les dixièmes avec les dixièmes, les centièmes avec les centièmes.",
          `${a} + ${b} = ${result}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Vérifier une addition décimale",
          numbers: [a, b],
          result,
          questionLabel: "Les virgules doivent être alignées.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_007_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "reunion",
    hint: "On additionne les deux distances.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "reunion",
      "distance",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["2,4", "1,3", "3,7"],
        ["3,2", "2,5", "5,7"],
        ["1,75", "2,40", "4,15"],
        ["4,60", "1,25", "5,85"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Pendant une randonnée à La Réunion, une classe parcourt ${a} km le matin puis ${b} km l’après-midi. Quelle distance parcourt-elle au total ?`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver une distance totale, on additionne les distances.",
          "On aligne les virgules pour additionner correctement.",
          `${a} + ${b} = ${result}.`,
          `La classe parcourt ${result} km au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition — randonnée",
          numbers: [a, b],
          result,
          questionLabel: "On cherche la distance totale.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_008_reunion_marche_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux prix.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "reunion",
      "prix",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["2,50", "1,20", "3,70"],
        ["3,75", "2,10", "5,85"],
        ["4,60", "1,35", "5,95"],
        ["5,25", "2,40", "7,65"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Au marché de Saint-Pierre, un fruit coûte ${a} € et un jus coûte ${b} €. Combien faut-il payer au total ?`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver le prix total, on additionne les deux prix.",
          "On aligne les virgules pour additionner les euros, les dixièmes et les centièmes.",
          `${a} + ${b} = ${result}.`,
          `Il faut payer ${result} € au total.`
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition — prix",
          numbers: [a, b],
          result,
          questionLabel: "On cherche le prix total.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_009_open_probleme_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "reunion",
    hint: "Explique pourquoi on additionne les distances.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "open",
      "probleme",
      "distance",
      "reunion",
      "template",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["2,40", "1,35", "3,75"],
        ["3,60", "2,25", "5,85"],
        ["1,75", "2,5", "4,25"],
        ["4,8", "1,15", "5,95"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Une classe marche ${a} km le matin puis ${b} km l’après-midi. Explique comment trouver la distance totale parcourue.`,
        format: "open",
        expected: [a, b, "addition", "virgules", result],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche une distance totale, on utilise une addition.",
          "On additionne les deux distances en alignant les virgules.",
          `${a} + ${b} = ${result}.`,
          `La distance totale est ${result} km.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_010_open_demarche_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique l’alignement des virgules et des rangs.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "open",
      "demarche",
      "virgule",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["12,4", "3,25", "15,65"],
        ["8,6", "2,35", "10,95"],
        ["15,7", "4,28", "19,98"],
        ["9,5", "6,42", "15,92"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Explique comment poser correctement l’addition ${a} + ${b}.`,
        format: "open",
        expected: [
          "virgules",
          "unités",
          "dixièmes",
          "centièmes",
          result,
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour poser une addition décimale, on aligne les virgules.",
          "Cela permet d’additionner les chiffres de même rang : unités, dixièmes, centièmes.",
          `${a} + ${b} = ${result}.`,
          "Une bonne présentation évite les erreurs de rang."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition décimale",
          numbers: [a, b],
          result,
          questionLabel: "Explique l’alignement des virgules.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_addition_tpl_011_open_erreur_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 5,
    theme: "neutral",
    hint: "Un zéro final peut aider à aligner les centièmes.",
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "open",
      "erreur",
      "zero_final",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["4,2", "3,15", "7,35"],
        ["6,5", "2,24", "8,74"],
        ["7,3", "1,42", "8,72"],
        ["2,8", "5,16", "7,96"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Un élève veut calculer ${a} + ${b}, mais il refuse d’ajouter un zéro final pour aligner les centièmes. Explique pourquoi ce zéro peut être utile.`,
        format: "open",
        expected: ["zéro", "virgules", "centièmes", "aligner", result],
        comparator: "contains_keyword",
        explanation: exp(
          "Un zéro final après la virgule ne change pas la valeur du nombre.",
          "Il peut aider à aligner les centièmes dans une addition décimale.",
          `${a} + ${b} = ${result}.`,
          "Le zéro final sert donc à mieux organiser le calcul."
        ),
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition avec zéro final",
          numbers: [a, b],
          result,
          questionLabel: "Le zéro final aide l’alignement.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // CALCUL_DECIMAL_SOUSTRACTION
  // Soustraire des nombres décimaux simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_soustraction_fixed_001_methode_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une soustraction posée avec des nombres décimaux, pourquoi faut-il aligner les virgules ?",
    format: "qcm",
    choices: [
      "pour soustraire les chiffres de même rang",
      "pour supprimer les centièmes",
      "pour écrire plus vite",
      "pour éviter les échanges",
    ],
    expected: ["pour soustraire les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Les unités doivent être sous les unités, les dixièmes sous les dixièmes.",
    explanation: exp(
      "Dans un nombre décimal, chaque chiffre a une valeur selon sa position.",
      "Pour poser une soustraction de décimaux, on aligne les virgules.",
      "Ainsi, les unités sont sous les unités, les dixièmes sous les dixièmes et les centièmes sous les centièmes.",
      "Il faut donc aligner les virgules pour soustraire les chiffres de même rang."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction décimale",
      numbers: ["12,4", "3,25"],
      result: "9,15",
      questionLabel: "Observe l’alignement des virgules.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "virgule",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_soustraction_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 7,8 - 3,5.",
    format: "short",
    expected: ["4,3", "4.3"],
    comparator: "number_equal",
    hint: "Soustrais les unités avec les unités et les dixièmes avec les dixièmes.",
    explanation: exp(
      "Soustraire des nombres décimaux demande de respecter les rangs des chiffres.",
      "On aligne les virgules pour soustraire les unités avec les unités et les dixièmes avec les dixièmes.",
      "7,8 - 3,5 = 4,3.",
      "Le résultat est 4,3."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction décimale",
      numbers: ["7,8", "3,5"],
      result: "4,3",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_soustraction_open_001_erreur_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 12,4 - 3,25 mais il n’aligne pas les virgules. Explique pourquoi son résultat risque d’être faux.",
    format: "open",
    expected: ["virgules", "unités", "dixièmes", "centièmes", "aligner"],
    comparator: "contains_keyword",
    hint: "Les chiffres de même rang doivent être dans la même colonne.",
    explanation: exp(
      "Dans une soustraction décimale, l’alignement des virgules est essentiel.",
      "Il permet de placer les unités sous les unités, les dixièmes sous les dixièmes et les centièmes sous les centièmes.",
      "Dans 12,4 - 3,25, on peut écrire 12,40 pour mieux aligner les centièmes.",
      "Si les virgules ne sont pas alignées, on mélange les rangs et le résultat peut être faux."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Attention aux virgules",
      numbers: ["12,4", "3,25"],
      result: "9,15",
      questionLabel: "Les virgules doivent être alignées.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "open",
      "erreur",
      "virgule",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_001_dixiemes_sans_echange",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustrais les unités puis les dixièmes.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "dixiemes",
      "template",
      "canvas",
    ],
    generate: () => {
      const aEntier = randomInt(4, 9);
      const bEntier = randomInt(1, aEntier - 1);
      const aDixieme = randomInt(5, 9);
      const bDixieme = randomInt(1, aDixieme);

      const aText = `${aEntier},${aDixieme}`;
      const bText = `${bEntier},${bDixieme}`;
      const result = aEntier - bEntier + (aDixieme - bDixieme) / 10;
      const resultText = String(Number(result.toFixed(1))).replace(".", ",");

      return {
        text: `Calcule : ${aText} - ${bText}.`,
        format: "short",
        expected: [resultText, resultText.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des décimaux, on aligne les virgules.",
          "On soustrait les unités avec les unités et les dixièmes avec les dixièmes.",
          `${aText} - ${bText} = ${resultText}.`,
          `Le résultat est ${resultText}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction décimale",
          numbers: [aText, bText],
          result: resultText,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_002_dixiemes_avec_echange",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Si les dixièmes du haut sont trop petits, il faut échanger une unité contre 10 dixièmes.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "dixiemes",
      "echange",
      "template",
      "canvas",
    ],
    generate: () => {
      const aEntier = randomInt(4, 9);
      const bEntier = randomInt(1, aEntier - 1);
      const aDixieme = randomChoice([1, 2, 3, 4]);
      const bDixieme = randomChoice([5, 6, 7, 8, 9]);

      const a = aEntier + aDixieme / 10;
      const b = bEntier + bDixieme / 10;
      const result = a - b;

      const aText = `${aEntier},${aDixieme}`;
      const bText = `${bEntier},${bDixieme}`;
      const resultText = String(Number(result.toFixed(1))).replace(".", ",");

      return {
        text: `Calcule : ${aText} - ${bText}.`,
        format: "short",
        expected: [resultText, resultText.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Dans une soustraction décimale, il peut être nécessaire de faire un échange.",
          "Si les dixièmes du haut sont trop petits, on échange une unité contre 10 dixièmes.",
          `${aText} - ${bText} = ${resultText}.`,
          `Le résultat est ${resultText}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction décimale avec échange",
          numbers: [aText, bText],
          result: resultText,
          questionLabel: "Attention à l’échange.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_003_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Aligne les virgules : les centièmes doivent être sous les centièmes.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "centiemes",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["5,39", "2,14", "3,25"],
        ["8,58", "1,26", "7,32"],
        ["9,75", "3,24", "6,51"],
        ["7,68", "2,35", "5,33"],
        ["6,57", "1,42", "5,15"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des nombres avec des centièmes, on aligne les virgules.",
          "On soustrait les centièmes avec les centièmes, les dixièmes avec les dixièmes, puis les unités.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction de centièmes",
          numbers: [a, b],
          result,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_004_dixiemes_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux ajouter un zéro final : 7,8 = 7,80.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "zero_final",
      "virgule",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["7,8", "3,15", "4,65"],
        ["8,5", "2,24", "6,26"],
        ["9,3", "1,42", "7,88"],
        ["6,8", "5,16", "1,64"],
        ["12,4", "3,25", "9,15"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Quand les nombres n’ont pas le même nombre de chiffres après la virgule, on peut ajouter un zéro final.",
          "Ce zéro ne change pas la valeur mais aide à aligner les centièmes.",
          `${a} - ${b} = ${result}.`,
          `Le résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — virgules alignées",
          numbers: [a, b],
          result,
          questionLabel: "Tu peux ajouter un zéro final.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_005_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Pose la soustraction en alignant les virgules.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string, string[]][] = [
        ["8,4", "3,25", "5,15", ["5,25", "51,5", "4,85"]],
        ["9,8", "2,35", "7,45", ["7,55", "74,5", "6,45"]],
        ["7,6", "4,18", "3,42", ["3,58", "34,2", "2,42"]],
        ["12,5", "6,42", "6,08", ["6,12", "60,8", "5,08"]],
      ];

      const [a, b, result, wrongs] = randomChoice(cases);

      return {
        text: `Quel est le résultat de ${a} - ${b} ?`,
        format: "qcm",
        choices: makeChoices(result, wrongs),
        expected: [result],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour soustraire des décimaux, il faut aligner les virgules.",
          "On soustrait les chiffres de même rang.",
          `${a} - ${b} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction décimale",
          numbers: [a, b],
          result,
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_006_erreur_virgule_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’alignement des virgules.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "erreur",
      "virgule",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string, string][] = [
        ["12,4", "3,25", "9,15", "11,75"],
        ["8,6", "2,35", "6,25", "8,35"],
        ["15,7", "4,28", "11,42", "15,28"],
        ["9,5", "6,42", "3,08", "8,92"],
      ];

      const [a, b, result, wrong] = randomChoice(cases);

      return {
        text: `Un élève affirme que ${a} - ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur fréquente consiste à mal aligner les virgules.",
          "On doit soustraire les unités avec les unités, les dixièmes avec les dixièmes et les centièmes avec les centièmes.",
          `${a} - ${b} = ${result}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Vérifier une soustraction décimale",
          numbers: [a, b],
          result,
          questionLabel: "Les virgules doivent être alignées.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_007_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "reunion",
    hint: "On cherche ce qui reste à parcourir.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "reunion",
      "distance",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["5,7", "2,4", "3,3"],
        ["6,8", "3,2", "3,6"],
        ["4,15", "1,75", "2,4"],
        ["5,85", "1,25", "4,6"],
      ];

      const [total, parcouru, reste] = randomChoice(cases);

      return {
        text: `Pendant une randonnée à La Réunion, un parcours mesure ${total} km. Une classe a déjà parcouru ${parcouru} km. Quelle distance reste-t-il à parcourir ?`,
        format: "short",
        expected: [reste, reste.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche ce qui reste, on utilise une soustraction.",
          "On soustrait la distance déjà parcourue à la distance totale.",
          `${total} - ${parcouru} = ${reste}.`,
          `Il reste ${reste} km à parcourir.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — randonnée",
          numbers: [total, parcouru],
          result: reste,
          questionLabel: "On cherche la distance restante.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_008_reunion_marche_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "reunion",
    hint: "On cherche la monnaie rendue.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "reunion",
      "prix",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["10,00", "3,70", "6,30"],
        ["10,00", "5,85", "4,15"],
        ["20,00", "7,65", "12,35"],
        ["20,00", "12,40", "7,60"],
      ];

      const [paye, prix, monnaie] = randomChoice(cases);

      return {
        text: `Au marché de Saint-Pierre, on donne ${paye} € pour payer un achat de ${prix} €. Combien d’euros doit-on rendre ?`,
        format: "short",
        expected: [monnaie, monnaie.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver la monnaie rendue, on utilise une soustraction.",
          "On soustrait le prix à la somme donnée.",
          `${paye} - ${prix} = ${monnaie}.`,
          `On doit rendre ${monnaie} €.`
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction — monnaie",
          numbers: [paye, prix],
          result: monnaie,
          questionLabel: "On cherche la monnaie rendue.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_009_open_probleme_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "reunion",
    hint: "Explique pourquoi on utilise une soustraction.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "open",
      "probleme",
      "distance",
      "reunion",
      "template",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["5,75", "2,4", "3,35"],
        ["6,25", "3,5", "2,75"],
        ["4,80", "1,15", "3,65"],
        ["7,50", "2,35", "5,15"],
      ];

      const [total, parcouru, reste] = randomChoice(cases);

      return {
        text: `Une classe doit marcher ${total} km. Elle a déjà parcouru ${parcouru} km. Explique comment trouver la distance restante.`,
        format: "open",
        expected: [total, parcouru, "soustraction", "virgules", reste],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche une distance restante, on utilise une soustraction.",
          "On soustrait la distance déjà parcourue à la distance totale en alignant les virgules.",
          `${total} - ${parcouru} = ${reste}.`,
          `La distance restante est ${reste} km.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_010_open_demarche_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique l’alignement des virgules et des rangs.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "open",
      "demarche",
      "virgule",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["12,4", "3,25", "9,15"],
        ["8,6", "2,35", "6,25"],
        ["15,7", "4,28", "11,42"],
        ["9,5", "6,42", "3,08"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Explique comment poser correctement la soustraction ${a} - ${b}.`,
        format: "open",
        expected: [
          "virgules",
          "unités",
          "dixièmes",
          "centièmes",
          result,
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour poser une soustraction décimale, on aligne les virgules.",
          "Cela permet de soustraire les chiffres de même rang : unités, dixièmes, centièmes.",
          `${a} - ${b} = ${result}.`,
          "Une bonne présentation évite les erreurs de rang."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction décimale",
          numbers: [a, b],
          result,
          questionLabel: "Explique l’alignement des virgules.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_decimal_soustraction_tpl_011_open_erreur_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 5,
    theme: "neutral",
    hint: "Un zéro final peut aider à aligner les centièmes.",
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "open",
      "erreur",
      "zero_final",
      "template",
      "canvas",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["7,8", "3,15", "4,65"],
        ["8,5", "2,24", "6,26"],
        ["9,3", "1,42", "7,88"],
        ["6,8", "5,16", "1,64"],
      ];

      const [a, b, result] = randomChoice(cases);

      return {
        text: `Un élève veut calculer ${a} - ${b}, mais il refuse d’ajouter un zéro final pour aligner les centièmes. Explique pourquoi ce zéro peut être utile.`,
        format: "open",
        expected: ["zéro", "virgules", "centièmes", "aligner", result],
        comparator: "contains_keyword",
        explanation: exp(
          "Un zéro final après la virgule ne change pas la valeur du nombre.",
          "Il peut aider à aligner les centièmes dans une soustraction décimale.",
          `${a} - ${b} = ${result}.`,
          "Le zéro final sert donc à mieux organiser le calcul."
        ),
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction avec zéro final",
          numbers: [a, b],
          result,
          questionLabel: "Le zéro final aide l’alignement.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // CALCUL_PRIORITE
  // Utiliser des priorités opératoires simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_priorite_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le calcul 4 + 3 × 5, quelle opération faut-il faire en premier ?",
    format: "qcm",
    choices: [
      "3 × 5",
      "4 + 3",
      "5 + 4",
      "on peut choisir"
    ],
    expected: ["3 × 5"],
    comparator: "mcq_exact",
    hint: "La multiplication est prioritaire sur l’addition.",
    explanation: exp(
      "Une priorité opératoire indique l’ordre dans lequel on effectue les calculs.",
      "Dans une expression avec addition et multiplication, on effectue d’abord la multiplication.",
      "Dans 4 + 3 × 5, on calcule d’abord 3 × 5.",
      "L’opération prioritaire est donc 3 × 5."
    ),
    tags: ["cm1", "calcul", "priorite", "methode", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_priorite_fixed_002_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4 + 3 × 5",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Commence par la multiplication.",
    explanation: exp(
      "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
      "On calcule d’abord 3 × 5, puis on ajoute 4.",
      "3 × 5 = 15, puis 4 + 15 = 19.",
      "Le résultat est 19."
    ),
    tags: ["cm1", "calcul", "priorite", "modele", "short", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_priorite_open_001_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 4 + 3 × 5 et trouve 35. Explique son erreur.",
    format: "open",
    expected: ["multiplication", "prioritaire", "3", "5", "19"],
    comparator: "contains_keyword",
    hint: "Il a probablement commencé par 4 + 3.",
    explanation: exp(
      "Les priorités opératoires donnent l’ordre des calculs.",
      "Dans 4 + 3 × 5, il faut d’abord faire la multiplication 3 × 5.",
      "L’élève a sans doute calculé 4 + 3 = 7, puis 7 × 5 = 35, ce qui ne respecte pas la priorité.",
      "Le bon résultat est 19."
    ),
    tags: ["cm1", "calcul", "priorite", "open", "erreur", "fixed"],
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_001_addition_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la multiplication.",
    tags: ["cm1", "calcul", "priorite", "addition", "multiplication", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 9);
      const result = a + b * c;

      return {
        text: `Calcule : ${a} + ${b} × ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
          "On calcule d’abord la multiplication, puis l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_002_soustraction_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la multiplication.",
    tags: ["cm1", "calcul", "priorite", "soustraction", "multiplication", "template"],
    generate: () => {
      const b = randomInt(2, 8);
      const c = randomInt(2, 8);
      const product = b * c;
      const a = product + randomInt(10, 40);
      const result = a - product;

      return {
        text: `Calcule : ${a} - ${b} × ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un calcul avec soustraction et multiplication, la multiplication est prioritaire.",
          "On calcule d’abord la multiplication, puis la soustraction.",
          `${b} × ${c} = ${product}, puis ${a} - ${product} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_003_parentheses",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Les parenthèses se calculent en premier.",
    tags: ["cm1", "calcul", "priorite", "parentheses", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 6);
      const result = (a + b) * c;

      return {
        text: `Calcule : (${a} + ${b}) × ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Les parenthèses indiquent un calcul à faire en premier.",
          "On calcule d’abord ce qui est entre parenthèses, puis la multiplication.",
          `${a} + ${b} = ${a + b}, puis ${a + b} × ${c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_004_qcm_operation_premiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche s’il y a une multiplication ou des parenthèses.",
    tags: ["cm1", "calcul", "priorite", "qcm", "operation_premiere", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 9);
      const correct = `${b} × ${c}`;

      return {
        text: `Dans le calcul ${a} + ${b} × ${c}, quelle opération faut-il faire en premier ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} + ${b}`,
          `${a} + ${c}`,
          "on peut choisir",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La multiplication est prioritaire sur l’addition.",
          "Il faut donc commencer par le produit.",
          `Dans ${a} + ${b} × ${c}, on calcule d’abord ${b} × ${c}.`,
          `L’opération prioritaire est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_005_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : la multiplication passe avant l’addition.",
    tags: ["cm1", "calcul", "priorite", "qcm", "resultat", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 9);
      const result = a + b * c;
      const wrongLeftToRight = (a + b) * c;

      return {
        text: `Quel est le résultat de ${a} + ${b} × ${c} ?`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(wrongLeftToRight),
          String(a + b + c),
          String(a * b + c),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut respecter les priorités opératoires.",
          "La multiplication est prioritaire sur l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${result}.`,
          `Le bon résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_006_erreur_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie si l’élève a respecté l’ordre des calculs.",
    tags: ["cm1", "calcul", "priorite", "erreur", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 8);
      const correct = a + b * c;
      const wrong = (a + b) * c;

      return {
        text: `Un élève calcule ${a} + ${b} × ${c} et trouve ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur fréquente consiste à calculer de gauche à droite sans respecter les priorités.",
          "La multiplication doit être faite avant l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${correct}.`,
          `L’élève n’a pas raison : le résultat est ${correct}, pas ${wrong}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_007_parentheses_vs_sans_parentheses",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    hint: "Les parenthèses peuvent changer le résultat.",
    tags: ["cm1", "calcul", "priorite", "parentheses", "comparaison", "template", "qcm"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(2, 8);
      const c = randomInt(2, 5);
      const withParentheses = (a + b) * c;
      const withoutParentheses = a + b * c;
      const correct =
        withParentheses === withoutParentheses
          ? "ils sont égaux"
          : withParentheses > withoutParentheses
            ? `(${a} + ${b}) × ${c}`
            : `${a} + ${b} × ${c}`;

      return {
        text: `Quel calcul donne le plus grand résultat ?`,
        format: "qcm",
        choices: [
          `(${a} + ${b}) × ${c}`,
          `${a} + ${b} × ${c}`,
          "ils sont égaux",
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les parenthèses changent l’ordre des calculs.",
          "On compare les deux expressions.",
          `(${a} + ${b}) × ${c} = ${withParentheses}, alors que ${a} + ${b} × ${c} = ${withoutParentheses}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_008_open_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique quelle opération devait être faite en premier.",
    tags: ["cm1", "calcul", "priorite", "open", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 8);
      const correct = a + b * c;
      const wrong = (a + b) * c;

      return {
        text: `Un élève calcule ${a} + ${b} × ${c} et trouve ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          "multiplication",
          "prioritaire",
          String(b),
          String(c),
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
          "L’élève a probablement commencé par l’addition, ce qui ne respecte pas la priorité.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${correct}.`,
          `Le bon résultat est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_009_open_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "neutral",
    hint: "Présente les calculs dans le bon ordre.",
    tags: ["cm1", "calcul", "priorite", "open", "demarche", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, 8);
      const result = a + b * c;

      return {
        text: `Explique ta démarche pour calculer ${a} + ${b} × ${c}.`,
        format: "open",
        expected: [
          "multiplication",
          "addition",
          String(b * c),
          String(result),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une démarche claire indique l’ordre des opérations.",
          "On commence par la multiplication, puis on fait l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_010_reunion_probleme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord les groupes identiques, puis ajoute ce qui est en plus.",
    tags: ["cm1", "calcul", "priorite", "reunion", "probleme", "template"],
    generate: () => {
      const deja = randomChoice([3, 4, 5, 6, 8]);
      const groupes = randomChoice([3, 4, 5, 6]);
      const parGroupe = randomChoice([4, 5, 6, 8]);
      const total = deja + groupes * parGroupe;

      return {
        text: `À la plage, une classe ramasse déjà ${deja} déchets. Puis ${groupes} groupes ramassent chacun ${parGroupe} déchets. Combien de déchets sont ramassés au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Dans ce problème, il y a une quantité déjà ramassée et des groupes identiques.",
          "On calcule d’abord les groupes avec une multiplication, puis on ajoute la quantité déjà ramassée.",
          `${groupes} × ${parGroupe} = ${groupes * parGroupe}, puis ${deja} + ${groupes * parGroupe} = ${total}.`,
          `Au total, ${total} déchets sont ramassés.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_priorite_tpl_011_open_probleme_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 5,
    theme: "reunion",
    hint: "Explique pourquoi la multiplication doit être faite avant l’addition.",
    tags: ["cm1", "calcul", "priorite", "open", "probleme", "reunion", "template"],
    generate: () => {
      const deja = randomChoice([2, 3, 4, 5, 6]);
      const paniers = randomChoice([3, 4, 5]);
      const fruits = randomChoice([6, 8, 9]);
      const total = deja + paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, Lina a déjà ${deja} fruits dans son sac. Elle achète ${paniers} paniers contenant chacun ${fruits} fruits. Explique comment trouver le nombre total de fruits.`,
        format: "open",
        expected: [
          String(deja),
          String(paniers),
          String(fruits),
          "multiplication",
          "addition",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On doit d’abord calculer le nombre de fruits achetés dans les paniers.",
          "Comme chaque panier contient la même quantité, on utilise une multiplication, puis on ajoute les fruits déjà dans le sac.",
          `${paniers} × ${fruits} = ${paniers * fruits}, puis ${deja} + ${paniers * fruits} = ${total}.`,
          `Lina a ${total} fruits au total.`
        ),
      };
    },
  },
    // ============================================================
  // CALCUL_DEFI
  // Résoudre un défi de calcul
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_calcul_defi_fixed_001_modele_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : une école reçoit 125 cahiers le matin et 87 cahiers l’après-midi. Elle en distribue 96. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["116"],
    comparator: "number_equal",
    hint: "Calcule d’abord le nombre total de cahiers reçus, puis enlève ceux qui sont distribués.",
    explanation: exp(
      "Un défi de calcul peut demander plusieurs étapes.",
      "On commence par additionner les cahiers reçus, puis on soustrait les cahiers distribués.",
      "125 + 87 = 212, puis 212 - 96 = 116.",
      "Il reste 116 cahiers."
    ),
    tags: ["cm1", "calcul", "defi", "deux_etapes", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_defi_open_001_demarche_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment résoudre ce problème : une école a 240 livres. Elle en reçoit 85 nouveaux, puis elle en donne 126 à une autre école. Combien de livres reste-t-il ?",
    format: "open",
    expected: ["240", "85", "126", "addition", "soustraction", "199"],
    comparator: "contains_keyword",
    hint: "Il faut d’abord ajouter les livres reçus, puis enlever les livres donnés.",
    explanation: exp(
      "Dans un problème à plusieurs étapes, il faut respecter l’ordre des événements.",
      "On ajoute d’abord les livres reçus, puis on soustrait les livres donnés.",
      "240 + 85 = 325, puis 325 - 126 = 199.",
      "Il reste 199 livres."
    ),
    tags: ["cm1", "calcul", "defi", "open", "probleme", "deux_etapes", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_defi_open_002_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève lit : « 8 sacs contiennent chacun 12 billes ». Il calcule 8 + 12. Explique son erreur.",
    format: "open",
    expected: ["chacun", "groupes", "multiplication", "8", "12", "96"],
    comparator: "contains_keyword",
    hint: "Le mot « chacun » indique souvent des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 8 × 12 = 96, et non 8 + 12.",
      "L’élève a choisi une addition au lieu d’une multiplication."
    ),
    tags: ["cm1", "calcul", "defi", "open", "erreur", "choisir_operation", "fixed"],
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_001_addition_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne d’abord ce qui arrive, puis enlève ce qui part.",
    tags: ["cm1", "calcul", "defi", "addition", "soustraction", "template"],
    generate: () => {
      const depart = randomChoice([120, 145, 180, 225, 260]);
      const ajoute = randomChoice([35, 48, 67, 85, 96]);
      const retire = randomChoice([24, 58, 73, 89, 112]);
      const total = depart + ajoute - retire;

      return {
        text: `Défi : une bibliothèque possède ${depart} livres. Elle reçoit ${ajoute} livres, puis en prête ${retire}. Combien de livres reste-t-il ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande deux étapes.",
          "On ajoute d’abord les livres reçus, puis on enlève les livres prêtés.",
          `${depart} + ${ajoute} = ${depart + ajoute}, puis ${depart + ajoute} - ${retire} = ${total}.`,
          `Il reste ${total} livres.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_002_multiplication_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord les groupes identiques.",
    tags: ["cm1", "calcul", "defi", "multiplication", "addition", "template"],
    generate: () => {
      const deja = randomChoice([5, 8, 12, 15, 20]);
      const groupes = randomChoice([4, 5, 6, 8]);
      const parGroupe = randomChoice([6, 8, 9, 12]);
      const total = deja + groupes * parGroupe;

      return {
        text: `Défi : il y a déjà ${deja} cartes sur une table. On ajoute ${groupes} paquets de ${parGroupe} cartes. Combien y a-t-il de cartes au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème mélange une quantité déjà présente et des groupes égaux.",
          "On calcule d’abord les groupes avec une multiplication, puis on ajoute la quantité de départ.",
          `${groupes} × ${parGroupe} = ${groupes * parGroupe}, puis ${deja} + ${groupes * parGroupe} = ${total}.`,
          `Il y a ${total} cartes au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_003_multiplication_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord le total, puis enlève ce qui est retiré.",
    tags: ["cm1", "calcul", "defi", "multiplication", "soustraction", "template"],
    generate: () => {
      const groupes = randomChoice([5, 6, 7, 8]);
      const parGroupe = randomChoice([8, 9, 10, 12]);
      const retire = randomChoice([6, 10, 15, 20]);
      const totalBrut = groupes * parGroupe;
      const total = totalBrut - retire;

      return {
        text: `Défi : ${groupes} boîtes contiennent chacune ${parGroupe} objets. On retire ${retire} objets abîmés. Combien d’objets reste-t-il ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande une multiplication puis une soustraction.",
          "On calcule d’abord le nombre total d’objets, puis on retire les objets abîmés.",
          `${groupes} × ${parGroupe} = ${totalBrut}, puis ${totalBrut} - ${retire} = ${total}.`,
          `Il reste ${total} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_004_priorite_calcul",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Respecte les priorités opératoires.",
    tags: ["cm1", "calcul", "defi", "priorite", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(3, 8);
      const c = randomInt(3, 9);
      const result = a + b * c;

      return {
        text: `Défi calcul : ${a} + ${b} × ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
          "On calcule d’abord la multiplication, puis l’addition.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${result}.`,
          `Le résultat est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_005_decimaux_addition_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Aligne les virgules pour additionner ou soustraire.",
    tags: ["cm1", "calcul", "defi", "decimaux", "addition", "soustraction", "template"],
    generate: () => {
      const cases: [string, string, string, string][] = [
        ["5,75", "2,40", "1,25", "6,90"],
        ["8,50", "1,35", "2,10", "7,75"],
        ["6,25", "3,50", "4,15", "5,60"],
        ["9,80", "2,45", "3,25", "9,00"],
      ];

      const [depart, ajoute, retire, result] = randomChoice(cases);

      return {
        text: `Défi décimal : on a ${depart} m de ruban. On ajoute ${ajoute} m, puis on coupe ${retire} m. Combien de mètres de ruban reste-t-il ?`,
        format: "short",
        expected: [result, result.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème mélange addition et soustraction de nombres décimaux.",
          "On aligne les virgules pour calculer correctement.",
          `${depart} + ${ajoute} = ${String(
            Number(depart.replace(",", ".")) + Number(ajoute.replace(",", "."))
          ).replace(".", ",")}, puis on enlève ${retire}.`,
          `Il reste ${result} m de ruban.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_006_qcm_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si on ajoute, enlève, répète ou partage.",
    tags: ["cm1", "calcul", "defi", "choisir_operation", "qcm", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 8]);
      const quantite = randomChoice([6, 8, 9, 12]);
      const correct = `${groupes} × ${quantite}`;

      return {
        text: `Quel calcul permet de résoudre : « ${groupes} sacs contiennent chacun ${quantite} objets » ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${groupes} + ${quantite}`,
          `${quantite} - ${groupes}`,
          `${quantite} ÷ ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir l’opération demande de comprendre la situation.",
          "Le mot « chacun » indique des groupes égaux.",
          `Il faut donc calculer ${groupes} × ${quantite}.`,
          `Le bon calcul est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_007_qcm_resultat_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais les calculs dans l’ordre du problème.",
    tags: ["cm1", "calcul", "defi", "deux_etapes", "qcm", "template"],
    generate: () => {
      const depart = randomChoice([80, 120, 150, 200]);
      const ajoute = randomChoice([25, 40, 65, 90]);
      const retire = randomChoice([15, 35, 50, 75]);
      const result = depart + ajoute - retire;

      return {
        text: `On a ${depart} objets. On en ajoute ${ajoute}, puis on en enlève ${retire}. Combien reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(depart + ajoute),
          String(depart - retire),
          String(result + 10),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut suivre l’ordre des actions.",
          "On ajoute d’abord, puis on enlève.",
          `${depart} + ${ajoute} = ${depart + ajoute}, puis ${depart + ajoute} - ${retire} = ${result}.`,
          `Il reste ${result} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_008_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le total des achats.",
    tags: ["cm1", "calcul", "defi", "reunion", "marche", "template"],
    generate: () => {
      const prix1 = randomChoice([12, 15, 18, 24]);
      const qte1 = randomChoice([3, 4, 5]);
      const prix2 = randomChoice([8, 10, 12, 15]);
      const total = prix1 * qte1 + prix2;

      return {
        text: `Au marché de Saint-Pierre, une famille achète ${qte1} paniers à ${prix1} € chacun et un sac à ${prix2} €. Combien paie-t-elle au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande une multiplication puis une addition.",
          "On calcule d’abord le prix des paniers, puis on ajoute le prix du sac.",
          `${qte1} × ${prix1} = ${qte1 * prix1}, puis ${qte1 * prix1} + ${prix2} = ${total}.`,
          `La famille paie ${total} € au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_009_reunion_ecologie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord les déchets ramassés, puis enlève ceux déjà comptés.",
    tags: ["cm1", "calcul", "defi", "reunion", "ecologie", "template"],
    generate: () => {
      const classes = randomChoice([4, 5, 6, 7]);
      const dechets = randomChoice([12, 15, 18, 20]);
      const dejaComptes = randomChoice([10, 15, 20, 25]);
      const totalBrut = classes * dechets;
      const total = totalBrut - dejaComptes;

      return {
        text: `Défi écologie : ${classes} classes ramassent chacune ${dechets} déchets. On retire ${dejaComptes} déchets déjà comptés. Quel est le total corrigé ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème combine multiplication et soustraction.",
          "On calcule d’abord le total brut, puis on retire ce qui a déjà été compté.",
          `${classes} × ${dechets} = ${totalBrut}, puis ${totalBrut} - ${dejaComptes} = ${total}.`,
          `Le total corrigé est ${total} déchets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_010_open_probleme_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique les deux étapes du calcul.",
    tags: ["cm1", "calcul", "defi", "open", "probleme", "deux_etapes", "template"],
    generate: () => {
      const depart = randomChoice([140, 180, 220, 260]);
      const ajoute = randomChoice([45, 68, 75, 95]);
      const retire = randomChoice([38, 57, 84, 126]);
      const total = depart + ajoute - retire;

      return {
        text: `Explique comment résoudre ce problème : une association possède ${depart} affiches. Elle en reçoit ${ajoute}, puis elle en distribue ${retire}. Combien d’affiches reste-t-il ?`,
        format: "open",
        expected: [
          String(depart),
          String(ajoute),
          String(retire),
          "addition",
          "soustraction",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Il faut suivre les étapes du problème.",
          "On ajoute d’abord les affiches reçues, puis on enlève les affiches distribuées.",
          `${depart} + ${ajoute} = ${depart + ajoute}, puis ${depart + ajoute} - ${retire} = ${total}.`,
          `Il reste ${total} affiches.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_011_open_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le mot « chacun » indique une quantité répétée.",
    tags: ["cm1", "calcul", "defi", "open", "choisir_operation", "template"],
    generate: () => {
      const groupes = randomChoice([5, 6, 7, 8]);
      const quantite = randomChoice([8, 9, 12, 15]);
      const total = groupes * quantite;

      return {
        text: `Explique quelle opération utiliser : ${groupes} groupes ont chacun ${quantite} objets. Combien y a-t-il d’objets au total ?`,
        format: "open",
        expected: [
          String(groupes),
          String(quantite),
          "multiplication",
          "chacun",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand une même quantité est répétée plusieurs fois, on utilise une multiplication.",
          "Le mot « chacun » indique des groupes égaux.",
          `${groupes} × ${quantite} = ${total}.`,
          `Il y a ${total} objets au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_calcul_defi_tpl_012_open_erreur_priorite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La multiplication est prioritaire sur l’addition.",
    tags: ["cm1", "calcul", "defi", "open", "erreur", "priorite", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 8);
      const c = randomInt(3, 9);
      const wrong = (a + b) * c;
      const correct = a + b * c;

      return {
        text: `Un élève calcule ${a} + ${b} × ${c} et trouve ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          "multiplication",
          "prioritaire",
          String(b),
          String(c),
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
          "L’élève a probablement commencé par l’addition, ce qui ne respecte pas la priorité.",
          `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${correct}.`,
          `Le bon résultat est ${correct}.`
        ),
      };
    },
  },
];
