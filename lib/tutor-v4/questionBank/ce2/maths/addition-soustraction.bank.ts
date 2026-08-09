// lib/tutor-v4/questionBank/ce2/maths/addition-soustraction.bank.ts
//
// Les additions et soustractions posées du CE2, écrites à la main. Cinq
// micro-compétences qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : poser et calculer une
// addition et une soustraction avec retenues, compléter une égalité additive,
// et contrôler un résultat par estimation. Les nombres restent sous 10 000.
//
// LES DEUX PIÈGES DE LA NOTION, tous deux vus chaque année :
//   • L'ALIGNEMENT. 348 + 27 posé en collant les chiffres à gauche donne 618.
//     Les unités vont sous les unités, et la colonne décide, pas l'œil.
//   • LA SOUSTRACTION À L'ENVERS. Pour 52 - 27, l'élève fait 7 - 2 dans la
//     colonne des unités parce que « on prend le plus petit au plus grand »,
//     et annonce 35. Il faut casser une dizaine, pas retourner le calcul.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { CalculPoseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function calculPose(data: Omit<CalculPoseCanvasData, "kind">): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const additionSoustractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_ADDITION_POSEE — poser une addition avec retenues
     Le piège de l'alignement est ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser 348 + 27, comment aligne-t-on les deux nombres ?",
    format: "qcm",
    choices: [
      "les unités sous les unités, à droite",
      "les premiers chiffres l'un sous l'autre, à gauche",
      "on met le plus grand nombre en bas",
      "peu importe, le résultat sera le même",
    ],
    expected: ["les unités sous les unités, à droite"],
    comparator: "mcq_exact",
    hint: "On ne peut ajouter que ce qui compte la même chose : des unités avec des unités.",
    explanation: exp(
      "Dans une opération posée, chaque colonne réunit des chiffres du même rang.",
      "On aligne les nombres par la droite : unités sous unités, dizaines sous dizaines.",
      "Le 7 de 27 est une unité : il se met sous le 8 de 348. Aligné à gauche, il tomberait sous le 3, une centaine, et on trouverait 618 au lieu de 375.",
      "On aligne par la droite, unités sous unités.",
    ),
    tags: ["ce2", "addition", "posee", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 348 + 27 ?",
    format: "short",
    expected: ["375"],
    comparator: "number_equal",
    hint: "8 + 7 dépasse 9 : garde la retenue pour les dizaines.",
    explanation: exp(
      "Quand une colonne dépasse 9, dix unités deviennent une dizaine : c'est la retenue.",
      "On additionne colonne par colonne en partant des unités.",
      "Unités : 8 + 7 = 15, on écrit 5 et on retient 1. Dizaines : 4 + 2 + 1 = 7. Centaines : 3. Le résultat est 375.",
      "348 + 27 = 375.",
    ),
    tags: ["ce2", "addition", "posee", "retenue"],
    canvas: calculPose({
      operation: "addition",
      numbers: ["348", "27"],
      result: "375",
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une addition posée, que veut dire la petite retenue écrite en haut d'une colonne ?",
    format: "qcm",
    choices: [
      "dix unités de la colonne de droite regroupées",
      "un chiffre qu'on a oublié",
      "le résultat de la colonne",
      "un chiffre qu'on peut ignorer",
    ],
    expected: ["dix unités de la colonne de droite regroupées"],
    comparator: "mcq_exact",
    hint: "Dix unités font une dizaine : elle va rejoindre les dizaines.",
    explanation: exp(
      "Dix unités d'un rang se regroupent en une seule unité du rang suivant.",
      "Quand une colonne dépasse 9, on écrit le chiffre des unités et on porte le reste au rang de gauche.",
      "8 + 7 = 15, c'est-à-dire 1 dizaine et 5 unités. Le 5 reste dans la colonne des unités, la dizaine part rejoindre les dizaines : c'est elle, la retenue.",
      "C'est un groupement de dix, qui monte d'un rang.",
    ),
    tags: ["ce2", "addition", "posee", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_addition_posee_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Colonne par colonne, en partant des unités.",
    tags: ["ce2", "addition", "posee", "template", "canvas"],
    generate: () => {
      const a = randomInt(120, 4800);
      const b = randomInt(15, 900);
      const somme = a + b;
      const retenueUnites = (a % 10) + (b % 10) >= 10;
      return {
        text: `Combien font ${a} + ${b} ?`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        explanation: exp(
          "On additionne colonne par colonne, en partant des unités ; dix unités d'un rang font une unité du rang suivant.",
          "On aligne les unités sous les unités, puis on avance vers la gauche en portant les retenues.",
          retenueUnites
            ? `Unités : ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, on écrit ${((a % 10) + (b % 10)) % 10} et on retient 1. On continue vers la gauche : le total est ${somme}.`
            : `Unités : ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, sans retenue. On continue vers la gauche : le total est ${somme}.`,
          `${a} + ${b} = ${somme}.`,
        ),
        canvas: calculPose({
          operation: "addition",
          numbers: [String(a), String(b)],
          result: String(somme),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_addition_posee_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux nombres : les unités d'abord.",
    tags: ["ce2", "addition", "posee", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { quoi: "spectateurs", ou: "au spectacle de fin d'année", a: "le samedi", b: "le dimanche" },
        { quoi: "visiteurs", ou: "à la fête de la vanille", a: "le matin", b: "l'après-midi" },
        { quoi: "coureurs", ou: "au cross du collège", a: "en 6ᵉ", b: "en 5ᵉ" },
      ]);
      const a = randomInt(150, 900);
      const b = randomInt(150, 900);
      return {
        text: `${contexte.ou.charAt(0).toUpperCase() + contexte.ou.slice(1)}, il y avait ${a} ${contexte.quoi} ${contexte.a} et ${b} ${contexte.b}. Combien de ${contexte.quoi} en tout ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: exp(
          "Réunir deux quantités, c'est les additionner.",
          "On pose l'addition en alignant les unités, puis on avance vers la gauche.",
          `${a} + ${b} = ${a + b}.`,
          `Il y avait ${a + b} ${contexte.quoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SOUSTRACTION_POSEE — poser une soustraction
     LE piège : retourner la colonne au lieu de casser une
     dizaine.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer 52 - 27, un élève fait 7 - 2 = 5 dans la colonne des unités et trouve 35. Où est l'erreur ?",
    format: "qcm",
    choices: [
      "on ne retourne pas la colonne : il faut casser une dizaine",
      "il fallait commencer par les dizaines",
      "il fallait poser 27 en haut",
      "il n'y a pas d'erreur",
    ],
    expected: ["on ne retourne pas la colonne : il faut casser une dizaine"],
    comparator: "mcq_exact",
    hint: "On enlève toujours le nombre du bas à celui du haut, jamais l'inverse.",
    explanation: exp(
      "Dans une soustraction, on enlève toujours le chiffre du bas à celui du haut, même s'il est plus grand.",
      "Quand le chiffre du haut est trop petit, on casse une dizaine du rang de gauche pour lui donner dix unités.",
      "52, c'est 4 dizaines et 12 unités. Alors 12 - 7 = 5 aux unités, et 4 - 2 = 2 aux dizaines : 25. En retournant la colonne, l'élève trouve 35, soit 10 de trop.",
      "Il fallait casser une dizaine : 52 - 27 = 25.",
    ),
    tags: ["ce2", "soustraction", "posee", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 403 - 158 ?",
    format: "short",
    expected: ["245"],
    comparator: "number_equal",
    hint: "Il n'y a aucune dizaine à casser : va chercher une centaine.",
    explanation: exp(
      "Quand le chiffre du haut est trop petit, on emprunte au rang de gauche.",
      "S'il n'y a rien à emprunter juste à gauche, on va chercher plus loin : une centaine se change en dix dizaines.",
      "403, c'est 3 centaines, 9 dizaines et 13 unités. Alors 13 - 8 = 5, puis 9 - 5 = 4, puis 3 - 1 = 2. Le résultat est 245.",
      "403 - 158 = 245.",
    ),
    tags: ["ce2", "soustraction", "posee", "retenue"],
    canvas: calculPose({
      operation: "soustraction",
      numbers: ["403", "158"],
      result: "245",
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Comment vérifier qu'on n'a pas fait d'erreur dans une soustraction ?",
    format: "qcm",
    choices: [
      "on ajoute le résultat au nombre du bas et on doit retrouver celui du haut",
      "on refait exactement le même calcul",
      "on multiplie les deux nombres",
      "on ne peut pas vérifier",
    ],
    expected: ["on ajoute le résultat au nombre du bas et on doit retrouver celui du haut"],
    comparator: "mcq_exact",
    hint: "L'addition défait ce que la soustraction a fait.",
    explanation: exp(
      "L'addition et la soustraction sont deux opérations inverses : l'une défait l'autre.",
      "On additionne le résultat trouvé avec le nombre qu'on avait enlevé.",
      "Si 52 - 27 = 25, alors 25 + 27 doit redonner 52. C'est le cas. En revanche, avec la réponse fausse 35 : 35 + 27 = 62, et non 52 — l'erreur se voit tout de suite.",
      "On ajoute le résultat au nombre enlevé.",
    ),
    tags: ["ce2", "soustraction", "posee", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_soustraction_posee_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Colonne par colonne, et on casse une dizaine quand il le faut.",
    tags: ["ce2", "soustraction", "posee", "template", "canvas"],
    generate: () => {
      const a = randomInt(300, 4800);
      const b = randomInt(120, a - 100);
      const difference = a - b;
      const emprunt = (a % 10) < (b % 10);
      return {
        text: `Combien font ${a} - ${b} ?`,
        format: "short",
        expected: [String(difference)],
        comparator: "number_equal",
        explanation: exp(
          "On soustrait colonne par colonne en partant des unités ; si le chiffre du haut est trop petit, on casse une unité du rang de gauche.",
          "On enlève toujours le chiffre du bas à celui du haut, jamais l'inverse.",
          emprunt
            ? `Unités : ${a % 10} est plus petit que ${b % 10}, on casse une dizaine : ${(a % 10) + 10} - ${b % 10} = ${(a % 10) + 10 - (b % 10)}. On continue vers la gauche en n'oubliant pas la dizaine empruntée. Le résultat est ${difference}.`
            : `Unités : ${a % 10} - ${b % 10} = ${(a % 10) - (b % 10)}, sans emprunt. On continue vers la gauche : le résultat est ${difference}.`,
          `${a} - ${b} = ${difference}. Vérification : ${difference} + ${b} = ${a}.`,
        ),
        canvas: calculPose({
          operation: "soustraction",
          numbers: [String(a), String(b)],
          result: String(difference),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_soustraction_posee_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Le piège classique : ne retourne pas la colonne des unités.",
    tags: ["ce2", "soustraction", "posee", "piege", "template"],
    generate: () => {
      const dizaines = randomInt(3, 9);
      const uniteHaut = randomInt(0, 4);
      const a = dizaines * 10 + uniteHaut;
      const uniteBas = randomInt(uniteHaut + 3, 9);
      const b = randomInt(1, dizaines - 2) * 10 + uniteBas;
      const juste = a - b;
      const faux = Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs(uniteHaut - uniteBas);
      return {
        text: `Un élève calcule ${a} - ${b}. Dans la colonne des unités, il fait ${uniteBas} - ${uniteHaut} et trouve ${faux}. Quelle est la bonne réponse ?`,
        format: "qcm",
        choices: makeChoices(String(juste), [
          String(faux),
          String(juste + 10),
          String(juste - 10),
          String(a - b + 1),
        ]),
        expected: [String(juste)],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une soustraction, on enlève toujours le chiffre du bas à celui du haut, même s'il est plus grand.",
          "Quand le chiffre du haut est trop petit, on casse une dizaine du rang de gauche pour lui donner dix unités.",
          `${a}, c'est ${dizaines - 1} dizaines et ${uniteHaut + 10} unités. Alors ${uniteHaut + 10} - ${uniteBas} = ${uniteHaut + 10 - uniteBas} aux unités, et on continue avec les dizaines. Le résultat est ${juste}, pas ${faux}.`,
          `${a} - ${b} = ${juste}. Vérification : ${juste} + ${b} = ${a}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ADD_SOUS_VOCABULAIRE — terme, somme, différence
     Attendu du BO, resté longtemps sans une seule question.
     LE PIÈGE : confondre le nom de l'opération et le nom de son
     résultat. La somme n'est pas l'addition, c'est ce qu'elle
     produit. « Trouve la somme de 8 et 5 » ne demande pas
     d'écrire 8 + 5, mais 13.
     Son cousin : croire que « terme » ne vaut que pour
     l'addition. Le BO écrit « 60 et 37 sont les termes de la
     soustraction 60 − 37 ».
  ========================================================= */
  // ⚠️ « Quelle est la somme de 8 et de 5 ? » était figé ici. C'est un calcul,
  // pas un cas remarquable : le gabarit tpl_1 le tire déjà, et il descend
  // maintenant jusqu'aux petits nombres pour garder cette porte d'entrée.
  // Les trois `fixed` qui restent gagnent leur place : deux phrases littérales
  // du programme, et le piège nommé.
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'addition 12 + 25 = 37, comment appelle-t-on 12 et 25 ?",
    format: "qcm",
    choices: ["les termes", "les sommes", "les facteurs", "les différences"],
    expected: ["les termes"],
    comparator: "mcq_exact",
    hint: "Ce sont les nombres qu'on additionne, pas le résultat.",
    explanation: exp(
      "Les nombres qu'on additionne s'appellent les termes ; leur résultat s'appelle la somme.",
      "On repère ce qui est de chaque côté du signe, et ce qui est après le signe égal.",
      "12 et 25 sont les termes de l'addition 12 + 25. Le nombre 37, lui, est la somme. « Facteur » appartient à la multiplication, pas à l'addition.",
      "12 et 25 sont les termes.",
    ),
    tags: ["ce2", "addition", "vocabulaire", "terme", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la soustraction 60 − 37, comment appelle-t-on 60 et 37 ?",
    format: "qcm",
    choices: ["les termes", "les différences", "les facteurs", "les restes"],
    expected: ["les termes"],
    comparator: "mcq_exact",
    hint: "Le mot ne sert pas qu'à l'addition.",
    explanation: exp(
      "Les nombres d'une soustraction s'appellent eux aussi des termes ; leur résultat s'appelle la différence.",
      "On nomme d'abord ce qu'on calcule, ensuite ce qu'on obtient.",
      "60 et 37 sont les termes de la soustraction 60 − 37. Le résultat, 23, est la différence. Un seul mot pour les deux opérations : terme.",
      "60 et 37 sont les termes.",
    ),
    tags: ["ce2", "soustraction", "vocabulaire", "terme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "On demande à un élève : « Calcule la somme de 26 et de 14. » Il écrit « 26 + 14 » et s'arrête. A-t-il répondu ?",
    format: "qcm",
    choices: [
      "non : la somme est le résultat, il fallait écrire 40",
      "oui, c'est exactement ce qu'on demandait",
      "non, il fallait écrire 26 − 14",
      "non, il fallait écrire 14 + 26",
    ],
    expected: ["non : la somme est le résultat, il fallait écrire 40"],
    comparator: "mcq_exact",
    hint: "Il a écrit le calcul. On lui demandait ce que ce calcul donne.",
    explanation: exp(
      "La somme n'est pas l'addition : l'addition est l'opération, la somme est ce qu'elle produit.",
      "On pose le calcul, puis on va jusqu'au bout et on écrit le nombre trouvé.",
      "26 + 14 = 40. La réponse attendue est 40. Écrire « 26 + 14 », c'est répéter la question autrement.",
      "Non : la somme de 26 et de 14 est 40.",
    ),
    tags: ["ce2", "addition", "vocabulaire", "somme", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_add_sous_vocabulaire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme : on ajoute. Différence : on retire. Dans les deux cas, on donne le RÉSULTAT.",
    tags: ["ce2", "addition", "soustraction", "vocabulaire", "template"],
    generate: () => {
      // On descend jusqu'à 8 : le gabarit doit couvrir la question facile
      // « la somme de 8 et de 5 », qui était un item figé jusqu'ici.
      // b reste sous a, sinon la différence passerait sous zéro.
      const a = randomInt(8, 96);
      const b = randomInt(3, Math.min(23, a - 1));
      const somme = randomChoice([true, false]);
      const resultat = somme ? a + b : a - b;
      const autre = somme ? a - b : a + b;
      return {
        text: somme
          ? `Quelle est la somme de ${a} et de ${b} ?`
          : `Quelle est la différence entre ${a} et ${b} ?`,
        format: "qcm",
        choices: makeChoices(String(resultat), [
          String(autre),
          somme ? `${a} + ${b}` : `${a} − ${b}`,
          // ⚠️ Pas de « + 10 » ici : sur une différence avec b = 5, il tombe
          // exactement sur la somme, et deux pièges n'en font plus qu'un.
          String(resultat + 1),
          String(resultat + 2),
        ]),
        expected: [String(resultat)],
        comparator: "mcq_exact",
        explanation: exp(
          somme
            ? "La somme de deux nombres est le résultat de leur addition."
            : "La différence entre deux nombres est le résultat de leur soustraction.",
          "On effectue l'opération, et on donne le nombre trouvé — pas le calcul.",
          somme
            ? `${a} + ${b} = ${a + b}. Écrire « ${a} + ${b} » n'est pas une réponse : c'est le calcul.`
            : `${a} − ${b} = ${a - b}. Écrire « ${a} − ${b} » n'est pas une réponse : c'est le calcul.`,
          somme
            ? `La somme de ${a} et de ${b} est ${a + b}.`
            : `La différence entre ${a} et ${b} est ${a - b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ADD_SOUS_COMPLEMENT — compléter une égalité
     Le trou peut être n'importe où : ce n'est pas toujours
     une soustraction.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 47 + ... = 100",
    format: "short",
    expected: ["53"],
    comparator: "number_equal",
    hint: "Passe d'abord de 47 à 50.",
    explanation: exp(
      "Compléter à 100, c'est chercher ce qui manque pour atteindre la centaine.",
      "On avance par étapes : d'abord jusqu'à la dizaine ronde, puis jusqu'à 100.",
      "De 47 à 50 : 3. De 50 à 100 : 50. En tout : 3 + 50 = 53.",
      "Il manque 53.",
    ),
    tags: ["ce2", "addition", "complement", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : ... - 36 = 24",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "On a enlevé 36 et il reste 24 : combien y avait-il au départ ?",
    explanation: exp(
      "Quand le nombre qui manque est celui de DÉPART, on le retrouve en additionnant.",
      "On remet ce qui a été enlevé sur ce qui reste.",
      "Il reste 24 après avoir enlevé 36 : au départ il y avait 24 + 36 = 60. Vérification : 60 - 36 = 24.",
      "Il manque 60.",
    ),
    tags: ["ce2", "soustraction", "complement", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compléter 68 + ... = 95, quelle opération fait-on ?",
    format: "qcm",
    choices: ["95 - 68", "95 + 68", "68 - 95", "68 × 95"],
    expected: ["95 - 68"],
    comparator: "mcq_exact",
    hint: "On cherche l'écart entre 68 et 95.",
    explanation: exp(
      "Le nombre qui manque dans une addition se trouve par une soustraction.",
      "On enlève au total ce qu'on a déjà.",
      "On a déjà 68 et on veut atteindre 95 : il manque 95 - 68 = 27. On n'écrit pas 68 - 95, qui reviendrait à enlever le plus grand du plus petit.",
      "On calcule 95 - 68.",
    ),
    tags: ["ce2", "addition", "complement", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_add_sous_complement_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    hint: "Avance jusqu'à la dizaine ronde, puis jusqu'au total.",
    tags: ["ce2", "addition", "complement", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 500, 1000]);
      const debut = randomInt(1, total / 10 - 1) * 10 + randomInt(1, 9);
      const manque = total - debut;
      const versDizaine = 10 - (debut % 10);
      return {
        text: `Complète : ${debut} + ... = ${total}`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter, c'est chercher ce qui manque pour atteindre le total.",
          "On avance par étapes : d'abord jusqu'à la dizaine ronde, puis jusqu'au total.",
          `De ${debut} à ${debut + versDizaine} : ${versDizaine}. De ${debut + versDizaine} à ${total} : ${total - debut - versDizaine}. En tout : ${versDizaine} + ${total - debut - versDizaine} = ${manque}.`,
          `Il manque ${manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_add_sous_complement_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde OÙ est le trou : au départ, ou à l'arrivée ?",
    tags: ["ce2", "addition", "complement", "piege", "template"],
    generate: () => {
      const b = randomInt(20, 90);
      const reste = randomInt(20, 90);
      const depart = b + reste;
      const trouAuDepart = randomChoice([true, false]);
      return trouAuDepart
        ? {
            text: `Complète : ... - ${b} = ${reste}`,
            format: "short",
            expected: [String(depart)],
            comparator: "number_equal",
            explanation: exp(
              "Quand le nombre qui manque est celui de DÉPART, on le retrouve en additionnant.",
              "On remet ce qui a été enlevé sur ce qui reste.",
              `Il reste ${reste} après avoir enlevé ${b} : au départ il y avait ${reste} + ${b} = ${depart}. Vérification : ${depart} - ${b} = ${reste}.`,
              `Il manque ${depart}.`,
            ),
          }
        : {
            text: `Complète : ${depart} - ... = ${reste}`,
            format: "short",
            expected: [String(b)],
            comparator: "number_equal",
            explanation: exp(
              "Quand le nombre qui manque est celui qu'on ENLÈVE, on le retrouve en soustrayant.",
              "On enlève au nombre de départ ce qui reste à la fin.",
              `On part de ${depart} et il reste ${reste} : on a donc enlevé ${depart} - ${reste} = ${b}. Vérification : ${depart} - ${b} = ${reste}.`,
              `Il manque ${b}.`,
            ),
          };
    },
  },

  /* =========================================================
     CE2_ADD_SOUS_ESTIMER — contrôler par estimation
     Estimer ne sert pas à trouver le résultat, mais à
     repérer celui qui ne peut pas être bon.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève calcule 198 + 203 et trouve 1001. Sans refaire le calcul, que peut-on dire ?",
    format: "qcm",
    choices: [
      "c'est faux : 198 et 203 sont proches de 200, le total est proche de 400",
      "c'est juste",
      "on ne peut rien dire sans poser le calcul",
      "c'est faux, le total doit être proche de 800",
    ],
    expected: ["c'est faux : 198 et 203 sont proches de 200, le total est proche de 400"],
    comparator: "mcq_exact",
    hint: "Remplace chaque nombre par le nombre rond le plus proche.",
    explanation: exp(
      "Estimer, c'est remplacer les nombres par des nombres ronds pour prévoir l'ordre de grandeur du résultat.",
      "On arrondit chaque nombre, on calcule de tête, puis on compare au résultat annoncé.",
      "198 et 203 sont tous deux proches de 200, donc le total est proche de 200 + 200 = 400. Le 1001 annoncé est plus de deux fois trop grand : il y a une erreur.",
      "C'est faux : le résultat doit être proche de 400.",
    ),
    tags: ["ce2", "addition", "estimer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert d'estimer un résultat AVANT de poser le calcul ?",
    format: "qcm",
    choices: [
      "à savoir tout de suite si le résultat trouvé est possible",
      "à trouver le résultat exact plus vite",
      "à éviter de poser le calcul",
      "à rien, c'est du temps perdu",
    ],
    expected: ["à savoir tout de suite si le résultat trouvé est possible"],
    comparator: "mcq_exact",
    hint: "L'estimation ne donne pas le résultat : elle donne son voisinage.",
    explanation: exp(
      "Une estimation donne l'ordre de grandeur du résultat, pas sa valeur exacte.",
      "On arrondit, on calcule de tête, et on garde ce nombre en tête pendant qu'on pose l'opération.",
      "Si l'estimation annonce environ 400 et que le calcul posé donne 1001, on sait qu'il faut recommencer — sans même chercher où est l'erreur.",
      "Elle sert à contrôler si le résultat est possible.",
    ),
    tags: ["ce2", "addition", "estimer", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Environ combien font 297 + 405 ?",
    format: "qcm",
    choices: ["environ 700", "environ 600", "environ 800", "environ 1100"],
    expected: ["environ 700"],
    comparator: "mcq_exact",
    hint: "Remplace 297 par 300 et 405 par 400.",
    explanation: exp(
      "Estimer, c'est remplacer chaque nombre par le nombre rond le plus proche.",
      "On arrondit à la centaine, puis on additionne de tête.",
      "297 est proche de 300, et 405 de 400. Donc 300 + 400 = 700 : le résultat exact sera juste au-dessus de 700.",
      "C'est environ 700.",
    ),
    tags: ["ce2", "addition", "estimer", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_add_sous_estimer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Arrondis chaque nombre à la centaine la plus proche.",
    tags: ["ce2", "addition", "estimer", "template"],
    generate: () => {
      const centA = randomInt(2, 9);
      const centB = randomInt(1, 9 - Math.min(centA, 5));
      const a = centA * 100 + randomChoice([-4, -2, 3, 5]);
      const b = centB * 100 + randomChoice([-3, 2, 4]);
      const estimation = (centA + centB) * 100;
      return {
        text: `Environ combien font ${a} + ${b} ?`,
        format: "qcm",
        choices: makeChoices(`environ ${estimation}`, [
          `environ ${estimation + 100}`,
          `environ ${estimation - 100}`,
          `environ ${estimation + 200}`,
          `environ ${estimation * 2}`,
        ]),
        expected: [`environ ${estimation}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c'est remplacer chaque nombre par le nombre rond le plus proche.",
          "On arrondit à la centaine, puis on additionne de tête.",
          `${a} est proche de ${centA * 100}, et ${b} de ${centB * 100}. Donc ${centA * 100} + ${centB * 100} = ${estimation}.`,
          `C'est environ ${estimation}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_add_sous_estimer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare le résultat annoncé à ce que donne l'estimation.",
    tags: ["ce2", "addition", "estimer", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 9) * 100 + randomInt(1, 9);
      const b = randomInt(1, 4) * 100 + randomInt(1, 9);
      const juste = a + b;
      const absurde = randomChoice([juste * 10, juste + 1000, Math.floor(juste / 10)]);
      return {
        text: `Un élève calcule ${a} + ${b} et annonce ${absurde}. Sans poser le calcul, ce résultat est-il possible ?`,
        format: "qcm",
        choices: makeChoices("non, il est très loin de l'estimation", [
          "oui",
          "on ne peut rien dire sans poser le calcul",
          "oui, à condition qu'il y ait une retenue",
        ]),
        expected: ["non, il est très loin de l'estimation"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation donne l'ordre de grandeur du résultat : un résultat qui s'en éloigne beaucoup est forcément faux.",
          "On arrondit chaque nombre à la centaine, on additionne de tête, puis on compare.",
          `${a} est proche de ${Math.round(a / 100) * 100} et ${b} de ${Math.round(b / 100) * 100} : le total doit tourner autour de ${Math.round(a / 100) * 100 + Math.round(b / 100) * 100}. Le résultat annoncé, ${absurde}, en est très loin.`,
          "Non, ce résultat n'est pas possible.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_ADD_SOUS_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_add_sous_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'opération posée 3?4 + 128 = 482, quel chiffre se cache derrière le point d'interrogation ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche d'abord le nombre entier : 482 - 128.",
    explanation: exp(
      "Un chiffre manquant se retrouve en remontant l'opération à l'envers.",
      "On calcule la soustraction pour retrouver le nombre complet, puis on lit le chiffre cherché.",
      "482 - 128 = 354. Le nombre caché est donc 354, et le chiffre des dizaines est 5.",
      "C'est le 5.",
    ),
    tags: ["ce2", "addition", "defi", "chiffre_manquant"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une école a 253 élèves. 128 partent en sortie le matin et 74 autres l'après-midi. Combien d'élèves ne sont pas partis ?",
    format: "short",
    expected: ["51"],
    comparator: "number_equal",
    hint: "Additionne d'abord les deux groupes partis.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les deux groupes partis, puis on retire ce total de l'effectif de l'école.",
      "128 + 74 = 202 élèves partis. Puis 253 - 202 = 51.",
      "51 élèves ne sont pas partis.",
    ),
    tags: ["ce2", "addition", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_add_sous_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Remonte l'opération à l'envers.",
    tags: ["ce2", "addition", "defi", "template"],
    generate: () => {
      const cache = randomInt(120, 890);
      const ajout = randomInt(100, 900);
      const total = cache + ajout;
      const rang = randomChoice([
        { nom: "des unités", chiffre: cache % 10, masque: `${Math.floor(cache / 10)}?` },
        { nom: "des dizaines", chiffre: Math.floor(cache / 10) % 10, masque: `${Math.floor(cache / 100)}?${cache % 10}` },
      ]);
      return {
        text: `Dans l'opération ${rang.masque} + ${ajout} = ${total}, quel chiffre se cache derrière le point d'interrogation ?`,
        format: "short",
        expected: [String(rang.chiffre)],
        comparator: "number_equal",
        explanation: exp(
          "Un chiffre manquant se retrouve en remontant l'opération à l'envers.",
          "On calcule la soustraction pour retrouver le nombre complet, puis on lit le chiffre cherché.",
          `${total} - ${ajout} = ${cache}. Le nombre caché est ${cache}, et son chiffre ${rang.nom} est ${rang.chiffre}.`,
          `C'est le ${rang.chiffre}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_add_sous_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Deux étapes : ce qui est parti d'abord, ce qui reste ensuite.",
    tags: ["ce2", "addition", "defi", "reunion", "deux_etapes", "template"],
    generate: () => {
      const contexte = randomChoice([
        { lieu: "la bibliothèque de l'école", quoi: "livres", verbe: "empruntés" },
        { lieu: "la coopérative", quoi: "cahiers", verbe: "distribués" },
        { lieu: "le stock de la cantine", quoi: "briques de lait", verbe: "sorties" },
      ]);
      // ⚠️ Le second retrait est borné par ce qui reste vraiment en stock :
      // sans cela, 300 - 200 - 200 sortait un reste négatif.
      const depart = randomInt(400, 900);
      const a = randomInt(50, 200);
      const b = randomInt(50, Math.min(200, depart - a - 20));
      const reste = depart - a - b;
      return {
        text: `Dans ${contexte.lieu}, il y a ${depart} ${contexte.quoi}. ${a} sont ${contexte.verbe} le matin et ${b} l'après-midi. Combien en reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : d'abord le total parti, ensuite ce qui reste.",
          "On additionne les deux quantités sorties, puis on les retire du stock de départ.",
          `${a} + ${b} = ${a + b} ${contexte.quoi} sortis. Puis ${depart} - ${a + b} = ${reste}.`,
          `Il en reste ${reste}.`,
        ),
      };
    },
  },
];
