// ─── Fiche d'exercices : le second degré (1re spé) — 20 exercices corrigés ────
//
// Deuxième feuille du format (15/09/2026), après l'exponentielle. Alignée sur la
// fiche de cours `lib/fiches/maths-premiere-second-degre.tsx` et sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/second-degre.bank.ts`.
//
// ⭐ LE FIL, le même que la fiche de cours : Δ ne calcule rien, il DÉCIDE. Trois
// exercices sur vingt ont Δ < 0 ou Δ = 0 — le geste « je m'arrête » se travaille,
// il ne se récite pas. Et un trinôme sur quatre a a < 0 ou a ≠ 1, parce que
// « du signe de a sauf entre les racines » n'est pas « positif sauf entre ».
//
// ⛔ Aucun trinôme de la fiche de cours n'est repris : l'élève qui a lu le cours
// ne retrouve pas un corrigé déjà vu. Solutions entières (0,5 une fois, c'est le
// geste « je divise par 2a »), pièges sur la propriété.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-second-degre.mjs`.
//
// Micro-compétences : sd_discriminant (1-3, 20), sd_racines (4-6, 9), sd_forme_
// factorisee (7), sd_canonique (8, 13, 17, 18), sd_factorisation (10, 11),
// sd_somme_produit (11, 12), sd_deux_racines (12), sd_completion_carre (13),
// sd_signe (14), sd_inequation (15, 16, 18), sd_forme_adaptee (17-19). 11/11.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesSecondDegrePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "second-degre",
  titre: "Le second degré",
  accroche:
    "Vingt exercices, du discriminant seul au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/premiere-spe/second-degre",
      titre: "Le second degré",
    },
  ],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Un trinôme s'écrit $ax^2 + bx + c$ : on lit $a$, $b$, $c$ AVEC leurs signes.",
        "Le discriminant : $\\Delta = b^2 - 4ac$. On le calcule d'abord, on décide ensuite.",
        "$\\Delta > 0$ : deux solutions, $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$. $\\Delta = 0$ : une seule, $x = \\dfrac{-b}{2a}$. $\\Delta < 0$ : aucune, on s'arrête.",
        "Forme factorisée $a(x - x_1)(x - x_2)$ : on y lit les racines. Forme canonique $a(x - \\alpha)^2 + \\beta$ : on y lit le sommet $(\\alpha \\,;\\, \\beta)$.",
      ],
      exercices: [
        {
          enonce: "Donner $a$, $b$ et $c$ pour le trinôme $3x^2 - 5x + 2$.",
          correction:
            "On lit les coefficients avec leurs signes : $a = 3$, $b = -5$, $c = 2$.\n⛔ Le piège : écrire $b = 5$. Le signe moins fait partie du coefficient, et c'est lui qui entre dans $\\Delta$ et dans $-b$.",
          micros: ["sd_discriminant"],
        },
        {
          enonce: "Calculer le discriminant de $x^2 + 4x - 5$.",
          correction:
            "$a = 1$, $b = 4$, $c = -5$.\n$\\Delta = b^2 - 4ac = 4^2 - 4 \\times 1 \\times (-5) = 16 + 20 = 36$.\n⚠️ $-4 \\times 1 \\times (-5)$ est POSITIF : deux signes moins se compensent. $\\Delta = 36 > 0$, il y aura deux solutions.",
          micros: ["sd_discriminant"],
        },
        {
          enonce: "Calculer le discriminant de $2x^2 - 4x + 3$. Combien l'équation $2x^2 - 4x + 3 = 0$ a-t-elle de solutions ?",
          correction:
            "$a = 2$, $b = -4$, $c = 3$.\n$\\Delta = (-4)^2 - 4 \\times 2 \\times 3 = 16 - 24 = -8$.\n$\\Delta < 0$ : l'équation n'a aucune solution. On s'arrête là — on ne cherche pas $\\sqrt{-8}$, elle n'existe pas.",
          micros: ["sd_discriminant"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $x^2 - 3x - 10 = 0$.",
          correction:
            "$a = 1$, $b = -3$, $c = -10$. $\\Delta = (-3)^2 - 4 \\times 1 \\times (-10) = 9 + 40 = 49$.\n$\\Delta > 0$ : deux solutions, et $\\sqrt{49} = 7$.\n$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} = \\dfrac{3 \\pm 7}{2}$ : $x_1 = \\dfrac{3 - 7}{2} = -2$ et $x_2 = \\dfrac{3 + 7}{2} = 5$.\n⚠️ $-b = -(-3) = +3$ : c'est l'erreur la plus fréquente.\n$S = \\{-2 \\,;\\, 5\\}$.",
          micros: ["sd_racines"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $x^2 + 6x + 9 = 0$.",
          correction:
            "$a = 1$, $b = 6$, $c = 9$. $\\Delta = 6^2 - 4 \\times 1 \\times 9 = 36 - 36 = 0$.\n$\\Delta = 0$ : une seule solution, dite double : $x = \\dfrac{-b}{2a} = \\dfrac{-6}{2} = -3$.\nOn le voit aussi autrement : $x^2 + 6x + 9 = (x + 3)^2$, un carré, nul seulement en $-3$.\n$S = \\{-3\\}$.",
          micros: ["sd_racines"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $x^2 - 2x + 7 = 0$.",
          correction:
            "$\\Delta = (-2)^2 - 4 \\times 1 \\times 7 = 4 - 28 = -24$.\n$\\Delta < 0$ : aucune solution réelle. $S = \\varnothing$.\n⛔ Ne pas écrire $\\sqrt{-24}$. La parabole ne rencontre jamais l'axe des abscisses.",
          micros: ["sd_racines"],
        },
        {
          enonce: "Sans aucun calcul, donner les racines de $f(x) = 3(x - 1)(x + 4)$.",
          correction:
            "Sur une forme factorisée, on LIT les racines : ce sont les valeurs qui annulent un facteur.\n$x - 1 = 0$ donne $x = 1$ ; $x + 4 = 0$ donne $x = -4$.\n⛔ Le piège : lire $4$ au lieu de $-4$. Le facteur $(x + 4)$ s'annule pour $x = -4$.\nLe $3$ devant ne change pas les racines.",
          micros: ["sd_forme_factorisee"],
        },
        {
          enonce: "Donner le sommet de la parabole de $f(x) = 2(x - 3)^2 + 1$. Est-ce un minimum ou un maximum ?",
          correction:
            "C'est la forme canonique $a(x - \\alpha)^2 + \\beta$ avec $\\alpha = 3$ et $\\beta = 1$ : le sommet est $S(3 \\,;\\, 1)$.\n$a = 2 > 0$ : la parabole est tournée vers le haut, le sommet est un MINIMUM. $f$ vaut au moins $1$, et vaut $1$ exactement en $x = 3$.\n⚠️ $\\alpha = 3$, pas $-3$ : dans $(x - 3)^2$, le carré s'annule pour $x = 3$.",
          micros: ["sd_canonique"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "Si $\\Delta \\geqslant 0$, le trinôme se factorise : $ax^2 + bx + c = a(x - x_1)(x - x_2)$. ⛔ Ne pas oublier le $a$ devant.",
        "Somme et produit des racines : $x_1 + x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$. Avec une racine évidente, l'autre s'en déduit.",
        "Signe : un trinôme est du signe de $a$ partout, SAUF entre ses racines. Une inéquation se répond par un intervalle.",
        "Forme canonique : $a(x - \\alpha)^2 + \\beta$ avec $\\alpha = -\\dfrac{b}{2a}$ et $\\beta = f(\\alpha)$. Le sommet donne le minimum ($a > 0$) ou le maximum ($a < 0$).",
      ],
      exercices: [
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $2x^2 + 5x - 3 = 0$.",
          correction:
            "$a = 2$, $b = 5$, $c = -3$. $\\Delta = 5^2 - 4 \\times 2 \\times (-3) = 25 + 24 = 49$, et $\\sqrt{49} = 7$.\n$x = \\dfrac{-5 \\pm 7}{2 \\times 2} = \\dfrac{-5 \\pm 7}{4}$.\n$x_1 = \\dfrac{-5 - 7}{4} = \\dfrac{-12}{4} = -3$ et $x_2 = \\dfrac{-5 + 7}{4} = \\dfrac{2}{4} = 0{,}5$.\n⚠️ Le dénominateur est $2a = 4$, pas $2$ : c'est le piège quand $a \\neq 1$.\n$S = \\{-3 \\,;\\, 0{,}5\\}$.",
          micros: ["sd_racines"],
        },
        {
          enonce: "Factoriser $x^2 - x - 12$.",
          correction:
            "On cherche les racines : $a = 1$, $b = -1$, $c = -12$, $\\Delta = 1 + 48 = 49$, $\\sqrt{\\Delta} = 7$.\n$x_1 = \\dfrac{1 - 7}{2} = -3$ et $x_2 = \\dfrac{1 + 7}{2} = 4$.\nLa forme factorisée est $a(x - x_1)(x - x_2)$ : $x^2 - x - 12 = (x + 3)(x - 4)$.\nVérification en développant : $x^2 - 4x + 3x - 12 = x^2 - x - 12$. ✓",
          micros: ["sd_factorisation"],
        },
        {
          enonce: "Soit $f(x) = 3x^2 + 6x - 9$.\na) Vérifier que $1$ est une racine de $f$.\nb) En déduire l'autre racine sans calculer $\\Delta$, puis factoriser $f(x)$.",
          correction:
            "a) $f(1) = 3 \\times 1 + 6 \\times 1 - 9 = 3 + 6 - 9 = 0$ : oui, $1$ est une racine.\nb) Le produit des racines vaut $\\dfrac{c}{a} = \\dfrac{-9}{3} = -3$. Comme $x_1 = 1$ : $1 \\times x_2 = -3$, donc $x_2 = -3$.\nContrôle par la somme : $x_1 + x_2 = -\\dfrac{b}{a} = -\\dfrac{6}{3} = -2$, et $1 + (-3) = -2$. ✓\n$f(x) = a(x - x_1)(x - x_2) = 3(x - 1)(x + 3)$.\n⛔ Ne pas oublier le $3$ devant : $(x - 1)(x + 3)$ développé donne $x^2 + 2x - 3$, pas $f(x)$.",
          micros: ["sd_factorisation", "sd_somme_produit"],
        },
        {
          enonce: "Deux nombres ont pour somme $7$ et pour produit $10$. Trouver ces deux nombres.",
          correction:
            "Deux nombres de somme $S$ et de produit $P$ sont les racines de $x^2 - Sx + P = 0$.\nIci : $x^2 - 7x + 10 = 0$.\n$\\Delta = 49 - 40 = 9$, $\\sqrt{\\Delta} = 3$, donc $x = \\dfrac{7 \\pm 3}{2}$ : $2$ et $5$.\nVérification : $2 + 5 = 7$ et $2 \\times 5 = 10$. ✓",
          micros: ["sd_somme_produit", "sd_deux_racines"],
        },
        {
          enonce: "Écrire $f(x) = x^2 + 4x - 1$ sous forme canonique, puis donner son minimum et la valeur de $x$ où il est atteint.",
          correction:
            "On complète le carré : $x^2 + 4x$ est le début de $(x + 2)^2 = x^2 + 4x + 4$.\nDonc $x^2 + 4x = (x + 2)^2 - 4$, et $f(x) = (x + 2)^2 - 4 - 1 = (x + 2)^2 - 5$.\nUn carré est toujours positif ou nul : $f(x) \\geqslant -5$, avec égalité quand $x + 2 = 0$.\nLe minimum est $-5$, atteint en $x = -2$.\nContrôle : $\\alpha = -\\dfrac{b}{2a} = -\\dfrac{4}{2} = -2$ et $f(-2) = 4 - 8 - 1 = -5$. ✓",
          micros: ["sd_completion_carre", "sd_canonique"],
        },
        {
          enonce: "Étudier le signe de $f(x) = 2x^2 - 8x + 6$ sur $\\mathbb{R}$.",
          correction:
            "Les racines d'abord : $\\Delta = (-8)^2 - 4 \\times 2 \\times 6 = 64 - 48 = 16$, $\\sqrt{\\Delta} = 4$.\n$x = \\dfrac{8 \\pm 4}{4}$ : $x_1 = 1$ et $x_2 = 3$.\nLa règle : $f$ est du signe de $a$ sauf entre les racines. $a = 2 > 0$.\n$f(x) > 0$ sur $]-\\infty \\,;\\, 1[$ et sur $]3 \\,;\\, +\\infty[$ ; $f(x) < 0$ sur $]1 \\,;\\, 3[$ ; $f(1) = f(3) = 0$.\nContrôle avec $x = 2$ (entre les racines) : $f(2) = 8 - 16 + 6 = -2 < 0$. ✓",
          micros: ["sd_signe"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $x^2 - 4x - 5 \\leqslant 0$.",
          correction:
            "Les racines de $x^2 - 4x - 5$ : $\\Delta = 16 + 20 = 36$, $\\sqrt{\\Delta} = 6$, $x = \\dfrac{4 \\pm 6}{2}$ : $-1$ et $5$.\n$a = 1 > 0$ : le trinôme est négatif ENTRE les racines, positif à l'extérieur.\nOn veut $\\leqslant 0$ : entre les racines, bornes comprises (le trinôme vaut $0$ en $-1$ et en $5$).\n$S = [-1 \\,;\\, 5]$.\n⛔ La solution d'une inéquation est un intervalle, pas un nombre.",
          micros: ["sd_inequation"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $-x^2 + 2x + 8 < 0$.",
          correction:
            "$a = -1$, $b = 2$, $c = 8$. $\\Delta = 2^2 - 4 \\times (-1) \\times 8 = 4 + 32 = 36$, $\\sqrt{\\Delta} = 6$.\n$x = \\dfrac{-2 \\pm 6}{2 \\times (-1)} = \\dfrac{-2 \\pm 6}{-2}$ : $x_1 = \\dfrac{4}{-2} = -2$ et $x_2 = \\dfrac{-8}{-2} = 4$.\n⚠️ $a = -1 < 0$ : le trinôme est NÉGATIF à l'extérieur des racines et positif entre. C'est l'inverse du cas $a > 0$.\nOn veut $< 0$ : à l'extérieur, bornes exclues.\n$S = \\left] -\\infty \\,;\\, -2 \\right[ \\cup \\left] 4 \\,;\\, +\\infty \\right[$.\nContrôle avec $x = 0$ : $8 > 0$, donc $0$ n'est pas solution. ✓",
          micros: ["sd_inequation", "sd_signe"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "On choisit l'écriture que la question réclame : développée pour $f(0)$, factorisée pour les racines, canonique pour le sommet.",
        "Dans un problème, on met en équation, on ramène tout d'un côté, puis on calcule $\\Delta$. On ne garde que la solution qui a un sens (un temps positif, une longueur possible).",
        "Deux courbes se coupent là où $f(x) = g(x)$. Avec un paramètre $m$, $\\Delta$ devient une expression en $m$ : c'est son signe qu'on étudie.",
      ],
      exercices: [
        {
          titre: "Le ballon",
          enonce:
            "Un ballon est lancé vers le haut depuis un balcon. Sa hauteur, en mètres, au bout de $t$ secondes est $h(t) = -5t^2 + 20t + 25$.\na) De quelle hauteur part-il ?\nb) Au bout de combien de temps touche-t-il le sol ?\nc) Écrire $h(t)$ sous forme canonique. En déduire la hauteur maximale et l'instant où elle est atteinte.",
          correction:
            "a) Au départ, $t = 0$ : $h(0) = 25$. Le ballon part de $25$ m — c'est l'ordonnée à l'origine, lue sur la forme développée.\nb) Il touche le sol quand $h(t) = 0$ : $-5t^2 + 20t + 25 = 0$. On divise tout par $-5$ : $t^2 - 4t - 5 = 0$.\n$\\Delta = 16 + 20 = 36$, $\\sqrt{\\Delta} = 6$, $t = \\dfrac{4 \\pm 6}{2}$ : $t = -1$ ou $t = 5$.\nUn temps négatif n'a pas de sens : le ballon touche le sol au bout de $5$ secondes.\nc) $\\alpha = -\\dfrac{b}{2a} = -\\dfrac{20}{-10} = 2$ et $\\beta = h(2) = -20 + 40 + 25 = 45$. Donc $h(t) = -5(t - 2)^2 + 45$.\n$a = -5 < 0$ : le sommet est un maximum. La hauteur maximale est $45$ m, atteinte à $t = 2$ s.\nContrôle en développant : $-5(t^2 - 4t + 4) + 45 = -5t^2 + 20t - 20 + 45 = -5t^2 + 20t + 25$. ✓",
          micros: ["sd_forme_adaptee", "sd_racines", "sd_canonique"],
        },
        {
          titre: "L'enclos contre le mur",
          enonce:
            "On dispose de $40$ m de grillage pour fermer un enclos rectangulaire adossé à un mur : le mur fait un côté, le grillage les trois autres. On note $x$ la longueur, en mètres, de chacun des deux côtés perpendiculaires au mur.\na) Montrer que l'aire de l'enclos est $A(x) = -2x^2 + 40x$.\nb) Pour quelle valeur de $x$ l'aire est-elle maximale ? Que vaut-elle ?\nc) Pour quelles valeurs de $x$ l'aire est-elle d'au moins $150$ m² ?",
          correction:
            "a) Les deux côtés perpendiculaires au mur font $x$ chacun, il reste $40 - 2x$ pour le côté parallèle. Aire d'un rectangle : $A(x) = x(40 - 2x) = 40x - 2x^2 = -2x^2 + 40x$.\nb) C'est une question de SOMMET : forme canonique. $\\alpha = -\\dfrac{b}{2a} = -\\dfrac{40}{-4} = 10$ et $\\beta = A(10) = -200 + 400 = 200$.\n$A(x) = -2(x - 10)^2 + 200$, et $a = -2 < 0$ : maximum. L'aire maximale est $200$ m², pour $x = 10$ m (l'enclos fait alors $10$ m sur $20$ m).\nc) On veut $A(x) \\geqslant 150$, soit $-2x^2 + 40x - 150 \\geqslant 0$. On divise par $-2$ — le sens change : $x^2 - 20x + 75 \\leqslant 0$.\n$\\Delta = 400 - 300 = 100$, $\\sqrt{\\Delta} = 10$, racines $\\dfrac{20 \\pm 10}{2}$ : $5$ et $15$.\n$a = 1 > 0$ : négatif entre les racines. $S = [5 \\,;\\, 15]$ : l'aire dépasse $150$ m² pour $x$ entre $5$ m et $15$ m.\nContrôle : $A(5) = -50 + 200 = 150$ et $A(10) = 200 \\geqslant 150$. ✓",
          micros: ["sd_forme_adaptee", "sd_canonique", "sd_inequation"],
        },
        {
          titre: "La parabole et la droite",
          enonce:
            "Soit la parabole $\\mathcal{P}$ d'équation $y = x^2 + x - 2$ et la droite $d$ d'équation $y = 3x + 1$.\na) Déterminer les coordonnées des points d'intersection de $\\mathcal{P}$ et $d$.\nb) Pour quelle valeur de $k$ la droite d'équation $y = 3x + k$ ne coupe-t-elle $\\mathcal{P}$ qu'en un seul point ?",
          correction:
            "a) Un point est sur les deux courbes quand il a la même ordonnée sur chacune : $x^2 + x - 2 = 3x + 1$.\nOn ramène tout à gauche : $x^2 - 2x - 3 = 0$. $\\Delta = 4 + 12 = 16$, $\\sqrt{\\Delta} = 4$, $x = \\dfrac{2 \\pm 4}{2}$ : $x = -1$ ou $x = 3$.\nLes ordonnées, avec la droite : $y = 3 \\times (-1) + 1 = -2$ et $y = 3 \\times 3 + 1 = 10$.\nLes points sont $A(-1 \\,;\\, -2)$ et $B(3 \\,;\\, 10)$. Contrôle sur la parabole : $(-1)^2 - 1 - 2 = -2$ et $9 + 3 - 2 = 10$. ✓\nb) Même départ avec $k$ : $x^2 + x - 2 = 3x + k$, soit $x^2 - 2x - 2 - k = 0$.\nUn seul point d'intersection, c'est une seule solution : $\\Delta = 0$.\n$\\Delta = (-2)^2 - 4 \\times 1 \\times (-2 - k) = 4 + 8 + 4k = 12 + 4k$.\n$12 + 4k = 0$ donne $k = -3$. La droite $y = 3x - 3$ touche la parabole en un seul point, d'abscisse $x = \\dfrac{2}{2} = 1$.",
          micros: ["sd_forme_adaptee", "sd_racines", "sd_discriminant"],
        },
        {
          titre: "Combien de solutions, selon $m$ ?",
          enonce:
            "On considère l'équation $x^2 - 6x + m = 0$, où $m$ est un nombre réel.\na) Exprimer $\\Delta$ en fonction de $m$.\nb) Pour quelles valeurs de $m$ l'équation a-t-elle deux solutions distinctes ?\nc) Pour quelle valeur de $m$ n'a-t-elle qu'une seule solution ? Donner alors cette solution.\nd) Pour quelles valeurs de $m$ n'a-t-elle aucune solution ?",
          correction:
            "a) $a = 1$, $b = -6$, $c = m$ : $\\Delta = (-6)^2 - 4 \\times 1 \\times m = 36 - 4m$.\n⛔ L'inconnue de la question est $m$, pas $x$ : on ne résout pas l'équation, on étudie le signe de $\\Delta$.\nb) Deux solutions distinctes quand $\\Delta > 0$ : $36 - 4m > 0$, soit $4m < 36$, donc $m < 9$.\nc) Une seule solution quand $\\Delta = 0$ : $m = 9$. La solution est alors $x = \\dfrac{-b}{2a} = \\dfrac{6}{2} = 3$. On le vérifie : $x^2 - 6x + 9 = (x - 3)^2$.\nd) Aucune solution quand $\\Delta < 0$ : $m > 9$.\nRésumé : $m < 9$ deux solutions, $m = 9$ une seule, $m > 9$ aucune. Une seule valeur de $m$ sépare les trois cas.",
          micros: ["sd_discriminant", "sd_racines"],
        },
      ],
    },
  ],
};
