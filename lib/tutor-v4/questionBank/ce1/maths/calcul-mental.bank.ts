// lib/tutor-v4/questionBank/ce1/maths/calcul-mental.bank.ts
//
// Le calcul mental du CE1, écrit à la main. C'est la partie du programme la
// plus détaillée : le texte nomme chaque procédure, une par une, et donne
// jusqu'à la trace écrite sur l'ardoise.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). Trois
// familles :
//   MÉMORISER — tables d'addition et de multiplication dans les deux sens ;
//     faits multiplicatifs usuels : doubles jusqu'à 15, doubles de 20, 25, 30,
//     35, 40, 45, 50, doubles de 100 à 500, moitiés des nombres pairs jusqu'à
//     30, moitiés des dizaines et des centaines entières, multiples de 25.
//   NUMÉRATION — ajouter ou soustraire un nombre entier de dizaines ou de
//     centaines ; multiplier par 10 un nombre plus petit que 100.
//   PROCÉDURES — ajouter 9, 19 ou 29 ; soustraire 9 ; soustraire un nombre
//     plus petit que 9 ; déterminer la moitié d'un nombre pair ; calculer le
//     produit d'un nombre entre 11 et 19 par un nombre plus petit que 10, en
//     décomposant.
//
// ⚠️ CE QUI N'EST PAS DU CE1, et que la synthèse d'attendus laissait croire :
// multiplier par 4 ou par 8, multiplier par un nombre entier de dizaines,
// décomposer un facteur entre 11 et 99, ajouter 8, 18, 28, 38 ou 39. Tout cela
// est du CE2. On s'en tient au texte.
//
// Le champ numérique reste sous 1 000 : nombres en jeu ET résultats.
//
// LE PIÈGE DES PROCÉDURES : ajouter 9, c'est ajouter 10 puis enlever 1. Les
// élèves enlèvent souvent 1 avant d'ajouter 10, ou oublient d'enlever. Même
// chose pour 19 et 29.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

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

export const calculMentalBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_CALCUL_TABLES_ADDITION — dans les deux sens
     Le programme mesure la fluence : douze égalités à trou en
     une minute à la fin du CE1.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_tables_addition_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre manque : 4 + … = 12 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte de 4 jusqu'à 12.",
    explanation: exp(
      "Connaître les tables d'addition dans les deux sens, c'est savoir retrouver n'importe lequel des trois nombres d'une égalité.",
      "On part du nombre connu et on avance jusqu'au total.",
      "De 4 à 12, il y a 8 : 4 + 8 = 12. On peut aussi dire 12 - 4 = 8.",
      "Il manque 8.",
    ),
    tags: ["ce1", "calcul_mental", "tables_addition"],
  },
  {
    kind: "template",
    id: "ce1_calcul_tables_addition_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qu'il faut ajouter pour atteindre le total.",
    tags: ["ce1", "calcul_mental", "tables_addition", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const total = a + b;
      const trou = randomChoice(["premier", "second"] as const);
      return {
        text: trou === "premier"
          ? `Quel nombre manque : … + ${b} = ${total} ?`
          : `Quel nombre manque : ${a} + … = ${total} ?`,
        format: "short",
        expected: [String(trou === "premier" ? a : b)],
        comparator: "number_equal",
        explanation: exp(
          "Une table d'addition se lit dans les deux sens : on peut retrouver le total ou l'un des deux termes.",
          "On part du terme connu et on compte jusqu'au total.",
          `${a} + ${b} = ${total}, donc le nombre qui manque est ${trou === "premier" ? a : b}.`,
          `Il manque ${trou === "premier" ? a : b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_TABLES_MULTIPLICATION — dans les deux sens
  ========================================================= */
  {
    kind: "template",
    id: "ce1_calcul_tables_multiplication_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Récite la table jusqu'au résultat.",
    tags: ["ce1", "calcul_mental", "tables_multiplication", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 10] as const);
      const b = randomInt(2, 10);
      const p = a * b;
      return {
        text: `Quel nombre manque : ${a} × … = ${p} ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Une table de multiplication se lit dans les deux sens : on peut retrouver le produit ou l'un des facteurs.",
          `On récite la table de ${a} jusqu'à tomber sur ${p}.`,
          `${a} × ${b} = ${p} : il faut ${b} fois ${a} pour arriver à ${p}.`,
          `Il manque ${b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_FAITS_MULTIPLICATIFS — les faits à connaître
     Le programme en donne la liste : doubles, moitiés, et les
     multiples de 25.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_faits_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_faits_multiplicatifs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 4 × 25 ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Quatre pièces de 25 centimes font un euro.",
    explanation: exp(
      "Les multiples de 25 sont des faits à connaître par cœur : 25, 50, 75, 100.",
      "On compte de 25 en 25, ou on pense aux pièces de monnaie.",
      "25, 50, 75, 100 : quatre fois vingt-cinq font cent. C'est aussi quatre pièces de 25 centimes, qui font un euro.",
      "4 × 25 = 100.",
    ),
    tags: ["ce1", "calcul_mental", "faits", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_calcul_faits_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_faits_multiplicatifs",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte de 25 en 25.",
    tags: ["ce1", "calcul_mental", "faits", "template"],
    generate: () => {
      const n = randomInt(1, 4);
      const p = n * 25;
      return {
        text: `Combien font ${n} × 25 ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "Les multiples de 25 se retiennent par cœur : 25, 50, 75, 100.",
          "On compte de 25 en 25 autant de fois qu'il le faut.",
          `${Array.from({ length: n }, (_, i) => (i + 1) * 25).join(", ")} : le ${n}ᵉ est ${p}.`,
          `${n} × 25 = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_DOUBLES_MOITIES — les doubles et les moitiés
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_doubles_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_doubles_moities",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le double de 35 ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "35 + 35.",
    explanation: exp(
      "Le double d'un nombre, c'est ce nombre pris deux fois.",
      "On additionne le nombre avec lui-même, en séparant les dizaines des unités.",
      "30 + 30 = 60, et 5 + 5 = 10. 60 + 10 = 70.",
      "Le double de 35 est 70.",
    ),
    tags: ["ce1", "calcul_mental", "doubles", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_calcul_doubles_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_doubles_moities",
    difficulty: 3,
    theme: "neutral",
    hint: "Sépare les dizaines et les unités avant de doubler.",
    tags: ["ce1", "calcul_mental", "doubles", "template"],
    generate: () => {
      const cherche = randomChoice(["double", "moitié"] as const);
      if (cherche === "double") {
        const n = randomChoice([...Array.from({ length: 15 }, (_, i) => i + 1), 20, 25, 30, 35, 40, 45, 50, 100, 200, 300]);
        return {
          text: `Quel est le double de ${n} ?`,
          format: "short",
          expected: [String(n * 2)],
          comparator: "number_equal",
          explanation: exp(
            "Le double d'un nombre, c'est ce nombre pris deux fois.",
            "On additionne le nombre avec lui-même.",
            `${n} + ${n} = ${n * 2}.`,
            `Le double de ${n} est ${n * 2}.`,
          ),
        };
      }
      const moitie = randomChoice([...Array.from({ length: 15 }, (_, i) => i + 1), 20, 25, 30, 40, 50, 100, 150, 200]);
      const n = moitie * 2;
      return {
        text: `Quelle est la moitié de ${n} ?`,
        format: "short",
        expected: [String(moitie)],
        comparator: "number_equal",
        explanation: exp(
          "La moitié d'un nombre, c'est ce qu'on obtient en le partageant en deux parts égales.",
          "On cherche le nombre qui, ajouté à lui-même, redonne le nombre de départ.",
          `${moitie} + ${moitie} = ${n}. La moitié de ${n} est donc ${moitie}.`,
          `La moitié de ${n} est ${moitie}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_COMPLEMENTS_100 — compléter à la dizaine
     ou à la centaine supérieure. C'est la procédure du CP,
     réinvestie toute l'année, et l'appui du rendu de monnaie.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_calcul_complements_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_complements_100",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le chiffre des unités et complète-le à 10.",
    tags: ["ce1", "calcul_mental", "complements", "template"],
    generate: () => {
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const manque = 10 - u;
      return {
        text: `Combien faut-il ajouter à ${n} pour atteindre la dizaine supérieure ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "La dizaine supérieure est la dizaine juste après le nombre.",
          "On regarde le chiffre des unités et on cherche son complément à 10.",
          `${n}, c'est ${d} dizaines et ${u} unités. Le complément de ${u} à 10 est ${manque} : ${n} + ${manque} = ${(d + 1) * 10}.`,
          `Il faut ajouter ${manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_complements_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_complements_100",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien manque-t-il pour arriver à la centaine juste après ?",
    tags: ["ce1", "calcul_mental", "complements", "template"],
    generate: () => {
      const c = randomInt(1, 8);
      const reste = randomInt(1, 9) * 10;
      const n = c * 100 + reste;
      const manque = 100 - reste;
      return {
        text: `Combien faut-il ajouter à ${n} pour atteindre la centaine supérieure ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "La centaine supérieure est la centaine juste après le nombre.",
          "On regarde ce qui dépasse la centaine, puis on cherche son complément à 100.",
          `${n} dépasse ${c * 100} de ${reste}. Le complément de ${reste} à 100 est ${manque} : ${n} + ${manque} = ${(c + 1) * 100}.`,
          `Il faut ajouter ${manque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_DIZAINES_CENTAINES — ajouter des dizaines
     ou des centaines entières
  ========================================================= */
  {
    kind: "template",
    id: "ce1_calcul_dizaines_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_dizaines_centaines",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne touche qu'aux dizaines, ou qu'aux centaines.",
    tags: ["ce1", "calcul_mental", "dizaines", "template"],
    generate: () => {
      const rang = randomChoice([10, 100] as const);
      const c = randomInt(1, 5);
      const d = randomInt(1, 4);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const combien = randomInt(1, 4) * rang;
      const total = n + combien;
      return {
        text: `Combien font ${n} + ${combien} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          rang === 10
            ? "Ajouter un nombre entier de dizaines, c'est ajouter des dizaines aux dizaines."
            : "Ajouter un nombre entier de centaines, c'est ajouter des centaines aux centaines.",
          "On s'appuie sur la numération : seul le rang concerné change.",
          `${n} + ${combien} = ${total}. Les autres rangs ne bougent pas.`,
          `Cela fait ${total}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_MULTIPLIER_10 — multiplier par 10
     Le programme l'explique par la numération, pas par « on
     ajoute un zéro » : chaque unité devient une dizaine.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_calcul_multiplier_10_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_multiplier_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chiffre monte d'un rang.",
    tags: ["ce1", "calcul_mental", "multiplier_10", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const p = n * 10;
      return {
        text: `Combien font 10 × ${n} ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 donne à chaque chiffre une valeur dix fois plus grande.",
          "Les unités deviennent des dizaines, les dizaines deviennent des centaines.",
          `Dans ${n}, le ${Math.floor(n / 10)} des dizaines devient ${Math.floor(n / 10)} centaines et le ${n % 10} des unités devient ${n % 10} dizaines : ${p}.`,
          `10 × ${n} = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_AJOUTER_9_19_29 — la procédure du programme
     LE piège : ajouter 10 puis enlever 1, dans cet ordre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_ajouter_9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_ajouter_9_19_29_39",
    difficulty: 3,
    theme: "neutral",
    text: "Pour ajouter 9 à un nombre, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis enlever 1",
      "ajouter 10, puis ajouter 1",
      "enlever 10, puis ajouter 1",
      "ajouter 1 neuf fois de suite",
    ],
    expected: ["ajouter 10, puis enlever 1"],
    comparator: "mcq_exact",
    hint: "9, c'est 10 moins 1.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine puis reprendre l'unité en trop.",
      "On ajoute d'abord 10, ce qui est facile, puis on enlève 1.",
      "Pour 37 + 9 : 37 + 10 = 47, puis 47 - 1 = 46. On a bien ajouté 9, car 10 - 1 = 9.",
      "On ajoute 10, puis on enlève 1.",
    ),
    tags: ["ce1", "calcul_mental", "ajouter_9", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_calcul_ajouter_9_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_ajouter_9_19_29_39",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute la dizaine ronde, puis enlève 1.",
    tags: ["ce1", "calcul_mental", "ajouter_9", "template"],
    generate: () => {
      const ajout = randomChoice([9, 19, 29] as const);
      const rond = ajout + 1;
      const n = randomInt(23, 400);
      const total = n + ajout;
      return {
        text: `Combien font ${n} + ${ajout} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `Ajouter ${ajout}, c'est ajouter ${rond} puis enlever 1.`,
          "On ajoute d'abord le nombre rond, ce qui est facile, puis on reprend l'unité en trop.",
          `${n} + ${rond} = ${n + rond}, puis ${n + rond} - 1 = ${total}.`,
          `${n} + ${ajout} = ${total}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_SOUSTRAIRE_9 — l'inverse de la procédure
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_soustraire_9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_9",
    difficulty: 3,
    theme: "neutral",
    text: "Pour soustraire 9 à un nombre, que peut-on faire ?",
    format: "qcm",
    choices: [
      "enlever 10, puis ajouter 1",
      "enlever 10, puis enlever 1",
      "ajouter 10, puis enlever 1",
      "enlever 1 neuf fois de suite",
    ],
    expected: ["enlever 10, puis ajouter 1"],
    comparator: "mcq_exact",
    hint: "On a enlevé une unité de trop : il faut la rendre.",
    explanation: exp(
      "Soustraire 9, c'est enlever une dizaine puis rendre l'unité enlevée en trop.",
      "On enlève d'abord 10, ce qui est facile, puis on ajoute 1.",
      "Pour 54 - 9 : 54 - 10 = 44, puis 44 + 1 = 45. On a bien enlevé 9, car 10 - 1 = 9.",
      "On enlève 10, puis on ajoute 1.",
    ),
    tags: ["ce1", "calcul_mental", "soustraire_9", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_calcul_soustraire_9_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève 10, puis rends 1.",
    tags: ["ce1", "calcul_mental", "soustraire_9", "template"],
    generate: () => {
      const n = randomInt(25, 500);
      const reste = n - 9;
      return {
        text: `Combien font ${n} - 9 ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Soustraire 9, c'est enlever 10 puis rendre 1.",
          "On enlève d'abord la dizaine, ce qui est facile, puis on rend l'unité enlevée en trop.",
          `${n} - 10 = ${n - 10}, puis ${n - 10} + 1 = ${reste}.`,
          `${n} - 9 = ${reste}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_SOUSTRAIRE_INFERIEUR_9 — passer par la dizaine
     Le programme détaille : pour 523 - 7, on descend d'abord à
     520, puis on enlève ce qui reste.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_soustraire_inf9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_inferieur_9",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer 523 - 7 de tête, quelle étape est la plus commode ?",
    format: "qcm",
    choices: [
      "descendre d'abord à 520, puis enlever ce qui reste",
      "enlever 7 aux centaines",
      "enlever 10 puis ajouter 3",
      "poser l'opération, on ne peut pas faire autrement",
    ],
    expected: ["descendre d'abord à 520, puis enlever ce qui reste"],
    comparator: "mcq_exact",
    hint: "On s'arrête d'abord sur la dizaine ronde la plus proche.",
    explanation: exp(
      "Quand il n'y a pas assez d'unités, on descend d'abord jusqu'à la dizaine ronde.",
      "On enlève juste ce qu'il faut pour atteindre la dizaine, puis le reste de la soustraction.",
      "523 - 3 = 520. Il reste à enlever 4, car 7 = 3 + 4 : 520 - 4 = 516.",
      "On descend d'abord à 520, puis on enlève ce qui reste.",
    ),
    tags: ["ce1", "calcul_mental", "soustraire", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_calcul_soustraire_inf9_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_inferieur_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Descends d'abord à la dizaine ronde.",
    tags: ["ce1", "calcul_mental", "soustraire", "template"],
    generate: () => {
      // Le chiffre des unités est plus petit que ce qu'on retire : c'est là que
      // le passage par la dizaine sert.
      const u = randomInt(1, 5);
      const retire = randomInt(u + 1, 8);
      const n = randomInt(11, 90) * 10 + u;
      const reste = n - retire;
      return {
        text: `Combien font ${n} - ${retire} ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand il n'y a pas assez d'unités, on descend d'abord jusqu'à la dizaine ronde.",
          "On enlève ce qu'il faut pour atteindre la dizaine, puis le reste.",
          `${n} - ${u} = ${n - u}. Il reste à enlever ${retire - u}, car ${retire} = ${u} + ${retire - u} : ${n - u} - ${retire - u} = ${reste}.`,
          `${n} - ${retire} = ${reste}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_MOITIE_NOMBRE_PAIR — la moitié d'un nombre pair
     Le programme décompose : moitié de 470 = moitié de 400 plus
     moitié de 70.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_moitie_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_moitie_nombre_pair",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la moitié de 46 ?",
    format: "short",
    expected: ["23"],
    comparator: "number_equal",
    hint: "Coupe 46 en 40 et 6, puis prends la moitié de chaque morceau.",
    explanation: exp(
      "Pour trouver la moitié d'un nombre pair, on peut le couper en morceaux dont on connaît les moitiés.",
      "On décompose en dizaines et unités, on prend la moitié de chaque, puis on additionne.",
      "46 = 40 + 6. La moitié de 40 est 20, celle de 6 est 3. 20 + 3 = 23.",
      "La moitié de 46 est 23.",
    ),
    tags: ["ce1", "calcul_mental", "moitie", "methode"],
  },
  {
    kind: "template",
    id: "ce1_calcul_moitie_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_moitie_nombre_pair",
    difficulty: 4,
    theme: "neutral",
    hint: "Décompose le nombre avant de le partager en deux.",
    tags: ["ce1", "calcul_mental", "moitie", "template"],
    generate: () => {
      const dizaines = randomInt(1, 4) * 2; // dizaines paires : moitié facile
      const unites = randomInt(1, 4) * 2;
      const n = dizaines * 10 + unites;
      const moitie = n / 2;
      return {
        text: `Quelle est la moitié de ${n} ?`,
        format: "short",
        expected: [String(moitie)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver la moitié d'un nombre pair, on le coupe en morceaux dont on connaît les moitiés.",
          "On décompose en dizaines et unités, on prend la moitié de chaque, puis on additionne.",
          `${n} = ${dizaines * 10} + ${unites}. La moitié de ${dizaines * 10} est ${(dizaines * 10) / 2}, celle de ${unites} est ${unites / 2}. ${(dizaines * 10) / 2} + ${unites / 2} = ${moitie}.`,
          `La moitié de ${n} est ${moitie}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_DISTRIBUTIVITE — décomposer un facteur
     Le programme s'arrête à un facteur compris entre 11 et 19.
     « 13 fois 7, c'est 10 fois 7 plus 3 fois 7. »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_distributivite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_distributivite",
    difficulty: 4,
    theme: "neutral",
    text: "Comment calculer 13 × 7 de tête ?",
    format: "qcm",
    choices: [
      "10 × 7 puis 3 × 7, et on additionne",
      "13 + 7",
      "10 × 7 puis on ajoute 3",
      "on ne peut pas, il faut poser l'opération",
    ],
    expected: ["10 × 7 puis 3 × 7, et on additionne"],
    comparator: "mcq_exact",
    hint: "13, c'est 10 et 3.",
    explanation: exp(
      "On peut couper un facteur en deux morceaux plus faciles, puis additionner les deux produits.",
      "On décompose le plus grand facteur en dizaines et unités.",
      "13 × 7 = 10 × 7 + 3 × 7 = 70 + 21 = 91. Ajouter seulement 3 donnerait 73, ce qui oublie que chaque unité compte 7 fois.",
      "On fait 10 × 7 puis 3 × 7, et on additionne.",
    ),
    tags: ["ce1", "calcul_mental", "distributivite", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_calcul_distributivite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_distributivite",
    difficulty: 5,
    theme: "neutral",
    hint: "Coupe le grand facteur en 10 et le reste.",
    tags: ["ce1", "calcul_mental", "distributivite", "template"],
    generate: () => {
      const grand = randomInt(11, 19);
      const petit = randomInt(2, 9);
      const reste = grand - 10;
      const produit = grand * petit;
      return {
        text: `Combien font ${grand} × ${petit} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "On peut couper un facteur en deux morceaux plus faciles, puis additionner les deux produits.",
          "On décompose le plus grand facteur en 10 et ce qui dépasse.",
          `${grand} = 10 + ${reste}. Donc ${grand} × ${petit} = 10 × ${petit} + ${reste} × ${petit} = ${10 * petit} + ${reste * petit} = ${produit}.`,
          `${grand} × ${petit} = ${produit}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CALCUL_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel calcul est le plus rapide à faire de tête : 48 + 9 ou 48 + 10 - 1 ?",
    format: "qcm",
    choices: [
      "les deux donnent le même résultat, et le second est plus facile",
      "le premier, parce qu'il a moins d'étapes",
      "les deux donnent des résultats différents",
      "aucun des deux ne se fait de tête",
    ],
    expected: ["les deux donnent le même résultat, et le second est plus facile"],
    comparator: "mcq_exact",
    hint: "Ajouter 10 est plus simple qu'ajouter 9.",
    explanation: exp(
      "Une bonne procédure de calcul mental remplace un calcul difficile par deux calculs faciles.",
      "On compare les deux chemins et on garde celui où chaque étape est simple.",
      "48 + 10 = 58, puis 58 - 1 = 57. Et 48 + 9 = 57 aussi. Ajouter une dizaine ne demande aucun effort, enlever 1 non plus.",
      "Les deux donnent 57, et le second chemin est plus facile.",
    ),
    tags: ["ce1", "calcul_mental", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_calcul_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : chacune est facile.",
    tags: ["ce1", "calcul_mental", "defi", "template"],
    generate: () => {
      const n = randomInt(30, 300);
      const dizaines = randomInt(2, 6) * 10;
      const ajout9 = randomChoice([9, 19] as const);
      const total = n + dizaines + ajout9;
      return {
        text: `Combien font ${n} + ${dizaines} + ${ajout9} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On enchaîne deux procédures faciles au lieu d'un calcul difficile.",
          "On ajoute d'abord les dizaines entières, puis on ajoute le nombre rond et on enlève 1.",
          `${n} + ${dizaines} = ${n + dizaines}. Puis ${n + dizaines} + ${ajout9 + 1} = ${n + dizaines + ajout9 + 1}, et on enlève 1 : ${total}.`,
          `Cela fait ${total}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Double, puis double encore.",
    tags: ["ce1", "calcul_mental", "defi", "template"],
    generate: () => {
      const n = randomInt(11, 60);
      const quadruple = n * 4;
      return {
        text: `Quel est le double du double de ${n} ?`,
        format: "short",
        expected: [String(quadruple)],
        comparator: "number_equal",
        explanation: exp(
          "Doubler deux fois de suite revient à multiplier par quatre.",
          "On calcule le premier double, puis on double le résultat.",
          `Le double de ${n} est ${n * 2}. Le double de ${n * 2} est ${quadruple}.`,
          `Cela fait ${quadruple}.`,
        ),
      };
    },
  },
  // ============================================================
  // COMPLÉMENTS DU 09/08/2026 — douze micro-compétences n'avaient qu'une ou
  // deux questions : à la troisième, l'élève revoyait la première. Tous les
  // ajouts sont des GÉNÉRATEURS, chacun sur un angle absent de la banque.
  // ============================================================

  {
    kind: "template",
    id: "ce1_calcul_tables_addition_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "La somme est écrite à GAUCHE : le signe = se lit dans les deux sens.",
    tags: ["ce1", "calcul_mental", "tables", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return {
        text: `Quel nombre manque : ${a + b} = ${a} + … ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Une table d'addition se connait dans les deux sens : A + B = C, mais aussi C = A + B.",
          "On cherche ce qu'il faut ajouter à droite pour retrouver le nombre de gauche.",
          `${a} et combien font ${a + b} ? Il faut ${b}, car ${a} + ${b} = ${a + b}.`,
          `Le nombre manquant est ${b}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_tables_multiplication_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Les tables du CE1 sont celles de 2, de 5 et de 10.",
    tags: ["ce1", "calcul_mental", "tables_multiplication", "template"],
    generate: () => {
      const table = randomChoice([2, 5, 10]);
      const k = randomInt(2, 9);
      return {
        text: `Combien font ${table} × ${k} ?`,
        format: "short",
        expected: [String(table * k)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables de 2, de 5 et de 10 se restituent de mémoire.",
          "Si le résultat ne vient pas, on compte de table en table.",
          table === 2
            ? `On compte de deux en deux, ${k} fois : ${table * k}. C'est aussi le double de ${k}.`
            : table === 5
              ? `On compte de cinq en cinq, ${k} fois : ${table * k}. Les résultats se terminent tous par 0 ou par 5.`
              : `Multiplier par 10, c'est ajouter un zéro : ${k} devient ${table * k}.`,
          `${table} × ${k} = ${table * k}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_tables_multiplication_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_multiplication",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche dans quelle table se trouve ce résultat.",
    tags: ["ce1", "calcul_mental", "tables_multiplication", "template"],
    generate: () => {
      const table = randomChoice([2, 5, 10]);
      const k = randomInt(2, 9);
      const r = table * k;
      return {
        text: `Quel nombre manque : … × ${k} = ${r} ?`,
        format: "short",
        expected: [String(table)],
        comparator: "number_equal",
        explanation: exp(
          "Connaitre une table dans les deux sens, c'est aussi savoir retrouver un facteur.",
          "On cherche par combien multiplier le nombre connu pour atteindre le résultat.",
          `${table} × ${k} = ${r}. Le facteur manquant est donc ${table}.`,
          `Le nombre manquant est ${table}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_faits_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_faits_multiplicatifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Quatre paquets de 25 font 100.",
    tags: ["ce1", "calcul_mental", "faits_multiplicatifs", "template"],
    generate: () => {
      const fait = randomChoice([
        { texte: "Combien de fois 25 faut-il pour faire 100 ?", reponse: 4, pourquoi: "25 + 25 + 25 + 25 = 100." },
        { texte: "Combien de fois 50 faut-il pour faire 100 ?", reponse: 2, pourquoi: "50 + 50 = 100." },
        { texte: "Combien de fois 20 faut-il pour faire 100 ?", reponse: 5, pourquoi: "20, 40, 60, 80, 100 : cinq fois." },
        { texte: "Combien de fois 10 faut-il pour faire 100 ?", reponse: 10, pourquoi: "Dix dizaines font une centaine." },
      ]);
      return {
        text: fait.texte,
        format: "short",
        expected: [String(fait.reponse)],
        comparator: "number_equal",
        explanation: exp(
          "Certains produits se retiennent comme des faits, parce qu'ils reviennent tout le temps.",
          "On compte de la valeur en la valeur jusqu'à 100.",
          fait.pourquoi,
          `Il en faut ${fait.reponse}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_doubles_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_doubles_moities",
    difficulty: 4,
    theme: "neutral",
    hint: "On te donne le double : cherche le nombre de départ.",
    tags: ["ce1", "calcul_mental", "doubles_moities", "template"],
    generate: () => {
      const n = randomChoice([5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50]);
      const double = n * 2;
      return {
        text: `Le double d'un nombre est ${double}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre dont on connait le double, c'est chercher sa moitié.",
          "On cherche le nombre qui, ajouté à lui-même, donne le résultat.",
          `${n} + ${n} = ${double}. Le nombre cherché est donc ${n}.`,
          `C'est ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_complements_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_complements_100",
    difficulty: 4,
    theme: "neutral",
    hint: "On complète d'abord les unités, puis les dizaines.",
    tags: ["ce1", "calcul_mental", "complements", "template"],
    generate: () => {
      const dizaines = randomInt(1, 8);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const manque = 100 - n;
      const versDizaine = 10 - unites;
      return {
        text: `Combien faut-il ajouter à ${n} pour atteindre 100 ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Le complément à 100 se construit en deux temps.",
          "On complète d'abord les unités jusqu'à la dizaine ronde, puis les dizaines jusqu'à 100.",
          `De ${n}, il faut ${versDizaine} pour atteindre ${n + versDizaine}. Puis ${100 - n - versDizaine} pour atteindre 100. En tout : ${versDizaine} + ${100 - n - versDizaine} = ${manque}.`,
          `Il faut ajouter ${manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_dizaines_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_dizaines_centaines",
    difficulty: 4,
    theme: "neutral",
    hint: "Retirer une centaine ne change que le chiffre des centaines.",
    tags: ["ce1", "calcul_mental", "dizaines_centaines", "piege", "template"],
    generate: () => {
      const centaines = randomInt(3, 9);
      const dizaines = randomInt(0, 9);
      const unites = randomInt(0, 9);
      const n = centaines * 100 + dizaines * 10 + unites;
      const pas = randomChoice([10, 100]);
      const ajoute = randomChoice([true, false]);
      const r = ajoute ? n + pas : n - pas;
      return {
        text: `Combien font ${n} ${ajoute ? "+" : "-"} ${pas} ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          `${ajoute ? "Ajouter" : "Retirer"} ${pas}, c'est ${ajoute ? "ajouter" : "retirer"} ${pas === 10 ? "une dizaine" : "une centaine"}.`,
          `On change le chiffre des ${pas === 10 ? "dizaines" : "centaines"} de un, sans toucher aux autres rangs.`,
          pas === 10 && (ajoute ? dizaines === 9 : dizaines === 0)
            ? `Ici le chiffre des dizaines ${ajoute ? "était déjà à 9 : la dizaine de plus fait changer les centaines" : "était à 0 : il faut emprunter une centaine"}. On obtient ${r}.`
            : `${n} ${ajoute ? "+" : "-"} ${pas} = ${r} : seul le rang des ${pas === 10 ? "dizaines" : "centaines"} a bougé.`,
          `${n} ${ajoute ? "+" : "-"} ${pas} = ${r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_dizaines_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_dizaines_centaines",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte en dizaines : les unités ne bougent pas.",
    tags: ["ce1", "calcul_mental", "dizaines_centaines", "template"],
    generate: () => {
      const dizaines = randomInt(3, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const pasDizaines = randomInt(1, dizaines - 1);
      const pas = pasDizaines * 10;
      const r = n - pas;
      return {
        text: `Combien font ${n} - ${pas} ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Retirer un nombre entier de dizaines ne touche pas au chiffre des unités.",
          "On compte en dizaines : on retire les dizaines aux dizaines.",
          `${pas}, c'est ${pasDizaines} dizaines. ${n} en a ${dizaines}. ${dizaines} - ${pasDizaines} = ${dizaines - pasDizaines} dizaines. Les ${unites} unités ne bougent pas : ${r}.`,
          `${n} - ${pas} = ${r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_multiplier_10_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_multiplier_10",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque chiffre monte d'un rang : les unités deviennent des dizaines.",
    tags: ["ce1", "calcul_mental", "multiplier_10", "piege", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      return {
        text: `Quand on multiplie ${n} par 10, que devient le chiffre des unités de ${n} ?`,
        format: "qcm",
        choices: makeChoices("il devient le chiffre des dizaines", [
          "il reste le chiffre des unités",
          "il devient le chiffre des centaines",
          "il disparait",
        ]),
        expected: ["il devient le chiffre des dizaines"],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 10, ce n'est pas « ajouter un zéro » : c'est faire monter chaque chiffre d'un rang.",
          "On regarde où se retrouve chaque chiffre dans le résultat.",
          `${n} × 10 = ${n * 10}. Le ${n % 10} qui comptait des unités compte maintenant des dizaines, et le ${Math.floor(n / 10)} passe aux centaines. Le zéro qui apparait au bout n'est que la place laissée vide aux unités.`,
          "Il devient le chiffre des dizaines.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_multiplier_10_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_multiplier_10",
    difficulty: 4,
    theme: "neutral",
    hint: "Enlève le zéro du résultat.",
    tags: ["ce1", "calcul_mental", "multiplier_10", "template"],
    generate: () => {
      const n = randomInt(2, 99);
      const r = n * 10;
      return {
        text: `Quel nombre manque : … × 10 = ${r} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre multiplié par 10 se termine toujours par zéro.",
          "On retire le zéro final pour retrouver le nombre de départ.",
          `${r} sans son zéro donne ${n}. On vérifie : ${n} × 10 = ${r}.`,
          `Le nombre manquant est ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_ajouter_9_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_ajouter_9_19_29_39",
    difficulty: 5,
    theme: "neutral",
    hint: "On a ajouté un de trop : que faut-il faire ensuite ?",
    tags: ["ce1", "calcul_mental", "ajouter_9", "piege", "template"],
    generate: () => {
      const n = randomInt(40, 800);
      const a = randomChoice([9, 19, 29, 39]);
      const rond = a + 1;
      return {
        text: `Pour calculer ${n} + ${a}, un élève commence par ${n} + ${rond} = ${n + rond}. Que doit-il faire ensuite ?`,
        format: "qcm",
        choices: makeChoices("retirer 1", [
          "ajouter 1",
          "retirer 10",
          "ajouter 10",
          "rien, il a fini",
        ]),
        expected: ["retirer 1"],
        comparator: "mcq_exact",
        explanation: exp(
          `Ajouter ${a}, c'est ajouter ${rond} puis retirer 1.`,
          "On regarde ce qu'on a ajouté en trop.",
          `Il fallait ajouter ${a}, il a ajouté ${rond} : c'est 1 de trop. En retirant 1 à ${n + rond}, il obtient ${n + a}.`,
          "Il doit retirer 1.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_soustraire_9_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_9",
    difficulty: 5,
    theme: "neutral",
    hint: "Retirer 9, c'est retirer 10 puis rendre 1.",
    tags: ["ce1", "calcul_mental", "soustraire_9", "template"],
    generate: () => {
      const dizaines = randomInt(3, 9);
      const n = dizaines * 10 + randomInt(0, 9);
      const r = n - 9;
      return {
        text: `Combien font ${n} - 9 ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Retirer 9, c'est retirer une dizaine puis rendre l'unité prise en trop.",
          "On retire 10, puis on ajoute 1.",
          `${n} - 10 = ${n - 10}, puis ${n - 10} + 1 = ${r}.`,
          `${n} - 9 = ${r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_soustraire_inf9_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_inferieur_9",
    difficulty: 5,
    theme: "neutral",
    hint: "Il faut casser une dizaine : les unités ne suffisent pas.",
    tags: ["ce1", "calcul_mental", "soustraire_inferieur_9", "piege", "template"],
    generate: () => {
      const centaines = randomInt(1, 9);
      const dizaines = randomInt(1, 9);
      const n = centaines * 100 + dizaines * 10;
      const b = randomInt(1, 9);
      const r = n - b;
      return {
        text: `Combien font ${n} - ${b} ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Quand il n'y a pas assez d'unités pour retirer, on casse une dizaine.",
          "On transforme une dizaine en dix unités, puis on retire.",
          `${n} n'a aucune unité. On casse une dizaine : il reste ${dizaines - 1} dizaine${dizaines - 1 > 1 ? "s" : ""} et 10 unités. 10 - ${b} = ${10 - b}. On obtient ${r}.`,
          `${n} - ${b} = ${r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_moitie_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_moitie_nombre_pair",
    difficulty: 4,
    theme: "neutral",
    hint: "Un nombre impair ne se partage pas en deux parts entières égales.",
    tags: ["ce1", "calcul_mental", "moitie", "piege", "template"],
    generate: () => {
      const pair = randomChoice([true, false]);
      const n = pair ? randomInt(5, 40) * 2 : randomInt(5, 40) * 2 + 1;
      return {
        text: `Peut-on partager ${n} en deux parts entières égales ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [pair ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Seuls les nombres pairs se partagent en deux parts entières égales.",
          "On regarde le chiffre des unités : 0, 2, 4, 6 ou 8 annonce un nombre pair.",
          pair
            ? `${n} se termine par ${n % 10} : il est pair. Sa moitié est ${n / 2}, car ${n / 2} + ${n / 2} = ${n}.`
            : `${n} se termine par ${n % 10} : il est impair. En le partageant en deux, on obtiendrait ${Math.floor(n / 2)} et ${Math.ceil(n / 2)}, qui ne sont pas égaux — il resterait toujours un de côté.`,
          pair ? `Oui, la moitié est ${n / 2}.` : "Non, ce nombre est impair.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_calcul_distributivite_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_distributivite",
    difficulty: 5,
    theme: "neutral",
    hint: "Le nombre a été coupé en 10 et le reste : il manque un morceau.",
    tags: ["ce1", "calcul_mental", "distributivite", "template"],
    generate: () => {
      const unites = randomInt(1, 9);
      const n = 10 + unites;
      const k = randomInt(2, 9);
      const morceauDix = 10 * k;
      const morceauUnites = unites * k;
      return {
        text: `Pour calculer ${n} × ${k}, on coupe ${n} en 10 + ${unites}. On a déjà 10 × ${k} = ${morceauDix}. Quel est le résultat final ?`,
        format: "short",
        expected: [String(morceauDix + morceauUnites)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier une somme, c'est multiplier chaque morceau puis réunir.",
          "On calcule le second morceau, puis on additionne les deux.",
          `${unites} × ${k} = ${morceauUnites}. On réunit : ${morceauDix} + ${morceauUnites} = ${morceauDix + morceauUnites}.`,
          `${n} × ${k} = ${morceauDix + morceauUnites}.`,
        ),
      };
    },
  },
];
