// ─── Fiche d'exercices : dérivée et tangente, automatismes de Tle (STMG) ────────
//
// Notion auto_terminale_derivee du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-terminale.bank.ts`). Réflexes
// de terminale, degré 3 au plus : dériver un polynôme terme à terme, f'(a) comme
// coefficient directeur de la tangente, tangente horizontale (f'(x) = 0), lire la
// pente d'une tangente tracée et ce qu'elle dit du sens de variation.
// ⛔ Pas d'équation de tangente (notion der_tangente_equation), pas de forme canonique.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; imprimerie (gestionnaire), salle
// de théâtre (directrice), tutorat (tutrice), rivière (biologiste), verrerie
// (souffleur de verre), athlétisme (entraîneuse), parc de loisirs (architecte),
// maraîchage (maraîcher), bijoux (créatrice), contrôle de gestion (contrôleuse),
// eau (technicien de station d'épuration), lycée (correctrice).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`,
// qui dérive de son côté et relit les tangentes dans les figures.
//
// Micro-compétences : autoT_derivee_polynome (1, 2, 3, 4, 5, 9, 10, 11, 15, 16, 17, 18,
// 19, 20), autoT_coefficient_tangente_derivee (6, 9, 10, 15, 16, 17, 18, 19, 20),
// autoT_coefficient_tangente_graphique (7, 8, 12, 13, 14, 18). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

// Un signe : le mot, au masculin ou au féminin (« l'expression est positive »), ou + / −.
const POSITIF = ["positif", "positive", "+"];
const NEGATIF = ["négatif", "négative", "-"];

export const exercicesAutoTerminaleDeriveeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-terminale-derivee",
  titre: "Dérivée et tangente : les automatismes de terminale",
  accroche:
    "Vingt exercices pour dériver sans réfléchir et lire une tangente : dériver un polynôme terme à terme, calculer le coefficient directeur d'une tangente, trouver où elle est horizontale, lire sa pente sur le dessin. Une imprimerie, un souffleur de verre, un lancer de javelot, un toboggan, une station d'épuration. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Le carré s'écrit x².",
      rappel: [
        "$(x^3)' = 3x^2$ ; $(x^2)' = 2x$ ; $(x)' = 1$ ; la dérivée d'une constante est 0. Le coefficient reste devant : $(5x^2)' = 10x$.",
        "On dérive une somme terme à terme.",
        "Le coefficient directeur de la tangente au point d'abscisse $a$ est $f'(a)$, pas $f(a)$.",
        "Sur le dessin : on avance de 1 le long de la tangente, et on compte de combien on monte ou on descend.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = 4x^2$. Quelle est l'expression de $f'(x)$ ?",
          reponses: [{ attendu: ["8x", "f'(x) = 8x"] }],
          correction:
            "L'exposant descend en facteur et diminue de 1 : $(x^2)' = 2x$.\nLe coefficient 4 reste : $4 \\times 2x = 8x$.\n⛔ Le piège : écrire $4x$, en perdant le 2 de l'exposant.\nRéponse : $f'(x) = 8x$.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce: "Soit $f(x) = 5x - 7$. Quelle est l'expression de $f'(x)$ ?",
          reponses: [{ attendu: ["5", "f'(x) = 5"] }],
          correction:
            "$(5x)' = 5$ : le terme en $x$ donne son coefficient.\n$(-7)' = 0$ : une constante disparaît.\nDonc $f'(x) = 5$.\n⛔ Le piège : garder $x$ et écrire $5x$. La dérivée de $x$ est 1, pas $x$.\nRéponse : $f'(x) = 5$.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce: "Soit $f(x) = 3x^2 - 2x + 6$. Quelle est l'expression de $f'(x)$ ?",
          reponses: [{ attendu: ["6x - 2", "f'(x) = 6x - 2"] }],
          correction:
            "On dérive terme à terme.\n$(3x^2)' = 6x$ ; $(-2x)' = -2$ ; $(6)' = 0$.\nDonc $f'(x) = 6x - 2$.\n⛔ Le piège : recopier la constante et écrire $6x - 2 + 6$.\nRéponse : $f'(x) = 6x - 2$.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce: "Soit $f(x) = x^3 + 2x^2 - 5x + 1$. Quelle est l'expression de $f'(x)$ ?",
          reponses: [{ attendu: ["3x^2 + 4x - 5", "f'(x) = 3x^2 + 4x - 5"] }],
          correction:
            "$(x^3)' = 3x^2$ ; $(2x^2)' = 4x$ ; $(-5x)' = -5$ ; $(1)' = 0$.\nDonc $f'(x) = 3x^2 + 4x - 5$.\n⛔ Le piège : baisser l'exposant sans le faire descendre, et écrire $x^2 + 2x - 5$.\nRéponse : $f'(x) = 3x^2 + 4x - 5$.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce: "Soit $f(x) = -2x^3 + x$. Quelle est l'expression de $f'(x)$ ?",
          reponses: [{ attendu: ["-6x^2 + 1", "f'(x) = -6x^2 + 1"] }],
          correction:
            "$(-2x^3)' = -2 \\times 3x^2 = -6x^2$.\n$(x)' = 1$.\nDonc $f'(x) = -6x^2 + 1$.\n⛔ Le piège : effacer le terme en $x$ comme une constante. Sa dérivée vaut 1, pas 0.\nRéponse : $f'(x) = -6x^2 + 1$.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 + 3x$. Quel est le coefficient directeur de la tangente à la courbe de $f$ au point d'abscisse 1 ?",
          reponses: [{ attendu: "5" }],
          correction:
            "On dérive : $f'(x) = 2x + 3$.\nOn remplace $x$ par 1 : $f'(1) = 2 \\times 1 + 3 = 5$.\n⛔ Le piège : calculer $f(1) = 1 + 3 = 4$, la hauteur du point. Le coefficient directeur se calcule avec $f'$.\nRéponse : 5.",
          micros: ["autoT_coefficient_tangente_derivee"],
        },
        {
          enonce:
            "La droite tracée est la tangente à la courbe au point $A$. Lis son coefficient directeur.",
          figure: repere([-3, 4, -4, 6], [{ q: [1, 0, 0] }, { q: [0, 2, -1], couleur: ORANGE }], [{ x: 1, y: 1, label: "A" }]),
          reponses: [{ attendu: "2" }],
          correction:
            "On part de $A(1\\,;\\,1)$ et on suit la tangente.\nEn avançant de 1, on arrive à $(2\\,;\\,3)$ : on monte de $3 - 1 = 2$.\nDonc le coefficient directeur vaut 2.\n⛔ Le piège : suivre la courbe au lieu de la tangente. De $(1\\,;\\,1)$, la courbe arrive à $(2\\,;\\,4)$ : ce n'est pas la droite demandée.\nRéponse : 2.",
          micros: ["autoT_coefficient_tangente_graphique"],
        },
        {
          enonce:
            "Sur ce dessin, la droite tracée est la tangente à la courbe au point $A$. Quel est son coefficient directeur ?",
          figure: repere([-2, 5, -3, 8], [{ q: [-1, 1, 4] }, { q: [0, -3, 8], couleur: ORANGE }], [{ x: 2, y: 2, label: "A" }], undefined, true),
          reponses: [{ attendu: "-3" }],
          correction:
            "On part de $A(2\\,;\\,2)$ et on suit la tangente.\nEn avançant de 1, on arrive à $(3\\,;\\,-1)$ : on descend de 3.\nLa tangente descend : le coefficient directeur est négatif, il vaut $-3$.\n⛔ Le piège : répondre 3 sans le signe. Une droite qui descend a un coefficient directeur négatif.\nRéponse : $-3$.",
          micros: ["autoT_coefficient_tangente_graphique"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation et plusieurs questions : dériver, remplacer, conclure.",
      rappel: [
        "Une tangente horizontale a un coefficient directeur nul : on résout $f'(x) = 0$.",
        "Une tangente qui monte : $f'$ est positif, $f$ est croissante en ce point. Une tangente qui descend : $f'$ est négatif, $f$ est décroissante.",
        "$f(a)$ est la hauteur du point, $f'(a)$ est la pente de sa tangente : ce sont deux nombres différents.",
      ],
      exercices: [
        {
          enonce:
            "Le gestionnaire d'une imprimerie modélise un coût par $C(x) = 2x^2 + 10x + 50$, en euros, pour $x$ centaines d'affiches (modèle).\na) Quelle est l'expression de $C'(x)$ ?\nb) Quel est le coefficient directeur de la tangente au point d'abscisse 5 ?\nc) Quelle est la hauteur du point d'abscisse 5, c'est-à-dire $C(5)$ ?",
          reponses: [
            { question: "a)", attendu: ["4x + 10", "C'(x) = 4x + 10"] },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "150" },
          ],
          correction:
            "a) $(2x^2)' = 4x$ ; $(10x)' = 10$ ; $(50)' = 0$. Donc $C'(x) = 4x + 10$.\nb) $C'(5) = 4 \\times 5 + 10 = 30$.\nc) $C(5) = 2 \\times 25 + 50 + 50 = 150$.\n⛔ Le piège : confondre b) et c). 30 est la pente de la tangente, 150 est la hauteur du point.\nRéponse : a) $4x + 10$ ; b) 30 ; c) 150.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          enonce:
            "La directrice d'un théâtre modélise son bénéfice par $B(x) = -2x^2 + 24x - 40$, en centaines d'euros, pour un billet à $x$ dizaines d'euros (modèle).\na) Quelle est l'expression de $B'(x)$ ?\nb) En quel point la tangente est-elle horizontale ? Donne son abscisse.\nc) Quelle est la valeur de $B$ en ce point ?",
          reponses: [
            { question: "a)", attendu: ["-4x + 24", "B'(x) = -4x + 24"] },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "32" },
          ],
          correction:
            "a) $(-2x^2)' = -4x$ ; $(24x)' = 24$ ; $(-40)' = 0$. Donc $B'(x) = -4x + 24$.\nb) Tangente horizontale : $B'(x) = 0$. $-4x + 24 = 0$ donne $4x = 24$, donc $x = 6$.\nc) $B(6) = -2 \\times 36 + 24 \\times 6 - 40 = -72 + 144 - 40 = 32$. C'est le maximum.\n⛔ Le piège au b) : résoudre $B(x) = 0$ au lieu de $B'(x) = 0$. On cherche où la pente est nulle, pas où la courbe coupe l'axe.\nRéponse : a) $-4x + 24$ ; b) 6 ; c) 32.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          enonce:
            "Une tutrice corrige une copie. Pour $f(x) = 2x^3 + 2x^2 + 3x + 9$, l'élève a écrit $f'(x) = 6x^2 + 4x + 3 + 9$.\na) Quelle est la bonne expression de $f'(x)$ ?\nb) Quel nombre l'élève a-t-il recopié à tort ?",
          reponses: [
            { question: "a)", attendu: ["6x^2 + 4x + 3", "f'(x) = 6x^2 + 4x + 3"] },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "a) $(2x^3)' = 6x^2$ ; $(2x^2)' = 4x$ ; $(3x)' = 3$ ; $(9)' = 0$. Donc $f'(x) = 6x^2 + 4x + 3$.\nb) L'élève a bien dérivé les trois premiers termes, mais il a gardé le 9.\n⛔ Le piège : la dérivée d'une constante est nulle. Le 9 disparaît, il ne reste pas à la fin.\nRéponse : a) $6x^2 + 4x + 3$ ; b) 9.",
          micros: ["autoT_derivee_polynome"],
        },
        {
          enonce:
            "Une biologiste modélise une population de saumons d'une rivière imaginaire par une fonction $f$ : $f(x)$ est le nombre de saumons, en centaines, et $x$ le rang de l'année. La droite tracée est la tangente à la courbe au point $A$.\na) Lis le coefficient directeur de la tangente.\nb) Quel est le signe de $f'$ en ce point ? Réponds positif ou négatif.\nc) La fonction y est-elle croissante ou décroissante ? Écris le mot.",
          figure: repere([-1, 7, -1, 10], [{ q: [-1, 6, 0] }, { q: [0, 4, 1], couleur: ORANGE }], [{ x: 1, y: 5, label: "A" }], undefined, true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: POSITIF },
            { question: "c)", attendu: ["croissante", "croissant"] },
          ],
          correction:
            "a) De $A(1\\,;\\,5)$, on avance de 1 sur la tangente : on arrive à $(2\\,;\\,9)$. On monte de 4.\nb) Le coefficient directeur est $f'(1) = 4$ : positif.\nc) $f'$ positif : $f$ est croissante en ce point.\n⛔ Le piège au c) : regarder si la courbe est haute ou basse. Le sens de variation se lit sur la pente, pas sur la hauteur.\nRéponse : a) 4 ; b) positif ; c) croissante.",
          micros: ["autoT_coefficient_tangente_graphique"],
        },
        {
          enonce:
            "Un souffleur de verre laisse refroidir une pièce, puis la remet au four (modèle) : la fonction $f$ donne la température, en centaines de degrés, selon le temps $x$, en heures. La droite tracée est la tangente à la courbe au point $A$.\na) Lis le coefficient directeur de la tangente.\nb) Quel est le signe de $f'$ en ce point ? Réponds positif ou négatif.\nc) La fonction y est-elle croissante ou décroissante ? Écris le mot.",
          figure: repere([-1, 8, -2, 10], [{ q: [0.5, -4, 9] }, { q: [0, -2, 7], couleur: ORANGE }], [{ x: 2, y: 3, label: "A" }], undefined, true),
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: NEGATIF },
            { question: "c)", attendu: ["décroissante", "décroissant"] },
          ],
          correction:
            "a) De $A(2\\,;\\,3)$, on avance de 1 sur la tangente : on arrive à $(3\\,;\\,1)$. On descend de 2, donc le coefficient vaut $-2$.\nb) $f'(2) = -2$ : négatif.\nc) $f'$ négatif : $f$ est décroissante en ce point. La pièce se refroidit.\n⛔ Le piège au a) : oublier le signe et répondre 2.\nRéponse : a) $-2$ ; b) négatif ; c) décroissante.",
          micros: ["autoT_coefficient_tangente_graphique"],
        },
        {
          enonce:
            "Une entraîneuse d'athlétisme étudie un lancer de javelot par un modèle : $x$ est la distance en dizaines de mètres, $y$ la hauteur en mètres. La droite tracée est la tangente à la courbe en son point $S$.\na) Quel est le coefficient directeur de cette tangente ?\nb) Quelle est l'abscisse de $S$ ?\nc) Quelle est la hauteur de $S$ ?",
          figure: repere([-1, 5, -1, 7], [{ q: [-1, 4, 1] }, { q: [0, 0, 5], couleur: ORANGE }], [{ x: 2, y: 5, label: "S" }]),
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "5 m" },
          ],
          correction:
            "a) La tangente est horizontale : en avançant, on ne monte ni ne descend. Son coefficient directeur vaut 0.\nb) On lit $S(2\\,;\\,5)$ : son abscisse est 2. La tangente y est horizontale : la pente de la courbe y est nulle.\nc) Sa hauteur est 5 m : c'est le maximum de la courbe.\n⛔ Le piège au a) : répondre 5, la hauteur de la tangente. Le coefficient directeur mesure la pente, et ici la pente est nulle.\nRéponse : a) 0 ; b) 2 ; c) 5 m.",
          micros: ["autoT_coefficient_tangente_graphique"],
        },
        {
          enonce:
            "Une architecte dessine le profil d'un toboggan par $f(x) = x^3 - 3x^2 + 2$ (modèle) : $x$ est la distance et $f(x)$ le niveau par rapport au bord de la piscine, en mètres.\na) Quelle est l'expression de $f'(x)$ ?\nb) Calcule le coefficient directeur de la tangente au point d'abscisse 3.\nc) Calcule le coefficient directeur de la tangente au point d'abscisse 2.\nd) La tangente au point d'abscisse 2 est-elle horizontale ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["3x^2 - 6x", "f'(x) = 3x^2 - 6x"] },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $(x^3)' = 3x^2$ ; $(-3x^2)' = -6x$ ; $(2)' = 0$. Donc $f'(x) = 3x^2 - 6x$.\nb) $f'(3) = 3 \\times 9 - 6 \\times 3 = 27 - 18 = 9$.\nc) $f'(2) = 3 \\times 4 - 6 \\times 2 = 12 - 12 = 0$.\nd) Le coefficient directeur est nul : oui, la tangente est horizontale.\n⛔ Le piège au b) : calculer $3^2$ au lieu de $3 \\times 3^2$. Le 3 devant $x^2$ reste : $3 \\times 9 = 27$.\nRéponse : a) $3x^2 - 6x$ ; b) 9 ; c) 0 ; d) oui.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          enonce:
            "Un maraîcher modélise un coût par $C(x) = 0{,}5x^2 + 3x + 20$, en euros, pour $x$ caisses de légumes (modèle).\na) Quelle est l'expression de $C'(x)$ ?\nb) Calcule le coefficient directeur de la tangente au point d'abscisse 4.\nc) Calcule le coefficient directeur de la tangente au point d'abscisse 10.\nd) En quel point, 4 ou 10, la tangente est-elle la plus raide ? Écris l'abscisse.",
          reponses: [
            { question: "a)", attendu: ["x + 3", "C'(x) = x + 3"] },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "13" },
            { question: "d)", attendu: "10" },
          ],
          correction:
            "a) $(0{,}5x^2)' = 0{,}5 \\times 2x = x$ ; $(3x)' = 3$ ; $(20)' = 0$. Donc $C'(x) = x + 3$.\nb) $C'(4) = 4 + 3 = 7$.\nc) $C'(10) = 10 + 3 = 13$.\nd) 13 est plus grand que 7 : la tangente est plus raide en $x = 10$.\n⛔ Le piège au a) : écrire $0{,}5x$. L'exposant 2 descend et se multiplie par $0{,}5$ : cela donne 1.\nRéponse : a) $x + 3$ ; b) 7 ; c) 13 ; d) 10.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : dériver, trouver le point utile, répondre dans la situation.",
      rappel: [
        "La méthode : on dérive, on remplace, puis on conclut.",
        "Le signe de $f'(a)$ dit si la fonction monte ou descend en $a$.",
        "Sur une parabole, la tangente horizontale est au sommet : c'est là qu'on trouve le maximum ou le minimum.",
      ],
      exercices: [
        {
          titre: "L'atelier de bijoux",
          enonce:
            "Une créatrice de bijoux modélise son bénéfice par $B(x) = -x^2 + 14x - 24$, en centaines d'euros, pour $x$ dizaines de bijoux.\na) Quelle est l'expression de $B'(x)$ ?\nb) Calcule $B'(3)$.\nc) En $x = 3$, le bénéfice est-il croissant ou décroissant ? Écris le mot.\nd) Pour quelle valeur de $x$ la tangente est-elle horizontale ?\ne) Quel est alors le bénéfice, en euros ?",
          reponses: [
            { question: "a)", attendu: ["-2x + 14", "B'(x) = -2x + 14"] },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: ["croissant", "croissante"] },
            { question: "d)", attendu: "7" },
            { question: "e)", attendu: "2 500 €" },
          ],
          correction:
            "a) $(-x^2)' = -2x$ ; $(14x)' = 14$ ; $(-24)' = 0$. Donc $B'(x) = -2x + 14$.\nb) $B'(3) = -6 + 14 = 8$.\nc) 8 est positif : le bénéfice est croissant en $x = 3$.\nd) $-2x + 14 = 0$ donne $x = 7$.\ne) $B(7) = -49 + 98 - 24 = 25$ centaines d'euros, soit $25 \\times 100 = 2\\,500$ €.\n⛔ Le piège au e) : remplacer $x$ dans $B'$ et trouver 0. La dérivée donne l'endroit, $B$ donne le montant.\nRéponse : a) $-2x + 14$ ; b) 8 ; c) croissant ; d) 7 ; e) 2 500 €.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          titre: "Un dessin et un calcul",
          enonce:
            "Une contrôleuse de gestion modélise l'écart à un budget par $f(x) = x^2 - 2x - 1$, en milliers d'euros, où $x$ est le rang du mois. La droite tracée est la tangente à la courbe au point $A$ d'abscisse 3.\na) Lis le coefficient directeur de la tangente.\nb) Quelle est l'expression de $f'(x)$ ?\nc) Calcule $f'(3)$ pour vérifier ta lecture.\nd) Pour quelle valeur de $x$ la tangente est-elle horizontale ?\ne) Quelle est la valeur de $f$ en ce point ?",
          figure: repere([-2, 5, -5, 8], [{ q: [1, -2, -1] }, { q: [0, 4, -10], couleur: ORANGE }], [{ x: 3, y: 2, label: "A" }], undefined, true),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: ["2x - 2", "f'(x) = 2x - 2"] },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "1" },
            { question: "e)", attendu: "-2" },
          ],
          correction:
            "a) De $A(3\\,;\\,2)$, on avance de 1 sur la tangente : on arrive à $(4\\,;\\,6)$. On monte de 4.\nb) $(x^2)' = 2x$ ; $(-2x)' = -2$ ; $(-1)' = 0$. Donc $f'(x) = 2x - 2$.\nc) $f'(3) = 6 - 2 = 4$ : la lecture est juste.\nd) $2x - 2 = 0$ donne $x = 1$.\ne) $f(1) = 1 - 2 - 1 = -2$ : c'est le minimum de l'écart.\n⛔ Le piège au e) : calculer $f'(1)$, qui vaut 0 par construction. On cherche la valeur de $f$.\nRéponse : a) 4 ; b) $2x - 2$ ; c) 4 ; d) 1 ; e) $-2$.",
          micros: ["autoT_coefficient_tangente_graphique", "autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          titre: "Le bassin de la station d'épuration",
          enonce:
            "Un technicien de station d'épuration modélise le niveau d'un bassin par $V(x) = x^3 - 12x + 20$, en décimètres, pour $x$ en heures, sur $[0\\,;\\,4]$ (modèle).\na) Quelle est l'expression de $V'(x)$ ?\nb) Calcule $V'(1)$.\nc) Calcule $V'(3)$.\nd) Calcule $V'(2)$.\ne) Quel est le niveau au point où la tangente est horizontale ?",
          reponses: [
            { question: "a)", attendu: ["3x^2 - 12", "V'(x) = 3x^2 - 12"] },
            { question: "b)", attendu: "-9" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: "0" },
            { question: "e)", attendu: "4" },
          ],
          correction:
            "a) $(x^3)' = 3x^2$ ; $(-12x)' = -12$ ; $(20)' = 0$. Donc $V'(x) = 3x^2 - 12$.\nb) $V'(1) = 3 - 12 = -9$ : négatif, le niveau baisse.\nc) $V'(3) = 27 - 12 = 15$ : positif, le niveau monte.\nd) $V'(2) = 12 - 12 = 0$ : la tangente est horizontale en $x = 2$.\ne) $V(2) = 8 - 24 + 20 = 4$. Le niveau baisse, puis remonte : c'est son minimum.\n⛔ Le piège au c) : écrire $3 \\times 3 = 9$ au lieu de $3 \\times 3^2 = 27$.\nRéponse : a) $3x^2 - 12$ ; b) $-9$ ; c) 15 ; d) 0 ; e) 4.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
        {
          titre: "La copie de Noa",
          enonce:
            "Une correctrice lit la copie de Noa. Pour $f(x) = 3x^2 - 4x + 2$, Noa écrit : « le coefficient directeur de la tangente au point d'abscisse 2 vaut 6 ».\na) Quelle est l'expression de $f'(x)$ ?\nb) Calcule le bon coefficient directeur au point d'abscisse 2.\nc) Calcule $f(2)$.\nd) Noa a-t-elle raison ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["6x - 4", "f'(x) = 6x - 4"] },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $(3x^2)' = 6x$ ; $(-4x)' = -4$ ; $(2)' = 0$. Donc $f'(x) = 6x - 4$.\nb) $f'(2) = 12 - 4 = 8$.\nc) $f(2) = 3 \\times 4 - 8 + 2 = 6$.\nd) Non : Noa a donné $f(2) = 6$, la hauteur du point, au lieu de $f'(2) = 8$, la pente.\n⛔ Le piège : calculer dans $f$ au lieu de calculer dans $f'$. C'est l'erreur la plus fréquente sur une tangente.\nRéponse : a) $6x - 4$ ; b) 8 ; c) 6 ; d) non.",
          micros: ["autoT_derivee_polynome", "autoT_coefficient_tangente_derivee"],
        },
      ],
    },
  ],
};
