// ─── Fiche d'exercices : algorithmique et programmation (3e) — 20 exercices corrigés ─
//
// Feuille du 24/09/2026. Alignée sur la fiche de cours
// `lib/fiches/maths-3e-algorithmique.tsx` (« Algorithmique : variables, boucles
// et programmes de calcul ») et sur les micros du coach, notionId
// algo_programmation. Le niveau est celui du brevet : des blocs façon Scratch,
// écrits en texte (`programme()`), des variables, « répéter … fois », « répéter
// jusqu'à », « si … alors … sinon », et le programme de calcul lu comme une
// expression littérale.
//
// ⭐ LE VISUEL EST LE PROGRAMME : chaque programme est dans la FIGURE de
// l'énoncé, et le corrigé montre la TRACE (les valeurs des variables, bloc
// après bloc ou tour après tour) ou le programme corrigé, sa ligne en couleur.
// ⛔ Guillemets SIMPLES dans les blocs (`dire 'on court'`) : un `\"` laisserait
// un antislash que le contrôle commun prendrait pour du LaTeX hors formule.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni 4(x + 3), ni 5x − 2).
//
// ⭐ LE MONDE : le terrain de volley (18 m sur 9 m : règles officielles de la
// FIVB, règle 1.1), la course à pied et la température, la sortie en kayak, le
// podomètre, le recul d'un glacier (12 m par an : HYPOTHÈSE de l'exercice, dite
// dans l'énoncé), un relevé de chaleur fictif, un plan d'entraînement de trail.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-algorithmique-3e.mjs`
// EXÉCUTE chaque programme avec un petit interprète de blocs écrit en JS, relit
// les traces du source et les compare à l'exécution.
//
// Micro-compétences : algo_programme_calcul (1, 2, 9, 10, 16, 18),
// algo_variable_boucle (3, 4, 11-14, 17, 19, 20), algo_condition_complexe (5, 6,
// 12, 15, 17, 20), algo_corriger (7, 12, 14, 17), algo_generaliser (8, 9, 13,
// 16, 18, 19), algo_defi (17-20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme, trace } from "@/lib/fiches-exercices/figures";

export const exercicesAlgorithmique3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Vingt exercices façon Scratch, du bloc seul au problème de brevet, avec un rappel de cours avant chaque niveau. Suis chaque programme au brouillon, bloc par bloc, puis ouvre la correction : elle montre les valeurs des variables à chaque étape et nomme le piège.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/3e/algo-programmation",
      titre: "Algorithmique : variables, boucles et programmes de calcul",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme court. Tu le suis bloc par bloc, en notant la valeur de chaque variable.",
      rappel: [
        "Une variable est une boîte qui porte un nom. « mettre x à 7 » REMPLACE ce qu'il y a dans la boîte ; « ajouter 3 à x » AJOUTE 3 à ce qu'elle contient.",
        "« répéter 4 fois » exécute les blocs qu'il contient $4$ fois de suite, puis passe à la suite.",
        "« si … alors … sinon » : si la condition est vraie, on fait le premier groupe de blocs ; sinon, le second. « et » demande que les DEUX conditions soient vraies, « ou » qu'AU MOINS UNE le soit.",
      ],
      exercices: [
        {
          enonce: "Voici un programme de calcul écrit en blocs. On répond $2$ à la question. Que dit le lutin à la fin ?",
          figure: programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre x à x + 3", "mettre x à x * 4", "mettre x à x - 5", "dire x"]),
          correction:
            "Je suis les blocs un par un, en gardant la valeur de x à chaque ligne.\nx vaut $2$, puis $2 + 3 = 5$, puis $5 \\times 4 = 20$, puis $20 - 5 = 15$.\nRéponse : le lutin dit $15$.\n⛔ Le piège : tout écrire en une ligne, $2 + 3 \\times 4 - 5$, et trouver $9$. Le programme ajoute 3 AVANT de multiplier : en une ligne, il faut des parenthèses, $(2 + 3) \\times 4 - 5 = 15$.",
          schema: trace(["bloc", "x"], [["réponse", 2], ["+ 3", 5], ["× 4", 20], ["− 5", 15]]),
          micros: ["algo_programme_calcul"],
        },
        {
          enonce: "On appelle $x$ le nombre choisi. Écris le résultat de ce programme en fonction de $x$, puis développe-le.",
          figure: programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre x à x - 1", "mettre x à x * 3", "dire x"]),
          correction:
            "Le premier calcul enlève 1 : j'obtiens $x - 1$.\nLe second multiplie TOUT ce résultat par 3 : j'obtiens $3(x - 1)$.\nJe développe : $3(x - 1) = 3x - 3$.\nRéponse : le programme calcule $3x - 3$.\n⭐ Contrôle avec 5 : le programme donne $(5 - 1) \\times 3 = 12$, et $3 \\times 5 - 3 = 12$.\n⛔ Le piège : écrire $3x - 1$. La multiplication porte sur le résultat entier, pas seulement sur $x$.",
          schema: trace(["bloc", "x"], [["réponse", 5], ["− 1", 4], ["× 3", 12]]),
          micros: ["algo_programme_calcul"],
        },
        {
          enonce: "Dans un jeu vidéo de basket, le score est une variable. Un bonus final double le score. Que dit le lutin ?",
          figure: programme(["mettre score à 0", "ajouter 2 à score", "ajouter 3 à score", "ajouter 1 à score", "mettre score à score * 2", "dire score"]),
          correction:
            "« ajouter » augmente le score, il ne le remplace pas.\nLe score vaut $0$, puis $0 + 2 = 2$, puis $2 + 3 = 5$, puis $5 + 1 = 6$.\nLe dernier bloc remplace le score par son double : $6 \\times 2 = 12$.\nRéponse : le lutin dit $12$.\n⛔ Le piège : lire « ajouter 1 à score » comme « mettre score à 1 ». On trouverait $1 \\times 2 = 2$ : les paniers d'avant seraient effacés.",
          schema: trace(["bloc", "score"], [["mettre à 0", 0], ["+ 2", 2], ["+ 3", 5], ["+ 1", 6], ["× 2", 12]]),
          micros: ["algo_variable_boucle"],
        },
        {
          enonce: "Dans une expérience, une colonie de $100$ bactéries triple toutes les heures. Ce programme la suit pendant $4$ heures. Que dit le lutin ?",
          figure: programme(["mettre n à 100", "répéter 4 fois", "  mettre n à n * 3", "dire n"]),
          correction:
            "À chaque tour de la boucle, je multiplie la valeur du moment par 3.\nTour 1 : $100 \\times 3 = 300$. Tour 2 : $300 \\times 3 = 900$. Tour 3 : $900 \\times 3 = 2\\,700$. Tour 4 : $2\\,700 \\times 3 = 8\\,100$.\nRéponse : le lutin dit $8\\,100$ : il y a $8\\,100$ bactéries au bout de $4$ heures.\n⛔ Le piège : calculer $100 \\times 3 \\times 4 = 1\\,200$. Répéter 4 fois « multiplier par 3 », c'est multiplier par $3 \\times 3 \\times 3 \\times 3 = 81$, pas par $12$.",
          schema: trace(["tour", "n"], [["départ", 100], [1, 300], [2, 900], [3, 2700], [4, 8100]]),
          micros: ["algo_variable_boucle"],
        },
        {
          enonce: "Une appli de course à pied conseille de sortir selon la température. Que dit le lutin si on répond $3$ ? $18$ ? $25$ ?",
          figure: programme(["demander 'Température ?'", "mettre t à réponse", "si t > 5 et t < 25 alors", "  dire 'on court'", "sinon", "  dire 'on reste'"]),
          correction:
            "La condition est vraie seulement si t est plus grand que 5 ET plus petit que 25.\nAvec $3$ : « t > 5 » est fausse, donc toute la condition est fausse. Le lutin dit « on reste ».\nAvec $18$ : $18 > 5$ et $18 < 25$, les deux sont vraies. Le lutin dit « on court ».\nAvec $25$ : « t < 25 » est fausse, car $25$ n'est pas plus petit que $25$. Le lutin dit « on reste ».\nRéponse : dans l'ordre, « on reste », « on court », « on reste ».\n⛔ Le piège : la borne. « < 25 » exclut $25$ ; pour l'inclure, il faudrait écrire « t < 26 » avec des entiers.",
          schema: trace(["t", "t > 5", "t < 25", "le lutin dit"], [[3, "faux", "vrai", "on reste"], [18, "vrai", "vrai", "on court"], [25, "vrai", "faux", "on reste"]]),
          micros: ["algo_condition_complexe"],
        },
        {
          enonce:
            "Un club de kayak annule la sortie si le vent dépasse $40$ km/h ou si les vagues dépassent $2$ m. Que dit le lutin :\na) avec un vent de $30$ km/h et des vagues de $3$ m ?\nb) avec $45$ km/h et $1$ m ?\nc) avec $35$ km/h et $1{,}5$ m ?",
          figure: programme(["demander 'Vent ?'", "mettre v à réponse", "demander 'Vagues ?'", "mettre h à réponse", "si v > 40 ou h > 2 alors", "  dire 'sortie annulée'", "sinon", "  dire 'on part'"]),
          correction:
            "Avec « ou », il suffit qu'UNE des deux conditions soit vraie.\na) $30 > 40$ est faux, mais $3 > 2$ est vrai. Réponse : « sortie annulée ».\nb) $45 > 40$ est vrai. Réponse : « sortie annulée ».\nc) $35 > 40$ est faux et $1{,}5 > 2$ est faux. Réponse : « on part ».\n⛔ Le piège : confondre « ou » et « et ». Avec « et », le cas a) donnerait « on part » : on sortirait avec des vagues de $3$ m parce que le vent est calme.",
          schema: trace(["", "v > 40", "h > 2", "le lutin dit"], [["a)", "faux", "vrai", "sortie annulée"], ["b)", "vrai", "faux", "sortie annulée"], ["c)", "faux", "faux", "on part"]]),
          micros: ["algo_condition_complexe"],
        },
        {
          enonce:
            "Un terrain de volley mesure $18$ m sur $9$ m. Ce programme doit calculer le périmètre d'un rectangle.\na) Que dit-il si on répond $18$ puis $9$ ?\nb) Quel est le vrai périmètre du terrain ?\nc) Corrige le bloc faux.",
          figure: programme(["demander 'Longueur ?'", "mettre L à réponse", "demander 'Largeur ?'", "mettre l à réponse", "mettre p à 2 * L + l", "dire p"]),
          correction:
            "a) L'ordinateur fait la multiplication d'abord : $2 \\times 18 + 9 = 36 + 9 = 45$. Réponse : il dit $45$.\nb) Le périmètre compte deux longueurs et deux largeurs : $2 \\times (18 + 9) = 2 \\times 27 = 54$. Réponse : $54$ m.\nc) Il faut des parenthèses : « mettre p à 2 * (L + l) ». Avec $18$ et $9$, le programme dit alors $54$.\n⛔ Le piège : oublier que l'ordinateur respecte les priorités, comme sur une copie. Sans parenthèses, seule la longueur est doublée.",
          schema: programme(["demander 'Longueur ?'", "mettre L à réponse", "demander 'Largeur ?'", "mettre l à réponse", "mettre p à 2 * (L + l)", "dire p"], 4),
          micros: ["algo_corriger"],
        },
        {
          enonce:
            "Louer un kayak coûte $12$ € de forfait, plus $3$ € par heure. Complète le bloc « mettre prix à … » pour que le programme calcule le prix pour h heures, puis donne le prix pour $4$ heures.",
          figure: programme(["demander 'Heures ?'", "mettre h à réponse", "mettre prix à ...", "dire prix"]),
          correction:
            "Le forfait se paie une seule fois : $12$. Chaque heure coûte $3$ €, donc h heures coûtent $3 \\times h$.\nJe complète : « mettre prix à 12 + 3 * h ».\nPour $4$ heures : $12 + 3 \\times 4 = 12 + 12 = 24$. Réponse : $24$ €.\n⛔ Le piège : écrire « (12 + 3) * h ». On ferait payer le forfait à chaque heure : $15 \\times 4 = 60$ €.",
          schema: programme(["demander 'Heures ?'", "mettre h à réponse", "mettre prix à 12 + 3 * h", "dire prix"], 2),
          micros: ["algo_generaliser"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions, comme au brevet. Tu testes le programme, puis tu le traduis en calcul littéral.",
      rappel: [
        "Un programme de calcul s'écrit avec $x$ : chaque bloc s'applique à TOUT le résultat d'avant. « ajouter 5 puis multiplier par 2 » donne $2(x + 5)$, pas $2x + 5$.",
        "Pour prouver qu'un programme donne toujours le même type de résultat, j'écris son expression en $x$, puis je la développe et je la réduis.",
        "« répéter jusqu'à » s'arrête dès que la condition devient VRAIE. Je teste la condition à chaque tour.",
        "Corriger un programme : je le fais tourner sur un exemple dont je connais la réponse, et je cherche la ligne où ça dérape.",
      ],
      exercices: [
        {
          enonce:
            "a) Quel résultat donne ce programme avec $7$ ?\nb) Et avec $-3$ ?\nc) Que remarques-tu ?\nd) Prouve-le pour tout nombre $x$.",
          figure: programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre x à x + 5", "mettre x à x * 2", "mettre x à x - 10", "dire x"]),
          correction:
            "a) $7 + 5 = 12$, puis $12 \\times 2 = 24$, puis $24 - 10 = 14$. Réponse : $14$.\nb) $-3 + 5 = 2$, puis $2 \\times 2 = 4$, puis $4 - 10 = -6$. Réponse : $-6$.\nc) $14$ est le double de $7$, et $-6$ le double de $-3$ : le programme semble doubler le nombre choisi.\nd) J'écris le programme en $x$, puis je développe : $2(x + 5) - 10 = 2x + 10 - 10 = 2x$.\nRéponse : le programme donne toujours le double du nombre choisi.\n⛔ Le piège : croire que deux exemples prouvent la règle. Ils la font deviner ; seul le calcul avec $x$ la prouve.",
          schema: trace(["x", "+ 5", "× 2", "− 10"], [[7, 12, 24, 14], ["−3", 2, 4, "−6"]]),
          micros: ["algo_programme_calcul", "algo_generaliser"],
        },
        {
          enonce: "a) Quel résultat donne ce programme avec $-2$ ?\nb) Quel nombre faut-il choisir pour obtenir $20$ ?",
          figure: programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre x à x * 3", "mettre x à x - 4", "dire x"]),
          correction:
            "a) $-2 \\times 3 = -6$, puis $-6 - 4 = -10$. Réponse : $-10$.\nb) Le programme calcule $3x - 4$. Je résous $3x - 4 = 20$.\n$3x = 24$, donc $x = 8$.\n⭐ Contrôle : $8 \\times 3 = 24$ et $24 - 4 = 20$.\nRéponse : il faut choisir $8$.\n⛔ Le piège : remonter le programme dans le même ordre (diviser par 3, puis ajouter 4). Pour remonter, on défait les blocs à l'ENVERS : d'abord ajouter 4, puis diviser par 3.",
          schema: trace(["x", "× 3", "− 4"], [["−2", "−6", "−10"], [8, 24, 20]]),
          micros: ["algo_programme_calcul"],
        },
        {
          enonce:
            "On suppose, pour l'exercice, qu'un glacier long de $3\\,000$ m recule de $12$ m chaque année à partir de 2026.\na) Que dit le lutin ?\nb) Combien de fois la boucle a-t-elle tourné ? Quelle est alors la longueur du glacier ?",
          figure: programme(["mettre L à 3000", "mettre an à 2026", "répéter jusqu'à L < 2900", "  mettre L à L - 12", "  ajouter 1 à an", "dire an"]),
          correction:
            "À chaque tour, le glacier perd $12$ m et l'année avance de $1$. La boucle s'arrête dès que L est plus petit que $2\\,900$.\nAprès $8$ tours : $3\\,000 - 8 \\times 12 = 2\\,904$. $2\\,904$ n'est pas plus petit que $2\\,900$ : la boucle continue.\nAprès $9$ tours : $3\\,000 - 9 \\times 12 = 2\\,892$, qui est plus petit que $2\\,900$ : la boucle s'arrête.\na) Réponse : le lutin dit $2035$.\nb) Réponse : la boucle a tourné $9$ fois, et le glacier mesure $2\\,892$ m.\n⛔ Le piège : diviser $100$ par $12$ et s'arrêter à $8$ tours. $8$ tours ne font que $96$ m de recul : il en faut un neuvième pour passer SOUS $2\\,900$.",
          schema: trace(["tour", "L", "an"], [[1, 2988, 2027], [2, 2976, 2028], [3, 2964, 2029], [4, 2952, 2030], [5, 2940, 2031], [6, 2928, 2032], [7, 2916, 2033], [8, 2904, 2034], [9, 2892, 2035]]),
          micros: ["algo_variable_boucle"],
        },
        {
          enonce:
            "Un podomètre compte les jours où l'on a marché AU MOINS $10\\,000$ pas. Sur une semaine, on entre : $8\\,200$ ; $12\\,500$ ; $10\\,000$ ; $6\\,400$ ; $11\\,000$ ; $9\\,999$ ; $15\\,000$.\na) Que dit le lutin ?\nb) Est-ce le bon nombre de jours ?\nc) Corrige le programme.",
          figure: programme(["mettre jours à 0", "répéter 7 fois", "  demander 'Pas ?'", "  si réponse > 10000 alors", "    ajouter 1 à jours", "dire jours"]),
          correction:
            "a) Je teste « réponse > 10000 » pour chaque jour : $12\\,500$, $11\\,000$ et $15\\,000$ passent ; $10\\,000$ ne passe pas, car $10\\,000$ n'est pas plus grand que $10\\,000$. Réponse : le lutin dit $3$.\nb) Non. « Au moins $10\\,000$ » inclut $10\\,000$ : il y a $4$ bons jours.\nc) Les pas sont des nombres entiers : « au moins $10\\,000$ », c'est « plus que $9\\,999$ ». J'écris « si réponse > 9999 alors ». Le lutin dit alors $4$.\n⛔ Le piège : le jour à $10\\,000$ pas pile. « > » exclut la borne ; Scratch n'a pas de bloc « supérieur ou égal ».",
          schema: programme(["mettre jours à 0", "répéter 7 fois", "  demander 'Pas ?'", "  si réponse > 9999 alors", "    ajouter 1 à jours", "dire jours"], 3),
          micros: ["algo_variable_boucle", "algo_condition_complexe", "algo_corriger"],
        },
        {
          enonce:
            "Le lutin laisse une trace quand il avance.\na) Quelle figure trace ce programme ?\nb) Quelle est la longueur totale du tracé ?\nc) Écris un programme qui trace un octogone régulier de côté $25$.",
          figure: programme(["stylo en position d'écriture", "répéter 6 fois", "  avancer de 40", "  tourner de 60 degrés"]),
          correction:
            "a) Six côtés de même longueur, et le lutin tourne de $6 \\times 60 = 360$ degrés en tout : il revient à son point de départ. Réponse : un hexagone régulier.\nb) $6 \\times 40 = 240$. Réponse : le tracé mesure $240$ pas.\nc) Un octogone a $8$ côtés. Pour faire un tour complet en $8$ virages, chaque virage vaut $360 \\div 8 = 45$ degrés. Le tracé mesure alors $8 \\times 25 = 200$ pas.\n⛔ Le piège : tourner de l'angle INTÉRIEUR de la figure. Avec « tourner de 120 degrés » au lieu de $60$, le lutin trace un triangle, parcouru deux fois.",
          schema: programme(["stylo en position d'écriture", "répéter 8 fois", "  avancer de 25", "  tourner de 45 degrés"], 3),
          micros: ["algo_variable_boucle", "algo_generaliser"],
        },
        {
          enonce:
            "Ce programme doit calculer $1 + 2 + 3 + \\dots + 10$.\na) Que dit le lutin ?\nb) Pourquoi est-ce faux ?\nc) Corrige-le.",
          figure: programme(["mettre s à 0", "mettre i à 1", "répéter 10 fois", "  ajouter 1 à i", "  ajouter i à s", "dire s"]),
          correction:
            "a) Au premier tour, i passe à $2$ AVANT d'être ajouté : s reçoit $2$, puis $3$, … jusqu'à $11$. Je calcule $2 + 3 + \\dots + 11 = 65$. Réponse : le lutin dit $65$.\nb) Le $1$ n'est jamais ajouté, et le $11$ l'est en trop : $65 = 55 - 1 + 11$.\nc) J'échange les deux blocs de la boucle : d'abord « ajouter i à s », puis « ajouter 1 à i ». Le lutin dit alors $55$.\n⭐ Contrôle : $1 + 2 + \\dots + 10 = \\dfrac{10 \\times 11}{2} = 55$.\n⛔ Le piège : l'ORDRE des blocs dans la boucle. Les mêmes blocs, dans l'autre ordre, ne font pas le même calcul.",
          schema: (
            <div className="space-y-2">
              {trace(["tour", "i", "s"], [[1, 2, 2], [2, 3, 5], [3, 4, 9], [4, 5, 14], [5, 6, 20], [6, 7, 27], [7, 8, 35], [8, 9, 44], [9, 10, 54], [10, 11, 65]])}
              {programme(["mettre s à 0", "mettre i à 1", "répéter 10 fois", "  ajouter i à s", "  ajouter 1 à i", "dire s"], 3)}
            </div>
          ),
          micros: ["algo_variable_boucle", "algo_corriger"],
        },
        {
          enonce:
            "Un parc naturel affiche ses tarifs avec ce programme.\na) Quel prix dit-il pour un visiteur de $8$ ans ? $12$ ans ? $64$ ans ? $65$ ans ?\nb) Le parc crée un tarif « de $12$ à $17$ ans inclus ». Écris la condition, avec des âges entiers.",
          figure: programme(["demander 'Âge ?'", "mettre a à réponse", "si a < 12 ou a > 64 alors", "  mettre prix à 5", "sinon", "  mettre prix à 9", "dire prix"]),
          correction:
            "a) $8 < 12$ : la condition est vraie, prix $5$ €.\n$12$ : $12 < 12$ est faux et $12 > 64$ est faux, prix $9$ €.\n$64$ : $64 > 64$ est faux, prix $9$ €.\n$65$ : $65 > 64$ est vrai, prix $5$ €.\nRéponse : $5$ €, $9$ €, $9$ €, $5$ €.\nb) Il faut les deux à la fois, donc « et ». $12$ inclus, c'est « plus que $11$ » ; $17$ inclus, c'est « moins que $18$ ». Réponse : « a > 11 et a < 18 ».\n⛔ Le piège : écrire « a > 12 et a < 17 ». Les deux bornes, $12$ et $17$, seraient exclues.",
          schema: trace(["âge", "a < 12", "a > 64", "prix (€)"], [[8, "vrai", "faux", 5], [12, "faux", "faux", 9], [64, "faux", "faux", 9], [65, "faux", "vrai", 5]]),
          micros: ["algo_condition_complexe"],
        },
        {
          enonce:
            "a) Quel résultat donne ce programme avec $5$ ? Avec $-3$ ?\nb) Écris le résultat en fonction de $x$, puis développe-le.\nc) Quels nombres donnent $0$ ? Lesquels donnent $16$ ?",
          figure: programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre a à x - 3", "mettre b à x + 3", "mettre r à a * b", "dire r"]),
          correction:
            "a) Avec $5$ : a vaut $2$, b vaut $8$, r vaut $2 \\times 8 = 16$. Avec $-3$ : a vaut $-6$, b vaut $0$, r vaut $0$. Réponse : $16$ et $0$.\nb) Le programme multiplie $x - 3$ par $x + 3$ : $(x - 3)(x + 3) = x^2 - 9$.\nc) $x^2 - 9 = 0$ donne $x^2 = 9$ : Réponse : $3$ et $-3$ donnent $0$.\n$x^2 - 9 = 16$ donne $x^2 = 25$ : Réponse : $5$ et $-5$ donnent $16$.\n⛔ Le piège : oublier la solution négative. $(-5)^2 = 25$, comme $5^2$.",
          schema: trace(["x", "a", "b", "r"], [[5, 2, 8, 16], ["−3", "−6", 0, 0]]),
          micros: ["algo_programme_calcul", "algo_generaliser"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un programme plus long, plusieurs questions qui s'enchaînent. Fais tourner le programme au brouillon avant de répondre.",
      rappel: [
        "Pour suivre une boucle, je fais un tableau : une ligne par tour, une colonne par variable.",
        "Une variable qui compte ou qui additionne se met à $0$ AVANT la boucle, jamais dedans.",
        "Deux programmes donnent toujours le même résultat quand leurs expressions en $x$ sont égales une fois développées.",
      ],
      exercices: [
        {
          titre: "Cinq jours de chaleur",
          enonce:
            "Un relevé fictif donne les températures maximales de cinq jours d'été : $28$ ; $31$ ; $33$ ; $29$ ; $34$ (en °C).\na) Que dit le lutin ?\nb) Un élève déplace « mettre somme à 0 » au début de la boucle. Que dit alors le premier bloc « dire » ?\nc) Ajoute au programme une variable max qui donne la température la plus haute.",
          figure: programme(["mettre somme à 0", "mettre chauds à 0", "répéter 5 fois", "  demander 'Température ?'", "  ajouter réponse à somme", "  si réponse > 30 alors", "    ajouter 1 à chauds", "dire somme / 5", "dire chauds"]),
          correction:
            "a) La somme vaut $28 + 31 + 33 + 29 + 34 = 155$, et $155 \\div 5 = 31$. Les jours au-dessus de $30$ sont $31$, $33$ et $34$.\nRéponse : le lutin dit $31$ (la moyenne, en °C), puis $3$ (le nombre de jours au-dessus de $30$ °C).\nb) La somme repart de $0$ à chaque tour : à la fin, elle ne contient que le dernier jour, $34$. Réponse : le lutin dit $34 \\div 5 = 6{,}8$.\nc) Je mets max à $0$ avant la boucle, et dans la boucle : « si réponse > max alors mettre max à réponse ». Le lutin dit alors aussi $34$.\n⛔ Le piège : remettre à $0$ une variable DANS la boucle. Elle oublie tout ce qu'elle a compté avant.\n⭐ En hiver, si toutes les températures étaient négatives, partir de $0$ donnerait un max faux : on partirait alors de la première température relevée.",
          schema: (
            <div className="space-y-2">
              {trace(["jour", "réponse", "somme", "chauds"], [[1, 28, 28, 0], [2, 31, 59, 1], [3, 33, 92, 2], [4, 29, 121, 2], [5, 34, 155, 3]])}
              {programme(["mettre somme à 0", "mettre chauds à 0", "mettre max à 0", "répéter 5 fois", "  demander 'Température ?'", "  ajouter réponse à somme", "  si réponse > 30 alors", "    ajouter 1 à chauds", "  si réponse > max alors", "    mettre max à réponse", "dire somme / 5", "dire chauds", "dire max"], 9)}
            </div>
          ),
          micros: ["algo_variable_boucle", "algo_condition_complexe", "algo_corriger", "algo_defi"],
        },
        {
          titre: "Deux programmes jumeaux",
          enonce:
            "Programme A : choisir un nombre, lui ajouter 1, multiplier le résultat par lui-même, puis retirer le carré du nombre de départ. Programme B : multiplier le nombre par 2, puis ajouter 1.\na) Fais tourner les deux programmes avec $4$, puis avec $-3$.\nb) Que remarques-tu ?\nc) Prouve-le pour tout nombre $x$.\nd) Quel nombre faut-il choisir pour obtenir $100$ ?",
          figure: (
            <div className="space-y-2">
              {programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre a à x + 1", "mettre a à a * a", "mettre r à a - x * x", "dire r"])}
              {programme(["demander 'Nombre ?'", "mettre x à réponse", "mettre r à 2 * x + 1", "dire r"])}
            </div>
          ),
          correction:
            "a) Avec $4$ : A donne $5 \\times 5 - 4 \\times 4 = 25 - 16 = 9$ ; B donne $2 \\times 4 + 1 = 9$.\nAvec $-3$ : A donne $(-2) \\times (-2) - (-3) \\times (-3) = 4 - 9 = -5$ ; B donne $2 \\times (-3) + 1 = -5$.\nb) Les deux programmes donnent le même résultat.\nc) A calcule $(x + 1)^2 - x^2$. Je développe : $(x + 1)^2 - x^2 = x^2 + 2x + 1 - x^2 = 2x + 1$. C'est exactement ce que calcule B.\nRéponse : A et B donnent toujours le même résultat.\nd) Je résous $2x + 1 = 100$ : $2x = 99$, donc $x = 49{,}5$. Réponse : il faut choisir $49{,}5$.\n⛔ Le piège : développer $(x + 1)^2$ en $x^2 + 1$. Le double produit $2x$ ne disparaît pas.",
          schema: trace(["x", "A", "B"], [[4, 9, 9], ["−3", "−5", "−5"]]),
          micros: ["algo_programme_calcul", "algo_generaliser", "algo_defi"],
        },
        {
          titre: "Le plan d'entraînement",
          enonce:
            "Une coureuse prépare un trail : $3$ km la première semaine, puis $2$ km de plus chaque semaine. Le programme cherche la semaine où son total dépasse $100$ km.\na) Que dit le lutin ?\nb) Pourquoi la boucle ne s'arrête-t-elle pas à la semaine $9$ ?\nc) Montre que le total après $n$ semaines vaut $n(n + 2)$ km, sur les semaines $1$ à $4$, puis contrôle avec la semaine $10$.",
          figure: programme(["mettre d à 3", "mettre total à 0", "mettre sem à 0", "répéter jusqu'à total > 100", "  ajouter 1 à sem", "  ajouter d à total", "  ajouter 2 à d", "dire sem"]),
          correction:
            "a) Je suis la boucle tour par tour : les totaux sont $3$, $8$, $15$, $24$, $35$, $48$, $63$, $80$, $99$, $120$.\nLe total dépasse $100$ pour la première fois à la semaine $10$. Réponse : le lutin dit $10$.\nb) Après la semaine $9$, le total vaut $99$ : « total > 100 » est fausse, la boucle continue.\nc) Semaine $1$ : $1 \\times 3 = 3$. Semaine $2$ : $2 \\times 4 = 8$. Semaine $3$ : $3 \\times 5 = 15$. Semaine $4$ : $4 \\times 6 = 24$. Ce sont bien les totaux du tableau.\nContrôle : $10 \\times 12 = 120$. Réponse : après $10$ semaines, elle a couru $120$ km.\n⛔ Le piège : mettre « ajouter 2 à d » AVANT « ajouter d à total ». La première semaine compterait $5$ km au lieu de $3$.",
          schema: trace(["sem", "total"], [[1, 3], [2, 8], [3, 15], [4, 24], [5, 35], [6, 48], [7, 63], [8, 80], [9, 99], [10, 120]]),
          micros: ["algo_variable_boucle", "algo_generaliser", "algo_defi"],
        },
        {
          titre: "Le nombre secret",
          enonce:
            "Dans ce jeu, le lutin cache un nombre entier entre $1$ et $100$ (ici $37$) et répond à chaque essai.\na) Un joueur propose $50$, puis $25$, puis $37$. Que dit le lutin à chaque fois ? Que dit-il à la fin ?\nb) Un joueur propose toujours le milieu des nombres encore possibles. Montre que $7$ essais lui suffisent toujours.",
          figure: programme(["mettre n à 37", "mettre essais à 0", "répéter jusqu'à réponse = n", "  demander 'Ton nombre ?'", "  ajouter 1 à essais", "  si réponse < n alors", "    dire 'plus grand'", "  sinon", "    si réponse > n alors", "      dire 'plus petit'", "dire essais"]),
          correction:
            "a) $50$ : $50 < 37$ est faux, mais $50 > 37$ est vrai. Le lutin dit « plus petit ».\n$25$ : $25 < 37$ est vrai. Le lutin dit « plus grand ».\n$37$ : aucune des deux conditions n'est vraie, il ne dit rien ; « réponse = n » devient vraie, la boucle s'arrête.\nRéponse : « plus petit », « plus grand », puis $3$ (le nombre d'essais).\nb) Chaque essai raté garde au plus la moitié des nombres possibles : $100$, puis au plus $50$, $25$, $12$, $6$, $3$, $1$.\nAprès $6$ essais ratés, il ne reste qu'un nombre possible : le septième essai est le bon.\nRéponse : $7$ essais suffisent toujours.\n⭐ $6$ ne suffisent pas toujours : $6$ essais ne départagent que $2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 64$ cas, moins que $100$.\n⛔ Le piège : lire « plus grand » comme « ton essai est trop grand ». C'est le SECRET qui est plus grand que l'essai : il faut monter.",
          schema: trace(["essai", "réponse", "le lutin dit"], [[1, 50, "plus petit"], [2, 25, "plus grand"], [3, 37, "3"]]),
          micros: ["algo_condition_complexe", "algo_variable_boucle", "algo_defi"],
        },
      ],
    },
  ],
};
