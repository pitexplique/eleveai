// ─── Calculer avec les fractions (CM2) ─────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Trois objectifs du programme de
// CM2 n'avaient AUCUNE micro — la banque de fractions savait lire, représenter
// et comparer, mais on n'y CALCULAIT jamais :
//   · « Additionner et soustraire des fractions. »       [cm2-N-fractions-8]
//   · « Calculer le produit d'un entier et d'une fraction. » [cm2-N-fractions-9]
//   · « Déterminer une fraction d'une quantité ou d'une grandeur. »
//                                                        [cm2-N-fractions-10]
//
// ⭐ UN SEUL PRINCIPE PORTE LES TROIS : une fraction est un NOMBRE DE PARTS, et
// le dénominateur dit lesquelles. Trois quarts plus deux quarts font cinq
// quarts, comme trois pommes plus deux pommes font cinq pommes — c'est la
// verbalisation que le BO demande, et elle rend la règle inutile à mémoriser.
// Le dénominateur ne s'additionne jamais : il nomme l'unité, il ne se compte pas.
//
// ⭐ LES BORNES DU BO, ET ON NE LES DÉPASSE PAS. Pour l'addition, les exemples
// de réussite (p. 4) s'arrêtent à deux cas : même dénominateur, puis
// dénominateurs dont l'un est MULTIPLE de l'autre — 3/2 + 7/8, 5/6 − 1/12,
// 11/40 − 1/8. Jamais 1/3 + 1/4, qui demanderait un dénominateur commun
// quelconque : cela relève de la 6e. Aucun item de cette banque n'en propose.
//
// ⭐ LE PRODUIT EST UNE ADDITION ITÉRÉE, pas une règle. Le BO fait verbaliser :
// « trois fois cinq quarts, c'est cinq quarts plus cinq quarts plus cinq quarts,
// cela fait quinze quarts ». 3 × 5/4 = 15/4 — on multiplie le numérateur, le
// dénominateur ne bouge pas, et on VOIT pourquoi.
//
// ⚠️ LA FRACTION D'UNE QUANTITÉ SE FAIT EN DEUX TEMPS, dans cet ordre : on
// partage d'abord (le dénominateur), on prend ensuite (le numérateur). « Pour
// trouver deux tiers de douze œufs, je partage douze en trois parts égales, cela
// fait quatre ; deux tiers, c'est deux fois quatre, cela fait huit. » Diviser
// PUIS multiplier garde des nombres petits — l'ordre inverse marche aussi mais
// fait manipuler 24 avant de retomber sur 8.
//
// ⛔ PAS DE QUESTION OUVERTE AU PRIMAIRE : `applyMathsKeyboardFree` les retire et
// transforme les `short` numériques en QCM cliquables. Les questions de méthode
// sont donc posées en QCM, avec le raisonnement dans les propositions.

import type { TutorBankItemV4, SchemaBarreCanvasData } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Le schéma en barres du BO : la quantité partagée, une part mise en avant. */
function barres(total: string, parts: { label: string; value?: string; unknown?: boolean }[], question: string): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    questionLabel: question,
    size: { width: 330, height: 180 },
  };
}

/** Une barre partagée en `parts` morceaux dont `prises` sont demandées. */
function barrePartage(totalLabel: string, parts: number, prises: number, question: string) {
  return barres(
    totalLabel,
    Array.from({ length: parts }, (_, i) => ({
      label: i < prises ? "?" : "",
      unknown: i < prises,
    })),
    question
  );
}

export const fractionsCalculCm2Bank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_ADDITIONNER — additionner et soustraire
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 3/8 + 2/8 = …/8. Quel numérateur manque ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Trois huitièmes plus deux huitièmes, cela fait combien de huitièmes ?",
    explanation: exp(
      "on additionne des fractions comme on additionne des objets de même nature : trois pommes plus deux pommes font cinq pommes.",
      "quand le dénominateur est le même, on additionne les numérateurs et on garde le dénominateur.",
      "3 huitièmes + 2 huitièmes = 5 huitièmes, donc 3/8 + 2/8 = 5/8. Le dénominateur ne s'additionne pas : il NOMME l'unité, il ne se compte pas. Écrire 5/16 reviendrait à dire que les parts ont changé de taille en cours de route.",
      "3/8 + 2/8 = 5/8."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 3/8 + 2/8 fait-il 5/8, et non 5/16 ?",
    format: "qcm",
    choices: [
      "parce que le dénominateur dit la taille des parts : elle ne change pas quand on en ajoute",
      "parce qu'on n'a pas le droit d'additionner deux dénominateurs identiques",
      "parce que 16 est trop grand pour un résultat",
      "parce qu'il faudrait simplifier 5/16 en 5/8",
    ],
    expected: [
      "parce que le dénominateur dit la taille des parts : elle ne change pas quand on en ajoute",
    ],
    comparator: "mcq_exact",
    hint: "Si tu ajoutes des huitièmes à des huitièmes, obtiens-tu des seizièmes ?",
    explanation: exp(
      "le dénominateur nomme l'unité dans laquelle on compte ; le numérateur compte.",
      "on vérifie qu'avant et après le calcul, on compte bien la même chose.",
      "On ajoute 2 huitièmes à 3 huitièmes : le résultat est en huitièmes, comme les deux nombres de départ. Seule la QUANTITÉ de parts change, pas leur taille. Répondre 5/16 reviendrait à dire que les parts sont devenues deux fois plus petites parce qu'on en a ajouté — ce qui n'a pas de sens.",
      "on additionne les numérateurs, jamais les dénominateurs."
    ),
    tags: ["fraction_calcul", "additionner", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer 3/2 + 7/8, on réécrit d'abord 3/2 en huitièmes. Combien vaut 3/2 en huitièmes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Un demi vaut 4 huitièmes.",
    explanation: exp(
      "pour additionner deux fractions de dénominateurs différents, on les ramène d'abord à la même unité.",
      "quand un dénominateur est un multiple de l'autre, on réécrit la plus grosse part dans la plus petite.",
      "8 est le quadruple de 2, donc 1 demi vaut 4 huitièmes. On multiplie donc les deux termes par 4 : 3/2 = 12/8. Le calcul devient 12/8 + 7/8 = 19/8, tout en huitièmes.",
      "3/2 vaut 12/8."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 5/6 − 1/12 = …/12. Quel numérateur manque ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Écris d'abord 5/6 en douzièmes : 12 est le double de 6.",
    explanation: exp(
      "on soustrait des fractions comme on les additionne : après les avoir ramenées à la même unité.",
      "on réécrit la fraction au plus gros dénominateur, puis on soustrait les numérateurs.",
      "12 est le double de 6, donc 5/6 = 10/12. Le calcul devient 10/12 − 1/12 = 9/12. On compte en douzièmes du début à la fin.",
      "5/6 − 1/12 = 9/12."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "template",
    id: "cm2_fraction_additionner_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Même dénominateur : on additionne seulement les numérateurs.",
    tags: ["fraction_calcul", "additionner", "template"],
    generate: () => {
      const denominateur = randomChoice([4, 5, 6, 8, 9, 10, 12]);
      const a = randomInt(1, denominateur - 2);
      const b = randomInt(1, denominateur - a - 1);
      const plus = Math.random() < 0.6;
      const gauche = plus ? a : a + b;
      const resultat = plus ? a + b : a;
      return {
        text: plus
          ? `Calcule : ${gauche}/${denominateur} + ${b}/${denominateur} = …/${denominateur}. Quel numérateur manque ?`
          : `Calcule : ${gauche}/${denominateur} − ${b}/${denominateur} = …/${denominateur}. Quel numérateur manque ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "on compte des parts de même taille : le dénominateur nomme l'unité, le numérateur compte.",
          "à dénominateur identique, on calcule sur les numérateurs et on garde le dénominateur.",
          plus
            ? `${gauche} parts + ${b} parts = ${resultat} parts, toutes en ${denominateur}èmes : ${gauche}/${denominateur} + ${b}/${denominateur} = ${resultat}/${denominateur}.`
            : `${gauche} parts − ${b} parts = ${resultat} parts, toutes en ${denominateur}èmes : ${gauche}/${denominateur} − ${b}/${denominateur} = ${resultat}/${denominateur}.`,
          `le numérateur manquant est ${resultat}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_additionner_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Un dénominateur est un multiple de l'autre : ramène tout au plus grand.",
    tags: ["fraction_calcul", "additionner", "template"],
    generate: () => {
      // ⛔ UN DÉNOMINATEUR MULTIPLE DE L'AUTRE, jamais deux quelconques : le BO
      // s'arrête là au CM2, le cas général relève de la 6e.
      const petit = randomChoice([2, 3, 4, 5, 6]);
      const facteur = randomInt(2, 4);
      const grand = petit * facteur;
      const numPetit = randomInt(1, petit - 1 || 1);
      const converti = numPetit * facteur;
      return {
        text: `Pour calculer ${numPetit}/${petit} + 1/${grand}, on réécrit d'abord ${numPetit}/${petit} en ${grand}èmes. Quel numérateur obtient-on ?`,
        format: "short",
        expected: [String(converti)],
        comparator: "number_equal",
        explanation: exp(
          "pour additionner deux fractions, il faut d'abord compter dans la même unité.",
          "quand un dénominateur est un multiple de l'autre, on multiplie les DEUX termes de la plus grosse fraction par le même nombre.",
          `${grand} est ${facteur} fois ${petit}, donc chaque ${petit}ème vaut ${facteur} ${grand}èmes. On multiplie donc les deux termes par ${facteur} : ${numPetit}/${petit} = ${converti}/${grand}. Le calcul devient ${converti}/${grand} + 1/${grand} = ${converti + 1}/${grand}.`,
          `${numPetit}/${petit} vaut ${converti}/${grand}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_PRODUIT_ENTIER — le produit d'un entier et d'une fraction
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 3 × 5/4 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Trois fois cinq quarts, cela fait combien de quarts ?",
    explanation: exp(
      "multiplier une fraction par un entier, c'est l'additionner plusieurs fois avec elle-même.",
      "on multiplie le numérateur par l'entier ; le dénominateur ne bouge pas.",
      "3 × 5/4, c'est 5/4 + 5/4 + 5/4 : cinq quarts plus cinq quarts plus cinq quarts, cela fait quinze quarts. Donc 3 × 5/4 = 15/4. On a trois fois plus de PARTS, mais les parts ont toujours la même taille — d'où un dénominateur inchangé.",
      "3 × 5/4 = 15/4."
    ),
    tags: ["fraction_calcul", "produit", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Dans 4 × 2/5, que devient le dénominateur 5 ?",
    format: "qcm",
    choices: [
      "il ne change pas : les parts gardent la même taille, il y en a seulement quatre fois plus",
      "il est multiplié par 4, comme le numérateur",
      "il devient 20, car 4 × 5 = 20",
      "il disparaît, le résultat est un entier",
    ],
    expected: [
      "il ne change pas : les parts gardent la même taille, il y en a seulement quatre fois plus",
    ],
    comparator: "mcq_exact",
    hint: "Quatre fois deux cinquièmes, ce sont toujours des cinquièmes.",
    explanation: exp(
      "le dénominateur dit la taille des parts, le numérateur en dit le nombre.",
      "on écrit la multiplication comme une addition répétée et on regarde ce qui change.",
      "4 × 2/5 = 2/5 + 2/5 + 2/5 + 2/5 = 8/5. On compte des cinquièmes du début à la fin : seul leur NOMBRE est multiplié par 4. Multiplier aussi le dénominateur donnerait 8/20, c'est-à-dire 2/5 — le même nombre qu'au départ, alors qu'on vient de le quadrupler.",
      "le dénominateur reste 5."
    ),
    tags: ["fraction_calcul", "produit", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 6 × 1/3. Le résultat est un nombre entier. Lequel ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Six tiers, cela fait combien d'entiers ?",
    explanation: exp(
      "un produit d'entier par une fraction peut retomber sur un entier.",
      "on multiplie le numérateur, puis on regarde combien d'entiers contient le résultat.",
      "6 × 1/3 = 6/3. Or il faut 3 tiers pour faire 1 entier, et 6 = 2 × 3 : donc 6/3 = 2. Six tiers font exactement deux entiers.",
      "6 × 1/3 = 2."
    ),
    tags: ["fraction_calcul", "produit", "short"],
  },
  {
    kind: "template",
    id: "cm2_fraction_produit_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le numérateur, laisse le dénominateur tranquille.",
    tags: ["fraction_calcul", "produit", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5, 6, 8]);
      const numerateur = randomInt(1, denominateur - 1);
      const entier = randomInt(2, 6);
      const resultat = entier * numerateur;
      return {
        text: `Calcule : ${entier} × ${numerateur}/${denominateur} = …/${denominateur}. Quel numérateur manque ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "multiplier une fraction par un entier, c'est l'additionner plusieurs fois avec elle-même.",
          "on multiplie le numérateur par l'entier ; le dénominateur ne bouge pas.",
          `${entier} × ${numerateur}/${denominateur}, c'est ${Array(Math.min(entier, 4)).fill(`${numerateur}/${denominateur}`).join(" + ")}${entier > 4 ? " + …" : ""} : on obtient ${entier} × ${numerateur} = ${resultat} parts, toutes en ${denominateur}èmes. Donc ${entier} × ${numerateur}/${denominateur} = ${resultat}/${denominateur}.`,
          `le numérateur manquant est ${resultat}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_produit_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 4,
    theme: "neutral",
    hint: "Le résultat tombe juste : compte combien d'entiers il contient.",
    tags: ["fraction_calcul", "produit", "template"],
    generate: () => {
      const denominateur = randomChoice([2, 3, 4, 5, 6]);
      const quotient = randomInt(2, 6);
      const entier = denominateur * quotient;
      return {
        text: `Calcule : ${entier} × 1/${denominateur}. Le résultat est un nombre entier. Lequel ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "multiplier par 1/d revient à partager en d parts égales.",
          "on multiplie le numérateur, puis on compte les entiers du résultat.",
          `${entier} × 1/${denominateur} = ${entier}/${denominateur}. Or il faut ${denominateur} parts pour faire 1 entier, et ${entier} = ${quotient} × ${denominateur} : donc ${entier}/${denominateur} = ${quotient}.`,
          `${entier} × 1/${denominateur} = ${quotient}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_QUANTITE — une fraction d'une quantité ou d'une grandeur
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font deux tiers de douze œufs ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Partage d'abord les douze œufs en trois parts égales.",
    explanation: exp(
      "prendre une fraction d'une quantité, c'est partager puis prendre.",
      "on partage d'abord en autant de parts que l'indique le dénominateur, puis on en prend autant que l'indique le numérateur.",
      "Je partage 12 œufs en 3 parts égales : comme 12 = 3 × 4, chaque part vaut 4 œufs. Un tiers de douze œufs, c'est donc 4 œufs. Deux tiers, c'est deux fois cela : 2 × 4 = 8 œufs.",
      "deux tiers de douze œufs font 8 œufs."
    ),
    tags: ["fraction_calcul", "quantite", "canvas", "short"],
    canvas: barrePartage("12 œufs", 3, 2, "Deux tiers de 12 œufs ?"),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font deux cinquièmes de 60 kg de sable ? (Réponds en kg.)",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Un cinquième de 60 kg, c'est combien ?",
    explanation: exp(
      "prendre une fraction d'une grandeur, c'est partager puis prendre.",
      "on divise par le dénominateur, puis on multiplie par le numérateur.",
      "60 = 5 × 12, donc un cinquième de 60 kg vaut 12 kg. Deux cinquièmes, c'est deux fois 12 kg, soit 24 kg.",
      "deux cinquièmes de 60 kg font 24 kg."
    ),
    tags: ["fraction_calcul", "quantite", "canvas", "short"],
    canvas: barrePartage("60 kg", 5, 2, "Deux cinquièmes de 60 kg ?"),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer trois dixièmes de 500 g de farine, dans quel ordre faut-il s'y prendre ?",
    format: "qcm",
    choices: [
      "on partage d'abord 500 en 10, puis on prend 3 fois le résultat",
      "on multiplie d'abord 500 par 10, puis on divise par 3",
      "on partage d'abord 500 en 3, puis on prend 10 fois le résultat",
      "on additionne 500 et 10, puis on divise par 3",
    ],
    expected: ["on partage d'abord 500 en 10, puis on prend 3 fois le résultat"],
    comparator: "mcq_exact",
    hint: "Le dénominateur dit en combien de parts on partage.",
    explanation: exp(
      "le dénominateur indique le nombre de parts, le numérateur le nombre de parts prises.",
      "on partage d'abord (dénominateur), on prend ensuite (numérateur).",
      "Un dixième de 500 g vaut 500 ÷ 10 = 50 g. Trois dixièmes, c'est 3 × 50 = 150 g. Partager d'abord garde des nombres petits ; l'ordre inverse — multiplier par 3 puis diviser par 10 — donne le même résultat, mais fait manipuler 1 500 avant de retomber sur 150.",
      "on partage en 10, puis on prend 3 parts : 150 g."
    ),
    tags: ["fraction_calcul", "quantite", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cm2_fraction_quantite_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Partage d'abord, prends ensuite.",
    tags: ["fraction_calcul", "quantite", "template"],
    generate: () => {
      const contextes = [
        { quoi: "billes", unite: "" },
        { quoi: "g de farine", unite: " g" },
        { quoi: "kg de sable", unite: " kg" },
        { quoi: "mètres de ruban", unite: " m" },
        { quoi: "élèves", unite: "" },
      ];
      const c = randomChoice(contextes);
      const denominateur = randomChoice([2, 3, 4, 5, 10]);
      const part = randomInt(3, 25);
      const total = denominateur * part;
      const numerateur = randomInt(1, denominateur - 1);
      const resultat = numerateur * part;
      // ⚠️ « 1 tiers de 12 billes » ne se dit pas. Au singulier on écrit la
      // fraction en toutes lettres — c'est aussi ce que le BO fait verbaliser.
      const pluriel: Record<number, string> = {
        2: "demis",
        3: "tiers",
        4: "quarts",
        5: "cinquièmes",
        10: "dixièmes",
      };
      const singulier: Record<number, string> = {
        2: "la moitié",
        3: "un tiers",
        4: "un quart",
        5: "un cinquième",
        10: "un dixième",
      };
      const nom =
        numerateur === 1
          ? singulier[denominateur]
          : `${numerateur} ${pluriel[denominateur]}`;

      return {
        text: `Combien font ${nom} de ${total} ${c.quoi} ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "prendre une fraction d'une quantité, c'est partager puis prendre.",
          "on divise par le dénominateur, puis on multiplie par le numérateur.",
          `Je partage ${total} en ${denominateur} parts égales : ${total} ÷ ${denominateur} = ${part}. Une part vaut donc ${part}${c.unite}. J'en prends ${numerateur} : ${numerateur} × ${part} = ${resultat}${c.unite}.`,
          `${nom} de ${total} ${c.quoi}, cela fait ${resultat}${c.unite}.`
        ),
        canvas: barrePartage(`${total}${c.unite}`, denominateur, numerateur, `${nom} de ${total} ?`),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_quantite_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur dit en combien de parts partager.",
    tags: ["fraction_calcul", "quantite", "piege", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5]);
      const part = randomInt(4, 20);
      const total = denominateur * part;
      const numerateur = randomInt(2, denominateur - 1);
      const bonne = `${total} ÷ ${denominateur}, puis × ${numerateur}`;
      return {
        text: `Pour calculer ${numerateur}/${denominateur} de ${total}, quelle suite de calculs convient ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${total} ÷ ${numerateur}, puis × ${denominateur}`,
          `${total} × ${denominateur}, puis ÷ ${numerateur}`,
          `${total} − ${denominateur}, puis × ${numerateur}`,
          `${total} × ${numerateur}, puis × ${denominateur}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "le dénominateur indique en combien de parts on partage, le numérateur combien on en prend.",
          "on partage d'abord, on prend ensuite.",
          `On partage ${total} en ${denominateur} parts égales : ${total} ÷ ${denominateur} = ${part}. Puis on en prend ${numerateur} : ${numerateur} × ${part} = ${numerateur * part}. Échanger les rôles du numérateur et du dénominateur donnerait un tout autre nombre.`,
          `${numerateur}/${denominateur} de ${total} vaut ${numerateur * part}.`
        ),
      };
    },
  },
];
