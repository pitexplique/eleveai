// ─── Fiche d'exercices : logarithme, durées et ordres de grandeur (STMG, Tle) — 20 exercices
//
// Notion log_applications du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/logarithme.bank.ts`). Le coach demande :
// un nombre d'années entier pour dépasser un objectif (u₀qⁿ > C, donc qⁿ > C ÷ u₀),
// un temps de doublement (qˣ = 2, indépendant du départ), une demi-vie (qˣ = 0,5),
// l'ordre de grandeur et le nombre de chiffres d'un entier à partir de son
// logarithme (partie entière + 1). Logarithme DÉCIMAL seulement, jamais ln.
//
// ⛔ LES ARRONDIS : chaque seuil a été choisi loin d'un entier, et chaque réponse a
// été recalculée par les DEUX chemins (valeurs arrondies du tableau, et calculatrice)
// dans le script de recalcul. Une réponse arrondie au dixième a une tolérance de 0,05.
//
// Aucune statistique réelle. La légende de l'échiquier (ex. 19) est une histoire
// traditionnelle, le calcul est exact. Tout le reste est un modèle ou une situation
// visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; épargne (conseiller), urbanisme
// (urbaniste), escalade (gérante de salle), énergie (thermicienne), médecine
// nucléaire (technicien), automobile (experte), imprimerie (imprimeur), géologie
// (géologue), vie associative (chargée de mission), forêt (forestier), histoire des
// jeux (animateur de ludothèque), brasserie (brasseuse).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-logarithme.mjs`.
//
// Micro-compétences : logT_nombre_annuites (1, 2, 3, 9, 10, 11, 17, 18, 20),
// logT_temps_doublement (4, 5, 6, 12, 13, 14, 18, 20), logT_nombre_de_chiffres
// (7, 8, 15, 16, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesLogApplicationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "log-applications",
  titre: "Logarithme : durées et ordres de grandeur",
  accroche:
    "Vingt exercices où le logarithme sert à quelque chose : combien d'années pour atteindre un objectif, quand une somme aura doublé, quand une substance aura perdu la moitié de sa masse, combien de chiffres compte un très grand nombre. Un livret d'épargne, une salle d'escalade, une forêt, une dette, les grains de riz de l'échiquier. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : le coefficient, le quotient, le doublement, ou le nombre de chiffres.",
      rappel: [
        "Hausse de $t$ % : on multiplie par $q = 1 + t \\div 100$. Baisse de $t$ % : par $q = 1 - t \\div 100$.",
        "Dépasser un objectif $C$ en partant de $u_0$ : $q^n > C \\div u_0$, donc $n > \\dfrac{\\log(C \\div u_0)}{\\log(q)}$, et on prend le premier entier au-dessus.",
        "Doublement : on résout $q^x = 2$, donc $x = \\dfrac{\\log(2)}{\\log(q)}$. Demi-vie : on résout $q^x = 0{,}5$, donc $x = \\dfrac{\\log(0{,}5)}{\\log(q)}$. Le départ n'intervient pas.",
        "Si $\\log(N) = k + d$, avec $k$ entier et $0 \\leqslant d < 1$, l'entier $N$ s'écrit avec $k + 1$ chiffres. Pour une puissance : $\\log(a^n) = n\\log(a)$.",
      ],
      exercices: [
        {
          enonce: "Une somme augmente de 5 % par an. Par quel coefficient est-elle multipliée chaque année ?",
          reponses: [{ attendu: "1,05" }],
          correction:
            "Hausse de 5 % : $q = 1 + 5 \\div 100 = 1{,}05$.\n⛔ Le piège : répondre 0,05. C'est seulement la hausse : on garde la somme de départ, le 1.\nRéponse : 1,05.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "Un capital de 2 000 € doit dépasser 3 000 €. Avec $q$ le coefficient annuel et $n$ le nombre d'années, il faut que $q^n$ dépasse le quotient de l'objectif par le départ. Calcule ce quotient.",
          reponses: [{ attendu: "1,5" }],
          correction:
            "Quotient : objectif ÷ départ.\n$3\\,000 \\div 2\\,000 = 1{,}5$.\n⛔ Le piège : faire la différence ($3\\,000 - 2\\,000 = 1\\,000$). Avec des pourcentages, on compare par un quotient.\nRéponse : 1,5.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "À l'aide du tableau, trouve le plus petit entier $n$ tel que $1{,}05^n > 1{,}5$.",
          figure: grille(["x", "1,05", "1,1", "1,5", "2"], [["log(x)", "0,0212", "0,0414", "0,1761", "0,3010"]]),
          reponses: [{ attendu: "9" }],
          correction:
            "$n > \\dfrac{\\log(1{,}5)}{\\log(1{,}05)} \\approx \\dfrac{0{,}1761}{0{,}0212} \\approx 8{,}3$.\nLe premier entier au-dessus de 8,3 est 9.\n⛔ Le piège : répondre 8 en arrondissant. Au bout de 8 ans, l'objectif n'est pas encore atteint.\nRéponse : $n = 9$.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "Une grandeur augmente de 10 % par an. Écris l'équation à résoudre pour trouver le temps de doublement $x$.",
          reponses: [{ attendu: "1,1^x = 2" }],
          correction:
            "Le coefficient annuel est 1,1. Doubler, c'est atteindre un coefficient cumulé de 2.\nL'équation est $1{,}1^x = 2$.\n⛔ Le piège : écrire $x^{1{,}1} = 2$. L'inconnue est un nombre d'années : elle est en exposant.\nRéponse : $1{,}1^x = 2$.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce:
            "Une grandeur augmente de 10 % par an. À l'aide du tableau, calcule son temps de doublement, arrondi au dixième.",
          figure: grille(["x", "1,05", "1,1", "1,5", "2"], [["log(x)", "0,0212", "0,0414", "0,1761", "0,3010"]]),
          reponses: [{ attendu: "7,3", tolerance: 0.05 }],
          correction:
            "On résout $1{,}1^x = 2$.\n$x = \\dfrac{\\log(2)}{\\log(1{,}1)} \\approx \\dfrac{0{,}3010}{0{,}0414} \\approx 7{,}3$ ans.\n⛔ Le piège : calculer $100 \\div 10 = 10$ ans. Les hausses se cumulent : on double plus vite.\nRéponse : environ 7,3 ans.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce:
            "Une substance perd 10 % de sa masse chaque année. À l'aide du tableau, calcule sa demi-vie, arrondie au dixième.",
          figure: grille(["x", "0,5", "0,8", "0,9", "1,1"], [["log(x)", "−0,3010", "−0,0969", "−0,0458", "0,0414"]]),
          reponses: [{ attendu: "6,6", tolerance: 0.05 }],
          correction:
            "Perdre 10 %, c'est multiplier par 0,9. On résout $0{,}9^x = 0{,}5$.\n$x = \\dfrac{\\log(0{,}5)}{\\log(0{,}9)} \\approx \\dfrac{-0{,}3010}{-0{,}0458} \\approx 6{,}6$ ans.\nLes deux logarithmes sont négatifs : leur quotient est positif.\n⛔ Le piège : calculer $50 \\div 10 = 5$ ans. La substance perd 10 % de ce qui reste, pas de la masse de départ.\nRéponse : environ 6,6 ans.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce: "Un calcul donne $\\log(N) \\approx 12{,}38$, où $N$ est un entier. Combien de chiffres compte $N$ ?",
          reponses: [{ attendu: "13" }],
          correction:
            "La partie entière de 12,38 est 12.\nDonc $10^{12} \\leqslant N < 10^{13}$, et $N$ s'écrit avec $12 + 1 = 13$ chiffres.\n⛔ Le piège : répondre 12. $10^{12}$, le plus petit de ces nombres, s'écrit déjà avec 13 chiffres : un 1 et douze zéros.\nRéponse : 13.",
          micros: ["logT_nombre_de_chiffres"],
        },
        {
          enonce: "On donne $\\log(2) \\approx 0{,}3010$. Combien de chiffres compte $2^{20}$ ?",
          reponses: [{ attendu: "7" }],
          correction:
            "L'exposant descend : $\\log(2^{20}) = 20\\log(2) \\approx 20 \\times 0{,}3010 = 6{,}02$.\nLa partie entière est 6, donc $2^{20}$ a $6 + 1 = 7$ chiffres.\nVérification : $2^{20} = 1\\,048\\,576$. ✔\n⛔ Le piège : s'arrêter à 6 et oublier d'ajouter 1.\nRéponse : 7.",
          micros: ["logT_nombre_de_chiffres"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : trouver le coefficient, poser le calcul, répondre avec le bon arrondi.",
      rappel: [
        "On cherche un nombre d'années ENTIER pour dépasser un objectif : on prend le premier entier au-dessus du résultat, jamais l'arrondi inférieur.",
        "Le temps de doublement et la demi-vie ne dépendent que du taux : le capital de départ n'intervient pas. Deux demi-vies : il reste le quart.",
        "$10^k \\leqslant N < 10^{k+1}$ : $k$ est la partie entière de $\\log(N)$, et $N$ n'est pas égal à son logarithme.",
      ],
      exercices: [
        {
          enonce:
            "Un conseiller étudie le livret de Naïm : 1 500 € placés à 3 % par an (modèle). Naïm vise plus de 2 400 €.\na) Calcule le quotient de l'objectif par le départ.\nb) À l'aide du tableau, trouve le nombre d'années ENTIÈRES qu'il faut attendre.",
          figure: grille(["x", "1,03", "1,6", "2", "2,4"], [["log(x)", "0,0128", "0,2041", "0,3010", "0,3802"]]),
          reponses: [
            { question: "a)", attendu: "1,6" },
            { question: "b)", attendu: "16" },
          ],
          correction:
            "a) $2\\,400 \\div 1\\,500 = 1{,}6$.\nb) $1{,}03^n > 1{,}6$ donne $n > \\dfrac{\\log(1{,}6)}{\\log(1{,}03)} \\approx \\dfrac{0{,}2041}{0{,}0128} \\approx 15{,}9$. Le premier entier au-dessus est 16.\n⛔ Le piège au b) : lire $\\log(2{,}4)$ dans le tableau parce que l'objectif est 2 400. On prend le logarithme du quotient, 1,6.\nRéponse : a) 1,6 ; b) 16 ans.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "Une urbaniste étudie une ville de 12 000 habitants, qui gagne 2 % par an (modèle). À partir de 15 000 habitants, il faudra une nouvelle école.\na) Calcule le quotient de l'objectif par le départ.\nb) À l'aide du tableau, trouve au bout de combien d'années ENTIÈRES la ville dépassera 15 000 habitants.",
          figure: grille(["x", "1,02", "1,2", "1,25", "1,5"], [["log(x)", "0,0086", "0,0792", "0,0969", "0,1761"]]),
          reponses: [
            { question: "a)", attendu: "1,25" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) $15\\,000 \\div 12\\,000 = 1{,}25$.\nb) $n > \\dfrac{\\log(1{,}25)}{\\log(1{,}02)} \\approx \\dfrac{0{,}0969}{0{,}0086} \\approx 11{,}3$. Le premier entier au-dessus est 12.\n⛔ Le piège au b) : croire qu'il faut $3\\,000 \\div (2\\,\\% \\text{ de } 12\\,000) = 12{,}5$ ans. La hausse se cumule : c'est un calcul avec une puissance.\nRéponse : a) 1,25 ; b) 12 ans.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "La gérante d'une salle d'escalade a 400 adhérents et en gagne 8 % par an (modèle). Elle vise plus de 1 000 adhérents.\na) Par quel coefficient le nombre d'adhérents est-il multiplié chaque année ?\nb) À l'aide du tableau, trouve au bout de combien d'années ENTIÈRES elle dépassera 1 000 adhérents.",
          figure: grille(["x", "1,08", "1,8", "2", "2,5"], [["log(x)", "0,0334", "0,2553", "0,3010", "0,3979"]]),
          reponses: [
            { question: "a)", attendu: "1,08" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) Hausse de 8 % : $q = 1{,}08$.\nb) Quotient : $1\\,000 \\div 400 = 2{,}5$. Donc $n > \\dfrac{\\log(2{,}5)}{\\log(1{,}08)} \\approx \\dfrac{0{,}3979}{0{,}0334} \\approx 11{,}9$. Le premier entier au-dessus est 12.\n⛔ Le piège au b) : calculer $\\log(1\\,000) \\div \\log(1{,}08)$ sans diviser par le départ.\nRéponse : a) 1,08 ; b) 12 ans.",
          micros: ["logT_nombre_annuites"],
        },
        {
          enonce:
            "Une thermicienne étudie une facture d'énergie qui augmente de 6 % par an (modèle).\na) À l'aide du tableau, calcule le temps de doublement de la facture, arrondi au dixième.\nb) Au bout de combien d'années ENTIÈRES aura-t-elle dépassé le double ?\nc) Le résultat change-t-il si la facture de départ est deux fois plus grande ? Réponds oui ou non.",
          figure: grille(["x", "1,04", "1,06", "2", "3"], [["log(x)", "0,0170", "0,0253", "0,3010", "0,4771"]]),
          reponses: [
            { question: "a)", attendu: "11,9", tolerance: 0.05 },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $x = \\dfrac{\\log(2)}{\\log(1{,}06)} \\approx \\dfrac{0{,}3010}{0{,}0253} \\approx 11{,}9$ ans.\nb) Le premier entier au-dessus de 11,9 est 12.\nc) On résout $1{,}06^x = 2$ : le montant de départ n'y figure pas.\n⛔ Le piège au c) : croire qu'une grosse facture met plus de temps à doubler. Elle gagne plus d'euros par an, en proportion c'est pareil.\nRéponse : a) environ 11,9 ans ; b) 12 ans ; c) non.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce:
            "Un technicien en médecine nucléaire utilise un modèle : un produit perd 8 % de son activité chaque jour.\na) À l'aide du tableau, calcule sa demi-vie, arrondie au dixième de jour.\nb) Au bout de combien de jours n'en reste-t-il plus que le quart ? Résous $0{,}92^x = 0{,}25$, arrondi au dixième.",
          figure: grille(["x", "0,25", "0,5", "0,8", "0,92"], [["log(x)", "−0,6021", "−0,3010", "−0,0969", "−0,0362"]]),
          reponses: [
            { question: "a)", attendu: "8,3", tolerance: 0.05 },
            { question: "b)", attendu: "16,6", tolerance: 0.05 },
          ],
          correction:
            "Perdre 8 %, c'est multiplier par 0,92.\na) $x = \\dfrac{\\log(0{,}5)}{\\log(0{,}92)} \\approx \\dfrac{-0{,}3010}{-0{,}0362} \\approx 8{,}3$ jours.\nb) $x = \\dfrac{\\log(0{,}25)}{\\log(0{,}92)} \\approx \\dfrac{-0{,}6021}{-0{,}0362} \\approx 16{,}6$ jours : deux demi-vies, car le quart est la moitié de la moitié.\n⛔ Le piège au a) : prendre $\\log(0{,}08)$. On garde ce qui RESTE, 92 %, pas ce qui est perdu.\nRéponse : a) environ 8,3 jours ; b) environ 16,6 jours.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce:
            "Une experte automobile utilise un modèle : une voiture perd 15 % de sa valeur par an.\na) À l'aide du tableau, calcule le temps au bout duquel sa valeur est divisée par 2, arrondi au dixième.\nb) Au bout de combien d'années ENTIÈRES vaudra-t-elle moins de la moitié de son prix de départ ?",
          figure: grille(["x", "0,5", "0,75", "0,85", "0,9"], [["log(x)", "−0,3010", "−0,1249", "−0,0706", "−0,0458"]]),
          reponses: [
            { question: "a)", attendu: "4,3", tolerance: 0.05 },
            { question: "b)", attendu: "5" },
          ],
          correction:
            "Perdre 15 %, c'est multiplier par 0,85.\na) $x = \\dfrac{\\log(0{,}5)}{\\log(0{,}85)} \\approx \\dfrac{-0{,}3010}{-0{,}0706} \\approx 4{,}3$ ans.\nb) Le premier entier au-dessus de 4,3 est 5.\n⛔ Le piège au a) : calculer $50 \\div 15 \\approx 3{,}3$ ans. La baisse se calcule chaque année sur la valeur qui reste.\nRéponse : a) environ 4,3 ans ; b) 5 ans.",
          micros: ["logT_temps_doublement"],
        },
        {
          enonce:
            "Un imprimeur s'amuse d'une curiosité : plier une feuille 50 fois donnerait $2^{50}$ épaisseurs (calcul théorique). On donne $\\log(2) \\approx 0{,}3010$.\na) Calcule $\\log(2^{50})$, arrondi au centième.\nb) Combien de chiffres compte $2^{50}$ ?\nc) $2^{50}$ est entre $10^k$ et $10^{k+1}$. Donne les deux exposants, du plus petit au plus grand, séparés par un point-virgule.",
          reponses: [
            { question: "a)", attendu: "15,05", exact: true },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "15 ; 16", ordre: true },
          ],
          correction:
            "a) L'exposant descend : $50 \\times 0{,}3010 = 15{,}05$.\nb) La partie entière est 15, donc $15 + 1 = 16$ chiffres.\nc) $15 \\leqslant 15{,}05 < 16$, donc $10^{15} \\leqslant 2^{50} < 10^{16}$.\n⛔ Le piège au b) : répondre 15, ou croire que le nombre vaut 15,05.\nRéponse : a) 15,05 ; b) 16 ; c) 15 ; 16.",
          micros: ["logT_nombre_de_chiffres"],
        },
        {
          enonce:
            "Une géologue estime le nombre $N$ de grains de sable d'une plage (modèle). Son calcul donne $\\log(N) \\approx 13{,}4$.\na) $N$ est entre $10^k$ et $10^{k+1}$. Donne les deux exposants, du plus petit au plus grand, séparés par un point-virgule.\nb) Combien de chiffres compte $N$ ?\nc) Une collègue écrit : « il y a environ 13,4 grains ». Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "13 ; 14", ordre: true },
            { question: "b)", attendu: "14" },
            { question: "c)", attendu: "faux" },
          ],
          correction:
            "a) La partie entière de 13,4 est 13, donc $10^{13} \\leqslant N < 10^{14}$.\nb) $13 + 1 = 14$ chiffres.\nc) 13,4 est un EXPOSANT, pas une valeur approchée de $N$ : c'est faux.\n⛔ Le piège au c) : confondre un nombre et son logarithme.\nRéponse : a) 13 ; 14 ; b) 14 ; c) faux.",
          micros: ["logT_nombre_de_chiffres"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : le coefficient, le quotient, le logarithme, puis une réponse qui a du sens.",
      rappel: [
        "On suit toujours le même chemin : coefficient, quotient objectif ÷ départ, logarithme, premier entier au-dessus.",
        "Si la grandeur diminue, $\\log(q)$ est négatif : le sens de l'inégalité change quand on divise.",
        "Le nombre de chiffres de $a^n$ : on calcule $n\\log(a)$, on prend la partie entière, on ajoute 1.",
      ],
      exercices: [
        {
          titre: "La dette de l'association",
          enonce:
            "Une chargée de mission suit une association qui doit encore 20 000 € (modèle simplifié). Sa dette baisse de 10 % par an. L'association veut passer sous 5 000 €.\na) Par quel coefficient la dette est-elle multipliée chaque année ?\nb) Calcule le quotient de l'objectif par le départ.\nc) À l'aide du tableau, trouve au bout de combien d'années ENTIÈRES la dette passera sous 5 000 €.\nd) Si la dette baissait de 20 % par an, combien d'années ENTIÈRES faudrait-il ?",
          figure: grille(["x", "0,25", "0,5", "0,8", "0,9"], [["log(x)", "−0,6021", "−0,3010", "−0,0969", "−0,0458"]]),
          reponses: [
            { question: "a)", attendu: "0,9" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "14" },
            { question: "d)", attendu: "7" },
          ],
          correction:
            "a) Baisse de 10 % : $q = 0{,}9$.\nb) $5\\,000 \\div 20\\,000 = 0{,}25$.\nc) $0{,}9^n < 0{,}25$. $\\log(0{,}9)$ est négatif, le sens change : $n > \\dfrac{-0{,}6021}{-0{,}0458} \\approx 13{,}1$. Le premier entier au-dessus est 14.\nd) $0{,}8^n < 0{,}25$ : $n > \\dfrac{-0{,}6021}{-0{,}0969} \\approx 6{,}2$. Le premier entier est 7.\n⛔ Le piège au c) : garder le signe « < » et écrire $n < 13{,}1$. On a divisé par un nombre négatif, et il faut attendre assez longtemps pour que la dette baisse : $n$ doit être grand.\nRéponse : a) 0,9 ; b) 0,25 ; c) 14 ans ; d) 7 ans.",
          micros: ["logT_nombre_annuites"],
        },
        {
          titre: "La parcelle du forestier",
          enonce:
            "Un forestier suit le volume de bois d'une parcelle, qui augmente de 7 % par an (modèle). La courbe donne le coefficient cumulé $y = 1{,}07^x$, avec le seuil $y = 2$. On donne $\\log(2) \\approx 0{,}3010$, $\\log(1{,}07) \\approx 0{,}0294$ et $\\log(1{,}05) \\approx 0{,}0212$.\na) Calcule le temps de doublement, arrondi au dixième.\nb) Au bout de combien d'années ENTIÈRES le volume aura-t-il dépassé le double ?\nc) Sur une autre parcelle, la hausse est de 5 % par an. Calcule son temps de doublement, arrondi au dixième.\nd) Combien d'années de plus lui faut-il ? Arrondis au dixième.",
          figure: repere(
            [-1, 13, -1, 3],
            [{ pts: [[0, 1], [1, 1.07], [2, 1.14], [3, 1.23], [4, 1.31], [5, 1.4], [6, 1.5], [7, 1.61], [8, 1.72], [9, 1.84], [10, 1.97], [11, 2.1], [12, 2.25], [13, 2.41]] }],
            [],
            2,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "10,2", tolerance: 0.05 },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "14,2", tolerance: 0.05 },
            { question: "d)", attendu: "4", tolerance: 0.05 },
          ],
          correction:
            "a) $x = \\dfrac{\\log(2)}{\\log(1{,}07)} \\approx \\dfrac{0{,}3010}{0{,}0294} \\approx 10{,}2$ ans. La courbe croise bien le seuil juste après 10.\nb) Le premier entier au-dessus de 10,2 est 11.\nc) $x = \\dfrac{\\log(2)}{\\log(1{,}05)} \\approx \\dfrac{0{,}3010}{0{,}0212} \\approx 14{,}2$ ans.\nd) $14{,}2 - 10{,}2 = 4$ ans.\n⛔ Le piège au b) : répondre 10 en arrondissant. Au bout de 10 ans, le coefficient n'est que de $1{,}07^{10} \\approx 1{,}97$ : la courbe est encore sous le seuil.\nRéponse : a) 10,2 ; b) 11 ; c) 14,2 ; d) 4.",
          micros: ["logT_temps_doublement", "logT_nombre_annuites"],
        },
        {
          titre: "Les grains de l'échiquier",
          enonce:
            "Un animateur de ludothèque raconte une légende : on pose 1 grain de riz sur la première case d'un échiquier, 2 sur la deuxième, 4 sur la troisième, et on double à chaque case. La case numéro $c$ porte $2^{c-1}$ grains. On donne $\\log(2) \\approx 0{,}3010$.\na) La dernière case est la 64ᵉ. Quel est l'exposant de 2 pour cette case ?\nb) Calcule le logarithme du nombre de grains de cette case, arrondi au centième.\nc) Combien de chiffres compte ce nombre de grains ?\nd) Combien de chiffres compte le nombre de grains de la case 40 ?",
          reponses: [
            { question: "a)", attendu: "63" },
            { question: "b)", attendu: "18,96", exact: true },
            { question: "c)", attendu: "19" },
            { question: "d)", attendu: "12" },
          ],
          correction:
            "a) $c - 1 = 64 - 1 = 63$.\nb) $\\log(2^{63}) = 63\\log(2) \\approx 63 \\times 0{,}3010 = 18{,}963$, soit 18,96.\nc) La partie entière est 18, donc $18 + 1 = 19$ chiffres.\nd) La case 40 porte $2^{39}$ grains : $39 \\times 0{,}3010 = 11{,}739$. La partie entière est 11, donc $11 + 1 = 12$ chiffres.\n⛔ Le piège au d) : prendre $2^{40}$. La première case porte $2^0$, donc l'exposant vaut toujours un de moins que le numéro.\nRéponse : a) 63 ; b) 18,96 ; c) 19 ; d) 12.",
          micros: ["logT_nombre_de_chiffres"],
        },
        {
          titre: "La brasserie",
          enonce:
            "Une brasseuse réalise 250 k€ de chiffre d'affaires, et 12 % de plus chaque année (modèle). Elle vise 1 000 k€.\na) Par quel coefficient le chiffre d'affaires est-il multiplié chaque année ?\nb) À l'aide du tableau, calcule le temps de doublement, arrondi au dixième.\nc) Calcule le quotient de l'objectif par le départ.\nd) Au bout de combien d'années ENTIÈRES dépassera-t-elle 1 000 k€ ?",
          figure: grille(["x", "1,12", "1,2", "2", "4"], [["log(x)", "0,0492", "0,0792", "0,3010", "0,6021"]]),
          reponses: [
            { question: "a)", attendu: "1,12" },
            { question: "b)", attendu: "6,1", tolerance: 0.05 },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "13" },
          ],
          correction:
            "a) Hausse de 12 % : $q = 1{,}12$.\nb) $x = \\dfrac{\\log(2)}{\\log(1{,}12)} \\approx \\dfrac{0{,}3010}{0{,}0492} \\approx 6{,}1$ ans.\nc) $1\\,000 \\div 250 = 4$.\nd) $1{,}12^n > 4$ : $n > \\dfrac{\\log(4)}{\\log(1{,}12)} \\approx \\dfrac{0{,}6021}{0{,}0492} \\approx 12{,}2$. Le premier entier est 13.\nCohérent : quadrupler, c'est doubler deux fois, soit $2 \\times 6{,}1 = 12{,}2$ ans.\n⛔ Le piège au d) : répondre 12. Au bout de 12 ans, l'objectif n'est pas encore atteint, il manque 0,2 an.\nRéponse : a) 1,12 ; b) 6,1 ; c) 4 ; d) 13.",
          micros: ["logT_nombre_annuites", "logT_temps_doublement"],
        },
      ],
    },
  ],
};
