// ─── Fiche d'exercices : résoudre graphiquement (STMG) — 20 exercices ───────────
//
// Notion auto_resolution_graphique du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-graphiques.bank.ts`). Tout se
// lit sur le dessin : f(x) = k, f(x) < k, le signe de f, ses variations. Une droite,
// une parabole ou une ligne de relevés, comme dans le coach. Aucun calcul de racine,
// pas de comparaison de deux courbes : le coach ne le demande pas.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : courbes sans contexte (ex. 1 à 8) ; chambre froide
// (frigoriste), salle de concert (programmatrice), pizzeria (pizzaïolo), camping
// (gérante), oiseaux (ornithologue), nappe d'eau (hydrogéologue), association
// (trésorière), fusée à eau (animateur scientifique), barrage (technicienne),
// crêpes (crêpier), montagne (accompagnatrice), glaces (glacier).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`,
// qui relit les courbes dans les figures et les tableaux dans les corrigés.
//
// Micro-compétences : auto_fct_resoudre_graphiquement (1, 2, 3, 4, 9, 10, 14, 15, 16,
// 17, 18, 19, 20), auto_fct_signe_graphique (5, 6, 9, 11, 12, 15, 18, 20),
// auto_fct_variations_graphique (7, 8, 13, 14, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";

// Un signe : le mot, au masculin ou au féminin, ou le signe −.
const NEGATIF = ["négatif", "négative", "-"];

export const exercicesAutoResolutionGraphiqueStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-resolution-graphique",
  titre: "Résoudre graphiquement",
  accroche:
    "Vingt exercices où tout se lit sur le dessin : résoudre f(x) = k et f(x) < k, trouver le signe d'une fonction, décrire ses variations. Une chambre froide, un camping, un barrage, un stand de crêpes, une randonnée en montagne. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé, et chaque tableau dressé dans le corrigé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Écris un intervalle ainsi : ]1 ; 7[ ou [3 ; +∞[ . Écris ∪ ou U pour réunir deux intervalles.",
      rappel: [
        "Résoudre $f(x) = k$ : on trace l'horizontale $y = k$. Les solutions sont les ABSCISSES des points de rencontre.",
        "$f(x) < k$ : les abscisses où la courbe est EN DESSOUS de l'horizontale ; $f(x) > k$ : AU-DESSUS. Crochets ouverts avec $<$ et $>$, fermés avec $\\leqslant$ et $\\geqslant$.",
        "$f$ est positive là où la courbe est au-dessus de l'axe horizontal, négative là où elle est en dessous.",
        "Les variations se lisent de gauche à droite : la courbe monte, $f$ est croissante ; elle descend, $f$ est décroissante. On écrit ces intervalles avec des crochets fermés.",
      ],
      exercices: [
        {
          enonce: "La droite représente une fonction $f$. Résous graphiquement l'équation $f(x) = 3$.",
          figure: repere([-2, 5, -4, 6], [{ q: [0, 2, -1] }]),
          reponses: [{ attendu: "2" }],
          correction:
            "On trace l'horizontale $y = 3$.\nElle rencontre la droite au point $(2\\,;\\,3)$.\nLa solution est l'abscisse de ce point : $x = 2$.\n⛔ Le piège : lire l'image de 3, soit 5. Ici, 3 est sur l'axe vertical, et on cherche $x$.\nRéponse : $x = 2$.",
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "La courbe représente une fonction $f$. Résous graphiquement l'équation $f(x) = 1$. Donne toutes les solutions.",
          figure: repere([-2, 6, -4, 7], [{ q: [1, -4, 1] }], [], undefined, true),
          reponses: [{ attendu: "0 ; 4" }],
          correction:
            "L'horizontale $y = 1$ coupe la parabole en deux points : $(0\\,;\\,1)$ et $(4\\,;\\,1)$.\nLes solutions sont leurs abscisses : 0 et 4.\n⛔ Le piège : oublier $x = 0$, parce que ce point est sur l'axe vertical. C'est une solution comme une autre.\nRéponse : 0 et 4.",
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce: "La droite représente une fonction $f$. Résous graphiquement l'inéquation $f(x) < 1$.",
          figure: repere([-2, 6, -4, 6], [{ q: [0, -1, 3] }]),
          reponses: [{ attendu: "]2 ; +∞[" }],
          correction:
            "L'horizontale $y = 1$ coupe la droite en $x = 2$.\nLa droite descend : elle est en dessous de l'horizontale à DROITE de 2.\nL'inégalité est stricte : le crochet en 2 est ouvert.\n⛔ Le piège : écrire $]-\\infty\\,;\\,2[$ parce que le signe $<$ fait penser à la gauche. Ici, la droite descend : le dessin décide.\nRéponse : ]2 ; +∞[.",
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "La fonction $f$ est définie sur $[0\\,;\\,6]$. Résous graphiquement l'inéquation $f(x) \\geqslant 4$.",
          figure: repere([-1, 7, -1, 7], [{ pts: [[0, 1], [2, 4], [4, 6], [6, 2]] }]),
          reponses: [{ attendu: "[2 ; 5]" }],
          correction:
            "L'horizontale $y = 4$ coupe la courbe en $x = 2$ et en $x = 5$.\nEntre ces deux valeurs, la courbe est au-dessus de l'horizontale.\nAvec $\\geqslant$, les deux points de rencontre conviennent : les crochets sont fermés.\n⛔ Le piège : écrire ]2 ; 5[. Avec $\\geqslant$, on garde les valeurs où $f(x) = 4$.\nRéponse : [2 ; 5].",
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "La droite représente une fonction $f$. Sur quel intervalle $f$ est-elle strictement positive ?",
          figure: repere([-2, 6, -5, 5], [{ q: [0, 2, -4] }]),
          reponses: [{ attendu: "]2 ; +∞[" }],
          correction:
            "La droite coupe l'axe horizontal en $x = 2$.\nElle monte : elle est au-dessus de cet axe à droite de 2.\n⛔ Le piège : répondre $]0\\,;\\,+\\infty[$. Positive ne veut pas dire « $x$ positif » : on regarde la hauteur de la courbe, pas le signe de $x$.\nRéponse : ]2 ; +∞[.",
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce:
            "La parabole représente une fonction $f$.\na) Sur quel intervalle $f$ est-elle strictement négative ?\nb) Sur quel ensemble $f$ est-elle strictement positive ?",
          figure: repere([-3, 5, -5, 6], [{ q: [1, -2, -3] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "]-1 ; 3[" },
            { question: "b)", attendu: "]-∞ ; -1[ ∪ ]3 ; +∞[" },
          ],
          correction:
            "La courbe coupe l'axe horizontal en $-1$ et en 3.\na) Entre ces deux valeurs, elle passe sous l'axe : $f$ est négative sur ]−1 ; 3[.\nb) De part et d'autre, elle est au-dessus : deux morceaux, réunis par ∪.\n⛔ Le piège au b) : ne garder qu'un seul morceau, ]3 ; +∞[. La courbe est aussi au-dessus à gauche de $-1$.\nRéponse : a) ]−1 ; 3[ ; b) ]−∞ ; −1[ ∪ ]3 ; +∞[.",
          schema: tableauSignes(["−∞", "−1", "3", "+∞"], [["$f(x)$", ["+", "-", "+"], ["0", "0"]]]),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce:
            "La fonction $f$ est définie sur $[0\\,;\\,6]$.\na) Sur quel intervalle est-elle croissante ?\nb) Sur quel intervalle est-elle décroissante ?\nc) Quel est son maximum ?",
          figure: repere([-1, 7, -1, 7], [{ pts: [[0, 1], [2, 5], [6, 2]] }]),
          reponses: [
            { question: "a)", attendu: "[0 ; 2]" },
            { question: "b)", attendu: "[2 ; 6]" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "On lit de gauche à droite.\na) La courbe monte de $x = 0$ à $x = 2$.\nb) Elle descend de $x = 2$ à $x = 6$.\nc) Le point le plus haut est $(2\\,;\\,5)$ : le maximum est 5, atteint en $x = 2$.\n⛔ Le piège au c) : répondre 2. Le maximum est une hauteur ; 2 est l'endroit où il est atteint.\nRéponse : a) [0 ; 2] ; b) [2 ; 6] ; c) 5.",
          schema: tableauVariations(["0", "2", "6"], [1, 5, 2]),
          micros: ["auto_fct_variations_graphique"],
        },
        {
          enonce:
            "La courbe représente une fonction $f$ définie sur $[0\\,;\\,4]$.\na) Sur quel intervalle est-elle décroissante ?\nb) Sur quel intervalle est-elle croissante ?\nc) Quel est son minimum ?",
          figure: repere([-1, 5, -1, 7], [{ pts: [[0, 5], [0.5, 3.25], [1, 2], [1.5, 1.25], [2, 1], [2.5, 1.25], [3, 2], [3.5, 3.25], [4, 5]] }]),
          reponses: [
            { question: "a)", attendu: "[0 ; 2]" },
            { question: "b)", attendu: "[2 ; 4]" },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "Le point le plus bas de la courbe est $(2\\,;\\,1)$.\na) À gauche de ce point, la courbe descend.\nb) À droite de ce point, elle monte.\nc) Ce point est à la hauteur 1 : le minimum est 1, atteint en $x = 2$.\n⛔ Le piège : lire les variations sur l'axe vertical. Les intervalles sont toujours des valeurs de $x$.\nRéponse : a) [0 ; 2] ; b) [2 ; 4] ; c) 1.",
          schema: tableauVariations(["0", "2", "4"], [5, 1, 5]),
          micros: ["auto_fct_variations_graphique"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une courbe dans une situation : on traduit la phrase, puis on lit sur le dessin.",
      rappel: [
        "La situation limite parfois $x$ : un nombre de places ou une durée ne sont pas négatifs. On reste alors sur l'intervalle donné.",
        "Un bénéfice positif, c'est la courbe au-dessus de l'axe horizontal.",
        "Le signe se dresse avec les endroits où la courbe COUPE l'axe horizontal. Les variations se dressent avec les SOMMETS et les extrémités.",
      ],
      exercices: [
        {
          enonce:
            "Un frigoriste suit la température d'une chambre froide pendant un essai de réglage (modèle). $t$ est le temps en heures, sur $[0\\,;\\,8]$, et $f(t)$ la température en °C.\na) Résous $f(t) = 1$. Donne les deux nombres.\nb) Résous $f(t) \\leqslant 1$.\nc) Sur quel intervalle la température est-elle strictement négative ?",
          figure: repere([-1, 9, -2, 6], [{ pts: [[0, 5], [2, 1], [4, -1], [6, 1], [8, 5]] }]),
          reponses: [
            { question: "a)", attendu: "2 ; 6" },
            { question: "b)", attendu: "[2 ; 6]" },
            { question: "c)", attendu: "]3 ; 5[" },
          ],
          correction:
            "a) L'horizontale $y = 1$ coupe la courbe en $t = 2$ et $t = 6$.\nb) Entre ces deux valeurs, la courbe est en dessous. Avec $\\leqslant$, on garde les bornes.\nc) La courbe coupe l'axe horizontal en $t = 3$ et $t = 5$. Elle est dessous entre les deux, et l'inégalité est stricte.\n⛔ Le piège au c) : répondre ]2 ; 6[. L'horizontale de référence est maintenant $y = 0$, plus $y = 1$.\nRéponse : a) 2 et 6 ; b) [2 ; 6] ; c) ]3 ; 5[.",
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_signe_graphique"],
        },
        {
          enonce:
            "Une programmatrice de salle de concert calcule son coût $C(x)$ en milliers d'euros, pour $x$ centaines de places ($x \\geqslant 0$, modèle). Son budget est de 6 000 €.\na) Résous $C(x) = 6$.\nb) Résous $C(x) \\leqslant 6$, en tenant compte de $x \\geqslant 0$.\nc) Combien de places peut-elle ouvrir au plus ?",
          figure: repere([-1, 8, -1, 9], [{ q: [0, 1, 2] }]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "[0 ; 4]" },
            { question: "c)", attendu: "400" },
          ],
          correction:
            "a) L'horizontale $y = 6$ coupe la droite en $x = 4$.\nb) La droite monte : elle est sous l'horizontale à gauche de 4. Comme $x \\geqslant 0$, on s'arrête à 0.\nc) $x = 4$ veut dire 4 centaines : $4 \\times 100 = 400$ places.\n⛔ Le piège au b) : écrire ]−∞ ; 4]. Un nombre de places négatif n'a pas de sens.\nRéponse : a) 4 ; b) [0 ; 4] ; c) 400.",
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "Un pizzaïolo modélise son bénéfice $B(x)$, en milliers d'euros, pour $x$ centaines de pizzas ($x \\geqslant 0$).\na) Résous $B(x) = 0$.\nb) Sur quel intervalle le bénéfice est-il strictement positif ?\nc) Sur quel intervalle est-il strictement négatif ?\nd) Quel est le signe de $B(1)$ ? Réponds positif ou négatif.",
          figure: repere([-1, 7, -7, 6], [{ q: [0, 2, -6] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "]3 ; +∞[" },
            { question: "c)", attendu: "[0 ; 3[" },
            { question: "d)", attendu: NEGATIF },
          ],
          correction:
            "a) La droite coupe l'axe horizontal en $x = 3$.\nb) Elle monte : au-dessus de l'axe à droite de 3.\nc) En dessous à gauche de 3, en partant de $x = 0$.\nd) 1 est plus petit que 3 : $B(1)$ est négatif. On lit $B(1) = -4$.\n⛔ Le piège au c) : fermer le crochet en 3. Le bénéfice y vaut 0, et 0 n'est pas strictement négatif.\nRéponse : a) 3 ; b) ]3 ; +∞[ ; c) [0 ; 3[ ; d) négatif.",
          schema: tableauSignes(["0", "3", "+∞"], [["$B(x)$", ["-", "+"], ["0"]]]),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce:
            "La gérante d'un camping modélise son bénéfice sur $[1\\,;\\,7]$, en milliers d'euros, pour $x$ dizaines d'emplacements.\na) Pour quelles valeurs de $x$ le bénéfice est-il nul ? Donne les deux nombres.\nb) Sur quel intervalle est-il strictement positif ?\nc) Sur quel ensemble est-il strictement négatif ?",
          figure: repere([-1, 8, -6, 6], [{ q: [-1, 8, -12] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2 ; 6" },
            { question: "b)", attendu: "]2 ; 6[" },
            { question: "c)", attendu: "[1 ; 2[ ∪ ]6 ; 7]" },
          ],
          correction:
            "a) La courbe coupe l'axe horizontal en $x = 2$ et $x = 6$.\nb) Entre les deux, elle est au-dessus de l'axe.\nc) De 1 à 2, et de 6 à 7, elle est en dessous. Les bornes 1 et 7 sont dans le domaine : crochets fermés. Les bornes 2 et 6 donnent 0 : crochets ouverts.\n⛔ Le piège au c) : écrire ]−∞ ; 2[ ∪ ]6 ; +∞[. L'étude s'arrête à l'intervalle donné, [1 ; 7].\nRéponse : a) 2 et 6 ; b) ]2 ; 6[ ; c) [1 ; 2[ ∪ ]6 ; 7].",
          schema: tableauSignes(["1", "2", "6", "7"], [["$B(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce:
            "Un ornithologue suit une population de cigognes, en dizaines de couples, sur 8 années (modèle). $x$ est le rang de l'année, de 0 à 8.\na) Sur quel intervalle la population croît-elle d'abord ?\nb) Sur quel intervalle décroît-elle ?\nc) Sur quel intervalle croît-elle à la fin ?\nd) Quel est le maximum, en couples ?",
          figure: repere([-1, 9, -1, 10], [{ pts: [[0, 3], [3, 8], [5, 4], [8, 7]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "[0 ; 3]" },
            { question: "b)", attendu: "[3 ; 5]" },
            { question: "c)", attendu: "[5 ; 8]" },
            { question: "d)", attendu: "80" },
          ],
          correction:
            "On lit de gauche à droite : la courbe monte, descend, puis remonte.\na) Elle monte de $x = 0$ à $x = 3$.\nb) Elle descend de $x = 3$ à $x = 5$.\nc) Elle remonte de $x = 5$ à $x = 8$.\nd) Le point le plus haut est à la hauteur 8 : $8 \\times 10 = 80$ couples.\n⛔ Le piège au d) : prendre la dernière valeur, 7. Le maximum n'est pas forcément à la fin.\nRéponse : a) [0 ; 3] ; b) [3 ; 5] ; c) [5 ; 8] ; d) 80.",
          schema: tableauVariations(["0", "3", "5", "8"], [3, 8, 4, 7]),
          micros: ["auto_fct_variations_graphique"],
        },
        {
          enonce:
            "Une hydrogéologue suit une nappe d'eau (modèle) : $f(x)$ est son niveau, en mètres, et $x$ le rang du mois, de 0 à 10.\na) Sur quel intervalle le niveau a-t-il baissé ?\nb) Quel est le niveau le plus bas ?\nc) Sur quel intervalle a-t-il monté ?\nd) Résous $f(x) = 5$. Donne les deux nombres.",
          figure: repere([-1, 11, -1, 9], [{ pts: [[0, 8], [4, 2], [10, 8]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "[0 ; 4]" },
            { question: "b)", attendu: "2 m" },
            { question: "c)", attendu: "[4 ; 10]" },
            { question: "d)", attendu: "2 ; 7" },
          ],
          correction:
            "a) La courbe descend jusqu'au point le plus bas, en $x = 4$.\nb) Ce point est à la hauteur 2.\nc) Ensuite, elle monte jusqu'à $x = 10$.\nd) L'horizontale $y = 5$ coupe la courbe en $x = 2$ et en $x = 7$.\n⛔ Le piège au a) : répondre [0 ; 10], du début à la fin. La baisse s'arrête au point le plus bas.\nRéponse : a) [0 ; 4] ; b) 2 m ; c) [4 ; 10] ; d) 2 et 7.",
          schema: tableauVariations(["0", "4", "10"], [8, 2, 8]),
          micros: ["auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "La trésorière d'une association trace le solde du compte (modèle) : $f(x)$ est le solde, en milliers d'euros, et $x$ le rang du mois, sur $[0\\,;\\,8]$.\na) Sur quel intervalle le solde est-il strictement négatif ?\nb) Sur quel ensemble est-il strictement positif ?\nc) Résous $f(x) = 2$. Donne les deux nombres.",
          figure: repere([-1, 9, -3, 4], [{ pts: [[0, 2], [2, -2], [4, -2], [6, 2], [8, 3]] }]),
          reponses: [
            { question: "a)", attendu: "]1 ; 5[" },
            { question: "b)", attendu: "[0 ; 1[ ∪ ]5 ; 8]" },
            { question: "c)", attendu: "0 ; 6" },
          ],
          correction:
            "La courbe coupe l'axe horizontal en $x = 1$ et en $x = 5$.\na) Entre ces deux valeurs, elle est en dessous.\nb) Elle est au-dessus de 0 à 1, et de 5 à 8. Les bornes 0 et 8 sont dans le domaine : crochets fermés.\nc) L'horizontale $y = 2$ touche la courbe en $x = 0$ et en $x = 6$.\n⛔ Le piège au a) : répondre [2 ; 4], le plat tout en bas. Le solde est négatif dès qu'il passe sous l'axe.\nRéponse : a) ]1 ; 5[ ; b) [0 ; 1[ ∪ ]5 ; 8] ; c) 0 et 6.",
          schema: tableauSignes(["0", "1", "5", "8"], [["$f(x)$", ["+", "-", "+"], ["0", "0"]]]),
          micros: ["auto_fct_signe_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          enonce:
            "Un animateur scientifique lance une fusée à eau. Sa hauteur $h(t)$, en mètres, est tracée sur $[0\\,;\\,4]$ (modèle), avec $t$ en secondes.\na) Sur quel intervalle la fusée monte-t-elle ?\nb) Sur quel intervalle descend-elle ?\nc) Quelle est la hauteur maximale ?\nd) À quels instants est-elle à 3 m ? Donne les deux nombres.",
          figure: repere([-1, 5, -1, 5], [{ pts: [[0, 0], [0.5, 1.75], [1, 3], [1.5, 3.75], [2, 4], [2.5, 3.75], [3, 3], [3.5, 1.75], [4, 0]] }]),
          reponses: [
            { question: "a)", attendu: "[0 ; 2]" },
            { question: "b)", attendu: "[2 ; 4]" },
            { question: "c)", attendu: "4 m" },
            { question: "d)", attendu: "1 ; 3" },
          ],
          correction:
            "a) La courbe monte jusqu'au sommet, en $t = 2$.\nb) Elle redescend de $t = 2$ à $t = 4$.\nc) Le sommet est à la hauteur 4.\nd) L'horizontale $y = 3$ coupe la courbe en $t = 1$ et en $t = 3$.\n⛔ Le piège au c) : répondre 2, l'instant du sommet. La hauteur se lit sur l'axe vertical.\nRéponse : a) [0 ; 2] ; b) [2 ; 4] ; c) 4 m ; d) 1 s et 3 s.",
          schema: tableauVariations(["0", "2", "4"], [0, 4, 0], "h", "t"),
          micros: ["auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs lectures sur la même courbe : on traduit chaque phrase avant de lire.",
      rappel: [
        "On traduit : « passe sous 5 » donne $f(x) < 5$ ; « au moins 5 » donne $f(x) \\geqslant 5$ ; « un bénéfice » donne $f(x) > 0$.",
        "Une même courbe se lit avec plusieurs horizontales : à chaque question, on change de hauteur.",
        "On termine par une phrase dans la situation : une durée, un montant, une altitude.",
      ],
      exercices: [
        {
          titre: "L'alerte du barrage",
          enonce:
            "Une technicienne suit une retenue d'eau (modèle) : $f(x)$ est son niveau, en dizaines de mètres, et $x$ le rang du mois, sur $[0\\,;\\,9]$. Une alerte se déclenche quand le niveau passe sous 40 m.\na) Résous $f(x) = 4$. Donne les deux nombres.\nb) Résous $f(x) < 4$.\nc) Combien de mois dure l'alerte ?\nd) Résous $f(x) \\geqslant 6$.\ne) Quelle est la valeur minimale de $f$ ?",
          figure: repere([-1, 10, -1, 9], [{ pts: [[0, 8], [3, 2], [6, 8], [9, 5]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2 ; 4" },
            { question: "b)", attendu: "]2 ; 4[" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "[0 ; 1] ∪ [5 ; 8]" },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "40 m, c'est la hauteur 4 : l'axe compte des dizaines.\na) L'horizontale $y = 4$ coupe la courbe en $x = 2$ et $x = 4$.\nb) Entre les deux, la courbe est en dessous.\nc) $4 - 2 = 2$ mois.\nd) L'horizontale $y = 6$ coupe la courbe en $x = 1$, $x = 5$ et $x = 8$. La courbe est au-dessus de 0 à 1, puis de 5 à 8.\ne) Le point le plus bas est $(3\\,;\\,2)$ : la valeur minimale est 2, soit 20 m.\n⛔ Le piège au d) : oublier le morceau [0 ; 1], au tout début de la courbe.\nRéponse : a) 2 et 4 ; b) ]2 ; 4[ ; c) 2 mois ; d) [0 ; 1] ∪ [5 ; 8] ; e) 2.",
          schema: tableauVariations(["0", "3", "6", "9"], [8, 2, 8, 5]),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_variations_graphique"],
        },
        {
          titre: "Le stand de crêpes",
          enonce:
            "Un crêpier modélise son bénéfice $B(x)$, en centaines d'euros, pour $x$ centaines de crêpes, sur $[0\\,;\\,6]$.\na) Pour quelles valeurs le bénéfice est-il nul ? Donne les deux nombres.\nb) Sur quel intervalle le bénéfice est-il strictement positif ?\nc) Résous $B(x) \\geqslant 3$.\nd) Quel est le bénéfice maximal, en euros ?\ne) Sur quel intervalle le bénéfice est-il croissant ?",
          figure: repere([-1, 7, -6, 6], [{ q: [-1, 6, -5] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "1 ; 5" },
            { question: "b)", attendu: "]1 ; 5[" },
            { question: "c)", attendu: "[2 ; 4]" },
            { question: "d)", attendu: "400 €" },
            { question: "e)", attendu: "[0 ; 3]" },
          ],
          correction:
            "a) La courbe coupe l'axe horizontal en $x = 1$ et $x = 5$.\nb) Entre les deux, elle est au-dessus de l'axe.\nc) L'horizontale $y = 3$ coupe la courbe en $x = 2$ et $x = 4$. Entre les deux, elle est au-dessus. Avec $\\geqslant$, les crochets sont fermés.\nd) Le sommet est à la hauteur 4, pour $x = 3$ : $4 \\times 100 = 400$ €.\ne) La courbe monte de $x = 0$ jusqu'au sommet, en $x = 3$.\n⛔ Le piège au e) : confondre « le bénéfice est positif » (]1 ; 5[) et « le bénéfice augmente » ([0 ; 3]). Une courbe peut monter sous l'axe, et descendre au-dessus.\nRéponse : a) 1 et 5 ; b) ]1 ; 5[ ; c) [2 ; 4] ; d) 400 € ; e) [0 ; 3].",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["0", "1", "5", "6"], [["$B(x)$", ["-", "+", "-"], ["0", "0"]]])}
              {tableauVariations(["0", "3", "6"], [-5, 4, -5], "B")}
            </div>
          ),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_signe_graphique", "auto_fct_variations_graphique"],
        },
        {
          titre: "Le profil de la randonnée",
          enonce:
            "Une accompagnatrice en montagne trace le profil d'une sortie (modèle) : $x$ est la distance en kilomètres, sur $[0\\,;\\,8]$, et $f(x)$ l'altitude en centaines de mètres.\na) Résous $f(x) = 8$. Donne les trois nombres.\nb) Résous $f(x) \\geqslant 8$.\nc) Sur quel intervalle le chemin descend-il ?\nd) De combien de mètres grimpe-t-on en tout ?",
          figure: repere([-1, 9, -1, 13], [{ pts: [[0, 4], [3, 10], [5, 6], [8, 12]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: ["2 ; 4 ; 6", "2, 4 et 6"] },
            { question: "b)", attendu: "[2 ; 4] ∪ [6 ; 8]" },
            { question: "c)", attendu: "[3 ; 5]" },
            { question: "d)", attendu: "1 200 m" },
          ],
          correction:
            "a) L'horizontale $y = 8$ coupe la courbe trois fois : $x = 2$, $x = 4$ et $x = 6$.\nb) La courbe est au-dessus de 2 à 4, puis de 6 à 8.\nc) Elle descend de son premier sommet ($x = 3$) à son creux ($x = 5$).\nd) Première montée : $10 - 4 = 6$. Seconde montée : $12 - 6 = 6$. En tout, $6 + 6 = 12$ graduations, soit $12 \\times 100 = 1\\,200$ m.\n⛔ Le piège au d) : calculer $12 - 4 = 8$, soit 800 m. La descente au milieu oblige à remonter : les deux montées s'additionnent.\nRéponse : a) 2, 4 et 6 ; b) [2 ; 4] ∪ [6 ; 8] ; c) [3 ; 5] ; d) 1 200 m.",
          schema: tableauVariations(["0", "3", "5", "8"], [4, 10, 6, 12]),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_variations_graphique"],
        },
        {
          titre: "La trésorerie du glacier",
          enonce:
            "Un glacier de bord de mer trace sa trésorerie (modèle) : $f(x)$ est la trésorerie, en milliers d'euros, et $x$ le rang du mois, sur $[0\\,;\\,10]$.\na) Pour quelles valeurs la trésorerie est-elle nulle ? Donne les trois nombres.\nb) Sur quel ensemble est-elle strictement positive ?\nc) Résous $f(x) = 2$. Donne les trois nombres.\nd) Sur quel intervalle la trésorerie diminue-t-elle ?\ne) Quel est son maximum, en euros ?",
          figure: repere([-1, 11, -3, 5], [{ pts: [[0, -2], [2, 2], [4, 4], [6, 2], [8, -2], [10, 2]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: ["1 ; 7 ; 9", "1, 7 et 9"] },
            { question: "b)", attendu: "]1 ; 7[ ∪ ]9 ; 10]" },
            { question: "c)", attendu: ["2 ; 6 ; 10", "2, 6 et 10"] },
            { question: "d)", attendu: "[4 ; 8]" },
            { question: "e)", attendu: "4 000 €" },
          ],
          correction:
            "a) La courbe coupe l'axe horizontal en $x = 1$, $x = 7$ et $x = 9$.\nb) Elle est au-dessus de 1 à 7, puis de 9 à 10. Le crochet en 10 est fermé : c'est une borne du domaine, et $f(10) = 2$ est positif.\nc) L'horizontale $y = 2$ touche la courbe en $x = 2$, $x = 6$ et $x = 10$.\nd) La courbe descend de son sommet ($x = 4$) à son creux ($x = 8$).\ne) Le point le plus haut est à la hauteur 4 : $4 \\times 1\\,000 = 4\\,000$ €.\n⛔ Le piège au d) : répondre ]7 ; 9[, là où la trésorerie est négative. Diminuer, ce n'est pas être négatif : elle baisse dès $x = 4$, alors qu'elle est encore positive.\nRéponse : a) 1, 7 et 9 ; b) ]1 ; 7[ ∪ ]9 ; 10] ; c) 2, 6 et 10 ; d) [4 ; 8] ; e) 4 000 €.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["0", "1", "7", "9", "10"], [["$f(x)$", ["-", "+", "-", "+"], ["0", "0", "0"]]])}
              {tableauVariations(["0", "4", "8", "10"], [-2, 4, -2, 2])}
            </div>
          ),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_signe_graphique", "auto_fct_variations_graphique"],
        },
      ],
    },
  ],
};
