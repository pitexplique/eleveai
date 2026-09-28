// ─── Fiche d'exercices : parabole et expression de degré 2 (1re sans spé) ─────
//                              20 exercices corrigés
//
// Première des quatre feuilles du chapitre « Modélisation quadratique » (BOP1MQ)
// de la première SANS spécialité, écrites le 28/09/2026 : une feuille par notion
// du coach (quad_parabole, quad_sommet_axe, quad_variations,
// quad_racines_signe). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/parabole.bank.ts`.
//
// ⛔⛔ LE PROGRAMME DE PREMIÈRE SANS SPÉ : les formes ax², ax² + c et
// a(x − x₁)(x − x₂). PAS DE DISCRIMINANT : une racine se lit sur la courbe ou
// sur la forme factorisée (« un produit est nul quand un de ses facteurs
// l'est »), jamais autrement.
//
// ⭐ Frédéric, 28/09 : ses élèves de première « détestent tous les maths » —
// beaucoup de DESSINS (une parabole dans l'énoncé dès qu'on la lit) et des
// contextes : économie (la fabrique de vélos, le miel de l'apiculteur), physique
// (la distance de freinage, la chute sur Terre et sur la Lune), histoire-géo (le
// trébuchet, l'arche d'un pont), nature et écologie (le dauphin, le tunnel de
// serre, les papillons du pré). Les chiffres sont des MODÈLES arrondis, jamais
// présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-quad-parabole.mjs`.
//
// Micro-compétences : quad_associer_parabole (2, 4, 7, 12, 16, 18, 20),
// quad_role_a (2, 6, 9, 12, 13, 15, 17, 18, 19, 20), quad_role_c (3, 5, 8, 10,
// 11, 16, 17, 19, 20), quad_image_calculer (1, 5, 9, 10, 11, 13, 14, 15, 17, 18,
// 19, 20), quad_lire_racines_courbe (4, 7, 8, 9, 10, 11, 12, 14, 16, 17, 18, 19,
// 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, tableau } from "@/lib/fiches-exercices/figures";
import { parabole, VERT } from "@/lib/fiches-exercices/figures-parabole";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages) :
 *  ceux qui redisent le corrigé. Les courbes qu'on LIT restent imprimées. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesQuadParabolePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "quad-parabole",
  titre: "Parabole et expression de degré 2",
  accroche:
    "Vingt exercices pour apprivoiser la parabole : calculer une image, lire le rôle de a et de c, trouver les racines sur la courbe ou sur la forme factorisée. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec la courbe.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On calcule, on lit, on associe.",
      rappel: [
        "Une fonction polynôme de degré $2$ s'écrit $f(x) = ax^2 + bx + c$, avec $a \\neq 0$. Sa courbe est une PARABOLE.",
        "$a > 0$ : la parabole est tournée vers le haut. $a < 0$ : vers le bas. Plus $a$ est loin de $0$, plus elle est serrée.",
        "$f(0) = c$ : la courbe coupe l'axe vertical en $c$. Dans $ax^2 + c$, le nombre $c$ fait glisser la parabole vers le haut ou vers le bas.",
        "Sous la forme $a(x - x_1)(x - x_2)$, les RACINES $x_1$ et $x_2$ sont les abscisses où la courbe coupe l'axe horizontal.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = 2x^2 - 3x + 1$. Calculer $f(0)$, $f(2)$ et $f(-1)$.",
          correction:
            "On remplace $x$ par chaque valeur, entre parenthèses si elle est négative.\n$f(0) = 2 \\times 0^2 - 3 \\times 0 + 1 = 1$.\n$f(2) = 2 \\times 2^2 - 3 \\times 2 + 1 = 8 - 6 + 1 = 3$.\n$f(-1) = 2 \\times (-1)^2 - 3 \\times (-1) + 1 = 2 + 3 + 1 = 6$.\n⚠️ Le piège : $(-1)^2 = 1$ est positif, et $-3 \\times (-1) = +3$. Deux signes moins, deux occasions de se tromper.\n⭐ $f(0)$ vaut toujours le nombre $c$ tout seul : ici $1$.\nSur le dessin, les trois points calculés sont bien sur la parabole.",
          schema: ecranSeulement(parabole([-2, 3, -1, 8], [{ q: [2, -3, 1] }], [{ x: 0, y: 1 }, { x: 2, y: 3 }, { x: -1, y: 6 }])),
          micros: ["quad_image_calculer"],
        },
        {
          enonce:
            "Les trois paraboles du dessin représentent $f(x) = 2x^2$, $g(x) = 0{,}5x^2$ et $h(x) = -x^2$. Associer chaque courbe (bleue, orange, verte) à sa fonction.",
          figure: parabole([-3, 3, -4, 5], [{ q: [2, 0, 0] }, { q: [0.5, 0, 0], couleur: ORANGE }, { q: [-1, 0, 0], couleur: VERT }]),
          correction:
            "La verte est tournée vers le bas : son coefficient $a$ est négatif. C'est $h$, avec $a = -1$.\nLes deux autres sont tournées vers le haut : $a > 0$.\nPour les départager, on calcule l'image de $1$ : $f(1) = 2$ et $g(1) = 0{,}5$.\nLa bleue passe par le point $(1 ; 2)$ : c'est $f$. L'orange passe par $(1 ; 0{,}5)$ : c'est $g$.\n⭐ Plus $a$ est loin de $0$, plus la parabole est SERRÉE ; plus il en est proche, plus elle est OUVERTE.\n⚠️ Le signe de $a$ donne le sens ; sa taille donne l'ouverture. Ce sont deux informations différentes.",
          micros: ["quad_role_a", "quad_associer_parabole"],
        },
        {
          enonce:
            "On part de la parabole de $y = x^2$. Où les courbes de $f(x) = x^2 + 3$ et de $g(x) = x^2 - 2$ coupent-elles l'axe des ordonnées ? Comment les obtient-on à partir de la parabole de départ ?",
          correction:
            "$f(0) = 0^2 + 3 = 3$ : la courbe de $f$ coupe l'axe des ordonnées en $3$.\n$g(0) = 0^2 - 2 = -2$ : celle de $g$ le coupe en $-2$.\nChaque point de la parabole $y = x^2$ monte de $3$ pour donner celle de $f$ (orange), et descend de $2$ pour celle de $g$ (verte).\n⭐ Le nombre $c$ de $ax^2 + c$ fait GLISSER la parabole verticalement, sans la déformer.\n⚠️ $x^2 - 2$ descend : le signe de $c$ donne le sens du glissement.",
          schema: ecranSeulement(
            parabole([-3, 3, -3, 7], [{ q: [1, 0, 3], couleur: ORANGE }, { q: [1, 0, 0] }, { q: [1, 0, -2], couleur: VERT }], [{ x: 0, y: 3 }, { x: 0, y: -2 }]),
          ),
          micros: ["quad_role_c"],
        },
        {
          enonce:
            "Voici la courbe d'une fonction $f$ de degré $2$.\na) Lire les racines de $f$.\nb) Laquelle de ces deux expressions lui correspond : $(x + 1)(x - 3)$ ou $(x - 1)(x + 3)$ ?",
          figure: parabole([-3, 5, -5, 5], [{ q: [1, -2, -3] }], [{ x: -1, y: 0 }, { x: 3, y: 0 }]),
          correction:
            "a) Les racines sont les abscisses des points où la courbe coupe l'axe horizontal : $-1$ et $3$.\nb) Une racine $r$ donne un facteur $(x - r)$ : la racine $-1$ donne $(x - (-1)) = (x + 1)$, la racine $3$ donne $(x - 3)$.\nC'est donc $f(x) = (x + 1)(x - 3)$.\n✔️ Contrôle : $(-1 + 1)(-1 - 3) = 0 \\times (-4) = 0$.\n⚠️ Le piège : recopier les racines avec leur signe. $(x - 1)(x + 3)$ s'annule en $1$ et en $-3$, pas en $-1$ et en $3$.",
          micros: ["quad_lire_racines_courbe", "quad_associer_parabole"],
        },
        {
          enonce: "Soit $g(x) = -0{,}5x^2 + 4$. Calculer $g(0)$, $g(2)$, $g(-2)$ et $g(4)$.",
          correction:
            "$g(0) = 4$ : c'est le nombre $c$, là où la courbe coupe l'axe vertical.\n$g(2) = -0{,}5 \\times 2^2 + 4 = -2 + 4 = 2$.\n$g(-2) = -0{,}5 \\times (-2)^2 + 4 = -0{,}5 \\times 4 + 4 = 2$.\n$g(4) = -0{,}5 \\times 4^2 + 4 = -8 + 4 = -4$.\n⚠️ On élève au carré AVANT de multiplier : $-0{,}5 \\times (-2)^2 = -0{,}5 \\times 4 = -2$, et non $+2$.\n⭐ $g(2) = g(-2)$ : pour une fonction $ax^2 + c$, deux nombres opposés ont la même image.\nSur le dessin, les quatre points calculés sont sur la parabole ; $(2 ; 2)$ et $(-2 ; 2)$ sont à la même hauteur.",
          schema: parabole([-5, 5, -5, 5], [{ q: [-0.5, 0, 4] }], [{ x: 0, y: 4 }, { x: 2, y: 2 }, { x: -2, y: 2 }, { x: 4, y: -4 }]),
          micros: ["quad_image_calculer", "quad_role_c"],
        },
        {
          enonce:
            "Sans aucun calcul, dire si chaque parabole est tournée vers le haut ou vers le bas :\n$f(x) = -3x^2 + x + 5$ ; $g(x) = 0{,}2x^2 - 7x$ ; $h(x) = 4 - x^2$.",
          correction:
            "On regarde le signe du coefficient de $x^2$, et lui seul.\n$f$ : $a = -3 < 0$, la parabole est tournée vers le bas.\n$g$ : $a = 0{,}2 > 0$, elle est tournée vers le haut. Le $-7x$ ne change rien au sens.\n$h$ : on relit $h(x) = -x^2 + 4$ ; $a = -1 < 0$, elle est tournée vers le bas.\n⚠️ Le coefficient $a$ est celui de $x^2$, pas le premier nombre écrit : dans $4 - x^2$, c'est $-1$, pas $4$.\nSur le dessin, $f$ (bleue) et $h$ (verte) sont bien tournées vers le bas. La parabole de $g$ est tournée vers le haut, mais son sommet est trop loin pour tenir dans le cadre.",
          schema: ecranSeulement(parabole([-3, 3, -4, 6], [{ q: [-3, 1, 5] }, { q: [-1, 0, 4], couleur: VERT }])),
          micros: ["quad_role_a"],
        },
        {
          enonce:
            "Laquelle de ces expressions correspond à la courbe ci-dessous ?\n$(x + 2)(x - 1)$ ; $-(x + 2)(x - 1)$ ; $-(x - 2)(x + 1)$ ; $-x^2 + 2$.",
          figure: parabole([-4, 3, -4, 4], [{ q: [-1, -1, 2] }], [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }]),
          correction:
            "La courbe coupe l'axe horizontal en $-2$ et en $1$ : les facteurs sont $(x + 2)$ et $(x - 1)$. On écarte $-(x - 2)(x + 1)$, qui s'annule en $2$ et en $-1$.\nElle est tournée vers le bas : il faut $a < 0$. On écarte $(x + 2)(x - 1)$.\n$-x^2 + 2$ s'annule en $\\sqrt{2} \\approx 1{,}41$, pas en $1$ : on l'écarte aussi.\nC'est $f(x) = -(x + 2)(x - 1)$.\n✔️ Contrôle sur le dessin : $f(0) = -(0 + 2)(0 - 1) = 2$, et la courbe coupe bien l'axe vertical en $2$.\n⭐ Deux indices suffisent : les racines donnent les facteurs, le sens donne le signe de $a$.",
          micros: ["quad_associer_parabole", "quad_lire_racines_courbe"],
        },
        {
          enonce:
            "On fait descendre de $4$ unités la parabole de $y = x^2$.\na) Quelle est l'expression de la nouvelle fonction $f$ ?\nb) En quels points sa courbe coupe-t-elle l'axe des abscisses ?\nc) Vérifier que $f(x) = (x - 2)(x + 2)$.",
          correction:
            "a) Descendre de $4$, c'est retrancher $4$ à chaque ordonnée : $f(x) = x^2 - 4$.\nb) On cherche $x^2 - 4 = 0$, soit $x^2 = 4$ : $x = 2$ ou $x = -2$. La courbe coupe l'axe en $-2$ et en $2$.\nc) $(x - 2)(x + 2) = x^2 + 2x - 2x - 4 = x^2 - 4$ ✔️. Les racines $-2$ et $2$ se lisent sur les facteurs.\n⚠️ $x^2 = 4$ a DEUX solutions : on oublie souvent $-2$. Le dessin les montre toutes les deux, symétriques.",
          schema: ecranSeulement(parabole([-3, 3, -5, 5], [{ q: [1, 0, 0], couleur: ORANGE }, { q: [1, 0, -4] }], [{ x: -2, y: 0 }, { x: 2, y: 0 }])),
          micros: ["quad_role_c", "quad_lire_racines_courbe"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. Calculatrice autorisée.",
      rappel: [
        "Calculer une image : on remplace $x$ par le nombre, entre parenthèses s'il est négatif, et on élève au carré AVANT de multiplier.",
        "Une racine se lit là où la courbe coupe l'axe horizontal. Sur la forme factorisée, on annule chaque facteur : un produit est nul quand l'un de ses facteurs l'est.",
        "Dans un problème, on traduit : $f(0)$ est la valeur de départ ; une racine, c'est l'endroit ou l'instant où la grandeur vaut $0$.",
      ],
      exercices: [
        {
          titre: "Le jet d'eau",
          enonce:
            "Dans un parc, un jet d'eau jaillit du sol. Sa hauteur, en mètres, est $h(x) = -x^2 + 4x$, où $x$ est la distance horizontale à la buse, en mètres.\na) Calculer $h(1)$, $h(2)$ et $h(3)$.\nb) On admet que $h(x) = -x(x - 4)$. À quelle distance de la buse l'eau retombe-t-elle au sol ? Le lire aussi sur le dessin.\nc) Le signe du coefficient de $x^2$ était-il prévisible ?",
          figure: parabole([-1, 5, -1, 5], [{ q: [-1, 4, 0] }]),
          correction:
            "a) $h(1) = -1 + 4 = 3$ ; $h(2) = -4 + 8 = 4$ ; $h(3) = -9 + 12 = 3$ (en mètres).\nb) L'eau est au sol quand $h(x) = 0$. Un produit est nul quand l'un de ses facteurs l'est : $-x = 0$ ou $x - 4 = 0$, donc $x = 0$ ou $x = 4$.\n$x = 0$, c'est la buse : l'eau retombe à $4$ m de la buse. Sur le dessin, la courbe recoupe l'axe en $4$.\nc) Oui : un jet monte puis redescend. Sa courbe est tournée vers le bas, donc $a = -1 < 0$.\n⚠️ $h(1) = h(3)$ : la même hauteur à l'aller et au retour. Le jet est symétrique ; c'est l'objet de la feuille suivante, sur le sommet et l'axe.",
          micros: ["quad_image_calculer", "quad_lire_racines_courbe", "quad_role_a"],
        },
        {
          titre: "La fabrique de vélos",
          enonce:
            "Une petite fabrique produit $x$ centaines de vélos par an ($0 \\leqslant x \\leqslant 10$). Son bénéfice, en milliers d'euros, est $B(x) = -x^2 + 10x - 16$.\na) Calculer $B(0)$. Que représente ce nombre ?\nb) Calculer $B(5)$.\nc) Lire sur la courbe les quantités pour lesquelles le bénéfice est nul, puis vérifier que $B(x) = -(x - 2)(x - 8)$ s'annule bien pour ces valeurs.",
          figure: parabole([-1, 10, -3, 10], [{ q: [-1, 10, -16] }], [{ x: 2, y: 0 }, { x: 8, y: 0 }], { grand: true }),
          correction:
            "a) $B(0) = -16$ : sans rien vendre, la fabrique perd $16\\,000$ €. Ce sont ses frais fixes (loyer, machines).\n⭐ $B(0)$ est toujours le nombre $c$ : ici $-16$, là où la courbe coupe l'axe vertical, sous le dessin qui s'arrête à $-3$.\nb) $B(5) = -5^2 + 10 \\times 5 - 16 = -25 + 50 - 16 = 9$ : pour $500$ vélos, le bénéfice est de $9\\,000$ €.\nc) La courbe coupe l'axe horizontal en $2$ et en $8$.\n$B(2) = -(2 - 2)(2 - 8) = 0$ et $B(8) = -(8 - 2)(8 - 8) = 0$ ✔️.\nEntre $200$ et $800$ vélos, la courbe est au-dessus de l'axe : la fabrique gagne de l'argent.\n⚠️ $-5^2 = -25$ : le carré porte sur $5$ seulement, le signe moins reste devant.",
          micros: ["quad_role_c", "quad_image_calculer", "quad_lire_racines_courbe"],
        },
        {
          titre: "L'arche d'un pont",
          enonce:
            "Pour aménager une route, une commune fait construire un pont dont l'arche a la forme d'une parabole. On la modélise par $h(x) = -0{,}5x^2 + 8$, où $x$ est la distance au milieu de l'arche et $h(x)$ la hauteur, en mètres.\na) Quelle est la hauteur de l'arche en son milieu ?\nb) Calculer $h(2)$ et $h(-2)$.\nc) Lire sur le dessin la largeur de l'arche au sol, puis la vérifier avec $h(x) = -0{,}5(x - 4)(x + 4)$.",
          figure: parabole([-5, 5, -1, 9], [{ q: [-0.5, 0, 8] }]),
          correction:
            "a) Au milieu, $x = 0$ : $h(0) = 8$. L'arche culmine à $8$ m. C'est le nombre $c$.\nb) $h(2) = -0{,}5 \\times 2^2 + 8 = -2 + 8 = 6$, et $h(-2) = -0{,}5 \\times (-2)^2 + 8 = 6$ : $6$ m à $2$ m du milieu, de chaque côté.\nc) La courbe coupe l'axe en $-4$ et en $4$ : l'arche mesure $4 - (-4) = 8$ m de large au sol.\nVérification : $h(4) = -0{,}5(4 - 4)(4 + 4) = 0$ et $h(-4) = -0{,}5(-4 - 4)(-4 + 4) = 0$ ✔️.\n⚠️ La largeur n'est pas $4$ m : l'arche va de $-4$ à $4$, soit $8$ m.",
          micros: ["quad_role_c", "quad_image_calculer", "quad_lire_racines_courbe"],
        },
        {
          enonce:
            "Les trois courbes représentent $f(x) = (x - 1)(x - 3)$, $g(x) = -(x - 1)(x - 3)$ et $k(x) = (x - 1)(x + 3)$. Associer chaque courbe à sa fonction, en justifiant.",
          figure: parabole([-4, 5, -5, 5], [{ q: [1, -4, 3] }, { q: [-1, 4, -3], couleur: ORANGE }, { q: [1, 2, -3], couleur: VERT }]),
          correction:
            "$f$ et $g$ ont les mêmes racines, $1$ et $3$ : ce sont les deux courbes qui passent par $(1 ; 0)$ et $(3 ; 0)$, la bleue et l'orange.\n$f$ a $a = 1 > 0$ : tournée vers le haut, c'est la bleue. $g$ a $a = -1 < 0$ : tournée vers le bas, c'est l'orange.\n$k$ s'annule en $1$ et en $-3$ : c'est la verte.\n✔️ Contrôle : la verte coupe l'axe vertical en $k(0) = (0 - 1)(0 + 3) = -3$.\n⭐ $g = -f$ : la courbe orange est le reflet de la bleue par rapport à l'axe des abscisses.",
          micros: ["quad_associer_parabole", "quad_lire_racines_courbe", "quad_role_a"],
        },
        {
          titre: "Deux antennes paraboliques",
          enonce:
            "Le profil de deux antennes paraboliques est modélisé par $y = 0{,}25x^2$ pour l'antenne A et par $y = 0{,}5x^2$ pour l'antenne B ($x$ et $y$ en décimètres). Leur bord est en $x = 4$ et en $x = -4$.\na) Calculer la profondeur de chaque antenne à son bord.\nb) Laquelle est la plus creuse ? Quel coefficient le dit ?",
          correction:
            "a) Antenne A : $0{,}25 \\times 4^2 = 0{,}25 \\times 16 = 4$ dm. Antenne B : $0{,}5 \\times 4^2 = 0{,}5 \\times 16 = 8$ dm.\nb) B est deux fois plus creuse : son coefficient $a = 0{,}5$ est le double de celui de A.\n⭐ Pour une même largeur, plus $a$ est grand, plus la parabole est serrée, et plus l'antenne est profonde.\n⭐ Le bord est au même niveau en $x = 4$ et en $x = -4$, puisque $(-4)^2 = 4^2$.",
          schema: ecranSeulement(parabole([-5, 5, -1, 9], [{ q: [0.25, 0, 0] }, { q: [0.5, 0, 0], couleur: ORANGE }], [{ x: 4, y: 4 }, { x: 4, y: 8 }])),
          micros: ["quad_role_a", "quad_image_calculer"],
        },
        {
          titre: "Le saut du dauphin",
          enonce:
            "Un dauphin saute hors de l'eau. On modélise sa trajectoire par $h(x) = -0{,}5(x - 1)(x - 5)$, où $x$ est la distance horizontale et $h(x)$ la hauteur au-dessus de l'eau, en mètres.\na) Lire sur le dessin où le dauphin sort de l'eau et où il y replonge. Le retrouver par le calcul.\nb) Quelle est la longueur du saut ?\nc) Calculer $h(3)$ et $h(0)$. Que signifie le signe de $h(0)$ ?",
          figure: parabole([-1, 6, -3, 3], [{ q: [-0.5, 3, -2.5] }]),
          correction:
            "a) La courbe coupe l'axe (la surface de l'eau) en $1$ et en $5$.\nPar le calcul : $h(x) = 0$ quand $x - 1 = 0$ ou $x - 5 = 0$, soit $x = 1$ ou $x = 5$. Le facteur $-0{,}5$ ne s'annule jamais.\nb) Le saut mesure $5 - 1 = 4$ m.\nc) $h(3) = -0{,}5 \\times 2 \\times (-2) = 2$ : au milieu du saut, le dauphin est à $2$ m au-dessus de l'eau.\n$h(0) = -0{,}5 \\times (-1) \\times (-5) = -2{,}5$ : c'est négatif, le dauphin est SOUS l'eau, à $2{,}5$ m de profondeur. Il prend son élan.\n⚠️ Trois facteurs négatifs dans $h(0)$ : un nombre IMPAIR de facteurs négatifs donne un produit négatif.",
          micros: ["quad_lire_racines_courbe", "quad_image_calculer"],
        },
        {
          titre: "La distance de freinage",
          enonce:
            "Sur route sèche, on modélise la distance de freinage d'une voiture, en mètres, par $d(v) = 0{,}005v^2$, où $v$ est la vitesse en km/h.\na) Calculer $d(50)$, $d(100)$ et $d(130)$.\nb) Quand la vitesse double, de $50$ à $100$ km/h, par combien la distance de freinage est-elle multipliée ?\nc) Sur route mouillée, le modèle devient $d(v) = 0{,}008v^2$. Calculer la distance de freinage à $100$ km/h. Quel coefficient a changé ?",
          correction:
            "a) $d(50) = 0{,}005 \\times 2\\,500 = 12{,}5$ m ; $d(100) = 0{,}005 \\times 10\\,000 = 50$ m ; $d(130) = 0{,}005 \\times 16\\,900 = 84{,}5$ m.\nb) $\\dfrac{50}{12{,}5} = 4$ : la distance est multipliée par $4$, pas par $2$.\nC'est l'effet du carré : $(2v)^2 = 4v^2$.\nc) $0{,}008 \\times 10\\,000 = 80$ m, soit $30$ m de plus que sur route sèche.\nSeul le coefficient $a$ a changé, de $0{,}005$ à $0{,}008$ : la parabole est plus serrée, elle monte plus vite.\n⭐ En physique, l'énergie cinétique d'une voiture est proportionnelle au carré de sa vitesse : c'est cette énergie que les freins doivent dissiper.\n⚠️ « Deux fois plus vite, deux fois plus loin » est faux : c'est QUATRE fois plus loin.",
          schema: tableau(["v (km/h)", "50", "100", "130"], ["d, route sèche (m)", 12.5, 50, 84.5]),
          micros: ["quad_image_calculer", "quad_role_a"],
        },
        {
          titre: "Le tunnel de serre",
          enonce:
            "La bâche d'un tunnel de serre, pour cultiver des légumes, a une section en forme de parabole d'expression $f(x) = ax^2 + c$ (en mètres), représentée ci-dessous.\na) Lire la hauteur au centre. Que vaut $c$ ?\nb) Lire où la bâche touche le sol. Quelle est la largeur de la serre ?\nc) En utilisant $f(2) = 0$, trouver $a$.\nd) Écrire $f(x)$ sous forme factorisée.",
          figure: parabole([-3, 3, -2, 5], [{ q: [-1, 0, 4] }], [{ x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 4 }]),
          correction:
            "a) Le sommet est sur l'axe vertical, à la hauteur $4$ : $f(0) = c = 4$.\nb) La courbe touche le sol en $-2$ et en $2$ : la serre mesure $4$ m de large.\nc) $f(2) = 0$ s'écrit $a \\times 2^2 + 4 = 0$, soit $4a = -4$, donc $a = -1$.\nAinsi $f(x) = -x^2 + 4$.\nd) Avec ses racines $-2$ et $2$, et $a = -1$ : $f(x) = -(x + 2)(x - 2)$.\n✔️ $-(x + 2)(x - 2) = -(x^2 - 4) = -x^2 + 4$.\n⚠️ $a$ est négatif : la parabole est tournée vers le bas, comme toute voûte.",
          micros: ["quad_associer_parabole", "quad_role_c", "quad_lire_racines_courbe"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. On répond par une phrase, avec l'unité.",
      rappel: [
        "On commence par dire ce que représentent $x$ et $f(x)$, avec leurs unités.",
        "Une racine négative n'a souvent pas de sens (un temps, une distance) : on la garde dans le calcul, on l'écarte dans la réponse.",
        "Développer la forme factorisée permet de lire $a$ et $c$ ; la forme factorisée permet de lire les racines.",
      ],
      exercices: [
        {
          titre: "Le trébuchet",
          enonce:
            "Au Moyen Âge, le trébuchet est une machine de siège qui lance des boulets de pierre. Dans une reconstitution, la trajectoire d'un boulet est modélisée par $h(x) = -0{,}25(x + 1)(x - 7)$, où $x$ est la distance horizontale parcourue et $h(x)$ la hauteur, toutes deux en dizaines de mètres ($x \\geqslant 0$).\na) Calculer $h(0)$. À quelle hauteur le boulet est-il lâché ?\nb) Calculer $h(2)$ et $h(4)$. Que remarque-t-on ?\nc) À quelle distance le boulet touche-t-il le sol ? Pourquoi écarte-t-on l'une des deux racines ?\nd) Développer $h(x)$. Le signe du coefficient de $x^2$ est-il cohérent avec le dessin ?",
          figure: parabole([-2, 8, -1, 5], [{ q: [-0.25, 1.5, 1.75] }]),
          correction:
            "a) $h(0) = -0{,}25 \\times 1 \\times (-7) = 1{,}75$ : le boulet est lâché à $1{,}75$ dizaine de mètres, soit $17{,}5$ m de haut.\nb) $h(2) = -0{,}25 \\times 3 \\times (-5) = 3{,}75$ et $h(4) = -0{,}25 \\times 5 \\times (-3) = 3{,}75$ : la même hauteur, $37{,}5$ m.\nLa trajectoire est symétrique : $2$ et $4$ sont à égale distance de $3$.\nc) $h(x) = 0$ pour $x = -1$ ou $x = 7$. Une distance parcourue est positive : on écarte $-1$.\nLe boulet touche le sol à $7$ dizaines de mètres, soit $70$ m.\nd) $(x + 1)(x - 7) = x^2 - 7x + x - 7 = x^2 - 6x - 7$, donc $h(x) = -0{,}25x^2 + 1{,}5x + 1{,}75$.\n$a = -0{,}25 < 0$ : parabole tournée vers le bas, comme sur le dessin.\n✔️ Le nombre $c = 1{,}75$ redonne bien $h(0)$.\n⚠️ Les unités : $7$ sur l'axe, c'est $70$ m. On répond toujours dans l'unité de la question.",
          micros: ["quad_image_calculer", "quad_lire_racines_courbe", "quad_role_a", "quad_role_c"],
        },
        {
          titre: "Le miel de l'apiculteur",
          enonce:
            "Un apiculteur vend ses pots de miel au marché. S'il fixe le prix à $x$ euros ($0 \\leqslant x \\leqslant 10$), il en vend $100 - 10x$ par saison.\na) À $4$ € le pot, combien de pots vend-il ? Quelle est sa recette ?\nb) Montrer que la recette est $R(x) = -10x^2 + 100x$.\nc) Calculer $R(6)$. Comparer avec la recette à $4$ €.\nd) Vérifier que $R(x) = -10x(x - 10)$, et en déduire les prix pour lesquels la recette est nulle. Expliquer chacun.\ne) La parabole est-elle tournée vers le haut ou vers le bas ? Qu'est-ce que cela annonce ?",
          correction:
            "a) $100 - 10 \\times 4 = 60$ pots, pour une recette de $4 \\times 60 = 240$ €.\nb) Recette = prix × nombre de pots : $R(x) = x(100 - 10x) = 100x - 10x^2 = -10x^2 + 100x$.\nc) $R(6) = -10 \\times 36 + 600 = 240$ € : la même recette qu'à $4$ €, avec $40$ pots à $6$ €.\nd) $-10x(x - 10) = -10x^2 + 100x$ ✔️. $R(x) = 0$ pour $x = 0$ ou $x = 10$.\nÀ $0$ €, il donne son miel : aucune recette. À $10$ €, plus personne n'achète : $100 - 10 \\times 10 = 0$ pot.\ne) $a = -10 < 0$ : la parabole est tournée vers le bas. La recette monte, puis redescend : un prix la rend la plus grande. Sur le dessin (en centaines d'euros), c'est $5$ €, pour $250$ €.\n⭐ Entre deux prix de même recette, $4$ € et $6$ €, le meilleur prix est au milieu.",
          schema: ecranSeulement(parabole([-1, 11, -1, 4], [{ q: [-0.1, 1, 0] }], [{ x: 4, y: 2.4 }, { x: 6, y: 2.4 }], { grand: true })),
          micros: ["quad_associer_parabole", "quad_image_calculer", "quad_lire_racines_courbe", "quad_role_a"],
        },
        {
          titre: "Une chute, sur Terre et sur la Lune",
          enonce:
            "On lâche une pierre du haut d'une falaise de $20$ m. Sa hauteur, en mètres, $t$ secondes après, est modélisée par $h(t) = -5t^2 + 20$.\na) Que vaut $h(0)$ ? Quel nombre de l'expression le donne ?\nb) Calculer $h(1)$ et $h(2)$. Au bout de combien de temps la pierre touche-t-elle le sol ?\nc) Vérifier que $h(t) = -5(t - 2)(t + 2)$. Pourquoi ne garde-t-on qu'une racine ?\nd) Sur la Lune, où la pesanteur est environ six fois plus faible, le modèle devient $h(t) = -0{,}8t^2 + 20$. Calculer $h(5)$. Que conclure ?",
          correction:
            "a) $h(0) = 20$ : la pierre part de $20$ m. C'est le nombre $c$.\nb) $h(1) = -5 + 20 = 15$ et $h(2) = -5 \\times 4 + 20 = 0$ : la pierre touche le sol au bout de $2$ secondes.\nc) $-5(t - 2)(t + 2) = -5(t^2 - 4) = -5t^2 + 20$ ✔️. Les racines sont $2$ et $-2$, mais un temps écoulé depuis le lâcher est positif : on garde $t = 2$.\nd) $h(5) = -0{,}8 \\times 25 + 20 = -20 + 20 = 0$ : sur la Lune, la chute dure $5$ secondes.\nSeul $a$ a changé, de $-5$ à $-0{,}8$ : la parabole est plus ouverte, la pierre tombe moins vite. Le tableau le montre : à $2$ s, elle est encore à $16{,}8$ m.\n⭐ Le rapport $\\dfrac{5}{0{,}8} = 6{,}25$ : on retrouve à peu près le « six fois plus faible ».\n⚠️ En une seconde, la pierre ne tombe que de $5$ m sur Terre ; elle accélère ensuite.",
          schema: tableau(["t (s)", "0", "1", "2", "5"], ["h sur la Lune (m)", 20, 19.2, 16.8, 0]),
          micros: ["quad_role_c", "quad_role_a", "quad_image_calculer", "quad_lire_racines_courbe"],
        },
        {
          titre: "Les papillons du pré",
          enonce:
            "Dans un pré, on compte les papillons chaque semaine à partir du 1er juin. Leur nombre, en centaines, $t$ semaines après le 1er juin, est modélisé par $N(t) = -0{,}2t^2 + 1{,}6t + 1{,}8$ ($0 \\leqslant t \\leqslant 9$).\na) Combien de papillons compte-t-on le 1er juin ?\nb) Calculer $N(2)$ et $N(6)$.\nc) Montrer que $N(t) = -0{,}2(t + 1)(t - 9)$.\nd) Au bout de combien de semaines le modèle prévoit-il qu'il n'y a plus de papillons ?\ne) Sans calcul, justifier que le nombre de papillons augmente puis diminue.",
          figure: parabole([-1, 10, -1, 6], [{ q: [-0.2, 1.6, 1.8] }], [], { grand: true }),
          correction:
            "a) $N(0) = 1{,}8$ centaine : $180$ papillons. C'est le nombre $c$.\nb) $N(2) = -0{,}8 + 3{,}2 + 1{,}8 = 4{,}2$ et $N(6) = -7{,}2 + 9{,}6 + 1{,}8 = 4{,}2$ : $420$ papillons les deux fois.\nc) $(t + 1)(t - 9) = t^2 - 9t + t - 9 = t^2 - 8t - 9$, et $-0{,}2(t^2 - 8t - 9) = -0{,}2t^2 + 1{,}6t + 1{,}8$ ✔️.\nd) $N(t) = 0$ pour $t = -1$ ou $t = 9$. On garde $t = 9$ : au bout de $9$ semaines, début août, il n'y a plus de papillons.\ne) $a = -0{,}2 < 0$ : la parabole est tournée vers le bas. Le nombre monte, atteint un sommet, puis redescend.\n⭐ Sur le dessin, le pic est en $t = 4$, à mi-chemin entre $-1$ et $9$ : $N(4) = 5$, soit $500$ papillons fin juin.\n⚠️ $-1$ est aussi une racine, mais $t = -1$ tomberait fin mai, avant le début des relevés : hors du modèle.",
          micros: ["quad_associer_parabole", "quad_image_calculer", "quad_role_c", "quad_lire_racines_courbe", "quad_role_a"],
        },
      ],
    },
  ],
};
