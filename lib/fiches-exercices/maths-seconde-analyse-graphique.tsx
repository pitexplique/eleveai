// ─── Fiche d'exercices : l'analyse graphique d'une fonction (seconde) ────────
//
// ⭐ 12/10/2026, Frédéric : « faut générer la fiche d'exercices » — après la
// notion du coach (analyse_graphique_2de, 6 micros) et la paysage « une nuit au
// Piton des Neiges » (https://youtu.be/YpVjGHxNKZI).
// ⛔ La vidéo n'est pas recopiée : pas de température de nuit ici.
//
// ⭐ TOUT SE LIT : les courbes passent par des valeurs ENTIÈRES aux graduations
// (interpolation monotone, la même que le coach et la vidéo) — voir
// `analyse-graphique-courbes.ts`. Chaque exercice a sa courbe DANS l'énoncé,
// chaque corrigé dresse son tableau ou trace sa droite y = k.
//
// ⭐ LES DEUX PIÈGES DE LA VIDÉO reviennent exprès : le mauvais axe (ex. 7) et
// zéros ↔ sommets (ex. 8, 13) ; plus « la courbe descend donc c'est négatif »
// (ex. 15) et les crochets (ex. 11, 16).
//
// ⭐ LE MONDE (★★ et ★★★) : un food-truck, la marée, une maison solaire, une
// crue, le compte d'un étudiant.
//
// ⭐ Recalcul indépendant : `npx --yes tsx@4 scripts/verifier-exercices-analyse-graphique.ts`
// — chaque image, antécédent, ensemble, ligne de signes et de variations
// affirmé (FAITS) est recalculé sur la courbe, et doit figurer dans le texte.
//
// Micro-compétences : graph_image (1, 7, 9, 10, 14, 15, 17, 18, 19),
// graph_antecedent (2, 7, 9, 18, 20), graph_resoudre_equation (3, 10, 17, 20),
// graph_tableau_signes (4, 9, 10, 13, 14, 17), graph_tableau_variations (5, 8,
// 9, 10, 12, 17, 18, 19), graph_resoudre_inequation (6, 11, 14, 15, 16, 17, 18,
// 19). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";
import { points, type NomCourbe } from "@/lib/fiches-exercices/analyse-graphique-courbes";

const courbe = (nom: NomCourbe, cadre: [number, number, number, number], grand = false, horizontale?: number | number[]) =>
  repere(cadre, [{ pts: points(nom) }], [], horizontale, grand);

export const exercicesAnalyseGraphiqueSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "analyse-graphique-2de",
  titre: "L'analyse graphique d'une fonction",
  accroche:
    "Vingt exercices, tous sur une courbe : lire une image et des antécédents, résoudre graphiquement une équation et une inéquation, dresser le tableau de signes et le tableau de variations. Un food-truck, la marée, une maison solaire, une crue, le compte d'un étudiant. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/fonction-vocabulaire-2de", titre: "Image, antécédent et courbe" },
    { href: "/fiches-cours/maths/seconde/fonction-variations-extremums", titre: "Variations et extremums" },
    { href: "/fiches-cours/maths/seconde/signes-expression-2de", titre: "Le signe d'une expression" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par exercice : une image, des antécédents, une équation, un tableau.",
      rappel: [
        "L'IMAGE de $a$ : on part de $a$ sur l'axe horizontal, on va jusqu'à la courbe, on lit l'ORDONNÉE. Elle est unique.",
        "Les ANTÉCÉDENTS de $k$ : on trace la droite horizontale $y = k$, on lit les ABSCISSES de tous les points de rencontre. Il peut y en avoir plusieurs, ou aucun.",
        "Résoudre $f(x) = k$, c'est chercher les antécédents de $k$. Résoudre $f(x) > k$, c'est garder les abscisses des points AU-DESSUS de la droite.",
        "Tableau de signes : les bornes et les ZÉROS. Tableau de variations : les bornes et les SOMMETS.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-3\\,;\\,4]$.\nLire graphiquement $f(-2)$, $f(0)$, $f(1)$ et $f(4)$.",
          figure: courbe("C1", [-4, 5, -3, 3]),
          correction:
            "Pour chaque nombre, on part de l'axe horizontal, on va jusqu'à la courbe, puis on lit l'ordonnée.\n$f(-2) = -1$ : au-dessus de $-2$, la courbe est à la hauteur $-1$.\n$f(0) = 1$, $f(1) = 2$ (le sommet de la courbe), $f(4) = -1$.\n⛔ Le piège : répondre $f(0) = 0$ en regardant l'origine. On lit la HAUTEUR de la courbe au-dessus de $0$, ici $1$.",
          micros: ["graph_image"],
        },
        {
          enonce: "Voici la courbe d'une fonction $g$ définie sur $[-4\\,;\\,3]$.\nDonner les antécédents par $g$ de :\na) $1$\nb) $0$\nc) $-2$\nd) $3$",
          figure: courbe("C2", [-5, 4, -3, 3]),
          correction:
            "Pour chaque nombre $k$, on trace la droite horizontale $y = k$ et on lit les abscisses des points où elle coupe la courbe.\na) $y = 1$ coupe la courbe en $x = -3$ et en $x = 3$ : deux antécédents, $-3$ et $3$.\nb) $y = 0$ (l'axe horizontal) : $-2$ et $2$.\nc) $y = -2$ touche la courbe en un seul point, le bas du creux : $0$ est le seul antécédent.\nd) $y = 3$ passe au-dessus de toute la courbe : $3$ n'a AUCUN antécédent.\n⭐ Une image est unique ; des antécédents, il peut y en avoir deux, un… ou aucun.",
          schema: courbe("C2", [-5, 4, -3, 3], false, [1, -2]),
          micros: ["graph_antecedent"],
        },
        {
          enonce: "Voici la courbe d'une fonction $h$ définie sur $[-2\\,;\\,5]$. Résoudre graphiquement :\na) $h(x) = 1$\nb) $h(x) = 2$\nc) $h(x) = -1$\nd) $h(x) = 3$",
          figure: courbe("C3", [-3, 6, -2, 3]),
          correction:
            "Résoudre $h(x) = k$, c'est chercher les abscisses des points de la courbe à la hauteur $k$.\na) La droite $y = 1$ coupe la courbe TROIS fois : $S = \\{-1\\,;\\,3\\,;\\,5\\}$.\nb) $y = 2$ : en $-2$ (le bord gauche) et en $4$ (le sommet) : $S = \\{-2\\,;\\,4\\}$.\nc) $y = -1$ touche le creux en $1$ : $S = \\{1\\}$.\nd) $y = 3$ ne rencontre jamais la courbe : $S = \\varnothing$.\n⛔ Le piège au a) : s'arrêter à deux solutions. On balaie la droite jusqu'au BOUT du domaine : le point d'abscisse $5$ compte.",
          schema: courbe("C3", [-3, 6, -2, 3], false, [1, 2]),
          micros: ["graph_resoudre_equation"],
        },
        {
          enonce: "Dresser le tableau de signes de la fonction $f$ dont la courbe est tracée ci-dessous, sur $[-3\\,;\\,4]$.",
          figure: courbe("C1", [-4, 5, -3, 3]),
          correction:
            "Première ligne : les bornes du domaine, $-3$ et $4$, et les ZÉROS, là où la courbe coupe l'axe horizontal : $-1$ et $3$.\nDeuxième ligne : la courbe est sous l'axe de $-3$ à $-1$ (signe $-$), au-dessus de $-1$ à $3$ ($+$), de nouveau sous l'axe de $3$ à $4$ ($-$).\nSous $-1$ et sous $3$, un $0$.\n⛔ Le piège : écrire $1$ dans la première ligne parce que c'est le sommet. Le sommet sert au tableau de VARIATIONS, pas au tableau de signes.",
          schema: tableauSignes(["−3", "−1", "3", "4"], [["$f(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["graph_tableau_signes"],
        },
        {
          enonce: "Dresser le tableau de variations de la fonction $g$ dont la courbe est tracée ci-dessous, sur $[-4\\,;\\,3]$.",
          figure: courbe("C2", [-5, 4, -3, 3]),
          correction:
            "Première ligne : les bornes, $-4$ et $3$, et le SOMMET, là où la courbe change de sens : le creux en $0$.\nDeuxième ligne : les valeurs en ces points, $g(-4) = 2$, $g(0) = -2$, $g(3) = 1$.\nLa courbe descend de $-4$ à $0$ (flèche vers le bas, de $2$ à $-2$), puis monte de $0$ à $3$ (de $-2$ à $1$).\n⭐ Le minimum de $g$ vaut $-2$, atteint en $0$.",
          schema: tableauVariations([-4, 0, 3], [2, -2, 1], "g"),
          micros: ["graph_tableau_variations"],
        },
        {
          enonce: "Voici la courbe d'une fonction $h$ définie sur $[-2\\,;\\,5]$. Résoudre graphiquement :\na) $h(x) > 0$\nb) $h(x) < 1$",
          figure: courbe("C3", [-3, 6, -2, 3]),
          correction:
            "a) On garde les abscisses des points AU-DESSUS de l'axe horizontal. La courbe coupe l'axe en $0$ et en $2$ ; elle est au-dessus avant $0$ et après $2$.\nInégalité STRICTE : $0$ et $2$ sont exclus (là, $h$ vaut $0$, pas plus). Les bornes $-2$ et $5$ sont incluses.\n$S = [-2\\,;\\,0[ \\,\\cup\\, ]2\\,;\\,5]$.\nb) On trace $y = 1$ : elle coupe la courbe en $-1$, $3$ et $5$. La courbe est SOUS la droite entre $-1$ et $3$ seulement (en $5$, elle la touche sans passer dessous).\n$S = ]-1\\,;\\,3[$.\n⛔ Le piège au b) : ajouter $5$. En $5$, $h(5) = 1$, et $1 < 1$ est faux.",
          schema: courbe("C3", [-3, 6, -2, 3], false, 1),
          micros: ["graph_resoudre_inequation"],
        },
        {
          enonce: "On reprend la fonction $g$ de l'exercice 2.\nLéa doit lire $g(2)$. Elle trace la droite $y = 2$, trouve le point de la courbe d'abscisse $-4$, et répond $g(2) = -4$.\na) Quelle est sa confusion ?\nb) Que vaut vraiment $g(2)$ ?\nc) Que signifie, en fait, le nombre $-4$ qu'elle a trouvé ?",
          figure: courbe("C2", [-5, 4, -3, 3]),
          correction:
            "a) Léa a lu sur le MAUVAIS AXE : elle est partie de $2$ sur l'axe vertical, alors que $g(2)$ se lit en partant de $2$ sur l'axe horizontal.\nb) Au-dessus de $x = 2$, la courbe coupe l'axe : $g(2) = 0$.\nc) Elle a trouvé un ANTÉCÉDENT de $2$ : $g(-4) = 2$. C'est d'ailleurs le seul, car la courbe ne remonte jamais à $2$ ensuite.\n⭐ L'image se lit sur l'axe VERTICAL, l'antécédent sur l'axe HORIZONTAL.",
          micros: ["graph_image", "graph_antecedent"],
        },
        {
          enonce: "On reprend la fonction $h$ de l'exercice 3.\nSami propose ce tableau de variations : en première ligne $-2$, $0$, $2$, $5$.\na) Quelle erreur a-t-il faite ?\nb) Dresser le bon tableau de variations de $h$.",
          figure: courbe("C3", [-3, 6, -2, 3]),
          correction:
            "a) $0$ et $2$ sont les ZÉROS de $h$ (là où la courbe coupe l'axe). Ils servent au tableau de SIGNES. Le tableau de variations, lui, a besoin des SOMMETS, là où la courbe change de sens.\nb) La courbe descend jusqu'au creux en $1$, monte jusqu'au sommet en $4$, puis redescend.\nPremière ligne : $-2$, $1$, $4$, $5$. Valeurs : $h(-2) = 2$, $h(1) = -1$, $h(4) = 2$, $h(5) = 1$.\nFlèches : vers le bas, vers le haut, vers le bas.\n⭐ Signes : les zéros. Variations : les sommets.",
          schema: tableauVariations([-2, 1, 4, 5], [2, -1, 2, 1], "h"),
          micros: ["graph_tableau_variations"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs lectures sur une même courbe, comme au contrôle.",
      rappel: [
        "Inégalité STRICTE ($<$, $>$) : les points où la courbe touche la droite sont EXCLUS, crochets tournés vers l'extérieur. Inégalité LARGE ($\\leqslant$, $\\geqslant$) : ils sont INCLUS.",
        "Les bornes du domaine sont incluses quand la courbe y vérifie l'inégalité.",
        "Le signe se lit par rapport à l'AXE : au-dessus $+$, en dessous $-$. Le sens (monte, descend) se lit dans le tableau de variations — ce n'est pas la même chose.",
        "Le maximum (ou le minimum) se cherche aux sommets ET aux bornes.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $u$ définie sur $[-5\\,;\\,3]$.\na) Lire $u(-3)$ et $u(2)$.\nb) Donner les antécédents de $1$.\nc) Dresser le tableau de signes de $u$.\nd) Dresser le tableau de variations de $u$.\ne) Résoudre graphiquement $u(x) \\geqslant 1$.",
          figure: courbe("C4", [-6, 4, -3, 3]),
          correction:
            "a) $u(-3) = 1$ et $u(2) = -2$ (le bas du creux).\nb) La droite $y = 1$ coupe la courbe en $-3$ et en $-1$ : les antécédents de $1$ sont $-3$ et $-1$.\nc) Zéros : $-4$ et $0$. La courbe est sous l'axe avant $-4$, au-dessus entre $-4$ et $0$, sous l'axe après $0$ : $-$, $0$, $+$, $0$, $-$.\nd) Sommets : $-2$ (en haut, $u(-2) = 2$) et $2$ (en bas, $u(2) = -2$). Aux bornes : $u(-5) = -1$, $u(3) = -1$. Flèches : monte, descend, monte.\ne) On garde la partie de la courbe sur ou au-dessus de $y = 1$ : de $-3$ à $-1$, bornes comprises (inégalité large). $S = [-3\\,;\\,-1]$.",
          schema: (
            <>
              {tableauSignes(["−5", "−4", "0", "3"], [["$u(x)$", ["-", "+", "-"], ["0", "0"]]])}
              {tableauVariations([-5, -2, 2, 3], [-1, 2, -2, -1], "u")}
            </>
          ),
          micros: ["graph_image", "graph_antecedent", "graph_tableau_signes", "graph_tableau_variations", "graph_resoudre_inequation"],
        },
        {
          enonce: "Un food-truck ouvre en janvier. On note $B(t)$ son bénéfice mensuel, en centaines d'euros, $t$ mois après l'ouverture ($0 \\leqslant t \\leqslant 8$).\na) Lire $B(0)$ et l'interpréter.\nb) Résoudre $B(t) = 0$. Que se passe-t-il ce mois-là ?\nc) Dresser le tableau de signes de $B$ et l'interpréter.\nd) Dresser le tableau de variations de $B$. Quel est le meilleur mois, et combien rapporte-t-il ?",
          figure: courbe("FOOD", [-1, 9, -4, 4]),
          correction:
            "a) $B(0) = -3$ : le premier mois, le food-truck PERD $300$ euros (le matériel, le stock…).\nb) La courbe coupe l'axe en $t = 3$ : $S = \\{3\\}$. Au 3e mois, le food-truck ne gagne ni ne perd rien : c'est le « point mort ».\nc) Première ligne : $0$, $3$, $8$. Signes : $-$ avant $3$, $0$ en $3$, $+$ après. Le food-truck perd de l'argent les trois premiers mois, puis en gagne.\nd) La courbe monte jusqu'en $t = 6$ puis redescend. Valeurs : $B(0) = -3$, $B(6) = 3$, $B(8) = 1$.\nLe meilleur mois est le 6e : $300$ euros de bénéfice.\n⛔ Le piège au c) : écrire « $-$ » après $6$ parce que la courbe descend. Elle descend, mais reste au-dessus de l'axe : le bénéfice baisse, il reste POSITIF.",
          schema: (
            <>
              {tableauSignes(["0", "3", "8"], [["$B(t)$", ["-", "+"], ["0"]]], "t")}
              {tableauVariations([0, 6, 8], [-3, 3, 1], "B", "t")}
            </>
          ),
          micros: ["graph_image", "graph_resoudre_equation", "graph_tableau_signes", "graph_tableau_variations"],
        },
        {
          enonce: "On reprend la fonction $g$ de l'exercice 2. Résoudre graphiquement :\na) $g(x) < 0$\nb) $g(x) \\geqslant 0$\nc) $g(x) > -2$",
          figure: courbe("C2", [-5, 4, -3, 3]),
          correction:
            "a) La courbe est sous l'axe entre ses zéros $-2$ et $2$. Strict : on les exclut. $S = ]-2\\,;\\,2[$.\nb) C'est le contraire, zéros compris (inégalité large) : $S = [-4\\,;\\,-2] \\,\\cup\\, [2\\,;\\,3]$.\nc) La courbe est au-dessus de $y = -2$ PARTOUT, sauf en $0$ où elle la touche. On retire donc ce seul point : $S = [-4\\,;\\,0[ \\,\\cup\\, ]0\\,;\\,3]$.\n⛔ Le piège au c) : répondre $[-4\\,;\\,3]$. En $0$, $g(0) = -2$, et $-2 > -2$ est faux.",
          schema: courbe("C2", [-5, 4, -3, 3], false, -2),
          micros: ["graph_resoudre_inequation"],
        },
        {
          enonce: "On ne connaît pas la courbe de $f$, seulement son tableau de variations sur $[-3\\,;\\,5]$ :\nen première ligne $-3$, $0$, $3$, $5$ ; $f$ monte de $-1$ à $4$, descend de $4$ à $-2$, puis monte de $-2$ à $1$.\na) Quels sont le maximum et le minimum de $f$ ?\nb) Combien de solutions a l'équation $f(x) = 0$ ? Et $f(x) = 3$ ? Et $f(x) = 5$ ?\nc) Comparer $f(1)$ et $f(2)$, sans les connaître.",
          figure: tableauVariations([-3, 0, 3, 5], [-1, 4, -2, 1], "f"),
          correction:
            "a) Le maximum est $4$, atteint en $0$. Le minimum est $-2$, atteint en $3$ (on compare aussi les bornes : $-1$ et $1$ ne sont pas plus petits).\nb) $f(x) = 0$ : sur $[-3\\,;\\,0]$, $f$ passe de $-1$ à $4$, donc par $0$ une fois ; sur $[0\\,;\\,3]$, de $4$ à $-2$, une fois ; sur $[3\\,;\\,5]$, de $-2$ à $1$, une fois. TROIS solutions.\n$f(x) = 3$ : une fois sur $[-3\\,;\\,0]$, une fois sur $[0\\,;\\,3]$, jamais sur $[3\\,;\\,5]$ où $f$ ne dépasse pas $1$. DEUX solutions.\n$f(x) = 5$ : $5$ dépasse le maximum $4$. AUCUNE solution.\nc) $1$ et $2$ sont dans $[0\\,;\\,3]$, où $f$ DESCEND : quand $x$ augmente, $f(x)$ diminue. Donc $f(1) > f(2)$.\n⭐ Une fonction qui descend renverse l'ordre ; une fonction qui monte le conserve.",
          micros: ["graph_tableau_variations", "graph_resoudre_equation"],
        },
        {
          enonce: "Voici la courbe d'une fonction $k$ définie sur $[-3\\,;\\,4]$.\na) En quelles valeurs $k$ s'annule-t-elle ?\nb) Dresser le tableau de signes de $k$.\nc) Dresser le tableau de variations de $k$.",
          figure: courbe("C5", [-4, 5, -2, 3]),
          correction:
            "a) La courbe touche l'axe en $-1$ et le coupe en $3$ : $k$ s'annule en $-1$ et en $3$.\nb) Première ligne : $-3$, $-1$, $3$, $4$. Avant $-1$, la courbe est au-dessus : $+$. En $-1$, elle TOUCHE l'axe sans le traverser : un $0$, puis de nouveau $+$. Après $3$ : $-$.\nLigne : $+$, $0$, $+$, $0$, $-$.\nc) Les sommets : le creux en $-1$ ($k(-1) = 0$) et la bosse en $1$ ($k(1) = 2$). Aux bornes : $k(-3) = 2$, $k(4) = -1$.\n⛔ Le piège au b) : croire qu'un zéro change toujours le signe. Ici, en $-1$, la courbe rebondit sur l'axe : le signe reste $+$ des deux côtés.",
          schema: (
            <>
              {tableauSignes(["−3", "−1", "3", "4"], [["$k(x)$", ["+", "+", "-"], ["0", "0"]]])}
              {tableauVariations([-3, -1, 1, 4], [2, 0, 2, -1], "k")}
            </>
          ),
          micros: ["graph_tableau_signes", "graph_tableau_variations"],
        },
        {
          enonce: "À Saint-Malo, on note $H(t)$ la hauteur de la mer par rapport à son niveau moyen, en mètres, $t$ heures après minuit ($0 \\leqslant t \\leqslant 12$).\na) À quelle heure la marée est-elle basse ? Quelle est alors la hauteur ?\nb) Résoudre $H(t) < 0$ et l'interpréter.\nc) Dresser le tableau de signes de $H$.\nd) Un voilier ne peut quitter le port que si $H(t) \\geqslant 1$. Pendant quelles heures le peut-il ?",
          figure: courbe("MAREE", [-1, 13, -4, 5], true),
          correction:
            "a) Le point le plus bas de la courbe est en $t = 7$ : marée basse à 7 h, avec $H(7) = -3$, soit 3 mètres SOUS le niveau moyen.\nb) La courbe est sous l'axe entre $4$ et $10$, exclus : $S = ]4\\,;\\,10[$. De 4 h à 10 h, la mer est sous son niveau moyen.\nc) Première ligne : $0$, $4$, $10$, $12$. Signes : $+$, $0$, $-$, $0$, $+$.\nd) On trace $y = 1$ : elle coupe la courbe en $3$ et en $11$. On garde la courbe sur ou au-dessus : $S = [0\\,;\\,3] \\,\\cup\\, [11\\,;\\,12]$. Le voilier peut sortir de minuit à 3 h, puis de 11 h à midi.\n⛔ Le piège au d) : oublier le morceau $[11\\,;\\,12]$, au bout du graphique.",
          schema: (
            <>
              {tableauSignes(["0", "4", "10", "12"], [["$H(t)$", ["+", "-", "+"], ["0", "0"]]], "t")}
              {courbe("MAREE", [-1, 13, -4, 5], true, 1)}
            </>
          ),
          micros: ["graph_image", "graph_resoudre_inequation", "graph_tableau_signes"],
        },
        {
          enonce: "On reprend la fonction $f$ de l'exercice 1. Vrai ou faux ? Justifier par une lecture.\na) $f(0) = 1$.\nb) Le nombre $-1$ a un seul antécédent.\nc) $f(x) \\geqslant 0$ pour tout $x$ de $[-1\\,;\\,3]$.\nd) $f$ est négative sur $[1\\,;\\,3]$, car elle y descend.",
          figure: courbe("C1", [-4, 5, -3, 3]),
          correction:
            "a) VRAI : au-dessus de $0$, la courbe est à la hauteur $1$.\nb) FAUX : la droite $y = -1$ coupe la courbe en $-2$ et en $4$. Deux antécédents.\nc) VRAI : entre $-1$ et $3$, la courbe est sur ou au-dessus de l'axe. L'ensemble des solutions de $f(x) \\geqslant 0$ est exactement $[-1\\,;\\,3]$.\nd) FAUX : sur $[1\\,;\\,3]$, $f$ descend de $2$ à $0$, mais elle reste au-dessus de l'axe : elle est POSITIVE.\n⛔ Le piège au d) : confondre le SENS de la courbe (elle descend) et son SIGNE (elle est au-dessus de l'axe).",
          micros: ["graph_image", "graph_antecedent", "graph_resoudre_inequation"],
        },
        {
          enonce: "On reprend la fonction $u$ de l'exercice 9. Résoudre graphiquement, en soignant les crochets :\na) $u(x) < 0$\nb) $u(x) \\leqslant 0$",
          figure: courbe("C4", [-6, 4, -3, 3]),
          correction:
            "La courbe est sous l'axe avant $-4$ et après $0$ ; elle le coupe en $-4$ et en $0$.\na) Strict : on exclut $-4$ et $0$. Mais la borne $-5$ est incluse, car $u(-5) = -1 < 0$, et la borne $3$ aussi. $S = [-5\\,;\\,-4[ \\,\\cup\\, ]0\\,;\\,3]$.\nb) Large : on inclut $-4$ et $0$. $S = [-5\\,;\\,-4] \\,\\cup\\, [0\\,;\\,3]$.\n⛔ Le piège : ouvrir aussi les crochets en $-5$ et en $3$. Ce ne sont pas des zéros, ce sont les bords du domaine, et $u$ y est bien négative.",
          micros: ["graph_resoudre_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, une courbe, et tout ce qu'on peut en tirer.",
      rappel: [
        "Toujours traduire la question en lecture : « quand ? » = des antécédents ; « combien vaut ? » = une image ; « pendant combien de temps ? » = la longueur d'un intervalle de solutions.",
        "Rédiger : « Par lecture graphique, l'ensemble des solutions de … est … ».",
        "Le nombre de solutions de $f(x) = k$ se lit dans le tableau de variations : on compte les flèches qui traversent la hauteur $k$.",
      ],
      exercices: [
        {
          titre: "Une maison solaire",
          enonce: "Une maison a des panneaux solaires. On note $B(t)$ la production moins la consommation, en kilowatts, $t$ heures après 6 h ($0 \\leqslant t \\leqslant 12$). Quand $B(t) > 0$, la maison produit plus qu'elle ne consomme.\na) Lire $B(6)$ et l'interpréter.\nb) Résoudre $B(t) = 0$. À quelles heures cela correspond-il ?\nc) Dresser le tableau de signes de $B$ et l'interpréter.\nd) Dresser le tableau de variations de $B$.\ne) Le chauffe-eau se met en marche quand le surplus atteint au moins $2$ kW. Pendant combien de temps fonctionne-t-il ?",
          figure: courbe("SOLAIRE", [-1, 13, -3, 5], true),
          correction:
            "a) $B(6) = 4$ : à midi, la maison produit $4$ kW de plus qu'elle ne consomme.\nb) La courbe coupe l'axe en $t = 2$ et $t = 10$ : $S = \\{2\\,;\\,10\\}$, c'est-à-dire 8 h et 16 h.\nc) Première ligne : $0$, $2$, $10$, $12$. Signes : $-$, $0$, $+$, $0$, $-$. Entre 8 h et 16 h, la maison produit plus qu'elle ne consomme ; le matin tôt et le soir, elle consomme plus.\nd) La courbe monte jusqu'en $t = 6$, puis redescend. Valeurs : $B(0) = -2$, $B(6) = 4$, $B(12) = -2$.\ne) On résout $B(t) \\geqslant 2$ : la droite $y = 2$ coupe la courbe en $4$ et en $8$. $S = [4\\,;\\,8]$, de 10 h à 14 h : le chauffe-eau fonctionne pendant $4$ heures.",
          schema: (
            <>
              {tableauSignes(["0", "2", "10", "12"], [["$B(t)$", ["-", "+", "-"], ["0", "0"]]], "t")}
              {tableauVariations([0, 6, 12], [-2, 4, -2], "B", "t")}
            </>
          ),
          micros: ["graph_image", "graph_resoudre_equation", "graph_tableau_signes", "graph_tableau_variations", "graph_resoudre_inequation"],
        },
        {
          titre: "Une crue",
          enonce: "Après de fortes pluies, on note $N(t)$ l'écart entre le niveau d'une rivière et son niveau habituel, en mètres, $t$ jours plus tard ($0 \\leqslant t \\leqslant 9$).\na) Quel est le niveau le plus haut atteint, et quel jour ?\nb) La vigilance « crue » est déclenchée tant que $N(t) \\geqslant 2$. Résoudre cette inéquation. Combien de jours dure la vigilance ?\nc) Quels jours l'écart vaut-il exactement $3$ mètres ?\nd) Dresser le tableau de variations de $N$.",
          figure: courbe("CRUE", [-1, 10, -2, 5]),
          correction:
            "a) Le sommet de la courbe est en $t = 5$ : $N(5) = 4$. Le 5e jour, la rivière est $4$ mètres au-dessus de son niveau habituel.\nb) La droite $y = 2$ coupe la courbe en $3$ et en $7$ ; entre les deux, la courbe est au-dessus. Inégalité large : $S = [3\\,;\\,7]$. La vigilance dure du jour 3 au jour 7, soit $4$ jours.\nc) On cherche les antécédents de $3$ : la droite $y = 3$ coupe la courbe en $4$ et en $6$. Le 4e jour en montant, le 6e en redescendant.\nd) Première ligne : $0$, $5$, $9$. Valeurs : $N(0) = -1$, $N(5) = 4$, $N(9) = 0$. La courbe monte, puis descend.\n⛔ Le piège au b) : compter $5$ jours en comptant les nombres $3$, $4$, $5$, $6$, $7$. La DURÉE est la longueur de l'intervalle : $7 - 3 = 4$.",
          schema: tableauVariations([0, 5, 9], [-1, 4, 0], "N", "t"),
          micros: ["graph_image", "graph_resoudre_inequation", "graph_antecedent", "graph_tableau_variations"],
        },
        {
          titre: "Le compte d'un étudiant",
          enonce: "Une étudiante suit son compte en banque. On note $S(t)$ le solde, en centaines d'euros, $t$ mois après le 1er septembre ($0 \\leqslant t \\leqslant 10$).\na) Lire $S(0)$.\nb) Le compte est « à découvert » quand $S(t) < 0$. Pendant combien de mois l'est-il ?\nc) Dresser le tableau de variations de $S$. Quel est le découvert le plus profond ?\nd) La banque facture des frais quand le découvert atteint au moins $100$ euros, c'est-à-dire quand $S(t) \\leqslant -1$. Résoudre cette inéquation.",
          figure: courbe("COMPTE", [-1, 11, -3, 4], true),
          correction:
            "a) $S(0) = 3$ : $300$ euros au 1er septembre.\nb) La courbe est sous l'axe entre $3$ et $7$, exclus (le solde y vaut $0$) : $S = ]3\\,;\\,7[$. Le découvert dure $7 - 3 = 4$ mois.\nc) Première ligne : $0$, $5$, $10$. Valeurs : $3$, $-2$, $3$. La courbe descend jusqu'en $t = 5$, puis remonte.\nLe découvert le plus profond est $-2$, soit $200$ euros, au 5e mois (en février).\nd) La droite $y = -1$ coupe la courbe en $4$ et en $6$ ; entre les deux, la courbe est en dessous. Inégalité large : $[4\\,;\\,6]$. Les frais tombent de janvier à mars.",
          schema: tableauVariations([0, 5, 10], [3, -2, 3], "S", "t"),
          micros: ["graph_image", "graph_resoudre_inequation", "graph_tableau_variations"],
        },
        {
          titre: "Combien de solutions ?",
          enonce: "On reprend la fonction $h$ de l'exercice 3, définie sur $[-2\\,;\\,5]$.\na) Combien de solutions ont les équations $h(x) = 0$, $h(x) = 1$, $h(x) = 2$ et $h(x) = -1$ ?\nb) Dresser le tableau de variations de $h$ (voir l'exercice 8).\nc) Pour quelles valeurs du nombre $k$ l'équation $h(x) = k$ a-t-elle exactement DEUX solutions ?",
          figure: courbe("C3", [-3, 6, -2, 3]),
          correction:
            "a) $h(x) = 0$ : en $0$ et en $2$, deux solutions. $h(x) = 1$ : en $-1$, $3$ et $5$, trois solutions. $h(x) = 2$ : en $-2$ et en $4$, deux solutions. $h(x) = -1$ : en $1$ seulement, une solution.\nb) Première ligne $-2$, $1$, $4$, $5$ ; $h$ descend de $2$ à $-1$, monte de $-1$ à $2$, descend de $2$ à $1$.\nc) On fait monter une droite horizontale $y = k$ et on compte ses rencontres avec la courbe :\n— sous $-1$ ou au-dessus de $2$ : aucune ;\n— $k = -1$ : une (le creux) ;\n— $k$ strictement entre $-1$ et $1$ : deux (une sur la descente, une sur la montée) ;\n— $k = 1$ et $k$ entre $1$ et $2$ : trois (la dernière descente compte aussi) ;\n— $k = 2$ : deux (en $-2$ et au sommet $4$).\nDeux solutions exactement pour $-1 < k < 1$, et pour $k = 2$.\n⭐ C'est le tableau de variations qui permet de compter, sans tracer chaque droite.",
          schema: tableauVariations([-2, 1, 4, 5], [2, -1, 2, 1], "h"),
          micros: ["graph_antecedent", "graph_resoudre_equation", "graph_tableau_variations"],
        },
      ],
    },
  ],
};

