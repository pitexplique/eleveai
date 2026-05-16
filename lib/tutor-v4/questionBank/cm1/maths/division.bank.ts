// lib/tutor-v4/question-banks/maths/cm1/division.bank.ts

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

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function divisionCanvas(data: {
  dividende: number;
  diviseur: number;
  quotient: number;
  reste?: number;
  title?: string;
  questionLabel?: string;
  showResult?: boolean;
}) {
  return calculPoseCanvas({
    operation: "division",
    title: data.title ?? "Division posée",
    numbers: [String(data.dividende), String(data.diviseur)],
    result: String(data.quotient),
    division: {
      dividende: String(data.dividende),
      diviseur: String(data.diviseur),
      quotient: String(data.quotient),
      reste: String(data.reste ?? 0),
    },
    questionLabel: data.questionLabel,
    display: {
      showResult: data.showResult ?? false,
      showRetenues: false,
    },
  });
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
  // Comprendre le sens de la division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_1_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On partage 12 billes entre 3 enfants. Combien chaque enfant reçoit-il de billes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Partager en parts égales, c’est utiliser une division.",
    explanation: exp(
      "Une division peut servir à partager une quantité en parts égales.",
      "On cherche combien reçoit chaque enfant.",
      "12 ÷ 3 = 4.",
      "Chaque enfant reçoit 4 billes."
    ),
    tags: ["cm1", "division", "sens", "partage"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_2_groupements",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 1,
    theme: "neutral",
    text: "On range 20 crayons dans des boîtes de 5 crayons. Combien de boîtes peut-on remplir ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche combien de groupes de 5 on peut faire avec 20.",
    explanation: exp(
      "Une division peut aussi servir à faire des groupes de même taille.",
      "On cherche combien de groupes de 5 sont contenus dans 20.",
      "20 ÷ 5 = 4.",
      "On peut remplir 4 boîtes."
    ),
    tags: ["cm1", "division", "sens", "groupements"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_3_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle opération correspond à : « partager 24 bonbons entre 6 enfants » ?",
    format: "qcm",
    choices: ["24 ÷ 6", "24 × 6", "24 + 6", "24 - 6"],
    expected: ["24 ÷ 6"],
    comparator: "mcq_exact",
    hint: "Le mot partager indique souvent une division.",
    explanation: exp(
      "Choisir une opération demande de comprendre le sens de la situation.",
      "Quand on partage en parts égales, on utilise une division.",
      "Partager 24 entre 6 correspond à 24 ÷ 6.",
      "L’opération correcte est 24 ÷ 6."
    ),
    tags: ["cm1", "division", "sens", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_sens_fixed_4_erreur_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève lit : « 30 cartes sont partagées entre 5 joueurs ». Il calcule 30 × 5. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On partage les cartes, on ne les répète pas 5 fois.",
    explanation: exp(
      "Il faut choisir l’opération qui correspond à l’histoire.",
      "Partager une quantité entre plusieurs personnes correspond à une division.",
      "Il fallait calculer 30 ÷ 5 = 6, et non 30 × 5.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm1", "division", "sens", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_sens_tpl_1_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["cm1", "division", "sens", "partage", "template"],
    generate: () => {
      const diviseur = randomChoice([2, 3, 4, 5, 6, 8]);
      const quotient = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const total = diviseur * quotient;

      return {
        text: `On partage ${total} cartes entre ${diviseur} enfants. Combien chaque enfant reçoit-il de cartes ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Une division sert à partager une quantité en parts égales.",
          "On divise le total par le nombre d’enfants.",
          `${total} ÷ ${diviseur} = ${quotient}.`,
          `Chaque enfant reçoit ${quotient} cartes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_sens_tpl_2_groupements",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_sens",
    difficulty: 2,
    theme: "reunion",
    hint: "On cherche combien de groupes complets on peut faire.",
    tags: ["cm1", "division", "sens", "groupements", "reunion", "template"],
    generate: () => {
      const tailleGroupe = randomChoice([4, 5, 6, 8, 10]);
      const groupes = randomChoice([3, 4, 5, 6, 7, 8]);
      const total = tailleGroupe * groupes;

      return {
        text: `Au marché de Saint-Pierre, on range ${total} letchis dans des sachets de ${tailleGroupe}. Combien de sachets complets peut-on préparer ?`,
        format: "short",
        expected: [String(groupes)],
        comparator: "number_equal",
        explanation: exp(
          "Une division peut servir à faire des groupes de même taille.",
          "On divise le nombre total par la quantité dans chaque sachet.",
          `${total} ÷ ${tailleGroupe} = ${groupes}.`,
          `On peut préparer ${groupes} sachets complets.`
        ),
      };
    },
  },

  // ============================================================
  // DIVISION_LIEN_MULTIPLICATION
  // Associer multiplication et division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 6 × 4 = 24, alors combien vaut 24 ÷ 6 ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La division permet de retrouver un facteur.",
    explanation: exp(
      "Multiplication et division sont liées.",
      "Si 6 × 4 = 24, alors 24 partagé en groupes de 6 donne 4 groupes.",
      "24 ÷ 6 = 4.",
      "La réponse est 4."
    ),
    tags: ["cm1", "division", "lien_multiplication"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul peut aider à trouver 56 ÷ 8 ?",
    format: "qcm",
    choices: ["8 × ? = 56", "56 × 8", "56 + 8", "56 - 8"],
    expected: ["8 × ? = 56"],
    comparator: "mcq_exact",
    hint: "Pour diviser, on peut chercher une multiplication à trou.",
    explanation: exp(
      "Une division peut être transformée en multiplication à trou.",
      "Pour calculer 56 ÷ 8, on cherche quel nombre multiplié par 8 donne 56.",
      "8 × 7 = 56.",
      "Le calcul utile est 8 × ? = 56."
    ),
    tags: ["cm1", "division", "lien_multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7 × ? = 63. Donc 63 ÷ 7 = ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7 ou de 9.",
    explanation: exp(
      "La multiplication à trou aide à calculer une division.",
      "On cherche le facteur manquant.",
      "7 × 9 = 63, donc 63 ÷ 7 = 9.",
      "La réponse est 9."
    ),
    tags: ["cm1", "division", "lien_multiplication", "table"],
  },

  {
    kind: "fixed",
    id: "cm1_division_lien_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « comme 8 × 6 = 48, alors 48 ÷ 8 = 6 ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie le lien entre multiplication et division.",
    explanation: exp(
      "Une multiplication permet de vérifier une division.",
      "Si 8 × 6 = 48, alors 48 contient 6 groupes de 8.",
      "48 ÷ 8 = 6.",
      "L’élève a raison."
    ),
    tags: ["cm1", "division", "lien_multiplication", "verification", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_lien_tpl_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme la division en multiplication à trou.",
    tags: ["cm1", "division", "lien_multiplication", "template"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const total = diviseur * quotient;

      return {
        text: `Complète : ${diviseur} × ? = ${total}. Donc ${total} ÷ ${diviseur} = ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Une division peut être résolue avec une multiplication à trou.",
          "On cherche le nombre qui complète le produit.",
          `${diviseur} × ${quotient} = ${total}, donc ${total} ÷ ${diviseur} = ${quotient}.`,
          `La réponse est ${quotient}.`
        ),
      };
    },
  },

  // ============================================================
  // DIVISION_POSEE
  // Poser une division simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_1_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une division posée, que cherche-t-on principalement ?",
    format: "qcm",
    choices: [
      "combien de fois le diviseur est contenu dans le dividende",
      "combien vaut la somme des deux nombres",
      "combien vaut le produit des deux nombres",
      "combien de chiffres contient le diviseur",
    ],
    expected: ["combien de fois le diviseur est contenu dans le dividende"],
    comparator: "mcq_exact",
    hint: "Diviser, c’est chercher combien de groupes égaux on peut faire.",
    explanation: exp(
      "Une division permet de partager ou de faire des groupes égaux.",
      "Dans une division posée, on cherche combien de fois le diviseur est contenu dans le dividende.",
      "Par exemple, 56 ÷ 7 revient à chercher combien de fois 7 est contenu dans 56.",
      "On cherche donc un quotient."
    ),
    canvas: divisionCanvas({
      dividende: 56,
      diviseur: 7,
      quotient: 8,
      title: "Division posée",
      questionLabel: "Observe : on cherche combien de groupes de 7 sont contenus dans 56.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "methode", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_2_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 84 ÷ 4",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Tu peux chercher combien de fois 4 est contenu dans 84.",
    explanation: exp(
      "Une division posée aide à organiser le calcul.",
      "On cherche combien de groupes de 4 sont contenus dans 84.",
      "84 ÷ 4 = 21.",
      "Le quotient est 21."
    ),
    canvas: divisionCanvas({
      dividende: 84,
      diviseur: 4,
      quotient: 21,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "simple", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_3_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 96 ÷ 6",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Cherche combien de groupes de 6 on peut faire.",
    explanation: exp(
      "Une division posée permet de calculer étape par étape.",
      "On cherche combien de fois 6 est contenu dans 96.",
      "96 ÷ 6 = 16.",
      "Le quotient est 16."
    ),
    canvas: divisionCanvas({
      dividende: 96,
      diviseur: 6,
      quotient: 16,
      title: "Division posée",
      questionLabel: "Calcule le quotient.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_posee_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 72 ÷ 8 = 8. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie avec une multiplication.",
    explanation: exp(
      "On peut vérifier une division avec une multiplication.",
      "Si 72 ÷ 8 valait 8, alors 8 × 8 devrait faire 72.",
      "8 × 8 = 64, mais 8 × 9 = 72.",
      "L’élève n’a pas raison : 72 ÷ 8 = 9."
    ),
    canvas: divisionCanvas({
      dividende: 72,
      diviseur: 8,
      quotient: 9,
      title: "Vérifier une division",
      questionLabel: "Vérifie avec une multiplication.",
      showResult: false,
    }),
    tags: ["cm1", "division", "posee", "verification", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_division_posee_tpl_1_exacte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise les tables pour trouver le quotient.",
    tags: ["cm1", "division", "posee", "exacte", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([11, 12, 13, 14, 15, 16, 18, 20]);
      const dividende = diviseur * quotient;

      return {
        text: `Calcule : ${dividende} ÷ ${diviseur}`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Une division exacte donne un reste égal à 0.",
          "On cherche combien de fois le diviseur est contenu dans le dividende.",
          `${dividende} ÷ ${diviseur} = ${quotient}.`,
          `Le quotient est ${quotient}.`
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          title: "Division posée",
          questionLabel: "Calcule le quotient.",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_posee_tpl_2_qcm_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie avec la multiplication inverse.",
    tags: ["cm1", "division", "posee", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const diviseur = randomChoice([4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([8, 9, 10, 11, 12]);
      const dividende = diviseur * quotient;
      const wrong = quotient + randomChoice([-2, -1, 1, 2]);

      return {
        text: `Un élève affirme que ${dividende} ÷ ${diviseur} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut vérifier une division avec une multiplication.",
          "On multiplie le diviseur par le quotient annoncé.",
          `${diviseur} × ${quotient} = ${dividende}, donc ${dividende} ÷ ${diviseur} = ${quotient}, et non ${wrong}.`,
          "L’élève n’a pas raison."
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          title: "Vérifier une division",
          questionLabel: "Le quotient annoncé est-il correct ?",
          showResult: false,
        }),
      };
    },
  },

  // ============================================================
  // DIVISION_RESTE
  // Interpréter le reste d’une division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "On range 26 crayons dans des boîtes de 5. Combien de crayons restent sans boîte complète ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "5 × 5 = 25, il reste ensuite 1.",
    explanation: exp(
      "Dans une division, le reste est ce qui n’a pas pu former un groupe complet.",
      "On cherche le plus grand multiple de 5 inférieur ou égal à 26.",
      "5 × 5 = 25, et 26 - 25 = 1.",
      "Il reste 1 crayon."
    ),
    canvas: divisionCanvas({
      dividende: 26,
      diviseur: 5,
      quotient: 5,
      reste: 1,
      title: "Division avec reste",
      questionLabel: "Combien reste-t-il après les groupes complets ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_2_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la division 38 ÷ 6, quel est le reste ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand multiple de 6 inférieur à 38.",
    explanation: exp(
      "Le reste doit être plus petit que le diviseur.",
      "On cherche un multiple de 6 proche de 38.",
      "6 × 6 = 36, puis 38 - 36 = 2.",
      "Le reste est 2."
    ),
    canvas: divisionCanvas({
      dividende: 38,
      diviseur: 6,
      quotient: 6,
      reste: 2,
      title: "Division avec reste",
      questionLabel: "Quel est le reste ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_reste_fixed_3_interpreter",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "reunion",
    text: "On a 29 letchis. On prépare des sachets de 4 letchis. Combien de sachets complets peut-on faire ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le reste ne forme pas un sachet complet.",
    explanation: exp(
      "Dans certains problèmes, on demande seulement les groupes complets.",
      "On cherche combien de sachets de 4 on peut faire avec 29 letchis.",
      "4 × 7 = 28, il reste 1 letchi.",
      "On peut faire 7 sachets complets."
    ),
    canvas: divisionCanvas({
      dividende: 29,
      diviseur: 4,
      quotient: 7,
      reste: 1,
      title: "Sachets de letchis",
      questionLabel: "On compte seulement les sachets complets.",
      showResult: false,
    }),
    tags: ["cm1", "division", "reste", "reunion", "interpretation", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_division_reste_tpl_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le plus grand multiple inférieur ou égal au nombre total.",
    tags: ["cm1", "division", "reste", "template", "canvas"],
    generate: () => {
      const diviseur = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const quotient = randomChoice([4, 5, 6, 7, 8, 9]);
      const reste = randomInt(1, diviseur - 1);
      const dividende = diviseur * quotient + reste;

      return {
        text: `Dans la division ${dividende} ÷ ${diviseur}, quel est le reste ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste est ce qui reste après avoir formé tous les groupes complets.",
          "On cherche le plus grand multiple du diviseur inférieur ou égal au dividende.",
          `${diviseur} × ${quotient} = ${diviseur * quotient}, puis ${dividende} - ${diviseur * quotient} = ${reste}.`,
          `Le reste est ${reste}.`
        ),
        canvas: divisionCanvas({
          dividende,
          diviseur,
          quotient,
          reste,
          title: "Division avec reste",
          questionLabel: "Trouve le reste.",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_reste_tpl_2_reunion_sachets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_reste",
    difficulty: 4,
    theme: "reunion",
    hint: "Le reste ne permet pas de faire un sachet complet.",
    tags: ["cm1", "division", "reste", "reunion", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8]);
      const sachets = randomChoice([5, 6, 7, 8, 9]);
      const reste = randomInt(1, taille - 1);
      const total = taille * sachets + reste;

      return {
        text: `On a ${total} fruits. On prépare des sachets de ${taille} fruits. Combien de sachets complets peut-on faire ?`,
        format: "short",
        expected: [String(sachets)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on demande des groupes complets, le reste n’est pas compté comme un groupe.",
          "On cherche combien de sachets entiers on peut remplir.",
          `${taille} × ${sachets} = ${taille * sachets}, et il reste ${reste}.`,
          `On peut faire ${sachets} sachets complets.`
        ),
        canvas: divisionCanvas({
          dividende: total,
          diviseur: taille,
          quotient: sachets,
          reste,
          title: "Sachets complets",
          questionLabel: "Combien de sachets complets ?",
          showResult: false,
        }),
      };
    },
  },

  // ============================================================
  // DIVISION_PROBLEME
  // Utiliser la division dans un problème
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une classe a 32 élèves. On fait des équipes de 4 élèves. Combien d’équipes peut-on former ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On cherche combien de groupes de 4 on peut faire.",
    explanation: exp(
      "La division sert à former des groupes égaux.",
      "On divise le nombre d’élèves par le nombre d’élèves par équipe.",
      "32 ÷ 4 = 8.",
      "On peut former 8 équipes."
    ),
    tags: ["cm1", "division", "probleme", "groupes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pour une sortie à Mafate, on prépare 54 biscuits. On met 6 biscuits par sachet. Combien de sachets peut-on préparer ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Chaque sachet contient 6 biscuits.",
    explanation: exp(
      "La division permet de calculer le nombre de groupes égaux.",
      "On divise le nombre total de biscuits par le nombre de biscuits par sachet.",
      "54 ÷ 6 = 9.",
      "On peut préparer 9 sachets."
    ),
    tags: ["cm1", "division", "probleme", "reunion", "mafatе"],
  },

  {
    kind: "fixed",
    id: "cm1_division_probleme_fixed_3_choisir_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas faut-il utiliser une division ?",
    format: "qcm",
    choices: [
      "partager 48 cartes entre 6 joueurs",
      "acheter 6 paquets de 8 cartes",
      "ajouter 48 cartes et 6 cartes",
      "enlever 6 cartes à 48 cartes",
    ],
    expected: ["partager 48 cartes entre 6 joueurs"],
    comparator: "mcq_exact",
    hint: "La division sert à partager ou à faire des groupes égaux.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "La division sert souvent à partager une quantité en parts égales.",
      "Partager 48 cartes entre 6 joueurs correspond à 48 ÷ 6.",
      "C’est la situation qui utilise une division."
    ),
    tags: ["cm1", "division", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_probleme_tpl_1_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche combien de groupes identiques on peut faire.",
    tags: ["cm1", "division", "probleme", "equipes", "template"],
    generate: () => {
      const tailleEquipe = randomChoice([3, 4, 5, 6, 8]);
      const equipes = randomChoice([4, 5, 6, 7, 8]);
      const total = tailleEquipe * equipes;

      return {
        text: `On a ${total} élèves. On fait des équipes de ${tailleEquipe} élèves. Combien d’équipes peut-on former ?`,
        format: "short",
        expected: [String(equipes)],
        comparator: "number_equal",
        explanation: exp(
          "La division sert à former des groupes égaux.",
          "On divise le nombre total par la taille d’un groupe.",
          `${total} ÷ ${tailleEquipe} = ${equipes}.`,
          `On peut former ${equipes} équipes.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_probleme_tpl_2_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "On partage les fruits en sachets identiques.",
    tags: ["cm1", "division", "probleme", "reunion", "marche", "template"],
    generate: () => {
      const parSachet = randomChoice([4, 5, 6, 8, 10]);
      const sachets = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = parSachet * sachets;

      return {
        text: `Au marché de Saint-Pierre, on range ${total} fruits dans des sachets de ${parSachet}. Combien de sachets peut-on préparer ?`,
        format: "short",
        expected: [String(sachets)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de calculer le nombre de groupes égaux.",
          "On divise le nombre total de fruits par le nombre de fruits dans un sachet.",
          `${total} ÷ ${parSachet} = ${sachets}.`,
          `On peut préparer ${sachets} sachets.`
        ),
      };
    },
  },

  // ============================================================
  // DIVISION_DEFI
  // Résoudre un défi de division
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_1_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : 48 cartes sont partagées entre 6 joueurs. Puis chaque joueur donne 2 cartes. Combien de cartes reste-t-il à chaque joueur ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Calcule d’abord le partage, puis enlève 2.",
    explanation: exp(
      "Un défi peut demander plusieurs étapes.",
      "On commence par partager les cartes, puis on ajuste.",
      "48 ÷ 6 = 8, puis 8 - 2 = 6.",
      "Il reste 6 cartes à chaque joueur."
    ),
    tags: ["cm1", "division", "defi", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_2_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi randonnée : 50 biscuits sont rangés dans des sachets de 6. Combien de sachets complets peut-on préparer ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le reste ne forme pas un sachet complet.",
    explanation: exp(
      "Un défi de division peut demander d’interpréter le reste.",
      "On cherche le nombre de sachets complets.",
      "6 × 8 = 48, et il reste 2 biscuits.",
      "On peut préparer 8 sachets complets."
    ),
    canvas: divisionCanvas({
      dividende: 50,
      diviseur: 6,
      quotient: 8,
      reste: 2,
      title: "Défi randonnée",
      questionLabel: "Combien de sachets complets ?",
      showResult: false,
    }),
    tags: ["cm1", "division", "defi", "reste", "reunion", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_fixed_3_qcm_verification",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel calcul vérifie correctement que 72 ÷ 9 = 8 ?",
    format: "qcm",
    choices: ["9 × 8 = 72", "72 × 9 = 8", "72 + 9 = 8", "9 - 8 = 72"],
    expected: ["9 × 8 = 72"],
    comparator: "mcq_exact",
    hint: "Une division se vérifie avec une multiplication.",
    explanation: exp(
      "Une division peut être vérifiée avec une multiplication.",
      "On multiplie le diviseur par le quotient.",
      "9 × 8 = 72.",
      "Le calcul de vérification est 9 × 8 = 72."
    ),
    tags: ["cm1", "division", "defi", "verification", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_division_defi_tpl_1_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Partage d’abord, puis applique la deuxième étape.",
    tags: ["cm1", "division", "defi", "deux_etapes", "template"],
    generate: () => {
      const personnes = randomChoice([4, 5, 6, 8]);
      const chacun = randomChoice([6, 7, 8, 9, 10]);
      const retire = randomChoice([1, 2, 3]);
      const total = personnes * chacun;
      const final = chacun - retire;

      return {
        text: `Défi : ${total} objets sont partagés entre ${personnes} enfants. Puis chaque enfant donne ${retire} objets. Combien lui en reste-t-il ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes demande de faire les calculs dans l’ordre.",
          "On partage d’abord, puis on retire une quantité.",
          `${total} ÷ ${personnes} = ${chacun}, puis ${chacun} - ${retire} = ${final}.`,
          `Il reste ${final} objets à chaque enfant.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_division_defi_tpl_2_reste_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "On ne compte que les groupes complets.",
    tags: ["cm1", "division", "defi", "reste", "reunion", "template", "canvas"],
    generate: () => {
      const taille = randomChoice([4, 5, 6, 8]);
      const groupes = randomChoice([6, 7, 8, 9]);
      const reste = randomInt(1, taille - 1);
      const total = taille * groupes + reste;

      return {
        text: `Défi sortie nature : ${total} élèves doivent monter dans des groupes de ${taille}. Combien de groupes complets peut-on former ?`,
        format: "short",
        expected: [String(groupes)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on demande des groupes complets, le reste ne forme pas un groupe entier.",
          "On cherche combien de groupes de taille donnée on peut former.",
          `${taille} × ${groupes} = ${taille * groupes}, et il reste ${reste}.`,
          `On peut former ${groupes} groupes complets.`
        ),
        canvas: divisionCanvas({
          dividende: total,
          diviseur: taille,
          quotient: groupes,
          reste,
          title: "Défi division avec reste",
          questionLabel: "Combien de groupes complets ?",
          showResult: false,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_division_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "division",
    microId: "division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment vérifier le résultat d’une division.",
    format: "open",
    expected: ["multiplier", "diviseur", "quotient", "reste", "vérifier"],
    comparator: "contains_keyword",
    hint: "Pense à la multiplication inverse.",
    explanation: exp(
      "Une division peut être vérifiée avec une multiplication.",
      "On multiplie le diviseur par le quotient, puis on ajoute le reste s’il y en a un.",
      "Par exemple, si 38 ÷ 6 = 6 reste 2, on vérifie : 6 × 6 + 2 = 38.",
      "La multiplication permet donc de vérifier la division."
    ),
    tags: ["cm1", "division", "defi", "open", "verification"],
  },
];