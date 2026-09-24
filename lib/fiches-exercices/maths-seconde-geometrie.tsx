// ─── Fiche d'exercices : problèmes de géométrie plane (seconde) ──────────────
//
// Sixième feuille du lot (24/09/2026), la deuxième sans fiche de cours
// (Frédéric : « on fait toutes les fiches d'exercices d'abord »). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/geometrie-problemes-plan.bank.ts`
// (notionId geometrie_problemes_plan). Le rappel de chaque niveau porte le
// cours : sinus, cosinus, tangente, cos² + sin² = 1, projeté orthogonal, aire.
//
// ⭐ LE FIL : dans un triangle rectangle, un angle et une longueur suffisent à
// tout retrouver ; et le PROJETÉ ORTHOGONAL, c'est le pied de la hauteur, le
// point le plus proche — la distance d'un point à une droite.
// ⛔ LES PIÈGES : se tromper de côté (adjacent / opposé / hypoténuse) ; la
// calculatrice en radians ; « 12 % » n'est pas « 12 m sur 100 m de route »
// mais sur 100 m d'HORIZONTALE (exercice 18) ; la hauteur d'un triangle n'est
// pas son côté oblique (exercice 7).
// ⭐ UN DESSIN À L'ÉCHELLE DANS CHAQUE CORRIGÉ (Frédéric : « n'oublie pas les
// canvas et graphiques, les élèves adorent ») : `triangle()` place les vrais
// points, le recalcul vérifie l'angle droit et les rapports des côtés.
//
// ⭐ LE MONDE : la hauteur d'un arbre à l'œil et au rapporteur, la pente d'un
// col du Tour de France, un enclos le long d'une rivière, le chemin le plus
// court jusqu'à un phare.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-geometrie.mjs`.
//
// Micro-compétences : geo_projete_orthogonal (6, 8, 11, 13, 16, 20),
// geo_trigonometrie (1, 2, 3, 5, 9, 11, 12, 13, 17, 18, 20), geo_trig_identite
// (4, 5, 10, 15, 18), geo_longueurs_aires (6, 7, 8, 9, 11, 12, 13, 16),
// geo_optimisation (14, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, droites, triangle } from "@/lib/fiches-exercices/figures";

const VERT = "#059669";

export const exercicesGeometrieSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "geometrie-problemes-plan",
  titre: "Problèmes de géométrie plane",
  accroche:
    "Vingt exercices, du geste seul au problème : sinus, cosinus et tangente dans le triangle rectangle, la relation cos² + sin² = 1, le projeté orthogonal et la distance d'un point à une droite, des aires, et un maximum à trouver. La hauteur d'un arbre, la pente d'un col du Tour de France, un enclos le long d'une rivière, le chemin le plus court jusqu'à un phare. Chaque corrigé dessine sa figure à l'échelle. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : nommer les côtés, choisir la formule, calculer.",
      rappel: [
        "Dans un triangle rectangle, pour un angle aigu $\\alpha$ : $\\cos\\alpha = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin\\alpha = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, $\\tan\\alpha = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.",
        "L'hypoténuse est en face de l'angle droit ; l'adjacent touche l'angle ; l'opposé est en face.",
        "Pour tout angle aigu $x$ : $\\cos^2 x + \\sin^2 x = 1$.",
        "Le PROJETÉ ORTHOGONAL de $M$ sur une droite $d$ est le point $H$ de $d$ tel que $(MH)$ soit perpendiculaire à $d$. La distance de $M$ à $d$ est $MH$ : c'est la plus courte.",
      ],
      exercices: [
        {
          enonce: "Le triangle $ABC$ est rectangle en $A$, avec $AB = 4$, $AC = 3$ et $BC = 5$. Calculer $\\cos\\widehat{B}$, $\\sin\\widehat{B}$ et $\\tan\\widehat{B}$.",
          correction:
            "On nomme les côtés depuis l'angle $\\widehat{B}$ : l'hypoténuse est $[BC]$ (en face de l'angle droit), le côté adjacent $[AB]$ (il touche $B$), le côté opposé $[AC]$ (en face de $B$).\n$\\cos\\widehat{B} = \\dfrac{AB}{BC} = \\dfrac{4}{5} = 0{,}8$ ; $\\sin\\widehat{B} = \\dfrac{AC}{BC} = \\dfrac{3}{5} = 0{,}6$ ; $\\tan\\widehat{B} = \\dfrac{AC}{AB} = \\dfrac{3}{4} = 0{,}75$.\n⭐ Vérification : $0{,}8^2 + 0{,}6^2 = 0{,}64 + 0{,}36 = 1$. ✓\n⛔ Le piège : prendre $[AC]$ comme côté adjacent parce qu'il est « à côté ». L'adjacent est celui qui TOUCHE l'angle, sans être l'hypoténuse.",
          schema: triangle({ A: [0, 0], B: [4, 0], C: [0, 3] }, { droit: "A", cotes: { AB: "4", CA: "3", BC: "5" }, angles: { B: "B" } }),
          micros: ["geo_trigonometrie"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $B$, avec $\\widehat{A} = 35°$ et $AC = 10$ cm. Calculer $BC$ et $AB$, arrondis au centième.",
          correction:
            "Depuis l'angle $\\widehat{A}$ : $[AC]$ est l'hypoténuse, $[BC]$ l'opposé, $[AB]$ l'adjacent.\n$\\sin 35° = \\dfrac{BC}{AC}$, donc $BC = 10 \\times \\sin 35° \\approx 5{,}74$ cm.\n$\\cos 35° = \\dfrac{AB}{AC}$, donc $AB = 10 \\times \\cos 35° \\approx 8{,}19$ cm.\n⭐ Vérification par Pythagore : $5{,}74^2 + 8{,}19^2 \\approx 100$, soit $AC^2$. ✓\n⛔ Le piège : la calculatrice en radians. Il faut qu'elle soit en DEGRÉS, sinon $\\sin 35$ donne $-0{,}43$.",
          schema: triangle({ A: [0, 0], B: [8.19, 0], C: [8.19, 5.74] }, { droit: "B", cotes: { CA: "10 cm", BC: "?", AB: "?" }, angles: { A: "35°" } }),
          micros: ["geo_trigonometrie"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $C$, avec $CA = 6$ et $CB = 8$. Calculer la mesure de l'angle $\\widehat{A}$, arrondie au dixième de degré.",
          correction:
            "Depuis $\\widehat{A}$ : on connaît l'adjacent $CA = 6$ et l'opposé $CB = 8$. C'est la tangente qui les relie.\n$\\tan\\widehat{A} = \\dfrac{CB}{CA} = \\dfrac{8}{6} = \\dfrac{4}{3}$.\nÀ la calculatrice (touche $\\tan^{-1}$, en degrés) : $\\widehat{A} \\approx 53{,}1°$.\n⭐ L'autre angle aigu vaut $90° - 53{,}1° = 36{,}9°$ : dans un triangle rectangle, les deux angles aigus font $90°$ à eux deux.",
          schema: triangle({ A: [6, 0], B: [0, 8], C: [0, 0] }, { droit: "C", cotes: { CA: "6", BC: "8" }, angles: { A: "?" } }),
          micros: ["geo_trigonometrie"],
        },
        {
          enonce: "$x$ est un angle aigu tel que $\\cos x = 0{,}6$. Calculer $\\sin x$ sans calculer $x$.",
          correction:
            "On utilise $\\cos^2 x + \\sin^2 x = 1$ : $\\sin^2 x = 1 - 0{,}6^2 = 1 - 0{,}36 = 0{,}64$.\n$x$ est aigu, donc $\\sin x$ est positif : $\\sin x = \\sqrt{0{,}64} = 0{,}8$.\n⭐ Sur le dessin : un triangle rectangle d'hypoténuse $1$ et de côté adjacent $0{,}6$ a un côté opposé de $0{,}8$. C'est Pythagore, tout simplement.\n⛔ Le piège : écrire $\\sin x = 1 - 0{,}6 = 0{,}4$. Ce sont les CARRÉS qui font $1$.",
          schema: triangle({ A: [0, 0], B: [0.6, 0], C: [0.6, 0.8] }, { droit: "B", cotes: { CA: "1", AB: "0,6", BC: "0,8" }, angles: { A: "x" } }),
          micros: ["geo_trig_identite"],
        },
        {
          enonce: "$x$ est un angle aigu tel que $\\sin x = \\dfrac{5}{13}$. Calculer la valeur exacte de $\\cos x$, puis de $\\tan x$.",
          correction:
            "$\\cos^2 x = 1 - \\left(\\dfrac{5}{13}\\right)^2 = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}$.\n$x$ est aigu : $\\cos x = \\dfrac{12}{13}$.\n$\\tan x = \\dfrac{\\sin x}{\\cos x} = \\dfrac{5}{13} \\times \\dfrac{13}{12} = \\dfrac{5}{12}$.\n⭐ C'est le triangle $5$-$12$-$13$ : $5^2 + 12^2 = 25 + 144 = 169 = 13^2$.",
          schema: triangle({ A: [0, 0], B: [12, 0], C: [12, 5] }, { droit: "B", cotes: { CA: "13", BC: "5", AB: "12" }, angles: { A: "x" } }),
          micros: ["geo_trig_identite", "geo_trigonometrie"],
        },
        {
          enonce: "a) $ABC$ est rectangle en $A$. Quel est le projeté orthogonal de $B$ sur la droite $(AC)$ ?\nb) $ABC$ est équilatéral de côté $6$ cm. Quel est le projeté orthogonal $H$ de $C$ sur $(AB)$ ? Calculer $CH$ en valeur exacte, puis arrondie au centième.",
          correction:
            "a) $(BA)$ est déjà perpendiculaire à $(AC)$ : le projeté orthogonal de $B$ sur $(AC)$ est le point $A$ lui-même.\nb) Dans un triangle équilatéral, la hauteur issue de $C$ est aussi une médiane : $H$ est le MILIEU de $[AB]$, et $AH = 3$ cm.\nLe triangle $AHC$ est rectangle en $H$ : $CH^2 = AC^2 - AH^2 = 36 - 9 = 27$, donc $CH = \\sqrt{27} = 3\\sqrt{3} \\approx 5{,}20$ cm.\n⭐ $CH$ est la distance de $C$ à la droite $(AB)$ : aucun autre point de $(AB)$ n'est plus près de $C$.",
          schema: triangle({ A: [0, 0], B: [6, 0], C: [3, 5.196] }, { cotes: { AB: "6", CA: "6", BC: "6" }, hauteur: { depuis: "C", label: "?" } }),
          micros: ["geo_projete_orthogonal", "geo_longueurs_aires"],
        },
        {
          enonce: "Dans le triangle $ABC$, $AB = 8$ cm, $AC = 6$ cm et $\\widehat{A} = 30°$. On note $H$ le projeté orthogonal de $C$ sur $(AB)$.\na) Calculer $CH$.\nb) En déduire l'aire du triangle $ABC$.",
          correction:
            "a) Le triangle $AHC$ est rectangle en $H$ ; depuis $\\widehat{A}$, $[CH]$ est l'opposé et $[AC]$ l'hypoténuse : $CH = AC \\times \\sin 30° = 6 \\times 0{,}5 = 3$ cm.\nb) Aire $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2} = \\dfrac{AB \\times CH}{2} = \\dfrac{8 \\times 3}{2} = 12$ cm².\n⛔ Le piège : prendre $AC = 6$ comme hauteur, et trouver $24$ cm². La hauteur est PERPENDICULAIRE à la base ; $[AC]$ est oblique.",
          schema: triangle({ A: [0, 0], B: [8, 0], C: [5.196, 3] }, { cotes: { AB: "8", CA: "6" }, angles: { A: "30°" }, hauteur: { depuis: "C", label: "3" } }),
          micros: ["geo_longueurs_aires"],
        },
        {
          enonce: "Le point $H$ est le projeté orthogonal du point $M$ sur la droite $d$. On sait que $H$ et $A$ sont sur $d$, que $HA = 5$ m et que $MA = 13$ m. Quelle est la distance du point $M$ à la droite $d$ ?",
          correction:
            "La distance de $M$ à $d$, c'est $MH$.\nLe triangle $MHA$ est rectangle en $H$ (projeté orthogonal) : $MH^2 = MA^2 - HA^2 = 169 - 25 = 144$, donc $MH = 12$ m.\n⭐ $MH = 12 < MA = 13$ : dans un triangle rectangle, l'hypoténuse est le plus grand côté. C'est pour cela que le projeté donne le point le PLUS PROCHE.",
          schema: triangle({ A: [0, 0], B: [5, 0], C: [0, 12] }, { noms: { A: "H", B: "A", C: "M" }, droit: "A", cotes: { AB: "5", BC: "13", CA: "?" } }),
          micros: ["geo_projete_orthogonal", "geo_longueurs_aires"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : tracer la hauteur, découper en triangles rectangles, enchaîner.",
      rappel: [
        "Un triangle quelconque se DÉCOUPE en deux triangles rectangles en traçant une hauteur : c'est là que la trigonométrie s'applique.",
        "Aire d'un triangle $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$, la hauteur étant perpendiculaire à la base.",
        "On garde les valeurs EXACTES ($\\sqrt{3}$, $\\dfrac{12}{13}$) jusqu'au bout, et on arrondit à la fin.",
      ],
      exercices: [
        {
          enonce: "Le triangle $ABC$ est rectangle en $A$, avec $\\widehat{B} = 40°$ et $BC = 12$ cm.\na) Calculer $AC$ et $AB$, au centième.\nb) Calculer l'aire du triangle, au dixième de cm².",
          correction:
            "a) Depuis $\\widehat{B}$ : $[BC]$ hypoténuse, $[AC]$ opposé, $[AB]$ adjacent.\n$AC = 12 \\times \\sin 40° \\approx 7{,}71$ cm et $AB = 12 \\times \\cos 40° \\approx 9{,}19$ cm.\nb) Le triangle est rectangle en $A$ : ses deux côtés de l'angle droit sont base et hauteur. Aire $= \\dfrac{AB \\times AC}{2} \\approx 35{,}5$ cm².\n⭐ Avec les valeurs exactes, $\\dfrac{12\\cos 40° \\times 12\\sin 40°}{2} \\approx 35{,}45$ : on arrondit à la fin, pas avant.",
          schema: triangle({ A: [0, 0], B: [9.19, 0], C: [0, 7.71] }, { droit: "A", cotes: { BC: "12", AB: "?", CA: "?" }, angles: { B: "40°" } }),
          micros: ["geo_trigonometrie", "geo_longueurs_aires"],
        },
        {
          enonce: "$x$ est un angle aigu.\na) Montrer que $(\\cos x + \\sin x)^2 = 1 + 2\\sin x \\cos x$.\nb) Le vérifier avec $\\cos x = 0{,}8$.",
          correction:
            "a) On développe l'identité remarquable : $(\\cos x + \\sin x)^2 = \\cos^2 x + 2\\sin x\\cos x + \\sin^2 x$.\nOr $\\cos^2 x + \\sin^2 x = 1$ : il reste $1 + 2\\sin x \\cos x$.\nb) $\\sin x = \\sqrt{1 - 0{,}64} = 0{,}6$. À gauche : $(0{,}8 + 0{,}6)^2 = 1{,}4^2 = 1{,}96$. À droite : $1 + 2 \\times 0{,}6 \\times 0{,}8 = 1 + 0{,}96 = 1{,}96$. ✓\n⛔ Le piège au a) : écrire $(\\cos x + \\sin x)^2 = \\cos^2 x + \\sin^2 x = 1$, en oubliant le double produit.",
          schema: triangle({ A: [0, 0], B: [0.8, 0], C: [0.8, 0.6] }, { droit: "B", cotes: { CA: "1", AB: "0,8", BC: "0,6" }, angles: { A: "x" } }),
          micros: ["geo_trig_identite"],
        },
        {
          enonce: "Dans le triangle $ABC$, $AB = 10$ cm. Le projeté orthogonal $H$ de $C$ sur $(AB)$ est sur $[AB]$, avec $AH = 4$ cm et $CH = 6$ cm.\na) Calculer $AC$ et $BC$ en valeur exacte.\nb) Calculer l'aire du triangle.\nc) Montrer que $\\widehat{B} = 45°$.",
          correction:
            "a) $HB = 10 - 4 = 6$ cm. Dans $AHC$, rectangle en $H$ : $AC = \\sqrt{16 + 36} = \\sqrt{52} = 2\\sqrt{13}$ cm. Dans $BHC$ : $BC = \\sqrt{36 + 36} = \\sqrt{72} = 6\\sqrt{2}$ cm.\nb) Aire $= \\dfrac{AB \\times CH}{2} = \\dfrac{10 \\times 6}{2} = 30$ cm².\nc) Dans $BHC$ : $\\tan\\widehat{B} = \\dfrac{CH}{HB} = \\dfrac{6}{6} = 1$, donc $\\widehat{B} = 45°$. Le triangle $BHC$ est rectangle ISOCÈLE.\n⭐ Découper par la hauteur transforme un triangle quelconque en deux triangles rectangles : Pythagore et la trigonométrie redeviennent possibles.",
          schema: triangle({ A: [0, 0], B: [10, 0], C: [4, 6] }, { cotes: { AB: "10" }, angles: { B: "45°" }, hauteur: { depuis: "C", label: "6" } }),
          micros: ["geo_projete_orthogonal", "geo_longueurs_aires", "geo_trigonometrie"],
        },
        {
          enonce: "$ABCD$ est un parallélogramme avec $AB = 7$ cm, $AD = 4$ cm et $\\widehat{A} = 60°$.\na) Calculer la hauteur issue de $D$ sur $(AB)$, en valeur exacte.\nb) En déduire l'aire du parallélogramme, en valeur exacte puis au centième.",
          correction:
            "a) Soit $H$ le projeté orthogonal de $D$ sur $(AB)$. Dans $AHD$, rectangle en $H$ : $DH = AD \\times \\sin 60° = 4 \\times \\dfrac{\\sqrt{3}}{2} = 2\\sqrt{3}$ cm.\nb) Aire d'un parallélogramme $=$ base $\\times$ hauteur $= 7 \\times 2\\sqrt{3} = 14\\sqrt{3} \\approx 24{,}25$ cm².\n⛔ Le piège : faire $7 \\times 4 = 28$ cm², l'aire du RECTANGLE de mêmes côtés. Le parallélogramme penché est plus petit.",
          schema: triangle({ A: [0, 0], B: [7, 0], C: [2, 3.464] }, { noms: { C: "D" }, cotes: { AB: "7", CA: "4" }, angles: { A: "60°" }, hauteur: { depuis: "C", label: "?" } }),
          micros: ["geo_longueurs_aires", "geo_trigonometrie"],
        },
        {
          enonce: "Le triangle $ABC$ est isocèle en $A$, avec $AB = AC = 5$ cm et $BC = 6$ cm. On note $I$ le projeté orthogonal de $A$ sur $(BC)$.\na) Où est $I$ ? Calculer $AI$.\nb) Calculer l'aire de $ABC$.\nc) Calculer $\\widehat{B}$, puis $\\widehat{A}$, au dixième de degré.",
          correction:
            "a) Dans un triangle isocèle, la hauteur issue du sommet principal est aussi la médiane : $I$ est le milieu de $[BC]$, $BI = 3$ cm. Puis $AI = \\sqrt{25 - 9} = \\sqrt{16} = 4$ cm.\nb) Aire $= \\dfrac{BC \\times AI}{2} = \\dfrac{6 \\times 4}{2} = 12$ cm².\nc) Dans $ABI$, rectangle en $I$ : $\\cos\\widehat{B} = \\dfrac{BI}{AB} = \\dfrac{3}{5}$, donc $\\widehat{B} \\approx 53{,}1°$. Les angles à la base sont égaux, et la somme fait $180°$ : $\\widehat{A} \\approx 180 - 2 \\times 53{,}13 \\approx 73{,}7°$.\n⛔ Le piège au c) : calculer $\\widehat{A}$ avec l'arrondi $53{,}1$, et trouver $73{,}8°$. On garde plus de décimales jusqu'au bout.",
          schema: triangle({ A: [3, 4], B: [0, 0], C: [6, 0] }, { cotes: { AB: "5", CA: "5", BC: "6" }, hauteur: { depuis: "A", label: "4" } }),
          micros: ["geo_projete_orthogonal", "geo_longueurs_aires", "geo_trigonometrie"],
        },
        {
          enonce: "Un rectangle a un périmètre de $20$ cm. On note $x$ sa largeur.\na) Exprimer sa longueur, puis son aire $A(x)$, en fonction de $x$.\nb) Calculer $A(2)$, $A(4)$, $A(5)$, $A(6)$.\nc) Montrer que $A(x) = 25 - (x - 5)^2$. En déduire l'aire maximale, et la forme du rectangle.",
          correction:
            "a) Largeur $+$ longueur $= 10$ : la longueur est $10 - x$, et $A(x) = x(10 - x)$, pour $x$ entre $0$ et $10$.\nb) $A(2) = 16$, $A(4) = 24$, $A(5) = 25$, $A(6) = 24$.\nc) $25 - (x - 5)^2 = 25 - (x^2 - 10x + 25) = -x^2 + 10x = x(10 - x)$. ✓\nUn carré n'est jamais négatif : $A(x) \\leqslant 25$, avec égalité seulement pour $x = 5$.\nL'aire maximale est $25$ cm², pour un rectangle de $5$ cm sur $5$ cm : un CARRÉ.\n⭐ À périmètre égal, le carré est le rectangle le plus « rentable ».",
          schema: diagramme("barres", [{ label: "1", value: 9 }, { label: "2", value: 16 }, { label: "3", value: 21 }, { label: "4", value: 24 }, { label: "5", value: 25 }, { label: "6", value: 24 }, { label: "7", value: 21 }, { label: "8", value: 16 }, { label: "9", value: 9 }], 4),
          micros: ["geo_optimisation"],
        },
        {
          enonce: "On part d'un triangle équilatéral de côté $1$, coupé en deux par une hauteur. On obtient un triangle rectangle avec un angle de $30°$.\na) Montrer que $\\sin 30° = \\dfrac{1}{2}$.\nb) En déduire la valeur exacte de $\\cos 30°$ avec $\\cos^2 x + \\sin^2 x = 1$.\nc) En déduire $\\tan 30°$.",
          correction:
            "a) La hauteur coupe le côté opposé en son milieu, et l'angle de $60°$ en deux angles de $30°$. Dans le demi-triangle, l'hypoténuse vaut $1$ et le côté opposé à $30°$ vaut $\\dfrac{1}{2}$ : $\\sin 30° = \\dfrac{1}{2}$.\nb) $\\cos^2 30° = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$, et le cosinus est positif : $\\cos 30° = \\dfrac{\\sqrt{3}}{2}$.\nc) $\\tan 30° = \\dfrac{\\sin 30°}{\\cos 30°} = \\dfrac{1}{2} \\times \\dfrac{2}{\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}$.\n⭐ Ce sont des valeurs EXACTES : la calculatrice ne donne que $0{,}866…$ ; le triangle, lui, donne $\\dfrac{\\sqrt{3}}{2}$.",
          schema: triangle({ A: [0, 0], B: [0.866, 0], C: [0.866, 0.5] }, { droit: "B", cotes: { CA: "1", BC: "1/2", AB: "√3/2" }, angles: { A: "30°" } }),
          micros: ["geo_trig_identite"],
        },
        {
          enonce: "Dans un repère orthonormé, soit $A(3\\,;\\,5)$ et $d$ la droite d'équation $y = x$. On admet que le projeté orthogonal de $A$ sur $d$ est $H(4\\,;\\,4)$.\na) Vérifier que $H$ est sur $d$.\nb) Calculer $OA$, $OH$ et $AH$, puis vérifier que le triangle $OHA$ est rectangle en $H$.\nc) Quelle est la distance du point $A$ à la droite $d$ ?",
          correction:
            "a) $H(4\\,;\\,4)$ a une ordonnée égale à son abscisse : $H$ est sur $d$.\nb) $OA^2 = 3^2 + 5^2 = 34$ ; $OH^2 = 4^2 + 4^2 = 32$ ; $AH^2 = 1^2 + (-1)^2 = 2$.\n$OH^2 + AH^2 = 32 + 2 = 34 = OA^2$ : d'après la réciproque de Pythagore, $OHA$ est rectangle en $H$. C'est bien le projeté orthogonal.\nc) La distance de $A$ à $d$ est $AH = \\sqrt{2} \\approx 1{,}41$.\n⭐ Aucun autre point de $d$ n'est aussi près de $A$ : par exemple $B(5\\,;\\,5)$ est à $AB = 2$.",
          schema: droites([-2, 7], [{ a: 1, b: -1, c: 0 }], [{ x: 3, y: 5, label: "A" }, { x: 4, y: 4, label: "H" }], [{ de: [3, 5], vers: [4, 4], couleur: VERT, pointe: false }]),
          micros: ["geo_projete_orthogonal", "geo_longueurs_aires"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on dessine, on repère le triangle rectangle, on calcule et on répond avec l'unité.",
      rappel: [
        "Dans une situation réelle, on cherche d'abord le triangle RECTANGLE (un mur vertical et un sol horizontal en font un).",
        "Un angle et une longueur connus dans un triangle rectangle : la trigonométrie donne les deux autres côtés.",
        "Un maximum : on exprime la grandeur en fonction de $x$, on étudie la fonction, on répond par une phrase.",
      ],
      exercices: [
        {
          titre: "La hauteur de l'arbre",
          enonce: "Pour mesurer un arbre sans y grimper, Lila se place à $30$ m de son pied, sur un sol horizontal. Elle vise le sommet : son regard fait un angle de $40°$ avec l'horizontale. Ses yeux sont à $1{,}60$ m du sol.\na) Faire un schéma et repérer le triangle rectangle.\nb) Calculer la hauteur de l'arbre, au décimètre près.",
          correction:
            "a) Le triangle $OPS$ : $O$ l'œil de Lila, $P$ le point du tronc à la hauteur de ses yeux, $S$ le sommet. Il est rectangle en $P$ (le tronc est vertical, le regard horizontal jusqu'en $P$).\nb) Depuis l'angle en $O$ : $OP = 30$ m est l'adjacent, $PS$ l'opposé. $\\tan 40° = \\dfrac{PS}{30}$, donc $PS = 30 \\times \\tan 40° \\approx 25{,}17$ m.\nOn ajoute la hauteur des yeux : $25{,}17 + 1{,}60 \\approx 26{,}8$ m.\n⛔ Le piège : oublier les $1{,}60$ m. Le triangle part des YEUX, pas du sol.\n⭐ C'est ainsi qu'on mesurait les arbres, les tours et les montagnes avant les lasers : un angle, une distance, et la tangente.",
          schema: triangle({ A: [0, 0], B: [30, 0], C: [30, 25.17] }, { noms: { A: "O", B: "P", C: "S" }, droit: "B", cotes: { AB: "30 m", BC: "?" }, angles: { A: "40°" } }),
          micros: ["geo_trigonometrie"],
        },
        {
          titre: "La pente du col",
          enonce: "Dans la montée d'un col du Tour de France, un panneau annonce une pente de $12$ %. Cela veut dire que la route s'élève de $12$ m pour $100$ m parcourus à l'HORIZONTALE.\na) Calculer l'angle $\\alpha$ de la route avec l'horizontale, au dixième de degré.\nb) Un cycliste parcourt $2$ km le long de la route (c'est son compteur qui les mesure). De combien s'est-il élevé, au mètre près ?\nc) Un autre élève répond « $12$ % de $2\\,000$ m, soit $240$ m ». Pourquoi est-ce presque juste, mais pas exact ?",
          correction:
            "a) $\\tan\\alpha = \\dfrac{12}{100} = 0{,}12$, donc $\\alpha \\approx 6{,}8°$.\nb) Les $2\\,000$ m sont mesurés le long de la route : c'est l'HYPOTÉNUSE. Le dénivelé est le côté opposé : $2\\,000 \\times \\sin\\alpha \\approx 238$ m.\nc) $12$ % s'appliquent à la distance HORIZONTALE, pas à la route. Ici, l'horizontale vaut $2\\,000 \\times \\cos\\alpha \\approx 1\\,986$ m, et $12$ % de $1\\,986$ m font bien environ $238$ m. Pour une pente faible, horizontale et route sont presque égales : l'erreur n'est que de $2$ m.\n⭐ En degrés, $12$ % ne font même pas $7°$ : une pente qui paraît rude à vélo est un angle très faible.",
          schema: triangle({ A: [0, 0], B: [1985.75, 0], C: [1985.75, 238.3] }, { droit: "B", cotes: { CA: "2 000 m", BC: "?" }, angles: { A: "α" } }),
          micros: ["geo_trigonometrie", "geo_trig_identite"],
        },
        {
          titre: "L'enclos le long de la rivière",
          enonce: "Un éleveur dispose de $60$ m de clôture pour fermer un enclos rectangulaire le long d'une rivière : le côté de la rivière n'a pas besoin de clôture. On note $x$ la largeur (les deux côtés perpendiculaires à la rivière).\na) Exprimer la longueur, puis l'aire $A(x)$, en fonction de $x$.\nb) Calculer l'aire pour $x = 5$, $10$, $15$, $20$ et $25$.\nc) Montrer que $A(x) = 450 - 2(x - 15)^2$, et en déduire les dimensions de l'enclos le plus grand.",
          correction:
            "a) Deux largeurs et une longueur : $2x + L = 60$, donc $L = 60 - 2x$, et $A(x) = x(60 - 2x)$ pour $x$ entre $0$ et $30$.\nb) $A(5) = 250$ ; $A(10) = 400$ ; $A(15) = 450$ ; $A(20) = 400$ ; $A(25) = 250$ (en m²).\nc) $450 - 2(x - 15)^2 = 450 - 2(x^2 - 30x + 225) = -2x^2 + 60x = x(60 - 2x)$. ✓\nLe carré est positif, donc $A(x) \\leqslant 450$, avec égalité pour $x = 15$ : l'enclos le plus grand fait $15$ m sur $30$ m, soit $450$ m².\n⭐ Ce n'est PAS un carré : la rivière fait un côté gratuitement, la longueur vaut le double de la largeur.\n⛔ Le piège au a) : écrire $2x + 2L = 60$, comme pour un rectangle entièrement clos.",
          schema: diagramme("barres", [{ label: "x = 5", value: 250 }, { label: "10", value: 400 }, { label: "15", value: 450 }, { label: "20", value: 400 }, { label: "25", value: 250 }], 2),
          micros: ["geo_optimisation"],
        },
        {
          titre: "Le chemin le plus court jusqu'au phare",
          enonce: "Une route côtière rectiligne passe par un carrefour $O$. Un phare $P$ est à $800$ m du carrefour, dans une direction qui fait un angle de $30°$ avec la route. On veut construire le chemin le plus court possible entre la route et le phare.\na) Où faut-il faire partir ce chemin ? Justifier.\nb) Calculer sa longueur.\nc) À quelle distance du carrefour, le long de la route, part-il ? Arrondir au mètre.",
          correction:
            "a) Le chemin le plus court va de la route au phare PERPENDICULAIREMENT : il part du projeté orthogonal $H$ de $P$ sur la route.\nb) Le triangle $OHP$ est rectangle en $H$, d'hypoténuse $OP = 800$ m. $PH = 800 \\times \\sin 30° = 800 \\times 0{,}5 = 400$ m.\nc) $OH = 800 \\times \\cos 30° = 800 \\times \\dfrac{\\sqrt{3}}{2} = 400\\sqrt{3} \\approx 693$ m.\n⭐ Partir du carrefour coûterait $800$ m de chemin ; partir de $H$, seulement $400$ : moitié moins.\n⛔ Le piège au a) : faire partir le chemin du carrefour, « parce que la route y est déjà ». La distance d'un point à une droite se mesure sur la perpendiculaire.",
          schema: triangle({ A: [0, 0], B: [692.82, 0], C: [692.82, 400] }, { noms: { A: "O", B: "H", C: "P" }, droit: "B", cotes: { CA: "800 m", BC: "?" }, angles: { A: "30°" } }),
          micros: ["geo_optimisation", "geo_projete_orthogonal", "geo_trigonometrie"],
        },
      ],
    },
  ],
};
