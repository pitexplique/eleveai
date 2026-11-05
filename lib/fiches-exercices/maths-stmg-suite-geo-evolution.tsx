// ─── Fiche d'exercices : suite géométrique et taux d'évolution (STMG) ───────────
//
// Notion suite_geo_evolution du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : la raison EST le coefficient multiplicateur (+ 20 % → q = 1,2), passer
// de la raison au taux et du taux à la raison, retrouver le taux avec deux relevés
// (quotient, écart à 1), l'évolution sur deux ans (les coefficients se multiplient,
// les taux ne s'additionnent pas), et le sens de variation par la position de q par
// rapport à 1. Termes strictement positifs, donc q > 0. ⛔ Pas de u(n) = u(0) × qⁿ.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1, 2, 4, 5, 6) ; fleuriste (ex. 3), jeu en
// ligne (ex. 7), logement (ex. 8) ; vélos en libre-service (cheffe de projet), énergie
// (conseiller), oiseaux (ornithologue), imprimerie (magasinier), PME (comptable),
// vente en ligne (responsable), rugby (président de club), presse (kiosquière) ;
// voitures électriques (urbaniste), banquise fictive (climatologue), restaurant
// (gérant), librairie (libraire).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`.
//
// Micro-compétences : suite_geo_taux (1, 2, 6, 9, 10, 14, 17, 18, 19),
// suite_geo_raison_depuis_taux (3, 4, 7, 11, 12, 13, 15, 16, 17, 18, 19, 20),
// suite_geo_variation (5, 8, 13, 14, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesSuiteGeoEvolutionStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-geo-evolution",
  titre: "Suite géométrique et taux d'évolution",
  accroche:
    "Vingt exercices pour relier une raison et un pourcentage : de + 35 % à q = 1,35 et retour, le taux retrouvé à partir de deux relevés, l'évolution sur deux ans, et le sens de variation. Des vélos en libre-service, une PME, un club de rugby, une banquise fictive et une librairie. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : passer du taux à la raison, de la raison au taux, ou lire le sens de variation.",
      rappel: [
        "La raison d'une suite géométrique est le coefficient multiplicateur : + 35 % donne $q = 1{,}35$ et − 35 % donne $q = 0{,}65$.",
        "De la raison au taux : on retire 1, puis on lit en pourcentage. $q = 1{,}35$ : $1{,}35 - 1 = 0{,}35$, soit + 35 %.",
        "Termes positifs : $q > 1$, croissante ; $0 < q < 1$, décroissante ; $q = 1$, constante. On compare à 1, pas à 0.",
        "Une raison n'est jamais négative ici : une baisse se traduit par un $q$ entre 0 et 1.",
      ],
      exercices: [
        {
          enonce:
            "Une suite géométrique a pour raison $q = 1{,}2$.\na) Cela correspond-il à une hausse ou à une baisse ? Écris le mot.\nb) De quel pourcentage ?",
          reponses: [
            { question: "a)", attendu: ["hausse", "une hausse"] },
            { question: "b)", attendu: "20 %" },
          ],
          correction:
            "a) 1,2 est plus grand que 1 : c'est une hausse.\nb) On retire 1 : $1{,}2 - 1 = 0{,}2$, soit 20 %.\n⛔ Le piège au b) : lire 1,2 comme 1,2 % ou 120 %. Multiplier par 1,2, c'est garder 100 % et ajouter 20 %.\nRéponse : a) hausse ; b) 20 %.",
          micros: ["suite_geo_taux"],
        },
        {
          enonce:
            "Une suite géométrique a pour raison $q = 0{,}85$.\na) Cela correspond-il à une hausse ou à une baisse ? Écris le mot.\nb) De quel pourcentage ?",
          reponses: [
            { question: "a)", attendu: ["baisse", "une baisse"] },
            { question: "b)", attendu: ["15 %", "-15 %"] },
          ],
          correction:
            "a) 0,85 est plus petit que 1 : c'est une baisse.\nb) $1 - 0{,}85 = 0{,}15$, soit 15 %.\n⛔ Le piège au b) : répondre 85 %. On garde 85 %, on perd 15 %.\nRéponse : a) baisse ; b) 15 %.",
          micros: ["suite_geo_taux"],
        },
        {
          enonce:
            "Un fleuriste voit ses ventes augmenter de 8 % par an (modèle). Quelle est la raison de la suite géométrique qui les modélise ?",
          reponses: [{ attendu: "1,08" }],
          correction:
            "Une hausse de t % donne $q = 1 + \\dfrac{t}{100}$.\n$q = 1 + 0{,}08 = 1{,}08$.\n⛔ Le piège : répondre 0,08 ou 8. Il manque le 1 : on garde les ventes de l'année, et on ajoute 8 %.\nRéponse : 1,08.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce: "Une quantité diminue de 30 % par an. Quelle est la raison de la suite géométrique qui la modélise ?",
          reponses: [{ attendu: "0,7" }],
          correction:
            "Une baisse de t % donne $q = 1 - \\dfrac{t}{100}$.\n$q = 1 - 0{,}3 = 0{,}7$.\n⛔ Le piège : répondre −0,3. Une raison n'est pas négative ici : on garde 70 % de la quantité.\nRéponse : 0,7.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce:
            "Donne le sens de variation de chaque suite géométrique à termes positifs. Écris « croissante », « décroissante » ou « constante ».\na) $q = 1{,}05$.\nb) $q = 0{,}95$.\nc) $q = 1$.",
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "constante" },
          ],
          correction:
            "On compare la raison à 1.\na) 1,05 est plus grand que 1 : croissante.\nb) 0,95 est compris entre 0 et 1 : décroissante.\nc) Multiplier par 1 ne change rien : constante.\n⛔ Le piège au b) : dire « croissante » parce que 0,95 est positif. On compare à 1, pas à 0.\nRéponse : a) croissante ; b) décroissante ; c) constante.",
          micros: ["suite_geo_variation"],
        },
        {
          enonce: "Une suite géométrique a pour raison $q = 0{,}4$. De quel pourcentage baisse-t-elle à chaque pas ?",
          reponses: [{ attendu: ["60 %", "-60 %"] }],
          correction:
            "$1 - 0{,}4 = 0{,}6$, soit 60 %.\nOn garde 40 % de la valeur, on en perd 60 %.\n⛔ Le piège : répondre 40 %. C'est ce qu'il reste, pas ce qu'on perd.\nRéponse : 60 %.",
          micros: ["suite_geo_taux"],
        },
        {
          enonce:
            "Les joueurs d'un jeu en ligne augmentent de 100 % par mois (modèle). Quelle est la raison de la suite géométrique qui les modélise ?",
          reponses: [{ attendu: "2" }],
          correction:
            "$q = 1 + \\dfrac{100}{100} = 1 + 1 = 2$.\nUne hausse de 100 %, c'est un doublement.\n⛔ Le piège : répondre 100 ou 1. La raison garde le 1 de départ et ajoute le taux écrit en décimal.\nRéponse : 2.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce:
            "Le loyer moyen d'un quartier fictif suit une suite géométrique à termes positifs et diminue d'année en année. Que peut-on dire de sa raison ? Écris « négative », « entre 0 et 1 » ou « supérieure à 1 ».",
          reponses: [{ attendu: "entre 0 et 1" }],
          correction:
            "On multiplie par la raison et le loyer baisse, tout en restant positif.\nMultiplier par un nombre entre 0 et 1 fait exactement cela : par exemple, $0{,}9 \\times 800 = 720$.\n⛔ Le piège : répondre « négative » en pensant aux suites arithmétiques. Une raison négative rendrait un loyer sur deux négatif.\nRéponse : entre 0 et 1.",
          micros: ["suite_geo_variation"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : retrouver le taux avec deux relevés, ou calculer l'évolution sur deux ans.",
      rappel: [
        "Le taux à partir de deux valeurs : on divise l'arrivée par le départ, on retire 1, on lit en pourcentage. Le signe moins indique une baisse.",
        "Sur deux ans, les coefficients se multiplient : $q \\times q = q^2$. Les pourcentages ne s'additionnent pas : + 30 % deux fois ne font pas + 60 %.",
        "Une différence en unités n'est pas un taux : elle doit être rapportée à la valeur de départ.",
      ],
      exercices: [
        {
          enonce:
            "Une cheffe de projet suit les trajets en vélos en libre-service, en hausse de 20 % par an (modèle). On note $u(n)$ leur nombre l'année $n$, et on étudie le passage de $u(0)$ à $u(2)$.\na) Quelle est la raison ?\nb) Calcule $q^2$.\nc) Quelle est l'évolution globale sur deux ans, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "1,44" },
            { question: "c)", attendu: "44 %" },
          ],
          correction:
            "a) $q = 1 + 0{,}2 = 1{,}2$.\nb) $1{,}2^2 = 1{,}2 \\times 1{,}2 = 1{,}44$.\nc) $1{,}44 - 1 = 0{,}44$, soit + 44 %.\n⛔ Le piège au c) : additionner et répondre 40 %. C'est moins que la réalité, car la deuxième hausse porte sur un nombre déjà augmenté.\nRéponse : a) 1,2 ; b) 1,44 ; c) 44 %.",
          micros: ["suite_geo_taux"],
        },
        {
          enonce:
            "Un conseiller en énergie suit une consommation en baisse de 10 % par an (modèle). On note $u(n)$ cette consommation l'année $n$, et on étudie le passage de $u(0)$ à $u(2)$.\na) Quelle est la raison ?\nb) Calcule $q^2$.\nc) Quelle est l'évolution globale sur deux ans, en pourcentage ? Mets un signe moins pour une baisse.",
          reponses: [
            { question: "a)", attendu: "0,9" },
            { question: "b)", attendu: "0,81" },
            { question: "c)", attendu: "-19 %" },
          ],
          correction:
            "a) $q = 1 - 0{,}1 = 0{,}9$.\nb) $0{,}9^2 = 0{,}9 \\times 0{,}9 = 0{,}81$.\nc) $0{,}81 - 1 = -0{,}19$, soit − 19 %.\n⛔ Le piège au c) : répondre − 20 %. C'est plus que la réalité, car la deuxième baisse porte sur un nombre déjà réduit.\nRéponse : a) 0,9 ; b) 0,81 ; c) −19 %.",
          micros: ["suite_geo_taux"],
        },
        {
          enonce:
            "Un ornithologue compte 800 oiseaux une année et 920 l'année suivante, dans un marais fictif.\na) Calcule le coefficient multiplicateur.\nb) Quel est le taux d'évolution, en pourcentage ? Mets un signe moins s'il s'agit d'une baisse.",
          reponses: [
            { question: "a)", attendu: "1,15" },
            { question: "b)", attendu: "15 %" },
          ],
          correction:
            "a) On divise l'arrivée par le départ : $920 \\div 800 = 1{,}15$.\nb) $1{,}15 - 1 = 0{,}15$, soit + 15 %.\n⛔ Le piège : répondre 120, la différence $920 - 800$. C'est une variation en oiseaux, pas un taux.\nRéponse : a) 1,15 ; b) 15 %.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce:
            "Un magasinier d'imprimerie voit son stock de cartouches passer de 2 000 à 1 700 en un an (modèle).\na) Calcule le coefficient multiplicateur.\nb) Quel est le taux d'évolution, en pourcentage ? Mets un signe moins s'il s'agit d'une baisse.",
          reponses: [
            { question: "a)", attendu: "0,85" },
            { question: "b)", attendu: "-15 %" },
          ],
          correction:
            "a) $1\\,700 \\div 2\\,000 = 0{,}85$.\nb) $0{,}85 - 1 = -0{,}15$, soit − 15 %.\n⛔ Le piège au a) : diviser le départ par l'arrivée. $2\\,000 \\div 1\\,700$ dépasse 1 : on annoncerait une hausse alors que le stock baisse.\nRéponse : a) 0,85 ; b) −15 %.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce:
            "La comptable d'une PME modélise sa dette par $u(n+1) = 0{,}96 \\times u(n)$, avec $u(0) = 150\\,000$ € (modèle).\na) La suite est-elle croissante ou décroissante ? Écris le mot.\nb) Quel est le taux d'évolution annuel, en pourcentage ? Mets un signe moins pour une baisse.\nc) Calcule $u(1)$.",
          reponses: [
            { question: "a)", attendu: "décroissante" },
            { question: "b)", attendu: "-4 %" },
            { question: "c)", attendu: "144 000 €" },
          ],
          correction:
            "a) 0,96 est compris entre 0 et 1 : la suite est décroissante.\nb) $0{,}96 - 1 = -0{,}04$, soit − 4 %.\nc) $150\\,000 \\times 0{,}96 = 144\\,000$ €.\n⛔ Le piège au b) : répondre − 96 %. On garde 96 %, on perd 4 %.\nRéponse : a) décroissante ; b) −4 % ; c) 144 000 €.",
          micros: ["suite_geo_raison_depuis_taux", "suite_geo_variation"],
        },
        {
          enonce:
            "La responsable d'un site de vente en ligne modélise ses commandes par $u(n+1) = 1{,}25 \\times u(n)$, avec $u(0) = 1\\,200$ (modèle).\na) Quel est le taux d'évolution, en pourcentage ? Mets un signe moins pour une baisse.\nb) La suite est-elle croissante ou décroissante ? Écris le mot.\nc) Calcule $u(1)$.\nd) Calcule $u(2)$.",
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "1 500" },
            { question: "d)", attendu: "1 875" },
          ],
          correction:
            "a) $1{,}25 - 1 = 0{,}25$, soit 25 %.\nb) 1,25 est plus grand que 1 : croissante.\nc) $1\\,200 \\times 1{,}25 = 1\\,500$.\nd) $1\\,500 \\times 1{,}25 = 1\\,875$.\n⛔ Le piège au d) : ajouter encore 300 et trouver 1 800. La hausse porte sur 1 500, elle vaut 375.\nRéponse : a) 25 % ; b) croissante ; c) 1 500 ; d) 1 875.",
          micros: ["suite_geo_taux", "suite_geo_variation"],
        },
        {
          enonce:
            "Le président d'un comité de rugby fictif compare deux clubs. Le club A passe de 200 à 250 licenciés. Le club B passe de 1 000 à 1 100 licenciés.\na) Calcule le coefficient du club A.\nb) Calcule le coefficient du club B.\nc) Quel est le taux de hausse du club A ?\nd) Quel est le taux de hausse du club B ?\ne) Quel club a le taux le plus élevé ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: "1,25" },
            { question: "b)", attendu: "1,1" },
            { question: "c)", attendu: "25 %" },
            { question: "d)", attendu: "10 %" },
            { question: "e)", attendu: "A" },
          ],
          correction:
            "a) $250 \\div 200 = 1{,}25$.\nb) $1\\,100 \\div 1\\,000 = 1{,}1$.\nc) $1{,}25 - 1 = 0{,}25$, soit 25 %.\nd) $1{,}1 - 1 = 0{,}1$, soit 10 %.\ne) 25 % est plus grand que 10 % : c'est le club A.\n⛔ Le piège au e) : choisir B parce qu'il gagne 100 licenciés contre 50. Un taux compare à la valeur de départ.\nRéponse : a) 1,25 ; b) 1,1 ; c) 25 % ; d) 10 % ; e) A.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
        {
          enonce:
            "Une kiosquière voit ses ventes de journaux baisser de 20 % par an (modèle), à partir de 500 exemplaires par semaine, notés $u(0)$. Léa, son apprentie, écrit $q = -0{,}2$.\na) Léa a-t-elle raison ? Réponds oui ou non.\nb) Quelle est la bonne raison ?\nc) Calcule ce que donnerait $500 \\times (-0{,}2)$.\nd) Calcule le vrai $u(1)$.",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: "0,8" },
            { question: "c)", attendu: "-100" },
            { question: "d)", attendu: "400" },
          ],
          correction:
            "a) Non : −0,2 est le taux écrit en décimal, pas la raison.\nb) $q = 1 - 0{,}2 = 0{,}8$.\nc) $500 \\times (-0{,}2) = -100$ : un nombre négatif de journaux n'a aucun sens, et cela doit alerter.\nd) $500 \\times 0{,}8 = 400$.\n⛔ Le piège : confondre le taux (− 20 %) et le coefficient. La raison, c'est ce qui multiplie : on garde 80 %.\nRéponse : a) non ; b) 0,8 ; c) −100 ; d) 400.",
          micros: ["suite_geo_raison_depuis_taux"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : de la situation à la raison, de la raison aux termes, des termes au taux global.",
      rappel: [
        "Taux → raison : $q = 1 + \\dfrac{t}{100}$ ou $q = 1 - \\dfrac{t}{100}$. Raison → taux : on retire 1.",
        "Taux global entre deux rangs : valeur d'arrivée ÷ valeur de départ, puis on retire 1.",
        "Le sens de variation se lit en comparant $q$ à 1.",
      ],
      exercices: [
        {
          titre: "Les voitures électriques",
          enonce:
            "Une urbaniste compte 500 voitures électriques dans une ville, notées $u(0)$, et prévoit + 40 % par an (modèle).\na) Quelle est la raison ?\nb) Donne $u(1)$ et $u(2)$, dans cet ordre.\nc) Quel est le taux global sur deux ans, en pourcentage ?\nd) La suite est-elle croissante ou décroissante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "1,4" },
            { question: "b)", attendu: "700 ; 980", ordre: true },
            { question: "c)", attendu: "96 %" },
            { question: "d)", attendu: "croissante" },
          ],
          correction:
            "a) $q = 1 + 0{,}4 = 1{,}4$.\nb) $500 \\times 1{,}4 = 700$, puis $700 \\times 1{,}4 = 980$.\nc) $980 \\div 500 = 1{,}96$, et $1{,}96 - 1 = 0{,}96$, soit + 96 %.\nd) 1,4 est plus grand que 1 : croissante.\n⛔ Le piège au c) : additionner et répondre 80 %. Sur deux ans, on multiplie : $1{,}4 \\times 1{,}4 = 1{,}96$.\nRéponse : a) 1,4 ; b) 700 ; 980 ; c) 96 % ; d) croissante.",
          micros: ["suite_geo_taux", "suite_geo_raison_depuis_taux", "suite_geo_variation"],
        },
        {
          titre: "La banquise fictive",
          enonce:
            "Un climatologue teste un scénario sur une banquise fictive de 10 000 km², notés $u(0)$, qui perd 5 % de sa surface par an.\na) Quelle est la raison ?\nb) Donne $u(1)$ et $u(2)$, dans cet ordre.\nc) Quelle est l'évolution globale sur deux ans, en pourcentage ? Mets un signe moins pour une baisse.\nd) La suite est-elle croissante ou décroissante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "0,95" },
            { question: "b)", attendu: "9 500 ; 9 025", ordre: true },
            { question: "c)", attendu: "-9,75 %" },
            { question: "d)", attendu: "décroissante" },
          ],
          correction:
            "a) $q = 1 - 0{,}05 = 0{,}95$.\nb) $10\\,000 \\times 0{,}95 = 9\\,500$, puis $9\\,500 \\times 0{,}95 = 9\\,025$.\nc) $9\\,025 \\div 10\\,000 = 0{,}9025$, et $0{,}9025 - 1 = -0{,}0975$, soit − 9,75 %.\nd) 0,95 est compris entre 0 et 1 : décroissante.\n⛔ Le piège au c) : répondre − 10 %. La deuxième perte porte sur 9 500 km², elle est plus petite que la première.\nRéponse : a) 0,95 ; b) 9 500 ; 9 025 ; c) −9,75 % ; d) décroissante.",
          micros: ["suite_geo_taux", "suite_geo_raison_depuis_taux", "suite_geo_variation"],
        },
        {
          titre: "Le carnet du restaurant",
          enonce:
            "Le gérant d'un restaurant relève son chiffre d'affaires mensuel, en centaines d'euros (modèle). Le tableau donne les premiers termes d'une suite géométrique.\na) Quelle est la raison ?\nb) Quel est le taux d'évolution mensuel, en pourcentage ? Mets un signe moins pour une baisse.\nc) La suite est-elle croissante ou décroissante ? Écris le mot.\nd) Calcule $u(4)$.\ne) Quel est le taux global de $u(0)$ à $u(3)$, en pourcentage ?",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 400, 480, 576, 691.2]]),
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "20 %" },
            { question: "c)", attendu: "croissante" },
            { question: "d)", attendu: "829,44" },
            { question: "e)", attendu: "72,8 %" },
          ],
          correction:
            "a) $480 \\div 400 = 1{,}2$, et $576 \\div 480 = 1{,}2$.\nb) $1{,}2 - 1 = 0{,}2$, soit 20 %.\nc) 1,2 est plus grand que 1 : croissante.\nd) $691{,}2 \\times 1{,}2 = 829{,}44$.\ne) $691{,}2 \\div 400 = 1{,}728$, et $1{,}728 - 1 = 0{,}728$, soit + 72,8 %.\n⛔ Le piège au e) : faire $3 \\times 20 = 60$ %. Les pourcentages ne s'additionnent pas.\nRéponse : a) 1,2 ; b) 20 % ; c) croissante ; d) 829,44 ; e) 72,8 %.",
          micros: ["suite_geo_taux", "suite_geo_raison_depuis_taux", "suite_geo_variation"],
        },
        {
          titre: "Papier ou numérique",
          enonce:
            "Une libraire compare deux suites géométriques fictives de ventes annuelles. Livres numériques : $u(0) = 1\\,000$ et $q = 1{,}1$. Livres papier : $v(0) = 2\\,000$ et $q = 0{,}8$.\na) Le sens de variation de $u$ : écris « croissante » ou « décroissante ».\nb) Le sens de variation de $v$ : écris « croissante » ou « décroissante ».\nc) Quel est le taux de $u$, en pourcentage ?\nd) Quel est le taux de $v$, en pourcentage ? Mets un signe moins pour une baisse.\ne) Calcule $u(2)$ et $v(2)$, dans cet ordre.\nf) À quel rang $u$ dépasse-t-elle $v$ pour la première fois ?",
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "10 %" },
            { question: "d)", attendu: "-20 %" },
            { question: "e)", attendu: "1 210 ; 1 280", ordre: true },
            { question: "f)", attendu: "3" },
          ],
          correction:
            "a) 1,1 est plus grand que 1 : croissante.\nb) 0,8 est compris entre 0 et 1 : décroissante.\nc) $1{,}1 - 1 = 0{,}1$, soit + 10 %.\nd) $0{,}8 - 1 = -0{,}2$, soit − 20 %.\ne) $u$ : 1 100, puis 1 210. $v$ : 1 600, puis 1 280.\nf) Au rang 2, 1 210 est encore plus petit que 1 280. Au rang 3 : $1\\,210 \\times 1{,}1 = 1\\,331$ et $1\\,280 \\times 0{,}8 = 1\\,024$. C'est donc le rang 3.\n⛔ Le piège au f) : répondre 2 sans vérifier. On compare les deux termes rang par rang.\nRéponse : a) croissante ; b) décroissante ; c) 10 % ; d) −20 % ; e) 1 210 ; 1 280 ; f) 3.",
          micros: ["suite_geo_raison_depuis_taux", "suite_geo_variation"],
        },
      ],
    },
  ],
};
