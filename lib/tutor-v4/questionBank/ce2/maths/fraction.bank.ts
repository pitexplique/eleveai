// lib/tutor-v4/questionBank/ce2/maths/fraction.bank.ts
//
// Les fractions du CE2, écrites à la main. Jusqu'ici les huit
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « placer une fraction sur une droite graduée » et « comparer une
// fraction à l'unité » recevaient la même question.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : fractions INFÉRIEURES OU
// ÉGALES À 1, dénominateurs simples — demis, tiers, quarts, cinquièmes,
// dixièmes. Pas d'addition de fractions, pas de fraction plus grande que 1,
// pas de simplification : tout cela arrive au CM1 et au CM2.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` au primaire (cf. ce2/maths/index.ts) : un CE2 clique, il ne
// tape pas. Et une réponse qui EST une fraction (« 3/4 ») ne se convertit pas
// toute seule en QCM — le convertisseur ne sait fabriquer des propositions que
// pour des nombres. Donc : tout ce qui se répond par une fraction est écrit
// directement en `qcm`, avec ses propositions.

import type { FractionCanvasData, NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

/** Le nom qui se dit à voix haute : 1/4 se lit « un quart ». */
function nomFraction(n: number, d: number): string {
  const noms: Record<number, [string, string]> = {
    2: ["demi", "demis"],
    3: ["tiers", "tiers"],
    4: ["quart", "quarts"],
    5: ["cinquième", "cinquièmes"],
    6: ["sixième", "sixièmes"],
    8: ["huitième", "huitièmes"],
    10: ["dixième", "dixièmes"],
  };
  const [sing, plur] = noms[d] ?? [`${d}ème`, `${d}èmes`];
  const chiffres = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  return `${chiffres[n] ?? n} ${n > 1 ? plur : sing}`;
}

function fractionCanvas(data: Omit<FractionCanvasData, "kind">): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const fractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_FRACTION_UNITE — comprendre l'unité
     Ce qui se joue ici : le tout doit être partagé en parts
     ÉGALES. C'est la condition que les élèves oublient.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_unite",
    difficulty: 1,
    theme: "neutral",
    text: "On partage un gâteau en 4 parts. Pour parler de quarts, comment doivent être les parts ?",
    format: "qcm",
    choices: ["toutes égales", "de tailles différentes", "au moins deux pareilles", "peu importe"],
    expected: ["toutes égales"],
    comparator: "mcq_exact",
    hint: "Sinon, une « part » ne voudrait rien dire : la tienne serait plus grosse que la mienne.",
    explanation: exp(
      "Une fraction partage un tout en parts toutes égales.",
      "On vérifie d'abord que le partage est équitable, avant de compter les parts.",
      "Si les parts ne sont pas égales, on ne peut pas dire « un quart » : chaque morceau vaudrait autre chose.",
      "Les parts doivent être toutes égales.",
    ),
    tags: ["ce2", "fraction", "unite", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Ce disque est partagé en 3 morceaux, mais ils ne sont pas de la même taille. Peut-on dire qu'un morceau est un tiers ?",
    format: "qcm",
    choices: ["non", "oui", "oui, si on prend le plus grand", "oui, si on prend le plus petit"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte les morceaux, puis regarde s'ils se ressemblent.",
    explanation: exp(
      "Une fraction partage un tout en parts toutes égales.",
      "On compte les parts, mais on vérifie surtout qu'elles sont de même taille.",
      "Il y a bien 3 morceaux, mais ils sont inégaux. Aucun ne vaut un tiers : trois morceaux inégaux ne font pas trois tiers.",
      "Non, on ne peut pas parler de tiers ici.",
    ),
    tags: ["ce2", "fraction", "unite", "piege", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "circle",
      fraction: { numerator: 1, denominator: 3 },
      display: { showFraction: false, showParts: true, unequalParts: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_fraction_unite_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_unite",
    difficulty: 3,
    theme: "reunion",
    text: "Maman a coupé un gâteau patate en 8 parts égales. Combien de parts faut-il prendre pour avoir le gâteau entier ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le gâteau entier, c'est toutes les parts.",
    explanation: exp(
      "Le tout, c'est l'ensemble des parts réunies.",
      "On regarde en combien de parts le tout a été partagé.",
      "Le gâteau est partagé en 8 parts. Pour l'avoir entier, il faut les 8 : huit huitièmes font un gâteau.",
      "Il faut 8 parts.",
    ),
    tags: ["ce2", "fraction", "unite", "reunion", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_fraction_unite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre du bas dit en combien de parts on a partagé.",
    tags: ["ce2", "fraction", "unite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const objet = randomChoice(["une tablette de chocolat", "une pizza", "un ruban", "une tarte"]);
      return {
        text: `On partage ${objet} en parts égales pour obtenir des ${nomFraction(1, d).split(" ")[1]}. En combien de parts faut-il la partager ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre du bas d'une fraction dit en combien de parts égales le tout est partagé.",
          "On écoute le nom de la part : des quarts viennent d'un partage en 4.",
          `Pour obtenir des ${nomFraction(1, d).split(" ")[1]}, on partage en ${d} parts égales.`,
          `Il faut ${d} parts.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_unite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde bien si toutes les parts se ressemblent.",
    tags: ["ce2", "fraction", "unite", "piege", "template", "canvas"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);
      const egales = randomChoice([true, false]);
      return {
        text: egales
          ? `Ce disque est partagé en ${d} parts. Peut-on parler de ${nomFraction(1, d).split(" ")[1]} ?`
          : `Ce disque est partagé en ${d} morceaux de tailles différentes. Peut-on parler de ${nomFraction(1, d).split(" ")[1]} ?`,
        format: "qcm",
        choices: makeChoices(egales ? "oui" : "non", ["oui", "non", "seulement pour le plus grand", "on ne peut pas savoir"]),
        expected: [egales ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction partage un tout en parts toutes égales.",
          "On compte les parts, puis on vérifie qu'elles ont la même taille.",
          egales
            ? `Les ${d} parts sont égales : chacune vaut bien un ${nomFraction(1, d).split(" ")[1].replace(/s$/, "")}.`
            : `Il y a bien ${d} morceaux, mais ils sont inégaux : aucun ne vaut un ${nomFraction(1, d).split(" ")[1].replace(/s$/, "")}.`,
          egales ? "Oui." : "Non.",
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
     CE2_FRACTION_LIRE — lire et nommer
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_lire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la fraction 3/4, que veut dire le nombre du bas, le 4 ?",
    format: "qcm",
    choices: [
      "le tout est partagé en 4 parts égales",
      "on prend 4 parts",
      "il reste 4 parts",
      "la part vaut 4",
    ],
    expected: ["le tout est partagé en 4 parts égales"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas se lit en dernier : « quarts ».",
    explanation: exp(
      "Dans une fraction, le nombre du bas dit en combien de parts on partage, celui du haut combien on en prend.",
      "On lit d'abord le bas pour savoir de quelles parts on parle.",
      "Le 4 dit que le tout est partagé en 4 parts égales : ce sont des quarts. Le 3 dit qu'on en prend 3.",
      "Le nombre du bas donne le nombre de parts du partage.",
    ),
    tags: ["ce2", "fraction", "lire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_lire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment se lit la fraction 1/2 ?",
    format: "qcm",
    choices: ["un demi", "un deuxième", "deux uns", "un sur deux parts"],
    expected: ["un demi"],
    comparator: "mcq_exact",
    hint: "C'est la moitié, et elle a un nom bien à elle.",
    explanation: exp(
      "Certaines fractions ont un nom particulier, qui ne suit pas la règle des « -ièmes ».",
      "On retient les trois exceptions : 1/2 se dit un demi, 1/3 un tiers, 1/4 un quart.",
      "1/2 se lit « un demi », jamais « un deuxième ». À partir de 5, on dit « un cinquième », « un dixième ».",
      "1/2 se lit un demi.",
    ),
    tags: ["ce2", "fraction", "lire", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_lire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction s'écrit avec le même nombre en haut et en bas, et vaut le tout entier ?",
    format: "qcm",
    choices: ["4/4", "1/4", "4/1", "0/4"],
    expected: ["4/4"],
    comparator: "mcq_exact",
    hint: "Prendre toutes les parts, c'est prendre le gâteau entier.",
    explanation: exp(
      "Quand on prend autant de parts que le partage en a fait, on a le tout.",
      "On compare le nombre du haut à celui du bas.",
      "4/4 veut dire : le tout est partagé en 4 parts, et on prend les 4. On a donc le tout, c'est-à-dire 1.",
      "4/4 vaut 1.",
    ),
    tags: ["ce2", "fraction", "lire", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_lire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre du haut se lit en premier.",
    tags: ["ce2", "fraction", "lire", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(1, d - 1);
      const bonne = nomFraction(n, d);
      const autreD = randomChoice([2, 3, 4, 5, 10].filter((x) => x !== d));
      return {
        text: `Comment se lit la fraction ${n}/${d} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          nomFraction(n, autreD),
          nomFraction(d - n, d),
          `${n} sur ${d} parts`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On lit d'abord le nombre du haut, puis le nom que donne celui du bas.",
          "Le bas dit de quelles parts il s'agit, le haut combien on en prend.",
          `Le ${d} du bas donne des ${nomFraction(1, d).split(" ")[1]}, et le ${n} du haut dit qu'on en prend ${n}.`,
          `${n}/${d} se lit « ${bonne} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_lire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "En combien de parts le tout est-il partagé ? C'est le nombre du bas.",
    tags: ["ce2", "fraction", "lire", "template", "canvas"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 8]);
      const n = randomInt(1, d - 1);
      return {
        text: "Quelle fraction du disque est coloriée ?",
        format: "qcm",
        choices: makeChoices(`${n}/${d}`, [
          `${d}/${n}`,
          `${d - n}/${d}`,
          `${n}/${d + 1}`,
          `${n + 1}/${d}`,
        ]),
        expected: [`${n}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre du bas compte toutes les parts, celui du haut les parts coloriées.",
          "On compte d'abord le nombre total de parts, puis celles qui sont coloriées.",
          `Le disque est partagé en ${d} parts égales et ${n} sont coloriées : c'est ${n}/${d}, soit ${nomFraction(n, d)}.`,
          `La fraction coloriée est ${n}/${d}.`,
        ),
        canvas: fractionCanvas({
          model: "circle",
          fraction: { numerator: n, denominator: d },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_REPRESENTER — représenter une fraction
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_representer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 2/5 d'une bande, que fait-on ?",
    format: "qcm",
    choices: [
      "on partage la bande en 5 et on colorie 2 parts",
      "on partage la bande en 2 et on colorie 5 parts",
      "on partage la bande en 7 et on colorie 2 parts",
      "on colorie 2 bandes sur 5 bandes",
    ],
    expected: ["on partage la bande en 5 et on colorie 2 parts"],
    comparator: "mcq_exact",
    hint: "On partage toujours d'abord, on colorie ensuite.",
    explanation: exp(
      "Représenter une fraction, c'est partager le tout puis colorier.",
      "Le nombre du bas donne le partage, celui du haut le nombre de parts à colorier.",
      "Pour 2/5 : on partage la bande en 5 parts égales, puis on en colorie 2.",
      "On partage en 5, on colorie 2.",
    ),
    tags: ["ce2", "fraction", "representer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_representer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_representer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut colorier 3/4 d'une bande. Il la partage en 4 et colorie 3 parts... mais ses parts n'ont pas la même taille. A-t-il bien représenté 3/4 ?",
    format: "qcm",
    choices: ["non", "oui", "oui, s'il a colorié les 3 plus grandes", "oui, il y a bien 4 parts"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le nombre de parts est bon. Et leur taille ?",
    explanation: exp(
      "Représenter une fraction demande des parts égales, pas seulement le bon nombre de parts.",
      "On vérifie les deux : combien de parts, et sont-elles de même taille ?",
      "Il a bien fait 4 parts et en a colorié 3, mais des parts inégales ne sont pas des quarts. Sa figure ne montre pas 3/4.",
      "Non, le partage doit être en parts égales.",
    ),
    tags: ["ce2", "fraction", "representer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_representer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cases coloriées, puis toutes les cases.",
    tags: ["ce2", "fraction", "representer", "template", "canvas"],
    generate: () => {
      const cols = randomChoice([4, 5, 6, 8, 10]);
      const shaded = randomInt(1, cols - 1);
      return {
        text: "Quelle fraction de la bande est coloriée ?",
        format: "qcm",
        choices: makeChoices(`${shaded}/${cols}`, [
          `${cols}/${shaded}`,
          `${cols - shaded}/${cols}`,
          `${shaded}/${cols - shaded}`,
          `${shaded + 1}/${cols}`,
        ]),
        expected: [`${shaded}/${cols}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre du bas compte toutes les parts, celui du haut les parts coloriées.",
          "On compte les cases coloriées, puis le nombre total de cases.",
          `La bande a ${cols} cases égales et ${shaded} sont coloriées : la fraction est ${shaded}/${cols}.`,
          `${shaded}/${cols} de la bande est coloriée.`,
        ),
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: 1, cols, shaded },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_representer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas dit en combien de parts partager.",
    tags: ["ce2", "fraction", "representer", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10]);
      const n = randomInt(1, d - 1);
      return {
        text: `Pour colorier ${n}/${d} d'une bande, en combien de parts égales faut-il d'abord la partager ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre du bas donne le partage, celui du haut le nombre de parts coloriées.",
          "On partage d'abord, on colorie ensuite.",
          `Pour ${n}/${d}, on partage en ${d} parts égales, puis on en colorie ${n}.`,
          `Il faut ${d} parts.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_EGALITE — reconnaître deux fractions égales
     Au CE2 on ne simplifie pas : on constate sur le dessin
     que deux écritures recouvrent la même surface.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_egalite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur ces deux bandes identiques, une part de la première est coloriée et deux parts de la seconde. Les surfaces coloriées sont les mêmes. Quelle fraction est égale à 1/2 ?",
    format: "qcm",
    choices: ["2/4", "2/2", "1/4", "4/2"],
    expected: ["2/4"],
    comparator: "mcq_exact",
    hint: "Deux quarts couvrent autant qu'un demi.",
    explanation: exp(
      "Deux fractions sont égales quand elles couvrent la même part du tout.",
      "On superpose les deux bandes et on compare les surfaces coloriées.",
      "Couper chaque moitié en deux donne des quarts : la moitié en contient 2. Donc 1/2 = 2/4.",
      "2/4 est égale à 1/2.",
    ),
    tags: ["ce2", "fraction", "egalite", "remarquable", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 1, denominator: 2, label: "1/2" },
        { numerator: 2, denominator: 4, label: "2/4" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_fraction_egalite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_egalite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 1/3 est plus grand que 1/2, parce que 3 est plus grand que 2 ». A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car il y a plus de parts", "on ne peut pas comparer"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Préfères-tu partager un gâteau entre 2 personnes ou entre 3 ?",
    explanation: exp(
      "Plus on partage un tout en parts nombreuses, plus chaque part est petite.",
      "On compare la taille des parts, pas le nombre du bas.",
      "Partagé entre 3, le gâteau donne des parts plus petites que partagé entre 2. Donc 1/3 est PLUS PETIT que 1/2.",
      "Non, c'est l'inverse.",
    ),
    tags: ["ce2", "fraction", "egalite", "piege", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 1, denominator: 2, label: "1/2" },
        { numerator: 1, denominator: 3, label: "1/3" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "template",
    id: "ce2_fraction_egalite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Coupe chaque part en deux : combien en obtiens-tu ?",
    tags: ["ce2", "fraction", "egalite", "template", "canvas"],
    generate: () => {
      const base = randomChoice([
        { n: 1, d: 2, n2: 2, d2: 4 },
        { n: 1, d: 2, n2: 5, d2: 10 },
        { n: 1, d: 3, n2: 2, d2: 6 },
        { n: 1, d: 4, n2: 2, d2: 8 },
        { n: 2, d: 3, n2: 4, d2: 6 },
        { n: 3, d: 4, n2: 6, d2: 8 },
      ]);
      return {
        text: `Sur ces deux bandes identiques, quelle fraction couvre exactement la même surface que ${base.n}/${base.d} ?`,
        format: "qcm",
        choices: makeChoices(`${base.n2}/${base.d2}`, [
          `${base.d2}/${base.n2}`,
          `${base.n}/${base.d2}`,
          `${base.n2}/${base.d}`,
          `${base.n2 + 1}/${base.d2}`,
        ]),
        expected: [`${base.n2}/${base.d2}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions sont égales quand elles couvrent la même part du tout.",
          "On regarde les deux bandes superposées et on compare les surfaces coloriées.",
          `Les deux surfaces coloriées se recouvrent exactement : ${base.n}/${base.d} = ${base.n2}/${base.d2}.`,
          `C'est ${base.n2}/${base.d2}.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: base.n, denominator: base.d, label: `${base.n}/${base.d}` },
            { numerator: base.n2, denominator: base.d2, label: `${base.n2}/${base.d2}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_egalite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_egalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre du haut : c'est le partage qui décide, et il décide à l'envers.",
    tags: ["ce2", "fraction", "egalite", "comparer", "template", "canvas"],
    generate: () => {
      const [petit, grand] = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 2).sort((a, b) => a - b);
      return {
        text: `Laquelle de ces deux fractions est la PLUS GRANDE : 1/${petit} ou 1/${grand} ?`,
        format: "qcm",
        choices: makeChoices(`1/${petit}`, [`1/${grand}`, "elles sont égales", "on ne peut pas savoir"]),
        expected: [`1/${petit}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Plus on partage un tout en parts nombreuses, plus chaque part est petite.",
          "Quand le nombre du haut est le même, on regarde celui du bas — et il décide à l'envers.",
          `Partager en ${petit} donne des parts plus grosses que partager en ${grand}. Donc 1/${petit} est plus grande que 1/${grand}.`,
          `1/${petit} est la plus grande.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: 1, denominator: petit, label: `1/${petit}` },
            { numerator: 1, denominator: grand, label: `1/${grand}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_BANDE_UNITE — la bande unité
     Le report d'une unité de longueur : ce que le BO appelle
     « exprimer une longueur avec la bande unité ».
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_bande_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_bande_unite",
    difficulty: 2,
    theme: "neutral",
    text: "On mesure un segment avec une bande unité. Le segment est aussi long que 3 quarts de la bande. Quelle est sa longueur ?",
    format: "qcm",
    choices: ["3/4 d'unité", "4/3 d'unité", "3 unités", "4 unités"],
    expected: ["3/4 d'unité"],
    comparator: "mcq_exact",
    hint: "Le nombre de parts prises va en haut, le partage en bas.",
    explanation: exp(
      "La bande unité sert de règle : on exprime la longueur en parts de bande.",
      "On compte en combien de parts la bande est partagée, puis combien de parts couvre le segment.",
      "La bande est partagée en 4 parts et le segment en couvre 3 : il mesure 3/4 d'unité.",
      "Le segment mesure 3/4 d'unité.",
    ),
    tags: ["ce2", "fraction", "bande_unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_bande_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_bande_unite",
    difficulty: 4,
    theme: "neutral",
    text: "Deux élèves mesurent le même segment. Léa utilise une bande partagée en 2, Kevin une bande partagée en 4. Léa trouve 1/2, Kevin trouve 2/4. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux, c'est la même longueur",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux, c'est la même longueur"],
    comparator: "mcq_exact",
    hint: "1/2 et 2/4, est-ce que ça couvre pareil ?",
    explanation: exp(
      "Une même longueur peut s'écrire avec plusieurs fractions égales.",
      "On compare les deux résultats en regardant s'ils couvrent la même part de bande.",
      "1/2 et 2/4 recouvrent exactement la même longueur. Léa a partagé en 2, Kevin en 4 : les deux mesures sont justes et disent la même chose.",
      "Les deux ont raison.",
    ),
    tags: ["ce2", "fraction", "bande_unite", "egalite", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_bande_unite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_bande_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de parts le segment couvre-t-il, sur le nombre total de parts ?",
    tags: ["ce2", "fraction", "bande_unite", "template", "canvas"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 8]);
      const n = randomInt(1, d - 1);
      return {
        text: `La bande unité est partagée en ${d} parts égales. Un segment couvre ${n} de ces parts. Quelle est sa longueur ?`,
        format: "qcm",
        choices: makeChoices(`${n}/${d} d'unité`, [
          `${d}/${n} d'unité`,
          `${d - n}/${d} d'unité`,
          `${n} unités`,
        ]),
        expected: [`${n}/${d} d'unité`],
        comparator: "mcq_exact",
        explanation: exp(
          "La bande unité sert de règle : on exprime la longueur en parts de bande.",
          "Le nombre de parts couvertes va en haut, le nombre de parts du partage en bas.",
          `La bande est partagée en ${d} parts et le segment en couvre ${n} : il mesure ${n}/${d} d'unité, soit ${nomFraction(n, d)} d'unité.`,
          `Le segment mesure ${n}/${d} d'unité.`,
        ),
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: 1, cols: d, shaded: n },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_bande_unite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_bande_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas dit en combien de parts la bande est partagée.",
    tags: ["ce2", "fraction", "bande_unite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 10]);
      const n = randomInt(1, d - 1);
      return {
        text: `Un ruban mesure ${n}/${d} d'unité. En combien de parts égales la bande unité a-t-elle été partagée ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une fraction, le nombre du bas dit en combien de parts le tout est partagé.",
          "On lit le nombre du bas, sans se laisser distraire par celui du haut.",
          `Dans ${n}/${d}, le ${d} du bas dit que la bande est partagée en ${d} parts. Le ${n} dit combien de parts le ruban couvre.`,
          `La bande est partagée en ${d} parts.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_DROITE — placer sur une droite graduée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_droite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite graduée, entre 0 et 1, où se place 1/2 ?",
    format: "qcm",
    choices: [
      "exactement au milieu",
      "juste après le 0",
      "juste avant le 1",
      "au-delà du 1",
    ],
    expected: ["exactement au milieu"],
    comparator: "mcq_exact",
    hint: "Un demi, c'est la moitié du chemin.",
    explanation: exp(
      "Sur une droite graduée, une fraction se place entre 0 et 1 selon la part du chemin qu'elle représente.",
      "On partage le segment de 0 à 1 en autant de parts que l'indique le nombre du bas.",
      "1/2, c'est une part sur les deux : on est à la moitié du chemin entre 0 et 1.",
      "1/2 se place au milieu.",
    ),
    tags: ["ce2", "fraction", "droite", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_droite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une droite graduée entre 0 et 1, un élève place 3/4 avant 1/2. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car 3 est plus petit que 4", "on ne peut pas savoir"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Trois quarts du chemin, est-ce avant ou après la moitié ?",
    explanation: exp(
      "Plus la fraction est grande, plus elle est loin du 0 sur la droite.",
      "On compare les deux fractions avant de les placer.",
      "1/2 vaut 2/4. Or 3/4 est plus grand que 2/4 : 3/4 se place APRÈS 1/2, plus près du 1.",
      "Non, 3/4 vient après 1/2.",
    ),
    tags: ["ce2", "fraction", "droite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_droite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les graduations depuis le 0.",
    tags: ["ce2", "fraction", "droite", "template", "canvas"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const n = randomInt(1, d - 1);
      return {
        text: "Quelle fraction est marquée par la flèche sur cette droite graduée ?",
        format: "qcm",
        choices: makeChoices(`${n}/${d}`, [
          `${d}/${n}`,
          `${d - n}/${d}`,
          `${n}/${d + 1}`,
          `${n + 1}/${d}`,
        ]),
        expected: [`${n}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Entre 0 et 1, la droite est partagée en autant de parts que le nombre du bas.",
          "On compte le nombre de graduations entre 0 et 1, puis on compte jusqu'à la flèche.",
          `Le segment de 0 à 1 est partagé en ${d} parts égales, et la flèche est sur la ${n}ᵉ : c'est ${n}/${d}.`,
          `La flèche marque ${n}/${d}.`,
        ),
        canvas: numberLine({
          min: 0,
          max: 1,
          step: 1 / d,
          points: [{ value: n / d, label: "?", color: "#ef4444" }],
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_droite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas donne le nombre de parts entre 0 et 1.",
    tags: ["ce2", "fraction", "droite", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10]);
      return {
        text: `Pour placer des ${nomFraction(1, d).split(" ")[1]} sur une droite graduée, en combien de parts égales faut-il partager le segment entre 0 et 1 ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une droite graduée, le segment de 0 à 1 se partage en autant de parts que le nombre du bas.",
          "On écoute le nom de la fraction pour retrouver ce nombre.",
          `Des ${nomFraction(1, d).split(" ")[1]} viennent d'un partage en ${d}. On partage donc le segment de 0 à 1 en ${d} parts égales.`,
          `Il faut ${d} parts.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_COMPARER_UNITE — comparer à 1
     Au CE2 les fractions sont ≤ 1 : la question est donc
     « est-ce le tout, ou moins que le tout ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Quand une fraction est-elle égale à 1 ?",
    format: "qcm",
    choices: [
      "quand le nombre du haut est égal à celui du bas",
      "quand le nombre du haut est 1",
      "quand le nombre du bas est 1",
      "quand les deux nombres sont pairs",
    ],
    expected: ["quand le nombre du haut est égal à celui du bas"],
    comparator: "mcq_exact",
    hint: "Prendre toutes les parts, c'est prendre le tout.",
    explanation: exp(
      "Une fraction vaut 1 quand on prend autant de parts que le partage en a fait.",
      "On compare le nombre du haut à celui du bas.",
      "3/3, 5/5, 10/10 valent toutes 1 : on prend toutes les parts, donc le tout entier.",
      "La fraction vaut 1 quand haut et bas sont égaux.",
    ),
    tags: ["ce2", "fraction", "comparer_unite", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer_unite",
    difficulty: 4,
    theme: "reunion",
    text: "Pour la fête de l'école à Saint-Pierre, on a mangé 7/8 d'un gâteau. En reste-t-il ?",
    format: "qcm",
    choices: [
      "oui, il reste un huitième",
      "non, le gâteau est fini",
      "oui, il reste la moitié",
      "on ne peut pas savoir",
    ],
    expected: ["oui, il reste un huitième"],
    comparator: "mcq_exact",
    hint: "Le gâteau entier, ce serait 8/8. On en a mangé 7.",
    explanation: exp(
      "Une fraction plus petite que 1 ne couvre pas tout le tout.",
      "On compare la fraction mangée au gâteau entier, qui vaut 8/8.",
      "Le gâteau entier fait 8 parts, soit 8/8. On en a mangé 7, il en reste donc 1 : un huitième.",
      "Oui, il reste 1/8 du gâteau.",
    ),
    tags: ["ce2", "fraction", "comparer_unite", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_comparer_unite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le nombre du haut à celui du bas.",
    tags: ["ce2", "fraction", "comparer_unite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const egale = randomChoice([true, false, false]);
      const n = egale ? d : randomInt(1, d - 1);
      return {
        text: `La fraction ${n}/${d} est-elle égale au tout, ou plus petite que le tout ?`,
        format: "qcm",
        choices: makeChoices(egale ? "égale au tout" : "plus petite que le tout", [
          "égale au tout",
          "plus petite que le tout",
          "plus grande que le tout",
        ]),
        expected: [egale ? "égale au tout" : "plus petite que le tout"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction vaut 1 quand le nombre du haut égale celui du bas.",
          "On compare les deux nombres de la fraction.",
          egale
            ? `Le haut et le bas valent tous les deux ${d} : on prend les ${d} parts sur ${d}, donc le tout entier.`
            : `Le haut vaut ${n} et le bas ${d}. On prend ${n} parts sur ${d} : il en manque ${d - n} pour avoir le tout.`,
          egale ? `${n}/${d} est égale au tout.` : `${n}/${d} est plus petite que le tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_comparer_unite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tout, c'est toutes les parts. Combien en manque-t-il ?",
    tags: ["ce2", "fraction", "comparer_unite", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10]);
      const n = randomInt(1, d - 1);
      return {
        text: `On a colorié ${n}/${d} d'une bande. Combien de parts reste-t-il à colorier pour avoir la bande entière ?`,
        format: "short",
        expected: [String(d - n)],
        comparator: "number_equal",
        explanation: exp(
          "La bande entière, c'est toutes les parts du partage.",
          "On retire les parts déjà coloriées du nombre total de parts.",
          `La bande a ${d} parts et ${n} sont coloriées : ${d} - ${n} = ${d - n}. Il reste ${d - n} parts.`,
          `Il reste ${d - n} parts à colorier.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FRACTION_DEFI — les défis
     Ce qui ne se réduit pas à appliquer une règle : les
     erreurs qui reviennent, et les cas où il faut choisir.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Deux familles achètent le même gâteau. Chez Malia, on le partage entre 4 personnes ; chez Kevin, entre 6. Qui aura la plus grosse part ?",
    format: "qcm",
    choices: [
      "chez Malia",
      "chez Kevin",
      "les parts seront pareilles",
      "on ne peut pas savoir",
    ],
    expected: ["chez Malia"],
    comparator: "mcq_exact",
    hint: "Le même gâteau, mais partagé entre moins de personnes.",
    explanation: exp(
      "Plus on partage un tout entre un grand nombre, plus chaque part est petite.",
      "On compare le nombre de parts, sachant que le gâteau est le même.",
      "Chez Malia, chacun a 1/4 du gâteau ; chez Kevin, 1/6. Or un quart est plus gros qu'un sixième : le gâteau y est coupé en moins de morceaux.",
      "C'est chez Malia que les parts sont les plus grosses.",
    ),
    tags: ["ce2", "fraction", "defi", "reunion", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève colorie 2 cases sur une bande de 6 cases et dit : « j'ai colorié 2/6, donc plus que 1/3 ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 2/6 et 1/3 c'est pareil",
      "oui, 2 est plus grand que 1",
      "oui, 6 est plus grand que 3",
      "non, 2/6 est plus petit",
    ],
    expected: ["non, 2/6 et 1/3 c'est pareil"],
    comparator: "mcq_exact",
    hint: "Groupe les 6 cases deux par deux : combien de groupes ?",
    explanation: exp(
      "Deux fractions différentes peuvent couvrir exactement la même part du tout.",
      "On regroupe les cases pour retrouver un partage plus simple.",
      "Six cases groupées deux par deux font 3 groupes, et les 2 cases coloriées en remplissent exactement 1. Donc 2/6 = 1/3 : c'est la même surface.",
      "Non, 2/6 et 1/3 valent la même chose.",
    ),
    tags: ["ce2", "fraction", "defi", "egalite", "piege", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 2, denominator: 6, label: "2/6" },
        { numerator: 1, denominator: 3, label: "1/3" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "template",
    id: "ce2_fraction_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche d'abord ce que vaut une seule part.",
    tags: ["ce2", "fraction", "defi", "reunion", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5]);
      const parPart = randomChoice([3, 4, 5, 6, 8, 10]);
      const total = d * parPart;
      const objet = randomChoice([
        { nom: "letchis", lieu: "au marché de Saint-Paul" },
        { nom: "samoussas", lieu: "au snack de l'Étang-Salé" },
        { nom: "billes", lieu: "dans la cour" },
      ]);
      return {
        text: `Il y a ${total} ${objet.nom} ${objet.lieu}. On en prend ${nomFraction(1, d)}. Combien cela fait-il de ${objet.nom} ?`,
        format: "short",
        expected: [String(parPart)],
        comparator: "number_equal",
        explanation: exp(
          "Prendre une fraction d'une quantité, c'est partager cette quantité puis en prendre des parts.",
          "On partage d'abord le total en autant de parts que l'indique le nombre du bas.",
          `On partage ${total} en ${d} parts égales : ${total} ÷ ${d} = ${parPart}. Un ${nomFraction(1, d).split(" ")[1].replace(/s$/, "")} vaut donc ${parPart} ${objet.nom}.`,
          `Cela fait ${parPart} ${objet.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le tout, c'est toutes les parts. Compte ce qui manque.",
    tags: ["ce2", "fraction", "defi", "template", "canvas"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8, 10]);
      const mange = randomInt(1, d - 1);
      return {
        text: `Un gâteau est partagé en ${d} parts égales. On en mange ${mange}. Quelle fraction du gâteau reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(`${d - mange}/${d}`, [
          `${mange}/${d}`,
          `${d}/${d - mange}`,
          `${d - mange}/${mange}`,
          `${d - mange}/${d - 1}`,
        ]),
        expected: [`${d - mange}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          `Le gâteau entier vaut toutes ses parts, ici ${d}/${d}.`,
          "On compte les parts qui restent, pas celles qui sont mangées.",
          `Le gâteau a ${d} parts et on en mange ${mange} : il en reste ${d} - ${mange} = ${d - mange}. La fraction qui reste est ${d - mange}/${d}.`,
          `Il reste ${d - mange}/${d} du gâteau.`,
        ),
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: 1, cols: d, shaded: d - mange },
          display: { showFraction: false, showParts: true },
        }),
      };
    },
  },
];
