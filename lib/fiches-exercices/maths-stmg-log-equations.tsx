// ─── Fiche d'exercices : résoudre aˣ = b avec le logarithme (STMG, Tle) — 20 exercices
//
// Notion log_equations du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/logarithme.bank.ts`). Le coach demande :
// aˣ = b avec un TABLEAU de valeurs (solution arrondie, ou écriture exacte
// log(b) ÷ log(a)), xᵃ = b (l'inconnue en base : une racine, pas de logarithme, et
// une solution entière, comme les gabarits du coach ; le taux moyen a sa propre feuille),
// trier les deux cas, le plus petit entier n tel que aⁿ > b (avec une courbe), et
// aⁿ < c avec 0 < a < 1, où l'inégalité se retourne. Logarithme DÉCIMAL
// seulement, jamais ln.
//
// ⛔ LES ARRONDIS : le tableau donne des valeurs au dix-millième. Quand la base est
// proche de 1, le quotient des valeurs arrondies s'écarte du vrai résultat : on
// demande alors le dixième, ou l'entier, et chaque réponse a été recalculée par
// les DEUX chemins (tableau et calculatrice) dans le script de recalcul. Tolérance :
// une demi-unité du rang demandé, car les deux chemins donnent le même arrondi.
//
// Aucune donnée réelle : toutes les situations sont des modèles (le mot figure
// dans l'énoncé) ou visiblement fictives.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; énergie (responsable d'un parc
// éolien), sport (coach sportive), viticulture (vigneron), santé (infirmier),
// déchets (responsable de la collecte), podcast (créatrice), formation
// (formatrice), boulangerie (boulanger), écologie (technicienne de l'environnement),
// climat (glaciologue), restauration (gérant de food truck), e-sport (organisatrice).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-logarithme.mjs`.
//
// Micro-compétences : logT_resoudre_exponentielle (1, 2, 3, 4, 9, 10, 15, 16, 17, 20),
// logT_resoudre_puissance (5, 6, 7, 11, 15, 20), logT_inequation (8, 9, 10, 12, 13,
// 14, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesLogEquationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "log-equations",
  titre: "Résoudre aˣ = b avec le logarithme",
  accroche:
    "Vingt exercices pour répondre enfin à la question « au bout de combien de temps ? » : l'inconnue est en exposant, le logarithme la fait descendre. Reconnaître où est l'inconnue, écrire la solution exacte, la calculer avec un tableau, trouver le premier entier qui convient, et ne pas se faire piéger quand la grandeur diminue. Un parc éolien, un glacier, un médicament, un tournoi d'e-sport, le levain d'un boulanger. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : regarder où est l'inconnue, puis appliquer la bonne méthode.",
      rappel: [
        "L'inconnue en EXPOSANT, $a^x = b$ : on applique $\\log$ des deux côtés. $x\\log(a) = \\log(b)$, donc $x = \\dfrac{\\log(b)}{\\log(a)}$.",
        "L'inconnue en BASE, $x^a = b$ avec $x > 0$ : pas de logarithme. $x = b^{\\frac{1}{a}}$, c'est-à-dire le nombre qui, élevé à la puissance $a$, donne $b$.",
        "Le plus petit entier $n$ tel que $a^n > b$, avec $a > 1$ : $n > \\dfrac{\\log(b)}{\\log(a)}$, puis on prend le premier entier au-dessus.",
      ],
      exercices: [
        {
          enonce: "Écris la solution exacte de l'équation $3^x = 20$, à l'aide de logarithmes.",
          reponses: [{ attendu: "log(20)/log(3)" }],
          correction:
            "On applique $\\log$ des deux côtés : $\\log(3^x) = \\log(20)$.\nL'exposant descend : $x\\log(3) = \\log(20)$.\nOn divise par $\\log(3)$ : $x = \\dfrac{\\log(20)}{\\log(3)}$.\n⛔ Le piège : renverser le quotient. On divise par le logarithme de la BASE, celui qui multiplie $x$.\nRéponse : $x = \\dfrac{\\log(20)}{\\log(3)}$.",
          micros: ["logT_resoudre_exponentielle"],
        },
        {
          enonce: "Résous $1{,}5^x = 50$ à l'aide du tableau. Donne la solution arrondie au centième.",
          figure: grille(["x", "1,5", "2", "50", "100"], [["log(x)", "0,1761", "0,3010", "1,6990", "2"]]),
          reponses: [{ attendu: "9,65", tolerance: 0.005 }],
          correction:
            "$x = \\dfrac{\\log(50)}{\\log(1{,}5)}$.\nOn lit les deux valeurs dans le tableau : $x \\approx \\dfrac{1{,}6990}{0{,}1761} \\approx 9{,}65$.\nVérification à la calculatrice : $1{,}5^{9{,}65} \\approx 50$. ✔\n⛔ Le piège : calculer $50 \\div 1{,}5$. L'inconnue est un exposant : on divise les logarithmes, pas les nombres.\nRéponse : $x \\approx 9{,}65$.",
          micros: ["logT_resoudre_exponentielle"],
        },
        {
          enonce: "Résous $2^x = 100$ à l'aide du tableau. Donne la solution arrondie au centième.",
          figure: grille(["x", "1,5", "2", "50", "100"], [["log(x)", "0,1761", "0,3010", "1,6990", "2"]]),
          reponses: [{ attendu: "6,64", tolerance: 0.005 }],
          correction:
            "$x = \\dfrac{\\log(100)}{\\log(2)} \\approx \\dfrac{2}{0{,}3010} \\approx 6{,}64$.\nCohérent : $2^6 = 64$ et $2^7 = 128$, et 100 est entre les deux.\n⛔ Le piège : calculer $\\log(100) - \\log(2)$. Ici, le quotient porte sur les logarithmes : il ne se transforme pas en différence.\nRéponse : $x \\approx 6{,}64$.",
          micros: ["logT_resoudre_exponentielle"],
        },
        {
          enonce:
            "Résous $1{,}05^x = 2$ à l'aide du tableau. Donne la solution arrondie au dixième.",
          figure: grille(["x", "1,05", "1,1", "2", "5"], [["log(x)", "0,0212", "0,0414", "0,3010", "0,6990"]]),
          reponses: [{ attendu: "14,2", tolerance: 0.05 }],
          correction:
            "$x = \\dfrac{\\log(2)}{\\log(1{,}05)} \\approx \\dfrac{0{,}3010}{0{,}0212} \\approx 14{,}2$.\n⛔ Le piège : lire $\\log(1{,}1)$ à la place de $\\log(1{,}05)$. On prend la colonne de la base exacte.\nRéponse : $x \\approx 14{,}2$.",
          micros: ["logT_resoudre_exponentielle"],
        },
        {
          enonce: "Résous $x^3 = 125$, d'inconnue $x$ strictement positive.",
          reponses: [{ attendu: "5" }],
          correction:
            "L'inconnue est en BASE : pas besoin de logarithme.\nOn cherche le nombre qui, élevé au cube, donne 125.\n$x = 125^{\\frac{1}{3}} = 5$, et on vérifie : $5^3 = 125$. ✔\n⛔ Le piège : diviser 125 par 3. Ce serait résoudre $3x = 125$, pas $x^3 = 125$.\nRéponse : $x = 5$.",
          micros: ["logT_resoudre_puissance"],
        },
        {
          enonce: "Résous $x^4 = 1\\,296$, d'inconnue $x$ strictement positive.",
          reponses: [{ attendu: "6" }],
          correction:
            "L'inconnue est en base : $x = 1\\,296^{\\frac{1}{4}}$.\nÀ la calculatrice, on obtient 6.\nVérification : $6^4 = 36 \\times 36 = 1\\,296$. ✔\n⛔ Le piège : diviser par 4. $1\\,296 \\div 4 = 324$, et $324^4$ est bien plus grand que 1 296.\nRéponse : $x = 6$.",
          micros: ["logT_resoudre_puissance"],
        },
        {
          enonce:
            "Parmi ces trois équations, laquelle se résout SANS logarithme ? Écris sa lettre.\nA : $2^x = 50$\nB : $x^5 = 243$\nC : $1{,}2^x = 200$",
          reponses: [{ attendu: "B" }],
          correction:
            "On regarde où est l'inconnue.\nDans A et C, $x$ est en exposant : il faut le logarithme.\nDans B, $x$ est en base : une racine suffit, $x = 243^{\\frac{1}{5}} = 3$.\n⛔ Le piège : choisir A parce que les nombres ont l'air simples. Ce n'est pas la taille des nombres qui décide, c'est la place de $x$.\nRéponse : B.",
          micros: ["logT_resoudre_puissance"],
        },
        {
          enonce:
            "Détermine le plus petit entier $n$ tel que $2^n > 100$. On donne $\\log(2) \\approx 0{,}3010$ et $\\log(100) = 2$.",
          reponses: [{ attendu: "7" }],
          correction:
            "$\\log$ est croissante, elle conserve le sens : $n\\log(2) > \\log(100)$.\nDonc $n > \\dfrac{2}{0{,}3010} \\approx 6{,}64$.\nLe premier entier au-dessus de 6,64 est 7.\nVérification : $2^6 = 64$ et $2^7 = 128$. ✔\n⛔ Le piège : arrondir 6,64 à l'entier inférieur. Avec $n = 6$, on n'a que 64.\nRéponse : $n = 7$.",
          micros: ["logT_inequation"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : écrire l'équation ou l'inéquation, la résoudre, répondre à la question posée.",
      rappel: [
        "Une grandeur multipliée par $a$ à chaque période : on cherche $x$ tel que $a^x = $ le coefficient voulu. Si l'objectif est $u_0 \\times a^n > C$, on divise d'abord par $u_0$.",
        "⛔ Si $0 < a < 1$, alors $\\log(a)$ est NÉGATIF. Diviser par lui CHANGE le sens : $a^n < c$ donne $n > \\dfrac{\\log(c)}{\\log(a)}$.",
        "L'inconnue en base, dans une situation : un cube de côté $x$ a pour volume $x^3$. On résout $x^3 = V$ sans logarithme.",
      ],
      exercices: [
        {
          enonce:
            "La responsable d'un parc éolien prévoit que la production est multipliée par 1,2 chaque année (modèle). Elle veut savoir quand elle sera multipliée par 5.\na) Résous $1{,}2^x = 5$. Arrondis au dixième.\nb) Au bout de combien d'années ENTIÈRES la production aura-t-elle dépassé ce niveau ?",
          figure: grille(["x", "1,2", "1,5", "2", "5"], [["log(x)", "0,0792", "0,1761", "0,3010", "0,6990"]]),
          reponses: [
            { question: "a)", attendu: "8,8", tolerance: 0.05 },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "a) $x = \\dfrac{\\log(5)}{\\log(1{,}2)} \\approx \\dfrac{0{,}6990}{0{,}0792} \\approx 8{,}8$.\nb) Le premier entier au-dessus de 8,8 est 9.\n⛔ Le piège au a) : calculer $5 \\div 1{,}2$. La production est multipliée chaque année : l'inconnue est un exposant.\nRéponse : a) environ 8,8 ; b) 9 ans.",
          micros: ["logT_resoudre_exponentielle", "logT_inequation"],
        },
        {
          enonce:
            "Une coach sportive augmente la distance de course de 10 % par semaine (modèle). Elle veut savoir quand la distance aura triplé.\na) Écris la solution exacte de $1{,}1^x = 3$, à l'aide de logarithmes.\nb) Calcule-la à l'aide du tableau, arrondie au dixième.\nc) Au bout de combien de semaines ENTIÈRES la distance aura-t-elle dépassé le triple ?",
          figure: grille(["x", "1,1", "2", "3", "5"], [["log(x)", "0,0414", "0,3010", "0,4771", "0,6990"]]),
          reponses: [
            { question: "a)", attendu: "log(3)/log(1,1)" },
            { question: "b)", attendu: "11,5", tolerance: 0.05 },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "Augmenter de 10 %, c'est multiplier par 1,1.\na) $x = \\dfrac{\\log(3)}{\\log(1{,}1)}$.\nb) $x \\approx \\dfrac{0{,}4771}{0{,}0414} \\approx 11{,}5$.\nc) Le premier entier au-dessus de 11,5 est 12.\n⛔ Le piège : se dire que tripler, c'est 200 % de plus, donc $200 \\div 10 = 20$ semaines. Les hausses se cumulent : chaque semaine part d'une distance plus longue.\nRéponse : a) $\\dfrac{\\log(3)}{\\log(1{,}1)}$ ; b) environ 11,5 ; c) 12 semaines.",
          micros: ["logT_resoudre_exponentielle", "logT_inequation"],
        },
        {
          enonce:
            "Un vigneron commande une cuve en forme de cube, de côté $x$ mètres et de volume 64 m³ (modèle).\na) Écris l'équation vérifiée par $x$.\nb) Résous-la, avec $x > 0$.\nc) Une autre cuve en forme de cube a un volume de 216 m³. Quel est son côté, en mètres ?",
          reponses: [
            { question: "a)", attendu: "x^3 = 64" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) Le volume d'un cube, c'est côté × côté × côté : $x^3 = 64$.\nb) L'inconnue est en base : $x = 64^{\\frac{1}{3}} = 4$, et on vérifie : $4^3 = 64$. ✔\nc) De même, $x^3 = 216$, donc $x = 216^{\\frac{1}{3}} = 6$, car $6^3 = 216$.\n⛔ Le piège au b) : calculer $64 \\div 3$. Ce serait résoudre $3x = 64$, pas $x^3 = 64$.\nRéponse : a) $x^3 = 64$ ; b) 4 m ; c) 6 m.",
          micros: ["logT_resoudre_puissance"],
        },
        {
          enonce:
            "Un infirmier suit un médicament dont la quantité dans le sang baisse de 20 % par heure (modèle). Il cherche au bout de combien d'heures $n$ il restera moins de 10 % de la dose : $0{,}8^n < 0{,}1$.\na) Quand on divise les deux membres par $\\log(0{,}8)$, le sens de l'inégalité change-t-il ? Réponds oui ou non.\nb) À l'aide du tableau, trouve le plus petit entier $n$ qui convient.",
          figure: grille(["x", "0,1", "0,5", "0,8", "0,9"], [["log(x)", "−1", "−0,3010", "−0,0969", "−0,0458"]]),
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "11" },
          ],
          correction:
            "a) $0{,}8 < 1$, donc $\\log(0{,}8)$ est négatif : diviser par lui change le sens.\nb) On applique $\\log$ : $n\\log(0{,}8) < \\log(0{,}1)$.\nOn divise par un nombre négatif, le sens CHANGE : $n > \\dfrac{-1}{-0{,}0969} \\approx 10{,}32$.\nLe premier entier au-dessus de 10,32 est 11.\n⛔ Le piège : garder le signe « < » et répondre $n < 10{,}32$. La quantité baisse avec le temps : il faut attendre assez, $n$ doit être GRAND.\nRéponse : a) oui ; b) 11 heures.",
          micros: ["logT_inequation"],
        },
        {
          enonce:
            "Le responsable de la collecte d'une ville vise moins de déchets : le tonnage baisse de 15 % par an (modèle). Il cherche quand le tonnage sera passé sous la moitié.\na) Par quel coefficient le tonnage est-il multiplié chaque année ?\nb) Avec ce coefficient et le tableau, trouve au bout de combien d'années ENTIÈRES le tonnage sera passé sous la moitié.",
          figure: grille(["x", "0,5", "0,8", "0,85", "0,9"], [["log(x)", "−0,3010", "−0,0969", "−0,0706", "−0,0458"]]),
          reponses: [
            { question: "a)", attendu: "0,85" },
            { question: "b)", attendu: "5" },
          ],
          correction:
            "a) Baisser de 15 %, c'est multiplier par $1 - 0{,}15 = 0{,}85$.\nb) On cherche $n$ tel que $0{,}85^n < 0{,}5$, soit $n\\log(0{,}85) < \\log(0{,}5)$. $\\log(0{,}85)$ est négatif, le sens change : $n > \\dfrac{-0{,}3010}{-0{,}0706} \\approx 4{,}26$.\nLe premier entier au-dessus est 5.\n⛔ Le piège au a) : prendre 1,15 ou 0,15. Une baisse de 15 % laisse 85 %.\nRéponse : a) 0,85 ; b) 5 ans.",
          micros: ["logT_inequation"],
        },
        {
          enonce:
            "Une créatrice de podcast a 500 abonnés, et 25 % de plus chaque mois (modèle). Elle vise plus de 20 000 abonnés au bout de $n$ mois : $500 \\times 1{,}25^n > 20\\,000$.\na) Divise par 500 : quel nombre $1{,}25^n$ doit-il dépasser ?\nb) À l'aide du tableau, trouve le plus petit entier $n$ qui convient.",
          figure: grille(["x", "1,25", "4", "40", "400"], [["log(x)", "0,0969", "0,6021", "1,6021", "2,6021"]]),
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "17" },
          ],
          correction:
            "a) $20\\,000 \\div 500 = 40$, donc $1{,}25^n > 40$.\nb) $\\log$ est croissante : $n > \\dfrac{\\log(40)}{\\log(1{,}25)} \\approx \\dfrac{1{,}6021}{0{,}0969} \\approx 16{,}5$.\nLe premier entier au-dessus est 17.\n⛔ Le piège au b) : arrondir 16,5 à 16 ou oublier de diviser par 500 d'abord.\nRéponse : a) 40 ; b) 17 mois.",
          micros: ["logT_inequation"],
        },
        {
          enonce:
            "Une formatrice compare deux équations :\nA : $x^4 = 81$\nB : $4^x = 81$\na) Résous A, avec $x > 0$.\nb) Résous B à l'aide du tableau, arrondi au centième.\nc) Laquelle demande un logarithme ? Écris sa lettre.",
          figure: grille(["x", "2", "4", "81"], [["log(x)", "0,3010", "0,6021", "1,9085"]]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3,17", tolerance: 0.005 },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) L'inconnue est en base : $x = 81^{\\frac{1}{4}} = 3$, car $3^4 = 81$.\nb) L'inconnue est en exposant : $x = \\dfrac{\\log(81)}{\\log(4)} \\approx \\dfrac{1{,}9085}{0{,}6021} \\approx 3{,}17$.\nc) C'est B, où $x$ est en exposant.\n⛔ Le piège : croire que les deux équations ont la même solution parce qu'elles ont les mêmes nombres.\nRéponse : a) 3 ; b) 3,17 ; c) B.",
          micros: ["logT_resoudre_puissance", "logT_resoudre_exponentielle"],
        },
        {
          enonce:
            "Un boulanger observe que son levain double de volume chaque heure (modèle). Après $x$ heures, le volume est multiplié par $2^x$. Il veut un volume multiplié par 12.\na) Résous $2^x = 12$ à l'aide du tableau. Arrondis au dixième.\nb) Il regarde son levain une fois par heure, à l'heure pile. Au bout de combien d'heures entières verra-t-il que le volume a dépassé ce niveau ?",
          figure: grille(["x", "2", "3", "12", "20"], [["log(x)", "0,3010", "0,4771", "1,0792", "1,3010"]]),
          reponses: [
            { question: "a)", attendu: "3,6", tolerance: 0.05 },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "a) $x = \\dfrac{\\log(12)}{\\log(2)} \\approx \\dfrac{1{,}0792}{0{,}3010} \\approx 3{,}6$.\nb) Le premier entier au-dessus de 3,6 est 4. Vérification : $2^3 = 8$ et $2^4 = 16$. ✔\n⛔ Le piège au a) : calculer $12 \\div 2 = 6$. Le volume ne s'ajoute pas : il double à chaque heure.\nRéponse : a) environ 3,6 ; b) 4 heures.",
          micros: ["logT_resoudre_exponentielle", "logT_inequation"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la situation, choisir la méthode, vérifier le résultat par le calcul direct.",
      rappel: [
        "Exposant inconnu : $\\log$. Base inconnue : une racine. On regarde toujours d'abord où est l'inconnue.",
        "On cherche un entier : on prend le premier au-dessus du seuil, puis on vérifie avec les deux entiers voisins.",
        "Une grandeur qui diminue : $a < 1$, $\\log(a) < 0$, et le sens de l'inégalité change quand on divise.",
      ],
      exercices: [
        {
          titre: "Les algues du lac",
          enonce:
            "Une technicienne de l'environnement suit des algues sur un lac (modèle) : leur surface vaut $1{,}5^x$ ares au bout de $x$ semaines. Le seuil d'alerte est de 10 ares. La courbe et le seuil sont tracés. On donne $\\log(1{,}5) \\approx 0{,}1761$ et $\\log(10) = 1$.\na) Résous $1{,}5^x = 10$, arrondi au centième.\nb) Au bout de combien de semaines ENTIÈRES le seuil est-il dépassé ?\nc) Calcule la surface à la semaine juste avant celle trouvée au b), arrondie au centième.\nd) Calcule la surface à la semaine trouvée au b), arrondie au centième.",
          figure: repere(
            [-1, 7, -1, 13],
            [{ pts: [[0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38], [3.5, 4.13], [4, 5.06], [4.5, 6.2], [5, 7.59], [5.5, 9.3], [6, 11.39], [6.25, 12.6]] }],
            [],
            10,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "5,68", tolerance: 0.005 },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "7,59", tolerance: 0.005 },
            { question: "d)", attendu: "11,39", tolerance: 0.005 },
          ],
          correction:
            "a) $x = \\dfrac{\\log(10)}{\\log(1{,}5)} \\approx \\dfrac{1}{0{,}1761} \\approx 5{,}68$.\nb) Le premier entier au-dessus de 5,68 est 6. La courbe le confirme : elle croise le seuil juste avant la semaine 6.\nc) $1{,}5^5 \\approx 7{,}59$ : le seuil n'est pas encore atteint.\nd) $1{,}5^6 \\approx 11{,}39$ : le seuil est dépassé.\n⛔ Le piège au b) : répondre 5, en coupant les décimales de 5,68. À la semaine 5, on n'a que 7,59 ares.\nRéponse : a) 5,68 ; b) 6 ; c) 7,59 ; d) 11,39.",
          micros: ["logT_resoudre_exponentielle", "logT_inequation"],
        },
        {
          titre: "Le glacier",
          enonce:
            "Une glaciologue étudie un glacier dont le volume perd 3 % par an (modèle).\na) Par quel coefficient le volume est-il multiplié chaque année ?\nb) Avec ce coefficient et le tableau, trouve au bout de combien d'années ENTIÈRES le volume sera passé sous la moitié de sa valeur de départ.\nc) Même question pour que le volume passe sous le quart.\nd) Calcule à la calculatrice ce qu'il reste au bout du nombre d'années trouvé au b), en pourcentage du volume de départ, arrondi au dixième.",
          figure: grille(["x", "0,25", "0,5", "0,9", "0,97"], [["log(x)", "−0,6021", "−0,3010", "−0,0458", "−0,0132"]]),
          reponses: [
            { question: "a)", attendu: "0,97" },
            { question: "b)", attendu: "23" },
            { question: "c)", attendu: "46" },
            { question: "d)", attendu: "49,6 %", tolerance: 0.05 },
          ],
          correction:
            "a) Perdre 3 %, c'est multiplier par 0,97.\nb) On cherche $n$ tel que $0{,}97^n < 0{,}5$. $\\log(0{,}97)$ est négatif, le sens change : $n > \\dfrac{-0{,}3010}{-0{,}0132} \\approx 22{,}8$. Le premier entier est 23.\nc) On cherche $n$ tel que $0{,}97^n < 0{,}25$ : $n > \\dfrac{-0{,}6021}{-0{,}0132} \\approx 45{,}6$. Le premier entier est 46.\nd) $0{,}97^{23} \\approx 0{,}496$, soit 49,6 % : on est bien sous la moitié.\n⛔ Le piège au b) : croire qu'il faut $50 \\div 3 \\approx 17$ ans. Chaque année, on perd 3 % de ce qui RESTE, pas du volume de départ.\nRéponse : a) 0,97 ; b) 23 ans ; c) 46 ans ; d) 49,6 %.",
          micros: ["logT_inequation"],
        },
        {
          titre: "L'épargne du food truck",
          enonce:
            "Le gérant d'un food truck place 8 000 € et vise 12 000 € pour changer de camion (modèle). Le placement rapporte 4 % par an, et $n$ est le nombre d'années.\na) Quel nombre $1{,}04^n$ doit-il dépasser ?\nb) À l'aide du tableau, trouve le plus petit entier $n$ qui convient.\nc) Un autre placement rapporte 6 % par an. Trouve le plus petit entier $n$ tel que $1{,}06^n$ dépasse le même nombre.\nd) Combien d'années gagne-t-il avec le second placement ?",
          figure: grille(["x", "1,04", "1,06", "1,25", "1,5"], [["log(x)", "0,0170", "0,0253", "0,0969", "0,1761"]]),
          reponses: [
            { question: "a)", attendu: "1,5" },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "4" },
          ],
          correction:
            "a) $12\\,000 \\div 8\\,000 = 1{,}5$, donc $1{,}04^n > 1{,}5$.\nb) $n > \\dfrac{\\log(1{,}5)}{\\log(1{,}04)} \\approx \\dfrac{0{,}1761}{0{,}0170} \\approx 10{,}4$. Le premier entier est 11.\nc) $n > \\dfrac{0{,}1761}{0{,}0253} \\approx 6{,}96$. Le premier entier est 7.\nd) $11 - 7 = 4$ ans.\n⛔ Le piège au b) : garder les euros et écrire $n > \\dfrac{\\log(12\\,000)}{\\log(1{,}04)}$. On divise d'abord par le capital de départ.\nRéponse : a) 1,5 ; b) 11 ; c) 7 ; d) 4 ans.",
          micros: ["logT_inequation"],
        },
        {
          titre: "Le tournoi d'e-sport",
          enonce:
            "Une organisatrice prépare un tournoi d'e-sport à élimination directe (modèle) : à chaque tour, la moitié des joueurs est éliminée. Avec $n$ tours, on peut accueillir $2^n$ joueurs.\na) Combien faut-il de tours pour 64 joueurs ? Résous $2^n = 64$.\nb) Combien faut-il de tours au minimum pour accueillir 500 joueurs ? Trouve le plus petit entier $n$ tel que $2^n \\geqslant 500$.\nc) Après $k$ tours, il reste la proportion $0{,}5^k$ des joueurs. Trouve le plus petit entier $k$ tel que $0{,}5^k < 0{,}01$.\nd) Pour la phase de poules, elle veut $x$ poules de $x$ joueurs, soit $x^2 = 529$. Résous cette équation, avec $x > 0$.",
          figure: grille(["x", "0,01", "0,5", "2", "500"], [["log(x)", "−2", "−0,3010", "0,3010", "2,6990"]]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "23" },
          ],
          correction:
            "a) $2^6 = 64$, donc $n = 6$.\nb) $n \\geqslant \\dfrac{\\log(500)}{\\log(2)} \\approx \\dfrac{2{,}6990}{0{,}3010} \\approx 8{,}97$. Le premier entier est 9. Vérification : $2^8 = 256$ et $2^9 = 512$. ✔\nc) $\\log(0{,}5)$ est négatif, le sens change : $k > \\dfrac{-2}{-0{,}3010} \\approx 6{,}64$. Le premier entier est 7.\nd) L'inconnue est en base : $x = 529^{\\frac{1}{2}} = 23$, car $23^2 = 529$.\n⛔ Le piège au c) : garder le sens « < » et conclure $k < 6{,}64$. Plus il y a de tours, moins il reste de joueurs : il faut assez de tours.\nRéponse : a) 6 ; b) 9 ; c) 7 ; d) 23.",
          micros: ["logT_resoudre_exponentielle", "logT_inequation", "logT_resoudre_puissance"],
        },
      ],
    },
  ],
};
