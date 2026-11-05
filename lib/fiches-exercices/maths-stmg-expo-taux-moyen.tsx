// ─── Fiche d'exercices : le taux d'évolution moyen (STMG, Tle) — 20 exercices ───
//
// Notion expo_taux_moyen du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts`). Le coach demande :
// l'exposant 1/n comme racine n-ième, le taux moyen depuis un coefficient global ou
// depuis deux valeurs (coefficient global, puis racine, puis on retire 1), et le
// piège : le taux moyen n'est pas la moyenne des taux. La calculatrice fait les
// racines. Le logarithme n'est pas utilisé.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; démographie (adjointe au maire),
// cantine et déchets (responsable environnement), agriculture (céréalier), handball
// (fédération, Karim), commerce (fleuriste), énergie solaire (installateur), santé
// (cadre de santé), musique (label), nature (hydrologue), tourisme (directrice de
// station de ski), vélo (start-up), association (Awa, présidente).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-exponentielle.mjs`.
//
// Micro-compétences : expoT_exposant_un_sur_n (1, 2, 3, 4, 20),
// expoT_taux_moyen_calculer (5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// expoT_taux_moyen_piege (7, 8, 11, 12, 16, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesExpoTauxMoyenStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "expo-taux-moyen",
  titre: "Le taux d'évolution moyen",
  accroche:
    "Vingt exercices pour calculer un taux moyen sans tomber dans le piège : l'exposant 1/n, le coefficient global, sa racine, et cette vérité qui surprend : le taux moyen n'est pas la moyenne des taux. Une commune qui grandit, une cantine qui gaspille moins, le prix du blé, une station de ski, un lac qui recule. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : prendre une racine, trouver un taux moyen, ou repérer le piège.",
      rappel: [
        "L'exposant $\\dfrac{1}{n}$ désigne la racine $n$-ième : $32^{\\frac{1}{5}} = 2$, car $2^5 = 32$. Ce n'est pas une division par $n$.",
        "Le coefficient moyen sur $n$ périodes vaut $k^{\\frac{1}{n}}$, où $k$ est le coefficient global. Le taux moyen s'obtient en retirant 1.",
        "À la calculatrice, on tape les parenthèses : $2{,}5^{(1 \\div 4)}$.",
        "Le taux moyen n'est PAS la moyenne des taux : ce sont les coefficients qui se multiplient.",
      ],
      exercices: [
        {
          enonce: "Que vaut $8^{\\frac{1}{3}}$ ?",
          reponses: [{ attendu: "2", exact: true }],
          correction:
            "On cherche le nombre qui, élevé à la puissance 3, donne 8.\n$2^3 = 8$, donc $8^{\\frac{1}{3}} = 2$.\n⛔ Le piège : calculer $8 \\div 3 \\approx 2{,}67$. Élever à la puissance $\\dfrac{1}{3}$, ce n'est pas diviser par 3.\nRéponse : 2.",
          micros: ["expoT_exposant_un_sur_n"],
        },
        {
          enonce: "Calcule.\na) $625^{\\frac{1}{4}}$\nb) $100^{\\frac{1}{2}}$",
          reponses: [
            { question: "a)", attendu: "5", exact: true },
            { question: "b)", attendu: "10", exact: true },
          ],
          correction:
            "a) $5^4 = 625$, donc $625^{\\frac{1}{4}} = 5$.\nb) $10^2 = 100$, donc $100^{\\frac{1}{2}} = 10$ : l'exposant $\\dfrac{1}{2}$, c'est la racine carrée.\n⛔ Le piège au b) : répondre 50 en divisant 100 par 2.\nRéponse : a) 5 ; b) 10.",
          micros: ["expoT_exposant_un_sur_n"],
        },
        {
          enonce:
            "On cherche le nombre qui, élevé à la puissance 5, donne 20.\na) Écris ce nombre avec un exposant.\nb) Donne sa valeur à la calculatrice, arrondie au millième.",
          reponses: [
            { question: "a)", attendu: ["20^(1/5)", "20^(1÷5)", "20^0,2"], exact: true },
            { question: "b)", attendu: "1,821", tolerance: 0.0005 },
          ],
          correction:
            "a) La racine cinquième de 20 s'écrit $20^{\\frac{1}{5}}$, ou encore $20^{0{,}2}$.\nb) À la calculatrice : $20^{(1 \\div 5)} \\approx 1{,}821$.\nVérification : $1{,}821^5 \\approx 20$. ✔\n⛔ Le piège au a) : écrire $20 \\div 5 = 4$. Or $4^5 = 1\\,024$, très loin de 20.\nRéponse : a) $20^{\\frac{1}{5}}$ ; b) environ 1,821.",
          micros: ["expoT_exposant_un_sur_n"],
        },
        {
          enonce: "À la calculatrice, calcule $1{,}5^{\\frac{1}{3}}$. Arrondis au millième.",
          reponses: [{ attendu: "1,145", tolerance: 0.0005 }],
          correction:
            "On tape $1{,}5^{(1 \\div 3)}$, avec les parenthèses.\nOn lit $1{,}5^{\\frac{1}{3}} \\approx 1{,}145$.\n⛔ Le piège : oublier les parenthèses. La calculatrice fait alors $1{,}5^1 \\div 3 = 0{,}5$.\nRéponse : environ 1,145.",
          micros: ["expoT_exposant_un_sur_n"],
        },
        {
          enonce:
            "Une grandeur a été multipliée par 1,21 en 2 ans. Quel est le taux d'évolution annuel moyen, en pourcentage ?",
          reponses: [{ attendu: "10 %" }],
          correction:
            "Le coefficient global est 1,21, sur 2 périodes.\nCoefficient moyen : $1{,}21^{\\frac{1}{2}} = 1{,}1$.\nTaux moyen : $1{,}1 - 1 = 0{,}1$, soit 10 %.\n⛔ Le piège : diviser la hausse par 2 ($21 \\div 2 = 10{,}5$ %). On prend une racine, pas une moitié.\nRéponse : 10 %.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Une grandeur a été multipliée par 0,81 en 2 ans. Quel est le taux d'évolution annuel moyen, en pourcentage ?",
          reponses: [{ attendu: "−10 %" }],
          correction:
            "Coefficient moyen : $0{,}81^{\\frac{1}{2}} = 0{,}9$.\nTaux moyen : $0{,}9 - 1 = -0{,}1$, soit $-10$ %.\nUn coefficient plus petit que 1 donne un taux négatif : c'est une baisse.\n⛔ Le piège : oublier le signe moins, et annoncer une hausse de 10 %.\nRéponse : $-10$ %.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Une grandeur augmente de 100 % une année, puis diminue de 50 % l'année suivante.\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "0 %" },
          ],
          correction:
            "a) Une hausse de 100 % : coefficient 2. Une baisse de 50 % : coefficient 0,5.\n$2 \\times 0{,}5 = 1$.\nb) La grandeur revient à sa valeur de départ : $1^{\\frac{1}{2}} = 1$, et $1 - 1 = 0$, soit 0 %.\n⛔ Le piège au b) : faire la moyenne de $+100$ et $-50$, ce qui donne $+25$ %. Le taux moyen n'est pas la moyenne des taux.\nRéponse : a) 1 ; b) 0 %.",
          micros: ["expoT_taux_moyen_piege"],
        },
        {
          enonce:
            "Un capital de 100 € augmente de 50 % la première année, puis diminue de 50 % la seconde.\na) Quel est le capital après la première année ?\nb) Quel est le capital après la seconde année ?\nc) Le taux moyen est-il de 0 % ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "150 €" },
            { question: "b)", attendu: "75 €" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $100 \\times 1{,}5 = 150$ €.\nb) $150 \\times 0{,}5 = 75$ € : la baisse porte sur les 150 €, pas sur les 100 €.\nc) Non : le capital a perdu 25 % en deux ans, le taux moyen est négatif.\n⛔ Le piège au c) : se dire que $+50$ et $-50$ se compensent. Ce sont les coefficients qui se composent : $1{,}5 \\times 0{,}5 = 0{,}75$.\nRéponse : a) 150 € ; b) 75 € ; c) non.",
          micros: ["expoT_taux_moyen_piege"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Trois temps : le coefficient global, sa racine, puis on retire 1.",
      rappel: [
        "Depuis deux valeurs : coefficient global = valeur finale ÷ valeur initiale.",
        "Depuis plusieurs taux : coefficient global = le produit des coefficients. Exemple : $+15$ % puis $-10$ % donne $1{,}15 \\times 0{,}9$.",
        "Puis coefficient moyen = $k^{\\frac{1}{n}}$, et taux moyen = coefficient moyen $- 1$. On arrondit à la fin seulement.",
      ],
      exercices: [
        {
          enonce:
            "Une adjointe au maire note que sa commune est passée de 8 000 à 12 000 habitants en 5 ans (modèle).\na) Quel est le coefficient global ?\nb) Quel est le coefficient moyen annuel, arrondi au millième ?\nc) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: "1,5" },
            { question: "b)", attendu: "1,084", tolerance: 0.0005 },
            { question: "c)", attendu: "8,4 %", tolerance: 0.05 },
          ],
          correction:
            "a) $12\\,000 \\div 8\\,000 = 1{,}5$.\nb) $1{,}5^{\\frac{1}{5}} \\approx 1{,}084$.\nc) $1{,}084 - 1 = 0{,}084$, soit environ 8,4 %.\n⛔ Le piège au c) : diviser la hausse totale par 5 ($50 \\div 5 = 10$ %). À 10 % par an, la commune dépasserait 12 000 habitants.\nRéponse : a) 1,5 ; b) environ 1,084 ; c) environ 8,4 %.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "La responsable environnement d'une cantine a fait passer le gaspillage de 400 kg à 300 kg par mois en 4 ans (modèle).\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: "0,75" },
            { question: "b)", attendu: "−6,9 %", tolerance: 0.05 },
          ],
          correction:
            "a) $300 \\div 400 = 0{,}75$.\nb) $0{,}75^{\\frac{1}{4}} \\approx 0{,}931$, et $0{,}931 - 1 = -0{,}069$, soit environ $-6{,}9$ %.\n⛔ Le piège au b) : diviser $-25$ % par 4, ce qui donne $-6{,}25$ %. On passe par la racine, jamais par une division du taux.\nRéponse : a) 0,75 ; b) environ $-6{,}9$ %.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Un céréalier note l'évolution du prix de son blé sur 3 ans (modèle) : $+30$ %, puis $-20$ %, puis $+10$ %.\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: "1,144" },
            { question: "b)", attendu: "4,6 %", tolerance: 0.05 },
          ],
          correction:
            "a) On multiplie les coefficients : $1{,}3 \\times 0{,}8 \\times 1{,}1 = 1{,}144$.\nb) $1{,}144^{\\frac{1}{3}} \\approx 1{,}046$, soit un taux d'environ 4,6 %.\n⛔ Le piège au b) : faire la moyenne $(30 - 20 + 10) \\div 3 \\approx 6{,}7$ %. Le taux moyen se calcule sur les coefficients.\nRéponse : a) 1,144 ; b) environ 4,6 %.",
          micros: ["expoT_taux_moyen_calculer", "expoT_taux_moyen_piege"],
        },
        {
          enonce:
            "Karim, à la fédération de handball, suit une ligue de 1 000 licenciés (modèle). Le nombre monte de 40 % la première année, puis baisse de 30 % la seconde.\na) Quel est le coefficient global ?\nb) Combien y a-t-il de licenciés au bout des 2 ans ?\nc) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: "0,98" },
            { question: "b)", attendu: "980" },
            { question: "c)", attendu: "−1 %", tolerance: 0.05 },
          ],
          correction:
            "a) $1{,}4 \\times 0{,}7 = 0{,}98$.\nb) $1\\,000 \\times 0{,}98 = 980$ licenciés.\nc) $0{,}98^{\\frac{1}{2}} \\approx 0{,}99$, et $0{,}99 - 1 = -0{,}01$, soit environ $-1$ %.\n⛔ Le piège au c) : faire la moyenne $(40 - 30) \\div 2 = 5$ %. On annoncerait une hausse, alors que la ligue a perdu des licenciés.\nRéponse : a) 0,98 ; b) 980 ; c) environ $-1$ %.",
          micros: ["expoT_taux_moyen_calculer", "expoT_taux_moyen_piege"],
        },
        {
          enonce:
            "Une fleuriste a vu son chiffre d'affaires passer de 50 k€ à 80 k€ en 6 ans (modèle).\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?\nc) Vérifie : élève le coefficient moyen, arrondi au millième, à la puissance 6, puis multiplie par 50. Arrondis à l'unité.",
          reponses: [
            { question: "a)", attendu: "1,6" },
            { question: "b)", attendu: "8,1 %", tolerance: 0.05 },
            { question: "c)", attendu: "80", tolerance: 0.5 },
          ],
          correction:
            "a) $80 \\div 50 = 1{,}6$.\nb) $1{,}6^{\\frac{1}{6}} \\approx 1{,}081$, soit un taux d'environ 8,1 %.\nc) $50 \\times 1{,}081^6 \\approx 79{,}8$, soit environ 80 : on retombe sur la valeur finale. ✔\n⛔ Le piège au b) : diviser par 6 la hausse totale, $60 \\div 6 = 10$ %. La hausse se cumule d'une année sur l'autre.\nRéponse : a) 1,6 ; b) environ 8,1 % ; c) environ 80.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Un installateur constate que le nombre de panneaux solaires posés a été multiplié par 5 en 10 ans (modèle). Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?",
          reponses: [{ attendu: "17,5 %", tolerance: 0.05 }],
          correction:
            "Le coefficient global est donné : 5.\nCoefficient moyen : $5^{\\frac{1}{10}} \\approx 1{,}175$.\nTaux moyen : $1{,}175 - 1 = 0{,}175$, soit environ 17,5 %.\n⛔ Le piège : calculer une hausse totale de 400 %, puis $400 \\div 10 = 40$ %. À 40 % par an, on multiplierait par presque 29.\nRéponse : environ 17,5 %.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Une cadre de santé compare deux services (modèle). Le service A est passé de 200 à 260 patients par mois en 3 ans. Le service B est passé de 300 à 360 patients par mois en 2 ans.\na) Quel est le taux annuel moyen du service A, en pourcentage arrondi au dixième ?\nb) Quel est celui du service B ?\nc) Quel service a le plus fort taux annuel moyen ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: "9,1 %", tolerance: 0.05 },
            { question: "b)", attendu: "9,5 %", tolerance: 0.05 },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) $260 \\div 200 = 1{,}3$, puis $1{,}3^{\\frac{1}{3}} \\approx 1{,}091$ : environ 9,1 %.\nb) $360 \\div 300 = 1{,}2$, puis $1{,}2^{\\frac{1}{2}} \\approx 1{,}095$ : environ 9,5 %.\nc) $9{,}5 > 9{,}1$ : c'est B.\n⛔ Le piège au c) : choisir A parce que sa hausse totale (30 %) dépasse celle de B (20 %). A a mis un an de plus : seul le taux moyen compare des durées différentes.\nRéponse : a) environ 9,1 % ; b) environ 9,5 % ; c) B.",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          enonce:
            "Un label de musique note ses écoutes (modèle) : $+25$ % une année, puis $+15$ % l'année suivante.\na) Quel est le coefficient global ?\nb) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?\nc) Est-il égal à la moyenne des deux taux, 20 % ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1,4375" },
            { question: "b)", attendu: "19,9 %", tolerance: 0.05 },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $1{,}25 \\times 1{,}15 = 1{,}4375$.\nb) $1{,}4375^{\\frac{1}{2}} \\approx 1{,}199$, soit environ 19,9 %.\nc) Non : c'est proche de 20 %, mais pas égal.\n⛔ Le piège au c) : dire oui, parce que l'écart est petit. Il est petit ici, car les deux taux sont proches. Avec des taux très différents, il grandit.\nRéponse : a) 1,4375 ; b) environ 19,9 % ; c) non.",
          micros: ["expoT_taux_moyen_calculer", "expoT_taux_moyen_piege"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : calculer le taux moyen, le comparer, et s'en servir.",
      rappel: [
        "Pour vérifier un taux moyen : le coefficient moyen élevé à la puissance $n$ redonne le coefficient global.",
        "Pour comparer deux scénarios : on compare leurs coefficients globaux. Le plus grand rapporte le plus.",
        "Prolonger une tendance : on multiplie la dernière valeur par le coefficient moyen, élevé à la puissance du nombre d'années restantes.",
      ],
      exercices: [
        {
          titre: "Le lac qui recule",
          enonce:
            "Une hydrologue constate que la surface d'un lac est passée de 500 km² à 400 km² en 20 ans (modèle).\na) Quel est le coefficient global ?\nb) Quel est le coefficient moyen annuel, arrondi au millième ?\nc) Quel est le taux annuel moyen, en pourcentage arrondi au dixième ?\nd) Si cette tendance continue, quelle sera la surface dans 10 ans, arrondie à l'unité ?",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "0,989", tolerance: 0.0005 },
            { question: "c)", attendu: "−1,1 %", tolerance: 0.05 },
            { question: "d)", attendu: "358 km²", tolerance: 0.5 },
          ],
          correction:
            "a) $400 \\div 500 = 0{,}8$.\nb) $0{,}8^{\\frac{1}{20}} \\approx 0{,}989$.\nc) $0{,}989 - 1 = -0{,}011$, soit environ $-1{,}1$ %.\nd) $400 \\times \\left(0{,}8^{\\frac{1}{20}}\\right)^{10} = 400 \\times 0{,}8^{\\frac{1}{2}} \\approx 358$ km².\n⛔ Le piège au d) : retirer la moitié de la perte, $400 - 50 = 350$. La baisse se calcule sur une surface qui a déjà diminué.\nRéponse : a) 0,8 ; b) environ 0,989 ; c) environ $-1{,}1$ % ; d) environ 358 km².",
          micros: ["expoT_taux_moyen_calculer"],
        },
        {
          titre: "La station de ski",
          enonce:
            "La directrice d'une station de ski note son chiffre d'affaires sur 4 saisons (modèle) : $+30$ %, $-25$ %, $+40$ %, $-20$ %. Le chiffre d'affaires de départ est de 1 000 k€.\na) Quel est le coefficient global ?\nb) Quel est le taux moyen par saison, en pourcentage arrondi au dixième ?\nc) Quelle est la moyenne des quatre taux ?\nd) Quel est le chiffre d'affaires au bout des 4 saisons ?",
          reponses: [
            { question: "a)", attendu: "1,092" },
            { question: "b)", attendu: "2,2 %", tolerance: 0.05 },
            { question: "c)", attendu: "6,25 %" },
            { question: "d)", attendu: "1 092 k€" },
          ],
          correction:
            "a) $1{,}3 \\times 0{,}75 \\times 1{,}4 \\times 0{,}8 = 1{,}092$.\nb) $1{,}092^{\\frac{1}{4}} \\approx 1{,}022$, soit environ 2,2 %.\nc) $(30 - 25 + 40 - 20) \\div 4 = 6{,}25$ %.\nd) $1\\,000 \\times 1{,}092 = 1\\,092$ k€.\nÀ 6,25 % par saison, on aurait dépassé 1 270 k€ : la moyenne des taux ment beaucoup.\n⛔ Le piège au b) : annoncer 6,25 %. Plus les saisons sont inégales, plus ce nombre s'éloigne du vrai taux moyen.\nRéponse : a) 1,092 ; b) environ 2,2 % ; c) 6,25 % ; d) 1 092 k€.",
          micros: ["expoT_taux_moyen_calculer", "expoT_taux_moyen_piege"],
        },
        {
          titre: "Les deux scénarios",
          enonce:
            "Une start-up de vélos hésite entre deux plans d'évolution de son chiffre d'affaires sur 2 ans (modèle). Plan A : $+10$ % puis $+10$ %. Plan B : 0 % puis $+20$ %.\na) Quel est le coefficient global du plan A ?\nb) Quel est le coefficient global du plan B ?\nc) Quel est le taux annuel moyen du plan B, en pourcentage arrondi au dixième ?\nd) Les deux plans ont la même moyenne des taux. Lequel rapporte le plus ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: "1,21" },
            { question: "b)", attendu: "1,2" },
            { question: "c)", attendu: "9,5 %", tolerance: 0.05 },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) $1{,}1 \\times 1{,}1 = 1{,}21$.\nb) $1 \\times 1{,}2 = 1{,}2$.\nc) $1{,}2^{\\frac{1}{2}} \\approx 1{,}095$, soit environ 9,5 %.\nd) $1{,}21 > 1{,}2$ : le plan A rapporte le plus.\n⛔ Le piège au c) : répondre 10 %, la moyenne de 0 % et 20 %. Ce nombre est le vrai taux moyen du plan A, pas du plan B.\nRéponse : a) 1,21 ; b) 1,2 ; c) environ 9,5 % ; d) A.",
          micros: ["expoT_taux_moyen_calculer", "expoT_taux_moyen_piege"],
        },
        {
          titre: "Doubler en 8 ans",
          enonce:
            "Awa préside une association et veut doubler le nombre d'adhérents en 8 ans.\na) Quel est le coefficient global visé ?\nb) Écris le coefficient moyen annuel avec un exposant.\nc) Quel taux annuel moyen doit-elle viser, en pourcentage arrondi au dixième ?\nd) Si elle gagne 12 % d'adhérents par an, atteint-elle son objectif ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: ["2^(1/8)", "2^(1÷8)", "2^0,125"], exact: true },
            { question: "c)", attendu: "9,1 %", tolerance: 0.05 },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) Doubler, c'est multiplier par 2.\nb) Sur 8 ans : $2^{\\frac{1}{8}}$, ou encore $2^{0{,}125}$.\nc) $2^{\\frac{1}{8}} \\approx 1{,}091$, soit environ 9,1 %.\nd) $1{,}12^8 \\approx 2{,}48$, plus grand que 2 : l'objectif est atteint.\n⛔ Le piège au c) : calculer $100 \\div 8 = 12{,}5$ %. C'est trop : chaque année, la hausse porte sur un nombre d'adhérents plus grand.\nRéponse : a) 2 ; b) $2^{\\frac{1}{8}}$ ; c) environ 9,1 % ; d) oui.",
          micros: ["expoT_exposant_un_sur_n", "expoT_taux_moyen_calculer"],
        },
      ],
    },
  ],
};
