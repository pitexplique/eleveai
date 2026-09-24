// ─── Fiche d'exercices : transformations et homothétie (3e) — 20 exercices ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-transformations.tsx` et sur
// les micros du coach de 3e (notionId sym_transformation). On réactive les
// quatre transformations qui conservent les longueurs (symétries, translation,
// rotation), puis la nouveauté de 3e : l'HOMOTHÉTIE — la reconnaître, la
// construire, lire son rapport, et ce qu'elle fait aux longueurs (× |k|) et aux
// aires (× k²).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni OA = 4 et OA' = 12,
// ni OA = 10 et OA' = 5, ni OA = 3 et OA' = 9, ni le segment de 7 cm de
// rapport 4, ni le logo du club.
//
// Les trois pièges qui reviennent : k négatif = l'image est DE L'AUTRE CÔTÉ du
// centre (exercices 7, 8, 10, 16, 17) ; l'aire est multipliée par k², pas par k
// (8, 12, 14, 15, 16, 18, 20) ; le sens d'une rotation (4, 13).
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : presque chaque corrigé
// dessine la figure en BLEU et son image en ORANGE sur le quadrillage, avec
// l'axe ou les droites qui passent par le centre en GRIS. Tous les points
// étiquetés sont à 2 carreaux au moins des axes du repère et loin du bord.
//
// Les chiffres du monde, et d'où ils viennent :
// - tirages photo 10 × 15 cm et 20 × 30 cm : formats standard des laboratoires — ex. 12 ;
// - chambre noire (sténopé) : l'image se forme à l'envers, rapport négatif — ex. 17 ;
// - carte de randonnée au 1/25 000 : l'échelle des cartes topographiques — ex. 20.
//
// Les corrigés sont écrits à la première personne (« je compte »), comme les
// autres feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-transformations-3e.mjs` —
// chaque image est recalculée par coordonnées, et chaque segment et chaque
// point dessinés sont relus dans le source et confrontés au modèle.
//
// Micro-compétences : sym_symetrie_translation_rotation (1, 2, 3, 4, 9, 13, 19),
// sym_homothetie_reconnaitre (5, 11, 15), sym_homothetie_construire (6, 8, 10,
// 14), sym_homothetie_rapport (7, 11, 12, 16, 17, 18, 20),
// sym_transformation_effet (8, 12, 14, 15, 16, 18, 20),
// sym_transformation_defi (9, 16, 17, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, vecteurs } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";

// ⭐ UNE FIGURE = DES LIGNES BRISÉES (segments sans pointe, `vecteurs()`).
// Trois sommets ou plus : le polygone est FERMÉ ; deux : un simple segment.
// Bleu par défaut (la figure), ORANGE l'image, GRIS l'axe ou les droites qui
// passent par le centre. ⭐ Le script de recalcul RELIT `pts` et les points
// étiquetés : les écrire en clair, jamais calculés.
type Ligne = { pts: [number, number][]; couleur?: string };
const trace = (fenetre: [number, number], lignes: Ligne[], points: { x: number; y: number; label: string }[] = []) =>
  vecteurs(
    fenetre,
    lignes.flatMap(({ pts, couleur }) => {
      const bords: [[number, number], [number, number]][] =
        pts.length > 2 ? pts.map((p, i) => [p, pts[(i + 1) % pts.length]]) : [[pts[0], pts[1]]];
      return bords.map(([de, vers]) => ({ de, vers, couleur, pointe: false }));
    }),
    points,
  );

export const exercicesTransformations3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "sym-transformation",
  titre: "Transformations et homothétie",
  accroche:
    "Vingt exercices, du geste seul au problème : plier, faire un demi-tour, glisser, tourner, puis agrandir ou réduire avec une homothétie — la construire, retrouver son centre et son rapport, et voir ce qu'elle fait aux longueurs et aux aires. Une photo agrandie, une chambre noire, un vidéoprojecteur, une frise, une carte de randonnée. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, sur le quadrillage, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape, le piège nommé, et la figure dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/sym-transformation", titre: "Transformations et homothétie" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les carreaux, en partant toujours de l'axe ou du centre.",
      rappel: [
        "Symétrie axiale : un PLIAGE le long de l'axe. Symétrie centrale : un DEMI-TOUR autour du centre $O$, qui est le milieu de $[AA']$.",
        "Translation : toute la figure GLISSE du même déplacement. Rotation : elle TOURNE autour d'un centre, d'un angle donné, dans un sens donné.",
        "Homothétie de centre $O$ et de rapport $k$ : $O$, $A$ et $A'$ sont alignés, et $OA' = |k| \\times OA$. Si $k > 0$, $A'$ est du même côté que $A$ ; si $k < 0$, de l'autre côté de $O$.",
        "Les quatre premières conservent les longueurs. L'homothétie multiplie les longueurs par $|k|$ et les aires par $k^2$ ; elle conserve les angles.",
      ],
      exercices: [
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $ABC$ et la droite grise $(d)$.\na) Construire le triangle $A'B'C'$, image de $ABC$ par la symétrie d'axe $(d)$.\nb) Donner les coordonnées de $A'$, $B'$ et $C'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 3], [5, 3], [3, 7]] }, { pts: [[6, 1], [6, 10]], couleur: GRIS }],
            [{ x: 3, y: 3, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 3, y: 7, label: "C" }],
          ),
          correction:
            "Une symétrie axiale, c'est un PLIAGE le long de $(d)$. Pour chaque point, je compte les carreaux qui le séparent de l'axe, à l'horizontale, puis je reporte le même nombre de carreaux DE L'AUTRE CÔTÉ.\n$A$ est à $3$ carreaux à gauche de $(d)$ : $A'$ est à $3$ carreaux à droite, en $A'(9\\,;\\,3)$.\n$B$ est à $1$ carreau à gauche : $B'(7\\,;\\,3)$.\n$C$ est à $3$ carreaux à gauche : $C'(9\\,;\\,7)$.\nLa hauteur ne change pas : le pliage se fait perpendiculairement à l'axe.\n⭐ Contrôle : $A'B' = AB = 2$ carreaux. Le triangle est retourné, comme dans un miroir, mais il garde sa taille.\n⛔ Le piège : faire GLISSER le triangle de l'autre côté sans le retourner. $B$, le sommet le plus proche de l'axe, doit rester le plus proche : $B'$ est à $1$ carreau de $(d)$, pas à $3$.\nRéponse : $A'(9\\,;\\,3)$, $B'(7\\,;\\,3)$ et $C'(9\\,;\\,7)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 3], [5, 3], [3, 7]] },
              { pts: [[9, 3], [7, 3], [9, 7]], couleur: ORANGE },
              { pts: [[6, 1], [6, 10]], couleur: GRIS },
            ],
            [{ x: 3, y: 3, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 3, y: 7, label: "C" }, { x: 9, y: 3, label: "A'" }, { x: 7, y: 3, label: "B'" }, { x: 9, y: 7, label: "C'" }],
          ),
          micros: ["sym_symetrie_translation_rotation"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $DEF$ et placé le point $O$.\nConstruire le triangle $D'E'F'$, image de $DEF$ par la symétrie de centre $O$, et donner les coordonnées de ses sommets.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 6], [5, 8], [5, 6]] }],
            [{ x: 6, y: 5, label: "O" }, { x: 3, y: 6, label: "D" }, { x: 5, y: 8, label: "E" }, { x: 5, y: 6, label: "F" }],
          ),
          correction:
            "Une symétrie de centre $O$, c'est un DEMI-TOUR autour de $O$ : $O$ est le milieu de $[DD']$. Je compte le déplacement de $D$ jusqu'à $O$, puis je le refais une deuxième fois à partir de $O$.\nDe $D$ à $O$ : $3$ carreaux à droite, $1$ vers le bas. Je repars de $O$ : encore $3$ à droite et $1$ vers le bas, $D'(9\\,;\\,4)$.\nDe $E$ à $O$ : $1$ à droite, $3$ vers le bas. Donc $E'(7\\,;\\,2)$.\nDe $F$ à $O$ : $1$ à droite, $1$ vers le bas. Donc $F'(7\\,;\\,4)$.\n⭐ Contrôle : les droites grises $(DD')$ et $(EE')$ se coupent en $O$, au milieu de chaque segment.\n⛔ Le piège : ne retourner la figure que dans un sens, comme un pliage. Un demi-tour inverse la gauche et la droite ET le haut et le bas : $E$, le sommet du haut, devient $E'$, le sommet du bas.\nRéponse : $D'(9\\,;\\,4)$, $E'(7\\,;\\,2)$ et $F'(7\\,;\\,4)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 6], [5, 8], [5, 6]] },
              { pts: [[9, 4], [7, 2], [7, 4]], couleur: ORANGE },
              { pts: [[3, 6], [9, 4]], couleur: GRIS },
              { pts: [[5, 8], [7, 2]], couleur: GRIS },
            ],
            [{ x: 6, y: 5, label: "O" }, { x: 3, y: 6, label: "D" }, { x: 5, y: 8, label: "E" }, { x: 5, y: 6, label: "F" }, { x: 9, y: 4, label: "D'" }, { x: 7, y: 2, label: "E'" }, { x: 7, y: 4, label: "F'" }],
          ),
          micros: ["sym_symetrie_translation_rotation"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $ABC$ et placé le point $A'$.\nConstruire l'image de $ABC$ par la translation qui transforme $A$ en $A'$, et donner les coordonnées de $B'$ et $C'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 5], [5, 5], [2, 8]] }],
            [{ x: 2, y: 5, label: "A" }, { x: 5, y: 5, label: "B" }, { x: 2, y: 8, label: "C" }, { x: 6, y: 3, label: "A'" }],
          ),
          correction:
            "Une translation fait GLISSER toute la figure du même déplacement, sans la tourner ni la retourner. Le déplacement se lit de $A$ à $A'$ : $4$ carreaux à droite, $2$ vers le bas.\nJe refais ce déplacement depuis $B$ : $B'(9\\,;\\,3)$.\nPuis depuis $C$ : $C'(6\\,;\\,6)$.\n⭐ Contrôle : les trois flèches grises sont parallèles et de même longueur, et $A'B'C'$ a la même forme, la même taille et la même orientation que $ABC$ : l'angle droit est toujours en $A'$.\n⛔ Le piège : partir de $A'$ pour placer $B'$. Chaque point glisse depuis SA propre position.\nRéponse : $B'(9\\,;\\,3)$ et $C'(6\\,;\\,6)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 5], [5, 5], [2, 8]] },
              { pts: [[6, 3], [9, 3], [6, 6]], couleur: ORANGE },
              { pts: [[2, 5], [6, 3]], couleur: GRIS },
              { pts: [[5, 5], [9, 3]], couleur: GRIS },
              { pts: [[2, 8], [6, 6]], couleur: GRIS },
            ],
            [{ x: 2, y: 5, label: "A" }, { x: 5, y: 5, label: "B" }, { x: 2, y: 8, label: "C" }, { x: 6, y: 3, label: "A'" }, { x: 9, y: 3, label: "B'" }, { x: 6, y: 6, label: "C'" }],
          ),
          micros: ["sym_symetrie_translation_rotation"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $ABC$ et placé le point $O$.\nConstruire l'image de $ABC$ par la rotation de centre $O$, d'angle 90°, dans le sens CONTRAIRE des aiguilles d'une montre. Donner les coordonnées de $A'$, $B'$ et $C'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[7, 4], [9, 4], [7, 6]] }],
            [{ x: 5, y: 4, label: "O" }, { x: 7, y: 4, label: "A" }, { x: 9, y: 4, label: "B" }, { x: 7, y: 6, label: "C" }],
          ),
          correction:
            "Une rotation fait TOURNER la figure autour de $O$ : chaque point garde sa distance à $O$ et tourne du même angle, ici un quart de tour.\nDans le sens contraire des aiguilles d'une montre, ce qui part vers la droite de $O$ se retrouve vers le haut.\n$A$ est à $2$ carreaux à droite de $O$ : après le quart de tour, $A'$ est à $2$ carreaux au-dessus, $A'(5\\,;\\,6)$.\n$B$ est à $4$ carreaux à droite : $B'(5\\,;\\,8)$.\n$C$ est à $2$ carreaux à droite et $2$ en haut. « À droite » devient « en haut », et « en haut » devient « à gauche » : $C'(3\\,;\\,6)$.\n⭐ Contrôle : les deux traits gris, de $O$ à $A$ et de $O$ à $A'$, font un angle droit et ont la même longueur.\n⛔ Le piège : tourner dans le sens des aiguilles d'une montre. $A$ irait sous $O$, en $(5\\,;\\,2)$ : c'est l'autre quart de tour.\nRéponse : $A'(5\\,;\\,6)$, $B'(5\\,;\\,8)$ et $C'(3\\,;\\,6)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[7, 4], [9, 4], [7, 6]] },
              { pts: [[5, 6], [5, 8], [3, 6]], couleur: ORANGE },
              { pts: [[5, 4], [7, 4]], couleur: GRIS },
              { pts: [[5, 4], [5, 6]], couleur: GRIS },
            ],
            [{ x: 5, y: 4, label: "O" }, { x: 7, y: 4, label: "A" }, { x: 9, y: 4, label: "B" }, { x: 7, y: 6, label: "C" }, { x: 5, y: 6, label: "A'" }, { x: 5, y: 8, label: "B'" }, { x: 3, y: 6, label: "C'" }],
          ),
          micros: ["sym_symetrie_translation_rotation"],
        },
        {
          enonce:
            "Sur le quadrillage, le triangle orange $A'B'C'$ est-il l'image du triangle bleu $ABC$ par une homothétie de centre $O$ ?\na) Les points $O$, $A$, $A'$ sont-ils alignés ? Et $O$, $B$, $B'$ ? Et $O$, $C$, $C'$ ?\nb) Comparer $OA'$ et $OA$ en comptant les carreaux, puis $OB'$ et $OB$.\nc) Conclure, et donner le rapport.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 3], [5, 3], [3, 5]] }, { pts: [[4, 4], [8, 4], [4, 8]], couleur: ORANGE }],
            [{ x: 2, y: 2, label: "O" }, { x: 3, y: 3, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 3, y: 5, label: "C" }, { x: 4, y: 4, label: "A'" }, { x: 8, y: 4, label: "B'" }, { x: 4, y: 8, label: "C'" }],
          ),
          correction:
            "Une homothétie de centre $O$ envoie chaque point sur la droite qui le relie à $O$, en multipliant sa distance à $O$ par un même nombre.\na) De $O$ à $A$ : $1$ à droite, $1$ en haut. De $O$ à $A'$ : $2$ à droite, $2$ en haut, le même déplacement fait deux fois. Donc $O$, $A$, $A'$ sont alignés.\nDe même, de $O$ à $B$ : $3$ à droite, $1$ en haut ; de $O$ à $B'$ : $6$ à droite, $2$ en haut. De $O$ à $C$ : $1$ à droite, $3$ en haut ; de $O$ à $C'$ : $2$ à droite, $6$ en haut. Les trois droites grises passent par $O$.\nb) Chaque déplacement depuis $O$ est doublé : $OA' = 2 \\times OA$ et $OB' = 2 \\times OB$.\nc) Oui : c'est l'homothétie de centre $O$ et de rapport $k = 2$. Les côtés sont doublés aussi : $AB = 2$ carreaux, $A'B' = 4$ carreaux.\n⛔ Le piège : conclure dès que deux triangles « ont la même forme ». Il faut que chaque point et son image soient alignés avec LE MÊME point $O$, avec LE MÊME rapport.\nRéponse : oui, homothétie de centre $O$ et de rapport $2$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 3], [5, 3], [3, 5]] },
              { pts: [[4, 4], [8, 4], [4, 8]], couleur: ORANGE },
              { pts: [[2, 2], [4, 4]], couleur: GRIS },
              { pts: [[2, 2], [8, 4]], couleur: GRIS },
              { pts: [[2, 2], [4, 8]], couleur: GRIS },
            ],
            [{ x: 2, y: 2, label: "O" }, { x: 3, y: 3, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 3, y: 5, label: "C" }, { x: 4, y: 4, label: "A'" }, { x: 8, y: 4, label: "B'" }, { x: 4, y: 8, label: "C'" }],
          ),
          micros: ["sym_homothetie_reconnaitre"],
        },
        {
          enonce:
            "On a placé les points $O$, $A$ et $B$ sur le quadrillage.\na) Placer $A'$, l'image de $A$ par l'homothétie de centre $O$ et de rapport $3$.\nb) Placer $B'$, l'image de $B$ par l'homothétie de centre $O$ et de rapport $\\dfrac{1}{2}$.",
          figure: trace([-1, 11], [], [{ x: 3, y: 3, label: "O" }, { x: 5, y: 4, label: "A" }, { x: 7, y: 7, label: "B" }]),
          correction:
            "Pour placer l'image d'un point, je pars TOUJOURS du centre $O$ : je lis le déplacement de $O$ vers le point, je le multiplie par $k$, et je le refais depuis $O$.\na) De $O$ à $A$ : $2$ à droite, $1$ en haut. Multiplié par $3$ : $6$ à droite, $3$ en haut. Depuis $O$ : $A'(9\\,;\\,6)$.\nb) De $O$ à $B$ : $4$ à droite, $4$ en haut. Multiplié par $\\dfrac{1}{2}$ : $2$ à droite, $2$ en haut. Depuis $O$ : $B'(5\\,;\\,5)$, le milieu de $[OB]$.\n⭐ Contrôle : $O$, $A$, $A'$ sont sur la même droite grise, et $A'$ est trois fois plus loin de $O$ que $A$. Un rapport entre $0$ et $1$ rapproche le point du centre.\n⛔ Le piège au a) : partir de $A$ et refaire trois fois le déplacement depuis $A$. On arriverait en $(11\\,;\\,7)$ : quatre fois plus loin de $O$, pas trois.\nRéponse : $A'(9\\,;\\,6)$ et $B'(5\\,;\\,5)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 3], [9, 6]], couleur: GRIS },
              { pts: [[3, 3], [7, 7]], couleur: GRIS },
            ],
            [{ x: 3, y: 3, label: "O" }, { x: 5, y: 4, label: "A" }, { x: 7, y: 7, label: "B" }, { x: 9, y: 6, label: "A'" }, { x: 5, y: 5, label: "B'" }],
          ),
          micros: ["sym_homothetie_construire"],
        },
        {
          enonce:
            "Dans chaque cas, $A'$ est l'image de $A$ par une homothétie de centre $O$. Donner son rapport $k$.\na) $OA = 2{,}5$ cm, $OA' = 7{,}5$ cm, et $A'$ est sur la demi-droite $[OA)$.\nb) $OA = 6$ cm, $OA' = 4$ cm, et $A'$ est sur la demi-droite $[OA)$.\nc) $OA = 5$ cm, $OA' = 3$ cm, et $O$ est ENTRE $A$ et $A'$.",
          correction:
            "Le rapport se lit en divisant une distance de l'IMAGE par la distance de DÉPART : $OA' \\div OA$. Puis son signe dit de quel côté de $O$ se trouve l'image.\na) $7{,}5 \\div 2{,}5 = 3$. $A'$ est du même côté que $A$ : $k = 3$, un agrandissement.\nb) $4 \\div 6 = \\dfrac{2}{3}$. Même côté : $k = \\dfrac{2}{3}$, une réduction.\nc) $3 \\div 5 = 0{,}6$. Mais $O$ est entre $A$ et $A'$ : l'image est de l'autre côté du centre, donc $k = -0{,}6$.\n⛔ Le piège au a) : calculer une différence, $7{,}5 - 2{,}5 = 5$. Le rapport est un QUOTIENT.\n⛔ Le piège au c) : oublier le signe. Avec $k = 0{,}6$, $A'$ serait entre $O$ et $A$, du même côté.\nRéponse : $k = 3$ ; $k = \\dfrac{2}{3}$ ; $k = -0{,}6$.",
          micros: ["sym_homothetie_rapport"],
        },
        {
          enonce:
            "Sur le quadrillage, $ABCD$ est un carré de $1$ carreau de côté. On construit son image $A'B'C'D'$ par l'homothétie de centre $O$ et de rapport $-3$.\na) Placer $A'$ et $C'$, puis tracer $A'B'C'D'$.\nb) Quelle est la longueur du côté de $A'B'C'D'$ ? Son aire, en carreaux ?\nc) Que deviennent les angles droits ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[9, 9], [10, 9], [10, 10], [9, 10]] }],
            [{ x: 8, y: 8, label: "O" }, { x: 9, y: 9, label: "A" }, { x: 10, y: 10, label: "C" }],
          ),
          correction:
            "a) Rapport $-3$ : je lis le déplacement de $O$ vers le point, je le multiplie par $3$, et je le refais DANS L'AUTRE SENS, de l'autre côté de $O$.\nDe $O$ à $A$ : $1$ à droite, $1$ en haut. Fois $-3$ : $3$ à gauche, $3$ en bas, $A'(5\\,;\\,5)$.\nDe $O$ à $C$ : $2$ à droite, $2$ en haut. Fois $-3$ : $6$ à gauche, $6$ en bas, $C'(2\\,;\\,2)$.\nDe même, $B'(2\\,;\\,5)$ et $D'(5\\,;\\,2)$.\nb) Les longueurs sont multipliées par $3$ : le signe ne compte pas pour une longueur. Le côté mesure $1 \\times 3 = 3$ carreaux.\nL'aire est multipliée par $(-3)^2 = 9$ : $1 \\times 9 = 9$ carreaux, et je les compte sur le dessin.\nc) Une homothétie conserve les angles : $A'B'C'D'$ a quatre angles droits, c'est encore un carré.\n⛔ Le piège : placer $A'$ du même côté que $A$. Un rapport NÉGATIF envoie l'image de l'autre côté du centre, et le carré est retourné.\n⛔ Et pour l'aire : ni $\\times 3$, ni $\\times (-3)$. L'aire est multipliée par $k^2$, toujours positif.\nRéponse : un carré de côté $3$ carreaux et d'aire $9$ carreaux, aux angles droits conservés.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[9, 9], [10, 9], [10, 10], [9, 10]] },
              { pts: [[5, 5], [2, 5], [2, 2], [5, 2]], couleur: ORANGE },
              { pts: [[10, 10], [2, 2]], couleur: GRIS },
              { pts: [[10, 9], [2, 5]], couleur: GRIS },
            ],
            [{ x: 8, y: 8, label: "O" }, { x: 9, y: 9, label: "A" }, { x: 10, y: 10, label: "C" }, { x: 5, y: 5, label: "A'" }, { x: 2, y: 2, label: "C'" }],
          ),
          micros: ["sym_homothetie_construire", "sym_transformation_effet"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet : construire, justifier, calculer.",
      rappel: [
        "Construire l'image d'un point par homothétie : je pars TOUJOURS du centre. Le déplacement de $O$ vers $A$, multiplié par $k$, refait depuis $O$.",
        "Le rapport est un quotient : $|k| = \\dfrac{OA'}{OA}$, avec un signe moins si $O$ est entre $A$ et $A'$.",
        "Longueurs $\\times |k|$, aires $\\times k^2$, angles conservés. Une rotation de 180° est une symétrie centrale.",
      ],
      exercices: [
        {
          enonce:
            "Sur le quadrillage : le triangle $ABC$, la droite verticale $(d_1)$ et la droite horizontale $(d_2)$, qui se coupent en $I$.\na) Construire $A'B'C'$, l'image de $ABC$ par la symétrie d'axe $(d_1)$.\nb) Construire $A''B''C''$, l'image de $A'B'C'$ par la symétrie d'axe $(d_2)$.\nc) Quelle transformation, en un seul geste, envoie $ABC$ sur $A''B''C''$ ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 6], [4, 6], [2, 8]] }, { pts: [[5, 1], [5, 10]], couleur: GRIS }, { pts: [[1, 5], [10, 5]], couleur: GRIS }],
            [{ x: 5, y: 5, label: "I" }, { x: 2, y: 6, label: "A" }, { x: 4, y: 6, label: "B" }, { x: 2, y: 8, label: "C" }],
          ),
          correction:
            "a) Premier pliage, le long de $(d_1)$ : je compte les carreaux jusqu'à l'axe, à l'horizontale, et je les reporte de l'autre côté. $A$ est à $3$ carreaux à gauche : $A'(8\\,;\\,6)$. Puis $B'(6\\,;\\,6)$ et $C'(8\\,;\\,8)$.\nb) Deuxième pliage, le long de $(d_2)$ : cette fois je compte à la verticale. $A'$ est à $1$ carreau au-dessus : $A''(8\\,;\\,4)$. Puis $B''(6\\,;\\,4)$ et $C''(8\\,;\\,2)$.\nc) Je compare $A(2\\,;\\,6)$ et $A''(8\\,;\\,4)$ : leur milieu est $(5\\,;\\,5)$, c'est le point $I$. Même chose pour $B$ et $B''$, pour $C$ et $C''$ : $I$ est le milieu de chaque segment.\nC'est la symétrie de centre $I$ : deux pliages le long de deux axes PERPENDICULAIRES font un demi-tour.\n⛔ Le piège : croire que deux symétries axiales donnent encore une symétrie axiale. Le triangle $A''B''C''$ est tête en bas ET inversé de gauche à droite : aucun pliage seul ne fait ça.\nRéponse : la symétrie de centre $I$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 6], [4, 6], [2, 8]] },
              { pts: [[8, 6], [6, 6], [8, 8]], couleur: ORANGE },
              { pts: [[8, 4], [6, 4], [8, 2]], couleur: VIOLET },
              { pts: [[5, 1], [5, 10]], couleur: GRIS },
              { pts: [[1, 5], [10, 5]], couleur: GRIS },
            ],
            [{ x: 5, y: 5, label: "I" }, { x: 2, y: 6, label: "A" }, { x: 4, y: 6, label: "B" }, { x: 2, y: 8, label: "C" }, { x: 8, y: 6, label: "A'" }, { x: 8, y: 8, label: "C'" }, { x: 8, y: 4, label: "A''" }, { x: 8, y: 2, label: "C''" }],
          ),
          micros: ["sym_symetrie_translation_rotation", "sym_transformation_defi"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $ABC$ et placé le point $O$.\na) Construire l'image $A'B'C'$ de $ABC$ par l'homothétie de centre $O$ et de rapport $-2$.\nb) Comparer les deux triangles : taille, orientation, position de $O$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[7, 7], [8, 7], [7, 8]] }],
            [{ x: 6, y: 6, label: "O" }, { x: 7, y: 7, label: "A" }, { x: 8, y: 7, label: "B" }, { x: 7, y: 8, label: "C" }],
          ),
          correction:
            "a) Rapport $-2$ : pour chaque sommet, je lis le déplacement de $O$ vers le point, je le double, et je le refais dans l'AUTRE SENS depuis $O$.\n$A$ : $1$ à droite, $1$ en haut. Doublé et inversé : $2$ à gauche, $2$ en bas, $A'(4\\,;\\,4)$.\n$B$ : $2$ à droite, $1$ en haut. Donc $4$ à gauche, $2$ en bas, $B'(2\\,;\\,4)$.\n$C$ : $1$ à droite, $2$ en haut. Donc $2$ à gauche, $4$ en bas, $C'(4\\,;\\,2)$.\nb) Taille : chaque côté est doublé, $AB = 1$ carreau et $A'B' = 2$ carreaux.\nOrientation : le triangle est retourné, tête en bas et inversé de gauche à droite, comme par un demi-tour.\nPosition : $O$ est ENTRE chaque point et son image, sur les droites grises.\n⛔ Le piège : placer l'image du même côté que la figure, comme pour un rapport $2$. Le signe moins, c'est « de l'autre côté du centre ».\nRéponse : $A'(4\\,;\\,4)$, $B'(2\\,;\\,4)$, $C'(4\\,;\\,2)$ ; un triangle deux fois plus grand, retourné, et $O$ entre les deux.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[7, 7], [8, 7], [7, 8]] },
              { pts: [[4, 4], [2, 4], [4, 2]], couleur: ORANGE },
              { pts: [[7, 7], [4, 4]], couleur: GRIS },
              { pts: [[8, 7], [2, 4]], couleur: GRIS },
              { pts: [[7, 8], [4, 2]], couleur: GRIS },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 7, y: 7, label: "A" }, { x: 8, y: 7, label: "B" }, { x: 7, y: 8, label: "C" }, { x: 4, y: 4, label: "A'" }, { x: 2, y: 4, label: "B'" }, { x: 4, y: 2, label: "C'" }],
          ),
          micros: ["sym_homothetie_construire"],
        },
        {
          enonce:
            "Sur le quadrillage, le triangle orange $A'B'C'$ est l'image du triangle bleu $ABC$ par une homothétie.\na) Retrouver son centre $O$.\nb) Calculer son rapport.",
          figure: trace(
            [-1, 11],
            [{ pts: [[8, 4], [8, 6], [6, 4]] }, { pts: [[6, 5], [6, 9], [2, 5]], couleur: ORANGE }],
            [{ x: 8, y: 4, label: "A" }, { x: 8, y: 6, label: "B" }, { x: 6, y: 4, label: "C" }, { x: 6, y: 5, label: "A'" }, { x: 6, y: 9, label: "B'" }, { x: 2, y: 5, label: "C'" }],
          ),
          correction:
            "a) Le centre est aligné avec chaque point et son image : il est sur la droite $(AA')$ ET sur la droite $(BB')$. Je prolonge ces deux droites au-delà de $A$ et de $B$ : elles se coupent en $O(10\\,;\\,3)$.\n⭐ Contrôle avec le troisième sommet : la droite $(CC')$ passe aussi par $O$.\nb) De $O$ à $A$ : $2$ à gauche, $1$ en haut. De $O$ à $A'$ : $4$ à gauche, $2$ en haut. Le déplacement est doublé, dans le même sens : $k = 2$.\n⭐ Même rapport sur les côtés : $AB = 2$ carreaux, $A'B' = 4$ carreaux.\n⛔ Le piège : lire le rapport à l'envers, $OA \\div OA' = \\dfrac{1}{2}$. Je divise TOUJOURS l'image par le départ.\nRéponse : le centre est $O(10\\,;\\,3)$ et le rapport est $k = 2$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[8, 4], [8, 6], [6, 4]] },
              { pts: [[6, 5], [6, 9], [2, 5]], couleur: ORANGE },
              { pts: [[10, 3], [6, 5]], couleur: GRIS },
              { pts: [[10, 3], [6, 9]], couleur: GRIS },
              { pts: [[10, 3], [2, 5]], couleur: GRIS },
            ],
            [{ x: 10, y: 3, label: "O" }, { x: 8, y: 4, label: "A" }, { x: 8, y: 6, label: "B" }, { x: 6, y: 4, label: "C" }, { x: 6, y: 5, label: "A'" }, { x: 6, y: 9, label: "B'" }, { x: 2, y: 5, label: "C'" }],
          ),
          micros: ["sym_homothetie_reconnaitre", "sym_homothetie_rapport"],
        },
        {
          enonce:
            "Une photo de $10$ cm sur $15$ cm est agrandie en un tirage de $20$ cm sur $30$ cm. Sur le quadrillage, un carreau représente $5$ cm, et le coin $O$ reste en place.\na) Montrer que l'agrandissement est une homothétie de centre $O$, et donner son rapport.\nb) Calculer l'aire de chaque photo. Par combien l'aire est-elle multipliée ?\nc) Le papier photo se paie au cm². Le grand tirage demande-t-il deux fois plus de papier ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 2], [4, 2], [4, 5], [2, 5]] }],
            [{ x: 2, y: 2, label: "O" }, { x: 4, y: 2, label: "A" }, { x: 4, y: 5, label: "B" }, { x: 2, y: 5, label: "C" }],
          ),
          correction:
            "a) $20 \\div 10 = 2$ et $30 \\div 15 = 2$ : les deux dimensions sont multipliées par le même nombre.\nSur le dessin, de $O$ à $B$ : $2$ à droite, $3$ en haut ; de $O$ à $B'$ : $4$ à droite, $6$ en haut. $O$, $B$, $B'$ sont alignés et $OB' = 2 \\times OB$ ; de même pour $A$ et $C$. C'est l'homothétie de centre $O$ et de rapport $k = 2$.\nb) Petite photo : $10 \\times 15 = 150$ cm². Grand tirage : $20 \\times 30 = 600$ cm².\n$600 \\div 150 = 4$ : l'aire est multipliée par $4 = 2^2$. Sur le dessin, la petite photo tient QUATRE fois dans la grande.\nc) Non : il faut quatre fois plus de papier, pas deux.\n⛔ Le piège : croire que l'aire double quand les longueurs doublent. Les longueurs sont multipliées par $k$, les aires par $k^2$.\nRéponse : homothétie de rapport $2$ ; $150$ cm² et $600$ cm², l'aire est multipliée par $4$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 2], [4, 2], [4, 5], [2, 5]] },
              { pts: [[2, 2], [6, 2], [6, 8], [2, 8]], couleur: ORANGE },
              { pts: [[2, 2], [6, 8]], couleur: GRIS },
            ],
            [{ x: 2, y: 2, label: "O" }, { x: 4, y: 2, label: "A" }, { x: 4, y: 5, label: "B" }, { x: 2, y: 5, label: "C" }, { x: 6, y: 2, label: "A'" }, { x: 6, y: 8, label: "B'" }, { x: 2, y: 8, label: "C'" }],
          ),
          micros: ["sym_homothetie_rapport", "sym_transformation_effet"],
        },
        {
          enonce:
            "Un drapeau est planté en $O$ : le mât va de $O$ à $A$, la toile est le triangle $ABC$.\na) Construire son image par la rotation de centre $O$ et d'angle 90°, dans le sens des aiguilles d'une montre.\nb) Construire son image par la rotation de centre $O$ et d'angle 180°.\nc) Quelle autre transformation donne la même image qu'au b) ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[6, 5], [6, 8]] }, { pts: [[6, 8], [8, 7], [6, 6]] }],
            [{ x: 6, y: 5, label: "O" }, { x: 6, y: 8, label: "A" }, { x: 8, y: 7, label: "B" }],
          ),
          correction:
            "a) Dans le sens des aiguilles d'une montre, ce qui pointe vers le haut se retrouve pointé vers la droite, et ce qui est à droite part vers le bas.\nLe mât monte de $3$ carreaux au-dessus de $O$ : après le quart de tour, il part de $3$ carreaux vers la droite, $A'(9\\,;\\,5)$.\n$B$ est à $2$ carreaux à droite et $2$ en haut de $O$. « En haut » devient « à droite », « à droite » devient « en bas » : $B'(8\\,;\\,3)$.\nb) Un demi-tour inverse chaque déplacement depuis $O$ : $A''(6\\,;\\,2)$ et $B''(4\\,;\\,3)$.\nc) La rotation de 180° est la symétrie de centre $O$ : $O$ est le milieu de $[AA'']$ et de $[BB'']$.\n⭐ Une rotation conserve tout : le mât mesure toujours $3$ carreaux, la toile garde sa forme.\n⛔ Le piège : tourner dans le mauvais sens. Dans le sens contraire des aiguilles d'une montre, le mât pointerait vers la gauche et $A$ irait en $(3\\,;\\,5)$.\nRéponse : $A'(9\\,;\\,5)$, $B'(8\\,;\\,3)$ ; $A''(6\\,;\\,2)$, $B''(4\\,;\\,3)$ ; la rotation de 180° est la symétrie de centre $O$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[6, 5], [6, 8]] },
              { pts: [[6, 8], [8, 7], [6, 6]] },
              { pts: [[6, 5], [9, 5]], couleur: ORANGE },
              { pts: [[9, 5], [8, 3], [7, 5]], couleur: ORANGE },
              { pts: [[6, 5], [6, 2]], couleur: VIOLET },
              { pts: [[6, 2], [4, 3], [6, 4]], couleur: VIOLET },
            ],
            [{ x: 6, y: 5, label: "O" }, { x: 6, y: 8, label: "A" }, { x: 8, y: 7, label: "B" }, { x: 9, y: 5, label: "A'" }, { x: 8, y: 3, label: "B'" }, { x: 6, y: 2, label: "A''" }, { x: 4, y: 3, label: "B''" }],
          ),
          micros: ["sym_symetrie_translation_rotation"],
        },
        {
          enonce:
            "Sur le quadrillage, $ABCD$ est un carré de $2$ carreaux de côté.\na) Construire son image $A'B'C'D'$ par l'homothétie de centre $O$ et de rapport $1{,}5$.\nb) Calculer le côté, le périmètre et l'aire de $A'B'C'D'$, en carreaux.",
          figure: trace(
            [-1, 11],
            [{ pts: [[4, 4], [6, 4], [6, 6], [4, 6]] }],
            [{ x: 2, y: 2, label: "O" }, { x: 4, y: 4, label: "A" }, { x: 6, y: 4, label: "B" }, { x: 4, y: 6, label: "D" }],
          ),
          correction:
            "a) Pour chaque sommet, je multiplie par $1{,}5$ le déplacement depuis $O$.\n$A$ : $2$ à droite, $2$ en haut, fois $1{,}5$ : $3$ et $3$, $A'(5\\,;\\,5)$.\n$B$ : $4$ à droite, $2$ en haut, fois $1{,}5$ : $6$ et $3$, $B'(8\\,;\\,5)$.\n$C$ : $4$ et $4$, fois $1{,}5$ : $6$ et $6$, $C'(8\\,;\\,8)$.\n$D$ : $2$ et $4$, fois $1{,}5$ : $3$ et $6$, $D'(5\\,;\\,8)$.\nb) Côté : $2 \\times 1{,}5 = 3$ carreaux. Périmètre : $4 \\times 3 = 12$ carreaux, soit $8 \\times 1{,}5$.\nAire : $3 \\times 3 = 9$ carreaux. Celle de $ABCD$ était $4$ : elle est multipliée par $1{,}5^2 = 2{,}25$, et $4 \\times 2{,}25 = 9$.\n⛔ Le piège : multiplier l'aire par $1{,}5$ et trouver $6$ carreaux. Le périmètre suit $k$, l'aire suit $k^2$.\nRéponse : côté $3$, périmètre $12$, aire $9$ carreaux.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[4, 4], [6, 4], [6, 6], [4, 6]] },
              { pts: [[5, 5], [8, 5], [8, 8], [5, 8]], couleur: ORANGE },
              { pts: [[2, 2], [8, 8]], couleur: GRIS },
              { pts: [[2, 2], [8, 5]], couleur: GRIS },
            ],
            [{ x: 2, y: 2, label: "O" }, { x: 4, y: 4, label: "A" }, { x: 6, y: 4, label: "B" }, { x: 4, y: 6, label: "D" }, { x: 8, y: 5, label: "B'" }, { x: 8, y: 8, label: "C'" }, { x: 5, y: 8, label: "D'" }],
          ),
          micros: ["sym_homothetie_construire", "sym_transformation_effet"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier.\na) Une homothétie de rapport $-1$ est une symétrie centrale.\nb) Une homothétie de rapport $0{,}8$ agrandit la figure.\nc) Une homothétie conserve les angles.\nd) Une translation est une homothétie.\ne) Une homothétie de rapport $2$ double l'aire d'une figure.",
          correction:
            "a) VRAI. Avec $k = -1$, $OA' = OA$ et $A'$ est de l'autre côté de $O$ : $O$ est le milieu de $[AA']$. Le dessin le montre sur le triangle $ABC$.\nb) FAUX. $0{,}8$ est entre $0$ et $1$ : les longueurs sont multipliées par $0{,}8$, la figure est RÉDUITE.\nc) VRAI. L'image a la même forme : les angles ne changent pas, seules les longueurs changent.\nd) FAUX. Dans une translation, les droites $(AA')$ et $(BB')$ sont parallèles : elles ne se coupent jamais, il n'y a pas de centre.\ne) FAUX. L'aire est multipliée par $2^2 = 4$.\n⛔ Le piège au e) : confondre le rapport des longueurs et celui des aires.\nRéponse : vrai, faux, vrai, faux, faux.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[7, 7], [9, 7], [7, 9]] },
              { pts: [[5, 5], [3, 5], [5, 3]], couleur: ORANGE },
              { pts: [[9, 7], [3, 5]], couleur: GRIS },
              { pts: [[7, 9], [5, 3]], couleur: GRIS },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 7, y: 7, label: "A" }, { x: 9, y: 7, label: "B" }, { x: 7, y: 9, label: "C" }, { x: 5, y: 5, label: "A'" }, { x: 3, y: 5, label: "B'" }, { x: 5, y: 3, label: "C'" }],
          ),
          micros: ["sym_homothetie_reconnaitre", "sym_transformation_effet"],
        },
        {
          enonce:
            "Un triangle $T$ a une aire de $12$ cm². Son image $T'$ par une homothétie de centre $O$ a une aire de $108$ cm².\na) Par combien l'aire a-t-elle été multipliée ?\nb) Quelles sont les valeurs possibles du rapport $k$ ?\nc) Le plus grand côté de $T$ mesure $5$ cm. Combien mesure celui de $T'$ ?\nd) On sait en plus que $O$ est entre $T$ et $T'$. Quel est le rapport ?",
          correction:
            "a) $108 \\div 12 = 9$ : l'aire est multipliée par $9$.\nb) L'aire est multipliée par $k^2$, donc $k^2 = 9$. Deux nombres ont pour carré $9$ : $k = 3$ ou $k = -3$.\nc) Dans les deux cas, les longueurs sont multipliées par $3$ : $5 \\times 3 = 15$ cm.\nd) $O$ entre la figure et son image : l'image est de l'autre côté du centre, le rapport est négatif. $k = -3$.\n⛔ Le piège au b) : répondre $k = 9$. Avec $k = 9$, l'aire serait multipliée par $81$.\nRéponse : $\\times 9$ ; $k = 3$ ou $k = -3$ ; $15$ cm ; $k = -3$.",
          micros: ["sym_homothetie_rapport", "sym_transformation_effet", "sym_transformation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je repère le centre et le rapport, puis je calcule longueurs et aires.",
      rappel: [
        "Un agrandissement ou une réduction de rapport $k$ : les longueurs sont multipliées par $k$, les aires par $k^2$, les volumes par $k^3$.",
        "Une image à l'envers (chambre noire, lentille) : c'est une homothétie de rapport NÉGATIF, le centre est entre l'objet et son image.",
      ],
      exercices: [
        {
          titre: "La chambre noire",
          enonce:
            "Dans une boîte fermée, un petit trou $O$ laisse passer la lumière : l'image d'un arbre se forme sur la paroi du fond, à l'envers. C'est une homothétie de centre $O$. L'arbre mesure $12$ m de haut et se trouve à $30$ m du trou ; la paroi est à $20$ cm du trou.\na) Pourquoi le rapport est-il négatif ?\nb) Calculer le rapport $k$.\nc) Quelle est la hauteur de l'image ?\nd) On recule la paroi à $30$ cm du trou. Quelle hauteur a maintenant l'image ?",
          correction:
            "a) Les rayons passent par le trou $O$ : l'arbre est d'un côté de $O$, son image de l'autre. Le haut de l'arbre arrive en bas de la paroi. Image de l'autre côté du centre : $k < 0$.\nb) Je mets tout dans la même unité : $30$ m $= 3\\,000$ cm. Le rapport des distances au trou : $20 \\div 3\\,000 = \\dfrac{1}{150}$. Avec le signe : $k = -\\dfrac{1}{150}$.\nc) $12$ m $= 1\\,200$ cm, et $1\\,200 \\div 150 = 8$ : l'image mesure $8$ cm, la tête en bas.\nd) Nouveau rapport : $30 \\div 3\\,000 = \\dfrac{1}{100}$. L'image mesure $1\\,200 \\div 100 = 12$ cm.\n⭐ Le schéma n'est pas à l'échelle : on y a pris un rapport de $-\\dfrac{1}{2}$ pour qu'il tienne sur le quadrillage. Le haut $B$ de l'arbre arrive en $B'$, en bas.\n⛔ Le piège au b) : diviser $20$ par $30$ sans convertir. Les deux distances doivent être dans la même unité.\nRéponse : $k = -\\dfrac{1}{150}$, une image de $8$ cm, puis de $12$ cm.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[10, 3], [10, 9]] },
              { pts: [[4, 6], [4, 3]], couleur: ORANGE },
              { pts: [[10, 3], [4, 6]], couleur: GRIS },
              { pts: [[10, 9], [4, 3]], couleur: GRIS },
            ],
            [{ x: 6, y: 5, label: "O" }, { x: 10, y: 3, label: "A" }, { x: 10, y: 9, label: "B" }, { x: 4, y: 6, label: "A'" }, { x: 4, y: 3, label: "B'" }],
          ),
          micros: ["sym_homothetie_rapport", "sym_transformation_defi"],
        },
        {
          titre: "Le vidéoprojecteur",
          enonce:
            "Dans un vidéoprojecteur, une lampe éclaire une petite plaque de $2$ cm de large et $1{,}5$ cm de haut, placée à $4$ cm de la lampe. L'image se forme sur un mur à $3$ m de la lampe. On admet que l'image est l'agrandissement de la plaque par une homothétie de centre la lampe.\na) Calculer le rapport de cette homothétie.\nb) Quelles sont la largeur et la hauteur de l'image ?\nc) Par combien l'aire est-elle multipliée ? Calculer l'aire de l'image en m².\nd) À quelle distance du mur faut-il placer la lampe pour obtenir une image de $2$ m de large ?",
          correction:
            "a) Même unité : $3$ m $= 300$ cm. Le rapport des distances à la lampe : $300 \\div 4 = 75$. L'image est du même côté que la plaque : $k = 75$.\nb) Largeur : $2 \\times 75 = 150$ cm, soit $1{,}5$ m. Hauteur : $1{,}5 \\times 75 = 112{,}5$ cm.\nc) L'aire est multipliée par $75^2 = 5\\,625$. La plaque mesure $2 \\times 1{,}5 = 3$ cm², l'image $3 \\times 5\\,625 = 16\\,875$ cm², soit $1{,}6875$ m².\n⭐ Contrôle : $1{,}5 \\times 1{,}125 = 1{,}6875$ m².\nd) Il faut $200 \\div 2 = 100$ comme rapport. La distance lampe-mur est alors $4 \\times 100 = 400$ cm, soit $4$ m.\n⛔ Le piège au c) : multiplier l'aire par $75$. On trouverait $225$ cm², la taille d'une carte postale et demie, pas celle d'un écran.\nRéponse : $k = 75$ ; $1{,}5$ m sur $1{,}125$ m ; aire $\\times 5\\,625$, soit $1{,}6875$ m² ; la lampe à $4$ m du mur.",
          micros: ["sym_homothetie_rapport", "sym_transformation_effet"],
        },
        {
          titre: "La frise",
          enonce:
            "Une frise se construit à partir d'un motif. Sur le quadrillage, le motif 1 (bleu, sommets $A_1$ et $B_1$) a été reproduit trois fois : motif 2 en orange, motif 3 en vert, motif 4 en violet.\na) Quelle transformation envoie le motif 1 sur le motif 2 ?\nb) Sur le motif 3 ?\nc) Sur le motif 4 ?\nd) Quelle transformation envoie le motif 3 sur le motif 4 ?\ne) Pour prolonger la frise, on applique au motif 2 la transformation du a). Donner les coordonnées de $A_5$ et $B_5$.",
          figure: trace(
            [-1, 11],
            [
              { pts: [[2, 6], [4, 7], [2, 8]] },
              { pts: [[5, 6], [7, 7], [5, 8]], couleur: ORANGE },
              { pts: [[2, 4], [4, 3], [2, 2]], couleur: VERT },
              { pts: [[10, 4], [8, 3], [10, 2]], couleur: VIOLET },
            ],
            [{ x: 2, y: 6, label: "A₁" }, { x: 4, y: 7, label: "B₁" }, { x: 5, y: 6, label: "A₂" }, { x: 7, y: 7, label: "B₂" }, { x: 2, y: 4, label: "A₃" }, { x: 4, y: 3, label: "B₃" }, { x: 10, y: 4, label: "A₄" }, { x: 8, y: 3, label: "B₄" }],
          ),
          correction:
            "a) De $A_1(2\\,;\\,6)$ à $A_2(5\\,;\\,6)$ : $3$ carreaux à droite. De $B_1$ à $B_2$ : aussi $3$ à droite. Même déplacement pour tous les points, motif ni tourné ni retourné : c'est la translation de $3$ carreaux vers la droite.\nb) Le motif 3 est le reflet du motif 1 dans un miroir horizontal. $A_1$ et $A_3(2\\,;\\,4)$ sont à $1$ carreau de part et d'autre de la droite horizontale de hauteur $5$ ; $B_1$ et $B_3(4\\,;\\,3)$ à $2$ carreaux. C'est la symétrie d'axe cette droite.\nc) Le milieu de $[A_1A_4]$, avec $A_4(10\\,;\\,4)$, est $(6\\,;\\,5)$. Le milieu de $[B_1B_4]$, avec $B_4(8\\,;\\,3)$, est aussi $(6\\,;\\,5)$. C'est la symétrie de centre $I(6\\,;\\,5)$, un demi-tour.\nd) $A_3$ et $A_4$ sont à $4$ carreaux de part et d'autre de la droite verticale d'abscisse $6$ ; $B_3$ et $B_4$ à $2$ carreaux. C'est la symétrie d'axe cette droite verticale.\ne) Encore $3$ carreaux vers la droite depuis le motif 2 : $A_5(8\\,;\\,6)$ et $B_5(10\\,;\\,7)$.\n⛔ Le piège au c) : chercher un axe de symétrie. Le motif 4 est tête en bas ET inversé de gauche à droite : un seul pliage ne fait pas ça, un demi-tour si.\nRéponse : une translation ; une symétrie axiale ; une symétrie centrale ; une symétrie axiale ; $A_5(8\\,;\\,6)$ et $B_5(10\\,;\\,7)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 6], [4, 7], [2, 8]] },
              { pts: [[5, 6], [7, 7], [5, 8]], couleur: ORANGE },
              { pts: [[8, 6], [10, 7], [8, 8]], couleur: ORANGE },
              { pts: [[2, 4], [4, 3], [2, 2]], couleur: VERT },
              { pts: [[10, 4], [8, 3], [10, 2]], couleur: VIOLET },
              { pts: [[1, 5], [10, 5]], couleur: GRIS },
              { pts: [[6, 1], [6, 10]], couleur: GRIS },
            ],
            [{ x: 6, y: 5, label: "I" }, { x: 2, y: 6, label: "A₁" }, { x: 5, y: 6, label: "A₂" }, { x: 2, y: 4, label: "A₃" }, { x: 10, y: 4, label: "A₄" }, { x: 8, y: 6, label: "A₅" }, { x: 10, y: 7, label: "B₅" }],
          ),
          micros: ["sym_symetrie_translation_rotation", "sym_transformation_defi"],
        },
        {
          titre: "La carte de randonnée",
          enonce:
            "Une carte de randonnée est à l'échelle $\\dfrac{1}{25\\,000}$ : elle est une réduction du terrain, de rapport $\\dfrac{1}{25\\,000}$.\na) Sur la carte, un sentier mesure $4{,}8$ cm. Quelle est sa longueur réelle, en km ?\nb) Un lac occupe $3$ cm² sur la carte. Quelle est son aire réelle, en m², puis en hectares ?\nc) Un randonneur calcule : « $3 \\times 25\\,000 = 75\\,000$ cm², soit $7{,}5$ m² ». Qu'en penser ?",
          correction:
            "a) Du terrain à la carte, les longueurs sont divisées par $25\\,000$ ; de la carte au terrain, je multiplie : $4{,}8 \\times 25\\,000 = 120\\,000$ cm, soit $1{,}2$ km.\nb) Les aires, elles, sont multipliées par le CARRÉ : $25\\,000^2 = 625\\,000\\,000$.\n$3 \\times 625\\,000\\,000 = 1\\,875\\,000\\,000$ cm². Comme $1$ m² $= 10\\,000$ cm², cela fait $187\\,500$ m².\nEt $1$ ha $= 10\\,000$ m² : le lac couvre $18{,}75$ ha.\nc) Il a multiplié l'aire par $25\\,000$ au lieu de $25\\,000^2$. Un lac de $7{,}5$ m², c'est une flaque : le résultat est absurde.\n⛔ Le piège : l'échelle d'une carte vaut pour les LONGUEURS. Pour une aire, elle compte deux fois.\nRéponse : le sentier mesure $1{,}2$ km et le lac $187\\,500$ m², soit $18{,}75$ ha.",
          micros: ["sym_homothetie_rapport", "sym_transformation_effet", "sym_transformation_defi"],
        },
      ],
    },
  ],
};
