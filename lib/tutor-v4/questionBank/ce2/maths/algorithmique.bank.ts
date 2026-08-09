// lib/tutor-v4/questionBank/ce2/maths/algorithmique.bank.ts
//
// Les programmes et déplacements codés du CE2, écrits à la main. Cinq
// micro-compétences qui passaient par le constructeur commun.
//
// ⚠️ HORS ATTENDUS DE FIN DE CE2 — RÉVISION DU CE1.
// Relu sur le texte lui-même le 09/08/2026 (BO n° 41 du 31 octobre 2024,
// applicable à la rentrée 2025) : il n'existe pas de sous-domaine
// « algorithmique » au cycle 2. « Comprendre, utiliser et produire une suite
// d'instructions qui codent un déplacement » vit à l'intérieur du repérage
// dans l'espace, au CP (dix instructions au plus, dont deux virages) et au CE1
// (quinze instructions, dont quatre virages). Au CE2, plus rien.
// Gardées quand même — feu vert de Frédéric. C'est de la consolidation, et
// c'est ce que l'élève réclame le plus volontiers.
// ⛔ Ne pas s'appuyer là-dessus pour annoncer « l'algorithmique au programme
// du CE2 » : ce serait faux.
//
// CE QU'ON Y TRAVAILLE : programmer les déplacements d'un robot ou d'un
// personnage sur un quadrillage — lire une suite d'instructions, la coder,
// utiliser une répétition, corriger un programme qui ne marche pas.
// ⛔ Pas de variable, pas de condition au cycle 2 : ni « si… alors », ni
// compteur. On avance, on tourne, on répète.
//
// LE PIÈGE DE LA NOTION : l'ordre. « Avance puis tourne » et « tourne puis
// avance » n'arrivent pas au même endroit, et c'est la seule chose qui compte
// vraiment ici. Un programme n'est pas une liste d'ingrédients, c'est une
// succession.
// Le second : la répétition. « Répéter 3 fois : avancer de 2 » fait avancer de
// 6, pas de 5 ni de 3. On multiplie, on n'additionne pas les deux nombres.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { ScratchCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function programme(titre: string, blocks: ScratchCanvasData["blocks"]): ScratchCanvasData {
  return {
    kind: "scratch",
    title: titre,
    blocks,
    display: { showSprite: true, compact: true },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_ALGO_INSTRUCTION — lire un programme
     L'ordre fait tout.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quel ordre l'ordinateur exécute-t-il les instructions d'un programme ?",
    format: "qcm",
    choices: [
      "de la première à la dernière, dans l'ordre écrit",
      "dans l'ordre qu'il préfère",
      "en commençant par la dernière",
      "toutes en même temps",
    ],
    expected: ["de la première à la dernière, dans l'ordre écrit"],
    comparator: "mcq_exact",
    hint: "Comme une recette de cuisine : on suit les étapes dans l'ordre.",
    explanation: exp(
      "Un programme est une suite d'instructions exécutées l'une après l'autre, du haut vers le bas.",
      "On lit les instructions dans l'ordre où elles sont écrites, sans en sauter.",
      "Changer l'ordre change le résultat : « avance puis tourne » n'arrive pas au même endroit que « tourne puis avance », même avec exactement les mêmes instructions.",
      "De la première à la dernière, dans l'ordre écrit.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot regarde vers la droite. Programme A : « avancer de 3, puis tourner ». Programme B : « tourner, puis avancer de 3 ». Arrivent-ils au même endroit ?",
    format: "qcm",
    choices: [
      "non, l'ordre des instructions change le résultat",
      "oui, ce sont les mêmes instructions",
      "oui, si le robot va assez vite",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre des instructions change le résultat"],
    comparator: "mcq_exact",
    hint: "Dans quelle direction le robot avance-t-il, dans chaque programme ?",
    explanation: exp(
      "Un programme est une succession : chaque instruction s'exécute dans l'état laissé par la précédente.",
      "On suit le robot pas à pas dans chaque programme, en notant sa direction.",
      "Dans A, le robot avance d'abord vers la droite, puis tourne sur place. Dans B, il tourne d'abord, puis avance dans la NOUVELLE direction. Les deux finissent à des endroits différents, avec pourtant les mêmes instructions.",
      "Non : l'ordre change le résultat.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot part d'une case, avance de 2 cases, puis avance encore de 3 cases dans la même direction. De combien de cases s'est-il déplacé en tout ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Deux avancées dans la même direction s'additionnent.",
    explanation: exp(
      "Deux déplacements successifs dans la même direction s'additionnent.",
      "On suit le robot instruction par instruction en comptant les cases.",
      "2 + 3 = 5. Le robot est à 5 cases de son point de départ.",
      "Il s'est déplacé de 5 cases.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "canvas"],
    canvas: programme("Le déplacement du robot", [
      { type: "event", text: "quand le programme démarre" },
      { type: "move", text: "avancer de 2 cases", value: 2 },
      { type: "move", text: "avancer de 3 cases", value: 3 },
    ]),
  },
  {
    kind: "template",
    id: "ce2_algo_instruction_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les instructions une par une, dans l'ordre.",
    tags: ["ce2", "algorithmique", "instruction", "template", "canvas"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(1, 6);
      const c = randomInt(1, 5);
      const total = a + b + c;
      return {
        text: `Un robot avance de ${a} cases, puis de ${b} cases, puis de ${c} cases, toujours dans la même direction. De combien de cases s'est-il déplacé en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Des déplacements successifs dans la même direction s'additionnent.",
          "On suit le programme instruction par instruction, en cumulant les cases.",
          `${a} + ${b} + ${c} = ${total}.`,
          `Il s'est déplacé de ${total} cases.`,
        ),
        canvas: programme("Le déplacement du robot", [
          { type: "event", text: "quand le programme démarre" },
          { type: "move", text: `avancer de ${a} cases`, value: a },
          { type: "move", text: `avancer de ${b} cases`, value: b },
          { type: "move", text: `avancer de ${c} cases`, value: c },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_algo_instruction_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    hint: "Une avancée puis un retour en arrière, cela s'annule en partie.",
    tags: ["ce2", "algorithmique", "instruction", "piege", "template"],
    generate: () => {
      const avance = randomInt(4, 9);
      const recule = randomInt(1, avance - 1);
      return {
        text: `Un robot avance de ${avance} cases, puis recule de ${recule} cases. À combien de cases de son point de départ se trouve-t-il ?`,
        format: "short",
        expected: [String(avance - recule)],
        comparator: "number_equal",
        explanation: exp(
          "Avancer puis reculer, ce n'est pas additionner : c'est faire la différence.",
          "On suit le robot instruction par instruction, en comptant dans le bon sens.",
          `Il avance de ${avance}, puis revient de ${recule} : ${avance} − ${recule} = ${avance - recule}. Additionner les deux nombres donnerait ${avance + recule}, ce qui reviendrait à toujours avancer.`,
          `Il est à ${avance - recule} cases du départ.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ALGO_DEPLACEMENT — coder un déplacement
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "Pour coder un déplacement sur un quadrillage, que faut-il indiquer à chaque étape ?",
    format: "qcm",
    choices: [
      "la direction et le nombre de cases",
      "la couleur de la case",
      "le nom du robot",
      "la vitesse du robot",
    ],
    expected: ["la direction et le nombre de cases"],
    comparator: "mcq_exact",
    hint: "Où va-t-il, et de combien ?",
    explanation: exp(
      "Une instruction de déplacement dit dans quelle direction aller, et de combien de cases.",
      "On écrit chaque étape avec ces deux informations, dans l'ordre.",
      "« 3 cases vers la droite » est une instruction complète. « 3 cases » toute seule ne dit pas où aller, et « vers la droite » toute seule ne dit pas jusqu'où.",
      "La direction et le nombre de cases.",
    ),
    tags: ["ce2", "algorithmique", "deplacement", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot avance de 2 cases vers la droite, puis de 3 cases vers le haut, puis de 2 cases vers la gauche. Où se trouve-t-il par rapport au départ ?",
    format: "qcm",
    choices: [
      "3 cases plus haut, à la même place horizontalement",
      "4 cases à droite et 3 cases plus haut",
      "3 cases plus haut et 2 cases à droite",
      "au point de départ",
    ],
    expected: ["3 cases plus haut, à la même place horizontalement"],
    comparator: "mcq_exact",
    hint: "Droite puis gauche du même nombre de cases, cela s'annule.",
    explanation: exp(
      "Deux déplacements opposés de même longueur se compensent : il ne reste que ce qui n'a pas été annulé.",
      "On traite les directions séparément : la droite et la gauche d'un côté, le haut et le bas de l'autre.",
      "Horizontalement : 2 vers la droite, puis 2 vers la gauche, il ne reste rien. Verticalement : 3 vers le haut. Le robot est donc 3 cases plus haut, à la même place horizontalement.",
      "3 cases plus haut, à la même place horizontalement.",
    ),
    tags: ["ce2", "algorithmique", "deplacement", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot doit aller 4 cases à droite et 2 cases en haut. Combien d'instructions au minimum lui faut-il ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Une instruction peut couvrir plusieurs cases d'un coup.",
    explanation: exp(
      "Une instruction indique une direction et un nombre de cases : elle peut donc couvrir plusieurs cases d'un seul coup.",
      "On regroupe toutes les cases d'une même direction en une seule instruction.",
      "« 4 cases vers la droite », puis « 2 cases vers le haut » : deux instructions suffisent. En écrivant case par case, il en faudrait six — le programme serait juste, mais bien plus long.",
      "Il en faut 2.",
    ),
    tags: ["ce2", "algorithmique", "deplacement"],
  },
  {
    kind: "template",
    id: "ce2_algo_deplacement_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Traite la droite et la gauche d'un côté, le haut et le bas de l'autre.",
    tags: ["ce2", "algorithmique", "deplacement", "piege", "template"],
    generate: () => {
      const droite = randomInt(2, 6);
      const gauche = randomInt(1, droite);
      const haut = randomInt(1, 5);
      const resteDroite = droite - gauche;
      return {
        text: `Un robot avance de ${droite} cases vers la droite, de ${haut} cases vers le haut, puis de ${gauche} cases vers la gauche. De combien de cases s'est-il déplacé vers la droite en tout ?`,
        format: "short",
        expected: [String(resteDroite)],
        comparator: "number_equal",
        explanation: exp(
          "Deux déplacements opposés se compensent : on ne garde que ce qui reste.",
          "On regroupe les déplacements par direction, puis on fait la différence.",
          `Vers la droite : ${droite}. Vers la gauche : ${gauche}. Il reste ${droite} − ${gauche} = ${resteDroite}. Le déplacement vers le haut ne change rien à ce calcul.`,
          `Il s'est déplacé de ${resteDroite} case${resteDroite > 1 ? "s" : ""} vers la droite.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_algo_deplacement_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Une instruction par direction suffit.",
    tags: ["ce2", "algorithmique", "deplacement", "template"],
    generate: () => {
      const directions = shuffle(["la droite", "le haut", "la gauche", "le bas"]).slice(
        0,
        randomInt(2, 3),
      );
      const cases = directions.map(() => randomInt(1, 5));
      return {
        text: `Un robot doit aller ${directions.map((d, i) => `${cases[i]} case${cases[i] > 1 ? "s" : ""} vers ${d}`).join(", puis ")}. Combien d'instructions au minimum faut-il écrire ?`,
        format: "short",
        expected: [String(directions.length)],
        comparator: "number_equal",
        explanation: exp(
          "Une instruction indique une direction et un nombre de cases : elle couvre donc plusieurs cases d'un coup.",
          "On compte les changements de direction : il faut une instruction par direction.",
          `Le robot change de direction ${directions.length} fois : il faut ${directions.length} instructions. En écrivant case par case, il en faudrait ${cases.reduce((a, b) => a + b, 0)}.`,
          `Il en faut ${directions.length}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ALGO_REPETITION — la boucle
     « Répéter 3 fois : avancer de 2 » fait 6, pas 5.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une répétition dans un programme ?",
    format: "qcm",
    choices: [
      "à écrire une seule fois ce qu'on veut faire plusieurs fois",
      "à faire aller le robot plus vite",
      "à effacer les instructions précédentes",
      "à changer la direction du robot",
    ],
    expected: ["à écrire une seule fois ce qu'on veut faire plusieurs fois"],
    comparator: "mcq_exact",
    hint: "C'est un raccourci d'écriture, pas un raccourci de chemin.",
    explanation: exp(
      "Une répétition demande d'exécuter plusieurs fois le même bloc d'instructions.",
      "On écrit l'instruction une fois, et on indique combien de fois la refaire.",
      "« Répéter 4 fois : avancer de 3 » remplace quatre lignes identiques. Le robot fait exactement le même trajet : c'est le programme qui est plus court, pas le chemin.",
      "À écrire une seule fois ce qu'on veut faire plusieurs fois.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "« Répéter 3 fois : avancer de 2 cases ». De combien de cases le robot avance-t-il en tout ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases : on multiplie, on n'additionne pas les deux nombres.",
    explanation: exp(
      "Une répétition exécute le bloc autant de fois qu'indiqué : les déplacements s'accumulent.",
      "On multiplie le nombre de répétitions par ce que fait le bloc à chaque tour.",
      "3 × 2 = 6. Répondre 5, ce serait additionner le nombre de répétitions et le nombre de cases — deux nombres qui ne comptent pas la même chose.",
      "Le robot avance de 6 cases.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "piege", "canvas"],
    canvas: programme("Une boucle", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 3 fois",
        times: 3,
        children: [{ type: "move", text: "avancer de 2 cases", value: 2 }],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un carré, un robot doit avancer puis tourner, quatre fois de suite. Comment écrire ce programme le plus court possible ?",
    format: "qcm",
    choices: [
      "répéter 4 fois : avancer, puis tourner",
      "écrire huit instructions à la suite",
      "répéter 8 fois : avancer",
      "avancer 4 fois, puis tourner 4 fois",
    ],
    expected: ["répéter 4 fois : avancer, puis tourner"],
    comparator: "mcq_exact",
    hint: "Le bloc à répéter contient DEUX instructions.",
    explanation: exp(
      "Une répétition peut contenir plusieurs instructions : c'est tout le bloc qui se répète.",
      "On repère le motif qui revient, puis on compte combien de fois il revient.",
      "Le motif « avancer, puis tourner » revient 4 fois : on l'écrit une fois dans une répétition de 4. Avancer 4 fois puis tourner 4 fois donnerait un long trait et une toupie, pas un carré — l'ordre compte à l'intérieur de la boucle aussi.",
      "Répéter 4 fois : avancer, puis tourner.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "qcm", "canvas"],
    canvas: programme("Tracer un carré", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 4 fois",
        times: 4,
        children: [
          { type: "move", text: "avancer de 5 cases", value: 5 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "template",
    id: "ce2_algo_repetition_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie les répétitions par ce que fait le bloc.",
    tags: ["ce2", "algorithmique", "repetition", "piege", "template", "canvas"],
    generate: () => {
      const fois = randomInt(2, 8);
      const pas = randomInt(2, 9);
      const total = fois * pas;
      return {
        text: `« Répéter ${fois} fois : avancer de ${pas} cases ». De combien de cases le robot avance-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition exécute le bloc autant de fois qu'indiqué : les déplacements s'accumulent.",
          "On multiplie le nombre de répétitions par ce que fait le bloc à chaque tour.",
          `${fois} × ${pas} = ${total}. Additionner ${fois} et ${pas} donnerait ${fois + pas}, mais ces deux nombres ne comptent pas la même chose : l'un compte des tours, l'autre des cases.`,
          `Il avance de ${total} cases.`,
        ),
        canvas: programme("Une boucle", [
          { type: "event", text: "quand le programme démarre" },
          {
            type: "repeat",
            text: `répéter ${fois} fois`,
            times: fois,
            children: [{ type: "move", text: `avancer de ${pas} cases`, value: pas }],
          },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_algo_repetition_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois faut-il répéter le bloc pour arriver au total ?",
    tags: ["ce2", "algorithmique", "repetition", "template"],
    generate: () => {
      const fois = randomInt(2, 9);
      const pas = randomInt(2, 9);
      const total = fois * pas;
      return {
        text: `Un robot doit avancer de ${total} cases en tout, en répétant « avancer de ${pas} cases ». Combien de fois faut-il répéter ?`,
        format: "short",
        expected: [String(fois)],
        comparator: "number_equal",
        explanation: exp(
          "Trouver le nombre de répétitions, c'est chercher combien de fois le bloc tient dans le total.",
          "On partage le total par ce que fait le bloc à chaque tour.",
          `${total} ÷ ${pas} = ${fois}. Il faut donc répéter ${fois} fois.`,
          `Il faut répéter ${fois} fois.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ALGO_CORRIGER — réparer un programme
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot devait avancer de 7 cases. Le programme dit « avancer de 5 cases ». Comment corriger sans ajouter d'instruction ?",
    format: "qcm",
    choices: [
      "remplacer le 5 par un 7",
      "ajouter une instruction « avancer de 2 »",
      "répéter le programme deux fois",
      "faire reculer le robot",
    ],
    expected: ["remplacer le 5 par un 7"],
    comparator: "mcq_exact",
    hint: "La question demande de ne PAS ajouter d'instruction.",
    explanation: exp(
      "Corriger un programme, c'est trouver l'instruction fautive et la remplacer, pas en empiler d'autres.",
      "On compare ce que fait le programme à ce qu'il devait faire, instruction par instruction.",
      "Le nombre de cases est faux : on change le 5 en 7. Ajouter « avancer de 2 » donnerait aussi 7 cases, mais avec une instruction de plus — et la consigne l'interdisait.",
      "On remplace le 5 par un 7.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot devait tracer un carré. Le programme dit : « répéter 3 fois : avancer, puis tourner d'un quart de tour ». Que trace-t-il ?",
    format: "qcm",
    choices: [
      "trois côtés seulement : le carré n'est pas fermé",
      "un carré parfait",
      "un triangle",
      "rien du tout",
    ],
    expected: ["trois côtés seulement : le carré n'est pas fermé"],
    comparator: "mcq_exact",
    hint: "Un carré a quatre côtés. Combien de fois le bloc s'exécute-t-il ?",
    explanation: exp(
      "Le nombre de répétitions décide du nombre de fois où le motif est tracé.",
      "On compte les côtés que produit le programme, puis on les compare à ceux de la figure voulue.",
      "Le bloc « avancer, puis tourner » trace un côté à chaque tour. Répété 3 fois, il trace 3 côtés : la figure reste ouverte. Ce n'est pas un triangle pour autant — les angles sont droits, il manque simplement le quatrième côté. Il faut répéter 4 fois.",
      "Il trace trois côtés seulement.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "piege", "qcm", "canvas"],
    canvas: programme("Le programme à corriger", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 3 fois",
        times: 3,
        children: [
          { type: "move", text: "avancer de 5 cases", value: 5 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot arrive 3 cases trop à droite. Que faut-il changer dans le programme ?",
    format: "qcm",
    choices: [
      "enlever 3 cases à une instruction qui va vers la droite",
      "ajouter 3 cases vers la droite",
      "faire tourner le robot",
      "répéter le programme",
    ],
    expected: ["enlever 3 cases à une instruction qui va vers la droite"],
    comparator: "mcq_exact",
    hint: "Il est allé trop loin : il faut lui en demander moins.",
    explanation: exp(
      "Pour corriger un programme, on cherche l'écart entre le résultat obtenu et celui qu'on voulait, puis on modifie l'instruction concernée.",
      "On repère la direction où l'erreur se produit, et de combien.",
      "Le robot va 3 cases trop loin vers la droite : on retire 3 à l'instruction qui l'y envoie. En ajouter 3 l'éloignerait encore.",
      "On enlève 3 cases à une instruction qui va vers la droite.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_algo_corriger_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare ce que fait le programme à ce qu'il devait faire.",
    tags: ["ce2", "algorithmique", "corriger", "template"],
    generate: () => {
      const voulu = randomInt(4, 12);
      const ecrit = randomChoice([voulu - randomInt(1, 3), voulu + randomInt(1, 3)]);
      const trop = ecrit > voulu;
      return {
        text: `Un robot devait avancer de ${voulu} cases, mais le programme dit « avancer de ${ecrit} cases ». Par quel nombre faut-il remplacer le ${ecrit} ?`,
        format: "short",
        expected: [String(voulu)],
        comparator: "number_equal",
        explanation: exp(
          "Corriger un programme, c'est remplacer l'instruction fautive par la bonne.",
          "On compare le nombre écrit à celui qu'on voulait.",
          `Le programme fait avancer de ${ecrit} cases alors qu'il en fallait ${voulu} : le robot va ${trop ? `${ecrit - voulu} cases trop loin` : `${voulu - ecrit} cases trop court`}. On remplace donc le ${ecrit} par ${voulu}.`,
          `Il faut écrire ${voulu}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_algo_corriger_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 5,
    theme: "neutral",
    hint: "Le nombre de répétitions décide du nombre de côtés.",
    tags: ["ce2", "algorithmique", "corriger", "piege", "template", "canvas"],
    generate: () => {
      const figures = [
        { nom: "un carré", cotes: 4 },
        { nom: "un triangle", cotes: 3 },
        { nom: "un hexagone", cotes: 6 },
      ] as const;
      const f = randomChoice(figures);
      const ecrit = randomChoice([f.cotes - 1, f.cotes + 1]);
      return {
        text: `Un robot devait tracer ${f.nom}, mais le programme dit « répéter ${ecrit} fois : avancer, puis tourner ». Par quel nombre faut-il remplacer le ${ecrit} ?`,
        format: "short",
        expected: [String(f.cotes)],
        comparator: "number_equal",
        explanation: exp(
          "Le bloc « avancer, puis tourner » trace un côté à chaque tour : il faut donc autant de répétitions que la figure a de côtés.",
          "On compte les côtés de la figure voulue, puis on ajuste le nombre de répétitions.",
          `${f.nom.charAt(0).toUpperCase() + f.nom.slice(1)} a ${f.cotes} côtés. Avec ${ecrit} répétitions, la figure ${ecrit < f.cotes ? "reste ouverte" : "repasse sur un côté déjà tracé"}. Il faut ${f.cotes} répétitions.`,
          `Il faut écrire ${f.cotes}.`,
        ),
        canvas: programme("Le programme à corriger", [
          { type: "event", text: "quand le programme démarre" },
          {
            type: "repeat",
            text: `répéter ${ecrit} fois`,
            times: ecrit,
            children: [
              { type: "move", text: "avancer de 5 cases", value: 5 },
              { type: "turn", text: "tourner" },
            ],
          },
        ]),
      };
    },
  },

  /* =========================================================
     CE2_ALGO_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_algo_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "« Répéter 4 fois : avancer de 3 cases, puis tourner d'un quart de tour ». Quelle est la longueur totale du trait tracé, en cases ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Quatre côtés de 3 cases chacun.",
    explanation: exp(
      "Une répétition exécute son bloc autant de fois qu'indiqué : chaque tour ajoute ce que le bloc trace.",
      "On multiplie le nombre de tours par la longueur tracée à chaque tour.",
      "Le bloc trace 3 cases par tour, et il tourne 4 fois : 3 × 4 = 12. Le robot a tracé un carré de 3 cases de côté, dont le tour mesure 12 cases.",
      "Le trait mesure 12 cases.",
    ),
    tags: ["ce2", "algorithmique", "defi", "deux_etapes", "canvas"],
    canvas: programme("Tracer un carré", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 4 fois",
        times: 4,
        children: [
          { type: "move", text: "avancer de 3 cases", value: 3 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux programmes font avancer un robot de 12 cases. Le premier dit « répéter 6 fois : avancer de 2 ». Le second dit « répéter 4 fois : avancer de 3 ». Lequel écrit le moins d'instructions ?",
    format: "qcm",
    choices: [
      "les deux en écrivent autant : une répétition et une avancée",
      "le premier",
      "le second",
      "on ne peut pas savoir",
    ],
    expected: ["les deux en écrivent autant : une répétition et une avancée"],
    comparator: "mcq_exact",
    hint: "Compte les LIGNES écrites, pas les tours effectués.",
    explanation: exp(
      "Une répétition ne rallonge pas le programme quand on augmente le nombre de tours : c'est un nombre qui change, pas une ligne de plus.",
      "On compte les lignes écrites dans chaque programme, pas les tours exécutés.",
      "Chaque programme tient en deux lignes : la répétition, et l'avancée qu'elle contient. Le robot fait plus de tours dans le premier, mais le programme n'est pas plus long à écrire — c'est justement à cela que sert une boucle.",
      "Les deux en écrivent autant.",
    ),
    tags: ["ce2", "algorithmique", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_algo_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie la longueur d'un côté par le nombre de côtés.",
    tags: ["ce2", "algorithmique", "defi", "template", "canvas"],
    generate: () => {
      const cotes = randomChoice([3, 4, 6]);
      const longueur = randomInt(2, 9);
      const total = cotes * longueur;
      const nom = cotes === 3 ? "un triangle" : cotes === 4 ? "un carré" : "un hexagone";
      return {
        text: `« Répéter ${cotes} fois : avancer de ${longueur} cases, puis tourner ». Le robot trace ${nom}. Quelle est la longueur totale du trait, en cases ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque tour de la répétition trace un côté : la longueur totale est celle de tous les côtés mis bout à bout.",
          "On multiplie la longueur d'un côté par le nombre de tours.",
          `${longueur} × ${cotes} = ${total}. C'est aussi le périmètre de ${nom} tracé.`,
          `Le trait mesure ${total} cases.`,
        ),
        canvas: programme(`Tracer ${nom}`, [
          { type: "event", text: "quand le programme démarre" },
          {
            type: "repeat",
            text: `répéter ${cotes} fois`,
            times: cotes,
            children: [
              { type: "move", text: `avancer de ${longueur} cases`, value: longueur },
              { type: "turn", text: "tourner" },
            ],
          },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_algo_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche d'abord ce que fait un tour complet de la boucle.",
    tags: ["ce2", "algorithmique", "defi", "deux_etapes", "template"],
    generate: () => {
      const fois = randomInt(2, 6);
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const parTour = a + b;
      const total = fois * parTour;
      return {
        text: `« Répéter ${fois} fois : avancer de ${a} cases, puis avancer de ${b} cases ». De combien de cases le robot avance-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition exécute TOUT son bloc à chaque tour : on cherche d'abord ce que fait un tour, puis on multiplie.",
          "On additionne les instructions du bloc, puis on multiplie par le nombre de tours.",
          `Un tour fait avancer de ${a} + ${b} = ${parTour} cases. En ${fois} tours : ${parTour} × ${fois} = ${total}.`,
          `Il avance de ${total} cases.`,
        ),
        canvas: programme("Une boucle à deux instructions", [
          { type: "event", text: "quand le programme démarre" },
          {
            type: "repeat",
            text: `répéter ${fois} fois`,
            times: fois,
            children: [
              { type: "move", text: `avancer de ${a} cases`, value: a },
              { type: "move", text: `avancer de ${b} cases`, value: b },
            ],
          },
        ]),
      };
    },
  },
];
