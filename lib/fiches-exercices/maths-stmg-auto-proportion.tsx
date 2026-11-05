// ─── Fiche d'exercices : proportions et pourcentages (STMG) — 20 exercices ─────
//
// Feuille pilote du chantier des 76 feuilles STMG (05/11/2026). Notion
// auto_proportion du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts` et son
// renfort `seconde/maths/evolutions-lycee-renfort.ts`) : c'est un AUTOMATISME,
// les nombres se calculent de tête ou presque (taux dans 5, 10, 20, 25, 50…).
// Le coach demande : la partie ÷ le tout, la population de référence (« parmi »),
// fraction, décimal et pourcentage, appliquer un taux, retrouver le tout, et la
// proportion d'une proportion (on MULTIPLIE). Rien de plus.
//
// ⭐ LA SEULE DONNÉE RÉELLE, sourcée :
//   · ex. 15 — environ 2,5 % de l'eau de la Terre est de l'eau douce, et environ
//     70 % de cette eau douce est sous forme de glace (UNESCO, Rapport mondial
//     sur la mise en valeur des ressources en eau ; Shiklomanov : 2,5 % et 68,7 %).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : judo, hôpital (infirmiers), cuisine (chef), musique
// (disquaire), cantine, théâtre ; deux calculs nus (ex. 5 et 7) ; pharmacie
// (pharmacienne), bibliothèque (bibliothécaire), menuiserie (artisan), énergie
// (conseillère en rénovation), ressources humaines (RH), agriculture
// (agricultrice), climat (hydrologue), basket (coach), festival (régisseur),
// marathon (organisatrice), grande surface (responsable), budget d'une commune
// (journaliste).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-auto-proportion.mjs`.
//
// Micro-compétences : auto_prop_calculer (1, 2, 9, 10, 16, 18), auto_prop_formes
// (3, 4, 5, 10), auto_prop_appliquer (6, 7, 11, 12, 17, 19), auto_prop_de_proportion
// (8, 13, 14, 15, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres } from "@/lib/fiches-exercices/figures-donnees";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesAutoProportionStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-proportion",
  titre: "Proportions et pourcentages",
  accroche:
    "Vingt exercices pour que les pourcentages deviennent un réflexe : calculer une proportion, passer d'une fraction à un décimal et à un pourcentage, appliquer un taux à une quantité, retrouver le tout, et prendre la proportion d'une proportion. Un hôpital, une cantine, une facture avec TVA, un marathon, un festival, le budget d'une commune, et l'eau douce de la planète. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer une proportion, changer d'écriture, ou appliquer un pourcentage.",
      rappel: [
        "Une proportion, c'est la partie divisée par le tout : partie ÷ tout.",
        "Trois écritures pour le même nombre : 1/4 = 0,25 = 25 %.",
        "t % d'une quantité : on multiplie la quantité par t ÷ 100. Exemple : 20 % de 50, c'est 0,2 × 50 = 10.",
        "La proportion d'une proportion : on multiplie les deux.",
      ],
      exercices: [
        {
          enonce:
            "Un club de judo compte 40 licenciés, dont 10 ceintures noires. Quelle proportion des licenciés est ceinture noire ? Donne-la en pourcentage.",
          reponses: [{ attendu: "25 %" }],
          correction:
            "Une proportion, c'est la partie divisée par le tout.\nLa partie : 10 ceintures noires. Le tout : 40 licenciés.\n$10 \\div 40 = 0{,}25$, soit 25 %.\n⛔ Le piège : diviser le tout par la partie ($40 \\div 10 = 4$). Une proportion ne dépasse jamais 1.\nRéponse : 25 %.",
          micros: ["auto_prop_calculer"],
        },
        {
          enonce:
            "Le diagramme donne le nombre d'infirmiers d'un service d'hôpital, de nuit et de jour. Quelle proportion des infirmiers travaille de nuit ? Donne-la en pourcentage.",
          figure: barres([
            { label: "Nuit", value: 8 },
            { label: "Jour", value: 32 },
          ], { pas: 8, unite: "infirmiers" }),
          reponses: [{ attendu: "20 %" }],
          correction:
            "On lit le diagramme : 8 de nuit et 32 de jour.\nLe tout, c'est l'ensemble des infirmiers : $8 + 32 = 40$.\n$8 \\div 40 = 0{,}2$, soit 20 %.\n⛔ Le piège : diviser 8 par 32. Le 32 n'est pas le tout, c'est seulement l'équipe de jour.\nRéponse : 20 %.",
          micros: ["auto_prop_calculer"],
        },
        {
          enonce:
            "Dans une recette, le chef met les $\\dfrac{3}{4}$ du beurre dans la pâte.\na) Écris $\\dfrac{3}{4}$ sous forme décimale.\nb) Écris $\\dfrac{3}{4}$ en pourcentage.",
          reponses: [
            { question: "a)", attendu: "0,75", exact: true },
            { question: "b)", attendu: "75 %", exact: true },
          ],
          correction:
            "a) Une fraction est une division : $3 \\div 4 = 0{,}75$.\nb) Pour passer en pourcentage, on multiplie par 100 : $0{,}75 \\times 100 = 75$, soit 75 %.\n⛔ Le piège : écrire « 0,75 % ». 0,75 et 75 % sont égaux, 0,75 % est cent fois plus petit.\nRéponse : a) 0,75 ; b) 75 %.",
          micros: ["auto_prop_formes"],
        },
        {
          enonce:
            "Chez un disquaire, 8 % des ventes sont des vinyles. Écris 8 % sous forme décimale.",
          reponses: [{ attendu: "0,08", exact: true }],
          correction:
            "t % veut dire t ÷ 100.\n$8 \\div 100 = 0{,}08$ : la virgule recule de deux rangs.\n⛔ Le piège : écrire 0,8. Or 0,8, c'est 80 %.\nRéponse : 0,08.",
          micros: ["auto_prop_formes"],
        },
        {
          enonce:
            "Complète en pourcentage.\na) 0,4 = … %\nb) $\\dfrac{1}{8}$ = … %\nc) 1,5 = … %",
          reponses: [
            { question: "a)", attendu: "40 %", exact: true },
            { question: "b)", attendu: "12,5 %", exact: true },
            { question: "c)", attendu: "150 %", exact: true },
          ],
          correction:
            "Écriture décimale × 100 = pourcentage.\na) $0{,}4 \\times 100 = 40$, soit 40 %.\nb) $1 \\div 8 = 0{,}125$ et $0{,}125 \\times 100 = 12{,}5$, soit 12,5 %.\nc) $1{,}5 \\times 100 = 150$, soit 150 %.\n⛔ Le piège au a) : lire 0,4 comme 4 %. Multiplier par 100, c'est décaler la virgule de DEUX rangs : 0,40 devient 40.\nRéponse : a) 40 % ; b) 12,5 % ; c) 150 %.",
          micros: ["auto_prop_formes"],
        },
        {
          enonce:
            "Une cantine prépare 240 repas. 25 % sont végétariens. Combien de repas végétariens la cantine prépare-t-elle ?",
          reponses: [{ attendu: "60" }],
          correction:
            "Le tout est connu : 240 repas. On cherche la partie.\n25 %, c'est 0,25 : $240 \\times 0{,}25 = 60$.\nOn peut aussi le faire de tête : 25 %, c'est le quart, et $240 \\div 4 = 60$.\n⛔ Le piège : calculer $240 - 25 = 215$. Un pourcentage ne se soustrait pas à une quantité.\nRéponse : 60 repas.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce:
            "Calcule de tête.\na) 10 % de 300\nb) 50 % de 90\nc) 20 % de 1 200",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: "240" },
          ],
          correction:
            "a) 10 %, c'est le dixième : $300 \\div 10 = 30$.\nb) 50 %, c'est la moitié : $90 \\div 2 = 45$.\nc) 20 %, c'est deux fois 10 % : $1\\,200 \\div 10 = 120$, puis $120 \\times 2 = 240$.\n⛔ Le piège au c) : prendre seulement 10 % (120) ou multiplier par 20 sans diviser par 100.\nRéponse : a) 30 ; b) 45 ; c) 240.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce:
            "Dans un théâtre, 50 % des places sont à l'orchestre. Parmi les places d'orchestre, 20 % sont réservées aux groupes. Quelle proportion de l'ensemble des places cela représente-t-il ? Donne-la en pourcentage.",
          reponses: [{ attendu: "10 %" }],
          correction:
            "« 20 % de 50 % » : c'est une proportion d'une proportion, on multiplie.\n$0{,}5 \\times 0{,}2 = 0{,}1$, soit 10 %.\n⛔ Le piège : additionner ($50 + 20 = 70$). Les places de groupe sont une PARTIE de l'orchestre : elles ne peuvent pas être plus nombreuses que lui.\nRéponse : 10 %.",
          micros: ["auto_prop_de_proportion"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : repérer le tout et la partie avant de calculer.",
      rappel: [
        "Le mot « parmi » désigne le tout : « parmi les moins de 30 ans », c'est par eux qu'on divise.",
        "Retrouver le tout : si 40 % du tout vaut 30, alors le tout vaut 30 ÷ 0,4 = 75.",
        "Comparer deux groupes de tailles différentes : on compare leurs proportions, pas leurs effectifs.",
      ],
      exercices: [
        {
          enonce:
            "Une pharmacienne fait le point sur 200 clients venus en novembre (modèle). 80 ont moins de 30 ans. Parmi ces moins de 30 ans, 20 se sont fait vacciner.\na) Quelle proportion des clients a moins de 30 ans ?\nb) Quelle proportion des moins de 30 ans s'est fait vacciner ?",
          reponses: [
            { question: "a)", attendu: "40 %" },
            { question: "b)", attendu: "25 %" },
          ],
          correction:
            "a) Le tout : les 200 clients. $80 \\div 200 = 0{,}4$, soit 40 %.\nb) Le mot « parmi » change le tout : on divise par les 80 moins de 30 ans. $20 \\div 80 = 0{,}25$, soit 25 %.\n⛔ Le piège au b) : diviser 20 par 200. Cela donne 10 %, la part des jeunes vaccinés dans TOUS les clients : ce n'est pas la question.\nRéponse : a) 40 % ; b) 25 %.",
          micros: ["auto_prop_calculer"],
        },
        {
          enonce:
            "Un bibliothécaire compte les prêts d'une semaine (modèle). Le tableau donne le nombre de prêts par type de livre.\na) Combien de prêts y a-t-il en tout ?\nb) Quelle est la part des romans, sous forme décimale ?\nc) Quelle est la part des bandes dessinées, en pourcentage ?\nd) Quelle est la part des documentaires, en fraction irréductible ?",
          figure: grille(["Type", "Prêts"], [
            ["Romans", 120],
            ["Bandes dessinées", 60],
            ["Documentaires", 20],
          ]),
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: ["0,6", "0,60"], exact: true },
            { question: "c)", attendu: "30 %" },
            { question: "d)", attendu: "1/10", exact: true },
          ],
          correction:
            "a) Le tout : $120 + 60 + 20 = 200$ prêts.\nb) $120 \\div 200 = 0{,}6$.\nc) $60 \\div 200 = 0{,}3$, soit 30 %.\nd) $\\dfrac{20}{200} = \\dfrac{1}{10}$ : on simplifie par 20.\n⛔ Le piège : diviser par 120, le plus grand nombre du tableau. Le tout, c'est la somme des trois lignes.\nRéponse : a) 200 ; b) 0,6 ; c) 30 % ; d) 1/10.",
          micros: ["auto_prop_calculer", "auto_prop_formes"],
        },
        {
          enonce:
            "Un menuisier établit une facture de 350 € hors taxes. La TVA est de 20 % du montant hors taxes.\na) Calcule le montant de la TVA.\nb) Calcule le montant à payer, TVA comprise.\nc) Sur une autre facture, la TVA de 20 % vaut 50 €. Quel est le montant hors taxes ?",
          reponses: [
            { question: "a)", attendu: "70 €" },
            { question: "b)", attendu: "420 €" },
            { question: "c)", attendu: "250 €" },
          ],
          correction:
            "a) 20 % de 350 € : $350 \\times 0{,}2 = 70$ €.\nb) On ajoute la TVA au montant hors taxes : $350 + 70 = 420$ €.\nc) Cette fois, la partie est connue et on cherche le tout : $50 \\div 0{,}2 = 250$ €.\nVérification : $250 \\times 0{,}2 = 50$. ✔\n⛔ Le piège au a) : calculer $350 \\times 20 = 7\\,000$. On oublie de diviser le taux par 100, et une TVA de 7 000 € sur une facture de 350 € doit alerter.\nRéponse : a) 70 € ; b) 420 € ; c) 250 €.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce:
            "Une conseillère en rénovation étudie une maison qui consomme 12 000 kWh par an (modèle). Le chauffage représente 65 % de cette consommation.\na) Combien de kWh le chauffage consomme-t-il par an ?\nb) Combien de kWh reste-t-il pour le reste de la maison ?\nc) Quel pourcentage de la consommation ce reste représente-t-il ?",
          reponses: [
            { question: "a)", attendu: "7 800 kWh" },
            { question: "b)", attendu: "4 200 kWh" },
            { question: "c)", attendu: "35 %" },
          ],
          correction:
            "a) $12\\,000 \\times 0{,}65 = 7\\,800$ kWh.\nb) $12\\,000 - 7\\,800 = 4\\,200$ kWh.\nc) Le tout fait 100 % : $100 - 65 = 35$, soit 35 %.\nVérification : $12\\,000 \\times 0{,}35 = 4\\,200$. ✔\n⛔ Le piège au c) : refaire une division compliquée. Le reste d'un tout, c'est 100 % moins la partie.\nRéponse : a) 7 800 kWh ; b) 4 200 kWh ; c) 35 %.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce:
            "Une responsable RH lit le bilan social d'une entreprise de 600 salariés (modèle) : 40 % des salariés sont cadres, et parmi les cadres, 25 % télétravaillent.\na) Quelle proportion de l'ensemble des salariés est constituée de cadres qui télétravaillent ?\nb) Combien de salariés cela fait-il ?",
          reponses: [
            { question: "a)", attendu: "10 %" },
            { question: "b)", attendu: "60" },
          ],
          correction:
            "a) 25 % DES 40 % : on multiplie. $0{,}4 \\times 0{,}25 = 0{,}1$, soit 10 %.\nb) On applique ce résultat au tout : $600 \\times 0{,}1 = 60$ salariés.\nVérification par les effectifs : $600 \\times 0{,}4 = 240$ cadres, et $240 \\times 0{,}25 = 60$. ✔\n⛔ Le piège au a) : répondre 25 %. Ce nombre se rapporte aux cadres, pas à tous les salariés.\nRéponse : a) 10 % ; b) 60 salariés.",
          micros: ["auto_prop_de_proportion"],
        },
        {
          enonce:
            "Une agricultrice exploite 120 hectares (modèle). 60 % de ses terres sont en céréales, et la moitié de ces céréales est du blé.\na) Quelle proportion de l'exploitation est en blé ?\nb) Quelle surface de blé cela représente-t-il ?",
          reponses: [
            { question: "a)", attendu: "30 %" },
            { question: "b)", attendu: "36 ha" },
          ],
          correction:
            "a) La moitié, c'est 50 % ou 0,5. $0{,}6 \\times 0{,}5 = 0{,}3$, soit 30 %.\nb) $120 \\times 0{,}3 = 36$ hectares.\n⛔ Le piège au a) : additionner 60 % et 50 %, ce qui donne 110 %. Une partie d'un tout ne dépasse jamais 100 %.\nRéponse : a) 30 % ; b) 36 ha.",
          micros: ["auto_prop_de_proportion"],
        },
        {
          enonce:
            "Une hydrologue présente des ordres de grandeur : environ 2,5 % de l'eau de la Terre est de l'eau douce, et environ 70 % de cette eau douce est sous forme de glace.\nQuelle proportion de toute l'eau de la Terre est de l'eau douce sous forme de glace ? Donne le résultat en pourcentage.",
          reponses: [{ attendu: ["1,75 %", "environ 1,75 %"] }],
          correction:
            "C'est 70 % DE 2,5 % : on multiplie les écritures décimales.\n2,5 % s'écrit 0,025 et 70 % s'écrit 0,7.\n$0{,}025 \\times 0{,}7 = 0{,}0175$, soit 1,75 %.\n⛔ Le piège : écrire 2,5 % comme 0,25. La virgule recule de deux rangs : 2,5 ÷ 100 = 0,025.\nRéponse : environ 1,75 %.",
          micros: ["auto_prop_de_proportion"],
        },
        {
          enonce:
            "Un coach de basket compare ses deux meilleures joueuses. Inès a réussi 18 tirs sur 24. Maëlle a réussi 21 tirs sur 30.\na) Calcule le pourcentage de réussite d'Inès.\nb) Calcule le pourcentage de réussite de Maëlle.\nc) Qui est la plus adroite ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: "75 %" },
            { question: "b)", attendu: "70 %" },
            { question: "c)", attendu: "Inès" },
          ],
          correction:
            "a) $18 \\div 24 = 0{,}75$, soit 75 %.\nb) $21 \\div 30 = 0{,}7$, soit 70 %.\nc) 75 % est plus grand que 70 % : Inès est la plus adroite.\n⛔ Le piège au c) : choisir Maëlle parce que 21 est plus grand que 18. Elle a aussi tiré plus souvent : seules les proportions se comparent.\nRéponse : a) 75 % ; b) 70 % ; c) Inès.",
          micros: ["auto_prop_calculer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on cherche le tout de chaque calcul, on calcule, on vérifie.",
      rappel: [
        "Avant chaque calcul, on se demande : de quel tout parle-t-on ?",
        "Un pourcentage global n'est pas la moyenne de deux pourcentages quand les groupes n'ont pas la même taille : on repasse par les effectifs.",
        "Vérifier : les parties doivent redonner le tout.",
      ],
      exercices: [
        {
          titre: "Le train du festival",
          enonce:
            "Un régisseur de festival prépare l'accueil de 2 000 spectateurs (modèle). 40 % ont moins de 25 ans, et parmi eux, 30 % viennent en train.\na) Combien de spectateurs ont moins de 25 ans ?\nb) Combien de moins de 25 ans viennent en train ?\nc) Quelle proportion de l'ensemble des spectateurs cela représente-t-il ?\nd) Un train supplémentaire transporte 300 voyageurs. Suffit-il pour ces jeunes spectateurs ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "800" },
            { question: "b)", attendu: "240" },
            { question: "c)", attendu: "12 %" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $2\\,000 \\times 0{,}4 = 800$ spectateurs.\nb) Le tout est maintenant 800 : $800 \\times 0{,}3 = 240$ spectateurs.\nc) $240 \\div 2\\,000 = 0{,}12$, soit 12 %.\nVérification par le produit des proportions : $0{,}4 \\times 0{,}3 = 0{,}12$. ✔\nd) 240 est inférieur à 300 : le train suffit.\n⛔ Le piège au b) : calculer 30 % de 2 000. Le mot « parmi » dit que les 30 % portent sur les 800.\nRéponse : a) 800 ; b) 240 ; c) 12 % ; d) oui.",
          micros: ["auto_prop_appliquer", "auto_prop_de_proportion"],
        },
        {
          titre: "Le marathon",
          enonce:
            "L'organisatrice d'un marathon compte 5 000 inscrits (modèle) : 30 % de femmes, le reste d'hommes. 80 % des femmes et 90 % des hommes ont franchi la ligne d'arrivée.\na) Combien de femmes et combien d'hommes sont inscrits ? Donne les deux nombres dans cet ordre.\nb) Combien de femmes et combien d'hommes sont arrivés ? Donne les deux nombres dans cet ordre.\nc) Quel pourcentage de tous les inscrits a franchi la ligne ?",
          reponses: [
            { question: "a)", attendu: "1 500 ; 3 500", ordre: true },
            { question: "b)", attendu: "1 200 ; 3 150", ordre: true },
            { question: "c)", attendu: "87 %" },
          ],
          correction:
            "a) $5\\,000 \\times 0{,}3 = 1\\,500$ femmes, et $5\\,000 - 1\\,500 = 3\\,500$ hommes.\nb) $1\\,500 \\times 0{,}8 = 1\\,200$ femmes, et $3\\,500 \\times 0{,}9 = 3\\,150$ hommes.\nc) En tout, $1\\,200 + 3\\,150 = 4\\,350$ arrivants. $4\\,350 \\div 5\\,000 = 0{,}87$, soit 87 %.\n⛔ Le piège au c) : faire la moyenne de 80 % et 90 %, soit 85 %. Les hommes sont plus nombreux, ils pèsent plus lourd : on repasse par les effectifs.\nRéponse : a) 1 500 ; 3 500 ; b) 1 200 ; 3 150 ; c) 87 %.",
          micros: ["auto_prop_calculer", "auto_prop_de_proportion"],
        },
        {
          titre: "Les invendus du magasin",
          enonce:
            "Un magasin reçoit 1 200 produits frais dans la semaine (modèle). 15 % restent invendus. Parmi les invendus, 50 % sont donnés à une association, 30 % sont compostés, et le reste est jeté.\na) Combien de produits restent invendus ?\nb) Combien sont donnés ? compostés ? jetés ? Donne les trois nombres dans cet ordre.\nc) Quelle proportion des 1 200 produits est donnée ?\nd) Le responsable vise moins de 5 % de produits jetés sur l'ensemble. Quelle est cette proportion cette semaine ?",
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: "90 ; 54 ; 36", ordre: true },
            { question: "c)", attendu: "7,5 %" },
            { question: "d)", attendu: "3 %" },
          ],
          correction:
            "a) $1\\,200 \\times 0{,}15 = 180$ invendus.\nb) Le tout est maintenant 180. Donnés : $180 \\times 0{,}5 = 90$. Compostés : $180 \\times 0{,}3 = 54$. Jetés : $180 - 90 - 54 = 36$.\nc) $90 \\div 1\\,200 = 0{,}075$, soit 7,5 %.\nd) $36 \\div 1\\,200 = 0{,}03$, soit 3 % : l'objectif est atteint, car 3 % est moins que 5 %.\n⛔ Le piège au d) : répondre 20 %, la part des jetés parmi les invendus ($100 - 50 - 30$). La question porte sur les 1 200 produits.\nRéponse : a) 180 ; b) 90 ; 54 ; 36 ; c) 7,5 % ; d) 3 %.",
          micros: ["auto_prop_appliquer", "auto_prop_de_proportion"],
        },
        {
          titre: "La phrase du journal",
          enonce:
            "Une commune a un budget de 2 500 000 € (modèle). 40 % vont aux écoles, et parmi les dépenses des écoles, 25 % vont à la cantine. Une journaliste écrit : « la cantine pèse 65 % du budget ».\na) Combien d'euros vont aux écoles ?\nb) Combien d'euros vont à la cantine ?\nc) Quelle part du budget la cantine représente-t-elle ?\nd) La phrase de la journaliste est-elle vraie ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "1 000 000 €" },
            { question: "b)", attendu: "250 000 €" },
            { question: "c)", attendu: "10 %" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $2\\,500\\,000 \\times 0{,}4 = 1\\,000\\,000$ €.\nb) Le tout devient le budget des écoles : $1\\,000\\,000 \\times 0{,}25 = 250\\,000$ €.\nc) $0{,}4 \\times 0{,}25 = 0{,}1$, soit 10 %.\nVérification : $250\\,000 \\div 2\\,500\\,000 = 0{,}1$. ✔\nd) C'est faux : elle a additionné $40 + 25 = 65$, alors qu'il fallait multiplier.\n⛔ Le piège : additionner deux pourcentages qui ne se rapportent pas au même tout. 25 % porte sur les écoles, 40 % sur le budget.\nRéponse : a) 1 000 000 € ; b) 250 000 € ; c) 10 % ; d) faux.",
          micros: ["auto_prop_de_proportion"],
        },
      ],
    },
  ],
};
