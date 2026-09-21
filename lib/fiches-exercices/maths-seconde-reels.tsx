// ─── Fiche d'exercices : nombres réels, intervalles, valeur absolue (seconde) ──
//
// Huitième et dernière feuille du bloc « Nombres et calculs » (21/09/2026).
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/reels-intervalles.bank.ts`
// (notionId reels_intervalles). La fiche de cours de la notion est écrite APRÈS
// la feuille, dans la même session (ordre de Frédéric).
//
// ⭐ LES DEUX DÉMONSTRATIONS DU BO DE SECONDE : « 1/3 n'est pas décimal »
// (exercice 15) et « √2 est irrationnel » (exercice 17). La seconde s'appuie sur
// la feuille d'arithmétique : le carré d'un impair est impair.
//
// ⛔ LA VALEUR ABSOLUE SE RÉSOUT PAR LA DISTANCE, SUR LA DROITE GRADUÉE, OU PAR
// LE CALCUL — jamais sur la courbe (Frédéric, 04/09/2026). |x − 3| = 5 se lit :
// « la distance entre x et 3 vaut 5 ».
//
// ⭐ Le réel : la marge d'erreur d'un sondage (exercice 19) — la même idée que
// la vidéo « sondages » de la chaîne.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-reels.mjs`.
//
// Micro-compétences : reels_ensembles (1, 2, 15, 17), reels_droite_graduee (3,
// 8, 9), intervalle_representer (4, 11, 12, 13, 19, 20), intervalle_appartenance
// (5, 13, 18, 20), valeur_absolue_distance (7, 8, 9, 10, 11, 12, 14, 18, 19,
// 20), reels_encadrement (6, 14, 16). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (√2, pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

/** Une droite graduée, avec des points et/ou un intervalle.
 *  ⛔ Cadre de 260 et dix graduations au plus : mesuré à 375 px sur la feuille
 *  des équations, un cadre de 300 rendait les nombres sous 11 px. */
const droite = (
  min: number,
  max: number,
  step: number,
  options: {
    points?: { value: number; label?: string; color?: string }[];
    intervalle?: { de?: number; a?: number; deInclus?: boolean; aInclus?: boolean; label?: string };
  },
) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        size: { width: 260, height: 80 },
        points: options.points ?? [],
        intervalles: options.intervalle ? [options.intervalle] : [],
      }}
    />
  </div>
);

export const exercicesReelsSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "reels-intervalles",
  titre: "Nombres réels, intervalles et valeur absolue",
  accroche:
    "Vingt exercices, du calcul seul au problème : ranger un nombre dans son ensemble, écrire et dessiner un intervalle, encadrer, calculer une distance avec la valeur absolue. Et deux preuves du programme : 1/3 n'est pas décimal, √2 n'est pas une fraction. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/reels-intervalles", titre: "Nombres réels, intervalles et valeur absolue" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une notion par exercice. On justifie chaque réponse en une phrase.",
      rappel: [
        "LES ENSEMBLES : $\\mathbb{N}$ (entiers positifs) $\\subset \\mathbb{Z}$ (entiers) $\\subset \\mathbb{D}$ (décimaux) $\\subset \\mathbb{Q}$ (fractions) $\\subset \\mathbb{R}$ (tous les nombres de la droite).",
        "INTERVALLE : $[-1\\,;\\,4[$ contient $-1$ mais pas $4$. Le crochet tourné vers le nombre le contient. Du côté de l'infini, toujours ouvert.",
        "VALEUR ABSOLUE : $|a - b|$ est la DISTANCE entre $a$ et $b$ sur la droite. Elle n'est jamais négative : $|-8| = 8$.",
      ],
      exercices: [
        {
          // ⚠️ Lettré a) à d) après la mesure du mode classe (21/09) : d'un seul
          // bloc, le corrigé tenait sur UNE diapo et la dépassait de 207 px.
          enonce: "Pour chaque nombre, donner le plus petit ensemble parmi $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{D}$, $\\mathbb{Q}$ et $\\mathbb{R}$ qui le contient.\na) $7$ et $-4$\nb) $0{,}35$ et $\\dfrac{3}{8}$\nc) $\\dfrac{2}{3}$ et $\\sqrt{16}$\nd) $\\sqrt{2}$ et $\\pi$",
          correction:
            "On cherche l'écriture la plus simple de chaque nombre, puis le plus petit ensemble.\na) $7$ est un entier positif : $\\mathbb{N}$. $-4$ est un entier négatif : $\\mathbb{Z}$.\nb) $0{,}35$ a une écriture décimale qui s'arrête : $\\mathbb{D}$. $\\dfrac{3}{8} = 0{,}375$ : $\\mathbb{D}$ aussi.\nc) $\\dfrac{2}{3} = 0{,}666\\ldots$ ne s'arrête jamais : c'est une fraction, $\\mathbb{Q}$. Et $\\sqrt{16} = 4$ : $\\mathbb{N}$.\n⛔ Le piège : ranger $\\sqrt{16}$ dans $\\mathbb{R}$ parce qu'il y a une racine. On calcule d'abord : c'est $4$.\nd) $\\sqrt{2}$ et $\\pi$ ne sont pas des fractions : $\\mathbb{R}$.",
          schema: tableau("Le plus petit ensemble", ["ensemble", "parce que"], [
            { label: "3/8", values: ["D", "3/8 = 0,375"] },
            { label: "2/3", values: ["Q", "0,666… sans fin"] },
            { label: "√16", values: ["N", "√16 = 4"] },
            { label: "√2", values: ["R", "pas une fraction"] },
          ]),
          micros: ["reels_ensembles"],
        },
        {
          enonce: "Vrai ou faux ? Justifier.\na) $-3 \\in \\mathbb{N}$\nb) $\\dfrac{1}{4} \\in \\mathbb{D}$\nc) $\\dfrac{1}{3} \\in \\mathbb{D}$\nd) Tout nombre entier est un nombre décimal.",
          correction:
            "a) FAUX. $\\mathbb{N}$ ne contient que les entiers positifs ou nuls. $-3$ est dans $\\mathbb{Z}$.\nb) VRAI. $\\dfrac{1}{4} = 0{,}25$ : l'écriture décimale s'arrête.\nc) FAUX. $\\dfrac{1}{3} = 0{,}333\\ldots$ : l'écriture décimale ne s'arrête jamais. L'exercice 15 le démontre.\nd) VRAI. $5 = 5{,}0$ : un entier est un décimal sans chiffre après la virgule. C'est pour cela que $\\mathbb{Z} \\subset \\mathbb{D}$.\n⭐ Le symbole $\\in$ se lit « appartient à ».",
          micros: ["reels_ensembles"],
        },
        {
          // ⚠️ Lettré a) à d) pour la même raison que l'exercice 1 (138 px de trop).
          enonce: "Placer sur une droite graduée les points :\na) $A$ d'abscisse $-1{,}5$\nb) $B$ d'abscisse $0{,}5$\nc) $C$ d'abscisse $\\dfrac{7}{4}$\nd) $D$ d'abscisse $\\sqrt{2}$",
          correction:
            "On écrit d'abord chaque nombre en décimal, pour savoir entre quelles graduations il tombe.\na) $-1{,}5$ : au milieu entre $-2$ et $-1$.\nb) $0{,}5$ : au milieu entre $0$ et $1$.\nc) $\\dfrac{7}{4} = 1{,}75$ : aux trois quarts entre $1$ et $2$.\n⛔ Le piège : placer $\\dfrac{7}{4}$ à $7$ ou à $4$. Une fraction est un nombre : on la calcule avant de la placer.\nd) $\\sqrt{2} \\approx 1{,}41$ : un peu avant le milieu entre $1$ et $2$. $D$ est donc à gauche de $C$, car $1{,}41 < 1{,}75$.",
          schema: droite(-2, 2, 1, {
            points: [
              { value: -1.5, label: "A", color: "#2563eb" },
              { value: 0.5, label: "B", color: "#2563eb" },
              { value: 1.75, label: "C", color: "#dc2626" },
              { value: Math.SQRT2, label: "D", color: "#16a34a" },
            ],
          }),
          micros: ["reels_droite_graduee"],
        },
        {
          enonce: "Traduire chaque intervalle par une inégalité, puis le dessiner.\na) $[-1\\,;\\,4[$\nb) $]{-\\infty}\\,;\\,3]$\nc) $]0\\,;\\,+\\infty[$",
          correction:
            "Un crochet tourné vers le nombre donne $\\leqslant$ ; tourné à l'envers, il donne $<$.\na) $[-1\\,;\\,4[$ : $-1 \\leqslant x < 4$. On prend $-1$, pas $4$.\nb) $]{-\\infty}\\,;\\,3]$ : $x \\leqslant 3$. Pas de borne à gauche : tous les nombres plus petits que $3$.\nc) $]0\\,;\\,+\\infty[$ : $x > 0$. Les nombres strictement positifs.\n⛔ Le piège au a) : écrire $-1 < x < 4$. Le crochet « $[$ » devant $-1$ est tourné vers lui : $-1$ est compris.",
          schema: droite(-2, 5, 1, { intervalle: { de: -1, a: 4, deInclus: true, aInclus: false, label: "[−1 ; 4[" } }),
          micros: ["intervalle_representer"],
        },
        {
          enonce: "Vrai ou faux ?\na) $3 \\in ]{-2}\\,;\\,3[$\nb) $-2 \\in [-2\\,;\\,5]$\nc) $2{,}99 \\in ]{-2}\\,;\\,3[$\nd) $\\pi \\in [3{,}14\\,;\\,3{,}15]$",
          correction:
            "a) FAUX. Le crochet est tourné à l'envers devant $3$ : $3$ n'est pas compris.\nb) VRAI. Le crochet est tourné vers $-2$ : il est compris.\nc) VRAI. $-2 < 2{,}99 < 3$ : il est entre les bornes, même s'il est tout près de $3$.\nd) VRAI. $\\pi \\approx 3{,}14159$, et $3{,}14 \\leqslant 3{,}14159 \\leqslant 3{,}15$.\n⛔ Le piège au c) : croire qu'un nombre si proche de $3$ est exclu avec lui. Seul $3$ est exclu ; $2{,}99$, $2{,}999$ et $2{,}9999$ sont dedans.",
          micros: ["intervalle_appartenance"],
        },
        {
          enonce: "Encadrer.\na) $\\sqrt{30}$ entre deux entiers qui se suivent.\nb) $\\sqrt{30}$ au dixième.\nc) $\\dfrac{22}{7}$ au centième. Ce nombre est-il plus grand que $\\pi$ ?",
          correction:
            "a) On cherche deux carrés autour de $30$ : $5^2 = 25$ et $6^2 = 36$. Comme $25 < 30 < 36$, on a $5 < \\sqrt{30} < 6$.\nb) On essaie les dixièmes : $5{,}4^2 = 29{,}16$ et $5{,}5^2 = 30{,}25$. Donc $5{,}4 < \\sqrt{30} < 5{,}5$.\nc) $\\dfrac{22}{7} \\approx 3{,}1428$, donc $3{,}14 < \\dfrac{22}{7} < 3{,}15$.\nEt $\\pi \\approx 3{,}1416$ : $\\dfrac{22}{7}$ est un peu plus GRAND que $\\pi$, d'environ $0{,}0013$.\n⭐ Archimède utilisait déjà $\\dfrac{22}{7}$ pour $\\pi$ : c'est une bonne valeur approchée, pas la valeur exacte.",
          micros: ["reels_encadrement"],
        },
        {
          enonce: "Calculer.\na) $|-8|$\nb) $|3 - 7|$\nc) $|\\pi - 4|$\nd) $|\\sqrt{2} - 1|$",
          correction:
            "Si le nombre dans les barres est positif, on le garde. S'il est négatif, on prend son opposé.\na) $|-8| = 8$.\nb) $3 - 7 = -4$, donc $|3 - 7| = 4$.\nc) $\\pi \\approx 3{,}14$, donc $\\pi - 4$ est négatif. $|\\pi - 4| = 4 - \\pi \\approx 0{,}86$.\nd) $\\sqrt{2} \\approx 1{,}41$, donc $\\sqrt{2} - 1$ est positif. $|\\sqrt{2} - 1| = \\sqrt{2} - 1 \\approx 0{,}41$.\n⛔ Le piège au c) : écrire $|\\pi - 4| = \\pi - 4$. Ce nombre est négatif, et une valeur absolue ne l'est jamais.",
          micros: ["valeur_absolue_distance"],
        },
        {
          enonce: "Calculer la distance entre les deux nombres, avec une valeur absolue.\na) $-3$ et $5$\nb) $-7$ et $-2$\nc) $2{,}5$ et $-1{,}5$",
          correction:
            "La distance entre $a$ et $b$ est $|a - b|$, ou $|b - a|$ : c'est la même chose.\na) $|5 - (-3)| = |8| = 8$.\nb) $|-2 - (-7)| = |5| = 5$.\nc) $|2{,}5 - (-1{,}5)| = |4| = 4$.\n⭐ On vérifie le a) sur la droite : de $-3$ à $0$, il y a $3$ ; de $0$ à $5$, il y a $5$ ; en tout, $8$.\n⛔ Le piège au a) : calculer $5 - 3 = 2$. On soustrait $-3$, donc on AJOUTE $3$.",
          micros: ["valeur_absolue_distance", "reels_droite_graduee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. On traduit la valeur absolue en distance, on dessine, puis on écrit la réponse.",
      rappel: [
        "$|x - a| = r$ : les nombres à la distance $r$ de $a$. Il y en a DEUX, $a - r$ et $a + r$.",
        "$|x - a| \\leqslant r$ : les nombres à moins de $r$ de $a$. C'est l'intervalle $[a - r\\,;\\,a + r]$, de centre $a$.",
        "$|x + 2|$, c'est $|x - (-2)|$ : la distance entre $x$ et $-2$, pas $2$.",
      ],
      exercices: [
        {
          enonce: "Résoudre $|x - 3| = 5$, avec la droite graduée puis par le calcul.",
          correction:
            "Avec la droite : $|x - 3|$ est la distance entre $x$ et $3$. On cherche les nombres à la distance $5$ de $3$ : on part de $3$ et on fait $5$ pas de chaque côté. On trouve $3 - 5 = -2$ et $3 + 5 = 8$.\nPar le calcul : le nombre $x - 3$ vaut $5$ ou $-5$. Donc $x = 8$ ou $x = -2$.\nLes solutions sont $-2$ et $8$.\n⛔ Le piège : ne garder que $x = 8$. Il y a toujours deux nombres à une distance donnée, un de chaque côté.",
          schema: droite(-4, 10, 2, {
            points: [
              { value: -2, label: "−2", color: "#16a34a" },
              { value: 3, label: "3", color: "#dc2626" },
              { value: 8, label: "8", color: "#16a34a" },
            ],
          }),
          micros: ["valeur_absolue_distance", "reels_droite_graduee"],
        },
        {
          enonce: "Résoudre.\na) $|x + 2| = 4$\nb) $|x| = -3$",
          correction:
            "a) $|x + 2| = |x - (-2)|$ : c'est la distance entre $x$ et $-2$. Les nombres à la distance $4$ de $-2$ sont $-2 - 4 = -6$ et $-2 + 4 = 2$.\nLes solutions sont $-6$ et $2$.\nb) Une distance n'est jamais négative : l'équation n'a AUCUNE solution.\n⛔ Le piège au a) : partir de $2$ au lieu de $-2$, et trouver $-2$ et $6$. On vérifie : $|6 + 2| = 8$, pas $4$.",
          micros: ["valeur_absolue_distance"],
        },
        {
          enonce: "Écrire l'ensemble des solutions sous forme d'intervalle.\na) $|x - 1| \\leqslant 3$\nb) $|x + 3| < 2$",
          correction:
            "a) Les nombres à une distance de $1$ inférieure ou égale à $3$. On va de $1 - 3 = -2$ à $1 + 3 = 4$, bornes comprises : $[-2\\,;\\,4]$.\nb) $|x + 3|$ est la distance entre $x$ et $-3$. On va de $-3 - 2 = -5$ à $-3 + 2 = -1$, bornes exclues : $]{-5}\\,;\\,-1[$.\n⭐ Le centre de l'intervalle est le nombre de la valeur absolue ($1$, puis $-3$) ; sa demi-largeur est le nombre de droite ($3$, puis $2$).\n⛔ Le piège au b) : garder les bornes. Le signe $<$ est strict : $-5$ et $-1$ sont à la distance $2$ exactement, donc exclus.",
          schema: droite(-3, 5, 1, { intervalle: { de: -2, a: 4, deInclus: true, aInclus: true, label: "|x − 1| ≤ 3" } }),
          micros: ["valeur_absolue_distance", "intervalle_representer"],
        },
        {
          enonce: "Écrire chaque intervalle avec une valeur absolue.\na) $[2\\,;\\,8]$\nb) $]{-4}\\,;\\,0[$",
          correction:
            "On cherche le CENTRE (le milieu des bornes) et la demi-largeur.\na) Centre : $\\dfrac{2 + 8}{2} = 5$. Demi-largeur : $8 - 5 = 3$. Bornes comprises : $|x - 5| \\leqslant 3$.\nb) Centre : $\\dfrac{-4 + 0}{2} = -2$. Demi-largeur : $0 - (-2) = 2$. Bornes exclues : $|x + 2| < 2$.\n⭐ On vérifie le a) sur les bornes : $|2 - 5| = 3$ et $|8 - 5| = 3$. ✓",
          micros: ["valeur_absolue_distance", "intervalle_representer"],
        },
        {
          enonce: "Soient $I = [-3\\,;\\,4[$ et $J = ]1\\,;\\,6]$.\na) Dessiner $I$ et $J$ sur la même droite.\nb) Écrire les nombres qui sont à la fois dans $I$ et dans $J$ (l'intersection $I \\cap J$).\nc) Écrire les nombres qui sont dans $I$ ou dans $J$ (la réunion $I \\cup J$).",
          correction:
            "a) $I$ va de $-3$ (compris) à $4$ (exclu) ; $J$ va de $1$ (exclu) à $6$ (compris). Ils se chevauchent entre $1$ et $4$.\nb) Dans les deux à la fois : de $1$ à $4$, sans $1$ (hors de $J$) et sans $4$ (hors de $I$). $I \\cap J = ]1\\,;\\,4[$.\nc) Dans l'un ou l'autre : de $-3$ à $6$, sans trou au milieu. $I \\cup J = [-3\\,;\\,6]$.\n⛔ Le piège au b) : écrire $[1\\,;\\,4]$. Une borne de l'intersection n'est comprise que si elle est dans LES DEUX intervalles.",
          schema: tableau("I = [−3 ; 4[ et J = ]1 ; 6]", ["dans I", "dans J"], [
            { label: "−3", values: ["oui", "non"] },
            { label: "1", values: ["oui", "non"] },
            { label: "2", values: ["oui", "oui"] },
            { label: "4", values: ["non", "oui"] },
            { label: "6", values: ["non", "oui"] },
          ]),
          micros: ["intervalle_representer", "intervalle_appartenance"],
        },
        {
          enonce: "Un élève mesure un crayon et lit $12{,}4$ cm. Sa règle est précise au millimètre : la vraie longueur $L$ vérifie $|L - 12{,}4| \\leqslant 0{,}1$.\na) Écrire l'ensemble des valeurs possibles de $L$ sous forme d'intervalle.\nb) Le crayon peut-il mesurer $12{,}45$ cm ? Et $12{,}55$ cm ?",
          correction:
            "a) $L$ est à moins de $0{,}1$ de $12{,}4$ : de $12{,}4 - 0{,}1 = 12{,}3$ à $12{,}4 + 0{,}1 = 12{,}5$, bornes comprises. $L \\in [12{,}3\\,;\\,12{,}5]$.\nb) $|12{,}45 - 12{,}4| = 0{,}05$, qui est bien $\\leqslant 0{,}1$ : c'est possible.\n$|12{,}55 - 12{,}4| = 0{,}15$, qui dépasse $0{,}1$ : c'est impossible.\n⭐ Une mesure n'est jamais un nombre exact : c'est un intervalle. La valeur absolue dit sa largeur.",
          micros: ["valeur_absolue_distance", "reels_encadrement"],
        },
        {
          enonce: "a) Démontrer que $\\dfrac{1}{3}$ n'est pas un nombre décimal.\nb) Parmi $\\dfrac{7}{40}$, $\\dfrac{5}{12}$ et $\\dfrac{13}{20}$, lesquels sont décimaux ?",
          correction:
            "a) Un décimal s'écrit $\\dfrac{a}{10^n}$, avec $a$ entier. Supposons que $\\dfrac{1}{3} = \\dfrac{a}{10^n}$.\nAlors $10^n = 3a$ : $10^n$ serait un multiple de $3$.\nOr la somme des chiffres de $10^n$ ($1$ suivi de zéros) vaut $1$ : $10^n$ n'est pas divisible par $3$. C'est impossible, donc $\\dfrac{1}{3}$ n'est pas décimal.\nb) $\\dfrac{7}{40} = 0{,}175$ : décimal. $\\dfrac{13}{20} = 0{,}65$ : décimal.\n$\\dfrac{5}{12} = 0{,}41666\\ldots$ : pas décimal. Le facteur $3$ de $12 = 2^2 \\times 3$ l'en empêche, comme pour $\\dfrac{1}{3}$.\n⭐ La règle : une fraction irréductible est décimale quand son dénominateur n'a pas d'autre facteur premier que $2$ et $5$.",
          micros: ["reels_ensembles"],
        },
        {
          enonce: "Encadrer $\\sqrt{7}$, d'abord entre deux entiers, puis au dixième, puis au centième.",
          correction:
            "On élève au carré des nombres de plus en plus proches.\nEntre deux entiers : $2^2 = 4$ et $3^2 = 9$, donc $2 < \\sqrt{7} < 3$.\nAu dixième : $2{,}6^2 = 6{,}76$ et $2{,}7^2 = 7{,}29$, donc $2{,}6 < \\sqrt{7} < 2{,}7$.\nAu centième : $2{,}64^2 = 6{,}9696$ et $2{,}65^2 = 7{,}0225$, donc $2{,}64 < \\sqrt{7} < 2{,}65$.\n⭐ À chaque étape, l'encadrement devient dix fois plus étroit. C'est ce que fait la calculatrice, en beaucoup plus vite.",
          micros: ["reels_encadrement"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes, et une preuve. On traduit en distance ou en intervalle, et on conclut par une phrase.",
      rappel: [
        "« À $r$ près autour de $a$ » s'écrit $|x - a| \\leqslant r$, c'est-à-dire $x \\in [a - r\\,;\\,a + r]$.",
        "Pour démontrer qu'une chose est IMPOSSIBLE, on la suppose vraie et on arrive à une contradiction.",
      ],
      exercices: [
        {
          titre: "√2 n'est pas une fraction",
          enonce: "On suppose que $\\sqrt{2} = \\dfrac{p}{q}$, avec $p$ et $q$ entiers positifs, et la fraction irréductible.\na) Montrer que $p^2 = 2q^2$. En déduire que $p^2$ est pair.\nb) On sait que le carré d'un nombre impair est impair. En déduire que $p$ est pair.\nc) On écrit $p = 2k$. Montrer que $q^2 = 2k^2$, puis que $q$ est pair.\nd) Conclure.",
          correction:
            "a) On élève au carré : $2 = \\dfrac{p^2}{q^2}$, donc $p^2 = 2q^2$. C'est $2$ fois un entier : $p^2$ est pair.\nb) Si $p$ était impair, $p^2$ serait impair. Or $p^2$ est pair : $p$ est donc pair.\nc) On remplace : $(2k)^2 = 2q^2$, donc $4k^2 = 2q^2$ et $q^2 = 2k^2$. Comme au a), $q^2$ est pair, puis $q$ est pair.\nd) $p$ et $q$ sont tous les deux pairs : la fraction $\\dfrac{p}{q}$ se simplifie par $2$. Or on l'avait supposée irréductible. C'est une contradiction.\nDonc $\\sqrt{2}$ ne peut pas s'écrire comme une fraction : il est dans $\\mathbb{R}$ mais pas dans $\\mathbb{Q}$.\n⭐ Cette preuve a plus de deux mille ans. Elle montre que la droite des nombres a des « trous » que les fractions ne remplissent pas.",
          micros: ["reels_ensembles"],
        },
        {
          titre: "La pièce à 0,2 mm près",
          enonce: "Une usine fabrique des pièces qui doivent mesurer $50$ mm, à $0{,}2$ mm près. Une pièce de longueur $L$ est acceptée si $|L - 50| \\leqslant 0{,}2$.\na) Écrire l'ensemble des longueurs acceptées sous forme d'intervalle.\nb) On mesure quatre pièces : $49{,}75$ ; $50{,}1$ ; $50{,}25$ ; $49{,}8$. Lesquelles sont acceptées ?",
          correction:
            "a) De $50 - 0{,}2 = 49{,}8$ à $50 + 0{,}2 = 50{,}2$, bornes comprises : $[49{,}8\\,;\\,50{,}2]$.\nb) On calcule l'écart à $50$ de chaque pièce.\n$|49{,}75 - 50| = 0{,}25$ : refusée. $|50{,}1 - 50| = 0{,}1$ : acceptée.\n$|50{,}25 - 50| = 0{,}25$ : refusée. $|49{,}8 - 50| = 0{,}2$ : acceptée, tout juste.\nDeux pièces sont acceptées : $50{,}1$ et $49{,}8$.\n⛔ Le piège : refuser $49{,}8$. L'inégalité est large ($\\leqslant$) : un écart de $0{,}2$ exactement est accepté.",
          schema: droite(49.6, 50.4, 0.2, {
            intervalle: { de: 49.8, a: 50.2, deInclus: true, aInclus: true, label: "acceptées" },
          }),
          micros: ["valeur_absolue_distance", "intervalle_appartenance"],
        },
        {
          titre: "Le sondage",
          enonce: "Un sondage donne $52\\,\\%$ des voix à une candidate, avec une marge d'erreur de $3$ points. La vraie proportion $p$ (en %) vérifie donc $|p - 52| \\leqslant 3$.\na) Écrire les valeurs possibles de $p$ sous forme d'intervalle.\nb) Peut-on affirmer que la candidate aura plus de $50\\,\\%$ des voix ?\nc) Quelle marge d'erreur faudrait-il, au plus, pour pouvoir l'affirmer ?",
          correction:
            "a) De $52 - 3 = 49$ à $52 + 3 = 55$ : $p \\in [49\\,;\\,55]$.\nb) Non. L'intervalle contient des valeurs sous $50$, comme $49$ : la candidate peut perdre.\nc) Il faut que toutes les valeurs possibles dépassent $50$, donc que $52 - m > 50$, soit $m < 2$. La marge d'erreur doit être inférieure à $2$ points.\n⛔ Le piège : lire « $52\\,\\%$ » et conclure qu'elle gagne. Un sondage ne donne pas un nombre, il donne un INTERVALLE.",
          schema: droite(46, 56, 2, {
            intervalle: { de: 49, a: 55, deInclus: true, aInclus: true, label: "p possible" },
          }),
          micros: ["valeur_absolue_distance", "intervalle_representer"],
        },
        {
          titre: "Deux relais téléphoniques",
          enonce: "Sur une route droite, on repère chaque point par sa borne kilométrique $x$. Un relais en $A$ (borne $12$) capte à moins de $5$ km ; un relais en $B$ (borne $20$) capte à moins de $8$ km.\na) Traduire « capté par $A$ » avec une valeur absolue, puis en intervalle.\nb) Même question pour $B$.\nc) Sur quelle portion de route capte-t-on les deux relais ?\nd) Sur quelle portion capte-t-on au moins un relais ?",
          correction:
            "a) Capté par $A$ : $|x - 12| < 5$, soit $x \\in ]7\\,;\\,17[$.\nb) Capté par $B$ : $|x - 20| < 8$, soit $x \\in ]12\\,;\\,28[$.\nc) Les deux à la fois : l'intersection, $]12\\,;\\,17[$. On capte les deux relais entre les bornes $12$ et $17$.\nd) Au moins un : la réunion, $]7\\,;\\,28[$. Les zones se chevauchent, il n'y a pas de trou.\n⭐ Au point $A$ lui-même (borne $12$), on ne capte pas $B$ : $|12 - 20| = 8$, et il faut moins de $8$.",
          micros: ["valeur_absolue_distance", "intervalle_representer", "intervalle_appartenance"],
        },
      ],
    },
  ],
};
