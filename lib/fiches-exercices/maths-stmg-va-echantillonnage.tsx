// ─── Fiche d'exercices : fluctuation d'échantillonnage (STMG) — 20 exercices ──
//
// Cinquième feuille de STMG (22/10/2026), sœur des feuilles « données » (mêmes
// dessins, `figures-donnees.tsx`, plus `intervalle` : l'axe des fréquences et sa
// bande p ± 1/√n). Notion va_echantillonnage du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`) :
// observer la fluctuation sur des simulations, interpréter la distance de la
// fréquence observée f à la proportion p, décider si une observation est
// fréquente ou rare, savoir que diviser la dispersion par k demande de
// multiplier la taille par k².
//
// ⭐⭐ LA RÈGLE DE LA FEUILLE, vraie pour n ≥ 25 et p entre 0,2 et 0,8 :
// environ 95 % des échantillons de taille n ont une fréquence f telle que
// |f − p| ≤ 1/√n. Une fréquence plus loin de p est RARE (environ 5 % des
// échantillons) : elle fait DOUTER du modèle, elle ne PROUVE rien.
// ⚠️ On n'appelle PAS 1/√n « l'écart-type » : l'écart-type des fréquences vaut
// √(p(1 − p)/n), au plus la moitié de 1/√n (signalé au coach le 22/10).
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 3 — groupe O : 42 % de la population française (Établissement
//     français du sang) ;
//   · ex. 6 — naissances : environ 105 garçons pour 100 filles (INSEE), soit
//     p = 105 ÷ 205 ≈ 0,512 ;
//   · ex. 10 — second tour de l'élection présidentielle du 24 avril 2022 :
//     Emmanuel Macron 58,55 % des suffrages exprimés (Conseil constitutionnel) ;
//   · ex. 17 — la roulette européenne : 37 cases, 18 rouges, 18 noires, le zéro.
// Les simulations et les autres observations sont des MODÈLES.
// Domaines et métiers, un par exercice : simulation (ingénieure), industrie
// (contrôleur qualité), don du sang (infirmier), sondage d'opinion (directeur
// d'institut), football (arbitre), maternité (sage-femme), mutuelle (chargée
// d'études), agronomie (agronome), marketing digital (chargé de marketing),
// science politique (politologue), consommation (juriste d'une association),
// banque (directeur régional), presse (journaliste politique), publicité
// (chargée de communication), e-commerce (responsable des ventes), gestion
// d'un institut (directrice financière), casino (inspecteur des jeux), mairie
// (chargé de démocratie participative), semences (technicienne), données (data
// scientist).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-va-echantillonnage.mjs`.
//
// Micro-compétences : va_ech_fluctuation (1, 2, 9, 14, 20), va_ech_distance (3,
// 4, 9, 10, 12, 20), va_ech_rare_ou_frequent (5, 6, 10, 11, 12, 14, 15, 17, 18,
// 19, 20), va_ech_taille (2, 4, 7, 8, 13, 16, 18, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, ecranSeulement, grille, intervalle } from "@/lib/fiches-exercices/figures-donnees";

export const exercicesVaEchantillonnageStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-echantillonnage",
  titre: "La fluctuation d'échantillonnage",
  accroche:
    "Vingt exercices pour comprendre pourquoi deux sondages ne donnent jamais le même résultat : observer la fluctuation sur des simulations, mesurer la distance entre une fréquence observée et la proportion attendue, décider si une observation est fréquente ou rare, et savoir combien de personnes interroger pour être deux fois plus précis. Contrôle qualité, sondages, maternité, banque, e-commerce ; et des données réelles : le don du sang, les naissances, l'élection présidentielle de 2022, la roulette du casino. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire des fréquences simulées, calculer 1 ÷ √n, placer une fréquence, ou choisir une taille d'échantillon.",
      rappel: [
        "Un échantillon de taille n : n individus pris au hasard dans une population où la proportion du caractère vaut p. On y observe une fréquence f.",
        "La FLUCTUATION d'échantillonnage : f change d'un échantillon à l'autre, même quand p ne change pas.",
        "Pour n ≥ 25 et p entre 0,2 et 0,8 : environ 95 % des échantillons ont une fréquence entre p − 1 ÷ √n et p + 1 ÷ √n.",
        "Une fréquence en dehors de cet intervalle est RARE : elle fait douter du modèle, sans le prouver faux.",
      ],
      exercices: [
        {
          enonce:
            "Une ingénieure en simulation fait lancer au tableur une pièce équilibrée 20 fois, et recommence 10 fois (modèle). Le diagramme donne la fréquence de « pile » dans chacun des 10 échantillons.\na) Quelles sont la plus petite et la plus grande fréquence ? Dans quels échantillons ?\nb) Combien d'échantillons donnent exactement 0,5 ?\nc) Combien de « pile » l'échantillon 7 compte-t-il ?\nd) La pièce est équilibrée. Pourquoi les fréquences ne valent-elles pas toutes 0,5 ?",
          figure: barres([
            { label: "1", value: 0.45 },
            { label: "2", value: 0.6 },
            { label: "3", value: 0.5 },
            { label: "4", value: 0.35 },
            { label: "5", value: 0.55 },
            { label: "6", value: 0.4 },
            { label: "7", value: 0.65 },
            { label: "8", value: 0.5 },
            { label: "9", value: 0.45 },
            { label: "10", value: 0.55 },
          ], { pas: 0.1, unite: "fréquence de pile" }),
          correction:
            "L'axe va de 0,1 en 0,1. Une barre entre deux lignes vaut le nombre du milieu.\na) La plus basse est celle de l'échantillon 4 : au milieu, entre 0,3 et 0,4, soit 0,35. La plus haute, celle de l'échantillon 7 : au milieu, entre 0,6 et 0,7, soit 0,65.\nb) Les barres sur la ligne 0,5 : les échantillons 3 et 8. 2 échantillons.\nc) $0{,}65 \\times 20 = 13$ « pile ».\nd) C'est la fluctuation d'échantillonnage : chaque série de 20 lancers est un nouveau hasard. Les fréquences se répartissent AUTOUR de 0,5, sans tomber dessus à chaque fois.\n⛔ Le piège : conclure que la pièce est truquée parce que l'échantillon 7 donne 0,65. Sur 20 lancers, de tels écarts sont courants.\nRéponse : a) 0,35 (échantillon 4) et 0,65 (échantillon 7) ; b) 2 ; c) 13 ; d) la fluctuation d'échantillonnage.",
          micros: ["va_ech_fluctuation"],
        },
        {
          enonce:
            "Un contrôleur qualité simule des prélèvements dans une production où 20 % des pièces ont un défaut (modèle) : 5 échantillons de 25 pièces, puis 5 échantillons de 400 pièces. Le tableau donne la fréquence des pièces défectueuses.\na) Calcule l'étendue des fréquences pour n = 25, puis pour n = 400.\nb) Quelle taille d'échantillon fluctue le moins ?\nc) Combien de pièces défectueuses compte le 2e échantillon de 25 pièces ?",
          figure: grille(["Échantillon", "n = 25", "n = 400"], [
            [1, 0.12, 0.195],
            [2, 0.28, 0.21],
            [3, 0.2, "0,1875"],
            [4, 0.32, "0,2025"],
            [5, 0.16, 0.215],
          ]),
          correction:
            "a) n = 25 : la plus grande fréquence est 0,32, la plus petite 0,12. $0{,}32 - 0{,}12 = 0{,}2$.\nn = 400 : la plus grande est 0,215, la plus petite 0,1875. $0{,}215 - 0{,}1875 = 0{,}0275$.\nb) Les échantillons de 400 pièces : leurs fréquences restent toutes près de 0,2.\nc) $0{,}28 \\times 25 = 7$ pièces défectueuses.\n⭐ Plus l'échantillon est grand, moins la fréquence fluctue autour de p.\n⛔ Le piège au a) : comparer deux valeurs au hasard. L'étendue, c'est la plus grande moins la plus petite.\nRéponse : a) 0,2 et 0,0275 ; b) n = 400 ; c) 7 pièces.",
          micros: ["va_ech_fluctuation", "va_ech_taille"],
        },
        {
          enonce:
            "Un infirmier de l'Établissement français du sang prépare une collecte. En France, 42 % des personnes sont du groupe O. Sur les 400 donneurs de la collecte, 180 sont du groupe O.\na) Calcule $\\dfrac{1}{\\sqrt{n}}$ pour n = 400.\nb) Donne l'intervalle où l'on attend la fréquence du groupe O dans environ 95 % des collectes de 400 donneurs.\nc) Calcule la fréquence observée et sa distance à 0,42. Cette collecte est-elle ordinaire ?",
          correction:
            "a) $\\dfrac{1}{\\sqrt{400}} = \\dfrac{1}{20} = 0{,}05$.\nb) De $0{,}42 - 0{,}05 = 0{,}37$ à $0{,}42 + 0{,}05 = 0{,}47$ : l'intervalle [0,37 ; 0,47].\nc) $f = 180 \\div 400 = 0{,}45$. Distance : $0{,}45 - 0{,}42 = 0{,}03$, moins que 0,05.\nLa fréquence est dans l'intervalle : la collecte est ordinaire, l'écart est une simple fluctuation.\n⛔ Le piège au c) : s'étonner que f ne vaille pas 0,42. Sur 400 donneurs, un écart de 0,03 est banal.\nRéponse : a) 0,05 ; b) [0,37 ; 0,47] ; c) 0,45, distance 0,03 : ordinaire.",
          schema: ecranSeulement(intervalle(0.3, 0.55, 0.05, { p: 0.42, e: 0.05, points: [{ label: "f", value: 0.45 }] })),
          micros: ["va_ech_distance"],
        },
        {
          enonce:
            "Le directeur d'un institut de sondage montre à un client comment la taille de l'échantillon joue sur la précision. Arrondis au millième si besoin.\na) Complète le tableau.\nb) Quand n passe de 100 à 400, par combien la distance $\\dfrac{1}{\\sqrt{n}}$ est-elle divisée ?\nc) Quand n passe de 100 à 10 000 ?",
          figure: grille(["taille n", "1 ÷ √n"], [
            [100, "?"],
            [400, "?"],
            [1000, "?"],
            [2500, "?"],
            ["10 000", "?"],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{100}} = \\dfrac{1}{10} = 0{,}1$ ; $\\dfrac{1}{\\sqrt{400}} = \\dfrac{1}{20} = 0{,}05$ ; $\\dfrac{1}{\\sqrt{1000}} \\approx 0{,}032$ ; $\\dfrac{1}{\\sqrt{2500}} = \\dfrac{1}{50} = 0{,}02$ ; $\\dfrac{1}{\\sqrt{10\\,000}} = \\dfrac{1}{100} = 0{,}01$.\nb) $0{,}1 \\div 0{,}05 = 2$ : divisée par 2, alors que n a été multiplié par 4.\nc) $0{,}1 \\div 0{,}01 = 10$ : divisée par 10, alors que n a été multiplié par 100.\n⛔ Le piège : croire qu'un échantillon 4 fois plus grand est 4 fois plus précis. La précision suit la RACINE de n.\nRéponse : a) 0,1 ; 0,05 ; environ 0,032 ; 0,02 ; 0,01 ; b) par 2 ; c) par 10.",
          micros: ["va_ech_distance", "va_ech_taille"],
        },
        {
          enonce:
            "Avant un match, une arbitre de football teste la pièce du tirage au sort : sur 100 lancers, elle obtient 62 « pile ».\na) Si la pièce est équilibrée (p = 0,5), dans quel intervalle attend-on la fréquence de « pile » dans environ 95 % des séries de 100 lancers ?\nb) L'observation est-elle fréquente ou rare ?\nc) Peut-on affirmer que la pièce est truquée ?",
          correction:
            "a) $\\dfrac{1}{\\sqrt{100}} = 0{,}1$. De $0{,}5 - 0{,}1 = 0{,}4$ à $0{,}5 + 0{,}1 = 0{,}6$ : l'intervalle [0,4 ; 0,6].\nb) $f = 62 \\div 100 = 0{,}62$. Distance à 0,5 : $0{,}62 - 0{,}5 = 0{,}12$, plus que 0,1. L'observation est rare.\nc) Non : une série rare arrive environ une fois sur vingt avec une pièce équilibrée. Mais elle fait douter : l'arbitre a raison de changer de pièce, ou de relancer une longue série.\n⛔ Le piège au c) : confondre « rare » et « impossible ».\nRéponse : a) [0,4 ; 0,6] ; b) rare ; c) non, mais on peut douter de la pièce.",
          schema: ecranSeulement(intervalle(0.3, 0.7, 0.1, { p: 0.5, e: 0.1, points: [{ label: "f", value: 0.62 }] })),
          micros: ["va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "En France, il naît environ 105 garçons pour 100 filles. Une sage-femme compte, dans sa maternité, 1340 garçons sur 2500 naissances de l'année.\na) Calcule la proportion p de garçons à la naissance en France, arrondie au millième.\nb) Donne l'intervalle où l'on attend la fréquence de garçons dans environ 95 % des maternités de 2500 naissances.\nc) La maternité est-elle dans la norme ?",
          correction:
            "a) Sur $105 + 100 = 205$ naissances, 105 garçons : $p = 105 \\div 205 \\approx 0{,}512$.\nb) $\\dfrac{1}{\\sqrt{2500}} = \\dfrac{1}{50} = 0{,}02$. De $0{,}512 - 0{,}02 = 0{,}492$ à $0{,}512 + 0{,}02 = 0{,}532$ : l'intervalle [0,492 ; 0,532].\nc) $f = 1340 \\div 2500 = 0{,}536$. C'est plus que 0,532 : l'observation est rare. Ce n'est pas une anomalie prouvée, mais un écart qu'on surveille l'année suivante.\n⛔ Le piège au a) : prendre p = 105 ÷ 100. La proportion se calcule sur toutes les naissances, garçons ET filles.\nRéponse : a) environ 0,512 ; b) [0,492 ; 0,532] ; c) non, 0,536 est une fréquence rare.",
          schema: ecranSeulement(intervalle(0.46, 0.56, 0.02, { p: 0.512, e: 0.02, points: [{ label: "f", value: 0.536 }] })),
          micros: ["va_ech_rare_ou_frequent", "va_ech_distance"],
        },
        {
          enonce:
            "Une chargée d'études d'une mutuelle interroge 400 adhérents : la distance $\\dfrac{1}{\\sqrt{n}}$ vaut alors 0,05. Elle veut une distance deux fois plus petite, 0,025.\na) Combien d'adhérents doit-elle interroger ?\nb) Son collègue propose d'en interroger 800. Quelle distance obtiendrait-il ? Arrondis au millième.",
          correction:
            "a) Diviser $\\dfrac{1}{\\sqrt{n}}$ par 2 demande de multiplier n par $2^2 = 4$ : $400 \\times 4 = 1600$ adhérents.\nContrôle : $\\dfrac{1}{\\sqrt{1600}} = \\dfrac{1}{40} = 0{,}025$.\nb) $\\dfrac{1}{\\sqrt{800}} \\approx 0{,}035$ : pas assez précis.\n⛔ Le piège au b) : doubler n pour diviser la distance par 2. La racine de 2 ne vaut pas 2 : il faut multiplier n par 4.\nRéponse : a) 1600 adhérents ; b) environ 0,035.",
          schema: ecranSeulement(
            grille(["taille n", "1 ÷ √n"], [
              [400, "0,05"],
              [800, "≈ 0,035"],
              [1600, "0,025"],
            ]),
          ),
          micros: ["va_ech_taille"],
        },
        {
          enonce:
            "Un agronome teste la germination de graines par lots de 100 : la distance $\\dfrac{1}{\\sqrt{n}}$ vaut alors 0,1.\na) Il veut une distance trois fois plus petite. Combien de graines par lot ?\nb) Avec des lots de 2500 graines, par combien la distance est-elle divisée ?",
          correction:
            "a) Diviser par 3 demande de multiplier n par $3^2 = 9$ : $100 \\times 9 = 900$ graines.\nContrôle : $\\dfrac{1}{\\sqrt{900}} = \\dfrac{1}{30} \\approx 0{,}033$, et $0{,}1 \\div 3 \\approx 0{,}033$.\nb) $\\dfrac{1}{\\sqrt{2500}} = \\dfrac{1}{50} = 0{,}02$, et $0{,}1 \\div 0{,}02 = 5$ : divisée par 5. En effet, $2500 = 100 \\times 25 = 100 \\times 5^2$.\n⛔ Le piège au a) : multiplier par 3. Il faut multiplier par le CARRÉ de 3.\nRéponse : a) 900 graines ; b) par 5.",
          schema: ecranSeulement(
            grille(["taille n", "1 ÷ √n"], [
              [100, "0,1"],
              [900, "≈ 0,033"],
              [2500, "0,02"],
            ]),
          ),
          micros: ["va_ech_taille"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je calcule 1 ÷ √n, j'écris l'intervalle, je place chaque fréquence observée, puis je conclus par une phrase prudente.",
      rappel: [
        "L'intervalle des fréquences attendues : de p − 1 ÷ √n à p + 1 ÷ √n. J'arrondis ses bornes au millième si besoin.",
        "Dans l'intervalle : fréquence courante, l'écart s'explique par la fluctuation. En dehors : fréquence rare, on doute du modèle.",
        "Diviser 1 ÷ √n par k demande de multiplier n par k² (par 4 pour diviser par 2, par 9 pour diviser par 3).",
      ],
      exercices: [
        {
          enonce:
            "Un chargé de marketing digital sait que 30 % des personnes qui voient sa bannière cliquent dessus. Il simule au tableur 20 échantillons de 100 personnes (modèle) et note la fréquence des clics.\na) Calcule l'intervalle où l'on attend environ 95 % des fréquences.\nb) Combien d'échantillons sont en dehors de cet intervalle ?\nc) Quelle part des 20 échantillons est dans l'intervalle ? Est-ce conforme à la règle ?",
          figure: grille(["1 à 5", "6 à 10", "11 à 15", "16 à 20"], [
            [0.31, 0.33, 0.34, 0.24],
            [0.27, 0.3, 0.32, 0.29],
            [0.35, 0.41, 0.25, 0.38],
            [0.29, 0.28, 0.36, 0.31],
            [0.22, 0.26, 0.3, 0.33],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{100}} = 0{,}1$. De $0{,}3 - 0{,}1 = 0{,}2$ à $0{,}3 + 0{,}1 = 0{,}4$ : l'intervalle [0,2 ; 0,4].\nb) Je cherche les fréquences sous 0,2 ou au-dessus de 0,4 : seule 0,41 (échantillon 8) est dehors. 1 échantillon.\nc) $20 - 1 = 19$ échantillons dans l'intervalle. $19 \\div 20 = 0{,}95$, soit 95 % : c'est exactement ce que prévoit la règle.\n⛔ Le piège au b) : compter 0,22 ou 0,38 comme dehors. Elles sont proches des bornes, mais à l'intérieur.\nRéponse : a) [0,2 ; 0,4] ; b) 1 ; c) 95 %, conforme.",
          micros: ["va_ech_fluctuation", "va_ech_distance"],
        },
        {
          enonce:
            "Le 24 avril 2022, au second tour de l'élection présidentielle, Emmanuel Macron a obtenu 58,55 % des suffrages exprimés. Une politologue relit trois sondages de 1000 électeurs chacun, faits la veille. Arrondis au millième.\na) Calcule l'intervalle où l'on attend environ 95 % des sondages de 1000 électeurs, avec p = 0,5855.\nb) Pour chaque sondage, calcule la distance à p. Lequel donne une fréquence rare ?",
          figure: grille(["Sondage", "Électeurs", "Macron"], [
            ["A", 1000, "57 %"],
            ["B", 1000, "61 %"],
            ["C", 1000, "54 %"],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{1000}} \\approx 0{,}032$. Bornes : $0{,}5855 - 0{,}0316 \\approx 0{,}554$ et $0{,}5855 + 0{,}0316 \\approx 0{,}617$. L'intervalle [0,554 ; 0,617].\nb) A : $0{,}5855 - 0{,}57 = 0{,}0155$. B : $0{,}61 - 0{,}5855 = 0{,}0245$. C : $0{,}5855 - 0{,}54 = 0{,}0455$.\nSeule la distance de C dépasse 0,0316 : 0,54 est hors de l'intervalle. Le sondage C donne une fréquence rare.\n⛔ Le piège au a) : arrondir 1 ÷ √1000 à 0,03 avant de calculer les bornes. On garde 0,0316, et l'on arrondit à la fin.\nRéponse : a) [0,554 ; 0,617] ; b) 0,0155, 0,0245 et 0,0455 : le sondage C est rare.",
          micros: ["va_ech_distance", "va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "Une compagnie aérienne annonce que 80 % de ses vols partent à l'heure. La juriste d'une association de consommateurs observe 400 vols en mars, puis 400 vols en avril.\na) Si l'annonce est vraie, dans quel intervalle attend-on la fréquence des vols à l'heure ?\nb) Calcule la fréquence de chaque mois. Lequel est rare ?\nc) Que peut écrire l'association ?",
          figure: grille(["Mois", "Vols observés", "À l'heure"], [
            ["Mars", 400, 316],
            ["Avril", 400, 284],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{400}} = 0{,}05$. De $0{,}8 - 0{,}05 = 0{,}75$ à $0{,}8 + 0{,}05 = 0{,}85$ : l'intervalle [0,75 ; 0,85].\nb) Mars : $316 \\div 400 = 0{,}79$, dans l'intervalle, fréquence courante. Avril : $284 \\div 400 = 0{,}71$, sous 0,75 : fréquence rare.\nc) En avril, la ponctualité observée est rare si l'annonce de 80 % était vraie : l'association peut mettre en doute cette annonce et demander des explications. Elle ne peut pas écrire que l'annonce est fausse : c'est un doute, pas une preuve.\n⛔ Le piège : juger mars « mauvais » parce que 0,79 est sous 0,8. Il est dans l'intervalle : l'écart est une fluctuation.\nRéponse : a) [0,75 ; 0,85] ; b) 0,79 et 0,71, avril est rare ; c) elle peut douter de l'annonce, sans la déclarer fausse.",
          micros: ["va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "Le directeur régional d'une banque sait que 35 % des clients utilisent l'application chaque semaine. Il observe 900 clients dans deux agences, Nord et Sud, et place leurs fréquences sur l'axe. Arrondis au millième.\na) Calcule l'intervalle où l'on attend environ 95 % des fréquences pour 900 clients.\nb) Trace-le sur l'axe. Quelle agence a une fréquence rare ?",
          figure: intervalle(0.25, 0.45, 0.05, { p: 0.35, points: [{ label: "Nord", value: 0.3 }, { label: "Sud", value: 0.36 }] }),
          correction:
            "a) $\\dfrac{1}{\\sqrt{900}} = \\dfrac{1}{30} \\approx 0{,}0333$. Bornes : $0{,}35 - 0{,}0333 \\approx 0{,}317$ et $0{,}35 + 0{,}0333 \\approx 0{,}383$. L'intervalle [0,317 ; 0,383].\nb) Sud : 0,36, dans l'intervalle, courant. Nord : 0,30, sous 0,317 : rare. L'agence Nord a sans doute un vrai retard sur l'application.\n⛔ Le piège au b) : dire que Sud « fait mieux que prévu ». 0,36 est à 0,01 de p : c'est une simple fluctuation.\nRéponse : a) [0,317 ; 0,383] ; b) l'agence Nord.",
          schema: ecranSeulement(intervalle(0.25, 0.45, 0.05, { p: 0.35, e: 0.0333, points: [{ label: "Nord", value: 0.3 }, { label: "Sud", value: 0.36 }] })),
          micros: ["va_ech_distance", "va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "Un journaliste politique compare deux sondages publiés le même jour. Arrondis au millième.\na) Calcule $\\dfrac{1}{\\sqrt{n}}$ pour chaque sondage.\nb) Lequel est le plus précis ? Combien de fois plus ?\nc) Combien de personnes faudrait-il interroger pour une distance de 0,01 ?",
          figure: grille(["Sondage", "Personnes interrogées"], [
            ["Journal A", 900],
            ["Journal B", 3600],
          ]),
          correction:
            "a) A : $\\dfrac{1}{\\sqrt{900}} = \\dfrac{1}{30} \\approx 0{,}033$. B : $\\dfrac{1}{\\sqrt{3600}} = \\dfrac{1}{60} \\approx 0{,}017$.\nb) Le sondage B, deux fois plus précis : $3600 = 900 \\times 4 = 900 \\times 2^2$, donc la distance est divisée par 2.\nc) $\\dfrac{1}{\\sqrt{n}} = 0{,}01$ quand $\\sqrt{n} = 100$, soit $n = 100^2 = 10\\,000$ personnes.\n⛔ Le piège au b) : répondre « 4 fois plus précis » parce que B a interrogé 4 fois plus de monde.\nRéponse : a) environ 0,033 et 0,017 ; b) B, 2 fois plus précis ; c) 10 000 personnes.",
          micros: ["va_ech_taille"],
        },
        {
          enonce:
            "Une chargée de communication teste deux affiches publicitaires. Chacune est montrée à 100 passants ; 46 % se souviennent de l'affiche 1, 54 % de l'affiche 2. Son chef conclut : « L'affiche 2 est meilleure. » On suppose qu'en réalité, les deux affiches sont retenues par la moitié des passants (p = 0,5).\na) Calcule l'intervalle où l'on attend environ 95 % des fréquences pour 100 passants.\nb) Les deux fréquences sont-elles courantes ou rares ?\nc) Le chef a-t-il raison de conclure ?",
          figure: intervalle(0.3, 0.7, 0.1, { p: 0.5, points: [{ label: "affiche 1", value: 0.46 }, { label: "affiche 2", value: 0.54 }] }),
          correction:
            "a) $\\dfrac{1}{\\sqrt{100}} = 0{,}1$. L'intervalle [0,4 ; 0,6].\nb) 0,46 et 0,54 sont toutes deux dans l'intervalle : ce sont des fréquences courantes, même si les deux affiches se valent.\nc) Non. Un écart de 0,08 entre deux échantillons de 100 passants s'explique très bien par la fluctuation. Pour départager les affiches, il faut des échantillons bien plus grands.\n⛔ Le piège : comparer deux fréquences sans regarder la taille des échantillons.\nRéponse : a) [0,4 ; 0,6] ; b) courantes toutes les deux ; c) non, l'écart peut venir de la fluctuation.",
          micros: ["va_ech_fluctuation", "va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "Le responsable des ventes d'un site marchand sait que 25 % de ses visiteurs achètent quelque chose. Il compare une journée avant et une journée après la mise en ligne d'un nouveau design.\na) Calcule l'intervalle où l'on attend environ 95 % des fréquences d'achat pour 400 visiteurs.\nb) Calcule la fréquence d'achat de chaque journée. Lesquelles sont courantes, lesquelles rares ?\nc) Que peut-on penser du nouveau design ?",
          figure: grille(["Journée", "Visiteurs", "Achats"], [
            ["Avant", 400, 90],
            ["Après", 400, 132],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{400}} = 0{,}05$. De $0{,}25 - 0{,}05 = 0{,}2$ à $0{,}25 + 0{,}05 = 0{,}3$ : l'intervalle [0,2 ; 0,3].\nb) Avant : $90 \\div 400 = 0{,}225$, dans l'intervalle, courante. Après : $132 \\div 400 = 0{,}33$, au-dessus de 0,3, rare.\nc) Si le taux d'achat était resté 25 %, une journée à 0,33 serait rare : le nouveau design a probablement fait monter les achats. À confirmer sur d'autres journées.\n⛔ Le piège : croire qu'une fréquence rare est forcément mauvaise. Elle peut être rare par le haut.\nRéponse : a) [0,2 ; 0,3] ; b) 0,225 courante, 0,33 rare ; c) il a sans doute augmenté les achats.",
          micros: ["va_ech_rare_ou_frequent"],
        },
        {
          enonce:
            "La directrice financière d'un institut de sondage prépare un devis. Un entretien coûte 15 €. Le client voulait 500 entretiens ; il demande maintenant une distance $\\dfrac{1}{\\sqrt{n}}$ deux fois plus petite.\na) Combien coûtent 500 entretiens ?\nb) Combien d'entretiens faut-il pour diviser la distance par 2 ? Combien coûtent-ils ?\nc) Par combien le prix est-il multiplié ?",
          correction:
            "a) $500 \\times 15 = 7500$ €.\nb) Diviser la distance par 2 demande de multiplier n par 4 : $500 \\times 4 = 2000$ entretiens, soit $2000 \\times 15 = 30\\,000$ €.\nc) $30\\,000 \\div 7500 = 4$ : le prix est multiplié par 4.\n⭐ Vérification : $\\dfrac{1}{\\sqrt{500}} \\approx 0{,}045$ et $\\dfrac{1}{\\sqrt{2000}} \\approx 0{,}022$, deux fois moins.\n⛔ Le piège : promettre au client « deux fois plus précis pour deux fois plus cher ». La précision coûte le carré.\nRéponse : a) 7500 € ; b) 2000 entretiens, $30\\,000$ € ; c) par 4.",
          schema: ecranSeulement(
            grille(["entretiens", "coût", "1 ÷ √n"], [
              [500, "7500 €", "≈ 0,045"],
              [2000, "30 000 €", "≈ 0,022"],
            ]),
          ),
          micros: ["va_ech_taille"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une décision à prendre à partir d'un échantillon. Je pose le modèle (p et n), je calcule l'intervalle, je place l'observation, puis je conclus sans dire plus que ce que les données permettent.",
      rappel: [
        "Le modèle d'abord : quelle proportion p annonce-t-on, et sur combien d'individus n observe-t-on ?",
        "Observation hors de l'intervalle : rare, on DOUTE du modèle. Dans l'intervalle : rien ne permet de douter.",
        "Pour gagner en précision, on agrandit l'échantillon : n multiplié par k² divise la distance par k.",
      ],
      exercices: [
        {
          titre: "La roulette du casino",
          enonce:
            "Une roulette européenne compte 37 cases : 18 rouges, 18 noires et le zéro, vert. Un inspecteur des jeux relève 2500 tirages d'une même table. Arrondis au millième.\na) Quelle est la proportion p de cases rouges ?\nb) Calcule l'intervalle où l'on attend environ 95 % des fréquences de rouge sur 2500 tirages.\nc) Calcule la fréquence de rouge observée. Est-elle courante ou rare ?\nd) Que doit faire l'inspecteur ?",
          figure: grille(["Résultat", "Tirages"], [
            ["rouge", 1300],
            ["noir", 1150],
            ["zéro", 50],
            ["total", 2500],
          ], { total: true }),
          correction:
            "a) $p = 18 \\div 37 \\approx 0{,}486$.\nb) $\\dfrac{1}{\\sqrt{2500}} = 0{,}02$. Bornes : $0{,}4865 - 0{,}02 \\approx 0{,}466$ et $0{,}4865 + 0{,}02 \\approx 0{,}506$. L'intervalle [0,466 ; 0,506].\nc) $f = 1300 \\div 2500 = 0{,}52$, plus que 0,506 : la fréquence est rare.\nd) Elle fait douter de l'équilibre de la roulette. L'inspecteur fait contrôler la table (inclinaison, usure du cylindre) ; ce n'est pas encore une preuve de tricherie.\n⛔ Le piège au a) : prendre p = 0,5 en oubliant le zéro. Avec 0,5, l'intervalle [0,48 ; 0,52] contiendrait 0,52 : on manquerait l'anomalie.\nRéponse : a) environ 0,486 ; b) [0,466 ; 0,506] ; c) 0,52, rare ; d) faire contrôler la table.",
          micros: ["va_ech_rare_ou_frequent"],
        },
        {
          titre: "Le sondage de la mairie",
          enonce:
            "Un chargé de démocratie participative a interrogé 400 habitants sur un projet de piétonnisation du centre-ville (modèle) : 228 sont pour. L'adjointe au maire pense que la ville est coupée en deux, moitié pour, moitié contre.\na) Si elle a raison (p = 0,5), dans quel intervalle attend-on la fréquence des « pour » ?\nb) Calcule la fréquence observée. Que penser de l'idée de l'adjointe ?\nc) Pour la consultation officielle, la mairie veut une distance $\\dfrac{1}{\\sqrt{n}}$ de 0,02. Combien d'habitants interroger ?",
          figure: grille(["Réponse", "Habitants"], [
            ["pour", 228],
            ["contre", 172],
            ["total", 400],
          ], { total: true }),
          correction:
            "a) $\\dfrac{1}{\\sqrt{400}} = 0{,}05$. L'intervalle [0,45 ; 0,55].\nb) $f = 228 \\div 400 = 0{,}57$, au-dessus de 0,55 : si la ville était coupée en deux, ce résultat serait rare. On peut douter de l'idée de l'adjointe : les « pour » sont probablement majoritaires.\nc) $\\dfrac{1}{\\sqrt{n}} = 0{,}02$ quand $\\sqrt{n} = 50$, soit $n = 50^2 = 2500$ habitants.\nAutre chemin : passer de 0,05 à 0,02, c'est diviser par 2,5, donc multiplier n par $2{,}5^2 = 6{,}25$ : $400 \\times 6{,}25 = 2500$.\n⛔ Le piège au b) : dire « 57 %, c'est presque la moitié ». Ce qui compte, c'est la position par rapport à l'intervalle.\nRéponse : a) [0,45 ; 0,55] ; b) 0,57, rare : on doute de l'idée de l'adjointe ; c) 2500 habitants.",
          micros: ["va_ech_rare_ou_frequent", "va_ech_taille"],
        },
        {
          titre: "Les graines du semencier",
          enonce:
            "Un semencier annonce que 80 % de ses graines germent. Une technicienne teste 4 lots de 400 graines.\na) Si l'annonce est vraie, dans quel intervalle attend-on la fréquence de germination d'un lot de 400 graines ?\nb) Calcule la fréquence de chaque lot. Lequel est rare ?\nc) Faut-il en conclure que l'annonce est fausse ?\nd) Pour une distance $\\dfrac{1}{\\sqrt{n}}$ de 0,025, combien de graines par lot ?",
          figure: grille(["Lot", "Graines", "Germées"], [
            [1, 400, 330],
            [2, 400, 312],
            [3, 400, 296],
            [4, 400, 322],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{400}} = 0{,}05$. L'intervalle [0,75 ; 0,85].\nb) Lot 1 : $330 \\div 400 = 0{,}825$. Lot 2 : $312 \\div 400 = 0{,}78$. Lot 3 : $296 \\div 400 = 0{,}74$. Lot 4 : $322 \\div 400 = 0{,}805$.\nLe lot 3 est sous 0,75 : il est rare. Les trois autres sont courants.\nc) Non. Environ un échantillon sur vingt sort de l'intervalle même quand l'annonce est vraie. Un lot rare sur quatre invite à refaire un test sur ce lot, pas à accuser le semencier.\nd) Diviser 0,05 par 2 demande de multiplier n par 4 : $400 \\times 4 = 1600$ graines par lot.\n⛔ Le piège au c) : conclure sur un seul lot. Un doute se confirme par d'autres observations.\nRéponse : a) [0,75 ; 0,85] ; b) 0,825, 0,78, 0,74 et 0,805 : le lot 3 est rare ; c) non ; d) 1600 graines.",
          micros: ["va_ech_rare_ou_frequent", "va_ech_taille"],
        },
        {
          titre: "La simulation au tableur",
          enonce:
            "Une data scientist simule au tableur 50 échantillons de 25 clients, dans une clientèle où 40 % des clients ont la carte de fidélité. Le tableau donne, pour chaque fréquence observée, le nombre d'échantillons.\na) Calcule l'intervalle où l'on attend environ 95 % des fréquences.\nb) Combien d'échantillons sont en dehors ? Quelle part des 50 est dans l'intervalle ?\nc) Calcule la moyenne des 50 fréquences. Compare-la à 0,4.",
          figure: grille(["fréquence f", "échantillons"], [
            ["0,16", 1],
            ["0,24", 3],
            ["0,28", 4],
            ["0,32", 6],
            ["0,36", 8],
            ["0,40", 9],
            ["0,44", 7],
            ["0,48", 5],
            ["0,52", 3],
            ["0,56", 2],
            ["0,64", 2],
          ]),
          correction:
            "a) $\\dfrac{1}{\\sqrt{25}} = \\dfrac{1}{5} = 0{,}2$. De $0{,}4 - 0{,}2 = 0{,}2$ à $0{,}4 + 0{,}2 = 0{,}6$ : l'intervalle [0,2 ; 0,6].\nb) En dehors : 0,16 (1 échantillon) et 0,64 (2 échantillons), soit $1 + 2 = 3$. Dans l'intervalle : $50 - 3 = 47$, et $47 \\div 50 = 0{,}94$, soit 94 %, proche des 95 % annoncés.\nc) Je multiplie chaque fréquence par son nombre d'échantillons :\n$0{,}16 \\times 1 + 0{,}24 \\times 3 + 0{,}28 \\times 4 + 0{,}32 \\times 6 + 0{,}36 \\times 8 + 0{,}4 \\times 9 + 0{,}44 \\times 7 + 0{,}48 \\times 5 + 0{,}52 \\times 3 + 0{,}56 \\times 2 + 0{,}64 \\times 2 = 19{,}84$.\n$19{,}84 \\div 50 = 0{,}3968$, soit environ 0,397 : très proche de 0,4. Les fréquences fluctuent, mais autour de p.\n⛔ Le piège au c) : faire la moyenne des 11 fréquences du tableau sans tenir compte du nombre d'échantillons.\nRéponse : a) [0,2 ; 0,6] ; b) 3 dehors, 94 % dedans ; c) environ 0,397, proche de 0,4.",
          micros: ["va_ech_fluctuation", "va_ech_distance", "va_ech_rare_ou_frequent"],
        },
      ],
    },
  ],
};
