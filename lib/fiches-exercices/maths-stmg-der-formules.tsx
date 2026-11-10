// ─── Fiche d'exercices : les formules de dérivation (STMG) — 20 exercices ──────
//
// Notion der_formules du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : dériver x² et x³, k × une fonction,
// une somme (la constante disparaît), calculer f'(a), s'en servir pour une vitesse
// ou une petite variation, retrouver quelle fonction a une dérivée donnée parmi
// plusieurs (on dérive chacune : le coach le pose en QCM, sans primitive).
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (1 à 8) ; skate (monitrice, 9), carrelage
// (carreleuse, 10), aquariophilie (vendeur, 11), jeux de société (éditeur, 12),
// copie d'élève (Tom, 13), dessin (graphiste, 14), RH (responsable, 15), barrage
// (technicien, 16) ; spéléologie (spéléologue, 17), podcasts (productrice, 18),
// céramique (potière, 19), menuiserie (menuisière, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_f_carre (1, 3, 6, 9, 10, 14, 16, 17, 18, 20), der_f_cube
// (2, 4, 8, 11, 12, 18, 19), der_f_kf (3, 4, 9, 12, 14, 15, 16, 17, 18, 20),
// der_f_somme (5, 7, 8, 13, 15, 16, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

export const exercicesDerFormulesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-formules",
  titre: "Les formules de dérivation",
  accroche:
    "Vingt exercices pour dériver sans hésiter : le carré, le cube, le nombre devant, la somme, et la constante qui disparaît. Puis ce que ça permet : la vitesse d'une skateuse, l'aire d'un carrelage, le volume d'un aquarium, deux podcasts qui se font la course. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : appliquer une formule, calculer une valeur.",
      rappel: [
        "La dérivée de $x^2$ est $2x$ ; la dérivée de $x^3$ est $3x^2$ ; la dérivée de $x$ est 1.",
        "Le nombre devant reste : la dérivée de $k \\times f$ est $k \\times f'$.",
        "On dérive une somme terme à terme, et un nombre seul a pour dérivée 0.",
        "$f'(a)$ : on dérive d'abord, puis on remplace $x$ par $a$.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = x^2$.\na) Donne l'expression de $f'(x)$.\nb) Calcule $f'(3)$.",
          reponses: [
            { question: "a)", attendu: ["2x", "f'(x) = 2x"] },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) La dérivée de $x^2$ est $2x$.\nb) $f'(3) = 2 \\times 3 = 6$.\n⛔ Le piège au b) : calculer $3^2 = 9$. Ce nombre est $f(3)$, on remplace dans la dérivée.\nRéponse : a) $2x$ ; b) 6.",
          micros: ["der_f_carre"],
        },
        {
          enonce: "Soit $f(x) = x^3$.\na) Donne l'expression de $f'(x)$.\nb) Calcule $f'(2)$.",
          reponses: [
            { question: "a)", attendu: ["3x^2", "f'(x) = 3x^2"] },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) La dérivée de $x^3$ est $3x^2$ : l'exposant descend devant et baisse de 1.\nb) $f'(2) = 3 \\times 2^2 = 3 \\times 4 = 12$.\n⛔ Le piège au a) : écrire $3x^3$, en gardant l'exposant. Il doit baisser d'un rang.\nRéponse : a) $3x^2$ ; b) 12.",
          micros: ["der_f_cube"],
        },
        {
          enonce: "Soit $f(x) = 5x^2$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["10x", "f'(x) = 10x"] }],
          correction:
            "Le nombre 5 reste devant, et $x^2$ devient $2x$.\n$f'(x) = 5 \\times 2x = 10x$.\n⛔ Le piège : écrire $5x$, en oubliant de multiplier par le 2 de la formule.\nRéponse : $10x$.",
          micros: ["der_f_carre", "der_f_kf"],
        },
        {
          enonce: "Soit $f(x) = -2x^3$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["-6x^2", "f'(x) = -6x^2"] }],
          correction:
            "Le nombre $-2$ reste devant, et $x^3$ devient $3x^2$.\n$f'(x) = -2 \\times 3x^2 = -6x^2$.\n⛔ Le piège : perdre le signe moins. Le nombre devant garde son signe.\nRéponse : $-6x^2$.",
          micros: ["der_f_cube", "der_f_kf"],
        },
        {
          enonce: "Soit $f(x) = 4x + 7$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["4", "f'(x) = 4"] }],
          correction:
            "On dérive terme à terme.\nLa dérivée de $4x$ est 4. La dérivée de 7 est 0.\n$f'(x) = 4 + 0 = 4$.\n⛔ Le piège : écrire $4 + 7 = 11$. Un nombre seul a pour dérivée 0.\nRéponse : 4.",
          micros: ["der_f_somme"],
        },
        {
          enonce: "Vrai ou faux ? La dérivée de $6x^2$ est $6x$. Réponds vrai ou faux.",
          reponses: [{ attendu: "faux" }],
          correction:
            "La dérivée de $x^2$ est $2x$, avec le 2.\nDonc la dérivée de $6x^2$ est $6 \\times 2x = 12x$.\n⛔ Le piège : enlever le carré sans faire descendre le 2 devant.\nRéponse : faux.",
          micros: ["der_f_carre"],
        },
        {
          enonce: "Soit $f(x) = x^2 + 3x$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["2x + 3", "f'(x) = 2x + 3"] }],
          correction:
            "On dérive chaque terme : $x^2$ donne $2x$, et $3x$ donne 3.\n$f'(x) = 2x + 3$.\n⛔ Le piège : écrire $2x + 3x$. La dérivée de $3x$ est 3, sans $x$.\nRéponse : $2x + 3$.",
          micros: ["der_f_somme"],
        },
        {
          enonce: "Soit $f(x) = x^3 + x^2$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: ["3x^2 + 2x", "f'(x) = 3x^2 + 2x"] }],
          correction:
            "$x^3$ donne $3x^2$, et $x^2$ donne $2x$.\n$f'(x) = 3x^2 + 2x$.\n⛔ Le piège : additionner les exposants et écrire $x^5$. On dérive chaque terme à part.\nRéponse : $3x^2 + 2x$.",
          micros: ["der_f_cube", "der_f_somme"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on dérive, on remplace, on dit ce que le nombre veut dire.",
      rappel: [
        "Si $d(t)$ est une distance, la vitesse à l'instant $t$ est $d'(t)$.",
        "Une petite variation : si $x$ augmente d'un petit écart, $f$ augmente d'environ $f'(a) \\times$ écart.",
        "Avec une parenthèse : $k(x^2 + \\dots)$ a pour dérivée $k$ fois la dérivée de la parenthèse.",
        "Pour trouver où $f'(x)$ vaut un nombre donné, on résout l'équation.",
      ],
      exercices: [
        {
          enonce:
            "Une monitrice de skate observe une élève qui descend une rampe. La distance parcourue est $d(t) = 0{,}8t^2$, en mètres, où $t$ est le temps en secondes (modèle).\na) Donne l'expression de $d'(t)$.\nb) Quelle est la vitesse de l'élève à $t = 5$ ?",
          reponses: [
            { question: "a)", attendu: ["1,6t", "d'(t) = 1,6t"] },
            { question: "b)", attendu: "8 m/s" },
          ],
          correction:
            "a) $d'(t) = 0{,}8 \\times 2t = 1{,}6t$.\nb) $d'(5) = 1{,}6 \\times 5 = 8$ m/s.\n⛔ Le piège au b) : calculer $d(5) = 20$ et répondre 20. Ce nombre est une distance, pas une vitesse.\nRéponse : a) $1{,}6t$ ; b) 8 m/s.",
          micros: ["der_f_carre", "der_f_kf"],
        },
        {
          enonce:
            "Une carreleuse pose un carré de côté $x$ dm, d'aire $A(x) = x^2$. Le côté vaut d'abord 10 dm.\na) Donne l'expression de $A'(x)$.\nb) Calcule $A'(10)$.\nc) Le côté passe à $10{,}2$ dm. Grâce au nombre dérivé, de combien l'aire augmente-t-elle environ ?\nd) Calcule l'augmentation exacte.",
          reponses: [
            { question: "a)", attendu: ["2x", "A'(x) = 2x"] },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "4,04" },
          ],
          correction:
            "a) $A'(x) = 2x$.\nb) $A'(10) = 20$.\nc) L'écart vaut $0{,}2$ : $20 \\times 0{,}2 = 4$ dm².\nd) $10{,}2^2 = 104{,}04$, donc $104{,}04 - 100 = 4{,}04$ dm².\nL'estimation est très proche.\n⛔ Le piège au c) : répondre 20. Ce nombre vaut pour 1 dm de plus, et le côté n'augmente que de $0{,}2$ dm.\nRéponse : a) $2x$ ; b) 20 ; c) 4 ; d) 4,04.",
          micros: ["der_f_carre"],
        },
        {
          enonce:
            "Un vendeur d'aquariums étudie un bac cubique de côté $x$ dm, de volume $V(x) = x^3$ (en litres).\na) Donne l'expression de $V'(x)$.\nb) Calcule $V'(5)$.\nc) Le côté passe de 5 à $5{,}1$ dm. De combien de litres le volume augmente-t-il environ ?",
          reponses: [
            { question: "a)", attendu: ["3x^2", "V'(x) = 3x^2"] },
            { question: "b)", attendu: "75" },
            { question: "c)", attendu: "7,5", unite: "L" },
          ],
          correction:
            "a) $V'(x) = 3x^2$.\nb) $V'(5) = 3 \\times 25 = 75$.\nc) L'écart vaut $0{,}1$ : $75 \\times 0{,}1 = 7{,}5$ litres.\n⛔ Le piège au b) : calculer $(3 \\times 5)^2 = 225$. Le carré porte sur 5 seulement.\nRéponse : a) $3x^2$ ; b) 75 ; c) 7,5.",
          micros: ["der_f_cube"],
        },
        {
          enonce:
            "Un éditeur de jeux de société estime sa recette à $R(x) = 2x^3$, en centaines d'euros, où $x$ est le nombre de boîtes vendues, en centaines (modèle).\na) Donne l'expression de $R'(x)$.\nb) Calcule $R'(2)$.\nc) Pour quelle valeur positive de $x$ a-t-on $R'(x) = 150$ ?",
          reponses: [
            { question: "a)", attendu: ["6x^2", "R'(x) = 6x^2"] },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) $R'(x) = 2 \\times 3x^2 = 6x^2$.\nb) $R'(2) = 6 \\times 4 = 24$.\nc) $6x^2 = 150$, donc $x^2 = 25$, donc $x = 5$, car $x$ est positif.\n⛔ Le piège au c) : s'arrêter à 25. On cherche $x$, pas $x^2$.\nRéponse : a) $6x^2$ ; b) 24 ; c) 5.",
          micros: ["der_f_cube", "der_f_kf"],
        },
        {
          enonce:
            "Tom dérive $f(x) = -x^2 + 8x + 5$ et écrit sur sa copie : $f'(x) = -2x + 8 + 5$.\na) Donne l'expression juste de $f'(x)$.\nb) Calcule le vrai nombre $f'(2)$.\nc) Quelle valeur Tom trouve-t-il pour $f'(2)$, avec sa formule ?",
          reponses: [
            { question: "a)", attendu: ["-2x + 8", "f'(x) = -2x + 8"] },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "9" },
          ],
          correction:
            "a) Le 5 est un nombre seul : sa dérivée est 0. Donc $f'(x) = -2x + 8$.\nb) $f'(2) = -4 + 8 = 4$.\nc) Avec sa formule : $-4 + 8 + 5 = 9$.\n⛔ Le piège : garder la constante. C'est l'erreur la plus fréquente, et elle fausse tous les calculs qui suivent.\nRéponse : a) $-2x + 8$ ; b) 4 ; c) 9.",
          micros: ["der_f_somme"],
        },
        {
          enonce:
            "Un graphiste a tracé la parabole d'équation $y = -0{,}5x^2$ et sa tangente orange au point A d'abscisse 3.\na) Donne l'expression de la dérivée de $-0{,}5x^2$.\nb) Calcule le coefficient directeur de la tangente en A.",
          figure: repere([-3, 4, -6, 3], [{ q: [-0.5, 0, 0] }, { q: [0, -3, 4.5], couleur: ORANGE }], [{ x: 3, y: -4.5, label: "A" }]),
          reponses: [
            { question: "a)", attendu: ["-x", "f'(x) = -x"] },
            { question: "b)", attendu: "-3" },
          ],
          correction:
            "a) $-0{,}5 \\times 2x = -x$.\nb) On remplace $x$ par 3 : $-3$.\nSur le dessin : de l'abscisse 2 à l'abscisse 3, la tangente descend de 3. ✔\n⛔ Le piège au b) : calculer $-0{,}5 \\times 3^2 = -4{,}5$. Ce nombre est l'ORDONNÉE de A : on remplace dans la dérivée, pas dans la fonction.\nRéponse : a) $-x$ ; b) $-3$.",
          micros: ["der_f_carre", "der_f_kf"],
        },
        {
          enonce:
            "Une responsable RH modélise la masse salariale d'une entreprise par $S(t) = 3(t^2 - 2t + 5)$, en milliers d'euros, où $t$ est le temps en mois.\na) Donne l'expression de $S'(t)$.\nb) Calcule $S'(2)$.",
          reponses: [
            { question: "a)", attendu: ["6t - 6", "S'(t) = 6t - 6"] },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) Le 3 reste devant, et on dérive la parenthèse : $t^2 - 2t + 5$ donne $2t - 2$.\n$S'(t) = 3(2t - 2) = 6t - 6$.\nb) $S'(2) = 12 - 6 = 6$.\n⛔ Le piège au a) : multiplier seulement le premier terme et écrire $6t - 2$. Le 3 porte sur toute la parenthèse.\nRéponse : a) $6t - 6$ ; b) 6.",
          micros: ["der_f_kf", "der_f_somme"],
        },
        {
          enonce:
            "Un technicien suit la hauteur d'eau d'un barrage : $R(t) = 2t^2 + 1$, en mètres, où $t$ est le temps en jours (modèle).\na) Donne l'expression de $R'(t)$.\nb) À quel instant la tangente à la courbe a-t-elle pour coefficient directeur 12 ?\nc) Quelle est la hauteur d'eau à cet instant ?",
          reponses: [
            { question: "a)", attendu: ["4t", "R'(t) = 4t"] },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "19" },
          ],
          correction:
            "a) $R'(t) = 2 \\times 2t + 0 = 4t$.\nb) $4t = 12$, donc $t = 3$.\nc) $R(3) = 2 \\times 9 + 1 = 19$ m.\n⛔ Le piège au b) : résoudre $2t^2 + 1 = 12$. Le coefficient directeur se lit sur la dérivée.\nRéponse : a) $4t$ ; b) 3 ; c) 19.",
          micros: ["der_f_carre", "der_f_kf", "der_f_somme"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : dériver, calculer, comparer, conclure dans le contexte.",
      rappel: [
        "On revient toujours à la question posée : une valeur de $f$, ou une valeur de $f'$ ?",
        "Pour comparer deux rythmes, on compare les deux dérivées au même instant.",
        "Pour savoir quelle fonction a une dérivée donnée, on dérive chaque candidate et on compare.",
      ],
      exercices: [
        {
          titre: "La pierre dans le puits",
          enonce:
            "Une spéléologue lâche une pierre dans un puits. Sa hauteur au-dessus du fond est $h(t) = 20 - 5t^2$, en mètres, où $t$ est le temps en secondes (modèle).\na) Donne l'expression de $h'(t)$.\nb) Calcule $h'(1)$.\nc) Au bout de combien de secondes la pierre atteint-elle le fond ?\nd) Calcule $h'$ à cet instant.\ne) Convertis cette vitesse en km/h, sans le signe. On rappelle que 1 m/s vaut $3{,}6$ km/h.",
          reponses: [
            { question: "a)", attendu: ["-10t", "h'(t) = -10t"] },
            { question: "b)", attendu: "-10" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "-20" },
            { question: "e)", attendu: "72 km/h" },
          ],
          correction:
            "a) 20 disparaît, et $-5t^2$ donne $-10t$ : $h'(t) = -10t$.\nb) $h'(1) = -10$ : la pierre descend à 10 m/s.\nc) Au fond, $h(t) = 0$ : $5t^2 = 20$, donc $t^2 = 4$, donc $t = 2$ s.\nd) $h'(2) = -20$ : elle descend à 20 m/s.\ne) $20 \\times 3{,}6 = 72$ km/h.\n⛔ Le piège au c) : résoudre $h'(t) = 0$. Le fond, c'est une hauteur nulle, pas une vitesse nulle.\nRéponse : a) $-10t$ ; b) $-10$ ; c) 2 ; d) $-20$ ; e) 72 km/h.",
          micros: ["der_f_carre", "der_f_kf"],
        },
        {
          titre: "Deux podcasts",
          enonce:
            "Une productrice compare deux podcasts. Leurs abonnés, en centaines, sont $A(x) = 3x^2$ et $B(x) = x^3$, où $x$ est le temps en mois (modèle).\na) Donne l'expression de $A'(x)$.\nb) Donne l'expression de $B'(x)$.\nc) Calcule $A'(3)$ et $B'(3)$. Donne les deux nombres dans cet ordre.\nd) Calcule $A'(2)$ et $B'(2)$. Donne les deux nombres dans cet ordre.\ne) Au mois 3, quel podcast gagne des abonnés le plus vite ? Réponds A ou B.",
          reponses: [
            { question: "a)", attendu: ["6x", "A'(x) = 6x"] },
            { question: "b)", attendu: ["3x^2", "B'(x) = 3x^2"] },
            { question: "c)", attendu: "18 ; 27", ordre: true },
            { question: "d)", attendu: "12 ; 12", ordre: true },
            { question: "e)", attendu: "B" },
          ],
          correction:
            "a) $A'(x) = 3 \\times 2x = 6x$.\nb) $B'(x) = 3x^2$.\nc) $A'(3) = 18$ et $B'(3) = 3 \\times 9 = 27$.\nd) $A'(2) = 12$ et $B'(2) = 3 \\times 4 = 12$ : au mois 2, les deux rythmes sont égaux.\ne) $27$ est plus grand que $18$ : au mois 3, c'est B.\nPourtant, les abonnés sont à égalité : $A(3) = 27$ et $B(3) = 27$.\n⛔ Le piège au e) : comparer $A(3)$ et $B(3)$. La vitesse se lit sur les dérivées.\nRéponse : a) $6x$ ; b) $3x^2$ ; c) 18 ; 27 ; d) 12 ; 12 ; e) B.",
          micros: ["der_f_carre", "der_f_cube", "der_f_kf"],
        },
        {
          titre: "Le four de la potière",
          enonce:
            "Une potière modélise la température de son four par $T(t) = t^3 - 6t^2 + 9t + 4$, en centaines de degrés, où $t$ est le temps en heures (modèle).\na) Donne l'expression de $T'(t)$.\nb) Calcule $T'(0)$.\nc) Calcule $T'(2)$.\nd) Calcule $T'(1)$ et $T'(3)$. Donne les deux nombres dans cet ordre.\ne) À $t = 2$, la température monte-t-elle ou descend-elle ? Réponds monte ou descend.",
          reponses: [
            { question: "a)", attendu: ["3t^2 - 12t + 9", "T'(t) = 3t^2 - 12t + 9"] },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "-3" },
            { question: "d)", attendu: "0 ; 0", ordre: true },
            { question: "e)", attendu: "descend" },
          ],
          correction:
            "a) On dérive terme à terme : $3t^2 - 6 \\times 2t + 9 + 0 = 3t^2 - 12t + 9$.\nb) $T'(0) = 9$.\nc) $T'(2) = 12 - 24 + 9 = -3$.\nd) $T'(1) = 3 - 12 + 9 = 0$ et $T'(3) = 27 - 36 + 9 = 0$ : la tangente est horizontale en ces deux instants.\ne) $T'(2)$ est négatif : la température descend.\n⛔ Le piège au a) : écrire $-6t$ pour la dérivée de $-6t^2$. Le 2 de la formule multiplie : $-12t$.\nRéponse : a) $3t^2 - 12t + 9$ ; b) 9 ; c) $-3$ ; d) 0 ; 0 ; e) descend.",
          micros: ["der_f_cube", "der_f_somme"],
        },
        {
          titre: "Le coût de la chaise",
          enonce:
            "Une menuisière sait que son coût marginal vaut $4x$, en euros, pour $x$ chaises. Elle hésite entre trois expressions du coût : $P(x) = 8x^2$, $Q(x) = 2x^2$ et $R(x) = 4x^2$.\na) Donne l'expression de $P'(x)$.\nb) Donne l'expression de $Q'(x)$.\nc) Donne l'expression de $R'(x)$.\nd) Laquelle a pour dérivée $4x$ ? Réponds P, Q ou R.\ne) Que vaut le coût marginal pour 10 chaises ?\nf) Que vaut le coût lui-même pour 10 chaises, avec la bonne expression ?",
          reponses: [
            { question: "a)", attendu: ["16x", "P'(x) = 16x"] },
            { question: "b)", attendu: ["4x", "Q'(x) = 4x"] },
            { question: "c)", attendu: ["8x", "R'(x) = 8x"] },
            { question: "d)", attendu: "Q" },
            { question: "e)", attendu: "40" },
            { question: "f)", attendu: "200" },
          ],
          correction:
            "On dérive chaque candidate.\na) $P'(x) = 8 \\times 2x = 16x$.\nb) $Q'(x) = 2 \\times 2x = 4x$.\nc) $R'(x) = 4 \\times 2x = 8x$.\nd) C'est $Q$ : le coût est $Q(x) = 2x^2$.\ne) $4 \\times 10 = 40$ €.\nf) $Q(10) = 2 \\times 100 = 200$ €.\n⛔ Le piège au d) : choisir $R$ parce que le 4 ressemble. Il faut dériver pour vérifier.\nRéponse : a) $16x$ ; b) $4x$ ; c) $8x$ ; d) Q ; e) 40 ; f) 200.",
          micros: ["der_f_carre", "der_f_kf"],
        },
      ],
    },
  ],
};
