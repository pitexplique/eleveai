// ─── Fiche d'exercices : lire des données chiffrées (STMG, automatismes) ──────
//                              20 exercices corrigés
//
// Quatrième feuille « données » de STMG (22/10/2026). Les AUTOMATISMES du
// programme (partie « Automatismes » de STMG, notion auto_donnees_graphiques du
// coach) : lire un graphique (origine, graduations, échelle, axe tronqué), lire
// un diagramme en barres, en bâtons ou circulaire, lire un diagramme en boîte,
// passer du graphique aux données et des données au graphique. Alignée sur la
// banque `lib/tutor-v4/questionBank/stmg/maths/automatismes-graphiques.bank.ts`
// (micros auto_stat_*). Dessins : `figures-donnees.tsx` (barres, camembert,
// grille) et `boite` de `figures.tsx` (le canvas du coach, valeurs écrites).
//
// ⭐ L'AXE GRADUÉ, comme la 4e : aucune valeur écrite sur une barre qu'on doit
// LIRE ; une valeur au milieu de deux graduations est annoncée « au milieu,
// entre a et b ». ⭐ L'AXE TRONQUÉ (2, 11, 20) : un axe qui ne part pas de 0
// grossit les écarts ; le corrigé calcule le rapport « à l'œil » et le vrai.
// ⭐ LES QUARTILES, définition du lycée : Q1 est la plus petite valeur telle
// qu'au moins 25 % des données lui soient inférieures ou égales (Q3 : 75 %) ; la
// médiane partage la série rangée en deux.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 6 — départements des 13 régions métropolitaines (INSEE) ;
//   · ex. 8 — Coupe du monde 2026 : 48 équipes, places par confédération
//     décidées par la FIFA (UEFA 16, CAF 9, AFC 8, CONMEBOL 6, CONCACAF 6 dont
//     les 3 pays hôtes, OFC 1, barrage intercontinental 2) ;
//   · ex. 9 — hauteurs (arrondies au mètre) : Burj Khalifa 828 m, Shanghai
//     Tower 632 m, One World Trade Center 541 m, tour Eiffel 330 m (antenne de
//     2022 comprise), tour Montparnasse 210 m.
// Le reste est un MODÈLE, et l'énoncé le dit.
// Domaines et métiers, un par exercice : boulangerie (boulanger), finance
// (analyste), vie associative (trésorière), relation client (chargé de
// clientèle), paie (contrôleuse de gestion sociale), géographie (géographe),
// sport municipal (directeur de piscine), médias (infographiste), architecture
// (architecte), énergie (diagnostiqueuse immobilière), télécoms (responsable
// relation client), achats (acheteuse), tourisme rural (gérant de gîte),
// événementiel (chargée de développement durable), sociologie (chercheuse),
// commerce alimentaire (primeur), gestion (contrôleuse de gestion), sondages
// (chargée d'études), santé (cadre de santé), consommation (inspectrice de la
// répression des fraudes).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-auto-donnees-graphiques.mjs`.
//
// Micro-compétences : auto_stat_lire_graphique (1, 2, 9, 11, 16, 17, 20),
// auto_stat_diagrammes_usuels (3, 4, 10, 13, 14, 18), auto_stat_boite (5, 6,
// 12, 15, 19), auto_stat_graphique_donnees (7, 8, 9, 10, 13, 14, 16, 17, 18, 19,
// 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { boite } from "@/lib/fiches-exercices/figures";
import { barres, camembert, ecranSeulement, grille } from "@/lib/fiches-exercices/figures-donnees";

export const exercicesAutoDonneesGraphiquesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-donnees-graphiques",
  titre: "Lire des données chiffrées et des graphiques",
  accroche:
    "Vingt exercices d'automatismes pour lire vite et juste un graphique : l'origine et le pas de l'axe, l'axe qui ne part pas de 0, le diagramme en barres, en bâtons, le diagramme circulaire, le diagramme en boîte, et le passage du graphique au tableau, du tableau au graphique. Croissants d'une boulangerie, budget d'une association, salaires d'une PME, chiffre d'affaires, colis livrés ; et des données réelles : les régions de France, la Coupe du monde 2026, les plus hautes tours. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par question. Je regarde d'abord où commence l'axe et de combien en combien il va.",
      rappel: [
        "Axe gradué : je lis son ORIGINE (le premier nombre) et son PAS. Une barre qui s'arrête entre deux lignes vaut le nombre du milieu.",
        "Diagramme circulaire : le disque entier fait 100 %, soit 360°. Angle d'un secteur = fréquence × 360.",
        "Diagramme en boîte : min, Q1, médiane, Q3, max. Au moins 25 % des valeurs sont ≤ Q1, au moins 50 % ≤ médiane, au moins 75 % ≤ Q3 (et au moins 25 % ≥ Q3).",
        "Écart interquartile = Q3 − Q1 ; étendue = max − min.",
      ],
      exercices: [
        {
          enonce:
            "Un boulanger compte les croissants vendus chaque jour d'une semaine (modèle).\na) De combien en combien l'axe est-il gradué ?\nb) Combien de croissants a-t-il vendus le mardi ?\nc) Quel jour en a-t-il vendu le moins ?\nd) Combien de croissants de plus le samedi que le lundi ?\ne) Combien de croissants sur les six jours ?",
          figure: barres([
            { label: "Lun", value: 40 },
            { label: "Mar", value: 55 },
            { label: "Mer", value: 35 },
            { label: "Jeu", value: 60 },
            { label: "Ven", value: 75 },
            { label: "Sam", value: 80 },
          ], { pas: 10, unite: "croissants" }),
          correction:
            "a) Les graduations sont 0, 10, 20… : l'axe va de 10 en 10.\nb) La barre du mardi s'arrête au milieu, entre 50 et 60 : 55 croissants.\nc) La barre la plus basse est celle du mercredi, au milieu, entre 30 et 40 : 35 croissants.\nd) Samedi, sur la ligne 80 ; lundi, sur la ligne 40 : $80 - 40 = 40$ croissants de plus.\ne) Je lis toutes les barres : vendredi est au milieu, entre 70 et 80, soit 75.\n$40 + 55 + 35 + 60 + 75 + 80 = 345$ croissants.\n⛔ Le piège au b) : lire 50 ou 60, la graduation voisine. Entre deux lignes, c'est le nombre du milieu.\nRéponse : a) de 10 en 10 ; b) 55 ; c) le mercredi ; d) 40 ; e) 345.",
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "Une analyste financière présente le chiffre d'affaires trimestriel d'une jeune entreprise en 2025, en milliers d'euros (modèle).\na) Par quel nombre l'axe commence-t-il ? De combien en combien va-t-il ?\nb) Quel est le chiffre d'affaires du 3e trimestre ?\nc) Sur le dessin, la barre de T4 paraît combien de fois plus haute que celle de T1 ?\nd) En réalité, de quel pourcentage le chiffre d'affaires a-t-il augmenté de T1 à T4 ? Arrondis au dixième.",
          figure: barres([
            { label: "T1", value: 420 },
            { label: "T2", value: 440 },
            { label: "T3", value: 450 },
            { label: "T4", value: 480 },
          ], { pas: 20, debut: 400, unite: "milliers d'€" }),
          correction:
            "a) L'axe commence à 400, pas à 0 : il est TRONQUÉ. Il va de 20 en 20.\nb) La barre de T3 s'arrête au milieu, entre 440 et 460 : 450 milliers d'euros, soit 450 000 €.\nc) Sur le dessin, chaque barre part de 400. T1 monte de $420 - 400 = 20$, T4 de $480 - 400 = 80$. $80 \\div 20 = 4$ : elle paraît 4 fois plus haute.\nd) $\\dfrac{480 - 420}{420} = \\dfrac{60}{420} \\approx 0{,}1429$, soit une hausse d'environ 14,3 %.\n⛔ Le piège : juger à l'œil. L'axe tronqué fait croire à un chiffre d'affaires multiplié par 4 ; il a augmenté d'environ 14,3 %.\nRéponse : a) 400, de 20 en 20 ; b) 450 milliers d'euros ; c) 4 fois ; d) environ 14,3 %.",
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "La trésorière d'une association présente son budget annuel de 60 000 € (modèle).\na) Quel est le poste de dépense le plus important ?\nb) Combien l'association dépense-t-elle pour son loyer ?\nc) Combien pour le matériel et la communication ensemble ?\nd) Quel est l'angle du secteur du loyer ?",
          figure: camembert([
            { label: "Salaires", value: 40 },
            { label: "Loyer", value: 35 },
            { label: "Matériel", value: 15 },
            { label: "Communication", value: 10 },
          ], false, true),
          correction:
            "Le disque entier, c'est tout le budget : 100 %, soit 60 000 €.\na) La plus grande part est 40 % : les salaires.\nb) 35 % de 60 000 € : $0{,}35 \\times 60\\,000 = 21\\,000$ €.\nc) $15 + 10 = 25$ %, et $0{,}25 \\times 60\\,000 = 15\\,000$ €.\nd) $0{,}35 \\times 360 = 126$°.\n⛔ Le piège au b) : répondre 35 €. 35 est un pourcentage du budget : je le multiplie par le total.\nRéponse : a) les salaires ; b) $21\\,000$ € ; c) $15\\,000$ € ; d) 126°.",
          micros: ["auto_stat_diagrammes_usuels"],
        },
        {
          enonce:
            "Un chargé de clientèle relève, pendant 30 jours, le nombre de réclamations reçues chaque jour (modèle). Le diagramme en bâtons donne le nombre de jours pour chaque nombre de réclamations.\na) Combien de jours a-t-il reçu exactement 2 réclamations ?\nb) Combien de jours sans aucune réclamation ?\nc) Combien de jours avec au moins 4 réclamations ?\nd) Combien de réclamations a-t-il reçues en tout sur les 30 jours ?",
          figure: barres([
            { label: "0", value: 3 },
            { label: "1", value: 7 },
            { label: "2", value: 9 },
            { label: "3", value: 6 },
            { label: "4", value: 3 },
            { label: "5", value: 2 },
          ], { pas: 2, batons: true, unite: "jours" }),
          correction:
            "En bas, la valeur : le nombre de réclamations dans la journée. Sur l'axe, gradué de 2 en 2, l'effectif : le nombre de jours.\na) Le bâton de 2 s'arrête au milieu, entre 8 et 10 : 9 jours.\nb) Le bâton de 0 s'arrête au milieu, entre 2 et 4 : 3 jours.\nc) « Au moins 4 », c'est 4 ou 5. Le bâton de 4 est au milieu, entre 2 et 4 : 3 ; celui de 5 est sur la ligne 2. $3 + 2 = 5$ jours.\nd) Chaque valeur compte autant de fois que son effectif. Le bâton de 1 est au milieu, entre 6 et 8 : 7.\n$0 \\times 3 + 1 \\times 7 + 2 \\times 9 + 3 \\times 6 + 4 \\times 3 + 5 \\times 2 = 0 + 7 + 18 + 18 + 12 + 10 = 65$ réclamations.\n⛔ Le piège au d) : répondre 30, le nombre de JOURS.\nRéponse : a) 9 ; b) 3 ; c) 5 ; d) 65.",
          micros: ["auto_stat_diagrammes_usuels"],
        },
        {
          enonce:
            "Une contrôleuse de gestion sociale résume les salaires mensuels nets des salariés d'une PME par un diagramme en boîte, en euros (modèle).\na) Quelle est la médiane ? Que signifie-t-elle ?\nb) Quels sont les quartiles ? Calcule l'écart interquartile.\nc) Calcule l'étendue des salaires.\nd) Vrai ou faux : « Au moins un quart des salariés gagne 2500 € ou plus. »",
          figure: boite([{ min: 1500, q1: 1750, mediane: 2000, q3: 2500, max: 4000 }], { min: 1000, max: 4500, step: 500 }),
          correction:
            "a) La médiane, le trait du milieu de la boîte : 2000 €. Au moins la moitié des salariés gagne 2000 € ou moins, et au moins la moitié 2000 € ou plus.\nb) Q1 = 1750 € et Q3 = 2500 €. Écart interquartile : $2500 - 1750 = 750$ €.\nc) $4000 - 1500 = 2500$ €.\nd) Q3 = 2500 € : au moins 25 % des valeurs sont supérieures ou égales à Q3. Vrai.\nDe même, au moins un quart des salariés gagne 1750 € ou moins (Q1).\n⛔ Le piège : croire que la boîte donne la moyenne, ou le nombre de salariés. Elle donne cinq valeurs et des parts « au moins 25 %, 50 %, 75 % ».\nRéponse : a) 2000 € ; b) 1750 € et 2500 €, écart interquartile 750 € ; c) 2500 € ; d) vrai.",
          micros: ["auto_stat_boite"],
        },
        {
          enonce:
            "Une géographe étudie le nombre de départements des 13 régions de France métropolitaine. Rangés dans l'ordre croissant, ce sont :\n2, 4, 5, 5, 5, 6, 6, 8, 8, 10, 12, 12, 13.\na) Quelle est la médiane de cette série ?\nb) Détermine le premier et le troisième quartile.\nc) Calcule l'écart interquartile, puis dessine le diagramme en boîte.",
          correction:
            "La série compte 13 valeurs, déjà rangées.\na) 13 est impair : la médiane est la valeur du milieu, la 7e. Médiane : 6 départements.\nb) Q1 : $13 \\div 4 = 3{,}25$, j'arrondis au rang supérieur, la 4e valeur : Q1 = 5.\nQ3 : $3 \\times 13 \\div 4 = 9{,}75$, la 10e valeur : Q3 = 10.\nc) Écart interquartile : $10 - 5 = 5$ départements. Min 2 (la Corse), max 13 (l'Occitanie).\n⛔ Le piège au b) : prendre la 3e valeur pour Q1. Le rang de Q1 est le premier entier supérieur ou égal à $13 \\div 4$ : c'est 4.\nRéponse : a) 6 ; b) Q1 = 5, Q3 = 10 ; c) 5, et la boîte ci-dessous.",
          schema: ecranSeulement(boite([{ min: 2, q1: 5, mediane: 6, q3: 10, max: 13 }], { min: 0, max: 14, step: 2 })),
          micros: ["auto_stat_boite"],
        },
        {
          enonce:
            "Le directeur d'une piscine municipale fait le bilan des entrées d'un mercredi, par tranche d'âge (modèle).\na) Recopie et complète le tableau des données : tranche d'âge, nombre d'entrées.\nb) Combien d'entrées en tout ?\nc) Combien d'entrées de personnes de moins de 40 ans ?",
          figure: barres([
            { label: "0-17", value: 55 },
            { label: "18-39", value: 40 },
            { label: "40-59", value: 25 },
            { label: "60+", value: 15 },
          ], { pas: 10, unite: "entrées" }),
          correction:
            "a) L'axe va de 10 en 10. Je lis chaque barre :\n0-17 ans : au milieu, entre 50 et 60, soit 55. 18-39 ans : sur la ligne 40, soit 40.\n40-59 ans : au milieu, entre 20 et 30, soit 25. 60 ans et plus : au milieu, entre 10 et 20, soit 15.\nb) $55 + 40 + 25 + 15 = 135$ entrées.\nc) Les deux premières tranches : $55 + 40 = 95$ entrées.\n⛔ Le piège au c) : ajouter la tranche 40-59. « Moins de 40 ans » s'arrête à 39.\nRéponse : a) le tableau ci-dessous ; b) 135 ; c) 95.",
          schema: ecranSeulement(
            grille(["âge", "entrées"], [
              ["0-17", 55],
              ["18-39", 40],
              ["40-59", 25],
              ["60+", 15],
              ["total", 135],
            ], { total: true }),
          ),
          micros: ["auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Une infographiste prépare un diagramme circulaire des 48 équipes de la Coupe du monde 2026, par confédération : Europe (UEFA) 16, Afrique (CAF) 9, Asie (AFC) 8, Amérique du Sud (CONMEBOL) 6, Amérique du Nord et centrale (CONCACAF) 6, Océanie (OFC) 1, et 2 places pour un barrage intercontinental.\na) Quel angle représente une équipe ?\nb) Calcule l'angle du secteur de chaque confédération.\nc) Vérifie que les angles font bien un tour complet.",
          correction:
            "a) Les 48 équipes se partagent 360° : $360 \\div 48 = 7{,}5$° par équipe.\nb) UEFA : $16 \\times 7{,}5 = 120$°. CAF : $9 \\times 7{,}5 = 67{,}5$°. AFC : $8 \\times 7{,}5 = 60$°.\nCONMEBOL et CONCACAF : $6 \\times 7{,}5 = 45$° chacune. OFC : 7,5°. Barrage : $2 \\times 7{,}5 = 15$°.\nc) $120 + 67{,}5 + 60 + 45 + 45 + 7{,}5 + 15 = 360$°. Le tour est complet.\n⭐ L'Europe occupe un tiers du disque : $16 \\div 48 = \\dfrac{1}{3}$.\n⛔ Le piège : oublier les 2 places de barrage. Les angles ne feraient alors que 345°.\nRéponse : a) 7,5° ; b) 120°, 67,5°, 60°, 45°, 45°, 7,5° et 15° ; c) 360°.",
          schema: ecranSeulement(
            camembert([
              { label: "UEFA", value: 16 },
              { label: "CAF", value: 9 },
              { label: "AFC", value: 8 },
              { label: "CONMEBOL", value: 6 },
              { label: "CONCACAF", value: 6 },
              { label: "OFC", value: 1 },
              { label: "barrage", value: 2 },
            ], false),
          ),
          micros: ["auto_stat_graphique_donnees"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même graphique : je lis, je reconstitue les données, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Passer du graphique aux données : je relève chaque valeur dans un tableau, puis je calcule (total, écart, part).",
        "Passer des données au graphique : je choisis une échelle (1 cm pour … ) ou un angle par individu (360 ÷ effectif total).",
        "Deux diagrammes en boîte se comparent par leur médiane (le niveau) et leur écart interquartile (la régularité).",
      ],
      exercices: [
        {
          enonce:
            "Un architecte veut comparer, dans un diagramme en barres, les hauteurs de cinq tours (arrondies au mètre) : Burj Khalifa 828 m, Shanghai Tower 632 m, One World Trade Center 541 m, tour Eiffel 330 m, tour Montparnasse 210 m.\na) Avec l'échelle « 1 cm pour 100 m », quelle hauteur de barre dessine-t-il pour chaque tour ?\nb) Sa feuille ne laisse que 6 cm de haut. Parmi les échelles « 1 cm pour 100 m », « 1 cm pour 150 m » et « 1 cm pour 200 m », lesquelles permettent de tout dessiner ? Laquelle donne les plus grandes barres ?\nc) Avec cette échelle, quelle est la hauteur de la barre de la tour Eiffel ?",
          correction:
            "a) 1 cm pour 100 m : je divise chaque hauteur par 100.\nBurj Khalifa 8,28 cm ; Shanghai Tower 6,32 cm ; One World Trade Center 5,41 cm ; tour Eiffel 3,3 cm ; tour Montparnasse 2,1 cm.\nb) Seule la plus haute compte : 828 m.\n1 cm pour 100 m : 8,28 cm, trop haut. 1 cm pour 150 m : $828 \\div 150 = 5{,}52$ cm, cela tient. 1 cm pour 200 m : $828 \\div 200 = 4{,}14$ cm, cela tient aussi.\nLes deux dernières conviennent ; « 1 cm pour 150 m » donne les plus grandes barres, donc la lecture la plus précise.\nc) $330 \\div 150 = 2{,}2$ cm.\n⛔ Le piège au b) : choisir l'échelle d'après la tour Eiffel ou une tour moyenne. C'est la plus haute barre qui décide.\nRéponse : a) 8,28 ; 6,32 ; 5,41 ; 3,3 et 2,1 cm ; b) 1 cm pour 150 m ou pour 200 m, la première est la meilleure ; c) 2,2 cm.",
          schema: ecranSeulement(
            barres([
              { label: "Burj", value: 828 },
              { label: "Shang.", value: 632 },
              { label: "WTC", value: 541 },
              { label: "Eiffel", value: 330 },
              { label: "Montp.", value: 210 },
            ], { unite: "mètres" }),
          ),
          micros: ["auto_stat_lire_graphique", "auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Une diagnostiqueuse immobilière a relevé le mode de chauffage de 150 logements d'un quartier (modèle) : gaz 45, électricité 60, fioul 15, bois 30. Elle veut en faire un diagramme circulaire.\na) Quel angle représente un logement ?\nb) Calcule l'angle de chaque secteur.\nc) Quelle est la fréquence de l'électricité, en pourcentage ?",
          correction:
            "a) $360 \\div 150 = 2{,}4$° par logement.\nb) Gaz : $45 \\times 2{,}4 = 108$°. Électricité : $60 \\times 2{,}4 = 144$°. Fioul : $15 \\times 2{,}4 = 36$°. Bois : $30 \\times 2{,}4 = 72$°.\nContrôle : $108 + 144 + 36 + 72 = 360$°.\nc) $60 \\div 150 = 0{,}4$, soit 40 %. Contrôle : $0{,}4 \\times 360 = 144$°, l'angle trouvé.\n⛔ Le piège au b) : prendre l'effectif pour l'angle, 60°. Il faut multiplier par 2,4°.\nRéponse : a) 2,4° ; b) 108°, 144°, 36° et 72° ; c) 40 %.",
          schema: ecranSeulement(
            camembert([
              { label: "gaz", value: 45 },
              { label: "électricité", value: 60 },
              { label: "fioul", value: 15 },
              { label: "bois", value: 30 },
            ]),
          ),
          micros: ["auto_stat_diagrammes_usuels", "auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "La responsable relation client d'un opérateur de télécoms montre l'évolution du pourcentage de clients satisfaits (modèle).\na) Par quel nombre l'axe commence-t-il ? Quel est son pas ?\nb) Quel est le pourcentage de clients satisfaits en 2024 ?\nc) De combien de points a-t-il progressé de 2022 à 2025 ?\nd) Sur le dessin, la barre de 2025 paraît combien de fois plus haute que celle de 2022 ?\ne) En réalité, par combien le pourcentage a-t-il été multiplié ? Arrondis au centième.",
          figure: barres([
            { label: "2022", value: 84 },
            { label: "2023", value: 86 },
            { label: "2024", value: 87 },
            { label: "2025", value: 90 },
          ], { pas: 2, debut: 80, unite: "% de satisfaits" }),
          correction:
            "a) L'axe commence à 80 et va de 2 en 2 : il est tronqué.\nb) La barre de 2024 s'arrête au milieu, entre 86 et 88 : 87 %.\nc) $90 - 84 = 6$ points.\nd) Au-dessus de 80, la barre de 2022 monte de $84 - 80 = 4$, celle de 2025 de $90 - 80 = 10$. $10 \\div 4 = 2{,}5$ : elle paraît 2,5 fois plus haute.\ne) $90 \\div 84 \\approx 1{,}07$. Le pourcentage a été multiplié par 1,07 environ.\n⛔ Le piège : dire « la satisfaction a été multipliée par 2,5 ». C'est l'effet de l'axe qui commence à 80.\nRéponse : a) 80, de 2 en 2 ; b) 87 % ; c) 6 points ; d) 2,5 fois ; e) environ 1,07.",
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "Une acheteuse compare les délais de livraison, en heures, de deux transporteurs A et B sur 200 colis chacun (modèle).\na) Quelle est la médiane de chacun ? Que remarques-tu ?\nb) Calcule l'écart interquartile et l'étendue de chacun.\nc) Vrai ou faux : « Au moins 75 % des colis de B arrivent en 60 heures au plus. »\nd) Quel transporteur est le plus régulier ? Justifie.",
          figure: boite([
            { label: "A", min: 20, q1: 35, mediane: 50, q3: 70, max: 120 },
            { label: "B", min: 30, q1: 40, mediane: 50, q3: 60, max: 72 },
          ], { min: 10, max: 130, step: 10 }),
          correction:
            "a) A : médiane 50 h. B : médiane 50 h. Les deux transporteurs ont la même médiane : la moitié des colis arrive en 50 heures au plus, chez l'un comme chez l'autre.\nb) A : écart interquartile $70 - 35 = 35$ h, étendue $120 - 20 = 100$ h.\nB : écart interquartile $60 - 40 = 20$ h, étendue $72 - 30 = 42$ h.\nc) Q3 de B vaut 60 : au moins 75 % des colis de B arrivent en 60 heures au plus. Vrai.\nd) B : son écart interquartile (20 h contre 35 h) et son étendue (42 h contre 100 h) sont plus petits. Ses délais sont plus resserrés.\n⛔ Le piège au d) : départager par la médiane. Elle est la même ; la régularité se lit sur la LARGEUR de la boîte.\nRéponse : a) 50 h pour les deux ; b) A : 35 h et 100 h, B : 20 h et 42 h ; c) vrai ; d) B.",
          micros: ["auto_stat_boite"],
        },
        {
          enonce:
            "Le gérant d'un gîte rural relève, pour les 50 réservations de l'été, le nombre de nuits réservées (modèle). Le diagramme en bâtons donne le nombre de réservations pour chaque nombre de nuits.\na) Recopie et complète le tableau : nombre de nuits, nombre de réservations.\nb) Vérifie qu'il y a bien 50 réservations.\nc) Combien de nuits ont été réservées en tout ?\nd) Quel est le nombre moyen de nuits par réservation ?",
          figure: barres([
            { label: "1", value: 12 },
            { label: "2", value: 16 },
            { label: "3", value: 10 },
            { label: "4", value: 6 },
            { label: "5", value: 6 },
          ], { pas: 4, batons: true, unite: "réservations" }),
          correction:
            "a) L'axe va de 4 en 4. 1 nuit : sur la ligne 12, soit 12. 2 nuits : sur la ligne 16, soit 16. 3 nuits : au milieu, entre 8 et 12, soit 10. 4 nuits et 5 nuits : au milieu, entre 4 et 8, soit 6 chacun.\nb) $12 + 16 + 10 + 6 + 6 = 50$ réservations.\nc) $1 \\times 12 + 2 \\times 16 + 3 \\times 10 + 4 \\times 6 + 5 \\times 6 = 12 + 32 + 30 + 24 + 30 = 128$ nuits.\nd) $128 \\div 50 = 2{,}56$ nuits par réservation.\n⛔ Le piège au d) : diviser par 5, le nombre de bâtons. La moyenne se calcule sur les 50 réservations.\nRéponse : a) 12, 16, 10, 6 et 6 ; b) 50 ; c) 128 nuits ; d) 2,56 nuits.",
          micros: ["auto_stat_diagrammes_usuels", "auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "La chargée de développement durable d'un festival a pesé les 1200 kg de déchets de l'édition (modèle) : 45 % de déchets recyclables, 30 % de déchets à composter, 25 % d'ordures non triées.\na) Combien de kilogrammes de déchets à composter ?\nb) Calcule l'angle de chaque secteur du diagramme circulaire.\nc) L'an prochain, elle vise 15 % d'ordures non triées pour la même masse de déchets. De combien de kilogrammes doit-elle les réduire ?",
          correction:
            "a) 30 % de 1200 kg : $0{,}3 \\times 1200 = 360$ kg.\nb) Recyclables : $0{,}45 \\times 360 = 162$°. Compost : $0{,}3 \\times 360 = 108$°. Ordures : $0{,}25 \\times 360 = 90$°.\nContrôle : $162 + 108 + 90 = 360$°.\nc) Aujourd'hui : $0{,}25 \\times 1200 = 300$ kg. Objectif : $0{,}15 \\times 1200 = 180$ kg. $300 - 180 = 120$ kg de moins.\n⛔ Le piège au c) : répondre 10 kg, parce que 25 − 15 = 10. 10 points de pourcentage, c'est 10 % de 1200 kg.\nRéponse : a) 360 kg ; b) 162°, 108° et 90° ; c) 120 kg.",
          schema: ecranSeulement(
            camembert([
              { label: "Recyclable", value: 45 },
              { label: "Compost", value: 30 },
              { label: "Ordures", value: 25 },
            ], false, true),
          ),
          micros: ["auto_stat_diagrammes_usuels", "auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Une chercheuse en sociologie urbaine résume les temps de trajet domicile-travail, en minutes, des salariés d'une ville (modèle). Pour chaque phrase, dis si elle est vraie, fausse, ou si la boîte ne permet pas de savoir.\na) « Au moins la moitié des salariés met 25 minutes ou plus. »\nb) « Au moins un quart des salariés met 15 minutes ou moins. »\nc) « L'écart interquartile vaut 25 minutes. »\nd) « Personne ne met plus d'une heure. »\ne) « Le temps moyen est de 25 minutes. »",
          figure: boite([{ min: 5, q1: 15, mediane: 25, q3: 40, max: 75 }], { min: 0, max: 80, step: 10 }),
          correction:
            "a) La médiane vaut 25 : au moins la moitié des valeurs est supérieure ou égale à 25. Vrai.\nb) Q1 vaut 15 : au moins 25 % des valeurs sont inférieures ou égales à 15. Vrai.\nc) $40 - 15 = 25$ minutes. Vrai.\nd) Le maximum vaut 75 minutes : au moins un salarié met 1 h 15. Faux.\ne) La boîte donne la médiane, pas la moyenne : on ne peut pas savoir.\n⛔ Le piège au e) : confondre médiane et moyenne. Quelques très longs trajets tirent la moyenne vers le haut, pas la médiane.\nRéponse : a) vrai ; b) vrai ; c) vrai ; d) faux ; e) on ne peut pas savoir.",
          micros: ["auto_stat_boite"],
        },
        {
          enonce:
            "Un primeur affiche le prix au kilogramme de cinq fruits (modèle).\na) De combien en combien l'axe est-il gradué ? Quel est le prix du kilo de kiwis ?\nb) Une cliente achète 2 kg de pommes et 1,5 kg de figues. Combien paie-t-elle ?\nc) Combien de fois le kilo de figues est-il plus cher que le kilo de pommes ?",
          figure: barres([
            { label: "Pomme", value: 2.5 },
            { label: "Poire", value: 3 },
            { label: "Kiwi", value: 4.5 },
            { label: "Prune", value: 6 },
            { label: "Figue", value: 7.5 },
          ], { pas: 1, unite: "€ le kilo" }),
          correction:
            "a) L'axe va de 1 en 1. La barre du kiwi s'arrête au milieu, entre 4 et 5 : 4,50 € le kilo.\nb) Pomme : au milieu, entre 2 et 3, soit 2,50 €. Figue : au milieu, entre 7 et 8, soit 7,50 €.\n$2 \\times 2{,}5 + 1{,}5 \\times 7{,}5 = 5 + 11{,}25 = 16{,}25$ €.\nc) $7{,}5 \\div 2{,}5 = 3$ : trois fois plus cher.\n⛔ Le piège au a) : lire 4 ou 5. Une barre entre deux graduations vaut le nombre du milieu, ici 4,5.\nRéponse : a) de 1 en 1, 4,50 € ; b) 16,25 € ; c) 3 fois.",
          micros: ["auto_stat_lire_graphique", "auto_stat_graphique_donnees"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un graphique de gestion, plusieurs étapes. Je lis toutes les valeurs, je les range dans un tableau, je calcule, puis je juge ce que le graphique fait croire.",
      rappel: [
        "Je relève d'abord TOUTES les valeurs du graphique, avec leur unité.",
        "Taux d'évolution = (valeur d'arrivée − valeur de départ) ÷ valeur de départ.",
        "Un axe qui ne part pas de 0 grossit les écarts : je compare toujours les vraies valeurs.",
      ],
      exercices: [
        {
          titre: "Le tableau de bord du semestre",
          enonce:
            "La contrôleuse de gestion d'une PME présente le chiffre d'affaires mensuel du premier semestre 2026, en milliers d'euros (modèle). L'objectif du semestre était de 330 milliers d'euros.\na) Quel est le chiffre d'affaires de mars ? D'avril ?\nb) Calcule le chiffre d'affaires du semestre. L'objectif est-il atteint ?\nc) Calcule le chiffre d'affaires mensuel moyen, arrondi au dixième.\nd) Calcule le taux d'évolution du chiffre d'affaires de janvier à juin, en pourcentage arrondi au dixième.",
          figure: barres([
            { label: "Jan", value: 45 },
            { label: "Fév", value: 50 },
            { label: "Mar", value: 40 },
            { label: "Avr", value: 55 },
            { label: "Mai", value: 65 },
            { label: "Juin", value: 70 },
          ], { pas: 10, unite: "milliers d'€" }),
          correction:
            "a) L'axe va de 10 en 10. Mars : sur la ligne 40, soit 40 milliers d'euros. Avril : au milieu, entre 50 et 60, soit 55.\nb) Janvier est au milieu, entre 40 et 50, soit 45 ; mai au milieu, entre 60 et 70, soit 65.\n$45 + 50 + 40 + 55 + 65 + 70 = 325$ milliers d'euros. C'est moins que 330 : l'objectif est manqué de $330 - 325 = 5$ milliers d'euros.\nc) $325 \\div 6 \\approx 54{,}2$ milliers d'euros par mois.\nd) $\\dfrac{70 - 45}{45} = \\dfrac{25}{45} \\approx 0{,}5556$, soit une hausse d'environ 55,6 %.\n⛔ Le piège au d) : diviser par 70, la valeur d'arrivée. Un taux d'évolution se calcule sur la valeur de DÉPART.\nRéponse : a) 40 et 55 milliers d'euros ; b) 325, objectif manqué de 5 ; c) environ 54,2 ; d) environ 55,6 %.",
          micros: ["auto_stat_lire_graphique", "auto_stat_graphique_donnees"],
        },
        {
          titre: "Le sondage et son diagramme",
          enonce:
            "Une chargée d'études d'un institut de sondage a interrogé 400 habitants sur leur façon d'aller au travail (modèle). Son diagramme circulaire est juste. Son tableau, lui, contient une erreur : voiture 180, transports en commun 120, vélo 60, marche 50.\na) À partir du diagramme, calcule l'effectif de chaque réponse.\nb) Quel nombre du tableau est faux ? Comment pouvait-on le voir sans le diagramme ?\nc) Quel est l'angle du secteur du vélo ?",
          figure: camembert([
            { label: "Voiture", value: 45 },
            { label: "Transports", value: 30 },
            { label: "Vélo", value: 15 },
            { label: "Marche", value: 10 },
          ], false, true),
          correction:
            "a) Voiture : $0{,}45 \\times 400 = 180$. Transports : $0{,}3 \\times 400 = 120$. Vélo : $0{,}15 \\times 400 = 60$. Marche : $0{,}1 \\times 400 = 40$.\nb) La marche : 40 et non 50.\nSans le diagramme : $180 + 120 + 60 + 50 = 410$, plus que les 400 personnes interrogées.\nc) $0{,}15 \\times 360 = 54$°.\n⛔ Le piège : contrôler les pourcentages sans contrôler le total des effectifs. Un tableau se vérifie TOUJOURS par sa somme.\nRéponse : a) 180, 120, 60 et 40 ; b) la marche, 40 au lieu de 50 ; c) 54°.",
          micros: ["auto_stat_diagrammes_usuels", "auto_stat_graphique_donnees"],
        },
        {
          titre: "L'attente aux urgences",
          enonce:
            "Une cadre de santé a relevé le temps d'attente, en minutes, de 12 patients arrivés aux urgences un soir (modèle). Rangés dans l'ordre croissant :\n10, 15, 20, 25, 30, 30, 35, 45, 50, 60, 90, 120.\na) Calcule la médiane.\nb) Détermine Q1 et Q3.\nc) Dessine le diagramme en boîte, puis calcule l'écart interquartile.\nd) L'hôpital vise « au moins la moitié des patients pris en charge en 30 minutes au plus ». Est-ce le cas ce soir ?",
          correction:
            "a) 12 valeurs : la médiane est entre la 6e et la 7e, 30 et 35. $(30 + 35) \\div 2 = 32{,}5$ minutes.\nb) Q1 : $12 \\div 4 = 3$, la 3e valeur : Q1 = 20. Q3 : $3 \\times 12 \\div 4 = 9$, la 9e valeur : Q3 = 50.\nc) Min 10, Q1 20, médiane 32,5, Q3 50, max 120. Écart interquartile : $50 - 20 = 30$ minutes.\nd) Patients pris en charge en 30 minutes au plus : 10, 15, 20, 25, 30 et 30, soit 6 sur 12, la moitié pile. Oui, l'objectif est atteint de justesse.\n⭐ La médiane, 32,5, dépasse pourtant 30 : avec un nombre pair de valeurs, elle tombe entre la 6e valeur (30) et la 7e (35).\n⛔ Le piège au a) : prendre la 6e valeur, 30. Avec un nombre PAIR de valeurs, la médiane est la moyenne des deux valeurs du milieu.\nRéponse : a) 32,5 min ; b) Q1 = 20, Q3 = 50 ; c) 30 min ; d) oui, 6 patients sur 12.",
          schema: ecranSeulement(boite([{ min: 10, q1: 20, mediane: 32.5, q3: 50, max: 120 }], { min: 0, max: 130, step: 10 })),
          micros: ["auto_stat_boite", "auto_stat_graphique_donnees"],
        },
        {
          titre: "La publicité trompeuse",
          enonce:
            "Une inspectrice de la répression des fraudes examine une publicité. La marque B y affirme : « Trois fois plus de clients satisfaits que chez A ! » Voici son graphique (modèle).\na) Lis le pourcentage de clients satisfaits de A et de B.\nb) Sur le dessin, la barre de B paraît combien de fois plus haute que celle de A ?\nc) Combien de points d'écart y a-t-il en réalité ? Par combien le pourcentage de A est-il multiplié pour obtenir celui de B ? Arrondis au centième.\nd) La phrase de la publicité est-elle honnête ?",
          figure: barres([
            { label: "Marque A", value: 92 },
            { label: "Marque B", value: 96 },
          ], { pas: 1, debut: 90, unite: "% de satisfaits" }),
          correction:
            "a) L'axe commence à 90 et va de 1 en 1. A : 92 %. B : 96 %.\nb) Au-dessus de 90 : A monte de $92 - 90 = 2$, B de $96 - 90 = 6$. $6 \\div 2 = 3$ : la barre de B paraît 3 fois plus haute.\nc) $96 - 92 = 4$ points. $96 \\div 92 \\approx 1{,}04$ : le pourcentage n'est multiplié que par 1,04 environ.\nd) Non. Le « trois fois plus » vient de l'axe qui commence à 90. Redessiné à partir de 0, les deux barres sont presque égales.\n⛔ Le piège : croire le dessin. Je lis TOUJOURS le premier nombre de l'axe avant de comparer des hauteurs.\nRéponse : a) 92 % et 96 % ; b) 3 fois ; c) 4 points, environ 1,04 ; d) non, l'axe est tronqué.",
          schema: ecranSeulement(
            barres([
              { label: "Marque A", value: 92 },
              { label: "Marque B", value: 96 },
            ], { unite: "% de satisfaits, axe depuis 0" }),
          ),
          micros: ["auto_stat_lire_graphique", "auto_stat_graphique_donnees"],
        },
      ],
    },
  ],
};
