// ─── Fiche d'exercices : dériver un polynôme (STMG) — 20 exercices ─────────────
//
// Notion der_polynome du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : la dérivée d'un polynôme de degré 2
// ou 3, f'(a), où la tangente est horizontale ou a un coefficient donné, et
// vérifier une forme factorisée de la dérivée (en développant, ou en testant une
// valeur). Il ne demande PAS de trouver seul la factorisation : elle est donnée.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (1 à 8) ; chocolaterie (chocolatière, 9),
// rivière (garde-rivière et son stagiaire Lucas, 10), pêche (marin-pêcheur, 11), huîtres
// (ostréicultrice, 12), stocks (responsable, 13), copie d'élève (Awa, 14), hôtel
// (gérant, 15), mer (biologiste marine, 16) ; festival (trésorier, 17), ballon-sonde
// (météorologue, 18), glacier (glacière, 19), cours particulier (professeure, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_p_degre2 (1, 2, 3, 6, 9, 10, 11, 12, 16), der_p_degre3
// (4, 5, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20), der_p_nombre_derive (6, 7, 9, 10,
// 11, 12, 13, 14, 15, 16, 17, 18, 19, 20), der_p_forme_factorisee (8, 13, 14, 15,
// 18, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesDerPolynomeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-polynome",
  titre: "Dériver un polynôme",
  accroche:
    "Vingt exercices pour dériver un polynôme de degré 2 ou 3 d'un seul geste : terme à terme, le nombre seul qui disparaît, puis le calcul du nombre dérivé, la tangente horizontale, et la forme factorisée qu'on vérifie. Un chocolat, un ballon-sonde, des huîtres, un glacier, un festival. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : dériver terme à terme, ou remplacer dans la dérivée.",
      rappel: [
        "Degré 2 : $ax^2 + bx + c$ a pour dérivée $2ax + b$.",
        "Degré 3 : $ax^3$ a pour dérivée $3ax^2$. On ajoute les dérivées des autres termes.",
        "Le terme constant disparaît : sa dérivée est 0.",
        "Pour vérifier une forme factorisée de $f'(x)$, on la développe et on compare.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = x^2 - 7x - 7$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["2x - 7", "f'(x) = 2x - 7"] }],
          correction:
            "$x^2$ donne $2x$, $-7x$ donne $-7$, et $-7$ disparaît.\n$f'(x) = 2x - 7$.\n⛔ Le piège : écrire $2x - 7x$. La dérivée de $-7x$ est $-7$, sans $x$.\nRéponse : $2x - 7$.",
          micros: ["der_p_degre2"],
        },
        {
          enonce: "Soit $f(x) = 4x^2 + 6x + 1$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["8x + 6", "f'(x) = 8x + 6"] }],
          correction:
            "$4x^2$ donne $4 \\times 2x = 8x$.\n$6x$ donne 6, et 1 disparaît.\n$f'(x) = 8x + 6$.\n⛔ Le piège : écrire $4x + 6$, en oubliant de multiplier 4 par 2.\nRéponse : $8x + 6$.",
          micros: ["der_p_degre2"],
        },
        {
          enonce: "Soit $f(x) = -x^2 + 4x$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["-2x + 4", "f'(x) = -2x + 4"] }],
          correction:
            "$-x^2$ donne $-2x$, et $4x$ donne 4.\n$f'(x) = -2x + 4$.\n⛔ Le piège : perdre le moins devant $x^2$. Il reste devant le $2x$.\nRéponse : $-2x + 4$.",
          micros: ["der_p_degre2"],
        },
        {
          enonce: "Soit $f(x) = 2x^3 - x^2 + 5x - 1$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["6x^2 - 2x + 5", "f'(x) = 6x^2 - 2x + 5"] }],
          correction:
            "On dérive terme à terme.\n$2x^3$ donne $6x^2$. $-x^2$ donne $-2x$. $5x$ donne 5. $-1$ disparaît.\n$f'(x) = 6x^2 - 2x + 5$.\n⛔ Le piège : garder les exposants, $6x^3 - 2x^2$. Chaque exposant baisse de 1.\nRéponse : $6x^2 - 2x + 5$.",
          micros: ["der_p_degre3"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 5x - 9$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["3x^2 - 5", "f'(x) = 3x^2 - 5"] }],
          correction:
            "$x^3$ donne $3x^2$, $-5x$ donne $-5$, et $-9$ disparaît.\n$f'(x) = 3x^2 - 5$.\n⛔ Le piège : écrire $3x^2 - 5 - 9$. Le terme constant ne laisse aucune trace.\nRéponse : $3x^2 - 5$.",
          micros: ["der_p_degre3"],
        },
        {
          enonce: "Soit $f(x) = 3x^2 - 7x + 2$.\na) Donne l'expression de $f'(x)$.\nb) Calcule $f'(5)$.",
          reponses: [
            { question: "a)", attendu: ["6x - 7", "f'(x) = 6x - 7"] },
            { question: "b)", attendu: "23" },
          ],
          correction:
            "a) $f'(x) = 6x - 7$.\nb) $f'(5) = 6 \\times 5 - 7 = 23$.\n⛔ Le piège au b) : remplacer dans $f$ et non dans $f'$. On trouverait $f(5) = 42$, l'ordonnée du point.\nRéponse : a) $6x - 7$ ; b) 23.",
          micros: ["der_p_degre2", "der_p_nombre_derive"],
        },
        {
          enonce: "Soit $g(t) = t^3 - 2t + 3$.\na) Donne l'expression de $g'(t)$.\nb) Calcule $g'(2)$.",
          reponses: [
            { question: "a)", attendu: ["3t^2 - 2", "g'(t) = 3t^2 - 2"] },
            { question: "b)", attendu: "10" },
          ],
          correction:
            "a) $g'(t) = 3t^2 - 2$.\nb) $g'(2) = 3 \\times 2^2 - 2 = 12 - 2 = 10$.\n⛔ Le piège au b) : calculer $(3 \\times 2)^2$. La puissance passe d'abord : $2^2 = 4$, puis $3 \\times 4$.\nRéponse : a) $3t^2 - 2$ ; b) 10.",
          micros: ["der_p_degre3", "der_p_nombre_derive"],
        },
        {
          enonce:
            "Soit $f(x) = x^3 - 27x + 4$. On affirme que $f'(x) = 3(x + 3)(x - 3)$.\na) Donne l'expression développée de $f'(x)$, obtenue en dérivant.\nb) La forme factorisée proposée est-elle exacte ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["3x^2 - 27", "-27 + 3x^2"], exact: true },
            { question: "b)", attendu: "oui" },
          ],
          correction:
            "a) En dérivant : $f'(x) = 3x^2 - 27$.\nb) On développe la forme proposée : $(x + 3)(x - 3) = x^2 - 9$, donc $3(x^2 - 9) = 3x^2 - 27$. C'est la même expression : oui.\n⛔ Le piège au b) : oublier le 3 devant, et comparer $x^2 - 9$ à $3x^2 - 27$.\nRéponse : a) $3x^2 - 27$ ; b) oui.",
          micros: ["der_p_degre3", "der_p_forme_factorisee"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on dérive d'abord, on répond ensuite à ce qui est demandé.",
      rappel: [
        "Une tangente horizontale, ou parallèle à l'axe des abscisses : on résout $f'(x) = 0$.",
        "Une tangente de coefficient directeur donné : on résout $f'(x) =$ ce nombre.",
        "Tester une forme factorisée : on choisit une valeur simple de $x$, on calcule $f'(x)$ et la forme proposée. Deux résultats différents : elle est fausse.",
        "Résoudre un produit nul : $5x(x - 3) = 0$ quand $x = 0$ ou $x = 3$.",
      ],
      exercices: [
        {
          enonce:
            "Une chocolatière fabrique $x$ coffrets. Le coût total est $C(x) = x^2 + 6x + 80$, en euros (modèle).\na) Donne l'expression de $C'(x)$.\nb) Calcule le coût marginal $C'(20)$.\nc) Calcule le vrai coût du 21e coffret, $C(21) - C(20)$.",
          reponses: [
            { question: "a)", attendu: ["2x + 6", "C'(x) = 2x + 6"] },
            { question: "b)", attendu: "46 €" },
            { question: "c)", attendu: "47 €" },
          ],
          correction:
            "a) $C'(x) = 2x + 6$.\nb) $C'(20) = 40 + 6 = 46$ €.\nc) $C(21) = 441 + 126 + 80 = 647$ et $C(20) = 400 + 120 + 80 = 600$. L'écart vaut 47 €.\nLe coût marginal est proche du vrai coût.\n⛔ Le piège au a) : garder le 80. Ce coût fixe ne change pas avec $x$ : sa dérivée est 0.\nRéponse : a) $2x + 6$ ; b) 46 € ; c) 47 €.",
          micros: ["der_p_degre2", "der_p_nombre_derive"],
        },
        {
          enonce:
            "Un garde-rivière modélise la hauteur d'une rivière par $H(t) = -t^2 + 10t + 5$, en décimètres, où $t$ est le temps en heures. Lucas, un stagiaire, calcule $H'(3) = 9$.\na) Donne l'expression de $H'(t)$.\nb) Calcule $H'(3)$.\nc) Le résultat de Lucas est-il juste ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: ["-2t + 10", "H'(t) = -2t + 10"] },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "faux" },
          ],
          correction:
            "a) $H'(t) = -2t + 10$ : le 5 disparaît.\nb) $H'(3) = -6 + 10 = 4$.\nc) Faux : Lucas a gardé la constante, $4 + 5 = 9$.\n⛔ Le piège : garder le terme constant dans la dérivée. C'est l'erreur de Lucas.\nRéponse : a) $-2t + 10$ ; b) 4 ; c) faux.",
          micros: ["der_p_degre2", "der_p_nombre_derive"],
        },
        {
          enonce:
            "Un marin-pêcheur modélise sa consommation de gazole par $E(x) = 2x^2 - 24x + 90$, en litres par heure, où $x$ est la vitesse du bateau en nœuds (modèle).\na) Donne l'expression de $E'(x)$.\nb) Pour quelle vitesse la tangente à la courbe est-elle parallèle à l'axe des abscisses ?\nc) Quelle est la consommation à cette vitesse ?",
          reponses: [
            { question: "a)", attendu: ["4x - 24", "E'(x) = 4x - 24"] },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "18" },
          ],
          correction:
            "a) $E'(x) = 4x - 24$.\nb) La tangente est horizontale quand $E'(x) = 0$ : $4x = 24$, donc $x = 6$.\nc) $E(6) = 72 - 144 + 90 = 18$ litres par heure.\n⛔ Le piège au b) : résoudre $E(x) = 0$. On cherche où la PENTE est nulle, pas la consommation.\nRéponse : a) $4x - 24$ ; b) 6 ; c) 18.",
          micros: ["der_p_degre2", "der_p_nombre_derive"],
        },
        {
          enonce:
            "Une ostréicultrice modélise la température de l'eau par $\\theta(t) = 0{,}5t^2 - 2t + 10$, en °C, où $t$ est le temps en semaines.\na) Donne l'expression de $\\theta'(t)$.\nb) À quel instant la tangente a-t-elle pour coefficient directeur 3 ?\nc) Quelle est la température à cet instant ?",
          reponses: [
            { question: "a)", attendu: ["t - 2", "θ'(t) = t - 2"] },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "12,5" },
          ],
          correction:
            "a) $0{,}5t^2$ donne $0{,}5 \\times 2t = t$, et $-2t$ donne $-2$. Donc $\\theta'(t) = t - 2$.\nb) $t - 2 = 3$, donc $t = 5$.\nc) $\\theta(5) = 12{,}5 - 10 + 10 = 12{,}5$ °C.\n⛔ Le piège au a) : garder $0{,}5t$. Le 2 de la formule annule le $0{,}5$.\nRéponse : a) $t - 2$ ; b) 5 ; c) 12,5.",
          micros: ["der_p_degre2", "der_p_nombre_derive"],
        },
        {
          enonce:
            "Un responsable de stocks modélise un écart de stock par $S(x) = x^3 - 3x^2 - 9x + 4$, où $x$ est le temps en semaines. On affirme que $S'(x) = 3(x + 1)(x - 3)$.\na) Donne l'expression développée de $S'(x)$, obtenue en dérivant.\nb) La forme factorisée est-elle exacte ? Réponds oui ou non.\nc) Calcule $S'(3)$ avec la forme factorisée.\nd) Calcule $S'(1)$.",
          reponses: [
            { question: "a)", attendu: ["3x^2 - 6x - 9"], exact: true },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "-12" },
          ],
          correction:
            "a) $S'(x) = 3x^2 - 6x - 9$.\nb) $(x + 1)(x - 3) = x^2 - 2x - 3$, puis $3(x^2 - 2x - 3) = 3x^2 - 6x - 9$ : oui.\nc) $S'(3) = 3 \\times 4 \\times 0 = 0$ : un facteur est nul.\nd) $S'(1) = 3 \\times 2 \\times (-2) = -12$.\n⛔ Le piège au b) : développer $(x + 1)(x - 3)$ et s'arrêter là, sans multiplier par 3.\nRéponse : a) $3x^2 - 6x - 9$ ; b) oui ; c) 0 ; d) $-12$.",
          micros: ["der_p_degre3", "der_p_nombre_derive", "der_p_forme_factorisee"],
        },
        {
          enonce:
            "Soit $f(x) = 2x^3 + 3x^2 - 12x$. Awa affirme que $f'(x) = 6(x - 2)(x + 1)$. Elle teste avec $x = 1$.\na) Donne l'expression de $f'(x)$, obtenue en dérivant.\nb) Calcule $f'(1)$ avec cette expression.\nc) Calcule la valeur de la forme d'Awa pour $x = 1$.\nd) La forme d'Awa est-elle exacte ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["6x^2 + 6x - 12", "f'(x) = 6x^2 + 6x - 12"] },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "-12" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $f'(x) = 6x^2 + 6x - 12$.\nb) $f'(1) = 6 + 6 - 12 = 0$.\nc) $6 \\times (1 - 2) \\times (1 + 1) = 6 \\times (-1) \\times 2 = -12$.\nd) Deux résultats différents : la forme d'Awa est fausse. Une seule valeur suffit à le prouver.\n⛔ Le piège au d) : croire qu'une forme est juste parce qu'elle a l'air proche. Il faut la tester.\nRéponse : a) $6x^2 + 6x - 12$ ; b) 0 ; c) $-12$ ; d) non.",
          micros: ["der_p_degre3", "der_p_nombre_derive", "der_p_forme_factorisee"],
        },
        {
          enonce:
            "Un gérant d'hôtel modélise l'écart de son taux d'occupation à la moyenne, en points, par $f(x) = 2x^3 - 6x^2 + 1$, où $x$ est le temps en mois (modèle). Il obtient $f'(x) = 6x(x - 2)$.\na) Cette forme est-elle exacte ? Réponds oui ou non.\nb) Résous $f'(x) = 0$. Donne les deux solutions.\nc) Calcule $f'(1)$.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "0 ; 2" },
            { question: "c)", attendu: "-6" },
          ],
          correction:
            "a) En dérivant : $f'(x) = 6x^2 - 12x$. En développant : $6x(x - 2) = 6x^2 - 12x$. C'est la même : oui.\nb) Un produit est nul si un facteur est nul : $6x = 0$ ou $x - 2 = 0$, donc $x = 0$ ou $x = 2$.\nc) $f'(1) = 6 \\times 1 \\times (-1) = -6$.\n⛔ Le piège au b) : oublier $x = 0$, ou donner 6. Le facteur $6x$ s'annule en 0.\nRéponse : a) oui ; b) 0 et 2 ; c) $-6$.",
          micros: ["der_p_degre3", "der_p_nombre_derive", "der_p_forme_factorisee"],
        },
        {
          enonce:
            "Une biologiste marine étudie deux modèles de population de sardines, en tonnes, où $x$ est le temps en années, entre 0 et 10 : $g(x) = -0{,}5x^2 + 3x + 30$ et $h(x) = 0{,}1x^3 - x^2 + 40$.\na) Donne l'expression de $g'(x)$.\nb) Calcule $g'(4)$.\nc) Donne l'expression de $h'(x)$.\nd) Calcule $h'(10)$.",
          reponses: [
            { question: "a)", attendu: ["-x + 3", "g'(x) = -x + 3"] },
            { question: "b)", attendu: "-1" },
            { question: "c)", attendu: ["0,3x^2 - 2x", "h'(x) = 0,3x^2 - 2x"] },
            { question: "d)", attendu: "10" },
          ],
          correction:
            "a) $-0{,}5x^2$ donne $-x$, et $3x$ donne 3. Donc $g'(x) = -x + 3$.\nb) $g'(4) = -4 + 3 = -1$.\nc) $0{,}1x^3$ donne $0{,}3x^2$, et $-x^2$ donne $-2x$. Donc $h'(x) = 0{,}3x^2 - 2x$.\nd) $h'(10) = 30 - 20 = 10$.\n⛔ Le piège au c) : écrire $0{,}1x^2$. Le 3 de l'exposant descend et multiplie : $3 \\times 0{,}1 = 0{,}3$.\nRéponse : a) $-x + 3$ ; b) $-1$ ; c) $0{,}3x^2 - 2x$ ; d) 10.",
          micros: ["der_p_degre2", "der_p_degre3", "der_p_nombre_derive"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : dériver, vérifier la forme factorisée, l'utiliser, conclure.",
      rappel: [
        "La forme développée sert à calculer, la forme factorisée sert à résoudre $f'(x) = 0$.",
        "Une unité de plus est rentable si le coût marginal est plus petit que le prix de vente.",
        "Attention au vocabulaire : $f(a)$ est une valeur de la grandeur, $f'(a)$ est son rythme d'évolution.",
      ],
      exercices: [
        {
          titre: "Les T-shirts du festival",
          enonce:
            "Un trésorier de festival fait fabriquer $x$ T-shirts. Le coût total est $C(x) = 0{,}1x^3 - 3x^2 + 40x + 100$, en euros (modèle). Chaque T-shirt se vend 25 €.\na) Donne l'expression de $C'(x)$.\nb) Calcule $C'(10)$.\nc) Calcule $C'(20)$.\nd) Après le 10e T-shirt, en produire un de plus est-il rentable ? Réponds oui ou non.\ne) Après le 20e ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["0,3x^2 - 6x + 40", "C'(x) = 0,3x^2 - 6x + 40"] },
            { question: "b)", attendu: "10 €" },
            { question: "c)", attendu: "40 €" },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) $C'(x) = 0{,}3x^2 - 6x + 40$.\nb) $C'(10) = 30 - 60 + 40 = 10$ €.\nc) $C'(20) = 120 - 120 + 40 = 40$ €.\nd) Un de plus coûte environ 10 € et rapporte 25 € : oui.\ne) Un de plus coûte environ 40 € et rapporte 25 € : non.\n⛔ Le piège au b) : calculer $0{,}3 \\times 10$ au lieu de $0{,}3 \\times 10^2$. Le carré d'abord.\nRéponse : a) $0{,}3x^2 - 6x + 40$ ; b) 10 € ; c) 40 € ; d) oui ; e) non.",
          micros: ["der_p_degre3", "der_p_nombre_derive"],
        },
        {
          titre: "Le ballon-sonde",
          enonce:
            "Une météorologue modélise l'altitude d'un ballon-sonde par $A(t) = -t^3 + 6t^2$, en kilomètres, où $t$ est le temps en heures.\na) Donne l'expression de $A'(t)$.\nb) Un collègue propose $A'(t) = -3t(t - 4)$. Est-ce exact ? Réponds oui ou non.\nc) Résous $A'(t) = 0$. Donne les deux solutions.\nd) Quelle est l'altitude à la plus grande de ces valeurs ?\ne) Quel est le rythme de montée à $t = 2$, en km par heure ?",
          reponses: [
            { question: "a)", attendu: ["-3t^2 + 12t", "A'(t) = -3t^2 + 12t"] },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "0 ; 4" },
            { question: "d)", attendu: "32 km" },
            { question: "e)", attendu: "12" },
          ],
          correction:
            "a) $-t^3$ donne $-3t^2$, et $6t^2$ donne $12t$. Donc $A'(t) = -3t^2 + 12t$.\nb) $-3t(t - 4) = -3t^2 + 12t$ : oui.\nc) $-3t = 0$ ou $t - 4 = 0$, donc $t = 0$ ou $t = 4$.\nd) $A(4) = -64 + 96 = 32$ km.\ne) $A'(2) = -12 + 24 = 12$ km par heure.\n⛔ Le piège au a) : écrire $3t^2$, en oubliant le moins. Il reste à sa place à chaque étape.\nRéponse : a) $-3t^2 + 12t$ ; b) oui ; c) 0 et 4 ; d) 32 km ; e) 12.",
          micros: ["der_p_degre3", "der_p_nombre_derive", "der_p_forme_factorisee"],
        },
        {
          titre: "Les ventes du glacier",
          enonce:
            "Une artisane glacière modélise ses ventes par $V(t) = t^3 - 12t^2 + 36t$, en milliers de cornets, où $t$ est le mois de la saison, entre 0 et 6 (modèle).\na) Donne l'expression de $V'(t)$.\nb) On propose $V'(t) = 3(t - 2)(t - 6)$. Est-ce exact ? Réponds oui ou non.\nc) Résous $V'(t) = 0$. Donne les deux solutions.\nd) Calcule $V'(4)$.\ne) Calcule $V(2)$.",
          reponses: [
            { question: "a)", attendu: ["3t^2 - 24t + 36", "V'(t) = 3t^2 - 24t + 36"] },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "2 ; 6" },
            { question: "d)", attendu: "-12" },
            { question: "e)", attendu: "32" },
          ],
          correction:
            "a) $V'(t) = 3t^2 - 24t + 36$.\nb) $(t - 2)(t - 6) = t^2 - 8t + 12$, puis $3(t^2 - 8t + 12) = 3t^2 - 24t + 36$ : oui.\nc) $t - 2 = 0$ ou $t - 6 = 0$, donc $t = 2$ ou $t = 6$.\nd) $V'(4) = 3 \\times 2 \\times (-2) = -12$.\ne) $V(2) = 8 - 48 + 72 = 32$ milliers de cornets.\n⛔ Le piège au e) : répondre 0 parce que $V'(2) = 0$. La question porte sur $V$, pas sur $V'$.\nRéponse : a) $3t^2 - 24t + 36$ ; b) oui ; c) 2 et 6 ; d) $-12$ ; e) 32.",
          micros: ["der_p_degre3", "der_p_nombre_derive", "der_p_forme_factorisee"],
        },
        {
          titre: "La copie de Noa",
          enonce:
            "Une professeure particulière corrige Noa, qui dérive $f(x) = 3x^3 - 4x^2 - 9x + 8$ et écrit $9x^3 - 8x^2 - 9x$.\na) Donne l'expression juste de $f'(x)$.\nb) Calcule le vrai nombre $f'(2)$.\nc) Quelle valeur obtient Noa en $x = 2$, avec son expression ?\nd) Quel est le degré de la vraie dérivée ?",
          reponses: [
            { question: "a)", attendu: ["9x^2 - 8x - 9", "f'(x) = 9x^2 - 8x - 9"] },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "22" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "a) $3x^3$ donne $9x^2$, $-4x^2$ donne $-8x$, $-9x$ donne $-9$, et 8 disparaît : $f'(x) = 9x^2 - 8x - 9$.\nb) $f'(2) = 36 - 16 - 9 = 11$.\nc) $9 \\times 8 - 8 \\times 4 - 9 \\times 2 = 72 - 32 - 18 = 22$.\nd) La plus grande puissance de $f'(x)$ est $x^2$ : le degré est 2.\n⛔ Le piège : multiplier par l'exposant sans le baisser. Noa a bien multiplié, mais ses exposants n'ont pas baissé.\nRéponse : a) $9x^2 - 8x - 9$ ; b) 11 ; c) 22 ; d) 2.",
          micros: ["der_p_degre3", "der_p_nombre_derive"],
        },
      ],
    },
  ],
};
