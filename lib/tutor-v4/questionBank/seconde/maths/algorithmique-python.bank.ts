// lib/tutor-v4/questionBank/seconde/maths/algorithmique-python.bank.ts
//
// Chapitre : Algorithmique et Python (notion algorithmique_python_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Le code est lu en QCM ou produit un resultat numerique (short). Code inline en `...`.
// DIMENSION ECO : minimiser le nombre d'operations rend l'algo plus rapide ET economise
// de l'energie (questions de raisonnement sur l'efficacite).
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   python_variable_affectation — Variables et affectations
//   python_type_variable        — Type d'une variable (entier, flottant, booleen, chaine)
//   python_condition            — Instruction conditionnelle
//   python_boucle               — Boucle bornee (for)
//   python_boucle_non_bornee    — Boucle non bornee (while)
//   python_fonction             — Fonction Python
//   python_simulation           — Simulation simple

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const algorithmiquePythonBank: TutorBankItemV4[] = [
  /* ===================== PYTHON_VARIABLE_AFFECTATION ===================== */

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 1,
    theme: "neutral",
    text: "En Python, que fait l'instruction `x = 5` ?",
    format: "qcm",
    choices: [
      "Elle affecte la valeur 5 à la variable x",
      "Elle teste si x vaut 5",
      "Elle affiche 5",
      "Elle compare x et 5",
    ],
    expected: ["Elle affecte la valeur 5 à la variable x"],
    comparator: "mcq_exact",
    hint: "`=` est l'affectation (pas un test).",
    explanation: exp(
      "En Python, `=` est le symbole d'affectation.",
      "`x = 5` range la valeur 5 dans la variable x.",
      "(Le test d'égalité, lui, s'écrit `==`.)",
      "Elle affecte 5 à x."
    ),
    tags: ["seconde", "maths", "python", "variable", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 2,
    theme: "neutral",
    text: "Après `x = 3` puis `x = x + 2`, que vaut x ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On remplace x par sa valeur : $3 + 2$.",
    explanation: exp(
      "`x = x + 2` calcule d'abord le membre de droite avec l'ancienne valeur.",
      "$x + 2 = 3 + 2 = 5$, puis on range $5$ dans x.",
      "x vaut maintenant 5.",
      "x vaut $5$."
    ),
    tags: ["seconde", "maths", "python", "variable", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 2,
    theme: "neutral",
    text: "En langage naturel (algorithme), l'affectation se note souvent :",
    format: "qcm",
    choices: ["$\\leftarrow$ (flèche)", "$=$ seulement", "$+$", "$?$"],
    expected: ["$\\leftarrow$ (flèche)"],
    comparator: "mcq_exact",
    hint: "Une flèche « reçoit ».",
    explanation: exp(
      "En pseudo-code, l'affectation se note avec une flèche.",
      "Ex. $x \\leftarrow 5$ : « x reçoit 5 ».",
      "En Python, on écrit `x = 5`.",
      "$\\leftarrow$ (flèche)."
    ),
    tags: ["seconde", "maths", "python", "variable", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 3,
    theme: "neutral",
    text: "Après `a = 2` puis `b = a` puis `a = 7`, que vaut b ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "`b = a` copie la valeur de a au moment de l'instruction.",
    explanation: exp(
      "L'affectation copie la valeur courante.",
      "Au moment de `b = a`, a vaut 2, donc b reçoit 2.",
      "Changer a ensuite ne modifie pas b.",
      "b vaut $2$."
    ),
    tags: ["seconde", "maths", "python", "variable", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 2,
    theme: "neutral",
    text: "Après `x = 10` puis `x = x * 2`, que vaut x ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$10 \\times 2$.",
    explanation: exp(
      "On évalue la droite avec l'ancienne valeur.",
      "$x \\times 2 = 10 \\times 2 = 20$.",
      "x reçoit 20.",
      "x vaut $20$."
    ),
    tags: ["seconde", "maths", "python", "variable", "short"],
  },

  {
    kind: "template",
    id: "seconde_py_var_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 2,
    theme: "neutral",
    hint: "On évalue la droite avec l'ancienne valeur de x.",
    tags: ["seconde", "maths", "python", "variable", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return {
        text: `Après \`x = ${a}\` puis \`x = x + ${b}\`, que vaut x ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule d'abord la droite avec l'ancienne valeur.",
          `$x + ${b} = ${a} + ${b}$.`,
          `$= ${a + b}$, rangé dans x.`,
          `x vaut $${a + b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_py_var_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les instructions dans l'ordre.",
    tags: ["seconde", "maths", "python", "variable", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 5);
      const res = a * b + 1;
      return {
        text: `Après \`x = ${a}\` puis \`x = x * ${b}\` puis \`x = x + 1\`, que vaut x ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "On exécute les instructions une par une.",
          `$x = ${a}$ ; puis $${a} \\times ${b} = ${a * b}$ ; puis $${a * b} + 1$.`,
          `$= ${res}$.`,
          `x vaut $${res}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre `=` et `==` en Python ?",
    format: "qcm",
    choices: [
      "`=` affecte une valeur, `==` teste l'égalité",
      "Ils font la même chose",
      "`=` teste l'égalité, `==` affecte",
      "`==` est une erreur",
    ],
    expected: ["`=` affecte une valeur, `==` teste l'égalité"],
    comparator: "mcq_exact",
    hint: "Un seul `=` pour ranger une valeur.",
    explanation: exp(
      "Les deux symboles ont des rôles distincts.",
      "`=` range une valeur dans une variable (affectation).",
      "`==` compare deux valeurs (test, renvoie True/False).",
      "`=` affecte, `==` teste l'égalité."
    ),
    tags: ["seconde", "maths", "python", "variable", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_var_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_variable_affectation",
    difficulty: 4,
    theme: "neutral",
    text: "On veut échanger les valeurs de a et b. Avec `a = 1`, `b = 2`, quelle séquence fonctionne ?",
    format: "qcm",
    choices: [
      "`tmp = a` ; `a = b` ; `b = tmp`",
      "`a = b` ; `b = a`",
      "`a = b` ; `b = a` ; `a = b`",
      "`a == b`",
    ],
    expected: ["`tmp = a` ; `a = b` ; `b = tmp`"],
    comparator: "mcq_exact",
    hint: "Sans variable temporaire, on perd une valeur.",
    explanation: exp(
      "Pour échanger, il faut mémoriser une valeur avant de l'écraser.",
      "`a = b` puis `b = a` échoue : a a déjà été écrasé.",
      "Avec `tmp`, on sauvegarde a avant l'échange.",
      "`tmp = a` ; `a = b` ; `b = tmp`."
    ),
    tags: ["seconde", "maths", "python", "variable", "raisonnement", "qcm"],
  },

  /* ===================== PYTHON_TYPE_VARIABLE ===================== */

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le type de la valeur `5` en Python ?",
    format: "qcm",
    choices: ["un entier (int)", "un flottant (float)", "une chaîne (str)", "un booléen (bool)"],
    expected: ["un entier (int)"],
    comparator: "mcq_exact",
    hint: "Pas de virgule, pas de guillemets.",
    explanation: exp(
      "Le type dépend de l'écriture de la valeur.",
      "`5` est un nombre sans virgule.",
      "C'est un entier (int).",
      "Un entier (int)."
    ),
    tags: ["seconde", "maths", "python", "type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le type de la valeur `3.14` en Python ?",
    format: "qcm",
    choices: ["un flottant (float)", "un entier (int)", "une chaîne (str)", "un booléen (bool)"],
    expected: ["un flottant (float)"],
    comparator: "mcq_exact",
    hint: "Il y a un point décimal.",
    explanation: exp(
      "Un nombre avec un point décimal est un flottant.",
      "`3.14` a une partie décimale.",
      "C'est un float.",
      "Un flottant (float)."
    ),
    tags: ["seconde", "maths", "python", "type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le type de la valeur `\"bonjour\"` en Python ?",
    format: "qcm",
    choices: ["une chaîne de caractères (str)", "un entier (int)", "un flottant (float)", "un booléen (bool)"],
    expected: ["une chaîne de caractères (str)"],
    comparator: "mcq_exact",
    hint: "C'est entre guillemets.",
    explanation: exp(
      "Du texte entre guillemets est une chaîne de caractères.",
      "`\"bonjour\"` est du texte.",
      "C'est une str (string).",
      "Une chaîne de caractères (str)."
    ),
    tags: ["seconde", "maths", "python", "type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le type de la valeur `True` en Python ?",
    format: "qcm",
    choices: ["un booléen (bool)", "un entier (int)", "une chaîne (str)", "un flottant (float)"],
    expected: ["un booléen (bool)"],
    comparator: "mcq_exact",
    hint: "Vrai/Faux.",
    explanation: exp(
      "`True` (et `False`) sont des valeurs de vérité.",
      "Leur type représente vrai ou faux.",
      "C'est un booléen (bool).",
      "Un booléen (bool)."
    ),
    tags: ["seconde", "maths", "python", "type", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle valeur est une chaîne de caractères ?",
    format: "qcm",
    choices: ["`\"42\"`", "`42`", "`42.0`", "`True`"],
    expected: ["`\"42\"`"],
    comparator: "mcq_exact",
    hint: "Les guillemets font la chaîne.",
    explanation: exp(
      "Ce sont les guillemets qui déterminent une chaîne.",
      "`\"42\"` est du texte (même si ça ressemble à un nombre).",
      "`42` est un entier, `42.0` un flottant.",
      "`\"42\"` est une chaîne."
    ),
    tags: ["seconde", "maths", "python", "type", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_type_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi le type d'une variable est-il important ?",
    format: "qcm",
    choices: [
      "Il détermine les opérations possibles (ex. additionner des nombres, concaténer des textes)",
      "Il n'a aucune importance",
      "Il change la couleur du code",
      "Il accélère toujours le programme",
    ],
    expected: ["Il détermine les opérations possibles (ex. additionner des nombres, concaténer des textes)"],
    comparator: "mcq_exact",
    hint: "$2 + 3$ vs $\"2\" + \"3\"$.",
    explanation: exp(
      "Le type décide du comportement des opérations.",
      "$2 + 3 = 5$ (nombres) ; `\"2\" + \"3\"` donne `\"23\"` (textes collés).",
      "Connaître le type évite les erreurs.",
      "Il détermine les opérations possibles."
    ),
    tags: ["seconde", "maths", "python", "type", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_type_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_type_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Virgule → float, guillemets → str, sinon int.",
    tags: ["seconde", "maths", "python", "type", "template"],
    generate: () => {
      const cas = [
        { v: "7", t: "un entier (int)" },
        { v: "2.5", t: "un flottant (float)" },
        { v: '"ok"', t: "une chaîne (str)" },
        { v: "False", t: "un booléen (bool)" },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      const choices = ["un entier (int)", "un flottant (float)", "une chaîne (str)", "un booléen (bool)"];
      return {
        text: `Quel est le type de la valeur \`${c.v}\` en Python ?`,
        format: "qcm",
        choices,
        expected: [c.t],
        comparator: "mcq_exact",
        explanation: exp(
          "On observe l'écriture de la valeur.",
          `\`${c.v}\` correspond à ${c.t}.`,
          "(virgule → float, guillemets → str, True/False → bool, sinon int).",
          `C'est ${c.t}.`
        ),
      };
    },
  },

  /* ===================== PYTHON_CONDITION ===================== */

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 1,
    theme: "neutral",
    text: "Quel mot-clé Python introduit une condition ?",
    format: "qcm",
    choices: ["`if`", "`for`", "`def`", "`return`"],
    expected: ["`if`"],
    comparator: "mcq_exact",
    hint: "« Si » en anglais.",
    explanation: exp(
      "Une instruction conditionnelle teste une expression.",
      "Le mot-clé est `if` (« si »).",
      "Il est suivi d'une condition puis de deux-points.",
      "`if`."
    ),
    tags: ["seconde", "maths", "python", "condition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 2,
    theme: "neutral",
    text: "Dans `if x > 0:` ... `else:` ..., quand exécute-t-on le bloc `else` ?",
    format: "qcm",
    choices: ["Quand la condition est fausse", "Toujours", "Quand x > 0", "Jamais"],
    expected: ["Quand la condition est fausse"],
    comparator: "mcq_exact",
    hint: "`else` = sinon.",
    explanation: exp(
      "`else` couvre le cas où la condition n'est pas vérifiée.",
      "Si `x > 0` est faux, on exécute le bloc `else`.",
      "« sinon ».",
      "Quand la condition est fausse."
    ),
    tags: ["seconde", "maths", "python", "condition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 3,
    theme: "neutral",
    text: "Avec `x = 5`, qu'affiche ce code ?\n`if x > 3:` / &nbsp;&nbsp;`print(\"grand\")` / `else:` / &nbsp;&nbsp;`print(\"petit\")`",
    format: "qcm",
    choices: ["`grand`", "`petit`", "rien", "`5`"],
    expected: ["`grand`"],
    comparator: "mcq_exact",
    hint: "$5 > 3$ est vrai.",
    explanation: exp(
      "On teste la condition `x > 3` avec x = 5.",
      "$5 > 3$ est vrai, on exécute le bloc du `if`.",
      "Cela affiche `grand`.",
      "`grand`."
    ),
    tags: ["seconde", "maths", "python", "condition", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 3,
    theme: "neutral",
    text: "Le mot-clé pour tester un cas intermédiaire (entre `if` et `else`) est :",
    format: "qcm",
    choices: ["`elif`", "`elseif`", "`else if`", "`when`"],
    expected: ["`elif`"],
    comparator: "mcq_exact",
    hint: "Contraction de « else if » en Python.",
    explanation: exp(
      "Python permet d'enchaîner plusieurs conditions.",
      "Le cas intermédiaire utilise `elif`.",
      "(contraction de « else if »).",
      "`elif`."
    ),
    tags: ["seconde", "maths", "python", "condition", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 2,
    theme: "neutral",
    text: "Que renvoie le test `7 == 7` en Python ?",
    format: "qcm",
    choices: ["`True`", "`False`", "`7`", "une erreur"],
    expected: ["`True`"],
    comparator: "mcq_exact",
    hint: "`==` compare ; ici les deux sont égaux.",
    explanation: exp(
      "`==` teste l'égalité et renvoie un booléen.",
      "$7 = 7$ est vrai.",
      "Le test renvoie `True`.",
      "`True`."
    ),
    tags: ["seconde", "maths", "python", "condition", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_cond_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "On teste la condition avec la valeur de x.",
    tags: ["seconde", "maths", "python", "condition", "template"],
    generate: () => {
      const x = randomInt(0, 10);
      const seuil = randomInt(3, 7);
      const grand = x > seuil;
      const correct = grand ? "`positif`" : "`negatif`";
      const choices = ["`positif`", "`negatif`"];
      return {
        text: `Avec \`x = ${x}\`, ce code affiche quoi ?\n\`if x > ${seuil}:\` / \`print("positif")\` / \`else:\` / \`print("negatif")\``,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On teste `x > seuil`.",
          `$${x} > ${seuil}$ est ${grand ? "vrai" : "faux"}.`,
          grand ? "On exécute le bloc du if." : "On exécute le bloc else.",
          `Cela affiche ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_py_cond_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_condition",
    difficulty: 2,
    theme: "neutral",
    text: "Une condition (test) en Python renvoie toujours :",
    format: "qcm",
    choices: ["un booléen (True ou False)", "un nombre", "une chaîne", "rien"],
    expected: ["un booléen (True ou False)"],
    comparator: "mcq_exact",
    hint: "Vrai ou faux.",
    explanation: exp(
      "Un test compare et donne un verdict.",
      "Le résultat est `True` ou `False`.",
      "C'est un booléen.",
      "Un booléen."
    ),
    tags: ["seconde", "maths", "python", "condition", "raisonnement", "qcm"],
  },

  /* ===================== PYTHON_BOUCLE (for) ===================== */

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de fois la boucle `for i in range(5):` répète-t-elle son bloc ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "`range(5)` donne 0, 1, 2, 3, 4.",
    explanation: exp(
      "`range(5)` produit 5 valeurs : 0, 1, 2, 3, 4.",
      "La boucle s'exécute une fois par valeur.",
      "Donc 5 répétitions.",
      "5 fois."
    ),
    tags: ["seconde", "maths", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de valeurs prend `i` dans `for i in range(1, 4):` ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "`range(1, 4)` donne 1, 2, 3 (4 exclu).",
    explanation: exp(
      "`range(a, b)` va de a inclus à b exclu.",
      "`range(1, 4)` donne 1, 2, 3.",
      "Cela fait 3 valeurs.",
      "3 valeurs."
    ),
    tags: ["seconde", "maths", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut s après ce code ?\n`s = 0` / `for i in range(4):` / &nbsp;&nbsp;`s = s + i`",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On ajoute 0, 1, 2, 3.",
    explanation: exp(
      "La boucle ajoute successivement i = 0, 1, 2, 3 à s.",
      "$0 + 0 + 1 + 2 + 3$.",
      "$= 6$.",
      "s vaut $6$."
    ),
    tags: ["seconde", "maths", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "La boucle `for` est une boucle :",
    format: "qcm",
    choices: ["bornée (on connaît le nombre de répétitions)", "non bornée", "infinie", "conditionnelle"],
    expected: ["bornée (on connaît le nombre de répétitions)"],
    comparator: "mcq_exact",
    hint: "On sait à l'avance combien d'itérations.",
    explanation: exp(
      "Avec `for ... in range(n)`, le nombre d'itérations est fixé.",
      "On connaît à l'avance combien de fois on répète.",
      "C'est une boucle bornée.",
      "Bornée."
    ),
    tags: ["seconde", "maths", "python", "boucle", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer $1 + 2 + \\dots + 100$, quel choix consomme le MOINS d'opérations (donc moins d'énergie) ?",
    format: "qcm",
    choices: [
      "La formule $\\dfrac{100 \\times 101}{2}$ (un seul calcul)",
      "Une boucle qui additionne les 100 nombres",
      "Écrire les 100 additions à la main",
      "Les trois consomment pareil",
    ],
    expected: ["La formule $\\dfrac{100 \\times 101}{2}$ (un seul calcul)"],
    comparator: "mcq_exact",
    hint: "Moins d'opérations = plus efficace et plus économe.",
    explanation: exp(
      "Le nombre d'opérations influe sur le temps et l'énergie consommée.",
      "La formule donne le résultat en un calcul ; la boucle en fait 100.",
      "À résultat égal, on privilégie le moins d'opérations.",
      "La formule (un seul calcul) est la plus économe."
    ),
    tags: ["seconde", "maths", "python", "boucle", "energie", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_for_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 2,
    theme: "neutral",
    hint: "`range(n)` donne n valeurs.",
    tags: ["seconde", "maths", "python", "boucle", "template"],
    generate: () => {
      const n = randomInt(3, 10);
      return {
        text: `Combien de fois la boucle \`for i in range(${n}):\` répète-t-elle son bloc ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "`range(n)` produit n valeurs (de 0 à n-1).",
          `\`range(${n})\` donne ${n} valeurs.`,
          `La boucle s'exécute ${n} fois.`,
          `${n} fois.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_py_for_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne 0, 1, ..., n-1.",
    tags: ["seconde", "maths", "python", "boucle", "template"],
    generate: () => {
      const n = randomInt(3, 7);
      const somme = (n * (n - 1)) / 2;
      return {
        text: `Que vaut s après ce code ?\n\`s = 0\` / \`for i in range(${n}):\` / \`  s = s + i\``,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        explanation: exp(
          "La boucle ajoute i = 0, 1, ..., n-1.",
          `$0 + 1 + \\dots + ${n - 1}$.`,
          `$= ${somme}$.`,
          `s vaut $${somme}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_py_for_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut p après ce code ?\n`p = 1` / `for i in range(1, 5):` / &nbsp;&nbsp;`p = p * i`",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "$1 \\times 1 \\times 2 \\times 3 \\times 4$.",
    explanation: exp(
      "La boucle multiplie p par i = 1, 2, 3, 4.",
      "$1 \\times 1 \\times 2 \\times 3 \\times 4$.",
      "$= 24$ (c'est $4!$).",
      "p vaut $24$."
    ),
    tags: ["seconde", "maths", "python", "boucle", "short"],
  },

  /* ===================== PYTHON_BOUCLE_NON_BORNEE (while) ===================== */

  {
    kind: "fixed",
    id: "seconde_py_while_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 2,
    theme: "neutral",
    text: "La boucle `while` répète son bloc :",
    format: "qcm",
    choices: [
      "tant que la condition est vraie",
      "exactement n fois",
      "une seule fois",
      "tant que la condition est fausse",
    ],
    expected: ["tant que la condition est vraie"],
    comparator: "mcq_exact",
    hint: "`while` = « tant que ».",
    explanation: exp(
      "`while condition:` répète le bloc tant que la condition reste vraie.",
      "On s'arrête dès qu'elle devient fausse.",
      "Le nombre de répétitions n'est pas connu d'avance.",
      "Tant que la condition est vraie."
    ),
    tags: ["seconde", "maths", "python", "while", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_while_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 2,
    theme: "neutral",
    text: "La boucle `while` est une boucle :",
    format: "qcm",
    choices: ["non bornée", "bornée", "conditionnelle simple", "toujours infinie"],
    expected: ["non bornée"],
    comparator: "mcq_exact",
    hint: "On ne connaît pas le nombre d'itérations d'avance.",
    explanation: exp(
      "Le nombre de répétitions d'un `while` dépend de la condition.",
      "On ne le connaît pas forcément à l'avance.",
      "C'est une boucle non bornée.",
      "Non bornée."
    ),
    tags: ["seconde", "maths", "python", "while", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_while_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut x à la fin ?\n`x = 0` / `while x < 3:` / &nbsp;&nbsp;`x = x + 1`",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On s'arrête quand `x < 3` devient faux.",
    explanation: exp(
      "On incrémente x tant que `x < 3`.",
      "x passe par 1, 2, 3 ; à 3, `3 < 3` est faux.",
      "La boucle s'arrête avec x = 3.",
      "x vaut $3$."
    ),
    tags: ["seconde", "maths", "python", "while", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_while_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Quel risque si la condition d'un `while` reste toujours vraie ?",
    format: "qcm",
    choices: [
      "Une boucle infinie (le programme ne s'arrête jamais)",
      "Le programme s'arrête tout de suite",
      "Une erreur de syntaxe",
      "Rien de spécial",
    ],
    expected: ["Une boucle infinie (le programme ne s'arrête jamais)"],
    comparator: "mcq_exact",
    hint: "Si on ne sort jamais...",
    explanation: exp(
      "Un `while` s'arrête seulement quand la condition devient fausse.",
      "Si elle reste vraie, la boucle tourne sans fin.",
      "C'est une boucle infinie (à éviter ; elle gaspille du temps et de l'énergie).",
      "Une boucle infinie."
    ),
    tags: ["seconde", "maths", "python", "while", "energie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_while_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 3,
    theme: "neutral",
    text: "Quand préfère-t-on `while` à `for` ?",
    format: "qcm",
    choices: [
      "Quand on ne connaît pas à l'avance le nombre de répétitions",
      "Quand on connaît exactement le nombre de tours",
      "Jamais",
      "Pour afficher du texte",
    ],
    expected: ["Quand on ne connaît pas à l'avance le nombre de répétitions"],
    comparator: "mcq_exact",
    hint: "`for` = nombre connu ; `while` = condition.",
    explanation: exp(
      "On choisit la boucle selon ce qu'on sait.",
      "`for` quand le nombre de tours est connu ; `while` quand il dépend d'une condition.",
      "Ex. « tant que l'utilisateur ne tape pas 0 ».",
      "Quand le nombre de répétitions est inconnu d'avance."
    ),
    tags: ["seconde", "maths", "python", "while", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_while_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 3,
    theme: "neutral",
    hint: "On s'arrête dès que la condition devient fausse.",
    tags: ["seconde", "maths", "python", "while", "template"],
    generate: () => {
      const seuil = randomInt(3, 8);
      return {
        text: `Que vaut x à la fin ?\n\`x = 0\` / \`while x < ${seuil}:\` / \`  x = x + 1\``,
        format: "short",
        expected: [String(seuil)],
        comparator: "number_equal",
        explanation: exp(
          "On incrémente x tant que `x < seuil`.",
          `x augmente jusqu'à ${seuil} ; alors $${seuil} < ${seuil}$ est faux.`,
          `La boucle s'arrête avec x = ${seuil}.`,
          `x vaut $${seuil}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_py_while_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_boucle_non_bornee",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les divisions par 2 jusqu'à atteindre 1.",
    tags: ["seconde", "maths", "python", "while", "template"],
    generate: () => {
      const k = randomInt(2, 4);
      const start = 2 ** k;
      return {
        text: `Que vaut le compteur c à la fin ?\n\`n = ${start}\` / \`c = 0\` / \`while n > 1:\` / \`  n = n // 2\` / \`  c = c + 1\``,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "On divise n par 2 à chaque tour, en comptant les tours.",
          `$${start} \\to ${start / 2} \\to \\dots \\to 1$ : ${k} divisions.`,
          `Le compteur atteint ${k}.`,
          `c vaut $${k}$.`
        ),
      };
    },
  },

  /* ===================== PYTHON_FONCTION ===================== */

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 2,
    theme: "neutral",
    text: "Quel mot-clé sert à définir une fonction en Python ?",
    format: "qcm",
    choices: ["`def`", "`func`", "`function`", "`return`"],
    expected: ["`def`"],
    comparator: "mcq_exact",
    hint: "Abréviation de « define ».",
    explanation: exp(
      "Une fonction se définit avec un mot-clé dédié.",
      "En Python, c'est `def`.",
      "Ex. `def f(x):`.",
      "`def`."
    ),
    tags: ["seconde", "maths", "python", "fonction", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 2,
    theme: "neutral",
    text: "Avec `def f(x):` / &nbsp;&nbsp;`return 2 * x`, que vaut `f(3)` ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On remplace x par 3.",
    explanation: exp(
      "On appelle la fonction avec x = 3.",
      "`return 2 * x` renvoie $2 \\times 3$.",
      "$= 6$.",
      "`f(3)` vaut $6$."
    ),
    tags: ["seconde", "maths", "python", "fonction", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 2,
    theme: "neutral",
    text: "Que fait le mot-clé `return` dans une fonction ?",
    format: "qcm",
    choices: [
      "Il renvoie un résultat (et termine la fonction)",
      "Il affiche un texte",
      "Il crée une boucle",
      "Il définit une variable globale",
    ],
    expected: ["Il renvoie un résultat (et termine la fonction)"],
    comparator: "mcq_exact",
    hint: "Différent de `print`.",
    explanation: exp(
      "`return` indique la valeur que la fonction renvoie.",
      "Il met fin à l'exécution de la fonction.",
      "(Ce n'est pas un affichage : `print` affiche, `return` renvoie.)",
      "Il renvoie un résultat."
    ),
    tags: ["seconde", "maths", "python", "fonction", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 3,
    theme: "neutral",
    text: "Avec `def g(x):` / &nbsp;&nbsp;`return x * x + 1`, que vaut `g(4)` ?",
    format: "short",
    expected: ["17"],
    comparator: "number_equal",
    hint: "$4 \\times 4 + 1$.",
    explanation: exp(
      "On remplace x par 4.",
      "$4 \\times 4 + 1 = 16 + 1$.",
      "$= 17$.",
      "`g(4)` vaut $17$."
    ),
    tags: ["seconde", "maths", "python", "fonction", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert principalement une fonction en programmation ?",
    format: "qcm",
    choices: [
      "Réutiliser un même bloc de code sans le réécrire",
      "Ralentir le programme",
      "Changer la couleur",
      "Supprimer des variables",
    ],
    expected: ["Réutiliser un même bloc de code sans le réécrire"],
    comparator: "mcq_exact",
    hint: "On la définit une fois, on l'appelle souvent.",
    explanation: exp(
      "Une fonction regroupe des instructions réutilisables.",
      "On la définit une fois, puis on l'appelle autant que voulu.",
      "Cela évite la répétition et clarifie le code.",
      "Réutiliser un bloc de code."
    ),
    tags: ["seconde", "maths", "python", "fonction", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_fct_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace x par la valeur dans l'expression renvoyée.",
    tags: ["seconde", "maths", "python", "fonction", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const x = randomInt(2, 6);
      const res = a * x + b;
      return {
        text: `Avec \`def f(x):\` / \`  return ${a} * x + ${b}\`, que vaut \`f(${x})\` ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "On appelle la fonction avec la valeur donnée.",
          `\`return ${a} * x + ${b}\` renvoie $${a} \\times ${x} + ${b}$.`,
          `$= ${res}$.`,
          `\`f(${x})\` vaut $${res}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_py_fct_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 4,
    theme: "neutral",
    hint: "Carré puis ajout.",
    tags: ["seconde", "maths", "python", "fonction", "template"],
    generate: () => {
      const b = randomInt(1, 5);
      const x = randomInt(2, 5);
      const res = x * x + b;
      return {
        text: `Avec \`def g(x):\` / \`  return x * x + ${b}\`, que vaut \`g(${x})\` ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "On remplace x par la valeur.",
          `$${x} \\times ${x} + ${b} = ${x * x} + ${b}$.`,
          `$= ${res}$.`,
          `\`g(${x})\` vaut $${res}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_py_fct_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_fonction",
    difficulty: 4,
    theme: "neutral",
    text: "Différence entre `print(x)` et `return x` dans une fonction ?",
    format: "qcm",
    choices: [
      "`print` affiche à l'écran ; `return` renvoie une valeur réutilisable",
      "Ils font exactement la même chose",
      "`return` affiche, `print` renvoie",
      "`print` termine la fonction",
    ],
    expected: ["`print` affiche à l'écran ; `return` renvoie une valeur réutilisable"],
    comparator: "mcq_exact",
    hint: "Afficher ≠ renvoyer.",
    explanation: exp(
      "Les deux ont des rôles différents.",
      "`print` montre une valeur ; `return` la transmet pour un calcul ultérieur.",
      "Une valeur `return` peut être réutilisée, pas une valeur seulement affichée.",
      "`print` affiche, `return` renvoie."
    ),
    tags: ["seconde", "maths", "python", "fonction", "raisonnement", "qcm"],
  },

  /* ===================== PYTHON_SIMULATION ===================== */

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 2,
    theme: "neutral",
    text: "En Python, quelle instruction simule le hasard (un entier entre 1 et 6) ?",
    format: "qcm",
    choices: ["`random.randint(1, 6)`", "`print(1, 6)`", "`range(1, 6)`", "`math.sqrt(6)`"],
    expected: ["`random.randint(1, 6)`"],
    comparator: "mcq_exact",
    hint: "Module random.",
    explanation: exp(
      "Pour simuler le hasard, on utilise le module random.",
      "`random.randint(1, 6)` renvoie un entier aléatoire entre 1 et 6.",
      "C'est l'équivalent d'un lancer de dé.",
      "`random.randint(1, 6)`."
    ),
    tags: ["seconde", "maths", "python", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour simuler $1000$ lancers de dé et compter les « 6 », on combine :",
    format: "qcm",
    choices: [
      "une boucle `for` + une condition `if`",
      "uniquement une fonction",
      "uniquement `print`",
      "une seule affectation",
    ],
    expected: ["une boucle `for` + une condition `if`"],
    comparator: "mcq_exact",
    hint: "Répéter (for) et tester (if).",
    explanation: exp(
      "Compter sur de nombreux essais demande de répéter et de tester.",
      "La boucle `for` répète les lancers ; le `if` teste si on a un 6.",
      "On incrémente un compteur à chaque succès.",
      "Une boucle `for` + une condition `if`."
    ),
    tags: ["seconde", "maths", "python", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 3,
    theme: "neutral",
    text: "Après une simulation, pour estimer une probabilité, on calcule :",
    format: "qcm",
    choices: [
      "la fréquence = nombre de succès / nombre d'essais",
      "le nombre d'essais seulement",
      "la somme des résultats",
      "le maximum",
    ],
    expected: ["la fréquence = nombre de succès / nombre d'essais"],
    comparator: "mcq_exact",
    hint: "Succès sur essais.",
    explanation: exp(
      "La simulation estime une probabilité par une fréquence.",
      "Fréquence = succès / essais.",
      "Cette fréquence approche la probabilité (loi des grands nombres).",
      "Fréquence = succès / essais."
    ),
    tags: ["seconde", "maths", "python", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 4,
    theme: "neutral",
    text: "Deux programmes donnent la même estimation, mais l'un fait $10$ fois plus d'opérations. Lequel privilégier (rapidité + énergie) ?",
    format: "qcm",
    choices: [
      "Celui qui fait le moins d'opérations",
      "Celui qui fait le plus d'opérations",
      "Peu importe, c'est pareil",
      "Le plus long à écrire",
    ],
    expected: ["Celui qui fait le moins d'opérations"],
    comparator: "mcq_exact",
    hint: "Moins d'opérations = moins d'énergie.",
    explanation: exp(
      "À résultat équivalent, l'efficacité compte.",
      "Moins d'opérations = exécution plus rapide et moins d'énergie consommée.",
      "C'est aussi un enjeu écologique (centres de données).",
      "Celui qui fait le moins d'opérations."
    ),
    tags: ["seconde", "maths", "python", "simulation", "energie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour que l'estimation d'une probabilité par simulation soit fiable, il faut :",
    format: "qcm",
    choices: [
      "un grand nombre d'essais",
      "très peu d'essais",
      "un seul essai",
      "ne pas utiliser de boucle",
    ],
    expected: ["un grand nombre d'essais"],
    comparator: "mcq_exact",
    hint: "Loi des grands nombres.",
    explanation: exp(
      "La fréquence approche la probabilité quand le nombre d'essais est grand.",
      "On programme donc un grand nombre de répétitions.",
      "(Tout en gardant un code efficace pour limiter le coût.)",
      "Un grand nombre d'essais."
    ),
    tags: ["seconde", "maths", "python", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_py_sim_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi éviter des calculs inutiles à l'intérieur d'une grande boucle ?",
    format: "qcm",
    choices: [
      "Ils sont répétés des milliers de fois : ils coûtent du temps et de l'énergie",
      "Ils changent le résultat",
      "C'est interdit en Python",
      "Cela rend le code plus court",
    ],
    expected: ["Ils sont répétés des milliers de fois : ils coûtent du temps et de l'énergie"],
    comparator: "mcq_exact",
    hint: "Un calcul inutile × 10000 = beaucoup de gaspillage.",
    explanation: exp(
      "Dans une boucle, chaque instruction est répétée à chaque tour.",
      "Un calcul inutile est donc refait des milliers de fois.",
      "On le sort de la boucle pour gagner du temps et de l'énergie.",
      "Car ils sont répétés énormément (temps + énergie)."
    ),
    tags: ["seconde", "maths", "python", "simulation", "energie", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_py_sim_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "algorithmique_python_2de",
    microId: "python_simulation",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = succès / essais.",
    tags: ["seconde", "maths", "python", "simulation", "template"],
    generate: () => {
      const total = [200, 500, 1000][randomInt(0, 2)];
      const f = [0.2, 0.5, 0.25, 0.4][randomInt(0, 3)];
      const succes = Math.round(f * total);
      const fStr = String(f).replace(".", ",");
      return {
        text: `Une simulation de ${total} lancers compte ${succes} succès. Quelle fréquence (estimation de la probabilité) obtient-on ?`,
        format: "short",
        expected: [fStr, String(f)],
        comparator: "number_equal",
        explanation: exp(
          "On divise les succès par le nombre d'essais.",
          `$\\dfrac{${succes}}{${total}}$.`,
          `$= ${fStr}$.`,
          `La fréquence estimée est $${fStr}$.`
        ),
      };
    },
  },
];
