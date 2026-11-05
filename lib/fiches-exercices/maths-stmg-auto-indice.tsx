// ─── Fiche d'exercices : indice base 100 (STMG) — 20 exercices ──────────────────
//
// Notion auto_indice du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts` et son
// renfort `seconde/maths/evolutions-lycee-renfort.ts`). Le coach demande :
// interpréter un indice (l'écart à 100 est le taux depuis la référence), passer
// d'une évolution à l'indice, calculer un indice, retrouver une valeur, calculer
// le taux entre deux indices (l'écart n'est un pourcentage qu'en partant de 100),
// comparer des séries de même base, même d'unités différentes. Pas de changement
// de base : le coach ne le demande pas.
//
// ⭐ Aucune donnée réelle : tous les indices sont des modèles, signalés dans
// l'énoncé. Aucun n'est présenté comme un indice publié.
//
// Domaines et métiers : commerce (épicière), concerts (programmatrice), bus (agent
// de réseau), boulangerie (boulanger), photographie (photographe), cantine
// (gestionnaire), textile (acheteuse), assurances (courtière) ; comptabilité
// (comptable), vigne (vigneronne), immobilier neuf (notaire), secteurs (économiste),
// entreprise (dirigeante), inflation (professeure d'économie), santé (directeur de
// cabinet médical), aéroport (analyste) ; énergie (ingénieure), pouvoir d'achat
// (journaliste), parc national (guide), agriculture (conseillère agricole).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-3.mjs`.
//
// Micro-compétences : auto_indice_interpreter (1, 2, 3, 4, 16, 18),
// auto_indice_calculer (5, 6, 9, 10, 13, 15, 17, 18, 19, 20), auto_indice_vers_taux
// (8, 11, 14, 15, 16, 17, 19), auto_indice_comparer (7, 12, 13, 17, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres } from "@/lib/fiches-exercices/figures-donnees";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesAutoIndiceStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-indice",
  titre: "Indice base 100",
  accroche:
    "Vingt exercices pour lire un indice sans se tromper : ce que veut dire 112 en base 100, calculer un indice, retrouver une valeur, calculer le taux entre deux indices, et comparer des séries qui n'ont pas la même unité. Un aéroport, un vignoble, le prix d'un panier et un salaire, l'électricité et le solaire. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un indice, calculer un indice, ou comparer deux indices.",
      rappel: [
        "L'année de référence a pour indice 100. L'écart à 100 donne le taux depuis cette année : 107 veut dire + 7 %, 92 veut dire − 8 %.",
        "Indice = valeur ÷ valeur de référence × 100.",
        "Deux indices de même base se comparent directement : le plus grand a le plus progressé.",
        "Entre deux indices, quand on ne part pas de 100 : taux = (indice d'arrivée − indice de départ) ÷ indice de départ.",
      ],
      exercices: [
        {
          enonce:
            "Une épicière suit le prix du kilo de pommes (modèle). Base 100 en 2020, l'indice vaut 112 en 2024. Quel est le taux d'évolution entre 2020 et 2024, en pourcentage ?",
          reponses: [{ attendu: "12 %" }],
          correction:
            "L'année de référence vaut 100 : l'écart à 100 donne le taux.\n$112 - 100 = 12$, soit une hausse de 12 %.\n⛔ Le piège : répondre 112 %. Un indice n'est pas un taux : il faut le comparer à 100.\nRéponse : 12 %.",
          micros: ["auto_indice_interpreter"],
        },
        {
          enonce:
            "Une programmatrice suit le nombre de spectateurs de sa salle de concert (modèle). Base 100 en 2021, l'indice vaut 85 en 2024. Quel est le taux d'évolution entre 2021 et 2024, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [{ attendu: "−15 %" }],
          correction:
            "$85 - 100 = -15$ : une baisse de 15 %.\n⛔ Le piège : répondre 85 %, ou oublier le signe. L'indice est sous 100 : la salle a perdu des spectateurs.\nRéponse : −15 %.",
          micros: ["auto_indice_interpreter"],
        },
        {
          enonce:
            "Un agent de réseau de bus prépare un tableau en base 100 en 2021. Quel est l'indice d'aujourd'hui si, depuis 2021 :\na) le nombre d'abonnés a augmenté de 8 % ?\nb) le nombre de pannes a baissé de 20 % ?",
          reponses: [
            { question: "a)", attendu: "108" },
            { question: "b)", attendu: "80" },
          ],
          correction:
            "On ajoute le taux à 100, avec son signe.\na) $100 + 8 = 108$.\nb) $100 - 20 = 80$.\n⛔ Le piège au a) : répondre 8, qui est le taux, ou 1,08, qui est le coefficient. L'indice est cent fois le coefficient.\nRéponse : a) 108 ; b) 80.",
          micros: ["auto_indice_interpreter"],
        },
        {
          enonce:
            "Un boulanger lit l'indice du prix de la farine (modèle).\na) Quelle est l'année de référence ? Écris l'année.\nb) Quel est le taux d'évolution entre 2020 et 2022, en pourcentage ?\nc) Quel est le taux d'évolution entre 2020 et 2023, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          figure: grille(["Année", "Indice"], [
            [2020, 100],
            [2021, 104],
            [2022, 110],
            [2023, 97],
          ]),
          reponses: [
            { question: "a)", attendu: "2020" },
            { question: "b)", attendu: "10 %" },
            { question: "c)", attendu: "−3 %" },
          ],
          correction:
            "a) L'année de référence est celle où l'indice vaut 100 : 2020.\nb) $110 - 100 = 10$, soit 10 %.\nc) $97 - 100 = -3$, soit −3 %.\n⛔ Le piège au c) : calculer l'écart avec 2022 ($97 - 110$). La question part de 2020.\nRéponse : a) 2020 ; b) 10 % ; c) −3 %.",
          micros: ["auto_indice_interpreter"],
        },
        {
          enonce:
            "Une photographe a fait 200 k€ de chiffre d'affaires l'année de référence et 230 k€ cette année (modèle). Quel est l'indice de cette année, en base 100 l'année de référence ?",
          reponses: [{ attendu: "115" }],
          correction:
            "Indice = valeur ÷ valeur de référence × 100.\n$230 \\div 200 = 1{,}15$, puis $1{,}15 \\times 100 = 115$.\n⛔ Le piège : répondre 15, le taux d'évolution, ou 30, l'écart en k€.\nRéponse : 115.",
          micros: ["auto_indice_calculer"],
        },
        {
          enonce:
            "La gestionnaire d'une cantine servait 400 repas par jour l'année de référence. Elle en sert 340 aujourd'hui (modèle). Quel est l'indice d'aujourd'hui, en base 100 l'année de référence ?",
          reponses: [{ attendu: "85" }],
          correction:
            "$340 \\div 400 = 0{,}85$, puis $0{,}85 \\times 100 = 85$.\n⛔ Le piège : diviser 400 par 340. On divise toujours par la valeur de référence.\nRéponse : 85.",
          micros: ["auto_indice_calculer"],
        },
        {
          enonce:
            "Une acheteuse dans le textile compare deux prix (modèle). Base 100 en 2020 pour les deux, l'indice de la laine vaut 130 en 2024, celui du coton vaut 115. Lequel a le plus augmenté depuis 2020 ? Écris laine ou coton.",
          reponses: [{ attendu: ["laine", "la laine"] }],
          correction:
            "Même base, même année : on compare directement.\nLaine : $130 - 100 = 30$, soit + 30 %. Coton : $115 - 100 = 15$, soit + 15 %.\nC'est la laine.\n⛔ Le piège : penser qu'il faut connaître les prix en euros. La base 100 sert justement à s'en passer.\nRéponse : laine.",
          micros: ["auto_indice_comparer"],
        },
        {
          enonce:
            "Une courtière en assurances lit un indice de primes, base 100 en 2015, qui passe de 120 à 150 (modèle). Quel est le taux d'évolution, en pourcentage ?",
          reponses: [{ attendu: "25 %" }],
          correction:
            "On ne part pas de 100 : on applique la formule du taux aux indices.\n$\\dfrac{150 - 120}{120} = \\dfrac{30}{120} = 0{,}25$, soit 25 %.\n⛔ Le piège : répondre 30 %. L'écart de deux indices ne se lit en pourcentage que si l'on part de 100.\nRéponse : 25 %.",
          micros: ["auto_indice_vers_taux"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un tableau ou une situation : repérer la référence, puis calculer.",
      rappel: [
        "Retrouver une valeur : valeur = valeur de référence × indice ÷ 100.",
        "L'écart entre deux indices se compte en points. Il n'est un pourcentage que si l'on part de 100.",
        "La base 100 fait disparaître les unités : on peut comparer des euros et des personnes, à condition que la base soit la même année.",
      ],
      exercices: [
        {
          enonce:
            "Un comptable suit le chiffre d'affaires d'une société, en k€ (modèle). Calcule l'indice, en base 100 en 2020 :\na) de 2021 ;\nb) de 2022 ;\nc) de 2023.",
          figure: grille(["Année", "CA (k€)"], [
            [2020, 400],
            [2021, 420],
            [2022, 500],
            [2023, 460],
          ]),
          reponses: [
            { question: "a)", attendu: "105" },
            { question: "b)", attendu: "125" },
            { question: "c)", attendu: "115" },
          ],
          correction:
            "On divise toujours par la valeur de 2020, 400, puis on multiplie par 100.\na) $420 \\div 400 \\times 100 = 105$.\nb) $500 \\div 400 \\times 100 = 125$.\nc) $460 \\div 400 \\times 100 = 115$.\n⛔ Le piège au c) : diviser par la valeur de l'année d'avant, 500. La référence reste 2020.\nRéponse : a) 105 ; b) 125 ; c) 115.",
          micros: ["auto_indice_calculer"],
        },
        {
          enonce:
            "Une vigneronne a produit 250 hectolitres en 2019, l'année de référence (modèle). Quelle est sa production, en hectolitres :\na) l'année où l'indice vaut 120 ?\nb) l'année où l'indice vaut 90 ?",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "225" },
          ],
          correction:
            "L'indice divisé par 100 donne le coefficient.\na) $250 \\times 120 \\div 100 = 250 \\times 1{,}2 = 300$ hectolitres.\nb) $250 \\times 90 \\div 100 = 250 \\times 0{,}9 = 225$ hectolitres.\n⛔ Le piège au a) : calculer $250 + 120$. L'indice n'est pas une quantité à ajouter.\nRéponse : a) 300 ; b) 225.",
          micros: ["auto_indice_calculer"],
        },
        {
          enonce:
            "Une notaire suit l'indice du prix des logements neufs, base 100 en 2015 (modèle) : 125 en 2021, 150 en 2023, 120 en 2025. Donne le taux d'évolution, en pourcentage (nombre négatif s'il s'agit d'une baisse) :\na) entre 2021 et 2023 ;\nb) entre 2023 et 2025.",
          reponses: [
            { question: "a)", attendu: "20 %" },
            { question: "b)", attendu: "−20 %" },
          ],
          correction:
            "a) $\\dfrac{150 - 125}{125} = \\dfrac{25}{125} = 0{,}2$, soit 20 %.\nb) $\\dfrac{120 - 150}{150} = \\dfrac{-30}{150} = -0{,}2$, soit −20 %.\n⛔ Le piège : répondre 25 % puis −30 %. Ces écarts se comptent en points d'indice, et ne se lisent pas en pourcentage.\nRéponse : a) 20 % ; b) −20 %.",
          micros: ["auto_indice_vers_taux"],
        },
        {
          enonce:
            "Une économiste présente les indices de production de trois secteurs fictifs, base 100 en 2019.\na) Quel secteur a le plus progressé depuis 2019 ? Écris son nom comme sur le diagramme.\nb) Quel secteur a baissé ? Écris son nom.\nc) Quel est le taux d'évolution de l'industrie depuis 2019, en pourcentage ?",
          figure: barres([
            { label: "Tourisme", value: 125 },
            { label: "Industrie", value: 105 },
            { label: "Agricole", value: 90 },
          ]),
          reponses: [
            { question: "a)", attendu: ["tourisme","le tourisme"] },
            { question: "b)", attendu: ["agricole","l'agricole","le secteur agricole"] },
            { question: "c)", attendu: "5 %" },
          ],
          correction:
            "Même base : on compare directement à 100.\na) Le tourisme : $125 - 100 = 25$, soit + 25 %.\nb) L'agricole : l'indice 90 est sous 100.\nc) $105 - 100 = 5$, soit 5 %.\n⛔ Le piège au c) : répondre 105 %. L'indice se lit par son écart à 100.\nRéponse : a) tourisme ; b) agricole ; c) 5 %.",
          micros: ["auto_indice_comparer"],
        },
        {
          enonce:
            "La dirigeante d'une entreprise compare deux grandeurs, entre l'année de référence et aujourd'hui (modèle). Le chiffre d'affaires passe de 20 à 25 millions d'euros. Le nombre de salariés passe de 200 à 220.\na) Quel est l'indice d'aujourd'hui du chiffre d'affaires ?\nb) Quel est l'indice d'aujourd'hui du nombre de salariés ?\nc) Quelle grandeur a le plus progressé ? Écris CA ou salariés.\nd) Peut-on comparer directement 25 millions d'euros et 220 salariés ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "125" },
            { question: "b)", attendu: "110" },
            { question: "c)", attendu: ["CA","le CA","chiffre d'affaires","le chiffre d'affaires"] },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $25 \\div 20 \\times 100 = 125$.\nb) $220 \\div 200 \\times 100 = 110$.\nc) 125 est plus grand que 110 : le chiffre d'affaires a le plus progressé.\nd) Non : des euros et des personnes n'ont pas la même unité.\n⛔ Le piège au c) : voir 220 et 25, et conclure que les salariés l'emportent. Ces deux nombres ne se comparent pas.\nRéponse : a) 125 ; b) 110 ; c) CA ; d) non.",
          micros: ["auto_indice_calculer", "auto_indice_comparer"],
        },
        {
          enonce:
            "Une professeure d'économie prend un indice de prix fictif, base 100 en 2015 : 104 en 2018, 130 en 2024.\na) Quel est le taux d'évolution entre 2015 et 2024 ?\nb) Quel est l'écart, en points d'indice, entre 2018 et 2024 ?\nc) Quel est le taux d'évolution entre 2018 et 2024 ?",
          reponses: [
            { question: "a)", attendu: "30 %" },
            { question: "b)", attendu: "26" },
            { question: "c)", attendu: "25 %" },
          ],
          correction:
            "a) On part de 100 : $130 - 100 = 30$, soit 30 %.\nb) $130 - 104 = 26$ points.\nc) On ne part pas de 100 : $\\dfrac{26}{104} = 0{,}25$, soit 25 %.\n⛔ Le piège au c) : répondre 26 %. Cet écart de 26 points se rapporte à 104, pas à 100.\nRéponse : a) 30 % ; b) 26 ; c) 25 %.",
          micros: ["auto_indice_vers_taux"],
        },
        {
          enonce:
            "Le directeur d'un cabinet médical comptait 1 600 consultations l'année de référence (modèle). L'indice vaut 125 en 2023 et 110 en 2024.\na) Combien de consultations y a-t-il eu en 2023 ?\nb) Combien de consultations y a-t-il eu en 2024 ?\nc) Quel est le taux d'évolution entre 2023 et 2024, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "2 000" },
            { question: "b)", attendu: "1 760" },
            { question: "c)", attendu: "−12 %" },
          ],
          correction:
            "a) $1\\,600 \\times 1{,}25 = 2\\,000$ consultations.\nb) $1\\,600 \\times 1{,}1 = 1\\,760$ consultations.\nc) Sur les indices : $\\dfrac{110 - 125}{125} = \\dfrac{-15}{125} = -0{,}12$, soit −12 %.\nVérification sur les valeurs : $\\dfrac{1\\,760 - 2\\,000}{2\\,000} = -0{,}12$. ✔\n⛔ Le piège au c) : répondre −15 %. C'est l'écart en points : il faut le rapporter à 125.\nRéponse : a) 2 000 ; b) 1 760 ; c) −12 %.",
          micros: ["auto_indice_calculer", "auto_indice_vers_taux"],
        },
        {
          enonce:
            "Un analyste suit le trafic d'un aéroport (modèle). L'indice vaut 100 en 2020, 60 en 2021 et 90 en 2022. Donne chaque taux d'évolution en pourcentage (nombre négatif s'il s'agit d'une baisse) :\na) entre 2020 et 2021 ;\nb) entre 2020 et 2022 ;\nc) entre 2021 et 2022.",
          reponses: [
            { question: "a)", attendu: "−40 %" },
            { question: "b)", attendu: "−10 %" },
            { question: "c)", attendu: "50 %" },
          ],
          correction:
            "a) On part de 100 : $60 - 100 = -40$, soit −40 %.\nb) On part de 100 : $90 - 100 = -10$, soit −10 %.\nc) On part de 60 : $\\dfrac{90 - 60}{60} = \\dfrac{30}{60} = 0{,}5$, soit 50 %.\n⛔ Le piège au c) : répondre 30 %. Partir de 60, ce n'est pas partir de 100.\nRéponse : a) −40 % ; b) −10 % ; c) 50 %.",
          micros: ["auto_indice_interpreter", "auto_indice_vers_taux"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : les indices d'abord, puis la comparaison ou le taux.",
      rappel: [
        "Avant de comparer, on vérifie : même base, même année de référence.",
        "Depuis la référence, on lit l'écart à 100. Entre deux autres années, on divise par l'indice de départ.",
        "Les deux sens : indice = valeur ÷ référence × 100, et valeur = référence × indice ÷ 100.",
      ],
      exercices: [
        {
          titre: "L'électricité et le solaire",
          enonce:
            "Une ingénieure compare, sur le territoire d'une commune fictive, la consommation d'électricité et la production solaire.\na) Quel est l'indice de la consommation en 2024, base 100 en 2020 ?\nb) Quel est l'indice de la production solaire en 2024, base 100 en 2020 ?\nc) Laquelle a le plus progressé depuis 2020 ? Écris consommation ou solaire.\nd) Quel est le taux d'évolution de la production solaire entre 2022 et 2024 ?",
          figure: grille(["Année", "Consommation (MWh)", "Solaire (MWh)"], [
            [2020, "5 000", 200],
            [2022, "5 500", 250],
            [2024, "6 000", 300],
          ]),
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: ["solaire","le solaire","production solaire","la production solaire"] },
            { question: "d)", attendu: "20 %" },
          ],
          correction:
            "a) $6\\,000 \\div 5\\,000 \\times 100 = 120$.\nb) $300 \\div 200 \\times 100 = 150$.\nc) 150 est plus grand que 120 : c'est le solaire, même s'il reste bien plus petit en MWh.\nd) $\\dfrac{300 - 250}{250} = \\dfrac{50}{250} = 0{,}2$, soit 20 %.\n⛔ Le piège au c) : choisir la consommation parce qu'elle gagne 1 000 MWh. L'indice compare les progressions, pas les quantités.\nRéponse : a) 120 ; b) 150 ; c) solaire ; d) 20 %.",
          micros: ["auto_indice_calculer", "auto_indice_vers_taux", "auto_indice_comparer"],
        },
        {
          titre: "Les prix et les salaires",
          enonce:
            "Une journaliste écrit sur un pays imaginaire. Base 100 en 2018 : en 2024, l'indice des prix vaut 120 et l'indice des salaires vaut 112.\na) Quel est le taux d'évolution des prix depuis 2018 ?\nb) Quel est le taux d'évolution des salaires depuis 2018 ?\nc) Qui a le plus augmenté ? Écris prix ou salaires.\nd) Un panier coûtait 150 € en 2018. Combien coûte-t-il en 2024 ?\ne) Un salaire était de 2 000 € en 2018. Combien vaut-il en 2024 ?",
          reponses: [
            { question: "a)", attendu: "20 %" },
            { question: "b)", attendu: "12 %" },
            { question: "c)", attendu: ["prix","les prix"] },
            { question: "d)", attendu: "180 €" },
            { question: "e)", attendu: "2 240 €" },
          ],
          correction:
            "a) $120 - 100 = 20$, soit 20 %.\nb) $112 - 100 = 12$, soit 12 %.\nc) Même base, 120 est plus grand que 112 : les prix.\nd) $150 \\times 1{,}2 = 180$ €.\ne) $2\\,000 \\times 1{,}12 = 2\\,240$ €.\n⛔ Le piège : comparer 2 240 € et 180 € pour dire que les salaires ont gagné. Ce sont les indices qui se comparent.\nRéponse : a) 20 % ; b) 12 % ; c) prix ; d) 180 € ; e) 2 240 €.",
          micros: ["auto_indice_interpreter", "auto_indice_calculer", "auto_indice_comparer"],
        },
        {
          titre: "La phrase du guide",
          enonce:
            "Un guide de parc national lit l'indice de la fréquentation (modèle) : 160 en 2022 et 200 en 2024. Il écrit : « + 40 % de visiteurs en deux ans ». En 2022, le parc a reçu 8 000 visiteurs.\na) Quel est l'écart, en points d'indice ?\nb) Quel est le vrai taux d'évolution ?\nc) La phrase du guide est-elle vraie ? Réponds vrai ou faux.\nd) Combien de visiteurs le parc a-t-il reçus l'année de référence ?\ne) Combien de visiteurs a-t-il reçus en 2024 ?",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "25 %" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "5 000" },
            { question: "e)", attendu: "10 000" },
          ],
          correction:
            "a) $200 - 160 = 40$ points.\nb) $\\dfrac{40}{160} = 0{,}25$, soit 25 %.\nc) Faux : il a pris les points pour des pourcentages.\nd) L'indice 160 correspond à 8 000 visiteurs, soit la référence × 1,6. On divise : $8\\,000 \\div 1{,}6 = 5\\,000$ visiteurs.\ne) $5\\,000 \\times 200 \\div 100 = 10\\,000$ visiteurs.\nVérification : $\\dfrac{10\\,000 - 8\\,000}{8\\,000} = 0{,}25$. ✔\n⛔ Le piège au b) : garder 40 %. L'écart est rapporté à 160, pas à 100.\nRéponse : a) 40 ; b) 25 % ; c) faux ; d) 5 000 ; e) 10 000.",
          micros: ["auto_indice_calculer", "auto_indice_vers_taux"],
        },
        {
          titre: "Les trois productions",
          enonce:
            "Une conseillère agricole compare trois productions d'une coopérative fictive, entre 2021 et 2024. Le blé passe de 400 à 480 tonnes, le lait de 1 000 à 1 100 hectolitres, les pommes de 250 à 225 tonnes.\na) Donne les indices de 2024, base 100 en 2021, pour le blé, le lait et les pommes, dans cet ordre.\nb) Quelle production a le plus progressé ? Écris blé, lait ou pommes.\nc) Quelle production a baissé ? Écris blé, lait ou pommes.\nd) Quel est le taux d'évolution des pommes, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "120 ; 110 ; 90", ordre: true },
            { question: "b)", attendu: ["blé","le blé"] },
            { question: "c)", attendu: ["pommes","les pommes"] },
            { question: "d)", attendu: "−10 %" },
          ],
          correction:
            "a) $480 \\div 400 \\times 100 = 120$, puis $1\\,100 \\div 1\\,000 \\times 100 = 110$, puis $225 \\div 250 \\times 100 = 90$.\nb) Le plus grand indice est 120 : c'est le blé.\nc) Seul l'indice 90 est sous 100 : ce sont les pommes.\nd) $90 - 100 = -10$, soit −10 %.\n⛔ Le piège au b) : choisir le lait parce qu'il gagne 100 unités. Ce sont des hectolitres, et on compare des progressions.\nRéponse : a) 120 ; 110 ; 90 ; b) blé ; c) pommes ; d) −10 %.",
          micros: ["auto_indice_calculer", "auto_indice_comparer"],
        },
      ],
    },
  ],
};
