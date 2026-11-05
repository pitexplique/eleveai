// ─── Fiche d'exercices : somme des premiers termes (STMG, Tle) — 20 exercices ──
//
// Notion suite_somme du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts`). Comme le coach,
// la feuille écrit les sommes EN EXTENSION, u(0) + u(1) + … + u(5), jamais « la
// somme des 6 premiers termes » (ambigu), et le travail du signe Σ reste simple :
// k, k², k³, 1/k. Formules du coach : nombre de termes × (premier + dernier) ÷ 2,
// et u(0) × (q^N − 1) ÷ (q − 1), N étant le NOMBRE de termes. Il compte les termes
// (de u(0) à u(n), il y en a n + 1) et départage les deux formules.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8 et 13) ; natation (maître-nageuse),
// théâtre (scénographe), réseaux sociaux (community manager), correction d'une
// copie (professeur), art (plasticienne, ex. 14), reboisement (forestier), grande
// surface (gestionnaire de stock), marathon (Enzo), collecte de dons (bénévole),
// énergie (chargée d'études), maquette (architecte).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suiteT_somme_notation (1, 2, 3, 4, 13, 14, 20),
// suiteT_somme_arithmetique (5, 6, 7, 9, 10, 16, 17, 19), suiteT_somme_geometrique
// (8, 11, 12, 15, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

export const exercicesSuiteSommeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-somme",
  titre: "Somme des premiers termes d'une suite",
  accroche:
    "Vingt exercices pour additionner sans tout écrire : lire et écrire une somme avec le signe Σ, compter les termes sans en oublier un, puis appliquer la bonne formule, arithmétique ou géométrique. L'entraînement d'un marathonien, les sièges d'un théâtre, une collecte de dons, des arbres plantés, une pyramide de cubes. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire le signe somme, compter les termes, ou appliquer une formule.",
      rappel: [
        "$\\displaystyle\\sum_{k=1}^{3} k^2$ se lit : on additionne $k^2$ pour $k$ allant de 1 à 3, le 3 INCLUS.",
        "De $u(0)$ à $u(n)$, il y a $n + 1$ termes. De $u(p)$ à $u(n)$, il y en a $n - p + 1$.",
        "Suite arithmétique : $S = N \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$, où $N$ est le nombre de termes.",
        "Suite géométrique : $S = u(0) \\times \\dfrac{q^N - 1}{q - 1}$, où $N$ est le nombre de termes.",
      ],
      exercices: [
        {
          enonce: "Calcule $\\displaystyle\\sum_{k=1}^{4} k^2$.",
          reponses: [{ attendu: "30" }],
          correction:
            "On remplace $k$ par 1, 2, 3, 4, puis on additionne.\n$1 + 4 + 9 + 16 = 30$.\n⛔ Le piège : calculer seulement $4^2 = 16$. Le signe $\\Sigma$ demande d'additionner TOUS les termes.\nRéponse : 30.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce: "Calcule $\\displaystyle\\sum_{k=1}^{5} k$.",
          reponses: [{ attendu: "15" }],
          correction:
            "$1 + 2 + 3 + 4 + 5 = 15$.\n⛔ Le piège : s'arrêter à 4, ce qui donne 10. La borne du haut est incluse.\nRéponse : 15.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce: "Calcule $\\displaystyle\\sum_{k=2}^{6} k$.",
          reponses: [{ attendu: "20" }],
          correction:
            "La borne du bas dit où l'on commence : à $k = 2$.\n$2 + 3 + 4 + 5 + 6 = 20$.\n⛔ Le piège : commencer à 1 par habitude, ce qui donne 21.\nRéponse : 20.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce:
            "On veut écrire $3 + 4 + 5 + 6 + 7$ sous la forme $\\displaystyle\\sum_{k=\\dots}^{\\dots} k$.\na) Quelle est la borne du bas ?\nb) Quelle est la borne du haut ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "7" },
          ],
          correction:
            "a) La borne du bas est le premier indice : 3.\nb) La borne du haut est le dernier indice, inclus : 7.\nLa somme s'écrit $\\displaystyle\\sum_{k=3}^{7} k$.\n⛔ Le piège au b) : écrire 6, en excluant le dernier terme. La somme perdrait le 7.\nRéponse : a) 3 ; b) 7.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce:
            "Combien y a-t-il de termes dans $u(0) + u(1) + \\dots + u(9)$ ?",
          reponses: [{ attendu: "10" }],
          correction:
            "De 0 à 9, il y a $9 - 0 = 9$ pas.\nOn ajoute 1 pour compter le terme de départ : $9 + 1 = 10$ termes.\n⛔ Le piège : répondre 9. $u(0)$ compte pour un terme.\nRéponse : 10.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          enonce:
            "Le tableau donne les termes d'une suite arithmétique. Calcule $u(0) + u(1) + u(2) + u(3) + u(4)$ à l'aide de la formule.",
          figure: tableau(["n", "0", "1", "2", "3", "4"], ["u(n)", 5, 8, 11, 14, 17]),
          reponses: [{ attendu: "55" }],
          correction:
            "Il y a 5 termes, le premier vaut 5 et le dernier 17.\n$S = 5 \\times \\dfrac{5 + 17}{2} = 5 \\times 11 = 55$.\nVérification : $5 + 8 + 11 + 14 + 17 = 55$. ✔\n⛔ Le piège : prendre $N = 4$ en lisant le dernier rang. Cela donne 44.\nRéponse : 55.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          enonce:
            "Combien y a-t-il de termes ?\na) $u(1) + u(2) + \\dots + u(12)$\nb) $u(3) + u(4) + \\dots + u(10)$",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "8" },
          ],
          correction:
            "a) $12 - 1 + 1 = 12$ termes.\nb) $10 - 3 + 1 = 8$ termes.\n⛔ Le piège au b) : répondre 7 ($10 - 3$). Cela compte les pas, pas les termes.\nRéponse : a) 12 ; b) 8.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          enonce:
            "Une suite géométrique a pour premier terme $u(0) = 3$ et pour raison $q = 2$. Calcule $u(0) + u(1) + u(2) + u(3)$ à l'aide de la formule.",
          reponses: [{ attendu: "45" }],
          correction:
            "Il y a 4 termes.\n$S = 3 \\times \\dfrac{2^4 - 1}{2 - 1} = 3 \\times \\dfrac{15}{1} = 45$.\nVérification : $3 + 6 + 12 + 24 = 45$. ✔\n⛔ Le piège : mettre l'exposant 3, le dernier rang. L'exposant est le NOMBRE de termes.\nRéponse : 45.",
          micros: ["suiteT_somme_geometrique"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : reconnaître la suite, compter les termes, choisir la bonne formule.",
      rappel: [
        "On identifie d'abord la nature de la suite : on ajoute ou on multiplie. Ensuite seulement, on choisit la formule.",
        "Le dernier terme d'une suite arithmétique se calcule : $u(n) = u(0) + n \\times r$.",
        "La formule arithmétique suppose un écart constant. Sur une suite géométrique, elle donne un résultat faux, sans le signaler.",
      ],
      exercices: [
        {
          enonce:
            "Une maître-nageuse prépare un plan d'entraînement : 10 longueurs par séance la première semaine, puis 2 de plus chaque semaine. On note $u(0) = 10$. Le plan dure 8 semaines, de $u(0)$ à $u(7)$. On additionne une séance par semaine.\na) Combien de longueurs la dernière semaine ?\nb) Combien de termes faut-il additionner ?\nc) Combien de longueurs en tout ?",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "136" },
          ],
          correction:
            "a) $u(7) = 10 + 7 \\times 2 = 24$ longueurs.\nb) De $u(0)$ à $u(7)$ : $7 + 1 = 8$ termes.\nc) $S = 8 \\times \\dfrac{10 + 24}{2} = 8 \\times 17 = 136$ longueurs.\n⛔ Le piège au a) : calculer $10 + 8 \\times 2 = 26$. Il n'y a que 7 pas entre la première et la dernière semaine.\nRéponse : a) 24 ; b) 8 ; c) 136 longueurs.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          enonce:
            "Un scénographe dessine un théâtre : 18 sièges au rang 1, et 2 de plus à chaque rang. Il y a 15 rangs : on additionne $u(1) + u(2) + \\dots + u(15)$.\na) Combien de sièges au rang 15 ?\nb) Combien de sièges en tout ?",
          reponses: [
            { question: "a)", attendu: "46" },
            { question: "b)", attendu: "480" },
          ],
          correction:
            "a) Du rang 1 au rang 15, il y a 14 pas : $18 + 14 \\times 2 = 46$ sièges.\nb) 15 termes : $S = 15 \\times \\dfrac{18 + 46}{2} = 15 \\times 32 = 480$ sièges.\n⛔ Le piège au a) : compter 15 pas, ce qui donne 48. La suite commence ici à $u(1)$.\nRéponse : a) 46 ; b) 480.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          enonce:
            "Un community manager lance un message : 5 personnes le reçoivent, puis le nombre de nouveaux lecteurs est multiplié par 3 à chaque étape (modèle). On note $u(0) = 5$.\na) Combien de termes dans $u(0) + u(1) + u(2) + u(3) + u(4)$ ?\nb) Calcule cette somme avec la formule.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "605" },
          ],
          correction:
            "a) 5 termes.\nb) $S = 5 \\times \\dfrac{3^5 - 1}{3 - 1} = 5 \\times \\dfrac{242}{2} = 5 \\times 121 = 605$.\nVérification : $5 + 15 + 45 + 135 + 405 = 605$. ✔\n⛔ Le piège au b) : diviser par 3 au lieu de $3 - 1$. Le dénominateur de la formule est $q - 1$.\nRéponse : a) 5 ; b) 605 lecteurs.",
          micros: ["suiteT_somme_geometrique"],
        },
        {
          enonce:
            "Un professeur corrige une copie. Pour calculer $u(0) + \\dots + u(5)$ d'une suite géométrique de premier terme 4 et de raison 2, un élève écrit $6 \\times \\dfrac{4 + 128}{2} = 396$.\na) Où est l'erreur ? Réponds par la lettre.\nA : Il s'est trompé dans le nombre de termes.\nB : Il a utilisé la formule des suites arithmétiques.\nC : Il n'y a pas d'erreur.\nb) Quelle est la vraie somme ?",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "252" },
          ],
          correction:
            "a) Il y a bien 6 termes et $u(5) = 4 \\times 2^5 = 128$ est juste. Mais la demi-somme des extrêmes ne vaut que si l'on ajoute toujours la même chose.\nb) $S = 4 \\times \\dfrac{2^6 - 1}{2 - 1} = 4 \\times 63 = 252$.\nVérification : $4 + 8 + 16 + 32 + 64 + 128 = 252$. ✔\n⛔ Le piège : ne pas voir l'erreur, parce que le nombre obtenu a l'air plausible. On identifie la nature de la suite AVANT la formule.\nRéponse : a) B ; b) 252.",
          micros: ["suiteT_somme_geometrique"],
        },
        {
          enonce:
            "Calcule chaque somme.\na) $\\displaystyle\\sum_{k=1}^{4} k^3$\nb) $\\displaystyle\\sum_{k=1}^{4} \\dfrac{1}{k}$, arrondie au centième",
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "2,08", tolerance: 0.005 },
          ],
          correction:
            "a) $1 + 8 + 27 + 64 = 100$.\nb) $\\dfrac{1}{1} + \\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{4} = 1 + 0{,}5 + 0{,}333… + 0{,}25 \\approx 2{,}08$.\n⛔ Le piège au a) : lire $k^3$ comme $3k$, ce qui donne 30.\nRéponse : a) 100 ; b) 2,08.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce:
            "Pour une sculpture, une plasticienne empile 1 cube, puis 4, puis 9, puis 16, puis 25 cubes, soit $1 + 4 + 9 + 16 + 25$. On écrit cette somme avec le signe $\\Sigma$, en partant de $k = 1$.\na) Quelle est la borne du haut ?\nb) Quel terme écrit-on à droite du signe, en fonction de $k$ ?\nc) Combien de cubes en tout ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: ["k^2", "k au carré"] },
            { question: "c)", attendu: "55" },
          ],
          correction:
            "Les nombres sont les carrés : $1^2$, $2^2$, $3^2$, $4^2$, $5^2$.\na) Le dernier carré est celui de 5 : la borne du haut est 5.\nb) Chaque terme est $k^2$. La somme s'écrit $\\displaystyle\\sum_{k=1}^{5} k^2$.\nc) $1 + 4 + 9 + 16 + 25 = 55$.\n⛔ Le piège au a) : écrire 25, le dernier terme. La borne est la dernière valeur de $k$, pas la dernière valeur du terme.\nRéponse : a) 5 ; b) $k^2$ ; c) 55 cubes.",
          micros: ["suiteT_somme_notation"],
        },
        {
          enonce:
            "Un forestier plante 200 arbres la première année, et le nombre d'arbres plantés augmente de 50 % chaque année (modèle). On note $u(0) = 200$. Combien d'arbres plante-t-il en tout sur les quatre années, soit $u(0) + u(1) + u(2) + u(3)$ ?",
          reponses: [{ attendu: "1 625" }],
          correction:
            "Une hausse de 50 % donne $q = 1{,}5$. Il y a 4 termes.\n$S = 200 \\times \\dfrac{1{,}5^4 - 1}{1{,}5 - 1} = 200 \\times \\dfrac{4{,}0625}{0{,}5} = 200 \\times 8{,}125 = 1\\,625$.\nVérification : $200 + 300 + 450 + 675 = 1\\,625$. ✔\n⛔ Le piège : diviser par $q$ au lieu de $q - 1$.\nRéponse : 1 625 arbres.",
          micros: ["suiteT_somme_geometrique"],
        },
        {
          enonce:
            "Une gestionnaire de stock d'une grande surface écoule 500 articles le premier mois, puis 30 de moins chaque mois (modèle). On note $u(0) = 500$.\na) Que vaut $u(10)$ ?\nb) Combien d'articles écoulés au total, de $u(0)$ à $u(10)$ ?",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "3 850" },
          ],
          correction:
            "a) La raison est négative : $u(10) = 500 + 10 \\times (-30) = 200$.\nb) De $u(0)$ à $u(10)$ : 11 termes. $S = 11 \\times \\dfrac{500 + 200}{2} = 11 \\times 350 = 3\\,850$.\n⛔ Le piège au b) : prendre 10 termes, ce qui donne 3 500. $u(0)$ compte.\nRéponse : a) 200 ; b) 3 850 articles.",
          micros: ["suiteT_somme_arithmetique"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on écrit la somme, on compte les termes, on calcule, on répond à la question.",
      rappel: [
        "On écrit d'abord la somme en extension, de $u(0)$ au dernier terme demandé.",
        "Un total à comparer à un objectif : on calcule la somme, puis on compare.",
        "Une pyramide de carrés : le nombre de cubes de l'étage $k$ est $k^2$, et le total est une somme de carrés.",
      ],
      exercices: [
        {
          titre: "L'entraînement d'Enzo",
          enonce:
            "Enzo prépare un marathon. Il court 12 km la première semaine, puis 1,5 km de plus chaque semaine, pendant 16 semaines. On note $u(0) = 12$, et son plan va jusqu'à $u(15)$. Son objectif : plus de 400 km en tout.\na) Combien court-il la dernière semaine ?\nb) Combien de termes faut-il additionner ?\nc) Combien de kilomètres en tout ?\nd) Atteint-il son objectif ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "34,5 km" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "372 km" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $u(15) = 12 + 15 \\times 1{,}5 = 34{,}5$ km.\nb) De $u(0)$ à $u(15)$ : 16 termes.\nc) $S = 16 \\times \\dfrac{12 + 34{,}5}{2} = 16 \\times 23{,}25 = 372$ km.\nd) 372 est moins que 400 : l'objectif n'est pas atteint.\n⛔ Le piège au a) : calculer $12 + 16 \\times 1{,}5 = 36$. Il y a 15 pas entre la première et la seizième semaine.\nRéponse : a) 34,5 km ; b) 16 ; c) 372 km ; d) non.",
          micros: ["suiteT_somme_arithmetique"],
        },
        {
          titre: "La collecte de dons",
          enonce:
            "Une bénévole lance une collecte : 200 € la première semaine, et le montant double chaque semaine (modèle). On note $u(0) = 200$. L'objectif est de 10 000 € au total.\na) Calcule le total des 5 premières semaines, soit $u(0) + \\dots + u(4)$.\nb) Calcule le total des 6 premières semaines, soit $u(0) + \\dots + u(5)$.\nc) Combien de semaines faut-il au minimum pour atteindre l'objectif ?",
          reponses: [
            { question: "a)", attendu: "6 200 €" },
            { question: "b)", attendu: "12 600 €" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "La suite est géométrique de raison 2.\na) $S = 200 \\times \\dfrac{2^5 - 1}{2 - 1} = 200 \\times 31 = 6\\,200$ €.\nb) $S = 200 \\times \\dfrac{2^6 - 1}{2 - 1} = 200 \\times 63 = 12\\,600$ €.\nc) 6 200 € est sous 10 000 €, 12 600 € le dépasse : il faut 6 semaines.\n⛔ Le piège au c) : regarder le don d'une seule semaine ($u(5) = 6\\,400$ €) au lieu du total.\nRéponse : a) 6 200 € ; b) 12 600 € ; c) 6 semaines.",
          micros: ["suiteT_somme_geometrique"],
        },
        {
          titre: "Deux sites d'énergie",
          enonce:
            "Une chargée d'études compare deux sites, sur 8 ans (de $u(0)$ à $u(7)$, modèles). Le site A produit 1 000 MWh la première année, puis 200 MWh de plus chaque année. Le site B produit 500 MWh la première année, puis 50 % de plus chaque année.\na) Quelle est la production de A la dernière année ?\nb) Quelle est la production totale de A ?\nc) Quelle est la production totale de B, à l'unité près ?\nd) Quel site produit le plus sur les 8 ans ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "2 400" },
            { question: "b)", attendu: "13 600" },
            { question: "c)", attendu: "24 629", tolerance: 0.5 },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "a) $u(7) = 1\\,000 + 7 \\times 200 = 2\\,400$ MWh.\nb) Arithmétique, 8 termes : $S = 8 \\times \\dfrac{1\\,000 + 2\\,400}{2} = 13\\,600$ MWh.\nc) Géométrique de raison 1,5, 8 termes : $S = 500 \\times \\dfrac{1{,}5^8 - 1}{1{,}5 - 1} \\approx 24\\,628{,}9$, soit environ $24\\,629$ MWh.\nd) B produit le plus, bien qu'il parte deux fois plus bas.\n⛔ Le piège au c) : appliquer la formule arithmétique à B : $u(7) \\approx 8\\,543$, et $8 \\times (500 + 8\\,543) \\div 2 \\approx 36\\,172$. Bien trop.\nRéponse : a) 2 400 MWh ; b) 13 600 MWh ; c) 24 629 MWh ; d) B.",
          micros: ["suiteT_somme_arithmetique", "suiteT_somme_geometrique"],
        },
        {
          titre: "La pyramide de cubes",
          enonce:
            "Pour une maquette, un architecte construit une pyramide de cubes : 1 cube au sommet, puis 4, puis 9, et ainsi de suite. Le nombre de cubes de l'étage $k$ est $k^2$.\na) Combien de cubes à l'étage 6 ?\nb) Calcule $\\displaystyle\\sum_{k=1}^{6} k^2$, le total pour 6 étages.\nc) Combien faut-il de cubes pour 7 étages ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "91" },
            { question: "c)", attendu: "140" },
          ],
          correction:
            "a) $6^2 = 36$ cubes.\nb) $1 + 4 + 9 + 16 + 25 + 36 = 91$ cubes.\nc) On ajoute l'étage 7 : $91 + 7^2 = 91 + 49 = 140$ cubes.\n⛔ Le piège au b) : calculer $6 \\times 36 = 216$, comme si tous les étages avaient 36 cubes.\nRéponse : a) 36 ; b) 91 ; c) 140.",
          micros: ["suiteT_somme_notation"],
        },
      ],
    },
  ],
};
