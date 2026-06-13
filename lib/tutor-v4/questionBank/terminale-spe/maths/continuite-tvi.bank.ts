// lib/tutor-v4/question-banks/maths/terminale-spe/continuite-tvi.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  resultat: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul : ${calcul}\n\n` +
    `Résultat : ${resultat}`
  );
}

export const continuiteTviBank: TutorBankItemV4[] = [
  /* =========================
     CONTINUITE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_continuite_reconnaitre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "continuite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction polynôme est-elle continue sur R ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les fonctions polynômes sont continues sur R.",
    explanation: exp(
      "Une fonction polynôme est une fonction construite avec des puissances entières positives de x.",
      "On utilise la propriété de cours : toute fonction polynôme est continue sur R.",
      "Ici, on ne cherche pas une valeur précise : on reconnaît seulement la nature de la fonction.",
      "Oui, une fonction polynôme est continue sur R."
    ),
    tags: ["terminale-spe", "continuite", "polynome", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_continuite_reconnaitre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "continuite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "La fonction f définie par f(x) = 1/x est-elle continue sur ]0 ; +∞[ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La fonction inverse est continue sur tout intervalle qui ne contient pas 0.",
    explanation: exp(
      "La fonction inverse f(x) = 1/x est continue sur tout intervalle où elle est définie.",
      "On vérifie si l’intervalle contient la valeur interdite 0.",
      "Sur ]0 ; +∞[, x ne vaut jamais 0, donc 1/x est bien définie.",
      "Oui, la fonction est continue sur ]0 ; +∞[."
    ),
    tags: ["terminale-spe", "continuite", "inverse", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_continuite_reconnaitre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "continuite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction f définie par f(x) = √x est-elle continue sur [0 ; +∞[ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La fonction racine carrée est continue sur son ensemble de définition.",
    explanation: exp(
      "La fonction racine carrée est définie et continue sur [0 ; +∞[.",
      "On vérifie que l’intervalle proposé correspond bien à son domaine de définition.",
      "La fonction √x est définie pour x ≥ 0.",
      "Oui, elle est continue sur [0 ; +∞[."
    ),
    tags: ["terminale-spe", "continuite", "racine", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_continuite_reconnaitre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "continuite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour appliquer le TVI sur [a ; b], quelle condition sur la fonction est indispensable ?",
    format: "qcm",
    choices: [
      "Elle doit être continue sur [a ; b]",
      "Elle doit être positive sur [a ; b]",
      "Elle doit être une fonction affine",
      "Elle doit être strictement croissante",
    ],
    expected: ["Elle doit être continue sur [a ; b]"],
    comparator: "mcq_exact",
    hint: "Le TVI commence toujours par une hypothèse de continuité.",
    explanation: exp(
      "Le théorème des valeurs intermédiaires s’applique à une fonction continue sur un intervalle.",
      "Avant d’utiliser le TVI, on vérifie la continuité sur l’intervalle étudié.",
      "Ici, la condition indispensable est la continuité sur [a ; b].",
      "La bonne réponse est : elle doit être continue sur [a ; b]."
    ),
    tags: ["terminale-spe", "continuite", "tvi", "condition", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_continuite_reconnaitre_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "continuite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Les polynômes sont continus sur R.",
    tags: ["terminale-spe", "continuite", "polynome", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(-6, 6);
      const c = randomInt(-6, 6);

      return {
        text: `La fonction f définie par f(x) = ${a}x² + ${b}x + ${c} est-elle continue sur R ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Toute fonction polynôme est continue sur R.",
          "On reconnaît la nature de la fonction.",
          `f(x) = ${a}x² + ${b}x + ${c} est un polynôme.`,
          "La fonction est donc continue sur R."
        ),
      };
    },
  },

  /* =========================
     TVI_APPLIQUER
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_tvi_appliquer_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_appliquer",
    difficulty: 2,
    theme: "neutral",
    text: "Soit f continue sur [1 ; 3], avec f(1) = -2 et f(3) = 4. Peut-on affirmer qu’il existe une solution à f(x) = 0 sur [1 ; 3] ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "0 est-il compris entre -2 et 4 ?",
    explanation: exp(
      "Le TVI affirme qu’une fonction continue prend toutes les valeurs intermédiaires entre f(a) et f(b).",
      "On vérifie que la valeur cherchée, ici 0, est comprise entre les deux images.",
      "f(1) = -2 et f(3) = 4. Or 0 est compris entre -2 et 4.",
      "Oui, il existe au moins une solution à f(x) = 0 sur [1 ; 3]."
    ),
    tags: ["terminale-spe", "tvi", "existence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_appliquer_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_appliquer",
    difficulty: 2,
    theme: "neutral",
    text: "Soit f continue sur [0 ; 2], avec f(0) = 1 et f(2) = 5. Peut-on appliquer le TVI pour garantir une solution à f(x) = 3 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "3 est-il compris entre 1 et 5 ?",
    explanation: exp(
      "Le TVI garantit qu’une fonction continue atteint toutes les valeurs intermédiaires entre deux images.",
      "On vérifie que 3 est compris entre f(0) et f(2).",
      "f(0) = 1 et f(2) = 5. Or 3 est compris entre 1 et 5.",
      "Oui, il existe au moins un réel c dans [0 ; 2] tel que f(c) = 3."
    ),
    tags: ["terminale-spe", "tvi", "valeur_intermediaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_appliquer_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_appliquer",
    difficulty: 3,
    theme: "neutral",
    text: "Soit f continue sur [2 ; 6], avec f(2) = 7 et f(6) = 10. Le TVI permet-il de garantir une solution à f(x) = 0 sur [2 ; 6] ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "0 est-il compris entre 7 et 10 ?",
    explanation: exp(
      "Le TVI garantit une solution seulement si la valeur cherchée est comprise entre les deux images.",
      "On vérifie si 0 est compris entre f(2) et f(6).",
      "f(2) = 7 et f(6) = 10. Or 0 n’est pas compris entre 7 et 10.",
      "Non, le TVI ne permet pas de garantir une solution à f(x) = 0 sur [2 ; 6]."
    ),
    tags: ["terminale-spe", "tvi", "existence", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_tvi_appliquer_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_appliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie que la valeur cherchée est comprise entre les deux images.",
    tags: ["terminale-spe", "tvi", "existence", "template"],
    generate: () => {
      const left = randomInt(-8, -1);
      const right = randomInt(1, 8);

      return {
        text: `Soit f continue sur [a ; b], avec f(a) = ${left} et f(b) = ${right}. Peut-on garantir qu’il existe une solution à f(x) = 0 sur [a ; b] ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le TVI garantit qu’une fonction continue atteint toute valeur intermédiaire.",
          "On vérifie que 0 est compris entre f(a) et f(b).",
          `f(a) = ${left} et f(b) = ${right}. Or 0 est compris entre ${left} et ${right}.`,
          "Oui, il existe au moins une solution à f(x) = 0 sur [a ; b]."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_appliquer_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_appliquer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le changement de signe entre f(a) et f(b) est utile pour appliquer le TVI à l’équation f(x) = 0.",
    format: "open",
    expected: ["continue", "0", "entre", "f(a)", "f(b)", "solution"],
    comparator: "contains_keyword",
    hint: "Si f(a) et f(b) sont de signes opposés, alors 0 est entre les deux valeurs.",
    explanation: exp(
      "Le TVI permet de prouver qu’une fonction continue atteint une valeur intermédiaire.",
      "Pour résoudre f(x) = 0, on cherche à savoir si 0 est entre f(a) et f(b).",
      "Si f(a) et f(b) sont de signes opposés, alors 0 est compris entre ces deux valeurs.",
      "Le changement de signe permet de garantir l’existence d’au moins une solution."
    ),
    tags: ["terminale-spe", "tvi", "signe", "raisonnement", "open"],
  },

  /* =========================
     TVI_UNICITE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_tvi_unicite_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_unicite",
    difficulty: 3,
    theme: "neutral",
    text: "Pour prouver l’unicité d’une solution avec le TVI, quelle information supplémentaire est souvent utilisée ?",
    format: "qcm",
    choices: [
      "La stricte monotonie de la fonction",
      "Le fait que la fonction soit paire",
      "Le fait que la fonction soit positive",
      "Le fait que la fonction soit définie sur R",
    ],
    expected: ["La stricte monotonie de la fonction"],
    comparator: "mcq_exact",
    hint: "Une fonction strictement monotone ne prend pas deux fois la même valeur.",
    explanation: exp(
      "Le TVI donne l’existence d’une solution, mais pas toujours son unicité.",
      "Pour obtenir l’unicité, on ajoute souvent une information de stricte monotonie.",
      "Une fonction strictement monotone ne peut pas prendre deux fois la même valeur.",
      "La stricte monotonie permet de prouver l’unicité."
    ),
    tags: ["terminale-spe", "tvi", "unicite", "monotonie", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_unicite_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_unicite",
    difficulty: 3,
    theme: "neutral",
    text: "Soit f continue et strictement croissante sur [0 ; 2], avec f(0) = -1 et f(2) = 5. Combien l’équation f(x) = 0 admet-elle de solution sur [0 ; 2] ?",
    format: "qcm",
    choices: ["aucune", "une seule", "au moins deux", "une infinité"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "TVI pour l’existence, stricte croissance pour l’unicité.",
    explanation: exp(
      "Le TVI donne l’existence d’une solution, et la stricte monotonie donne l’unicité.",
      "On vérifie d’abord que 0 est entre f(0) et f(2), puis on utilise la stricte croissance.",
      "0 est compris entre -1 et 5, donc il existe une solution. Comme f est strictement croissante, cette solution est unique.",
      "L’équation admet une seule solution sur [0 ; 2]."
    ),
    tags: ["terminale-spe", "tvi", "unicite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_unicite_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_unicite",
    difficulty: 4,
    theme: "neutral",
    text: "Le TVI seul permet-il toujours de prouver qu’une solution est unique ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le TVI garantit une existence, pas forcément une unicité.",
    explanation: exp(
      "Le TVI garantit qu’une valeur intermédiaire est atteinte au moins une fois.",
      "On distingue l’existence et l’unicité.",
      "Une fonction continue peut atteindre la même valeur plusieurs fois.",
      "Non, le TVI seul ne garantit pas l’unicité."
    ),
    tags: ["terminale-spe", "tvi", "unicite", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_unicite_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_unicite",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre prouver l’existence d’une solution et prouver son unicité.",
    format: "open",
    expected: ["existence", "unicité", "au moins", "une seule", "solution"],
    comparator: "contains_keyword",
    hint: "Existence : il y en a au moins une. Unicité : il n’y en a qu’une.",
    explanation: exp(
      "Prouver l’existence signifie montrer qu’au moins une solution existe.",
      "Prouver l’unicité signifie montrer qu’il n’y a pas deux solutions différentes.",
      "Le TVI permet souvent de prouver l’existence. La stricte monotonie permet souvent de prouver l’unicité.",
      "Existence signifie au moins une solution ; unicité signifie une seule solution."
    ),
    tags: ["terminale-spe", "tvi", "unicite", "raisonnement", "open"],
  },

  /* =========================
     TVI_REDIGER
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_tvi_rediger_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une rédaction TVI, quel élément doit apparaître en premier ?",
    format: "qcm",
    choices: [
      "La continuité de la fonction sur l’intervalle",
      "La valeur de la calculatrice",
      "La conclusion sans justification",
      "Le tableau de signes uniquement",
    ],
    expected: ["La continuité de la fonction sur l’intervalle"],
    comparator: "mcq_exact",
    hint: "Le TVI ne s’applique que si la fonction est continue.",
    explanation: exp(
      "Une rédaction TVI doit vérifier les hypothèses du théorème.",
      "On commence par citer la continuité sur l’intervalle étudié.",
      "Sans continuité, le TVI ne peut pas être appliqué directement.",
      "La continuité doit apparaître au début de la rédaction."
    ),
    tags: ["terminale-spe", "tvi", "redaction", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_rediger_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle rédaction est la plus correcte pour conclure avec le TVI ?",
    format: "qcm",
    choices: [
      "Comme f est continue sur [a ; b] et que 0 est compris entre f(a) et f(b), il existe c dans [a ; b] tel que f(c) = 0.",
      "Il y a une solution car on le voit sur le graphique.",
      "La fonction est jolie donc il y a une solution.",
      "f(a) et f(b) existent donc f(x) = 0 a une solution.",
    ],
    expected: [
      "Comme f est continue sur [a ; b] et que 0 est compris entre f(a) et f(b), il existe c dans [a ; b] tel que f(c) = 0.",
    ],
    comparator: "mcq_exact",
    hint: "Une rédaction correcte cite la continuité et la valeur intermédiaire.",
    explanation: exp(
      "Une rédaction de TVI doit citer les hypothèses et la conclusion.",
      "On indique la continuité, puis le fait que la valeur cherchée est comprise entre les deux images.",
      "La phrase correcte contient : f continue sur [a ; b], 0 compris entre f(a) et f(b), donc existence de c.",
      "La première rédaction est la plus correcte."
    ),
    tags: ["terminale-spe", "tvi", "redaction", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_rediger_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_rediger",
    difficulty: 5,
    theme: "neutral",
    text: "Rédige une phrase de conclusion TVI pour montrer qu’il existe une solution à f(x) = 0 sur [1 ; 3], sachant que f est continue, f(1) = -2 et f(3) = 5.",
    format: "open",
    expected: ["continue", "[1 ; 3]", "0", "entre", "-2", "5", "existe"],
    comparator: "contains_keyword",
    hint: "Mentionne la continuité, l’encadrement de 0 et l’existence d’une solution.",
    explanation: exp(
      "Le TVI permet de conclure à l’existence d’une solution lorsqu’une fonction continue atteint deux valeurs encadrant la valeur cherchée.",
      "On rédige en citant les hypothèses puis la conclusion.",
      "f est continue sur [1 ; 3], f(1) = -2, f(3) = 5, et 0 est compris entre -2 et 5.",
      "Donc il existe au moins un réel c dans [1 ; 3] tel que f(c) = 0."
    ),
    tags: ["terminale-spe", "tvi", "redaction", "type_bac", "open"],
  },

  /* =========================
     TVI_DEFIS - TYPE BAC
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_tvi_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit f(x) = x³ + x - 1. On a f(0) = -1 et f(1) = 1. Que permet d’affirmer le TVI sur [0 ; 1] ?",
    format: "qcm",
    choices: [
      "Il existe au moins une solution à f(x) = 0 sur [0 ; 1]",
      "Il n’existe aucune solution",
      "La solution vaut forcément 0,5",
      "La fonction est décroissante",
    ],
    expected: ["Il existe au moins une solution à f(x) = 0 sur [0 ; 1]"],
    comparator: "mcq_exact",
    hint: "0 est compris entre -1 et 1.",
    explanation: exp(
      "Le TVI garantit l’existence d’une solution lorsque la fonction est continue et que la valeur cherchée est comprise entre deux images.",
      "On vérifie la continuité et l’encadrement de 0.",
      "f est un polynôme donc continue. De plus, f(0) = -1 et f(1) = 1, donc 0 est compris entre les deux images.",
      "Il existe au moins une solution à f(x) = 0 sur [0 ; 1]."
    ),
    tags: ["terminale-spe", "tvi", "type_bac", "existence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit f(x) = x³ + x - 1. On admet que f est strictement croissante sur R et que f(0) = -1, f(1) = 1. Combien l’équation f(x) = 0 admet-elle de solution sur [0 ; 1] ?",
    format: "qcm",
    choices: ["aucune", "une seule", "au moins deux", "une infinité"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "TVI pour l’existence, stricte croissance pour l’unicité.",
    explanation: exp(
      "Le TVI permet de prouver l’existence et la stricte monotonie permet de prouver l’unicité.",
      "On combine les deux informations.",
      "f(0) = -1 et f(1) = 1, donc le TVI donne au moins une solution. Comme f est strictement croissante, elle ne peut pas prendre deux fois la valeur 0.",
      "L’équation admet une unique solution sur [0 ; 1]."
    ),
    tags: ["terminale-spe", "tvi", "unicite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_tvi_defi_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la méthode complète pour montrer qu’une équation f(x) = 0 admet une unique solution sur un intervalle [a ; b].",
    format: "open",
    expected: ["continue", "TVI", "existence", "strictement monotone", "unicité"],
    comparator: "contains_keyword",
    hint: "Il faut prouver l’existence puis l’unicité.",
    explanation: exp(
      "Pour prouver une unique solution, il faut prouver l’existence et l’unicité.",
      "On utilise souvent le TVI pour l’existence et la stricte monotonie pour l’unicité.",
      "On montre que f est continue sur [a ; b], que 0 est entre f(a) et f(b), puis que f est strictement monotone.",
      "On conclut que l’équation f(x) = 0 admet une unique solution sur [a ; b]."
    ),
    tags: ["terminale-spe", "tvi", "methode", "type_bac", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_tvi_defi_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "continuite_tvi",
    microId: "tvi_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde si 0 est compris entre les deux valeurs.",
    tags: ["terminale-spe", "tvi", "type_bac", "template"],
    generate: () => {
      const a = randomInt(-8, -1);
      const b = randomInt(1, 8);

      return {
        text: `Soit f continue sur [0 ; 1], avec f(0) = ${a} et f(1) = ${b}. Peut-on affirmer qu’il existe une solution à f(x) = 0 sur [0 ; 1] ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le TVI permet de prouver l’existence d’une solution lorsque 0 est compris entre deux images d’une fonction continue.",
          "On vérifie la continuité et l’encadrement de 0.",
          `La fonction est continue sur [0 ; 1], f(0) = ${a}, f(1) = ${b}, et 0 est compris entre ${a} et ${b}.`,
          "Il existe donc au moins une solution à f(x) = 0 sur [0 ; 1]."
        ),
      };
    },
  },

  /* ========================= HARMONISATION → 10 / microSkill ========================= */

  // --- continuite_reconnaitre ---
  {
    kind: "fixed", id: "terminale_spe_continuite_reconnaitre_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "continuite_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Intuitivement, une fonction est continue sur un intervalle si :",
    format: "qcm", choices: ["on peut tracer sa courbe sans lever le crayon", "elle est croissante", "elle est positive", "elle admet une asymptote"], expected: ["on peut tracer sa courbe sans lever le crayon"], comparator: "mcq_exact",
    hint: "Pas de « saut ».",
    explanation: exp("La continuité signifie l'absence de rupture.", "On observe la courbe.", "On peut la tracer sans lever le crayon.", "Tracer sans lever le crayon."),
    tags: ["terminale-spe", "continuite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_continuite_reconnaitre_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "continuite_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Les fonctions polynômes sont continues :",
    format: "qcm", choices: ["sur ℝ", "nulle part", "seulement en 0", "seulement sur [0 ; 1]"], expected: ["sur ℝ"], comparator: "mcq_exact",
    hint: "Propriété de cours.",
    explanation: exp("Les polynômes sont continus partout.", "On utilise le résultat du cours.", "Un polynôme est continu sur ℝ.", "Sur ℝ."),
    tags: ["terminale-spe", "continuite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_continuite_reconnaitre_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "continuite_reconnaitre", difficulty: 3, theme: "neutral",
    text: "Les fonctions exponentielle et logarithme sont :",
    format: "qcm", choices: ["continues sur leur ensemble de définition", "discontinues", "constantes", "non dérivables"], expected: ["continues sur leur ensemble de définition"], comparator: "mcq_exact",
    hint: "Fonctions usuelles.",
    explanation: exp("Les fonctions usuelles sont continues sur leur domaine.", "exp sur ℝ, ln sur ]0 ; +∞[.", "Elles sont continues.", "Continues sur leur ensemble de définition."),
    tags: ["terminale-spe", "continuite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_continuite_reconnaitre_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "continuite_reconnaitre", difficulty: 3, theme: "neutral",
    text: "Une fonction présentant un « saut » dans sa courbe est :",
    format: "qcm", choices: ["discontinue à cet endroit", "continue", "dérivable", "croissante"], expected: ["discontinue à cet endroit"], comparator: "mcq_exact",
    hint: "Un saut = rupture.",
    explanation: exp("Un saut traduit une rupture de continuité.", "On lève le crayon au niveau du saut.", "La fonction y est discontinue.", "Discontinue à cet endroit."),
    tags: ["terminale-spe", "continuite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_continuite_reconnaitre_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "continuite_reconnaitre", difficulty: 4, theme: "neutral",
    text: "Toute fonction dérivable sur un intervalle y est :",
    format: "qcm", choices: ["continue", "discontinue", "constante", "croissante"], expected: ["continue"], comparator: "mcq_exact",
    hint: "Dérivable ⟹ continue.",
    explanation: exp("Il existe un lien entre dérivabilité et continuité.", "La dérivabilité est plus forte que la continuité.", "Dérivable sur I ⟹ continue sur I.", "Elle est continue."),
    tags: ["terminale-spe", "continuite", "reconnaitre", "qcm"],
  },

  // --- tvi_appliquer ---
  {
    kind: "fixed", id: "terminale_spe_tvi_appliquer_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_appliquer", difficulty: 2, theme: "neutral",
    text: "Pour appliquer le théorème des valeurs intermédiaires, la fonction doit être :",
    format: "qcm", choices: ["continue sur l'intervalle", "croissante", "positive", "dérivable deux fois"], expected: ["continue sur l'intervalle"], comparator: "mcq_exact",
    hint: "Hypothèse essentielle du TVI.",
    explanation: exp("Le TVI exige une hypothèse de continuité.", "f doit être continue sur [a ; b].", "C'est l'hypothèse clé.", "Continue sur l'intervalle."),
    tags: ["terminale-spe", "tvi", "appliquer", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_appliquer_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_appliquer", difficulty: 3, theme: "neutral",
    text: "Soit f continue sur [0 ; 1] avec f(0) = -2 et f(1) = 3. L'équation f(x) = 0 :",
    format: "qcm", choices: ["admet au moins une solution sur [0 ; 1]", "n'a pas de solution", "a exactement deux solutions", "est impossible"], expected: ["admet au moins une solution sur [0 ; 1]"], comparator: "mcq_exact",
    hint: "0 est entre -2 et 3.",
    explanation: exp("Le TVI assure l'existence d'une solution si 0 est encadré.", "f continue, et 0 ∈ [-2 ; 3].", "Donc il existe c avec f(c) = 0.", "Au moins une solution sur [0 ; 1]."),
    tags: ["terminale-spe", "tvi", "appliquer", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_appliquer_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_appliquer", difficulty: 3, theme: "neutral",
    text: "Soit f continue sur [1 ; 4] avec f(1) = 5 et f(4) = 9. L'équation f(x) = 0 :",
    format: "qcm", choices: ["ne peut pas être garantie par le TVI", "admet une solution", "admet deux solutions", "est toujours vraie"], expected: ["ne peut pas être garantie par le TVI"], comparator: "mcq_exact",
    hint: "0 est-il entre 5 et 9 ?",
    explanation: exp("Le TVI garantit une solution si la valeur visée est encadrée.", "Ici 0 n'est pas entre 5 et 9.", "Le TVI ne permet pas de conclure à l'existence.", "Non garantie par le TVI."),
    tags: ["terminale-spe", "tvi", "appliquer", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_appliquer_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_appliquer", difficulty: 4, theme: "neutral",
    text: "Le TVI permet de démontrer :",
    format: "qcm", choices: ["l'existence d'une solution", "l'unicité d'une solution", "la valeur exacte de la solution", "la dérivée"], expected: ["l'existence d'une solution"], comparator: "mcq_exact",
    hint: "Existence, pas unicité.",
    explanation: exp("Le TVI est un théorème d'existence.", "Il garantit qu'une solution existe.", "L'unicité demande la monotonie en plus.", "L'existence d'une solution."),
    tags: ["terminale-spe", "tvi", "appliquer", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_appliquer_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_appliquer", difficulty: 4, theme: "neutral",
    text: "Soit f continue sur [0 ; 2] avec f(0) = 1 et f(2) = -4. Combien de solutions au moins le TVI garantit-il pour f(x) = 0 ?",
    format: "short", expected: ["1"], comparator: "number_equal",
    hint: "0 est entre 1 et -4.",
    explanation: exp("Le TVI garantit AU MOINS une solution.", "f continue, 0 entre -4 et 1.", "Il existe au moins une solution.", "Au moins 1 solution."),
    tags: ["terminale-spe", "tvi", "appliquer", "short"],
  },

  // --- tvi_unicite ---
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 3, theme: "neutral",
    text: "Pour garantir l'UNICITÉ de la solution, on ajoute l'hypothèse que f est :",
    format: "qcm", choices: ["strictement monotone", "positive", "paire", "bornée"], expected: ["strictement monotone"], comparator: "mcq_exact",
    hint: "Strictement croissante ou décroissante.",
    explanation: exp("L'unicité vient de la stricte monotonie.", "Si f est strictement monotone, elle ne repasse pas par la même valeur.", "Donc une seule solution.", "Strictement monotone."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 4, theme: "neutral",
    text: "Le « corollaire du TVI » (théorème de la bijection) s'applique à une fonction continue et :",
    format: "qcm", choices: ["strictement monotone", "constante", "discontinue", "non dérivable"], expected: ["strictement monotone"], comparator: "mcq_exact",
    hint: "Monotonie stricte = bijection.",
    explanation: exp("Le corollaire ajoute la stricte monotonie.", "Continue + strictement monotone ⟹ bijection.", "L'équation f(x) = k a une unique solution.", "Strictement monotone."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 4, theme: "neutral",
    text: "Comment justifie-t-on en pratique la stricte monotonie de f ?",
    format: "qcm", choices: ["par le signe de f'", "par le signe de f", "par une limite", "par une primitive"], expected: ["par le signe de f'"], comparator: "mcq_exact",
    hint: "f' garde un signe constant.",
    explanation: exp("La monotonie se lit sur la dérivée.", "Si f' > 0 (ou f' < 0) sur l'intervalle, f est strictement monotone.", "On étudie donc le signe de f'.", "Par le signe de f'."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 5, theme: "neutral",
    text: "f est continue et strictement croissante sur [0 ; 5], f(0) = -1, f(5) = 4. L'équation f(x) = 0 admet :",
    format: "qcm", choices: ["une unique solution", "deux solutions", "aucune solution", "une infinité de solutions"], expected: ["une unique solution"], comparator: "mcq_exact",
    hint: "Continue + strictement monotone + 0 encadré.",
    explanation: exp("On applique le corollaire du TVI.", "f continue, strictement croissante, et 0 ∈ [-1 ; 4].", "Existence (TVI) + unicité (stricte monotonie).", "Une unique solution."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 4, theme: "neutral",
    text: "Si f est continue mais PAS strictement monotone, l'équation f(x) = k peut avoir :",
    format: "qcm", choices: ["plusieurs solutions", "exactement une solution", "aucune jamais", "une infinité forcément"], expected: ["plusieurs solutions"], comparator: "mcq_exact",
    hint: "Sans monotonie, f peut repasser par k.",
    explanation: exp("Sans stricte monotonie, l'unicité n'est pas garantie.", "f peut atteindre k plusieurs fois.", "Il peut donc y avoir plusieurs solutions.", "Plusieurs solutions possibles."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_unicite_h6", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_unicite", difficulty: 5, theme: "neutral",
    text: "Les deux ingrédients pour prouver « unique solution » sont :",
    format: "qcm", choices: ["continuité + stricte monotonie", "positivité + convexité", "limite + dérivée seconde", "parité + périodicité"], expected: ["continuité + stricte monotonie"], comparator: "mcq_exact",
    hint: "Existence (TVI) puis unicité (monotonie).",
    explanation: exp("On combine deux propriétés.", "La continuité donne l'existence (TVI).", "La stricte monotonie donne l'unicité.", "Continuité + stricte monotonie."),
    tags: ["terminale-spe", "tvi", "unicite", "qcm"],
  },

  // --- tvi_rediger ---
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 3, theme: "neutral",
    text: "Dans une rédaction au bac, quel élément doit-on TOUJOURS citer pour appliquer le TVI ?",
    format: "qcm", choices: ["la continuité de f", "la limite de f", "la primitive de f", "le nombre dérivé"], expected: ["la continuité de f"], comparator: "mcq_exact",
    hint: "C'est l'hypothèse de base.",
    explanation: exp("Une rédaction conforme cite les hypothèses.", "La continuité est indispensable au TVI.", "On doit l'énoncer explicitement.", "La continuité de f."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 3, theme: "neutral",
    text: "Pour prouver l'unicité, la rédaction doit mentionner que f est :",
    format: "qcm", choices: ["strictement monotone", "continue seulement", "positive", "bornée"], expected: ["strictement monotone"], comparator: "mcq_exact",
    hint: "Sinon, on prouve seulement l'existence.",
    explanation: exp("La rédaction de l'unicité repose sur la monotonie.", "On précise « strictement monotone (croissante ou décroissante) ».", "C'est ce qui garantit l'unicité.", "Strictement monotone."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 4, theme: "neutral",
    text: "Pour justifier que 0 est atteint, on doit montrer que 0 est :",
    format: "qcm", choices: ["compris entre f(a) et f(b)", "supérieur à f(a)", "égal à f(a)", "la dérivée"], expected: ["compris entre f(a) et f(b)"], comparator: "mcq_exact",
    hint: "La valeur visée doit être encadrée.",
    explanation: exp("Le TVI exige que la valeur visée soit encadrée.", "On vérifie que 0 est entre f(a) et f(b).", "Souvent en montrant f(a) et f(b) de signes opposés.", "Compris entre f(a) et f(b)."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 4, theme: "neutral",
    text: "Quel est le bon ordre de rédaction pour « unique solution » ?",
    format: "qcm", choices: ["continuité, puis monotonie, puis encadrement de la valeur", "monotonie seulement", "encadrement seulement", "dérivée seconde puis limite"], expected: ["continuité, puis monotonie, puis encadrement de la valeur"], comparator: "mcq_exact",
    hint: "On cite toutes les hypothèses.",
    explanation: exp("Une rédaction complète enchaîne les hypothèses.", "Continuité (TVI), stricte monotonie (unicité), valeur encadrée.", "Puis on conclut.", "Continuité, monotonie, encadrement."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 5, theme: "neutral",
    text: "« f(a) et f(b) sont de signes contraires » sert à justifier que :",
    format: "qcm", choices: ["0 est compris entre f(a) et f(b)", "f est continue", "f est monotone", "f est dérivable"], expected: ["0 est compris entre f(a) et f(b)"], comparator: "mcq_exact",
    hint: "Signes opposés ⟹ 0 entre les deux.",
    explanation: exp("Des signes contraires encadrent 0.", "Si f(a) < 0 < f(b) (ou l'inverse), 0 est entre les deux.", "C'est ce qui permet d'appliquer le TVI pour f(x) = 0.", "0 est compris entre f(a) et f(b)."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h6", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 4, theme: "neutral",
    text: "Citer « f est un polynôme » dans une rédaction TVI sert à justifier :",
    format: "qcm", choices: ["la continuité", "l'unicité", "l'encadrement", "la limite"], expected: ["la continuité"], comparator: "mcq_exact",
    hint: "Les polynômes sont continus sur ℝ.",
    explanation: exp("On justifie une hypothèse par un argument standard.", "Un polynôme est continu sur ℝ.", "Cela valide l'hypothèse de continuité du TVI.", "La continuité."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_rediger_h7", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_rediger", difficulty: 5, theme: "neutral",
    text: "Pour donner une valeur approchée de la solution, on utilise ensuite :",
    format: "qcm", choices: ["un balayage / dichotomie à la calculatrice", "une primitive", "une dérivée seconde", "le triangle de Pascal"], expected: ["un balayage / dichotomie à la calculatrice"], comparator: "mcq_exact",
    hint: "Méthode numérique d'approximation.",
    explanation: exp("Le TVI donne l'existence, pas la valeur exacte.", "On approche la solution numériquement.", "Par balayage ou dichotomie (calculatrice).", "Un balayage / dichotomie."),
    tags: ["terminale-spe", "tvi", "rediger", "qcm"],
  },

  // --- tvi_defi ---
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 4, theme: "neutral",
    text: "Soit f(x) = x³ + x - 1, continue et strictement croissante sur ℝ, f(0) = -1, f(1) = 1. Combien de solutions à f(x) = 0 ?",
    format: "short", expected: ["1"], comparator: "number_equal",
    hint: "Continue + strictement croissante + 0 encadré.",
    explanation: exp("On applique le corollaire du TVI.", "f continue, strictement croissante, 0 ∈ [-1 ; 1].", "Existence + unicité.", "Une unique solution."),
    tags: ["terminale-spe", "tvi", "type_bac", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 5, theme: "neutral",
    text: "Pour f(x) = x³ + x - 1, pourquoi f est-elle strictement croissante sur ℝ ?",
    format: "qcm", choices: ["car f'(x) = 3x² + 1 > 0", "car f(0) < 0", "car f est un polynôme", "car f(1) = 1"], expected: ["car f'(x) = 3x² + 1 > 0"], comparator: "mcq_exact",
    hint: "Étudie le signe de f'.",
    explanation: exp("La stricte croissance se prouve par le signe de f'.", "f'(x) = 3x² + 1.", "3x² + 1 > 0 pour tout x.", "f est strictement croissante car f' > 0."),
    tags: ["terminale-spe", "tvi", "type_bac", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 4, theme: "neutral",
    text: "Soit f continue sur [0 ; 1], f(0) = -3, f(1) = 2. Le TVI garantit l'existence d'une solution à :",
    format: "qcm", choices: ["f(x) = 0", "f(x) = 5", "f(x) = -10", "f(x) = 3"], expected: ["f(x) = 0"], comparator: "mcq_exact",
    hint: "Quelle valeur est entre -3 et 2 ?",
    explanation: exp("Le TVI s'applique pour toute valeur encadrée.", "0 est entre -3 et 2 ; 5, -10, 3 ne le sont pas.", "Donc f(x) = 0 a une solution.", "f(x) = 0."),
    tags: ["terminale-spe", "tvi", "type_bac", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 5, theme: "neutral",
    text: "f continue, strictement décroissante sur [2 ; 7], f(2) = 4, f(7) = -1. L'équation f(x) = 0 admet :",
    format: "qcm", choices: ["une unique solution", "aucune solution", "deux solutions", "une infinité"], expected: ["une unique solution"], comparator: "mcq_exact",
    hint: "Décroissante stricte + 0 encadré.",
    explanation: exp("On applique le corollaire du TVI (bijection).", "f continue, strictement décroissante, 0 ∈ [-1 ; 4].", "Existence + unicité.", "Une unique solution."),
    tags: ["terminale-spe", "tvi", "type_bac", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 4, theme: "neutral",
    text: "Le TVI s'appuie sur une propriété fondamentale de f. Laquelle ?",
    format: "qcm", choices: ["la continuité", "la convexité", "la périodicité", "la parité"], expected: ["la continuité"], comparator: "mcq_exact",
    hint: "Sans elle, pas de TVI.",
    explanation: exp("Le TVI repose sur une hypothèse centrale.", "Sans continuité, la courbe peut « sauter » par-dessus la valeur.", "La continuité est indispensable.", "La continuité."),
    tags: ["terminale-spe", "tvi", "type_bac", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_tvi_defi_h6", niveau: "terminale-spe", matiere: "maths",
    notionId: "continuite_tvi", microId: "tvi_defi", difficulty: 5, theme: "neutral",
    text: "f(x) = e^x - 3 est continue et strictement croissante. Sachant f(0) = -2 < 0 et f(2) ≈ 4,4 > 0, l'équation f(x) = 0 :",
    format: "qcm", choices: ["admet une unique solution", "n'a pas de solution", "admet deux solutions", "est impossible"], expected: ["admet une unique solution"], comparator: "mcq_exact",
    hint: "Continue + strictement croissante + 0 encadré.",
    explanation: exp("On applique le corollaire du TVI.", "f continue, strictement croissante (car (e^x)' = e^x > 0), 0 encadré.", "Existence + unicité.", "Une unique solution (ici x = ln 3)."),
    tags: ["terminale-spe", "tvi", "type_bac", "exponentielle", "qcm"],
  },
];