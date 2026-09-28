// ─── Fiche d'exercices : lecture graphique (1re, automatismes) ────────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur le modèle de l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : toutes les lectures tombent sur la grille, tous les
// calculs se font de tête. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/lecture-graphique.bank.ts` :
// « l'antécédent de 3 lu sur une courbe » (Métropole, juin 2026).
//
// ⭐⭐ LE FIL : DEUX SENS DE LECTURE. L'image part de l'axe HORIZONTAL et elle est
// unique ; l'antécédent part de l'axe VERTICAL, et il peut y en avoir deux, un
// ou aucun (2, 7, 12, 17, 18, 19). Et avant tout nombre, l'UNITÉ : une
// graduation vaut 2 h, 5 °C, 100 m ou 100 € (5, 9, 12, 14, 19).
//
// ⭐ Frédéric, 28/09 : la courbe à LIRE est dans l'énoncé, et le corrigé MARQUE
// la lecture (le point, l'horizontale y = k, les antécédents). Liens à
// l'ÉCONOMIE et à l'HISTOIRE-GÉO : bénéfice, coût, prix de vente, loyer, prix
// d'un téléphone, location ; profil de randonnée, climat, barrage, trébuchet,
// exode rural, débit d'un fleuve. Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-lecture-graphique.mjs`.
//
// Micro-compétences : auto_fct_image_antecedent (1, 2, 7, 9, 10, 12, 14, 15,
// 17, 18, 19, 20), auto_fct_reperer_graphique (5, 9, 12, 14, 17, 18, 19, 20),
// auto_fct_appartenance_courbe (3, 4, 8, 11, 13, 15, 17, 18, 20),
// auto_fct_estimer_seuil (6, 10, 13, 16, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les courbes qu'on LIT restent imprimées. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoLectureGraphiquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-lecture-graphique",
  titre: "Lecture graphique",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : lire une image, un antécédent, un seuil sur une courbe, repérer les unités, vérifier qu'un point est sur une courbe. Un rappel de cours de trois lignes avant chaque niveau, et une correction qui marque la lecture sur le dessin.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture ou un calcul par question. Sans calculatrice.",
      rappel: [
        "L'image de $a$ : on part de $a$ sur l'axe HORIZONTAL, on va jusqu'à la courbe, on lit l'ordonnée. C'est $f(a)$.",
        "Un antécédent de $b$ : on part de $b$ sur l'axe VERTICAL, on va jusqu'à la courbe, on lit l'abscisse. Il peut y en avoir plusieurs, ou aucun.",
        "Le point $M(x ; y)$ est sur la courbe d'équation $y = f(x)$ quand $f(x) = y$.",
        "Avant de lire : que mesure chaque axe, et dans quelle unité ?",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$. Lire $f(0)$, $f(1)$ et $f(3)$.",
          figure: repere([-2, 4, -6, 6], [{ q: [-1, 2, 3] }], [], undefined, true),
          correction:
            "On part de l'abscisse, on va jusqu'à la courbe, on lit l'ordonnée.\n$f(0) = 3$ : la courbe coupe l'axe vertical en $3$.\n$f(1) = 4$ : c'est le sommet de la courbe.\n$f(3) = 0$ : la courbe coupe l'axe horizontal en $3$.\n⚠️ $f(3) = 0$ ne veut pas dire « pas d'image » : l'image de $3$ existe, elle vaut $0$.",
          schema: repere([-2, 4, -6, 6], [{ q: [-1, 2, 3] }], [
            { x: 0, y: 3, label: "f(0)" },
            { x: 1, y: 4, label: "f(1)" },
            { x: 3, y: 0, label: "f(3)" },
          ], undefined, true),
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. Lire les antécédents de $-3$, de $5$, de $-4$ et de $-6$.",
          figure: repere([-3, 5, -5, 7], [{ q: [1, -2, -3] }], [], undefined, true),
          correction:
            "On part de l'ordonnée, on suit l'horizontale, on lit les abscisses des points de la courbe.\nAntécédents de $-3$ : $0$ et $2$.\nAntécédents de $5$ : $-2$ et $4$.\nAntécédent de $-4$ : $1$ seulement, le point le plus bas.\n$-6$ n'a aucun antécédent : la courbe ne descend jamais sous $-4$.\n⚠️ Un nombre peut avoir deux antécédents, un seul, ou aucun. Une image, elle, est toujours unique.",
          schema: repere([-3, 5, -5, 7], [{ q: [1, -2, -3] }], [
            { x: 0, y: -3, label: "0" },
            { x: 2, y: -3, label: "2" },
            { x: -2, y: 5, label: "−2" },
            { x: 4, y: 5, label: "4" },
          ], [-3, 5], true),
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce: "Le point $A(2 ; 7)$ est-il sur la courbe d'équation $y = x^2 + 3$ ? Et le point $B(-1 ; 2)$ ?",
          correction:
            "On remplace $x$ par l'abscisse du point, et on compare le résultat à son ordonnée.\nPour $A$ : $2^2 + 3 = 4 + 3 = 7$. On trouve l'ordonnée de $A$ : $A$ est sur la courbe.\nPour $B$ : $(-1)^2 + 3 = 1 + 3 = 4$, et non $2$ : $B$ n'est pas sur la courbe.\n⚠️ $(-1)^2 = 1$ et non $-1$ : le carré d'un nombre négatif est positif.",
          schema: ecranSeulement(repere([-3, 3, -1, 13], [{ q: [1, 0, 3] }], [{ x: 2, y: 7, label: "A" }], undefined, true)),
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce: "On considère la courbe d'équation $y = 2x^2 - 1$.\na) Calculer l'ordonnée de son point d'abscisse $-2$.\nb) Trouver ses points d'ordonnée $1$.",
          correction:
            "a) $2 \\times (-2)^2 - 1 = 2 \\times 4 - 1 = 7$ : le point est $(-2 ; 7)$.\nb) On cherche $x$ tel que $2x^2 - 1 = 1$, soit $2x^2 = 2$, donc $x^2 = 1$.\nDeux solutions : $x = 1$ ou $x = -1$. Les points sont $(1 ; 1)$ et $(-1 ; 1)$.\n⚠️ $(-2)^2 = 4$ : le signe moins est DANS la parenthèse, il disparaît au carré.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "La courbe donne la température d'une journée d'été. Sur l'axe horizontal, une unité vaut $2$ heures, en partant de $6$ h du matin ($x = 0$). Sur l'axe vertical, une unité vaut $5$ °C.\na) Quelles grandeurs sont en jeu ? Avec quelles unités ?\nb) Quelle température fait-il à $14$ h ?\nc) À quelles heures fait-il $15$ °C ?",
          figure: repere([-1, 7, -1, 6], [{ pts: [[0, 1], [1, 1], [2, 2], [3, 3], [4, 4], [5, 3], [6, 2]] }]),
          correction:
            "a) En abscisse, l'heure (une unité $= 2$ h) ; en ordonnée, la température (une unité $= 5$ °C).\nb) $14$ h, c'est $8$ heures après $6$ h, soit $\\dfrac{8}{2} = 4$ unités. On lit $4$ unités en ordonnée : $4 \\times 5 = 20$ °C.\nc) $15$ °C, c'est $\\dfrac{15}{5} = 3$ unités. La courbe est à $3$ en $x = 3$ et en $x = 5$, soit à $12$ h et à $16$ h.\n⚠️ Lire « $4$ » et répondre « $4$ °C », c'est oublier l'échelle.",
          schema: repere([-1, 7, -1, 6], [{ pts: [[0, 1], [1, 1], [2, 2], [3, 3], [4, 4], [5, 3], [6, 2]] }], [
            { x: 3, y: 3, label: "12 h" },
            { x: 4, y: 4, label: "14 h" },
            { x: 5, y: 3, label: "16 h" },
          ], 3),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent"],
        },
        {
          enonce:
            "Le nombre d'abonnés d'une chaîne vidéo, en milliers, est $A(x) = \\dfrac{x^2}{4} + 1$, où $x$ est le nombre de mois depuis sa création. À partir de quel mois atteint-elle $5\\,000$ abonnés ? On calculera $A(2)$, $A(3)$, $A(4)$ et $A(5)$.",
          correction:
            "$A(2) = \\dfrac{4}{4} + 1 = 2$ ; $A(3) = \\dfrac{9}{4} + 1 = 3{,}25$ ; $A(4) = \\dfrac{16}{4} + 1 = 5$ ; $A(5) = \\dfrac{25}{4} + 1 = 7{,}25$.\nLe nombre d'abonnés augmente : le seuil de $5$ milliers est atteint au mois $4$, puis dépassé.\n⚠️ $5\\,000$ abonnés, c'est $A(x) = 5$ : on travaille dans l'unité de la fonction, les milliers.",
          schema: ecranSeulement(tableau(["mois", "2", "3", "4", "5"], ["abonnés (milliers)", 2, "3,25", 5, "7,25"])),
          micros: ["auto_fct_estimer_seuil"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 2$.\na) Calculer $f(2)$.\nb) Trouver les antécédents de $2$ par $f$.",
          correction:
            "a) $f(2) = 2^2 - 2 = 2$.\nb) On cherche $x$ tel que $x^2 - 2 = 2$, soit $x^2 = 4$ : $x = 2$ ou $x = -2$.\n⚠️ Ici, l'image de $2$ vaut $2$, mais $2$ a DEUX antécédents : $2$ et $-2$. Image et antécédent ne se lisent pas dans le même sens.\n⭐ Sur le dessin, l'horizontale d'ordonnée $2$ coupe la courbe deux fois.",
          schema: repere([-3, 3, -3, 8], [{ q: [1, 0, -2] }], [
            { x: -2, y: 2, label: "−2" },
            { x: 2, y: 2, label: "2" },
          ], 2, true),
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce: "La courbe d'équation $y = x^2 - 4x$ passe-t-elle par l'origine du repère ? En quels points coupe-t-elle l'axe des abscisses ?",
          correction:
            "Pour $x = 0$ : $0^2 - 4 \\times 0 = 0$. Le point $O(0 ; 0)$ est sur la courbe.\nSur l'axe des abscisses, $y = 0$ : $x^2 - 4x = 0$, soit $x(x - 4) = 0$.\nDonc $x = 0$ ou $x = 4$ : ce sont les points $(0 ; 0)$ et $(4 ; 0)$.\n⭐ Un produit est nul quand l'un de ses facteurs est nul.",
          schema: ecranSeulement(repere([-1, 5, -5, 6], [{ q: [1, -4, 0] }], [
            { x: 0, y: 0, label: "O" },
            { x: 4, y: 0, label: "4" },
          ], undefined, true)),
          micros: ["auto_fct_appartenance_courbe"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire les axes, lire la courbe, conclure avec l'unité. Sans calculatrice.",
      rappel: [
        "On lit d'abord les axes : quelle grandeur, quelle unité, que vaut UNE graduation.",
        "Une lecture graphique est une valeur APPROCHÉE ; avec l'équation, le calcul donne la valeur exacte.",
        "Un seuil : on trace l'horizontale à la hauteur du seuil, et on regarde où la courbe la franchit.",
      ],
      exercices: [
        {
          titre: "Le profil d'une randonnée",
          enonce:
            "La courbe donne l'altitude d'un sentier, en centaines de mètres, en fonction de la distance parcourue, en km.\na) Quelle est l'altitude au départ ? au point le plus haut ?\nb) À quelles distances est-on à $1\\,000$ m d'altitude ?\nc) Quel dénivelé faut-il monter du départ au sommet ?",
          figure: repere([-1, 11, -1, 14], [{ pts: [[0, 4], [2, 8], [4, 12], [6, 10], [8, 6], [10, 4]] }], [], undefined, true),
          correction:
            "a) Au départ ($x = 0$), on lit $4$ centaines de mètres : $400$ m. Le point le plus haut est au km $4$ : $12$ centaines, soit $1\\,200$ m.\nb) $1\\,000$ m, c'est $10$ centaines. La courbe passe à $10$ au km $3$ (en montant) et au km $6$ (en descendant).\nc) $1\\,200 - 400 = 800$ m de montée.\n⚠️ Une graduation verticale vaut $100$ m, pas $1$ m : on lit l'unité avant le nombre.\n⭐ C'est le profil dessiné sur les topoguides de randonnée.",
          schema: repere([-1, 11, -1, 14], [{ pts: [[0, 4], [2, 8], [4, 12], [6, 10], [8, 6], [10, 4]] }], [
            { x: 3, y: 10, label: "km 3" },
            { x: 6, y: 10, label: "km 6" },
            { x: 4, y: 12, label: "sommet" },
          ], 10, true),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent"],
        },
        {
          titre: "Le bénéfice d'un artisan",
          enonce:
            "Un artisan fabrique et vend $x$ centaines d'objets. Son bénéfice, en milliers d'euros, est donné par la courbe.\na) Quel bénéfice fait-il pour $200$ objets ?\nb) À partir de combien d'objets commence-t-il à gagner de l'argent ?\nc) Quel est le plus grand bénéfice possible, et pour combien d'objets ?",
          figure: repere([-1, 7, -6, 6], [{ q: [-1, 6, -5] }], [], undefined, true),
          correction:
            "a) $200$ objets, c'est $x = 2$ : on lit $3$, soit $3\\,000$ €.\nb) La courbe traverse l'axe horizontal en $x = 1$ : au-delà de $100$ objets, le bénéfice devient positif.\nc) Le sommet est le point $(3 ; 4)$ : $4\\,000$ € pour $300$ objets.\n⚠️ Sous $100$ objets, la courbe est sous l'axe : c'est une PERTE, les frais fixes ne sont pas couverts.\n⭐ Au-delà de $500$ objets, elle repasse sous l'axe : produire trop fait aussi perdre de l'argent.",
          schema: repere([-1, 7, -6, 6], [{ q: [-1, 6, -5] }], [
            { x: 1, y: 0, label: "seuil" },
            { x: 2, y: 3, label: "" },
            { x: 3, y: 4, label: "max" },
          ], undefined, true),
          micros: ["auto_fct_estimer_seuil", "auto_fct_image_antecedent"],
        },
        {
          titre: "Le coût de fabrication",
          enonce:
            "Le coût de fabrication de $x$ centaines de pièces, en milliers d'euros, est $C(x) = x^2 + 2$. Sa courbe est tracée ci-dessous.\na) Le point $A(2 ; 6)$ est-il sur la courbe ? Que signifie-t-il ?\nb) Le point $B(3 ; 10)$ est-il sur la courbe ? Le dessin suffit-il pour répondre ?",
          figure: repere([-1, 4, -1, 13], [{ q: [1, 0, 2] }], [], undefined, true),
          correction:
            "a) $C(2) = 2^2 + 2 = 6$ : $A$ est sur la courbe. Fabriquer $200$ pièces coûte $6\\,000$ €.\nb) $C(3) = 3^2 + 2 = 11$, et non $10$ : $B$ n'est pas sur la courbe.\nSur le dessin, $B$ serait juste sous la courbe : l'œil hésite, le calcul tranche.\n⚠️ Un point « presque sur » la courbe n'est pas sur la courbe.",
          schema: ecranSeulement(repere([-1, 4, -1, 13], [{ q: [1, 0, 2] }], [
            { x: 2, y: 6, label: "A" },
            { x: 3, y: 11, label: "C(3)" },
          ], undefined, true)),
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          titre: "Le climat d'une ville",
          enonce:
            "La courbe donne la température moyenne de chaque mois dans une ville de France (chiffres d'un modèle). En abscisse, le mois ($1$ pour janvier) ; en ordonnée, une unité vaut $2$ °C.\na) Quelle est la température moyenne en avril ?\nb) Quels mois ont une moyenne de $14$ °C ?\nc) Quel est le mois le plus chaud ? À quelle température ?",
          figure: repere([-1, 13, -1, 14], [{ pts: [[1, 2], [2, 3], [3, 5], [4, 7], [5, 9], [6, 11], [7, 12], [8, 11], [9, 9], [10, 7], [11, 4], [12, 2]] }], [], undefined, true),
          correction:
            "a) Avril, c'est $x = 4$ : on lit $7$ unités, soit $7 \\times 2 = 14$ °C.\nb) $14$ °C, ce sont $7$ unités : la courbe est à $7$ en $x = 4$ et en $x = 10$, en avril et en octobre.\nc) Le point le plus haut est en $x = 7$ : juillet, $12 \\times 2 = 24$ °C.\n⚠️ L'axe vertical compte des unités de $2$ °C : répondre « $7$ °C » serait deux fois trop froid.\n⭐ Deux mois pour une même température : un antécédent n'est pas toujours unique.",
          schema: repere([-1, 13, -1, 14], [{ pts: [[1, 2], [2, 3], [3, 5], [4, 7], [5, 9], [6, 11], [7, 12], [8, 11], [9, 9], [10, 7], [11, 4], [12, 2]] }], [
            { x: 4, y: 7, label: "avril" },
            { x: 10, y: 7, label: "octobre" },
            { x: 7, y: 12, label: "juillet" },
          ], 7, true),
          micros: ["auto_fct_image_antecedent", "auto_fct_reperer_graphique"],
        },
        {
          titre: "Un barrage pendant la sécheresse",
          enonce:
            "Pendant une sécheresse, le volume d'eau d'un barrage, en millions de m³, est $V(t) = -0{,}5t^2 + 12$, où $t$ est le nombre de semaines (chiffres d'un modèle). Sa courbe est tracée ci-dessous.\na) Quel est le volume au départ ?\nb) L'alerte est déclenchée sous $10$ millions de m³. Après quelle semaine ?\nc) La crise est déclarée sous $4$ millions. Lire la semaine sur le graphique, puis vérifier par le calcul.",
          figure: repere([-1, 5, -1, 13], [{ q: [-0.5, 0, 12] }], [], undefined, true),
          correction:
            "a) $V(0) = 12$ : $12$ millions de m³.\nb) La courbe est à la hauteur $10$ en $t = 2$ : le volume passe sous $10$ millions après la semaine $2$.\nc) La courbe atteint $4$ en $t = 4$. Calcul : $-0{,}5 \\times 4^2 + 12 = -8 + 12 = 4$. ✔️\n⚠️ Le volume BAISSE : passer sous le seuil, c'est ici aller à DROITE de l'intersection.\n⭐ La baisse s'accélère : $2$ millions perdus les deux premières semaines, $6$ les deux suivantes.",
          schema: repere([-1, 5, -1, 13], [{ q: [-0.5, 0, 12] }], [
            { x: 2, y: 10, label: "alerte" },
            { x: 4, y: 4, label: "crise" },
          ], [10, 4], true),
          micros: ["auto_fct_estimer_seuil", "auto_fct_appartenance_courbe"],
        },
        {
          titre: "Le loyer d'un studio",
          enonce:
            "La droite donne le loyer moyen d'un studio dans une ville (chiffres d'un modèle). Une unité horizontale vaut $5$ ans, à partir de 2000 ($x = 0$) ; une unité verticale vaut $100$ €.\na) Quel était le loyer en 2010 ?\nb) En quelle année atteint-il $800$ € ?\nc) De combien augmente-t-il tous les cinq ans ?",
          figure: repere([-1, 6, -1, 11], [{ q: [0, 1, 4] }], [], undefined, true),
          correction:
            "a) 2010, c'est $10$ ans après 2000, soit $\\dfrac{10}{5} = 2$ unités. On lit $6$ : $6 \\times 100 = 600$ €.\nb) $800$ €, ce sont $8$ unités. La droite est à $8$ en $x = 4$, soit $4 \\times 5 = 20$ ans après 2000 : en 2020.\nc) Quand on avance d'une unité, la droite monte d'une unité : $+100$ € tous les cinq ans.\n⚠️ Sur l'axe horizontal, « $2$ » ne veut pas dire 2002 : on convertit avec l'échelle.",
          schema: ecranSeulement(repere([-1, 6, -1, 11], [{ q: [0, 1, 4] }], [
            { x: 2, y: 6, label: "2010" },
            { x: 4, y: 8, label: "2020" },
          ], undefined, true)),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent"],
        },
        {
          titre: "Le trébuchet",
          enonce:
            "Au Moyen Âge, les assiégeants lançaient des pierres avec des trébuchets. Dans ce modèle, la hauteur de la pierre, en dizaines de mètres, est $h(x) = -x^2 + 6x$, où $x$ est la distance parcourue, en dizaines de mètres.\na) Le point $R(4 ; 8)$ est-il sur la trajectoire ? Et le point $(2 ; 7)$ ?\nb) Un rempart de $60$ m de haut se dresse à $40$ m du trébuchet. La pierre passe-t-elle au-dessus ?\nc) À quelle distance la pierre retombe-t-elle au sol ?",
          figure: repere([-1, 7, -2, 11], [{ q: [-1, 6, 0] }], [], undefined, true),
          correction:
            "a) $h(4) = -4^2 + 6 \\times 4 = -16 + 24 = 8$ : oui, $R$ est sur la trajectoire.\n$h(2) = -2^2 + 6 \\times 2 = -4 + 12 = 8$, et non $7$ : le point $(2 ; 7)$ n'y est pas.\nb) $40$ m, c'est $x = 4$ : la pierre est à $8$ dizaines, soit $80$ m de haut. Le rempart mesure $60$ m : elle passe au-dessus, avec $20$ m de marge.\nc) Au sol, $h(x) = 0$ : $-x^2 + 6x = x(6 - x) = 0$, donc $x = 0$ (le départ) ou $x = 6$. Elle retombe à $60$ m.\n⚠️ $-4^2 = -16$ : le carré porte sur $4$, puis on prend l'opposé.",
          schema: repere([-1, 7, -2, 11], [{ q: [-1, 6, 0] }], [
            { x: 4, y: 8, label: "R" },
            { x: 6, y: 0, label: "sol" },
          ], 6, true),
          micros: ["auto_fct_appartenance_courbe", "auto_fct_image_antecedent"],
        },
        {
          titre: "Le prix d'un smartphone",
          enonce:
            "La courbe donne le prix d'un modèle de smartphone, en centaines d'euros, en fonction du nombre de mois depuis sa sortie (chiffres d'un modèle).\na) Quel est son prix de lancement ?\nb) Au bout de combien de mois vaut-il $800$ € ?\nc) À partir de quand vaut-il $500$ € ou moins ?\nd) D'après ce graphique, passera-t-il un jour sous $300$ € ?",
          figure: repere([-1, 11, -1, 12], [{ pts: [[0, 10], [2, 8], [4, 6], [6, 5], [8, 4], [10, 4]] }], [], undefined, true),
          correction:
            "a) En $x = 0$ : $10$ centaines, soit $1\\,000$ €.\nb) $800$ €, c'est $8$ : la courbe y est au mois $2$.\nc) $500$ €, c'est $5$ : la courbe l'atteint au mois $6$, puis reste en dessous.\nd) Non : à partir du mois $8$, la courbe est horizontale à $4$, soit $400$ €. Elle ne descend pas jusqu'à $3$.\n⭐ Le prix baisse vite au début, puis se stabilise.\n⚠️ « $500$ € ou moins » : le mois $6$ compte, puisque le prix y vaut exactement $500$ €.",
          schema: ecranSeulement(repere([-1, 11, -1, 12], [{ pts: [[0, 10], [2, 8], [4, 6], [6, 5], [8, 4], [10, 4]] }], [
            { x: 2, y: 8, label: "800 €" },
            { x: 6, y: 5, label: "500 €" },
          ], 5, true)),
          micros: ["auto_fct_estimer_seuil"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On traduit chaque question : « combien vaut… pour… » cherche une IMAGE ; « pour quelle valeur… atteint… » cherche un ANTÉCÉDENT.",
        "Une valeur lue est approchée : on la confirme par le calcul quand on connaît l'équation.",
        "On répond avec l'unité du problème, après conversion.",
      ],
      exercices: [
        {
          titre: "Un village pendant l'exode rural",
          enonce:
            "Dans ce modèle, la population d'un village de montagne, en centaines d'habitants, est $P(t) = 0{,}5t^2 - 4t + 10$, où $t$ est le nombre de décennies depuis 1920.\na) Que représentent les axes ? Combien d'habitants en 1920 ?\nb) Combien d'habitants en 1940 ? Lire, puis calculer.\nc) En quelle année la population est-elle la plus basse ? Combien d'habitants ?\nd) En quelles années le village comptait-il $400$ habitants ?\ne) Le point $(8 ; 10)$ est-il sur la courbe ? Qu'en conclure ?",
          figure: repere([-1, 9, -1, 12], [{ q: [0.5, -4, 10] }], [], undefined, true),
          correction:
            "a) En abscisse, le temps en décennies depuis 1920 ; en ordonnée, la population en centaines. $P(0) = 10$ : $1\\,000$ habitants en 1920.\nb) 1940, c'est $t = 2$ : on lit $4$, soit $400$ habitants. Calcul : $0{,}5 \\times 2^2 - 4 \\times 2 + 10 = 2 - 8 + 10 = 4$. ✔️\nc) Le point le plus bas est $(4 ; 2)$ : en 1960, $200$ habitants.\nd) $400$ habitants, c'est $4$ : la courbe y passe en $t = 2$ et en $t = 6$, soit en 1940 et en 1980.\ne) $0{,}5 \\times 8^2 - 4 \\times 8 + 10 = 32 - 32 + 10 = 10$ : oui. En 2000, le village retrouve ses $1\\,000$ habitants.\n⭐ Le modèle raconte un exode rural, puis un retour à la campagne.\n⚠️ Un modèle n'est pas l'histoire exacte d'un village réel : c'est une courbe simple qui en donne l'allure.",
          schema: repere([-1, 9, -1, 12], [{ q: [0.5, -4, 10] }], [
            { x: 2, y: 4, label: "1940" },
            { x: 6, y: 4, label: "1980" },
            { x: 4, y: 2, label: "" },
            { x: 8, y: 10, label: "2000" },
          ], 4, true),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent", "auto_fct_appartenance_courbe"],
        },
        {
          titre: "Le bon prix de vente",
          enonce:
            "Une entreprise fixe le prix de vente $x$ d'un objet, en dizaines d'euros. Plus l'objet est cher, moins il se vend : sa recette, en milliers d'euros, est $R(x) = -0{,}5x^2 + 4x$.\na) Que représentent les axes ?\nb) Quelle recette pour un prix de $20$ € ?\nc) Pour quels prix la recette vaut-elle $6\\,000$ € ?\nd) Quel prix donne la recette la plus grande ?\ne) Vérifier par le calcul que le point $(6 ; 6)$ est sur la courbe.",
          figure: repere([-1, 9, -1, 11], [{ q: [-0.5, 4, 0] }], [], undefined, true),
          correction:
            "a) En abscisse, le prix de vente en dizaines d'euros ; en ordonnée, la recette en milliers d'euros.\nb) $20$ €, c'est $x = 2$ : on lit $6$, soit $6\\,000$ €.\nc) $6\\,000$ €, c'est $6$ : la courbe y passe en $x = 2$ et en $x = 6$, pour un prix de $20$ € ou de $60$ €.\nd) Le sommet est $(4 ; 8)$ : à $40$ €, la recette atteint $8\\,000$ €.\ne) $-0{,}5 \\times 6^2 + 4 \\times 6 = -18 + 24 = 6$. ✔️\n⭐ Trop bon marché, on vend beaucoup mais on gagne peu par objet ; trop cher, on ne vend presque plus. Le bon prix est entre les deux.\n⚠️ À $80$ €, la recette tombe à $0$ : plus personne n'achète.",
          schema: repere([-1, 9, -1, 11], [{ q: [-0.5, 4, 0] }], [
            { x: 2, y: 6, label: "20 €" },
            { x: 6, y: 6, label: "60 €" },
            { x: 4, y: 8, label: "max" },
          ], 6, true),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent", "auto_fct_estimer_seuil", "auto_fct_appartenance_courbe"],
        },
        {
          titre: "Le débit d'un fleuve",
          enonce:
            "La courbe donne le débit moyen d'un fleuve de plaine, mois par mois, en centaines de m³ par seconde (chiffres d'un modèle ; $x = 1$ pour janvier).\na) Quel est le débit en mai ?\nb) Quels mois le débit vaut-il $600$ m³/s ?\nc) Quel est le mois des basses eaux, l'étiage ? Avec quel débit ?\nd) Sous $200$ m³/s, les péniches ne peuvent plus naviguer. Pendant quels mois le débit est-il de $200$ m³/s ou moins ?",
          figure: repere([-1, 13, -1, 12], [{ pts: [[1, 9], [2, 10], [3, 8], [4, 6], [5, 4], [6, 3], [7, 2], [8, 1], [9, 2], [10, 4], [11, 6], [12, 8]] }], [], undefined, true),
          correction:
            "a) Mai, c'est $x = 5$ : $4$ centaines, soit $400$ m³/s.\nb) $600$ m³/s, c'est $6$ : la courbe y passe en $x = 4$ et en $x = 11$, en avril et en novembre.\nc) Le point le plus bas est en $x = 8$ : en août, $100$ m³/s.\nd) La courbe est à $2$ en juillet ($x = 7$) et en septembre ($x = 9$), et en dessous entre les deux : de juillet à septembre.\n⭐ Hautes eaux en hiver, basses eaux en été : c'est l'allure d'un fleuve alimenté surtout par la pluie, en climat océanique.\n⚠️ En abscisse, des mois : on répond « avril et novembre », pas « $4$ et $11$ ».",
          schema: repere([-1, 13, -1, 12], [{ pts: [[1, 9], [2, 10], [3, 8], [4, 6], [5, 4], [6, 3], [7, 2], [8, 1], [9, 2], [10, 4], [11, 6], [12, 8]] }], [
            { x: 4, y: 6, label: "avril" },
            { x: 11, y: 6, label: "novembre" },
            { x: 8, y: 1, label: "août" },
          ], [6, 2], true),
          micros: ["auto_fct_reperer_graphique", "auto_fct_image_antecedent", "auto_fct_estimer_seuil"],
        },
        {
          titre: "La location de vélos",
          enonce:
            "Un loueur de vélos fait payer $P(h) = 2h + 3$ euros pour $h$ heures de location.\na) Combien coûtent $2$ heures ?\nb) Le point $(4 ; 11)$ est-il sur la droite qui représente $P$ ? Et le point $(3 ; 8)$ ?\nc) Que représentent les nombres $3$ et $2$ de la formule ?\nd) Avec $10$ €, combien de temps peut-on louer ?",
          correction:
            "a) $P(2) = 2 \\times 2 + 3 = 7$ €.\nb) $P(4) = 2 \\times 4 + 3 = 11$ : le point $(4 ; 11)$ est sur la droite. $P(3) = 2 \\times 3 + 3 = 9$, et non $8$ : le point $(3 ; 8)$ n'y est pas.\nc) $3$ € sont payés même pour $0$ heure : c'est le prix fixe. Puis $2$ € s'ajoutent pour chaque heure.\nd) On cherche $h$ tel que $2h + 3 = 10$ : $2h = 7$, donc $h = 3{,}5$. On peut louer $3$ h $30$ min.\n⚠️ $3{,}5$ h, c'est $3$ h $30$ min, pas $3$ h $50$ : une heure compte $60$ minutes.",
          schema: repere([-1, 6, -1, 14], [{ q: [0, 2, 3] }], [
            { x: 2, y: 7, label: "2 h" },
            { x: 3.5, y: 10, label: "10 €" },
            { x: 4, y: 11, label: "" },
          ], 10, true),
          micros: ["auto_fct_image_antecedent", "auto_fct_appartenance_courbe", "auto_fct_reperer_graphique", "auto_fct_estimer_seuil"],
        },
      ],
    },
  ],
};
