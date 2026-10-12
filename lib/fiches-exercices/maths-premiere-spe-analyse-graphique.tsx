// ─── Fiche d'exercices : l'analyse graphique d'une fonction (première spé) ───
//
// ⭐ 12/10/2026, Frédéric : « fais les deux » (le short ceinture blanche et la
// feuille de première spé). Alignée sur la notion du coach
// analyse_graphique_1s et ses six micros graph1s_*.
//
// ⭐ UN CRAN AU-DESSUS DE LA SECONDE (maths-seconde-analyse-graphique.tsx) :
// trois sommets, un zéro sans changement de signe (ex. 7), des points ISOLÉS
// dans les ensembles de solutions (ex. 11, 13), le nombre de solutions selon k
// (ex. 10, 20), un tableau de signes déduit du seul tableau de variations
// (ex. 12), et le pont vers la dérivée : le SIGNE d'une vitesse donne le SENS
// de variation d'une altitude (ex. 18).
//
// ⭐ LE MONDE : un artisan et son seuil de rentabilité, une montgolfière, le
// solde commercial d'un pays, un barrage.
//
// ⭐ Recalcul : `npx --yes tsx@4 scripts/verifier-exercices-analyse-graphique.ts premiere-spe`
// (les FAITS de analyse-graphique-1s-courbes.ts, recalculés sur les courbes).
//
// Micro-compétences : graph1s_image (1, 8, 17, 18), graph1s_antecedent (2, 8,
// 9, 19, 20), graph1s_resoudre_equation (3, 9, 10, 17, 20),
// graph1s_tableau_signes (4, 7, 12, 14, 17, 18), graph1s_tableau_variations (5,
// 8, 9, 12, 14, 15, 17, 19), graph1s_resoudre_inequation (6, 11, 13, 14, 16,
// 17, 18, 19). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";
import { points, type NomCourbe } from "@/lib/fiches-exercices/analyse-graphique-1s-courbes";

const courbe = (nom: NomCourbe, cadre: [number, number, number, number], grand = false, horizontale?: number | number[]) =>
  repere(cadre, [{ pts: points(nom) }], [], horizontale, grand);

export const exercicesAnalyseGraphiquePremiereSpe: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "analyse-graphique-1s",
  titre: "L'analyse graphique d'une fonction",
  accroche:
    "Vingt exercices, tous sur une courbe, un cran au-dessus de la seconde : trois sommets, un zéro qui ne change pas le signe, des solutions isolées, le nombre de solutions selon k, et le signe d'une vitesse qui annonce la dérivée. Un artisan, une montgolfière, le solde commercial d'un pays, un barrage. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/premiere-spe/variations-fonctions", titre: "Variations et courbes des fonctions" },
    { href: "/fiches-cours/maths/premiere-spe/derivation", titre: "La dérivation" },
  ],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par exercice, sur des courbes à plusieurs sommets.",
      rappel: [
        "Image de $a$ : l'ORDONNÉE du point d'abscisse $a$. Antécédents de $k$ : les ABSCISSES des points d'ordonnée $k$ (droite $y = k$).",
        "Résoudre $f(x) = k$ : les antécédents de $k$. Résoudre $f(x) > k$ : les abscisses des points AU-DESSUS de la droite $y = k$.",
        "Tableau de signes : bornes et ZÉROS. Tableau de variations : bornes et SOMMETS (changements de sens).",
        "Un zéro où la courbe TOUCHE l'axe sans le traverser ne change pas le signe.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-4\\,;\\,5]$.\nLire $f(-3)$, $f(-1)$, $f(2)$ et $f(5)$.",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "On part de chaque abscisse, on rejoint la courbe, on lit l'ordonnée.\n$f(-3) = 1$, $f(-1) = -1$ (le creux), $f(2) = 2$ (le sommet), $f(5) = -1$ (le bord droit).\n⛔ Le piège : lire $f(5)$ « hors du dessin ». La courbe s'arrête en $5$ : son dernier point a pour ordonnée $-1$.",
          micros: ["graph1s_image"],
        },
        {
          enonce: "Avec la courbe de $f$ de l'exercice 1, donner les antécédents de :\na) $1$\nb) $2$\nc) $-1$\nd) $3$",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "On trace chaque droite horizontale et on relève TOUTES les abscisses de rencontre.\na) $y = 1$ coupe la courbe trois fois : $-3$, $1$ et $3$.\nb) $y = 2$ : en $-4$ (le bord gauche) et en $2$ (le sommet).\nc) $y = -1$ : en $-1$ (le creux) et en $5$ (le bord droit).\nd) $y = 3$ ne rencontre pas la courbe : aucun antécédent.\n⛔ Le piège au a) : s'arrêter à deux antécédents. Avec trois sommets, une droite peut couper la courbe trois fois.",
          schema: courbe("P1", [-5, 6, -2, 3], false, 1),
          micros: ["graph1s_antecedent"],
        },
        {
          enonce: "Voici la courbe d'une fonction $g$ définie sur $[-3\\,;\\,5]$. Résoudre graphiquement :\na) $g(x) = 0$\nb) $g(x) = -1$\nc) $g(x) = 2$\nd) $g(x) = 1$",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "a) La courbe TOUCHE l'axe en $-1$ et le COUPE en $3$ : $S = \\{-1\\,;\\,3\\}$.\nb) $y = -1$ coupe la courbe en $-2$, $0$ et $2$ : $S = \\{-2\\,;\\,0\\,;\\,2\\}$.\nc) $y = 2$ : seulement au bord droit, $S = \\{5\\}$.\nd) $y = 1$ : $S = \\{4\\}$.\n⛔ Le piège au a) : oublier $-1$. Un point où la courbe touche l'axe sans le traverser est bien une solution.",
          micros: ["graph1s_resoudre_equation"],
        },
        {
          enonce: "Dresser le tableau de signes de la fonction $f$ de l'exercice 1.",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "Zéros : la courbe coupe l'axe en $-2$, $0$ et $4$. Première ligne : $-4$, $-2$, $0$, $4$, $5$.\nAu-dessus de l'axe de $-4$ à $-2$ ($+$), en dessous de $-2$ à $0$ ($-$), au-dessus de $0$ à $4$ ($+$), en dessous de $4$ à $5$ ($-$).\nLigne : $+$, $0$, $-$, $0$, $+$, $0$, $-$.\n⛔ Le piège : mettre $-1$ et $2$ dans la première ligne. Ce sont les sommets : ils servent au tableau de variations.",
          schema: tableauSignes(["−4", "−2", "0", "4", "5"], [["$f(x)$", ["+", "-", "+", "-"], ["0", "0", "0"]]]),
          micros: ["graph1s_tableau_signes"],
        },
        {
          enonce: "Dresser le tableau de variations de la fonction $g$ de l'exercice 3.",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "Sommets : la bosse en $-1$ (où la courbe touche l'axe, $g(-1) = 0$) et le creux en $1$ ($g(1) = -2$). Aux bornes : $g(-3) = -2$ et $g(5) = 2$.\nPremière ligne : $-3$, $-1$, $1$, $5$. Flèches : monte, descend, monte.\n⭐ Le point $-1$ est à la fois un sommet ET un zéro : il apparaît dans les DEUX tableaux.",
          schema: tableauVariations([-3, -1, 1, 5], [-2, 0, -2, 2], "g"),
          micros: ["graph1s_tableau_variations"],
        },
        {
          enonce: "Avec la courbe de $f$ de l'exercice 1, résoudre graphiquement :\na) $f(x) \\geqslant 1$\nb) $f(x) < 0$",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "a) $y = 1$ coupe la courbe en $-3$, $1$ et $3$. La courbe est sur ou au-dessus de la droite de $-4$ à $-3$, puis de $1$ à $3$. Inégalité large : $S = [-4\\,;\\,-3] \\,\\cup\\, [1\\,;\\,3]$.\nb) Sous l'axe : entre $-2$ et $0$, et après $4$. Strict : on exclut les zéros, mais on garde la borne $5$ où $f(5) = -1 < 0$.\n$S = ]-2\\,;\\,0[ \\,\\cup\\, ]4\\,;\\,5]$.",
          schema: courbe("P1", [-5, 6, -2, 3], false, 1),
          micros: ["graph1s_resoudre_inequation"],
        },
        {
          enonce: "Dresser le tableau de signes de la fonction $g$ de l'exercice 3. Attention au point d'abscisse $-1$.",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "Zéros : $-1$ et $3$. Première ligne : $-3$, $-1$, $3$, $5$.\nDe $-3$ à $-1$, la courbe est sous l'axe : $-$. En $-1$, elle TOUCHE l'axe et repart vers le bas : un $0$, puis encore $-$ jusqu'à $3$. Après $3$ : $+$.\nLigne : $-$, $0$, $-$, $0$, $+$.\n⛔ Le piège : alterner les signes par réflexe (« $-$ puis $+$ » à chaque zéro). En $-1$, le signe ne change pas.",
          schema: tableauSignes(["−3", "−1", "3", "5"], [["$g(x)$", ["-", "-", "+"], ["0", "0"]]]),
          micros: ["graph1s_tableau_signes"],
        },
        {
          enonce: "Avec la courbe de $g$ de l'exercice 3 :\na) Quel est le maximum de $g$ sur $[-3\\,;\\,5]$ ? En quelle valeur est-il atteint ?\nb) Quel est le minimum de $g$ ? En combien de valeurs est-il atteint ?",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "a) Le sommet intérieur vaut $0$, mais au bord droit $g(5) = 2$. Le maximum est $2$, atteint en $5$.\nb) Le minimum est $-2$ : il est atteint DEUX fois, en $-3$ (le bord gauche) et en $1$ (le creux). Les antécédents de $-2$ sont $-3$ et $1$.\n⛔ Le piège au a) : répondre $0$, la valeur du sommet. Un extremum se cherche aussi aux BORNES.",
          micros: ["graph1s_image", "graph1s_antecedent", "graph1s_tableau_variations"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs lectures enchaînées, et des cas limites.",
      rappel: [
        "Strict ($<$, $>$) : les points de contact avec la droite sont exclus. Large ($\\leqslant$, $\\geqslant$) : inclus. Un ensemble de solutions peut contenir un point ISOLÉ, noté $\\{a\\}$.",
        "Le nombre de solutions de $f(x) = k$ : on compte les morceaux du tableau de variations qui « traversent » la hauteur $k$.",
        "Sur un intervalle où $f$ est croissante, l'ordre est conservé ; où elle est décroissante, il est renversé.",
      ],
      exercices: [
        {
          enonce: "Avec la courbe de $f$ de l'exercice 1 :\na) Résoudre $f(x) = 0$, $f(x) = 2$ et $f(x) = -1$.\nb) Dresser le tableau de variations de $f$.",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "a) $f(x) = 0$ : $S = \\{-2\\,;\\,0\\,;\\,4\\}$. $f(x) = 2$ : $S = \\{-4\\,;\\,2\\}$. $f(x) = -1$ : $S = \\{-1\\,;\\,5\\}$.\nb) Sommets : creux en $-1$ ($f(-1) = -1$), bosse en $2$ ($f(2) = 2$). Bornes : $f(-4) = 2$, $f(5) = -1$.\nPremière ligne : $-4$, $-1$, $2$, $5$ ; flèches : descend, monte, descend.",
          schema: tableauVariations([-4, -1, 2, 5], [2, -1, 2, -1], "f"),
          micros: ["graph1s_resoudre_equation", "graph1s_antecedent", "graph1s_tableau_variations"],
        },
        {
          enonce: "On reprend $f$ (exercice 1) et son tableau de variations (exercice 9).\nSelon la valeur du réel $k$, combien de solutions l'équation $f(x) = k$ a-t-elle sur $[-4\\,;\\,5]$ ?",
          figure: tableauVariations([-4, -1, 2, 5], [2, -1, 2, -1], "f"),
          correction:
            "On fait monter la droite $y = k$ et on compte les traversées de chaque flèche.\n— $k < -1$ ou $k > 2$ : aucune solution (la courbe reste entre $-1$ et $2$).\n— $k = -1$ : deux solutions ($-1$, le creux, et $5$, le bord).\n— $-1 < k < 2$ : la première flèche (de $2$ à $-1$), la deuxième (de $-1$ à $2$) et la troisième (de $2$ à $-1$) traversent chacune : TROIS solutions.\n— $k = 2$ : deux solutions ($-4$ et $2$).\n⭐ Les valeurs « frontières » ($-1$ et $2$) se traitent à part : c'est là que le nombre de solutions change.",
          micros: ["graph1s_resoudre_equation"],
        },
        {
          enonce: "Avec la courbe de $g$ de l'exercice 3, résoudre :\na) $g(x) \\geqslant 0$\nb) $g(x) < 0$",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "a) La courbe est sur ou au-dessus de l'axe en $-1$ (elle le touche) et de $3$ à $5$. $S = \\{-1\\} \\,\\cup\\, [3\\,;\\,5]$.\nb) C'est le reste : de $-3$ à $3$, PRIVÉ de $-1$. $S = [-3\\,;\\,-1[ \\,\\cup\\, ]-1\\,;\\,3[$.\n⛔ Le piège : oublier le point isolé $\\{-1\\}$ au a), ou répondre $[-3\\,;\\,3[$ au b). En $-1$, $g(-1) = 0$ : ni strictement négatif, mais bien positif ou nul.",
          micros: ["graph1s_resoudre_inequation"],
        },
        {
          enonce: "Une fonction $h$ est définie sur $[-2\\,;\\,6]$. On ne connaît que son tableau de variations : en première ligne $-2$, $1$, $4$, $6$ ; $h$ descend de $3$ à $-2$, monte de $-2$ à $1$, puis descend de $1$ à $-1$.\na) Combien de fois $h$ s'annule-t-elle ?\nb) On note $\\alpha < \\beta < \\gamma$ ces zéros. Dans quels intervalles se trouvent-ils ?\nc) Dresser le tableau de signes de $h$, avec $\\alpha$, $\\beta$, $\\gamma$.",
          figure: tableauVariations([-2, 1, 4, 6], [3, -2, 1, -1], "h"),
          correction:
            "a) Chaque flèche passe d'un signe à l'autre : de $3$ à $-2$, de $-2$ à $1$, de $1$ à $-1$. Elle croise $0$ une fois chacune : $h$ s'annule TROIS fois.\nb) $\\alpha \\in\\, ]-2\\,;\\,1[$, $\\beta \\in\\, ]1\\,;\\,4[$, $\\gamma \\in\\, ]4\\,;\\,6[$.\nc) Première ligne : $-2$, $\\alpha$, $\\beta$, $\\gamma$, $6$. Signes : $+$ (on part de $3$), $0$, $-$, $0$, $+$, $0$, $-$ (on finit à $-1$).\n⭐ Le tableau de variations SUFFIT pour le tableau de signes, même sans connaître les zéros : on les nomme.",
          schema: tableauSignes(["−2", "α", "β", "γ", "6"], [["$h(x)$", ["+", "-", "+", "-"], ["0", "0", "0"]]]),
          micros: ["graph1s_tableau_variations", "graph1s_tableau_signes"],
        },
        {
          enonce: "Avec la courbe de $f$ de l'exercice 1, résoudre :\na) $f(x) \\leqslant -1$\nb) $f(x) > -1$",
          figure: courbe("P1", [-5, 6, -2, 3]),
          correction:
            "a) La droite $y = -1$ ne touche la courbe qu'en deux points : le creux $-1$ et le bord $5$. Ailleurs, la courbe est au-dessus. $S = \\{-1\\} \\,\\cup\\, \\{5\\}$ : deux solutions isolées.\nb) Tout le reste : $S = [-4\\,;\\,-1[ \\,\\cup\\, ]-1\\,;\\,5[$.\n⛔ Le piège : écrire $[-1\\,;\\,5]$ au a). Entre $-1$ et $5$, la courbe remonte jusqu'à $2$ : elle n'est pas sous la droite.",
          micros: ["graph1s_resoudre_inequation"],
        },
        {
          enonce: "On note $S(t)$ le solde commercial d'un pays (exportations moins importations), en milliards d'euros, au trimestre $t$ ($0 \\leqslant t \\leqslant 8$).\na) Sur quelle période le pays est-il en excédent ($S(t) > 0$) ?\nb) Dresser le tableau de signes de $S$.\nc) Dresser le tableau de variations de $S$. Quel a été le pire déficit ?",
          figure: courbe("SOLDE", [-1, 9, -4, 2]),
          correction:
            "a) La courbe est au-dessus de l'axe entre $3$ et $5$, exclus : $S = ]3\\,;\\,5[$. Le pays est en excédent entre le 3e et le 5e trimestre.\nb) Première ligne : $0$, $3$, $5$, $8$. Signes : $-$, $0$, $+$, $0$, $-$.\nc) Sommets : bosse en $4$ ($S(4) = 1$), creux en $7$ ($S(7) = -2$). Bornes : $S(0) = -3$, $S(8) = -1$.\nPremière ligne : $0$, $4$, $7$, $8$.\nLe pire déficit est $-3$ milliards, au départ ($t = 0$) — pas au creux en $7$.\n⛔ Le piège au c) : prendre le creux pour le minimum. On compare avec la borne $0$.",
          schema: (
            <>
              {tableauSignes(["0", "3", "5", "8"], [["$S(t)$", ["-", "+", "-"], ["0", "0"]]], "t")}
              {tableauVariations([0, 4, 7, 8], [-3, 1, -2, -1], "S", "t")}
            </>
          ),
          micros: ["graph1s_resoudre_inequation", "graph1s_tableau_signes", "graph1s_tableau_variations"],
        },
        {
          enonce: "Avec le tableau de variations de $f$ (exercice 9), sans calcul, comparer :\na) $f(-3)$ et $f(-2)$\nb) $f(0)$ et $f(1)$\nc) $f(-1)$ et $f(4,5)$",
          figure: tableauVariations([-4, -1, 2, 5], [2, -1, 2, -1], "f"),
          correction:
            "a) $-3$ et $-2$ sont dans $[-4\\,;\\,-1]$, où $f$ DÉCROÎT : l'ordre est renversé. $-3 < -2$ donc $f(-3) > f(-2)$.\nb) $0$ et $1$ sont dans $[-1\\,;\\,2]$, où $f$ CROÎT : l'ordre est conservé. $f(0) < f(1)$.\nc) $-1$ et $4,5$ ne sont pas sur le même morceau : la règle ne s'applique pas directement. Mais $f(-1) = -1$ est le minimum de $f$ sur $[-4\\,;\\,2]$, et sur $[2\\,;\\,5]$ $f$ ne descend jusqu'à $-1$ qu'en $5$. Donc $f(4,5) > -1 = f(-1)$.\n⛔ Le piège au c) : appliquer « croissante donc conserve l'ordre » à deux nombres pris sur deux morceaux différents.",
          micros: ["graph1s_tableau_variations"],
        },
        {
          enonce: "On reprend $g$ (exercice 3).\na) Résoudre $g(x) \\leqslant -1$.\nb) Résoudre $g(x) > -2$.",
          figure: courbe("P2", [-4, 6, -3, 3]),
          correction:
            "a) $y = -1$ coupe la courbe en $-2$, $0$ et $2$. Sous la droite (ou dessus) : de $-3$ à $-2$, puis de $0$ à $2$. $S = [-3\\,;\\,-2] \\,\\cup\\, [0\\,;\\,2]$.\nb) La courbe est au-dessus de $y = -2$ partout, sauf en $-3$ et en $1$ où elle la touche. $S = ]-3\\,;\\,1[ \\,\\cup\\, ]1\\,;\\,5]$.\n⛔ Le piège au b) : laisser $-3$ dans l'ensemble. $g(-3) = -2$, et $-2 > -2$ est faux.",
          micros: ["graph1s_resoudre_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, une courbe, et la rédaction complète.",
      rappel: [
        "Traduire avant de lire : « à partir de quand ? » = une équation puis un signe ; « pendant combien de temps ? » = la longueur d'un intervalle.",
        "Rédiger : « Par lecture graphique, l'ensemble des solutions de … est … ».",
        "Le signe d'une VITESSE donne le sens de variation de la POSITION : vitesse positive, la position augmente. C'est l'idée de la dérivée.",
      ],
      exercices: [
        {
          titre: "Le seuil de rentabilité",
          enonce: "Un artisan fabrique des objets en bois. On note $B(q)$ son bénéfice mensuel, en centaines d'euros, quand il fabrique $q$ dizaines d'objets ($0 \\leqslant q \\leqslant 7$).\na) Lire $B(0)$ et l'interpréter.\nb) Déterminer le seuil de rentabilité : la production à partir de laquelle le bénéfice devient positif.\nc) Dresser le tableau de signes et le tableau de variations de $B$.\nd) Quelle production rapporte le plus ? Combien ?\ne) L'artisan vise un bénéfice d'au moins $200$ euros. Quelles productions conviennent ?",
          figure: courbe("ARTISAN", [-1, 8, -3, 4]),
          correction:
            "a) $B(0) = -2$ : sans rien produire, il perd $200$ euros (loyer de l'atelier, assurance).\nb) $B(q) = 0$ pour $q = 2$, et la courbe est au-dessus de l'axe ensuite. Le seuil de rentabilité est $20$ objets.\nc) Signes : première ligne $0$, $2$, $7$ ; $-$, $0$, $+$. Variations : première ligne $0$, $5$, $7$ ; $B$ monte de $-2$ à $3$, puis descend jusqu'à $1$.\nd) Le maximum est $3$, atteint en $q = 5$ : $50$ objets rapportent $300$ euros.\ne) On résout $B(q) \\geqslant 2$ : $y = 2$ coupe la courbe en $4$ et en $6$. $S = [4\\,;\\,6]$ : entre $40$ et $60$ objets.\n⛔ Le piège au d) : produire « le plus possible ». Au-delà de $50$ objets, le bénéfice baisse (heures supplémentaires, bois plus cher).",
          schema: (
            <>
              {tableauSignes(["0", "2", "7"], [["$B(q)$", ["-", "+"], ["0"]]], "q")}
              {tableauVariations([0, 5, 7], [-2, 3, 1], "B", "q")}
            </>
          ),
          micros: ["graph1s_image", "graph1s_resoudre_equation", "graph1s_tableau_signes", "graph1s_tableau_variations", "graph1s_resoudre_inequation"],
        },
        {
          titre: "La montgolfière",
          enonce: "On note $v(t)$ la vitesse VERTICALE d'une montgolfière, en m/s, $t$ minutes après le décollage ($0 \\leqslant t \\leqslant 8$). Quand $v(t) > 0$, elle monte ; quand $v(t) < 0$, elle descend.\na) Pendant quelles périodes la montgolfière monte-t-elle ?\nb) Dresser le tableau de signes de $v$.\nc) En déduire le tableau de variations de son ALTITUDE. À quel instant est-elle la plus haute (sur les 6 premières minutes) ?\nd) Lire $v(4)$. Que se passe-t-il à cet instant ?",
          figure: courbe("BALLON", [-1, 9, -3, 3]),
          correction:
            "a) $v(t) > 0$ quand la courbe est au-dessus de l'axe : $S = [0\\,;\\,2[ \\,\\cup\\, ]6\\,;\\,8]$. Elle monte pendant les 2 premières minutes, puis après la 6e.\nb) Première ligne : $0$, $2$, $6$, $8$. Signes : $+$, $0$, $-$, $0$, $+$.\nc) Le signe de la vitesse donne le sens de l'altitude : l'altitude MONTE sur $[0\\,;\\,2]$, DESCEND sur $[2\\,;\\,6]$, remonte sur $[6\\,;\\,8]$. Elle est la plus haute (sur les 6 premières minutes) en $t = 2$, quand la vitesse passe de $+$ à $-$.\nd) $v(4) = -2$ : la montgolfière descend le plus vite, à $2$ m/s.\n⛔ Le piège au c) : chercher le point le plus haut de la courbe de $v$. Le sommet de la VITESSE ($t = 0$ ou $t = 8$) n'est pas le sommet de l'ALTITUDE.\n⭐ C'est exactement le lien entre $f'$ et $f$ : le signe de la dérivée donne les variations.",
          schema: tableauSignes(["0", "2", "6", "8"], [["$v(t)$", ["+", "-", "+"], ["0", "0"]]], "t"),
          micros: ["graph1s_resoudre_inequation", "graph1s_tableau_signes", "graph1s_image", "var_signe_derivee"],
        },
        {
          titre: "Le barrage",
          enonce: "On note $N(t)$ l'écart entre le niveau d'un lac de barrage et sa cote d'alerte, en mètres, $t$ mois après le 1er janvier ($0 \\leqslant t \\leqslant 12$). Quand $N(t) > 0$, le niveau dépasse la cote d'alerte.\na) Résoudre $N(t) > 0$. Pendant combien de mois au total le niveau dépasse-t-il la cote d'alerte ?\nb) Dresser le tableau de variations de $N$.\nc) Combien de fois dans l'année l'écart vaut-il exactement $1$ mètre ? Quand ?",
          figure: courbe("BARRAGE", [-1, 13, -4, 3], true),
          correction:
            "a) La courbe est au-dessus de l'axe entre $3$ et $7$, puis après $11$. $S = ]3\\,;\\,7[ \\,\\cup\\, ]11\\,;\\,12]$. Durée : $(7 - 3) + (12 - 11) = 4 + 1 = 5$ mois.\nb) Sommets : bosse en $5$ ($N(5) = 2$), creux en $9$ ($N(9) = -2$). Bornes : $N(0) = -3$, $N(12) = 1$.\nPremière ligne : $0$, $5$, $9$, $12$ ; monte, descend, monte.\nc) $y = 1$ coupe la courbe en $4$, $6$ et $12$ : trois fois, fin avril, fin juin et fin décembre.\n⛔ Le piège au a) : oublier le morceau $]11\\,;\\,12]$ en fin d'année.",
          schema: tableauVariations([0, 5, 9, 12], [-3, 2, -2, 1], "N", "t"),
          micros: ["graph1s_resoudre_inequation", "graph1s_tableau_variations", "graph1s_antecedent"],
        },
        {
          titre: "Exactement une solution",
          enonce: "On reprend la fonction $g$ de l'exercice 3, définie sur $[-3\\,;\\,5]$.\na) Combien de solutions ont $g(x) = -2$, $g(x) = -1$, $g(x) = 0$ et $g(x) = 1$ ?\nb) Pour quelles valeurs du réel $k$ l'équation $g(x) = k$ a-t-elle exactement UNE solution ?",
          figure: tableauVariations([-3, -1, 1, 5], [-2, 0, -2, 2], "g"),
          correction:
            "a) $g(x) = -2$ : en $-3$ et en $1$, deux solutions. $g(x) = -1$ : en $-2$, $0$ et $2$, trois solutions. $g(x) = 0$ : en $-1$ et en $3$, deux solutions. $g(x) = 1$ : en $4$, une solution.\nb) On fait monter la droite $y = k$ :\n— $k < -2$ ou $k > 2$ : aucune solution ;\n— $k = -2$ : deux ; $-2 < k < 0$ : trois (une sur chaque flèche) ; $k = 0$ : deux (le sommet $-1$ et le point $3$) ;\n— $0 < k \\leqslant 2$ : seule la dernière flèche (de $-2$ à $2$) atteint ces hauteurs : UNE solution.\nExactement une solution pour $0 < k \\leqslant 2$.\n⛔ Le piège : oublier $k = 2$ (atteint au bord, en $5$) ou ajouter $k = 0$ (deux solutions).",
          micros: ["graph1s_antecedent", "graph1s_resoudre_equation"],
        },
      ],
    },
  ],
};
