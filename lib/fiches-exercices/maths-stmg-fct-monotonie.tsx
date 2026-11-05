// ─── Fiche d'exercices : fonction monotone sur un intervalle (STMG) — 20 ex. ────
//
// Notion fct_monotonie du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-representation.bank.ts`). Le
// coach demande : relier le signe du taux de variation et le sens de variation
// (dans les deux sens), lire un tableau de variations (maximum, intervalle,
// valeur), compter les changements de sens sur une courbe, comparer deux images
// sans les calculer, et savoir que la règle ne vaut que dans un même morceau
// (sinon on ne peut pas conclure). Pas de dérivée ici.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : huit exercices sans contexte en ★ ; randonnée
// (accompagnatrice), camping (gérante), nappe d'eau (hydrogéologue), artisanat
// (ébéniste), réseau électrique (ingénieure), pollution de l'air (climatologue),
// rééducation (kinésithérapeute), apiculture (apiculteur) ; boulangerie
// (boulanger), santé publique (médecin), vente (commercial), station de ski
// (nivologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fct_mono_signe_taux (1, 2, 11, 12, 15, 19), fct_mono_tableau
// (5, 6, 7, 8, 9, 13, 15, 16, 17, 18, 19), fct_mono_comparer_images (3, 4, 10, 12,
// 14, 16, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauVariations } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

/** Le signe, ou la comparaison écrite en entier, dans les deux sens. */
const compare = (a: string, s: "<" | ">", b: string, f = "f") => [s, `${f}(${a}) ${s} ${f}(${b})`, `${f}(${b}) ${s === "<" ? ">" : "<"} ${f}(${a})`];

export const exercicesFctMonotonieStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-monotonie",
  titre: "Fonction monotone sur un intervalle",
  accroche:
    "Vingt exercices sur le sens de variation : le relier au signe du taux, lire et dresser un tableau de variations, comparer deux images sans rien calculer, et savoir quand on ne peut pas conclure. Une randonnée, un camping, une ruche, une station de ski. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : le signe du taux, un tableau à lire, ou deux images à comparer.",
      rappel: [
        "Sur un intervalle, tous les taux sont positifs : $f$ est croissante. Tous négatifs : $f$ est décroissante.",
        "$f$ croissante : l'ordre est conservé, si $a < b$ alors $f(a) < f(b)$. $f$ décroissante : l'ordre est inversé, $f(a) > f(b)$.",
        "Un tableau de variations se lit de gauche à droite : la flèche monte, $f$ croît ; la flèche descend, $f$ décroît.",
        "Le maximum est la plus grande valeur de la ligne du bas, le minimum la plus petite. Sur une courbe, chaque sommet ou creux est un changement de sens.",
      ],
      exercices: [
        {
          enonce:
            "Sur l'intervalle $[1\\,;\\,6]$, tous les taux de variation d'une fonction $f$ sont égaux à $-5$. Quel est le sens de variation de $f$ sur cet intervalle ? Écris croissante ou décroissante.",
          reponses: [{ attendu: ["décroissante", "décroissant"] }],
          correction:
            "On regarde le SIGNE du taux, pas sa valeur.\n$-5$ est négatif sur tout l'intervalle : $f$ descend.\n⛔ Le piège : croire qu'il faut la valeur de $f$ pour conclure. Le signe suffit.\nRéponse : décroissante.",
          micros: ["fct_mono_signe_taux"],
        },
        {
          enonce:
            "Une fonction $f$ est croissante sur $[-2\\,;\\,5]$. Que peut-on dire de ses taux de variation entre deux valeurs de cet intervalle ? Écris positifs ou négatifs.",
          reponses: [{ attendu: ["positifs", "positif"] }],
          correction:
            "On prend deux valeurs $u < v$. Comme $f$ monte, $f(v) - f(u)$ est positif. Le dénominateur $v - u$ aussi.\nUn quotient de deux nombres positifs est positif.\n⛔ Le piège : apprendre le lien dans un seul sens. Croissante et taux positifs, c'est la même chose, dans les deux sens.\nRéponse : positifs.",
          micros: ["fct_mono_signe_taux"],
        },
        {
          enonce:
            "Une fonction $f$ est croissante sur $[0\\,;\\,10]$. Sans calculer, compare $f(2)$ et $f(7)$. Écris le signe < ou >, pour $f(2)$ … $f(7)$.",
          reponses: [{ attendu: compare("2", "<", "7") }],
          correction:
            "2 et 7 sont dans $[0\\,;\\,10]$, et $2 < 7$.\n$f$ est croissante : l'ordre est conservé.\nDonc $f(2) < f(7)$.\n⛔ Le piège : dire qu'on ne peut pas comparer sans l'expression de $f$. La monotonie suffit, c'est même à cela qu'elle sert.\nRéponse : <.",
          micros: ["fct_mono_comparer_images"],
        },
        {
          enonce:
            "Une fonction $f$ est décroissante sur $[-4\\,;\\,3]$. Sans calculer, compare $f(-1)$ et $f(2)$. Écris le signe < ou >, pour $f(-1)$ … $f(2)$.",
          reponses: [{ attendu: compare("-1", ">", "2") }],
          correction:
            "$-1$ et 2 sont dans $[-4\\,;\\,3]$, et $-1 < 2$.\n$f$ est décroissante : l'ordre est inversé.\nDonc $f(-1) > f(2)$.\n⛔ Le piège : garder le signe <. Avec une fonction décroissante, le sens change.\nRéponse : >.",
          micros: ["fct_mono_comparer_images"],
        },
        {
          enonce:
            "Voici le tableau de variations d'une fonction $f$.\na) Quel est le maximum de $f$ ?\nb) En quelle valeur de $x$ est-il atteint ?\nc) Que vaut $f(4)$ ?",
          figure: tableauVariations([-3, 1, 4], [2, 7, -1]),
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "-1" },
          ],
          correction:
            "La ligne du haut donne $x$, la ligne du bas les valeurs de $f$.\na) La plus grande valeur de la ligne du bas est 7.\nb) Elle est sous $x = 1$.\nc) Sous $x = 4$, on lit $-1$.\n⛔ Le piège au b) : répondre 7. Le maximum, c'est une valeur de $f$ ; il est atteint EN une valeur de $x$.\nRéponse : a) 7 ; b) 1 ; c) $-1$.",
          micros: ["fct_mono_tableau"],
        },
        {
          enonce:
            "Voici le tableau de variations d'une fonction $f$.\na) Sur quel intervalle $f$ est-elle décroissante ?\nb) Quel est le minimum de $f$ ?",
          figure: tableauVariations([0, 2, 6], [5, 1, 8]),
          reponses: [
            { question: "a)", attendu: "[0 ; 2]" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) La flèche descend de $x = 0$ à $x = 2$ : $f$ est décroissante sur $[0\\,;\\,2]$.\nb) La plus petite valeur de la ligne du bas est 1.\n⛔ Le piège au a) : écrire $[5\\,;\\,1]$. Un intervalle de variation se donne avec les valeurs de $x$, celles de la ligne du haut.\nRéponse : a) $[0\\,;\\,2]$ ; b) 1.",
          micros: ["fct_mono_tableau"],
        },
        {
          enonce:
            "La courbe de $f$ est tracée.\na) Combien de fois $f$ change-t-elle de sens de variation ?\nb) En combien de morceaux son tableau de variations se découpe-t-il ?",
          figure: repere([-4, 5, -5, 6], [{ p: [1 / 3, -0.5, -2, 1] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "On parcourt la courbe de gauche à droite et on compte les sommets et les creux.\na) Elle monte, redescend à partir de $x = -1$, puis remonte à partir de $x = 2$ : 2 changements de sens.\nb) Deux changements séparent trois morceaux : 3.\n⛔ Le piège au b) : répondre 2. Il y a toujours un morceau de plus que de changements de sens.\nRéponse : a) 2 ; b) 3.",
          micros: ["fct_mono_tableau"],
        },
        {
          enonce:
            "La courbe de $f$ est tracée. Écris croissante ou décroissante.\na) Quel est le sens de $f$ sur $[0\\,;\\,2]$ ?\nb) Quel est le sens de $f$ sur $[2\\,;\\,4]$ ?",
          figure: repere([-1, 5, -1, 8], [{ q: [1, -4, 5] }]),
          reponses: [
            { question: "a)", attendu: ["décroissante", "décroissant"] },
            { question: "b)", attendu: ["croissante", "croissant"] },
          ],
          correction:
            "a) De $x = 0$ à $x = 2$, la courbe descend de 5 à 1 : $f$ est décroissante.\nb) De $x = 2$ à $x = 4$, la courbe remonte de 1 à 5 : $f$ est croissante.\n⛔ Le piège : lire la courbe de droite à gauche. On lit toujours dans le sens des $x$ qui augmentent.\nRéponse : a) décroissante ; b) croissante.",
          micros: ["fct_mono_tableau"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on dresse le tableau, on compare, et on vérifie que les deux nombres sont dans le même morceau.",
      rappel: [
        "Pour dresser un tableau de variations : on repère où $f$ change de sens, on note ces $x$ en haut et les valeurs de $f$ en bas, puis on place les flèches.",
        "La règle de comparaison ne vaut que SUR UN INTERVALLE où $f$ est monotone.",
        "Si les deux nombres sont de part et d'autre d'un changement de sens, on ne peut pas conclure : on écrit ?.",
      ],
      exercices: [
        {
          enonce:
            "Une accompagnatrice en montagne, Ingrid, lit le profil d'une randonnée (modèle). La courbe donne l'altitude, en centaines de mètres, après $x$ km de marche.\na) Sur quel intervalle l'altitude est-elle décroissante ?\nb) Quelle est l'altitude maximale, en centaines de mètres ?\nc) Combien de fois le sens de variation change-t-il ?\nd) Sur quel intervalle l'altitude est-elle croissante en fin de parcours ?",
          figure: repere([-1, 9, -1, 9], [{ pts: [[0, 2], [1, 4], [2, 6.5], [3, 8], [4, 7], [5, 5], [6, 4], [7, 5.5], [8, 7]] }]),
          reponses: [
            { question: "a)", attendu: "[3 ; 6]" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "[6 ; 8]" },
          ],
          schema: tableauVariations([0, 3, 6, 8], [2, 8, 4, 7]),
          correction:
            "On lit la courbe de gauche à droite : elle monte jusqu'à $x = 3$, descend jusqu'à $x = 6$, puis remonte jusqu'à $x = 8$.\na) Elle descend sur $[3\\,;\\,6]$.\nb) Le point le plus haut est à la hauteur 8.\nc) Deux changements : en $x = 3$ et en $x = 6$.\nd) Elle monte sur $[6\\,;\\,8]$.\nLe tableau de variations ci-dessous résume tout cela.\n⛔ Le piège au b) : répondre 3, l'endroit du sommet. La question demande sa hauteur.\nRéponse : a) $[3\\,;\\,6]$ ; b) 8 ; c) 2 ; d) $[6\\,;\\,8]$.",
          micros: ["fct_mono_tableau"],
        },
        {
          enonce:
            "La gérante d'un camping suit sa fréquentation $f(x)$ le mois $x$, en centaines de campeurs (modèle). Pour chaque comparaison, écris <, >, ou ? si on ne peut pas conclure.\na) $f(2)$ … $f(4)$\nb) $f(6)$ … $f(10)$\nc) $f(3)$ … $f(8)$\nd) Sur quel intervalle $f$ est-elle décroissante ?",
          figure: tableauVariations([1, 5, 12], [40, 90, 30]),
          reponses: [
            { question: "a)", attendu: compare("2", "<", "4") },
            { question: "b)", attendu: compare("6", ">", "10") },
            { question: "c)", attendu: ["?", "on ne peut pas conclure"] },
            { question: "d)", attendu: "[5 ; 12]" },
          ],
          correction:
            "a) 2 et 4 sont dans $[1\\,;\\,5]$, où $f$ est croissante : l'ordre est conservé, $f(2) < f(4)$.\nb) 6 et 10 sont dans $[5\\,;\\,12]$, où $f$ est décroissante : l'ordre est inversé, $f(6) > f(10)$.\nc) 3 est avant le sommet, 8 est après. Rien n'impose laquelle des deux images est la plus grande : on ne peut pas conclure.\nd) La flèche descend de 5 à 12 : $[5\\,;\\,12]$.\n⛔ Le piège au c) : appliquer la règle sans regarder les morceaux.\nRéponse : a) < ; b) > ; c) ? ; d) $[5\\,;\\,12]$.",
          micros: ["fct_mono_comparer_images"],
        },
        {
          enonce:
            "Un hydrogéologue mesure le niveau d'une nappe d'eau, en mètres, $x$ années après le début du suivi (modèle). Entre deux mesures, on admet que ce niveau évolue régulièrement.\na) Calcule le taux de variation entre $x = 2$ et $x = 4$.\nb) Calcule le taux de variation entre $x = 4$ et $x = 7$.\nc) Calcule le taux de variation entre $x = 7$ et $x = 10$.\nd) Quel est le sens de variation du niveau sur $[2\\,;\\,10]$ ? Écris croissant ou décroissant.",
          figure: grille(["x", "2", "4", "7", "10"], [["Niveau", 30, 26, 20, 8]]),
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: "-2" },
            { question: "c)", attendu: "-4" },
            { question: "d)", attendu: ["décroissant", "décroissante"] },
          ],
          correction:
            "a) $\\dfrac{26 - 30}{4 - 2} = \\dfrac{-4}{2} = -2$.\nb) $\\dfrac{20 - 26}{7 - 4} = \\dfrac{-6}{3} = -2$.\nc) $\\dfrac{8 - 20}{10 - 7} = \\dfrac{-12}{3} = -4$.\nd) Tous les taux sont négatifs : le niveau est décroissant.\n⛔ Le piège au d) : se laisser troubler par des valeurs différentes. Pour le sens, seul le SIGNE compte.\nRéponse : a) $-2$ ; b) $-2$ ; c) $-4$ ; d) décroissant.",
          micros: ["fct_mono_signe_taux"],
        },
        {
          enonce:
            "Un ébéniste, Karim, sait que son coût de production $C(x)$, en euros, est croissant sur $[0\\,;\\,500]$, où $x$ est le nombre de pièces (modèle).\na) Compare $C(120)$ et $C(300)$ : écris < ou >, pour $C(120)$ … $C(300)$.\nb) On sait que $C(300) = 2\\,000$. Peut-on avoir $C(120) = 2\\,500$ ? Réponds oui ou non.\nc) Quel est le signe des taux de variation de $C$ sur cet intervalle ? Écris positif ou négatif.",
          reponses: [
            { question: "a)", attendu: compare("120", "<", "300", "C") },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: ["positif", "positifs"] },
          ],
          correction:
            "a) 120 et 300 sont dans l'intervalle, et $120 < 300$. $C$ est croissant : $C(120) < C(300)$.\nb) Non : $C(120)$ doit être inférieur à $C(300) = 2\\,000$, et 2 500 ne l'est pas.\nc) $C$ est croissant : tous ses taux sont positifs.\n⛔ Le piège au b) : calculer. On n'a pas besoin de l'expression, le sens de variation suffit à dire non.\nRéponse : a) < ; b) non ; c) positif.",
          micros: ["fct_mono_signe_taux", "fct_mono_comparer_images"],
        },
        {
          enonce:
            "Une ingénieure de réseau modélise la puissance appelée $f(x)$, en gigawatts, $x$ heures après minuit, par $f(x) = x^2 - 6x + 10$. Le tableau donne quelques valeurs.\na) Quel est le minimum de $f$ sur $[0\\,;\\,6]$ ?\nb) En quelle valeur de $x$ est-il atteint ?\nc) Sur quel intervalle $f$ est-elle décroissante ?\nd) Sur quel intervalle $f$ est-elle croissante ?",
          figure: grille(["x", "f(x)"], [[0, 10], [1, 5], [2, 2], [3, 1], [4, 2], [5, 5], [6, 10]]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "[0 ; 3]" },
            { question: "d)", attendu: "[3 ; 6]" },
          ],
          schema: tableauVariations([0, 3, 6], [10, 1, 10]),
          correction:
            "On lit la colonne des valeurs de haut en bas : 10, 5, 2, 1, puis 2, 5, 10.\na) La plus petite valeur est 1.\nb) Elle correspond à $x = 3$.\nc) Les valeurs baissent de $x = 0$ à $x = 3$ : $[0\\,;\\,3]$.\nd) Elles montent de $x = 3$ à $x = 6$ : $[3\\,;\\,6]$.\nLe tableau de variations ci-dessous résume tout cela.\n⛔ Le piège au c) : écrire $[10\\,;\\,1]$. L'intervalle se donne avec les $x$, pas avec les valeurs.\nRéponse : a) 1 ; b) 3 ; c) $[0\\,;\\,3]$ ; d) $[3\\,;\\,6]$.",
          micros: ["fct_mono_tableau"],
        },
        {
          enonce:
            "Un climatologue étudie la pollution de l'air $f(x)$ dans une ville (modèle), $x$ heures avant ou après midi : $x$ est négatif avant midi. Il sait que $f$ est décroissante sur $[-5\\,;\\,0]$ et croissante sur $[0\\,;\\,4]$. Écris <, >, ou ? si on ne peut pas conclure.\na) $f(-4)$ … $f(-1)$\nb) $f(1)$ … $f(3)$\nc) $f(-2)$ … $f(2)$\nd) En quelle valeur de $x$ la pollution est-elle minimale ?",
          reponses: [
            { question: "a)", attendu: compare("-4", ">", "-1") },
            { question: "b)", attendu: compare("1", "<", "3") },
            { question: "c)", attendu: ["?", "on ne peut pas conclure"] },
            { question: "d)", attendu: ["0", "midi", "à midi"] },
          ],
          correction:
            "a) $-4$ et $-1$ sont dans $[-5\\,;\\,0]$, où $f$ décroît : l'ordre est inversé, $f(-4) > f(-1)$.\nb) 1 et 3 sont dans $[0\\,;\\,4]$, où $f$ croît : l'ordre est conservé, $f(1) < f(3)$.\nc) $-2$ et 2 sont de part et d'autre de 0 : on ne peut pas conclure.\nd) $f$ descend jusqu'à $x = 0$, puis remonte : le minimum est en $x = 0$.\n⛔ Le piège au c) : répondre parce que $-2 < 2$. Les deux nombres ne sont pas dans le même morceau.\nRéponse : a) > ; b) < ; c) ? ; d) 0.",
          micros: ["fct_mono_comparer_images"],
        },
        {
          enonce:
            "Une kinésithérapeute modélise la force d'un patient $f(x)$, en dizaines de newtons, pour un réglage $x$ de l'appareil, sur $[0\\,;\\,8]$. La courbe représente $f$.\na) Sur quel intervalle $f$ est-elle croissante ?\nb) Quel est le signe du taux de variation entre 1 et 3 ? Écris positif ou négatif.\nc) Quel est le signe du taux de variation entre 5 et 7 ? Écris positif ou négatif.\nd) Calcule le taux de variation entre 3 et 5, sachant que $f(3) = f(5) = 7{,}5$.",
          figure: repere([-1, 9, -1, 9], [{ q: [-0.5, 4, 0] }]),
          reponses: [
            { question: "a)", attendu: "[0 ; 4]" },
            { question: "b)", attendu: ["positif", "positive"] },
            { question: "c)", attendu: ["négatif", "négative"] },
            { question: "d)", attendu: "0" },
          ],
          correction:
            "a) La courbe monte de $x = 0$ à $x = 4$ : $[0\\,;\\,4]$.\nb) Entre 1 et 3, $f$ est croissante : le taux est positif.\nc) Entre 5 et 7, $f$ est décroissante : le taux est négatif.\nd) $\\dfrac{7{,}5 - 7{,}5}{5 - 3} = 0$.\n⛔ Le piège au d) : conclure que $f$ est constante sur $[3\\,;\\,5]$. Ces deux nombres sont de part et d'autre du sommet : la courbe monte, puis redescend.\nRéponse : a) $[0\\,;\\,4]$ ; b) positif ; c) négatif ; d) 0.",
          micros: ["fct_mono_signe_taux", "fct_mono_tableau"],
        },
        {
          enonce:
            "Un apiculteur suit la masse d'une ruche $f(x)$, en kg, au mois $x$ (modèle). Voici son tableau de variations.\na) Quelle est la masse maximale ?\nb) Quelle est la masse minimale ?\nc) Écris <, >, ou ? pour $f(5)$ … $f(8)$.\nd) Écris <, >, ou ? pour $f(2)$ … $f(10)$.",
          figure: tableauVariations([1, 4, 9, 12], [20, 60, 30, 45]),
          reponses: [
            { question: "a)", attendu: "60 kg" },
            { question: "b)", attendu: "20 kg" },
            { question: "c)", attendu: compare("5", ">", "8") },
            { question: "d)", attendu: ["?", "on ne peut pas conclure"] },
          ],
          correction:
            "a) La plus grande valeur de la ligne du bas : 60 kg.\nb) La plus petite : 20 kg.\nc) 5 et 8 sont dans $[4\\,;\\,9]$, où $f$ décroît : $f(5) > f(8)$.\nd) 2 et 10 ne sont pas dans le même morceau : $f(2)$ est entre 20 et 60, $f(10)$ est entre 30 et 45. On ne peut pas conclure.\n⛔ Le piège au b) : répondre 30, le creux du milieu. Le minimum se cherche sur TOUTE la ligne, bords compris.\nRéponse : a) 60 kg ; b) 20 kg ; c) > ; d) ?.",
          micros: ["fct_mono_tableau", "fct_mono_comparer_images"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on dresse le tableau de variations, puis on s'en sert pour répondre sans calculer.",
      rappel: [
        "Le tableau de variations résume tout : les $x$ où $f$ change de sens, et les valeurs atteintes.",
        "Dans un même morceau, une image se trouve toujours entre les deux valeurs du bout de la flèche.",
        "Avant de comparer, on situe les deux nombres par rapport au changement de sens.",
      ],
      exercices: [
        {
          titre: "Le bénéfice du boulanger",
          enonce:
            "Un boulanger modélise son bénéfice quotidien, en centaines d'euros, par $f(x) = -x^2 + 8x - 7$, où $x$ est le nombre de centaines de baguettes, sur $[1\\,;\\,7]$. La courbe représente $f$.\na) Calcule $f(2)$.\nb) Sur quel intervalle $f$ est-elle croissante ?\nc) Quel est le bénéfice maximal, en centaines d'euros ?\nd) Sans calculer, écris < ou > pour $f(2{,}5)$ … $f(3{,}5)$.",
          figure: repere([-1, 8, -1, 10], [{ q: [-1, 8, -7] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "[1 ; 4]" },
            { question: "c)", attendu: "9" },
            { question: "d)", attendu: compare("2,5", "<", "3,5") },
          ],
          schema: tableauVariations([1, 4, 7], [0, 9, 0]),
          correction:
            "a) $f(2) = -4 + 16 - 7 = 5$.\nb) La courbe monte de $x = 1$ à $x = 4$ : $[1\\,;\\,4]$.\nc) Le sommet est à la hauteur 9 : $f(4) = -16 + 32 - 7 = 9$.\nd) 2,5 et 3,5 sont dans $[1\\,;\\,4]$, où $f$ croît : $f(2{,}5) < f(3{,}5)$.\nLe tableau de variations ci-dessous résume la situation.\n⛔ Le piège au c) : répondre 4, l'endroit du maximum. Le bénéfice maximal est la hauteur, 9.\nRéponse : a) 5 ; b) $[1\\,;\\,4]$ ; c) 9 ; d) <.",
          micros: ["fct_mono_tableau", "fct_mono_comparer_images"],
        },
        {
          titre: "Le pic de la grippe",
          enonce:
            "Une médecin suit un modèle d'épidémie : $f(x)$ est le nombre de cas, en centaines, la semaine $x$. Voici son tableau de variations.\na) Quelle semaine le pic est-il atteint ?\nb) Combien de cas y a-t-il au pic, en centaines ?\nc) Écris <, >, ou ? pour $f(2)$ … $f(4)$.\nd) Écris <, >, ou ? pour $f(3)$ … $f(8)$.\ne) On mesure $f(8) = 7$. Peut-on avoir $f(9) = 10$ ? Réponds oui ou non.",
          figure: tableauVariations([1, 5, 10], [2, 14, 3]),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "14" },
            { question: "c)", attendu: compare("2", "<", "4") },
            { question: "d)", attendu: ["?", "on ne peut pas conclure"] },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) Le changement de sens est en $x = 5$ : c'est la semaine 5.\nb) La valeur en dessous est 14.\nc) 2 et 4 sont dans $[1\\,;\\,5]$, où $f$ croît : $f(2) < f(4)$.\nd) 3 est avant le pic, 8 est après : on ne peut pas conclure.\ne) 8 et 9 sont dans $[5\\,;\\,10]$, où $f$ décroît, donc $f(9) < f(8) = 7$. La valeur 10 est impossible.\n⛔ Le piège au d) : se dire que la semaine 8 est forcément plus tard, donc plus basse. Ici, il faudrait les vraies valeurs.\nRéponse : a) semaine 5 ; b) 14 ; c) < ; d) ? ; e) non.",
          micros: ["fct_mono_tableau", "fct_mono_comparer_images"],
        },
        {
          titre: "Les ventes du commercial",
          enonce:
            "Un commercial relève ses ventes $f(x)$, en milliers d'euros, le mois $x$ (modèle). Entre deux relevés, on admet que les ventes évoluent régulièrement.\na) Calcule le taux de variation entre 0 et 2.\nb) Calcule le taux de variation entre 2 et 4.\nc) Calcule le taux de variation entre 4 et 6.\nd) Calcule le taux de variation entre 6 et 8.\ne) Sur quel intervalle $f$ est-elle croissante ?\nf) Quel est le maximum des ventes, en milliers d'euros ?",
          figure: grille(["x", "f(x)"], [[0, 10], [2, 14], [4, 18], [6, 12], [8, 9]]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "-3" },
            { question: "d)", attendu: "-1,5" },
            { question: "e)", attendu: "[0 ; 4]" },
            { question: "f)", attendu: "18" },
          ],
          schema: tableauVariations([0, 4, 8], [10, 18, 9]),
          correction:
            "a) $\\dfrac{14 - 10}{2} = 2$.\nb) $\\dfrac{18 - 14}{2} = 2$.\nc) $\\dfrac{12 - 18}{2} = -3$.\nd) $\\dfrac{9 - 12}{2} = -1{,}5$.\ne) Les taux sont positifs jusqu'à $x = 4$, puis négatifs : $f$ est croissante sur $[0\\,;\\,4]$, décroissante sur $[4\\,;\\,8]$.\nf) Le maximum est atteint au changement de sens : $f(4) = 18$.\nLe tableau de variations ci-dessous résume la situation.\n⛔ Le piège au e) : voir deux taux égaux et croire que $f$ s'arrête de monter. Ce qui compte, c'est le changement de SIGNE.\nRéponse : a) 2 ; b) 2 ; c) $-3$ ; d) $-1{,}5$ ; e) $[0\\,;\\,4]$ ; f) 18.",
          micros: ["fct_mono_signe_taux", "fct_mono_tableau"],
        },
        {
          titre: "La neige de la station",
          enonce:
            "Une nivologue modélise la hauteur de neige $f(x)$, en cm, $x$ mois après le début de la saison. Voici son tableau de variations.\na) Écris < ou > pour $f(1)$ … $f(2)$.\nb) Écris < ou > pour $f(5)$ … $f(6)$.\nc) Un employé, Malo, affirme : « $2 < 6$, donc $f(2) < f(6)$ ». Peut-on l'affirmer ? Réponds oui ou non.\nd) Donne les deux bornes entre lesquelles se trouve $f(5)$ : la plus petite, puis la plus grande.",
          figure: tableauVariations([0, 3, 7], [120, 180, 60]),
          reponses: [
            { question: "a)", attendu: compare("1", "<", "2") },
            { question: "b)", attendu: compare("5", ">", "6") },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "60 ; 180", ordre: true },
          ],
          correction:
            "a) 1 et 2 sont dans $[0\\,;\\,3]$, où $f$ croît : $f(1) < f(2)$.\nb) 5 et 6 sont dans $[3\\,;\\,7]$, où $f$ décroît : $f(5) > f(6)$.\nc) Non : 2 est avant le sommet, 6 est après. La règle ne s'applique pas.\nd) 5 est dans $[3\\,;\\,7]$, où $f$ descend de 180 à 60 : $f(5)$ est entre 60 et 180.\n⛔ Le piège au c) : appliquer « l'ordre est conservé » sur tout l'intervalle. Il ne l'est que sur un morceau où $f$ croît.\nRéponse : a) < ; b) > ; c) non ; d) 60 ; 180.",
          micros: ["fct_mono_comparer_images"],
        },
      ],
    },
  ],
};
