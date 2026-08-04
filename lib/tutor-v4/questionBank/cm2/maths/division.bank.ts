// lib/tutor-v4/question-banks/maths/cm2/division.bank.ts

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

export const divisionBank: TutorBankItemV4[] = [
  // ============================================================
  // DIVISION_SENS
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_1_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On partage 24 bonbons entre 6 enfants. Combien chaque enfant reçoit-il de bonbons ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On cherche la part de chaque enfant.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total par le nombre de parts.",
      "24 ÷ 6 = 4.",
      "Chaque enfant reçoit 4 bonbons."
    ),
    tags: ["cm2", "division", "sens", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_2_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On range 30 cartes par paquets de 5. Combien peut-on faire de paquets ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 5 on peut faire.",
    explanation: exp(
      "La division peut aussi servir à faire des groupes de même taille.",
      "On cherche combien de fois 5 entre dans 30.",
      "30 ÷ 5 = 6.",
      "On peut faire 6 paquets."
    ),
    tags: ["cm2", "division", "sens", "groupement"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_3_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle situation utilise-t-on une division ?",
    format: "qcm",
    choices: [
      "partager 32 objets entre 4 élèves",
      "ajouter 32 objets et 4 objets",
      "enlever 4 objets à 32 objets",
      "compter 4 objets seulement",
    ],
    expected: ["partager 32 objets entre 4 élèves"],
    comparator: "mcq_exact",
    hint: "La division sert souvent à partager équitablement.",
    explanation: exp(
      "La division est utile quand on partage ou quand on fait des groupes égaux.",
      "On repère la situation où une quantité est répartie en parts égales.",
      "Partager 32 objets entre 4 élèves correspond à 32 ÷ 4.",
      "Cette situation utilise une division."
    ),
    tags: ["cm2", "division", "sens", "qcm", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève partage 20 billes entre 5 enfants et calcule 20 + 5. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « partage » indique souvent une division.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à la situation.",
      "Quand on partage une quantité en parts égales, on utilise une division.",
      "Il fallait calculer 20 ÷ 5 = 4, et non 20 + 5.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "division", "sens", "erreur", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 36 letchis sont partagés également dans 4 sachets. Combien de letchis y a-t-il dans chaque sachet ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On partage 36 en 4 parts égales.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total de letchis par le nombre de sachets.",
      "36 ÷ 4 = 9.",
      "Il y a 9 letchis dans chaque sachet."
    ),
    tags: ["cm2", "division", "sens", "reunion", "marche"],
  },

  {
    kind: "fixed",
    id: "cm2_division_sens_fixed_6_groupes_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 3,
    theme: "reunion",
    text: "Une classe ramasse 48 déchets. On fait des sacs de 8 déchets. Combien de sacs peut-on remplir ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 8 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On cherche combien de sacs de 8 déchets on peut remplir avec 48 déchets.",
      "48 ÷ 8 = 6.",
      "On peut remplir 6 sacs."
    ),
    tags: ["cm2", "division", "sens", "reunion", "dechet", "groupement"],
  },

  {
    kind: "template",
    id: "cm2_division_sens_tpl_1_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    hint: "On cherche la part de chacun.",
    tags: ["cm2", "division", "sens", "partage", "template"],
    generate: () => {
      const parts = randomChoice([2, 3, 4, 5, 6, 8]);
      const partValue = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const total = parts * partValue;

      return {
        text: `On partage ${total} objets entre ${parts} élèves. Combien chaque élève reçoit-il d’objets ?`,
        format: "short",
        expected: [String(partValue)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de partager une quantité en parts égales.",
          "On divise le total par le nombre d’élèves.",
          `${total} ÷ ${parts} = ${partValue}.`,
          `Chaque élève reçoit ${partValue} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_sens_tpl_2_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche combien de groupes identiques on peut faire.",
    tags: ["cm2", "division", "sens", "groupement", "template"],
    generate: () => {
      const groupSize = randomChoice([3, 4, 5, 6, 8, 10]);
      const groups = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = groupSize * groups;

      return {
        text: `On range ${total} cartes par paquets de ${groupSize}. Combien de paquets peut-on faire ?`,
        format: "short",
        expected: [String(groups)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de savoir combien de groupes de même taille on peut faire.",
          "On divise le total par la taille d’un paquet.",
          `${total} ÷ ${groupSize} = ${groups}.`,
          `On peut faire ${groups} paquets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_sens_tpl_3_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la situation de partage.",
    tags: ["cm2", "division", "sens", "qcm", "choisir_operation", "template"],
    generate: () => {
      const total = randomChoice([24, 32, 36, 40, 48, 56]);
      const parts = randomChoice([4, 6, 8]);

      return {
        text: "Dans quelle situation utilise-t-on une division ?",
        format: "qcm",
        choices: shuffle([
          `partager ${total} objets entre ${parts} élèves`,
          `ajouter ${total} objets et ${parts} objets`,
          `multiplier ${total} par ${parts}`,
          `enlever ${parts} objets à ${total} objets`,
        ]),
        expected: [`partager ${total} objets entre ${parts} élèves`],
        comparator: "mcq_exact",
        explanation: exp(
          "La division sert souvent à partager une quantité.",
          "On repère la situation où une quantité est répartie en parts égales.",
          `Partager ${total} objets entre ${parts} élèves correspond à ${total} ÷ ${parts}.`,
          "Cette situation utilise une division."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_sens_tpl_4_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 3,
    theme: "reunion",
    hint: "On partage en sachets identiques.",
    tags: ["cm2", "division", "sens", "reunion", "template"],
    generate: () => {
      const sachets = randomChoice([3, 4, 5, 6, 8]);
      const parSachet = randomChoice([4, 5, 6, 8, 9, 10]);
      const total = sachets * parSachet;

      return {
        text: `Au marché, ${total} fruits sont partagés également dans ${sachets} sachets. Combien de fruits y a-t-il dans chaque sachet ?`,
        format: "short",
        expected: [String(parSachet)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de partager une quantité en parts égales.",
          "On divise le nombre total de fruits par le nombre de sachets.",
          `${total} ÷ ${sachets} = ${parSachet}.`,
          `Il y a ${parSachet} fruits dans chaque sachet.`
        ),
      };
    },
  },

    // ============================================================
  // DIVISION_LIEN_MULTIPLICATION
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Si 6 × 4 = 24, alors 24 ÷ 6 = ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La division retrouve un facteur de la multiplication.",
    explanation: exp(
      "La division est liée à la multiplication.",
      "Si on connaît une multiplication, on peut retrouver une division.",
      "6 × 4 = 24, donc 24 ÷ 6 = 4.",
      "La réponse est 4."
    ),
    tags: ["cm2", "division", "lien_multiplication", "table"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle multiplication permet de vérifier 35 ÷ 5 = 7 ?",
    format: "qcm",
    choices: ["5 × 7 = 35", "35 × 5 = 7", "7 - 5 = 35", "35 + 5 = 40"],
    expected: ["5 × 7 = 35"],
    comparator: "mcq_exact",
    choiceDiagnostics: [
      {
        choice: "35 × 5 = 7",
        cause:
          "Pour vérifier une division, on multiplie le diviseur par le quotient (5 × 7), pas le dividende",
        prereqMicroId: "multiplication_table",
        errorKind: "conceptual",
      },
      {
        choice: "7 - 5 = 35",
        cause: "Une division se vérifie avec une multiplication, pas une soustraction",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
      {
        choice: "35 + 5 = 40",
        cause: "Une division se vérifie avec une multiplication, pas une addition",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
    ],
    hint: "On vérifie une division avec diviseur × quotient.",
    explanation: exp(
      "On peut vérifier une division avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "5 × 7 = 35.",
      "La multiplication 5 × 7 = 35 vérifie la division."
    ),
    tags: ["cm2", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_3_trou",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 48 ÷ ? = 6",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 6 donne 48.",
    explanation: exp(
      "Une division à trou peut se résoudre avec une multiplication.",
      "On cherche le nombre qui multiplié par 6 donne 48.",
      "8 × 6 = 48, donc 48 ÷ 8 = 6.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm2", "division", "lien_multiplication", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_4_famille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Avec l’égalité 8 × 7 = 56, quelle division est vraie ?",
    format: "qcm",
    choices: ["56 ÷ 8 = 7", "56 ÷ 7 = 9", "8 ÷ 56 = 7", "7 ÷ 8 = 56"],
    expected: ["56 ÷ 8 = 7"],
    comparator: "mcq_exact",
    choiceDiagnostics: [
      {
        choice: "56 ÷ 7 = 9",
        cause: "Erreur de table : 7 × 9 = 63, pas 56 (c'est 7 × 8 = 56)",
        prereqMicroId: "multiplication_table",
        errorKind: "conceptual",
      },
      {
        choice: "8 ÷ 56 = 7",
        cause: "Tu as inversé : on divise le produit (56) par un facteur, pas l'inverse",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
      {
        choice: "7 ÷ 8 = 56",
        cause: "Tu as inversé le sens de la division : 56 est le nombre à partager",
        prereqMicroId: "division_sens",
        errorKind: "conceptual",
      },
    ],
    hint: "Le produit 56 peut être divisé par un facteur pour retrouver l’autre facteur.",
    explanation: exp(
      "Une multiplication donne une famille de calculs liés.",
      "Avec 8 × 7 = 56, on peut diviser 56 par 8 pour retrouver 7.",
      "56 ÷ 8 = 7.",
      "La division vraie est 56 ÷ 8 = 7."
    ),
    tags: ["cm2", "division", "lien_multiplication", "famille", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_5_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : comme 9 × 6 = 54, alors 54 ÷ 9 = 6. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On divise le produit par un facteur pour retrouver l’autre facteur.",
    explanation: exp(
      "La division permet de retrouver un facteur d’une multiplication.",
      "On vérifie avec la multiplication donnée.",
      "9 × 6 = 54, donc 54 ÷ 9 = 6.",
      "L’élève a raison."
    ),
    tags: ["cm2", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_6_erreur_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : comme 7 × 8 = 56, alors 56 ÷ 7 = 6. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie : 7 × 6 donne-t-il 56 ?",
    explanation: exp(
      "Pour vérifier une division, on utilise une multiplication.",
      "On multiplie le diviseur par le quotient proposé.",
      "7 × 6 = 42, pas 56. En réalité, 56 ÷ 7 = 8.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm2", "division", "lien_multiplication", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm2_division_lien_multiplication_fixed_7_open",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi connaître ses tables de multiplication aide à diviser.",
    format: "open",
    expected: ["multiplication", "division", "table", "retrouver", "facteur"],
    comparator: "contains_keyword",
    hint: "Une division peut se vérifier avec une multiplication.",
    explanation: exp(
      "Les tables de multiplication donnent des produits connus.",
      "Pour diviser, on cherche souvent quel produit donne le nombre de départ.",
      "Par exemple, pour 42 ÷ 6, on cherche 6 × ? = 42, donc 6 × 7 = 42.",
      "Connaître les tables aide donc à trouver rapidement le quotient."
    ),
    tags: ["cm2", "division", "lien_multiplication", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_division_lien_multiplication_tpl_1_direct",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la multiplication associée.",
    tags: ["cm2", "division", "lien_multiplication", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const product = a * b;

      return {
        text: `Si ${a} × ${b} = ${product}, alors ${product} ÷ ${a} = ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "La division est liée à la multiplication.",
          "On divise le produit par un facteur pour retrouver l’autre facteur.",
          `${a} × ${b} = ${product}, donc ${product} ÷ ${a} = ${b}.`,
          `La réponse est ${b}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_lien_multiplication_tpl_2_verifier_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie avec diviseur × quotient.",
    tags: ["cm2", "division", "lien_multiplication", "verification", "qcm", "template"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const dividende = diviseur * quotient;

      const correct = `${diviseur} × ${quotient} = ${dividende}`;

      return {
        text: `Quelle multiplication permet de vérifier ${dividende} ÷ ${diviseur} = ${quotient} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${dividende} × ${diviseur} = ${quotient}`,
          `${quotient} + ${diviseur} = ${dividende}`,
          `${dividende} - ${diviseur} = ${quotient}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        choiceDiagnostics: [
          {
            choice: `${dividende} × ${diviseur} = ${quotient}`,
            cause:
              "Pour vérifier une division, on multiplie le diviseur par le quotient, pas le dividende",
            prereqMicroId: "multiplication_table",
            errorKind: "conceptual",
          },
          {
            choice: `${quotient} + ${diviseur} = ${dividende}`,
            cause: "Une division se vérifie avec une multiplication, pas une addition",
            prereqMicroId: "division_sens",
            errorKind: "conceptual",
          },
          {
            choice: `${dividende} - ${diviseur} = ${quotient}`,
            cause: "Une division se vérifie avec une multiplication, pas une soustraction",
            prereqMicroId: "division_sens",
            errorKind: "conceptual",
          },
        ],
        explanation: exp(
          "On vérifie une division avec une multiplication.",
          "On multiplie le diviseur par le quotient.",
          `${diviseur} × ${quotient} = ${dividende}.`,
          `La bonne vérification est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_lien_multiplication_tpl_3_facteur_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Transforme la division en multiplication à trou.",
    tags: ["cm2", "division", "lien_multiplication", "facteur_manquant", "template"],
    generate: () => {
      const missing = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const dividende = missing * quotient;

      return {
        text: `Complète : ${dividende} ÷ ? = ${quotient}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Une division à trou peut se résoudre avec une multiplication.",
          "On cherche quel nombre multiplié par le quotient donne le dividende.",
          `${missing} × ${quotient} = ${dividende}, donc ${dividende} ÷ ${missing} = ${quotient}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_lien_multiplication_tpl_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie avec une multiplication.",
    tags: ["cm2", "division", "lien_multiplication", "erreur", "template"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const correctQuotient = randomChoice([4, 5, 6, 7, 8, 9]);
      const dividende = diviseur * correctQuotient;
      const wrongQuotient = correctQuotient + randomChoice([-2, -1, 1, 2]);

      return {
        text: `Un élève affirme que ${dividende} ÷ ${diviseur} = ${wrongQuotient}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour vérifier une division, on utilise une multiplication.",
          "On multiplie le diviseur par le quotient proposé.",
          `${diviseur} × ${wrongQuotient} = ${diviseur * wrongQuotient}, ce n’est pas ${dividende}. En réalité, ${dividende} ÷ ${diviseur} = ${correctQuotient}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_lien_multiplication_tpl_5_famille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "À partir d’une multiplication, on peut écrire deux divisions.",
    tags: ["cm2", "division", "lien_multiplication", "famille", "qcm", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const product = a * b;

      const correct = `${product} ÷ ${a} = ${b}`;

      return {
        text: `Avec l’égalité ${a} × ${b} = ${product}, quelle division est vraie ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${product} ÷ ${a} = ${a}`,
          `${a} ÷ ${product} = ${b}`,
          `${product} ÷ ${b} = ${product}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        choiceDiagnostics: [
          {
            choice: `${product} ÷ ${a} = ${a}`,
            cause: `Erreur de table : ${a} × ${a} = ${a * a}, pas ${product} (c'est ${a} × ${b} = ${product})`,
            prereqMicroId: "multiplication_table",
            errorKind: "conceptual",
          },
          {
            choice: `${a} ÷ ${product} = ${b}`,
            cause: "Tu as inversé : on divise le produit par un facteur, pas l'inverse",
            prereqMicroId: "division_sens",
            errorKind: "conceptual",
          },
          {
            choice: `${product} ÷ ${b} = ${product}`,
            cause: "Diviser ne peut pas redonner le nombre de départ : revois le sens de la division",
            prereqMicroId: "division_sens",
            errorKind: "conceptual",
          },
        ],
        explanation: exp(
          "Une multiplication permet d’écrire des divisions associées.",
          "On divise le produit par un facteur pour retrouver l’autre facteur.",
          `${a} × ${b} = ${product}, donc ${product} ÷ ${a} = ${b}.`,
          `La division vraie est ${correct}.`
        ),
      };
    },
  },
    // ============================================================
  // DIVISION_POSEE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_1_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la division 36 ÷ 4, comment s’appelle le nombre 36 ?",
    format: "qcm",
    choices: ["le dividende", "le diviseur", "le quotient", "le reste"],
    expected: ["le dividende"],
    comparator: "mcq_exact",
    hint: "Le dividende est le nombre que l’on partage ou que l’on divise.",
    explanation: exp(
      "Dans une division, le dividende est le nombre que l’on divise.",
      "On repère le premier nombre de la division.",
      "Dans 36 ÷ 4, le nombre divisé est 36.",
      "36 est le dividende."
    ),
    tags: ["cm2", "division", "posee", "vocabulaire", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Vocabulaire de la division",
      numbers: ["36", "4"],
      division: {
        dividende: "36",
        diviseur: "4",
        quotient: "9",
        reste: "0",
      },
      questionLabel: "36 est le nombre que l’on divise.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_2_sans_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 48 ÷ 6",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 6 entre dans 48.",
    explanation: exp(
      "Une division permet de chercher combien de fois un nombre entre dans un autre.",
      "On peut utiliser les tables de multiplication.",
      "6 × 8 = 48, donc 48 ÷ 6 = 8.",
      "Le quotient est 8."
    ),
    tags: ["cm2", "division", "posee", "sans_reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division sans reste",
      numbers: ["48", "6"],
      division: {
        dividende: "48",
        diviseur: "6",
        quotient: "8",
        reste: "0",
      },
      questionLabel: "On cherche le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_3_avec_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division de 37 par 5, quel est le quotient ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 5 inférieur ou égal à 37.",
    explanation: exp(
      "Dans une division avec reste, le quotient indique le nombre de groupes complets.",
      "On cherche le plus grand multiple du diviseur sans dépasser le dividende.",
      "5 × 7 = 35 et 5 × 8 = 40, trop grand.",
      "Le quotient est 7."
    ),
    tags: ["cm2", "division", "posee", "quotient", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division avec reste",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
      questionLabel: "5 × 7 = 35, il reste 2.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_4_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division de 37 par 5, quel est le reste ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "5 × 7 = 35. Compare 35 avec 37.",
    explanation: exp(
      "Le reste est ce qui reste après avoir fait le plus de groupes possibles.",
      "On calcule le plus grand multiple du diviseur sans dépasser le dividende.",
      "5 × 7 = 35, puis 37 - 35 = 2.",
      "Le reste est 2."
    ),
    tags: ["cm2", "division", "posee", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Trouver le reste",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
      questionLabel: "Reste = 37 - 35.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_5_reste_trop_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 47 ÷ 5 = 8 reste 7. Pourquoi est-ce incorrect ?",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "5", "7"],
    comparator: "contains_keyword",
    hint: "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
    explanation: exp(
      "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
      "On vérifie le reste annoncé.",
      "Ici, le reste 7 est plus grand que le diviseur 5. On peut encore faire un groupe de 5.",
      "La division écrite est incorrecte."
    ),
    tags: ["cm2", "division", "posee", "erreur", "reste", "open", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Erreur : reste trop grand",
      numbers: ["47", "5"],
      division: {
        dividende: "47",
        diviseur: "5",
        quotient: "8",
        reste: "7",
      },
      questionLabel: "Le reste doit être inférieur au diviseur.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_posee_fixed_6_verification",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle égalité vérifie la division : 37 ÷ 5 = 7 reste 2 ?",
    format: "qcm",
    choices: [
      "37 = 5 × 7 + 2",
      "37 = 5 + 7 + 2",
      "37 = 7 × 2 + 5",
      "37 = 5 × 2 + 7",
    ],
    expected: ["37 = 5 × 7 + 2"],
    comparator: "mcq_exact",
    hint: "Utilise : dividende = diviseur × quotient + reste.",
    explanation: exp(
      "Une division avec reste se vérifie avec une multiplication et une addition.",
      "On utilise la formule : dividende = diviseur × quotient + reste.",
      "5 × 7 + 2 = 35 + 2 = 37.",
      "L’égalité correcte est 37 = 5 × 7 + 2."
    ),
    tags: ["cm2", "division", "posee", "verification", "qcm", "canvas"],
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
      questionLabel: "dividende = diviseur × quotient + reste",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_division_posee_tpl_1_sans_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les tables de multiplication.",
    tags: ["cm2", "division", "posee", "sans_reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([4, 5, 6, 7, 8, 9]);
      const dividende = diviseur * quotient;

      return {
        text: `Calcule : ${dividende} ÷ ${diviseur}`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Une division sans reste donne un quotient exact.",
          "On cherche quel nombre multiplié par le diviseur donne le dividende.",
          `${diviseur} × ${quotient} = ${dividende}, donc ${dividende} ÷ ${diviseur} = ${quotient}.`,
          `Le quotient est ${quotient}.`
        ),
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
    id: "cm2_division_posee_tpl_2_avec_reste_quotient",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand multiple sans dépasser le dividende.",
    tags: ["cm2", "division", "posee", "quotient", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([5, 6, 7, 8, 9]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division de ${dividende} par ${diviseur}, quel est le quotient ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Le quotient indique combien de groupes complets on peut faire.",
          "On cherche le plus grand multiple du diviseur sans dépasser le dividende.",
          `${diviseur} × ${quotient} = ${diviseur * quotient}, et ${dividende} - ${diviseur * quotient} = ${reste}.`,
          `Le quotient est ${quotient}.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Trouver le quotient",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
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
    id: "cm2_division_posee_tpl_3_avec_reste_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Reste = dividende - diviseur × quotient.",
    tags: ["cm2", "division", "posee", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([5, 6, 7, 8, 9]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division de ${dividende} par ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste est ce qui n’a pas pu être placé dans les groupes complets.",
          "On calcule le multiple utilisé, puis on soustrait.",
          `${diviseur} × ${quotient} = ${diviseur * quotient}, puis ${dividende} - ${diviseur * quotient} = ${reste}.`,
          `Le reste est ${reste}.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Trouver le reste",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
          questionLabel: "Le reste doit être plus petit que le diviseur.",
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
    id: "cm2_division_posee_tpl_4_verification",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise : dividende = diviseur × quotient + reste.",
    tags: ["cm2", "division", "posee", "verification", "qcm", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([5, 6, 7, 8, 9]);
      const reste = randomInt(0, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      const correct = `${dividende} = ${diviseur} × ${quotient} + ${reste}`;

      return {
        text: `Quelle égalité vérifie la division : ${dividende} ÷ ${diviseur} = ${quotient} reste ${reste} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${dividende} = ${diviseur} + ${quotient} + ${reste}`,
          `${dividende} = ${quotient} × ${reste} + ${diviseur}`,
          `${dividende} = ${diviseur} × ${reste} + ${quotient}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une division euclidienne se vérifie avec une égalité.",
          "On utilise : dividende = diviseur × quotient + reste.",
          `${diviseur} × ${quotient} + ${reste} = ${dividende}.`,
          `L’égalité correcte est ${correct}.`
        ),
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
          questionLabel: "dividende = diviseur × quotient + reste",
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
    id: "cm2_division_posee_tpl_5_erreur_reste_trop_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Le reste doit être plus petit que le diviseur.",
    tags: ["cm2", "division", "posee", "erreur", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7]);
      const quotient = randomChoice([5, 6, 7, 8]);
      const wrongReste = randomChoice([diviseur, diviseur + 1, diviseur + 2]);
      const dividende = diviseur * quotient + wrongReste;

      return {
        text: `Un élève écrit : ${dividende} ÷ ${diviseur} = ${quotient} reste ${wrongReste}. Pourquoi est-ce incorrect ?`,
        format: "open",
        expected: ["reste", "diviseur", "plus petit", String(diviseur), String(wrongReste)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
          "On compare le reste annoncé avec le diviseur.",
          `Le reste ${wrongReste} est supérieur ou égal au diviseur ${diviseur}.`,
          "La division est incorrecte : on peut encore augmenter le quotient."
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Erreur : reste trop grand",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(wrongReste),
          },
          questionLabel: "Le reste doit être inférieur au diviseur.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // DIVISION_RESTE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_1_comprendre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 26 cartes entre 4 élèves. Chaque élève reçoit 6 cartes. Combien de cartes restent ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "4 × 6 = 24. Compare avec 26.",
    explanation: exp(
      "Le reste est ce qui ne peut pas être partagé également.",
      "On calcule d’abord ce qui est distribué.",
      "4 × 6 = 24, puis 26 - 24 = 2.",
      "Il reste 2 cartes."
    ),
    tags: ["cm2", "division", "reste", "partage"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Comprendre le reste",
      numbers: ["26", "4"],
      division: {
        dividende: "26",
        diviseur: "4",
        quotient: "6",
        reste: "2",
      },
      questionLabel: "Le reste est ce qui n’est pas partagé.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_2_interpreter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "29 élèves montent dans des voitures de 4 places. Combien de voitures faut-il prévoir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "7 voitures ne suffisent pas, car il resterait 1 élève.",
    explanation: exp(
      "Le reste doit être interprété selon la situation.",
      "On cherche combien de groupes de 4 on peut faire, puis on regarde s’il reste des élèves.",
      "29 ÷ 4 = 7 reste 1. Il faut donc une voiture de plus.",
      "Il faut prévoir 8 voitures."
    ),
    tags: ["cm2", "division", "reste", "interpretation", "probleme"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Interpréter le reste",
      numbers: ["29", "4"],
      division: {
        dividende: "29",
        diviseur: "4",
        quotient: "7",
        reste: "1",
      },
      questionLabel: "Le reste oblige à prévoir une voiture de plus.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_3_reste_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la division 42 ÷ 7, quel est le reste ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "42 est exactement dans la table de 7.",
    explanation: exp(
      "Le reste peut être égal à 0.",
      "On vérifie si le dividende est exactement un multiple du diviseur.",
      "7 × 6 = 42, donc 42 ÷ 7 = 6 reste 0.",
      "Le reste est 0."
    ),
    tags: ["cm2", "division", "reste", "reste_zero"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division sans reste",
      numbers: ["42", "7"],
      division: {
        dividende: "42",
        diviseur: "7",
        quotient: "6",
        reste: "0",
      },
      questionLabel: "Ici, il ne reste rien.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_4_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une division euclidienne, le reste doit toujours être...",
    format: "qcm",
    choices: [
      "plus petit que le diviseur",
      "plus grand que le diviseur",
      "égal au quotient",
      "égal au dividende",
    ],
    expected: ["plus petit que le diviseur"],
    comparator: "mcq_exact",
    hint: "Si le reste est trop grand, on peut encore faire un groupe.",
    explanation: exp(
      "Dans une division euclidienne, le reste a une règle importante.",
      "On vérifie que le reste est inférieur au diviseur.",
      "Si le reste est supérieur ou égal au diviseur, on peut encore faire un groupe.",
      "Le reste doit toujours être plus petit que le diviseur."
    ),
    tags: ["cm2", "division", "reste", "qcm", "regle"],
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, on veut mettre 50 letchis dans des sachets de 6. Combien de letchis resteront sans sachet complet ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le plus grand multiple de 6 inférieur à 50.",
    explanation: exp(
      "Le reste correspond à ce qui ne rentre pas dans les groupes complets.",
      "On cherche combien de sachets complets de 6 on peut faire.",
      "6 × 8 = 48, puis 50 - 48 = 2.",
      "Il restera 2 letchis."
    ),
    tags: ["cm2", "division", "reste", "reunion", "marche"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Sachets de letchis",
      numbers: ["50", "6"],
      division: {
        dividende: "50",
        diviseur: "6",
        quotient: "8",
        reste: "2",
      },
      questionLabel: "Le reste correspond aux letchis non groupés.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_reste_fixed_6_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 38 ÷ 6 = 5 reste 8. Pourquoi est-ce impossible ?",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "6", "8"],
    comparator: "contains_keyword",
    hint: "Compare le reste 8 avec le diviseur 6.",
    explanation: exp(
      "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
      "On compare le reste annoncé avec le diviseur.",
      "Le reste 8 est plus grand que le diviseur 6.",
      "C’est impossible : on peut encore faire un groupe de 6."
    ),
    tags: ["cm2", "division", "reste", "erreur", "piege", "open"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Erreur : reste trop grand",
      numbers: ["38", "6"],
      division: {
        dividende: "38",
        diviseur: "6",
        quotient: "5",
        reste: "8",
      },
      questionLabel: "Le reste doit être inférieur au diviseur.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_division_reste_tpl_1_trouver_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le multiple utilisé, puis soustrais.",
    tags: ["cm2", "division", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([4, 5, 6, 7, 8]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division de ${dividende} par ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste est ce qui reste après avoir fait les groupes complets.",
          "On calcule le multiple du diviseur, puis on soustrait.",
          `${diviseur} × ${quotient} = ${diviseur * quotient}, puis ${dividende} - ${diviseur * quotient} = ${reste}.`,
          `Le reste est ${reste}.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Trouver le reste",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(reste),
          },
          questionLabel: "Le reste doit être plus petit que le diviseur.",
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
    id: "cm2_division_reste_tpl_2_reste_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 2,
    theme: "neutral",
    hint: "Si le nombre tombe exactement dans la table, le reste est 0.",
    tags: ["cm2", "division", "reste", "reste_zero", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([4, 5, 6, 7, 8, 9]);
      const dividende = diviseur * quotient;

      return {
        text: `Dans la division ${dividende} ÷ ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: ["0"],
        comparator: "number_equal",
        explanation: exp(
          "Une division peut tomber juste.",
          "On vérifie si le dividende est un multiple du diviseur.",
          `${diviseur} × ${quotient} = ${dividende}, donc il ne reste rien.`,
          "Le reste est 0."
        ),
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
          questionLabel: "Il ne reste rien.",
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
    id: "cm2_division_reste_tpl_3_interpreter_voitures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "S’il reste des personnes, il faut une place supplémentaire.",
    tags: ["cm2", "division", "reste", "interpretation", "template", "canvas"],
    generate: () => {
      const places = randomChoice([4, 5, 6]);
      const voituresCompletes = randomChoice([4, 5, 6, 7]);
      const reste = randomInt(1, places - 1);
      const eleves = places * voituresCompletes + reste;
      const voitures = voituresCompletes + 1;

      return {
        text: `${eleves} élèves montent dans des voitures de ${places} places. Combien de voitures faut-il prévoir ?`,
        format: "short",
        expected: [String(voitures)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste doit être interprété dans le contexte.",
          "On calcule le nombre de voitures complètes, puis on regarde s’il reste des élèves.",
          `${eleves} ÷ ${places} = ${voituresCompletes} reste ${reste}. Il faut donc une voiture de plus.`,
          `Il faut prévoir ${voitures} voitures.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Interpréter le reste",
          numbers: [String(eleves), String(places)],
          division: {
            dividende: String(eleves),
            diviseur: String(places),
            quotient: String(voituresCompletes),
            reste: String(reste),
          },
          questionLabel: "Le reste impose une voiture supplémentaire.",
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
    id: "cm2_division_reste_tpl_4_reunion_sachets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "reunion",
    hint: "Le reste correspond aux fruits qui ne remplissent pas un sachet complet.",
    tags: ["cm2", "division", "reste", "reunion", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([5, 6, 8, 10]);
      const sachets = randomChoice([5, 6, 7, 8]);
      const reste = randomInt(1, taille - 1);
      const total = taille * sachets + reste;

      return {
        text: `Au marché, on veut faire des sachets de ${taille} fruits avec ${total} fruits. Combien de fruits resteront sans sachet complet ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste correspond à ce qui ne rentre pas dans les groupes complets.",
          "On cherche le plus grand multiple de la taille du sachet sans dépasser le total.",
          `${taille} × ${sachets} = ${taille * sachets}, puis ${total} - ${taille * sachets} = ${reste}.`,
          `Il restera ${reste} fruit(s).`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Sachets de fruits",
          numbers: [String(total), String(taille)],
          division: {
            dividende: String(total),
            diviseur: String(taille),
            quotient: String(sachets),
            reste: String(reste),
          },
          questionLabel: "Le reste ne forme pas un sachet complet.",
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
    id: "cm2_division_reste_tpl_5_erreur_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "Le reste doit être inférieur au diviseur.",
    tags: ["cm2", "division", "reste", "erreur", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7]);
      const quotient = randomChoice([4, 5, 6, 7, 8]);
      const wrongReste = randomChoice([diviseur, diviseur + 1, diviseur + 2]);
      const dividende = diviseur * quotient + wrongReste;

      return {
        text: `Un élève écrit : ${dividende} ÷ ${diviseur} = ${quotient} reste ${wrongReste}. Pourquoi est-ce impossible ?`,
        format: "open",
        expected: ["reste", "diviseur", "plus petit", String(diviseur), String(wrongReste)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
          "On compare le reste annoncé avec le diviseur.",
          `Le reste ${wrongReste} est supérieur ou égal au diviseur ${diviseur}.`,
          "La division est impossible sous cette forme."
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Erreur sur le reste",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(wrongReste),
          },
          questionLabel: "Le reste est trop grand.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // DIVISION_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_1_partage_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Une maîtresse partage 48 cahiers également entre 6 groupes. Combien de cahiers reçoit chaque groupe ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 48 en 6 parts égales.",
    explanation: exp(
      "Un problème de division peut demander de partager une quantité.",
      "On divise le total par le nombre de groupes.",
      "48 ÷ 6 = 8.",
      "Chaque groupe reçoit 8 cahiers."
    ),
    tags: ["cm2", "division", "probleme", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_2_groupement_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "On range 72 cartes dans des pochettes de 9 cartes. Combien de pochettes peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 9 on peut faire.",
    explanation: exp(
      "Un problème de division peut demander de faire des groupes de même taille.",
      "On divise le nombre total de cartes par le nombre de cartes dans une pochette.",
      "72 ÷ 9 = 8.",
      "On peut remplir 8 pochettes."
    ),
    tags: ["cm2", "division", "probleme", "groupement"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_3_reunion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 64 fruits sont répartis également dans 8 paniers. Combien de fruits y a-t-il dans chaque panier ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 64 fruits en 8 paniers.",
    explanation: exp(
      "La division permet de répartir une quantité en parts égales.",
      "On divise le nombre total de fruits par le nombre de paniers.",
      "64 ÷ 8 = 8.",
      "Il y a 8 fruits dans chaque panier."
    ),
    tags: ["cm2", "division", "probleme", "reunion", "marche", "partage"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_4_dechets_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pendant une sortie nature, 96 déchets sont rangés dans des sacs de 12 déchets. Combien de sacs peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 12 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On divise le nombre total de déchets par le nombre de déchets par sac.",
      "96 ÷ 12 = 8.",
      "On peut remplir 8 sacs."
    ),
    tags: ["cm2", "division", "probleme", "reunion", "dechet", "ecologie"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_5_jeu_video",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un jeu vidéo, 120 pièces sont partagées également entre 5 joueurs. Combien de pièces reçoit chaque joueur ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "On partage 120 en 5 parts égales.",
    explanation: exp(
      "La division permet de partager une quantité en parts égales.",
      "On divise le nombre total de pièces par le nombre de joueurs.",
      "120 ÷ 5 = 24.",
      "Chaque joueur reçoit 24 pièces."
    ),
    tags: ["cm2", "division", "probleme", "jeu_video", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_6_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul permet de résoudre : « 84 élèves sont répartis également dans 7 groupes » ?",
    format: "qcm",
    choices: ["84 ÷ 7", "84 × 7", "84 + 7", "84 - 7"],
    expected: ["84 ÷ 7"],
    comparator: "mcq_exact",
    hint: "Le mot « répartis également » indique une division.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "Quand une quantité est répartie également, on utilise une division.",
      "Le calcul adapté est 84 ÷ 7.",
      "La bonne réponse est 84 ÷ 7."
    ),
    tags: ["cm2", "division", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_7_piege_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 90 images sont rangées par paquets de 10 ». Il calcule 90 × 10. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On cherche combien de paquets de 10 on peut faire.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à la question.",
      "Quand on cherche combien de groupes on peut faire, on divise.",
      "Il fallait calculer 90 ÷ 10 = 9, et non 90 × 10.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "division", "probleme", "erreur", "piege", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_8_canvas_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "On partage 75 cartes entre 6 élèves. Combien de cartes reçoit chaque élève ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le quotient. Le reste ne change pas le nombre reçu par chaque élève.",
    explanation: exp(
      "Dans un partage avec reste, le quotient indique ce que chacun reçoit.",
      "On cherche combien de cartes chaque élève peut recevoir.",
      "75 ÷ 6 = 12 reste 3.",
      "Chaque élève reçoit 12 cartes."
    ),
    tags: ["cm2", "division", "probleme", "partage", "reste", "canvas"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Problème de partage",
      numbers: ["75", "6"],
      division: {
        dividende: "75",
        diviseur: "6",
        quotient: "12",
        reste: "3",
      },
      questionLabel: "Chaque élève reçoit le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_probleme_fixed_9_phrase_reponse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il écrire une phrase-réponse après un problème de division ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne dit pas toujours ce qu’il représente.",
    explanation: exp(
      "Une phrase-réponse relie le calcul au problème.",
      "On reprend les mots de la question et on ajoute l’unité si nécessaire.",
      "Par exemple, 48 ÷ 6 = 8 devient : chaque groupe reçoit 8 cahiers.",
      "La phrase-réponse permet de conclure clairement."
    ),
    tags: ["cm2", "division", "probleme", "open", "redaction"],
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_1_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["cm2", "division", "probleme", "partage", "template"],
    generate: () => {
      const groupes = randomChoice([3, 4, 5, 6, 8]);
      const parGroupe = randomChoice([4, 5, 6, 7, 8, 9, 10, 12]);
      const total = groupes * parGroupe;

      return {
        text: `On partage ${total} objets également entre ${groupes} groupes. Combien d’objets reçoit chaque groupe ?`,
        format: "short",
        expected: [String(parGroupe)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de division peut demander un partage équitable.",
          "On divise le total par le nombre de groupes.",
          `${total} ÷ ${groupes} = ${parGroupe}.`,
          `Chaque groupe reçoit ${parGroupe} objets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_2_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche combien de groupes de même taille on peut faire.",
    tags: ["cm2", "division", "probleme", "groupement", "template"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8, 9, 10, 12]);
      const groupes = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = taille * groupes;

      return {
        text: `On range ${total} objets par paquets de ${taille}. Combien de paquets peut-on faire ?`,
        format: "short",
        expected: [String(groupes)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de division peut demander de faire des groupes.",
          "On divise le total par la taille d’un paquet.",
          `${total} ÷ ${taille} = ${groupes}.`,
          `On peut faire ${groupes} paquets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_3_reunion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "On répartit les fruits dans des paniers identiques.",
    tags: ["cm2", "division", "probleme", "reunion", "marche", "template"],
    generate: () => {
      const paniers = randomChoice([3, 4, 5, 6, 8]);
      const parPanier = randomChoice([6, 8, 9, 10, 12]);
      const total = paniers * parPanier;

      return {
        text: `Au marché de Saint-Pierre, ${total} fruits sont répartis également dans ${paniers} paniers. Combien de fruits y a-t-il dans chaque panier ?`,
        format: "short",
        expected: [String(parPanier)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de répartir une quantité en parts égales.",
          "On divise le nombre total de fruits par le nombre de paniers.",
          `${total} ÷ ${paniers} = ${parPanier}.`,
          `Il y a ${parPanier} fruits dans chaque panier.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_4_dechets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "On cherche combien de sacs complets on peut remplir.",
    tags: ["cm2", "division", "probleme", "reunion", "dechet", "template"],
    generate: () => {
      const tailleSac = randomChoice([8, 10, 12, 15]);
      const sacs = randomChoice([4, 5, 6, 7, 8]);
      const total = tailleSac * sacs;

      return {
        text: `Pendant une sortie nature, ${total} déchets sont rangés dans des sacs de ${tailleSac} déchets. Combien de sacs peut-on remplir ?`,
        format: "short",
        expected: [String(sacs)],
        comparator: "number_equal",
        explanation: exp(
          "La division peut servir à faire des groupes de même taille.",
          "On divise le nombre total de déchets par le nombre de déchets par sac.",
          `${total} ÷ ${tailleSac} = ${sacs}.`,
          `On peut remplir ${sacs} sacs.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_5_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche si on partage, répète, ajoute ou enlève.",
    tags: ["cm2", "division", "probleme", "choisir_operation", "qcm", "template"],
    generate: () => {
      const total = randomChoice([36, 48, 56, 72, 84, 96]);
      const groupes = randomChoice([4, 6, 7, 8]);

      const correct = `${total} ÷ ${groupes}`;

      return {
        text: `Quel calcul permet de résoudre : « ${total} objets sont répartis également entre ${groupes} groupes » ?`,
        format: "qcm",
        choices: shuffle([
          correct,
          `${total} × ${groupes}`,
          `${total} + ${groupes}`,
          `${total} - ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir l’opération consiste à comprendre le problème.",
          "Répartir également indique une division.",
          `Le calcul adapté est ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_division_probleme_tpl_6_partage_avec_reste_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Le quotient indique ce que chacun reçoit.",
    tags: ["cm2", "division", "probleme", "partage", "reste", "canvas", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8]);
      const quotient = randomChoice([6, 7, 8, 9, 10, 11, 12]);
      const reste = randomInt(1, groupes - 1);
      const total = groupes * quotient + reste;

      return {
        text: `On partage ${total} cartes entre ${groupes} élèves. Combien de cartes reçoit chaque élève ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un partage avec reste, le quotient indique ce que chacun reçoit.",
          "On divise le total par le nombre d’élèves.",
          `${total} ÷ ${groupes} = ${quotient} reste ${reste}.`,
          `Chaque élève reçoit ${quotient} cartes.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Partage avec reste",
          numbers: [String(total), String(groupes)],
          division: {
            dividende: String(total),
            diviseur: String(groupes),
            quotient: String(quotient),
            reste: String(reste),
          },
          questionLabel: "Le quotient répond à la question.",
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
    id: "cm2_division_probleme_tpl_7_nombre_groupes_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche combien de groupes complets on peut former.",
    tags: ["cm2", "division", "probleme", "groupement", "reste", "canvas", "template"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8]);
      const quotient = randomChoice([7, 8, 9, 10, 11]);
      const reste = randomInt(1, taille - 1);
      const total = taille * quotient + reste;

      return {
        text: `On range ${total} objets dans des boîtes de ${taille} objets. Combien de boîtes complètes peut-on remplir ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un groupement avec reste, le quotient indique le nombre de groupes complets.",
          "On divise le total par la taille d’une boîte.",
          `${total} ÷ ${taille} = ${quotient} reste ${reste}.`,
          `On peut remplir ${quotient} boîtes complètes.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Groupement avec reste",
          numbers: [String(total), String(taille)],
          division: {
            dividende: String(total),
            diviseur: String(taille),
            quotient: String(quotient),
            reste: String(reste),
          },
          questionLabel: "Le quotient donne le nombre de boîtes complètes.",
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
    id: "cm2_division_probleme_tpl_8_erreur_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "On ne multiplie pas quand on cherche combien de groupes on peut faire.",
    tags: ["cm2", "division", "probleme", "erreur", "choisir_operation", "template"],
    generate: () => {
      const total = randomChoice([60, 72, 84, 96]);
      const taille = randomChoice([6, 8, 10, 12]);
      const wrong = total * taille;
      const correct = total / taille;

      // On garantit un quotient entier.
      const quotient = randomChoice([5, 6, 7, 8, 9]);
      const adjustedTotal = taille * quotient;

      return {
        text: `Un élève lit : « ${adjustedTotal} objets sont rangés par paquets de ${taille} ». Il calcule ${adjustedTotal} × ${taille}. A-t-il choisi la bonne opération ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Il faut choisir l’opération selon la question.",
          "Quand on cherche combien de paquets on peut faire, on divise.",
          `Il fallait calculer ${adjustedTotal} ÷ ${taille} = ${quotient}, et non ${adjustedTotal} × ${taille}.`,
          "L’élève n’a pas choisi la bonne opération."
        ),
      };
    },
  },
    // ============================================================
  // DIVISION_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_1_tresor_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : 96 pièces sont partagées également entre 8 pirates. Combien de pièces reçoit chaque pirate ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "On partage 96 en 8 parts égales.",
    explanation: exp(
      "Un défi de division peut être une situation de partage.",
      "On divise le nombre total de pièces par le nombre de pirates.",
      "96 ÷ 8 = 12.",
      "Chaque pirate reçoit 12 pièces."
    ),
    tags: ["cm2", "division", "defi", "tresor", "pieces"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi trésor",
      numbers: ["96", "8"],
      division: {
        dividende: "96",
        diviseur: "8",
        quotient: "12",
        reste: "0",
      },
      questionLabel: "Chaque pirate reçoit le quotient.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_2_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : 72 margouillats sont répartis également sur 9 murs. Combien y a-t-il de margouillats par mur ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 72 en 9 parts égales.",
    explanation: exp(
      "La division permet de répartir une quantité en parts égales.",
      "On divise le nombre total de margouillats par le nombre de murs.",
      "72 ÷ 9 = 8.",
      "Il y a 8 margouillats par mur."
    ),
    tags: ["cm2", "division", "defi", "reunion", "margouillat"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi margouillats",
      numbers: ["72", "9"],
      division: {
        dividende: "72",
        diviseur: "9",
        quotient: "8",
        reste: "0",
      },
      questionLabel: "On répartit en parts égales.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_3_requin_groupement",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi requin : dans un jeu d’observation marine, 54 points sont rangés par groupes de 6. Combien de groupes complets peut-on faire ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 6 on peut faire.",
    explanation: exp(
      "La division peut servir à faire des groupes de même taille.",
      "On divise le total par la taille d’un groupe.",
      "54 ÷ 6 = 9.",
      "On peut faire 9 groupes complets."
    ),
    tags: ["cm2", "division", "defi", "reunion", "requin", "groupement"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi requin",
      numbers: ["54", "6"],
      division: {
        dividende: "54",
        diviseur: "6",
        quotient: "9",
        reste: "0",
      },
      questionLabel: "On cherche le nombre de groupes complets.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_4_eau_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi eau : on veut remplir des bouteilles de 6 L avec 50 L d’eau. Combien de bouteilles complètes peut-on remplir ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche le quotient : le nombre de bouteilles complètes.",
    explanation: exp(
      "Dans une division avec reste, le quotient donne le nombre de groupes complets.",
      "On divise la quantité totale par la contenance d’une bouteille.",
      "50 ÷ 6 = 8 reste 2.",
      "On peut remplir 8 bouteilles complètes."
    ),
    tags: ["cm2", "division", "defi", "reunion", "eau", "reste"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi eau",
      numbers: ["50", "6"],
      division: {
        dividende: "50",
        diviseur: "6",
        quotient: "8",
        reste: "2",
      },
      questionLabel: "Le quotient donne les bouteilles complètes.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_5_voitures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi transport : 35 élèves montent dans des voitures de 4 places. Combien de voitures faut-il prévoir ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "S’il reste des élèves, il faut une voiture de plus.",
    explanation: exp(
      "Le reste doit être interprété selon la situation.",
      "On calcule le nombre de voitures complètes, puis on regarde s’il reste des élèves.",
      "35 ÷ 4 = 8 reste 3. Il faut donc une voiture de plus.",
      "Il faut prévoir 9 voitures."
    ),
    tags: ["cm2", "division", "defi", "reste", "interpretation", "transport"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi transport",
      numbers: ["35", "4"],
      division: {
        dividende: "35",
        diviseur: "4",
        quotient: "8",
        reste: "3",
      },
      questionLabel: "Le reste impose une voiture supplémentaire.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_6_erreur_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi erreur : un élève écrit 59 ÷ 7 = 7 reste 10. Explique pourquoi c’est impossible.",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "7", "10"],
    comparator: "contains_keyword",
    hint: "Le reste doit être plus petit que le diviseur.",
    explanation: exp(
      "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
      "On compare le reste annoncé avec le diviseur.",
      "Le reste 10 est plus grand que le diviseur 7.",
      "Cette division est impossible sous cette forme."
    ),
    tags: ["cm2", "division", "defi", "erreur", "reste", "open"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Défi erreur",
      numbers: ["59", "7"],
      division: {
        dividende: "59",
        diviseur: "7",
        quotient: "7",
        reste: "10",
      },
      questionLabel: "Le reste doit être inférieur au diviseur.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_fixed_7_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi marché : 96 fruits sont répartis dans 8 paniers. Ensuite, chaque panier est vendu 3 €. Combien rapporte la vente de tous les paniers ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Trouve d’abord le nombre de fruits par panier, puis utilise le prix.",
    explanation: exp(
      "Un défi peut contenir plusieurs étapes.",
      "On commence par la division, puis on répond à la question finale.",
      "96 ÷ 8 = 12 fruits par panier. Mais on demande la vente des paniers : 8 × 3 = 24.",
      "La vente rapporte 24 €."
    ),
    tags: ["cm2", "division", "defi", "reunion", "marche", "deux_etapes"],
  },

  {
    kind: "template",
    id: "cm2_division_defi_tpl_1_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "On partage les pièces en parts égales.",
    tags: ["cm2", "division", "defi", "tresor", "pieces", "template", "canvas"],
    generate: () => {
      const pirates = randomChoice([3, 4, 5, 6, 8]);
      const piecesParPirate = randomChoice([8, 10, 12, 15, 20, 25]);
      const total = pirates * piecesParPirate;

      return {
        text: `Défi trésor : ${total} pièces sont partagées également entre ${pirates} pirates. Combien de pièces reçoit chaque pirate ?`,
        format: "short",
        expected: [String(piecesParPirate)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de partager une quantité en parts égales.",
          "On divise le nombre total de pièces par le nombre de pirates.",
          `${total} ÷ ${pirates} = ${piecesParPirate}.`,
          `Chaque pirate reçoit ${piecesParPirate} pièces.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi trésor",
          numbers: [String(total), String(pirates)],
          division: {
            dividende: String(total),
            diviseur: String(pirates),
            quotient: String(piecesParPirate),
            reste: "0",
          },
          questionLabel: "Chaque pirate reçoit le quotient.",
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
    id: "cm2_division_defi_tpl_2_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "On répartit les margouillats en groupes égaux.",
    tags: ["cm2", "division", "defi", "margouillat", "reunion", "template", "canvas"],
    generate: () => {
      const murs = randomChoice([4, 5, 6, 8, 9]);
      const parMur = randomChoice([3, 4, 5, 6, 7, 8]);
      const total = murs * parMur;

      return {
        text: `Défi margouillats : ${total} margouillats sont répartis également sur ${murs} murs. Combien y a-t-il de margouillats par mur ?`,
        format: "short",
        expected: [String(parMur)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de répartir une quantité en parts égales.",
          "On divise le nombre total de margouillats par le nombre de murs.",
          `${total} ÷ ${murs} = ${parMur}.`,
          `Il y a ${parMur} margouillats par mur.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi margouillats",
          numbers: [String(total), String(murs)],
          division: {
            dividende: String(total),
            diviseur: String(murs),
            quotient: String(parMur),
            reste: "0",
          },
          questionLabel: "On répartit en parts égales.",
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
    id: "cm2_division_defi_tpl_3_groupement_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche le nombre de groupes complets.",
    tags: ["cm2", "division", "defi", "reste", "groupement", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8, 10]);
      const quotient = randomChoice([6, 7, 8, 9, 10]);
      const reste = randomInt(1, taille - 1);
      const total = taille * quotient + reste;

      return {
        text: `Défi : on range ${total} objets dans des boîtes de ${taille} objets. Combien de boîtes complètes peut-on remplir ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un groupement avec reste, le quotient donne le nombre de groupes complets.",
          "On divise le total par la taille d’une boîte.",
          `${total} ÷ ${taille} = ${quotient} reste ${reste}.`,
          `On peut remplir ${quotient} boîtes complètes.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi groupement",
          numbers: [String(total), String(taille)],
          division: {
            dividende: String(total),
            diviseur: String(taille),
            quotient: String(quotient),
            reste: String(reste),
          },
          questionLabel: "Le quotient donne les boîtes complètes.",
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
    id: "cm2_division_defi_tpl_4_voitures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "S’il reste des personnes, il faut une voiture de plus.",
    tags: ["cm2", "division", "defi", "reste", "interpretation", "transport", "template", "canvas"],
    generate: () => {
      const places = randomChoice([4, 5, 6]);
      const voituresCompletes = randomChoice([5, 6, 7, 8]);
      const reste = randomInt(1, places - 1);
      const eleves = places * voituresCompletes + reste;
      const voitures = voituresCompletes + 1;

      return {
        text: `Défi transport : ${eleves} élèves montent dans des véhicules de ${places} places. Combien de véhicules faut-il prévoir ?`,
        format: "short",
        expected: [String(voitures)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste doit être interprété selon la situation.",
          "On calcule le nombre de véhicules complets, puis on regarde s’il reste des élèves.",
          `${eleves} ÷ ${places} = ${voituresCompletes} reste ${reste}. Il faut donc un véhicule de plus.`,
          `Il faut prévoir ${voitures} véhicules.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi transport",
          numbers: [String(eleves), String(places)],
          division: {
            dividende: String(eleves),
            diviseur: String(places),
            quotient: String(voituresCompletes),
            reste: String(reste),
          },
          questionLabel: "Le reste impose un véhicule supplémentaire.",
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
    id: "cm2_division_defi_tpl_5_erreur_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le reste doit être inférieur au diviseur.",
    tags: ["cm2", "division", "defi", "erreur", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8]);
      const quotient = randomChoice([5, 6, 7, 8]);
      const wrongReste = randomChoice([diviseur, diviseur + 1, diviseur + 2]);
      const dividende = diviseur * quotient + wrongReste;

      return {
        text: `Défi erreur : un élève écrit ${dividende} ÷ ${diviseur} = ${quotient} reste ${wrongReste}. Explique pourquoi c’est impossible.`,
        format: "open",
        expected: ["reste", "diviseur", "plus petit", String(diviseur), String(wrongReste)],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une division euclidienne, le reste doit être plus petit que le diviseur.",
          "On compare le reste annoncé avec le diviseur.",
          `Le reste ${wrongReste} est supérieur ou égal au diviseur ${diviseur}.`,
          "La division est impossible sous cette forme."
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi erreur",
          numbers: [String(dividende), String(diviseur)],
          division: {
            dividende: String(dividende),
            diviseur: String(diviseur),
            quotient: String(quotient),
            reste: String(wrongReste),
          },
          questionLabel: "Le reste est trop grand.",
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
    id: "cm2_division_defi_tpl_6_reunion_eau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Le quotient donne le nombre de bouteilles complètes.",
    tags: ["cm2", "division", "defi", "reunion", "eau", "reste", "template", "canvas"],
    generate: () => {
      const contenance = randomChoice([4, 5, 6, 8]);
      const bouteilles = randomChoice([6, 7, 8, 9]);
      const reste = randomInt(1, contenance - 1);
      const total = contenance * bouteilles + reste;

      return {
        text: `Défi eau : avec ${total} L d’eau, on remplit des bouteilles de ${contenance} L. Combien de bouteilles complètes peut-on remplir ?`,
        format: "short",
        expected: [String(bouteilles)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une division avec reste, le quotient donne le nombre de groupes complets.",
          "On divise la quantité totale par la contenance d’une bouteille.",
          `${total} ÷ ${contenance} = ${bouteilles} reste ${reste}.`,
          `On peut remplir ${bouteilles} bouteilles complètes.`
        ),
        canvas: calculPoseCanvas({
          operation: "division",
          title: "Défi eau",
          numbers: [String(total), String(contenance)],
          division: {
            dividende: String(total),
            diviseur: String(contenance),
            quotient: String(bouteilles),
            reste: String(reste),
          },
          questionLabel: "Le reste ne suffit pas pour remplir une bouteille complète.",
          display: {
            showResult: false,
            showRetenues: false,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_division_defi_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique avec tes mots à quoi sert la division dans la vie quotidienne.",
    format: "open",
    expected: ["partager", "groupes", "également", "reste", "combien"],
    comparator: "contains_keyword",
    hint: "Pense aux partages, aux groupes, aux places, aux paquets.",
    explanation: exp(
      "La division sert à partager ou à faire des groupes.",
      "On l’utilise quand on cherche une part, un nombre de groupes ou un reste.",
      "Par exemple, partager 24 objets entre 6 personnes revient à calculer 24 ÷ 6.",
      "La division aide à organiser des quantités dans la vie quotidienne."
    ),
    tags: ["cm2", "division", "defi", "open", "sens"],
  },
];
