// ─── Fiche d'exercices : les transformations (4e) — 20 exercices corrigés ─────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-transformations.tsx` et sur
// les SIX micros du coach de 4e (notionId sym_transformation) : symétrie
// axiale, symétrie centrale, translation, rotation, leurs propriétés, les défis.
// Le programme de 4e : l'EFFET des quatre transformations qui conservent les
// longueurs, les angles et les aires. ⛔ PAS D'HOMOTHÉTIE (elle est en 3e) ; pas
// de définition ponctuelle de la rotation ni de la translation (BO) : on
// construit sur quadrillage, on reconnaît, on utilise ce qui est conservé.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni le triangle
// (1;1)(3;1)(2;3) et son centre (4;4), ni la flèche (+4;+3), ni A(1;2) et
// (+4;+2), ni B(3;5), ni l'aire de 12 cm² et la rotation de 60°, ni la
// varangue et l'Alhambra) — ni ceux de la feuille de 3e (le triangle et l'axe
// x = 6, DEF et O(6;5), les deux axes perpendiculaires, le drapeau, la frise,
// la chambre noire, la photo, la carte).
//
// Les pièges nommés : recopier sans retourner (1), compter à l'horizontale pour
// un axe oblique (2), chercher une image au centre lui-même (3), lire la flèche
// à l'envers (4, 7), tourner dans le mauvais sens (5, 13), croire qu'une figure
// « à l'envers » change de mesures (6), une minute prise pour un degré (8),
// croire qu'une rotation peut retourner une pièce (9), reporter l'abscisse au
// lieu de la distance à l'axe (10), relier dans le désordre (11), ajouter les
// longueurs des sauts (12), les quatre côtés égaux du cerf-volant (14), deux
// demi-tours pris pour un demi-tour (15), le dessin pris pour une preuve (16),
// trois symétries qui donneraient le même coin (17), le quart de la hauteur en
// un quart de tour (18), un centre de symétrie pour toute figure qui tourne
// (19), un glissement de trop (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - Tetris : sept pièces de quatre carrés ; le « J » est le reflet du « L », et
//   une pièce ne fait que glisser et tourner (Tetris Guideline, The Tetris
//   Company) — ex. 9 ;
// - échecs : le cavalier se déplace de deux cases dans une direction et d'une
//   dans l'autre (FIDE, Lois des échecs, art. 3.6) — ex. 12 ;
// - handball : terrain de 40 m sur 20 m, ligne des 7 m, changement de camp à la
//   mi-temps (IHF, Règles du jeu, règles 1 et 2) — ex. 17 ;
// - London Eye : 120 m de diamètre, 32 cabines, un tour en 30 minutes environ
//   (londoneye.com, fiche « facts ») — ex. 18 ;
// - flocon : six branches, héritées de la structure hexagonale de la glace
//   (K. Libbrecht, Caltech, snowcrystals.com) ; étoile de mer : la plupart des
//   espèces ont cinq bras (symétrie d'ordre 5) — ex. 19 ;
// - panneaux solaires : les grands modules de 72 cellules mesurent environ 2 m
//   sur 1 m (fiches techniques des fabricants) — ex. 20 ;
// - l'aiguille de 12 cm, le papillon, le moulinet et le cerf-volant de 40 cm et
//   60 cm sont IMAGINÉS, à l'ordre de grandeur réel — ex. 8, 10, 13, 14.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés en
// ont un. La figure en BLEU, son image en ORANGE (puis VERT et VIOLET quand il y
// en a plusieurs), les axes, les segments point-image et les rayons en GRIS.
// Tout est dessiné avec ses VRAIES coordonnées — le cerf-volant a vraiment un
// angle de 100°, le flocon vraiment des branches à 60° — et le script de
// recalcul RELIT chaque point. Tous les points étiquetés sont à 2 carreaux au
// moins des axes du repère et loin du bord.
// ⚠️ Figures COMPACTES (la feuille de 3e débordait en mode classe) : un seul
// quadrillage de 16rem au plus par énoncé, jamais deux côte à côte sauf au 19.
//
// Les corrigés sont écrits à la première personne (« je compte »), comme les
// autres feuilles.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-transformations-4e.mjs`.
//
// Micro-compétences : sym_axiale (1, 2, 9, 10, 14, 17, 19), sym_centrale (3, 6,
// 11, 13, 15, 17, 18, 19), sym_translation (4, 7, 9, 12, 20), sym_rotation (5,
// 8, 9, 13, 16, 18, 19, 20), sym_transformation_propriete (6, 8, 10, 11, 14, 16,
// 18, 20), sym_transformation_defi (9, 12, 13, 14, 15, 16, 17, 19). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, triangle, vecteurs } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";

// ⭐ UNE FIGURE = DES LIGNES BRISÉES (segments sans pointe, `vecteurs()`).
// Trois sommets ou plus : le polygone est FERMÉ ; deux : un simple segment ;
// `fleche: true` : une flèche de pts[0] vers pts[1]. Bleu par défaut. ⭐ Le
// script de recalcul RELIT `pts` et les points étiquetés : les écrire en clair.
type Ligne = { pts: [number, number][]; couleur?: string; fleche?: true };
const trace = (fenetre: [number, number], lignes: Ligne[], points: { x: number; y: number; label: string }[] = []) =>
  vecteurs(
    fenetre,
    lignes.flatMap(({ pts, couleur, fleche }) => {
      if (fleche) return [{ de: pts[0], vers: pts[1], couleur }];
      const bords: [[number, number], [number, number]][] =
        pts.length > 2 ? pts.map((p, i) => [p, pts[(i + 1) % pts.length]]) : [[pts[0], pts[1]]];
      return bords.map(([de, vers]) => ({ de, vers, couleur, pointe: false }));
    }),
    points,
  );

/** Deux dessins côte à côte (exercices 6 et 19) : l'un sous l'autre sur
 *  téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

export const exercicesTransformations4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "sym-transformation",
  titre: "Les transformations",
  accroche:
    "Vingt exercices, du geste seul au problème : plier le long d'un axe, même oblique, faire un demi-tour, glisser le long d'une flèche, tourner d'un quart de tour, puis se servir de ce que ces quatre transformations conservent. Une pièce de Tetris, un papillon, le cavalier des échecs, un cerf-volant, un terrain de handball, la grande roue de Londres, un flocon de neige, des panneaux solaires. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, sur le quadrillage, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée avec son image.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/sym-transformation", titre: "Les transformations" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les carreaux en partant toujours de l'axe, du centre ou de la flèche.",
      rappel: [
        "Symétrie axiale : un PLIAGE le long de l'axe. Un point et son image sont à la même distance de l'axe, de part et d'autre, sur une perpendiculaire à l'axe.",
        "Symétrie centrale : un DEMI-TOUR autour du centre $O$, qui est le milieu de $[AA']$.",
        "Translation : toute la figure GLISSE comme la flèche. Rotation : elle TOURNE autour d'un centre, d'un angle donné, dans un sens donné.",
        "Les quatre conservent les longueurs, les angles et les aires : l'image a la même forme et la même taille.",
      ],
      exercices: [
        {
          enonce:
            "Sur le quadrillage, on a tracé le parallélogramme $ABCD$ et la droite grise $(d)$.\nConstruire $A'B'C'D'$, l'image de $ABCD$ par la symétrie d'axe $(d)$, et donner les coordonnées de ses sommets.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 7], [7, 7], [8, 9], [4, 9]] }, { pts: [[1, 6], [10, 6]], couleur: GRIS }],
            [{ x: 3, y: 7, label: "A" }, { x: 7, y: 7, label: "B" }, { x: 8, y: 9, label: "C" }, { x: 4, y: 9, label: "D" }],
          ),
          correction:
            "Une symétrie axiale, c'est un PLIAGE le long de $(d)$. L'axe est horizontal : pour chaque sommet, je compte à la verticale les carreaux qui le séparent de l'axe, puis je reporte le même nombre DE L'AUTRE CÔTÉ.\n$A$ est à $1$ carreau au-dessus de $(d)$ : $A'$ est à $1$ carreau en dessous, en $A'(3\\,;\\,5)$.\n$B$ est aussi à $1$ carreau au-dessus : $B'(7\\,;\\,5)$.\n$C$ et $D$ sont à $3$ carreaux au-dessus : $C'(8\\,;\\,3)$ et $D'(4\\,;\\,3)$.\nL'abscisse ne change pas : je descends tout droit, perpendiculairement à l'axe.\n⭐ Contrôle : $A'B' = AB = 4$ carreaux, et $[C'D']$, le côté le plus éloigné de l'axe, est maintenant EN BAS. La figure est retournée, comme son reflet dans l'eau d'un lac.\n⛔ Le piège : recopier la figure sous l'axe sans la retourner, avec $[CD]$ toujours en haut. $C$ est à $3$ carreaux de l'axe : $C'$ doit l'être aussi.\nRéponse : $A'(3\\,;\\,5)$, $B'(7\\,;\\,5)$, $C'(8\\,;\\,3)$ et $D'(4\\,;\\,3)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 7], [7, 7], [8, 9], [4, 9]] },
              { pts: [[3, 5], [7, 5], [8, 3], [4, 3]], couleur: ORANGE },
              { pts: [[1, 6], [10, 6]], couleur: GRIS },
            ],
            [{ x: 3, y: 7, label: "A" }, { x: 7, y: 7, label: "B" }, { x: 8, y: 9, label: "C" }, { x: 4, y: 9, label: "D" }, { x: 3, y: 5, label: "A'" }, { x: 7, y: 5, label: "B'" }, { x: 8, y: 3, label: "C'" }, { x: 4, y: 3, label: "D'" }],
          ),
          micros: ["sym_axiale"],
        },
        {
          enonce:
            "Sur le quadrillage, l'axe gris $(d)$ est OBLIQUE : il traverse les carreaux en diagonale, par leurs coins.\nConstruire l'image du triangle $ABC$ par la symétrie d'axe $(d)$, et donner les coordonnées de $A'$, $B'$ et $C'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[7, 3], [9, 3], [9, 5]] }, { pts: [[1, 1], [10, 10]], couleur: GRIS }],
            [{ x: 7, y: 3, label: "A" }, { x: 9, y: 3, label: "B" }, { x: 9, y: 5, label: "C" }],
          ),
          correction:
            "L'axe est oblique : la perpendiculaire à l'axe est l'AUTRE diagonale des carreaux. Je pars donc de chaque sommet en diagonale, vers le haut et la gauche, jusqu'à l'axe, puis je fais autant de pas de l'autre côté.\nDepuis $A$ : $2$ pas en diagonale pour toucher l'axe en $(5\\,;\\,5)$, puis $2$ de plus : $A'(3\\,;\\,7)$.\nDepuis $B$ : $3$ pas jusqu'à $(6\\,;\\,6)$, puis $3$ : $B'(3\\,;\\,9)$.\nDepuis $C$ : $2$ pas jusqu'à $(7\\,;\\,7)$, puis $2$ : $C'(5\\,;\\,9)$.\n⭐ Pour cet axe-là, l'abscisse et l'ordonnée ÉCHANGENT leurs places : $(7\\,;\\,3)$ devient $(3\\,;\\,7)$.\n⛔ Le piège : compter à l'horizontale, comme pour un axe vertical. $A$ est à $4$ carreaux de l'axe vers la gauche : on tomberait en $(-1\\,;\\,3)$, hors du quadrillage, et $[AA']$ ne couperait pas l'axe à angle droit.\nRéponse : $A'(3\\,;\\,7)$, $B'(3\\,;\\,9)$ et $C'(5\\,;\\,9)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[7, 3], [9, 3], [9, 5]] },
              { pts: [[3, 7], [3, 9], [5, 9]], couleur: ORANGE },
              { pts: [[1, 1], [10, 10]], couleur: GRIS },
              { pts: [[7, 3], [3, 7]], couleur: GRIS },
              { pts: [[9, 3], [3, 9]], couleur: GRIS },
            ],
            [{ x: 7, y: 3, label: "A" }, { x: 9, y: 3, label: "B" }, { x: 9, y: 5, label: "C" }, { x: 3, y: 7, label: "A'" }, { x: 3, y: 9, label: "B'" }, { x: 5, y: 9, label: "C'" }],
          ),
          micros: ["sym_axiale"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $OAB$. Son sommet $O$ est aussi le centre de la symétrie.\nConstruire l'image de $OAB$ par la symétrie de centre $O$, et donner les coordonnées de $A'$ et $B'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[5, 5], [8, 6], [7, 8]] }],
            [{ x: 5, y: 5, label: "O" }, { x: 8, y: 6, label: "A" }, { x: 7, y: 8, label: "B" }],
          ),
          correction:
            "Une symétrie de centre $O$, c'est un DEMI-TOUR autour de $O$ : $O$ est le milieu de $[AA']$. Je lis le déplacement de $O$ vers le point, et je le refais DANS L'AUTRE SENS à partir de $O$.\nDe $O$ à $A$ : $3$ carreaux à droite, $1$ en haut. Depuis $O$ : $3$ à gauche, $1$ en bas, $A'(2\\,;\\,4)$.\nDe $O$ à $B$ : $2$ à droite, $3$ en haut. Donc $B'(3\\,;\\,2)$.\nEt $O$ ? C'est le centre : le demi-tour le laisse en place. Son image est $O$ lui-même.\n⭐ Contrôle : les segments gris $[AA']$ et $[BB']$ ont chacun $O$ pour milieu.\n⛔ Le piège : chercher une image de $O$ ailleurs, ou partir de $A$ au lieu de $O$ pour placer $A'$. Le triangle image garde un sommet en $O$.\nRéponse : le triangle $OA'B'$, avec $A'(2\\,;\\,4)$ et $B'(3\\,;\\,2)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[5, 5], [8, 6], [7, 8]] },
              { pts: [[5, 5], [2, 4], [3, 2]], couleur: ORANGE },
              { pts: [[8, 6], [2, 4]], couleur: GRIS },
              { pts: [[7, 8], [3, 2]], couleur: GRIS },
            ],
            [{ x: 5, y: 5, label: "O" }, { x: 8, y: 6, label: "A" }, { x: 7, y: 8, label: "B" }, { x: 2, y: 4, label: "A'" }, { x: 3, y: 2, label: "B'" }],
          ),
          micros: ["sym_centrale"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le trapèze $KLMN$ et une flèche verte.\nConstruire l'image de $KLMN$ par la translation qui suit la flèche verte, et donner les coordonnées de ses sommets.",
          figure: trace(
            [-1, 11],
            [{ pts: [[7, 2], [10, 2], [9, 4], [8, 4]] }, { pts: [[10, 7], [5, 10]], couleur: VERT, fleche: true }],
            [{ x: 7, y: 2, label: "K" }, { x: 10, y: 2, label: "L" }, { x: 9, y: 4, label: "M" }, { x: 8, y: 4, label: "N" }],
          ),
          correction:
            "Une translation fait GLISSER toute la figure comme la flèche : même direction, même sens, même longueur. Je lis la flèche de son départ à sa pointe : $5$ carreaux vers la gauche, $3$ vers le haut.\nJe refais ce déplacement depuis chaque sommet : $K'(2\\,;\\,5)$, $L'(5\\,;\\,5)$, $M'(4\\,;\\,7)$ et $N'(3\\,;\\,7)$.\n⭐ Contrôle : $K'L' = KL = 3$ carreaux, les flèches grises sont parallèles à la verte et de même longueur, et le trapèze n'est ni tourné ni retourné : sa grande base est toujours en bas.\n⛔ Le piège : lire la flèche à l'envers, de la pointe vers le départ. $K$ partirait vers la droite et le bas, en $(12\\,;\\,-1)$ : hors du quadrillage.\nRéponse : $K'(2\\,;\\,5)$, $L'(5\\,;\\,5)$, $M'(4\\,;\\,7)$ et $N'(3\\,;\\,7)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[7, 2], [10, 2], [9, 4], [8, 4]] },
              { pts: [[2, 5], [5, 5], [4, 7], [3, 7]], couleur: ORANGE },
              { pts: [[10, 7], [5, 10]], couleur: VERT, fleche: true },
              { pts: [[7, 2], [2, 5]], couleur: GRIS, fleche: true },
              { pts: [[10, 2], [5, 5]], couleur: GRIS, fleche: true },
            ],
            [{ x: 7, y: 2, label: "K" }, { x: 10, y: 2, label: "L" }, { x: 9, y: 4, label: "M" }, { x: 8, y: 4, label: "N" }, { x: 2, y: 5, label: "K'" }, { x: 5, y: 5, label: "L'" }, { x: 4, y: 7, label: "M'" }, { x: 3, y: 7, label: "N'" }],
          ),
          micros: ["sym_translation"],
        },
        {
          enonce:
            "Sur le quadrillage, on a tracé le triangle $ABC$ et placé le point $O$.\nConstruire l'image de $ABC$ par la rotation de centre $O$, d'angle 90°, dans le sens des aiguilles d'une montre. Donner les coordonnées de $A'$, $B'$ et $C'$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 7], [3, 9], [5, 9]] }],
            [{ x: 6, y: 6, label: "O" }, { x: 3, y: 7, label: "A" }, { x: 3, y: 9, label: "B" }, { x: 5, y: 9, label: "C" }],
          ),
          correction:
            "Une rotation fait TOURNER la figure autour de $O$ : chaque point garde sa distance à $O$ et tourne du même angle, ici un quart de tour.\nDans le sens des aiguilles d'une montre, ce qui est à gauche de $O$ passe en haut, et ce qui est en haut passe à droite.\nDe $O$ à $A$ : $3$ à gauche, $1$ en haut. Après le quart de tour : $3$ en haut, $1$ à droite, $A'(7\\,;\\,9)$.\nDe $O$ à $B$ : $3$ à gauche, $3$ en haut. Donc $3$ en haut, $3$ à droite : $B'(9\\,;\\,9)$.\nDe $O$ à $C$ : $1$ à gauche, $3$ en haut. Donc $1$ en haut, $3$ à droite : $C'(9\\,;\\,7)$.\n⭐ Contrôle : les traits gris $[OA]$ et $[OA']$ ont la même longueur et font un angle droit. Le côté vertical $[AB]$ est devenu horizontal.\n⛔ Le piège : tourner dans l'autre sens. $A$ irait sous $O$, en $(5\\,;\\,3)$.\nRéponse : $A'(7\\,;\\,9)$, $B'(9\\,;\\,9)$ et $C'(9\\,;\\,7)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 7], [3, 9], [5, 9]] },
              { pts: [[7, 9], [9, 9], [9, 7]], couleur: ORANGE },
              { pts: [[6, 6], [3, 7]], couleur: GRIS },
              { pts: [[6, 6], [7, 9]], couleur: GRIS },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 3, y: 7, label: "A" }, { x: 3, y: 9, label: "B" }, { x: 5, y: 9, label: "C" }, { x: 7, y: 9, label: "A'" }, { x: 9, y: 9, label: "B'" }, { x: 9, y: 7, label: "C'" }],
          ),
          micros: ["sym_rotation"],
        },
        {
          enonce:
            "Le triangle $RST$ a pour côtés $RS = 5$ cm, $ST = 7$ cm et $TR = 6$ cm, et $\\widehat{SRT} = 78°$. On construit son image $R'S'T'$ par la symétrie de centre $O$.\nSans rien mesurer, donner les longueurs des côtés de $R'S'T'$, son périmètre et la mesure de $\\widehat{S'R'T'}$.",
          correction:
            "La symétrie centrale est un demi-tour : elle déplace le triangle sans le déformer. Elle CONSERVE les longueurs et les angles.\nChaque côté a donc la même longueur que celui dont il est l'image : $R'S' = RS = 5$ cm, $S'T' = ST = 7$ cm et $T'R' = TR = 6$ cm.\nLe périmètre ne change pas : $5 + 7 + 6 = 18$ cm.\nL'angle est conservé aussi : $\\widehat{S'R'T'} = \\widehat{SRT} = 78°$.\n⭐ Le dessin le montre : le triangle $R'S'T'$ a la tête en bas, mais c'est le même triangle, aux mêmes mesures.\n⛔ Le piège : croire qu'une figure « à l'envers » a d'autres mesures, ou sortir la règle. La propriété suffit : aucune mesure, aucun rapporteur.\nRéponse : $R'S' = 5$ cm, $S'T' = 7$ cm, $T'R' = 6$ cm, un périmètre de $18$ cm, et $\\widehat{S'R'T'} = 78°$.",
          schema: deux(
            triangle({ A: [0, 0], B: [5, 0], C: [1.2, 5.8788] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "5 cm", BC: "7 cm", CA: "6 cm" }, angles: { A: "78°" } }),
            triangle({ A: [0, 0], B: [-5, 0], C: [-1.2, -5.8788] }, { noms: { A: "R'", B: "S'", C: "T'" }, cotes: { AB: "5 cm", BC: "7 cm", CA: "6 cm" }, angles: { A: "78°" } }),
          ),
          micros: ["sym_centrale", "sym_transformation_propriete"],
        },
        {
          enonce:
            "On a placé les points $M$, $N$, $P$ et $R$ sur le quadrillage. On utilise la translation qui transforme $M$ en $N$.\na) Placer $P'$, l'image de $P$.\nb) Placer le point $S$ dont l'image est $R$.",
          figure: trace([-1, 11], [], [{ x: 2, y: 3, label: "M" }, { x: 6, y: 4, label: "N" }, { x: 3, y: 7, label: "P" }, { x: 9, y: 6, label: "R" }]),
          correction:
            "Le déplacement se lit de $M$ à $N$ : $4$ carreaux à droite, $1$ en haut. La translation fait subir ce même déplacement à TOUS les points.\na) Depuis $P$ : $4$ à droite, $1$ en haut, $P'(7\\,;\\,8)$.\nb) Cette fois, je connais l'ARRIVÉE, $R$. Je remonte le déplacement à l'envers : $4$ à gauche, $1$ en bas, $S(5\\,;\\,5)$.\n⭐ Contrôle : de $S$ à $R$, $4$ à droite et $1$ en haut, comme de $M$ à $N$. Les trois flèches grises sont parallèles et de même longueur.\n⛔ Le piège au b) : appliquer la translation à $R$. On arriverait en $(13\\,;\\,7)$ : c'est l'image de $R$, pas le point qui arrive sur $R$.\nRéponse : $P'(7\\,;\\,8)$ et $S(5\\,;\\,5)$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 3], [6, 4]], couleur: GRIS, fleche: true },
              { pts: [[3, 7], [7, 8]], couleur: GRIS, fleche: true },
              { pts: [[5, 5], [9, 6]], couleur: GRIS, fleche: true },
            ],
            [{ x: 2, y: 3, label: "M" }, { x: 6, y: 4, label: "N" }, { x: 3, y: 7, label: "P" }, { x: 7, y: 8, label: "P'" }, { x: 5, y: 5, label: "S" }, { x: 9, y: 6, label: "R" }],
          ),
          micros: ["sym_translation"],
        },
        {
          enonce:
            "La grande aiguille d'une horloge mesure $12$ cm. Elle fait un tour complet en une heure, dans le sens des aiguilles d'une montre.\na) De combien de degrés tourne-t-elle en une minute ?\nb) De 14 h 00 à 14 h 20, son mouvement est une rotation. Donner son centre, son angle et son sens.\nc) À 14 h 20, à quelle distance du centre de l'horloge se trouve sa pointe ?",
          correction:
            "a) Un tour complet, c'est $360°$, en $60$ minutes : $360 \\div 60 = 6°$ par minute.\nb) En $20$ minutes : $20 \\times 6 = 120°$. C'est la rotation de centre $O$, le centre de l'horloge, d'angle $120°$, dans le sens des aiguilles d'une montre.\n⭐ Sur le dessin, un carreau vaut $3$ cm : la pointe part de $M$ à 14 h 00, passe en $P$ au quart d'heure, après $90°$, et arrive en $Q$ à 14 h 20.\nc) Une rotation conserve les longueurs : $OQ = OM = 12$ cm. La pointe reste à $12$ cm du centre, elle décrit un cercle.\n⛔ Le piège : croire qu'une minute vaut un degré, et trouver $20°$. Le cadran fait $360°$ pour $60$ minutes.\nRéponse : $6°$ par minute ; la rotation de centre $O$, d'angle $120°$, dans le sens des aiguilles d'une montre ; $12$ cm.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[6, 6], [6, 10]] },
              { pts: [[6, 6], [10, 6]], couleur: GRIS },
              { pts: [[6, 6], [9.46, 4]], couleur: ORANGE },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 6, y: 10, label: "M" }, { x: 10, y: 6, label: "P" }, { x: 9.46, y: 4, label: "Q" }],
          ),
          micros: ["sym_rotation", "sym_transformation_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir : construire, reconnaître, justifier avec une propriété.",
      rappel: [
        "Construire une image : sommet par sommet, en partant de l'axe, du centre ou de la flèche, puis je relie dans le même ordre.",
        "Seule la symétrie axiale RETOURNE la figure. Une rotation de 180°, c'est une symétrie centrale.",
        "Par une symétrie centrale ou une translation, une droite a pour image une droite PARALLÈLE.",
        "Pour justifier une longueur ou un angle égal, je cite la transformation et ce qu'elle conserve.",
      ],
      exercices: [
        {
          enonce:
            "Dans Tetris, la pièce bleue s'appelle le « L ». On l'a reproduite trois fois sur le quadrillage : en orange, en vert et en violet.\na) Quelle transformation envoie la pièce bleue sur la pièce orange ? Sur la verte ? Sur la violette ?\nb) Dans le jeu, une pièce peut seulement glisser et tourner. Laquelle des trois le joueur ne peut-il PAS obtenir à partir de la bleue ?",
          figure: trace([-1, 11], [
            { pts: [[2, 2], [4, 2], [4, 3], [3, 3], [3, 5], [2, 5]] },
            { pts: [[2, 7], [4, 7], [4, 8], [3, 8], [3, 10], [2, 10]], couleur: ORANGE },
            { pts: [[9, 7], [9, 9], [8, 9], [8, 8], [6, 8], [6, 7]], couleur: VERT },
            { pts: [[9, 2], [7, 2], [7, 3], [8, 3], [8, 5], [9, 5]], couleur: VIOLET },
          ]),
          correction:
            "a) Orange : chaque coin a monté de $5$ carreaux, par exemple de $(2\\,;\\,2)$ à $(2\\,;\\,7)$, et la pièce n'a ni tourné ni été retournée. C'est la translation de $5$ carreaux vers le haut.\nVerte : la pièce est couchée, sa barre de $3$ carreaux est devenue horizontale, et son pied pointe vers le haut au lieu de la droite. Elle a tourné d'un quart de tour dans le sens contraire des aiguilles d'une montre : c'est une rotation d'angle $90°$.\nViolette : c'est le reflet de la bleue dans un miroir vertical placé à mi-chemin, sur la droite verticale d'abscisse $5{,}5$. Le pied pointe maintenant vers la GAUCHE : c'est une symétrie axiale.\nb) Glisser, c'est une translation ; tourner, c'est une rotation. Aucune des deux ne retourne une figure : seule la symétrie axiale le fait. Le joueur ne peut donc pas obtenir la pièce violette.\n⭐ Dans Tetris, la pièce violette existe, mais c'est une AUTRE pièce : le « J », le reflet du « L ».\n⛔ Le piège : croire qu'en tournant assez, on finit par obtenir le reflet. On peut tourner le « L » dans tous les sens, il reste un « L » ; il ne devient jamais un « J ».\nRéponse : une translation (orange), une rotation d'un quart de tour (verte), une symétrie axiale (violette) ; la violette est impossible à obtenir.",
          schema: trace([-1, 11], [
            { pts: [[2, 2], [4, 2], [4, 3], [3, 3], [3, 5], [2, 5]] },
            { pts: [[2, 7], [4, 7], [4, 8], [3, 8], [3, 10], [2, 10]], couleur: ORANGE },
            { pts: [[9, 7], [9, 9], [8, 9], [8, 8], [6, 8], [6, 7]], couleur: VERT },
            { pts: [[9, 2], [7, 2], [7, 3], [8, 3], [8, 5], [9, 5]], couleur: VIOLET },
            { pts: [[5.5, 1], [5.5, 6]], couleur: GRIS },
            { pts: [[2, 2], [2, 7]], couleur: GRIS, fleche: true },
          ]),
          micros: ["sym_axiale", "sym_translation", "sym_rotation", "sym_transformation_defi"],
        },
        {
          enonce:
            "On a dessiné l'aile gauche d'un papillon. Son corps est sur la droite grise $(d)$.\na) Compléter le papillon par la symétrie d'axe $(d)$. Donner les coordonnées de $A'$, $B'$ et $C'$.\nb) Quels points de l'aile gauche sont leur propre image ?\nc) L'aile gauche couvre $18{,}5$ carreaux. Quelle est l'aire des deux ailes ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[6, 8], [3, 9], [2, 7], [4, 6], [2, 4], [3, 2], [6, 4]] }, { pts: [[6, 1], [6, 10]], couleur: GRIS }],
            [{ x: 3, y: 9, label: "A" }, { x: 2, y: 7, label: "B" }, { x: 3, y: 2, label: "C" }],
          ),
          correction:
            "a) L'axe $(d)$ est vertical : je compte à l'horizontale la distance de chaque point à l'axe, et je la reporte de l'autre côté.\n$A$ est à $3$ carreaux à gauche de $(d)$ : $A'(9\\,;\\,9)$.\n$B$ est à $4$ carreaux : $B'(10\\,;\\,7)$.\n$C$ est à $3$ carreaux : $C'(9\\,;\\,2)$.\nJe fais de même pour les deux autres coins, puis je relie dans le même ordre.\nb) Les points $(6\\,;\\,8)$ et $(6\\,;\\,4)$ sont SUR l'axe : à zéro carreau de lui, ils ne bougent pas. Un point de l'axe est son propre symétrique.\nc) La symétrie axiale conserve les aires : l'aile droite couvre aussi $18{,}5$ carreaux. Les deux ailes : $18{,}5 \\times 2 = 37$ carreaux.\n⛔ Le piège : reporter l'abscisse au lieu de la distance à l'axe. $B$ a pour abscisse $2$ ; placer $B'$ à $2$ carreaux après l'axe donnerait $(8\\,;\\,7)$, une aile tordue. C'est $4$ carreaux qu'il faut reporter.\nRéponse : $A'(9\\,;\\,9)$, $B'(10\\,;\\,7)$, $C'(9\\,;\\,2)$ ; les deux points de l'axe ; $37$ carreaux.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[6, 8], [3, 9], [2, 7], [4, 6], [2, 4], [3, 2], [6, 4]] },
              { pts: [[6, 8], [9, 9], [10, 7], [8, 6], [10, 4], [9, 2], [6, 4]], couleur: ORANGE },
              { pts: [[6, 1], [6, 10]], couleur: GRIS },
            ],
            [{ x: 3, y: 9, label: "A" }, { x: 2, y: 7, label: "B" }, { x: 3, y: 2, label: "C" }, { x: 9, y: 9, label: "A'" }, { x: 10, y: 7, label: "B'" }, { x: 9, y: 2, label: "C'" }],
          ),
          micros: ["sym_axiale", "sym_transformation_propriete"],
        },
        {
          enonce:
            "On a placé le centre $O$ et le segment $[AB]$.\na) Construire $[A'B']$, l'image de $[AB]$ par la symétrie de centre $O$.\nb) Comparer les longueurs $AB$ et $A'B'$, puis les directions des droites $(AB)$ et $(A'B')$.\nc) Quelle est la nature du quadrilatère $ABA'B'$ ? Justifier.",
          figure: trace([-1, 11], [{ pts: [[3, 4], [5, 8]] }], [{ x: 6, y: 5, label: "O" }, { x: 3, y: 4, label: "A" }, { x: 5, y: 8, label: "B" }]),
          correction:
            "a) De $O$ à $A$ : $3$ à gauche, $1$ en bas. Je refais l'inverse depuis $O$ : $3$ à droite, $1$ en haut, $A'(9\\,;\\,6)$.\nDe $O$ à $B$ : $1$ à gauche, $3$ en haut. Donc $B'(7\\,;\\,2)$.\nb) De $A$ à $B$ : $2$ à droite, $4$ en haut. De $B'$ à $A'$ : $2$ à droite, $4$ en haut. Même déplacement : $A'B' = AB$, car la symétrie centrale conserve les longueurs, et $(A'B')$ est PARALLÈLE à $(AB)$.\n⭐ À retenir : par une symétrie centrale, une droite a pour image une droite parallèle.\nc) Les diagonales $[AA']$ et $[BB']$ du quadrilatère $ABA'B'$ ont le même milieu, $O$. Un quadrilatère dont les diagonales ont le même milieu est un parallélogramme.\n⛔ Le piège : relier les points dans le désordre et tracer $ABB'A'$, un quadrilatère croisé. Je fais le tour : $A$, $B$, puis $A'$, puis $B'$.\nRéponse : $A'(9\\,;\\,6)$ et $B'(7\\,;\\,2)$ ; $A'B' = AB$ et $(A'B') \\parallel (AB)$ ; $ABA'B'$ est un parallélogramme.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 4], [5, 8]] },
              { pts: [[9, 6], [7, 2]], couleur: ORANGE },
              { pts: [[5, 8], [9, 6]], couleur: VERT },
              { pts: [[7, 2], [3, 4]], couleur: VERT },
              { pts: [[3, 4], [9, 6]], couleur: GRIS },
              { pts: [[5, 8], [7, 2]], couleur: GRIS },
            ],
            [{ x: 6, y: 5, label: "O" }, { x: 3, y: 4, label: "A" }, { x: 5, y: 8, label: "B" }, { x: 9, y: 6, label: "A'" }, { x: 7, y: 2, label: "B'" }],
          ),
          micros: ["sym_centrale", "sym_transformation_propriete"],
        },
        {
          enonce:
            "Aux échecs, le cavalier saute « en L ». Sur le quadrillage, il part de $D(2\\,;\\,2)$ et fait trois sauts : $t_1$ ($2$ carreaux à droite, $1$ en haut), puis $t_2$ ($1$ à droite, $2$ en haut), puis encore $t_1$.\na) Donner les coordonnées de ses trois arrivées $E$, $F$ et $G$.\nb) Quelle translation, en un seul saut, l'emmènerait de $D$ à $G$ ?\nc) S'il fait les mêmes sauts dans l'ordre $t_2$, $t_1$, $t_1$, où arrive-t-il ?",
          correction:
            "a) Chaque saut est une translation : j'ajoute le déplacement aux coordonnées.\n$t_1$ depuis $D$ : $E(4\\,;\\,3)$. Puis $t_2$ : $F(5\\,;\\,5)$. Puis $t_1$ : $G(7\\,;\\,6)$.\nb) De $D$ à $G$ : $7 - 2 = 5$ carreaux à droite et $6 - 2 = 4$ en haut. C'est la translation de $5$ carreaux à droite et $4$ en haut : la flèche orange.\n⭐ Enchaîner des translations donne encore une translation : on ajoute les déplacements, $2 + 1 + 2 = 5$ et $1 + 2 + 1 = 4$.\nc) Les mêmes sauts dans un autre ordre donnent le même total : $5$ à droite, $4$ en haut. Il arrive encore en $G$, en passant par $(3\\,;\\,4)$ et $(5\\,;\\,5)$.\n⛔ Le piège : ajouter les longueurs des sauts, comme si le cavalier avançait en ligne droite. La translation ne retient que le DÉPART et l'ARRIVÉE.\nRéponse : $E(4\\,;\\,3)$, $F(5\\,;\\,5)$, $G(7\\,;\\,6)$ ; la translation de $5$ carreaux à droite et $4$ en haut ; au même endroit, en $G$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 2], [4, 3]], fleche: true },
              { pts: [[4, 3], [5, 5]], fleche: true },
              { pts: [[5, 5], [7, 6]], fleche: true },
              { pts: [[2, 2], [7, 6]], couleur: ORANGE, fleche: true },
            ],
            [{ x: 2, y: 2, label: "D" }, { x: 4, y: 3, label: "E" }, { x: 5, y: 5, label: "F" }, { x: 7, y: 6, label: "G" }],
          ),
          micros: ["sym_translation", "sym_transformation_defi"],
        },
        {
          enonce:
            "Un moulinet, le jouet qui tourne au vent, a quatre pales identiques. On a dessiné la pale $OAB$.\na) Construire $OA_1B_1$, image de $OAB$ par la rotation de centre $O$, d'angle 90°, dans le sens contraire des aiguilles d'une montre ; puis $OA_2B_2$, image de $OA_1B_1$ par la même rotation ; puis $OA_3B_3$.\nb) Par quelle transformation passe-t-on directement de $OAB$ à $OA_2B_2$ ?\nc) Quelle rotation envoie directement $OAB$ sur $OA_3B_3$ ?",
          figure: trace([-1, 11], [{ pts: [[6, 6], [6, 9], [8, 8]] }], [{ x: 6, y: 6, label: "O" }, { x: 6, y: 9, label: "A" }, { x: 8, y: 8, label: "B" }]),
          correction:
            "a) Quart de tour dans le sens contraire des aiguilles d'une montre : ce qui est en haut de $O$ passe à gauche, et ce qui est à droite passe en haut.\n$A$ est $3$ carreaux au-dessus de $O$ : $A_1$ est $3$ carreaux à gauche, $A_1(3\\,;\\,6)$.\n$B$ est $2$ à droite, $2$ en haut : $B_1$ est $2$ en haut, $2$ à gauche, $B_1(4\\,;\\,8)$.\nJe recommence depuis $A_1$ et $B_1$ : $A_2(6\\,;\\,3)$ et $B_2(4\\,;\\,4)$. Puis une dernière fois : $A_3(9\\,;\\,6)$ et $B_3(8\\,;\\,4)$.\nb) Deux quarts de tour font un demi-tour : $OA_2B_2$ est l'image de $OAB$ par la symétrie de centre $O$. Contrôle : $O$ est le milieu de $[AA_2]$, qui va de $(6\\,;\\,9)$ à $(6\\,;\\,3)$.\nc) Trois quarts de tour : $270°$ dans le sens contraire des aiguilles d'une montre. Ou, plus court, un quart de tour dans le sens des aiguilles d'une montre : la pale $OA_3B_3$ est juste à droite de $OAB$.\n⛔ Le piège : tourner chaque nouvelle pale autour d'un de ses propres sommets. Le centre reste $O$ à chaque fois : c'est l'axe du moulinet.\nRéponse : $A_1(3\\,;\\,6)$, $B_1(4\\,;\\,8)$, $A_2(6\\,;\\,3)$, $B_2(4\\,;\\,4)$, $A_3(9\\,;\\,6)$, $B_3(8\\,;\\,4)$ ; la symétrie de centre $O$ ; un quart de tour dans le sens des aiguilles d'une montre.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[6, 6], [6, 9], [8, 8]] },
              { pts: [[6, 6], [3, 6], [4, 8]], couleur: ORANGE },
              { pts: [[6, 6], [6, 3], [4, 4]], couleur: VERT },
              { pts: [[6, 6], [9, 6], [8, 4]], couleur: VIOLET },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 6, y: 9, label: "A" }, { x: 8, y: 8, label: "B" }, { x: 3, y: 6, label: "A₁" }, { x: 4, y: 8, label: "B₁" }, { x: 6, y: 3, label: "A₂" }, { x: 4, y: 4, label: "B₂" }, { x: 9, y: 6, label: "A₃" }, { x: 8, y: 4, label: "B₃" }],
          ),
          micros: ["sym_rotation", "sym_centrale", "sym_transformation_defi"],
        },
        {
          enonce:
            "Un cerf-volant est formé du triangle $ABC$ et de son image $ADC$ par la symétrie d'axe $(AC)$, la baguette centrale. On sait que $AB = 40$ cm, $BC = 60$ cm et $\\widehat{ABC} = 100°$.\na) Donner $AD$, $DC$ et le périmètre du cerf-volant.\nb) Donner la mesure de $\\widehat{ADC}$.\nc) On mesure $\\widehat{BAD} = 99°$. En déduire $\\widehat{BCD}$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 5.5], [4.6, 8.54], [9.77, 5.5]] }, { pts: [[1, 5.5], [10.5, 5.5]], couleur: GRIS }],
            [{ x: 2, y: 5.5, label: "A" }, { x: 4.6, y: 8.54, label: "B" }, { x: 9.77, y: 5.5, label: "C" }],
          ),
          correction:
            "a) $D$ est le symétrique de $B$ par rapport à $(AC)$. $A$ et $C$ sont sur l'axe : ils sont leur propre image. Donc $[AD]$ est l'image de $[AB]$, et $[DC]$ celle de $[BC]$.\nLa symétrie axiale conserve les longueurs : $AD = AB = 40$ cm et $DC = BC = 60$ cm.\nPérimètre : $40 + 60 + 60 + 40 = 200$ cm, soit $2$ m.\nb) Elle conserve aussi les angles : $\\widehat{ADC} = \\widehat{ABC} = 100°$.\nc) La somme des angles d'un quadrilatère vaut $360°$ : on le coupe en deux triangles de $180°$. Donc $\\widehat{BCD} = 360° - 100° - 100° - 99° = 61°$.\n⭐ Sur le dessin, un carreau vaut $10$ cm. La baguette $(AC)$ coupe $[BD]$ en son milieu, à angle droit : l'axe est la médiatrice de $[BD]$.\n⛔ Le piège : croire que les quatre côtés sont égaux, comme dans un losange. L'image de $[AB]$ est $[AD]$, pas $[DC]$ : les côtés égaux sont VOISINS, deux à deux.\nRéponse : $AD = 40$ cm, $DC = 60$ cm, un périmètre de $200$ cm ; $\\widehat{ADC} = 100°$ ; $\\widehat{BCD} = 61°$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 5.5], [4.6, 8.54], [9.77, 5.5]] },
              { pts: [[2, 5.5], [4.6, 2.46], [9.77, 5.5]], couleur: ORANGE },
              { pts: [[1, 5.5], [10.5, 5.5]], couleur: GRIS },
              { pts: [[4.6, 8.54], [4.6, 2.46]], couleur: GRIS },
            ],
            [{ x: 2, y: 5.5, label: "A" }, { x: 4.6, y: 8.54, label: "B" }, { x: 9.77, y: 5.5, label: "C" }, { x: 4.6, y: 2.46, label: "D" }],
          ),
          micros: ["sym_axiale", "sym_transformation_propriete", "sym_transformation_defi"],
        },
        {
          enonce:
            "Sur le quadrillage : le triangle $ABC$ et deux points $I$ et $J$.\na) Construire $A'B'C'$, l'image de $ABC$ par la symétrie de centre $I$.\nb) Construire $A''B''C''$, l'image de $A'B'C'$ par la symétrie de centre $J$.\nc) Quelle transformation, en un seul geste, envoie $ABC$ sur $A''B''C''$ ? Comparer avec la longueur $IJ$.",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 2], [4, 2], [2, 4]] }],
            [{ x: 2, y: 2, label: "A" }, { x: 4, y: 2, label: "B" }, { x: 2, y: 4, label: "C" }, { x: 5, y: 4, label: "I" }, { x: 5, y: 7, label: "J" }],
          ),
          correction:
            "a) Premier demi-tour, autour de $I$. De $I$ à $A$ : $3$ à gauche, $2$ en bas ; je refais l'inverse depuis $I$ : $A'(8\\,;\\,6)$. De même, $B'(6\\,;\\,6)$ et $C'(8\\,;\\,4)$.\nb) Deuxième demi-tour, autour de $J$. De $J$ à $A'$ : $3$ à droite, $1$ en bas ; donc $A''(2\\,;\\,8)$. De même, $B''(4\\,;\\,8)$ et $C''(2\\,;\\,10)$.\nc) De $A$ à $A''$ : $6$ carreaux vers le haut. De $B$ à $B''$, de $C$ à $C''$ : $6$ vers le haut aussi. Même déplacement pour tous les points : c'est une TRANSLATION de $6$ carreaux vers le haut.\nOr $IJ = 3$ carreaux : la translation fait DEUX FOIS $IJ$, dans le sens de $I$ vers $J$.\n⭐ Deux demi-tours font un tour complet : la figure retrouve son orientation, la pointe $C''$ est de nouveau en haut. Elle a seulement glissé.\n⛔ Le piège : croire que deux symétries centrales donnent une symétrie centrale, ou une translation de $3$ carreaux seulement.\nRéponse : $A'(8\\,;\\,6)$, $B'(6\\,;\\,6)$, $C'(8\\,;\\,4)$ ; $A''(2\\,;\\,8)$, $B''(4\\,;\\,8)$, $C''(2\\,;\\,10)$ ; la translation de $6$ carreaux vers le haut, le double de $IJ$.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 2], [4, 2], [2, 4]] },
              { pts: [[8, 6], [6, 6], [8, 4]], couleur: ORANGE },
              { pts: [[2, 8], [4, 8], [2, 10]], couleur: VIOLET },
              { pts: [[2, 2], [8, 6]], couleur: GRIS },
              { pts: [[8, 6], [2, 8]], couleur: GRIS },
            ],
            [{ x: 2, y: 2, label: "A" }, { x: 4, y: 2, label: "B" }, { x: 5, y: 4, label: "I" }, { x: 5, y: 7, label: "J" }, { x: 8, y: 6, label: "A'" }, { x: 6, y: 6, label: "B'" }, { x: 2, y: 8, label: "A''" }, { x: 4, y: 8, label: "B''" }],
          ),
          micros: ["sym_centrale", "sym_transformation_defi"],
        },
        {
          enonce:
            "Sur le quadrillage, $ABCD$ est un carré « penché », et $O$ est son centre.\na) Montrer, en comptant les carreaux, que la rotation de centre $O$, d'angle 90°, dans le sens contraire des aiguilles d'une montre, envoie $A$ sur $B$, puis $B$ sur $C$.\nb) Elle envoie aussi $C$ sur $D$ et $D$ sur $A$. Qu'en déduit-on pour les longueurs $OA$, $OB$, $OC$, $OD$, et pour l'angle $\\widehat{AOB}$ ?\nc) En déduire trois propriétés des diagonales d'un carré.",
          figure: trace(
            [-1, 11],
            [{ pts: [[3, 4], [8, 3], [9, 8], [4, 9]] }],
            [{ x: 6, y: 6, label: "O" }, { x: 3, y: 4, label: "A" }, { x: 8, y: 3, label: "B" }, { x: 9, y: 8, label: "C" }, { x: 4, y: 9, label: "D" }],
          ),
          correction:
            "a) De $O$ à $A$ : $3$ à gauche, $2$ en bas. Un quart de tour dans le sens contraire des aiguilles d'une montre : « à gauche » devient « en bas », et « en bas » devient « à droite ». Donc $3$ en bas, $2$ à droite : on arrive en $(8\\,;\\,3)$, c'est $B$.\nDe $O$ à $B$ : $2$ à droite, $3$ en bas. Après le quart de tour : $2$ en haut, $3$ à droite, on arrive en $(9\\,;\\,8)$, c'est $C$.\nb) Une rotation conserve les longueurs : $OB = OA$, puis $OC = OB$ et $OD = OC$. Les quatre sont égales.\nEt $B$ est l'image de $A$ par un quart de tour : $\\widehat{AOB} = 90°$.\nc) Deux quarts de tour font un demi-tour : $C$ est le symétrique de $A$ par rapport à $O$. Donc $A$, $O$, $C$ sont alignés et $O$ est le milieu de $[AC]$ ; de même pour $[BD]$.\nLes diagonales $[AC]$ et $[BD]$ ont donc le même milieu $O$, la même longueur, $2 \\times OA$, et elles sont perpendiculaires, puisque $\\widehat{AOB} = 90°$.\n⛔ Le piège : le constater sur le dessin et s'arrêter là. Un dessin ne démontre rien ; c'est la rotation, qui conserve les longueurs et les angles, qui justifie.\nRéponse : $OA = OB = OC = OD$ et $\\widehat{AOB} = 90°$ ; les diagonales d'un carré ont le même milieu, la même longueur, et sont perpendiculaires.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[3, 4], [8, 3], [9, 8], [4, 9]] },
              { pts: [[3, 4], [9, 8]], couleur: ORANGE },
              { pts: [[8, 3], [4, 9]], couleur: ORANGE },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 3, y: 4, label: "A" }, { x: 8, y: 3, label: "B" }, { x: 9, y: 8, label: "C" }, { x: 4, y: 9, label: "D" }],
          ),
          micros: ["sym_rotation", "sym_transformation_propriete", "sym_transformation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je cherche la transformation cachée, puis j'utilise ce qu'elle conserve.",
      rappel: [
        "Un motif qui revient identique est souvent l'image d'un autre : je nomme la transformation, puis je me sers de ce qu'elle conserve, longueurs, angles et aires.",
        "Une figure faite de $n$ parties identiques autour d'un centre est inchangée par la rotation d'angle $360° \\div n$.",
        "Une figure a un centre de symétrie si un demi-tour, 180°, la laisse inchangée.",
      ],
      exercices: [
        {
          titre: "Le terrain de handball",
          enonce:
            "Un terrain de handball mesure $40$ m sur $20$ m. Sur le quadrillage, un carreau représente $5$ m ; $O$ est le centre du terrain, et $P$ le milieu de la ligne des 7 m de gauche, à $7$ m de la ligne de but.\na) Le terrain a un centre de symétrie et deux axes de symétrie. Lesquels ?\nb) Donner l'image du coin $A$ par la symétrie de centre $O$, puis par la symétrie d'axe la ligne médiane, puis par la symétrie d'axe la droite qui joint les deux buts.\nc) Placer $P'$, le symétrique de $P$ par rapport à $O$. Quelle distance sépare $P$ et $P'$ ?",
          figure: trace(
            [-1, 11],
            [{ pts: [[2, 4], [10, 4], [10, 8], [2, 8]] }, { pts: [[6, 3], [6, 9]], couleur: GRIS }],
            [{ x: 2, y: 4, label: "A" }, { x: 10, y: 4, label: "B" }, { x: 10, y: 8, label: "C" }, { x: 2, y: 8, label: "D" }, { x: 6, y: 6, label: "O" }, { x: 3.4, y: 6, label: "P" }],
          ),
          correction:
            "a) Le centre de symétrie est $O$, le centre du terrain. Les deux axes : la ligne médiane, qui coupe le terrain en deux camps, et la droite qui joint le milieu des deux buts. Chacune plie le terrain sur lui-même.\nb) Par la symétrie de centre $O$ : de $O$ à $A$, $4$ carreaux à gauche et $2$ en bas ; l'inverse depuis $O$ donne le coin opposé, $C(10\\,;\\,8)$.\nPar la symétrie d'axe la ligne médiane : $A$ est à $4$ carreaux à gauche de l'axe, son image est à $4$ carreaux à droite, $B(10\\,;\\,4)$.\nPar la symétrie d'axe la droite des buts : $A$ est à $2$ carreaux en dessous, son image est $D(2\\,;\\,8)$.\nc) $P$ est à $7$ m de la ligne de but, soit $7 \\div 5 = 1{,}4$ carreau : $P(3{,}4\\,;\\,6)$. De $O$ à $P$ : $2{,}6$ carreaux à gauche. Donc $P'(8{,}6\\,;\\,6)$, à $7$ m de l'autre ligne de but.\nDistance : $PP' = 40 - 7 - 7 = 26$ m. Contrôle sur le dessin : $8{,}6 - 3{,}4 = 5{,}2$ carreaux, et $5{,}2 \\times 5 = 26$ m.\n⭐ C'est grâce à ce demi-tour que les équipes peuvent changer de camp à la mi-temps : chacune retrouve le même terrain.\n⛔ Le piège au b) : croire que les trois symétries donnent le même coin. Trois transformations différentes, trois images différentes.\nRéponse : le centre $O$, la ligne médiane et la droite des buts ; $C$, $B$ et $D$ ; $PP' = 26$ m.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 4], [10, 4], [10, 8], [2, 8]] },
              { pts: [[6, 3], [6, 9]], couleur: GRIS },
              { pts: [[1, 6], [11, 6]], couleur: GRIS },
              { pts: [[2, 4], [10, 8]], couleur: ORANGE },
            ],
            [{ x: 2, y: 4, label: "A" }, { x: 10, y: 4, label: "B" }, { x: 10, y: 8, label: "C" }, { x: 2, y: 8, label: "D" }, { x: 6, y: 6, label: "O" }, { x: 3.4, y: 6, label: "P" }, { x: 8.6, y: 6, label: "P'" }],
          ),
          micros: ["sym_centrale", "sym_axiale", "sym_transformation_defi"],
        },
        {
          titre: "La grande roue de Londres",
          enonce:
            "La grande roue de Londres, le London Eye, mesure $120$ m de diamètre. Elle porte $32$ cabines régulièrement réparties, et fait un tour complet en $30$ minutes environ.\na) Quelle rotation envoie chaque cabine sur la suivante ? Donner son angle.\nb) Une cabine part du point le plus bas. Au bout de combien de minutes a-t-elle tourné de 90° ?\nc) Où est-elle au bout de $15$ minutes ? Par quelle transformation passe-t-on de sa position de départ à celle-ci ?\nd) De combien de mètres est-elle montée au bout de $7{,}5$ minutes ? Au bout de $15$ minutes ?",
          correction:
            "a) Les $32$ cabines se partagent le tour complet, $360°$ : $360 \\div 32 = 11{,}25°$. La rotation de centre $O$, le moyeu, et d'angle $11{,}25°$ envoie chaque cabine sur la suivante.\nb) Un quart de tour prend un quart du temps : $30 \\div 4 = 7{,}5$ minutes. Sur le schéma, la roue tourne dans le sens contraire des aiguilles d'une montre : la cabine passe de $P$, en bas, à $Q$, à la hauteur du centre.\nc) Au bout de $15$ minutes, la moitié du tour : $180°$. La cabine est au point le plus haut, $R$. Une rotation de $180°$ est une symétrie centrale : $R$ est le symétrique de $P$ par rapport à $O$.\nd) La rotation conserve les distances : la cabine reste toujours à $120 \\div 2 = 60$ m de $O$. Au bout de $7{,}5$ minutes, elle est à la hauteur de $O$ : elle est montée de $60$ m. Au bout de $15$ minutes, de tout le diamètre : $120$ m.\n⭐ Le schéma est à l'échelle : un carreau vaut $15$ m, et le rayon mesure $4$ carreaux.\n⛔ Le piège au d) : répondre $30$ m au bout d'un quart de tour, le quart de $120$ m. La cabine est montée d'un RAYON, $60$ m : la moitié de la hauteur, en un quart du temps.\nRéponse : la rotation de centre $O$ et d'angle $11{,}25°$ ; $7{,}5$ minutes ; au sommet, le symétrique du départ par rapport à $O$ ; $60$ m, puis $120$ m.",
          schema: trace(
            [-1, 11],
            [
              { pts: [[6, 6], [6, 2]] },
              { pts: [[6, 6], [10, 6]], couleur: ORANGE },
              { pts: [[6, 6], [6, 10]], couleur: VIOLET },
            ],
            [{ x: 6, y: 6, label: "O" }, { x: 6, y: 2, label: "P" }, { x: 10, y: 6, label: "Q" }, { x: 6, y: 10, label: "R" }],
          ),
          micros: ["sym_rotation", "sym_centrale", "sym_transformation_propriete"],
        },
        {
          titre: "Le flocon et l'étoile de mer",
          enonce:
            "Un flocon de neige a six branches identiques ; la plupart des étoiles de mer ont cinq bras identiques. On les a schématisés ci-dessous, chacun de centre $O$.\na) Quel est le plus petit angle d'une rotation de centre $O$ qui laisse le flocon inchangé ? Et l'étoile de mer ?\nb) L'un des deux a un centre de symétrie. Lequel ? Justifier par un calcul.\nc) L'étoile de mer a-t-elle un axe de symétrie ? En donner un.",
          figure: deux(
            trace(
              [-1, 9],
              [
                { pts: [[5, 5], [8, 5]] },
                { pts: [[5, 5], [6.5, 7.6]] },
                { pts: [[5, 5], [3.5, 7.6]] },
                { pts: [[5, 5], [2, 5]] },
                { pts: [[5, 5], [3.5, 2.4]] },
                { pts: [[5, 5], [6.5, 2.4]] },
              ],
              [{ x: 5, y: 5, label: "O" }],
            ),
            trace(
              [-1, 9],
              [
                { pts: [[5, 5], [5, 8]] },
                { pts: [[5, 5], [2.15, 5.93]] },
                { pts: [[5, 5], [3.24, 2.57]] },
                { pts: [[5, 5], [6.76, 2.57]] },
                { pts: [[5, 5], [7.85, 5.93]] },
              ],
              [{ x: 5, y: 5, label: "O" }],
            ),
          ),
          correction:
            "a) Les six branches du flocon se partagent le tour : $360 \\div 6 = 60°$. La rotation de centre $O$ d'angle $60°$ envoie chaque branche sur la suivante, par exemple $A$ sur $A'$ : le flocon est inchangé.\nPour l'étoile de mer : $360 \\div 5 = 72°$. Le bras $B$ va sur le bras $B'$.\nb) Un centre de symétrie, c'est un demi-tour, $180°$, qui laisse la figure inchangée. Pour le flocon, $180 = 3 \\times 60$ : le demi-tour fait trois crans de $60°$, le flocon est inchangé. $O$ est son centre de symétrie.\nPour l'étoile, $180 \\div 72 = 2{,}5$ : ce n'est pas un nombre entier de crans. Après un demi-tour, le bras qui pointait vers le haut pointe vers le bas, où il n'y a pas de bras.\nc) Oui : la droite qui porte le bras $B$ et passe par $O$ ; en gris, son prolongement. Elle partage l'étoile en deux moitiés qui se replient l'une sur l'autre. L'étoile en a cinq, une par bras.\n⛔ Le piège au b) : croire que toute figure qui se superpose à elle-même en tournant a un centre de symétrie. Il faut que $180°$ soit un multiple de l'angle.\nRéponse : $60°$ pour le flocon, $72°$ pour l'étoile ; le flocon ; oui, la droite qui porte un bras.",
          schema: deux(
            trace(
              [-1, 9],
              [
                { pts: [[5, 5], [8, 5]] },
                { pts: [[5, 5], [6.5, 7.6]], couleur: ORANGE },
                { pts: [[5, 5], [3.5, 7.6]] },
                { pts: [[5, 5], [2, 5]] },
                { pts: [[5, 5], [3.5, 2.4]] },
                { pts: [[5, 5], [6.5, 2.4]] },
              ],
              [{ x: 5, y: 5, label: "O" }, { x: 8, y: 5, label: "A" }, { x: 6.5, y: 7.6, label: "A'" }],
            ),
            trace(
              [-1, 9],
              [
                { pts: [[5, 5], [5, 8]] },
                { pts: [[5, 5], [2.15, 5.93]], couleur: ORANGE },
                { pts: [[5, 5], [3.24, 2.57]] },
                { pts: [[5, 5], [6.76, 2.57]] },
                { pts: [[5, 5], [7.85, 5.93]] },
                { pts: [[5, 1], [5, 4]], couleur: GRIS },
              ],
              [{ x: 5, y: 5, label: "O" }, { x: 5, y: 8, label: "B" }, { x: 2.15, y: 5.93, label: "B'" }],
            ),
          ),
          micros: ["sym_rotation", "sym_centrale", "sym_axiale", "sym_transformation_defi"],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Sur un toit, on pose des panneaux solaires de $2$ m sur $1$ m. Sur le quadrillage, un carreau représente $1$ m. Le premier panneau, $P_1$, a pour coin $A$. Pour poser les autres, on utilise la translation $t$ ($2$ carreaux vers la droite) et la translation $u$ ($3$ carreaux vers le haut).\na) $P_2$ est l'image de $P_1$ par $t$, et $P_3$ celle de $P_2$ par $t$. Quelle translation mène directement de $P_1$ à $P_3$ ?\nb) On pose une rangée de $4$ panneaux, puis, avec $u$, une seconde rangée juste au-dessus. Donner les coordonnées de $A'$, le coin du dernier panneau, en haut à droite, qui correspond à $A$, et la translation qui va de $A$ à $A'$.\nc) Quelle surface de toit les $8$ panneaux couvrent-ils ?\nd) Pour le dernier panneau, on doit le tourner d'un quart de tour. Couvre-t-il toujours la même surface ?",
          figure: trace([-1, 11], [{ pts: [[2, 2], [4, 2], [4, 3], [2, 3]] }], [{ x: 2, y: 2, label: "A" }]),
          correction:
            "a) $t$ puis $t$ : $2$ carreaux à droite, puis encore $2$. En un seul geste, c'est la translation de $4$ carreaux vers la droite.\nb) Le dernier panneau de la première rangée est $P_4$ : trois fois $t$, soit $6$ carreaux à droite. Puis $u$ le monte de $3$ carreaux. Depuis $A(2\\,;\\,2)$ : $A'(8\\,;\\,5)$.\nDe $A$ à $A'$ : la translation de $6$ carreaux à droite et $3$ vers le haut, la flèche orange.\nc) Une translation conserve les aires : chaque panneau couvre $2 \\times 1 = 2$ m². Les $8$ panneaux : $8 \\times 2 = 16$ m².\nd) Oui : une rotation conserve aussi les aires. Tourné, le panneau fait $1$ m sur $2$ m, toujours $2$ m².\n⭐ Entre les deux rangées, $u$ laisse une bande de $3 - 1 = 2$ m : de quoi passer pour l'entretien.\n⛔ Le piège au b) : compter $4$ glissements pour $4$ panneaux. Le premier est déjà posé : il en faut $3$ pour atteindre le quatrième.\nRéponse : la translation de $4$ carreaux vers la droite ; $A'(8\\,;\\,5)$, par la translation de $6$ carreaux à droite et $3$ en haut ; $16$ m² ; oui, $2$ m².",
          schema: trace(
            [-1, 11],
            [
              { pts: [[2, 2], [4, 2], [4, 3], [2, 3]] },
              { pts: [[4, 2], [6, 2], [6, 3], [4, 3]], couleur: VERT },
              { pts: [[6, 2], [8, 2], [8, 3], [6, 3]], couleur: VERT },
              { pts: [[8, 2], [10, 2], [10, 3], [8, 3]], couleur: VERT },
              { pts: [[2, 5], [4, 5], [4, 6], [2, 6]], couleur: VERT },
              { pts: [[4, 5], [6, 5], [6, 6], [4, 6]], couleur: VERT },
              { pts: [[6, 5], [8, 5], [8, 6], [6, 6]], couleur: VERT },
              { pts: [[8, 5], [10, 5], [10, 6], [8, 6]], couleur: VERT },
              { pts: [[2, 2], [8, 5]], couleur: ORANGE, fleche: true },
            ],
            [{ x: 2, y: 2, label: "A" }, { x: 8, y: 5, label: "A'" }],
          ),
          micros: ["sym_translation", "sym_rotation", "sym_transformation_propriete"],
        },
      ],
    },
  ],
};
