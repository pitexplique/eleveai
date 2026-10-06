// ─── Calculer avec les fractions (6e) ──────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). Le programme de 6e porte un
// objectif d'apprentissage « Effectuer des opérations sur les fractions », et le
// coach n'en avait RIEN : `fraction_nombre` s'arrêtait à lire, représenter,
// relier au décimal et comparer. Un élève de 6e ne rencontrait aucun calcul sur
// les fractions.
//
// Ce que le BO demande, mot pour mot (Exemples pour la mise en œuvre des
// programmes, 6e, 2025) :
//   · « additionner et soustraire des fractions de même dénominateur ou de
//     dénominateurs multiples l'un de l'autre » ;
//   · « additionner et soustraire des fractions de dénominateurs quelconques
//     dans des cas simples. Par exemple, il sait calculer 5/4 + 2/3 ; 7/2 − 3/5 » ;
//   · « calculer le produit d'une fraction par un nombre entier, et connaît sa
//     propriété de commutativité » ;
//   · la fraction comme OPÉRATEUR : « 2/5 de 60, c'est 2 cinquièmes de 60 […]
//     2/5 × 60 = 2 × 60/5 = 2 × 12 = 24 » — et l'élève est « fortement
//     encouragé, avant d'effectuer la multiplication, à simplifier » ;
//   · un problème type : « Mia a découpé son gâteau. Leïla choisit une part
//     égale au quart, Léo une part égale au sixième. Quelle fraction reste-t-il ? »
//
// Les items de `fraction_quantite` (« la moitié de 10 ») vivent encore dans
// `fractions.bank.ts` : ils ont seulement changé de notionId. Ici on ajoute le
// NIVEAU du BO (2/5 de 60), plus les trois micros neuves.
//
// ⭐ Notation en texte simple (1/5, 2/3), comme le reste de la banque de 6e —
// pas de LaTeX : un `$` avalé disparaît sans laisser de trace
// (scripts/verifier-latex.ts).

import type { TutorBankItemV4, FractionCanvasData } from "@/lib/tutor-v4/types";
// ⭐ 06/10/2026 — varier la PHRASE (situation × tournure × prénom), pas seulement
// les nombres : mêmes prénoms et mêmes partages que fractions.bank.ts. Chaque
// gabarit a son correcteur dans correcteurs/fractions-calcul.ts.
import {
  PRENOMS, PARTAGES, tirer, deuxPrenoms, il, Il, deP, egales, Maj, attendusFraction,
} from "./fractions.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : une fraction a/b se lit « a parts de b », et b × a/b = a.\n\n" +
    "Méthode : pour additionner ou soustraire, on met les fractions sur le même dénominateur ; pour multiplier par un entier, on multiplie le numérateur.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la fraction obtenue, simplifiée si c'est possible."
  );
}

/** Deux fractions côte à côte : les parts se voient avant de se calculer. */
function deuxBarres(
  a: [number, number],
  b: [number, number],
  legende: string
): FractionCanvasData {
  return {
    kind: "fraction",
    model: "compare",
    fractions: [
      { numerator: a[0], denominator: a[1], label: `${a[0]}/${a[1]}`, color: "#3b82f6" },
      { numerator: b[0], denominator: b[1], label: `${b[0]}/${b[1]}`, color: "#10b981" },
    ],
    display: { showLabel: true, showFraction: true, showParts: true },
    // ⚠️ Le composant plafonne à 340 px : au-delà, le dessin ne grandit plus
    // mais ses lettres, elles, rapetissent dans un bloc étroit.
    size: { width: 320, height: 200 },
  };
}

/** Une seule fraction en barre — pour montrer un résultat. */
function barre(n: number, d: number): FractionCanvasData {
  return {
    kind: "fraction",
    model: "bar",
    fraction: { numerator: n, denominator: d, label: `${n}/${d}`, color: "#6366f1" },
    display: { showLabel: true, showFraction: true, showParts: true },
    size: { width: 320, height: 130 },
  };
}

function pgcd(a: number, b: number): number {
  return b ? pgcd(b, a % b) : a;
}
type P = (typeof PRENOMS)[number];
/** k fois la fraction f, dans la vie courante. `u` : unité de la réponse. */
const PRODUITS: { t: (x: P, k: number, f: string) => string; u?: string }[] = [
  { t: (x, k, f) => `${x.p} boit ${f} L de jus chaque jour pendant ${k} jours. Combien de litres boit-${il(x)} en tout ?`, u: "L" },
  { t: (x, k, f) => `${x.p} mange ${f} de pizza à chaque repas, pendant ${k} repas. Quelle quantité de pizza mange-t-${il(x)} en tout ?` },
  { t: (x, k, f) => `${x.p} court ${f} km chaque matin, ${k} matins de suite. Combien de kilomètres court-${il(x)} en tout ?`, u: "km" },
  { t: (x, k, f) => `Une recette demande ${f} kg de farine. ${x.p} fait la recette ${k} fois. Combien de kilogrammes de farine utilise-t-${il(x)} ?`, u: "kg" },
  { t: (x, k, f) => `${x.p} coupe ${k} morceaux de ruban de ${f} m chacun. Quelle longueur de ruban, en mètres, utilise-t-${il(x)} ?`, u: "m" },
  { t: (x, k, f) => `Chaque bouteille contient ${f} L d’eau. ${x.p} en achète ${k}. Combien de litres d’eau achète-t-${il(x)} ?`, u: "L" },
  { t: (x, k, f) => `${x.p} nage ${f} km à chaque séance. ${Il(x)} fait ${k} séances. Combien de kilomètres nage-t-${il(x)} ?`, u: "km" },
  { t: (x, k, f) => `Le chat ${deP(x)} mange ${f} kg de croquettes par semaine. Combien de kilogrammes mange-t-il en ${k} semaines ?`, u: "kg" },
  { t: (x, k, f) => `${x.p} remplit ${k} verres de ${f} L chacun. Combien de litres de jus faut-il ?`, u: "L" },
  { t: (x, k, f) => `${x.p} met ${f} kg de pommes dans chaque sachet. ${Il(x)} prépare ${k} sachets. Combien de kilogrammes de pommes faut-il ?`, u: "kg" },
  { t: (x, k, f) => `Dans le jardin, ${x.p} plante ${k} rangées de ${f} m de long. Quelle longueur, en mètres, cela fait-il en tout ?`, u: "m" },
  { t: (x, k, f) => `Le vélo ${deP(x)} roule ${f} km par minute. Combien de kilomètres parcourt-il en ${k} minutes ?`, u: "km" },
  { t: (x, k, f) => `${x.p} calcule ${k} × ${f}. Quel résultat trouve-t-${il(x)} ?` },
  { t: (x, k, f) => `Aide ${x.p} : que vaut ${f} × ${k} ?` },
  { t: (x, k, f) => `${x.p} prend ${k} fois ${f}. Quelle fraction obtient-${il(x)} ?` },
  { t: (x, k, f) => `Donne à ${x.p} la valeur de ${k} × ${f}.` },
  { t: (x, k, f) => `${x.p} doit compléter : ${k} × ${f} = … Que doit-${il(x)} écrire ?` },
];
/** On prend n/d d'un total : combien en reste-t-il ? */
const RESTES: { objets: string; t: (x: P, total: number, f: string) => string }[] = [
  { objets: "fruits", t: (x, T, f) => `${x.p} a un panier de ${T} fruits. ${Il(x)} en donne les ${f} à ses voisins. Combien de fruits lui reste-t-il ?` },
  { objets: "billes", t: (x, T, f) => `${x.p} a ${T} billes. ${Il(x)} en perd les ${f} pendant la récréation. Combien de billes lui reste-t-il ?` },
  { objets: "pages", t: (x, T, f) => `Le livre ${deP(x)} a ${T} pages. ${Il(x)} en a lu les ${f}. Combien de pages lui reste-t-il à lire ?` },
  { objets: "euros", t: (x, T, f) => `${x.p} a ${T} € d’économies. ${Il(x)} en dépense les ${f} pour un jeu. Combien d’euros lui reste-t-il ?` },
  { objets: "cartes", t: (x, T, f) => `${x.p} a ${T} cartes. ${Il(x)} en échange les ${f}. Combien de cartes garde-t-${il(x)} ?` },
  { objets: "graines", t: (x, T, f) => `${x.p} a un sachet de ${T} graines. ${Il(x)} en sème les ${f}. Combien de graines reste-t-il dans le sachet ?` },
  { objets: "km", t: (x, T, f) => `Le trajet à vélo ${deP(x)} fait ${T} km. ${Il(x)} en a déjà fait les ${f}. Combien de kilomètres lui reste-t-il ?` },
  { objets: "biscuits", t: (x, T, f) => `${x.p} prépare ${T} biscuits pour la fête. Les invités en mangent les ${f}. Combien de biscuits reste-t-il ?` },
  { objets: "photos", t: (x, T, f) => `${x.p} a ${T} photos de vacances. ${Il(x)} en imprime les ${f}. Combien de photos ne sont pas imprimées ?` },
  { objets: "minutes", t: (x, T, f) => `L’entraînement de natation ${deP(x)} dure ${T} minutes. Les ${f} du temps sont passés à nager le crawl. Combien de minutes reste-t-il pour les autres nages ?` },
  { objets: "élèves", t: (x, T, f) => `Au collège ${deP(x)}, il y a ${T} élèves en sixième. Les ${f} viennent à pied. Combien d’élèves ne viennent pas à pied ?` },
  { objets: "places", t: (x, T, f) => `Le car de la sortie ${deP(x)} a ${T} places. Les ${f} sont occupées. Combien de places sont libres ?` },
];
/** Un total, deux groupes en fractions, « les autres » : combien ? */
const GROUPES: { t: (x: P, total: number, f1: string, f2: string) => string }[] = [
  { t: (x, T, a, b) => `Au collège ${deP(x)}, il y a ${T} élèves en sixième. ${a} font de l’espagnol, ${b} de l’allemand, les autres du chinois. Combien d’élèves font du chinois ?` },
  { t: (x, T, a, b) => `Au club ${deP(x)}, il y a ${T} enfants. ${a} font du foot, ${b} du basket, les autres du judo. Combien d’enfants font du judo ?` },
  { t: (x, T, a, b) => `${x.p} a un sachet de ${T} bonbons. ${a} sont rouges, ${b} sont jaunes, les autres sont verts. Combien de bonbons sont verts ?` },
  { t: (x, T, a, b) => `${x.p} range ${T} livres. ${a} sont des BD, ${b} des romans, les autres des documentaires. Combien de documentaires y a-t-il ?` },
  { t: (x, T, a, b) => `Dans le jardin ${deP(x)}, il y a ${T} fleurs. ${a} sont des roses, ${b} des tulipes, les autres des marguerites. Combien de marguerites y a-t-il ?` },
  { t: (x, T, a, b) => `${x.p} a ${T} €. ${Il(x)} dépense ${a} de cette somme pour un livre et ${b} pour une place de cinéma. Combien d’euros lui reste-t-il ?` },
  { t: (x, T, a, b) => `Au potager, ${x.p} plante ${T} légumes. ${a} sont des tomates, ${b} des salades, les autres des carottes. Combien de carottes plante-t-${il(x)} ?` },
  { t: (x, T, a, b) => `Sur ${T} photos ${deP(x)}, ${a} montrent la mer, ${b} la montagne, les autres la ville. Combien de photos montrent la ville ?` },
  { t: (x, T, a, b) => `L’orchestre de l’école ${deP(x)} compte ${T} musiciens. ${a} jouent du violon, ${b} de la flûte, les autres des percussions. Combien jouent des percussions ?` },
  { t: (x, T, a, b) => `${x.p} a ${T} billes. ${Il(x)} en donne ${a} à son frère et ${b} à sa sœur. Combien de billes garde-t-${il(x)} ?` },
  { t: (x, T, a, b) => `À la cantine, ${T} élèves déjeunent avec ${x.p}. ${a} choisissent le poisson, ${b} les pâtes, les autres la salade. Combien choisissent la salade ?` },
  { t: (x, T, a, b) => `L’aquarium ${deP(x)} a ${T} poissons. ${a} sont rouges, ${b} sont bleus, les autres sont jaunes. Combien de poissons sont jaunes ?` },
];
/** k × n/d en situation : la réponse en fraction (et simplifiée, et entière si elle l'est). */
function questionProduit(k: number, n: number, d: number) {
  const x = tirer(PRENOMS);
  const s = tirer(PRODUITS);
  const f = `${n}/${d}`;
  const N = k * n;
  const g = pgcd(N, d);
  const entier = N % d === 0;
  const attendus = attendusFraction(N, d);
  // Une réponse entière porte l'unité de la situation (« 4 km »).
  const expected = entier && s.u ? [`${N / d} ${s.u}`, ...attendus] : attendus;
  return {
    text: s.t(x, k, f),
    format: "short" as const,
    expected,
    comparator: "fraction_decimal_equivalent" as const,
    explanation: expl(
      `${k} × ${f} = (${k} × ${n})/${d} = ${N}/${d}. Seul le numérateur est multiplié : le dénominateur ne change pas.` +
        (g > 1 ? ` On simplifie par ${g} : ${N}/${d} = ${N / g}/${d / g}${entier ? ` = ${N / d}` : ""}.` : ""),
    ),
  };
}

export const fractionsCalculBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_QUANTITE — le niveau du BO (2/5 de 60)
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_bo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font les 2/5 de 60 ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Un cinquième de 60, puis deux fois ce résultat.",
    explanation: expl(
      "2/5 de 60, c'est 2 cinquièmes de 60. Un cinquième de 60 vaut 60 ÷ 5 = 12, donc 2/5 de 60 = 2 × 12 = 24."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font les 3/4 de 20 ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Un quart de 20, puis trois fois ce résultat.",
    explanation: expl("Un quart de 20 vaut 20 ÷ 4 = 5, donc 3/4 de 20 = 3 × 5 = 15."),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Un collège de 400 élèves compte 120 demi-pensionnaires. Combien font les 2/3 de 400 ?",
    format: "short",
    expected: ["266,67", "266.67", "800/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "400 ÷ 3 ne tombe pas juste : garde la fraction.",
    explanation: expl(
      "2/3 de 400 = 2 × 400/3 = 800/3. Ce nombre n'est pas décimal : 800/3 vaut environ 266,67. Toutes les fractions d'un nombre entier ne donnent pas un entier."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font les 5/4 de 3 ?",
    format: "short",
    expected: ["15/4", "3,75", "3.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "5/4 de 3, c'est 5 quarts de 3, donc 5 fois 3/4.",
    explanation: expl(
      "5/4 de 3, c'est 5 fois un quart de 3, soit 5 × 3/4 = 15/4. Comme 5/4 est plus grand que 1, le résultat est plus grand que 3."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer les 2/5 de 60, que fait-on ?",
    format: "qcm",
    choices: [
      "on multiplie 2/5 par 60",
      "on additionne 2/5 et 60",
      "on divise 60 par 2/5",
      "on soustrait 5 à 60 puis on multiplie par 2",
    ],
    expected: ["on multiplie 2/5 par 60"],
    comparator: "mcq_exact",
    hint: "Prendre une fraction d'un nombre, c'est une multiplication.",
    explanation: expl(
      "Pour calculer une fraction d'un nombre entier, on multiplie la fraction par le nombre : 2/5 × 60 = 2 × 60/5 = 2 × 12 = 24."
    ),
    tags: ["fraction_calcul", "operateur", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_bo",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise d'abord par le dénominateur, multiplie ensuite par le numérateur.",
    tags: ["fraction_calcul", "operateur", "template"],
    generate: () => {
      // Le dénominateur divise le nombre : on veut un résultat entier, pour que
      // la MÉTHODE reste au premier plan.
      const d = [3, 4, 5, 6][randomInt(0, 3)];
      let n = randomInt(2, d - 1);
      // Pas de 2/4 ni de 3/6 : une fraction de 6e s'écrit simplifiée quand on la donne.
      while ((d === 4 && n === 2) || (d === 6 && n !== 5)) n = randomInt(2, d - 1);
      const part = randomInt(3, 12);
      const nombre = d * part;
      const x = tirer(PRENOMS);
      const f = `${n}/${d}`;
      const tournures = [
        `Combien font les ${f} de ${nombre} ?`,
        `Calcule ${f} de ${nombre}.`,
        `Que valent les ${f} de ${nombre} ?`,
        `Complète : ${f} × ${nombre} = …`,
        `Complète : ${f} de ${nombre} = …`,
        `${x.p} calcule les ${f} de ${nombre}. Quel résultat doit-${il(x)} trouver ?`,
        `Donne la valeur de ${f} × ${nombre}. Aide ${x.p}.`,
        `${x.p} dit : « ${f} de ${nombre}, c’est ${nombre} ÷ ${d}, puis × ${n}. » Combien trouve-t-${il(x)} ?`,
        `Dans un jeu, ${x.p} gagne les ${f} de ${nombre} points. Combien de points gagne-t-${il(x)} ?`,
        `${x.p} a ${nombre} € d’économies et en dépense les ${f}. Combien d’euros dépense-t-${il(x)} ?`,
      ];
      const k = randomInt(0, tournures.length - 1);
      const euros = k === tournures.length - 1;
      return {
        text: tournures[k],
        format: "short",
        expected: euros ? [`${n * part} €`, String(n * part)] : [String(n * part)],
        comparator: "number_equal",
        explanation: expl(
          `Un ${d}e de ${nombre} vaut ${nombre} ÷ ${d} = ${part}, donc ${n}/${d} de ${nombre} = ${n} × ${part} = ${n * part}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_ADDITIONNER
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 1/5 + 2/5.",
    format: "short",
    expected: ["3/5", "3 / 5", "0,6", "0.6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : on ajoute seulement les numérateurs.",
    explanation: expl(
      "Les deux fractions ont le même dénominateur : 1 cinquième plus 2 cinquièmes font 3 cinquièmes. 1/5 + 2/5 = 3/5."
    ),
    tags: ["fraction_calcul", "addition", "canvas"],
    canvas: deuxBarres([1, 5], [2, 5], "1/5 et 2/5"),
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 3/7 + 2/7.",
    format: "short",
    expected: ["5/7", "5 / 7"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le dénominateur ne change pas.",
    explanation: expl("3/7 + 2/7 = (3 + 2)/7 = 5/7. Le dénominateur, lui, ne bouge pas."),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 5/8 − 2/8.",
    format: "short",
    expected: ["3/8", "3 / 8", "0,375", "0.375"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : on soustrait les numérateurs.",
    explanation: expl("5/8 − 2/8 = (5 − 2)/8 = 3/8."),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 1/2 + 1/4.",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "4 est un multiple de 2 : écris 1/2 en quarts.",
    explanation: expl(
      "1/2 = 2/4, car on multiplie numérateur et dénominateur par 2. Donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4."
    ),
    tags: ["fraction_calcul", "addition", "canvas"],
    canvas: deuxBarres([1, 2], [1, 4], "1/2 et 1/4"),
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 2/3 + 1/6.",
    format: "short",
    expected: ["5/6", "5 / 6"],
    comparator: "fraction_decimal_equivalent",
    hint: "6 est un multiple de 3 : écris 2/3 en sixièmes.",
    explanation: expl("2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6."),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 3/4 − 1/8.",
    format: "short",
    expected: ["5/8", "5 / 8", "0,625", "0.625"],
    comparator: "fraction_decimal_equivalent",
    hint: "8 est un multiple de 4 : écris 3/4 en huitièmes.",
    explanation: expl("3/4 = 6/8, donc 3/4 − 1/8 = 6/8 − 1/8 = 5/8."),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 5/4 + 2/3.",
    format: "short",
    expected: ["23/12", "23 / 12"],
    comparator: "fraction_decimal_equivalent",
    hint: "12 est à la fois un multiple de 4 et de 3.",
    explanation: expl(
      "On met les deux fractions sur 12 : 5/4 = 15/12 et 2/3 = 8/12. Donc 5/4 + 2/3 = 15/12 + 8/12 = 23/12."
    ),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 7/2 − 3/5.",
    format: "short",
    expected: ["29/10", "29 / 10", "2,9", "2.9"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 est à la fois un multiple de 2 et de 5.",
    explanation: expl(
      "On met les deux fractions sur 10 : 7/2 = 35/10 et 3/5 = 6/10. Donc 7/2 − 3/5 = 35/10 − 6/10 = 29/10."
    ),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 7/10 − 3/10.",
    format: "short",
    expected: ["4/10", "2/5", "0,4", "0.4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur, puis simplifie si tu peux.",
    explanation: expl(
      "7/10 − 3/10 = 4/10. On peut simplifier en divisant par 2 : 4/10 = 2/5, c'est-à-dire 0,4."
    ),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non : on ne peut pas additionner les dénominateurs, le résultat est 5/6",
      "oui : on additionne les numérateurs entre eux et les dénominateurs entre eux",
      "non : le résultat est 2/6",
      "oui, mais seulement parce que 2 et 3 sont des nombres premiers",
    ],
    expected: ["non : on ne peut pas additionner les dénominateurs, le résultat est 5/6"],
    comparator: "mcq_exact",
    hint: "2/5 est plus petit que 1/2 : additionner ne peut pas faire diminuer.",
    explanation: expl(
      "On met sur le même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6. Le résultat 2/5 est même plus petit que 1/2, ce qui est impossible pour une addition de nombres positifs."
    ),
    tags: ["fraction_calcul", "addition", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    hint: "Même dénominateur : seuls les numérateurs s'additionnent.",
    tags: ["fraction_calcul", "addition", "template"],
    generate: () => {
      const d = randomInt(4, 12);
      const a = randomInt(1, d - 2);
      const b = randomInt(1, d - a - 1);
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const tournures = [
        `${x.p} calcule ${a}/${d} + ${b}/${d}. Quel résultat trouve-t-${il(x)} ?`,
        `Aide ${x.p} : que vaut ${a}/${d} + ${b}/${d} ?`,
        `${x.p} écrit ${a}/${d} + ${b}/${d} en une seule fraction. Laquelle ?`,
        `${x.p} ${s.verbe} ${a}/${d} ${s.du} le matin et ${b}/${d} l’après-midi. Quelle fraction ${s.du} a-t-${il(x)} ${s.pp}e en tout ?`,
        `${x.p} ${s.verbe} d’abord ${a}/${d} ${s.du}, puis encore ${b}/${d}. Quelle fraction ${s.du} cela fait-il ?`,
        `${x.p} additionne ${b}/${d} et ${a}/${d}. Quel résultat trouve-t-${il(x)} ?`,
        `Samedi, ${x.p} ${s.verbe} ${a}/${d} ${s.du}. Dimanche, ${b}/${d}. Combien en tout, en fraction ${s.du} ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(a + b, d),
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`${a}/${d} + ${b}/${d} = (${a} + ${b})/${d} = ${a + b}/${d}.`),
        canvas: deuxBarres([a, d], [b, d], `${a}/${d} et ${b}/${d}`),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dénominateur est un multiple de l'autre : convertis-en un.",
    tags: ["fraction_calcul", "addition", "template"],
    generate: () => {
      const d = randomInt(2, 5);
      const k = randomInt(2, 4);
      const grand = d * k; // le grand dénominateur est un multiple du petit
      const a = randomInt(1, d - 1 || 1);
      const b = randomInt(1, grand - a * k - 1 || 1);
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const [p, q] = Math.random() < 0.5 ? [`${a}/${d}`, `${b}/${grand}`] : [`${b}/${grand}`, `${a}/${d}`];
      const tournures = [
        `${x.p} calcule ${p} + ${q}. Quel résultat trouve-t-${il(x)} ?`,
        `Aide ${x.p} : que vaut ${p} + ${q} ?`,
        `${x.p} donne la valeur de ${p} + ${q} avec le dénominateur ${grand}. Laquelle ?`,
        `${x.p} ${s.verbe} ${p} ${s.du}, puis ${q}. Quelle fraction ${s.du} a-t-${il(x)} ${s.pp}e en tout ?`,
        `${x.p} additionne ${p} et ${q}. Quel résultat trouve-t-${il(x)} ?`,
        `Le matin, ${x.p} ${s.verbe} ${p} ${s.du}. Le soir, ${q}. Quelle fraction ${s.du} cela fait-il ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(a * k + b, grand),
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `${grand} est un multiple de ${d} : ${a}/${d} = ${a * k}/${grand}. Donc ${a}/${d} + ${b}/${grand} = ${a * k}/${grand} + ${b}/${grand} = ${a * k + b}/${grand}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_additionner_tpl_soustraire",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : on soustrait les numérateurs. Le tout entier, c’est d/d.",
    tags: ["fraction_calcul", "soustraction", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const d = randomInt(3, Math.min(12, s.dMax));
      const reste = Math.random() < 0.5; // « il en reste » : 1 − a/d
      const a = randomInt(reste ? 1 : 2, d - 1);
      const b = reste ? 0 : randomInt(1, a - 1);
      const n = reste ? d - a : a - b;
      const tournures = reste
        ? [
            `${x.p} ${s.verbe} ${a}/${d} ${s.du}. Quelle fraction ${s.du} reste-t-il ?`,
            `${x.p} calcule 1 − ${a}/${d}. Que trouve-t-${il(x)} ? (1, c’est ${d}/${d}.)`,
            `${Maj(s.le)} ${deP(x)} a ${d} ${s.unite} ${egales(s)}. ${Il(x)} en a ${s.pp} ${a}/${d}. Quelle fraction reste-t-il ?`,
            `Aide ${x.p} : que vaut 1 − ${a}/${d} ? (1, c’est ${d}/${d}.)`,
          ]
        : [
            `${x.p} calcule ${a}/${d} − ${b}/${d}. Quel résultat trouve-t-${il(x)} ?`,
            `Aide ${x.p} : que vaut ${a}/${d} − ${b}/${d} ?`,
            `${x.p} avait ${a}/${d} ${s.du}. ${Il(x)} en ${s.verbe} ${b}/${d}. Quelle fraction ${s.du} lui reste-t-il ?`,
            `${x.p} écrit ${a}/${d} − ${b}/${d} en une seule fraction. Laquelle ?`,
            `${x.p} soustrait ${b}/${d} de ${a}/${d}. Quel résultat trouve-t-${il(x)} ?`,
          ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(n, d),
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          reste
            ? `Le tout entier, c’est ${d}/${d}. ${d}/${d} − ${a}/${d} = (${d} − ${a})/${d} = ${n}/${d}.`
            : `Même dénominateur : ${a}/${d} − ${b}/${d} = (${a} − ${b})/${d} = ${n}/${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_partage_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris tout avec le plus grand dénominateur, puis enlève du tout (d/d).",
    tags: ["fraction_calcul", "addition", "soustraction", "probleme", "template"],
    generate: () => {
      // Le problème type du BO : « Leïla choisit une part égale au quart, Léo une
      // part égale au sixième. Quelle fraction reste-t-il ? » — ici avec des
      // dénominateurs multiples l'un de l'autre (programme de 6e).
      const s = tirer(PARTAGES);
      const [x, y] = deuxPrenoms();
      let d = 2, k = 2, a = 1, b = 1;
      do {
        d = randomInt(2, 5);
        k = randomInt(2, 4);
        a = randomInt(1, d - 1);
        b = randomInt(1, d * k - 1);
      } while (a * k + b >= d * k || d * k > 16);
      const D = d * k;
      const pris = a * k + b;
      const n = D - pris;
      const cas = tirer(["reste", "reste", "ensemble", "difference"] as const);
      const debut = `${x.p} ${s.verbe} ${a}/${d} ${s.du}. ${y.p} en ${s.verbe} ${b}/${D}.`;
      const question =
        cas === "reste"
          ? tirer([`Quelle fraction ${s.du} reste-t-il ?`, `Quelle fraction ${s.du} n’a pas été ${s.pp}e ?`])
          : cas === "ensemble"
            ? `Quelle fraction ${s.du} ont-${x.f && y.f ? "elles" : "ils"} ${s.pp}e à eux deux ?`
            : `Quelle fraction ${s.du} ${x.p} a-t-${il(x)} ${s.pp}e de plus que ${y.p} ?`;
      // « de plus » n'a de sens que si x en a pris plus.
      const diff = a * k - b;
      const casFinal = cas === "difference" && diff <= 0 ? "reste" : cas;
      const questionFinale = casFinal === cas ? question : `Quelle fraction ${s.du} reste-t-il ?`;
      const num = casFinal === "reste" ? n : casFinal === "ensemble" ? pris : diff;
      return {
        text: `${debut} ${questionFinale}`,
        format: "short",
        expected: attendusFraction(num, D),
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `${D} est un multiple de ${d} : ${a}/${d} = ${a * k}/${D}. ` +
            (casFinal === "reste"
              ? `Pris en tout : ${a * k}/${D} + ${b}/${D} = ${pris}/${D}. Le tout, c’est ${D}/${D} : il reste ${D}/${D} − ${pris}/${D} = ${n}/${D}.`
              : casFinal === "ensemble"
                ? `${a * k}/${D} + ${b}/${D} = ${pris}/${D}.`
                : `${a * k}/${D} − ${b}/${D} = ${diff}/${D}.`),
        ),
      };
    },
  },

  // =========================
  // FRACTION_MULTIPLIER_ENTIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 3 × 2/5.",
    format: "short",
    expected: ["6/5", "6 / 5", "1,2", "1.2"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 × 2/5, c'est 2/5 + 2/5 + 2/5.",
    explanation: expl(
      "3 × 2/5 = 2/5 + 2/5 + 2/5 = 6/5. On multiplie le numérateur par 3 ; le dénominateur ne change pas."
    ),
    tags: ["fraction_calcul", "multiplication", "canvas"],
    canvas: barre(6, 5),
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 4 × 1/3.",
    format: "short",
    expected: ["4/3", "4 / 3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Quatre tiers.",
    explanation: expl("4 × 1/3 = 4/3. Quatre fois un tiers, ce sont quatre tiers."),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 2/7 × 5.",
    format: "short",
    expected: ["10/7", "10 / 7"],
    comparator: "fraction_decimal_equivalent",
    hint: "L'ordre n'a pas d'importance : 2/7 × 5 = 5 × 2/7.",
    explanation: expl(
      "2/7 × 5 = 5 × 2/7 = 10/7. Le produit d'une fraction par un entier est commutatif : l'ordre ne change rien."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 6 × 1/6.",
    format: "short",
    expected: ["1", "6/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Six sixièmes font un entier.",
    explanation: expl(
      "6 × 1/6 = 6/6 = 1. C'est la propriété qui définit la fraction : b × a/b = a, donc 6 × 1/6 = 1."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 5 × 3/10, puis simplifie le résultat.",
    format: "short",
    expected: ["15/10", "3/2", "1,5", "1.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie le numérateur, puis divise numérateur et dénominateur par 5.",
    explanation: expl(
      "5 × 3/10 = 15/10. On simplifie en divisant par 5 : 15/10 = 3/2, c'est-à-dire 1,5."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour multiplier une fraction par un nombre entier, que fait-on ?",
    format: "qcm",
    choices: [
      "on multiplie le numérateur par l'entier, le dénominateur ne change pas",
      "on multiplie le dénominateur par l'entier, le numérateur ne change pas",
      "on multiplie le numérateur et le dénominateur par l'entier",
      "on ajoute l'entier au numérateur",
    ],
    expected: ["on multiplie le numérateur par l'entier, le dénominateur ne change pas"],
    comparator: "mcq_exact",
    hint: "3 × 2/5, c'est 2/5 + 2/5 + 2/5 : le nombre de parts change, pas leur taille.",
    explanation: expl(
      "3 × 2/5 = 2/5 + 2/5 + 2/5 = 6/5 : on prend trois fois plus de parts, mais les parts gardent la même taille. Le dénominateur ne bouge donc pas."
    ),
    tags: ["fraction_calcul", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Les produits 4 × 3/7 et 3/7 × 4 sont-ils égaux ?",
    format: "qcm",
    choices: [
      "oui, la multiplication est commutative : les deux valent 12/7",
      "non, le premier vaut 12/7 et le second 4/7",
      "non, on ne peut pas écrire une fraction avant un entier",
      "oui, mais seulement parce que 4 et 7 n'ont aucun diviseur commun",
    ],
    expected: ["oui, la multiplication est commutative : les deux valent 12/7"],
    comparator: "mcq_exact",
    hint: "Change l'ordre et recalcule.",
    explanation: expl(
      "4 × 3/7 = 12/7 et 3/7 × 4 = 12/7 : le produit d'une fraction par un entier est commutatif, comme pour deux entiers."
    ),
    tags: ["fraction_calcul", "multiplication", "commutativite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 10 × 1/5.",
    format: "short",
    expected: ["2", "10/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Dix cinquièmes, c'est combien d'unités ?",
    explanation: expl("10 × 1/5 = 10/5 = 2. Dix cinquièmes valent deux unités entières."),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 4 × 5/8, puis simplifie.",
    format: "short",
    expected: ["20/8", "5/2", "2,5", "2.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "On peut aussi simplifier AVANT : 4/8 = 1/2.",
    explanation: expl(
      "4 × 5/8 = 20/8 = 5/2 = 2,5. On pouvait simplifier avant de multiplier : 4 × 5/8 = 5 × 4/8 = 5 × 1/2 = 5/2."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_entier_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    hint: "Seul le numérateur est multiplié.",
    tags: ["fraction_calcul", "multiplication", "template"],
    generate: () => {
      const d = randomInt(3, 9);
      let n = randomInt(2, d - 1);
      while (pgcd(n, d) !== 1) n = randomInt(2, d - 1);
      const k = randomInt(2, 6);
      // ⚠️ 06/10/2026 : la barre montrait le RÉSULTAT (k × n parts) : elle montre
      // désormais la fraction de départ, celle qu'on prend k fois.
      return { ...questionProduit(k, n, d), canvas: barre(n, d) };
    },
  },
  {
    kind: "template",
    id: "fraction_multiplier_entier_tpl_unitaire",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 1,
    theme: "neutral",
    hint: "3 fois 1/5, c’est 3 cinquièmes : 3/5.",
    tags: ["fraction_calcul", "multiplication", "template"],
    generate: () => {
      const d = randomInt(3, 10);
      return questionProduit(randomInt(2, d - 1), 1, d);
    },
  },
  {
    kind: "template",
    id: "fraction_multiplier_entier_tpl_simplifier",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le numérateur, puis regarde si la fraction se simplifie.",
    tags: ["fraction_calcul", "multiplication", "simplification", "template"],
    generate: () => {
      // k et d ont un diviseur commun : le résultat se simplifie (5 × 3/10 = 15/10 = 3/2).
      let d = 4, n = 1, k = 2;
      do {
        d = tirer([4, 6, 8, 9, 10, 12]);
        n = randomInt(1, d - 1);
        k = randomInt(2, 8);
      } while (pgcd(n, d) !== 1 || pgcd(k * n, d) === 1 || (k * n) % d === 0);
      return questionProduit(k, n, d);
    },
  },
  {
    kind: "template",
    id: "fraction_multiplier_entier_tpl_entier",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 4,
    theme: "neutral",
    hint: "k × n/d : si d divise k, divise d’abord, puis multiplie.",
    tags: ["fraction_calcul", "multiplication", "template"],
    generate: () => {
      const d = randomInt(2, 6);
      let n = randomInt(1, d - 1);
      while (pgcd(n, d) !== 1) n = randomInt(1, d - 1);
      const k = d * randomInt(2, 4);
      return questionProduit(k, n, d);
    },
  },

  // =========================
  // FRACTION_CALCUL_DEFI
  // =========================
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Mia découpe son gâteau d'anniversaire en parts de tailles différentes. Leïla choisit une part égale au quart du gâteau et Léo une part égale au sixième. Quelle fraction du gâteau reste-t-il pour les autres invités ?",
    format: "short",
    expected: ["7/12", "7 / 12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Additionne d'abord les deux parts, puis retranche du gâteau entier.",
    explanation: expl(
      "1/4 + 1/6 : on met sur 12, soit 3/12 + 2/12 = 5/12. Le gâteau entier vaut 12/12, donc il reste 12/12 − 5/12 = 7/12."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 2/5 + 3/10.",
    format: "short",
    expected: ["7/10", "7 / 10", "0,7", "0.7"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 est un multiple de 5.",
    explanation: expl("2/5 = 4/10, donc 2/5 + 3/10 = 4/10 + 3/10 = 7/10, c'est-à-dire 0,7."),
    tags: ["fraction_calcul", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À La Réunion, un cageot contient 24 letchis. Malo en mange les 3/8 et Anaïs en mange 1/4. Combien de letchis restent-ils ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Calcule d'abord chaque part en nombre de letchis.",
    explanation: expl(
      "3/8 de 24 = 3 × 3 = 9 letchis pour Malo. 1/4 de 24 = 6 letchis pour Anaïs. Ils en ont mangé 9 + 6 = 15, il en reste 24 − 15 = 9."
    ),
    tags: ["fraction_calcul", "defi", "probleme", "974"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le résultat de 3 × 5/4 est-il plus grand ou plus petit que 3 ?",
    format: "qcm",
    choices: [
      "plus grand, car 5/4 est plus grand que 1",
      "plus petit, car on multiplie par une fraction",
      "égal à 3, car le dénominateur ne change pas",
      "on ne peut pas le savoir sans calculer",
    ],
    expected: ["plus grand, car 5/4 est plus grand que 1"],
    comparator: "mcq_exact",
    hint: "Compare 5/4 à 1 avant de calculer.",
    explanation: expl(
      "3 × 5/4 = 15/4 = 3,75, donc plus grand que 3. Multiplier par une fraction plus grande que 1 augmente ; multiplier ne veut pas toujours dire « rendre plus grand », mais ici si."
    ),
    tags: ["fraction_calcul", "defi", "raisonnement", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une classe de 30 élèves : 2/5 font de l'espagnol, 1/3 font de l'allemand, les autres font du chinois. Combien d'élèves font du chinois ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte les élèves de chaque langue, puis retire du total.",
    explanation: expl(
      "2/5 de 30 = 12 élèves en espagnol. 1/3 de 30 = 10 élèves en allemand. Il reste 30 − 12 − 10 = 8 élèves en chinois."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas additionner 1/2 et 1/3 en additionnant les numérateurs entre eux et les dénominateurs entre eux.",
    format: "short",
    expected: ["même dénominateur", "meme denominateur", "parts", "taille"],
    comparator: "contains_keyword",
    hint: "Deux fractions ne s'additionnent que si leurs parts ont la même taille.",
    explanation: expl(
      "Un demi et un tiers ne sont pas des parts de la même taille : on ne peut pas les compter ensemble tant qu'on ne les a pas exprimées avec le même dénominateur. 1/2 = 3/6 et 1/3 = 2/6, donc la somme vaut 5/6 — et pas 2/5, qui serait même plus petit que 1/2."
    ),
    tags: ["fraction_calcul", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une bouteille contient 3/4 de litre de jus. On en verse 1/4 de litre dans un verre. Quelle fraction de litre reste-t-il dans la bouteille ?",
    format: "short",
    expected: ["2/4", "1/2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : la soustraction est directe.",
    explanation: expl(
      "3/4 − 1/4 = 2/4, qu'on simplifie en 1/2. Il reste un demi-litre dans la bouteille."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la part mangée, puis retire-la du total.",
    tags: ["fraction_calcul", "defi", "template"],
    generate: () => {
      const d = [3, 4, 5, 6, 8][randomInt(0, 4)];
      const part = randomInt(3, 8);
      const total = d * part;
      // n ≥ 2 : « les 3/4 de… » ; « les 1/4 » ne se dit pas.
      let n = randomInt(2, d - 1);
      while (pgcd(n, d) !== 1) n = randomInt(2, d - 1);
      const mange = n * part;
      const x = tirer(PRENOMS);
      const r = tirer(RESTES);
      return {
        text: r.t(x, total, `${n}/${d}`),
        format: "short",
        expected: [String(total - mange)],
        comparator: "number_equal",
        explanation: expl(
          `${n}/${d} de ${total} = ${total} ÷ ${d} × ${n} = ${part} × ${n} = ${mange}. Il reste ${total} − ${mange} = ${total - mange} ${r.objets}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_deux_fractions",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque groupe en nombre, puis retire-les du total.",
    tags: ["fraction_calcul", "defi", "probleme", "template"],
    generate: () => {
      // Le problème type du BO : « 30 élèves : 2/5 font de l'espagnol, 1/3 de
      // l'allemand, les autres du chinois. » Deux fractions d'un même total.
      let d1 = 2, d2 = 3, n1 = 1, n2 = 1, total = 12;
      do {
        d1 = randomInt(2, 6);
        d2 = randomInt(2, 8);
        n1 = randomInt(1, d1 - 1);
        n2 = randomInt(1, d2 - 1);
        const m = (d1 * d2) / pgcd(d1, d2);
        total = m * randomInt(1, Math.max(1, Math.floor(60 / m)));
      } while (
        d1 === d2 || pgcd(n1, d1) !== 1 || pgcd(n2, d2) !== 1 ||
        n1 / d1 + n2 / d2 >= 1 || total < 12 || total > 60
      );
      const g1 = (total / d1) * n1;
      const g2 = (total / d2) * n2;
      const reste = total - g1 - g2;
      const x = tirer(PRENOMS);
      const c = tirer(GROUPES);
      return {
        text: c.t(x, total, `${n1}/${d1}`, `${n2}/${d2}`),
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: expl(
          `${n1}/${d1} de ${total} : ${total} ÷ ${d1} × ${n1} = ${g1}. ${n2}/${d2} de ${total} : ${total} ÷ ${d2} × ${n2} = ${g2}. ` +
            `Il reste ${total} − ${g1} − ${g2} = ${reste}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tout vaut d/d : retire la part connue.",
    tags: ["fraction_calcul", "defi", "template"],
    generate: () => {
      // On partage ce qui se mange : « partager un mur » ne se dit pas.
      const s = tirer(PARTAGES.filter((p) => p.dMax >= 8 && /mange|croque/.test(p.verbe)));
      const [x, y] = deuxPrenoms();
      const d = randomInt(5, Math.min(12, s.dMax));
      const a = randomInt(1, d - 3);
      const b = randomInt(1, d - a - 1);
      const n = d - a - b;
      const tournures = [
        `${x.p} et ${y.p} partagent ${s.un} en ${d} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${a}/${d}, ${y.p} ${b}/${d}. Quelle fraction ${s.du} reste-t-il ?`,
        `${Maj(s.un)} a ${d} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${a}/${d}, puis ${y.p} en ${s.verbe} ${b}/${d}. Quelle fraction ${s.du} reste-t-il ?`,
        `${x.p} ${s.verbe} ${a}/${d} ${s.du} et ${y.p} ${b}/${d}. Quelle fraction ${s.du} n’a pas été ${s.pp}e ?`,
        `Sur ${s.le} ${deP(x)}, ${a}/${d} sont pour ${x.p} et ${b}/${d} pour ${y.p}. Quelle fraction reste-t-il pour les autres ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(n, d),
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `Pris : ${a}/${d} + ${b}/${d} = ${a + b}/${d}. Le tout vaut ${d}/${d} : il reste ${d}/${d} − ${a + b}/${d} = ${n}/${d}.`
        ),
        // Les deux parts prises, côte à côte ; le reste, c'est à l'élève de le trouver.
        canvas: deuxBarres([a, d], [b, d], `${a}/${d} et ${b}/${d}`),
      };
    },
  },
];

// `shuffle` reste exporté implicitement inutilisé par les items fixes : les QCM
// sont mélangés par le moteur (le mélange fait dans la banque était biaisé, voir
// le correctif du 12/08 sur l'ordre des choix).
void shuffle;
