// ─── Fiche d'exercices : degré 3, courbe, racines et signe (STMG) — 20 exercices ─
//
// Notion fct_degre3 du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : associer une courbe à ax³ ou ax³ + b (a > 0 croissante, a < 0
// décroissante, images opposées pour deux nombres opposés), lire les trois racines
// de a(x − x₁)(x − x₂)(x − x₃) ou écrire ce produit, le signe qui ALTERNE d'un
// intervalle au suivant, et vérifier une racine en calculant son image.
// L'équation x³ = c est une autre notion (fct_equations_puissance) : pas ici.
//
// ⭐ AUCUNE DONNÉE RÉELLE : toutes les formules sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; océanographie (océanographe),
// transports (modélisatrice), éolien (technicien), élevage (vétérinaire), sismologie
// (sismologue), hydrologie (hydrologue), animation 3D (graphiste), entrepôt
// (responsable) ; magasin de ski (gérant), parc d'attractions (ingénieure),
// association de théâtre (trésorier), pêche (consultante).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-2.mjs`.
//
// Micro-compétences : fct_d3_courbes (1, 2, 3, 9, 15), fct_d3_racines (4, 5, 10, 11,
// 13, 16, 17, 18), fct_d3_signe (8, 11, 12, 13, 14, 16, 17, 18, 19, 20),
// fct_d3_verifier_racine (6, 7, 14, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes } from "@/lib/fiches-exercices/figures";

// Une réunion s'écrit dans les deux sens ; « ou » est défendable, « et » ne l'est pas.
const reunion = (g: string, d: string) => [`${g} ∪ ${d}`, `${d} ∪ ${g}`, `${g} ou ${d}`];

export const exercicesFctDegre3Stmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-degre3",
  titre: "Degré 3 : courbe, racines et signe",
  accroche:
    "Vingt exercices sur les fonctions de degré 3 : reconnaître la courbe de ax³ + b, lire trois racines dans une forme factorisée, suivre le signe qui change à chaque racine, vérifier une racine par le calcul. Une éolienne, un sismographe, un grand huit, un magasin de ski, un rapport à contrôler. Un rappel de cours avant chaque niveau, une correction étape par étape avec le tableau de signes et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire la courbe, annuler une parenthèse, calculer une image.",
      rappel: [
        "La courbe de $x \\mapsto ax^3$ est croissante si $a > 0$, décroissante si $a < 0$. Celle de $ax^3 + b$ est translatée verticalement et coupe l'axe des ordonnées en $b$.",
        "Le cube garde le signe : $(-2)^3 = -8$. Deux nombres opposés ont des images opposées par $x \\mapsto ax^3$.",
        "Dans $a(x - x_1)(x - x_2)(x - x_3)$, chaque parenthèse donne une racine. Un nombre est racine quand son image vaut $0$.",
        "À droite de la plus grande racine, le polynôme a le signe de $a$. Puis le signe change à chaque racine.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = -2x^3$. Sa courbe est-elle croissante ou décroissante ? Réponds croissante ou décroissante.",
          reponses: [{ attendu: "décroissante" }],
          correction:
            "Le coefficient $a = -2$ est négatif.\nDonc la courbe de $x \\mapsto ax^3$ est décroissante.\n⛔ Le piège : croire qu'une puissance fait toujours monter. Le signe de $a$ décide.\nRéponse : décroissante.",
          micros: ["fct_d3_courbes"],
        },
        {
          enonce:
            "La courbe tracée est celle de $f(x) = 0{,}5x^3 + b$. Lis la valeur de $b$.",
          figure: repere([-3, 3, -4, 7], [{ p: [0.5, 0, 0, 2] }]),
          reponses: [{ attendu: "2" }],
          correction:
            "$f(0) = 0{,}5 \\times 0^3 + b = b$ : la courbe coupe l'axe des ordonnées en $b$.\nOn lit ce point : son ordonnée est $2$.\n⛔ Le piège : lire le point où la courbe coupe l'axe des abscisses. $b$ se lit sur l'axe vertical.\nRéponse : $2$.",
          micros: ["fct_d3_courbes"],
        },
        {
          enonce:
            "Soit $f(x) = 3x^3$. On sait que $f(2) = 24$. Que vaut $f(-2)$ ?",
          reponses: [{ attendu: "-24" }],
          correction:
            "Le cube garde le signe : $(-2)^3 = -8$.\n$f(-2) = 3 \\times (-8) = -24$.\n⛔ Le piège : répondre 24, comme avec un carré. Avec $x^2$, deux opposés auraient la même image ; avec $x^3$, leurs images sont opposées.\nRéponse : $-24$.",
          micros: ["fct_d3_courbes"],
        },
        {
          enonce:
            "Quelles sont les racines de $f(x) = (x - 1)(x + 2)(x - 4)$ ? Écris-les séparées par des points-virgules.",
          reponses: [{ attendu: "1 ; -2 ; 4" }],
          correction:
            "Trois facteurs, trois racines. On annule chaque parenthèse.\n$x - 1 = 0$ donne $1$. $x + 2 = 0$ donne $-2$. $x - 4 = 0$ donne $4$.\n⛔ Le piège : recopier le $+2$ sans changer son signe.\nRéponse : $1$, $-2$ et $4$.",
          micros: ["fct_d3_racines"],
        },
        {
          enonce:
            "Quelles sont les racines de $f(x) = -2x(x - 3)(x + 1)$ ? Écris-les séparées par des points-virgules.",
          reponses: [{ attendu: "0 ; 3 ; -1" }],
          correction:
            "Les trois facteurs sont $x$, $x - 3$ et $x + 1$. Ils s'annulent en $0$, $3$ et $-1$.\nLe coefficient $-2$ ne crée pas de racine.\n⛔ Le piège : prendre $-2$ pour une racine et oublier $0$.\nRéponse : $0$, $3$ et $-1$.",
          micros: ["fct_d3_racines"],
        },
        {
          enonce:
            "Soit $f(x) = (x + 1)(x - 2)(x - 3)$.\na) Calcule $f(1)$.\nb) Le nombre 1 est-il une racine ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $f(1) = (1 + 1)(1 - 2)(1 - 3) = 2 \\times (-1) \\times (-2) = 4$.\nb) L'image n'est pas nulle : 1 n'est pas une racine.\n⛔ Le piège : voir $(x + 1)$ et croire que 1 est racine. C'est $-1$ qui annule cette parenthèse.\nRéponse : a) $4$ ; b) non.",
          micros: ["fct_d3_verifier_racine"],
        },
        {
          enonce:
            "Soit $f(x) = (x + 3)(x - 1)(x - 5)$. Parmi $-3$, $1$, $3$ et $5$, lequel n'est PAS une racine ?",
          reponses: [{ attendu: "3" }],
          correction:
            "Les racines annulent une parenthèse : $-3$, $1$ et $5$.\nPour $3$, aucune ne s'annule : $f(3) = 6 \\times 2 \\times (-2) = -24$.\n⛔ Le piège : choisir $-3$ en voyant $+3$ dans la parenthèse. $-3 + 3 = 0$, c'est bien une racine.\nRéponse : $3$.",
          micros: ["fct_d3_verifier_racine"],
        },
        {
          enonce:
            "Soit $f(x) = (x + 2)(x - 1)(x - 4)$. Sur $]4\\,;\\,+\\infty[$, quel est le signe de $f(x)$ ? Réponds positif ou négatif.",
          reponses: [{ attendu: ["positif", "positive"] }],
          correction:
            "À droite de la plus grande racine, le polynôme a le signe de $a$. Ici $a = 1$, positif.\nTest : $f(5) = 7 \\times 4 \\times 1 = 28$.\n⛔ Le piège : compter les signes moins écrits dans l'expression. Pour $x > 4$, les trois parenthèses sont positives.\nRéponse : positif.",
          micros: ["fct_d3_signe"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation : les racines, puis les signes qui alternent, puis la conclusion.",
      rappel: [
        "Trois racines découpent la droite en quatre intervalles. Les signes alternent : deux zones positives, deux zones négatives.",
        "Une racine $r$ donne le facteur $(x - r)$ : la racine $-2$ donne $(x + 2)$. Le coefficient $a$ se place devant.",
        "Une valeur test vérifie le signe : on calcule l'image d'un nombre de l'intervalle.",
      ],
      exercices: [
        {
          enonce:
            "Lou, océanographe, trace un écart de niveau de la mer $f(x)$, en mètres, selon $x$, dans un modèle.\na) En quel nombre la courbe coupe-t-elle l'axe des ordonnées ?\nb) Quelle expression correspond à la courbe ? Écris la lettre.\nA : $f(x) = 0{,}5x^3 + 1$\nB : $f(x) = -0{,}5x^3 + 1$\nC : $f(x) = -0{,}5x^2 + 1$\nD : $f(x) = -0{,}5x^3 - 1$",
          figure: repere([-3, 3, -4, 6], [{ p: [-0.5, 0, 0, 1] }]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "a) On lit le point sur l'axe vertical : son ordonnée est $1$. Donc D ne convient pas.\nb) La courbe descend de gauche à droite : elle est décroissante, donc $a < 0$. A ne convient pas.\nElle ne fait que descendre : ce n'est pas une parabole. C ne convient pas.\n⛔ Le piège : choisir C. Une parabole tournée vers le bas monte d'abord, puis redescend ; cette courbe ne remonte jamais.\nRéponse : a) $1$ ; b) B.",
          micros: ["fct_d3_courbes"],
        },
        {
          enonce:
            "Pour un réseau de bus, Priya, modélisatrice, cherche un polynôme de degré 3 qui s'annule en $-2$, $1$ et $3$, avec un coefficient de tête égal à 2.\na) Écris sa forme factorisée.\nb) Calcule l'image de 0 par ce polynôme.",
          reponses: [
            { question: "a)", attendu: "2(x + 2)(x - 1)(x - 3)" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) Un facteur par racine, en retranchant la racine : la racine $-2$ donne $(x + 2)$, la racine $1$ donne $(x - 1)$, la racine $3$ donne $(x - 3)$. Le coefficient 2 se place devant.\nb) $2 \\times (0 + 2) \\times (0 - 1) \\times (0 - 3) = 2 \\times 2 \\times (-1) \\times (-3) = 12$.\n⛔ Le piège au a) : écrire $(x - 2)$ pour la racine $-2$.\nRéponse : a) $2(x + 2)(x - 1)(x - 3)$ ; b) $12$.",
          micros: ["fct_d3_racines"],
        },
        {
          enonce:
            "Gaël, technicien d'éolienne, modélise un écart de production selon $x$, l'écart du vent à une vitesse de référence, en m/s : $f(x) = (x + 3)(x - 1)(x - 4)$.\na) Quelles sont les racines ? Écris-les séparées par des points-virgules.\nb) Sur quel ensemble $f$ est-elle strictement positive ?\nc) Calcule $f(0)$ pour vérifier.",
          reponses: [
            { question: "a)", attendu: "-3 ; 1 ; 4" },
            { question: "b)", attendu: reunion("]-3 ; 1[", "]4 ; +∞[") },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) Les parenthèses s'annulent en $-3$, $1$ et $4$.\nb) $a = 1$ est positif : à droite de $4$, $f$ est positive. Puis on alterne vers la gauche : négative sur $]1\\,;\\,4[$, positive sur $]-3\\,;\\,1[$, négative avant $-3$.\nc) $f(0) = 3 \\times (-1) \\times (-4) = 12$, positif : $0$ est bien dans $]-3\\,;\\,1[$.\n⛔ Le piège au b) : ne donner qu'une zone, $]4\\,;\\,+\\infty[$. Il y en a deux.\nRéponse : a) $-3$, $1$ et $4$ ; b) $]-3\\,;\\,1[ \\cup ]4\\,;\\,+\\infty[$ ; c) $12$.",
          schema: tableauSignes(["−∞", "−3", "1", "4", "+∞"], [
            ["$x + 3$", ["-", "+", "+", "+"], ["0", "", ""]],
            ["$x - 1$", ["-", "-", "+", "+"], ["", "0", ""]],
            ["$x - 4$", ["-", "-", "-", "+"], ["", "", "0"]],
            ["$f(x)$", ["-", "+", "-", "+"], ["0", "0", "0"]],
          ]),
          micros: ["fct_d3_racines", "fct_d3_signe"],
        },
        {
          enonce:
            "Clémence, vétérinaire, suit la variation du poids d'un troupeau (modèle), en kg, selon $x$, l'écart de température à la normale en °C : $f(x) = -(x + 2)(x - 1)(x - 3)$.\na) Sur $]3\\,;\\,+\\infty[$, quel est le signe de $f(x)$ ? Réponds positif ou négatif.\nb) Sur quel ensemble $f$ est-elle strictement positive ?\nc) Calcule $f(2)$ pour vérifier.",
          reponses: [
            { question: "a)", attendu: ["négatif", "négative"] },
            { question: "b)", attendu: reunion("]-∞ ; -2[", "]1 ; 3[") },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) À droite de la plus grande racine, le signe est celui de $a = -1$ : négatif.\nb) On alterne vers la gauche : positive sur $]1\\,;\\,3[$, négative sur $]-2\\,;\\,1[$, positive avant $-2$.\nc) $f(2) = -(2 + 2)(2 - 1)(2 - 3) = -4 \\times 1 \\times (-1) = 4$, positif.\n⛔ Le piège au b) : partir de « positive à droite » sans regarder $a$. Le signe moins inverse toutes les zones.\nRéponse : a) négatif ; b) $]-\\infty\\,;\\,-2[ \\cup ]1\\,;\\,3[$ ; c) $4$.",
          schema: tableauSignes(["−∞", "−2", "1", "3", "+∞"], [
            ["$-1$", ["-", "-", "-", "-"], ["", "", ""]],
            ["$x + 2$", ["-", "+", "+", "+"], ["0", "", ""]],
            ["$x - 1$", ["-", "-", "+", "+"], ["", "0", ""]],
            ["$x - 3$", ["-", "-", "-", "+"], ["", "", "0"]],
            ["$f(x)$", ["+", "-", "+", "-"], ["0", "0", "0"]],
          ]),
          micros: ["fct_d3_signe"],
        },
        {
          enonce:
            "Bastien, sismologue, étudie le mouvement du sol dans un modèle : la courbe donne un écart à la position de repos.\na) Lis les trois racines. Écris-les séparées par des points-virgules.\nb) Entre les deux plus grandes racines, quel est le signe de l'écart ? Réponds positif ou négatif.\nc) Quelle expression correspond à la courbe ? Écris la lettre.\nA : $f(x) = 0{,}5(x - 2)(x + 1)(x + 3)$\nB : $f(x) = 0{,}5(x + 2)(x - 1)(x - 3)$\nC : $f(x) = -0{,}5(x + 2)(x - 1)(x - 3)$",
          figure: repere([-4, 5, -5, 6], [{ p: [0.5, -1, -2.5, 3] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "-2 ; 1 ; 3" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) La courbe coupe l'axe des abscisses en $-2$, $1$ et $3$.\nb) Entre $1$ et $3$, la courbe passe sous l'axe : le signe est négatif.\nc) Les racines donnent $(x + 2)$, $(x - 1)$ et $(x - 3)$ : A ne convient pas. À droite de $3$, la courbe monte au-dessus de l'axe, donc $a > 0$ : C ne convient pas.\n⛔ Le piège au c) : choisir A en recopiant les racines sans changer les signes.\nRéponse : a) $-2$, $1$ et $3$ ; b) négatif ; c) B.",
          micros: ["fct_d3_racines", "fct_d3_signe"],
        },
        {
          enonce:
            "Naël, hydrologue, modélise l'écart d'un lac à son niveau normal, en centimètres, au mois $t$ : $f(t) = (t - 1)(t - 3)(t - 6)$.\na) Calcule $f(3)$.\nb) 3 est-il une racine ? Réponds oui ou non.\nc) Calcule $f(4)$.\nd) Au mois 4, le lac est-il au-dessus de son niveau normal ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "-6" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $f(3) = 2 \\times 0 \\times (-3) = 0$.\nb) L'image est nulle : oui, 3 est une racine.\nc) $f(4) = 3 \\times 1 \\times (-2) = -6$.\nd) L'écart est négatif : le lac est sous son niveau normal, donc non.\n⛔ Le piège au a) : calculer tout le produit alors qu'un facteur nul suffit. Dès qu'une parenthèse vaut $0$, le produit vaut $0$.\nRéponse : a) $0$ ; b) oui ; c) $-6$ ; d) non.",
          micros: ["fct_d3_verifier_racine", "fct_d3_signe"],
        },
        {
          enonce:
            "Romane, graphiste, anime un objet le long de la courbe de $f(x) = 0{,}5x^3$. On sait que $f(4) = 32$.\na) Que vaut $f(-4)$ ?\nb) Que vaut $f(0)$ ?\nc) Elle monte la courbe de 3 unités. Écris l'expression $g(x)$ obtenue.\nd) Calcule $g(-2)$.",
          reponses: [
            { question: "a)", attendu: "-32" },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "0,5x^3 + 3" },
            { question: "d)", attendu: "-1" },
          ],
          correction:
            "a) Deux nombres opposés ont des images opposées : $f(-4) = -32$.\nb) $f(0) = 0{,}5 \\times 0 = 0$.\nc) Monter, c'est ajouter : $g(x) = 0{,}5x^3 + 3$.\nd) $g(-2) = 0{,}5 \\times (-8) + 3 = -4 + 3 = -1$.\n⛔ Le piège au d) : écrire $(-2)^3 = 8$. Un cube garde le signe.\nRéponse : a) $-32$ ; b) $0$ ; c) $g(x) = 0{,}5x^3 + 3$ ; d) $-1$.",
          micros: ["fct_d3_courbes"],
        },
        {
          enonce:
            "Yacine gère un entrepôt. Il suit un écart de stock (modèle), en articles, à la semaine $x$ comptée depuis l'inventaire : $f(x) = 3x(x - 2)(x + 4)$.\na) Quelles sont les racines ? Écris-les séparées par des points-virgules.\nb) Calcule $f(1)$.\nc) Entre les deux plus grandes racines, quel est le signe de $f(x)$ ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "0 ; 2 ; -4" },
            { question: "b)", attendu: "-15" },
            { question: "c)", attendu: ["négatif", "négative"] },
          ],
          correction:
            "a) $x = 0$, puis $x - 2 = 0$ donne $2$, et $x + 4 = 0$ donne $-4$.\nb) $f(1) = 3 \\times 1 \\times (1 - 2) \\times (1 + 4) = 3 \\times (-1) \\times 5 = -15$.\nc) Les deux plus grandes racines sont $0$ et $2$. $1$ est entre elles, et son image est négative. Entre deux racines voisines, le signe ne change pas.\n⛔ Le piège au a) : oublier la racine $0$ du facteur $x$.\nRéponse : a) $0$, $2$ et $-4$ ; b) $-15$ ; c) négatif.",
          micros: ["fct_d3_racines", "fct_d3_signe"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : les racines, le signe à droite, l'alternance, puis la phrase à conclure.",
      rappel: [
        "La méthode du signe : on trouve le signe à droite (celui de $a$), puis on alterne en revenant vers la gauche.",
        "On traduit la phrase : « positive » veut dire $f(x) > 0$, « sous le sol » veut dire $f(x) < 0$.",
        "Une valeur test, c'est une preuve qu'une affirmation est fausse : une seule image de mauvais signe suffit.",
      ],
      exercices: [
        {
          titre: "Le magasin de ski",
          enonce:
            "Lorenzo gère un magasin de ski. Son résultat (modèle), en milliers d'euros, au mois $m$, est $R(m) = -(m - 2)(m - 6)(m - 10)$.\na) Quels sont les mois où le résultat s'annule ? Écris-les séparés par des points-virgules.\nb) Après le plus grand de ces mois, quel est le signe de $R(m)$ ? Réponds positif ou négatif.\nc) Entre les deux plus grands de ces mois, quel est son signe ? Réponds positif ou négatif.\nd) Calcule $R(8)$.\ne) Calcule $R(4)$.",
          reponses: [
            { question: "a)", attendu: "2 ; 6 ; 10" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: ["positif", "positive"] },
            { question: "d)", attendu: "24" },
            { question: "e)", attendu: "-24" },
          ],
          correction:
            "a) Les parenthèses s'annulent en $2$, $6$ et $10$.\nb) À droite de la plus grande racine, le signe est celui de $a = -1$ : négatif.\nc) On alterne : le signe change en $10$, donc positif sur $]6\\,;\\,10[$.\nd) $R(8) = -(6)(2)(-2) = -6 \\times 2 \\times (-2) = 24$.\ne) $R(4) = -(2)(-2)(-6) = -2 \\times (-2) \\times (-6) = -24$.\n⛔ Le piège au b) : oublier le signe moins devant. Le tableau le remet à sa place.\nRéponse : a) $2$, $6$ et $10$ ; b) négatif ; c) positif ; d) $24$ ; e) $-24$.",
          schema: tableauSignes(["−∞", "2", "6", "10", "+∞"], [
            ["$-1$", ["-", "-", "-", "-"], ["", "", ""]],
            ["$m - 2$", ["-", "+", "+", "+"], ["0", "", ""]],
            ["$m - 6$", ["-", "-", "+", "+"], ["", "0", ""]],
            ["$m - 10$", ["-", "-", "-", "+"], ["", "", "0"]],
            ["$R(m)$", ["+", "-", "+", "-"], ["0", "0", "0"]],
          ], "m"),
          micros: ["fct_d3_racines", "fct_d3_signe"],
        },
        {
          titre: "Le grand huit",
          enonce:
            "Ludivine, ingénieure dans un parc d'attractions, trace le profil $f(x)$ d'un grand huit par rapport au sol, avec $x$ et $f(x)$ en dizaines de mètres (modèle). Son coefficient de tête vaut $0{,}5$.\na) Lis les trois racines. Écris-les séparées par des points-virgules.\nb) Écris la forme factorisée de $f(x)$.\nc) Calcule $f(0)$.\nd) Sur quel ensemble $f$ est-elle strictement négative ?\ne) Le parcours va de $x = 0$ à $x = 6$. Sur cette portion, quelle longueur, en dizaines de mètres, est sous le sol ?",
          figure: repere([-2, 7, -6, 6], [{ p: [0.5, -3, 1.5, 5] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "-1 ; 2 ; 5" },
            { question: "b)", attendu: "0,5(x + 1)(x - 2)(x - 5)" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: reunion("]-∞ ; -1[", "]2 ; 5[") },
            { question: "e)", attendu: "3" },
          ],
          correction:
            "a) La courbe coupe l'axe des abscisses en $-1$, $2$ et $5$.\nb) Un facteur par racine, et $0{,}5$ devant : $f(x) = 0{,}5(x + 1)(x - 2)(x - 5)$.\nc) $f(0) = 0{,}5 \\times 1 \\times (-2) \\times (-5) = 5$.\nd) $a > 0$ : positive après $5$, négative sur $]2\\,;\\,5[$, positive sur $]-1\\,;\\,2[$, négative avant $-1$.\ne) Pour $x$ entre $0$ et $6$, seule $]2\\,;\\,5[$ est sous le sol : $5 - 2 = 3$.\n⛔ Le piège au e) : compter aussi la zone avant $-1$. Elle est en dehors du parcours.\nRéponse : a) $-1$, $2$ et $5$ ; b) $f(x) = 0{,}5(x + 1)(x - 2)(x - 5)$ ; c) $5$ ; d) $]-\\infty\\,;\\,-1[ \\cup ]2\\,;\\,5[$ ; e) $3$.",
          micros: ["fct_d3_racines", "fct_d3_signe"],
        },
        {
          titre: "Le budget du club",
          enonce:
            "Mehdi, trésorier d'un club de théâtre, teste un modèle (fictif), selon $x$, le nombre de spectacles : $f(x) = x^3 - 6x^2 + 11x - 6$.\na) Calcule $f(1)$.\nb) Calcule $f(2)$.\nc) Calcule $f(4)$.\nd) 4 est-il une racine ? Réponds oui ou non.\ne) On admet que toutes les racines de $f$ sont inférieures à 4. Pour $x > 4$, quel est le signe de $f(x)$ ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: ["positif", "positive"] },
          ],
          correction:
            "a) $f(1) = 1 - 6 + 11 - 6 = 0$.\nb) $f(2) = 8 - 24 + 22 - 6 = 0$.\nc) $f(4) = 64 - 96 + 44 - 6 = 6$.\nd) L'image de 4 vaut 6, pas 0 : non.\ne) À droite de la plus grande racine, le signe est celui de $a = 1$ : positif. Cela colle avec $f(4) = 6$.\n⛔ Le piège au b) : écrire $6 \\times 2^2 = 12^2$. La puissance se calcule avant la multiplication : $6 \\times 4 = 24$.\nRéponse : a) $0$ ; b) $0$ ; c) $6$ ; d) non ; e) positif.",
          micros: ["fct_d3_verifier_racine", "fct_d3_signe"],
        },
        {
          titre: "La phrase du rapport",
          enonce:
            "Une consultante, Salomé, relit un rapport sur une pêcherie. Le modèle du stock de poissons, selon $x$, l'écart de température de l'eau à la normale, est $f(x) = -2(x + 1)(x - 1)(x - 3)$. Le rapport affirme : « $f$ n'est positive que sur $]1\\,;\\,3[$ ».\na) Calcule $f(-2)$.\nb) Calcule $f(2)$.\nc) L'affirmation du rapport est-elle vraie ? Réponds vrai ou faux.\nd) Sur quel ensemble $f$ est-elle strictement positive ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: ["faux", "fausse"] },
            { question: "d)", attendu: reunion("]-∞ ; -1[", "]1 ; 3[") },
          ],
          correction:
            "a) $f(-2) = -2 \\times (-1) \\times (-3) \\times (-5) = 30$.\nb) $f(2) = -2 \\times 3 \\times 1 \\times (-1) = 6$.\nc) $-2$ n'est pas dans $]1\\,;\\,3[$, et pourtant $f(-2)$ est positif : l'affirmation est fausse.\nd) $a = -2$ est négatif : négative après $3$, positive sur $]1\\,;\\,3[$, négative sur $]-1\\,;\\,1[$, positive avant $-1$.\n⛔ Le piège au d) : retenir une seule zone positive. Trois racines donnent toujours deux zones de chaque signe.\nRéponse : a) $30$ ; b) $6$ ; c) faux ; d) $]-\\infty\\,;\\,-1[ \\cup ]1\\,;\\,3[$.",
          micros: ["fct_d3_signe"],
        },
      ],
    },
  ],
};
