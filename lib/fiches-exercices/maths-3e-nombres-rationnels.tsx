// ─── Fiche d'exercices : les nombres rationnels (3e) — 20 exercices corrigés ───
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-nombres-rationnels.tsx` et
// sur le coach de 3e, notionId `fraction_rationnel`. Son angle est celui de la
// fiche : le MOT « rationnel » (entiers, décimaux et fractions sont une seule
// famille, $\dfrac{a}{b}$ avec $b \neq 0$) et la DENSITÉ (entre deux rationnels,
// il y en a toujours un autre). Aucun exemple de la fiche de cours n'est repris
// (ni 3/4 contre 2/3, ni −3/4 contre −1/2, ni « entre 1/2 et 3/4 »).
//
// Le niveau : celui de la 3e — écritures, comparaison (négatifs compris), les
// quatre opérations, la priorité, l'inverse pour diviser. Rien de la seconde
// (ni ensembles ℚ, ℝ, ni irrationalité de √2).
//
// Chiffre réel cité : le marathon mesure 42,195 km (distance officielle fixée
// en 1921, règlement World Athletics, règle 55 des compétitions sur route).
// Tout le reste (recette, trail, stations météo, gobelets) est inventé.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme les
// autres feuilles : c'est la voix du cahier, pas celle du manuel.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-rationnels-3e.mjs`.
//
// Micro-compétences : fraction_rationnel_reconnaitre (1, 2, 9, 10, 18),
// fraction_rationnel_ecriture (3, 4, 5, 9, 10, 18, 19, 20),
// fraction_rationnel_comparer (6, 7, 11, 12, 17, 18),
// fraction_rationnel_calculer (8, 13, 14, 15, 16, 17, 19, 20),
// fraction_rationnel_defi (16, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, intervalles, tableau } from "@/lib/fiches-exercices/figures";

export const exercicesRationnels3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "fraction-rationnel",
  titre: "Nombres rationnels",
  accroche:
    "Vingt exercices, du calcul seul au problème, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/3e/fraction-rationnel",
      titre: "Les nombres rationnels",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Tu écris, tu compares ou tu calcules, et tu donnes la réponse sous sa forme la plus simple.",
      rappel: [
        "Un nombre rationnel est un nombre qui peut s'écrire $\\dfrac{a}{b}$, avec $a$ et $b$ entiers et $b \\neq 0$. Les entiers et les décimaux en sont : $5 = \\dfrac{5}{1}$, $0{,}3 = \\dfrac{3}{10}$.",
        "D'une fraction au décimal, je divise le numérateur par le dénominateur. Parfois, la division ne s'arrête jamais.",
        "Pour comparer, je ramène au même dénominateur. Chez les négatifs, l'ordre s'inverse : le plus loin de zéro est le plus petit.",
        "Pour additionner, même dénominateur d'abord. Pour multiplier, numérateurs entre eux, dénominateurs entre eux.",
      ],
      exercices: [
        {
          enonce:
            "Écris chaque nombre sous la forme $\\dfrac{a}{b}$, avec $a$ et $b$ entiers, la plus simple possible.\na) $-6$\nb) $0{,}35$\nc) $-1{,}2$\nCes nombres sont-ils rationnels ?",
          correction:
            "a) Un entier, c'est un quotient par $1$ : $-6 = \\dfrac{-6}{1}$.\nb) Je lis le dernier rang : $0{,}35$, ce sont $35$ centièmes. Je divise en haut et en bas par $5$ : $0{,}35 = \\dfrac{35}{100} = \\dfrac{7}{20}$.\nc) $-1{,}2$, ce sont $-12$ dixièmes. Je divise par $2$ : $-1{,}2 = \\dfrac{-12}{10} = \\dfrac{-6}{5}$.\nRéponse : les trois nombres s'écrivent $\\dfrac{a}{b}$, ils sont tous rationnels.\n⛔ Le piège : croire qu'un entier ou un décimal « n'est pas une fraction ». Il en a une : il suffit de l'écrire.",
          micros: ["fraction_rationnel_reconnaitre"],
        },
        {
          enonce:
            "Parmi ces écritures, laquelle ne désigne aucun nombre ? $\\dfrac{0}{5}$ ; $\\dfrac{5}{0}$ ; $\\dfrac{-3}{-4}$ ; $\\dfrac{9}{3}$.\nPour les autres, écris le nombre le plus simplement possible.",
          correction:
            "Je regarde d'abord les dénominateurs : un seul est nul, celui de $\\dfrac{5}{0}$.\nDiviser par $0$ n'a pas de sens : aucun nombre multiplié par $0$ ne donne $5$. Donc $\\dfrac{5}{0}$ ne désigne aucun nombre.\n$\\dfrac{0}{5} = 0$ : zéro partagé en cinq, c'est zéro.\n$\\dfrac{-3}{-4} = \\dfrac{3}{4}$ : un négatif divisé par un négatif donne un positif.\n$\\dfrac{9}{3} = 3$ : un entier, écrit comme un quotient.\nRéponse : seule $\\dfrac{5}{0}$ ne désigne aucun nombre ; les trois autres sont des rationnels.\n⛔ Le piège : confondre $\\dfrac{0}{5}$, qui vaut $0$, et $\\dfrac{5}{0}$, qui ne vaut rien du tout.",
          micros: ["fraction_rationnel_reconnaitre"],
        },
        {
          enonce:
            "Une recette de crêpes demande $\\dfrac{7}{8}$ de litre de lait. Ton verre doseur est gradué en écriture décimale. Quelle quantité de lait dois-tu mesurer ?",
          correction:
            "Une fraction, c'est une division : $\\dfrac{7}{8} = 7 \\div 8$.\nJe pose la division : $7 \\div 8 = 0{,}875$. Elle tombe juste.\n⭐ Contrôle : $0{,}875 \\times 8 = 7$.\nRéponse : je mesure $0{,}875$ L de lait, soit $875$ mL.",
          schema: intervalles(0, 1.25, [{ de: 0, a: 0.875, deInclus: true, aInclus: true, label: "le lait", color: BLEU }], 0.25, [
            { value: 0.875, label: "7/8 = 0,875", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_ecriture"],
        },
        {
          enonce:
            "Au départ d'un 100 m, un sprinteur réagit au coup de pistolet en $0{,}15$ seconde. Écris $0{,}15$ sous forme de fraction irréductible.",
          correction:
            "Je lis le dernier rang : $0{,}15$, ce sont $15$ centièmes, donc $\\dfrac{15}{100}$.\n$15$ et $100$ sont divisibles par $5$ : $\\dfrac{15}{100} = \\dfrac{3}{20}$.\n$3$ et $20$ n'ont plus de diviseur commun autre que $1$ : la fraction est irréductible.\nRéponse : $0{,}15 = \\dfrac{3}{20}$.\n⛔ Le piège : écrire $\\dfrac{15}{10}$. Deux chiffres après la virgule, ce sont des centièmes, pas des dixièmes.",
          micros: ["fraction_rationnel_ecriture"],
        },
        {
          enonce: "Écris $\\dfrac{2}{3}$ en écriture décimale. Que remarques-tu ? Ce nombre est-il rationnel ?",
          correction:
            "Je divise : $2 \\div 3 = 0{,}666\\ldots$ Le reste vaut toujours $2$, la division ne s'arrête jamais.\nL'écriture décimale de $\\dfrac{2}{3}$ est infinie : on n'en écrit qu'une valeur approchée, $\\dfrac{2}{3} \\approx 0{,}67$ au centième.\nMais $\\dfrac{2}{3}$ est un quotient de deux entiers : c'est un rationnel.\nRéponse : $\\dfrac{2}{3} = 0{,}666\\ldots$ ; c'est un rationnel, mais pas un nombre décimal.\n⛔ Le piège : croire que $0{,}67$ est égal à $\\dfrac{2}{3}$. Or $0{,}67 \\times 3 = 2{,}01$, pas $2$.",
          schema: tableau(["nombre", "2/3", "0,67"], ["fois 3", "2", "2,01"]),
          micros: ["fraction_rationnel_ecriture"],
        },
        {
          enonce:
            "Deux gourdes de même contenance : l'une est remplie aux $\\dfrac{5}{6}$, l'autre aux $\\dfrac{7}{9}$. Laquelle contient le plus d'eau ?",
          correction:
            "Je ramène au même dénominateur : $18$ est un multiple de $6$ et de $9$.\n$\\dfrac{5}{6} = \\dfrac{15}{18}$ et $\\dfrac{7}{9} = \\dfrac{14}{18}$.\nMême dénominateur : je compare les numérateurs. $15 > 14$, donc $\\dfrac{5}{6} > \\dfrac{7}{9}$.\nRéponse : la gourde remplie aux $\\dfrac{5}{6}$ contient le plus d'eau.\n⛔ Le piège : comparer les numérateurs $5$ et $7$ sans avoir égalisé les dénominateurs.",
          schema: tableau(["fraction", "5/6", "7/9"], ["en dix-huitièmes", "15/18", "14/18"]),
          micros: ["fraction_rationnel_comparer"],
        },
        {
          enonce: "Range dans l'ordre croissant les nombres $-\\dfrac{3}{4}$ et $-\\dfrac{2}{5}$.",
          correction:
            "Je passe en décimal sans le signe : $\\dfrac{3}{4} = 0{,}75$ et $\\dfrac{2}{5} = 0{,}4$.\n$0{,}75 > 0{,}4$ : $-\\dfrac{3}{4}$ est plus LOIN de zéro que $-\\dfrac{2}{5}$.\nChez les négatifs, le plus loin de zéro est le plus petit : il est le plus à gauche sur la droite.\nRéponse : $-\\dfrac{3}{4} < -\\dfrac{2}{5}$.\n⛔ Le piège : garder l'ordre des positifs. $\\dfrac{3}{4} > \\dfrac{2}{5}$, mais $-\\dfrac{3}{4} < -\\dfrac{2}{5}$.",
          schema: intervalles(-1, 0.5, [{ de: -0.75, a: 0, deInclus: true, aInclus: true, label: "distance à zéro de −3/4", color: BLEU }], 0.25, [
            { value: -0.75, label: "−3/4", color: ORANGE },
            { value: -0.4, label: "−2/5", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_comparer"],
        },
        {
          enonce: "Calcule $\\dfrac{3}{4} + \\dfrac{1}{6}$ et donne le résultat sous forme irréductible.",
          correction:
            "Les dénominateurs sont différents : je cherche un multiple commun de $4$ et de $6$. Le plus petit est $12$.\n$\\dfrac{3}{4} = \\dfrac{9}{12}$ (je multiplie en haut et en bas par $3$) et $\\dfrac{1}{6} = \\dfrac{2}{12}$ (par $2$).\n$\\dfrac{3}{4} + \\dfrac{1}{6} = \\dfrac{9}{12} + \\dfrac{2}{12} = \\dfrac{11}{12}$.\n$11$ est premier et ne divise pas $12$ : c'est irréductible.\nRéponse : $\\dfrac{3}{4} + \\dfrac{1}{6} = \\dfrac{11}{12}$.\n⛔ Le piège : additionner les numérateurs et les dénominateurs, et trouver $\\dfrac{4}{10}$. Ce « résultat » est même plus petit que $\\dfrac{3}{4}$ tout seul !",
          schema: intervalles(0, 1.25, [{ de: 0.75, a: 0.917, deInclus: true, aInclus: true, label: "on ajoute 1/6", color: BLEU }], 0.25, [
            { value: 0.4, label: "4/10 (faux)", color: "#dc2626" },
            { value: 0.75, label: "3/4", color: ORANGE },
            { value: 0.917, label: "11/12", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Tu écris chaque étape avant de passer à la suivante, et tu termines par une phrase.",
      rappel: [
        "La multiplication passe avant l'addition et la soustraction.",
        "Diviser par $\\dfrac{c}{d}$, c'est multiplier par son inverse $\\dfrac{d}{c}$.",
        "Une fraction est irréductible quand son numérateur et son dénominateur n'ont plus de diviseur commun autre que $1$.",
        "Entre deux rationnels différents, il y en a toujours un autre : leur milieu, par exemple.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque nombre, donne une écriture fractionnaire irréductible et, si elle existe, son écriture décimale exacte.\na) $\\dfrac{9}{12}$\nb) $-0{,}8$\nc) $3$\nd) $\\dfrac{1}{7}$",
          correction:
            "a) $9$ et $12$ sont divisibles par $3$ : $\\dfrac{9}{12} = \\dfrac{3}{4} = 0{,}75$.\nb) $-0{,}8$, ce sont $-8$ dixièmes : $-0{,}8 = \\dfrac{-8}{10} = \\dfrac{-4}{5}$.\nc) $3 = \\dfrac{3}{1}$ : un entier est un rationnel de dénominateur $1$.\nd) $1 \\div 7 = 0{,}142857142857\\ldots$ : les six chiffres $142857$ reviennent sans fin. Pas d'écriture décimale exacte ; $\\dfrac{1}{7}$ est déjà irréductible.\nRéponse : les quatre nombres sont rationnels ; seul $\\dfrac{1}{7}$ n'a pas d'écriture décimale exacte.\n⭐ Pourquoi : les dénominateurs $4 = 2 \\times 2$ et $5$ ne sont faits que de $2$ et de $5$, les diviseurs de $10$. Le dénominateur $7$, non.",
          schema: tableau(["nombre", "9/12", "−0,8", "3", "1/7"], ["irréductible", "3/4", "−4/5", "3/1", "1/7"]),
          micros: ["fraction_rationnel_reconnaitre", "fraction_rationnel_ecriture"],
        },
        {
          enonce:
            "Un marathon mesure $42{,}195$ km.\na) Écris cette distance sous forme de fraction irréductible.\nb) Une coureuse a parcouru les $\\dfrac{2}{5}$ du marathon. Combien de kilomètres a-t-elle parcourus ?",
          correction:
            "a) Trois chiffres après la virgule : ce sont des millièmes. $42{,}195 = \\dfrac{42\\,195}{1\\,000}$.\n$42\\,195$ se termine par $5$ : il est divisible par $5$, comme $1\\,000$. $\\dfrac{42\\,195}{1\\,000} = \\dfrac{8\\,439}{200}$.\n$8\\,439$ est impair et ne se termine ni par $0$ ni par $5$ : il n'a aucun diviseur commun avec $200 = 2 \\times 2 \\times 2 \\times 5 \\times 5$. La fraction est irréductible.\nRéponse : $42{,}195 = \\dfrac{8\\,439}{200}$.\nb) Les $\\dfrac{2}{5}$ de $42{,}195$ : $42{,}195 \\times 2 = 84{,}39$, puis $84{,}39 \\div 5 = 16{,}878$.\nRéponse : elle a parcouru $16{,}878$ km.",
          micros: ["fraction_rationnel_reconnaitre", "fraction_rationnel_ecriture"],
        },
        {
          enonce: "Range dans l'ordre croissant : $\\dfrac{3}{5}$ ; $0{,}58$ ; $\\dfrac{7}{12}$ ; $\\dfrac{2}{3}$.",
          correction:
            "Je passe tout en décimal, avec assez de chiffres pour départager.\n$\\dfrac{3}{5} = 0{,}6$ ; $\\dfrac{7}{12} = 0{,}58333\\ldots$ ; $\\dfrac{2}{3} = 0{,}666\\ldots$\n$0{,}58$ et $0{,}5833\\ldots$ ont les mêmes deux premières décimales : c'est la troisième qui tranche, $0{,}580 < 0{,}583$.\nRéponse : $0{,}58 < \\dfrac{7}{12} < \\dfrac{3}{5} < \\dfrac{2}{3}$.\n⛔ Le piège : arrondir $\\dfrac{7}{12}$ à $0{,}58$ et conclure qu'ils sont égaux. L'arrondi efface justement la différence.\n⭐ Contrôle sans décimal : $0{,}58 = \\dfrac{58}{100}$ ; $58 \\times 12 = 696$ et $7 \\times 100 = 700$, donc $0{,}58 < \\dfrac{7}{12}$.",
          schema: tableau(["nombre", "0,58", "7/12", "3/5", "2/3"], ["décimal", "0,580", "0,583…", "0,600", "0,666…"]),
          micros: ["fraction_rationnel_comparer"],
        },
        {
          enonce:
            "Range dans l'ordre croissant : $-\\dfrac{1}{2}$ ; $-\\dfrac{5}{8}$ ; $\\dfrac{1}{4}$ ; $-\\dfrac{3}{4}$.",
          correction:
            "Un seul positif, $\\dfrac{1}{4}$ : il est plus grand que tous les négatifs.\nPour les trois négatifs, je compare leurs distances à zéro, en huitièmes : $\\dfrac{1}{2} = \\dfrac{4}{8}$, $\\dfrac{5}{8}$, $\\dfrac{3}{4} = \\dfrac{6}{8}$.\nLe plus loin de zéro est le plus petit : $-\\dfrac{6}{8} < -\\dfrac{5}{8} < -\\dfrac{4}{8}$.\nRéponse : $-\\dfrac{3}{4} < -\\dfrac{5}{8} < -\\dfrac{1}{2} < \\dfrac{1}{4}$.\n⛔ Le piège : ranger $\\dfrac{1}{2}$, $\\dfrac{5}{8}$, $\\dfrac{3}{4}$ comme des positifs, puis remettre les signes sans rien changer. Chez les négatifs, l'ordre s'inverse.",
          schema: intervalles(-1, 0.5, [{ de: -0.75, a: -0.5, deInclus: true, aInclus: true, label: "les trois négatifs", color: BLEU }], 0.25, [
            { value: -0.75, label: "−3/4", color: ORANGE },
            { value: -0.625, label: "−5/8", color: ORANGE },
            { value: -0.5, label: "−1/2", color: ORANGE },
            { value: 0.25, label: "1/4", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_comparer"],
        },
        {
          enonce: "Calcule $A = \\dfrac{2}{3} - \\dfrac{5}{4} \\times \\dfrac{2}{5}$ et donne le résultat sous forme irréductible.",
          correction:
            "La multiplication passe avant la soustraction : je commence par $\\dfrac{5}{4} \\times \\dfrac{2}{5}$.\n$\\dfrac{5}{4} \\times \\dfrac{2}{5} = \\dfrac{10}{20} = \\dfrac{1}{2}$.\nPuis $\\dfrac{2}{3} - \\dfrac{1}{2} = \\dfrac{4}{6} - \\dfrac{3}{6} = \\dfrac{1}{6}$.\nRéponse : $A = \\dfrac{1}{6}$.\n⛔ Le piège : calculer de gauche à droite. $\\dfrac{2}{3} - \\dfrac{5}{4}$ donne $-\\dfrac{7}{12}$, puis $-\\dfrac{7}{12} \\times \\dfrac{2}{5} = -\\dfrac{7}{30}$ : un résultat négatif, et faux.",
          micros: ["fraction_rationnel_calculer"],
        },
        {
          enonce:
            "a) Calcule $\\dfrac{3}{4} \\div \\dfrac{9}{10}$.\nb) Une gourde contient $\\dfrac{3}{4}$ L d'eau. Combien de gobelets de $\\dfrac{3}{20}$ L peut-on remplir ?",
          correction:
            "a) Diviser par une fraction, c'est multiplier par son inverse : l'inverse de $\\dfrac{9}{10}$ est $\\dfrac{10}{9}$.\n$\\dfrac{3}{4} \\times \\dfrac{10}{9} = \\dfrac{30}{36} = \\dfrac{5}{6}$.\nRéponse : $\\dfrac{3}{4} \\div \\dfrac{9}{10} = \\dfrac{5}{6}$.\nb) Je cherche combien de fois $\\dfrac{3}{20}$ tient dans $\\dfrac{3}{4}$ : c'est une division, donc je multiplie par l'inverse $\\dfrac{20}{3}$.\n$\\dfrac{3}{4} \\times \\dfrac{20}{3} = \\dfrac{60}{12} = 5$.\nRéponse : on remplit $5$ gobelets.\n⭐ Contrôle : $5 \\times \\dfrac{3}{20} = \\dfrac{15}{20} = \\dfrac{3}{4}$.\n⛔ Le piège : inverser la première fraction au lieu de la seconde. On inverse celle PAR laquelle on divise.",
          schema: intervalles(0, 0.9, [{ de: 0, a: 0.75, deInclus: true, aInclus: true, label: "la gourde : 3/4 L", color: BLEU }], 0.15, [
            { value: 0.15, label: "1", color: ORANGE },
            { value: 0.3, label: "2", color: ORANGE },
            { value: 0.45, label: "3", color: ORANGE },
            { value: 0.6, label: "4", color: ORANGE },
            { value: 0.75, label: "5", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_calculer"],
        },
        {
          enonce:
            "Calcule et donne le résultat sous forme irréductible.\na) $B = -\\dfrac{5}{6} + \\dfrac{3}{4}$\nb) $C = \\left(-\\dfrac{2}{3}\\right) \\times \\left(-\\dfrac{9}{4}\\right)$",
          correction:
            "a) Dénominateur commun : $12$. $-\\dfrac{5}{6} + \\dfrac{3}{4} = -\\dfrac{10}{12} + \\dfrac{9}{12} = -\\dfrac{1}{12}$.\nLe négatif l'emporte : $\\dfrac{10}{12}$ est plus loin de zéro que $\\dfrac{9}{12}$.\nRéponse : $B = -\\dfrac{1}{12}$.\nb) Un négatif fois un négatif donne un positif.\n$\\left(-\\dfrac{2}{3}\\right) \\times \\left(-\\dfrac{9}{4}\\right) = \\dfrac{2 \\times 9}{3 \\times 4} = \\dfrac{18}{12} = \\dfrac{3}{2}$.\nRéponse : $C = \\dfrac{3}{2}$.\n⛔ Le piège : ajouter les numérateurs $-5 + 3$ et les dénominateurs $6 + 4$, et écrire $\\dfrac{-2}{10}$. Même dénominateur d'abord, toujours.",
          schema: intervalles(-1, 1, [{ de: -0.833, a: -0.083, deInclus: true, aInclus: true, label: "on avance de 3/4", color: BLEU }], 0.25, [
            { value: -0.833, label: "−5/6", color: ORANGE },
            { value: -0.083, label: "−1/12", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_calculer"],
        },
        {
          enonce: "Trouve deux nombres rationnels compris strictement entre $\\dfrac{1}{3}$ et $\\dfrac{1}{2}$.",
          correction:
            "Je mets les deux au même dénominateur : $\\dfrac{1}{3} = \\dfrac{4}{12}$ et $\\dfrac{1}{2} = \\dfrac{6}{12}$.\nEntre $4$ et $6$, il y a $5$ : $\\dfrac{5}{12}$ convient.\nPour un deuxième, je découpe plus fin, en vingt-quatrièmes : $\\dfrac{1}{3} = \\dfrac{8}{24}$ et $\\dfrac{5}{12} = \\dfrac{10}{24}$. Entre les deux : $\\dfrac{9}{24} = \\dfrac{3}{8}$.\nRéponse : $\\dfrac{3}{8}$ et $\\dfrac{5}{12}$ sont compris entre $\\dfrac{1}{3}$ et $\\dfrac{1}{2}$, et il y en a une infinité d'autres.\n⭐ Contrôle en décimal : $0{,}333\\ldots < 0{,}375 < 0{,}4166\\ldots < 0{,}5$.\n⛔ Le piège : croire qu'il n'y a rien entre $\\dfrac{4}{12}$ et $\\dfrac{5}{12}$. Il suffit de redécouper plus fin.",
          schema: intervalles(0.25, 0.625, [{ de: 0.333, a: 0.5, deInclus: false, aInclus: false, label: "entre 1/3 et 1/2", color: BLEU }], 0.125, [
            { value: 0.375, label: "3/8", color: ORANGE },
            { value: 0.417, label: "5/12", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_defi", "fraction_rationnel_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un énoncé à traduire en calculs. Tu réponds à chaque question par une phrase.",
      rappel: [
        "Avant de calculer, je note ce que représente chaque fraction : une fraction DE quoi ?",
        "« Les $\\dfrac{2}{5}$ de $45$ », c'est $\\dfrac{2}{5} \\times 45$.",
        "Un résultat se contrôle : par son ordre de grandeur, ou par le calcul dans l'autre sens.",
      ],
      exercices: [
        {
          titre: "Le trail en deux heures",
          enonce:
            "Une coureuse de trail parcourt les $\\dfrac{2}{5}$ du parcours la première heure, puis le tiers du parcours la deuxième heure.\na) Quelle fraction du parcours a-t-elle faite en deux heures ?\nb) A-t-elle dépassé la moitié du parcours ?\nc) Quelle fraction du parcours lui reste-t-il ?\nd) Le parcours mesure $45$ km. Combien de kilomètres lui reste-t-il ?",
          correction:
            "a) $\\dfrac{2}{5} + \\dfrac{1}{3} = \\dfrac{6}{15} + \\dfrac{5}{15} = \\dfrac{11}{15}$. Réponse : elle a fait les $\\dfrac{11}{15}$ du parcours.\nb) Je compare à $\\dfrac{1}{2}$ en trentièmes : $\\dfrac{11}{15} = \\dfrac{22}{30}$ et $\\dfrac{1}{2} = \\dfrac{15}{30}$. $22 > 15$. Réponse : oui, elle a dépassé la moitié.\nc) Le parcours entier, c'est $1 = \\dfrac{15}{15}$. $1 - \\dfrac{11}{15} = \\dfrac{4}{15}$. Réponse : il lui reste les $\\dfrac{4}{15}$ du parcours.\nd) Les $\\dfrac{4}{15}$ de $45$ km : $45 \\div 15 = 3$, puis $3 \\times 4 = 12$. Réponse : il lui reste $12$ km.\n⭐ Contrôle : les $\\dfrac{11}{15}$ de $45$ km font $33$ km, et $33 + 12 = 45$.\n⛔ Le piège : écrire $\\dfrac{2}{5} + \\dfrac{1}{3} = \\dfrac{3}{8}$. C'est moins que $\\dfrac{2}{5}$ tout seul : elle aurait reculé pendant la deuxième heure !",
          schema: intervalles(0, 1.2, [{ de: 0, a: 0.733, deInclus: true, aInclus: true, label: "fait en deux heures", color: BLEU }], 0.2, [
            { value: 0.4, label: "2/5", color: ORANGE },
            { value: 0.5, label: "1/2", color: "#dc2626" },
            { value: 0.733, label: "11/15", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_calculer", "fraction_rationnel_comparer", "fraction_rationnel_defi"],
        },
        {
          titre: "Quatre stations dans le froid",
          enonce:
            "Une nuit d'hiver, quatre stations météo de montagne relèvent la température : A : $-3{,}5$ °C ; B : $-\\dfrac{10}{3}$ °C ; C : $-\\dfrac{15}{4}$ °C ; D : $-\\dfrac{7}{2}$ °C.\na) Écris les températures de C et de D en écriture décimale.\nb) Que remarques-tu pour A et D ?\nc) Donne une valeur approchée au centième de la température de B. Son écriture décimale s'arrête-t-elle ? Est-ce un rationnel ?\nd) Range les stations de la plus froide à la moins froide.",
          correction:
            "a) $\\dfrac{15}{4} = 15 \\div 4 = 3{,}75$, donc C : $-3{,}75$ °C. $\\dfrac{7}{2} = 3{,}5$, donc D : $-3{,}5$ °C.\nb) A et D affichent la même température : $-3{,}5 = -\\dfrac{7}{2}$. Deux écritures, un seul nombre.\nc) $10 \\div 3 = 3{,}333\\ldots$ sans fin : $-\\dfrac{10}{3} \\approx -3{,}33$. L'écriture décimale ne s'arrête pas, mais $-\\dfrac{10}{3}$ est un quotient d'entiers : c'est un rationnel.\nd) Chez les négatifs, le plus froid est le plus loin de zéro. Les distances à zéro : C $3{,}75$ ; A et D $3{,}5$ ; B $3{,}333\\ldots$\nRéponse : de la plus froide à la moins froide, C ($-3{,}75$ °C), puis A et D à égalité ($-3{,}5$ °C), puis B ($-\\dfrac{10}{3}$ °C).\n⛔ Le piège : croire B la plus froide parce que $10$ est le plus grand numérateur. On compare des nombres, pas leurs morceaux.",
          schema: intervalles(-4, -3, [{ de: -3.75, a: -3.333, deInclus: true, aInclus: true, label: "les quatre relevés", color: BLEU }], 0.25, [
            { value: -3.75, label: "C", color: ORANGE },
            { value: -3.5, label: "A = D", color: ORANGE },
            { value: -3.333, label: "B", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_reconnaitre", "fraction_rationnel_ecriture", "fraction_rationnel_comparer", "fraction_rationnel_defi"],
        },
        {
          titre: "Rien entre 0,99 et 1 ?",
          enonce:
            "Léo affirme : « Entre $0{,}99$ et $1$, il n'y a aucun nombre. »\na) Donne un nombre décimal compris strictement entre $0{,}99$ et $1$.\nb) Écris-le sous forme de fraction irréductible.\nc) Calcule le nombre situé exactement au milieu de ta réponse et de $1$.\nd) Léo a-t-il raison ? Peut-on continuer ainsi ?",
          correction:
            "a) J'ajoute un zéro : $0{,}99 = 0{,}990$ et $1 = 1{,}000$. Entre les deux, par exemple $0{,}995$. Réponse : $0{,}99 < 0{,}995 < 1$.\nb) $0{,}995 = \\dfrac{995}{1\\,000}$. $995$ et $1\\,000$ sont divisibles par $5$ : $\\dfrac{995}{1\\,000} = \\dfrac{199}{200}$. $199$ est premier : c'est irréductible. Réponse : $0{,}995 = \\dfrac{199}{200}$.\nc) Le milieu de deux nombres, c'est leur demi-somme : $\\left(\\dfrac{199}{200} + 1\\right) \\times \\dfrac{1}{2} = \\dfrac{399}{200} \\times \\dfrac{1}{2} = \\dfrac{399}{400}$. Réponse : le milieu est $\\dfrac{399}{400} = 0{,}9975$.\nd) Le milieu de deux rationnels différents est encore un rationnel, et on peut recommencer sans fin.\nRéponse : Léo a tort ; entre $0{,}99$ et $1$, il y a une infinité de rationnels.\n⛔ Le piège : penser que $0{,}99$ et $1$ sont « voisins ». Sur la droite, aucun nombre n'a de voisin immédiat.",
          schema: intervalles(0.98, 1.01, [{ de: 0.99, a: 1, deInclus: false, aInclus: false, label: "entre 0,99 et 1", color: BLEU }], 0.01, [
            { value: 0.995, label: "0,995", color: ORANGE },
            { value: 0.9975, label: "399/400", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_defi", "fraction_rationnel_ecriture", "fraction_rationnel_calculer"],
        },
        {
          titre: "Les gobelets de jus",
          enonce:
            "Une bouteille contient $\\dfrac{3}{2}$ L de jus de pomme.\na) Combien de gobelets de $\\dfrac{1}{4}$ L peut-on remplir ?\nb) Avec des gobelets de $\\dfrac{2}{9}$ L, combien de gobelets PLEINS peut-on remplir ?\nc) Quelle quantité de jus reste alors dans la bouteille ? Donne-la sous forme de fraction irréductible.",
          correction:
            "a) Combien de fois $\\dfrac{1}{4}$ tient dans $\\dfrac{3}{2}$ : je divise, donc je multiplie par l'inverse. $\\dfrac{3}{2} \\times \\dfrac{4}{1} = \\dfrac{12}{2} = 6$. Réponse : on remplit $6$ gobelets.\nb) $\\dfrac{3}{2} \\times \\dfrac{9}{2} = \\dfrac{27}{4} = 6{,}75$. Le résultat n'est pas entier : seuls $6$ gobelets sont pleins. Réponse : on remplit $6$ gobelets pleins.\nc) Six gobelets de $\\dfrac{2}{9}$ L : $6 \\times \\dfrac{2}{9} = \\dfrac{12}{9} = \\dfrac{4}{3}$.\nIl reste $\\dfrac{3}{2} - \\dfrac{4}{3} = \\dfrac{9}{6} - \\dfrac{8}{6} = \\dfrac{1}{6}$. Réponse : il reste $\\dfrac{1}{6}$ L, les trois quarts d'un gobelet.\n⭐ Contrôle : $\\dfrac{3}{4} \\times \\dfrac{2}{9} = \\dfrac{6}{36} = \\dfrac{1}{6}$ ; c'est bien le $0{,}75$ du b).\n⛔ Le piège : répondre « $6{,}75$ gobelets ». Le quotient dit combien de fois la mesure tient ; seule sa partie entière compte des gobelets pleins.",
          schema: intervalles(1, 1.75, [{ de: 1.333, a: 1.5, deInclus: true, aInclus: true, label: "le reste : 1/6 L", color: BLEU }], 0.25, [
            { value: 1.333, label: "4/3", color: ORANGE },
            { value: 1.5, label: "3/2", color: ORANGE },
          ]),
          micros: ["fraction_rationnel_calculer", "fraction_rationnel_ecriture", "fraction_rationnel_defi"],
        },
      ],
    },
  ],
};
