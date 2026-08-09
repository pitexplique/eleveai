// lib/tutor-v4/questionBank/ce2/maths/reperage.bank.ts
//
// Le repérage sur quadrillage du CE2, écrit à la main. Quatre
// micro-compétences qui passaient par le constructeur commun — celui qui
// servait « Combien de côtés a un triangle ? » à `ce1_reperage_coordonnees`.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : lire et placer un point
// sur un quadrillage, décrire un déplacement, lire un plan simple.
// ⛔ Pas de repère orthonormé, pas d'abscisse ni d'ordonnée : ces mots sont de
// cycle 3. Au CE2 on dit « la colonne, puis la ligne », ou « à droite, puis en
// haut ».
//
// LE PIÈGE DE LA NOTION : l'ordre. On lit d'abord horizontalement, ENSUITE
// verticalement — et l'élève qui inverse tombe sur un autre point, souvent tout
// aussi plausible. C'est la seule chose à faire entrer : on part du coin, on
// avance d'abord vers la droite, puis on monte.
// Le second : le point de départ d'un déplacement. « Trois cases à droite » ne
// veut rien dire tout seul ; il faut savoir d'où l'on part.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { ReperageCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function reperage(data: Omit<ReperageCanvasData, "kind">): ReperageCanvasData {
  return {
    kind: "reperage",
    // 7 sur 7 : les défis vont jusqu'à (6 ; 5) une fois le déplacement ajouté,
    // et un point qui tombe hors du quadrillage ne se voit pas.
    grid: { rows: 7, cols: 7 },
    display: {
      showGrid: true,
      showAxes: true,
      showCoordinates: true,
      showPointLabels: true,
    },
    ...data,
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const reperageBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_REPERAGE_COORDONNEES — lire et placer un point
     L'ordre est TOUT : d'abord à droite, ensuite en haut.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Pour repérer un point sur un quadrillage, dans quel ordre lit-on les deux nombres ?",
    format: "qcm",
    choices: [
      "d'abord horizontalement, ensuite verticalement",
      "d'abord verticalement, ensuite horizontalement",
      "le plus grand des deux d'abord",
      "peu importe l'ordre",
    ],
    expected: ["d'abord horizontalement, ensuite verticalement"],
    comparator: "mcq_exact",
    hint: "On avance d'abord, on monte ensuite — comme quand on marche puis qu'on grimpe.",
    explanation: exp(
      "Un point du quadrillage se repère par deux nombres, toujours donnés dans le même ordre.",
      "On part du coin en bas à gauche, on avance vers la droite, puis on monte.",
      "Le premier nombre dit de combien on avance vers la droite, le second de combien on monte. Inverser les deux mène à un autre point du quadrillage.",
      "D'abord horizontalement, ensuite verticalement.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Le point A est repéré par (4 ; 2). Un élève le place en avançant de 2 vers la droite puis en montant de 4. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, il a inversé les deux nombres",
      "oui",
      "non, il fallait descendre",
      "oui, l'ordre ne compte pas",
    ],
    expected: ["non, il a inversé les deux nombres"],
    comparator: "mcq_exact",
    hint: "Le premier nombre dit toujours de combien on avance vers la droite.",
    explanation: exp(
      "Les deux nombres d'un point ne sont pas interchangeables : le premier va vers la droite, le second vers le haut.",
      "On relit le repérage dans l'ordre : 4 d'abord, 2 ensuite.",
      "Pour (4 ; 2), il faut avancer de 4 vers la droite puis monter de 2. L'élève a placé le point (2 ; 4), qui existe aussi sur le quadrillage — mais ce n'est pas le même.",
      "Non, il a inversé les deux nombres.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "piege", "qcm", "canvas"],
    canvas: reperage({
      points: [
        { x: 4, y: 2, label: "A", color: "#2563eb" },
        { x: 2, y: 4, label: "B", color: "#ef4444" },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_coordonnees_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point est repéré par (0 ; 0) ?",
    format: "qcm",
    choices: [
      "le coin de départ, en bas à gauche",
      "le coin en haut à droite",
      "le milieu du quadrillage",
      "il n'existe pas",
    ],
    expected: ["le coin de départ, en bas à gauche"],
    comparator: "mcq_exact",
    hint: "Zéro à droite et zéro vers le haut : on n'a pas bougé.",
    explanation: exp(
      "Le point (0 ; 0) est celui d'où l'on part avant tout déplacement.",
      "On lit les deux nombres : zéro vers la droite, zéro vers le haut.",
      "On n'avance pas, on ne monte pas : on reste au coin de départ, en bas à gauche du quadrillage.",
      "C'est le coin en bas à gauche.",
    ),
    tags: ["ce2", "reperage", "coordonnees", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_reperage_coordonnees_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte d'abord vers la droite, puis vers le haut.",
    tags: ["ce2", "reperage", "coordonnees", "template", "canvas"],
    generate: () => {
      // x ≠ y : sinon le point inversé serait le même, et le piège s'évapore.
      const x = randomInt(1, 5);
      const y = randomChoice([1, 2, 3, 4, 5].filter((v) => v !== x));
      return {
        text: "Quel est le repérage du point A ?",
        format: "qcm",
        choices: makeChoices(`(${x} ; ${y})`, [
          `(${y} ; ${x})`,
          `(${x} ; ${y + 1})`,
          `(${x + 1} ; ${y})`,
          `(${x} ; ${Math.max(0, y - 1)})`,
        ]),
        expected: [`(${x} ; ${y})`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un point se repère par deux nombres : le premier vers la droite, le second vers le haut.",
          "On part du coin en bas à gauche, on compte les cases vers la droite, puis celles vers le haut.",
          `On avance de ${x} vers la droite, puis on monte de ${y} : le point A est en (${x} ; ${y}). Attention à ne pas répondre (${y} ; ${x}), qui est un autre point.`,
          `C'est (${x} ; ${y}).`,
        ),
        canvas: reperage({ points: [{ x, y, label: "A", color: "#2563eb" }] }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_reperage_coordonnees_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Le premier nombre est celui de la droite.",
    tags: ["ce2", "reperage", "coordonnees", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(1, 6);
      const quoi = randomChoice(["droite", "haut"] as const);
      return {
        text: `Le point B est repéré par (${x} ; ${y}). De combien de cases faut-il avancer vers ${quoi === "droite" ? "la droite" : "le haut"} depuis le coin de départ ?`,
        format: "short",
        expected: [String(quoi === "droite" ? x : y)],
        comparator: "number_equal",
        explanation: exp(
          "Le premier nombre d'un repérage compte les cases vers la droite, le second celles vers le haut.",
          "On repère lequel des deux nombres correspond à la direction demandée.",
          quoi === "droite"
            ? `Dans (${x} ; ${y}), le premier nombre est ${x} : on avance de ${x} cases vers la droite.`
            : `Dans (${x} ; ${y}), le second nombre est ${y} : on monte de ${y} cases.`,
          `Il faut ${quoi === "droite" ? x : y} case${(quoi === "droite" ? x : y) > 1 ? "s" : ""}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_REPERAGE_DEPLACEMENT — décrire un déplacement
     Sans point de départ, un déplacement ne veut rien dire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "Pour décrire un déplacement sur un quadrillage, que faut-il donner en plus des directions ?",
    format: "qcm",
    choices: [
      "le point de départ",
      "la couleur du chemin",
      "le nombre de cases du quadrillage",
      "rien de plus",
    ],
    expected: ["le point de départ"],
    comparator: "mcq_exact",
    hint: "« Trois cases à droite », mais à partir d'où ?",
    explanation: exp(
      "Un déplacement se décrit par un point de départ, puis par des directions et des nombres de cases.",
      "On commence toujours par dire d'où l'on part.",
      "« Trois cases vers la droite » ne mène nulle part si l'on ne sait pas où l'on est. Le même déplacement, parti d'ailleurs, arrive ailleurs.",
      "Il faut donner le point de départ.",
    ),
    tags: ["ce2", "reperage", "deplacement", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "On part du point (1 ; 1). On avance de 3 cases vers la droite, puis de 2 cases vers le haut. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 2)", "(3 ; 3)", "(4 ; 2)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "On ajoute les déplacements aux nombres du point de départ.",
    explanation: exp(
      "Un déplacement s'ajoute au point de départ : les cases vers la droite au premier nombre, celles vers le haut au second.",
      "On traite les deux directions séparément.",
      "Vers la droite : 1 + 3 = 4. Vers le haut : 1 + 2 = 3. On arrive en (4 ; 3). Répondre (3 ; 2), c'est avoir oublié d'où l'on partait.",
      "On arrive en (4 ; 3).",
    ),
    tags: ["ce2", "reperage", "deplacement", "piege", "qcm", "canvas"],
    canvas: reperage({
      path: {
        start: { x: 1, y: 1, label: "Départ" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "haut", count: 2 },
        ],
        showArrows: true,
      },
      target: { x: 4, y: 3, label: "?", hidden: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_deplacement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "On part de (2 ; 5) et on descend de 3 cases. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(2 ; 2)", "(2 ; 8)", "(5 ; 2)", "(3 ; 5)"],
    expected: ["(2 ; 2)"],
    comparator: "mcq_exact",
    hint: "Descendre, c'est enlever au second nombre.",
    explanation: exp(
      "Monter ajoute au second nombre, descendre lui enlève ; de même, aller à droite ajoute au premier, aller à gauche lui enlève.",
      "On repère la direction, puis on ajoute ou on retire.",
      "On descend, donc on retire au second nombre : 5 - 3 = 2. Le premier nombre ne bouge pas, puisqu'on n'a pas avancé sur les côtés. On arrive en (2 ; 2).",
      "On arrive en (2 ; 2).",
    ),
    tags: ["ce2", "reperage", "deplacement", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_reperage_deplacement_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute les cases vers la droite au premier nombre, celles vers le haut au second.",
    tags: ["ce2", "reperage", "deplacement", "template", "canvas"],
    generate: () => {
      const x0 = randomInt(0, 2);
      const y0 = randomInt(0, 2);
      const dx = randomInt(1, 3);
      const dy = randomInt(1, 3);
      const x = x0 + dx;
      const y = y0 + dy;
      return {
        text: `On part du point (${x0} ; ${y0}). On avance de ${dx} case${dx > 1 ? "s" : ""} vers la droite, puis on monte de ${dy} case${dy > 1 ? "s" : ""}. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(`(${x} ; ${y})`, [
          `(${dx} ; ${dy})`,
          `(${y} ; ${x})`,
          `(${x} ; ${y + 1})`,
          `(${x + 1} ; ${y})`,
        ]),
        expected: [`(${x} ; ${y})`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un déplacement s'ajoute au point de départ, direction par direction.",
          "On ajoute les cases vers la droite au premier nombre, celles vers le haut au second.",
          `Vers la droite : ${x0} + ${dx} = ${x}. Vers le haut : ${y0} + ${dy} = ${y}. On arrive en (${x} ; ${y}). Répondre (${dx} ; ${dy}), c'est avoir oublié d'où l'on partait.`,
          `On arrive en (${x} ; ${y}).`,
        ),
        canvas: reperage({
          path: {
            start: { x: x0, y: y0, label: "Départ" },
            steps: [
              { direction: "droite", count: dx },
              { direction: "haut", count: dy },
            ],
            showArrows: true,
          },
          target: { x, y, label: "?", hidden: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_reperage_deplacement_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux nombres du départ et de l'arrivée.",
    tags: ["ce2", "reperage", "deplacement", "template"],
    generate: () => {
      const x0 = randomInt(0, 3);
      const y0 = randomInt(0, 3);
      const dx = randomInt(1, 3);
      const dy = randomInt(1, 3);
      const quoi = randomChoice(["droite", "haut"] as const);
      return {
        text: `On part de (${x0} ; ${y0}) et on arrive en (${x0 + dx} ; ${y0 + dy}). De combien de cases s'est-on déplacé vers ${quoi === "droite" ? "la droite" : "le haut"} ?`,
        format: "short",
        expected: [String(quoi === "droite" ? dx : dy)],
        comparator: "number_equal",
        explanation: exp(
          "Le déplacement est l'écart entre le départ et l'arrivée, direction par direction.",
          "On soustrait le nombre de départ de celui d'arrivée, dans la bonne direction.",
          quoi === "droite"
            ? `Premier nombre : de ${x0} à ${x0 + dx}, l'écart vaut ${x0 + dx} - ${x0} = ${dx}.`
            : `Second nombre : de ${y0} à ${y0 + dy}, l'écart vaut ${y0 + dy} - ${y0} = ${dy}.`,
          `On s'est déplacé de ${quoi === "droite" ? dx : dy} case${(quoi === "droite" ? dx : dy) > 1 ? "s" : ""}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_REPERAGE_PLAN — lire un plan simple
     Au CE2, le plan se lit en cases : une lettre, un nombre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un plan de la ville, comment repère-t-on une case ?",
    format: "qcm",
    choices: [
      "par une lettre de colonne et un numéro de ligne",
      "par sa couleur",
      "par sa taille",
      "par le nom de la rue",
    ],
    expected: ["par une lettre de colonne et un numéro de ligne"],
    comparator: "mcq_exact",
    hint: "Comme à la bataille navale.",
    explanation: exp(
      "Un plan quadrillé se lit en croisant une colonne et une ligne.",
      "On repère la lettre en haut, puis le numéro sur le côté, et on croise les deux.",
      "La case B3 est à l'intersection de la colonne B et de la ligne 3. C'est exactement le principe de la bataille navale.",
      "Par une lettre de colonne et un numéro de ligne.",
    ),
    tags: ["ce2", "reperage", "plan", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 4,
    theme: "reunion",
    text: "Sur le plan de Saint-Pierre, la mairie est en case C2 et le marché en case B2. Que peut-on dire de leur position ?",
    format: "qcm",
    choices: [
      "elles sont sur la même ligne, dans deux colonnes voisines",
      "elles sont sur la même colonne",
      "elles sont dans la même case",
      "on ne peut rien dire",
    ],
    expected: ["elles sont sur la même ligne, dans deux colonnes voisines"],
    comparator: "mcq_exact",
    hint: "Compare d'abord les lettres, puis les nombres.",
    explanation: exp(
      "Sur un plan, la lettre donne la colonne et le nombre donne la ligne.",
      "On compare les deux repères élément par élément : la lettre, puis le nombre.",
      "C2 et B2 portent le même nombre, 2 : ils sont donc sur la même ligne. Leurs lettres, B et C, se suivent : les colonnes sont voisines.",
      "Elles sont sur la même ligne, dans deux colonnes voisines.",
    ),
    tags: ["ce2", "reperage", "plan", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_reperage_plan_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, une case est repérée par « A1 ». Où se trouve-t-elle ?",
    format: "qcm",
    choices: [
      "dans la première colonne et la première ligne",
      "dans la première colonne et la dernière ligne",
      "au milieu du plan",
      "dans la dernière case",
    ],
    expected: ["dans la première colonne et la première ligne"],
    comparator: "mcq_exact",
    hint: "A est la première lettre, 1 le premier nombre.",
    explanation: exp(
      "Sur un plan, la lettre donne la colonne et le nombre donne la ligne.",
      "On traduit chaque symbole séparément.",
      "A est la première colonne, 1 est la première ligne : la case A1 est donc tout au début du plan, dans le coin.",
      "Dans la première colonne et la première ligne.",
    ),
    tags: ["ce2", "reperage", "plan", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_reperage_plan_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 3,
    theme: "reunion",
    hint: "La lettre donne la colonne, le nombre donne la ligne.",
    tags: ["ce2", "reperage", "plan", "reunion", "template"],
    generate: () => {
      const lettres = ["A", "B", "C", "D", "E"] as const;
      const i = randomInt(0, 4);
      const ligne = randomInt(1, 5);
      // ⚠️ Le genre voyage avec le nom : « l'école » commence par une
      // apostrophe et reste féminin. Le déduire du début du mot se casse.
      const lieu = randomChoice([
        { nom: "l'école", pronom: "elle" },
        { nom: "le marché forain", pronom: "il" },
        { nom: "la mairie", pronom: "elle" },
        { nom: "le stade", pronom: "il" },
        { nom: "la bibliothèque", pronom: "elle" },
      ] as const);
      const quoi = randomChoice(["colonne", "ligne"] as const);
      return {
        text: `Sur le plan, ${lieu.nom} est en case ${lettres[i]}${ligne}. Dans quelle ${quoi} se trouve-t-${lieu.pronom} ?`,
        format: "qcm",
        choices: makeChoices(
          quoi === "colonne" ? `la colonne ${lettres[i]}` : `la ligne ${ligne}`,
          [
            quoi === "colonne" ? `la colonne ${lettres[(i + 1) % 5]}` : `la ligne ${(ligne % 5) + 1}`,
            quoi === "colonne" ? `la colonne ${ligne}` : `la ligne ${lettres[i]}`,
            quoi === "colonne" ? `la colonne A` : `la ligne 1`,
            quoi === "colonne" ? `la colonne ${lettres[(i + 2) % 5]}` : `la ligne ${((ligne + 1) % 5) + 1}`,
          ],
        ),
        expected: [quoi === "colonne" ? `la colonne ${lettres[i]}` : `la ligne ${ligne}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur un plan quadrillé, la lettre désigne la colonne et le nombre désigne la ligne.",
          "On sépare les deux symboles du repère et on lit celui qui est demandé.",
          `Dans ${lettres[i]}${ligne}, la lettre ${lettres[i]} donne la colonne et le nombre ${ligne} donne la ligne.`,
          `C'est ${quoi === "colonne" ? `la colonne ${lettres[i]}` : `la ligne ${ligne}`}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_reperage_plan_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les lettres entre elles, puis les nombres entre eux.",
    tags: ["ce2", "reperage", "plan", "template"],
    generate: () => {
      const lettres = ["A", "B", "C", "D", "E"] as const;
      const i = randomInt(0, 3);
      const ligne = randomInt(1, 4);
      const cas = randomChoice(["ligne", "colonne"] as const);
      const autre =
        cas === "ligne"
          ? `${lettres[i + 1]}${ligne}`
          : `${lettres[i]}${ligne + 1}`;
      const bonne =
        cas === "ligne"
          ? "elles sont sur la même ligne"
          : "elles sont dans la même colonne";
      return {
        text: `Sur un plan, un lieu est en case ${lettres[i]}${ligne} et un autre en case ${autre}. Que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "elles sont sur la même ligne",
          "elles sont dans la même colonne",
          "elles sont dans la même case",
          "elles sont aux deux coins opposés du plan",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux cases sont sur la même ligne si elles portent le même nombre, et dans la même colonne si elles portent la même lettre.",
          "On compare d'abord les lettres, puis les nombres.",
          cas === "ligne"
            ? `${lettres[i]}${ligne} et ${autre} portent le même nombre, ${ligne} : elles sont sur la même ligne. Leurs lettres, elles, diffèrent.`
            : `${lettres[i]}${ligne} et ${autre} portent la même lettre, ${lettres[i]} : elles sont dans la même colonne. Leurs nombres, eux, diffèrent.`,
          `${bonne.charAt(0).toUpperCase() + bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_REPERAGE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_reperage_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un trésor est caché en (5 ; 2). On part de (1 ; 1). Quel déplacement mène au trésor ?",
    format: "qcm",
    choices: [
      "4 cases vers la droite, puis 1 case vers le haut",
      "1 case vers la droite, puis 4 cases vers le haut",
      "5 cases vers la droite, puis 2 cases vers le haut",
      "2 cases vers la droite, puis 5 cases vers le haut",
    ],
    expected: ["4 cases vers la droite, puis 1 case vers le haut"],
    comparator: "mcq_exact",
    hint: "Le déplacement est l'ÉCART entre le départ et l'arrivée, pas le repère de l'arrivée.",
    explanation: exp(
      "Le déplacement est l'écart entre le point de départ et le point d'arrivée, direction par direction.",
      "On soustrait chaque nombre du départ au nombre correspondant de l'arrivée.",
      "Vers la droite : 5 - 1 = 4. Vers le haut : 2 - 1 = 1. Répondre « 5 puis 2 », c'est avoir recopié le repère du trésor sans tenir compte du point de départ.",
      "4 cases vers la droite, puis 1 case vers le haut.",
    ),
    tags: ["ce2", "reperage", "defi", "piege", "qcm", "canvas"],
    canvas: reperage({
      points: [{ x: 1, y: 1, label: "Départ", color: "#2563eb" }],
      target: { x: 5, y: 2, label: "Trésor", color: "#f59e0b" },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_reperage_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On part de (2 ; 3), on avance de 2 vers la droite, on monte de 1, puis on redescend de 1. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(4 ; 4)", "(4 ; 2)", "(2 ; 3)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "Monter de 1 puis redescendre de 1, cela s'annule.",
    explanation: exp(
      "Deux déplacements opposés de même longueur se compensent : on revient au même niveau.",
      "On traite les directions séparément, en additionnant et en soustrayant.",
      "Vers la droite : 2 + 2 = 4. Vers le haut : 3 + 1 - 1 = 3. On arrive en (4 ; 3) : le détour vertical n'a rien changé.",
      "On arrive en (4 ; 3).",
    ),
    tags: ["ce2", "reperage", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_reperage_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Le déplacement, c'est l'écart entre le départ et l'arrivée.",
    tags: ["ce2", "reperage", "defi", "reunion", "template", "canvas"],
    generate: () => {
      const x0 = randomInt(0, 2);
      const y0 = randomInt(0, 2);
      const dx = randomInt(2, 4);
      const dy = randomInt(1, 3);
      const x = x0 + dx;
      const y = y0 + dy;
      const tresor = randomChoice([
        "une graine de vacoa",
        "un galet du Bras de la Plaine",
        "un coquillage de l'Étang-Salé",
      ]);
      return {
        text: `${tresor.charAt(0).toUpperCase() + tresor.slice(1)} est cachée en (${x} ; ${y}). On part de (${x0} ; ${y0}). Quel déplacement y mène ?`,
        format: "qcm",
        // ⚠️ Quand on part de (0 ; 0) ET que dx vaut dy, deux des pièges
        // s'écrivent comme la bonne réponse. On en garde assez pour qu'il en
        // reste toujours trois après le tri.
        choices: makeChoices(
          `${dx} cases vers la droite, puis ${dy} case${dy > 1 ? "s" : ""} vers le haut`,
          [
            `${x} cases vers la droite, puis ${y} case${y > 1 ? "s" : ""} vers le haut`,
            `${dy} case${dy > 1 ? "s" : ""} vers la droite, puis ${dx} cases vers le haut`,
            `${dx} cases vers le haut, puis ${dy} case${dy > 1 ? "s" : ""} vers la droite`,
            `${dx + 1} cases vers la droite, puis ${dy} case${dy > 1 ? "s" : ""} vers le haut`,
            `${dx} cases vers la droite, puis ${dy + 1} cases vers le haut`,
          ],
        ),
        expected: [`${dx} cases vers la droite, puis ${dy} case${dy > 1 ? "s" : ""} vers le haut`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le déplacement est l'écart entre le point de départ et le point d'arrivée, direction par direction.",
          "On soustrait chaque nombre du départ au nombre correspondant de l'arrivée.",
          `Vers la droite : ${x} - ${x0} = ${dx}. Vers le haut : ${y} - ${y0} = ${dy}. Recopier (${x} ; ${y}) serait oublier d'où l'on part.`,
          `${dx} cases vers la droite, puis ${dy} case${dy > 1 ? "s" : ""} vers le haut.`,
        ),
        canvas: reperage({
          points: [{ x: x0, y: y0, label: "Départ", color: "#2563eb" }],
          target: { x, y, label: "?", color: "#f59e0b" },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_reperage_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce2_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux déplacements opposés s'annulent.",
    tags: ["ce2", "reperage", "defi", "template"],
    generate: () => {
      const x0 = randomInt(1, 3);
      const y0 = randomInt(1, 3);
      const dx = randomInt(1, 3);
      const aller = randomInt(1, 2);
      const x = x0 + dx;
      return {
        text: `On part de (${x0} ; ${y0}), on avance de ${dx} case${dx > 1 ? "s" : ""} vers la droite, on monte de ${aller}, puis on redescend de ${aller}. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(`(${x} ; ${y0})`, [
          `(${x} ; ${y0 + aller})`,
          `(${x} ; ${y0 + 2 * aller})`,
          `(${x0} ; ${y0})`,
          `(${y0} ; ${x})`,
        ]),
        expected: [`(${x} ; ${y0})`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux déplacements opposés de même longueur se compensent.",
          "On traite les directions séparément : la droite d'un côté, le haut et le bas de l'autre.",
          `Vers la droite : ${x0} + ${dx} = ${x}. Verticalement : ${y0} + ${aller} - ${aller} = ${y0}. Le détour n'a rien changé.`,
          `On arrive en (${x} ; ${y0}).`,
        ),
      };
    },
  },
];
