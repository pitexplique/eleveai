// lib/tutor-v4/questionBank/ce1/maths/fraction.bank.ts
//
// Les fractions du CE1, écrites à la main. C'est là que l'ancienne liste de
// micro-compétences s'écartait le plus du programme : elle s'arrêtait au
// tiers, alors que le CE1 va jusqu'au dixième, nomme le numérateur et le
// dénominateur, compare, additionne et soustrait.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — les fractions du CE1 sont des fractions D'UN TOUT, toutes inférieures ou
//     égales à 1 ;
//   — leur dénominateur vaut 2, 3, 4, 5, 6, 8 ou 10. Jamais 7, jamais 12 ;
//   — d'abord les fractions UNITAIRES (numérateur 1), puis les non unitaires
//     comme 3/8 ;
//   — les mots « numérateur » et « dénominateur » sont attendus ;
//   — on compare à même dénominateur, et on compare les fractions de
//     numérateur 1 ;
//   — on additionne et on soustrait à même dénominateur, et on cherche le
//     complément d'une fraction à 1.
// 📅 Jalons : le travail commence en PÉRIODE 2 par les fractions unitaires ;
// la comparaison arrive dès la PÉRIODE 4.
//
// LE PIÈGE DE LA NOTION, et le programme le nomme lui-même : « 1/3 est
// supérieur à 1/6, ce qui peut être contre-intuitif pour certains élèves qui
// se concentrent sur l'inégalité 3 < 6 ». Plus on partage, plus les parts sont
// petites. Il revient dans comparer, dans les défis, et il vaut d'être posé
// tôt.
//
// Second piège, plus discret : une figure coupée en parts INÉGALES ne montre
// aucune fraction. Le canvas sait dessiner ce cas — `unequalParts: true`.
//
// ⛔ DEUX RÈGLES D'ÉCRITURE :
//   — le cycle 2 est en TEXTE BRUT : on écrit « 3/8 », jamais du LaTeX ;
//   — une réponse qui EST une fraction s'écrit en `qcm` avec ses choix. Le
//     convertisseur ne fabrique des propositions que pour des NOMBRES : « 3/4 »
//     ne se convertit pas. Les réponses entières restent en `short`.

import type { FractionCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function fractionCanvas(data: Omit<FractionCanvasData, "kind">): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les sept dénominateurs du CE1, avec le nom de la part. */
const DENOMINATEURS = [
  { d: 2, part: "un demi", parts: "demis" },
  { d: 3, part: "un tiers", parts: "tiers" },
  { d: 4, part: "un quart", parts: "quarts" },
  { d: 5, part: "un cinquième", parts: "cinquièmes" },
  { d: 6, part: "un sixième", parts: "sixièmes" },
  { d: 8, part: "un huitième", parts: "huitièmes" },
  { d: 10, part: "un dixième", parts: "dixièmes" },
] as const;

export const fractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_FRACTION_PARTAGE — la fraction est un partage
     Ce qui se joue ici : les parts doivent être ÉGALES. Une
     figure coupée n'importe comment ne montre pas de fraction.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_partage_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_partage",
    difficulty: 2,
    theme: "neutral",
    text: "Pour partager un gâteau en quarts, comment doivent être les parts ?",
    format: "qcm",
    choices: [
      "toutes de la même taille",
      "de tailles différentes",
      "la première plus grande que les autres",
      "peu importe, du moment qu'il y en a quatre",
    ],
    expected: ["toutes de la même taille"],
    comparator: "mcq_exact",
    hint: "Sinon, celui qui prend la plus grosse part n'a pas vraiment un quart.",
    explanation: exp(
      "Une fraction partage un tout en parts ÉGALES.",
      "On vérifie que toutes les parts ont la même taille avant de parler de fraction.",
      "Si les parts sont différentes, personne ne sait ce que vaut « un quart ». C'est l'égalité des parts qui donne son sens au mot.",
      "Les parts doivent toutes être de la même taille.",
    ),
    tags: ["ce1", "fraction", "partage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_partage_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_partage",
    difficulty: 3,
    theme: "neutral",
    text: "Ce disque est-il partagé en tiers ?",
    format: "qcm",
    choices: [
      "non, les parts ne sont pas égales",
      "oui, il y a bien trois parts",
      "non, il faudrait quatre parts",
      "oui, un tiers est toujours plus grand",
    ],
    expected: ["non, les parts ne sont pas égales"],
    comparator: "mcq_exact",
    hint: "Compte les parts, puis regarde si elles ont la même taille.",
    explanation: exp(
      "Une fraction partage un tout en parts égales.",
      "On compte les parts, puis on vérifie qu'elles sont de la même taille.",
      "Il y a bien trois parts, mais elles ne se ressemblent pas. Un tiers, c'est une part sur trois parts IDENTIQUES.",
      "Non : les parts ne sont pas égales.",
    ),
    canvas: fractionCanvas({
      model: "circle",
      fraction: { numerator: 1, denominator: 3 },
      display: { showFraction: false, showParts: true, unequalParts: true },
    }),
    tags: ["ce1", "fraction", "partage", "piege", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_fraction_partage_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_partage",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les parts, puis regarde si elles sont toutes pareilles.",
    tags: ["ce1", "fraction", "partage", "template", "canvas"],
    generate: () => {
      const { d, part } = randomChoice(DENOMINATEURS);
      const egales = randomChoice([true, false]);
      const bonne = egales ? "oui" : "non, les parts ne sont pas égales";
      return {
        text: `Cette figure est partagée en ${d} parts. Peut-on dire qu'une part vaut ${part} de la figure ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          egales ? "non, les parts ne sont pas égales" : "oui",
          "non, il faudrait deux parts de plus",
          "on ne peut pas savoir",
          "non, il faudrait une part de moins",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction partage un tout en parts égales.",
          "On compte les parts, puis on vérifie qu'elles ont toutes la même taille.",
          egales
            ? `Il y a ${d} parts et elles sont toutes pareilles : chacune vaut bien ${part} de la figure.`
            : `Il y a bien ${d} parts, mais elles n'ont pas la même taille. Sans parts égales, on ne peut pas parler de ${part}.`,
          bonne === "oui" ? `Oui, chaque part vaut ${part}.` : "Non : les parts ne sont pas égales.",
        ),
        canvas: fractionCanvas({
          model: "circle",
          fraction: { numerator: 1, denominator: d },
          display: { showFraction: false, showParts: true, unequalParts: !egales },
        }),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_DEMI — un demi
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il couper un gâteau pour avoir des demis ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Un demi, c'est la moitié.",
    explanation: exp(
      "Un demi, c'est une part quand le tout est partagé en deux parts égales.",
      "On lit le mot : « demi » annonce deux parts.",
      "On coupe le gâteau en 2 parts égales : chaque part est un demi, c'est-à-dire la moitié.",
      "Il faut 2 parts.",
    ),
    tags: ["ce1", "fraction", "demi", "definition"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'écrit « un demi » avec des chiffres ?",
    format: "qcm",
    choices: ["1/2", "2/1", "1/1", "2/2"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Le nombre de parts prises est en haut, le nombre de parts en tout est en bas.",
    explanation: exp(
      "Dans l'écriture d'une fraction, le nombre du bas dit en combien de parts on a partagé.",
      "On écrit d'abord combien de parts on prend, puis en combien de parts le tout est coupé.",
      "Un demi, c'est 1 part sur 2 parts égales : on écrit 1/2. En écrivant 2/1, on dirait deux touts, pas une moitié.",
      "Un demi s'écrit 1/2.",
    ),
    tags: ["ce1", "fraction", "demi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 3,
    theme: "neutral",
    text: "Deux demis d'une même tablette de chocolat, cela fait combien de tablettes ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Recolle les deux moitiés.",
    explanation: exp(
      "Quand on réunit toutes les parts d'un partage, on retrouve le tout.",
      "On compte les demis jusqu'à retrouver la tablette entière.",
      "1/2 + 1/2 = 2/2, et deux demis font le tout, c'est-à-dire 1 tablette.",
      "Cela fait 1 tablette entière.",
    ),
    tags: ["ce1", "fraction", "demi", "remarquable"],
  },

  /* =========================================================
     CE1_FRACTION_QUART — un quart
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_quart_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_quart",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il partager une bande de papier pour avoir des quarts ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Comme les quarts d'heure : combien y en a-t-il dans une heure ?",
    explanation: exp(
      "Un quart, c'est une part quand le tout est partagé en quatre parts égales.",
      "On lit le mot : « quart » annonce quatre parts.",
      "On plie la bande en deux, puis encore en deux : cela fait 4 parts égales. Chacune est un quart.",
      "Il faut 4 parts.",
    ),
    tags: ["ce1", "fraction", "quart", "definition"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_quart_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_quart",
    difficulty: 3,
    theme: "neutral",
    text: "Un quart d'une bouteille d'eau est versé dans un verre. Combien de verres identiques faut-il pour vider toute la bouteille ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Chaque verre reçoit la même chose.",
    explanation: exp(
      "Un quart, c'est une part sur quatre parts égales.",
      "On compte combien de fois la part tient dans le tout.",
      "Si chaque verre reçoit un quart, il faut 4 verres pour vider la bouteille : 1/4 + 1/4 + 1/4 + 1/4 fait le tout.",
      "Il faut 4 verres.",
    ),
    tags: ["ce1", "fraction", "quart"],
  },
  {
    kind: "template",
    id: "ce1_fraction_quart_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_quart",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas dit en combien de parts le tout est coupé.",
    tags: ["ce1", "fraction", "quart", "template", "canvas"],
    generate: () => {
      const objet = randomChoice(["une pizza", "un gâteau", "une tarte", "une galette"]);
      return {
        text: `On partage ${objet} en 4 parts égales et on en prend une. Quelle fraction a-t-on prise ?`,
        format: "qcm",
        choices: makeChoices("1/4", ["4/1", "1/2", "1/3", "3/4"]),
        expected: ["1/4"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une fraction, le nombre du haut dit combien de parts on prend, celui du bas en combien de parts le tout est coupé.",
          "On lit d'abord le nombre de parts prises, puis le nombre de parts en tout.",
          `${objet.charAt(0).toUpperCase()}${objet.slice(1)} est coupée en 4 parts égales, on en prend 1 : cela s'écrit 1/4.`,
          "On a pris 1/4.",
        ),
        canvas: fractionCanvas({
          model: "circle",
          fraction: { numerator: 1, denominator: 4 },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_TIERS — un tiers
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_tiers_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_tiers",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il partager un tout pour avoir des tiers ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "« Tiers » ressemble à « trois ».",
    explanation: exp(
      "Un tiers, c'est une part quand le tout est partagé en trois parts égales.",
      "On lit le mot : « tiers » annonce trois parts.",
      "Trois parts égales, et on en prend une : cette part est un tiers, qu'on écrit 1/3.",
      "Il faut 3 parts.",
    ),
    tags: ["ce1", "fraction", "tiers", "definition"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_tiers_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_tiers",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus grand : un tiers d'un gâteau ou un quart du même gâteau ?",
    format: "qcm",
    choices: [
      "un tiers",
      "un quart",
      "c'est pareil",
      "on ne peut pas savoir",
    ],
    expected: ["un tiers"],
    comparator: "mcq_exact",
    hint: "Plus on partage, plus les parts sont petites.",
    explanation: exp(
      "Plus on coupe un tout en parts nombreuses, plus chaque part est petite.",
      "On compare le nombre de parts : 3 parts ou 4 parts pour le même gâteau.",
      "Le gâteau coupé en 3 donne des parts plus grosses que coupé en 4, parce qu'il y a moins de monde à servir. Donc 1/3 est plus grand que 1/4, même si 3 est plus petit que 4.",
      "Un tiers est plus grand.",
    ),
    tags: ["ce1", "fraction", "tiers", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_tiers_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_tiers",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de parts pour faire le tout ?",
    tags: ["ce1", "fraction", "tiers", "template"],
    generate: () => {
      const { d, part, parts } = randomChoice(DENOMINATEURS);
      return {
        text: `Combien faut-il de parts de ${part} pour reconstituer le tout ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Une fraction unitaire est une part sur un partage en parts égales.",
          "On compte combien de parts il faut pour retrouver le tout entier.",
          `${part.charAt(0).toUpperCase()}${part.slice(1)}, c'est une part sur ${d}. Il faut donc ${d} ${parts} pour refaire le tout.`,
          `Il en faut ${d}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_UNITAIRES — 1/5, 1/6, 1/8 et 1/10
     Les quatre fractions que l'ancienne liste ignorait.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_unitaires_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on la fraction 1/8 ?",
    format: "qcm",
    choices: ["un huitième", "un sur huit-ième", "huit unièmes", "un et huit"],
    expected: ["un huitième"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas donne le nom de la part.",
    explanation: exp(
      "Le nombre du bas d'une fraction donne le nom de la part.",
      "On dit d'abord le nombre du haut, puis le nom de la part.",
      "Avec 8 en bas, la part s'appelle un huitième. On lit donc 1/8 « un huitième » : une part sur huit parts égales.",
      "On lit « un huitième ».",
    ),
    tags: ["ce1", "fraction", "unitaires", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_unitaires_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 3,
    theme: "neutral",
    text: "Une bande de papier est partagée en 10 parts égales. Comment s'écrit une de ces parts ?",
    format: "qcm",
    choices: ["1/10", "10/1", "1/100", "10/10"],
    expected: ["1/10"],
    comparator: "mcq_exact",
    hint: "Une part prise, dix parts en tout.",
    explanation: exp(
      "Dans une fraction, le nombre du haut compte les parts prises, celui du bas les parts du partage.",
      "On écrit 1 en haut pour une seule part, puis le nombre de parts en bas.",
      "Dix parts égales, on en prend une : cela s'écrit 1/10 et se lit « un dixième ». 10/10, ce serait la bande entière.",
      "Cela s'écrit 1/10.",
    ),
    tags: ["ce1", "fraction", "unitaires", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_unitaires_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas donne le nom de la part.",
    tags: ["ce1", "fraction", "unitaires", "template"],
    generate: () => {
      const choisi = randomChoice(DENOMINATEURS);
      const autres = DENOMINATEURS.filter((x) => x.d !== choisi.d).map((x) => x.part);
      return {
        text: `Comment lit-on la fraction 1/${choisi.d} ?`,
        format: "qcm",
        choices: makeChoices(choisi.part, autres),
        expected: [choisi.part],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre du bas d'une fraction donne le nom de la part.",
          "On regarde le nombre du bas, puis on dit le nom qui lui correspond.",
          `Avec ${choisi.d} en bas, chaque part s'appelle ${choisi.part} : le tout est coupé en ${choisi.d} parts égales et on en prend une.`,
          `On lit « ${choisi.part} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_fraction_unitaires_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule part prise : le nombre du haut est 1.",
    tags: ["ce1", "fraction", "unitaires", "template", "canvas"],
    generate: () => {
      const { d } = randomChoice(DENOMINATEURS);
      const bonne = `1/${d}`;
      return {
        text: `Cette figure est partagée en ${d} parts égales et une seule est coloriée. Quelle fraction est coloriée ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${d}/1`,
          `1/${d + 1}`,
          `${d}/${d}`,
          `2/${d}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre du haut compte les parts coloriées, celui du bas les parts du partage.",
          "On compte d'abord les parts coloriées, puis les parts en tout.",
          `Une seule part est coloriée sur ${d} : on écrit 1 en haut, ${d} en bas, soit ${bonne}.`,
          `La fraction coloriée est ${bonne}.`,
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: 1, denominator: d },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_VOCABULAIRE — numérateur et dénominateur
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_vocabulaire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fraction 2/5, comment s'appelle le nombre 5 ?",
    format: "qcm",
    choices: ["le dénominateur", "le numérateur", "le total", "le reste"],
    expected: ["le dénominateur"],
    comparator: "mcq_exact",
    hint: "C'est celui du bas, celui qui donne son nom à la part.",
    explanation: exp(
      "Le dénominateur est le nombre du bas : il dit en combien de parts égales le tout est partagé.",
      "On repère la place du nombre : en bas, c'est le dénominateur ; en haut, le numérateur.",
      "Dans 2/5, le 5 est en bas : c'est le dénominateur. Il dit que le tout est coupé en 5 parts. Le 2 est le numérateur : il dit qu'on en prend 2.",
      "Le 5 s'appelle le dénominateur.",
    ),
    tags: ["ce1", "fraction", "vocabulaire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_vocabulaire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Que dit le NUMÉRATEUR d'une fraction ?",
    format: "qcm",
    choices: [
      "combien de parts on a prises",
      "en combien de parts le tout est partagé",
      "la taille de chaque part",
      "le nombre de touts",
    ],
    expected: ["combien de parts on a prises"],
    comparator: "mcq_exact",
    hint: "C'est le nombre écrit en haut.",
    explanation: exp(
      "Le numérateur est le nombre du haut : il compte les parts prises ou coloriées.",
      "On lit la fraction en deux temps : combien de parts en tout, puis combien on en prend.",
      "Dans 3/8, le 8 dit que le tout est coupé en huit parts égales, et le 3 dit qu'on en prend trois.",
      "Le numérateur dit combien de parts on a prises.",
    ),
    tags: ["ce1", "fraction", "vocabulaire", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_vocabulaire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Numérateur en haut, dénominateur en bas.",
    tags: ["ce1", "fraction", "vocabulaire", "template"],
    generate: () => {
      const { d } = randomChoice(DENOMINATEURS);
      const n = randomInt(1, d - 1);
      const cherche = randomChoice(["numérateur", "dénominateur"] as const);
      const bonne = cherche === "numérateur" ? n : d;
      return {
        text: `Dans la fraction ${n}/${d}, quel est le ${cherche} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Le numérateur est le nombre du haut, le dénominateur celui du bas.",
          "On repère la place du nombre avant de le nommer.",
          `Dans ${n}/${d}, le numérateur est ${n} — il compte les parts prises — et le dénominateur est ${d} — il dit en combien de parts le tout est coupé.`,
          `Le ${cherche} est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_REPRESENTER — dessiner et lire une fraction
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_representer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 3/4 d'une bande de papier, que fait-on ?",
    format: "qcm",
    choices: [
      "on partage la bande en 4 parts égales et on en colorie 3",
      "on partage la bande en 3 parts égales et on en colorie 4",
      "on colorie 3 bandes sur 4 bandes",
      "on partage la bande en 7 parts égales",
    ],
    expected: ["on partage la bande en 4 parts égales et on en colorie 3"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas dit en combien on coupe, celui du haut combien on colorie.",
    explanation: exp(
      "Représenter une fraction, c'est partager d'abord, colorier ensuite.",
      "On lit le dénominateur pour le partage, puis le numérateur pour le coloriage.",
      "Dans 3/4, le 4 dit de couper la bande en quatre parts égales, le 3 dit d'en colorier trois. On ne peut pas colorier 4 parts sur 3, il n'y en aurait pas assez.",
      "On partage en 4 parts égales et on en colorie 3.",
    ),
    tags: ["ce1", "fraction", "representer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_representer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les parts coloriées, puis les parts en tout.",
    tags: ["ce1", "fraction", "representer", "template", "canvas"],
    generate: () => {
      const { d } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 4));
      const n = randomInt(2, d - 1);
      const bonne = `${n}/${d}`;
      return {
        text: "Quelle fraction de cette figure est coloriée ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          `${d}/${n}`,
          `${n}/${d - n}`,
          `${d - n}/${d}`,
          `${n + 1}/${d}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le numérateur compte les parts coloriées, le dénominateur les parts du partage.",
          "On compte d'abord toutes les parts, puis celles qui sont coloriées.",
          `La figure est coupée en ${d} parts égales et ${n} sont coloriées : cela s'écrit ${bonne}. Les ${d - n} parts blanches, elles, font ${d - n}/${d}.`,
          `La fraction coloriée est ${bonne}.`,
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: n, denominator: d },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_INFERIEURE_1 — les fractions non unitaires
     Le programme le dit : 3/8 se lit « trois huitièmes », et
     c'est aussi 1/8 + 1/8 + 1/8.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_inferieure_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_inferieure_1",
    difficulty: 3,
    theme: "neutral",
    text: "Comment lit-on la fraction 3/8 ?",
    format: "qcm",
    choices: [
      "trois huitièmes",
      "huit tiers",
      "trois sur huitième",
      "trois et huit",
    ],
    expected: ["trois huitièmes"],
    comparator: "mcq_exact",
    hint: "D'abord le nombre du haut, puis le nom de la part.",
    explanation: exp(
      "On lit une fraction en disant le nombre du haut, puis le nom de la part donné par le nombre du bas.",
      "On repère le dénominateur pour trouver le nom de la part.",
      "Avec 8 en bas, la part s'appelle un huitième. On en prend 3 : cela se lit « trois huitièmes ». C'est aussi 1/8 + 1/8 + 1/8.",
      "On lit « trois huitièmes ».",
    ),
    tags: ["ce1", "fraction", "inferieure_1", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_inferieure_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_inferieure_1",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut 5/5 d'une tablette de chocolat ?",
    format: "qcm",
    choices: [
      "la tablette entière",
      "la moitié de la tablette",
      "cinq tablettes",
      "un cinquième de la tablette",
    ],
    expected: ["la tablette entière"],
    comparator: "mcq_exact",
    hint: "On prend toutes les parts du partage.",
    explanation: exp(
      "Quand le numérateur est égal au dénominateur, on prend toutes les parts : cela fait le tout.",
      "On compare le nombre de parts prises au nombre de parts en tout.",
      "La tablette est coupée en 5 parts et on prend les 5 : il ne reste rien. 5/5 = 1, la tablette entière.",
      "5/5 vaut la tablette entière.",
    ),
    tags: ["ce1", "fraction", "inferieure_1", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_inferieure_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_inferieure_1",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque part vaut une fraction unitaire : compte-les.",
    tags: ["ce1", "fraction", "inferieure_1", "template"],
    generate: () => {
      const { d, part } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 4));
      const n = randomInt(2, d - 1);
      const bonne = `${n}/${d}`;
      const somme = Array.from({ length: n }, () => `1/${d}`).join(" + ");
      return {
        text: `On additionne ${somme}. Quelle fraction obtient-on ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${n}/${d * n}`,
          `1/${d}`,
          `${d}/${n}`,
          `${n + 1}/${d}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction non unitaire, c'est plusieurs fois la même part.",
          "On compte combien de parts on additionne : le dénominateur ne change pas.",
          `On ajoute ${n} fois ${part}. Les parts gardent la même taille, on en a simplement ${n} : cela fait ${bonne}.`,
          `On obtient ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_COMPARER_MEME_DENOMINATEUR
     Quand les parts sont de la même taille, c'est le nombre de
     parts qui décide. C'est le cas facile — et il prépare le
     cas piégeux, juste en dessous.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_comparer_meme_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_meme_denominateur",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus grand : 2/5 ou 3/5 d'un même gâteau ?",
    format: "qcm",
    choices: ["3/5", "2/5", "c'est pareil", "on ne peut pas savoir"],
    expected: ["3/5"],
    comparator: "mcq_exact",
    hint: "Les parts ont la même taille : compte-les.",
    explanation: exp(
      "Quand deux fractions ont le même dénominateur, leurs parts ont la même taille.",
      "On compare alors simplement le nombre de parts, c'est-à-dire les numérateurs.",
      "Les deux gâteaux sont coupés en cinquièmes. Trois cinquièmes, c'est une part de plus que deux cinquièmes.",
      "3/5 est plus grand que 2/5.",
    ),
    tags: ["ce1", "fraction", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_comparer_meme_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_meme_denominateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Même dénominateur, donc mêmes parts : compte-les.",
    tags: ["ce1", "fraction", "comparer", "template"],
    generate: () => {
      const { d, parts } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 5));
      const a = randomInt(1, d - 2);
      const b = randomInt(a + 1, d - 1);
      const grand = randomChoice([true, false]);
      const bonne = grand ? `${b}/${d}` : `${a}/${d}`;
      const autre = grand ? `${a}/${d}` : `${b}/${d}`;
      return {
        text: grand
          ? `Qu'est-ce qui est le plus GRAND : ${a}/${d} ou ${b}/${d} ?`
          : `Qu'est-ce qui est le plus PETIT : ${a}/${d} ou ${b}/${d} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          autre,
          "elles sont égales",
          "on ne peut pas comparer",
          `${d}/${d}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux fractions ont le même dénominateur, leurs parts ont exactement la même taille.",
          "On compare alors le nombre de parts prises, c'est-à-dire les numérateurs.",
          `Les deux sont des ${parts}, donc des parts identiques. ${b} parts, c'est plus que ${a} parts.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_COMPARER_UNITAIRES — LE piège du programme
     « 1/3 est supérieur à 1/6, ce qui peut être contre-intuitif
     pour certains élèves qui se concentrent sur 3 < 6. »
     Plus il y a de parts, plus elles sont petites.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_comparer_unitaires_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_unitaires",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus grand : 1/3 ou 1/6 d'un même gâteau ?",
    format: "qcm",
    choices: ["1/3", "1/6", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1/3"],
    comparator: "mcq_exact",
    hint: "Le gâteau est le même. Est-ce qu'on préfère le partager entre 3 ou entre 6 ?",
    explanation: exp(
      "Plus on partage un tout en parts nombreuses, plus chaque part est petite.",
      "On imagine le même gâteau coupé des deux façons, et on compare les parts.",
      "Coupé en 3, chaque part est grosse. Coupé en 6, il y a deux fois plus de parts, donc chacune est deux fois plus petite. Le nombre 6 est plus grand que 3, mais il compte des parts, pas leur taille.",
      "1/3 est plus grand que 1/6.",
    ),
    tags: ["ce1", "fraction", "comparer_unitaires", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_comparer_unitaires_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_unitaires",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « 1/8 est plus grand que 1/6, parce que 8 est plus grand que 6. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, plus il y a de parts, plus elles sont petites",
      "oui",
      "non, les deux sont égales",
      "on ne peut pas comparer deux fractions",
    ],
    expected: ["non, plus il y a de parts, plus elles sont petites"],
    comparator: "mcq_exact",
    hint: "Partager une tablette entre 8 enfants ou entre 6 : qui reçoit le plus ?",
    explanation: exp(
      "Dans une fraction unitaire, le dénominateur compte les parts du partage, pas leur taille.",
      "On pense à un partage réel : le même tout, entre plus ou moins de personnes.",
      "Une tablette partagée entre 8 enfants donne des morceaux plus petits que partagée entre 6. Donc 1/8 est plus PETIT que 1/6. Le nombre plus grand en bas donne la part plus petite.",
      "Non : 1/8 est plus petit que 1/6.",
    ),
    tags: ["ce1", "fraction", "comparer_unitaires", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_comparer_unitaires_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_unitaires",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus il y a de parts, plus chacune est petite.",
    tags: ["ce1", "fraction", "comparer_unitaires", "piege", "template"],
    generate: () => {
      const [x, y] = shuffle(DENOMINATEURS).slice(0, 2).sort((a, b) => a.d - b.d);
      const grand = randomChoice([true, false]);
      // Le dénominateur le PLUS PETIT donne la part la PLUS GRANDE.
      const bonne = grand ? `1/${x.d}` : `1/${y.d}`;
      const autre = grand ? `1/${y.d}` : `1/${x.d}`;
      return {
        text: grand
          ? `Qu'est-ce qui est le plus GRAND : 1/${x.d} ou 1/${y.d} d'un même gâteau ?`
          : `Qu'est-ce qui est le plus PETIT : 1/${x.d} ou 1/${y.d} d'un même gâteau ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          autre,
          "c'est pareil",
          "on ne peut pas savoir",
          `${x.d}/${y.d}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une fraction unitaire, le nombre du bas compte les parts du partage. Plus il y a de parts, plus elles sont petites.",
          "On imagine le même gâteau partagé des deux façons.",
          `Coupé en ${x.d} parts, chaque part est plus grosse que coupé en ${y.d} parts : il y a moins de monde à servir. Donc ${x.part} est plus grand que ${y.part}, même si ${x.d} est plus petit que ${y.d}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_ADDITIONNER — même dénominateur
     Le piège : additionner aussi les dénominateurs. Les parts
     ne changent pas de taille quand on en prend plusieurs.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_additionner_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 2/5 + 1/5 ?",
    format: "qcm",
    choices: ["3/5", "3/10", "2/10", "1/5"],
    expected: ["3/5"],
    comparator: "mcq_exact",
    hint: "Les parts sont des cinquièmes des deux côtés : elles ne changent pas de taille.",
    explanation: exp(
      "Pour additionner deux fractions de même dénominateur, on additionne les parts prises.",
      "On garde le dénominateur, on additionne les numérateurs.",
      "Deux cinquièmes plus un cinquième, cela fait trois cinquièmes : 2 + 1 = 3 parts, et les parts restent des cinquièmes. Le 5 ne devient pas 10.",
      "2/5 + 1/5 = 3/5.",
    ),
    tags: ["ce1", "fraction", "additionner", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_additionner_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 2/3 - 1/3 ?",
    format: "qcm",
    choices: ["1/3", "1/0", "3/3", "1/6"],
    expected: ["1/3"],
    comparator: "mcq_exact",
    hint: "On enlève une part à deux parts de la même taille.",
    explanation: exp(
      "Pour soustraire deux fractions de même dénominateur, on enlève les parts prises.",
      "On garde le dénominateur, on soustrait les numérateurs.",
      "Deux tiers moins un tiers, il reste un tiers : 2 - 1 = 1 part, et la part reste un tiers.",
      "2/3 - 1/3 = 1/3.",
    ),
    tags: ["ce1", "fraction", "additionner", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_additionner_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur ne bouge pas.",
    tags: ["ce1", "fraction", "additionner", "piege", "template"],
    generate: () => {
      const { d, parts } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 5));
      const a = randomInt(1, d - 2);
      const b = randomInt(1, d - 1 - a);
      const somme = a + b;
      const bonne = `${somme}/${d}`;
      return {
        text: `Combien font ${a}/${d} + ${b}/${d} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${somme}/${d * 2}`,
          `${a * b}/${d}`,
          `${somme + 1}/${d}`,
          `${somme}/${d + 1}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour additionner deux fractions de même dénominateur, on additionne les parts prises.",
          "On garde le dénominateur, on additionne les numérateurs.",
          `${a} + ${b} = ${somme} parts, et ce sont toujours des ${parts}. Le dénominateur ne double pas : les parts n'ont pas changé de taille.`,
          `Cela fait ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_fraction_additionner_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "On enlève des parts, la taille des parts ne change pas.",
    tags: ["ce1", "fraction", "additionner", "template"],
    generate: () => {
      const { d, parts } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 5));
      const b = randomInt(1, d - 2);
      const a = randomInt(b + 1, d);
      const reste = a - b;
      const bonne = `${reste}/${d}`;
      return {
        text: `Combien font ${a}/${d} - ${b}/${d} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${reste}/${d * 2}`,
          `${a}/${d - b}`,
          `${reste + 1}/${d}`,
          `${d}/${reste}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour soustraire deux fractions de même dénominateur, on enlève les parts prises.",
          "On garde le dénominateur, on soustrait les numérateurs.",
          `${a} - ${b} = ${reste} parts, et ce sont toujours des ${parts}.`,
          `Cela fait ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_COMPLEMENT_1 — ce qui manque pour faire le tout
     Le programme le demande : « Lucie a colorié 3/10 d'une
     figure en bleu et le reste en rouge. Quelle fraction est
     coloriée en rouge ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_complement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_complement_1",
    difficulty: 4,
    theme: "neutral",
    text: "Lucie colorie 3/10 d'une figure en bleu et tout le reste en rouge. Quelle fraction de la figure est rouge ?",
    format: "qcm",
    choices: ["7/10", "3/10", "10/3", "7/7"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "La figure entière, c'est 10/10.",
    explanation: exp(
      "La figure entière vaut toutes ses parts : ici 10/10.",
      "On enlève les parts déjà coloriées en bleu pour trouver celles qui restent.",
      "10 parts en tout, 3 sont bleues : il en reste 10 - 3 = 7. Ces 7 parts sont rouges, soit 7/10.",
      "7/10 de la figure est rouge.",
    ),
    tags: ["ce1", "fraction", "complement", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_complement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_complement_1",
    difficulty: 4,
    theme: "neutral",
    hint: "Le tout, c'est toutes les parts du partage.",
    tags: ["ce1", "fraction", "complement", "template"],
    generate: () => {
      // On écarte n = d - n (le complément vaudrait la fraction de départ) et
      // n = d - 1 (le complément vaudrait 1/d, déjà utilisé comme piège).
      const { d } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 5));
      let n = randomInt(2, d - 2);
      if (n * 2 === d) n = n + 1 <= d - 2 ? n + 1 : n - 1;
      const reste = d - n;
      const bonne = `${reste}/${d}`;
      const qui = randomChoice(["Lucie", "Kevin", "Malia", "Ryan"]);
      return {
        text: `${qui} colorie ${n}/${d} d'une figure en bleu et tout le reste en rouge. Quelle fraction de la figure est rouge ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${n}/${d}`,
          `${d}/${reste}`,
          `1/${d}`,
          `${reste}/${d - n}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La figure entière vaut toutes ses parts, c'est-à-dire " + `${d}/${d}` + ".",
          "On enlève les parts déjà coloriées pour trouver celles qui restent.",
          `${d} parts en tout, ${n} sont bleues : il en reste ${d} - ${n} = ${reste}. Ces ${reste} parts sont rouges.`,
          `La partie rouge est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FRACTION_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : les
     égalités entre fractions, que le programme donne en
     exemple — trois sixièmes font un demi, deux sixièmes font
     un tiers.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de sixièmes font un demi ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Coupe le gâteau en 6 : combien de parts dans une moitié ?",
    explanation: exp(
      "Deux fractions différentes peuvent recouvrir exactement la même quantité.",
      "On dessine le tout coupé en six, puis on regarde combien de parts tiennent dans une moitié.",
      "Six parts en tout, la moitié en contient trois : 1/6 + 1/6 + 1/6 = 3/6, et 3/6 recouvre exactement 1/2.",
      "Il faut 3 sixièmes.",
    ),
    tags: ["ce1", "fraction", "defi", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants partagent la même tablette. Léa prend 2/6, Kevin prend 1/3. Qui a le plus de chocolat ?",
    format: "qcm",
    choices: [
      "ils ont exactement la même chose",
      "Léa, parce que 2 est plus grand que 1",
      "Kevin, parce que 3 est plus petit que 6",
      "on ne peut pas savoir",
    ],
    expected: ["ils ont exactement la même chose"],
    comparator: "mcq_exact",
    hint: "Combien de sixièmes font un tiers ?",
    explanation: exp(
      "Deux écritures différentes peuvent désigner la même quantité.",
      "On ramène les deux parts au même partage, ici en sixièmes.",
      "Un tiers, c'est deux sixièmes : en coupant chaque tiers en deux, on obtient six parts. Léa a 2/6 et Kevin aussi.",
      "Ils ont exactement la même chose.",
    ),
    tags: ["ce1", "fraction", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_fraction_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de parts il faut pour remplir la moitié.",
    tags: ["ce1", "fraction", "defi", "template"],
    generate: () => {
      // Seuls les dénominateurs PAIRS du CE1 permettent de faire un demi juste.
      const d = randomChoice([4, 6, 8, 10] as const);
      const moitie = d / 2;
      return {
        text: `Un gâteau est partagé en ${d} parts égales. Combien de parts faut-il prendre pour avoir la moitié du gâteau ?`,
        format: "short",
        expected: [String(moitie)],
        comparator: "number_equal",
        explanation: exp(
          "La moitié d'un tout, c'est la même chose des deux côtés du partage.",
          "On cherche combien de parts tiennent dans une moitié : c'est la moitié du nombre de parts.",
          `Il y a ${d} parts. La moitié de ${d}, c'est ${moitie} : ${moitie}/${d} recouvre exactement 1/2.`,
          `Il faut prendre ${moitie} parts.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_fraction_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le tout, c'est toutes les parts : combien en manque-t-il ?",
    tags: ["ce1", "fraction", "defi", "template"],
    generate: () => {
      const { d, parts } = randomChoice(DENOMINATEURS.filter((x) => x.d >= 5));
      const n = randomInt(1, d - 1);
      const manque = d - n;
      return {
        text: `Une bande de papier est partagée en ${d} parts égales. On en a colorié ${n}. Combien de parts faut-il encore colorier pour que la bande soit entièrement coloriée ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "La bande entière vaut toutes ses parts, c'est-à-dire " + `${d}/${d}` + ".",
          "On enlève les parts déjà coloriées au nombre total de parts.",
          `${d} - ${n} = ${manque}. Il reste ${manque} ${parts} à colorier, et ${n}/${d} + ${manque}/${d} = ${d}/${d}, la bande entière.`,
          `Il faut colorier ${manque} parts.`,
        ),
      };
    },
  },
];
