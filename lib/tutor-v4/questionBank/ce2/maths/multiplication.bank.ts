// lib/tutor-v4/questionBank/ce2/maths/multiplication.bank.ts
//
// La multiplication du CE2, écrite à la main. Six micro-compétences qui
// passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les tables de 2 à 9 et
// celle de 10, le sens de la multiplication (groupes égaux, disposition en
// rangées), la multiplication posée par un nombre À UN CHIFFRE, et la
// multiplication par 10 et par 100. Les nombres restent sous 10 000.
//
// LE PIÈGE DE LA NOTION : « pour multiplier par 10, on ajoute un zéro ». La
// recette marche, et c'est bien le problème — elle cache ce qui se passe. Ce
// n'est pas un zéro qu'on colle, c'est chaque chiffre qui monte d'un rang : les
// unités deviennent des dizaines, les dizaines des centaines. L'élève qui a
// appris la recette la rejouera sur 2,5 en CM1 et écrira 2,50.
// Deux autres reviennent chaque année : la retenue oubliée dans la
// multiplication posée, et 7 × 8 — la case de la table que personne ne retient.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

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

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
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

export const multiplicationBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_TABLES_2_3_4_5_10 — les tables faciles
     Elles s'appuient sur des gestes connus : doubler, compter
     de cinq en cinq, monter d'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 1,
    theme: "neutral",
    text: "Multiplier un nombre par 2, c'est faire quoi ?",
    format: "qcm",
    choices: ["son double", "sa moitié", "lui ajouter 2", "lui enlever 2"],
    expected: ["son double"],
    comparator: "mcq_exact",
    hint: "2 × 7, c'est 7 + 7.",
    explanation: exp(
      "Multiplier par 2, c'est prendre deux fois le nombre : c'est son double.",
      "On additionne le nombre avec lui-même.",
      "2 × 7 = 7 + 7 = 14. C'est pour cela que la table de 2 est la plus facile : on la connaît déjà en sachant doubler.",
      "Multiplier par 2, c'est doubler.",
    ),
    tags: ["ce2", "multiplication", "tables", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 4 × 5 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Compte de cinq en cinq, quatre fois.",
    explanation: exp(
      "Multiplier, c'est additionner plusieurs fois le même nombre.",
      "On compte de 5 en 5, autant de fois que l'indique l'autre nombre.",
      "5, 10, 15, 20 : quatre bonds de 5 mènent à 20. On peut aussi voir 4 × 5 comme le double de 2 × 5 = 10.",
      "4 × 5 = 20.",
    ),
    tags: ["ce2", "multiplication", "tables"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 7 × 0 ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Sept paquets vides, cela fait combien d'objets ?",
    explanation: exp(
      "Multiplier par 0, c'est prendre zéro fois le nombre : il ne reste rien.",
      "On se demande combien d'objets il y a en tout.",
      "7 × 0, c'est sept paquets qui ne contiennent rien : 0 + 0 + 0 + 0 + 0 + 0 + 0 = 0. Tout nombre multiplié par 0 donne 0.",
      "7 × 0 = 0.",
    ),
    tags: ["ce2", "multiplication", "tables", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Appuie-toi sur ce que tu sais déjà : doubler, compter de 5 en 5.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const produit = table * n;
      return {
        text: `Combien font ${table} × ${n} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier, c'est additionner plusieurs fois le même nombre.",
          "On s'appuie sur un résultat qu'on connaît déjà, puis on ajuste.",
          table === 2
            ? `${table} × ${n}, c'est le double de ${n} : ${n} + ${n} = ${produit}.`
            : table === 10
              ? `${table} × ${n} : chaque unité de ${n} devient une dizaine, donc ${produit}.`
              : `${table} × ${n} = ${n} pris ${table} fois, soit ${produit}. On peut aussi dire ${n} × ${table}, c'est le même résultat.`,
          `${table} × ${n} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien de fois il faut prendre le nombre pour arriver au total.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const produit = table * n;
      return {
        text: `Complète : ${table} × ... = ${produit}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre qui manque dans une multiplication, c'est parcourir la table à l'envers.",
          "On récite la table jusqu'à tomber sur le total.",
          `Dans la table de ${table}, on cherche ${produit} : ${table} × ${n} = ${produit}. Le nombre qui manque est ${n}.`,
          `Il manque ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TABLES_6_7_8_9 — les tables difficiles
     Elles se réduisent quand on sait que l'ordre ne change
     rien : 7 × 3 se retrouve dans la table de 3.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 7 × 8 ?",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "C'est le résultat que tout le monde oublie. 5, 6, 7, 8 : 56 = 7 × 8.",
    explanation: exp(
      "7 × 8 est le produit le plus difficile à retenir de toutes les tables.",
      "On utilise le truc des quatre chiffres qui se suivent : 5, 6, 7, 8.",
      "56 = 7 × 8. On peut aussi calculer : 7 × 8 = 7 × 4 × 2 = 28 × 2 = 56.",
      "7 × 8 = 56.",
    ),
    tags: ["ce2", "multiplication", "tables", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    text: "Si tu sais que 3 × 8 = 24, que vaut 8 × 3 ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "L'ordre ne change rien dans une multiplication.",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On retourne le calcul pour retomber sur une table qu'on connaît mieux.",
      "3 rangées de 8 ou 8 rangées de 3 : dans les deux cas, il y a 24 cases. C'est pour cela qu'apprendre les tables de 6, 7, 8 et 9 est moins long qu'il n'y paraît — la moitié est déjà connue.",
      "8 × 3 = 24.",
    ),
    tags: ["ce2", "multiplication", "tables", "methode"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 6 × 9 = 56. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 6 × 9 = 54",
      "oui",
      "non, 6 × 9 = 63",
      "non, 6 × 9 = 45",
    ],
    expected: ["non, 6 × 9 = 54"],
    comparator: "mcq_exact",
    hint: "Passe par 6 × 10, puis enlève un 6.",
    explanation: exp(
      "Multiplier par 9, c'est multiplier par 10 puis enlever une fois le nombre.",
      "On calcule le produit facile par 10, puis on retire.",
      "6 × 10 = 60, et 60 - 6 = 54. Le 56 qu'il annonce, c'est 7 × 8 : les deux résultats se ressemblent et se confondent souvent.",
      "Non : 6 × 9 = 54.",
    ),
    tags: ["ce2", "multiplication", "tables", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par un résultat voisin que tu connais.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(2, 10);
      const produit = table * n;
      return {
        text: `Combien font ${table} × ${n} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
          "On s'appuie sur un produit voisin plus facile, puis on ajuste.",
          table === 9
            ? `${table} × ${n} = 10 × ${n} - ${n} = ${10 * n} - ${n} = ${produit}.`
            : `${table} × ${n} = ${(table - 1) * n} + ${n} = ${produit}, en partant de ${table - 1} × ${n}. On peut aussi écrire ${n} × ${table} : c'est le même résultat.`,
          `${table} × ${n} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Récite la table jusqu'à tomber sur le total.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(2, 10);
      const produit = table * n;
      return {
        text: `Complète : ... × ${table} = ${produit}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre qui manque, c'est parcourir la table à l'envers.",
          "On récite la table de ce nombre jusqu'à tomber sur le total.",
          `Dans la table de ${table}, on cherche ${produit} : ${n} × ${table} = ${produit}. Le nombre qui manque est ${n}.`,
          `Il manque ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_SENS — groupes égaux et rangées
     Ce que la multiplication RACONTE : des paquets tous
     pareils, ou un quadrillage de rangées.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul remplace 6 + 6 + 6 + 6 ?",
    format: "qcm",
    choices: ["4 × 6", "6 × 6", "4 + 6", "6 - 4"],
    expected: ["4 × 6"],
    comparator: "mcq_exact",
    hint: "Compte combien de fois le 6 est écrit.",
    explanation: exp(
      "Une multiplication remplace une addition de nombres tous égaux.",
      "On compte combien de fois le nombre est répété.",
      "Le 6 est écrit 4 fois : cela s'écrit 4 × 6, et vaut 24. On n'écrit pas 6 × 6, qui voudrait dire six paquets de six.",
      "C'est 4 × 6.",
    ),
    tags: ["ce2", "multiplication", "sens", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "reunion",
    text: "Dans un champ, la canne est plantée en 8 rangées de 7 pieds. Un élève dit qu'il y a autant de pieds que dans 7 rangées de 8. A-t-il raison ?",
    format: "qcm",
    choices: [
      "oui, il y a 56 pieds dans les deux cas",
      "non, 8 rangées c'est plus",
      "non, 7 rangées c'est plus",
      "on ne peut pas savoir",
    ],
    expected: ["oui, il y a 56 pieds dans les deux cas"],
    comparator: "mcq_exact",
    hint: "Fais tourner le champ d'un quart de tour : que changerait-il ?",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On imagine le champ vu de l'autre côté : les rangées deviennent des colonnes.",
      "8 × 7 = 56 et 7 × 8 = 56. C'est le même champ regardé dans l'autre sens : le nombre de pieds ne bouge pas.",
      "Oui : 56 pieds dans les deux cas.",
    ),
    tags: ["ce2", "multiplication", "sens", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on écrire 5 + 5 + 5 + 3 sous la forme d'une multiplication ?",
    format: "qcm",
    choices: [
      "non, les nombres ne sont pas tous égaux",
      "oui, cela fait 4 × 5",
      "oui, cela fait 3 × 5",
      "oui, cela fait 4 × 3",
    ],
    expected: ["non, les nombres ne sont pas tous égaux"],
    comparator: "mcq_exact",
    hint: "La multiplication ne remplace que des paquets tous pareils.",
    explanation: exp(
      "Une multiplication ne remplace une addition que si tous les nombres sont égaux.",
      "On vérifie d'abord que les paquets ont tous la même taille.",
      "Ici il y a trois 5 et un 3 : les paquets ne sont pas pareils. On peut écrire 3 × 5 + 3, mais pas une seule multiplication.",
      "Non, les nombres ne sont pas tous égaux.",
    ),
    tags: ["ce2", "multiplication", "sens", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de paquets, et combien dans chaque paquet ?",
    tags: ["ce2", "multiplication", "sens", "template"],
    generate: () => {
      const paquets = randomInt(3, 8);
      const parPaquet = randomInt(3, 9);
      const total = paquets * parPaquet;
      const objet = randomChoice([
        { nom: "billes", contenant: "sachets" },
        { nom: "letchis", contenant: "barquettes" },
        { nom: "crayons", contenant: "trousses" },
        { nom: "bouchons", contenant: "boîtes" },
      ]);
      return {
        text: `Il y a ${paquets} ${objet.contenant} de ${parPaquet} ${objet.nom}. Combien de ${objet.nom} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des paquets contiennent tous la même chose, on multiplie au lieu d'additionner.",
          "On multiplie le nombre de paquets par ce que chacun contient.",
          `${paquets} × ${parPaquet} = ${total}. C'est plus court que d'écrire ${parPaquet} ${paquets} fois de suite.`,
          `Il y a ${total} ${objet.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est répété.",
    tags: ["ce2", "multiplication", "sens", "template"],
    generate: () => {
      const n = randomInt(3, 9);
      const fois = randomInt(3, 6);
      const somme = Array(fois).fill(n).join(" + ");
      return {
        text: `Quel calcul remplace ${somme} ?`,
        format: "qcm",
        // ⚠️ Quand `fois` vaut `n`, deux des pièges retombent sur la bonne
        // réponse et disparaissent au tri : on en écrit assez pour qu'il en
        // reste toujours trois.
        choices: makeChoices(`${fois} × ${n}`, [
          `${n} × ${n}`,
          `${fois} + ${n}`,
          `${fois} × ${fois}`,
          `${n} - ${fois}`,
          `${fois + 1} × ${n}`,
        ]),
        expected: [`${fois} × ${n}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une multiplication remplace une addition de nombres tous égaux.",
          "On compte combien de fois le nombre est répété : c'est le premier facteur.",
          `Le ${n} est écrit ${fois} fois : cela s'écrit ${fois} × ${n}, et vaut ${fois * n}.`,
          `C'est ${fois} × ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_POSEE — poser par un nombre à un chiffre
     Le piège : la retenue qu'on oublie d'ajouter.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser 24 × 3, par quel chiffre commence-t-on ?",
    format: "qcm",
    choices: [
      "par les unités, le 4",
      "par les dizaines, le 2",
      "par le 3",
      "peu importe",
    ],
    expected: ["par les unités, le 4"],
    comparator: "mcq_exact",
    hint: "Comme dans l'addition posée : on part de la droite.",
    explanation: exp(
      "Dans une multiplication posée, on commence toujours par les unités, à droite.",
      "On multiplie chaque chiffre en partant de la droite, en gardant la retenue pour le rang suivant.",
      "3 × 4 = 12 : on écrit 2 et on retient 1. Puis 3 × 2 = 6, plus la retenue 1, égale 7. Résultat : 72. En commençant par la gauche, on ne saurait pas où mettre la retenue.",
      "On commence par les unités.",
    ),
    tags: ["ce2", "multiplication", "posee", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 27 × 4. Il calcule 4 × 7 = 28, écrit 8, puis fait 4 × 2 = 8 et écrit 88. Où s'est-il trompé ?",
    format: "qcm",
    choices: [
      "il a oublié d'ajouter la retenue 2",
      "il a oublié d'ajouter la retenue 8",
      "il fallait commencer par le 2",
      "il n'y a pas d'erreur",
    ],
    expected: ["il a oublié d'ajouter la retenue 2"],
    comparator: "mcq_exact",
    hint: "4 × 7 = 28 : le 8 s'écrit, mais le 2 ?",
    explanation: exp(
      "Quand un produit dépasse 9, le chiffre des dizaines est une retenue : il rejoint le rang suivant.",
      "On écrit les unités du produit, on garde les dizaines en retenue, et on les ajoute au produit suivant.",
      "4 × 7 = 28 : il écrit 8 et retient 2. Ensuite 4 × 2 = 8, PLUS la retenue 2, donc 10. Le résultat est 108, pas 88.",
      "Il a oublié d'ajouter la retenue 2.",
    ),
    tags: ["ce2", "multiplication", "posee", "piege", "qcm", "canvas"],
    canvas: calculPose({
      operation: "multiplication",
      numbers: ["27", "4"],
      result: "108",
      retenues: ["2"],
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 123 × 3 ?",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Aucun produit ne dépasse 9 : aucune retenue.",
    explanation: exp(
      "On multiplie chaque chiffre par le nombre, en partant des unités.",
      "On avance de droite à gauche et on note la retenue quand un produit dépasse 9.",
      "3 × 3 = 9, 3 × 2 = 6, 3 × 1 = 3. Aucun produit ne dépasse 9 : il n'y a pas de retenue. Le résultat est 369.",
      "123 × 3 = 369.",
    ),
    tags: ["ce2", "multiplication", "posee"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par les unités et surveille la retenue.",
    tags: ["ce2", "multiplication", "posee", "template", "canvas"],
    generate: () => {
      const a = randomInt(13, 98);
      const b = randomInt(3, 9);
      const produit = a * b;
      const unites = a % 10;
      const dizaines = Math.floor(a / 10);
      const retenue = Math.floor((unites * b) / 10);
      return {
        text: `Combien font ${a} × ${b} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie chaque chiffre en partant des unités, et le chiffre des dizaines d'un produit devient une retenue.",
          "On écrit les unités du produit, on garde les dizaines, on les ajoute au produit suivant.",
          retenue > 0
            ? `${b} × ${unites} = ${b * unites} : on écrit ${(b * unites) % 10} et on retient ${retenue}. Puis ${b} × ${dizaines} = ${b * dizaines}, plus la retenue ${retenue}, égale ${b * dizaines + retenue}. Résultat : ${produit}.`
            : `${b} × ${unites} = ${b * unites}, pas de retenue. Puis ${b} × ${dizaines} = ${b * dizaines}. Résultat : ${produit}.`,
          `${a} × ${b} = ${produit}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "reunion",
    hint: "Un seul paquet, puis autant de paquets : c'est une multiplication.",
    tags: ["ce2", "multiplication", "posee", "reunion", "template"],
    generate: () => {
      const parBoite = randomInt(24, 96);
      const boites = randomInt(3, 8);
      const total = parBoite * boites;
      const contexte = randomChoice([
        { quoi: "letchis", ou: "à la coopérative de Saint-Joseph", contenant: "barquettes" },
        { quoi: "bouchons", ou: "au snack du Tampon", contenant: "boîtes" },
        { quoi: "cahiers", ou: "à la papeterie de Saint-Louis", contenant: "cartons" },
      ]);
      return {
        text: `${contexte.ou.charAt(0).toUpperCase() + contexte.ou.slice(1)}, on range ${parBoite} ${contexte.quoi} dans chaque ${contexte.contenant.replace(/s$/, "")}. Combien de ${contexte.quoi} dans ${boites} ${contexte.contenant} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des contenants reçoivent tous la même quantité, on multiplie.",
          "On pose la multiplication et on commence par les unités, en surveillant la retenue.",
          `${parBoite} × ${boites} = ${total}.`,
          `Il y a ${total} ${contexte.quoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_10_100 — multiplier par 10 ou par 100
     ⚠️ On refuse la recette « on ajoute un zéro ». Ce qui se
     passe, c'est que chaque chiffre MONTE d'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on multiplie un nombre entier par 10, que deviennent ses unités ?",
    format: "qcm",
    choices: [
      "elles deviennent des dizaines",
      "elles deviennent des centaines",
      "elles disparaissent",
      "elles ne changent pas",
    ],
    expected: ["elles deviennent des dizaines"],
    comparator: "mcq_exact",
    hint: "10 fois plus grand, c'est un rang plus haut.",
    explanation: exp(
      "Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'un rang.",
      "On fait glisser tous les chiffres d'une place vers la gauche, et un zéro vient occuper les unités.",
      "3 × 10 = 30 : les 3 unités sont devenues 3 dizaines. Le zéro n'est pas « ajouté », il remplit la place des unités laissée vide.",
      "Les unités deviennent des dizaines.",
    ),
    tags: ["ce2", "multiplication", "par_10", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 47 × 100 ?",
    format: "short",
    expected: ["4700"],
    comparator: "number_equal",
    hint: "Chaque chiffre monte de DEUX rangs.",
    explanation: exp(
      "Multiplier par 100, c'est faire monter chaque chiffre de deux rangs.",
      "Les unités deviennent des centaines, les dizaines des milliers, et deux zéros occupent les places libérées.",
      "Les 7 unités deviennent 7 centaines et les 4 dizaines deviennent 4 milliers : 4700.",
      "47 × 100 = 4700.",
    ),
    tags: ["ce2", "multiplication", "par_100"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 10 × 10 ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Dix dizaines, cela porte un nom.",
    explanation: exp(
      "Multiplier par 10 fait monter chaque chiffre d'un rang.",
      "On applique la règle à 10 : son 1 est une dizaine, il devient une centaine.",
      "10 × 10 = 100. Dix paquets de dix font cent : c'est ce que montre une plaque de cent carreaux, dix rangées de dix.",
      "10 × 10 = 100.",
    ),
    tags: ["ce2", "multiplication", "par_10", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque chiffre monte d'un rang par 10, de deux rangs par 100.",
    tags: ["ce2", "multiplication", "par_10", "template"],
    generate: () => {
      const facteur = randomChoice([10, 100]);
      const n = facteur === 100 ? randomInt(2, 99) : randomInt(2, 999);
      const produit = n * facteur;
      return {
        text: `Combien font ${n} × ${facteur} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          `Multiplier par ${facteur}, c'est faire monter chaque chiffre de ${facteur === 10 ? "un rang" : "deux rangs"}.`,
          "On fait glisser les chiffres vers la gauche, et les places libérées sont occupées par des zéros.",
          `Les ${n % 10} unités de ${n} deviennent ${n % 10} ${facteur === 10 ? "dizaines" : "centaines"}, et ainsi de suite : ${n} × ${facteur} = ${produit}.`,
          `${n} × ${facteur} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de rangs les chiffres ont-ils monté ?",
    tags: ["ce2", "multiplication", "par_10", "template"],
    generate: () => {
      const facteur = randomChoice([10, 100]);
      const n = facteur === 100 ? randomInt(2, 99) : randomInt(2, 999);
      const produit = n * facteur;
      return {
        text: `Par combien faut-il multiplier ${n} pour obtenir ${produit} ?`,
        format: "short",
        expected: [String(facteur)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10 fait monter les chiffres d'un rang, par 100 de deux rangs.",
          "On compare les deux écritures et on compte les rangs gagnés.",
          `De ${n} à ${produit}, les chiffres ont monté de ${facteur === 10 ? "un rang" : "deux rangs"} : on a multiplié par ${facteur}.`,
          `Il faut multiplier par ${facteur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Lequel est le plus grand : 25 × 4 ou 24 × 5 ?",
    format: "qcm",
    choices: ["24 × 5", "25 × 4", "ils sont égaux", "on ne peut pas savoir"],
    expected: ["24 × 5"],
    comparator: "mcq_exact",
    hint: "25 × 4, c'est un repère : quatre pièces de 25 centimes font 1 euro.",
    explanation: exp(
      "Enlever 1 à un facteur et l'ajouter à l'autre ne redonne pas le même produit.",
      "On calcule chacun des deux avec un appui connu, puis on compare.",
      "25 × 4 = 100 : c'est le repère des quatre pièces de 25 centimes. Et 24 × 5 = 120, car 24 × 5 vaut la moitié de 24 × 10 = 240. On compare 100 et 120.",
      "Le plus grand est 24 × 5.",
    ),
    tags: ["ce2", "multiplication", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une classe de 24 élèves part en sortie. Chaque élève emporte 2 bouteilles de 50 cL. Combien de litres d'eau la classe emporte-t-elle ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Deux bouteilles de 50 cL, cela fait combien par élève ?",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce que porte un élève.",
      "On calcule la quantité par élève, puis on multiplie par le nombre d'élèves.",
      "2 × 50 cL = 100 cL, soit 1 L par élève. Puis 24 × 1 = 24 litres.",
      "La classe emporte 24 litres.",
    ),
    tags: ["ce2", "multiplication", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche d'abord le contenu d'un seul rang.",
    tags: ["ce2", "multiplication", "defi", "template"],
    generate: () => {
      const rangees = randomInt(4, 9);
      const parRangee = randomInt(4, 9);
      const boites = randomInt(2, 5);
      const total = rangees * parRangee * boites;
      return {
        text: `Dans une boîte, les œufs sont rangés en ${rangees} rangées de ${parRangee}. Combien d'œufs dans ${boites} boîtes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : d'abord une boîte, ensuite toutes les boîtes.",
          "On multiplie les rangées par leur contenu, puis le résultat par le nombre de boîtes.",
          `Une boîte contient ${rangees} × ${parRangee} = ${rangees * parRangee} œufs. Pour ${boites} boîtes : ${rangees * parRangee} × ${boites} = ${total}.`,
          `Il y a ${total} œufs.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Décompose : le nombre rond d'abord, le reste ensuite.",
    tags: ["ce2", "multiplication", "defi", "template"],
    generate: () => {
      const n = randomInt(11, 19);
      const b = randomInt(3, 9);
      const produit = n * b;
      return {
        text: `Pour calculer ${n} × ${b} de tête, on décompose ${n} en 10 + ${n - 10}. Combien font ${n} × ${b} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre décomposé se multiplie morceau par morceau, puis on rassemble.",
          "On multiplie chaque morceau par le même nombre, puis on additionne les deux résultats.",
          `10 × ${b} = ${10 * b}, et ${n - 10} × ${b} = ${(n - 10) * b}. On additionne : ${10 * b} + ${(n - 10) * b} = ${produit}.`,
          `${n} × ${b} = ${produit}.`,
        ),
      };
    },
  },
];
