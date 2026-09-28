// ─── Fiche d'exercices : les droites (1re, automatismes) ──────────────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur le modèle de l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/lecture-graphique.bank.ts` : la
// droite y = −x/2 + 1 à reconnaître (Antilles), le coefficient directeur à
// partir de deux points (Métropole : A(−1 ; 2), B(−3 ; 4), exercice 6),
// l'équation réduite d'une droite tracée (Centres étrangers), juin 2026.
//
// ⭐⭐ LE FIL : DEUX NOMBRES, DEUX SENS. b, l'ordonnée à l'origine, est une
// valeur de DÉPART (frais fixes, abonnement, niveau initial) ; a, le coefficient
// directeur, est une VITESSE, avec son unité (euros par heure, km par an,
// habitants par an). Le corrigé dessine l'ESCALIER du coefficient directeur :
// on avance de 1 (ou de 2), on monte de a (ou de 2a).
// Pièges nommés : échanger a et b (5), le signe de x_B − x_A (6), une pente non
// entière (5, 14, 16), affine n'est pas proportionnel (13, 17, 20), deux points
// font toujours une droite, c'est le troisième qui juge (19).
//
// ⭐ Frédéric, 28/09 : liens à l'ÉCONOMIE et à l'HISTOIRE-GÉO — taxis, location,
// facture d'électricité, prix d'une maison, food-truck, carte de réduction ;
// glacier, montée des eaux, citerne agricole, maïs, étape du Tour de France,
// croissance d'une ville. Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-droites.mjs`.
//
// Micro-compétences : auto_fct_lineaire_affine (1, 2, 8, 9, 13, 17, 19, 20),
// auto_fct_tracer_droite (3, 4, 9, 16, 18), auto_fct_lire_equation_reduite (5,
// 7, 8, 10, 11, 13, 14, 16, 17, 18, 20), auto_fct_coefficient_directeur (6, 7,
// 11, 12, 15, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les droites qu'on LIT et les escaliers restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const VERT = "#16a34a";

export const exercicesAutoDroitesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-droites",
  titre: "Droites et coefficient directeur",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : reconnaître une fonction affine ou linéaire, tracer une droite, lire son équation réduite, calculer un coefficient directeur à partir de deux points. Un rappel de cours de trois lignes avant chaque niveau, et une correction qui dessine l'escalier du coefficient directeur.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Une fonction affine s'écrit $f(x) = ax + b$ : sa courbe est une DROITE. Si $b = 0$, elle est linéaire, et sa droite passe par l'origine.",
        "$b$, l'ordonnée à l'origine, se lit là où la droite coupe l'axe vertical.",
        "$a$, le coefficient directeur : quand on avance de $1$, la droite monte de $a$ (elle descend si $a < 0$).",
        "Avec deux points : $a = \\dfrac{y_B - y_A}{x_B - x_A}$, dans le même ordre en haut et en bas.",
      ],
      exercices: [
        {
          enonce: "Parmi ces fonctions, lesquelles sont affines ? lesquelles sont linéaires ?\n$f(x) = 3x - 2$ ; $g(x) = -5x$ ; $h(x) = x^2 + 1$ ; $k(x) = \\dfrac{1}{x}$ ; $l(x) = 7$ ; $u(x) = \\dfrac{x}{2} + 4$.",
          correction:
            "Affine : de la forme $ax + b$, sans carré et sans $x$ au dénominateur.\n$f$ est affine ($a = 3$, $b = -2$). $g$ est affine ET linéaire ($b = 0$). $u(x) = \\dfrac{x}{2} + 4 = 0{,}5x + 4$ est affine.\n$l(x) = 7$ est affine aussi, avec $a = 0$ : sa droite est horizontale.\n$h$ (un carré) et $k$ ($x$ au dénominateur) ne sont pas affines : leurs courbes ne sont pas des droites.\n⚠️ $\\dfrac{x}{2}$ est affine, $\\dfrac{1}{x}$ ne l'est pas : tout dépend de la place du $x$.",
          micros: ["auto_fct_lineaire_affine"],
        },
        {
          enonce: "Une fonction linéaire $f$ vérifie $f(4) = 10$. Donner son expression, puis calculer $f(6)$.",
          correction:
            "Linéaire : $f(x) = ax$. Donc $f(4) = 4a = 10$, et $a = \\dfrac{10}{4} = 2{,}5$.\n$f(x) = 2{,}5x$, et $f(6) = 2{,}5 \\times 6 = 15$.\n⭐ Une fonction linéaire traduit la PROPORTIONNALITÉ : $4 \\to 10$, donc $6 \\to 15$, comme dans un tableau de proportionnalité.\n⚠️ Ce raisonnement ne marche pas pour une fonction affine avec $b \\neq 0$.",
          micros: ["auto_fct_lineaire_affine"],
        },
        {
          enonce: "Tracer la droite d'équation $y = 2x - 1$.",
          correction:
            "On place l'ordonnée à l'origine : le point $(0 ; -1)$.\nDepuis ce point, on avance de $1$ et on monte de $2$, le coefficient directeur : on arrive en $(1 ; 1)$.\nOn trace la droite qui passe par ces deux points.\n✔️ Un troisième point pour vérifier : pour $x = 3$, $y = 2 \\times 3 - 1 = 5$. Le point $(3 ; 5)$ est bien sur la droite.\n⚠️ On avance de $1$ PUIS on monte de $2$ : pas l'inverse.",
          schema: repere([-2, 4, -4, 7], [{ q: [0, 2, -1] }, { pts: [[0, -1], [1, -1], [1, 1]], couleur: ORANGE }], [
            { x: 0, y: -1, label: "" },
            { x: 1, y: 1, label: "" },
            { x: 3, y: 5, label: "" },
          ], undefined, true),
          micros: ["auto_fct_tracer_droite"],
        },
        {
          enonce: "Tracer la droite qui passe par $A(1 ; 3)$ et qui a pour coefficient directeur $-2$. Donner son équation réduite.",
          correction:
            "On place $A(1 ; 3)$. Coefficient directeur $-2$ : on avance de $1$ et on DESCEND de $2$. On arrive en $(2 ; 1)$.\nOn trace la droite qui passe par ces deux points.\nSon équation est $y = -2x + b$, et elle passe par $A$ : $3 = -2 \\times 1 + b$, donc $b = 5$. C'est $y = -2x + 5$.\n✔️ Sur le dessin, la droite coupe bien l'axe vertical en $5$.\n⚠️ Un coefficient directeur négatif fait DESCENDRE la droite.",
          schema: repere([-1, 4, -3, 7], [{ q: [0, -2, 5] }, { pts: [[1, 3], [2, 3], [2, 1]], couleur: ORANGE }], [
            { x: 1, y: 3, label: "A" },
            { x: 2, y: 1, label: "" },
            { x: 0, y: 5, label: "" },
          ]),
          micros: ["auto_fct_tracer_droite"],
        },
        {
          enonce: "Lire l'équation réduite de la droite tracée.",
          figure: repere([-3, 4, -3, 6], [{ q: [0, 1.5, -1] }]),
          correction:
            "$b$ se lit à l'intersection avec l'axe vertical : $b = -1$.\nPour $a$, on cherche deux points sur les nœuds de la grille. De $(0 ; -1)$ à $(2 ; 2)$, on avance de $2$ et on monte de $3$ : $a = \\dfrac{3}{2} = 1{,}5$.\nLa droite a pour équation $y = 1{,}5x - 1$.\n⭐ Quand la pente n'est pas entière, on avance de plusieurs carreaux, jusqu'à retomber sur un nœud de la grille.\n⚠️ Ne pas échanger $a$ et $b$ : $y = -x + 1{,}5$ serait une tout autre droite.",
          schema: repere([-3, 4, -3, 6], [{ q: [0, 1.5, -1] }, { pts: [[0, -1], [2, -1], [2, 2]], couleur: ORANGE }], [
            { x: 0, y: -1, label: "" },
            { x: 2, y: 2, label: "" },
          ]),
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          enonce: "Calculer le coefficient directeur de la droite $(AB)$, avec $A(-1 ; 2)$ et $B(-3 ; 4)$.",
          correction:
            "$a = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{4 - 2}{-3 - (-1)} = \\dfrac{2}{-2} = -1$.\n⚠️ Le piège : $-3 - (-1) = -3 + 1 = -2$, et non $-4$.\n✔️ Sur le dessin : de $B$ vers $A$, on avance de $2$ et on descend de $2$. La droite descend : $a$ est bien négatif.\n⭐ C'est une question du sujet de Métropole, juin 2026.",
          schema: repere([-4, 1, -1, 6], [{ q: [0, -1, 1] }, { pts: [[-3, 4], [-1, 4], [-1, 2]], couleur: ORANGE }], [
            { x: -1, y: 2, label: "A" },
            { x: -3, y: 4, label: "B" },
          ]),
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          enonce: "On donne $A(2 ; 1)$ et $B(6 ; 3)$. Calculer le coefficient directeur de la droite $(AB)$, puis son équation réduite.",
          correction:
            "$a = \\dfrac{3 - 1}{6 - 2} = \\dfrac{2}{4} = 0{,}5$.\nLa droite $y = 0{,}5x + b$ passe par $A$ : $1 = 0{,}5 \\times 2 + b$, soit $1 = 1 + b$, donc $b = 0$.\nL'équation est $y = 0{,}5x$ : la droite passe par l'origine, la fonction est linéaire.\n✔️ Avec $B$ : $0{,}5 \\times 6 = 3$.",
          schema: ecranSeulement(repere([-1, 7, -1, 5], [{ q: [0, 0.5, 0] }], [
            { x: 2, y: 1, label: "A" },
            { x: 6, y: 3, label: "B" },
            { x: 0, y: 0, label: "" },
          ])),
          micros: ["auto_fct_coefficient_directeur", "auto_fct_lire_equation_reduite"],
        },
        {
          enonce: "Associer chaque droite à son équation : $y = 2x$ ; $y = -x + 3$ ; $y = 3$.",
          figure: repere([-3, 4, -3, 7], [{ q: [0, 2, 0] }, { q: [0, -1, 3], couleur: ORANGE }, { q: [0, 0, 3], couleur: VERT }]),
          correction:
            "La verte est horizontale : $a = 0$, c'est $y = 3$.\nLa bleue passe par l'origine et monte de $2$ quand on avance de $1$ : c'est $y = 2x$, une fonction linéaire.\nL'orange descend et coupe l'axe vertical en $3$ : c'est $y = -x + 3$.\n⭐ Trois questions suffisent : la droite monte-t-elle ou descend-elle ? Passe-t-elle par l'origine ? Où coupe-t-elle l'axe vertical ?\n⚠️ $y = 3$ et $y = -x + 3$ coupent l'axe vertical au même point : c'est le signe de $a$ qui les distingue.",
          micros: ["auto_fct_lineaire_affine", "auto_fct_lire_equation_reduite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la situation par une droite, puis répondre avec l'unité. Sans calculatrice.",
      rappel: [
        "Dans un problème, $b$ est souvent un montant FIXE (abonnement, prise en charge) ; $a$, un montant PAR unité (par heure, par km, par an).",
        "Deux points suffisent pour tracer une droite ; un troisième sert à vérifier.",
        "$a = \\dfrac{\\text{variation de } y}{\\text{variation de } x}$ : c'est une vitesse, avec une unité (euros par heure, km par an…).",
      ],
      exercices: [
        {
          titre: "Deux taxis",
          enonce:
            "Un premier taxi facture $3$ € de prise en charge, puis $1$ € par km. Un second ne facture rien au départ, mais $2$ € par km (chiffres d'un modèle).\na) Écrire les prix $T_1(x)$ et $T_2(x)$ pour $x$ km. Laquelle de ces fonctions est linéaire ?\nb) Expliquer comment tracer les deux droites.\nc) Pour quelles distances le second taxi est-il le moins cher ?",
          correction:
            "a) $T_1(x) = x + 3$ : affine, $3$ € fixes plus $1$ € par km. $T_2(x) = 2x$ : linéaire, le prix est proportionnel à la distance.\nb) $T_1$ : on part de $(0 ; 3)$, on avance de $1$, on monte de $1$. $T_2$ : on part de l'origine, on avance de $1$, on monte de $2$.\nc) Les droites se croisent en $(3 ; 6)$ : pour $3$ km, les deux taxis coûtent $6$ €. Avant $3$ km, la droite de $T_2$ est en dessous : le second taxi est moins cher. Après, c'est le premier.\n✔️ $T_1(3) = 3 + 3 = 6$ et $T_2(3) = 2 \\times 3 = 6$.\n⚠️ On répond par des DISTANCES : « moins de $3$ km », pas « moins de $6$ € ».",
          schema: repere([-1, 6, -1, 11], [{ q: [0, 1, 3] }, { q: [0, 2, 0], couleur: ORANGE }], [
            { x: 0, y: 3, label: "" },
            { x: 0, y: 0, label: "" },
            { x: 3, y: 6, label: "3 km" },
          ], undefined, true),
          micros: ["auto_fct_lineaire_affine", "auto_fct_tracer_droite"],
        },
        {
          titre: "La location de kayaks",
          enonce:
            "La droite donne le prix d'une location de kayak, en euros, en fonction du nombre d'heures.\na) Lire l'ordonnée à l'origine et le coefficient directeur. Que signifient-ils ?\nb) En déduire l'équation réduite.\nc) Combien coûte une location de $8$ heures ?",
          figure: repere([-1, 6, -1, 13], [{ q: [0, 2, 3] }], [], undefined, true),
          correction:
            "a) La droite coupe l'axe vertical en $3$ : $b = 3$, les $3$ € payés au départ, même pour $0$ heure. Quand on avance d'une heure, elle monte de $2$ : $a = 2$, soit $2$ € par heure.\nb) $y = 2x + 3$.\nc) $2 \\times 8 + 3 = 19$ € : hors du dessin, l'équation prend le relais.\n⭐ Connaître l'équation d'une droite, c'est pouvoir calculer au-delà du graphique.",
          schema: repere([-1, 6, -1, 13], [{ q: [0, 2, 3] }, { pts: [[0, 3], [1, 3], [1, 5]], couleur: ORANGE }], [
            { x: 0, y: 3, label: "b = 3" },
            { x: 1, y: 5, label: "" },
          ], undefined, true),
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          titre: "Un glacier qui recule",
          enonce:
            "Dans ce modèle, un glacier des Alpes mesurait $6$ km de long en 1980 et $4{,}5$ km en 2010. On suppose que sa longueur diminue de façon affine.\na) Calculer le coefficient directeur, en km par an.\nb) Donner l'équation réduite, avec $x$ le nombre d'années depuis 1980.\nc) Quelle longueur ce modèle prévoit-il pour 2030 ?",
          correction:
            "a) $a = \\dfrac{4{,}5 - 6}{2010 - 1980} = \\dfrac{-1{,}5}{30} = -0{,}05$ : le glacier perd $0{,}05$ km, soit $50$ m, par an.\nb) En 1980, $x = 0$ et la longueur vaut $6$ : $b = 6$. Donc $L(x) = -0{,}05x + 6$.\nc) 2030, c'est $x = 50$ : $-0{,}05 \\times 50 + 6 = -2{,}5 + 6 = 3{,}5$ km.\nSur le dessin, une unité horizontale vaut dix ans : la droite perd $0{,}5$ km par décennie.\n⚠️ Le coefficient directeur a une UNITÉ : ici, des kilomètres par an.\n⭐ Prolonger une droite, c'est supposer que la tendance continue : une hypothèse, pas une certitude.",
          schema: ecranSeulement(repere([-1, 6, -1, 8], [{ q: [0, -0.5, 6] }], [
            { x: 0, y: 6, label: "1980" },
            { x: 3, y: 4.5, label: "2010" },
            { x: 5, y: 3.5, label: "2030" },
          ])),
          micros: ["auto_fct_coefficient_directeur", "auto_fct_lire_equation_reduite"],
        },
        {
          titre: "Une étape du Tour de France",
          enonce:
            "Pendant une étape, un coureur roule à vitesse constante (chiffres d'un modèle). À $9$ h, il a parcouru $20$ km ; à $11$ h, $60$ km.\na) Calculer le coefficient directeur de la droite « distance en fonction de l'heure ». Que représente-t-il ?\nb) Quelle distance a-t-il parcourue à $10$ h ?\nc) À quelle heure est-il parti ?",
          correction:
            "a) $a = \\dfrac{60 - 20}{11 - 9} = \\dfrac{40}{2} = 20$ : $20$ km par heure, c'est sa VITESSE.\nb) À $10$ h, une heure après $9$ h : $20 + 20 = 40$ km.\nc) Il avait fait $20$ km à $9$ h, à $20$ km par heure : une heure plus tôt, à $8$ h, il était à $0$ km. Il est parti à $8$ h.\n⚠️ Même ordre en haut et en bas : $60 - 20$ sur $11 - 9$.",
          schema: ecranSeulement(repere([-1, 4, -1, 8], [{ q: [0, 2, 0] }, { pts: [[1, 2], [2, 2], [2, 4]], couleur: ORANGE }], [
            { x: 0, y: 0, label: "8 h" },
            { x: 1, y: 2, label: "9 h" },
            { x: 3, y: 6, label: "11 h" },
          ])),
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          titre: "La facture d'électricité",
          enonce:
            "Le tableau donne le montant d'une facture d'électricité, en euros, selon la consommation, en centaines de kWh (chiffres d'un modèle).\na) La facture est-elle une fonction affine de la consommation ? Justifier.\nb) Donner son expression. Que représentent les deux nombres ?\nc) La facture est-elle proportionnelle à la consommation ?",
          figure: tableau(["consommation (centaines de kWh)", "0", "1", "2", "3"], ["facture (€)", 12, 37, 62, 87]),
          correction:
            "a) Quand la consommation augmente de $1$, la facture augmente toujours de $25$ € : $37 - 12 = 62 - 37 = 87 - 62 = 25$. Des hausses égales : la fonction est affine.\nb) $f(x) = 25x + 12$ : $12$ € d'abonnement, payés même sans rien consommer, et $25$ € par centaine de kWh.\nc) Non : pour $0$ kWh, on paie $12$ €, pas $0$. Doubler la consommation ne double pas la facture : $f(2) = 62$, et non $2 \\times 37 = 74$.\n⚠️ Affine n'est pas proportionnel : il faut $b = 0$ pour être linéaire.",
          micros: ["auto_fct_lineaire_affine", "auto_fct_lire_equation_reduite"],
        },
        {
          titre: "Une citerne agricole",
          enonce:
            "La droite donne le volume d'eau d'une citerne agricole, en m³, en fonction du nombre de jours sans pluie (chiffres d'un modèle).\na) Lire l'équation réduite de la droite.\nb) Au bout de combien de jours la citerne est-elle vide ?\nc) Que signifie le signe du coefficient directeur ?",
          figure: repere([-1, 7, -1, 11], [{ q: [0, -1.5, 9] }], [], undefined, true),
          correction:
            "a) La droite coupe l'axe vertical en $9$ : $b = 9$. De $(0 ; 9)$ à $(2 ; 6)$, on avance de $2$ et on descend de $3$ : $a = \\dfrac{-3}{2} = -1{,}5$. Équation : $y = -1{,}5x + 9$.\nb) La droite coupe l'axe horizontal en $6$ : la citerne est vide au bout de $6$ jours. Calcul : $-1{,}5 \\times 6 + 9 = 0$. ✔️\nc) $a = -1{,}5 < 0$ : la citerne PERD $1{,}5$ m³ par jour.\n⚠️ La droite descend, donc le coefficient directeur est négatif. Oublier le signe moins, c'est faire monter l'eau.",
          schema: repere([-1, 7, -1, 11], [{ q: [0, -1.5, 9] }, { pts: [[0, 9], [2, 9], [2, 6]], couleur: ORANGE }], [
            { x: 0, y: 9, label: "b = 9" },
            { x: 2, y: 6, label: "" },
            { x: 6, y: 0, label: "vide" },
          ], undefined, true),
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          titre: "Le prix d'une maison",
          enonce:
            "Dans un village, une maison valait $120\\,000$ € en 2015 et $150\\,000$ € en 2021 (chiffres d'un modèle). On suppose une évolution affine.\na) Calculer le coefficient directeur, en euros par an.\nb) Quel prix ce modèle donne-t-il pour 2018 ? pour 2025 ?",
          correction:
            "a) $a = \\dfrac{150\\,000 - 120\\,000}{2021 - 2015} = \\dfrac{30\\,000}{6} = 5\\,000$ : le prix monte de $5\\,000$ € par an.\nb) 2018 : $120\\,000 + 3 \\times 5\\,000 = 135\\,000$ €. 2025 : $150\\,000 + 4 \\times 5\\,000 = 170\\,000$ €.\n⭐ Une évolution affine ajoute la MÊME somme chaque année ; une évolution en pourcentage, non.\n⚠️ Calculer $150\\,000 - 120\\,000$ ne suffit pas : il faut encore diviser par le nombre d'années.",
          schema: ecranSeulement(tableau(["année", "2015", "2018", "2021", "2025"], ["prix (€)", "120 000", "135 000", "150 000", "170 000"])),
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          titre: "Une ville qui grandit",
          enonce:
            "Une ville compte $4\\,000$ habitants en 2020 et gagne $500$ habitants par an (chiffres d'un modèle).\na) Écrire sa population $P(x)$, en milliers, $x$ années après 2020.\nb) Pour tracer la droite, quel point placer d'abord ? Comment dessiner la pente ?\nc) En quelle année la ville atteint-elle $7\\,000$ habitants ?",
          correction:
            "a) $P(x) = 0{,}5x + 4$, en milliers : $4$ au départ, $+0{,}5$ par an.\nb) On place $(0 ; 4)$. Avancer d'un an et monter de $0{,}5$, c'est un demi-carreau : difficile à tracer. On avance plutôt de $2$ ans et on monte de $1$ : on arrive en $(2 ; 5)$.\nc) $0{,}5x + 4 = 7$ donne $0{,}5x = 3$, donc $x = 6$ : en 2026.\n⭐ Pour tracer une pente de $0{,}5$, on double tout : $2$ en avant, $1$ en haut.",
          schema: repere([-1, 8, -1, 9], [{ q: [0, 0.5, 4] }, { pts: [[0, 4], [2, 4], [2, 5]], couleur: ORANGE }], [
            { x: 0, y: 4, label: "" },
            { x: 6, y: 7, label: "2026" },
          ]),
          micros: ["auto_fct_tracer_droite", "auto_fct_lire_equation_reduite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "Équation de la droite qui passe par $A$ et $B$ : d'abord $a = \\dfrac{y_B - y_A}{x_B - x_A}$, puis $b$ en remplaçant $x$ et $y$ par les coordonnées de $A$.",
        "On dit ce que représentent $a$ (une vitesse, un prix par unité) et $b$ (une valeur de départ, un montant fixe).",
        "Là où deux droites se croisent, les deux grandeurs sont égales : on lit l'ABSCISSE du point.",
      ],
      exercices: [
        {
          titre: "Le seuil de rentabilité d'un food-truck",
          enonce:
            "Un food-truck vend des repas. En bleu, sa recette $R$ ; en orange, ses coûts $C$ ; en centaines d'euros, pour $x$ dizaines de repas par jour (chiffres d'un modèle).\na) Lire l'équation réduite de chaque droite. Laquelle représente une fonction linéaire ?\nb) Que représentent les nombres $4$ et $1$ de l'équation des coûts ?\nc) Pour combien de repas la recette couvre-t-elle exactement les coûts ?\nd) Écrire le bénéfice $B(x) = R(x) - C(x)$. Est-ce une fonction affine ?",
          figure: repere([-1, 7, -1, 13], [{ q: [0, 2, 0] }, { q: [0, 1, 4], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) Bleue : elle passe par l'origine et monte de $2$ par unité : $R(x) = 2x$, une fonction linéaire. Orange : elle coupe l'axe vertical en $4$ et monte de $1$ : $C(x) = x + 4$.\nb) $4$ centaines d'euros de frais fixes par jour (emplacement, camion), payés même sans rien vendre ; puis $1$ centaine d'euros par dizaine de repas, soit $10$ € par repas.\nc) Les droites se croisent en $(4 ; 8)$ : pour $40$ repas, recette et coûts valent $800$ €.\nd) $B(x) = 2x - (x + 4) = x - 4$ : affine, avec $a = 1$ et $b = -4$. Le bénéfice est négatif avant $40$ repas, positif après.\n⭐ Le prix de vente se lit aussi : $R(x) = 2x$, soit $2$ centaines d'euros par dizaine de repas, $20$ € le repas.\n⚠️ Attention aux unités : $x = 4$, ce sont $40$ repas ; $8$ en ordonnée, ce sont $800$ €.",
          schema: repere([-1, 7, -1, 13], [{ q: [0, 2, 0] }, { q: [0, 1, 4], couleur: ORANGE }, { pts: [[0, 4], [1, 4], [1, 5]], couleur: ORANGE }], [
            { x: 4, y: 8, label: "40 repas" },
            { x: 0, y: 4, label: "" },
          ], undefined, true),
          micros: ["auto_fct_lineaire_affine", "auto_fct_lire_equation_reduite"],
        },
        {
          titre: "La montée des eaux",
          enonce:
            "Dans ce modèle, le niveau moyen de la mer dans un port vaut $0$ cm en 1990 (niveau de référence) et $6$ cm en 2020 ; on suppose une montée affine.\na) Calculer le coefficient directeur, en cm par an, puis en cm par décennie.\nb) Donner l'équation réduite, avec $x$ en décennies depuis 1990.\nc) Comment tracer la droite ?\nd) Si la tendance continuait, en quelle année le niveau atteindrait-il $10$ cm ?",
          correction:
            "a) $a = \\dfrac{6 - 0}{2020 - 1990} = \\dfrac{6}{30} = 0{,}2$ cm par an, soit $0{,}2 \\times 10 = 2$ cm par décennie.\nb) En décennies, $a = 2$ ; en 1990 ($x = 0$), le niveau vaut $0$, donc $b = 0$. L'équation est $y = 2x$ : une fonction linéaire.\nc) On part de l'origine ; on avance d'une décennie et on monte de $2$ cm.\nd) $2x = 10$ donne $x = 5$ : cinq décennies après 1990, en 2040.\n⚠️ Le coefficient directeur dépend de l'unité choisie en abscisse : $0{,}2$ par an, c'est $2$ par décennie.\n⭐ Un modèle affine suppose une montée régulière ; si elle s'accélère, la droite sous-estime l'avenir.",
          schema: repere([-1, 7, -1, 14], [{ q: [0, 2, 0] }, { pts: [[0, 0], [1, 0], [1, 2]], couleur: ORANGE }], [
            { x: 3, y: 6, label: "" },
            { x: 5, y: 10, label: "2040" },
          ], undefined, true),
          micros: ["auto_fct_coefficient_directeur", "auto_fct_lire_equation_reduite", "auto_fct_tracer_droite"],
        },
        {
          titre: "La croissance d'un plant de maïs",
          enonce:
            "Un agriculteur mesure un plant de maïs : $20$ cm au jour $10$, $50$ cm au jour $20$, $90$ cm au jour $30$ (chiffres d'un modèle).\na) Calculer la vitesse de croissance entre les jours $10$ et $20$, puis entre les jours $20$ et $30$.\nb) La hauteur est-elle une fonction affine du temps ?\nc) Un modèle affine construit sur les jours $10$ et $20$ prévoirait quelle hauteur au jour $30$ ?",
          correction:
            "a) Entre les jours $10$ et $20$ : $\\dfrac{50 - 20}{20 - 10} = \\dfrac{30}{10} = 3$ cm par jour.\nEntre les jours $20$ et $30$ : $\\dfrac{90 - 50}{30 - 20} = \\dfrac{40}{10} = 4$ cm par jour.\nb) Les deux coefficients directeurs sont différents : les trois points ne sont pas alignés, la hauteur n'est pas une fonction affine du temps. La croissance accélère.\nc) Le modèle affine ajoute $3$ cm par jour : $50 + 3 \\times 10 = 80$ cm, au lieu des $90$ cm mesurés.\n⚠️ Deux points donnent toujours une droite : c'est le troisième qui dit si le modèle affine tient.\n⭐ Sur le dessin (une unité $= 10$ jours en abscisse, $10$ cm en ordonnée), la ligne bleue se redresse et quitte la droite orange.",
          schema: repere([-1, 4, -2, 11], [{ pts: [[1, 2], [2, 5], [3, 9]] }, { q: [0, 3, -1], couleur: ORANGE }], [
            { x: 3, y: 9, label: "90 cm" },
            { x: 3, y: 8, label: "" },
          ], undefined, true),
          micros: ["auto_fct_coefficient_directeur", "auto_fct_lineaire_affine"],
        },
        {
          titre: "La carte de réduction",
          enonce:
            "Une carte de réduction de train coûte $40$ € par an, et chaque trajet coûte alors $10$ €. Sans carte, un trajet coûte $15$ € (chiffres d'un modèle).\na) Exprimer le coût annuel $A(x)$ avec la carte et $S(x)$ sans carte, pour $x$ trajets. Laquelle de ces fonctions est linéaire ?\nb) En dizaines d'euros, donner pour chaque droite l'ordonnée à l'origine et le coefficient directeur.\nc) La droite de $A$ passe par $(2 ; 60)$ et $(6 ; 100)$, en euros. Retrouver son coefficient directeur à partir de ces deux points.\nd) À partir de combien de trajets la carte est-elle rentable ?",
          correction:
            "a) $A(x) = 10x + 40$ : $40$ € fixes et $10$ € par trajet. $S(x) = 15x$ : linéaire, le prix est proportionnel au nombre de trajets.\nb) En dizaines d'euros, la droite de $A$ coupe l'axe vertical en $4$ et monte de $1$ par trajet ; celle de $S$ part de l'origine et monte de $1{,}5$ par trajet.\nc) $\\dfrac{100 - 60}{6 - 2} = \\dfrac{40}{4} = 10$ € par trajet : c'est bien le prix d'un trajet avec la carte. ✔️ Et $10 \\times 2 + 40 = 60$.\nd) $10x + 40 = 15x$ donne $5x = 40$, donc $x = 8$ : pour $8$ trajets, les deux formules coûtent $120$ €. Au-delà de $8$ trajets, la droite de $A$ passe sous celle de $S$ : la carte est rentable.\n⚠️ Le point de croisement se lit en ABSCISSE : $8$ trajets, pas $12$ dizaines d'euros.\n⭐ Un coût fixe contre une économie à chaque usage : c'est le calcul de toute carte d'abonnement.",
          schema: repere([-1, 10, -1, 15], [{ q: [0, 1, 4] }, { q: [0, 1.5, 0], couleur: ORANGE }], [
            { x: 8, y: 12, label: "8 trajets" },
            { x: 0, y: 4, label: "" },
            { x: 0, y: 0, label: "" },
          ], undefined, true),
          micros: ["auto_fct_lineaire_affine", "auto_fct_lire_equation_reduite", "auto_fct_coefficient_directeur"],
        },
      ],
    },
  ],
};
