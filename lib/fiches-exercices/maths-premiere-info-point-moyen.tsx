// ─── Fiche d'exercices : le point moyen d'un nuage (1re, sans spécialité) ────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), cinquième notion du
// coach (28/09/2026) : calculer les coordonnées du point moyen, le placer, et
// savoir qu'une droite d'ajustement passe par lui. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/ajustement-affine.bank.ts` (« savoir
// calculer les coordonnées d'un point moyen », capacité attendue du programme ;
// AUCUNE droite de régression à calculer : on la donne, ou on la fait passer par
// G et un autre point).
//
// ⭐⭐ LE FIL : G N'EST PAS LE POINT DU MILIEU. Ses coordonnées sont deux
// MOYENNES, et G n'est en général pas un point du nuage. Chaque nuage de la
// feuille est choisi pour que G ne tombe sur AUCUN de ses points : le piège
// « prendre le point du milieu » (3) doit donner une autre réponse. Et passer
// par G est nécessaire, pas suffisant (17 : une droite décroissante passe par G).
//
// ⭐ Contextes : sport (tirs et buts, pompes), nature (libellules, déchets
// ramassés), économie (chiffre d'affaires, publicité, forfaits mobiles),
// physique (le ressort, 13 ; les éoliennes, 18), histoire-géo (population d'une
// ville, 15 ; niveau de la mer, 17). Les chiffres sont des MODÈLES, jamais des
// données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-point-moyen.mjs` (G
// recalculé depuis les points DESSINÉS ou le tableau relu ; chaque droite relue
// dans `repere()` est évaluée en G).
//
// Micro-compétences : info_point_moyen_calculer (1, 2, 3, 5, 6, 8, 9, 10, 11,
// 12, 13, 14, 15, 17, 18, 19, 20), info_point_moyen_placer (2, 3, 8, 9, 11,
// 12, 14, 16, 17, 19, 20), info_point_moyen_droite (4, 7, 10, 13, 15, 16, 17,
// 18, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le nuage avec G
 *  placé, qui redit le corrigé. Les nuages qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoPointMoyenPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-point-moyen",
  titre: "Le point moyen",
  accroche:
    "Vingt exercices pour calculer les coordonnées du point moyen d'un nuage, le placer, et vérifier qu'une droite d'ajustement passe par lui. Tirs et buts, libellules, ressort, population d'une ville, niveau de la mer, éoliennes, forfaits mobiles. Un rappel de cours avant chaque niveau, une correction étape par étape avec le nuage et son point moyen.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Deux moyennes, un point. Une règle par exercice.",
      rappel: [
        "Le point moyen $G$ d'un nuage a pour coordonnées $(\\overline{x} ; \\overline{y})$ : la moyenne des abscisses, et la moyenne des ordonnées.",
        "$\\overline{x} = \\dfrac{x_1 + x_2 + \\ldots + x_n}{n}$, où $n$ est le nombre de points. De même pour $\\overline{y}$.",
        "$G$ n'est en général PAS un point du nuage, ni le point « du milieu ».",
        "Une droite d'ajustement bien placée passe par $G$ : en remplaçant $x$ par $\\overline{x}$ dans son équation, on trouve $\\overline{y}$.",
      ],
      exercices: [
        {
          enonce:
            "Sur quatre matchs, une joueuse de handball a noté ses tirs cadrés et ses buts. Calculer les coordonnées du point moyen $G$ du nuage.",
          figure: tableauProba(
            ["Tirs cadrés", "2", "4", "6", "8"],
            [["Buts", "1", "1", "3", "3"]],
          ),
          correction:
            "Il y a $4$ points : on divise chaque somme par $4$.\n$\\overline{x} = \\dfrac{2 + 4 + 6 + 8}{4} = \\dfrac{20}{4} = 5$.\n$\\overline{y} = \\dfrac{1 + 1 + 3 + 3}{4} = \\dfrac{8}{4} = 2$.\nDonc $G(5 ; 2)$ : en moyenne, $5$ tirs cadrés et $2$ buts par match.\n⚠️ On divise par le nombre de POINTS ($4$), pas par la plus grande valeur.",
          micros: ["info_point_moyen_calculer"],
        },
        {
          enonce:
            "Chaque point représente un étang : en abscisse, sa surface en hectares ; en ordonnée, le nombre d'espèces de libellules observées (modèle).\na) Lire les coordonnées des quatre points.\nb) Calculer les coordonnées du point moyen $G$, et le placer.",
          figure: repere([-1, 6, -1, 7], [], [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 6 },
          ]),
          correction:
            "a) $(1 ; 2)$, $(2 ; 3)$, $(4 ; 5)$, $(5 ; 6)$.\nb) $\\overline{x} = \\dfrac{1 + 2 + 4 + 5}{4} = \\dfrac{12}{4} = 3$ ; $\\overline{y} = \\dfrac{2 + 3 + 5 + 6}{4} = \\dfrac{16}{4} = 4$.\n$G(3 ; 4)$. On le place : il tombe au milieu du nuage, mais ce n'est aucun de ses points.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 7], [], [
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 4, y: 5 },
              { x: 5, y: 6 },
              { x: 3, y: 4, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          enonce:
            "Un nuage a cinq points : $(1 ; 1)$, $(2 ; 2)$, $(3 ; 5)$, $(4 ; 4)$ et $(5 ; 3)$. Parmi $A(3 ; 5)$, $B(3 ; 3)$ et $C(4 ; 4)$, lequel est son point moyen ?",
          correction:
            "$\\overline{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = \\dfrac{15}{5} = 3$.\n$\\overline{y} = \\dfrac{1 + 2 + 5 + 4 + 3}{5} = \\dfrac{15}{5} = 3$.\nLe point moyen est $G(3 ; 3)$ : c'est $B$.\n⚠️ Le piège : $A(3 ; 5)$ est le point du MILIEU du nuage (le troisième), pas son point moyen. Et $C$ est un point du nuage, lui aussi.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 7], [], [
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 3 },
              { x: 3, y: 3, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_placer", "info_point_moyen_calculer"],
        },
        {
          enonce:
            "Le point moyen d'un nuage est $G(3 ; 7)$. Laquelle des deux droites peut être une droite d'ajustement de ce nuage : $y = 2x + 1$ ou $y = 3x - 1$ ?",
          correction:
            "On remplace $x$ par $3$ dans chaque équation, et on regarde si l'on trouve $7$.\n$y = 2x + 1$ : $2 \\times 3 + 1 = 7$. Elle passe par $G$.\n$y = 3x - 1$ : $3 \\times 3 - 1 = 8$. Elle ne passe pas par $G$.\nC'est la droite $y = 2x + 1$.\n⭐ Une droite d'ajustement passe toujours par le point moyen.",
          schema: ecranSeulement(repere([-1, 5, -1, 10], [{ q: [0, 2, 1] }], [{ x: 3, y: 7, label: "G" }], undefined, true)),
          micros: ["info_point_moyen_droite"],
        },
        {
          enonce:
            "Une boutique a réalisé, sur ses cinq premiers mois, un chiffre d'affaires de $12$, $15$, $14$, $18$ et $16$ milliers d'euros. On numérote les mois de $1$ à $5$. Calculer les coordonnées du point moyen, et le traduire par une phrase.",
          correction:
            "$\\overline{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = 3$.\n$\\overline{y} = \\dfrac{12 + 15 + 14 + 18 + 16}{5} = \\dfrac{75}{5} = 15$.\n$G(3 ; 15)$ : en moyenne, la boutique fait $15\\,000$ € de chiffre d'affaires par mois.\n⭐ $\\overline{y}$ est la moyenne habituelle ; $\\overline{x} = 3$ est simplement le mois du milieu, car les mois sont régulièrement espacés.",
          schema: ecranSeulement(
            tableauProba(
              ["Mois", "1", "2", "3", "4", "5", "Moyenne"],
              [["CA (milliers €)", "12", "15", "14", "18", "16", "15"]],
              [[0, 6]],
            ),
          ),
          micros: ["info_point_moyen_calculer"],
        },
        {
          enonce:
            "Pendant quatre semaines, une coureuse a noté ses kilomètres : $5$, $7$, puis une valeur effacée, puis $11$ km. Le point moyen du nuage (semaine ; km) est $G(2{,}5 ; 8)$. Retrouver la valeur effacée.",
          correction:
            "La moyenne des $4$ distances vaut $8$ : leur somme vaut $4 \\times 8 = 32$.\nLes trois connues font $5 + 7 + 11 = 23$.\nLa valeur effacée : $32 - 23 = 9$ km.\n✔️ Vérification : $\\dfrac{5 + 7 + 9 + 11}{4} = \\dfrac{32}{4} = 8$.\n✔️ Et $\\overline{x} = \\dfrac{1 + 2 + 3 + 4}{4} = 2{,}5$.\nSur le dessin, le point retrouvé $(3 ; 9)$ complète le nuage, et $G(2{,}5 ; 8)$ est au milieu, sur aucun point.",
          schema: repere([-1, 5, -1, 12], [], [
            { x: 1, y: 5 },
            { x: 2, y: 7 },
            { x: 3, y: 9 },
            { x: 4, y: 11 },
            { x: 2.5, y: 8, label: "G" },
          ], undefined, true),
          micros: ["info_point_moyen_calculer"],
        },
        {
          enonce:
            "Une droite d'ajustement a pour équation $y = 0{,}5x + b$, et elle passe par le point moyen $G(4 ; 5)$. Trouver $b$.",
          correction:
            "La droite passe par $G$ : on remplace $x$ par $4$ et $y$ par $5$.\n$5 = 0{,}5 \\times 4 + b$, soit $5 = 2 + b$.\nDonc $b = 3$, et la droite a pour équation $y = 0{,}5x + 3$.\n⭐ C'est le moyen le plus rapide de compléter une équation : le point moyen en donne un point.",
          schema: ecranSeulement(repere([-1, 7, -1, 7], [{ q: [0, 0.5, 3] }], [{ x: 4, y: 5, label: "G" }])),
          micros: ["info_point_moyen_droite"],
        },
        {
          enonce:
            "Pour quatre concerts, on a relevé le prix du billet en DIZAINES d'euros (abscisse) et le nombre de spectateurs en CENTAINES (ordonnée).\na) Calculer les coordonnées du point moyen $G$.\nb) Le placer, et traduire ses coordonnées.",
          figure: repere([-1, 6, -1, 6], [], [
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 4, y: 2 },
            { x: 5, y: 1 },
          ]),
          correction:
            "a) Les points : $(1 ; 5)$, $(2 ; 4)$, $(4 ; 2)$, $(5 ; 1)$.\n$\\overline{x} = \\dfrac{1 + 2 + 4 + 5}{4} = 3$ ; $\\overline{y} = \\dfrac{5 + 4 + 2 + 1}{4} = 3$. Donc $G(3 ; 3)$.\nb) En moyenne, un billet à $30$ € et $300$ spectateurs par concert.\n⚠️ Les unités reviennent à la fin : $3$ dizaines d'euros, $3$ centaines de spectateurs.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 6], [], [
              { x: 1, y: 5 },
              { x: 2, y: 4 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
              { x: 3, y: 3, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Calculer G avec ses unités, le placer, puis s'en servir pour une droite.",
      rappel: [
        "On additionne toutes les abscisses et on divise par le NOMBRE de points ; de même pour les ordonnées.",
        "Avec des unités (« en milliers »), $G$ garde les mêmes unités : on convertit à la fin.",
        "Une droite $y = ax + b$ passe par $G$ quand $a \\times \\overline{x} + b = \\overline{y}$.",
        "Si la droite passe par $G$ et par un autre point $A$, son coefficient directeur vaut $\\dfrac{y_G - y_A}{x_G - x_A}$.",
      ],
      exercices: [
        {
          titre: "Les pompes",
          enonce:
            "Pendant cinq semaines, un élève a noté le nombre de pompes qu'il réussit d'affilée, en DIZAINES.\na) Calculer les coordonnées du point moyen $G$.\nb) Le placer. Est-ce un point du nuage ?",
          figure: repere([-1, 6, -1, 8], [], [
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 6 },
          ]),
          correction:
            "a) $\\overline{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = 3$ ; $\\overline{y} = \\dfrac{2 + 4 + 3 + 5 + 6}{5} = \\dfrac{20}{5} = 4$.\n$G(3 ; 4)$ : en moyenne, $40$ pompes.\nb) Non : à la semaine $3$, le point du nuage est $(3 ; 3)$, pas $(3 ; 4)$.\n⭐ Même quand $\\overline{x}$ tombe sur une abscisse du nuage, $\\overline{y}$ n'a aucune raison d'être l'ordonnée de ce point.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 8], [], [
              { x: 1, y: 2 },
              { x: 2, y: 4 },
              { x: 3, y: 3 },
              { x: 4, y: 5 },
              { x: 5, y: 6 },
              { x: 3, y: 4, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          titre: "Deux droites candidates",
          enonce:
            "On a tracé deux droites pour ajuster ce nuage de cinq points : la bleue, $y = 2x - 2$, et l'orange, $y = x + 2$.\na) Calculer les coordonnées du point moyen $G$.\nb) Laquelle des deux droites passe par $G$ ?",
          figure: repere([-1, 6, -1, 9], [{ q: [0, 2, -2] }, { q: [0, 1, 2], couleur: ORANGE }], [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 6 },
            { x: 5, y: 8 },
          ]),
          correction:
            "a) $\\overline{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = 3$ ; $\\overline{y} = \\dfrac{1 + 2 + 3 + 6 + 8}{5} = \\dfrac{20}{5} = 4$. Donc $G(3 ; 4)$.\nb) Bleue : $2 \\times 3 - 2 = 4$. Elle passe par $G$.\nOrange : $3 + 2 = 5 \\neq 4$. Elle ne passe pas par $G$.\nLa droite bleue est la bonne candidate.\n⚠️ À l'œil, les deux droites « traversent le nuage » : c'est le calcul en $G$ qui tranche.",
          micros: ["info_point_moyen_droite", "info_point_moyen_calculer"],
        },
        {
          titre: "Publicité et ventes",
          enonce:
            "Pendant six mois, une entreprise a noté ses dépenses de publicité et ses ventes (modèle).\na) Calculer les coordonnées du point moyen $G$.\nb) Traduire par une phrase, en euros.\nc) Placer $G$ dans le nuage.",
          figure: tableauProba(
            ["Pub (milliers €)", "1", "1", "2", "4", "4", "6"],
            [["Ventes (dizaines de milliers €)", "2", "4", "4", "6", "7", "7"]],
          ),
          correction:
            "a) $\\overline{x} = \\dfrac{1 + 1 + 2 + 4 + 4 + 6}{6} = \\dfrac{18}{6} = 3$.\n$\\overline{y} = \\dfrac{2 + 4 + 4 + 6 + 7 + 7}{6} = \\dfrac{30}{6} = 5$. Donc $G(3 ; 5)$.\nb) En moyenne, l'entreprise a dépensé $3\\,000$ € de publicité et vendu pour $50\\,000$ € par mois.\nc) $G$ se place entre les points $(2 ; 4)$ et $(4 ; 6)$, sans être l'un d'eux.\n⚠️ Deux mois ont la même abscisse ($1$, puis $4$) : ils comptent chacun. On divise par $6$, le nombre de mois.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 8], [], [
              { x: 1, y: 2 },
              { x: 1, y: 4 },
              { x: 2, y: 4 },
              { x: 4, y: 6 },
              { x: 4, y: 7 },
              { x: 6, y: 7 },
              { x: 3, y: 5, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          titre: "Le point oublié",
          enonce:
            "Quatre randonnées sont représentées par un nuage : en abscisse, la distance en km ; en ordonnée, le dénivelé en CENTAINES de mètres. On connaît trois points, $(2 ; 3)$, $(3 ; 6)$ et $(5 ; 7)$, et le point moyen $G(4 ; 6)$. Trouver le quatrième point, puis placer les points et $G$.",
          correction:
            "Somme des $4$ abscisses : $4 \\times 4 = 16$. Les trois connues font $2 + 3 + 5 = 10$ : il manque $16 - 10 = 6$.\nSomme des $4$ ordonnées : $4 \\times 6 = 24$. Les trois connues font $3 + 6 + 7 = 16$ : il manque $24 - 16 = 8$.\nLe quatrième point est $(6 ; 8)$ : une randonnée de $6$ km et $800$ m de dénivelé.\n✔️ $\\dfrac{2 + 3 + 5 + 6}{4} = 4$ et $\\dfrac{3 + 6 + 7 + 8}{4} = 6$ : on retrouve bien $G(4 ; 6)$.",
          schema: ecranSeulement(
            repere([-1, 8, -1, 9], [], [
              { x: 2, y: 3 },
              { x: 3, y: 6 },
              { x: 5, y: 7 },
              { x: 6, y: 8 },
              { x: 4, y: 6, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          titre: "Le ressort",
          enonce:
            "En physique, on suspend des masses à un ressort et on mesure sa longueur. En abscisse, la masse en CENTAINES de grammes ; en ordonnée, la longueur en cm. Mesures : $(0 ; 4)$, $(1 ; 6)$, $(2 ; 9)$, $(3 ; 9)$, $(4 ; 12)$.\na) Calculer les coordonnées du point moyen $G$.\nb) Sans masse, le ressort mesure $4$ cm : la droite d'ajustement passe par $A(0 ; 4)$ et par $G$. Trouver son équation.\nc) De combien le ressort s'allonge-t-il pour chaque centaine de grammes ?",
          correction:
            "a) $\\overline{x} = \\dfrac{0 + 1 + 2 + 3 + 4}{5} = 2$ ; $\\overline{y} = \\dfrac{4 + 6 + 9 + 9 + 12}{5} = \\dfrac{40}{5} = 8$. Donc $G(2 ; 8)$.\nb) Coefficient directeur : $\\dfrac{8 - 4}{2 - 0} = \\dfrac{4}{2} = 2$. Ordonnée à l'origine : $4$ (le point $A$).\nLa droite a pour équation $y = 2x + 4$.\n✔️ En $G$ : $2 \\times 2 + 4 = 8$.\nc) Le coefficient directeur : $2$ cm pour chaque centaine de grammes.\n⭐ Les mesures sont un peu dispersées (erreurs de lecture), mais la droite par $G$ les résume bien.",
          schema: repere([-1, 5, -1, 13], [{ q: [0, 2, 4] }], [
            { x: 0, y: 4 },
            { x: 1, y: 6 },
            { x: 2, y: 9 },
            { x: 3, y: 9 },
            { x: 4, y: 12 },
            { x: 2, y: 8, label: "G" },
          ], undefined, true),
          micros: ["info_point_moyen_calculer", "info_point_moyen_droite"],
        },
        {
          titre: "La sortie exceptionnelle",
          enonce:
            "Une association ramasse des déchets dans la nature. Pour cinq sorties, on a noté le numéro de la sortie et la masse ramassée, en DIZAINES de kg. À la cinquième sortie, un dépôt sauvage a été découvert.\na) Calculer le point moyen $G$ des cinq points.\nb) Calculer le point moyen $G'$ des quatre premiers points seulement.\nc) Qu'observe-t-on ?",
          figure: repere([-1, 6, -1, 12], [], [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 11 },
          ], undefined, true),
          correction:
            "a) $\\overline{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = 3$ ; $\\overline{y} = \\dfrac{2 + 3 + 4 + 5 + 11}{5} = \\dfrac{25}{5} = 5$. Donc $G(3 ; 5)$.\nb) $\\overline{x} = \\dfrac{1 + 2 + 3 + 4}{4} = 2{,}5$ ; $\\overline{y} = \\dfrac{2 + 3 + 4 + 5}{4} = \\dfrac{14}{4} = 3{,}5$. Donc $G'(2{,}5 ; 3{,}5)$.\nc) Un seul point exceptionnel fait monter $G$ de $3{,}5$ à $5$ : $50$ kg au lieu de $35$ kg en moyenne.\n⚠️ Comme toute moyenne, le point moyen est sensible aux valeurs extrêmes.",
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          titre: "La population d'une ville",
          enonce:
            "La population d'une ville, en MILLIERS d'habitants, a été relevée tous les cinq ans (modèle) : $20$ en $2000$, $22$ en $2005$, $24$ en $2010$, $28$ en $2015$, $31$ en $2020$. On note $x$ le nombre de périodes de cinq ans depuis $2000$ ($x = 0$ pour $2000$).\na) Calculer les coordonnées du point moyen $G$. Est-ce un point du nuage ?\nb) Un tableur propose la droite d'ajustement $y = 2{,}8x + 19{,}4$. Passe-t-elle par $G$ ?\nc) Que signifie le nombre $2{,}8$ ?",
          correction:
            "a) $\\overline{x} = \\dfrac{0 + 1 + 2 + 3 + 4}{5} = 2$ ; $\\overline{y} = \\dfrac{20 + 22 + 24 + 28 + 31}{5} = \\dfrac{125}{5} = 25$. Donc $G(2 ; 25)$.\nCe n'est pas un point du nuage : en $2010$ ($x = 2$), la ville comptait $24$ milliers d'habitants, pas $25$.\nb) $2{,}8 \\times 2 + 19{,}4 = 5{,}6 + 19{,}4 = 25$. Oui, elle passe par $G$.\nc) Chaque période de cinq ans, la population augmente d'environ $2{,}8$ milliers, soit $2\\,800$ habitants.\n⭐ Le tableur calcule la droite ; nous, on sait la VÉRIFIER, en un calcul.",
          schema: ecranSeulement(
            tableauProba(
              ["x", "0", "1", "2", "3", "4", "Moyenne"],
              [["Population (milliers)", "20", "22", "24", "28", "31", "25"]],
              [[0, 3], [0, 6]],
            ),
          ),
          micros: ["info_point_moyen_calculer", "info_point_moyen_droite"],
        },
        {
          titre: "La droite de Tom",
          enonce:
            "Tom a tracé « à l'œil » la droite $y = x + 3$ pour ajuster ce nuage.\na) Calculer les coordonnées du point moyen $G$.\nb) La droite de Tom passe-t-elle par $G$ ?\nc) Proposer une droite de même coefficient directeur qui passe par $G$.",
          figure: repere([-1, 7, -1, 9], [{ q: [0, 1, 3], couleur: ORANGE }], [
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 7 },
            { x: 5, y: 8 },
            { x: 6, y: 8 },
          ]),
          correction:
            "a) $\\overline{x} = \\dfrac{2 + 3 + 4 + 5 + 6}{5} = \\dfrac{20}{5} = 4$ ; $\\overline{y} = \\dfrac{3 + 4 + 7 + 8 + 8}{5} = \\dfrac{30}{5} = 6$. Donc $G(4 ; 6)$.\nb) $4 + 3 = 7 \\neq 6$ : la droite de Tom passe AU-DESSUS de $G$.\nc) On garde le coefficient $1$ : $y = x + b$, avec $6 = 4 + b$, donc $b = 2$.\nLa droite $y = x + 2$ passe par $G$ : c'est celle de Tom, descendue d'une unité.\n⭐ Un ajustement « à l'œil » se corrige en un calcul, grâce au point moyen.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 9], [{ q: [0, 1, 2] }], [
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 7 },
              { x: 5, y: 8 },
              { x: 6, y: 8 },
              { x: 4, y: 6, label: "G" },
            ]),
          ),
          micros: ["info_point_moyen_droite", "info_point_moyen_placer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Calculer le point moyen, le placer, et s'en servir pour juger une droite d'ajustement.",
      rappel: [
        "$G(\\overline{x} ; \\overline{y})$ : deux moyennes, avec les unités des axes.",
        "Une droite d'ajustement passe par $G$ ; mais passer par $G$ ne suffit pas : elle doit aussi suivre la tendance du nuage.",
        "On traduit toujours $G$ et les coefficients par une phrase, dans les unités de l'énoncé.",
      ],
      exercices: [
        {
          titre: "Le niveau de la mer",
          enonce:
            "Dans un port, on a relevé l'élévation du niveau moyen de la mer, en cm, par rapport à l'an $2000$ (modèle). En abscisse, le nombre de périodes de cinq ans depuis $2000$ : $(0 ; 0)$, $(1 ; 2)$, $(2 ; 4)$, $(3 ; 4)$, $(4 ; 5)$.\na) Calculer les coordonnées du point moyen $G$, et le placer.\nb) Deux élèves proposent une droite : Inès $y = 1{,}2x + 0{,}6$ (bleue), Hugo $y = -x + 5$ (orange). Vérifier que les deux passent par $G$.\nc) Laquelle ajuste le nuage ? Pourquoi passer par $G$ ne suffit-il pas ?\nd) D'après la droite d'Inès, de combien la mer monte-t-elle en cinq ans ? en un an, en mm ?",
          correction:
            "a) $\\overline{x} = \\dfrac{0 + 1 + 2 + 3 + 4}{5} = 2$ ; $\\overline{y} = \\dfrac{0 + 2 + 4 + 4 + 5}{5} = \\dfrac{15}{5} = 3$. Donc $G(2 ; 3)$.\nb) Inès : $1{,}2 \\times 2 + 0{,}6 = 2{,}4 + 0{,}6 = 3$. Hugo : $-2 + 5 = 3$. Les deux passent par $G$.\nc) Le nuage est croissant : seule la droite d'Inès (coefficient positif) suit la tendance. Celle d'Hugo descend.\nPasser par $G$ est NÉCESSAIRE pour une droite d'ajustement, mais pas SUFFISANT : une infinité de droites passent par $G$.\nd) Le coefficient $1{,}2$ : $1{,}2$ cm tous les cinq ans, soit $12$ mm en $5$ ans, donc $2{,}4$ mm par an.",
          schema: repere([-1, 5, -1, 7], [{ q: [0, 1.2, 0.6] }, { q: [0, -1, 5], couleur: ORANGE }], [
            { x: 0, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 2, y: 3, label: "G" },
          ]),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer", "info_point_moyen_droite"],
        },
        {
          titre: "Les éoliennes",
          enonce:
            "Six éoliennes d'un parc ont des mâts de hauteurs différentes (en DIZAINES de mètres) et des puissances différentes (en CENTAINES de kW), données par le tableau (modèle).\na) Calculer les coordonnées du point moyen $G$, et les traduire.\nb) Parmi $y = 1{,}5x - 3$ et $y = 2x - 7$, quelle droite peut ajuster ce nuage ?\nc) Avec cette droite, que gagne-t-on en moyenne en puissance pour $10$ m de mât en plus ?",
          figure: tableauProba(
            ["Hauteur", "6", "8", "8", "10", "12", "16"],
            [["Puissance", "5", "8", "9", "11", "15", "24"]],
          ),
          correction:
            "a) $\\overline{x} = \\dfrac{6 + 8 + 8 + 10 + 12 + 16}{6} = \\dfrac{60}{6} = 10$ ; $\\overline{y} = \\dfrac{5 + 8 + 9 + 11 + 15 + 24}{6} = \\dfrac{72}{6} = 12$.\n$G(10 ; 12)$ : en moyenne, un mât de $100$ m et une puissance de $1\\,200$ kW.\nb) $1{,}5 \\times 10 - 3 = 12$ : la première passe par $G$. $2 \\times 10 - 7 = 13 \\neq 12$ : la seconde non.\nOn garde $y = 1{,}5x - 3$.\nc) $10$ m, c'est $1$ unité en abscisse : la puissance gagne $1{,}5$ centaine de kW, soit $150$ kW.\n⭐ En hauteur, le vent est plus fort et plus régulier : d'où des mâts de plus en plus hauts.",
          micros: ["info_point_moyen_calculer", "info_point_moyen_droite"],
        },
        {
          titre: "Deux groupes, un point moyen",
          enonce:
            "Un nuage est formé de deux groupes de points. Le groupe $A$ a $4$ points et pour point moyen $G_A(2 ; 3)$. Le groupe $B$ a $6$ points et pour point moyen $G_B(7 ; 8)$.\na) Quelle est la somme des abscisses du groupe $A$ ? du groupe $B$ ?\nb) Calculer les coordonnées du point moyen $G$ des $10$ points.\nc) Léo dit : « $G$ est le milieu de $G_A$ et $G_B$. » Qu'en penser ? Placer les trois points.",
          correction:
            "a) Groupe $A$ : $4 \\times 2 = 8$. Groupe $B$ : $6 \\times 7 = 42$.\nb) $\\overline{x} = \\dfrac{8 + 42}{10} = 5$.\nPour les ordonnées : $4 \\times 3 = 12$ et $6 \\times 8 = 48$, donc $\\overline{y} = \\dfrac{12 + 48}{10} = 6$.\n$G(5 ; 6)$.\nc) Le milieu de $G_A$ et $G_B$ serait $(4{,}5 ; 5{,}5)$. Léo a tort : le groupe $B$ a plus de points, il « tire » $G$ vers lui.\n$G$ est bien sur le segment $[G_A G_B]$, mais plus près de $G_B$.\n⚠️ On ne fait pas la moyenne de deux moyennes de groupes de tailles différentes.",
          schema: repere([-1, 9, -1, 9], [{ pts: [[2, 3], [7, 8]] }], [
            { x: 2, y: 3, label: "A" },
            { x: 7, y: 8, label: "B" },
            { x: 5, y: 6, label: "G" },
          ]),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer"],
        },
        {
          titre: "Les forfaits mobiles",
          enonce:
            "Cinq forfaits mobiles (modèle) : en abscisse, les données incluses en DIZAINES de Go ; en ordonnée, le prix mensuel en euros. Points : $(1 ; 4)$, $(2 ; 6)$, $(4 ; 7)$, $(5 ; 10)$, $(8 ; 13)$.\na) Calculer les coordonnées du point moyen $G$.\nb) Vérifier que la droite $y = 1{,}1x + 3{,}6$ passe par $G$. Placer le nuage, $G$ et la droite.\nc) Pour chaque forfait, calculer le prix « attendu » par la droite. Quel forfait est le plus cher par rapport à la droite ? le plus avantageux ?",
          correction:
            "a) $\\overline{x} = \\dfrac{1 + 2 + 4 + 5 + 8}{5} = \\dfrac{20}{5} = 4$ ; $\\overline{y} = \\dfrac{4 + 6 + 7 + 10 + 13}{5} = \\dfrac{40}{5} = 8$. Donc $G(4 ; 8)$.\nb) $1{,}1 \\times 4 + 3{,}6 = 4{,}4 + 3{,}6 = 8$ : la droite passe par $G$.\nc) Prix attendus : $4{,}70$ € ; $5{,}80$ € ; $8$ € ; $9{,}10$ € ; $12{,}40$ €.\nÉcarts (prix réel − prix attendu) : $-0{,}70$ ; $+0{,}20$ ; $-1$ ; $+0{,}90$ ; $+0{,}60$.\nLe plus cher par rapport à la droite : le forfait de $50$ Go ($+0{,}90$ €).\nLe plus avantageux : celui de $40$ Go ($1$ € de moins que prévu).\n⭐ La droite sert d'étalon : un point sous la droite est « bon marché » pour ce qu'il offre.",
          schema: repere([-1, 9, -1, 14], [{ q: [0, 1.1, 3.6] }], [
            { x: 1, y: 4 },
            { x: 2, y: 6 },
            { x: 4, y: 7 },
            { x: 5, y: 10 },
            { x: 8, y: 13 },
            { x: 4, y: 8, label: "G" },
          ], undefined, true),
          micros: ["info_point_moyen_calculer", "info_point_moyen_placer", "info_point_moyen_droite"],
        },
      ],
    },
  ],
};
