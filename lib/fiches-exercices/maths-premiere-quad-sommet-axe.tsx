// ─── Fiche d'exercices : parabole, sommet et axe de symétrie (1re sans spé) ───
//                              20 exercices corrigés
//
// Deuxième des quatre feuilles du chapitre « Modélisation quadratique »
// (BOP1MQ) de la première SANS spécialité (28/09/2026). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/parabole.bank.ts`.
//
// ⛔⛔ AUCUNE FORMULE N'EST ATTENDUE (programme : « on déterminera l'axe de
// symétrie par exemple en résolvant f(x) = c »). L'axe se trouve donc TOUJOURS
// par la symétrie : au milieu des deux racines d'une forme factorisée, ou au
// milieu des deux solutions de f(x) = f(0), ou entre deux points de même
// hauteur lus dans un tableau. Le sommet se lit aussi sur une forme
// a(x − α)² + β DONNÉE. PAS de « −b/2a », PAS DE DISCRIMINANT.
//
// ⭐ Frédéric, 28/09 : des dessins partout où on LIT, l'axe tracé en pointillés
// orange (`parabole()` de `figures-parabole.tsx`), la droite y = c en violet
// quand elle sert à trouver l'axe. Contextes : économie (coopérative, cinéma,
// salle de concert, composteurs), physique (plongeon, passe de volley, lob,
// saut à ski), histoire-géo (la vallée glaciaire, la voûte d'un tunnel, le pont
// ferroviaire). Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-quad-sommet-axe.mjs`.
//
// Micro-compétences : quad_allure (1, 3, 6, 7, 10, 11, 13, 15, 16, 18, 19, 20),
// quad_axe_symetrie (2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19,
// 20), quad_sommet (2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// 20), quad_symetrie_images (4, 8, 9, 11, 12, 15, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, tableau } from "@/lib/fiches-exercices/figures";
import { parabole, VERT } from "@/lib/fiches-exercices/figures-parabole";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesQuadSommetAxePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "quad-sommet-axe",
  titre: "Parabole : sommet et axe de symétrie",
  accroche:
    "Vingt exercices pour trouver le sommet et l'axe d'une parabole sans aucune formule : par les racines, par deux points de même hauteur, par la symétrie. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec l'axe tracé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On trouve l'axe, puis le sommet.",
      rappel: [
        "Parabole tournée vers le haut ($a > 0$) : son sommet est le point le plus BAS, un minimum. Tournée vers le bas ($a < 0$) : le plus HAUT, un maximum.",
        "L'axe de symétrie est vertical et passe par le sommet. Deux points de même ordonnée sont symétriques : l'axe passe au MILIEU de leurs abscisses.",
        "Avec la forme $a(x - x_1)(x - x_2)$ : l'axe est la droite $x = \\dfrac{x_1 + x_2}{2}$. L'ordonnée du sommet se calcule en remplaçant $x$.",
        "Avec une forme $a(x - \\alpha)^2 + \\beta$ donnée : le sommet est le point $S(\\alpha ; \\beta)$.",
      ],
      exercices: [
        {
          enonce:
            "Sans calcul, dire si chaque fonction admet un maximum ou un minimum :\n$f(x) = -2x^2 + 3x - 1$ ; $g(x) = 0{,}5x^2 - 4$ ; $k(x) = 3 - x^2 + 2x$.",
          correction:
            "On regarde seulement le signe du coefficient de $x^2$.\n$f$ : $a = -2 < 0$, parabole tournée vers le bas : $f$ admet un MAXIMUM, atteint au sommet.\n$g$ : $a = 0{,}5 > 0$, tournée vers le haut : $g$ admet un MINIMUM.\n$k$ : on relit $k(x) = -x^2 + 2x + 3$ ; $a = -1 < 0$ : $k$ admet un MAXIMUM.\n⚠️ Dans $3 - x^2 + 2x$, le coefficient de $x^2$ est $-1$, même s'il n'est pas écrit en premier.\n⭐ Vers le haut : une vallée, son sommet est le point le plus bas. Vers le bas : une colline.\nSur le dessin : $f$ en bleu, $g$ en orange, $k$ en vert. Seule $g$ a un point le plus BAS.",
          schema: parabole([-3, 4, -5, 5], [{ q: [-2, 3, -1] }, { q: [0.5, 0, -4], couleur: ORANGE }, { q: [-1, 2, 3], couleur: VERT }]),
          micros: ["quad_allure"],
        },
        {
          enonce: "Soit $f(x) = (x - 1)(x - 5)$. Déterminer l'axe de symétrie de sa courbe, puis les coordonnées du sommet.",
          correction:
            "Les racines se lisent sur les facteurs : $1$ et $5$.\nLes deux points $(1 ; 0)$ et $(5 ; 0)$ ont la même ordonnée : l'axe passe au milieu, en $x = \\dfrac{1 + 5}{2} = 3$.\nLe sommet est sur l'axe : son ordonnée est $f(3) = (3 - 1)(3 - 5) = 2 \\times (-2) = -4$.\nLe sommet est $S(3 ; -4)$.\n⚠️ L'axe est une DROITE : on écrit « $x = 3$ », et pas seulement « $3$ ».",
          schema: parabole([-1, 7, -5, 5], [{ q: [1, -6, 5] }], [{ x: 1, y: 0 }, { x: 5, y: 0 }, { x: 3, y: -4, label: "S" }], { axe: 3 }),
          micros: ["quad_axe_symetrie", "quad_sommet"],
        },
        {
          enonce:
            "Soit $f(x) = 2(x - 3)^2 + 1$. Donner le sommet de sa parabole et son axe de symétrie. Est-ce un minimum ou un maximum ?",
          correction:
            "Un carré est toujours positif ou nul : $(x - 3)^2 \\geqslant 0$, et il vaut $0$ seulement pour $x = 3$.\nDonc $2(x - 3)^2 + 1 \\geqslant 1$ : $f(x)$ ne descend jamais sous $1$, et vaut $1$ en $x = 3$.\nLe sommet est $S(3 ; 1)$ ; c'est un MINIMUM. L'axe de symétrie est la droite $x = 3$.\n⭐ Cohérent avec l'allure : $a = 2 > 0$, la parabole est tournée vers le haut.\n⚠️ Dans $(x - 3)^2$, le sommet est en $x = 3$, pas en $x = -3$ : c'est la valeur qui ANNULE la parenthèse.",
          schema: ecranSeulement(parabole([-1, 6, -1, 8], [{ q: [2, -12, 19] }], [{ x: 3, y: 1, label: "S" }], { axe: 3 })),
          micros: ["quad_sommet", "quad_axe_symetrie", "quad_allure"],
        },
        {
          enonce:
            "La parabole d'une fonction $f$ a pour axe de symétrie la droite $x = 2$. On sait que $f(0) = 5$ et $f(-1) = 10$. Donner, sans calcul, deux autres images.",
          correction:
            "Deux abscisses à la même distance de l'axe ont la même image.\n$0$ est à $2$ unités à gauche de l'axe ; à $2$ unités à droite, on trouve $2 + 2 = 4$. Donc $f(4) = f(0) = 5$.\n$-1$ est à $3$ unités à gauche ; à $3$ unités à droite : $2 + 3 = 5$. Donc $f(5) = f(-1) = 10$.\n⚠️ On reporte la DISTANCE à l'axe, pas le nombre : le symétrique de $0$ par rapport à $2$ n'est pas $-2$.",
          schema: ecranSeulement(
            parabole([-2, 6, -1, 11], [{ q: [1, -4, 5] }], [{ x: 0, y: 5 }, { x: 4, y: 5 }, { x: -1, y: 10 }, { x: 5, y: 10 }], { axe: 2, horizontale: 5, grand: true }),
          ),
          micros: ["quad_symetrie_images"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 - 6x + 2$.\na) Résoudre l'équation $f(x) = 2$.\nb) En déduire l'axe de symétrie de la parabole, puis son sommet.",
          correction:
            "a) $f(x) = 2$ s'écrit $x^2 - 6x + 2 = 2$, soit $x^2 - 6x = 0$.\nOn factorise par $x$ : $x(x - 6) = 0$, donc $x = 0$ ou $x = 6$.\nb) Les points $(0 ; 2)$ et $(6 ; 2)$ ont la même ordonnée : l'axe passe au milieu, en $x = \\dfrac{0 + 6}{2} = 3$.\nLe sommet a pour ordonnée $f(3) = 9 - 18 + 2 = -7$ : c'est $S(3 ; -7)$.\n⭐ C'est la méthode du programme : on coupe la parabole par la droite $y = 2$ (en violet), et l'axe passe entre les deux points.\n⚠️ Ne pas oublier la solution $x = 0$ : on ne divise jamais une équation par $x$.",
          schema: parabole([-1, 7, -8, 3], [{ q: [1, -6, 2] }], [{ x: 0, y: 2 }, { x: 6, y: 2 }, { x: 3, y: -7, label: "S" }], { axe: 3, horizontale: 2, grand: true }),
          micros: ["quad_axe_symetrie", "quad_sommet"],
        },
        {
          enonce: "Soit $f(x) = -(x + 2)(x - 4)$. Déterminer l'axe de symétrie, le sommet, et dire si c'est un maximum ou un minimum.",
          correction:
            "Racines : $x + 2 = 0$ donne $-2$ ; $x - 4 = 0$ donne $4$.\nL'axe passe au milieu : $x = \\dfrac{-2 + 4}{2} = 1$.\n$f(1) = -(1 + 2)(1 - 4) = -(3 \\times (-3)) = 9$ : le sommet est $S(1 ; 9)$.\nLe coefficient devant le produit est $-1 < 0$ : parabole tournée vers le bas, le sommet est un MAXIMUM.\n⚠️ Le milieu de $-2$ et $4$ est $1$, pas $3$ : on ADDITIONNE les racines avec leur signe.",
          schema: ecranSeulement(parabole([-3, 5, -1, 11], [{ q: [-1, 2, 8] }], [{ x: -2, y: 0 }, { x: 4, y: 0 }, { x: 1, y: 9, label: "S" }], { axe: 1, grand: true })),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
        {
          enonce:
            "Voici la courbe de $f(x) = -0{,}5x^2 + 2x + 1$.\na) Lire les coordonnées du sommet et l'équation de l'axe de symétrie.\nb) Vérifier l'ordonnée du sommet par le calcul.\nc) Le sommet est-il un maximum ou un minimum ?",
          figure: parabole([-2, 6, -4, 5], [{ q: [-0.5, 2, 1] }]),
          correction:
            "a) Le point le plus haut de la courbe est $S(2 ; 3)$ ; l'axe de symétrie est la droite $x = 2$.\nb) $f(2) = -0{,}5 \\times 4 + 4 + 1 = 3$ ✔️.\nc) La parabole est tournée vers le bas ($a = -0{,}5 < 0$) : le sommet est un MAXIMUM, $3$, atteint en $x = 2$.\n⭐ Une lecture graphique se CONTRÔLE par le calcul : on remplace l'abscisse lue dans l'expression.",
          micros: ["quad_sommet", "quad_axe_symetrie", "quad_allure"],
        },
        {
          enonce:
            "Voici un tableau de valeurs d'une fonction polynôme $f$ de degré $2$.\na) Quel est l'axe de symétrie de sa courbe ? Son sommet ?\nb) On donne aussi $f(5) = 7$. Que vaut $f(-1)$ ?",
          figure: tableau(["x", "0", "1", "2", "3", "4"], ["f(x)", 2, -1, -2, -1, 2]),
          correction:
            "a) Les images se répètent en miroir autour de $x = 2$ : $f(1) = f(3) = -1$ et $f(0) = f(4) = 2$.\nL'axe de symétrie est donc la droite $x = 2$, et le sommet est $S(2 ; -2)$.\nb) $5$ est à $3$ unités à droite de $2$ ; à $3$ unités à gauche, c'est $2 - 3 = -1$. Donc $f(-1) = f(5) = 7$.\n⭐ Dans un tableau, on cherche la valeur « du milieu » : celle autour de laquelle les images se répètent.",
          micros: ["quad_symetrie_images", "quad_axe_symetrie", "quad_sommet"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. Calculatrice autorisée.",
      rappel: [
        "Pour trouver l'axe sans les racines : on résout $f(x) = c$, avec $c = f(0)$. On trouve $x = 0$ et une autre valeur ; l'axe passe au milieu.",
        "Symétrie : deux abscisses à la même distance de l'axe ont la même image.",
        "Le sommet répond aux questions « le plus haut », « le plus bas », « le meilleur prix ». On donne toujours ses DEUX coordonnées, et leur sens.",
      ],
      exercices: [
        {
          titre: "L'arroseur du stade",
          enonce:
            "Un arroseur de pelouse, posé au sol, projette un jet d'eau dont la hauteur, en mètres, est $h(x) = -0{,}5x(x - 6)$, où $x$ est la distance horizontale à l'arroseur, en mètres.\na) À quelles distances le jet est-il au niveau du sol ?\nb) En déduire l'axe de symétrie de la parabole.\nc) Quelle hauteur maximale le jet atteint-il ?\nd) Calculer $h(1)$. En quel autre point le jet est-il à la même hauteur ?",
          correction:
            "a) $h(x) = 0$ quand $x = 0$ ou $x - 6 = 0$ : le jet part de l'arroseur ($x = 0$) et retombe à $6$ m.\nb) L'axe passe au milieu : $x = \\dfrac{0 + 6}{2} = 3$.\nc) $h(3) = -0{,}5 \\times 3 \\times (-3) = 4{,}5$ : le jet monte à $4{,}5$ m, à $3$ m de l'arroseur.\nd) $h(1) = -0{,}5 \\times 1 \\times (-5) = 2{,}5$ m.\n$1$ est à $2$ m avant l'axe ; à $2$ m après, c'est $5$. Donc $h(5) = 2{,}5$ m aussi.\n⚠️ La hauteur maximale est l'ORDONNÉE du sommet ($4{,}5$ m), pas son abscisse ($3$).",
          schema: ecranSeulement(parabole([-1, 7, -1, 6], [{ q: [-0.5, 3, 0] }], [{ x: 1, y: 2.5 }, { x: 5, y: 2.5 }, { x: 3, y: 4.5 }], { axe: 3, horizontale: 2.5 })),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_symetrie_images"],
        },
        {
          titre: "La coopérative de jus de pomme",
          enonce:
            "Une coopérative produit $x$ centaines de litres de jus de pomme par semaine ($0 \\leqslant x \\leqslant 8$). Son bénéfice, en milliers d'euros, est $B(x) = -0{,}5x^2 + 4x - 2$.\na) Calculer $B(0)$, puis résoudre $B(x) = -2$.\nb) En déduire l'axe de symétrie de la parabole.\nc) Pour quelle production le bénéfice est-il le plus grand ? Combien vaut-il ?",
          correction:
            "a) $B(0) = -2$ : sans rien produire, la coopérative perd $2\\,000$ € (ses frais fixes).\n$B(x) = -2$ s'écrit $-0{,}5x^2 + 4x = 0$, soit $x(-0{,}5x + 4) = 0$ : $x = 0$ ou $-0{,}5x + 4 = 0$, c'est-à-dire $x = 8$.\nb) L'axe passe au milieu de $0$ et $8$ : c'est la droite $x = 4$.\nc) $a = -0{,}5 < 0$ : la parabole est tournée vers le bas, le sommet est un maximum.\n$B(4) = -0{,}5 \\times 16 + 16 - 2 = 6$ : pour $400$ litres par semaine, le bénéfice maximal est de $6\\,000$ €.\n⚠️ $-0{,}5x + 4 = 0$ donne $x = \\dfrac{4}{0{,}5} = 8$, et non $2$.",
          schema: parabole([-1, 9, -3, 8], [{ q: [-0.5, 4, -2] }], [{ x: 0, y: -2 }, { x: 8, y: -2 }, { x: 4, y: 6, label: "S" }], { axe: 4, horizontale: -2, grand: true }),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
        {
          titre: "Des composteurs en bois",
          enonce:
            "Un atelier fabrique des composteurs en bois. Le coût de fabrication d'un composteur, en dizaines d'euros, quand l'atelier en fabrique $x$ centaines, est $C(x) = (x - 3)^2 + 5$.\na) La parabole est-elle tournée vers le haut ou vers le bas ?\nb) Donner le sommet. Quel est le coût minimal d'un composteur, et pour quelle production ?\nc) Calculer $C(1)$ et en déduire $C(5)$ sans calcul.",
          correction:
            "a) En développant, $(x - 3)^2 = x^2 - 6x + 9$ : le coefficient de $x^2$ est $1 > 0$. La parabole est tournée vers le haut.\nb) $(x - 3)^2 \\geqslant 0$, donc $C(x) \\geqslant 5$, avec égalité pour $x = 3$. Le sommet est $S(3 ; 5)$.\nLe coût minimal est de $5$ dizaines d'euros, soit $50$ € par composteur, pour $300$ composteurs.\nc) $C(1) = (1 - 3)^2 + 5 = 4 + 5 = 9$. $1$ et $5$ sont à $2$ unités de l'axe $x = 3$ : $C(5) = C(1) = 9$, soit $90$ €.\n⭐ Trop peu de composteurs, les machines coûtent cher pour chacun ; trop, il faut des heures en plus. Le bon choix est au sommet.",
          schema: ecranSeulement(parabole([-1, 7, -1, 12], [{ q: [1, -6, 14] }], [{ x: 1, y: 9 }, { x: 5, y: 9 }, { x: 3, y: 5, label: "S" }], { axe: 3, horizontale: 9, grand: true })),
          micros: ["quad_sommet", "quad_allure", "quad_symetrie_images"],
        },
        {
          titre: "La voûte d'un tunnel",
          enonce:
            "Pour une nouvelle ligne de train, des géomètres relèvent la hauteur de la voûte d'un tunnel (en mètres), le long de sa largeur.\na) Justifier que la droite $x = 4$ est l'axe de symétrie de la voûte.\nb) Donner le sommet. Que représente-t-il ?\nc) On mesure une hauteur de $3{,}5$ m en $x = 1$. Sans calcul, que vaut la hauteur en $x = 7$ ?\nd) On admet que $h(x) = -0{,}5x(x - 8)$. Vérifier la mesure faite en $x = 1$.",
          figure: tableau(["x (m)", "0", "2", "4", "6", "8"], ["h (m)", 0, 6, 8, 6, 0]),
          correction:
            "a) Les hauteurs se répètent en miroir autour de $4$ : $h(2) = h(6) = 6$ et $h(0) = h(8) = 0$. L'axe est la droite $x = 4$.\nb) Le sommet est $S(4 ; 8)$ : le point le plus haut de la voûte, à $8$ m, au milieu du tunnel.\nc) $1$ est à $3$ m de l'axe ; de l'autre côté, c'est $4 + 3 = 7$. La hauteur en $x = 7$ est aussi $3{,}5$ m.\nd) $h(1) = -0{,}5 \\times 1 \\times (-7) = 3{,}5$ ✔️.\n⭐ Un géomètre n'a besoin de mesurer qu'une moitié de la voûte : la symétrie donne l'autre.",
          schema: ecranSeulement(parabole([-1, 9, -1, 9], [{ q: [-0.5, 4, 0] }], [{ x: 1, y: 3.5 }, { x: 7, y: 3.5 }], { axe: 4, horizontale: 3.5 })),
          micros: ["quad_symetrie_images", "quad_axe_symetrie", "quad_sommet"],
        },
        {
          titre: "Une vallée glaciaire",
          enonce:
            "Dans les montagnes, les anciens glaciers ont creusé des vallées en forme de U. On modélise le profil d'une vallée par $y = 0{,}25(x - 1)(x - 9)$, où $x$ est la distance horizontale et $y$ l'altitude par rapport aux rebords, en centaines de mètres.\na) Où sont les deux rebords de la vallée ? Quelle est sa largeur ?\nb) Déterminer l'axe de symétrie de la vallée.\nc) Quelle est la profondeur de la vallée ?\nd) L'allure de la parabole est-elle cohérente avec une vallée ?",
          correction:
            "a) Les rebords sont à l'altitude $0$ : $y = 0$ pour $x = 1$ ou $x = 9$. La vallée mesure $9 - 1 = 8$ centaines de mètres, soit $800$ m de large.\nb) L'axe passe au milieu : $x = \\dfrac{1 + 9}{2} = 5$.\nc) Le fond est au sommet : $y = 0{,}25 \\times (5 - 1) \\times (5 - 9) = 0{,}25 \\times 4 \\times (-4) = -4$. La vallée est profonde de $400$ m.\nd) $a = 0{,}25 > 0$ : la parabole est tournée vers le haut, son sommet est le point le plus BAS. C'est bien le fond d'une vallée.\n⚠️ $-4$ ne veut pas dire « $-400$ m de profondeur » : le signe moins dit que le fond est SOUS les rebords, de $400$ m.",
          schema: parabole([0, 10, -5, 2], [{ q: [0.25, -2.5, 2.25] }], [{ x: 1, y: 0 }, { x: 9, y: 0 }, { x: 5, y: -4, label: "S" }], { axe: 5 }),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
        {
          titre: "La passe haute au volley",
          enonce:
            "Au volley, une passeuse envoie le ballon depuis ses mains. Sa hauteur, en mètres, est $h(x) = -0{,}2x^2 + 1{,}6x + 2$, où $x$ est la distance horizontale parcourue, en mètres.\na) Que vaut $h(0)$ ? Que représente ce nombre ?\nb) Résoudre $h(x) = 2$ et en déduire l'axe de symétrie.\nc) Quelle hauteur maximale le ballon atteint-il ?\nd) À quelle distance le ballon revient-il à la hauteur des mains de la passeuse ?",
          correction:
            "a) $h(0) = 2$ : le ballon part à $2$ m de haut, la hauteur des mains.\nb) $h(x) = 2$ s'écrit $-0{,}2x^2 + 1{,}6x = 0$, soit $x(-0{,}2x + 1{,}6) = 0$ : $x = 0$ ou $x = \\dfrac{1{,}6}{0{,}2} = 8$.\nL'axe passe au milieu : c'est la droite $x = 4$.\nc) $h(4) = -0{,}2 \\times 16 + 1{,}6 \\times 4 + 2 = -3{,}2 + 6{,}4 + 2 = 5{,}2$ : le ballon monte à $5{,}2$ m.\nd) En $x = 8$ : c'est la deuxième solution de $h(x) = 2$. Une coéquipière placée à $8$ m peut le frapper à la même hauteur.\n⭐ La droite $y = 2$ coupe la parabole en deux points symétriques : l'axe est entre les deux.",
          schema: ecranSeulement(parabole([-1, 9, -1, 7], [{ q: [-0.2, 1.6, 2] }], [{ x: 0, y: 2 }, { x: 8, y: 2 }, { x: 4, y: 5.2 }], { axe: 4, horizontale: 2 })),
          micros: ["quad_axe_symetrie", "quad_sommet"],
        },
        {
          titre: "Le prix d'une séance de cinéma",
          enonce:
            "Un cinéma de quartier étudie la recette d'une séance selon le prix $p$ du billet, en euros. Son modèle est une fonction polynôme de degré $2$, et l'étude donne la même recette, $960$ €, pour $8$ € et pour $12$ €.\na) Pour quel prix la recette est-elle la plus grande ? Justifier par la symétrie.\nb) Le modèle est $R(p) = p(200 - 10p)$. Calculer la recette maximale.\nc) Sachant que $R(6) = 840$, que vaut $R(14)$, sans calcul ?",
          correction:
            "a) $R(8) = R(12)$ : l'axe de symétrie passe au milieu, en $p = \\dfrac{8 + 12}{2} = 10$.\nLe sommet est donc atteint pour un billet à $10$ €. C'est un maximum : $R(p) = -10p^2 + 200p$, et $a = -10 < 0$.\nb) $R(10) = 10 \\times (200 - 100) = 1\\,000$ € : la recette maximale est de $1\\,000$ €.\nc) $6$ est à $4$ € sous l'axe ; $4$ € au-dessus, c'est $14$. Donc $R(14) = R(6) = 840$ €.\n⚠️ Augmenter le prix ne fait pas toujours gagner plus : au-delà de $10$ €, les spectateurs perdus coûtent plus que les euros gagnés.",
          schema: diagramme("barres", [
            { label: "6 €", value: 840 },
            { label: "8 €", value: 960 },
            { label: "10 €", value: 1000 },
            { label: "12 €", value: 960 },
            { label: "14 €", value: 840 },
          ]),
          micros: ["quad_symetrie_images", "quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
        {
          titre: "Le plongeon",
          enonce:
            "Une plongeuse s'élance d'un plongeoir de $10$ m. Sa hauteur au-dessus de l'eau, en mètres, $t$ secondes après son saut, est modélisée par $h(t) = -5(t - 2)(t + 1)$.\na) Vérifier que $h(0) = 10$.\nb) Quelles sont les racines de $h$ ? Laquelle a un sens ici ?\nc) En déduire l'axe de symétrie de la parabole, puis la hauteur maximale atteinte.",
          correction:
            "a) $h(0) = -5 \\times (-2) \\times 1 = 10$ ✔️ : au départ, elle est sur le plongeoir, à $10$ m.\nb) $t - 2 = 0$ donne $2$ ; $t + 1 = 0$ donne $-1$. Un temps après le saut est positif : elle entre dans l'eau au bout de $2$ secondes.\nc) L'axe passe au milieu des racines : $t = \\dfrac{-1 + 2}{2} = 0{,}5$.\n$h(0{,}5) = -5 \\times (-1{,}5) \\times 1{,}5 = 11{,}25$ : elle monte jusqu'à $11{,}25$ m, une demi-seconde après son saut.\n⭐ La racine $-1$ n'a pas de sens physique, mais elle SERT : sans elle, pas de milieu, donc pas d'axe.\n⚠️ $a = -5 < 0$ : c'est bien un maximum.",
          schema: ecranSeulement(parabole([-2, 3, -1, 12], [{ q: [-5, 5, 10] }], [{ x: 0, y: 10 }, { x: 0.5, y: 11.25 }], { axe: 0.5, grand: true })),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. On répond par une phrase, avec l'unité.",
      rappel: [
        "Dans un problème, l'axe et le sommet se trouvent par la symétrie : au milieu des racines, ou entre deux points de même hauteur.",
        "Le sommet a deux coordonnées : l'abscisse dit OÙ (ou quand, ou à quel prix), l'ordonnée dit COMBIEN.",
        "On répond avec l'unité, et on vérifie que la réponse a un sens dans la situation.",
      ],
      exercices: [
        {
          titre: "Sous l'arche du pont",
          enonce:
            "L'arche d'un pont ferroviaire en acier franchit une rivière. On la modélise par $h(x) = -0{,}75x(x - 4)$, où $x$ et $h(x)$ sont en dizaines de mètres ; les pieds de l'arche sont au niveau de l'eau.\na) Où sont les pieds de l'arche ? Quelle est sa portée, en mètres ?\nb) Déterminer l'axe de symétrie et le sommet de l'arche. Quelle est sa hauteur, en mètres ?\nc) Calculer $h(1)$ et en déduire $h(3)$.\nd) Un bateau haut de $20$ m et large de $20$ m passe sous l'arche, bien au centre. Passe-t-il ?",
          figure: parabole([-1, 5, -1, 4], [{ q: [-0.75, 3, 0] }]),
          correction:
            "a) $h(x) = 0$ pour $x = 0$ ou $x = 4$ : les pieds sont en $0$ et en $4$. La portée est de $4$ dizaines de mètres, soit $40$ m.\nb) L'axe passe au milieu des pieds : $x = 2$. $h(2) = -0{,}75 \\times 2 \\times (-2) = 3$ : le sommet est $S(2 ; 3)$, l'arche culmine à $30$ m.\nc) $h(1) = -0{,}75 \\times 1 \\times (-3) = 2{,}25$. $3$ est le symétrique de $1$ par rapport à $2$ : $h(3) = 2{,}25$.\nd) Centré, le bateau occupe la bande de $x = 1$ à $x = 3$ ($20$ m $= 2$ dizaines de mètres, une de chaque côté de l'axe).\nAux bords de cette bande, l'arche est à $2{,}25$ dizaines de mètres, soit $22{,}5$ m ; entre les deux, elle est encore plus haute.\n$22{,}5 > 20$ : le bateau passe, avec $2{,}5$ m de marge.\n⚠️ Le point critique n'est pas le milieu du bateau, mais ses COINS : c'est là que l'arche est la plus basse.",
          schema: ecranSeulement(
            parabole(
              [-1, 5, -1, 4],
              [
                { q: [-0.75, 3, 0] },
                { pts: [[1, 0], [1, 2], [3, 2], [3, 0]], couleur: ORANGE },
              ],
              [{ x: 1, y: 2.25 }, { x: 3, y: 2.25 }],
              { axe: 2 },
            ),
          ),
          micros: ["quad_axe_symetrie", "quad_sommet", "quad_symetrie_images"],
        },
        {
          titre: "La salle de concert",
          enonce:
            "Le nombre de spectateurs d'une salle de concert dépend du prix $x$ du billet, en euros : $600 - 20x$ spectateurs ($0 \\leqslant x \\leqslant 30$).\na) Montrer que la recette est $R(x) = -20x^2 + 600x$, puis que $R(x) = -20x(x - 30)$.\nb) Calculer $R(10)$ et $R(20)$. Qu'en déduire pour l'axe de symétrie ?\nc) Quel prix rend la recette maximale ? Combien de spectateurs viennent alors, pour quelle recette ?\nd) Quel autre prix donne la même recette qu'un billet à $26$ € ?",
          correction:
            "a) Recette = prix × spectateurs : $x(600 - 20x) = 600x - 20x^2 = -20x^2 + 600x$. Et $-20x(x - 30) = -20x^2 + 600x$ ✔️.\nb) $R(10) = 10 \\times 400 = 4\\,000$ € et $R(20) = 20 \\times 200 = 4\\,000$ €. Même recette : l'axe passe au milieu, en $x = 15$.\n✔️ Les racines $0$ et $30$ donnent le même milieu.\nc) $a = -20 < 0$ : le sommet est un maximum, pour un billet à $15$ €.\nIl y a alors $600 - 20 \\times 15 = 300$ spectateurs, et $R(15) = 15 \\times 300 = 4\\,500$ €.\nd) $26$ est à $11$ € au-dessus de $15$ ; $11$ € au-dessous, c'est $4$ €. Un billet à $4$ € donne la même recette : $R(4) = R(26) = 2\\,080$ €.\n⭐ Le diagramme montre la symétrie : les barres se répondent autour de $15$ €.",
          schema: diagramme("barres", [
            { label: "5 €", value: 2500 },
            { label: "10 €", value: 4000 },
            { label: "15 €", value: 4500 },
            { label: "20 €", value: 4000 },
            { label: "25 €", value: 2500 },
          ]),
          micros: ["quad_symetrie_images", "quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
        {
          titre: "Le saut à ski",
          enonce:
            "Un skieur de freestyle s'élance d'un tremplin. Sa hauteur au-dessus de la piste, en mètres, est $h(x) = -0{,}25(x - 4)^2 + 4$, où $x$ est la distance horizontale depuis le bord du tremplin, en mètres.\na) Donner le sommet de la trajectoire, et justifier que c'est un maximum.\nb) Vérifier que $h(0) = 0$. En déduire, par symétrie, où le skieur retombe sur la piste.\nc) Calculer $h(2)$, et en déduire $h(6)$.\nd) Développer $h(x)$, et retrouver le résultat de la question b).",
          figure: parabole([-1, 9, -1, 6], [{ q: [-0.25, 2, 0] }]),
          correction:
            "a) $(x - 4)^2 \\geqslant 0$, donc $-0{,}25(x - 4)^2 \\leqslant 0$ et $h(x) \\leqslant 4$, avec égalité pour $x = 4$.\nLe sommet est $S(4 ; 4)$ : le skieur monte au plus à $4$ m, à $4$ m du tremplin. C'est un maximum.\nb) $h(0) = -0{,}25 \\times 16 + 4 = 0$ ✔️. $0$ est à $4$ m avant l'axe $x = 4$ ; $4$ m après, c'est $8$ : il retombe à $8$ m du tremplin.\nc) $h(2) = -0{,}25 \\times 4 + 4 = 3$. $6$ est le symétrique de $2$ : $h(6) = 3$ m.\nd) $(x - 4)^2 = x^2 - 8x + 16$, donc $h(x) = -0{,}25x^2 + 2x - 4 + 4 = -0{,}25x^2 + 2x$.\nEt $-0{,}25x^2 + 2x = -0{,}25x(x - 8)$ : les racines sont $0$ et $8$ ✔️.\n⚠️ $-0{,}25 \\times 16 = -4$ : le carré $(0 - 4)^2 = 16$ est calculé AVANT la multiplication.",
          micros: ["quad_sommet", "quad_axe_symetrie", "quad_symetrie_images", "quad_allure"],
        },
        {
          titre: "Le lob",
          enonce:
            "Au tennis, une joueuse fait un lob. On relève la hauteur de la balle (en mètres) selon la distance horizontale parcourue (en mètres).\na) Pourquoi la trajectoire a-t-elle pour axe de symétrie la droite $x = 3$ ?\nb) Donner le sommet de la trajectoire.\nc) Son adversaire, bras et raquette levés, atteint $3$ m de haut. Placée en $x = 5$, peut-elle toucher la balle ?\nd) On propose le modèle $h(x) = -0{,}25(x - 3)^2 + 4{,}25$. Vérifier qu'il redonne $h(0)$ et $h(5)$ du tableau.",
          figure: tableau(["x (m)", "0", "1", "2", "3", "4", "5", "6"], ["h (m)", 2, 3.25, 4, 4.25, 4, 3.25, 2], true),
          correction:
            "a) Les hauteurs se répètent en miroir autour de $3$ : $h(2) = h(4) = 4$, $h(1) = h(5) = 3{,}25$, $h(0) = h(6) = 2$.\nb) Le sommet est $S(3 ; 4{,}25)$ : la balle monte à $4{,}25$ m, à $3$ m de la joueuse.\nc) En $x = 5$, la balle est à $3{,}25$ m : $25$ cm au-dessus de ce que l'adversaire peut atteindre. Elle ne peut pas la toucher.\nd) $h(0) = -0{,}25 \\times 9 + 4{,}25 = -2{,}25 + 4{,}25 = 2$ ✔️ et $h(5) = -0{,}25 \\times 4 + 4{,}25 = 3{,}25$ ✔️.\n⭐ Le lob réussi passe au-dessus de l'adversaire, puis redescend : c'est la parabole tournée vers le bas ($a = -0{,}25 < 0$).",
          schema: ecranSeulement(parabole([-1, 7, -1, 6], [{ q: [-0.25, 1.5, 2] }], [{ x: 1, y: 3.25 }, { x: 5, y: 3.25 }, { x: 3, y: 4.25 }], { axe: 3, horizontale: 3 })),
          micros: ["quad_symetrie_images", "quad_axe_symetrie", "quad_sommet", "quad_allure"],
        },
      ],
    },
  ],
};
