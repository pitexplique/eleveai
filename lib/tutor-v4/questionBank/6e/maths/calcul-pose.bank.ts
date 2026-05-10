// lib/tutor-v4/question-banks/maths/6e/calcul-pose.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

export const calculPoseBank: TutorBankItemV4[] = [
  /* =========================
     POSE_ADDITION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une addition posée, pourquoi faut-il aligner les unités sous les unités ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour que l’opération soit plus jolie",
      "pour additionner les chiffres au hasard",
      "pour éviter les retenues",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "On additionne unités avec unités, dizaines avec dizaines.",
    explanation:
      "Définition : poser une addition consiste à aligner les chiffres de même rang.\n\n" +
      "Méthode : on place les unités sous les unités, les dizaines sous les dizaines, les centaines sous les centaines.\n\n" +
      "Calcul : cela permet d’additionner correctement chaque colonne.\n\n" +
      "Conclusion : il faut aligner les chiffres de même rang.",
    tags: ["entier_calcul_pose", "addition", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["247", "35"],
      result: "282",
      questionLabel: "Observe l’alignement des chiffres.",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_1_sans_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne colonne par colonne.",
    tags: ["entier_calcul_pose", "addition", "template", "canvas"],
    generate: () => {
      const a = randomChoice([123, 214, 342, 521]);
      const b = randomChoice([134, 253, 126, 318]);
      const result = a + b;

      return {
        text: `Calcule l’addition posée : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une addition posée permet d’additionner des nombres en colonnes.\n\n" +
          "Méthode : on additionne d’abord les unités, puis les dizaines, puis les centaines.\n\n" +
          `Calcul : ${a} + ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition posée",
          numbers: [String(a), String(b)],
          result: String(result),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_2_avec_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention à la retenue.",
    tags: ["entier_calcul_pose", "addition", "retenue", "template", "canvas"],
    generate: () => {
      const a = randomChoice([268, 475, 586, 739]);
      const b = randomChoice([157, 286, 349, 188]);
      const result = a + b;

      return {
        text: `Calcule : ${a} + ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une addition posée, une retenue apparaît quand une colonne dépasse 9.\n\n" +
          "Méthode : on additionne colonne par colonne en reportant les retenues.\n\n" +
          `Calcul : ${a} + ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition avec retenue",
          numbers: [String(a), String(b)],
          result: String(result),
          retenues: ["", "1", "1"],
          display: { showRetenues: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 247 + 35 en écrivant 35 sous 247 sans aligner les unités. Pourquoi risque-t-il de se tromper ?",
    format: "open",
    expected: ["unités", "dizaines", "aligner", "rang", "colonnes"],
    comparator: "contains_keyword",
    hint: "Parle des unités et des dizaines.",
    explanation:
      "Définition : chaque chiffre a un rang : unités, dizaines, centaines.\n\n" +
      "Méthode : dans une addition posée, on aligne les chiffres de même rang.\n\n" +
      "Calcul : si les unités ne sont pas sous les unités, on additionne des rangs différents.\n\n" +
      "Conclusion : l’élève risque de faire une erreur d’alignement.",
    tags: ["entier_calcul_pose", "addition", "open", "erreur", "alignement"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Attention à l’alignement",
      numbers: ["247", "35"],
      result: "282",
      highlight: { col: 2 },
      questionLabel: "Les unités doivent être dans la même colonne.",
    }),
  },

  /* =========================
     POSE_SOUSTRACTION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une soustraction posée, pourquoi faut-il aligner les chiffres de même rang ?",
    format: "qcm",
    choices: [
      "pour soustraire unités avec unités, dizaines avec dizaines",
      "pour éviter de calculer",
      "pour changer le nombre",
      "pour additionner les lignes",
    ],
    expected: ["pour soustraire unités avec unités, dizaines avec dizaines"],
    comparator: "mcq_exact",
    hint: "On travaille colonne par colonne.",
    explanation:
      "Définition : poser une soustraction consiste à organiser les chiffres par rang.\n\n" +
      "Méthode : on aligne unités, dizaines, centaines.\n\n" +
      "Calcul : on soustrait ensuite colonne par colonne.\n\n" +
      "Conclusion : l’alignement est indispensable.",
    tags: ["entier_calcul_pose", "soustraction", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["584", "231"],
      result: "353",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_1_sans_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustrais colonne par colonne.",
    tags: ["entier_calcul_pose", "soustraction", "template", "canvas"],
    generate: () => {
      const a = randomChoice([875, 764, 653, 986]);
      const b = randomChoice([321, 242, 431, 562]);
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une soustraction posée permet de soustraire en colonnes.\n\n" +
          "Méthode : on soustrait les unités, puis les dizaines, puis les centaines.\n\n" +
          `Calcul : ${a} - ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction posée",
          numbers: [String(a), String(b)],
          result: String(result),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_2_avec_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le chiffre du haut est trop petit, il faut utiliser une retenue.",
    tags: ["entier_calcul_pose", "soustraction", "retenue", "template", "canvas"],
    generate: () => {
    const pairs: [number, number][] = [
    [704, 268],
    [632, 458],
    [905, 376],
    [821, 547],
    ];

    const pair = randomChoice(pairs);

    const a = pair[0];
    const b = pair[1];
      const result = a - b;

      return {
        text: `Calcule : ${a} - ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une soustraction posée, une retenue est nécessaire quand on ne peut pas soustraire directement dans une colonne.\n\n" +
          "Méthode : on échange une dizaine ou une centaine pour pouvoir continuer.\n\n" +
          `Calcul : ${a} - ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction avec retenue",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Attention aux retenues.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier une soustraction avec une addition.",
    format: "open",
    expected: ["addition", "résultat", "soustrait", "nombre de départ", "vérifier"],
    comparator: "contains_keyword",
    hint: "On ajoute le résultat au nombre soustrait.",
    explanation:
      "Définition : vérifier une soustraction permet de contrôler le résultat.\n\n" +
      "Méthode : on ajoute le résultat de la soustraction au nombre que l’on a soustrait.\n\n" +
      "Calcul : si 584 - 231 = 353, alors 353 + 231 = 584.\n\n" +
      "Conclusion : l’addition permet de vérifier la soustraction.",
    tags: ["entier_calcul_pose", "soustraction", "open", "verification"],
  },
    /* =========================
     POSE_MULTIPLICATION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour éviter de multiplier",
      "pour changer le résultat",
      "pour écrire moins de chiffres",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a un rang : unités, dizaines, centaines.",
    explanation:
      "Définition : une multiplication posée organise les calculs par rang.\n\n" +
      "Méthode : on multiplie les chiffres en respectant leur position.\n\n" +
      "Calcul : les unités, dizaines et centaines ne représentent pas les mêmes valeurs.\n\n" +
      "Conclusion : l’alignement permet de respecter le rang des chiffres.",
    tags: ["entier_calcul_pose", "multiplication", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_1_un_chiffre",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: ["entier_calcul_pose", "multiplication", "template", "canvas"],
    generate: () => {
      const a = randomChoice([123, 214, 302, 421]);
      const b = randomChoice([2, 3, 4]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une multiplication posée permet de multiplier en colonnes.\n\n" +
          "Méthode : on multiplie chaque chiffre du nombre par le chiffre du bas.\n\n" +
          `Calcul : ${a} × ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication par un chiffre",
          numbers: [String(a), String(b)],
          result: String(result),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_2_avec_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux retenues dans les colonnes.",
    tags: ["entier_calcul_pose", "multiplication", "retenue", "template", "canvas"],
    generate: () => {
      const a = randomChoice([267, 348, 456, 579]);
      const b = randomChoice([3, 4, 5, 6]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une retenue peut apparaître dans une multiplication posée.\n\n" +
          "Méthode : on multiplie colonne par colonne et on reporte les retenues.\n\n" +
          `Calcul : ${a} × ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Multiplication avec retenue",
          numbers: [String(a), String(b)],
          result: String(result),
          questionLabel: "Pense aux retenues.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 et oublie une retenue. Pourquoi son résultat peut-il être faux ?",
    format: "open",
    expected: ["retenue", "colonne", "multiplier", "reporter", "résultat"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change les colonnes suivantes.",
    explanation:
      "Définition : une retenue est une quantité à reporter dans la colonne suivante.\n\n" +
      "Méthode : dans une multiplication posée, on doit reporter chaque retenue au bon endroit.\n\n" +
      "Calcul : si une retenue est oubliée, la colonne suivante n’est plus correcte.\n\n" +
      "Conclusion : oublier une retenue peut rendre tout le résultat faux.",
    tags: ["entier_calcul_pose", "multiplication", "open", "erreur", "retenue"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente : retenue oubliée",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
    }),
  },

  /* =========================
     POSE_DIVISION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_division_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une division euclidienne, le reste doit être...",
    format: "qcm",
    choices: [
      "plus petit que le diviseur",
      "plus grand que le diviseur",
      "égal au dividende",
      "toujours égal à 1",
    ],
    expected: ["plus petit que le diviseur"],
    comparator: "mcq_exact",
    hint: "Si le reste est trop grand, on peut encore diviser.",
    explanation:
      "Définition : dans une division euclidienne, on écrit dividende = diviseur × quotient + reste.\n\n" +
      "Méthode : on vérifie toujours que le reste est plus petit que le diviseur.\n\n" +
      "Calcul : si le reste est supérieur ou égal au diviseur, le quotient n’est pas assez grand.\n\n" +
      "Conclusion : le reste doit être plus petit que le diviseur.",
    tags: ["entier_calcul_pose", "division", "reste", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division euclidienne",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_1_sans_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de fois le diviseur rentre dans le dividende.",
    tags: ["entier_calcul_pose", "division", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([2, 3, 4, 5, 6]);
      const quotient = randomChoice([12, 15, 18, 21]);
      const dividende = diviseur * quotient;

      return {
        text: `Calcule : ${dividende} ÷ ${diviseur}.`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation:
          "Définition : diviser, c’est chercher combien de fois le diviseur entre dans le dividende.\n\n" +
          "Méthode : on cherche le quotient.\n\n" +
          `Calcul : ${diviseur} × ${quotient} = ${dividende}, donc ${dividende} ÷ ${diviseur} = ${quotient}.\n\n` +
          `Conclusion : le quotient est ${quotient}.`,
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Division sans reste",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: "0",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_2_avec_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le reste doit être inférieur au diviseur.",
    tags: ["entier_calcul_pose", "division", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8]);
      const quotient = randomChoice([8, 9, 10, 11]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division de ${dividende} par ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une division euclidienne, dividende = diviseur × quotient + reste.\n\n" +
          "Méthode : on cherche le multiple du diviseur le plus proche sans dépasser le dividende.\n\n" +
          `Calcul : ${diviseur} × ${quotient} = ${diviseur * quotient}, et ${dividende} - ${diviseur * quotient} = ${reste}.\n\n` +
          `Conclusion : le reste est ${reste}.`,
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Division avec reste",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi, dans une division euclidienne, le reste doit être plus petit que le diviseur.",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "quotient", "encore"],
    comparator: "contains_keyword",
    hint: "Si le reste est encore plus grand que le diviseur, on peut continuer.",
    explanation:
      "Définition : une division euclidienne donne un quotient et un reste.\n\n" +
      "Méthode : le quotient doit être le plus grand possible sans dépasser le dividende.\n\n" +
      "Calcul : si le reste est supérieur ou égal au diviseur, on peut ajouter 1 au quotient.\n\n" +
      "Conclusion : le reste doit donc être plus petit que le diviseur.",
    tags: ["entier_calcul_pose", "division", "open", "raisonnement"],
  },

  /* =========================
     POSE_VERIFIER
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité permet de vérifier la division euclidienne : 37 ÷ 5 = 7 reste 2 ?",
    format: "qcm",
    choices: [
      "37 = 5 × 7 + 2",
      "37 = 5 + 7 + 2",
      "37 = 7 × 2 + 5",
      "37 = 5 × 2 + 7",
    ],
    expected: ["37 = 5 × 7 + 2"],
    comparator: "mcq_exact",
    hint: "dividende = diviseur × quotient + reste.",
    explanation:
      "Définition : pour vérifier une division euclidienne, on utilise la relation dividende = diviseur × quotient + reste.\n\n" +
      "Méthode : on remplace par les nombres donnés.\n\n" +
      "Calcul : 5 × 7 + 2 = 35 + 2 = 37.\n\n" +
      "Conclusion : l’égalité correcte est 37 = 5 × 7 + 2.",
    tags: ["entier_calcul_pose", "verification", "division", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Vérifier une division",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_1_soustraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour vérifier une soustraction, on peut additionner le résultat et le nombre soustrait.",
    tags: ["entier_calcul_pose", "verification", "soustraction", "template", "canvas"],
    generate: () => {
      const b = randomChoice([126, 235, 348, 457]);
      const result = randomChoice([142, 253, 371, 489]);
      const a = b + result;

      return {
        text: `On affirme que ${a} - ${b} = ${result}. Quelle addition permet de vérifier ?`,
        format: "qcm",
        choices: shuffle([
          `${result} + ${b} = ${a}`,
          `${a} + ${b} = ${result}`,
          `${a} - ${result} = ${a}`,
          `${b} - ${result} = ${a}`,
        ]),
        expected: [`${result} + ${b} = ${a}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : vérifier une soustraction consiste à contrôler que le résultat est cohérent.\n\n" +
          "Méthode : on additionne le résultat et le nombre soustrait.\n\n" +
          `Calcul : ${result} + ${b} = ${a}.\n\n` +
          "Conclusion : cette addition vérifie la soustraction.",
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Vérification",
          numbers: [String(a), String(b)],
          result: String(result),
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi vérifier un calcul est aussi important que trouver un résultat.",
    format: "open",
    expected: ["erreur", "vérifier", "résultat", "calcul", "corriger"],
    comparator: "contains_keyword",
    hint: "Même un bon calculateur peut faire une erreur de retenue ou d’alignement.",
    explanation:
      "Définition : vérifier un calcul consiste à contrôler si le résultat est cohérent.\n\n" +
      "Méthode : on peut refaire le calcul, utiliser l’opération inverse ou estimer le résultat.\n\n" +
      "Observation : une erreur de retenue, d’alignement ou de signe peut changer le résultat.\n\n" +
      "Conclusion : vérifier permet de repérer et corriger les erreurs.",
    tags: ["entier_calcul_pose", "verification", "open", "raisonnement"],
  },

  /* =========================
     POSE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur vend 126 mangues le matin et 248 mangues l’après-midi. Combien de mangues a-t-il vendues au total ?",
    format: "short",
    expected: ["374"],
    comparator: "number_equal",
    hint: "Il faut additionner les deux quantités.",
    explanation:
      "Définition : pour trouver un total, on utilise une addition.\n\n" +
      "Méthode : on pose 126 + 248 en alignant les unités, dizaines et centaines.\n\n" +
      "Calcul : 126 + 248 = 374.\n\n" +
      "Conclusion : le vendeur a vendu 374 mangues.",
    tags: ["entier_calcul_pose", "defi", "addition", "reunion"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Problème — marché",
      numbers: ["126", "248"],
      result: "374",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_1_probleme_partage",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "C’est une situation de partage.",
    tags: ["entier_calcul_pose", "defi", "division", "probleme", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6]);
      const quotient = randomChoice([12, 15, 18]);
      const reste = randomInt(0, diviseur - 1);
      const total = diviseur * quotient + reste;

      return {
        text: `${total} cartes sont réparties équitablement entre ${diviseur} élèves. Combien de cartes reçoit chaque élève ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation:
          "Définition : une situation de partage se résout avec une division.\n\n" +
          "Méthode : on cherche combien chaque élève reçoit.\n\n" +
          `Calcul : ${total} ÷ ${diviseur} = ${quotient} reste ${reste}.\n\n` +
          `Conclusion : chaque élève reçoit ${quotient} cartes.`,
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Problème de partage",
          numbers: [String(total), String(diviseur)],
          division: {
            dividende: String(total),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade trouve un résultat différent du tien dans un calcul posé. Que peux-tu faire pour vérifier qui a raison ?",
    format: "open",
    expected: ["vérifier", "retenue", "alignement", "opération inverse", "recalculer"],
    comparator: "contains_keyword",
    hint: "Cherche les erreurs possibles : alignement, retenues, opération inverse.",
    explanation:
      "Définition : vérifier un calcul permet de contrôler la validité d’un résultat.\n\n" +
      "Méthode : on peut refaire le calcul, vérifier les retenues, contrôler l’alignement et utiliser une opération inverse.\n\n" +
      "Observation : deux résultats différents indiquent qu’au moins un calcul doit être vérifié.\n\n" +
      "Conclusion : on doit raisonner et vérifier avant de décider qui a raison.",
    tags: ["entier_calcul_pose", "defi", "open", "verification", "raisonnement"],
  },
    /* =========================
     RENFORT — CALCUL POSÉ 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_open_2_estimer",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Avant de poser une addition, pourquoi peut-il être utile d’estimer le résultat ?",
    format: "open",
    expected: ["estimer", "ordre de grandeur", "vérifier", "erreur", "résultat"],
    comparator: "contains_keyword",
    hint: "Une estimation aide à repérer un résultat impossible.",
    explanation:
      "Définition : estimer un résultat, c’est chercher un ordre de grandeur avant le calcul exact.\n\n" +
      "Méthode : on arrondit les nombres pour prévoir environ le résultat.\n\n" +
      "Observation : si le résultat exact est très loin de l’estimation, il faut vérifier le calcul.\n\n" +
      "Conclusion : estimer aide à repérer les erreurs.",
    tags: ["entier_calcul_pose", "addition", "open", "estimation", "verification"],
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_3_trouver_erreur",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare avec l’addition correcte.",
    tags: ["entier_calcul_pose", "addition", "erreur", "template", "canvas"],
    generate: () => {
      const a = randomChoice([348, 576, 689]);
      const b = randomChoice([275, 186, 247]);
      const correct = a + b;
      const wrong = correct - 10;

      return {
        text: `Un élève affirme que ${a} + ${b} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : vérifier une addition permet de contrôler le résultat.\n\n" +
          "Méthode : on refait l’addition colonne par colonne.\n\n" +
          `Calcul : ${a} + ${b} = ${correct}, et non ${wrong}.\n\n` +
          "Conclusion : l’élève s’est trompé.",
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Vérifier une addition",
          numbers: [String(a), String(b)],
          result: String(correct),
          questionLabel: "Compare le résultat annoncé au résultat correct.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_erreur_2_sens",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 235 - 487. Que dois-tu remarquer avant de poser la soustraction en 6e ?",
    format: "open",
    expected: ["235", "487", "plus petit", "plus grand", "impossible"],
    comparator: "contains_keyword",
    hint: "Compare les deux nombres avant de soustraire.",
    explanation:
      "Définition : en 6e, on travaille souvent les soustractions où le premier nombre est plus grand que le second.\n\n" +
      "Méthode : avant de poser, on compare les deux nombres.\n\n" +
      "Observation : 235 est plus petit que 487.\n\n" +
      "Conclusion : cette soustraction ne donne pas un nombre entier positif.",
    tags: ["entier_calcul_pose", "soustraction", "open", "comparaison", "erreur"],
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_3_verifier_addition",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne le résultat et le nombre soustrait.",
    tags: ["entier_calcul_pose", "soustraction", "verification", "template", "canvas"],
    generate: () => {
      const b = randomChoice([128, 236, 349]);
      const result = randomChoice([217, 325, 416]);
      const a = b + result;

      return {
        text: `Vérifie la soustraction : ${a} - ${b} = ${result}. Quelle opération inverse utilise-t-on ?`,
        format: "qcm",
        choices: shuffle([
          `${result} + ${b} = ${a}`,
          `${a} + ${b} = ${result}`,
          `${result} - ${b} = ${a}`,
          `${b} × ${result} = ${a}`,
        ]),
        expected: [`${result} + ${b} = ${a}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’opération inverse de la soustraction est l’addition.\n\n" +
          "Méthode : on additionne le résultat et le nombre soustrait.\n\n" +
          `Calcul : ${result} + ${b} = ${a}.\n\n` +
          "Conclusion : la soustraction est vérifiée.",
        canvas: calculPoseCanvas({
          operation: "soustraction",
          title: "Soustraction vérifiée par addition",
          numbers: [String(a), String(b)],
          result: String(result),
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_open_2_estimer",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi estimer le résultat d’une multiplication peut aider à repérer une erreur.",
    format: "open",
    expected: ["estimer", "ordre de grandeur", "multiplication", "erreur", "vérifier"],
    comparator: "contains_keyword",
    hint: "Par exemple, 198 × 4 est proche de 200 × 4.",
    explanation:
      "Définition : estimer, c’est chercher un résultat approché.\n\n" +
      "Méthode : on arrondit un nombre pour calculer mentalement un ordre de grandeur.\n\n" +
      "Calcul : par exemple, 198 × 4 est proche de 200 × 4 = 800.\n\n" +
      "Conclusion : si le résultat trouvé est très loin de 800, il faut vérifier.",
    tags: ["entier_calcul_pose", "multiplication", "open", "estimation", "verification"],
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_3_par_10_100",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 10 ajoute un zéro à un nombre entier.",
    tags: ["entier_calcul_pose", "multiplication", "10_100", "template"],
    generate: () => {
      const a = randomChoice([23, 45, 68, 104]);
      const b = randomChoice([10, 100]);
      const result = a * b;

      return {
        text: `Calcule : ${a} × ${b}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : multiplier par 10 ou 100 change le rang des chiffres.\n\n" +
          "Méthode : pour un nombre entier, on ajoute un ou deux zéros.\n\n" +
          `Calcul : ${a} × ${b} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_erreur_1_reste_trop_grand",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 47 ÷ 5 = 8 reste 7. Pourquoi cette division est-elle incorrecte ?",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "5", "7"],
    comparator: "contains_keyword",
    hint: "Le reste doit être plus petit que le diviseur.",
    explanation:
      "Définition : dans une division euclidienne, le reste doit être plus petit que le diviseur.\n\n" +
      "Méthode : on vérifie le reste.\n\n" +
      "Calcul : ici, le reste 7 est plus grand que le diviseur 5.\n\n" +
      "Conclusion : la division est incorrecte.",
    tags: ["entier_calcul_pose", "division", "open", "erreur", "reste"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Reste trop grand",
      numbers: ["47", "5"],
      division: {
        dividende: "47",
        diviseur: "5",
        quotient: "8",
        reste: "7",
      },
      questionLabel: "Le reste doit être inférieur au diviseur.",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_3_verification",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise : dividende = diviseur × quotient + reste.",
    tags: ["entier_calcul_pose", "division", "verification", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7]);
      const quotient = randomChoice([8, 9, 10, 11]);
      const reste = randomInt(0, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Quelle égalité vérifie la division : ${dividende} ÷ ${diviseur} = ${quotient} reste ${reste} ?`,
        format: "qcm",
        choices: shuffle([
          `${dividende} = ${diviseur} × ${quotient} + ${reste}`,
          `${dividende} = ${diviseur} + ${quotient} + ${reste}`,
          `${dividende} = ${quotient} × ${reste} + ${diviseur}`,
          `${dividende} = ${diviseur} × ${reste} + ${quotient}`,
        ]),
        expected: [`${dividende} = ${diviseur} × ${quotient} + ${reste}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une division euclidienne se vérifie avec dividende = diviseur × quotient + reste.\n\n" +
          "Méthode : on remplace par les nombres de l’énoncé.\n\n" +
          `Calcul : ${diviseur} × ${quotient} + ${reste} = ${dividende}.\n\n` +
          "Conclusion : l’égalité correcte vérifie la division.",
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Vérifier une division",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_2_doute",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 5,
    theme: "neutral",
    text: "Un résultat te paraît étrange. Quelles vérifications peux-tu faire avant de le valider ?",
    format: "open",
    expected: ["estimer", "refaire", "opération inverse", "retenue", "alignement"],
    comparator: "contains_keyword",
    hint: "Pense à l’estimation, aux retenues et aux opérations inverses.",
    explanation:
      "Définition : vérifier un calcul, c’est contrôler sa cohérence.\n\n" +
      "Méthode : on peut estimer, refaire le calcul, vérifier les retenues, l’alignement ou utiliser une opération inverse.\n\n" +
      "Observation : ces vérifications permettent de repérer une erreur.\n\n" +
      "Conclusion : on ne valide pas un résultat sans contrôle.",
    tags: ["entier_calcul_pose", "verification", "open", "doute_raisonnable"],
  },

  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_2_choisir_operation",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche si on regroupe, enlève, multiplie ou partage.",
    tags: ["entier_calcul_pose", "defi", "choisir_operation", "template"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "Un collège reçoit 128 livres puis 247 autres livres. Quelle opération faut-il utiliser pour trouver le total ?",
          expected: "addition",
          choices: ["addition", "soustraction", "division", "multiplication"],
          explanation: "On regroupe deux quantités, donc on utilise une addition.",
        },
        {
          text: "Une réserve contient 450 cahiers. On en distribue 175. Quelle opération faut-il utiliser pour savoir combien il en reste ?",
          expected: "soustraction",
          choices: ["addition", "soustraction", "division", "multiplication"],
          explanation: "On enlève une quantité, donc on utilise une soustraction.",
        },
        {
          text: "On prépare 24 sacs avec 6 stylos dans chaque sac. Quelle opération faut-il utiliser pour trouver le nombre total de stylos ?",
          expected: "multiplication",
          choices: ["addition", "soustraction", "division", "multiplication"],
          explanation: "On répète la même quantité plusieurs fois, donc on utilise une multiplication.",
        },
        {
          text: "On partage 96 feuilles également entre 8 groupes. Quelle opération faut-il utiliser ?",
          expected: "division",
          choices: ["addition", "soustraction", "division", "multiplication"],
          explanation: "On partage une quantité, donc on utilise une division.",
        },
      ]);

      return {
        text: situation.text,
        format: "qcm",
        choices: shuffle(situation.choices),
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : choisir l’opération consiste à comprendre le sens du problème.\n\n" +
          "Méthode : on repère si l’on regroupe, enlève, répète ou partage.\n\n" +
          `Observation : ${situation.explanation}\n\n` +
          `Conclusion : il faut utiliser une ${situation.expected}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_2_expliquer_choix",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi comprendre le problème est nécessaire avant de poser une opération.",
    format: "open",
    expected: ["comprendre", "opération", "addition", "soustraction", "choisir"],
    comparator: "contains_keyword",
    hint: "On ne pose pas une opération au hasard.",
    explanation:
      "Définition : un problème demande de choisir l’opération adaptée à la situation.\n\n" +
      "Méthode : on lit la question, on repère les données utiles et on comprend l’action demandée.\n\n" +
      "Observation : si on choisit la mauvaise opération, le calcul peut être juste mais la réponse fausse.\n\n" +
      "Conclusion : comprendre le problème est nécessaire avant de calculer.",
    tags: ["entier_calcul_pose", "defi", "open", "raisonnement", "choix_operation"],
  },
    /* =========================
     RENFORT FINAL — LANGAGE ET CONTRÔLE
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_open_3_rangs",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le chiffre des unités, le chiffre des dizaines et le chiffre des centaines dans une addition posée.",
    format: "open",
    expected: ["unités", "dizaines", "centaines", "rang", "aligner"],
    comparator: "contains_keyword",
    hint: "Chaque chiffre n’a pas la même valeur selon sa position.",
    explanation:
      "Définition : le rang d’un chiffre indique sa valeur dans le nombre.\n\n" +
      "Méthode : dans une addition posée, on aligne les chiffres de même rang.\n\n" +
      "Observation : les unités valent 1, les dizaines valent 10 et les centaines valent 100.\n\n" +
      "Conclusion : connaître les rangs permet de poser correctement l’addition.",
    tags: ["entier_calcul_pose", "addition", "open", "rangs", "langage"],
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_4_nombre_decimal_simples",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Aligne les virgules pour additionner des nombres décimaux.",
    tags: ["entier_calcul_pose", "addition", "decimal_nombre", "template", "canvas"],
    generate: () => {
      const a = randomChoice([12.5, 23.4, 45.2, 61.7]);
      const b = randomChoice([3.2, 14.5, 21.6, 8.1]);
      const result = Number((a + b).toFixed(1));

      return {
        text: `Calcule : ${String(a).replace(".", ",")} + ${String(b).replace(".", ",")}.`,
        format: "short",
        expected: [String(result).replace(".", ","), String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : additionner des décimaux demande d’aligner les chiffres de même rang.\n\n" +
          "Méthode : on aligne les virgules, puis on additionne colonne par colonne.\n\n" +
          `Calcul : ${String(a).replace(".", ",")} + ${String(b).replace(".", ",")} = ${String(result).replace(".", ",")}.\n\n` +
          `Conclusion : le résultat est ${String(result).replace(".", ",")}.`,
        canvas: calculPoseCanvas({
          operation: "addition",
          title: "Addition de décimaux",
          numbers: [String(a).replace(".", ","), String(b).replace(".", ",")],
          result: String(result).replace(".", ","),
          questionLabel: "Avec les décimaux, on aligne les virgules.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_open_3_operation_inverse",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi dit-on que l’addition peut être l’opération inverse d’une soustraction ?",
    format: "open",
    expected: ["addition", "soustraction", "inverse", "vérifier", "résultat"],
    comparator: "contains_keyword",
    hint: "Si tu enlèves puis que tu remets, tu retrouves le nombre de départ.",
    explanation:
      "Définition : deux opérations sont inverses lorsqu’elles permettent de revenir au nombre de départ.\n\n" +
      "Méthode : après une soustraction, on peut ajouter le nombre soustrait.\n\n" +
      "Calcul : si 584 - 231 = 353, alors 353 + 231 = 584.\n\n" +
      "Conclusion : l’addition permet de vérifier et d’inverser la soustraction.",
    tags: ["entier_calcul_pose", "soustraction", "open", "operation_inverse"],
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_4_trouver_nombre_depart",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise l’opération inverse : résultat + nombre soustrait.",
    tags: ["entier_calcul_pose", "soustraction", "operation_inverse", "template"],
    generate: () => {
      const removed = randomChoice([125, 236, 348, 417]);
      const result = randomChoice([230, 315, 426, 512]);
      const start = removed + result;

      return {
        text: `Après avoir retiré ${removed}, il reste ${result}. Quel était le nombre de départ ?`,
        format: "short",
        expected: [String(start)],
        comparator: "number_equal",
        explanation:
          "Définition : pour retrouver le nombre de départ après une soustraction, on utilise l’opération inverse.\n\n" +
          "Méthode : on additionne ce qui reste et ce qui a été retiré.\n\n" +
          `Calcul : ${result} + ${removed} = ${start}.\n\n` +
          `Conclusion : le nombre de départ était ${start}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_open_3_sens",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une multiplication peut remplacer une addition répétée.",
    format: "open",
    expected: ["addition", "répétée", "fois", "multiplication", "même"],
    comparator: "contains_keyword",
    hint: "Par exemple, 4 + 4 + 4 peut s’écrire 3 × 4.",
    explanation:
      "Définition : une multiplication correspond souvent à une addition répétée du même nombre.\n\n" +
      "Méthode : on repère combien de fois la même quantité est répétée.\n\n" +
      "Calcul : 4 + 4 + 4 = 3 × 4.\n\n" +
      "Conclusion : la multiplication permet d’écrire plus rapidement une addition répétée.",
    tags: ["entier_calcul_pose", "multiplication", "open", "sens_operation"],
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_4_probleme_repetition",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Même quantité répétée plusieurs fois : c’est une multiplication.",
    tags: ["entier_calcul_pose", "multiplication", "probleme", "reunion", "template", "canvas"],
    generate: () => {
      const sacs = randomChoice([12, 15, 18, 24]);
      const fruits = randomChoice([6, 8, 9]);
      const total = sacs * fruits;

      return {
        text: `Au marché, il y a ${sacs} sacs contenant chacun ${fruits} fruits. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : lorsqu’une même quantité est répétée plusieurs fois, on peut utiliser une multiplication.\n\n" +
          "Méthode : on multiplie le nombre de sacs par le nombre de fruits dans chaque sac.\n\n" +
          `Calcul : ${sacs} × ${fruits} = ${total}.\n\n` +
          `Conclusion : il y a ${total} fruits au total.`,
        canvas: calculPoseCanvas({
          operation: "multiplication",
          title: "Problème — marché",
          numbers: [String(sacs), String(fruits)],
          result: String(total),
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_open_2_quotient_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce que représentent le quotient et le reste dans une division euclidienne.",
    format: "open",
    expected: ["quotient", "reste", "division", "partage", "ce qui reste"],
    comparator: "contains_keyword",
    hint: "Le quotient est ce qu’on obtient pour chaque part ; le reste est ce qui ne peut pas être partagé.",
    explanation:
      "Définition : dans une division euclidienne, le quotient indique le nombre de parts complètes et le reste indique ce qui reste.\n\n" +
      "Méthode : on interprète la division comme un partage ou un groupement.\n\n" +
      "Observation : le reste doit être plus petit que le diviseur.\n\n" +
      "Conclusion : quotient et reste permettent de décrire précisément le résultat de la division.",
    tags: ["entier_calcul_pose", "division", "open", "quotient", "reste"],
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_4_interpreter_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Le reste correspond aux objets qui ne peuvent pas être répartis équitablement.",
    tags: ["entier_calcul_pose", "division", "reste", "interpretation", "template", "canvas"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6]);
      const quotient = randomChoice([7, 8, 9]);
      const reste = randomInt(1, groupes - 1);
      const total = groupes * quotient + reste;

      return {
        text: `${total} objets sont partagés équitablement entre ${groupes} groupes. Que représente le reste ${reste} ?`,
        format: "qcm",
        choices: shuffle([
          `${reste} objet(s) qui ne peuvent pas être répartis équitablement`,
          `${reste} groupe(s) en plus`,
          `${reste} objet(s) dans chaque groupe`,
          "le nombre total d’objets",
        ]),
        expected: [`${reste} objet(s) qui ne peuvent pas être répartis équitablement`],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une division euclidienne, le reste correspond à ce qui n’est pas réparti dans les parts complètes.\n\n" +
          "Méthode : on interprète le quotient et le reste dans le contexte du problème.\n\n" +
          `Calcul : ${total} ÷ ${groupes} = ${quotient} reste ${reste}.\n\n` +
          `Conclusion : le reste ${reste} représente les objets qui ne peuvent pas être répartis équitablement.`,
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Interpréter le reste",
          numbers: [String(total), String(groupes)],
          division: {
            dividende: String(total),
            diviseur: String(groupes),
            quotient: String(quotient),
            reste: String(reste),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_3_expliquer_erreur",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève trouve un résultat faux mais sa méthode semble correcte. Explique pourquoi il faut vérifier les détails du calcul.",
    format: "open",
    expected: ["retenue", "alignement", "détail", "erreur", "vérifier"],
    comparator: "contains_keyword",
    hint: "Une petite erreur dans une colonne peut changer tout le résultat.",
    explanation:
      "Définition : un calcul posé dépend de plusieurs étapes précises.\n\n" +
      "Méthode : on vérifie les alignements, les retenues et chaque colonne.\n\n" +
      "Observation : une méthode correcte peut donner un résultat faux si une petite erreur est faite.\n\n" +
      "Conclusion : vérifier les détails permet de corriger le calcul.",
    tags: ["entier_calcul_pose", "verification", "open", "erreur", "rigueur"],
  },

  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_2_estimation_qcm",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Arrondis pour trouver un ordre de grandeur.",
    tags: ["entier_calcul_pose", "verification", "estimation", "template"],
    generate: () => {
      const a = randomChoice([198, 302, 489, 612]);
      const b = randomChoice([203, 297, 411, 388]);
      const exact = a + b;
      const approx = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;

      return {
        text: `Avant de calculer exactement ${a} + ${b}, quel ordre de grandeur est raisonnable ?`,
        format: "qcm",
        choices: shuffle([
          `environ ${approx}`,
          `environ ${approx + 1000}`,
          "environ 10",
          `environ ${Math.max(0, approx - 1000)}`,
        ]),
        expected: [`environ ${approx}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ordre de grandeur est une estimation du résultat.\n\n" +
          "Méthode : on arrondit les nombres pour calculer rapidement.\n\n" +
          `Calcul : ${a} + ${b} = ${exact}, ce qui est proche de ${approx}.\n\n` +
          `Conclusion : un ordre de grandeur raisonnable est environ ${approx}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_3_rediger_reponse",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Après un calcul posé dans un problème, pourquoi faut-il écrire une phrase-réponse ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne suffit pas toujours à répondre au problème.",
    explanation:
      "Définition : une phrase-réponse relie le calcul au contexte du problème.\n\n" +
      "Méthode : on reprend les mots de la question et on ajoute l’unité si nécessaire.\n\n" +
      "Observation : un résultat numérique seul peut être incomplet.\n\n" +
      "Conclusion : la phrase-réponse permet de conclure clairement.",
    tags: ["entier_calcul_pose", "defi", "open", "redaction", "conclusion"],
  },]