// ─── Fiche d'exercices : la fonction x ↦ kaˣ, variations et allure (STMG, Tle) ─
//
// Notion expo_variations du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts`). Le coach demande :
// comparer la base à 1 (pas à 0) pour le sens de variation, reconnaître l'allure et
// le point commun (0 ; 1), le rôle de k (valeur de départ, un k négatif inverse le
// sens), et le parallèle avec la suite géométrique de même raison. Pas de dérivée,
// pas de limite, pas de nombre e.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; climat (glaciologue), commerce
// (gérante de librairie), écologie (écologue), association (trésorier), cuisine
// (traiteur), nature à La Réunion (association de suivi des tortues), sport
// (éditrice d'une appli), automobile (garagiste), urbanisme (urbaniste), biologie
// (trois colonies, technicien de laboratoire), rugby (président de club),
// logistique (logisticienne).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-exponentielle.mjs`.
//
// Micro-compétences : expoT_sens_selon_a (1, 2, 9, 10, 16, 17, 19, 20),
// expoT_allure (3, 4, 11, 18), expoT_role_k (5, 6, 9, 10, 12, 13, 15, 16, 17, 19),
// expoT_lien_suite (7, 8, 14, 15, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableauVariations } from "@/lib/fiches-exercices/figures";

export const exercicesExpoVariationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "expo-variations",
  titre: "La fonction x ↦ kaˣ : variations et allure",
  accroche:
    "Vingt exercices pour lire le sens de variation d'une exponentielle sans se tromper : comparer la base à 1, reconnaître l'allure de la courbe, voir ce que change le coefficient k, et relier la fonction à la suite géométrique. Un glacier, une librairie, le déficit d'un club de rugby, une voiture d'occasion, le vélo en ville, un stock qui fond. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : comparer la base à 1, regarder le signe de k, ou lire la courbe.",
      rappel: [
        "$x \\mapsto a^x$ est croissante si $a > 1$, décroissante si $0 < a < 1$, constante si $a = 1$. On compare la base à 1, pas à 0.",
        "Toutes les courbes de $x \\mapsto a^x$ passent par le point $(0\\,;\\,1)$, car $a^0 = 1$, et restent au-dessus de l'axe des abscisses.",
        "Pour $f(x) = k \\times a^x$ : $f(0) = k$ est la valeur de départ. Un $k$ négatif retourne la courbe et inverse le sens de variation.",
        "La base de la fonction est la raison de la suite qu'elle prolonge : le sens de variation est le même.",
      ],
      exercices: [
        {
          enonce:
            "Donne le sens de variation de chaque fonction. Réponds croissante, décroissante ou constante.\na) $f(x) = 1{,}05^x$\nb) $g(x) = 0{,}9^x$\nc) $h(x) = 1^x$",
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "constante" },
          ],
          correction:
            "On compare chaque base à 1.\na) $1{,}05 > 1$ : $f$ est croissante.\nb) $0 < 0{,}9 < 1$ : $g$ est décroissante.\nc) $1^x = 1$ pour tout $x$ : $h$ est constante.\n⛔ Le piège au b) : dire « 0,9 est positif, donc ça monte ». Le seuil est 1, pas 0.\nRéponse : a) croissante ; b) décroissante ; c) constante.",
          micros: ["expoT_sens_selon_a"],
        },
        {
          enonce:
            "Parmi ces quatre fonctions, laquelle est DÉCROISSANTE ? Réponds par la lettre.\nA. $f(x) = 1{,}02^x$\nB. $f(x) = 0{,}98^x$\nC. $f(x) = 2{,}5^x$\nD. $f(x) = 1{,}3^x$",
          reponses: [{ attendu: "B" }],
          correction:
            "On compare chaque base à 1.\nSeule $0{,}98$ est plus petite que 1 : la fonction B décroît.\nLes bases 1,02, 2,5 et 1,3 sont plus grandes que 1 : ces fonctions croissent.\n⛔ Le piège : choisir A parce que 1,02 semble petit. 1,02 reste au-dessus de 1, même de très peu.\nRéponse : B.",
          micros: ["expoT_sens_selon_a"],
        },
        {
          enonce:
            "La courbe tracée est celle d'une fonction $x \\mapsto a^x$. Que peut-on dire de la base $a$ ? Réponds par la lettre.\nA. $a > 1$\nB. $0 < a < 1$\nC. $a$ est négatif\nD. $a = 1$",
          figure: repere([-3, 4, -1, 5], [{ pts: [[-2, 4], [-1.5, 2.83], [-1, 2], [-0.5, 1.41], [0, 1], [0.5, 0.71], [1, 0.5], [1.5, 0.35], [2, 0.25], [2.5, 0.18], [3, 0.13]] }]),
          reponses: [{ attendu: "B" }],
          correction:
            "La courbe descend quand $x$ augmente, en s'aplatissant : la fonction est décroissante.\nDonc la base est comprise entre 0 et 1.\n⛔ Le piège : répondre C, parce que la courbe descend. Une base négative n'existe pas pour ces fonctions, et la courbe reste au-dessus de l'axe.\nRéponse : B.",
          micros: ["expoT_allure"],
        },
        {
          enonce:
            "Soit $f(x) = 2{,}5^x$.\na) Calcule $f(0)$.\nb) La courbe de $f$ passe-t-elle par l'origine du repère ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1", exact: true },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $f(0) = 2{,}5^0 = 1$ : toute base positive à la puissance 0 vaut 1.\nb) En $x = 0$, la courbe est à la hauteur 1, pas 0 : elle passe au-dessus de l'origine.\n⛔ Le piège au a) : répondre 0 ou 2,5. Un exposant nul donne toujours 1.\nRéponse : a) 1 ; b) non.",
          micros: ["expoT_allure"],
        },
        {
          enonce:
            "Donne le sens de variation de chaque fonction. Réponds croissante ou décroissante.\na) $f(x) = 3 \\times 1{,}5^x$\nb) $g(x) = -2 \\times 1{,}5^x$",
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "décroissante" },
          ],
          correction:
            "La base 1,5 est plus grande que 1 : $1{,}5^x$ croît.\na) $k = 3$ est positif : le sens est conservé, $f$ est croissante.\nb) $k = -2$ est négatif : le sens est inversé, $g$ est décroissante.\n⛔ Le piège au b) : regarder seulement la base et oublier le signe de $k$.\nRéponse : a) croissante ; b) décroissante.",
          micros: ["expoT_role_k"],
        },
        {
          enonce: "Soit $f(x) = 400 \\times 1{,}08^x$. Calcule $f(0)$, la valeur de départ.",
          reponses: [{ attendu: "400", exact: true }],
          correction:
            "$1{,}08^0 = 1$, donc $f(0) = 400 \\times 1 = 400$.\nLe coefficient $k$ est la valeur de départ.\n⛔ Le piège : calculer $400 \\times 1{,}08 = 432$. Ce nombre est $f(1)$, la valeur au bout d'une période.\nRéponse : 400.",
          micros: ["expoT_role_k"],
        },
        {
          enonce:
            "On considère la suite géométrique $u(n) = 50 \\times 0{,}8^n$ et la fonction $f(x) = 50 \\times 0{,}8^x$ qui la prolonge.\na) Quelle est la raison de la suite ?\nb) Quel est le sens de variation de la suite ? Réponds croissante ou décroissante.\nc) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "décroissante" },
          ],
          correction:
            "a) La raison est le nombre élevé à la puissance $n$ : 0,8.\nb) $0{,}8 < 1$ et le premier terme est positif : la suite décroît.\nc) La base de $f$ est cette même raison : $f$ décroît aussi.\n⛔ Le piège au a) : répondre 50. C'est le premier terme, pas la raison.\nRéponse : a) 0,8 ; b) décroissante ; c) décroissante.",
          micros: ["expoT_lien_suite"],
        },
        {
          enonce:
            "Une suite géométrique a pour terme général $u(n) = 120 \\times 1{,}15^n$. Écris la fonction exponentielle $f$ qui la prolonge.",
          reponses: [{ attendu: "120 × 1,15^x" }],
          correction:
            "Le premier terme reste le coefficient, la raison reste la base.\nOn remplace seulement le rang $n$ par la variable $x$.\n$f(x) = 120 \\times 1{,}15^x$.\n⛔ Le piège : intervertir et écrire $1{,}15 \\times 120^x$. C'est la raison qui devient la base.\nRéponse : $f(x) = 120 \\times 1{,}15^x$.",
          micros: ["expoT_lien_suite"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : ce que disent la base, le coefficient et la courbe.",
      rappel: [
        "Dans $f(x) = k \\times a^x$, $k$ est la valeur de départ et $a$ le coefficient multiplicateur : $a = 0{,}92$ veut dire une baisse de 8 % par période.",
        "Le sens se décide en deux temps : d'abord $a$ par rapport à 1, puis le signe de $k$. Si $k$ est négatif, on inverse.",
        "Pour reconnaître une courbe : elle monte si $a > 1$, elle descend si $0 < a < 1$, et elle passe par $(0\\,;\\,k)$.",
      ],
      exercices: [
        {
          enonce:
            "Une glaciologue modélise le volume d'un glacier, en km³, par $V(x) = 30 \\times 0{,}97^x$, où $x$ compte les années (modèle).\na) Quel est le sens de variation de $V$ ? Réponds croissante ou décroissante.\nb) Quel est le volume de départ ?\nc) De quel pourcentage le volume baisse-t-il chaque année ?",
          reponses: [
            { question: "a)", attendu: "décroissante" },
            { question: "b)", attendu: "30 km³" },
            { question: "c)", attendu: "3 %" },
          ],
          correction:
            "a) $0{,}97 < 1$ et $k = 30$ est positif : $V$ est décroissante.\nb) $V(0) = 30 \\times 0{,}97^0 = 30$ km³.\nc) Le coefficient 0,97 correspond à une baisse : $1 - 0{,}97 = 0{,}03$, soit 3 %.\n⛔ Le piège au c) : répondre 97 %. Le glacier garde 97 % de son volume chaque année : il en perd 3 %.\nRéponse : a) décroissante ; b) 30 km³ ; c) 3 %.",
          schema: tableauVariations([0, 10], [30, 22.12], "V"),
          micros: ["expoT_sens_selon_a", "expoT_role_k"],
        },
        {
          enonce:
            "La gérante d'une librairie modélise le nombre de livres vendus par an dans quatre rayons, avec $x$ en années (modèle) :\nA : $200 \\times 1{,}04^x$\nB : $150 \\times 0{,}85^x$\nC : $90 \\times 1{,}2^x$\nD : $300 \\times 0{,}99^x$\na) Quels rayons voient leurs ventes baisser ? Écris les deux lettres, séparées par un point-virgule.\nb) Quel rayon vend le plus au départ ? Écris sa lettre.\nc) Combien vend-il au départ ?",
          reponses: [
            { question: "a)", attendu: "B ; D" },
            { question: "b)", attendu: "D" },
            { question: "c)", attendu: "300" },
          ],
          correction:
            "a) On compare les bases à 1 : seules 0,85 et 0,99 sont plus petites. Ce sont B et D.\nb) La valeur de départ est le coefficient $k$ : le plus grand est 300, celui du rayon D.\nc) $300 \\times 0{,}99^0 = 300$.\n⛔ Le piège au a) : prendre D pour un rayon qui monte, parce que 300 est le plus grand nombre. Le nombre devant ne donne pas le sens.\nRéponse : a) B ; D ; b) D ; c) 300.",
          micros: ["expoT_sens_selon_a", "expoT_role_k"],
        },
        {
          enonce:
            "Une écologue compare deux populations d'oiseaux, en milliers, avec $x$ en années à partir d'aujourd'hui (modèle) : $f(x) = 1{,}5^x$ et $g(x) = 0{,}6^x$. La figure montre leurs courbes, repérées par les lettres A et B.\na) Quelle courbe est celle de $f$ ? Écris sa lettre.\nb) Quelles sont les coordonnées du point commun aux deux courbes ? Écris-les sous la forme (x ; y).\nc) L'une de ces courbes coupe-t-elle l'axe des abscisses ? Réponds oui ou non.",
          figure: repere([-4, 4, -1, 6], [
            { pts: [[-3, 0.3], [-2.5, 0.36], [-2, 0.44], [-1.5, 0.54], [-1, 0.67], [-0.5, 0.82], [0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38]] },
            { pts: [[-3, 4.63], [-2.5, 3.59], [-2, 2.78], [-1.5, 2.15], [-1, 1.67], [-0.5, 1.29], [0, 1], [0.5, 0.77], [1, 0.6], [1.5, 0.46], [2, 0.36], [2.5, 0.28], [3, 0.22]], couleur: ORANGE },
          ], [{ x: 3, y: 3.38, label: "A" }, { x: -3, y: 4.63, label: "B" }]),
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "(0 ; 1)", ordre: true },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) La base de $f$ vaut 1,5, plus grande que 1 : sa courbe monte. C'est la courbe A.\nb) Pour toute base, $a^0 = 1$ : les deux courbes passent par $(0\\,;\\,1)$.\nc) Une puissance de base positive ne s'annule jamais : les courbes restent au-dessus de l'axe.\n⛔ Le piège au c) : croire que la courbe B va finir par toucher l'axe. Elle s'en approche, sans jamais l'atteindre.\nRéponse : a) A ; b) (0 ; 1) ; c) non.",
          micros: ["expoT_allure"],
        },
        {
          enonce:
            "Le trésorier d'une association décrit son solde, en milliers d'euros, par $f(x) = -5 \\times 1{,}2^x$, où $x$ compte les années, de 0 à 5 (modèle).\na) Calcule $f(0)$.\nb) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nc) Calcule $f(3)$.\nd) Le déficit se creuse-t-il ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "−5" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "−8,64" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $f(0) = -5 \\times 1 = -5$.\nb) $1{,}2^x$ croît, car $1{,}2 > 1$. Mais $k = -5$ est négatif : le sens est inversé, $f$ est décroissante.\nc) $f(3) = -5 \\times 1{,}2^3 = -5 \\times 1{,}728 = -8{,}64$.\nd) Le solde passe de $-5$ à $-8{,}64$ : il descend, donc le déficit se creuse.\n⛔ Le piège au b) : dire « croissante » parce que 1,2 est plus grand que 1.\nRéponse : a) $-5$ ; b) décroissante ; c) $-8{,}64$ ; d) oui.",
          schema: tableauVariations([0, 5], [-5, -12.44]),
          micros: ["expoT_role_k"],
        },
        {
          enonce:
            "Un traiteur sort un plat du réfrigérateur. La différence entre la température du plat et celle de la pièce (plat moins pièce), en °C, est modélisée par $f(x) = -16 \\times 0{,}5^x$, où $x$ compte les heures, de 0 à 4.\na) Calcule $f(0)$.\nb) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nc) Calcule $f(3)$.",
          reponses: [
            { question: "a)", attendu: "−16" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "−2" },
          ],
          correction:
            "a) $f(0) = -16 \\times 1 = -16$ : le plat est 16 °C plus froid que la pièce.\nb) $0{,}5^x$ décroît, car $0{,}5 < 1$. Et $k = -16$ est négatif : le sens est inversé, $f$ est croissante.\nc) $f(3) = -16 \\times 0{,}125 = -2$.\nL'écart remonte vers 0 : le plat se réchauffe.\n⛔ Le piège au b) : s'arrêter à la base et dire « décroissante ». Deux inversions donnent une montée.\nRéponse : a) $-16$ ; b) croissante ; c) $-2$.",
          schema: tableauVariations([0, 4], [-16, -1]),
          micros: ["expoT_role_k"],
        },
        {
          enonce:
            "Une association de La Réunion suit les tortues marines d'une plage. Le nombre de pontes de l'année $n$ est modélisé par $u(n) = 200 \\times 1{,}1^n$ (modèle).\na) Quelle est la raison de la suite ?\nb) Quel est son sens de variation ? Réponds croissante ou décroissante.\nc) Écris la fonction $f$ qui prolonge la suite.\nd) Calcule $f(3)$, arrondi à l'unité.",
          reponses: [
            { question: "a)", attendu: "1,1" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "200 × 1,1^x" },
            { question: "d)", attendu: "266", tolerance: 0.5 },
          ],
          correction:
            "a) La raison est le nombre élevé à la puissance $n$ : 1,1.\nb) $1{,}1 > 1$ et le premier terme est positif : la suite est croissante.\nc) Même écriture avec $x$ : $f(x) = 200 \\times 1{,}1^x$.\nd) $f(3) = 200 \\times 1{,}331 = 266{,}2$, soit environ 266 pontes. C'est aussi $u(3)$ : la courbe passe par les points de la suite.\n⛔ Le piège au d) : calculer $(200 \\times 1{,}1)^3$. La puissance porte seulement sur 1,1.\nRéponse : a) 1,1 ; b) croissante ; c) $f(x) = 200 \\times 1{,}1^x$ ; d) environ 266.",
          micros: ["expoT_lien_suite"],
        },
        {
          enonce:
            "L'éditrice d'une appli de sport modélise ses ventes, en milliers d'euros, par $f(x) = k \\times 1{,}5^x$, où $x$ compte les années. La figure montre les valeurs de fin d'année (points) et la courbe qui les prolonge.\na) Lis la valeur de $k$ sur la figure.\nb) Calcule $f(2)$.\nc) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nd) Que peut-on dire de la suite (les points) et de la fonction (la courbe) ? Réponds par la lettre.\nA. Elles ont le même sens de variation.\nB. Elles ont des sens de variation contraires.\nC. On ne peut pas les comparer.",
          figure: repere([-1, 5, -1, 12], [{ pts: [[0, 2], [0.5, 2.45], [1, 3], [1.5, 3.67], [2, 4.5], [2.5, 5.51], [3, 6.75], [3.5, 8.27], [4, 10.13]] }], [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 4.5 }, { x: 3, y: 6.75 }, { x: 4, y: 10.13 }], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "4,5" },
            { question: "c)", attendu: "croissante" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) $k = f(0)$ : on lit la hauteur de la courbe en $x = 0$. Elle vaut 2.\nb) $f(2) = 2 \\times 1{,}5^2 = 2 \\times 2{,}25 = 4{,}5$.\nc) $1{,}5 > 1$ et $k = 2$ est positif : $f$ est croissante.\nd) La raison de la suite est la base de la fonction : le critère est le même, et la courbe passe par les points. C'est A.\n⛔ Le piège au a) : lire 1, comme pour $x \\mapsto a^x$. La courbe de $k \\times a^x$ passe par $(0\\,;\\,k)$.\nRéponse : a) 2 ; b) 4,5 ; c) croissante ; d) A.",
          micros: ["expoT_role_k", "expoT_lien_suite"],
        },
        {
          enonce:
            "Un garagiste estime la valeur d'une voiture, en euros, par $V(x) = 18\\,000 \\times 0{,}85^x$, où $x$ compte les années depuis l'achat (modèle).\na) Quelle est la valeur à l'achat ?\nb) Quel est le sens de variation de $V$ ? Réponds croissante ou décroissante.\nc) Calcule la valeur au bout d'un an.\nd) Calcule la valeur au bout de 4 ans, arrondie à l'euro.",
          reponses: [
            { question: "a)", attendu: "18 000 €" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "15 300 €" },
            { question: "d)", attendu: "9 396 €", tolerance: 0.5 },
          ],
          correction:
            "a) $V(0) = 18\\,000 \\times 0{,}85^0 = 18\\,000$ €.\nb) $0{,}85 < 1$ et $k$ est positif : $V$ est décroissante.\nc) $V(1) = 18\\,000 \\times 0{,}85 = 15\\,300$ €.\nd) $V(4) = 18\\,000 \\times 0{,}85^4 \\approx 9\\,396$ €.\n⛔ Le piège au a) : répondre 15 300 €. C'est la valeur après un an : à l'achat, $x = 0$.\nRéponse : a) 18 000 € ; b) décroissante ; c) 15 300 € ; d) environ 9 396 €.",
          schema: tableauVariations([0, 4], [18000, 9396], "V"),
          micros: ["expoT_sens_selon_a", "expoT_role_k"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : le sens d'abord, puis les calculs, puis la conclusion dans la situation.",
      rappel: [
        "Comparer deux modèles : on regarde leur sens, puis on calcule leurs valeurs au même $x$. Celui qui part devant ne reste pas forcément devant.",
        "Sur un graphique, pour savoir quelle courbe va avec quelle formule, on calcule une image de chaque fonction et on la cherche sur la figure.",
        "Un solde négatif qui croît se rapproche de 0 : le déficit se réduit.",
      ],
      exercices: [
        {
          titre: "Le vélo et la voiture",
          enonce:
            "Une urbaniste modélise le nombre de trajets quotidiens dans une ville, avec $x$ en années (modèle) : à vélo $f(x) = 1\\,000 \\times 1{,}08^x$, en voiture $g(x) = 5\\,000 \\times 0{,}95^x$.\na) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nb) Quel est le sens de variation de $g$ ? Réponds de la même façon.\nc) Calcule $f(10)$, arrondi à l'unité.\nd) Calcule $g(10)$, arrondi à l'unité.\ne) Au bout de 15 ans, qui fait le plus de trajets ? Écris vélo ou voiture.",
          reponses: [
            { question: "a)", attendu: "croissante" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "2 159", tolerance: 0.5 },
            { question: "d)", attendu: "2 994", tolerance: 0.5 },
            { question: "e)", attendu: ["vélo", "vélos", "le vélo", "à vélo", "les vélos"] },
          ],
          correction:
            "a) $1{,}08 > 1$ et $k$ est positif : $f$ est croissante.\nb) $0{,}95 < 1$ et $k$ est positif : $g$ est décroissante.\nc) $f(10) = 1\\,000 \\times 1{,}08^{10} \\approx 2\\,159$ trajets.\nd) $g(10) = 5\\,000 \\times 0{,}95^{10} \\approx 2\\,994$ trajets : la voiture reste devant.\ne) $f(15) \\approx 3\\,172$ et $g(15) \\approx 2\\,316$ : le vélo est passé devant.\n⛔ Le piège au e) : s'arrêter à $x = 10$. Une courbe qui monte finit par rattraper une courbe qui descend.\nRéponse : a) croissante ; b) décroissante ; c) environ 2 159 ; d) environ 2 994 ; e) vélo.",
          micros: ["expoT_sens_selon_a", "expoT_role_k"],
        },
        {
          titre: "Les trois colonies",
          enonce:
            "Un technicien de laboratoire suit trois colonies, en milliers d'individus, avec $x$ en jours (modèle) : $f(x) = 2^x$, $g(x) = 1{,}2^x$ et $h(x) = 0{,}6^x$. La figure montre leurs courbes, repérées par A, B et C.\na) Calcule $f(3)$.\nb) Quelle courbe est celle de $f$ ? Écris sa lettre.\nc) Quelle courbe est celle de $g$ ? Écris sa lettre.\nd) Quelle courbe est celle de $h$ ? Écris sa lettre.\ne) Quelle est la valeur commune de ces trois fonctions en $x = 0$ ?",
          figure: repere([-3, 5, -1, 9], [
            { pts: [[-2, 0.25], [-1.5, 0.35], [-1, 0.5], [-0.5, 0.71], [0, 1], [0.5, 1.41], [1, 2], [1.5, 2.83], [2, 4], [2.5, 5.66], [3, 8]] },
            { pts: [[-2, 0.69], [-1.5, 0.76], [-1, 0.83], [-0.5, 0.91], [0, 1], [0.5, 1.1], [1, 1.2], [1.5, 1.31], [2, 1.44], [2.5, 1.58], [3, 1.73], [3.5, 1.89], [4, 2.07]], couleur: "#16a34a" },
            { pts: [[-2, 2.78], [-1.5, 2.15], [-1, 1.67], [-0.5, 1.29], [0, 1], [0.5, 0.77], [1, 0.6], [1.5, 0.46], [2, 0.36], [2.5, 0.28], [3, 0.22], [3.5, 0.17], [4, 0.13]], couleur: ORANGE },
          ], [{ x: 3, y: 8, label: "A" }, { x: 4, y: 2.07, label: "B" }, { x: -2, y: 2.78, label: "C" }]),
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: "C" },
            { question: "e)", attendu: "1" },
          ],
          correction:
            "a) $f(3) = 2^3 = 8$.\nb) La courbe A passe par le point de hauteur 8 en $x = 3$ : c'est $f$.\nc) $g(3) = 1{,}2^3 = 1{,}728$ : la courbe B monte, mais bien moins vite. C'est $g$.\nd) $h$ a une base plus petite que 1 : elle descend. C'est la courbe C.\ne) $2^0 = 1{,}2^0 = 0{,}6^0 = 1$.\n⛔ Le piège au c) : donner C à $g$ parce que sa base est « petite ». 1,2 reste plus grand que 1 : la courbe monte.\nRéponse : a) 8 ; b) A ; c) B ; d) C ; e) 1.",
          micros: ["expoT_allure"],
        },
        {
          titre: "Le déficit du club de rugby",
          enonce:
            "Le président d'un club de rugby décrit le solde du club, en milliers d'euros, par $f(x) = -3 \\times 0{,}8^x$, où $x$ compte les années, de 0 à 4 (modèle). Son adjoint Théo écrit : « $f$ est décroissante, car 0,8 est plus petit que 1. »\na) La phrase de Théo est-elle juste ? Réponds vrai ou faux.\nb) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nc) Calcule $f(0)$.\nd) Calcule $f(2)$.\ne) Le déficit se réduit-il ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "faux" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "−3" },
            { question: "d)", attendu: "−1,92" },
            { question: "e)", attendu: "oui" },
          ],
          correction:
            "a) Faux : Théo a oublié le signe de $k$.\nb) $0{,}8^x$ décroît, et $k = -3$ est négatif : le sens est inversé, $f$ est croissante.\nc) $f(0) = -3 \\times 1 = -3$.\nd) $f(2) = -3 \\times 0{,}64 = -1{,}92$.\ne) Le solde passe de $-3$ à $-1{,}92$ : il se rapproche de 0, donc le déficit se réduit.\n⛔ Le piège au e) : voir que 1,92 est plus petit que 3, et conclure que le solde baisse. C'est la dette qui diminue, et le solde qui monte.\nRéponse : a) faux ; b) croissante ; c) $-3$ ; d) $-1{,}92$ ; e) oui.",
          schema: tableauVariations([0, 4], [-3, -1.23]),
          micros: ["expoT_sens_selon_a", "expoT_role_k"],
        },
        {
          titre: "Le stock qui fond",
          enonce:
            "Une logisticienne gère un stock de 6 000 articles qui baisse de 30 % par mois (modèle).\na) Quelle est la base du modèle ?\nb) Écris la fonction $f$ qui donne le stock au bout de $x$ mois.\nc) Quel est le sens de variation de $f$ ? Réponds croissante ou décroissante.\nd) La suite géométrique des stocks de fin de mois a-t-elle le même sens de variation que $f$ ? Réponds oui ou non.\ne) Calcule le stock au bout de 4 mois, arrondi à l'unité.",
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "6 000 × 0,7^x" },
            { question: "c)", attendu: "décroissante" },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "1 441", tolerance: 0.5 },
          ],
          correction:
            "a) Baisse de 30 % : $1 - 0{,}3 = 0{,}7$.\nb) $f(x) = 6\\,000 \\times 0{,}7^x$.\nc) $0{,}7 < 1$ et $k$ est positif : $f$ est décroissante.\nd) Oui : la raison de la suite est la base de $f$, le critère est le même.\ne) $f(4) = 6\\,000 \\times 0{,}2401 = 1\\,440{,}6$, soit environ 1 441 articles.\n⛔ Le piège au a) : prendre 0,3 comme base. Il resterait 30 % du stock chaque mois, au lieu de 70 %.\nRéponse : a) 0,7 ; b) $f(x) = 6\\,000 \\times 0{,}7^x$ ; c) décroissante ; d) oui ; e) environ 1 441.",
          schema: tableauVariations([0, 4], [6000, 1440.6]),
          micros: ["expoT_sens_selon_a", "expoT_lien_suite"],
        },
      ],
    },
  ],
};
