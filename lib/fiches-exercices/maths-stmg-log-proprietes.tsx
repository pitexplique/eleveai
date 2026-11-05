// ─── Fiche d'exercices : propriétés du logarithme décimal (STMG, Tle) — 20 exercices
//
// Notion log_proprietes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/logarithme.bank.ts`). Le coach demande :
// log(ab) = log(a) + log(b) (identité, puis calcul avec un TABLEAU de valeurs),
// log(a/b) = log(a) − log(b) (sur des puissances de 10, et repérer l'erreur
// log(a)/log(b)), log(aⁿ) = n log(a) (dans les deux sens : faire remonter le
// facteur), log(1/b) = −log(b). Logarithme DÉCIMAL seulement, jamais ln.
// Comme dans le coach, un tableau donne les valeurs de log, arrondies au
// dix-millième ; les réponses se donnent au millième, sauf quand l'énoncé dit autre chose.
//
// ⛔ LES RÉPONSES « CALCULE log(…) » sont en `exact`, avec les deux écritures du
// tableau et de la calculatrice : avec une tolérance, l'élève qui recopiait
// log(14) avait juste. Ex. 11 b) : 0,2544 par le tableau, 0,2543 à la calculatrice.
//
// ⭐ DES RÉFÉRENCES RÉELLES, aucune statistique :
//   · ex. 10 — gain d'un amplificateur en décibels : G = 10 × log(r), définition
//     usuelle du décibel en télécommunications.
//   · ex. 17 — relation de Pogson entre magnitudes : m₂ − m₁ = 2,5 × log(E₁ ÷ E₂).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; gestion (contrôleuse de gestion),
// télécommunications (technicien), banque (conseillère), électronique (ingénieur),
// assurance (actuaire), tutorat (tuteur), jeu vidéo (développeuse), photographie
// (photographe), astronomie (astronome), nature (garde d'un parc), cybersécurité
// (analyste), concours (préparateur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-logarithme.mjs`.
//
// Micro-compétences : logT_produit (1, 2, 10, 12, 16, 18, 20), logT_quotient
// (3, 4, 9, 14, 17, 19, 20), logT_puissance (5, 6, 11, 15, 18, 19, 20),
// logT_inverse (7, 8, 13, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesLogProprietesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "log-proprietes",
  titre: "Propriétés du logarithme décimal",
  accroche:
    "Vingt exercices pour faire travailler les quatre règles du logarithme : le produit devient une somme, le quotient une différence, l'exposant descend devant, l'inverse change le signe. Un tableau de valeurs à lire, le gain d'un amplificateur, la magnitude des étoiles, un code secret, une population de bouquetins. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître la règle, l'écrire, ou calculer avec le tableau.",
      rappel: [
        "Le produit devient une somme : $\\log(a \\times b) = \\log(a) + \\log(b)$.",
        "Le quotient devient une différence : $\\log\\left(\\dfrac{a}{b}\\right) = \\log(a) - \\log(b)$.",
        "L'exposant descend devant : $\\log(a^n) = n\\log(a)$.",
        "L'inverse change le signe : $\\log\\left(\\dfrac{1}{b}\\right) = -\\log(b)$. Ici, $a$ et $b$ sont strictement positifs.",
      ],
      exercices: [
        {
          enonce: "Écris $\\log(7 \\times 12)$ sous la forme d'une somme de deux logarithmes.",
          reponses: [{ attendu: ["log(7)+log(12)", "log(12)+log(7)", "log7+log12", "log12+log7"], exact: true }],
          correction:
            "Le logarithme transforme un produit en somme.\n$\\log(7 \\times 12) = \\log(7) + \\log(12)$.\n⛔ Le piège : écrire $\\log(7) \\times \\log(12)$. Le produit disparaît justement : il devient une somme.\nRéponse : $\\log(7) + \\log(12)$.",
          micros: ["logT_produit"],
        },
        {
          enonce:
            "À l'aide du tableau, calcule $\\log(14)$, arrondi au millième. Le tableau ne donne pas directement $\\log(14)$ : décompose 14 en produit.",
          figure: grille(["x", "2", "3", "5", "7"], [["log(x)", "0,3010", "0,4771", "0,6990", "0,8451"]]),
          reponses: [{ attendu: ["1,146", "1,1461"], exact: true }],
          correction:
            "$14 = 2 \\times 7$, deux nombres du tableau.\n$\\log(14) = \\log(2) + \\log(7) \\approx 0{,}3010 + 0{,}8451 = 1{,}1461$.\nAu millième : 1,146.\n⛔ Le piège : multiplier les deux valeurs ($0{,}3010 \\times 0{,}8451$). Il faut les ajouter.\nRéponse : $\\log(14) \\approx 1{,}146$.",
          micros: ["logT_produit"],
        },
        {
          enonce:
            "En utilisant la règle du quotient, calcule $\\log\\left(\\dfrac{100\\,000}{100}\\right)$.",
          reponses: [{ attendu: "3", exact: true }],
          correction:
            "Le quotient devient une différence : $\\log(100\\,000) - \\log(100)$.\n$\\log(100\\,000) = 5$ et $\\log(100) = 2$.\n$5 - 2 = 3$.\n⛔ Le piège : diviser les logarithmes ($5 \\div 2 = 2{,}5$). Un quotient donne une différence, pas un quotient de logarithmes.\nRéponse : 3.",
          micros: ["logT_quotient"],
        },
        {
          enonce: "Écris $\\log\\left(\\dfrac{20}{7}\\right)$ sous la forme d'une différence de deux logarithmes.",
          reponses: [{ attendu: ["log(20)-log(7)", "log20-log7"], exact: true }],
          correction:
            "Le logarithme du haut, moins le logarithme du bas.\n$\\log\\left(\\dfrac{20}{7}\\right) = \\log(20) - \\log(7)$.\n⛔ Le piège : inverser et écrire $\\log(7) - \\log(20)$. L'ordre compte : le numérateur vient d'abord.\nRéponse : $\\log(20) - \\log(7)$.",
          micros: ["logT_quotient"],
        },
        {
          enonce: "Fais descendre l'exposant : écris $\\log(1{,}05^{12})$ sous la forme $n\\log(a)$.",
          reponses: [{ attendu: ["12log(1,05)", "12*log(1,05)", "log(1,05)*12", "12log1,05", "12*log1,05"], exact: true }],
          correction:
            "L'exposant descend devant le logarithme et devient un facteur.\n$\\log(1{,}05^{12}) = 12\\log(1{,}05)$.\n⛔ Le piège : écrire $1{,}05\\log(12)$. C'est l'exposant qui descend, pas la base.\nRéponse : $12\\log(1{,}05)$.",
          micros: ["logT_puissance"],
        },
        {
          enonce: "À l'aide du tableau, calcule $\\log(3^4)$, arrondi au millième.",
          figure: grille(["x", "2", "3", "4"], [["log(x)", "0,3010", "0,4771", "0,6021"]]),
          reponses: [{ attendu: ["1,908", "1,9084"], exact: true }],
          correction:
            "L'exposant descend : $\\log(3^4) = 4\\log(3)$.\nOn lit $\\log(3) \\approx 0{,}4771$ dans le tableau.\n$4 \\times 0{,}4771 = 1{,}9084$. Au millième : 1,908.\n⛔ Le piège : lire $\\log(4)$ dans le tableau. Le 4 est l'exposant : on prend le logarithme de la base, 3.\nRéponse : $\\log(3^4) \\approx 1{,}908$.",
          micros: ["logT_puissance"],
        },
        {
          enonce: "Sachant que $\\log(1\\,000) = 3$, que vaut $\\log\\left(\\dfrac{1}{1\\,000}\\right)$ ?",
          reponses: [{ attendu: "-3", exact: true }],
          correction:
            "L'inverse change le signe : $\\log\\left(\\dfrac{1}{b}\\right) = -\\log(b)$.\nDonc $\\log\\left(\\dfrac{1}{1\\,000}\\right) = -3$.\n⛔ Le piège : répondre $\\dfrac{1}{3}$. On change le signe du logarithme, on ne l'inverse pas.\nRéponse : −3.",
          micros: ["logT_inverse"],
        },
        {
          enonce:
            "À l'aide du tableau, calcule $\\log(0{,}5)$, arrondi au millième. Remarque : $0{,}5 = \\dfrac{1}{2}$.",
          figure: grille(["x", "2", "4", "5"], [["log(x)", "0,3010", "0,6021", "0,6990"]]),
          reponses: [{ attendu: ["-0,301", "-0,3010"], exact: true }],
          correction:
            "$0{,}5 = \\dfrac{1}{2}$, donc $\\log(0{,}5) = -\\log(2)$.\nOn lit $\\log(2) \\approx 0{,}3010$ : $\\log(0{,}5) \\approx -0{,}301$.\nLe résultat est négatif, comme pour tout nombre entre 0 et 1.\n⛔ Le piège : oublier le signe moins, ou lire $\\log(5)$ à cause du chiffre 5.\nRéponse : $\\log(0{,}5) \\approx -0{,}301$.",
          micros: ["logT_inverse"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : trouver quelle règle s'applique, puis calculer.",
      rappel: [
        "Un nombre absent du tableau : on l'écrit comme un produit, un quotient ou une puissance de nombres connus.",
        "Les règles marchent dans les deux sens : $\\log(a) + \\log(b) = \\log(a \\times b)$ et $n\\log(a) = \\log(a^n)$. Si $\\log(x) = \\log(y)$, alors $x = y$.",
        "⛔ $\\log(a + b)$ ne se découpe pas, et $\\log\\left(\\dfrac{a}{b}\\right)$ n'est pas $\\dfrac{\\log(a)}{\\log(b)}$.",
        "$\\log$ est croissante : comparer deux logarithmes, c'est comparer les deux nombres.",
      ],
      exercices: [
        {
          enonce:
            "Une contrôleuse de gestion étudie une entreprise de 200 salariés qui réalise 8 000 k€ de chiffre d'affaires (modèle).\na) Calcule le chiffre d'affaires par salarié, en k€.\nb) Écris $\\log\\left(\\dfrac{8\\,000}{200}\\right)$ sous la forme d'une différence de deux logarithmes.\nc) À l'aide du tableau, calcule cette différence, arrondie au millième.",
          figure: grille(["x", "200", "800", "8 000", "20 000"], [["log(x)", "2,3010", "2,9031", "3,9031", "4,3010"]]),
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: ["log(8000)-log(200)", "log8000-log200"], exact: true },
            { question: "c)", attendu: ["1,602", "1,6021"], exact: true },
          ],
          correction:
            "a) $8\\,000 \\div 200 = 40$ k€ par salarié.\nb) Le quotient devient une différence : $\\log(8\\,000) - \\log(200)$.\nc) $3{,}9031 - 2{,}3010 = 1{,}6021$, soit 1,602 au millième. C'est $\\log(40)$.\n⛔ Le piège au c) : diviser $3{,}9031$ par $2{,}3010$. Un logarithme de quotient se calcule par une soustraction.\nRéponse : a) 40 k€ ; b) $\\log(8\\,000) - \\log(200)$ ; c) 1,602.",
          micros: ["logT_quotient"],
        },
        {
          enonce:
            "Un technicien en télécommunications calcule le gain d'un amplificateur : $G = 10 \\times \\log(r)$, en décibels, où $r$ est le nombre par lequel la puissance est multipliée. On donne $\\log(2) \\approx 0{,}3010$.\na) Calcule $G$ quand $r = 100$.\nb) Calcule $G$ quand $r = 20$, en écrivant $20 = 2 \\times 10$. Arrondis au centième.\nc) Il branche les deux à la suite : la puissance est multipliée par $100 \\times 20$. Calcule le gain total, arrondi au centième.",
          reponses: [
            { question: "a)", attendu: "20", exact: true },
            { question: "b)", attendu: "13,01", tolerance: 0.005 },
            { question: "c)", attendu: "33,01", tolerance: 0.005 },
          ],
          correction:
            "a) $\\log(100) = 2$, donc $G = 10 \\times 2 = 20$ dB.\nb) $\\log(20) = \\log(2) + \\log(10) \\approx 0{,}3010 + 1 = 1{,}3010$, donc $G \\approx 13{,}01$ dB.\nc) $\\log(100 \\times 20) = \\log(100) + \\log(20)$ : les gains s'ajoutent. $20 + 13{,}01 = 33{,}01$ dB.\n⛔ Le piège au c) : multiplier les gains ($20 \\times 13{,}01$). C'est justement parce que le produit devient une somme qu'on travaille en décibels.\nRéponse : a) 20 dB ; b) 13,01 dB ; c) 33,01 dB.",
          micros: ["logT_produit"],
        },
        {
          enonce:
            "Une conseillère bancaire étudie un livret à 5 % par an sur 12 ans (modèle) : le capital est multiplié par $1{,}05^{12}$. Le client espère au moins le multiplier par 1,8.\na) Écris $\\log(1{,}05^{12})$ sous la forme $n\\log(a)$.\nb) À l'aide du tableau, calcule-le, arrondi au dix-millième.\nc) Le capital est-il multiplié par au moins 1,8 ? Réponds oui ou non.",
          figure: grille(["x", "1,05", "1,2", "1,8"], [["log(x)", "0,0212", "0,0792", "0,2553"]]),
          reponses: [
            { question: "a)", attendu: ["12log(1,05)", "12*log(1,05)", "log(1,05)*12", "12log1,05", "12*log1,05"], exact: true },
            { question: "b)", attendu: ["0,2544", "0,2543"], exact: true },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) L'exposant descend : $12\\log(1{,}05)$.\nb) $12 \\times 0{,}0212 = 0{,}2544$ (la calculatrice donne $0{,}2543$ : les deux sont acceptés).\nc) On compare les logarithmes : $0{,}2544 < 0{,}2553$, c'est-à-dire $\\log(1{,}05^{12}) < \\log(1{,}8)$. Comme $\\log$ est croissante, $1{,}05^{12} < 1{,}8$ : l'objectif n'est pas atteint.\n⛔ Le piège au c) : comparer $0{,}2544$ à $1{,}8$. On compare deux logarithmes entre eux, ou deux coefficients entre eux, jamais un de chaque.\nRéponse : a) $12\\log(1{,}05)$ ; b) 0,2544 ; c) non.",
          micros: ["logT_puissance"],
        },
        {
          enonce:
            "Un ingénieur en électronique estime qu'une puce contient $7 \\times 10^9$ transistors (modèle). On donne $\\log(7) \\approx 0{,}8451$.\na) Que vaut $\\log(10^9)$ ?\nb) Calcule $\\log(7 \\times 10^9)$, arrondi au millième.",
          reponses: [
            { question: "a)", attendu: "9", exact: true },
            { question: "b)", attendu: ["9,845", "9,8451"], exact: true },
          ],
          correction:
            "a) $\\log(10^9) = 9$.\nb) Le produit devient une somme : $\\log(7 \\times 10^9) = \\log(7) + \\log(10^9) \\approx 0{,}8451 + 9 = 9{,}8451$, soit 9,845.\n⛔ Le piège au b) : multiplier ($0{,}8451 \\times 9$). Un logarithme de produit s'ajoute.\nRéponse : a) 9 ; b) 9,845.",
          micros: ["logT_produit"],
        },
        {
          enonce:
            "Une actuaire travaille sur des probabilités très petites (modèle). Remarque : $0{,}004 = \\dfrac{1}{250}$ et $0{,}25 = \\dfrac{1}{4}$. À l'aide du tableau, calcule, en arrondissant au millième :\na) $\\log(0{,}004)$\nb) $\\log(0{,}25)$",
          figure: grille(["x", "4", "25", "50", "250"], [["log(x)", "0,6021", "1,3979", "1,6990", "2,3979"]]),
          reponses: [
            { question: "a)", attendu: ["-2,398", "-2,3979"], exact: true },
            { question: "b)", attendu: ["-0,602", "-0,6021"], exact: true },
          ],
          correction:
            "L'inverse change le signe : $\\log\\left(\\dfrac{1}{b}\\right) = -\\log(b)$.\na) $\\log(0{,}004) = -\\log(250) \\approx -2{,}3979$, soit $-2{,}398$.\nb) $\\log(0{,}25) = -\\log(4) \\approx -0{,}6021$, soit $-0{,}602$.\n⛔ Le piège : oublier le signe moins. 0,004 et 0,25 sont plus petits que 1 : leur logarithme est forcément négatif.\nRéponse : a) −2,398 ; b) −0,602.",
          micros: ["logT_inverse"],
        },
        {
          enonce:
            "Un tuteur corrige Milo, qui écrit : $\\log\\left(\\dfrac{1\\,000}{10}\\right) = \\dfrac{\\log(1\\,000)}{\\log(10)} = 3$.\na) Calcule la vraie valeur de $\\log\\left(\\dfrac{1\\,000}{10}\\right)$.\nb) L'égalité écrite par Milo est-elle vraie ou fausse ? Écris vrai ou faux.\nc) Calcule de la bonne façon $\\log\\left(\\dfrac{100\\,000}{100}\\right)$.",
          reponses: [
            { question: "a)", attendu: "2", exact: true },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "3", exact: true },
          ],
          correction:
            "a) Le quotient devient une différence : $\\log(1\\,000) - \\log(10) = 3 - 1 = 2$. On vérifie : $1\\,000 \\div 10 = 100 = 10^2$.\nb) Milo a trouvé 3 au lieu de 2 : c'est faux.\nc) $\\log(100\\,000) - \\log(100) = 5 - 2 = 3$.\n⛔ Le piège : transformer le quotient en quotient de logarithmes. Il fallait une différence.\nRéponse : a) 2 ; b) faux ; c) 3.",
          micros: ["logT_quotient"],
        },
        {
          enonce:
            "Dans un jeu vidéo, une développeuse affiche le score sous la forme $\\log(x)$, où $x$ est le nombre de points (modèle). Pour chaque score affiché, trouve $x$.\na) $\\log(x) = 3\\log(5)$\nb) $\\log(x) = 2\\log(7)$\nc) $\\log(x) = 4\\log(2)$",
          reponses: [
            { question: "a)", attendu: "125" },
            { question: "b)", attendu: "49" },
            { question: "c)", attendu: "16" },
          ],
          correction:
            "Un facteur devant $\\log$ remonte en exposant : $n\\log(a) = \\log(a^n)$. Puis $\\log(x) = \\log(y)$ donne $x = y$.\na) $3\\log(5) = \\log(5^3) = \\log(125)$, donc $x = 125$.\nb) $2\\log(7) = \\log(7^2) = \\log(49)$, donc $x = 49$.\nc) $4\\log(2) = \\log(2^4) = \\log(16)$, donc $x = 16$.\n⛔ Le piège au c) : calculer $4 \\times 2 = 8$. Le facteur est un EXPOSANT, pas un coefficient.\nRéponse : a) 125 ; b) 49 ; c) 16.",
          micros: ["logT_puissance"],
        },
        {
          enonce:
            "Une photographe agrandit un tirage 4 fois, puis 25 fois (modèle).\na) Sans calculatrice, calcule $\\log(4) + \\log(25)$.\nb) Par combien le tirage est-il agrandi en tout ?",
          reponses: [
            { question: "a)", attendu: "2", exact: true },
            { question: "b)", attendu: "100" },
          ],
          correction:
            "a) La somme redevient un produit : $\\log(4) + \\log(25) = \\log(4 \\times 25) = \\log(100) = 2$.\nb) Deux agrandissements de suite se multiplient : $4 \\times 25 = 100$.\n⛔ Le piège au b) : ajouter ($4 + 25 = 29$). Ce sont les logarithmes qui s'ajoutent, les coefficients se multiplient.\nRéponse : a) 2 ; b) 100.",
          micros: ["logT_produit"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : plusieurs règles dans le même calcul. On arrondit seulement à la fin de chaque question.",
      rappel: [
        "Quatre règles : produit → somme ; quotient → différence ; exposant → facteur ; inverse → signe moins.",
        "Si $\\log(N) = k + d$, avec $k$ entier et $d$ entre 0 et 1, alors $N$ est entre $10^k$ et $10^{k+1}$.",
        "Pour savoir si un nombre $N$ dépasse un objectif, on peut comparer leurs logarithmes.",
      ],
      exercices: [
        {
          titre: "Les deux étoiles",
          enonce:
            "Une astronome compare deux étoiles, d'éclats $E_1$ et $E_2$ et de magnitudes $m_1$ et $m_2$, par la relation de Pogson : la différence de magnitude vaut $m_2 - m_1 = 2{,}5 \\times \\log\\left(\\dfrac{E_1}{E_2}\\right)$. On donne $\\log(5) \\approx 0{,}6990$ et $\\log(2) \\approx 0{,}3010$.\na) Calcule cette différence quand la première étoile brille 100 fois plus que la seconde : $\\dfrac{E_1}{E_2} = 100$.\nb) Calcule-la quand $\\dfrac{E_1}{E_2} = 1\\,000$.\nc) On écrit $2{,}5 = \\dfrac{5}{2}$. Calcule $\\log(2{,}5)$, arrondi au millième.\nd) Calcule la différence quand $\\dfrac{E_1}{E_2} = 2{,}5$, arrondie à l'unité.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "7,5" },
            { question: "c)", attendu: "0,398", exact: true },
            { question: "d)", attendu: "1", tolerance: 0.5 },
          ],
          correction:
            "a) $\\log(100) = 2$, donc $2{,}5 \\times 2 = 5$.\nb) $\\log(1\\,000) = 3$, donc $2{,}5 \\times 3 = 7{,}5$.\nc) Le quotient devient une différence : $\\log(5) - \\log(2) \\approx 0{,}6990 - 0{,}3010 = 0{,}398$.\nd) $2{,}5 \\times 0{,}398 = 0{,}995$, soit environ 1.\n⛔ Le piège au c) : calculer $0{,}6990 \\div 0{,}3010$. Un logarithme de quotient se calcule par une soustraction.\nRéponse : a) 5 ; b) 7,5 ; c) 0,398 ; d) 1.",
          micros: ["logT_quotient"],
        },
        {
          titre: "Les bouquetins du parc",
          enonce:
            "Une garde de parc suit des bouquetins (modèle) : 500 aujourd'hui, et 20 % de plus chaque année. Dans 10 ans, leur nombre sera $N = 500 \\times 1{,}2^{10}$. Elle veut savoir si $N$ dépassera 3 000. Utilise le tableau et arrondis au millième.\na) Calcule $\\log(500)$, en écrivant $500 = 5 \\times 100$.\nb) Calcule $\\log(1{,}2^{10})$.\nc) Déduis-en $\\log(N)$.\nd) Calcule $\\log(3\\,000)$, en écrivant $3\\,000 = 3 \\times 1\\,000$.\ne) $N$ dépassera-t-il 3 000 ? Réponds oui ou non.",
          figure: grille(["x", "1,2", "3", "5", "6"], [["log(x)", "0,0792", "0,4771", "0,6990", "0,7782"]]),
          reponses: [
            { question: "a)", attendu: "2,699", exact: true },
            { question: "b)", attendu: "0,792", exact: true },
            { question: "c)", attendu: "3,491", exact: true },
            { question: "d)", attendu: ["3,477", "3,4771"], exact: true },
            { question: "e)", attendu: "oui" },
          ],
          correction:
            "a) $\\log(500) = \\log(5) + \\log(100) \\approx 0{,}6990 + 2 = 2{,}699$.\nb) L'exposant descend : $10 \\times \\log(1{,}2) \\approx 10 \\times 0{,}0792 = 0{,}792$.\nc) $\\log(N) = \\log(500) + \\log(1{,}2^{10}) \\approx 2{,}699 + 0{,}792 = 3{,}491$.\nd) $\\log(3\\,000) = \\log(3) + \\log(1\\,000) \\approx 0{,}4771 + 3 = 3{,}4771$, soit 3,477.\ne) $3{,}491 > 3{,}477$ et $\\log$ est croissante, donc $N > 3\\,000$.\n⛔ Le piège au c) : multiplier $2{,}699$ par $0{,}792$. $N$ est un produit : ses logarithmes s'ajoutent.\nRéponse : a) 2,699 ; b) 0,792 ; c) 3,491 ; d) 3,477 ; e) oui.",
          micros: ["logT_produit", "logT_puissance"],
        },
        {
          titre: "Le code secret",
          enonce:
            "Un analyste en cybersécurité compare deux codes (modèle) : un mot de passe de 8 lettres ($26^8$ possibilités) et un code à 4 chiffres ($10^4$ possibilités). On note $Q = \\dfrac{26^8}{10^4}$. On donne $\\log(26) \\approx 1{,}4150$.\na) Calcule $\\log(26^8)$, arrondi au centième.\nb) Que vaut $\\log(10^4)$ ?\nc) Déduis-en $\\log(Q)$, arrondi au centième.\nd) $Q$ est entre $10^k$ et $10^{k+1}$. Donne les deux exposants, du plus petit au plus grand, séparés par un point-virgule.",
          reponses: [
            { question: "a)", attendu: "11,32", exact: true },
            { question: "b)", attendu: "4", exact: true },
            { question: "c)", attendu: "7,32", exact: true },
            { question: "d)", attendu: "7 ; 8", ordre: true },
          ],
          correction:
            "a) L'exposant descend : $8 \\times \\log(26) \\approx 8 \\times 1{,}4150 = 11{,}32$.\nb) $\\log(10^4) = 4$.\nc) Le quotient devient une différence : $\\log(Q) \\approx 11{,}32 - 4 = 7{,}32$.\nd) $7 < 7{,}32 < 8$, donc $Q$ est entre $10^7$ et $10^8$ : le mot de passe offre plus de dix millions de fois plus de possibilités.\n⛔ Le piège au c) : diviser $11{,}32$ par 4. Un logarithme de quotient se soustrait.\nRéponse : a) 11,32 ; b) 4 ; c) 7,32 ; d) 7 ; 8.",
          micros: ["logT_puissance", "logT_quotient"],
        },
        {
          titre: "Le quiz du concours",
          enonce:
            "Un préparateur de concours propose cinq égalités. Réponds vrai ou faux à chacune.\na) $\\log(2 + 3) = \\log(2) + \\log(3)$\nb) $\\log(6) = \\log(2) + \\log(3)$\nc) $\\log(2^5) = 5\\log(2)$\nd) $\\log\\left(\\dfrac{1}{7}\\right) = -\\log(7)$\ne) $\\log\\left(\\dfrac{8}{2}\\right) = \\dfrac{\\log(8)}{\\log(2)}$",
          reponses: [
            { question: "a)", attendu: "faux" },
            { question: "b)", attendu: "vrai" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "vrai" },
            { question: "e)", attendu: "faux" },
          ],
          correction:
            "a) La règle concerne les produits, pas les sommes. $\\log(2 + 3) = \\log(5) \\approx 0{,}699$, alors que $\\log(2) + \\log(3) \\approx 0{,}778$ : faux.\nb) $6 = 2 \\times 3$, et le produit devient une somme : vrai.\nc) L'exposant descend : vrai.\nd) L'inverse change le signe : vrai.\ne) $\\log\\left(\\dfrac{8}{2}\\right) = \\log(4) \\approx 0{,}602$, alors que $\\dfrac{\\log(8)}{\\log(2)} = 3$ : faux.\n⛔ Le piège au a) : « découper » un logarithme de somme. $\\log(a + b)$ ne se simplifie pas.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) vrai ; e) faux.",
          micros: ["logT_produit", "logT_quotient", "logT_puissance", "logT_inverse"],
        },
      ],
    },
  ],
};
