// lib/tutor-v4/question-banks/maths/cm1/problemes.bank.ts

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
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
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

export const problemesBank: TutorBankItemV4[] = [
  // ============================================================
  // PROBLEME_CHOISIR_OPERATION
  // Choisir la bonne opération dans un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_choisir_operation_fixed_001_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un problème, on cherche le total de 45 livres et 32 livres. Quelle opération faut-il choisir ?",
    format: "qcm",
    choices: ["45 + 32", "45 - 32", "45 × 32", "45 ÷ 32"],
    expected: ["45 + 32"],
    comparator: "mcq_exact",
    hint: "Quand on réunit deux quantités, on utilise souvent une addition.",
    explanation: exp(
      "Un problème de total demande de réunir plusieurs quantités.",
      "On repère les quantités qui s’ajoutent : 45 livres et 32 livres.",
      "Le calcul adapté est 45 + 32.",
      "Il faut choisir l’addition."
    ),
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "addition",
      "total",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_choisir_operation_fixed_002_chacun",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un problème, on lit : « 6 sachets contiennent chacun 8 billes ». Quelle opération faut-il choisir ?",
    format: "qcm",
    choices: ["6 × 8", "6 + 8", "8 - 6", "8 ÷ 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique souvent des groupes égaux.",
    explanation: exp(
      "Un problème de groupes égaux demande souvent une multiplication.",
      "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
      "Il y a 6 sachets de 8 billes, donc le calcul adapté est 6 × 8.",
      "Il faut choisir la multiplication."
    ),
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "multiplication",
      "groupes_egaux",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_choisir_operation_open_001_expliquer_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on utilise une addition dans ce problème : « Une école reçoit 125 cahiers le lundi et 84 cahiers le mardi. Combien de cahiers reçoit-elle en tout ? »",
    format: "open",
    expected: ["addition", "total", "125", "84", "209"],
    comparator: "contains_keyword",
    hint: "On cherche une quantité totale.",
    explanation: exp(
      "Un problème de total consiste à réunir plusieurs quantités.",
      "Ici, les cahiers du lundi et les cahiers du mardi s’ajoutent.",
      "125 + 84 = 209.",
      "On utilise donc une addition : l’école reçoit 209 cahiers en tout."
    ),
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "open",
      "addition",
      "justification",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_001_total_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    hint: "On cherche un total : les quantités se réunissent.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "addition",
      "total",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([24, 35, 48, 62, 75, 86]);
      const b = randomChoice([13, 27, 34, 46, 58, 69]);
      const correct = `${a} + ${b}`;

      return {
        text: `Une classe possède ${a} livres. Elle reçoit encore ${b} livres. Quel calcul permet de trouver le nombre total de livres ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} - ${b}`,
          `${a} × ${b}`,
          `${a} ÷ ${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème de total demande d’ajouter des quantités.",
          "On repère les livres déjà présents et les livres reçus.",
          `Le calcul adapté est ${a} + ${b}.`,
          "Il faut choisir une addition."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_002_reste_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    hint: "On cherche ce qui reste après un retrait.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "soustraction",
      "reste",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([80, 95, 120, 150, 200, 240]);
      const retire = randomChoice([15, 24, 36, 48, 75]);
      const correct = `${total} - ${retire}`;

      return {
        text: `Une bibliothèque possède ${total} livres. Elle en prête ${retire}. Quel calcul permet de trouver combien de livres il reste ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} + ${retire}`,
          `${total} × ${retire}`,
          `${total} ÷ ${retire}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème de reste demande de retirer une quantité.",
          "On part du nombre total de livres, puis on enlève les livres prêtés.",
          `Le calcul adapté est ${total} - ${retire}.`,
          "Il faut choisir une soustraction."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_003_groupes_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le mot « chacun » indique des groupes égaux.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "multiplication",
      "groupes_egaux",
      "qcm",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 7, 8]);
      const quantite = randomChoice([4, 5, 6, 8, 9, 12]);
      const correct = `${groupes} × ${quantite}`;

      return {
        text: `${groupes} boîtes contiennent chacune ${quantite} objets. Quel calcul permet de trouver le nombre total d’objets ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${groupes} + ${quantite}`,
          `${quantite} - ${groupes}`,
          `${quantite} ÷ ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème de groupes égaux se résout souvent avec une multiplication.",
          "Le mot « chacune » indique que la même quantité est répétée plusieurs fois.",
          `Le calcul adapté est ${groupes} × ${quantite}.`,
          "Il faut choisir une multiplication."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_004_partage_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand on partage en parts égales, on utilise souvent une division.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "division",
      "partage",
      "qcm",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = groupes * part;
      const correct = `${total} ÷ ${groupes}`;

      return {
        text: `On partage ${total} images entre ${groupes} élèves. Quel calcul permet de trouver combien d’images reçoit chaque élève ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} + ${groupes}`,
          `${total} - ${groupes}`,
          `${total} × ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème de partage en parts égales se résout souvent avec une division.",
          "On cherche combien chaque élève reçoit.",
          `Le calcul adapté est ${total} ÷ ${groupes}.`,
          "Il faut choisir une division."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_005_ecart_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour trouver un écart, on soustrait.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "soustraction",
      "ecart",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([120, 150, 180, 240, 300, 420]);
      const b = randomChoice([45, 60, 75, 90, 120]);
      const correct = `${a} - ${b}`;

      return {
        text: `Une école A a ${a} élèves. Une école B a ${b} élèves. Quel calcul permet de trouver combien d’élèves l’école A a de plus ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} + ${b}`,
          `${a} × ${b}`,
          `${a} ÷ ${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème d’écart demande de comparer deux quantités.",
          "Pour savoir combien il y a de plus, on soustrait le plus petit nombre au plus grand.",
          `Le calcul adapté est ${a} - ${b}.`,
          "Il faut choisir une soustraction."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_006_reunion_marche_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque panier contient la même quantité.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "reunion",
      "marche",
      "multiplication",
      "qcm",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6, 8]);
      const fruits = randomChoice([6, 8, 9, 10, 12]);
      const correct = `${paniers} × ${fruits}`;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers avec ${fruits} fruits dans chaque panier. Quel calcul permet de trouver le nombre total de fruits ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${paniers} + ${fruits}`,
          `${fruits} - ${paniers}`,
          `${fruits} ÷ ${paniers}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème avec plusieurs groupes identiques se résout souvent par multiplication.",
          "Chaque panier contient le même nombre de fruits.",
          `Le calcul adapté est ${paniers} × ${fruits}.`,
          "Il faut choisir une multiplication."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_007_reunion_distance_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "reunion",
    hint: "On cherche ce qui reste à parcourir.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "reunion",
      "distance",
      "soustraction",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([8, 10, 12, 15, 18]);
      const parcouru = randomChoice([2, 3, 4, 5, 6]);
      const correct = `${total} - ${parcouru}`;

      return {
        text: `Une randonnée fait ${total} km. Une classe a déjà parcouru ${parcouru} km. Quel calcul permet de trouver la distance restante ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} + ${parcouru}`,
          `${total} × ${parcouru}`,
          `${total} ÷ ${parcouru}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème de distance restante demande de retirer ce qui est déjà parcouru.",
          "On part de la distance totale, puis on enlève la distance déjà faite.",
          `Le calcul adapté est ${total} - ${parcouru}.`,
          "Il faut choisir une soustraction."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_008_erreur_operation_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot « chacun » indique des groupes égaux.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "erreur",
      "multiplication",
      "qcm",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8]);
      const quantite = randomChoice([6, 8, 9, 12]);
      const addition = groupes + quantite;
      const product = groupes * quantite;

      return {
        text: `Un élève lit : « ${groupes} sacs contiennent chacun ${quantite} objets ». Il choisit le calcul ${groupes} + ${quantite}. A-t-il choisi la bonne opération ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut choisir l’opération selon le sens du problème.",
          "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
          `Il faut calculer ${groupes} × ${quantite} = ${product}, et non ${groupes} + ${quantite} = ${addition}.`,
          "L’élève n’a pas choisi la bonne opération."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_009_open_justifier_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que l’on cherche un total.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "open",
      "addition",
      "justification",
      "template",
    ],
    generate: () => {
      const a = randomChoice([45, 68, 125, 240]);
      const b = randomChoice([32, 57, 84, 136]);
      const total = a + b;

      return {
        text: `Explique quelle opération choisir : une école reçoit ${a} cahiers, puis encore ${b} cahiers. Combien reçoit-elle de cahiers en tout ?`,
        format: "open",
        expected: [String(a), String(b), "addition", "total", String(total)],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche une quantité totale, on réunit les quantités.",
          "Les cahiers reçus une première fois et les cahiers reçus ensuite s’ajoutent.",
          `${a} + ${b} = ${total}.`,
          `Il faut choisir une addition : l’école reçoit ${total} cahiers en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_010_open_justifier_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que l’on cherche ce qui reste.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "open",
      "soustraction",
      "justification",
      "template",
    ],
    generate: () => {
      const total = randomChoice([120, 150, 200, 280]);
      const retire = randomChoice([35, 48, 75, 96]);
      const reste = total - retire;

      return {
        text: `Explique quelle opération choisir : une association possède ${total} affiches. Elle en distribue ${retire}. Combien d’affiches reste-t-il ?`,
        format: "open",
        expected: [
          String(total),
          String(retire),
          "soustraction",
          "reste",
          String(reste),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on cherche ce qui reste après une distribution, on utilise une soustraction.",
          "On part du nombre d’affiches au départ, puis on enlève les affiches distribuées.",
          `${total} - ${retire} = ${reste}.`,
          `Il faut choisir une soustraction : il reste ${reste} affiches.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_011_open_justifier_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 3,
    theme: "reunion",
    hint: "Explique que la même quantité est répétée plusieurs fois.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "open",
      "multiplication",
      "reunion",
      "justification",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers avec ${fruits} fruits dans chaque panier. Explique quelle opération choisir pour trouver le nombre total de fruits.`,
        format: "open",
        expected: [
          String(paniers),
          String(fruits),
          "multiplication",
          "chaque",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand une même quantité est répétée plusieurs fois, on utilise une multiplication.",
          "Chaque panier contient le même nombre de fruits.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il faut choisir une multiplication : il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_choisir_operation_tpl_012_open_justifier_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que l’on partage en parts égales.",
    tags: [
      "cm1",
      "probleme",
      "choisir_operation",
      "open",
      "division",
      "partage",
      "justification",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = groupes * part;

      return {
        text: `On partage ${total} cartes entre ${groupes} élèves. Explique quelle opération choisir pour trouver combien de cartes reçoit chaque élève.`,
        format: "open",
        expected: [
          String(total),
          String(groupes),
          "division",
          "partage",
          String(part),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on partage une quantité en parts égales, on utilise une division.",
          "On divise le nombre total de cartes par le nombre d’élèves.",
          `${total} ÷ ${groupes} = ${part}.`,
          `Il faut choisir une division : chaque élève reçoit ${part} cartes.`
        ),
      };
    },
  },
    // ============================================================
  // PROBLEME_UNE_ETAPE
  // Résoudre un problème à une étape
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_une_etape_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    text: "Une classe possède 125 livres. Elle reçoit 48 livres de plus. Combien de livres possède-t-elle maintenant ?",
    format: "short",
    expected: ["173"],
    comparator: "number_equal",
    hint: "On cherche un total : il faut additionner.",
    explanation: exp(
      "Un problème à une étape se résout avec une seule opération.",
      "Ici, la classe reçoit des livres en plus : on cherche un total.",
      "125 + 48 = 173.",
      "La classe possède maintenant 173 livres."
    ),
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "addition",
      "modele",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_une_etape_fixed_002_modele_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    text: "Une école a 240 cahiers. Elle en distribue 85. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["155"],
    comparator: "number_equal",
    hint: "On cherche ce qui reste : il faut soustraire.",
    explanation: exp(
      "Un problème de reste se résout souvent avec une soustraction.",
      "On part du nombre de cahiers au départ, puis on enlève les cahiers distribués.",
      "240 - 85 = 155.",
      "Il reste 155 cahiers."
    ),
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "soustraction",
      "reste",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_une_etape_open_001_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment résoudre ce problème : un magasin vend 6 boîtes contenant chacune 8 crayons. Combien de crayons sont vendus ?",
    format: "open",
    expected: ["6", "8", "multiplication", "48", "crayons"],
    comparator: "contains_keyword",
    hint: "Chaque boîte contient le même nombre de crayons.",
    explanation: exp(
      "Quand une même quantité est répétée plusieurs fois, on utilise une multiplication.",
      "Ici, il y a 6 boîtes et chaque boîte contient 8 crayons.",
      "6 × 8 = 48.",
      "Le magasin vend 48 crayons."
    ),
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "open",
      "demarche",
      "multiplication",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_001_addition_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche un total : additionne les deux quantités.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "addition",
      "total",
      "template",
    ],
    generate: () => {
      const a = randomChoice([124, 135, 248, 360, 475]);
      const b = randomChoice([32, 48, 67, 85, 126]);
      const total = a + b;

      return {
        text: `Une bibliothèque possède ${a} livres. Elle reçoit ${b} nouveaux livres. Combien de livres possède-t-elle maintenant ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand une quantité augmente, on utilise souvent une addition.",
          "On additionne les livres déjà présents et les nouveaux livres.",
          `${a} + ${b} = ${total}.`,
          `La bibliothèque possède maintenant ${total} livres.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_002_soustraction_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche ce qui reste : soustrais.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "soustraction",
      "reste",
      "template",
    ],
    generate: () => {
      const total = randomChoice([120, 150, 200, 240, 360, 500]);
      const retire = randomChoice([24, 48, 75, 96, 125]);
      const reste = total - retire;

      return {
        text: `Une école possède ${total} cahiers. Elle en distribue ${retire}. Combien de cahiers reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche ce qui reste après un retrait, on utilise une soustraction.",
          "On part du nombre de cahiers au départ, puis on enlève les cahiers distribués.",
          `${total} - ${retire} = ${reste}.`,
          `Il reste ${reste} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_003_multiplication_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "Même quantité dans chaque groupe : multiplie.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "multiplication",
      "groupes_egaux",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 7, 8]);
      const quantite = randomChoice([4, 5, 6, 8, 9, 12]);
      const total = groupes * quantite;

      return {
        text: `${groupes} boîtes contiennent chacune ${quantite} objets. Combien y a-t-il d’objets au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand plusieurs groupes contiennent la même quantité, on utilise une multiplication.",
          "On multiplie le nombre de groupes par la quantité dans chaque groupe.",
          `${groupes} × ${quantite} = ${total}.`,
          `Il y a ${total} objets au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_004_division_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage en parts égales : divise.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "division",
      "partage",
      "template",
    ],
    generate: () => {
      const eleves = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = eleves * part;

      return {
        text: `On partage ${total} cartes entre ${eleves} élèves. Chaque élève reçoit le même nombre de cartes. Combien de cartes reçoit chaque élève ?`,
        format: "short",
        expected: [String(part)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on partage une quantité en parts égales, on utilise une division.",
          "On divise le nombre total de cartes par le nombre d’élèves.",
          `${total} ÷ ${eleves} = ${part}.`,
          `Chaque élève reçoit ${part} cartes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_005_ecart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver combien il y a de plus, calcule un écart.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "soustraction",
      "ecart",
      "template",
    ],
    generate: () => {
      const a = randomChoice([125, 240, 360, 425, 580]);
      const b = randomChoice([48, 95, 120, 175, 260]);
      const grand = Math.max(a, b);
      const petit = Math.min(a, b);
      const ecart = grand - petit;

      return {
        text: `Une école A a ${grand} élèves. Une école B a ${petit} élèves. Combien d’élèves l’école A a-t-elle de plus ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche combien il y a de plus, on calcule un écart.",
          "On soustrait le plus petit nombre au plus grand.",
          `${grand} - ${petit} = ${ecart}.`,
          `L’école A a ${ecart} élèves de plus.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_006_qcm_resultat_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche un total.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "addition",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([125, 236, 347, 458]);
      const b = randomChoice([42, 68, 95, 126]);
      const total = a + b;

      return {
        text: `Une association a ${a} affiches. Elle en imprime ${b} nouvelles. Combien d’affiches a-t-elle au total ?`,
        format: "qcm",
        choices: makeChoices(String(total), [
          String(a - b),
          String(total + 10),
          String(total - 10),
        ]),
        expected: [String(total)],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche une quantité totale.",
          "Les affiches déjà présentes et les nouvelles affiches s’ajoutent.",
          `${a} + ${b} = ${total}.`,
          `L’association a ${total} affiches au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_007_qcm_resultat_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche ce qui reste.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "soustraction",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([240, 360, 425, 580]);
      const retire = randomChoice([48, 95, 126, 175]);
      const reste = total - retire;

      return {
        text: `Une médiathèque possède ${total} magazines. Elle en retire ${retire} abîmés. Combien de magazines reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(String(reste), [
          String(total + retire),
          String(reste + 10),
          String(reste - 10),
        ]),
        expected: [String(reste)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand une quantité est retirée, on utilise une soustraction.",
          "On enlève les magazines abîmés au nombre total de magazines.",
          `${total} - ${retire} = ${reste}.`,
          `Il reste ${reste} magazines.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_008_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque panier contient la même quantité.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "reunion",
      "marche",
      "multiplication",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6, 8]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = paniers * fruits;

      return {
        text: `Au marché de Saint-Pierre, un vendeur prépare ${paniers} paniers avec ${fruits} fruits dans chaque panier. Combien y a-t-il de fruits au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème contient des groupes égaux.",
          "Chaque panier contient le même nombre de fruits, donc on utilise une multiplication.",
          `${paniers} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_009_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "reunion",
    hint: "On cherche ce qui reste à parcourir.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "reunion",
      "distance",
      "soustraction",
      "template",
    ],
    generate: () => {
      const total = randomChoice([8, 10, 12, 15, 18]);
      const parcouru = randomChoice([2, 3, 4, 5, 6]);
      const reste = total - parcouru;

      return {
        text: `Une randonnée fait ${total} km. La classe a déjà parcouru ${parcouru} km. Combien de kilomètres reste-t-il à parcourir ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche une distance restante, on utilise une soustraction.",
          "On enlève la distance déjà parcourue à la distance totale.",
          `${total} - ${parcouru} = ${reste}.`,
          `Il reste ${reste} km à parcourir.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_010_reunion_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "reunion",
    hint: "On partage en parts égales.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "reunion",
      "partage",
      "division",
      "template",
    ],
    generate: () => {
      const amis = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8]);
      const total = amis * part;

      return {
        text: `Pour une sortie à Mafate, on partage ${total} biscuits entre ${amis} élèves. Chaque élève reçoit le même nombre de biscuits. Combien de biscuits reçoit chaque élève ?`,
        format: "short",
        expected: [String(part)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on partage une quantité en parts égales, on utilise une division.",
          "On divise le nombre total de biscuits par le nombre d’élèves.",
          `${total} ÷ ${amis} = ${part}.`,
          `Chaque élève reçoit ${part} biscuits.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_011_open_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique pourquoi on additionne.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "open",
      "addition",
      "demarche",
      "template",
    ],
    generate: () => {
      const a = randomChoice([125, 236, 347]);
      const b = randomChoice([48, 75, 126]);
      const total = a + b;

      return {
        text: `Explique comment résoudre ce problème : une école a ${a} cahiers et reçoit ${b} cahiers. Combien de cahiers a-t-elle maintenant ?`,
        format: "open",
        expected: [String(a), String(b), "addition", "total", String(total)],
        comparator: "contains_keyword",
        explanation: exp(
          "On cherche une quantité totale après un ajout.",
          "Les cahiers déjà présents et les cahiers reçus s’ajoutent.",
          `${a} + ${b} = ${total}.`,
          `L’école a maintenant ${total} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_012_open_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique pourquoi on soustrait.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "open",
      "soustraction",
      "demarche",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const reste = total - retire;

      return {
        text: `Explique comment résoudre ce problème : une école possède ${total} feuilles. Elle en utilise ${retire}. Combien de feuilles reste-t-il ?`,
        format: "open",
        expected: [
          String(total),
          String(retire),
          "soustraction",
          "reste",
          String(reste),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On cherche ce qui reste après une utilisation.",
          "On enlève les feuilles utilisées au nombre de feuilles du départ.",
          `${total} - ${retire} = ${reste}.`,
          `Il reste ${reste} feuilles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_013_open_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "reunion",
    hint: "Explique pourquoi on multiplie.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "open",
      "multiplication",
      "reunion",
      "demarche",
      "template",
    ],
    generate: () => {
      const sacs = randomChoice([4, 5, 6, 8]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = sacs * fruits;

      return {
        text: `Au marché de Saint-Pierre, ${sacs} sacs contiennent chacun ${fruits} fruits. Explique comment trouver le nombre total de fruits.`,
        format: "open",
        expected: [
          String(sacs),
          String(fruits),
          "multiplication",
          "chacun",
          String(total),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On reconnaît des groupes égaux.",
          "Chaque sac contient le même nombre de fruits, donc on multiplie le nombre de sacs par le nombre de fruits par sac.",
          `${sacs} × ${fruits} = ${total}.`,
          `Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_une_etape_tpl_014_open_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le partage en parts égales.",
    tags: [
      "cm1",
      "probleme",
      "une_etape",
      "open",
      "division",
      "partage",
      "demarche",
      "template",
    ],
    generate: () => {
      const eleves = randomChoice([3, 4, 5, 6]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = eleves * part;

      return {
        text: `Explique comment résoudre ce problème : on partage ${total} images entre ${eleves} élèves. Chaque élève reçoit le même nombre d’images. Combien d’images reçoit chaque élève ?`,
        format: "open",
        expected: [
          String(total),
          String(eleves),
          "division",
          "partage",
          String(part),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On reconnaît un partage en parts égales.",
          "On divise le nombre total d’images par le nombre d’élèves.",
          `${total} ÷ ${eleves} = ${part}.`,
          `Chaque élève reçoit ${part} images.`
        ),
      };
    },
  },
    // ============================================================
  // PROBLEME_PLUSIEURS_ETAPES
  // Résoudre un problème à plusieurs étapes simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_plusieurs_etapes_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    text: "Une école reçoit 120 cahiers le matin et 85 cahiers l’après-midi. Elle en distribue 96. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["109"],
    comparator: "number_equal",
    hint: "Calcule d’abord le total reçu, puis enlève les cahiers distribués.",
    explanation: exp(
      "Un problème à plusieurs étapes demande plusieurs calculs dans le bon ordre.",
      "On commence par réunir les cahiers reçus, puis on enlève les cahiers distribués.",
      "120 + 85 = 205, puis 205 - 96 = 109.",
      "Il reste 109 cahiers."
    ),
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "addition",
      "soustraction",
      "modele",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_plusieurs_etapes_open_001_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment résoudre ce problème : une classe a déjà 18 livres. Elle reçoit 4 cartons de 12 livres. Combien de livres possède-t-elle maintenant ?",
    format: "open",
    expected: ["18", "4", "12", "multiplication", "addition", "66"],
    comparator: "contains_keyword",
    hint: "Calcule d’abord les livres dans les cartons, puis ajoute les livres déjà présents.",
    explanation: exp(
      "Dans un problème à plusieurs étapes, il faut comprendre l’ordre des actions.",
      "On calcule d’abord les 4 cartons de 12 livres, puis on ajoute les 18 livres déjà présents.",
      "4 × 12 = 48, puis 18 + 48 = 66.",
      "La classe possède maintenant 66 livres."
    ),
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "open",
      "demarche",
      "multiplication",
      "addition",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_plusieurs_etapes_open_002_erreur_ordre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève lit : « On achète 3 sacs de 8 billes, puis on donne 5 billes ». Il calcule 3 × (8 - 5). Explique son erreur.",
    format: "open",
    expected: ["3", "8", "5", "multiplication", "soustraction", "19"],
    comparator: "contains_keyword",
    hint: "On doit d’abord calculer toutes les billes achetées.",
    explanation: exp(
      "Dans un problème à plusieurs étapes, l’ordre des événements est important.",
      "On achète d’abord 3 sacs de 8 billes, puis on donne 5 billes.",
      "3 × 8 = 24, puis 24 - 5 = 19.",
      "L’élève a soustrait 5 dans chaque sac, alors qu’on donne seulement 5 billes au total."
    ),
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "open",
      "erreur",
      "ordre",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_001_addition_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne d’abord ce qui arrive, puis enlève ce qui part.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "addition",
      "soustraction",
      "template",
    ],
    generate: () => {
      const depart = randomChoice([120, 145, 180, 225, 260]);
      const ajoute = randomChoice([35, 48, 67, 85, 96]);
      const retire = randomChoice([24, 58, 73, 89, 112]);
      const reste = depart + ajoute - retire;

      return {
        text: `Une bibliothèque possède ${depart} livres. Elle reçoit ${ajoute} livres, puis elle en prête ${retire}. Combien de livres reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande deux étapes.",
          "On ajoute d’abord les livres reçus, puis on enlève les livres prêtés.",
          `${depart} + ${ajoute} = ${depart + ajoute}, puis ${depart + ajoute} - ${retire} = ${reste}.`,
          `Il reste ${reste} livres.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_002_soustraction_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis l’ordre de l’histoire : on enlève, puis on ajoute.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "soustraction",
      "addition",
      "template",
    ],
    generate: () => {
      const depart = randomChoice([150, 200, 240, 300, 360]);
      const retire = randomChoice([35, 48, 75, 96, 125]);
      const ajoute = randomChoice([24, 40, 65, 80, 115]);
      const total = depart - retire + ajoute;

      return {
        text: `Une école possède ${depart} feuilles. Elle en utilise ${retire}, puis elle en reçoit ${ajoute}. Combien de feuilles possède-t-elle maintenant ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un problème à plusieurs étapes, on suit l’ordre des actions.",
          "On enlève d’abord les feuilles utilisées, puis on ajoute les feuilles reçues.",
          `${depart} - ${retire} = ${depart - retire}, puis ${depart - retire} + ${ajoute} = ${total}.`,
          `L’école possède maintenant ${total} feuilles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_003_multiplication_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord les groupes identiques, puis ajoute ce qui est déjà présent.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "multiplication",
      "addition",
      "template",
    ],
    generate: () => {
      const deja = randomChoice([8, 12, 15, 20, 25]);
      const groupes = randomChoice([3, 4, 5, 6, 8]);
      const parGroupe = randomChoice([6, 8, 9, 12]);
      const total = deja + groupes * parGroupe;

      return {
        text: `Il y a déjà ${deja} cartes sur une table. On ajoute ${groupes} paquets de ${parGroupe} cartes. Combien y a-t-il de cartes au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème contient une quantité déjà présente et des groupes égaux.",
          "On calcule d’abord les cartes ajoutées, puis on ajoute les cartes déjà présentes.",
          `${groupes} × ${parGroupe} = ${groupes * parGroupe}, puis ${deja} + ${groupes * parGroupe} = ${total}.`,
          `Il y a ${total} cartes au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_004_multiplication_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le total des groupes, puis enlève ce qui est retiré.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "multiplication",
      "soustraction",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8]);
      const parGroupe = randomChoice([8, 9, 10, 12]);
      const retire = randomChoice([6, 10, 15, 20]);
      const totalBrut = groupes * parGroupe;
      const reste = totalBrut - retire;

      return {
        text: `${groupes} boîtes contiennent chacune ${parGroupe} objets. On retire ${retire} objets abîmés. Combien d’objets reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande une multiplication puis une soustraction.",
          "On calcule d’abord le nombre total d’objets, puis on enlève les objets abîmés.",
          `${groupes} × ${parGroupe} = ${totalBrut}, puis ${totalBrut} - ${retire} = ${reste}.`,
          `Il reste ${reste} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_005_deux_multiplications_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule chaque type de groupe, puis additionne les deux résultats.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "deux_multiplications",
      "addition",
      "template",
    ],
    generate: () => {
      const groupes1 = randomChoice([3, 4, 5]);
      const quantite1 = randomChoice([6, 8, 10, 12]);
      const groupes2 = randomChoice([2, 3, 4]);
      const quantite2 = randomChoice([5, 7, 9, 11]);

      const total1 = groupes1 * quantite1;
      const total2 = groupes2 * quantite2;
      const total = total1 + total2;

      return {
        text: `Une classe prépare ${groupes1} paquets de ${quantite1} cartes et ${groupes2} paquets de ${quantite2} cartes. Combien de cartes prépare-t-elle en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème contient deux sortes de groupes égaux.",
          "On calcule chaque total séparément, puis on additionne.",
          `${groupes1} × ${quantite1} = ${total1}, puis ${groupes2} × ${quantite2} = ${total2}. Enfin ${total1} + ${total2} = ${total}.`,
          `La classe prépare ${total} cartes en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_006_reunion_marche_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule les fruits dans chaque type de panier, puis additionne.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "reunion",
      "marche",
      "template",
    ],
    generate: () => {
      const paniersMangues = randomChoice([3, 4, 5]);
      const mangues = randomChoice([6, 8, 10, 12]);
      const paniersLetchis = randomChoice([2, 3, 4]);
      const letchis = randomChoice([8, 10, 12, 15]);

      const totalMangues = paniersMangues * mangues;
      const totalLetchis = paniersLetchis * letchis;
      const total = totalMangues + totalLetchis;

      return {
        text: `Au marché de Saint-Pierre, une famille achète ${paniersMangues} paniers de ${mangues} mangues et ${paniersLetchis} paniers de ${letchis} letchis. Combien de fruits achète-t-elle en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème demande de calculer deux groupes de fruits différents.",
          "On calcule les mangues, puis les letchis, puis on additionne.",
          `${paniersMangues} × ${mangues} = ${totalMangues}, puis ${paniersLetchis} × ${letchis} = ${totalLetchis}. Enfin ${totalMangues} + ${totalLetchis} = ${total}.`,
          `La famille achète ${total} fruits en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_007_reunion_ecologie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le total ramassé, puis retire ce qui a déjà été compté.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "reunion",
      "ecologie",
      "template",
    ],
    generate: () => {
      const classes = randomChoice([4, 5, 6, 7]);
      const dechets = randomChoice([12, 15, 18, 20]);
      const dejaComptes = randomChoice([10, 15, 20, 25]);
      const totalBrut = classes * dechets;
      const total = totalBrut - dejaComptes;

      return {
        text: `Sur une plage de La Réunion, ${classes} classes ramassent chacune ${dechets} déchets. On retire ${dejaComptes} déchets déjà comptés. Quel est le total corrigé ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème combine une multiplication et une soustraction.",
          "On calcule d’abord le total brut, puis on retire ce qui a déjà été compté.",
          `${classes} × ${dechets} = ${totalBrut}, puis ${totalBrut} - ${dejaComptes} = ${total}.`,
          `Le total corrigé est ${total} déchets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_008_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais les calculs dans l’ordre du problème.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "qcm",
      "resultat",
      "template",
    ],
    generate: () => {
      const depart = randomChoice([100, 120, 150, 200]);
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
    id: "cm1_probleme_plusieurs_etapes_tpl_009_qcm_ordre_calculs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère ce qu’il faut calculer en premier.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "qcm",
      "ordre",
      "template",
    ],
    generate: () => {
      const deja = randomChoice([8, 12, 15, 20]);
      const groupes = randomChoice([3, 4, 5, 6]);
      const parGroupe = randomChoice([6, 8, 9, 12]);
      const correct = `${groupes} × ${parGroupe}, puis ajouter ${deja}`;

      return {
        text: `Il y a déjà ${deja} cartes. On ajoute ${groupes} paquets de ${parGroupe} cartes. Quelle démarche est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${deja} + ${groupes}, puis multiplier par ${parGroupe}`,
          `${deja} - ${groupes}, puis ajouter ${parGroupe}`,
          `${groupes} + ${parGroupe}, puis enlever ${deja}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème à plusieurs étapes, il faut choisir le bon ordre des calculs.",
          "Les paquets sont des groupes égaux, donc on commence par une multiplication.",
          `On calcule d’abord ${groupes} × ${parGroupe}, puis on ajoute ${deja}.`,
          "Cette démarche respecte le sens du problème."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_010_open_demarche_add_sous",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique les deux étapes dans l’ordre.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "open",
      "demarche",
      "addition",
      "soustraction",
      "template",
    ],
    generate: () => {
      const depart = randomChoice([140, 180, 220, 260]);
      const ajoute = randomChoice([45, 68, 75, 95]);
      const retire = randomChoice([38, 57, 84, 126]);
      const reste = depart + ajoute - retire;

      return {
        text: `Explique comment résoudre ce problème : une association possède ${depart} affiches. Elle en reçoit ${ajoute}, puis elle en distribue ${retire}. Combien d’affiches reste-t-il ?`,
        format: "open",
        expected: [
          String(depart),
          String(ajoute),
          String(retire),
          "addition",
          "soustraction",
          String(reste),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Il faut suivre les étapes du problème.",
          "On ajoute d’abord les affiches reçues, puis on enlève les affiches distribuées.",
          `${depart} + ${ajoute} = ${depart + ajoute}, puis ${depart + ajoute} - ${retire} = ${reste}.`,
          `Il reste ${reste} affiches.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_011_open_demarche_mult_add",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord les paniers, puis ajoute ce qui est déjà là.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "open",
      "reunion",
      "multiplication",
      "addition",
      "template",
    ],
    generate: () => {
      const deja = randomChoice([5, 8, 12, 15]);
      const paniers = randomChoice([3, 4, 5]);
      const fruits = randomChoice([6, 8, 9, 12]);
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
          "Ce problème contient une quantité déjà présente et des groupes égaux.",
          "On calcule d’abord les fruits achetés dans les paniers, puis on ajoute les fruits déjà dans le sac.",
          `${paniers} × ${fruits} = ${paniers * fruits}, puis ${deja} + ${paniers * fruits} = ${total}.`,
          `Lina a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_plusieurs_etapes_tpl_012_open_erreur_ordre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique pourquoi l’ordre des calculs ne respecte pas l’histoire.",
    tags: [
      "cm1",
      "probleme",
      "plusieurs_etapes",
      "open",
      "erreur",
      "ordre",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6]);
      const parGroupe = randomChoice([6, 8, 9, 12]);
      const donne = randomChoice([4, 5, 6, 8]);
      const correct = groupes * parGroupe - donne;
      const wrong = groupes * (parGroupe - donne);

      return {
        text: `Un élève lit : « On achète ${groupes} paquets de ${parGroupe} cartes, puis on donne ${donne} cartes ». Il calcule ${groupes} × (${parGroupe} - ${donne}) = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(groupes),
          String(parGroupe),
          String(donne),
          "multiplication",
          "soustraction",
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un problème à plusieurs étapes, l’ordre des actions est essentiel.",
          "On achète d’abord tous les paquets, puis on donne quelques cartes au total.",
          `${groupes} × ${parGroupe} = ${groupes * parGroupe}, puis ${groupes * parGroupe} - ${donne} = ${correct}.`,
          `Le bon résultat est ${correct}, car on ne retire pas ${donne} cartes dans chaque paquet.`
        ),
      };
    },
  },
    // ============================================================
  // PROBLEME_REDIGER
  // Rédiger une réponse claire à un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_rediger_fixed_001_phrase_reponse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle phrase-réponse est la plus claire pour conclure : « 125 + 48 = 173 » dans un problème de livres ?",
    format: "qcm",
    choices: [
      "La bibliothèque possède 173 livres.",
      "Ça fait 173.",
      "125 + 48.",
      "Il y en a beaucoup.",
    ],
    expected: ["La bibliothèque possède 173 livres."],
    comparator: "mcq_exact",
    hint: "Une phrase-réponse doit reprendre le contexte et l’unité.",
    explanation: exp(
      "Rédiger une réponse claire, c’est transformer un calcul en réponse au problème.",
      "On reprend les mots importants de la question et on précise ce que représente le nombre.",
      "Ici, 173 représente un nombre de livres.",
      "La phrase claire est : La bibliothèque possède 173 livres."
    ),
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "phrase_reponse",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_rediger_open_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Une classe possède 120 cahiers et reçoit 45 cahiers. Le calcul est 120 + 45 = 165. Rédige une phrase-réponse claire.",
    format: "open",
    expected: ["classe", "possède", "165", "cahiers"],
    comparator: "contains_keyword",
    hint: "Ta phrase doit dire ce que représente 165.",
    explanation: exp(
      "Une phrase-réponse doit répondre à la question avec des mots.",
      "On reprend le contexte : la classe et les cahiers.",
      "120 + 45 = 165.",
      "Une phrase claire est : La classe possède 165 cahiers."
    ),
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "phrase_reponse",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_rediger_open_002_erreur_nombre_seul",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève répond seulement : « 48 ». Explique pourquoi ce n’est pas une réponse complète à un problème.",
    format: "open",
    expected: ["phrase", "unité", "réponse", "ce que représente", "contexte"],
    comparator: "contains_keyword",
    hint: "Le lecteur doit comprendre ce que signifie 48.",
    explanation: exp(
      "Un nombre seul ne suffit pas toujours à répondre clairement à un problème.",
      "Une phrase-réponse précise ce que représente le résultat et donne l’unité.",
      "Par exemple, 48 peut représenter des euros, des livres, des fruits ou des kilomètres.",
      "Il faut donc rédiger une phrase complète avec le contexte."
    ),
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "erreur",
      "nombre_seul",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_001_choisir_phrase_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis la phrase qui répond vraiment à la question.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "qcm",
      "phrase_reponse",
      "addition",
      "template",
    ],
    generate: () => {
      const a = randomChoice([120, 145, 230, 315]);
      const b = randomChoice([35, 48, 72, 86]);
      const total = a + b;

      const correct = `La bibliothèque possède ${total} livres.`;

      return {
        text: `Une bibliothèque possède ${a} livres. Elle reçoit ${b} nouveaux livres. Le calcul est ${a} + ${b} = ${total}. Quelle phrase-réponse est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `La bibliothèque possède ${a} livres.`,
          `La bibliothèque reçoit ${b} livres.`,
          `${total}.`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une phrase-réponse doit répondre précisément à la question.",
          "Ici, on cherche le nombre total de livres après l’ajout.",
          `${a} + ${b} = ${total}.`,
          `La phrase claire est : La bibliothèque possède ${total} livres.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_002_choisir_phrase_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche ce qui reste.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "qcm",
      "phrase_reponse",
      "soustraction",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const reste = total - retire;

      const correct = `Il reste ${reste} feuilles.`;

      return {
        text: `Une école possède ${total} feuilles. Elle en utilise ${retire}. Le calcul est ${total} - ${retire} = ${reste}. Quelle phrase-réponse est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `Il reste ${retire} feuilles.`,
          `Il y avait ${total} feuilles.`,
          `${reste}.`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une phrase-réponse doit expliquer ce que représente le résultat.",
          "Ici, le résultat représente le nombre de feuilles restantes.",
          `${total} - ${retire} = ${reste}.`,
          `La phrase claire est : Il reste ${reste} feuilles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_003_choisir_phrase_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "reunion",
    hint: "La phrase doit répondre avec le total de fruits.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "qcm",
      "phrase_reponse",
      "multiplication",
      "reunion",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = paniers * fruits;

      const correct = `Il y a ${total} fruits au total.`;

      return {
        text: `Au marché de Saint-Pierre, il y a ${paniers} paniers de ${fruits} fruits. Le calcul est ${paniers} × ${fruits} = ${total}. Quelle phrase-réponse est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `Il y a ${paniers} fruits.`,
          `Il y a ${fruits} paniers.`,
          `${total}.`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une phrase-réponse doit reprendre le contexte du problème.",
          "Ici, le résultat représente le nombre total de fruits.",
          `${paniers} × ${fruits} = ${total}.`,
          `La phrase claire est : Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_004_choisir_phrase_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "La phrase doit dire combien chaque élève reçoit.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "qcm",
      "phrase_reponse",
      "division",
      "template",
    ],
    generate: () => {
      const eleves = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8]);
      const total = eleves * part;

      const correct = `Chaque élève reçoit ${part} cartes.`;

      return {
        text: `On partage ${total} cartes entre ${eleves} élèves. Le calcul est ${total} ÷ ${eleves} = ${part}. Quelle phrase-réponse est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `Chaque élève reçoit ${total} cartes.`,
          `Il y a ${eleves} cartes.`,
          `${part}.`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une phrase-réponse doit répondre exactement à la question posée.",
          "Ici, on cherche combien de cartes reçoit chaque élève.",
          `${total} ÷ ${eleves} = ${part}.`,
          `La phrase claire est : Chaque élève reçoit ${part} cartes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_005_open_rediger_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "Ta phrase doit contenir le résultat et l’objet compté.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "phrase_reponse",
      "addition",
      "template",
    ],
    generate: () => {
      const a = randomChoice([125, 236, 347]);
      const b = randomChoice([48, 75, 126]);
      const total = a + b;

      return {
        text: `Une école a ${a} cahiers et reçoit ${b} cahiers. Le calcul est ${a} + ${b} = ${total}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: ["école", String(total), "cahiers"],
        comparator: "contains_keyword",
        explanation: exp(
          "Rédiger une phrase-réponse, c’est donner le résultat dans le contexte du problème.",
          "On doit préciser ce que représente le nombre obtenu.",
          `${a} + ${b} = ${total}.`,
          `Une phrase claire est : L’école a ${total} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_006_open_rediger_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "neutral",
    hint: "Ta phrase doit dire ce qui reste.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "phrase_reponse",
      "soustraction",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const reste = total - retire;

      return {
        text: `Une classe possède ${total} feuilles. Elle en utilise ${retire}. Le calcul est ${total} - ${retire} = ${reste}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: ["reste", String(reste), "feuilles"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une phrase-réponse doit être compréhensible sans relire tout le calcul.",
          "Ici, le résultat représente les feuilles restantes.",
          `${total} - ${retire} = ${reste}.`,
          `Une phrase claire est : Il reste ${reste} feuilles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_007_open_rediger_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "reunion",
    hint: "Ta phrase doit dire combien il y a de fruits au total.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "phrase_reponse",
      "multiplication",
      "reunion",
      "template",
    ],
    generate: () => {
      const sacs = randomChoice([4, 5, 6, 8]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const total = sacs * fruits;

      return {
        text: `Au marché de Saint-Pierre, ${sacs} sacs contiennent chacun ${fruits} fruits. Le calcul est ${sacs} × ${fruits} = ${total}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: [String(total), "fruits", "total"],
        comparator: "contains_keyword",
        explanation: exp(
          "La phrase-réponse doit reprendre le contexte du problème.",
          "Ici, le résultat représente le nombre total de fruits.",
          `${sacs} × ${fruits} = ${total}.`,
          `Une phrase claire est : Il y a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_008_open_rediger_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Ta phrase doit dire combien chaque élève reçoit.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "phrase_reponse",
      "division",
      "template",
    ],
    generate: () => {
      const eleves = randomChoice([3, 4, 5, 6]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = eleves * part;

      return {
        text: `On partage ${total} images entre ${eleves} élèves. Le calcul est ${total} ÷ ${eleves} = ${part}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: ["chaque", "élève", String(part), "images"],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un problème de partage, la phrase-réponse doit préciser la part de chacun.",
          "On indique donc combien chaque élève reçoit.",
          `${total} ÷ ${eleves} = ${part}.`,
          `Une phrase claire est : Chaque élève reçoit ${part} images.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_009_open_phrase_complete_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "reunion",
    hint: "Ta phrase doit répondre avec une unité.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "reunion",
      "distance",
      "template",
    ],
    generate: () => {
      const total = randomChoice([8, 10, 12, 15, 18]);
      const parcouru = randomChoice([2, 3, 4, 5, 6]);
      const reste = total - parcouru;

      return {
        text: `Une randonnée fait ${total} km. Une classe a déjà parcouru ${parcouru} km. Le calcul est ${total} - ${parcouru} = ${reste}. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: ["reste", String(reste), "km"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une phrase-réponse doit préciser l’unité du résultat.",
          "Ici, le résultat représente une distance restante en kilomètres.",
          `${total} - ${parcouru} = ${reste}.`,
          `Une phrase claire est : Il reste ${reste} km à parcourir.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_010_open_corriger_phrase",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Il faut préciser ce que représente le nombre.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "open",
      "corriger",
      "phrase_reponse",
      "template",
    ],
    generate: () => {
      const objets = randomChoice([
        "livres",
        "cahiers",
        "cartes",
        "fruits",
        "images",
      ]);
      const result = randomChoice([36, 48, 75, 120, 165]);

      return {
        text: `Un élève répond seulement : « ${result} ». Le problème parlait de ${objets}. Corrige sa réponse pour faire une phrase complète.`,
        format: "open",
        expected: [String(result), objets],
        comparator: "contains_keyword",
        explanation: exp(
          "Une réponse complète doit être une phrase compréhensible.",
          "Le nombre seul ne dit pas ce qu’il représente.",
          `Ici, ${result} représente des ${objets}.`,
          `Une phrase possible est : Il y a ${result} ${objets}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_rediger_tpl_011_qcm_reperer_mauvaise_phrase",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "neutral",
    hint: "Une mauvaise phrase-réponse est vague ou ne donne pas l’unité.",
    tags: [
      "cm1",
      "probleme",
      "rediger",
      "qcm",
      "erreur",
      "template",
    ],
    generate: () => {
      const result = randomChoice([42, 56, 84, 125]);
      const unit = randomChoice(["fruits", "livres", "cartes", "cahiers"]);
      const correct = `Il y a ${result} ${unit}.`;

      return {
        text: `Quelle phrase-réponse est la plus claire si le résultat du problème est ${result} ${unit} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${result}.`,
          "J’ai trouvé le résultat.",
          "C’est fini.",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une bonne phrase-réponse doit être claire et complète.",
          "Elle indique le résultat et ce que ce résultat représente.",
          `Le résultat est ${result} ${unit}.`,
          `La phrase claire est : ${correct}`
        ),
      };
    },
  },

    // ============================================================
  // PROBLEME_VERIFIER
  // Vérifier la cohérence d’un résultat
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_verifier_fixed_001_resultat_plausible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Une classe a 120 cahiers et reçoit 45 cahiers. Un élève répond : « 165 cahiers ». Ce résultat est-il cohérent ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On ajoute 45 à 120 : le résultat doit être plus grand que 120.",
    explanation: exp(
      "Vérifier un résultat, c’est regarder s’il est logique par rapport au problème.",
      "Ici, la classe reçoit des cahiers en plus, donc le résultat doit être plus grand que 120.",
      "120 + 45 = 165.",
      "Le résultat 165 cahiers est cohérent."
    ),
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "coherence",
      "addition",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_verifier_fixed_002_resultat_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Une école possède 200 feuilles. Elle en utilise 60. Un élève répond : « Il reste 260 feuilles ». Ce résultat est-il cohérent ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Si on utilise des feuilles, il doit en rester moins qu’au départ.",
    explanation: exp(
      "Vérifier un résultat, c’est contrôler s’il a du sens.",
      "Ici, on enlève 60 feuilles, donc le résultat doit être plus petit que 200.",
      "200 - 60 = 140.",
      "Le résultat 260 feuilles n’est pas cohérent."
    ),
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "coherence",
      "soustraction",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_verifier_open_001_expliquer_incoherence",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 6 boîtes de 8 crayons font 14 crayons ». Explique pourquoi ce résultat n’est pas cohérent.",
    format: "open",
    expected: ["6", "8", "multiplication", "48", "14"],
    comparator: "contains_keyword",
    hint: "6 boîtes de 8 crayons, c’est beaucoup plus que 14 crayons.",
    explanation: exp(
      "Vérifier la cohérence, c’est comparer le résultat avec la situation.",
      "Ici, il y a 6 groupes de 8 crayons, donc on utilise une multiplication.",
      "6 × 8 = 48, et non 14.",
      "Le résultat 14 vient probablement de 6 + 8 : il n’est pas cohérent."
    ),
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "open",
      "incoherence",
      "multiplication",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_001_addition_plus_grand_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on ajoute, le résultat doit être plus grand que le nombre de départ.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "addition",
      "coherence",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([120, 145, 230, 315]);
      const b = randomChoice([35, 48, 72, 86]);
      const correct = a + b;

      return {
        text: `Une bibliothèque possède ${a} livres et reçoit ${b} livres. Un élève répond : « ${correct} livres ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème d’ajout, le résultat doit être plus grand que la quantité de départ.",
          "On vérifie aussi avec le calcul.",
          `${a} + ${b} = ${correct}.`,
          `Le résultat ${correct} livres est cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_002_addition_erreur_trop_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Si on reçoit des objets en plus, le total ne peut pas diminuer.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "addition",
      "erreur",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([120, 145, 230, 315]);
      const b = randomChoice([35, 48, 72, 86]);
      const correct = a + b;
      const wrong = Math.max(0, a - b);

      return {
        text: `Une école a ${a} cahiers et reçoit ${b} cahiers. Un élève répond : « ${wrong} cahiers ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand une quantité augmente, le résultat doit être plus grand que la quantité de départ.",
          "Ici, l’élève donne un résultat plus petit : cela ne correspond pas à la situation.",
          `${a} + ${b} = ${correct}, et non ${wrong}.`,
          `Le résultat ${wrong} cahiers n’est pas cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_003_soustraction_plus_petit_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on enlève, le résultat doit être plus petit que la quantité de départ.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "soustraction",
      "coherence",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const reste = total - retire;

      return {
        text: `Une classe possède ${total} feuilles. Elle en utilise ${retire}. Un élève répond : « Il reste ${reste} feuilles ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on enlève une quantité, le résultat doit être plus petit que la quantité de départ.",
          "On vérifie avec une soustraction.",
          `${total} - ${retire} = ${reste}.`,
          `Le résultat ${reste} feuilles est cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_004_soustraction_erreur_trop_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Si on enlève des objets, il ne peut pas en rester plus qu’au départ.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "soustraction",
      "erreur",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const correct = total - retire;
      const wrong = total + retire;

      return {
        text: `Une école possède ${total} feuilles. Elle en utilise ${retire}. Un élève répond : « Il reste ${wrong} feuilles ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on utilise des feuilles, il doit en rester moins qu’au départ.",
          "Le résultat proposé est plus grand que la quantité de départ, donc il n’a pas de sens.",
          `${total} - ${retire} = ${correct}, et non ${wrong}.`,
          `Le résultat ${wrong} feuilles n’est pas cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_005_multiplication_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Des groupes égaux se calculent souvent par multiplication.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "multiplication",
      "erreur_addition",
      "qcm",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8]);
      const quantite = randomChoice([6, 8, 9, 12]);
      const correct = groupes * quantite;
      const wrong = groupes + quantite;

      return {
        text: `${groupes} sacs contiennent chacun ${quantite} objets. Un élève répond : « ${wrong} objets ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand il y a des groupes égaux, on utilise une multiplication.",
          "Additionner les deux nombres ne donne pas le total des objets.",
          `${groupes} × ${quantite} = ${correct}, et non ${groupes} + ${quantite} = ${wrong}.`,
          `Le résultat ${wrong} objets n’est pas cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_006_division_resultat_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie en multipliant la part par le nombre d’élèves.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "division",
      "partage",
      "qcm",
      "template",
    ],
    generate: () => {
      const eleves = randomChoice([3, 4, 5, 6, 8]);
      const part = randomChoice([4, 5, 6, 8, 9]);
      const total = eleves * part;

      return {
        text: `On partage ${total} cartes entre ${eleves} élèves. Un élève répond : « Chaque élève reçoit ${part} cartes ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour vérifier un partage, on peut refaire l’opération inverse.",
          "Si chaque élève reçoit la même quantité, on multiplie la part par le nombre d’élèves.",
          `${part} × ${eleves} = ${total}.`,
          `Le résultat est cohérent : chaque élève reçoit ${part} cartes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_007_ordre_grandeur_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise un ordre de grandeur pour savoir si le résultat est plausible.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "ordre_grandeur",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomChoice([198, 203, 297, 402, 498]);
      const b = randomChoice([3, 4, 5, 6]);
      const correct = a * b;
      const rounded = Math.round(a / 100) * 100;
      const approx = rounded * b;

      return {
        text: `Pour calculer ${a} × ${b}, quel ordre de grandeur est le plus raisonnable ?`,
        format: "qcm",
        choices: makeChoices(`environ ${approx}`, [
          "environ 20",
          `environ ${approx + 1000}`,
          `environ ${Math.max(0, approx - 1000)}`,
        ]),
        expected: [`environ ${approx}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un ordre de grandeur permet de vérifier si un résultat est plausible.",
          "On remplace le nombre par une valeur proche plus simple.",
          `${a} est proche de ${rounded}, donc ${a} × ${b} est proche de ${rounded} × ${b} = ${approx}.`,
          `Un ordre de grandeur raisonnable est environ ${approx}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_008_reunion_marche_coherence",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient plusieurs fruits : le total doit être plus grand que le nombre de paniers.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "reunion",
      "marche",
      "multiplication",
      "qcm",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6]);
      const fruits = randomChoice([6, 8, 9, 12]);
      const correct = paniers * fruits;
      const wrong = paniers + fruits;

      return {
        text: `Au marché de Saint-Pierre, ${paniers} paniers contiennent chacun ${fruits} fruits. Un élève répond : « ${wrong} fruits ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le problème décrit des groupes égaux.",
          "Chaque panier contient plusieurs fruits, donc on doit multiplier le nombre de paniers par le nombre de fruits par panier.",
          `${paniers} × ${fruits} = ${correct}, et non ${wrong}.`,
          `Le résultat ${wrong} fruits n’est pas cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_009_reunion_distance_coherence",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 3,
    theme: "reunion",
    hint: "La distance restante doit être plus petite que la distance totale.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "reunion",
      "distance",
      "soustraction",
      "qcm",
      "template",
    ],
    generate: () => {
      const total = randomChoice([8, 10, 12, 15, 18]);
      const parcouru = randomChoice([2, 3, 4, 5, 6]);
      const correct = total - parcouru;
      const wrong = total + parcouru;

      return {
        text: `Une randonnée fait ${total} km. La classe a déjà parcouru ${parcouru} km. Un élève répond : « Il reste ${wrong} km ». Ce résultat est-il cohérent ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on cherche une distance restante, le résultat doit être plus petit que la distance totale.",
          "On enlève la distance déjà parcourue à la distance totale.",
          `${total} - ${parcouru} = ${correct}, et non ${wrong}.`,
          `Le résultat ${wrong} km n’est pas cohérent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_010_open_expliquer_coherence_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que le résultat doit augmenter.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "open",
      "coherence",
      "addition",
      "template",
    ],
    generate: () => {
      const a = randomChoice([120, 145, 230, 315]);
      const b = randomChoice([35, 48, 72, 86]);
      const correct = a + b;

      return {
        text: `Une école possède ${a} cahiers et reçoit ${b} cahiers. Un élève répond : « ${a - b} cahiers ». Explique pourquoi ce résultat n’est pas cohérent.`,
        format: "open",
        expected: [String(a), String(b), "addition", "plus grand", String(correct)],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on reçoit une quantité en plus, le résultat doit augmenter.",
          "Le résultat proposé est plus petit que la quantité de départ, donc il ne correspond pas à la situation.",
          `${a} + ${b} = ${correct}.`,
          `Le résultat cohérent est ${correct} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_011_open_expliquer_coherence_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que le résultat doit diminuer.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "open",
      "coherence",
      "soustraction",
      "template",
    ],
    generate: () => {
      const total = randomChoice([150, 240, 360, 500]);
      const retire = randomChoice([35, 85, 126, 175]);
      const correct = total - retire;
      const wrong = total + retire;

      return {
        text: `Une classe possède ${total} feuilles et en utilise ${retire}. Un élève répond : « Il reste ${wrong} feuilles ». Explique pourquoi ce résultat n’est pas cohérent.`,
        format: "open",
        expected: [
          String(total),
          String(retire),
          "soustraction",
          "plus petit",
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Quand on utilise ou retire une quantité, le résultat doit diminuer.",
          "Le résultat proposé est plus grand que la quantité de départ, donc il n’a pas de sens.",
          `${total} - ${retire} = ${correct}.`,
          `Le résultat cohérent est ${correct} feuilles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_verifier_tpl_012_open_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_verifier",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique pourquoi l’addition ne convient pas.",
    tags: [
      "cm1",
      "probleme",
      "verifier",
      "open",
      "erreur",
      "operation",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8]);
      const quantite = randomChoice([6, 8, 9, 12]);
      const wrong = groupes + quantite;
      const correct = groupes * quantite;

      return {
        text: `Un élève lit : « ${groupes} boîtes contiennent chacune ${quantite} objets ». Il répond ${wrong} objets. Explique pourquoi ce résultat n’est pas cohérent.`,
        format: "open",
        expected: [
          String(groupes),
          String(quantite),
          "chacune",
          "multiplication",
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Le mot « chacune » indique des groupes égaux.",
          "Il ne faut pas additionner le nombre de boîtes et le nombre d’objets par boîte : il faut multiplier.",
          `${groupes} × ${quantite} = ${correct}, et non ${wrong}.`,
          `Le résultat cohérent est ${correct} objets.`
        ),
      };
    },
  },
    // ============================================================
  // PROBLEME_DEFI
  // Résoudre un défi de problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probleme_defi_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : une école reçoit 3 cartons de 24 cahiers. Elle distribue ensuite 38 cahiers. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Calcule d’abord le nombre total de cahiers reçus.",
    explanation: exp(
      "Un défi de problème demande souvent plusieurs étapes.",
      "On calcule d’abord le total des cahiers dans les cartons, puis on enlève les cahiers distribués.",
      "3 × 24 = 72, puis 72 - 38 = 34.",
      "Il reste 34 cahiers."
    ),
    tags: [
      "cm1",
      "probleme",
      "defi",
      "modele",
      "multiplication",
      "soustraction",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_probleme_defi_open_001_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment résoudre ce défi : une classe achète 4 lots de 18 cartes. Elle donne 25 cartes à une autre classe. Combien de cartes garde-t-elle ?",
    format: "open",
    expected: ["4", "18", "25", "multiplication", "soustraction", "47"],
    comparator: "contains_keyword",
    hint: "Calcule d’abord toutes les cartes achetées.",
    explanation: exp(
      "Dans un défi, il faut lire l’histoire dans l’ordre.",
      "On calcule d’abord les cartes achetées, puis on enlève les cartes données.",
      "4 × 18 = 72, puis 72 - 25 = 47.",
      "La classe garde 47 cartes."
    ),
    tags: [
      "cm1",
      "probleme",
      "defi",
      "open",
      "demarche",
      "multiplication",
      "soustraction",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_001_cartons_distribution",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le total dans les cartons, puis enlève ce qui est distribué.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "multiplication",
      "soustraction",
      "template",
    ],
    generate: () => {
      const cartons = randomChoice([3, 4, 5, 6]);
      const parCarton = randomChoice([12, 18, 20, 24, 25]);
      const distribues = randomChoice([18, 25, 32, 38, 45]);
      const total = cartons * parCarton;
      const reste = total - distribues;

      return {
        text: `Défi : une école reçoit ${cartons} cartons de ${parCarton} cahiers. Elle distribue ensuite ${distribues} cahiers. Combien de cahiers reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi demande une multiplication puis une soustraction.",
          "On calcule d’abord le nombre total de cahiers reçus, puis on enlève les cahiers distribués.",
          `${cartons} × ${parCarton} = ${total}, puis ${total} - ${distribues} = ${reste}.`,
          `Il reste ${reste} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_002_reunion_marche_deux_produits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule les deux achats, puis additionne.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "reunion",
      "marche",
      "deux_multiplications",
      "addition",
      "template",
    ],
    generate: () => {
      const paniers1 = randomChoice([3, 4, 5]);
      const fruits1 = randomChoice([8, 10, 12]);
      const paniers2 = randomChoice([2, 3, 4]);
      const fruits2 = randomChoice([6, 8, 9]);

      const total1 = paniers1 * fruits1;
      const total2 = paniers2 * fruits2;
      const total = total1 + total2;

      return {
        text: `Défi marché : une famille achète ${paniers1} paniers de ${fruits1} mangues et ${paniers2} paniers de ${fruits2} letchis. Combien de fruits achète-t-elle en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi contient deux groupes de fruits différents.",
          "On calcule les mangues, puis les letchis, puis on additionne les deux résultats.",
          `${paniers1} × ${fruits1} = ${total1}, puis ${paniers2} × ${fruits2} = ${total2}. Enfin ${total1} + ${total2} = ${total}.`,
          `La famille achète ${total} fruits en tout.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_003_reunion_ecologie_total_corrige",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le total ramassé, puis retire ce qui a déjà été compté.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "reunion",
      "ecologie",
      "multiplication",
      "soustraction",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7]);
      const dechets = randomChoice([12, 15, 18, 20]);
      const dejaComptes = randomChoice([10, 15, 20, 25]);

      const totalBrut = groupes * dechets;
      const total = totalBrut - dejaComptes;

      return {
        text: `Défi écologie : ${groupes} groupes ramassent chacun ${dechets} déchets sur une plage. On retire ${dejaComptes} déchets déjà comptés. Quel est le total corrigé ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi demande de calculer un total, puis de le corriger.",
          "On calcule d’abord les déchets ramassés par tous les groupes, puis on retire les déchets déjà comptés.",
          `${groupes} × ${dechets} = ${totalBrut}, puis ${totalBrut} - ${dejaComptes} = ${total}.`,
          `Le total corrigé est ${total} déchets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_004_argent_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord le prix des paniers, puis ajoute l’autre achat.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "reunion",
      "argent",
      "marche",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5]);
      const prixPanier = randomChoice([12, 15, 18, 20]);
      const autreAchat = randomChoice([8, 10, 12, 15]);

      const totalPaniers = paniers * prixPanier;
      const total = totalPaniers + autreAchat;

      return {
        text: `Au marché de Saint-Pierre, une famille achète ${paniers} paniers à ${prixPanier} € chacun et un jus à ${autreAchat} €. Combien paie-t-elle au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Ce problème mélange multiplication et addition.",
          "On calcule d’abord le prix des paniers, puis on ajoute le prix du jus.",
          `${paniers} × ${prixPanier} = ${totalPaniers}, puis ${totalPaniers} + ${autreAchat} = ${total}.`,
          `La famille paie ${total} € au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_005_distance_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les distances parcourues, puis compare avec la distance totale.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "reunion",
      "distance",
      "addition",
      "soustraction",
      "template",
    ],
    generate: () => {
      const total = randomChoice([12, 15, 18, 20]);
      const matin = randomChoice([3, 4, 5, 6]);
      const apresMidi = randomChoice([2, 3, 4, 5]);
      const parcouru = matin + apresMidi;
      const reste = total - parcouru;

      return {
        text: `Défi randonnée : un parcours fait ${total} km. Une classe marche ${matin} km le matin puis ${apresMidi} km l’après-midi. Combien de kilomètres reste-t-il à parcourir ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi demande de calculer la distance déjà parcourue, puis la distance restante.",
          "On additionne les distances parcourues, puis on soustrait ce total à la distance du parcours.",
          `${matin} + ${apresMidi} = ${parcouru}, puis ${total} - ${parcouru} = ${reste}.`,
          `Il reste ${reste} km à parcourir.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_006_decimaux_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Additionne les deux distances décimales.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "decimaux",
      "distance",
      "reunion",
      "template",
    ],
    generate: () => {
      const cases: [string, string, string][] = [
        ["2,4", "1,35", "3,75"],
        ["3,6", "2,25", "5,85"],
        ["1,75", "2,5", "4,25"],
        ["4,8", "1,15", "5,95"],
      ];

      const [a, b, total] = randomChoice(cases);

      return {
        text: `Défi décimal : une classe marche ${a} km le matin puis ${b} km l’après-midi. Quelle distance totale parcourt-elle ?`,
        format: "short",
        expected: [total, total.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Ce défi utilise une addition de nombres décimaux.",
          "On additionne les deux distances en alignant les virgules.",
          `${a} + ${b} = ${total}.`,
          `La classe parcourt ${total} km au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_007_qcm_demarches",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la démarche qui respecte l’ordre de l’histoire.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "qcm",
      "demarche",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6]);
      const parGroupe = randomChoice([8, 9, 12, 15]);
      const retire = randomChoice([5, 8, 10, 12]);

      const correct = `${groupes} × ${parGroupe}, puis enlever ${retire}`;

      return {
        text: `On achète ${groupes} paquets de ${parGroupe} cartes, puis on donne ${retire} cartes. Quelle démarche est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${groupes} + ${parGroupe}, puis enlever ${retire}`,
          `${parGroupe} - ${retire}, puis multiplier par ${groupes}`,
          `${groupes} × ${retire}, puis ajouter ${parGroupe}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une démarche correcte respecte l’ordre du problème.",
          "On calcule d’abord le total des cartes achetées, puis on enlève les cartes données.",
          `Il faut faire ${groupes} × ${parGroupe}, puis enlever ${retire}.`,
          "Cette démarche correspond bien à l’histoire."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_008_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais d’abord la multiplication.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "qcm",
      "resultat",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6]);
      const parGroupe = randomChoice([8, 9, 12, 15]);
      const retire = randomChoice([5, 8, 10, 12]);

      const total = groupes * parGroupe;
      const reste = total - retire;

      return {
        text: `On achète ${groupes} paquets de ${parGroupe} cartes, puis on donne ${retire} cartes. Combien de cartes reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(String(reste), [
          String(total),
          String(groupes + parGroupe - retire),
          String(groupes * (parGroupe - retire)),
        ]),
        expected: [String(reste)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ce défi demande deux étapes.",
          "On calcule d’abord toutes les cartes achetées, puis on enlève les cartes données.",
          `${groupes} × ${parGroupe} = ${total}, puis ${total} - ${retire} = ${reste}.`,
          `Il reste ${reste} cartes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_009_open_demarche_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Explique les calculs dans l’ordre.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "open",
      "demarche",
      "reunion",
      "template",
    ],
    generate: () => {
      const paniers = randomChoice([3, 4, 5]);
      const fruits = randomChoice([8, 10, 12]);
      const deja = randomChoice([4, 6, 8]);
      const total = paniers * fruits + deja;

      return {
        text: `Au marché de Saint-Pierre, Lina a déjà ${deja} fruits. Elle achète ${paniers} paniers contenant chacun ${fruits} fruits. Explique comment trouver le nombre total de fruits.`,
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
          "Dans ce défi, il faut combiner une quantité déjà présente et des groupes égaux.",
          "On calcule d’abord les fruits achetés, puis on ajoute les fruits déjà présents.",
          `${paniers} × ${fruits} = ${paniers * fruits}, puis ${paniers * fruits} + ${deja} = ${total}.`,
          `Lina a ${total} fruits au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_010_open_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique pourquoi il ne faut pas enlever dans chaque paquet.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "open",
      "erreur",
      "ordre",
      "template",
    ],
    generate: () => {
      const paquets = randomChoice([3, 4, 5, 6]);
      const cartes = randomChoice([8, 9, 12, 15]);
      const donne = randomChoice([4, 5, 6]);

      const wrong = paquets * (cartes - donne);
      const correct = paquets * cartes - donne;

      return {
        text: `Un élève lit : « On achète ${paquets} paquets de ${cartes} cartes, puis on donne ${donne} cartes ». Il calcule ${paquets} × (${cartes} - ${donne}) = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(paquets),
          String(cartes),
          String(donne),
          "multiplication",
          "soustraction",
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "L’erreur vient de l’ordre et du sens des actions.",
          "On donne seulement quelques cartes après l’achat, on ne retire pas ce nombre dans chaque paquet.",
          `${paquets} × ${cartes} = ${paquets * cartes}, puis ${paquets * cartes} - ${donne} = ${correct}.`,
          `Le bon résultat est ${correct}, pas ${wrong}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_011_open_inventer_phrase",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ta phrase doit être claire et indiquer l’unité.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "open",
      "redaction",
      "template",
    ],
    generate: () => {
      const groupes = randomChoice([4, 5, 6]);
      const objets = randomChoice([8, 9, 12]);
      const retire = randomChoice([5, 6, 8]);
      const total = groupes * objets - retire;

      return {
        text: `On calcule ${groupes} × ${objets} - ${retire} = ${total} dans un problème qui parle d’objets. Rédige une phrase-réponse claire.`,
        format: "open",
        expected: [String(total), "objets"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une phrase-réponse doit transformer le résultat en réponse compréhensible.",
          "On indique le nombre obtenu et ce qu’il représente.",
          `${groupes} × ${objets} - ${retire} = ${total}.`,
          `Une phrase possible est : Il reste ${total} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probleme_defi_tpl_012_open_verifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie si le résultat est logique par rapport à l’histoire.",
    tags: [
      "cm1",
      "probleme",
      "defi",
      "open",
      "verifier",
      "coherence",
      "template",
    ],
    generate: () => {
      const boites = randomChoice([4, 5, 6]);
      const objets = randomChoice([8, 10, 12]);
      const correct = boites * objets;
      const wrong = boites + objets;

      return {
        text: `Un élève dit : « ${boites} boîtes de ${objets} objets font ${wrong} objets ». Explique pourquoi ce résultat n’est pas cohérent.`,
        format: "open",
        expected: [
          String(boites),
          String(objets),
          "boîtes",
          "multiplication",
          String(correct),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour vérifier un résultat, on compare le calcul avec le sens du problème.",
          "Des boîtes contenant chacune le même nombre d’objets forment des groupes égaux.",
          `${boites} × ${objets} = ${correct}, et non ${boites} + ${objets} = ${wrong}.`,
          `Le résultat cohérent est ${correct} objets.`
        ),
      };
    },
  },
];
