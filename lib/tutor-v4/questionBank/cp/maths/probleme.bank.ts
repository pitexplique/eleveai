// lib/tutor-v4/questionBank/cp/maths/probleme.bank.ts
//
// La résolution de problèmes au CP, écrite à la main. C'est le cœur du
// programme : « Les élèves doivent traiter AU MOINS DIX PROBLÈMES PAR
// SEMAINE », et les deux tiers du temps de mathématiques vont aux nombres, au
// calcul et aux problèmes.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — résoudre des problèmes additifs en une étape du type PARTIES-TOUT. Les
//     problèmes de transformation — ajout, retrait — se traitent comme des
//     problèmes de parties-tout ;
//   — résoudre des problèmes additifs EN DEUX ÉTAPES, champ numérique
//     inférieur ou égal à 30 ;
//   — résoudre des problèmes MULTIPLICATIFS en une étape, champ numérique
//     inférieur ou égal à 30 : chercher la valeur d'un tout fait de parts
//     égales, chercher le nombre de parts, ou chercher la valeur d'une part ;
//   — « Les données numériques des problèmes proposés aux élèves sont dans le
//     champ numérique maitrisé au CP, à savoir les nombres entiers jusqu'à
//     cent. »
//   — le BO décrit quatre phases : comprendre, modéliser, calculer, répondre.
//     Et il ajoute la RÉGULATION : se demander si le résultat trouvé est
//     possible.
//
// LE PIÈGE DE LA NOTION, et c'est le BO qui demande de le tendre :
// « L'enseignant veille à ce que les élèves n'automatisent pas l'opération à
// effectuer à partir de termes de l'énoncé, en proposant régulièrement des
// problèmes contenant des termes qui n'induisent pas l'opération attendue, par
// exemple des énoncés comportant le mot "plus" alors que l'opération à
// effectuer est une soustraction. » L'élève qui a appris « plus → addition,
// reste → soustraction » se fait prendre. Il faut lire l'histoire, pas les
// mots-clés.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas — même pour « explique ».

import type { SchemaBarreCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function schemaBarre(data: Omit<SchemaBarreCanvasData, "kind">): SchemaBarreCanvasData {
  return { kind: "schema_barre", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const PRENOMS = ["Malia", "Kevin", "Naïla", "Ryan", "Léa", "Enzo", "Anna", "Tom"] as const;

export const problemeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_PROBLEME_IDENTIFIER — comprendre ce qu'on cherche
     La phase que le BO dit « particulièrement importante ».
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_identifier",
    difficulty: 3,
    theme: "neutral",
    text: "« Anna avait 43 cerises. Elle en a mangé 18. » Que cherche-t-on si la question est : combien lui en reste-t-il ?",
    format: "qcm",
    choices: [
      "les cerises qui restent après le repas",
      "les cerises qu'elle a mangées",
      "les cerises qu'elle avait au début",
      "le nombre de cerises en trop",
    ],
    expected: ["les cerises qui restent après le repas"],
    comparator: "mcq_exact",
    hint: "Relis la question, pas seulement l'histoire.",
    explanation: exp(
      "Comprendre un problème, c'est savoir dire ce que l'on cherche, avec ses propres mots.",
      "On relit la question et on la reformule avant de calculer.",
      "L'histoire donne deux nombres : 43 au départ, 18 mangées. La question porte sur ce qui reste dans le bol à la fin. C'est cela qu'il faudra calculer, et rien d'autre.",
      "On cherche les cerises qui restent.",
    ),
    tags: ["cp", "probleme", "identifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_identifier",
    difficulty: 4,
    theme: "neutral",
    text: "« Léa a 3 billes de PLUS que Tom. Tom en a 8. Combien Léa en a-t-elle ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["8 + 3", "8 - 3", "3 - 8", "8 + 8"],
    expected: ["8 + 3"],
    comparator: "mcq_exact",
    hint: "Qui en a le plus ? Pars de celui dont tu connais le nombre.",
    explanation: exp(
      "Dans un problème de comparaison, on part de la quantité connue et on applique l'écart.",
      "On repère qui en a le plus, puis on ajoute ou on enlève l'écart.",
      "Tom a 8 billes. Léa en a 3 de plus que lui, donc davantage : 8 + 3 = 11. Ici le mot « plus » annonce bien une addition — mais ce n'est pas toujours le cas, et c'est l'histoire qui décide.",
      "Il faut calculer 8 + 3.",
    ),
    tags: ["cp", "probleme", "identifier", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_identifier_fixed_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_identifier",
    difficulty: 5,
    theme: "neutral",
    text: "« Léa a 12 billes. Elle en a 3 de PLUS que Tom. Combien Tom en a-t-il ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["12 - 3", "12 + 3", "3 - 12", "12 + 12"],
    expected: ["12 - 3"],
    comparator: "mcq_exact",
    hint: "Le mot « plus » est là, mais qui en a le plus ? Ce n'est pas Tom.",
    explanation: exp(
      "Le mot d'un énoncé ne décide pas de l'opération : c'est l'histoire qui décide.",
      "On regarde de qui on connait la quantité, et si celui qu'on cherche en a plus ou moins.",
      "On connait Léa : 12 billes. Léa en a 3 de plus que Tom, donc Tom en a 3 de MOINS qu'elle : 12 - 3 = 9. Le mot « plus » est bien dans l'énoncé, et pourtant il faut soustraire.",
      "Il faut calculer 12 - 3.",
    ),
    tags: ["cp", "probleme", "identifier", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "cp_probleme_identifier_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_identifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis la question : que demande-t-elle exactement ?",
    tags: ["cp", "probleme", "identifier", "template"],
    generate: () => {
      const debut = randomInt(15, 45);
      const change = randomInt(4, 12);
      // Prénoms féminins seulement : les questions disent « a-t-elle ».
      const qui = randomChoice(["Malia", "Naïla", "Léa", "Anna"]);
      const cas = randomChoice([
        {
          histoire: `${qui} avait ${debut} images. ${qui} en gagne ${change}.`,
          question: "Combien en a-t-elle maintenant ?",
          cherche: "le nombre d'images à la fin",
          pieges: [
            "le nombre d'images gagnées",
            "le nombre d'images du début",
            "le nombre d'images perdues",
          ],
        },
        {
          histoire: `${qui} avait ${debut} billes. ${qui} en perd ${change}.`,
          question: "Combien lui en reste-t-il ?",
          cherche: "le nombre de billes qui restent",
          pieges: [
            "le nombre de billes perdues",
            "le nombre de billes du début",
            "le nombre de billes gagnées",
          ],
        },
        {
          histoire: `${qui} avait ${debut} bonbons. Il ne lui en reste que ${debut - change}.`,
          question: "Combien en a-t-elle mangé ?",
          cherche: "le nombre de bonbons mangés",
          pieges: [
            "le nombre de bonbons qui restent",
            "le nombre de bonbons du début",
            "le nombre de bonbons achetés",
          ],
        },
      ]);
      return {
        text: `« ${cas.histoire} ${cas.question} » Que cherche-t-on ?`,
        format: "qcm",
        choices: makeChoices(cas.cherche, cas.pieges),
        expected: [cas.cherche],
        comparator: "mcq_exact",
        explanation: exp(
          "Comprendre un problème, c'est savoir dire ce que l'on cherche avant de calculer.",
          "On relit la question seule, sans l'histoire, et on la redit avec ses propres mots.",
          `L'histoire donne deux nombres, mais la question ne porte que sur une chose : ${cas.cherche}. Les autres nombres sont déjà connus, ou ne sont pas demandés.`,
          `On cherche ${cas.cherche}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_ADDITIF — parties-tout en une étape
  ========================================================= */
  {
    kind: "template",
    id: "cp_probleme_additif_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_additif",
    difficulty: 3,
    theme: "reunion",
    hint: "On réunit deux parts : c'est le tout qu'on cherche.",
    tags: ["cp", "probleme", "additif", "reunion", "template"],
    generate: () => {
      const a = randomInt(11, 45);
      const b = randomInt(6, 40);
      const total = a + b;
      const contexte = randomChoice([
        { qui: "Malia", objet: "letchis", ou: "au marché de Saint-Pierre" },
        { qui: "Kevin", objet: "billes", ou: "dans la cour" },
        { qui: "Naïla", objet: "coquillages", ou: "sur la plage de l'Hermitage" },
      ]);
      return {
        text: `${contexte.qui} a ramassé ${a} ${contexte.objet} ${contexte.ou}, puis ${b} de plus. Combien en a-t-${contexte.qui === "Kevin" ? "il" : "elle"} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un tout à partir de ses deux parts, c'est une addition.",
          "On repère les deux parts, puis on les réunit.",
          `Les deux parts sont ${a} et ${b} : ${a} + ${b} = ${total}.`,
          `${contexte.qui} en a ${total} en tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_additif_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_additif",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois wagons, trois parts : on les réunit toutes.",
    tags: ["cp", "probleme", "additif", "template"],
    generate: () => {
      const a = randomInt(10, 30);
      const b = randomInt(10, 35);
      const c = randomInt(5, 25);
      const total = a + b + c;
      return {
        text: `Dans un train de trois wagons, il y a ${a} passagers dans le premier wagon, ${b} dans le deuxième et ${c} dans le troisième. Combien y a-t-il de passagers en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un tout peut être fait de plus de deux parts : on les réunit toutes.",
          "On additionne les parts une par une.",
          `${a} + ${b} = ${a + b}, puis ${a + b} + ${c} = ${total}.`,
          `Il y a ${total} passagers en tout.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_probleme_additif_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_additif",
    difficulty: 5,
    theme: "neutral",
    text: "Il y avait 36 oiseaux dans l'arbre. Il n'en reste plus que 21. Combien d'oiseaux se sont envolés ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On connait le début et la fin : c'est ce qui est parti qu'on cherche.",
    explanation: exp(
      "Quand on connait l'état de départ et l'état d'arrivée, on cherche la transformation : ce qui a changé.",
      "On calcule l'écart entre le début et la fin.",
      "36 - 21 = 15. Autrement dit : 21 + 15 = 36. Quinze oiseaux ont quitté l'arbre.",
      "15 oiseaux se sont envolés.",
    ),
    tags: ["cp", "probleme", "additif", "piege"],
  },

  /* =========================================================
     CP_PROBLEME_SOUSTRACTIF — retrait et écart
  ========================================================= */
  {
    kind: "template",
    id: "cp_probleme_soustractif_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_soustractif",
    difficulty: 3,
    theme: "neutral",
    hint: "On enlève au départ ce qui est parti.",
    tags: ["cp", "probleme", "soustractif", "template"],
    generate: () => {
      const depart = randomInt(20, 60);
      const pris = randomInt(5, depart - 5);
      const reste = depart - pris;
      const h = randomChoice([
        { qui: "Anna", objet: "cerises", verbe: "en a mangé" },
        { qui: "Tom", objet: "billes", verbe: "en a perdu" },
        { qui: "Léa", objet: "images", verbe: "en a donné" },
      ]);
      return {
        text: `${h.qui} avait ${depart} ${h.objet}. ${h.qui} ${h.verbe} ${pris}. Combien lui en reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher ce qui reste après un retrait, c'est une soustraction.",
          "On part du nombre du début et on enlève ce qui est parti.",
          `${depart} - ${pris} = ${reste}.`,
          `Il lui en reste ${reste}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_soustractif_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_soustractif",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche l'écart entre les deux nombres.",
    tags: ["cp", "probleme", "soustractif", "template"],
    generate: () => {
      const [a, b] = shuffle([...PRENOMS]).slice(0, 2);
      const grand = randomInt(25, 70);
      const petit = randomInt(8, grand - 5);
      const ecart = grand - petit;
      return {
        text: `${a} a ${grand} images et ${b} en a ${petit}. Combien ${a} a-t-${a === "Kevin" || a === "Ryan" || a === "Enzo" || a === "Tom" ? "il" : "elle"} d'images de plus que ${b} ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Comparer deux quantités, c'est chercher leur écart.",
          "On enlève la plus petite quantité à la plus grande.",
          `${grand} - ${petit} = ${ecart}. Le mot « plus » apparait dans la question, et pourtant c'est bien une soustraction : on cherche la différence entre les deux.`,
          `${a} en a ${ecart} de plus.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_probleme_soustractif_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_soustractif",
    difficulty: 3,
    theme: "neutral",
    text: "Léa a 53 euros dans son portemonnaie. Elle achète un livre à 7 euros. Combien lui reste-t-il ?",
    format: "short",
    expected: ["46"],
    comparator: "number_equal",
    hint: "Acheter, c'est dépenser : l'argent diminue.",
    explanation: exp(
      "Une dépense diminue la somme dont on dispose.",
      "On enlève le prix à la somme de départ.",
      "53 - 7 = 46. On peut casser une dizaine : 53, c'est 40 et 13 ; 13 - 7 = 6, donc il reste 46.",
      "Il lui reste 46 euros.",
    ),
    tags: ["cp", "probleme", "soustractif"],
  },

  /* =========================================================
     CP_PROBLEME_SCHEMA — dessiner pour comprendre
     La phase « modéliser » du BO, avec le schéma en barre.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_schema_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_schema",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert de faire un schéma avant de calculer ?",
    format: "qcm",
    choices: [
      "à voir si l'on cherche le tout ou une part",
      "à rendre la copie plus jolie",
      "à trouver le résultat sans calculer",
      "à gagner du temps sur le calcul",
    ],
    expected: ["à voir si l'on cherche le tout ou une part"],
    comparator: "mcq_exact",
    hint: "Le schéma ne calcule rien : il montre ce qui est connu et ce qui manque.",
    explanation: exp(
      "Un schéma représente l'histoire du problème : il montre les parts, le tout, et ce qu'on cherche.",
      "On dessine ce qu'on connait, on met un point d'interrogation sur ce qu'on cherche.",
      "Une fois le schéma fait, on voit d'un coup d'œil si le point d'interrogation est sur le tout — alors on additionne — ou sur une part — alors on soustrait. Le schéma ne donne pas le résultat, il donne l'opération.",
      "Le schéma sert à voir si l'on cherche le tout ou une part.",
    ),
    tags: ["cp", "probleme", "schema", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_probleme_schema_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_schema",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde où est le point d'interrogation sur le schéma.",
    tags: ["cp", "probleme", "schema", "template", "canvas"],
    generate: () => {
      const part1 = randomInt(8, 35);
      const part2 = randomInt(6, 30);
      const total = part1 + part2;
      const chercheTout = randomChoice([true, false]);
      if (chercheTout) {
        return {
          text: "Sur ce schéma, quelle est la valeur du tout ?",
          format: "short",
          expected: [String(total)],
          comparator: "number_equal",
          explanation: exp(
            "Sur un schéma en barre, le tout est la barre entière et les parts sont ses morceaux.",
            "Quand les deux parts sont connues, on les additionne pour obtenir le tout.",
            `${part1} + ${part2} = ${total}.`,
            `Le tout vaut ${total}.`,
          ),
          canvas: schemaBarre({
            total: "?",
            parts: [
              { label: "part", value: String(part1) },
              { label: "part", value: String(part2) },
            ],
            display: { showTotal: true, showPartLabels: true, showValues: true },
          }),
        };
      }
      return {
        text: "Sur ce schéma, quelle est la valeur de la part qui manque ?",
        format: "short",
        expected: [String(part2)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un schéma en barre, une part manquante se retrouve en enlevant l'autre part au tout.",
          "On enlève la part connue au tout.",
          `${total} - ${part1} = ${part2}.`,
          `La part qui manque vaut ${part2}.`,
        ),
        canvas: schemaBarre({
          total: String(total),
          parts: [
            { label: "part", value: String(part1) },
            { label: "part", unknown: true },
          ],
          display: { showTotal: true, showPartLabels: true, showValues: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_schema_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_schema",
    difficulty: 4,
    theme: "neutral",
    hint: "Le tout est connu ou non ? C'est cela qui décide.",
    tags: ["cp", "probleme", "schema", "template"],
    generate: () => {
      const chercheTout = randomChoice([true, false]);
      const bonne = chercheTout ? "une addition" : "une soustraction";
      return {
        text: chercheTout
          ? "Dans un problème, on connait les deux parts et on cherche le tout. Quelle opération faut-il faire ?"
          : "Dans un problème, on connait le tout et une seule part. Quelle opération faut-il faire pour trouver l'autre part ?",
        format: "qcm",
        choices: shuffle(["une addition", "une soustraction"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le schéma en barre range toujours les mêmes trois nombres : deux parts et un tout.",
          "On regarde lequel des trois manque.",
          chercheTout
            ? "Le tout manque : on réunit les deux parts, donc on additionne."
            : "Une part manque : on enlève la part connue au tout, donc on soustrait.",
          `Il faut faire ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_DEUX_ETAPES — champ numérique ≤ 30
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_deux_etapes_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_deux_etapes",
    difficulty: 5,
    theme: "neutral",
    text: "Sur le présentoir de la bibliothèque, il y a 24 livres : 7 albums, 6 bandes dessinées, et le reste sont des documentaires. Combien y a-t-il de documentaires ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Réunis d'abord les albums et les bandes dessinées.",
    explanation: exp(
      "Un problème en deux étapes demande un calcul intermédiaire avant la réponse.",
      "On réunit d'abord ce qu'on connait, puis on l'enlève au total.",
      "Première étape : 7 + 6 = 13 livres qui ne sont pas des documentaires. Deuxième étape : 24 - 13 = 11.",
      "Il y a 11 documentaires.",
    ),
    tags: ["cp", "probleme", "deux_etapes", "piege"],
  },
  {
    kind: "template",
    id: "cp_probleme_deux_etapes_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_deux_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : celle du premier arrêt, puis celle du second.",
    tags: ["cp", "probleme", "deux_etapes", "template"],
    generate: () => {
      const depart = randomInt(18, 29);
      const descendent = randomInt(4, 12);
      const montent = randomInt(2, 9);
      const apresPremier = depart - descendent;
      const total = apresPremier + montent;
      return {
        text: `Il y avait ${depart} enfants dans le bus. Au premier arrêt, ${descendent} enfants sont descendus. Au deuxième arrêt, ${montent} enfants sont montés. Combien y a-t-il d'enfants dans le bus maintenant ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème en deux étapes se résout dans l'ordre où les évènements arrivent.",
          "On traite le premier arrêt, on note le résultat, puis on traite le second.",
          `Après le premier arrêt : ${depart} - ${descendent} = ${apresPremier}. Après le second : ${apresPremier} + ${montent} = ${total}.`,
          `Il y a maintenant ${total} enfants.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_deux_etapes_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_deux_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Réunis d'abord les deux catégories connues.",
    tags: ["cp", "probleme", "deux_etapes", "template"],
    generate: () => {
      const a = randomInt(4, 10);
      const b = randomInt(3, 9);
      const total = randomInt(a + b + 2, 30);
      const reste = total - a - b;
      const contexte = randomChoice([
        { lieu: "dans le panier", tout: "fruits", un: "mangues", deux: "bananes", trois: "letchis" },
        { lieu: "dans la trousse", tout: "crayons", un: "crayons rouges", deux: "crayons bleus", trois: "crayons verts" },
        { lieu: "sur l'étagère", tout: "livres", un: "albums", deux: "bandes dessinées", trois: "documentaires" },
      ]);
      return {
        text: `${contexte.lieu.charAt(0).toUpperCase()}${contexte.lieu.slice(1)}, il y a ${total} ${contexte.tout} : ${a} ${contexte.un}, ${b} ${contexte.deux}, et le reste sont des ${contexte.trois}. Combien y a-t-il de ${contexte.trois} ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand une part est décrite comme « le reste », on la trouve en enlevant au tout toutes les autres parts.",
          "On réunit d'abord les parts connues, puis on les enlève au tout.",
          `Première étape : ${a} + ${b} = ${a + b}. Deuxième étape : ${total} - ${a + b} = ${reste}.`,
          `Il y a ${reste} ${contexte.trois}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_MULTIPLICATIF — des groupes égaux, champ ≤ 30
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_multiplicatif_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_multiplicatif",
    difficulty: 4,
    theme: "neutral",
    text: "Paul apporte 3 paquets de biscuits. Il y a 7 biscuits dans chaque paquet. Combien y a-t-il de biscuits en tout ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Trois paquets identiques : additionne trois fois la même quantité.",
    explanation: exp(
      "Quand toutes les parts contiennent la même quantité, on additionne cette quantité autant de fois qu'il y a de parts.",
      "On écrit une addition répétée, ou on dessine les biscuits par paquets.",
      "7 + 7 + 7 = 21. On dit aussi « trois fois sept ».",
      "Il y a 21 biscuits.",
    ),
    tags: ["cp", "probleme", "multiplicatif"],
  },
  {
    kind: "template",
    id: "cp_probleme_multiplicatif_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_multiplicatif",
    difficulty: 4,
    theme: "reunion",
    hint: "Toutes les parts sont pareilles : on répète l'addition.",
    tags: ["cp", "probleme", "multiplicatif", "reunion", "template"],
    generate: () => {
      const groupes = randomInt(2, 5);
      const parGroupe = randomInt(2, 6);
      const total = groupes * parGroupe;
      const c = randomChoice([
        { contenant: "barquettes", unContenant: "barquette", contenu: "letchis" },
        { contenant: "sachets", unContenant: "sachet", contenu: "bonbons" },
        { contenant: "boites", unContenant: "boite", contenu: "billes" },
      ]);
      return {
        text: `Il y a ${groupes} ${c.contenant} de ${c.contenu}. Chaque ${c.unContenant} contient ${parGroupe} ${c.contenu}. Combien y a-t-il de ${c.contenu} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le tout quand toutes les parts sont égales, c'est une addition répétée.",
          "On additionne la quantité d'une part autant de fois qu'il y a de parts.",
          `${Array.from({ length: groupes }, () => parGroupe).join(" + ")} = ${total}.`,
          `Il y a ${total} ${c.contenu}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_multiplicatif_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_multiplicatif",
    difficulty: 5,
    theme: "neutral",
    hint: "Combien de paquets peut-on faire ? Compte de part en part.",
    tags: ["cp", "probleme", "multiplicatif", "template"],
    generate: () => {
      const parEquipe = randomChoice([2, 3, 4, 5]);
      const equipes = randomInt(2, 6);
      const total = parEquipe * equipes;
      return {
        text: `Il y a ${total} élèves dans la classe. Le professeur fait des équipes de ${parEquipe} élèves. Combien d'équipes peut-il former ?`,
        format: "short",
        expected: [String(equipes)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre de parts d'un partage équitable, c'est faire des groupements.",
          "On compte de part en part jusqu'à atteindre le total.",
          `On compte : ${Array.from({ length: equipes }, (_, i) => (i + 1) * parEquipe).join(", ")}. Il a fallu ${equipes} groupes de ${parEquipe}.`,
          `Il peut former ${equipes} équipes.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_PARTAGE — chercher la valeur d'une part
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_partage_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_partage",
    difficulty: 4,
    theme: "neutral",
    text: "3 enfants se partagent 18 images. Tous les enfants doivent avoir le même nombre d'images. Combien d'images aura chaque enfant ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Distribue les images une par une, comme des cartes.",
    explanation: exp(
      "Un partage équitable donne la même quantité à chacun.",
      "On distribue un à un, ou on cherche le nombre qui, répété autant de fois qu'il y a d'enfants, donne le total.",
      "6 + 6 + 6 = 18. Chaque enfant reçoit donc 6 images.",
      "Chaque enfant aura 6 images.",
    ),
    tags: ["cp", "probleme", "partage"],
  },
  {
    kind: "template",
    id: "cp_probleme_partage_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_partage",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le nombre qui, répété, donne le total.",
    tags: ["cp", "probleme", "partage", "template"],
    generate: () => {
      const enfants = randomChoice([2, 3, 4, 5]);
      const part = randomInt(2, 6);
      const total = enfants * part;
      const objet = randomChoice(["images", "bonbons", "billes", "gâteaux", "letchis"]);
      return {
        text: `${enfants} enfants se partagent ${total} ${objet}, en parts égales. Combien chaque enfant en reçoit-il ?`,
        format: "short",
        expected: [String(part)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un partage équitable, chacun reçoit la même chose.",
          "On distribue un à un jusqu'à épuisement, ou on cherche la part qui, répétée, donne le total.",
          `${Array.from({ length: enfants }, () => part).join(" + ")} = ${total}. Chacun reçoit donc ${part}.`,
          `Chaque enfant reçoit ${part} ${objet}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_partage_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_partage",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : on ne cherche pas la même chose que d'habitude.",
    tags: ["cp", "probleme", "partage", "piege", "template"],
    generate: () => {
      const parts = randomChoice([2, 3, 4, 5]);
      const valeurPart = randomInt(3, 6);
      const total = parts * valeurPart;
      const chercheNombreDeParts = randomChoice([true, false]);
      const bonne = chercheNombreDeParts ? parts : valeurPart;
      return {
        text: chercheNombreDeParts
          ? `On range ${total} œufs dans des boites de ${valeurPart} œufs. Combien de boites faut-il ?`
          : `On range ${total} œufs dans ${parts} boites, autant dans chacune. Combien d'œufs y a-t-il dans une boite ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Un même partage pose deux questions différentes : combien de parts, ou combien dans chaque part.",
          "On lit bien ce que l'énoncé donne et ce qu'il cherche.",
          chercheNombreDeParts
            ? `On sait combien il y a dans chaque boite (${valeurPart}), on cherche le NOMBRE DE BOITES. On compte : ${Array.from({ length: parts }, (_, i) => (i + 1) * valeurPart).join(", ")}. Il faut ${parts} boites.`
            : `On sait combien il y a de boites (${parts}), on cherche COMBIEN DANS CHACUNE. On distribue : chaque boite reçoit ${valeurPart} œufs, car ${Array.from({ length: parts }, () => valeurPart).join(" + ")} = ${total}.`,
          chercheNombreDeParts ? `Il faut ${parts} boites.` : `Il y a ${valeurPart} œufs par boite.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_REPONSE — répondre, et vérifier que c'est possible
     La phase « Régulation » du BO, avec ses questions types.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_reponse_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_reponse",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une boite de 20 jetons, il y a des rouges et des verts. Un élève trouve 24 jetons rouges. Est-ce possible ?",
    format: "qcm",
    choices: [
      "non, il ne peut pas y en avoir plus que le total",
      "oui, si les verts sont nombreux",
      "oui, cela arrive parfois",
      "on ne peut pas savoir",
    ],
    expected: ["non, il ne peut pas y en avoir plus que le total"],
    comparator: "mcq_exact",
    hint: "Une part ne peut jamais dépasser le tout.",
    explanation: exp(
      "Avant d'écrire sa réponse, on vérifie qu'elle est possible : c'est la régulation.",
      "On compare le résultat trouvé avec ce que dit l'énoncé.",
      "La boite contient 20 jetons en tout. Les rouges sont une PART de ces 20 : ils ne peuvent pas être 24. Il y a donc une erreur dans le calcul, et il faut le refaire.",
      "Non : une part ne peut pas dépasser le total.",
    ),
    tags: ["cp", "probleme", "regulation", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_probleme_reponse_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_reponse",
    difficulty: 3,
    theme: "neutral",
    text: "Après avoir calculé, que faut-il faire avant de passer au problème suivant ?",
    format: "qcm",
    choices: [
      "relire la question et vérifier que la réponse y répond",
      "recopier le calcul au propre",
      "effacer le brouillon",
      "commencer le problème suivant tout de suite",
    ],
    expected: ["relire la question et vérifier que la réponse y répond"],
    comparator: "mcq_exact",
    hint: "Le calcul donne un nombre. La question demande peut-être autre chose.",
    explanation: exp(
      "Résoudre un problème, ce n'est pas seulement calculer : c'est répondre à la question posée.",
      "On relit la question, puis on vérifie que le nombre trouvé y répond et qu'il est possible.",
      "On peut faire un calcul juste et répondre à côté : trouver le nombre de garçons alors qu'on demandait le nombre d'élèves. Relire la question évite cette erreur-là.",
      "Il faut relire la question et vérifier que la réponse y répond.",
    ),
    tags: ["cp", "probleme", "regulation", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_probleme_reponse_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_reponse",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare le résultat au total donné dans l'énoncé.",
    tags: ["cp", "probleme", "regulation", "piege", "template"],
    generate: () => {
      const total = randomInt(15, 40);
      const possible = randomChoice([true, false]);
      const trouve = possible ? randomInt(1, total - 1) : total + randomInt(1, 12);
      return {
        text: `Dans un sac de ${total} billes, il y a des bleues et des rouges. Un élève trouve ${trouve} billes bleues. Est-ce possible ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [possible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une part ne peut jamais être plus grande que le tout dont elle fait partie.",
          "On compare le résultat trouvé au total de l'énoncé.",
          possible
            ? `${trouve} est plus petit que ${total} : les billes bleues peuvent bien être ${trouve}, et il resterait alors ${total - trouve} rouges.`
            : `${trouve} est plus grand que ${total}, le nombre total de billes. Une part ne peut pas dépasser le tout : le calcul est à refaire.`,
          possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
        ),
      };
    },
  },

  /* =========================================================
     CP_PROBLEME_DEFI — l'état initial, et la question à choisir
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_probleme_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la boite, j'ai mangé 6 bonbons et il en reste encore 21. Combien y avait-il de bonbons dans la boite avant que j'en mange ?",
    format: "short",
    expected: ["27"],
    comparator: "number_equal",
    hint: "Remets dans la boite ce que tu as mangé.",
    explanation: exp(
      "Chercher l'état de départ, c'est remonter le temps : on remet ce qui a été enlevé.",
      "On réunit ce qui reste et ce qui est parti.",
      "21 + 6 = 27. Le mot « mangé » fait penser à une soustraction, mais c'est le DÉPART qu'on cherche : il était forcément plus grand que ce qui reste.",
      "Il y avait 27 bonbons.",
    ),
    tags: ["cp", "probleme", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_probleme_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le départ est-il plus grand ou plus petit que ce qui reste ?",
    tags: ["cp", "probleme", "defi", "piege", "template"],
    generate: () => {
      const reste = randomInt(12, 45);
      const parti = randomInt(4, 20);
      const depart = reste + parti;
      const h = randomChoice([
        { objet: "bonbons", verbe: "mangé" },
        { objet: "billes", verbe: "perdu" },
        { objet: "images", verbe: "donné" },
        { objet: "letchis", verbe: "mangé" },
      ]);
      return {
        text: `J'ai ${h.verbe} ${parti} ${h.objet}, et il m'en reste ${reste}. Combien en avais-je au départ ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver l'état de départ, on remet ce qui a été enlevé.",
          "On réunit ce qui reste et ce qui est parti.",
          `${reste} + ${parti} = ${depart}. Le départ est forcément plus grand que ce qui reste : c'est un bon moyen de vérifier.`,
          `J'en avais ${depart} au départ.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_probleme_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "probleme",
    microId: "cp_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis l'histoire jusqu'au bout : le mot de l'énoncé n'annonce pas toujours l'opération.",
    tags: ["cp", "probleme", "defi", "piege", "template"],
    generate: () => {
      const [a, b] = shuffle([...PRENOMS]).slice(0, 2);
      const connu = randomInt(12, 40);
      const ecart = randomInt(3, 9);
      // On connait celui qui en a le PLUS, et on cherche l'autre : le mot
      // « plus » est dans l'énoncé, et pourtant il faut soustraire.
      const bonne = `${connu} - ${ecart}`;
      return {
        text: `${a} a ${connu} billes. ${a} en a ${ecart} de PLUS que ${b}. Quel calcul donne le nombre de billes de ${b} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${connu} + ${ecart}`,
          `${ecart} - ${connu}`,
          `${connu} + ${connu}`,
          `${ecart} + ${ecart}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le mot d'un énoncé n'impose pas l'opération : c'est l'histoire qui décide.",
          "On regarde de qui on connait la quantité, et si l'autre en a plus ou moins.",
          `On connait ${a} : ${connu} billes. ${a} en a ${ecart} de plus que ${b}, donc ${b} en a ${ecart} de MOINS : ${connu} - ${ecart} = ${connu - ecart}. Le mot « plus » est bien là, et pourtant on soustrait.`,
          `Le calcul est ${bonne}.`,
        ),
      };
    },
  },
];
