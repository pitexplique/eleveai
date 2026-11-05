// ─── Fiche d'exercices : multiples, diviseurs, pair et impair (seconde) ────────
//
// Septième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank.ts`
// (notionId arithmetique_entiers). La fiche de cours de la notion est écrite
// APRÈS la feuille, dans la même session (ordre donné par Frédéric : « toutes
// les fiches exercices, puis les deux fiches de cours manquantes »).
//
// ⛔ 05/11/2026 : le programme de seconde 2026 (annexe, BO n°14 du 02/04/2026)
// arrête l'arithmétique à multiple, diviseur, pair, impair. Les nombres premiers
// et la décomposition sont retirés de la feuille, à la demande de Frédéric.
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
// les diviseurs par essais un à un, le plus grand diviseur commun par Euclide.
//
// Micro-compétences : arith_multiple_diviseur (1, 2, 3, 4, 5, 8, 9, 10, 11, 13,
// 14, 19), arith_fraction_irreductible (6, 11, 12), arith_probleme (7, 15, 16,
// 17, 18, 20). 3/3 ; arith_nombre_premier est masquée (micros-masquees.ts).

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
  titre: "Multiples, diviseurs, pair et impair",
  accroche:
    "Vingt exercices, du calcul seul au problème : trouver les diviseurs, appliquer les critères de divisibilité, rendre une fraction irréductible, démontrer avec une lettre. Des bouquets, des bus, un carrelage, un vélo, et des cigales qui sortent de terre tous les 13 ou 17 ans. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/arithmetique-entiers", titre: "Multiples, diviseurs, pair et impair" },
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
        "Par $2$, $5$ ou $10$ : le dernier chiffre. Par $4$ : les deux derniers. Une fraction est IRRÉDUCTIBLE quand seul $1$ divise à la fois son numérateur et son dénominateur.",
      ],
      exercices: [
        {
          enonce: "a) $91$ est-il un multiple de $7$ ?\nb) Donner tous les diviseurs de $36$.\nc) $5$ est-il un diviseur de $125$ ?",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: "1 ; 2 ; 3 ; 4 ; 6 ; 9 ; 12 ; 18 ; 36" },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "a) Oui : $91 = 7 \\times 13$, et $13$ est entier.\nb) On cherche les produits qui donnent $36$ : $1 \\times 36$, $2 \\times 18$, $3 \\times 12$, $4 \\times 9$, $6 \\times 6$.\nLes diviseurs de $36$ sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$ : il y en a $9$.\nc) Oui : $125 = 5 \\times 25$.\n⭐ On trouve les diviseurs PAR PAIRES, et on s'arrête quand les deux facteurs se rejoignent ($6 \\times 6$).\n⛔ Le piège au b) : oublier $1$ et $36$. Un nombre est toujours divisible par $1$ et par lui-même.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Pour chaque nombre, dire s'il est pair ou impair en l'écrivant sous la forme $2k$ ou $2k + 1$, avec $k$ entier.\na) $46$\nb) $71$\nc) $0$",
          reponses: [
            { question: "a)", attendu: "pair" },
            { question: "b)", attendu: "impair" },
            { question: "c)", attendu: "pair" },
          ],
          correction:
            "a) $46 = 2 \\times 23$ : il s'écrit $2k$ avec $k = 23$. Il est pair.\nb) $71 = 2 \\times 35 + 1$ : il s'écrit $2k + 1$ avec $k = 35$. Il est impair.\nc) $0 = 2 \\times 0$ : il s'écrit $2k$ avec $k = 0$. Il est pair.\n⛔ Le piège au c) : croire que $0$ n'est ni pair ni impair. Il s'écrit $2 \\times 0$ : il est pair.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "a) $2\\,340$ est-il divisible par $2$ ? par $3$ ? par $4$ ? par $5$ ? par $9$ ?\nb) Même question pour $1\\,011$.",
          reponses: [
            { question: "a) divisible par", attendu: "2 ; 3 ; 4 ; 5 ; 9" },
            { question: "b) divisible par", attendu: "3" },
          ],
          correction:
            "On utilise les critères : le dernier chiffre pour $2$ et $5$, les deux derniers pour $4$, la somme des chiffres pour $3$ et $9$.\na) $2\\,340$ finit par $0$ : divisible par $2$ et par $5$. Ses deux derniers chiffres forment $40 = 4 \\times 10$ : divisible par $4$. La somme de ses chiffres vaut $2 + 3 + 4 + 0 = 9$ : divisible par $3$ et par $9$.\nb) $1\\,011$ finit par $1$ : ni par $2$, ni par $4$, ni par $5$. La somme de ses chiffres vaut $3$ : divisible par $3$ ($1\\,011 = 3 \\times 337$), mais pas par $9$.\n⛔ Le piège : croire qu'un nombre divisible par $3$ l'est aussi par $9$. $1\\,011$ montre que non.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Répondre par oui ou non, et justifier par une égalité.\na) $8$ divise-t-il $96$ ?\nb) $6$ divise-t-il $75$ ?\nc) $104$ est-il un multiple de $13$ ?\nd) $7$ divise-t-il $100$ ?\ne) $1$ divise-t-il $57$ ?",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
            { question: "e)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "On écrit la division : le nombre divise si le reste vaut $0$.\na) $96 = 8 \\times 12$ : oui.\nb) $75 = 6 \\times 12 + 3$ : le reste vaut $3$, donc non.\nc) $104 = 13 \\times 8$ : oui.\nd) $100 = 7 \\times 14 + 2$ : le reste vaut $2$, donc non.\ne) $57 = 1 \\times 57$ : oui.\n⭐ $1$ divise tous les entiers, et tout entier se divise lui-même.\n⛔ Le piège au b) : croire que $6$ divise $75$ parce que $6$ et $75$ sont tous les deux divisibles par $3$. Cela ne suffit pas : c'est le reste qui décide.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Donner tous les diviseurs de chaque nombre.\na) $45$\nb) $64$\nc) $84$",
          reponses: [
            { question: "a)", attendu: "1 ; 3 ; 5 ; 9 ; 15 ; 45" },
            { question: "b)", attendu: "1 ; 2 ; 4 ; 8 ; 16 ; 32 ; 64" },
            { question: "c)", attendu: "1 ; 2 ; 3 ; 4 ; 6 ; 7 ; 12 ; 14 ; 21 ; 28 ; 42 ; 84" },
          ],
          correction:
            "On cherche les produits, en essayant $1$, $2$, $3$… jusqu'à ce que les deux facteurs se rejoignent.\na) $1 \\times 45$, $3 \\times 15$, $5 \\times 9$. Les diviseurs de $45$ sont $1$, $3$, $5$, $9$, $15$ et $45$.\nb) $1 \\times 64$, $2 \\times 32$, $4 \\times 16$, $8 \\times 8$. Les diviseurs de $64$ sont $1$, $2$, $4$, $8$, $16$, $32$ et $64$.\nc) $1 \\times 84$, $2 \\times 42$, $3 \\times 28$, $4 \\times 21$, $6 \\times 14$, $7 \\times 12$. Les diviseurs de $84$ sont $1$, $2$, $3$, $4$, $6$, $7$, $12$, $14$, $21$, $28$, $42$ et $84$.\n⭐ $64$ a un nombre impair de diviseurs : dans $8 \\times 8$, le $8$ ne compte qu'une fois. Seuls les carrés font cela.\n⛔ Le piège au a) : essayer seulement $2$, $4$, $6$. Le nombre $45$ est impair, mais il a bien d'autres diviseurs.",
          schema: tableau("Le dernier essai, et le nombre de diviseurs", ["=", "total"], [
            { label: "45", values: ["5×9", "6"] },
            { label: "64", values: ["8×8", "7"] },
            { label: "84", values: ["7×12", "12"] },
          ]),
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Rendre ces fractions irréductibles.\na) $\\frac{42}{56}$\nb) $\\frac{90}{126}$\nc) $\\frac{17}{51}$",
          reponses: [
            { question: "a)", attendu: "3/4", exact: true },
            { question: "b)", attendu: "5/7", exact: true },
            { question: "c)", attendu: "1/3", exact: true },
          ],
          correction:
            "On divise le numérateur et le dénominateur par le même diviseur commun, le plus grand possible.\na) $42 = 14 \\times 3$ et $56 = 14 \\times 4$, donc $\\frac{42}{56} = \\frac{3}{4}$.\nb) $90 = 18 \\times 5$ et $126 = 18 \\times 7$, donc $\\frac{90}{126} = \\frac{5}{7}$.\nc) $51 = 17 \\times 3$, donc $\\frac{17}{51} = \\frac{1}{3}$.\n⭐ Une fraction est irréductible quand le numérateur et le dénominateur n'ont plus aucun diviseur commun, sauf $1$.\n⛔ Le piège au b) : diviser seulement par $2$, et s'arrêter à $\\frac{45}{63}$. On peut encore diviser par $9$.",
          micros: ["arith_fraction_irreductible"],
        },
        {
          enonce: "$250$ élèves partent en sortie. Chaque car a $53$ places.\na) Écrire la division euclidienne de $250$ par $53$.\nb) Combien de cars faut-il ? Combien d'élèves dans le dernier car ?",
          reponses: [
            { question: "a)", attendu: ["250=53×4+38", "250=4×53+38", "53×4+38", "4×53+38"], exact: true },
            { question: "b) cars", attendu: "5" },
            { question: "b) dernier car", attendu: "38" },
          ],
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
      consigne: "Plusieurs étapes. On démontre avec une lettre, on cherche les diviseurs communs avant de simplifier.",
      rappel: [
        "DÉMONTRER : on écrit les nombres avec une lettre ($2k$, $2k + 1$, $7a$), on calcule, puis on reconnaît la forme cherchée.",
        "PLUS GRAND DIVISEUR COMMUN : on écrit les diviseurs du plus petit nombre, et on garde le plus grand qui divise aussi l'autre.",
        "PLUS PETIT MULTIPLE COMMUN : on écrit les multiples du plus grand nombre, et on s'arrête dès que l'un d'eux est aussi un multiple de l'autre.",
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
          enonce: "a) Donner tous les diviseurs de $66$ et de $90$.\nb) En déduire leur plus grand diviseur commun.\nc) Rendre $\\frac{66}{90}$ irréductible.",
          reponses: [
            { question: "a) 66", attendu: "1 ; 2 ; 3 ; 6 ; 11 ; 22 ; 33 ; 66" },
            { question: "a) 90", attendu: "1 ; 2 ; 3 ; 5 ; 6 ; 9 ; 10 ; 15 ; 18 ; 30 ; 45 ; 90" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "11/15", exact: true },
          ],
          correction:
            "a) Par paires, les diviseurs de $66$ sont $1$, $2$, $3$, $6$, $11$, $22$, $33$ et $66$.\nCeux de $90$ sont $1$, $2$, $3$, $5$, $6$, $9$, $10$, $15$, $18$, $30$, $45$ et $90$.\nb) Les diviseurs communs sont $1$, $2$, $3$ et $6$. Le plus grand vaut $6$.\nc) $66 = 6 \\times 11$ et $90 = 6 \\times 15$, donc $\\frac{66}{90} = \\frac{11}{15}$.\n⭐ Les diviseurs de $11$ sont $1$ et $11$, ceux de $15$ sont $1$, $3$, $5$ et $15$ : seul $1$ est commun, la fraction est bien irréductible.",
          schema: tableau("Le plus grand diviseur commun : 6", ["=", "reste"], [
            { label: "66", values: ["6×11", "11"] },
            { label: "90", values: ["6×15", "15"] },
          ]),
          micros: ["arith_multiple_diviseur", "arith_fraction_irreductible"],
        },
        {
          enonce: "Calculer $\\frac{5}{12} + \\frac{7}{18}$ et donner le résultat sous forme irréductible.",
          reponses: [
            { attendu: "29/36", exact: true },
          ],
          correction:
            "On cherche le plus petit multiple commun de $12$ et $18$. Les multiples de $18$ sont $18$, $36$… $18$ n'est pas un multiple de $12$, mais $36 = 12 \\times 3$ : c'est $36$.\n$\\frac{5}{12} = \\frac{15}{36}$ et $\\frac{7}{18} = \\frac{14}{36}$. Donc $\\frac{5}{12} + \\frac{7}{18} = \\frac{29}{36}$.\n$29$ n'est divisible ni par $2$, ni par $3$ : il n'a aucun diviseur commun avec $36$, sauf $1$. La fraction est irréductible.\n⛔ Le piège : prendre $12 \\times 18 = 216$ comme dénominateur. Le calcul est juste, mais il faut ensuite simplifier $\\frac{174}{216}$ par $6$.",
          micros: ["arith_fraction_irreductible"],
        },
        {
          enonce: "Donner tous les entiers compris entre $100$ et $150$ qui sont divisibles à la fois par $4$ et par $6$.",
          reponses: [
            { attendu: "108 ; 120 ; 132 ; 144" },
          ],
          correction:
            "On part des multiples de $6$ : $102$, $108$, $114$, $120$, $126$, $132$, $138$, $144$, $150$.\nOn regarde les deux derniers chiffres pour le critère de $4$ : $08$, $20$, $32$ et $44$ sont des multiples de $4$ ; $02$, $14$, $26$, $38$ et $50$ n'en sont pas.\nIl reste $108$, $120$, $132$ et $144$.\n⛔ Le piège : chercher les multiples de $24$, parce que $4 \\times 6 = 24$. On oublierait $108$ et $132$.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Vrai ou faux ? Justifier par une preuve ou un contre-exemple.\na) Tout nombre impair est divisible par $3$.\nb) La somme de deux nombres impairs est impaire.\nc) Un nombre divisible par $6$ est divisible par $3$.\nd) Un nombre divisible par $4$ et par $6$ est divisible par $24$.",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) FAUX. Contre-exemple : $7 = 3 \\times 2 + 1$ est impair, mais pas divisible par $3$.\nb) FAUX. Contre-exemple : $3 + 5 = 8$, qui est pair.\nc) VRAI. Un multiple de $6$ s'écrit $6k = 3 \\times (2k)$ : c'est un multiple de $3$.\nd) FAUX. Contre-exemple : $12$ est divisible par $4$ et par $6$, mais pas par $24$.\n⭐ Au d), $4$ et $6$ sont tous les deux divisibles par $2$ : il ne faut pas compter ce $2$ deux fois.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          enonce: "Un fleuriste a $126$ roses et $90$ lys. Il veut faire le plus grand nombre possible de bouquets identiques, en utilisant toutes les fleurs.\na) Combien de bouquets peut-il faire ?\nb) Que contient chaque bouquet ?",
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b) roses", attendu: "7" },
            { question: "b) lys", attendu: "5" },
          ],
          correction:
            "a) Le nombre de bouquets doit diviser $126$ ET $90$ : on cherche leur plus grand diviseur commun.\nLes diviseurs de $90$, du plus grand au plus petit : $90$, $45$, $30$, $18$… Or $126 = 90 \\times 1 + 36$, $126 = 45 \\times 2 + 36$, $126 = 30 \\times 4 + 6$, mais $126 = 18 \\times 7$. Le plus grand diviseur commun est $18$.\nIl peut faire $18$ bouquets.\nb) $126 \\div 18 = 7$ et $90 \\div 18 = 5$. Chaque bouquet contient $7$ roses et $5$ lys.\n⛔ Le piège : chercher le plus petit multiple commun. On PARTAGE des fleurs : c'est un diviseur qu'on cherche.",
          micros: ["arith_probleme"],
        },
        {
          enonce: "Deux bus partent du même arrêt : la ligne A toutes les $20$ minutes, la ligne B toutes les $30$ minutes. Les deux bus partent ensemble à $6$ h.\nÀ quelle heure repartiront-ils ensemble pour la première fois ?",
          reponses: [
            { attendu: ["7 h", "7h00"] },
          ],
          correction:
            "Les départs de la ligne A tombent sur les multiples de $20$ : $20$, $40$, $60$, $80$… Ceux de la ligne B, sur les multiples de $30$ : $30$, $60$, $90$…\nLe plus petit multiple commun est $60$.\nIls repartiront ensemble $60$ minutes plus tard, à $7$ h.\n⛔ Le piège : calculer $20 \\times 30 = 600$ minutes. C'est bien un multiple commun ($10$ heures plus tard, à $16$ h), mais pas le premier.",
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
          reponses: [
            { question: "a)", attendu: "90 cm" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) En centimètres, la pièce mesure $360$ sur $270$. Le côté du carreau doit diviser $360$ et $270$, et être le plus grand possible.\nLes diviseurs de $270$, du plus grand au plus petit : $270$, $135$, $90$… Or $360 = 270 \\times 1 + 90$, $360 = 135 \\times 2 + 90$, mais $360 = 90 \\times 4$. Le plus grand diviseur commun est $90$.\nUn carreau mesure $90$ cm de côté.\nb) $360 \\div 90 = 4$ carreaux dans la longueur, $270 \\div 90 = 3$ dans la largeur. Il faut $4 \\times 3 = 12$ carreaux.\n⛔ Le piège : se contenter d'un diviseur commun, par exemple $30$. Il convient ($360 = 30 \\times 12$ et $270 = 30 \\times 9$), mais il faudrait $12 \\times 9 = 108$ carreaux : ce ne sont pas les plus grands.",
          micros: ["arith_probleme"],
        },
        {
          titre: "Le vélo",
          enonce: "Sur un vélo, le plateau a $48$ dents et le pignon $18$ dents. On marque une dent du plateau et une dent du pignon, qui se touchent au départ.\na) Après combien de dents passées les deux marques se retrouvent-elles face à face ?\nb) Combien de tours ont faits le plateau et le pignon ?",
          reponses: [
            { question: "a)", attendu: "144" },
            { question: "b) plateau", attendu: "3" },
            { question: "b) pignon", attendu: "8" },
          ],
          correction:
            "a) Les marques se retrouvent quand le nombre de dents passées est un multiple de $48$ ET de $18$. On cherche le plus petit.\nLes multiples de $48$ sont $48$, $96$, $144$… Or $48 = 18 \\times 2 + 12$, $96 = 18 \\times 5 + 6$, mais $144 = 18 \\times 8$. Le plus petit multiple commun est $144$.\nLes marques se retrouvent après $144$ dents.\nb) Le plateau a fait $144 \\div 48 = 3$ tours, et le pignon $144 \\div 18 = 8$ tours.\n⭐ Pendant que le plateau fait $3$ tours, la roue arrière en fait $8$ : c'est ce qui fait avancer le vélo plus vite que les pédales.",
          micros: ["arith_probleme"],
        },
        {
          titre: "Le nombre qui cache ses diviseurs",
          enonce: "a) Factoriser $n^2 - 1$.\nb) En déduire, sans calculatrice, deux diviseurs de $99\\,999\\,999$ autres que $1$ et lui-même.\nc) Démontrer que, si $n$ est impair, alors $n^2 - 1$ est un multiple de $4$.",
          reponses: [
            { question: "a)", attendu: ["(n-1)(n+1)", "(n+1)(n-1)"], exact: true },
          ],
          correction:
            "a) C'est une différence de deux carrés : $n^2 - 1 = (n - 1)(n + 1)$.\nb) $99\\,999\\,999 = 100\\,000\\,000 - 1 = 10\\,000^2 - 1$.\nDonc $99\\,999\\,999 = 9\\,999 \\times 10\\,001$ : $9\\,999$ et $10\\,001$ sont deux diviseurs.\nc) Si $n$ est impair, il s'écrit $2k + 1$, avec $k$ entier. Alors $n - 1 = 2k$ et $n + 1 = 2k + 2 = 2(k + 1)$.\nDonc $n^2 - 1 = 2k \\times 2(k + 1) = 4k(k + 1)$. Comme $k(k + 1)$ est un entier, c'est un multiple de $4$.\n⭐ Avec $n = 7$, donc $k = 3$ : $7^2 - 1 = 48 = 4 \\times 12$, et on a bien $k(k + 1) = 3 \\times 4 = 12$.",
          micros: ["arith_multiple_diviseur"],
        },
        {
          titre: "Les cigales de 13 et de 17 ans",
          enonce: "En Amérique du Nord, certaines cigales vivent sous terre et ne sortent que tous les $13$ ans ; d'autres, tous les $17$ ans. En 2024, les deux espèces sont sorties la même année.\na) En quelle année ressortiront-elles ensemble ?\nb) En quelle année l'avaient-elles fait avant 2024 ?\nc) Un prédateur revient tous les $4$ ans. Tous les combien de temps rencontre-t-il une cigale à cycle de $12$ ans ? Et une cigale à cycle de $13$ ans ?\nd) Pourquoi un cycle de $13$ ou $17$ ans protège-t-il les cigales ?",
          reponses: [
            { question: "a)", attendu: "2245" },
            { question: "b)", attendu: "1803" },
            { question: "c) cycle de 12 ans", attendu: "12" },
            { question: "c) cycle de 13 ans", attendu: "52" },
          ],
          correction:
            "a) Les multiples de $17$ sont $17$, $34$, $51$… Aucun n'est un multiple de $13$ avant $13 \\times 17 = 221$ : c'est leur plus petit multiple commun. Elles ressortiront ensemble en $2024 + 221 = 2245$.\nb) $2024 - 221 = 1803$.\nc) Avec un cycle de $12$ ans : $12$ est un multiple de $4$, le prédateur est là à CHAQUE sortie, tous les $12$ ans.\nAvec un cycle de $13$ ans : $4$ et $13$ n'ont que $1$ comme diviseur commun, ils ne se croisent que tous les $4 \\times 13 = 52$ ans.\nd) $12$ a beaucoup de diviseurs : $1$, $2$, $3$, $4$, $6$ et $12$. $13$ n'en a que deux, $1$ et $13$, et $17$ aussi. Un prédateur à cycle court ne tombe donc presque jamais sur la sortie des cigales.\n⭐ Les cigales ne font aucun calcul : celles qui avaient ces cycles auraient été moins mangées, et ce sont elles qui ont survécu. C'est l'explication que proposent beaucoup de biologistes, et elle reste discutée.",
          micros: ["arith_probleme"],
        },
      ],
    },
  ],
};
