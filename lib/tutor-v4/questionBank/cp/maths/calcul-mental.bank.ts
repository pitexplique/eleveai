// lib/tutor-v4/questionBank/cp/maths/calcul-mental.bank.ts
//
// Le calcul mental du CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « La fluence attendue en fin de CP est la restitution de NEUF RÉSULTATS
//     EN TROIS MINUTES » ; l'élève sait aussi compléter huit égalités à trou
//     en une minute ;
//   — « Tous les travaux de calcul mental sont menés sur le champ numérique du
//     CP (nombres jusqu'à 100) » : les nombres en jeu ET les résultats
//     cherchés restent inférieurs ou égaux à cent ;
//   — MÉMORISER : les tables d'addition dans les deux sens ; les doubles des
//     nombres de 1 à 10 et des dizaines entières 20, 30, 40, 50 ; les moitiés
//     des nombres pairs de 2 à 20 et des dizaines entières 40, 60, 80, 100 ;
//   — NUMÉRATION : ajouter ou soustraire 1 ou 2 ; ajouter ou soustraire 10 ;
//     ajouter ou soustraire 20, 30, 40, 50, 60, 70, 80 ou 90 ;
//   — PROCÉDURES, que le BO nomme une à une : trouver le complément à la
//     dizaine supérieure ; ajouter un nombre inférieur à 9 ; ajouter 9 ;
//     ajouter deux nombres inférieurs à 100 ; déterminer la moitié d'un nombre
//     pair ; soustraire un nombre inférieur à 10 à un nombre entier de
//     dizaines.
//   ⛔ « Les élèves ne seront pas amenés à utiliser de calculatrice au
//     cycle 2. »
//
// LE PIÈGE DE LA NOTION : ajouter 10 en touchant le mauvais chiffre. L'élève
// qui calcule 37 + 10 et répond 38 a ajouté une unité au lieu d'une dizaine.
// Son cousin vit dans le comptage sur les doigts : pour 3 + 2, on part de 3 et
// on avance de DEUX — quatre, cinq — et non « trois, quatre », qui compterait
// le point de départ comme un pas et donnerait 4.
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

export const calculMentalBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_CALCUL_TABLES_ADDITION — dans les deux sens
     Le BO insiste sur « les deux sens » : A + B = C, mais aussi
     C = A + B. C'est le même savoir, et pas la même question.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_tables_addition_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_tables_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 6 + 7 ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "6 + 6 = 12, et il y a un de plus.",
    explanation: exp(
      "Les résultats des tables d'addition se retiennent par cœur, mais on peut s'appuyer sur un double.",
      "On cherche le double le plus proche, puis on ajuste.",
      "6 + 6 = 12, c'est un double qu'on connait. Or 7, c'est 6 et encore 1 : 12 + 1 = 13.",
      "6 + 7 = 13.",
    ),
    tags: ["cp", "calcul_mental", "tables"],
  },
  {
    kind: "template",
    id: "cp_calcul_tables_addition_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_tables_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce sont des résultats à connaitre par cœur.",
    tags: ["cp", "calcul_mental", "tables", "template"],
    generate: () => {
      const a = randomInt(1, 10);
      const b = randomInt(1, 10);
      return {
        text: `Combien font ${a} + ${b} ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: exp(
          "Les tables d'addition réunissent les résultats des sommes de deux nombres compris entre 0 et 10.",
          "On les restitue de mémoire ; sinon, on part du plus grand et on avance.",
          `On part de ${Math.max(a, b)} et on avance de ${Math.min(a, b)} : ${a} + ${b} = ${a + b}.`,
          `${a} + ${b} = ${a + b}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_tables_addition_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_tables_addition",
    difficulty: 4,
    theme: "neutral",
    hint: "La somme est écrite à GAUCHE : le signe = se lit dans les deux sens.",
    tags: ["cp", "calcul_mental", "tables", "piege", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      const total = a + b;
      return {
        text: `Complète : ${total} = ${a} + …`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Une table d'addition se connait dans les deux sens : on sait dire la somme, et retrouver un terme quand la somme est donnée.",
          "On cherche ce qu'il faut ajouter à droite pour atteindre le nombre de gauche.",
          `${a} et combien font ${total} ? Il faut ${b}, car ${a} + ${b} = ${total}.`,
          `Le nombre manquant est ${b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_COMPLEMENTS_10 — les compléments à 10
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_complements_10_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complements_10",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 7 pour obtenir 10 ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte sur tes doigts : 8, 9, 10.",
    explanation: exp(
      "Le complément à 10 d'un nombre, c'est ce qui lui manque pour atteindre dix.",
      "On part du nombre et on compte jusqu'à dix.",
      "De 7, on avance : 8, 9, 10. Cela fait 3 pas. Et en effet 7 + 3 = 10.",
      "Il faut ajouter 3.",
    ),
    tags: ["cp", "calcul_mental", "complement_10"],
  },
  {
    kind: "template",
    id: "cp_calcul_complements_10_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complements_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Les deux nombres réunis doivent faire une dizaine pleine.",
    tags: ["cp", "calcul_mental", "complement_10", "template"],
    generate: () => {
      const n = randomInt(1, 9);
      const complement = 10 - n;
      return {
        text: `Quel nombre faut-il ajouter à ${n} pour obtenir 10 ?`,
        format: "short",
        expected: [String(complement)],
        comparator: "number_equal",
        explanation: exp(
          "Le complément à 10 est ce qui manque pour atteindre dix.",
          "On part du nombre et on compte jusqu'à dix.",
          `${n} + ${complement} = 10. Ces deux nombres vont ensemble : ils forment une dizaine pleine.`,
          `Il faut ajouter ${complement}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_complements_10_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complements_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le nombre qui va avec, pour faire dix.",
    tags: ["cp", "calcul_mental", "complement_10", "template"],
    generate: () => {
      const n = randomInt(1, 9);
      const complement = 10 - n;
      return {
        text: `Deux nombres réunis font 10. L'un d'eux est ${n}. Quel est l'autre ?`,
        format: "qcm",
        choices: makeChoices(String(complement), [
          String(10 + n),
          String(n),
          String(complement + 2),
          String(complement + 1),
        ]),
        expected: [String(complement)],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux nombres qui font 10 ensemble sont dits compléments l'un de l'autre.",
          "On enlève le nombre connu à dix.",
          `10 - ${n} = ${complement}. On vérifie : ${n} + ${complement} = 10.`,
          `L'autre nombre est ${complement}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_DOUBLES — les doubles jusqu'à 10, et ceux des
     dizaines entières 20, 30, 40 et 50.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_doubles_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_doubles",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le double de 8 ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Le double, c'est deux fois le même nombre.",
    explanation: exp(
      "Le double d'un nombre, c'est ce nombre ajouté à lui-même.",
      "On additionne le nombre avec lui-même.",
      "8 + 8 = 16.",
      "Le double de 8 est 16.",
    ),
    tags: ["cp", "calcul_mental", "doubles"],
  },
  {
    kind: "template",
    id: "cp_calcul_doubles_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_doubles",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux fois le même nombre.",
    tags: ["cp", "calcul_mental", "doubles", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50]);
      return {
        text: `Quel est le double de ${n} ?`,
        format: "short",
        expected: [String(n * 2)],
        comparator: "number_equal",
        explanation: exp(
          "Le double d'un nombre, c'est ce nombre ajouté à lui-même.",
          "On additionne le nombre avec lui-même.",
          n >= 20
            ? `${n} + ${n} = ${n * 2}. C'est le double de ${n / 10}, avec un zéro de plus : ${n / 10} + ${n / 10} = ${(n / 10) * 2} dizaines.`
            : `${n} + ${n} = ${n * 2}.`,
          `Le double de ${n} est ${n * 2}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_doubles_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_doubles",
    difficulty: 3,
    theme: "neutral",
    hint: "On te donne le double : cherche le nombre de départ.",
    tags: ["cp", "calcul_mental", "doubles", "template"],
    generate: () => {
      const n = randomInt(1, 10);
      const double = n * 2;
      return {
        text: `Le double d'un nombre est ${double}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre dont on connait le double, c'est chercher la moitié.",
          "On cherche le nombre qui, ajouté à lui-même, donne le résultat.",
          `${n} + ${n} = ${double}. Le nombre cherché est donc ${n}.`,
          `C'est ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_MOITIE — la moitié d'un nombre pair
     Le BO donne la procédure : 46 = 40 + 6, moitié de 40 = 20,
     moitié de 6 = 3, donc 23.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_moitie_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_moitie",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la moitié de 46 ?",
    format: "short",
    expected: ["23"],
    comparator: "number_equal",
    hint: "Coupe le nombre en deux morceaux : 40 et 6.",
    explanation: exp(
      "La moitié d'un nombre, c'est ce qu'on obtient en le partageant en deux parts égales.",
      "On décompose le nombre en dizaines et unités, on prend la moitié de chaque morceau, puis on réunit.",
      "46 = 40 + 6. La moitié de 40 est 20, la moitié de 6 est 3. On réunit : 20 + 3 = 23.",
      "La moitié de 46 est 23.",
    ),
    tags: ["cp", "calcul_mental", "moitie", "piege"],
  },
  {
    kind: "template",
    id: "cp_calcul_moitie_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_moitie",
    difficulty: 2,
    theme: "neutral",
    hint: "En deux parts égales.",
    tags: ["cp", "calcul_mental", "moitie", "template"],
    generate: () => {
      const n = randomChoice([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100]);
      return {
        text: `Quelle est la moitié de ${n} ?`,
        format: "short",
        expected: [String(n / 2)],
        comparator: "number_equal",
        explanation: exp(
          "La moitié, c'est l'une des deux parts égales d'un partage en deux.",
          "On cherche le nombre qui, ajouté à lui-même, redonne le nombre de départ.",
          `${n / 2} + ${n / 2} = ${n}. La moitié de ${n} est donc ${n / 2}.`,
          `C'est ${n / 2}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_moitie_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_moitie",
    difficulty: 5,
    theme: "neutral",
    hint: "Coupe le nombre en dizaines et unités avant de partager.",
    tags: ["cp", "calcul_mental", "moitie", "template"],
    generate: () => {
      const dizaines = randomChoice([2, 4, 6, 8]);
      const unites = randomChoice([2, 4, 6, 8]);
      const n = dizaines * 10 + unites;
      return {
        text: `Quelle est la moitié de ${n} ?`,
        format: "short",
        expected: [String(n / 2)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre pair se partage en deux parts égales.",
          "On le décompose en dizaines et unités, on prend la moitié de chaque morceau, puis on réunit.",
          `${n} = ${dizaines * 10} + ${unites}. La moitié de ${dizaines * 10} est ${(dizaines * 10) / 2}, la moitié de ${unites} est ${unites / 2}. On réunit : ${(dizaines * 10) / 2} + ${unites / 2} = ${n / 2}.`,
          `La moitié de ${n} est ${n / 2}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_PLUS_MOINS_1_2_10 — LE piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_plus_moins_1_2_10_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_plus_moins_1_2_10",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 37 + 10 ?",
    format: "qcm",
    choices: ["47", "38", "137", "39"],
    expected: ["47"],
    comparator: "mcq_exact",
    hint: "Ajouter 10, c'est ajouter UNE DIZAINE : c'est le chiffre de gauche qui bouge.",
    explanation: exp(
      "Ajouter 10 à un nombre, c'est lui ajouter une dizaine.",
      "On augmente le chiffre des dizaines de un, et on ne touche pas aux unités.",
      "37 a 3 dizaines et 7 unités. Une dizaine de plus fait 4 dizaines et toujours 7 unités : 47. Répondre 38, c'est avoir ajouté une unité au lieu d'une dizaine.",
      "37 + 10 = 47.",
    ),
    tags: ["cp", "calcul_mental", "plus_dix", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_calcul_plus_moins_1_2_10_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_plus_moins_1_2_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde bien si c'est une unité ou une dizaine qu'on ajoute.",
    tags: ["cp", "calcul_mental", "plus_dix", "piege", "template"],
    generate: () => {
      const n = randomInt(11, 88);
      const pas = randomChoice([1, 2, 10]);
      const ajoute = randomChoice([true, false]);
      const resultat = ajoute ? n + pas : n - pas;
      return {
        text: `Calcule : ${n} ${ajoute ? "+" : "-"} ${pas}`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          pas === 10
            ? "Ajouter ou retirer 10, c'est ajouter ou retirer UNE DIZAINE."
            : "Ajouter ou retirer 1 ou 2, c'est avancer ou reculer dans la suite des nombres.",
          pas === 10
            ? "On change le chiffre des dizaines de un, sans toucher aux unités."
            : `On ${ajoute ? "avance" : "recule"} de ${pas} dans la comptine.`,
          pas === 10
            ? `${n} a ${Math.floor(n / 10)} dizaines. ${ajoute ? "Une de plus" : "Une de moins"} : ${Math.floor(resultat / 10)} dizaines, et toujours ${n % 10} unités. Cela fait ${resultat}.`
            : `On part de ${n} et on ${ajoute ? "avance" : "recule"} de ${pas} : ${resultat}.`,
          `${n} ${ajoute ? "+" : "-"} ${pas} = ${resultat}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_plus_moins_1_2_10_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_plus_moins_1_2_10",
    difficulty: 4,
    theme: "neutral",
    hint: "Une dizaine de plus, ce n'est pas une unité de plus.",
    tags: ["cp", "calcul_mental", "plus_dix", "piege", "template"],
    generate: () => {
      const n = randomInt(21, 79);
      const resultat = n + 10;
      return {
        text: `Combien font ${n} + 10 ?`,
        format: "qcm",
        choices: makeChoices(String(resultat), [
          String(n + 1),
          String(n - 10),
          String(n + 2),
          String(n + 20),
        ]),
        expected: [String(resultat)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ajouter 10, c'est ajouter une dizaine.",
          "On augmente le chiffre des dizaines de un, et on laisse les unités tranquilles.",
          `${n} a ${Math.floor(n / 10)} dizaines et ${n % 10} unités. Avec une dizaine de plus : ${Math.floor(resultat / 10)} dizaines et toujours ${n % 10} unités, soit ${resultat}. Répondre ${n + 1}, c'est avoir ajouté une unité.`,
          `${n} + 10 = ${resultat}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_DIZAINES_ENTIERES — ajouter ou retirer 20 à 90
     Le BO donne la procédure : « 30, c'est 3 dizaines. 7 dizaines
     - 3 dizaines = 4 dizaines. Donc 76 - 30 = 46. »
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_dizaines_entieres_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_dizaines_entieres",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 76 - 30 ?",
    format: "short",
    expected: ["46"],
    comparator: "number_equal",
    hint: "30, c'est 3 dizaines. Compte en dizaines.",
    explanation: exp(
      "Retirer un nombre entier de dizaines ne touche pas au chiffre des unités.",
      "On compte en dizaines : on retire les dizaines aux dizaines.",
      "30, c'est 3 dizaines. 76 en a 7. 7 dizaines - 3 dizaines = 4 dizaines. Les 6 unités ne bougent pas : on obtient 46.",
      "76 - 30 = 46.",
    ),
    tags: ["cp", "calcul_mental", "dizaines_entieres"],
  },
  {
    kind: "template",
    id: "cp_calcul_dizaines_entieres_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_dizaines_entieres",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte en dizaines : les unités ne bougent pas.",
    tags: ["cp", "calcul_mental", "dizaines_entieres", "template"],
    generate: () => {
      // ⚠️ Les bornes gardent le résultat sous cent, champ numérique du CP :
      // avec neuf dizaines au départ, la moindre dizaine ajoutée passait la
      // centaine.
      const dizaines = randomInt(2, 8);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const ajoute = randomChoice([true, false]);
      const pasDizaines = ajoute
        ? randomInt(1, 9 - dizaines)
        : randomInt(1, dizaines - 1);
      const pas = pasDizaines * 10;
      const resultat = ajoute ? n + pas : n - pas;
      return {
        text: `Calcule : ${n} ${ajoute ? "+" : "-"} ${pas}`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Ajouter ou retirer un nombre entier de dizaines ne change que le chiffre des dizaines.",
          "On transforme le pas en dizaines, puis on compte en dizaines.",
          `${pas}, c'est ${pasDizaines} dizaines. ${n} en a ${dizaines}. ${dizaines} ${ajoute ? "+" : "-"} ${pasDizaines} = ${Math.floor(resultat / 10)} dizaines. Les ${unites} unités ne bougent pas : on obtient ${resultat}.`,
          `${n} ${ajoute ? "+" : "-"} ${pas} = ${resultat}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_dizaines_entieres_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_dizaines_entieres",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de dizaines ajoute-t-on ?",
    tags: ["cp", "calcul_mental", "dizaines_entieres", "template"],
    generate: () => {
      const dizaines = randomInt(2, 5);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const pasDizaines = randomInt(2, 4);
      const pas = pasDizaines * 10;
      const resultat = n + pas;
      return {
        text: `Combien font ${n} + ${pas} ?`,
        format: "qcm",
        choices: makeChoices(String(resultat), [
          String(n + pasDizaines),
          String(resultat + 10),
          String(resultat - 10),
          String(n + pas + unites),
        ]),
        expected: [String(resultat)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ajouter des dizaines entières laisse les unités inchangées.",
          "On ajoute les dizaines entre elles.",
          `${dizaines} dizaines + ${pasDizaines} dizaines = ${dizaines + pasDizaines} dizaines, et les ${unites} unités restent : ${resultat}.`,
          `${n} + ${pas} = ${resultat}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_COMPLEMENT_DIZAINE — jusqu'à la dizaine du dessus
     Le BO : « pour trouver le complément de 74 à la dizaine
     supérieure… le complément à 10 de 4 est 6. »
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_complement_dizaine_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complement_dizaine",
    difficulty: 4,
    theme: "neutral",
    text: "Combien faut-il ajouter à 74 pour arriver à la dizaine juste au-dessus ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "La dizaine au-dessus de 74, c'est 80. Regarde seulement les unités.",
    explanation: exp(
      "La dizaine supérieure d'un nombre est la dizaine entière qui vient juste après lui.",
      "On regarde le chiffre des unités et on cherche son complément à 10.",
      "74, c'est 7 dizaines et 4 unités. Le complément à 10 de 4 est 6. On ajoute donc 6 unités aux 4 pour obtenir 8 dizaines, c'est-à-dire 80.",
      "Il faut ajouter 6.",
    ),
    tags: ["cp", "calcul_mental", "complement_dizaine"],
  },
  {
    kind: "template",
    id: "cp_calcul_complement_dizaine_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complement_dizaine",
    difficulty: 4,
    theme: "neutral",
    hint: "Le complément à 10 du chiffre des unités suffit.",
    tags: ["cp", "calcul_mental", "complement_dizaine", "template"],
    generate: () => {
      const dizaines = randomInt(1, 8);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const manque = 10 - unites;
      const cible = (dizaines + 1) * 10;
      return {
        text: `Combien faut-il ajouter à ${n} pour arriver à ${cible} ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Pour aller jusqu'à la dizaine du dessus, il suffit de compléter les unités.",
          "On cherche le complément à 10 du chiffre des unités.",
          `${n}, c'est ${dizaines} dizaines et ${unites} unités. Le complément à 10 de ${unites} est ${manque} : ${n} + ${manque} = ${cible}.`,
          `Il faut ajouter ${manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_complement_dizaine_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_complement_dizaine",
    difficulty: 3,
    theme: "neutral",
    hint: "La dizaine du dessus se termine toujours par zéro.",
    tags: ["cp", "calcul_mental", "complement_dizaine", "template"],
    generate: () => {
      const dizaines = randomInt(1, 8);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const cible = (dizaines + 1) * 10;
      return {
        text: `Quelle est la dizaine juste au-dessus de ${n} ?`,
        format: "qcm",
        choices: makeChoices(String(cible), [
          String(dizaines * 10),
          String(cible + 10),
          String(n + 1),
          String(cible - 5),
        ]),
        expected: [String(cible)],
        comparator: "mcq_exact",
        explanation: exp(
          "Les dizaines entières sont les nombres qui se terminent par zéro.",
          "On repère la dizaine entière qui suit immédiatement le nombre.",
          `${n} est entre ${dizaines * 10} et ${cible}. La dizaine juste au-dessus est donc ${cible}.`,
          `C'est ${cible}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_AJOUTER_9 — +10 puis -1
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_ajouter_9_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_9",
    difficulty: 4,
    theme: "neutral",
    text: "Pour ajouter 9 à 37, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis retirer 1",
      "ajouter 9 un par un",
      "ajouter 10, puis ajouter 1",
      "retirer 10, puis ajouter 1",
    ],
    expected: ["ajouter 10, puis retirer 1"],
    comparator: "mcq_exact",
    hint: "9, c'est presque 10 : il en manque juste un.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine et retirer l'unité qu'on a mise en trop.",
      "On ajoute 10, puis on recule de 1.",
      "37 + 10 = 47, puis 47 - 1 = 46. Ajouter 10 est facile — le chiffre des dizaines monte de un. Retirer 1 ensuite ne coute rien. Et en effet 37 + 9 = 46.",
      "On ajoute 10, puis on retire 1.",
    ),
    tags: ["cp", "calcul_mental", "ajouter_9", "qcm"],
  },
  {
    kind: "template",
    id: "cp_calcul_ajouter_9_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Ajoute 10, puis retire 1.",
    tags: ["cp", "calcul_mental", "ajouter_9", "template"],
    generate: () => {
      const n = randomInt(12, 85);
      const resultat = n + 9;
      return {
        text: `Calcule : ${n} + 9`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Ajouter 9, c'est ajouter 10 puis retirer 1.",
          "On monte d'une dizaine, puis on recule d'une unité.",
          `${n} + 10 = ${n + 10}, puis ${n + 10} - 1 = ${resultat}.`,
          `${n} + 9 = ${resultat}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_ajouter_9_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_9",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce qui a été ajouté en trop, ou en moins.",
    tags: ["cp", "calcul_mental", "ajouter_9", "piege", "template"],
    generate: () => {
      const n = randomInt(15, 80);
      const resultat = n + 9;
      return {
        text: `Un élève calcule ${n} + 9. Il fait ${n} + 10 = ${n + 10}, puis il s'arrête. Que doit-il encore faire ?`,
        format: "qcm",
        choices: makeChoices("retirer 1", [
          "ajouter 1",
          "retirer 10",
          "ajouter 9",
          "rien, il a fini",
        ]),
        expected: ["retirer 1"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on ajoute 10 au lieu de 9, on en a mis un de trop.",
          "On retire ce qu'on a ajouté en trop.",
          `Il fallait ajouter 9, il a ajouté 10 : il y a 1 de trop. En retirant 1 à ${n + 10}, il obtient ${resultat}, qui est bien ${n} + 9.`,
          "Il doit retirer 1.",
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_AJOUTER_DEUX_NOMBRES — 47 + 28
     Le BO donne l'ardoise : 40 + 20 = 60, 7 + 8 = 15, 60 + 15 = 75.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_ajouter_deux_nombres_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_deux_nombres",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule : 47 + 28",
    format: "short",
    expected: ["75"],
    comparator: "number_equal",
    hint: "Les dizaines ensemble, les unités ensemble, puis on réunit.",
    explanation: exp(
      "Pour ajouter deux nombres à deux chiffres, on les décompose.",
      "On additionne les dizaines entre elles, les unités entre elles, puis on réunit les deux résultats.",
      "40 + 20 = 60. Et 7 + 8 = 15. On réunit : 60 + 15 = 75.",
      "47 + 28 = 75.",
    ),
    tags: ["cp", "calcul_mental", "ajouter_deux", "piege"],
  },
  {
    kind: "template",
    id: "cp_calcul_ajouter_deux_nombres_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_deux_nombres",
    difficulty: 5,
    theme: "neutral",
    hint: "Décompose les deux nombres avant d'additionner.",
    tags: ["cp", "calcul_mental", "ajouter_deux", "template"],
    generate: () => {
      const dizA = randomInt(1, 4);
      const uniA = randomInt(3, 9);
      const dizB = randomInt(1, 4);
      const uniB = randomInt(3, 9);
      const a = dizA * 10 + uniA;
      const b = dizB * 10 + uniB;
      const sommeDizaines = (dizA + dizB) * 10;
      const sommeUnites = uniA + uniB;
      const total = a + b;
      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Deux nombres à deux chiffres s'additionnent en séparant les dizaines et les unités.",
          "On ajoute les dizaines entre elles, les unités entre elles, puis on réunit.",
          `${dizA * 10} + ${dizB * 10} = ${sommeDizaines}. Et ${uniA} + ${uniB} = ${sommeUnites}. On réunit : ${sommeDizaines} + ${sommeUnites} = ${total}.`,
          `${a} + ${b} = ${total}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_ajouter_deux_nombres_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_ajouter_deux_nombres",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe d'abord par la dizaine du dessus.",
    tags: ["cp", "calcul_mental", "ajouter_deux", "template"],
    generate: () => {
      const dizaines = randomInt(2, 8);
      const unites = randomInt(4, 9);
      const a = dizaines * 10 + unites;
      const b = randomInt(3, 8);
      const versDizaine = 10 - unites;
      const reste = b - versDizaine;
      const total = a + b;
      if (reste <= 0) {
        // Pas de passage de dizaine : on explique simplement.
        return {
          text: `Calcule : ${a} + ${b}`,
          format: "short",
          expected: [String(total)],
          comparator: "number_equal",
          explanation: exp(
            "Ajouter un petit nombre ne touche que les unités, tant qu'on ne dépasse pas la dizaine.",
            "On additionne les unités entre elles.",
            `${unites} + ${b} = ${unites + b}, ce qui ne dépasse pas 10 : les ${dizaines} dizaines ne bougent pas. On obtient ${total}.`,
            `${a} + ${b} = ${total}.`,
          ),
        };
      }
      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour ajouter un petit nombre, on passe d'abord par la dizaine supérieure.",
          "On cherche ce qui manque pour atteindre la dizaine, on l'ajoute, puis on ajoute le reste.",
          `De ${a}, il faut ${versDizaine} pour atteindre ${(dizaines + 1) * 10}. Il reste alors ${b} - ${versDizaine} = ${reste} à ajouter : ${(dizaines + 1) * 10} + ${reste} = ${total}.`,
          `${a} + ${b} = ${total}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_SOUSTRAIRE_DIZAINE — 50 - 6
     Le BO : « 50 c'est 5 dizaines, je casse une dizaine… »
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_soustraire_dizaine_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_soustraire_dizaine",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 50 - 6",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Casse une dizaine : il te reste 4 dizaines et 10 unités.",
    explanation: exp(
      "Pour retirer des unités à un nombre entier de dizaines, il faut d'abord casser une dizaine.",
      "On transforme une dizaine en dix unités, puis on retire.",
      "50, c'est 5 dizaines. On casse une dizaine : il reste 4 dizaines et 10 unités. On enlève 6 aux 10 unités : il en reste 4. Cela fait 4 dizaines et 4 unités, soit 44.",
      "50 - 6 = 44.",
    ),
    tags: ["cp", "calcul_mental", "casser_dizaine", "piege"],
  },
  {
    kind: "template",
    id: "cp_calcul_soustraire_dizaine_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_soustraire_dizaine",
    difficulty: 4,
    theme: "neutral",
    hint: "Le complément à 10 de ce qu'on retire donne les unités du résultat.",
    tags: ["cp", "calcul_mental", "casser_dizaine", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const depart = dizaines * 10;
      const b = randomInt(1, 9);
      const resultat = depart - b;
      return {
        text: `Calcule : ${depart} - ${b}`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre entier de dizaines n'a aucune unité : il faut en casser une pour pouvoir retirer.",
          "On casse une dizaine en dix unités, puis on retire.",
          `${depart}, c'est ${dizaines} dizaines. On casse une dizaine : ${dizaines - 1} dizaines et 10 unités. 10 - ${b} = ${10 - b}. Cela fait ${dizaines - 1} dizaines et ${10 - b} unités, soit ${resultat}.`,
          `${depart} - ${b} = ${resultat}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_soustraire_dizaine_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_soustraire_dizaine",
    difficulty: 5,
    theme: "neutral",
    hint: "Après avoir cassé une dizaine, combien de dizaines entières reste-t-il ?",
    tags: ["cp", "calcul_mental", "casser_dizaine", "piege", "template"],
    generate: () => {
      const dizaines = randomInt(3, 9);
      const depart = dizaines * 10;
      const b = randomInt(1, 9);
      const resultat = depart - b;
      return {
        text: `Pour calculer ${depart} - ${b}, on casse une dizaine. Combien de dizaines entières reste-t-il alors ?`,
        format: "short",
        expected: [String(dizaines - 1)],
        comparator: "number_equal",
        explanation: exp(
          "Casser une dizaine, c'est la transformer en dix unités : elle quitte le tas des dizaines.",
          "On enlève une dizaine au compte des dizaines.",
          `${depart} a ${dizaines} dizaines. Après en avoir cassé une, il en reste ${dizaines - 1}, plus 10 unités toutes neuves — dans lesquelles on va retirer ${b}, ce qui donnera ${resultat}.`,
          `Il reste ${dizaines - 1} dizaines entières.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CALCUL_DEFI — la fluence, et le choix de la procédure
     « Il faut aussi savoir dans quels contextes il est pertinent
     d'utiliser une procédure donnée », dit le BO.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_calcul_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour calculer 46 + 9 dans sa tête, quelle est la meilleure façon de faire ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis retirer 1",
      "compter 9 fois de un en un",
      "ajouter 9 dizaines",
      "poser l'opération en colonnes",
    ],
    expected: ["ajouter 10, puis retirer 1"],
    comparator: "mcq_exact",
    hint: "Une bonne procédure de calcul mental est celle qui demande le moins d'étapes.",
    explanation: exp(
      "Calculer mentalement, ce n'est pas seulement connaitre des résultats : c'est choisir la procédure qui va le plus vite.",
      "On regarde les nombres en jeu avant de se lancer.",
      "9 est tout près de 10 : 46 + 10 = 56, puis 56 - 1 = 55. Deux étapes faciles. Compter neuf fois de un en un marcherait aussi, mais serait long et donnerait plus d'occasions de se tromper.",
      "On ajoute 10, puis on retire 1.",
    ),
    tags: ["cp", "calcul_mental", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "cp_calcul_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde les nombres avant de choisir ta méthode.",
    tags: ["cp", "calcul_mental", "defi", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          calcul: (n: number) => `${n} + 9`,
          bonne: "ajouter 10, puis retirer 1",
          pieges: ["ajouter 10, puis ajouter 1", "compter de un en un", "ajouter 9 dizaines"],
        },
        {
          calcul: (n: number) => `${n} + 10`,
          bonne: "monter d'une dizaine",
          pieges: ["monter d'une unité", "compter de un en un", "ajouter 100"],
        },
        {
          calcul: (n: number) => `${n} + 2`,
          bonne: "avancer deux fois dans la comptine",
          pieges: ["monter d'une dizaine", "ajouter 20", "retirer 2"],
        },
      ]);
      const n = randomInt(21, 70);
      return {
        text: `Pour calculer ${cas.calcul(n)} dans sa tête, que vaut-il mieux faire ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le calcul mental demande de choisir la procédure la mieux adaptée aux nombres.",
          "On regarde le nombre à ajouter : est-il proche d'une dizaine ? est-il tout petit ?",
          `Ici, la façon la plus sure et la plus rapide est de ${cas.bonne}.`,
          `Il vaut mieux ${cas.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_calcul_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "cp_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : d'abord jusqu'à la dizaine, ensuite le reste.",
    tags: ["cp", "calcul_mental", "defi", "template"],
    generate: () => {
      const dizaines = randomInt(2, 7);
      const unites = randomInt(5, 9);
      const n = dizaines * 10 + unites;
      const versDizaine = 10 - unites;
      // ⚠️ Le nombre à ajouter doit dépasser ce qui manque pour la dizaine,
      // sinon le « reste à ajouter » serait négatif et la question absurde.
      const b = randomInt(versDizaine + 1, 9);
      const total = n + b;
      return {
        text: `Pour calculer ${n} + ${b}, on passe d'abord par ${(dizaines + 1) * 10}. Combien reste-t-il à ajouter ensuite ?`,
        format: "short",
        expected: [String(b - versDizaine)],
        comparator: "number_equal",
        explanation: exp(
          "Passer par la dizaine, c'est couper l'ajout en deux morceaux.",
          "On ajoute d'abord ce qui manque pour atteindre la dizaine, puis le reste.",
          `De ${n} à ${(dizaines + 1) * 10}, il faut ${versDizaine}. Sur les ${b} à ajouter, il en reste donc ${b} - ${versDizaine} = ${b - versDizaine}, ce qui mène à ${total}.`,
          `Il reste ${b - versDizaine} à ajouter.`,
        ),
      };
    },
  },
];
