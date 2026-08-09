// lib/tutor-v4/questionBank/ce1/maths/donnees.bank.ts
//
// L'organisation et la gestion de données du CE1, écrite à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) : les élèves
// sont initiés au recueil de données, notamment par des enquêtes, et à leur
// présentation sous forme de TABLEAUX et de DIAGRAMMES EN BARRES. Le CE1 lit,
// interprète, complète et PRODUIT — produire est un attendu à part entière,
// pas seulement lire.
//
// LE PIÈGE DE LA NOTION : la graduation. Trois carreaux sur un axe gradué de
// 5 en 5 valent 15, pas 3. L'élève compte les carreaux au lieu de lire l'axe.
//
// ⛔ CANVAS : `stat_graph` avec `showValues: true` écrit la hauteur au-dessus
// de chaque barre — sur une question de lecture, il donne la réponse. On le
// laisse donc à false, sauf quand la question porte sur autre chose que la
// lecture d'une barre.
//
// ⚠️ On privilégie les GÉNÉRATEURS : un tableau ou un diagramme dont on change
// les valeurs pose une question neuve à chaque tirage. Les items figés sont
// réservés aux valeurs qui SONT la leçon — ici, la graduation qui trompe.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

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

function statGraph(data: Omit<StatGraphCanvasData, "kind">): StatGraphCanvasData {
  return { kind: "stat_graph", ...data };
}

function tableau(data: Omit<TableauDonneesCanvasData, "kind">): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Des enquêtes de classe, comme celles que le programme suggère. */
const ENQUETES = [
  { sujet: "les fruits préférés de la classe", items: ["letchis", "mangues", "bananes", "ananas"] },
  { sujet: "les animaux préférés de la classe", items: ["chiens", "chats", "poissons", "oiseaux"] },
  { sujet: "les jeux de la récréation", items: ["ballon", "élastique", "billes", "cache-cache"] },
  { sujet: "les moyens de venir à l'école", items: ["à pied", "en car", "en voiture", "à vélo"] },
] as const;

export const donneesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DONNEES_LIRE_TABLEAU — lire une case
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_lire_tableau_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche la ligne, puis lis la valeur.",
    tags: ["ce1", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = enquete.items.map(() => randomInt(2, 15));
      const i = randomInt(0, enquete.items.length - 1);
      return {
        text: `Ce tableau donne ${enquete.sujet}. Combien d'élèves ont choisi « ${enquete.items[i]} » ?`,
        format: "short",
        expected: [String(valeurs[i])],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau range les données : chaque ligne dit à quoi correspond le nombre écrit à côté.",
          "On cherche la ligne demandée, puis on lit la valeur inscrite.",
          `Sur la ligne « ${enquete.items[i]} », on lit ${valeurs[i]}.`,
          `${valeurs[i]} élèves ont choisi « ${enquete.items[i]} ».`,
        ),
        canvas: tableau({
          headers: ["Choix", "Nombre d'élèves"],
          rows: enquete.items.map((it, k) => ({ values: [it, valeurs[k]] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_lire_tableau_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les nombres de chaque ligne.",
    tags: ["ce1", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      // Des valeurs toutes différentes : sinon la question n'a pas de réponse
      // unique et deux propositions seraient justes.
      const valeurs = shuffle([3, 6, 9, 12, 15, 18]).slice(0, enquete.items.length);
      const cherchePlus = randomChoice([true, false]);
      const cible = cherchePlus ? Math.max(...valeurs) : Math.min(...valeurs);
      const bonne = enquete.items[valeurs.indexOf(cible)];
      return {
        text: `Ce tableau donne ${enquete.sujet}. Quel choix a été fait par le ${cherchePlus ? "PLUS" : "MOINS"} d'élèves ?`,
        format: "qcm",
        choices: makeChoices(bonne, enquete.items.filter((it) => it !== bonne)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un tableau permet de comparer des données d'un coup d'œil.",
          "On lit toutes les valeurs, puis on cherche la plus grande ou la plus petite.",
          `Les valeurs sont ${valeurs.join(", ")}. La ${cherchePlus ? "plus grande" : "plus petite"} est ${cible}, sur la ligne « ${bonne} ».`,
          `C'est « ${bonne} ».`,
        ),
        canvas: tableau({
          headers: ["Choix", "Nombre d'élèves"],
          rows: enquete.items.map((it, k) => ({ values: [it, valeurs[k]] })),
        }),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_DOUBLE_ENTREE — croiser une ligne et une colonne
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_double_entree_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_double_entree",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis la ligne avec le doigt, puis descends la colonne.",
    tags: ["ce1", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const classes = ["CP", "CE1", "CE2"];
      const colonnes = ["Filles", "Garçons"];
      const valeurs = classes.map(() => [randomInt(8, 16), randomInt(8, 16)]);
      const li = randomInt(0, classes.length - 1);
      const co = randomInt(0, colonnes.length - 1);
      return {
        text: `Dans ce tableau à double entrée, combien y a-t-il de ${colonnes[co].toLowerCase()} en ${classes[li]} ?`,
        format: "short",
        expected: [String(valeurs[li][co])],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau à double entrée croise deux renseignements : une ligne et une colonne.",
          "On suit la ligne demandée, puis on descend la colonne demandée : la réponse est à leur croisement.",
          `Sur la ligne ${classes[li]} et dans la colonne « ${colonnes[co]} », on lit ${valeurs[li][co]}.`,
          `Il y a ${valeurs[li][co]} ${colonnes[co].toLowerCase()} en ${classes[li]}.`,
        ),
        canvas: tableau({
          headers: ["Classe", ...colonnes],
          rows: classes.map((c, k) => ({ values: [c, ...valeurs[k]] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_double_entree_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_double_entree",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les deux nombres de la ligne.",
    tags: ["ce1", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const classes = ["CP", "CE1", "CE2"];
      const valeurs = classes.map(() => [randomInt(8, 16), randomInt(8, 16)]);
      const li = randomInt(0, classes.length - 1);
      const total = valeurs[li][0] + valeurs[li][1];
      return {
        text: `Dans ce tableau à double entrée, combien y a-t-il d'élèves en tout en ${classes[li]} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une ligne d'un tableau à double entrée se lit en entier : elle donne toutes les parties d'un même groupe.",
          "On additionne toutes les valeurs de la ligne.",
          `Sur la ligne ${classes[li]} : ${valeurs[li][0]} + ${valeurs[li][1]} = ${total}.`,
          `Il y a ${total} élèves en ${classes[li]}.`,
        ),
        canvas: tableau({
          headers: ["Classe", "Filles", "Garçons"],
          rows: classes.map((c, k) => ({ values: [c, ...valeurs[k]] })),
        }),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_LIRE_GRAPHIQUE — lire un diagramme en barres
     LE piège de la notion vit ici : la graduation.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_donnees_graphique_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_lire_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un diagramme en barres, l'axe est gradué de 5 en 5. Une barre monte jusqu'au troisième trait. Combien vaut-elle ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Chaque trait vaut 5, pas 1.",
    explanation: exp(
      "Sur un diagramme, la hauteur d'une barre se lit sur l'axe gradué, pas en comptant les traits.",
      "On regarde d'abord de combien en combien l'axe est gradué.",
      "L'axe avance de 5 en 5 : le premier trait vaut 5, le deuxième 10, le troisième 15. La barre vaut 15, pas 3.",
      "Elle vaut 15.",
    ),
    tags: ["ce1", "donnees", "graphique", "piege"],
  },
  {
    kind: "template",
    id: "ce1_donnees_graphique_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_lire_graphique",
    difficulty: 3,
    theme: "reunion",
    hint: "Repère la barre, puis lis sa hauteur sur l'axe.",
    tags: ["ce1", "donnees", "graphique", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = shuffle([4, 7, 10, 13, 16, 19]).slice(0, enquete.items.length);
      const i = randomInt(0, enquete.items.length - 1);
      return {
        text: `Ce diagramme en barres donne ${enquete.sujet}. Combien d'élèves ont choisi « ${enquete.items[i]} » ?`,
        format: "short",
        expected: [String(valeurs[i])],
        comparator: "number_equal",
        explanation: exp(
          "Dans un diagramme en barres, la hauteur de chaque barre donne la quantité.",
          "On repère la barre demandée, puis on lit sa hauteur sur l'axe.",
          `La barre « ${enquete.items[i]} » monte jusqu'à ${valeurs[i]}.`,
          `${valeurs[i]} élèves ont choisi « ${enquete.items[i]} ».`,
        ),
        // ⛔ showValues resterait affiché au-dessus des barres : la question
        // deviendrait une lecture de nombre, plus une lecture de graphique.
        canvas: statGraph({
          graphType: "barres",
          data: enquete.items.map((it, k) => ({ label: it, value: valeurs[k] })),
          display: { showValues: false, showLabels: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_graphique_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_lire_graphique",
    difficulty: 4,
    theme: "neutral",
    hint: "Ne compte pas les traits : regarde ce que vaut chacun.",
    tags: ["ce1", "donnees", "graphique", "piege", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10] as const);
      const traits = randomInt(2, 6);
      const valeur = pas * traits;
      return {
        text: `Sur un diagramme, l'axe est gradué de ${pas} en ${pas}. Une barre monte jusqu'au trait numéro ${traits}. Combien vaut-elle ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "La hauteur d'une barre se lit sur l'axe gradué, pas en comptant les traits.",
          "On regarde de combien en combien l'axe avance, puis on multiplie par le nombre de traits.",
          `Chaque trait vaut ${pas} : ${traits} × ${pas} = ${valeur}. La barre vaut ${valeur}, et non ${traits}.`,
          `Elle vaut ${valeur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_INTERPRETER — répondre à une question
     Le programme dit « lire ET INTERPRÉTER » : comparer,
     totaliser, chercher l'écart.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_interpreter_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_interpreter",
    difficulty: 4,
    theme: "reunion",
    hint: "Lis les deux barres, puis cherche l'écart.",
    tags: ["ce1", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = shuffle([3, 6, 9, 12, 15, 18]).slice(0, enquete.items.length);
      const [i, j] = shuffle([0, 1, 2, 3].slice(0, enquete.items.length)).slice(0, 2);
      const ecart = Math.abs(valeurs[i] - valeurs[j]);
      return {
        text: `Ce diagramme donne ${enquete.sujet}. Combien d'élèves de plus ont choisi « ${valeurs[i] > valeurs[j] ? enquete.items[i] : enquete.items[j]} » que « ${valeurs[i] > valeurs[j] ? enquete.items[j] : enquete.items[i]} » ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Interpréter un diagramme, c'est répondre à une question qui n'est pas écrite dessus.",
          "On lit les deux barres concernées, puis on cherche l'écart entre elles.",
          `Les deux barres valent ${Math.max(valeurs[i], valeurs[j])} et ${Math.min(valeurs[i], valeurs[j])}. L'écart est ${Math.max(valeurs[i], valeurs[j])} - ${Math.min(valeurs[i], valeurs[j])} = ${ecart}.`,
          `Il y en a ${ecart} de plus.`,
        ),
        canvas: statGraph({
          graphType: "barres",
          data: enquete.items.map((it, k) => ({ label: it, value: valeurs[k] })),
          display: { showValues: false, showLabels: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_interpreter_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du tableau.",
    tags: ["ce1", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = enquete.items.map(() => randomInt(3, 12));
      const total = valeurs.reduce((s, v) => s + v, 0);
      return {
        text: `Ce tableau donne ${enquete.sujet}. Combien d'élèves ont répondu à l'enquête en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une enquête, c'est la somme de toutes les réponses.",
          "On additionne toutes les valeurs du tableau, sans en oublier une.",
          `${valeurs.join(" + ")} = ${total}.`,
          `${total} élèves ont répondu.`,
        ),
        canvas: tableau({
          headers: ["Choix", "Nombre d'élèves"],
          rows: enquete.items.map((it, k) => ({ values: [it, valeurs[k]] })),
        }),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_COMPLETER_TABLEAU — remplir une case vide
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_completer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Le total est connu : enlève ce qui est déjà écrit.",
    tags: ["ce1", "donnees", "completer", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = enquete.items.map(() => randomInt(3, 12));
      const total = valeurs.reduce((s, v) => s + v, 0);
      const i = randomInt(0, enquete.items.length - 1);
      const connus = valeurs.filter((_, k) => k !== i);
      return {
        text: `Dans ce tableau, la case « ${enquete.items[i]} » est effacée. On sait que ${total} élèves ont répondu en tout. Combien vaut la case effacée ?`,
        format: "short",
        expected: [String(valeurs[i])],
        comparator: "number_equal",
        explanation: exp(
          "Quand le total est connu, une case manquante se retrouve par soustraction.",
          "On additionne les cases connues, puis on enlève ce total au total général.",
          `Les cases connues font ${connus.join(" + ")} = ${connus.reduce((s, v) => s + v, 0)}. Puis ${total} - ${connus.reduce((s, v) => s + v, 0)} = ${valeurs[i]}.`,
          `La case vaut ${valeurs[i]}.`,
        ),
        canvas: tableau({
          headers: ["Choix", "Nombre d'élèves"],
          rows: enquete.items.map((it, k) => ({
            values: [it, k === i ? "?" : valeurs[k]],
          })),
        }),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_PRODUIRE — fabriquer le tableau ou le diagramme
     Attendu à part entière du programme.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_produire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_produire",
    difficulty: 4,
    theme: "neutral",
    hint: "Une barre par réponse possible, pas une par élève.",
    tags: ["ce1", "donnees", "produire", "template"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const eleves = randomInt(18, 26);
      return {
        text: `La classe fait une enquête sur ${enquete.sujet}, avec ${enquete.items.length} réponses possibles et ${eleves} élèves. Combien de barres faut-il dessiner sur le diagramme ?`,
        format: "short",
        expected: [String(enquete.items.length)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un diagramme en barres, il y a une barre par RÉPONSE POSSIBLE, pas une par personne.",
          "On compte les réponses proposées dans l'enquête.",
          `Il y a ${enquete.items.length} réponses possibles : ${enquete.items.join(", ")}. Il faut donc ${enquete.items.length} barres. Les ${eleves} élèves se répartissent dedans, ils ne font pas ${eleves} barres.`,
          `Il faut ${enquete.items.length} barres.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_produire_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_produire",
    difficulty: 4,
    theme: "neutral",
    hint: "La barre la plus haute doit tenir sur l'axe.",
    tags: ["ce1", "donnees", "produire", "template"],
    generate: () => {
      const valeurs = shuffle([6, 9, 11, 14, 17, 21]).slice(0, 4);
      const maxi = Math.max(...valeurs);
      const hauteurs = [10, 15, 20, 25].filter((h) => h >= maxi);
      const bonne = String(hauteurs[0]);
      return {
        text: `On veut dessiner un diagramme avec ces valeurs : ${valeurs.join(", ")}. Jusqu'à quelle hauteur, au minimum, doit monter l'axe ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          String(Math.max(5, maxi - 5)),
          String(valeurs.length),
          String(Number(bonne) + 20),
          String(Math.min(...valeurs)),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'axe d'un diagramme doit être assez haut pour que toutes les barres tiennent.",
          "On cherche la plus grande valeur, puis on choisit une hauteur d'axe au moins égale.",
          `La plus grande valeur est ${maxi} : un axe qui s'arrête plus bas couperait cette barre. L'axe doit donc monter au moins jusqu'à ${bonne}.`,
          `Jusqu'à ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DONNEES_DEFI — les défis
  ========================================================= */
  {
    kind: "template",
    id: "ce1_donnees_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Additionne d'abord les autres réponses.",
    tags: ["ce1", "donnees", "defi", "template", "canvas"],
    generate: () => {
      const enquete = randomChoice(ENQUETES);
      const valeurs = enquete.items.map(() => randomInt(3, 10));
      const total = valeurs.reduce((s, v) => s + v, 0);
      const absents = randomInt(2, 6);
      return {
        text: `Ce tableau donne ${enquete.sujet}. La classe compte ${total + absents} élèves, mais certains étaient absents le jour de l'enquête. Combien d'élèves étaient absents ?`,
        format: "short",
        expected: [String(absents)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau ne dit que ce qu'il contient : ce qui manque se retrouve par comparaison.",
          "On additionne toutes les réponses, puis on compare à l'effectif de la classe.",
          `Le tableau totalise ${valeurs.join(" + ")} = ${total} réponses. La classe compte ${total + absents} élèves : ${total + absents} - ${total} = ${absents}.`,
          `${absents} élèves étaient absents.`,
        ),
        canvas: tableau({
          headers: ["Choix", "Nombre d'élèves"],
          rows: enquete.items.map((it, k) => ({ values: [it, valeurs[k]] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_donnees_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce1_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la somme des deux barres à la troisième.",
    tags: ["ce1", "donnees", "defi", "template"],
    generate: () => {
      const a = randomInt(4, 10);
      const b = randomInt(4, 10);
      const c = randomChoice([a + b, a + b + randomInt(1, 4), a + b - randomInt(1, 3)]);
      const bonne = c === a + b
        ? "elles sont exactement égales"
        : c > a + b
          ? "la troisième est plus grande"
          : "la troisième est plus petite";
      return {
        text: `Sur un diagramme, trois barres valent ${a}, ${b} et ${c}. Compare la somme des deux premières à la troisième.`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "elles sont exactement égales",
          "la troisième est plus grande",
          "la troisième est plus petite",
          "on ne peut pas comparer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme sert à comparer des quantités, y compris des quantités qu'on calcule.",
          "On additionne les deux premières barres, puis on compare le résultat à la troisième.",
          `${a} + ${b} = ${a + b}, et la troisième barre vaut ${c}.`,
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },
];
