// ─── Fiche d'exercices : l'équation de la tangente (STMG) — 20 exercices ───────
//
// Notion der_tangente_equation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : l'équation réduite à partir de
// f(a) et f'(a), ou d'une expression ; son ordonnée à l'origine ; une estimation
// par la tangente ; construire la tangente (avancer de 1, monter de f'(a)) ;
// vérifier qu'un point est dessus.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (1 à 8) ; sport (préparatrice physique, 9),
// météo (météorologue, 10), urgences (cadre de santé, 11), paysage (paysagiste, 12),
// restauration (restauratrice, 13), canyoning (guide, 14), informatique
// (administrateur réseau, 15), ponts (ingénieure, 16) ; fusée à eau (animatrice
// scientifique, 17), vie associative (trésorière, 18), forêt (forestier, 19),
// acoustique (technicienne du son, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_tg_equation_reduite (1, 2, 3, 9, 10, 11, 13, 14, 15, 16,
// 17, 18, 19, 20), der_tg_construire (4, 5, 6, 12), der_tg_verifier_point (7, 8,
// 11, 15, 16, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

export const exercicesDerTangenteEquationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-tangente-equation",
  titre: "L'équation de la tangente",
  accroche:
    "Vingt exercices pour écrire l'équation d'une tangente sans se tromper de nombre : la formule, l'équation réduite, le second point pour la tracer à la règle, le point à vérifier, et l'estimation qu'elle permet. Une météo, des urgences, une fusée à eau, un pont, un menu de restaurant. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire l'équation, placer un second point, ou tester un point.",
      rappel: [
        "La tangente au point d'abscisse $a$ : $y = f'(a)(x - a) + f(a)$. Le nombre dérivé va devant la parenthèse, l'image va à la fin.",
        "On développe pour obtenir l'équation réduite $y = mx + p$. Ici, $m = f'(a)$.",
        "Pour la tracer : on place A$(a\\,;f(a))$, on avance de 1 vers la droite, on monte de $f'(a)$, ou on descend s'il est négatif.",
        "Un point est sur la droite si ses coordonnées vérifient l'équation : on remplace $x$ et on compare à $y$.",
      ],
      exercices: [
        {
          enonce:
            "On sait que $f(2) = 3$ et $f'(2) = 4$. Donne l'équation réduite de la tangente au point d'abscisse 2.",
          reponses: [{ attendu: ["y = 4x - 5", "y = -5 + 4x"], exact: true }],
          correction:
            "$y = f'(2)(x - 2) + f(2)$, donc $y = 4(x - 2) + 3$.\nOn développe : $y = 4x - 8 + 3 = 4x - 5$.\n⛔ Le piège : écrire $y = 3x + 4$, en échangeant l'image et le nombre dérivé. Le coefficient directeur, c'est $f'(2)$.\nRéponse : $y = 4x - 5$.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "On sait que $f(1) = 6$ et $f'(1) = 1$. Donne l'équation réduite de la tangente au point d'abscisse 1.",
          reponses: [{ attendu: ["y = x + 5", "y = 5 + x"], exact: true }],
          correction:
            "$y = 1 \\times (x - 1) + 6$.\nOn développe : $y = x - 1 + 6 = x + 5$.\n⛔ Le piège : écrire $y = x + 6$, en oubliant le $-1$ qui vient de la parenthèse.\nRéponse : $y = x + 5$.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "On sait que $f(-1) = 2$ et $f'(-1) = -3$. Donne l'équation réduite de la tangente au point d'abscisse $-1$.",
          reponses: [{ attendu: ["y = -3x - 1", "y = -1 - 3x"], exact: true }],
          correction:
            "$y = -3(x - (-1)) + 2 = -3(x + 1) + 2$.\nOn développe : $y = -3x - 3 + 2 = -3x - 1$.\n⛔ Le piège : garder $x - 1$ dans la parenthèse. Moins moins un fait plus un.\nRéponse : $y = -3x - 1$.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "On trace la tangente à la courbe de $f$ au point A$(4\\,;2)$, avec $f'(4) = 1{,}5$. Quelle est son ordonnée à l'origine ?",
          reponses: [{ attendu: "-4" }],
          correction:
            "La tangente s'écrit $y = 1{,}5x + p$.\nElle passe par A : $2 = 1{,}5 \\times 4 + p = 6 + p$.\nDonc $p = 2 - 6 = -4$.\n⛔ Le piège : répondre 2, l'ordonnée de A. L'ordonnée à l'origine est celle du point d'abscisse 0.\nRéponse : $-4$.",
          micros: ["der_tg_construire"],
        },
        {
          enonce:
            "On veut tracer à la règle la tangente à la courbe de $f$ au point A$(1\\,;1)$, avec $f'(1) = 2$. Quelle est l'ordonnée du point de la tangente d'abscisse 2 ?",
          reponses: [{ attendu: "3" }],
          correction:
            "De l'abscisse 1 à l'abscisse 2, on avance de 1.\nOn monte alors de $f'(1) = 2$.\nL'ordonnée devient $1 + 2 = 3$ : le second point est $(2\\,;3)$.\n⛔ Le piège : répondre 2, en lisant $f'(1)$ comme une ordonnée. C'est de combien on monte, pas où on arrive.\nRéponse : 3.",
          micros: ["der_tg_construire"],
        },
        {
          enonce:
            "On trace la tangente à la courbe de $f$ au point A$(4\\,;3)$, avec $f'(4) = -2$. Quelle est l'ordonnée du point de la tangente d'abscisse 8 ?",
          reponses: [{ attendu: "-5" }],
          correction:
            "De 4 à 8, on avance de 4.\nÀ chaque pas de 1, on descend de 2 : $4 \\times (-2) = -8$.\nL'ordonnée devient $3 - 8 = -5$.\n⛔ Le piège : descendre une seule fois de 2 et répondre 1. L'écart des abscisses vaut 4, pas 1.\nRéponse : $-5$.",
          micros: ["der_tg_construire"],
        },
        {
          enonce:
            "La tangente tracée a pour équation $y = 2x - 1$. Le point M$(1\\,;3)$ appartient-il à cette tangente ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "On remplace $x$ par 1 : $y = 2 \\times 1 - 1 = 1$.\nM a pour ordonnée 3, et non 1.\n⛔ Le piège : remplacer $x$ par 3, l'ordonnée de M. On remplace $x$ par l'abscisse, puis on compare à l'ordonnée.\nRéponse : non.",
          micros: ["der_tg_verifier_point"],
        },
        {
          enonce:
            "La tangente a pour équation $y = -2x + 9$. Le point M d'abscisse 3 est sur cette tangente. Quelle est son ordonnée ?",
          reponses: [{ attendu: "3" }],
          correction:
            "On remplace $x$ par 3 : $y = -2 \\times 3 + 9$.\n$y = -6 + 9 = 3$.\n⛔ Le piège : calculer $-2 \\times 3 = 6$ en perdant le signe, ce qui donnerait 15.\nRéponse : 3.",
          micros: ["der_tg_verifier_point"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : l'image, le nombre dérivé, puis l'équation.",
      rappel: [
        "Toujours dans cet ordre : $f(a)$, puis $f'(a)$, puis $y = f'(a)(x - a) + f(a)$.",
        "Près du point, la courbe et sa tangente sont presque confondues : l'équation de la tangente donne une estimation de $f$.",
        "Une tangente horizontale a une équation sans $x$ : $y = f(a)$.",
      ],
      exercices: [
        {
          enonce:
            "Une préparatrice physique modélise l'écart de masse d'un sportif par $M(t) = t^2 - 3t + 1$, en kg, où $t$ est le temps en mois. On admet que $M'(t) = 2t - 3$.\na) Calcule $M(2)$.\nb) Calcule $M'(2)$.\nc) Donne l'équation réduite de la tangente en 2, sous la forme $y = mt + p$.",
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: ["y = t - 3", "y = -3 + t"], exact: true },
          ],
          correction:
            "a) $M(2) = 4 - 6 + 1 = -1$.\nb) $M'(2) = 2 \\times 2 - 3 = 1$.\nc) $y = 1 \\times (t - 2) + (-1) = t - 2 - 1 = t - 3$.\n⛔ Le piège au c) : écrire $y = t - 1$, en oubliant le $-2$ de la parenthèse.\nRéponse : a) $-1$ ; b) 1 ; c) $y = t - 3$.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "Un météorologue modélise une température $T(t)$, en °C, où $t$ est le temps en heures. Il sait que $T(10) = 15$ et $T'(10) = 0{,}8$ (modèle).\na) Donne l'équation réduite de la tangente en 10, sous la forme $y = mt + p$.\nb) En approchant la courbe par cette tangente, estime $T(11)$.\nc) Estime de même $T(10{,}5)$.",
          reponses: [
            { question: "a)", attendu: ["y = 0,8t + 7", "y = 7 + 0,8t"], exact: true },
            { question: "b)", attendu: "15,8" },
            { question: "c)", attendu: "15,4" },
          ],
          correction:
            "a) $y = 0{,}8(t - 10) + 15 = 0{,}8t - 8 + 15 = 0{,}8t + 7$.\nb) En $t = 11$ : $0{,}8 \\times 11 + 7 = 8{,}8 + 7 = 15{,}8$.\nc) En $t = 10{,}5$ : $0{,}8 \\times 10{,}5 + 7 = 8{,}4 + 7 = 15{,}4$.\n⛔ Le piège au b) : calculer $15 \\times 0{,}8$. Le nombre dérivé donne ce qu'on AJOUTE par heure, il ne multiplie pas la température.\nRéponse : a) $y = 0{,}8t + 7$ ; b) 15,8 ; c) 15,4.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "Une cadre de santé modélise le temps d'attente aux urgences par $A(x) = 3x^2 - 2x + 5$, en minutes, où $x$ est le nombre de patients en salle, en dizaines. On admet que $A'(x) = 6x - 2$.\na) Donne l'équation réduite de la tangente en 1.\nb) Le point M$(3\\,;14)$ est-il sur cette tangente ? Réponds oui ou non.\nc) Le point N$(2\\,;9)$ est-il sur cette tangente ? Réponds oui ou non.\nd) Le point P d'abscisse 5 est sur cette tangente. Quelle est son ordonnée ?",
          reponses: [
            { question: "a)", attendu: ["y = 4x + 2", "y = 2 + 4x"], exact: true },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "22" },
          ],
          correction:
            "a) $A(1) = 3 - 2 + 5 = 6$ et $A'(1) = 6 - 2 = 4$. Donc $y = 4(x - 1) + 6 = 4x + 2$.\nb) $4 \\times 3 + 2 = 14$ : oui.\nc) $4 \\times 2 + 2 = 10$, et N a pour ordonnée 9 : non.\nd) $4 \\times 5 + 2 = 22$.\n⛔ Le piège au b) : remplacer dans $A(x)$. Le point doit vérifier l'équation de la TANGENTE, pas celle de la courbe.\nRéponse : a) $y = 4x + 2$ ; b) oui ; c) non ; d) 22.",
          micros: ["der_tg_equation_reduite", "der_tg_verifier_point"],
        },
        {
          enonce:
            "Un paysagiste trace une butte de profil $f(x) = 0{,}5x^2 - 2x + 3$, et le point A$(4\\,;3)$ de la courbe. On admet que $f'(4) = 2$.\na) Depuis A, on avance de 1 vers la droite. De combien monte-t-on sur la tangente ?\nb) Quelle est l'ordonnée du point de la tangente d'abscisse 5 ?\nc) Quelle est l'ordonnée à l'origine de la tangente ?\nd) Donne l'équation réduite de la tangente.",
          figure: repere([-1, 7, -6, 8], [{ q: [0.5, -2, 3] }], [{ x: 4, y: 3, label: "A" }], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "-5" },
            { question: "d)", attendu: ["y = 2x - 5", "y = -5 + 2x"], exact: true },
          ],
          correction:
            "a) On monte de $f'(4) = 2$.\nb) $3 + 2 = 5$ : le second point est $(5\\,;5)$.\nc) De l'abscisse 4 à l'abscisse 0, on recule de 4, donc on descend de $4 \\times 2 = 8$ : $3 - 8 = -5$.\nd) $y = 2x - 5$. Vérification en A : $2 \\times 4 - 5 = 3$. ✔\nOn trace la droite par A et par $(5\\,;5)$.\n⛔ Le piège au b) : prendre l'ordonnée sur la COURBE, $f(5) = 5{,}5$. Le second point est sur la tangente.\nRéponse : a) 2 ; b) 5 ; c) $-5$ ; d) $y = 2x - 5$.",
          schema: repere([-1, 7, -6, 8], [{ q: [0.5, -2, 3] }, { q: [0, 2, -5], couleur: ORANGE }], [
            { x: 4, y: 3, label: "A" },
            { x: 5, y: 5, label: "B" },
          ], undefined, true),
          micros: ["der_tg_construire"],
        },
        {
          enonce:
            "Une restauratrice prépare $x$ menus. Le coût est $C(x) = 0{,}5x^2 + 10x + 100$, en euros (modèle). On admet que $C'(x) = x + 10$.\na) Calcule $C(20)$.\nb) Calcule $C'(20)$.\nc) Donne l'équation réduite de la tangente en 20.\nd) Estime $C(21)$ avec cette tangente.\ne) Calcule la vraie valeur $C(21)$.",
          reponses: [
            { question: "a)", attendu: "500" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: ["y = 30x - 100", "y = -100 + 30x"], exact: true },
            { question: "d)", attendu: "530" },
            { question: "e)", attendu: "530,5" },
          ],
          correction:
            "a) $C(20) = 200 + 200 + 100 = 500$.\nb) $C'(20) = 20 + 10 = 30$.\nc) $y = 30(x - 20) + 500 = 30x - 600 + 500 = 30x - 100$.\nd) $30 \\times 21 - 100 = 530$.\ne) $C(21) = 220{,}5 + 210 + 100 = 530{,}5$.\nL'estimation est très proche.\n⛔ Le piège au c) : écrire $y = 30x + 500$, sans développer la parenthèse.\nRéponse : a) 500 ; b) 30 ; c) $y = 30x - 100$ ; d) 530 ; e) 530,5.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "Un guide de canyoning modélise le fond d'une vasque : sa hauteur est $H(x) = x^2 - 6x + 11$, en mètres, où $x$ est la distance au bord, en mètres. On admet que $H'(x) = 2x - 6$.\na) Calcule $H'(3)$.\nb) Calcule $H(3)$.\nc) Donne l'équation de la tangente en 3.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "y = 2" },
          ],
          correction:
            "a) $H'(3) = 6 - 6 = 0$ : la tangente est horizontale.\nb) $H(3) = 9 - 18 + 11 = 2$.\nc) $y = 0 \\times (x - 3) + 2$, donc $y = 2$.\n⛔ Le piège au c) : écrire $y = 2x$. Le coefficient directeur est 0 : le $x$ disparaît.\nRéponse : a) 0 ; b) 2 ; c) $y = 2$.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          enonce:
            "Un administrateur réseau modélise l'écart de charge d'un serveur à sa moyenne par $f(x) = x^3 - 3x + 1$, où $x$ est le temps en heures. On admet que $f'(x) = 3x^2 - 3$.\na) Calcule $f(2)$.\nb) Calcule $f'(2)$.\nc) Donne l'équation réduite de la tangente en 2.\nd) Le point M$(3\\,;12)$ est-il sur cette tangente ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: ["y = 9x - 15", "y = -15 + 9x"], exact: true },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $f(2) = 8 - 6 + 1 = 3$.\nb) $f'(2) = 3 \\times 4 - 3 = 9$.\nc) $y = 9(x - 2) + 3 = 9x - 18 + 3 = 9x - 15$.\nd) $9 \\times 3 - 15 = 12$ : oui.\n⛔ Le piège au b) : calculer $3 \\times 2^2$ comme $6^2$. La puissance passe avant la multiplication.\nRéponse : a) 3 ; b) 9 ; c) $y = 9x - 15$ ; d) oui.",
          micros: ["der_tg_equation_reduite", "der_tg_verifier_point"],
        },
        {
          enonce:
            "Une ingénieure étudie une arche de pont de profil $g(x) = -x^2 + 4x$. On admet que $g'(x) = -2x + 4$.\na) Donne l'équation réduite de la tangente en 1.\nb) Donne l'équation réduite de la tangente en 3.\nc) Le point M$(2\\,;5)$ est-il sur ces deux tangentes ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["y = 2x + 1", "y = 1 + 2x"], exact: true },
            { question: "b)", attendu: ["y = -2x + 9", "y = 9 - 2x"], exact: true },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) $g(1) = 3$ et $g'(1) = 2$ : $y = 2(x - 1) + 3 = 2x + 1$.\nb) $g(3) = 3$ et $g'(3) = -2$ : $y = -2(x - 3) + 3 = -2x + 9$.\nc) $2 \\times 2 + 1 = 5$ et $-2 \\times 2 + 9 = 5$ : M est sur les deux.\n⛔ Le piège au b) : garder le coefficient 2 parce que $g(3) = g(1)$. Même hauteur ne veut pas dire même pente.\nRéponse : a) $y = 2x + 1$ ; b) $y = -2x + 9$ ; c) oui.",
          schema: repere([-1, 5, -2, 6], [{ q: [-1, 4, 0] }, { q: [0, 2, 1], couleur: ORANGE }, { q: [0, -2, 9], couleur: ORANGE }], [
            { x: 1, y: 3, label: "A" },
            { x: 3, y: 3, label: "B" },
            { x: 2, y: 5, label: "M" },
          ]),
          micros: ["der_tg_equation_reduite", "der_tg_verifier_point"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on dérive d'abord, on écrit la tangente, on s'en sert.",
      rappel: [
        "On dérive terme à terme : $ax^2 + bx + c$ donne $2ax + b$, et $x^3$ donne $3x^2$.",
        "Attention : $f'(x)$ est une expression, $f'(a)$ est un nombre. La tangente utilise le nombre.",
        "Pour trouver où la tangente a un coefficient donné, on résout $f'(x) =$ ce coefficient.",
      ],
      exercices: [
        {
          titre: "La fusée à eau",
          enonce:
            "Une animatrice scientifique lance une fusée à eau. Son altitude est $A(t) = -t^2 + 8t$, en mètres, où $t$ est le temps en secondes (modèle).\na) Donne l'expression de $A'(t)$.\nb) Calcule $A(2)$.\nc) Calcule $A'(2)$.\nd) Donne l'équation réduite de la tangente en 2, sous la forme $y = mt + p$.\ne) Estime l'altitude à $t = 2{,}5$ avec cette tangente.\nf) Calcule la vraie altitude $A(2{,}5)$.",
          reponses: [
            { question: "a)", attendu: ["-2t + 8", "A'(t) = -2t + 8"] },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: ["y = 4t + 4", "y = 4 + 4t"], exact: true },
            { question: "e)", attendu: "14" },
            { question: "f)", attendu: "13,75" },
          ],
          correction:
            "a) $A'(t) = -2t + 8$.\nb) $A(2) = -4 + 16 = 12$.\nc) $A'(2) = -4 + 8 = 4$.\nd) $y = 4(t - 2) + 12 = 4t - 8 + 12 = 4t + 4$.\ne) $4 \\times 2{,}5 + 4 = 14$ m.\nf) $A(2{,}5) = -6{,}25 + 20 = 13{,}75$ m.\nL'écart n'est que de $0{,}25$ m.\n⛔ Le piège au d) : mettre $A'(t)$, une expression, devant la parenthèse. On y met le nombre $A'(2)$.\nRéponse : a) $-2t + 8$ ; b) 12 ; c) 4 ; d) $y = 4t + 4$ ; e) 14 ; f) 13,75.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          titre: "Les recettes de l'association",
          enonce:
            "Une trésorière modélise les recettes cumulées d'une association par $R(t) = 0{,}5t^2 + 2t + 10$, en milliers d'euros, où $t$ est le temps en mois.\na) Donne l'expression de $R'(t)$.\nb) Donne l'équation réduite de la tangente en 4, sous la forme $y = mt + p$.\nc) Estime $R(5)$ avec cette tangente.\nd) Calcule la vraie valeur $R(5)$.\ne) Quel est l'écart entre les deux ?",
          reponses: [
            { question: "a)", attendu: ["t + 2", "R'(t) = t + 2"] },
            { question: "b)", attendu: ["y = 6t + 2", "y = 2 + 6t"], exact: true },
            { question: "c)", attendu: "32" },
            { question: "d)", attendu: "32,5" },
            { question: "e)", attendu: ["0,5", "500 €"] },
          ],
          correction:
            "a) $R'(t) = 2 \\times 0{,}5t + 2 = t + 2$.\nb) $R(4) = 8 + 8 + 10 = 26$ et $R'(4) = 6$. Donc $y = 6(t - 4) + 26 = 6t - 24 + 26 = 6t + 2$.\nc) $6 \\times 5 + 2 = 32$.\nd) $R(5) = 12{,}5 + 10 + 10 = 32{,}5$.\ne) $32{,}5 - 32 = 0{,}5$, soit 500 €.\n⛔ Le piège au a) : garder $0{,}5t$. Dans $0{,}5t^2$, on multiplie $0{,}5$ par 2 : il reste $t$.\nRéponse : a) $t + 2$ ; b) $y = 6t + 2$ ; c) 32 ; d) 32,5 ; e) 0,5.",
          micros: ["der_tg_equation_reduite"],
        },
        {
          titre: "La pente de la courbe de croissance",
          enonce:
            "Un forestier modélise la croissance d'un arbre par $h(x) = x^2 + 2x$, en décimètres, où $x$ est le temps en années.\na) Donne l'expression de $h'(x)$.\nb) En quelle abscisse la tangente a-t-elle pour coefficient directeur 8 ?\nc) Calcule l'image de cette abscisse.\nd) Donne l'équation réduite de cette tangente.\ne) Le point M$(1\\,;-1)$ est-il sur cette tangente ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["2x + 2", "h'(x) = 2x + 2"] },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: ["y = 8x - 9", "y = -9 + 8x"], exact: true },
            { question: "e)", attendu: "oui" },
          ],
          correction:
            "a) $h'(x) = 2x + 2$.\nb) $2x + 2 = 8$, donc $2x = 6$, donc $x = 3$.\nc) $h(3) = 9 + 6 = 15$.\nd) $y = 8(x - 3) + 15 = 8x - 24 + 15 = 8x - 9$.\ne) $8 \\times 1 - 9 = -1$ : oui.\n⛔ Le piège au b) : résoudre $h(x) = 8$. Le coefficient directeur se cherche sur la dérivée.\nRéponse : a) $2x + 2$ ; b) 3 ; c) 15 ; d) $y = 8x - 9$ ; e) oui.",
          micros: ["der_tg_equation_reduite", "der_tg_verifier_point"],
        },
        {
          titre: "Le signal de l'enceinte",
          enonce:
            "Une technicienne du son modélise un signal par $s(x) = x^3 - 3x^2 + 2$, où $x$ est le temps en millisecondes.\na) Donne l'expression de $s'(x)$.\nb) Calcule $s(1)$ et $s'(1)$. Donne les deux nombres dans cet ordre.\nc) Donne l'équation réduite de la tangente en 1.\nd) Le point M$(3\\,;-6)$ est-il sur cette tangente ? Réponds oui ou non.\ne) Donne l'équation de la tangente en 2.",
          reponses: [
            { question: "a)", attendu: ["3x^2 - 6x", "s'(x) = 3x^2 - 6x"] },
            { question: "b)", attendu: "0 ; -3", ordre: true },
            { question: "c)", attendu: ["y = -3x + 3", "y = 3 - 3x"], exact: true },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "y = -2" },
          ],
          correction:
            "a) $s'(x) = 3x^2 - 6x$ : la constante 2 disparaît.\nb) $s(1) = 1 - 3 + 2 = 0$ et $s'(1) = 3 - 6 = -3$.\nc) $y = -3(x - 1) + 0 = -3x + 3$.\nd) $-3 \\times 3 + 3 = -6$ : oui.\ne) $s(2) = 8 - 12 + 2 = -2$ et $s'(2) = 12 - 12 = 0$. La tangente est horizontale : $y = -2$.\n⛔ Le piège au e) : écrire $y = 0$, en prenant le nombre dérivé pour l'image.\nRéponse : a) $3x^2 - 6x$ ; b) 0 ; $-3$ ; c) $y = -3x + 3$ ; d) oui ; e) $y = -2$.",
          micros: ["der_tg_equation_reduite", "der_tg_verifier_point"],
        },
      ],
    },
  ],
};
