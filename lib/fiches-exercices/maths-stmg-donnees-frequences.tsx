// ─── Fiche d'exercices : fréquences marginales et conditionnelles (STMG) ──────
//                              20 exercices corrigés
//
// Deuxième feuille « données » de STMG (22/10/2026), sœur de
// `maths-stmg-donnees-tableau-croise.tsx` (mêmes dessins, `figures-donnees.tsx`).
// Alignée sur la banque `lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts`,
// notion donnees_frequences : fréquence marginale, fréquence conditionnelle,
// compléter un tableau à partir de fréquences conditionnelles, interpréter une
// formulation de la presse. ⛔ Aucune probabilité (terminale).
//
// ⭐⭐ LE FIL : « PARMI … » DONNE LE DÉNOMINATEUR. Une fréquence conditionnelle
// divise une case par la marge de SA ligne ou de SA colonne ; la même case 90
// donne 45 % « parmi les étrangers » et 60 % « parmi les visites guidées ». Le
// BO le demande : travailler la langue des médias (« 30 % des sinistres
// concernent des jeunes » n'est pas « 30 % des jeunes ont un sinistre »).
//
// ⭐ LES ARRONDIS sont annoncés dans l'énoncé (au dixième de pour cent) ; le
// corrigé écrit le quotient à quatre décimales, puis le pourcentage arrondi.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 2 — l'alphabet français : 26 lettres, 6 voyelles (a, e, i, o, u, y) ;
//   · ex. 8 — l'ONU : 193 États membres, dont 54 en Afrique (site de l'ONU) ;
//   · ex. 9 — les médailles de la France à Paris 2024 (CNOSF, CPSF) : JO 16 or,
//     26 argent, 22 bronze ; Jeux paralympiques 19 or, 28 argent, 28 bronze ;
//   · ex. 13 — le jeu de 52 cartes (4 couleurs de 13, 3 figures par couleur) ;
//   · ex. 19 — le calendrier 2026 (1er janvier un jeudi) : 90, 91, 92 et 92
//     jours par trimestre, 26 jours de week-end dans CHACUN, 104 dans l'année.
//   · ex. 12 — un modèle proche des ordres de grandeur publiés par l'INSEE :
//     environ 3 temps partiels sur 4 sont occupés par des femmes, environ une
//     femme salariée sur 4 travaille à temps partiel.
// Le reste est un MODÈLE, et l'énoncé le dit.
// Domaines et métiers, un par exercice : audit social (auditrice), langage
// (orthophoniste), marketing digital (chargé de communication), santé au
// travail (médecin du travail), patrimoine (guide-conférencière), service
// client (responsable), assurance (actuaire), diplomatie (diplomate), sport
// (chargée de communication du comité paralympique), banque (conseillère),
// déchets (responsable de la collecte), économie (économiste), jeux de société
// (concepteur), recrutement (chargée de recrutement), agronomie (agronome),
// hôtellerie (directrice marketing), mutuelle (chargé d'études), automobile
// (directrice de concession), loisirs (planificatrice d'un parc), RSE
// (responsable du plan de mobilité).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-donnees-frequences.mjs`.
//
// Micro-compétences : don_freq_marginale (1, 2, 8, 9, 11, 13, 14, 16, 17, 18,
// 19, 20), don_freq_conditionnelle (3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16,
// 17, 18, 19, 20), don_freq_completer (6, 10, 14, 17, 20), don_freq_interpreter
// (7, 9, 12, 15, 17, 18). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { camembert, croise, ecranSeulement } from "@/lib/fiches-exercices/figures-donnees";

export const exercicesDonneesFrequencesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "donnees-frequences",
  titre: "Fréquences marginales et conditionnelles",
  accroche:
    "Vingt exercices pour calculer une fréquence marginale et une fréquence conditionnelle dans un tableau croisé, compléter un tableau à partir de pourcentages, et démêler les phrases de la presse : « 30 % des sinistres concernent des jeunes » ne veut pas dire « 30 % des jeunes ont un sinistre ». Publicité, assurance, recrutement, mutuelle, concession automobile ; et des données réelles : l'ONU, les médailles de Paris 2024, le jeu de 52 cartes, le calendrier 2026. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une fréquence par question : je repère la population de référence, puis je divise.",
      rappel: [
        "Fréquence MARGINALE : une marge divisée par le total général (la part des femmes parmi TOUS les salariés).",
        "Fréquence CONDITIONNELLE : une case divisée par la marge de sa ligne ou de sa colonne. « Parmi les … » nomme cette marge.",
        "Fréquence = effectif ÷ effectif de référence. Pour un pourcentage, je multiplie par 100.",
        "J'arrondis seulement à la fin, comme l'énoncé le demande.",
      ],
      exercices: [
        {
          enonce:
            "Une auditrice sociale étudie les 250 salariés d'une entreprise (modèle), par sexe et par statut.\na) Quelle est la fréquence des femmes parmi les salariés ? Donne-la en pourcentage.\nb) Quelle est la fréquence des cadres parmi les salariés ?\nc) Quelle est la fréquence des hommes non-cadres parmi tous les salariés ?",
          figure: croise(["", "Cadre", "Non-cadre", "Total"], [
            ["Femmes", 30, 80, 110],
            ["Hommes", 45, 95, 140],
            ["Total", 75, 175, 250],
          ]),
          correction:
            "La population de référence est la même pour les trois questions : les 250 salariés. Je divise par le total général.\na) La marge « Femmes » : $110 \\div 250 = 0{,}44$, soit 44 %.\nb) La marge « Cadre » : $75 \\div 250 = 0{,}3$, soit 30 %.\nc) La case « Hommes » et « Non-cadre » : $95 \\div 250 = 0{,}38$, soit 38 %.\n⛔ Le piège au c) : diviser 95 par 140, les hommes. La question dit « parmi tous les salariés » : le dénominateur est 250.\nRéponse : a) 44 % ; b) 30 % ; c) 38 %.",
          micros: ["don_freq_marginale"],
        },
        {
          enonce:
            "Une orthophoniste prépare un jeu de lettres pour ses patients. L'alphabet français compte 26 lettres, dont 6 voyelles : a, e, i, o, u et y.\na) Quelle est la fréquence des voyelles dans l'alphabet ? Donne une fraction simplifiée, puis un pourcentage arrondi au dixième.\nb) Quelle est la fréquence des consonnes, en pourcentage arrondi au dixième ?",
          correction:
            "La population de référence : les 26 lettres de l'alphabet.\na) $\\dfrac{6}{26} = \\dfrac{3}{13}$, en simplifiant par 2.\n$6 \\div 26 \\approx 0{,}2308$, soit environ 23,1 %.\nb) Les consonnes : $26 - 6 = 20$ lettres. $20 \\div 26 \\approx 0{,}7692$, soit environ 76,9 %.\nContrôle : $23{,}1 + 76{,}9 = 100$.\n⛔ Le piège : oublier le y. Il compte parmi les six voyelles de l'alphabet.\nRéponse : a) $\\dfrac{3}{13}$, environ 23,1 % ; b) environ 76,9 %.",
          schema: ecranSeulement(
            camembert([
              { label: "voyelles", value: 6 },
              { label: "consonnes", value: 20 },
            ]),
          ),
          micros: ["don_freq_marginale"],
        },
        {
          enonce:
            "Un chargé de communication digitale mesure l'effet d'une publicité en ligne sur 1200 internautes (modèle).\na) Parmi les internautes qui ont vu la publicité, quelle est la fréquence des acheteurs ?\nb) Parmi ceux qui ne l'ont pas vue, quelle est la fréquence des acheteurs ?\nc) La publicité semble-t-elle efficace ?",
          figure: croise(["", "A acheté", "N'a pas acheté", "Total"], [
            ["A vu la pub", 90, 210, 300],
            ["Pas vu la pub", 108, 792, 900],
            ["Total", 198, 1002, 1200],
          ]),
          correction:
            "« Parmi les internautes qui ont vu la publicité » : la population de référence est la ligne « A vu la pub », 300 personnes.\na) $90 \\div 300 = 0{,}3$, soit 30 %.\nb) Cette fois, la ligne « Pas vu la pub », 900 personnes : $108 \\div 900 = 0{,}12$, soit 12 %.\nc) 30 % contre 12 % : on achète bien plus souvent quand on a vu la publicité. Elle semble efficace.\n⛔ Le piège au b) : comparer 108 à 90 et conclure que la publicité ne sert à rien. Les deux groupes n'ont pas la même taille : je compare des fréquences, pas des effectifs.\nRéponse : a) 30 % ; b) 12 % ; c) oui.",
          micros: ["don_freq_conditionnelle"],
        },
        {
          enonce:
            "Une médecin du travail interroge les 160 salariés d'une entreprise du bâtiment (modèle) : ont-ils mal au dos ?\na) Parmi les salariés de chantier, quelle est la fréquence du mal de dos ?\nb) Parmi les salariés de bureau ?\nc) Parmi les salariés qui ont mal au dos, quelle est la fréquence des salariés de bureau ? Arrondis au dixième de pour cent.",
          figure: croise(["", "Mal de dos", "Pas de mal de dos", "Total"], [
            ["Bureau", 18, 102, 120],
            ["Chantier", 14, 26, 40],
            ["Total", 32, 128, 160],
          ]),
          correction:
            "a) « Parmi les salariés de chantier » : la ligne « Chantier », 40 salariés. $14 \\div 40 = 0{,}35$, soit 35 %.\nb) La ligne « Bureau », 120 salariés : $18 \\div 120 = 0{,}15$, soit 15 %.\nc) « Parmi les salariés qui ont mal au dos » : cette fois, la COLONNE « Mal de dos », 32 salariés.\n$18 \\div 32 = 0{,}5625$, soit environ 56,3 %.\n⭐ Plus de la moitié des dos douloureux sont au bureau, alors que le chantier est plus de deux fois plus touché (35 % contre 15 %) : le bureau compte simplement beaucoup plus de salariés.\n⛔ Le piège au c) : diviser 18 par 120. La population de référence change avec « parmi » : je relis la question avant chaque division.\nRéponse : a) 35 % ; b) 15 % ; c) environ 56,3 %.",
          micros: ["don_freq_conditionnelle"],
        },
        {
          enonce:
            "Une guide-conférencière fait le bilan d'une journée au musée : 500 visiteurs (modèle), selon leur origine et leur type de visite.\na) Parmi les visiteurs étrangers, quelle est la fréquence de la visite guidée ?\nb) Parmi les visiteurs qui ont pris une visite guidée, quelle est la fréquence des étrangers ?\nc) Les deux réponses partent de la même case. Pourquoi sont-elles différentes ?",
          figure: croise(["", "Visite guidée", "Visite libre", "Total"], [
            ["France", 60, 240, 300],
            ["Étranger", 90, 110, 200],
            ["Total", 150, 350, 500],
          ]),
          correction:
            "a) « Parmi les visiteurs étrangers » : la ligne « Étranger », 200 visiteurs. $90 \\div 200 = 0{,}45$, soit 45 %.\nb) « Parmi les visites guidées » : la colonne « Visite guidée », 150 visiteurs. $90 \\div 150 = 0{,}6$, soit 60 %.\nc) La case est la même, 90 étrangers en visite guidée, mais la population de référence change : 200 étrangers au a), 150 visites guidées au b).\n⛔ Le piège : croire qu'une case donne UNE fréquence. Elle en donne deux, une par marge.\nRéponse : a) 45 % ; b) 60 % ; c) on ne divise pas par la même marge.",
          micros: ["don_freq_conditionnelle"],
        },
        {
          enonce:
            "La responsable du service client d'une marque de chaussures étudie 200 commandes (modèle) : 80 livrées à domicile, 120 retirées en magasin. Parmi les commandes livrées, 25 % ont été retournées ; parmi les commandes retirées en magasin, 5 %.\na) Complète le tableau.\nb) Quelle est la fréquence des commandes retournées, parmi toutes les commandes ?",
          figure: croise(["", "Retournée", "Gardée", "Total"], [
            ["Livraison", "?", "?", 80],
            ["Retrait", "?", "?", 120],
            ["Total", "?", "?", 200],
          ]),
          correction:
            "a) Une fréquence conditionnelle donne une CASE : je la calcule sur la marge de sa ligne.\nLivraison retournée : 25 % de 80, $0{,}25 \\times 80 = 20$. Gardée : $80 - 20 = 60$.\nRetrait retourné : 5 % de 120, $0{,}05 \\times 120 = 6$. Gardé : $120 - 6 = 114$.\nLes marges : retournées $20 + 6 = 26$ ; gardées $60 + 114 = 174$. Contrôle : $26 + 174 = 200$.\nb) $26 \\div 200 = 0{,}13$, soit 13 %.\n⛔ Le piège au b) : faire la moyenne $(25 + 5) \\div 2 = 15$ %. Les deux groupes n'ont pas la même taille : je repasse par les effectifs.\nRéponse : a) 20, 60, 6, 114, 26, 174 ; b) 13 %.",
          schema: ecranSeulement(
            croise(["", "Retournée", "Gardée", "Total"], [
              ["Livraison", 20, 60, 80],
              ["Retrait", 6, 114, 120],
              ["Total", 26, 174, 200],
            ]),
          ),
          micros: ["don_freq_completer"],
        },
        {
          enonce:
            "Un actuaire d'une compagnie d'assurance étudie 2000 assurés auto (modèle) : ont-ils déclaré un sinistre cette année ? Un journal écrit deux phrases. Pour chacune, dis si elle est vraie ou fausse.\na) « 30 % des sinistres concernent des conducteurs de moins de 25 ans. »\nb) « 30 % des conducteurs de moins de 25 ans ont eu un sinistre. »\nc) Parmi les 25 ans et plus, quelle est la fréquence des sinistres ? Arrondis au dixième de pour cent.",
          figure: croise(["", "Sinistre", "Pas de sinistre", "Total"], [
            ["Moins de 25 ans", 60, 240, 300],
            ["25 ans et plus", 140, 1560, 1700],
            ["Total", 200, 1800, 2000],
          ]),
          correction:
            "a) La population de référence est « les sinistres », la colonne « Sinistre », 200. $60 \\div 200 = 0{,}3$, soit 30 % : la phrase a) est vraie.\nb) La population de référence est « les moins de 25 ans », la ligne, 300. $60 \\div 300 = 0{,}2$, soit 20 % : la phrase b) est fausse.\nc) La ligne « 25 ans et plus » : $140 \\div 1700 \\approx 0{,}0824$, soit environ 8,2 %.\n⭐ Un jeune conducteur a donc bien plus souvent un sinistre (20 %) qu'un conducteur plus âgé (environ 8,2 %).\n⛔ Le piège : lire les mêmes mots dans les deux phrases. Je cherche ce qui suit « des » : c'est le groupe de référence.\nRéponse : a) vraie, 30 % ; b) fausse, 20 % ; c) environ 8,2 %.",
          micros: ["don_freq_interpreter", "don_freq_conditionnelle"],
        },
        {
          enonce:
            "Un diplomate prépare une conférence sur l'Organisation des Nations unies, qui compte 193 États membres. 54 d'entre eux sont en Afrique.\na) Quelle est la fréquence des États africains parmi les membres de l'ONU ? Arrondis au dixième de pour cent.\nb) Vrai ou faux : « Plus d'un État membre sur quatre est africain. »",
          correction:
            "La population de référence : les 193 États membres.\na) $54 \\div 193 \\approx 0{,}2798$, soit environ 28,0 %.\nb) Un sur quatre, c'est 25 %. Environ 28,0 % est plus que 25 % : vrai.\nAutre preuve : le quart de 193 est $193 \\div 4 = 48{,}25$, et 54 dépasse $48{,}25$.\n⛔ Le piège au a) : arrondir trop tôt, à 0,28 puis à 28 %. L'énoncé demande le dixième : 28,0 %.\nRéponse : a) environ 28,0 % ; b) vrai.",
          schema: ecranSeulement(
            camembert([
              { label: "Afrique", value: 54 },
              { label: "autres", value: 139 },
            ]),
          ),
          micros: ["don_freq_marginale"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs fréquences sur le même tableau. Avant chaque division, j'écris la population de référence.",
      rappel: [
        "« Parmi les A, la fréquence des B » : case (A et B) ÷ marge de A.",
        "Une fréquence conditionnelle donnée permet de retrouver une case : 40 % de 120, c'est $0{,}4 \\times 120$.",
        "Pour comparer deux groupes de tailles différentes, je compare des fréquences, jamais des effectifs.",
      ],
      exercices: [
        {
          enonce:
            "La chargée de communication du Comité paralympique prépare un bilan des médailles de la France aux Jeux de Paris 2024. Arrondis les pourcentages au dixième.\na) Quelle est la fréquence des médailles d'or parmi toutes les médailles françaises ?\nb) Parmi les médailles des Jeux olympiques (JO) ?\nc) Parmi les médailles des Jeux paralympiques ?\nd) Parmi les médailles d'or, quelle est la fréquence des médailles paralympiques ?\ne) Vrai ou faux : « Plus de la moitié des médailles d'or françaises de 2024 sont paralympiques. »",
          figure: croise(["", "JO", "Paralympiques", "Total"], [
            ["Or", 16, 19, 35],
            ["Argent", 26, 28, 54],
            ["Bronze", 22, 28, 50],
            ["Total", 64, 75, 139],
          ]),
          correction:
            "a) Toutes les médailles : la marge « Or » sur le total général. $35 \\div 139 \\approx 0{,}2518$, soit environ 25,2 %.\nb) La colonne « JO », 64 médailles : $16 \\div 64 = 0{,}25$, soit 25 %.\nc) La colonne « Paralympiques », 75 médailles : $19 \\div 75 \\approx 0{,}2533$, soit environ 25,3 %.\nd) Cette fois, la LIGNE « Or », 35 médailles : $19 \\div 35 \\approx 0{,}5429$, soit environ 54,3 %.\ne) Environ 54,3 % est plus que 50 % : vrai. 19 médailles d'or sur 35 sont paralympiques.\n⛔ Le piège au d) : diviser 19 par 75. « Parmi les médailles d'or » : le dénominateur est la marge de l'or, 35.\nRéponse : a) environ 25,2 % ; b) 25 % ; c) environ 25,3 % ; d) environ 54,3 % ; e) vrai.",
          micros: ["don_freq_marginale", "don_freq_conditionnelle", "don_freq_interpreter"],
        },
        {
          enonce:
            "Une conseillère bancaire étudie 400 clients de son agence (modèle). 30 % ont un crédit en cours. Parmi les clients qui ont un crédit, 40 % ont moins de 35 ans. Parmi ceux qui n'en ont pas, 25 % ont moins de 35 ans.\na) Dresse le tableau croisé crédit × âge, marges comprises.\nb) Parmi les clients de moins de 35 ans, quelle est la fréquence de ceux qui ont un crédit ? Arrondis au dixième de pour cent.",
          correction:
            "a) La marge d'abord : 30 % de 400, $0{,}3 \\times 400 = 120$ clients avec un crédit, et $400 - 120 = 280$ sans crédit.\nAvec un crédit, moins de 35 ans : 40 % de 120, $0{,}4 \\times 120 = 48$. Les autres : $120 - 48 = 72$.\nSans crédit, moins de 35 ans : 25 % de 280, $0{,}25 \\times 280 = 70$. Les autres : $280 - 70 = 210$.\nLes colonnes : moins de 35 ans $48 + 70 = 118$ ; 35 ans et plus $72 + 210 = 282$. Contrôle : $118 + 282 = 400$.\nb) « Parmi les moins de 35 ans » : la colonne, 118 clients. $48 \\div 118 \\approx 0{,}4068$, soit environ 40,7 %.\n⛔ Le piège au b) : répondre 40 %. 40 % est la part des jeunes PARMI les clients à crédit ; la question renverse la population de référence.\nRéponse : a) le tableau ci-dessous ; b) environ 40,7 %.",
          schema: ecranSeulement(
            croise(["", "Moins de 35 ans", "35 ans et plus", "Total"], [
              ["Crédit", 48, 72, 120],
              ["Pas de crédit", 70, 210, 280],
              ["Total", 118, 282, 400],
            ]),
          ),
          micros: ["don_freq_completer", "don_freq_conditionnelle"],
        },
        {
          enonce:
            "Le responsable de la collecte des déchets d'une ville relève les tonnes collectées en un mois (modèle), par type de déchet et par quartier. Arrondis au dixième de pour cent.\na) Quelle est la fréquence des ordures non triées parmi tous les déchets ?\nb) Parmi les déchets du Centre, quelle est la fréquence du verre ?\nc) Parmi le verre collecté, quelle est la part du quartier Nord ?\nd) Pour chaque quartier, calcule la part des déchets triés (verre et emballages). Quel quartier trie le mieux ?",
          figure: croise(["", "Nord", "Centre", "Sud", "Total"], [
            ["Verre", 40, 25, 35, 100],
            ["Emballages", 60, 45, 45, 150],
            ["Ordures", 200, 130, 170, 500],
            ["Total", 300, 200, 250, 750],
          ]),
          correction:
            "a) La marge « Ordures » sur le total : $500 \\div 750 \\approx 0{,}6667$, soit environ 66,7 %.\nb) La colonne « Centre », 200 tonnes : $25 \\div 200 = 0{,}125$, soit 12,5 %.\nc) La ligne « Verre », 100 tonnes : $40 \\div 100 = 0{,}4$, soit 40 %.\nd) Nord : $40 + 60 = 100$ tonnes triées, $100 \\div 300 \\approx 0{,}3333$, soit environ 33,3 %.\nCentre : $25 + 45 = 70$, $70 \\div 200 = 0{,}35$, soit 35 %.\nSud : $35 + 45 = 80$, $80 \\div 250 = 0{,}32$, soit 32 %.\nLe Centre trie le mieux, alors qu'il trie le moins de tonnes.\n⛔ Le piège au d) : choisir le Nord, qui trie le plus de tonnes (100). Il produit aussi le plus de déchets : je compare des fréquences.\nRéponse : a) environ 66,7 % ; b) 12,5 % ; c) 40 % ; d) le Centre, 35 %.",
          micros: ["don_freq_marginale", "don_freq_conditionnelle"],
        },
        {
          enonce:
            "Une économiste étudie 1000 salariés d'une région (modèle, proche des ordres de grandeur publiés par l'INSEE). Un magazine titre : « Plus des trois quarts des femmes travaillent à temps partiel. » Arrondis au dixième de pour cent.\na) Parmi les salariés à temps partiel, quelle est la fréquence des femmes ?\nb) Parmi les femmes, quelle est la fréquence du temps partiel ?\nc) Parmi les hommes ?\nd) Le titre du magazine est-il juste ? Réécris-le pour qu'il le soit.",
          figure: croise(["", "Temps partiel", "Temps complet", "Total"], [
            ["Femmes", 130, 350, 480],
            ["Hommes", 40, 480, 520],
            ["Total", 170, 830, 1000],
          ]),
          correction:
            "a) La colonne « Temps partiel », 170 salariés : $130 \\div 170 \\approx 0{,}7647$, soit environ 76,5 %.\nb) La ligne « Femmes », 480 salariées : $130 \\div 480 \\approx 0{,}2708$, soit environ 27,1 %.\nc) La ligne « Hommes », 520 salariés : $40 \\div 520 \\approx 0{,}0769$, soit environ 7,7 %.\nd) Non. « Plus des trois quarts » vaut pour les temps partiels, pas pour les femmes. Le titre juste : « Plus des trois quarts des salariés à temps partiel sont des femmes. »\n⭐ Et une femme sur quatre environ travaille à temps partiel, contre moins d'un homme sur dix.\n⛔ Le piège : inverser la population de référence. Le magazine a pris la fréquence du a) pour celle du b).\nRéponse : a) environ 76,5 % ; b) environ 27,1 % ; c) environ 7,7 % ; d) non.",
          micros: ["don_freq_interpreter", "don_freq_conditionnelle"],
        },
        {
          enonce:
            "Un concepteur de jeux de société étudie le jeu de 52 cartes : 4 couleurs (cœur, carreau, trèfle, pique) de 13 cartes, dont 3 figures (roi, dame, valet) par couleur. Arrondis au dixième de pour cent.\na) Parmi les cœurs, quelle est la fréquence des figures ?\nb) Parmi les figures, quelle est la fréquence des cœurs ?\nc) Quelle est la fréquence des figures dans tout le jeu ?\nd) Compare a) et c). Que remarques-tu ?",
          correction:
            "Je range le jeu dans un tableau croisé : 4 lignes (les couleurs), 2 colonnes (figure ou non). Chaque ligne : 3 figures, 10 autres cartes, 13 en tout.\na) La ligne « Cœur », 13 cartes : $3 \\div 13 \\approx 0{,}2308$, soit environ 23,1 %.\nb) La colonne « Figure », $4 \\times 3 = 12$ cartes : $3 \\div 12 = 0{,}25$, soit 25 %.\nc) $12 \\div 52 \\approx 0{,}2308$, soit environ 23,1 %.\nd) Les deux fréquences sont égales : $\\dfrac{3}{13} = \\dfrac{12}{52}$. Savoir que la carte est un cœur ne change pas la part des figures.\n⛔ Le piège au b) : diviser par 52. « Parmi les figures » : le dénominateur est 12.\nRéponse : a) environ 23,1 % ; b) 25 % ; c) environ 23,1 % ; d) elles sont égales.",
          schema: ecranSeulement(
            croise(["", "Figure", "Autre carte", "Total"], [
              ["Cœur", 3, 10, 13],
              ["Carreau", 3, 10, 13],
              ["Trèfle", 3, 10, 13],
              ["Pique", 3, 10, 13],
              ["Total", 12, 40, 52],
            ]),
          ),
          micros: ["don_freq_conditionnelle", "don_freq_marginale"],
        },
        {
          enonce:
            "Une chargée de recrutement a reçu 600 candidatures (modèle). 40 % sont arrivées par le site de l'entreprise, les autres par un autre canal. Parmi les candidatures du site, 10 % ont été retenues ; parmi les autres, 5 %.\na) Complète le tableau.\nb) Quelle est la fréquence des candidatures retenues, parmi toutes les candidatures ?\nc) Parmi les candidatures retenues, quelle est la part du site ? Arrondis au dixième de pour cent.",
          figure: croise(["", "Retenue", "Non retenue", "Total"], [
            ["Site", "?", "?", "?"],
            ["Autre canal", "?", "?", "?"],
            ["Total", "?", "?", 600],
          ]),
          correction:
            "a) La marge d'abord : 40 % de 600, $0{,}4 \\times 600 = 240$ candidatures du site, et $600 - 240 = 360$ par un autre canal.\nSite retenues : 10 % de 240, $0{,}1 \\times 240 = 24$ ; non retenues $240 - 24 = 216$.\nAutre canal retenues : 5 % de 360, $0{,}05 \\times 360 = 18$ ; non retenues $360 - 18 = 342$.\nLes colonnes : retenues $24 + 18 = 42$ ; non retenues $216 + 342 = 558$. Contrôle : $42 + 558 = 600$.\nb) $42 \\div 600 = 0{,}07$, soit 7 %.\nc) La colonne « Retenue », 42 : $24 \\div 42 \\approx 0{,}5714$, soit environ 57,1 %.\n⛔ Le piège au c) : répondre 40 %, la part du site parmi TOUTES les candidatures. Parmi les retenues, le site pèse plus.\nRéponse : a) 240, 24, 216, 360, 18, 342, 42, 558 ; b) 7 % ; c) environ 57,1 %.",
          schema: ecranSeulement(
            croise(["", "Retenue", "Non retenue", "Total"], [
              ["Site", 24, 216, 240],
              ["Autre canal", 18, 342, 360],
              ["Total", 42, 558, 600],
            ]),
          ),
          micros: ["don_freq_completer", "don_freq_conditionnelle", "don_freq_marginale"],
        },
        {
          enonce:
            "Une agronome étudie 200 parcelles de vigne (modèle) : traitées ou non contre une maladie, malades ou saines. Une coopérative affirme : « 60 % des parcelles malades avaient été traitées : le traitement ne sert à rien. »\na) Vérifie le pourcentage de la coopérative.\nb) Parmi les parcelles traitées, quelle est la fréquence des parcelles malades ? Parmi les non traitées ?\nc) Le raisonnement de la coopérative est-il juste ?",
          figure: croise(["", "Malade", "Saine", "Total"], [
            ["Traitée", 30, 120, 150],
            ["Non traitée", 20, 30, 50],
            ["Total", 50, 150, 200],
          ]),
          correction:
            "a) « Parmi les parcelles malades » : la colonne, 50 parcelles. $30 \\div 50 = 0{,}6$, soit 60 %. Le pourcentage est juste.\nb) Ligne « Traitée », 150 : $30 \\div 150 = 0{,}2$, soit 20 %.\nLigne « Non traitée », 50 : $20 \\div 50 = 0{,}4$, soit 40 %.\nc) Non. Une parcelle traitée tombe malade deux fois moins souvent (20 % contre 40 %). Si les malades sont surtout des parcelles traitées, c'est que presque toutes les parcelles sont traitées : 150 sur 200.\n⛔ Le piège : juger un traitement « parmi les malades ». Pour comparer, je calcule la fréquence des malades DANS chaque groupe.\nRéponse : a) 60 %, juste ; b) 20 % et 40 % ; c) non, le traitement divise par deux la fréquence de la maladie.",
          micros: ["don_freq_interpreter", "don_freq_conditionnelle"],
        },
        {
          enonce:
            "La directrice marketing d'une chaîne d'hôtels reçoit ce tableau, écrit EN POURCENTAGES de tous les clients de l'année (modèle).\na) Quelle est la fréquence des clients étrangers ?\nb) Parmi les clients en voyage d'affaires, quelle est la fréquence des étrangers ?\nc) Parmi les clients étrangers, quelle est la fréquence des voyages d'affaires ? Arrondis au dixième de pour cent.\nd) La chaîne a reçu 12 500 clients. Combien de clients étrangers en voyage d'affaires ?",
          figure: croise(["", "Affaires", "Loisirs", "Total"], [
            ["France", 24, 41, 65],
            ["Étranger", 16, 19, 35],
            ["Total", 40, 60, 100],
          ]),
          correction:
            "Les nombres sont des pourcentages du total : le total général vaut 100.\na) La marge « Étranger » : 35 %.\nb) La colonne « Affaires », 40 : $16 \\div 40 = 0{,}4$, soit 40 %.\nc) La ligne « Étranger », 35 : $16 \\div 35 \\approx 0{,}4571$, soit environ 45,7 %.\nd) 16 % des clients : $0{,}16 \\times 12\\,500 = 2000$ clients.\n⛔ Le piège au b) : répondre 16 %. 16 % est la part de tous les clients ; « parmi les clients d'affaires », je divise par leur marge.\nRéponse : a) 35 % ; b) 40 % ; c) environ 45,7 % ; d) 2000 clients.",
          micros: ["don_freq_conditionnelle", "don_freq_marginale"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une étude de gestion, plusieurs étapes. Je construis ou je lis le tableau, je calcule les fréquences utiles, puis je juge une affirmation.",
      rappel: [
        "Je traduis chaque pourcentage de l'énoncé : marge (« 40 % des adhérents ») ou case (« parmi les …, 45 % »).",
        "Avant de juger une phrase, je cherche son groupe de référence : ce qui suit « des » ou « parmi ».",
        "Je contrôle toujours le tableau par le total général, dans les deux sens.",
      ],
      exercices: [
        {
          titre: "La mutuelle et la téléconsultation",
          enonce:
            "Un chargé d'études d'une mutuelle santé a interrogé 2500 adhérents (modèle). 40 % ont moins de 40 ans. Parmi les moins de 40 ans, 45 % ont déjà fait une téléconsultation ; parmi les 40 ans et plus, 20 %.\na) Dresse le tableau croisé âge × téléconsultation, marges comprises.\nb) Quelle est la fréquence des adhérents qui ont déjà fait une téléconsultation ?\nc) Parmi ceux qui en ont fait une, quelle est la fréquence des moins de 40 ans ?\nd) Un article affirme : « 45 % des utilisateurs de la téléconsultation ont moins de 40 ans. » Corrige-le.",
          correction:
            "a) Moins de 40 ans : 40 % de 2500, $0{,}4 \\times 2500 = 1000$ ; 40 ans et plus : $2500 - 1000 = 1500$.\nMoins de 40 ans, téléconsultation : 45 % de 1000, $0{,}45 \\times 1000 = 450$ ; jamais : $1000 - 450 = 550$.\n40 ans et plus, téléconsultation : 20 % de 1500, $0{,}2 \\times 1500 = 300$ ; jamais : $1500 - 300 = 1200$.\nLes colonnes : téléconsultation $450 + 300 = 750$ ; jamais $550 + 1200 = 1750$. Contrôle : $750 + 1750 = 2500$.\nb) $750 \\div 2500 = 0{,}3$, soit 30 %.\nc) La colonne « Téléconsultation », 750 : $450 \\div 750 = 0{,}6$, soit 60 %.\nd) 45 % est la part des utilisateurs PARMI les moins de 40 ans. La phrase juste : « 45 % des moins de 40 ans ont déjà fait une téléconsultation », ou bien « 60 % des utilisateurs ont moins de 40 ans ».\n⛔ Le piège au d) : recopier le pourcentage de l'énoncé sans regarder son groupe de référence.\nRéponse : a) le tableau ci-dessous ; b) 30 % ; c) 60 % ; d) 60 % des utilisateurs ont moins de 40 ans.",
          schema: ecranSeulement(
            croise(["", "Téléconsultation", "Jamais", "Total"], [
              ["Moins de 40 ans", 450, 550, 1000],
              ["40 ans et plus", 300, 1200, 1500],
              ["Total", 750, 1750, 2500],
            ]),
          ),
          micros: ["don_freq_completer", "don_freq_marginale", "don_freq_conditionnelle", "don_freq_interpreter"],
        },
        {
          titre: "La concession automobile",
          enonce:
            "La directrice d'une concession automobile fait le bilan des 600 voitures neuves vendues en 2025 (modèle), par motorisation et par type de client. Arrondis au dixième de pour cent.\na) Quelle est la fréquence des voitures électriques parmi toutes les ventes ?\nb) Parmi les ventes aux entreprises, quelle est la fréquence des électriques ?\nc) Parmi les ventes aux particuliers ?\nd) Parmi les voitures électriques, quelle est la fréquence des ventes aux entreprises ?\ne) Vrai ou faux : « Plus de la moitié des voitures électriques sont achetées par des entreprises. »",
          figure: croise(["", "Particulier", "Entreprise", "Total"], [
            ["Thermique", 210, 90, 300],
            ["Hybride", 120, 30, 150],
            ["Électrique", 70, 80, 150],
            ["Total", 400, 200, 600],
          ]),
          correction:
            "a) La marge « Électrique » sur le total : $150 \\div 600 = 0{,}25$, soit 25 %.\nb) La colonne « Entreprise », 200 : $80 \\div 200 = 0{,}4$, soit 40 %.\nc) La colonne « Particulier », 400 : $70 \\div 400 = 0{,}175$, soit 17,5 %.\nd) La ligne « Électrique », 150 : $80 \\div 150 \\approx 0{,}5333$, soit environ 53,3 %.\ne) Environ 53,3 % est plus que 50 % : vrai.\n⭐ Les entreprises n'achètent qu'un tiers des voitures ($200 \\div 600$), mais plus de la moitié des électriques.\n⛔ Le piège au e) : se servir du b), 40 %. La phrase parle des voitures électriques : sa population de référence est la ligne « Électrique ».\nRéponse : a) 25 % ; b) 40 % ; c) 17,5 % ; d) environ 53,3 % ; e) vrai.",
          micros: ["don_freq_marginale", "don_freq_conditionnelle", "don_freq_interpreter"],
        },
        {
          titre: "Les week-ends de 2026",
          enonce:
            "La planificatrice d'un parc de loisirs prépare l'année 2026. Les quatre trimestres comptent 90, 91, 92 et 92 jours, et chacun compte exactement 26 jours de week-end (samedis et dimanches). Arrondis au dixième de pour cent.\na) Dresse le tableau croisé trimestre × type de jour, marges comprises.\nb) Parmi les jours du 1er trimestre, quelle est la fréquence des jours de week-end ? Parmi ceux du 3e trimestre ?\nc) Parmi les jours de week-end de l'année, quelle est la part du 1er trimestre ?\nd) Quelle est la fréquence des jours de week-end sur toute l'année ?",
          correction:
            "a) Pour chaque trimestre, les jours de semaine : $90 - 26 = 64$ ; $91 - 26 = 65$ ; $92 - 26 = 66$ ; $92 - 26 = 66$.\nLes marges : $26 \\times 4 = 104$ jours de week-end, $64 + 65 + 66 + 66 = 261$ jours de semaine, et $104 + 261 = 365$ jours.\nb) 1er trimestre : $26 \\div 90 \\approx 0{,}2889$, soit environ 28,9 %. 3e trimestre : $26 \\div 92 \\approx 0{,}2826$, soit environ 28,3 %.\nc) La colonne « Week-end », 104 : $26 \\div 104 = 0{,}25$, soit 25 %.\nd) $104 \\div 365 \\approx 0{,}2849$, soit environ 28,5 %.\n⭐ Même effectif, 26, et pourtant des fréquences différentes : le dénominateur change d'un trimestre à l'autre.\n⛔ Le piège au c) : diviser 26 par 90. « Parmi les jours de week-end » : le dénominateur est la marge des week-ends, 104.\nRéponse : a) le tableau ci-dessous ; b) environ 28,9 % et 28,3 % ; c) 25 % ; d) environ 28,5 %.",
          schema: ecranSeulement(
            croise(["", "Semaine", "Week-end", "Total"], [
              ["1er trimestre", 64, 26, 90],
              ["2e trimestre", 65, 26, 91],
              ["3e trimestre", 66, 26, 92],
              ["4e trimestre", 66, 26, 92],
              ["Total", 261, 104, 365],
            ]),
          ),
          micros: ["don_freq_marginale", "don_freq_conditionnelle"],
        },
        {
          titre: "Le plan de mobilité",
          enonce:
            "Le responsable RSE d'une entreprise prépare son plan de mobilité. Il a interrogé les 400 salariés de ses deux sites (modèle) sur leur façon de venir travailler.\na) Quelle est la fréquence de la voiture seule parmi tous les salariés ?\nb) Parmi les salariés du site A ? Parmi ceux du site B ?\nc) L'objectif : au plus 40 % de voiture seule sur chaque site. Combien de salariés du site A doivent passer au covoiturage, au moins ?\nd) Une fois l'objectif atteint au site A, quelle sera la fréquence de la voiture seule parmi tous les salariés ?",
          figure: croise(["", "Voiture seule", "Covoiturage", "Bus, vélo", "Total"], [
            ["Site A", 120, 30, 50, 200],
            ["Site B", 60, 20, 120, 200],
            ["Total", 180, 50, 170, 400],
          ]),
          correction:
            "a) La marge « Voiture seule » : $180 \\div 400 = 0{,}45$, soit 45 %.\nb) Site A, 200 salariés : $120 \\div 200 = 0{,}6$, soit 60 %. Site B : $60 \\div 200 = 0{,}3$, soit 30 %.\nc) Le site B atteint déjà l'objectif. Au site A : 40 % de 200, $0{,}4 \\times 200 = 80$ salariés au plus en voiture seule.\n$120 - 80 = 40$ salariés doivent passer au covoiturage.\nd) Voiture seule : $180 - 40 = 140$ salariés. $140 \\div 400 = 0{,}35$, soit 35 %.\n⛔ Le piège au c) : viser 40 % de 400, soit 160, et croire qu'il suffit de 20 changements. L'objectif est fixé PAR SITE : la population de référence est le site A, 200 salariés.\nRéponse : a) 45 % ; b) 60 % et 30 % ; c) 40 salariés ; d) 35 %.",
          micros: ["don_freq_conditionnelle", "don_freq_marginale", "don_freq_completer"],
        },
      ],
    },
  ],
};
