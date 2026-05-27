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
];