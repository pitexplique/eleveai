// ─── Fiche d'exercices : tableur, recopier et exploiter (STMG) — 20 exercices ───
//
// Notion tableur_recopie du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// prédire une formule recopiée (relatif, absolu, mixte), figer le taux rangé dans une
// seule cellule, lire une colonne (premier dépassement, nombre de dépassements),
// choisir la représentation (circulaire : parts d'un tout ; courbe : évolution ;
// barres : comparaison), et critiquer un diagramme mal choisi.
//
// ⛔ LE $ DANS LES PHRASES. `TexteMath` coupe sur chaque $ : les références absolues
// passent par `abs()` (voir `stmg-algo-tableur-outils.tsx`) ; dans le dessin `feuille`,
// texte nu, elles s'écrivent telles quelles.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : feuilles nues et exemples courts (ex. 1 à 8) ; agence
// immobilière (agente), salle de sport (gérante), paie (gestionnaire RH), météo
// (météorologue), réseau social (chargée de communication), petite enfance
// (puéricultrice), journal (journaliste), cantine (intendante), boutique
// (commerçante), placement (conseillère), rugby (dirigeant de club), logement
// (thermicien).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs` (chaque
// recopie y est simulée en décalant ce qui n'est pas figé).
//
// Micro-compétences : tab_adressage (1, 2, 3, 4, 5, 9, 10, 11, 13, 16, 17, 18, 19,
// 20), tab_exploiter_colonne (6, 7, 12, 13, 17, 18, 19, 20), tab_choisir_representation
// (8, 14, 15, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { camembert } from "@/lib/fiches-exercices/figures-donnees";
import { abs, bas, BARRES, cellule, CIRCULAIRE, COURBE, feuille, formule, hausse, hausseParCellule, parTaux, produit } from "@/lib/fiches-exercices/stmg-algo-tableur-outils";

export const exercicesTableurRecopieStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "tableur-recopie",
  titre: "Tableur : recopier et exploiter",
  accroche:
    "Vingt exercices pour maîtriser la recopie : ce que devient une formule, quand figer une cellule avec des dollars, comment lire une colonne pour répondre à une question de seuil, et quel graphique choisir. Une agence immobilière, une fiche de paie, une semaine de chaleur, une cantine, un tournoi de rugby : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Prévoir une recopie, lire une colonne, ou choisir un graphique.",
      rappel: [
        "Une référence relative (B2) se décale à la recopie : vers le bas, B2 devient B3 ; vers la droite, B2 devient C2.",
        `Une référence absolue (${abs("$B$2")}) reste figée. Une référence mixte ne fige que ce qui suit le dollar : ${abs("F$4")} garde la ligne 4.`,
        "Lire une colonne : on la parcourt en entier, et on s'arrête à la première valeur qui franchit le seuil si c'est ce qu'on cherche.",
        "Parts d'un tout : diagramme circulaire. Évolution dans le temps : courbe. Comparaison de catégories : barres.",
      ],
      exercices: [
        {
          enonce: "La formule =B2*C2 est saisie en D2, puis recopiée vers le bas. Que contient D3 ?",
          reponses: [{ attendu: produit("B3", "C3"), exact: true }],
          correction:
            "Les deux références sont relatives : elles descendent toutes les deux d'une ligne.\nD3 contient =B3*C3.\n⛔ Le piège : répondre =B2*C2. Sans dollars, rien n'est figé.\nRéponse : =B3*C3.",
          micros: ["tab_adressage"],
        },
        {
          enonce: `La formule ${abs("=B2*$C$1")} est saisie en D2, puis recopiée vers le bas. Que contient D3 ?`,
          reponses: [{ attendu: produit("B3", "$C$1"), exact: true }],
          correction:
            `B2 est relative : elle devient B3.\n${abs("$C$1")} est absolue : elle ne bouge pas.\nD3 contient ${abs("=B3*$C$1")}.\n⛔ Le piège : écrire ${abs("=B3*$C$2")}. Les dollars figent la colonne ET la ligne.\nRéponse : ${abs("=B3*$C$1")}.`,
          micros: ["tab_adressage"],
        },
        {
          enonce: `La formule ${abs("=B3*C$1")} est saisie en D3, puis recopiée vers le bas jusqu'en D6. Que contient D6 ?`,
          reponses: [{ attendu: produit("B6", "C$1"), exact: true }],
          correction:
            `De D3 à D6, on descend de 3 lignes : B3 devient B6.\n${abs("C$1")} a sa ligne figée : elle reste en ligne 1.\nD6 contient ${abs("=B6*C$1")}.\n⛔ Le piège : écrire ${abs("=B4*C$1")}, en ne descendant que d'une ligne. On compte les lignes parcourues.\nRéponse : ${abs("=B6*C$1")}.`,
          micros: ["tab_adressage"],
        },
        {
          enonce: "La formule =B2+B3 est saisie en B4, puis recopiée vers la droite. Que contient C4 ?",
          reponses: [{ attendu: formule("=C2+C3", "=C3+C2"), exact: true }],
          correction:
            "Vers la droite, les lettres avancent et les numéros de ligne restent.\nB devient C : C4 contient =C2+C3.\n⛔ Le piège : écrire =B3+B4. C'est ce qu'on aurait en recopiant vers le bas.\nRéponse : =C2+C3.",
          micros: ["tab_adressage"],
        },
        {
          enonce: "La cellule D1 contient le taux de TVA, et la colonne B les prix hors taxes. Quelle formule saisir en C2 pour calculer la TVA, puis la recopier vers le bas ?",
          reponses: [{ attendu: parTaux("B2", "D", 1), exact: true }],
          correction:
            `Le prix change à chaque ligne : B2 reste relative.\nLe taux reste en D1 : on le fige. La formule est ${abs("=B2*$D$1")}.\n⛔ Le piège : écrire =B2*D1. Recopiée en C3, elle deviendrait =B3*D2, et D2 est vide : le résultat tomberait à 0.\nRéponse : ${abs("=B2*$D$1")}.`,
          micros: ["tab_adressage"],
        },
        {
          enonce: "La colonne B donne un capital, année après année (modèle). À partir de quelle année dépasse-t-il 1 500 € ?",
          figure: feuille([["Année", "Capital"], [0, 1000], [1, 1200], [2, 1440], [3, 1728], [4, 2074]]),
          reponses: [{ attendu: "3" }],
          correction:
            "On descend la colonne B : 1 000, 1 200, 1 440 sont sous 1 500.\nLa première valeur au-dessus est 1 728, en année 3.\n⛔ Le piège : répondre 5, le numéro de la ligne. La question demande l'année, en colonne A.\nRéponse : année 3.",
          micros: ["tab_exploiter_colonne"],
        },
        {
          enonce: "La colonne B donne un chiffre d'affaires mensuel, en k€ (modèle). Combien de mois ont dépassé l'objectif de 120 k€ ?",
          figure: feuille([["Mois", "CA (k€)"], ["Janvier", 80], ["Février", 140], ["Mars", 100], ["Avril", 180], ["Mai", 120], ["Juin", 160]]),
          reponses: [{ attendu: "3" }],
          correction:
            "La colonne monte et descend : on lit toutes les lignes.\nAu-dessus de 120 : 140, 180 et 160. Cela fait 3 mois.\n⛔ Le piège : compter mai. 120 atteint l'objectif, mais ne le dépasse pas.\nRéponse : 3.",
          micros: ["tab_exploiter_colonne"],
        },
        {
          enonce:
            "On veut représenter la répartition d'un budget entre quatre postes. Quelle représentation est la plus adaptée ? Réponds par la lettre.\nA : une courbe.\nB : un diagramme circulaire.\nC : un diagramme en barres.",
          reponses: [{ attendu: "B" }],
          correction:
            "Les quatre postes forment un tout, et on veut voir la part de chacun.\nLe diagramme circulaire montre des parts d'un tout.\n⛔ Le piège : choisir la courbe. Elle sert à une évolution dans le temps : il n'y en a pas ici.\nRéponse : B.",
          micros: ["tab_choisir_representation"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une feuille, une recopie : on se demande, pour chaque référence, si elle doit bouger.",
      rappel: [
        "Pour chaque référence, une question : à la ligne suivante, doit-elle changer ou non ? Si elle ne doit pas changer, on la fige.",
        "Une cellule vide vaut 0 dans un calcul.",
        `Avec ${abs("=$A3*C$2")} : vers la droite, seul le C avance ; vers le bas, seul le 3 augmente.`,
        "Un tableau donne les valeurs exactes, un graphique fait voir leur forme : on le choisit selon la question posée.",
      ],
      exercices: [
        {
          enonce:
            "La responsable d'une agence immobilière calcule la commission de ses agents. Le taux est en D1 (modèle).\na) Quelle formule saisir en C2 pour la recopier vers le bas ?\nb) Si on écrit =B2*D1 en C2, que contient C3 après la recopie ?\nc) Quelle valeur cette formule fausse affiche-t-elle en C3 ?\nd) Quelle valeur la bonne formule affiche-t-elle en C3 ?",
          figure: feuille([["Agent", "Vente", "Commission", 0.05], ["Rémi", 200000, "?"], ["Aya", 150000, "?"]]),
          reponses: [
            { question: "a)", attendu: parTaux("B2", "D", 1), exact: true },
            { question: "b)", attendu: produit("B3", "D2"), exact: true },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "7 500" },
          ],
          correction:
            `a) La vente change à chaque ligne, le taux non : ${abs("=B2*$D$1")}.\nb) Sans dollars, tout descend : =B3*D2.\nc) D2 est vide : elle vaut 0, et le résultat vaut 0.\nd) $150\\,000 \\times 0{,}05 = 7\\,500$.\n⛔ Le piège au a) : tout figer. Avec ${abs("=$B$2*$D$1")}, chaque agent aurait la commission de Rémi.\nRéponse : a) ${abs("=B2*$D$1")} ; b) =B3*D2 ; c) 0 ; d) 7 500.`,
          micros: ["tab_adressage"],
        },
        {
          enonce: `La gérante d'une salle de sport fait un tableau de prix (modèle) : le prix d'une séance en colonne A, le nombre de séances en ligne 1. En B2, elle écrit ${abs("=$A2*B$1")}.\na) Que contient C2 après une recopie vers la droite ?\nb) Que contient B3 après une recopie vers le bas ?\nc) Quelle valeur D3 affichera-t-elle ?`,
          figure: feuille([["", 2, 3, 4], [5, "?", "?", "?"], [6, "?", "?", "?"]]),
          reponses: [
            { question: "a)", attendu: produit("$A2", "C$1"), exact: true },
            { question: "b)", attendu: produit("$A3", "B$1"), exact: true },
            { question: "c)", attendu: "24" },
          ],
          correction:
            `a) Vers la droite : la colonne A reste figée, B devient C : ${abs("=$A2*C$1")}.\nb) Vers le bas : le 2 devient 3, et la ligne 1 reste : ${abs("=$A3*B$1")}.\nc) D3 contient ${abs("=$A3*D$1")} : $6 \\times 4 = 24$.\n⛔ Le piège : figer toute la cellule. Ici, chaque référence doit garder une seule moitié.\nRéponse : a) ${abs("=$A2*C$1")} ; b) ${abs("=$A3*B$1")} ; c) 24.`,
          micros: ["tab_adressage"],
        },
        {
          enonce:
            "Une gestionnaire RH calcule le salaire net avec un coefficient rangé en E1 (modèle).\na) Quelle formule saisir en C2 pour la recopier vers le bas ?\nb) Que contient C4 après la recopie ?\nc) Quelle valeur C2 affiche-t-elle ?\nd) Le coefficient change. Combien de cellules faut-il modifier ?",
          figure: feuille([["Salarié", "Brut", "Net", "", 0.78], ["Inès", 2000, "?"], ["Marc", 2500, "?"], ["Lou", 3000, "?"]]),
          reponses: [
            { question: "a)", attendu: parTaux("B2", "E", 1), exact: true },
            // b) suit le a) : une référence mixte juste au a) le reste ici.
            { question: "b)", attendu: parTaux("B4", "E", 1), exact: true },
            { question: "c)", attendu: "1 560" },
            { question: "d)", attendu: "1" },
          ],
          correction:
            `a) Le brut suit la ligne, le coefficient reste en E1 : ${abs("=B2*$E$1")}.\nb) De la ligne 2 à la ligne 4 : ${abs("=B4*$E$1")}.\nc) $2\\,000 \\times 0{,}78 = 1\\,560$.\nd) Une seule : E1. Toute la colonne suit. C'est l'intérêt de ranger le coefficient à part.\n⛔ Le piège au b) : garder B2. Seul le coefficient est figé.\nRéponse : a) ${abs("=B2*$E$1")} ; b) ${abs("=B4*$E$1")} ; c) 1 560 ; d) 1.`,
          micros: ["tab_adressage"],
        },
        {
          enonce:
            "Un météorologue relève les températures d'une semaine (modèle).\na) Combien de jours dépassent 30 degrés ?\nb) Quel est le premier jour qui dépasse 30 degrés ? Écris son nom.\nc) Dans quelle cellule se trouve la plus haute température ?",
          figure: feuille([["Jour", "Température"], ["Lundi", 25], ["Mardi", 28], ["Mercredi", 33], ["Jeudi", 31], ["Vendredi", 29], ["Samedi", 35], ["Dimanche", 27]]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: ["mercredi", "le mercredi"] },
            { question: "c)", attendu: cellule("B7"), exact: true },
          ],
          correction:
            "a) Au-dessus de 30 : 33, 31 et 35, soit 3 jours.\nb) En descendant, le premier est 33 : mercredi.\nc) Le maximum est 35, samedi. Il est dans la colonne B, à la ligne 7 : B7.\n⛔ Le piège au a) : s'arrêter au premier dépassement. Vendredi repasse sous 30, puis samedi remonte : il faut tout lire.\nRéponse : a) 3 ; b) mercredi ; c) B7.",
          micros: ["tab_exploiter_colonne"],
        },
        {
          enonce:
            "Une chargée de communication modélise un compte de 800 abonnés, qui gagne 50 % par an.\na) Quelle formule saisir en B3 pour la recopier vers le bas ?\nb) Quelle valeur contient B6 ?\nc) À partir de quelle année le compte dépasse-t-il 2 000 abonnés ?",
          figure: feuille([["Année", "Abonnés"], [0, 800], [1, "?"], [2, "?"], [3, "?"], [4, "?"]]),
          reponses: [
            { question: "a)", attendu: bas(hausse("B2", 50)), exact: true },
            { question: "b)", attendu: "4 050" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) La cellule du dessus, relative, multipliée par 1,5 : =B2*1,5. On peut aussi écrire =B2+B2*0,5.\nb) La colonne se remplit : 800, 1 200, 1 800, 2 700, 4 050.\nB6 est la ligne de l'année 4 : 4 050.\nc) 1 800 est sous 2 000, et 2 700 au-dessus : année 3.\n⛔ Le piège au a) : figer B2. Chaque ligne repart de celle d'au-dessus, pas de la première.\nRéponse : a) =B2*1,5 ; b) 4 050 ; c) 3.",
          micros: ["tab_adressage", "tab_exploiter_colonne"],
        },
        {
          enonce:
            "Une puéricultrice, un comptable et un commercial doivent choisir un graphique. Réponds par « courbe », « circulaire » ou « barres ».\na) Le poids d'un bébé, mois après mois.\nb) La part de chaque poste dans le budget d'une crèche.\nc) Les ventes de quatre vendeurs, l'année dernière.",
          reponses: [
            { question: "a)", attendu: COURBE },
            { question: "b)", attendu: CIRCULAIRE },
            { question: "c)", attendu: BARRES },
          ],
          correction:
            "a) Les mois se suivent, on regarde une évolution : courbe.\nb) Les postes forment un tout : circulaire.\nc) Les vendeurs sont des catégories à comparer : barres.\n⛔ Le piège au c) : choisir le circulaire. On ne cherche pas la part de chacun dans un tout, mais qui a vendu le plus.\nRéponse : a) courbe ; b) circulaire ; c) barres.",
          micros: ["tab_choisir_representation"],
        },
        {
          enonce:
            "Un journaliste représente le chiffre d'affaires annuel d'une entreprise par ce diagramme (modèle, en k€).\na) Pourquoi ce choix est-il inadapté ? Réponds par la lettre.\nA : un diagramme circulaire ne peut pas avoir cinq parts.\nB : les années ne forment pas un tout à partager, on veut voir une évolution.\nC : les valeurs sont trop grandes.\nb) Quelle représentation fallait-il choisir ? Écris son nom.",
          figure: camembert([
            { label: "2021", value: 300 },
            { label: "2022", value: 350 },
            { label: "2023", value: 420 },
            { label: "2024", value: 400 },
            { label: "2025", value: 530 },
          ]),
          reponses: [
            { question: "a)", attendu: "B" },
            // Des barres par année se défendent pour une évolution : acceptées, le corrigé dit pourquoi la courbe est meilleure.
            { question: "b)", attendu: [...COURBE, ...BARRES] },
          ],
          correction:
            "a) Un diagramme circulaire suppose un tout qui a du sens. La « part de 2023 » dans cinq années ne sert à rien.\nb) Une courbe montre d'un coup d'œil la hausse, et la petite baisse de 2024. Des barres par année conviennent aussi, mais la courbe fait mieux voir l'évolution.\n⛔ Le piège au a) : croire à une limite technique. C'est la nature des données qui ne convient pas.\nRéponse : a) B ; b) courbe.",
          micros: ["tab_choisir_representation"],
        },
        {
          enonce: `Une intendante de cantine a tout figé : en D2, elle a écrit ${abs("=$B$2*$C$2")} (modèle : quantité fois prix), puis a recopié vers le bas.\na) Que contient D3 ?\nb) Quelle valeur D3 affiche-t-elle ?\nc) Quelle valeur D3 aurait-elle dû afficher ?\nd) Quelle formule fallait-il écrire en D2 ?`,
          figure: feuille([["Produit", "Quantité", "Prix", "Total"], ["Yaourts", 40, 3, "?"], ["Fruits", 25, 4, "?"]]),
          reponses: [
            { question: "a)", attendu: produit("$B$2", "$C$2"), exact: true },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: bas(produit("B2", "C2")), exact: true },
          ],
          correction:
            `a) Tout est figé : la formule ne change pas. D3 contient ${abs("=$B$2*$C$2")}.\nb) Elle calcule encore les yaourts : $40 \\times 3 = 120$.\nc) Pour les fruits : $25 \\times 4 = 100$.\nd) Sans dollars : =B2*C2.\n⛔ Le piège : mettre des dollars « par sécurité ». Une référence qui doit suivre la ligne reste relative.\nRéponse : a) ${abs("=$B$2*$C$2")} ; b) 120 ; c) 100 ; d) =B2*C2.`,
          micros: ["tab_adressage"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une feuille complète : la formule à recopier, la colonne à exploiter, le graphique à choisir.",
      rappel: [
        "Écrire la formule une fois, bien figée, et la recopier : c'est tout l'intérêt du tableur.",
        "On calcule la colonne d'abord, puis on répond à la question de seuil en la lisant.",
        "Le graphique se choisit à la fin, selon ce qu'on veut montrer.",
      ],
      exercices: [
        {
          titre: "Les soldes de la boutique",
          enonce:
            "Une commerçante range en E1 le coefficient de ses soldes (modèle : 0,7, soit 30 % de baisse).\na) Quelle formule saisir en C2 pour la recopier vers le bas ?\nb) Combien d'articles restent à plus de 50 € après les soldes ?\nc) Quelle est la somme des prix soldés ?\nd) Pour comparer les prix des articles, quelle représentation choisir ? Écris courbe, circulaire ou barres.",
          figure: feuille([["Article", "Prix", "Soldé", "", 0.7], ["Veste", 50, "?"], ["Manteau", 120, "?"], ["Robe", 80, "?"], ["Jean", 60, "?"], ["Bottes", 90, "?"]]),
          reponses: [
            { question: "a)", attendu: parTaux("B2", "E", 1), exact: true },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "280 €" },
            { question: "d)", attendu: BARRES },
          ],
          correction:
            `a) Le prix suit la ligne, le coefficient reste en E1 : ${abs("=B2*$E$1")}.\nb) Les prix soldés : 35, 84, 56, 42, 63. Au-dessus de 50 : 84, 56 et 63, soit 3 articles.\nc) $35 + 84 + 56 + 42 + 63 = 280$ €.\nd) Des articles à comparer entre eux : barres.\n⛔ Le piège au b) : lire la colonne B, où 4 articles dépassent 50 €. La question porte sur les prix soldés.\nRéponse : a) ${abs("=B2*$E$1")} ; b) 3 ; c) 280 € ; d) barres.`,
          micros: ["tab_adressage", "tab_exploiter_colonne", "tab_choisir_representation"],
        },
        {
          titre: "Le placement",
          enonce:
            "Une conseillère suit un placement de 2 000 € en B2. Le taux est en D1 (modèle : 4 % par an). Chaque année part de la précédente.\na) Quelle formule saisir en B3 pour la recopier vers le bas ?\nb) Que contient B4 après la recopie ?\nc) À partir de quelle année le capital dépasse-t-il 2 300 € ?\nd) Pour montrer le capital année après année, quelle représentation choisir ? Écris courbe, circulaire ou barres.",
          figure: feuille([["Année", "Capital", "", 0.04], [0, 2000], [1, "?"], [2, "?"], [3, "?"], [4, "?"]]),
          reponses: [
            { question: "a)", attendu: hausseParCellule("B2", "D", 1), exact: true },
            { question: "b)", attendu: hausseParCellule("B3", "D", 1), exact: true },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: COURBE },
          ],
          correction:
            `a) Le capital de la ligne du dessus est relatif, le taux est figé : ${abs("=B2*(1+$D$1)")}.\nb) B2 devient B3, et le taux ne bouge pas : ${abs("=B3*(1+$D$1)")}.\nc) La colonne donne 2 080, puis 2 163,20, puis environ 2 249,73, puis environ 2 339,72. Le seuil de 2 300 est franchi en année 4.\nd) Les années se suivent : courbe.\n⛔ Le piège au a) : figer B2. Le capital serait toujours calculé sur 2 000 €, sans intérêts sur les intérêts.\nRéponse : a) ${abs("=B2*(1+$D$1)")} ; b) ${abs("=B3*(1+$D$1)")} ; c) 4 ; d) courbe.`,
          micros: ["tab_adressage", "tab_exploiter_colonne", "tab_choisir_representation"],
        },
        {
          titre: "Le tournoi de rugby",
          enonce:
            "Un dirigeant de club range le barème en E1 et E2 (modèle : 3 points par victoire, 1 point par nul). V compte les victoires, N les nuls.\na) La formule de D2 est écrite dans la barre. Que contient D4 après la recopie ?\nb) Quelle valeur D3 affiche-t-elle ?\nc) Combien d'équipes ont plus de 20 points ?\nd) Quelle équipe a le plus de points ? Écris son nom.",
          figure: feuille([["Équipe", "V", "N", "Points", 3], ["Rouges", 6, 4, "…", 1], ["Bleus", 8, 1, "?"], ["Verts", 5, 3, "?"], ["Jaunes", 7, 0, "?"]], { barre: ["D2", "=B2*$E$1+C2*$E$2"] }),
          reponses: [
            { question: "a)", attendu: formule("=B4*$E$1+C4*$E$2"), exact: true },
            { question: "b)", attendu: "25" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: ["Bleus", "les Bleus"] },
          ],
          correction:
            `a) B2 et C2 descendent de deux lignes, le barème reste figé : ${abs("=B4*$E$1+C4*$E$2")}.\nb) Pour les Bleus : $8 \\times 3 + 1 \\times 1 = 25$.\nc) Rouges : $6 \\times 3 + 4 = 22$. Bleus : 25. Verts : $5 \\times 3 + 3 = 18$. Jaunes : $7 \\times 3 = 21$. Trois équipes dépassent 20.\nd) Les Bleus, avec 25 points.\n⛔ Le piège au a) : décaler aussi le barème. Il deviendrait E3 et E4, qui sont vides.\nRéponse : a) ${abs("=B4*$E$1+C4*$E$2")} ; b) 25 ; c) 3 ; d) Bleus.`,
          micros: ["tab_adressage", "tab_exploiter_colonne"],
        },
        {
          titre: "La consommation d'un logement",
          enonce:
            "Un thermicien étudie un logement : les usages de l'électricité en kWh, et le prix du kWh en D1 (modèle : 0,20 €).\na) Quelle formule saisir en C2 pour la recopier vers le bas ?\nb) Combien d'usages coûtent plus de 60 € ?\nc) Le prix du kWh passe à 0,25 €, en D1 seulement. Quelle valeur C2 affiche-t-elle alors ?\nd) Pour montrer la part de chaque usage dans la consommation totale, quelle représentation choisir ? Écris courbe, circulaire ou barres.",
          figure: feuille([["Usage", "kWh", "Coût (€)", 0.2], ["Chauffage", 400, "?"], ["Eau chaude", 350, "?"], ["Cuisine", 260, "?"], ["Éclairage", 150, "?"], ["Prises", 320, "?"]]),
          reponses: [
            { question: "a)", attendu: parTaux("B2", "D", 1), exact: true },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "100 €" },
            { question: "d)", attendu: CIRCULAIRE },
          ],
          correction:
            `a) Les kWh suivent la ligne, le prix reste en D1 : ${abs("=B2*$D$1")}.\nb) Les coûts : 80, 70, 52, 30, 64. Au-dessus de 60 : 80, 70 et 64, soit 3 usages.\nc) Toute la colonne suit D1 : $400 \\times 0{,}25 = 100$ €.\nd) Des parts d'un tout : circulaire.\n⛔ Le piège au c) : croire qu'il faut retaper chaque formule. Une seule cellule change, et le tableur recalcule.\nRéponse : a) ${abs("=B2*$D$1")} ; b) 3 ; c) 100 € ; d) circulaire.`,
          micros: ["tab_adressage", "tab_exploiter_colonne", "tab_choisir_representation"],
        },
      ],
    },
  ],
};
