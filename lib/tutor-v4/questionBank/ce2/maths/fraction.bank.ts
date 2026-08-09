// lib/tutor-v4/questionBank/ce2/maths/fraction.bank.ts
//
// Les fractions du CE2, écrites à la main. Jusqu'ici les huit
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « placer une fraction sur une droite graduée » et « comparer une
// fraction à l'unité » recevaient la même question.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025, cycle
// 2), repris mot pour mot du tableau CE2 : « Les fractions rencontrées au CE2
// ont un dénominateur inférieur ou égal à DOUZE et sont toutes INFÉRIEURES OU
// ÉGALES À UN. » La banque tire dans {2, 3, 4, 5, 6, 8, 10, 12}.
//
// ⚠️ L'ADDITION DE FRACTIONS EST AU PROGRAMME. Cet en-tête a longtemps affirmé
// le contraire — « tout cela arrive au CM1 et au CM2 ». C'était faux. Relu
// contre le tableau du BO le 09/08/2026 : « Additionner et soustraire des
// fractions » est l'un des quatre attendus de fin de CE2, et le CE1 le prépare
// déjà avec le dénominateur commun.
//
// Le CE2 va un cran plus loin que le CE1, et le texte le dit : l'élève sait
// additionner et soustraire « lorsque le dénominateur de l'une est un MULTIPLE
// du dénominateur de l'autre ». 1/2 + 1/4 est donc au programme — on récrit
// 1/2 en 2/4 et on retombe sur un partage commun. C'est là que l'égalité de
// fractions, travaillée juste avant, sert enfin à quelque chose.
//
// Restent hors CE2 : les dénominateurs sans rapport entre eux (1/3 + 1/4), la
// fraction plus grande que 1 et la simplification.
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
    12: ["douzième", "douzièmes"],
  };
  const [sing, plur] = noms[d] ?? [`${d}ème`, `${d}èmes`];
  const chiffres = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  return `${chiffres[n] ?? n} ${n > 1 ? plur : sing}`;
}

// Les couples que le CE2 sait traiter quand les partages diffèrent : le second
// dénominateur est un MULTIPLE du premier, et il ne dépasse pas douze. Hors de
// cette liste (1/3 + 1/4), on sort du programme.
const PAIRES_MULTIPLES = [
  { d: 2, D: 4 },
  { d: 2, D: 6 },
  { d: 2, D: 8 },
  { d: 2, D: 10 },
  { d: 2, D: 12 },
  { d: 3, D: 6 },
  { d: 3, D: 12 },
  { d: 4, D: 8 },
  { d: 4, D: 12 },
  { d: 5, D: 10 },
  { d: 6, D: 12 },
] as const;

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
      // ⚠️ Quand le numérateur vaut la moitié du dénominateur — 1/2, 2/4 —
      // le piège `nomFraction(d - n, d)` retombe sur la bonne réponse et
      // disparait au tri : le QCM se présentait alors à trois lignes sur
      // 30 % des tirages. Un second dénominateur de secours ferme le trou.
      const restants = [2, 3, 4, 5, 10].filter((x) => x !== d);
      const autreD = randomChoice(restants);
      const autreD2 = randomChoice(restants.filter((x) => x !== autreD));
      return {
        text: `Comment se lit la fraction ${n}/${d} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          nomFraction(n, autreD),
          nomFraction(n, autreD2),
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
     CE2_FRACTION_ADD_SOUS — additionner et soustraire
     Résultat au plus égal à 1. Deux cas, dans cet ordre :
     le dénominateur COMMUN, puis le dénominateur de l'une
     MULTIPLE de celui de l'autre (1/2 + 1/4).
     Ce qui se joue ici : le nombre du bas ne bouge pas. Il dit
     en combien de parts on a coupé, et personne n'a recoupé
     entre les deux morceaux. On ajoute des parts, pas des
     partages : 1/4 + 2/4 = 3/4, jamais 3/8.
     Et quand les partages diffèrent, on ne les additionne pas
     davantage : on recoupe le plus grand pour retomber sur le
     plus fin, et là seulement on compte.
  ========================================================= */
  // ⚠️ Les deux premiers items de cette micro étaient figés — une tarte en
  // cinquièmes, un 2/7 + 3/7. Rien n'y tenait au nombre : ce sont des calculs,
  // pas des cas remarquables. Devenus les gabarits tpl_7 et tpl_8, en bas de
  // section. Les quatre `fixed` qui restent gagnent leur place : 5/5 qui vaut
  // le tout, la marmite, 1/2 + 1/4, et l'exemple littéral du programme.
  {
    kind: "fixed",
    id: "ce2_fraction_add_sous_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 3,
    theme: "neutral",
    text: "Un gâteau est coupé en 5 parts égales. Kevin en prend 2/5 et Maya 3/5. Quelle part du gâteau ont-ils prise à eux deux ?",
    format: "qcm",
    choices: [
      "5/5, c'est-à-dire le gâteau entier",
      "5/10",
      "6/5",
      "1/5",
    ],
    expected: ["5/5, c'est-à-dire le gâteau entier"],
    comparator: "mcq_exact",
    hint: "Toutes les parts sont prises. Combien y en avait-il ?",
    explanation: exp(
      "Quand le nombre du haut rejoint le nombre du bas, la fraction vaut le tout : 5/5 = 1.",
      "On additionne les parts prises et on garde le partage.",
      "2 parts + 3 parts = 5 parts, et le gâteau en comptait 5 : 2/5 + 3/5 = 5/5. Les deux ont pris tout le gâteau, il n'en reste rien.",
      "Ils ont pris 5/5 du gâteau, c'est-à-dire le gâteau entier.",
    ),
    tags: ["ce2", "fraction", "addition", "unite", "piege", "qcm"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 2, denominator: 5, label: "2/5" },
        { numerator: 3, denominator: 5, label: "3/5" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_fraction_add_sous_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 4,
    theme: "neutral",
    text: "Une marmite de cari est pleine aux 3/4. La famille en mange 2/4. Quelle part de la marmite reste-t-il ?",
    format: "qcm",
    choices: ["1/4", "1/8", "5/4", "1/0"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "3 parts moins 2 parts. Et la marmite, elle est toujours coupée en 4.",
    explanation: exp(
      "Pour soustraire deux fractions qui ont le même nombre du bas, on retire les parts et on garde le partage.",
      "On enlève le nombre de parts mangées au nombre de parts qu'il y avait.",
      "3 parts − 2 parts = 1 part, sur une marmite partagée en 4 : 3/4 − 2/4 = 1/4. Le nombre du bas ne se soustrait pas — 4 − 4 ferait 0, et une part sur zéro part ne veut rien dire.",
      "Il reste 1/4 de la marmite.",
    ),
    tags: ["ce2", "fraction", "soustraction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_add_sous_fixed_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 1/2 + 1/4 ?",
    format: "qcm",
    choices: ["3/4", "2/6", "2/4", "1/6"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Les deux partages ne sont pas les mêmes. Coupe la moitié en deux : combien de quarts ça fait ?",
    explanation: exp(
      "Pour additionner deux fractions dont les partages diffèrent, on ramène d'abord les deux au même partage.",
      "Ici, 4 est le double de 2 : chaque demi se recoupe en 2 quarts. On récrit donc 1/2 en 2/4.",
      "1/2 = 2/4, donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Le partage commun est le quart, et on en compte 3.",
      "1/2 + 1/4 = 3/4.",
    ),
    tags: ["ce2", "fraction", "addition", "denominateur_multiple", "piege", "qcm"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 1, denominator: 2, label: "1/2" },
        { numerator: 1, denominator: 4, label: "1/4" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_fraction_add_sous_fixed_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 5,
    theme: "neutral",
    text: "Un gâteau est partagé en dixièmes. Marc en mange 1/10, Ange 3/10 et Saïd 2/10. Quelle fraction du gâteau reste-t-il ?",
    format: "qcm",
    choices: ["4/10", "6/10", "5/10", "4/30"],
    expected: ["4/10"],
    comparator: "mcq_exact",
    hint: "Deux temps : ce qui est mangé, puis ce qui reste sur les 10 parts.",
    explanation: exp(
      "Quand plusieurs parts sont prises sur le même partage, on les additionne toutes, puis on retire le total du tout.",
      "On additionne d'abord les trois parts mangées, ensuite on soustrait du gâteau entier.",
      "1/10 + 3/10 + 2/10 = 6/10. Le gâteau entier vaut 10/10, donc il reste 10/10 − 6/10 = 4/10. Attention : 6/10 est ce qui a été mangé, pas ce qui reste.",
      "Il reste 4/10 du gâteau.",
    ),
    tags: ["ce2", "fraction", "addition", "soustraction", "probleme", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 2,
    theme: "neutral",
    hint: "Ajoute les nombres du haut. Celui du bas reste tel quel.",
    tags: ["ce2", "fraction", "addition", "template", "canvas"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(1, d - 2);
      const n2 = randomInt(1, d - 1 - n1);
      const somme = n1 + n2;
      return {
        text: `Combien font ${n1}/${d} + ${n2}/${d} ?`,
        format: "qcm",
        choices: makeChoices(`${somme}/${d}`, [
          `${somme}/${2 * d}`,
          `${somme + 1}/${d}`,
          `${somme - 1}/${d}`,
          `${d}/${somme}`,
        ]),
        expected: [`${somme}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions de même dénominateur s'additionnent en ajoutant les numérateurs.",
          "On ajoute les nombres du haut, on recopie le nombre du bas.",
          `${n1} + ${n2} = ${somme}, et le tout reste partagé en ${d} : ${n1}/${d} + ${n2}/${d} = ${somme}/${d}, soit ${nomFraction(somme, d)}.`,
          `${n1}/${d} + ${n2}/${d} = ${somme}/${d}.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: n1, denominator: d, label: `${n1}/${d}` },
            { numerator: n2, denominator: d, label: `${n2}/${d}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 3,
    theme: "neutral",
    hint: "Retire les nombres du haut. Celui du bas ne bouge pas.",
    tags: ["ce2", "fraction", "soustraction", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(2, d - 1);
      // On garde n1 + n2 au plus égal à d : le piège « il a additionné » doit
      // rester une fraction du répertoire du CE2, jamais plus grande que 1.
      const n2 = randomInt(1, Math.min(n1 - 1, d - n1));
      const reste = n1 - n2;
      return {
        text: `Combien font ${n1}/${d} − ${n2}/${d} ?`,
        format: "qcm",
        choices: makeChoices(`${reste}/${d}`, [
          `${n1 + n2}/${d}`,
          `${reste + 1}/${d}`,
          `${d}/${reste}`,
          `${reste}/${2 * d}`,
          `${n2}/${d}`,
        ]),
        expected: [`${reste}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions de même dénominateur se soustraient en retirant les numérateurs.",
          "On enlève le nombre du haut de la deuxième au nombre du haut de la première, et on recopie le nombre du bas.",
          `${n1} − ${n2} = ${reste}, et le tout reste partagé en ${d} : ${n1}/${d} − ${n2}/${d} = ${reste}/${d}.`,
          `${n1}/${d} − ${n2}/${d} = ${reste}/${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 4,
    theme: "neutral",
    hint: "Il manque des parts pour arriver au tout. Combien ?",
    tags: ["ce2", "fraction", "addition", "complement", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const n = randomInt(1, d - 1);
      const manque = d - n;
      return {
        text: `Quelle fraction faut-il ajouter à ${n}/${d} pour obtenir le tout ?`,
        format: "qcm",
        choices: makeChoices(`${manque}/${d}`, [
          `${n}/${d}`,
          `${manque}/${2 * d}`,
          `${d}/${manque}`,
          `${manque + 1}/${d}`,
        ]),
        expected: [`${manque}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          `Le tout, c'est ${d}/${d} : toutes les parts du partage.`,
          "On cherche combien de parts il manque pour avoir toutes les parts.",
          `Il y a ${n} parts sur ${d}, il en manque ${d} − ${n} = ${manque} : ${n}/${d} + ${manque}/${d} = ${d}/${d}, c'est-à-dire 1.`,
          `Il faut ajouter ${manque}/${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais d'abord le total des deux parts prises, puis regarde ce qui reste.",
    tags: ["ce2", "fraction", "addition", "soustraction", "probleme", "template"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(1, d - 3);
      const n2 = randomInt(1, d - 2 - n1);
      const pris = n1 + n2;
      const reste = d - pris;
      const objet = randomChoice([
        { nom: "une bouteille de jus de goyavier", part: "de la bouteille" },
        { nom: "un paquet de bonbons piments", part: "du paquet" },
        { nom: "une plaque de chocolat", part: "de la plaque" },
        { nom: "un gâteau patate", part: "du gâteau" },
      ]);
      return {
        text: `On partage ${objet.nom} en ${d} parts égales. Maya en prend ${n1}/${d} et Ryan ${n2}/${d}. Quelle part ${objet.part} reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(`${reste}/${d}`, [
          `${pris}/${d}`,
          `${reste}/${2 * d}`,
          `${reste + 1}/${d}`,
          `${d}/${reste}`,
        ]),
        expected: [`${reste}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "On additionne d'abord les parts prises, puis on les retire du tout.",
          "Deux étapes : le total pris, puis ce qui reste sur le partage complet.",
          `${n1}/${d} + ${n2}/${d} = ${pris}/${d}. Le tout vaut ${d}/${d}, donc il reste ${d}/${d} − ${pris}/${d} = ${reste}/${d}.`,
          `Il reste ${reste}/${d} ${objet.part}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 5,
    theme: "neutral",
    hint: "Les deux partages ne sont pas les mêmes. Recoupe le plus grand pour retomber sur le plus fin.",
    tags: ["ce2", "fraction", "addition", "denominateur_multiple", "template"],
    generate: () => {
      // Le CE2 s'arrête là : le dénominateur de l'une est un MULTIPLE de
      // l'autre. 1/3 + 1/4 n'est pas de ce niveau, la paire est donc choisie.
      const { d, D } = randomChoice(PAIRES_MULTIPLES);
      const k = D / d;
      const n1 = randomInt(1, d - 1);
      const n2 = randomInt(1, D - n1 * k);
      const somme = n1 * k + n2;
      return {
        text: `Combien font ${n1}/${d} + ${n2}/${D} ?`,
        format: "qcm",
        choices: makeChoices(`${somme}/${D}`, [
          `${n1 + n2}/${d + D}`,
          `${n1 + n2}/${D}`,
          `${n1 + n2}/${d}`,
          `${somme + 1}/${D}`,
        ]),
        expected: [`${somme}/${D}`],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne peut additionner des parts que si elles ont la même taille : il faut d'abord un partage commun.",
          `${D} est ${k} fois ${d} : chaque part de ${nomFraction(1, d)} se recoupe en ${k} parts de ${nomFraction(1, D)}. On récrit donc la première fraction.`,
          `${n1}/${d} = ${n1 * k}/${D}, donc ${n1}/${d} + ${n2}/${D} = ${n1 * k}/${D} + ${n2}/${D} = ${somme}/${D}.`,
          `${n1}/${d} + ${n2}/${D} = ${somme}/${D}.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: n1, denominator: d, label: `${n1}/${d}` },
            { numerator: n2, denominator: D, label: `${n2}/${D}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 5,
    theme: "neutral",
    hint: "Récris d'abord la première fraction avec le partage de la seconde, puis retire.",
    tags: ["ce2", "fraction", "soustraction", "denominateur_multiple", "template"],
    generate: () => {
      const { d, D } = randomChoice(PAIRES_MULTIPLES);
      const k = D / d;
      const n1 = randomInt(1, d);
      const n2 = randomInt(1, n1 * k - 1);
      const reste = n1 * k - n2;
      return {
        text: `Combien font ${n1}/${d} − ${n2}/${D} ?`,
        format: "qcm",
        choices: makeChoices(`${reste}/${D}`, [
          `${n1 * k + n2}/${D}`,
          `${reste + 1}/${D}`,
          `${reste}/${d}`,
          `${D}/${reste}`,
        ]),
        expected: [`${reste}/${D}`],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne peut retirer des parts que si elles ont la même taille : il faut d'abord un partage commun.",
          `${D} est ${k} fois ${d} : on recoupe chaque part de ${nomFraction(1, d)} en ${k}, ce qui donne des parts de ${nomFraction(1, D)}.`,
          `${n1}/${d} = ${n1 * k}/${D}, donc ${n1}/${d} − ${n2}/${D} = ${n1 * k}/${D} − ${n2}/${D} = ${reste}/${D}.`,
          `${n1}/${d} − ${n2}/${D} = ${reste}/${D}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_7",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 2,
    theme: "reunion",
    hint: "Le gâteau reste coupé pareil. Compte seulement les parts mangées.",
    tags: ["ce2", "fraction", "addition", "reunion", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(1, d - 2);
      const n2 = randomInt(1, d - 1 - n1);
      const somme = n1 + n2;
      // Le participe voyage AVEC l'objet — « un gâteau partagé », « une tarte
      // partagée ». Et la question se pose au passif : pas de pronom à
      // accorder sur un prénom, ce qui ne se devine pas.
      const scene = randomChoice([
        { prenom: "Léa", objet: "Une tarte à la vanille", partage: "partagée", part: "de la tarte" },
        { prenom: "Ryan", objet: "Un gâteau patate", partage: "partagé", part: "du gâteau" },
        { prenom: "Maya", objet: "Une brioche de Saint-André", partage: "partagée", part: "de la brioche" },
        { prenom: "Kevin", objet: "Un carré de chocolat", partage: "partagé", part: "du carré" },
      ]);
      return {
        text: `${scene.objet} est ${scene.partage} en ${d} parts égales. ${scene.prenom} en mange ${n1}/${d}, puis encore ${n2}/${d}. Quelle part ${scene.part} a été mangée en tout ?`,
        format: "qcm",
        choices: makeChoices(`${somme}/${d}`, [
          `${somme}/${2 * d}`,
          `${somme}/${d * d}`,
          `${somme + 1}/${d}`,
          `${d}/${somme}`,
        ]),
        expected: [`${somme}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour additionner deux fractions qui ont le même nombre du bas, on ajoute les parts et on garde le partage.",
          "On compte les parts prises. Le nombre du bas ne change pas : personne n'a recoupé entre les deux bouchées.",
          `${n1} part${n1 > 1 ? "s" : ""} + ${n2} part${n2 > 1 ? "s" : ""} = ${somme} parts, sur un tout coupé en ${d} : ${n1}/${d} + ${n2}/${d} = ${somme}/${d}.`,
          `${scene.prenom} en a mangé ${somme}/${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_add_sous_tpl_8",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_add_sous",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre du bas dit en combien de parts on a coupé. A-t-on recoupé entre les deux morceaux ?",
    tags: ["ce2", "fraction", "addition", "denominateur", "piege", "template"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(1, d - 2);
      const n2 = randomInt(1, d - 1 - n1);
      return {
        text: `Pour calculer ${n1}/${d} + ${n2}/${d}, que fait-on des nombres du bas ?`,
        format: "qcm",
        choices: makeChoices(`on garde ${d} : le partage n'a pas changé`, [
          `on les additionne, ça fait ${2 * d}`,
          `on les multiplie, ça fait ${d * d}`,
          "on prend le plus petit des deux",
          "on les enlève, il n'en reste aucun",
        ]),
        expected: [`on garde ${d} : le partage n'a pas changé`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre du bas d'une fraction dit en combien de parts égales le tout est partagé.",
          "On regarde ce qui a changé entre le début et la fin : le nombre de parts prises, pas le découpage.",
          `Le tout reste coupé en ${d} : ${n1}/${d} + ${n2}/${d} = ${n1 + n2}/${d}. Additionner les deux ${d} donnerait un partage en ${2 * d}, c'est-à-dire des parts deux fois plus petites — alors que personne n'a recoupé.`,
          `On garde ${d} au dénominateur.`,
        ),
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
        // ⚠️ `${d - n}/${d}` retombe sur la bonne réponse quand le segment
        // couvre juste la moitié de la bande — 1/2, 2/4, 3/6, 4/8 — et le QCM
        // tombait à trois lignes sur 26 % des tirages.
        choices: makeChoices(`${n}/${d} d'unité`, [
          `${d}/${n} d'unité`,
          `${d - n}/${d} d'unité`,
          `${n}/${d + 1} d'unité`,
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
     CE2_FRACTION_COMPARER — comparer deux fractions
     Trois cas, ceux du BO, et chacun a sa règle :
       • même nombre du bas : le plus grand du haut gagne ;
       • même nombre du haut : le plus grand du bas PERD ;
       • l'un multiple de l'autre : on récrit, puis on compare.
     LE PIÈGE est dans le deuxième cas, et il est joli : 1/8 est
     plus PETIT que 1/6 alors que 8 est plus GRAND que 6. Plus on
     partage un gâteau en morceaux nombreux, plus les morceaux
     sont petits. Le nombre du bas ne compte pas des parts : il
     compte des coups de couteau.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle est la plus grande : 5/12 ou 7/12 ?",
    format: "qcm",
    choices: ["7/12", "5/12", "elles sont égales", "on ne peut pas savoir"],
    expected: ["7/12"],
    comparator: "mcq_exact",
    hint: "Le partage est le même des deux côtés. Il ne reste qu'à compter les parts.",
    explanation: exp(
      "Quand deux fractions ont le même nombre du bas, elles sont faites de parts de même taille.",
      "On compare alors simplement le nombre de parts, c'est-à-dire les nombres du haut.",
      "Les deux fractions comptent des douzièmes, tous identiques. 7 douzièmes, c'est plus que 5 douzièmes : 7/12 est la plus grande.",
      "C'est 7/12.",
    ),
    tags: ["ce2", "fraction", "comparer", "meme_denominateur", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Laquelle est la plus grande : 5/12 ou 5/8 ?",
    format: "qcm",
    choices: ["5/8", "5/12", "elles sont égales", "on ne peut pas savoir"],
    expected: ["5/8"],
    comparator: "mcq_exact",
    hint: "On prend 5 parts des deux côtés. Où les parts sont-elles les plus grosses ?",
    explanation: exp(
      "Quand deux fractions ont le même nombre du haut, on prend autant de parts de chaque côté : c'est la taille des parts qui décide.",
      "On regarde le nombre du bas — et il décide à l'envers.",
      "Partager un gâteau en 8 donne des morceaux plus gros qu'en le partageant en 12. Cinq gros morceaux font plus que cinq petits : 5/8 est la plus grande, même si 12 est plus grand que 8.",
      "C'est 5/8.",
    ),
    tags: ["ce2", "fraction", "comparer", "meme_numerateur", "piege", "qcm"],
    canvas: fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: 5, denominator: 12, label: "5/12" },
        { numerator: 5, denominator: 8, label: "5/8" },
      ],
      display: { showFraction: true, showParts: true },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 1/8 est-il plus petit que 1/6, alors que 8 est plus grand que 6 ?",
    format: "qcm",
    choices: [
      "parce qu'en partageant en 8, les parts sont plus petites qu'en partageant en 6",
      "ce n'est pas vrai : 1/8 est plus grand que 1/6",
      "parce que 8 est un nombre pair",
      "parce qu'on prend une seule part des deux côtés",
    ],
    expected: [
      "parce qu'en partageant en 8, les parts sont plus petites qu'en partageant en 6",
    ],
    comparator: "mcq_exact",
    hint: "Un gâteau pour 8 invités ou pour 6 : dans quel cas ta part est-elle la plus grosse ?",
    explanation: exp(
      "Le nombre du bas ne compte pas des parts prises : il dit en combien de morceaux le tout a été coupé.",
      "Plus il est grand, plus il y a de morceaux — donc plus chaque morceau est petit.",
      "Un même gâteau partagé entre 8 personnes donne des parts plus petites que partagé entre 6. Prendre une de ces parts, c'est donc prendre moins : 1/8 est plus petit que 1/6. Le nombre du bas décide à l'envers, et c'est ce qui surprend.",
      "Parce que couper en 8 donne des parts plus petites que couper en 6.",
    ),
    tags: ["ce2", "fraction", "comparer", "meme_numerateur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_fraction_comparer_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Laquelle est la plus grande : 7/12 ou 5/6 ?",
    format: "qcm",
    choices: ["5/6", "7/12", "elles sont égales", "on ne peut pas savoir"],
    expected: ["5/6"],
    comparator: "mcq_exact",
    hint: "12 est le double de 6. Récris 5/6 en douzièmes avant de comparer.",
    explanation: exp(
      "Quand un partage est un multiple de l'autre, on récrit les deux fractions avec le même partage.",
      "On recoupe chaque sixième en deux douzièmes, puis on compare des nombres du haut.",
      "5/6 = 10/12. On compare alors 7/12 et 10/12 : c'est 10/12 qui est la plus grande. Donc 5/6 dépasse 7/12 — comparer les nombres du haut sans récrire aurait donné le contraire.",
      "C'est 5/6.",
    ),
    tags: ["ce2", "fraction", "comparer", "denominateur_multiple", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_fraction_comparer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même nombre du bas : les parts ont la même taille, il suffit de les compter.",
    tags: ["ce2", "fraction", "comparer", "meme_denominateur", "template"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8, 10, 12]);
      const [petit, grand] = shuffle([...Array(d - 1).keys()].map((i) => i + 1))
        .slice(0, 2)
        .sort((a, b) => a - b);
      return {
        text: `Laquelle est la plus grande : ${petit}/${d} ou ${grand}/${d} ?`,
        format: "qcm",
        choices: makeChoices(`${grand}/${d}`, [
          `${petit}/${d}`,
          "elles sont égales",
          "on ne peut pas savoir",
        ]),
        expected: [`${grand}/${d}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions de même dénominateur sont faites de parts de même taille.",
          "On compare le nombre de parts, c'est-à-dire les nombres du haut.",
          `Les deux comptent des ${nomFraction(2, d).split(" ")[1]}, tous identiques. ${grand} valent plus que ${petit} : ${grand}/${d} est la plus grande.`,
          `C'est ${grand}/${d}.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: petit, denominator: d, label: `${petit}/${d}` },
            { numerator: grand, denominator: d, label: `${grand}/${d}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_comparer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre du haut : c'est le nombre du bas qui décide, et il décide à l'envers.",
    tags: ["ce2", "fraction", "comparer", "meme_numerateur", "piege", "template"],
    generate: () => {
      const [petitD, grandD] = shuffle([3, 4, 5, 6, 8, 10, 12])
        .slice(0, 2)
        .sort((a, b) => a - b);
      // Le numérateur commun doit rester sous le plus petit des deux
      // dénominateurs : les deux fractions restent inférieures à 1.
      const n = randomInt(1, petitD - 1);
      return {
        text: `Laquelle est la plus grande : ${n}/${petitD} ou ${n}/${grandD} ?`,
        format: "qcm",
        choices: makeChoices(`${n}/${petitD}`, [
          `${n}/${grandD}`,
          "elles sont égales",
          "on ne peut pas savoir",
        ]),
        expected: [`${n}/${petitD}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand le nombre du haut est le même, on prend autant de parts des deux côtés : c'est leur taille qui décide.",
          "On regarde le nombre du bas — plus il est grand, plus les parts sont petites.",
          `Partager en ${petitD} donne des parts plus grosses que partager en ${grandD}. On en prend ${n} dans les deux cas, donc ${n}/${petitD} est la plus grande — même si ${grandD} est plus grand que ${petitD}.`,
          `C'est ${n}/${petitD}.`,
        ),
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: n, denominator: petitD, label: `${n}/${petitD}` },
            { numerator: n, denominator: grandD, label: `${n}/${grandD}` },
          ],
          display: { showFraction: true, showParts: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_fraction_comparer_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce2_fraction_comparer",
    difficulty: 5,
    theme: "neutral",
    hint: "Un partage est un multiple de l'autre : récris la première avant de comparer.",
    tags: ["ce2", "fraction", "comparer", "denominateur_multiple", "template"],
    generate: () => {
      const { d, D } = randomChoice(PAIRES_MULTIPLES);
      const k = D / d;
      // On tire jusqu'à ce que les deux fractions diffèrent : « elles sont
      // égales » serait alors juste, et deux réponses vraies feraient deux
      // bonnes réponses.
      const n = randomInt(1, d - 1);
      let m = randomInt(1, D - 1);
      while (n * k === m) {
        m = randomInt(1, D - 1);
      }
      const premiereGagne = n * k > m;
      const gagnante = premiereGagne ? `${n}/${d}` : `${m}/${D}`;
      const perdante = premiereGagne ? `${m}/${D}` : `${n}/${d}`;
      return {
        text: `Laquelle est la plus grande : ${n}/${d} ou ${m}/${D} ?`,
        format: "qcm",
        choices: makeChoices(gagnante, [
          perdante,
          "elles sont égales",
          "on ne peut pas savoir",
        ]),
        expected: [gagnante],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux fractions qu'une fois ramenées au même partage.",
          `${D} est ${k} fois ${d} : on recoupe chaque part de ${nomFraction(1, d)} en ${k}, et la première fraction se récrit en ${nomFraction(2, D).split(" ")[1]}.`,
          `${n}/${d} = ${n * k}/${D}. On compare alors ${n * k}/${D} et ${m}/${D} : c'est ${gagnante} qui l'emporte.`,
          `C'est ${gagnante}.`,
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
