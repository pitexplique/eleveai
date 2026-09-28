// ─── Fiche d'exercices : racines et signe par la forme factorisée (1re) ───────
//                              20 exercices corrigés
//
// Quatrième des quatre feuilles du chapitre « Modélisation quadratique »
// (BOP1MQ) de la première SANS spécialité (28/09/2026). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/parabole.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : « racines et signe d'un polynôme de degré 2 donné sous
// forme FACTORISÉE (le calcul des racines à l'aide du discriminant ne figure
// pas au programme) ». Les racines viennent TOUJOURS de la forme factorisée
// (produit nul) ou de la courbe ; une forme factorisée non évidente est
// DONNÉE, et l'élève la vérifie en développant. Jamais de discriminant.
//
// ⭐ Frédéric, 28/09 : le tableau de signes DESSINÉ dans chaque corrigé qui en
// dresse un, la courbe dans l'énoncé quand on la lit. Contextes : économie
// (atelier de céramique, brasserie, start-up, ferme maraîchère, club de sport),
// physique (le lob au football), histoire-géo (le pont en arc, la crue d'une
// rivière), nature et écologie (le gel au verger, la grenouille, le potager).
// Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-quad-racines-signe.mjs`.
//
// Micro-compétences : quad_racines_factorisee (1, 2, 4, 8, 9, 10, 11, 12, 14,
// 15, 17, 18, 20), quad_signe_tableau (5, 6, 7, 9, 11, 13, 15, 16, 17, 18, 19,
// 20), quad_inequation (7, 9, 11, 13, 15, 16, 17, 18, 19, 20),
// quad_ecrire_factorisee (3, 8, 10, 14, 19), quad_verifier_developpee (4, 10,
// 12, 13, 14, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droite, intervalles, ORANGE, tableauSignes } from "@/lib/fiches-exercices/figures";
import { parabole } from "@/lib/fiches-exercices/figures-parabole";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesQuadRacinesSignePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "quad-racines-signe",
  titre: "Racines et signe par la forme factorisée",
  accroche:
    "Vingt exercices sur la forme factorisée : lire les racines, écrire la forme factorisée, la vérifier en développant, dresser le tableau de signes et résoudre une inéquation. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec le tableau dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Les racines, la forme factorisée, le signe.",
      rappel: [
        "Un produit est nul quand l'un de ses facteurs est nul : $a(x - x_1)(x - x_2) = 0$ pour $x = x_1$ ou $x = x_2$. Le nombre $a$, lui, ne s'annule jamais.",
        "Avec les racines $x_1$, $x_2$ et le coefficient $a$ : $f(x) = a(x - x_1)(x - x_2)$. Une racine $-3$ donne le facteur $(x + 3)$.",
        "Tableau de signes : une ligne par facteur, chacun change de signe en sa racine ; la dernière ligne suit la règle des signes.",
        "$f$ est du signe de $a$ À L'EXTÉRIEUR des racines, et du signe contraire ENTRE elles.",
      ],
      exercices: [
        {
          enonce: "Donner les racines de $f(x) = 3(x - 2)(x + 5)$.",
          correction:
            "Un produit est nul quand l'un de ses facteurs est nul.\n$3$ ne vaut jamais $0$ : il ne donne aucune racine.\n$x - 2 = 0$ donne $x = 2$ ; $x + 5 = 0$ donne $x = -5$.\nLes racines de $f$ sont $2$ et $-5$.\n✔️ $f(-5) = 3 \\times (-7) \\times 0 = 0$.\n⚠️ Le piège : lire « $5$ » dans $(x + 5)$. La racine est le nombre qui ANNULE la parenthèse : $-5$.\nLe tableau le montre : chaque facteur s'annule une fois ; $3$ ne s'annule jamais.",
          schema: ecranSeulement(
            tableauSignes(["−∞", "−5", "2", "+∞"], [
              ["$3$", ["+", "+", "+"], ["", ""]],
              ["$x + 5$", ["-", "+", "+"], ["0", ""]],
              ["$x - 2$", ["-", "-", "+"], ["", "0"]],
              ["$f(x)$", ["+", "-", "+"], ["0", "0"]],
            ]),
          ),
          micros: ["quad_racines_factorisee"],
        },
        {
          enonce: "Donner les racines de $g(x) = -x(2x - 6)$.",
          correction:
            "Les facteurs sont $-x$ et $2x - 6$.\n$-x = 0$ donne $x = 0$.\n$2x - 6 = 0$ donne $2x = 6$, donc $x = 3$.\nLes racines de $g$ sont $0$ et $3$.\n⚠️ Deux pièges : oublier la racine $0$, cachée dans le facteur $x$ ; et répondre $6$ au lieu de $3$ pour $2x - 6 = 0$.\nSur le dessin, la courbe de $g$ coupe l'axe des abscisses en $0$ et en $3$.",
          schema: parabole([-1, 4, -2, 6], [{ q: [-2, 6, 0] }], [{ x: 0, y: 0 }, { x: 3, y: 0 }]),
          micros: ["quad_racines_factorisee"],
        },
        {
          enonce:
            "Écrire sous forme factorisée :\na) la fonction de degré $2$ de racines $-1$ et $4$, de coefficient $a = 2$ ;\nb) la fonction de degré $2$ de racines $0$ et $3$, de coefficient $a = -1$.",
          correction:
            "On applique $f(x) = a(x - x_1)(x - x_2)$.\na) $f(x) = 2(x - (-1))(x - 4) = 2(x + 1)(x - 4)$.\nb) $g(x) = -1 \\times (x - 0)(x - 3) = -x(x - 3)$.\n✔️ On contrôle : $2(x + 1)(x - 4)$ s'annule bien en $-1$ et en $4$ ; $-x(x - 3)$ en $0$ et en $3$.\n⚠️ Le signe moins de la formule change le signe de la racine : $-1$ devient $(x + 1)$.\nSur le dessin, la parabole de $g$ : tournée vers le bas ($a = -1$), elle coupe l'axe en $0$ et en $3$.",
          schema: ecranSeulement(parabole([-1, 4, -2, 3], [{ q: [-1, 3, 0] }], [{ x: 0, y: 0 }, { x: 3, y: 0 }], { axe: 1.5 })),
          micros: ["quad_ecrire_factorisee"],
        },
        {
          enonce: "Vérifier que $x^2 - 2x - 8 = (x - 4)(x + 2)$, puis donner les racines de $x^2 - 2x - 8$.",
          correction:
            "On développe la forme factorisée : $(x - 4)(x + 2) = x^2 + 2x - 4x - 8 = x^2 - 2x - 8$ ✔️.\nLes deux écritures sont égales.\nSur la forme factorisée, on lit les racines : $4$ et $-2$.\n⭐ « Vérifier que » : on part de la forme factorisée et on DÉVELOPPE. C'est toujours le sens le plus facile.\n⚠️ $2x - 4x = -2x$ : le terme en $x$ se calcule avec les signes.\nSur le dessin, la courbe de $x^2 - 2x - 8$ coupe l'axe en $-2$ et en $4$ : les racines lues sur les facteurs.",
          schema: parabole([-3, 5, -10, 3], [{ q: [1, -2, -8] }], [{ x: -2, y: 0 }, { x: 4, y: 0 }], { grand: true }),
          micros: ["quad_verifier_developpee", "quad_racines_factorisee"],
        },
        {
          enonce: "Dresser le tableau de signes de $f(x) = (x - 1)(x - 4)$.",
          correction:
            "$x - 1$ s'annule en $1$ : négatif avant, positif après.\n$x - 4$ s'annule en $4$ : négatif avant, positif après.\nLa règle des signes donne $f(x)$ : positif avant $1$, négatif entre $1$ et $4$, positif après $4$.\n⭐ Contrôle rapide : $a = 1 > 0$, donc $f$ est du signe de $a$ à l'extérieur des racines, et négatif entre elles.\n⚠️ Entre $1$ et $4$, les deux facteurs n'ont pas le même signe : le produit est NÉGATIF.",
          schema: tableauSignes(["−∞", "1", "4", "+∞"], [
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 4$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["quad_signe_tableau"],
        },
        {
          enonce: "Dresser le tableau de signes de $f(x) = -2(x + 3)(x - 1)$.",
          correction:
            "Trois facteurs : $-2$, toujours négatif ; $x + 3$, qui s'annule en $-3$ ; $x - 1$, qui s'annule en $1$.\nOn fait une ligne pour chacun, puis la règle des signes, colonne par colonne.\n$f(x)$ est négatif avant $-3$, positif entre $-3$ et $1$, négatif après $1$.\n⚠️ Le facteur $-2$ RETOURNE tous les signes : oublié, il donne le tableau exactement contraire.\n⭐ $a = -2 < 0$ : la parabole est tournée vers le bas, au-dessus de l'axe seulement entre ses racines.",
          schema: tableauSignes(["−∞", "−3", "1", "+∞"], [
            ["$-2$", ["-", "-", "-"], ["", ""]],
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$x - 1$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["quad_signe_tableau"],
        },
        {
          enonce: "Résoudre l'inéquation $(x - 2)(x + 3) < 0$.",
          correction:
            "Racines : $2$ et $-3$. Le coefficient $a$ vaut $1 > 0$.\nLe produit est du signe de $a$ à l'extérieur des racines, du signe contraire entre elles : il est négatif entre $-3$ et $2$.\nL'inégalité est stricte : les racines, où le produit vaut $0$, sont exclues.\nL'ensemble des solutions est $]-3 ; 2[$.\n⚠️ Les crochets : « $< 0$ » exclut les racines, crochets tournés vers l'extérieur. Avec « $\\leqslant 0$ », on aurait $[-3 ; 2]$.",
          schema: ecranSeulement(droite(-5, 4, { de: -3, a: 2, deInclus: false, aInclus: false })),
          micros: ["quad_inequation", "quad_signe_tableau"],
        },
        {
          enonce:
            "La courbe ci-dessous représente une fonction $f$ de degré $2$, et l'on sait que $f(0) = -4$.\na) Lire les racines de $f$.\nb) En déduire que $f(x) = a(x + 2)(x - 4)$, puis trouver $a$ grâce à $f(0) = -4$.",
          figure: parabole([-3, 5, -5, 4], [{ q: [0.5, -1, -4] }], [{ x: -2, y: 0 }, { x: 4, y: 0 }]),
          correction:
            "a) La courbe coupe l'axe des abscisses en $-2$ et en $4$ : ce sont les racines.\nb) Racines $-2$ et $4$ : $f(x) = a(x - (-2))(x - 4) = a(x + 2)(x - 4)$.\n$f(0) = a \\times 2 \\times (-4) = -8a$. Or $f(0) = -4$ : $-8a = -4$, donc $a = 0{,}5$.\n$f(x) = 0{,}5(x + 2)(x - 4)$.\n✔️ $a = 0{,}5 > 0$ : la parabole est bien tournée vers le haut.\n⭐ Les racines donnent les facteurs ; UN autre point de la courbe donne $a$.",
          micros: ["quad_ecrire_factorisee", "quad_racines_factorisee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. Calculatrice autorisée.",
      rappel: [
        "Vérifier une forme factorisée : on la DÉVELOPPE, et on compare avec la forme développée, terme à terme.",
        "Résoudre $f(x) > 0$ : on lit dans le tableau de signes les intervalles marqués « + ». Crochets ouverts pour $>$ et $<$, fermés pour $\\geqslant$ et $\\leqslant$.",
        "Sur la courbe : $f(x) > 0$ là où elle est AU-DESSUS de l'axe des abscisses, $f(x) < 0$ là où elle est en dessous.",
      ],
      exercices: [
        {
          titre: "L'atelier de céramique",
          enonce:
            "Un atelier de céramique fabrique $x$ centaines de bols par mois ($0 \\leqslant x \\leqslant 12$). Son bénéfice, en milliers d'euros, est $B(x) = -(x - 2)(x - 10)$.\na) Donner les racines de $B$.\nb) Dresser le tableau de signes de $B(x)$ sur $[0 ; 12]$.\nc) Pour quelles productions l'atelier fait-il un bénéfice strictement positif ?",
          correction:
            "a) $x - 2 = 0$ donne $2$ ; $x - 10 = 0$ donne $10$. Les racines sont $2$ et $10$.\nb) Trois facteurs : $-1$ (toujours négatif), $x - 2$ et $x - 10$. La règle des signes donne : $B(x)$ négatif sur $[0 ; 2[$, positif sur $]2 ; 10[$, négatif sur $]10 ; 12]$.\nc) $B(x) > 0$ sur $]2 ; 10[$ : l'atelier gagne de l'argent pour une production strictement comprise entre $200$ et $1\\,000$ bols.\n⚠️ En dessous de $200$ bols, les frais fixes ne sont pas couverts ; au-delà de $1\\,000$, il faut embaucher et le bénéfice redevient négatif.",
          schema: tableauSignes(["0", "2", "10", "12"], [
            ["$-1$", ["-", "-", "-"], ["", ""]],
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 10$", ["-", "-", "+"], ["", "0"]],
            ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["quad_racines_factorisee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "Le saut de la grenouille",
          enonce:
            "Une grenouille saute d'une pierre posée au niveau de l'eau, et retombe $10$ dm plus loin. Sa trajectoire est une parabole de coefficient $a = -0{,}1$ ; $x$ et $h(x)$ sont en décimètres, et le saut part de $x = 0$.\na) Quelles sont les racines de $h$ ? Écrire $h(x)$ sous forme factorisée.\nb) Vérifier que $h(x) = -0{,}1x^2 + x$.\nc) Quelle hauteur la grenouille atteint-elle au milieu de son saut ?",
          figure: parabole([-1, 11, -1, 4], [{ q: [-0.1, 1, 0] }], [], { grand: true }),
          correction:
            "a) Au départ et à l'arrivée, la hauteur est nulle : les racines sont $0$ et $10$.\n$h(x) = -0{,}1(x - 0)(x - 10) = -0{,}1x(x - 10)$.\nb) On développe : $-0{,}1x(x - 10) = -0{,}1x^2 + 0{,}1 \\times 10x = -0{,}1x^2 + x$ ✔️.\nc) Le milieu du saut est en $x = 5$ : $h(5) = -0{,}1 \\times 5 \\times (-5) = 2{,}5$ dm, soit $25$ cm.\n⚠️ Le facteur $x$ vient de la racine $0$ : $(x - 0) = x$. On ne l'oublie pas.",
          micros: ["quad_ecrire_factorisee", "quad_verifier_developpee", "quad_racines_factorisee"],
        },
        {
          titre: "Le gel au verger",
          enonce:
            "Une nuit de printemps, dans un verger, la température (en °C) $t$ heures après minuit est modélisée par $T(t) = 0{,}5(t - 2)(t - 8)$, pour $t$ entre $0$ et $10$.\na) À quelles heures la température est-elle de $0$ °C ?\nb) Dresser le tableau de signes de $T(t)$ sur $[0 ; 10]$.\nc) Pendant quelles heures gèle-t-il ($T(t) < 0$) ? Le vérifier sur la courbe.\nd) Quelle est la température la plus basse, et à quelle heure ?",
          figure: parabole([-1, 11, -5, 9], [{ q: [0.5, -5, 8] }], [{ x: 2, y: 0 }, { x: 8, y: 0 }], { grand: true }),
          correction:
            "a) $T(t) = 0$ pour $t = 2$ ou $t = 8$ : à $2$ h et à $8$ h du matin.\nb) $0{,}5 > 0$ ; $t - 2$ change de signe en $2$, $t - 8$ en $8$. $T(t)$ est positif sur $[0 ; 2[$, négatif sur $]2 ; 8[$, positif sur $]8 ; 10]$.\nc) Il gèle pour $t \\in \\, ]2 ; 8[$ : de $2$ h à $8$ h, soit $6$ heures. Sur la courbe, c'est la partie SOUS l'axe.\nd) Le plus froid est au milieu des racines, à $5$ h : $T(5) = 0{,}5 \\times 3 \\times (-3) = -4{,}5$ °C.\n⭐ Pour protéger les fleurs des arbres, l'arboriculteur sait maintenant QUAND agir : entre $2$ h et $8$ h.",
          schema: ecranSeulement(
            tableauSignes(
              ["0", "2", "8", "10"],
              [
                ["$0{,}5$", ["+", "+", "+"], ["", ""]],
                ["$t - 2$", ["-", "+", "+"], ["0", ""]],
                ["$t - 8$", ["-", "-", "+"], ["", "0"]],
                ["$T(t)$", ["+", "-", "+"], ["0", "0"]],
              ],
              "t",
            ),
          ),
          micros: ["quad_racines_factorisee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "La brasserie artisanale",
          enonce:
            "Le bénéfice d'une brasserie artisanale, en milliers d'euros, pour $x$ milliers de litres de bière, est $B(x) = -x^2 + 9x - 14$. Un élève affirme que $B(x) = -(x - 2)(x - 7)$.\na) Vérifier son affirmation.\nb) En déduire les productions pour lesquelles le bénéfice est nul.\nc) Un autre élève propose $B(x) = (2 - x)(x - 7)$. A-t-il raison ?",
          correction:
            "a) $(x - 2)(x - 7) = x^2 - 7x - 2x + 14 = x^2 - 9x + 14$, donc $-(x - 2)(x - 7) = -x^2 + 9x - 14$ ✔️.\nb) $B(x) = 0$ pour $x = 2$ ou $x = 7$ : pour $2\\,000$ et $7\\,000$ litres, la brasserie ne gagne ni ne perd rien.\nc) Oui : $2 - x = -(x - 2)$, donc $(2 - x)(x - 7) = -(x - 2)(x - 7)$. C'est la même expression, écrite autrement.\n✔️ En développant : $(2 - x)(x - 7) = 2x - 14 - x^2 + 7x = -x^2 + 9x - 14$.\n⚠️ Une fonction peut avoir plusieurs écritures factorisées justes : on les compare en DÉVELOPPANT.",
          schema: ecranSeulement(parabole([-1, 8, -3, 7], [{ q: [-1, 9, -14] }], [{ x: 2, y: 0 }, { x: 7, y: 0 }])),
          micros: ["quad_verifier_developpee", "quad_racines_factorisee"],
        },
        {
          titre: "Le potager",
          enonce:
            "Un jardinier entoure un potager rectangulaire de $24$ m de bordure en bois. Un côté mesure $x$ m ($0 \\leqslant x \\leqslant 12$), l'autre $12 - x$ m, et l'aire est $A(x) = x(12 - x)$. Il veut une aire d'au moins $20$ m².\na) Montrer que $A(x) - 20 = -(x - 2)(x - 10)$.\nb) Dresser le tableau de signes de $A(x) - 20$ sur $[0 ; 12]$.\nc) Résoudre $A(x) \\geqslant 20$ et conclure.",
          correction:
            "a) $A(x) - 20 = 12x - x^2 - 20 = -x^2 + 12x - 20$. Et $-(x - 2)(x - 10) = -(x^2 - 12x + 20) = -x^2 + 12x - 20$ ✔️.\nb) Les facteurs $-1$, $x - 2$ et $x - 10$ donnent : négatif sur $[0 ; 2[$, positif sur $]2 ; 10[$, négatif sur $]10 ; 12]$, et nul en $2$ et en $10$.\nc) $A(x) \\geqslant 20$ équivaut à $A(x) - 20 \\geqslant 0$, soit $x \\in [2 ; 10]$ : les racines sont INCLUSES, car l'inégalité est large.\nLe côté doit mesurer entre $2$ m et $10$ m.\n⭐ Pour comparer $A(x)$ à $20$, on étudie le signe de la DIFFÉRENCE $A(x) - 20$.",
          schema: ecranSeulement(
            tableauSignes(["0", "2", "10", "12"], [
              ["$-1$", ["-", "-", "-"], ["", ""]],
              ["$x - 2$", ["-", "+", "+"], ["0", ""]],
              ["$x - 10$", ["-", "-", "+"], ["", "0"]],
              ["$A(x) - 20$", ["-", "+", "-"], ["0", "0"]],
            ]),
          ),
          micros: ["quad_verifier_developpee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "Le pont en arc",
          enonce:
            "Pour franchir une rivière, un village a construit un pont en arc. On a représenté l'arche ci-dessous ($x$ et $h(x)$ en mètres), et sa hauteur au milieu est de $4{,}5$ m.\na) Lire les racines de $h$.\nb) Écrire $h(x) = a(x + 3)(x - 3)$ et trouver $a$ grâce à la hauteur au milieu.\nc) Développer $h(x)$.",
          figure: parabole([-4, 4, -1, 6], [{ q: [-0.5, 0, 4.5] }]),
          correction:
            "a) L'arche touche l'eau en $-3$ et en $3$ : ce sont les racines. L'arche mesure $6$ m de large.\nb) Au milieu, $x = 0$ : $h(0) = a \\times 3 \\times (-3) = -9a$. Or $h(0) = 4{,}5$ : $-9a = 4{,}5$, donc $a = -0{,}5$.\n$h(x) = -0{,}5(x + 3)(x - 3)$.\nc) $(x + 3)(x - 3) = x^2 - 9$, donc $h(x) = -0{,}5x^2 + 4{,}5$.\n✔️ $a = -0{,}5 < 0$ : l'arche est tournée vers le bas, comme sur le dessin.\n⚠️ $-9a = 4{,}5$ donne $a = \\dfrac{4{,}5}{-9} = -0{,}5$ : le signe moins ne se perd pas.",
          micros: ["quad_ecrire_factorisee", "quad_racines_factorisee", "quad_verifier_developpee"],
        },
        {
          titre: "La trésorerie d'une jeune entreprise",
          enonce:
            "La trésorerie d'une jeune entreprise, en milliers d'euros, $t$ mois après sa création, est modélisée par $S(t) = 0{,}5(t - 1)(t - 7)$, pour $t$ entre $0$ et $9$.\na) Lire sur la courbe les mois où la trésorerie est nulle, puis le retrouver par le calcul.\nb) Dresser le tableau de signes de $S(t)$ sur $[0 ; 9]$.\nc) Pendant combien de mois la trésorerie est-elle négative ?",
          figure: parabole([-1, 9, -5, 9], [{ q: [0.5, -4, 3.5] }], [], { grand: true }),
          correction:
            "a) La courbe coupe l'axe en $1$ et en $7$. Par le calcul : $S(t) = 0$ pour $t - 1 = 0$ ou $t - 7 = 0$, soit $t = 1$ ou $t = 7$.\nb) $0{,}5 > 0$ : $S(t)$ est positif sur $[0 ; 1[$, négatif sur $]1 ; 7[$, positif sur $]7 ; 9]$.\nc) La trésorerie est négative pendant $7 - 1 = 6$ mois : l'entreprise doit emprunter pour tenir jusqu'au septième mois.\n⭐ La courbe et le tableau disent la même chose : SOUS l'axe, c'est le « − » du tableau.",
          schema: ecranSeulement(
            tableauSignes(
              ["0", "1", "7", "9"],
              [
                ["$0{,}5$", ["+", "+", "+"], ["", ""]],
                ["$t - 1$", ["-", "+", "+"], ["0", ""]],
                ["$t - 7$", ["-", "-", "+"], ["", "0"]],
                ["$S(t)$", ["+", "-", "+"], ["0", "0"]],
              ],
              "t",
            ),
          ),
          micros: ["quad_signe_tableau", "quad_racines_factorisee", "quad_inequation"],
        },
        {
          enonce: "Résoudre l'inéquation $(x + 4)(x - 1) \\geqslant 0$.",
          correction:
            "Racines : $-4$ et $1$. Le coefficient $a$ vaut $1 > 0$.\nLe produit est du signe de $a$, donc positif, à l'EXTÉRIEUR des racines, et négatif entre elles.\nL'inégalité est large : les racines, où le produit vaut $0$, sont solutions.\nL'ensemble des solutions est $]-\\infty ; -4] \\cup [1 ; +\\infty[$.\n⚠️ La réponse est en DEUX morceaux, réunis par $\\cup$. Répondre $[-4 ; 1]$, c'est donner l'endroit où le produit est NÉGATIF.\n⚠️ Du côté de l'infini, le crochet est toujours ouvert.",
          schema: ecranSeulement(intervalles(-6, 3, [{ a: -4, aInclus: true, label: "solutions" }, { de: 1, deInclus: true, label: "solutions" }])),
          micros: ["quad_inequation", "quad_signe_tableau"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. On répond par une phrase, avec l'unité.",
      rappel: [
        "Pour comparer $f(x)$ à un nombre $k$, on étudie le signe de $f(x) - k$, sur une forme factorisée donnée qu'on vérifie en développant.",
        "On répond à la question posée : un intervalle devient une durée, une quantité, une distance.",
      ],
      exercices: [
        {
          titre: "Le lob au football",
          enonce:
            "Un joueur tente un lob. La hauteur du ballon, en mètres, est $h(x) = -0{,}05x(x - 20)$, où $x$ est la distance horizontale parcourue depuis la frappe, en mètres.\na) Où le ballon retombe-t-il ?\nb) Vérifier que $h(x) = -0{,}05x^2 + x$.\nc) Vérifier que $h(x) - 1{,}8 = -0{,}05(x - 2)(x - 18)$.\nd) Dresser le tableau de signes de $h(x) - 1{,}8$ sur $[0 ; 20]$. Sur quelle distance le ballon est-il à plus de $1{,}8$ m du sol ?\ne) Un défenseur placé à $3$ m du tireur touche le ballon jusqu'à $1{,}8$ m de haut. Peut-il l'intercepter ?",
          correction:
            "a) $h(x) = 0$ pour $x = 0$ (la frappe) ou $x = 20$ : le ballon retombe à $20$ m.\nb) $-0{,}05x(x - 20) = -0{,}05x^2 + 0{,}05 \\times 20x = -0{,}05x^2 + x$ ✔️.\nc) $-0{,}05(x - 2)(x - 18) = -0{,}05(x^2 - 20x + 36) = -0{,}05x^2 + x - 1{,}8$, et c'est bien $h(x) - 1{,}8$ ✔️.\nd) Le coefficient $-0{,}05$ est négatif : $h(x) - 1{,}8$ est positif ENTRE les racines $2$ et $18$.\nLe ballon est à plus de $1{,}8$ m pour $x \\in \\, ]2 ; 18[$ : sur $16$ m.\ne) $3$ est dans $]2 ; 18[$ : là, le ballon passe au-dessus de $1{,}8$ m. Le défenseur ne peut pas l'intercepter.\n✔️ $h(3) = -0{,}05 \\times 3 \\times (-17) = 2{,}55$ m.",
          schema: tableauSignes(["0", "2", "18", "20"], [
            ["$-0{,}05$", ["-", "-", "-"], ["", ""]],
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 18$", ["-", "-", "+"], ["", "0"]],
            ["$h(x) - 1{,}8$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["quad_racines_factorisee", "quad_verifier_developpee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "Les paniers de la ferme bio",
          enonce:
            "Une ferme maraîchère bio vend $x$ centaines de paniers de légumes par an ($0 \\leqslant x \\leqslant 12$). Son bénéfice, en milliers d'euros, est $B(x) = -0{,}5x^2 + 7x - 20$.\na) Vérifier que $B(x) = -0{,}5(x - 4)(x - 10)$.\nb) Donner les racines de $B$, et les repérer sur la courbe.\nc) Dresser le tableau de signes de $B(x)$ sur $[0 ; 12]$, puis résoudre $B(x) > 0$.\nd) Calculer $B(7)$ et interpréter.",
          figure: parabole([-1, 12, -4, 6], [{ q: [-0.5, 7, -20] }], [{ x: 4, y: 0 }, { x: 10, y: 0 }], { grand: true }),
          correction:
            "a) $(x - 4)(x - 10) = x^2 - 10x - 4x + 40 = x^2 - 14x + 40$, et $-0{,}5(x^2 - 14x + 40) = -0{,}5x^2 + 7x - 20$ ✔️.\nb) Les racines sont $4$ et $10$ : les deux points où la courbe coupe l'axe.\nc) Le coefficient $-0{,}5$ est négatif : $B(x)$ est négatif sur $[0 ; 4[$, positif sur $]4 ; 10[$, négatif sur $]10 ; 12]$.\n$B(x) > 0$ pour $x \\in \\, ]4 ; 10[$ : la ferme est bénéficiaire entre $400$ et $1\\,000$ paniers.\nd) $B(7) = -0{,}5 \\times 3 \\times (-3) = 4{,}5$ : pour $700$ paniers, le bénéfice est de $4\\,500$ €. C'est le sommet, au milieu des racines.\n⚠️ Le tableau de signes se fait sur la forme FACTORISÉE : sur $-0{,}5x^2 + 7x - 20$, on ne lit rien.",
          schema: ecranSeulement(
            tableauSignes(["0", "4", "10", "12"], [
              ["$-0{,}5$", ["-", "-", "-"], ["", ""]],
              ["$x - 4$", ["-", "+", "+"], ["0", ""]],
              ["$x - 10$", ["-", "-", "+"], ["", "0"]],
              ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
            ]),
          ),
          micros: ["quad_verifier_developpee", "quad_racines_factorisee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "La crue",
          enonce:
            "Pendant une crue, on mesure chaque jour l'écart $d(t)$ entre le niveau d'une rivière et sa cote d'alerte, en mètres ($d(t) > 0$ : la rivière est au-dessus de la cote). Elle franchit la cote d'alerte aux jours $2$ et $8$, et au jour $0$, elle est $1{,}6$ m en dessous.\na) On modélise $d$ par une fonction de degré $2$. Justifier que $d(t) = a(t - 2)(t - 8)$, puis trouver $a$.\nb) Vérifier que $d(t) = -0{,}1t^2 + t - 1{,}6$.\nc) Dresser le tableau de signes de $d(t)$ sur $[0 ; 10]$. Pendant combien de jours la rivière est-elle au-dessus de la cote d'alerte ?\nd) De combien la dépasse-t-elle au plus fort de la crue ?",
          correction:
            "a) $d$ s'annule en $2$ et en $8$ : ce sont ses racines, donc $d(t) = a(t - 2)(t - 8)$.\n$d(0) = a \\times (-2) \\times (-8) = 16a$. Or $d(0) = -1{,}6$ : $16a = -1{,}6$, donc $a = -0{,}1$.\nb) $-0{,}1(t - 2)(t - 8) = -0{,}1(t^2 - 10t + 16) = -0{,}1t^2 + t - 1{,}6$ ✔️.\nc) $a = -0{,}1 < 0$ : $d(t)$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 8[$, négatif sur $]8 ; 10]$.\nLa rivière est au-dessus de la cote d'alerte entre le jour $2$ et le jour $8$ : pendant $6$ jours.\nd) Le plus fort de la crue est au milieu des racines, au jour $5$ : $d(5) = -0{,}1 \\times 3 \\times (-3) = 0{,}9$ m au-dessus de la cote.\n⭐ Connaître ces dates, c'est ce qui permet à une commune d'organiser l'évacuation, puis le retour.",
          schema: tableauSignes(
            ["0", "2", "8", "10"],
            [
              ["$-0{,}1$", ["-", "-", "-"], ["", ""]],
              ["$t - 2$", ["-", "+", "+"], ["0", ""]],
              ["$t - 8$", ["-", "-", "+"], ["", "0"]],
              ["$d(t)$", ["-", "+", "-"], ["0", "0"]],
            ],
            "t",
          ),
          micros: ["quad_ecrire_factorisee", "quad_verifier_developpee", "quad_signe_tableau", "quad_inequation"],
        },
        {
          titre: "Le club de sport",
          enonce:
            "Un club de sport compte $x$ centaines d'abonnés ($0 \\leqslant x \\leqslant 12$). Sa recette annuelle est $R(x) = -x^2 + 14x$ et ses coûts sont $C(x) = 3x + 18$, en milliers d'euros. Le dessin montre $R$ (en bleu) et $C$ (en orange), en dizaines de milliers d'euros.\na) Montrer que le bénéfice $B(x) = R(x) - C(x)$ vaut $-x^2 + 11x - 18$, puis que $B(x) = -(x - 2)(x - 9)$.\nb) Pour quels nombres d'abonnés le bénéfice est-il nul ? Où le voit-on sur le dessin ?\nc) Dresser le tableau de signes de $B(x)$, et dire pour quels effectifs le club est bénéficiaire.",
          figure: parabole([-1, 12, -1, 6], [{ q: [-0.1, 1.4, 0] }, { q: [0, 0.3, 1.8], couleur: ORANGE }], [{ x: 2, y: 2.4 }, { x: 9, y: 4.5 }], { grand: true }),
          correction:
            "a) $B(x) = -x^2 + 14x - 3x - 18 = -x^2 + 11x - 18$.\nEt $-(x - 2)(x - 9) = -(x^2 - 11x + 18) = -x^2 + 11x - 18$ ✔️.\nb) $B(x) = 0$ pour $x = 2$ ou $x = 9$ : pour $200$ et $900$ abonnés, la recette couvre juste les coûts.\nSur le dessin, ce sont les deux points où la courbe bleue croise la droite orange.\nc) $-(x - 2)(x - 9)$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 9[$, négatif sur $]9 ; 12]$.\nLe club est bénéficiaire entre $200$ et $900$ abonnés, là où la courbe de la recette passe AU-DESSUS de la droite des coûts.\n⚠️ $R(x) - C(x)$ : on soustrait TOUT le coût, $-(3x + 18) = -3x - 18$.",
          schema: ecranSeulement(
            tableauSignes(["0", "2", "9", "12"], [
              ["$-1$", ["-", "-", "-"], ["", ""]],
              ["$x - 2$", ["-", "+", "+"], ["0", ""]],
              ["$x - 9$", ["-", "-", "+"], ["", "0"]],
              ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
            ]),
          ),
          micros: ["quad_verifier_developpee", "quad_racines_factorisee", "quad_signe_tableau", "quad_inequation"],
        },
      ],
    },
  ],
};
