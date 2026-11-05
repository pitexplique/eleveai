// ─── Fiche d'exercices : taux équivalent sur une autre période (STMG, Tle) ──────
//
// Notion expo_taux_equivalent du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts`). Le coach demande :
// du taux moyen au taux global (q puissance n, moins 1), le diagnostic « il a
// multiplié le taux par n », le taux mensuel, trimestriel ou semestriel équivalent
// à un taux annuel et l'inverse, et l'interprétation d'un taux moyen (un scénario
// régulier fictif, pas l'évolution réelle). La calculatrice fait les puissances.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs et lectures nus (ex. 1 à 8) ; banque (conseillère de
// crédit), association de parents (trésorière), démographie (chargé d'études),
// boulangerie (boulanger), logement (gestionnaire d'immeuble), salle de sport
// (gérant), natation (fédération, Inès), théâtre (administrateur), crédit (Yanis qui
// compare), artisanat (coopérative), tourisme (office de tourisme), escalade (club,
// Camille).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-exponentielle.mjs`.
//
// Micro-compétences : expoT_taux_moyen_global (1, 2, 3, 11, 12, 14, 15, 16, 18, 19),
// expoT_taux_mensuel_annuel (4, 5, 6, 9, 10, 13, 17, 18, 20),
// expoT_taux_moyen_interpreter (7, 8, 14, 15, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesExpoTauxEquivalentStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "expo-taux-equivalent",
  titre: "Taux équivalent sur une autre période",
  accroche:
    "Vingt exercices pour passer d'une période à une autre sans multiplier ni diviser les taux : du taux moyen au taux global, du taux annuel au taux mensuel, et lire ce que dit vraiment un taux moyen. Un crédit à la consommation, une facture d'énergie, le prix d'une baguette, deux offres à comparer, une ville touristique. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : un coefficient, une puissance, on retire 1. Ou bien lire un taux moyen.",
      rappel: [
        "Du taux moyen au taux global : on élève le coefficient à la puissance $n$, puis on retire 1. Exemple : $1{,}04^2 - 1 = 0{,}0816$.",
        "Du taux annuel au taux équivalent sur une sous-période : coefficient $= \\left(1 + \\dfrac{t}{100}\\right)^{\\frac{1}{n}}$, où $n$ est le nombre de sous-périodes dans l'année : 12 mois, 4 trimestres, 2 semestres.",
        "En sens inverse, du mois vers l'année : on élève à la puissance 12. Du semestre vers l'année : à la puissance 2. On ne multiplie jamais le taux.",
        "Un taux moyen décrit un scénario régulier FICTIF, qui donne le même résultat final. Il ne dit rien de chaque année réelle.",
      ],
      exercices: [
        {
          enonce:
            "Une grandeur évolue au taux annuel moyen de 5 % pendant 2 ans. Quel est le taux d'évolution global, en pourcentage ?",
          reponses: [{ attendu: "10,25 %" }],
          correction:
            "Le coefficient annuel est 1,05.\nSur 2 ans, on l'élève à la puissance 2 : $1{,}05^2 = 1{,}1025$.\nOn retire 1 : $0{,}1025$, soit 10,25 %.\n⛔ Le piège : calculer $5 \\times 2 = 10$ %. Les taux ne s'additionnent pas : ce sont les coefficients qui se multiplient.\nRéponse : 10,25 %.",
          micros: ["expoT_taux_moyen_global"],
        },
        {
          enonce:
            "Une grandeur évolue au taux annuel moyen de $-10$ % pendant 3 ans. Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?",
          reponses: [{ attendu: "−27,1 %", tolerance: 0.05 }],
          correction:
            "Le coefficient annuel est $1 - 0{,}1 = 0{,}9$.\nSur 3 ans : $0{,}9^3 = 0{,}729$.\nOn retire 1 : $0{,}729 - 1 = -0{,}271$, soit $-27{,}1$ %.\n⛔ Le piège : calculer $-10 \\times 3 = -30$ %. La baisse de chaque année porte sur une valeur déjà réduite.\nRéponse : $-27{,}1$ %.",
          micros: ["expoT_taux_moyen_global"],
        },
        {
          enonce:
            "Une grandeur évolue au taux annuel moyen de 3 % pendant 10 ans. Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?",
          reponses: [{ attendu: "34,4 %", tolerance: 0.05 }],
          correction:
            "Coefficient global : $1{,}03^{10} \\approx 1{,}344$.\nOn retire 1 : $0{,}344$, soit environ 34,4 %.\n⛔ Le piège : annoncer $3 \\times 10 = 30$ %. Sur 10 ans, l'écart se voit nettement.\nRéponse : environ 34,4 %.",
          micros: ["expoT_taux_moyen_global"],
        },
        {
          enonce:
            "Un placement rapporte 12 % par an. Quel est le taux mensuel équivalent, en pourcentage arrondi au centième ?",
          reponses: [{ attendu: "0,95 %", tolerance: 0.005 }],
          correction:
            "Il y a 12 mois dans l'année : on prend la racine douzième du coefficient annuel.\n$1{,}12^{\\frac{1}{12}} \\approx 1{,}0095$.\nOn retire 1 : $0{,}0095$, soit environ 0,95 %.\n⛔ Le piège : calculer $12 \\div 12 = 1$ %. Ce taux, dit proportionnel, est un peu trop grand.\nRéponse : environ 0,95 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "Un placement rapporte 6 % par an. Quel est le taux semestriel équivalent, en pourcentage arrondi au centième ?",
          reponses: [{ attendu: "2,96 %", tolerance: 0.005 }],
          correction:
            "Il y a 2 semestres dans l'année : $1{,}06^{\\frac{1}{2}} \\approx 1{,}0296$.\nOn retire 1 : $0{,}0296$, soit environ 2,96 %.\n⛔ Le piège : calculer $6 \\div 2 = 3$ %. Deux hausses de 3 % feraient 6,09 % sur l'année, pas 6 %.\nRéponse : environ 2,96 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "Un crédit est facturé au taux mensuel de 1 %. Quel est le taux annuel équivalent, en pourcentage arrondi au centième ?",
          reponses: [{ attendu: "12,68 %", tolerance: 0.005 }],
          correction:
            "Douze mois de suite : on élève le coefficient mensuel à la puissance 12.\n$1{,}01^{12} \\approx 1{,}1268$.\nOn retire 1 : $0{,}1268$, soit environ 12,68 %.\n⛔ Le piège : calculer $1 \\times 12 = 12$ %. Les intérêts s'ajoutent au capital chaque mois.\nRéponse : environ 12,68 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "Sur 5 ans, le chiffre d'affaires d'une enseigne a évolué au taux annuel moyen de 4,8 %. Quelle lecture est correcte ? Réponds par la lettre.\nA. La hausse a été d'exactement 4,8 % chaque année.\nB. Tout se passe comme si la hausse avait été de 4,8 % chaque année : le résultat final est le même.\nC. La hausse totale sur les 5 ans est de 4,8 %.\nD. La hausse totale sur les 5 ans est de 24 %.",
          reponses: [{ attendu: "B" }],
          correction:
            "Le taux moyen est le taux constant qui aurait donné le même résultat final.\nRien ne dit que chaque année a fait exactement 4,8 % : A est fausse.\nLa hausse totale vaut $1{,}048^5 - 1 \\approx 26{,}4$ % : ni C, ni D.\n⛔ Le piège : choisir A. Le taux moyen résume le résultat, pas le chemin.\nRéponse : B.",
          micros: ["expoT_taux_moyen_interpreter"],
        },
        {
          enonce:
            "Sur 6 ans, la population d'une commune a évolué au taux annuel moyen de $-2{,}5$ %. Chaque phrase est-elle juste ? Réponds vrai ou faux.\na) La population a baissé d'exactement 2,5 % chaque année.\nb) Certaines années, la population a pu augmenter.\nc) Une baisse régulière de 2,5 % par an aurait donné le même résultat final.",
          reponses: [
            { question: "a)", attendu: "faux" },
            { question: "b)", attendu: "vrai" },
            { question: "c)", attendu: "vrai" },
          ],
          correction:
            "a) Faux : rien ne dit que toutes les années se ressemblent.\nb) Vrai : le taux moyen cache le détail de chaque année.\nc) Vrai : c'est la définition même du taux moyen.\n⛔ Le piège au b) : croire qu'un taux moyen négatif interdit toute hausse. Seul le résultat final est en baisse.\nRéponse : a) faux ; b) vrai ; c) vrai.",
          micros: ["expoT_taux_moyen_interpreter"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : de quelle période part-on, vers quelle période va-t-on ?",
      rappel: [
        "De la petite période vers la grande : on élève à la puissance. De la grande vers la petite : on prend la racine.",
        "Multiplier ou diviser le taux donne un résultat voisin, mais faux : sur de longues durées, l'écart devient grand.",
        "Taux global $= q^n - 1$, avec $q$ le coefficient moyen et $n$ le nombre de périodes. Dans l'autre sens : $q$ est le coefficient global, à la puissance $\\dfrac{1}{n}$.",
      ],
      exercices: [
        {
          enonce:
            "Une conseillère de crédit présente un prêt au taux mensuel de 1,5 % (modèle).\na) Quel est le coefficient annuel équivalent, arrondi au millième ?\nb) Quel est le taux annuel équivalent, en pourcentage arrondi au centième ?\nc) Quel taux donnerait la simple multiplication par 12 ?",
          reponses: [
            { question: "a)", attendu: "1,196", tolerance: 0.0005 },
            { question: "b)", attendu: "19,56 %", tolerance: 0.005 },
            { question: "c)", attendu: "18 %" },
          ],
          correction:
            "a) $1{,}015^{12} \\approx 1{,}196$.\nb) Plus précisément, $1{,}015^{12} \\approx 1{,}1956$. On retire 1 : environ 19,56 %.\nc) $1{,}5 \\times 12 = 18$ %.\n⛔ Le piège : annoncer 18 % au client. Le vrai coût annuel est plus élevé, parce que les intérêts s'accumulent.\nRéponse : a) environ 1,196 ; b) environ 19,56 % ; c) 18 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "La trésorière d'une association de parents place 5 000 € à 4 % par an (modèle).\na) Quel est le taux trimestriel équivalent, en pourcentage arrondi au centième ?\nb) Quelle somme y a-t-il au bout d'un trimestre, arrondie à l'euro ? Garde toute la précision de la calculatrice.",
          reponses: [
            { question: "a)", attendu: "0,99 %", tolerance: 0.005 },
            { question: "b)", attendu: "5 049 €", tolerance: 0.5 },
          ],
          correction:
            "a) 4 trimestres dans l'année : $1{,}04^{\\frac{1}{4}} \\approx 1{,}0099$, soit environ 0,99 %.\nb) $5\\,000 \\times 1{,}04^{\\frac{1}{4}} \\approx 5\\,049$ €.\n⛔ Le piège au a) : calculer $4 \\div 4 = 1$ %. C'est le taux proportionnel : quatre hausses de 1 % dépassent 4 % sur l'année.\nRéponse : a) environ 0,99 % ; b) environ 5 049 €.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "Un chargé d'études suit une commune de 12 000 habitants, avec un taux annuel moyen de 2,5 % pendant 8 ans (modèle).\na) Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?\nb) Quelle est la population au bout de 8 ans, arrondie à l'unité ?",
          reponses: [
            { question: "a)", attendu: "21,8 %", tolerance: 0.05 },
            { question: "b)", attendu: "14 621", tolerance: 0.5 },
          ],
          correction:
            "a) $1{,}025^8 \\approx 1{,}218$. On retire 1 : environ 21,8 %.\nb) $12\\,000 \\times 1{,}025^8 \\approx 14\\,621$ habitants.\n⛔ Le piège au a) : calculer $2{,}5 \\times 8 = 20$ %. On perdrait plus de 200 habitants dans la prévision.\nRéponse : a) environ 21,8 % ; b) environ 14 621 habitants.",
          micros: ["expoT_taux_moyen_global"],
        },
        {
          enonce:
            "Un boulanger imagine une baguette à 1 € dont le prix monte de 1,8 % par an pendant 10 ans (modèle).\na) Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?\nb) Quel est le prix de la baguette au bout des 10 ans, arrondi au centime ?",
          reponses: [
            { question: "a)", attendu: "19,5 %", tolerance: 0.05 },
            { question: "b)", attendu: "1,20 €", tolerance: 0.005 },
          ],
          correction:
            "a) $1{,}018^{10} \\approx 1{,}195$. On retire 1 : environ 19,5 %.\nb) $1 \\times 1{,}018^{10} \\approx 1{,}20$ €.\n⛔ Le piège au a) : compter $1{,}8 \\times 10 = 18$ %. Le prix de l'année d'après part d'un prix qui a déjà monté.\nRéponse : a) environ 19,5 % ; b) environ 1,20 €.",
          micros: ["expoT_taux_moyen_global"],
        },
        {
          enonce:
            "Un gestionnaire d'immeuble prévoit une facture d'énergie de 900 €, en hausse de 20 % par an (modèle).\na) Quel est le taux mensuel équivalent, en pourcentage arrondi au centième ?\nb) Quelle est la hausse sur 6 mois, en pourcentage arrondi au centième ?\nc) Quelle est la facture au bout de 6 mois, arrondie à l'euro ?",
          reponses: [
            { question: "a)", attendu: "1,53 %", tolerance: 0.005 },
            { question: "b)", attendu: "9,54 %", tolerance: 0.005 },
            { question: "c)", attendu: "986 €", tolerance: 0.5 },
          ],
          correction:
            "a) $1{,}2^{\\frac{1}{12}} \\approx 1{,}0153$, soit environ 1,53 %.\nb) 6 mois, c'est un semestre, la moitié de l'année : $1{,}2^{\\frac{1}{2}} \\approx 1{,}0954$, soit environ 9,54 %.\nc) $900 \\times 1{,}2^{\\frac{1}{2}} \\approx 986$ €.\n⛔ Le piège au a) : calculer $20 \\div 12 \\approx 1{,}67$ %. Douze hausses de 1,67 % dépasseraient 20 %.\nRéponse : a) environ 1,53 % ; b) environ 9,54 % ; c) environ 986 €.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          enonce:
            "Le gérant d'une salle de sport annonce que ses abonnés ont évolué au taux annuel moyen de 6,2 % pendant 8 ans (modèle).\na) Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?\nb) Son associée dit : « La hausse totale est de 49,6 %. » Réponds vrai ou faux.\nc) Quelle lecture est correcte ? Réponds par la lettre.\nA. Les abonnés ont augmenté d'exactement 6,2 % chaque année.\nB. Une hausse régulière de 6,2 % par an aurait donné le même résultat final.\nC. La hausse totale est de 6,2 %.",
          reponses: [
            { question: "a)", attendu: "61,8 %", tolerance: 0.05 },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) $1{,}062^8 \\approx 1{,}618$. On retire 1 : environ 61,8 %.\nb) Faux : 49,6 %, c'est $6{,}2 \\times 8$, et on ne multiplie pas un taux par le nombre d'années.\nc) Le taux moyen décrit un scénario régulier fictif : c'est B.\n⛔ Le piège au c) : choisir A. Certaines années ont pu faire bien plus, d'autres bien moins.\nRéponse : a) environ 61,8 % ; b) faux ; c) B.",
          micros: ["expoT_taux_moyen_global", "expoT_taux_moyen_interpreter"],
        },
        {
          enonce:
            "Inès, à la fédération de natation, lit que les licences ont évolué au taux annuel moyen de $-5{,}1$ % pendant 3 ans. Il y avait 40 000 licences au départ (modèle).\na) Quel est le coefficient moyen annuel ?\nb) Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?\nc) Combien y a-t-il de licences au bout des 3 ans, arrondi à l'unité ?\nd) Les licences ont-elles forcément baissé de 5,1 % chaque année ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,949" },
            { question: "b)", attendu: "−14,5 %", tolerance: 0.05 },
            { question: "c)", attendu: "34 187", tolerance: 0.5 },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $1 - 0{,}051 = 0{,}949$.\nb) $0{,}949^3 \\approx 0{,}855$. On retire 1 : environ $-14{,}5$ %.\nc) $40\\,000 \\times 0{,}949^3 \\approx 34\\,187$ licences.\nd) Non : le taux moyen décrit un scénario régulier, pas ce qui s'est passé chaque année.\n⛔ Le piège au b) : calculer $-5{,}1 \\times 3 = -15{,}3$ %.\nRéponse : a) 0,949 ; b) environ $-14{,}5$ % ; c) environ 34 187 ; d) non.",
          micros: ["expoT_taux_moyen_global", "expoT_taux_moyen_interpreter"],
        },
        {
          enonce:
            "L'administrateur d'un théâtre note que son budget a augmenté de 40 % en 5 ans (modèle).\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?\nc) Vérifie : élève le coefficient moyen, arrondi au centième, à la puissance 5. Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "1,4" },
            { question: "b)", attendu: "7 %", tolerance: 0.05 },
            { question: "c)", attendu: "1,40", tolerance: 0.005 },
          ],
          correction:
            "a) Une hausse de 40 % : coefficient 1,4.\nb) $1{,}4^{\\frac{1}{5}} \\approx 1{,}070$, soit environ 7 %.\nc) $1{,}07^5 \\approx 1{,}40$ : on retrouve bien le coefficient global. ✔\n⛔ Le piège au b) : calculer $40 \\div 5 = 8$ %. À 8 % par an, la hausse totale dépasserait 46 %.\nRéponse : a) 1,4 ; b) environ 7 % ; c) environ 1,40.",
          micros: ["expoT_taux_moyen_global"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : ramener tout à la même période avant de comparer ou de conclure.",
      rappel: [
        "Pour comparer deux offres, on les exprime sur la MÊME période, par des taux équivalents.",
        "Un taux mensuel sur 2 ans, cela fait 24 mois : on compte les petites périodes, puis on élève à cette puissance.",
        "Face à un tableau d'évolutions réelles : coefficient global, taux global, puis taux moyen. Ce dernier ne remplace pas le détail des années.",
      ],
      exercices: [
        {
          titre: "Deux offres de crédit",
          enonce:
            "Yanis compare deux crédits (modèle). Offre A : 1,2 % par mois. Offre B : 15 % par an.\na) Quel est le taux annuel équivalent de l'offre A, en pourcentage arrondi au centième ?\nb) Quel est le taux mensuel équivalent de l'offre B, en pourcentage arrondi au centième ?\nc) Quelle offre coûte le moins cher ? Écris sa lettre.\nd) Quel taux annuel Yanis aurait-il trouvé pour A en multipliant simplement par 12 ?",
          reponses: [
            { question: "a)", attendu: "15,39 %", tolerance: 0.005 },
            { question: "b)", attendu: "1,17 %", tolerance: 0.005 },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: "14,4 %" },
          ],
          correction:
            "a) $1{,}012^{12} \\approx 1{,}1539$, soit environ 15,39 %.\nb) $1{,}15^{\\frac{1}{12}} \\approx 1{,}0117$, soit environ 1,17 %.\nc) $15 < 15{,}39$, et $1{,}17 < 1{,}2$ : l'offre B coûte le moins cher.\nd) $1{,}2 \\times 12 = 14{,}4$ %.\n⛔ Le piège : conclure avec 14,4 % que A est moins chère que B. La multiplication inverse la conclusion.\nRéponse : a) environ 15,39 % ; b) environ 1,17 % ; c) B ; d) 14,4 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
        {
          titre: "La coopérative d'artisans",
          enonce:
            "Une coopérative d'artisans vend pour 200 k€ et vise $+2$ % par trimestre (modèle).\na) Quel est le taux annuel équivalent, en pourcentage arrondi au centième ?\nb) Quel est le taux global sur 3 ans, en pourcentage arrondi au centième ?\nc) Quelles seraient les ventes au bout de 3 ans, arrondies à l'unité ?",
          reponses: [
            { question: "a)", attendu: "8,24 %", tolerance: 0.005 },
            { question: "b)", attendu: "26,82 %", tolerance: 0.005 },
            { question: "c)", attendu: "254 k€", tolerance: 0.5 },
          ],
          correction:
            "a) 4 trimestres dans l'année : $1{,}02^4 \\approx 1{,}0824$, soit environ 8,24 %.\nb) 3 ans font 12 trimestres : $1{,}02^{12} \\approx 1{,}2682$, soit environ 26,82 %.\nc) $200 \\times 1{,}02^{12} \\approx 254$ k€.\n⛔ Le piège au b) : calculer $3 \\times 8{,}24$ %, soit environ 24,7 %. Même d'une année à l'autre, on multiplie les coefficients.\nRéponse : a) environ 8,24 % ; b) environ 26,82 % ; c) environ 254 k€.",
          micros: ["expoT_taux_moyen_global", "expoT_taux_mensuel_annuel"],
        },
        {
          titre: "L'office de tourisme",
          enonce:
            "Un office de tourisme relève l'évolution de ses visiteurs sur 4 ans (modèle). Le tableau donne les taux réels.\na) Quel est le coefficient global, arrondi au millième ?\nb) Quel est le taux d'évolution global, en pourcentage arrondi au dixième ?\nc) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?\nd) Un journal écrit : « Les visiteurs ont augmenté de ce taux moyen chaque année, sans exception. » Réponds vrai ou faux.",
          figure: grille(["Année", "Évolution"], [
            ["1re", "+20 %"],
            ["2e", "−5 %"],
            ["3e", "+15 %"],
            ["4e", "+2 %"],
          ]),
          reponses: [
            { question: "a)", attendu: "1,337", tolerance: 0.0005 },
            { question: "b)", attendu: "33,7 %", tolerance: 0.05 },
            { question: "c)", attendu: "7,5 %", tolerance: 0.05 },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $1{,}2 \\times 0{,}95 \\times 1{,}15 \\times 1{,}02 \\approx 1{,}337$.\nb) $1{,}337 - 1 = 0{,}337$, soit environ 33,7 %.\nc) $1{,}337^{\\frac{1}{4}} \\approx 1{,}075$, soit environ 7,5 %.\nd) Faux : le tableau montre $+20$ %, $-5$ %, $+15$ %, $+2$ %. Tout se passe seulement COMME SI la hausse avait été de 7,5 % par an.\n⛔ Le piège au d) : prendre le scénario fictif pour l'histoire réelle.\nRéponse : a) environ 1,337 ; b) environ 33,7 % ; c) environ 7,5 % ; d) faux.",
          micros: ["expoT_taux_moyen_global", "expoT_taux_moyen_interpreter"],
        },
        {
          titre: "L'objectif du club",
          enonce:
            "Camille dirige un club d'escalade et vise 30 % d'adhérents en plus en un an (modèle).\na) Quel taux mensuel équivalent doit-elle viser, en pourcentage arrondi au centième ?\nb) Quel taux trimestriel équivalent, en pourcentage arrondi au centième ?\nc) Si le club gagne 2,5 % par mois, atteint-il l'objectif ? Réponds oui ou non.\nd) Quelle hausse annuelle obtient-il alors, en pourcentage arrondi au centième ?",
          reponses: [
            { question: "a)", attendu: "2,21 %", tolerance: 0.005 },
            { question: "b)", attendu: "6,78 %", tolerance: 0.005 },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "34,49 %", tolerance: 0.005 },
          ],
          correction:
            "a) $1{,}3^{\\frac{1}{12}} \\approx 1{,}0221$, soit environ 2,21 %.\nb) $1{,}3^{\\frac{1}{4}} \\approx 1{,}0678$, soit environ 6,78 %.\nc) et d) $1{,}025^{12} \\approx 1{,}3449$, soit environ 34,49 %. C'est plus que 30 % : l'objectif est atteint.\n⛔ Le piège au a) : calculer $30 \\div 12 = 2{,}5$ %. C'est au-dessus du taux nécessaire, et ce n'est pas le taux équivalent.\nRéponse : a) environ 2,21 % ; b) environ 6,78 % ; c) oui ; d) environ 34,49 %.",
          micros: ["expoT_taux_mensuel_annuel"],
        },
      ],
    },
  ],
};
