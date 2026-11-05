// ─── Fiche d'exercices : loi binomiale, calculer (STMG, terminale) — 20 exercices ─
//
// Notion va_binomiale_calcul du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// demande, au millième : P(X = 0), P(X = n), P(X = n − 1) et P(X = 1) ; P(X = k) avec
// le coefficient lu dans le triangle de Pascal (⛔ jamais de factorielle) ; l'écriture
// de l'expression ; « au moins un » et « au moins deux » par le contraire ; E(X) = np,
// son interprétation, et le paramètre p retrouvé à partir de E(X) et de n.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives.
//
// Domaines et métiers : deux calculs nus (ex. 1 et 2) ; bricolage (artisan),
// tennis de table (Camille), jardinerie (vendeur), crèche (auxiliaire), circulation
// (automobiliste), agroalimentaire (diététicienne), climatisation (frigoriste),
// handball (entraîneuse), mairie (attachée), radiologie (radiologue), réseau
// informatique (administratrice), hôtellerie (réceptionniste), tri des déchets
// (agent de tri), saut à la perche (Ethan), laboratoire (laborantine), football
// (gardienne), association (bénévole), bornes de recharge (gestionnaire).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Tolérance : une demi-unité du millième (0,0005). Aux ex. 13 c) et 17 c), un calcul
// repris des valeurs arrondies donne 0,262 et 0,082 : l'énoncé demande donc les
// valeurs non arrondies, et ces deux réponses sont refusées.
//
// Micro-compétences : vaT_bin_extremes (1, 2, 3, 4, 5, 9, 12, 13, 16, 17, 18, 19, 20),
// vaT_bin_pk (6, 10, 11, 18, 19), vaT_bin_reunion (7, 9, 12, 13, 16, 17, 18, 19, 20),
// vaT_bin_esperance (8, 14, 15, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesVaBinomialeCalculStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-binomiale-calcul",
  titre: "Loi binomiale : calculer",
  accroche:
    "Vingt exercices pour calculer avec une loi binomiale : aucun succès, tous les succès, un seul échec, exactement k succès avec le coefficient du triangle de Pascal, « au moins un » et « au moins deux » par le contraire, et l'espérance. Des tirs au but, des tubes de laboratoire, des bornes de recharge, des serveurs informatiques. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : une seule valeur à calculer, à la calculatrice. On arrondit quand l'énoncé le demande.",
      rappel: [
        "$P(X = k) = \\binom{n}{k} \\times p^{k} \\times (1-p)^{n-k}$ : le coefficient se lit dans le triangle de Pascal, l'exposant de $p$ compte les succès.",
        "Un seul chemin pour les extrêmes : $P(X = 0) = (1-p)^{n}$ et $P(X = n) = p^{n}$.",
        "$n$ chemins pour un seul succès ou un seul échec : $P(X = 1) = n \\times p \\times (1-p)^{n-1}$ et $P(X = n-1) = n \\times p^{n-1} \\times (1-p)$.",
        "« Au moins un » : $P(X \\geqslant 1) = 1 - P(X = 0)$. L'espérance : $E(X) = np$.",
      ],
      exercices: [
        {
          enonce: "$X$ suit la loi $\\mathcal{B}(3\\,;\\,0{,}2)$. Calcule $P(X = 0)$.",
          reponses: [{ attendu: "0,512" }],
          correction:
            "Aucun succès : un seul chemin, EEE.\nChaque échec a la probabilité $1 - 0{,}2 = 0{,}8$.\n$P(X = 0) = 0{,}8^{3} = 0{,}512$.\n⛔ Le piège : calculer $0{,}2^{3} = 0{,}008$. C'est $P(X = 3)$, trois succès.\nRéponse : 0,512.",
          micros: ["vaT_bin_extremes"],
        },
        {
          enonce: "$X$ suit la loi $\\mathcal{B}(3\\,;\\,0{,}5)$. Calcule $P(X = 3)$.",
          reponses: [{ attendu: "0,125" }],
          correction:
            "Que des succès : un seul chemin, SSS.\n$P(X = 3) = 0{,}5^{3} = 0{,}125$.\n⛔ Le piège : calculer $3 \\times 0{,}5 = 1{,}5$. L'exposant n'est pas un facteur, et une probabilité ne dépasse pas $1$.\nRéponse : 0,125.",
          micros: ["vaT_bin_extremes"],
        },
        {
          enonce:
            "Un artisan prend $5$ vis au hasard, de façon indépendante. Chacune est tordue avec la probabilité $0{,}4$ (modèle). Quelle est la probabilité qu'aucune ne soit tordue ? Arrondis au millième.",
          reponses: [{ attendu: "0,078", tolerance: 0.0005 }],
          correction:
            "$X$ suit la loi $\\mathcal{B}(5\\,;\\,0{,}4)$ et on cherche $P(X = 0)$.\n$P(X = 0) = 0{,}6^{5} = 0{,}07776 \\approx 0{,}078$.\n⛔ Le piège : écrire $0{,}4^{5}$. « Aucune tordue », c'est cinq fois l'échec, de probabilité $0{,}6$.\nRéponse : 0,078.",
          micros: ["vaT_bin_extremes"],
        },
        {
          enonce:
            "Camille joue $3$ services au tennis de table, de façon indépendante. Chacun est gagnant avec la probabilité $0{,}6$ (modèle). Calcule $P(X = 2)$, où $X$ compte les services gagnants.",
          reponses: [{ attendu: "0,432" }],
          correction:
            "$2$ succès sur $3$, c'est un seul échec : il peut tomber à $3$ places, donc $3$ chemins.\n$P(X = 2) = 3 \\times 0{,}6^{2} \\times 0{,}4 = 3 \\times 0{,}36 \\times 0{,}4 = 0{,}432$.\n⛔ Le piège : oublier le coefficient et trouver $0{,}144$. C'est la probabilité d'UN seul chemin.\nRéponse : 0,432.",
          micros: ["vaT_bin_extremes"],
        },
        {
          enonce:
            "Un vendeur de jardinerie conseille $4$ clients, de façon indépendante. Chacun achète un rosier avec la probabilité $0{,}2$ (modèle). Calcule $P(X = 1)$, où $X$ compte les clients qui en achètent un. Arrondis au millième.",
          reponses: [{ attendu: "0,41", tolerance: 0.0005 }],
          correction:
            "Un seul succès peut tomber à $4$ places, donc $4$ chemins.\n$P(X = 1) = 4 \\times 0{,}2 \\times 0{,}8^{3} = 4 \\times 0{,}2 \\times 0{,}512 = 0{,}4096 \\approx 0{,}410$.\n⛔ Le piège : oublier le $4$ et trouver $0{,}102$.\nRéponse : 0,410.",
          micros: ["vaT_bin_extremes"],
        },
        {
          enonce:
            "Une auxiliaire de crèche observe $4$ enfants, de façon indépendante. Chacun fait la sieste plus d'une heure avec la probabilité $0{,}3$ (modèle). $X$ compte ces enfants. On lit $\\binom{4}{2} = 6$ dans le triangle. Calcule $P(X = 2)$. Arrondis au millième.",
          reponses: [{ attendu: "0,265", tolerance: 0.0005 }],
          correction:
            "$2$ succès et $2$ échecs : $P(X = 2) = \\binom{4}{2} \\times 0{,}3^{2} \\times 0{,}7^{2}$.\n$P(X = 2) = 6 \\times 0{,}09 \\times 0{,}49 = 0{,}2646 \\approx 0{,}265$.\n⛔ Le piège : oublier le coefficient et trouver $0{,}044$. Il y a $6$ chemins, pas un seul.\nRéponse : 0,265.",
          micros: ["vaT_bin_pk"],
        },
        {
          enonce:
            "Un automobiliste passe $3$ feux tricolores indépendants. Chacun est rouge avec la probabilité $0{,}1$ (modèle). Quelle est la probabilité de rencontrer au moins un feu rouge ?",
          reponses: [{ attendu: "0,271" }],
          correction:
            "« Au moins un » est le contraire de « aucun ».\n$P(X = 0) = 0{,}9^{3} = 0{,}729$.\n$P(X \\geqslant 1) = 1 - 0{,}729 = 0{,}271$.\n⛔ Le piège : additionner $0{,}1 + 0{,}1 + 0{,}1 = 0{,}3$. Cette addition compte plusieurs fois les cas où plusieurs feux sont rouges.\nRéponse : 0,271.",
          micros: ["vaT_bin_reunion"],
        },
        {
          enonce:
            "Une diététicienne analyse $50$ yaourts, de façon indépendante. Chacun est trop sucré avec la probabilité $0{,}2$ (modèle). $X$ compte les yaourts trop sucrés. Calcule $E(X)$.",
          reponses: [{ attendu: "10" }],
          correction:
            "Pour une loi binomiale, $E(X) = np$.\n$E(X) = 50 \\times 0{,}2 = 10$.\nC'est une moyenne sur un grand nombre de séries, pas une prévision pour une série.\n⛔ Le piège : ajouter $50 + 0{,}2$. L'espérance est un produit.\nRéponse : 10.",
          micros: ["vaT_bin_esperance"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : poser n et p, écrire le calcul, arrondir seulement à la fin.",
      rappel: [
        "On écrit d'abord $n$, $p$ et l'évènement cherché. On arrondit seulement à la fin du calcul.",
        "« Au moins deux » : le contraire est « aucun OU exactement un », donc $P(X \\geqslant 2) = 1 - P(X = 0) - P(X = 1)$.",
        "L'expression de $P(X = k)$ contient trois choses : le coefficient, $p$ avec l'exposant $k$, et $1-p$ avec l'exposant $n-k$.",
        "$E(X) = np$ se lit dans les deux sens : si l'on connaît $E(X)$ et $n$, alors $p = E(X) \\div n$.",
      ],
      exercices: [
        {
          enonce:
            "Un frigoriste entretient $5$ climatiseurs, de façon indépendante. Chacun tombe en panne dans l'année avec la probabilité $0{,}1$ (modèle). Arrondis au millième.\na) Quelle est la probabilité qu'aucun ne tombe en panne ?\nb) Quelle est la probabilité qu'au moins un tombe en panne ?",
          reponses: [
            { question: "a)", attendu: "0,59", tolerance: 0.0005 },
            { question: "b)", attendu: "0,41", tolerance: 0.0005 },
          ],
          correction:
            "$X$ suit la loi $\\mathcal{B}(5\\,;\\,0{,}1)$.\na) $P(X = 0) = 0{,}9^{5} = 0{,}59049 \\approx 0{,}590$.\nb) $P(X \\geqslant 1) = 1 - 0{,}59049 = 0{,}40951 \\approx 0{,}410$.\n⛔ Le piège au a) : calculer $0{,}1^{5}$. Ce serait la probabilité que les cinq tombent en panne.\nRéponse : a) 0,590 ; b) 0,410.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion"],
        },
        {
          enonce:
            "Une entraîneuse de handball fait tirer $6$ jets de sept mètres, de façon indépendante. Chacun est manqué avec la probabilité $0{,}3$ (modèle). $X$ compte les jets manqués. Quelle expression donne $P(X = 2)$ ? Écris la lettre.\nA : $\\binom{6}{2} \\times 0{,}3^{2} \\times 0{,}7^{4}$\nB : $\\binom{6}{2} \\times 0{,}3^{4} \\times 0{,}7^{2}$\nC : $\\binom{6}{2} \\times 0{,}3^{2}$\nD : $0{,}3^{2} \\times 0{,}7^{4}$",
          reponses: [{ attendu: "A" }],
          correction:
            "On vérifie trois choses.\nLe coefficient est présent : cela écarte D.\nLes échecs sont présents : cela écarte C.\nL'exposant de $p = 0{,}3$ est le nombre de succès, $2$ : cela écarte B.\n⛔ Le piège : choisir D. Cette expression ne donne la probabilité que d'UN chemin sur $15$.\nRéponse : A.",
          micros: ["vaT_bin_pk"],
        },
        {
          enonce:
            "Une attachée de mairie interroge $5$ habitants, de façon indépendante. Chacun approuve un projet avec la probabilité $0{,}4$ (modèle). $X$ compte les habitants qui approuvent.\na) Lis $\\binom{5}{3}$ dans le triangle : la ligne $5$ est $1$, $5$, $10$, $10$, $5$, $1$.\nb) Calcule $P(X = 3)$, arrondi au millième.",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "0,23", tolerance: 0.0005 },
          ],
          correction:
            "a) Colonne $3$ de la ligne $5$ : $\\binom{5}{3} = 10$.\nb) $3$ succès et $2$ échecs : $10 \\times 0{,}4^{3} \\times 0{,}6^{2} = 10 \\times 0{,}064 \\times 0{,}36 = 0{,}2304 \\approx 0{,}230$.\n⛔ Le piège au b) : intervertir les exposants et calculer $10 \\times 0{,}4^{2} \\times 0{,}6^{3}$. L'exposant de $0{,}4$ compte les succès.\nRéponse : a) 10 ; b) 0,230.",
          micros: ["vaT_bin_pk"],
        },
        {
          enonce:
            "Une radiologue reçoit $6$ patients, de façon indépendante. Chacun a besoin d'un second cliché avec la probabilité $0{,}25$ (modèle). $X$ compte ces patients. Arrondis au millième.\na) Calcule $P(X = 0)$.\nb) Calcule la probabilité qu'au moins un patient ait besoin d'un second cliché.",
          reponses: [
            { question: "a)", attendu: "0,178", tolerance: 0.0005 },
            { question: "b)", attendu: "0,822", tolerance: 0.0005 },
          ],
          correction:
            "$X$ suit la loi $\\mathcal{B}(6\\,;\\,0{,}25)$.\na) $P(X = 0) = 0{,}75^{6} \\approx 0{,}17798 \\approx 0{,}178$.\nb) $P(X \\geqslant 1) = 1 - 0{,}17798 \\approx 0{,}822$.\n⛔ Le piège au b) : additionner six fois $0{,}25$, ce qui donne $1{,}5$. Une probabilité ne dépasse jamais $1$.\nRéponse : a) 0,178 ; b) 0,822.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion"],
        },
        {
          enonce:
            "Une administratrice réseau suit $5$ serveurs, de façon indépendante. Chacun a une panne dans le mois avec la probabilité $0{,}2$ (modèle). $X$ compte les serveurs en panne. Arrondis au millième.\na) Calcule $P(X = 0)$.\nb) Calcule $P(X = 1)$.\nc) Calcule la probabilité qu'au moins deux serveurs soient en panne, en repartant des valeurs non arrondies.",
          reponses: [
            { question: "a)", attendu: "0,328", tolerance: 0.0005 },
            { question: "b)", attendu: "0,41", tolerance: 0.0005 },
            { question: "c)", attendu: "0,263", tolerance: 0.0005 },
          ],
          correction:
            "a) $P(X = 0) = 0{,}8^{5} = 0{,}32768 \\approx 0{,}328$.\nb) $P(X = 1) = 5 \\times 0{,}2 \\times 0{,}8^{4} = 0{,}4096 \\approx 0{,}410$.\nc) $P(X \\geqslant 2) = 1 - 0{,}32768 - 0{,}4096 = 0{,}26272 \\approx 0{,}263$.\n⛔ Le piège au c) : retrancher seulement $P(X = 0)$. Le contraire de « au moins deux » contient aussi « exactement un ».\nRéponse : a) 0,328 ; b) 0,410 ; c) 0,263.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion"],
        },
        {
          enonce:
            "Un réceptionniste suit $200$ réservations, de façon indépendante. Chacune est annulée avec la probabilité $0{,}05$ (modèle). $X$ compte les annulations.\na) Calcule $E(X)$.\nb) Sur des séries de $40$ réservations d'une autre saison, on relève en moyenne $6$ annulations par série. Retrouve la probabilité $p$ de cette saison.",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "0,15" },
          ],
          correction:
            "a) $E(X) = np = 200 \\times 0{,}05 = 10$.\nb) $E(X) = np$, donc $p = E(X) \\div n = 6 \\div 40 = 0{,}15$.\nVérification : $40 \\times 0{,}15 = 6$. ✔\n⛔ Le piège au b) : multiplier $6 \\times 40$. Ici, c'est $p$ qui manque : on divise.\nRéponse : a) 10 ; b) 0,15.",
          micros: ["vaT_bin_esperance"],
        },
        {
          enonce:
            "Un agent de tri examine des séries de $80$ objets. Le nombre d'objets recyclables par série suit la loi $\\mathcal{B}(80\\,;\\,p)$, et l'on en relève en moyenne $20$ par série (modèle).\na) Retrouve $p$.\nb) Combien d'objets recyclables peut-on attendre, en moyenne, dans une série de $200$ objets ?",
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "50" },
          ],
          correction:
            "a) $p = E(X) \\div n = 20 \\div 80 = 0{,}25$.\nb) $E = 200 \\times 0{,}25 = 50$.\n⛔ Le piège au b) : croire que $50$ arrivera à chaque série. C'est une moyenne sur un grand nombre de séries.\nRéponse : a) 0,25 ; b) 50.",
          micros: ["vaT_bin_esperance"],
        },
        {
          enonce:
            "Ethan, perchiste, tente $5$ sauts indépendants, réussis chacun avec la probabilité $0{,}7$ (modèle). $X$ compte les sauts réussis. Arrondis au millième.\na) Calcule $P(X = 5)$.\nb) Calcule $P(X = 4)$.\nc) Calcule la probabilité de réussir au moins $4$ sauts.",
          reponses: [
            { question: "a)", attendu: "0,168", tolerance: 0.0005 },
            { question: "b)", attendu: "0,36", tolerance: 0.0005 },
            { question: "c)", attendu: "0,528", tolerance: 0.0005 },
          ],
          correction:
            "a) Un seul chemin : $0{,}7^{5} = 0{,}16807 \\approx 0{,}168$.\nb) Un seul échec, à $5$ places possibles : $5 \\times 0{,}7^{4} \\times 0{,}3 = 0{,}36015 \\approx 0{,}360$.\nc) « Au moins $4$ », c'est $4$ ou $5$ : $0{,}36015 + 0{,}16807 = 0{,}52822 \\approx 0{,}528$.\n⛔ Le piège au b) : oublier le $5$ et trouver $0{,}072$. L'échec peut arriver à n'importe quel saut.\nRéponse : a) 0,168 ; b) 0,360 ; c) 0,528.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : poser la loi, calculer plusieurs probabilités, puis interpréter et décider.",
      rappel: [
        "On garde les valeurs exactes de la calculatrice pendant le calcul : on n'arrondit que le résultat final.",
        "Pour « au moins $k$ », on prend le chemin le plus court : le contraire s'il a moins de termes, sinon la somme.",
        "On compare deux situations avec les mêmes calculs, puis on conclut par une phrase ou un mot.",
      ],
      exercices: [
        {
          titre: "Les tubes du laboratoire",
          enonce:
            "Une laborantine reçoit des lots de $5$ tubes. Chaque tube est défectueux avec la probabilité $0{,}1$, de façon indépendante (modèle). $X$ compte les tubes défectueux d'un lot. Arrondis au millième.\na) Calcule $P(X = 0)$.\nb) Calcule $P(X = 1)$.\nc) Un lot est refusé s'il a au moins deux tubes défectueux. Quelle est la probabilité de refus ? Repars des valeurs non arrondies.\nd) Calcule $E(X)$.\ne) Combien de tubes défectueux peut-on attendre sur $1\\,000$ lots ?",
          reponses: [
            { question: "a)", attendu: "0,59", tolerance: 0.0005 },
            { question: "b)", attendu: "0,328", tolerance: 0.0005 },
            { question: "c)", attendu: "0,081", tolerance: 0.0005 },
            { question: "d)", attendu: "0,5" },
            { question: "e)", attendu: "500" },
          ],
          correction:
            "a) $0{,}9^{5} = 0{,}59049 \\approx 0{,}590$.\nb) $5 \\times 0{,}1 \\times 0{,}9^{4} = 0{,}32805 \\approx 0{,}328$.\nc) $1 - 0{,}59049 - 0{,}32805 = 0{,}08146 \\approx 0{,}081$.\nd) $E(X) = 5 \\times 0{,}1 = 0{,}5$.\ne) $1\\,000 \\times 0{,}5 = 500$ tubes.\n⛔ Le piège au d) : refuser $0{,}5$ parce qu'il n'y a pas de demi-tube. L'espérance est une moyenne, pas une valeur de $X$.\nRéponse : a) 0,590 ; b) 0,328 ; c) 0,081 ; d) 0,5 ; e) 500.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion", "vaT_bin_esperance"],
        },
        {
          titre: "La séance de tirs au but",
          enonce:
            "Une gardienne de football prépare une séance : l'équipe adverse frappe $6$ tirs au but, de façon indépendante, marqués chacun avec la probabilité $0{,}75$ (modèle). $X$ compte les tirs marqués. La ligne $6$ du triangle est $1$, $6$, $15$, $20$, $15$, $6$, $1$. Arrondis au millième.\na) Calcule $P(X = 6)$.\nb) Calcule $P(X = 5)$.\nc) Calcule $P(X = 4)$.\nd) Calcule la probabilité que l'équipe marque au moins $4$ tirs.\ne) Calcule $E(X)$.",
          reponses: [
            { question: "a)", attendu: "0,178", tolerance: 0.0005 },
            { question: "b)", attendu: "0,356", tolerance: 0.0005 },
            { question: "c)", attendu: "0,297", tolerance: 0.0005 },
            { question: "d)", attendu: "0,831", tolerance: 0.0005 },
            { question: "e)", attendu: "4,5" },
          ],
          correction:
            "a) $0{,}75^{6} \\approx 0{,}17798 \\approx 0{,}178$.\nb) $6 \\times 0{,}75^{5} \\times 0{,}25 \\approx 0{,}35596 \\approx 0{,}356$.\nc) $\\binom{6}{4} = 15$ : $15 \\times 0{,}75^{4} \\times 0{,}25^{2} \\approx 0{,}29663 \\approx 0{,}297$.\nd) $0{,}17798 + 0{,}35596 + 0{,}29663 = 0{,}83057 \\approx 0{,}831$.\ne) $E(X) = 6 \\times 0{,}75 = 4{,}5$.\n⛔ Le piège au c) : lire la colonne $4$ en comptant à partir de $1$ et prendre $20$. La colonne $4$ vaut $15$.\nRéponse : a) 0,178 ; b) 0,356 ; c) 0,297 ; d) 0,831 ; e) 4,5.",
          micros: ["vaT_bin_extremes", "vaT_bin_pk", "vaT_bin_reunion", "vaT_bin_esperance"],
        },
        {
          titre: "Les appels aux donateurs",
          enonce:
            "Une bénévole d'une association appelle $10$ personnes, de façon indépendante. Chacune fait un don avec la probabilité $0{,}2$ (modèle). $X$ compte les donateurs. La ligne $10$ du triangle commence par $1$, $10$, $45$, $120$. Arrondis au millième.\na) Calcule $P(X = 0)$.\nb) Calcule la probabilité d'avoir au moins un donateur.\nc) Que vaut le coefficient $\\binom{10}{2}$ ?\nd) Calcule $P(X = 2)$.\ne) Calcule $E(X)$.",
          reponses: [
            { question: "a)", attendu: "0,107", tolerance: 0.0005 },
            { question: "b)", attendu: "0,893", tolerance: 0.0005 },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "0,302", tolerance: 0.0005 },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "a) $0{,}8^{10} \\approx 0{,}10737 \\approx 0{,}107$.\nb) $1 - 0{,}10737 \\approx 0{,}893$.\nc) Colonne $2$ de la ligne $10$ : $45$.\nd) $45 \\times 0{,}2^{2} \\times 0{,}8^{8} \\approx 0{,}30199 \\approx 0{,}302$.\ne) $E(X) = 10 \\times 0{,}2 = 2$.\n⛔ Le piège au d) : écrire $0{,}8^{2}$. Il y a $10 - 2 = 8$ échecs : l'exposant de $0{,}8$ vaut $8$.\nRéponse : a) 0,107 ; b) 0,893 ; c) 45 ; d) 0,302 ; e) 2.",
          micros: ["vaT_bin_extremes", "vaT_bin_pk", "vaT_bin_reunion", "vaT_bin_esperance"],
        },
        {
          titre: "Les bornes de recharge",
          enonce:
            "Un gestionnaire compare deux contrats de maintenance pour $4$ bornes de recharge indépendantes (modèle). Le tableau donne la probabilité de panne d'une borne dans le mois. Arrondis au millième.\na) Avec le contrat A, calcule la probabilité qu'aucune borne ne tombe en panne.\nb) Avec le contrat B, calcule la même probabilité.\nc) Avec le contrat B, calcule la probabilité d'au moins une panne.\nd) Calcule le nombre moyen de pannes avec le contrat A.\ne) Calcule le nombre moyen de pannes avec le contrat B.\nf) Lequel donne le moins de pannes en moyenne ? Écris A ou B.",
          figure: grille(["Contrat", "Panne d'une borne"], [["A", "0,1"], ["B", "0,2"]]),
          reponses: [
            { question: "a)", attendu: "0,656", tolerance: 0.0005 },
            { question: "b)", attendu: "0,41", tolerance: 0.0005 },
            { question: "c)", attendu: "0,59", tolerance: 0.0005 },
            { question: "d)", attendu: "0,4" },
            { question: "e)", attendu: "0,8" },
            { question: "f)", attendu: ["A", "contrat A", "le contrat A"] },
          ],
          correction:
            "a) $0{,}9^{4} = 0{,}6561 \\approx 0{,}656$.\nb) $0{,}8^{4} = 0{,}4096 \\approx 0{,}410$.\nc) $1 - 0{,}4096 = 0{,}5904 \\approx 0{,}590$.\nd) $E = 4 \\times 0{,}1 = 0{,}4$.\ne) $E = 4 \\times 0{,}2 = 0{,}8$.\nf) $0{,}4$ est plus petit que $0{,}8$ : le contrat A.\n⛔ Le piège au c) : répondre $0{,}410$. Ce nombre est la probabilité d'aucune panne, le contraire de ce qu'on cherche.\nRéponse : a) 0,656 ; b) 0,410 ; c) 0,590 ; d) 0,4 ; e) 0,8 ; f) A.",
          micros: ["vaT_bin_extremes", "vaT_bin_reunion", "vaT_bin_esperance"],
        },
      ],
    },
  ],
};
