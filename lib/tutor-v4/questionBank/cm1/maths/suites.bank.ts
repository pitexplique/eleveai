// lib/tutor-v4/question-banks/maths/cm1/suites.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  suiteContinuerGabarits,
  suiteCroissanteGabarits,
  suiteDefiGabarits,
  suiteRegleGabarits,
} from "./suites-outils";

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function suiteCanvas(data: {
  theme?:
    | "nombre"
    | "margouillat"
    | "pieces"
    | "eau"
    | "dechet"
    | "jeu_video"
    | "surf"
    | "requin"
    | "pi";
  titre?: string;
  terms: Array<number | string>;
  missingIndex?: number;
  arrows?: string[];
  rule?: string;
  phrase?: string;
  display?: {
    showIcons?: boolean;
    showArrows?: boolean;
    showRule?: boolean;
    showLabels?: boolean;
  };
}) {
  return {
    kind: "suite" as const,
    theme: data.theme ?? "nombre",
    titre: data.titre,
    terms: data.terms,
    missingIndex: data.missingIndex,
    arrows: data.arrows,
    rule: data.rule,
    phrase: data.phrase,
    display: {
      showIcons: data.theme !== "nombre",
      showArrows: true,
      showRule: false,
      showLabels: true,
      ...(data.display ?? {}),
    },
  };
}

// ⭐ 14/11/2026 — Les gabarits (situation × tournure × nombres) sont dans
// `suites-outils.ts`. On ne garde ici que les items figés dont la phrase est
// unique : les « Continue la suite : # ; # ; # ; ? » à la chaîne, tous du même
// squelette, ont été remplacés par les gabarits.
const itemsFiges: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un sentier de La Réunion, une balise est posée tous les 5 m : 5 ; 10 ; 15 ; 20. À combien de mètres sera la 6e balise ?",
    format: "qcm",
    choices: ["30 m","25 m","35 m","26 m"],
    expected: ["30 m"],
    comparator: "mcq_exact",
    hint: "Continue à ajouter 5.",
    explanation: "On ajoute 5 à chaque balise : la 5e est à 25 m, la 6e à 30 m.",
    tags: ["cm1","suite","suite_defi","guide","qcm"],
  },

  // ============================================================
  // SUITE_CONTINUER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_8_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "reunion",
    text: "Sur un mur, on observe 2 margouillats, puis 4, puis 6, puis 8. Si la suite continue, combien en observe-t-on ensuite ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Le nombre de margouillats augmente de 2 à chaque fois.",
    explanation: exp(
      "Une suite peut décrire une observation réelle.",
      "On cherche la règle entre deux observations successives.",
      "2 ; 4 ; 6 ; 8 : on ajoute 2. Donc 8 + 2 = 10.",
      "On observe ensuite 10 margouillats."
    ),
    canvas: suiteCanvas({
      theme: "margouillat",
      titre: "Suite de margouillats",
      terms: [2, 4, 6, 8, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
      rule: "On ajoute 2 margouillats.",
      phrase: "Le contexte aide à comprendre la suite.",
    }),
    tags: ["cm1", "suite", "continuer", "reunion", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_9_pieces_jeu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu, on gagne 10 pièces, puis 20 pièces, puis 30 pièces, puis 40 pièces. Si la suite continue, combien gagne-t-on ensuite ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "On ajoute 10 pièces à chaque étape.",
    explanation: exp(
      "Une suite peut représenter une progression dans un jeu.",
      "On cherche l’écart entre deux valeurs successives.",
      "10 ; 20 ; 30 ; 40 : on ajoute 10. Donc 40 + 10 = 50.",
      "On gagne ensuite 50 pièces."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Suite de pièces",
      terms: [10, 20, 30, 40, "?"],
      missingIndex: 4,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 pièces.",
      phrase: "La récompense augmente régulièrement.",
    }),
    tags: ["cm1", "suite", "continuer", "jeu_video", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_10_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "reunion",
    text: "Pendant une sortie nature, les élèves ramassent 3 déchets, puis 6, puis 9, puis 12. Si la suite continue, combien ramassent-ils ensuite ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On ajoute 3 déchets à chaque fois.",
    explanation: exp(
      "Une suite peut représenter une situation réelle.",
      "On cherche l’écart entre deux valeurs successives.",
      "3 ; 6 ; 9 ; 12 : on ajoute 3. Donc 12 + 3 = 15.",
      "Ils ramassent ensuite 15 déchets."
    ),
    canvas: suiteCanvas({
      theme: "dechet",
      titre: "Ramassage de déchets",
      terms: [3, 6, 9, 12, "?"],
      missingIndex: 4,
      arrows: ["+3", "+3", "+3", "+3"],
      rule: "On ajoute 3 déchets.",
      phrase: "Une situation d’écologie peut former une suite.",
    }),
    tags: ["cm1", "suite", "continuer", "reunion", "dechet", "canvas"],
  },

    // ============================================================
  // SUITE_REGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_7_piege_non_reguliere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "La suite 3 ; 6 ; 10 ; 15 suit-elle la règle « ajouter 3 » ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie tous les écarts, pas seulement le premier.",
    explanation: exp(
      "Pour vérifier une règle, il faut tester tous les passages entre deux termes voisins.",
      "On compare les écarts successifs.",
      "6 - 3 = 3, mais 10 - 6 = 4 et 15 - 10 = 5.",
      "La règle « ajouter 3 » ne fonctionne pas pour toute la suite."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Attention au piège",
      terms: [3, 6, 10, 15],
      arrows: ["+3", "+4", "+5"],
      rule: "Les écarts changent.",
      phrase: "Une règle doit fonctionner entre tous les termes voisins.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "piege", "non_reguliere", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_8_piege_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Dans la suite 10 ; 20 ; 40 ; 80, on ajoute toujours 10. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 20 → 40 et 40 → 80.",
    explanation: exp(
      "Il faut vérifier une règle sur toute la suite.",
      "On observe chaque passage entre deux termes voisins.",
      "10 → 20 peut faire +10, mais 20 → 40 ne fait pas +10.",
      "L’élève a tort : ici, on multiplie par 2."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Piège : addition ou multiplication ?",
      terms: [10, 20, 40, 80],
      arrows: ["×2", "×2", "×2"],
      rule: "On multiplie par 2.",
      phrase: "Une règle doit fonctionner partout.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "piege", "multiplication", "qcm", "canvas"],
  },

    // ============================================================
  // SUITE_CROISSANTE_DECROISSANTE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_constante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 12 ; 12 ; 12 ; 12 est-elle croissante ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les nombres ne montent pas.",
    explanation: exp(
      "Une suite croissante augmente quand on avance.",
      "On vérifie si les nombres deviennent plus grands.",
      "12 ; 12 ; 12 ; 12 : les nombres restent identiques.",
      "La suite n’est pas croissante au sens attendu ici."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite constante",
      terms: [12, 12, 12, 12],
      arrows: ["+0", "+0", "+0"],
      rule: "Les nombres ne changent pas.",
      phrase: "Attention : rester identique n’est pas augmenter.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "constante", "croissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_ni_croissante_ni_decroissante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 5 ; 9 ; 7 ; 11 est-elle décroissante ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Elle ne descend pas tout le temps.",
    explanation: exp(
      "Une suite décroissante doit diminuer à chaque étape.",
      "On vérifie tous les passages entre deux termes voisins.",
      "5 à 9 augmente, donc la suite ne descend pas tout le temps.",
      "La suite n’est pas décroissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Vérifier tous les passages",
      terms: [5, 9, 7, 11],
      arrows: ["+4", "-2", "+4"],
      rule: "La direction change.",
      phrase: "Il faut tout vérifier, pas seulement une partie de la suite.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "decroissante", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_croissante_margouillats_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "reunion",
    text: "La suite 2 ; 4 ; 6 ; 8 margouillats est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "On observe de plus en plus de margouillats.",
    explanation: exp(
      "Une suite est croissante quand les nombres augmentent.",
      "On compare les nombres dans l’ordre.",
      "2 < 4 < 6 < 8.",
      "La suite est croissante."
    ),
    canvas: suiteCanvas({
      theme: "margouillat",
      titre: "Suite de margouillats",
      terms: [2, 4, 6, 8],
      arrows: ["+2", "+2", "+2"],
      rule: "Les nombres augmentent.",
      phrase: "On observe de plus en plus de margouillats.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "croissante", "reunion", "margouillat", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_decroissante_eau_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "reunion",
    text: "La suite 50 ; 45 ; 40 ; 35 litres est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "La quantité d’eau diminue.",
    explanation: exp(
      "Une suite est décroissante quand les nombres diminuent.",
      "On compare les valeurs dans l’ordre.",
      "50 > 45 > 40 > 35.",
      "La suite est décroissante."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Réserve d’eau",
      terms: [50, 45, 40, 35],
      arrows: ["-5", "-5", "-5"],
      rule: "Les nombres diminuent.",
      phrase: "La quantité d’eau baisse régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "decroissante", "reunion", "eau", "qcm", "canvas"],
  },

    // ============================================================
  // SUITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_1_sentier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un sentier, on place une balise tous les 5 mètres. Les premières balises sont à 5 m, 10 m, 15 m, 20 m. Où sera la suivante ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "On ajoute toujours 5 mètres.",
    explanation: exp(
      "Une situation réelle peut former une suite de nombres.",
      "On repère la règle de la suite.",
      "On ajoute 5 m à chaque fois : 20 + 5 = 25.",
      "La balise suivante sera à 25 m."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Balises sur un sentier",
      terms: [5, 10, 15, 20, "?"],
      missingIndex: 4,
      arrows: ["+5", "+5", "+5", "+5"],
      rule: "On ajoute 5 mètres à chaque fois.",
      phrase: "Une suite peut représenter des distances régulières sur un sentier.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "reunion", "sentier", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_2_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "jeux_video",
    text: "Un jeu donne 10 pièces au niveau 1, 20 pièces au niveau 2, 30 pièces au niveau 3. Combien de pièces au niveau 4 si la règle continue ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "On ajoute 10 pièces à chaque niveau.",
    explanation: exp(
      "Une suite peut modéliser un score dans un jeu.",
      "On cherche la règle entre les niveaux.",
      "10 ; 20 ; 30 : on ajoute 10. Donc le niveau 4 donne 40 pièces.",
      "La réponse est 40 pièces."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Récompenses de jeu",
      terms: [10, 20, 30, "?"],
      missingIndex: 3,
      arrows: ["+10", "+10", "+10"],
      rule: "On ajoute 10 pièces à chaque niveau.",
      phrase: "Le score peut suivre une suite régulière.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "jeu_video", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_3_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un mur, on observe 2 margouillats, puis 4, puis 6, puis 8. Si la suite continue, combien en observe-t-on ensuite ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Le nombre de margouillats augmente de 2 à chaque fois.",
    explanation: exp(
      "Une suite peut décrire une observation réelle.",
      "On cherche la règle entre deux observations successives.",
      "2 ; 4 ; 6 ; 8 : on ajoute 2. Donc 8 + 2 = 10.",
      "On observe ensuite 10 margouillats."
    ),
    canvas: suiteCanvas({
      theme: "margouillat",
      titre: "Suite de margouillats",
      terms: [2, 4, 6, 8, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
      rule: "On ajoute 2 margouillats.",
      phrase: "Le contexte aide à comprendre la suite.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "reunion", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_4_eau_decroissante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Une réserve d’eau contient 50 L, puis 45 L, puis 40 L, puis 35 L. Si la suite continue, combien restera-t-il de litres ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "La quantité diminue de 5 L à chaque étape.",
    explanation: exp(
      "Une suite peut représenter une quantité qui diminue.",
      "On cherche ce qu’on enlève à chaque étape.",
      "50 ; 45 ; 40 ; 35 : on enlève 5. Donc 35 - 5 = 30.",
      "Il restera 30 L."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Réserve d’eau",
      terms: [50, 45, 40, 35, "?"],
      missingIndex: 4,
      arrows: ["-5", "-5", "-5", "-5"],
      rule: "On enlève 5 L à chaque étape.",
      phrase: "Une suite peut aussi diminuer régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "reunion", "eau", "decroissante", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_5_nombre_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Trouve le nombre manquant : 6 ; 12 ; ? ; 24 ; 30",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "La suite avance de 6 en 6.",
    explanation: exp(
      "Un défi de suite peut demander de trouver un nombre au milieu.",
      "On cherche la règle entre les termes voisins.",
      "6 ; 12 ; 18 ; 24 ; 30 : on ajoute 6 à chaque fois.",
      "Le nombre manquant est 18."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Nombre manquant",
      terms: [6, 12, "?", 24, 30],
      missingIndex: 2,
      arrows: ["+6", "+6", "+6", "+6"],
      rule: "On ajoute 6 à chaque fois.",
      phrase: "Le nombre manquant doit respecter la règle.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "nombre_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_6_piege_multiplicatif",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : continue la suite 3 ; 6 ; 12 ; 24 ; ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Attention : on ne fait pas +3 à chaque fois.",
    explanation: exp(
      "Certaines suites ne se construisent pas par addition.",
      "On cherche si on multiplie à chaque étape.",
      "3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24. Donc 24 × 2 = 48.",
      "Le nombre suivant est 48."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Défi : suite multiplicative",
      terms: [3, 6, 12, 24, "?"],
      missingIndex: 4,
      arrows: ["×2", "×2", "×2", "×2"],
      rule: "On multiplie par 2 à chaque fois.",
      phrase: "Le piège : la suite ne progresse pas par addition.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "multiplication", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_7_piege_regle_fausse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Dans la suite 2 ; 4 ; 8 ; 16, on ajoute toujours 2. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie le passage de 4 à 8.",
    explanation: exp(
      "Pour vérifier une règle, il faut tester tous les passages.",
      "On compare chaque terme avec le suivant.",
      "2 à 4 peut faire +2, mais 4 à 8 ne fait pas +2.",
      "L’élève a tort : ici, on multiplie par 2."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Attention à la règle",
      terms: [2, 4, 8, 16],
      arrows: ["×2", "×2", "×2"],
      rule: "On multiplie par 2.",
      phrase: "Une règle doit fonctionner partout.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "erreur", "multiplication", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_8_aller_retour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un sentier, des panneaux sont placés tous les 10 m : 10 m, 20 m, 30 m, 40 m. Si on va jusqu’au panneau suivant puis on revient au départ, quelle distance parcourt-on au total ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Trouve d’abord la position du panneau suivant, puis pense à l’aller-retour.",
    explanation: exp(
      "Un défi peut mélanger une suite et un petit problème.",
      "On trouve d’abord le terme suivant, puis on calcule l’aller-retour.",
      "La suite ajoute 10 : après 40 m, le panneau suivant est à 50 m. Aller-retour : 50 + 50 = 100 m.",
      "On parcourt 100 m au total."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Balises sur un sentier",
      terms: [10, 20, 30, 40, "?"],
      missingIndex: 4,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 m.",
      phrase: "Trouve le panneau suivant, puis pense au retour.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "reunion", "sentier", "probleme", "canvas"],
  },

];

/** Sur une question de RÈGLE ou de SENS, la flèche « +3 » donnait la réponse : on la cache. */
const MICROS_SANS_FLECHES = new Set(["suite_regle", "suite_croissante_decroissante"]);
const sansFleches = (it: TutorBankItemV4): TutorBankItemV4 =>
  it.kind === "fixed" && MICROS_SANS_FLECHES.has(it.microId) && it.canvas?.kind === "suite"
    ? { ...it, canvas: { ...it.canvas, display: { ...it.canvas.display, showArrows: false } } }
    : it;

export const suitesBank: TutorBankItemV4[] = [
  ...itemsFiges.map(sansFleches),
  ...suiteContinuerGabarits,
  ...suiteRegleGabarits,
  ...suiteCroissanteGabarits,
  ...suiteDefiGabarits,
];
