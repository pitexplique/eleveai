import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function percentToDecimalString(p: number) {
  return formatComma((p / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
}

function expl(calcul: string) {
  return (
    "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
    "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

/** Le plus petit total N tel que p % de N tombe juste (p × N divisible par 100). */
function pasEntier(p: number) {
  return 100 / pgcd(p, 100);
}

/** La bonne réponse et jusqu'à trois leurres, sans doublon ni leurre égal à la réponse. */
function choixQcm(bonne: string, leurres: readonly string[]) {
  const d = shuffle(Array.from(new Set(leurres)).filter((l) => l !== bonne)).slice(0, 3);
  return shuffle([bonne, ...d]);
}

/** Le chemin de calcul mental quand il existe (10 %, 50 %, 25 %…), sinon × p ÷ 100. */
function methodePourcentage(p: number, n: number) {
  const r = (p * n) / 100;
  if (p === 10) return `10 % de ${n}, c’est le dixième : ${n} ÷ 10 = ${r}.`;
  if (p === 50) return `50 % de ${n}, c’est la moitié : ${n} ÷ 2 = ${r}.`;
  if (p === 25) return `25 % de ${n}, c’est le quart : ${n} ÷ 4 = ${r}.`;
  if (p === 75) return `75 % de ${n}, ce sont trois quarts : ${n} ÷ 4 = ${n / 4}, puis ${n / 4} × 3 = ${r}.`;
  if (p % 10 === 0 && n % 10 === 0) return `10 % de ${n}, c’est ${n / 10} ; ${p} %, c’est ${p / 10} fois plus : ${n / 10} × ${p / 10} = ${r}.`;
  return `${p} % de ${n} = ${n} × ${p} ÷ 100 = ${r}.`;
}

export const pourcentagesBank: TutorBankItemV4[] = [
  // =========================
  // POURCENTAGE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 25 % ?",
    format: "short",
    expected: ["25 sur 100", "25/100", "25 / 100"],
    comparator: "contains_keyword",
    hint: "Le symbole % veut dire “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25 sur 100. Un pourcentage représente toujours une part sur 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 50 % ?",
    format: "short",
    expected: ["50 sur 100", "50/100", "50 / 100", "la moitié", "moitié"],
    comparator: "contains_keyword",
    hint: "50 %, c’est 50 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50 sur 100. Comme 50/100 = 1/2, cela représente aussi la moitié.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 10 % ?",
    format: "short",
    expected: ["10 sur 100", "10/100", "10 / 100"],
    comparator: "contains_keyword",
    hint: "Un pourcentage se lit toujours “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100. Cela veut dire que l’on prend 10 parts parmi 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le symbole % veut dire…",
    format: "qcm",
    choices: ["sur 10", "sur 100", "sur 1000", "fois 100"],
    expected: ["sur 100"],
    comparator: "mcq_exact",
    hint: "Un pourcentage exprime une part sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Le symbole % signifie “sur 100”. Un pourcentage exprime donc une part sur 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "75 % signifie…",
    format: "qcm",
    choices: ["75 sur 10", "75 sur 100", "7,5 sur 100", "100 sur 75"],
    expected: ["75 sur 100"],
    comparator: "mcq_exact",
    hint: "On lit toujours un pourcentage “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75 sur 100. C’est la définition même d’un pourcentage.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Dans une classe de 100 élèves imaginaires à La Réunion, 30 % aiment le football. Combien cela représente-t-il d’élèves ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "30 %, c’est 30 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("30 % signifie 30 sur 100. Dans une classe de 100 élèves, cela représente donc 30 élèves.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "reunion"],
  },

  // =========================
  // POURCENTAGE_FRACTION
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris 25 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["25/100", "25 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25 sur 100. On l’écrit donc 25/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris 50 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["50/100", "50 / 100", "1/2", "1 / 2"],
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50 sur 100, donc 50/100. Cette fraction se simplifie aussi en 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 10 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["10/100", "10 / 100", "1/10", "1 / 10"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100. On peut écrire 10/100, ce qui correspond aussi à 1/10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 75 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["75/100", "75 / 100", "3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "75 % = 75 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75 sur 100. On peut écrire 75/100, ce qui correspond aussi à 3/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction sur 100 correspond à 40 % ?",
    format: "qcm",
    choices: ["4/100", "40/100", "40/10", "1/40"],
    expected: ["40/100"],
    comparator: "mcq_exact",
    hint: "40 % = 40 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("40 % signifie 40 sur 100. La bonne fraction est donc 40/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à 5 % ?",
    format: "qcm",
    choices: ["5/100", "5/10", "50/100", "1/5"],
    expected: ["5/100"],
    comparator: "mcq_exact",
    hint: "5 % = 5 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5 sur 100. La bonne écriture est donc 5/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction", "qcm"],
  },

  // =========================
  // POURCENTAGE_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 50 % sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5", "50/100", "50 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50/100 = 0,5.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50/100. En écriture décimale, cela donne 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 25 % sous forme décimale.",
    format: "short",
    expected: ["0,25", "0.25", "25/100", "25 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25/100 = 0,25.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25/100. En écriture décimale, cela donne 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 10 % sous forme décimale.",
    format: "short",
    expected: ["0,1", "0.1", "10/100", "10 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10/100 = 0,1.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10/100. En écriture décimale, cela donne 0,1.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 5 % sous forme décimale.",
    format: "short",
    expected: ["0,05", "0.05", "5/100", "5 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "5 % = 5/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5/100. En écriture décimale, cela donne 0,05.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 75 % ?",
    format: "qcm",
    choices: ["0,75", "7,5", "0,075", "75,0"],
    expected: ["0,75"],
    comparator: "mcq_exact",
    hint: "75 % = 75/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75/100. En écriture décimale, cela donne 0,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 5 % ?",
    format: "qcm",
    choices: ["0,5", "0,05", "5,0", "0,005"],
    expected: ["0,05"],
    comparator: "mcq_exact",
    hint: "5 % = 5/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5/100. En écriture décimale, cela donne 0,05.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal", "qcm"],
  },

  // =========================
  // POURCENTAGE_LIRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 100 élèves, 20 % portent des lunettes. Combien d’élèves cela représente-t-il ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "20 % signifie 20 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Dans un groupe de 100 élèves, 20 % signifie 20 sur 100. Cela représente donc 20 élèves.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 100 bonbons, 60 % sont rouges. Combien y a-t-il de bonbons rouges ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "60 % = 60 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Sur 100 bonbons, 60 % signifie 60 sur 100. Il y a donc 60 bonbons rouges.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 100 personnes, 8 % aiment les échecs. Combien cela représente-t-il ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le pourcentage donne directement le nombre sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("8 % signifie 8 sur 100. Dans un groupe de 100 personnes, cela représente 8 personnes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 100 personnes, 15 % aiment le théâtre. Combien cela fait-il ?",
    format: "qcm",
    choices: ["5", "10", "15", "25"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "15 % = 15 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("15 % signifie 15 sur 100. Dans un groupe de 100 personnes, cela fait donc 15 personnes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 ananas, 35 % sont déjà vendus. Combien d’ananas sont vendus ?",
    format: "qcm",
    choices: ["25", "30", "35", "65"],
    expected: ["35"],
    comparator: "mcq_exact",
    hint: "35 % signifie 35 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("35 % signifie 35 sur 100. Sur 100 ananas, cela représente donc 35 ananas vendus.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_CALCUL_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 10 % de 60.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "10 % = 0,1.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % de 60, c’est 0,1 × 60 = 6. On peut aussi dire que 10 % est le dixième de 60.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 50 % de 18.",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "50 %, c’est la moitié.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie la moitié. La moitié de 18 est 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 25 % de 20.",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "25 %, c’est un quart.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % correspond à un quart. Le quart de 20 est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 10 % de 40.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "10 % = 1/10.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie un dixième. Le dixième de 40 est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est 10 % de 40 ?",
    format: "qcm",
    choices: ["4", "10", "14", "40"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "10 % = 1/10.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % de 40, c’est le dixième de 40. Le résultat est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un groupe de 20 randonneurs compte 50 % d’adultes. Combien y a-t-il d’adultes ?",
    format: "qcm",
    choices: ["5", "10", "15", "20"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie la moitié. La moitié de 20 est 10. Il y a donc 10 adultes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y a-t-il de cartes brillantes ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "8 % = 8 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("8 % signifie 8 sur 100. Dans une collection de 100 cartes, cela représente 8 cartes brillantes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Le prix d’un article est 20 €. On calcule 5 % de 20 €. Combien vaut ce pourcentage ?",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    comparator: "number_equal",
    hint: "5 % = 5/100 de 20.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % de 20 €, c’est 0,05 × 20 = 1. Ce pourcentage vaut donc 1 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 100 élèves, 25 % font du basket et 50 % font du football. Quel sport est le plus pratiqué ?",
    format: "short",
    expected: ["football"],
    comparator: "contains_keyword",
    hint: "Compare 25 % et 50 %.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % représente 25 élèves sur 100 et 50 % représente 50 élèves sur 100. Comme 50 est plus grand que 25, le football est le plus pratiqué.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 letchis, 40 % sont mûrs. Combien de letchis sont mûrs ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "40 % = 40 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("40 % signifie 40 sur 100. Sur 100 letchis, cela représente donc 40 letchis mûrs.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel pourcentage représente exactement la moitié d’un groupe ?",
    format: "short",
    expected: ["50", "50%"],
    comparator: "contains_keyword",
    hint: "La moitié, c’est 1 sur 2.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("La moitié correspond à 1/2. Or 1/2 = 50/100, donc cela représente 50 %.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 25 % correspond à 1/4.",
    format: "short",
    expected: ["25/100", "1/4", "100", "4"],
    comparator: "contains_keyword",
    hint: "Commence par écrire 25 % sous forme de fraction.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25/100. Si on simplifie cette fraction en divisant par 25, on obtient 1/4. Donc 25 % correspond à 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "raisonnement"],
  },

  // =========================
  // TEMPLATES - COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un pourcentage signifie toujours “sur 100”.",
    tags: ["pourcentage_nombre", "comprendre", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 30, 40, 50, 75][
        Math.floor(Math.random() * 8)
      ];

      return {
        text: `Que signifie ${p} % ?`,
        format: "short",
        expected: [`${p}/100`, `${p} / 100`, `${p} sur 100`],
        comparator: "contains_keyword",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_comprendre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole % signifie “sur 100”.",
    tags: ["pourcentage_nombre", "comprendre", "qcm", "template"],
    generate: () => {
      const p = [5, 15, 20, 35, 40, 60][Math.floor(Math.random() * 6)];
      const good = `${p} sur 100`;

      return {
        text: `${p} % signifie…`,
        format: "qcm",
        choices: shuffle([
          good,
          `${p} sur 10`,
          `${p * 10} sur 100`,
          `100 sur ${p}`,
        ]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - FRACTION
  // =========================
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Écris le pourcentage sur 100.",
    tags: ["pourcentage_nombre", "fraction", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 40, 50, 75][Math.floor(Math.random() * 7)];

      return {
        text: `Écris ${p} % sous forme de fraction sur 100.`,
        format: "short",
        expected: [`${p}/100`, `${p} / 100`],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100. On l’écrit donc ${p}/100.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur est le pourcentage, le dénominateur vaut 100.",
    tags: ["pourcentage_nombre", "fraction", "qcm", "template"],
    generate: () => {
      const p = [5, 10, 15, 20, 25, 40][Math.floor(Math.random() * 6)];
      const good = `${p}/100`;

      return {
        text: `Quelle fraction correspond à ${p} % ?`,
        format: "qcm",
        choices: shuffle([
          good,
          `${p}/10`,
          `1/${p}`,
          `${100}/${p}`,
        ]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100. La bonne fraction est donc ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL
  // =========================
  {
    kind: "template",
    id: "pourcentage_decimal_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pourcentage s’écrit en décimal en divisant par 100.",
    tags: ["pourcentage_nombre", "decimal", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 40, 50, 75][Math.floor(Math.random() * 7)];
      const dec = p / 100;

      return {
        text: `Écris ${p} % sous forme décimale.`,
        format: "short",
        expected: [formatComma(dec), String(dec), `${p}/100`, `${p} / 100`],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p}/100. En écriture décimale, cela donne ${formatComma(dec)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_decimal_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par 100.",
    tags: ["pourcentage_nombre", "decimal", "qcm", "template"],
    generate: () => {
      const p = [5, 10, 25, 50, 75][Math.floor(Math.random() * 5)];
      const good = percentToDecimalString(p);

      const distractors = shuffle(
        Array.from(
          new Set([
            formatComma(p / 10),
            formatComma(p),
            formatComma(p / 1000),
          ])
        ).filter((x) => x !== good)
      ).slice(0, 3);

      return {
        text: `Quelle écriture décimale correspond à ${p} % ?`,
        format: "qcm",
        choices: shuffle([good, ...distractors]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p}/100. En écriture décimale, cela donne ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage indique combien sur 100.",
    tags: ["pourcentage_nombre", "lecture", "template"],
    generate: () => {
      const p = [5, 10, 15, 20, 25, 30, 40, 50][
        Math.floor(Math.random() * 8)
      ];

      return {
        text: `Dans un groupe de 100 élèves, ${p} % aiment chanter. Combien cela représente-t-il ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100. Dans un groupe de 100 élèves, cela représente ${p} élèves.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage donne directement le nombre sur 100.",
    tags: ["pourcentage_nombre", "lecture", "qcm", "template"],
    generate: () => {
      const p = [8, 12, 18, 24, 35, 45][Math.floor(Math.random() * 6)];

      return {
        text: `Sur 100 objets, ${p} % sont bleus. Combien d’objets sont bleus ?`,
        format: "qcm",
        choices: shuffle([
          String(p),
          String(p + 5),
          String(Math.max(0, p - 5)),
          "100",
        ]),
        expected: [String(p)],
        comparator: "mcq_exact",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p} sur 100. Il y a donc ${p} objets bleus.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - CALCUL SIMPLE
  // =========================
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "10 % = 1/10 ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentage_nombre", "calcul", "template"],
    generate: () => {
      const cases = [
        { p: 10, n: 20, r: 2 },
        { p: 10, n: 40, r: 4 },
        { p: 10, n: 60, r: 6 },
        { p: 50, n: 18, r: 9 },
        { p: 50, n: 24, r: 12 },
        { p: 25, n: 20, r: 5 },
        { p: 25, n: 40, r: 10 },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      let explanation = "";
      if (c.p === 10) {
        explanation = `10 % correspond à un dixième. Le dixième de ${c.n} est ${c.r}.`;
      } else if (c.p === 50) {
        explanation = `50 % correspond à la moitié. La moitié de ${c.n} est ${c.r}.`;
      } else {
        explanation = `25 % correspond à un quart. Le quart de ${c.n} est ${c.r}.`;
      }

      return {
        text: `Calcule ${c.p} % de ${c.n}.`,
        format: "short",
        expected: [String(c.r)],
        comparator: "number_equal",
        explanation,
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_calcul_simple_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis une méthode simple : moitié, quart, dixième.",
    tags: ["pourcentage_nombre", "calcul", "qcm", "template"],
    generate: () => {
      const cases = [
        { p: 10, n: 70, r: 7 },
        { p: 50, n: 26, r: 13 },
        { p: 25, n: 12, r: 3 },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      let explanation = "";
      if (c.p === 10) {
        explanation = `10 % correspond à un dixième. Le dixième de ${c.n} est ${c.r}.`;
      } else if (c.p === 50) {
        explanation = `50 % correspond à la moitié. La moitié de ${c.n} est ${c.r}.`;
      } else {
        explanation = `25 % correspond à un quart. Le quart de ${c.n} est ${c.r}.`;
      }

      return {
        text: `Quel est ${c.p} % de ${c.n} ?`,
        format: "qcm",
        choices: shuffle([
          String(c.r),
          String(c.r + 1),
          String(c.n),
          String(Math.max(1, c.r - 1)),
        ]),
        expected: [String(c.r)],
        comparator: "mcq_exact",
        explanation,
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "pourcentage_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense à “sur 100” ou à une fraction simple.",
    tags: ["pourcentage_nombre", "defi", "template"],
    generate: () => {
      const cases = [
        {
          text: "Quel pourcentage correspond à une moitié ?",
          expected: ["50", "50%"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("Une moitié correspond à 1/2, soit 50/100. Cela représente donc 50 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          text: "Quel pourcentage correspond à un quart ?",
          expected: ["25", "25%"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("Un quart correspond à 1/4, soit 25/100. Cela représente donc 25 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          text: "Quel pourcentage correspond à un dixième ?",
          expected: ["10", "10%"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("Un dixième correspond à 1/10, soit 10/100. Cela représente donc 10 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: c.text,
        format: "short",
        expected: c.expected,
        comparator: "contains_keyword",
        explanation: c.explanation,
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les pourcentages ou relie-les à des fractions.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template"],
    generate: () => {
      const cases = [
        {
          text: "Quel pourcentage représente exactement la moitié ?",
          good: "50 %",
          choices: ["25 %", "50 %", "75 %", "100 %"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("La moitié correspond à 1/2, soit 50/100. Cela représente donc 50 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          text: "Quel pourcentage représente exactement le quart ?",
          good: "25 %",
          choices: ["10 %", "20 %", "25 %", "40 %"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("Le quart correspond à 1/4, soit 25/100. Cela représente donc 25 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          text: "Quel pourcentage est le plus grand ?",
          good: "75 %",
          choices: ["25 %", "50 %", "75 %", "5 %"],
          explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
            "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
            "Calcul : " +
            ("Parmi 25 %, 50 %, 75 % et 5 %, le plus grand est 75 %.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: c.text,
        format: "qcm",
        choices: shuffle(c.choices),
        expected: [c.good],
        comparator: "mcq_exact",
        explanation: c.explanation,
      };
    },
  },

  // ===== TOP-UP — POURCENTAGE_LIRE =====
  { kind: "fixed", id: "pourcentage_lire_topup_1", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Dans une classe de 100 élèves, 40 % aiment le sport. Combien d’élèves cela représente-t-il ?", format: "short", expected: ["40"], comparator: "number_equal",
    hint: "40 % = 40 sur 100.", explanation: expl("Sur 100 élèves, 40 % signifie 40 sur 100. Cela représente donc 40 élèves."), tags: ["pourcentage_nombre", "lecture"] },
  { kind: "fixed", id: "pourcentage_lire_topup_2", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Un article affiche « −50 % ». Quelle fraction du prix est enlevée ?", format: "qcm", choices: ["la moitié", "le quart", "le tiers", "rien"], expected: ["la moitié"], comparator: "mcq_exact",
    hint: "50 % = 50 sur 100 = 1/2.", explanation: expl("50 % signifie 50 sur 100, soit 1/2 : on enlève la moitié du prix."), tags: ["pourcentage_nombre", "lecture", "qcm"] },
  { kind: "fixed", id: "pourcentage_lire_topup_3", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Sur 100 voitures, 25 % sont rouges. Combien de voitures sont rouges ?", format: "short", expected: ["25"], comparator: "number_equal",
    hint: "25 % = 25 sur 100.", explanation: expl("Sur 100 voitures, 25 % signifie 25 sur 100 : cela représente 25 voitures rouges."), tags: ["pourcentage_nombre", "lecture"] },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Un prof peut lancer 20 questions sur « Pourcentages » seul : le mode Défi
  // (difficultés 3 à 5) n'en offrait que 17 distinctes. Six générateurs, qui
  // paramètrent le total, le pourcentage ET la situation — le programme de 6e
  // en trois gestes : appliquer un pourcentage, exprimer une proportion en
  // pourcentage, et s'en servir dans un problème à deux étapes.
  // =========================
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_contexte",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "10 % = le dixième ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentage_nombre", "calcul", "template", "contexte"],
    generate: () => {
      const p = pick([10, 20, 25, 30, 40, 50, 75]);
      const n = pasEntier(p) * randomInt(Math.ceil(20 / pasEntier(p)), 30);
      const r = (p * n) / 100;
      const contexte = pick([
        `Dans un groupe de ${n} élèves, ${p} % sont demi-pensionnaires. Combien d’élèves sont demi-pensionnaires ?`,
        `Un sac contient ${n} billes ; ${p} % sont rouges. Combien de billes rouges y a-t-il ?`,
        `Un trajet en voiture fait ${n} km. On a déjà parcouru ${p} % du trajet. Combien de kilomètres a-t-on parcourus ?`,
        `Un club compte ${n} adhérents, dont ${p} % ont moins de 12 ans. Combien d’adhérents ont moins de 12 ans ?`,
        `Un réservoir de ${n} litres est rempli à ${p} %. Combien de litres contient-il ?`,
        `Sur ${n} graines semées, ${p} % ont germé. Combien de graines ont germé ?`,
        `Un livre a ${n} pages. Léa en a lu ${p} %. Combien de pages a-t-elle lues ?`,
      ]);
      return {
        text: contexte,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(methodePourcentage(p, n)),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_proportion",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris la part sous forme de fraction, puis cherche la fraction égale sur 100.",
    tags: ["pourcentage_nombre", "fraction", "proportion", "template"],
    generate: () => {
      const situations = [
        { totaux: [20, 25], f: (N: number, k: number) => `Dans une classe de ${N} élèves, ${k} portent des lunettes. Quel pourcentage des élèves portent des lunettes ?` },
        { totaux: [10, 20, 25, 50], f: (N: number, k: number) => `Sur ${N} tirs au but, une gardienne en arrête ${k}. Quel pourcentage des tirs a-t-elle arrêtés ?` },
        { totaux: [10, 20, 25, 50], f: (N: number, k: number) => `Un QCM compte ${N} questions ; Tom en réussit ${k}. Quel pourcentage de bonnes réponses obtient-il ?` },
        { totaux: [50, 200], f: (N: number, k: number) => `Sur ${N} personnes interrogées, ${k} préfèrent le vélo. Quel pourcentage des personnes interrogées cela représente-t-il ?` },
        { totaux: [4, 5, 10], f: (N: number, k: number) => `Une tarte est coupée en ${N} parts égales ; on en mange ${k}. Quel pourcentage de la tarte a-t-on mangé ?` },
      ];
      const s = pick(situations);
      const N = pick(s.totaux);
      // Pour N = 200, k doit être pair pour que le pourcentage soit entier.
      const k = N === 200 ? 2 * randomInt(1, 99) : randomInt(1, N - 1);
      const p = (100 * k) / N;
      const calcul =
        100 % N === 0
          ? `La part est ${k}/${N}. On multiplie en haut et en bas par ${100 / N} : ${k}/${N} = ${k * (100 / N)}/100, soit ${p} %.`
          : `La part est ${k}/${N}. On divise en haut et en bas par 2 : ${k}/${N} = ${k / 2}/100, soit ${p} %.`;
      return {
        text: s.f(N, k),
        format: "short",
        expected: [String(p), `${p} %`, `${p}%`],
        comparator: "number_equal",
        explanation: expl(calcul),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_fraction_vers_pourcentage",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la fraction égale dont le dénominateur est 100.",
    tags: ["pourcentage_nombre", "fraction", "qcm", "template"],
    generate: () => {
      const b = pick([2, 4, 5, 10, 20, 25, 50]);
      const candidats = Array.from({ length: b - 1 }, (_, i) => i + 1).filter((a) => pgcd(a, b) === 1);
      const a = pick(candidats);
      const p = (100 * a) / b;
      return {
        text: `Quel pourcentage correspond à la fraction ${a}/${b} ?`,
        format: "qcm",
        choices: choixQcm(`${p} %`, [`${a} %`, `${b} %`, `${100 - p} %`, `${a * 10} %`, ...(p % 10 === 0 ? [`${p / 10} %`] : [])]),
        expected: [`${p} %`],
        comparator: "mcq_exact",
        explanation: expl(`On cherche la fraction égale sur 100 : ${a}/${b} = ${a * (100 / b)}/100 (on a multiplié par ${100 / b}). Donc ${a}/${b} = ${p} %. Attention : ${a}/${b} n’est pas ${a} %.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_soldes",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la remise en euros, puis retire-la du prix.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template", "soldes"],
    generate: () => {
      const p = pick([10, 20, 25, 30, 40, 50]);
      const P = pasEntier(p) * randomInt(Math.ceil(12 / pasEntier(p)), Math.floor(240 / pasEntier(p)));
      const remise = (p * P) / 100;
      const nouveau = P - remise;
      const article = pick(["un jean", "une paire de baskets", "un sac à dos", "une trottinette", "un jeu vidéo", "un casque audio", "une lampe de bureau"]);
      return {
        text: `Pendant les soldes, ${article} à ${P} € est affiché « −${p} % ». Quel est son nouveau prix ?`,
        format: "qcm",
        choices: choixQcm(`${nouveau} €`, [`${remise} €`, ...(P - p > 0 ? [`${P - p} €`] : []), `${P + remise} €`]),
        expected: [`${nouveau} €`],
        comparator: "mcq_exact",
        explanation: expl(
          `La remise vaut ${p} % de ${P} € : ${methodePourcentage(p, P)} On retire la remise : ${P} − ${remise} = ${nouveau} €. ` +
            `Piège : on n’enlève pas ${p} €, et ${remise} € est la remise, pas le prix.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_tpl_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quel pourcentage reste-t-il pour le dernier groupe ? Le total fait 100 %.",
    tags: ["pourcentage_nombre", "defi", "template", "deux_etapes"],
    generate: () => {
      const N = pick([20, 40, 60, 80, 120, 140, 160, 200, 240, 300]);
      const p1 = 5 * randomInt(2, 12);
      const p2 = 5 * randomInt(1, Math.min(12, 18 - p1 / 5));
      const q = 100 - p1 - p2;
      const r = (q * N) / 100;
      const s = pick([
        `Dans un collège de ${N} élèves, ${p1} % viennent à pied et ${p2} % en bus. Les autres viennent en voiture. Combien d’élèves viennent en voiture ?`,
        `Un verger compte ${N} arbres : ${p1} % de pommiers, ${p2} % de poiriers et le reste de cerisiers. Combien y a-t-il de cerisiers ?`,
        `Parmi ${N} spectateurs, ${p1} % ont moins de 18 ans et ${p2} % ont plus de 60 ans. Combien de spectateurs ont entre 18 et 60 ans ?`,
        `On a interrogé ${N} personnes : ${p1} % ont répondu « oui », ${p2} % « non » et les autres sont sans avis. Combien de personnes sont sans avis ?`,
      ]);
      return {
        text: s,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `Le dernier groupe représente 100 − ${p1} − ${p2} = ${q} % du total. ${q} % de ${N} = ${N} × ${q} ÷ 100 = ${r}. ` +
            `(On peut aussi calculer les deux premiers groupes, ${(p1 * N) / 100} et ${(p2 * N) / 100}, puis les retirer de ${N}.)`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_comparer",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un grand pourcentage d’un petit nombre peut être plus petit qu’un petit pourcentage d’un grand nombre : calcule les deux.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template", "comparaison"],
    generate: () => {
      // Deux fois sur trois, on garde un tirage où le PLUS GRAND pourcentage
      // ne donne PAS le plus grand nombre (ou l'égalité) : c'est là qu'est le défi.
      const contreIntuitif = Math.random() < 2 / 3;
      let p1 = 0, p2 = 0, n1 = 0, n2 = 0, r1 = 0, r2 = 0;
      for (let essai = 0; essai < 100; essai++) {
        p1 = pick([10, 20, 25, 50, 75]);
        p2 = pick([10, 20, 25, 50, 75].filter((x) => x !== p1));
        n1 = 20 * randomInt(1, 15);
        n2 = 20 * randomInt(1, 15);
        r1 = (p1 * n1) / 100;
        r2 = (p2 * n2) / 100;
        const piege = r1 === r2 || (p1 > p2) !== (r1 > r2);
        if (piege === contreIntuitif) break;
      }
      const c1 = `${p1} % de ${n1}`;
      const c2 = `${p2} % de ${n2}`;
      const egaux = "ils sont égaux";
      const bonne = r1 === r2 ? egaux : r1 > r2 ? c1 : c2;
      return {
        text: `Quel nombre est le plus grand : ${c1} ou ${c2} ?`,
        format: "qcm",
        choices: shuffle([c1, c2, egaux]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `${methodePourcentage(p1, n1)} ${methodePourcentage(p2, n2)} ` +
            (r1 === r2 ? `Les deux valent ${r1} : ils sont égaux.` : `Donc ${bonne} est le plus grand (${Math.max(r1, r2)} contre ${Math.min(r1, r2)}).`) +
            " Le plus grand pourcentage ne donne pas forcément le plus grand nombre.",
        ),
      };
    },
  },
];