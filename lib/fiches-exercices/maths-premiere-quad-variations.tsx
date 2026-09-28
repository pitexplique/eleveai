// ─── Fiche d'exercices : parabole, variations et extremum (1re sans spé) ──────
//                              20 exercices corrigés
//
// Troisième des quatre feuilles du chapitre « Modélisation quadratique »
// (BOP1MQ) de la première SANS spécialité (28/09/2026). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/parabole.bank.ts`.
//
// ⛔⛔ PAS DE DÉRIVÉE ICI, PAS DE DISCRIMINANT, PAS DE « −b/2a » : les
// variations d'une fonction polynôme de degré 2 se lisent sur le signe de a et
// sur le sommet, trouvé par la symétrie (milieu des racines d'une forme
// factorisée) ou lu sur une forme a(x − α)² + β DONNÉE.
// ⛔ Les tableaux de variations sont faits sur un INTERVALLE BORNÉ : la première
// sans spé ne parle pas de limites, et le canvas lit une valeur vide comme 0.
//
// ⭐ Frédéric, 28/09 : un tableau de variations DESSINÉ dans chaque corrigé qui
// en dresse un, la courbe dans l'énoncé quand on la lit. Contextes : économie
// (sacs en toile, location de vélos, salle d'escalade), physique (fusée à eau,
// chandelle au rugby, consommation d'une voiture, vol parabolique), histoire-géo
// (la zone de baignade d'une commune, la fréquentation d'un parc national),
// écologie (la serre, la pêche durable). Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-quad-variations.mjs`.
//
// Micro-compétences : quad_extremum (1, 2, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15,
// 16, 17, 18, 19, 20), quad_tableau_variations (1, 4, 7, 9, 10, 11, 12, 13, 14,
// 15, 16, 17, 18, 19, 20), quad_comparer_images (3, 6, 8, 11, 12, 13, 14, 15,
// 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableauVariations } from "@/lib/fiches-exercices/figures";
import { parabole } from "@/lib/fiches-exercices/figures-parabole";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;
/** Deux dessins l'un sous l'autre dans le même corrigé. */
const et = (...dessins: ReactNode[]) => (
  <div className="space-y-3">
    {dessins.map((d, i) => (
      <div key={i}>{d}</div>
    ))}
  </div>
);

export const exercicesQuadVariationsPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "quad-variations",
  titre: "Parabole : variations et extremum",
  accroche:
    "Vingt exercices pour lire les variations d'une fonction de degré 2 : trouver son maximum ou son minimum, dresser son tableau de variations, comparer deux images sans les calculer. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec le tableau dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Le sens de la parabole, le sommet, le tableau.",
      rappel: [
        "Une parabole ne change de sens qu'UNE fois : à son sommet.",
        "$a > 0$ : $f$ décroît jusqu'au sommet, puis croît ; le sommet est un MINIMUM. $a < 0$ : $f$ croît, puis décroît ; le sommet est un MAXIMUM.",
        "Le tableau de variations : en haut, les bornes et l'abscisse du sommet ; en bas, leurs images, reliées par des flèches.",
        "Comparer sans calcul : si deux nombres sont du MÊME côté du sommet, le sens de la flèche donne l'ordre de leurs images.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = 2(x - 1)^2 + 3$ sur l'intervalle $[-2 ; 4]$. Dresser le tableau de variations de $f$, et donner son minimum.",
          correction:
            "La forme $2(x - 1)^2 + 3$ donne le sommet : $S(1 ; 3)$.\n$a = 2 > 0$ : la parabole est tournée vers le haut. $f$ décroît sur $[-2 ; 1]$, puis croît sur $[1 ; 4]$.\nImages aux bornes : $f(-2) = 2 \\times (-3)^2 + 3 = 21$ et $f(4) = 2 \\times 3^2 + 3 = 21$.\nLe minimum de $f$ sur $[-2 ; 4]$ est $3$, atteint en $x = 1$.\n⚠️ On n'oublie pas les images aux BORNES : sans elles, le tableau est incomplet.",
          schema: tableauVariations([-2, 1, 4], [21, 3, 21]),
          micros: ["quad_tableau_variations", "quad_extremum"],
        },
        {
          enonce: "Soit $f(x) = -(x - 2)(x - 6)$. La fonction $f$ admet-elle un maximum ou un minimum ? Le déterminer, et dire où il est atteint.",
          correction:
            "Le coefficient devant le produit est $-1 < 0$ : parabole tournée vers le bas, donc un MAXIMUM.\nIl est atteint au sommet, sur l'axe, au milieu des racines $2$ et $6$ : en $x = \\dfrac{2 + 6}{2} = 4$.\n$f(4) = -(4 - 2)(4 - 6) = -(2 \\times (-2)) = 4$.\nLe maximum de $f$ vaut $4$, atteint en $x = 4$.\n⚠️ Deux « $4$ » différents : l'un dit OÙ (l'abscisse), l'autre dit COMBIEN (le maximum).",
          schema: ecranSeulement(parabole([-1, 7, -5, 5], [{ q: [-1, 8, -12] }], [{ x: 2, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 4, label: "S" }], { axe: 4 })),
          micros: ["quad_extremum"],
        },
        {
          enonce:
            "Voici le tableau de variations d'une fonction $f$ de degré $2$ sur $[0 ; 7]$. Sans calcul :\na) comparer $f(1)$ et $f(2)$ ;\nb) comparer $f(4)$ et $f(6)$ ;\nc) peut-on comparer $f(1)$ et $f(5)$ avec ce tableau seul ?",
          figure: tableauVariations([0, 3, 7], [7, -2, 14]),
          correction:
            "a) $1$ et $2$ sont dans $[0 ; 3]$, où $f$ est décroissante : l'ordre s'inverse. $1 < 2$ donne $f(1) > f(2)$.\nb) $4$ et $6$ sont dans $[3 ; 7]$, où $f$ est croissante : l'ordre se garde. $4 < 6$ donne $f(4) < f(6)$.\nc) Non : $1$ et $5$ sont de part et d'autre du sommet. Il faut l'expression, ou la symétrie.\n⭐ Avec $f(x) = (x - 3)^2 - 2$, on trouve $f(1) = f(5) = 2$ : ils sont à la même distance de $3$.\n⚠️ Une fonction décroissante RETOURNE l'ordre : c'est l'erreur la plus fréquente.",
          micros: ["quad_comparer_images"],
        },
        {
          enonce: "Voici la courbe de $f(x) = 0{,}5x^2 - 2x - 1$. Dresser son tableau de variations sur $[-1 ; 5]$, et donner son minimum.",
          figure: parabole([-2, 6, -4, 4], [{ q: [0.5, -2, -1] }]),
          correction:
            "On lit le sommet sur la courbe : $S(2 ; -3)$. On le vérifie : $f(2) = 0{,}5 \\times 4 - 4 - 1 = -3$ ✔️.\n$a = 0{,}5 > 0$ : $f$ décroît sur $[-1 ; 2]$, puis croît sur $[2 ; 5]$.\n$f(-1) = 0{,}5 + 2 - 1 = 1{,}5$ et $f(5) = 12{,}5 - 10 - 1 = 1{,}5$.\nLe minimum de $f$ sur $[-1 ; 5]$ vaut $-3$, atteint en $x = 2$.\n⭐ $f(-1) = f(5)$ : les bornes sont symétriques par rapport à l'axe $x = 2$.",
          schema: ecranSeulement(tableauVariations([-1, 2, 5], [1.5, -3, 1.5])),
          micros: ["quad_tableau_variations", "quad_extremum"],
        },
        {
          enonce: "Soit $g(x) = 5 - 3x^2$. Montrer que $g$ admet un maximum, et le donner.",
          correction:
            "Un carré est positif ou nul : $x^2 \\geqslant 0$.\nOn multiplie par $-3$, négatif : l'inégalité se retourne, $-3x^2 \\leqslant 0$.\nDonc $g(x) = 5 - 3x^2 \\leqslant 5$ pour tout $x$, et $g(0) = 5$.\nLe maximum de $g$ est $5$, atteint en $x = 0$.\n⭐ Pour une fonction $ax^2 + c$, le sommet est toujours sur l'axe vertical, au point $(0 ; c)$.\nSur le dessin, le sommet $S(0 ; 5)$ est le point le plus haut, sur l'axe $x = 0$.",
          schema: parabole([-3, 3, -4, 6], [{ q: [-3, 0, 5] }], [{ x: 0, y: 5, label: "S" }], { axe: 0 }),
          micros: ["quad_extremum"],
        },
        {
          enonce: "Soit $f(x) = (x - 1)^2$. Comparer $f(-2)$ et $f(3)$ sans les calculer.",
          correction:
            "Le sommet est en $x = 1$ : $-2$ est à gauche, $3$ à droite. On ne peut pas comparer directement.\nOn remplace $-2$ par son symétrique : $-2$ est à $3$ unités de l'axe, son symétrique est $1 + 3 = 4$. Donc $f(-2) = f(4)$.\n$3$ et $4$ sont à droite du sommet, où $f$ est croissante ($a = 1 > 0$) : $f(3) < f(4)$.\nDonc $f(3) < f(-2)$.\n✔️ Contrôle : $f(3) = 4$ et $f(-2) = 9$.\n⭐ Plus un nombre est LOIN de l'axe, plus son image est grande (parabole tournée vers le haut).",
          schema: ecranSeulement(parabole([-3, 5, -1, 10], [{ q: [1, -2, 1] }], [{ x: -2, y: 9 }, { x: 4, y: 9 }, { x: 3, y: 4 }], { axe: 1, horizontale: 9, grand: true })),
          micros: ["quad_comparer_images"],
        },
        {
          enonce: "Soit $f(x) = 2x(x - 4)$ sur $[-1 ; 5]$. Dresser le tableau de variations de $f$, et donner son minimum.",
          correction:
            "Racines : $0$ et $4$. L'axe passe au milieu, en $x = 2$.\n$f(2) = 2 \\times 2 \\times (-2) = -8$ : le sommet est $S(2 ; -8)$.\n$a = 2 > 0$ : $f$ décroît sur $[-1 ; 2]$, puis croît sur $[2 ; 5]$.\nBornes : $f(-1) = 2 \\times (-1) \\times (-5) = 10$ et $f(5) = 2 \\times 5 \\times 1 = 10$.\nLe minimum de $f$ sur $[-1 ; 5]$ est $-8$, atteint en $x = 2$.\n⚠️ Le $2$ devant le produit ne change pas les racines, mais il change l'ordonnée du sommet.",
          schema: ecranSeulement(tableauVariations([-1, 2, 5], [10, -8, 10])),
          micros: ["quad_tableau_variations", "quad_extremum"],
        },
        {
          enonce:
            "Voici le tableau de variations de $f(x) = -0{,}25(x - 4)^2 + 9$ sur $[0 ; 10]$.\na) Comparer $f(1)$ et $f(3)$, puis $f(5)$ et $f(8)$, sans calcul.\nb) Comparer $f(2)$ et $f(7)$, en utilisant la symétrie.",
          figure: tableauVariations([0, 4, 10], [5, 9, 0]),
          correction:
            "a) Sur $[0 ; 4]$, $f$ croît : $1 < 3$ donne $f(1) < f(3)$.\nSur $[4 ; 10]$, $f$ décroît : $5 < 8$ donne $f(5) > f(8)$.\nb) $2$ et $7$ sont de part et d'autre du sommet. $2$ est à $2$ unités de l'axe $x = 4$ : son symétrique est $6$, et $f(2) = f(6)$.\n$6 < 7$ dans la partie décroissante : $f(6) > f(7)$. Donc $f(2) > f(7)$.\n✔️ Contrôle : $f(2) = 8$ et $f(7) = 6{,}75$.",
          micros: ["quad_comparer_images"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. Calculatrice autorisée.",
      rappel: [
        "Pour trouver l'extremum : l'axe (par la symétrie), puis l'image de son abscisse. Le signe de $a$ dit si c'est un maximum ou un minimum.",
        "Deux nombres de part et d'autre du sommet : on remplace l'un par son SYMÉTRIQUE, pour les ramener du même côté.",
        "Dans un problème, l'abscisse du sommet est la quantité, le prix ou l'instant ; son ordonnée est le maximum (ou le minimum) cherché.",
      ],
      exercices: [
        {
          titre: "Des sacs en toile recyclée",
          enonce:
            "Un atelier fabrique $x$ centaines de sacs en toile recyclée par mois ($0 \\leqslant x \\leqslant 12$). Son bénéfice, en milliers d'euros, est $B(x) = -2(x - 2)(x - 10)$.\na) Déterminer l'axe de symétrie de la parabole.\nb) Dresser le tableau de variations de $B$ sur $[0 ; 12]$.\nc) Combien de sacs faut-il fabriquer pour un bénéfice maximal ? Quel est ce bénéfice ?",
          correction:
            "a) Racines : $2$ et $10$. L'axe est la droite $x = \\dfrac{2 + 10}{2} = 6$.\nb) $a = -2 < 0$ : $B$ croît sur $[0 ; 6]$, puis décroît sur $[6 ; 12]$.\n$B(0) = -2 \\times (-2) \\times (-10) = -40$ ; $B(6) = -2 \\times 4 \\times (-4) = 32$ ; $B(12) = -2 \\times 10 \\times 2 = -40$.\nc) Le maximum est atteint en $x = 6$ : il faut fabriquer $600$ sacs par mois, pour un bénéfice de $32\\,000$ €.\n⚠️ $B(0) = -40$ : trois facteurs négatifs, le produit est négatif. Sans rien vendre, l'atelier perd $40\\,000$ €.",
          schema: tableauVariations([0, 6, 12], [-40, 32, -40], "B"),
          micros: ["quad_extremum", "quad_tableau_variations"],
        },
        {
          titre: "La zone de baignade",
          enonce:
            "Pour aménager une plage sur un lac, une commune délimite une zone de baignade rectangulaire avec $40$ m de lignes de bouées, sur trois côtés : le quatrième côté est la plage. On note $x$ la longueur, en mètres, des deux côtés perpendiculaires à la plage.\na) Exprimer la longueur du côté parallèle à la plage, puis l'aire $A(x)$ de la zone.\nb) Montrer que $A(x) = -2x(x - 20)$, et dresser le tableau de variations de $A$ sur $[0 ; 20]$.\nc) Quelles dimensions donnent la plus grande zone ? Quelle est son aire ?",
          correction:
            "a) Deux côtés de $x$ m utilisent $2x$ m de bouées : il reste $40 - 2x$ m pour le côté parallèle à la plage.\n$A(x) = x(40 - 2x)$.\nb) $x(40 - 2x) = 40x - 2x^2$, et $-2x(x - 20) = -2x^2 + 40x$ ✔️.\nRacines $0$ et $20$ : l'axe est $x = 10$. $a = -2 < 0$ : $A$ croît sur $[0 ; 10]$, puis décroît sur $[10 ; 20]$.\n$A(0) = 0$ ; $A(10) = 10 \\times 20 = 200$ ; $A(20) = 0$.\nc) La zone la plus grande mesure $10$ m sur $20$ m, pour une aire de $200$ m².\n⚠️ Ce n'est pas un carré : le côté de la plage ne consomme pas de bouées.",
          schema: tableauVariations([0, 10, 20], [0, 200, 0], "A"),
          micros: ["quad_extremum", "quad_tableau_variations"],
        },
        {
          titre: "La température d'une serre",
          enonce:
            "Dans une serre, la température (en °C) entre $8$ h et $20$ h est modélisée par $T(h) = -0{,}5(h - 14)^2 + 30$, où $h$ est l'heure. Voici son tableau de variations.\na) Quelle est la température maximale, et à quelle heure ?\nb) Sans calcul, comparer $T(10)$ et $T(12)$, puis $T(15)$ et $T(19)$.\nc) Il fait plus chaud à $11$ h ou à $16$ h ? Justifier par la symétrie, puis vérifier.",
          figure: tableauVariations([8, 14, 20], [12, 30, 12], "T", "h"),
          correction:
            "a) Le sommet est $S(14 ; 30)$ : il fait au plus $30$ °C, à $14$ h.\nb) Avant $14$ h, $T$ croît : $10 < 12$ donne $T(10) < T(12)$.\nAprès $14$ h, $T$ décroît : $15 < 19$ donne $T(15) > T(19)$.\nc) $11$ h est à $3$ h avant le sommet ; son symétrique est $17$ h : $T(11) = T(17)$.\n$16 < 17$ dans la partie décroissante : $T(16) > T(17) = T(11)$. Il fait plus chaud à $16$ h.\n✔️ $T(11) = -4{,}5 + 30 = 25{,}5$ °C et $T(16) = -2 + 30 = 28$ °C.",
          micros: ["quad_comparer_images", "quad_tableau_variations", "quad_extremum"],
        },
        {
          titre: "La chandelle au rugby",
          enonce:
            "Un rugbyman tape une chandelle. La hauteur du ballon, en mètres, $t$ secondes après la frappe, est $h(t) = -5(t - 2)^2 + 21$, pour $t$ entre $0$ et $4$.\na) Quelle hauteur maximale le ballon atteint-il, et quand ?\nb) Dresser le tableau de variations de $h$ sur $[0 ; 4]$.\nc) Sans calcul, comparer $h(1)$ et $h(3{,}5)$.",
          correction:
            "a) $-5(t - 2)^2 \\leqslant 0$, donc $h(t) \\leqslant 21$, avec égalité en $t = 2$. Le ballon monte à $21$ m, $2$ secondes après la frappe.\nb) $a = -5 < 0$ : $h$ croît sur $[0 ; 2]$, puis décroît sur $[2 ; 4]$. $h(0) = -20 + 21 = 1$ et $h(4) = 1$.\nc) $1$ est à $1$ s avant le sommet : son symétrique est $3$, et $h(1) = h(3)$.\n$3 < 3{,}5$ dans la partie décroissante : $h(3{,}5) < h(3) = h(1)$.\n✔️ $h(1) = 16$ m et $h(3{,}5) = 9{,}75$ m.\n⭐ $h(0) = 1$ : le ballon part du pied, à $1$ m du sol.",
          schema: ecranSeulement(tableauVariations([0, 2, 4], [1, 21, 1], "h", "t")),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "Consommer moins",
          enonce:
            "La consommation d'une voiture, en litres pour $100$ km, est modélisée par $C(v) = 0{,}002(v - 80)^2 + 5$, où $v$ est la vitesse en km/h, entre $50$ et $130$.\na) À quelle vitesse la consommation est-elle la plus faible ? Combien vaut-elle ?\nb) Dresser le tableau de variations de $C$ sur $[50 ; 130]$.\nc) Sans calcul, comparer $C(90)$ et $C(110)$. Que valent $C(60)$ et $C(100)$ ?",
          correction:
            "a) $0{,}002(v - 80)^2 \\geqslant 0$, donc $C(v) \\geqslant 5$, avec égalité pour $v = 80$. La consommation minimale est de $5$ L pour $100$ km, à $80$ km/h.\nb) $a = 0{,}002 > 0$ : $C$ décroît sur $[50 ; 80]$, puis croît sur $[80 ; 130]$.\n$C(50) = 0{,}002 \\times 900 + 5 = 6{,}8$ et $C(130) = 0{,}002 \\times 2\\,500 + 5 = 10$.\nc) $90$ et $110$ sont au-dessus de $80$, où $C$ croît : $C(90) < C(110)$.\n$60$ et $100$ sont à $20$ km/h de part et d'autre de $80$ : $C(60) = C(100) = 0{,}002 \\times 400 + 5 = 5{,}8$.\n⭐ Moins de carburant brûlé, c'est aussi moins de CO₂ rejeté : à $130$ km/h, ce modèle consomme deux fois plus qu'à $80$.",
          schema: tableauVariations([50, 80, 130], [6.8, 5, 10], "C", "v"),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "Les visiteurs d'un parc national",
          enonce:
            "Le nombre de visiteurs d'un parc national de montagne, en milliers par mois, est modélisé par $V(m) = -0{,}5(m - 7)^2 + 12$, où $m$ est le numéro du mois, de $3$ (mars) à $11$ (novembre). Voici sa courbe.\na) Lire le mois où la fréquentation est la plus forte, et le nombre de visiteurs ce mois-là.\nb) Dresser le tableau de variations de $V$ sur $[3 ; 11]$.\nc) Y a-t-il plus de visiteurs en mai ($m = 5$) ou en octobre ($m = 10$) ? Justifier, puis vérifier.",
          figure: parabole([2, 12, -1, 13], [{ q: [-0.5, 7, -12.5] }], [], { grand: true }),
          correction:
            "a) Le sommet est $S(7 ; 12)$ : c'est en juillet que le parc reçoit le plus de visiteurs, $12\\,000$.\nb) $a = -0{,}5 < 0$ : $V$ croît sur $[3 ; 7]$, puis décroît sur $[7 ; 11]$. $V(3) = -8 + 12 = 4$ et $V(11) = 4$.\nc) Mai est à $2$ mois avant juillet ; son symétrique est septembre ($m = 9$) : $V(5) = V(9)$.\n$9 < 10$ dans la partie décroissante : $V(10) < V(9) = V(5)$. Il y a plus de visiteurs en mai.\n✔️ $V(5) = 10$, soit $10\\,000$ visiteurs, et $V(10) = 7{,}5$, soit $7\\,500$.\n⭐ Pour un parc, ce sommet d'été guide l'aménagement : navettes, parkings, gardes en renfort.",
          schema: ecranSeulement(tableauVariations([3, 7, 11], [4, 12, 4], "V", "m")),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "La location de vélos",
          enonce:
            "Une ville loue des vélos à la journée. Au prix de $p$ euros ($0 \\leqslant p \\leqslant 30$), elle loue $120 - 4p$ vélos par jour.\na) Montrer que la recette journalière est $R(p) = -4p(p - 30)$.\nb) Quel prix rend la recette maximale ? Combien vaut-elle ?\nc) Dresser le tableau de variations de $R$ sur $[0 ; 30]$.\nd) Sans calcul, la recette est-elle plus grande à $10$ € ou à $25$ € ?",
          correction:
            "a) Recette = prix × nombre de vélos : $R(p) = p(120 - 4p) = 120p - 4p^2$, et $-4p(p - 30) = -4p^2 + 120p$ ✔️.\nb) Racines $0$ et $30$ : l'axe est $p = 15$. $a = -4 < 0$ : c'est un maximum, $R(15) = 15 \\times 60 = 900$ €.\nc) $R$ croît sur $[0 ; 15]$, puis décroît sur $[15 ; 30]$ ; $R(0) = R(30) = 0$.\nd) $10$ est à $5$ € sous l'axe ; son symétrique est $20$ : $R(10) = R(20)$. $20 < 25$ dans la partie décroissante : $R(25) < R(20) = R(10)$.\nLa recette est plus grande à $10$ €. ✔️ $R(10) = 800$ € et $R(25) = 500$ €.",
          schema: ecranSeulement(tableauVariations([0, 15, 30], [0, 900, 0], "R", "p")),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          enonce:
            "Soit $f(x) = -3(x + 1)(x - 5)$.\na) Déterminer le maximum de $f$.\nb) Dresser le tableau de variations de $f$ sur $[-1 ; 5]$.\nc) Sans calcul, comparer $f(-0{,}5)$ et $f(1{,}5)$, puis $f(\\pi)$ et $f(\\sqrt{10})$.",
          correction:
            "a) Racines $-1$ et $5$ : l'axe est $x = \\dfrac{-1 + 5}{2} = 2$. $f(2) = -3 \\times 3 \\times (-3) = 27$. $a = -3 < 0$ : le maximum est $27$, atteint en $x = 2$.\nb) $f$ croît sur $[-1 ; 2]$, décroît sur $[2 ; 5]$ ; $f(-1) = f(5) = 0$.\nc) $-0{,}5$ et $1{,}5$ sont avant $2$, où $f$ croît : $f(-0{,}5) < f(1{,}5)$.\n$\\pi \\approx 3{,}14$ et $\\sqrt{10} \\approx 3{,}16$ sont après $2$, où $f$ décroît : $\\pi < \\sqrt{10}$ donne $f(\\pi) > f(\\sqrt{10})$.\n⭐ Même avec une calculatrice, les variations tranchent plus vite : $f(\\pi)$ et $f(\\sqrt{10})$ sont très proches.",
          schema: ecranSeulement(tableauVariations([-1, 2, 5], [0, 27, 0])),
          micros: ["quad_comparer_images", "quad_tableau_variations", "quad_extremum"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. On répond par une phrase, avec l'unité.",
      rappel: [
        "Un problème d'optimisation : modéliser, trouver le sommet, dresser le tableau, répondre par une phrase avec l'unité.",
        "Le tableau de variations se fait sur l'intervalle où $x$ a un sens, bornes comprises.",
      ],
      exercices: [
        {
          titre: "La fusée à eau",
          enonce:
            "Au club de sciences, on lance une fusée à eau. Sa hauteur, en mètres, $t$ secondes après le lancement, est $h(t) = -5t(t - 6)$.\na) Au bout de combien de temps la fusée retombe-t-elle au sol ?\nb) Quelle hauteur maximale atteint-elle, et quand ?\nc) Dresser le tableau de variations de $h$ sur $[0 ; 6]$.\nd) Sans calcul, comparer $h(1)$ et $h(4{,}5)$.\ne) On admet que $h(t) - 40 = -5(t - 2)(t - 4)$. Pendant combien de temps la fusée est-elle au-dessus de $40$ m ?",
          correction:
            "a) $h(t) = 0$ pour $t = 0$ (le lancement) ou $t = 6$ : elle retombe au bout de $6$ secondes.\nb) L'axe est au milieu, $t = 3$. $h(3) = -5 \\times 3 \\times (-3) = 45$ : $45$ m, $3$ secondes après le lancement. $a = -5 < 0$ : c'est un maximum.\nc) $h$ croît sur $[0 ; 3]$, puis décroît sur $[3 ; 6]$ ; $h(0) = h(6) = 0$.\nd) Le symétrique de $1$ par rapport à $3$ est $5$ : $h(1) = h(5)$. $4{,}5 < 5$ dans la partie décroissante : $h(4{,}5) > h(5) = h(1)$.\n✔️ $h(1) = 25$ m et $h(4{,}5) = 33{,}75$ m.\ne) $-5(t - 2)(t - 4)$ est positif ENTRE $2$ et $4$ (le coefficient $-5$ est négatif). La fusée est au-dessus de $40$ m de $t = 2$ à $t = 4$ : pendant $2$ secondes.\n⭐ Sur le dessin (hauteur en dizaines de mètres), la droite violette $y = 4$ coupe la courbe en $t = 2$ et $t = 4$, symétriques par rapport à l'axe.",
          schema: et(
            ecranSeulement(tableauVariations([0, 3, 6], [0, 45, 0], "h", "t")),
            parabole([-1, 7, -1, 6], [{ q: [-0.5, 3, 0] }], [{ x: 2, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 4.5, label: "S" }], { axe: 3, horizontale: 4 }),
          ),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "Pêcher sans vider la mer",
          enonce:
            "Dans un modèle d'écologie des pêches, un stock de poissons de $N$ tonnes ($0 \\leqslant N \\leqslant 100$) se renouvelle chaque année de $G(N) = -0{,}005N(N - 100)$ tonnes. Si l'on pêche chaque année exactement $G(N)$ tonnes, le stock reste stable.\na) Que valent $G(0)$ et $G(100)$ ? Interpréter.\nb) Dresser le tableau de variations de $G$ sur $[0 ; 100]$. Quelle pêche annuelle maximale le stock peut-il supporter, et pour quelle taille de stock ?\nc) Sans calcul, le stock se renouvelle-t-il plus à $30$ tonnes ou à $80$ tonnes ?",
          correction:
            "a) $G(0) = 0$ : sans poissons, pas de naissances. $G(100) = 0$ : à $100$ tonnes, le milieu est saturé, le stock ne grandit plus.\nb) Racines $0$ et $100$ : l'axe est $N = 50$. $G(50) = -0{,}005 \\times 50 \\times (-50) = 12{,}5$. $a = -0{,}005 < 0$ : c'est un maximum.\n$G$ croît sur $[0 ; 50]$, puis décroît sur $[50 ; 100]$.\nLe stock supporte au plus $12{,}5$ tonnes de pêche par an, quand il compte $50$ tonnes.\nc) Le symétrique de $30$ par rapport à $50$ est $70$ : $G(30) = G(70)$. $70 < 80$ dans la partie décroissante : $G(80) < G(70) = G(30)$. Il se renouvelle plus à $30$ tonnes.\n✔️ $G(30) = 10{,}5$ t et $G(80) = 8$ t, comme sur le diagramme.\n⭐ Les biologistes appellent ce maximum le « rendement maximal durable ». Pêcher plus vide peu à peu la mer.",
          schema: et(
            ecranSeulement(tableauVariations([0, 50, 100], [0, 12.5, 0], "G", "N")),
            diagramme("barres", [
              { label: "20 t", value: 8 },
              { label: "30 t", value: 10.5 },
              { label: "50 t", value: 12.5 },
              { label: "70 t", value: 10.5 },
              { label: "80 t", value: 8 },
            ]),
          ),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "Le prix de la salle d'escalade",
          enonce:
            "Une salle d'escalade compte $500 - 10p$ abonnés quand l'abonnement mensuel coûte $p$ euros ($0 \\leqslant p \\leqslant 50$). Aujourd'hui, il coûte $20$ €.\na) Montrer que la recette mensuelle est $R(p) = -10p(p - 50)$.\nb) Dresser le tableau de variations de $R$ sur $[0 ; 50]$.\nc) Quel prix rend la recette maximale ? Combien la salle gagnerait-elle de plus qu'aujourd'hui ?\nd) Un gérant propose de passer à $32$ €. Sans calcul, la recette serait-elle meilleure qu'aujourd'hui ?",
          correction:
            "a) $R(p) = p(500 - 10p) = 500p - 10p^2$, et $-10p(p - 50) = -10p^2 + 500p$ ✔️.\nb) Racines $0$ et $50$ : l'axe est $p = 25$. $R(25) = 25 \\times 250 = 6\\,250$. $a = -10 < 0$ : $R$ croît sur $[0 ; 25]$, puis décroît sur $[25 ; 50]$ ; $R(0) = R(50) = 0$.\nc) La recette est maximale à $25$ € : $6\\,250$ € par mois. Aujourd'hui, $R(20) = 20 \\times 300 = 6\\,000$ € : la salle gagnerait $250$ € de plus.\nd) Le symétrique de $20$ par rapport à $25$ est $30$ : $R(20) = R(30)$. $30 < 32$ dans la partie décroissante : $R(32) < R(30) = R(20)$.\nNon : à $32$ €, la recette serait MOINS bonne qu'aujourd'hui. ✔️ $R(32) = 32 \\times 180 = 5\\,760$ €.\n⚠️ Monter les prix ne paie que jusqu'au sommet.",
          schema: tableauVariations([0, 25, 50], [0, 6250, 0], "R", "p"),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
        {
          titre: "Le vol parabolique",
          enonce:
            "Pour entraîner des astronautes, un avion vole le long d'une parabole : pendant ce temps, les passagers flottent, en apesanteur. Dans ce modèle, l'altitude de l'avion, en mètres, $t$ secondes après le début de la parabole, est $z(t) = -2(t - 10)^2 + 8\\,000$, pour $t$ entre $0$ et $20$.\na) Quelle altitude maximale l'avion atteint-il, et quand ?\nb) Dresser le tableau de variations de $z$ sur $[0 ; 20]$.\nc) Sans calcul, l'avion est-il plus haut à $t = 4$ ou à $t = 18$ ?\nd) On admet que $z(t) - 7\\,950 = -2(t - 5)(t - 15)$. Pendant combien de temps l'avion est-il au-dessus de $7\\,950$ m ?",
          correction:
            "a) $-2(t - 10)^2 \\leqslant 0$, donc $z(t) \\leqslant 8\\,000$, avec égalité en $t = 10$ : $8\\,000$ m, au bout de $10$ secondes.\nb) $a = -2 < 0$ : $z$ croît sur $[0 ; 10]$, puis décroît sur $[10 ; 20]$. $z(0) = -2 \\times 100 + 8\\,000 = 7\\,800$ et $z(20) = 7\\,800$.\nc) Le symétrique de $4$ par rapport à $10$ est $16$ : $z(4) = z(16)$. $16 < 18$ dans la partie décroissante : $z(18) < z(16) = z(4)$. Il est plus haut à $t = 4$.\n✔️ $z(4) = 7\\,928$ m et $z(18) = 7\\,872$ m.\nd) $-2(t - 5)(t - 15)$ est positif entre $5$ et $15$ : l'avion est au-dessus de $7\\,950$ m pendant $10$ secondes.\n⚠️ Les nombres sont grands, mais le raisonnement est le même qu'avec $f(x) = -2(x - 10)^2 + 8$ : seul le sommet compte.",
          schema: tableauVariations([0, 10, 20], [7800, 8000, 7800], "z", "t"),
          micros: ["quad_extremum", "quad_tableau_variations", "quad_comparer_images"],
        },
      ],
    },
  ],
};
