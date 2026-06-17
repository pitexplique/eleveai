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

function expl(def: string, meth: string, exec: string, concl: string) {
  return (
    `Définition : ${def}\n\n` +
    `Méthode : ${meth}\n\n` +
    `Exécution : ${exec}\n\n` +
    `Conclusion : ${concl}`
  );
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "sequence", "scratch", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
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
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les blocs “avancer”.",
    tags: ["algo_programmation", "sequence", "distance", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Suis la valeur de la variable étape par étape.",
    tags: ["algo_programmation", "sequence", "variable", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "sequence", "erreur", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "sequence", "open", "raisonnement"],
  },
    /* =========================
     ALGO_ENTREES_SORTIES
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_1_vocabulaire",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
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
    tags: ["algo_programmation", "entree", "sortie", "scratch", "qcm"],
    canvas: scratchCanvas("Entrée utilisateur", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "say", text: "Merci !" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_2_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
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
    tags: ["algo_programmation", "sortie", "dire", "qcm"],
    canvas: scratchCanvas("Sortie affichée", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_1_variable_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    hint: "La réponse saisie peut être placée dans une variable.",
    tags: ["algo_programmation", "entree", "variable", "template", "canvas"],
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
    id: "5e_algo_entree_sortie_tpl_2_sortie_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    hint: "Suis la valeur donnée à la variable.",
    tags: ["algo_programmation", "sortie", "variable", "template", "canvas"],
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
    id: "5e_algo_entree_sortie_tpl_3_entree_calcul_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    hint: "Le programme prend une entrée, fait un calcul, puis affiche une sortie.",
    tags: ["algo_programmation", "entree", "sortie", "calcul", "template", "canvas"],
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
    id: "5e_algo_entree_sortie_fixed_3_piege_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
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
    tags: ["algo_programmation", "reponse", "entree", "piege", "qcm"],
    canvas: scratchCanvas("Bloc réponse", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "say", text: "réponse" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
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
    tags: ["algo_programmation", "entree", "sortie", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_FORMULE_BLOCS
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
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
    tags: ["algo_programmation", "formule", "operateur", "scratch", "qcm"],
    canvas: scratchCanvas("Formule en blocs", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      { type: "operator", left: "x", operator: "+", right: 5 },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis la formule en opération.",
    tags: ["algo_programmation", "formule", "addition", "template", "canvas"],
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
    id: "5e_algo_formule_bloc_tpl_2_multiplication",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole × signifie multiplier.",
    tags: ["algo_programmation", "formule", "multiplication", "template", "canvas"],
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
    id: "5e_algo_formule_bloc_tpl_3_formule_rectangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "L’aire d’un rectangle se calcule avec longueur × largeur.",
    tags: ["algo_programmation", "formule", "aire", "rectangle", "template", "canvas"],
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
    id: "5e_algo_formule_bloc_tpl_4_programme_de_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis chaque instruction par une opération.",
    tags: ["algo_programmation", "formule", "programme_calcul", "template", "canvas"],
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
    id: "5e_algo_formule_bloc_fixed_2_piege_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
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
    tags: ["algo_programmation", "formule", "erreur", "ordre", "qcm"],
    canvas: scratchCanvas("Attention à l’ordre", [
      { type: "event" },
      { type: "operator", left: "x", operator: "+", right: 3 },
      { type: "operator", left: "x + 3", operator: "×", right: 2 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
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
    tags: ["algo_programmation", "formule", "open", "methode"],
  },
    /* =========================
     ALGO_EXPRESSION_VALEUR
  ========================= */

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur.",
    tags: ["algo_programmation", "expression", "valeur", "addition", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur puis multiplie.",
    tags: ["algo_programmation", "expression", "valeur", "multiplication", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la multiplication, puis ajoute.",
    tags: ["algo_programmation", "expression", "valeur", "deux_etapes", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les blocs dans l’ordre.",
    tags: ["algo_programmation", "expression", "programme_calcul", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "La réponse de l’utilisateur devient la valeur de x.",
    tags: ["algo_programmation", "expression", "entree", "reponse", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "expression", "variable", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "expression", "open", "methode"],
  },
    /* =========================
     ALGO_PREVOIR_EXPRESSION
  ========================= */

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_1_prevoir_resultat",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis le programme sans l’exécuter : suis la variable étape par étape.",
    tags: ["algo_programmation", "prevoir", "expression", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme les blocs en formule avec x.",
    tags: ["algo_programmation", "prevoir", "formule", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Ici, on ajoute d’abord, puis on multiplie tout le résultat.",
    tags: ["algo_programmation", "prevoir", "parentheses", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste avec la valeur donnée pour x.",
    tags: ["algo_programmation", "prevoir", "comparer", "template", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "prevoir", "erreur", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "prevoir", "open", "methode"],
  },
    /* =========================
     ALGO_PARAMETRES
  ========================= */

  {
    kind: "template",
    id: "5e_algo_parametre_tpl_1_modifier_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le paramètre du bloc avancer est la distance.",
    tags: ["algo_programmation", "parametre", "distance", "template", "canvas"],
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
    id: "5e_algo_parametre_tpl_2_effet_sur_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "Distance totale = nombre de répétitions × distance à chaque répétition.",
    tags: ["algo_programmation", "parametre", "boucle", "template", "canvas"],
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
    id: "5e_algo_parametre_tpl_3_changer_coefficient",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient multiplie la valeur de x.",
    tags: ["algo_programmation", "parametre", "coefficient", "formule", "template", "canvas"],
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
    id: "5e_algo_parametre_tpl_4_modifier_ajout",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis la nouvelle valeur ajoutée.",
    tags: ["algo_programmation", "parametre", "variable", "template", "canvas"],
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
    id: "5e_algo_parametre_fixed_1_piege_parametre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
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
    tags: ["algo_programmation", "parametre", "boucle", "qcm"],
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
    id: "5e_algo_parametre_fixed_2_piege_effet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
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
    tags: ["algo_programmation", "parametre", "boucle", "effet", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_parametre_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
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
    tags: ["algo_programmation", "parametre", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_TESTS_CONDITIONS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_tests_tpl_1_condition_vraie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la condition est vraie ou fausse.",
    tags: ["algo_programmation", "condition", "if", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Le programme agit seulement si la condition est vraie.",
    tags: ["algo_programmation", "condition", "if", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe ce qui arrive à la variable.",
    tags: ["algo_programmation", "condition", "variable", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Un nombre pair est divisible par 2.",
    tags: ["algo_programmation", "condition", "pair", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 4,
    theme: "neutral",
    hint: "Le déplacement se fait seulement si la condition est vraie.",
    tags: ["algo_programmation", "condition", "deplacement", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_test_condition",
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
    tags: ["algo_programmation", "condition", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_tests_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_test_condition",
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
    tags: ["algo_programmation", "condition", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_BOUCLE
  ========================= */

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_1_distance_totale",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance.",
    tags: ["algo_programmation", "boucle", "distance", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable augmente à chaque répétition.",
    tags: ["algo_programmation", "boucle", "variable", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un carré a 4 côtés, un triangle équilatéral a 3 côtés.",
    tags: ["algo_programmation", "boucle", "geometrie", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre de répétitions = distance totale ÷ distance par répétition.",
    tags: ["algo_programmation", "boucle", "inverse", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "boucle", "definition", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "boucle", "piege", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "boucle", "open", "optimisation"],
  },

  /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_defi_tpl_1_programme_complet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis d’abord la variable, puis la boucle.",
    tags: ["algo_programmation", "defi", "variable", "boucle", "template", "canvas"],
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
    id: "5e_algo_defi_tpl_2_erreur_logique",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare ce que le programme fait vraiment avec ce qu’il était censé faire.",
    tags: ["algo_programmation", "defi", "erreur", "logique", "template", "canvas"],
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
    id: "5e_algo_defi_tpl_3_entree_calcul_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la valeur saisie, puis applique la boucle.",
    tags: ["algo_programmation", "defi", "entree", "calcul", "boucle", "template", "canvas"],
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
    id: "5e_algo_defi_fixed_1_condition_piege",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
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
    tags: ["algo_programmation", "defi", "condition", "piege", "qcm"],
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
    id: "5e_algo_defi_open_1_debug",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
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
    tags: ["algo_programmation", "defi", "debug", "open", "methode"],
  },

  /* =========================
     TOP-UP — ALGO_SEQUENCE (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Que se passe-t-il si on échange l’ordre de deux blocs dans une séquence ?",
    format: "qcm",
    choices: [
      "le programme peut donner un résultat différent",
      "rien ne change jamais",
      "le programme s’arrête toujours",
      "les blocs disparaissent",
    ],
    expected: ["le programme peut donner un résultat différent"],
    comparator: "mcq_exact",
    hint: "L’ordre est important dans une séquence.",
    explanation: expl(
      "une séquence est une suite d’instructions exécutées dans l’ordre.",
      "on compare le résultat avant et après l’échange.",
      "changer l’ordre des blocs peut modifier les actions et donc le résultat.",
      "l’ordre des blocs est important."
    ),
    tags: ["algo_programmation", "sequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce programme, quelle est la deuxième action après le drapeau vert ?",
    format: "qcm",
    choices: ["avancer de 20", "dire Bonjour", "tourner de 90°", "attendre"],
    expected: ["avancer de 20"],
    comparator: "mcq_exact",
    hint: "Compte les blocs sous le drapeau.",
    explanation: expl(
      "une séquence se lit dans l’ordre, de haut en bas.",
      "on repère le deuxième bloc sous l’événement de départ.",
      "après “dire Bonjour”, le deuxième bloc est “avancer de 20”.",
      "la deuxième action est “avancer de 20”."
    ),
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
    canvas: scratchCanvas("Ordre des blocs", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_sequence_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est une séquence d’instructions.",
    format: "open",
    expected: ["suite", "ordre", "instructions"],
    comparator: "contains_keyword",
    hint: "Pense à une recette.",
    explanation: expl(
      "une séquence est une suite d’instructions.",
      "on exécute chaque instruction l’une après l’autre.",
      "comme une recette, on suit les blocs dans l’ordre, de haut en bas.",
      "une séquence est une suite d’instructions exécutées dans l’ordre."
    ),
    tags: ["algo_programmation", "sequence", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_sequence_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux blocs “avancer”.",
    tags: ["algo_programmation", "sequence", "template", "canvas"],
    generate: () => {
      const a = randomChoice([10, 15, 20, 25]);
      const b = randomChoice([10, 30, 40]);
      const total = a + b;
      return {
        text: `Le lutin avance de ${a}, puis de ${b}. Quelle distance totale a-t-il parcourue ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(
          "une séquence exécute les blocs dans l’ordre.",
          "on additionne les distances des blocs “avancer”.",
          `${a} + ${b} = ${total}.`,
          `le lutin a parcouru ${total} pas.`
        ),
        canvas: scratchCanvas("Deux avancées", [
          { type: "event" },
          { type: "move", value: a },
          { type: "move", value: b },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_ENTREE_SORTIE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    text: "Quel bloc Scratch sert à obtenir une entrée de l’utilisateur ?",
    format: "qcm",
    choices: [
      "demander … et attendre",
      "avancer de 10",
      "dire Bonjour",
      "tourner de 90°",
    ],
    expected: ["demander … et attendre"],
    comparator: "mcq_exact",
    hint: "C’est le bloc qui pose une question.",
    explanation: expl(
      "une entrée est une donnée fournie par l’utilisateur.",
      "on repère le bloc qui demande une information.",
      "le bloc “demander … et attendre” récupère la saisie de l’utilisateur.",
      "c’est le bloc “demander … et attendre”."
    ),
    tags: ["algo_programmation", "entree", "qcm"],
    canvas: scratchCanvas("Bloc demander", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "say", text: "réponse" },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    text: "L’utilisateur saisit 7. Le programme multiplie par 2 puis affiche. Que montre-t-il ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Entrée × 2.",
    explanation: expl(
      "un programme transforme une entrée en sortie.",
      "on applique le calcul à la valeur saisie.",
      "7 × 2 = 14.",
      "le programme affiche 14."
    ),
    tags: ["algo_programmation", "entree", "sortie"],
    canvas: scratchCanvas("Entrée → ×2 → sortie", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "nombre", value: 7 },
      { type: "operator", left: "nombre", operator: "×", right: 2 },
      { type: "say", text: "résultat" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis la valeur étape par étape.",
    tags: ["algo_programmation", "entree", "sortie", "template", "canvas"],
    generate: () => {
      const entree = randomChoice([3, 4, 6, 8]);
      const facteur = randomChoice([2, 3, 5]);
      const sortie = entree * facteur;
      return {
        text: `L’utilisateur répond ${entree}. Le programme multiplie par ${facteur} puis affiche. Quelle valeur s’affiche ?`,
        format: "short",
        expected: [String(sortie)],
        comparator: "number_equal",
        explanation: expl(
          "un programme transforme une entrée en sortie.",
          "on applique le calcul à la valeur saisie.",
          `${entree} × ${facteur} = ${sortie}.`,
          `le programme affiche ${sortie}.`
        ),
        canvas: scratchCanvas("Entrée → calcul → sortie", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "nombre", value: entree },
          { type: "operator", left: "nombre", operator: "×", right: facteur },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_FORMULE_BLOC (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    text: "Quel bloc opérateur traduit la formule « périmètre = côté × 4 » d’un carré ?",
    format: "qcm",
    choices: ["côté × 4", "côté + 4", "côté ÷ 4", "côté − 4"],
    expected: ["côté × 4"],
    comparator: "mcq_exact",
    hint: "Le périmètre d’un carré est 4 fois le côté.",
    explanation: expl(
      "une formule peut se traduire par un bloc opérateur.",
      "on identifie l’opération de la formule.",
      "le périmètre d’un carré est côté × 4.",
      "le bloc correct est “côté × 4”."
    ),
    tags: ["algo_programmation", "formule", "qcm"],
    canvas: scratchCanvas("Formule du carré", [
      { type: "event" },
      { type: "operator", left: "côté", operator: "×", right: 4 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment traduire la formule « aire = longueur × largeur » avec des blocs.",
    format: "open",
    expected: ["opérateur", "multiplier", "longueur"],
    comparator: "contains_keyword",
    hint: "On utilise un bloc opérateur ×.",
    explanation: expl(
      "une formule se traduit par un assemblage de blocs opérateurs.",
      "on relie les variables avec l’opérateur de la formule.",
      "on place “longueur × largeur” dans un bloc opérateur de multiplication.",
      "l’aire est donnée par le bloc “longueur × largeur”."
    ),
    tags: ["algo_programmation", "formule", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "Applique la formule du périmètre du carré.",
    tags: ["algo_programmation", "formule", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([3, 5, 6, 8, 10]);
      const perimetre = cote * 4;
      return {
        text: `Le bloc calcule “côté × 4” pour le périmètre d’un carré. Si côté vaut ${cote}, quel est le périmètre ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation: expl(
          "une formule en blocs se calcule en remplaçant la variable.",
          "on remplace côté par sa valeur dans le bloc opérateur.",
          `${cote} × 4 = ${perimetre}.`,
          `le périmètre est ${perimetre}.`
        ),
        canvas: scratchCanvas("Périmètre du carré", [
          { type: "event" },
          { type: "set_variable", variable: "côté", value: cote },
          { type: "operator", left: "côté", operator: "×", right: 4 },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_EXPRESSION_VALEUR (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    text: "Si x vaut 6, quelle est la valeur de x − 2 ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Remplace x par 6.",
    explanation: expl(
      "calculer une expression, c’est remplacer la variable par sa valeur.",
      "on remplace x puis on calcule.",
      "x − 2 = 6 − 2 = 4.",
      "la valeur de l’expression est 4."
    ),
    tags: ["algo_programmation", "expression", "valeur"],
    canvas: scratchCanvas("Valeur d’une expression", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 6 },
      { type: "operator", left: "x", operator: "−", right: 2 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    text: "Si a vaut 3, quelle est la valeur de 2 × a + 1 ?",
    format: "qcm",
    choices: ["7", "6", "9", "8"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord 2 × a.",
    explanation: expl(
      "on calcule l’expression en remplaçant la variable.",
      "on respecte la priorité de la multiplication.",
      "2 × 3 + 1 = 6 + 1 = 7.",
      "la valeur est 7."
    ),
    tags: ["algo_programmation", "expression", "valeur", "qcm"],
  },
  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis calcule.",
    tags: ["algo_programmation", "expression", "valeur", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 5, 6]);
      const k = randomChoice([2, 3, 4]);
      const result = k * x;
      return {
        text: `Si x vaut ${x}, quelle est la valeur de ${k} × x ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: expl(
          "on calcule l’expression en remplaçant x.",
          "on multiplie le coefficient par la valeur de x.",
          `${k} × ${x} = ${result}.`,
          `la valeur de l’expression est ${result}.`
        ),
        canvas: scratchCanvas("Valeur d’une expression", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: k, operator: "×", right: "x" },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_PREVOIR_EXPRESSION (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Un programme calcule x + 5. Que faut-il connaître pour prévoir le résultat ?",
    format: "qcm",
    choices: ["la valeur de x", "la couleur du lutin", "le nombre de blocs", "la taille de l’écran"],
    expected: ["la valeur de x"],
    comparator: "mcq_exact",
    hint: "Le résultat dépend de la variable.",
    explanation: expl(
      "prévoir un résultat, c’est anticiper la sortie d’un calcul.",
      "on identifie la variable dont dépend l’expression.",
      "x + 5 dépend de la valeur de x.",
      "il faut connaître la valeur de x."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Le programme calcule x × 3. Si x augmente, le résultat...",
    format: "qcm",
    choices: ["augmente", "diminue", "reste identique", "devient nul"],
    expected: ["augmente"],
    comparator: "mcq_exact",
    hint: "Multiplier par 3 conserve le sens de variation.",
    explanation: expl(
      "prévoir, c’est anticiper l’effet d’une variation.",
      "on observe comment le résultat change quand x change.",
      "si x augmente, x × 3 augmente aussi.",
      "le résultat augmente."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment prévoir la valeur affichée par un programme qui calcule x + 10.",
    format: "open",
    expected: ["valeur", "x", "remplace"],
    comparator: "contains_keyword",
    hint: "On remplace x par la valeur saisie.",
    explanation: expl(
      "prévoir, c’est calculer le résultat à l’avance.",
      "on remplace la variable par la valeur d’entrée.",
      "on calcule x + 10 avec la valeur de x choisie.",
      "le résultat affiché est x + 10 pour la valeur de x donnée."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis calcule.",
    tags: ["algo_programmation", "prevoir", "expression", "template", "canvas"],
    generate: () => {
      const x = randomChoice([4, 5, 7, 9]);
      const a = randomChoice([3, 6, 10]);
      const result = x + a;
      return {
        text: `Le programme affiche x + ${a}. Si l’utilisateur saisit ${x}, quelle valeur sera affichée ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: expl(
          "prévoir, c’est calculer le résultat à l’avance.",
          "on remplace x par la valeur saisie.",
          `${x} + ${a} = ${result}.`,
          `le programme affichera ${result}.`
        ),
        canvas: scratchCanvas("Prévoir une sortie", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          { type: "operator", left: "x", operator: "+", right: a },
          { type: "say", text: "résultat" },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_PARAMETRE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_parametre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le bloc “tourner de 90°”, quel est le paramètre ?",
    format: "qcm",
    choices: ["90°", "tourner", "le lutin", "le drapeau vert"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "C’est la valeur que l’on peut changer.",
    explanation: expl(
      "un paramètre est une valeur modifiable dans un bloc.",
      "on repère la valeur que l’on peut changer.",
      "dans “tourner de 90°”, la valeur 90° est le paramètre.",
      "le paramètre est 90°."
    ),
    tags: ["algo_programmation", "parametre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_parametre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique à quoi sert un paramètre dans un bloc Scratch.",
    format: "open",
    expected: ["valeur", "modifier", "bloc"],
    comparator: "contains_keyword",
    hint: "Il permet d’adapter le comportement du bloc.",
    explanation: expl(
      "un paramètre est une valeur que l’on peut régler dans un bloc.",
      "on change le paramètre pour adapter l’action.",
      "par exemple, changer la distance d’“avancer de …” modifie le déplacement.",
      "le paramètre permet de modifier le comportement du bloc."
    ),
    tags: ["algo_programmation", "parametre", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_parametre_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "Distance totale = répétitions × paramètre.",
    tags: ["algo_programmation", "parametre", "boucle", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5]);
      const pas = randomChoice([15, 20, 30]);
      const total = times * pas;
      return {
        text: `Une boucle répète ${times} fois “avancer de ${pas}”. Si on garde le même nombre de répétitions, quelle distance totale avec ce paramètre ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(
          "le paramètre “distance” agit à chaque répétition.",
          "on multiplie le nombre de répétitions par le paramètre.",
          `${times} × ${pas} = ${total}.`,
          `la distance totale est ${total}.`
        ),
        canvas: scratchCanvas("Paramètre dans une boucle", [
          { type: "event" },
          { type: "repeat", times, children: [{ type: "move", value: pas }] },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_TEST_CONDITION (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_test_condition_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    text: "Le score vaut 8. La condition “si score > 10” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 8 et 10.",
    explanation: expl(
      "une condition teste une comparaison.",
      "on compare les deux nombres.",
      "8 > 10 est faux.",
      "la condition n’est pas vraie : “non”."
    ),
    tags: ["algo_programmation", "condition", "qcm"],
    canvas: scratchCanvas("Tester une condition", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 8 },
      { type: "if", condition: "score > 10", children: [{ type: "say", text: "Gagné" }] },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_test_condition_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que fait un bloc “si … alors” en Scratch.",
    format: "open",
    expected: ["condition", "vraie", "exécute"],
    comparator: "contains_keyword",
    hint: "Le bloc à l’intérieur ne s’exécute pas toujours.",
    explanation: expl(
      "le bloc “si … alors” teste une condition.",
      "on regarde si la condition est vraie ou fausse.",
      "si la condition est vraie, les blocs à l’intérieur s’exécutent ; sinon ils sont ignorés.",
      "le bloc “si” exécute son contenu seulement quand la condition est vraie."
    ),
    tags: ["algo_programmation", "condition", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_test_condition_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["algo_programmation", "condition", "template", "canvas"],
    generate: () => {
      const valeur = randomChoice([4, 7, 9, 12, 15]);
      const limite = randomChoice([5, 8, 10]);
      const vrai = valeur < limite;
      return {
        text: `La variable n vaut ${valeur}. La condition “si n < ${limite}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          "une condition teste une comparaison.",
          "on compare n et la limite.",
          `${valeur} < ${limite} est ${vrai ? "vrai" : "faux"}.`,
          `la réponse est “${vrai ? "oui" : "non"}”.`
        ),
        canvas: scratchCanvas("Condition à tester", [
          { type: "event" },
          { type: "set_variable", variable: "n", value: valeur },
          { type: "if", condition: `n < ${limite}`, children: [{ type: "say", text: "OK" }] },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_BOUCLE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une boucle “répéter” dans un programme ?",
    format: "qcm",
    choices: [
      "à répéter plusieurs fois les mêmes blocs",
      "à arrêter le programme",
      "à changer la couleur du lutin",
      "à supprimer une variable",
    ],
    expected: ["à répéter plusieurs fois les mêmes blocs"],
    comparator: "mcq_exact",
    hint: "Boucle = répétition.",
    explanation: expl(
      "une boucle répète des instructions.",
      "on identifie le rôle du bloc “répéter”.",
      "le bloc “répéter” exécute plusieurs fois les blocs qu’il contient.",
      "une boucle sert à répéter plusieurs fois les mêmes blocs."
    ),
    tags: ["algo_programmation", "boucle", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_boucle_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’avantage d’utiliser une boucle plutôt que de répéter les blocs à la main.",
    format: "open",
    expected: ["répéter", "court", "blocs"],
    comparator: "contains_keyword",
    hint: "Pense à la longueur du programme.",
    explanation: expl(
      "une boucle factorise des instructions répétées.",
      "on compare un programme avec et sans boucle.",
      "la boucle évite d’écrire plusieurs fois les mêmes blocs : le programme est plus court et plus clair.",
      "la boucle rend le programme plus court à écrire."
    ),
    tags: ["algo_programmation", "boucle", "open"],
  },
  {
    kind: "template",
    id: "5e_algo_boucle_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les répétitions par l’ajout.",
    tags: ["algo_programmation", "boucle", "variable", "template", "canvas"],
    generate: () => {
      const debut = randomChoice([0, 5, 10]);
      const ajout = randomChoice([2, 3, 5]);
      const times = randomChoice([3, 4, 5]);
      const final = debut + ajout * times;
      return {
        text: `La variable total vaut ${debut}. On ajoute ${ajout} à total pendant ${times} répétitions. Quelle est la valeur finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: expl(
          "une boucle répète l’ajout à chaque tour.",
          "on calcule l’augmentation totale puis on l’ajoute au départ.",
          `${debut} + ${ajout} × ${times} = ${debut} + ${ajout * times} = ${final}.`,
          `total vaut ${final}.`
        ),
        canvas: scratchCanvas("Boucle et variable", [
          { type: "event" },
          { type: "set_variable", variable: "total", value: debut },
          { type: "repeat", times, children: [{ type: "change_variable", variable: "total", value: ajout }] },
          { type: "say", text: "total" },
        ]),
      };
    },
  },

  /* =========================
     TOP-UP — ALGO_DEFI (+5)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un programme : total = 0, puis répéter 4 fois (ajouter 5 à total). Quelle est la valeur finale de total ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "4 × 5.",
    explanation: expl(
      "il faut suivre la variable dans la boucle.",
      "on calcule l’augmentation totale.",
      "4 répétitions de +5 : 4 × 5 = 20.",
      "total vaut 20."
    ),
    tags: ["algo_programmation", "defi", "boucle"],
    canvas: scratchCanvas("Boucle compteur", [
      { type: "event" },
      { type: "set_variable", variable: "total", value: 0 },
      { type: "repeat", times: 4, children: [{ type: "change_variable", variable: "total", value: 5 }] },
      { type: "say", text: "total" },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer un pentagone régulier avec une boucle, combien de fois faut-il répéter “avancer puis tourner” ?",
    format: "qcm",
    choices: ["5", "4", "6", "3"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Un pentagone a 5 côtés.",
    explanation: expl(
      "le nombre de répétitions correspond au nombre de côtés.",
      "on compte les côtés du polygone.",
      "un pentagone a 5 côtés.",
      "il faut répéter 5 fois."
    ),
    tags: ["algo_programmation", "defi", "boucle", "geometrie", "qcm"],
    canvas: scratchCanvas("Tracer un pentagone", [
      { type: "event" },
      { type: "repeat", times: 5, children: [{ type: "move", value: 50 }, { type: "turn", value: 72 }] },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un programme : x = 3, puis x devient 2 × x + 1. Quelle est la valeur finale de x ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "2 × 3 + 1.",
    explanation: expl(
      "on suit la transformation de la variable.",
      "on remplace x par sa valeur dans le calcul.",
      "2 × 3 + 1 = 6 + 1 = 7.",
      "x vaut 7."
    ),
    tags: ["algo_programmation", "defi", "expression"],
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Une boucle qui répète 0 fois exécute quand même les blocs une fois ». Explique son erreur.",
    format: "open",
    expected: ["0", "aucune", "exécute"],
    comparator: "contains_keyword",
    hint: "Combien de fois répète-t-on si le nombre est 0 ?",
    explanation: expl(
      "une boucle “répéter n fois” exécute les blocs exactement n fois.",
      "on remplace n par 0.",
      "répéter 0 fois signifie n’exécuter aucune fois les blocs.",
      "l’élève se trompe : avec 0, les blocs ne sont pas exécutés."
    ),
    tags: ["algo_programmation", "defi", "boucle", "open", "erreur"],
  },
  {
    kind: "template",
    id: "5e_algo_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Suis la variable étape par étape.",
    tags: ["algo_programmation", "defi", "template", "canvas"],
    generate: () => {
      const debut = randomChoice([1, 2, 3]);
      const ajout = randomChoice([4, 6, 10]);
      const times = randomChoice([2, 3, 4]);
      const final = debut + ajout * times;
      return {
        text: `score vaut ${debut}. On répète ${times} fois “ajouter ${ajout} à score”. Quelle est la valeur finale de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: expl(
          "on suit la variable dans la boucle.",
          "on ajoute l’augmentation totale à la valeur de départ.",
          `${debut} + ${ajout} × ${times} = ${debut} + ${ajout * times} = ${final}.`,
          `score vaut ${final}.`
        ),
        canvas: scratchCanvas("Compteur", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: debut },
          { type: "repeat", times, children: [{ type: "change_variable", variable: "score", value: ajout }] },
          { type: "say", text: "score" },
        ]),
      };
    },
  },
];
