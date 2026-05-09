// lib/tutor-v4/question-banks/maths/5e/algorithmique.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function scratchCanvas(title: string, blocks: any[], description?: string) {
  return {
    kind: "scratch" as const,
    title,
    description,
    blocks,
  };
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================
     ALGO_SEQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un programme Scratch, les blocs sont exécutés...",
    format: "qcm",
    choices: [
      "dans l’ordre, de haut en bas",
      "au hasard",
      "seulement si l’élève clique dessus",
      "toujours en même temps",
    ],
    expected: ["dans l’ordre, de haut en bas"],
    comparator: "mcq_exact",
    hint: "Lis les blocs comme une recette.",
    explanation:
      "Définition : une séquence est une suite d’instructions exécutées dans un ordre précis.\n\n" +
      "Méthode : on lit les blocs de haut en bas.\n\n" +
      "Exécution : le premier bloc est exécuté, puis le suivant, puis le suivant.\n\n" +
      "Conclusion : les blocs sont exécutés dans l’ordre.",
    tags: ["algorithmique", "sequence", "scratch", "qcm"],
    canvas: scratchCanvas("Séquence Scratch", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_2_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans ce programme, quelle action est faite en premier après le drapeau vert ?",
    format: "qcm",
    choices: [
      "dire Bonjour",
      "avancer de 20",
      "attendre 1 seconde",
      "tourner de 90°",
    ],
    expected: ["dire Bonjour"],
    comparator: "mcq_exact",
    hint: "Regarde le premier bloc sous le drapeau vert.",
    explanation:
      "Définition : une séquence se lit dans l’ordre.\n\n" +
      "Méthode : on regarde le bloc placé juste après l’événement de départ.\n\n" +
      "Exécution : après le drapeau vert, le premier bloc est “dire Bonjour”.\n\n" +
      "Conclusion : la première action est “dire Bonjour”.",
    tags: ["algorithmique", "sequence", "ordre", "qcm"],
    canvas: scratchCanvas("Lire l’ordre des blocs", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_sequence_tpl_1_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les blocs “avancer”.",
    tags: ["algorithmique", "sequence", "distance", "template", "canvas"],
    generate: () => {
      const a = randomChoice([10, 20, 30]);
      const b = randomChoice([10, 20, 40]);
      const total = a + b;

      return {
        text: "Quelle distance totale le lutin avance-t-il ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une séquence est une suite d’instructions.\n\n" +
          "Méthode : on additionne les distances des blocs “avancer”.\n\n" +
          `Exécution : le lutin avance de ${a}, puis de ${b}. Donc ${a} + ${b} = ${total}.\n\n` +
          `Conclusion : le lutin avance de ${total} pas au total.`,
        canvas: scratchCanvas("Distance dans une séquence", [
          { type: "event" },
          { type: "move", value: a },
          { type: "move", value: b },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_sequence_tpl_2_variable_finale",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Suis la valeur de la variable étape par étape.",
    tags: ["algorithmique", "sequence", "variable", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 5, 10]);
      const ajout = randomChoice([3, 4, 5, 8]);
      const final = depart + ajout;

      return {
        text: "Quelle est la valeur finale de la variable score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une variable garde une valeur que le programme peut modifier.\n\n" +
          "Méthode : on suit les blocs dans l’ordre.\n\n" +
          `Exécution : score vaut d’abord ${depart}, puis on ajoute ${ajout}. Donc ${depart} + ${ajout} = ${final}.\n\n` +
          `Conclusion : la valeur finale de score est ${final}.`,
        canvas: scratchCanvas("Variable score", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          { type: "change_variable", variable: "score", value: ajout },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_3_piege_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “L’ordre des blocs n’a pas d’importance.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Changer l’ordre peut changer le résultat.",
    explanation:
      "Définition : un algorithme suit un ordre précis d’instructions.\n\n" +
      "Méthode : on vérifie si changer l’ordre change le résultat.\n\n" +
      "Exécution : mettre une variable à 0 puis ajouter 5 ne donne pas toujours le même résultat que faire l’inverse.\n\n" +
      "Conclusion : l’ordre des blocs est important.",
    tags: ["algorithmique", "sequence", "erreur", "qcm"],
    canvas: scratchCanvas("Attention à l’ordre", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      { type: "change_variable", variable: "score", value: 5 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_sequence",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi l’ordre des instructions est important dans un programme.",
    format: "open",
    expected: ["ordre", "instructions", "résultat"],
    comparator: "contains_keyword",
    hint: "Imagine une recette où les étapes sont mélangées.",
    explanation:
      "Définition : un programme est une suite d’instructions ordonnées.\n\n" +
      "Méthode : on lit les instructions dans l’ordre pour prévoir le résultat.\n\n" +
      "Exécution : si on change l’ordre, le programme peut produire un autre résultat.\n\n" +
      "Conclusion : l’ordre des instructions est essentiel.",
    tags: ["algorithmique", "sequence", "open", "raisonnement"],
  },
    /* =========================
     ALGO_ENTREES_SORTIES
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_entrees_sorties_fixed_1_vocabulaire",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “demander … et attendre” sert principalement à...",
    format: "qcm",
    choices: [
      "recevoir une information de l’utilisateur",
      "faire avancer le lutin",
      "tracer un carré",
      "effacer une variable",
    ],
    expected: ["recevoir une information de l’utilisateur"],
    comparator: "mcq_exact",
    hint: "L’utilisateur écrit une réponse.",
    explanation:
      "Définition : une entrée est une information donnée au programme.\n\n" +
      "Méthode : on repère les blocs qui demandent une réponse à l’utilisateur.\n\n" +
      "Exécution : le bloc “demander … et attendre” récupère une réponse.\n\n" +
      "Conclusion : ce bloc sert à recevoir une entrée.",
    tags: ["algorithmique", "entree", "sortie", "scratch", "qcm"],
    canvas: scratchCanvas("Entrée utilisateur", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "say", text: "Merci !" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entrees_sorties_fixed_2_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 1,
    theme: "neutral",
    text: "Dans ce programme, quelle est la sortie affichée par le lutin ?",
    format: "qcm",
    choices: ["Bonjour", "Quel est ton âge ?", "réponse", "score"],
    expected: ["Bonjour"],
    comparator: "mcq_exact",
    hint: "Une sortie est ce que le programme affiche ou dit.",
    explanation:
      "Définition : une sortie est une information donnée par le programme.\n\n" +
      "Méthode : on repère le bloc “dire”.\n\n" +
      "Exécution : le bloc “dire Bonjour” affiche le message “Bonjour”.\n\n" +
      "Conclusion : la sortie affichée est “Bonjour”.",
    tags: ["algorithmique", "sortie", "dire", "qcm"],
    canvas: scratchCanvas("Sortie affichée", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_entrees_sorties_tpl_1_variable_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 2,
    theme: "neutral",
    hint: "La réponse saisie peut être placée dans une variable.",
    tags: ["algorithmique", "entree", "variable", "template", "canvas"],
    generate: () => {
      const question = randomChoice([
        "Quel est ton nombre ?",
        "Choisis un nombre.",
        "Entre une valeur.",
      ]);

      return {
        text: "Quel bloc permet de récupérer une valeur donnée par l’utilisateur ?",
        format: "qcm",
        choices: shuffle([
          "demander et attendre",
          "avancer de 10",
          "tourner de 90°",
          "stylo en position d’écriture",
        ]),
        expected: ["demander et attendre"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une entrée est une donnée fournie au programme.\n\n" +
          "Méthode : dans Scratch, on utilise un bloc de question pour obtenir une entrée.\n\n" +
          "Exécution : “demander … et attendre” permet de récupérer une réponse.\n\n" +
          "Conclusion : le bloc utile est “demander et attendre”.",
        canvas: scratchCanvas("Demander une entrée", [
          { type: "event" },
          { type: "ask", text: question },
          { type: "set_variable", variable: "nombre", value: "réponse" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_entrees_sorties_tpl_2_sortie_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 2,
    theme: "neutral",
    hint: "Suis la valeur donnée à la variable.",
    tags: ["algorithmique", "sortie", "variable", "template", "canvas"],
    generate: () => {
      const valeur = randomChoice([4, 7, 10, 12, 15]);

      return {
        text: "Quelle valeur le programme affiche-t-il à la fin ?",
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation:
          "Définition : une sortie peut être une valeur affichée par le programme.\n\n" +
          "Méthode : on regarde la valeur stockée dans la variable puis le bloc “dire”.\n\n" +
          `Exécution : la variable nombre reçoit ${valeur}, puis le programme dit nombre.\n\n` +
          `Conclusion : la valeur affichée est ${valeur}.`,
        canvas: scratchCanvas("Afficher une variable", [
          { type: "event" },
          { type: "set_variable", variable: "nombre", value: valeur },
          { type: "say", text: "nombre" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_entrees_sorties_tpl_3_entree_calcul_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 3,
    theme: "neutral",
    hint: "Le programme prend une entrée, fait un calcul, puis affiche une sortie.",
    tags: ["algorithmique", "entree", "sortie", "calcul", "template", "canvas"],
    generate: () => {
      const entree = randomChoice([2, 3, 4, 5, 6]);
      const ajout = randomChoice([3, 5, 10]);
      const sortie = entree + ajout;

      return {
        text: `L’utilisateur répond ${entree}. Quelle valeur le programme affiche-t-il ?`,
        format: "short",
        expected: [String(sortie)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme peut prendre une entrée, effectuer un calcul, puis produire une sortie.\n\n" +
          "Méthode : on suit la valeur de la variable étape par étape.\n\n" +
          `Exécution : nombre vaut ${entree}, puis on ajoute ${ajout}. Donc ${entree} + ${ajout} = ${sortie}.\n\n` +
          `Conclusion : le programme affiche ${sortie}.`,
        canvas: scratchCanvas("Entrée → calcul → sortie", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "nombre", value: entree },
          { type: "change_variable", variable: "nombre", value: ajout },
          { type: "say", text: "nombre" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_entrees_sorties_fixed_3_piege_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 3,
    theme: "neutral",
    text: "Dans Scratch, la “réponse” correspond toujours à...",
    format: "qcm",
    choices: [
      "la dernière valeur saisie par l’utilisateur",
      "la distance parcourue par le lutin",
      "le nombre de blocs du programme",
      "la couleur du stylo",
    ],
    expected: ["la dernière valeur saisie par l’utilisateur"],
    comparator: "mcq_exact",
    hint: "Elle vient du bloc “demander … et attendre”.",
    explanation:
      "Définition : dans Scratch, “réponse” contient ce que l’utilisateur vient de saisir.\n\n" +
      "Méthode : on associe “réponse” au dernier bloc “demander … et attendre”.\n\n" +
      "Exécution : si l’utilisateur écrit 8, alors “réponse” vaut 8.\n\n" +
      "Conclusion : “réponse” correspond à la dernière valeur saisie.",
    tags: ["algorithmique", "reponse", "entree", "piege", "qcm"],
    canvas: scratchCanvas("Bloc réponse", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "say", text: "réponse" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entrees_sorties_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_entrees_sorties",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre une entrée et une sortie dans un programme.",
    format: "open",
    expected: ["entrée", "sortie", "utilisateur", "programme"],
    comparator: "contains_keyword",
    hint: "L’entrée vient de l’utilisateur ; la sortie est donnée par le programme.",
    explanation:
      "Définition : une entrée est une information reçue par le programme ; une sortie est une information produite par le programme.\n\n" +
      "Méthode : on repère ce qui est demandé à l’utilisateur et ce qui est affiché ensuite.\n\n" +
      "Exécution : “demander” récupère une entrée ; “dire” affiche une sortie.\n\n" +
      "Conclusion : entrée et sortie sont deux rôles différents dans un programme.",
    tags: ["algorithmique", "entree", "sortie", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_FORMULE_BLOCS
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_formule_blocs_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 2,
    theme: "neutral",
    text: "Dans Scratch, une formule comme x + 5 peut être représentée avec...",
    format: "qcm",
    choices: [
      "un bloc opérateur",
      "un bloc avancer seulement",
      "un bloc stylo seulement",
      "un bloc tourner seulement",
    ],
    expected: ["un bloc opérateur"],
    comparator: "mcq_exact",
    hint: "Les calculs utilisent souvent les blocs verts.",
    explanation:
      "Définition : une formule peut être traduite avec des blocs de calcul.\n\n" +
      "Méthode : on utilise un bloc opérateur pour représenter une addition, une soustraction, une multiplication ou une division.\n\n" +
      "Exécution : x + 5 se représente avec un bloc opérateur contenant x, + et 5.\n\n" +
      "Conclusion : on utilise un bloc opérateur.",
    tags: ["algorithmique", "formule", "operateur", "scratch", "qcm"],
    canvas: scratchCanvas("Formule en blocs", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      { type: "operator", left: "x", operator: "+", right: 5 },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_formule_blocs_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis la formule en opération.",
    tags: ["algorithmique", "formule", "addition", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 10]);

      return {
        text: `Quel bloc représente la formule x + ${a} ?`,
        format: "qcm",
        choices: shuffle([
          `x + ${a}`,
          `x - ${a}`,
          `x × ${a}`,
          `${a} - x`,
        ]),
        expected: [`x + ${a}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une formule décrit un calcul avec une variable.\n\n" +
          "Méthode : on identifie l’opération utilisée.\n\n" +
          `Exécution : la formule x + ${a} signifie qu’on ajoute ${a} à x.\n\n` +
          `Conclusion : le bloc correct est x + ${a}.`,
        canvas: scratchCanvas("Choisir le bon bloc", [
          { type: "event" },
          { type: "operator", left: "x", operator: "+", right: a },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_formule_blocs_tpl_2_multiplication",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole × signifie multiplier.",
    tags: ["algorithmique", "formule", "multiplication", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);

      return {
        text: `Quel bloc représente la formule ${k} × x ?`,
        format: "qcm",
        choices: shuffle([
          `${k} × x`,
          `${k} + x`,
          `x - ${k}`,
          `${k} ÷ x`,
        ]),
        expected: [`${k} × x`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une formule peut contenir une multiplication.\n\n" +
          "Méthode : on repère le symbole ×.\n\n" +
          `Exécution : ${k} × x signifie qu’on multiplie x par ${k}.\n\n` +
          `Conclusion : le bloc correct est ${k} × x.`,
        canvas: scratchCanvas("Multiplication en blocs", [
          { type: "event" },
          { type: "operator", left: k, operator: "×", right: "x" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_formule_blocs_tpl_3_formule_rectangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 3,
    theme: "neutral",
    hint: "L’aire d’un rectangle se calcule avec longueur × largeur.",
    tags: ["algorithmique", "formule", "aire", "rectangle", "template", "canvas"],
    generate: () => {
      const largeur = randomChoice([2, 3, 4, 5]);

      return {
        text: `Un rectangle a une longueur variable L et une largeur ${largeur}. Quelle formule donne son aire ?`,
        format: "qcm",
        choices: shuffle([
          `L × ${largeur}`,
          `L + ${largeur}`,
          `L - ${largeur}`,
          `L ÷ ${largeur}`,
        ]),
        expected: [`L × ${largeur}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une formule peut modéliser une situation mathématique.\n\n" +
          "Méthode : on utilise la formule de l’aire du rectangle : longueur × largeur.\n\n" +
          `Exécution : la longueur est L et la largeur est ${largeur}, donc l’aire vaut L × ${largeur}.\n\n` +
          `Conclusion : la bonne formule est L × ${largeur}.`,
        canvas: scratchCanvas("Formule d’aire", [
          { type: "event" },
          { type: "set_variable", variable: "largeur", value: largeur },
          { type: "operator", left: "L", operator: "×", right: largeur },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_formule_blocs_tpl_4_programme_de_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis chaque instruction par une opération.",
    tags: ["algorithmique", "formule", "programme_calcul", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 6, 10]);

      return {
        text:
          `Un programme prend un nombre x, le multiplie par ${k}, puis ajoute ${b}. ` +
          "Quelle formule correspond au résultat ?",
        format: "qcm",
        choices: shuffle([
          `${k} × x + ${b}`,
          `${k} + x × ${b}`,
          `x + ${k} + ${b}`,
          `${k} × (x - ${b})`,
        ]),
        expected: [`${k} × x + ${b}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme de calcul peut être traduit par une formule.\n\n" +
          "Méthode : on respecte l’ordre des opérations décrites.\n\n" +
          `Exécution : on multiplie x par ${k}, puis on ajoute ${b}. Cela donne ${k} × x + ${b}.\n\n` +
          `Conclusion : la formule correcte est ${k} × x + ${b}.`,
        canvas: scratchCanvas("Programme de calcul", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "operator", left: k, operator: "×", right: "x" },
          { type: "operator", left: `${k} × x`, operator: "+", right: b },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_formule_blocs_fixed_2_piege_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 3,
    theme: "neutral",
    text:
      "Un programme prend x, ajoute 3, puis multiplie le résultat par 2. La formule est-elle x + 3 × 2 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On multiplie tout le résultat obtenu après l’ajout de 3.",
    explanation:
      "Définition : une formule doit respecter l’ordre du programme.\n\n" +
      "Méthode : on utilise des parenthèses quand toute une expression est réutilisée.\n\n" +
      "Exécution : on calcule d’abord x + 3, puis on multiplie ce résultat par 2. La formule est donc (x + 3) × 2.\n\n" +
      "Conclusion : x + 3 × 2 ne représente pas le programme.",
    tags: ["algorithmique", "formule", "erreur", "ordre", "qcm"],
    canvas: scratchCanvas("Attention à l’ordre", [
      { type: "event" },
      { type: "operator", left: "x", operator: "+", right: 3 },
      { type: "operator", left: "x + 3", operator: "×", right: 2 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_formule_blocs_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_formule_blocs",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment traduire un programme de calcul en formule.",
    format: "open",
    expected: ["ordre", "opération", "variable", "formule"],
    comparator: "contains_keyword",
    hint: "Il faut suivre les instructions dans l’ordre.",
    explanation:
      "Définition : traduire un programme de calcul en formule consiste à écrire les opérations avec une variable.\n\n" +
      "Méthode : on remplace le nombre de départ par une variable, puis on écrit les opérations dans l’ordre.\n\n" +
      "Exécution : si le programme dit “multiplier par 3 puis ajouter 5”, on écrit 3 × x + 5.\n\n" +
      "Conclusion : il faut respecter l’ordre des instructions.",
    tags: ["algorithmique", "formule", "open", "methode"],
  },
    /* =========================
     ALGO_EXPRESSION_VALEUR
  ========================= */

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur.",
    tags: ["algorithmique", "expression", "valeur", "addition", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 4, 5, 7, 10]);
      const a = randomChoice([3, 5, 8, 10]);
      const result = x + a;

      return {
        text: `Si x vaut ${x}, quelle est la valeur de x + ${a} ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : calculer la valeur d’une expression, c’est remplacer la variable par un nombre.\n\n" +
          "Méthode : on remplace x par sa valeur, puis on effectue le calcul.\n\n" +
          `Exécution : x + ${a} = ${x} + ${a} = ${result}.\n\n` +
          `Conclusion : la valeur de l’expression est ${result}.`,
        canvas: scratchCanvas("Valeur d’une expression", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: "x", operator: "+", right: a },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_2_multiplication",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur puis multiplie.",
    tags: ["algorithmique", "expression", "valeur", "multiplication", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4, 5]);
      const result = k * x;

      return {
        text: `Si x vaut ${x}, quelle est la valeur de ${k} × x ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une expression avec variable peut être calculée si on connaît la valeur de la variable.\n\n" +
          "Méthode : on remplace x par sa valeur.\n\n" +
          `Exécution : ${k} × x = ${k} × ${x} = ${result}.\n\n` +
          `Conclusion : la valeur de l’expression est ${result}.`,
        canvas: scratchCanvas("Multiplication avec variable", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: k, operator: "×", right: "x" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_3_expression_deux_etapes",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la multiplication, puis ajoute.",
    tags: ["algorithmique", "expression", "valeur", "deux_etapes", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 7, 10]);
      const result = k * x + b;

      return {
        text: `Si x vaut ${x}, quelle est la valeur de ${k} × x + ${b} ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une expression peut contenir plusieurs opérations.\n\n" +
          "Méthode : on remplace x, puis on respecte les priorités de calcul.\n\n" +
          `Exécution : ${k} × ${x} + ${b} = ${k * x} + ${b} = ${result}.\n\n` +
          `Conclusion : la valeur de l’expression est ${result}.`,
        canvas: scratchCanvas("Expression en deux étapes", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: k, operator: "×", right: "x" },
          { type: "operator", left: `${k} × x`, operator: "+", right: b },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_4_programme_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les blocs dans l’ordre.",
    tags: ["algorithmique", "expression", "programme_calcul", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5, 6]);
      const mult = randomChoice([2, 3, 4]);
      const ajout = randomChoice([1, 5, 10]);
      const result = depart * mult + ajout;

      return {
        text: `Le nombre de départ est ${depart}. Quelle est la valeur finale de résultat ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : exécuter un programme de calcul consiste à suivre les instructions dans l’ordre.\n\n" +
          "Méthode : on suit la variable étape par étape.\n\n" +
          `Exécution : départ ${depart}. On multiplie par ${mult} : ${depart * mult}. Puis on ajoute ${ajout} : ${result}.\n\n` +
          `Conclusion : la valeur finale est ${result}.`,
        canvas: scratchCanvas("Programme de calcul", [
          { type: "event" },
          { type: "set_variable", variable: "résultat", value: depart },
          { type: "set_variable", variable: "résultat", value: `${depart} × ${mult}` },
          { type: "change_variable", variable: "résultat", value: ajout },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_5_reponse_utilisateur",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "La réponse de l’utilisateur devient la valeur de x.",
    tags: ["algorithmique", "expression", "entree", "reponse", "template", "canvas"],
    generate: () => {
      const reponse = randomChoice([3, 4, 6, 8]);
      const ajout = randomChoice([2, 5, 10]);
      const result = reponse + ajout;

      return {
        text: `L’utilisateur répond ${reponse}. Quelle valeur le programme affiche-t-il ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une entrée utilisateur peut être utilisée dans un calcul.\n\n" +
          "Méthode : on remplace la réponse par la valeur donnée.\n\n" +
          `Exécution : x reçoit ${reponse}, puis on calcule x + ${ajout}. Donc ${reponse} + ${ajout} = ${result}.\n\n` +
          `Conclusion : le programme affiche ${result}.`,
        canvas: scratchCanvas("Réponse utilisée dans un calcul", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "operator", left: "x", operator: "+", right: ajout },
          { type: "say", text: `x + ${ajout}` },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_fixed_1_piege_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 4,
    theme: "neutral",
    text: "Si x vaut 4, l’expression x + x vaut-elle 8 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque x est remplacé par 4.",
    explanation:
      "Définition : une variable représente une même valeur dans une expression.\n\n" +
      "Méthode : on remplace chaque x par 4.\n\n" +
      "Exécution : x + x = 4 + 4 = 8.\n\n" +
      "Conclusion : oui, l’expression vaut 8.",
    tags: ["algorithmique", "expression", "variable", "qcm"],
    canvas: scratchCanvas("Même variable deux fois", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 4 },
      { type: "operator", left: "x", operator: "+", right: "x" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_expression_valeur",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer la valeur d’une expression contenant une variable.",
    format: "open",
    expected: ["remplacer", "variable", "valeur", "calcul"],
    comparator: "contains_keyword",
    hint: "Il faut remplacer la variable par le nombre donné.",
    explanation:
      "Définition : une expression contenant une variable peut prendre différentes valeurs.\n\n" +
      "Méthode : on remplace la variable par le nombre donné.\n\n" +
      "Exécution : par exemple, si x = 3, alors x + 5 = 3 + 5 = 8.\n\n" +
      "Conclusion : il faut remplacer puis calculer.",
    tags: ["algorithmique", "expression", "open", "methode"],
  },
    /* =========================
     ALGO_PREVOIR_EXPRESSION
  ========================= */

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_1_prevoir_resultat",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis le programme sans l’exécuter : suis la variable étape par étape.",
    tags: ["algorithmique", "prevoir", "expression", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const a = randomChoice([2, 4, 6]);
      const b = randomChoice([3, 5, 7]);
      const result = x * a + b;

      return {
        text: `Sans exécuter le programme, prévois la valeur affichée si x vaut ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : prévoir une expression, c’est anticiper le résultat avant exécution.\n\n" +
          "Méthode : on lit les blocs dans l’ordre et on suit la valeur de la variable.\n\n" +
          `Exécution : x vaut ${x}. On calcule ${x} × ${a} = ${x * a}, puis ${x * a} + ${b} = ${result}.\n\n` +
          `Conclusion : la valeur affichée sera ${result}.`,
        canvas: scratchCanvas("Prévoir le résultat", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "set_variable", variable: "résultat", value: `${a} × x` },
          { type: "change_variable", variable: "résultat", value: b },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_2_reconnaitre_formule",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme les blocs en formule avec x.",
    tags: ["algorithmique", "prevoir", "formule", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomChoice([1, 5, 10]);

      return {
        text: "Quelle formule correspond au programme ?",
        format: "qcm",
        choices: shuffle([
          `${a} × x + ${b}`,
          `x + ${a} × ${b}`,
          `${a} × (x + ${b})`,
          `x - ${a} + ${b}`,
        ]),
        expected: [`${a} × x + ${b}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme peut être traduit par une expression littérale.\n\n" +
          "Méthode : on remplace la valeur de départ par x et on suit les opérations dans l’ordre.\n\n" +
          `Exécution : le programme multiplie x par ${a}, puis ajoute ${b}. La formule est donc ${a} × x + ${b}.\n\n` +
          `Conclusion : la formule correcte est ${a} × x + ${b}.`,
        canvas: scratchCanvas("Programme vers formule", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "set_variable", variable: "résultat", value: `${a} × x` },
          { type: "change_variable", variable: "résultat", value: b },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_3_parentheses",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Ici, on ajoute d’abord, puis on multiplie tout le résultat.",
    tags: ["algorithmique", "prevoir", "parentheses", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([3, 5, 6]);

      return {
        text:
          `Le programme ajoute ${b} à x, puis multiplie le résultat par ${a}. ` +
          "Quelle formule correspond au programme ?",
        format: "qcm",
        choices: shuffle([
          `(x + ${b}) × ${a}`,
          `x + ${b} × ${a}`,
          `x × ${a} + ${b}`,
          `x - ${b} × ${a}`,
        ]),
        expected: [`(x + ${b}) × ${a}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : prévoir une expression demande de respecter l’ordre du programme.\n\n" +
          "Méthode : quand un résultat intermédiaire est réutilisé, on peut avoir besoin de parenthèses.\n\n" +
          `Exécution : on calcule d’abord x + ${b}, puis on multiplie tout par ${a}. La formule est donc (x + ${b}) × ${a}.\n\n` +
          `Conclusion : les parenthèses sont nécessaires.`,
        canvas: scratchCanvas("Attention aux parenthèses", [
          { type: "event" },
          { type: "set_variable", variable: "résultat", value: `x + ${b}` },
          { type: "set_variable", variable: "résultat", value: `(x + ${b}) × ${a}` },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_4_comparer_deux_programmes",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste avec la valeur donnée pour x.",
    tags: ["algorithmique", "prevoir", "comparer", "template", "qcm"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 6, 10]);

      const p1 = x * a + b;
      const p2 = (x + b) * a;

      const answer = p1 === p2 ? "oui" : "non";

      return {
        text:
          `Pour x = ${x}, les deux programmes donnent-ils le même résultat ?\n` +
          `Programme A : ${a} × x + ${b}\n` +
          `Programme B : (x + ${b}) × ${a}`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour comparer deux programmes, on calcule leurs résultats avec la même entrée.\n\n" +
          "Méthode : on remplace x par la valeur donnée dans chaque formule.\n\n" +
          `Exécution : Programme A = ${a} × ${x} + ${b} = ${p1}. Programme B = (${x} + ${b}) × ${a} = ${p2}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Comparer deux programmes", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: `${a} × x`, operator: "+", right: b },
          { type: "operator", left: `x + ${b}`, operator: "×", right: a },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_1_piege_priorites",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme prend x, le multiplie par 3, puis ajoute 2. Pour x = 4, un élève répond 18. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 3 × 4 + 2.",
    explanation:
      "Définition : prévoir le résultat consiste à suivre correctement les opérations.\n\n" +
      "Méthode : on remplace x par 4 puis on calcule dans l’ordre.\n\n" +
      "Exécution : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
      "Conclusion : l’élève a tort, le résultat est 14.",
    tags: ["algorithmique", "prevoir", "erreur", "qcm"],
    canvas: scratchCanvas("Erreur de prévision", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 4 },
      { type: "set_variable", variable: "résultat", value: "3 × x" },
      { type: "change_variable", variable: "résultat", value: 2 },
      { type: "say", text: "résultat" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_prevoir_expression",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment prévoir le résultat d’un programme sans l’exécuter.",
    format: "open",
    expected: ["ordre", "variable", "calcul", "résultat"],
    comparator: "contains_keyword",
    hint: "Il faut suivre les valeurs étape par étape.",
    explanation:
      "Définition : prévoir un programme, c’est anticiper son résultat avant de le lancer.\n\n" +
      "Méthode : on lit les instructions dans l’ordre et on suit les variables.\n\n" +
      "Exécution : à chaque bloc, on met à jour la valeur concernée.\n\n" +
      "Conclusion : on peut trouver le résultat final sans exécuter le programme.",
    tags: ["algorithmique", "prevoir", "open", "methode"],
  },
    /* =========================
     ALGO_PARAMETRES
  ========================= */

  {
    kind: "template",
    id: "5e_algo_parametres_tpl_1_modifier_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 3,
    theme: "neutral",
    hint: "Le paramètre du bloc avancer est la distance.",
    tags: ["algorithmique", "parametre", "distance", "template", "canvas"],
    generate: () => {
      const ancienneDistance = randomChoice([20, 30, 40]);
      const nouvelleDistance = randomChoice([50, 60, 80]);

      return {
        text: `On remplace “avancer de ${ancienneDistance}” par “avancer de ${nouvelleDistance}”. Quelle distance le lutin avance-t-il maintenant ?`,
        format: "short",
        expected: [String(nouvelleDistance)],
        comparator: "number_equal",
        explanation:
          "Définition : un paramètre est une valeur que l’on peut modifier dans un bloc.\n\n" +
          "Méthode : on repère la nouvelle valeur du bloc.\n\n" +
          `Exécution : le bloc devient “avancer de ${nouvelleDistance}”.\n\n` +
          `Conclusion : le lutin avance maintenant de ${nouvelleDistance} pas.`,
        canvas: scratchCanvas("Modifier un paramètre", [
          { type: "event" },
          { type: "move", value: nouvelleDistance },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_parametres_tpl_2_effet_sur_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 3,
    theme: "neutral",
    hint: "Distance totale = nombre de répétitions × distance à chaque répétition.",
    tags: ["algorithmique", "parametre", "boucle", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5, 6]);
      const pas = randomChoice([10, 20, 25]);
      const total = times * pas;

      return {
        text: `Le programme répète ${times} fois “avancer de ${pas}”. Quelle distance totale est parcourue ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : modifier un paramètre peut changer le résultat d’un programme.\n\n" +
          "Méthode : ici, on multiplie le nombre de répétitions par la distance.\n\n" +
          `Exécution : ${times} × ${pas} = ${total}.\n\n` +
          `Conclusion : la distance totale parcourue est ${total} pas.`,
        canvas: scratchCanvas("Paramètre dans une boucle", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_parametres_tpl_3_changer_coefficient",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient multiplie la valeur de x.",
    tags: ["algorithmique", "parametre", "coefficient", "formule", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const ancienCoeff = randomChoice([2, 3]);
      const nouveauCoeff = randomChoice([4, 5, 6]);
      const result = nouveauCoeff * x;

      return {
        text:
          `Dans une formule, on remplace ${ancienCoeff} × x par ${nouveauCoeff} × x. ` +
          `Si x = ${x}, quel est le nouveau résultat ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : un paramètre peut être un nombre dans une formule.\n\n" +
          "Méthode : on utilise la nouvelle valeur du coefficient.\n\n" +
          `Exécution : ${nouveauCoeff} × ${x} = ${result}.\n\n` +
          `Conclusion : le nouveau résultat est ${result}.`,
        canvas: scratchCanvas("Changer un coefficient", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: nouveauCoeff, operator: "×", right: "x" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_parametres_tpl_4_modifier_ajout",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis la nouvelle valeur ajoutée.",
    tags: ["algorithmique", "parametre", "variable", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([5, 10, 20]);
      const ancienAjout = randomChoice([2, 3, 4]);
      const nouvelAjout = randomChoice([6, 8, 10]);
      const final = depart + nouvelAjout;

      return {
        text:
          `La variable score vaut ${depart}. On remplace “ajouter ${ancienAjout} à score” par “ajouter ${nouvelAjout} à score”. ` +
          "Quelle est la nouvelle valeur finale de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : changer un paramètre modifie l’effet du bloc.\n\n" +
          "Méthode : on utilise la nouvelle valeur ajoutée.\n\n" +
          `Exécution : ${depart} + ${nouvelAjout} = ${final}.\n\n` +
          `Conclusion : la nouvelle valeur finale de score est ${final}.`,
        canvas: scratchCanvas("Modifier une variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          { type: "change_variable", variable: "score", value: nouvelAjout },
          { type: "say", text: "score" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_parametres_fixed_1_piege_parametre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans un bloc “répéter 5 fois”, le nombre 5 est-il un paramètre que l’on peut modifier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est la valeur qui indique le nombre de répétitions.",
    explanation:
      "Définition : un paramètre est une valeur réglable dans un bloc.\n\n" +
      "Méthode : on repère les nombres ou textes modifiables dans les blocs.\n\n" +
      "Exécution : dans “répéter 5 fois”, le nombre 5 indique combien de fois la boucle se répète.\n\n" +
      "Conclusion : oui, 5 est un paramètre.",
    tags: ["algorithmique", "parametre", "boucle", "qcm"],
    canvas: scratchCanvas("Paramètre de boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 5,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_parametres_fixed_2_piege_effet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 4,
    theme: "neutral",
    text:
      "Si on augmente le nombre de répétitions dans une boucle, le programme effectue-t-il plus d’actions ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une boucle répète les blocs qu’elle contient.",
    explanation:
      "Définition : une boucle répète des instructions.\n\n" +
      "Méthode : on regarde le nombre de répétitions.\n\n" +
      "Exécution : si ce nombre augmente, les instructions à l’intérieur sont exécutées davantage de fois.\n\n" +
      "Conclusion : oui, le programme effectue plus d’actions.",
    tags: ["algorithmique", "parametre", "boucle", "effet", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_parametres_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_parametres",
    difficulty: 5,
    theme: "neutral",
    text: "Explique ce qu’est un paramètre dans un bloc Scratch.",
    format: "open",
    expected: ["valeur", "modifier", "bloc", "programme"],
    comparator: "contains_keyword",
    hint: "Pense aux nombres dans les blocs avancer, tourner ou répéter.",
    explanation:
      "Définition : un paramètre est une valeur modifiable dans un bloc.\n\n" +
      "Méthode : on repère ce qui peut être changé : distance, angle, nombre de répétitions, valeur d’une variable.\n\n" +
      "Exécution : changer “avancer de 10” en “avancer de 50” change le déplacement.\n\n" +
      "Conclusion : un paramètre permet d’adapter le comportement du programme.",
    tags: ["algorithmique", "parametre", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_TESTS_CONDITIONS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_tests_tpl_1_condition_vraie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la condition est vraie ou fausse.",
    tags: ["algorithmique", "condition", "if", "template", "canvas"],
    generate: () => {
      const score = randomChoice([12, 15, 18]);
      const limite = randomChoice([10, 11, 14]);

      return {
        text: `Le score vaut ${score}. Le programme teste : “si score > ${limite}”. La condition est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [score > limite ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition permet de tester une situation.\n\n" +
          "Méthode : on compare les deux nombres.\n\n" +
          `Exécution : ${score} > ${limite} est ${score > limite ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la réponse est “${score > limite ? "oui" : "non"}”.`,
        canvas: scratchCanvas("Tester une condition", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: `score > ${limite}`,
            children: [{ type: "say", text: "Bravo !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_2_condition_fausse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 2,
    theme: "neutral",
    hint: "Le programme agit seulement si la condition est vraie.",
    tags: ["algorithmique", "condition", "if", "template", "canvas"],
    generate: () => {
      const vies = randomChoice([1, 2, 3]);
      const limite = randomChoice([5, 6, 7]);

      return {
        text:
          `Le programme teste “si vies > ${limite}”. ` +
          `Le nombre de vies vaut ${vies}. ` +
          `Le bloc à l’intérieur sera-t-il exécuté ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [vies > limite ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un bloc “si” s’exécute seulement lorsque la condition est vraie.\n\n" +
          "Méthode : on vérifie la comparaison.\n\n" +
          `Exécution : ${vies} > ${limite} est ${vies > limite ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la réponse est “${vies > limite ? "oui" : "non"}”.`,
        canvas: scratchCanvas("Condition fausse", [
          { type: "event" },
          { type: "set_variable", variable: "vies", value: vies },
          {
            type: "if",
            condition: `vies > ${limite}`,
            children: [{ type: "say", text: "Niveau gagné !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_3_resultat_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe ce qui arrive à la variable.",
    tags: ["algorithmique", "condition", "variable", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([2, 4, 6]);
      const ajout = randomChoice([5, 10, 20]);
      const condition = randomChoice([true, false]);

      const limite = condition ? depart - 1 : depart + 5;
      const final = condition ? depart + ajout : depart;

      return {
        text:
          `La variable score vaut ${depart}. ` +
          `Le programme teste “si score > ${limite}” puis ajoute ${ajout} à score.\n` +
          "Quelle est la valeur finale de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une condition contrôle l’exécution d’actions.\n\n" +
          "Méthode : on vérifie si la condition est vraie.\n\n" +
          `Exécution : ${depart} > ${limite} est ${condition ? "vrai" : "faux"}.\n` +
          `${condition ? `On ajoute ${ajout}.` : "Aucun ajout n’est effectué."}\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
        canvas: scratchCanvas("Condition et variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "if",
            condition: `score > ${limite}`,
            children: [
              {
                type: "change_variable",
                variable: "score",
                value: ajout,
              },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_4_parite",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 3,
    theme: "neutral",
    hint: "Un nombre pair est divisible par 2.",
    tags: ["algorithmique", "condition", "pair", "template", "canvas"],
    generate: () => {
      const nombre = randomChoice([4, 6, 8, 10, 3, 5, 7, 9]);

      return {
        text:
          `Le programme teste : “si le nombre ${nombre} est pair”. ` +
          `La condition est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [nombre % 2 === 0 ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut tester une propriété mathématique.\n\n" +
          "Méthode : on vérifie si le nombre est divisible par 2.\n\n" +
          `Exécution : ${nombre} ${nombre % 2 === 0 ? "est" : "n’est pas"} pair.\n\n` +
          `Conclusion : la réponse est “${nombre % 2 === 0 ? "oui" : "non"}”.`,
        canvas: scratchCanvas("Tester un nombre pair", [
          { type: "event" },
          {
            type: "if",
            condition: `${nombre} est pair`,
            children: [{ type: "say", text: "Nombre pair !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_5_deplacement_condition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 4,
    theme: "neutral",
    hint: "Le déplacement se fait seulement si la condition est vraie.",
    tags: ["algorithmique", "condition", "deplacement", "template", "canvas"],
    generate: () => {
      const energie = randomChoice([3, 6, 9]);
      const seuil = randomChoice([5, 7]);

      const avance = energie > seuil ? 50 : 0;

      return {
        text:
          `Le programme dit : “si énergie > ${seuil}, avancer de 50”.\n` +
          `L’énergie vaut ${energie}. Combien de pas le lutin avance-t-il ?`,
        format: "short",
        expected: [String(avance)],
        comparator: "number_equal",
        explanation:
          "Définition : un bloc conditionnel peut déclencher une action.\n\n" +
          "Méthode : on regarde si la condition est vraie.\n\n" +
          `Exécution : ${energie} > ${seuil} est ${energie > seuil ? "vrai" : "faux"}.\n` +
          `${energie > seuil ? "Le lutin avance de 50 pas." : "Le lutin ne bouge pas."}\n\n` +
          `Conclusion : le lutin avance de ${avance} pas.`,
        canvas: scratchCanvas("Condition et déplacement", [
          { type: "event" },
          { type: "set_variable", variable: "energie", value: energie },
          {
            type: "if",
            condition: `energie > ${seuil}`,
            children: [{ type: "move", value: 50 }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_tests_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une condition dans un programme ?",
    format: "qcm",
    choices: shuffle([
      "à tester une situation",
      "à colorier un dessin",
      "à supprimer un programme",
      "à éteindre l’ordinateur",
    ]),
    expected: ["à tester une situation"],
    comparator: "mcq_exact",
    hint: "Une condition répond souvent par vrai ou faux.",
    explanation:
      "Définition : une condition sert à vérifier une situation.\n\n" +
      "Méthode : le programme regarde si une affirmation est vraie ou fausse.\n\n" +
      "Exécution : selon le résultat, certaines actions sont exécutées.\n\n" +
      "Conclusion : une condition sert à tester une situation.",
    tags: ["algorithmique", "condition", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_tests_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_tests_conditions",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique avec tes mots ce qu’est une condition dans un programme Scratch.",
    format: "open",
    expected: ["vrai", "faux", "tester", "si"],
    comparator: "contains_keyword",
    hint: "Pense au bloc “si ... alors”.",
    explanation:
      "Définition : une condition est un test logique.\n\n" +
      "Méthode : le programme vérifie si quelque chose est vrai ou faux.\n\n" +
      "Exécution : si la condition est vraie, les blocs à l’intérieur sont exécutés.\n\n" +
      "Conclusion : une condition permet au programme de prendre une décision.",
    tags: ["algorithmique", "condition", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_BOUCLE
  ========================= */

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_1_distance_totale",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance.",
    tags: ["algorithmique", "boucle", "distance", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5, 6]);
      const pas = randomChoice([10, 20, 25, 30]);
      const total = times * pas;

      return {
        text: `Le programme répète ${times} fois “avancer de ${pas}”. Quelle distance totale est parcourue ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète plusieurs fois les mêmes instructions.\n\n" +
          "Méthode : on multiplie le nombre de répétitions par la distance parcourue à chaque fois.\n\n" +
          `Exécution : ${times} × ${pas} = ${total}.\n\n` +
          `Conclusion : le lutin parcourt ${total} pas.`,
        canvas: scratchCanvas("Distance totale", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_2_valeur_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable augmente à chaque répétition.",
    tags: ["algorithmique", "boucle", "variable", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5]);
      const ajout = randomChoice([2, 5, 10]);
      const final = times * ajout;

      return {
        text: `La variable score commence à 0. On ajoute ${ajout} à score pendant ${times} répétitions. Quelle est la valeur finale de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète les blocs qu’elle contient.\n\n" +
          "Méthode : on calcule l’augmentation totale de la variable.\n\n" +
          `Exécution : ${times} répétitions de +${ajout}, donc ${times} × ${ajout} = ${final}.\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Boucle et variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: 0 },
          {
            type: "repeat",
            times,
            children: [
              { type: "change_variable", variable: "score", value: ajout },
            ],
          },
          { type: "say", text: "score" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_3_polygone_regulier",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un carré a 4 côtés, un triangle équilatéral a 3 côtés.",
    tags: ["algorithmique", "boucle", "geometrie", "template", "canvas"],
    generate: () => {
      const figure = randomChoice([
        { nom: "carré", cotes: 4, angle: 90 },
        { nom: "triangle équilatéral", cotes: 3, angle: 120 },
      ]);

      return {
        text: `Pour tracer un ${figure.nom}, combien de fois faut-il répéter le bloc avancer puis tourner ?`,
        format: "short",
        expected: [String(figure.cotes)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle peut éviter de répéter plusieurs fois les mêmes blocs.\n\n" +
          "Méthode : pour tracer un polygone, on répète autant de fois qu’il y a de côtés.\n\n" +
          `Exécution : un ${figure.nom} possède ${figure.cotes} côtés.\n\n` +
          `Conclusion : il faut répéter ${figure.cotes} fois.`,
        canvas: scratchCanvas(`Tracer un ${figure.nom}`, [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          {
            type: "repeat",
            times: figure.cotes,
            children: [
              { type: "move", value: 50 },
              { type: "turn", value: figure.angle },
            ],
          },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "5e_algo_boucle_tpl_4_retrouver_repetitions",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre de répétitions = distance totale ÷ distance par répétition.",
    tags: ["algorithmique", "boucle", "inverse", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([10, 20, 25]);
      const times = randomChoice([3, 4, 5, 6]);
      const total = pas * times;

      return {
        text: `On veut avancer de ${total} pas au total. Chaque répétition avance de ${pas} pas. Combien de répétitions faut-il ?`,
        format: "short",
        expected: [String(times)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète plusieurs fois la même instruction.\n\n" +
          "Méthode : on divise la distance totale par la distance d’une répétition.\n\n" +
          `Exécution : ${total} ÷ ${pas} = ${times}.\n\n` +
          `Conclusion : il faut ${times} répétitions.`,
        canvas: scratchCanvas("Trouver le nombre de répétitions", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une boucle dans un programme ?",
    format: "qcm",
    choices: [
      "à répéter des instructions",
      "à effacer le programme",
      "à changer la couleur de l’écran",
      "à arrêter l’ordinateur",
    ],
    expected: ["à répéter des instructions"],
    comparator: "mcq_exact",
    hint: "Une boucle évite d’écrire plusieurs fois les mêmes blocs.",
    explanation:
      "Définition : une boucle permet de répéter une ou plusieurs instructions.\n\n" +
      "Méthode : on repère le bloc “répéter ... fois”.\n\n" +
      "Exécution : les blocs à l’intérieur sont exécutés plusieurs fois.\n\n" +
      "Conclusion : une boucle sert à répéter des instructions.",
    tags: ["algorithmique", "boucle", "definition", "qcm"],
    canvas: scratchCanvas("Boucle Scratch", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 20 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_2_piege_une_fois",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans “répéter 4 fois”, les blocs placés à l’intérieur sont exécutés 1 seule fois. Vrai ou faux ?",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["faux"],
    comparator: "mcq_exact",
    hint: "Lis bien le nombre écrit dans le bloc répéter.",
    explanation:
      "Définition : le nombre dans une boucle indique combien de fois les blocs sont exécutés.\n\n" +
      "Méthode : on lit le paramètre de la boucle.\n\n" +
      "Exécution : “répéter 4 fois” exécute les blocs 4 fois.\n\n" +
      "Conclusion : l’affirmation est fausse.",
    tags: ["algorithmique", "boucle", "piege", "qcm"],
    canvas: scratchCanvas("Lire une boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "say", text: "Bonjour" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucle",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une boucle peut rendre un programme plus court.",
    format: "open",
    expected: ["répéter", "instructions", "plus court", "mêmes blocs"],
    comparator: "contains_keyword",
    hint: "Pense à un carré : avancer puis tourner plusieurs fois.",
    explanation:
      "Définition : une boucle répète automatiquement des instructions.\n\n" +
      "Méthode : au lieu d’écrire plusieurs fois les mêmes blocs, on les place dans une boucle.\n\n" +
      "Exécution : pour tracer un carré, on peut répéter 4 fois “avancer puis tourner”.\n\n" +
      "Conclusion : la boucle rend le programme plus court et plus lisible.",
    tags: ["algorithmique", "boucle", "open", "optimisation"],
  },

  /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_defis_tpl_1_programme_complet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis d’abord la variable, puis la boucle.",
    tags: ["algorithmique", "defi", "variable", "boucle", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 5, 10]);
      const ajout = randomChoice([2, 3, 5]);
      const times = randomChoice([3, 4, 5]);
      const final = depart + ajout * times;

      return {
        text: `La variable score vaut ${depart}. On ajoute ${ajout} à score pendant ${times} répétitions. Quelle est la valeur finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : un défi algorithmique peut combiner variable et boucle.\n\n" +
          "Méthode : on calcule l’effet total de la boucle, puis on l’ajoute à la valeur de départ.\n\n" +
          `Exécution : la boucle ajoute ${ajout} × ${times} = ${ajout * times}. Puis ${depart} + ${ajout * times} = ${final}.\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
        canvas: scratchCanvas("Variable + boucle", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "repeat",
            times,
            children: [
              { type: "change_variable", variable: "score", value: ajout },
            ],
          },
          { type: "say", text: "score" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_algo_defis_tpl_2_erreur_logique",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare ce que le programme fait vraiment avec ce qu’il était censé faire.",
    tags: ["algorithmique", "defi", "erreur", "logique", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([40, 50, 60]);

      return {
        text:
          "Ce programme est censé tracer un carré. Quelle instruction pose problème ?",
        format: "qcm",
        choices: shuffle([
          "tourner de 60°",
          "répéter 4 fois",
          `avancer de ${cote}`,
          "stylo en position d’écriture",
        ]),
        expected: ["tourner de 60°"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme de tracé géométrique doit utiliser les bons angles.\n\n" +
          "Méthode : pour un carré, on tourne de 90° à chaque sommet.\n\n" +
          "Exécution : ici, le programme tourne de 60°, ce qui ne permet pas de tracer un carré.\n\n" +
          "Conclusion : l’erreur est “tourner de 60°”.",
        canvas: scratchCanvas("Trouver l’erreur", [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          {
            type: "repeat",
            times: 4,
            children: [
              { type: "move", value: cote },
              { type: "turn", value: 60 },
            ],
          },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "5e_algo_defis_tpl_3_entree_calcul_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la valeur saisie, puis applique la boucle.",
    tags: ["algorithmique", "defi", "entree", "calcul", "boucle", "template", "canvas"],
    generate: () => {
      const reponse = randomChoice([2, 3, 4, 5]);
      const ajout = randomChoice([2, 5, 10]);
      const times = randomChoice([3, 4]);
      const final = reponse + ajout * times;

      return {
        text:
          `L’utilisateur répond ${reponse}. Le programme ajoute ${ajout} à nombre pendant ${times} répétitions. ` +
          "Quelle est la valeur finale de nombre ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme peut combiner une entrée, une variable et une boucle.\n\n" +
          "Méthode : on part de la valeur saisie, puis on ajoute plusieurs fois la même quantité.\n\n" +
          `Exécution : nombre vaut ${reponse}. La boucle ajoute ${ajout} × ${times} = ${ajout * times}. Donc ${reponse} + ${ajout * times} = ${final}.\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
        canvas: scratchCanvas("Entrée + boucle", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "nombre", value: reponse },
          {
            type: "repeat",
            times,
            children: [
              { type: "change_variable", variable: "nombre", value: ajout },
            ],
          },
          { type: "say", text: "nombre" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_algo_defis_fixed_1_condition_piege",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    text:
      "Un programme contient : si score > 10 alors dire “Bravo”. Si score vaut 8, le lutin dira-t-il “Bravo” ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie si 8 est supérieur à 10.",
    explanation:
      "Définition : un bloc conditionnel s’exécute seulement si la condition est vraie.\n\n" +
      "Méthode : on compare score avec 10.\n\n" +
      "Exécution : 8 > 10 est faux, donc le bloc “dire Bravo” n’est pas exécuté.\n\n" +
      "Conclusion : le lutin ne dira pas “Bravo”.",
    tags: ["algorithmique", "defi", "condition", "piege", "qcm"],
    canvas: scratchCanvas("Condition piège", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 8 },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_defis_open_1_debug",
    niveau: "5e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique comment tu peux vérifier qu’un programme Scratch donne le bon résultat.",
    format: "open",
    expected: ["tester", "valeur", "étapes", "résultat"],
    comparator: "contains_keyword",
    hint: "Tu peux choisir une valeur simple et suivre les blocs un par un.",
    explanation:
      "Définition : vérifier un programme consiste à contrôler son résultat.\n\n" +
      "Méthode : on choisit une valeur d’entrée simple, puis on suit les blocs étape par étape.\n\n" +
      "Exécution : à chaque instruction, on met à jour la variable ou l’action réalisée.\n\n" +
      "Conclusion : on compare le résultat obtenu avec le résultat attendu.",
    tags: ["algorithmique", "defi", "debug", "open", "methode"],
  },
];
