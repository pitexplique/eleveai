// ─── Fiche d'exercices : calculer un taux d'évolution (STMG) — 20 exercices ─────
//
// Notion auto_evo_taux du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts` et son
// renfort `seconde/maths/evolutions-lycee-renfort.ts`). Le coach demande : la
// variation absolue (une différence, dans l'unité) et la variation relative (un
// quotient, en %), le taux d'évolution par rapport à la valeur de DÉPART, négatif
// pour une baisse, le taux lu sur un coefficient, comparer deux progressions, et
// reconnaître si un pourcentage dit une proportion ou une évolution. Les taux
// tombent juste : aucun arrondi demandé.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : cinéma (exploitante), tennis (club),
// chocolaterie (chocolatière), forêt (garde forestier), cyclisme (préparateur
// physique), transports (responsable de ligne) ; deux calculs nus (ex. 2 et 4) ;
// boulangeries (gestion, comptable), énergie éolienne (gestionnaire de parc),
// urgences (cadre de santé), athlétisme (dirigeante de club), magasin bio (cheffe
// de rayon), déchets (technicien de déchetterie), hôtellerie (hôtelière), économie
// (économiste), festival (directrice), part de marché (cheffe de produit), climat
// (glaciologue), ressources humaines (représentant du personnel).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-3.mjs`.
//
// Micro-compétences : auto_evo_absolue_relative (1, 7, 9, 11, 12, 14, 15, 19, 20),
// auto_evo_calculer_taux (2, 3, 4, 6, 10, 11, 12, 13, 14, 16, 17, 18),
// auto_evo_nature_pourcentage (5, 8, 13, 16, 18). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres } from "@/lib/fiches-exercices/figures-donnees";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesAutoEvoTauxStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-evo-taux",
  titre: "Calculer un taux d'évolution",
  accroche:
    "Vingt exercices pour ne plus jamais diviser par la mauvaise valeur : variation absolue et variation relative, taux d'évolution d'une hausse ou d'une baisse, taux lu sur un coefficient, et la différence entre un pourcentage qui dit une part et un pourcentage qui dit une évolution. Un parc éolien, les urgences, deux glaciers, un festival, deux hôtels. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : un écart, un taux, ou la nature d'un pourcentage.",
      rappel: [
        "Variation absolue = valeur finale − valeur initiale. Elle s'exprime dans l'unité de la grandeur.",
        "Taux d'évolution, ou variation relative = (valeur finale − valeur initiale) ÷ valeur initiale, écrit en pourcentage. Il est négatif pour une baisse.",
        "Sur un coefficient, on lit le taux : × 1,2, c'est + 20 % ; × 0,9, c'est − 10 %.",
        "Un pourcentage dit une proportion s'il compare une partie à un tout. Il dit une évolution s'il compare deux dates (« en un an », « depuis »).",
      ],
      exercices: [
        {
          enonce:
            "Une exploitante de cinéma fait passer la place de 8 € à 10 €. Quelle est la variation absolue du prix, en euros ?",
          reponses: [{ attendu: "2 €" }],
          correction:
            "La variation absolue est une différence : valeur finale − valeur initiale.\n$10 - 8 = 2$ €.\n⛔ Le piège : répondre 25 %. C'est la variation RELATIVE, qui répond à une autre question.\nRéponse : 2 €.",
          micros: ["auto_evo_absolue_relative"],
        },
        {
          enonce:
            "Une grandeur passe de 200 à 250. Quel est son taux d'évolution, en pourcentage ?",
          reponses: [{ attendu: "25 %" }],
          correction:
            "On divise l'écart par la valeur de DÉPART.\n$\\dfrac{250 - 200}{200} = \\dfrac{50}{200} = 0{,}25$, soit 25 %.\n⛔ Le piège : diviser par 250, la valeur d'arrivée. Cela donne 20 %, et c'est l'erreur la plus fréquente.\nRéponse : 25 %.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Un club de tennis passe de 80 à 60 adhérents. Quel est le taux d'évolution, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [{ attendu: "−25 %" }],
          correction:
            "La valeur de départ est 80.\n$\\dfrac{60 - 80}{80} = \\dfrac{-20}{80} = -0{,}25$, soit −25 %.\n⛔ Le piège : oublier le signe. Le club perd des adhérents : le taux est négatif.\nRéponse : −25 %.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Calcule le taux d'évolution, en pourcentage. (nombre négatif s'il s'agit d'une baisse)\na) De 50 à 60.\nb) De 400 à 360.\nc) De 100 à 103.",
          reponses: [
            { question: "a)", attendu: "20 %" },
            { question: "b)", attendu: "−10 %" },
            { question: "c)", attendu: "3 %" },
          ],
          correction:
            "a) $\\dfrac{60 - 50}{50} = \\dfrac{10}{50} = 0{,}2$, soit 20 %.\nb) $\\dfrac{360 - 400}{400} = \\dfrac{-40}{400} = -0{,}1$, soit −10 %.\nc) $\\dfrac{103 - 100}{100} = 0{,}03$, soit 3 %.\n⛔ Le piège au a) : répondre 10 %. L'écart vaut 10, mais il faut encore le rapporter à la valeur de départ, 50. C'est seulement en partant de 100 que l'écart se lit directement.\nRéponse : a) 20 % ; b) −10 % ; c) 3 %.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Pour chaque phrase d'un garde forestier, dis ce qu'exprime le pourcentage. Réponds proportion ou évolution.\na) « 18 % des arbres de la forêt sont des chênes. »\nb) « Le nombre de chênes a augmenté de 18 % en dix ans. »",
          reponses: [
            { question: "a)", attendu: ["proportion","une proportion"] },
            { question: "b)", attendu: ["évolution","une évolution"] },
          ],
          correction:
            "a) On compare une partie (les chênes) à un tout (les arbres de la forêt), à une seule date : c'est une proportion.\nb) « En dix ans » : on compare le nombre de chênes à deux dates. C'est une évolution.\n⛔ Le piège : se fier au nombre. Les deux phrases disent 18 %, mais elles ne disent pas la même chose.\nRéponse : a) proportion ; b) évolution.",
          micros: ["auto_evo_nature_pourcentage"],
        },
        {
          enonce:
            "Lis le taux d'évolution sur le coefficient, en pourcentage. (nombre négatif s'il s'agit d'une baisse)\na) Les ventes d'une chocolatière sont multipliées par 1,35.\nb) Ses frais de livraison sont multipliés par 0,88.",
          reponses: [
            { question: "a)", attendu: "35 %" },
            { question: "b)", attendu: "−12 %" },
          ],
          correction:
            "Le taux, c'est le coefficient moins 1.\na) $1{,}35 - 1 = 0{,}35$, soit 35 %.\nb) $0{,}88 - 1 = -0{,}12$, soit −12 %.\n⛔ Le piège au b) : répondre −88 %. Le nombre 0,88 dit ce qui reste, pas ce qui est perdu.\nRéponse : a) 35 % ; b) −12 %.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Un préparateur physique note qu'une cycliste passe de 200 km à 240 km par mois.\na) Quelle est la variation absolue, en km ?\nb) Quelle est la variation relative, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "40 km" },
            { question: "b)", attendu: "20 %" },
          ],
          correction:
            "a) Une différence : $240 - 200 = 40$ km.\nb) Un quotient : $40 \\div 200 = 0{,}2$, soit 20 %.\n⛔ Le piège : confondre les deux. 40 km se lit en kilomètres, 20 % n'a pas d'unité. On ne peut pas écrire « 40 % ».\nRéponse : a) 40 km ; b) 20 %.",
          micros: ["auto_evo_absolue_relative"],
        },
        {
          enonce:
            "Une responsable de ligne de transport lit quatre phrases. Dans trois d'entre elles, le pourcentage exprime une proportion. Laquelle exprime une évolution ? Écris sa lettre.\nA : « 62 % des voyageurs ont un abonnement. »\nB : « 18 % des trains circulent la nuit. »\nC : « Le nombre de voyageurs a augmenté de 9 % en un an. »\nD : « 7 % des billets sont achetés à bord. »",
          reponses: [{ attendu: "C" }],
          correction:
            "On cherche une marque du temps : « en un an », « depuis », « par rapport à ».\nSeule la phrase C compare deux dates.\nA, B et D comparent une partie à un tout, à une seule date.\n⛔ Le piège : croire qu'un petit pourcentage est une évolution. C'est le sens de la phrase qui décide, pas la taille du nombre.\nRéponse : C.",
          micros: ["auto_evo_nature_pourcentage"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : repérer la valeur de départ et la valeur d'arrivée avant de calculer.",
      rappel: [
        "Toujours la même division : on rapporte l'écart à la valeur de DÉPART de la période étudiée.",
        "Comparer deux progressions : on compare les taux, pas les écarts. Un même gain pèse plus sur une petite valeur de départ.",
        "L'écart entre deux valeurs n'est pas un pourcentage, même s'il ressemble à un pourcentage.",
      ],
      exercices: [
        {
          enonce:
            "Un comptable compare le chiffre d'affaires de deux boulangeries, en k€ (modèle).\na) De combien de k€ la boulangerie A progresse-t-elle ?\nb) De combien de k€ la boulangerie B progresse-t-elle ?\nc) Quel est le taux d'évolution de A ?\nd) Quel est le taux d'évolution de B ?\ne) Laquelle a la plus forte progression en pourcentage ? Écris A ou B.",
          figure: grille(["", "L'an dernier", "Cette année"], [
            ["Boulangerie A", 200, 250],
            ["Boulangerie B", 800, 880],
          ]),
          reponses: [
            { question: "a)", attendu: ["50", "50 k€"] },
            { question: "b)", attendu: ["80", "80 k€"] },
            { question: "c)", attendu: "25 %" },
            { question: "d)", attendu: "10 %" },
            { question: "e)", attendu: ["A","boulangerie A","la boulangerie A"] },
          ],
          correction:
            "a) $250 - 200 = 50$ k€.\nb) $880 - 800 = 80$ k€.\nc) $50 \\div 200 = 0{,}25$, soit 25 %.\nd) $80 \\div 800 = 0{,}1$, soit 10 %.\ne) 25 % est plus grand que 10 % : c'est A.\n⛔ Le piège au e) : choisir B parce qu'elle gagne plus d'euros. En euros, c'est B ; en pourcentage, c'est A.\nRéponse : a) 50 k€ ; b) 80 k€ ; c) 25 % ; d) 10 % ; e) A.",
          micros: ["auto_evo_absolue_relative"],
        },
        {
          enonce:
            "Une gestionnaire de parc éolien lit la production annuelle de son parc, en GWh (modèle). Donne chaque taux d'évolution en pourcentage. (nombre négatif s'il s'agit d'une baisse)\na) Entre 2023 et 2024.\nb) Entre 2024 et 2025.\nc) Entre 2023 et 2025.",
          figure: barres([
            { label: "2023", value: 40 },
            { label: "2024", value: 50 },
            { label: "2025", value: 45 },
          ], { pas: 10, unite: "GWh" }),
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "−10 %" },
            { question: "c)", attendu: "12,5 %" },
          ],
          correction:
            "On lit le diagramme : 40, puis 50, puis 45 GWh.\na) $\\dfrac{50 - 40}{40} = 0{,}25$, soit 25 %.\nb) La valeur de départ est maintenant 50 : $\\dfrac{45 - 50}{50} = -0{,}1$, soit −10 %.\nc) La valeur de départ est 40 : $\\dfrac{45 - 40}{40} = 0{,}125$, soit 12,5 %.\n⛔ Le piège au b) : diviser par 45 ou par 40. Le départ de cette période est 2024, donc 50.\nRéponse : a) 25 % ; b) −10 % ; c) 12,5 %.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Une cadre de santé suit l'attente moyenne aux urgences (modèle). Elle passe de 40 minutes à 30 minutes.\na) Quelle est la variation absolue, en minutes ? (nombre négatif s'il s'agit d'une baisse)\nb) Quel est le taux d'évolution, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "−10 min" },
            { question: "b)", attendu: "−25 %" },
          ],
          correction:
            "a) $30 - 40 = -10$ minutes.\nb) $\\dfrac{-10}{40} = -0{,}25$, soit −25 %.\n⛔ Le piège au b) : diviser par 30, ce qui donne environ −33 %. Le départ est 40 minutes.\nRéponse : a) −10 min ; b) −25 %.",
          micros: ["auto_evo_absolue_relative", "auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Un club d'athlétisme passe de 160 à 200 licenciés. Sa dirigeante annonce : « une hausse de 40 % ».\na) Quelle est la variation absolue ?\nb) Quel est le taux d'évolution, en pourcentage ?\nc) La dirigeante a-t-elle raison ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "25 %" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $200 - 160 = 40$ licenciés.\nb) $40 \\div 160 = 0{,}25$, soit 25 %.\nc) Non : elle a pris l'écart pour un pourcentage.\n⛔ Le piège : écrire un « % » derrière un écart. 40 licenciés de plus, ce n'est pas 40 %, sauf quand on part de 100.\nRéponse : a) 40 ; b) 25 % ; c) non.",
          micros: ["auto_evo_absolue_relative", "auto_evo_calculer_taux"],
        },
        {
          enonce:
            "La cheffe de rayon d'un magasin bio fait ses comptes (modèle). L'an dernier, le rayon fruits a fait 120 k€ de ventes, sur 400 k€ pour tout le magasin. Cette année, ce rayon fait 150 k€.\na) Quelle part des ventes du magasin le rayon fruits représentait-il l'an dernier ?\nb) Ce pourcentage exprime-t-il une proportion ou une évolution ? Réponds proportion ou évolution.\nc) Quel est le taux d'évolution des ventes de fruits ?\nd) Ce pourcentage exprime-t-il une proportion ou une évolution ?",
          reponses: [
            { question: "a)", attendu: "30 %" },
            { question: "b)", attendu: ["proportion","une proportion"] },
            { question: "c)", attendu: "25 %" },
            { question: "d)", attendu: ["évolution","une évolution"] },
          ],
          correction:
            "a) La partie sur le tout : $120 \\div 400 = 0{,}3$, soit 30 %.\nb) Une partie et un tout, à la même date : c'est une proportion.\nc) $\\dfrac{150 - 120}{120} = \\dfrac{30}{120} = 0{,}25$, soit 25 %.\nd) Deux dates pour la même grandeur : c'est une évolution.\n⛔ Le piège au c) : diviser par 400. Le 400 est le tout de la proportion, pas la valeur de départ des fruits.\nRéponse : a) 30 % ; b) proportion ; c) 25 % ; d) évolution.",
          micros: ["auto_evo_calculer_taux", "auto_evo_nature_pourcentage"],
        },
        {
          enonce:
            "Un technicien de déchetterie note que les déchets reçus passent de 500 tonnes à 425 tonnes en un an (modèle).\na) Quelle est la variation absolue, en tonnes ? (nombre négatif s'il s'agit d'une baisse)\nb) Quel est le taux d'évolution, en pourcentage ?\nc) Par quel coefficient a-t-on multiplié les déchets ?",
          reponses: [
            { question: "a)", attendu: "−75 t" },
            { question: "b)", attendu: "−15 %" },
            { question: "c)", attendu: ["0,85","× 0,85"] },
          ],
          correction:
            "a) $425 - 500 = -75$ tonnes.\nb) $\\dfrac{-75}{500} = -0{,}15$, soit −15 %.\nc) $425 \\div 500 = 0{,}85$.\nVérification : $0{,}85 - 1 = -0{,}15$. ✔\n⛔ Le piège au b) : diviser par 425. On obtiendrait un taux faux : le départ est 500.\nRéponse : a) −75 t ; b) −15 % ; c) 0,85.",
          micros: ["auto_evo_absolue_relative", "auto_evo_calculer_taux"],
        },
        {
          enonce:
            "Deux hôtels augmentent le prix de leur nuit. À l'hôtel Bleu, la nuit passe de 80 € à 92 €. À l'hôtel Vert, elle passe de 120 € à 132 €.\na) De combien d'euros chaque prix augmente-t-il ? Donne un seul nombre.\nb) Quel est le taux d'évolution à l'hôtel Bleu ?\nc) Quel est le taux d'évolution à l'hôtel Vert ?\nd) Quelle hausse est la plus forte en pourcentage ? Écris Bleu ou Vert.",
          reponses: [
            { question: "a)", attendu: "12 €" },
            { question: "b)", attendu: "15 %" },
            { question: "c)", attendu: "10 %" },
            { question: "d)", attendu: ["Bleu","hôtel Bleu","l'hôtel Bleu"] },
          ],
          correction:
            "a) $92 - 80 = 12$ € et $132 - 120 = 12$ € : la même hausse en euros.\nb) $12 \\div 80 = 0{,}15$, soit 15 %.\nc) $12 \\div 120 = 0{,}1$, soit 10 %.\nd) 15 % est plus grand que 10 % : c'est l'hôtel Bleu.\n⛔ Le piège au d) : répondre que les hausses sont égales. Le même écart pèse plus sur un petit prix de départ.\nRéponse : a) 12 € ; b) 15 % ; c) 10 % ; d) Bleu.",
          micros: ["auto_evo_absolue_relative"],
        },
        {
          enonce:
            "Une économiste prépare un cours avec des nombres fictifs. Un panier de courses passe de 250 € à 260 € en un an. Le PIB d'un pays imaginaire passe de 500 à 490 milliards d'euros.\na) Quel est le taux d'évolution du panier ?\nb) Quel est le taux de croissance du PIB ? (nombre négatif s'il s'agit d'une baisse)\nc) Le pourcentage du a) exprime-t-il une proportion ou une évolution ? Réponds proportion ou évolution.",
          reponses: [
            { question: "a)", attendu: "4 %" },
            { question: "b)", attendu: "−2 %" },
            { question: "c)", attendu: ["évolution","une évolution"] },
          ],
          correction:
            "a) $\\dfrac{260 - 250}{250} = \\dfrac{10}{250} = 0{,}04$, soit 4 %.\nb) $\\dfrac{490 - 500}{500} = \\dfrac{-10}{500} = -0{,}02$, soit −2 %.\nc) On compare le prix du même panier à deux dates : c'est une évolution.\n⛔ Le piège : croire que deux écarts de 10 donnent le même taux. Le départ n'est pas le même, 250 d'un côté et 500 de l'autre.\nRéponse : a) 4 % ; b) −2 % ; c) évolution.",
          micros: ["auto_evo_calculer_taux", "auto_evo_nature_pourcentage"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on écrit le départ et l'arrivée de chaque période, puis on calcule.",
      rappel: [
        "Sur plusieurs périodes, le départ change : chaque taux se calcule sur la valeur du début de SA période.",
        "Une proportion décrit une photo à une date ; un taux d'évolution décrit le film entre deux dates.",
        "L'écart dit qui gagne le plus d'unités ; le taux dit qui progresse le plus vite. Les deux réponses peuvent différer.",
      ],
      exercices: [
        {
          titre: "Le festival de jazz",
          enonce:
            "La directrice d'un festival de jazz relève ses entrées (modèle). Donne chaque taux d'évolution en pourcentage. (nombre négatif s'il s'agit d'une baisse)\na) Entre 2022 et 2023.\nb) Entre 2023 et 2024.\nc) Entre 2022 et 2024.\nd) Son adjoint additionne les taux du a) et du b) pour trouver celui du c). Sa méthode est-elle juste ? Réponds oui ou non.",
          figure: grille(["Année", "Entrées"], [
            [2022, "20 000"],
            [2023, "25 000"],
            [2024, "22 500"],
          ]),
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "−10 %" },
            { question: "c)", attendu: "12,5 %" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $\\dfrac{25\\,000 - 20\\,000}{20\\,000} = \\dfrac{5\\,000}{20\\,000} = 0{,}25$, soit 25 %.\nb) Le départ est 25 000 : $\\dfrac{22\\,500 - 25\\,000}{25\\,000} = \\dfrac{-2\\,500}{25\\,000} = -0{,}1$, soit −10 %.\nc) Le départ est 20 000 : $\\dfrac{22\\,500 - 20\\,000}{20\\,000} = \\dfrac{2\\,500}{20\\,000} = 0{,}125$, soit 12,5 %.\nd) Non : la somme donne $25 - 10 = 15$ %, alors que le calcul direct donne 12,5 %.\n⛔ Le piège au d) : additionner des taux. Les 25 % et les 10 % ne portent pas sur la même valeur de départ.\nRéponse : a) 25 % ; b) −10 % ; c) 12,5 % ; d) non.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          titre: "La part de marché",
          enonce:
            "Une cheffe de produit étudie son marché (modèle). Le marché total passe de 2 000 k€ à 2 500 k€. Son entreprise passe de 300 k€ à 375 k€.\na) Quel est le taux d'évolution du marché ?\nb) Quel est le taux d'évolution de son entreprise ?\nc) Quelle était la part de marché de l'entreprise au départ ?\nd) Quelle est sa part de marché à l'arrivée ?\ne) L'entreprise a-t-elle gagné des parts de marché ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "25 %" },
            { question: "c)", attendu: "15 %" },
            { question: "d)", attendu: "15 %" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) $\\dfrac{2\\,500 - 2\\,000}{2\\,000} = \\dfrac{500}{2\\,000} = 0{,}25$, soit 25 %.\nb) $\\dfrac{375 - 300}{300} = \\dfrac{75}{300} = 0{,}25$, soit 25 %.\nc) Une proportion : $300 \\div 2\\,000 = 0{,}15$, soit 15 %.\nd) $375 \\div 2\\,500 = 0{,}15$, soit 15 %.\ne) Non : la part reste à 15 %. L'entreprise grandit, mais seulement au même rythme que son marché.\n⛔ Le piège au e) : voir + 25 % et croire qu'elle gagne des parts. Le a) et le b) sont des évolutions, le c) et le d) des proportions.\nRéponse : a) 25 % ; b) 25 % ; c) 15 % ; d) 15 % ; e) non.",
          micros: ["auto_evo_calculer_taux", "auto_evo_nature_pourcentage"],
        },
        {
          titre: "Deux glaciers",
          enonce:
            "Une glaciologue compare deux petits glaciers imaginaires. Le glacier A passe de 400 m à 380 m de long. Le glacier B passe de 100 m à 90 m.\na) Donne la variation absolue de A, puis celle de B, en mètres et dans cet ordre (deux nombres négatifs).\nb) Donne le taux d'évolution de A, puis celui de B, en pourcentage et dans cet ordre.\nc) Quel glacier a le plus reculé en mètres ? Écris A ou B.\nd) Quel glacier a le plus reculé en pourcentage ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "−20 ; −10", ordre: true },
            { question: "b)", attendu: "−5 % ; −10 %", ordre: true },
            { question: "c)", attendu: ["A","glacier A","le glacier A"] },
            { question: "d)", attendu: ["B","glacier B","le glacier B"] },
          ],
          correction:
            "a) $380 - 400 = -20$ m pour A, et $90 - 100 = -10$ m pour B.\nb) $-20 \\div 400 = -0{,}05$, soit −5 %. $-10 \\div 100 = -0{,}1$, soit −10 %.\nc) En mètres, c'est A : 20 m contre 10 m.\nd) En pourcentage, c'est B : 10 % contre 5 %.\n⛔ Le piège : croire qu'il n'y a qu'un seul « plus grand recul ». L'écart et le taux ne répondent pas à la même question.\nRéponse : a) −20 ; −10 ; b) −5 % ; −10 % ; c) A ; d) B.",
          micros: ["auto_evo_absolue_relative"],
        },
        {
          titre: "Qui est le mieux augmenté ?",
          enonce:
            "Un représentant du personnel compare deux salaires (modèle). Un ouvrier passe de 1 600 € à 1 680 €. Une cadre passe de 3 000 € à 3 090 €.\na) Donne la hausse de l'ouvrier, puis celle de la cadre, en euros et dans cet ordre.\nb) Donne le taux d'évolution de l'ouvrier, puis celui de la cadre, dans cet ordre.\nc) Qui a la plus forte hausse en euros ? Écris ouvrier ou cadre.\nd) Qui a la plus forte hausse en pourcentage ? Écris ouvrier ou cadre.",
          reponses: [
            { question: "a)", attendu: "80 ; 90", ordre: true },
            { question: "b)", attendu: "5 % ; 3 %", ordre: true },
            { question: "c)", attendu: ["cadre","la cadre"] },
            { question: "d)", attendu: ["ouvrier","l'ouvrier"] },
          ],
          correction:
            "a) $1\\,680 - 1\\,600 = 80$ € et $3\\,090 - 3\\,000 = 90$ €.\nb) $80 \\div 1\\,600 = 0{,}05$, soit 5 %. $90 \\div 3\\,000 = 0{,}03$, soit 3 %.\nc) En euros, la cadre gagne le plus : 90 € contre 80 €.\nd) En pourcentage, c'est l'ouvrier : 5 % contre 3 %.\n⛔ Le piège : ne citer qu'un seul chiffre. Dire « la cadre est la mieux augmentée » ou « l'ouvrier est le mieux augmenté » dépend de la variation choisie.\nRéponse : a) 80 ; 90 ; b) 5 % ; 3 % ; c) cadre ; d) ouvrier.",
          micros: ["auto_evo_absolue_relative"],
        },
      ],
    },
  ],
};
