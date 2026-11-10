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
  CanvasFigure,
  DifficultyLevel,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";
import { cap, entre, etapes, gab, melange, prenom, qcm, qcmN, un } from "./geo-outils-ce1";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
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

const anciens: TutorBankItemV4[] = [
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

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins.
   Mesuré ce jour-là : 2 à 6 squelettes par micro hors « lire un tableau »,
   jusqu'à 19 répétitions sur 20. Les diagrammes n'avaient PAS d'axe gradué
   (`showAxis` absent) : sans valeur écrite sur les barres, on ne pouvait pas
   les lire. Les enquêtes changent (goûters, sports, couleurs, livres lus,
   météo de la semaine…), les tournures aussi, et chaque énoncé a son dessin.
   « Lire un tableau » (déjà robuste) est gardé tel quel.
   ═════════════════════════════════════════════════════════════════════════ */

const ND = "donnees";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(ND, micro, id, d, hint, gen);

/** Une enquête : un sujet, des réponses, l'unité comptée, qui a répondu. */
type Enquete = { sujet: string; items: string[]; unite: string; qui: string; enquete?: boolean };
const ENQ: Enquete[] = [
  { sujet: "le goûter préféré", items: ["pomme", "gâteau", "yaourt", "pain"], unite: "élèves", qui: "la classe" , enquete: true },
  { sujet: "le sport préféré", items: ["foot", "danse", "judo", "natation"], unite: "élèves", qui: "la classe" , enquete: true },
  { sujet: "la couleur préférée", items: ["rouge", "bleu", "vert", "jaune"], unite: "élèves", qui: "la classe" , enquete: true },
  { sujet: "l'animal préféré", items: ["chien", "chat", "lapin", "poisson"], unite: "élèves", qui: "la classe" , enquete: true },
  { sujet: "le jeu de la récréation", items: ["ballon", "billes", "corde", "loup"], unite: "élèves", qui: "l'école" , enquete: true },
  { sujet: "le moyen de venir à l'école", items: ["à pied", "en car", "en voiture", "à vélo"], unite: "élèves", qui: "l'école" , enquete: true },
  { sujet: "les livres lus ce mois-ci", items: ["Nina", "Téo", "Zoé", "Ravi"], unite: "livres", qui: "la bibliothèque" },
  { sujet: "les billes gagnées", items: ["Lina", "Tom", "Inès", "Noé"], unite: "billes", qui: "la récré" },
  { sujet: "les points au jeu de l'oie", items: ["Nina", "Téo", "Zoé", "Ravi"], unite: "points", qui: "la partie" },
  { sujet: "le métier rêvé", items: ["pompier", "vétérinaire", "maîtresse", "cuisinier"], unite: "élèves", qui: "la classe" , enquete: true },
  { sujet: "les jours de pluie", items: ["janvier", "février", "mars", "avril"], unite: "jours", qui: "le carnet météo" },
  { sujet: "les fleurs plantées", items: ["lundi", "mardi", "jeudi", "vendredi"], unite: "fleurs", qui: "le jardin de l'école" },
  { sujet: "les crêpes vendues", items: ["sucre", "chocolat", "confiture", "miel"], unite: "crêpes", qui: "la kermesse" },
  { sujet: "le fruit préféré", items: ["letchis", "mangue", "banane", "fraise"], unite: "élèves", qui: "la classe" , enquete: true },
];
const enquete = (n = 4) => {
  const e = un(ENQ);
  return { ...e, items: e.items.slice(0, n) };
};
/** Des valeurs toutes différentes, multiples du pas. */
function valeurs(n: number, pas: number, max: number) {
  const tout = Array.from({ length: Math.floor(max / pas) }, (_, k) => (k + 1) * pas);
  return melange(tout).slice(0, n);
}
const barres = (e: { items: string[]; unite: string }, v: number[], pas: number, titre?: string): CanvasFigure =>
  ({ kind: "stat_graph", graphType: "barres", title: titre, data: e.items.map((label, k) => ({ label, value: v[k] })), display: { showValues: false, showLabels: true, showAxis: true, step: pas, axeY: e.unite } }) as CanvasFigure;
const table = (e: { items: string[]; unite: string }, v: (number | string)[], titre?: string, cell?: number): CanvasFigure =>
  ({ kind: "tableau_donnees", title: titre, headers: ["", `Nombre de ${e.unite}`], rows: e.items.map((it, k) => ({ values: [it, v[k]] })), ...(cell !== undefined ? { highlight: { cell: { row: cell, col: 1 } } } : {}) }) as CanvasFigure;
const intro = (e: Enquete, quoi: string) =>
  un(e.enquete ? [`Voici ${quoi} sur ${e.sujet}.`, `${cap(e.qui)} a fait une enquête : ${e.sujet}.`, `${prenom()} a noté ${e.sujet} dans ${quoi}.`] : [`Voici ${quoi} : ${e.sujet}.`, `${cap(quoi)} montre ${e.sujet}.`, `${prenom()} a noté ${e.sujet} dans ${quoi}.`]);
/** « de élèves » → « d'élèves ». */
const deU = (u: string) => (/^[aeéiou]/.test(u) ? `d'${u}` : `de ${u}`);
/** Un QCM chiffré avec l'unité, accordée : « 1 élève », « 3 élèves ». */
function qcmU(n: number, faux: number[], u: string) {
  const r = qcmN(n, faux, u);
  const s1 = (x: string) => x.replace(/^1 (\S+)s$/, "1 $1");
  return { ...r, choices: (r.choices ?? []).map(s1), expected: r.expected.map(s1) };
}
const q = (s: string) => `« ${s} »`;

/* ─────────────── ce1_donnees_double_entree ─────────────── */
const DE = "ce1_donnees_double_entree";
const DOUBLES = [
  { lignes: ["CP", "CE1", "CE2"], cols: ["Filles", "Garçons"], unite: "élèves", sujet: "les élèves de l'école" },
  { lignes: ["lundi", "mardi", "jeudi"], cols: ["Soleil", "Pluie"], unite: "heures", sujet: "la météo de la semaine" },
  { lignes: ["Nina", "Téo", "Zoé"], cols: ["Billes", "Cartes"], unite: "objets", sujet: "les trésors de la récré" },
  { lignes: ["matin", "midi", "soir"], cols: ["Vélos", "Voitures"], unite: "véhicules", sujet: "ce qui passe devant l'école" },
  { lignes: ["Ravi", "Lina", "Tom"], cols: ["Lu", "Écrit"], unite: "pages", sujet: "les pages de la semaine" },
  { lignes: ["CE1 A", "CE1 B", "CE1 C"], cols: ["Cantine", "Maison"], unite: "élèves", sujet: "le repas de midi" },
  { lignes: ["Équipe rouge", "Équipe bleue", "Équipe verte"], cols: ["Match 1", "Match 2"], unite: "points", sujet: "le tournoi de l'école" },
];
function doubleEntree(mode: "case" | "ligne" | "plus") {
  const d = un(DOUBLES);
  const v = d.lignes.map(() => [entre(2, 15), entre(2, 15)]);
  const li = entre(0, 2);
  const co = entre(0, 1);
  const canvas = { kind: "tableau_donnees", title: cap(d.sujet), headers: ["", ...d.cols], rows: d.lignes.map((l, k) => ({ values: [l, ...v[k]] })) } as CanvasFigure;
  if (mode === "case") {
    const n = v[li][co];
    return {
      text: `${un(["Lis le tableau.", "Regarde ce tableau.", ""])} ${un([`Ligne ${q(d.lignes[li])}, colonne ${q(d.cols[co])} : quel nombre lis-tu ?`, `Quel nombre est au croisement de ${q(d.lignes[li])} et ${q(d.cols[co])} ?`])}`.trim(),
      ...qcmN(n, [v[li][1 - co], v[(li + 1) % 3][co], v[li][0] + v[li][1]]),
      canvas,
      explanation: etapes("on suit la ligne, puis on descend la colonne.", `Ligne ${d.lignes[li]}, colonne ${d.cols[co]} : ${n}.`, `On lit ${n}.`),
    };
  }
  if (mode === "ligne") {
    const t = v[li][0] + v[li][1];
    return {
      text: `${un(["Regarde ce tableau.", `Voici ${d.sujet}.`])} ${un([`Combien en tout pour ${q(d.lignes[li])} ?`, `Ajoute les deux cases de la ligne ${q(d.lignes[li])}. Combien trouves-tu ?`])}`,
      ...qcmN(t, [v[li][0], v[li][1], t + 10, t - 1, t + 1]),
      canvas,
      explanation: etapes("on additionne les nombres de la ligne.", `${v[li][0]} + ${v[li][1]} = ${t}.`, `${t} en tout.`),
    };
  }
  // Qui a le plus dans une colonne ?
  const col = v.map((r) => r[co]);
  if (new Set(col).size < 3) return doubleEntree("case");
  const plus = Math.random() < 0.6;
  const k = col.indexOf(plus ? Math.max(...col) : Math.min(...col));
  return {
    text: `${un(["Regarde ce tableau.", `Voici ${d.sujet}.`])} ${un([`Dans la colonne ${q(d.cols[co])}, quelle ligne a le ${plus ? "plus grand" : "plus petit"} nombre ?`, `Colonne ${q(d.cols[co])} : qui a le ${plus ? "plus" : "moins"} ?`])}`,
    ...qcm(d.lignes[k], d.lignes.filter((_, j) => j !== k)),
    canvas,
    explanation: etapes(`on lit seulement la colonne ${d.cols[co]}.`, `${d.lignes.map((l, j) => `${l} : ${col[j]}`).join(", ")}.`, `C'est ${q(d.lignes[k])}.`),
  };
}

/* ─────────────── ce1_donnees_lire_graphique ─────────────── */
const LG = "ce1_donnees_lire_graphique";
function lireBarre(pas: number) {
  const e = enquete(entre(3, 4));
  const v = valeurs(e.items.length, pas, pas === 1 ? 10 : pas * 8);
  const i = entre(0, e.items.length - 1);
  const traits = v[i] / pas;
  return {
    text: `${intro(e, "ce diagramme")} ${un([`Combien pour ${q(e.items[i])} ?`, `Quelle est la valeur de la barre ${q(e.items[i])} ?`, `Jusqu'à quel nombre monte la barre ${q(e.items[i])} ?`])}`,
    ...qcmU(v[i], [pas > 1 ? traits : v[i] + 1, v[i] + pas, v[i] - pas, v[(i + 1) % v.length]], e.unite),
    canvas: barres(e, v, pas),
    explanation: etapes(pas > 1 ? `l'axe avance de ${pas} en ${pas} : on lit le nombre, on ne compte pas les traits.` : "on suit le haut de la barre jusqu'à l'axe.", `La barre ${e.items[i]} arrive à ${v[i]}.`, `${v[i]} ${e.unite}.`),
  };
}
function quelleBarre() {
  const e = enquete(4);
  const pas = un([1, 2, 5]);
  const v = valeurs(4, pas, pas === 1 ? 10 : pas * 8);
  const i = entre(0, 3);
  return {
    text: `${intro(e, "ce diagramme")} ${un([`Quelle barre vaut ${v[i]} ?`, `Pour quelle réponse compte-t-on ${v[i]} ${e.unite} ?`])}`,
    ...qcm(e.items[i], e.items.filter((_, j) => j !== i)),
    canvas: barres(e, v, pas),
    explanation: etapes("on cherche sur l'axe le nombre, puis la barre qui arrive à cette hauteur.", `${v[i]} : c'est la barre ${e.items[i]}.`, `C'est ${q(e.items[i])}.`),
  };
}

/* ─────────────── ce1_donnees_interpreter ─────────────── */
const IN = "ce1_donnees_interpreter";
function interpreter(sorte: "barres" | "tableau") {
  const e = enquete(4);
  const pas = sorte === "barres" ? un([1, 2]) : 1;
  const v = valeurs(4, pas, sorte === "barres" ? pas * 9 : 20);
  const [i, j] = melange([0, 1, 2, 3]);
  const canvas = sorte === "barres" ? barres(e, v, pas) : table(e, v);
  const quoi = sorte === "barres" ? "ce diagramme" : "ce tableau";
  const cas = un(["ecart", "somme", "plus", "moins"] as const);
  if (cas === "ecart") {
    const [a, b] = v[i] > v[j] ? [i, j] : [j, i];
    const d = v[a] - v[b];
    return {
      text: `${intro(e, quoi)} ${un([`Combien de plus pour ${q(e.items[a])} que pour ${q(e.items[b])} ?`, `Quel est l'écart entre ${q(e.items[a])} et ${q(e.items[b])} ?`])}`,
      ...qcmU(d, [v[a] + v[b], v[a], v[b], d + 1, d - 1], e.unite),
      canvas,
      explanation: etapes("on lit les deux nombres, puis on cherche l'écart.", `${v[a]} − ${v[b]} = ${d}.`, `${d} ${e.unite} de plus.`),
    };
  }
  if (cas === "somme") {
    const s = v[i] + v[j];
    return {
      text: `${intro(e, quoi)} ${un([`Combien en tout pour ${q(e.items[i])} et ${q(e.items[j])} ?`, `On réunit ${q(e.items[i])} et ${q(e.items[j])}. Combien cela fait-il ?`])}`,
      ...qcmU(s, [Math.abs(v[i] - v[j]), s + 1, s - 1, s + pas * 2], e.unite),
      canvas,
      explanation: etapes("on lit les deux nombres, puis on les ajoute.", `${v[i]} + ${v[j]} = ${s}.`, `${s} ${e.unite}.`),
    };
  }
  const plus = cas === "plus";
  const k = v.indexOf(plus ? Math.max(...v) : Math.min(...v));
  return {
    text: `${intro(e, quoi)} ${un([`Quelle réponse a le ${plus ? "plus" : "moins"} ${deU(e.unite)} ?`, `Où y a-t-il le ${plus ? "plus" : "moins"} ${deU(e.unite)} ?`])}`,
    ...qcm(e.items[k], e.items.filter((_, x) => x !== k)),
    canvas,
    explanation: etapes(`on cherche la ${sorte === "barres" ? "barre" : "valeur"} la ${plus ? "plus grande" : "plus petite"}.`, `${e.items.map((it, x) => `${it} : ${v[x]}`).join(", ")}.`, `C'est ${q(e.items[k])}.`),
  };
}

/* ─────────────── ce1_donnees_completer_tableau ─────────────── */
const CT = "ce1_donnees_completer_tableau";
const BATONS = (n: number) => Array.from({ length: Math.floor(n / 5) }, () => "|||||").concat(n % 5 ? ["|".repeat(n % 5)] : []).join(" ");
function caseEffacee() {
  const e = enquete(entre(3, 4));
  const v = valeurs(e.items.length, 1, 15);
  const i = entre(0, e.items.length - 1);
  const total = v.reduce((a, b) => a + b, 0);
  const lignes = e.items.map((it, k) => ({ values: [it, k === i ? "?" : v[k]] }));
  return {
    text: `${un([`${cap(e.sujet)} : ${total} ${e.unite} en tout.`, `Pour ${e.sujet}, on compte ${total} ${e.unite} en tout.`])} ${un(["Quel nombre manque dans le tableau ?", "Que faut-il écrire à la place de « ? » ?"])}`,
    ...qcmN(v[i], [total, total - v[i] + 1, v[i] + 1, v[i] - 1]),
    canvas: { kind: "tableau_donnees", title: cap(e.sujet), headers: ["", `Nombre de ${e.unite}`], rows: [...lignes, { values: ["Total", total] }], highlight: { cell: { row: i, col: 1 } } } as CanvasFigure,
    explanation: etapes("on ajoute les nombres connus, puis on cherche ce qui manque pour aller au total.", `${v.filter((_, k) => k !== i).join(" + ")} = ${total - v[i]} ; de ${total - v[i]} à ${total}, il manque ${v[i]}.`, `On écrit ${v[i]}.`),
  };
}
function compterBatons() {
  const e = enquete(entre(3, 4));
  const v = valeurs(e.items.length, 1, 14);
  const i = entre(0, e.items.length - 1);
  return {
    text: `${prenom()} a fait un trait par réponse. ${un([`Quel nombre écrire pour ${q(e.items[i])} ?`, `Combien de traits pour ${q(e.items[i])} ?`])}`,
    ...qcmN(v[i], [v[i] + 1, v[i] - 1, Math.ceil(v[i] / 5), v[i] + 5]),
    canvas: { kind: "tableau_donnees", title: cap(e.sujet), caption: "||||| = 5 traits", headers: ["", "Traits", "Nombre"], rows: e.items.map((it, k) => ({ values: [it, BATONS(v[k]), k === i ? "?" : v[k]] })), highlight: { cell: { row: i, col: 2 } } } as CanvasFigure,
    explanation: etapes("on compte les traits par paquets de 5.", `${BATONS(v[i])} : ${Math.floor(v[i] / 5) ? `${Math.floor(v[i] / 5)} paquet${v[i] >= 10 ? "s" : ""} de 5 et ` : ""}${v[i] % 5} trait${v[i] % 5 > 1 ? "s" : ""}.`, `On écrit ${v[i]}.`),
  };
}

/* ─────────────── ce1_donnees_produire ─────────────── */
const PR = "ce1_donnees_produire";
function barreFausse() {
  const e = enquete(4);
  const pas = un([1, 2]);
  const v = valeurs(4, pas, pas * 8);
  const i = entre(0, 3);
  const dessin = v.map((x, k) => (k === i ? (x + pas <= pas * 9 && !v.includes(x + pas) ? x + pas : x - pas) : x));
  if (dessin[i] <= 0 || v.includes(dessin[i])) return barreFausse();
  const h = prenom();
  return {
    text: `${h} a compté : ${e.items.map((it, k) => `${it} ${v[k]}`).join(", ")}. ${un(["Voici le diagramme tracé.", "Voici son diagramme."])} ${un(["Quelle barre est fausse ?", "Une barre est fausse. Laquelle ?"])}`,
    ...qcm(e.items[i], e.items.filter((_, k) => k !== i)),
    canvas: barres(e, dessin, pas, cap(e.sujet)),
    explanation: etapes("on compare chaque barre au nombre compté.", `La barre ${e.items[i]} monte à ${dessin[i]} au lieu de ${v[i]}.`, `C'est la barre ${q(e.items[i])}.`),
  };
}
function hauteurBarre() {
  const e = enquete(4);
  const pas = un([2, 5]);
  const v = valeurs(4, pas, pas * 8);
  const i = v.findIndex((x) => x >= 2 * pas);
  const dessin = v.map((x, k) => (k === i ? 0 : x));
  const fin = { ...e, items: e.items.map((it, k) => (k === i ? `${it} ?` : it)) };
  return {
    text: `${prenom()} finit le diagramme. Il reste la barre ${q(e.items[i])} : ${v[i]} ${e.unite}. Chaque trait de l'axe vaut ${pas}. ${un(["La barre doit monter de combien de traits ?", "Combien de traits doit-elle monter ?"])}`,
    ...qcmU(v[i] / pas, [v[i], v[i] / pas + 1, v[i] / pas - 1], "traits"),
    canvas: barres(fin, dessin, pas, `Axe de ${pas} en ${pas}`),
    explanation: etapes(`chaque trait vaut ${pas}.`, `${v[i]} = ${v[i] / pas} × ${pas}.`, `La barre monte jusqu'au trait ${v[i] / pas}.`),
  };
}
/* ─────────────── ce1_donnees_defi ─────────────── */
const DF = "ce1_donnees_defi";
function defiTotal() {
  const e = enquete(entre(3, 4));
  const pas = un([2, 5]);
  const v = valeurs(e.items.length, pas, pas * 6);
  const n = v.reduce((a, b) => a + b, 0);
  return {
    text: `${un(["Défi !", "Pic lance un défi.", `${prenom()} lance un défi.`])} ${intro(e, "ce diagramme")} ${un([`Combien ${deU(e.unite)} en tout ?`, `Combien ${deU(e.unite)} au total ?`])}`,
    ...qcmU(n, [v.reduce((a, b) => a + b / pas, 0), n + pas, n - pas, Math.max(...v)], e.unite),
    canvas: barres(e, v, pas),
    explanation: etapes(`on lit chaque barre (l'axe va de ${pas} en ${pas}), puis on ajoute tout.`, `${v.join(" + ")} = ${n}.`, `${n} ${e.unite} en tout.`),
  };
}
function defiAutant() {
  const e = enquete(4);
  const v = valeurs(4, 1, 15);
  const [i, j] = melange([0, 1, 2, 3]);
  const [a, b] = v[i] > v[j] ? [i, j] : [j, i];
  const d = v[a] - v[b];
  return {
    text: `${un(["Défi !", "Attention, défi !"])} ${intro(e, "ce tableau")} ${un([`Combien ${deU(e.unite)} faut-il ajouter à ${q(e.items[b])} pour en avoir autant que ${q(e.items[a])} ?`, `Combien ${deU(e.unite)} manque-t-il à ${q(e.items[b])} pour égaler ${q(e.items[a])} ?`])}`,
    ...qcmU(d, [v[a] + v[b], v[a], d + 1, d - 1], e.unite),
    canvas: table(e, v, cap(e.sujet)),
    explanation: etapes("on cherche ce qui manque au plus petit pour égaler le plus grand.", `${v[b]} + ${d} = ${v[a]}.`, `Il en manque ${d}.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(DE, "ce1_donnees_double_entree_tpl_1", 4, "Suis la ligne avec le doigt, puis descends la colonne.", () => doubleEntree(un(["case", "case", "plus"] as const))),
  g(DE, "ce1_donnees_double_entree_tpl_2", 4, "Additionne les deux nombres de la ligne.", () => doubleEntree(un(["ligne", "ligne", "plus"] as const))),

  g(LG, "ce1_donnees_graphique_tpl_1", 3, "Repère la barre, puis lis sa hauteur sur l'axe.", () => (Math.random() < 0.65 ? lireBarre(1) : quelleBarre())),
  g(LG, "ce1_donnees_graphique_tpl_2", 4, "Ne compte pas les traits : regarde ce que vaut chacun.", () => lireBarre(un([2, 5, 10]))),
  g(LG, "ce1_donnees_graphique_tpl_3", 5, "Lis le nombre sur l'axe, pas le nombre de traits.", () => (Math.random() < 0.5 ? lireBarre(un([5, 10])) : quelleBarre())),

  g(IN, "ce1_donnees_interpreter_tpl_1", 4, "Lis les deux nombres, puis compare-les.", () => interpreter("barres")),
  g(IN, "ce1_donnees_interpreter_tpl_2", 4, "Lis toutes les valeurs avant de répondre.", () => interpreter("tableau")),

  g(CT, "ce1_donnees_completer_tpl_1", 4, "Ajoute les nombres connus, puis cherche ce qui manque.", () => caseEffacee()),
  g(CT, "ce1_donnees_completer_tpl_2", 4, "Compte les traits par paquets de 5.", () => compterBatons()),

  g(PR, "ce1_donnees_produire_tpl_1", 4, "Compare chaque barre au nombre compté.", () => barreFausse()),
  g(PR, "ce1_donnees_produire_tpl_2", 4, "Regarde de combien en combien avance l'axe.", () => hauteurBarre()),

  g(DF, "ce1_donnees_defi_tpl_1", 5, "Lis chaque barre, puis ajoute tout.", () => defiTotal()),
  g(DF, "ce1_donnees_defi_tpl_2", 5, "Combien manque-t-il au plus petit ?", () => defiAutant()),
];

const GARDES = new Set(["ce1_donnees_lire_tableau_tpl_1", "ce1_donnees_lire_tableau_tpl_2"]);
export const donneesBank: TutorBankItemV4[] = [...anciens.filter((i) => i.kind !== "template" || GARDES.has(i.id)), ...nouveaux];
