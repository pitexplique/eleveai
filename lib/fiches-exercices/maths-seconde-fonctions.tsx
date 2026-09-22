// ─── Fiche d'exercices : image, antécédent, courbe (seconde) ─────────────────
//
// Première feuille du bloc « Fonctions » de seconde (21/09/2026, le soir).
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/
// fonction-vocabulaire.bank.ts` (notionId fonction_vocabulaire_2de) et sur la
// fiche de cours `lib/fiches/maths-seconde-fonctions.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni 2x + 1, ni x² − 3x, ni
// x² − 2, ni ses dix exercices).
//
// ⭐ L'IDÉE DE LA FICHE : une image est UNIQUE, un antécédent ne l'est pas —
// deux, un ou aucun (exercices 5, 8, 9). Et résoudre graphiquement, c'est lire
// des ABSCISSES.
//
// ⭐ PREMIÈRE FEUILLE À FIGURE DANS L'ÉNONCÉ (champ `figure`, ajouté le même
// soir) : la lecture graphique est l'exercice 5 du contrôle commun, elle ne
// pouvait pas se décrire en mots.
//
// ⭐ LE MONDE AU RÉEL (Frédéric, 21/09 : « il faut exploiter le monde », « pas La
// Réunion obligatoirement, 83 % sont de métropole ») : un plongeon de 10 m, des
// panneaux solaires, la distance de freinage, une nuit de gel en montagne, le
// CO₂ de l'atmosphère.
// Source des chiffres du CO₂ (exercice 20) : NOAA Global Monitoring Laboratory,
// Mauna Loa, moyennes annuelles arrondies à l'unité — 1960 : 316,91 ;
// 1980 : 338,76 ; 2000 : 369,71 ; 2010 : 389,90 ; 2020 : 414,21 ;
// 2024 : 424,61 ppm. Avant l'ère industrielle : environ 280 ppm.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fonctions.mjs` — les
// courbes des figures sont RELUES dans ce source (coefficients, points), et les
// solutions graphiques retrouvées sur une grille.
//
// Micro-compétences : fonction_vocabulaire (1, 10, 14, 18, 20),
// fonction_image_formule (2, 3, 7, 9, 14, 15, 17, 19), fonction_antecedent (4,
// 5, 9, 10, 15, 16, 17, 19, 20), fonction_tableau_graphique (7, 16, 20),
// fonction_resolution_graphique (8, 12, 16, 18), fonction_comparer_courbes (13,
// 18), fonction_domaine (6, 11, 17, 19). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, droite, type Courbe } from "@/lib/fiches-exercices/figures";

/* Les courbes lues dans les énoncés — et redessinées, marquées, dans les corrigés. */
const COURBE_8: Courbe[] = [{ q: [-1, 2, 3] }];
const COURBE_12: Courbe[] = [{ q: [1, -2, -2] }];
const COURBES_13: Courbe[] = [{ q: [1, 0, -1] }, { q: [0, 1, 1], couleur: ORANGE }];
const RELEVES_16: [number, number][] = [[0, 3], [1, 1], [2, 0], [3, -1], [4, -2], [5, -1], [6, 1]];
const SOLAIRE_18: Courbe[] = [
  { pts: [[6, 0], [8, 1], [10, 3], [12, 4], [14, 4], [16, 3], [18, 1], [20, 0]], couleur: ORANGE },
  { pts: [[6, 2], [8, 1], [18, 1], [20, 2]] },
];

export const exercicesFonctionsSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonction-vocabulaire-2de",
  titre: "Image, antécédent et courbe d'une fonction",
  accroche:
    "Vingt exercices, du calcul seul au problème : image, antécédent, domaine, courbe lue et courbes comparées. Un plongeon de 10 mètres, des panneaux solaires, une distance de freinage, le CO₂ de l'atmosphère. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/fonction-vocabulaire-2de", titre: "Fonctions : image, antécédent, courbe" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une définition par exercice : image, antécédent, point de la courbe, domaine.",
      rappel: [
        "L'IMAGE de $x$ est $f(x)$ : on remplace $x$ par le nombre, PARTOUT, et on calcule. Une image est UNIQUE.",
        "Un ANTÉCÉDENT de $k$ est un nombre $x$ tel que $f(x) = k$ : on résout l'équation. Il peut y en avoir zéro, un ou plusieurs.",
        "Le point $(a\\,;\\,b)$ est sur la courbe de $f$ quand $f(a) = b$. L'abscisse vient d'abord.",
        "Le DOMAINE : on ne divise jamais par $0$, on ne prend jamais la racine d'un nombre négatif.",
      ],
      exercices: [
        {
          enonce: "On sait que $f(-2) = 5$, $f(0) = -1$ et $f(3) = 5$.\na) Quelle est l'image de $0$ ?\nb) Donner deux antécédents de $5$.\nc) Le point $A(3\\,;\\,5)$ est-il sur la courbe de $f$ ? Et le point $B(5\\,;\\,3)$ ?\nd) Peut-on avoir aussi $f(0) = 2$ ?",
          correction:
            "a) L'énoncé dit $f(0) = -1$ : l'image de $0$ est $-1$.\nb) $f(-2) = 5$ et $f(3) = 5$ : $-2$ et $3$ sont deux antécédents de $5$.\nc) $A(3\\,;\\,5)$ est sur la courbe, car $f(3) = 5$. Pour $B(5\\,;\\,3)$, il faudrait $f(5) = 3$ : l'énoncé ne dit rien de $f(5)$, on ne peut pas conclure.\nd) Non : $0$ a déjà une image, $-1$, et une image est UNIQUE.\n⛔ Le piège au c) : lire $B(5\\,;\\,3)$ comme $A(3\\,;\\,5)$. L'abscisse vient toujours en premier.",
          schema: tableau(["x", "−2", "0", "3"], ["f(x)", 5, -1, 5]),
          micros: ["fonction_vocabulaire"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 4x + 1$. Calculer :\na) $f(0)$\nb) $f(-2)$\nc) $f(5)$",
          correction:
            "On remplace $x$ par le nombre PARTOUT, avec des parenthèses autour des nombres négatifs.\na) $f(0) = 0^2 - 4 \\times 0 + 1 = 1$.\nb) $f(-2) = (-2)^2 - 4 \\times (-2) + 1 = 4 + 8 + 1 = 13$.\nc) $f(5) = 5^2 - 4 \\times 5 + 1 = 25 - 20 + 1 = 6$.\n⛔ Les deux pièges du b) : $(-2)^2$ vaut $4$ et non $-4$, et $-4 \\times (-2)$ vaut $+8$.",
          schema: tableau(["x", "−2", "0", "5"], ["f(x)", 13, 1, 6]),
          micros: ["fonction_image_formule"],
        },
        {
          enonce: "Soit $g(x) = 3(x - 2)^2 - 5$.\na) Calculer $g(4)$, $g(0)$ et $g(2)$.\nb) Que remarque-t-on pour $g(4)$ et $g(0)$ ? Qu'en déduit-on pour le nombre $7$ ?",
          correction:
            "a) On calcule d'abord la parenthèse, puis le carré, puis on multiplie par $3$.\n$g(4) = 3 \\times (4 - 2)^2 - 5 = 3 \\times 4 - 5 = 7$.\n$g(0) = 3 \\times (0 - 2)^2 - 5 = 3 \\times 4 - 5 = 7$.\n$g(2) = 3 \\times 0^2 - 5 = -5$.\nb) $4$ et $0$ ont la même image, $7$ : le nombre $7$ a au moins deux antécédents, $4$ et $0$.\n⛔ Le piège : calculer $(3 \\times 2)^2 = 36$. Le carré ne porte que sur la parenthèse ; le $3$ multiplie APRÈS.",
          // g(x) = 3(x − 2)² − 5 = 3x² − 12x + 7 : l'horizontale y = 7 coupe deux fois.
          schema: repere([-1, 5, -6, 9], [{ q: [3, -12, 7] }], [{ x: 0, y: 7 }, { x: 4, y: 7 }, { x: 2, y: -5 }], 7),
          micros: ["fonction_image_formule", "fonction_vocabulaire"],
        },
        {
          enonce: "Soit $f(x) = 5x - 8$. Trouver l'antécédent de :\na) $12$\nb) $-3$\nc) $0$",
          correction:
            "On pose l'ÉQUATION $f(x) = k$, et on la résout.\na) $5x - 8 = 12$ donne $5x = 20$, donc $x = 4$. Vérification : $5 \\times 4 - 8 = 12$. ✓\nb) $5x - 8 = -3$ donne $5x = 5$, donc $x = 1$.\nc) $5x - 8 = 0$ donne $5x = 8$, donc $x = \\dfrac{8}{5} = 1{,}6$.\n⛔ Le piège : calculer $f(12) = 52$. On ne cherche pas l'image de $12$, on cherche le nombre dont l'image est $12$.",
          schema: tableau(["x", "1", "1,6", "4"], ["f(x)", -3, 0, 12]),
          micros: ["fonction_antecedent"],
        },
        {
          enonce: "Soit $g(x) = x^2 - 3$. Trouver TOUS les antécédents de :\na) $1$\nb) $-3$\nc) $-5$",
          correction:
            "On résout $g(x) = k$ en isolant $x^2$.\na) $x^2 - 3 = 1$ donne $x^2 = 4$ : $x = 2$ ou $x = -2$. DEUX antécédents.\nb) $x^2 - 3 = -3$ donne $x^2 = 0$ : $x = 0$. UN seul antécédent.\nc) $x^2 - 3 = -5$ donne $x^2 = -2$. Un carré n'est jamais négatif : AUCUN antécédent.\n⭐ Deux, un, aucun : un antécédent n'est pas unique, et il peut ne pas exister. Sur la courbe, ce sont trois horizontales.\n⛔ Le piège au a) : oublier $-2$. $(-2)^2 = 4$ aussi.",
          // Les trois horizontales : deux points, un point (le sommet), aucun.
          // ⛔ D'abord écrit avec 11, −5 et −9 : 22 unités de haut, étiquettes
          // collées près de l'origine (vu au rendu, 21/09). Dix unités suffisent.
          schema: repere([-3, 3, -6, 4], [{ q: [1, 0, -3] }], [{ x: -2, y: 1 }, { x: 2, y: 1 }, { x: 0, y: -3 }], [1, -3, -5]),
          micros: ["fonction_antecedent"],
        },
        {
          enonce: "Donner le domaine de définition de chaque fonction.\na) $f(x) = \\dfrac{4}{x + 5}$\nb) $g(x) = \\sqrt{x - 3}$\nc) $h(x) = \\dfrac{x + 1}{2x - 6}$",
          correction:
            "On cherche les $x$ INTERDITS : ceux qui annulent un dénominateur, ceux qui rendent négatif ce qui est sous une racine.\na) $x + 5 = 0$ pour $x = -5$. Le domaine est $\\mathbb{R} \\setminus \\{-5\\}$.\nb) Il faut $x - 3 \\geqslant 0$, soit $x \\geqslant 3$. Le domaine est $[3\\,;\\,+\\infty[$.\nc) $2x - 6 = 0$ pour $x = 3$. Le domaine est $\\mathbb{R} \\setminus \\{3\\}$.\n⭐ Au b), $\\sqrt{0} = 0$ existe : $3$ est compris, le crochet est fermé.\n⛔ Le piège au c) : interdire $x = -1$. Le numérateur PEUT être nul, $h(-1) = 0$ ; seul le dénominateur ne le peut pas.",
          schema: droite(-1, 8, { de: 3, deInclus: true, label: "domaine de g" }),
          micros: ["fonction_domaine"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 4$.\na) Calculer les images de $-3$, $-2$, $-1$, $0$, $1$, $2$ et $3$, et les ranger dans un tableau de valeurs.\nb) Placer les sept points dans un repère, puis les relier par une courbe régulière.\nc) Lire dans le tableau les antécédents de $0$, puis ceux de $-3$.",
          correction:
            "a) $f(-3) = 9 - 4 = 5$, $f(-2) = 4 - 4 = 0$, $f(-1) = 1 - 4 = -3$, $f(0) = -4$. Puis, de l'autre côté, $f(1) = -3$, $f(2) = 0$ et $f(3) = 5$.\nb) Chaque colonne donne UN point : $(-3\\,;\\,5)$, $(-2\\,;\\,0)$, et ainsi de suite. On les relie par une courbe arrondie, pas par des segments : c'est une parabole.\nc) $0$ apparaît sous $-2$ et sous $2$ : ce sont ses antécédents. $-3$ apparaît sous $-1$ et sous $1$.\n⭐ Un nombre et son opposé ont la même image, car $(-x)^2 = x^2$ : la courbe est symétrique par rapport à l'axe des ordonnées.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["x", "−3", "−2", "−1", "0", "1", "2", "3"], ["f(x)", 5, 0, -3, -4, -3, 0, 5])}
              {repere([-4, 4, -5, 6], [{ q: [1, 0, -4] }], [
                { x: -3, y: 5 }, { x: -2, y: 0 }, { x: -1, y: -3 }, { x: 0, y: -4 }, { x: 1, y: -3 }, { x: 2, y: 0 }, { x: 3, y: 5 },
              ])}
            </div>
          ),
          micros: ["fonction_tableau_graphique", "fonction_image_formule"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-2\\,;\\,4]$. Lire graphiquement :\na) l'image de $2$ ;\nb) les solutions de $f(x) = 3$ ;\nc) les solutions de $f(x) = 4$ ;\nd) les solutions de $f(x) = 5$.",
          figure: repere([-2, 4, -6, 5], COURBE_8),
          correction:
            "a) On part de $2$ sur l'axe des abscisses, on monte jusqu'à la courbe, on lit l'ordonnée : $f(2) = 3$.\nb) On trace l'horizontale $y = 3$. Elle coupe la courbe en deux points, d'abscisses $0$ et $2$ : les solutions sont $x = 0$ et $x = 2$.\nc) L'horizontale $y = 4$ touche la courbe en un seul point, son sommet, d'abscisse $1$ : une seule solution, $x = 1$.\nd) L'horizontale $y = 5$ passe au-dessus de la courbe : AUCUNE solution.\n⛔ Le piège au b) : répondre $3$. Résoudre, c'est lire des ABSCISSES ; le $3$ est dans la question.",
          schema: repere([-2, 4, -6, 5], COURBE_8, [{ x: 0, y: 3 }, { x: 2, y: 3 }], 3),
          micros: ["fonction_resolution_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : calculer, résoudre, lire une courbe, comparer deux courbes.",
      rappel: [
        "Résoudre graphiquement $f(x) = k$ : on trace l'horizontale $y = k$ et on lit les ABSCISSES des points d'intersection.",
        "$f(x) < k$ : on garde les abscisses des points de la courbe situés SOUS l'horizontale. Crochet fermé si l'égalité est permise.",
        "$f(x) > g(x)$ : là où la courbe de $f$ est AU-DESSUS de celle de $g$. $f(x) = g(x)$ : aux points d'intersection.",
        "On choisit la forme de $f$ qui rend le calcul facile : développée, factorisée, ou avec un carré.",
      ],
      exercices: [
        {
          enonce: "Soit $h(x) = (x - 1)^2 - 4$.\na) Calculer $h(-1)$ et $h(0)$.\nb) Développer $h(x)$.\nc) Trouver les antécédents de $-3$ par $h$.\nd) Trouver les antécédents de $-4$ par $h$.",
          correction:
            "a) $h(-1) = (-2)^2 - 4 = 0$ et $h(0) = (-1)^2 - 4 = -3$.\nb) $h(x) = x^2 - 2x + 1 - 4 = x^2 - 2x - 3$.\nc) On part de la forme développée : $x^2 - 2x - 3 = -3$ donne $x^2 - 2x = 0$, soit $x(x - 2) = 0$.\nUn produit est nul si l'un de ses facteurs l'est : $x = 0$ ou $x = 2$. Deux antécédents, $0$ et $2$.\nd) Ici, c'est la forme de l'énoncé qui aide : $(x - 1)^2 - 4 = -4$ donne $(x - 1)^2 = 0$, donc $x = 1$. Un seul antécédent.\n⭐ On choisit la forme selon la question : développée au c), avec le carré au d).\n⛔ Le piège au c) : diviser par $x$, et perdre la solution $x = 0$.",
          // h(x) = x² − 2x − 3 : y = −3 coupe deux fois, y = −4 touche le sommet.
          schema: repere([-2, 4, -5, 6], [{ q: [1, -2, -3] }], [{ x: 0, y: -3 }, { x: 2, y: -3 }, { x: 1, y: -4 }], [-3, -4]),
          micros: ["fonction_image_formule", "fonction_antecedent"],
        },
        {
          enonce: "Soit $g(x) = x^2 - 3x + 2$, et $\\mathcal{C}_g$ sa courbe.\na) Les points $A(-1\\,;\\,6)$, $B(2\\,;\\,1)$ et $C(4\\,;\\,6)$ sont-ils sur $\\mathcal{C}_g$ ?\nb) Vérifier que $g(x) = (x - 1)(x - 2)$.\nc) En déduire les points où $\\mathcal{C}_g$ coupe l'axe des abscisses.",
          correction:
            "a) Un point est sur la courbe si son ordonnée est l'image de son abscisse.\n$g(-1) = 1 + 3 + 2 = 6$ : $A$ est sur $\\mathcal{C}_g$.\n$g(2) = 4 - 6 + 2 = 0$, et non $1$ : $B$ n'est pas sur $\\mathcal{C}_g$.\n$g(4) = 16 - 12 + 2 = 6$ : $C$ est sur $\\mathcal{C}_g$.\nb) $(x - 1)(x - 2) = x^2 - 2x - x + 2 = x^2 - 3x + 2$. ✓\nc) La courbe coupe l'axe des abscisses là où $g(x) = 0$, soit $(x - 1)(x - 2) = 0$ : $x = 1$ ou $x = 2$. Les points sont $(1\\,;\\,0)$ et $(2\\,;\\,0)$.\n⭐ $A$ et $C$ ont la même ordonnée : $6$ a deux antécédents, $-1$ et $4$.",
          schema: repere([-2, 5, -1, 8], [{ q: [1, -3, 2] }], [
            { x: -1, y: 6, label: "A" }, { x: 4, y: 6, label: "C" }, { x: 1, y: 0 }, { x: 2, y: 0 },
          ]),
          micros: ["fonction_vocabulaire", "fonction_antecedent"],
        },
        {
          enonce: "Donner le domaine de définition de chaque fonction.\na) $f(x) = \\sqrt{6 - 2x}$\nb) $g(x) = \\dfrac{1}{x^2 - 9}$\nc) $h(x) = \\dfrac{\\sqrt{x}}{x - 4}$",
          correction:
            "a) Sous la racine, il faut $6 - 2x \\geqslant 0$, soit $-2x \\geqslant -6$. On divise par $-2$, négatif : le sens se retourne, $x \\leqslant 3$. Le domaine est $]{-\\infty}\\,;\\,3]$.\nb) Le dénominateur s'annule quand $x^2 = 9$, c'est-à-dire pour $x = 3$ ou $x = -3$. Le domaine est $\\mathbb{R} \\setminus \\{-3\\,;\\,3\\}$.\nc) Deux conditions à la fois : $x \\geqslant 0$ pour la racine, et $x \\neq 4$ pour le dénominateur. Le domaine est $[0\\,;\\,4[ \\cup ]4\\,;\\,+\\infty[$.\n⛔ Le piège au b) : n'interdire que $3$. $(-3)^2 = 9$ aussi.",
          schema: droite(-2, 7, { a: 3, aInclus: true, label: "domaine de f" }),
          micros: ["fonction_domaine"],
        },
        {
          enonce: "Voici la courbe de $f$, définie sur $[-2\\,;\\,4]$. Résoudre graphiquement :\na) $f(x) = 1$\nb) $f(x) \\leqslant 1$\nc) $f(x) > 1$\nd) $f(x) = -4$",
          figure: repere([-2, 4, -4, 7], COURBE_12),
          correction:
            "a) L'horizontale $y = 1$ coupe la courbe aux points d'abscisses $-1$ et $3$ : $x = -1$ ou $x = 3$.\nb) On garde les $x$ dont le point de la courbe est SOUS l'horizontale, ou sur elle : $[-1\\,;\\,3]$. Crochets fermés, car l'égalité est permise.\nc) Cette fois, le point doit être strictement AU-DESSUS : $[-2\\,;\\,-1[ \\cup ]3\\,;\\,4]$.\nd) Le point le plus bas de la courbe est à l'ordonnée $-3$ : l'horizontale $y = -4$ ne la rencontre pas. AUCUNE solution.\n⭐ Les solutions du b) et du c) se partagent tout le domaine : chaque $x$ est dans l'un OU dans l'autre.\n⛔ Le piège au c) : écrire $]{-\\infty}\\,;\\,-1[$. La fonction n'est définie que sur $[-2\\,;\\,4]$ : les solutions commencent à $-2$.",
          schema: repere([-2, 4, -4, 7], COURBE_12, [{ x: -1, y: 1 }, { x: 3, y: 1 }], 1),
          micros: ["fonction_resolution_graphique"],
        },
        {
          enonce: "Sur $[-2\\,;\\,3]$, on a tracé la courbe de $f(x) = x^2 - 1$ (en bleu) et celle de $g(x) = x + 1$ (en orange).\na) Résoudre graphiquement $f(x) = g(x)$.\nb) Résoudre graphiquement $f(x) < g(x)$.\nc) Résoudre graphiquement $f(x) \\geqslant g(x)$.\nd) Vérifier par le calcul que $f(x) - g(x) = (x - 2)(x + 1)$, et retrouver le a).",
          figure: repere([-2, 3, -2, 8], COURBES_13),
          correction:
            "a) Les deux courbes se coupent aux points d'abscisses $-1$ et $2$ : $x = -1$ ou $x = 2$.\nb) La parabole est SOUS la droite entre ces deux points : $]{-1}\\,;\\,2[$. Crochets ouverts, car l'inégalité est stricte.\nc) Ailleurs, la parabole est au-dessus de la droite, ou la touche : $[-2\\,;\\,-1] \\cup [2\\,;\\,3]$.\nd) $f(x) - g(x) = x^2 - 1 - x - 1 = x^2 - x - 2$. Et $(x - 2)(x + 1) = x^2 + x - 2x - 2 = x^2 - x - 2$. ✓\nLe produit est nul pour $x = 2$ ou $x = -1$ : ce sont bien les abscisses lues au a).\n⛔ Le piège au d) : écrire $x^2 - 1 - x + 1$. Le moins porte sur TOUTE l'expression de $g$ : $-(x + 1) = -x - 1$.",
          schema: repere([-2, 3, -2, 8], COURBES_13, [{ x: -1, y: 0 }, { x: 2, y: 3 }]),
          micros: ["fonction_comparer_courbes"],
        },
        {
          enonce: "Traduire chaque phrase par une égalité.\na) L'image de $4$ par $f$ est $-1$.\nb) $-3$ est un antécédent de $0$ par $g$.\nc) La courbe de $h$ passe par le point $A(2\\,;\\,5)$.\nd) On sait de plus que $f(x) = ax + 3$. Trouver $a$ grâce au a).",
          correction:
            "a) $f(4) = -1$.\nb) L'image de $-3$ est $0$ : $g(-3) = 0$.\nc) L'image de $2$ par $h$ est $5$ : $h(2) = 5$.\nd) Le a) donne $f(4) = -1$, soit $4a + 3 = -1$. Donc $4a = -4$ et $a = -1$ : $f(x) = -x + 3$.\n⭐ On vérifie le d) : $f(4) = -4 + 3 = -1$. ✓\n⛔ Le piège au b) : écrire $g(0) = -3$. L'antécédent est ce qu'on met DANS la parenthèse.",
          // La droite de f(x) = −x + 3, et le point (4 ; −1) du a).
          schema: repere([-2, 5, -3, 6], [{ q: [0, -1, 3] }], [{ x: 4, y: -1 }]),
          micros: ["fonction_vocabulaire", "fonction_image_formule"],
        },
        {
          enonce: "Soit $f(x) = 2x^2 - 3x - 5$. Calculer les valeurs EXACTES de :\na) $f(-1)$\nb) $f\\left(\\dfrac{1}{2}\\right)$\nc) $f(\\sqrt{2})$\nd) $f\\left(\\dfrac{5}{2}\\right)$. Que remarque-t-on avec le a) ?",
          correction:
            "a) $f(-1) = 2 \\times 1 + 3 - 5 = 0$.\nb) $f\\left(\\dfrac{1}{2}\\right) = 2 \\times \\dfrac{1}{4} - \\dfrac{3}{2} - 5 = \\dfrac{1}{2} - \\dfrac{3}{2} - 5 = -6$.\nc) $f(\\sqrt{2}) = 2 \\times 2 - 3\\sqrt{2} - 5 = -1 - 3\\sqrt{2}$.\nd) $f\\left(\\dfrac{5}{2}\\right) = 2 \\times \\dfrac{25}{4} - \\dfrac{15}{2} - 5 = \\dfrac{25}{2} - \\dfrac{15}{2} - 5 = 0$.\nAvec le a) : $-1$ et $\\dfrac{5}{2}$ sont deux antécédents de $0$.\n⭐ Une valeur EXACTE garde $\\sqrt{2}$. Écrire $-5{,}24$ donnerait une valeur approchée.\n⛔ Le piège au c) : $(\\sqrt{2})^2 = 2$, donc $2 \\times 2 = 4$. Et $-1 - 3\\sqrt{2}$ ne se réduit pas : un nombre et un multiple de $\\sqrt{2}$ ne s'additionnent pas.",
          // f(x) = 2x² − 3x − 5 : elle coupe l'axe en −1 et 5/2.
          schema: repere([-2, 3, -8, 9], [{ q: [2, -3, -5] }], [{ x: -1, y: 0 }, { x: 2.5, y: 0 }, { x: 0.5, y: -6 }]),
          micros: ["fonction_image_formule", "fonction_antecedent"],
        },
        {
          enonce: "Une station météo de montagne a relevé la température une nuit de janvier, d'heure en heure.\na) Placer les sept points dans un repère (l'heure en abscisse, la température en ordonnée), et les relier par des segments.\nb) À quelles heures faisait-il $-1$ °C ?\nc) Quelle a été la température la plus basse de la nuit, et à quelle heure ?\nd) D'après le graphique, entre quelles heures a-t-il gelé (température négative) ?",
          figure: tableau(["Heure", "0", "1", "2", "3", "4", "5", "6"], ["T (°C)", 3, 1, 0, -1, -2, -1, 1], true),
          correction:
            "a) Chaque colonne donne un point : $(0\\,;\\,3)$, $(1\\,;\\,1)$, $(2\\,;\\,0)$, et ainsi de suite jusqu'à $(6\\,;\\,1)$. La température est une fonction de l'heure : à chaque heure, UNE température.\nb) $-1$ apparaît deux fois dans la ligne du bas, sous $3$ h et sous $5$ h : deux antécédents, $3$ et $5$.\nc) La plus petite valeur de la ligne est $-2$ °C, relevée à $4$ h.\nd) Le graphique passe sous l'axe juste après $2$ h. Il remonte au-dessus à $5$ h $30$ : le segment qui va de $(5\\,;\\,-1)$ à $(6\\,;\\,1)$ coupe l'axe en son milieu. Il a gelé de $2$ h à $5$ h $30$ environ.\n⛔ Le piège au d) : répondre « de $2$ h à $6$ h ». À $6$ h, il fait déjà $1$ °C. Et le « environ » compte : entre deux relevés, le segment n'est qu'une estimation.",
          schema: repere([0, 6, -3, 4], [{ pts: RELEVES_16 }], RELEVES_16.map(([x, y]) => ({ x, y }))),
          micros: ["fonction_tableau_graphique", "fonction_antecedent", "fonction_resolution_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. On calcule, on lit, et on répond par une phrase avec son unité.",
      rappel: [
        "Dans une situation concrète, le domaine est celui qui a un SENS : un temps, une vitesse, une longueur sont positifs.",
        "On répond à la question posée, avec son unité : « $t = 1$ » ne suffit pas, « au bout d'une seconde » oui.",
        "Un tableau ne donne que ses colonnes. Entre deux colonnes, un graphique donne une ESTIMATION.",
      ],
      exercices: [
        {
          titre: "Le plongeon de 10 mètres",
          enonce: "Une plongeuse s'élance d'un plongeoir de $10$ m. Sa hauteur au-dessus de l'eau, en mètres, $t$ secondes après le saut, est $h(t) = -5t^2 + 5t + 10$.\na) Calculer $h(0)$. Que représente ce nombre ?\nb) Calculer $h(0{,}5)$. On admet que c'est le point le plus haut du saut.\nc) Calculer $h(2)$, et interpréter.\nd) Résoudre $h(t) = 10$. Que se passe-t-il à ces instants ?\ne) Sur quel intervalle la fonction $h$ a-t-elle un sens ?",
          correction:
            "a) $h(0) = 10$ : au départ, elle est à $10$ m, sur le plongeoir.\nb) $h(0{,}5) = -5 \\times 0{,}25 + 2{,}5 + 10 = 11{,}25$ : le sommet du saut est à $11{,}25$ m, un peu plus d'un mètre au-dessus du plongeoir.\nc) $h(2) = -20 + 10 + 10 = 0$ : au bout de $2$ secondes, elle entre dans l'eau.\nd) $-5t^2 + 5t + 10 = 10$ donne $-5t^2 + 5t = 0$, soit $5t(1 - t) = 0$. Donc $t = 0$ ou $t = 1$.\nÀ $t = 0$, elle quitte le plongeoir. Au bout d'une seconde, elle repasse à sa hauteur, en descendant.\ne) Le temps commence au saut et s'arrête à l'entrée dans l'eau : $h$ a un sens sur $[0\\,;\\,2]$.\n⛔ Le piège au d) : simplifier par $t$, et perdre $t = 0$. On factorise, on ne divise pas.",
          schema: repere([0, 2, -2, 12], [{ q: [-5, 5, 10] }], [{ x: 0, y: 10 }, { x: 0.5, y: 11.25 }, { x: 1, y: 10 }, { x: 2, y: 0 }]),
          micros: ["fonction_image_formule", "fonction_antecedent", "fonction_domaine"],
        },
        {
          titre: "Les panneaux solaires",
          enonce: "Une maison équipée de panneaux solaires, un jour d'été. En orange, la courbe en cloche donne la puissance produite $P(t)$ par les panneaux ; en bleu, la puissance consommée $C(t)$ par la maison. Les deux sont en kilowatts (kW), et $t$ est l'heure, de $6$ h à $20$ h.\na) Lire $P(10)$ et $C(10)$.\nb) Résoudre graphiquement $P(t) = 3$.\nc) Résoudre graphiquement $P(t) = C(t)$.\nd) Résoudre graphiquement $P(t) > C(t)$. Que signifie ce résultat pour la maison ?",
          figure: repere([6, 20, -1, 5], SOLAIRE_18),
          correction:
            "a) À $10$ h : $P(10) = 3$ kW et $C(10) = 1$ kW. La maison produit trois fois ce qu'elle consomme.\nb) L'horizontale $y = 3$ coupe la cloche deux fois, à $10$ h et à $16$ h : $t = 10$ ou $t = 16$.\nc) Les deux courbes se rejoignent à $8$ h et à $18$ h : $t = 8$ ou $t = 18$.\nd) La cloche est au-dessus de la courbe bleue entre ces deux heures : $]8\\,;\\,18[$.\nDe $8$ h à $18$ h, les panneaux produisent PLUS que la maison ne consomme : le surplus peut charger une batterie ou partir sur le réseau. Tôt le matin et le soir, c'est l'inverse.\n⛔ Le piège au d) : lire où la cloche est au-dessus de l'AXE, soit $]6\\,;\\,20[$. On compare les deux courbes entre elles.",
          schema: repere([6, 20, -1, 5], SOLAIRE_18, [{ x: 8, y: 1 }, { x: 18, y: 1 }]),
          micros: ["fonction_vocabulaire", "fonction_resolution_graphique", "fonction_comparer_courbes"],
        },
        {
          titre: "La distance de freinage",
          enonce: "Sur route sèche, on modélise la distance de freinage d'une voiture par $d(v) = 0{,}005v^2$, où $v$ est la vitesse en km/h et $d(v)$ la distance en mètres.\na) Calculer $d(50)$ et $d(100)$. La vitesse double : que devient la distance ?\nb) Calculer $d(130)$, la distance à la vitesse maximale sur autoroute.\nc) Trouver l'antécédent de $32$. Interpréter.\nd) L'équation $0{,}005v^2 = 32$ a pourtant deux solutions. Pourquoi n'en garde-t-on qu'une ?",
          correction:
            "a) $d(50) = 0{,}005 \\times 2\\,500 = 12{,}5$ m et $d(100) = 0{,}005 \\times 10\\,000 = 50$ m.\nLa vitesse double, et la distance est multipliée par $4$ : $50 = 4 \\times 12{,}5$. Doubler un nombre multiplie son carré par $4$.\nb) $d(130) = 0{,}005 \\times 16\\,900 = 84{,}5$ m : plus des trois quarts d'un terrain de football, sans compter le temps de réaction.\nc) $0{,}005v^2 = 32$ donne $v^2 = 6\\,400$, donc $v = 80$. À $80$ km/h, la voiture freine sur $32$ m.\nd) $v^2 = 6\\,400$ donne aussi $v = -80$. Mais une vitesse est positive : $d$ est définie sur $[0\\,;\\,+\\infty[$, et $-80$ n'est pas dans son domaine.\n⛔ Le piège au a) : croire que la distance double avec la vitesse. C'est le carré qui compte : quelques km/h de trop changent tout.",
          schema: tableau(["v (km/h)", "50", "80", "100", "130"], ["d (m)", "12,5", 32, 50, "84,5"], true),
          micros: ["fonction_image_formule", "fonction_antecedent", "fonction_domaine"],
        },
        {
          titre: "Le CO₂ de l'atmosphère",
          enonce: "Depuis 1958, l'observatoire de Mauna Loa, à Hawaï, mesure la concentration de CO₂ dans l'air, en parties par million (ppm). Le tableau donne la moyenne de quelques années. On note $C$ la fonction qui, à une année, associe cette concentration.\na) Quelle est l'image de $2000$ par $C$ ?\nb) Quel est l'antécédent de $414$ ?\nc) De combien la concentration a-t-elle augmenté de $1960$ à $1980$ ? Et de $2000$ à $2020$ ?\nd) Le tableau permet-il de connaître $C(2010)$ ? Donner une estimation.",
          figure: tableau(["Année", "1960", "1980", "2000", "2020", "2024"], ["CO₂ (ppm)", 317, 339, 370, 414, 425], true),
          correction:
            "a) On lit sous $2000$ : $C(2000) = 370$ ppm.\nb) $414$ est sous $2020$ : son antécédent est $2020$.\nc) De $1960$ à $1980$ : $339 - 317 = 22$ ppm. De $2000$ à $2020$ : $414 - 370 = 44$ ppm.\nSur deux périodes de $20$ ans, l'augmentation a DOUBLÉ : le CO₂ ne monte pas seulement, il monte de plus en plus vite.\nd) Non : un tableau ne donne que ses colonnes. En reliant $(2000\\,;\\,370)$ et $(2020\\,;\\,414)$ par un segment, on lit au milieu $\\dfrac{370 + 414}{2} = 392$ ppm : c'est une ESTIMATION.\nLa mesure réelle de $2010$ est $390$ ppm : l'estimation est proche, mais elle reste une estimation.\n⭐ Pour comparer : avant l'ère industrielle, l'air contenait environ $280$ ppm de CO₂.",
          micros: ["fonction_tableau_graphique", "fonction_vocabulaire", "fonction_antecedent"],
        },
      ],
    },
  ],
};
