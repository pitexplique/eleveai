// ─── Fiche d'exercices : les puissances (seconde) — 20 exercices corrigés ──────
//
// ⭐ PREMIÈRE FEUILLE DU BLOC « NOMBRES ET CALCULS » (21/09/2026). Frédéric :
// « toutes les fiches exercices de nombres et calculs en seconde », chronométrées
// une par une pour estimer le coût de chaque action.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/puissances.bank.ts`
// (notionId puissances_2de) et sur la fiche de cours `lib/fiches/maths-seconde-puissances.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni $7^{-13}$, ni $3^4$, ni
// $73\,000$, ni le disque dur.
//
// ⭐ LE FIL, LE MÊME QUE LA FICHE DE COURS : on nomme l'opération AVANT
// d'appliquer une règle. Produit → on additionne ; quotient → on soustrait ;
// puissance de puissance → on multiplie ; somme → AUCUNE règle (exercices 15
// et 20). Et quand la réponse demandée est $a^n$, on ne calcule aucune valeur.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-puissances.mjs` —
// chaque expression est évaluée en fractions EXACTES (BigInt), sans passer par
// les règles des exposants, puis comparée à la puissance du corrigé.
//
// Micro-compétences : puiss_calcul (1, 19, 20), puiss_produit_quotient (2, 3,
// 15, 20), puiss_puissance_puissance (4, 15, 19, 20), puiss_exposant_negatif
// (5, 8, 10), puiss_expression_composee (9, 10, 11, 12), puiss_notation_scientifique
// (6, 7, 13, 14, 16, 17, 18). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le canvas du coach (`tableau_donnees`). ⛔ Deux colonnes de valeurs, jamais
// trois, et du texte NU : les exposants s'écrivent en Unicode (3⁻²), jamais en `$`.
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesPuissancesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "puissances-2de",
  titre: "Les puissances",
  accroche:
    "Vingt exercices, du calcul seul au problème : réduire une expression à une seule puissance, écrire en notation scientifique, mesurer le temps que met la lumière du Soleil. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/puissances-2de", titre: "Les puissances" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On nomme l'opération, puis on applique la règle.",
      rappel: [
        "PUISSANCE : $a^n$ est le produit de $n$ facteurs égaux à $a$. $a^0 = 1$, et $a^{-n} = \\dfrac{1}{a^n}$ : c'est un inverse, pas un nombre négatif.",
        "MÊME BASE : pour un produit, on ADDITIONNE les exposants. Pour un quotient, on SOUSTRAIT (le haut moins le bas). Pour $\\left(a^m\\right)^n$, on MULTIPLIE.",
        "NOTATION SCIENTIFIQUE : $a \\times 10^n$, avec un seul chiffre avant la virgule, et ce chiffre n'est pas $0$ ($1 \\leqslant a < 10$).",
      ],
      exercices: [
        {
          enonce: "Calculer.\na) $2^5$\nb) $(-1)^7$\nc) $4^0$\nd) $(-5)^2$, puis $-5^2$",
          correction:
            "a) $2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$. L'exposant compte les facteurs.\nb) $(-1)^7 = -1$. Il y a sept facteurs $-1$ : un nombre impair de signes moins donne un résultat négatif.\nc) $4^0 = 1$. Un nombre non nul à la puissance $0$ vaut toujours $1$.\nd) $(-5)^2 = (-5) \\times (-5) = 25$. Mais $-5^2 = -(5 \\times 5) = -25$ : sans parenthèse, seul le $5$ est au carré.\n⛔ Le piège : $2^5 = 10$. On a multiplié $2 \\times 5$ au lieu d'écrire cinq facteurs $2$.",
          micros: ["puiss_calcul"],
        },
        {
          enonce: "Écrire sous la forme d'une seule puissance.\na) $3^4 \\times 3^5$\nb) $x^2 \\times x^7$, avec $x \\neq 0$\nc) $10^{-3} \\times 10^{8}$",
          correction:
            "C'est un produit, et la base est la même : on garde la base et on ADDITIONNE les exposants.\na) $3^4 \\times 3^5 = 3^{4+5} = 3^9$.\nb) $x^2 \\times x^7 = x^{2+7} = x^9$.\nc) $10^{-3} \\times 10^{8} = 10^{-3+8} = 10^{5}$.\n⛔ Le piège : écrire $3^{20}$ (on a multiplié les exposants) ou $9^9$ (on a multiplié les bases). La base ne change jamais.",
          micros: ["puiss_produit_quotient"],
        },
        {
          enonce: "Écrire sous la forme d'une seule puissance.\na) $\\dfrac{5^8}{5^3}$\nb) $\\dfrac{10^2}{10^6}$\nc) $\\dfrac{7^{-2}}{7^{3}}$",
          correction:
            "C'est un quotient, et la base est la même : on SOUSTRAIT l'exposant du bas à celui du haut.\na) $\\dfrac{5^8}{5^3} = 5^{8-3} = 5^5$.\nb) $\\dfrac{10^2}{10^6} = 10^{2-6} = 10^{-4}$. Le bas est plus grand : l'exposant devient négatif, c'est normal.\nc) $\\dfrac{7^{-2}}{7^{3}} = 7^{-2-3} = 7^{-5}$.\n⛔ Le piège : soustraire dans l'autre sens. Au b), $10^{6-2} = 10^4$ est faux : c'est toujours le haut moins le bas.",
          micros: ["puiss_produit_quotient"],
        },
        {
          enonce: "a) Écrire $\\left(2^3\\right)^5$ sous la forme d'une seule puissance.\nb) Même question pour $\\left(10^{-2}\\right)^3$.\nc) Écrire $2^3 \\times 2^5$ sous la forme d'une seule puissance. Est-ce le même nombre qu'au a) ?",
          correction:
            "a) Une puissance de puissance : on MULTIPLIE les exposants. $\\left(2^3\\right)^5 = 2^{3 \\times 5} = 2^{15}$.\nb) $\\left(10^{-2}\\right)^3 = 10^{-2 \\times 3} = 10^{-6}$.\nc) Ici c'est un produit : on additionne. $2^3 \\times 2^5 = 2^{3+5} = 2^8$. Ce n'est pas le même nombre que $2^{15}$.\n⭐ Pour ne pas confondre : $\\left(2^3\\right)^5$, c'est cinq fois $2^3$ multipliés entre eux, donc $3 + 3 + 3 + 3 + 3 = 15$.",
          micros: ["puiss_puissance_puissance"],
        },
        {
          enonce: "Écrire sans exposant négatif, puis donner l'écriture décimale.\na) $10^{-3}$\nb) $2^{-2}$\nc) $4^{-1}$",
          correction:
            "Un exposant négatif, c'est un INVERSE : $a^{-n} = \\dfrac{1}{a^n}$.\na) $10^{-3} = \\dfrac{1}{10^3} = \\dfrac{1}{1\\,000} = 0{,}001$.\nb) $2^{-2} = \\dfrac{1}{2^2} = \\dfrac{1}{4} = 0{,}25$.\nc) $4^{-1} = \\dfrac{1}{4} = 0{,}25$.\n⭐ $2^{-2}$ et $4^{-1}$ sont égaux : $4 = 2^2$, donc $4^{-1} = \\left(2^2\\right)^{-1} = 2^{-2}$.\n⛔ Le piège : $2^{-2} = -4$. Un exposant négatif ne rend pas le nombre négatif : les trois résultats sont positifs.",
          micros: ["puiss_exposant_negatif"],
        },
        {
          enonce: "Écrire en notation scientifique.\na) $3\\,070$ : l'altitude du Piton des Neiges, en mètres.\nb) $0{,}000\\,008$\nc) $450 \\times 10^{3}$",
          correction:
            "a) $3\\,070 = 3{,}07 \\times 10^{3}$. On place la virgule après le premier chiffre : elle recule de $3$ rangs.\nb) $0{,}000\\,008 = 8 \\times 10^{-6}$. La virgule avance de $6$ rangs, et le nombre est plus petit que $1$ : l'exposant est négatif.\nc) $450 = 4{,}5 \\times 10^{2}$, donc $450 \\times 10^{3} = 4{,}5 \\times 10^{2} \\times 10^{3} = 4{,}5 \\times 10^{5}$.\n⛔ Le piège : s'arrêter à $450 \\times 10^{3}$. Le nombre est juste, mais l'écriture n'est pas scientifique : $450$ a trois chiffres avant la virgule.",
          micros: ["puiss_notation_scientifique"],
        },
        {
          enonce: "Voici quatre écritures : $0{,}5 \\times 10^{3}$ ; $5 \\times 10^{2}$ ; $12 \\times 10^{-4}$ ; $1{,}2 \\times 10^{-3}$.\na) Lesquelles sont en notation scientifique ?\nb) Écrire les autres en notation scientifique.",
          correction:
            "On regarde seulement le nombre devant la puissance de $10$ : il doit être au moins $1$ et plus petit que $10$.\na) $5 \\times 10^{2}$ et $1{,}2 \\times 10^{-3}$ sont en notation scientifique.\nb) $0{,}5$ commence par $0$. Or $0{,}5 = 5 \\times 10^{-1}$, donc $0{,}5 \\times 10^{3} = 5 \\times 10^{-1+3} = 5 \\times 10^{2}$.\n$12$ a deux chiffres. Or $12 = 1{,}2 \\times 10^{1}$, donc $12 \\times 10^{-4} = 1{,}2 \\times 10^{1-4} = 1{,}2 \\times 10^{-3}$.\n⭐ Les deux écritures fausses valaient exactement les deux justes. Un nombre n'a qu'une seule notation scientifique : c'est pour cela qu'on l'utilise pour comparer.",
          micros: ["puiss_notation_scientifique"],
        },
        {
          enonce: "Écrire avec un exposant négatif.\na) $\\dfrac{1}{7^4}$\nb) $\\dfrac{1}{1\\,000\\,000}$\nc) $\\dfrac{1}{8}$, avec la base $2$",
          correction:
            "On lit la règle dans l'autre sens : $\\dfrac{1}{a^n} = a^{-n}$.\na) $\\dfrac{1}{7^4} = 7^{-4}$.\nb) $1\\,000\\,000 = 10^{6}$ (six zéros), donc $\\dfrac{1}{1\\,000\\,000} = \\dfrac{1}{10^{6}} = 10^{-6}$.\nc) $8 = 2 \\times 2 \\times 2 = 2^3$, donc $\\dfrac{1}{8} = \\dfrac{1}{2^3} = 2^{-3}$.\n⛔ Le piège : écrire $-7^4$. Le signe moins va dans l'EXPOSANT, pas devant le nombre.",
          micros: ["puiss_exposant_negatif"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs règles à la suite. On réduit par étages, sans calculer de valeur.",
      rappel: [
        "PAR ÉTAGES : on réduit le haut, puis le bas, puis on soustrait. La réponse est une puissance : on ne calcule aucune valeur.",
        "Soustraire un exposant négatif, c'est ajouter : $a^{3-(-1)} = a^{3+1} = a^4$.",
        "Bases différentes : on les écrit d'abord avec la même base ($8 = 2^3$, $4 = 2^2$). Avec des puissances de $10$ : on groupe les nombres d'un côté, les puissances de $10$ de l'autre.",
      ],
      exercices: [
        {
          enonce: "Écrire $C = \\dfrac{3^5 \\times 3^{-2}}{\\left(3^2\\right)^3}$ sous la forme $3^n$.",
          correction:
            "On réduit par étages : le haut, puis le bas, puis la fraction.\nLe haut est un produit : on additionne. $3^5 \\times 3^{-2} = 3^{5+(-2)} = 3^3$.\nLe bas est une puissance de puissance : on multiplie. $\\left(3^2\\right)^3 = 3^{2 \\times 3} = 3^6$.\nLa fraction est un quotient : on soustrait. $C = \\dfrac{3^3}{3^6} = 3^{3-6} = 3^{-3}$.\nDonc $n = -3$, et on s'arrête là.\n⛔ Le piège : calculer $3^5 = 243$, puis les autres. On ne calcule aucune valeur : la question demande $3^n$.",
          schema: tableau("C par étages", ["réduit à", "la règle"], [
            { label: "Le haut", values: ["3⁵ × 3⁻² = 3³", "on additionne"] },
            { label: "Le bas", values: ["(3²)³ = 3⁶", "on multiplie"] },
            { label: "C", values: ["3³ ÷ 3⁶ = 3⁻³", "on soustrait"] },
          ]),
          micros: ["puiss_expression_composee"],
        },
        {
          enonce: "Écrire $D = \\dfrac{\\left(5^{-1}\\right)^4 \\times 5^7}{5^2 \\times 5^{-3}}$ sous la forme $5^n$.",
          correction:
            "Le haut : $\\left(5^{-1}\\right)^4 = 5^{-1 \\times 4} = 5^{-4}$, puis $5^{-4} \\times 5^7 = 5^{-4+7} = 5^3$.\nLe bas : $5^2 \\times 5^{-3} = 5^{2+(-3)} = 5^{-1}$.\nLa fraction : $D = \\dfrac{5^3}{5^{-1}} = 5^{3-(-1)} = 5^{3+1} = 5^4$.\n⛔ Le piège : écrire $3 - (-1) = 2$. Soustraire un nombre négatif, c'est AJOUTER son opposé : $3 - (-1) = 4$.\n⭐ On peut vérifier autrement : $5^{-1} = \\dfrac{1}{5}$, et diviser par $\\dfrac{1}{5}$, c'est multiplier par $5$. Donc $D = 5^3 \\times 5 = 5^4$.",
          schema: tableau("D par étages", ["réduit à", "la règle"], [
            { label: "Le haut", values: ["5⁻⁴ × 5⁷ = 5³", "× puis +"] },
            { label: "Le bas", values: ["5² × 5⁻³ = 5⁻¹", "on additionne"] },
            { label: "D", values: ["5³ ÷ 5⁻¹ = 5⁴", "3 − (−1) = 4"] },
          ]),
          micros: ["puiss_expression_composee", "puiss_exposant_negatif"],
        },
        {
          enonce: "Simplifier $E = \\dfrac{\\left(x^3\\right)^2 \\times x^{-4}}{x^{-5}}$, avec $x \\neq 0$.",
          correction:
            "Les règles marchent avec une lettre comme avec un nombre.\nLe haut : $\\left(x^3\\right)^2 = x^{3 \\times 2} = x^6$, puis $x^6 \\times x^{-4} = x^{6-4} = x^2$.\nLa fraction : $E = \\dfrac{x^2}{x^{-5}} = x^{2-(-5)} = x^{2+5} = x^7$.\n⭐ On vérifie en remplaçant $x$ par $2$. Le haut vaut $2^6 \\times 2^{-4} = 64 \\times \\dfrac{1}{16} = 4$. Le bas vaut $2^{-5} = \\dfrac{1}{32}$. Et $4 \\div \\dfrac{1}{32} = 4 \\times 32 = 128$, qui est bien $2^7$. ✓",
          micros: ["puiss_expression_composee"],
        },
        {
          enonce: "Écrire $F = 8^2 \\times 4^{-3} \\times 2^5$ sous la forme $2^n$.",
          correction:
            "Les bases ne sont pas les mêmes : on les écrit d'abord toutes avec la base $2$.\n$8 = 2^3$, donc $8^2 = \\left(2^3\\right)^2 = 2^6$.\n$4 = 2^2$, donc $4^{-3} = \\left(2^2\\right)^{-3} = 2^{-6}$.\nOn a maintenant une seule base : $F = 2^6 \\times 2^{-6} \\times 2^5 = 2^{6-6+5} = 2^5$.\n⛔ Le piège : additionner tout de suite $2 - 3 + 5$. Les règles exigent la MÊME base : on la fabrique d'abord.",
          micros: ["puiss_expression_composee", "puiss_puissance_puissance"],
        },
        {
          enonce: "Donner l'écriture scientifique de $G = \\dfrac{6 \\times 10^{5} \\times 4 \\times 10^{-2}}{8 \\times 10^{-4}}$.",
          correction:
            "On sépare les nombres et les puissances de $10$.\nLes nombres : $\\dfrac{6 \\times 4}{8} = \\dfrac{24}{8} = 3$.\nLes puissances de $10$ : $\\dfrac{10^{5} \\times 10^{-2}}{10^{-4}} = \\dfrac{10^{3}}{10^{-4}} = 10^{3-(-4)} = 10^{7}$.\nDonc $G = 3 \\times 10^{7}$. C'est bien une notation scientifique : $3$ est entre $1$ et $10$.\n⛔ Le piège : écrire $10^{3-4} = 10^{-1}$. On soustrait $-4$, donc on ajoute $4$.",
          micros: ["puiss_notation_scientifique"],
        },
        {
          enonce: "Donner l'écriture scientifique de $H = 0{,}25 \\times 10^{-3} \\times 40 \\times 10^{6}$.",
          correction:
            "Les nombres : $0{,}25 \\times 40 = 10$.\nLes puissances de $10$ : $10^{-3} \\times 10^{6} = 10^{-3+6} = 10^{3}$.\nOn obtient $10 \\times 10^{3}$. Ce n'est pas fini : le nombre devant doit être plus petit que $10$.\n$10 = 1 \\times 10^{1}$, donc $H = 1 \\times 10^{1} \\times 10^{3} = 1 \\times 10^{4}$.\n⛔ Le piège : s'arrêter à $10 \\times 10^{3}$. Le nombre devant doit être au moins $1$ et STRICTEMENT plus petit que $10$.",
          micros: ["puiss_notation_scientifique"],
        },
        {
          enonce: "Un élève a écrit trois égalités fausses. Pour chacune, trouver l'erreur puis corriger.\na) $2^3 \\times 2^4 = 4^7$\nb) $3^2 + 3^2 = 3^4$\nc) $\\left(10^2\\right)^3 = 10^5$",
          correction:
            "a) Il a multiplié les bases. La base ne change pas : $2^3 \\times 2^4 = 2^{3+4} = 2^7$.\nb) Il a additionné les exposants, mais c'est une SOMME, pas un produit. Aucune règle ne réduit une somme : on calcule. $3^2 + 3^2 = 9 + 9 = 18$, alors que $3^4 = 81$.\nc) Il a additionné les exposants d'une puissance de puissance. Il faut les multiplier : $\\left(10^2\\right)^3 = 10^{2 \\times 3} = 10^6$.\n⭐ Avant d'appliquer une règle, on nomme l'opération. Un produit : on additionne. Un quotient : on soustrait. Une puissance de puissance : on multiplie. Une somme : aucune règle.",
          micros: ["puiss_produit_quotient", "puiss_puissance_puissance"],
        },
        {
          enonce: "Ranger ces nombres du plus petit au plus grand.\n$2{,}5 \\times 10^{-3}$ ; $3 \\times 10^{-4}$ ; $0{,}01$ ; $9 \\times 10^{-4}$",
          correction:
            "On écrit tout en notation scientifique : $0{,}01 = 1 \\times 10^{-2}$.\nOn compare d'abord les puissances de $10$ : $10^{-4} < 10^{-3} < 10^{-2}$.\nÀ puissance égale, on compare le nombre devant : $3 \\times 10^{-4} < 9 \\times 10^{-4}$.\nL'ordre : $3 \\times 10^{-4} < 9 \\times 10^{-4} < 2{,}5 \\times 10^{-3} < 0{,}01$.\n⛔ Le piège : regarder d'abord le nombre devant. $9$ est plus grand que $2{,}5$, mais c'est la puissance de $10$ qui décide : $0{,}000\\,9 < 0{,}002\\,5$.",
          micros: ["puiss_notation_scientifique"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. On choisit l'outil, et on conclut par une phrase.",
      rappel: [
        "Temps $=$ distance $\\div$ vitesse. Avec des puissances de $10$ : on divise les nombres, puis on soustrait les exposants.",
        "Pour un ordre de grandeur : $2^{10} = 1\\,024$, c'est à peu près $10^3$.",
        "On conclut par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "La lumière du Soleil",
          enonce: "La Terre est à environ $1{,}5 \\times 10^{8}$ km du Soleil. La lumière parcourt $3 \\times 10^{5}$ km par seconde.\na) Combien de secondes la lumière du Soleil met-elle pour arriver jusqu'à nous ?\nb) Convertir ce temps en minutes et secondes.\nc) La Lune est à environ $3{,}84 \\times 10^{5}$ km. Combien de temps met sa lumière ?",
          correction:
            "a) Temps $=$ distance $\\div$ vitesse : $\\dfrac{1{,}5 \\times 10^{8}}{3 \\times 10^{5}} = \\dfrac{1{,}5}{3} \\times 10^{8-5} = 0{,}5 \\times 10^{3} = 500$ s.\nb) $500 = 8 \\times 60 + 20$. La lumière du Soleil met $8$ min $20$ s.\nc) $\\dfrac{3{,}84 \\times 10^{5}}{3 \\times 10^{5}} = 1{,}28 \\times 10^{0} = 1{,}28$ s.\n⭐ Le Soleil qu'on voit est celui d'il y a $8$ minutes. La Lune, celle d'il y a un peu plus d'une seconde.\n⛔ Le piège : ne diviser que les puissances et répondre $10^{3} = 1\\,000$ s. On divise les nombres ET les puissances de $10$.",
          micros: ["puiss_notation_scientifique", "puiss_produit_quotient"],
        },
        {
          titre: "Les globules rouges",
          enonce: "Un adulte a environ $5$ litres de sang. Un millimètre cube de sang contient environ $5 \\times 10^{6}$ globules rouges. Et $1$ litre $= 10^{6}$ mm³.\na) Combien un adulte a-t-il de globules rouges ? Donner la notation scientifique.\nb) Un globule rouge mesure environ $7 \\times 10^{-6}$ m de large. Mis bout à bout, quelle longueur feraient-ils, en kilomètres ?\nc) Le tour de la Terre mesure environ $4 \\times 10^{4}$ km. Combien de fois ferait-on le tour de la Terre ?",
          correction:
            "a) D'abord le volume en mm³ : $5 \\times 10^{6}$ mm³.\nPuis le nombre de globules : $5 \\times 10^{6} \\times 5 \\times 10^{6} = 25 \\times 10^{12}$.\nEn notation scientifique : $25 = 2{,}5 \\times 10^{1}$, donc $2{,}5 \\times 10^{13}$ globules rouges.\nb) $2{,}5 \\times 10^{13} \\times 7 \\times 10^{-6} = 17{,}5 \\times 10^{7}$ m, soit $1{,}75 \\times 10^{8}$ m.\nEn kilomètres, on divise par $10^{3}$ : $1{,}75 \\times 10^{5}$ km, c'est-à-dire $175\\,000$ km.\nc) $\\dfrac{1{,}75 \\times 10^{5}}{4 \\times 10^{4}} = 0{,}4375 \\times 10^{1} = 4{,}375$. On ferait un peu plus de $4$ fois le tour de la Terre.\n⛔ Le piège : oublier de convertir les litres. $5 \\times 5 \\times 10^{6} = 2{,}5 \\times 10^{7}$ : un million de fois trop peu.",
          schema: tableau("Du sang au tour de la Terre", ["valeur", "unité"], [
            { label: "Volume", values: ["5 × 10⁶", "mm³"] },
            { label: "Globules", values: ["2,5 × 10¹³", "globules"] },
            { label: "Bout à bout", values: ["1,75 × 10⁵", "km"] },
          ]),
          micros: ["puiss_notation_scientifique"],
        },
        {
          titre: "Une bactérie qui se divise",
          enonce: "Une bactérie se divise en deux toutes les $20$ minutes. On part d'une seule bactérie.\na) Combien y en a-t-il au bout d'une heure ? Au bout de deux heures ?\nb) Écrire sous la forme $2^n$ le nombre de bactéries au bout de $10$ heures.\nc) On sait que $2^{10} = 1\\,024$, à peu près $10^3$. En déduire un ordre de grandeur du nombre de bactéries au bout de $10$ heures.",
          correction:
            "a) En une heure, il y a $3$ divisions, une toutes les $20$ minutes. Chaque division multiplie par $2$ : $2^3 = 8$ bactéries.\nEn deux heures, $6$ divisions : $2^6 = 64$ bactéries.\nb) En $10$ heures, $10 \\times 3 = 30$ divisions : $2^{30}$ bactéries.\nc) $2^{30} = 2^{10 \\times 3} = \\left(2^{10}\\right)^3$. Comme $2^{10} \\approx 10^3$, on obtient environ $\\left(10^3\\right)^3 = 10^{9}$.\nAu bout de $10$ heures, il y a environ un milliard de bactéries. (La valeur exacte est $1\\,073\\,741\\,824$.)\n⛔ Le piège : compter $2 \\times 30 = 60$ bactéries. Chaque division MULTIPLIE par $2$ : on obtient une puissance, pas un produit par $30$.",
          micros: ["puiss_calcul", "puiss_puissance_puissance"],
        },
        {
          titre: "Vrai ou faux ?",
          enonce: "Pour chaque égalité, dire si elle est vraie ou fausse, et justifier par un calcul.\na) $2^{10} + 2^{10} = 2^{11}$\nb) $2^{10} \\times 2^{10} = 4^{10}$\nc) $10^{-2} \\times 10^{-3} = 10^{6}$\nd) $(-1)^{2025} = 1$",
          correction:
            "a) VRAI. $2^{10} + 2^{10} = 2 \\times 2^{10} = 2^{1} \\times 2^{10} = 2^{11}$. Ajouter deux fois le même nombre, c'est le multiplier par $2$.\nb) VRAI. $2^{10} \\times 2^{10} = 2^{20}$. Et $4^{10} = \\left(2^2\\right)^{10} = 2^{20}$. Les deux valent $2^{20}$.\nc) FAUX. C'est un produit : on additionne. $10^{-2} \\times 10^{-3} = 10^{-2+(-3)} = 10^{-5}$. L'élève a multiplié les exposants.\nd) FAUX. $2025$ est impair : un nombre impair de facteurs $-1$ donne $-1$. Donc $(-1)^{2025} = -1$.\n⭐ Le a) et le b) semblent faux au premier coup d'œil. C'est pour cela qu'on justifie par un calcul, jamais par une impression.",
          micros: ["puiss_calcul", "puiss_produit_quotient", "puiss_puissance_puissance"],
        },
      ],
    },
  ],
};
