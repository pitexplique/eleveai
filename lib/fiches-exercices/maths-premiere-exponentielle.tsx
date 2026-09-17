// ─── Fiche d'exercices : l'exponentielle (1re spé) — 20 exercices corrigés ────
//
// Écrite le 15/09/2026 pour un élève MOYEN de première, à partir des deux fiches
// de cours (`lib/fiches/maths-premiere-exponentielle.tsx` et `-etude.tsx`), de
// la banque `lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank.ts`
// et du BO n° 14 de 2026. ⛔ Pas de limites (terminale), pas de g(ax + b) (sorti
// du programme) : seules les dérivées de e^{at} et des produits (ax + b)e^{x}.
//
// ⭐ LA RÈGLE DE FRÉDÉRIC : « ça doit rester simple ». Solutions entières partout,
// sauf les deux valeurs approchées des problèmes ; chaque piège porte sur la
// PROPRIÉTÉ (e^0 = 1, le sens de l'inégalité, e^x ≠ 0, « croissante car e^x > 0 »).
//
// ⭐ CHAQUE CORRIGÉ EST RECALCULÉ INDÉPENDAMMENT par `scripts/verifier-exercices-
// exponentielle.mjs` (valeurs numériques, racines, dérivées par taux
// d'accroissement) avant toute mise en ligne — la règle du coach vaut ici.
//
// Micro-compétences : exp_simplifier (1-4), exp_proprietes (3-4), exp_signe (5,
// 14, 17-19), exp_nombre_e (4, 8, 10), exp_equations (7-14), exp_derivee_affine
// (15, 19, 20), exp_derivee (16-18), exp_modelisation (19-20), exp_suite_geo (20).
// Seule exp_courbe n'a pas d'exercice : elle se travaille au coach, sur dessin.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/* ═══════════════════════════════════════════════════════════════════════════
 * LES TABLEAUX DESSINÉS DES CORRIGÉS (ajoutés le 17/09/2026)
 *
 * Frédéric : « regarde la fiche d'exercices exponentielle pour savoir si on peut
 * mettre des tableaux de variations ou de signes ». Mesuré : QUATRE des vingt
 * exercices s'y prêtent, tous au niveau 3, et leurs corrigés écrivaient déjà en
 * toutes lettres un tableau qu'ils ne montraient pas.
 *
 * ⛔ ET LA LIMITE, QUI EST UNE LIMITE DE PROGRAMME. Sur les exercices 17 et 18,
 * on dessine le tableau de SIGNES de f′, jamais celui des variations : ce
 * dernier demanderait la valeur de f aux bornes infinies, et $(x-3)e^x$ tend
 * vers 0 en $-\infty$ par croissance comparée — hors programme de première. Une
 * valeur inventée là enseignerait faux, et une case vide ferait dessiner une
 * flèche au hasard (le canvas déduit ses flèches en comparant les valeurs).
 * Les exercices 19 et 20, eux, ont un tableau de VARIATIONS sur un intervalle
 * fermé dont les deux valeurs sont déjà calculées dans leur corrigé.
 * ═══════════════════════════════════════════════════════════════════════════ */

const nb = (n: number | string) => String(n).replace("-", "−");

/** Le tableau de variations : signe de la dérivée en haut, valeurs en bas. */
function tableauVariations(
  bornes: (number | string)[],
  signes: ("+" | "-")[],
  valeurs: (number | string)[],
  labels: { derivee: string; fonction: string; variable?: string },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        bornes: bornes.map(nb),
        variable: labels.variable,
        derivee: { label: labels.derivee, signes, marques: Array(bornes.length - 2).fill("0") },
        variations: { label: labels.fonction, valeurs: valeurs.map(nb) },
        size: { width: 380, height: 200 },
      }}
    />
  );
}

/** Le tableau de signes seul — celui qu'on dresse avant de conclure. */
function tableauSignes(bornes: (number | string)[], label: string, signes: ("+" | "-")[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_signes",
        bornes: bornes.map(nb),
        lignes: [{ label, signes, marques: Array(bornes.length - 2).fill("0") }],
        size: { width: 380, height: 140 },
      }}
    />
  );
}

export const exercicesExponentiellePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "exponentielle",
  titre: "L'exponentielle",
  accroche:
    "Vingt exercices, du geste seul au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/premiere-spe/exponentielle",
      titre: "Partie 1 : calculer et résoudre",
    },
    {
      href: "/fiches-cours/maths/premiere-spe/exponentielle-etude",
      titre: "Partie 2 : dériver et étudier",
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
        "Un produit : on ajoute les exposants. $e^{a} \\times e^{b} = e^{a + b}$.",
        "Un quotient : on soustrait. $\\dfrac{e^{a}}{e^{b}} = e^{a - b}$, et $e^{-a} = \\dfrac{1}{e^{a}}$.",
        "Une puissance : on multiplie. $\\left(e^{a}\\right)^{n} = e^{na}$.",
        "Deux nombres à connaître : $e^{0} = 1$ et $e^{1} = e \\approx 2{,}718$. Et pour tout $x$ : $e^{x} > 0$.",
      ],
      exercices: [
        {
          enonce: "Simplifier $e^{4} \\times e^{-7}$.",
          correction:
            "C'est un produit : on ajoute les exposants.\n$e^{4} \\times e^{-7} = e^{4 + (-7)} = e^{-3}$.\n⛔ On n'écrit pas $e^{-28}$ : les exposants s'ajoutent, ils ne se multiplient pas.",
          micros: ["exp_simplifier"],
        },
        {
          enonce: "Simplifier $\\dfrac{e^{5x}}{e^{2x}}$.",
          correction:
            "C'est un quotient : on soustrait l'exposant du bas à celui du haut.\n$\\dfrac{e^{5x}}{e^{2x}} = e^{5x - 2x} = e^{3x}$.",
          micros: ["exp_simplifier"],
        },
        {
          enonce: "Écrire $\\left(e^{3x}\\right)^{2} \\times e^{-x}$ sous la forme $e^{\\dots}$.",
          correction:
            "D'abord la puissance : on multiplie les exposants, $\\left(e^{3x}\\right)^{2} = e^{6x}$.\nPuis le produit : on ajoute, $e^{6x} \\times e^{-x} = e^{6x - x} = e^{5x}$.",
          micros: ["exp_simplifier", "exp_proprietes"],
        },
        {
          enonce: "Écrire $\\dfrac{e^{2} \\times e}{e^{-1}}$ sous la forme d'une seule puissance de $e$.",
          correction:
            "$e$ tout seul, c'est $e^{1}$. Au numérateur : $e^{2} \\times e^{1} = e^{3}$.\nPuis le quotient : $\\dfrac{e^{3}}{e^{-1}} = e^{3 - (-1)} = e^{4}$.\n⚠️ Soustraire $-1$, c'est ajouter $1$.",
          micros: ["exp_simplifier", "exp_nombre_e"],
        },
        {
          enonce: "Vrai ou faux : « pour $x > 0$, $e^{-x}$ est un nombre négatif ».",
          correction:
            "Faux. $e^{-x} = \\dfrac{1}{e^{x}}$ : c'est l'inverse de $e^{x}$, pas son opposé.\nL'inverse d'un nombre positif est positif. D'ailleurs $e^{-1} \\approx 0{,}37$.\nÀ retenir : quelle que soit la valeur de $x$, $e^{x} > 0$. Le signe moins dans l'exposant rend le nombre petit, jamais négatif.",
          micros: ["exp_signe", "exp_proprietes"],
        },
        {
          enonce: "Sans calculatrice, comparer $e^{-1}$ et $e^{0{,}5}$.",
          correction:
            "L'exponentielle est strictement croissante : elle garde l'ordre des exposants.\n$-1 < 0{,}5$, donc $e^{-1} < e^{0{,}5}$.\nVérification à la calculatrice : $0{,}37 < 1{,}65$.",
          micros: ["exp_derivee", "exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{x - 3} = e^{5}$.",
          correction:
            "Deux exponentielles égales ont des exposants égaux : $e^{a} = e^{b} \\Leftrightarrow a = b$.\n$x - 3 = 5$, donc $x = 8$.\n$S = \\{8\\}$.",
          micros: ["exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{2x} = 1$.",
          correction:
            "Il faut deux exponentielles pour comparer les exposants : on écrit $1 = e^{0}$.\n$e^{2x} = e^{0}$, donc $2x = 0$ et $x = 0$.\n⛔ Le piège : écrire $2x = 1$. Le $1$ à droite n'est pas un exposant, c'est $e^{0}$.\n$S = \\{0\\}$.",
          micros: ["exp_equations", "exp_nombre_e"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "Pour résoudre, on se ramène à deux exponentielles, puis on compare les exposants : $e^{a} = e^{b} \\Leftrightarrow a = b$ et $e^{a} < e^{b} \\Leftrightarrow a < b$.",
        "Les déguisements de $e$ : $1 = e^{0}$, $e = e^{1}$, $\\dfrac{1}{e} = e^{-1}$.",
        "Dériver : $\\left(e^{at}\\right)' = a\\,e^{at}$, et pour un produit $(uv)' = u'v + uv'$.",
        "$e^{x}$ ne s'annule jamais : dans un produit nul, c'est l'autre facteur qui vaut $0$.",
      ],
      exercices: [
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{3x + 1} = e^{x - 5}$.",
          correction:
            "On compare les exposants : $3x + 1 = x - 5$.\nOn rassemble les $x$ d'un côté : $3x - x = -5 - 1$, soit $2x = -6$, donc $x = -3$.\nVérification : $3 \\times (-3) + 1 = -8$ et $-3 - 5 = -8$, les deux exposants valent bien $-8$.\n$S = \\{-3\\}$.",
          micros: ["exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{x + 1} = e \\times e^{2x - 3}$.",
          correction:
            "À droite, il y a deux exponentielles : on les réunit d'abord. $e = e^{1}$, donc $e \\times e^{2x - 3} = e^{1 + 2x - 3} = e^{2x - 2}$.\nL'équation devient $e^{x + 1} = e^{2x - 2}$, donc $x + 1 = 2x - 2$.\n$1 + 2 = 2x - x$, soit $x = 3$.\nVérification : à gauche $e^{4}$, à droite $e \\times e^{3} = e^{4}$.\n$S = \\{3\\}$.",
          micros: ["exp_equations", "exp_relation", "exp_nombre_e"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{x^{2}} = e^{3x - 2}$.",
          correction:
            "Les exposants sont égaux : $x^{2} = 3x - 2$.\nOn ramène tout à gauche : $x^{2} - 3x + 2 = 0$. C'est une équation du second degré.\n$\\Delta = b^{2} - 4ac = (-3)^{2} - 4 \\times 1 \\times 2 = 9 - 8 = 1$, donc $\\sqrt{\\Delta} = 1$.\n$x_{1} = \\dfrac{3 - 1}{2} = 1$ et $x_{2} = \\dfrac{3 + 1}{2} = 2$.\nVérification : pour $x = 1$, $1 = 3 - 2$ ; pour $x = 2$, $4 = 6 - 2$.\n$S = \\{1 \\,;\\, 2\\}$. L'exponentielle n'a servi qu'à la première ligne.",
          micros: ["exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{2x - 1} \\geqslant e^{5 - x}$.",
          correction:
            "L'exponentielle est croissante : l'inégalité entre les exponentielles est la même qu'entre les exposants.\n$2x - 1 \\geqslant 5 - x$.\n$2x + x \\geqslant 5 + 1$, soit $3x \\geqslant 6$, donc $x \\geqslant 2$ (on divise par $3$, positif : le sens ne change pas).\n$S = [2 \\,;\\, +\\infty[$.",
          micros: ["exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $e^{-3x + 1} < e^{4}$.",
          correction:
            "On compare les exposants : $-3x + 1 < 4$.\n$-3x < 3$.\n⚠️ On divise par $-3$, un nombre négatif : le sens de l'inégalité change. $x > -1$.\nVérification avec $x = 0$ : $e^{1} < e^{4}$ est vrai, et $0 > -1$.\n$S = \\left] -1 \\,;\\, +\\infty \\right[$.",
          micros: ["exp_equations"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $(2x + 8)\\,e^{x} = 0$.",
          correction:
            "Un produit est nul quand l'un de ses facteurs est nul.\nMais $e^{x}$ n'est jamais nul : $e^{x} > 0$ pour tout $x$.\nDonc c'est l'autre facteur : $2x + 8 = 0$, soit $x = -4$.\n⛔ Pas de « ou $x = 0$ » : $e^{0} = 1$, ce n'est pas $0$.\n$S = \\{-4\\}$.",
          micros: ["exp_equations", "exp_signe"],
        },
        {
          enonce: "Dériver les fonctions $f(t) = e^{-2t}$ et $g(t) = 50\\,e^{0{,}1t}$.",
          correction:
            "La règle : $\\left(e^{at}\\right)' = a\\,e^{at}$. L'exponentielle reste, le coefficient de $t$ passe devant.\n$f'(t) = -2\\,e^{-2t}$.\nPour $g$, le $50$ reste devant : $g'(t) = 50 \\times 0{,}1\\,e^{0{,}1t} = 5\\,e^{0{,}1t}$.\n⛔ Le piège : oublier le $-2$ ou le $0{,}1$, et écrire $f'(t) = e^{-2t}$.",
          micros: ["exp_derivee_affine"],
        },
        {
          enonce:
            "Soit $f(x) = (x + 3)\\,e^{x}$. Calculer $f'(x)$ et l'écrire sous forme factorisée.",
          correction:
            "C'est un produit $u \\times v$ avec $u = x + 3$ et $v = e^{x}$.\n$u' = 1$ et $v' = e^{x}$.\n$f'(x) = u'v + uv' = 1 \\times e^{x} + (x + 3)\\,e^{x}$.\nOn factorise par $e^{x}$ : $f'(x) = e^{x}\\,(1 + x + 3) = (x + 4)\\,e^{x}$.\nLa forme factorisée sert ensuite : le signe de $f'$ se lit sur $x + 4$.",
          micros: ["exp_derivee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "Dans une dérivée, l'exponentielle est toujours strictement positive : elle ne décide jamais du signe. C'est l'autre facteur qui commande les variations.",
        "L'extremum est la valeur de $f$ à l'endroit où $f'$ s'annule en changeant de signe. On l'écrit avec sa valeur exacte ($2e$, $-e^{2}$), la valeur approchée vient après.",
        "$N(t) = N_{0}\\,e^{kt}$ modélise une croissance ($k > 0$) ou une décroissance ($k < 0$). Relevée à intervalles réguliers, elle donne une suite géométrique de raison $e^{k}$.",
      ],
      exercices: [
        {
          titre: "Un maximum",
          enonce:
            "Soit $f(x) = (2x + 4)\\,e^{-x}$, définie sur $\\mathbb{R}$.\na) Calculer $f'(x)$ et montrer que $f'(x) = -2(x + 1)\\,e^{-x}$.\nb) Étudier le signe de $f'(x)$.\nc) Donner les variations de $f$.\nd) En déduire l'extremum de $f$.",
          correction:
            "a) Produit $uv$ avec $u = 2x + 4$, $u' = 2$, $v = e^{-x}$, $v' = -e^{-x}$ (règle $\\left(e^{at}\\right)' = a\\,e^{at}$ avec $a = -1$).\n$f'(x) = u'v + uv' = 2\\,e^{-x} + (2x + 4)(-e^{-x})$.\nOn factorise par $e^{-x}$ : $f'(x) = e^{-x}\\,(2 - 2x - 4) = (-2x - 2)\\,e^{-x}$.\nOn sort le $-2$ : $f'(x) = -2(x + 1)\\,e^{-x}$.\nb) $e^{-x} > 0$ et $-2 < 0$ : le signe de $f'(x)$ est l'opposé de celui de $x + 1$.\n$x + 1 > 0 \\Leftrightarrow x > -1$. Donc $f'(x) > 0$ si $x < -1$, $f'(-1) = 0$, et $f'(x) < 0$ si $x > -1$.\nc) $f$ est croissante sur $]-\\infty \\,;\\, -1]$ et décroissante sur $[-1 \\,;\\, +\\infty[$.\nd) $f'$ s'annule en $-1$ en passant du $+$ au $-$ : $f$ a un maximum en $x = -1$.\nIl vaut $f(-1) = (-2 + 4)\\,e^{1} = 2e \\approx 5{,}44$.",
          // ⛔ Le signe, pas les variations : f(x) tend vers 0 en +∞ par
          // croissance comparée, et les limites ne sont pas au programme de 1re.
          schema: tableauSignes(["−∞", -1, "+∞"], "f ′(x)", ["+", "-"]),
          micros: ["exp_derivee", "exp_signe"],
        },
        {
          titre: "Croissante parce que $e^{x} > 0$ ?",
          enonce:
            "Soit $f(x) = (x - 3)\\,e^{x}$, définie sur $\\mathbb{R}$.\na) Montrer que $f'(x) = (x - 2)\\,e^{x}$.\nb) Donner les variations de $f$ et préciser son extremum.\nc) Un élève écrit : « $f$ est croissante sur $\\mathbb{R}$ car $e^{x} > 0$ ». Vrai ou faux ? Expliquer.",
          correction:
            "a) $u = x - 3$, $u' = 1$, $v = e^{x}$, $v' = e^{x}$.\n$f'(x) = u'v + uv' = e^{x} + (x - 3)\\,e^{x}$.\nOn factorise par $e^{x}$ : $f'(x) = e^{x}\\,(1 + x - 3) = (x - 2)\\,e^{x}$.\nb) $e^{x} > 0$, donc $f'(x)$ a le signe de $x - 2$ : négatif si $x < 2$, nul en $2$, positif si $x > 2$.\n$f$ est décroissante sur $]-\\infty \\,;\\, 2]$ et croissante sur $[2 \\,;\\, +\\infty[$.\nElle a un minimum en $x = 2$ : $f(2) = (2 - 3)\\,e^{2} = -e^{2} \\approx -7{,}39$.\nc) Faux. $e^{x} > 0$ dit seulement que $f'$ a le signe de $x - 2$, et $x - 2$ est négatif avant $2$. L'exponentielle ne décide jamais du signe : c'est l'autre facteur qui commande. D'ailleurs $f(0) = -3$ et $f(2) \\approx -7{,}4$ : $f$ a bien diminué entre $0$ et $2$.",
          // ⭐ Le tableau qui répond à la question c) : le MOINS occupe tout
          // l'intervalle avant 2, alors que l'exponentielle y est positive.
          schema: tableauSignes(["−∞", 2, "+∞"], "f ′(x)", ["-", "+"]),
          micros: ["exp_derivee", "exp_signe"],
        },
        {
          titre: "Le cari refroidit",
          enonce:
            "Un cari sort du feu. Sa température, en degrés, au bout de $t$ minutes est $T(t) = 25 + 70\\,e^{-0{,}2t}$.\na) Quelle est la température à la sortie du feu ?\nb) Calculer $T'(t)$ et en déduire le sens de variation de $T$.\nc) Montrer que la température ne descend jamais sous $25$ °C. Que représente ce nombre ?\nd) Quelle est la température au bout de $10$ minutes ? (arrondir au dixième)",
          correction:
            "a) À $t = 0$ : $T(0) = 25 + 70\\,e^{0} = 25 + 70 \\times 1 = 95$ °C.\nb) Le $25$ est une constante, sa dérivée est $0$. Pour $70\\,e^{-0{,}2t}$, on applique $\\left(e^{at}\\right)' = a\\,e^{at}$ avec $a = -0{,}2$ : $T'(t) = 70 \\times (-0{,}2)\\,e^{-0{,}2t} = -14\\,e^{-0{,}2t}$.\n$e^{-0{,}2t} > 0$ et $-14 < 0$, donc $T'(t) < 0$ pour tout $t$ : $T$ est strictement décroissante. Le cari refroidit, sans jamais se réchauffer.\nc) $T(t) - 25 = 70\\,e^{-0{,}2t}$, et une exponentielle est toujours strictement positive. Donc $T(t) > 25$ pour tout $t$. Les $25$ °C sont la température de la cuisine : le plat s'en approche sans jamais passer dessous.\nd) $T(10) = 25 + 70\\,e^{-2} \\approx 25 + 70 \\times 0{,}135 \\approx 25 + 9{,}5 = 34{,}5$ °C.",
          // Les deux valeurs du tableau sont celles des questions a) et d).
          schema: tableauVariations([0, 10], ["-"], [95, "34,5"], {
            derivee: "T ′(t)",
            fonction: "T(t)",
            variable: "t",
          }),
          micros: ["exp_modelisation", "exp_derivee_affine", "exp_signe"],
        },
        {
          titre: "Des bactéries qui se multiplient",
          enonce:
            "Dans une boîte, le nombre de bactéries au bout de $t$ heures est $N(t) = 200\\,e^{0{,}5t}$.\na) Combien de bactéries y a-t-il au départ ? Au bout de $2$ heures ? (arrondir à l'unité)\nb) Calculer $N'(t)$ et en déduire le sens de variation de $N$.\nc) On relève le nombre de bactéries toutes les heures : $v_{n} = N(n)$. Montrer que $(v_{n})$ est une suite géométrique et donner sa raison.\nd) Par combien le nombre de bactéries est-il multiplié à chaque heure ? (arrondir au centième)",
          correction:
            "a) $N(0) = 200\\,e^{0} = 200$ bactéries. $N(2) = 200\\,e^{1} = 200e \\approx 200 \\times 2{,}718 \\approx 544$ bactéries.\nb) $N'(t) = 200 \\times 0{,}5\\,e^{0{,}5t} = 100\\,e^{0{,}5t}$. C'est strictement positif ($100 > 0$ et $e^{0{,}5t} > 0$), donc $N$ est strictement croissante : les bactéries se multiplient.\nc) $v_{n} = 200\\,e^{0{,}5n}$. On écrit le terme suivant : $v_{n + 1} = 200\\,e^{0{,}5(n + 1)} = 200\\,e^{0{,}5n + 0{,}5}$.\nUn produit d'exponentielles : $e^{0{,}5n + 0{,}5} = e^{0{,}5n} \\times e^{0{,}5}$, donc $v_{n + 1} = 200\\,e^{0{,}5n} \\times e^{0{,}5} = v_{n} \\times e^{0{,}5}$.\nChaque terme s'obtient en multipliant le précédent par le même nombre : $(v_{n})$ est géométrique, de raison $q = e^{0{,}5}$ et de premier terme $v_{0} = 200$.\nd) $e^{0{,}5} \\approx 1{,}65$ : le nombre de bactéries est multiplié par $1{,}65$ environ chaque heure. Au bout de deux heures : $\\times 1{,}65^{2} \\approx 2{,}72 = e$, ce qu'on retrouve avec $N(2) = 200e$.",
          // Les deux valeurs du tableau sont celles de la question a).
          schema: tableauVariations([0, 2], ["+"], [200, 544], {
            derivee: "N ′(t)",
            fonction: "N(t)",
            variable: "t",
          }),
          micros: ["exp_modelisation", "exp_suite_geo", "exp_derivee_affine"],
        },
      ],
    },
  ],
};
