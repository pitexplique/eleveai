// lib/tutor-v4/questionBank/cp/maths/donnees.bank.ts
//
// Les tableaux et les diagrammes du CP, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Avant d'apprendre à extraire de l'information à partir de tableaux ou
//     de graphiques, les élèves apprennent au CP à ORGANISER sous la forme
//     d'un tableau ou d'un graphique des données QU'ILS ONT EUX-MÊMES
//     RECUEILLIES » ;
//   — l'enquête porte sur un caractère QUALITATIF prenant de DEUX À CINQ
//     valeurs, sur une population de moins de quarante individus ;
//   — recueil en bâtons, puis tableau, puis diagramme en barres — « un axe
//     vertical fournit l'échelle pour les barres, il est gradué DE UN EN UN » ;
//   — construire et compléter un TABLEAU À DOUBLE ENTRÉE représentant tous les
//     couples possibles à partir de deux critères, par exemple la forme et la
//     couleur ;
//   — interpréter avec les expressions : « le plus », « le moins », « le plus
//     grand », « le plus petit », « autant que », « plus que », « moins que ».
//
// LE PIÈGE DE LA NOTION : la case du croisement. Dans un tableau à double
// entrée, on suit la ligne du doigt, on suit la colonne de l'autre main, et on
// lit là où les deux se rencontrent — pas la première case venue de la ligne.
// Son cousin est le passage des bâtons au nombre : quatre bâtons regroupés
// quatre par quatre ne font pas quatre.
//
// ⚠️ Au CP l'axe est gradué de un en un : le piège de la graduation par cinq,
// qui guette au CE2, n'a pas lieu d'être ici.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  StatGraphCanvasData,
  TableauDonneesCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

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

function tableau(data: Omit<TableauDonneesCanvasData, "kind">): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

function barres(data: { label: string; value: number }[]): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data,
    display: {
      // ⛔ Les valeurs écrites au-dessus des barres donneraient la réponse.
      // On ne pose donc que des questions de comparaison : la plus haute, la
      // plus basse — ce que le BO demande justement au CP.
      showValues: false,
      showLabels: true,
    },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const FRUITS = ["orange", "fraise", "banane", "kiwi"] as const;
const ANIMAUX = ["chien", "chat", "poisson", "lapin"] as const;

export const donneesBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_DONNEES_LIRE_TABLEAU — lire une valeur dans un tableau
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve la ligne demandée, puis lis le nombre écrit à côté.",
    tags: ["cp", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const valeurs = FRUITS.map((f) => ({ label: f, value: randomInt(2, 14) }));
      const cible = randomChoice(valeurs);
      return {
        text: `Dans la classe, on a demandé à chacun son fruit préféré. Combien d'élèves ont répondu « ${cible.label} » ?`,
        format: "short",
        expected: [String(cible.value)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau range les résultats d'une enquête : chaque ligne porte une réponse et son nombre.",
          "On cherche la ligne demandée, puis on lit le nombre écrit en face.",
          `La ligne « ${cible.label} » indique ${cible.value}.`,
          `${cible.value} élèves préfèrent ce fruit.`,
        ),
        canvas: tableau({
          headers: ["Fruit préféré", "Nombre d'élèves"],
          rows: valeurs.map((v) => ({ values: [v.label, v.value] })),
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_lire_tableau_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compter les réponses d'une enquête, on fait d'abord des bâtons regroupés par paquets de cinq. On voit ||||| ||||| ||. Combien cela fait-il ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque paquet vaut 5. Compte les paquets, puis ce qui reste.",
    explanation: exp(
      "Les bâtons servent à compter au fil de l'enquête ; on les regroupe pour les relire facilement.",
      "On compte les paquets de cinq, puis les bâtons isolés.",
      "Deux paquets de 5 font 10, plus 2 bâtons isolés : 10 + 2 = 12. Compter les paquets comme des unités donnerait 3, ce qui serait faux.",
      "Cela fait 12.",
    ),
    tags: ["cp", "donnees", "lire_tableau", "piege"],
  },
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les lignes du tableau.",
    tags: ["cp", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const valeurs = ANIMAUX.slice(0, 3).map((a) => ({ label: a, value: randomInt(2, 9) }));
      const total = valeurs.reduce((s, v) => s + v.value, 0);
      return {
        text: "Combien d'élèves ont répondu à cette enquête en tout ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une enquête est la somme de toutes les réponses recueillies.",
          "On additionne les nombres de toutes les lignes.",
          `${valeurs.map((v) => v.value).join(" + ")} = ${total}.`,
          `${total} élèves ont répondu.`,
        ),
        canvas: tableau({
          headers: ["Animal préféré", "Nombre d'élèves"],
          rows: valeurs.map((v) => ({ values: [v.label, v.value] })),
        }),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_BARRES — lire un diagramme en barres
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_barres_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 2,
    theme: "neutral",
    hint: "La barre la plus haute correspond à la réponse la plus fréquente.",
    tags: ["cp", "donnees", "barres", "template", "canvas"],
    generate: () => {
      const valeurs = shuffle([...FRUITS]).map((f, i) => ({
        label: f,
        value: [3, 6, 9, 12][i] + randomInt(0, 1),
      }));
      const chercheMax = randomChoice([true, false]);
      const trie = [...valeurs].sort((a, b) => a.value - b.value);
      const bonne = chercheMax ? trie[trie.length - 1] : trie[0];
      return {
        text: `Quel fruit a été choisi par le ${chercheMax ? "PLUS" : "MOINS"} d'élèves ?`,
        format: "qcm",
        choices: shuffle(valeurs.map((v) => v.label)),
        expected: [bonne.label],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un diagramme en barres, plus une barre est haute, plus la réponse a été choisie.",
          "On compare les hauteurs des barres, sans avoir besoin de lire les nombres.",
          `La barre ${chercheMax ? "la plus haute" : "la plus basse"} est celle de « ${bonne.label} ».`,
          `C'est ${bonne.label}.`,
        ),
        canvas: barres(valeurs),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_barres_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un diagramme en barres, que veut dire une barre plus haute qu'une autre ?",
    format: "qcm",
    choices: [
      "que cette réponse a été choisie plus souvent",
      "que cette réponse est la meilleure",
      "que cette barre est plus large",
      "que cette réponse vient en premier",
    ],
    expected: ["que cette réponse a été choisie plus souvent"],
    comparator: "mcq_exact",
    hint: "La hauteur montre une quantité, pas une qualité.",
    explanation: exp(
      "Dans un diagramme en barres, la hauteur d'une barre représente le nombre de réponses.",
      "On lit la hauteur sur l'axe vertical, gradué de un en un.",
      "Une barre deux fois plus haute qu'une autre correspond à deux fois plus d'élèves. Cela ne dit rien sur la qualité de la réponse : le fruit le plus choisi n'est pas « le meilleur fruit ».",
      "Une barre plus haute veut dire que cette réponse a été choisie plus souvent.",
    ),
    tags: ["cp", "donnees", "barres", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_donnees_barres_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carreau vaut un élève : compte les carreaux de la barre.",
    tags: ["cp", "donnees", "barres", "template"],
    generate: () => {
      const carreaux = randomInt(3, 12);
      const animal = randomChoice([...ANIMAUX]);
      return {
        text: `Sur un diagramme en barres gradué de un en un, la barre du ${animal} monte jusqu'à ${carreaux} carreaux. Combien d'élèves ont choisi le ${animal} ?`,
        format: "short",
        expected: [String(carreaux)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un axe gradué de un en un, chaque carreau représente un individu.",
          "On compte les carreaux de la barre, un par un.",
          `La barre monte de ${carreaux} carreaux, et chaque carreau vaut un élève : cela fait ${carreaux} élèves.`,
          `${carreaux} élèves ont choisi le ${animal}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_COMPLETER_TABLEAU — le tableau à double entrée
     LE piège de la notion : la case du croisement.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_donnees_completer_tableau_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau à double entrée, comment trouve-t-on la case qui correspond aux ronds bleus ?",
    format: "qcm",
    choices: [
      "on suit la ligne des ronds et la colonne du bleu, et on lit là où elles se croisent",
      "on prend la première case de la ligne des ronds",
      "on prend la dernière case de la colonne du bleu",
      "on regarde la case du milieu",
    ],
    expected: [
      "on suit la ligne des ronds et la colonne du bleu, et on lit là où elles se croisent",
    ],
    comparator: "mcq_exact",
    hint: "Il faut les DEUX indications à la fois : la forme et la couleur.",
    explanation: exp(
      "Un tableau à double entrée croise deux critères : chaque case correspond à un couple, ici une forme et une couleur.",
      "On pose un doigt sur la ligne, un doigt sur la colonne, et on les fait glisser jusqu'à ce qu'ils se rencontrent.",
      "La ligne des ronds contient tous les ronds, de toutes les couleurs. La colonne du bleu contient tout ce qui est bleu, de toutes les formes. Seule la case où les deux se croisent contient les ronds ET bleus.",
      "On lit la case où la ligne et la colonne se croisent.",
    ),
    tags: ["cp", "donnees", "double_entree", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_donnees_completer_tableau_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis la ligne, suis la colonne, et lis le croisement.",
    tags: ["cp", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const formes = ["rond", "carré", "triangle"];
      const couleurs = ["bleu", "rouge", "vert"];
      const grille = formes.map(() => couleurs.map(() => randomInt(0, 6)));
      const iForme = randomInt(0, formes.length - 1);
      const iCouleur = randomInt(0, couleurs.length - 1);
      const valeur = grille[iForme][iCouleur];
      return {
        text: `Combien y a-t-il de ${formes[iForme]}s ${couleurs[iCouleur]}s ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau à double entrée, chaque case répond à deux questions à la fois.",
          "On suit la ligne de la forme et la colonne de la couleur, et on lit leur croisement.",
          `La ligne « ${formes[iForme]} » et la colonne « ${couleurs[iCouleur]} » se croisent sur la case qui contient ${valeur}.`,
          `Il y a ${valeur} ${formes[iForme]}s ${couleurs[iCouleur]}s.`,
        ),
        canvas: tableau({
          headers: ["", ...couleurs],
          rows: formes.map((f, i) => ({ values: [f, ...grille[i]] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_completer_tableau_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque forme peut prendre chaque couleur.",
    tags: ["cp", "donnees", "double_entree", "template"],
    generate: () => {
      const nbFormes = randomInt(2, 4);
      const nbCouleurs = randomInt(2, 4);
      const total = nbFormes * nbCouleurs;
      return {
        text: `Un tableau à double entrée croise ${nbFormes} formes et ${nbCouleurs} couleurs. Combien de cases contient-il ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau à double entrée contient une case pour chaque couple possible entre les deux critères.",
          "On compte les cases ligne par ligne.",
          `Chaque forme peut prendre les ${nbCouleurs} couleurs : cela fait ${nbCouleurs} cases par ligne. Avec ${nbFormes} lignes : ${Array.from({ length: nbFormes }, () => nbCouleurs).join(" + ")} = ${total}.`,
          `Le tableau contient ${total} cases.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_INTERPRETER — le plus, le moins, autant que
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_interpreter_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "« Plus que » veut dire davantage, « autant que » veut dire pareil.",
    tags: ["cp", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      const valeurs = FRUITS.slice(0, 3).map((f) => ({ label: f, value: randomInt(2, 12) }));
      const [a, b] = shuffle(valeurs).slice(0, 2);
      const bonne =
        a.value > b.value
          ? `plus que`
          : a.value < b.value
            ? `moins que`
            : `autant que`;
      return {
        text: `Dans cette enquête, y a-t-il plus, moins ou autant d'élèves qui ont choisi « ${a.label} » que d'élèves qui ont choisi « ${b.label} » ?`,
        format: "qcm",
        choices: shuffle(["plus que", "moins que", "autant que"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux données, c'est dire laquelle est la plus grande — ou si elles sont égales.",
          "On lit les deux nombres dans le tableau, puis on les compare.",
          `« ${a.label} » : ${a.value}. « ${b.label} » : ${b.value}. ${a.value === b.value ? "Les deux nombres sont égaux." : `${a.value} est ${a.value > b.value ? "plus grand" : "plus petit"} que ${b.value}.`}`,
          `Il y en a ${bonne}.`,
        ),
        canvas: tableau({
          headers: ["Fruit préféré", "Nombre d'élèves"],
          rows: valeurs.map((v) => ({ values: [v.label, v.value] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_interpreter_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche l'écart entre les deux nombres.",
    tags: ["cp", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      // ⚠️ Trois valeurs DISTINCTES : sinon « le plus aimé » et « le moins
      // aimé » peuvent désigner le même nombre, et l'écart tombe à zéro.
      const tirage = shuffle([2, 4, 6, 8, 10, 12, 15]).slice(0, 3);
      const valeurs = ANIMAUX.slice(0, 3).map((a, i) => ({ label: a, value: tirage[i] }));
      const trie = [...valeurs].sort((x, y) => y.value - x.value);
      const ecart = trie[0].value - trie[trie.length - 1].value;
      return {
        text: "Combien d'élèves de plus ont choisi l'animal le plus aimé, par rapport à l'animal le moins aimé ?",
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Comparer deux données chiffrées, c'est calculer leur écart.",
          "On repère la plus grande et la plus petite valeur, puis on les soustrait.",
          `La plus grande est « ${trie[0].label} » avec ${trie[0].value}, la plus petite est « ${trie[trie.length - 1].label} » avec ${trie[trie.length - 1].value}. ${trie[0].value} - ${trie[trie.length - 1].value} = ${ecart}.`,
          `Il y a ${ecart} élèves de plus.`,
        ),
        canvas: tableau({
          headers: ["Animal préféré", "Nombre d'élèves"],
          rows: valeurs.map((v) => ({ values: [v.label, v.value] })),
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_interpreter_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « il y a autant de chats que de chiens » ?",
    format: "qcm",
    choices: [
      "il y en a exactement le même nombre",
      "il y a plus de chats",
      "il y a plus de chiens",
      "il n'y a ni chat ni chien",
    ],
    expected: ["il y en a exactement le même nombre"],
    comparator: "mcq_exact",
    hint: "« Autant » va avec le signe =.",
    explanation: exp(
      "« Autant que » exprime l'égalité entre deux quantités.",
      "On compare les deux nombres du tableau.",
      "Si les deux barres du diagramme ont exactement la même hauteur, ou si les deux lignes du tableau portent le même nombre, alors il y a autant de chats que de chiens.",
      "Cela veut dire qu'il y en a exactement le même nombre.",
    ),
    tags: ["cp", "donnees", "interpreter", "lexique", "qcm"],
  },

  /* =========================================================
     CP_DONNEES_DEFI — l'enquête entière, du recueil à la lecture
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_donnees_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une classe de 24 élèves, tous ont répondu à l'enquête sur le fruit préféré. On compte 4 oranges, 12 fraises et 6 bananes. Combien d'élèves ont choisi un autre fruit ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le total des réponses doit faire 24.",
    explanation: exp(
      "Dans une enquête où tout le monde répond, la somme des réponses est égale au nombre de personnes interrogées.",
      "On additionne les réponses connues, puis on les enlève au total.",
      "4 + 12 + 6 = 22 réponses connues. Il y a 24 élèves : 24 - 22 = 2. Deux élèves ont choisi un autre fruit.",
      "2 élèves ont choisi un autre fruit.",
    ),
    tags: ["cp", "donnees", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_donnees_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La somme de toutes les réponses doit donner le nombre d'élèves.",
    tags: ["cp", "donnees", "defi", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(3, 12);
      const c = randomInt(2, 8);
      const manquant = randomInt(1, 6);
      const total = a + b + c + manquant;
      return {
        text: `Les ${total} élèves de la classe ont tous répondu à l'enquête. On compte ${a} pour « orange », ${b} pour « fraise » et ${c} pour « banane ». Combien ont répondu « kiwi » ?`,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation: exp(
          "Quand toute la classe répond, la somme des réponses est égale au nombre d'élèves.",
          "On additionne les réponses connues, puis on les enlève au total.",
          `${a} + ${b} + ${c} = ${a + b + c}. Puis ${total} - ${a + b + c} = ${manquant}.`,
          `${manquant} élèves ont répondu « kiwi ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une enquête ne peut pas donner plus de réponses qu'il n'y a de personnes.",
    tags: ["cp", "donnees", "defi", "piege", "template"],
    generate: () => {
      const eleves = randomInt(18, 30);
      const possible = randomChoice([true, false]);
      const compte = possible ? randomInt(2, eleves - 1) : eleves + randomInt(1, 8);
      return {
        text: `Dans une classe de ${eleves} élèves, chacun a donné une seule réponse. Un élève compte ${compte} réponses « chien ». Est-ce possible ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [possible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque personne interrogée ne donne qu'une réponse : aucune réponse ne peut dépasser le nombre de personnes.",
          "On compare le nombre trouvé au nombre d'élèves.",
          possible
            ? `${compte} est plus petit que ${eleves} : c'est possible, les ${eleves - compte} autres élèves ont répondu autre chose.`
            : `${compte} est plus grand que ${eleves}, le nombre d'élèves de la classe. C'est impossible : il faut recompter.`,
          possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
        ),
      };
    },
  },
];
