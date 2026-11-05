// ─── Fiche d'exercices : problème de seuil (STMG) — 20 exercices ───────────────
//
// Notion suite_seuil du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Année de
// PREMIÈRE : pas de logarithme ni de terme général, on calcule de proche en proche,
// on lit un tableau ou un nuage de points, ou on écrit la condition d'une boucle
// « tant que ». Le coach demande : le PREMIER rang qui franchit le seuil (en montant
// ou en descendant), la marge à un rang donné, le rang où une suite dépasse l'autre,
// et le dernier rang où l'ordre n'a pas encore basculé.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : deux suites nues (ex. 1, 3, 4, 5, 6, 8) ; entrepôt (ex. 2),
// bibliothèque numérique (programme, ex. 7), banque (Zoé), escalade (club),
// santé (infirmière), énergie (thermicienne), podcasts (productrice), jeu vidéo
// (studio), radio (newsletter), photographie (drone), recyclerie (responsable),
// food-truck (gérant), hydrologie (hydrologue), épargne (Aïcha et Timéo).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suite_seuil_tableau (1, 2, 10, 17), suite_seuil_graphique
// (3, 4, 12, 13, 19), suite_seuil_rang (5, 6, 7, 9, 11, 15, 16, 17, 19, 20),
// suite_seuil_croisement (8, 13, 14, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, programme, repere, tableau } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesSuiteSeuilStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-seuil",
  titre: "Problème de seuil",
  accroche:
    "Vingt exercices pour répondre à la question « à partir de quand ? » : lire le premier rang qui franchit un seuil dans un tableau ou sur un graphique, le trouver de proche en proche, écrire la condition d'une boucle « tant que », et repérer quand une suite passe devant une autre. Une recyclerie, un médicament, un food-truck, une réserve d'eau, un drone qui perd de sa valeur. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un rang, calculer de proche en proche, ou choisir la condition d'une boucle.",
      rappel: [
        "Un problème de seuil cherche le PREMIER rang où la condition est vraie. On répond par le rang, pas par la valeur.",
        "Dans un tableau, on parcourt les valeurs dans l'ordre. Sur un graphique, on cherche le premier point au-dessus (ou au-dessous) de l'horizontale du seuil.",
        "Une boucle « tant que » continue tant que l'objectif n'est PAS atteint : pour dépasser 900, on écrit « tant que u < 900 ». Si u peut tomber pile sur 900, on écrit « tant que u ≤ 900 », car 900 ne dépasse pas 900.",
        "Pour deux suites, on compare les deux colonnes ligne à ligne, jusqu'à ce que l'ordre bascule.",
      ],
      exercices: [
        {
          enonce:
            "Le tableau donne les termes d'une suite. À partir de quel rang les termes dépassent-ils 800 ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5"], ["u(n)", 500, 600, 720, 864, 1037, 1244], true),
          reponses: [{ attendu: "3" }],
          correction:
            "On parcourt les valeurs dans l'ordre : 500, 600, 720 restent sous 800.\n$u(3) = 864$ est la première valeur au-dessus de 800.\n⛔ Le piège : répondre 864. La question demande le rang, pas la valeur.\nRéponse : à partir du rang 3.",
          micros: ["suite_seuil_tableau"],
        },
        {
          enonce:
            "Le tableau donne le stock d'un entrepôt, en articles, mois après mois. À partir de quel rang le stock passe-t-il sous 1 300 articles ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5"], ["u(n)", 3000, 2400, 1920, 1536, 1229, 983], true),
          reponses: [{ attendu: "4" }],
          correction:
            "Ici la suite descend : on cherche le premier terme inférieur à 1 300.\n$u(3) = 1\\,536$ est encore au-dessus. $u(4) = 1\\,229$ est en dessous.\n⛔ Le piège : répondre 3, le dernier rang AU-DESSUS du seuil. On veut le premier qui vérifie la condition.\nRéponse : à partir du rang 4.",
          micros: ["suite_seuil_tableau"],
        },
        {
          enonce:
            "Le graphique montre les termes d'une suite (les points rouges). L'horizontale marque le seuil 7. À partir de quel rang les termes dépassent-ils ce seuil ?",
          figure: repere([-1, 7, -1, 14], [], [{ x: 0, y: 2 }, { x: 1, y: 4 }, { x: 2, y: 6 }, { x: 3, y: 8 }, { x: 4, y: 10 }, { x: 5, y: 12 }], 7, true),
          reponses: [{ attendu: "3" }],
          correction:
            "On suit l'horizontale d'ordonnée 7.\nLe point de rang 2 (hauteur 6) est en dessous. Le point de rang 3 (hauteur 8) est au-dessus.\n⛔ Le piège : lire 8, la hauteur du point. Le rang se lit sur l'axe horizontal.\nRéponse : à partir du rang 3.",
          micros: ["suite_seuil_graphique"],
        },
        {
          enonce:
            "Sur ce graphique, l'horizontale marque le seuil 8. De combien le terme de rang 5 dépasse-t-il ce seuil ?",
          figure: repere([-1, 7, -1, 14], [], [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }, { x: 4, y: 9 }, { x: 5, y: 11 }], 8, true),
          reponses: [{ attendu: "3" }],
          correction:
            "On lit la hauteur du point de rang 5 : 11.\nOn lit le seuil : 8.\nL'écart est $11 - 8 = 3$.\n⛔ Le piège : répondre 4, le rang où le seuil est franchi. La question porte ici sur une hauteur, pas sur un rang.\nRéponse : 3.",
          micros: ["suite_seuil_graphique"],
        },
        {
          enonce:
            "On a $u(0) = 1\\,000$, et chaque terme s'obtient en multipliant le précédent par 1,5. À partir de quel rang les termes dépassent-ils 3 000 ?",
          reponses: [{ attendu: "3" }],
          correction:
            "De proche en proche : $u(1) = 1\\,500$, $u(2) = 2\\,250$, $u(3) = 3\\,375$.\n$u(2)$ est sous 3 000, $u(3)$ le dépasse.\n⛔ Le piège : diviser $3\\,000 \\div 1\\,000 = 3$, puis $3 \\div 1{,}5 = 2$. Une suite géométrique ne se résout pas par une division : on compte les multiplications.\nRéponse : à partir du rang 3.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "On a $u(0) = 40$, et chaque terme s'obtient en ajoutant 30 au précédent. À partir de quel rang les termes dépassent-ils 200 ?",
          reponses: [{ attendu: "6" }],
          correction:
            "De proche en proche : 70, 100, 130, 160, 190, 220.\n$u(5) = 190$ est sous 200, $u(6) = 220$ le dépasse.\n⛔ Le piège : calculer $200 \\div 30 \\approx 6{,}7$ et répondre 7. On oublierait que la suite part de 40, pas de 0.\nRéponse : à partir du rang 6.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "Une bibliothèque numérique compte 2 000 abonnés et gagne 25 % par an. Ce programme cherche le nombre d'années pour dépasser 5 000 abonnés. Quelle condition écrire à la ligne « Tant que … » ? Réponds par la lettre.\nA : Tant que u < 5 000\nB : Tant que u > 5 000\nC : Tant que n < 5 000",
          figure: programme(["u ← 2000", "n ← 0", "Tant que …", "    u ← u × 1,25", "    n ← n + 1", "Afficher n"]),
          reponses: [{ attendu: "A" }],
          correction:
            "La boucle continue tant que l'objectif n'est pas atteint, donc tant que $u$ reste sous 5 000.\nLa condition B ne démarre jamais : $u$ vaut 2 000 au départ, la boucle s'arrête aussitôt avec $n = 0$.\nLa condition C teste le rang au lieu de la valeur : la boucle tournerait 5 000 fois.\nSi $u$ pouvait tomber pile sur 5 000, on écrirait $u \\leq 5\\,000$ : ici, il passe de 4 883 à 6 104 environ.\n⛔ Le piège : écrire ce qu'on veut obtenir (B). « Tant que » dit ce qui fait CONTINUER.\nRéponse : A.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "Le tableau compare deux suites. À partir de quel rang la suite B dépasse-t-elle la suite A ?",
          figure: grille(["n", "A", "B"], [
            [0, 1200, 800],
            [1, 1300, 1120],
            [2, 1400, 1568],
            [3, 1500, 2195],
          ]),
          reponses: [{ attendu: "2" }],
          correction:
            "On compare ligne à ligne.\nRang 1 : 1 120 est encore sous 1 300.\nRang 2 : 1 568 dépasse 1 400.\n⛔ Le piège : chercher quand B dépasse le 1 200 de départ de A. A augmente aussi : on compare sur la même ligne.\nRéponse : à partir du rang 2.",
          micros: ["suite_seuil_croisement"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : traduire en coefficient ou en ajout, calculer de proche en proche, répondre avec le rang et l'année.",
      rappel: [
        "Une hausse de t % multiplie par $1 + t \\div 100$, une baisse par $1 - t \\div 100$. On compte les multiplications jusqu'à franchir le seuil.",
        "Le rang se traduit en année : année de $u(0)$ plus le rang.",
        "Pour un seuil par le bas (une valeur qui descend), la boucle s'écrit « tant que u > seuil », ou « tant que u ≥ seuil » si u peut tomber pile sur le seuil.",
        "Le dernier rang où A est encore devant, c'est le rang du croisement moins 1.",
      ],
      exercices: [
        {
          enonce:
            "Zoé place 3 000 € à 10 % d'intérêts composés par an. On note $u(n)$ le capital au bout de $n$ années.\na) Que vaut $u(3)$ ?\nb) Au bout de combien d'années le capital dépasse-t-il 4 000 € ?",
          reponses: [
            { question: "a)", attendu: "3 993 €" },
            { question: "b)", attendu: ["4", "au bout de 4 ans"] },
          ],
          correction:
            "On multiplie chaque année par 1,1 : $u(1) = 3\\,300$, $u(2) = 3\\,630$.\na) $u(3) = 3\\,630 \\times 1{,}1 = 3\\,993$ €.\nb) $u(3) = 3\\,993$ est encore sous 4 000. $u(4) = 3\\,993 \\times 1{,}1 = 4\\,392{,}30$ le dépasse.\n⛔ Le piège au b) : répondre 3, parce que 3 993 est « presque » 4 000. Le seuil n'est franchi qu'une fois dépassé.\nRéponse : a) 3 993 € ; b) 4 ans.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "Un club d'escalade relève son nombre de licenciés (modèle). $u(0)$ correspond à l'année 2023.\na) À partir de quel rang le club dépasse-t-il 700 licenciés ?\nb) En quelle année cela arrive-t-il ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5"], ["u(n)", 320, 400, 500, 625, 781, 977], true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2027" },
          ],
          correction:
            "a) $u(3) = 625$ est sous 700, $u(4) = 781$ le dépasse.\nb) $2023 + 4 = 2027$.\nConclusion : le club dépasserait 700 licenciés en 2027.\n⛔ Le piège au b) : répondre 2028, en comptant 2023 comme rang 1. L'année de $u(0)$ est le rang 0.\nRéponse : a) 4 ; b) 2027.",
          micros: ["suite_seuil_tableau"],
        },
        {
          enonce:
            "Une infirmière surveille un médicament (modèle) : sa concentration vaut 200 mg/L, puis baisse de 30 % par heure. On veut savoir quand elle passe sous 50 mg/L.\na) Par quel coefficient multiplie-t-on chaque heure ?\nb) Au bout de combien d'heures la concentration passe-t-elle sous 50 mg/L ?",
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: ["4", "au bout de 4 heures"] },
          ],
          correction:
            "a) Une baisse de 30 % : $1 - 0{,}3 = 0{,}7$.\nb) De proche en proche : $u(1) = 140$ ; $u(2) = 98$ ; $u(3) = 68{,}6$ ; $u(4) = 48{,}02$.\n$u(3)$ est encore au-dessus de 50, $u(4)$ est en dessous.\n⛔ Le piège au b) : enlever 60 mg/L par heure, ce qui donnerait 3 heures. Les 30 % portent sur la concentration de l'heure, qui diminue.\nRéponse : a) 0,7 ; b) 4 heures.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "Une thermicienne suit la consommation d'un bâtiment, en MWh (les points rouges). $u(0)$ correspond à 2025. L'horizontale marque l'objectif : passer sous 5 MWh.\na) À partir de quel rang l'objectif est-il atteint ?\nb) En quelle année ?\nc) De combien le terme de rang 5 est-il sous l'objectif ?",
          figure: repere([-1, 7, -1, 14], [], [{ x: 0, y: 12 }, { x: 1, y: 10 }, { x: 2, y: 8 }, { x: 3, y: 6 }, { x: 4, y: 4 }, { x: 5, y: 2 }], 5, true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2029" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) Le point de rang 3 (hauteur 6) est au-dessus de l'horizontale. Le point de rang 4 (hauteur 4) est en dessous.\nb) $2025 + 4 = 2029$.\nc) Au rang 5, la hauteur est 2 : $5 - 2 = 3$.\n⛔ Le piège au a) : chercher le premier point AU-DESSUS, par habitude. Ici la suite descend : on veut le premier point en dessous.\nRéponse : a) 4 ; b) 2029 ; c) 3 MWh.",
          micros: ["suite_seuil_graphique"],
        },
        {
          enonce:
            "Une productrice compare deux podcasts, en milliers d'auditeurs (modèle). Sur le graphique, A part de 5 et B part de moins de 1.\na) À partir de quel rang B dépasse-t-il A ?\nb) Quel est le dernier rang où A est encore devant ?",
          figure: repere([-1, 6, -1, 14], [{ pts: [[0, 5], [1, 6], [2, 7], [3, 8], [4, 9], [5, 10]], couleur: BLEU }, { pts: [[0, 0.75], [1, 1.5], [2, 3], [3, 6], [4, 12]], couleur: ORANGE }], [{ x: 5, y: 10, label: "A" }, { x: 4, y: 12, label: "B" }], undefined, true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "On compare les deux lignes à chaque rang.\nAu rang 3 : A vaut 8 et B vaut 6, A est devant.\nAu rang 4 : A vaut 9 et B vaut 12, B est devant.\na) B dépasse A à partir du rang 4.\nb) Le dernier rang où A est devant, c'est $4 - 1 = 3$.\n⛔ Le piège au b) : répondre 4. Le rang 4 est le PREMIER où A a perdu l'avantage.\nRéponse : a) 4 ; b) 3.",
          micros: ["suite_seuil_croisement", "suite_seuil_graphique"],
        },
        {
          enonce:
            "Un studio de jeu vidéo compare les recettes de deux offres, en € (modèle). L'offre A part de 1 400 € et gagne 100 € par an. L'offre B part de 800 € et progresse de 50 % par an.\na) À partir de quel rang l'offre B dépasse-t-elle l'offre A ?\nb) Quel est le dernier rang où A est encore devant ?\nc) Quel est l'écart entre A et B au rang 1 ?",
          figure: grille(["n", "A", "B"], [
            [0, 1400, 800],
            [1, 1500, 1200],
            [2, 1600, 1800],
            [3, 1700, 2700],
          ]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "300 €" },
          ],
          correction:
            "a) Rang 1 : 1 200 est sous 1 500. Rang 2 : 1 800 dépasse 1 600.\nb) $2 - 1 = 1$.\nc) $1\\,500 - 1\\,200 = 300$ €.\n⛔ Le piège : conclure que A gagne parce qu'elle part de plus haut. Une croissance exponentielle finit par dépasser une croissance linéaire.\nRéponse : a) 2 ; b) 1 ; c) 300 €.",
          micros: ["suite_seuil_croisement"],
        },
        {
          enonce:
            "Une radio a 1 500 inscrits à sa lettre d'information et en gagne 20 % par an (modèle). On fait tourner ce programme à la main.\na) Quelle valeur de $n$ s'affiche à la fin ?\nb) Quelle est la valeur de $u$ à la fin ?",
          figure: programme(["u ← 1500", "n ← 0", "Tant que u < 3000", "    u ← u × 1,2", "    n ← n + 1", "Afficher n"]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "3 110,4" },
          ],
          correction:
            "Au départ : $u = 1\\,500$ et $n = 0$.\nTour 1 : $u = 1\\,800$, $n = 1$.\nTour 2 : $u = 2\\,160$, $n = 2$.\nTour 3 : $u = 2\\,592$, $n = 3$.\nTour 4 : $u = 3\\,110{,}4$, $n = 4$. La condition $u < 3\\,000$ devient fausse : la boucle s'arrête.\n⛔ Le piège au a) : répondre 3, en s'arrêtant au dernier $u$ sous 3 000. La boucle fait encore un tour pour franchir le seuil.\nRéponse : a) 4 ; b) 3 110,4.",
          micros: ["suite_seuil_rang"],
        },
        {
          enonce:
            "Une photographe achète un drone 2 000 €. Il perd 25 % de sa valeur par an (modèle). Elle veut savoir quand il vaudra moins de 1 000 €. Dans ce programme, $u$ est la valeur du drone et $n$ le nombre d'années.\na) Quelle condition écrire à la ligne « Tant que … » ? Réponds par la lettre.\nA : Tant que u < 1 000\nB : Tant que u > 1 000\nC : Tant que n > 1 000\nb) Quelle valeur de $n$ ce programme affiche-t-il à la fin ?",
          figure: programme(["u ← 2000", "n ← 0", "Tant que …", "    u ← u × 0,75", "    n ← n + 1", "Afficher n"]),
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "a) La valeur descend : on continue tant qu'elle est ENCORE au-dessus de 1 000. La condition A serait fausse dès le départ. (Si $u$ pouvait tomber pile sur 1 000, on écrirait $u \\geq 1\\,000$.)\nb) On multiplie par 0,75 : $u(1) = 1\\,500$ ; $u(2) = 1\\,125$ ; $u(3) = 843{,}75$.\n$u(2)$ est au-dessus de 1 000, $u(3)$ est en dessous : $n = 3$.\n⛔ Le piège au a) : recopier « < » comme pour une suite qui monte. Le sens de la condition dépend du sens de la suite.\nRéponse : a) B ; b) 3.",
          micros: ["suite_seuil_rang"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on dresse le tableau, on repère le rang, on répond à la question posée.",
      rappel: [
        "On calcule les termes un par un, sans s'arrêter avant d'avoir franchi le seuil : un terme « presque » au seuil ne le franchit pas.",
        "On traduit toujours le rang dans le contexte : une année, un mois.",
        "Une suite qui démarre plus bas mais multiplie finit par passer devant une suite qui ajoute.",
      ],
      exercices: [
        {
          titre: "L'objectif de la recyclerie",
          enonce:
            "Une recyclerie a collecté 12 tonnes en 2024, et sa collecte augmente de 20 % par an (modèle). Sa responsable vise plus de 25 tonnes. On note $u(n)$ la collecte pour l'année $2024 + n$. Aide-toi d'un tableau de valeurs.\na) Par quel coefficient multiplie-t-on chaque année ?\nb) Que vaut $u(3)$, à 0,01 près ?\nc) À partir de quel rang l'objectif est-il dépassé ?\nd) En quelle année ?",
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "20,74", tolerance: 0.005 },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "2029" },
          ],
          correction:
            "a) Une hausse de 20 % : coefficient 1,2.\nb) $u(1) = 14{,}4$ ; $u(2) = 17{,}28$ ; $u(3) = 20{,}736$, soit environ $20{,}74$.\nc) $u(4) = 24{,}8832$ est encore sous 25. $u(5) = 29{,}85984$ le dépasse.\nd) $2024 + 5 = 2029$.\n⛔ Le piège au c) : s'arrêter au rang 4, parce que 24,88 se lit « environ 25 ». Le seuil n'est pas encore dépassé.\nRéponse : a) 1,2 ; b) 20,74 ; c) 5 ; d) 2029.",
          micros: ["suite_seuil_tableau", "suite_seuil_rang"],
        },
        {
          titre: "Les deux stratégies du food-truck",
          enonce:
            "Le gérant d'un food-truck compare deux stratégies pour sa recette mensuelle, en € (modèle, arrondi à l'euro). A part de 2 000 € et gagne 120 € par mois. B part de 1 600 € et progresse de 10 % par mois.\na) À partir de quel mois (rang) B dépasse-t-elle A ?\nb) Quel est le dernier rang où A est encore devant ?\nc) Quelle est l'avance de B sur A au rang 6 ?",
          figure: grille(["n", "A", "B"], [
            [0, 2000, 1600],
            [1, 2120, 1760],
            [2, 2240, 1936],
            [3, 2360, 2130],
            [4, 2480, 2343],
            [5, 2600, 2577],
            [6, 2720, 2834],
            [7, 2840, 3118],
          ]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "114 €" },
          ],
          correction:
            "a) Au rang 5 : 2 577 est encore sous 2 600. Au rang 6 : 2 834 dépasse 2 720.\nb) $6 - 1 = 5$.\nc) $2\\,834 - 2\\,720 = 114$ €.\n⛔ Le piège au a) : répondre 5, en lisant que les deux nombres sont presque égaux. A reste devant de 23 € au rang 5.\nRéponse : a) 6 ; b) 5 ; c) 114 €.",
          micros: ["suite_seuil_croisement"],
        },
        {
          titre: "La réserve d'eau",
          enonce:
            "Un hydrologue suit une réserve d'eau, en millions de m³, semaine après semaine (les points rouges, modèle). L'horizontale marque le seuil d'alerte : 6 millions de m³. L'alerte se déclenche dès que la réserve passe sous ce seuil.\na) À partir de quel rang l'alerte se déclenche-t-elle ?\nb) De combien la réserve est-elle sous le seuil au rang 6 ?\nc) Quelle est la raison de cette suite arithmétique ?\nd) Quelle condition écrire pour une boucle qui cherche ce rang ? Réponds par la lettre.\nA : Tant que u > 6\nB : Tant que u < 6\nC : Tant que n < 6",
          figure: repere([-1, 7, -1, 14], [], [{ x: 0, y: 13 }, { x: 1, y: 11 }, { x: 2, y: 9 }, { x: 3, y: 7 }, { x: 4, y: 5 }, { x: 5, y: 3 }, { x: 6, y: 1 }], 6, true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "-2" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) Rang 3 : hauteur 7, au-dessus. Rang 4 : hauteur 5, en dessous.\nb) Au rang 6, la hauteur est 1 : $6 - 1 = 5$.\nc) On perd 2 chaque semaine : la raison est $-2$.\nd) La réserve descend : on continue tant qu'elle est encore au-dessus de 6.\n⛔ Le piège au c) : répondre 2. Une suite qui descend a une raison négative.\nRéponse : a) 4 ; b) 5 ; c) $-2$ ; d) A.",
          micros: ["suite_seuil_graphique", "suite_seuil_rang"],
        },
        {
          titre: "Aïcha et Timéo",
          enonce:
            "Aïcha place 4 000 € à 5 % par an. Timéo place 2 500 € à 20 % par an (intérêts composés, modèle). Dresse le tableau des deux capitaux, de proche en proche.\na) Au bout de combien d'années le capital de Timéo dépasse-t-il 5 000 € ?\nb) Au bout de combien d'années le capital d'Aïcha dépasse-t-il 5 000 € ?\nc) À partir de quel rang le capital de Timéo dépasse-t-il celui d'Aïcha ?\nd) Qui est devant au rang 3 ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: ["4", "au bout de 4 ans"] },
            { question: "b)", attendu: ["5", "au bout de 5 ans"] },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "Aïcha" },
          ],
          correction:
            "Aïcha, on multiplie par 1,05 : 4 200 ; 4 410 ; 4 630,50 ; 4 862,03 ; 5 105,13 (au centime).\nTiméo, on multiplie par 1,2 : 3 000 ; 3 600 ; 4 320 ; 5 184.\na) $5\\,184$ au rang 4 : il dépasse 5 000 pour la première fois.\nb) $4\\,862{,}03$ au rang 4 est encore sous 5 000 ; $5\\,105{,}13$ au rang 5 le dépasse.\nc) Rang 3 : 4 320 est sous 4 630,50. Rang 4 : 5 184 dépasse 4 862,03.\nd) Au rang 3, Aïcha est devant.\n⛔ Le piège au c) : penser que Timéo ne rattrapera jamais une avance de 1 500 €. Son taux est quatre fois plus grand.\nRéponse : a) 4 ans ; b) 5 ans ; c) 4 ; d) Aïcha.",
          micros: ["suite_seuil_rang", "suite_seuil_croisement"],
        },
      ],
    },
  ],
};
