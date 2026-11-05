// ─── Fiche d'exercices : degré 2, factoriser connaissant une racine (STMG) — 20 exercices
//
// Notion fct_degre2_factoriser du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : vérifier qu'un nombre annule le polynôme, trouver l'autre racine par
// le PRODUIT des racines (x₁x₂ = c/a), écrire a(x − x₁)(x − x₂), et développer
// pour vérifier. Une racine est toujours fournie, ou lue sur une courbe : jamais
// de discriminant, le programme l'exclut.
//
// ⭐ AUCUNE DONNÉE RÉELLE : toutes les formules sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; magasin de trottinettes (vendeur),
// atelier de meubles (ébéniste), bureau d'études (stagiaire), cascade (cascadeuse),
// maraîchage (maraîchère), montagne (glaciologue), jardin (paysagiste), logistique
// (responsable) ; boulangerie (boulanger), cabinet d'études (stagiaires), cinéma
// (gérante), biologie marine (biologiste).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-2.mjs`.
//
// Micro-compétences : fct_d2_verifier_racine (1, 2, 3, 4, 9, 12, 14, 15, 17, 19, 20),
// fct_d2_factoriser_racine_connue (5, 6, 7, 9, 12, 13, 14, 15, 17, 18, 19, 20),
// fct_d2_verifier_developpee (8, 10, 11, 16, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";

// Les écritures justes d'une forme factorisée : en exact (sinon l'élève recopie la
// forme développée de l'énoncé), les deux ordres des facteurs, avec ou sans « × ».
const fact = (a: string, u: string, v: string) =>
  (a && a !== "-" ? [a, `${a}*`] : [a]).flatMap((p) => [`${p}${u}${v}`, `${p}${v}${u}`, `${p}${u}*${v}`, `${p}${v}*${u}`]);

export const exercicesFctDegre2FactoriserStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-degre2-factoriser",
  titre: "Degré 2 : factoriser connaissant une racine",
  accroche:
    "Vingt exercices pour factoriser sans discriminant : vérifier qu'un nombre est racine, trouver l'autre avec le produit des racines, écrire la forme factorisée, puis développer pour contrôler. Des trottinettes, une boulangerie, un bassin de jardin, un cinéma, deux copies à départager. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : remplacer et calculer, trouver l'autre racine, écrire ou développer.",
      rappel: [
        "Un nombre est racine d'un polynôme quand son image vaut $0$ : on remplace $x$ et on calcule.",
        "Pour $f(x) = ax^2 + bx + c$ de racines $x_1$ et $x_2$, on a $f(x) = a(x - x_1)(x - x_2)$, où $a$ est le coefficient de $x^2$.",
        "Le produit des racines vaut $\\dfrac{c}{a}$ : $x_1 \\times x_2 = \\dfrac{c}{a}$. Une racine connue donne donc l'autre.",
        "Développer : $(x - x_1)(x - x_2) = x^2 - (x_1 + x_2)x + x_1x_2$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = x^2 - 5x + 6$.\na) Calcule $f(2)$.\nb) Le nombre 2 est-il une racine de $f$ ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "oui" },
          ],
          correction:
            "a) On remplace $x$ par 2 : $f(2) = 2^2 - 5 \\times 2 + 6 = 4 - 10 + 6 = 0$.\nb) L'image vaut $0$, donc 2 est une racine.\n⛔ Le piège : calculer de gauche à droite, $(4 - 5) \\times 2$. La multiplication passe avant la soustraction.\nRéponse : a) $0$ ; b) oui.",
          micros: ["fct_d2_verifier_racine"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 - x - 2$.\na) Calcule $f(3)$.\nb) Le nombre 3 est-il une racine de $f$ ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $f(3) = 3^2 - 3 - 2 = 9 - 3 - 2 = 4$.\nb) L'image n'est pas nulle : 3 n'est pas une racine.\n⛔ Le piège : conclure « oui » parce qu'on a trouvé un résultat. Seul un résultat égal à $0$ fait une racine.\nRéponse : a) $4$ ; b) non.",
          micros: ["fct_d2_verifier_racine"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 + 4x + 3$. Calcule $f(-1)$.",
          reponses: [{ attendu: "0" }],
          correction:
            "$f(-1) = (-1)^2 + 4 \\times (-1) + 3 = 1 - 4 + 3 = 0$.\nDonc $-1$ est une racine de $f$.\n⛔ Le piège : écrire $(-1)^2 = -1$. Le carré d'un nombre négatif est positif.\nRéponse : $0$.",
          micros: ["fct_d2_verifier_racine"],
        },
        {
          enonce:
            "Parmi les nombres $-2$, $1$, $2$ et $3$, lequel est une racine de $f(x) = x^2 - 7x + 10$ ?",
          reponses: [{ attendu: "2" }],
          correction:
            "On remplace $x$ par chaque nombre.\n$f(-2) = 4 + 14 + 10 = 28$.\n$f(1) = 1 - 7 + 10 = 4$.\n$f(2) = 4 - 14 + 10 = 0$ : on a trouvé.\n⛔ Le piège : choisir $-2$ en calculant $-7 \\times (-2)$ comme $-14$. Moins par moins donne plus.\nRéponse : $2$.",
          micros: ["fct_d2_verifier_racine"],
        },
        {
          enonce:
            "On sait que 1 est une racine de $f(x) = x^2 - 4x + 3$. Quelle est son autre racine ?",
          reponses: [{ attendu: "3" }],
          correction:
            "Ici $a = 1$ et $c = 3$ : le produit des racines vaut $\\dfrac{3}{1} = 3$.\nDonc $1 \\times x_2 = 3$, soit $x_2 = 3$.\n⛔ Le piège : prendre $-4$ pour le produit. Le produit vient de $c$ et $a$, pas du coefficient de $x$.\nRéponse : $3$.",
          micros: ["fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "On sait que 2 est une racine de $f(x) = 2x^2 - 2x - 4$. Quelle est son autre racine ?",
          reponses: [{ attendu: "-1" }],
          correction:
            "$a = 2$ et $c = -4$ : le produit des racines vaut $\\dfrac{-4}{2} = -2$.\nDonc $2 \\times x_2 = -2$, soit $x_2 = -1$.\n⛔ Le piège : oublier de diviser par $a$ et écrire $2 \\times x_2 = -4$. On trouverait $-2$, qui est faux.\nRéponse : $-1$.",
          micros: ["fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "On sait que 1 est une racine de $f(x) = x^2 + x - 2$. Écris la forme factorisée de $f$.",
          reponses: [{ attendu: [...fact("", "(x - 1)", "(x + 2)"), ...fact("", "(x - 1)", "(2 + x)")], exact: true }],
          correction:
            "$a = 1$ et $c = -2$ : $1 \\times x_2 = -2$, donc $x_2 = -2$.\nLa racine $1$ donne le facteur $(x - 1)$, la racine $-2$ donne le facteur $(x + 2)$.\n⛔ Le piège : écrire $(x - 2)$ pour la racine $-2$. Le facteur retranche la racine : $x - (-2) = x + 2$.\nRéponse : $f(x) = (x - 1)(x + 2)$.",
          micros: ["fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Développe $(x - 2)(x + 3)$. Écris le résultat sous la forme d'une somme de termes.",
          reponses: [{ attendu: "x^2 + x - 6", exact: true }],
          correction:
            "On multiplie chaque terme du premier facteur par chaque terme du second :\n$x \\times x + x \\times 3 - 2 \\times x - 2 \\times 3 = x^2 + 3x - 2x - 6$.\nOn regroupe les termes en $x$ : $x^2 + x - 6$.\n⛔ Le piège : ne garder que le produit des nombres et écrire $x^2 - 6$. Le terme en $x$ vient de DEUX produits.\nRéponse : $x^2 + x - 6$.",
          micros: ["fct_d2_verifier_developpee"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation : vérifier la racine, trouver l'autre, écrire la forme factorisée, contrôler.",
      rappel: [
        "Pour factoriser : on repère $a$, on calcule $\\dfrac{c}{a}$, on trouve $x_2$, on écrit $a(x - x_1)(x - x_2)$.",
        "Une racine négative donne un signe plus dans le facteur : la racine $-2$ donne $(x + 2)$.",
        "Pour vérifier une égalité : on développe et on compare les trois coefficients un à un. Un contrôle rapide : la somme des racines vaut $-\\dfrac{b}{a}$.",
      ],
      exercices: [
        {
          enonce:
            "Thibault vend des trottinettes. Son bénéfice (modèle), en milliers d'euros, pour $x$ centaines de ventes, est $B(x) = -x^2 + 12x - 20$.\na) Calcule $B(2)$.\nb) Quelle est la valeur de $x$, différente de 2, qui annule le bénéfice ?\nc) Écris la forme factorisée de $B(x)$.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: [...fact("-", "(x - 2)", "(x - 10)"), ...fact("-1", "(x - 2)", "(x - 10)"), ...fact("", "(2 - x)", "(x - 10)"), ...fact("", "(x - 2)", "(10 - x)")], exact: true },
          ],
          correction:
            "a) $B(2) = -2^2 + 12 \\times 2 - 20 = -4 + 24 - 20 = 0$ : $2$ est une racine.\nb) $a = -1$ et $c = -20$ : $\\dfrac{c}{a} = \\dfrac{-20}{-1} = 20$. Donc $2 \\times x_2 = 20$, soit $x_2 = 10$.\nContrôle : la somme $2 + 10 = 12$ et $-\\dfrac{b}{a} = -\\dfrac{12}{-1} = 12$. ✔\nc) Le coefficient $a = -1$ se place devant : $B(x) = -(x - 2)(x - 10)$.\n⛔ Le piège au c) : oublier le signe moins devant le produit. La parabole serait alors retournée.\nRéponse : a) $0$ ; b) $10$ ; c) $B(x) = -(x - 2)(x - 10)$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Ophélie, ébéniste, écrit l'écart à son budget pour $x$ meubles sous deux formes (modèle) : $2(x - 1)(x + 3) = 2x^2 + 4x - 6$.\na) Développe seulement $(x - 1)(x + 3)$.\nb) Multiplie ton résultat par 2. L'égalité d'Ophélie est-elle exacte ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "x^2 + 2x - 3", exact: true },
            { question: "b)", attendu: "oui" },
          ],
          correction:
            "a) $(x - 1)(x + 3) = x^2 + 3x - x - 3 = x^2 + 2x - 3$.\nb) Le coefficient 2 multiplie TOUT : $2x^2 + 4x - 6$. Les trois coefficients coïncident : l'égalité est exacte.\n⛔ Le piège au b) : multiplier seulement $x^2$ par 2 et écrire $2x^2 + 2x - 3$.\nRéponse : a) $x^2 + 2x - 3$ ; b) oui.",
          micros: ["fct_d2_verifier_developpee"],
        },
        {
          enonce:
            "Dans un bureau d'études, Basile recopie une formule : $(x + 2)(x - 5) = x^2 + 3x - 10$.\na) Développe $(x + 2)(x - 5)$.\nb) L'égalité de Basile est-elle exacte ? Réponds oui ou non.\nc) Quel est le bon coefficient de $x$ ?",
          reponses: [
            { question: "a)", attendu: "x^2 - 3x - 10", exact: true },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "-3" },
          ],
          correction:
            "a) $(x + 2)(x - 5) = x^2 - 5x + 2x - 10 = x^2 - 3x - 10$.\nb) Le coefficient de $x$ diffère : $-3$ contre $+3$. L'égalité est fausse.\nc) $-5 + 2 = -3$.\n⛔ Le piège : ne vérifier que $x^2$ et $-10$, qui sont justes. Le terme en $x$ est celui qu'on rate.\nRéponse : a) $x^2 - 3x - 10$ ; b) non ; c) $-3$.",
          micros: ["fct_d2_verifier_developpee"],
        },
        {
          enonce:
            "Inès, cascadeuse, prépare un saut depuis une plateforme de 4 m (modèle). Sa hauteur est $h(x) = -0{,}5x^2 + x + 4$, en mètres, à la distance $x$ de la plateforme (en mètres).\na) Calcule $h(4)$.\nb) Quelle est la racine de $h$ différente de 4 ?\nc) Écris la forme factorisée de $h(x)$.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "-2" },
            { question: "c)", attendu: [...fact("-0,5", "(x - 4)", "(x + 2)"), ...fact("-1/2", "(x - 4)", "(x + 2)"), ...fact("0,5", "(4 - x)", "(x + 2)")], exact: true },
          ],
          correction:
            "a) $h(4) = -0{,}5 \\times 16 + 4 + 4 = -8 + 8 = 0$ : elle atterrit à 4 m de la plateforme.\nb) $a = -0{,}5$ et $c = 4$ : $\\dfrac{c}{a} = 4 \\div (-0{,}5) = -8$. Donc $4 \\times x_2 = -8$, soit $x_2 = -2$.\nContrôle : $4 + (-2) = 2$ et $-\\dfrac{b}{a} = -\\dfrac{1}{-0{,}5} = 2$. ✔\nc) $h(x) = -0{,}5(x - 4)(x + 2)$.\n⛔ Le piège au b) : diviser 4 par 0,5 sans le signe. On trouverait $x_2 = 2$, or $h(2) = -2 + 2 + 4 = 4$, qui n'est pas $0$.\nRéponse : a) $0$ ; b) $-2$ ; c) $h(x) = -0{,}5(x - 4)(x + 2)$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Manon, maraîchère, trace l'écart de température de sa serre (modèle), $P(t) = -0{,}5t^2 + 5t - 8$, en °C, $t$ heures après le lever du jour.\na) Lis sur la courbe la plus petite racine.\nb) Quel est le coefficient $a$ ?\nc) Écris la forme factorisée de $P(t)$, sans lire la seconde racine : calcule-la.",
          figure: repere([-1, 10, -2, 6], [{ q: [-0.5, 5, -8] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "-0,5" },
            { question: "c)", attendu: [...fact("-0,5", "(t - 2)", "(t - 8)"), ...fact("-1/2", "(t - 2)", "(t - 8)"), ...fact("0,5", "(2 - t)", "(t - 8)"), ...fact("0,5", "(t - 2)", "(8 - t)")], exact: true },
          ],
          correction:
            "a) La courbe coupe l'axe des abscisses en $2$.\nb) C'est le coefficient de $t^2$ : $a = -0{,}5$.\nc) $c = -8$, donc $\\dfrac{c}{a} = -8 \\div (-0{,}5) = 16$. Puis $2 \\times x_2 = 16$, soit $x_2 = 8$, ce que confirme la courbe.\nLa forme factorisée est $P(t) = -0{,}5(t - 2)(t - 8)$.\n⛔ Le piège au c) : oublier le $-0{,}5$ devant. Sans lui, la courbe serait tournée vers le haut.\nRéponse : a) $2$ ; b) $-0{,}5$ ; c) $P(t) = -0{,}5(t - 2)(t - 8)$.",
          micros: ["fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Elias, glaciologue, modélise un écart d'épaisseur de glace (modèle), en centimètres, selon $x$, la température en °C : $T(x) = x^2 - 3x - 10$.\na) Parmi $-2$, $2$ et $3$, lequel est une racine ?\nb) Quelle est l'autre racine ?\nc) Écris la forme factorisée de $T(x)$.",
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: [...fact("", "(x + 2)", "(x - 5)"), ...fact("", "(2 + x)", "(x - 5)")], exact: true },
          ],
          correction:
            "a) $T(-2) = 4 + 6 - 10 = 0$. Pour les autres : $T(2) = 4 - 6 - 10 = -12$ et $T(3) = 9 - 9 - 10 = -10$.\nb) $a = 1$ et $c = -10$ : $-2 \\times x_2 = -10$, soit $x_2 = 5$.\nc) La racine $-2$ donne $(x + 2)$, la racine $5$ donne $(x - 5)$.\n⛔ Le piège au a) : écrire $(-2)^2 = -4$ et rejeter la bonne valeur.\nRéponse : a) $-2$ ; b) $5$ ; c) $T(x) = (x + 2)(x - 5)$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Camille, paysagiste, veut deux bassins carrés de côté $x$ mètres, de surface totale 18 m². Elle pose $f(x) = 2x^2 - 18$ : $f(x)$ vaut $0$ quand la surface est la bonne.\na) Calcule $f(3)$.\nb) Quelle est la racine de $f$ différente de 3 ?\nc) Écris la forme factorisée de $f(x)$.\nd) Quel côté faut-il prendre, en mètres ?",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "-3" },
            { question: "c)", attendu: [...fact("2", "(x - 3)", "(x + 3)"), ...fact("2", "(x - 3)", "(3 + x)")], exact: true },
            { question: "d)", attendu: "3 m" },
          ],
          correction:
            "a) $f(3) = 2 \\times 9 - 18 = 0$.\nb) $a = 2$ et $c = -18$ : $\\dfrac{c}{a} = -9$. Donc $3 \\times x_2 = -9$, soit $x_2 = -3$.\nc) $f(x) = 2(x - 3)(x + 3)$.\nd) Un côté est positif : on garde 3 m.\n⛔ Le piège au b) : croire qu'il n'y a pas d'autre racine parce que le terme en $x$ manque. Il vaut simplement $0$.\nRéponse : a) $0$ ; b) $-3$ ; c) $f(x) = 2(x - 3)(x + 3)$ ; d) 3 m.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue"],
        },
        {
          enonce:
            "Dans un entrepôt, Mathis, responsable logistique, utilise un modèle de stock, en centaines d'articles, à la semaine $x$ : $f(x) = -(x - 1)(x - 4)$.\na) Développe $f(x)$.\nb) Avec ta forme développée, calcule $f(1)$.",
          reponses: [
            { question: "a)", attendu: "-x^2 + 5x - 4", exact: true },
            { question: "b)", attendu: "0" },
          ],
          correction:
            "a) $(x - 1)(x - 4) = x^2 - 4x - x + 4 = x^2 - 5x + 4$.\nLe signe moins devant change tous les signes : $-x^2 + 5x - 4$.\nb) $f(1) = -1 + 5 - 4 = 0$ : c'est normal, $1$ est une racine de la forme factorisée.\n⛔ Le piège au a) : ne changer que le signe de $x^2$.\nRéponse : a) $-x^2 + 5x - 4$ ; b) $0$.",
          micros: ["fct_d2_verifier_developpee"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Tout le chemin : vérifier une racine, trouver l'autre, factoriser, puis contrôler en développant.",
      rappel: [
        "Le chemin complet : $f(x_1) = 0$, puis $x_2$ par $\\dfrac{c}{a}$, puis $a(x - x_1)(x - x_2)$, puis on développe.",
        "Le coefficient $a$ ne disparaît jamais : il reste devant le produit.",
        "Une racine juste ne suffit pas : c'est le développement qui valide la forme factorisée.",
      ],
      exercices: [
        {
          titre: "Les seuils de la boulangerie",
          enonce:
            "Arthur, boulanger, modélise son bénéfice journalier (modèle), en dizaines d'euros, pour $x$ dizaines de baguettes : $B(x) = -2x^2 + 24x - 40$.\na) Calcule $B(2)$.\nb) Quel est le seuil, différent de 2, où le bénéfice s'annule ?\nc) Écris la forme factorisée de $B(x)$.\nd) Développe le produit de tes deux parenthèses, sans le coefficient devant : quel coefficient de $x$ trouves-tu ?",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: [...fact("-2", "(x - 2)", "(x - 10)"), ...fact("2", "(2 - x)", "(x - 10)"), ...fact("2", "(x - 2)", "(10 - x)")], exact: true },
            { question: "d)", attendu: "-12" },
          ],
          correction:
            "a) $B(2) = -2 \\times 4 + 24 \\times 2 - 40 = -8 + 48 - 40 = 0$.\nb) $a = -2$ et $c = -40$ : $\\dfrac{c}{a} = 20$. Donc $2 \\times x_2 = 20$, soit $x_2 = 10$.\nc) $B(x) = -2(x - 2)(x - 10)$.\nd) $(x - 2)(x - 10) = x^2 - 12x + 20$ : le coefficient de $x$ est $-12$. On multiplie par $-2$ pour contrôler : $-2x^2 + 24x - 40$, c'est bien $B(x)$. ✔\n⛔ Le piège au b) : prendre $-40$ pour le produit des racines sans diviser par $a$.\nRéponse : a) $0$ ; b) $10$ ; c) $B(x) = -2(x - 2)(x - 10)$ ; d) $-12$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue", "fct_d2_verifier_developpee"],
        },
        {
          titre: "Deux copies à départager",
          enonce:
            "Dans un cabinet d'études, Jade et Samir factorisent $x^2 + 2x - 15$, en sachant que 3 est une racine. Jade écrit $(x - 3)(x - 5)$. Samir écrit $(x - 3)(x + 5)$.\na) Développe la forme de Jade.\nb) Développe la forme de Samir.\nc) Qui a raison ? Écris son prénom.\nd) Quelle est l'autre racine ?",
          reponses: [
            { question: "a)", attendu: "x^2 - 8x + 15", exact: true },
            { question: "b)", attendu: "x^2 + 2x - 15", exact: true },
            { question: "c)", attendu: "Samir" },
            { question: "d)", attendu: "-5" },
          ],
          correction:
            "a) $(x - 3)(x - 5) = x^2 - 5x - 3x + 15 = x^2 - 8x + 15$.\nb) $(x - 3)(x + 5) = x^2 + 5x - 3x - 15 = x^2 + 2x - 15$.\nc) Seule la forme de Samir redonne le polynôme de départ.\nd) $\\dfrac{c}{a} = -15$, donc $3 \\times x_2 = -15$, soit $x_2 = -5$.\n⛔ Le piège : voir « 5 » dans les deux copies et s'arrêter. Le signe de la racine décide de tout.\nRéponse : a) $x^2 - 8x + 15$ ; b) $x^2 + 2x - 15$ ; c) Samir ; d) $-5$.",
          micros: ["fct_d2_factoriser_racine_connue", "fct_d2_verifier_developpee"],
        },
        {
          titre: "Le prix du billet",
          enonce:
            "Dalia gère un cinéma indépendant. Le bénéfice d'une séance (modèle), en euros, pour un billet à $p$ euros, est $B(p) = -10p^2 + 150p - 360$.\na) Parmi 2, 3 et 4, quel prix annule le bénéfice ?\nb) Quel autre prix l'annule aussi ?\nc) Écris la forme factorisée de $B(p)$.\nd) Avec la forme factorisée, calcule $B(13)$.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: [...fact("-10", "(p - 3)", "(p - 12)"), ...fact("10", "(3 - p)", "(p - 12)"), ...fact("10", "(p - 3)", "(12 - p)")], exact: true },
            { question: "d)", attendu: "-100" },
          ],
          correction:
            "a) $B(2) = -40 + 300 - 360 = -100$. $B(3) = -90 + 450 - 360 = 0$. $B(4) = -160 + 600 - 360 = 80$. C'est 3.\nb) $a = -10$ et $c = -360$ : $\\dfrac{c}{a} = 36$. Donc $3 \\times x_2 = 36$, soit $x_2 = 12$.\nc) $B(p) = -10(p - 3)(p - 12)$.\nd) $B(13) = -10 \\times 10 \\times 1 = -100$ : à 13 €, ce modèle annonce une perte.\n⛔ Le piège au a) : s'arrêter sur $B(4) = 80$, un bénéfice positif. Une racine annule, elle ne rapporte pas.\nRéponse : a) 3 ; b) 12 ; c) $B(p) = -10(p - 3)(p - 12)$ ; d) $-100$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue"],
        },
        {
          titre: "Le coefficient oublié",
          enonce:
            "Une biologiste marine, Ava, modélise la croissance d'algues selon $x$, un écart de salinité à la normale, avec $f(x) = 3x^2 - 3x - 36$ (modèle). Son collègue affirme : « 4 est racine, donc $f(x) = (x - 4)(x + 3)$ ».\na) Calcule $f(4)$.\nb) 4 est-il une racine ? Réponds oui ou non.\nc) Développe $(x - 4)(x + 3)$.\nd) Le collègue a-t-il raison pour la forme factorisée ? Réponds oui ou non.\ne) Écris la bonne forme factorisée.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "x^2 - x - 12", exact: true },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: [...fact("3", "(x - 4)", "(x + 3)"), ...fact("3", "(x - 4)", "(3 + x)")], exact: true },
          ],
          correction:
            "a) $f(4) = 3 \\times 16 - 3 \\times 4 - 36 = 48 - 12 - 36 = 0$.\nb) Oui, 4 est une racine.\nc) $(x - 4)(x + 3) = x^2 + 3x - 4x - 12 = x^2 - x - 12$.\nd) Ce n'est pas $3x^2 - 3x - 36$ : le coefficient de $x^2$ vaut 1 au lieu de 3. Non.\ne) $\\dfrac{c}{a} = \\dfrac{-36}{3} = -12$, donc $4 \\times x_2 = -12$, soit $x_2 = -3$. Avec $a = 3$ devant : $3(x - 4)(x + 3)$.\n⛔ Le piège : s'arrêter aux racines justes. Le collègue a les bonnes racines, mais il a oublié $a$.\nRéponse : a) $0$ ; b) oui ; c) $x^2 - x - 12$ ; d) non ; e) $3(x - 4)(x + 3)$.",
          micros: ["fct_d2_verifier_racine", "fct_d2_factoriser_racine_connue", "fct_d2_verifier_developpee"],
        },
      ],
    },
  ],
};
