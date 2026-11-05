// ─── Fiche d'exercices : terme général d'une suite (STMG, Tle) — 20 exercices ──
//
// Notion suite_terme_general du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts`). Le coach écrit
// u(n), u(0), r et q, et part toujours de u(0) : u(n) = u(0) + nr et
// u(n) = u(0) × q^n. Il demande : écrire l'expression, sauter à un rang lointain,
// lire une raison, remonter au premier terme, et tester trois nombres (deux
// différences, deux quotients). Raisons géométriques strictement positives.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : suites nues (ex. 1 à 6, 8), démographie et commerce
// (ex. 7) ; mobilité (bornes de recharge, élu), podcast
// (animatrice), agriculture (tracteur, exploitant), laboratoire (biologiste), eau
// (technicien, compteur), forêt (forestière), théâtre (billetterie), littoral et
// climat (ingénieure), bibliothèque (directeur), vélo (urbaniste), médecine nucléaire
// (manipulatrice radio), commerce (gérants).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suiteT_arith_explicite (1, 2, 3, 9, 13, 16, 18, 20),
// suiteT_geo_explicite (4, 5, 10, 11, 17, 19, 20), suiteT_raison_modele (6, 7, 9,
// 10, 12, 13, 17, 19), suiteT_trois_termes (8, 14, 15, 17, 18). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

// Les écritures qu'un élève tape vraiment : le correcteur compare ces mots au texte.
const ARITH = ["arithmétique", "arithmétiques", "suite arithmétique", "la suite arithmétique", "une suite arithmétique", "l'arithmétique"];
const GEO = ["géométrique", "géométriques", "suite géométrique", "la suite géométrique", "une suite géométrique", "la géométrique"];
const AUCUNE = ["aucune", "aucun", "aucune des deux", "aucun des deux", "ni l'un ni l'autre"];

export const exercicesSuiteTermeGeneralStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-terme-general",
  titre: "Terme général d'une suite",
  accroche:
    "Vingt exercices pour sauter directement au rang voulu : écrire u(n) en fonction de n pour une suite arithmétique ou géométrique, calculer un terme lointain, lire une raison, remonter au premier terme, et tester trois nombres consécutifs. Des bornes de recharge, un podcast, une digue face à la mer, un plan vélo, une dose en médecine nucléaire. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire l'expression, remplacer n, lire la raison, ou tester trois nombres.",
      rappel: [
        "Suite arithmétique : $u(n) = u(0) + n \\times r$. Depuis $u(0)$, on ajoute la raison $n$ fois.",
        "Suite géométrique : $u(n) = u(0) \\times q^n$. Depuis $u(0)$, on multiplie par la raison $n$ fois.",
        "La raison d'une suite géométrique est le quotient de deux termes consécutifs ; une hausse de 3 % donne $q = 1{,}03$.",
        "Trois nombres $a$, $b$, $c$ : arithmétiques si $b - a = c - b$, géométriques si $b \\div a = c \\div b$.",
      ],
      exercices: [
        {
          enonce:
            "Une suite arithmétique a pour premier terme $u(0) = 25$ et pour raison $r = 7$. Écris $u(n)$ en fonction de $n$.",
          reponses: [{ attendu: "25 + 7n" }],
          correction:
            "Pour une suite arithmétique : $u(n) = u(0) + n \\times r$.\nIci : $u(n) = 25 + 7n$.\n⛔ Le piège : intervertir et écrire $7 + 25n$. Le nombre multiplié par $n$, c'est la raison.\nRéponse : $u(n) = 25 + 7n$.",
          micros: ["suiteT_arith_explicite"],
        },
        {
          enonce:
            "Une suite arithmétique a pour premier terme $u(0) = 100$ et pour raison $r = -8$. Écris $u(n)$ en fonction de $n$.",
          reponses: [{ attendu: "100 - 8n" }],
          correction:
            "$u(n) = u(0) + n \\times r = 100 + n \\times (-8)$.\nDonc $u(n) = 100 - 8n$.\n⛔ Le piège : oublier le signe et écrire $100 + 8n$. Une raison négative fait descendre la suite.\nRéponse : $u(n) = 100 - 8n$.",
          micros: ["suiteT_arith_explicite"],
        },
        {
          enonce:
            "Une suite a pour terme général $u(n) = 12n + 40$. Que vaut $u(20)$ ?",
          reponses: [{ attendu: "280" }],
          correction:
            "Le terme général donne chaque terme directement : on remplace $n$ par 20.\n$u(20) = 12 \\times 20 + 40 = 240 + 40 = 280$.\n⛔ Le piège : calculer les 20 termes un par un. Le terme général sert justement à sauter au rang voulu.\nRéponse : 280.",
          micros: ["suiteT_arith_explicite"],
        },
        {
          enonce:
            "Une suite géométrique a pour premier terme $u(0) = 500$ et pour raison $q = 1{,}2$. Écris $u(n)$ en fonction de $n$.",
          reponses: [{ attendu: "500 × 1,2^n" }],
          correction:
            "Pour une suite géométrique : $u(n) = u(0) \\times q^n$.\nIci : $u(n) = 500 \\times 1{,}2^n$.\n⛔ Le piège : écrire $500 \\times 1{,}2 \\times n$. L'exposant compte les multiplications : on élève à la puissance $n$, on ne multiplie pas par $n$.\nRéponse : $u(n) = 500 \\times 1{,}2^n$.",
          micros: ["suiteT_geo_explicite"],
        },
        {
          enonce:
            "Une suite géométrique a pour terme général $u(n) = 800 \\times 0{,}5^n$. Que vaut $u(3)$ ?",
          reponses: [{ attendu: "100" }],
          correction:
            "On remplace $n$ par 3 : $u(3) = 800 \\times 0{,}5^3$.\n$0{,}5^3 = 0{,}125$, donc $u(3) = 800 \\times 0{,}125 = 100$.\n⛔ Le piège : calculer $800 \\times 0{,}5 \\times 3 = 1\\,200$. Avec une raison 0,5, la suite doit baisser : 1 200 doit alerter.\nRéponse : 100.",
          micros: ["suiteT_geo_explicite"],
        },
        {
          enonce:
            "Le tableau donne les termes d'une suite géométrique. Quelle est sa raison ?",
          figure: tableau(["n", "0", "1", "2", "3"], ["u(n)", 200, 300, 450, 675]),
          reponses: [{ attendu: "1,5" }],
          correction:
            "La raison est le quotient de deux termes consécutifs : $300 \\div 200 = 1{,}5$.\nOn vérifie sur une autre paire : $450 \\div 300 = 1{,}5$.\n⛔ Le piège : faire la différence ($300 - 200 = 100$). La différence sert pour une suite arithmétique.\nRéponse : 1,5.",
          micros: ["suiteT_raison_modele"],
        },
        {
          enonce:
            "Donne la raison de la suite qui modélise chaque évolution.\na) Une ville gagne 120 habitants par an.\nb) Le prix d'un article baisse de 5 % par an.",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "0,95" },
          ],
          correction:
            "a) On ajoute 120 : suite arithmétique de raison $r = 120$.\nb) Une baisse de 5 % multiplie par $1 - 0{,}05 = 0{,}95$ : suite géométrique de raison $q = 0{,}95$.\n⛔ Le piège au b) : répondre 0,05 ou −5. Une raison géométrique est le coefficient multiplicateur.\nRéponse : a) 120 ; b) 0,95.",
          micros: ["suiteT_raison_modele"],
        },
        {
          enonce:
            "Les nombres 5, 12 et 19 sont-ils les termes consécutifs d'une suite ? Réponds arithmétique, géométrique ou aucune.",
          reponses: [{ attendu: ARITH }],
          correction:
            "Différences : $12 - 5 = 7$ et $19 - 12 = 7$. Elles sont égales.\nQuotients : $12 \\div 5 = 2{,}4$ et $19 \\div 12 \\approx 1{,}58$. Ils sont différents.\nCes trois nombres sont donc arithmétiques, de raison 7.\n⛔ Le piège : ne tester qu'une seule différence. Il faut comparer les DEUX écarts.\nRéponse : arithmétique.",
          micros: ["suiteT_trois_termes"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : trouver la raison, écrire l'expression, l'utiliser pour un rang lointain.",
      rappel: [
        "Le rang d'une année : année cherchée moins année de $u(0)$. On remplace ensuite $n$ dans l'expression.",
        "L'égalité se lit dans les deux sens : si $u(n) = u(0) \\times q^n$, alors $u(0) = u(n) \\div q^n$.",
        "De même, si $u(n) = u(0) + n \\times r$, alors $r = (u(n) - u(0)) \\div n$.",
      ],
      exercices: [
        {
          enonce:
            "Un élu suit les bornes de recharge de sa commune : 60 en 2024, puis 12 de plus par an (modèle). On note $u(n)$ le nombre de bornes pour l'année $2024 + n$.\na) Quelle est la raison ?\nb) Écris $u(n)$ en fonction de $n$.\nc) Combien de bornes le modèle prévoit-il en 2035 ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "60 + 12n" },
            { question: "c)", attendu: "192" },
          ],
          correction:
            "a) On ajoute 12 par an : $r = 12$.\nb) $u(n) = 60 + 12n$.\nc) 2035, c'est le rang $2035 - 2024 = 11$. $u(11) = 60 + 12 \\times 11 = 60 + 132 = 192$.\n⛔ Le piège au c) : remplacer $n$ par 2035. Le rang n'est pas l'année.\nRéponse : a) 12 ; b) $u(n) = 60 + 12n$ ; c) 192 bornes.",
          micros: ["suiteT_arith_explicite", "suiteT_raison_modele"],
        },
        {
          enonce:
            "Une animatrice lance un podcast avec 2 000 abonnés. Le nombre d'abonnés progresse de 25 % par an (modèle). On note $u(n)$ le nombre d'abonnés au bout de $n$ années.\na) Quelle est la raison de la suite géométrique ?\nb) Écris $u(n)$ en fonction de $n$.\nc) Combien d'abonnés au bout de 6 ans, à l'unité près ?",
          reponses: [
            { question: "a)", attendu: "1,25" },
            { question: "b)", attendu: "2 000 × 1,25^n" },
            { question: "c)", attendu: "7 629", tolerance: 0.5 },
          ],
          correction:
            "a) Une hausse de 25 % donne $q = 1{,}25$.\nb) $u(n) = 2\\,000 \\times 1{,}25^n$.\nc) $u(6) = 2\\,000 \\times 1{,}25^6 \\approx 7\\,629{,}39$, soit environ $7\\,629$ abonnés.\n⛔ Le piège au c) : calculer $2\\,000 \\times 1{,}25 \\times 6 = 15\\,000$. Une raison géométrique se compose par puissances, pas par produits.\nRéponse : a) 1,25 ; b) $u(n) = 2\\,000 \\times 1{,}25^n$ ; c) 7 629 abonnés.",
          micros: ["suiteT_geo_explicite", "suiteT_raison_modele"],
        },
        {
          enonce:
            "Un exploitant agricole achète un tracteur 40 000 €. Sa valeur baisse de 10 % par an (modèle).\na) Écris $u(n)$, la valeur au bout de $n$ années.\nb) Que vaut le tracteur au bout de 5 ans ?",
          reponses: [
            { question: "a)", attendu: "40 000 × 0,9^n" },
            { question: "b)", attendu: "23 619,60 €" },
          ],
          correction:
            "a) Une baisse de 10 % donne $q = 0{,}9$ : $u(n) = 40\\,000 \\times 0{,}9^n$.\nb) $u(5) = 40\\,000 \\times 0{,}9^5 = 40\\,000 \\times 0{,}59049 = 23\\,619{,}60$ €.\n⛔ Le piège au b) : enlever 50 % en tout ($5 \\times 10$), soit 20 000 €. Chaque baisse porte sur la valeur déjà diminuée.\nRéponse : a) $u(n) = 40\\,000 \\times 0{,}9^n$ ; b) 23 619,60 €.",
          micros: ["suiteT_geo_explicite"],
        },
        {
          enonce:
            "Une biologiste observe une culture de cellules qui suit une suite géométrique de raison 2 (situation fictive). Au bout de 4 jours, elle compte 3 200 cellules. Combien y en avait-il au départ ?",
          reponses: [{ attendu: "200" }],
          correction:
            "De $u(4) = u(0) \\times 2^4$, on tire $u(0) = u(4) \\div 2^4$.\n$2^4 = 16$, donc $u(0) = 3\\,200 \\div 16 = 200$.\nVérification : $200 \\times 16 = 3\\,200$. ✔\n⛔ Le piège : diviser par $2 \\times 4 = 8$, ce qui donne 400. On doit diviser par $2^4$.\nRéponse : 200 cellules.",
          micros: ["suiteT_raison_modele"],
        },
        {
          enonce:
            "Un technicien relève un compteur d'eau. Il indique 150 m³ au départ, et 350 m³ au bout de 10 mois, avec la même consommation chaque mois (modèle). On note $u(n)$ l'index du compteur au bout de $n$ mois.\na) Quelle est la raison de cette suite arithmétique ?\nb) Écris $u(n)$ en fonction de $n$.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "150 + 20n" },
          ],
          correction:
            "a) $r = (350 - 150) \\div 10 = 200 \\div 10 = 20$.\nb) $u(n) = 150 + 20n$.\nVérification : $u(10) = 150 + 200 = 350$. ✔\n⛔ Le piège au a) : calculer $350 \\div 10 = 35$. Le compteur ne partait pas de 0 : on divise l'AUGMENTATION.\nRéponse : a) 20 ; b) $u(n) = 150 + 20n$.",
          micros: ["suiteT_arith_explicite", "suiteT_raison_modele"],
        },
        {
          enonce:
            "Une forestière mesure un jeune arbre trois années de suite : 4 m, 6 m, puis 9 m (situation fictive).\na) Donne les deux différences, dans l'ordre, séparées par un point-virgule.\nb) Donne les deux quotients, dans l'ordre, séparés par un point-virgule.\nc) Ces trois nombres sont-ils arithmétiques, géométriques, ou aucun des deux ? Réponds arithmétique, géométrique ou aucune.",
          reponses: [
            { question: "a)", attendu: "2 ; 3", ordre: true },
            { question: "b)", attendu: "1,5 ; 1,5", ordre: true },
            { question: "c)", attendu: GEO },
          ],
          correction:
            "a) $6 - 4 = 2$ et $9 - 6 = 3$ : différentes, ce n'est pas arithmétique.\nb) $6 \\div 4 = 1{,}5$ et $9 \\div 6 = 1{,}5$ : égaux.\nc) Géométrique, de raison 1,5.\n⛔ Le piège : conclure « aucune » dès que les différences ne sont pas égales. Il faut mener les DEUX tests.\nRéponse : a) 2 ; 3 ; b) 1,5 ; 1,5 ; c) géométrique.",
          micros: ["suiteT_trois_termes"],
        },
        {
          enonce:
            "Une billetterie de théâtre teste deux séries de prix. Réponds arithmétique, géométrique ou aucune.\na) 8 €, 12 €, 20 €.\nb) 6 €, 18 €, 54 €.",
          reponses: [
            { question: "a)", attendu: AUCUNE },
            { question: "b)", attendu: GEO },
          ],
          correction:
            "a) Différences : 4 et 8, différentes. Quotients : $12 \\div 8 = 1{,}5$ et $20 \\div 12 \\approx 1{,}67$, différents. Aucune.\nb) Différences : 12 et 36, différentes. Quotients : $18 \\div 6 = 3$ et $54 \\div 18 = 3$, égaux. Géométrique, de raison 3.\n⛔ Le piège au a) : dire « géométrique » parce que les nombres montent vite. Seuls les deux quotients décident.\nRéponse : a) aucune ; b) géométrique.",
          micros: ["suiteT_trois_termes"],
        },
        {
          enonce:
            "Une ingénieure du littoral étudie une digue. En 2025, sa crête domine le niveau moyen de la mer de 900 mm. Selon son modèle, cette marge perd 4 mm par an. On note $u(n)$ la marge pour l'année $2025 + n$.\na) Écris $u(n)$ en fonction de $n$.\nb) Que vaudra la marge en 2075 ?",
          reponses: [
            { question: "a)", attendu: "900 - 4n" },
            { question: "b)", attendu: "700 mm" },
          ],
          correction:
            "a) La raison est négative, $r = -4$ : $u(n) = 900 - 4n$.\nb) 2075, c'est le rang $2075 - 2025 = 50$. $u(50) = 900 - 4 \\times 50 = 900 - 200 = 700$ mm.\n⛔ Le piège au b) : prendre le rang 75, en lisant seulement la fin de l'année.\nRéponse : a) $u(n) = 900 - 4n$ ; b) 700 mm.",
          micros: ["suiteT_arith_explicite"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on reconnaît la suite à partir des relevés, on écrit l'expression, on répond à la question.",
      rappel: [
        "Pour reconnaître une suite à partir de trois relevés, on mène les deux tests, différences et quotients.",
        "On écrit ensuite l'expression, et on remplace $n$ par le rang voulu, à la calculatrice.",
        "Pour dépasser un objectif, on résout l'inégalité dans le cas arithmétique, en arrondissant à l'entier supérieur.",
      ],
      exercices: [
        {
          titre: "Les prêts de la bibliothèque",
          enonce:
            "Le directeur d'une bibliothèque relève le nombre de prêts : 2 500 en 2022, 2 650 en 2023, 2 809 en 2024 (situation fictive). On note $u(n)$ le nombre de prêts pour l'année $2022 + n$.\na) Donne les deux quotients, dans l'ordre, séparés par un point-virgule.\nb) Quelle est la nature de ces trois nombres ? Réponds arithmétique, géométrique ou aucune.\nc) Écris $u(n)$ en fonction de $n$.\nd) Quel nombre de prêts prévoit-il pour 2032, à l'unité près ?",
          reponses: [
            { question: "a)", attendu: "1,06 ; 1,06", ordre: true },
            { question: "b)", attendu: GEO },
            { question: "c)", attendu: "2 500 × 1,06^n" },
            { question: "d)", attendu: "4 477", tolerance: 0.5 },
          ],
          correction:
            "a) $2\\,650 \\div 2\\,500 = 1{,}06$ et $2\\,809 \\div 2\\,650 = 1{,}06$.\nb) Les deux quotients sont égaux : géométrique. (Les différences, 150 et 159, ne le sont pas.)\nc) $u(n) = 2\\,500 \\times 1{,}06^n$.\nd) 2032, c'est le rang 10 : $u(10) = 2\\,500 \\times 1{,}06^{10} \\approx 4\\,477{,}12$, soit environ $4\\,477$ prêts.\n⛔ Le piège au b) : voir 150 de plus la première année et conclure arithmétique sans tester l'année suivante.\nRéponse : a) 1,06 ; 1,06 ; b) géométrique ; c) $u(n) = 2\\,500 \\times 1{,}06^n$ ; d) 4 477 prêts.",
          micros: ["suiteT_trois_termes", "suiteT_raison_modele", "suiteT_geo_explicite"],
        },
        {
          titre: "Le plan vélo",
          enonce:
            "Une urbaniste suit les pistes cyclables de sa ville. On note $u(n)$ la longueur en km pour l'année $2020 + n$ (situation fictive).\na) Quelle est la nature de ces trois relevés ? Réponds arithmétique, géométrique ou aucune.\nb) Écris $u(n)$ en fonction de $n$.\nc) Quelle longueur le modèle prévoit-il en 2030 ?\nd) En quelle année les pistes dépasseront-elles 200 km ?",
          figure: grille(["Année", "Longueur (km)"], [
            [2020, 40],
            [2021, 52],
            [2022, 64],
          ]),
          reponses: [
            { question: "a)", attendu: ARITH },
            { question: "b)", attendu: "40 + 12n" },
            { question: "c)", attendu: "160 km" },
            { question: "d)", attendu: "2034" },
          ],
          correction:
            "a) $52 - 40 = 12$ et $64 - 52 = 12$ : arithmétique, de raison 12.\nb) $u(n) = 40 + 12n$.\nc) 2030, c'est le rang 10 : $u(10) = 40 + 120 = 160$ km.\nd) $40 + 12n > 200$ donne $12n > 160$, puis $n > 13{,}33…$ : il faut $n = 14$, soit l'année $2020 + 14 = 2034$.\n⛔ Le piège au d) : répondre le rang 14 au lieu de l'année, ou arrondir à 13 : $u(13) = 196$ ne dépasse pas 200.\nRéponse : a) arithmétique ; b) $u(n) = 40 + 12n$ ; c) 160 km ; d) 2034.",
          micros: ["suiteT_trois_termes", "suiteT_arith_explicite"],
        },
        {
          titre: "La dose en médecine nucléaire",
          enonce:
            "Une manipulatrice radio utilise un produit dont l'activité est divisée par 2 toutes les 6 heures (modèle). On note $u(n)$ l'activité après $n$ périodes de 6 heures, avec $u(0) = 800$ unités.\na) Quelle est la raison ?\nb) Écris $u(n)$ en fonction de $n$.\nc) Que vaut l'activité après 24 heures ?\nd) Pour un autre patient, il reste 15 unités après 5 périodes. Quelle était l'activité de départ ?",
          reponses: [
            { question: "a)", attendu: "0,5" },
            { question: "b)", attendu: "800 × 0,5^n" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "480" },
          ],
          correction:
            "a) Diviser par 2, c'est multiplier par 0,5 : $q = 0{,}5$.\nb) $u(n) = 800 \\times 0{,}5^n$.\nc) 24 heures, c'est $24 \\div 6 = 4$ périodes. $u(4) = 800 \\times 0{,}5^4 = 800 \\times 0{,}0625 = 50$.\nd) $u(0) = 15 \\div 0{,}5^5 = 15 \\div 0{,}03125 = 480$.\n⛔ Le piège au c) : prendre $n = 24$. Le rang compte les périodes de 6 heures, pas les heures.\nRéponse : a) 0,5 ; b) $u(n) = 800 \\times 0{,}5^n$ ; c) 50 unités ; d) 480 unités.",
          micros: ["suiteT_geo_explicite", "suiteT_raison_modele"],
        },
        {
          titre: "Deux gérants, deux modèles",
          enonce:
            "Deux gérants partent du même chiffre d'affaires, 300 k€. Le magasin de Lucas gagne 40 k€ par an. Celui de Paloma progresse de 10 % par an (modèles). On compte $n$ en années.\na) Écris le terme général $L(n)$ du magasin de Lucas.\nb) Écris le terme général $P(n)$ du magasin de Paloma.\nc) Que vaut $L(8)$ ?\nd) Que vaut $P(8)$, à l'unité près ?\ne) Qui est devant au bout de 8 ans ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: "300 + 40n" },
            { question: "b)", attendu: "300 × 1,1^n" },
            { question: "c)", attendu: "620" },
            { question: "d)", attendu: "643", tolerance: 0.5 },
            { question: "e)", attendu: "Paloma" },
          ],
          correction:
            "a) On ajoute 40 : $L(n) = 300 + 40n$.\nb) On multiplie par 1,1 : $P(n) = 300 \\times 1{,}1^n$.\nc) $L(8) = 300 + 40 \\times 8 = 620$ k€.\nd) $P(8) = 300 \\times 1{,}1^8 \\approx 643{,}08$, soit environ 643 k€.\ne) 643 est plus grand que 620 : Paloma est devant.\n⛔ Le piège : croire que 10 % de 300, soit 30 k€ par an, restera toujours moins que 40 k€. Le pourcentage porte chaque année sur un montant plus gros.\nRéponse : a) $300 + 40n$ ; b) $300 \\times 1{,}1^n$ ; c) 620 ; d) 643 ; e) Paloma.",
          micros: ["suiteT_arith_explicite", "suiteT_geo_explicite"],
        },
      ],
    },
  ],
};
