// ─── Fiche d'exercices : les vecteurs du plan (seconde) ──────────────────────
//
// Première feuille du bloc « Géométrie » de seconde (23/09/2026). Alignée sur
// la banque `lib/tutor-v4/questionBank/seconde/maths/vecteurs-plan.bank.ts`
// (notionId vecteurs_plan) et sur la fiche de cours
// `lib/fiches/maths-seconde-vecteurs.tsx`.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni A(1 ; 1) et B(4 ; 5),
// ni le parallélogramme A(1 ; 1) B(4 ; 2) C(5 ; 5) D(2 ; 4), ni AB + CD + BC,
// ni MN − MP).
//
// ⭐ LE FIL : un vecteur est un DÉPLACEMENT, il n'a pas de position. Deux flèches
// éloignées peuvent être le même vecteur (exercice 1), et Chasles n'est que
// « aller de A à B puis de B à C » (exercices 3, 9, 18).
// ⭐ LE PIÈGE DU CHAPITRE, trois fois : AB − AC = CB et non BC (exercice 9), et
// AB = DC, pas CD, pour le parallélogramme (exercices 5 et 13).
// ⭐ SANS REPÈRE : l'exercice 3 du contrôle commun de mars 2025 est entièrement
// « vecteurs sans repérage » — d'où les exercices 3, 9, 10 et 16.
//
// ⭐ LE MONDE : un bac qui traverse une rivière et le courant qui le dérive, une
// randonnée et le drone qui va droit au but, deux chevaux de trait qui tirent un
// tronc (600 N et non 1 000 : les normes ne s'additionnent pas), une rangée de
// vigne plantée au cordeau.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-vecteurs.mjs`.
//
// Micro-compétences : vecteur_definition (1), vecteur_egalite (1, 5, 13),
// vecteur_somme (3, 10, 17, 18, 19), vecteur_chasles_calcul (3, 9, 10, 16, 18),
// vecteur_coordonnees (2, 4, 5, 11, 13, 14, 16, 17, 20), vecteur_norme (2, 8,
// 13, 15, 17, 18, 19), vecteur_produit_reel (4, 6, 8, 14, 15, 16, 19, 20),
// vecteur_point_defini (6, 10, 14, 20), vecteur_colinearite (7, 11, 12, 15,
// 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, vecteurs } from "@/lib/fiches-exercices/figures";

const VERT = "#059669";

export const exercicesVecteursSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "vecteurs-plan",
  titre: "Les vecteurs du plan",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître deux vecteurs égaux, calculer des coordonnées et une norme, simplifier avec Chasles sans repère, placer un point, prouver un parallélogramme ou un alignement. Un bac dérivé par le courant, une randonnée et le drone qui va droit au but, deux chevaux qui tirent un tronc, une rangée de vigne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/vecteurs-plan", titre: "Les vecteurs du plan" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : comparer, calculer, simplifier, placer.",
      rappel: [
        "Un vecteur est un DÉPLACEMENT : une direction, un sens, une longueur (sa norme). Il n'a pas de position.",
        "Si $A(x_A\\,;\\,y_A)$ et $B(x_B\\,;\\,y_B)$, alors $\\vec{AB}\\,(x_B - x_A\\,;\\,y_B - y_A)$ : l'arrivée MOINS le départ.",
        "La norme de $\\vec{u}\\,(x\\,;\\,y)$ : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
        "Chasles : $\\vec{AB} + \\vec{BC} = \\vec{AC}$. La lettre du milieu disparaît.",
      ],
      exercices: [
        {
          enonce: "Sur le quadrillage, on a tracé les vecteurs $\\vec{AB}$, $\\vec{CD}$, $\\vec{EF}$ et $\\vec{GH}$.\na) Lequel est égal à $\\vec{AB}$ ?\nb) Lequel est l'opposé de $\\vec{AB}$ ?\nc) Comparer $\\vec{GH}$ et $\\vec{AB}$.",
          figure: vecteurs(
            [-5, 4],
            [
              { de: [-4, 2], vers: [-2, 3] },
              { de: [1, 1], vers: [3, 2] },
              { de: [-2, -2], vers: [-4, -3] },
              { de: [-2, -4], vers: [2, -2] },
            ],
            [{ x: -4, y: 2, label: "A" }, { x: -2, y: 3, label: "B" }, { x: 1, y: 1, label: "C" }, { x: 3, y: 2, label: "D" }, { x: -2, y: -2, label: "E" }, { x: -4, y: -3, label: "F" }, { x: -2, y: -4, label: "G" }, { x: 2, y: -2, label: "H" }],
          ),
          correction:
            "On compte les carreaux de chaque déplacement, de l'origine vers l'extrémité.\n$\\vec{AB}$ : $2$ vers la droite, $1$ vers le haut, soit $(2\\,;\\,1)$.\na) $\\vec{CD}$ : $2$ vers la droite, $1$ vers le haut. Même direction, même sens, même longueur : $\\vec{CD} = \\vec{AB}$.\nb) $\\vec{EF}$ : $2$ vers la gauche, $1$ vers le bas, soit $(-2\\,;\\,-1)$. Même direction, même longueur, sens contraire : $\\vec{EF} = -\\vec{AB}$.\nc) $\\vec{GH}$ : $4$ vers la droite, $2$ vers le haut, soit $(4\\,;\\,2)$. Même direction, même sens, mais deux fois plus long : $\\vec{GH} = 2\\vec{AB}$.\n⛔ Le piège au a) : croire que deux flèches à des endroits différents ne peuvent pas être égales. Un vecteur n'a pas de position, seulement un déplacement.",
          // L'égal en orange, l'opposé en vert.
          schema: vecteurs(
            [-5, 4],
            [
              { de: [-4, 2], vers: [-2, 3] },
              { de: [1, 1], vers: [3, 2], couleur: ORANGE },
              { de: [-2, -2], vers: [-4, -3], couleur: VERT },
              { de: [-2, -4], vers: [2, -2] },
            ],
            [{ x: -4, y: 2, label: "A" }, { x: -2, y: 3, label: "B" }, { x: 1, y: 1, label: "C" }, { x: 3, y: 2, label: "D" }, { x: -2, y: -2, label: "E" }, { x: -4, y: -3, label: "F" }, { x: -2, y: -4, label: "G" }, { x: 2, y: -2, label: "H" }],
          ),
          micros: ["vecteur_definition", "vecteur_egalite"],
        },
        {
          enonce: "Soit $A(-1\\,;\\,2)$ et $B(5\\,;\\,-6)$.\na) Calculer les coordonnées de $\\vec{AB}$.\nb) En déduire celles de $\\vec{BA}$.\nc) Calculer la norme $\\|\\vec{AB}\\|$.",
          correction:
            "a) L'arrivée moins le départ : $\\vec{AB}\\,(5 - (-1)\\,;\\,-6 - 2)$, soit $\\vec{AB}\\,(6\\,;\\,-8)$.\nb) $\\vec{BA} = -\\vec{AB}$ : on change les deux signes, $\\vec{BA}\\,(-6\\,;\\,8)$.\nc) $\\|\\vec{AB}\\| = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.\n⛔ Le piège au a) : faire le départ moins l'arrivée, $-1 - 5 = -6$. On obtiendrait $\\vec{BA}$, le vecteur qui va dans l'autre sens.",
          micros: ["vecteur_coordonnees", "vecteur_norme"],
        },
        {
          enonce: "Simplifier, sans repère :\na) $\\vec{RS} + \\vec{ST}$\nb) $\\vec{AK} + \\vec{KB} + \\vec{BL}$\nc) $\\vec{DE} + \\vec{ED}$\nd) $\\vec{UV} + \\vec{WU}$",
          correction:
            "a) La lettre du milieu disparaît : $\\vec{RS} + \\vec{ST} = \\vec{RT}$.\nb) On enchaîne deux fois : $\\vec{AK} + \\vec{KB} = \\vec{AB}$, puis $\\vec{AB} + \\vec{BL} = \\vec{AL}$.\nc) On part de $D$ et on revient en $D$ : $\\vec{DE} + \\vec{ED} = \\vec{DD} = \\vec{0}$.\nd) Tel quel, rien ne s'enchaîne. Mais une somme se réordonne : $\\vec{UV} + \\vec{WU} = \\vec{WU} + \\vec{UV} = \\vec{WV}$.\n⛔ Le piège au d) : écrire $\\vec{UW}$. On lit le chemin : de $W$ à $U$, puis de $U$ à $V$.",
          micros: ["vecteur_somme", "vecteur_chasles_calcul"],
        },
        {
          enonce: "Soit $\\vec{u}\\,(4\\,;\\,-2)$ et $\\vec{v}\\,(-1\\,;\\,5)$. Calculer les coordonnées de :\na) $3\\vec{u}$\nb) $-\\vec{u}$\nc) $\\dfrac{1}{2}\\vec{u}$\nd) $\\vec{u} + \\vec{v}$\ne) $\\vec{u} - \\vec{v}$",
          correction:
            "On multiplie CHAQUE coordonnée par le nombre ; on ajoute coordonnée par coordonnée.\na) $3\\vec{u}\\,(12\\,;\\,-6)$.\nb) $-\\vec{u}\\,(-4\\,;\\,2)$ : même longueur, sens contraire.\nc) $\\dfrac{1}{2}\\vec{u}\\,(2\\,;\\,-1)$ : deux fois plus court.\nd) $\\vec{u} + \\vec{v}\\,(4 + (-1)\\,;\\,-2 + 5)$, soit $(3\\,;\\,3)$.\ne) $\\vec{u} - \\vec{v}\\,(4 - (-1)\\,;\\,-2 - 5)$, soit $(5\\,;\\,-7)$.\n⛔ Le piège au e) : écrire $4 - 1 = 3$. On retire $-1$, ce qui revient à ajouter $1$.",
          micros: ["vecteur_produit_reel", "vecteur_coordonnees"],
        },
        {
          enonce: "Soit $A(1\\,;\\,2)$, $B(4\\,;\\,3)$ et $C(6\\,;\\,6)$. Trouver les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme.",
          correction:
            "$ABCD$ est un parallélogramme si et seulement si $\\vec{AB} = \\vec{DC}$.\n$\\vec{AB}\\,(4 - 1\\,;\\,3 - 2)$, soit $(3\\,;\\,1)$. Et $\\vec{DC}\\,(6 - x_D\\,;\\,6 - y_D)$.\nOn égale les coordonnées : $6 - x_D = 3$, donc $x_D = 3$ ; $6 - y_D = 1$, donc $y_D = 5$. Ainsi $D(3\\,;\\,5)$.\n⭐ On vérifie avec les deux autres côtés : $\\vec{AD}\\,(2\\,;\\,3)$ et $\\vec{BC}\\,(2\\,;\\,3)$. ✓\n⛔ Le piège : écrire $\\vec{AB} = \\vec{CD}$. On trouverait $D(9\\,;\\,7)$, et c'est $ABDC$ qui serait un parallélogramme, pas $ABCD$.",
          schema: vecteurs(
            [-1, 7],
            [
              { de: [1, 2], vers: [4, 3] },
              { de: [3, 5], vers: [6, 6], couleur: ORANGE },
            ],
            [{ x: 1, y: 2, label: "A" }, { x: 4, y: 3, label: "B" }, { x: 6, y: 6, label: "C" }, { x: 3, y: 5, label: "D" }],
          ),
          micros: ["vecteur_egalite", "vecteur_coordonnees"],
        },
        {
          enonce: "Sur le quadrillage, on a placé $A$ et $B$.\na) Placer le point $M$ tel que $\\vec{AM} = 2\\vec{AB}$.\nb) Placer le point $N$ tel que $\\vec{AN} = -\\vec{AB}$.\nc) Placer le point $P$ tel que $\\vec{BP} = \\vec{AB}$. Que remarque-t-on ?",
          figure: vecteurs([-1, 8], [{ de: [3, 2], vers: [5, 3] }], [{ x: 3, y: 2, label: "A" }, { x: 5, y: 3, label: "B" }]),
          correction:
            "$\\vec{AB}$ : $2$ carreaux vers la droite, $1$ vers le haut.\na) $2\\vec{AB}$ : $4$ vers la droite, $2$ vers le haut. On part de $A$ : $M$ est en $(7\\,;\\,4)$.\nb) $-\\vec{AB}$ : $2$ vers la gauche, $1$ vers le bas. On part de $A$ : $N$ est en $(1\\,;\\,1)$.\nc) On part de $B$ et on refait le déplacement $\\vec{AB}$ : on arrive en $(7\\,;\\,4)$. C'est le point $M$ : $P = M$.\n⭐ C'est normal : $\\vec{AM} = 2\\vec{AB}$ veut dire que $B$ est le MILIEU de $[AM]$. Et $A$ est le milieu de $[NB]$.\n⛔ Le piège au c) : partir de $A$. Le vecteur $\\vec{BP}$ part de $B$.",
          schema: vecteurs(
            [-1, 8],
            [
              { de: [3, 2], vers: [5, 3] },
              { de: [5, 3], vers: [7, 4], couleur: ORANGE },
              { de: [3, 2], vers: [1, 1], couleur: VERT },
            ],
            [{ x: 3, y: 2, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 7, y: 4, label: "M" }, { x: 1, y: 1, label: "N" }],
          ),
          micros: ["vecteur_point_defini", "vecteur_produit_reel"],
        },
        {
          enonce: "Soit $\\vec{u}\\,(2\\,;\\,-3)$, $\\vec{v}\\,(-6\\,;\\,9)$ et $\\vec{w}\\,(4\\,;\\,-5)$.\na) Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils colinéaires ?\nb) Et $\\vec{u}$ et $\\vec{w}$ ?",
          correction:
            "Deux vecteurs $(x\\,;\\,y)$ et $(x'\\,;\\,y')$ sont colinéaires si et seulement si leur déterminant $xy' - yx'$ est nul.\na) $2 \\times 9 - (-3) \\times (-6) = 18 - 18 = 0$ : $\\vec{u}$ et $\\vec{v}$ sont colinéaires. D'ailleurs $\\vec{v} = -3\\vec{u}$.\nb) $2 \\times (-5) - (-3) \\times 4 = -10 + 12 = 2$ : le déterminant n'est pas nul, $\\vec{u}$ et $\\vec{w}$ ne sont PAS colinéaires.\n⛔ Le piège au a) : $(-3) \\times (-6)$ vaut $+18$. Deux signes moins, un produit positif.",
          micros: ["vecteur_colinearite"],
        },
        {
          enonce: "Soit $\\vec{u}\\,(-5\\,;\\,12)$.\na) Calculer $\\|\\vec{u}\\|$.\nb) Calculer les coordonnées de $3\\vec{u}$, puis sa norme.\nc) Sans calcul, quelle est la norme de $-2\\vec{u}$ ?",
          correction:
            "a) $\\|\\vec{u}\\| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.\nb) $3\\vec{u}\\,(-15\\,;\\,36)$, et $\\|3\\vec{u}\\| = \\sqrt{225 + 1\\,296} = \\sqrt{1\\,521} = 39$. C'est $3 \\times 13$.\nc) Multiplier un vecteur par $-2$ double sa longueur et retourne son sens : $\\|-2\\vec{u}\\| = 2 \\times 13 = 26$.\n⛔ Le piège au a) : écrire $-5^2 = -25$. C'est $(-5)^2 = 25$, un carré est positif.\n⛔ Le piège au c) : répondre $-26$. Une norme est une LONGUEUR, jamais négative.",
          micros: ["vecteur_norme", "vecteur_produit_reel"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : simplifier sans repère, prouver une figure, placer un point.",
      rappel: [
        "Soustraire un vecteur, c'est ajouter son opposé : $-\\vec{AC} = \\vec{CA}$.",
        "Chasles à l'envers : $\\vec{AB} = \\vec{AM} + \\vec{MB}$, pour n'importe quel point $M$.",
        "$ABCD$ est un parallélogramme si et seulement si $\\vec{AB} = \\vec{DC}$.",
        "Colinéaires : déterminant $xy' - yx'$ nul. Trois points $A$, $B$, $C$ sont alignés si $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires.",
      ],
      exercices: [
        {
          enonce: "Simplifier, sans repère :\na) $\\vec{AB} - \\vec{CB}$\nb) $\\vec{MA} - \\vec{MB}$\nc) $\\vec{AB} + \\vec{CD} - \\vec{CB}$\nd) $\\vec{OA} - \\vec{OB} + \\vec{AB}$",
          correction:
            "À chaque fois, on remplace « moins un vecteur » par « plus son opposé », puis on enchaîne.\na) $\\vec{AB} - \\vec{CB} = \\vec{AB} + \\vec{BC} = \\vec{AC}$.\nb) $\\vec{MA} - \\vec{MB} = \\vec{MA} + \\vec{BM} = \\vec{BM} + \\vec{MA} = \\vec{BA}$.\nc) $\\vec{AB} + \\vec{CD} - \\vec{CB} = \\vec{AB} + \\vec{CD} + \\vec{BC} = \\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AD}$.\nd) $\\vec{OA} - \\vec{OB} + \\vec{AB} = \\vec{BO} + \\vec{OA} + \\vec{AB} = \\vec{BA} + \\vec{AB} = \\vec{0}$.\n⛔ Le piège au b) : répondre $\\vec{AB}$. Les deux vecteurs partent du même point $M$ : le résultat va du SECOND vers le PREMIER, de $B$ vers $A$.",
          micros: ["vecteur_chasles_calcul"],
        },
        {
          enonce: "$ABC$ est un triangle. On définit le point $D$ par $\\vec{AD} = \\vec{AB} + \\vec{AC}$.\na) Montrer que $\\vec{BD} = \\vec{AC}$.\nb) En déduire la nature du quadrilatère $ABDC$.\nc) Avec $A(-3\\,;\\,-2)$, $B(1\\,;\\,-1)$ et $C(-2\\,;\\,2)$, calculer les coordonnées de $D$.",
          correction:
            "a) On insère $A$ entre $B$ et $D$ (Chasles à l'envers) : $\\vec{BD} = \\vec{BA} + \\vec{AD} = \\vec{BA} + \\vec{AB} + \\vec{AC}$. Or $\\vec{BA} + \\vec{AB} = \\vec{0}$. Donc $\\vec{BD} = \\vec{AC}$.\nb) $\\vec{AC} = \\vec{BD}$ : les côtés $[AC]$ et $[BD]$ sont parallèles, de même longueur, parcourus dans le même sens. Donc $ACDB$ est un parallélogramme, c'est-à-dire $ABDC$ lu dans l'autre sens.\nc) $\\vec{AB}\\,(4\\,;\\,1)$ et $\\vec{AC}\\,(1\\,;\\,4)$, donc $\\vec{AD}\\,(5\\,;\\,5)$. On part de $A$ : $D(-3 + 5\\,;\\,-2 + 5)$, soit $D(2\\,;\\,3)$.\n⭐ On vérifie le a) : $\\vec{BD}\\,(1\\,;\\,4)$, c'est bien $\\vec{AC}$. ✓\n⛔ Le piège au b) : lire le parallélogramme « $ABCD$ ». Ses sommets sont dans l'ordre $A$, $B$, $D$, $C$ : $D$ est en face de $A$.",
          // AB en bleu, AC en orange, leur somme AD en vert : la diagonale.
          schema: vecteurs(
            [-4, 4],
            [
              { de: [-3, -2], vers: [1, -1] },
              { de: [-3, -2], vers: [-2, 2], couleur: ORANGE },
              { de: [-3, -2], vers: [2, 3], couleur: VERT },
            ],
            [{ x: -3, y: -2, label: "A" }, { x: 1, y: -1, label: "B" }, { x: -2, y: 2, label: "C" }, { x: 2, y: 3, label: "D" }],
          ),
          micros: ["vecteur_somme", "vecteur_chasles_calcul", "vecteur_point_defini"],
        },
        {
          enonce: "Soit $A(-2\\,;\\,1)$, $B(1\\,;\\,3)$, $C(7\\,;\\,7)$ et $D(4\\,;\\,6)$.\na) Les points $A$, $B$ et $C$ sont-ils alignés ?\nb) Et les points $A$, $B$ et $D$ ?",
          correction:
            "a) $\\vec{AB}\\,(3\\,;\\,2)$ et $\\vec{AC}\\,(9\\,;\\,6)$. Déterminant : $3 \\times 6 - 2 \\times 9 = 18 - 18 = 0$. Les vecteurs sont colinéaires, et ils ont le point $A$ en commun : $A$, $B$ et $C$ sont alignés.\nb) $\\vec{AD}\\,(6\\,;\\,5)$. Déterminant : $3 \\times 5 - 2 \\times 6 = 15 - 12 = 3$. Il n'est pas nul : $A$, $B$ et $D$ ne sont PAS alignés.\n⭐ Au a), on voit même que $\\vec{AC} = 3\\vec{AB}$.\n⛔ Le piège au b) : se fier au dessin. $D$ est tout près de la droite $(AB)$, mais « presque aligné » n'est pas aligné.",
          micros: ["vecteur_colinearite", "vecteur_coordonnees"],
        },
        {
          enonce: "Soit $E(1\\,;\\,-2)$, $F(3\\,;\\,2)$, $G(-1\\,;\\,4)$ et $H(2\\,;\\,10)$.\na) Montrer que les droites $(EF)$ et $(GH)$ sont parallèles.\nb) Sont-elles confondues ?",
          correction:
            "a) $\\vec{EF}\\,(2\\,;\\,4)$ et $\\vec{GH}\\,(3\\,;\\,6)$. Déterminant : $2 \\times 6 - 4 \\times 3 = 12 - 12 = 0$. Les vecteurs sont colinéaires : les droites $(EF)$ et $(GH)$ sont parallèles.\nb) On regarde si $G$ est sur $(EF)$ : $\\vec{EG}\\,(-2\\,;\\,6)$, et $2 \\times 6 - 4 \\times (-2) = 12 + 8 = 20$. Pas nul : $G$ n'est pas sur $(EF)$. Les droites sont parallèles et DISTINCTES.\n⛔ Le piège au b) : conclure « confondues » parce que les vecteurs sont colinéaires. Deux droites parallèles peuvent être éloignées : il faut un point commun pour qu'elles soient confondues.",
          micros: ["vecteur_colinearite"],
        },
        {
          enonce: "Soit $A(-3\\,;\\,-2)$, $B(1\\,;\\,1)$, $C(4\\,;\\,-3)$ et $D(0\\,;\\,-6)$.\na) Montrer que $ABCD$ est un parallélogramme.\nb) Calculer $AB$ et $AD$. Que peut-on en déduire ?\nc) Calculer les longueurs des diagonales $AC$ et $BD$. Conclure sur la nature exacte de $ABCD$.",
          correction:
            "a) $\\vec{AB}\\,(4\\,;\\,3)$ et $\\vec{DC}\\,(4 - 0\\,;\\,-3 - (-6))$, soit $(4\\,;\\,3)$. $\\vec{AB} = \\vec{DC}$ : $ABCD$ est un parallélogramme.\nb) $AB = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5$. $\\vec{AD}\\,(3\\,;\\,-4)$ et $AD = \\sqrt{9 + 16} = 5$. Un parallélogramme qui a deux côtés consécutifs égaux est un LOSANGE.\nc) $\\vec{AC}\\,(7\\,;\\,-1)$, $AC = \\sqrt{49 + 1} = \\sqrt{50}$. $\\vec{BD}\\,(-1\\,;\\,-7)$, $BD = \\sqrt{1 + 49} = \\sqrt{50}$. Des diagonales de même longueur font un RECTANGLE.\nUn losange qui est aussi un rectangle : $ABCD$ est un CARRÉ.\n⛔ Le piège au c) : s'arrêter à « losange ». Chaque propriété prouvée s'ajoute aux autres.",
          schema: vecteurs(
            [-7, 5],
            [
              { de: [-3, -2], vers: [1, 1] },
              { de: [0, -6], vers: [4, -3], couleur: ORANGE },
            ],
            [{ x: -3, y: -2, label: "A" }, { x: 1, y: 1, label: "B" }, { x: 4, y: -3, label: "C" }, { x: 0, y: -6, label: "D" }],
          ),
          micros: ["vecteur_egalite", "vecteur_norme", "vecteur_coordonnees"],
        },
        {
          enonce: "Soit $A(2\\,;\\,-1)$ et $B(-1\\,;\\,3)$.\na) Calculer les coordonnées du point $M$ tel que $\\vec{AM} = 3\\vec{AB}$.\nb) Calculer les coordonnées du point $N$ tel que $A$ soit le milieu de $[NB]$.\nc) Calculer la distance $AM$.",
          correction:
            "a) $\\vec{AB}\\,(-3\\,;\\,4)$, donc $3\\vec{AB}\\,(-9\\,;\\,12)$. On part de $A$ : $M(2 - 9\\,;\\,-1 + 12)$, soit $M(-7\\,;\\,11)$.\nb) $A$ milieu de $[NB]$, c'est $\\vec{NA} = \\vec{AB}$ : le même pas de $N$ à $A$ que de $A$ à $B$. Donc $N$ s'obtient en reculant de $\\vec{AB}$ depuis $A$ : $N(2 + 3\\,;\\,-1 - 4)$, soit $N(5\\,;\\,-5)$.\n⭐ Vérification : le milieu de $[NB]$ a pour coordonnées $\\left(\\dfrac{5 + (-1)}{2}\\,;\\,\\dfrac{-5 + 3}{2}\\right)$, soit $(2\\,;\\,-1)$. C'est $A$. ✓\nc) $AB = \\sqrt{9 + 16} = 5$, donc $AM = 3 \\times 5 = 15$.\n⛔ Le piège au a) : ajouter $3\\vec{AB}$ à $B$ au lieu de $A$. L'égalité dit $\\vec{AM}$ : on part de $A$.",
          micros: ["vecteur_point_defini", "vecteur_produit_reel", "vecteur_coordonnees"],
        },
        {
          enonce: "Soit $\\vec{u}\\,(1\\,;\\,2)$ et $\\vec{v}\\,(3\\,;\\,-1)$.\na) Calculer les coordonnées de $\\vec{w} = 2\\vec{u} - 3\\vec{v}$.\nb) Calculer $\\|\\vec{w}\\|$ en valeur exacte.\nc) Trouver le nombre $k$ tel que le vecteur $(k\\,;\\,6)$ soit colinéaire à $\\vec{u}$.",
          correction:
            "a) $2\\vec{u}\\,(2\\,;\\,4)$ et $3\\vec{v}\\,(9\\,;\\,-3)$. Donc $\\vec{w}\\,(2 - 9\\,;\\,4 - (-3))$, soit $\\vec{w}\\,(-7\\,;\\,7)$.\nb) $\\|\\vec{w}\\| = \\sqrt{49 + 49} = \\sqrt{98} = \\sqrt{49 \\times 2} = 7\\sqrt{2}$.\nc) Le déterminant de $\\vec{u}\\,(1\\,;\\,2)$ et $(k\\,;\\,6)$ doit être nul : $1 \\times 6 - 2 \\times k = 0$, soit $6 - 2k = 0$, donc $k = 3$.\n⭐ Vérification : $(3\\,;\\,6) = 3\\vec{u}$. ✓\n⛔ Le piège au a) : $4 - (-3)$ vaut $7$, et non $1$.",
          micros: ["vecteur_produit_reel", "vecteur_norme", "vecteur_colinearite"],
        },
        {
          enonce: "$ABC$ est un triangle et $I$ le milieu de $[BC]$.\na) Montrer que $\\vec{AB} + \\vec{AC} = 2\\vec{AI}$.\nb) Le vérifier avec $A(1\\,;\\,5)$, $B(-2\\,;\\,-1)$ et $C(6\\,;\\,1)$.",
          correction:
            "a) On passe par $I$ dans les deux vecteurs : $\\vec{AB} = \\vec{AI} + \\vec{IB}$ et $\\vec{AC} = \\vec{AI} + \\vec{IC}$.\nDonc $\\vec{AB} + \\vec{AC} = 2\\vec{AI} + \\vec{IB} + \\vec{IC}$.\nOr $I$ est le milieu de $[BC]$ : $\\vec{IC} = -\\vec{IB}$, donc $\\vec{IB} + \\vec{IC} = \\vec{0}$. Il reste $\\vec{AB} + \\vec{AC} = 2\\vec{AI}$.\nb) $I\\left(\\dfrac{-2 + 6}{2}\\,;\\,\\dfrac{-1 + 1}{2}\\right)$, soit $I(2\\,;\\,0)$.\n$\\vec{AB}\\,(-3\\,;\\,-6)$ et $\\vec{AC}\\,(5\\,;\\,-4)$ : leur somme est $(2\\,;\\,-10)$.\n$\\vec{AI}\\,(1\\,;\\,-5)$, donc $2\\vec{AI}\\,(2\\,;\\,-10)$. ✓\n⭐ Le point qui débloque le a) : choisir le point de passage. Chasles à l'envers laisse glisser n'importe quel point, et $I$ est celui dont on sait quelque chose.",
          micros: ["vecteur_chasles_calcul", "vecteur_produit_reel", "vecteur_coordonnees"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on traduit en vecteurs, on calcule, on répond par une phrase avec l'unité.",
      rappel: [
        "Un déplacement, une vitesse, une force se représentent par un vecteur : la direction et le sens disent OÙ, la norme dit COMBIEN.",
        "Deux déplacements successifs s'additionnent : c'est Chasles.",
        "⛔ Les normes ne s'additionnent pas : $\\|\\vec{u} + \\vec{v}\\|$ est en général plus petit que $\\|\\vec{u}\\| + \\|\\vec{v}\\|$.",
      ],
      exercices: [
        {
          titre: "Le bac et le courant",
          enonce: "Un bac traverse une rivière de $1$ km de large, du sud vers le nord. Dans un repère où l'unité est le km/h, son moteur le pousse à la vitesse $\\vec{u}\\,(0\\,;\\,4)$ ; le courant l'entraîne vers l'est à la vitesse $\\vec{v}\\,(3\\,;\\,0)$.\na) Calculer les coordonnées de la vitesse réelle $\\vec{u} + \\vec{v}$, puis sa norme.\nb) La traversée dure un quart d'heure. De combien le bac est-il dérivé vers l'est à l'arrivée ?\nc) Le pilote veut arriver juste en face. Son moteur donne toujours $5$ km/h, mais il peut l'orienter : $\\vec{w}\\,(a\\,;\\,b)$. Quel vecteur $\\vec{w}$ doit-il choisir pour que $\\vec{w} + \\vec{v}$ pointe droit vers le nord ?\nd) Combien de temps dure alors la traversée ?",
          correction:
            "a) $\\vec{u} + \\vec{v}\\,(0 + 3\\,;\\,4 + 0)$, soit $(3\\,;\\,4)$. Sa norme : $\\sqrt{9 + 16} = \\sqrt{25} = 5$ km/h.\nb) En un quart d'heure, le courant pousse de $3 \\times \\dfrac{1}{4} = 0{,}75$ km vers l'est. Le bac arrive à $750$ m en aval du point d'en face.\nc) Pour aller droit au nord, la première coordonnée de $\\vec{w} + \\vec{v}$ doit être nulle : $a + 3 = 0$, donc $a = -3$. Le moteur doit viser un peu vers l'ouest, CONTRE le courant.\nEt $\\|\\vec{w}\\| = 5$ : $(-3)^2 + b^2 = 25$, donc $b^2 = 16$ et $b = 4$ (le bac avance vers le nord). Ainsi $\\vec{w}\\,(-3\\,;\\,4)$.\nd) $\\vec{w} + \\vec{v}\\,(0\\,;\\,4)$ : le bac avance à $4$ km/h vers le nord. Pour $1$ km, il faut $\\dfrac{1}{4}$ h, soit $15$ minutes.\n⭐ Au a), le bac va à $5$ km/h, plus vite que son moteur seul ; il met pourtant autant de temps à traverser. Seule la partie nord de la vitesse le rapproche de l'autre rive.\n⛔ Le piège au c) : viser droit au nord. Le courant dérive le bac quoi qu'il fasse, il faut le compenser.",
          // La vitesse du moteur, puis le courant au bout : leur somme en orange.
          schema: vecteurs(
            [-1, 5],
            [
              { de: [0, 0], vers: [0, 4] },
              { de: [0, 4], vers: [3, 4], couleur: VERT },
              { de: [0, 0], vers: [3, 4], couleur: ORANGE },
            ],
            [{ x: 0, y: 0, label: "O" }],
          ),
          micros: ["vecteur_somme", "vecteur_coordonnees", "vecteur_norme"],
        },
        {
          titre: "La randonnée et le drone",
          enonce: "Une randonneuse part du refuge $R$, à l'origine d'un repère gradué en km (l'axe des abscisses vers l'est). Elle marche en ligne droite selon le déplacement $\\vec{u}\\,(3\\,;\\,1)$, puis $\\vec{v}\\,(-1\\,;\\,4)$, puis $\\vec{w}\\,(2\\,;\\,-2)$. Elle s'arrête au point $P$, blessée à la cheville.\na) Calculer les coordonnées de $\\vec{RP}$.\nb) Un drone part du refuge avec une trousse de secours et vole en ligne droite jusqu'à elle. Quelle distance parcourt-il ?\nc) Il vole à $40$ km/h. Combien de temps met-il ?\nd) Quelle distance la randonneuse a-t-elle marché ? Arrondir à $0{,}1$ km.",
          correction:
            "a) Trois déplacements successifs s'enchaînent, c'est Chasles : $\\vec{RP} = \\vec{u} + \\vec{v} + \\vec{w}$, soit $(3 - 1 + 2\\,;\\,1 + 4 - 2)$, donc $\\vec{RP}\\,(4\\,;\\,3)$.\nb) $RP = \\sqrt{16 + 9} = \\sqrt{25} = 5$ km.\nc) $\\dfrac{5}{40} = 0{,}125$ h, soit $0{,}125 \\times 60 = 7{,}5$ minutes : $7$ min $30$ s.\nd) Elle a marché $\\|\\vec{u}\\| + \\|\\vec{v}\\| + \\|\\vec{w}\\| = \\sqrt{10} + \\sqrt{17} + \\sqrt{8}$, soit environ $3{,}16 + 4{,}12 + 2{,}83 \\approx 10{,}1$ km.\n⭐ Le drone fait $5$ km, elle en a fait $10{,}1$ : additionner les vecteurs donne le raccourci, pas le chemin parcouru.\n⛔ Le piège au d) : calculer la norme de $\\vec{RP}$. Elle a marché trois segments, on additionne leurs trois longueurs.",
          schema: vecteurs(
            [-1, 6],
            [
              { de: [0, 0], vers: [3, 1] },
              { de: [3, 1], vers: [2, 5] },
              { de: [2, 5], vers: [4, 3] },
              { de: [0, 0], vers: [4, 3], couleur: ORANGE },
            ],
            [{ x: 0, y: 0, label: "R" }, { x: 4, y: 3, label: "P" }],
          ),
          micros: ["vecteur_somme", "vecteur_chasles_calcul", "vecteur_norme", "vecteur_coordonnees"],
        },
        {
          titre: "Deux chevaux et un tronc",
          enonce: "En forêt, deux chevaux de trait tirent un tronc par deux cordes. Dans un repère dont l'axe des abscisses suit le chemin, l'unité étant $100$ newtons (N), leurs forces sont $\\vec{F_1}\\,(3\\,;\\,4)$ et $\\vec{F_2}\\,(3\\,;\\,-4)$.\na) Calculer la force de chaque cheval, en newtons.\nb) Calculer les coordonnées de la force totale $\\vec{F_1} + \\vec{F_2}$, puis sa valeur en newtons. Dans quelle direction le tronc est-il tiré ?\nc) Deux chevaux de $500$ N chacun ne tirent donc pas à $1\\,000$ N. Pourquoi ? Que faudrait-il pour atteindre $1\\,000$ N ?\nd) Le tronc avance à vitesse constante : le frottement du sol $\\vec{F}$ compense exactement les deux chevaux, $\\vec{F_1} + \\vec{F_2} + \\vec{F} = \\vec{0}$. Donner les coordonnées de $\\vec{F}$.",
          correction:
            "a) $\\|\\vec{F_1}\\| = \\sqrt{9 + 16} = 5$, soit $500$ N. Et $\\|\\vec{F_2}\\| = \\sqrt{9 + 16} = 5$ aussi : $500$ N.\nb) $\\vec{F_1} + \\vec{F_2}\\,(6\\,;\\,0)$, de norme $6$ : $600$ N, tout droit le long du chemin. Les deux tractions de côté, $4$ et $-4$, s'annulent.\nc) Les normes ne s'additionnent pas : chaque cheval tire un peu de côté, et cette part est perdue. Pour atteindre $1\\,000$ N, il faudrait deux cordes PARALLÈLES au chemin : $(5\\,;\\,0) + (5\\,;\\,0) = (10\\,;\\,0)$.\nd) $\\vec{F} = -(\\vec{F_1} + \\vec{F_2})$, donc $\\vec{F}\\,(-6\\,;\\,0)$ : $600$ N vers l'arrière.\n⭐ C'est pour ça qu'on attelle les chevaux l'un derrière l'autre, ou côte à côte au plus près : l'écart des cordes coûte ici $400$ N.\n⛔ Le piège au b) : répondre $500 + 500 = 1\\,000$ N. On additionne les vecteurs, puis on prend la norme — jamais l'inverse.",
          schema: vecteurs(
            [-5, 7],
            [
              { de: [0, 0], vers: [3, 4] },
              { de: [0, 0], vers: [3, -4] },
              { de: [0, 0], vers: [6, 0], couleur: ORANGE },
            ],
            [{ x: 0, y: 0, label: "O" }],
          ),
          micros: ["vecteur_somme", "vecteur_norme", "vecteur_produit_reel"],
        },
        {
          titre: "La rangée de vigne",
          enonce: "Un vigneron plante une rangée de piquets bien droite. Dans un repère gradué en mètres, les deux premiers sont en $A(1\\,;\\,1)$ et $B(4\\,;\\,3)$.\na) Il veut planter un piquet $C$ sur la même rangée, au bord du chemin, là où l'abscisse vaut $10$. Calculer l'ordonnée de $C$.\nb) Un autre piquet a été planté en $D(13\\,;\\,8)$. Est-il dans l'alignement ?\nc) Il veut un piquet $M$ tel que $\\vec{AM} = \\dfrac{2}{3}\\vec{AC}$. Calculer ses coordonnées. Est-il sur la rangée ?\nd) Quel est l'écart entre deux piquets, de $A$ à $B$ ? Arrondir au cm.",
          correction:
            "a) $\\vec{AB}\\,(3\\,;\\,2)$ et $\\vec{AC}\\,(9\\,;\\,y - 1)$. $C$ est sur la rangée si ces vecteurs sont colinéaires : $3(y - 1) - 2 \\times 9 = 0$, soit $3(y - 1) = 18$, $y - 1 = 6$, donc $y = 7$. Ainsi $C(10\\,;\\,7)$.\nb) $\\vec{AD}\\,(12\\,;\\,7)$ et $3 \\times 7 - 2 \\times 12 = 21 - 24 = -3$. Pas nul : $D$ n'est PAS aligné. Le bon piquet serait en $(13\\,;\\,9)$, car $3 \\times 8 - 2 \\times 12 = 0$.\nc) $\\vec{AC}\\,(9\\,;\\,6)$, donc $\\dfrac{2}{3}\\vec{AC}\\,(6\\,;\\,4)$. On part de $A$ : $M(1 + 6\\,;\\,1 + 4)$, soit $M(7\\,;\\,5)$. $\\vec{AM}$ est colinéaire à $\\vec{AC}$, et part de $A$ : $M$ est sur la rangée.\nd) $AB = \\sqrt{3^2 + 2^2} = \\sqrt{13} \\approx 3{,}61$ m.\n⭐ Et $\\vec{AC} = 3\\vec{AB}$ : $B$ est au tiers de la rangée, $M$ aux deux tiers. Avec un piquet tous les $\\vec{AB}$, $C$ est le quatrième.\n⛔ Le piège au b) : se fier à l'œil. Un mètre d'écart sur treize ne se voit pas sur le terrain, le déterminant le voit.",
          schema: vecteurs(
            [-1, 11],
            [
              { de: [1, 1], vers: [4, 3] },
              { de: [1, 1], vers: [10, 7], couleur: ORANGE },
            ],
            [{ x: 1, y: 1, label: "A" }, { x: 4, y: 3, label: "B" }, { x: 7, y: 5, label: "M" }, { x: 10, y: 7, label: "C" }],
          ),
          micros: ["vecteur_colinearite", "vecteur_coordonnees", "vecteur_point_defini", "vecteur_produit_reel", "vecteur_norme"],
        },
      ],
    },
  ],
};
