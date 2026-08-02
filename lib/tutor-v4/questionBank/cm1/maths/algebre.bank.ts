// lib/tutor-v4/question-banks/maths/cm1/algebre.bank.ts

import type {
  TutorBankItemV4,
  SchemaBarreCanvasData,
  StatGraphCanvasData,
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

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function schemaBarreCanvas(
  data: Omit<SchemaBarreCanvasData, "kind">
): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    ...data,
  };
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

export const algebreBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre remplace l'étoile ? ★ × 4 = 36",
    format: "qcm",
    choices: ["9","8","32","40"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Fais l'opération inverse de la multiplication.",
    explanation: "On divise : 36 ÷ 4 = 9. On vérifie : 9 × 4 = 36.",
    tags: ["cm1","algebre","algebre_nombre_inconnu","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Le motif 3 ; 6 ; 9 ; 12 suit une règle. Quel est le nombre suivant ?",
    format: "qcm",
    choices: ["15","13","18","14"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Trouve la règle qui se répète, puis continue.",
    explanation: "On ajoute 3 à chaque fois : 12 + 3 = 15.",
    tags: ["cm1","algebre","algebre_motif","guide","qcm"],
  },

  // ============================================================
  // ALGEBRE_EGALITE
  // Comprendre une égalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_egalite_fixed_001_equilibre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie le signe = dans une égalité ?",
    format: "qcm",
    choices: [
      "les deux côtés ont la même valeur",
      "il faut toujours additionner",
      "le nombre de gauche est plus grand",
      "le calcul est terminé",
    ],
    expected: ["les deux côtés ont la même valeur"],
    comparator: "mcq_exact",
    hint: "Le signe = fonctionne comme une balance équilibrée.",
    explanation: exp(
      "Une égalité indique que deux expressions ont la même valeur.",
      "On peut imaginer une balance : le côté gauche et le côté droit doivent être équilibrés.",
      "Par exemple, 7 + 3 = 10 car les deux côtés valent 10.",
      "Le signe = signifie donc que les deux côtés ont la même valeur."
    ),
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "definition",
      "equilibre",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_egalite_fixed_002_vrai_faux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "L’égalité 8 + 4 = 10 + 2 est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule chaque côté séparément.",
    explanation: exp(
      "Pour vérifier une égalité, on compare la valeur du côté gauche et du côté droit.",
      "On calcule chaque côté séparément.",
      "8 + 4 = 12 et 10 + 2 = 12.",
      "Les deux côtés valent 12, donc l’égalité est vraie."
    ),
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "vrai_faux",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_egalite_open_001_expliquer_fausse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi l’égalité 9 + 5 = 20 - 4 est fausse.",
    format: "open",
    expected: ["9", "5", "14", "20", "4", "16"],
    comparator: "contains_keyword",
    hint: "Calcule les deux côtés séparément.",
    explanation: exp(
      "Une égalité est fausse si les deux côtés n’ont pas la même valeur.",
      "On calcule le côté gauche, puis le côté droit.",
      "9 + 5 = 14 alors que 20 - 4 = 16.",
      "Les deux côtés ne valent pas le même nombre, donc l’égalité est fausse."
    ),
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "open",
      "expliquer",
      "erreur",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_001_vrai_addition_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    hint: "Calcule les deux côtés.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "addition",
      "vrai",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([12, 15, 18, 20, 24, 30]);
      const a = randomInt(2, total - 2);
      const b = total - a;
      const c = randomInt(2, total - 2);
      const d = total - c;

      return {
        text: `L’égalité ${a} + ${b} = ${c} + ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité est vraie si les deux côtés ont la même valeur.",
          "On calcule séparément le côté gauche et le côté droit.",
          `${a} + ${b} = ${total} et ${c} + ${d} = ${total}.`,
          "Les deux côtés sont égaux, donc l’égalité est vraie."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_002_fausse_addition_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Une égalité fausse n’a pas la même valeur des deux côtés.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "addition",
      "faux",
      "qcm",
      "template",
    ],
    generate: () => {
      const gauche = randomChoice([12, 15, 18, 24, 30]);
      const droite = gauche + randomChoice([1, 2, 3, 5]);

      const a = randomInt(2, gauche - 2);
      const b = gauche - a;
      const c = randomInt(2, droite - 2);
      const d = droite - c;

      return {
        text: `L’égalité ${a} + ${b} = ${c} + ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité est vraie seulement si les deux côtés ont la même valeur.",
          "On calcule les deux côtés séparément.",
          `${a} + ${b} = ${gauche}, mais ${c} + ${d} = ${droite}.`,
          "Les deux côtés sont différents, donc l’égalité est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_003_addition_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare la valeur du côté gauche et du côté droit.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "addition",
      "soustraction",
      "qcm",
      "template",
    ],
    generate: () => {
      const value = randomChoice([10, 12, 15, 18, 20, 25]);
      const a = randomInt(2, value - 2);
      const b = value - a;

      const c = value + randomChoice([4, 5, 6, 8, 10]);
      const d = c - value;

      return {
        text: `L’égalité ${a} + ${b} = ${c} - ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité peut contenir des opérations différentes de chaque côté.",
          "Il faut seulement vérifier que les deux côtés ont la même valeur.",
          `${a} + ${b} = ${value} et ${c} - ${d} = ${value}.`,
          "Les deux côtés valent le même nombre, donc l’égalité est vraie."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_004_multiplication_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Une multiplication peut avoir la même valeur qu’une addition.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "multiplication",
      "addition",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 8]);
      const b = randomChoice([2, 3, 4, 5]);
      const product = a * b;

      const c = randomInt(2, product - 2);
      const d = product - c;

      return {
        text: `L’égalité ${a} × ${b} = ${c} + ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux écritures différentes peuvent représenter le même nombre.",
          "On calcule chaque côté de l’égalité.",
          `${a} × ${b} = ${product} et ${c} + ${d} = ${product}.`,
          "Les deux côtés ont la même valeur, donc l’égalité est vraie."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_005_choisir_egalite_vraie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la proposition où les deux côtés valent le même nombre.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "choisir",
      "qcm",
      "template",
    ],
    generate: () => {
      const value = randomChoice([12, 15, 18, 20, 24]);
      const a = randomInt(2, value - 2);
      const b = value - a;

      const c = randomInt(2, value - 2);
      const d = value - c;

      const correct = `${a} + ${b} = ${c} + ${d}`;

      return {
        text: "Quelle égalité est vraie ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} + ${b} = ${c} + ${d + 1}`,
          `${a} + ${b} = ${c + 2} + ${d}`,
          `${a} + ${b + 3} = ${c} + ${d}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité vraie a la même valeur à gauche et à droite.",
          "On teste les propositions en calculant les deux côtés.",
          `${a} + ${b} = ${value} et ${c} + ${d} = ${value}.`,
          `L’égalité vraie est donc : ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_006_choisir_signe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux valeurs.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "comparer",
      "qcm",
      "template",
    ],
    generate: () => {
      const gauche = randomChoice([12, 15, 18, 21, 24]);
      const droite = gauche + randomChoice([-3, -2, 0, 2, 3]);

      const a = randomInt(2, gauche - 2);
      const b = gauche - a;
      const c = randomInt(2, droite - 2);
      const d = droite - c;

      const correct = gauche === droite ? "=" : gauche > droite ? ">" : "<";

      return {
        text: `Complète avec le bon signe : ${a} + ${b} ... ${c} + ${d}`,
        format: "qcm",
        choices: ["=", ">", "<"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux expressions, c’est calculer leur valeur puis choisir le bon signe.",
          "On calcule le côté gauche et le côté droit.",
          `${a} + ${b} = ${gauche} et ${c} + ${d} = ${droite}.`,
          `Le bon signe est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_007_open_expliquer_vraie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique en calculant les deux côtés.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "open",
      "expliquer",
      "template",
    ],
    generate: () => {
      const value = randomChoice([12, 15, 18, 20, 24]);
      const a = randomInt(2, value - 2);
      const b = value - a;
      const c = randomInt(2, value - 2);
      const d = value - c;

      return {
        text: `Explique pourquoi l’égalité ${a} + ${b} = ${c} + ${d} est vraie.`,
        format: "open",
        expected: [
          String(a),
          String(b),
          String(c),
          String(d),
          String(value),
          "même",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une égalité est vraie quand les deux côtés ont la même valeur.",
          "Pour le montrer, on calcule séparément le côté gauche et le côté droit.",
          `${a} + ${b} = ${value} et ${c} + ${d} = ${value}.`,
          "Les deux côtés valent le même nombre, donc l’égalité est vraie."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_008_open_expliquer_fausse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Montre que les deux côtés ne valent pas le même nombre.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "open",
      "erreur",
      "template",
    ],
    generate: () => {
      const gauche = randomChoice([12, 15, 18, 20, 24]);
      const droite = gauche + randomChoice([2, 3, 4]);

      const a = randomInt(2, gauche - 2);
      const b = gauche - a;
      const c = randomInt(2, droite - 2);
      const d = droite - c;

      return {
        text: `Explique pourquoi l’égalité ${a} + ${b} = ${c} + ${d} est fausse.`,
        format: "open",
        expected: [
          String(a),
          String(b),
          String(c),
          String(d),
          String(gauche),
          String(droite),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une égalité est fausse quand les deux côtés n’ont pas la même valeur.",
          "On le vérifie en calculant séparément chaque côté.",
          `${a} + ${b} = ${gauche}, alors que ${c} + ${d} = ${droite}.`,
          "Les deux résultats sont différents, donc l’égalité est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_egalite_tpl_009_reunion_equilibre_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare les deux lots de fruits.",
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "reunion",
      "marche",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([12, 15, 18, 20, 24]);
      const mangues = randomInt(2, total - 2);
      const letchis = total - mangues;

      const bananes = randomInt(2, total - 2);
      const ananas = total - bananes;

      return {
        text: `Au marché de Saint-Pierre, un lot contient ${mangues} mangues et ${letchis} letchis. Un autre lot contient ${bananes} bananes et ${ananas} ananas. Les deux lots ont-ils le même nombre de fruits ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux lots revient à vérifier une égalité.",
          "On calcule le nombre de fruits dans chaque lot.",
          `${mangues} + ${letchis} = ${total} et ${bananes} + ${ananas} = ${total}.`,
          "Les deux lots ont le même nombre de fruits."
        ),
      };
    },
  },
    // ============================================================
  // ALGEBRE_COMPLETER_EGALITE
  // Compléter une égalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_completer_egalite_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : 18 + ? = 25",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche ce qu’il faut ajouter à 18 pour obtenir 25.",
    explanation: exp(
      "Compléter une égalité, c’est trouver le nombre qui rend les deux côtés égaux.",
      "On cherche le nombre manquant dans 18 + ? = 25.",
      "25 - 18 = 7, donc 18 + 7 = 25.",
      "Le nombre manquant est 7."
    ),
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "addition",
      "nombre_manquant",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_completer_egalite_fixed_002_modele_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Dans une égalité avec un facteur manquant, on cherche le nombre qui rend le produit correct.",
      "On peut utiliser les tables de multiplication ou l’opération inverse.",
      "42 ÷ 6 = 7, donc 6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "multiplication",
      "nombre_manquant",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_completer_egalite_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment compléter l’égalité : 35 - ? = 20",
    format: "open",
    expected: ["35", "20", "15", "soustraction", "manquant"],
    comparator: "contains_keyword",
    hint: "Cherche ce qu’on enlève à 35 pour obtenir 20.",
    explanation: exp(
      "Compléter une égalité demande de comprendre le rôle du nombre manquant.",
      "Ici, on cherche ce qu’il faut enlever à 35 pour obtenir 20.",
      "35 - 20 = 15, donc 35 - 15 = 20.",
      "Le nombre manquant est 15."
    ),
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "open",
      "expliquer",
      "soustraction",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_001_addition_manquant_fin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qu’il faut ajouter.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "addition",
      "template",
      "short",
    ],
    generate: () => {
      const a = randomChoice([12, 15, 18, 24, 35, 48]);
      const missing = randomChoice([5, 6, 7, 8, 9, 12, 15]);
      const total = a + missing;

      return {
        text: `Complète l’égalité : ${a} + ? = ${total}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "On complète l’égalité en trouvant le nombre qui manque.",
          "Quand on cherche ce qu’il faut ajouter, on peut faire une soustraction.",
          `${total} - ${a} = ${missing}, donc ${a} + ${missing} = ${total}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_002_addition_manquant_debut",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "L’ordre des termes ne change pas la somme.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "addition",
      "template",
      "short",
    ],
    generate: () => {
      const b = randomChoice([8, 12, 15, 20, 25, 36]);
      const missing = randomChoice([4, 5, 7, 9, 12, 14]);
      const total = missing + b;

      return {
        text: `Complète l’égalité : ? + ${b} = ${total}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une addition, le nombre manquant peut être placé au début.",
          "On cherche le nombre qui, ajouté à l’autre terme, donne le total.",
          `${total} - ${b} = ${missing}, donc ${missing} + ${b} = ${total}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_003_soustraction_manquant_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule la soustraction.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "soustraction",
      "template",
      "short",
    ],
    generate: () => {
      const a = randomChoice([35, 48, 60, 75, 90, 120]);
      const b = randomChoice([8, 12, 15, 24, 36]);
      const result = a - b;

      return {
        text: `Complète l’égalité : ${a} - ${b} = ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une égalité peut simplement demander de calculer le résultat.",
          "On effectue la soustraction indiquée.",
          `${a} - ${b} = ${result}.`,
          `Le nombre manquant est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_004_soustraction_manquant_milieu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce qu’on enlève au nombre de départ.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "soustraction",
      "nombre_manquant",
      "template",
      "short",
    ],
    generate: () => {
      const start = randomChoice([35, 48, 60, 75, 90, 120]);
      const result = randomChoice([12, 18, 24, 30, 45, 60]);
      const missing = start - result;

      return {
        text: `Complète l’égalité : ${start} - ? = ${result}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le nombre enlevé est inconnu, on cherche l’écart entre le départ et le résultat.",
          "On calcule ce qu’il faut enlever au nombre de départ.",
          `${start} - ${result} = ${missing}, donc ${start} - ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_005_multiplication_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les tables de multiplication.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "multiplication",
      "template",
      "short",
    ],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const product = a * missing;

      return {
        text: `Complète l’égalité : ${a} × ? = ${product}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication, on cherche le facteur manquant.",
          "On peut utiliser la table de multiplication ou faire une division.",
          `${product} ÷ ${a} = ${missing}, donc ${a} × ${missing} = ${product}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_006_division_manquant_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien de fois le diviseur rentre dans le nombre.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "division",
      "template",
      "short",
    ],
    generate: () => {
      const divisor = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const result = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const total = divisor * result;

      return {
        text: `Complète l’égalité : ${total} ÷ ${divisor} = ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une égalité avec une division peut demander de calculer le quotient.",
          "On cherche combien chaque part reçoit ou combien de groupes on obtient.",
          `${total} ÷ ${divisor} = ${result}.`,
          `Le nombre manquant est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_007_deux_cotes_equilibres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le côté déjà complet.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "equilibre",
      "template",
      "short",
    ],
    generate: () => {
      const leftA = randomChoice([12, 15, 18, 24, 30]);
      const leftB = randomChoice([4, 5, 6, 8, 10]);
      const total = leftA + leftB;

      const rightA = randomChoice([5, 8, 10, 12, 15]);
      const missing = total - rightA;

      return {
        text: `Complète l’égalité : ${leftA} + ${leftB} = ${rightA} + ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une égalité doit garder la même valeur des deux côtés.",
          "On calcule d’abord le côté complet, puis on cherche ce qui manque de l’autre côté.",
          `${leftA} + ${leftB} = ${total}. Il faut donc ${rightA} + ${missing} = ${total}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_008_qcm_nombre_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste les choix pour garder l’égalité vraie.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "qcm",
      "nombre_manquant",
      "template",
    ],
    generate: () => {
      const a = randomChoice([16, 20, 25, 30, 40]);
      const missing = randomChoice([5, 6, 8, 10, 12]);
      const total = a + missing;

      return {
        text: `Quel nombre complète l’égalité ${a} + ? = ${total} ?`,
        format: "qcm",
        choices: makeChoices(String(missing), [
          String(missing + 1),
          String(Math.max(0, missing - 1)),
          String(total),
        ]),
        expected: [String(missing)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour choisir le nombre manquant, on cherche celui qui rend l’égalité vraie.",
          "On peut soustraire le nombre connu au total.",
          `${total} - ${a} = ${missing}.`,
          `Le bon choix est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_009_qcm_erreur_frequente",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : le nombre manquant n’est pas forcément le résultat total.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "qcm",
      "erreur",
      "template",
    ],
    generate: () => {
      const a = randomChoice([18, 24, 36, 45]);
      const missing = randomChoice([6, 8, 9, 12]);
      const total = a + missing;
      const wrong = total;

      return {
        text: `Un élève dit que dans ${a} + ? = ${total}, le nombre manquant est ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une erreur fréquente consiste à confondre le total et le nombre manquant.",
          "Le nombre manquant est ce qu’il faut ajouter au nombre connu pour obtenir le total.",
          `${total} - ${a} = ${missing}, donc ${a} + ${missing} = ${total}.`,
          `L’élève n’a pas raison : le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_010_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "reunion",
    hint: "Les deux lots doivent avoir le même nombre de fruits.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "reunion",
      "marche",
      "template",
      "short",
    ],
    generate: () => {
      const total = randomChoice([18, 20, 24, 30]);
      const mangues = randomChoice([6, 8, 10, 12]);
      const letchis = total - mangues;

      const bananes = randomChoice([5, 7, 9, 11]);
      const missing = total - bananes;

      return {
        text: `Au marché de Saint-Pierre, un lot contient ${mangues} mangues et ${letchis} letchis. Un autre lot contient ${bananes} bananes et ? ananas. Combien faut-il d’ananas pour que les deux lots aient le même nombre de fruits ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche à rendre les deux lots égaux.",
          "On calcule d’abord le nombre de fruits du premier lot, puis on complète le second.",
          `${mangues} + ${letchis} = ${total}. Il faut donc ${bananes} + ${missing} = ${total}.`,
          `Il faut ${missing} ananas.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_011_open_demarche_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique comment tu trouves le nombre manquant.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "open",
      "demarche",
      "template",
    ],
    generate: () => {
      const a = randomChoice([18, 24, 36, 45]);
      const missing = randomChoice([6, 8, 9, 12]);
      const total = a + missing;

      return {
        text: `Explique comment compléter l’égalité : ${a} + ? = ${total}`,
        format: "open",
        expected: [String(a), String(total), String(missing), "soustraction"],
        comparator: "contains_keyword",
        explanation: exp(
          "Compléter une égalité demande de trouver ce qui manque pour garder l’équilibre.",
          "On peut utiliser l’opération inverse de l’addition : la soustraction.",
          `${total} - ${a} = ${missing}, donc ${a} + ${missing} = ${total}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_completer_egalite_tpl_012_open_demarche_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec une table ou une division.",
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "open",
      "multiplication",
      "template",
    ],
    generate: () => {
      const factor = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const missing = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const product = factor * missing;

      return {
        text: `Explique comment compléter l’égalité : ${factor} × ? = ${product}`,
        format: "open",
        expected: [
          String(factor),
          String(product),
          String(missing),
          "table",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une multiplication, compléter l’égalité revient à trouver le facteur manquant.",
          "On peut utiliser les tables ou faire une division.",
          `${product} ÷ ${factor} = ${missing}, donc ${factor} × ${missing} = ${product}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },
    // ============================================================
  // ALGEBRE_NOMBRE_INCONNU
  // Trouver un nombre inconnu
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui ajoute 8 et j’obtiens 23. Quel est ce nombre ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche le nombre de départ : fais l’opération inverse.",
    explanation: exp(
      "Trouver un nombre inconnu, c’est retrouver une valeur cachée.",
      "Quand on ajoute 8 pour obtenir 23, on fait l’opération inverse : on soustrait 8.",
      "23 - 8 = 15, donc 15 + 8 = 23.",
      "Le nombre inconnu est 15."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre inconnu",
      total: "23",
      parts: [
        { label: "Nombre", unknown: true },
        { label: "+ 8", value: "8" },
      ],
      questionLabel: "On cherche le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "addition",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_002_modele_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui enlève 6 et j’obtiens 19. Quel est ce nombre ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Si on a enlevé 6, il faut ajouter 6 pour revenir au départ.",
    explanation: exp(
      "Un nombre inconnu peut être retrouvé avec l’opération inverse.",
      "Si on enlève 6 et qu’on obtient 19, le nombre de départ était plus grand.",
      "19 + 6 = 25, donc 25 - 6 = 19.",
      "Le nombre inconnu est 25."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre inconnu",
      total: "?",
      parts: [
        { label: "Résultat", value: "19" },
        { label: "Enlevé", value: "6" },
      ],
      questionLabel: "On reconstitue le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "soustraction",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le nombre inconnu dans : ? + 12 = 40.",
    format: "open",
    expected: ["40", "12", "28", "soustraction", "inconnu"],
    comparator: "contains_keyword",
    hint: "Cherche ce qu’il faut ajouter à 12 pour arriver à 40.",
    explanation: exp(
      "Pour trouver un nombre inconnu, on cherche ce qui manque pour que l’égalité soit vraie.",
      "Dans ? + 12 = 40, on connaît le total et une partie.",
      "40 - 12 = 28, donc 28 + 12 = 40.",
      "Le nombre inconnu est 28."
    ),
    canvas: schemaBarreCanvas({
      title: "Schéma en barres",
      total: "40",
      parts: [
        { label: "?", unknown: true },
        { label: "Connu", value: "12" },
      ],
      questionLabel: "Total connu, partie inconnue.",
    }),
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "open",
      "expliquer",
      "schema_barre",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_001_addition_depart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais une soustraction pour revenir au nombre de départ.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "addition",
      "template",
      "short",
      "schema_barre",
      "canvas",
    ],
    generate: () => {
      const inconnu = randomChoice([12, 15, 18, 24, 36, 45]);
      const ajoute = randomChoice([5, 6, 8, 9, 12, 15]);
      const total = inconnu + ajoute;

      return {
        text: `Je pense à un nombre. Je lui ajoute ${ajoute} et j’obtiens ${total}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(inconnu)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche le nombre de départ.",
          "Comme on a ajouté une quantité, on utilise l’opération inverse : la soustraction.",
          `${total} - ${ajoute} = ${inconnu}, donc ${inconnu} + ${ajoute} = ${total}.`,
          `Le nombre inconnu est ${inconnu}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Nombre inconnu",
          total: String(total),
          parts: [
            { label: "Nombre", unknown: true },
            { label: `+ ${ajoute}`, value: String(ajoute) },
          ],
          questionLabel: "On cherche la partie manquante.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_002_soustraction_depart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Si on a enlevé une quantité, ajoute-la au résultat.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "soustraction",
      "template",
      "short",
      "schema_barre",
      "canvas",
    ],
    generate: () => {
      const resultat = randomChoice([12, 15, 18, 24, 36, 45]);
      const enleve = randomChoice([5, 6, 8, 9, 12, 15]);
      const depart = resultat + enleve;

      return {
        text: `Je pense à un nombre. Je lui enlève ${enleve} et j’obtiens ${resultat}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche le nombre de départ.",
          "Comme on a enlevé une quantité, on fait l’opération inverse : on ajoute.",
          `${resultat} + ${enleve} = ${depart}, donc ${depart} - ${enleve} = ${resultat}.`,
          `Le nombre inconnu est ${depart}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Nombre inconnu",
          total: String(depart),
          parts: [
            { label: "Résultat", value: String(resultat) },
            { label: "Enlevé", value: String(enleve) },
          ],
          questionLabel: "On retrouve le nombre de départ.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_003_multiplication_facteur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de multiplication.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "multiplication",
      "template",
      "short",
    ],
    generate: () => {
      const facteur = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const inconnu = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const produit = facteur * inconnu;

      return {
        text: `Je pense à un nombre. Je le multiplie par ${facteur} et j’obtiens ${produit}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(inconnu)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un nombre inconnu est multiplié, on peut utiliser l’opération inverse.",
          "On cherche le facteur manquant dans une multiplication.",
          `${produit} ÷ ${facteur} = ${inconnu}, donc ${inconnu} × ${facteur} = ${produit}.`,
          `Le nombre inconnu est ${inconnu}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_004_division_depart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "neutral",
    hint: "Si on partage le nombre, l’opération inverse est une multiplication.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "division",
      "template",
      "short",
    ],
    generate: () => {
      const diviseur = randomChoice([2, 3, 4, 5, 6, 8]);
      const resultat = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const depart = diviseur * resultat;

      return {
        text: `Je pense à un nombre. Je le divise par ${diviseur} et j’obtiens ${resultat}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un nombre est divisé, on retrouve le nombre de départ avec l’opération inverse.",
          "L’opération inverse de la division est la multiplication.",
          `${resultat} × ${diviseur} = ${depart}, donc ${depart} ÷ ${diviseur} = ${resultat}.`,
          `Le nombre inconnu est ${depart}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_005_partie_manquante_schema",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Total - partie connue = partie manquante.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "partie_manquante",
      "schema_barre",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([30, 36, 40, 48, 60, 75]);
      const connu = randomChoice([8, 12, 15, 18, 24, 30]);
      const inconnu = total - connu;

      return {
        text: `Dans une boîte, il y a ${total} objets en tout. On sait qu’il y a ${connu} objets rouges. Les autres sont bleus. Combien y a-t-il d’objets bleus ?`,
        format: "short",
        expected: [String(inconnu)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on connaît le total et une partie, on peut trouver l’autre partie.",
          "On soustrait la partie connue au total.",
          `${total} - ${connu} = ${inconnu}.`,
          `Il y a ${inconnu} objets bleus.`
        ),
        canvas: schemaBarreCanvas({
          title: "Total et partie manquante",
          total: String(total),
          parts: [
            { label: "Rouges", value: String(connu) },
            { label: "Bleus", unknown: true },
          ],
          questionLabel: "On cherche la partie bleue.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_006_complement_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche combien il manque pour atteindre le total.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "reunion",
      "marche",
      "schema_barre",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([24, 30, 36, 40, 48]);
      const mangues = randomChoice([8, 10, 12, 15, 18]);
      const letchis = total - mangues;

      return {
        text: `Au marché de Saint-Pierre, un panier contient ${total} fruits. Il y a ${mangues} mangues et des letchis. Combien y a-t-il de letchis ?`,
        format: "short",
        expected: [String(letchis)],
        comparator: "number_equal",
        explanation: exp(
          "On connaît le nombre total de fruits et une partie du panier.",
          "Pour trouver la partie inconnue, on soustrait les mangues au total.",
          `${total} - ${mangues} = ${letchis}.`,
          `Il y a ${letchis} letchis.`
        ),
        canvas: schemaBarreCanvas({
          title: "Panier de fruits",
          total: String(total),
          parts: [
            { label: "Mangues", value: String(mangues) },
            { label: "Letchis", unknown: true },
          ],
          questionLabel: "On cherche les letchis.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_007_qcm_inconnu_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste le nombre dans l’égalité.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "qcm",
      "addition",
      "template",
    ],
    generate: () => {
      const inconnu = randomChoice([8, 12, 15, 18, 24]);
      const ajoute = randomChoice([5, 6, 9, 12]);
      const total = inconnu + ajoute;

      return {
        text: `Quel est le nombre inconnu dans ? + ${ajoute} = ${total} ?`,
        format: "qcm",
        choices: makeChoices(String(inconnu), [
          String(ajoute),
          String(total),
          String(inconnu + 1),
        ]),
        expected: [String(inconnu)],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche le nombre qui rend l’égalité vraie.",
          "On peut faire l’opération inverse de l’addition.",
          `${total} - ${ajoute} = ${inconnu}.`,
          `Le nombre inconnu est ${inconnu}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_008_qcm_erreur_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre inconnu n’est pas le total.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "qcm",
      "erreur",
      "template",
    ],
    generate: () => {
      const inconnu = randomChoice([8, 12, 15, 18, 24]);
      const ajoute = randomChoice([5, 6, 9, 12]);
      const total = inconnu + ajoute;

      return {
        text: `Un élève dit que dans ? + ${ajoute} = ${total}, le nombre inconnu est ${total}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Il ne faut pas confondre le total et le nombre inconnu.",
          "Le nombre inconnu est seulement une partie du total.",
          `${total} - ${ajoute} = ${inconnu}, donc ${inconnu} + ${ajoute} = ${total}.`,
          `L’élève n’a pas raison : le nombre inconnu est ${inconnu}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_009_open_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique l’opération inverse.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "open",
      "demarche",
      "addition",
      "template",
    ],
    generate: () => {
      const inconnu = randomChoice([12, 15, 18, 24, 36]);
      const ajoute = randomChoice([5, 8, 9, 12]);
      const total = inconnu + ajoute;

      return {
        text: `Explique comment trouver le nombre inconnu dans : ? + ${ajoute} = ${total}.`,
        format: "open",
        expected: [
          String(ajoute),
          String(total),
          String(inconnu),
          "soustraction",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour trouver un nombre inconnu dans une addition, on utilise l’opération inverse.",
          "On enlève la partie connue au total.",
          `${total} - ${ajoute} = ${inconnu}.`,
          `Le nombre inconnu est ${inconnu}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_010_open_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec une table de multiplication ou une division.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "open",
      "demarche",
      "multiplication",
      "template",
    ],
    generate: () => {
      const facteur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const inconnu = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const produit = facteur * inconnu;

      return {
        text: `Explique comment trouver le nombre inconnu dans : ${facteur} × ? = ${produit}.`,
        format: "open",
        expected: [
          String(facteur),
          String(produit),
          String(inconnu),
          "division",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour trouver un facteur inconnu, on utilise l’opération inverse de la multiplication.",
          "On peut chercher dans les tables ou diviser le produit par le facteur connu.",
          `${produit} ÷ ${facteur} = ${inconnu}.`,
          `Le nombre inconnu est ${inconnu}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_nombre_inconnu_tpl_011_open_probleme_schema",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 4,
    theme: "reunion",
    hint: "Utilise le total et la partie connue.",
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "open",
      "reunion",
      "schema_barre",
      "canvas",
      "template",
    ],
    generate: () => {
      const total = randomChoice([30, 36, 40, 48]);
      const connu = randomChoice([8, 12, 15, 18]);
      const inconnu = total - connu;

      return {
        text: `Dans un panier de ${total} fruits, il y a ${connu} mangues et des letchis. Explique comment trouver le nombre de letchis.`,
        format: "open",
        expected: [
          String(total),
          String(connu),
          String(inconnu),
          "soustraction",
          "letchis",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On cherche une partie inconnue d’un total.",
          "On connaît le total et une autre partie, donc on utilise une soustraction.",
          `${total} - ${connu} = ${inconnu}.`,
          `Il y a ${inconnu} letchis.`
        ),
        canvas: schemaBarreCanvas({
          title: "Panier de fruits",
          total: String(total),
          parts: [
            { label: "Mangues", value: String(connu) },
            { label: "Letchis", unknown: true },
          ],
          questionLabel: "On cherche la partie inconnue.",
        }),
      };
    },
  },
    // ============================================================
  // ALGEBRE_SCHEMA_BARRE
  // Utiliser un schéma en barres simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_schema_barre_fixed_001_partie_manquante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Un total vaut 50. Une partie vaut 18. Quelle est l’autre partie ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Dans un schéma en barres, total - partie connue = partie manquante.",
    explanation: exp(
      "Un schéma en barres aide à représenter un total composé de plusieurs parties.",
      "Quand on connaît le total et une partie, on trouve l’autre partie par soustraction.",
      "50 - 18 = 32.",
      "L’autre partie vaut 32."
    ),
    canvas: schemaBarreCanvas({
      title: "Total et partie manquante",
      total: "50",
      parts: [
        { label: "Partie connue", value: "18" },
        { label: "Partie inconnue", unknown: true },
      ],
      questionLabel: "On cherche la partie manquante.",
    }),
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "partie_manquante",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_schema_barre_fixed_002_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Une barre contient deux parties : 24 et 16. Quel est le total ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Pour trouver le total, additionne les parties.",
    explanation: exp(
      "Un schéma en barres peut représenter un total formé de plusieurs parties.",
      "Quand on connaît les parties, on les additionne pour trouver le total.",
      "24 + 16 = 40.",
      "Le total vaut 40."
    ),
    canvas: schemaBarreCanvas({
      title: "Trouver le total",
      total: "?",
      parts: [
        { label: "Partie 1", value: "24" },
        { label: "Partie 2", value: "16" },
      ],
      questionLabel: "On cherche le total.",
    }),
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "total",
      "addition",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_schema_barre_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment utiliser le schéma en barres pour résoudre : 18 + ? = 45.",
    format: "open",
    expected: ["18", "45", "27", "soustraction", "partie"],
    comparator: "contains_keyword",
    hint: "Le total est 45 et une partie vaut 18.",
    explanation: exp(
      "Un schéma en barres permet de voir un total et ses parties.",
      "Ici, le total vaut 45 et une partie vaut 18. On cherche l’autre partie.",
      "45 - 18 = 27.",
      "La partie manquante vaut 27."
    ),
    canvas: schemaBarreCanvas({
      title: "Schéma en barres",
      total: "45",
      parts: [
        { label: "Connu", value: "18" },
        { label: "Manque", unknown: true },
      ],
      questionLabel: "On cherche ce qui complète 18 jusqu’à 45.",
    }),
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "open",
      "expliquer",
      "partie_manquante",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_001_partie_manquante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustrais la partie connue au total.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "partie_manquante",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([30, 36, 40, 48, 50, 60, 75]);
      const connu = randomChoice([8, 12, 15, 18, 20, 24, 30]);
      const inconnu = total - connu;

      return {
        text: `Le total vaut ${total}. Une partie vaut ${connu}. Quelle est l’autre partie ?`,
        format: "short",
        expected: [String(inconnu)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un schéma en barres, un total peut être découpé en plusieurs parties.",
          "Quand on connaît le total et une partie, on trouve l’autre partie par soustraction.",
          `${total} - ${connu} = ${inconnu}.`,
          `La partie manquante vaut ${inconnu}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Partie manquante",
          total: String(total),
          parts: [
            { label: "Connu", value: String(connu) },
            { label: "Manque", unknown: true },
          ],
          questionLabel: "On cherche l’autre partie.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_002_total_deux_parties",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux parties.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "total",
      "addition",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([8, 12, 15, 18, 24, 30]);
      const b = randomChoice([6, 9, 12, 15, 20, 25]);
      const total = a + b;

      return {
        text: `Une barre contient deux parties : ${a} et ${b}. Quel est le total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un schéma en barres montre toutes les parties, on additionne pour trouver le total.",
          "On réunit les deux parties.",
          `${a} + ${b} = ${total}.`,
          `Le total vaut ${total}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Trouver le total",
          total: "?",
          parts: [
            { label: "Partie 1", value: String(a) },
            { label: "Partie 2", value: String(b) },
          ],
          questionLabel: "On additionne les parties.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_003_probleme_cahiers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le total est connu. Une partie est connue. Il faut trouver l’autre partie.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "probleme",
      "partie_manquante",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([40, 48, 60, 72, 80]);
      const stylos = randomChoice([12, 18, 24, 30]);
      const cahiers = total - stylos;

      return {
        text: `Dans une caisse, il y a ${total} fournitures. Il y a ${stylos} stylos et des cahiers. Combien y a-t-il de cahiers ?`,
        format: "short",
        expected: [String(cahiers)],
        comparator: "number_equal",
        explanation: exp(
          "Le schéma en barres aide à voir le total et les parties.",
          "On connaît le total des fournitures et le nombre de stylos. On cherche les cahiers.",
          `${total} - ${stylos} = ${cahiers}.`,
          `Il y a ${cahiers} cahiers.`
        ),
        canvas: schemaBarreCanvas({
          title: "Fournitures",
          total: String(total),
          parts: [
            { label: "Stylos", value: String(stylos) },
            { label: "Cahiers", unknown: true },
          ],
          questionLabel: "On cherche les cahiers.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_004_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "reunion",
    hint: "Total - mangues = letchis.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "reunion",
      "fruits",
      "partie_manquante",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([24, 30, 36, 40, 48]);
      const mangues = randomChoice([8, 10, 12, 15, 18]);
      const letchis = total - mangues;

      return {
        text: `Au marché de Saint-Pierre, un panier contient ${total} fruits. Il y a ${mangues} mangues et des letchis. Combien y a-t-il de letchis ?`,
        format: "short",
        expected: [String(letchis)],
        comparator: "number_equal",
        explanation: exp(
          "Le schéma en barres représente le panier entier et ses parties.",
          "On connaît le total et le nombre de mangues. On cherche les letchis.",
          `${total} - ${mangues} = ${letchis}.`,
          `Il y a ${letchis} letchis.`
        ),
        canvas: schemaBarreCanvas({
          title: "Panier de fruits",
          total: String(total),
          parts: [
            { label: "Mangues", value: String(mangues) },
            { label: "Letchis", unknown: true },
          ],
          questionLabel: "On cherche les letchis.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_005_ecart_comparaison",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour comparer, calcule l’écart.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "comparaison",
      "ecart",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const petit = randomChoice([18, 24, 30, 36, 45]);
      const ecart = randomChoice([5, 6, 8, 10, 12]);
      const grand = petit + ecart;

      return {
        text: `Lina a ${grand} cartes. Sami a ${petit} cartes. Combien de cartes Lina a-t-elle de plus que Sami ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Un schéma en barres peut aussi comparer deux quantités.",
          "Pour trouver combien il y a de plus, on calcule l’écart entre les deux nombres.",
          `${grand} - ${petit} = ${ecart}.`,
          `Lina a ${ecart} cartes de plus que Sami.`
        ),
        canvas: schemaBarreCanvas({
          title: "Comparer deux quantités",
          total: String(grand),
          parts: [
            { label: "Sami", value: String(petit) },
            { label: "Écart", unknown: true },
          ],
          questionLabel: "On cherche combien Lina a de plus.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_006_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 3,
    theme: "neutral",
    hint: "Total connu et partie connue : quelle opération permet de trouver l’autre partie ?",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "qcm",
      "operation",
      "template",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([36, 40, 48, 60]);
      const connu = randomChoice([8, 12, 15, 20]);
      const inconnu = total - connu;
      const correct = `${total} - ${connu}`;

      return {
        text: `Le schéma montre un total de ${total} et une partie connue de ${connu}. Quel calcul permet de trouver la partie manquante ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} + ${connu}`,
          `${connu} - ${total}`,
          `${total} × ${connu}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on connaît le total et une partie, on cherche l’autre partie.",
          "L’opération adaptée est une soustraction.",
          `${total} - ${connu} = ${inconnu}.`,
          `Le calcul correct est ${correct}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Quelle opération ?",
          total: String(total),
          parts: [
            { label: "Connu", value: String(connu) },
            { label: "Manque", unknown: true },
          ],
          questionLabel: "On cherche le calcul adapté.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_007_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la partie manquante.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "qcm",
      "resultat",
      "template",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([36, 40, 48, 60, 72]);
      const connu = randomChoice([8, 12, 15, 20, 24]);
      const inconnu = total - connu;

      return {
        text: `Le total vaut ${total}. Une partie vaut ${connu}. Quelle est la partie manquante ?`,
        format: "qcm",
        choices: makeChoices(String(inconnu), [
          String(total + connu),
          String(connu),
          String(Math.max(0, inconnu - 2)),
        ]),
        expected: [String(inconnu)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le schéma en barres permet d’identifier la partie inconnue.",
          "On soustrait la partie connue au total.",
          `${total} - ${connu} = ${inconnu}.`,
          `La partie manquante vaut ${inconnu}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Partie manquante",
          total: String(total),
          parts: [
            { label: "Connu", value: String(connu) },
            { label: "Manque", unknown: true },
          ],
          questionLabel: "On cherche la partie manquante.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_008_open_expliquer_partie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec total, partie connue et partie inconnue.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "open",
      "expliquer",
      "partie_manquante",
      "template",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([36, 40, 48, 60]);
      const connu = randomChoice([8, 12, 15, 20]);
      const inconnu = total - connu;

      return {
        text: `Explique comment le schéma en barres permet de résoudre : ${connu} + ? = ${total}.`,
        format: "open",
        expected: [
          String(connu),
          String(total),
          String(inconnu),
          "soustraction",
          "partie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Le schéma en barres montre un total composé de parties.",
          "On connaît une partie et le total, donc on cherche la partie manquante.",
          `${total} - ${connu} = ${inconnu}.`,
          `La partie manquante vaut ${inconnu}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Schéma en barres",
          total: String(total),
          parts: [
            { label: "Connu", value: String(connu) },
            { label: "Manque", unknown: true },
          ],
          questionLabel: "On cherche ce qui complète.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_009_open_creer_phrase_reponse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 4,
    theme: "reunion",
    hint: "Ta réponse doit dire ce que représente le nombre trouvé.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "open",
      "phrase_reponse",
      "reunion",
      "template",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([24, 30, 36, 40]);
      const mangues = randomChoice([8, 10, 12, 15]);
      const letchis = total - mangues;

      return {
        text: `Un panier contient ${total} fruits. Il y a ${mangues} mangues et des letchis. Le calcul est ${total} - ${mangues} = ${letchis}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: [String(letchis), "letchis"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un schéma en barres aide à trouver le résultat, mais il faut aussi répondre avec une phrase.",
          "On précise ce que représente le nombre trouvé.",
          `${total} - ${mangues} = ${letchis}.`,
          `Une phrase claire est : Il y a ${letchis} letchis.`
        ),
        canvas: schemaBarreCanvas({
          title: "Panier de fruits",
          total: String(total),
          parts: [
            { label: "Mangues", value: String(mangues) },
            { label: "Letchis", unknown: true },
          ],
          questionLabel: "On rédige la réponse.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_schema_barre_tpl_010_open_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : on ne cherche pas le total, on cherche la partie manquante.",
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "open",
      "erreur",
      "template",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([36, 40, 48, 60]);
      const connu = randomChoice([8, 12, 15, 20]);
      const inconnu = total - connu;
      const wrong = total + connu;

      return {
        text: `Un élève voit un total de ${total} et une partie de ${connu}. Il calcule ${total} + ${connu} = ${wrong} pour trouver la partie manquante. Explique son erreur.`,
        format: "open",
        expected: [
          String(total),
          String(connu),
          String(inconnu),
          "soustraction",
          "partie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche une partie manquante, il ne faut pas additionner le total et la partie connue.",
          "Le total contient déjà la partie connue : il faut donc la retirer du total.",
          `${total} - ${connu} = ${inconnu}, et non ${total} + ${connu} = ${wrong}.`,
          `La partie manquante vaut ${inconnu}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Erreur à éviter",
          total: String(total),
          parts: [
            { label: "Connu", value: String(connu) },
            { label: "Manque", unknown: true },
          ],
          questionLabel: "On ne cherche pas à agrandir le total.",
        }),
      };
    },
  },
    // ============================================================
  // ALGEBRE_MOTIF
  // Reconnaître et poursuivre un motif évolutif simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_001_suite_plus_3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la suite : 4 ; 7 ; 10 ; 13 ; ? Quel est le nombre suivant ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Regarde ce qu’on ajoute à chaque étape.",
    explanation: exp(
      "Un motif évolutif suit une règle qui se répète.",
      "Pour trouver la règle, on compare deux termes consécutifs.",
      "On ajoute 3 à chaque fois : 4, 7, 10, 13, 16.",
      "Le nombre suivant est 16."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Motif : +3",
      data: [
        { label: "1", value: 4 },
        { label: "2", value: 7 },
        { label: "3", value: 10 },
        { label: "4", value: 13 },
        { label: "5", value: 16 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 4,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "motif",
      "suite",
      "plus_3",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_002_motif_points",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Étape 1 : 3 points. Étape 2 : 6 points. Étape 3 : 9 points. Combien y aura-t-il de points à l’étape 4 ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Le nombre de points augmente de 3 à chaque étape.",
    explanation: exp(
      "Un motif évolutif peut représenter une quantité qui augmente à chaque étape.",
      "On cherche la règle entre les étapes.",
      "On ajoute 3 points à chaque fois : 3, 6, 9, 12.",
      "À l’étape 4, il y aura 12 points."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Nombre de points",
      data: [
        { label: "Étape 1", value: 3 },
        { label: "Étape 2", value: 6 },
        { label: "Étape 3", value: 9 },
        { label: "Étape 4", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "motif",
      "points",
      "suite",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_motif_open_001_expliquer_regle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la règle de la suite : 5 ; 10 ; 15 ; 20 ; 25.",
    format: "open",
    expected: ["5", "ajoute", "fois", "règle"],
    comparator: "contains_keyword",
    hint: "Regarde l’écart entre deux nombres qui se suivent.",
    explanation: exp(
      "Expliquer un motif, c’est dire comment on passe d’une étape à la suivante.",
      "On compare les nombres consécutifs.",
      "De 5 à 10, puis de 10 à 15, on ajoute 5 à chaque fois.",
      "La règle est : on ajoute 5 à chaque étape."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Motif : +5",
      data: [
        { label: "1", value: 5 },
        { label: "2", value: 10 },
        { label: "3", value: 15 },
        { label: "4", value: 20 },
        { label: "5", value: 25 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 4,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "motif",
      "open",
      "expliquer",
      "regle",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_001_suite_additive",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qu’on ajoute à chaque fois.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "suite",
      "additive",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([2, 3, 4, 5, 6, 8]);
      const step = randomChoice([2, 3, 4, 5, 6]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Observe la suite : ${terms.join(" ; ")} ; ? Quel est le nombre suivant ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite additive augmente toujours du même nombre.",
          "On cherche l’écart entre deux termes qui se suivent.",
          `Ici, on ajoute ${step} à chaque fois : ${terms.join(", ")}, ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: `Motif : +${step}`,
          data: [
            { label: "1", value: terms[0] },
            { label: "2", value: terms[1] },
            { label: "3", value: terms[2] },
            { label: "4", value: terms[3] },
            { label: "5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_002_suite_multiplicative_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si on multiplie par le même nombre à chaque étape.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "suite",
      "multiplicative",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([1, 2, 3, 4, 5]);
      const factor = randomChoice([2, 3]);
      const terms = [
        start,
        start * factor,
        start * factor * factor,
        start * factor * factor * factor,
      ];
      const next = start * factor * factor * factor * factor;

      return {
        text: `Observe la suite : ${terms.join(" ; ")} ; ? Quel est le nombre suivant ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Certaines suites évoluent en multipliant toujours par le même nombre.",
          "On cherche le passage d’un terme au suivant.",
          `Ici, on multiplie par ${factor} à chaque fois : ${terms.join(", ")}, ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: `Motif : ×${factor}`,
          data: [
            { label: "1", value: terms[0] },
            { label: "2", value: terms[1] },
            { label: "3", value: terms[2] },
            { label: "4", value: terms[3] },
            { label: "5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_003_trouver_regle_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare deux termes consécutifs.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "regle",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([3, 4, 5, 6, 8]);
      const step = randomChoice([2, 3, 4, 5]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const correct = `on ajoute ${step}`;

      return {
        text: `Quelle est la règle de la suite : ${terms.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `on ajoute ${step + 1}`,
          `on enlève ${step}`,
          `on multiplie par ${step}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Trouver la règle d’un motif, c’est comprendre comment il évolue.",
          "On compare deux termes qui se suivent.",
          `${terms[1]} - ${terms[0]} = ${step}, puis ${terms[2]} - ${terms[1]} = ${step}.`,
          `La règle est : on ajoute ${step}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Trouver la règle",
          data: terms.map((value, index) => ({
            label: String(index + 1),
            value,
          })),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_004_erreur_regle_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie si la règle proposée fonctionne à chaque étape.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "erreur",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([4, 5, 6, 8]);
      const step = randomChoice([3, 4, 5, 6]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const wrongStep = step + randomChoice([1, 2]);

      return {
        text: `Un élève dit que dans la suite ${terms.join(" ; ")}, la règle est : on ajoute ${wrongStep}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour vérifier une règle, elle doit fonctionner entre tous les termes.",
          "On calcule l’écart entre deux termes consécutifs.",
          `${terms[1]} - ${terms[0]} = ${step}, et non ${wrongStep}.`,
          `L’élève n’a pas raison : la règle est on ajoute ${step}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Vérifier une règle",
          data: terms.map((value, index) => ({
            label: String(index + 1),
            value,
          })),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 1,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_005_motif_points_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque étape ajoute le même nombre de points.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "points",
      "etapes",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const step = randomChoice([2, 3, 4, 5]);
      const values = [step, 2 * step, 3 * step, 4 * step];
      const next = 5 * step;

      return {
        text: `Étape 1 : ${values[0]} points. Étape 2 : ${values[1]} points. Étape 3 : ${values[2]} points. Étape 4 : ${values[3]} points. Combien y aura-t-il de points à l’étape 5 ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Un motif par étapes peut augmenter régulièrement.",
          "On cherche combien on ajoute à chaque étape.",
          `On ajoute ${step} points à chaque étape : ${values.join(", ")}, ${next}.`,
          `À l’étape 5, il y aura ${next} points.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Points par étape",
          data: [
            { label: "Étape 1", value: values[0] },
            { label: "Étape 2", value: values[1] },
            { label: "Étape 3", value: values[2] },
            { label: "Étape 4", value: values[3] },
            { label: "Étape 5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_006_reunion_plage_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "reunion",
    hint: "Observe l’augmentation du nombre de déchets ramassés.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "reunion",
      "ecologie",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([5, 8, 10, 12]);
      const step = randomChoice([3, 4, 5, 6]);
      const values = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Sur une plage de La Réunion, un groupe ramasse ${values[0]} déchets au 1er passage, ${values[1]} au 2e, ${values[2]} au 3e et ${values[3]} au 4e. Si le motif continue, combien ramassera-t-il au 5e passage ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Un motif peut décrire une situation réelle qui évolue régulièrement.",
          "On observe l’augmentation entre deux passages.",
          `On ajoute ${step} déchets à chaque passage : ${values.join(", ")}, ${next}.`,
          `Au 5e passage, le groupe ramassera ${next} déchets.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Déchets ramassés",
          data: [
            { label: "1er", value: values[0] },
            { label: "2e", value: values[1] },
            { label: "3e", value: values[2] },
            { label: "4e", value: values[3] },
            { label: "5e", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_007_qcm_nombre_suivant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve l’écart constant.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "qcm",
      "nombre_suivant",
      "template",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([4, 6, 8, 10]);
      const step = randomChoice([2, 4, 5, 6]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Quel est le nombre suivant ? ${terms.join(" ; ")} ; ?`,
        format: "qcm",
        choices: makeChoices(String(next), [
          String(next + step),
          String(next - 1),
          String(terms[3] + 1),
        ]),
        expected: [String(next)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le nombre suivant, on cherche la règle du motif.",
          "Ici, l’écart entre deux termes est toujours le même.",
          `On ajoute ${step} à chaque fois, donc ${terms[3]} + ${step} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Nombre suivant",
          data: [
            ...terms.map((value, index) => ({
              label: String(index + 1),
              value,
            })),
            { label: "5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_008_open_expliquer_suite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique comment tu passes d’un terme au suivant.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "open",
      "expliquer",
      "suite",
      "template",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([3, 4, 5, 6, 8]);
      const step = randomChoice([2, 3, 4, 5]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Explique comment trouver le nombre suivant dans la suite : ${terms.join(" ; ")} ; ?`,
        format: "open",
        expected: [
          String(step),
          String(terms[3]),
          String(next),
          "ajoute",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Expliquer un motif, c’est décrire sa règle.",
          "On compare deux nombres consécutifs pour trouver ce qui change.",
          `On ajoute ${step} à chaque fois. Donc ${terms[3]} + ${step} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Expliquer le motif",
          data: [
            ...terms.map((value, index) => ({
              label: String(index + 1),
              value,
            })),
            { label: "5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_motif_tpl_009_open_erreur_motif",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 4,
    theme: "neutral",
    hint: "Montre que la règle proposée ne fonctionne pas.",
    tags: [
      "cm1",
      "algebre",
      "motif",
      "open",
      "erreur",
      "template",
      "canvas",
    ],
    generate: () => {
      const start = randomChoice([4, 5, 6, 8]);
      const step = randomChoice([3, 4, 5]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const wrongStep = step + 1;
      const next = start + 4 * step;

      return {
        text: `Un élève dit que dans la suite ${terms.join(" ; ")}, il faut ajouter ${wrongStep} à chaque fois. Explique son erreur et donne le nombre suivant.`,
        format: "open",
        expected: [
          String(step),
          String(wrongStep),
          String(next),
          "erreur",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour vérifier une règle, on regarde si elle fonctionne entre les termes donnés.",
          "Ici, l’écart réel entre deux termes est constant.",
          `${terms[1]} - ${terms[0]} = ${step}, donc on ajoute ${step}, pas ${wrongStep}. Le nombre suivant est ${next}.`,
          `L’élève s’est trompé de règle : il faut ajouter ${step}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Erreur de règle",
          data: [
            ...terms.map((value, index) => ({
              label: String(index + 1),
              value,
            })),
            { label: "5", value: next },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 4,
          },
        }),
      };
    },
  },
    // ============================================================
  // ALGEBRE_RELATION
  // Décrire une relation entre deux quantités
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_relation_fixed_001_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une activité, chaque élève reçoit 2 cartes. S’il y a 6 élèves, combien faut-il de cartes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque élève reçoit 2 cartes : on multiplie par 2.",
    explanation: exp(
      "Une relation entre deux quantités explique comment une quantité dépend d’une autre.",
      "Ici, le nombre de cartes dépend du nombre d’élèves.",
      "Pour 6 élèves : 6 × 2 = 12.",
      "Il faut 12 cartes."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Relation : nombre d’élèves → cartes",
      data: [
        { label: "1 élève", value: 2 },
        { label: "2 élèves", value: 4 },
        { label: "3 élèves", value: 6 },
        { label: "6 élèves", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "relation",
      "double",
      "multiplication",
      "fixed",
      "short",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_relation_fixed_002_table",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte contient 5 crayons. Combien y a-t-il de crayons dans 4 boîtes ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le nombre de crayons dépend du nombre de boîtes.",
    explanation: exp(
      "Une relation peut associer un nombre d’objets à un nombre de groupes.",
      "Ici, chaque boîte contient 5 crayons.",
      "4 × 5 = 20.",
      "Il y a 20 crayons dans 4 boîtes."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Boîtes et crayons",
      data: [
        { label: "1", value: 5 },
        { label: "2", value: 10 },
        { label: "3", value: 15 },
        { label: "4", value: 20 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "relation",
      "multiplication",
      "fixed",
      "short",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_relation_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la relation : pour 1 maison, il faut 6 allumettes ; pour 2 maisons, il faut 11 allumettes ; pour 3 maisons, il faut 16 allumettes.",
    format: "open",
    expected: ["6", "11", "16", "5", "ajoute", "maison"],
    comparator: "contains_keyword",
    hint: "Regarde combien d’allumettes on ajoute quand on ajoute une maison.",
    explanation: exp(
      "Décrire une relation, c’est expliquer le lien entre deux quantités.",
      "Ici, le nombre d’allumettes dépend du nombre de maisons.",
      "On passe de 6 à 11, puis de 11 à 16 : on ajoute 5 allumettes à chaque maison.",
      "La relation est : chaque nouvelle maison ajoute 5 allumettes."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Maisons et allumettes",
      data: [
        { label: "1", value: 6 },
        { label: "2", value: 11 },
        { label: "3", value: 16 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 2,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "relation",
      "maisons",
      "allumettes",
      "open",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_001_groupes_egaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque groupe contient la même quantité.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "groupes_egaux",
      "multiplication",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const parGroupe = randomChoice([2, 3, 4, 5, 6, 8]);
      const groupes = randomChoice([3, 4, 5, 6, 7]);
      const total = parGroupe * groupes;

      return {
        text: `Chaque boîte contient ${parGroupe} objets. Combien y a-t-il d’objets dans ${groupes} boîtes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une relation peut dire qu’une quantité est répétée plusieurs fois.",
          "Ici, chaque boîte contient le même nombre d’objets.",
          `${groupes} × ${parGroupe} = ${total}.`,
          `Il y a ${total} objets.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Nombre de boîtes → objets",
          data: [
            { label: "1", value: parGroupe },
            { label: "2", value: 2 * parGroupe },
            { label: "3", value: 3 * parGroupe },
            { label: String(groupes), value: total },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_002_prix_unitaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    hint: "Prix total = nombre d’objets × prix d’un objet.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "prix",
      "multiplication",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6]);
      const quantite = randomChoice([3, 4, 5, 6, 8]);
      const total = prix * quantite;

      return {
        text: `Un carnet coûte ${prix} €. Combien coûtent ${quantite} carnets ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le prix total dépend du nombre d’objets achetés.",
          "Quand chaque objet a le même prix, on multiplie le prix d’un objet par le nombre d’objets.",
          `${quantite} × ${prix} = ${total}.`,
          `Les ${quantite} carnets coûtent ${total} € au total.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Quantité → prix total",
          data: [
            { label: "1", value: prix },
            { label: "2", value: 2 * prix },
            { label: "3", value: 3 * prix },
            { label: String(quantite), value: total },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_003_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "reunion",
      "marche",
      "multiplication",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const fruits = randomChoice([6, 8, 10, 12]);
      const paniers = randomChoice([3, 4, 5, 6]);
      const total = fruits * paniers;

      return {
        text: `Au marché de Saint-Pierre, chaque panier contient ${fruits} fruits. Combien y a-t-il de fruits dans ${paniers} paniers ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre total de fruits dépend du nombre de paniers.",
          "Comme chaque panier contient la même quantité, on multiplie.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits dans ${paniers} paniers.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Paniers → fruits",
          data: [
            { label: "1", value: fruits },
            { label: "2", value: 2 * fruits },
            { label: "3", value: 3 * fruits },
            { label: String(paniers), value: total },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_004_relation_additive",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a une quantité de départ, puis on ajoute la même quantité à chaque étape.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "additive",
      "motif",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([4, 5, 6, 8]);
      const ajout = randomChoice([2, 3, 4, 5]);
      const etape = randomChoice([4, 5, 6]);
      const total = depart + (etape - 1) * ajout;

      const data = Array.from({ length: etape }, (_, index) => ({
        label: String(index + 1),
        value: depart + index * ajout,
      }));

      return {
        text: `À l’étape 1, il y a ${depart} jetons. À chaque nouvelle étape, on ajoute ${ajout} jetons. Combien y a-t-il de jetons à l’étape ${etape} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une relation additive commence avec une quantité de départ puis ajoute toujours la même quantité.",
          "On calcule le nombre d’ajouts entre l’étape 1 et l’étape demandée.",
          `De l’étape 1 à l’étape ${etape}, il y a ${etape - 1} ajouts. Donc ${depart} + ${etape - 1} × ${ajout} = ${total}.`,
          `À l’étape ${etape}, il y a ${total} jetons.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: `Relation : départ ${depart}, puis +${ajout}`,
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: etape - 1,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_005_maisons_allumettes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 4,
    theme: "neutral",
    hint: "La première maison utilise 6 allumettes, puis chaque maison ajoutée en utilise 5 de plus.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "maisons",
      "allumettes",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const maisons = randomChoice([2, 3, 4, 5, 6]);
      const total = 6 + (maisons - 1) * 5;

      const data = Array.from({ length: maisons }, (_, index) => ({
        label: String(index + 1),
        value: 6 + index * 5,
      }));

      return {
        text: `On fabrique des maisons avec des allumettes. Pour 1 maison, il faut 6 allumettes. Chaque maison ajoutée utilise 5 allumettes de plus. Combien faut-il d’allumettes pour ${maisons} maisons ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce motif contient une relation entre le nombre de maisons et le nombre d’allumettes.",
          "La première maison utilise 6 allumettes, puis chaque nouvelle maison ajoute 5 allumettes.",
          `Pour ${maisons} maisons : 6 + ${maisons - 1} × 5 = ${total}.`,
          `Il faut ${total} allumettes.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Maisons → allumettes",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: maisons - 1,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_006_qcm_relation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère ce qui est multiplié par le nombre de groupes.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "qcm",
      "choisir_relation",
      "template",
      "canvas",
    ],
    generate: () => {
      const parGroupe = randomChoice([3, 4, 5, 6, 8]);
      const correct = `nombre total = nombre de groupes × ${parGroupe}`;

      return {
        text: `Chaque groupe contient ${parGroupe} objets. Quelle relation décrit la situation ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `nombre total = nombre de groupes + ${parGroupe}`,
          `nombre total = ${parGroupe} - nombre de groupes`,
          `nombre total = nombre de groupes ÷ ${parGroupe}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Décrire une relation, c’est écrire comment une quantité dépend d’une autre.",
          "Ici, chaque groupe contient toujours le même nombre d’objets.",
          `On multiplie donc le nombre de groupes par ${parGroupe}.`,
          `La relation correcte est : ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Relation multiplicative",
          data: [
            { label: "1", value: parGroupe },
            { label: "2", value: 2 * parGroupe },
            { label: "3", value: 3 * parGroupe },
            { label: "4", value: 4 * parGroupe },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_007_qcm_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 4,
    theme: "neutral",
    hint: "Si chaque groupe contient la même quantité, on multiplie.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "qcm",
      "erreur",
      "addition",
      "template",
      "canvas",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6]);
      const parGroupe = randomChoice([6, 8, 9]);
      const wrong = groupes + parGroupe;
      const correct = groupes * parGroupe;

      return {
        text: `Chaque boîte contient ${parGroupe} objets. Il y a ${groupes} boîtes. Un élève répond ${wrong} objets. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une relation avec des groupes égaux, il faut multiplier.",
          "L’élève a additionné le nombre de boîtes et le nombre d’objets par boîte.",
          `${groupes} × ${parGroupe} = ${correct}, et non ${groupes} + ${parGroupe} = ${wrong}.`,
          `Il y a ${correct} objets.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Vérifier la relation",
          data: [
            { label: "1", value: parGroupe },
            { label: "2", value: 2 * parGroupe },
            { label: String(groupes), value: correct },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 2,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_008_open_decrire_relation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec les mots “dépend de” ou “multiplie”.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "open",
      "decrire",
      "template",
      "canvas",
    ],
    generate: () => {
      const valeur = randomChoice([3, 4, 5, 6, 8]);

      return {
        text: `Chaque élève reçoit ${valeur} jetons. Explique la relation entre le nombre d’élèves et le nombre total de jetons.`,
        format: "open",
        expected: [
          String(valeur),
          "élèves",
          "jetons",
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Décrire une relation, c’est expliquer comment une quantité change quand une autre quantité change.",
          "Ici, le nombre total de jetons dépend du nombre d’élèves.",
          `On multiplie le nombre d’élèves par ${valeur}.`,
          `La relation est : total de jetons = nombre d’élèves × ${valeur}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Élèves → jetons",
          data: [
            { label: "1", value: valeur },
            { label: "2", value: 2 * valeur },
            { label: "3", value: 3 * valeur },
            { label: "4", value: 4 * valeur },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_relation_tpl_009_open_maisons_allumettes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique pourquoi on ne fait pas simplement 6 × nombre de maisons.",
    tags: [
      "cm1",
      "algebre",
      "relation",
      "open",
      "maisons",
      "allumettes",
      "raisonnement",
      "template",
      "canvas",
    ],
    generate: () => {
      const maisons = randomChoice([4, 5, 6]);
      const total = 6 + (maisons - 1) * 5;

      const data = Array.from({ length: maisons }, (_, index) => ({
        label: String(index + 1),
        value: 6 + index * 5,
      }));

      return {
        text: `Pour fabriquer des maisons collées avec des allumettes, 1 maison utilise 6 allumettes, puis chaque maison ajoutée utilise 5 allumettes de plus. Explique comment trouver le nombre d’allumettes pour ${maisons} maisons.`,
        format: "open",
        expected: [
          "6",
          "5",
          String(maisons),
          String(total),
          "ajoute",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Ce motif n’est pas une simple multiplication par 6, car les maisons collées partagent une allumette.",
          "On part de 6 allumettes pour la première maison, puis on ajoute 5 allumettes pour chaque nouvelle maison.",
          `Pour ${maisons} maisons : 6 + ${maisons - 1} × 5 = ${total}.`,
          `Il faut ${total} allumettes.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Maisons collées",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: maisons - 1,
          },
        }),
      };
    },
  },
    // ============================================================
  // ALGEBRE_DEFI
  // Résoudre un défi d’algèbre
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_algebre_defi_fixed_001_nombre_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : je pense à un nombre. Je lui ajoute 12, puis j’obtiens 50. Quel est ce nombre ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Fais l’opération inverse : enlève 12 à 50.",
    explanation: exp(
      "Un défi d’algèbre peut cacher un nombre dans une situation simple.",
      "On cherche le nombre de départ. Comme on a ajouté 12, on fait l’opération inverse.",
      "50 - 12 = 38, donc 38 + 12 = 50.",
      "Le nombre caché est 38."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre caché",
      total: "50",
      parts: [
        { label: "Nombre", unknown: true },
        { label: "+ 12", value: "12" },
      ],
      questionLabel: "On cherche le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "defi",
      "nombre_cache",
      "addition",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_defi_fixed_002_schema_barre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : dans une boîte, il y a 72 objets. Il y a 28 objets rouges, les autres sont bleus. Combien y a-t-il d’objets bleus ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Total - partie connue = partie inconnue.",
    explanation: exp(
      "Un schéma en barres permet de représenter un total et ses parties.",
      "On connaît le total et une partie. On cherche l’autre partie.",
      "72 - 28 = 44.",
      "Il y a 44 objets bleus."
    ),
    canvas: schemaBarreCanvas({
      title: "Total et partie inconnue",
      total: "72",
      parts: [
        { label: "Rouges", value: "28" },
        { label: "Bleus", unknown: true },
      ],
      questionLabel: "On cherche les objets bleus.",
    }),
    tags: [
      "cm1",
      "algebre",
      "defi",
      "schema_barre",
      "partie_manquante",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_defi_open_001_expliquer_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève lit : « 5 boîtes contiennent chacune 8 crayons ». Il répond 13 crayons. Explique son erreur.",
    format: "open",
    expected: ["5", "8", "13", "multiplication", "40"],
    comparator: "contains_keyword",
    hint: "Il a sûrement additionné au lieu de multiplier.",
    explanation: exp(
      "Un défi d’algèbre demande parfois d’identifier la relation entre deux quantités.",
      "Ici, il y a des groupes égaux : 5 boîtes avec 8 crayons dans chaque boîte.",
      "Il faut calculer 5 × 8 = 40, et non 5 + 8 = 13.",
      "L’élève a additionné au lieu de multiplier."
    ),
    tags: [
      "cm1",
      "algebre",
      "defi",
      "open",
      "erreur",
      "relation",
      "multiplication",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_001_nombre_cache_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le nombre de départ avec une soustraction.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "nombre_cache",
      "addition",
      "template",
      "short",
      "schema_barre",
      "canvas",
    ],
    generate: () => {
      const nombre = randomChoice([18, 24, 35, 42, 56]);
      const ajoute = randomChoice([8, 12, 15, 20]);
      const total = nombre + ajoute;

      return {
        text: `Défi : je pense à un nombre. Je lui ajoute ${ajoute} et j’obtiens ${total}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(nombre)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche un nombre de départ caché.",
          "Comme on a ajouté une quantité, on utilise l’opération inverse : la soustraction.",
          `${total} - ${ajoute} = ${nombre}, donc ${nombre} + ${ajoute} = ${total}.`,
          `Le nombre caché est ${nombre}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Nombre caché",
          total: String(total),
          parts: [
            { label: "Nombre", unknown: true },
            { label: `+ ${ajoute}`, value: String(ajoute) },
          ],
          questionLabel: "On cherche le nombre de départ.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_002_nombre_cache_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Si on a enlevé une quantité, ajoute-la au résultat.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "nombre_cache",
      "soustraction",
      "template",
      "short",
      "schema_barre",
      "canvas",
    ],
    generate: () => {
      const resultat = randomChoice([18, 24, 35, 42, 56]);
      const enleve = randomChoice([8, 12, 15, 20]);
      const nombre = resultat + enleve;

      return {
        text: `Défi : je pense à un nombre. Je lui enlève ${enleve} et j’obtiens ${resultat}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(nombre)],
        comparator: "number_equal",
        explanation: exp(
          "On cherche le nombre avant la soustraction.",
          "Comme on a enlevé une quantité, on fait l’opération inverse : on ajoute.",
          `${resultat} + ${enleve} = ${nombre}, donc ${nombre} - ${enleve} = ${resultat}.`,
          `Le nombre caché est ${nombre}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Retrouver le départ",
          total: String(nombre),
          parts: [
            { label: "Résultat", value: String(resultat) },
            { label: "Enlevé", value: String(enleve) },
          ],
          questionLabel: "On reconstitue le nombre de départ.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_003_panier_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Le total est connu. Une partie est connue.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "reunion",
      "schema_barre",
      "partie_manquante",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([36, 40, 48, 60, 72]);
      const mangues = randomChoice([12, 15, 18, 24, 30]);
      const letchis = total - mangues;

      return {
        text: `Défi marché : un panier contient ${total} fruits. Il y a ${mangues} mangues et des letchis. Combien y a-t-il de letchis ?`,
        format: "short",
        expected: [String(letchis)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi se résout avec un modèle total-parties.",
          "On connaît le total de fruits et le nombre de mangues. On cherche les letchis.",
          `${total} - ${mangues} = ${letchis}.`,
          `Il y a ${letchis} letchis.`
        ),
        canvas: schemaBarreCanvas({
          title: "Panier de fruits",
          total: String(total),
          parts: [
            { label: "Mangues", value: String(mangues) },
            { label: "Letchis", unknown: true },
          ],
          questionLabel: "On cherche les letchis.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_004_relation_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque groupe contient la même quantité.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "relation",
      "groupes_egaux",
      "multiplication",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7]);
      const parGroupe = randomChoice([6, 8, 9, 12]);
      const total = groupes * parGroupe;

      return {
        text: `Défi : ${groupes} boîtes contiennent chacune ${parGroupe} objets. Combien y a-t-il d’objets au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On reconnaît une relation entre le nombre de boîtes et le nombre total d’objets.",
          "Chaque boîte contient la même quantité, donc on multiplie.",
          `${groupes} × ${parGroupe} = ${total}.`,
          `Il y a ${total} objets au total.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Boîtes → objets",
          data: [
            { label: "1", value: parGroupe },
            { label: "2", value: 2 * parGroupe },
            { label: "3", value: 3 * parGroupe },
            { label: String(groupes), value: total },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 3,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_005_maisons_allumettes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La première maison utilise 6 allumettes, puis chaque nouvelle maison ajoute 5 allumettes.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "motif",
      "relation",
      "maisons",
      "allumettes",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const maisons = randomChoice([4, 5, 6, 7]);
      const total = 6 + (maisons - 1) * 5;

      const data = Array.from({ length: maisons }, (_, index) => ({
        label: String(index + 1),
        value: 6 + index * 5,
      }));

      return {
        text: `Défi allumettes : pour fabriquer 1 maison, il faut 6 allumettes. Chaque maison ajoutée utilise 5 allumettes de plus. Combien faut-il d’allumettes pour ${maisons} maisons ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi mélange motif évolutif et relation entre deux quantités.",
          "On part de 6 allumettes pour la première maison, puis on ajoute 5 allumettes pour chaque maison supplémentaire.",
          `Pour ${maisons} maisons : 6 + ${maisons - 1} × 5 = ${total}.`,
          `Il faut ${total} allumettes.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Maisons → allumettes",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: maisons - 1,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_006_qcm_operation_cachee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche un nombre de départ.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "qcm",
      "operation_inverse",
      "template",
      "canvas",
    ],
    generate: () => {
      const nombre = randomChoice([24, 35, 42, 56]);
      const ajoute = randomChoice([8, 12, 15]);
      const total = nombre + ajoute;
      const correct = `${total} - ${ajoute}`;

      return {
        text: `Je pense à un nombre. Je lui ajoute ${ajoute} et j’obtiens ${total}. Quel calcul permet de retrouver le nombre ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} + ${ajoute}`,
          `${ajoute} - ${total}`,
          `${total} × ${ajoute}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour retrouver un nombre de départ, on utilise l’opération inverse.",
          "Comme on a ajouté une quantité, on doit soustraire cette quantité au total.",
          `${total} - ${ajoute} = ${nombre}.`,
          `Le bon calcul est ${correct}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Opération inverse",
          total: String(total),
          parts: [
            { label: "Nombre", unknown: true },
            { label: `+ ${ajoute}`, value: String(ajoute) },
          ],
          questionLabel: "On choisit le calcul adapté.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_007_qcm_erreur_relation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention au mot “chacune”.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "qcm",
      "erreur",
      "relation",
      "template",
      "canvas",
    ],
    generate: () => {
      const boites = randomChoice([4, 5, 6]);
      const objets = randomChoice([6, 8, 9]);
      const wrong = boites + objets;
      const correct = boites * objets;

      return {
        text: `Chaque boîte contient ${objets} objets. Il y a ${boites} boîtes. Un élève répond ${wrong} objets. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le mot “chaque” indique des groupes égaux.",
          "Il faut multiplier le nombre de boîtes par le nombre d’objets dans chaque boîte.",
          `${boites} × ${objets} = ${correct}, et non ${boites} + ${objets} = ${wrong}.`,
          `L’élève n’a pas raison : il y a ${correct} objets.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Erreur : addition au lieu de multiplication",
          data: [
            { label: "1", value: objets },
            { label: "2", value: 2 * objets },
            { label: String(boites), value: correct },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 2,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_008_open_nombre_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique l’opération inverse.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "open",
      "nombre_cache",
      "demarche",
      "template",
      "canvas",
    ],
    generate: () => {
      const nombre = randomChoice([24, 35, 42, 56]);
      const ajoute = randomChoice([8, 12, 15]);
      const total = nombre + ajoute;

      return {
        text: `Explique comment retrouver le nombre caché : ? + ${ajoute} = ${total}.`,
        format: "open",
        expected: [
          String(ajoute),
          String(total),
          String(nombre),
          "soustraction",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour retrouver un nombre caché, on garde l’égalité équilibrée.",
          "On utilise l’opération inverse de l’addition : la soustraction.",
          `${total} - ${ajoute} = ${nombre}.`,
          `Le nombre caché est ${nombre}.`
        ),
        canvas: schemaBarreCanvas({
          title: "Nombre caché",
          total: String(total),
          parts: [
            { label: "?", unknown: true },
            { label: `+ ${ajoute}`, value: String(ajoute) },
          ],
          questionLabel: "On explique la démarche.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_009_open_maisons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique pourquoi on ajoute 5 pour chaque maison supplémentaire.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "open",
      "motif",
      "maisons",
      "allumettes",
      "template",
      "canvas",
    ],
    generate: () => {
      const maisons = randomChoice([4, 5, 6]);
      const total = 6 + (maisons - 1) * 5;

      const data = Array.from({ length: maisons }, (_, index) => ({
        label: String(index + 1),
        value: 6 + index * 5,
      }));

      return {
        text: `On fabrique des maisons collées avec des allumettes. 1 maison utilise 6 allumettes, puis chaque nouvelle maison ajoute 5 allumettes. Explique comment trouver le nombre d’allumettes pour ${maisons} maisons.`,
        format: "open",
        expected: [
          "6",
          "5",
          String(maisons),
          String(total),
          "ajoute",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Ce défi demande de repérer une structure qui se répète.",
          "La première maison utilise 6 allumettes, puis chaque maison supplémentaire ajoute 5 allumettes.",
          `Pour ${maisons} maisons : 6 + ${maisons - 1} × 5 = ${total}.`,
          `Il faut ${total} allumettes.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: "Motif des maisons",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: maisons - 1,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_algebre_defi_tpl_010_open_inventer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Tu peux inventer une histoire avec un nombre caché ou des groupes égaux.",
    tags: [
      "cm1",
      "algebre",
      "defi",
      "open",
      "inventer",
      "probleme",
      "template",
    ],
    generate: () => {
      const nombre = randomChoice([18, 24, 35]);
      const ajoute = randomChoice([6, 8, 12]);
      const total = nombre + ajoute;

      return {
        text: `Invente un petit problème qui correspond à l’égalité ? + ${ajoute} = ${total}.`,
        format: "open",
        expected: [
          String(ajoute),
          String(total),
          String(nombre),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Inventer un problème permet de vérifier qu’on comprend le sens de l’égalité.",
          "L’histoire doit contenir un nombre inconnu, un ajout, et un total.",
          `${total} - ${ajoute} = ${nombre}.`,
          `Un exemple possible : J’avais un nombre d’objets inconnu. On m’en donne ${ajoute}. Maintenant j’en ai ${total}. Au départ, j’en avais ${nombre}.`
        ),
      };
    },
  },
];

