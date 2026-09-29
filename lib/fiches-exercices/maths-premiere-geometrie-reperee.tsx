// ─── Fiche d'exercices : géométrie repérée (1re spé) ─────────────────────────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, une par notion du coach. Alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/geometrie-reperee.bank.ts`
// (notionId geometrie_reperee, dix micros).
//
// ⭐⭐ LE FIL : LE PRODUIT SCALAIRE ÉCRIT LES FIGURES EN ÉQUATIONS. Une droite,
// c'est un point et un vecteur NORMAL (AM·n = 0) ; un cercle, c'est ΩM² = r² ;
// le plus court chemin vers une droite, c'est le projeté orthogonal. Le repère
// transforme alors une question de géométrie en calcul.
//
// ⛔ Rien n'est repris des feuilles de seconde « Droites du plan » (randonneurs,
// billetterie, triangle de carton, bateau et rocher) ni « Repère du plan »
// (ville quadrillée, terrain de football, antennes, pré au GPS). La seconde
// passe par l'équation réduite et le vecteur directeur ; la première par le
// vecteur NORMAL, le projeté et le cercle.
//
// ⭐ Chaque exercice a son dessin : droites tracées depuis leur équation
// (`droites`), vecteurs normaux et directeurs en flèches, cercles et paraboles
// en polylignes dans une fenêtre CARRÉE (`cercle`, `parabole`), paraboles de
// fonction dans `repere`. Treize sont imprimés ; les sept autres restent à
// l'écran (`ecranSeulement`) pour tenir le PDF en douze pages.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-premiere-spe-geometrie-reperee.mjs`.
//
// Micro-compétences : gr_vecteur_normal (1, 9, 13, 20), gr_vecteur_directeur
// (2, 10), gr_equation_droite (3, 9, 15, 16, 18, 20), gr_droites (4, 10, 15),
// gr_projete (5, 10, 13, 17, 20), gr_cercle (6, 11, 16, 18, 19),
// gr_cercle_reconnaitre (7, 12, 17), gr_cercle_utiliser (11, 12, 15, 16, 17,
// 18), gr_parabole (8, 14, 19), gr_configuration (9, 14, 15, 18, 19, 20).
// 10/10.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, droites, repere, type Fleche } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const GRIS = "#94a3b8";

/** À l'écran seulement : le PDF garde treize dessins, ceux qui portent la réponse. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Un CERCLE de centre (cx ; cy) et de rayon r, en 48 segments. `droites()` n'a
 * pas de cercle, mais sa fenêtre est CARRÉE : il y reste rond.
 * ⭐ Centre et rayon en clair dans l'appel : le script de recalcul les relit.
 */
const cercle = (cx: number, cy: number, r: number, couleur: string = ORANGE): Fleche[] =>
  Array.from({ length: 48 }, (_, k) => {
    const p = (j: number): [number, number] => [
      +(cx + r * Math.cos((j * Math.PI) / 24)).toFixed(3),
      +(cy + r * Math.sin((j * Math.PI) / 24)).toFixed(3),
    ];
    return { de: p(k), vers: p(k + 1), couleur, pointe: false };
  });

/** La parabole y = ax² + bx + c pour x de `de` à `jusqua`, en 40 segments,
 *  quand elle doit partager la fenêtre carrée d'un cercle. Coefficients en clair. */
const parabole = (a: number, b: number, c: number, de: number, jusqua: number, couleur: string = BLEU): Fleche[] =>
  Array.from({ length: 40 }, (_, k) => {
    const p = (j: number): [number, number] => {
      const x = de + ((jusqua - de) * j) / 40;
      return [+x.toFixed(3), +(a * x * x + b * x + c).toFixed(3)];
    };
    return { de: p(k), vers: p(k + 1), couleur, pointe: false };
  });

export const exercicesGeometrieRepereePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "geometrie-reperee",
  titre: "Géométrie repérée",
  accroche:
    "Vingt exercices, du vecteur normal au problème de contrôle : équations cartésiennes de droites, projeté orthogonal, équations de cercles, axe et sommet d'une parabole. Une école entre deux villages, un nageur qui rejoint la plage, un arroseur de jardin, un radar, un laser et son miroir. Un rappel de cours avant chaque niveau ; chaque correction dessine ses droites et ses cercles.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Pour la droite $ax + by + c = 0$ : $\\vec{n}\\,(a\\,;\\,b)$ est un vecteur NORMAL et $\\vec{u}\\,(-b\\,;\\,a)$ un vecteur directeur. Deux droites sont perpendiculaires quand leurs vecteurs normaux sont orthogonaux, parallèles quand ils sont colinéaires.",
        "Droite passant par $A$, de vecteur normal $\\vec{n}$ : les points $M$ tels que $\\vec{AM} \\cdot \\vec{n} = 0$. Projeté orthogonal de $M$ sur cette droite : le point $H$ de la droite tel que $\\vec{MH}$ soit colinéaire à $\\vec{n}$.",
        "Cercle de centre $\\Omega(a\\,;\\,b)$ et de rayon $r$ : $(x - a)^2 + (y - b)^2 = r^2$. Devant $x^2 + y^2 + \\ldots = 0$, on complète les carrés.",
        "Parabole $y = ax^2 + bx + c$ : son axe de symétrie est la droite $x = -\\dfrac{b}{2a}$, et son sommet est sur cet axe.",
      ],
      exercices: [
        {
          enonce: "Donner un vecteur normal à chaque droite :\na) $d_1 : 2x - 3y + 5 = 0$ ;\nb) $d_2 : y = 4x - 1$ ;\nc) $d_3 : x = 3$.\nd) Le vecteur $\\vec{m}\\,(-4\\,;\\,6)$ est-il normal à $d_1$ ?",
          correction:
            "Pour $ax + by + c = 0$, le vecteur $\\vec{n}\\,(a\\,;\\,b)$ est normal : on lit les coefficients de $x$ et de $y$.\na) $\\vec{n_1}\\,(2\\,;\\,-3)$.\nb) On passe d'abord à la forme cartésienne : $4x - y - 1 = 0$. Donc $\\vec{n_2}\\,(4\\,;\\,-1)$.\nc) $x - 3 = 0$ s'écrit $1x + 0y - 3 = 0$ : $\\vec{n_3}\\,(1\\,;\\,0)$, horizontal, perpendiculaire à cette droite verticale.\nd) $\\vec{m} = -2\\,\\vec{n_1}$ : colinéaire à un vecteur normal, il est normal lui aussi.\n⚠️ Le signe fait partie de la coordonnée : $-3y$ donne $-3$, pas $3$.\n⭐ Sur le dessin, $\\vec{n_1}$ (en vert) fait un angle droit avec $d_1$.",
          schema: ecranSeulement(droites([-3, 5], [{ a: 2, b: -3, c: 5 }], [], [{ de: [2, 3], vers: [4, 0], couleur: VERT }])),
          micros: ["gr_vecteur_normal"],
        },
        {
          enonce: "a) Donner un vecteur directeur de la droite $d : 3x + 2y - 6 = 0$.\nb) Le vecteur $\\vec{w}\\,(4\\,;\\,-6)$ dirige-t-il $d$ ?\nc) Donner un vecteur directeur de $d' : 5x - y + 2 = 0$, puis son coefficient directeur.",
          correction:
            "Pour $ax + by + c = 0$, le vecteur $\\vec{u}\\,(-b\\,;\\,a)$ est directeur : il est orthogonal au vecteur normal $(a\\,;\\,b)$, car $a \\times (-b) + b \\times a = 0$.\na) $a = 3$ et $b = 2$ : $\\vec{u}\\,(-2\\,;\\,3)$.\nb) $\\vec{w} = -2\\,\\vec{u}$ : colinéaire à $\\vec{u}$, il dirige aussi $d$.\nc) $a = 5$ et $b = -1$ : $\\vec{u'}\\,(1\\,;\\,5)$. En avançant de $1$, on monte de $5$ : le coefficient directeur est $5$.\n⚠️ On échange les coordonnées ET on change un signe : $(2\\,;\\,3)$ et $(3\\,;\\,2)$ sont faux.\n⭐ Sur le dessin : partir d'un point de $d$ et suivre $\\vec{u}$ (en vert) ramène sur $d$.",
          schema: ecranSeulement(droites([-3, 5], [{ a: 3, b: 2, c: -6 }], [], [{ de: [2, 0], vers: [0, 3], couleur: VERT }])),
          micros: ["gr_vecteur_directeur"],
        },
        {
          enonce: "Déterminer une équation cartésienne :\na) de la droite passant par $A(1\\,;\\,-2)$ et de vecteur normal $\\vec{n}\\,(3\\,;\\,1)$ ;\nb) de la droite passant par $B(-2\\,;\\,1)$ et de vecteur normal $\\vec{m}\\,(1\\,;\\,-2)$.",
          correction:
            "Méthode : $M(x\\,;\\,y)$ est sur la droite si et seulement si $\\vec{AM} \\cdot \\vec{n} = 0$.\na) $\\vec{AM}\\,(x - 1\\,;\\,y + 2)$, donc $3(x - 1) + 1 \\times (y + 2) = 0$, soit $3x + y - 1 = 0$.\n✔️ $A$ vérifie : $3 \\times 1 + (-2) - 1 = 0$.\nb) Plus rapide : on lit $\\vec{m}$, l'équation est $x - 2y + c = 0$, et $B$ doit la vérifier : $-2 - 2 \\times 1 + c = 0$, donc $c = 4$.\nD'où $x - 2y + 4 = 0$.\n⚠️ Le vecteur normal donne $a$ et $b$ ; c'est le POINT qui donne $c$. L'oublier, c'est tracer une parallèle à côté.",
          schema: ecranSeulement(
            droites(
              [-4, 5],
              [{ a: 3, b: 1, c: -1 }, { a: 1, b: -2, c: 4, couleur: ORANGE }],
              [{ x: 1, y: -2, label: "A" }, { x: -2, y: 1, label: "B" }],
              [{ de: [1, -2], vers: [4, -1], couleur: VERT }, { de: [-2, 1], vers: [-1, -1], couleur: VERT }],
            ),
          ),
          micros: ["gr_equation_droite"],
        },
        {
          enonce: "On donne $d_1 : 2x - y + 1 = 0$, $d_2 : x + 2y - 4 = 0$ et $d_3 : 4x - 2y + 7 = 0$. Lesquelles sont parallèles ? Lesquelles sont perpendiculaires ?",
          correction:
            "On compare les vecteurs normaux : $\\vec{n_1}\\,(2\\,;\\,-1)$, $\\vec{n_2}\\,(1\\,;\\,2)$ et $\\vec{n_3}\\,(4\\,;\\,-2)$.\n$\\vec{n_3} = 2\\,\\vec{n_1}$ : ces normaux sont colinéaires, donc $d_1$ et $d_3$ sont PARALLÈLES.\nElles ne sont pas confondues : le point $(0\\,;\\,1)$ de $d_1$ donne $4 \\times 0 - 2 \\times 1 + 7 = 5$, pas $0$, dans $d_3$.\n$\\vec{n_1} \\cdot \\vec{n_2} = 2 \\times 1 + (-1) \\times 2 = 0$ : les normaux sont orthogonaux, donc $d_1$ et $d_2$ sont PERPENDICULAIRES.\nComme $d_3$ est parallèle à $d_1$, elle est aussi perpendiculaire à $d_2$.\n⭐ Sur le dessin : $d_1$ en bleu, $d_2$ en orange, $d_3$ en vert.",
          schema: ecranSeulement(droites([-3, 5], [{ a: 2, b: -1, c: 1 }, { a: 1, b: 2, c: -4, couleur: ORANGE }, { a: 4, b: -2, c: 7, couleur: VERT }])),
          micros: ["gr_droites"],
        },
        {
          enonce: "Soit la droite $d : x - 2y + 1 = 0$ et le point $M(4\\,;\\,5)$. Déterminer les coordonnées du projeté orthogonal $H$ de $M$ sur $d$, puis la distance $MH$.",
          correction:
            "$H$ est sur $d$, et $\\vec{MH}$ est NORMAL à $d$, donc colinéaire à $\\vec{n}\\,(1\\,;\\,-2)$.\nOn écrit $H = M + t\\,\\vec{n}$, soit $H(4 + t\\,;\\,5 - 2t)$.\n$H$ est sur $d$ : $(4 + t) - 2(5 - 2t) + 1 = 0$, soit $5t - 5 = 0$, donc $t = 1$.\n$H(5\\,;\\,3)$. ✔️ $5 - 2 \\times 3 + 1 = 0$.\nDistance : $\\vec{MH}\\,(1\\,;\\,-2)$, donc $MH = \\sqrt{1 + 4} = \\sqrt{5} \\approx 2{,}24$.\n⭐ $H$ est le point de $d$ le plus proche de $M$ : $MH$ est la distance de $M$ à la droite.\n⚠️ Le point de $d$ de même abscisse que $M$, $(4\\,;\\,2{,}5)$, n'est pas le projeté : il faut la perpendiculaire.",
          schema: droites([-2, 7], [{ a: 1, b: -2, c: 1 }], [{ x: 4, y: 5, label: "M" }, { x: 5, y: 3, label: "H" }], [{ de: [4, 5], vers: [5, 3], couleur: VERT, pointe: false }]),
          micros: ["gr_projete"],
        },
        {
          enonce: "Déterminer une équation du cercle :\na) de centre $\\Omega(-2\\,;\\,2)$ et de rayon $2$ ;\nb) de centre $O$ et de rayon $\\sqrt{5}$ ;\nc) de centre $A(3\\,;\\,-1)$ et passant par $B(0\\,;\\,3)$.",
          correction:
            "Le cercle de centre $\\Omega(a\\,;\\,b)$ et de rayon $r$ a pour équation $(x - a)^2 + (y - b)^2 = r^2$ : c'est $\\Omega M^2 = r^2$ écrit en coordonnées.\na) $(x - (-2))^2 + (y - 2)^2 = 2^2$, soit $(x + 2)^2 + (y - 2)^2 = 4$.\nb) $x^2 + y^2 = 5$, car $(\\sqrt{5})^2 = 5$.\nc) Le rayon est la distance $AB$ : $\\vec{AB}\\,(-3\\,;\\,4)$, donc $AB = \\sqrt{9 + 16} = 5$.\nÉquation : $(x - 3)^2 + (y + 1)^2 = 25$.\n⚠️ À droite, c'est $r^2$ et pas $r$ : écrire $= 2$ au a) donnerait le cercle de rayon $\\sqrt{2}$.\n⚠️ Le centre $(-2\\,;\\,2)$ donne $(x + 2)$ : le signe s'inverse dans la parenthèse.",
          schema: ecranSeulement(droites([-5, 5], [], [{ x: -2, y: 2, label: "Ω" }], [...cercle(-2, 2, 2)])),
          micros: ["gr_cercle"],
        },
        {
          enonce: "Ces équations sont-elles celles d'un cercle ? Si oui, donner son centre et son rayon.\na) $x^2 + y^2 - 2x + 2y - 7 = 0$\nb) $x^2 + y^2 + 6x + 10 = 0$",
          correction:
            "On complète les carrés : $x^2 - 2x = (x - 1)^2 - 1$ et $y^2 + 2y = (y + 1)^2 - 1$.\na) L'équation devient $(x - 1)^2 - 1 + (y + 1)^2 - 1 - 7 = 0$, soit $(x - 1)^2 + (y + 1)^2 = 9$.\nC'est le cercle de centre $\\Omega(1\\,;\\,-1)$ et de rayon $\\sqrt{9} = 3$.\nb) $x^2 + 6x = (x + 3)^2 - 9$, donc $(x + 3)^2 - 9 + y^2 + 10 = 0$, soit $(x + 3)^2 + y^2 = -1$.\nUne somme de deux carrés n'est jamais négative : AUCUN point ne vérifie cette équation. Ce n'est pas un cercle.\n⚠️ On n'oublie pas de retirer le carré ajouté ($-1$, $-9$) : c'est l'erreur la plus fréquente.\n⭐ Une fois les carrés complétés : second membre positif, un cercle ; nul, un seul point ; négatif, rien.",
          schema: ecranSeulement(droites([-5, 5], [], [{ x: 1, y: -1, label: "Ω" }], [...cercle(1, -1, 3)])),
          micros: ["gr_cercle_reconnaitre"],
        },
        {
          enonce: "Déterminer l'axe de symétrie et le sommet de chaque parabole :\na) $\\mathcal{P}_1 : y = 2x^2 - 8x + 5$ ;\nb) $\\mathcal{P}_2 : y = -x^2 + 6x - 5$.",
          correction:
            "L'axe de symétrie de la parabole $y = ax^2 + bx + c$ est la droite verticale $x = -\\dfrac{b}{2a}$ ; le sommet est sur cet axe.\na) $x = -\\dfrac{-8}{2 \\times 2} = 2$. Ordonnée du sommet : $2 \\times 2^2 - 8 \\times 2 + 5 = 8 - 16 + 5 = -3$.\nAxe $x = 2$, sommet $S(2\\,;\\,-3)$. Comme $a = 2 > 0$, la parabole est tournée vers le haut : $S$ est son point le plus bas.\nb) $x = -\\dfrac{6}{2 \\times (-1)} = 3$. Ordonnée : $-9 + 18 - 5 = 4$.\nAxe $x = 3$, sommet $T(3\\,;\\,4)$. Tournée vers le bas ($a = -1 < 0$) : c'est le point le plus haut.\n✔️ Forme canonique du a) : $2(x - 2)^2 - 3$ ; en développant, $2x^2 - 8x + 8 - 3 = 2x^2 - 8x + 5$.\n⚠️ Avec $b = -8$, la formule $-\\dfrac{b}{2a}$ donne $+2$ : les deux signes moins se compensent.",
          schema: ecranSeulement(repere([-1, 6, -4, 6], [{ q: [2, -8, 5] }, { q: [-1, 6, -5], couleur: ORANGE }], [{ x: 2, y: -3, label: "S" }, { x: 3, y: 4, label: "T" }])),
          micros: ["gr_parabole"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "Médiatrice de $[AB]$ : la droite qui passe par le milieu de $[AB]$ et qui a $\\vec{AB}$ pour vecteur normal. Ses points sont à égale distance de $A$ et de $B$.",
        "Situer un point $M$ par rapport au cercle de centre $\\Omega$ et de rayon $r$ : on compare $\\Omega M^2$ à $r^2$. Plus petit : dedans ; égal : sur le cercle ; plus grand : dehors.",
        "Cercle de diamètre $[AB]$ : son centre est le milieu de $[AB]$, son rayon $\\dfrac{AB}{2}$. Un point $M$ y est si et seulement si $\\vec{MA} \\cdot \\vec{MB} = 0$.",
        "Tangente au cercle de centre $\\Omega$ en son point $A$ : la droite passant par $A$ et de vecteur normal $\\vec{\\Omega A}$.",
      ],
      exercices: [
        {
          enonce: "Deux villages sont repérés sur une carte (unité : le km) : $A(-2\\,;\\,1)$ et $B(4\\,;\\,3)$. Ils veulent construire une école à égale distance des deux, le long de la route d'équation $y = -1$.\na) Pourquoi $\\vec{AB}$ est-il un vecteur normal à la médiatrice de $[AB]$ ? Calculer ses coordonnées, et celles du milieu $I$ de $[AB]$.\nb) En déduire une équation cartésienne de la médiatrice.\nc) Où placer l'école $E$ ?\nd) Vérifier que $EA = EB$.",
          correction:
            "a) La médiatrice de $[AB]$ coupe $[AB]$ à angle droit : $\\vec{AB}$ est perpendiculaire à sa direction, c'est un vecteur NORMAL.\n$\\vec{AB}\\,(6\\,;\\,2)$ et $I\\left(\\dfrac{-2 + 4}{2}\\,;\\,\\dfrac{1 + 3}{2}\\right)$, soit $I(1\\,;\\,2)$.\nb) Équation $6x + 2y + c = 0$, et $I$ la vérifie : $6 + 4 + c = 0$, donc $c = -10$.\n$6x + 2y - 10 = 0$, qu'on simplifie par $2$ : $3x + y - 5 = 0$.\nc) L'école est sur la route, donc $y = -1$ : $3x - 1 - 5 = 0$ et $x = 2$. L'école va en $E(2\\,;\\,-1)$.\nd) $\\vec{EA}\\,(-4\\,;\\,2)$ et $\\vec{EB}\\,(2\\,;\\,4)$ : $EA = EB = \\sqrt{20} = 2\\sqrt{5} \\approx 4{,}47$ km. ✔️\n⭐ Tout point de la médiatrice est à égale distance de $A$ et de $B$ : il suffisait de la couper avec la route (en orange).\n⚠️ $\\vec{AB}$ est NORMAL à la médiatrice, pas directeur : écrire $2x - 6y + c = 0$, c'est tracer la droite $(AB)$ déplacée.",
          schema: droites(
            [-4, 6],
            [{ a: 3, b: 1, c: -5 }, { a: 0, b: 1, c: 1, couleur: ORANGE }],
            [{ x: -2, y: 1, label: "A" }, { x: 4, y: 3, label: "B" }, { x: 1, y: 2, label: "I" }, { x: 2, y: -1, label: "E" }],
            [{ de: [-2, 1], vers: [4, 3], couleur: VERT, pointe: false }],
          ),
          micros: ["gr_equation_droite", "gr_vecteur_normal", "gr_configuration"],
        },
        {
          enonce: "Sur une carte (unité : le km), une route droite a pour équation $d : x - 3y + 6 = 0$. Une ferme est en $F(4\\,;\\,0)$.\na) Donner un vecteur directeur $\\vec{u}$ de la route.\nb) On veut relier la ferme à la route par un chemin perpendiculaire à la route. Expliquer pourquoi $\\vec{u}$ est un vecteur normal du chemin, puis donner une équation du chemin.\nc) Calculer les coordonnées du point $H$ où le chemin rejoint la route, puis la longueur du chemin.\nd) On creuse aussi un canal parallèle à la route, passant par la ferme. Donner son équation.",
          correction:
            "a) $d : x - 3y + 6 = 0$, donc $a = 1$, $b = -3$ et $\\vec{u}\\,(-b\\,;\\,a) = (3\\,;\\,1)$.\nb) Le chemin est perpendiculaire à la route : la direction $\\vec{u}$ de la route est perpendiculaire au chemin. C'est donc un vecteur normal du chemin.\nÉquation : $3x + y + c = 0$, et $F$ la vérifie : $12 + 0 + c = 0$, donc $c = -12$. Chemin : $3x + y - 12 = 0$.\nc) $H$ est sur les deux droites. De la seconde, $y = 12 - 3x$ ; dans la première, $x - 3(12 - 3x) + 6 = 0$, soit $10x - 30 = 0$.\n$x = 3$, puis $y = 12 - 9 = 3$ : $H(3\\,;\\,3)$.\n$\\vec{FH}\\,(-1\\,;\\,3)$, donc $FH = \\sqrt{1 + 9} = \\sqrt{10} \\approx 3{,}16$ km. C'est le chemin le plus court : $H$ est le projeté orthogonal de $F$ sur la route.\nd) Parallèle à $d$ : même vecteur normal $(1\\,;\\,-3)$. Équation $x - 3y + c = 0$ avec $4 - 0 + c = 0$ : $x - 3y - 4 = 0$.\n⭐ Perpendiculaire : le directeur de l'une devient le normal de l'autre. Parallèle : on garde le même normal.\n⭐ Sur le dessin : la route en bleu, le chemin en vert, le canal en orange, $\\vec{u}$ en violet.",
          schema: droites(
            [-3, 6],
            [{ a: 1, b: -3, c: 6 }, { a: 3, b: 1, c: -12, couleur: VERT }, { a: 1, b: -3, c: -4, couleur: ORANGE }],
            [{ x: 4, y: 0, label: "F" }, { x: 3, y: 3, label: "H" }],
            [{ de: [0, 2], vers: [3, 3], couleur: VIOLET }],
          ),
          micros: ["gr_vecteur_directeur", "gr_droites", "gr_projete"],
        },
        {
          enonce: "Dans un jardin (unité : le mètre), un arroseur rotatif arrose exactement le disque de diamètre $[AB]$, avec $A(0\\,;\\,2)$ et $B(6\\,;\\,-2)$.\na) Donner le centre $\\Omega$ et le rayon du cercle de diamètre $[AB]$, puis son équation.\nb) Le rosier $R(5\\,;\\,3)$ est-il au bord de la zone arrosée ?\nc) La tomate $T(2\\,;\\,4)$ et le banc $P(4\\,;\\,-1)$ sont-ils arrosés ?\nd) Vérifier avec un produit scalaire que l'angle $\\widehat{ARB}$ est droit. Pourquoi était-ce prévisible ?",
          correction:
            "a) Le centre est le milieu de $[AB]$ : $\\Omega\\left(\\dfrac{0 + 6}{2}\\,;\\,\\dfrac{2 - 2}{2}\\right)$, soit $\\Omega(3\\,;\\,0)$.\nRayon : $\\Omega A^2 = (0 - 3)^2 + (2 - 0)^2 = 9 + 4 = 13$, donc $r = \\sqrt{13} \\approx 3{,}61$ m.\nÉquation : $(x - 3)^2 + y^2 = 13$.\nb) $(5 - 3)^2 + 3^2 = 4 + 9 = 13$ : $R$ vérifie l'équation. Il est sur le cercle, au bord de la zone.\nc) $T$ : $(2 - 3)^2 + 4^2 = 1 + 16 = 17 > 13$. La tomate est HORS de la zone.\n$P$ : $(4 - 3)^2 + (-1)^2 = 2 < 13$. Le banc est DANS la zone : il sera mouillé.\nd) $\\vec{RA}\\,(-5\\,;\\,-1)$ et $\\vec{RB}\\,(1\\,;\\,-5)$ : $\\vec{RA} \\cdot \\vec{RB} = -5 + 5 = 0$.\nC'était prévisible : un point du cercle de diamètre $[AB]$ voit $[AB]$ sous un angle droit.\n⭐ Pour situer un point, on compare $\\Omega M^2$ à $r^2$ : pas besoin de racine carrée.",
          schema: droites(
            [-4, 7],
            [],
            [
              { x: 0, y: 2, label: "A" },
              { x: 6, y: -2, label: "B" },
              { x: 3, y: 0, label: "Ω" },
              { x: 5, y: 3, label: "R" },
              { x: 2, y: 4, label: "T" },
              { x: 4, y: -1, label: "P" },
            ],
            [...cercle(3, 0, Math.sqrt(13))],
          ),
          micros: ["gr_cercle", "gr_cercle_utiliser"],
        },
        {
          enonce: "Dans un parc (unité : 10 m), le bord de la zone couverte par une borne wifi a pour équation $x^2 + y^2 - 4x - 2y - 4 = 0$.\na) Montrer que c'est un cercle. Donner son centre $\\Omega$ (la borne) et son rayon.\nb) Un banc est en $A(4\\,;\\,3)$. Capte-t-il le wifi ?\nc) L'allée des tilleuls a pour équation $y = 4$. Combien de points de cette allée sont sur le bord de la zone ?\nd) L'allée centrale a pour équation $y = 1$. Sur quelle longueur y capte-t-on le wifi ?",
          correction:
            "a) On complète les carrés : $x^2 - 4x = (x - 2)^2 - 4$ et $y^2 - 2y = (y - 1)^2 - 1$.\n$(x - 2)^2 - 4 + (y - 1)^2 - 1 - 4 = 0$, soit $(x - 2)^2 + (y - 1)^2 = 9$.\nC'est le cercle de centre $\\Omega(2\\,;\\,1)$ et de rayon $3$, soit $30$ m.\nb) $(4 - 2)^2 + (3 - 1)^2 = 8 < 9$ : le banc est dans la zone, il capte.\nc) Sur l'allée, $y = 4$ : $(x - 2)^2 + 9 = 9$, donc $(x - 2)^2 = 0$ et $x = 2$.\nUN seul point, $T(2\\,;\\,4)$ : l'allée (en vert) frôle la zone sans y entrer. Elle est tangente au cercle.\nd) Sur l'allée, $y = 1$ : $(x - 2)^2 = 9$, donc $x - 2 = 3$ ou $x - 2 = -3$, soit $x = 5$ ou $x = -1$.\nOn capte entre $(-1\\,;\\,1)$ et $(5\\,;\\,1)$ : $6$ unités, soit $60$ m. C'est un diamètre, puisque l'allée (en violet) passe par la borne.\n⚠️ $(x - 2)^2 = 9$ a DEUX solutions, $x - 2 = 3$ et $x - 2 = -3$ : oublier la seconde, c'est perdre la moitié de l'allée.",
          schema: droites(
            [-3, 6],
            [{ a: 0, b: 1, c: -4, couleur: VERT }, { a: 0, b: 1, c: -1, couleur: VIOLET }],
            [{ x: 2, y: 1, label: "Ω" }, { x: 4, y: 3, label: "A" }, { x: 2, y: 4, label: "T" }],
            [...cercle(2, 1, 3)],
          ),
          micros: ["gr_cercle_reconnaitre", "gr_cercle_utiliser"],
        },
        {
          enonce: "Un nageur fatigué est en $M(-2\\,;\\,6)$ (unité : 10 m). Le bord de la plage est rectiligne, d'équation $d : 3x - 4y + 5 = 0$.\na) Donner un vecteur normal $\\vec{n}$ à $d$.\nb) Le nageur veut rejoindre la plage au plus court. En quel point $H$ doit-il arriver ?\nc) Quelle distance doit-il nager ?\nd) Le poste de secours est en $L(5\\,;\\,5)$. Vérifier qu'il est sur la plage. Combien de mètres de plus nagerait-il pour y aller tout droit ?",
          correction:
            "a) $\\vec{n}\\,(3\\,;\\,-4)$.\nb) Le plus court chemin vers une droite est la perpendiculaire : $H$ est le projeté orthogonal de $M$ sur $d$.\n$\\vec{MH}$ est colinéaire à $\\vec{n}$ : $H(-2 + 3t\\,;\\,6 - 4t)$.\n$H$ est sur $d$ : $3(-2 + 3t) - 4(6 - 4t) + 5 = 0$, soit $25t - 25 = 0$, donc $t = 1$ et $H(1\\,;\\,2)$.\nc) $\\vec{MH} = \\vec{n}$, donc $MH = \\sqrt{9 + 16} = 5$ unités : $50$ m.\nd) $3 \\times 5 - 4 \\times 5 + 5 = 0$ : $L$ est sur la plage.\n$\\vec{ML}\\,(7\\,;\\,-1)$, donc $ML = \\sqrt{49 + 1} = \\sqrt{50} \\approx 7{,}07$ unités, soit environ $70{,}7$ m : à peu près $20{,}7$ m de plus.\n⭐ Une fois sur le sable, il marche de $H$ à $L$ : $HL = \\sqrt{16 + 9} = 5$ unités, soit $50$ m à pied.\n⚠️ Le point de la plage « en face », de même abscisse que $M$, est $(-2\\,;\\,-0{,}25)$ : ce n'est pas le plus proche, il faut la perpendiculaire.",
          schema: droites(
            [-3, 7],
            [{ a: 3, b: -4, c: 5 }],
            [{ x: -2, y: 6, label: "M" }, { x: 1, y: 2, label: "H" }, { x: 5, y: 5, label: "L" }],
            [{ de: [-2, 6], vers: [1, 2], couleur: VERT }, { de: [-2, 6], vers: [5, 5], couleur: ORANGE, pointe: false }],
          ),
          micros: ["gr_projete", "gr_vecteur_normal"],
        },
        {
          enonce: "L'arche d'un petit pont de pierre a la forme de la parabole $y = -0{,}25x^2 + 2x$, pour $x$ entre $0$ et $8$ (unité : le mètre ; l'axe des abscisses est la route).\na) Déterminer l'axe de symétrie et le sommet de l'arche.\nb) En déduire la forme canonique.\nc) Quelle est la largeur de l'arche au niveau de la route ?\nd) Une camionnette de $2$ m de large passe au milieu. Quelle hauteur ne doit-elle pas dépasser ?",
          correction:
            "a) $a = -0{,}25$ et $b = 2$ : l'axe est $x = -\\dfrac{b}{2a} = -\\dfrac{2}{-0{,}5} = 4$.\nSommet : $y = -0{,}25 \\times 16 + 2 \\times 4 = -4 + 8 = 4$, donc $S(4\\,;\\,4)$. L'arche culmine à $4$ m, au milieu.\nb) $y = -0{,}25(x - 4)^2 + 4$.\n✔️ En développant : $-0{,}25(x^2 - 8x + 16) + 4 = -0{,}25x^2 + 2x - 4 + 4$.\nc) Au niveau de la route, $y = 0$ : $-0{,}25x^2 + 2x = x(2 - 0{,}25x) = 0$, soit $x = 0$ ou $x = 8$. Largeur : $8$ m.\nPar symétrie aussi : $0$ et $8$ sont à égale distance de l'axe $x = 4$.\nd) La camionnette occupe $x \\in [3\\,;\\,5]$, centrée sur l'axe. L'arche est la plus basse au bord de la camionnette, en $x = 3$ (et en $x = 5$) :\n$y = -0{,}25 \\times (3 - 4)^2 + 4 = 3{,}75$. La camionnette doit mesurer moins de $3{,}75$ m de haut (la droite orange du dessin).\n⚠️ La hauteur au milieu, $4$ m, ne suffit pas : c'est le coin du toit qui touche en premier.",
          schema: repere([-1, 9, -1, 6], [{ q: [-0.25, 2, 0] }], [{ x: 4, y: 4, label: "S" }, { x: 3, y: 3.75 }, { x: 5, y: 3.75 }], 3.75),
          micros: ["gr_parabole", "gr_configuration"],
        },
        {
          enonce: "Une place carrée $ABCD$ a $40$ m de côté. Dans le repère d'origine $A$ (unité : 10 m), $B(4\\,;\\,0)$, $C(4\\,;\\,4)$ et $D(0\\,;\\,4)$. On trace deux allées : $[DE]$, où $E$ est le milieu de $[AB]$, et $[AF]$, où $F$ est le milieu de $[BC]$.\na) Montrer que les deux allées sont perpendiculaires.\nb) Déterminer une équation de chacune des droites $(AF)$ et $(DE)$.\nc) Calculer les coordonnées du point $K$ où les allées se croisent.\nd) Montrer que $K$ est sur le cercle de diamètre $[AD]$.",
          correction:
            "a) $E(2\\,;\\,0)$ et $F(4\\,;\\,2)$, donc $\\vec{DE}\\,(2\\,;\\,-4)$ et $\\vec{AF}\\,(4\\,;\\,2)$.\n$\\vec{DE} \\cdot \\vec{AF} = 2 \\times 4 + (-4) \\times 2 = 8 - 8 = 0$ : les allées sont perpendiculaires.\nb) $(AF)$ : $\\vec{DE}$ lui est normal, et $(1\\,;\\,-2)$ aussi (colinéaire). Équation $x - 2y + c = 0$, qui passe par $A(0\\,;\\,0)$ : $c = 0$, donc $x - 2y = 0$.\n$(DE)$ : $\\vec{AF}$ lui est normal, et $(2\\,;\\,1)$ aussi. Équation $2x + y + c = 0$, qui passe par $D(0\\,;\\,4)$ : $4 + c = 0$, donc $2x + y - 4 = 0$.\nc) De la première, $x = 2y$ ; dans la seconde, $4y + y - 4 = 0$, donc $y = 0{,}8$ et $x = 1{,}6$ : $K(1{,}6\\,;\\,0{,}8)$.\nd) Le cercle de diamètre $[AD]$ a pour centre $(0\\,;\\,2)$ et pour rayon $2$ : $x^2 + (y - 2)^2 = 4$.\n$1{,}6^2 + (0{,}8 - 2)^2 = 2{,}56 + 1{,}44 = 4$ : $K$ est sur ce cercle.\n⭐ C'était attendu : l'angle $\\widehat{AKD}$ est droit (question a), et un angle droit qui « voit » $[AD]$ place son sommet sur le cercle de diamètre $[AD]$.\n⚠️ Chaque allée a pour vecteur normal la direction de l'AUTRE : c'est parce qu'elles sont perpendiculaires.",
          schema: droites(
            [-1, 5],
            [],
            [
              { x: 0, y: 0, label: "A" },
              { x: 4, y: 0, label: "B" },
              { x: 4, y: 4, label: "C" },
              { x: 0, y: 4, label: "D" },
              { x: 2, y: 0, label: "E" },
              { x: 4, y: 2, label: "F" },
              { x: 1.6, y: 0.8, label: "K" },
            ],
            [
              { de: [0, 0], vers: [4, 0], couleur: GRIS, pointe: false },
              { de: [4, 0], vers: [4, 4], couleur: GRIS, pointe: false },
              { de: [4, 4], vers: [0, 4], couleur: GRIS, pointe: false },
              { de: [0, 4], vers: [0, 0], couleur: GRIS, pointe: false },
              { de: [0, 4], vers: [2, 0], couleur: ORANGE, pointe: false },
              { de: [0, 0], vers: [4, 2], pointe: false },
            ],
          ),
          micros: ["gr_configuration", "gr_equation_droite", "gr_droites", "gr_cercle_utiliser"],
        },
        {
          enonce: "Vu de dessus, un lanceur de marteau fait tourner la boule sur le cercle $\\mathcal{C}$ de centre $\\Omega(1\\,;\\,1)$ qui passe par $A(2\\,;\\,3)$ (unité : le mètre). Il lâche la boule en $A$ : vue de dessus, elle part en ligne droite selon la TANGENTE au cercle en $A$, perpendiculaire au rayon $[\\Omega A]$.\na) Donner une équation de $\\mathcal{C}$.\nb) Justifier que $\\vec{\\Omega A}$ est un vecteur normal à la tangente, puis donner une équation de la tangente.\nc) Vue de dessus, la trajectoire passe-t-elle par le piquet $P(6\\,;\\,1)$ ?",
          correction:
            "a) $r^2 = \\Omega A^2 = (2 - 1)^2 + (3 - 1)^2 = 1 + 4 = 5$. Équation : $(x - 1)^2 + (y - 1)^2 = 5$.\nb) La tangente est perpendiculaire au rayon $[\\Omega A]$ : $\\vec{\\Omega A}\\,(1\\,;\\,2)$ lui est normal.\nÉquation $x + 2y + c = 0$, et $A$ la vérifie : $2 + 6 + c = 0$, donc $c = -8$. Tangente : $x + 2y - 8 = 0$.\nc) $6 + 2 \\times 1 - 8 = 0$ : $P$ est sur la tangente, la trajectoire passe par le piquet.\n✔️ $\\vec{AP}\\,(4\\,;\\,-2)$ et $\\vec{\\Omega A} \\cdot \\vec{AP} = 4 - 4 = 0$ : la trajectoire part bien à angle droit du rayon.\n⚠️ La boule ne part pas dans le prolongement du bras (selon $\\vec{\\Omega A}$, en vert) : elle part à angle droit du rayon (en orange).\n⭐ Une tangente en $A$, c'est un point ($A$) et un vecteur normal (le rayon $\\vec{\\Omega A}$).",
          schema: droites(
            [-3, 7],
            [{ a: 1, b: 2, c: -8, couleur: ORANGE }],
            [{ x: 1, y: 1, label: "Ω" }, { x: 2, y: 3, label: "A" }, { x: 6, y: 1, label: "P" }],
            [...cercle(1, 1, Math.sqrt(5), BLEU), { de: [1, 1], vers: [2, 3], couleur: VERT }],
          ),
          micros: ["gr_cercle", "gr_cercle_utiliser", "gr_equation_droite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "Dans un problème, on traduit chaque objet : une route, un rivage, une trajectoire sont des droites ; une zone de portée est un disque.",
        "Le point d'une droite le plus proche d'un point $M$ est le projeté orthogonal de $M$ sur cette droite.",
        "L'intersection d'une droite et d'un cercle se calcule en remplaçant $y$ (ou $x$) dans l'équation du cercle : on tombe sur une équation du second degré.",
      ],
      exercices: [
        {
          titre: "L'avion et le radar",
          enonce: "Un radar de contrôle aérien, placé en $\\Omega$, détecte les avions à l'intérieur d'un cercle d'équation $x^2 + y^2 - 2x - 2y - 23 = 0$ (unité : 10 km). Un avion suit la trajectoire rectiligne $d : 3x + 4y - 22 = 0$, à $800$ km/h.\na) Déterminer la position $\\Omega$ du radar et sa portée.\nb) Calculer les coordonnées du point $H$ de la trajectoire le plus proche du radar. L'avion sera-t-il détecté ?\nc) Calculer les coordonnées des points où l'avion entre dans la zone du radar et en sort.\nd) Pendant combien de minutes l'avion est-il visible sur l'écran ?",
          correction:
            "a) On complète les carrés : $(x - 1)^2 - 1 + (y - 1)^2 - 1 - 23 = 0$, soit $(x - 1)^2 + (y - 1)^2 = 25$.\nLe radar est en $\\Omega(1\\,;\\,1)$ ; sa portée est le rayon, $5$ unités, soit $50$ km.\nb) $H$ est le projeté orthogonal de $\\Omega$ sur $d$. Avec $\\vec{n}\\,(3\\,;\\,4)$, normal à $d$ : $H(1 + 3t\\,;\\,1 + 4t)$.\n$3(1 + 3t) + 4(1 + 4t) - 22 = 0$, soit $25t - 15 = 0$, donc $t = 0{,}6$ et $H(2{,}8\\,;\\,3{,}4)$.\n$\\Omega H = 0{,}6 \\times \\|\\vec{n}\\| = 0{,}6 \\times 5 = 3$ unités, soit $30$ km : moins que la portée, l'avion sera détecté.\nc) Sur $d$, $y = \\dfrac{22 - 3x}{4}$. On remplace dans l'équation du cercle et on multiplie par $16$ :\n$16(x - 1)^2 + (18 - 3x)^2 = 400$, soit $25x^2 - 140x - 60 = 0$, puis $5x^2 - 28x - 12 = 0$.\n$\\Delta = 28^2 + 4 \\times 5 \\times 12 = 784 + 240 = 1024 = 32^2$, donc $x = \\dfrac{28 - 32}{10} = -0{,}4$ ou $x = \\dfrac{28 + 32}{10} = 6$.\nL'avion entre en $E(-0{,}4\\,;\\,5{,}8)$ et sort en $S(6\\,;\\,1)$.\nd) $\\vec{ES}\\,(6{,}4\\,;\\,-4{,}8)$, donc $ES = \\sqrt{40{,}96 + 23{,}04} = \\sqrt{64} = 8$ unités, soit $80$ km.\nÀ $800$ km/h : $\\dfrac{80}{800} = 0{,}1$ h, soit $6$ minutes.\n✔️ $H$ est le milieu de $[ES]$ : $\\left(\\dfrac{-0{,}4 + 6}{2}\\,;\\,\\dfrac{5{,}8 + 1}{2}\\right) = (2{,}8\\,;\\,3{,}4)$. Et Pythagore dans le triangle $\\Omega HS$ : $3^2 + 4^2 = 5^2$.\n⚠️ On compare la distance $\\Omega H$ au RAYON, $5$, et pas au rayon au carré, $25$.",
          schema: droites(
            [-5, 7],
            [{ a: 3, b: 4, c: -22, couleur: ORANGE }],
            [{ x: 1, y: 1, label: "Ω" }, { x: 2.8, y: 3.4, label: "H" }, { x: -0.4, y: 5.8, label: "E" }, { x: 6, y: 1, label: "S" }],
            [...cercle(1, 1, 5, BLEU), { de: [1, 1], vers: [2.8, 3.4], couleur: VERT, pointe: false }],
          ),
          micros: ["gr_cercle_reconnaitre", "gr_projete", "gr_cercle_utiliser"],
        },
        {
          titre: "Un relais pour trois villages",
          enonce: "Trois villages sont repérés sur une carte (unité : le km) : $A(0\\,;\\,4)$, $B(4\\,;\\,4)$ et $C(5\\,;\\,-1)$. On veut installer un relais de téléphonie $\\Omega$ à la même distance des trois.\na) Justifier que le relais est sur la médiatrice de $[AB]$, et que celle-ci a pour équation $x = 2$.\nb) Déterminer une équation de la médiatrice de $[BC]$.\nc) En déduire la position du relais.\nd) Quelle portée minimale doit-il avoir ? Donner l'équation du cercle qu'il couvre alors tout juste.\ne) Le hameau $D(0\\,;\\,-2)$ sera-t-il couvert ?",
          correction:
            "a) $\\Omega A = \\Omega B$ : $\\Omega$ est sur la médiatrice de $[AB]$.\nElle passe par le milieu $I(2\\,;\\,4)$ et a pour vecteur normal $\\vec{AB}\\,(4\\,;\\,0)$ : $4x + c = 0$ avec $8 + c = 0$, soit $4x - 8 = 0$, c'est-à-dire $x = 2$. Une droite verticale.\nb) Milieu de $[BC]$ : $J(4{,}5\\,;\\,1{,}5)$. Vecteur normal : $\\vec{BC}\\,(1\\,;\\,-5)$.\n$x - 5y + c = 0$ avec $4{,}5 - 7{,}5 + c = 0$, donc $c = 3$ : $x - 5y + 3 = 0$.\nc) $\\Omega$ est sur les deux médiatrices : $x = 2$, puis $2 - 5y + 3 = 0$, donc $y = 1$. Le relais va en $\\Omega(2\\,;\\,1)$.\nd) $\\Omega A^2 = (0 - 2)^2 + (4 - 1)^2 = 4 + 9 = 13$ : portée minimale $\\sqrt{13} \\approx 3{,}61$ km.\n✔️ $\\Omega B^2 = 4 + 9 = 13$ et $\\Omega C^2 = 9 + 4 = 13$.\nCercle couvert : $(x - 2)^2 + (y - 1)^2 = 13$.\ne) $(0 - 2)^2 + (-2 - 1)^2 = 4 + 9 = 13$ : $D$ est exactement sur le cercle, à la limite de la couverture. Mieux vaut prévoir un peu plus de portée.\n⭐ Le relais est le centre du cercle circonscrit au triangle $ABC$, là où se coupent les médiatrices.\n⚠️ Deux médiatrices suffisent : la troisième passe forcément par le même point.",
          schema: droites(
            [-3, 7],
            [{ a: 1, b: 0, c: -2 }, { a: 1, b: -5, c: 3, couleur: VERT }],
            [
              { x: 0, y: 4, label: "A" },
              { x: 4, y: 4, label: "B" },
              { x: 5, y: -1, label: "C" },
              { x: 0, y: -2, label: "D" },
              { x: 2, y: 1, label: "Ω" },
            ],
            [...cercle(2, 1, Math.sqrt(13))],
          ),
          micros: ["gr_configuration", "gr_equation_droite", "gr_cercle", "gr_cercle_utiliser"],
        },
        {
          titre: "Le profil d'un bowl de skate",
          enonce: "Dans un skatepark, le profil d'un bowl (une cuvette) suit la parabole $y = 0{,}5x^2 - 3x + 2{,}5$ (unité : le mètre ; $y = 0$ est le niveau du sol).\na) Déterminer l'axe de symétrie et le sommet $S$ de la parabole. Quelle est la profondeur du bowl ?\nb) En quels points $A$ et $B$ ($x_A < x_B$) le profil rejoint-il le sol ? Quelle est la largeur du bowl ?\nc) Montrer que $\\vec{SA} \\cdot \\vec{SB} = 0$. En déduire que $S$ est sur le cercle $\\mathcal{C}$ de diamètre $[AB]$, et donner l'équation de $\\mathcal{C}$.\nd) Un autre bowl a pour profil la moitié basse de $\\mathcal{C}$. À $1$ m de l'axe, lequel des deux est le plus profond ?",
          correction:
            "a) Axe : $x = -\\dfrac{b}{2a} = -\\dfrac{-3}{2 \\times 0{,}5} = 3$. Sommet : $y = 0{,}5 \\times 9 - 9 + 2{,}5 = -2$, donc $S(3\\,;\\,-2)$.\nLe bowl a $2$ m de profondeur. Forme canonique : $y = 0{,}5(x - 3)^2 - 2$.\nb) Au sol, $y = 0$ : $0{,}5(x - 3)^2 = 2$, donc $(x - 3)^2 = 4$, et $x - 3 = -2$ ou $x - 3 = 2$.\n$A(1\\,;\\,0)$ et $B(5\\,;\\,0)$ : le bowl fait $4$ m de large.\nc) $\\vec{SA}\\,(-2\\,;\\,2)$ et $\\vec{SB}\\,(2\\,;\\,2)$ : $\\vec{SA} \\cdot \\vec{SB} = -4 + 4 = 0$.\nL'angle $\\widehat{ASB}$ est droit, donc $S$ est sur le cercle de diamètre $[AB]$.\nCentre : le milieu $I(3\\,;\\,0)$ ; rayon : $\\dfrac{AB}{2} = 2$. Donc $\\mathcal{C} : (x - 3)^2 + y^2 = 4$.\nd) À $1$ m de l'axe, $x = 2$.\nParabole : $y = 0{,}5 \\times (2 - 3)^2 - 2 = -1{,}5$.\nDemi-cercle : $(2 - 3)^2 + y^2 = 4$, donc $y^2 = 3$ et, dans la moitié basse, $y = -\\sqrt{3} \\approx -1{,}73$.\nLe bowl en demi-cercle est plus profond d'environ $0{,}23$ m à cet endroit, alors que les deux ont le même fond $S$ et les mêmes bords $A$ et $B$.\n⭐ Sur le dessin, la parabole (en bleu) passe AU-DESSUS du demi-cercle (en orange) entre $A$ et $S$ : elle est moins creusée.\n⚠️ $y^2 = 3$ a deux solutions ; la moitié basse du cercle garde la négative.",
          schema: droites(
            [-3, 7],
            [],
            [{ x: 1, y: 0, label: "A" }, { x: 5, y: 0, label: "B" }, { x: 3, y: -2, label: "S" }],
            [...parabole(0.5, -3, 2.5, 0, 6), ...cercle(3, 0, 2)],
          ),
          micros: ["gr_parabole", "gr_configuration", "gr_cercle"],
        },
        {
          titre: "Le laser et le miroir",
          enonce: "Dans un repère orthonormé (unité : le dm), un miroir plan est posé le long de la droite $d : x + 2y - 4 = 0$. Un laser part de $A(3\\,;\\,3)$ et doit atteindre, après réflexion sur le miroir, le capteur $B(7\\,;\\,1)$. En optique, le rayon réfléchi semble venir du symétrique $A'$ de $A$ par rapport au miroir.\na) Déterminer le projeté orthogonal $H$ de $A$ sur $d$.\nb) En déduire les coordonnées de $A'$.\nc) Déterminer une équation de la droite $(A'B)$, puis le point $I$ où le laser frappe le miroir.\nd) Avec $\\vec{n}\\,(1\\,;\\,2)$, normal au miroir, comparer les angles que font $\\vec{IA}$ et $\\vec{IB}$ avec $\\vec{n}$. Qu'observe-t-on ?",
          correction:
            "a) $\\vec{n}\\,(1\\,;\\,2)$ est normal à $d$, et $\\vec{AH}$ lui est colinéaire : $H(3 + t\\,;\\,3 + 2t)$.\n$H$ est sur $d$ : $(3 + t) + 2(3 + 2t) - 4 = 0$, soit $5t + 5 = 0$, donc $t = -1$ et $H(2\\,;\\,1)$.\nb) $H$ est le milieu de $[AA']$ : $A'(2 \\times 2 - 3\\,;\\,2 \\times 1 - 3)$, soit $A'(1\\,;\\,-1)$.\nc) $\\vec{A'B}\\,(6\\,;\\,2)$ est colinéaire à $(3\\,;\\,1)$ ; un vecteur normal à $(A'B)$ est donc $(1\\,;\\,-3)$.\n$(A'B) : x - 3y + c = 0$ avec $1 + 3 + c = 0$, soit $x - 3y - 4 = 0$. ✔️ $B$ : $7 - 3 - 4 = 0$.\n$I$ est sur les deux droites : $x = 4 - 2y$ donne $4 - 2y - 3y - 4 = 0$, donc $y = 0$ et $I(4\\,;\\,0)$.\nd) $\\vec{IA}\\,(-1\\,;\\,3)$ et $\\vec{IB}\\,(3\\,;\\,1)$ ont la même norme, $\\sqrt{10}$.\n$\\vec{IA} \\cdot \\vec{n} = -1 + 6 = 5$ et $\\vec{IB} \\cdot \\vec{n} = 3 + 2 = 5$.\nMêmes produits, mêmes normes : les cosinus sont égaux, $\\dfrac{5}{\\sqrt{10} \\times \\sqrt{5}} = \\dfrac{5}{\\sqrt{50}} = \\dfrac{\\sqrt{2}}{2}$. Les deux angles valent $45°$.\nC'est la loi de la réflexion : l'angle d'incidence est égal à l'angle de réflexion.\n⭐ En prime, $\\vec{IA} \\cdot \\vec{IB} = -3 + 3 = 0$ : ici, le rayon repart à angle droit.\n⚠️ Viser le point du miroir « en face » de $B$ ne marche pas : c'est le symétrique $A'$ qui donne la bonne direction (le trait gris du dessin).",
          schema: droites(
            [-3, 8],
            [{ a: 1, b: 2, c: -4 }],
            [
              { x: 3, y: 3, label: "A" },
              { x: 7, y: 1, label: "B" },
              { x: 2, y: 1, label: "H" },
              { x: 1, y: -1, label: "A′" },
              { x: 4, y: 0, label: "I" },
            ],
            [
              { de: [3, 3], vers: [4, 0], couleur: ORANGE },
              { de: [4, 0], vers: [7, 1], couleur: ORANGE },
              { de: [1, -1], vers: [4, 0], couleur: GRIS, pointe: false },
              { de: [3, 3], vers: [1, -1], couleur: VERT, pointe: false },
            ],
          ),
          micros: ["gr_projete", "gr_vecteur_normal", "gr_equation_droite", "gr_configuration"],
        },
      ],
    },
  ],
};
