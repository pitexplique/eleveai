// ─── Fiche d'exercices : multiples, diviseurs, nombres premiers (seconde) ──────
//
// Septième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank.ts`
// (notionId arithmetique_entiers). La fiche de cours de la notion est écrite
// APRÈS la feuille, dans la même session (ordre donné par Frédéric : « toutes
// les fiches exercices, puis les deux fiches de cours manquantes »).
//
// ⭐ LES DEUX DÉMONSTRATIONS DU BO : « la somme de deux multiples de a est un
// multiple de a » (exercice 8) et « le carré d'un nombre impair est impair »
// (exercice 9). Elles se font avec une LETTRE : 2k, 2k + 1, 7a.
//
// ⭐ Les sigles PGCD et PPCM ne sont pas écrits : « le plus grand diviseur
// commun », « le plus petit multiple commun ». Écrire simplement.
//
// ⭐ Le réel : les cigales périodiques de 13 et de 17 ans sont sorties ENSEMBLE
// en 2024, pour la première fois depuis 1803 (2024 − 221). Un fait, pas une fable.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-arithmetique.mjs` —
// les diviseurs par essais un à un, les nombres premiers par crible.
//
// Micro-compétences : arith_multiple_diviseur (1, 2, 3, 8, 9, 10, 14),
// arith_nombre_premier (4, 5, 11, 13, 14, 19, 20), arith_fraction_irreductible
// (6, 11, 12), arith_probleme (7, 15, 16, 17, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (2², pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesArithmetiqueSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "arithmetique-entiers",
  titre: "Multiples, diviseurs et nombres premiers",
  accroche:
    "Vingt exercices, du calcul seul au problème : trouver les diviseurs, reconnaître un nombre premier, rendre une fraction irréductible, démontrer avec une lettre. Des bouquets, des bus, un carrelage, un vélo, et des cigales qui comptent en nombres premiers. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/arithmetique-entiers", titre: "Multiples, diviseurs et nombres premiers" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une notion par exercice. On justifie par une égalité, jamais par une impression.",
      rappel: [
        "$b$ est un DIVISEUR de $a$ (et $a$ un MULTIPLE de $b$) si $a = b \\times k$ avec $k$ entier. Exemple : $91 = 7 \\times 13$.",
        "PAIR : s'écrit $2k$. IMPAIR : s'écrit $2k + 1$. Divisible par $3$ ou par $9$ : la somme des chiffres l'est.",
        "PREMIER : exactement deux diviseurs, $1$ et lui-même. $1$ n'est pas premier. Pour tester $n$, on essaie les nombres premiers jusqu'à $\\sqrt{n}$.",
      ],
      exercices: [
        {
          enonce: "a) $91$ est-il un multiple de $7$ ?\nb) Donner tous les diviseurs de $36$.\nc) $5$ est-il un diviseur de $125$ ?",
          correction:
            "a) Oui : $91 = 7 \\times 13$, et $13$ est entier.\nb) On cherche les produits qui donnent $36$ : $1 \\times 36$, $2 \\times 18$, $3 \\times 12$, $4 \\times 9$, $6 \\times 6$.\nLes diviseurs de $36$ sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$ : il y en a $9$.\nc) Oui : $125 = 5 \\times 25$.\n⭐ On trouve les diviseurs PAR PAIRES, et on s'arrête quand les deux facteurs se rejoignent ($6 \\times 6$).\n⛔ Le piège au b) : oublier $1$ et $36$. Un nombre est toujours divisible par $1$ et par lui-même.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Pour chaque nombre, dire s'il est pair ou impair en l'écrivant sous la forme $2k$ ou $2k + 1$, avec $k$ entier.\na) $46$\nb) $71$\nc) $0$",
          correction:
            "a) $46 = 2 \\times 23$ : il s'écrit $2k$ avec $k = 23$. Il est pair.\nb) $71 = 2 \\times 35 + 1$ : il s'écrit $2k + 1$ avec $k = 35$. Il est impair.\nc) $0 = 2 \\times 0$ : il s'écrit $2k$ avec $k = 0$. Il est pair.\n⛔ Le piège au c) : croire que $0$ n'est ni pair ni impair. Il s'écrit $2 \\times 0$ : il est pair.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "a) $2\\,340$ est-il divisible par $2$ ? par $3$ ? par $4$ ? par $5$ ? par $9$ ?\nb) Même question pour $1\\,011$.",
          correction:
            "On utilise les critères : le dernier chiffre pour $2$ et $5$, les deux derniers pour $4$, la somme des chiffres pour $3$ et $9$.\na) $2\\,340$ finit par $0$ : divisible par $2$ et par $5$. Ses deux derniers chiffres forment $40 = 4 \\times 10$ : divisible par $4$. La somme de ses chiffres vaut $2 + 3 + 4 + 0 = 9$ : divisible par $3$ et par $9$.\nb) $1\\,011$ finit par $1$ : ni par $2$, ni par $4$, ni par $5$. La somme de ses chiffres vaut $3$ : divisible par $3$ ($1\\,011 = 3 \\times 337$), mais pas par $9$.\n⛔ Le piège : croire qu'un nombre divisible par $3$ l'est aussi par $9$. $1\\,011$ montre que non.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Ces nombres sont-ils premiers ? Justifier.\na) $29$\nb) $51$\nc) $57$\nd) $97$\ne) $1$",
          correction:
            "Pour tester $n$, on essaie de le diviser par les nombres premiers $2$, $3$, $5$, $7$… jusqu'à $\\sqrt{n}$.\na) $\\sqrt{29} \\approx 5{,}4$. $29$ n'est divisible ni par $2$, ni par $3$, ni par $5$ : il est premier.\nb) $51 = 3 \\times 17$ : il n'est pas premier.\nc) $57 = 3 \\times 19$ : il n'est pas premier.\nd) $\\sqrt{97} \\approx 9{,}8$. $97$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$ : il est premier.\ne) $1$ n'a qu'un seul diviseur : il n'est pas premier.\n⛔ Le piège : croire que $51$ et $57$ sont premiers parce qu'ils sont impairs. La somme de leurs chiffres ($6$ et $12$) montre qu'ils sont divisibles par $3$.",
          micros: ["arith_nombre_premier"],
        },
        {
          enonce: "Décomposer en produit de facteurs premiers.\na) $60$\nb) $84$\nc) $126$",
          correction:
            "On divise par le plus petit nombre premier possible, et on recommence avec le quotient.\na) $60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2 \\times 2 \\times 3 \\times 5$, soit $60 = 2^2 \\times 3 \\times 5$.\nb) $84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2 \\times 2 \\times 3 \\times 7$, soit $84 = 2^2 \\times 3 \\times 7$.\nc) $126 = 2 \\times 63 = 2 \\times 3 \\times 21 = 2 \\times 3 \\times 3 \\times 7$, soit $126 = 2 \\times 3^2 \\times 7$.\n⛔ Le piège : s'arrêter à $60 = 4 \\times 15$. Ni $4$ ni $15$ ne sont premiers : il faut aller jusqu'au bout.",
          schema: tableau("Les trois décompositions", ["en facteurs premiers", "vérification"], [
            { label: "60", values: ["2² × 3 × 5", "4 × 15 = 60"] },
            { label: "84", values: ["2² × 3 × 7", "4 × 21 = 84"] },
            { label: "126", values: ["2 × 3² × 7", "2 × 63 = 126"] },
          ]),
          micros: ["arith_nombre_premier"],
        },
        {
          enonce: "Rendre ces fractions irréductibles.\na) $\\dfrac{42}{56}$\nb) $\\dfrac{90}{126}$\nc) $\\dfrac{17}{51}$",
          correction:
            "On divise le numérateur et le dénominateur par le même diviseur commun, le plus grand possible.\na) $42 = 14 \\times 3$ et $56 = 14 \\times 4$, donc $\\dfrac{42}{56} = \\dfrac{3}{4}$.\nb) $90 = 18 \\times 5$ et $126 = 18 \\times 7$, donc $\\dfrac{90}{126} = \\dfrac{5}{7}$.\nc) $51 = 17 \\times 3$, donc $\\dfrac{17}{51} = \\dfrac{1}{3}$.\n⭐ Une fraction est irréductible quand le numérateur et le dénominateur n'ont plus aucun diviseur commun, sauf $1$.\n⛔ Le piège au b) : diviser seulement par $2$, et s'arrêter à $\\dfrac{45}{63}$. On peut encore diviser par $9$.",
          micros: ["arith_fraction_irreductible"],
        },
        {
          enonce: "$250$ élèves partent en sortie. Chaque car a $53$ places.\na) Écrire la division euclidienne de $250$ par $53$.\nb) Combien de cars faut-il ? Combien d'élèves dans le dernier car ?",
          correction:
            "a) $53 \\times 4 = 212$ et $250 - 212 = 38$. Donc $250 = 53 \\times 4 + 38$, avec un reste $38$ plus petit que $53$.\nb) $4$ cars pleins transportent $212$ élèves. Il en reste $38$ : il faut un $5$e car.\nIl faut $5$ cars, et le dernier transporte $38$ élèves.\n⛔ Le piège : répondre $4$ cars. Le quotient compte les cars PLEINS ; les $38$ élèves du reste ne restent pas sur le parking.",
          micros: ["arith_probleme"],
        },
        {
          enonce: "a) Vérifier que $35 + 63$ est un multiple de $7$.\nb) Démontrer que la somme de deux multiples de $7$ est toujours un multiple de $7$.",
          correction:
            "a) $35 + 63 = 98 = 7 \\times 14$ : c'est un multiple de $7$.\nb) Deux multiples de $7$ s'écrivent $7a$ et $7b$, avec $a$ et $b$ entiers.\nLeur somme : $7a + 7b = 7(a + b)$. Comme $a + b$ est un entier, la somme est un multiple de $7$.\n⭐ Le a) est un exemple, le b) une preuve : il vaut pour TOUS les multiples de $7$. Et la preuve marche avec n'importe quel nombre à la place de $7$.",
          micros: ["arith_multiple_diviseur"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. On démontre avec une lettre, on décompose avant de simplifier.",
      rappel: [
        "DÉMONTRER : on écrit les nombres avec une lettre ($2k$, $2k + 1$, $7a$), on calcule, puis on reconnaît la forme cherchée.",
        "PLUS GRAND DIVISEUR COMMUN : on décompose les deux nombres et on garde les facteurs premiers qu'ils ont EN COMMUN.",
        "PLUS PETIT MULTIPLE COMMUN : on garde TOUS les facteurs premiers, chacun avec sa plus grande puissance.",
      ],
      exercices: [
        {
          enonce: "a) Vérifier sur $7$ que le carré d'un nombre impair est impair.\nb) Démontrer que c'est toujours vrai.",
          correction:
            "a) $7^2 = 49 = 2 \\times 24 + 1$ : il est impair.\nb) Un nombre impair s'écrit $2k + 1$, avec $k$ entier. Son carré :\n$(2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.\nComme $2k^2 + 2k$ est un entier, le carré s'écrit $2 \\times \\text{entier} + 1$ : il est impair.\n⭐ Avec $k = 3$ (donc le nombre $7$), $2k^2 + 2k = 24$ : on retrouve le a).",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Soient deux nombres impairs, $2a + 1$ et $2b + 1$, avec $a$ et $b$ entiers.\na) Démontrer que leur somme est paire.\nb) Démontrer que leur produit est impair.",
          correction:
            "a) $(2a + 1) + (2b + 1) = 2a + 2b + 2 = 2(a + b + 1)$. C'est $2$ fois un entier : la somme est paire.\nb) $(2a + 1)(2b + 1) = 4ab + 2a + 2b + 1 = 2(2ab + a + b) + 1$. C'est $2$ fois un entier, plus $1$ : le produit est impair.\n⛔ Le piège : appeler les deux nombres $2k + 1$ et $2k + 1$. On ne parlerait que de deux nombres ÉGAUX. Deux nombres quelconques demandent deux lettres.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "a) Décomposer $198$ et $308$ en produit de facteurs premiers.\nb) En déduire leur plus grand diviseur commun.\nc) Rendre $\\dfrac{198}{308}$ irréductible.",
          correction:
            "a) $198 = 2 \\times 99 = 2 \\times 3^2 \\times 11$. Et $308 = 4 \\times 77 = 2^2 \\times 7 \\times 11$.\nb) Les facteurs communs sont $2$ et $11$. Le plus grand diviseur commun vaut $2 \\times 11 = 22$.\nc) $198 = 22 \\times 9$ et $308 = 22 \\times 14$, donc $\\dfrac{198}{308} = \\dfrac{9}{14}$.\n⭐ $9 = 3^2$ et $14 = 2 \\times 7$ n'ont plus aucun facteur commun : la fraction est bien irréductible.",
          schema: tableau("Ce qui est commun", ["en facteurs premiers", "commun"], [
            { label: "198", values: ["2 × 3² × 11", "2 et 11"] },
            { label: "308", values: ["2² × 7 × 11", "2 et 11"] },
          ]),
          micros: ["arith_nombre_premier", "arith_fraction_irreductible"],
        },
        {
          enonce: "Calculer $\\dfrac{5}{12} + \\dfrac{7}{18}$ et donner le résultat sous forme irréductible.",
          correction:
            "On cherche le plus petit multiple commun de $12$ et $18$. On décompose : $12 = 2^2 \\times 3$ et $18 = 2 \\times 3^2$.\nOn garde chaque facteur avec sa plus grande puissance : $2^2 \\times 3^2 = 36$.\n$\\dfrac{5}{12} = \\dfrac{15}{36}$ et $\\dfrac{7}{18} = \\dfrac{14}{36}$. Donc $\\dfrac{5}{12} + \\dfrac{7}{18} = \\dfrac{29}{36}$.\n$29$ est premier et ne divise pas $36$ : la fraction est irréductible.\n⛔ Le piège : prendre $12 \\times 18 = 216$ comme dénominateur. Le calcul est juste, mais il faut ensuite simplifier $\\dfrac{174}{216}$ par $6$.",
          micros: ["arith_fraction_irreductible"],
        },
        {
          enonce: "Donner tous les nombres premiers compris entre $40$ et $60$.",
          correction:
            "On élimine d'abord les nombres pairs, puis les multiples de $3$, de $5$ et de $7$ (car $\\sqrt{60} < 8$).\nMultiples de $3$ : $45$, $51$, $57$. Multiples de $5$ : $45$, $55$. Multiple de $7$ : $49$.\nIl reste $41$, $43$, $47$, $53$ et $59$.\n⛔ Le piège : garder $49$. Il est impair, et n'est divisible ni par $3$ ni par $5$ — mais $49 = 7 \\times 7$.",
          micros: ["arith_nombre_premier"],
        },
        {
          enonce: "Vrai ou faux ? Justifier par une preuve ou un contre-exemple.\na) Tout nombre impair est premier.\nb) La somme de deux nombres premiers est paire.\nc) Un nombre divisible par $6$ est divisible par $3$.\nd) Un nombre divisible par $4$ et par $6$ est divisible par $24$.",
          correction:
            "a) FAUX. Contre-exemple : $9 = 3 \\times 3$ est impair mais pas premier.\nb) FAUX. Contre-exemple : $2 + 3 = 5$, qui est impair. Le seul nombre premier pair, $2$, fait tomber la règle.\nc) VRAI. Un multiple de $6$ s'écrit $6k = 3 \\times (2k)$ : c'est un multiple de $3$.\nd) FAUX. Contre-exemple : $12$ est divisible par $4$ et par $6$, mais pas par $24$.\n⭐ Au d), $4$ et $6$ ont le facteur $2$ en commun : il ne faut pas le compter deux fois.",
          micros: ["arith_multiple_diviseur", "arith_nombre_premier"],
        },
        {
          enonce: "Un fleuriste a $126$ roses et $90$ lys. Il veut faire le plus grand nombre possible de bouquets identiques, en utilisant toutes les fleurs.\na) Combien de bouquets peut-il faire ?\nb) Que contient chaque bouquet ?",
          correction:
            "a) Le nombre de bouquets doit diviser $126$ ET $90$ : on cherche leur plus grand diviseur commun.\n$126 = 2 \\times 3^2 \\times 7$ et $90 = 2 \\times 3^2 \\times 5$. Les facteurs communs donnent $2 \\times 3^2 = 18$.\nIl peut faire $18$ bouquets.\nb) $126 \\div 18 = 7$ et $90 \\div 18 = 5$. Chaque bouquet contient $7$ roses et $5$ lys.\n⛔ Le piège : chercher le plus petit multiple commun. On PARTAGE des fleurs : c'est un diviseur qu'on cherche.",
          micros: ["arith_probleme"],
        },
        {
          enonce: "Deux bus partent du même arrêt : la ligne A toutes les $20$ minutes, la ligne B toutes les $30$ minutes. Les deux bus partent ensemble à $6$ h.\nÀ quelle heure repartiront-ils ensemble pour la première fois ?",
          correction:
            "Les départs de la ligne A tombent sur les multiples de $20$ : $20$, $40$, $60$, $80$… Ceux de la ligne B, sur les multiples de $30$ : $30$, $60$, $90$…\nLe premier multiple commun est $60$. Avec les décompositions : $20 = 2^2 \\times 5$, $30 = 2 \\times 3 \\times 5$, donc $2^2 \\times 3 \\times 5 = 60$.\nIls repartiront ensemble $60$ minutes plus tard, à $7$ h.\n⛔ Le piège : calculer $20 \\times 30 = 600$ minutes. C'est bien un multiple commun ($10$ heures plus tard, à $16$ h), mais pas le premier.",
          micros: ["arith_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes. On reconnaît s'il faut un diviseur ou un multiple commun, et on conclut par une phrase.",
      rappel: [
        "On PARTAGE, on découpe, on remplit sans reste : on cherche un DIVISEUR commun. On attend que deux cycles se retrouvent : on cherche un MULTIPLE commun.",
        "On convertit dans la même unité avant de calculer : $3{,}60$ m $= 360$ cm.",
      ],
      exercices: [
        {
          titre: "Le carrelage",
          enonce: "Une pièce rectangulaire mesure $3{,}60$ m sur $2{,}70$ m. On veut la carreler avec des carreaux carrés, tous identiques, sans en découper aucun, et les plus grands possible.\na) Quel est le côté d'un carreau ?\nb) Combien de carreaux faut-il ?",
          correction:
            "a) En centimètres, la pièce mesure $360$ sur $270$. Le côté du carreau doit diviser $360$ et $270$, et être le plus grand possible.\n$360 = 2^3 \\times 3^2 \\times 5$ et $270 = 2 \\times 3^3 \\times 5$. Les facteurs communs donnent $2 \\times 3^2 \\times 5 = 90$.\nUn carreau mesure $90$ cm de côté.\nb) $360 \\div 90 = 4$ carreaux dans la longueur, $270 \\div 90 = 3$ dans la largeur. Il faut $4 \\times 3 = 12$ carreaux.\n⛔ Le piège : se contenter d'un diviseur commun, par exemple $30$. Il convient ($360 = 30 \\times 12$ et $270 = 30 \\times 9$), mais il faudrait $12 \\times 9 = 108$ carreaux : ce ne sont pas les plus grands.",
          micros: ["arith_probleme"],
        },
        {
          titre: "Le vélo",
          enonce: "Sur un vélo, le plateau a $48$ dents et le pignon $18$ dents. On marque une dent du plateau et une dent du pignon, qui se touchent au départ.\na) Après combien de dents passées les deux marques se retrouvent-elles face à face ?\nb) Combien de tours ont faits le plateau et le pignon ?",
          correction:
            "a) Les marques se retrouvent quand le nombre de dents passées est un multiple de $48$ ET de $18$. On cherche le plus petit.\n$48 = 2^4 \\times 3$ et $18 = 2 \\times 3^2$. On garde chaque facteur avec sa plus grande puissance : $2^4 \\times 3^2 = 144$.\nLes marques se retrouvent après $144$ dents.\nb) Le plateau a fait $144 \\div 48 = 3$ tours, et le pignon $144 \\div 18 = 8$ tours.\n⭐ Pendant que le plateau fait $3$ tours, la roue arrière en fait $8$ : c'est ce qui fait avancer le vélo plus vite que les pédales.",
          micros: ["arith_probleme"],
        },
        {
          titre: "Jamais premier",
          enonce: "a) Factoriser $n^2 - 1$.\nb) Démontrer que, pour tout entier $n \\geqslant 3$, le nombre $n^2 - 1$ n'est pas premier.\nc) En déduire, sans calculatrice, que $99\\,999\\,999$ n'est pas premier.",
          correction:
            "a) C'est une différence de deux carrés : $n^2 - 1 = (n - 1)(n + 1)$.\nb) Si $n \\geqslant 3$, alors $n - 1 \\geqslant 2$ et $n + 1 \\geqslant 4$. Le nombre $n^2 - 1$ est le produit de deux entiers plus grands que $1$ : il a au moins un diviseur autre que $1$ et lui-même. Il n'est pas premier.\nc) $99\\,999\\,999 = 100\\,000\\,000 - 1 = 10\\,000^2 - 1$.\nDonc $99\\,999\\,999 = 9\\,999 \\times 10\\,001$ : il n'est pas premier.\n⭐ Pour $n = 2$, on trouve $2^2 - 1 = 3$, qui est premier : c'est pour cela que la preuve demande $n \\geqslant 3$.",
          micros: ["arith_nombre_premier"],
        },
        {
          titre: "Les cigales qui comptent en nombres premiers",
          enonce: "En Amérique du Nord, certaines cigales vivent sous terre et ne sortent que tous les $13$ ans ; d'autres, tous les $17$ ans. En 2024, les deux espèces sont sorties la même année.\na) En quelle année ressortiront-elles ensemble ?\nb) En quelle année l'avaient-elles fait avant 2024 ?\nc) Un prédateur revient tous les $4$ ans. Tous les combien de temps rencontre-t-il une cigale à cycle de $12$ ans ? Et une cigale à cycle de $13$ ans ?\nd) Pourquoi un cycle de $13$ ou $17$ ans protège-t-il les cigales ?",
          correction:
            "a) $13$ et $17$ sont premiers : leur plus petit multiple commun est $13 \\times 17 = 221$. Elles ressortiront ensemble en $2024 + 221 = 2245$.\nb) $2024 - 221 = 1803$.\nc) Avec un cycle de $12$ ans : $12$ est un multiple de $4$, le prédateur est là à CHAQUE sortie, tous les $12$ ans.\nAvec un cycle de $13$ ans : $4$ et $13$ n'ont aucun facteur commun, ils ne se croisent que tous les $4 \\times 13 = 52$ ans.\nd) Un nombre premier n'a pas d'autre diviseur que $1$ et lui-même. Un prédateur à cycle court ne tombe donc presque jamais sur la sortie des cigales.\n⭐ Les cigales ne savent pas ce qu'est un nombre premier. C'est l'explication que proposent beaucoup de biologistes : celles qui avaient ces cycles auraient été moins mangées, et ce sont elles qui ont survécu. Elle reste discutée.",
          micros: ["arith_nombre_premier", "arith_probleme"],
        },
      ],
    },
  ],
};
