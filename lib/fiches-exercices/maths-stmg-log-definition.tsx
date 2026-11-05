// ─── Fiche d'exercices : logarithme décimal, définition (STMG, Tle) — 20 exercices
//
// Notion log_definition du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/logarithme.bank.ts`). Le coach demande :
// log(b) est la solution de 10^x = b, l'encadrer entre deux entiers sans
// calculatrice, log(10^n) = n et log(x) = n ⇔ x = 10^n, la croissance (comparer
// deux log, résoudre log(x) > n). Logarithme DÉCIMAL seulement, jamais ln. Aucune
// propriété algébrique ici (produit, quotient : c'est la feuille log-proprietes).
//
// ⭐ DES FORMULES RÉELLES, aucune statistique :
//   · ex. 9 — niveau sonore : L = 10 × log(r), r = rapport d'intensité au seuil
//     d'audition (définition du décibel).
//   · ex. 10 — pH = −log(c), c = concentration en ions H⁺ en mol/L (définition
//     usuelle du pH, simplifiée).
//   · ex. 16 — magnitude M = log(r) : modèle simplifié de l'échelle de Richter.
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; son (ingénieure du son), chimie
// (laborantine), agroalimentaire (technicienne qualité), géographie (géographe),
// maintenance (technicienne), culture (médiatrice de musée), réseaux sociaux
// (community manager), sismologie (sismologue), presse (journaliste de données),
// biologie (biologiste), festival (programmatrice), enseignement (correcteur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-logarithme.mjs`.
//
// Micro-compétences : logT_definition (1, 8, 11, 12, 14, 17, 19, 20),
// logT_valeurs_remarquables (2, 3, 4, 5, 9, 10, 11, 16, 17, 18, 20),
// logT_sens_variation (6, 7, 13, 14, 15, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";

export const exercicesLogDefinitionStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "log-definition",
  titre: "Logarithme décimal : définition",
  accroche:
    "Vingt exercices pour comprendre ce que répond le logarithme : quel exposant faut-il donner à 10 ? Lire log(1 000) sans calculatrice, retrouver x quand on connaît log(x), encadrer un logarithme, se servir de la croissance. Les décibels d'un concert, le pH d'une solution, un séisme, une dilution au laboratoire. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un exposant, retrouver un nombre, comparer deux logarithmes.",
      rappel: [
        "Pour $b > 0$, $\\log(b)$ est l'exposant qu'il faut donner à 10 pour obtenir $b$ : c'est l'unique solution de l'équation $10^x = b$.",
        "À connaître : $\\log(10^n) = n$, pour tout entier $n$, même 0 ou négatif. Exemple : $\\log(0{,}01) = \\log(10^{-2}) = -2$.",
        "$\\log(x) = n$ veut dire $x = 10^n$.",
        "La fonction $\\log$ est croissante sur $]0\\,;\\,+\\infty[$ : si $a < b$, alors $\\log(a) < \\log(b)$. Pour encadrer $\\log(b)$, on encadre $b$ entre deux puissances de 10.",
      ],
      exercices: [
        {
          enonce:
            "Par définition, $\\log(100\\,000)$ est la solution d'une équation. Écris cette équation, avec l'inconnue $x$.",
          reponses: [{ attendu: "10^x = 100000" }],
          correction:
            "$\\log(b)$ est l'exposant qu'il faut donner à 10 pour obtenir $b$.\nIci, $b = 100\\,000$. L'équation est donc $10^x = 100\\,000$.\nSa solution est 5, car $10^5 = 100\\,000$.\n⛔ Le piège : écrire $x^{10} = 100\\,000$. L'inconnue est l'EXPOSANT, pas la base.\nRéponse : $10^x = 100\\,000$.",
          micros: ["logT_definition"],
        },
        {
          enonce:
            "Donne la valeur exacte, sans calculatrice.\na) $\\log(100)$\nb) $\\log(1)$\nc) $\\log(10)$",
          reponses: [
            { question: "a)", attendu: "2", exact: true },
            { question: "b)", attendu: "0", exact: true },
            { question: "c)", attendu: "1", exact: true },
          ],
          correction:
            "On écrit chaque nombre comme une puissance de 10, puis on lit l'exposant.\na) $100 = 10^2$, donc $\\log(100) = 2$.\nb) $1 = 10^0$, donc $\\log(1) = 0$.\nc) $10 = 10^1$, donc $\\log(10) = 1$.\n⛔ Le piège au b) : répondre 1. L'exposant qui donne 1, c'est 0.\nRéponse : a) 2 ; b) 0 ; c) 1.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce:
            "Donne la valeur exacte, sans calculatrice.\na) $\\log(10^7)$\nb) $\\log(1\\,000\\,000)$\nc) $\\log(0{,}001)$",
          reponses: [
            { question: "a)", attendu: "7", exact: true },
            { question: "b)", attendu: "6", exact: true },
            { question: "c)", attendu: "-3", exact: true },
          ],
          correction:
            "$\\log(10^n) = n$ : le logarithme d'une puissance de 10 rend son exposant.\na) L'exposant se lit directement : 7.\nb) $1\\,000\\,000$ a six zéros : c'est $10^6$. Donc $\\log(1\\,000\\,000) = 6$.\nc) $0{,}001 = 10^{-3}$. Donc $\\log(0{,}001) = -3$.\n⛔ Le piège au c) : répondre 3. Un nombre plus petit que 1 a un exposant négatif.\nRéponse : a) 7 ; b) 6 ; c) −3.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce: "On sait que $\\log(x) = 4$. Que vaut $x$ ?",
          reponses: [{ attendu: "10000" }],
          correction:
            "$\\log(x) = n$ veut dire $x = 10^n$.\nIci, $x = 10^4 = 10\\,000$.\n⛔ Le piège : répondre 4. Le nombre 4 est le logarithme, pas $x$.\nRéponse : $10\\,000$.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce: "Dans chaque cas, trouve $x$.\na) $\\log(x) = -2$\nb) $\\log(x) = 0$",
          reponses: [
            { question: "a)", attendu: "0,01" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "On écrit 10 à la puissance de la valeur donnée.\na) $x = 10^{-2} = 0{,}01$.\nb) $x = 10^0 = 1$.\n⛔ Le piège au a) : répondre $-100$. Un exposant négatif ne rend pas le nombre négatif : il le rend plus petit que 1.\nRéponse : a) 0,01 ; b) 1.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce:
            "Sans calculatrice, écris le signe qui convient, < ou >.\na) $\\log(35)$ … $\\log(60)$\nb) $\\log(0{,}5)$ … $\\log(0{,}2)$",
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: ">" },
          ],
          correction:
            "La fonction $\\log$ est croissante : elle conserve l'ordre des nombres.\na) $35 < 60$, donc $\\log(35) < \\log(60)$.\nb) $0{,}5 > 0{,}2$, donc $\\log(0{,}5) > \\log(0{,}2)$.\n⛔ Le piège : croire qu'il faut une calculatrice. Comparer les deux nombres suffit.\nRéponse : a) < ; b) >.",
          micros: ["logT_sens_variation"],
        },
        {
          enonce:
            "Voici la courbe de la fonction $\\log$.\na) Quel est son sens de variation ? Écris croissante ou décroissante.\nb) Pour quelle valeur de $x$ la courbe coupe-t-elle l'axe des abscisses ?",
          figure: repere(
            [-1, 11, -1, 2],
            [{ pts: [[0.2, -0.7], [0.3, -0.52], [0.5, -0.3], [0.75, -0.12], [1, 0], [1.5, 0.18], [2, 0.3], [3, 0.48], [4, 0.6], [5, 0.7], [6, 0.78], [7, 0.85], [8, 0.9], [9, 0.95], [10, 1]] }],
            [],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) La courbe monte sur tout l'intervalle, de moins en moins vite, mais elle ne redescend jamais : la fonction est croissante.\nb) La courbe coupe l'axe des abscisses là où $\\log(x) = 0$, c'est-à-dire en $x = 1$.\n⛔ Le piège au a) : croire qu'elle s'arrête de monter parce qu'elle s'aplatit. Elle monte toujours, mais plus lentement.\nRéponse : a) croissante ; b) 1.",
          micros: ["logT_sens_variation"],
        },
        {
          enonce:
            "Sans calculatrice, entre quels entiers consécutifs se situe $\\log(350)$ ? Donne les deux entiers, du plus petit au plus grand, séparés par un point-virgule.",
          reponses: [{ attendu: "2 ; 3", ordre: true }],
          correction:
            "On encadre 350 entre deux puissances de 10 consécutives : $100 < 350 < 1\\,000$, soit $10^2 < 350 < 10^3$.\nLa fonction $\\log$ est croissante, donc $2 < \\log(350) < 3$.\n⛔ Le piège : répondre 3 ; 4 parce que 350 a trois chiffres. Trois chiffres, c'est entre $10^2$ et $10^3$.\nRéponse : 2 ; 3.",
          micros: ["logT_definition"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : remplacer dans la formule, lire l'exposant, utiliser la croissance.",
      rappel: [
        "Le signe de $\\log(x)$ : négatif si $0 < x < 1$, nul si $x = 1$, positif si $x > 1$. Pour $x \\leqslant 0$, $\\log(x)$ n'existe pas.",
        "Comme $\\log$ est croissante : $\\log(x) > n$ équivaut à $x > 10^n$, et $\\log(x) < n$ équivaut à $0 < x < 10^n$.",
        "Une formule avec $\\log$ : on écrit le nombre comme une puissance de 10, on lit l'exposant, puis on finit le calcul.",
      ],
      exercices: [
        {
          enonce:
            "Une ingénieure du son utilise la formule du niveau sonore : $L = 10 \\times \\log(r)$, avec $L$ en décibels (dB) et $r$ le rapport entre l'intensité du son et le seuil d'audition.\na) Calcule $L$ quand $r = 10^6$.\nb) Calcule $L$ quand $r = 1$.\nc) Calcule $L$ quand $r = 100\\,000\\,000$.",
          reponses: [
            { question: "a)", attendu: "60", exact: true },
            { question: "b)", attendu: "0", exact: true },
            { question: "c)", attendu: "80", exact: true },
          ],
          correction:
            "a) $\\log(10^6) = 6$, donc $L = 10 \\times 6 = 60$ dB.\nb) $\\log(1) = 0$, donc $L = 10 \\times 0 = 0$ dB : c'est le seuil d'audition.\nc) $100\\,000\\,000 = 10^8$, donc $\\log(r) = 8$ et $L = 10 \\times 8 = 80$ dB.\n⛔ Le piège au b) : croire que 0 dB veut dire « aucun son ». C'est le son le plus faible qu'on entend, $r = 1$.\nRéponse : a) 60 dB ; b) 0 dB ; c) 80 dB.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce:
            "Une laborantine utilise la formule $\\text{pH} = -\\log(c)$, où $c$ est la concentration en ions H⁺, en mol/L.\na) Calcule le pH d'une solution où $c = 0{,}001$.\nb) Calcule le pH d'une solution où $c = 0{,}000\\,000\\,1$.\nc) Une solution a un pH de 2. Quelle est sa concentration $c$ ?",
          reponses: [
            { question: "a)", attendu: "3", exact: true },
            { question: "b)", attendu: "7", exact: true },
            { question: "c)", attendu: "0,01" },
          ],
          correction:
            "a) $0{,}001 = 10^{-3}$, donc $\\log(c) = -3$ et $\\text{pH} = -(-3) = 3$.\nb) $0{,}000\\,000\\,1 = 10^{-7}$, donc $\\log(c) = -7$ et $\\text{pH} = 7$.\nc) $-\\log(c) = 2$, donc $\\log(c) = -2$, et $c = 10^{-2} = 0{,}01$ mol/L.\n⛔ Le piège au a) : oublier le signe moins de la formule et répondre $-3$.\nRéponse : a) 3 ; b) 7 ; c) 0,01 mol/L.",
          micros: ["logT_valeurs_remarquables"],
        },
        {
          enonce:
            "Une technicienne qualité compte les bactéries sur une surface de travail (modèle). Son logiciel affiche $\\log(N)$, où $N$ est le nombre de bactéries.\na) Avant le nettoyage, le logiciel affiche 5. Que vaut $N$ ?\nb) Après le nettoyage, il affiche 3. Que vaut $N$ ?\nc) Par combien le nombre de bactéries a-t-il été divisé ?",
          reponses: [
            { question: "a)", attendu: "100000" },
            { question: "b)", attendu: "1000" },
            { question: "c)", attendu: "100" },
          ],
          correction:
            "$\\log(N) = n$ veut dire $N = 10^n$.\na) $N = 10^5 = 100\\,000$ bactéries.\nb) $N = 10^3 = 1\\,000$ bactéries.\nc) $100\\,000 \\div 1\\,000 = 100$ : le nombre a été divisé par 100.\n⛔ Le piège au c) : calculer $5 - 3 = 2$ et dire « divisé par 2 ». L'écran montre des exposants, pas le nombre de bactéries.\nRéponse : a) 100 000 ; b) 1 000 ; c) 100.",
          micros: ["logT_definition", "logT_valeurs_remarquables"],
        },
        {
          enonce:
            "Une géographe compare des populations (modèle). Sans calculatrice, donne les deux entiers consécutifs qui encadrent le logarithme, du plus petit au plus grand, séparés par un point-virgule.\na) Une ville de 72 000 habitants : $\\log(72\\,000)$.\nb) Une région de 8 600 000 habitants : $\\log(8\\,600\\,000)$.\nc) Un village de 950 habitants : $\\log(950)$.",
          reponses: [
            { question: "a)", attendu: "4 ; 5", ordre: true },
            { question: "b)", attendu: "6 ; 7", ordre: true },
            { question: "c)", attendu: "2 ; 3", ordre: true },
          ],
          correction:
            "On encadre chaque nombre entre deux puissances de 10, puis on lit les exposants.\na) $10^4 < 72\\,000 < 10^5$, donc $4 < \\log(72\\,000) < 5$.\nb) $10^6 < 8\\,600\\,000 < 10^7$, donc $6 < \\log(8\\,600\\,000) < 7$.\nc) $10^2 < 950 < 10^3$, donc $2 < \\log(950) < 3$.\n⛔ Le piège au c) : arrondir 950 à 1 000 et répondre 3 ; 4. 950 reste en dessous de 1 000.\nRéponse : a) 4 ; 5 ; b) 6 ; 7 ; c) 2 ; 3.",
          micros: ["logT_definition"],
        },
        {
          enonce:
            "Une technicienne de maintenance teste la touche log d'une calculatrice. Sans la calculatrice, prévois le résultat.\nPour a), b), c), écris positif, négatif ou nul.\na) $\\log(0{,}4)$\nb) $\\log(25)$\nc) $\\log(1)$\nd) La calculatrice peut-elle donner une valeur pour $\\log(-5)$ ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "négatif" },
            { question: "b)", attendu: "positif" },
            { question: "c)", attendu: "nul" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "On compare le nombre à 1, car $\\log(1) = 0$ et $\\log$ est croissante.\na) $0{,}4 < 1$, donc $\\log(0{,}4) < 0$ : négatif.\nb) $25 > 1$, donc $\\log(25) > 0$ : positif.\nc) $\\log(1) = 0$ : nul.\nd) Une puissance de 10 est toujours strictement positive : aucun exposant ne donne $-5$. La calculatrice affiche une erreur.\n⛔ Le piège au a) : penser qu'un logarithme négatif est impossible. Ce qui est impossible, c'est de prendre le logarithme d'un nombre négatif.\nRéponse : a) négatif ; b) positif ; c) nul ; d) non.",
          micros: ["logT_sens_variation"],
        },
        {
          enonce:
            "Une médiatrice culturelle classe trois musées A, B et C (modèle). On lui donne le logarithme de leur nombre de visiteurs annuels : 4,6 pour A, 5,2 pour B et 3,9 pour C.\na) Quel musée reçoit le plus de visiteurs ? Écris sa lettre.\nb) Quel musée en reçoit le moins ? Écris sa lettre.\nc) Le nombre de visiteurs du musée B est entre deux puissances de 10 consécutives. Quelle est la plus petite des deux ? Écris ce nombre en entier.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "100000" },
          ],
          correction:
            "$\\log$ est croissante : le plus grand logarithme correspond au plus grand nombre.\na) Le plus grand des trois est 5,2 : c'est le musée B.\nb) Le plus petit est 3,9 : c'est le musée C.\nc) $\\log(N) = 5{,}2$ et $5{,}2 > 5$, donc $N > 10^5 = 100\\,000$.\n⛔ Le piège au c) : croire que le musée reçoit 5,2 visiteurs. 5,2 est l'exposant, pas le nombre de visiteurs.\nRéponse : a) B ; b) C ; c) 100 000.",
          micros: ["logT_sens_variation", "logT_definition"],
        },
        {
          enonce:
            "Un community manager crée un badge pour les vidéos : le score d'une vidéo vue $x$ fois est $\\log(x)$ (modèle). Le badge « bronze » demande un score supérieur à 3.\na) Résous $\\log(x) > 3$.\nb) Une vidéo vue 850 fois a-t-elle le badge ? Réponds oui ou non.\nc) Résous $\\log(x) < 5$, avec $x > 0$.",
          reponses: [
            { question: "a)", attendu: ["x > 1000", "x > 10^3", "1000 < x", "]1000 ; +∞["] },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: ["x < 100000", "x < 10^5", "0 < x < 100000", "0 < x < 10^5", "]0 ; 100000["] },
          ],
          correction:
            "$\\log$ est croissante : elle conserve le sens de l'inégalité.\na) $\\log(1\\,000) = 3$, donc $\\log(x) > 3$ équivaut à $x > 1\\,000$.\nb) 850 est plus petit que 1 000 : le badge n'est pas obtenu.\nc) $\\log(100\\,000) = 5$, donc $\\log(x) < 5$ équivaut à $0 < x < 100\\,000$.\n⛔ Le piège au a) : écrire $x > 3$. On compare $x$ à $10^3$, pas au logarithme.\nRéponse : a) $x > 1\\,000$ ; b) non ; c) $0 < x < 100\\,000$.",
          micros: ["logT_sens_variation"],
        },
        {
          enonce:
            "Un sismologue utilise un modèle simplifié : la magnitude d'un séisme est $M = \\log(r)$, où $r$ compare l'amplitude des ondes à une amplitude de référence.\na) Calcule $M$ quand $r = 100\\,000$.\nb) Un séisme a une magnitude de 7. Que vaut $r$ ?\nc) Par combien $r$ est-il multiplié quand on passe de la magnitude 5 à la magnitude 7 ?",
          reponses: [
            { question: "a)", attendu: "5", exact: true },
            { question: "b)", attendu: "10000000" },
            { question: "c)", attendu: "100" },
          ],
          correction:
            "a) $100\\,000 = 10^5$, donc $M = 5$.\nb) $\\log(r) = 7$ veut dire $r = 10^7 = 10\\,000\\,000$.\nc) $10^7 \\div 10^5 = 10\\,000\\,000 \\div 100\\,000 = 100$.\n⛔ Le piège au c) : penser que $r$ est multiplié par 2 parce que $7 - 5 = 2$. Chaque point de magnitude multiplie $r$ par 10.\nRéponse : a) 5 ; b) 10 000 000 ; c) 100.",
          micros: ["logT_valeurs_remarquables"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : passer du nombre au logarithme et du logarithme au nombre, sans perdre le sens.",
      rappel: [
        "Du nombre au logarithme : on écrit le nombre comme une puissance de 10. Du logarithme au nombre : $x = 10^n$.",
        "Ajouter 2 au logarithme, c'est multiplier le nombre par $10^2 = 100$.",
        "Si $n < \\log(x) < n + 1$, alors $10^n < x < 10^{n+1}$ : le logarithme donne la taille du nombre.",
      ],
      exercices: [
        {
          titre: "L'axe des villes",
          enonce:
            "Une journaliste de données place des villes sur un axe (modèle) : une ville de $N$ habitants est placée à la position $\\log(N)$.\na) À quelles positions place-t-elle des villes de 100, 10 000 et 1 000 000 habitants ? Donne les trois nombres dans cet ordre, séparés par des points-virgules.\nb) Une ville est placée à la position 5. Combien a-t-elle d'habitants ?\nc) Une autre est placée à la position 3,5. Entre quelles puissances de 10 se trouve son nombre d'habitants ? Écris les deux nombres en entier, du plus petit au plus grand, séparés par un point-virgule.\nd) Quand on avance de 1 sur l'axe, par combien le nombre d'habitants est-il multiplié ?",
          reponses: [
            { question: "a)", attendu: "2 ; 4 ; 6", ordre: true },
            { question: "b)", attendu: "100000" },
            { question: "c)", attendu: "1000 ; 10000", ordre: true },
            { question: "d)", attendu: "10" },
          ],
          correction:
            "a) $100 = 10^2$, $10\\,000 = 10^4$, $1\\,000\\,000 = 10^6$ : les positions sont 2, 4 et 6.\nb) $\\log(N) = 5$ veut dire $N = 10^5 = 100\\,000$.\nc) $3 < 3{,}5 < 4$, donc $10^3 < N < 10^4$, soit entre 1 000 et 10 000.\nd) Passer de $10^n$ à $10^{n+1}$, c'est multiplier par 10.\n⛔ Le piège au c) : prendre la moitié et répondre 5 000. La position 3,5 n'est pas à mi-chemin en nombre d'habitants, car l'axe compte les exposants.\nRéponse : a) 2 ; 4 ; 6 ; b) 100 000 ; c) 1 000 ; 10 000 ; d) 10.",
          micros: ["logT_valeurs_remarquables", "logT_definition"],
        },
        {
          titre: "La dilution",
          enonce:
            "Une biologiste dilue un échantillon de concentration 1 g/L (modèle). Chaque dilution divise la concentration par 10. Après $n$ dilutions, la concentration est $c = 10^{-n}$.\na) Quelle est la concentration après 4 dilutions ? Écris-la sous forme décimale.\nb) Que vaut alors $\\log(c)$ ?\nc) Elle veut $\\log(c) < -6$. Combien de dilutions faut-il au minimum ?\nd) Après ces dilutions, le signe de $\\log(c)$ est-il positif ou négatif ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "0,0001", exact: true },
            { question: "b)", attendu: "-4", exact: true },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "négatif" },
          ],
          correction:
            "a) $c = 10^{-4} = 0{,}0001$ g/L.\nb) $\\log(10^{-4}) = -4$.\nc) $\\log(c) = \\log(10^{-n}) = -n$. On veut $-n < -6$, c'est-à-dire $n > 6$. Le premier entier qui convient est 7.\nd) La concentration est plus petite que 1, donc son logarithme est négatif.\n⛔ Le piège au c) : répondre 6. Avec 6 dilutions, $\\log(c) = -6$ exactement : ce n'est pas strictement plus petit que $-6$.\nRéponse : a) 0,0001 ; b) −4 ; c) 7 ; d) négatif.",
          micros: ["logT_valeurs_remarquables", "logT_sens_variation"],
        },
        {
          titre: "La programmation du festival",
          enonce:
            "Une programmatrice de festival regarde les écoutes de trois artistes (modèle) : A a 2 500 000 écoutes, B en a 40 000 et C en a 640. Sans calculatrice, donne les deux entiers consécutifs qui encadrent le logarithme, du plus petit au plus grand, séparés par un point-virgule.\na) Pour A : $\\log(2\\,500\\,000)$.\nb) Pour B : $\\log(40\\,000)$.\nc) Pour C : $\\log(640)$.\nd) Elle ne garde que les artistes dont le logarithme des écoutes dépasse 5. Quel artiste garde-t-elle ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: "6 ; 7", ordre: true },
            { question: "b)", attendu: "4 ; 5", ordre: true },
            { question: "c)", attendu: "2 ; 3", ordre: true },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) $10^6 < 2\\,500\\,000 < 10^7$, donc le logarithme est entre 6 et 7.\nb) $10^4 < 40\\,000 < 10^5$, donc il est entre 4 et 5.\nc) $10^2 < 640 < 10^3$, donc il est entre 2 et 3.\nd) $\\log(x) > 5$ équivaut à $x > 10^5 = 100\\,000$. Seul A dépasse 100 000 écoutes.\n⛔ Le piège au d) : comparer les écoutes à 5. On les compare à $10^5$.\nRéponse : a) 6 ; 7 ; b) 4 ; 5 ; c) 2 ; 3 ; d) A.",
          micros: ["logT_definition", "logT_sens_variation"],
        },
        {
          titre: "La copie de Lina",
          enonce:
            "Un correcteur relit cinq affirmations de Lina. Réponds vrai ou faux à chacune.\na) $\\log(1\\,000) = 3$\nb) $\\log(1) = 1$\nc) $\\log(0{,}1) = -1$\nd) $\\log(x) > 2$ équivaut à $x > 2$\ne) $\\log(50) > 2$",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
            { question: "e)", attendu: "faux" },
          ],
          correction:
            "a) $1\\,000 = 10^3$ : vrai.\nb) $10^0 = 1$, donc $\\log(1) = 0$ : faux.\nc) $0{,}1 = 10^{-1}$ : vrai.\nd) $\\log(100) = 2$, donc $\\log(x) > 2$ équivaut à $x > 100$. Par exemple $x = 50$ est plus grand que 2, mais pas plus grand que 100 : faux.\ne) $50 < 100$ et $\\log$ est croissante, donc $\\log(50) < \\log(100)$, soit $\\log(50) < 2$ : faux.\n⛔ Le piège au d) : comparer $x$ au logarithme. Il faut repasser par la puissance de 10.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux ; e) faux.",
          micros: ["logT_valeurs_remarquables", "logT_sens_variation", "logT_definition"],
        },
      ],
    },
  ],
};
