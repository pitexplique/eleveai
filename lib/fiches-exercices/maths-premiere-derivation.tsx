// ─── Fiche d'exercices : la dérivation (1re spé) ──────────────────────────────
//                              20 exercices corrigés
//
// Sixième feuille de 1re spé (28/09/2026), écrite le jour où la dérivation a été
// coupée en quatre notions au coach (taux et nombre dérivé · tangente et lecture
// graphique · formules de base · somme, produit, quotient). UNE feuille pour les
// quatre : le bouton « Exercices » de chaque notion y mène (`notionsCoach` du
// registre). Alignée sur `lib/tutor-v4/questionBank/premiere-spe/maths/
// derivation.bank.ts`.
//
// ⭐⭐ LE FIL : LE NOMBRE DÉRIVÉ EST UNE PENTE, ET UNE VITESSE. La pente de la
// sécante devient celle de la tangente quand h tend vers 0 ; dans un problème,
// cette pente se lit en mètres par seconde ou en euros par objet.
//
// ⛔ Le signe de f′ et les tableaux de variations ne sont PAS ici : ils ont leur
// feuille, « Les variations d'une fonction ». Aucune fonction de la fiche de
// cours n'est reprise. Tous les nombres dérivés demandés sont entiers ou des
// fractions simples.
//
// ⭐ Les corrigés DESSINENT la courbe et sa tangente (aide `repere` des feuilles
// de seconde) : une pente se voit.
//
// Micro-compétences : der_taux (1), der_nombre_derive (2, 15, 17),
// der_definition (2, 15, 17), der_graphique (3, 16), der_usuelles (4, 14, 19),
// der_puissance (5), der_operations (6, 9, 10, 18), der_tangente (7, 14, 16, 19,
// 20), der_valeur_absolue (8), der_quotient (11, 12, 20), der_composee_affine
// (13), der_interpreter (17, 18, 20). 12/12.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05. */
// ⛔ On coupe aussi en HAUTEUR (`yMax`) : `repere` ne filtre une ligne brisée
// qu'en abscisse, et une branche qui file vers l'asymptote sortirait du cadre.
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

export const exercicesDerivationPremiereSpe: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "derivation",
  titre: "La dérivation",
  accroche:
    "Vingt exercices, du taux de variation au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la courbe avec sa tangente.",

  fichesCours: [{ href: "/fiches-cours/maths/premiere-spe/derivation", titre: "La dérivation" }],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Taux de variation de $f$ entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$. C'est la pente de la SÉCANTE qui joint les deux points de la courbe.",
        "Nombre dérivé : $f'(a)$ est la limite de $\\dfrac{f(a + h) - f(a)}{h}$ quand $h$ tend vers $0$. C'est la pente de la TANGENTE au point d'abscisse $a$.",
        "Tangente au point d'abscisse $a$ : $y = f'(a)(x - a) + f(a)$.",
        "À connaître : $(x^n)' = n\\,x^{n-1}$ ; $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ ; $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ ; $(k\\,u)' = k\\,u'$ ; $(u + v)' = u' + v'$.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = x^2 - 3x$. Calculer le taux de variation de $f$ entre $1$ et $4$.",
          correction:
            "On calcule les deux images : $f(1) = 1 - 3 = -2$ et $f(4) = 16 - 12 = 4$.\nTaux $= \\dfrac{f(4) - f(1)}{4 - 1} = \\dfrac{4 - (-2)}{3} = \\dfrac{6}{3} = 2$.\nLa sécante qui passe par $A(1 ; -2)$ et $B(4 ; 4)$ a donc une pente de $2$ : entre $1$ et $4$, $f$ augmente en moyenne de $2$ quand $x$ augmente de $1$.\n⚠️ Attention au signe moins : $4 - (-2) = 6$, pas $2$.",
          schema: repere([-1, 5, -4, 6], [{ q: [1, -3, 0] }, { q: [0, 2, -4], couleur: ORANGE }], [
            { x: 1, y: -2, label: "A" },
            { x: 4, y: 4, label: "B" },
          ]),
          micros: ["der_taux"],
        },
        {
          enonce: "Soit $f(x) = x^2$. En revenant à la définition, calculer $f'(3)$.",
          correction:
            "$f(3 + h) = (3 + h)^2 = 9 + 6h + h^2$.\n$\\dfrac{f(3 + h) - f(3)}{h} = \\dfrac{9 + 6h + h^2 - 9}{h} = \\dfrac{6h + h^2}{h} = 6 + h$, pour $h \\neq 0$.\nQuand $h$ tend vers $0$, $6 + h$ tend vers $6$. Donc $f$ est dérivable en $3$ et $f'(3) = 6$.\n⭐ On simplifie par $h$ AVANT de faire tendre $h$ vers $0$ : sinon on obtient $\\dfrac{0}{0}$, qui ne veut rien dire.\n⚠️ $(3 + h)^2$ n'est pas $9 + h^2$ : il manque le double produit $6h$.\n⭐ Sur le dessin : la sécante entre $3$ et $4$ (en vert) a une pente de $7 = 6 + 1$. Quand $h$ rétrécit, elle pivote autour de $A$ et vient se coucher sur la tangente (en orange), de pente $6$.",
          schema: repere([-1, 5, -2, 12], [{ q: [1, 0, 0] }, { q: [0, 7, -12], couleur: VERT }, { q: [0, 6, -9], couleur: ORANGE }], [
            { x: 3, y: 9, label: "A" },
          ]),
          micros: ["der_nombre_derive", "der_definition"],
        },
        {
          enonce: "La droite orange est la tangente à la courbe de $f$ au point $A$ d'abscisse $1$. Lire $f(1)$ et $f'(1)$.",
          figure: repere([-1, 4, -2, 5], [{ q: [-1, 4, -1] }, { q: [0, 2, 0], couleur: ORANGE }], [{ x: 1, y: 2, label: "A" }]),
          correction:
            "$f(1)$ est l'ORDONNÉE du point $A$ : on lit $f(1) = 2$.\n$f'(1)$ est la PENTE de la tangente en $A$. On part de $A(1 ; 2)$ et on avance de $1$ vers la droite : la tangente passe par $(2 ; 4)$. Elle est montée de $2$.\nDonc $f'(1) = \\dfrac{4 - 2}{2 - 1} = 2$.\n⛔ On lit la pente sur la TANGENTE, pas sur la courbe : en $x = 2$, la courbe n'est qu'à $3$.",
          micros: ["der_graphique"],
        },
        {
          enonce:
            "Donner la dérivée, puis la valeur demandée :\na) $f(x) = x^3$ ; calculer $f'(2)$.\nb) $g(x) = \\dfrac{1}{x}$ ; calculer $g'(-1)$.\nc) $h(x) = \\sqrt{x}$ ; calculer $h'(9)$.",
          correction:
            "a) $f'(x) = 3x^2$, donc $f'(2) = 3 \\times 4 = 12$.\nb) $g'(x) = -\\dfrac{1}{x^2}$, donc $g'(-1) = -\\dfrac{1}{1} = -1$.\n⚠️ $(-1)^2 = 1$ : le carré efface le signe de $x$, mais PAS le signe moins de la formule. $g'$ est négative partout : la fonction inverse décroît sur chacun de ses deux intervalles.\nc) $h'(x) = \\dfrac{1}{2\\sqrt{x}}$, donc $h'(9) = \\dfrac{1}{2 \\times 3} = \\dfrac{1}{6}$.\n⚠️ $\\sqrt{x}$ n'est dérivable que pour $x > 0$ : en $0$, sa tangente est verticale.",
          micros: ["der_usuelles"],
        },
        {
          enonce: "Dériver, pour $x \\neq 0$ : $f(x) = x^5$ ; $g(x) = \\dfrac{1}{x^2}$ ; $h(x) = \\dfrac{3}{x^4}$.",
          correction:
            "La règle $(x^n)' = n\\,x^{n-1}$ vaut pour tout entier $n$, négatif compris.\n$f'(x) = 5x^4$.\nOn écrit $g(x) = x^{-2}$. Alors $g'(x) = -2x^{-3} = -\\dfrac{2}{x^3}$.\nOn écrit $h(x) = 3x^{-4}$. Alors $h'(x) = 3 \\times (-4)x^{-5} = -\\dfrac{12}{x^5}$.\n⚠️ L'exposant DIMINUE de $1$ : $-2 - 1 = -3$, et non $-1$. C'est l'erreur la plus fréquente avec les exposants négatifs.",
          micros: ["der_puissance"],
        },
        {
          enonce: "Dériver $f(x) = 4x^3 - 5x^2 + 7x - 2$.",
          correction:
            "La dérivée d'une somme est la somme des dérivées, et un nombre qui multiplie reste devant.\n$(4x^3)' = 4 \\times 3x^2 = 12x^2$.\n$(-5x^2)' = -5 \\times 2x = -10x$.\n$(7x)' = 7$, et $(-2)' = 0$.\nDonc $f'(x) = 12x^2 - 10x + 7$.\n⚠️ La constante $-2$ DISPARAÎT : une constante ne varie pas, sa dérivée est nulle.",
          micros: ["der_operations"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 3x + 1$. Déterminer l'équation de la tangente à la courbe de $f$ au point d'abscisse $2$.",
          correction:
            "Il faut deux nombres : $f(2)$ et $f'(2)$.\n$f(2) = 4 - 6 + 1 = -1$.\n$f'(x) = 2x - 3$, donc $f'(2) = 1$.\nTangente : $y = f'(2)(x - 2) + f(2) = 1 \\times (x - 2) - 1$, soit $y = x - 3$.\n✔️ Vérification : en $x = 2$, la droite donne $2 - 3 = -1 = f(2)$. Elle passe bien par le point de la courbe.\n⚠️ On n'oublie pas le « $+ f(2)$ » : sans lui, la droite a la bonne pente mais passe à côté du point.",
          schema: repere([-1, 5, -4, 4], [{ q: [1, -3, 1] }, { q: [0, 1, -3], couleur: ORANGE }], [{ x: 2, y: -1, label: "A" }]),
          micros: ["der_tangente"],
        },
        {
          enonce:
            "Soit $f(x) = |x|$. Calculer $\\dfrac{f(0 + h) - f(0)}{h}$ pour $h > 0$, puis pour $h < 0$. $f$ est-elle dérivable en $0$ ?",
          correction:
            "$\\dfrac{f(h) - f(0)}{h} = \\dfrac{|h|}{h}$.\nSi $h > 0$ : $|h| = h$, le quotient vaut $1$.\nSi $h < 0$ : $|h| = -h$, le quotient vaut $-1$.\nQuand $h$ tend vers $0$, le quotient vaut $1$ d'un côté et $-1$ de l'autre : il n'a PAS de limite.\n$f$ n'est donc pas dérivable en $0$. Sur la courbe, on voit un POINT ANGULEUX : aucune droite ne peut y être la tangente.\n⭐ $f$ est pourtant bien définie en $0$ : être définie ne suffit pas pour être dérivable.",
          schema: repere([-3, 3, -1, 3], [{ pts: [[-3, 3], [0, 0], [3, 3]] }], [{ x: 0, y: 0, label: "O" }]),
          micros: ["der_valeur_absolue"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "Produit : $(uv)' = u'v + uv'$. Quotient : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$, là où $v$ ne s'annule pas.",
        "Inverse : $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
        "Avec une fonction affine à l'intérieur : la dérivée de $x \\mapsto u(ax + b)$ est $x \\mapsto a\\,u'(ax + b)$. On n'oublie pas le facteur $a$.",
        "Deux droites parallèles ont la même pente : une tangente parallèle à $y = mx + p$ se cherche en résolvant $f'(x) = m$.",
      ],
      exercices: [
        {
          enonce: "Dériver $f(x) = (2x + 1)(x^2 - 3)$.",
          correction:
            "On pose $u(x) = 2x + 1$ et $v(x) = x^2 - 3$. Alors $u'(x) = 2$ et $v'(x) = 2x$.\n$f'(x) = u'v + uv' = 2(x^2 - 3) + (2x + 1) \\times 2x$\n$= 2x^2 - 6 + 4x^2 + 2x = 6x^2 + 2x - 6$.\n✔️ Vérification : en développant d'abord, $f(x) = 2x^3 + x^2 - 6x - 3$, dont la dérivée est bien $6x^2 + 2x - 6$.\n⛔ La dérivée d'un produit n'est PAS le produit des dérivées : $u' \\times v' = 4x$ est faux.",
          micros: ["der_operations"],
        },
        {
          enonce: "Soit $f(x) = x\\sqrt{x}$ sur $]0 ; +\\infty[$. Calculer $f'(x)$ et l'écrire le plus simplement possible, puis calculer $f'(4)$.",
          correction:
            "$u(x) = x$, $u'(x) = 1$ ; $v(x) = \\sqrt{x}$, $v'(x) = \\dfrac{1}{2\\sqrt{x}}$.\n$f'(x) = 1 \\times \\sqrt{x} + x \\times \\dfrac{1}{2\\sqrt{x}}$.\nOr $\\dfrac{x}{\\sqrt{x}} = \\sqrt{x}$ : le second terme vaut $\\dfrac{\\sqrt{x}}{2}$.\nDonc $f'(x) = \\sqrt{x} + \\dfrac{\\sqrt{x}}{2} = \\dfrac{3}{2}\\sqrt{x}$.\n$f'(4) = \\dfrac{3}{2} \\times 2 = 3$.\n⭐ Simplifier $\\dfrac{x}{\\sqrt{x}}$ en $\\sqrt{x}$ rend le résultat lisible : c'est le réflexe à prendre.\nSur le dessin, la tangente au point $(4 ; 8)$ a bien une pente de $3$ : $y = 3x - 4$.",
          schema: repere(
            [-1, 6, -1, 11],
            [{ pts: echantillon((x) => x * Math.sqrt(x), 0, 5, -1, 11) }, { q: [0, 3, -4], couleur: ORANGE }],
            [{ x: 4, y: 8, label: "" }],
          ),
          micros: ["der_operations"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{2x - 1}{x + 3}$ pour $x \\neq -3$. Calculer $f'(x)$, puis donner son signe.",
          correction:
            "$u(x) = 2x - 1$, $u'(x) = 2$ ; $v(x) = x + 3$, $v'(x) = 1$.\n$f'(x) = \\dfrac{u'v - uv'}{v^2} = \\dfrac{2(x + 3) - (2x - 1) \\times 1}{(x + 3)^2}$.\nNumérateur : $2x + 6 - 2x + 1 = 7$.\nDonc $f'(x) = \\dfrac{7}{(x + 3)^2}$.\nUn carré non nul est strictement positif : $f'(x) > 0$ pour tout $x \\neq -3$.\n⚠️ La parenthèse autour de $(2x - 1)$ est indispensable : sans elle, on écrit $- 2x - 1$ et on trouve $5$ au lieu de $7$.\n⚠️ On ne développe pas le dénominateur $(x + 3)^2$ : sous forme de carré, son signe se lit tout de suite.\n⭐ Sur le dessin : $f$ n'est pas définie en $-3$, sa courbe est en deux morceaux, et chacun MONTE — c'est ce que dit $f' > 0$.",
          schema: repere(
            [-9, 4, -4, 8],
            [
              { pts: echantillon((x) => (2 * x - 1) / (x + 3), -9, -3.2, -4, 8) },
              { pts: echantillon((x) => (2 * x - 1) / (x + 3), -2.8, 4, -4, 8) },
            ],
          ),
          micros: ["der_quotient"],
        },
        {
          enonce: "Soit $g(x) = \\dfrac{1}{x^2 + 1}$ sur $\\mathbb{R}$. Calculer $g'(x)$, puis $g'(0)$ et $g'(1)$.",
          correction:
            "$v(x) = x^2 + 1$ ne s'annule jamais (elle vaut au moins $1$) : $g$ est dérivable sur $\\mathbb{R}$.\n$v'(x) = 2x$, et $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.\nDonc $g'(x) = -\\dfrac{2x}{(x^2 + 1)^2}$.\n$g'(0) = 0$ : la tangente en $0$ est horizontale.\n$g'(1) = -\\dfrac{2}{2^2} = -\\dfrac{1}{2}$.\n⛔ $\\left(\\dfrac{1}{v}\\right)'$ n'est pas $\\dfrac{1}{v'}$ : ici, $\\dfrac{1}{2x}$ serait faux, et même pas défini en $0$.",
          schema: repere(
            [-3, 3, -1, 2],
            [
              { pts: echantillon((x) => 1 / (x * x + 1), -3, 3) },
              { q: [0, 0, 1], couleur: ORANGE },
              { q: [0, -0.5, 1], couleur: VERT },
            ],
            [
              { x: 0, y: 1, label: "" },
              { x: 1, y: 0.5, label: "" },
            ],
          ),
          micros: ["der_quotient"],
        },
        {
          enonce:
            "Dériver, en précisant où c'est possible :\na) $f(x) = (3x - 2)^4$\nb) $g(x) = \\sqrt{2x + 6}$, puis calculer $g'(5)$\nc) $h(x) = \\dfrac{1}{5 - x}$",
          correction:
            "La règle : la dérivée de $u(ax + b)$ est $a \\times u'(ax + b)$.\na) Ici $u(X) = X^4$ et $ax + b = 3x - 2$, donc $a = 3$. $f'(x) = 3 \\times 4(3x - 2)^3 = 12(3x - 2)^3$.\nb) $g$ est dérivable là où $2x + 6 > 0$, soit $x > -3$. $g'(x) = 2 \\times \\dfrac{1}{2\\sqrt{2x + 6}} = \\dfrac{1}{\\sqrt{2x + 6}}$.\n$g'(5) = \\dfrac{1}{\\sqrt{16}} = \\dfrac{1}{4}$.\nc) $h(x) = \\dfrac{1}{X}$ avec $X = 5 - x$, donc $a = -1$. $h'(x) = -1 \\times \\left(-\\dfrac{1}{(5 - x)^2}\\right) = \\dfrac{1}{(5 - x)^2}$, pour $x \\neq 5$.\n⚠️ Le facteur $a$ vaut ici $-1$ : il change le signe. L'oublier donne $h'$ négative, alors que $h$ est croissante.",
          micros: ["der_composee_affine"],
        },
        {
          enonce:
            "Soit $f(x) = x^3 - 2x$.\na) Déterminer l'équation de la tangente $T$ au point d'abscisse $1$.\nb) En quels points la courbe a-t-elle une tangente parallèle à la droite $y = 10x$ ?",
          correction:
            "a) $f(1) = 1 - 2 = -1$ ; $f'(x) = 3x^2 - 2$, donc $f'(1) = 1$.\n$T : y = 1 \\times (x - 1) - 1$, soit $y = x - 2$.\nb) Parallèle à $y = 10x$ veut dire : même pente, $10$. On résout $f'(x) = 10$.\n$3x^2 - 2 = 10$ donne $x^2 = 4$, donc $x = 2$ ou $x = -2$.\n$f(2) = 8 - 4 = 4$ et $f(-2) = -8 + 4 = -4$.\nCe sont les points $(2 ; 4)$ et $(-2 ; -4)$, où les tangentes ont pour équations $y = 10x - 16$ et $y = 10x + 16$.\n⚠️ On résout $f'(x) = 10$, et non $f(x) = 10x$ : on cherche une PENTE, pas un point d'intersection.",
          schema: repere(
            [-3, 3, -5, 5],
            [
              { p: [1, 0, -2, 0] },
              { q: [0, 1, -2], couleur: ORANGE },
              { q: [0, 10, -16], couleur: VERT },
              { q: [0, 10, 16], couleur: VERT },
            ],
            [
              { x: 1, y: -1, label: "A" },
              { x: 2, y: 4, label: "" },
              { x: -2, y: -4, label: "" },
            ],
          ),
          micros: ["der_tangente", "der_usuelles"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{1}{x}$. En revenant à la définition, montrer que $f$ est dérivable en $2$ et calculer $f'(2)$.",
          correction:
            "$f(2 + h) - f(2) = \\dfrac{1}{2 + h} - \\dfrac{1}{2}$. On réduit au même dénominateur :\n$= \\dfrac{2 - (2 + h)}{2(2 + h)} = \\dfrac{-h}{2(2 + h)}$.\nOn divise par $h$ (avec $h \\neq 0$) : $\\dfrac{f(2 + h) - f(2)}{h} = \\dfrac{-1}{2(2 + h)}$.\nQuand $h$ tend vers $0$, $2(2 + h)$ tend vers $4$ : le quotient tend vers $-\\dfrac{1}{4}$.\nDonc $f$ est dérivable en $2$ et $f'(2) = -\\dfrac{1}{4}$.\n✔️ C'est bien ce que donne la formule : $-\\dfrac{1}{x^2}$ vaut $-\\dfrac{1}{4}$ en $2$.\n⚠️ Diviser par $h$, c'est multiplier le dénominateur par $h$ : le $h$ du numérateur disparaît, et c'est tout le but.\nSur le dessin, la tangente au point $\\left(2 ; \\dfrac{1}{2}\\right)$ descend de $1$ quand on avance de $4$ : $y = -\\dfrac{1}{4}x + 1$.",
          schema: repere(
            [-1, 5, -1, 4],
            [{ pts: echantillon((x) => 1 / x, 0.25, 5, -1, 4) }, { q: [0, -0.25, 1], couleur: ORANGE }],
            [{ x: 2, y: 0.5, label: "" }],
          ),
          micros: ["der_definition", "der_nombre_derive"],
        },
        {
          enonce:
            "On a tracé la courbe de $f(x) = x^3 - 3x$ et ses tangentes aux points d'abscisses $-1$, $0$ et $1$.\na) Lire $f'(-1)$, $f'(0)$ et $f'(1)$ sur le dessin.\nb) Retrouver ces valeurs par le calcul.\nc) Donner l'équation de la tangente en $0$.",
          figure: repere(
            [-3, 3, -4, 4],
            [
              { p: [1, 0, -3, 0] },
              { q: [0, 0, 2], couleur: ORANGE },
              { q: [0, -3, 0], couleur: ORANGE },
              { q: [0, 0, -2], couleur: ORANGE },
            ],
            [
              { x: -1, y: 2, label: "A" },
              { x: 0, y: 0, label: "O" },
              { x: 1, y: -2, label: "B" },
            ],
          ),
          correction:
            "a) En $A$ et en $B$, la tangente est HORIZONTALE : sa pente est nulle. Donc $f'(-1) = 0$ et $f'(1) = 0$.\nEn $O$, la tangente passe par $(0 ; 0)$ et $(1 ; -3)$ : elle descend de $3$ quand on avance de $1$. Donc $f'(0) = -3$.\nb) $f'(x) = 3x^2 - 3$. $f'(-1) = 3 - 3 = 0$ ; $f'(0) = -3$ ; $f'(1) = 0$. ✔️\nc) $f(0) = 0$ et $f'(0) = -3$ : $y = -3(x - 0) + 0$, soit $y = -3x$.\n⭐ Une tangente horizontale signale ici un sommet ou un creux de la courbe : c'est ce qu'on exploitera au chapitre des variations.",
          micros: ["der_graphique", "der_tangente"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Le nombre dérivé y devient une vitesse.",
      rappel: [
        "$f'(a)$ est une VITESSE : la vitesse à laquelle $f$ varie en $a$. Son unité est celle de $f$ divisée par celle de $x$ : mètres par seconde, euros par objet…",
        "Vitesse moyenne entre deux instants : le taux de variation. Vitesse à un instant précis : le nombre dérivé.",
        "Coût marginal : $C'(q)$ est, à peu près, le coût de fabrication d'UN objet de plus quand on en fabrique déjà $q$.",
        "On termine en répondant à la question posée, avec son unité.",
      ],
      exercices: [
        {
          titre: "La pierre qui tombe de la falaise",
          enonce:
            "Une pierre se détache du haut d'une falaise de $80$ m. On néglige la résistance de l'air : au bout de $t$ secondes, elle est tombée de $d(t) = 5t^2$ mètres.\na) Calculer sa vitesse moyenne entre $t = 1$ et $t = 3$.\nb) En revenant à la définition, calculer sa vitesse à l'instant $t = 2$.\nc) Au bout de combien de temps touche-t-elle le sol, et à quelle vitesse ? Donner cette vitesse en km/h.",
          correction:
            "a) $d(1) = 5$ et $d(3) = 45$. Vitesse moyenne : $\\dfrac{45 - 5}{3 - 1} = \\dfrac{40}{2} = 20$ m/s.\nb) $d(2 + h) = 5(4 + 4h + h^2) = 20 + 20h + 5h^2$, et $d(2) = 20$.\n$\\dfrac{d(2 + h) - d(2)}{h} = \\dfrac{20h + 5h^2}{h} = 20 + 5h$, qui tend vers $20$ quand $h$ tend vers $0$.\nÀ $t = 2$ s, la pierre tombe à $20$ m/s.\n⭐ Même nombre qu'en a), et ce n'est pas un hasard : pour une fonction du second degré, la vitesse au MILIEU d'un intervalle égale la vitesse moyenne sur cet intervalle.\nc) Elle touche le sol quand $d(t) = 80$ : $5t^2 = 80$, $t^2 = 16$, donc $t = 4$ s (un temps est positif).\n$d'(t) = 10t$, donc $d'(4) = 40$ m/s.\nEn km/h : $40 \\times 3{,}6 = 144$ km/h.\n⚠️ $d'(t)$ est en mètres PAR SECONDE : pour passer en km/h, on multiplie par $3{,}6$, on ne divise pas.",
          // Pas de courbe : le repère gradue chaque entier, et 80 m en demandent 80.
          schema: tableau(["t (s)", "0", "1", "2", "3", "4"], ["d(t) (m)", 0, 5, 20, 45, 80]),
          micros: ["der_interpreter", "der_nombre_derive", "der_definition"],
        },
        {
          titre: "Une planche de skate de plus",
          enonce:
            "Un atelier fabrique des planches de skate. Fabriquer $q$ planches par jour coûte $C(q) = q^2 + 50q + 1000$ euros.\na) Calculer $C'(q)$, puis $C'(20)$.\nb) Calculer le coût réel de la 21ᵉ planche, $C(21) - C(20)$. Comparer.\nc) Chaque planche est vendue $130$ euros. Tant qu'une planche de plus coûte moins qu'elle ne rapporte, l'atelier a intérêt à produire davantage. Jusqu'à combien de planches par jour ?",
          correction:
            "a) $C'(q) = 2q + 50$, donc $C'(20) = 90$. Le coût marginal à $20$ planches est de $90$ euros par planche.\nb) $C(20) = 400 + 1000 + 1000 = 2400$ et $C(21) = 441 + 1050 + 1000 = 2491$.\nLa 21ᵉ planche coûte donc $2491 - 2400 = 91$ euros : presque exactement $C'(20)$.\n⭐ C'est le sens du nombre dérivé en économie : $C'(q)$ donne, à peu près, le coût d'UNE planche de plus.\nc) On veut $C'(q) < 130$ : $2q + 50 < 130$, soit $2q < 80$, donc $q < 40$.\nEn dessous de $40$ planches par jour, une planche de plus rapporte plus qu'elle ne coûte : l'atelier a intérêt à monter jusqu'à $40$ planches par jour.\n⚠️ On compare le coût d'une planche DE PLUS au prix de vente, pas le coût TOTAL : $2400$ euros pour $20$ planches ne se compare pas à $130$.",
          schema: tableau(["q", "20", "21", "40"], ["C'(q) (€)", 90, 92, 130]),
          micros: ["der_interpreter", "der_operations"],
        },
        {
          titre: "Les deux tangentes issues d'un point",
          enonce:
            "Soit $\\mathcal{P}$ la parabole d'équation $y = x^2$ et le point $A(1 ; -3)$, situé sous la parabole.\na) Écrire l'équation de la tangente à $\\mathcal{P}$ au point d'abscisse $a$.\nb) Pour quelles valeurs de $a$ cette tangente passe-t-elle par $A$ ?\nc) En déduire les équations des deux tangentes à $\\mathcal{P}$ qui passent par $A$.",
          correction:
            "a) $f(x) = x^2$, $f'(x) = 2x$. Au point d'abscisse $a$ : $y = 2a(x - a) + a^2$, soit $y = 2ax - a^2$.\nb) La tangente passe par $A(1 ; -3)$ si ses coordonnées vérifient l'équation : $-3 = 2a \\times 1 - a^2$.\nOn obtient $a^2 - 2a - 3 = 0$. $\\Delta = 4 + 12 = 16$, donc $a = \\dfrac{2 + 4}{2} = 3$ ou $a = \\dfrac{2 - 4}{2} = -1$.\nc) Pour $a = 3$ : $y = 6x - 9$. Pour $a = -1$ : $y = -2x - 1$.\n✔️ Vérification avec $A$ : $6 - 9 = -3$ et $-2 - 1 = -3$. Les deux droites passent bien par $A$.\n⭐ L'inconnue n'est pas $x$ mais $a$, l'abscisse du point de contact : c'est ce changement de regard qui fait l'exercice.",
          schema: repere(
            [-3, 5, -5, 10],
            [{ q: [1, 0, 0] }, { q: [0, 6, -9], couleur: ORANGE }, { q: [0, -2, -1], couleur: ORANGE }],
            [
              { x: 1, y: -3, label: "A" },
              { x: 3, y: 9, label: "" },
              { x: -1, y: 1, label: "" },
            ],
          ),
          micros: ["der_tangente", "der_usuelles"],
        },
        {
          titre: "Un médicament dans le sang",
          enonce:
            "Après une injection, la concentration d'un médicament dans le sang est $C(t) = \\dfrac{10t}{t^2 + 1}$ (en mg/L), où $t \\geqslant 0$ est le temps en heures.\na) Montrer que $C'(t) = \\dfrac{10(1 - t^2)}{(t^2 + 1)^2}$.\nb) Calculer $C'(0)$ et donner l'équation de la tangente à l'origine. Que signifie ce nombre ?\nc) Calculer $C'(1)$ et $C(1)$. Que se passe-t-il au bout d'une heure ?\nd) Calculer $C'(2)$ et l'interpréter.",
          correction:
            "a) $u(t) = 10t$, $u'(t) = 10$ ; $v(t) = t^2 + 1$, $v'(t) = 2t$.\n$C'(t) = \\dfrac{10(t^2 + 1) - 10t \\times 2t}{(t^2 + 1)^2} = \\dfrac{10 - 10t^2}{(t^2 + 1)^2} = \\dfrac{10(1 - t^2)}{(t^2 + 1)^2}$.\nb) $C'(0) = \\dfrac{10}{1} = 10$. Comme $C(0) = 0$, la tangente à l'origine est $y = 10t$.\nJuste après l'injection, la concentration monte à la vitesse de $10$ mg/L par heure.\nc) $C'(1) = 0$ et $C(1) = \\dfrac{10}{2} = 5$ mg/L. La tangente est horizontale : la concentration cesse de monter. Elle atteint $5$ mg/L au bout d'une heure, puis commence à baisser.\nd) $C'(2) = \\dfrac{10(1 - 4)}{25} = -\\dfrac{30}{25} = -1{,}2$.\nDeux heures après l'injection, la concentration BAISSE, à la vitesse de $1{,}2$ mg/L par heure : le corps élimine le médicament.\n⚠️ Un nombre dérivé négatif ne veut pas dire que la concentration est négative : elle vaut $C(2) = 4$ mg/L. Il dit qu'elle DIMINUE.",
          schema: repere(
            [-1, 6, -1, 7],
            [
              { pts: echantillon((t) => (10 * t) / (t * t + 1), 0, 6) },
              { q: [0, 10, 0], couleur: ORANGE },
              { q: [0, 0, 5], couleur: VERT },
            ],
            [{ x: 1, y: 5, label: "" }],
          ),
          micros: ["der_quotient", "der_interpreter", "der_tangente"],
        },
      ],
    },
  ],
};
