// lib/tutor-v4/questionBank/ce1/maths/masse.bank.ts
//
// Les masses du CE1, écrites à la main. Même ossature que longueur.bank.ts —
// c'est voulu : les deux notions partagent le même piège, et un élève qui a
// compris l'un doit reconnaître l'autre.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) :
//   — deux unités : le gramme et le kilogramme, avec leurs symboles g et kg.
//     PAS de tonne, pas de milligramme ;
//   — une seule relation à connaître : 1 kg = 1 000 g ;
//   — soupeser et comparer deux ou trois objets, avec ou sans balance ;
//   — quelques masses de référence, pour estimer.
//   — pas d'écriture à virgule : on écrit « 1 kg 500 g », jamais « 1,5 kg ».
//
// LE PIÈGE DE LA NOTION : comparer les NOMBRES au lieu des masses. « 900 g est
// plus lourd que 1 kg, parce que 900 est plus grand que 1. » Et son cousin, le
// plus vieux de tous : croire qu'un kilo de plumes pèse moins qu'un kilo de
// cailloux.
//
// ⛔ PAS DE CANVAS BALANCE. La variante `balance` fait pencher le fléau toute
// seule d'après le champ `grammes` : sur une question dont le piège est
// justement de convertir, le dessin donne la réponse avant que l'élève ait
// réfléchi. Seule la variante `estimation` est sûre — elle force l'étiquette
// de masse à ne pas s'afficher.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { MasseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return { kind: "masse", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const masseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MASSE_COMPARER — comparer des masses
     LE piège : comparer les nombres au lieu des masses. Et
     celui des plumes, qui n'est pas un piège de calcul mais de
     bon sens.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg ou 900 g ?",
    format: "qcm",
    choices: ["1 kg", "900 g", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "Écris les deux masses dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
      "On transforme le kilogramme en grammes, puis on compare les nombres.",
      "1 kg = 1 000 g. Et 1 000 g, c'est plus lourd que 900 g. Il manque même 100 g pour atteindre le kilo.",
      "1 kg est plus lourd que 900 g.",
    ),
    // ⛔ Pas de canvas balance : le fléau pencherait tout seul et l'élève
    // lirait la réponse sans jamais convertir.
    tags: ["ce1", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg de plumes ou 1 kg de cailloux ?",
    format: "qcm",
    choices: [
      "les deux pèsent pareil",
      "les cailloux",
      "les plumes",
      "on ne peut pas peser des plumes",
    ],
    expected: ["les deux pèsent pareil"],
    comparator: "mcq_exact",
    hint: "Relis bien : quelle masse est écrite devant chaque mot ?",
    explanation: exp(
      "La masse, c'est ce que la balance affiche. Elle ne dépend pas de la place que prend l'objet.",
      "On lit le nombre et l'unité, sans se laisser distraire par le nom de l'objet.",
      "Les deux font 1 kg, donc 1 000 g chacun. Il faut juste un très gros sac pour les plumes et un tout petit pour les cailloux : c'est la PLACE qui change, pas la masse.",
      "Les deux pèsent exactement pareil.",
    ),
    tags: ["ce1", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, le plateau de gauche descend. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "ce qui est à gauche est plus lourd",
      "ce qui est à droite est plus lourd",
      "les deux pèsent pareil",
      "la balance est cassée",
    ],
    expected: ["ce qui est à gauche est plus lourd"],
    comparator: "mcq_exact",
    hint: "Pense à une balançoire : qui descend, le plus lourd ou le plus léger ?",
    explanation: exp(
      "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
      "On regarde quel côté est le plus bas.",
      "C'est comme une balançoire dans la cour : celui qui pèse le plus descend et l'autre monte. Ici, c'est le plateau de gauche qui descend.",
      "Ce qui est à gauche est plus lourd.",
    ),
    tags: ["ce1", "masse", "comparer", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_masse_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même unité d'abord, comparaison ensuite.",
    // ⛔ Sans canvas, pour la même raison : la balance vend la mèche.
    tags: ["ce1", "masse", "comparer", "piege", "template"],
    generate: () => {
      // Le nombre en grammes est TOUJOURS plus grand que celui en kilogrammes :
      // c'est ce décalage qui fait tomber les élèves.
      const kg = randomInt(1, 4);
      const enG = kg * 1000;
      const g = randomChoice([enG - randomInt(50, 400), enG + randomInt(50, 400)]);
      const gagnant = g > enG ? `${g} g` : `${kg} kg`;
      const perdant = g > enG ? `${kg} kg` : `${g} g`;
      return {
        text: `Qu'est-ce qui est le plus lourd : ${kg} kg ou ${g} g ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          perdant,
          "c'est pareil",
          "on ne peut pas savoir",
          "les deux sont trop légers",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
          "On transforme les kilogrammes en grammes, car 1 kg = 1 000 g.",
          `${kg} kg = ${enG} g. On compare alors ${enG} g et ${g} g : ${g > enG ? `${g} est plus grand que ${enG}` : `${enG} est plus grand que ${g}`}.`,
          `Le plus lourd est ${gagnant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_comparer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Soupèse-les dans ta tête : lequel te fatiguerait le bras ?",
    tags: ["ce1", "masse", "comparer", "template"],
    generate: () => {
      const objets = [
        { nom: "une plume", rang: 1 },
        { nom: "une gomme", rang: 2 },
        { nom: "un stylo", rang: 3 },
        { nom: "une pomme", rang: 4 },
        { nom: "un livre", rang: 5 },
        { nom: "une bouteille d'eau pleine", rang: 6 },
        { nom: "un cartable plein", rang: 7 },
        { nom: "un sac de riz de 5 kg", rang: 8 },
      ] as const;
      const [a, b] = shuffle(objets).slice(0, 2);
      const lourd = a.rang > b.rang ? a : b;
      const leger = a.rang > b.rang ? b : a;
      const cherchePlusLourd = randomChoice([true, false]);
      const bonne = cherchePlusLourd ? lourd.nom : leger.nom;
      return {
        text: cherchePlusLourd
          ? `Lequel est le plus LOURD : ${a.nom} ou ${b.nom} ?`
          : `Lequel est le plus LÉGER : ${a.nom} ou ${b.nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          cherchePlusLourd ? leger.nom : lourd.nom,
          "les deux pèsent pareil",
          "on ne peut pas savoir",
          "aucun des deux ne pèse rien",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux masses sans balance, c'est soupeser : on imagine chaque objet dans une main.",
          "On se demande lequel fatiguerait le bras le plus vite.",
          `${leger.nom} est plus léger que ${lourd.nom} : on le soulève sans effort, l'autre demande de la force.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_KG_G — le gramme, le kilogramme, et 1 kg = 1000 g
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_kg_g_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on l'abréviation de « kilogramme » ?",
    format: "qcm",
    choices: ["kg", "kgr", "kilo", "k"],
    expected: ["kg"],
    comparator: "mcq_exact",
    hint: "Le k vient de « kilo », le g vient de « gramme ».",
    explanation: exp(
      "Chaque unité de masse a une abréviation, écrite sans point et sans s.",
      "On garde la première lettre de « kilo », puis celle de « gramme ».",
      "« kilo » donne le k, « gramme » donne le g : cela fait kg. On écrit 5 kg, jamais 5 kgs.",
      "L'abréviation est kg.",
    ),
    tags: ["ce1", "masse", "kg_g", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_kg_g_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 kg = 100 g ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 kg = 1 000 g",
      "oui",
      "non, 1 kg = 10 g",
      "non, 1 kg = 500 g",
    ],
    expected: ["non, 1 kg = 1 000 g"],
    comparator: "mcq_exact",
    hint: "100 g, c'est une tablette de chocolat. Un kilo, c'est bien plus.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On vérifie avec un objet connu : une tablette de chocolat pèse 100 g.",
      "Il faudrait dix tablettes de chocolat pour faire 1 kg. L'élève a confondu avec « cent » : ici, c'est « kilo », donc mille.",
      "Non : 1 kg = 1 000 g.",
    ),
    tags: ["ce1", "masse", "kg_g", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_masse_kg_g_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 3,
    theme: "neutral",
    hint: "Un kilogramme vaut déjà 1 000 grammes : il en faut plus, donc on multiplie.",
    tags: ["ce1", "masse", "kg_g", "template"],
    generate: () => {
      const kg = randomInt(2, 9);
      const g = kg * 1000;
      return {
        text: `Combien de grammes font ${kg} kg ?`,
        format: "short",
        expected: [String(g)],
        comparator: "number_equal",
        explanation: exp(
          "1 kilogramme vaut 1 000 grammes.",
          "Pour passer des kilogrammes aux grammes, on multiplie par 1 000 : il faut plus de petites unités pour la même masse.",
          `${kg} × 1 000 = ${g}. Donc ${kg} kg = ${g} g.`,
          `${kg} kg font ${g} g.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_kg_g_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine l'objet dans ta main : lourd à porter, ou léger comme une plume ?",
    tags: ["ce1", "masse", "kg_g", "template"],
    generate: () => {
      const objets = [
        { nom: "un trombone", unite: "le gramme" },
        { nom: "une gomme", unite: "le gramme" },
        { nom: "un œuf", unite: "le gramme" },
        { nom: "une feuille de papier", unite: "le gramme" },
        { nom: "un cartable plein", unite: "le kilogramme" },
        { nom: "un sac de riz", unite: "le kilogramme" },
        { nom: "un élève de CE1", unite: "le kilogramme" },
        { nom: "une valise remplie", unite: "le kilogramme" },
      ] as const;
      const o = randomChoice(objets);
      return {
        text: `Avec quelle unité pèse-t-on ${o.nom} ?`,
        format: "qcm",
        choices: makeChoices(o.unite, [
          "le gramme",
          "le kilogramme",
          "le mètre",
          "le litre",
        ]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre facile à dire.",
          "On imagine l'objet dans la main : ce qui se soulève d'un doigt se pèse en grammes, ce qui demande le bras se pèse en kilogrammes.",
          `Pour ${o.nom}, c'est ${o.unite} qui donne un nombre simple. L'autre unité donnerait un nombre trop grand ou trop petit.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_SOUPESER — trouver le plus lourd sans calculer
     Le premier attendu du programme, et il ne demande aucun
     nombre : on soupèse, ou on regarde la balance.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 1,
    theme: "neutral",
    text: "Tu tiens une gomme dans une main et un dictionnaire dans l'autre. Comment sais-tu lequel est le plus lourd ?",
    format: "qcm",
    choices: [
      "je soupèse les deux et je sens lequel tire le plus sur ma main",
      "je regarde lequel est le plus grand",
      "je regarde lequel a la plus belle couleur",
      "je compte les pages",
    ],
    expected: ["je soupèse les deux et je sens lequel tire le plus sur ma main"],
    comparator: "mcq_exact",
    hint: "Soupeser, c'est peser avec sa main.",
    explanation: exp(
      "Soupeser, c'est comparer deux masses avec ses mains, sans balance.",
      "On prend un objet dans chaque main et on sent lequel tire le plus vers le bas.",
      "Le dictionnaire tire beaucoup plus que la gomme : il est plus lourd. La taille ne suffit pas — un gros ballon est très léger.",
      "On soupèse les deux objets.",
    ),
    tags: ["ce1", "masse", "soupeser", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 3,
    theme: "neutral",
    text: "Un gros ballon de plage et une petite bille en fer. Lequel est le plus lourd ?",
    format: "qcm",
    choices: [
      "la bille en fer",
      "le ballon de plage",
      "les deux pèsent pareil",
      "le plus gros est toujours le plus lourd",
    ],
    expected: ["la bille en fer"],
    comparator: "mcq_exact",
    hint: "Le ballon est rempli d'air. L'air ne pèse presque rien.",
    explanation: exp(
      "La masse ne dépend pas de la taille : un objet peut être gros et très léger.",
      "On soupèse au lieu de regarder.",
      "Le ballon est rempli d'air, qui ne pèse presque rien. La bille est pleine de fer, une matière très lourde. La petite bille gagne.",
      "La bille en fer est plus lourde.",
    ),
    tags: ["ce1", "masse", "soupeser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, les deux plateaux restent au même niveau. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "les deux objets ont la même masse",
      "celui de gauche est plus lourd",
      "celui de droite est plus lourd",
      "la balance ne marche pas",
    ],
    expected: ["les deux objets ont la même masse"],
    comparator: "mcq_exact",
    hint: "Sur une balançoire, quand personne ne descend, c'est que les deux pèsent pareil.",
    explanation: exp(
      "Une balance à deux plateaux compare deux masses : le plus lourd descend.",
      "On regarde si un plateau est plus bas que l'autre.",
      "Ici, aucun ne descend : aucun des deux n'est plus lourd. On dit que la balance est en équilibre.",
      "Les deux objets ont la même masse.",
    ),
    tags: ["ce1", "masse", "soupeser", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_masse_soupeser_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plateau le plus bas porte le plus lourd.",
    tags: ["ce1", "masse", "soupeser", "template"],
    generate: () => {
      const objets = [
        { nom: "le livre", pronom: "il" },
        { nom: "la trousse", pronom: "elle" },
        { nom: "la pomme", pronom: "elle" },
        { nom: "le ballon", pronom: "il" },
        { nom: "la bouteille", pronom: "elle" },
        { nom: "le cahier", pronom: "il" },
      ] as const;
      const [a, b] = shuffle(objets).slice(0, 2);
      const gaucheDescend = randomChoice([true, false]);
      const lourd = gaucheDescend ? a : b;
      const leger = gaucheDescend ? b : a;
      return {
        text: `Sur une balance à deux plateaux, on pose ${a.nom} à gauche et ${b.nom} à droite. Le plateau de ${gaucheDescend ? "gauche" : "droite"} descend. Lequel est le plus lourd ?`,
        format: "qcm",
        choices: makeChoices(lourd.nom, [
          leger.nom,
          "les deux pèsent pareil",
          "on ne peut pas savoir",
          "celui qui monte est le plus lourd",
        ]),
        expected: [lourd.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
          "On regarde quel côté est le plus bas, et on lit ce qu'il porte.",
          `C'est le plateau de ${gaucheDescend ? "gauche" : "droite"} qui descend : ${lourd.nom} est donc plus lourd que ${leger.nom}, qui remonte.`,
          `Le plus lourd est ${lourd.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_RELATION_KG_G — 1 kg = 1 000 g
     Le programme en fait un attendu à lui tout seul. Tout le
     reste de la notion s'appuie dessus.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_relation_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de grammes dans 1 kilogramme ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilogramme, c'est mille grammes. C'est le même « kilo » que dans kilomètre, qui vaut mille mètres.",
      "1 kg = 1 000 g.",
    ),
    tags: ["ce1", "masse", "relation", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_relation_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de paquets de 500 g faut-il pour faire 1 kg ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "500 g, c'est la moitié du kilo.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On cherche combien de fois 500 tient dans 1 000.",
      "500 + 500 = 1 000. Deux paquets de 500 g font donc 1 kg : chaque paquet est une moitié de kilo.",
      "Il faut 2 paquets.",
    ),
    tags: ["ce1", "masse", "relation", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_masse_relation_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 3,
    theme: "neutral",
    hint: "Plusieurs grammes font un seul kilogramme : on partage.",
    tags: ["ce1", "masse", "relation", "template"],
    generate: () => {
      const kg = randomInt(2, 9);
      const g = kg * 1000;
      return {
        text: `Combien de kilogrammes font ${g} g ?`,
        format: "short",
        expected: [String(kg)],
        comparator: "number_equal",
        explanation: exp(
          "1 kilogramme vaut 1 000 grammes.",
          "Pour passer des grammes aux kilogrammes, on cherche combien de fois 1 000 tient dans le nombre.",
          `1 000 tient ${kg} fois dans ${g}. Donc ${g} g = ${kg} kg.`,
          `${g} g font ${kg} kg.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_relation_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 4,
    theme: "neutral",
    hint: "Transforme d'abord les kilogrammes, puis ajoute les grammes qui restent.",
    tags: ["ce1", "masse", "relation", "template"],
    generate: () => {
      const kg = randomInt(1, 5);
      const g = randomInt(50, 900);
      const total = kg * 1000 + g;
      const objet = randomChoice(["un panier", "un carton", "un seau", "un sac"]);
      return {
        text: `${objet.charAt(0).toUpperCase()}${objet.slice(1)} pèse ${kg} kg ${g} g. Combien pèse-t-il en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une masse écrite avec deux unités se transforme en une seule en additionnant.",
          "On transforme d'abord les kilogrammes en grammes, puis on ajoute les grammes déjà écrits.",
          `${kg} kg = ${kg * 1000} g. On ajoute les ${g} g : ${kg * 1000} + ${g} = ${total}.`,
          `Cela fait ${total} g.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_ESTIMER — les masses de référence
     Estimer n'est pas deviner : c'est comparer à une masse
     qu'on a déjà soulevée.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_estimer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Environ combien pèse une brique de lait pleine ?",
    format: "qcm",
    choices: ["1 kg", "1 g", "10 kg", "100 kg"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "On la soulève d'une seule main, sans effort.",
    explanation: exp(
      "Une masse de référence, c'est une masse qu'on connaît par cœur et qui aide à juger les autres.",
      "On prend un objet qu'on soulève tous les jours.",
      "Une brique de lait pleine pèse 1 kg, c'est-à-dire 1 000 g. C'est la référence la plus commode : elle tient dans une main.",
      "Elle pèse environ 1 kg.",
    ),
    tags: ["ce1", "masse", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_estimer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « ma trousse pèse 3 kg ». Est-ce possible ?",
    format: "qcm",
    choices: [
      "non, c'est bien trop lourd pour une trousse",
      "oui, c'est normal",
      "non, c'est bien trop léger",
      "on ne peut pas peser une trousse",
    ],
    expected: ["non, c'est bien trop lourd pour une trousse"],
    comparator: "mcq_exact",
    hint: "3 kg, c'est trois briques de lait. Tu les mettrais dans ta trousse ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation impossible.",
      "On compare la trousse à une masse connue : la brique de lait, qui fait 1 kg.",
      "3 kg, ce serait trois briques de lait dans la trousse. Une trousse pleine pèse plutôt 300 g, dix fois moins.",
      "Non, c'est bien trop lourd.",
    ),
    tags: ["ce1", "masse", "estimer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_masse_estimer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare à un objet que tu as déjà soulevé.",
    tags: ["ce1", "masse", "estimer", "template", "canvas"],
    generate: () => {
      const refs = [
        { objet: "une gomme", icon: "🧽", bonne: "15 g", pourquoi: "on la sent à peine dans la trousse" },
        { objet: "un œuf", icon: "🥚", bonne: "60 g", pourquoi: "il tient dans le creux de la main" },
        { objet: "une brique de lait", icon: "🥛", bonne: "1 kg", pourquoi: "on la soulève d'une seule main, sans effort" },
        { objet: "un cartable plein", icon: "🎒", bonne: "4 kg", pourquoi: "on le porte sur le dos toute la journée" },
        { objet: "un sac de riz de la cuisine", icon: "🍚", bonne: "5 kg", pourquoi: "on le porte à deux mains" },
        { objet: "une tablette de chocolat", icon: "🍫", bonne: "100 g", pourquoi: "elle tient dans une poche" },
      ] as const;
      const r = randomChoice(refs);
      const autres = refs.filter((x) => x.bonne !== r.bonne).map((x) => x.bonne);
      const choices = makeChoices(r.bonne, autres);
      return {
        text: `Environ combien pèse ${r.objet} ?`,
        format: "qcm",
        choices,
        expected: [r.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c'est comparer à une masse qu'on connaît par cœur.",
          "On cherche un repère du quotidien avant de choisir un nombre.",
          `Pour ${r.objet}, le repère est simple : ${r.pourquoi}. Cela donne ${r.bonne}.`,
          `${r.objet} pèse environ ${r.bonne}.`,
        ),
        // Variante « estimation » : le canvas force l'étiquette de masse à ne
        // pas s'afficher. L'objet est montré, sa masse reste cachée.
        canvas: masseCanvas({
          variant: "estimation",
          objet: { label: r.objet, icon: r.icon },
          choix: choices,
          display: { showLabels: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_estimer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois la référence tient-elle dans le kilo ?",
    tags: ["ce1", "masse", "estimer", "template"],
    generate: () => {
      const ref = randomChoice([
        { objet: "une tablette de chocolat", masse: 100 },
        { objet: "un paquet de sucre", masse: 500 },
        { objet: "un pot de confiture", masse: 250 },
        { objet: "une plaquette de beurre", masse: 200 },
      ]);
      const nb = 1000 / ref.masse;
      return {
        text: `${ref.objet.charAt(0).toUpperCase()}${ref.objet.slice(1)} pèse ${ref.masse} g. Combien en faut-il pour faire 1 kg ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Estimer une masse, c'est reporter une masse connue autant de fois qu'il faut.",
          "On écrit le kilo en grammes, puis on cherche combien de fois la référence y tient.",
          `1 kg = 1 000 g. Et ${ref.masse} tient ${nb} fois dans 1 000.`,
          `Il en faut ${nb}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_PROBLEME — un problème simple de masses
     Une étape, deux au plus. On additionne ou on enlève, après
     avoir mis tout le monde dans la même unité.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Paul, maman achète 3 kg de letchis et 2 kg de mangues. Combien de kilogrammes porte-t-elle ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Les deux masses sont en kilogrammes : on peut additionner directement.",
    explanation: exp(
      "Pour trouver une masse totale, on additionne les masses.",
      "On vérifie d'abord que les deux sont écrites dans la même unité.",
      "Les deux sont en kilogrammes : 3 + 2 = 5.",
      "Elle porte 5 kg.",
    ),
    tags: ["ce1", "masse", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un panier vide pèse 300 g. On y met 1 kg de pommes. Combien pèse le panier plein, en grammes ?",
    format: "short",
    expected: ["1300"],
    comparator: "number_equal",
    hint: "Mets d'abord le kilo en grammes.",
    explanation: exp(
      "On n'additionne des masses que si elles sont écrites dans la même unité.",
      "On transforme les kilogrammes en grammes, puis on additionne.",
      "1 kg = 1 000 g. Puis 1 000 + 300 = 1 300.",
      "Le panier plein pèse 1 300 g.",
    ),
    tags: ["ce1", "masse", "probleme", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac de farine pèse 1 kg. On en utilise 400 g pour un gâteau. Combien reste-t-il de grammes de farine ?",
    format: "short",
    expected: ["600"],
    comparator: "number_equal",
    hint: "1 kg, c'est 1 000 g. On enlève ce qui a été utilisé.",
    explanation: exp(
      "Chercher un reste, c'est enlever au total ce qui a été pris.",
      "On écrit d'abord le sac en grammes, puis on soustrait.",
      "1 kg = 1 000 g. Puis 1 000 - 400 = 600.",
      "Il reste 600 g de farine.",
    ),
    tags: ["ce1", "masse", "probleme"],
  },
  {
    kind: "template",
    id: "ce1_masse_probleme_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même unité d'abord, opération ensuite.",
    tags: ["ce1", "masse", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { qui: "Malia", fruit: "letchis", ou: "au marché de Saint-Pierre" },
        { qui: "Kevin", fruit: "mangues", ou: "chez le marchand du Tampon" },
        { qui: "Naïla", fruit: "bananes", ou: "au marché forain de Saint-Paul" },
      ]);
      const kg = randomInt(1, 3);
      const g = randomInt(100, 800);
      const total = kg * 1000 + g;
      return {
        text: `${contexte.qui} achète ${kg} kg de ${contexte.fruit} ${contexte.ou}, puis ${g} g de plus. Combien de grammes porte-t-${contexte.qui === "Kevin" ? "il" : "elle"} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On n'additionne des masses que si elles sont écrites dans la même unité.",
          "On transforme les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g. Puis ${kg * 1000} + ${g} = ${total}.`,
          `Cela fait ${total} g en tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_probleme_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce qui reste, c'est le départ moins ce qu'on a enlevé.",
    tags: ["ce1", "masse", "probleme", "template"],
    generate: () => {
      const kg = randomInt(1, 3);
      const departG = kg * 1000;
      const pris = randomInt(2, 8) * 100;
      const reste = departG - pris;
      const produit = randomChoice(["farine", "sucre", "riz", "semoule"]);
      return {
        text: `Un paquet de ${produit} pèse ${kg} kg. On en utilise ${pris} g. Combien reste-t-il de grammes ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un reste, c'est enlever au total ce qui a été pris.",
          "On écrit d'abord le paquet en grammes, puis on soustrait.",
          `${kg} kg = ${departG} g. Puis ${departG} - ${pris} = ${reste}.`,
          `Il reste ${reste} g.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MASSE_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : compléter
     jusqu'au kilo, et fabriquer une masse avec des paquets.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plateau, il y a 750 g de fruits. Combien de grammes faut-il ajouter pour atteindre 1 kg ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "1 kg, c'est 1 000 g. Compte ce qui manque pour aller de 750 à 1 000.",
    explanation: exp(
      "Compléter jusqu'à une masse, c'est chercher ce qui manque.",
      "On écrit l'objectif dans la même unité, puis on cherche l'écart.",
      "1 kg = 1 000 g. De 750 à 1 000, il manque 250 : 750 + 250 = 1 000.",
      "Il faut ajouter 250 g.",
    ),
    tags: ["ce1", "masse", "defi"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants pèsent le même sac. Léa écrit 2 kg, Kevin écrit 2 000 g. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même masse",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même masse"],
    comparator: "mcq_exact",
    hint: "Transforme les 2 kg en grammes.",
    explanation: exp(
      "Une même masse peut s'écrire de deux façons, avec deux unités différentes.",
      "On ramène les deux écritures à la même unité, ici le gramme.",
      "2 kg = 2 000 g, puisque 1 kg = 1 000 g. Léa et Kevin ont écrit la même masse, avec des mots différents.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "masse", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_masse_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de paquets tiennent dans le kilo.",
    tags: ["ce1", "masse", "defi", "template"],
    generate: () => {
      // On ne garde que des paquets qui remplissent le kilo pile : un défi qui
      // se termine par « 3 paquets et un morceau » n'apprend rien à un CE1.
      const paquet = randomChoice([100, 200, 250, 500]);
      const nb = 1000 / paquet;
      const produit = randomChoice(["sucre", "café", "farine", "chocolat"]);
      return {
        text: `Combien de paquets de ${paquet} g faut-il pour faire 1 kg de ${produit} ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de paquets tiennent dans une masse, c'est faire des groupements.",
          "On écrit d'abord le kilo en grammes, puis on cherche combien de fois le paquet y tient.",
          `1 kg = 1 000 g. Et ${paquet} tient ${nb} fois dans 1 000.`,
          `Il faut ${nb} paquets.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_masse_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche ce qui manque pour arriver au kilo.",
    tags: ["ce1", "masse", "defi", "template"],
    generate: () => {
      const deja = randomInt(1, 9) * 100;
      const manque = 1000 - deja;
      const contenu = randomChoice([
        "de letchis",
        "de billes",
        "de coquillages",
        "de pommes de terre",
      ]);
      return {
        text: `Un sac contient ${deja} g ${contenu}. Combien de grammes faut-il ajouter pour arriver à 1 kg ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter jusqu'à une masse, c'est chercher ce qui manque.",
          "On écrit l'objectif dans la même unité, puis on cherche l'écart.",
          `1 kg = 1 000 g. De ${deja} à 1 000, il manque ${manque} : ${deja} + ${manque} = 1 000.`,
          `Il faut ajouter ${manque} g.`,
        ),
      };
    },
  },
];
