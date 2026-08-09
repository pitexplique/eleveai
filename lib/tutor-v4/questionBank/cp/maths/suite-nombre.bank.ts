// lib/tutor-v4/questionBank/cp/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « L'élève sait compter, à l'oral et à l'écrit, de un en un, de deux en
//     deux et de dix en dix EN PARTANT DE N'IMPORTE QUEL NOMBRE » ;
//   — « L'élève sait compter, à l'oral comme à l'écrit, À REBOURS, de un en
//     un, en partant de n'importe quel nombre » ;
//   — la suite écrite et orale va jusqu'à cent.
//
// LE PIÈGE DE LA NOTION : le passage de la dizaine, et il se paie deux fois.
// En avant, l'élève qui compte 68, 69… hésite et repart à 60. À rebours, c'est
// pire : après 70 vient 69, et il faut redescendre dans la dizaine d'avant.
// La zone la plus dure est celle des noms irréguliers du français — de
// soixante à quatre-vingt-dix-neuf, où « soixante-dix » et « quatre-vingts »
// ne ressemblent plus à rien de ce qui précède.
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

export const suiteNombreBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_SUITE_COMPTER_AVANT — à partir de n'importe quel nombre
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_suite_compter_avant_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_avant",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre vient juste après 69 ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Les unités sont pleines : on change de dizaine.",
    explanation: exp(
      "Après le neuvième nombre d'une dizaine, on passe à la dizaine suivante.",
      "On regarde le chiffre des unités : s'il vaut 9, la dizaine va changer.",
      "69 a 6 dizaines et 9 unités. Une unité de plus complète une dizaine : cela fait 7 dizaines et 0 unité, soit 70. Le nom change beaucoup — « soixante-dix » — mais le nombre, lui, suit simplement.",
      "Après 69 vient 70.",
    ),
    tags: ["cp", "suite_nombre", "compter_avant", "piege"],
  },
  {
    kind: "template",
    id: "cp_suite_compter_avant_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_avant",
    difficulty: 3,
    theme: "neutral",
    hint: "Continue la comptine à partir du nombre donné.",
    tags: ["cp", "suite_nombre", "compter_avant", "template"],
    generate: () => {
      const depart = randomInt(5, 92);
      const suite = [depart, depart + 1, depart + 2];
      return {
        text: `Continue : ${suite.join(" ; ")} ; …`,
        format: "short",
        expected: [String(depart + 3)],
        comparator: "number_equal",
        explanation: exp(
          "Compter en avant, c'est avancer d'un nombre à la fois dans la suite des nombres.",
          "On repart du dernier nombre écrit et on avance d'un.",
          `Après ${depart + 2} vient ${depart + 3}.`,
          `Le nombre suivant est ${depart + 3}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_compter_avant_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_avant",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : la dizaine change juste après.",
    tags: ["cp", "suite_nombre", "compter_avant", "piege", "template"],
    generate: () => {
      // On tire exprès le passage de dizaine, là où la comptine se casse.
      const dizaines = randomInt(1, 9);
      const n = dizaines * 10 + 9;
      return {
        text: `Quel nombre vient juste après ${n} ?`,
        format: "qcm",
        choices: makeChoices(String(n + 1), [
          String(dizaines * 10),
          String(n + 10),
          String(dizaines * 10 + 10 + 1),
          String(n - 1),
        ]),
        expected: [String(n + 1)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand les unités sont à 9, le nombre suivant ouvre une nouvelle dizaine.",
          "On ajoute une unité : les 9 unités et la nouvelle font une dizaine de plus, et les unités repartent à zéro.",
          `${n} a ${dizaines} dizaines et 9 unités. Une de plus fait ${dizaines + 1} dizaines et 0 unité, soit ${n + 1}.`,
          `Après ${n} vient ${n + 1}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SUITE_COMPTER_ARRIERE — à rebours, de un en un
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_suite_compter_arriere_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_arriere",
    difficulty: 4,
    theme: "neutral",
    text: "Quel nombre vient juste avant 70 ?",
    format: "short",
    expected: ["69"],
    comparator: "number_equal",
    hint: "On redescend dans la dizaine d'avant.",
    explanation: exp(
      "Compter à rebours, c'est reculer d'un nombre à la fois.",
      "Quand les unités sont à zéro, on casse une dizaine pour reculer.",
      "70, c'est 7 dizaines et 0 unité. En reculant d'un, on casse une dizaine : il reste 6 dizaines et 9 unités, soit 69.",
      "Avant 70 vient 69.",
    ),
    tags: ["cp", "suite_nombre", "compter_arriere", "piege"],
  },
  {
    kind: "template",
    id: "cp_suite_compter_arriere_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_arriere",
    difficulty: 3,
    theme: "neutral",
    hint: "On recule d'un à chaque fois.",
    tags: ["cp", "suite_nombre", "compter_arriere", "template"],
    generate: () => {
      const depart = randomInt(8, 99);
      const suite = [depart, depart - 1, depart - 2];
      return {
        text: `Continue en reculant : ${suite.join(" ; ")} ; …`,
        format: "short",
        expected: [String(depart - 3)],
        comparator: "number_equal",
        explanation: exp(
          "Compter à rebours, c'est parcourir la suite des nombres dans l'autre sens.",
          "On repart du dernier nombre écrit et on recule d'un.",
          `Avant ${depart - 2} vient ${depart - 3}.`,
          `Le nombre suivant est ${depart - 3}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_compter_arriere_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_compter_arriere",
    difficulty: 4,
    theme: "neutral",
    hint: "Les unités sont à zéro : il faut redescendre d'une dizaine.",
    tags: ["cp", "suite_nombre", "compter_arriere", "piege", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const n = dizaines * 10;
      return {
        text: `Quel nombre vient juste avant ${n} ?`,
        format: "qcm",
        choices: makeChoices(String(n - 1), [
          String(n - 10),
          String(dizaines * 10 - 10 + 1),
          String(n + 1),
          String(dizaines),
        ]),
        expected: [String(n - 1)],
        comparator: "mcq_exact",
        explanation: exp(
          "Reculer depuis un nombre entier de dizaines demande de casser une dizaine.",
          "On transforme une dizaine en dix unités, puis on recule d'une unité.",
          `${n}, c'est ${dizaines} dizaines et 0 unité. En reculant d'un, on obtient ${dizaines - 1} dizaines et 9 unités, soit ${n - 1}.`,
          `Avant ${n} vient ${n - 1}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SUITE_2_5_10 — de 2 en 2, de 5 en 5, de 10 en 10
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_suite_2_5_10_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_2_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Continue de 10 en 10 : 23 ; 33 ; 43 ; …",
    format: "short",
    expected: ["53"],
    comparator: "number_equal",
    hint: "Compter de 10 en 10 ne change que le chiffre des dizaines.",
    explanation: exp(
      "Compter de dix en dix, c'est ajouter une dizaine à chaque étape.",
      "On augmente le chiffre des dizaines de un, et on ne touche pas aux unités.",
      "23, 33, 43 : le 3 des unités ne bouge jamais, seules les dizaines montent. Après 43 vient donc 53.",
      "Le nombre suivant est 53.",
    ),
    tags: ["cp", "suite_nombre", "pas", "piege"],
  },
  {
    kind: "template",
    id: "cp_suite_2_5_10_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_2_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien la suite avance à chaque étape.",
    tags: ["cp", "suite_nombre", "pas", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(1, 40);
      const suite = [depart, depart + pas, depart + 2 * pas];
      return {
        text: `Continue de ${pas} en ${pas} : ${suite.join(" ; ")} ; …`,
        format: "short",
        expected: [String(depart + 3 * pas)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite régulière, on ajoute toujours le même nombre.",
          "On repart du dernier nombre écrit et on ajoute le pas.",
          `${depart + 2 * pas} + ${pas} = ${depart + 3 * pas}.`,
          `Le nombre suivant est ${depart + 3 * pas}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_2_5_10_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_2_5_10",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule l'écart entre deux nombres qui se suivent.",
    tags: ["cp", "suite_nombre", "pas", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(3, 40);
      const suite = [depart, depart + pas, depart + 2 * pas, depart + 3 * pas];
      return {
        text: `De combien avance cette suite à chaque étape : ${suite.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(String(pas), ["1", "2", "5", "10"].filter((x) => x !== String(pas))),
        expected: [String(pas)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le pas d'une suite régulière est ce qu'on ajoute entre deux nombres qui se suivent.",
          "On enlève un nombre au suivant pour trouver l'écart, puis on vérifie sur une autre paire.",
          `${depart + pas} - ${depart} = ${pas}. On vérifie plus loin : ${depart + 3 * pas} - ${depart + 2 * pas} = ${pas}. C'est bien le même écart partout.`,
          `La suite avance de ${pas} à chaque étape.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SUITE_COMPLETER — les trous au milieu
  ========================================================= */
  {
    kind: "template",
    id: "cp_suite_completer_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux trous : remplis d'abord celui qui touche un nombre écrit.",
    tags: ["cp", "suite_nombre", "completer", "template"],
    generate: () => {
      // Une bande numérique lacunaire, comme celle que le BO fait compléter.
      const depart = randomInt(5, 90);
      const suite = [depart, depart + 1, depart + 2, depart + 3, depart + 4];
      const trous = shuffle([1, 2, 3]).slice(0, 2).sort((a, b) => a - b);
      const affichee = suite.map((n, i) => (trous.includes(i) ? "…" : String(n)));
      const cherche = trous[0];
      return {
        text: `Dans cette bande, quel nombre va dans le PREMIER trou : ${affichee.join(" ; ")} ?`,
        format: "short",
        expected: [String(suite[cherche])],
        comparator: "number_equal",
        explanation: exp(
          "Dans une bande numérique, les nombres se suivent de un en un.",
          "On part d'un nombre écrit et on avance jusqu'au trou, case par case.",
          `Le premier trou est ${cherche === 1 ? `juste après ${suite[0]}` : `à ${cherche} places après ${suite[0]}`} : c'est ${suite[cherche]}.`,
          `Le premier trou est ${suite[cherche]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_completer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie ta réponse des deux côtés du trou.",
    tags: ["cp", "suite_nombre", "completer", "template"],
    generate: () => {
      const depart = randomInt(5, 90);
      const suite = [depart, depart + 1, depart + 2, depart + 3];
      const trou = randomInt(1, 2);
      const affichee = suite.map((n, i) => (i === trou ? "…" : String(n)));
      return {
        text: `Complète : ${affichee.join(" ; ")}`,
        format: "short",
        expected: [String(suite[trou])],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite de un en un, on peut retrouver un nombre manquant depuis la gauche ou depuis la droite.",
          "On avance depuis le nombre de gauche, puis on vérifie en reculant depuis celui de droite.",
          `Après ${suite[trou - 1]} vient ${suite[trou]}, et avant ${suite[trou + 1]} vient aussi ${suite[trou]}.`,
          `Le nombre manquant est ${suite[trou]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_completer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve d'abord le pas de la suite, ensuite le trou.",
    tags: ["cp", "suite_nombre", "completer", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(2, 35);
      const suite = [depart, depart + pas, depart + 2 * pas, depart + 3 * pas];
      const trou = randomInt(1, 2);
      const affichee = suite.map((n, i) => (i === trou ? "…" : String(n)));
      return {
        text: `Complète : ${affichee.join(" ; ")}`,
        format: "short",
        expected: [String(suite[trou])],
        comparator: "number_equal",
        explanation: exp(
          "Pour compléter une suite régulière, il faut d'abord trouver de combien elle avance.",
          "On calcule l'écart entre deux nombres écrits côte à côte, puis on l'applique au trou.",
          // On cite une paire qui ne contient PAS le trou, sinon l'écart cité
          // vaudrait deux pas et l'explication se contredirait.
          `L'écart entre ${trou === 1 ? suite[2] : suite[0]} et ${trou === 1 ? suite[3] : suite[1]} montre que la suite avance de ${pas}. En ajoutant ${pas} à ${suite[trou - 1]}, on obtient ${suite[trou]}.`,
          `Le nombre manquant est ${suite[trou]}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SUITE_DEFI — la suite qui descend, et le pas à deviner
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_suite_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite descend de 10 en 10 : 82 ; 72 ; 62 ; … Quel nombre vient ensuite ?",
    format: "short",
    expected: ["52"],
    comparator: "number_equal",
    hint: "On retire une dizaine à chaque fois : les unités ne bougent pas.",
    explanation: exp(
      "Une suite peut descendre : on retire alors toujours le même nombre.",
      "On repère le pas, puis on l'enlève au dernier nombre écrit.",
      "82, 72, 62 : le 2 des unités ne bouge pas, seules les dizaines descendent. Après 62 vient donc 52.",
      "Le nombre suivant est 52.",
    ),
    tags: ["cp", "suite_nombre", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_suite_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La suite monte-t-elle ou descend-elle ?",
    tags: ["cp", "suite_nombre", "defi", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(50, 95);
      const suite = [depart, depart - pas, depart - 2 * pas];
      const suivant = depart - 3 * pas;
      return {
        text: `Continue cette suite : ${suite.join(" ; ")} ; …`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite régulière peut monter ou descendre ; on commence par regarder de quel côté elle va.",
          "On calcule l'écart entre deux nombres, on vérifie sur une autre paire, puis on continue.",
          `${depart} puis ${depart - pas} : la suite DESCEND de ${pas}. Après ${depart - 2 * pas} vient donc ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_suite_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "cp_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie le pas sur DEUX écarts avant de conclure.",
    tags: ["cp", "suite_nombre", "defi", "piege", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(3, 40);
      const suite = [depart, depart + pas, depart + 2 * pas, depart + 3 * pas];
      // ⚠️ L'élève annonce tantôt le bon pas, tantôt un pas faux : sans cela,
      // la réponse serait toujours « non » et le gabarit s'apprendrait par
      // cœur sans lire l'énoncé.
      const aRaison = randomChoice([true, false]);
      const annonce = aRaison ? pas : pas + 1;
      return {
        text: `Un élève écrit la suite ${suite.slice(0, 3).join(" ; ")} et dit qu'elle avance de ${annonce}. A-t-il raison ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [aRaison ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le pas d'une suite se vérifie sur plusieurs écarts, pas seulement sur le premier coup d'œil.",
          "On calcule l'écart entre deux nombres qui se suivent, puis on le vérifie sur la paire suivante.",
          aRaison
            ? `${suite[1]} - ${suite[0]} = ${pas}, et ${suite[2]} - ${suite[1]} = ${pas} aussi. L'élève annonce bien ${pas}.`
            : `${suite[1]} - ${suite[0]} = ${pas}, et non ${annonce}. Avec un pas de ${annonce}, le deuxième nombre serait ${depart + annonce}, ce qui n'est pas ce qui est écrit.`,
          aRaison ? `Oui : la suite avance bien de ${pas}.` : `Non : la suite avance de ${pas}.`,
        ),
      };
    },
  },
];
