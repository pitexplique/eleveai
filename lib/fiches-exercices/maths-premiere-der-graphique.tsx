// ─── Fiche d'exercices : lire un nombre dérivé sur un graphique (1re, sans spé) ─
//                              20 exercices corrigés
//
// Première des six feuilles du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026) : une feuille par notion du coach
// (`der_graphique`). Alignée sur `lib/tutor-v4/questionBank/premiere/maths/derivee-lecture.bank.ts`.
//
// ⛔⛔ LE PROGRAMME, PAS CELUI DE LA SPÉ : ici, AUCUN calcul de dérivée. Le
// nombre dérivé se LIT : coefficient directeur de la tangente tracée, signe
// donné par l'allure de la courbe, tangente horizontale au sommet ou au creux.
// Les formules viennent dans les feuilles suivantes (der-formules, der-polynome).
//
// ⭐ Frédéric, 28/09 : « beaucoup de canvas et de visuel », et des élèves de
// première qui « détestent tous les maths » : treize courbes imprimées, chacune
// avec ses tangentes. Physique : la voiture qui démarre (10), le thé qui
// refroidit (18). Histoire-géo : la crue (9), la route du col (11), l'exode
// rural et le retour à la campagne (14), le sentier (17). Économie : le miel
// (12), le parc naturel (19). Écologie et nature : les forêts replantées (15),
// la journée d'été (16). Sport : le lancer au basket (13), le marathon (20).
// Les chiffres sont des MODÈLES arrondis, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-graphique.mjs`.
//
// Micro-compétences : der_tangente_lire (1, 4, 5, 8, 9, 10, 11, 12, 13, 14,
// 15, 17, 18, 19, 20), der_tangente_signe (2, 4, 7, 11, 12, 13, 14, 16, 17,
// 18, 19), der_tangente_horizontale (3, 6, 7, 11, 12, 13, 14, 16, 17, 18, 19),
// der_comparer_vitesses (8, 9, 10, 15, 16, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauSignes } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé. Les courbes qu'on LIT restent imprimées (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDerGraphiquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-graphique",
  titre: "Lire un nombre dérivé sur un graphique",
  accroche:
    "Vingt exercices pour lire la dérivée sur une courbe, sans aucun calcul de dérivée : la pente d'une tangente, le signe, les tangentes horizontales, la comparaison de deux vitesses. Une crue, un col, un village, une voiture, un thé qui refroidit. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par exercice. On regarde la tangente, on écrit le résultat.",
      rappel: [
        "$f'(a)$, le nombre dérivé de $f$ en $a$, est le COEFFICIENT DIRECTEUR de la tangente à la courbe au point d'abscisse $a$.",
        "Pour le lire : on part du point de contact, on avance de $1$ sur la tangente, et on compte de combien elle monte (ou descend).",
        "$f'(a) > 0$ : la courbe monte en $a$. $f'(a) < 0$ : elle descend. $f'(a) = 0$ : la tangente est horizontale.",
      ],
      exercices: [
        {
          enonce: "La droite orange est la tangente à la courbe de $f$ au point $A$ d'abscisse $2$. Lire $f(2)$ et $f'(2)$.",
          figure: repere([-1, 4, -3, 4], [{ q: [0.5, 0, -2] }, { q: [0, 2, -4], couleur: ORANGE }], [{ x: 2, y: 0, label: "A" }]),
          correction:
            "$f(2)$ est l'ordonnée de $A$ : $f(2) = 0$.\n$f'(2)$ est le coefficient directeur de la tangente. On part de $A(2 ; 0)$ et on avance de $1$ : la tangente passe par $(3 ; 2)$. Elle est montée de $2$.\nDonc $f'(2) = 2$.\n⛔ Ne pas confondre les deux : $f(2)$ se lit sur l'axe vertical, $f'(2)$ est une PENTE, elle se lit sur la tangente.\n⚠️ $f(2) = 0$ n'empêche pas $f'(2)$ d'être positif : la courbe traverse l'axe en montant.",
          micros: ["der_tangente_lire"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. Donner le signe de $f'(-2)$, de $f'(0)$ et de $f'(1)$, sans calcul.",
          figure: repere([-3, 3, -4, 4], [{ p: [1, 0, -3, 0] }], [
            { x: -2, y: -2, label: "A" },
            { x: 0, y: 0, label: "B" },
            { x: 1, y: -2, label: "C" },
          ]),
          correction:
            "On regarde si la courbe MONTE ou DESCEND quand on la parcourt de gauche à droite.\nEn $A$ (abscisse $-2$), la courbe monte : $f'(-2) > 0$.\nEn $B$ (abscisse $0$), elle descend : $f'(0) < 0$.\nEn $C$ (abscisse $1$), elle est au fond d'un creux : la tangente est horizontale, $f'(1) = 0$.\n⚠️ Le signe de $f'(a)$ ne dépend pas du signe de $f(a)$ : en $A$, la courbe est sous l'axe, et pourtant elle monte.",
          schema: ecranSeulement(
            repere(
              [-3, 3, -4, 4],
              [
                { p: [1, 0, -3, 0] },
                { q: [0, 9, 16], couleur: ORANGE },
                { q: [0, -3, 0], couleur: ORANGE },
                { q: [0, 0, -2], couleur: ORANGE },
              ],
              [
                { x: -2, y: -2, label: "A" },
                { x: 0, y: 0, label: "B" },
                { x: 1, y: -2, label: "C" },
              ],
            ),
          ),
          micros: ["der_tangente_signe"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. En quels points la tangente est-elle horizontale ? Que valent $f'$ et $f$ en ces points ?",
          figure: repere([-1, 5, -2, 6], [{ p: [1, -6, 9, 0] }]),
          correction:
            "La tangente est horizontale au sommet d'une bosse et au fond d'un creux.\nEn $x = 1$, la courbe atteint un sommet : $f'(1) = 0$ et $f(1) = 4$. C'est un MAXIMUM local.\nEn $x = 3$, elle touche le fond d'un creux : $f'(3) = 0$ et $f(3) = 0$. C'est un MINIMUM local.\n⚠️ En $x = 3$, $f(3) = 0$ ET $f'(3) = 0$ : ces deux zéros n'ont pas le même sens. Le premier dit où est le point, le second dit que la tangente est plate.",
          schema: ecranSeulement(
            repere([-1, 5, -2, 6], [{ p: [1, -6, 9, 0] }, { q: [0, 0, 4], couleur: ORANGE }], [
              { x: 1, y: 4, label: "" },
              { x: 3, y: 0, label: "" },
            ]),
          ),
          micros: ["der_tangente_horizontale"],
        },
        {
          enonce:
            "Le point $A(2 ; 2)$ est sur la courbe d'une fonction $f$. La tangente à la courbe en $A$ passe aussi par le point $B(3 ; 0)$.\nPlacer $A$ et $B$ dans un repère, tracer la tangente, puis lire $f'(2)$. La courbe monte-t-elle ou descend-elle en $A$ ?",
          correction:
            "On part de $A(2 ; 2)$ et on avance de $1$ : on arrive en $B(3 ; 0)$. La tangente est DESCENDUE de $2$.\nDonc $f'(2) = -2$.\nLe nombre dérivé est négatif : la courbe descend en $A$.\n⚠️ Une descente se compte en NÉGATIF : on écrit $f'(2) = -2$, pas $2$.\n⭐ Sur le dessin, une courbe possible : elle passe par $A$ et colle à la droite $(AB)$ tout près de $A$.",
          schema: ecranSeulement(
            repere([-1, 5, -2, 6], [{ q: [-0.5, 0, 4] }, { q: [0, -2, 6], couleur: ORANGE }], [
              { x: 2, y: 2, label: "A" },
              { x: 3, y: 0, label: "B" },
            ]),
          ),
          micros: ["der_tangente_lire", "der_tangente_signe"],
        },
        {
          enonce: "La droite orange est la tangente à la courbe de $f$ au point $A(1 ; 1)$. Lire $f'(1)$.",
          figure: repere([-1, 5, -1, 5], [{ q: [0.25, 0, 0.75] }, { q: [0, 0.5, 0.5], couleur: ORANGE }], [
            { x: 1, y: 1, label: "A" },
            { x: 3, y: 2, label: "" },
          ]),
          correction:
            "Quand on avance de $1$ à partir de $A$, la tangente monte d'un demi-carreau : difficile à lire.\nOn avance donc de $2$ : la tangente passe par $(3 ; 2)$. Elle est montée de $1$.\nMonter de $1$ pour $2$ pas, c'est monter de $0{,}5$ pour $1$ pas : $f'(1) = \\dfrac{1}{2} = 0{,}5$.\n⭐ Quand le point d'arrivée tombe entre deux carreaux, on avance de $2$, de $3$ ou de $4$, jusqu'à tomber sur un nœud du quadrillage, puis on divise.",
          micros: ["der_tangente_lire"],
        },
        {
          enonce: "La courbe d'une fonction $f$ a pour point le plus haut $S(3 ; 5)$.\na) Que vaut $f'(3)$ ?\nb) Que vaut $f(3)$ ?\nc) Donner l'équation de la tangente en $S$.",
          correction:
            "a) Au sommet d'une bosse, la tangente est horizontale : $f'(3) = 0$.\nb) $S$ est sur la courbe : $f(3) = 5$.\nc) La tangente est horizontale et passe par $S$ : c'est la droite $y = 5$.\n⚠️ $f'(3) = 0$ ne veut pas dire que la courbe passe par $0$ : c'est sa PENTE qui est nulle, pas sa hauteur.",
          schema: ecranSeulement(repere([-1, 6, -2, 7], [{ q: [-1, 6, -4] }, { q: [0, 0, 5], couleur: ORANGE }], [{ x: 3, y: 5, label: "S" }])),
          micros: ["der_tangente_horizontale"],
        },
        {
          enonce: "La courbe d'une fonction $f$ monte sur $[0 ; 4]$, puis descend sur $[4 ; 7]$. Donner le signe de $f'(2)$, la valeur de $f'(4)$ et le signe de $f'(6)$.",
          correction:
            "Sur $[0 ; 4]$, la courbe monte : $f'(2) > 0$.\nEn $4$, elle passe d'une montée à une descente : c'est un sommet, la tangente y est horizontale, $f'(4) = 0$.\nSur $[4 ; 7]$, elle descend : $f'(6) < 0$.\n⭐ On n'a pas besoin de la courbe : le sens de variation suffit pour connaître le signe du nombre dérivé.",
          schema: ecranSeulement(
            repere([-1, 8, -2, 6], [{ q: [-0.25, 2, 0] }], [
              { x: 2, y: 3, label: "" },
              { x: 4, y: 4, label: "" },
              { x: 6, y: 3, label: "" },
            ]),
          ),
          micros: ["der_tangente_signe", "der_tangente_horizontale"],
        },
        {
          enonce:
            "Les tangentes à la courbe de $f$ en $A$ et en $C$ sont tracées ; en $B$, la tangente est l'axe des abscisses.\na) Lire $f'(-2)$, $f'(0)$ et $f'(2)$, puis les ranger dans l'ordre croissant.\nb) En quel point la courbe est-elle la plus raide ?",
          figure: repere([-3, 4, -2, 6], [{ q: [0.5, 0, 0] }, { q: [0, -2, -2], couleur: ORANGE }, { q: [0, 2, -2], couleur: ORANGE }], [
            { x: -2, y: 2, label: "A" },
            { x: 0, y: 0, label: "B" },
            { x: 2, y: 2, label: "C" },
          ]),
          correction:
            "a) En $A(-2 ; 2)$, on avance de $1$ : la tangente passe par $(-1 ; 0)$, elle descend de $2$. Donc $f'(-2) = -2$.\nEn $B$, la tangente est horizontale : $f'(0) = 0$.\nEn $C(2 ; 2)$, la tangente passe par $(3 ; 4)$ : elle monte de $2$. Donc $f'(2) = 2$.\nDans l'ordre croissant : $f'(-2) < f'(0) < f'(2)$.\nb) La courbe est aussi raide en $A$ qu'en $C$ : les deux tangentes font $2$ carreaux de montée ou de descente par pas.\n⚠️ Le plus petit nombre dérivé n'est pas la courbe la « moins raide » : $-2$ est plus petit que $0$, et pourtant la courbe est bien plus raide en $A$ qu'en $B$. La raideur, c'est le nombre dérivé sans son signe.",
          micros: ["der_tangente_lire", "der_comparer_vitesses"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "La courbe raconte une histoire : on lit les tangentes, puis on répond avec les unités.",
      rappel: [
        "Dans un problème, $f'(a)$ est une VITESSE : l'unité de $f$ par unité de $x$ (mètres par jour, habitants par an…).",
        "Plus la tangente est raide, plus ça va vite. Son signe dit si ça monte ou si ça descend.",
        "Tangente horizontale : $f'(a) = 0$. C'est un sommet (maximum) ou un creux (minimum).",
        "Une pente de $10$ % : on monte de $10$ m pour $100$ m parcourus à l'horizontale.",
      ],
      exercices: [
        {
          titre: "La crue d'une rivière",
          enonce:
            "Pendant une crue, la hauteur d'une rivière au-dessus de son niveau habituel, en mètres, est donnée par la courbe ci-dessous ($t$ en jours). Les tangentes aux jours $1$ et $2$ sont tracées.\na) Lire $h'(1)$ et $h'(2)$.\nb) Lequel de ces deux jours la rivière monte-t-elle le plus vite ?",
          figure: repere(
            [-1, 7, -1, 10],
            [{ q: [-1, 6, 0] }, { q: [0, 4, 1], couleur: ORANGE }, { q: [0, 2, 4], couleur: ORANGE }],
            [
              { x: 1, y: 5, label: "A" },
              { x: 2, y: 8, label: "B" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) En $A(1 ; 5)$, on avance d'un jour sur la tangente : elle passe par $(2 ; 9)$. Elle monte de $4$, donc $h'(1) = 4$.\nEn $B(2 ; 8)$, la tangente passe par $(3 ; 10)$ : elle monte de $2$, donc $h'(2) = 2$.\nb) $h'(1) = 4 > h'(2) = 2$ : la rivière monte plus vite le jour $1$, à $4$ mètres par jour, contre $2$ mètres par jour le jour $2$.\n⚠️ Le jour $2$, l'eau est plus HAUTE ($8$ m contre $5$ m), mais elle monte moins VITE. La hauteur, c'est $h$ ; la vitesse, c'est $h'$.",
          micros: ["der_comparer_vitesses", "der_tangente_lire"],
        },
        {
          titre: "Une voiture qui démarre",
          enonce:
            "Une voiture démarre à un feu. La distance parcourue, en dizaines de mètres, est $d(t)$, où $t$ est le temps en secondes. La tangente au point $A$ est tracée.\na) Lire $d'(2)$. C'est la vitesse de la voiture à $t = 2$ : la donner en mètres par seconde, puis en km/h.\nb) Sans calcul, la voiture roule-t-elle plus vite ou moins vite en $B$ qu'en $A$ ?",
          figure: repere([-1, 6, -1, 9], [{ q: [0.5, 0, 0] }, { q: [0, 2, -2], couleur: ORANGE }], [
            { x: 2, y: 2, label: "A" },
            { x: 4, y: 8, label: "B" },
          ]),
          correction:
            "a) On part de $A(2 ; 2)$ et on avance d'une seconde : la tangente passe par $(3 ; 4)$. Elle monte de $2$.\nDonc $d'(2) = 2$ dizaines de mètres par seconde, soit $20$ m/s.\nPour passer en km/h, on multiplie par $3{,}6$ : $20 \\times 3{,}6 = 72$ km/h.\nb) En $B$, la courbe est bien plus raide qu'en $A$ : la voiture roule plus vite.\n⭐ En physique, la vitesse instantanée est le nombre dérivé de la distance : c'est ce qu'affiche le compteur.\n⚠️ L'unité de $d'(2)$ est celle de $d$ divisée par celle de $t$ : des dizaines de mètres PAR seconde.",
          micros: ["der_tangente_lire", "der_comparer_vitesses"],
        },
        {
          titre: "La route d'un col",
          enonce:
            "Une route monte vers un col de montagne. Son altitude, en centaines de mètres, est $a(x)$, où $x$ est la distance parcourue en kilomètres. Les tangentes en $A$ et en $S$ sont tracées.\na) Lire $a'(2)$. De combien de mètres la route monte-t-elle par kilomètre en $A$ ? Quelle est sa pente, en % ?\nb) Que vaut $a'(4)$ ? Que se passe-t-il en $S$ ?\nc) Quel est le signe de $a'(6)$ ?",
          figure: repere([-1, 9, -1, 9], [{ q: [-0.25, 2, 3] }, { q: [0, 1, 4], couleur: ORANGE }, { q: [0, 0, 7], couleur: ORANGE }], [
            { x: 2, y: 6, label: "A" },
            { x: 4, y: 7, label: "S" },
          ]),
          correction:
            "a) On part de $A(2 ; 6)$ et on avance d'un kilomètre : la tangente passe par $(3 ; 7)$. Elle monte de $1$.\nDonc $a'(2) = 1$ centaine de mètres par kilomètre : la route monte de $100$ m par kilomètre.\nPour $1\\,000$ m à l'horizontale, elle monte de $100$ m : c'est une pente de $10$ %.\nb) En $S$, la tangente est horizontale : $a'(4) = 0$. C'est le col, le point le plus haut de la route, à $700$ m d'altitude.\nc) Après le col, la route redescend : $a'(6) < 0$.\n⚠️ Les deux unités ne sont pas les mêmes : l'altitude est en centaines de mètres, la distance en kilomètres. On convertit tout en mètres avant de parler de pourcentage.",
          micros: ["der_tangente_lire", "der_tangente_horizontale", "der_tangente_signe"],
        },
        {
          titre: "Le prix du pot de miel",
          enonce:
            "Un apiculteur vend ses pots de miel $x$ euros pièce. Son bénéfice, en centaines d'euros, est $B(x)$. Sur la courbe de $B$, on a tracé trois tangentes :\n• en $x = 3$, elle passe par $(3 ; 4)$ et par $(4 ; 6)$ ;\n• en $x = 5$, elle est horizontale, au point $(5 ; 6)$ ;\n• en $x = 7$, elle passe par $(7 ; 4)$ et par $(8 ; 2)$.\na) Donner $B'(3)$, $B'(5)$ et $B'(7)$.\nb) À quel prix l'apiculteur fait-il le plus grand bénéfice ?\nc) Il vend aujourd'hui ses pots $3$ euros. A-t-il intérêt à augmenter un peu son prix ?",
          correction:
            "a) En $x = 3$, la tangente avance de $1$ et monte de $6 - 4 = 2$ : $B'(3) = 2$.\nEn $x = 5$, elle est horizontale : $B'(5) = 0$.\nEn $x = 7$, elle avance de $1$ et descend de $4 - 2 = 2$ : $B'(7) = -2$.\nb) La courbe monte en $3$, est plate en $5$, descend en $7$ : le sommet est en $x = 5$. Le bénéfice le plus grand est obtenu pour un pot à $5$ euros, et il vaut $6$ centaines d'euros, soit $600$ euros.\nc) $B'(3) = 2 > 0$ : à $3$ euros, la courbe monte. Augmenter un peu le prix fait augmenter le bénéfice.\n⚠️ Un prix plus élevé ne rapporte pas toujours plus : au-delà de $5$ euros, $B'$ est négatif, les clients achètent moins et le bénéfice baisse.",
          schema: ecranSeulement(
            repere(
              [-1, 9, -2, 8],
              [{ q: [-0.5, 5, -6.5] }, { q: [0, 2, -2], couleur: ORANGE }, { q: [0, 0, 6], couleur: ORANGE }, { q: [0, -2, 18], couleur: ORANGE }],
              [
                { x: 3, y: 4, label: "" },
                { x: 5, y: 6, label: "" },
                { x: 7, y: 4, label: "" },
              ],
            ),
          ),
          micros: ["der_tangente_lire", "der_tangente_horizontale", "der_tangente_signe"],
        },
        {
          titre: "Le tir au basket",
          enonce:
            "La courbe donne la hauteur $h(x)$ d'un ballon de basket, en mètres, en fonction de la distance horizontale $x$ parcourue, en mètres. Le ballon part de $D$. Les tangentes en $D$ et en $P$ sont tracées.\na) Lire $h'(0)$ et $h'(4)$. Que disent leurs signes ?\nb) Que vaut $h'(2)$ au sommet $S$ ?\nc) Le ballon monte-t-il aussi raide qu'il redescend ?",
          figure: repere([-1, 6, -1, 6], [{ q: [-0.5, 2, 2] }, { q: [0, 2, 2], couleur: ORANGE }, { q: [0, -2, 10], couleur: ORANGE }], [
            { x: 0, y: 2, label: "D" },
            { x: 2, y: 4, label: "S" },
            { x: 4, y: 2, label: "P" },
          ]),
          correction:
            "a) En $D(0 ; 2)$, on avance de $1$ : la tangente passe par $(1 ; 4)$, elle monte de $2$. Donc $h'(0) = 2$.\nEn $P(4 ; 2)$, la tangente passe par $(5 ; 0)$ : elle descend de $2$. Donc $h'(4) = -2$.\n$h'(0) > 0$ : au départ, le ballon monte. $h'(4) < 0$ : en $P$, il redescend.\nb) Au sommet $S$, la tangente est horizontale : $h'(2) = 0$. Le ballon est au plus haut, à $4$ m.\nc) Oui : en $D$ et en $P$, les tangentes sont aussi raides l'une que l'autre, $2$ carreaux par pas. Seul le signe change.\n⭐ Ici, $h'(x)$ n'est pas une vitesse : c'est la PENTE de la trajectoire, car $x$ est une distance et non un temps.",
          micros: ["der_tangente_signe", "der_tangente_horizontale", "der_tangente_lire"],
        },
        {
          titre: "Un village de montagne",
          enonce:
            "Pendant l'exode rural, les campagnes françaises se sont vidées au profit des villes ; à la fin du XXᵉ siècle, certaines se sont repeuplées. Dans un modèle, la population d'un village, en centaines d'habitants, est $P(t)$, où $t$ est le nombre de décennies depuis 1900.\na) Lire $P'(2)$. Que se passe-t-il en 1920 ?\nb) En quelle année la population est-elle la plus basse ? Que vaut $P'(6)$ ?\nc) Quel est le signe de $P'(9)$ ? Qu'en conclure pour les années 1990 ?",
          figure: repere(
            [-1, 11, -1, 12],
            [{ q: [0.25, -3, 11] }, { q: [0, -2, 10], couleur: ORANGE }, { q: [0, 0, 2], couleur: ORANGE }],
            [
              { x: 2, y: 6, label: "A" },
              { x: 6, y: 2, label: "M" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) On part de $A(2 ; 6)$ et on avance d'une décennie : la tangente passe par $(3 ; 4)$. Elle descend de $2$.\nDonc $P'(2) = -2$ : en 1920, le village perd environ $200$ habitants par décennie. Ce sont les départs de l'exode rural.\nb) Le point le plus bas est $M(6 ; 2)$ : $t = 6$, soit en 1960, avec $200$ habitants. La tangente y est horizontale : $P'(6) = 0$.\nc) Après $M$, la courbe remonte : $P'(9) > 0$. Dans les années 1990, le village regagne des habitants.\n⚠️ En 1960, $P'(6) = 0$ ne veut pas dire que le village est vide : c'est la VITESSE qui est nulle, la population, elle, vaut $200$ habitants.",
          micros: ["der_tangente_lire", "der_tangente_horizontale", "der_tangente_signe"],
        },
        {
          titre: "Deux forêts replantées",
          enonce:
            "Deux forêts ont été replantées après un incendie. On suit la hauteur moyenne de leurs arbres, en mètres, en fonction de leur âge, en années. À $4$ ans :\n• forêt $A$ : les arbres mesurent $6$ m, et la tangente à la courbe passe par le point $(6 ; 7)$ ;\n• forêt $B$ : les arbres mesurent $3$ m, et la tangente passe par le point $(5 ; 4)$.\na) Calculer le coefficient directeur de chaque tangente.\nb) Quelle forêt a les arbres les plus hauts à $4$ ans ? Laquelle pousse le plus vite ?",
          correction:
            "a) Forêt $A$ : la tangente passe par $(4 ; 6)$ et $(6 ; 7)$. Elle monte de $1$ quand on avance de $2$ : son coefficient directeur vaut $\\dfrac{7 - 6}{6 - 4} = 0{,}5$.\nForêt $B$ : elle passe par $(4 ; 3)$ et $(5 ; 4)$. Elle monte de $1$ quand on avance de $1$ : son coefficient directeur vaut $1$.\nb) À $4$ ans, les arbres de $A$ sont les plus hauts : $6$ m contre $3$ m.\nMais ceux de $B$ poussent le plus vite : $1$ m par an, contre $0{,}5$ m par an pour $A$.\n⚠️ Être en avance ne veut pas dire aller plus vite : la hauteur se lit sur la courbe, la vitesse sur la tangente.",
          schema: ecranSeulement(
            repere(
              [-1, 7, -1, 9],
              [{ q: [-0.0625, 1, 3] }, { q: [0.125, 0, 1], couleur: VERT }, { q: [0, 0.5, 4], couleur: ORANGE }, { q: [0, 1, -1], couleur: ORANGE }],
              [
                { x: 4, y: 6, label: "A" },
                { x: 4, y: 3, label: "B" },
              ],
            ),
          ),
          micros: ["der_tangente_lire", "der_comparer_vitesses"],
        },
        {
          titre: "Une journée d'été",
          enonce:
            "Pendant une journée d'été, $T(t)$ est la température, en °C, à l'heure $t$. Des mesures donnent : $T'(9) = 2{,}4$ ; $T'(15) = 0$ ; $T'(19) = -1{,}6$, en °C par heure.\na) À $9$ h, la température monte-t-elle ou baisse-t-elle ? Et à $19$ h ?\nb) Sachant que la température monte toute la matinée et baisse toute la soirée, que se passe-t-il à $15$ h ?\nc) Parmi ces trois heures, quand la température change-t-elle le plus vite ?",
          correction:
            "a) $T'(9) = 2{,}4 > 0$ : à $9$ h, la température monte, d'environ $2{,}4$ °C par heure.\n$T'(19) = -1{,}6 < 0$ : à $19$ h, elle baisse.\nb) À $15$ h, la tangente est horizontale, entre une montée et une descente : c'est le maximum de la journée, l'heure la plus chaude.\nc) On compare les vitesses SANS leur signe : $2{,}4$ à $9$ h, $0$ à $15$ h, $1{,}6$ à $19$ h.\nC'est à $9$ h que la température change le plus vite.\n⚠️ $-1{,}6$ est plus petit que $0$, mais la température bouge davantage à $19$ h qu'à $15$ h : pour comparer des vitesses, on oublie le signe.",
          schema: ecranSeulement(tableauSignes(["9", "15", "19"], [["$T'(t)$", ["+", "-"], ["0"]]], "t")),
          micros: ["der_tangente_signe", "der_tangente_horizontale", "der_comparer_vitesses"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Tout se lit sur la courbe.",
      rappel: [
        "On lit chaque nombre dérivé sur SA tangente : on part du point de contact, on avance de $1$ (ou de $2$), on compte la montée.",
        "On traduit avec les unités : des °C par minute, des visiteurs par heure, des mètres par kilomètre.",
        "Comparer deux vitesses, c'est comparer deux raideurs : la tangente la plus raide va le plus vite, qu'elle monte ou qu'elle descende.",
      ],
      exercices: [
        {
          titre: "Le sentier de montagne",
          enonce:
            "Un randonneur suit un sentier de montagne. Son altitude, en centaines de mètres, est $h(x)$, où $x$ est la distance parcourue en kilomètres ($0 \\leqslant x \\leqslant 6$). La courbe et deux tangentes sont tracées.\na) Lire $h'(2)$ sur la tangente en $A$. De combien de mètres le sentier monte-t-il par kilomètre en ce point ? Quelle est sa pente, en % ?\nb) Que vaut $h'(4)$ ? Que se passe-t-il au point $S$ ?\nc) Quel est le signe de $h'(x)$ entre $4$ et $6$ ?\nd) Entre $A$ et $S$, le sentier devient-il plus raide ou moins raide ?",
          figure: repere(
            [-1, 7, -1, 11],
            [{ p: [-0.25, 1.5, 0, 2] }, { q: [0, 3, 0], couleur: ORANGE }, { q: [0, 0, 10], couleur: ORANGE }],
            [
              { x: 2, y: 6, label: "A" },
              { x: 4, y: 10, label: "S" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) La tangente en $A(2 ; 6)$ passe par $(3 ; 9)$ : quand on avance de $1$, elle monte de $3$. Donc $h'(2) = 3$.\nL'unité de $h'$ est celle de $h$ divisée par celle de $x$ : des centaines de mètres PAR kilomètre. Le sentier monte de $300$ m par kilomètre.\nPour $1\\,000$ m parcourus, il monte de $300$ m : c'est une pente de $30$ %.\nb) En $S$, la tangente est horizontale : $h'(4) = 0$. Le randonneur est au SOMMET, à $1\\,000$ m d'altitude.\nc) Après $S$, la courbe descend : $h'(x) < 0$ entre $4$ et $6$. Le sentier redescend.\nd) De $A$ à $S$, les tangentes s'aplatissent : la pente passe de $3$ à $0$. Le sentier devient MOINS raide à l'approche du sommet.\n⭐ Le plus raide n'est pas le plus haut : en $A$, on est à $600$ m et ça grimpe fort ; au sommet $S$, la pente est nulle.",
          micros: ["der_tangente_lire", "der_tangente_horizontale", "der_tangente_signe", "der_comparer_vitesses"],
        },
        {
          titre: "Le thé qui refroidit",
          enonce:
            "On verse de l'eau bouillante dans une théière. Sa température, en dizaines de degrés Celsius, est $T(t)$, où $t$ est le temps en dizaines de minutes ($0 \\leqslant t \\leqslant 8$). Les tangentes en $A$, $B$ et $C$ sont tracées.\na) Lire $T'(0)$ et $T'(4)$. Les traduire en °C par minute.\nb) Le thé refroidit-il plus vite au début ou à $t = 4$ ?\nc) Que vaut $T'(8)$ ? Que se passe-t-il en $C$ ?\nd) Quel est le signe de $T'(t)$ entre $0$ et $8$ ? Que fait la température ?",
          figure: repere(
            [-1, 9, -1, 11],
            [{ q: [0.125, -2, 10] }, { q: [0, -2, 10], couleur: ORANGE }, { q: [0, -1, 8], couleur: ORANGE }, { q: [0, 0, 2], couleur: ORANGE }],
            [
              { x: 0, y: 10, label: "A" },
              { x: 4, y: 4, label: "B" },
              { x: 8, y: 2, label: "C" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) En $A(0 ; 10)$, la tangente passe par $(1 ; 8)$ : elle descend de $2$. Donc $T'(0) = -2$.\nEn $B(4 ; 4)$, la tangente passe par $(5 ; 3)$ : elle descend de $1$. Donc $T'(4) = -1$.\n$T'(0) = -2$ se lit « moins $2$ dizaines de degrés par dizaine de minutes » : $-20$ °C en $10$ minutes, soit $-2$ °C par minute.\nDe même, $T'(4) = -1$ donne $-1$ °C par minute.\nb) La tangente en $A$ est plus raide : le thé refroidit plus vite au début, $2$ °C par minute contre $1$ °C par minute.\nc) En $C$, la tangente est horizontale : $T'(8) = 0$. Le thé est à $20$ °C, la température de la pièce : il ne refroidit plus.\nd) Entre $0$ et $8$, la courbe descend : $T'(t) < 0$ (et $T'(8) = 0$ au bout). La température baisse de moins en moins vite.\n⭐ En physique, un objet chaud refroidit d'autant plus vite qu'il est loin de la température de la pièce.",
          micros: ["der_tangente_lire", "der_comparer_vitesses", "der_tangente_horizontale", "der_tangente_signe"],
        },
        {
          titre: "Les visiteurs d'un parc naturel",
          enonce:
            "Un parc naturel ouvre à $9$ h. Le nombre de visiteurs présents, en centaines, est $f(x)$, où $x$ est le nombre d'heures depuis l'ouverture ($0 \\leqslant x \\leqslant 5$). Trois tangentes sont tracées, en $M$, en $C$ et en $N$.\na) En quels points la tangente est-elle horizontale ? À quelles heures ? Combien y a-t-il alors de visiteurs ?\nb) Donner le signe de $f'(x)$ sur $[0 ; 2]$, sur $[2 ; 4]$ et sur $[4 ; 5]$.\nc) Lire $f'(3)$ sur la tangente en $C$. Que se passe-t-il à midi ?",
          figure: repere(
            [-1, 6, -1, 11],
            [{ p: [0.5, -4.5, 12, 0] }, { q: [0, 0, 10], couleur: ORANGE }, { q: [0, -1.5, 13.5], couleur: ORANGE }, { q: [0, 0, 8], couleur: ORANGE }],
            [
              { x: 2, y: 10, label: "M" },
              { x: 3, y: 9, label: "C" },
              { x: 4, y: 8, label: "N" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) La tangente est horizontale en $M(2 ; 10)$ et en $N(4 ; 8)$.\n$M$ : $2$ h après l'ouverture, à $11$ h, il y a $1\\,000$ visiteurs. C'est un maximum local : la matinée bat son plein.\n$N$ : à $13$ h, il y a $800$ visiteurs. C'est un minimum local : la pause de midi.\nb) Sur $[0 ; 2]$, la courbe monte : $f'(x) \\geqslant 0$. Sur $[2 ; 4]$, elle descend : $f'(x) \\leqslant 0$. Sur $[4 ; 5]$, elle remonte : $f'(x) \\geqslant 0$.\nc) En $C(3 ; 9)$, on avance de $2$ : la tangente passe par $(5 ; 6)$, elle descend de $3$.\nDonc $f'(3) = \\dfrac{-3}{2} = -1{,}5$.\nÀ midi, le parc perd environ $1{,}5$ centaine de visiteurs par heure, soit $150$ visiteurs par heure.\n⚠️ Un minimum LOCAL n'est pas forcément le plus bas de la journée : à l'ouverture, il n'y avait personne.",
          micros: ["der_tangente_horizontale", "der_tangente_signe", "der_tangente_lire"],
        },
        {
          titre: "Deux marathoniennes",
          enonce:
            "Nadia et Kenza courent un marathon ($42{,}195$ km). On note $N(t)$ et $K(t)$ les distances qu'elles ont parcourues, en km, au bout de $t$ minutes. À $t = 60$ :\n• la tangente à la courbe de Nadia passe par $(60 ; 20)$ et $(80 ; 26)$ ;\n• la tangente à la courbe de Kenza passe par $(60 ; 18)$ et $(80 ; 25)$.\na) Qui est en tête à $t = 60$ ?\nb) Calculer $N'(60)$ et $K'(60)$, en km par minute, puis en km/h. Qui court le plus vite ?\nc) Si chacune gardait sa vitesse, au bout de combien de minutes Kenza rattraperait-elle Nadia ?",
          correction:
            "a) À $t = 60$, Nadia a couru $20$ km et Kenza $18$ km : Nadia est en tête, avec $2$ km d'avance.\nb) Nadia : $N'(60) = \\dfrac{26 - 20}{80 - 60} = \\dfrac{6}{20} = 0{,}3$ km par minute. En une heure : $0{,}3 \\times 60 = 18$ km/h.\nKenza : $K'(60) = \\dfrac{25 - 18}{80 - 60} = \\dfrac{7}{20} = 0{,}35$ km par minute, soit $0{,}35 \\times 60 = 21$ km/h.\nKenza court plus vite.\nc) Chaque minute, Kenza reprend $0{,}35 - 0{,}3 = 0{,}05$ km à Nadia.\nPour reprendre $2$ km : $2 \\div 0{,}05 = 40$ minutes. Elle la rattraperait vers $t = 100$ minutes.\n⚠️ Être devant ne veut pas dire aller plus vite : l'avance se lit sur les courbes, la vitesse sur les tangentes.\n⭐ Ce n'est qu'une prévision : si Kenza se fatigue, sa tangente s'aplatit.",
          schema: ecranSeulement(tableau(["t (min)", "60", "80", "100"], ["avance de Nadia (km)", 2, 1, 0])),
          micros: ["der_comparer_vitesses", "der_tangente_lire"],
        },
      ],
    },
  ],
};
