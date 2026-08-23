// ─── Les fractions supérieures à 1 (CM2) ───────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Trois objectifs du programme de
// CM2 n'avaient AUCUNE micro, et ils forment un seul sujet :
//   · « Écrire une fraction supérieure à 1 comme la somme d'un entier et d'une
//     fraction inférieure à 1. »            [cm2-N-fractions-2]
//   · « Écrire la somme d'un entier et d'une fraction inférieure à 1 comme une
//     unique fraction. »                    [cm2-N-fractions-3]
//   · « Encadrer une fraction entre deux nombres entiers consécutifs. »
//                                           [cm2-N-fractions-4]
//
// ⚠️ ET C'EST URGENT : le programme de CM2 entre en vigueur à la rentrée de
// septembre 2026 (arrêté du 10 avril 2025, article 3). Le CM1 et la 6e, eux,
// l'appliquent depuis un an.
//
// ⭐ TOUT REPOSE SUR UNE SEULE RELATION : d/d = 1. Sept septièmes font un
// entier, huit huitièmes font un entier. Une fois cela vu, l'élève ne « convertit »
// plus rien — il compte combien d'entiers tiennent dans sa fraction. Le document
// « Exemples de réussite CM2 » (p. 3) le montre exactement ainsi :
//   58/7 = 56/7 + 2/7 = 8 + 2/7, en s'appuyant sur 7/7 = 1 et la table de 7 ;
//   43/8 = 5 × 8/8 + 3/8 = 5 + 3/8, donc 5 < 43/8 < 6.
// C'est la table de multiplication qui fait le travail, pas une règle nouvelle.
//
// ⚠️ L'OBSTACLE EST UNE CROYANCE : « une fraction, c'est plus petit que 1 »,
// vraie depuis le CE1 tant qu'on partageait une pizza. Une fraction supérieure à
// 1 ne se dessine pas sur un disque — il en faudrait deux. Elle se voit sur une
// DEMI-DROITE, où elle a simplement une place plus loin. Les figures de cette
// banque sont donc des droites graduées, pas des parts.
//
// ⛔ PAS DE QUESTION OUVERTE AU PRIMAIRE (règle du projet) : les items de
// raisonnement sont posés en QCM, avec la méthode dans les propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** La bonne réponse est mise de côté, puis trois pièges distincts sont tirés. */
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/**
 * La demi-droite graduée — la seule figure qui montre une fraction PLUS GRANDE
 * QUE 1. Sur un disque partagé, il en faudrait deux ; ici, elle a juste une
 * place plus loin.
 *
 * ⚠️ `DroiteGradueeCanvas` étiquette TOUTES ses graduations et son SVG est
 * enfermé dans un `max-w-[320px]` : au-delà de cinq ou six, les valeurs se
 * chevauchent. On gradue donc à l'entier et on place le point entre deux.
 */
function droite(max: number, points: { value: number; label?: string }[]) {
  return {
    kind: "number_line" as const,
    min: 0,
    max,
    step: 1,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 130 },
  };
}

export const fractionsSuperieuresBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_MIXTE_ECRIRE — de la fraction vers « entier + fraction »
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de quarts faut-il pour faire 1 entier ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un entier partagé en quarts, cela fait combien de parts ?",
    explanation: exp(
      "un entier partagé en quarts contient exactement 4 quarts.",
      "on lit le dénominateur : il dit en combien de parts l'entier est partagé.",
      "4 quarts font 1 entier : on écrit 4/4 = 1. De la même façon, 7/7 = 1 et 8/8 = 1. C'est LA relation qui sert dans tout le chapitre.",
      "il faut 4 quarts pour faire 1 entier."
    ),
    tags: ["fraction_mixte", "ecrire", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7/4 = 1 + …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Retire d'abord les 4 quarts qui font 1 entier.",
    explanation: exp(
      "une fraction supérieure à 1 peut s'écrire comme un entier suivi d'une fraction plus petite que 1.",
      "on retire du numérateur autant de fois le dénominateur qu'on le peut.",
      "Il faut 4 quarts pour faire 1 entier. Dans 7 quarts, on en prend 4 qui font 1 entier, et il en reste 7 − 4 = 3. On écrit donc 7/4 = 4/4 + 3/4 = 1 + 3/4, ce qui se lit « un et trois quarts ».",
      "le numérateur manquant est 3."
    ),
    tags: ["fraction_mixte", "ecrire", "canvas", "short"],
    canvas: droite(2, [{ value: 1.75, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 4,
    theme: "neutral",
    text: "On veut écrire 58/7 sous la forme « un entier + une fraction ». Quel entier obtient-on ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Dans la table de 7, quel est le plus grand résultat qui ne dépasse pas 58 ?",
    explanation: exp(
      "une fraction supérieure à 1 contient un certain nombre d'entiers, plus un reste.",
      "on cherche dans la table du dénominateur le plus grand résultat qui ne dépasse pas le numérateur.",
      "Il faut 7 septièmes pour faire 1 entier. Dans la table de 7 : 7 × 8 = 56, et 7 × 9 = 63 qui dépasse 58. On garde donc 56/7 = 8 entiers, et il reste 58 − 56 = 2 septièmes. Ainsi 58/7 = 56/7 + 2/7 = 8 + 2/7.",
      "l'entier obtenu est 8."
    ),
    tags: ["fraction_mixte", "ecrire", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Une fraction peut-elle être plus grande que 1 ?",
    format: "qcm",
    choices: [
      "oui, quand son numérateur est plus grand que son dénominateur",
      "non, une fraction est toujours plus petite que 1",
      "oui, mais seulement si son dénominateur vaut 1",
      "non, sauf si on l'écrit avec une virgule",
    ],
    expected: ["oui, quand son numérateur est plus grand que son dénominateur"],
    comparator: "mcq_exact",
    hint: "Compare 7 et 4 dans la fraction 7/4.",
    explanation: exp(
      "une fraction vaut 1 quand son numérateur est égal à son dénominateur.",
      "on compare le numérateur au dénominateur.",
      "Dans 7/4, le numérateur 7 dépasse le dénominateur 4 : la fraction dépasse donc 4/4 = 1. Croire qu'une fraction est toujours plus petite que 1 vient des parts de gâteau, où l'on ne prend jamais plus que le gâteau entier. Mais rien ne l'interdit : 7 quarts, c'est simplement plus d'un gâteau.",
      "oui, dès que le numérateur dépasse le dénominateur."
    ),
    tags: ["fraction_mixte", "ecrire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cm2_fraction_mixte_ecrire_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois le dénominateur tient-il dans le numérateur ?",
    tags: ["fraction_mixte", "ecrire", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5, 6, 8]);
      const entier = randomInt(2, 6);
      const reste = randomInt(1, denominateur - 1);
      const numerateur = entier * denominateur + reste;
      return {
        text: `Complète : ${numerateur}/${denominateur} = ${entier} + …/${denominateur}. Quel numérateur manque ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "une fraction supérieure à 1 s'écrit comme un entier suivi d'une fraction plus petite que 1.",
          "on cherche dans la table du dénominateur le plus grand résultat qui ne dépasse pas le numérateur.",
          `Il faut ${denominateur} parts pour faire 1 entier. Dans la table de ${denominateur} : ${denominateur} × ${entier} = ${entier * denominateur}, et il reste ${numerateur} − ${entier * denominateur} = ${reste}. Donc ${numerateur}/${denominateur} = ${entier * denominateur}/${denominateur} + ${reste}/${denominateur} = ${entier} + ${reste}/${denominateur}.`,
          `le numérateur manquant est ${reste}.`
        ),
        canvas: droite(entier + 2, [
          { value: Number((numerateur / denominateur).toFixed(4)), label: "A" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_mixte_ecrire_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur ne change jamais : c'est l'unité dans laquelle on compte.",
    tags: ["fraction_mixte", "ecrire", "piege", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5, 6]);
      const entier = randomInt(2, 5);
      const reste = randomInt(1, denominateur - 1);
      const numerateur = entier * denominateur + reste;
      const bonne = `${entier} + ${reste}/${denominateur}`;
      return {
        text: `Quelle est l'écriture correcte de ${numerateur}/${denominateur} sous la forme « un entier + une fraction » ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${reste} + ${entier}/${denominateur}`,
          `${entier} + ${reste}/${numerateur}`,
          `${entier + 1} + ${reste}/${denominateur}`,
          `${entier} + ${denominateur}/${reste}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "l'entier compte les paquets complets, le reste garde le MÊME dénominateur.",
          "on retire les entiers, on garde le reste sur le dénominateur de départ.",
          `${denominateur} × ${entier} = ${entier * denominateur}, il reste ${reste}. Donc ${numerateur}/${denominateur} = ${entier} + ${reste}/${denominateur}. Le dénominateur ne change pas : il dit dans quelle unité on compte, et on compte toujours en ${denominateur}èmes. Échanger l'entier et le reste, ou changer le dénominateur, donne un tout autre nombre.`,
          `${numerateur}/${denominateur} = ${bonne}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_MIXTE_REGROUPER — de « entier + fraction » vers une seule fraction
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3 sous forme de quarts : 3 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque entier vaut 4 quarts.",
    explanation: exp(
      "tout entier peut s'écrire en fractions, en comptant combien de parts il contient.",
      "on multiplie le nombre d'entiers par le dénominateur.",
      "1 entier vaut 4 quarts, donc 3 entiers valent 3 × 4 = 12 quarts. On écrit 3 = 12/4.",
      "le numérateur manquant est 12."
    ),
    tags: ["fraction_mixte", "regrouper", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3 + 1/4 sous la forme d'une seule fraction : 3 + 1/4 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Transforme d'abord les 3 entiers en quarts, puis ajoute.",
    explanation: exp(
      "pour réunir un entier et une fraction en une seule fraction, on écrit d'abord l'entier dans la même unité.",
      "on convertit l'entier en fractions, puis on ajoute les numérateurs.",
      "3 entiers valent 3 × 4 = 12 quarts, soit 12/4. On ajoute le quart restant : 12/4 + 1/4 = 13/4. Le dénominateur ne bouge pas — on additionne des quarts avec des quarts.",
      "3 + 1/4 = 13/4."
    ),
    tags: ["fraction_mixte", "regrouper", "canvas", "short"],
    canvas: droite(4, [{ value: 3.25, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi le dénominateur ne change-t-il pas quand on écrit 2 + 3/5 sous la forme 13/5 ?",
    format: "qcm",
    choices: [
      "parce qu'on compte tout en cinquièmes, avant comme après",
      "parce que 5 est un nombre premier",
      "parce qu'on n'a pas le droit de changer un dénominateur",
      "parce que 2 et 3 sont plus petits que 5",
    ],
    expected: ["parce qu'on compte tout en cinquièmes, avant comme après"],
    comparator: "mcq_exact",
    hint: "Que compte-t-on, dans 13/5 ?",
    explanation: exp(
      "le dénominateur indique l'unité dans laquelle on compte.",
      "on vérifie qu'avant et après, on compte bien la même chose.",
      "2 entiers valent 10 cinquièmes, auxquels on ajoute 3 cinquièmes : 13 cinquièmes en tout. Avant comme après, on compte des CINQUIÈMES — seule leur quantité change. C'est pour cela que le dénominateur reste 5.",
      "le dénominateur est l'unité de comptage, il ne change pas."
    ),
    tags: ["fraction_mixte", "regrouper", "qcm"],
  },
  {
    kind: "template",
    id: "cm2_fraction_mixte_regrouper_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis l'entier, puis ajoute les numérateurs.",
    tags: ["fraction_mixte", "regrouper", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5, 6, 8]);
      const entier = randomInt(2, 6);
      const reste = randomInt(1, denominateur - 1);
      const numerateur = entier * denominateur + reste;
      return {
        text: `Écris ${entier} + ${reste}/${denominateur} sous la forme d'une seule fraction : ${entier} + ${reste}/${denominateur} = …/${denominateur}. Quel numérateur manque ?`,
        format: "short",
        expected: [String(numerateur)],
        comparator: "number_equal",
        explanation: exp(
          "on écrit l'entier dans la même unité que la fraction, puis on réunit.",
          "on multiplie l'entier par le dénominateur, puis on ajoute le numérateur restant.",
          `${entier} entiers valent ${entier} × ${denominateur} = ${entier * denominateur} parts, soit ${entier * denominateur}/${denominateur}. On ajoute les ${reste} parts restantes : ${entier * denominateur}/${denominateur} + ${reste}/${denominateur} = ${numerateur}/${denominateur}.`,
          `${entier} + ${reste}/${denominateur} = ${numerateur}/${denominateur}.`
        ),
        canvas: droite(entier + 2, [
          { value: Number((numerateur / denominateur).toFixed(4)), label: "A" },
        ]),
      };
    },
  },

  // =========================
  // FRACTION_ENCADRER — entre deux entiers consécutifs
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Entre quels deux entiers qui se suivent se trouve 43/8 ?",
    format: "qcm",
    choices: ["entre 5 et 6", "entre 4 et 5", "entre 8 et 9", "entre 43 et 44"],
    expected: ["entre 5 et 6"],
    comparator: "mcq_exact",
    hint: "Dans la table de 8, quel résultat s'approche le plus de 43 sans le dépasser ?",
    explanation: exp(
      "encadrer une fraction, c'est trouver les deux entiers consécutifs entre lesquels elle se place.",
      "on cherche dans la table du dénominateur les deux résultats qui encadrent le numérateur.",
      "Il faut 8 huitièmes pour faire 1 entier. Or 8 × 5 = 40 et 8 × 6 = 48 : le numérateur 43 est entre les deux. Donc 40/8 < 43/8 < 48/8, c'est-à-dire 5 < 43/8 < 6. En écriture mixte : 43/8 = 5 + 3/8.",
      "43/8 est entre 5 et 6."
    ),
    tags: ["fraction_mixte", "encadrer", "canvas", "qcm"],
    canvas: droite(7, [{ value: 5.375, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 9/2 se trouve entre 9 et 10. Où est son erreur ?",
    format: "qcm",
    choices: [
      "il lit le numérateur comme des unités, alors qu'il compte des demis : 9/2 est entre 4 et 5",
      "il a oublié de simplifier la fraction",
      "il n'y a pas d'erreur, 9/2 est bien entre 9 et 10",
      "il aurait dû regarder le dénominateur 2 : c'est entre 2 et 3",
    ],
    expected: [
      "il lit le numérateur comme des unités, alors qu'il compte des demis : 9/2 est entre 4 et 5",
    ],
    comparator: "mcq_exact",
    hint: "Combien de demis faut-il pour faire un entier ?",
    explanation: exp(
      "le numérateur compte des parts, pas des unités : le dénominateur dit lesquelles.",
      "on convertit en entiers en s'appuyant sur la table du dénominateur.",
      "Il faut 2 demis pour faire 1 entier. Or 2 × 4 = 8 et 2 × 5 = 10 : 9 est entre les deux, donc 9/2 est entre 4 et 5. En écriture mixte, 9/2 = 4 + 1/2. Regarder le 9 et chercher vers 9 est l'erreur la plus fréquente du chapitre — mais neuf demis, cela ne fait que quatre entiers et demi.",
      "9/2 est entre 4 et 5."
    ),
    tags: ["fraction_mixte", "encadrer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est comprise entre 2 et 3 ?",
    format: "qcm",
    choices: ["7/3", "4/3", "10/3", "2/3"],
    expected: ["7/3"],
    comparator: "mcq_exact",
    hint: "Compte les tiers : 6 tiers font 2, et 9 tiers font 3.",
    explanation: exp(
      "une fraction est entre deux entiers quand son numérateur est entre les deux multiples correspondants du dénominateur.",
      "on écrit les entiers en tiers, puis on compare les numérateurs.",
      "2 = 6/3 et 3 = 9/3. Il faut donc un numérateur entre 6 et 9 : c'est 7/3. Les autres se placent ailleurs — 4/3 est entre 1 et 2, 10/3 dépasse 3, et 2/3 est encore sous 1.",
      "7/3 est entre 2 et 3."
    ),
    tags: ["fraction_mixte", "encadrer", "qcm"],
  },
  {
    kind: "template",
    id: "cm2_fraction_encadrer_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les deux multiples du dénominateur qui encadrent le numérateur.",
    tags: ["fraction_mixte", "encadrer", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5, 6, 8]);
      const entier = randomInt(2, 7);
      const reste = randomInt(1, denominateur - 1);
      const numerateur = entier * denominateur + reste;
      const bonne = `entre ${entier} et ${entier + 1}`;
      return {
        text: `Entre quels deux entiers qui se suivent se trouve ${numerateur}/${denominateur} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `entre ${entier - 1} et ${entier}`,
          `entre ${entier + 1} et ${entier + 2}`,
          `entre ${numerateur} et ${numerateur + 1}`,
          `entre ${denominateur} et ${denominateur + 1}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "encadrer une fraction, c'est trouver les deux entiers consécutifs entre lesquels elle se place.",
          "on cherche dans la table du dénominateur les deux résultats qui encadrent le numérateur.",
          `Il faut ${denominateur} parts pour faire 1 entier. Or ${denominateur} × ${entier} = ${entier * denominateur} et ${denominateur} × ${entier + 1} = ${(entier + 1) * denominateur} : le numérateur ${numerateur} est entre les deux. Donc ${entier} < ${numerateur}/${denominateur} < ${entier + 1}. En écriture mixte : ${numerateur}/${denominateur} = ${entier} + ${reste}/${denominateur}.`,
          `${numerateur}/${denominateur} est entre ${entier} et ${entier + 1}.`
        ),
        canvas: droite(entier + 2, [
          { value: Number((numerateur / denominateur).toFixed(4)), label: "A" },
        ]),
      };
    },
  },
];
