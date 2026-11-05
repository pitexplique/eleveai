// ─── Fiche d'exercices : résoudre x² = c et x³ = c (STMG) — 20 exercices ────────
//
// Notion fct_equations_puissance du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : x² = c avec c > 0 (deux solutions opposées, une seule garde un sens
// pour une longueur), x³ = c (une seule solution), la notation c^(1/3), la valeur
// exacte et l'arrondi à la calculatrice, et s'y ramener : kx² = c, x² + b = c,
// kx³ = c, x³ + b = c. Pas de c négatif, pas de racine n-ième.
//
// ⛔ Le clavier maths du site n'a pas de touche ∛ : l'élève écrit 50^(1/3). Les
// deux formes sont acceptées.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : architecture (architecte), emballage (ex. 5) et calculs
// nus en ★ ; carrelage (carreleur), jardin (paysagiste), viticulture (vigneronne),
// cosmétique (directeur d'usine), design (designer), correction de copies
// (correctrice), plongeon (entraîneuse), piscine (pisciniste) ; logistique
// (logisticien), parc animalier (soigneuse), maraîchage (maraîchère),
// brasserie (brasseur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fct_eq_carre (1, 2, 3, 9, 10, 15, 16, 18), fct_eq_cube
// (4, 5, 11, 12, 14, 16, 17, 18, 20), fct_eq_racine_cubique (6, 7, 8, 13, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesFctEquationsPuissanceStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-equations-puissance",
  titre: "Résoudre x² = c et x³ = c",
  accroche:
    "Vingt exercices pour ne plus confondre le carré et le cube : deux solutions opposées d'un côté, une seule de l'autre. Retrouver un côté à partir d'une aire, une arête à partir d'un volume, écrire une racine cubique et l'arrondir à la calculatrice. Une cuve de vigneronne, un plongeon, une caisse de logisticien, un parc animalier. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : résoudre une équation, ou écrire une racine cubique.",
      rappel: [
        "Pour $c > 0$, l'équation $x^2 = c$ a DEUX solutions opposées : $\\sqrt{c}$ et $-\\sqrt{c}$. Dans un problème de longueur, on garde la positive.",
        "L'équation $x^3 = c$ a UNE seule solution : la racine cubique de $c$, le nombre dont le cube vaut $c$.",
        "La racine cubique de $c$ se note $\\sqrt[3]{c}$ ou $c^{\\frac{1}{3}}$. Au clavier et à la calculatrice : la touche puissance, puis la fraction 1 sur 3.",
        "Pour plusieurs réponses, on les sépare par un point-virgule : 8 ; -8.",
      ],
      exercices: [
        {
          enonce: "Résous l'équation $x^2 = 49$. Donne les deux solutions.",
          reponses: [{ attendu: "7 ; -7" }],
          correction:
            "$7^2 = 49$, et aussi $(-7)^2 = 49$ : deux nombres opposés ont le même carré.\nLes solutions sont 7 et $-7$.\n⛔ Le piège : ne garder que 7. Rien ici n'oblige à écarter la solution négative.\nRéponse : 7 et $-7$.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce: "Résous l'équation $x^2 = 7$. Donne les valeurs exactes des deux solutions.",
          reponses: [{ attendu: "√7 ; -√7" }],
          correction:
            "7 n'est pas le carré d'un entier : les solutions s'écrivent avec une racine carrée.\n$x = \\sqrt{7}$ ou $x = -\\sqrt{7}$.\n⛔ Le piège : répondre $x = 3{,}5$. Élever au carré, ce n'est pas multiplier par 2.\nRéponse : $\\sqrt{7}$ et $-\\sqrt{7}$.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce: "Une architecte dessine un local carré de 81 m². Quelle est la longueur de son côté, en mètres ?",
          reponses: [{ attendu: "9 m" }],
          correction:
            "L'aire d'un carré de côté $x$ vaut $x^2$ : on résout $x^2 = 81$.\nLes solutions sont 9 et $-9$.\nUne longueur est positive : on garde 9.\n⛔ Le piège : diviser 81 par 2 ou par 4. L'aire n'est ni le double du côté, ni son périmètre.\nRéponse : 9 m.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce: "Résous l'équation $x^3 = 27$.",
          reponses: [{ attendu: "3" }],
          correction:
            "On cherche le nombre dont le cube vaut 27 : $3 \\times 3 \\times 3 = 27$.\nLa seule solution est 3.\n⛔ Le piège : ajouter $-3$ comme pour le carré. Or $(-3)^3 = -27$ : le cube garde le signe.\nRéponse : 3.",
          micros: ["fct_eq_cube"],
        },
        {
          enonce: "Une boîte d'emballage est un cube de 125 cm³. Quelle est la longueur de son arête, en cm ?",
          reponses: [{ attendu: "5 cm" }],
          correction:
            "Le volume d'un cube d'arête $x$ vaut $x^3$ : on résout $x^3 = 125$.\n$5 \\times 5 \\times 5 = 125$, donc $x = 5$.\n⛔ Le piège : diviser 125 par 3. Le 3 de $x^3$ est un exposant, pas un facteur.\nRéponse : 5 cm.",
          micros: ["fct_eq_cube"],
        },
        {
          enonce: "Que vaut $64^{\\frac{1}{3}}$ ?",
          reponses: [{ attendu: "4" }],
          correction:
            "L'exposant $\\dfrac{1}{3}$ désigne la racine cubique : on cherche le nombre dont le cube vaut 64.\n$4 \\times 4 \\times 4 = 64$, donc $64^{\\frac{1}{3}} = 4$.\n⛔ Le piège : calculer $64 \\div 3$. Élever à la puissance $\\dfrac{1}{3}$, ce n'est pas diviser par 3.\nRéponse : 4.",
          micros: ["fct_eq_racine_cubique"],
        },
        {
          enonce: "Donne la solution exacte de l'équation $x^3 = 50$. Écris-la avec l'exposant $\\dfrac{1}{3}$.",
          reponses: [{ attendu: ["50^(1/3)", "∛50", "∛(50)"] }],
          correction:
            "50 n'est pas le cube d'un entier : la solution ne s'écrit pas simplement.\nLa valeur exacte est la racine cubique de 50 : $x = 50^{\\frac{1}{3}}$, c'est-à-dire $\\sqrt[3]{50}$.\n⛔ Le piège : donner un arrondi comme 3,68. On demande la valeur EXACTE, pas une valeur de calculatrice.\nRéponse : $50^{\\frac{1}{3}}$.",
          micros: ["fct_eq_racine_cubique"],
        },
        {
          enonce: "Donne l'arrondi au dixième de la solution de l'équation $x^3 = 90$.",
          reponses: [{ attendu: "4,5" }],
          correction:
            "À la calculatrice, on calcule $90^{\\frac{1}{3}}$, et on lit environ 4,481.\nAu dixième, cela donne 4,5.\nVérification : $4{,}5^3 \\approx 91{,}1$, proche de 90. ✔\n⛔ Le piège : calculer $90 \\div 3 = 30$. Vérifie toujours en élevant au cube.\nRéponse : environ 4,5.",
          micros: ["fct_eq_racine_cubique"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "D'abord se ramener à une équation simple, puis résoudre, puis regarder ce que veut dire la solution.",
      rappel: [
        "On isole d'abord la puissance. $2x^2 = 18$ : on divise par 2. $x^2 + 7 = 23$ : on retire 7.",
        "Ensuite on résout : deux solutions pour le carré, une seule pour le cube.",
        "Une longueur ou une durée est positive : dans ces problèmes, on écarte la solution négative.",
      ],
      exercices: [
        {
          enonce:
            "Un carreleur couvre une salle faite de 3 carrés identiques de côté $x$ mètres (modèle). L'aire totale est de 48 m².\na) Que vaut $x^2$ ?\nb) Donne les deux solutions de l'équation $3x^2 = 48$.\nc) Quelle est la longueur du côté, en mètres ?",
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "4 ; -4" },
            { question: "c)", attendu: "4 m" },
          ],
          correction:
            "a) L'aire totale est $3x^2 = 48$. On divise par 3 : $x^2 = 16$.\nb) Les solutions de $x^2 = 16$ sont 4 et $-4$.\nc) Une longueur est positive : le côté mesure 4 m.\n⛔ Le piège au a) : prendre la racine de 48 sans diviser d'abord par 3.\nRéponse : a) 16 ; b) 4 et $-4$ ; c) 4 m.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce:
            "Un paysagiste prévoit un jardin carré de côté $x$ mètres et une allée de 10 m² (modèle). L'ensemble fait 35 m² : $x^2 + 10 = 35$.\na) Que vaut $x^2$ ?\nb) Quelle est la longueur du côté du jardin, en mètres ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "5 m" },
          ],
          correction:
            "a) On retire 10 des deux côtés : $x^2 = 35 - 10 = 25$.\nb) Les solutions sont 5 et $-5$. Une longueur est positive : 5 m.\n⛔ Le piège au a) : ajouter 10 au lieu de le retirer, ce qui donne $x^2 = 45$.\nRéponse : a) 25 ; b) 5 m.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce:
            "Une vigneronne commande une cuve en forme de pavé droit, de dimensions $x$, $x$ et $2x$ en mètres (modèle). Son volume est de 54 m³.\na) Que vaut $x^3$ ?\nb) Que vaut $x$, en mètres ?\nc) Donne les trois dimensions de la cuve, dans l'ordre $x$, $x$, $2x$.",
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "3 m" },
            { question: "c)", attendu: "3 ; 3 ; 6", ordre: true },
          ],
          correction:
            "a) Le volume est le produit des trois dimensions : $x \\times x \\times 2x = 2x^3$.\n$2x^3 = 54$, donc $x^3 = 27$.\nb) $3 \\times 3 \\times 3 = 27$, donc $x = 3$ m.\nc) Les dimensions sont 3 m, 3 m et 6 m. Vérification : $3 \\times 3 \\times 6 = 54$. ✔\n⛔ Le piège au a) : oublier le 2 et résoudre $x^3 = 54$.\nRéponse : a) 27 ; b) 3 m ; c) 3 ; 3 ; 6.",
          micros: ["fct_eq_cube"],
        },
        {
          enonce:
            "Le directeur d'une usine de cosmétiques modélise le coût de fabrication de $x$ centaines de flacons par $C(x) = x^3 + 20$, en milliers d'euros.\na) On veut que le coût atteigne 84 milliers d'euros. Que vaut $x^3$ ?\nb) Combien de centaines de flacons cela représente-t-il ?\nc) Calcule $C(5)$.",
          reponses: [
            { question: "a)", attendu: "64" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "145" },
          ],
          correction:
            "a) $x^3 + 20 = 84$, donc $x^3 = 84 - 20 = 64$.\nb) $4 \\times 4 \\times 4 = 64$, donc $x = 4$ : 4 centaines de flacons.\nc) $C(5) = 5^3 + 20 = 125 + 20 = 145$.\n⛔ Le piège au a) : prendre directement la racine cubique de 84, sans retirer la partie fixe.\nRéponse : a) 64 ; b) 4 ; c) 145.",
          micros: ["fct_eq_cube"],
        },
        {
          enonce:
            "Un designer conçoit un flacon cubique de 200 cm³ (modèle).\na) Donne la valeur exacte de son arête, écrite avec l'exposant $\\dfrac{1}{3}$.\nb) Donne cette arête arrondie au dixième de cm.\nc) Vérifie : élève au cube l'arrondi du b), puis arrondis au dixième.",
          reponses: [
            { question: "a)", attendu: ["200^(1/3)", "∛200", "∛(200)"] },
            { question: "b)", attendu: "5,8 cm" },
            { question: "c)", attendu: "195,1", tolerance: 0.05 },
          ],
          correction:
            "a) L'arête $x$ vérifie $x^3 = 200$ : $x = 200^{\\frac{1}{3}}$, soit $\\sqrt[3]{200}$.\nb) À la calculatrice, $200^{\\frac{1}{3}} \\approx 5{,}848$, soit 5,8 cm au dixième.\nc) $5{,}8^3 = 195{,}112$, soit 195,1 : c'est proche de 200, car 5,8 est un arrondi.\n⛔ Le piège au b) : prendre la racine carrée ($\\sqrt{200} \\approx 14{,}1$). Pour un volume, c'est la racine CUBIQUE.\nRéponse : a) $200^{\\frac{1}{3}}$ ; b) 5,8 cm ; c) 195,1.",
          micros: ["fct_eq_racine_cubique"],
        },
        {
          enonce:
            "Une correctrice lit dans la copie de Yanis : « $x^3 = 8$, donc $x = 2$ ou $x = -2$ ».\na) Calcule $(-2)^3$.\nb) La copie a-t-elle raison ? Réponds vrai ou faux.\nc) Quelle est la seule solution de $x^3 = 8$ ?",
          reponses: [
            { question: "a)", attendu: "-8" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) $(-2)^3 = (-2) \\times (-2) \\times (-2) = 4 \\times (-2) = -8$.\nb) $-8$ n'est pas 8 : $-2$ n'est pas solution. C'est faux.\nc) La seule solution est 2, car $2^3 = 8$.\n⛔ Le piège : appliquer au cube la règle du carré. Le cube conserve le signe, il n'y a donc qu'une solution.\nRéponse : a) $-8$ ; b) faux ; c) 2.",
          micros: ["fct_eq_cube"],
        },
        {
          enonce:
            "Une entraîneuse de plongeon utilise le modèle $h = 5x^2$ : en tombant de $h$ mètres, on met $x$ secondes pour arriver à l'eau.\na) Depuis 20 m, que vaut $x^2$ ?\nb) Depuis 20 m, combien de secondes dure le saut ?\nc) Depuis 45 m, combien de secondes dure le saut ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2 s" },
            { question: "c)", attendu: "3 s" },
          ],
          correction:
            "a) $5x^2 = 20$, donc $x^2 = 20 \\div 5 = 4$.\nb) Les solutions sont 2 et $-2$. Une durée est positive : 2 s.\nc) $5x^2 = 45$, donc $x^2 = 9$ et $x = 3$ s.\n⛔ Le piège : croire qu'une hauteur plus de deux fois plus grande donne une durée plus de deux fois plus longue. Ici, 45 m ne prend que 3 s.\nRéponse : a) 4 ; b) 2 s ; c) 3 s.",
          micros: ["fct_eq_carre"],
        },
        {
          enonce:
            "Un pisciniste, Diego, compare deux bassins (modèle). Le premier est carré, de 36 m². Le second est une cuve cubique de 216 m³.\na) Donne les deux solutions de $x^2 = 36$.\nb) Quelle est la longueur du côté du premier bassin, en mètres ?\nc) Quelle est la longueur de l'arête de la cuve, en mètres ?\nd) Combien l'équation $x^3 = 216$ a-t-elle de solutions ?",
          reponses: [
            { question: "a)", attendu: "6 ; -6" },
            { question: "b)", attendu: "6 m" },
            { question: "c)", attendu: "6 m" },
            { question: "d)", attendu: "1" },
          ],
          correction:
            "a) $6^2 = 36$ et $(-6)^2 = 36$ : les solutions sont 6 et $-6$.\nb) Une longueur est positive : 6 m.\nc) $6 \\times 6 \\times 6 = 216$ : l'arête mesure 6 m.\nd) Une seule : $(-6)^3 = -216$, qui n'est pas 216.\n⛔ Le piège au d) : répondre 2. Le carré a deux solutions, le cube n'en a qu'une.\nRéponse : a) 6 et $-6$ ; b) 6 m ; c) 6 m ; d) 1.",
          micros: ["fct_eq_carre", "fct_eq_cube"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on écrit l'équation, on se ramène à une puissance seule, on résout et on interprète.",
      rappel: [
        "On écrit l'équation, on isole la puissance, puis on résout.",
        "Une longueur est positive : pour $x^2 = c$, on garde $\\sqrt{c}$. Pour $x^3 = c$, il n'y a qu'une solution.",
        "Si le résultat ne tombe pas juste : la valeur exacte s'écrit avec l'exposant $\\dfrac{1}{3}$, puis on arrondit à la calculatrice.",
      ],
      exercices: [
        {
          titre: "Les caisses du logisticien",
          enonce:
            "Un logisticien range des caisses cubiques de 64 dm³ (modèle).\na) Quelle est l'arête d'une caisse, en dm ?\nb) Il assemble 8 caisses en un grand cube. Quel est le volume du grand cube, en dm³ ?\nc) Quelle est l'arête du grand cube, en dm ?\nd) Par combien l'arête a-t-elle été multipliée ?",
          reponses: [
            { question: "a)", attendu: "4 dm" },
            { question: "b)", attendu: "512 dm³" },
            { question: "c)", attendu: "8 dm" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "a) $x^3 = 64$, et $4 \\times 4 \\times 4 = 64$ : l'arête mesure 4 dm.\nb) $8 \\times 64 = 512$ dm³.\nc) $x^3 = 512$, et $8 \\times 8 \\times 8 = 512$ : l'arête mesure 8 dm.\nd) $8 \\div 4 = 2$.\n⛔ Le piège au d) : répondre 8. Le VOLUME est multiplié par 8, l'arête seulement par 2, car $2^3 = 8$.\nRéponse : a) 4 dm ; b) 512 dm³ ; c) 8 dm ; d) 2.",
          micros: ["fct_eq_cube"],
        },
        {
          titre: "L'enclos des loutres",
          enonce:
            "Une soigneuse aménage l'enclos des loutres d'un parc animalier (modèle). Il comprend un terrain carré de côté $x$ mètres et un abri de 14 m² : l'ensemble fait 135 m². Elle installe aussi 3 bassins cubiques identiques, d'arête $t$ mètres, pour un volume total de 81 m³.\na) Que vaut $x^2$ ?\nb) Quelle est la longueur du côté du terrain, en mètres ?\nc) Que vaut $t^3$ ?\nd) Quelle est l'arête d'un bassin, en mètres ?\ne) Le parc ajoute un autre bassin cubique, de 30 m³. Donne son arête, arrondie au dixième de mètre.",
          reponses: [
            { question: "a)", attendu: "121" },
            { question: "b)", attendu: "11 m" },
            { question: "c)", attendu: "27" },
            { question: "d)", attendu: "3 m" },
            { question: "e)", attendu: "3,1 m" },
          ],
          correction:
            "a) $x^2 + 14 = 135$. On retire 14 : $x^2 = 121$.\nb) Les solutions sont 11 et $-11$. Une longueur est positive : 11 m.\nc) $3t^3 = 81$. On divise par 3 : $t^3 = 27$.\nd) $3 \\times 3 \\times 3 = 27$, donc $t = 3$ m.\ne) L'arête vérifie $x^3 = 30$. À la calculatrice, $30^{\\frac{1}{3}} \\approx 3{,}107$, soit 3,1 m au dixième.\n⛔ Le piège au d) : prendre la racine cubique de 81 sans diviser d'abord par 3. Chaque bassin n'a que le tiers du volume.\nRéponse : a) 121 ; b) 11 m ; c) 27 ; d) 3 m ; e) 3,1 m.",
          micros: ["fct_eq_carre", "fct_eq_cube", "fct_eq_racine_cubique"],
        },
        {
          titre: "La citerne de la maraîchère",
          enonce:
            "Une maraîchère, Clémence, veut une citerne cubique de 5 m³ (modèle).\na) Donne la valeur exacte de l'arête, écrite avec l'exposant $\\dfrac{1}{3}$.\nb) Donne l'arête arrondie au centième de mètre.\nc) La porte de la remise fait 1,80 m de large. La citerne passe-t-elle ? Réponds oui ou non.\nd) Elle hésite avec une citerne cubique de 8 m³. Quelle est son arête, en mètres ?\ne) Cette citerne passe-t-elle par la porte ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["5^(1/3)", "∛5", "∛(5)"] },
            { question: "b)", attendu: "1,71 m" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "2 m" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) L'arête $x$ vérifie $x^3 = 5$ : $x = 5^{\\frac{1}{3}}$, soit $\\sqrt[3]{5}$.\nb) À la calculatrice, $5^{\\frac{1}{3}} \\approx 1{,}70998$, soit 1,71 m au centième.\nc) 1,71 est plus petit que 1,80 : elle passe.\nd) $2 \\times 2 \\times 2 = 8$ : l'arête mesure 2 m.\ne) 2 est plus grand que 1,80 : elle ne passe pas.\n⛔ Le piège au b) : arrondir à 1,70 en coupant les décimales. Le chiffre suivant est un 9 : on arrondit à 1,71.\nRéponse : a) $5^{\\frac{1}{3}}$ ; b) 1,71 m ; c) oui ; d) 2 m ; e) non.",
          micros: ["fct_eq_racine_cubique"],
        },
        {
          titre: "Le budget du brasseur",
          enonce:
            "Un brasseur modélise le coût d'une cuve cubique d'arête $x$ mètres par $C(x) = 2x^3 + 50$, en milliers d'euros (modèle).\na) Son budget est de 178 milliers d'euros. Quelle arête peut-il s'offrir, en mètres ?\nb) Avec 300 milliers d'euros, quelle arête peut-il s'offrir ?\nc) Avec 100 milliers d'euros, que vaut $x^3$ ?\nd) Avec 100 milliers d'euros, quelle est l'arête, arrondie au dixième de mètre ?",
          reponses: [
            { question: "a)", attendu: "4 m" },
            { question: "b)", attendu: "5 m" },
            { question: "c)", attendu: "25" },
            { question: "d)", attendu: "2,9 m" },
          ],
          correction:
            "a) $2x^3 + 50 = 178$. On retire 50 : $2x^3 = 128$. On divise par 2 : $x^3 = 64$, donc $x = 4$ m.\nb) $2x^3 = 250$, donc $x^3 = 125$ et $x = 5$ m.\nc) $2x^3 = 50$, donc $x^3 = 25$.\nd) $25^{\\frac{1}{3}} \\approx 2{,}924$, soit 2,9 m au dixième.\n⛔ Le piège au a) : diviser d'abord 178 par 2 sans retirer 50. On retire la partie fixe en premier.\nRéponse : a) 4 m ; b) 5 m ; c) 25 ; d) 2,9 m.",
          micros: ["fct_eq_cube", "fct_eq_racine_cubique"],
        },
      ],
    },
  ],
};
