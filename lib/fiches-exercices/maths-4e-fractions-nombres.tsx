// ─── Fiche d'exercices : fractions et nombres rationnels (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-fraction-nombre.tsx` et sur
// les cinq micros du coach de 4e, notionId `fraction_nombre`. Son angle est celui
// de la fiche : CE QU'EST LE NOMBRE — ses écritures (fractions égales, forme
// irréductible, écriture décimale, a/b), et son RANG (comparer, ranger, placer
// sur la droite). ⛔ Aucune opération : additionner, multiplier, diviser, prendre
// une fraction d'une quantité, l'inverse et l'opposé sont à la feuille sœur,
// `fraction_calcul`. Les nombres négatifs n'apparaissent que pour être rangés
// (la notion a `relatif_operation` pour prérequis).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 1/2 = 2/4, ni 6/8, ni
// 12/18, ni la famille 1/2, 1/3, 1/4, 1/5, ni 2/5 contre 3/5, ni 0,5, ni 1/4 =
// 0,25, ni 7 = 7/1. ⛔ Ni ceux de la feuille de 3e (`fraction_rationnel`) : ni
// −6, 0,35, −1,2, 5/0, 7/8, 0,15, 2/3 = 0,666…, 5/6 contre 7/9, −3/4 contre
// −2/5, 9/12, 1/7, le marathon, 0,58 et 7/12, 1/3 et 1/2, 0,99 et 1.
//
// Les pièges nommés : ajouter au lieu de multiplier pour fabriquer une fraction
// égale (1), le « même écart » entre numérateur et dénominateur (2), s'arrêter
// avant l'irréductible (3), barrer des chiffres au lieu de diviser (4), lire la
// barre de fraction comme une virgule (5), des centièmes pris pour des dixièmes
// (6), croire qu'un entier ou un négatif n'est pas rationnel, et 22/7 pris pour
// π (7), un grand dénominateur pris pour une grande fraction (8), ranger d'après
// les numérateurs (9), garder l'ordre des positifs chez les négatifs (10),
// comparer des nombres de cibles au lieu de parts (11), « pas de décimal exact,
// donc pas rationnel » (12), deux fractions aux nombres différents crues
// différentes (13), « près des deux tiers » lu comme « plus des deux tiers »
// (14), une fraction crue toujours plus petite que 1 (15), « rien entre deux
// fractions voisines » (16), le plus grand nombre de réussites pris pour le
// meilleur taux (17), 0,7 et 0,72 lus comme 7 et 72 (18), le petit pignon qui
// ferait le grand braquet quel que soit le plateau (19), l'arrondi pris trop tôt
// qui rend égales deux parts différentes (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - biathlon : 20 cibles à l'individuelle (4 tirs de 5 cibles), 10 au sprint
//   (2 tirs de 5) — règlement des épreuves de l'IBU (Union internationale de
//   biathlon) — ex. 11 ; les scores de Léa et d'Inès sont inventés ;
// - électricité : le nucléaire a fourni environ 65 % de la production
//   d'électricité française en 2023 (RTE, Bilan électrique 2023) — ex. 14 ;
// - vélo de route : le pédalier « compact » à plateaux de 50 et 34 dents et la
//   cassette de 11 à 28 dents sont l'équipement courant des vélos de route
//   (catalogues Shimano 105 / Ultegra) — ex. 19 ;
// - l'étape de 200 km, les lancers francs, les classes de 4e à vélo sont
//   IMAGINÉS, à l'ordre de grandeur réel — ex. 17, 18, 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés. Le canvas `fraction` du coach sert trois fois : deux BARRES l'une sous
// l'autre (fractions égales, même numérateur), la GRILLE de cent carreaux (la
// fraction devenue centièmes, puis pourcentage). La droite graduée (`intervalles`)
// range et place ; les tableaux montrent les écritures d'un même nombre et les
// divisions faites EN HAUT ET EN BAS.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme les
// autres feuilles : c'est la voix du cahier, pas celle du manuel.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fractions-nombres-4e.mjs`.
//
// Micro-compétences : fraction_egale (1, 2, 9, 11, 13, 15, 16, 17),
// fraction_simplifier (2, 3, 4, 6, 13, 14, 17, 18, 19, 20),
// fraction_decimal (5, 8, 11, 12, 14, 15, 17, 18, 19, 20),
// fraction_rationnel (6, 7, 12, 14, 18, 19, 20),
// fraction_comparer (8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { BLEU, ORANGE, intervalles, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier (mesuré à 375 px sur la feuille de Pythagore). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** Deux BARRES de fraction l'une sous l'autre, même longueur de départ : l'œil
 *  compare les surfaces coloriées. ⚠️ 200 de haut au minimum : l'étiquette de la
 *  seconde barre est posée à y = 190 (canvas `fraction`, modèle `compare`). */
const comparer = (a: [number, number], b: [number, number]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    <CanvasRenderer
      figure={
        {
          kind: "fraction",
          model: "compare",
          fractions: [
            { numerator: a[0], denominator: a[1] },
            { numerator: b[0], denominator: b[1] },
          ],
          size: { width: 320, height: 205 },
        } as never
      }
    />
  </div>
);

/** La GRILLE de cent carreaux : une fraction devenue centièmes, donc un
 *  pourcentage. ⚠️ SVG local SANS texte (25/09) : le canvas `fraction`/`grid`
 *  écrivait « 85/100 » à 8 px une fois rétréci (carreaux figés à 34, cadre de
 *  360) ; la légende en dessous dit déjà la fraction, en texte lisible. */
const grille = (colories: number, legende: string) => (
  <div className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
    <svg viewBox="0 0 204 204" className="block h-auto w-full" role="img" aria-label={`Grille de 100 carreaux, ${colories} coloriés`}>
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={2 + (i % 10) * 20} y={2 + Math.floor(i / 10) * 20} width={20} height={20} fill={i < colories ? "#2563eb" : "#f8fafc"} stroke="#334155" strokeWidth={1.5} />
      ))}
    </svg>
    <p className="mt-1 text-center text-xs font-black text-slate-600">{legende}</p>
  </div>
);

/** Un tableau à PLUSIEURS lignes (le `tableau` de figures.tsx n'en a qu'une) :
 *  les divisions faites en haut et en bas, ligne après ligne. */
const etapes = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((l) => ({ values: l })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesFractionsNombres4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "fraction-nombre",
  titre: "Fractions et nombres rationnels",
  accroche:
    "Vingt exercices, du geste seul au problème : fabriquer des fractions égales, simplifier jusqu'à l'irréductible, passer de la fraction au décimal et retour, reconnaître un nombre rationnel, comparer et ranger — négatifs compris. Le biathlon, l'électricité nucléaire, une échappée du Tour, les braquets d'un vélo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin à chaque fois.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/fraction-nombre", titre: "Fractions et nombres rationnels" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Tu écris, tu simplifies ou tu compares, et tu donnes la réponse la plus simple possible.",
      rappel: [
        "Deux fractions sont égales quand on passe de l'une à l'autre en multipliant, ou en divisant, le numérateur ET le dénominateur par un même nombre non nul.",
        "Simplifier, c'est diviser en haut et en bas par un diviseur commun. La fraction est irréductible quand plus aucun nombre, à part $1$, ne divise les deux.",
        "Une fraction est un quotient : $\\dfrac{a}{b} = a \\div b$. Un nombre rationnel est un nombre qui s'écrit $\\dfrac{a}{b}$, avec $a$ et $b$ entiers et $b \\neq 0$.",
        "Même dénominateur : je compare les numérateurs. Même numérateur : la plus grande fraction a le plus PETIT dénominateur.",
      ],
      exercices: [
        {
          enonce:
            "Complète pour que les deux fractions soient égales.\na) $\\dfrac{3}{5} = \\dfrac{\\ldots}{20}$\nb) $\\dfrac{4}{7} = \\dfrac{12}{\\ldots}$\nc) $\\dfrac{2}{9} = \\dfrac{\\ldots}{45}$",
          correction:
            "a) Je regarde comment on passe de $5$ à $20$ : $5 \\times 4 = 20$. Je fais la même chose en haut : $3 \\times 4 = 12$. Donc $\\dfrac{3}{5} = \\dfrac{12}{20}$.\nb) Cette fois, je regarde en haut : $4 \\times 3 = 12$. Je multiplie aussi en bas par $3$ : $7 \\times 3 = 21$. Donc $\\dfrac{4}{7} = \\dfrac{12}{21}$.\nc) $9 \\times 5 = 45$, donc en haut $2 \\times 5 = 10$ : $\\dfrac{2}{9} = \\dfrac{10}{45}$.\n⛔ Le piège : AJOUTER au lieu de multiplier. De $5$ à $20$, on ajoute $15$ ; mais $\\dfrac{3 + 15}{20} = \\dfrac{18}{20}$, qui vaut $0{,}9$, alors que $\\dfrac{3}{5}$ vaut $0{,}6$. Ce n'est plus le même nombre.\nRéponse : $\\dfrac{3}{5} = \\dfrac{12}{20}$ ; $\\dfrac{4}{7} = \\dfrac{12}{21}$ ; $\\dfrac{2}{9} = \\dfrac{10}{45}$.",
          schema: comparer([3, 5], [12, 20]),
          micros: ["fraction_egale"],
        },
        {
          enonce:
            "Parmi les fractions $\\dfrac{8}{12}$, $\\dfrac{10}{15}$, $\\dfrac{6}{10}$ et $\\dfrac{14}{21}$, lesquelles sont égales à $\\dfrac{2}{3}$ ?",
          correction:
            "Je simplifie chaque fraction au maximum, puis je compare le résultat à $\\dfrac{2}{3}$.\n$\\dfrac{8}{12}$ : je divise en haut et en bas par $4$, $\\dfrac{8}{12} = \\dfrac{2}{3}$.\n$\\dfrac{10}{15}$ : je divise par $5$, $\\dfrac{10}{15} = \\dfrac{2}{3}$.\n$\\dfrac{6}{10}$ : je divise par $2$, $\\dfrac{6}{10} = \\dfrac{3}{5}$. Ce n'est pas $\\dfrac{2}{3}$.\n$\\dfrac{14}{21}$ : je divise par $7$, $\\dfrac{14}{21} = \\dfrac{2}{3}$.\n⛔ Le piège : chercher « le même écart » entre le haut et le bas. $\\dfrac{2}{3}$ et $\\dfrac{5}{6}$ ont le même écart, $1$, et pourtant $\\dfrac{5}{6}$ est plus grand. On multiplie ou on divise, on n'ajoute jamais.\nRéponse : $\\dfrac{8}{12}$, $\\dfrac{10}{15}$ et $\\dfrac{14}{21}$ sont égales à $\\dfrac{2}{3}$ ; $\\dfrac{6}{10}$ ne l'est pas.",
          schema: tableau(["fraction", "8/12", "10/15", "6/10", "14/21"], ["simplifiée", "2/3", "2/3", "3/5", "2/3"]),
          micros: ["fraction_egale", "fraction_simplifier"],
        },
        {
          enonce: "Simplifie $\\dfrac{30}{42}$ jusqu'à obtenir une fraction irréductible.",
          correction:
            "$30$ et $42$ sont pairs : je divise en haut et en bas par $2$. $\\dfrac{30}{42} = \\dfrac{15}{21}$.\n$15 = 3 \\times 5$ et $21 = 3 \\times 7$ : je divise encore par $3$. $\\dfrac{15}{21} = \\dfrac{5}{7}$.\n$5$ et $7$ n'ont plus aucun diviseur commun à part $1$ : je m'arrête, $\\dfrac{5}{7}$ est irréductible.\n⭐ Plus court : $6$ divise $30$ et $42$. En divisant d'un coup par $6$, je tombe directement sur $\\dfrac{5}{7}$.\n⛔ Le piège : s'arrêter à $\\dfrac{15}{21}$. Elle est plus simple, mais pas irréductible : $3$ divise encore les deux nombres.\nRéponse : $\\dfrac{30}{42} = \\dfrac{5}{7}$.",
          schema: etapes(["", "numérateur", "dénominateur"], [["au départ", "30", "42"], ["÷ 2", "15", "21"], ["÷ 3", "5", "7"]]),
          micros: ["fraction_simplifier"],
        },
        {
          enonce: "Pour simplifier $\\dfrac{13}{39}$, Mila barre les deux chiffres $3$ et écrit $\\dfrac{1}{9}$. A-t-elle raison ? Simplifie correctement.",
          correction:
            "Simplifier, c'est DIVISER le numérateur et le dénominateur par un même nombre. Barrer un chiffre n'est pas une division.\nJe cherche un diviseur commun : $39 = 3 \\times 13$. Donc $13$ divise à la fois $13$ et $39$.\nJe divise en haut et en bas par $13$ : $13 \\div 13 = 1$ et $39 \\div 13 = 3$. Donc $\\dfrac{13}{39} = \\dfrac{1}{3}$.\n⭐ Contrôle : $\\dfrac{1}{9} \\approx 0{,}11$ et $\\dfrac{1}{3} \\approx 0{,}33$. Mila a trouvé un nombre trois fois trop petit.\n⛔ Le piège : « barrer » les chiffres identiques en haut et en bas. On ne simplifie pas des CHIFFRES, on divise des NOMBRES.\nRéponse : Mila a tort ; $\\dfrac{13}{39} = \\dfrac{1}{3}$.",
          schema: intervalles(0, 0.5, [{ de: 0, a: 0.333, deInclus: true, aInclus: true, label: "13/39 = 1/3", color: BLEU }], 0.1, [
            { value: 0.111, label: "1/9 (faux)", color: ROUGE },
            { value: 0.333, label: "1/3", color: ORANGE },
          ]),
          micros: ["fraction_simplifier"],
        },
        {
          enonce: "Écris chaque fraction en écriture décimale.\na) $\\dfrac{9}{20}$\nb) $\\dfrac{11}{4}$\nc) $\\dfrac{7}{5}$",
          correction:
            "Une fraction est un quotient : je divise le numérateur par le dénominateur.\na) $9 \\div 20 = 0{,}45$. Autre chemin : je multiplie en haut et en bas par $5$, $\\dfrac{9}{20} = \\dfrac{45}{100}$, quarante-cinq centièmes.\nb) $11 \\div 4 = 2{,}75$. En effet, $4 \\times 2 = 8$, il reste $3$, et $3 \\div 4 = 0{,}75$.\nc) $7 \\div 5 = 1{,}4$.\n⛔ Le piège : lire la barre de fraction comme une virgule, et écrire $7{,}5$ pour $\\dfrac{7}{5}$. Or cinq cinquièmes font déjà $1$ : $\\dfrac{7}{5}$ est à peine plus grand que $1$.\nRéponse : $\\dfrac{9}{20} = 0{,}45$ ; $\\dfrac{11}{4} = 2{,}75$ ; $\\dfrac{7}{5} = 1{,}4$.",
          schema: intervalles(0, 3, [{ de: 0, a: 2.75, deInclus: true, aInclus: true, label: "de 0 à 11/4", color: BLEU }], 0.5, [
            { value: 0.45, label: "9/20", color: ORANGE },
            { value: 1.4, label: "7/5", color: ORANGE },
            { value: 2.75, label: "11/4", color: ORANGE },
          ]),
          micros: ["fraction_decimal"],
        },
        {
          enonce: "Écris chaque nombre décimal sous la forme d'une fraction irréductible.\na) $0{,}125$\nb) $2{,}4$\nc) $0{,}06$",
          correction:
            "Je lis le rang du dernier chiffre, j'écris la fraction sur $10$, $100$ ou $1\\,000$, puis je simplifie.\na) Trois chiffres après la virgule : des millièmes. $0{,}125 = \\dfrac{125}{1\\,000}$. $125$ divise $1\\,000$ ($125 \\times 8 = 1\\,000$) : je divise par $125$, $\\dfrac{125}{1\\,000} = \\dfrac{1}{8}$.\nb) Un chiffre après la virgule : des dixièmes. $2{,}4 = \\dfrac{24}{10} = \\dfrac{12}{5}$, en divisant par $2$.\nc) Deux chiffres après la virgule : des centièmes. $0{,}06 = \\dfrac{6}{100} = \\dfrac{3}{50}$, en divisant par $2$.\n⛔ Le piège : écrire $0{,}06 = \\dfrac{6}{10}$. Or $\\dfrac{6}{10} = 0{,}6$ : dix fois trop. Le zéro après la virgule compte.\nRéponse : $0{,}125 = \\dfrac{1}{8}$ ; $2{,}4 = \\dfrac{12}{5}$ ; $0{,}06 = \\dfrac{3}{50}$.",
          schema: tableau(["décimal", "0,125", "2,4", "0,06"], ["irréductible", "1/8", "12/5", "3/50"]),
          micros: ["fraction_rationnel", "fraction_simplifier"],
        },
        {
          enonce:
            "Montre que chaque nombre est rationnel, en l'écrivant sous la forme $\\dfrac{a}{b}$ avec $a$ et $b$ entiers.\na) $-9$\nb) $1{,}75$\nc) $-0{,}3$\nd) $\\dfrac{22}{7}$, qu'Archimède utilisait pour approcher $\\pi$. Est-ce exactement $\\pi$ ?",
          correction:
            "Un nombre est rationnel s'il s'écrit $\\dfrac{a}{b}$, avec $a$ et $b$ entiers et $b \\neq 0$.\na) Un entier, c'est un quotient par $1$ : $-9 = \\dfrac{-9}{1}$.\nb) Des centièmes : $1{,}75 = \\dfrac{175}{100} = \\dfrac{7}{4}$, en divisant par $25$.\nc) Des dixièmes : $-0{,}3 = \\dfrac{-3}{10}$.\nd) $\\dfrac{22}{7}$ est DÉJÀ un quotient de deux entiers : il est rationnel. Mais $22 \\div 7 = 3{,}142857\\ldots$ alors que $\\pi = 3{,}14159\\ldots$ : ils diffèrent dès le troisième chiffre après la virgule. $\\dfrac{22}{7}$ n'est qu'une valeur approchée de $\\pi$.\n⛔ Le piège : croire qu'un entier ou un nombre négatif « n'a pas de fraction ». Il en a une : il suffit de l'écrire.\nRéponse : $-9 = \\dfrac{-9}{1}$, $1{,}75 = \\dfrac{7}{4}$, $-0{,}3 = \\dfrac{-3}{10}$ et $\\dfrac{22}{7}$ sont rationnels ; $\\dfrac{22}{7}$ n'est pas égal à $\\pi$.",
          schema: tableau(["nombre", "−9", "1,75", "−0,3", "22/7"], ["a/b", "−9/1", "7/4", "−3/10", "22/7"]),
          micros: ["fraction_rationnel"],
        },
        {
          enonce: "Compare, sans calculatrice.\na) $\\dfrac{11}{13}$ et $\\dfrac{9}{13}$\nb) $\\dfrac{4}{9}$ et $\\dfrac{4}{7}$",
          correction:
            "a) Même dénominateur : les parts ont la même taille, ce sont des treizièmes. $11$ parts contre $9$ : $\\dfrac{11}{13} > \\dfrac{9}{13}$.\nb) Même numérateur : je prends $4$ parts dans les deux cas. Mais en partageant en $9$, les parts sont plus petites qu'en partageant en $7$. Quatre petites parts font moins que quatre grandes : $\\dfrac{4}{9} < \\dfrac{4}{7}$.\n⭐ Contrôle : $\\dfrac{4}{9} = 0{,}444\\ldots$ et $\\dfrac{4}{7} = 0{,}571\\ldots$\n⛔ Le piège : conclure que $\\dfrac{4}{9}$ est la plus grande parce que $9 > 7$. Un grand dénominateur fait de PETITES parts.\nRéponse : $\\dfrac{11}{13} > \\dfrac{9}{13}$ et $\\dfrac{4}{9} < \\dfrac{4}{7}$.",
          schema: comparer([4, 9], [4, 7]),
          micros: ["fraction_comparer", "fraction_decimal"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Tu écris chaque étape avant de passer à la suivante, et tu termines par une phrase.",
      rappel: [
        "Pour comparer des fractions de dénominateurs différents, je les écris avec un MÊME dénominateur, ou je passe en écriture décimale.",
        "Chez les négatifs, l'ordre s'inverse : le plus loin de zéro est le plus petit.",
        "Un nombre décimal s'écrit sur $10$, $100$ ou $1\\,000$, puis se simplifie.",
        "Certaines fractions n'ont pas d'écriture décimale exacte : la division ne s'arrête jamais. Elles restent des nombres rationnels.",
      ],
      exercices: [
        {
          enonce: "Range dans l'ordre croissant : $\\dfrac{5}{6}$ ; $\\dfrac{3}{4}$ ; $\\dfrac{7}{12}$ ; $\\dfrac{1}{3}$.",
          correction:
            "Les dénominateurs $6$, $4$, $12$ et $3$ divisent tous $12$ : je mets tout en douzièmes.\n$\\dfrac{5}{6} = \\dfrac{10}{12}$ ; $\\dfrac{3}{4} = \\dfrac{9}{12}$ ; $\\dfrac{1}{3} = \\dfrac{4}{12}$ ; $\\dfrac{7}{12}$ ne bouge pas.\nMême dénominateur : je range les numérateurs, $4 < 7 < 9 < 10$.\n⛔ Le piège : ranger d'après les numérateurs de départ, $1$, $3$, $5$, $7$. On mettrait $\\dfrac{7}{12}$ en dernier, alors qu'il est deuxième : ses parts sont des douzièmes, bien plus petites.\nRéponse : $\\dfrac{1}{3} < \\dfrac{7}{12} < \\dfrac{3}{4} < \\dfrac{5}{6}$.",
          schema: intervalles(0.25, 1, [{ de: 0.333, a: 0.833, deInclus: true, aInclus: true, label: "du plus petit au plus grand", color: BLEU }], 0.25, [
            { value: 0.333, label: "1/3", color: ORANGE },
            { value: 0.583, label: "7/12", color: ORANGE },
            { value: 0.75, label: "3/4", color: ORANGE },
            { value: 0.833, label: "5/6", color: ORANGE },
          ]),
          micros: ["fraction_comparer", "fraction_egale"],
        },
        {
          enonce:
            "a) Compare $\\dfrac{7}{10}$ et $\\dfrac{5}{6}$.\nb) Déduis-en l'ordre de $-\\dfrac{7}{10}$ et $-\\dfrac{5}{6}$.\nc) Range dans l'ordre croissant : $-\\dfrac{7}{10}$ ; $-\\dfrac{5}{6}$ ; $\\dfrac{1}{5}$ ; $-1$.",
          correction:
            "a) Je cherche un dénominateur commun à $10$ et $6$ : $30$. $\\dfrac{7}{10} = \\dfrac{21}{30}$ et $\\dfrac{5}{6} = \\dfrac{25}{30}$. $21 < 25$, donc $\\dfrac{7}{10} < \\dfrac{5}{6}$.\nb) $-\\dfrac{5}{6}$ est plus LOIN de zéro que $-\\dfrac{7}{10}$. Chez les négatifs, le plus loin de zéro est le plus petit : $-\\dfrac{5}{6} < -\\dfrac{7}{10}$.\nc) $\\dfrac{1}{5}$ est le seul positif : il est le plus grand. $-1 = -\\dfrac{30}{30}$ est le plus loin de zéro : il est le plus petit.\n⛔ Le piège : garder l'ordre des positifs. $\\dfrac{7}{10} < \\dfrac{5}{6}$, mais $-\\dfrac{7}{10} > -\\dfrac{5}{6}$.\nRéponse : $-1 < -\\dfrac{5}{6} < -\\dfrac{7}{10} < \\dfrac{1}{5}$.",
          schema: intervalles(-1, 0.25, [{ de: -0.833, a: -0.7, deInclus: true, aInclus: true, label: "les deux négatifs", color: BLEU }], 0.25, [
            { value: -1, label: "−1", color: ORANGE },
            { value: -0.833, label: "−5/6", color: ORANGE },
            { value: -0.7, label: "−7/10", color: ORANGE },
            { value: 0.2, label: "1/5", color: ORANGE },
          ]),
          micros: ["fraction_comparer"],
        },
        {
          enonce:
            "Au biathlon, une course individuelle compte $20$ cibles, un sprint $10$. Léa a touché $17$ cibles sur $20$ à l'individuelle ; Inès, $9$ sur $10$ au sprint.\na) Écris chaque réussite sous forme de fraction, puis de fraction de dénominateur $100$, puis en décimal.\nb) Laquelle a le meilleur taux de réussite ?",
          correction:
            "a) Léa : $\\dfrac{17}{20}$. Pour avoir des centièmes, je multiplie en haut et en bas par $5$ : $\\dfrac{17}{20} = \\dfrac{85}{100} = 0{,}85$.\nInès : $\\dfrac{9}{10}$. Je multiplie en haut et en bas par $10$ : $\\dfrac{9}{10} = \\dfrac{90}{100} = 0{,}9$.\nb) Deux fractions sur $100$ : je compare les numérateurs. $85 < 90$, donc $\\dfrac{17}{20} < \\dfrac{9}{10}$.\n⛔ Le piège : comparer les nombres de cibles touchées. Léa en touche $17$, Inès seulement $9$ ; mais Inès n'avait que $10$ cibles. Ce qui compte, c'est la PART des cibles touchées.\nRéponse : Inès a le meilleur taux de réussite, $90$ % contre $85$ % pour Léa.",
          schema: deux(grille(85, "Léa : 17/20 = 85/100"), grille(90, "Inès : 9/10 = 90/100")),
          micros: ["fraction_egale", "fraction_decimal", "fraction_comparer"],
        },
        {
          enonce:
            "Pour chaque fraction, pose la division. Son écriture décimale s'arrête-t-elle ?\na) $\\dfrac{3}{8}$\nb) $\\dfrac{7}{25}$\nc) $\\dfrac{5}{12}$\nd) $\\dfrac{4}{15}$\nCes quatre nombres sont-ils rationnels ?",
          correction:
            "a) $3 \\div 8 = 0{,}375$ : le reste finit par valoir $0$, la division s'arrête.\nb) $7 \\div 25 = 0{,}28$ : elle s'arrête. Autre chemin : $\\dfrac{7}{25} = \\dfrac{28}{100}$, en multipliant par $4$.\nc) $5 \\div 12 = 0{,}41666\\ldots$ : à partir du troisième chiffre, le reste vaut toujours $8$, et le chiffre $6$ revient sans fin.\nd) $4 \\div 15 = 0{,}2666\\ldots$ : le reste vaut toujours $10$, le $6$ revient sans fin.\n⭐ Pourquoi : $8 \\times 125 = 1\\,000$ et $25 \\times 4 = 100$, donc $\\dfrac{3}{8}$ et $\\dfrac{7}{25}$ s'écrivent en millièmes ou en centièmes. $12$ et $15$ sont des multiples de $3$, et $3$ ne divise ni $10$, ni $100$, ni $1\\,000$ : impossible d'y arriver.\n⛔ Le piège : croire qu'un nombre sans écriture décimale exacte n'est pas rationnel. $\\dfrac{5}{12}$ est un quotient de deux entiers : il est rationnel, même si on n'écrit de lui qu'une valeur approchée.\nRéponse : $\\dfrac{3}{8}$ et $\\dfrac{7}{25}$ ont une écriture décimale exacte, $\\dfrac{5}{12}$ et $\\dfrac{4}{15}$ non ; les quatre sont des nombres rationnels.",
          schema: tableau(["fraction", "3/8", "7/25", "5/12", "4/15"], ["décimal", "0,375", "0,28", "0,4166…", "0,266…"]),
          micros: ["fraction_decimal", "fraction_rationnel"],
        },
        {
          enonce: "Montre de deux façons que $\\dfrac{45}{105}$ et $\\dfrac{36}{84}$ sont égales.\na) En simplifiant chacune.\nb) Avec les produits en croix.",
          correction:
            "a) $45 = 15 \\times 3$ et $105 = 15 \\times 7$ : je divise en haut et en bas par $15$, $\\dfrac{45}{105} = \\dfrac{3}{7}$.\n$36 = 12 \\times 3$ et $84 = 12 \\times 7$ : je divise par $12$, $\\dfrac{36}{84} = \\dfrac{3}{7}$.\nLes deux fractions ont la même forme irréductible : elles sont égales.\nb) Deux fractions $\\dfrac{a}{b}$ et $\\dfrac{c}{d}$ sont égales quand $a \\times d = b \\times c$. Ici, $45 \\times 84 = 3\\,780$ et $105 \\times 36 = 3\\,780$ : les produits sont égaux.\n⛔ Le piège : croire deux fractions différentes parce qu'elles n'ont aucun nombre en commun. Une même valeur a une infinité d'écritures.\nRéponse : $\\dfrac{45}{105} = \\dfrac{36}{84} = \\dfrac{3}{7}$.",
          schema: etapes(["", "45/105", "36/84"], [["on divise par", "15", "12"], ["il reste", "3/7", "3/7"]]),
          micros: ["fraction_egale", "fraction_simplifier"],
        },
        {
          enonce:
            "En France, en 2023, le nucléaire a fourni environ $65$ % de l'électricité produite.\na) Écris $65$ % sous forme de fraction irréductible, puis en écriture décimale.\nb) Un journaliste écrit : « près des deux tiers ». Est-ce plus ou moins que $65$ % ?\nc) « Plus des trois cinquièmes » : est-ce vrai ?",
          correction:
            "a) $65$ %, ce sont $65$ centièmes : $\\dfrac{65}{100}$. $65$ et $100$ sont divisibles par $5$ : $\\dfrac{65}{100} = \\dfrac{13}{20}$. $13$ est premier et ne divise pas $20$ : c'est irréductible. En décimal, $\\dfrac{65}{100} = 0{,}65$.\nb) Je compare $\\dfrac{13}{20}$ et $\\dfrac{2}{3}$ en soixantièmes : $\\dfrac{13}{20} = \\dfrac{39}{60}$ et $\\dfrac{2}{3} = \\dfrac{40}{60}$. $39 < 40$ : $65$ % est un peu MOINS que les deux tiers, de très peu.\nc) $\\dfrac{3}{5} = \\dfrac{60}{100} = 0{,}6$, et $0{,}65 > 0{,}6$. Oui, c'est vrai.\n⛔ Le piège : lire « près des deux tiers » comme « plus des deux tiers ». « Près de » ne dit pas de quel côté ; le calcul, si.\nRéponse : $65$ %, c'est $\\dfrac{13}{20}$, soit $0{,}65$ ; c'est un peu moins que les deux tiers, et plus que les trois cinquièmes.",
          schema: grille(65, "le nucléaire : 65/100 = 13/20"),
          micros: ["fraction_rationnel", "fraction_simplifier", "fraction_decimal", "fraction_comparer"],
        },
        {
          enonce: "Sur une droite graduée de $0$ à $2$, place les nombres $\\dfrac{7}{4}$, $0{,}6$, $\\dfrac{3}{5}$ et $\\dfrac{6}{5}$. Que remarques-tu ?",
          correction:
            "Pour placer une fraction, je passe par son écriture décimale.\n$\\dfrac{7}{4} = 7 \\div 4 = 1{,}75$ ; $\\dfrac{3}{5} = 3 \\div 5 = 0{,}6$ ; $\\dfrac{6}{5} = 6 \\div 5 = 1{,}2$.\n$\\dfrac{3}{5}$ et $0{,}6$ tombent au MÊME point : ce sont deux écritures d'un seul nombre.\n$\\dfrac{6}{5}$ et $\\dfrac{7}{4}$ sont plus grands que $1$ : leur numérateur dépasse leur dénominateur.\n⛔ Le piège : croire qu'une fraction est toujours plus petite que $1$, et placer $\\dfrac{6}{5}$ avant $1$. Cinq cinquièmes font déjà $1$ ; six cinquièmes, c'est plus.\nRéponse : de gauche à droite, $\\dfrac{3}{5} = 0{,}6$, puis $\\dfrac{6}{5} = 1{,}2$, puis $\\dfrac{7}{4} = 1{,}75$.",
          schema: intervalles(0, 2, [{ de: 0, a: 1, deInclus: true, aInclus: true, label: "de 0 à 1", color: BLEU }], 0.25, [
            { value: 0.6, label: "3/5 = 0,6", color: ORANGE },
            { value: 1.2, label: "6/5", color: ORANGE },
            { value: 1.75, label: "7/4", color: ORANGE },
          ]),
          micros: ["fraction_decimal", "fraction_egale", "fraction_comparer"],
        },
        {
          enonce: "Trouve trois fractions comprises strictement entre $\\dfrac{3}{7}$ et $\\dfrac{4}{7}$.",
          correction:
            "En septièmes, il n'y a aucun entier entre $3$ et $4$ : je redécoupe plus fin.\nEn quatorzièmes : $\\dfrac{3}{7} = \\dfrac{6}{14}$ et $\\dfrac{4}{7} = \\dfrac{8}{14}$. Une seule fraction entre les deux : $\\dfrac{7}{14} = \\dfrac{1}{2}$.\nPour en avoir trois, je découpe en vingt-huitièmes : $\\dfrac{3}{7} = \\dfrac{12}{28}$ et $\\dfrac{4}{7} = \\dfrac{16}{28}$. Entre $12$ et $16$, il y a $13$, $14$ et $15$ : $\\dfrac{13}{28}$, $\\dfrac{14}{28} = \\dfrac{1}{2}$ et $\\dfrac{15}{28}$.\n⛔ Le piège : conclure qu'il n'y a « rien » entre $\\dfrac{3}{7}$ et $\\dfrac{4}{7}$ parce que $3$ et $4$ se suivent. Il suffit de redécouper.\nRéponse : $\\dfrac{3}{7} < \\dfrac{13}{28} < \\dfrac{1}{2} < \\dfrac{15}{28} < \\dfrac{4}{7}$ ; et il y en a une infinité d'autres.",
          schema: intervalles(0.4, 0.6, [{ de: 0.429, a: 0.571, deInclus: false, aInclus: false, label: "entre 3/7 et 4/7", color: BLEU }], 0.05, [
            { value: 0.464, label: "13/28", color: ORANGE },
            { value: 0.5, label: "1/2", color: ORANGE },
            { value: 0.536, label: "15/28", color: ORANGE },
          ]),
          micros: ["fraction_comparer", "fraction_egale"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un énoncé à traduire en fractions. Tu réponds à chaque question par une phrase.",
      rappel: [
        "Une part, un taux de réussite, un pourcentage : c'est une fraction « partie sur total ».",
        "Pour comparer des parts, je compare les FRACTIONS, pas les nombres d'objets.",
        "J'arrondis le moins possible : deux nombres proches peuvent avoir le même arrondi.",
      ],
      exercices: [
        {
          titre: "Les lancers francs",
          enonce:
            "Sur la saison, trois basketteuses ont tiré des lancers francs. Awa en a réussi $42$ sur $48$, Julie $35$ sur $40$, Nina $27$ sur $30$.\na) Écris chaque taux de réussite sous forme de fraction irréductible.\nb) Deux d'entre elles ont exactement le même taux : lesquelles ?\nc) Écris les taux en décimal et range-les.\nd) Qui est la meilleure tireuse ?",
          correction:
            "a) Awa : $\\dfrac{42}{48}$ ; je divise par $6$, $\\dfrac{42}{48} = \\dfrac{7}{8}$.\nJulie : $\\dfrac{35}{40}$ ; je divise par $5$, $\\dfrac{35}{40} = \\dfrac{7}{8}$.\nNina : $\\dfrac{27}{30}$ ; je divise par $3$, $\\dfrac{27}{30} = \\dfrac{9}{10}$.\nb) Awa et Julie ont la même fraction irréductible, $\\dfrac{7}{8}$ : le même taux, même si elles n'ont pas réussi le même nombre de lancers.\nc) $\\dfrac{7}{8} = 7 \\div 8 = 0{,}875$ et $\\dfrac{9}{10} = 0{,}9$. $0{,}875 < 0{,}900$.\nd) C'est Nina : $9$ lancers réussis sur $10$.\n⛔ Le piège : désigner Awa parce qu'elle a réussi le plus de lancers, $42$. Elle en a aussi tiré le plus : c'est la PART réussie qui compte.\nRéponse : Awa et Julie réussissent $\\dfrac{7}{8}$ de leurs lancers, soit $0{,}875$ ; Nina en réussit $\\dfrac{9}{10}$, soit $0{,}9$ : Nina est la meilleure tireuse.",
          schema: intervalles(0.8, 1, [{ de: 0.875, a: 0.9, deInclus: true, aInclus: true, label: "de 7/8 à 9/10", color: BLEU }], 0.05, [
            { value: 0.875, label: "7/8", color: ORANGE },
            { value: 0.9, label: "9/10", color: ORANGE },
          ]),
          micros: ["fraction_simplifier", "fraction_egale", "fraction_decimal", "fraction_comparer"],
        },
        {
          titre: "L'échappée",
          enonce:
            "Dans une étape du Tour de France de $200$ km, trois coureurs sont échappés. Au même instant, Paul a parcouru $150$ km, Marc les $\\dfrac{7}{10}$ de l'étape, et Tom $0{,}72$ de l'étape.\na) Quelle fraction de l'étape Paul a-t-il parcourue ? Simplifie-la.\nb) Écris les trois parts en écriture décimale.\nc) Range les trois coureurs, du plus avancé au moins avancé.\nd) Écris la part de Tom sous forme de fraction irréductible.",
          correction:
            "a) Paul a fait $150$ km sur $200$ : $\\dfrac{150}{200}$. Je divise en haut et en bas par $50$ : $\\dfrac{150}{200} = \\dfrac{3}{4}$.\nb) Paul : $\\dfrac{3}{4} = 0{,}75$. Marc : $\\dfrac{7}{10} = 0{,}7$. Tom : $0{,}72$.\nc) Pour comparer, j'écris tout en centièmes : $0{,}75$ ; $0{,}70$ ; $0{,}72$. Donc $0{,}70 < 0{,}72 < 0{,}75$.\nd) $0{,}72 = \\dfrac{72}{100}$. Je divise par $4$ : $\\dfrac{72}{100} = \\dfrac{18}{25}$.\n⛔ Le piège : lire $0{,}7$ et $0{,}72$ comme « $7$ » et « $72$ », et croire Tom loin devant Marc ; ou l'inverse, croire $0{,}7$ plus grand parce qu'il est « plus court ». J'écris $0{,}7 = 0{,}70$ : $70$ centièmes contre $72$, Tom devance Marc de très peu.\nRéponse : Paul est en tête avec les $\\dfrac{3}{4}$ de l'étape, puis Tom avec $\\dfrac{18}{25}$, puis Marc avec $\\dfrac{7}{10}$.",
          schema: intervalles(0.6, 0.8, [{ de: 0.7, a: 0.75, deInclus: true, aInclus: true, label: "les trois échappés", color: BLEU }], 0.05, [
            { value: 0.7, label: "Marc", color: ORANGE },
            { value: 0.72, label: "Tom", color: ORANGE },
            { value: 0.75, label: "Paul", color: ORANGE },
          ]),
          micros: ["fraction_simplifier", "fraction_decimal", "fraction_comparer", "fraction_rationnel"],
        },
        {
          titre: "Les braquets du vélo",
          enonce:
            "Sur un vélo de route, le plateau (à l'avant) a $50$ ou $34$ dents, le pignon (à l'arrière) de $11$ à $28$ dents. Le braquet est la fraction « dents du plateau sur dents du pignon » : c'est le nombre de tours de roue pour un tour de pédale.\na) Écris les braquets $\\dfrac{50}{20}$ et $\\dfrac{34}{17}$ sous forme irréductible, puis en décimal.\nb) Lequel est le plus grand : $\\dfrac{34}{20}$ ou $\\dfrac{50}{28}$ ?\nc) Le braquet $\\dfrac{50}{11}$ a-t-il une écriture décimale exacte ? Est-ce un nombre rationnel ?",
          correction:
            "a) $\\dfrac{50}{20}$ : je divise par $10$, $\\dfrac{50}{20} = \\dfrac{5}{2} = 2{,}5$. Deux tours et demi de roue par tour de pédale.\n$\\dfrac{34}{17}$ : $34 = 2 \\times 17$, donc $\\dfrac{34}{17} = 2$. Exactement deux tours de roue.\nb) $\\dfrac{34}{20} = \\dfrac{17}{10} = 1{,}7$ et $\\dfrac{50}{28} = \\dfrac{25}{14}$, avec $25 \\div 14 = 1{,}785\\ldots$\nPour en être sûr sans arrondi, les produits en croix : $34 \\times 28 = 952$ et $20 \\times 50 = 1\\,000$. $952 < 1\\,000$, donc $\\dfrac{34}{20} < \\dfrac{50}{28}$.\nc) $50 \\div 11 = 4{,}545454\\ldots$ : les chiffres $4$ et $5$ reviennent sans fin, l'écriture décimale ne s'arrête pas. Mais $\\dfrac{50}{11}$ est un quotient de deux entiers : c'est un nombre rationnel.\n⛔ Le piège : croire que $\\dfrac{34}{20}$ gagne parce que son pignon est plus petit, $20$ dents contre $28$. C'est oublier le plateau : on compare des FRACTIONS, pas un seul de leurs nombres.\nRéponse : $\\dfrac{50}{20} = 2{,}5$ et $\\dfrac{34}{17} = 2$ ; $\\dfrac{50}{28}$ est plus grand que $\\dfrac{34}{20}$ ; $\\dfrac{50}{11}$ n'a pas d'écriture décimale exacte, mais c'est un rationnel.",
          schema: tableau(["braquet", "50/20", "34/17", "34/20", "50/28", "50/11"], ["décimal", "2,5", "2", "1,7", "1,785…", "4,5454…"], true),
          micros: ["fraction_simplifier", "fraction_decimal", "fraction_comparer", "fraction_rationnel"],
        },
        {
          titre: "Qui vient le plus à vélo ?",
          enonce:
            "Au collège, en 4e A, $12$ élèves sur $28$ viennent à vélo ; en 4e B, $13$ sur $30$.\na) Écris chaque part sous forme de fraction irréductible.\nb) Leur écriture décimale est-elle exacte ? Donne une valeur approchée au millième.\nc) Quelle classe a la plus grande part de cyclistes ? Justifie sans valeur approchée.\nd) La principale affirme : « Dans les deux classes, plus de $2$ élèves sur $5$ viennent à vélo. » A-t-elle raison ?",
          correction:
            "a) 4e A : $\\dfrac{12}{28}$ ; je divise par $4$, $\\dfrac{12}{28} = \\dfrac{3}{7}$. 4e B : $\\dfrac{13}{30}$ ; $13$ est premier et ne divise pas $30$, elle est déjà irréductible.\nb) $3 \\div 7 = 0{,}428571\\ldots$ et $13 \\div 30 = 0{,}4333\\ldots$ : aucune ne s'arrête. Au millième : $0{,}429$ et $0{,}433$.\nc) Même dénominateur : $7 \\times 30 = 210$. $\\dfrac{3}{7} = \\dfrac{90}{210}$ et $\\dfrac{13}{30} = \\dfrac{91}{210}$. $90 < 91$, donc $\\dfrac{3}{7} < \\dfrac{13}{30}$.\nd) $\\dfrac{2}{5} = \\dfrac{84}{210}$, plus petit que $\\dfrac{90}{210}$ et que $\\dfrac{91}{210}$. Elle a raison.\n⛔ Le piège : arrondir trop tôt. Au dixième, les deux parts valent $0{,}4$ et semblent égales ; il faut aller au millième, ou mieux, écrire les fractions avec le même dénominateur.\nRéponse : la 4e B a la plus grande part de cyclistes, $\\dfrac{13}{30}$ contre $\\dfrac{3}{7}$, de très peu ; et dans les deux classes, plus de $2$ élèves sur $5$ viennent à vélo.",
          schema: intervalles(0.39, 0.44, [{ de: 0.4, a: 0.44, deInclus: false, aInclus: true, label: "plus de 2/5", color: BLEU }], 0.01, [
            { value: 0.4, label: "2/5", color: ORANGE },
            { value: 0.4286, label: "A", color: ORANGE },
            { value: 0.4333, label: "B", color: ORANGE },
          ]),
          micros: ["fraction_simplifier", "fraction_decimal", "fraction_comparer", "fraction_rationnel"],
        },
      ],
    },
  ],
};
