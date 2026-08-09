// lib/tutor-v4/questionBank/cp/maths/monnaie.bank.ts
//
// La monnaie du CP, écrite à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Les montants sont des nombres entiers d'euros toujours inférieurs ou
//     égaux à cent. » ⛔ PAS DE CENTIMES, donc PAS DE VIRGULE : les centimes
//     d'euro sont introduits au CE1, en période 2 au plus tard ;
//   — le lexique à installer : plus cher, moins cher, billet, pièce, somme,
//     reste, euros ;
//   — comparer deux ensembles de pièces et de billets, déterminer leur valeur,
//     constituer une somme donnée, simuler un achat et RENDRE LA MONNAIE ;
//   — la monnaie est introduite en période 2 ou 3.
//
// LE PIÈGE DE LA NOTION, et le BO le nomme : « L'élève sait comparer deux
// ensembles constitués de pièces ou de billets du point de vue de leur valeur
// et non de celui du nombre de pièces ou de billets. » Six pièces de 1 €, cela
// fait beaucoup de pièces et peu d'argent. Le BO ajoute la clé qui fait tout
// basculer : « dix pièces de 1 € ont la même valeur qu'un billet de 10 € ».
//
// ⚠️ Au CP, les pièces sont celles de 1 € et de 2 € ; les billets ceux de 5,
// 10, 20 et 50 €. Il n'existe pas de billet de 2 € ni de pièce de 5 €.
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

const PIECES = [1, 2] as const;
const BILLETS = [5, 10, 20, 50] as const;

function accord(nb: number, singulier: string, pluriel: string) {
  return `${nb} ${nb > 1 ? pluriel : singulier}`;
}

export const monnaieBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_MONNAIE_RECONNAITRE — pièces et billets
     Avant de compter, il faut savoir ce qu'on a dans la main.
  ========================================================= */
  {
    kind: "template",
    id: "cp_monnaie_reconnaitre_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Les petites sommes sont en métal, les grandes en papier.",
    tags: ["cp", "monnaie", "reconnaitre", "template"],
    generate: () => {
      const chercheBillet = randomChoice([true, false]);
      const bonne = chercheBillet
        ? `${randomChoice([...BILLETS])} €`
        : `${randomChoice([...PIECES])} €`;
      const autres = chercheBillet
        ? PIECES.map((p) => `${p} €`)
        : BILLETS.map((b) => `${b} €`);
      return {
        text: `Parmi ces sommes, laquelle est ${chercheBillet ? "un BILLET" : "une PIÈCE"} ?`,
        format: "qcm",
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'argent existe en pièces, qui sont en métal, et en billets, qui sont en papier.",
          "On se rappelle la liste : pièces de 1 € et 2 €, billets de 5, 10, 20 et 50 €.",
          `${bonne} fait partie des ${chercheBillet ? "billets" : "pièces"}. Les autres propositions sont des ${chercheBillet ? "pièces" : "billets"}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_monnaie_reconnaitre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Existe-t-il un billet de 2 € ?",
    format: "qcm",
    choices: [
      "non, 2 € est une pièce",
      "oui, il est vert",
      "oui, mais on ne s'en sert plus",
      "on ne peut pas savoir",
    ],
    expected: ["non, 2 € est une pièce"],
    comparator: "mcq_exact",
    hint: "Cherche dans ta poche : à quoi ressemblent 2 € ?",
    explanation: exp(
      "Chaque valeur existe soit en pièce, soit en billet, jamais dans les deux.",
      "On se rappelle la liste : pièces de 1 € et 2 €, billets de 5, 10, 20 et 50 €.",
      "2 € est une pièce dorée et argentée. Le plus petit billet est celui de 5 €.",
      "Non : 2 €, c'est une pièce.",
    ),
    tags: ["cp", "monnaie", "reconnaitre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_monnaie_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Jusqu'à 2 €, c'est une pièce. À partir de 5 €, c'est un billet.",
    tags: ["cp", "monnaie", "reconnaitre", "template"],
    generate: () => {
      const valeur = randomChoice([...PIECES, ...BILLETS]);
      const bonne = valeur <= 2 ? "une pièce" : "un billet";
      return {
        text: `Est-ce que ${valeur} €, c'est une pièce ou un billet ?`,
        format: "qcm",
        choices: shuffle(["une pièce", "un billet"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les petites valeurs sont des pièces, les grandes des billets.",
          "On compare la valeur à 5 € : en dessous ce sont des pièces, à partir de 5 € des billets.",
          `${valeur} € vaut ${valeur <= 2 ? "moins de 5 €, c'est donc une pièce" : "5 € ou plus, c'est donc un billet"}.`,
          `${valeur} €, c'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MONNAIE_VALEUR — combien y a-t-il dans le porte-monnaie
  ========================================================= */
  {
    kind: "template",
    id: "cp_monnaie_valeur_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_valeur",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois sortes d'argent : compte-les l'une après l'autre.",
    tags: ["cp", "monnaie", "valeur", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20]);
      const nbDeux = randomInt(1, 4);
      const nbUn = randomInt(1, 5);
      const total = billet + nbDeux * 2 + nbUn;
      return {
        text: `Dans un porte-monnaie, il y a 1 billet de ${billet} €, ${accord(nbDeux, "pièce", "pièces")} de 2 € et ${accord(nbUn, "pièce", "pièces")} de 1 €. Combien y a-t-il d'euros ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur d'un ensemble d'argent est la somme de tout ce qu'il contient.",
          "On commence par la plus grande valeur, puis on ajoute les autres.",
          `Le billet vaut ${billet} €. Les pièces de 2 € valent ${nbDeux * 2} €. Les pièces de 1 € valent ${nbUn} €. En tout : ${billet} + ${nbDeux * 2} + ${nbUn} = ${total} €.`,
          `Il y a ${total} €.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_monnaie_valeur_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_valeur",
    difficulty: 2,
    theme: "neutral",
    text: "Combien faut-il de pièces de 1 € pour faire un billet de 10 € ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte de un en un jusqu'à dix.",
    explanation: exp(
      "Un billet de 10 € a exactement la même valeur que dix pièces de 1 €.",
      "On compte les pièces une à une jusqu'à atteindre la valeur du billet.",
      "1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Il faut dix pièces. C'est le même dix que la dizaine : dix unités font une dizaine.",
      "Il faut 10 pièces de 1 €.",
    ),
    tags: ["cp", "monnaie", "valeur", "remarquable", "dizaine"],
  },
  {
    kind: "template",
    id: "cp_monnaie_valeur_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Les billets d'abord, les pièces ensuite.",
    tags: ["cp", "monnaie", "valeur", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20]);
      const nbBillets = randomInt(1, 3);
      const piece = randomChoice([1, 2]);
      const nbPieces = randomInt(1, 4);
      const total = billet * nbBillets + piece * nbPieces;
      return {
        text: `Dans un porte-monnaie, il y a ${accord(nbBillets, "billet", "billets")} de ${billet} € et ${accord(nbPieces, "pièce", "pièces")} de ${piece} €. Combien y a-t-il d'euros ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur d'un ensemble d'argent est la somme de toutes ses pièces et de tous ses billets.",
          "On compte les billets, puis on ajoute les pièces.",
          `${nbBillets} × ${billet} € = ${billet * nbBillets} €. Les pièces valent ${piece * nbPieces} €. En tout : ${billet * nbBillets} + ${piece * nbPieces} = ${total} €.`,
          `Il y a ${total} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_monnaie_valeur_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque pièce compte pour sa valeur, pas pour un.",
    tags: ["cp", "monnaie", "valeur", "template"],
    generate: () => {
      const nb = randomInt(3, 8);
      const piece = randomChoice([1, 2]);
      const total = nb * piece;
      return {
        text: `Léa a ${nb} pièces de ${piece} €. Combien a-t-elle d'euros ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre de pièces et le nombre d'euros ne sont pas la même chose.",
          "On ajoute la valeur de chaque pièce, une par une.",
          piece === 1
            ? `${nb} pièces de 1 € font ${total} €, car chaque pièce vaut un euro.`
            : `${nb} pièces de 2 € : on compte de deux en deux, ${Array.from({ length: nb }, (_, i) => (i + 1) * 2).join(", ")}. Cela fait ${total} €.`,
          `Elle a ${total} €.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MONNAIE_COMPARER — LE piège de la notion
     « du point de vue de leur valeur et non de celui du nombre
     de pièces », écrit le BO.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_monnaie_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Malia a 6 pièces de 1 €. Kevin a 1 billet de 10 €. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Kevin",
      "Malia, elle a plus de pièces",
      "ils ont la même chose",
      "on ne peut pas savoir",
    ],
    expected: ["Kevin"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas le nombre de pièces qui compte, mais ce qu'elles valent.",
    explanation: exp(
      "On compare deux sommes d'argent d'après leur valeur, jamais d'après le nombre de pièces.",
      "On calcule la valeur de chaque porte-monnaie, puis on compare les deux nombres.",
      "Malia a 6 pièces, donc 6 €. Kevin n'a qu'un seul billet, mais il vaut 10 €. Et 10 € est plus que 6 € : Kevin a plus d'argent avec un seul papier qu'elle avec six pièces.",
      "C'est Kevin qui a le plus d'argent.",
    ),
    tags: ["cp", "monnaie", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_monnaie_comparer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Ryan a 3 pièces de 2 €. Naïla a 5 pièces de 1 €. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Ryan",
      "Naïla, elle a plus de pièces",
      "ils ont la même chose",
      "on ne peut pas savoir",
    ],
    expected: ["Ryan"],
    comparator: "mcq_exact",
    hint: "Compte les euros, pas les pièces.",
    explanation: exp(
      "Deux pièces peuvent avoir des valeurs différentes : on compte les euros, pas les objets.",
      "On calcule chaque somme séparément.",
      "Ryan : 2 + 2 + 2 = 6 €. Naïla : 1 + 1 + 1 + 1 + 1 = 5 €. Naïla a plus de pièces, mais Ryan a plus d'argent.",
      "C'est Ryan qui a le plus d'argent.",
    ),
    tags: ["cp", "monnaie", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_monnaie_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux sommes avant de choisir.",
    tags: ["cp", "monnaie", "comparer", "piege", "template"],
    generate: () => {
      // On tire exprès la configuration qui piège : celui qui a le PLUS de
      // pièces a le MOINS d'argent.
      const nbA = randomInt(4, 9);
      const totalA = nbA; // pièces de 1 €
      const billet = randomChoice([10, 20]);
      const totalB = billet;
      const [a, b] = shuffle(["Malia", "Kevin", "Naïla", "Ryan", "Léa", "Enzo"]).slice(0, 2);
      return {
        text: `${a} a ${nbA} pièces de 1 €. ${b} a 1 billet de ${billet} €. Qui a le plus d'argent ?`,
        format: "qcm",
        choices: makeChoices(b, [
          a,
          "ils ont la même chose",
          "on ne peut pas savoir",
        ]),
        expected: [b],
        comparator: "mcq_exact",
        explanation: exp(
          "On compare des sommes d'argent d'après leur valeur, pas d'après le nombre de pièces.",
          "On calcule chaque somme, puis on compare.",
          `${a} a ${totalA} €. ${b} n'a qu'un seul billet, mais il vaut ${totalB} €. Et ${totalB} est plus grand que ${totalA}.`,
          `C'est ${b} qui a le plus d'argent.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_monnaie_comparer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_comparer",
    difficulty: 3,
    theme: "reunion",
    hint: "« Moins cher » veut dire que le prix est plus petit.",
    tags: ["cp", "monnaie", "comparer", "lexique", "reunion", "template"],
    generate: () => {
      const objets = shuffle([
        { nom: "un samoussa", prix: 1 },
        { nom: "un bonbon piment", prix: 2 },
        { nom: "un pain bouchon", prix: 3 },
        { nom: "une bouteille d'eau", prix: 2 },
        { nom: "un sandwich", prix: 5 },
        { nom: "une part de gâteau patate", prix: 4 },
      ]).slice(0, 2);
      while (objets[0].prix === objets[1].prix) {
        objets[1] = randomChoice([
          { nom: "un sandwich", prix: 5 },
          { nom: "un pain bouchon", prix: 3 },
          { nom: "un samoussa", prix: 1 },
        ]);
      }
      const chercheMoinsCher = randomChoice([true, false]);
      const trie = [...objets].sort((x, y) => x.prix - y.prix);
      const bonne = chercheMoinsCher ? trie[0].nom : trie[1].nom;
      return {
        text: `Au snack, ${objets[0].nom} coute ${objets[0].prix} € et ${objets[1].nom} coute ${objets[1].prix} €. Qu'est-ce qui est le ${chercheMoinsCher ? "MOINS" : "PLUS"} cher ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          chercheMoinsCher ? trie[1].nom : trie[0].nom,
          "les deux coutent pareil",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "« Moins cher » veut dire que le prix est plus petit, « plus cher » qu'il est plus grand.",
          "On compare les deux prix comme deux nombres.",
          `${trie[0].prix} € est plus petit que ${trie[1].prix} € : ${trie[0].nom} est donc le moins cher.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MONNAIE_CONSTITUER — fabriquer une somme donnée
  ========================================================= */
  {
    kind: "template",
    id: "cp_monnaie_constituer_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le billet est déjà posé. Cherche ce qui manque.",
    tags: ["cp", "monnaie", "constituer", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20]);
      const manque = randomInt(1, 8);
      const somme = billet + manque;
      return {
        text: `Tu as un billet de ${billet} € et beaucoup de pièces de 1 €. Combien de pièces faut-il ajouter au billet pour faire ${somme} € ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Constituer une somme, c'est réunir des pièces et des billets qui font exactement le montant demandé.",
          "On pose d'abord la plus grande valeur, puis on complète avec les pièces.",
          `Le billet vaut ${billet} €. De ${billet} à ${somme}, il manque ${manque} € : il faut donc ${manque} pièces de 1 €.`,
          `Il faut ${manque} pièces.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_monnaie_constituer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois le billet tient-il dans la somme ?",
    tags: ["cp", "monnaie", "constituer", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20]);
      const nb = randomInt(2, 5);
      const somme = billet * nb;
      return {
        text: `Combien faut-il de billets de ${billet} € pour faire ${somme} € ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Constituer une somme avec des billets identiques, c'est chercher combien de fois le billet tient dans le montant.",
          "On compte de billet en billet jusqu'à atteindre la somme.",
          `On compte : ${Array.from({ length: nb }, (_, i) => `${(i + 1) * billet} €`).join(", ")}. Il a fallu ${nb} billets.`,
          `Il faut ${nb} billets de ${billet} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_monnaie_constituer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_constituer",
    difficulty: 4,
    theme: "neutral",
    hint: "Prends d'abord le plus grand billet possible, puis complète.",
    tags: ["cp", "monnaie", "constituer", "template"],
    generate: () => {
      const dizaines = randomInt(1, 5);
      const unites = randomInt(1, 4);
      const somme = dizaines * 10 + unites;
      return {
        text: `Tu dois payer ${somme} € avec des billets de 10 € et des pièces de 1 €, en utilisant le moins d'argent possible. Combien prends-tu de billets de 10 € ?`,
        format: "short",
        expected: [String(dizaines)],
        comparator: "number_equal",
        explanation: exp(
          "Pour utiliser le moins de pièces et de billets possible, on commence toujours par les plus grandes valeurs.",
          "On lit le chiffre des dizaines : il donne le nombre de billets de 10 €.",
          `${somme} = ${dizaines} dizaines et ${unites} unités. On prend donc ${dizaines} billets de 10 €, puis ${unites} pièces de 1 €.`,
          `On prend ${dizaines} billets de 10 €.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MONNAIE_RENDRE — rendre la monnaie
     Le piège : rendre le PRIX au lieu de ce qui reste.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_monnaie_rendre_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_rendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un livre coute 7 €. Tu paies avec un billet de 10 €. Combien la marchande doit-elle te rendre ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "De 7 à 10, combien manque-t-il ?",
    explanation: exp(
      "Rendre la monnaie, c'est redonner ce qui a été payé en trop.",
      "On cherche l'écart entre ce qu'on a donné et le prix.",
      "De 7 à 10, il faut ajouter 3 : 7 + 3 = 10. La marchande rend donc 3 €. Elle ne rend pas 7 € : 7 €, c'est ce que le livre coute.",
      "Elle doit rendre 3 €.",
    ),
    tags: ["cp", "monnaie", "rendre", "piege"],
  },
  {
    kind: "fixed",
    id: "cp_monnaie_rendre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_rendre",
    difficulty: 2,
    theme: "neutral",
    text: "Tu paies un objet qui coute exactement 5 € avec un billet de 5 €. Que te rend la marchande ?",
    format: "qcm",
    choices: ["rien", "5 €", "1 €", "10 €"],
    expected: ["rien"],
    comparator: "mcq_exact",
    hint: "As-tu donné plus que le prix ?",
    explanation: exp(
      "On ne rend de la monnaie que si l'on a donné plus que le prix.",
      "On compare ce qu'on donne et ce que l'objet coute.",
      "Le billet vaut 5 € et l'objet coute 5 € : c'est exactement le compte. Il n'y a rien en trop, donc rien à rendre.",
      "Elle ne rend rien.",
    ),
    tags: ["cp", "monnaie", "rendre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_monnaie_rendre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_rendre",
    difficulty: 4,
    theme: "reunion",
    hint: "Cherche ce qui manque pour aller du prix jusqu'au billet.",
    tags: ["cp", "monnaie", "rendre", "reunion", "template"],
    generate: () => {
      const billet = randomChoice([10, 20]);
      const prix = randomInt(2, billet - 2);
      const rendu = billet - prix;
      const achat = randomChoice([
        "un paquet de letchis",
        "un jeu de cartes",
        "un cahier",
        "une bouteille de jus",
        "un ballon",
      ]);
      return {
        text: `${achat.charAt(0).toUpperCase()}${achat.slice(1)} coute ${prix} €. Tu paies avec un billet de ${billet} €. Combien te rend-on ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "La monnaie rendue, c'est la différence entre ce qu'on a donné et le prix.",
          "On part du prix et on compte ce qui manque pour arriver au billet.",
          `De ${prix} à ${billet}, il manque ${rendu} : ${prix} + ${rendu} = ${billet}.`,
          `On te rend ${rendu} €.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MONNAIE_DEFI — ce qui ne s'obtient pas en appliquant une
     règle : payer avec le moins d'argent possible, et trouver
     deux façons de faire la même somme.
  ========================================================= */
  {
    kind: "template",
    id: "cp_monnaie_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte de deux en deux jusqu'au montant.",
    tags: ["cp", "monnaie", "defi", "template"],
    generate: () => {
      const nb = randomInt(2, 9);
      const somme = nb * 2;
      return {
        text: `Tu dois faire ${somme} € avec des pièces de 2 € seulement. Combien t'en faut-il ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Fabriquer une somme avec des pièces identiques, c'est compter de cette valeur en cette valeur.",
          "On avance de 2 en 2 jusqu'à atteindre le montant.",
          `On compte : ${Array.from({ length: nb }, (_, i) => (i + 1) * 2).join(", ")}. Il a fallu ${nb} pièces.`,
          `Il faut ${nb} pièces de 2 €.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_monnaie_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Tu dois payer 48 € en utilisant le moins de billets et de pièces possible. Tu as des billets de 20 €, de 10 €, des pièces de 2 € et de 1 €. Combien de billets de 20 € prends-tu ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Commence toujours par la plus grande valeur, tant qu'elle ne dépasse pas.",
    explanation: exp(
      "Payer avec le moins d'argent possible, c'est prendre à chaque fois la plus grande valeur qui ne dépasse pas.",
      "On essaie les billets du plus grand au plus petit.",
      "Deux billets de 20 € font 40 €, et un troisième en ferait 60 € : c'est trop. On prend donc 2 billets de 20 €. Il reste 8 € à payer : un billet ne convient plus, on complète avec 4 pièces de 2 €.",
      "On prend 2 billets de 20 €.",
    ),
    tags: ["cp", "monnaie", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_monnaie_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "monnaie",
    microId: "cp_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare ce que valent les deux tas avant de répondre.",
    tags: ["cp", "monnaie", "defi", "template"],
    generate: () => {
      const nbUn = randomInt(2, 8);
      const nbDeux = randomInt(2, 6);
      const totalUn = nbUn;
      const totalDeux = nbDeux * 2;
      const memeChose = totalUn === totalDeux;
      const bonne = memeChose
        ? "les deux tas valent pareil"
        : totalUn > totalDeux
          ? "le tas de pièces de 1 €"
          : "le tas de pièces de 2 €";
      return {
        text: `Un tas contient ${nbUn} pièces de 1 €, un autre contient ${nbDeux} pièces de 2 €. Quel tas vaut le plus ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "le tas de pièces de 1 €",
          "le tas de pièces de 2 €",
          "les deux tas valent pareil",
          "celui qui a le plus de pièces",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La valeur d'un tas ne dépend pas du nombre de pièces mais de ce que chacune vaut.",
          "On calcule les deux totaux, puis on les compare.",
          `Le premier tas vaut ${totalUn} €. Le second vaut ${nbDeux} × 2 = ${totalDeux} €. ${memeChose ? "Les deux totaux sont égaux." : `${Math.max(totalUn, totalDeux)} est plus grand que ${Math.min(totalUn, totalDeux)}.`}`,
          memeChose ? "Les deux tas valent pareil." : `C'est ${bonne}.`,
        ),
      };
    },
  },
];
