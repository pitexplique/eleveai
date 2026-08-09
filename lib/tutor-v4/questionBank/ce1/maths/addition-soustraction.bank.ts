// lib/tutor-v4/questionBank/ce1/maths/addition-soustraction.bank.ts
//
// Les additions et les soustractions posées du CE1, écrites à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — poser et effectuer des additions de deux ou trois nombres à un, deux ou
//     trois chiffres, unités sous unités, dizaines sous dizaines, centaines
//     sous centaines ;
//   — connaître un algorithme de soustraction posée — « par cassage » ou
//     « par compensation ». On n'en impose aucun ici : les questions portent
//     sur le résultat et sur la pose, pas sur la méthode ;
//   — les nombres restent dans le millier.
// 📅 Jalons : l'addition posée est utilisée dès le début de l'année ; la
// soustraction posée arrive en PÉRIODE 3 au plus tard.
//
// LE PIÈGE DE LA NOTION : aligner les chiffres à gauche au lieu des unités.
// 45 + 7 posé de travers donne 115 au lieu de 52. C'est l'erreur qui survit
// le plus longtemps, et elle ne se voit pas dans le résultat sans regarder la
// pose.
//
// ⛔ CANVAS : `calcul_pose` n'est utilisé qu'avec `showResult: false`. Avec le
// résultat affiché, il n'y a plus de question.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { CalculPoseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function calculPose(data: Omit<CalculPoseCanvasData, "kind">): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const additionSoustractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ADDITION_POSEE — poser et effectuer une addition
     LE piège : l'alignement. On aligne les unités, jamais le
     bord gauche des nombres.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_addition_posee_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser l'addition 245 + 37, comment faut-il écrire les deux nombres l'un au-dessus de l'autre ?",
    format: "qcm",
    choices: [
      "le 7 sous le 5, le 3 sous le 4",
      "le 3 sous le 2, le 7 sous le 4",
      "les deux nombres collés à gauche",
      "peu importe, du moment qu'ils sont l'un sous l'autre",
    ],
    expected: ["le 7 sous le 5, le 3 sous le 4"],
    comparator: "mcq_exact",
    hint: "Les unités avec les unités, les dizaines avec les dizaines.",
    explanation: exp(
      "On pose une addition en rangeant chaque chiffre sous celui de même rang.",
      "On commence par aligner les unités, tout à droite, puis les dizaines, puis les centaines.",
      "Dans 245, le 5 est aux unités ; dans 37, c'est le 7. Ils vont donc l'un sous l'autre. Le 3 des dizaines se place sous le 4 des dizaines. Aligner à gauche donnerait 245 + 370, un tout autre calcul.",
      "Le 7 va sous le 5, et le 3 sous le 4.",
    ),
    tags: ["ce1", "addition_soustraction", "poser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_addition_posee_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'addition posée 45 + 37, combien font les unités 5 + 7, et que fait-on du résultat ?",
    format: "qcm",
    choices: [
      "12 : on écrit 2 et on retient 1 dizaine",
      "12 : on écrit 12 sous les unités",
      "12 : on retient 2 et on écrit 1",
      "13 : on écrit 3 et on retient 1",
    ],
    expected: ["12 : on écrit 2 et on retient 1 dizaine"],
    comparator: "mcq_exact",
    hint: "Douze unités, c'est une dizaine et deux unités.",
    explanation: exp(
      "Une colonne ne peut contenir qu'un seul chiffre : dès qu'on atteint dix, on forme une dizaine.",
      "On additionne la colonne, on écrit le chiffre des unités du résultat, on retient le reste.",
      "5 + 7 = 12. Douze unités font 1 dizaine et 2 unités : on écrit 2 sous les unités et on reporte 1 sur la colonne des dizaines.",
      "On écrit 2 et on retient 1 dizaine.",
    ),
    canvas: calculPose({
      operation: "addition",
      numbers: ["45", "37"],
      display: { showResult: false, showRetenues: false },
    }),
    tags: ["ce1", "addition_soustraction", "poser", "methode", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_addition_posee_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la colonne des unités, tout à droite.",
    tags: ["ce1", "addition_soustraction", "poser", "template", "canvas"],
    generate: () => {
      const a = randomInt(120, 480);
      const b = randomInt(115, 390);
      const total = a + b;
      return {
        text: `Pose et effectue : ${a} + ${b}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On additionne colonne par colonne, en partant des unités.",
          "Dès qu'une colonne dépasse neuf, on écrit le chiffre des unités et on retient le reste sur la colonne suivante.",
          `${a} + ${b} = ${total}. Les unités : ${a % 10} + ${b % 10}. Puis les dizaines, puis les centaines, sans oublier les retenues.`,
          `Le résultat est ${total}.`,
        ),
        canvas: calculPose({
          operation: "addition",
          numbers: [String(a), String(b)],
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_addition_posee_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois nombres : additionne les unités des trois d'un coup.",
    tags: ["ce1", "addition_soustraction", "poser", "template"],
    generate: () => {
      const a = randomInt(100, 300);
      const b = randomInt(20, 90);
      const c = randomInt(4, 9);
      const total = a + b + c;
      return {
        text: `Pose et effectue : ${a} + ${b} + ${c}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On peut poser une addition de trois nombres : chaque chiffre va dans la colonne de son rang.",
          "On aligne les unités, puis on additionne colonne par colonne en partant de la droite.",
          `${a} + ${b} = ${a + b}, puis ${a + b} + ${c} = ${total}. Le ${c} n'a que des unités : il se place tout à droite, sous les unités.`,
          `Le résultat est ${total}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOUSTRACTION_POSEE — poser et effectuer une soustraction
     📅 Elle arrive en période 3 au plus tard. Le programme
     laisse le choix de l'algorithme : on ne teste donc que le
     résultat et la pose.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_soustraction_posee_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une soustraction posée, quel nombre écrit-on en haut ?",
    format: "qcm",
    choices: [
      "le plus grand",
      "le plus petit",
      "celui qu'on préfère",
      "celui qui a le moins de chiffres",
    ],
    expected: ["le plus grand"],
    comparator: "mcq_exact",
    hint: "On enlève au grand nombre, pas l'inverse.",
    explanation: exp(
      "Soustraire, c'est enlever une quantité à une autre.",
      "On écrit d'abord le nombre de départ, puis en dessous celui qu'on enlève.",
      "On ne peut pas enlever 45 à 12 au CE1 : c'est le plus grand nombre qui va en haut, et on lui retire l'autre.",
      "On écrit le plus grand en haut.",
    ),
    tags: ["ce1", "addition_soustraction", "soustraire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_soustraction_posee_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 52 - 27 et trouve 35. Il a fait 7 - 2 dans la colonne des unités. Quelle est la bonne réponse ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Dans la colonne des unités, c'est 2 - 7 qu'il fallait faire, pas 7 - 2.",
    explanation: exp(
      "Dans une soustraction, on enlève toujours le chiffre du bas à celui du haut, même quand il est plus grand.",
      "Quand le chiffre du haut est trop petit, on casse une dizaine du nombre de départ.",
      "52, c'est 4 dizaines et 12 unités. 12 - 7 = 5 aux unités, puis 4 - 2 = 2 aux dizaines : 52 - 27 = 25. En faisant 7 - 2, l'élève a inversé la colonne.",
      "La bonne réponse est 25.",
    ),
    tags: ["ce1", "addition_soustraction", "soustraire", "piege"],
  },
  {
    kind: "template",
    id: "ce1_soustraction_posee_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Colonne par colonne, en partant des unités.",
    tags: ["ce1", "addition_soustraction", "soustraire", "template", "canvas"],
    generate: () => {
      const b = randomInt(102, 340);
      const a = b + randomInt(120, 550);
      const reste = a - b;
      return {
        text: `Pose et effectue : ${a} - ${b}`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "On soustrait colonne par colonne, en partant des unités.",
          "Quand le chiffre du haut est plus petit que celui du bas, on casse une dizaine ou une centaine.",
          `${a} - ${b} = ${reste}. On vérifie en ajoutant : ${reste} + ${b} = ${a}.`,
          `Le résultat est ${reste}.`,
        ),
        canvas: calculPose({
          operation: "soustraction",
          numbers: [String(a), String(b)],
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_soustraction_posee_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Casse une dizaine quand le chiffre du haut est trop petit.",
    tags: ["ce1", "addition_soustraction", "soustraire", "piege", "template"],
    generate: () => {
      // On force le « cassage » : le chiffre des unités du haut est plus petit.
      const uHaut = randomInt(1, 4);
      const uBas = randomInt(uHaut + 1, 9);
      const dHaut = randomInt(3, 9);
      const dBas = randomInt(1, dHaut - 1);
      const a = dHaut * 10 + uHaut;
      const b = dBas * 10 + uBas;
      const reste = a - b;
      return {
        text: `Pose et effectue : ${a} - ${b}`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "On enlève toujours le chiffre du bas à celui du haut, même quand il est plus grand.",
          "Quand le chiffre du haut est trop petit, on casse une dizaine du nombre de départ.",
          `${a}, c'est ${dHaut - 1} dizaines et ${uHaut + 10} unités. ${uHaut + 10} - ${uBas} = ${uHaut + 10 - uBas} aux unités, puis ${dHaut - 1} - ${dBas} = ${dHaut - 1 - dBas} aux dizaines.`,
          `Le résultat est ${reste}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ADD_SOUS_COMPLEMENT — le terme manquant
     Le programme le demande sous forme d'« égalités à trou ».
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_complement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre manque : 40 + … = 100 ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Compte de 40 jusqu'à 100.",
    explanation: exp(
      "Chercher un terme manquant, c'est chercher ce qu'il faut ajouter pour atteindre le total.",
      "On part du nombre connu et on avance jusqu'au total.",
      "De 40 à 100, il y a 60 : 40 + 60 = 100. On peut aussi calculer 100 - 40 = 60.",
      "Il manque 60.",
    ),
    tags: ["ce1", "addition_soustraction", "complement"],
  },
  {
    kind: "fixed",
    id: "ce1_add_sous_complement_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    text: "Quel nombre manque : … - 30 = 50 ?",
    format: "short",
    expected: ["80"],
    comparator: "number_equal",
    hint: "Le nombre de départ est plus grand que 50, pas plus petit.",
    explanation: exp(
      "Dans une soustraction à trou au début, le nombre cherché est le plus grand des trois.",
      "On remonte l'opération : on ajoute ce qui a été enlevé au résultat.",
      "50 + 30 = 80. On vérifie : 80 - 30 = 50.",
      "Il manque 80.",
    ),
    tags: ["ce1", "addition_soustraction", "complement", "piege"],
  },
  {
    kind: "template",
    id: "ce1_add_sous_complement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui manque, c'est le total moins ce qu'on a déjà.",
    tags: ["ce1", "addition_soustraction", "complement", "template"],
    generate: () => {
      const total = randomInt(120, 800);
      const connu = randomInt(30, total - 20);
      const manque = total - connu;
      return {
        text: `Quel nombre manque : ${connu} + … = ${total} ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un terme manquant, c'est chercher ce qu'il faut ajouter pour atteindre le total.",
          "On enlève au total ce qu'on a déjà.",
          `${total} - ${connu} = ${manque}. On vérifie : ${connu} + ${manque} = ${total}.`,
          `Il manque ${manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_add_sous_complement_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    hint: "Remonte l'opération : ajoute ce qui a été enlevé.",
    tags: ["ce1", "addition_soustraction", "complement", "piege", "template"],
    generate: () => {
      const enleve = randomInt(20, 200);
      const reste = randomInt(30, 400);
      const depart = enleve + reste;
      return {
        text: `Quel nombre manque : … - ${enleve} = ${reste} ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le trou est au début d'une soustraction, le nombre cherché est le plus grand des trois.",
          "On remonte l'opération : on rend ce qui a été enlevé.",
          `${reste} + ${enleve} = ${depart}. On vérifie : ${depart} - ${enleve} = ${reste}.`,
          `Il manque ${depart}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ADD_SOUS_ESTIMER — l'ordre de grandeur
     Estimer avant de calculer, c'est se donner un moyen de
     repérer un résultat absurde.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_estimer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Sans calculer exactement, 198 + 203 est-il plus proche de 400 ou de 300 ?",
    format: "qcm",
    choices: ["de 400", "de 300", "de 200", "de 1 000"],
    expected: ["de 400"],
    comparator: "mcq_exact",
    hint: "Chaque nombre est tout près de 200.",
    explanation: exp(
      "Estimer un résultat, c'est remplacer les nombres par des nombres ronds proches.",
      "On arrondit chaque nombre à la centaine la plus proche, puis on calcule de tête.",
      "198 est presque 200, et 203 aussi. 200 + 200 = 400 : le résultat sera tout près de 400.",
      "C'est plus proche de 400.",
    ),
    tags: ["ce1", "addition_soustraction", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_add_sous_estimer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 305 - 98 et trouve 407. Sans refaire le calcul, comment sait-on que c'est faux ?",
    format: "qcm",
    choices: [
      "parce qu'en enlevant, on doit trouver moins que 305",
      "parce que 407 n'est pas un nombre rond",
      "parce que 98 est plus petit que 100",
      "on ne peut pas le savoir sans calculer",
    ],
    expected: ["parce qu'en enlevant, on doit trouver moins que 305"],
    comparator: "mcq_exact",
    hint: "Une soustraction ne peut pas faire grandir le nombre de départ.",
    explanation: exp(
      "Enlever une quantité donne toujours un résultat plus petit que le nombre de départ.",
      "On compare le résultat trouvé au nombre de départ avant même de vérifier le calcul.",
      "407 est plus grand que 305 : impossible pour une soustraction. Le bon résultat est proche de 305 - 100 = 205, et vaut exactement 207.",
      "Parce qu'en enlevant, on doit trouver moins que 305.",
    ),
    tags: ["ce1", "addition_soustraction", "estimer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_add_sous_estimer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace chaque nombre par la centaine la plus proche.",
    tags: ["ce1", "addition_soustraction", "estimer", "template"],
    generate: () => {
      const c1 = randomInt(1, 4);
      const c2 = randomInt(1, 4);
      const a = c1 * 100 + randomChoice([-3, -2, 2, 3]);
      const b = c2 * 100 + randomChoice([-3, -2, 2, 3]);
      const arrondi = (c1 + c2) * 100;
      return {
        text: `Sans calculer exactement, de quel nombre ${a} + ${b} est-il le plus proche ?`,
        format: "qcm",
        choices: makeChoices(String(arrondi), [
          String(arrondi + 100),
          String(arrondi - 100),
          String(arrondi * 2),
          String(arrondi + 500),
        ]),
        expected: [String(arrondi)],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c'est remplacer chaque nombre par un nombre rond tout proche.",
          "On arrondit à la centaine la plus proche, puis on additionne de tête.",
          `${a} est presque ${c1 * 100}, et ${b} est presque ${c2 * 100}. ${c1 * 100} + ${c2 * 100} = ${arrondi}.`,
          `Le résultat est proche de ${arrondi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ADD_SOUS_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que 32 + 15 = 47. Que vaut 47 - 15, sans poser l'opération ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "La soustraction défait ce que l'addition a fait.",
    explanation: exp(
      "La soustraction est l'opération inverse de l'addition : elle défait ce que l'addition a fait.",
      "On relit l'addition à l'envers au lieu de recalculer.",
      "Si 32 + 15 = 47, alors enlever 15 à 47 ramène au point de départ : 32. De même, 47 - 32 = 15.",
      "47 - 15 = 32.",
    ),
    tags: ["ce1", "addition_soustraction", "defi", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_add_sous_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relis l'addition à l'envers, ne recalcule pas.",
    tags: ["ce1", "addition_soustraction", "defi", "template"],
    generate: () => {
      const a = randomInt(120, 500);
      const b = randomInt(20, 300);
      const s = a + b;
      const cherche = randomChoice([a, b]);
      const autre = cherche === a ? b : a;
      return {
        text: `On sait que ${a} + ${b} = ${s}. Que vaut ${s} - ${autre}, sans poser l'opération ?`,
        format: "short",
        expected: [String(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "La soustraction défait l'addition : elle ramène au nombre de départ.",
          "On relit l'égalité connue à l'envers au lieu de recalculer.",
          `${a} + ${b} = ${s}, donc enlever ${autre} à ${s} redonne ${cherche}.`,
          `Cela vaut ${cherche}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_add_sous_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Deux étapes : cherche d'abord le total.",
    tags: ["ce1", "addition_soustraction", "defi", "reunion", "template"],
    generate: () => {
      const debut = randomInt(150, 400);
      const ajout = randomInt(40, 200);
      const retire = randomInt(30, debut);
      const fin = debut + ajout - retire;
      const contexte = randomChoice([
        { lieu: "la bibliothèque de l'école", objet: "livres" },
        { lieu: "le jardin créole de la classe", objet: "graines" },
        { lieu: "la réserve de la cantine", objet: "yaourts" },
      ]);
      return {
        text: `Dans ${contexte.lieu}, il y a ${debut} ${contexte.objet}. On en apporte ${ajout}, puis on en sort ${retire}. Combien en reste-t-il ?`,
        format: "short",
        expected: [String(fin)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre où les choses se passent.",
          "On ajoute d'abord ce qui arrive, on enlève ensuite ce qui part.",
          `${debut} + ${ajout} = ${debut + ajout}, puis ${debut + ajout} - ${retire} = ${fin}.`,
          `Il en reste ${fin}.`,
        ),
      };
    },
  },
];
