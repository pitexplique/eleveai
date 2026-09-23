// ─── Fiche d'exercices : droites du plan (seconde) ───────────────────────────
//
// Cinquième feuille du 23/09/2026, la première d'une notion SANS fiche de cours
// (Frédéric : « on fait toutes les fiches d'exercices d'abord »). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/droites-plan.bank.ts`
// (notionId droites_plan). Le rappel avant chaque niveau porte donc tout le
// cours utile : équation réduite, droite verticale, équation cartésienne,
// vecteur directeur, parallélisme, système.
// ⛔ Rien n'est repris de la feuille des fonctions affines (Fahrenheit, l'eau
// qui bout, l'orage, la facture, les vélos) ni de celle des vecteurs.
//
// ⭐ LE FIL : une droite a DEUX écritures. L'équation réduite y = mx + p se lit
// sur le dessin (p en ordonnée à l'origine, m en avançant de 1) mais rate les
// droites verticales ; l'équation cartésienne ax + by + c = 0 les attrape
// toutes, et donne un vecteur directeur (−b ; a) d'un coup d'œil.
// ⛔ LES PIÈGES : x = 2 n'est pas une fonction (exercice 3) ; deux droites de
// même coefficient directeur sont parallèles, mais peut-être CONFONDUES
// (exercices 7, 15) ; un système peut n'avoir aucune solution (exercice 15).
// ⭐ UN CANVAS PAR CORRIGÉ (Frédéric, 23/09 : « les élèves adorent, comme pour
// statistiques ») : chaque droite est dessinée depuis SON équation (`droites()`),
// verticales comprises.
//
// ⭐ LE MONDE : deux randonneurs qui se rencontrent sur un sentier, la billetterie
// d'un concert, le point d'équilibre d'un triangle de carton (centre de gravité),
// un bateau, un rocher et la côte.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-droites.mjs`.
//
// Micro-compétences : droite_pente_ordonne (1, 6), droite_vecteur_directeur (4,
// 9, 10, 19, 20), droite_equation_reduite (1, 2, 3, 11, 17), droite_equation_
// cartesienne (3, 5, 6, 9, 10, 12, 16, 19, 20), droite_parallelisme (7, 11, 12,
// 15), droite_intersection (8, 15, 16, 17, 19, 20), droite_systeme (13 à 20).
// 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, droites, repere, tableau } from "@/lib/fiches-exercices/figures";

const VERT = "#059669";

export const exercicesDroitesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "droites-plan",
  titre: "Les droites du plan",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une droite, écrire son équation réduite ou cartésienne, trouver un vecteur directeur, reconnaître des droites parallèles, calculer un point d'intersection, résoudre un système. Deux randonneurs qui se croisent, la billetterie d'un concert, le point d'équilibre d'un triangle, un bateau qui doit éviter un rocher. Chaque corrigé dessine ses droites. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lire, calculer, reconnaître.",
      rappel: [
        "Une droite non verticale a une équation RÉDUITE $y = mx + p$ : $p$ est l'ordonnée à l'origine, $m$ le coefficient directeur (quand $x$ avance de $1$, $y$ varie de $m$).",
        "Par deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$. Si $x_A = x_B$, la droite est VERTICALE : son équation est $x = x_A$.",
        "Toute droite a une équation CARTÉSIENNE $ax + by + c = 0$, et $\\vec{u}\\,(-b\\,;\\,a)$ en est un vecteur directeur.",
        "Deux droites d'équations réduites sont parallèles si elles ont le MÊME coefficient directeur.",
      ],
      exercices: [
        {
          enonce: "Lire l'équation réduite de chacune des deux droites : $d_1$ en bleu, $d_2$ en orange.",
          figure: droites([-3, 6], [{ a: 2, b: -1, c: -1 }, { a: 1, b: 2, c: -6, couleur: ORANGE }], [{ x: 1, y: 1, label: "A" }, { x: 3, y: 5, label: "B" }, { x: 0, y: 3, label: "C" }, { x: 4, y: 1, label: "D" }]),
          correction:
            "$d_1$ coupe l'axe des ordonnées en $-1$ : $p = -1$. De $A(1\\,;\\,1)$ à $B(3\\,;\\,5)$, on avance de $2$ et on monte de $4$ : $m = \\dfrac{4}{2} = 2$. Donc $d_1 : y = 2x - 1$.\n$d_2$ coupe l'axe des ordonnées en $C(0\\,;\\,3)$ : $p = 3$. De $C$ à $D(4\\,;\\,1)$, on avance de $4$ et on DESCEND de $2$ : $m = \\dfrac{-2}{4} = -0{,}5$. Donc $d_2 : y = -0{,}5x + 3$.\n⭐ Une droite qui monte a un coefficient positif, une droite qui descend un coefficient négatif.\n⛔ Le piège : lire $m$ sans diviser par l'avancée, et écrire $m = 4$ pour $d_1$.",
          schema: droites([-3, 6], [{ a: 2, b: -1, c: -1 }, { a: 1, b: 2, c: -6, couleur: ORANGE }], [{ x: 1, y: 1, label: "A" }, { x: 3, y: 5, label: "B" }, { x: 0, y: 3, label: "C" }, { x: 4, y: 1, label: "D" }], [{ de: [1, 1], vers: [3, 5], couleur: VERT }]),
          micros: ["droite_pente_ordonne", "droite_equation_reduite"],
        },
        {
          enonce: "Déterminer l'équation réduite de la droite $(AB)$, avec $A(1\\,;\\,4)$ et $B(3\\,;\\,-2)$.",
          correction:
            "Le coefficient directeur : $m = \\dfrac{-2 - 4}{3 - 1} = \\dfrac{-6}{2} = -3$.\nOn cherche $p$ avec le point $A$ : $4 = -3 \\times 1 + p$, donc $p = 7$.\nAinsi $(AB) : y = -3x + 7$.\n⭐ On vérifie avec $B$ : $-3 \\times 3 + 7 = -2$. ✓",
          schema: droites([-2, 6], [{ a: 3, b: 1, c: -7 }], [{ x: 1, y: 4, label: "A" }, { x: 3, y: -2, label: "B" }]),
          micros: ["droite_equation_reduite"],
        },
        {
          enonce: "a) Déterminer une équation de la droite $(AB)$, avec $A(2\\,;\\,-2)$ et $B(2\\,;\\,5)$.\nb) Même question pour $(CD)$, avec $C(-3\\,;\\,4)$ et $D(5\\,;\\,4)$.",
          correction:
            "a) $A$ et $B$ ont la même abscisse, $2$ : la droite est VERTICALE. Tous ses points ont pour abscisse $2$ : son équation est $x = 2$.\nElle n'a PAS d'équation réduite : le calcul de $m$ diviserait par $2 - 2 = 0$. Et ce n'est pas la courbe d'une fonction : à $x = 2$ correspondent une infinité de $y$.\nb) $C$ et $D$ ont la même ordonnée, $4$ : la droite est horizontale, $m = 0$, et son équation est $y = 4$.\n⛔ Le piège au a) : écrire $y = 2$. C'est l'ABSCISSE qui est fixe, pas l'ordonnée.",
          schema: droites([-4, 6], [{ a: 1, b: 0, c: -2 }, { a: 0, b: 1, c: -4, couleur: ORANGE }], [{ x: 2, y: -2, label: "A" }, { x: 2, y: 5, label: "B" }, { x: -3, y: 4, label: "C" }, { x: 5, y: 4, label: "D" }]),
          micros: ["droite_equation_reduite", "droite_equation_cartesienne"],
        },
        {
          enonce: "Donner un vecteur directeur de chaque droite :\na) $d_1 : y = 3x - 2$\nb) $d_2 : 2x - 5y + 1 = 0$\nc) $d_3 = (AB)$, avec $A(-3\\,;\\,3)$ et $B(3\\,;\\,0)$.",
          correction:
            "a) Quand $x$ avance de $1$, $y$ augmente de $3$ : $\\vec{u}\\,(1\\,;\\,3)$ dirige $d_1$.\nb) Pour $ax + by + c = 0$, le vecteur $(-b\\,;\\,a)$ convient : ici $a = 2$, $b = -5$, donc $\\vec{v}\\,(5\\,;\\,2)$.\nc) Deux points de la droite donnent un vecteur directeur : $\\vec{AB}\\,(6\\,;\\,-3)$.\n⭐ Un vecteur directeur n'est pas unique : $(2\\,;\\,-1)$, deux fois plus court, dirige aussi $d_3$.\n⛔ Le piège au b) : prendre $(a\\,;\\,b) = (2\\,;\\,-5)$. On ÉCHANGE et on change un signe : $(-b\\,;\\,a)$.",
          schema: droites([-4, 5], [{ a: 3, b: -1, c: -2 }, { a: 1, b: 2, c: -3, couleur: ORANGE }], [{ x: -3, y: 3, label: "A" }, { x: 3, y: 0, label: "B" }], [{ de: [0, -2], vers: [1, 1], couleur: VERT }, { de: [-3, 3], vers: [3, 0], couleur: VERT }]),
          micros: ["droite_vecteur_directeur"],
        },
        {
          enonce: "Soit $d$ la droite d'équation $3x - 2y - 4 = 0$.\na) Le point $A(2\\,;\\,1)$ est-il sur $d$ ? Et le point $B(0\\,;\\,2)$ ?\nb) Le point $C$ de $d$ a pour abscisse $4$. Calculer son ordonnée.",
          correction:
            "a) On remplace $x$ et $y$ par les coordonnées du point : le point est sur $d$ si l'on obtient $0$.\n$A$ : $3 \\times 2 - 2 \\times 1 - 4 = 0$ : $A$ est sur $d$.\n$B$ : $3 \\times 0 - 2 \\times 2 - 4 = -8$ : $B$ n'est PAS sur $d$.\nb) $3 \\times 4 - 2y - 4 = 0$, soit $8 - 2y = 0$, donc $y = 4$. Ainsi $C(4\\,;\\,4)$.\n⛔ Le piège au a) : conclure « $B$ est sur $d$ » parce qu'on a trouvé un nombre. Il faut trouver EXACTEMENT $0$.",
          schema: droites([-2, 6], [{ a: 3, b: -2, c: -4 }], [{ x: 2, y: 1, label: "A" }, { x: 0, y: 2, label: "B" }, { x: 4, y: 4, label: "C" }]),
          micros: ["droite_equation_cartesienne"],
        },
        {
          enonce: "Soit $d$ la droite d'équation $4x + 2y - 6 = 0$. Déterminer son équation réduite, puis donner son coefficient directeur et son ordonnée à l'origine.",
          correction:
            "On isole $y$ : $2y = -4x + 6$, puis on divise par $2$ : $y = -2x + 3$.\nLe coefficient directeur est $m = -2$ (la droite descend), l'ordonnée à l'origine $p = 3$.\n⭐ Vérification sur le dessin : la droite coupe l'axe des ordonnées en $3$, et descend de $2$ quand on avance de $1$.\n⛔ Le piège : oublier de diviser le $6$ par $2$, et écrire $y = -2x + 6$.",
          schema: droites([-2, 5], [{ a: 4, b: 2, c: -6 }], [{ x: 0, y: 3, label: "P" }], [{ de: [0, 3], vers: [1, 1], couleur: VERT }]),
          micros: ["droite_equation_cartesienne", "droite_pente_ordonne"],
        },
        {
          enonce: "Parmi ces quatre droites, lesquelles sont parallèles ?\n$d_1 : y = 2x + 1$  $d_2 : y = -2x + 1$  $d_3 : y = 2x - 5$  $d_4 : 4x - 2y + 3 = 0$",
          correction:
            "On compare les coefficients directeurs, donc on met d'abord $d_4$ sous forme réduite : $-2y = -4x - 3$, soit $y = 2x + 1{,}5$.\nCoefficients : $d_1$ : $2$ ; $d_2$ : $-2$ ; $d_3$ : $2$ ; $d_4$ : $2$.\n$d_1$, $d_3$ et $d_4$ ont le même coefficient $2$ : elles sont parallèles (et distinctes, car leurs ordonnées à l'origine diffèrent). $d_2$ coupe les trois autres.\n⛔ Le piège : croire $d_1$ et $d_2$ parallèles parce qu'elles ont la même ordonnée à l'origine. Elles se COUPENT, justement en $(0\\,;\\,1)$.",
          schema: droites([-4, 4], [{ a: 2, b: -1, c: 1 }, { a: 2, b: 1, c: -1, couleur: ORANGE }, { a: 2, b: -1, c: -5 }, { a: 4, b: -2, c: 3, couleur: VERT }]),
          micros: ["droite_parallelisme"],
        },
        {
          enonce: "Calculer les coordonnées du point d'intersection des droites $d_1 : y = x + 1$ et $d_2 : y = -2x + 7$.",
          correction:
            "Le point d'intersection est sur les deux droites : ses coordonnées vérifient les deux équations. Son $y$ est donc le même : $x + 1 = -2x + 7$.\n$3x = 6$, donc $x = 2$. Puis $y = 2 + 1 = 3$.\nLe point d'intersection est $I(2\\,;\\,3)$.\n⭐ On vérifie avec $d_2$ : $-2 \\times 2 + 7 = 3$. ✓",
          schema: droites([-2, 6], [{ a: 1, b: -1, c: 1 }, { a: 2, b: 1, c: -7, couleur: ORANGE }], [{ x: 2, y: 3, label: "I" }]),
          micros: ["droite_intersection"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : équation par un point et un vecteur, parallèle, système.",
      rappel: [
        "Par un point $A$ et un vecteur directeur $\\vec{u}$ : $M(x\\,;\\,y)$ est sur la droite si $\\vec{AM}$ et $\\vec{u}$ sont colinéaires, c'est-à-dire si leur déterminant est nul.",
        "Deux droites $ax + by + c = 0$ et $a'x + b'y + c' = 0$ sont parallèles si $ab' - ba' = 0$.",
        "Un système de deux équations à deux inconnues se résout par SUBSTITUTION (on isole une inconnue) ou par COMBINAISON (on ajoute les équations pour en éliminer une).",
      ],
      exercices: [
        {
          enonce: "Déterminer une équation cartésienne de la droite $d$ passant par $A(1\\,;\\,-2)$ et de vecteur directeur $\\vec{u}\\,(3\\,;\\,1)$.",
          correction:
            "Un point $M(x\\,;\\,y)$ est sur $d$ si $\\vec{AM}\\,(x - 1\\,;\\,y + 2)$ et $\\vec{u}\\,(3\\,;\\,1)$ sont colinéaires :\n$(x - 1) \\times 1 - (y + 2) \\times 3 = 0$, soit $x - 1 - 3y - 6 = 0$.\nDonc $d : x - 3y - 7 = 0$.\n⭐ On vérifie avec $A$ : $1 - 3 \\times (-2) - 7 = 1 + 6 - 7 = 0$. ✓ Et $(-b\\,;\\,a) = (3\\,;\\,1)$ redonne bien $\\vec{u}$.\n⛔ Le piège : écrire $\\vec{AM}\\,(x + 1\\,;\\,y - 2)$. C'est l'arrivée MOINS le départ : $x - x_A$, $y - y_A$.",
          schema: droites([-3, 6], [{ a: 1, b: -3, c: -7 }], [{ x: 1, y: -2, label: "A" }], [{ de: [1, -2], vers: [4, -1], couleur: VERT }]),
          micros: ["droite_equation_cartesienne", "droite_vecteur_directeur"],
        },
        {
          enonce: "Déterminer une équation cartésienne de la droite $(AB)$, avec $A(-2\\,;\\,3)$ et $B(7\\,;\\,-3)$.",
          correction:
            "Un vecteur directeur : $\\vec{AB}\\,(9\\,;\\,-6)$.\n$M(x\\,;\\,y)$ est sur $(AB)$ si $\\vec{AM}\\,(x + 2\\,;\\,y - 3)$ et $\\vec{AB}$ sont colinéaires : $(x + 2) \\times (-6) - (y - 3) \\times 9 = 0$.\nOn développe : $-6x - 12 - 9y + 27 = 0$, soit $-6x - 9y + 15 = 0$. On divise par $-3$ : $2x + 3y - 5 = 0$.\n⭐ On vérifie avec $B$ : $2 \\times 7 + 3 \\times (-3) - 5 = 14 - 9 - 5 = 0$. ✓\n⭐ Diviser par $-3$ est permis : une équation cartésienne n'est pas unique, on choisit la plus simple.",
          schema: droites([-4, 8], [{ a: 2, b: 3, c: -5 }], [{ x: -2, y: 3, label: "A" }, { x: 7, y: -3, label: "B" }], [{ de: [-2, 3], vers: [7, -3], couleur: VERT }]),
          micros: ["droite_equation_cartesienne", "droite_vecteur_directeur"],
        },
        {
          enonce: "Soit $d : y = -3x + 5$. Déterminer l'équation réduite de la droite $d'$ parallèle à $d$ passant par $A(2\\,;\\,4)$.",
          correction:
            "Parallèle à $d$ : même coefficient directeur, donc $d' : y = -3x + p$.\n$A$ est sur $d'$ : $4 = -3 \\times 2 + p$, donc $p = 10$.\nAinsi $d' : y = -3x + 10$.\n⭐ $A$ n'est pas sur $d$ ($-3 \\times 2 + 5 = -1 \\neq 4$) : $d$ et $d'$ sont bien deux droites distinctes.\n⛔ Le piège : garder aussi le $5$ de $d$. Seule la PENTE est commune.",
          schema: droites([-1, 7], [{ a: 3, b: 1, c: -5 }, { a: 3, b: 1, c: -10, couleur: ORANGE }], [{ x: 2, y: 4, label: "A" }]),
          micros: ["droite_parallelisme", "droite_equation_reduite"],
        },
        {
          enonce: "Soit $d : 2x - y + 3 = 0$. Déterminer une équation cartésienne de la droite $d'$ parallèle à $d$ passant par $B(-2\\,;\\,2)$.",
          correction:
            "Deux droites parallèles ont des vecteurs directeurs colinéaires : on peut garder les mêmes $a$ et $b$. Donc $d' : 2x - y + c = 0$.\n$B$ est sur $d'$ : $2 \\times (-2) - 2 + c = 0$, soit $-6 + c = 0$, donc $c = 6$.\nAinsi $d' : 2x - y + 6 = 0$.\n⭐ Même vecteur directeur $(1\\,;\\,2)$ pour les deux : les droites montent pareil.",
          schema: droites([-5, 4], [{ a: 2, b: -1, c: 3 }, { a: 2, b: -1, c: 6, couleur: ORANGE }], [{ x: -2, y: 2, label: "B" }]),
          micros: ["droite_parallelisme", "droite_equation_cartesienne"],
        },
        {
          enonce: "Résoudre le système $\\begin{cases} 2x + y = 7 \\\\ x - y = -1 \\end{cases}$, puis interpréter la solution avec deux droites.",
          correction:
            "Par COMBINAISON : on ajoute les deux équations, les $y$ s'éliminent : $3x = 6$, donc $x = 2$.\nDans la seconde : $2 - y = -1$, donc $y = 3$.\nLa solution est le couple $(2\\,;\\,3)$.\n⭐ On vérifie : $2 \\times 2 + 3 = 7$ ✓ et $2 - 3 = -1$ ✓.\n⭐ Chaque équation est celle d'une droite ; le couple solution est leur POINT D'INTERSECTION.",
          schema: droites([-2, 6], [{ a: 2, b: 1, c: -7 }, { a: 1, b: -1, c: 1, couleur: ORANGE }], [{ x: 2, y: 3, label: "S" }]),
          micros: ["droite_systeme"],
        },
        {
          enonce: "Résoudre le système $\\begin{cases} 3x + 2y = 12 \\\\ 5x - 4y = 20 \\end{cases}$.",
          correction:
            "On multiplie la première équation par $2$ pour que les $y$ s'éliminent : $6x + 4y = 24$.\nOn ajoute la seconde : $6x + 4y + 5x - 4y = 24 + 20$, soit $11x = 44$, donc $x = 4$.\nDans la première : $12 + 2y = 12$, donc $y = 0$.\nLa solution est $(4\\,;\\,0)$ : les deux droites se coupent sur l'axe des abscisses.\n⭐ On vérifie : $5 \\times 4 - 4 \\times 0 = 20$. ✓\n⛔ Le piège : multiplier seulement le membre de gauche par $2$, et garder $12$ à droite.",
          schema: droites([-2, 7], [{ a: 3, b: 2, c: -12 }, { a: 5, b: -4, c: -20, couleur: ORANGE }], [{ x: 4, y: 0, label: "S" }]),
          micros: ["droite_systeme"],
        },
        {
          enonce: "a) Combien de solutions le système $\\begin{cases} 2x - y = 3 \\\\ -4x + 2y = 1 \\end{cases}$ a-t-il ?\nb) Et le système $\\begin{cases} x + 2y = 4 \\\\ 3x + 6y = 12 \\end{cases}$ ?\nInterpréter à chaque fois avec deux droites.",
          correction:
            "a) On multiplie la première par $2$ : $4x - 2y = 6$. On ajoute la seconde : $0 = 7$, ce qui est IMPOSSIBLE. Le système n'a aucune solution.\nLes droites $y = 2x - 3$ et $y = 2x + 0{,}5$ ont le même coefficient $2$ : elles sont parallèles et distinctes, elles ne se coupent jamais.\nb) La seconde équation est la première multipliée par $3$ : c'est la MÊME droite. Tous ses points sont solutions : il y a une infinité de solutions.\n⭐ Deux droites se coupent en un point, ou pas du tout (parallèles), ou partout (confondues) : un système a une solution, aucune, ou une infinité.\n⭐ Le déterminant le dit d'avance : $2 \\times 2 - (-1) \\times (-4) = 4 - 4 = 0$ au a), et $1 \\times 6 - 2 \\times 3 = 0$ au b). Nul : les droites sont parallèles.",
          schema: (
            <div className="grid gap-2 sm:grid-cols-2 print:grid-cols-2 print:items-start">
              {droites([-3, 4], [{ a: 2, b: -1, c: -3 }, { a: -4, b: 2, c: -1, couleur: ORANGE }])}
              {droites([-2, 5], [{ a: 1, b: 2, c: -4, couleur: VERT }])}
            </div>
          ),
          micros: ["droite_systeme", "droite_parallelisme", "droite_intersection"],
        },
        {
          enonce: "Soit $d_1 : y = 2x - 1$ et $d_2 : x + 2y - 13 = 0$.\na) Calculer les coordonnées de leur point d'intersection $I$.\nb) Le point $C(5\\,;\\,4)$ est-il sur $d_2$ ?",
          correction:
            "a) Par SUBSTITUTION : dans l'équation de $d_2$, on remplace $y$ par $2x - 1$.\n$x + 2(2x - 1) - 13 = 0$, soit $5x - 15 = 0$, donc $x = 3$. Puis $y = 2 \\times 3 - 1 = 5$.\nDonc $I(3\\,;\\,5)$.\nb) $5 + 2 \\times 4 - 13 = 0$ : oui, $C$ est sur $d_2$.\n⭐ La substitution est la plus rapide dès qu'une équation donne déjà $y$ en fonction de $x$.\n⛔ Le piège au a) : oublier de multiplier le $-1$ par $2$, et écrire $x + 4x - 1 - 13$.",
          schema: droites([-1, 8], [{ a: 2, b: -1, c: -1 }, { a: 1, b: 2, c: -13, couleur: ORANGE }], [{ x: 3, y: 5, label: "I" }, { x: 5, y: 4, label: "C" }]),
          micros: ["droite_intersection", "droite_equation_cartesienne", "droite_systeme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on met en équations, on résout, on répond par une phrase.",
      rappel: [
        "Deux inconnues, deux informations : on écrit deux équations, puis on résout le système.",
        "Un point de rencontre, un seuil d'égalité, un croisement : c'est une INTERSECTION de droites.",
        "On vérifie toujours la solution dans l'énoncé, pas seulement dans les équations.",
      ],
      exercices: [
        {
          titre: "La rencontre sur le sentier",
          enonce: "Un sentier de $12$ km relie un refuge à un col. À $9$ h, Léo part du refuge vers le col à $4$ km/h ; au même moment, Inès part du col vers le refuge à $2$ km/h (elle descend avec un gros sac). On note $t$ le temps en heures depuis $9$ h, et $d$ la distance au refuge, en km.\na) Montrer que la position de Léo est $d = 4t$, et celle d'Inès $d = 12 - 2t$.\nb) À quelle heure et à quelle distance du refuge se croisent-ils ?\nc) Le dessin montre les deux droites : où lit-on la réponse ?",
          correction:
            "a) Léo part de $d = 0$ et gagne $4$ km par heure : $d = 4t$. Inès part de $d = 12$ et s'approche du refuge de $2$ km par heure : $d = 12 - 2t$.\nb) Ils se croisent quand ils sont au même endroit : $4t = 12 - 2t$, soit $6t = 12$, donc $t = 2$. Et $d = 4 \\times 2 = 8$.\nIls se croisent à $11$ h, à $8$ km du refuge (donc à $4$ km du col).\nc) C'est le point d'intersection des deux droites, $(2\\,;\\,8)$ : on lit l'heure sur l'axe du temps, la distance sur l'autre.\n⭐ On vérifie avec Inès : $12 - 2 \\times 2 = 8$. ✓\n⛔ Le piège au b) : répondre « $2$ h ». Ce n'est pas l'heure, c'est la DURÉE depuis le départ : il est $11$ h.",
          schema: repere([-1, 7, -1, 13], [{ q: [0, 4, 0] }, { q: [0, -2, 12], couleur: ORANGE }], [{ x: 2, y: 8 }]),
          micros: ["droite_intersection", "droite_systeme", "droite_equation_reduite"],
        },
        {
          titre: "La billetterie du concert",
          enonce: "Pour un concert, une place adulte coûte $15$ € et une place enfant $10$ €. On a vendu $250$ places, pour une recette de $3\\,250$ €. On note $x$ le nombre de places adultes et $y$ le nombre de places enfants.\na) Traduire l'énoncé par un système.\nb) Le résoudre. Combien de places de chaque sorte ont été vendues ?\nc) Quelle part de la recette vient des adultes ?",
          correction:
            "a) $\\begin{cases} x + y = 250 \\\\ 15x + 10y = 3\\,250 \\end{cases}$ : la première compte les places, la seconde les euros.\nb) De la première : $y = 250 - x$. On remplace : $15x + 10(250 - x) = 3\\,250$, soit $15x + 2\\,500 - 10x = 3\\,250$, donc $5x = 750$ et $x = 150$. Puis $y = 100$.\nOn a vendu $150$ places adultes et $100$ places enfants.\nc) Les adultes rapportent $150 \\times 15 = 2\\,250$ €, soit $\\dfrac{2\\,250}{3\\,250} \\approx 69$ % de la recette.\n⭐ On vérifie dans l'énoncé : $150 + 100 = 250$ places ✓ et $2\\,250 + 1\\,000 = 3\\,250$ € ✓.\n⛔ Le piège au a) : écrire $x + y = 3\\,250$. On ne mélange pas des places et des euros dans la même équation.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["", "Adultes", "Enfants", "Total"], ["Places", 150, 100, 250])}
              {diagramme("barres", [{ label: "Adultes", value: 2250 }, { label: "Enfants", value: 1000 }])}
            </div>
          ),
          micros: ["droite_systeme"],
        },
        {
          titre: "Le point d'équilibre du triangle",
          enonce: "On découpe un triangle de carton $ABC$, avec $A(1\\,;\\,6)$, $B(7\\,;\\,8)$ et $C(5\\,;\\,2)$ (unité : le cm). Il tient en équilibre sur la pointe d'un crayon en un seul point : son centre de gravité $G$, où se coupent les MÉDIANES (chaque médiane joint un sommet au milieu du côté opposé).\na) Calculer les coordonnées des milieux $I$ de $[BC]$ et $J$ de $[AC]$.\nb) Déterminer une équation cartésienne de la médiane $(AI)$, puis de la médiane $(BJ)$.\nc) Calculer les coordonnées de $G$, intersection de $(AI)$ et $(BJ)$.\nd) Comparer avec $\\left(\\dfrac{x_A + x_B + x_C}{3}\\,;\\,\\dfrac{y_A + y_B + y_C}{3}\\right)$.",
          correction:
            "a) $I\\left(\\dfrac{7 + 5}{2}\\,;\\,\\dfrac{8 + 2}{2}\\right)$, soit $I(6\\,;\\,5)$ ; $J\\left(\\dfrac{1 + 5}{2}\\,;\\,\\dfrac{6 + 2}{2}\\right)$, soit $J(3\\,;\\,4)$.\nb) $(AI)$ : $\\vec{AI}\\,(5\\,;\\,-1)$, et $(x - 1) \\times (-1) - (y - 6) \\times 5 = 0$, soit $-x + 1 - 5y + 30 = 0$ : $x + 5y - 31 = 0$.\n$(BJ)$ : $\\vec{BJ}\\,(-4\\,;\\,-4)$, colinéaire à $(1\\,;\\,1)$. $(x - 7) \\times 1 - (y - 8) \\times 1 = 0$ : $x - y + 1 = 0$.\nc) De la seconde : $x = y - 1$. Dans la première : $y - 1 + 5y - 31 = 0$, soit $6y = 32$, donc $y = \\dfrac{16}{3}$ et $x = \\dfrac{13}{3}$. Ainsi $G\\left(\\dfrac{13}{3}\\,;\\,\\dfrac{16}{3}\\right)$, environ $(4{,}33\\,;\\,5{,}33)$.\nd) $\\dfrac{1 + 7 + 5}{3} = \\dfrac{13}{3}$ et $\\dfrac{6 + 8 + 2}{3} = \\dfrac{16}{3}$ : c'est le même point. Le centre de gravité est la MOYENNE des trois sommets.\n⭐ La troisième médiane passe aussi par $G$ : les trois médianes d'un triangle sont CONCOURANTES.",
          schema: droites(
            [-1, 9],
            [{ a: 1, b: 5, c: -31, couleur: ORANGE }, { a: 1, b: -1, c: 1, couleur: VERT }],
            [{ x: 1, y: 6, label: "A" }, { x: 7, y: 8, label: "B" }, { x: 5, y: 2, label: "C" }, { x: 6, y: 5, label: "I" }, { x: 3, y: 4, label: "J" }, { x: 13 / 3, y: 16 / 3, label: "G" }],
            [
              { de: [1, 6], vers: [7, 8], pointe: false },
              { de: [7, 8], vers: [5, 2], pointe: false },
              { de: [5, 2], vers: [1, 6], pointe: false },
            ],
          ),
          micros: ["droite_equation_cartesienne", "droite_vecteur_directeur", "droite_intersection", "droite_systeme"],
        },
        {
          titre: "Le bateau et le rocher",
          enonce: "Sur une carte marine graduée en milles, un bateau part de $P(1\\,;\\,1)$ en suivant le cap $\\vec{u}\\,(3\\,;\\,2)$. La côte est la droite d'équation $x + y - 12 = 0$, et un rocher affleure en $R(4\\,;\\,3)$.\na) Déterminer une équation cartésienne de la trajectoire du bateau.\nb) En quel point touche-t-il la côte ? Montrer que c'est le port $Q(7\\,;\\,5)$.\nc) Le rocher est-il sur sa route ?\nd) Le capitaine passe d'abord par $S(4\\,;\\,1)$, puis vise le port. Déterminer une équation de $(SQ)$ et vérifier que le rocher est évité.",
          correction:
            "a) $M(x\\,;\\,y)$ est sur la trajectoire si $\\vec{PM}\\,(x - 1\\,;\\,y - 1)$ et $\\vec{u}\\,(3\\,;\\,2)$ sont colinéaires : $2(x - 1) - 3(y - 1) = 0$, soit $2x - 3y + 1 = 0$.\nb) On résout $\\begin{cases} 2x - 3y + 1 = 0 \\\\ x + y - 12 = 0 \\end{cases}$. De la seconde, $x = 12 - y$ ; dans la première : $24 - 2y - 3y + 1 = 0$, soit $5y = 25$, $y = 5$ et $x = 7$. C'est bien $Q(7\\,;\\,5)$.\nc) $2 \\times 4 - 3 \\times 3 + 1 = 0$ : le rocher est EXACTEMENT sur la route. Danger !\nd) $\\vec{SQ}\\,(3\\,;\\,4)$ : $4(x - 4) - 3(y - 1) = 0$, soit $4x - 3y - 13 = 0$. Pour $R$ : $4 \\times 4 - 3 \\times 3 - 13 = -6 \\neq 0$ : le rocher n'est plus sur la route.\n⭐ Le premier cap est tout droit mais passe sur le rocher ; le détour par $S$ l'évite.\n⛔ Le piège au c) : répondre « presque » en regardant la carte. Le calcul donne $0$ : le rocher est dessus, pas à côté.",
          schema: droites(
            [-1, 9],
            [{ a: 2, b: -3, c: 1 }, { a: 1, b: 1, c: -12, couleur: VERT }, { a: 4, b: -3, c: -13, couleur: ORANGE }],
            [{ x: 1, y: 1, label: "P" }, { x: 7, y: 5, label: "Q" }, { x: 4, y: 3, label: "R" }, { x: 4, y: 1, label: "S" }],
          ),
          micros: ["droite_vecteur_directeur", "droite_equation_cartesienne", "droite_intersection", "droite_systeme"],
        },
      ],
    },
  ],
};
