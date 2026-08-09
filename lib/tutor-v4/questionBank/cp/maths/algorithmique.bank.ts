// lib/tutor-v4/questionBank/cp/maths/algorithmique.bank.ts
//
// Les instructions et les déplacements codés du CP, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) : au CP,
// l'initiation à la pensée informatique n'a pas de rubrique à elle. Elle vit
// dans deux endroits du programme, et c'est de là que sortent ces questions.
//   — dans « Le repérage dans l'espace » : « Utiliser et produire une SUITE
//     D'INSTRUCTIONS qui codent un déplacement en utilisant un vocabulaire
//     spatial précis. » Les instructions sont nommées : avancer, reculer,
//     tourner à droite, tourner à gauche, monter, descendre. Pour un robot sur
//     tapis quadrillé : « avancer d'une case », « pivoter d'un quart de tour à
//     droite », « pivoter d'un quart de tour à gauche ». Et la contrainte
//     chiffrée : « Les déplacements à programmer comprennent au maximum DIX
//     INSTRUCTIONS, DONT DEUX VIRAGES. » ;
//   — dans « Les nombres entiers » : « Utiliser les nombres ordinaux dans le
//     cadre de l'étude de SUITES DE SYMBOLES, de formes, de lettres ou de
//     nombres. » Le BO donne ses exemples : dans « ABABAB… », quelle est la
//     dix-neuvième lettre ? dans « △○□△○□… », quel est le vingtième symbole ?
//   ⛔ Aucun Scratch, aucun bloc de programmation au CP.
//
// LE PIÈGE DE LA NOTION : l'ordre des instructions. « Avance puis tourne » ne
// mène pas au même endroit que « tourne puis avance » — les mêmes instructions,
// dans un autre ordre, donnent un autre trajet. Son cousin vit dans les suites
// répétitives : on croit reconnaitre le motif après deux symboles, alors qu'il
// en fait trois.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const RANGS = [
  "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième",
  "septième", "huitième", "neuvième", "dixième", "onzième", "douzième",
  "treizième", "quatorzième", "quinzième", "seizième", "dix-septième",
  "dix-huitième", "dix-neuvième", "vingtième",
];

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ALGO_INSTRUCTION — suivre les instructions, dans l'ordre
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_instruction_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot reçoit « avance de 2 cases, puis tourne à droite ». Un autre reçoit « tourne à droite, puis avance de 2 cases ». Arrivent-ils au même endroit ?",
    format: "qcm",
    choices: [
      "non, l'ordre des instructions change le trajet",
      "oui, ce sont les mêmes instructions",
      "oui, s'ils partent du même endroit",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre des instructions change le trajet"],
    comparator: "mcq_exact",
    hint: "Fais les deux trajets avec ton doigt sur la table.",
    explanation: exp(
      "Une suite d'instructions se lit dans l'ordre : chaque instruction part de là où la précédente s'est arrêtée.",
      "On exécute les deux programmes séparément, une instruction à la fois.",
      "Le premier robot avance d'abord de 2 cases tout droit, et ne tourne qu'après : il finit 2 cases plus loin. Le second tourne sur place, puis avance de 2 cases dans une autre direction : il finit ailleurs. Mêmes instructions, autre ordre, autre arrivée.",
      "Non : l'ordre des instructions change le trajet.",
    ),
    tags: ["cp", "algorithmique", "instruction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_algo_instruction_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_instruction",
    difficulty: 2,
    theme: "neutral",
    text: "Que fait un robot quand il reçoit l'instruction « pivoter d'un quart de tour à droite » ?",
    format: "qcm",
    choices: [
      "il tourne sur place, sans changer de case",
      "il avance d'une case vers la droite",
      "il recule d'une case",
      "il fait un tour complet",
    ],
    expected: ["il tourne sur place, sans changer de case"],
    comparator: "mcq_exact",
    hint: "Pivoter, c'est se retourner ; avancer, c'est se déplacer.",
    explanation: exp(
      "Pivoter, c'est changer de direction sans quitter sa case.",
      "On distingue les instructions qui déplacent de celles qui font tourner.",
      "Après un quart de tour à droite, le robot est toujours sur la même case : c'est seulement son regard qui a changé de direction. Il faudra une instruction « avancer » pour qu'il se déplace.",
      "Il tourne sur place, sans changer de case.",
    ),
    tags: ["cp", "algorithmique", "instruction", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_algo_instruction_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les instructions une par une, dans l'ordre écrit.",
    tags: ["cp", "algorithmique", "instruction", "template"],
    generate: () => {
      const a = randomInt(3, 7);
      const recule = randomChoice([true, false]);
      // ⚠️ On ne recule jamais plus loin que le départ : un CP ne connait pas
      // les nombres négatifs, et « 2 - 5 » n'a pas de sens pour lui.
      const b = recule ? randomInt(1, a - 1) : randomInt(1, 5);
      const resultat = recule ? a - b : a + b;
      return {
        text: `Un robot exécute : « avance de ${a} cases », puis « ${recule ? "recule" : "avance"} de ${b} cases ». De combien de cases s'est-il éloigné de son départ ?`,
        format: "short",
        expected: [String(Math.abs(resultat))],
        comparator: "number_equal",
        explanation: exp(
          "On exécute une suite d'instructions dans l'ordre, en repartant à chaque fois d'où l'on s'est arrêté.",
          "On avance, puis on applique la seconde instruction.",
          recule
            ? `${a} - ${b} = ${resultat}. Reculer défait une partie de ce qui a été avancé.`
            : `${a} + ${b} = ${resultat}. Les deux avancées s'ajoutent, car le robot n'a pas tourné.`,
          `Il s'est éloigné de ${Math.abs(resultat)} cases.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ALGO_DEPLACEMENT — coder un déplacement
     Avec la contrainte du BO : dix instructions, deux virages.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_deplacement_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Pour faire avancer un robot de 3 cases tout droit sur un tapis quadrillé, combien d'instructions « avancer d'une case » faut-il écrire ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Une instruction pour chaque case franchie.",
    explanation: exp(
      "Coder un déplacement, c'est écrire la liste des instructions qui le réalisent.",
      "On compte les cases à franchir, et on écrit une instruction par case.",
      "Trois cases à franchir, donc trois fois « avancer d'une case ». Aucun virage n'est nécessaire puisque le robot va tout droit.",
      "Il faut 3 instructions.",
    ),
    tags: ["cp", "algorithmique", "deplacement"],
  },
  {
    kind: "template",
    id: "cp_algo_deplacement_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les cases, puis les virages : les deux comptent comme des instructions.",
    tags: ["cp", "algorithmique", "deplacement", "template"],
    generate: () => {
      const cases = randomInt(3, 7);
      const virages = randomInt(1, 2);
      const total = cases + virages;
      return {
        text: `Un programme fait avancer un robot de ${cases} cases et lui fait faire ${virages} virage${virages > 1 ? "s" : ""}. Combien d'instructions ce programme contient-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque avancée d'une case et chaque virage compte pour une instruction.",
          "On additionne les avancées et les virages.",
          `${cases} avancées + ${virages} virage${virages > 1 ? "s" : ""} = ${total} instructions. Un virage prend une instruction alors qu'il ne fait avancer de rien : on l'oublie souvent.`,
          `Le programme contient ${total} instructions.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_algo_deplacement_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Au retour, chaque virage se prend de l'autre côté.",
    tags: ["cp", "algorithmique", "deplacement", "piege", "template"],
    generate: () => {
      const cote = randomChoice(["droite", "gauche"] as const);
      const inverse = cote === "droite" ? "gauche" : "droite";
      const cases = randomInt(2, 5);
      return {
        text: `À l'aller, le robot avance de ${cases} cases puis tourne à ${cote}. Pour refaire ce trajet à l'envers, de quel côté doit-il tourner ?`,
        format: "qcm",
        choices: makeChoices(`à ${inverse}`, [
          `à ${cote}`,
          "tout droit",
          "il ne tourne pas",
        ]),
        expected: [`à ${inverse}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Refaire un trajet à l'envers demande d'inverser chaque virage.",
          "On parcourt le trajet dans l'autre sens, en échangeant droite et gauche.",
          `À l'aller, le robot tourne à ${cote}. Au retour il arrive par l'autre côté : le même coin se prend à ${inverse}.`,
          `Il doit tourner à ${inverse}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ALGO_SUITE_LOGIQUE — les suites répétitives du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_suite_logique_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la suite qui se répète « ABABAB… », quelle est la dix-neuvième lettre ?",
    format: "qcm",
    choices: ["A", "B", "C", "on ne peut pas savoir"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Les A sont aux places 1, 3, 5, 7… toutes les places impaires.",
    explanation: exp(
      "Dans une suite répétitive, le motif revient toujours identique : on peut donc prévoir n'importe quelle place.",
      "On repère quelles places occupe chaque lettre, puis on regarde où tombe le rang cherché.",
      "Le motif « AB » fait deux lettres. Le A occupe les places 1, 3, 5, 7… et le B les places 2, 4, 6, 8… La dix-neuvième place est impaire, comme la première : c'est donc un A.",
      "La dix-neuvième lettre est A.",
    ),
    tags: ["cp", "algorithmique", "suite_logique", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_algo_suite_logique_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 5,
    theme: "neutral",
    text: "On voit le début d'une suite : « A B A B A C A B A C… ». Peut-on dire que le motif est « AB » ?",
    format: "qcm",
    choices: [
      "non, il faut regarder toute la suite avant de décider",
      "oui, les deux premières lettres suffisent",
      "oui, puisque la suite commence par AB",
      "on ne peut jamais trouver un motif",
    ],
    expected: ["non, il faut regarder toute la suite avant de décider"],
    comparator: "mcq_exact",
    hint: "Regarde la sixième lettre : est-ce bien un B ?",
    explanation: exp(
      "Un motif ne se devine pas sur les deux premiers symboles : il faut vérifier qu'il se répète vraiment.",
      "On teste le motif supposé sur toute la suite écrite.",
      "Avec le motif « AB », la suite ferait A B A B A B A B. Or la sixième lettre est un C, pas un B. Le vrai motif est plus long : « ABABAC », qui fait six lettres.",
      "Non : il faut regarder toute la suite avant de décider.",
    ),
    tags: ["cp", "algorithmique", "suite_logique", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_algo_suite_logique_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère le motif, puis compte les symboles jusqu'à la place demandée.",
    tags: ["cp", "algorithmique", "suite_logique", "template"],
    generate: () => {
      const motifs = ["○△", "○△□", "○○△", "○△△□"];
      const motif = randomChoice(motifs);
      const symboles = Array.from(motif);
      const rang = randomInt(6, 20);
      const bon = symboles[(rang - 1) % symboles.length];
      const suite = Array.from({ length: 9 }, (_, i) => symboles[i % symboles.length]).join(" ");
      const autres = ["○", "△", "□", "◇"].filter((s) => s !== bon);
      return {
        text: `Dans la suite qui se répète « ${suite}… », quel est le ${RANGS[rang - 1]} symbole ?`,
        format: "qcm",
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite répétitive, le motif revient identique à l'infini.",
          "On repère le motif, puis on compte les symboles un à un jusqu'à la place demandée.",
          `Le motif fait ${symboles.length} symboles. En comptant place par place jusqu'à la ${RANGS[rang - 1]}, on tombe sur « ${bon} ».`,
          `Le ${RANGS[rang - 1]} symbole est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_algo_suite_logique_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_suite_logique",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de symboles il faut avant que la suite recommence.",
    tags: ["cp", "algorithmique", "suite_logique", "template"],
    generate: () => {
      const motifs = ["○△", "○△□", "○○△", "○△△□", "○△□◇"];
      const motif = randomChoice(motifs);
      const symboles = Array.from(motif);
      const suite = Array.from({ length: 8 }, (_, i) => symboles[i % symboles.length]).join(" ");
      return {
        text: `Dans la suite « ${suite}… », combien de symboles compte le motif qui se répète ?`,
        format: "short",
        expected: [String(symboles.length)],
        comparator: "number_equal",
        explanation: exp(
          "Le motif d'une suite répétitive est le plus petit morceau qui revient à l'identique.",
          "On cherche à partir de quel endroit la suite recommence comme au début.",
          `Après ${symboles.length} symboles, la suite reprend exactement comme au début. Le motif fait donc ${symboles.length} symboles.`,
          `Le motif compte ${symboles.length} symboles.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ALGO_DEFI — la boucle, et le programme trop long
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_algo_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot exécute : « répéter 3 fois : avancer de 2 cases ». De combien de cases avance-t-il en tout ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases : additionne trois fois 2.",
    explanation: exp(
      "Répéter une instruction, c'est la faire plusieurs fois de suite.",
      "On additionne autant de fois qu'il y a de répétitions.",
      "2 + 2 + 2 = 6. Le robot avance donc de 6 cases. Répondre 5 reviendrait à compter les répétitions et les cases dans le même sac.",
      "Il avance de 6 cases.",
    ),
    tags: ["cp", "algorithmique", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_algo_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne autant de fois qu'il y a de répétitions.",
    tags: ["cp", "algorithmique", "defi", "template"],
    generate: () => {
      const fois = randomInt(2, 5);
      const cases = randomInt(2, 5);
      const total = fois * cases;
      return {
        text: `Un robot exécute : « répéter ${fois} fois : avancer de ${cases} cases ». De combien de cases avance-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition fait recommencer la même instruction, autant de fois qu'il est écrit.",
          "On additionne le déplacement autant de fois qu'il y a de répétitions.",
          `${Array.from({ length: fois }, () => cases).join(" + ")} = ${total}. Répondre ${fois + cases} reviendrait à additionner les répétitions et les cases, qui ne comptent pas la même chose.`,
          `Il avance de ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_algo_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "cp_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une répétition remplace plusieurs instructions écrites à la suite.",
    tags: ["cp", "algorithmique", "defi", "template"],
    generate: () => {
      const ecrites = randomInt(3, 6);
      // ⚠️ Le raccourci est tantôt fidèle, tantôt faux : sinon la réponse
      // serait toujours « oui » et se retiendrait sans lire l'énoncé.
      const fidele = randomChoice([true, false]);
      const fois = fidele ? ecrites : ecrites + randomChoice([-1, 1]);
      return {
        text: `Un programme contient ${ecrites} fois l'instruction « avancer d'une case ». Pour le raccourcir, on écrit « répéter ${fois} fois : avancer d'une case ». Le robot fait-il la même chose qu'avant ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [fidele ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une répétition ne change pas ce que fait le robot, à condition de répéter le bon nombre de fois.",
          "On déplie la répétition et on compare avec la liste écrite en entier.",
          fidele
            ? `« Répéter ${fois} fois », déplié, donne ${fois} instructions à la suite — exactement la liste de départ. Le robot avance de ${ecrites} cases dans les deux cas.`
            : `« Répéter ${fois} fois », déplié, donne ${fois} instructions, alors que le programme de départ en comptait ${ecrites}. Le robot avancerait de ${fois} cases au lieu de ${ecrites}.`,
          fidele
            ? "Oui, le robot fait exactement la même chose."
            : `Non : le raccourci ne dit pas le bon nombre de fois.`,
        ),
      };
    },
  },
];
