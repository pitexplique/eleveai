// ─── Fiche d'exercices : fonction affine, lire et exploiter (1re, sans spé) ───
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonctions-affines.bank.ts`
// (micros lin_affine_graphique, lin_affine_par_morceaux,
// lin_affine_point_equilibre) et sur les situations du BO qu'elle cite :
// barème de l'impôt (fonction affine par morceaux, taux marginal et taux
// moyen), offre et demande (point d'équilibre).
//
// ⛔ Pas de redite de `maths-premiere-auto-droites.tsx` (taxis, food-truck,
// carte de réduction) : ici, les deux gestes neufs sont le COUDE d'une
// fonction par morceaux et l'INTERSECTION lue puis calculée.
//
// ⭐⭐ LE FIL : ON LIT SUR LE DESSIN, PUIS ON VÉRIFIE PAR LE CALCUL. Un barème
// se lit morceau par morceau (le coefficient directeur change au coude) ; un
// point d'équilibre se lit au croisement, et sa réponse est une ABSCISSE (un
// prix, une année, un nombre de pages).
// Pièges nommés : image et antécédent sur des axes différents (3), le tarif qui
// change après le coude (5, 14), répondre avec les deux coordonnées (6), le
// taux appliqué à tout le revenu (9, 17), taux moyen et taux marginal (9, 17),
// deux fois plus profond n'est pas deux fois plus de pression (12), convertir
// l'échelle (15), un coefficient négatif et une vitesse positive (16), un
// palier est une fonction constante (19), une année et non x = 5 (20).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes, dont la PHYSIQUE (pression
// en plongée, 12) et l'HISTOIRE-GÉO (carte au 1/25 000, 15 ; deux villes et la
// périurbanisation, 20), à côté de l'économie (impôt, fraises, imprimantes,
// heures supplémentaires, vélos d'occasion), de l'écologie (eau, déchets) et
// de la montagne (refuge). Chiffres = MODÈLES arrondis ; les barèmes d'impôt
// sont ceux d'un pays imaginaire.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-affine-lecture.mjs`.
//
// Micro-compétences : lin_affine_graphique (1, 2, 3, 7, 8, 9, 10, 11, 12, 15,
// 16, 17, 18, 19, 20), lin_affine_par_morceaux (4, 5, 9, 10, 14, 17, 19),
// lin_affine_point_equilibre (6, 7, 11, 13, 18, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les droites qu'on LIT restent imprimées. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesLinAffineLecturePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-affine-lecture",
  titre: "Fonction affine : lire et exploiter",
  accroche:
    "Vingt exercices pour tracer et lire une fonction affine, exploiter une fonction affine par morceaux (barème d'impôt, tarif progressif) et trouver un point d'équilibre entre deux droites (offre et demande). On lit sur le dessin, puis on vérifie par le calcul. Un rappel de cours avant chaque niveau, une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On trace ou on lit, puis on vérifie.",
      rappel: [
        "Pour tracer la droite de $f(x) = ax + b$ : on calcule deux points, par exemple $(0 ; b)$ et un autre, puis on les relie.",
        "Lire une image $f(x_0)$ : on part de $x_0$ sur l'axe horizontal, on rejoint la droite, on lit la hauteur. Un antécédent se lit dans l'autre sens.",
        "Une fonction affine PAR MORCEAUX : une droite différente sur chaque intervalle. Le coefficient directeur change au « coude ».",
        "Le point d'intersection de deux droites vérifie $f(x) = g(x)$. En économie, l'offre et la demande s'y équilibrent.",
      ],
      exercices: [
        {
          enonce: "Tracer la droite qui représente $f(x) = -x + 3$ pour $x$ entre $-1$ et $4$.",
          correction:
            "On calcule deux points : $f(0) = 3$ et $f(3) = -3 + 3 = 0$. On place $(0 ; 3)$ et $(3 ; 0)$.\nOn trace la droite qui les relie, de $x = -1$ à $x = 4$.\n✔️ Un troisième point pour vérifier : $f(-1) = 1 + 3 = 4$, et le point $(-1 ; 4)$ est bien sur la droite.\n⭐ Choisir $x = 0$ donne le point le plus simple : $(0 ; b)$.",
          schema: repere([-2, 5, -2, 6], [{ q: [0, -1, 3] }], [
            { x: 0, y: 3, label: "" },
            { x: 3, y: 0, label: "" },
            { x: -1, y: 4, label: "" },
          ]),
          micros: ["lin_affine_graphique"],
        },
        {
          enonce: "Tracer la droite qui représente $g(x) = 0{,}5x + 1$ pour $x$ entre $0$ et $6$.",
          correction:
            "$g(0) = 1$, $g(2) = 0{,}5 \\times 2 + 1 = 2$ et $g(4) = 0{,}5 \\times 4 + 1 = 3$.\nOn choisit des $x$ PAIRS : les images tombent sur des nombres entiers, faciles à placer.\nOn place $(0 ; 1)$, $(2 ; 2)$ et $(4 ; 3)$, puis on trace la droite.\n⚠️ Avec $x = 1$, on aurait $1{,}5$ : un demi-carreau, moins facile à placer.",
          schema: ecranSeulement(repere([-1, 7, -1, 5], [{ q: [0, 0.5, 1] }], [
            { x: 0, y: 1, label: "" },
            { x: 2, y: 2, label: "" },
            { x: 4, y: 3, label: "" },
          ])),
          micros: ["lin_affine_graphique"],
        },
        {
          enonce: "La droite représente une fonction affine $f$. Lire $f(2)$ et $f(0)$, puis l'antécédent de $5$ par $f$.",
          figure: repere([-1, 5, -4, 7], [{ q: [0, 2, -3] }], [], undefined, true),
          correction:
            "$f(2)$ : on part de $2$ sur l'axe horizontal, on rejoint la droite : $f(2) = 1$.\n$f(0) = -3$ : c'est là que la droite coupe l'axe vertical.\nAntécédent de $5$ : on part de $5$ sur l'axe VERTICAL, on rejoint la droite, on lit $x = 4$.\n✔️ La droite a pour équation $y = 2x - 3$, et $2 \\times 4 - 3 = 5$.\n⚠️ Une image se lit sur l'axe vertical, un antécédent sur l'axe horizontal.",
          micros: ["lin_affine_graphique"],
        },
        {
          enonce: "La courbe représente une fonction $f$ affine par morceaux, pour $x$ entre $0$ et $6$.\na) Lire $f(2)$ et $f(5)$.\nb) Donner le coefficient directeur de chaque morceau, puis l'expression de $f$ sur chacun.",
          figure: repere([-1, 7, -1, 10], [{ pts: [[0, 0], [3, 6], [6, 9]] }], [], undefined, true),
          correction:
            "a) $f(2) = 4$ et $f(5) = 8$.\nb) De $0$ à $3$, la courbe monte de $6$ pour $3$ : $\\dfrac{6}{3} = 2$. De $3$ à $6$, elle monte de $3$ pour $3$ : $\\dfrac{3}{3} = 1$.\nPour $x$ entre $0$ et $3$, $f(x) = 2x$ ; pour $x$ entre $3$ et $6$, $f(x) = x + 3$.\n✔️ Au coude, les deux formules donnent la même valeur : $2 \\times 3 = 6$ et $3 + 3 = 6$.\n⭐ Le coefficient directeur change au coude : après $3$, la courbe monte moins vite.",
          micros: ["lin_affine_par_morceaux"],
        },
        {
          enonce: "Un parking coûte $2$ € par heure pour les $3$ premières heures, puis $1$ € par heure au-delà. Combien coûtent $2$ heures ? $5$ heures ?",
          correction:
            "$2$ heures : $2 \\times 2 = 4$ €.\n$5$ heures : les $3$ premières coûtent $3 \\times 2 = 6$ €, les $2$ suivantes $2 \\times 1 = 2$ €. Total : $6 + 2 = 8$ €.\n⚠️ Le piège : $5 \\times 2 = 10$ €. Le tarif change après $3$ heures : c'est une fonction affine PAR MORCEAUX.\nSur le dessin, c'est exactement la courbe de l'exercice 4 : moins pentue après le coude de $3$ heures.",
          schema: ecranSeulement(repere([-1, 7, -1, 10], [{ pts: [[0, 0], [3, 6], [6, 9]], couleur: ORANGE }], [
            { x: 2, y: 4, label: "" },
            { x: 5, y: 8, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_par_morceaux"],
        },
        {
          enonce: "Sur un marché, l'offre est modélisée par $f(p) = 3p - 6$ et la demande par $g(p) = -2p + 14$, où $p$ est le prix en euros. Déterminer le prix d'équilibre et la quantité échangée.",
          correction:
            "À l'équilibre, l'offre égale la demande : $3p - 6 = -2p + 14$.\nOn regroupe : $3p + 2p = 14 + 6$, soit $5p = 20$, donc $p = 4$.\nQuantité : $f(4) = 3 \\times 4 - 6 = 6$, et $g(4) = -2 \\times 4 + 14 = 6$. ✔️\nLe prix d'équilibre est $4$ €, pour une quantité de $6$ unités.\n⚠️ On répond avec les DEUX coordonnées : le prix et la quantité.\nSur le dessin, l'offre (bleue) monte, la demande (orange) descend ; elles se croisent en $(4 ; 6)$.",
          schema: ecranSeulement(repere([-1, 8, -1, 15], [{ q: [0, 3, -6] }, { q: [0, -2, 14], couleur: ORANGE }], [{ x: 4, y: 6, label: "" }], undefined, true)),
          micros: ["lin_affine_point_equilibre"],
        },
        {
          enonce: "La droite bleue a pour équation $y = x + 1$, la droite orange $y = -x + 5$. Lire les coordonnées de leur point d'intersection, puis les vérifier par le calcul.",
          figure: repere([-1, 6, -1, 7], [{ q: [0, 1, 1] }, { q: [0, -1, 5], couleur: ORANGE }]),
          correction:
            "Sur le dessin, les droites se croisent en $(2 ; 3)$.\nCalcul : $x + 1 = -x + 5$ donne $2x = 4$, donc $x = 2$, puis $y = 2 + 1 = 3$.\n✔️ Avec l'autre équation : $-2 + 5 = 3$.\n⭐ Le point d'intersection est le seul point commun aux deux droites : ses coordonnées vérifient les deux équations.",
          micros: ["lin_affine_point_equilibre", "lin_affine_graphique"],
        },
        {
          enonce: "Tracer la droite qui représente $h(x) = 1{,}5x - 2$ en plaçant deux points, puis vérifier que le point $(4 ; 4)$ est sur la droite.",
          correction:
            "$h(0) = -2$ et $h(2) = 1{,}5 \\times 2 - 2 = 1$ : on place $(0 ; -2)$ et $(2 ; 1)$.\nOn trace la droite qui les relie.\n$h(4) = 1{,}5 \\times 4 - 2 = 4$ : le point $(4 ; 4)$ est bien sur la droite.\n⭐ Avec une pente de $1{,}5$, on avance de $2$ pour monter de $3$ : on reste sur les nœuds de la grille.",
          schema: ecranSeulement(repere([-1, 5, -3, 6], [{ q: [0, 1.5, -2] }], [
            { x: 0, y: -2, label: "" },
            { x: 2, y: 1, label: "" },
            { x: 4, y: 4, label: "" },
          ])),
          micros: ["lin_affine_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire sur le dessin, calculer, puis répondre avec l'unité.",
      rappel: [
        "Un barème par tranches (impôt, eau) : on découpe le montant en morceaux, et chaque morceau paie SON tarif.",
        "Le taux MARGINAL s'applique à la dernière tranche ; le taux MOYEN est $\\dfrac{\\text{impôt}}{\\text{revenu}}$, toujours plus petit.",
        "Offre et demande : l'offre monte avec le prix, la demande baisse. Le prix d'équilibre est l'abscisse de leur point d'intersection.",
      ],
      exercices: [
        {
          titre: "Un barème d'impôt simplifié",
          enonce:
            "Dans un pays imaginaire, l'impôt est nul jusqu'à $10\\,000$ € de revenu annuel, puis de $10$ % sur la part du revenu qui DÉPASSE $10\\,000$ €. Le dessin représente l'impôt, en centaines d'euros, en fonction du revenu, en milliers d'euros.\na) Calculer l'impôt pour un revenu de $8\\,000$ €, puis de $14\\,000$ €. Le vérifier sur le dessin.\nb) Pour $14\\,000$ €, quel est le taux moyen d'imposition ?\nc) Que représente le coefficient directeur du second morceau ?",
          figure: repere([-1, 15, -1, 6], [{ pts: [[0, 0], [10, 0], [15, 5]] }], [], undefined, true),
          correction:
            "a) $8\\,000$ € est sous le seuil : l'impôt est nul.\nPour $14\\,000$ €, la part qui dépasse vaut $14\\,000 - 10\\,000 = 4\\,000$ €. Impôt : $0{,}1 \\times 4\\,000 = 400$ €. Sur le dessin, au-dessus de $14$, la courbe est à la hauteur $4$ : $4$ centaines d'euros.\nb) Taux moyen : $\\dfrac{400}{14\\,000} \\approx 0{,}029$, soit environ $2{,}9$ %.\nc) De $10$ à $15$, la courbe monte de $5$ centaines pour $5$ milliers : $\\dfrac{500}{5\\,000} = 0{,}1$. C'est le taux marginal, $10$ %.\n⚠️ Le piège : $0{,}1 \\times 14\\,000 = 1\\,400$ €. Les $10$ % ne portent que sur la part au-dessus de $10\\,000$ €.\n⭐ Le taux moyen, $2{,}9$ %, est bien plus faible que le taux marginal, $10$ %.",
          micros: ["lin_affine_par_morceaux", "lin_affine_graphique"],
        },
        {
          titre: "Le tarif progressif de l'eau",
          enonce:
            "Pour inciter à économiser l'eau, une commune applique un tarif progressif : $2$ € le m³ jusqu'à $30$ m³, puis $3$ € le m³ au-delà (chiffres d'un modèle).\na) Combien paie un foyer qui consomme $20$ m³ ? $50$ m³ ?\nb) Pour une consommation $x$ supérieure à $30$ m³, montrer que la facture vaut $f(x) = 3x - 30$.\nc) Représenter la facture pour une consommation de $0$ à $50$ m³.",
          correction:
            "a) $20$ m³ : $20 \\times 2 = 40$ €.\n$50$ m³ : $30 \\times 2 = 60$ € pour les $30$ premiers, puis $20 \\times 3 = 60$ € pour les $20$ suivants. Total : $60 + 60 = 120$ €.\nb) Pour $x > 30$ : $60 + 3 \\times (x - 30) = 60 + 3x - 90 = 3x - 30$.\n✔️ $f(50) = 3 \\times 50 - 30 = 120$ : on retrouve le résultat du a).\nc) Sur le dessin (en dizaines de m³ et en dizaines d'euros), deux morceaux de droite : de pente $2$ jusqu'à $3$, puis de pente $3$.\n⭐ Plus on consomme, plus chaque m³ coûte cher : le tarif récompense les économies d'eau.",
          schema: repere([-1, 6, -1, 13], [{ pts: [[0, 0], [3, 6], [5, 12]] }], [
            { x: 2, y: 4, label: "" },
            { x: 5, y: 12, label: "" },
          ], undefined, true),
          micros: ["lin_affine_par_morceaux", "lin_affine_graphique"],
        },
        {
          titre: "Le marché des fraises",
          enonce:
            "Sur un marché, on modélise l'offre de fraises par $O(p) = 4p - 8$ (en bleu) et la demande par $D(p) = -2p + 16$ (en orange), en tonnes, où $p$ est le prix du kilo en euros (chiffres d'un modèle).\na) Pourquoi l'offre est-elle croissante et la demande décroissante ?\nb) Lire le point d'équilibre, puis le retrouver par le calcul.\nc) Si le prix est fixé à $5$ €, que se passe-t-il ?",
          figure: repere([-1, 8, -1, 15], [{ q: [0, 4, -8] }, { q: [0, -2, 16], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) Plus le prix est haut, plus les producteurs veulent vendre ($a = 4 > 0$), et moins les clients veulent acheter ($a = -2 < 0$).\nb) Les droites se croisent en $(4 ; 8)$. Calcul : $4p - 8 = -2p + 16$ donne $6p = 24$, donc $p = 4$, et $O(4) = 4 \\times 4 - 8 = 8$.\nLe prix d'équilibre est de $4$ € le kilo, pour $8$ tonnes échangées.\nc) $O(5) = 4 \\times 5 - 8 = 12$ et $D(5) = -2 \\times 5 + 16 = 6$ : on propose $12$ tonnes, on en demande $6$. Il reste $12 - 6 = 6$ tonnes invendues.\n⚠️ Au-dessus du prix d'équilibre, l'offre dépasse la demande : les invendus poussent le prix à baisser.",
          micros: ["lin_affine_point_equilibre", "lin_affine_graphique"],
        },
        {
          titre: "La pression en plongée",
          enonce:
            "En physique, la pression subie par un plongeur, en bars, est modélisée par $P(p) = 1 + 0{,}1p$, où $p$ est la profondeur en mètres.\na) Que vaut la pression à la surface ? à $10$ m ?\nb) Représenter $P$ pour une profondeur de $0$ à $40$ m.\nc) À quelle profondeur la pression vaut-elle $3$ bars ? Le lire sur ton dessin, puis le vérifier.",
          correction:
            "a) $P(0) = 1$ bar à la surface : c'est la pression de l'air. $P(10) = 1 + 0{,}1 \\times 10 = 2$ bars.\nb) Deux points suffisent : $(0 ; 1)$ et $(40 ; 5)$, car $P(40) = 1 + 0{,}1 \\times 40 = 5$. Sur le dessin, la profondeur est en dizaines de mètres.\nc) La droite atteint la hauteur $3$ à l'abscisse $2$, soit $20$ m. Vérification : $1 + 0{,}1 \\times 20 = 3$.\n⭐ Tous les $10$ m de profondeur, la pression augmente de $1$ bar.\n⚠️ À $20$ m, la pression n'est pas le double de celle de $10$ m : $3$ bars contre $2$.",
          schema: ecranSeulement(repere([-1, 5, -1, 6], [{ q: [0, 1, 1] }], [
            { x: 0, y: 1, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 4, y: 5, label: "" },
          ])),
          micros: ["lin_affine_graphique"],
        },
        {
          titre: "Deux imprimantes",
          enonce:
            "Pour ses bureaux, une association hésite entre deux imprimantes (chiffres d'un modèle).\nImprimante A : $80$ € à l'achat, puis $0{,}05$ € par page.\nImprimante B : $200$ € à l'achat, puis $0{,}02$ € par page.\na) Exprimer les coûts $A(x)$ et $B(x)$ pour $x$ pages.\nb) Pour quel nombre de pages les deux coûts sont-ils égaux ? Quel est alors ce coût ?\nc) L'association imprime $6\\,000$ pages. Quelle imprimante choisir ?",
          correction:
            "a) $A(x) = 0{,}05x + 80$ et $B(x) = 0{,}02x + 200$.\nb) $0{,}05x + 80 = 0{,}02x + 200$ donne $0{,}03x = 120$, donc $x = \\dfrac{120}{0{,}03} = 4\\,000$ pages. Coût : $A(4\\,000) = 0{,}05 \\times 4\\,000 + 80 = 280$ €.\nc) $A(6\\,000) = 0{,}05 \\times 6\\,000 + 80 = 380$ € et $B(6\\,000) = 0{,}02 \\times 6\\,000 + 200 = 320$ € : l'imprimante B revient moins cher.\nSur le dessin (en milliers de pages et en centaines d'euros), après le croisement, la droite orange de B passe sous la bleue.\n⭐ Moins chère à l'achat ne veut pas dire moins chère à l'usage.",
          schema: ecranSeulement(repere([-1, 9, -1, 5], [{ q: [0, 0.5, 0.8] }, { q: [0, 0.2, 2], couleur: ORANGE }], [{ x: 4, y: 2.8, label: "" }])),
          micros: ["lin_affine_point_equilibre"],
        },
        {
          titre: "Les heures supplémentaires",
          enonce:
            "Une salariée est payée $12$ € de l'heure jusqu'à $35$ heures par semaine ; au-delà, chaque heure supplémentaire est payée $15$ € (chiffres d'un modèle).\na) Combien gagne-t-elle pour $30$ h ? pour $40$ h ?\nb) Pour un nombre d'heures $x$ entre $35$ et $45$, montrer que son salaire vaut $S(x) = 15x - 105$.\nc) Que représentent les coefficients directeurs $12$ et $15$ des deux morceaux ?",
          correction:
            "a) $30$ h : $30 \\times 12 = 360$ €. $40$ h : $35 \\times 12 = 420$ € pour les $35$ premières heures, et $5 \\times 15 = 75$ € pour les $5$ suivantes. Total : $420 + 75 = 495$ €.\nb) $S(x) = 420 + 15 \\times (x - 35) = 420 + 15x - 525 = 15x - 105$.\n✔️ $S(40) = 15 \\times 40 - 105 = 495$.\nc) Ce sont les salaires horaires : $12$ € par heure normale, $15$ € par heure supplémentaire. Au coude de $35$ h, la courbe devient plus pentue.\n⚠️ $15x - 105$ ne vaut qu'au-delà de $35$ h : pour $30$ h, elle donnerait $345$ €, ce qui est faux.",
          schema: ecranSeulement(repere([-1, 5, -1, 7], [{ pts: [[0, 0], [3.5, 4.2], [4.5, 5.7]] }], [
            { x: 3, y: 3.6, label: "" },
            { x: 4, y: 4.95, label: "" },
          ])),
          micros: ["lin_affine_par_morceaux"],
        },
        {
          titre: "Une carte à l'échelle",
          enonce:
            "Sur une carte de randonnée au $1/25\\,000$, $1$ cm représente $25\\,000$ cm, soit $250$ m dans la réalité.\na) Exprimer la distance réelle $d(x)$, en km, en fonction de la distance $x$ mesurée sur la carte, en cm. Quelle est la nature de $d$ ?\nb) Représenter $d$ pour $x$ de $0$ à $12$ cm.\nc) Calculer la distance réelle pour $8$ cm, puis la longueur sur la carte d'un sentier de $2{,}5$ km.",
          correction:
            "a) $250$ m, c'est $0{,}25$ km : $d(x) = 0{,}25x$. C'est une fonction linéaire : sa droite passe par l'origine.\nb) Deux points : $(0 ; 0)$ et $(12 ; 3)$, car $d(12) = 0{,}25 \\times 12 = 3$.\nc) $d(8) = 0{,}25 \\times 8 = 2$ km. Pour $2{,}5$ km : $0{,}25x = 2{,}5$, donc $x = 10$ cm.\n⭐ Une échelle est une situation de proportionnalité : la droite passe par l'origine.\n⚠️ On convertit avant de calculer : $25\\,000$ cm, ce sont $250$ m, soit $0{,}25$ km.",
          schema: repere([-1, 13, -1, 4], [{ q: [0, 0.25, 0] }], [
            { x: 8, y: 2, label: "" },
            { x: 10, y: 2.5, label: "" },
            { x: 12, y: 3, label: "" },
          ], undefined, true),
          micros: ["lin_affine_graphique"],
        },
        {
          titre: "Vers le refuge",
          enonce:
            "Un randonneur est à $12$ km d'un refuge de montagne. La droite donne la distance qui lui reste à parcourir, en km, en fonction du temps de marche, en heures (chiffres d'un modèle).\na) Lire la distance restante au bout de $2$ heures.\nb) Au bout de combien de temps arrive-t-il au refuge ?\nc) Déterminer l'expression de la distance restante $R(t)$, puis interpréter le coefficient directeur.",
          figure: repere([-1, 9, -1, 13], [{ q: [0, -1.5, 12] }], [], undefined, true),
          correction:
            "a) Au-dessus de $2$, la droite est à la hauteur $9$ : il reste $9$ km.\nb) La droite coupe l'axe horizontal en $8$ : il arrive au bout de $8$ heures.\nc) $R(0) = 12$, et la droite descend de $3$ quand on avance de $2$ : $a = \\dfrac{-3}{2} = -1{,}5$. Donc $R(t) = -1{,}5t + 12$.\nLe randonneur avance de $1{,}5$ km par heure : le chemin est très raide.\n✔️ $R(8) = -1{,}5 \\times 8 + 12 = 0$.\n⚠️ Le coefficient est négatif parce que la distance RESTANTE diminue ; sa vitesse, elle, vaut $1{,}5$ km/h.",
          micros: ["lin_affine_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "Barème à plusieurs tranches : on calcule l'impôt tranche par tranche, puis on additionne.",
        "Deux droites qui se croisent : on résout $f(x) = g(x)$ ; la solution est l'ABSCISSE du point commun.",
        "On lit sur le dessin, puis on vérifie par le calcul.",
      ],
      exercices: [
        {
          titre: "Un barème à trois tranches",
          enonce:
            "Un barème d'impôt simplifié, dans un pays imaginaire, compte trois tranches : $0$ % jusqu'à $10\\,000$ € ; $10$ % pour la part comprise entre $10\\,000$ et $20\\,000$ € ; $30$ % pour la part au-delà de $20\\,000$ €.\na) Calculer l'impôt pour un revenu de $20\\,000$ €, puis de $30\\,000$ €.\nb) Pour un revenu de $30\\,000$ €, quel est le taux moyen ? Le comparer au taux marginal.\nc) Pour un revenu $x$ au-delà de $20\\,000$ €, montrer que l'impôt vaut $I(x) = 0{,}3x - 5\\,000$.\nd) Un voisin affirme : « Si mon revenu passe dans la tranche à $30$ %, je paierai $30$ % sur TOUT mon revenu. » A-t-il raison ?",
          correction:
            "a) $20\\,000$ € : rien sur les $10\\,000$ premiers euros, puis $0{,}1 \\times 10\\,000 = 1\\,000$ €. Impôt : $1\\,000$ €.\n$30\\,000$ € : les $1\\,000$ € précédents, plus $0{,}3 \\times 10\\,000 = 3\\,000$ € pour la part au-delà de $20\\,000$ €. Impôt : $1\\,000 + 3\\,000 = 4\\,000$ €.\nb) Taux moyen : $\\dfrac{4\\,000}{30\\,000} \\approx 0{,}133$, soit environ $13{,}3$ %, bien moins que le taux marginal de $30$ %.\nc) $I(x) = 1\\,000 + 0{,}3 \\times (x - 20\\,000) = 1\\,000 + 0{,}3x - 6\\,000 = 0{,}3x - 5\\,000$.\n✔️ $I(30\\,000) = 0{,}3 \\times 30\\,000 - 5\\,000 = 4\\,000$.\nd) Non : les $30$ % ne s'appliquent qu'à la part au-delà de $20\\,000$ €. Sur le dessin (revenu en dizaines de milliers d'euros, impôt en milliers d'euros), la courbe ne fait aucun saut : elle devient seulement plus pentue.\n⭐ Dans ce barème, gagner un euro de plus ne fait jamais payer plus de $30$ centimes d'impôt en plus : le revenu après impôt augmente toujours.",
          schema: repere([-1, 5, -1, 6], [{ pts: [[0, 0], [1, 0], [2, 1], [3, 4]] }], [{ x: 3, y: 4, label: "" }]),
          micros: ["lin_affine_par_morceaux", "lin_affine_graphique"],
        },
        {
          titre: "Le marché des vélos d'occasion",
          enonce:
            "Sur un site de vente entre particuliers, on modélise, pour un modèle de vélo, l'offre par $O(p) = 2p - 20$ et la demande par $D(p) = 100 - p$, en nombre de vélos par semaine, où $p$ est le prix en euros (chiffres d'un modèle).\na) Calculer le prix d'équilibre et la quantité échangée.\nb) Représenter les deux droites, prix en dizaines d'euros et quantités en dizaines de vélos, puis placer le point d'équilibre.\nc) À $50$ €, combien de vélos restent invendus ? À $30$ €, que se passe-t-il ?",
          correction:
            "a) $2p - 20 = 100 - p$ donne $3p = 120$, donc $p = 40$. Quantité : $O(40) = 2 \\times 40 - 20 = 60$, et $D(40) = 100 - 40 = 60$. ✔️\nAu prix d'équilibre de $40$ €, $60$ vélos sont échangés par semaine.\nb) Sur le dessin, le point d'équilibre est en $(4 ; 6)$.\nc) À $50$ € : $O(50) = 2 \\times 50 - 20 = 80$ et $D(50) = 100 - 50 = 50$. Il reste $80 - 50 = 30$ vélos invendus.\nÀ $30$ € : $O(30) = 2 \\times 30 - 20 = 40$ et $D(30) = 100 - 30 = 70$ : il manque $30$ vélos, les acheteurs sont trop nombreux.\n⭐ Au-dessus du prix d'équilibre, des invendus ; en dessous, une pénurie.",
          schema: repere([-1, 8, -1, 11], [{ q: [0, 2, -2] }, { q: [0, -1, 10], couleur: ORANGE }], [{ x: 4, y: 6, label: "" }], undefined, true),
          micros: ["lin_affine_point_equilibre", "lin_affine_graphique"],
        },
        {
          titre: "La redevance des déchets",
          enonce:
            "Pour réduire les déchets, une communauté de communes facture la collecte selon le nombre de levées du bac : un forfait de $60$ € par an, qui comprend $10$ levées, puis $5$ € par levée supplémentaire (chiffres d'un modèle).\na) Combien paie un foyer pour $8$ levées ? pour $15$ levées ?\nb) Exprimer la facture $f(n)$ pour $n \\leq 10$, puis pour $n \\geq 10$.\nc) Représenter $f$ pour $n$ de $0$ à $15$. Pourquoi ce tarif incite-t-il à trier ?",
          correction:
            "a) $8$ levées : le forfait suffit, $60$ €. $15$ levées : $60 + 5 \\times 5 = 85$ €.\nb) Pour $n \\leq 10$ : $f(n) = 60$, une fonction constante. Pour $n \\geq 10$ : $f(n) = 60 + 5 \\times (n - 10) = 5n + 10$.\n✔️ Les deux formules donnent $60$ pour $n = 10$ : $5 \\times 10 + 10 = 60$.\nc) Sur le dessin (en dizaines d'euros), un palier horizontal jusqu'à $10$ levées, puis une droite qui monte d'un demi-carreau par levée.\nMoins on sort son bac, moins on paie au-delà du forfait : trier et composter font baisser la facture.\n⚠️ Sur le palier, le coefficient directeur vaut $0$ : la fonction est constante, et c'est bien une fonction affine.",
          schema: repere([-1, 15, -1, 10], [{ pts: [[0, 6], [10, 6], [15, 8.5]] }], [
            { x: 8, y: 6, label: "" },
            { x: 15, y: 8.5, label: "" },
          ], undefined, true),
          micros: ["lin_affine_par_morceaux", "lin_affine_graphique"],
        },
        {
          titre: "Deux villes voisines",
          enonce:
            "En 2020, la ville A compte $12\\,000$ habitants et en perd $300$ par an ; la ville B, sa voisine, en compte $8\\,000$ et en gagne $500$ par an (chiffres d'un modèle). On note $x$ le nombre d'années après 2020. Le dessin montre les deux populations, en milliers : A en bleu, B en orange.\na) Exprimer les populations $A(x)$ et $B(x)$. Quelles sont leurs variations ?\nb) En quelle année les deux villes auront-elles la même population ? Laquelle ?\nc) Lire sur le dessin quelle ville est la plus peuplée en 2028, puis le vérifier.",
          figure: repere([-1, 9, -1, 14], [{ q: [0, -0.3, 12] }, { q: [0, 0.5, 8], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) $A(x) = 12\\,000 - 300x$ est décroissante ($a = -300$) ; $B(x) = 8\\,000 + 500x$ est croissante ($a = 500$).\nb) $12\\,000 - 300x = 8\\,000 + 500x$ donne $4\\,000 = 800x$, donc $x = 5$ : en 2025. Population : $A(5) = 12\\,000 - 300 \\times 5 = 10\\,500$ habitants, et $B(5) = 8\\,000 + 500 \\times 5 = 10\\,500$. ✔️\nc) Après le croisement, la droite orange de B est au-dessus : en 2028, B est la plus peuplée. En effet, $A(8) = 12\\,000 - 300 \\times 8 = 9\\,600$ et $B(8) = 8\\,000 + 500 \\times 8 = 12\\,000$.\n⭐ Quand une ville-centre perd des habitants au profit des communes qui l'entourent, les géographes parlent de périurbanisation.\n⚠️ On répond par une ANNÉE, 2025, et non par $x = 5$.",
          micros: ["lin_affine_point_equilibre", "lin_affine_graphique"],
        },
      ],
    },
  ],
};
