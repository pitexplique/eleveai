// lib/tutor-v4/question-banks/maths/cm2/probleme.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

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
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const problemeBank: TutorBankItemV4[] = [
  /* ============================================================
     PROBLEME_CHOISIR_OPERATION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_probleme_choisir_operation_fixed_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    text: "Lina a 24 billes. Son ami lui donne 13 billes. Quelle opération permet de trouver combien de billes Lina a maintenant ?",
    format: "qcm",
    choices: ["24 + 13", "24 - 13", "24 × 13", "24 ÷ 13"],
    expected: ["24 + 13"],
    comparator: "mcq_exact",
    hint: "On ajoute des billes.",
    explanation: exp(
      "Choisir l’opération, c’est comprendre ce que raconte le problème.",
      "Quand on reçoit ou ajoute une quantité, on utilise souvent une addition.",
      "Lina avait 24 billes et reçoit 13 billes : on calcule 24 + 13.",
      "L’opération correcte est 24 + 13."
    ),
    tags: ["cm2", "probleme", "choisir_operation", "addition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_choisir_operation_fixed_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    text: "Noé a 58 cartes. Il en donne 17. Quelle opération permet de trouver combien de cartes il lui reste ?",
    format: "qcm",
    choices: ["58 - 17", "58 + 17", "58 × 17", "58 ÷ 17"],
    expected: ["58 - 17"],
    comparator: "mcq_exact",
    hint: "Il donne des cartes : il en a moins après.",
    explanation: exp(
      "Choisir l’opération, c’est repérer l’action du problème.",
      "Quand on enlève ou donne une quantité, on utilise souvent une soustraction.",
      "Noé avait 58 cartes et en donne 17 : on calcule 58 - 17.",
      "L’opération correcte est 58 - 17."
    ),
    tags: ["cm2", "probleme", "choisir_operation", "soustraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_choisir_operation_fixed_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    text: "Une boîte contient 6 crayons. On a 8 boîtes identiques. Quelle opération permet de trouver le nombre total de crayons ?",
    format: "qcm",
    choices: ["6 × 8", "6 + 8", "8 - 6", "8 ÷ 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Il y a plusieurs groupes identiques.",
    explanation: exp(
      "La multiplication sert souvent à calculer plusieurs groupes identiques.",
      "On repère le nombre dans un groupe et le nombre de groupes.",
      "Il y a 8 boîtes de 6 crayons, donc on calcule 6 × 8.",
      "L’opération correcte est 6 × 8."
    ),
    tags: ["cm2", "probleme", "choisir_operation", "multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_choisir_operation_fixed_4_division",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 36 bonbons entre 4 enfants. Quelle opération permet de trouver combien de bonbons reçoit chaque enfant ?",
    format: "qcm",
    choices: ["36 ÷ 4", "36 × 4", "36 + 4", "36 - 4"],
    expected: ["36 ÷ 4"],
    comparator: "mcq_exact",
    hint: "On partage en parts égales.",
    explanation: exp(
      "La division sert souvent à partager équitablement.",
      "On repère la quantité totale et le nombre de parts.",
      "On partage 36 bonbons entre 4 enfants : on calcule 36 ÷ 4.",
      "L’opération correcte est 36 ÷ 4."
    ),
    tags: ["cm2", "probleme", "choisir_operation", "division", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_probleme_choisir_operation_tpl_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    hint: "On réunit deux quantités.",
    tags: ["cm2", "probleme", "choisir_operation", "addition", "template"],
    generate: () => {
      const a = randomInt(12, 49);
      const b = randomInt(10, 35);
      const correct = `${a} + ${b}`;

      return {
        text: `Maya a ${a} autocollants. Elle en gagne ${b}. Quelle opération permet de trouver combien elle en a maintenant ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} - ${b}`,
          `${a} × ${b}`,
          `${a} ÷ ${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on ajoute une quantité à une autre, on utilise une addition.",
          "On repère la quantité de départ et la quantité gagnée.",
          `Maya avait ${a} autocollants et en gagne ${b}. On calcule donc ${a} + ${b}.`,
          `L’opération correcte est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_choisir_operation_tpl_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    theme: "neutral",
    hint: "On enlève une quantité.",
    tags: ["cm2", "probleme", "choisir_operation", "soustraction", "template"],
    generate: () => {
      const a = randomInt(50, 120);
      const b = randomInt(10, 45);
      const correct = `${a} - ${b}`;

      return {
        text: `Un club a ${a} ballons. Il en prête ${b}. Quelle opération permet de trouver combien de ballons restent au club ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} + ${b}`,
          `${a} × ${b}`,
          `${a} ÷ ${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on enlève une quantité, on utilise une soustraction.",
          "On part du total et on retire la quantité donnée.",
          `Le club avait ${a} ballons et en prête ${b}. On calcule ${a} - ${b}.`,
          `L’opération correcte est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_choisir_operation_tpl_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les groupes identiques.",
    tags: ["cm2", "probleme", "choisir_operation", "multiplication", "template"],
    generate: () => {
      const parGroupe = randomChoice([4, 5, 6, 8, 10]);
      const groupes = randomChoice([3, 4, 5, 6, 7]);
      const correct = `${parGroupe} × ${groupes}`;

      return {
        text: `Il y a ${groupes} paquets de ${parGroupe} cartes. Quelle opération permet de trouver le nombre total de cartes ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${parGroupe} + ${groupes}`,
          `${parGroupe} - ${groupes}`,
          `${parGroupe} ÷ ${groupes}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La multiplication sert à calculer plusieurs groupes identiques.",
          "On multiplie le nombre par paquet par le nombre de paquets.",
          `Il y a ${groupes} paquets de ${parGroupe} cartes : on calcule ${parGroupe} × ${groupes}.`,
          `L’opération correcte est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_choisir_operation_tpl_4_division",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["cm2", "probleme", "choisir_operation", "division", "template"],
    generate: () => {
      const parts = randomChoice([3, 4, 5, 6, 8]);
      const parPart = randomChoice([4, 5, 6, 7, 8]);
      const total = parts * parPart;
      const correct = `${total} ÷ ${parts}`;

      return {
        text: `On partage ${total} images entre ${parts} élèves. Quelle opération permet de trouver combien d’images reçoit chaque élève ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total} × ${parts}`,
          `${total} + ${parts}`,
          `${total} - ${parts}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La division sert à partager une quantité en parts égales.",
          "On divise la quantité totale par le nombre de parts.",
          `On partage ${total} images entre ${parts} élèves : on calcule ${total} ÷ ${parts}.`,
          `L’opération correcte est ${correct}.`
        ),
      };
    },
  },

  /* ============================================================
     PROBLEME_UNE_ETAPE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_probleme_une_etape_fixed_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une bibliothèque, il y a 128 livres sur une étagère et 74 livres sur une autre. Combien y a-t-il de livres au total ?",
    format: "qcm",
    choices: ["202", "192", "54", "212"],
    expected: ["202"],
    comparator: "mcq_exact",
    hint: "On cherche un total.",
    explanation: exp(
      "Un problème à une étape se résout avec une seule opération.",
      "Ici, on cherche le total de livres : on additionne.",
      "128 + 74 = 202.",
      "Il y a 202 livres au total."
    ),
    tags: ["cm2", "probleme", "une_etape", "addition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_une_etape_fixed_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 1,
    theme: "neutral",
    text: "Un bus transporte 56 élèves. 18 élèves descendent. Combien reste-t-il d’élèves dans le bus ?",
    format: "qcm",
    choices: ["38", "74", "48", "36"],
    expected: ["38"],
    comparator: "mcq_exact",
    hint: "Des élèves descendent : on enlève.",
    explanation: exp(
      "Un problème à une étape se résout avec une seule opération.",
      "Quand une quantité diminue, on utilise une soustraction.",
      "56 - 18 = 38.",
      "Il reste 38 élèves dans le bus."
    ),
    tags: ["cm2", "probleme", "une_etape", "soustraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_une_etape_fixed_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    text: "Une classe reçoit 7 paquets de 12 cahiers. Combien de cahiers reçoit-elle ?",
    format: "qcm",
    choices: ["84", "19", "74", "96"],
    expected: ["84"],
    comparator: "mcq_exact",
    hint: "Il y a 7 groupes de 12.",
    explanation: exp(
      "Quand on a plusieurs groupes identiques, on peut utiliser une multiplication.",
      "On multiplie le nombre de paquets par le nombre de cahiers par paquet.",
      "7 × 12 = 84.",
      "La classe reçoit 84 cahiers."
    ),
    tags: ["cm2", "probleme", "une_etape", "multiplication", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_une_etape_fixed_4_division",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 72 cartes en 8 paquets identiques. Combien y a-t-il de cartes par paquet ?",
    format: "qcm",
    choices: ["9", "8", "64", "80"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On partage 72 en 8 parts égales.",
    explanation: exp(
      "La division permet de partager en parts égales.",
      "On divise le total par le nombre de paquets.",
      "72 ÷ 8 = 9.",
      "Il y a 9 cartes par paquet."
    ),
    tags: ["cm2", "probleme", "une_etape", "division", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_probleme_une_etape_tpl_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 1,
    theme: "neutral",
    hint: "On cherche le total.",
    tags: ["cm2", "probleme", "une_etape", "addition", "template"],
    generate: () => {
      const a = randomInt(45, 180);
      const b = randomInt(30, 150);
      const total = a + b;

      return {
        text: `Une école a ${a} livres de sciences et ${b} livres d’histoires. Combien de livres cela fait-il au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un total se calcule souvent avec une addition.",
          "On additionne les deux quantités données.",
          `${a} + ${b} = ${total}.`,
          `Il y a ${total} livres au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_une_etape_tpl_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche ce qu’il reste.",
    tags: ["cm2", "probleme", "une_etape", "soustraction", "template"],
    generate: () => {
      const total = randomInt(80, 200);
      const retire = randomInt(20, 70);
      const reste = total - retire;

      return {
        text: `Un magasin a ${total} cahiers. Il en vend ${retire}. Combien de cahiers reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on cherche ce qu’il reste, on utilise souvent une soustraction.",
          "On retire la quantité vendue de la quantité de départ.",
          `${total} - ${retire} = ${reste}.`,
          `Il reste ${reste} cahiers.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_une_etape_tpl_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "Il y a plusieurs groupes identiques.",
    tags: ["cm2", "probleme", "une_etape", "multiplication", "template"],
    generate: () => {
      const groupes = randomChoice([4, 5, 6, 7, 8, 9]);
      const parGroupe = randomChoice([6, 8, 10, 12, 15]);
      const total = groupes * parGroupe;

      return {
        text: `Il y a ${groupes} boîtes contenant chacune ${parGroupe} feutres. Combien y a-t-il de feutres au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La multiplication permet de calculer plusieurs groupes identiques.",
          "On multiplie le nombre de boîtes par le nombre de feutres dans chaque boîte.",
          `${groupes} × ${parGroupe} = ${total}.`,
          `Il y a ${total} feutres au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_une_etape_tpl_4_division",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "On partage équitablement.",
    tags: ["cm2", "probleme", "une_etape", "division", "template"],
    generate: () => {
      const parts = randomChoice([3, 4, 5, 6, 8]);
      const parPart = randomChoice([5, 6, 7, 8, 9]);
      const total = parts * parPart;

      return {
        text: `On partage ${total} biscuits entre ${parts} enfants. Chaque enfant reçoit la même quantité. Combien de biscuits reçoit chaque enfant ?`,
        format: "short",
        expected: [String(parPart)],
        comparator: "number_equal",
        explanation: exp(
          "La division permet de partager une quantité en parts égales.",
          "On divise le total par le nombre d’enfants.",
          `${total} ÷ ${parts} = ${parPart}.`,
          `Chaque enfant reçoit ${parPart} biscuits.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_probleme_une_etape_fixed_5_erreur_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève lit : “On partage 40 images entre 5 élèves.” Il choisit 40 × 5. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot partage indique souvent une division.",
    explanation: exp(
      "Dans un problème, certains mots donnent des indices, mais il faut comprendre la situation.",
      "Quand on partage équitablement, on utilise une division.",
      "Il faut calculer 40 ÷ 5, pas 40 × 5.",
      "L’élève a tort."
    ),
    tags: ["cm2", "probleme", "une_etape", "erreur", "operation", "qcm"],
  },

  /* ============================================================
     PROBLEME_PLUSIEURS_ETAPES
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_probleme_plusieurs_etapes_fixed_1_achat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    text: "Éva achète 3 livres à 8 € chacun et une trousse à 6 €. Combien paie-t-elle au total ?",
    format: "qcm",
    choices: ["30", "24", "17", "38"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord le prix des 3 livres.",
    explanation: exp(
      "Un problème à plusieurs étapes demande plusieurs calculs.",
      "On calcule d’abord le prix des livres, puis on ajoute le prix de la trousse.",
      "3 × 8 = 24, puis 24 + 6 = 30.",
      "Éva paie 30 €."
    ),
    tags: ["cm2", "probleme", "plusieurs_etapes", "achat", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_plusieurs_etapes_fixed_2_reste",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    text: "Un club commande 5 sacs de 12 ballons. Il donne ensuite 18 ballons à une autre équipe. Combien de ballons lui reste-t-il ?",
    format: "qcm",
    choices: ["42", "60", "78", "30"],
    expected: ["42"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord le nombre total de ballons.",
    explanation: exp(
      "Un problème à plusieurs étapes se résout en organisant les calculs.",
      "On calcule d’abord le total, puis on enlève ce qui est donné.",
      "5 × 12 = 60, puis 60 - 18 = 42.",
      "Il reste 42 ballons."
    ),
    tags: ["cm2", "probleme", "plusieurs_etapes", "multiplication", "soustraction", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_probleme_plusieurs_etapes_tpl_1_achat_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par multiplier, puis ajoute.",
    tags: ["cm2", "probleme", "plusieurs_etapes", "achat", "template"],
    generate: () => {
      const quantite = randomChoice([2, 3, 4, 5]);
      const prix = randomChoice([6, 7, 8, 9]);
      const autre = randomChoice([3, 4, 5, 6]);
      const total = quantite * prix + autre;

      return {
        text: `Tom achète ${quantite} cahiers à ${prix} € chacun et un stylo à ${autre} €. Combien paie-t-il au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à plusieurs étapes demande d’organiser les calculs.",
          "On calcule le prix des cahiers, puis on ajoute le stylo.",
          `${quantite} × ${prix} = ${quantite * prix}, puis ${quantite * prix} + ${autre} = ${total}.`,
          `Tom paie ${total} €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_plusieurs_etapes_tpl_2_monnaie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord le prix total, puis la monnaie.",
    tags: ["cm2", "probleme", "plusieurs_etapes", "monnaie", "template"],
    generate: () => {
      const quantite = randomChoice([2, 3, 4]);
      const prix = randomChoice([5, 6, 7, 8]);
      const extra = randomChoice([2, 3, 4]);
      const total = quantite * prix + extra;
      const billet = randomChoice([30, 40, 50]);
      const monnaie = billet - total;

      return {
        text: `Nina achète ${quantite} carnets à ${prix} € chacun et une gomme à ${extra} €. Elle donne ${billet} €. Combien reçoit-elle de monnaie ?`,
        format: "short",
        expected: [String(monnaie)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver la monnaie rendue, il faut d’abord calculer le prix total.",
          "On calcule le prix des carnets, on ajoute la gomme, puis on soustrait au billet donné.",
          `${quantite} × ${prix} = ${quantite * prix}. Puis ${quantite * prix} + ${extra} = ${total}. Enfin ${billet} - ${total} = ${monnaie}.`,
          `Nina reçoit ${monnaie} € de monnaie.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_plusieurs_etapes_tpl_3_reunion_marche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le prix des fruits puis ajoute le jus.",
    tags: ["cm2", "probleme", "plusieurs_etapes", "reunion", "marche", "template"],
    generate: () => {
      const sachets = randomChoice([3, 4, 5]);
      const prixSachet = randomChoice([4, 5, 6]);
      const jus = randomChoice([2, 3, 4]);
      const total = sachets * prixSachet + jus;

      return {
        text: `Au marché de Saint-Pierre, Léa achète ${sachets} sachets de letchis à ${prixSachet} € chacun et un jus à ${jus} €. Combien paie-t-elle ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à plusieurs étapes se résout en calculant dans le bon ordre.",
          "On calcule le prix des sachets, puis on ajoute le jus.",
          `${sachets} × ${prixSachet} = ${sachets * prixSachet}, puis ${sachets * prixSachet} + ${jus} = ${total}.`,
          `Léa paie ${total} €.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_probleme_plusieurs_etapes_fixed_3_erreur_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un problème à plusieurs étapes, faut-il toujours calculer dans l’ordre où les nombres apparaissent ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut suivre le sens du problème, pas seulement l’ordre des nombres.",
    explanation: exp(
      "Un problème à plusieurs étapes demande de choisir un ordre de calcul logique.",
      "On cherche d’abord ce que l’on doit calculer pour répondre à la question finale.",
      "Les nombres peuvent apparaître dans un ordre différent de l’ordre des calculs.",
      "Il ne faut pas toujours calculer dans l’ordre où les nombres apparaissent."
    ),
    tags: ["cm2", "probleme", "plusieurs_etapes", "erreur", "ordre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_plusieurs_etapes_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_plusieurs_etapes",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème à plusieurs étapes.",
    format: "open",
    expected: ["chercher", "question", "étapes", "calcul"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de la question, des données et des calculs intermédiaires.",
    explanation: exp(
      "Un problème à plusieurs étapes nécessite plusieurs calculs organisés.",
      "On lit la question, on repère les données utiles, puis on choisit les calculs intermédiaires.",
      "Par exemple, on peut calculer un prix total avant de calculer une monnaie rendue.",
      "Il faut organiser les étapes avant de donner la réponse finale."
    ),
    tags: ["cm2", "probleme", "plusieurs_etapes", "open", "methode"],
  },

  /* ============================================================
     PROBLEME_REDIGER
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_probleme_rediger_fixed_1_phrase_reponse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle réponse est la mieux rédigée pour un problème dont le résultat est 36 élèves ?",
    format: "qcm",
    choices: [
      "Il y a 36 élèves.",
      "36",
      "élèves",
      "36 + élèves",
    ],
    expected: ["Il y a 36 élèves."],
    comparator: "mcq_exact",
    hint: "Une réponse rédigée est une phrase complète avec l’unité.",
    explanation: exp(
      "Rédiger une réponse claire, c’est écrire une phrase qui répond à la question.",
      "On reprend le sens du problème et on ajoute l’unité.",
      "La réponse “Il y a 36 élèves.” est une phrase complète.",
      "La meilleure réponse est : Il y a 36 élèves."
    ),
    tags: ["cm2", "probleme", "rediger", "phrase", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_rediger_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une réponse de problème, pourquoi faut-il souvent écrire l’unité ?",
    format: "qcm",
    choices: [
      "pour savoir de quoi on parle",
      "pour rendre le calcul plus long",
      "pour éviter d’écrire une phrase",
      "parce que l’unité remplace le calcul",
    ],
    expected: ["pour savoir de quoi on parle"],
    comparator: "mcq_exact",
    hint: "36 € et 36 élèves ne veulent pas dire la même chose.",
    explanation: exp(
      "L’unité précise la grandeur ou l’objet dont on parle.",
      "On regarde la question pour savoir quelle unité écrire.",
      "36 € n’a pas le même sens que 36 élèves ou 36 cm.",
      "L’unité rend la réponse claire."
    ),
    tags: ["cm2", "probleme", "rediger", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_probleme_rediger_tpl_1_choisir_phrase",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis la phrase complète avec l’unité.",
    tags: ["cm2", "probleme", "rediger", "phrase", "template"],
    generate: () => {
      const result = randomChoice([24, 36, 48, 60]);
      const unit = randomChoice(["élèves", "cahiers", "euros", "cartes"]);
      const correct = `Il y a ${result} ${unit}.`;

      return {
        text: `Le résultat d’un problème est ${result} ${unit}. Quelle réponse est la mieux rédigée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${result}`,
          `${unit}`,
          `${result} + ${unit}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une réponse rédigée doit être une phrase claire.",
          "On écrit le résultat avec l’unité dans une phrase.",
          `Le résultat est ${result} ${unit}.`,
          `La meilleure réponse est : ${correct}`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_probleme_rediger_fixed_3_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève répond seulement “42” à un problème qui demande une distance en kilomètres. Sa réponse est-elle assez claire ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’unité et une phrase.",
    explanation: exp(
      "Une réponse claire doit répondre précisément à la question.",
      "On écrit une phrase et on ajoute l’unité.",
      "Dire seulement “42” ne précise pas s’il s’agit de kilomètres, d’euros ou d’élèves.",
      "La réponse n’est pas assez claire."
    ),
    tags: ["cm2", "probleme", "rediger", "erreur", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probleme_rediger_open_1_phrase",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_rediger",
    difficulty: 4,
    theme: "neutral",
    text: "Rédige une phrase réponse pour ce résultat : 18 €. Le problème demandait combien coûte l’achat.",
    format: "open",
    expected: ["18", "€", "coûte"],
    comparator: "contains_keyword",
    hint: "Écris une phrase avec le résultat et l’unité.",
    explanation: exp(
      "Rédiger une réponse signifie écrire une phrase complète.",
      "On reprend les mots de la question et on ajoute le résultat avec son unité.",
      "Une phrase possible est : L’achat coûte 18 €.",
      "La réponse doit contenir le résultat et l’unité."
    ),
    tags: ["cm2", "probleme", "rediger", "open", "phrase"],
  },

  /* ============================================================
     PROBLEME_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_probleme_defi_fixed_1_bus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour une sortie, 92 élèves prennent des bus de 30 places. Combien de bus faut-il prévoir au minimum ?",
    format: "qcm",
    choices: ["4", "3", "2", "30"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "3 bus ne suffisent pas car 3 × 30 = 90.",
    explanation: exp(
      "Un défi de problème peut demander d’interpréter le reste d’une division.",
      "On cherche combien de groupes de 30 places sont nécessaires.",
      "92 ÷ 30 donne 3 bus complets et 2 élèves en plus. Il faut donc un 4e bus.",
      "Il faut prévoir 4 bus."
    ),
    tags: ["cm2", "probleme", "defi", "division", "reste", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_probleme_defi_tpl_1_bus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "S’il reste des élèves, il faut un bus de plus.",
    tags: ["cm2", "probleme", "defi", "division", "reste", "template"],
    generate: () => {
      const places = randomChoice([20, 25, 30, 40]);
      const busComplets = randomChoice([2, 3, 4]);
      const reste = randomInt(1, places - 1);
      const eleves = busComplets * places + reste;
      const bus = busComplets + 1;

      return {
        text: `Pour une sortie, ${eleves} élèves prennent des bus de ${places} places. Combien de bus faut-il prévoir au minimum ?`,
        format: "short",
        expected: [String(bus)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on répartit des personnes dans des bus, il faut interpréter le reste.",
          "On cherche combien de bus complets sont remplis et s’il reste des élèves.",
          `${eleves} = ${busComplets} × ${places} + ${reste}. Il reste donc ${reste} élève(s) après ${busComplets} bus.`,
          `Il faut prévoir ${bus} bus.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_defi_tpl_2_reunion_rando",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule d’abord la distance totale, puis compare.",
    tags: ["cm2", "probleme", "defi", "reunion", "randonnee", "template"],
    generate: () => {
      const matin = randomChoice([4, 5, 6, 7]);
      const apresMidi = randomChoice([3, 4, 5]);
      const objectif = randomChoice([9, 10, 11, 12]);
      const total = matin + apresMidi;
      const manque = objectif - total;

      const enough = total >= objectif;
      const expected = enough ? "oui" : "non";

      return {
        text:
          `À La Réunion, une classe fait une randonnée. Elle marche ${matin} km le matin et ${apresMidi} km l’après-midi. ` +
          `L’objectif était de marcher au moins ${objectif} km. L’objectif est-il atteint ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Un défi peut demander de calculer puis de comparer.",
          "On calcule d’abord la distance totale parcourue.",
          `Distance totale : ${matin} + ${apresMidi} = ${total} km. Objectif : ${objectif} km.`,
          enough
            ? `L’objectif est atteint car ${total} km est supérieur ou égal à ${objectif} km.`
            : `L’objectif n’est pas atteint car il manque ${manque} km.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probleme_defi_tpl_3_achat_monnaie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le coût total puis la monnaie rendue.",
    tags: ["cm2", "probleme", "defi", "achat", "monnaie", "template"],
    generate: () => {
      const quantite = randomChoice([3, 4, 5]);
      const prix = randomChoice([6, 7, 8]);
      const autre = randomChoice([4, 5, 6]);
      const total = quantite * prix + autre;
      const billet = randomChoice([50, 60]);
      const monnaie = billet - total;

      return {
        text: `Sofia achète ${quantite} livres à ${prix} € chacun et une règle à ${autre} €. Elle donne ${billet} €. Combien reçoit-elle de monnaie ?`,
        format: "short",
        expected: [String(monnaie)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi peut combiner plusieurs opérations.",
          "On calcule le coût total, puis on soustrait ce coût au billet donné.",
          `${quantite} × ${prix} = ${quantite * prix}. Puis ${quantite * prix} + ${autre} = ${total}. Enfin ${billet} - ${total} = ${monnaie}.`,
          `Sofia reçoit ${monnaie} € de monnaie.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_probleme_defi_open_1_strategie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: "probleme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une stratégie pour résoudre un problème difficile.",
    format: "open",
    expected: ["lire", "données", "question", "calcul"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de lire la question, repérer les données et choisir les calculs.",
    explanation: exp(
      "Un problème difficile demande de la méthode.",
      "On lit la question, on repère les données utiles, puis on cherche les étapes de calcul.",
      "On peut faire un schéma, écrire les opérations intermédiaires, puis vérifier si la réponse a du sens.",
      "Une bonne stratégie aide à ne pas se perdre."
    ),
    tags: ["cm2", "probleme", "defi", "open", "strategie"],
  },
];