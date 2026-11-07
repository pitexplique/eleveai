// ─── Fiche d'exercices : puissance d'un produit ou d'une fraction (seconde) ─────
//
// ⭐ LA FEUILLE DE LA MICRO `puiss_meme_exposant` (07/11/2026). Frédéric, en lisant
// que le coach ne proposait pas (2/3)³ : « dommage », puis « Oui, ajoute-la » pour
// la micro, et « Oui, prépare-la » pour cette feuille.
//
// ⛔ UNE FEUILLE À PART, et pas un 21e exercice dans `maths-seconde-puissances.tsx` :
// le format 8 + 8 + 4 est arrêté. Les deux feuilles se citent l'une l'autre
// (`feuillesVoisines`), et le bouton « Exercices » de la notion reste sur l'ancienne.
//
// ⭐ LE FIL : on regarde l'opération DANS la parenthèse. Un produit ou un quotient :
// l'exposant va sur chaque morceau. Une somme : aucune règle (exercice 14).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-puissance-produit-fraction.mjs`,
// en fractions exactes (BigInt), facteur par facteur, sans passer par les règles.
//
// Chiffres réels (ordres de grandeur, arrondis dans l'énoncé) :
// - rayons moyens : Terre 6 371 km, Lune 1 737 km, soit un rapport de 0,2726 ≈ 3/11 ;
// - caféine : demi-vie de l'ordre de 5 h chez l'adulte, très variable d'une personne
//   à l'autre (d'où le « modèle simple » de l'énoncé) ; une canette de 250 mL de
//   boisson énergisante en contient environ 80 mg.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le canvas du coach (`tableau_donnees`). ⛔ Deux colonnes de valeurs, et du texte
// NU : les exposants s'écrivent en Unicode, jamais en `$`.
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesPuissanceProduitFractionSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "puissances-2de",
  titre: "Puissance d'un produit ou d'une fraction",
  accroche:
    "Vingt exercices, du calcul seul au problème : répartir un exposant, calculer $\\left(\\dfrac{2}{3}\\right)^3$ sans se tromper, retourner une fraction, mesurer combien de Lunes tiendraient dans la Terre. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/puissances-2de", titre: "Les puissances" }],
  coachHref: "/coach-ia/maths?classe=seconde",
  feuillesVoisines: [{ href: "/fiches-exercices/maths/seconde/puissances-2de", titre: "Les puissances" }],

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On regarde l'opération dans la parenthèse, puis on applique la règle.",
      rappel: [
        "PRODUIT : $(a \\times b)^n = a^n \\times b^n$. L'exposant va sur CHAQUE facteur.",
        "FRACTION : $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$, avec $b \\neq 0$. L'exposant va en haut ET en bas.",
        "SOMME : aucune règle. $(a + b)^2$ n'est pas $a^2 + b^2$.",
      ],
      exercices: [
        {
          enonce: "Écrire comme un produit de deux puissances.\na) $(3 \\times 5)^2$\nb) $(2 \\times 7)^3$\nc) $(4 \\times 10)^5$",
          reponses: [
            { question: "a)", attendu: "3^2 × 5^2", exact: true },
            { question: "b)", attendu: "2^3 × 7^3", exact: true },
            { question: "c)", attendu: "4^5 × 10^5", exact: true },
          ],
          correction:
            "Dans la parenthèse, c'est un produit : l'exposant va sur chaque facteur.\na) $(3 \\times 5)^2 = 3^2 \\times 5^2$.\nb) $(2 \\times 7)^3 = 2^3 \\times 7^3$.\nc) $(4 \\times 10)^5 = 4^5 \\times 10^5$.\n⛔ Le piège : écrire $3 \\times 5^2$. Le $3$ est aussi dans la parenthèse : il prend l'exposant.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Écrire sous la forme d'une seule puissance.\na) $2^3 \\times 5^3$\nb) $3^4 \\times 4^4$\nc) $6^2 \\times 5^2$",
          reponses: [
            { question: "a)", attendu: "10^3", exact: true },
            { question: "b)", attendu: "12^4", exact: true },
            { question: "c)", attendu: "30^2", exact: true },
          ],
          correction:
            "Les exposants sont égaux : on garde l'exposant et on multiplie les bases.\na) $2^3 \\times 5^3 = (2 \\times 5)^3 = 10^3$.\nb) $3^4 \\times 4^4 = (3 \\times 4)^4 = 12^4$.\nc) $6^2 \\times 5^2 = (6 \\times 5)^2 = 30^2$.\n⛔ Le piège : écrire $10^6$ au a). On n'additionne les exposants que si les BASES sont égales. Ici ce sont les exposants qui sont égaux.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Calculer sans calculatrice, en multipliant d'abord les bases.\na) $2^4 \\times 5^4$\nb) $4^3 \\times 25^3$\nc) $5^2 \\times 20^2$",
          reponses: [
            { question: "a)", attendu: "10000" },
            { question: "b)", attendu: "1000000" },
            { question: "c)", attendu: "10000" },
          ],
          correction:
            "On cherche un produit de bases qui donne $10$ ou $100$ : le calcul devient simple.\na) $2^4 \\times 5^4 = (2 \\times 5)^4 = 10^4 = 10\\,000$.\nb) $4^3 \\times 25^3 = (4 \\times 25)^3 = 100^3 = 1\\,000\\,000$.\nc) $5^2 \\times 20^2 = (5 \\times 20)^2 = 100^2 = 10\\,000$.\n⭐ Calculer $25^3$ à la main prend du temps. Regrouper d'abord, c'est l'astuce de cette règle.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Écrire sans parenthèses.\na) $(3x)^2$\nb) $(2x)^3$\nc) $(5a)^2$\nd) $(10t)^3$",
          reponses: [
            { question: "a)", attendu: "9x^2", exact: true },
            { question: "b)", attendu: "8x^3", exact: true },
            { question: "c)", attendu: "25a^2", exact: true },
            { question: "d)", attendu: "1000t^3", exact: true },
          ],
          correction:
            "$3x$, c'est $3 \\times x$ : un produit. L'exposant va sur le nombre ET sur la lettre.\na) $(3x)^2 = 3^2 \\times x^2 = 9x^2$.\nb) $(2x)^3 = 2^3 \\times x^3 = 8x^3$.\nc) $(5a)^2 = 5^2 \\times a^2 = 25a^2$.\nd) $(10t)^3 = 10^3 \\times t^3 = 1\\,000t^3$.\n⛔ Le piège : écrire $(3x)^2 = 3x^2$. C'est l'erreur la plus fréquente : le $3$ a été oublié.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Calculer. Donner le résultat sous forme d'une fraction.\na) $\\left(\\dfrac{2}{3}\\right)^3$\nb) $\\left(\\dfrac{1}{2}\\right)^4$\nc) $\\left(\\dfrac{3}{5}\\right)^2$\nd) $\\left(\\dfrac{5}{2}\\right)^2$",
          reponses: [
            { question: "a)", attendu: "8/27" },
            { question: "b)", attendu: "1/16" },
            { question: "c)", attendu: "9/25" },
            { question: "d)", attendu: "25/4" },
          ],
          correction:
            "L'exposant va en haut ET en bas.\na) $\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{2^3}{3^3} = \\dfrac{8}{27}$.\nb) $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1^4}{2^4} = \\dfrac{1}{16}$.\nc) $\\left(\\dfrac{3}{5}\\right)^2 = \\dfrac{3^2}{5^2} = \\dfrac{9}{25}$.\nd) $\\left(\\dfrac{5}{2}\\right)^2 = \\dfrac{5^2}{2^2} = \\dfrac{25}{4}$.\n⛔ Deux pièges au a) : $\\dfrac{8}{3}$ (le bas a été oublié) et $\\dfrac{6}{9}$ (on a multiplié par $3$ au lieu d'élever à la puissance $3$).",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Écrire avec un seul exposant, sous la forme $\\left(\\dfrac{a}{b}\\right)^n$.\na) $\\dfrac{5^3}{2^3}$\nb) $\\dfrac{7^2}{3^2}$\nc) $\\dfrac{9^4}{10^4}$",
          reponses: [
            { question: "a)", attendu: "(5/2)^3", exact: true },
            { question: "b)", attendu: "(7/3)^2", exact: true },
            { question: "c)", attendu: "(9/10)^4", exact: true },
          ],
          correction:
            "On lit la règle dans l'autre sens : même exposant en haut et en bas, on le garde, et on écrit le quotient des bases.\na) $\\dfrac{5^3}{2^3} = \\left(\\dfrac{5}{2}\\right)^3$.\nb) $\\dfrac{7^2}{3^2} = \\left(\\dfrac{7}{3}\\right)^2$.\nc) $\\dfrac{9^4}{10^4} = \\left(\\dfrac{9}{10}\\right)^4$.\n⛔ Le piège : soustraire les exposants ($5^{3-3}$). On ne soustrait que si les BASES sont égales. Ici, $5$ et $2$ sont différents.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Calculer sans calculatrice, en divisant d'abord les bases.\na) $\\dfrac{15^2}{5^2}$\nb) $\\dfrac{12^3}{4^3}$\nc) $\\dfrac{20^4}{10^4}$",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "27" },
            { question: "c)", attendu: "16" },
          ],
          correction:
            "Même exposant : on divise d'abord les bases, le calcul devient simple.\na) $\\dfrac{15^2}{5^2} = \\left(\\dfrac{15}{5}\\right)^2 = 3^2 = 9$.\nb) $\\dfrac{12^3}{4^3} = \\left(\\dfrac{12}{4}\\right)^3 = 3^3 = 27$.\nc) $\\dfrac{20^4}{10^4} = \\left(\\dfrac{20}{10}\\right)^4 = 2^4 = 16$.\n⛔ Le piège : répondre $3$ au a). On a divisé les bases, mais l'exposant reste à appliquer.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Calculer sans calculatrice. Donner l'écriture décimale.\na) $0{,}5^2$\nb) $0{,}2^3$\nc) $1{,}5^2$\nd) $0{,}1^4$",
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,008" },
            { question: "c)", attendu: "2,25" },
            { question: "d)", attendu: "0,0001" },
          ],
          correction:
            "L'exposant compte les facteurs, comme pour un entier.\na) $0{,}5^2 = 0{,}5 \\times 0{,}5 = 0{,}25$.\nb) $0{,}2^3 = 0{,}2 \\times 0{,}2 \\times 0{,}2 = 0{,}008$.\nc) $1{,}5^2 = 1{,}5 \\times 1{,}5 = 2{,}25$.\nd) $0{,}1^4 = 0{,}1 \\times 0{,}1 \\times 0{,}1 \\times 0{,}1 = 0{,}000\\,1$.\n⛔ Le piège : $0{,}5^2 = 1$. On a multiplié par $2$ au lieu d'écrire deux facteurs.\n⭐ Entre $0$ et $1$, élever à une puissance rend le nombre plus PETIT : $0{,}25$ est plus petit que $0{,}5$.",
          micros: ["puiss_meme_exposant"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à la suite. On regroupe d'abord, on calcule ensuite.",
      rappel: [
        "EXPOSANT NÉGATIF : $\\left(\\dfrac{a}{b}\\right)^{-n} = \\left(\\dfrac{b}{a}\\right)^n$. On retourne la fraction, et l'exposant devient positif.",
        "SIGNE : avec une base négative, un exposant PAIR donne un résultat positif, un exposant IMPAIR un résultat négatif.",
        "MÊME EXPOSANT partout : on regroupe les bases sous cet exposant, on simplifie, puis on calcule.",
      ],
      exercices: [
        {
          enonce: "Écrire sous forme d'une fraction, sans exposant négatif.\na) $\\left(\\dfrac{2}{3}\\right)^{-1}$\nb) $\\left(\\dfrac{2}{3}\\right)^{-2}$\nc) $\\left(\\dfrac{1}{5}\\right)^{-2}$\nd) $\\left(\\dfrac{3}{4}\\right)^{-3}$",
          reponses: [
            { question: "a)", attendu: "3/2" },
            { question: "b)", attendu: "9/4" },
            { question: "c)", attendu: "25" },
            { question: "d)", attendu: "64/27" },
          ],
          correction:
            "Un exposant négatif donne l'inverse : on retourne la fraction, et l'exposant devient positif.\na) $\\left(\\dfrac{2}{3}\\right)^{-1} = \\dfrac{3}{2}$.\nb) $\\left(\\dfrac{2}{3}\\right)^{-2} = \\left(\\dfrac{3}{2}\\right)^2 = \\dfrac{9}{4}$.\nc) $\\left(\\dfrac{1}{5}\\right)^{-2} = 5^2 = 25$.\nd) $\\left(\\dfrac{3}{4}\\right)^{-3} = \\left(\\dfrac{4}{3}\\right)^3 = \\dfrac{64}{27}$.\n⛔ Le piège : un résultat négatif. Le signe moins de l'exposant ne rend pas le nombre négatif : les quatre résultats sont positifs.",
          micros: ["puiss_meme_exposant", "puiss_exposant_negatif"],
        },
        {
          enonce: "Calculer. Attention au signe.\na) $\\left(-\\dfrac{2}{3}\\right)^2$\nb) $\\left(-\\dfrac{2}{3}\\right)^3$\nc) $\\left(-\\dfrac{1}{2}\\right)^4$\nd) $\\left(-\\dfrac{1}{2}\\right)^5$",
          reponses: [
            { question: "a)", attendu: "4/9" },
            { question: "b)", attendu: "-8/27" },
            { question: "c)", attendu: "1/16" },
            { question: "d)", attendu: "-1/32" },
          ],
          correction:
            "Le signe moins est dans la parenthèse : il est multiplié autant de fois que l'exposant le dit.\na) Exposant $2$, pair : le résultat est positif. $\\left(-\\dfrac{2}{3}\\right)^2 = \\dfrac{4}{9}$.\nb) Exposant $3$, impair : le résultat est négatif. $\\left(-\\dfrac{2}{3}\\right)^3 = -\\dfrac{8}{27}$.\nc) Exposant $4$, pair. $\\left(-\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$.\nd) Exposant $5$, impair. $\\left(-\\dfrac{1}{2}\\right)^5 = -\\dfrac{1}{32}$.\n⛔ Le piège : garder le signe moins partout. On traite le signe d'abord, la fraction ensuite.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Écrire sans parenthèses, avec $x \\neq 0$.\na) $\\left(3x^2\\right)^2$\nb) $\\left(2x^3\\right)^3$\nc) $\\left(\\dfrac{x}{2}\\right)^3$\nd) $\\left(\\dfrac{3}{x}\\right)^2$",
          reponses: [
            { question: "a)", attendu: "9x^4", exact: true },
            { question: "b)", attendu: "8x^9", exact: true },
            { question: "c)", attendu: "x^3/8", exact: true },
            { question: "d)", attendu: "9/x^2", exact: true },
          ],
          correction:
            "L'exposant va sur chaque morceau. Sur une puissance, on multiplie les exposants.\na) $\\left(3x^2\\right)^2 = 3^2 \\times \\left(x^2\\right)^2 = 9x^4$.\nb) $\\left(2x^3\\right)^3 = 2^3 \\times \\left(x^3\\right)^3 = 8x^9$.\nc) $\\left(\\dfrac{x}{2}\\right)^3 = \\dfrac{x^3}{2^3} = \\dfrac{x^3}{8}$.\nd) $\\left(\\dfrac{3}{x}\\right)^2 = \\dfrac{3^2}{x^2} = \\dfrac{9}{x^2}$.\n⭐ On vérifie le a) en remplaçant $x$ par $2$ : $\\left(3 \\times 4\\right)^2 = 144$, et $9 \\times 2^4 = 144$. ✓\n⛔ Le piège au a) : $9x^3$. On a additionné $2$ et $1$, alors que $\\left(x^2\\right)^2 = x^4$.",
          micros: ["puiss_meme_exposant", "puiss_puissance_puissance"],
        },
        {
          enonce: "Calculer sans calculatrice, en regroupant d'abord les bases.\n$A = \\dfrac{6^4 \\times 5^4}{10^4}$\n$B = \\dfrac{14^3}{2^3 \\times 7^3}$\n$C = \\left(\\dfrac{2}{3}\\right)^5 \\times \\left(\\dfrac{3}{2}\\right)^5$\n$D = \\left(\\dfrac{3}{4}\\right)^2 \\times 4^2$",
          reponses: [
            { question: "A", attendu: "81" },
            { question: "B", attendu: "1" },
            { question: "C", attendu: "1" },
            { question: "D", attendu: "9" },
          ],
          correction:
            "Le même exposant est partout : on met tout sous cet exposant, et on simplifie dans la parenthèse.\n$A = \\left(\\dfrac{6 \\times 5}{10}\\right)^4 = 3^4 = 81$.\n$B = \\left(\\dfrac{14}{2 \\times 7}\\right)^3 = 1^3 = 1$.\n$C = \\left(\\dfrac{2}{3} \\times \\dfrac{3}{2}\\right)^5 = 1^5 = 1$. Une fraction multipliée par son inverse donne $1$.\n$D = \\left(\\dfrac{3}{4} \\times 4\\right)^2 = 3^2 = 9$.\n⛔ Le piège : calculer $6^4 = 1\\,296$, puis le reste. C'est juste, mais long, et l'erreur arrive vite.",
          micros: ["puiss_meme_exposant", "puiss_expression_composee"],
        },
        {
          enonce: "Donner le résultat sous forme d'une fraction irréductible.\n$E = \\left(\\dfrac{2}{3}\\right)^3 \\times \\left(\\dfrac{9}{4}\\right)^3$\n$F = \\left(\\dfrac{5}{6}\\right)^2 \\div \\left(\\dfrac{5}{3}\\right)^2$",
          reponses: [
            { question: "E", attendu: "27/8", exact: true },
            { question: "F", attendu: "1/4", exact: true },
          ],
          correction:
            "$E$ : même exposant, on multiplie les fractions dans la parenthèse. $\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}$.\nDonc $E = \\left(\\dfrac{3}{2}\\right)^3 = \\dfrac{27}{8}$.\n$F$ : même exposant, on divise les fractions dans la parenthèse. $\\dfrac{5}{6} \\div \\dfrac{5}{3} = \\dfrac{5}{6} \\times \\dfrac{3}{5} = \\dfrac{15}{30} = \\dfrac{1}{2}$.\nDonc $F = \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4}$.\n⛔ Le piège : calculer les quatre puissances d'abord. On tombe sur $\\dfrac{8}{27} \\times \\dfrac{729}{64}$ : c'est juste, mais on simplifie bien plus tard, avec de grands nombres.",
          schema: tableau("E et F par étages", ["forme", "vaut"], [
            { label: "E", values: ["(3/2)³", "27/8"] },
            { label: "F", values: ["(1/2)²", "1/4"] },
          ]),
          micros: ["puiss_meme_exposant", "puiss_expression_composee"],
        },
        {
          enonce: "Un élève a écrit quatre égalités fausses. Pour chacune, trouver l'erreur puis donner le bon résultat.\na) $(2 + 3)^2 = 2^2 + 3^2 = 13$\nb) $\\left(\\dfrac{2}{5}\\right)^3 = \\dfrac{8}{5}$\nc) $(3x)^2 = 3x^2$\nd) $2^3 \\times 5^3 = 10^6$",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "8/125" },
            { question: "c)", attendu: "9x^2", exact: true },
            { question: "d)", attendu: ["10^3", "1000"] },
          ],
          correction:
            "a) Dans la parenthèse, c'est une SOMME : aucune règle. On calcule d'abord la parenthèse : $(2 + 3)^2 = 5^2 = 25$, et non $13$.\nb) Le bas a été oublié. $\\left(\\dfrac{2}{5}\\right)^3 = \\dfrac{2^3}{5^3} = \\dfrac{8}{125}$.\nc) Le $3$ a été oublié. $(3x)^2 = 3^2 \\times x^2 = 9x^2$.\nd) Il a multiplié les bases ET additionné les exposants. Même exposant : on le garde. $2^3 \\times 5^3 = 10^3 = 1\\,000$.\n⭐ Avant d'appliquer une règle, on nomme l'opération dans la parenthèse. Un produit ou un quotient : l'exposant va sur chaque morceau. Une somme : on calcule.",
          micros: ["puiss_meme_exposant"],
        },
        {
          enonce: "Écrire avec les nombres premiers $2$ et $3$ uniquement.\na) $12^5$, sous la forme $2^p \\times 3^q$\nb) $18^3$, sous la forme $2^p \\times 3^q$\nc) $\\left(\\dfrac{8}{9}\\right)^2$, sous la forme $\\dfrac{2^p}{3^q}$",
          reponses: [
            { question: "a)", attendu: "2^10 × 3^5", exact: true },
            { question: "b)", attendu: "2^3 × 3^6", exact: true },
            { question: "c)", attendu: "2^6/3^4", exact: true },
          ],
          correction:
            "On décompose d'abord la base. Puis l'exposant va sur chaque facteur.\na) $12 = 2^2 \\times 3$, donc $12^5 = \\left(2^2\\right)^5 \\times 3^5 = 2^{10} \\times 3^5$.\nb) $18 = 2 \\times 3^2$, donc $18^3 = 2^3 \\times \\left(3^2\\right)^3 = 2^3 \\times 3^6$.\nc) $8 = 2^3$ et $9 = 3^2$, donc $\\left(\\dfrac{8}{9}\\right)^2 = \\dfrac{\\left(2^3\\right)^2}{\\left(3^2\\right)^2} = \\dfrac{2^6}{3^4}$.\n⛔ Le piège au a) : $2^2 \\times 3^5$. Le $2^2$ est aussi sous l'exposant $5$ : il devient $2^{10}$.",
          micros: ["puiss_meme_exposant", "puiss_puissance_puissance"],
        },
        {
          enonce: "Une graphiste réduit une affiche : à chaque réduction, les longueurs sont multipliées par $\\dfrac{3}{4}$.\na) Par quelle fraction les longueurs sont-elles multipliées après $2$ réductions ?\nb) Et après $3$ réductions ?\nc) Ranger $\\dfrac{3}{4}$, $\\dfrac{9}{16}$ et $\\dfrac{27}{64}$ du plus petit au plus grand.\nd) Quand les longueurs sont multipliées par $k$, l'aire est multipliée par $k^2$. Par quelle fraction l'aire est-elle multipliée après $2$ réductions ?",
          reponses: [
            { question: "a)", attendu: "9/16" },
            { question: "b)", attendu: "27/64" },
            { question: "c)", attendu: "27/64 < 9/16 < 3/4", ordre: true },
            { question: "d)", attendu: "81/256" },
          ],
          correction:
            "a) On multiplie deux fois par $\\dfrac{3}{4}$ : $\\left(\\dfrac{3}{4}\\right)^2 = \\dfrac{9}{16}$.\nb) Trois fois : $\\left(\\dfrac{3}{4}\\right)^3 = \\dfrac{27}{64}$.\nc) On met tout sur $64$ : $\\dfrac{3}{4} = \\dfrac{48}{64}$ et $\\dfrac{9}{16} = \\dfrac{36}{64}$. Donc $\\dfrac{27}{64} < \\dfrac{9}{16} < \\dfrac{3}{4}$.\nd) Ici $k = \\dfrac{9}{16}$, donc l'aire est multipliée par $\\left(\\dfrac{9}{16}\\right)^2 = \\dfrac{81}{256}$. Il reste moins du tiers de l'affiche.\n⭐ Une fraction plus petite que $1$ diminue quand l'exposant augmente : chaque réduction rapetisse encore.\n⛔ Le piège : multiplier par $2$ pour « deux réductions » et écrire $\\dfrac{6}{8}$.",
          schema: tableau("Les longueurs, après chaque réduction", ["part", "≈"], [
            { label: "1 fois", values: ["3/4", "0,75"] },
            { label: "2 fois", values: ["9/16", "0,56"] },
            { label: "3 fois", values: ["27/64", "0,42"] },
          ]),
          micros: ["puiss_meme_exposant"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. On repère la puissance, et on conclut par une phrase.",
      rappel: [
        "AGRANDIR OU RÉDUIRE : si les longueurs sont multipliées par $k$, les aires le sont par $k^2$ et les volumes par $k^3$.",
        "RÉPÉTER : multiplier $n$ fois par la même fraction, c'est multiplier par sa puissance $n$.",
        "On conclut par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "La maquette de l'architecte",
          enonce: "Une architecte construit la maquette d'un gymnase à l'échelle $\\dfrac{1}{50}$. La façade du gymnase mesure $400$ m² et son volume est de $10\\,000$ m³.\na) Par quelle fraction les aires sont-elles multipliées sur la maquette ?\nb) Par quelle fraction les volumes sont-ils multipliés ?\nc) Quelle est l'aire de la façade de la maquette, en m² ?\nd) Quel est le volume de la maquette, en m³ ?",
          reponses: [
            { question: "a)", attendu: "1/2500" },
            { question: "b)", attendu: "1/125000" },
            { question: "c)", attendu: "0,16 m²" },
            { question: "d)", attendu: "0,08 m³" },
          ],
          correction:
            "a) Les longueurs sont multipliées par $\\dfrac{1}{50}$, donc les aires par $\\left(\\dfrac{1}{50}\\right)^2 = \\dfrac{1}{2\\,500}$.\nb) Les volumes par $\\left(\\dfrac{1}{50}\\right)^3 = \\dfrac{1}{125\\,000}$.\nc) $400 \\times \\dfrac{1}{2\\,500} = 0{,}16$. La façade de la maquette mesure $0{,}16$ m².\nd) $10\\,000 \\times \\dfrac{1}{125\\,000} = 0{,}08$. Le volume de la maquette est de $0{,}08$ m³, soit $80$ litres.\n⛔ Le piège : diviser l'aire par $50$. Seules les longueurs sont divisées par $50$. Une aire a deux dimensions, un volume en a trois.",
          micros: ["puiss_meme_exposant"],
        },
        {
          titre: "Les lancers francs",
          enonce: "Une basketteuse réussit un lancer franc avec une probabilité de $\\dfrac{4}{5}$. On admet que ses lancers sont indépendants : on multiplie alors les probabilités.\na) Quelle est la probabilité qu'elle réussisse ses $3$ prochains lancers ?\nb) Quelle est la probabilité qu'elle manque ses $3$ prochains lancers ?\nc) À partir de combien de lancers la probabilité de tous les réussir passe-t-elle sous $\\dfrac{1}{2}$ ?",
          reponses: [
            { question: "a)", attendu: "64/125" },
            { question: "b)", attendu: "1/125" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) On multiplie trois fois par $\\dfrac{4}{5}$ : $\\left(\\dfrac{4}{5}\\right)^3 = \\dfrac{64}{125}$, soit $0{,}512$.\nb) Elle manque un lancer avec une probabilité de $1 - \\dfrac{4}{5} = \\dfrac{1}{5}$. Donc $\\left(\\dfrac{1}{5}\\right)^3 = \\dfrac{1}{125}$, soit $0{,}008$.\nc) Pour $3$ lancers, on a $0{,}512$ : c'est encore au-dessus de $\\dfrac{1}{2}$.\nPour $4$ lancers : $\\left(\\dfrac{4}{5}\\right)^4 = \\dfrac{256}{625} = 0{,}409\\,6$ : c'est en dessous.\nLa probabilité passe sous $\\dfrac{1}{2}$ à partir de $4$ lancers.\n⭐ Même une très bonne tireuse a moins d'une chance sur deux de réussir $4$ lancers de suite.\n⛔ Le piège : calculer $3 \\times \\dfrac{4}{5} = \\dfrac{12}{5}$. Une probabilité ne dépasse jamais $1$ : ce résultat doit alerter.",
          micros: ["puiss_meme_exposant"],
        },
        {
          titre: "La canette du soir",
          enonce: "Une canette de boisson énergisante contient environ $80$ mg de caféine. On prend un modèle simple : toutes les $5$ heures, la moitié de la caféine présente dans le corps est éliminée.\na) Quelle fraction de la caféine reste-t-il au bout de $15$ heures ?\nb) Combien de milligrammes cela fait-il ?\nc) Quelle fraction reste-t-il au bout de $20$ heures ?\nd) Léa boit une canette à $17$ h. Combien de caféine reste-t-il dans son corps à $22$ h, quand elle se couche ?",
          reponses: [
            { question: "a)", attendu: "1/8" },
            { question: "b)", attendu: "10 mg" },
            { question: "c)", attendu: "1/16" },
            { question: "d)", attendu: "40 mg" },
          ],
          correction:
            "a) En $15$ heures, il y a $3$ périodes de $5$ heures. On multiplie donc trois fois par $\\dfrac{1}{2}$ : $\\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$.\nb) $80 \\times \\dfrac{1}{8} = 10$. Il reste $10$ mg de caféine au bout de $15$ heures.\nc) En $20$ heures, il y a $4$ périodes : $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$.\nd) De $17$ h à $22$ h, il y a $5$ heures, soit une période : $80 \\times \\dfrac{1}{2} = 40$. Il reste $40$ mg de caféine à l'heure du coucher : la moitié de la canette.\n⛔ Le piège : compter $15$ périodes au a). L'exposant compte les périodes de $5$ heures, pas les heures.\n⭐ Le vrai temps d'élimination varie beaucoup d'une personne à l'autre : un modèle simple donne un ordre de grandeur, pas une mesure.",
          micros: ["puiss_meme_exposant"],
        },
        {
          titre: "Combien de Lunes dans la Terre ?",
          enonce: "Le rayon de la Lune vaut environ $\\dfrac{3}{11}$ du rayon de la Terre. L'aire d'une sphère de rayon $r$ est $4\\pi r^2$, son volume est $\\dfrac{4}{3}\\pi r^3$.\na) Par quelle fraction faut-il multiplier l'aire de la Terre pour obtenir celle de la Lune ?\nb) Et pour le volume ?\nc) Combien de Lunes faudrait-il, environ, pour avoir le volume de la Terre ? Arrondir à l'unité.",
          reponses: [
            { question: "a)", attendu: "9/121" },
            { question: "b)", attendu: "27/1331" },
            { question: "c)", attendu: "49" },
          ],
          correction:
            "a) On compare les deux aires. $4\\pi$ se simplifie, il reste le quotient des carrés des rayons : $\\left(\\dfrac{3}{11}\\right)^2 = \\dfrac{9}{121}$.\nb) De même, $\\dfrac{4}{3}\\pi$ se simplifie : $\\left(\\dfrac{3}{11}\\right)^3 = \\dfrac{27}{1\\,331}$.\nc) Le volume de la Terre vaut $\\dfrac{1\\,331}{27}$ fois celui de la Lune, et $1\\,331 \\div 27 \\approx 49{,}3$.\nIl faudrait environ $49$ Lunes pour avoir le volume de la Terre.\n⭐ Le rayon de la Terre n'est qu'environ $3{,}7$ fois plus grand, mais son volume est environ $49$ fois plus grand : le cube amplifie tout.\n⛔ Le piège : répondre $\\dfrac{11}{3}$, soit moins de $4$ Lunes. C'est le rapport des rayons, pas celui des volumes.",
          micros: ["puiss_meme_exposant"],
        },
      ],
    },
  ],
};
