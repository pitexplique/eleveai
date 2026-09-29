// ─── Fiche d'exercices : calcul vectoriel et produit scalaire (1re spé) ───────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, une par notion du coach. Alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/produit-scalaire.bank.ts`
// (notionId produit_scalaire, onze micros).
//
// ⭐⭐ LE FIL : LE PRODUIT SCALAIRE NE GARDE D'UN VECTEUR QUE SA PART DANS LA
// DIRECTION DE L'AUTRE. C'est la projection (exercice 1), c'est le cosinus
// (exercice 2), c'est le travail d'une force en physique (9, 20), la force utile
// du vent sur une voile (17). Un produit nul, c'est un angle droit.
//
// ⭐ BO : les deux démonstrations au programme sont ici — Al-Kashi (16) et
// l'ensemble des points M tels que MA·MB = 0 (19, avec MA·MB = MI² − IA²).
//
// ⛔ Rien n'est repris de la feuille des vecteurs de seconde (bac sur la
// rivière, randonneuse, chevaux de trait, vigneron) : ici, les vecteurs se
// MULTIPLIENT.
//
// ⭐ Chaque exercice a son dessin (Frédéric : « n'oublie pas les canvas ») :
// vecteurs sur quadrillage (`vecteurs`), triangles cotés avec leur angle
// (`triangle`), cercles en polyligne dans une fenêtre carrée (`cercle`).
// Quatorze sont imprimés ; les sept autres restent à l'écran (`ecranSeulement`)
// pour tenir le PDF en douze pages.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-premiere-spe-produit-scalaire.mjs`.
//
// Micro-compétences : ps_projection (1, 9, 14, 17), ps_norme_angle (2, 9, 18,
// 20), ps_coordonnees (3, 10, 14, 15, 17, 19, 20), ps_norme (4, 10, 15, 17, 20),
// ps_proprietes (5, 13, 19), ps_orthogonalite (6, 9, 10, 13, 15, 17, 20),
// ps_norme_somme (7, 12, 13, 16), ps_alkashi (8, 11, 16, 18), ps_angle_longueur
// (11, 12, 15, 17, 18), ps_ma_mb (19), ps_methode (11, 14, 18, 20). 11/11.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, droites, triangle, vecteurs, type Fleche } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";
const VIOLET = "#7c3aed";

/** À l'écran seulement : le PDF garde quatorze dessins, ceux qui portent la réponse. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Un CERCLE de centre (cx ; cy) et de rayon r, en 48 segments. `droites()` et
 * `vecteurs()` n'ont pas de cercle, mais leur fenêtre est CARRÉE : il y reste rond.
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

export const exercicesProduitScalairePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "produit-scalaire",
  titre: "Calcul vectoriel et produit scalaire",
  accroche:
    "Vingt exercices, de la projection au problème de contrôle : produit scalaire par projection, par les normes et l'angle, par les coordonnées, orthogonalité, formule d'Al-Kashi. Une luge, des remorqueurs, un panneau solaire, un voilier, un radar et un téléski. Un rappel de cours avant chaque niveau ; chaque correction dessine les vecteurs ou le triangle.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "PROJECTION : si $H$ est le projeté orthogonal de $C$ sur la droite $(AB)$, alors $\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH}$. Cela vaut $AB \\times AH$ si $\\vec{AB}$ et $\\vec{AH}$ ont le même sens, $-AB \\times AH$ sinon.",
        "NORMES ET ANGLE : $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$. COORDONNÉES (repère orthonormé) : $\\vec{u}\\,(x\\,;\\,y) \\cdot \\vec{v}\\,(x'\\,;\\,y') = xx' + yy'$.",
        "$\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ ; $\\vec{u}$ et $\\vec{v}$ sont orthogonaux si et seulement si $\\vec{u} \\cdot \\vec{v} = 0$. Al-Kashi : $BC^2 = AB^2 + AC^2 - 2\\,AB \\times AC \\times \\cos\\widehat{A}$.",
        "On calcule comme en algèbre : $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$, $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$, et $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
      ],
      exercices: [
        {
          enonce: "Dans le triangle $ABC$ ci-dessous, on a tracé la hauteur issue de $C$ ; son pied est le point $H$ de $[AB]$. On donne $AB = 6$, $AH = 4$ et $HB = 2$.\na) Calculer $\\vec{AB} \\cdot \\vec{AC}$.\nb) Calculer $\\vec{BA} \\cdot \\vec{BC}$.",
          figure: triangle({ A: [0, 0], B: [6, 0], C: [4, 3] }, { cotes: { AB: "6" }, hauteur: { depuis: "C", label: "3" } }),
          correction:
            "a) On projette $C$ sur la droite $(AB)$ : son projeté est $H$. Donc $\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH}$.\n$\\vec{AB}$ et $\\vec{AH}$ vont dans le MÊME sens : $\\vec{AB} \\cdot \\vec{AC} = AB \\times AH = 6 \\times 4 = 24$.\nb) Vu depuis $B$, le projeté de $C$ sur $(AB)$ est encore $H$ : $\\vec{BA} \\cdot \\vec{BC} = \\vec{BA} \\cdot \\vec{BH}$.\nMême sens : $\\vec{BA} \\cdot \\vec{BC} = BA \\times BH = 6 \\times 2 = 12$.\n⚠️ On multiplie par la longueur du PROJETÉ, pas par celle du côté. Ici $AC = 5$, et $6 \\times 5 = 30$ est faux.\n⭐ La hauteur $CH = 3$ ne sert à rien : la part de $\\vec{AC}$ perpendiculaire à $\\vec{AB}$ ne compte pas.",
          micros: ["ps_projection"],
        },
        {
          enonce: "Calculer $\\vec{u} \\cdot \\vec{v}$ dans chaque cas ($\\theta$ est l'angle entre $\\vec{u}$ et $\\vec{v}$).\na) $\\|\\vec{u}\\| = 4$, $\\|\\vec{v}\\| = 5$ et $\\theta = \\dfrac{\\pi}{3}$ (dessin : $\\vec{u}$ en bleu, $\\vec{v}$ en orange).\nb) $\\|\\vec{u}\\| = 2$, $\\|\\vec{v}\\| = 3\\sqrt{2}$ et $\\theta = \\dfrac{3\\pi}{4}$.\nc) $\\|\\vec{u}\\| = 7$, $\\|\\vec{v}\\| = 3$ et $\\theta = \\dfrac{\\pi}{2}$.",
          figure: ecranSeulement(vecteurs([-1, 6], [{ de: [0, 0], vers: [4, 0] }, { de: [0, 0], vers: [2.5, 4.33], couleur: ORANGE }])),
          correction:
            "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.\na) $\\vec{u} \\cdot \\vec{v} = 4 \\times 5 \\times \\cos\\dfrac{\\pi}{3} = 20 \\times \\dfrac{1}{2} = 10$.\nb) $\\cos\\dfrac{3\\pi}{4} = -\\dfrac{\\sqrt{2}}{2}$ : l'angle est obtus, le produit sera NÉGATIF.\n$\\vec{u} \\cdot \\vec{v} = 2 \\times 3\\sqrt{2} \\times \\left(-\\dfrac{\\sqrt{2}}{2}\\right) = -\\dfrac{6 \\times 2}{2} = -6$.\nc) $\\cos\\dfrac{\\pi}{2} = 0$, donc $\\vec{u} \\cdot \\vec{v} = 0$ : les vecteurs sont orthogonaux.\n⭐ Le signe se lit sur l'angle : aigu, produit positif ; droit, produit nul ; obtus, produit négatif.",
          micros: ["ps_norme_angle"],
        },
        {
          enonce: "Dans un repère orthonormé, calculer :\na) $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}\\,(3\\,;\\,-2)$ et $\\vec{v}\\,(4\\,;\\,5)$ ;\nb) $\\vec{u} \\cdot \\vec{w}$ avec $\\vec{u}\\,(-1\\,;\\,4)$ et $\\vec{w}\\,(6\\,;\\,-3)$ ;\nc) $\\vec{AB} \\cdot \\vec{AC}$ avec $A(2\\,;\\,1)$, $B(5\\,;\\,3)$ et $C(-1\\,;\\,4)$.",
          correction:
            "On multiplie abscisse par abscisse, ordonnée par ordonnée, et on ajoute : $xx' + yy'$.\na) $\\vec{u} \\cdot \\vec{v} = 3 \\times 4 + (-2) \\times 5 = 12 - 10 = 2$.\nb) $\\vec{u} \\cdot \\vec{w} = (-1) \\times 6 + 4 \\times (-3) = -6 - 12 = -18$.\nc) D'abord les coordonnées des vecteurs : $\\vec{AB}\\,(3\\,;\\,2)$ et $\\vec{AC}\\,(-3\\,;\\,3)$.\n$\\vec{AB} \\cdot \\vec{AC} = 3 \\times (-3) + 2 \\times 3 = -9 + 6 = -3$.\n⚠️ Le résultat est un NOMBRE, pas un vecteur : écrire $(12\\,;\\,-10)$ au a) est une erreur fréquente.\n⛔ La formule $xx' + yy'$ ne vaut que dans un repère ORTHONORMÉ.",
          schema: ecranSeulement(vecteurs([-3, 6], [{ de: [0, 0], vers: [3, -2] }, { de: [0, 0], vers: [4, 5], couleur: ORANGE }])),
          micros: ["ps_coordonnees"],
        },
        {
          enonce: "Dans un repère orthonormé :\na) calculer la norme de $\\vec{u}\\,(-6\\,;\\,8)$ ;\nb) calculer la distance $AB$, avec $A(-2\\,;\\,2)$ et $B(2\\,;\\,-1)$ ;\nc) donner les coordonnées et la norme de $\\vec{w} = \\dfrac{1}{10}\\,\\vec{u}$.",
          correction:
            "La norme vient du produit scalaire d'un vecteur par lui-même : $\\|\\vec{u}\\|^2 = \\vec{u} \\cdot \\vec{u} = x^2 + y^2$.\na) $\\vec{u} \\cdot \\vec{u} = (-6)^2 + 8^2 = 36 + 64 = 100$, donc $\\|\\vec{u}\\| = \\sqrt{100} = 10$.\nb) $\\vec{AB}\\,(4\\,;\\,-3)$, donc $AB = \\sqrt{4^2 + (-3)^2} = \\sqrt{25} = 5$.\nc) $\\vec{w}\\,(-0{,}6\\,;\\,0{,}8)$ et $\\|\\vec{w}\\| = \\sqrt{0{,}36 + 0{,}64} = 1$ : on a divisé la norme par $10$.\n⚠️ $(-6)^2 = 36$ : le carré efface le signe. Écrire $-6^2 = -36$ donnerait une norme impossible.\n⭐ Sur le dessin, c'est Pythagore dans le triangle vert : côtés $4$ et $3$, hypoténuse $5$.",
          schema: ecranSeulement(
            vecteurs(
              [-3, 5],
              [
                { de: [-2, 2], vers: [2, -1] },
                { de: [-2, 2], vers: [2, 2], couleur: VERT, pointe: false },
                { de: [2, 2], vers: [2, -1], couleur: VERT, pointe: false },
              ],
              [{ x: -2, y: 2, label: "A" }, { x: 2, y: -1, label: "B" }],
            ),
          ),
          micros: ["ps_norme"],
        },
        {
          enonce: "On sait que $\\|\\vec{u}\\| = 2$, $\\vec{u} \\cdot \\vec{v} = 3$ et $\\vec{u} \\cdot \\vec{w} = -5$. Calculer :\na) $\\vec{v} \\cdot \\vec{u}$ ;\nb) $\\vec{u} \\cdot (2\\vec{v} - \\vec{w})$ ;\nc) $(3\\vec{u}) \\cdot \\vec{v}$ ;\nd) $\\vec{u} \\cdot (\\vec{u} + \\vec{v})$.",
          correction:
            "Le produit scalaire se manie comme un produit de nombres : on peut échanger, développer, sortir les nombres.\na) Symétrie : $\\vec{v} \\cdot \\vec{u} = \\vec{u} \\cdot \\vec{v} = 3$.\nb) On développe : $\\vec{u} \\cdot (2\\vec{v} - \\vec{w}) = 2\\,\\vec{u} \\cdot \\vec{v} - \\vec{u} \\cdot \\vec{w} = 2 \\times 3 - (-5) = 11$.\nc) Le nombre sort : $(3\\vec{u}) \\cdot \\vec{v} = 3 \\times \\vec{u} \\cdot \\vec{v} = 3 \\times 3 = 9$.\nd) $\\vec{u} \\cdot (\\vec{u} + \\vec{v}) = \\|\\vec{u}\\|^2 + \\vec{u} \\cdot \\vec{v} = 4 + 3 = 7$.\n⚠️ Au b), $-(-5) = +5$ : le signe moins porte sur tout le produit $\\vec{u} \\cdot \\vec{w}$.\n✔️ Le dessin vérifie le b) par un autre chemin. Avec $\\vec{u}\\,(2\\,;\\,0)$, $\\vec{v}\\,(1{,}5\\,;\\,2)$ et $\\vec{w}\\,(-2{,}5\\,;\\,1)$, qui respectent les données, $2\\vec{v} - \\vec{w}$ (en violet) vaut $(5{,}5\\,;\\,3)$, et $\\vec{u} \\cdot (2\\vec{v} - \\vec{w}) = 2 \\times 5{,}5 + 0 \\times 3 = 11$.",
          schema: vecteurs([-3, 7], [
            { de: [0, 0], vers: [2, 0] },
            { de: [0, 0], vers: [1.5, 2], couleur: ORANGE },
            { de: [0, 0], vers: [-2.5, 1], couleur: VERT },
            { de: [0, 0], vers: [5.5, 3], couleur: VIOLET },
            { de: [5.5, 3], vers: [5.5, 0], couleur: VIOLET, pointe: false },
          ]),
          micros: ["ps_proprietes"],
        },
        {
          enonce: "Dans un repère orthonormé :\na) $\\vec{u}\\,(-2\\,;\\,3)$ et $\\vec{v}\\,(6\\,;\\,4)$ sont-ils orthogonaux ?\nb) Même question pour $\\vec{a}\\,(5\\,;\\,2)$ et $\\vec{b}\\,(-2\\,;\\,4)$.\nc) Trouver le réel $m$ tel que $\\vec{p}\\,(m\\,;\\,3)$ et $\\vec{q}\\,(4\\,;\\,-2)$ soient orthogonaux.",
          correction:
            "Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.\na) $\\vec{u} \\cdot \\vec{v} = (-2) \\times 6 + 3 \\times 4 = -12 + 12 = 0$ : oui, ils sont orthogonaux.\nb) $\\vec{a} \\cdot \\vec{b} = 5 \\times (-2) + 2 \\times 4 = -10 + 8 = -2$ : ce n'est pas $0$, ils ne sont pas orthogonaux.\nc) $\\vec{p} \\cdot \\vec{q} = 4m + 3 \\times (-2) = 4m - 6$. On veut $4m - 6 = 0$, donc $m = \\dfrac{3}{2}$.\n⚠️ « Presque nul » ne suffit pas : $-2$ n'est pas $0$, l'angle n'est pas droit (il est un peu obtus).\n⭐ Sur le dessin, l'angle droit du a) se voit sur le quadrillage.",
          schema: ecranSeulement(vecteurs([-3, 7], [{ de: [0, 0], vers: [-2, 3] }, { de: [0, 0], vers: [6, 4], couleur: ORANGE }])),
          micros: ["ps_orthogonalite"],
        },
        {
          enonce: "On donne $\\|\\vec{u}\\| = 4$, $\\|\\vec{v}\\| = 5$ et $\\vec{u} \\cdot \\vec{v} = 12$.\na) Calculer $\\|\\vec{u} + \\vec{v}\\|^2$, puis $\\|\\vec{u} + \\vec{v}\\|$ au centième.\nb) Calculer $\\|\\vec{u} - \\vec{v}\\|$ au centième.\nc) A-t-on $\\|\\vec{u} + \\vec{v}\\| = \\|\\vec{u}\\| + \\|\\vec{v}\\|$ ?",
          correction:
            "On développe comme une identité remarquable.\na) $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2 = 16 + 24 + 25 = 65$, donc $\\|\\vec{u} + \\vec{v}\\| = \\sqrt{65} \\approx 8{,}06$.\nb) $\\|\\vec{u} - \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2 = 16 - 24 + 25 = 17$, donc $\\|\\vec{u} - \\vec{v}\\| = \\sqrt{17} \\approx 4{,}12$.\nc) Non : $\\|\\vec{u}\\| + \\|\\vec{v}\\| = 9$, et $\\sqrt{65} \\approx 8{,}06$. Les normes ne s'ajoutent pas, sauf pour deux vecteurs de même sens.\n⚠️ On n'oublie pas le double produit $2\\,\\vec{u} \\cdot \\vec{v}$, comme dans $(a + b)^2$.\n✔️ Le dessin : avec $\\vec{u}\\,(4\\,;\\,0)$ et $\\vec{v}\\,(3\\,;\\,4)$ (normes $4$ et $5$, produit $12$), la diagonale violette $\\vec{u} + \\vec{v}\\,(7\\,;\\,4)$ mesure bien $\\sqrt{49 + 16} = \\sqrt{65}$, et la flèche verte $\\vec{u} - \\vec{v}\\,(1\\,;\\,-4)$ mesure $\\sqrt{17}$.",
          schema: ecranSeulement(
            vecteurs([-1, 8], [
              { de: [0, 0], vers: [4, 0] },
              { de: [0, 0], vers: [3, 4], couleur: ORANGE },
              { de: [4, 0], vers: [7, 4], couleur: ORANGE, pointe: false },
              { de: [0, 0], vers: [7, 4], couleur: VIOLET },
              { de: [3, 4], vers: [4, 0], couleur: VERT },
            ]),
          ),
          micros: ["ps_norme_somme"],
        },
        {
          enonce: "Dans le triangle $ABC$ ci-dessous, $AB = 5$, $AC = 8$ et $\\widehat{BAC} = 60°$. Calculer $BC$.",
          figure: triangle({ A: [0, 0], B: [5, 0], C: [4, 6.928] }, { cotes: { AB: "5", CA: "8", BC: "?" }, angles: { A: "60°" } }),
          correction:
            "On connaît deux côtés et l'angle qu'ils forment : c'est la situation d'Al-Kashi.\n$BC^2 = AB^2 + AC^2 - 2 \\times AB \\times AC \\times \\cos\\widehat{A}$.\n$BC^2 = 25 + 64 - 2 \\times 5 \\times 8 \\times \\dfrac{1}{2} = 89 - 40 = 49$, donc $BC = 7$.\n⚠️ L'angle utilisé est celui COMPRIS entre les deux côtés connus : ici $\\widehat{A}$, en face du côté cherché.\n⭐ Si l'angle était droit, $\\cos 90° = 0$ et on retrouverait Pythagore : Al-Kashi le généralise.",
          micros: ["ps_alkashi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "En physique, le TRAVAIL d'une force constante $\\vec{F}$ sur un déplacement $\\vec{AB}$ est $W = \\vec{F} \\cdot \\vec{AB}$ (en joules) : seule la part de la force dans le sens du déplacement travaille.",
        "Avec les trois longueurs d'un triangle : $\\vec{AB} \\cdot \\vec{AC} = \\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$. Et pour un angle : $\\cos\\widehat{A} = \\dfrac{\\vec{AB} \\cdot \\vec{AC}}{AB \\times AC}$.",
        "Quatre méthodes : la projection (un angle droit visible), les coordonnées (un repère), les normes et l'angle, les trois longueurs. On choisit celle que les données permettent.",
      ],
      exercices: [
        {
          enonce: "Un enfant tire une luge sur un chemin plat, de $A$ à $B$, avec $AB = 20$ m. La corde fait un angle de $30°$ avec le sol ; la force $\\vec{F}$ exercée vaut $50$ N.\na) Calculer le travail $W = \\vec{F} \\cdot \\vec{AB}$ (valeur exacte, puis arrondie au joule).\nb) Quelle force, tirée à l'horizontale, ferait le même travail ?\nc) Le poids $\\vec{P}$ de la luge est vertical. Quel est son travail ?",
          correction:
            "Le travail est le produit scalaire de la force par le déplacement.\na) On connaît les normes et l'angle : $W = \\|\\vec{F}\\| \\times AB \\times \\cos 30° = 50 \\times 20 \\times \\dfrac{\\sqrt{3}}{2} = 500\\sqrt{3} \\approx 866$ J.\nb) Par projection : seule la part HORIZONTALE de la force (la flèche violette) fait avancer la luge. Elle vaut $50 \\cos 30° = 25\\sqrt{3} \\approx 43{,}3$ N.\n✔️ $25\\sqrt{3} \\times 20 = 500\\sqrt{3}$ : le même travail.\nc) $\\vec{P}$ est perpendiculaire au déplacement : $\\vec{P} \\cdot \\vec{AB} = 0$. Sur un chemin plat, le poids ne travaille pas.\n⚠️ Tirer vers le HAUT ne sert à rien pour avancer : c'est la part horizontale qui compte.\n⭐ Plus la corde est basse, plus $\\cos$ est proche de $1$ : on tire « utile ».",
          schema: vecteurs(
            [-2, 6],
            [
              { de: [0, 0], vers: [5, 0] },
              { de: [0, 0], vers: [3.464, 2], couleur: ORANGE },
              { de: [3.464, 2], vers: [3.464, 0], couleur: VIOLET, pointe: false },
              { de: [0, 0], vers: [3.464, 0], couleur: VIOLET },
              { de: [0, 0], vers: [0, -1.5], couleur: VERT },
            ],
            [{ x: 0, y: 0, label: "A" }, { x: 5, y: 0, label: "B" }],
          ),
          micros: ["ps_norme_angle", "ps_projection", "ps_orthogonalite"],
        },
        {
          enonce: "Un maçon trace au sol la dalle d'un abri de jardin. Sur son plan, dans un repère orthonormé (unité : le mètre), les coins sont $A(1\\,;\\,2)$, $B(5\\,;\\,0)$, $C(7\\,;\\,4)$ et $D(3\\,;\\,6)$.\na) Montrer que les côtés $[AB]$ et $[AD]$ sont perpendiculaires.\nb) Montrer que $ABCD$ est un rectangle.\nc) Est-ce un carré ?\nd) Vérifier que les diagonales sont perpendiculaires.",
          figure: vecteurs(
            [-2, 8],
            [
              { de: [1, 2], vers: [5, 0] },
              { de: [1, 2], vers: [3, 6], couleur: ORANGE },
              { de: [5, 0], vers: [7, 4], pointe: false },
              { de: [3, 6], vers: [7, 4], pointe: false },
            ],
            [{ x: 1, y: 2, label: "A" }, { x: 5, y: 0, label: "B" }, { x: 7, y: 4, label: "C" }, { x: 3, y: 6, label: "D" }],
          ),
          correction:
            "a) $\\vec{AB}\\,(4\\,;\\,-2)$ et $\\vec{AD}\\,(2\\,;\\,4)$.\n$\\vec{AB} \\cdot \\vec{AD} = 4 \\times 2 + (-2) \\times 4 = 8 - 8 = 0$ : les côtés $[AB]$ et $[AD]$ sont perpendiculaires.\nb) $\\vec{DC}\\,(4\\,;\\,-2)$ : $\\vec{DC} = \\vec{AB}$, donc $ABCD$ est un parallélogramme. Avec un angle droit en $A$, c'est un rectangle.\nc) $AB = \\sqrt{16 + 4} = \\sqrt{20}$ et $AD = \\sqrt{4 + 16} = \\sqrt{20}$ : deux côtés consécutifs égaux. Le rectangle est un carré, de côté $2\\sqrt{5} \\approx 4{,}47$ m.\nd) $\\vec{AC}\\,(6\\,;\\,2)$ et $\\vec{BD}\\,(-2\\,;\\,6)$ : $\\vec{AC} \\cdot \\vec{BD} = -12 + 12 = 0$. Les diagonales sont perpendiculaires, comme dans tout carré.\n⚠️ Deux côtés égaux ne font qu'un losange : il faut AUSSI l'angle droit.\n⭐ Sur un chantier, on vérifie l'équerre avec une corde 3-4-5 ; sur le plan, le produit scalaire fait le même travail.",
          micros: ["ps_coordonnees", "ps_orthogonalite", "ps_norme"],
        },
        {
          enonce: "Trois refuges de montagne $A$, $B$ et $C$ sont distants, à vol d'oiseau, de $AB = 3$ km, $AC = 5$ km et $BC = 7$ km.\na) Calculer l'angle $\\widehat{BAC}$ sous lequel on voit les refuges $B$ et $C$ depuis $A$.\nb) Calculer $\\vec{AB} \\cdot \\vec{AC}$ de deux façons différentes.",
          figure: triangle({ A: [0, 0], B: [3, 0], C: [-2.5, 4.33] }, { cotes: { AB: "3 km", CA: "5 km", BC: "7 km" }, angles: { A: "?" } }),
          correction:
            "a) On connaît les trois côtés : Al-Kashi, lue « à l'envers », donne l'angle.\n$BC^2 = AB^2 + AC^2 - 2 \\times AB \\times AC \\times \\cos\\widehat{A}$, soit $49 = 9 + 25 - 30\\cos\\widehat{A}$.\n$30\\cos\\widehat{A} = 34 - 49 = -15$, donc $\\cos\\widehat{A} = -\\dfrac{1}{2}$ et $\\widehat{A} = 120°$.\nb) Normes et angle : $\\vec{AB} \\cdot \\vec{AC} = 3 \\times 5 \\times \\cos 120° = 15 \\times \\left(-\\dfrac{1}{2}\\right) = -7{,}5$.\nLes trois longueurs : $\\vec{AB} \\cdot \\vec{AC} = \\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right) = \\dfrac{1}{2}(9 + 25 - 49) = -7{,}5$.\n⭐ Même résultat par deux chemins : c'est la meilleure vérification.\n⚠️ Un cosinus négatif n'est pas une erreur : l'angle est obtus, et le côté d'en face, $[BC]$, est le plus long.",
          micros: ["ps_alkashi", "ps_angle_longueur", "ps_methode"],
        },
        {
          enonce: "Deux remorqueurs tirent un paquebot avec des forces $\\vec{F_1}$ et $\\vec{F_2}$ de normes $3$ et $2$ (en centaines de kilonewtons). Leur résultante $\\vec{F_1} + \\vec{F_2}$ a pour norme $4$.\na) Calculer $\\vec{F_1} \\cdot \\vec{F_2}$.\nb) En déduire l'angle $\\theta$ entre les deux câbles, au dixième de degré.\nc) Que vaudrait la résultante si les câbles étaient perpendiculaires ?",
          correction:
            "a) On développe : $\\|\\vec{F_1} + \\vec{F_2}\\|^2 = \\|\\vec{F_1}\\|^2 + 2\\,\\vec{F_1} \\cdot \\vec{F_2} + \\|\\vec{F_2}\\|^2$.\n$16 = 9 + 2\\,\\vec{F_1} \\cdot \\vec{F_2} + 4$, donc $2\\,\\vec{F_1} \\cdot \\vec{F_2} = 3$ et $\\vec{F_1} \\cdot \\vec{F_2} = 1{,}5$.\nb) $\\vec{F_1} \\cdot \\vec{F_2} = \\|\\vec{F_1}\\| \\times \\|\\vec{F_2}\\| \\times \\cos\\theta$, donc $\\cos\\theta = \\dfrac{1{,}5}{3 \\times 2} = 0{,}25$.\nÀ la calculatrice : $\\theta \\approx 75{,}5°$.\nc) Câbles perpendiculaires : $\\vec{F_1} \\cdot \\vec{F_2} = 0$, et $\\|\\vec{F_1} + \\vec{F_2}\\|^2 = 9 + 4 = 13$ (c'est Pythagore).\nLa résultante vaudrait $\\sqrt{13} \\approx 3{,}61$, moins que $4$ : plus l'angle entre les câbles est petit, plus la traction est efficace.\nSur le dessin : $\\vec{F_1}$ en bleu, $\\vec{F_2}$ en orange, la résultante en violet, diagonale du parallélogramme.\n⛔ $\\|\\vec{F_1} + \\vec{F_2}\\| = 3 + 2 = 5$ est faux : les normes ne s'ajoutent que si les câbles sont parallèles.",
          schema: ecranSeulement(
            vecteurs([-1, 5], [
              { de: [0, 0], vers: [3, 0] },
              { de: [0, 0], vers: [0.5, 1.936], couleur: ORANGE },
              { de: [3, 0], vers: [3.5, 1.936], couleur: ORANGE, pointe: false },
              { de: [0, 0], vers: [3.5, 1.936], couleur: VIOLET },
            ]),
          ),
          micros: ["ps_norme_somme", "ps_angle_longueur"],
        },
        {
          enonce: "Pour fabriquer un cerf-volant, on veut deux baguettes qui se croisent à angle droit : ce sont les diagonales d'un parallélogramme de toile $ABCD$. On pose $\\vec{u} = \\vec{AB}$ et $\\vec{v} = \\vec{AD}$.\na) Exprimer $\\vec{AC}$ et $\\vec{DB}$ en fonction de $\\vec{u}$ et de $\\vec{v}$.\nb) Montrer que $\\vec{AC} \\cdot \\vec{DB} = AB^2 - AD^2$.\nc) À quelle condition les baguettes sont-elles perpendiculaires ?\nd) Avec $AB = 5$ dm et $AD = 3$ dm, calculer $\\vec{AC} \\cdot \\vec{DB}$. Conclure.",
          correction:
            "a) Chasles : $\\vec{AC} = \\vec{AB} + \\vec{BC} = \\vec{u} + \\vec{v}$ (car $\\vec{BC} = \\vec{AD}$) et $\\vec{DB} = \\vec{DA} + \\vec{AB} = \\vec{u} - \\vec{v}$.\nb) On développe comme en algèbre (bilinéarité) :\n$(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) = \\vec{u} \\cdot \\vec{u} - \\vec{u} \\cdot \\vec{v} + \\vec{v} \\cdot \\vec{u} - \\vec{v} \\cdot \\vec{v}$.\nSymétrie : $\\vec{v} \\cdot \\vec{u} = \\vec{u} \\cdot \\vec{v}$, les deux termes du milieu s'annulent.\nIl reste $\\vec{AC} \\cdot \\vec{DB} = \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2 = AB^2 - AD^2$.\nc) Les baguettes sont perpendiculaires si et seulement si $\\vec{AC} \\cdot \\vec{DB} = 0$, c'est-à-dire $AB^2 = AD^2$, soit $AB = AD$ : le parallélogramme est un LOSANGE.\nd) $\\vec{AC} \\cdot \\vec{DB} = 25 - 9 = 16$ : ce n'est pas $0$, les baguettes ne se croisent pas à angle droit. Il faut deux côtés consécutifs égaux.\n✔️ Sur le dessin : $\\vec{AC}\\,(6{,}8\\,;\\,2{,}4)$ et $\\vec{DB}\\,(3{,}2\\,;\\,-2{,}4)$, et $6{,}8 \\times 3{,}2 - 2{,}4 \\times 2{,}4 = 21{,}76 - 5{,}76 = 16$.\n⭐ C'est l'identité $(a + b)(a - b) = a^2 - b^2$, version vecteurs.",
          schema: vecteurs(
            [-2, 8],
            [
              { de: [0, 0], vers: [5, 0] },
              { de: [0, 0], vers: [1.8, 2.4], couleur: ORANGE },
              { de: [5, 0], vers: [6.8, 2.4], pointe: false },
              { de: [1.8, 2.4], vers: [6.8, 2.4], pointe: false },
              { de: [0, 0], vers: [6.8, 2.4], couleur: VIOLET },
              { de: [1.8, 2.4], vers: [5, 0], couleur: VERT },
            ],
            [{ x: 0, y: 0, label: "A" }, { x: 5, y: 0, label: "B" }, { x: 6.8, y: 2.4, label: "C" }, { x: 1.8, y: 2.4, label: "D" }],
          ),
          micros: ["ps_proprietes", "ps_norme_somme", "ps_orthogonalite"],
        },
        {
          enonce: "Un carreau de faïence est un carré $ABCD$ de côté $4$ dm ; $I$ est le milieu de $[BC]$. Le motif suit les segments $[AI]$ et $[BD]$.\na) Calculer $\\vec{AB} \\cdot \\vec{AI}$ par projection.\nb) Retrouver ce résultat avec les coordonnées, dans le repère d'origine $A$ où $B(4\\,;\\,0)$ et $D(0\\,;\\,4)$.\nc) Calculer $\\vec{AI} \\cdot \\vec{BD}$. Quelle méthode choisir ?\nd) Donner $\\vec{AC} \\cdot \\vec{BD}$ sans calcul.",
          correction:
            "a) Le côté $[BC]$ est perpendiculaire à $(AB)$ : le projeté de $I$ sur la droite $(AB)$ est $B$.\nDonc $\\vec{AB} \\cdot \\vec{AI} = \\vec{AB} \\cdot \\vec{AB} = AB^2 = 16$.\nb) $\\vec{AB}\\,(4\\,;\\,0)$ et $\\vec{AI}\\,(4\\,;\\,2)$ : $\\vec{AB} \\cdot \\vec{AI} = 16 + 0 = 16$. Le même résultat.\nc) Ici, pas de projection simple : on prend les coordonnées. $\\vec{BD}\\,(-4\\,;\\,4)$, donc $\\vec{AI} \\cdot \\vec{BD} = 4 \\times (-4) + 2 \\times 4 = -16 + 8 = -8$.\nd) Les diagonales d'un carré sont perpendiculaires : $\\vec{AC} \\cdot \\vec{BD} = 0$.\n⭐ Pour choisir : un angle droit visible, la projection ; un repère naturel, les coordonnées ; deux normes et un angle, le cosinus ; trois longueurs, la formule d'Al-Kashi.\n⚠️ Au c), le résultat est négatif : $\\vec{AI}$ (orange) et $\\vec{BD}$ (vert) font un angle obtus.",
          schema: vecteurs(
            [-1, 5],
            [
              { de: [0, 0], vers: [4, 0] },
              { de: [4, 0], vers: [4, 4], pointe: false },
              { de: [4, 4], vers: [0, 4], pointe: false },
              { de: [0, 4], vers: [0, 0], pointe: false },
              { de: [0, 0], vers: [4, 2], couleur: ORANGE },
              { de: [4, 0], vers: [0, 4], couleur: VERT },
            ],
            [{ x: 0, y: 0, label: "A" }, { x: 4, y: 0, label: "B" }, { x: 4, y: 4, label: "C" }, { x: 0, y: 4, label: "D" }, { x: 4, y: 2, label: "I" }],
          ),
          micros: ["ps_methode", "ps_projection", "ps_coordonnees"],
        },
        {
          enonce: "On représente en coupe un panneau solaire par le segment $[AB]$, avec $A(0\\,;\\,0)$ et $B(4\\,;\\,3)$ (repère orthonormé, unité : le mètre). À midi, le vecteur $\\vec{s}\\,(-1\\,;\\,2)$ pointe vers le Soleil. On modélise la puissance reçue par $P = 400 \\cos\\theta$ (en watts), où $\\theta$ est l'angle entre $\\vec{s}$ et un vecteur normal au panneau.\na) Montrer que $\\vec{n}\\,(-3\\,;\\,4)$ est orthogonal au panneau.\nb) Calculer $\\cos\\theta$ (angle entre $\\vec{n}$ et $\\vec{s}$), puis $\\theta$ au dixième de degré.\nc) Quelle puissance reçoit le panneau ?\nd) Posé à plat, le panneau aurait pour vecteur normal $\\vec{j}\\,(0\\,;\\,1)$. Quelle puissance recevrait-il ? Conclure.",
          correction:
            "a) $\\vec{AB}\\,(4\\,;\\,3)$ et $\\vec{n} \\cdot \\vec{AB} = -3 \\times 4 + 4 \\times 3 = 0$ : $\\vec{n}$ est orthogonal au panneau (en vert sur le dessin ; $\\vec{s}$ est en orange).\nb) $\\vec{n} \\cdot \\vec{s} = (-3) \\times (-1) + 4 \\times 2 = 11$, $\\|\\vec{n}\\| = \\sqrt{9 + 16} = 5$ et $\\|\\vec{s}\\| = \\sqrt{1 + 4} = \\sqrt{5}$.\n$\\cos\\theta = \\dfrac{11}{5\\sqrt{5}} \\approx 0{,}984$, donc $\\theta \\approx 10{,}3°$.\nc) $P = 400 \\times \\dfrac{11}{5\\sqrt{5}} \\approx 394$ W.\nd) $\\vec{j} \\cdot \\vec{s} = 2$ et $\\|\\vec{j}\\| = 1$ : $\\cos\\theta' = \\dfrac{2}{\\sqrt{5}} \\approx 0{,}894$, soit $\\theta' \\approx 26{,}6°$.\n$P' = 400 \\times \\dfrac{2}{\\sqrt{5}} \\approx 358$ W. À cette heure-là, incliner le panneau fait gagner environ $36$ W.\n⭐ Le panneau capte le mieux quand le Soleil est dans la direction de sa NORMALE : alors $\\cos\\theta = 1$.\n⚠️ L'angle utile est celui avec la normale $\\vec{n}$, pas avec le panneau : avec $\\vec{AB}$, on trouverait $\\cos = \\dfrac{2}{5\\sqrt{5}}$, presque $0$.",
          schema: vecteurs([-3, 6], [
            { de: [0, 0], vers: [4, 3], pointe: false },
            { de: [2, 1.5], vers: [-0.4, 4.7], couleur: VERT },
            { de: [2, 1.5], vers: [0.5, 4.5], couleur: ORANGE },
          ]),
          micros: ["ps_orthogonalite", "ps_angle_longueur", "ps_norme", "ps_coordonnees"],
        },
        {
          enonce: "Démonstration (au programme). Dans un triangle $ABC$ :\na) En écrivant $\\vec{BC} = \\vec{AC} - \\vec{AB}$, montrer que $BC^2 = AB^2 + AC^2 - 2\\,\\vec{AB} \\cdot \\vec{AC}$.\nb) En déduire la formule d'Al-Kashi.\nc) Dans une charpente, deux poutres de $6$ m et de $4$ m partent d'un même point $A$ en formant un angle de $120°$. Quelle longueur doit avoir la poutre qui relie leurs extrémités ?",
          figure: triangle({ A: [0, 0], B: [6, 0], C: [-2, 3.464] }, { cotes: { AB: "6 m", CA: "4 m", BC: "?" }, angles: { A: "120°" } }),
          correction:
            "a) Chasles : $\\vec{BC} = \\vec{BA} + \\vec{AC} = \\vec{AC} - \\vec{AB}$.\n$BC^2 = \\|\\vec{AC} - \\vec{AB}\\|^2 = AC^2 - 2\\,\\vec{AC} \\cdot \\vec{AB} + AB^2$ : on développe comme $(a - b)^2$.\nb) On remplace le produit scalaire par normes et angle : $\\vec{AB} \\cdot \\vec{AC} = AB \\times AC \\times \\cos\\widehat{A}$.\nD'où $BC^2 = AB^2 + AC^2 - 2\\,AB \\times AC \\times \\cos\\widehat{A}$ : c'est la formule d'Al-Kashi.\nc) $\\cos 120° = -\\dfrac{1}{2}$.\n$BC^2 = 36 + 16 - 2 \\times 6 \\times 4 \\times \\left(-\\dfrac{1}{2}\\right) = 52 + 24 = 76$.\n$BC = \\sqrt{76} = 2\\sqrt{19} \\approx 8{,}72$ m.\n⚠️ Moins par moins : l'angle est obtus, le terme $-2\\,AB \\times AC \\times \\cos\\widehat{A}$ AJOUTE $24$. Avec un angle droit, on aurait eu $\\sqrt{52} \\approx 7{,}21$ m.\n⭐ Toute la preuve tient en une idée : $\\vec{BC} = \\vec{AC} - \\vec{AB}$, puis on élève au carré.",
          micros: ["ps_alkashi", "ps_norme_somme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "Un problème de produit scalaire commence par une question : que connaît-on ? Des coordonnées, des normes et un angle, des longueurs ?",
        "Un produit scalaire nul signale un angle droit ; un cosinus négatif, un angle obtus.",
        "Avec $I$ milieu de $[AB]$ : $\\vec{MA} \\cdot \\vec{MB} = MI^2 - IA^2$. Les points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ forment le cercle de diamètre $[AB]$.",
      ],
      exercices: [
        {
          titre: "La voile et le vent",
          enonce: "Sur un voilier, le vent exerce sur la voile une force $\\vec{F}\\,(3\\,;\\,4)$, dans un repère orthonormé où l'unité vaut $100$ N (l'axe des abscisses pointe vers l'est). On modélise ainsi : seule la part de $\\vec{F}$ dans la direction du cap fait avancer le bateau ; si $\\vec{d}$ indique le cap, elle vaut $\\dfrac{\\vec{F} \\cdot \\vec{d}}{\\|\\vec{d}\\|}$.\na) Calculer l'intensité $\\|\\vec{F}\\|$, en newtons.\nb) Le bateau fait cap à l'est : $\\vec{d} = \\vec{i}\\,(1\\,;\\,0)$. Quelle force le fait avancer ?\nc) Il change de cap : $\\vec{d}\\,(4\\,;\\,3)$. Même question, puis calculer l'angle entre $\\vec{F}$ et le cap.\nd) Donner un cap pour lequel le vent ne fait pas avancer le bateau du tout.\ne) Au cap de la question c), quel est le travail de la force utile sur $2$ km ?",
          correction:
            "a) $\\|\\vec{F}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, soit $500$ N.\nb) $\\vec{F} \\cdot \\vec{i} = 3 \\times 1 + 4 \\times 0 = 3$ et $\\|\\vec{i}\\| = 1$ : la force utile vaut $3$, soit $300$ N. C'est l'abscisse de $\\vec{F}$, sa projection sur l'axe est-ouest.\nc) $\\vec{F} \\cdot \\vec{d} = 3 \\times 4 + 4 \\times 3 = 24$ et $\\|\\vec{d}\\| = \\sqrt{16 + 9} = 5$.\nForce utile : $\\dfrac{24}{5} = 4{,}8$, soit $480$ N. Le nouveau cap est meilleur.\nAngle : $\\cos\\theta = \\dfrac{\\vec{F} \\cdot \\vec{d}}{\\|\\vec{F}\\| \\times \\|\\vec{d}\\|} = \\dfrac{24}{25} = 0{,}96$, donc $\\theta \\approx 16{,}3°$.\nd) Il faut un cap orthogonal à $\\vec{F}$, c'est-à-dire $\\vec{F} \\cdot \\vec{d} = 0$. Par exemple $\\vec{d}\\,(4\\,;\\,-3)$ : $3 \\times 4 + 4 \\times (-3) = 0$.\ne) La force utile, $480$ N, est dans le sens du déplacement de $2000$ m : $W = 480 \\times 2000 = 960\\,000$ J, soit $960$ kJ.\n✔️ Sur le dessin, la flèche violette est la force utile du c) : elle mesure $\\sqrt{3{,}84^2 + 2{,}88^2} = 4{,}8$. Le cap vert, lui, ne reçoit rien.\n⚠️ Un vrai voilier remonte aussi au vent grâce à la forme de sa voile et à sa quille : ce modèle ne garde que la projection.",
          schema: vecteurs([-4, 6], [
            { de: [0, 0], vers: [3, 4], couleur: ORANGE },
            { de: [3, 4], vers: [3.84, 2.88], couleur: VIOLET, pointe: false },
            { de: [0, 0], vers: [3.84, 2.88], couleur: VIOLET },
            { de: [0, 0], vers: [4, -3], couleur: VERT },
          ]),
          micros: ["ps_norme", "ps_coordonnees", "ps_projection", "ps_angle_longueur", "ps_orthogonalite"],
        },
        {
          titre: "Deux avions sur l'écran radar",
          enonce: "Un radar $R$ suit deux avions. À 10 h 00, l'avion $A$ est à $30$ km du radar, l'avion $B$ à $50$ km, et l'angle $\\widehat{ARB}$ mesure $60°$.\na) Calculer la distance $AB$ entre les deux avions, au dixième de km.\nb) Calculer $\\vec{RA} \\cdot \\vec{RB}$.\nc) À 10 h 02, $RA = 40$ km, $RB = 30$ km et $AB = 50$ km. Calculer $\\vec{RA} \\cdot \\vec{RB}$ à partir des trois longueurs, puis l'angle $\\widehat{ARB}$.\nd) Un contrôleur affirme : « À 10 h 02, le radar voit les deux avions dans des directions perpendiculaires. » A-t-il raison ?",
          figure: triangle({ A: [0, 0], B: [30, 0], C: [25, 43.301] }, { noms: { A: "R", B: "A", C: "B" }, cotes: { AB: "30 km", CA: "50 km", BC: "?" }, angles: { A: "60°" } }),
          correction:
            "a) Deux côtés et l'angle compris : Al-Kashi.\n$AB^2 = RA^2 + RB^2 - 2 \\times RA \\times RB \\times \\cos 60° = 900 + 2500 - 2 \\times 30 \\times 50 \\times \\dfrac{1}{2} = 3400 - 1500 = 1900$.\n$AB = \\sqrt{1900} = 10\\sqrt{19} \\approx 43{,}6$ km.\nb) $\\vec{RA} \\cdot \\vec{RB} = RA \\times RB \\times \\cos 60° = 30 \\times 50 \\times \\dfrac{1}{2} = 750$.\nc) Avec les trois longueurs : $\\vec{RA} \\cdot \\vec{RB} = \\dfrac{1}{2}\\left(RA^2 + RB^2 - AB^2\\right) = \\dfrac{1}{2}(1600 + 900 - 2500) = 0$.\nDonc $\\cos\\widehat{ARB} = 0$ et $\\widehat{ARB} = 90°$.\nd) Oui : un produit scalaire nul, c'est un angle droit. On le retrouve par la réciproque de Pythagore : $40^2 + 30^2 = 1600 + 900 = 2500 = 50^2$.\n⭐ Une même formule dans les deux sens : deux côtés et un angle donnent le troisième côté ; trois côtés donnent l'angle.\n⚠️ Le radar mesure des distances et des directions ; la distance ENTRE les avions, elle, se calcule.",
          schema: ecranSeulement(
            triangle({ A: [0, 0], B: [40, 0], C: [0, 30] }, { noms: { A: "R", B: "A", C: "B" }, droit: "A", cotes: { AB: "40 km", CA: "30 km", BC: "50 km" } }),
          ),
          micros: ["ps_alkashi", "ps_norme_angle", "ps_angle_longueur", "ps_methode"],
        },
        {
          titre: "Voir une fresque",
          enonce: "Dans un musée, une fresque occupe un mur du point $A$ au point $B$, avec $AB = 8$ m. Dans un repère orthonormé (unité : le mètre) centré au milieu $I$ de $[AB]$, $A(-4\\,;\\,0)$ et $B(4\\,;\\,0)$.\na) Montrer que, pour tout point $M$, $\\vec{MA} \\cdot \\vec{MB} = MI^2 - 16$. (Écrire $\\vec{MA} = \\vec{MI} + \\vec{IA}$ et $\\vec{MB} = \\vec{MI} - \\vec{IA}$.)\nb) Décrire l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 0$.\nc) Une visiteuse est en $M(3\\,;\\,4)$. Calculer $\\vec{MA} \\cdot \\vec{MB}$ avec les coordonnées, puis vérifier avec a).\nd) Décrire l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 9$.\ne) Où doit se tenir un visiteur pour voir la fresque sous un angle $\\widehat{AMB}$ aigu ?",
          correction:
            "a) $I$ est le milieu de $[AB]$, donc $\\vec{IB} = -\\vec{IA}$ et $\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} - \\vec{IA})$.\nOn développe (bilinéarité) ; les termes croisés s'annulent (symétrie) : $\\vec{MA} \\cdot \\vec{MB} = MI^2 - IA^2 = MI^2 - 16$.\nb) $\\vec{MA} \\cdot \\vec{MB} = 0 \\iff MI^2 = 16 \\iff MI = 4$ : c'est le cercle de centre $I$ et de rayon $4$, le cercle de diamètre $[AB]$ (en orange).\nc) $\\vec{MA}\\,(-7\\,;\\,-4)$ et $\\vec{MB}\\,(1\\,;\\,-4)$ : $\\vec{MA} \\cdot \\vec{MB} = -7 + 16 = 9$.\nAvec a) : $MI^2 = 3^2 + 4^2 = 25$, et $25 - 16 = 9$. ✔️\nd) $\\vec{MA} \\cdot \\vec{MB} = 9 \\iff MI^2 = 25 \\iff MI = 5$ : le cercle de centre $I$ et de rayon $5$ (en vert). La visiteuse est dessus.\ne) L'angle $\\widehat{AMB}$ est aigu quand $\\cos\\widehat{AMB} > 0$, c'est-à-dire $\\vec{MA} \\cdot \\vec{MB} > 0$, soit $MI > 4$.\nIl faut se tenir à plus de $4$ m du milieu de la fresque : hors du cercle orange.\n⚠️ Sur le cercle orange, l'angle est DROIT ; à l'intérieur, il est obtus.\n⭐ Faire apparaître le milieu $I$ remplace un produit de deux vecteurs qui bougent par une seule distance, $MI$.",
          schema: droites(
            [-6, 6],
            [],
            [{ x: -4, y: 0, label: "A" }, { x: 4, y: 0, label: "B" }, { x: 0, y: 0, label: "I" }, { x: 3, y: 4, label: "M" }],
            [
              ...cercle(0, 0, 4),
              ...cercle(0, 0, 5, VERT),
              { de: [3, 4], vers: [-4, 0], couleur: VIOLET, pointe: false },
              { de: [3, 4], vers: [4, 0], couleur: VIOLET, pointe: false },
            ],
          ),
          micros: ["ps_ma_mb", "ps_proprietes", "ps_coordonnees"],
        },
        {
          titre: "Le téléski",
          enonce: "Un téléski tire un skieur de $A$ à $B$ sur une piste droite. Dans un repère orthonormé (axe des abscisses horizontal, axe des ordonnées vertical, unité : le mètre), $A(0\\,;\\,0)$ et $B(360\\,;\\,150)$. Le travail d'une force constante $\\vec{F}$ sur ce trajet est $W = \\vec{F} \\cdot \\vec{AB}$ (en joules).\na) Calculer la longueur $AB$ de la montée et l'angle $\\alpha$ de la piste avec l'horizontale.\nb) Le poids est $\\vec{P}\\,(0\\,;\\,-700)$, en newtons. Calculer son travail.\nc) La traction de la perche est $\\vec{T}\\,(300\\,;\\,200)$. Calculer son travail, puis l'angle entre la perche et la piste.\nd) Le frottement de la neige est une force de $50$ N, dans le sens opposé au déplacement. Calculer son travail.\ne) La réaction de la neige est perpendiculaire à la piste. Quel est son travail ? Donner un vecteur qui a sa direction.\nf) Faire le total des travaux. Que peut-on en conclure ?",
          correction:
            "a) $\\vec{AB}\\,(360\\,;\\,150)$ : $AB = \\sqrt{129\\,600 + 22\\,500} = \\sqrt{152\\,100} = 390$ m.\nAvec $\\vec{i}\\,(1\\,;\\,0)$ horizontal : $\\cos\\alpha = \\dfrac{\\vec{AB} \\cdot \\vec{i}}{AB} = \\dfrac{360}{390} = \\dfrac{12}{13}$, donc $\\alpha \\approx 22{,}6°$.\nb) Coordonnées : $W_P = 0 \\times 360 + (-700) \\times 150 = -105\\,000$ J. Négatif : le poids freine la montée.\nc) Coordonnées : $W_T = 300 \\times 360 + 200 \\times 150 = 108\\,000 + 30\\,000 = 138\\,000$ J.\n$\\|\\vec{T}\\| = \\sqrt{90\\,000 + 40\\,000} = \\sqrt{130\\,000} \\approx 360{,}6$ N, donc $\\cos\\beta = \\dfrac{138\\,000}{\\sqrt{130\\,000} \\times 390} \\approx 0{,}981$ et $\\beta \\approx 11{,}1°$.\nd) Normes et angle : la force et le déplacement font un angle de $180°$. $W_f = 50 \\times 390 \\times \\cos 180° = -19\\,500$ J.\ne) Force perpendiculaire au déplacement : $W_R = 0$ J, sans calcul.\nUn vecteur orthogonal à $\\vec{AB}$ : $(-150\\,;\\,360)$, car $360 \\times (-150) + 150 \\times 360 = 0$ ; plus simple, $(-5\\,;\\,12)$.\nf) Total : $138\\,000 - 105\\,000 - 19\\,500 + 0 = 13\\,500$ J.\nLe total est positif : en physique, cela veut dire que le skieur arrive en $B$ plus vite qu'il n'est parti de $A$.\nSur le dessin, les forces sont à une autre échelle que la piste : $\\vec{T}$ en orange, $\\vec{P}$ en violet, la direction de la réaction en vert.\n⭐ Une méthode par force : des coordonnées, la formule $xx' + yy'$ ; une norme et un angle, le cosinus ; un angle droit, zéro.\n⚠️ Pour le poids, $700 \\times 390$ serait faux : seule compte la montée de $150$ m, la part verticale du déplacement.",
          schema: vecteurs(
            [-3, 5],
            [
              { de: [0, 0], vers: [3.6, 1.5], pointe: false },
              { de: [1.8, 0.75], vers: [3.3, 1.75], couleur: ORANGE },
              { de: [1.8, 0.75], vers: [1.8, -2.75], couleur: VIOLET },
              { de: [1.8, 0.75], vers: [0.8, 3.15], couleur: VERT },
            ],
            [{ x: 0, y: 0, label: "A" }, { x: 3.6, y: 1.5, label: "B" }],
          ),
          micros: ["ps_methode", "ps_coordonnees", "ps_norme", "ps_norme_angle", "ps_orthogonalite"],
        },
      ],
    },
  ],
};
