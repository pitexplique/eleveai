// ─── Fiche d'exercices : repère et coordonnées (seconde) ─────────────────────
//
// Deuxième feuille du bloc « Géométrie » de seconde (23/09/2026). Alignée sur
// la banque `lib/tutor-v4/questionBank/seconde/maths/repere-coordonnees.bank.ts`
// (notionId repere_coordonnees) et sur la fiche de cours
// `lib/fiches/maths-seconde-repere.tsx`.
// ⛔ Aucun point de la fiche de cours n'est repris (ni A(1 ; 3), ni B(7 ; 7),
// ni C(4 ; 5), ni M(5 ; 7)).
//
// ⭐ LE FIL (celui de la fiche de cours) : deux formules seulement — le milieu
// est la MOYENNE des coordonnées, la distance est PYTHAGORE — et tout le reste
// est du raisonnement : ce que ces calculs PROUVENT (parallélogramme,
// rectangle, losange, carré, triangle rectangle, cercle).
// ⛔ LE PIÈGE DU CHAPITRE : dans ABCD, les diagonales sont [AC] et [BD], celles
// qui sautent une lettre (exercices 9, 12, 15, 20). Et, pour un triangle
// rectangle, l'hypoténuse est le PLUS GRAND côté (exercices 10 et 16).
//
// ⭐ LE MONDE : un plan de ville (à vol d'oiseau ou par les rues), un terrain de
// football aux dimensions réglementaires, trois antennes qui localisent un
// téléphone (le principe du GPS), un pré relevé au GPS.
// Repères : terrain recommandé de 105 m × 68 m et point de penalty à 11 m de la
// ligne de but (Lois du jeu de l'IFAB, loi 1).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-repere.mjs`.
//
// Micro-compétences : repere_coordonnees_point (1, 6, 19), repere_milieu (2, 5,
// 8, 9, 12, 15, 17, 18, 20), repere_distance (3, 4, 7, 8, 10, 13, 14, 16, 17,
// 18, 19, 20), repere_configuration (9 à 16, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, vecteurs } from "@/lib/fiches-exercices/figures";

export const exercicesRepereSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "repere-coordonnees",
  titre: "Repère et coordonnées",
  accroche:
    "Vingt exercices, du geste seul au problème : lire et placer un point, calculer un milieu et une distance, puis s'en servir pour PROUVER — parallélogramme, rectangle, losange, carré, triangle rectangle, points sur un cercle. Un plan de ville, un terrain de football, trois antennes qui retrouvent un téléphone, un pré relevé au GPS. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/repere-coordonnees", titre: "Repère et coordonnées" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lire, placer, calculer un milieu ou une distance.",
      rappel: [
        "Un point s'écrit $A(x\\,;\\,y)$ : l'abscisse d'abord (on avance), l'ordonnée ensuite (on monte).",
        "Le milieu $I$ de $[AB]$ est la MOYENNE des coordonnées : $I\\left(\\dfrac{x_A + x_B}{2}\\,;\\,\\dfrac{y_A + y_B}{2}\\right)$.",
        "Dans un repère orthonormé, la distance est PYTHAGORE : $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.",
      ],
      exercices: [
        {
          enonce: "a) Lire les coordonnées des points $A$, $B$, $C$ et $D$.\nb) Placer le point $E(-4\\,;\\,4)$.",
          figure: vecteurs([-5, 6], [], [{ x: 3, y: 2, label: "A" }, { x: -3, y: 1, label: "B" }, { x: -2, y: -3, label: "C" }, { x: 4, y: -3, label: "D" }]),
          correction:
            "a) On part de l'origine, on AVANCE jusqu'à l'abscisse, puis on MONTE (ou on descend) jusqu'à l'ordonnée.\n$A(3\\,;\\,2)$, $B(-3\\,;\\,1)$, $C(-2\\,;\\,-3)$ et $D(4\\,;\\,-3)$.\nb) Pour $E(-4\\,;\\,4)$ : $4$ carreaux vers la gauche, puis $4$ vers le haut.\n⭐ $C$ et $D$ ont la même ordonnée, $-3$ : ils sont sur une même droite horizontale.\n⛔ Le piège au a) : écrire $B(1\\,;\\,-3)$, en lisant d'abord la hauteur. L'abscisse vient TOUJOURS en premier.",
          schema: vecteurs([-5, 6], [], [{ x: 3, y: 2, label: "A" }, { x: -3, y: 1, label: "B" }, { x: -2, y: -3, label: "C" }, { x: 4, y: -3, label: "D" }, { x: -4, y: 4, label: "E" }]),
          micros: ["repere_coordonnees_point"],
        },
        {
          enonce: "Soit $A(-3\\,;\\,5)$ et $B(7\\,;\\,-1)$. Calculer les coordonnées du milieu $I$ de $[AB]$.",
          correction:
            "On fait la moyenne des abscisses, puis celle des ordonnées.\n$x_I = \\dfrac{-3 + 7}{2} = \\dfrac{4}{2} = 2$ et $y_I = \\dfrac{5 + (-1)}{2} = \\dfrac{4}{2} = 2$.\nDonc $I(2\\,;\\,2)$.\n⛔ Le piège : calculer $\\dfrac{7 - (-3)}{2} = 5$. Le milieu est une MOYENNE : on ajoute, on ne soustrait pas.",
          micros: ["repere_milieu"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(-2\\,;\\,-1)$ et $B(4\\,;\\,7)$. Calculer la distance $AB$.",
          correction:
            "Les écarts : $x_B - x_A = 4 - (-2) = 6$ et $y_B - y_A = 7 - (-1) = 8$.\n$AB = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.\n⭐ Ces deux écarts sont les côtés d'un triangle rectangle dont $[AB]$ est l'hypoténuse : c'est Pythagore.\n⛔ Le piège : écrire $7 - 1 = 6$ pour le second écart. On retire $-1$, ce qui revient à ajouter $1$.",
          micros: ["repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $C(1\\,;\\,-3)$ et $D(-2\\,;\\,3)$. Calculer $CD$, en valeur exacte simplifiée puis arrondie au centième.",
          correction:
            "$x_D - x_C = -2 - 1 = -3$ et $y_D - y_C = 3 - (-3) = 6$.\n$CD = \\sqrt{(-3)^2 + 6^2} = \\sqrt{9 + 36} = \\sqrt{45}$.\nOn simplifie : $\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$, et $3\\sqrt{5} \\approx 6{,}71$.\n⛔ Le piège : écrire $-3^2 = -9$. Un écart négatif se met au carré AVEC son signe : $(-3)^2 = 9$. Une distance n'est jamais négative.",
          micros: ["repere_distance"],
        },
        {
          enonce: "Le point $I(1\\,;\\,-2)$ est le milieu du segment $[AB]$, et $A(-3\\,;\\,4)$. Calculer les coordonnées de $B$.",
          correction:
            "On écrit la formule du milieu, avec les coordonnées de $B$ inconnues.\n$\\dfrac{-3 + x_B}{2} = 1$ donne $-3 + x_B = 2$, donc $x_B = 5$.\n$\\dfrac{4 + y_B}{2} = -2$ donne $4 + y_B = -4$, donc $y_B = -8$.\nAinsi $B(5\\,;\\,-8)$.\n⭐ Autre chemin : de $A$ à $I$, on avance de $4$ et on descend de $6$ ; de $I$ à $B$, on refait le même pas.\n⛔ Le piège : faire la moyenne de $A$ et de $I$. $I$ est le MILIEU, $B$ est de l'autre côté.",
          micros: ["repere_milieu"],
        },
        {
          enonce: "On donne $P(0\\,;\\,5)$, $Q(-3\\,;\\,0)$, $R(4\\,;\\,-2)$ et $S(-1\\,;\\,-6)$.\na) Lequel est sur l'axe des ordonnées ? Lequel est sur l'axe des abscisses ?\nb) Lesquels ont une abscisse positive et une ordonnée négative ?\nc) Donner les coordonnées du symétrique de $R$ par rapport à l'origine, puis par rapport à l'axe des abscisses.",
          correction:
            "a) Sur l'axe des ordonnées, l'abscisse est nulle : c'est $P(0\\,;\\,5)$. Sur l'axe des abscisses, l'ordonnée est nulle : c'est $Q(-3\\,;\\,0)$.\nb) Abscisse positive ET ordonnée négative : seul $R(4\\,;\\,-2)$. ($S$ a une abscisse négative.)\nc) Par rapport à l'origine, on change les DEUX signes : $(-4\\,;\\,2)$. Par rapport à l'axe des abscisses, seule l'ordonnée change : $(4\\,;\\,2)$.\n⛔ Le piège au a) : croire $P$ sur l'axe des abscisses parce que son premier nombre est $0$. L'abscisse nulle place le point sur l'axe VERTICAL.",
          micros: ["repere_coordonnees_point"],
        },
        {
          enonce: "Dans un repère orthonormé d'origine $O$, on considère le cercle de centre $O$ et de rayon $\\sqrt{5}$. Les points $C(2\\,;\\,1)$, $D(-1\\,;\\,-2)$ et $E(2\\,;\\,2)$ sont-ils sur ce cercle ?",
          correction:
            "Un point est sur le cercle si sa distance au centre vaut le rayon.\n$OC = \\sqrt{2^2 + 1^2} = \\sqrt{5}$ : $C$ est sur le cercle.\n$OD = \\sqrt{(-1)^2 + (-2)^2} = \\sqrt{5}$ : $D$ aussi.\n$OE = \\sqrt{2^2 + 2^2} = \\sqrt{8}$ : $\\sqrt{8} \\neq \\sqrt{5}$, $E$ n'est PAS sur le cercle (il est à l'extérieur, car $\\sqrt{8} > \\sqrt{5}$).\n⭐ Depuis l'origine, les écarts sont les coordonnées elles-mêmes.",
          micros: ["repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $E(-4\\,;\\,-1)$, $F(6\\,;\\,5)$ et $M(1\\,;\\,2)$.\na) Montrer que $M$ est le milieu de $[EF]$.\nb) Calculer $ME$ et $MF$. Était-ce prévisible ?",
          correction:
            "a) $\\dfrac{-4 + 6}{2} = 1$ et $\\dfrac{-1 + 5}{2} = 2$ : le milieu de $[EF]$ est $(1\\,;\\,2)$, c'est $M$.\nb) $ME = \\sqrt{(-4 - 1)^2 + (-1 - 2)^2} = \\sqrt{25 + 9} = \\sqrt{34}$ et $MF = \\sqrt{(6 - 1)^2 + (5 - 2)^2} = \\sqrt{25 + 9} = \\sqrt{34}$.\nOui : le milieu est à ÉGALE distance des deux extrémités.\n⛔ Attention à la réciproque : un point à égale distance de $E$ et de $F$ n'est pas forcément leur milieu. Il peut être n'importe où sur la médiatrice de $[EF]$.",
          micros: ["repere_milieu", "repere_distance"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Prouver la nature d'une figure : calculer, comparer, puis conclure par une phrase.",
      rappel: [
        "Parallélogramme : les diagonales ont le MÊME MILIEU. Dans $ABCD$, les diagonales sont $[AC]$ et $[BD]$ : elles sautent une lettre.",
        "Un parallélogramme est un rectangle si ses diagonales ont la même longueur, un losange si deux côtés consécutifs sont égaux, un carré s'il est les deux.",
        "Triangle rectangle : réciproque de Pythagore. On compare le carré du PLUS GRAND côté à la somme des carrés des deux autres.",
      ],
      exercices: [
        {
          enonce: "Soit $A(-2\\,;\\,1)$, $B(3\\,;\\,2)$, $C(5\\,;\\,-2)$ et $D(0\\,;\\,-3)$. Montrer que $ABCD$ est un parallélogramme.",
          correction:
            "On compare les milieux des DIAGONALES, $[AC]$ et $[BD]$.\nMilieu de $[AC]$ : $\\left(\\dfrac{-2 + 5}{2}\\,;\\,\\dfrac{1 + (-2)}{2}\\right)$, soit $(1{,}5\\,;\\,-0{,}5)$.\nMilieu de $[BD]$ : $\\left(\\dfrac{3 + 0}{2}\\,;\\,\\dfrac{2 + (-3)}{2}\\right)$, soit $(1{,}5\\,;\\,-0{,}5)$.\nLes diagonales ont le même milieu : $ABCD$ est un parallélogramme.\n⛔ Le piège : comparer les milieux de $[AB]$ et $[CD]$. Ce sont des CÔTÉS, et deux côtés opposés n'ont jamais le même milieu.",
          schema: vecteurs(
            [-4, 7],
            [
              { de: [-2, 1], vers: [3, 2], pointe: false },
              { de: [3, 2], vers: [5, -2], pointe: false },
              { de: [5, -2], vers: [0, -3], pointe: false },
              { de: [0, -3], vers: [-2, 1], pointe: false },
              { de: [-2, 1], vers: [5, -2], couleur: ORANGE, pointe: false },
              { de: [3, 2], vers: [0, -3], couleur: ORANGE, pointe: false },
            ],
            [{ x: -2, y: 1, label: "A" }, { x: 3, y: 2, label: "B" }, { x: 5, y: -2, label: "C" }, { x: 0, y: -3, label: "D" }],
          ),
          micros: ["repere_configuration", "repere_milieu"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(1\\,;\\,1)$, $B(5\\,;\\,3)$ et $C(3\\,;\\,7)$.\na) Calculer $AB$, $BC$ et $AC$.\nb) Quelle est la nature du triangle $ABC$ ? Justifier.",
          correction:
            "a) $AB = \\sqrt{4^2 + 2^2} = \\sqrt{20}$, $BC = \\sqrt{(-2)^2 + 4^2} = \\sqrt{20}$ et $AC = \\sqrt{2^2 + 6^2} = \\sqrt{40}$.\nb) $AB = BC$ : le triangle est ISOCÈLE en $B$.\nLe plus grand côté est $[AC]$. On compare : $AC^2 = 40$ et $AB^2 + BC^2 = 20 + 20 = 40$. D'après la réciproque de Pythagore, le triangle est RECTANGLE en $B$.\nConclusion : $ABC$ est rectangle isocèle en $B$.\n⭐ Le sommet de l'angle droit est celui qui est en face du plus grand côté.\n⛔ Le piège : s'arrêter à « isocèle ». Une propriété n'en exclut pas une autre.",
          schema: vecteurs(
            [-1, 8],
            [
              { de: [1, 1], vers: [5, 3], pointe: false },
              { de: [5, 3], vers: [3, 7], pointe: false },
              { de: [3, 7], vers: [1, 1], couleur: ORANGE, pointe: false },
            ],
            [{ x: 1, y: 1, label: "A" }, { x: 5, y: 3, label: "B" }, { x: 3, y: 7, label: "C" }],
          ),
          micros: ["repere_configuration", "repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $E(-3\\,;\\,-1)$, $F(1\\,;\\,1)$, $G(0\\,;\\,3)$ et $H(-4\\,;\\,1)$.\na) Montrer que $EFGH$ est un parallélogramme.\nb) Montrer que c'est un rectangle.\nc) Est-ce un carré ?",
          correction:
            "a) Milieu de $[EG]$ : $\\left(\\dfrac{-3 + 0}{2}\\,;\\,\\dfrac{-1 + 3}{2}\\right)$, soit $(-1{,}5\\,;\\,1)$. Milieu de $[FH]$ : $\\left(\\dfrac{1 + (-4)}{2}\\,;\\,\\dfrac{1 + 1}{2}\\right)$, soit $(-1{,}5\\,;\\,1)$. Même milieu : c'est un parallélogramme.\nb) $EG = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ et $FH = \\sqrt{(-5)^2 + 0^2} = 5$. Des diagonales de même longueur : c'est un RECTANGLE.\nc) $EF = \\sqrt{4^2 + 2^2} = \\sqrt{20}$ et $FG = \\sqrt{(-1)^2 + 2^2} = \\sqrt{5}$. Deux côtés consécutifs différents : ce n'est PAS un carré.\n⛔ Le piège au b) : calculer $EF$ et $GH$. Égaux, ils le sont dans tout parallélogramme : cela ne prouve rien de plus.",
          micros: ["repere_configuration", "repere_milieu", "repere_distance"],
        },
        {
          enonce: "Soit $A(-1\\,;\\,3)$, $B(4\\,;\\,4)$ et $C(6\\,;\\,-1)$. Calculer les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme, en utilisant les milieux.",
          correction:
            "$ABCD$ est un parallélogramme si ses diagonales $[AC]$ et $[BD]$ ont le même milieu.\nMilieu de $[AC]$ : $\\left(\\dfrac{-1 + 6}{2}\\,;\\,\\dfrac{3 + (-1)}{2}\\right)$, soit $(2{,}5\\,;\\,1)$.\nCe doit être aussi le milieu de $[BD]$ : $\\dfrac{4 + x_D}{2} = 2{,}5$ donne $x_D = 1$, et $\\dfrac{4 + y_D}{2} = 1$ donne $y_D = -2$.\nAinsi $D(1\\,;\\,-2)$.\n⭐ On vérifie : milieu de $[BD]$, $\\left(\\dfrac{4 + 1}{2}\\,;\\,\\dfrac{4 + (-2)}{2}\\right)$, soit $(2{,}5\\,;\\,1)$. ✓\n⛔ Le piège : prendre $[AB]$ et $[CD]$ comme diagonales. On trouverait un autre point, et c'est $ABDC$ qui serait un parallélogramme.",
          micros: ["repere_configuration", "repere_milieu"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $K(1\\,;\\,1)$, $A(4\\,;\\,5)$, $B(-4\\,;\\,1)$, $C(1\\,;\\,-4)$ et $G(5\\,;\\,-3)$.\na) Montrer que $A$, $B$ et $C$ sont sur un même cercle de centre $K$. Quel est son rayon ?\nb) Le point $G$ est-il sur ce cercle ?",
          correction:
            "a) $KA = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, $KB = \\sqrt{(-5)^2 + 0^2} = 5$ et $KC = \\sqrt{0^2 + (-5)^2} = 5$.\nLes trois points sont à la distance $5$ de $K$ : ils sont sur le cercle de centre $K$ et de rayon $5$.\nb) $KG = \\sqrt{4^2 + (-4)^2} = \\sqrt{32} = 4\\sqrt{2} \\approx 5{,}66$. Ce n'est pas $5$ : $G$ n'est pas sur le cercle, il est à l'extérieur.\n⛔ Le piège au b) : conclure « presque $5$, donc sur le cercle ». Sur la figure, $5{,}66$ et $5$ se ressemblent ; le calcul, lui, tranche.",
          micros: ["repere_configuration", "repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(-2\\,;\\,1)$ et $B(4\\,;\\,3)$. Trouver le point $P$ de l'axe des ordonnées qui est à égale distance de $A$ et de $B$.",
          correction:
            "$P$ est sur l'axe des ordonnées : $P(0\\,;\\,y)$. On cherche $y$ tel que $PA = PB$, soit $PA^2 = PB^2$ (deux distances positives sont égales si leurs carrés le sont).\n$PA^2 = (-2)^2 + (1 - y)^2 = 4 + 1 - 2y + y^2$ et $PB^2 = 4^2 + (3 - y)^2 = 16 + 9 - 6y + y^2$.\nOn égale : $5 - 2y + y^2 = 25 - 6y + y^2$. Les $y^2$ s'en vont : $4y = 20$, donc $y = 5$.\nAinsi $P(0\\,;\\,5)$.\n⭐ Vérification : $PA^2 = 4 + 16 = 20$ et $PB^2 = 16 + 4 = 20$. ✓\n⛔ Le piège : prendre le milieu de $[AB]$, $(1\\,;\\,2)$. Il est bien à égale distance, mais pas sur l'axe des ordonnées.",
          micros: ["repere_configuration", "repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(-2\\,;\\,1)$, $B(1\\,;\\,5)$, $C(4\\,;\\,1)$ et $D(1\\,;\\,-3)$.\na) Montrer que $ABCD$ est un parallélogramme.\nb) Montrer que c'est un losange.\nc) Est-ce un carré ?",
          correction:
            "a) Milieu de $[AC]$ : $\\left(\\dfrac{-2 + 4}{2}\\,;\\,\\dfrac{1 + 1}{2}\\right)$, soit $(1\\,;\\,1)$. Milieu de $[BD]$ : $\\left(\\dfrac{1 + 1}{2}\\,;\\,\\dfrac{5 + (-3)}{2}\\right)$, soit $(1\\,;\\,1)$. C'est un parallélogramme.\nb) $AB = \\sqrt{3^2 + 4^2} = 5$ et $BC = \\sqrt{3^2 + (-4)^2} = 5$. Deux côtés consécutifs égaux : c'est un LOSANGE.\nc) $AC = 6$ et $BD = 8$ : les diagonales n'ont pas la même longueur, ce n'est pas un rectangle, donc pas un carré.\n⭐ Les diagonales d'un losange se coupent à angle droit : ici, $[AC]$ est horizontale et $[BD]$ verticale.",
          schema: vecteurs(
            [-4, 6],
            [
              { de: [-2, 1], vers: [1, 5], pointe: false },
              { de: [1, 5], vers: [4, 1], pointe: false },
              { de: [4, 1], vers: [1, -3], pointe: false },
              { de: [1, -3], vers: [-2, 1], pointe: false },
              { de: [-2, 1], vers: [4, 1], couleur: ORANGE, pointe: false },
              { de: [1, 5], vers: [1, -3], couleur: ORANGE, pointe: false },
            ],
            [{ x: -2, y: 1, label: "A" }, { x: 1, y: 5, label: "B" }, { x: 4, y: 1, label: "C" }, { x: 1, y: -3, label: "D" }],
          ),
          micros: ["repere_configuration", "repere_milieu", "repere_distance"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(1\\,;\\,-2)$, $B(5\\,;\\,1)$ et $C(-1\\,;\\,4)$. Le triangle $ABC$ est-il rectangle ?",
          correction:
            "On calcule les carrés des trois côtés : $AB^2 = 4^2 + 3^2 = 25$, $BC^2 = (-6)^2 + 3^2 = 45$ et $AC^2 = (-2)^2 + 6^2 = 40$.\nLe plus grand côté est $[BC]$. S'il y a un angle droit, il est en face, en $A$.\nOn compare : $BC^2 = 45$ et $AB^2 + AC^2 = 25 + 40 = 65$. $45 \\neq 65$ : le triangle n'est PAS rectangle.\n⭐ Et comme $45 < 65$, l'angle en $A$ est plus petit qu'un droit : le triangle a trois angles aigus.\n⛔ Le piège : tester $AB^2 + BC^2 = 70$ contre $AC^2 = 40$. Ce n'est pas faux, mais c'est inutile : l'hypoténuse est toujours le PLUS GRAND côté.",
          micros: ["repere_configuration", "repere_distance"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on place les points, on calcule, on répond par une phrase avec l'unité.",
      rappel: [
        "On choisit (ou on lit) le repère et l'unité : $1$ carreau $= 100$ m, $1$ unité $= 1$ km…",
        "Le milieu sert à trouver un point « entre les deux » ; la distance, à mesurer « à vol d'oiseau ».",
        "On répond avec l'unité : « $1$ km », pas « $10$ ».",
      ],
      exercices: [
        {
          titre: "Le plan de la ville",
          enonce: "Sur le plan d'une ville quadrillée, l'unité est $100$ m, l'axe des abscisses vers l'est. La boulangerie est en $B(-3\\,;\\,4)$, l'école en $E(5\\,;\\,-2)$.\na) Deux amis veulent se retrouver à mi-chemin, à vol d'oiseau. Où ?\nb) Quelle est la distance à vol d'oiseau entre la boulangerie et l'école, en mètres ?\nc) Dans la ville, on ne marche que le long des rues, vers l'est ou le nord (ou l'inverse). Quelle distance faut-il parcourir ?",
          correction:
            "a) Le milieu de $[BE]$ : $\\left(\\dfrac{-3 + 5}{2}\\,;\\,\\dfrac{4 + (-2)}{2}\\right)$, soit $M(1\\,;\\,1)$ : $100$ m à l'est et $100$ m au nord de l'origine.\nb) $BE = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ unités, soit $10 \\times 100 = 1\\,000$ m : $1$ km.\nc) Par les rues, il faut faire les deux écarts l'un après l'autre : $8$ unités vers l'est et $6$ vers le sud, soit $14$ unités, $1\\,400$ m.\n⭐ Pythagore raccourcit : la diagonale d'un triangle rectangle est plus courte que les deux côtés mis bout à bout. Ici, $400$ m de gagnés… à condition de pouvoir traverser les pâtés de maisons.\n⛔ Le piège au b) : oublier l'unité et répondre « $10$ ». Sur ce plan, $10$ unités font $1$ km.",
          schema: vecteurs(
            [-5, 7],
            [
              { de: [-3, 4], vers: [5, -2], couleur: ORANGE, pointe: false },
              { de: [-3, 4], vers: [5, 4], pointe: false },
              { de: [5, 4], vers: [5, -2], pointe: false },
            ],
            [{ x: -3, y: 4, label: "B" }, { x: 5, y: -2, label: "E" }, { x: 1, y: 1, label: "M" }],
          ),
          micros: ["repere_milieu", "repere_distance"],
        },
        {
          titre: "Le terrain de football",
          enonce: "Un terrain de football aux dimensions recommandées pour les matchs internationaux mesure $105$ m sur $68$ m. On le place dans un repère orthonormé gradué en mètres : ses coins sont $A(0\\,;\\,0)$, $B(105\\,;\\,0)$, $C(105\\,;\\,68)$ et $D(0\\,;\\,68)$.\na) Le point central est le milieu d'une diagonale. Calculer ses coordonnées.\nb) Calculer la longueur de la diagonale $[AC]$, arrondie au décimètre.\nc) Le but de gauche est centré en $G(0\\,;\\,34)$, et le point de penalty est à $11$ m de la ligne de but, face au but. Donner ses coordonnées $P$.\nd) Un joueur tire du point de penalty vers le poteau de corner opposé, en $C$. Quelle distance le ballon parcourt-il, au mètre près ?",
          correction:
            "a) Milieu de $[AC]$ : $\\left(\\dfrac{0 + 105}{2}\\,;\\,\\dfrac{0 + 68}{2}\\right)$, soit $(52{,}5\\,;\\,34)$.\nb) $AC = \\sqrt{105^2 + 68^2} = \\sqrt{11\\,025 + 4\\,624} = \\sqrt{15\\,649} \\approx 125{,}1$ m.\nc) On avance de $11$ m depuis $G$, face au but : $P(11\\,;\\,34)$.\nd) $PC = \\sqrt{(105 - 11)^2 + (68 - 34)^2} = \\sqrt{94^2 + 34^2} = \\sqrt{8\\,836 + 1\\,156} = \\sqrt{9\\,992} \\approx 100$ m.\n⭐ Presque exactement $100$ m : $\\sqrt{9\\,992} \\approx 99{,}96$.\n⛔ Le piège au c) : écrire $P(34\\,;\\,11)$. L'abscisse mesure la longueur du terrain, l'ordonnée sa largeur.",
          micros: ["repere_milieu", "repere_distance"],
        },
        {
          titre: "Trois antennes et un téléphone",
          enonce: "Un téléphone perdu capte trois antennes. Dans un repère orthonormé gradué en km, l'antenne $A$ est à l'origine, l'antenne $B$ en $(6\\,;\\,5)$, l'antenne $C$ en $(1\\,;\\,8)$. Le téléphone est à $5$ km de $A$ et à $\\sqrt{10}$ km de $B$.\na) Trois positions sont proposées : $P_1(3\\,;\\,4)$, $P_2(4\\,;\\,3)$ et $P_3(-3\\,;\\,4)$. Montrer qu'elles sont toutes à $5$ km de $A$.\nb) Laquelle est à $\\sqrt{10}$ km de $B$ ?\nc) L'antenne $C$ mesure une distance de $2\\sqrt{5}$ km. Cela confirme-t-il la position ?",
          correction:
            "a) Depuis l'origine, les écarts sont les coordonnées : $AP_1 = \\sqrt{9 + 16} = 5$, $AP_2 = \\sqrt{16 + 9} = 5$ et $AP_3 = \\sqrt{9 + 16} = 5$. Les trois sont sur le cercle de centre $A$ et de rayon $5$ km.\nb) $BP_1 = \\sqrt{(3 - 6)^2 + (4 - 5)^2} = \\sqrt{9 + 1} = \\sqrt{10}$ ✓. $BP_2 = \\sqrt{4 + 4} = \\sqrt{8}$ et $BP_3 = \\sqrt{81 + 1} = \\sqrt{82}$ : non.\nLe téléphone est en $P_1(3\\,;\\,4)$.\nc) $CP_1 = \\sqrt{(3 - 1)^2 + (4 - 8)^2} = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}$. ✓ La troisième mesure confirme.\n⭐ Deux cercles se coupent en général en DEUX points : deux antennes laissent un doute, la troisième tranche. C'est le principe de la localisation par GPS (qui utilise en plus un quatrième satellite pour régler l'heure).\n⛔ Le piège au a) : croire qu'une seule distance suffit. Tout un cercle de points est à $5$ km de $A$.",
          micros: ["repere_coordonnees_point", "repere_distance", "repere_configuration"],
        },
        {
          titre: "Le pré relevé au GPS",
          enonce: "Un agriculteur relève au GPS les quatre coins d'un pré, dans un repère orthonormé gradué en mètres : $A(2\\,;\\,1)$, $B(32\\,;\\,11)$, $C(26\\,;\\,29)$ et $D(-4\\,;\\,19)$.\na) Montrer que $ABCD$ est un parallélogramme.\nb) Montrer que c'est même un rectangle.\nc) Calculer $AB$ et $BC$, en valeur exacte puis arrondies au centimètre.\nd) Calculer l'aire du pré, en valeur exacte, puis la longueur de clôture nécessaire pour en faire le tour, au décimètre près.",
          correction:
            "a) Milieu de $[AC]$ : $\\left(\\dfrac{2 + 26}{2}\\,;\\,\\dfrac{1 + 29}{2}\\right)$, soit $(14\\,;\\,15)$. Milieu de $[BD]$ : $\\left(\\dfrac{32 + (-4)}{2}\\,;\\,\\dfrac{11 + 19}{2}\\right)$, soit $(14\\,;\\,15)$. Même milieu : c'est un parallélogramme.\nb) $AC = \\sqrt{24^2 + 28^2} = \\sqrt{576 + 784} = \\sqrt{1\\,360}$ et $BD = \\sqrt{(-36)^2 + 8^2} = \\sqrt{1\\,296 + 64} = \\sqrt{1\\,360}$. Diagonales de même longueur : c'est un rectangle.\nc) $AB = \\sqrt{30^2 + 10^2} = \\sqrt{1\\,000} \\approx 31{,}62$ m et $BC = \\sqrt{(-6)^2 + 18^2} = \\sqrt{360} \\approx 18{,}97$ m.\nd) Aire $= AB \\times BC = \\sqrt{1\\,000} \\times \\sqrt{360} = \\sqrt{360\\,000} = 600$ m². Clôture : $2 \\times (\\sqrt{1\\,000} + \\sqrt{360}) \\approx 101{,}2$ m.\n⭐ Deux côtés aux longueurs « à virgule », et pourtant une aire ronde : $\\sqrt{360\\,000} = 600$.\n⛔ Le piège au d) : multiplier les valeurs arrondies, $31{,}62 \\times 18{,}97 \\approx 599{,}8$. On garde les valeurs exactes jusqu'au bout.",
          micros: ["repere_configuration", "repere_milieu", "repere_distance"],
        },
      ],
    },
  ],
};
