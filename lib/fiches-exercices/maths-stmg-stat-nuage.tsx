// ─── Fiche d'exercices : nuage de points et point moyen (Tle STMG) — 20 ex. ──
//
// Première des cinq feuilles STMG « séries statistiques à deux variables »
// (22/10/2026). Sur le modèle de `maths-4e-stat-donnee.tsx` (ton, 8 + 8 + 4,
// dessins sans largeur minimale) et de `maths-premiere-info-nuage.tsx` (un
// individu = un point (x ; y), dans cet ordre ; la tendance en une phrase).
// Alignée sur la banque `lib/tutor-v4/questionBank/stmg/maths/
// statistique-deux-variables.bank.ts`, notion stat_nuage : représenter le
// nuage (et son point moyen G), lire un point, décrire la tendance.
// ⛔ L'AJUSTEMENT (droite, équation) est la notion stat_ajustement, qui a sa
// feuille : ici on dit seulement si les points « se rapprochent d'une droite ».
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 2 — SMIC horaire brut au 1er janvier (INSEE / Légifrance) : 2019
//     10,03 € ; 2020 10,15 ; 2021 10,25 ; 2022 10,57 ; 2023 11,27 ; 2024 11,65 ;
//   · ex. 5 — abonnés payants de Netflix en fin d'année (rapports annuels de
//     Netflix, en millions, arrondis au dixième) : 74,8 ; 93,8 ; 117,6 ;
//     139,3 ; 167,1 ; 203,7 ; 221,8 ; 230,7 ; 260,3 (2015 → 2023) ;
//   · ex. 6 — entrées en salle de cinéma en France (CNC, bilans annuels, en
//     millions) : 205,4 ; 213,2 ; 209,4 ; 201,1 ; 213,3 ; 65,1 ; 96,2 ; 152,0 ;
//     180,8 ; 181,3 (2015 → 2024) ;
//   · ex. 8 — la formule de la fréquence cardiaque maximale « 220 − âge »
//     (Fox et Haskell, 1971), comparée à des mesures (modèle) ;
//   · ex. 9 — part des voitures particulières neuves 100 % électriques en
//     France (AVERE-France, PFA) : 1,9 % ; 6,7 ; 9,8 ; 13,3 ; 16,8 ; 16,9
//     (2019 → 2024) ;
//   · ex. 10 — population mondiale (ONU, World Population Prospects, en
//     milliards, arrondis) : 2,5 ; 3,0 ; 3,7 ; 4,4 ; 5,3 ; 6,1 ; 6,9 ; 7,8
//     (1950 → 2020) ;
//   · ex. 14 — taille médiane des garçons de 1 à 6 ans (OMS, normes de
//     croissance) : 75,7 ; 87,8 ; 96,1 ; 103,3 ; 110,0 ; 116,0 cm ;
//   · ex. 17 — records du monde du marathon masculin (World Athletics) :
//     Tergat 2003, Gebreselassie 2007 et 2008, Makau 2011, Kipsang 2013,
//     Kimetto 2014, Kipchoge 2018 et 2022, Kiptum 2023.
// Le reste (glacier, gymnase, coureuse, studio, publicité, engrais,
// formation, crème solaire, football, abonnés, gourde, basket) est un MODÈLE,
// à des ordres de grandeur vraisemblables.
// Métiers, un par exercice : artisan glacier, gestionnaire de paie,
// gestionnaire d'énergie, préparatrice physique, analyste des médias,
// exploitante de cinéma, agent immobilier, médecin du sport, conseillère
// commerciale automobile, démographe, responsable marketing, agronome,
// responsable des ressources humaines, pédiatre, pharmacienne, trésorier d'un
// club de football, entraîneur d'athlétisme, community manager, chargée
// d'études de marché, intendante d'un club de basket.
//
// ⭐ Les dessins : `nuage` et `grille` de `stmg-deux-variables-figures.tsx`.
// 14 imprimés ; les nuages qui redisent le corrigé sont `ecranSeulement`,
// leurs données sont alors dans l'énoncé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-stat-nuage.mjs`.
//
// Micro-compétences : statT_nuage_representer (2, 4, 7, 9, 10, 13, 16, 17,
// 18, 19, 20), statT_nuage_lire (1, 5, 6, 7, 8, 10, 11, 14, 15, 17, 18, 20),
// statT_nuage_tendance (3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesStatNuageStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "stat-nuage",
  titre: "Nuage de points et point moyen",
  accroche:
    "Vingt exercices, du geste seul au problème : lire un point d'un nuage, construire le nuage d'un tableau, calculer et placer le point moyen G, décrire la tendance en une phrase. Le SMIC, les abonnés de Netflix, les entrées au cinéma, la population mondiale, la taille des enfants et les records du marathon. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le nuage dessiné et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un point, placer un point, calculer le point moyen ou dire la tendance.",
      rappel: [
        "Une série à deux variables : chaque individu donne UN point $(x ; y)$. $x$ se lit sur l'axe horizontal, $y$ sur l'axe vertical, dans cet ordre.",
        "Je lis d'abord les unités des axes : « en centaines », « en millions »… Un axe peut commencer ailleurs qu'en 0.",
        "Le point moyen : $G(\\bar{x} ; \\bar{y})$, où $\\bar{x}$ est la moyenne des $x$ et $\\bar{y}$ la moyenne des $y$.",
        "La tendance, en une phrase : « quand $x$ augmente, $y$ a tendance à augmenter (ou à diminuer) ; les points se rapprochent (ou non) d'une droite ».",
      ],
      exercices: [
        {
          enonce:
            "Un artisan glacier relève, sur sept journées d'été, la température maximale (en °C) et le nombre de glaces vendues, en CENTAINES. Chaque point est une journée.\na) Lis les coordonnées du point $A$.\nb) Traduis-les par une phrase.\nc) Combien de journées ont dépassé 400 glaces vendues ?",
          figure: nuage([16, 32, 2, 0, 8, 1], [
            { x: 18, y: 2 },
            { x: 20, y: 3 },
            { x: 22, y: 3 },
            { x: 24, y: 5, label: "A" },
            { x: 26, y: 5 },
            { x: 28, y: 6 },
            { x: 30, y: 7 },
          ], { noms: ["température (°C)", "glaces (centaines)"] }),
          correction:
            "a) Je descends de $A$ jusqu'à l'axe horizontal : $x = 24$. Je vais jusqu'à l'axe vertical : $y = 5$. Donc $A(24 ; 5)$.\nb) Ce jour-là, il a fait 24 °C et le glacier a vendu 5 centaines de glaces, soit 500 glaces.\nc) « Plus de 400 glaces », c'est $y > 4$ : les points d'ordonnées 5, 5, 6 et 7. Cela fait 4 journées.\n⛔ Le piège : lire $y = 5$ comme 5 glaces. L'axe compte en centaines.\nRéponse : a) $A(24 ; 5)$ ; b) 24 °C et 500 glaces ; c) 4 journées.",
          micros: ["statT_nuage_lire"],
        },
        {
          enonce:
            "Un gestionnaire de paie suit le SMIC horaire brut au 1er janvier de chaque année (source : INSEE).\na) Quelle variable place-t-on en abscisse ?\nb) Écris les coordonnées des six points du nuage.\nc) L'axe vertical va de 10 à 12, de 0,25 en 0,25. Pourquoi ne pas le faire partir de 0 ?\nd) Construis le nuage de points.",
          figure: grille(["année", "SMIC horaire brut (€)"], [
            [2019, 10.03],
            [2020, 10.15],
            [2021, 10.25],
            [2022, 10.57],
            [2023, 11.27],
            [2024, 11.65],
          ]),
          correction:
            "a) Le temps se place en abscisse : l'année. Le SMIC va en ordonnée.\nb) Chaque ligne du tableau donne un point : $(2019 ; 10{,}03)$, $(2020 ; 10{,}15)$, $(2021 ; 10{,}25)$, $(2022 ; 10{,}57)$, $(2023 ; 11{,}27)$, $(2024 ; 11{,}65)$.\nc) Toutes les valeurs sont entre 10 et 12. En partant de 0, les six points seraient écrasés en haut du dessin. L'axe commence à 10, et le premier nombre est écrit en rouge pour le signaler.\nd) Je place chaque point, sans les relier : entre deux relevés, on ne sait rien.\n⭐ Le nuage monte, et plus vite en 2022 et 2023 : le SMIC suit les prix, et l'inflation a été forte ces deux années-là.\nRéponse : six points, de $(2019 ; 10{,}03)$ à $(2024 ; 11{,}65)$, sur un axe vertical qui part de 10.",
          schema: ecranSeulement(
            nuage([2018, 2025, 1, 10, 12, 0.25], [
              { x: 2019, y: 10.03 },
              { x: 2020, y: 10.15 },
              { x: 2021, y: 10.25 },
              { x: 2022, y: 10.57 },
              { x: 2023, y: 11.27 },
              { x: 2024, y: 11.65 },
            ], { noms: ["année", "SMIC horaire brut (€)"] }),
          ),
          micros: ["statT_nuage_representer"],
        },
        {
          enonce:
            "Un gestionnaire d'énergie suit le chauffage au gaz d'un gymnase. Chaque point est un mois d'hiver : en abscisse, la température extérieure moyenne (°C) ; en ordonnée, la consommation de gaz (MWh).\na) Le nuage est-il croissant ou décroissant ?\nb) Les points se rapprochent-ils d'une droite ?\nc) Rédige la tendance en une phrase.",
          figure: nuage([0, 16, 2, 20, 50, 5], [
            { x: 2, y: 48 },
            { x: 4, y: 43 },
            { x: 6, y: 40 },
            { x: 8, y: 34 },
            { x: 10, y: 31 },
            { x: 12, y: 26 },
            { x: 14, y: 22 },
          ], { noms: ["température (°C)", "gaz (MWh)"] }),
          correction:
            "a) De gauche à droite, les points descendent : le nuage est décroissant.\nb) Oui : une règle posée sur le dessin passe tout près des sept points.\nc) « Quand la température extérieure augmente, la consommation de gaz a tendance à diminuer ; les points se rapprochent d'une droite. »\n⛔ Le piège : lire le nuage de droite à gauche, et le dire croissant. On lit toujours dans le sens des $x$ croissants.\nRéponse : a) décroissant ; b) oui ; c) plus il fait doux, moins le gymnase consomme.",
          micros: ["statT_nuage_tendance"],
        },
        {
          enonce:
            "Une préparatrice physique entraîne une coureuse pour un 5 km. Toutes les deux semaines, elle note son temps.\nSemaine : 0, 2, 4, 6, 8. Temps (min) : 30, 29, 27, 26, 25.\na) Calcule $\\bar{x}$, la moyenne des semaines.\nb) Calcule $\\bar{y}$, la moyenne des temps.\nc) Donne les coordonnées du point moyen $G$.",
          correction:
            "a) $\\bar{x} = \\dfrac{0 + 2 + 4 + 6 + 8}{5} = \\dfrac{20}{5} = 4$.\nb) $\\bar{y} = \\dfrac{30 + 29 + 27 + 26 + 25}{5} = \\dfrac{137}{5} = 27{,}4$.\nc) $G(4 ; 27{,}4)$.\n⭐ $G$ n'est pas forcément un point du nuage : c'est le centre des points.\n⛔ Le piège : faire la moyenne du premier et du dernier temps, $\\dfrac{30 + 25}{2} = 27{,}5$. La moyenne se calcule sur les cinq valeurs.\nRéponse : $G(4 ; 27{,}4)$.",
          schema: ecranSeulement(
            nuage([0, 10, 2, 24, 31, 1], [
              { x: 0, y: 30 },
              { x: 2, y: 29 },
              { x: 4, y: 27 },
              { x: 6, y: 26 },
              { x: 8, y: 25 },
            ], { noms: ["semaine", "temps (min)"], moyen: [4, 27.4] }),
          ),
          micros: ["statT_nuage_representer"],
        },
        {
          enonce:
            "Une analyste des médias étudie le nombre d'abonnés payants de Netflix, à la fin de chaque année (source : rapports annuels de Netflix).\na) Quelles sont les coordonnées du point de l'année 2020 ?\nb) De combien de millions le nombre d'abonnés a-t-il augmenté entre 2015 et 2023 ?\nc) Entre quelles années consécutives la hausse a-t-elle été la plus faible ?\nd) Décris la tendance du nuage.",
          figure: grille(["année", "abonnés (millions)"], [
            [2015, 74.8],
            [2016, 93.8],
            [2017, 117.6],
            [2018, 139.3],
            [2019, 167.1],
            [2020, 203.7],
            [2021, 221.8],
            [2022, 230.7],
            [2023, 260.3],
          ]),
          correction:
            "a) La ligne 2020 donne le point $(2020 ; 203{,}7)$.\nb) $260{,}3 - 74{,}8 = 185{,}5$ millions d'abonnés de plus.\nc) Je calcule chaque hausse : $19$ ; $23{,}8$ ; $21{,}7$ ; $27{,}8$ ; $36{,}6$ ; $18{,}1$ ; $8{,}9$ ; $29{,}6$ millions.\nLa plus faible est $230{,}7 - 221{,}8 = 8{,}9$ millions, entre 2021 et 2022 : Netflix a perdu des abonnés au début de 2022.\nd) « Quand les années passent, le nombre d'abonnés a tendance à augmenter ; les points se rapprochent d'une droite, avec un creux en 2022. »\n⛔ Le piège au b) : répondre 260,3. C'est le nombre d'abonnés en 2023, pas la hausse.\nRéponse : a) $(2020 ; 203{,}7)$ ; b) $185{,}5$ millions ; c) entre 2021 et 2022 ; d) croissante.",
          schema: ecranSeulement(
            nuage([2015, 2023, 1, 50, 300, 50], [
              { x: 2015, y: 74.8 },
              { x: 2016, y: 93.8 },
              { x: 2017, y: 117.6 },
              { x: 2018, y: 139.3 },
              { x: 2019, y: 167.1 },
              { x: 2020, y: 203.7 },
              { x: 2021, y: 221.8 },
              { x: 2022, y: 230.7 },
              { x: 2023, y: 260.3 },
            ], { noms: ["année", "abonnés (millions)"] }),
          ),
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Une exploitante de cinéma étudie les entrées en salle en France, de 2015 à 2024, en millions (source : CNC). En 2019, il y a eu 213,3 millions d'entrées ; en 2024, 181,3 millions.\na) Quelle année représente le point $P$ ? Que s'est-il passé cette année-là ?\nb) De 2015 à 2019, le nuage est-il croissant, décroissant, ou sans tendance ?\nc) Combien d'entrées manque-t-il en 2024 pour retrouver le niveau de 2019 ?",
          figure: nuage([2015, 2024, 1, 0, 250, 50], [
            { x: 2015, y: 205.4 },
            { x: 2016, y: 213.2 },
            { x: 2017, y: 209.4 },
            { x: 2018, y: 201.1 },
            { x: 2019, y: 213.3 },
            { x: 2020, y: 65.1, label: "P" },
            { x: 2021, y: 96.2 },
            { x: 2022, y: 152 },
            { x: 2023, y: 180.8 },
            { x: 2024, y: 181.3 },
          ], { noms: ["année", "entrées (millions)"] }),
          correction:
            "a) $P$ est le sixième point en partant de 2015 : l'année 2020. Les salles ont été fermées une grande partie de l'année, à cause de l'épidémie de Covid-19.\nb) De 2015 à 2019, les cinq points restent à la même hauteur, entre 200 et 250 millions : ni hausse ni baisse. Le nuage est sans tendance.\nc) $213{,}3 - 181{,}3 = 32$ millions d'entrées.\n⭐ Un point isolé comme $P$ s'explique par un événement : on le signale avant de décrire la tendance.\n⛔ Le piège : dire que la fréquentation baisse « en tendance » depuis 2015. La chute vient d'une seule année, et le nuage remonte ensuite.\nRéponse : a) 2020, les salles fermées ; b) sans tendance ; c) 32 millions.",
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Un agent immobilier place les studios de son agence dans un nuage : en abscisse, la surface en m² ; en ordonnée, le loyer mensuel en CENTAINES d'euros. Un studio de 25 m² est loué 600 € par mois. Quel point le représente : $(25 ; 6)$, $(6 ; 25)$, $(25 ; 600)$ ou $(600 ; 25)$ ?",
          correction:
            "L'abscisse est la surface : $x = 25$.\nL'ordonnée est le loyer en centaines d'euros : 600 €, ce sont 6 centaines, donc $y = 6$.\nLe point est $(25 ; 6)$.\n⛔ Les deux pièges : $(6 ; 25)$ inverse les deux variables ; $(25 ; 600)$ oublie l'unité de l'axe.\nRéponse : $(25 ; 6)$.",
          schema: ecranSeulement(
            nuage([0, 50, 10, 0, 12, 2], [{ x: 25, y: 6, label: "P" }], { noms: ["surface (m²)", "loyer (centaines d'€)"] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_lire"],
        },
        {
          enonce:
            "Un médecin du sport mesure la fréquence cardiaque maximale (FC max, en battements par minute) de cinq patients d'âges différents.\na) Quelle est la FC max du patient de 40 ans ?\nb) Celle du patient de 30 ans ?\nc) Décris la tendance du nuage.\nd) Une formule courante estime la FC max par « 220 − âge ». Que donne-t-elle à 30 ans ? Compare à la mesure.",
          figure: nuage([10, 70, 10, 150, 210, 10], [
            { x: 20, y: 200 },
            { x: 30, y: 195 },
            { x: 40, y: 180 },
            { x: 50, y: 175 },
            { x: 60, y: 160 },
          ], { noms: ["âge (ans)", "FC max (battements/min)"] }),
          correction:
            "a) Le point d'abscisse 40 est sur la ligne 180 : 180 battements par minute.\nb) Le point d'abscisse 30 est au milieu, entre 190 et 200 : 195 battements par minute.\nc) « Quand l'âge augmente, la FC max a tendance à diminuer ; les points se rapprochent d'une droite. »\nd) $220 - 30 = 190$. La mesure, 195, dépasse la formule de $195 - 190 = 5$ battements : la formule donne un ordre de grandeur, pas la valeur exacte de chacun.\n⛔ Le piège au b) : lire 190 ou 200, la ligne voisine. Le point est entre les deux lignes : c'est le nombre du milieu.\nRéponse : a) 180 ; b) 195 ; c) décroissante ; d) 190, soit 5 de moins que la mesure.",
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur la même série : je construis le nuage, je calcule le point moyen, puis je décris la tendance par une phrase.",
      rappel: [
        "Pour des années, je peux prendre leur RANG : 2019 devient 1, 2020 devient 2… Le nuage garde la même forme.",
        "Le point moyen se calcule avec TOUTES les valeurs, puis s'arrondit comme le demande l'énoncé.",
        "Un point isolé s'explique (une grève, une fermeture) et se signale avant de décrire la tendance.",
        "Des points qui montent de plus en plus vite dessinent une courbe : ils ne se rapprochent pas d'une droite.",
      ],
      exercices: [
        {
          enonce:
            "Une conseillère commerciale automobile suit la part des voitures neuves 100 % électriques dans les ventes en France (source : AVERE-France).\n2019 : 1,9 % ; 2020 : 6,7 % ; 2021 : 9,8 % ; 2022 : 13,3 % ; 2023 : 16,8 % ; 2024 : 16,9 %.\nOn note $x$ le rang de l'année (2019 a le rang 1) et $y$ la part, en %.\na) Écris les coordonnées des six points.\nb) Calcule les coordonnées du point moyen $G$.\nc) Construis le nuage et place $G$.\nd) Décris la tendance. Quelle année casse le rythme ?",
          correction:
            "a) $(1 ; 1{,}9)$, $(2 ; 6{,}7)$, $(3 ; 9{,}8)$, $(4 ; 13{,}3)$, $(5 ; 16{,}8)$, $(6 ; 16{,}9)$.\nb) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \\dfrac{21}{6} = 3{,}5$.\n$\\bar{y} = \\dfrac{1{,}9 + 6{,}7 + 9{,}8 + 13{,}3 + 16{,}8 + 16{,}9}{6} = \\dfrac{65{,}4}{6} = 10{,}9$.\nDonc $G(3{,}5 ; 10{,}9)$.\nc) Le nuage est dessiné ci-dessous, $G$ en orange.\nd) Les hausses : $4{,}8$ ; $3{,}1$ ; $3{,}5$ ; $3{,}5$ ; $0{,}1$ point.\n« Quand les années passent, la part des voitures électriques a tendance à augmenter ; de 2020 à 2023, les points se rapprochent d'une droite. » En 2024, la hausse n'est que de $0{,}1$ point : le rythme se casse.\n⭐ Avec les rangs, $\\bar{x} = 3{,}5$ tombe au milieu de 2021 et 2022.\n⛔ Le piège au d) : dire que la part baisse en 2024. Elle monte encore, de $0{,}1$ point : c'est la HAUSSE qui ralentit.\nRéponse : b) $G(3{,}5 ; 10{,}9)$ ; d) croissante, cassée en 2024.",
          schema: ecranSeulement(
            nuage([0, 7, 1, 0, 20, 4], [
              { x: 1, y: 1.9 },
              { x: 2, y: 6.7 },
              { x: 3, y: 9.8 },
              { x: 4, y: 13.3 },
              { x: 5, y: 16.8 },
              { x: 6, y: 16.9 },
            ], { noms: ["rang de l'année", "part (%)"], moyen: [3.5, 10.9] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Un démographe présente la population mondiale, tous les dix ans, en milliards (source : ONU). Les valeurs, de 1950 à 2020 : 2,5 ; 3,0 ; 3,7 ; 4,4 ; 5,3 ; 6,1 ; 6,9 ; 7,8.\na) Calcule les coordonnées du point moyen $G$. Arrondis $\\bar{y}$ au centième.\nb) Décris la tendance du nuage.\nc) De combien la population a-t-elle augmenté, en moyenne, par décennie ? Arrondis au centième.\nd) Par combien la population a-t-elle été multipliée de 1950 à 2020 ?",
          figure: nuage([1950, 2020, 10, 2, 9, 1], [
            { x: 1950, y: 2.5 },
            { x: 1960, y: 3 },
            { x: 1970, y: 3.7 },
            { x: 1980, y: 4.4 },
            { x: 1990, y: 5.3 },
            { x: 2000, y: 6.1 },
            { x: 2010, y: 6.9 },
            { x: 2020, y: 7.8 },
          ], { noms: ["année", "population (milliards)"] }),
          correction:
            "a) Les huit années vont de 10 en 10 : leur moyenne est le milieu de 1950 et 2020, $\\bar{x} = 1985$.\n$\\bar{y} = \\dfrac{2{,}5 + 3 + 3{,}7 + 4{,}4 + 5{,}3 + 6{,}1 + 6{,}9 + 7{,}8}{8} = \\dfrac{39{,}7}{8} = 4{,}9625$, soit environ $4{,}96$.\nDonc $G(1985 ; 4{,}96)$.\nb) « Quand les années passent, la population a tendance à augmenter ; les points se rapprochent d'une droite. »\nc) En 70 ans, soit 7 décennies : $7{,}8 - 2{,}5 = 5{,}3$ milliards. $5{,}3 \\div 7 \\approx 0{,}76$ milliard par décennie.\nd) $7{,}8 \\div 2{,}5 = 3{,}12$ : la population a plus que triplé.\n⛔ Le piège au c) : diviser par 8, le nombre de points. Entre 8 relevés, il y a 7 intervalles de dix ans.\nRéponse : a) $G(1985 ; 4{,}96)$ ; b) croissante ; c) environ $0{,}76$ milliard ; d) par $3{,}12$.",
          schema: ecranSeulement(
            nuage([1950, 2020, 10, 2, 9, 1], [
              { x: 1950, y: 2.5 },
              { x: 1960, y: 3 },
              { x: 1970, y: 3.7 },
              { x: 1980, y: 4.4 },
              { x: 1990, y: 5.3 },
              { x: 2000, y: 6.1 },
              { x: 2010, y: 6.9 },
              { x: 2020, y: 7.8 },
            ], { noms: ["année", "population (milliards)"], moyen: [1985, 4.96] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Un responsable marketing compare, mois par mois, la dépense publicitaire (en k€) et les ventes (en MILLIERS d'articles). Le mois $M$, l'entrepôt était en grève.\na) Lis les coordonnées de $M$ et traduis-les par une phrase.\nb) Sans le point $M$, décris la tendance du nuage.\nc) Pour mesurer l'effet de la publicité, faut-il garder le point $M$ ?\nd) Combien d'articles ont été vendus le mois où la dépense était de 6 k€ ?",
          figure: nuage([0, 8, 1, 6, 30, 4], [
            { x: 1, y: 10 },
            { x: 2, y: 14 },
            { x: 3, y: 16 },
            { x: 4, y: 8, label: "M" },
            { x: 5, y: 22 },
            { x: 6, y: 24 },
            { x: 7, y: 28 },
          ], { noms: ["publicité (k€)", "ventes (milliers)"] }),
          correction:
            "L'axe vertical commence à 6 et va de 4 en 4.\na) $M$ a pour abscisse 4 et s'arrête au milieu, entre 6 et 10 : $M(4 ; 8)$. Ce mois-là, 4 k€ de publicité et 8 000 articles vendus.\nb) « Quand la dépense publicitaire augmente, les ventes ont tendance à augmenter ; les six autres points se rapprochent d'une droite. »\nc) Non : la chute du mois $M$ vient de la grève, pas de la publicité. On le signale, et on l'écarte de l'étude.\nd) Le point d'abscisse 6 est au milieu, entre 22 et 26 : 24 milliers, soit 24 000 articles.\n⛔ Le piège au a) : lire 8 articles. L'axe compte en milliers.\nRéponse : a) $M(4 ; 8)$ ; b) croissante ; c) non ; d) 24 000 articles.",
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Un agronome teste des doses d'engrais sur des parcelles de blé. En abscisse, l'engrais en dizaines de kg par hectare ; en ordonnée, le rendement en quintaux par hectare. Les rendements relevés, de 0 à 12 : 40 ; 52 ; 60 ; 66 ; 69 ; 70 ; 70.\na) Calcule les hausses successives du rendement.\nb) Le nuage est-il croissant ? Ses points se rapprochent-ils d'une droite ?\nc) En doublant l'engrais de 4 à 8, double-t-on le rendement ?",
          figure: nuage([0, 12, 2, 35, 75, 5], [
            { x: 0, y: 40 },
            { x: 2, y: 52 },
            { x: 4, y: 60 },
            { x: 6, y: 66 },
            { x: 8, y: 69 },
            { x: 10, y: 70 },
            { x: 12, y: 70 },
          ], { noms: ["engrais (dizaines de kg/ha)", "rendement (q/ha)"] }),
          correction:
            "a) $52 - 40 = 12$ ; $60 - 52 = 8$ ; $66 - 60 = 6$ ; $69 - 66 = 3$ ; $70 - 69 = 1$ ; $70 - 70 = 0$.\nb) Le nuage est croissant : le rendement ne baisse jamais. Mais les hausses fondent, de 12 à 0 : les points dessinent une courbe qui s'aplatit, pas une droite.\nc) Non. À 4, le rendement est 60 ; à 8, il est 69. $60 \\times 2 = 120$, bien loin de 69.\n⭐ Au-delà d'une certaine dose, l'engrais ne sert plus : il coûte, et il pollue les sols.\n⛔ Le piège : dire « croissant, donc presque aligné ». Croissant dit que les points montent ; aligné dit qu'ils montent toujours du même pas.\nRéponse : a) 12, 8, 6, 3, 1, 0 ; b) croissant, mais pas proche d'une droite ; c) non.",
          micros: ["statT_nuage_tendance"],
        },
        {
          enonce:
            "Une responsable des ressources humaines compare les heures de formation suivies par six employés et leurs erreurs de saisie dans le mois.\nHeures : 0, 5, 10, 15, 20, 25. Erreurs : 42, 38, 33, 30, 24, 21.\na) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nb) Construis le nuage et place $G$.\nc) Décris la tendance.\nd) En moyenne, combien d'erreurs en moins pour 5 heures de formation de plus ?",
          correction:
            "a) $\\bar{x} = \\dfrac{0 + 5 + 10 + 15 + 20 + 25}{6} = \\dfrac{75}{6} = 12{,}5$.\n$\\bar{y} = \\dfrac{42 + 38 + 33 + 30 + 24 + 21}{6} = \\dfrac{188}{6} \\approx 31{,}3$.\nDonc $G(12{,}5 ; 31{,}3)$.\nb) Le nuage est dessiné ci-dessous, $G$ en orange.\nc) « Quand les heures de formation augmentent, les erreurs ont tendance à diminuer ; les points se rapprochent d'une droite. »\nd) De 0 à 25 heures, soit 5 pas de 5 heures : $21 - 42 = -21$ erreurs. $-21 \\div 5 = -4{,}2$ : environ 4,2 erreurs de moins.\n⛔ Le piège au a) : arrondir $\\bar{y}$ à 31. L'énoncé demande le dixième : $31{,}3$.\nRéponse : a) $G(12{,}5 ; 31{,}3)$ ; c) décroissante ; d) environ 4,2 erreurs de moins.",
          schema: ecranSeulement(
            nuage([0, 30, 5, 15, 45, 5], [
              { x: 0, y: 42 },
              { x: 5, y: 38 },
              { x: 10, y: 33 },
              { x: 15, y: 30 },
              { x: 20, y: 24 },
              { x: 25, y: 21 },
            ], { noms: ["formation (h)", "erreurs"], moyen: [12.5, 31.3] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Une pédiatre suit la croissance des enfants avec les normes de l'OMS. Le tableau donne la taille médiane des garçons, de 1 à 6 ans.\na) Quel point du nuage représente les enfants de 3 ans ?\nb) Calcule la hausse de taille d'une année à la suivante.\nc) Décris la tendance. Les six points se rapprochent-ils d'une droite ?\nd) De 3 à 6 ans, de combien l'enfant grandit-il en moyenne par an ? Arrondis au dixième.",
          figure: grille(["âge (ans)", "taille (cm)"], [
            [1, 75.7],
            [2, 87.8],
            [3, 96.1],
            [4, 103.3],
            [5, 110],
            [6, 116],
          ]),
          correction:
            "a) La ligne « 3 ans » donne le point $(3 ; 96{,}1)$.\nb) $87{,}8 - 75{,}7 = 12{,}1$ ; $96{,}1 - 87{,}8 = 8{,}3$ ; $103{,}3 - 96{,}1 = 7{,}2$ ; $110 - 103{,}3 = 6{,}7$ ; $116 - 110 = 6$ cm.\nc) « Quand l'âge augmente, la taille a tendance à augmenter. » Mais la croissance ralentit : 12,1 cm la deuxième année, 6 cm la sixième. Les six points dessinent une courbe ; seuls les quatre derniers se rapprochent d'une droite.\nd) $116 - 96{,}1 = 19{,}9$ cm en 3 ans. $19{,}9 \\div 3 \\approx 6{,}6$ cm par an.\n⛔ Le piège au c) : regarder seulement que le nuage monte. Il faut aussi regarder si les hausses restent du même ordre.\nRéponse : a) $(3 ; 96{,}1)$ ; b) 12,1 ; 8,3 ; 7,2 ; 6,7 ; 6 ; c) croissante, en courbe ; d) environ 6,6 cm par an.",
          schema: ecranSeulement(
            nuage([0, 7, 1, 70, 120, 10], [
              { x: 1, y: 75.7 },
              { x: 2, y: 87.8 },
              { x: 3, y: 96.1 },
              { x: 4, y: 103.3 },
              { x: 5, y: 110 },
              { x: 6, y: 116 },
            ], { noms: ["âge (ans)", "taille (cm)"] }),
          ),
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Une pharmacienne note ses ventes de crème solaire, en CENTAINES de tubes, de mars (rang 1) à août (rang 6).\na) Combien de tubes a-t-elle vendus en juin ?\nb) Calcule le taux d'évolution des ventes de mars à juillet, en pourcentage.\nc) Quels mois a-t-elle vendu plus de 2 000 tubes ?\nd) Décris la tendance du nuage, de mars à août.",
          figure: nuage([0, 7, 1, 0, 40, 5], [
            { x: 1, y: 5 },
            { x: 2, y: 10 },
            { x: 3, y: 15 },
            { x: 4, y: 25 },
            { x: 5, y: 35 },
            { x: 6, y: 30 },
          ], { noms: ["rang du mois", "ventes (centaines)"] }),
          correction:
            "Mars a le rang 1, avril 2, mai 3, juin 4, juillet 5, août 6.\na) Le point de rang 4 est sur la ligne 25 : 25 centaines, soit 2 500 tubes.\nb) Mars : 5 centaines ; juillet : 35 centaines. $\\dfrac{35 - 5}{5} = \\dfrac{30}{5} = 6$, soit une hausse de 600 %.\nc) 2 000 tubes, ce sont 20 centaines. Les points au-dessus de 20 : juin (25), juillet (35) et août (30).\nd) « De mars à juillet, les ventes ont tendance à augmenter, de plus en plus vite ; elles baissent en août, à la fin de l'été. » Le nuage ne se rapproche pas d'une droite.\n⛔ Le piège au b) : répondre 30 %. 30 est la hausse en centaines ; le taux d'évolution divise cette hausse par la valeur de départ.\nRéponse : a) 2 500 tubes ; b) + 600 % ; c) juin, juillet, août ; d) hausse puis baisse.",
          micros: ["statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          enonce:
            "Le trésorier d'un club de football compare, pour les huit clubs de sa division, le classement final et l'affluence moyenne au stade, en milliers de spectateurs.\nClassement : 1, 2, 3, 4, 5, 6, 7, 8. Affluence : 42, 35, 38, 25, 29, 18, 22, 15.\na) Construis le nuage de points.\nb) Calcule les coordonnées du point moyen $G$.\nc) Décris la tendance. Les points se rapprochent-ils d'une droite ?",
          correction:
            "a) Huit points, de $(1 ; 42)$ à $(8 ; 15)$ : le nuage est dessiné ci-dessous.\nb) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6 + 7 + 8}{8} = \\dfrac{36}{8} = 4{,}5$.\n$\\bar{y} = \\dfrac{42 + 35 + 38 + 25 + 29 + 18 + 22 + 15}{8} = \\dfrac{224}{8} = 28$.\nDonc $G(4{,}5 ; 28)$.\nc) « Quand le rang au classement augmente, l'affluence a tendance à diminuer. » Le premier attire le plus de monde, le dernier le moins.\nLes points montent et descendent en zigzag autour de cette tendance : ils se rapprochent d'une droite, mais de loin.\n⛔ Le piège : lire « décroissante » comme « les meilleurs clubs attirent moins ». Le rang 1 est le meilleur : un rang plus GRAND est un moins bon classement, donc les mieux classés attirent plus.\nRéponse : b) $G(4{,}5 ; 28)$ ; c) décroissante, points assez dispersés.",
          schema: ecranSeulement(
            nuage([0, 9, 1, 10, 45, 5], [
              { x: 1, y: 42 },
              { x: 2, y: 35 },
              { x: 3, y: 38 },
              { x: 4, y: 25 },
              { x: 5, y: 29 },
              { x: 6, y: 18 },
              { x: 7, y: 22 },
              { x: 8, y: 15 },
            ], { noms: ["classement", "affluence (milliers)"], moyen: [4.5, 28] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_tendance"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des données réelles, plusieurs étapes : je prépare les variables, je construis le nuage, je calcule le point moyen, puis je conclus par une phrase qui cite les nombres.",
      rappel: [
        "Je choisis des variables commodes : le rang de l'année, ou les secondes au-delà de 2 h, gardent la forme du nuage.",
        "J'arrondis seulement à la fin, comme l'énoncé le demande.",
        "Pour savoir si les points se rapprochent d'une droite, je compare les hausses successives : du même ordre, oui ; de plus en plus grandes ou petites, non.",
      ],
      exercices: [
        {
          titre: "Les records du marathon",
          enonce:
            "Un entraîneur d'athlétisme présente à ses coureurs les records du monde du marathon masculin depuis 2003 (source : World Athletics).\na) On note $y$ le temps au-delà de 2 heures, en secondes. Convertis chaque record. Exemple : 2 h 04 min 55 s donne $4 \\times 60 + 55 = 295$.\nb) On note $x$ l'année moins 2000 : 2003 donne 3. Écris les coordonnées des neuf points.\nc) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nd) Décris la tendance. De combien de secondes le record a-t-il baissé en moyenne par an, de 2003 à 2023 ?\ne) Quel nouveau record a fait gagner le plus de secondes d'un coup ?",
          figure: grille(["année", "record", "coureur"], [
            [2003, "2 h 04 min 55 s", "Tergat"],
            [2007, "2 h 04 min 26 s", "Gebreselassie"],
            [2008, "2 h 03 min 59 s", "Gebreselassie"],
            [2011, "2 h 03 min 38 s", "Makau"],
            [2013, "2 h 03 min 23 s", "Kipsang"],
            [2014, "2 h 02 min 57 s", "Kimetto"],
            [2018, "2 h 01 min 39 s", "Kipchoge"],
            [2022, "2 h 01 min 09 s", "Kipchoge"],
            [2023, "2 h 00 min 35 s", "Kiptum"],
          ]),
          correction:
            "a) Je compte les minutes au-delà de 2 h, fois 60, plus les secondes : 295 ; 266 ; 239 ; 218 ; 203 ; 177 ; 99 ; 69 ; 35.\nb) $(3 ; 295)$, $(7 ; 266)$, $(8 ; 239)$, $(11 ; 218)$, $(13 ; 203)$, $(14 ; 177)$, $(18 ; 99)$, $(22 ; 69)$, $(23 ; 35)$.\nc) $\\bar{x} = \\dfrac{3 + 7 + 8 + 11 + 13 + 14 + 18 + 22 + 23}{9} = \\dfrac{119}{9} \\approx 13{,}2$.\n$\\bar{y} = \\dfrac{295 + 266 + 239 + 218 + 203 + 177 + 99 + 69 + 35}{9} = \\dfrac{1601}{9} \\approx 177{,}9$.\nDonc $G(13{,}2 ; 177{,}9)$.\nd) « Quand les années passent, le record a tendance à baisser ; les points se rapprochent d'une droite. »\nEn 20 ans : $295 - 35 = 260$ secondes. $260 \\div 20 = 13$ secondes par an.\ne) Les gains : 29 ; 27 ; 21 ; 15 ; 26 ; 78 ; 30 ; 34 secondes. Le plus grand, $177 - 99 = 78$ secondes, est celui de Kipchoge en 2018.\n⛔ Le piège au a) : écrire 2 h 04 min 55 s comme 204,55. Une minute compte 60 secondes, pas 100.\nRéponse : c) $G(13{,}2 ; 177{,}9)$ ; d) décroissante, 13 s par an ; e) Kipchoge, 2018, 78 s.",
          schema: ecranSeulement(
            nuage([0, 25, 5, 0, 300, 50], [
              { x: 3, y: 295 },
              { x: 7, y: 266 },
              { x: 8, y: 239 },
              { x: 11, y: 218 },
              { x: 13, y: 203 },
              { x: 14, y: 177 },
              { x: 18, y: 99 },
              { x: 22, y: 69 },
              { x: 23, y: 35 },
            ], { noms: ["année − 2000", "secondes au-delà de 2 h"], moyen: [13.2, 177.9] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          titre: "Les abonnés d'une créatrice",
          enonce:
            "Une community manager suit le compte d'une créatrice de vidéos de cuisine. Le nuage donne le nombre d'abonnés, en milliers, à la fin de chacun des sept premiers mois : 2 ; 3 ; 5 ; 8 ; 12 ; 18 ; 27.\na) Calcule les hausses d'un mois au suivant.\nb) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nc) Calcule le quotient de chaque valeur par la précédente. Arrondis au centième.\nd) Décris la tendance. Les points se rapprochent-ils d'une droite ?",
          figure: nuage([0, 8, 1, 0, 30, 5], [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 8 },
            { x: 5, y: 12 },
            { x: 6, y: 18 },
            { x: 7, y: 27 },
          ], { noms: ["rang du mois", "abonnés (milliers)"] }),
          correction:
            "a) $3 - 2 = 1$ ; $5 - 3 = 2$ ; $8 - 5 = 3$ ; $12 - 8 = 4$ ; $18 - 12 = 6$ ; $27 - 18 = 9$ milliers.\nb) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6 + 7}{7} = 4$ et $\\bar{y} = \\dfrac{2 + 3 + 5 + 8 + 12 + 18 + 27}{7} = \\dfrac{75}{7} \\approx 10{,}7$. Donc $G(4 ; 10{,}7)$.\nc) $3 \\div 2 = 1{,}5$ ; $5 \\div 3 \\approx 1{,}67$ ; $8 \\div 5 = 1{,}6$ ; $12 \\div 8 = 1{,}5$ ; $18 \\div 12 = 1{,}5$ ; $27 \\div 18 = 1{,}5$.\nd) « Quand les mois passent, le nombre d'abonnés augmente, de plus en plus vite. » Les hausses grandissent : le nuage se courbe vers le haut, il ne se rapproche pas d'une droite.\n⭐ Ce sont les QUOTIENTS qui restent presque constants : environ $\\times 1{,}5$ par mois, soit $+ 50$ % par mois. Une telle série se traite par un changement de variable.\n⛔ Le piège : tracer une droite parce que le nuage monte. Monter ne suffit pas : il faut monter du même pas.\nRéponse : a) 1, 2, 3, 4, 6, 9 ; b) $G(4 ; 10{,}7)$ ; c) environ $1{,}5$ ; d) croissante, en courbe.",
          schema: ecranSeulement(
            nuage([0, 8, 1, 0, 30, 5], [
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 8 },
              { x: 5, y: 12 },
              { x: 6, y: 18 },
              { x: 7, y: 27 },
            ], { noms: ["rang du mois", "abonnés (milliers)"], moyen: [4, 10.7] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_lire", "statT_nuage_tendance"],
        },
        {
          titre: "Le prix d'une gourde",
          enonce:
            "Une chargée d'études de marché a vendu une gourde à six prix différents, dans six magasins semblables, pendant un mois.\nPrix (€) : 8, 10, 12, 14, 16, 18. Ventes (centaines) : 52, 47, 41, 37, 30, 25.\na) Construis le nuage de points.\nb) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nc) Décris la tendance. En moyenne, combien de centaines de gourdes perd-on par euro de plus ?\nd) La recette est prix × nombre de gourdes vendues. Calcule-la pour chaque prix. Quel prix rapporte le plus ?",
          correction:
            "a) Six points, de $(8 ; 52)$ à $(18 ; 25)$ : le nuage est dessiné ci-dessous.\nb) $\\bar{x} = \\dfrac{8 + 10 + 12 + 14 + 16 + 18}{6} = \\dfrac{78}{6} = 13$.\n$\\bar{y} = \\dfrac{52 + 47 + 41 + 37 + 30 + 25}{6} = \\dfrac{232}{6} \\approx 38{,}7$. Donc $G(13 ; 38{,}7)$.\nc) « Quand le prix augmente, les ventes ont tendance à diminuer ; les points se rapprochent d'une droite. »\nDe 8 € à 18 €, soit 10 € de plus : $25 - 52 = -27$ centaines. $-27 \\div 10 = -2{,}7$ : environ 2,7 centaines de gourdes perdues par euro.\nd) 52 centaines, ce sont 5 200 gourdes. $8 \\times 5\\,200 = 41\\,600$ € ; $10 \\times 4\\,700 = 47\\,000$ € ; $12 \\times 4\\,100 = 49\\,200$ € ; $14 \\times 3\\,700 = 51\\,800$ € ; $16 \\times 3\\,000 = 48\\,000$ € ; $18 \\times 2\\,500 = 45\\,000$ €.\nLe prix de 14 € rapporte le plus : 51 800 €.\n⛔ Le piège au d) : choisir 8 €, le prix qui vend le plus de gourdes. Vendre beaucoup n'est pas gagner le plus.\nRéponse : b) $G(13 ; 38{,}7)$ ; c) décroissante, $-2{,}7$ centaines par euro ; d) 14 €.",
          schema: ecranSeulement(
            nuage([6, 20, 2, 20, 55, 5], [
              { x: 8, y: 52 },
              { x: 10, y: 47 },
              { x: 12, y: 41 },
              { x: 14, y: 37 },
              { x: 16, y: 30 },
              { x: 18, y: 25 },
            ], { noms: ["prix (€)", "ventes (centaines)"], moyen: [13, 38.7] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_tendance"],
        },
        {
          titre: "L'équipe de basket",
          enonce:
            "L'intendante d'un club de basket commande les chaussures des huit joueuses. Elle relève leur taille et leur pointure.\na) Construis le nuage : la taille en abscisse, la pointure en ordonnée.\nb) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nc) Décris la tendance.\nd) Combien de joueuses ont une pointure au-dessus de la pointure moyenne ?\ne) Une nouvelle joueuse mesure 180 cm. Peut-on commander ses chaussures sans lui demander sa pointure ?",
          figure: grille(["n°", "taille (cm)", "pointure"], [
            ["1", 168, 38],
            ["2", 172, 40],
            ["3", 176, 40],
            ["4", 180, 42],
            ["5", 183, 43],
            ["6", 186, 43],
            ["7", 191, 45],
            ["8", 195, 46],
          ]),
          correction:
            "a) Chaque joueuse donne un point (taille ; pointure), de $(168 ; 38)$ à $(195 ; 46)$ : le nuage est dessiné ci-dessous.\nb) $\\bar{x} = \\dfrac{168 + 172 + 176 + 180 + 183 + 186 + 191 + 195}{8} = \\dfrac{1451}{8} \\approx 181{,}4$.\n$\\bar{y} = \\dfrac{38 + 40 + 40 + 42 + 43 + 43 + 45 + 46}{8} = \\dfrac{337}{8} \\approx 42{,}1$. Donc $G(181{,}4 ; 42{,}1)$.\nc) « Quand la taille augmente, la pointure a tendance à augmenter ; les points se rapprochent d'une droite. »\nd) Au-dessus de $42{,}1$ : 43, 43, 45 et 46. Cela fait 4 joueuses.\ne) Non. La tendance donne un ordre de grandeur, vers 42, mais deux joueuses de même taille peuvent avoir des pieds différents. On lui demande sa pointure.\n⛔ Le piège au a) : mettre la pointure en abscisse. L'énoncé fixe l'ordre : (taille ; pointure).\nRéponse : b) $G(181{,}4 ; 42{,}1)$ ; c) croissante ; d) 4 joueuses ; e) non.",
          schema: ecranSeulement(
            nuage([165, 200, 5, 36, 48, 2], [
              { x: 168, y: 38 },
              { x: 172, y: 40 },
              { x: 176, y: 40 },
              { x: 180, y: 42 },
              { x: 183, y: 43 },
              { x: 186, y: 43 },
              { x: 191, y: 45 },
              { x: 195, y: 46 },
            ], { noms: ["taille (cm)", "pointure"], moyen: [181.4, 42.1] }),
          ),
          micros: ["statT_nuage_representer", "statT_nuage_lire", "statT_nuage_tendance"],
        },
      ],
    },
  ],
};
