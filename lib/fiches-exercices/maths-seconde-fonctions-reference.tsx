// ─── Fiche d'exercices : les fonctions de référence (seconde) ────────────────
//
// Cinquième et dernière feuille du bloc « Fonctions » de seconde (22/09/2026).
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/
// fonctions-reference.bank.ts` (notionId fonctions_reference_2de) et sur la
// fiche de cours `lib/fiches/maths-seconde-fonctions-reference.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni 2,9² et 3,1², ni 1/3 et
// 1/8, ni √15 et √17, ni x² = 36, ni −3 ≤ x ≤ −1, ni (−7)²).
//
// ⭐ LE FIL : chaque fonction a son SENS de variation, et c'est lui qui permet
// de comparer et d'encadrer sans calculer — à condition de rester sur un
// intervalle où il ne change pas (exercice 12 : l'encadrement qui oublie 0).
//
// ⭐ LE MONDE : un gouffre mesuré au chronomètre (d = 5t²), le marathon sous
// les 2 heures (t = 42,195 / v), la masse d'une baleine à bosse (M ∝ L³), la
// distance au refuge sur un sentier (|x − 12|).
// Sources : record du monde du marathon, 1 h 59 min 30 s, Sabastian Sawe,
// Londres, 26/04/2026 (vérifié le 22/09/2026 : il bat les 2 h 00 min 35 s de
// Kelvin Kiptum, Chicago 2023). Baleine à bosse : M = 0,009 L³ est un MODÈLE
// (même forme à tout âge) qui redonne les ordres de grandeur connus — un
// baleineau de 4,5 m pèse moins d'une tonne, un adulte de 15 m une trentaine.
//
// ⭐ Les courbes de la racine et de l'inverse sont des lignes brisées aux
// points EXACTS (carrés parfaits, inverses décimaux) : le script de recalcul
// les relit et vérifie chaque point marqué.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fonctions-reference.mjs`.
//
// Micro-compétences : reference_carre (1, 12, 16, 17), reference_inverse (2,
// 10, 18), reference_racine (3, 8, 16, 17), reference_cube (4, 7, 12, 19),
// reference_valeur_absolue (5, 13, 20), reference_comparer (6, 11, 12, 14, 18),
// reference_resoudre (7, 8, 9, 10, 15, 16, 17, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauVariations } from "@/lib/fiches-exercices/figures";

const VERT = "#059669";

/* La racine carrée aux carrés parfaits, l'inverse aux inverses décimaux :
   des points EXACTS, que le script relit. */
const RACINE: [number, number][] = [
  [0, 0], [0.0625, 0.25], [0.25, 0.5], [0.5625, 0.75], [1, 1], [1.44, 1.2], [1.5625, 1.25], [2.25, 1.5],
  [3.0625, 1.75], [4, 2], [5.0625, 2.25], [6.25, 2.5], [7.5625, 2.75], [9, 3],
];
const INVERSE_POS: [number, number][] = [
  [0.2, 5], [0.25, 4], [0.4, 2.5], [0.5, 2], [0.8, 1.25], [1, 1], [1.25, 0.8], [2, 0.5], [2.5, 0.4], [4, 0.25], [5, 0.2],
];
const INVERSE_NEG: [number, number][] = [
  [-4, -0.25], [-2.5, -0.4], [-2, -0.5], [-1.25, -0.8], [-1, -1], [-0.8, -1.25], [-0.5, -2], [-0.4, -2.5], [-0.25, -4], [-0.2, -5],
];

export const exercicesFonctionsReferenceSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonctions-reference-2de",
  titre: "Les fonctions de référence",
  accroche:
    "Vingt exercices, du geste seul au problème : carré, inverse, racine carrée, cube et valeur absolue. Calculer, lire une courbe, résoudre, comparer et encadrer sans calculatrice. Un gouffre mesuré au chronomètre, le marathon sous les 2 heures, la masse d'une baleine, un refuge de montagne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/fonctions-reference-2de", titre: "Les fonctions de référence" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une fonction de référence par exercice : calculer, lire, résoudre.",
      rappel: [
        "Carré $x^2$ : définie sur $\\mathbb{R}$, décroissante sur $]{-\\infty}\\,;\\,0]$ puis croissante. Un nombre et son opposé ont le même carré.",
        "Inverse $\\dfrac{1}{x}$ : définie pour $x \\neq 0$, décroissante sur chacun de ses deux morceaux.",
        "Racine $\\sqrt{x}$ : définie sur $[0\\,;\\,+\\infty[$, croissante. Cube $x^3$ : croissante sur $\\mathbb{R}$, du signe de $x$.",
        "Valeur absolue $|x|$ : la distance de $x$ à $0$. Sa courbe est un V.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = x^2$, la fonction carré.\na) Calculer $f(-1{,}5)$, $f(0{,}1)$ et $f(\\sqrt{5})$.\nb) Pourquoi a-t-on $f(-8) = f(8)$ ? Que dit-on de la courbe ?",
          correction:
            "a) $f(-1{,}5) = (-1{,}5)^2 = 2{,}25$ : le carré d'un nombre négatif est positif.\n$f(0{,}1) = 0{,}1^2 = 0{,}01$ : entre $0$ et $1$, le carré est plus PETIT que le nombre.\n$f(\\sqrt{5}) = (\\sqrt{5})^2 = 5$.\nb) $(-8)^2 = 64$ et $8^2 = 64$ : un nombre et son opposé ont le même carré. La courbe, une parabole, est SYMÉTRIQUE par rapport à l'axe des ordonnées.\n⛔ Le piège au a) : écrire $-1{,}5^2 = -2{,}25$. Sans parenthèses, le carré ne porte que sur $1{,}5$.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations(["−∞", 0, "+∞"], ["+∞", 0, "+∞"])}
              {repere([-3, 3, -1, 9], [{ q: [1, 0, 0] }], [{ x: -1.5, y: 2.25 }, { x: 1.5, y: 2.25 }], 2.25)}
            </div>
          ),
          micros: ["reference_carre"],
        },
        {
          enonce: "Soit $g(x) = \\dfrac{1}{x}$, la fonction inverse.\na) Calculer $g(4)$, $g(-0{,}5)$ et $g\\left(\\dfrac{2}{3}\\right)$.\nb) Pourquoi $0$ n'a-t-il pas d'image ?\nc) Quel nombre a pour image $5$ ?",
          correction:
            "a) $g(4) = \\dfrac{1}{4} = 0{,}25$, $g(-0{,}5) = \\dfrac{1}{-0{,}5} = -2$ et $g\\left(\\dfrac{2}{3}\\right) = \\dfrac{3}{2}$ : l'inverse d'une fraction, c'est la fraction retournée.\nb) Diviser $1$ par $0$ n'a pas de sens : la fonction inverse est définie sur $\\mathbb{R}$ privé de $0$.\nc) On résout $\\dfrac{1}{x} = 5$ : $x = \\dfrac{1}{5} = 0{,}2$.\n⛔ Le piège au a) : confondre l'inverse et l'opposé. L'inverse de $4$ est $\\dfrac{1}{4}$ ; son opposé est $-4$.",
          schema: repere([-4, 5, -4, 4], [{ pts: INVERSE_NEG }, { pts: INVERSE_POS }], [{ x: 4, y: 0.25 }, { x: -0.5, y: -2 }]),
          micros: ["reference_inverse"],
        },
        {
          enonce: "Soit $h(x) = \\sqrt{x}$, la fonction racine carrée.\na) Calculer $h(0{,}25)$, $h(100)$ et $h(0)$.\nb) Pourquoi $-4$ n'a-t-il pas d'image ?\nc) Quel nombre a pour image $1{,}2$ ?",
          correction:
            "a) $h(0{,}25) = 0{,}5$, car $0{,}5^2 = 0{,}25$. Puis $h(100) = 10$ et $h(0) = 0$.\nb) Il faudrait un nombre dont le carré soit $-4$. Or un carré n'est jamais négatif : $-4$ n'a pas d'image. La fonction racine est définie sur $[0\\,;\\,+\\infty[$.\nc) $\\sqrt{x} = 1{,}2$ donne $x = 1{,}2^2 = 1{,}44$.\n⛔ Le piège au a) : croire que $\\sqrt{0{,}25}$ est plus petit que $0{,}25$. Entre $0$ et $1$, la racine est PLUS GRANDE que le nombre.",
          schema: repere([-1, 9, -1, 4], [{ pts: RACINE }], [{ x: 0.25, y: 0.5 }, { x: 1.44, y: 1.2 }]),
          micros: ["reference_racine"],
        },
        {
          enonce: "Soit $k(x) = x^3$, la fonction cube.\na) Calculer $k(-3)$, $k(0{,}5)$ et $k(10)$.\nb) Trouver l'antécédent de $-125$. Combien y en a-t-il ?\nc) Quel est le signe de $x^3$ ?",
          correction:
            "a) $k(-3) = (-3)^3 = -27$ : un nombre NÉGATIF au cube reste négatif. $k(0{,}5) = 0{,}125$ et $k(10) = 1\\,000$.\nb) $(-5)^3 = -125$ : l'antécédent de $-125$ est $-5$, et c'est le SEUL. La fonction cube est croissante sur $\\mathbb{R}$ : elle ne prend jamais deux fois la même valeur.\nc) $x^3$ a le signe de $x$ : négatif pour $x < 0$, positif pour $x > 0$.\n⛔ Le piège au b) : chercher deux antécédents, comme pour le carré. $5^3 = 125$, pas $-125$.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations(["−∞", "+∞"], ["−∞", "+∞"])}
              {repere([-2, 2, -9, 9], [{ p: [1, 0, 0, 0] }], [{ x: -2, y: -8 }, { x: 1, y: 1 }])}
            </div>
          ),
          micros: ["reference_cube"],
        },
        {
          enonce: "a) Calculer $|-7|$, $|3 - 5|$ et $|\\pi - 4|$.\nb) Quels nombres ont pour valeur absolue $6$ ?\nc) Décrire la courbe de la fonction $x \\mapsto |x|$.",
          correction:
            "a) $|-7| = 7$. $|3 - 5| = |-2| = 2$. Et $\\pi \\approx 3{,}14$ est plus petit que $4$ : $\\pi - 4$ est négatif, donc $|\\pi - 4| = 4 - \\pi$.\nb) $|x| = 6$ pour $x = 6$ ou $x = -6$ : les deux nombres à distance $6$ de $0$.\nc) Deux demi-droites en V, qui se rejoignent à l'origine : $|x| = -x$ pour $x \\leqslant 0$, et $|x| = x$ pour $x \\geqslant 0$.\n⛔ Le piège au a) : écrire $|\\pi - 4| = \\pi - 4$. Une valeur absolue n'est jamais négative.",
          schema: repere([-4, 4, -1, 5], [{ pts: [[-4, 4], [0, 0], [4, 4]] }], [{ x: -2, y: 2 }, { x: 2, y: 2 }]),
          micros: ["reference_valeur_absolue"],
        },
        {
          enonce: "Comparer sans calculatrice, en justifiant :\na) $1{,}7^2$ et $1{,}07^2$\nb) $(-3{,}2)^2$ et $(-2{,}3)^2$\nc) $\\dfrac{1}{0{,}4}$ et $\\dfrac{1}{0{,}5}$",
          correction:
            "a) $1{,}07 < 1{,}7$, deux nombres POSITIFS. Le carré est croissant sur $[0\\,;\\,+\\infty[$ : il conserve l'ordre, donc $1{,}07^2 < 1{,}7^2$.\nb) $-3{,}2 < -2{,}3$, deux nombres NÉGATIFS. Le carré est décroissant sur $]{-\\infty}\\,;\\,0]$ : il inverse l'ordre, donc $(-3{,}2)^2 > (-2{,}3)^2$.\nc) $0{,}4 < 0{,}5$, deux nombres positifs. L'inverse est décroissante sur $]0\\,;\\,+\\infty[$ : $\\dfrac{1}{0{,}4} > \\dfrac{1}{0{,}5}$. En effet, $2{,}5 > 2$.\n⛔ Le piège au b) : « $-3{,}2$ est plus petit, donc son carré aussi ». Sur les négatifs, le carré inverse l'ordre.",
          micros: ["reference_comparer"],
        },
        {
          enonce: "Résoudre :\na) $x^2 = 2$\nb) $x^2 = 0{,}49$\nc) $x^2 = -9$\nd) $x^3 = 64$",
          correction:
            "a) $x = \\sqrt{2}$ ou $x = -\\sqrt{2}$ : deux solutions, opposées.\nb) $x = 0{,}7$ ou $x = -0{,}7$, car $0{,}7^2 = 0{,}49$.\nc) Un carré n'est jamais négatif : AUCUNE solution.\nd) $4^3 = 64$ : $x = 4$, et c'est la seule solution, car la fonction cube est croissante. $(-4)^3 = -64$ ne convient pas.\n⛔ Le piège au a) : oublier $-\\sqrt{2}$.",
          schema: repere([-3, 3, -2, 5], [{ q: [1, 0, 0] }], [{ x: -0.7, y: 0.49 }, { x: 0.7, y: 0.49 }], [2, 0.49]),
          micros: ["reference_resoudre", "reference_cube"],
        },
        {
          enonce: "Voici la courbe de la fonction racine carrée.\na) Lire $\\sqrt{4}$ et $\\sqrt{6{,}25}$.\nb) Résoudre graphiquement $\\sqrt{x} = 1{,}5$.\nc) Résoudre graphiquement $\\sqrt{x} \\leqslant 2$.",
          figure: repere([-1, 9, -1, 4], [{ pts: RACINE }]),
          correction:
            "a) Au-dessus de $4$, la courbe est à la hauteur $2$ : $\\sqrt{4} = 2$. Au-dessus de $6{,}25$, à la hauteur $2{,}5$ : $\\sqrt{6{,}25} = 2{,}5$.\nb) L'horizontale $y = 1{,}5$ coupe la courbe au point d'abscisse $2{,}25$ : $x = 2{,}25$. On vérifie : $1{,}5^2 = 2{,}25$. ✓\nc) La courbe est sous l'horizontale $y = 2$ pour $x$ entre $0$ et $4$ : les solutions forment $[0\\,;\\,4]$.\n⛔ Le piège au c) : écrire $]{-\\infty}\\,;\\,4]$. La racine n'existe pas pour les négatifs : les solutions commencent à $0$.",
          schema: repere([-1, 9, -1, 4], [{ pts: RACINE }], [{ x: 4, y: 2 }, { x: 6.25, y: 2.5 }, { x: 2.25, y: 1.5 }], [1.5, 2]),
          micros: ["reference_racine", "reference_resoudre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : inéquations, encadrements, comparaisons.",
      rappel: [
        "Une fonction CROISSANTE conserve l'ordre, une fonction DÉCROISSANTE l'inverse — sur un intervalle où elle ne change pas de sens.",
        "$x^2 = k$ : deux solutions opposées si $k > 0$, une seule si $k = 0$, aucune si $k < 0$.",
        "Pour encadrer $x^2$ sur un intervalle qui contient $0$, on n'oublie pas son minimum : $0$.",
      ],
      exercices: [
        {
          enonce: "Résoudre :\na) $x^2 \\leqslant 9$\nb) $x^2 > 4$\nc) $x^2 < -1$",
          correction:
            "On s'aide de la parabole : où est-elle sous l'horizontale, où est-elle au-dessus ?\na) $x^2 = 9$ pour $x = -3$ et $x = 3$ ; entre les deux, la parabole est sous $y = 9$. Les solutions forment $[-3\\,;\\,3]$.\nb) $x^2 = 4$ pour $x = -2$ et $x = 2$ ; la parabole est au-dessus de $y = 4$ à l'EXTÉRIEUR : $]{-\\infty}\\,;\\,-2[ \\cup ]2\\,;\\,+\\infty[$.\nc) Un carré n'est jamais négatif : AUCUNE solution.\n⛔ Le piège au a) : répondre « $x \\leqslant 3$ ». Avec $x = -5$, on a bien $x \\leqslant 3$, mais $x^2 = 25$.",
          schema: repere([-4, 4, -1, 10], [{ q: [1, 0, 0] }], [{ x: -3, y: 9 }, { x: 3, y: 9 }, { x: -2, y: 4 }, { x: 2, y: 4 }], [9, 4]),
          micros: ["reference_resoudre"],
        },
        {
          enonce: "Résoudre :\na) $\\dfrac{1}{x} \\geqslant 2$\nb) $\\dfrac{1}{x} < -1$",
          correction:
            "On s'aide de la courbe de la fonction inverse, en deux morceaux.\na) $\\dfrac{1}{x} = 2$ pour $x = \\dfrac{1}{2}$. Pour $x$ négatif, $\\dfrac{1}{x}$ est négatif : jamais supérieur à $2$. Pour $x$ positif, la courbe est au-dessus de $y = 2$ entre $0$, exclu, et $\\dfrac{1}{2}$ : les solutions forment $]0\\,;\\,0{,}5]$.\nb) $\\dfrac{1}{x} = -1$ pour $x = -1$. Pour $x$ positif, jamais. Pour $x$ négatif, la courbe est sous $y = -1$ entre $-1$ et $0$, exclus tous les deux : $]{-1}\\,;\\,0[$.\n⛔ Le piège : multiplier les deux membres par $x$. On ne connaît pas son signe, et le sens de l'inégalité en dépend.",
          schema: repere([-4, 5, -4, 4], [{ pts: INVERSE_NEG }, { pts: INVERSE_POS }], [{ x: 0.5, y: 2 }, { x: -1, y: -1 }], [2, -1]),
          micros: ["reference_inverse", "reference_resoudre"],
        },
        {
          enonce: "On sait que $2 \\leqslant x \\leqslant 5$. Encadrer :\na) $x^2$\nb) $\\dfrac{1}{x}$\nc) $\\sqrt{x}$",
          correction:
            "Les trois fonctions sont monotones sur $[2\\,;\\,5]$ : on les applique aux deux bornes, en regardant si l'ordre est conservé.\na) Le carré est croissant sur les positifs : $4 \\leqslant x^2 \\leqslant 25$.\nb) L'inverse est décroissante sur $]0\\,;\\,+\\infty[$ : l'ordre s'INVERSE, $\\dfrac{1}{5} \\leqslant \\dfrac{1}{x} \\leqslant \\dfrac{1}{2}$, soit $0{,}2 \\leqslant \\dfrac{1}{x} \\leqslant 0{,}5$.\nc) La racine est croissante : $\\sqrt{2} \\leqslant \\sqrt{x} \\leqslant \\sqrt{5}$.\n⛔ Le piège au b) : écrire l'encadrement à l'envers, avec $\\dfrac{1}{2}$ à gauche. Or $\\dfrac{1}{2} > \\dfrac{1}{5}$.",
          micros: ["reference_comparer"],
        },
        {
          enonce: "a) On sait que $-3 \\leqslant x \\leqslant 2$. Encadrer $x^2$.\nb) On sait que $-1 \\leqslant x \\leqslant 3$. Encadrer $x^3$.",
          correction:
            "a) L'intervalle contient $0$, et le carré n'y est pas monotone : il décroît jusqu'à $0$, puis croît.\nSur $[-3\\,;\\,0]$, $x^2$ va de $9$ à $0$ ; sur $[0\\,;\\,2]$, de $0$ à $4$. Donc $0 \\leqslant x^2 \\leqslant 9$.\nb) Le cube est croissant sur $\\mathbb{R}$ : il conserve l'ordre, $(-1)^3 \\leqslant x^3 \\leqslant 3^3$, soit $-1 \\leqslant x^3 \\leqslant 27$.\n⛔ Le piège au a) : élever les deux bornes au carré et écrire $4 \\leqslant x^2 \\leqslant 9$. Or $x = 0$ donne $x^2 = 0$, hors de cet encadrement.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([-3, 0, 2], [9, 0, 4], "x²")}
              {repere([-3, 2, -1, 10], [{ q: [1, 0, 0] }], [{ x: -3, y: 9 }, { x: 0, y: 0 }, { x: 2, y: 4 }])}
            </div>
          ),
          micros: ["reference_comparer", "reference_carre", "reference_cube"],
        },
        {
          enonce: "Soit $f(x) = |x - 2|$.\na) Calculer $f(-1)$, $f(2)$ et $f(5)$.\nb) Dresser le tableau de variations de $f$ sur $[-2\\,;\\,6]$.\nc) Résoudre $f(x) = 3$.",
          correction:
            "a) $f(-1) = |-3| = 3$, $f(2) = 0$ et $f(5) = |3| = 3$.\nb) $|x - 2|$ est la distance entre $x$ et $2$ : elle diminue jusqu'à $x = 2$, où elle vaut $0$, puis augmente. $f(-2) = 4$ et $f(6) = 4$.\nc) Les nombres à distance $3$ de $2$ : $x = 2 - 3 = -1$ et $x = 2 + 3 = 5$. On les avait trouvés au a).\n⭐ La courbe est un V de sommet $(2\\,;\\,0)$ : celle de $|x|$, décalée de $2$ vers la droite.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([-2, 2, 6], [4, 0, 4])}
              {repere([-2, 6, -1, 5], [{ pts: [[-2, 4], [2, 0], [6, 4]] }], [{ x: -1, y: 3 }, { x: 5, y: 3 }], 3)}
            </div>
          ),
          micros: ["reference_valeur_absolue", "reference_resoudre"],
        },
        {
          enonce: "On compare $x$, $x^2$ et $\\sqrt{x}$ pour $x > 0$.\na) Calculer les trois pour $x = 0{,}25$, et les ranger.\nb) Même question pour $x = 4$.\nc) Que peut-on conjecturer ? Pour quel nombre sont-ils égaux ?",
          correction:
            "a) $0{,}25^2 = 0{,}0625$ et $\\sqrt{0{,}25} = 0{,}5$ : $0{,}0625 < 0{,}25 < 0{,}5$, soit $x^2 < x < \\sqrt{x}$.\nb) $4^2 = 16$ et $\\sqrt{4} = 2$ : $2 < 4 < 16$, soit $\\sqrt{x} < x < x^2$.\nc) Entre $0$ et $1$, le carré rapetisse et la racine grandit : $x^2 < x < \\sqrt{x}$. Au-delà de $1$, c'est l'inverse : $\\sqrt{x} < x < x^2$. En $x = 1$, les trois valent $1$.\n⭐ Sur le dessin — $x$ en bleu, $x^2$ en orange, $\\sqrt{x}$ en vert — les trois courbes se croisent au point $(1\\,;\\,1)$.",
          schema: repere([0, 5, -1, 5], [{ q: [0, 1, 0] }, { q: [1, 0, 0], couleur: ORANGE }, { pts: RACINE, couleur: VERT }], [{ x: 1, y: 1 }, { x: 0.25, y: 0.5 }, { x: 4, y: 2 }]),
          micros: ["reference_comparer"],
        },
        {
          enonce: "Résoudre :\na) $(x - 3)^2 = 16$\nb) $2x^2 - 50 = 0$\nc) $(x + 1)^2 = -4$",
          correction:
            "a) Deux nombres ont pour carré $16$ : $4$ et $-4$. Donc $x - 3 = 4$ ou $x - 3 = -4$, soit $x = 7$ ou $x = -1$.\nb) $2x^2 = 50$, donc $x^2 = 25$ : $x = 5$ ou $x = -5$.\nc) Un carré n'est jamais négatif : AUCUNE solution.\n⛔ Le piège au a) : n'écrire que $x - 3 = 4$, et perdre $x = -1$.",
          micros: ["reference_resoudre"],
        },
        {
          enonce: "Une terrasse carrée a une aire de $36$ m².\na) Quelle est la longueur de son côté ?\nb) On veut une terrasse carrée DEUX fois plus grande, de $72$ m². Faut-il doubler le côté ?\nc) Donner la valeur exacte du nouveau côté, puis une valeur approchée au centimètre.",
          correction:
            "a) Le côté $c$ vérifie $c^2 = 36$, avec $c > 0$ : $c = 6$ m.\nb) Non : un côté de $12$ m donnerait $12^2 = 144$ m², QUATRE fois plus. Doubler le côté multiplie l'aire par $4$.\nc) $c^2 = 72$ et $c > 0$ : $c = \\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2} \\approx 8{,}49$ m.\n⭐ Pour doubler l'aire, on multiplie le côté par $\\sqrt{2} \\approx 1{,}41$.\n⛔ Le piège au a) : garder aussi $c = -6$. Une longueur est positive.",
          micros: ["reference_carre", "reference_racine", "reference_resoudre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on reconnaît la fonction de référence, on calcule, on répond par une phrase.",
      rappel: [
        "On reconnaît la fonction de référence cachée dans la formule : un carré, un cube, un inverse, une racine.",
        "Une durée, une longueur, une masse sont positives : on écarte la solution négative.",
        "On répond avec l'unité.",
      ],
      exercices: [
        {
          titre: "Le gouffre",
          enonce: "Pour estimer la profondeur d'un gouffre, un spéléologue lâche un caillou et chronomètre sa chute. En négligeant la durée du son, la profondeur est $d(t) = 5t^2$, en mètres, où $t$ est la durée de la chute en secondes.\na) Le caillou touche le fond au bout de $2$ s. Quelle est la profondeur ?\nb) Si la chute dure deux fois plus longtemps, la profondeur double-t-elle ?\nc) Un autre gouffre fait $80$ m. Combien de temps dure la chute ?\nd) Pour un gouffre de $100$ m, donner la durée exacte, puis arrondie au dixième.",
          correction:
            "a) $d(2) = 5 \\times 2^2 = 5 \\times 4 = 20$ m.\nb) Non : $d(4) = 5 \\times 16 = 80$ m, QUATRE fois plus. La durée est au carré : doubler la durée multiplie la profondeur par $4$.\nc) $5t^2 = 80$ donne $t^2 = 16$, avec $t > 0$ : $t = 4$ s.\nd) $5t^2 = 100$ donne $t^2 = 20$, donc $t = \\sqrt{20} = 2\\sqrt{5} \\approx 4{,}5$ s.\n⭐ On garde la solution POSITIVE : une durée ne vaut pas $-4$ s.\n⛔ Le piège de terrain : le bruit du caillou met lui aussi du temps à remonter. Pour un gouffre profond, la vraie profondeur est un peu plus petite que ce calcul.",
          // Un tableau et non un repère : de 0 à 100 m, le canvas tracerait une
          // ligne de grille par mètre (il gradue les entiers).
          schema: tableau(["t (s)", "1", "2", "3", "4", "4,5"], ["d (m)", 5, 20, 45, 80, "101,25"]),
          micros: ["reference_carre", "reference_racine", "reference_resoudre"],
        },
        {
          titre: "Le marathon sous les 2 heures",
          enonce: "Sur un marathon de $42{,}195$ km, le temps de course, en heures, est $t(v) = \\dfrac{42{,}195}{v}$, où $v$ est la vitesse moyenne en km/h.\na) Quel est le temps d'un coureur à $10$ km/h ? À $12$ km/h ?\nb) Pourquoi la fonction $t$ est-elle décroissante ? Que veut dire ce sens de variation ?\nc) Pour courir un marathon en moins de $2$ heures, quelle vitesse moyenne faut-il dépasser ?\nd) En avril 2026, à Londres, Sabastian Sawe a couru le premier marathon officiel sous les $2$ heures, en $1$ h $59$ min $30$ s. Quelle était sa vitesse moyenne ?",
          correction:
            "a) $t(10) = 4{,}2195$ h, soit environ $4$ h $13$ min. $t(12) \\approx 3{,}52$ h, soit environ $3$ h $31$ min.\nb) $t(v)$, c'est $42{,}195$ fois l'inverse de $v$, et la fonction inverse est décroissante sur $]0\\,;\\,+\\infty[$ : plus on court vite, moins on met de temps.\nc) $t(v) < 2$ donne $\\dfrac{42{,}195}{v} < 2$. Comme $v > 0$, cela revient à $42{,}195 < 2v$, soit $v > 21{,}0975$ km/h.\nd) $1$ h $59$ min $30$ s, c'est $1 + \\dfrac{59{,}5}{60} \\approx 1{,}9917$ h. Sa vitesse : $\\dfrac{42{,}195}{1{,}9917} \\approx 21{,}2$ km/h, pendant plus de $42$ km.\n⛔ Le piège au a) : croire qu'à $12$ km/h au lieu de $10$, on gagne $2$ heures. Le temps n'est pas une fonction affine de la vitesse : on ne gagne qu'environ $42$ minutes.",
          schema: repere([0, 25, -1, 7], [{ pts: [[6, 7.0325], [7, 6.0279], [10, 4.2195], [12, 3.5163], [15, 2.813], [20, 2.1098], [25, 1.6878]] }], [{ x: 10, y: 4.2195 }], 2),
          micros: ["reference_inverse", "reference_comparer"],
        },
        {
          titre: "Le poids d'une baleine",
          enonce: "Chez la baleine à bosse, on modélise la masse $M$, en tonnes, par $M(L) = 0{,}009L^3$, où $L$ est la longueur de l'animal en mètres.\na) Estimer la masse d'un baleineau de $4{,}5$ m, puis celle d'un adulte de $15$ m.\nb) Une baleine deux fois plus longue qu'une autre est-elle deux fois plus lourde ?\nc) Quelle longueur correspond à une masse de $24$ tonnes ?",
          correction:
            "a) $M(4{,}5) = 0{,}009 \\times 4{,}5^3 \\approx 0{,}8$ t : environ $800$ kg à la naissance. $M(15) = 0{,}009 \\times 3\\,375 \\approx 30$ t.\nb) Non : $M(2L) = 0{,}009 \\times (2L)^3 = 8 \\times 0{,}009L^3$. Deux fois plus longue, elle est HUIT fois plus lourde.\nc) $0{,}009L^3 = 24$ donne $L^3 = \\dfrac{24}{0{,}009} \\approx 2\\,667$, donc $L \\approx 13{,}9$ m : c'est le nombre dont le cube vaut $2\\,667$, qu'on obtient à la calculatrice.\n⭐ La masse suit le VOLUME, qui a trois dimensions. Trois fois plus long, $27$ fois plus lourd : c'est pour cela qu'un géant est si lourd.\n⛔ Le piège au b) : « deux fois plus long, deux fois plus lourd ». C'est le cube de la longueur qui compte.",
          micros: ["reference_cube", "reference_resoudre"],
        },
        {
          titre: "Le refuge",
          enonce: "Un randonneur suit un sentier rectiligne. Sa position est repérée par $x$, en km depuis le départ, et un refuge se trouve au kilomètre $12$. La distance qui le sépare du refuge est $d(x) = |x - 12|$.\na) Calculer $d(4)$, $d(12)$ et $d(15)$.\nb) Dresser le tableau de variations de $d$ sur $[0\\,;\\,20]$.\nc) À quelles positions est-il à $3$ km du refuge ?\nd) Le téléphone capte dans un rayon de $2$ km autour du refuge. Sur quelle portion du sentier capte-t-il ?",
          correction:
            "a) $d(4) = |-8| = 8$ km, $d(12) = 0$ et $d(15) = |3| = 3$ km.\nb) La distance diminue jusqu'au refuge, où elle vaut $0$, puis elle augmente : $d(0) = 12$, $d(12) = 0$ et $d(20) = 8$.\nc) $|x - 12| = 3$ donne $x - 12 = 3$ ou $x - 12 = -3$ : aux kilomètres $15$ et $9$.\nd) $|x - 12| \\leqslant 2$ donne $10 \\leqslant x \\leqslant 14$ : entre les kilomètres $10$ et $14$, soit sur $[10\\,;\\,14]$.\n⛔ Le piège au c) : ne trouver que le kilomètre $15$. On peut aussi être à $3$ km AVANT le refuge.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([0, 12, 20], [12, 0, 8], "d")}
              {repere([0, 20, -2, 14], [{ pts: [[0, 12], [12, 0], [20, 8]] }], [{ x: 9, y: 3 }, { x: 15, y: 3 }], 3)}
            </div>
          ),
          micros: ["reference_valeur_absolue", "reference_resoudre"],
        },
      ],
    },
  ],
};
