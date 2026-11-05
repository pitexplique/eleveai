// ─── Fiche d'exercices : degré 2, racines et signe, forme factorisée (STMG) — 20 exercices
//
// Notion fct_degre2_factorisee du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : annuler chaque facteur (le produit nul ne vaut que pour ZÉRO), le
// signe d'un facteur puis du produit (signe de a à l'extérieur des racines,
// contraire entre elles), et résoudre f(x) > 0 ou f(x) < 0, inégalités strictes
// seulement. Jamais de discriminant : le polynôme est toujours donné factorisé
// ou lu sur une courbe.
//
// ⭐ AUCUNE DONNÉE RÉELLE : toutes les formules sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; froid industriel (frigoriste),
// atelier de vélos (mécanicienne), volley (entraîneur), santé (infirmier), nature
// (ornithologue), trésorerie (trésorière), climat (climatologue), énergie
// (gestionnaire de réseau) ; céramique (potière), piscine (technicienne), drones
// (photographe), correction de copies (professeure).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-2.mjs`.
//
// Micro-compétences : fct_d2_racines_factorisee (1, 2, 3, 4, 9, 10, 11, 12, 14, 15,
// 17, 18, 19, 20), fct_d2_signe_tableau (5, 6, 7, 9, 11, 12, 13, 16, 17, 18, 20),
// fct_d2_inequation (8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes } from "@/lib/fiches-exercices/figures";

// Une réunion s'écrit dans les deux sens ; « ou » est défendable, « et » ne l'est pas.
const reunion = (g: string, d: string) => [`${g} ∪ ${d}`, `${d} ∪ ${g}`, `${g} ou ${d}`];

export const exercicesFctDegre2FactoriseeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-degre2-factorisee",
  titre: "Degré 2 : racines et signe (forme factorisée)",
  accroche:
    "Vingt exercices pour tirer d'une forme factorisée tout ce qu'elle dit : les racines, le signe, et les valeurs où l'entreprise gagne de l'argent. Un atelier de vélos, un match de volley, une piscine, un drone, une copie à corriger. Un rappel de cours avant chaque niveau, une correction étape par étape avec le tableau de signes et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : annuler une parenthèse, lire un signe, ou écrire les solutions.",
      rappel: [
        "Un produit est nul si, et seulement si, l'un de ses facteurs est nul : chaque parenthèse donne une racine. Cette règle ne vaut que pour $0$.",
        "Un facteur $x - r$ est négatif avant $r$, nul en $r$, positif après.",
        "Un polynôme $a(x - x_1)(x - x_2)$ est du signe de $a$ à l'extérieur des racines, et du signe contraire entre elles.",
        "Résoudre $f(x) > 0$, c'est lire les intervalles où $f$ est positive. Les racines sont exclues : les crochets sont ouverts.",
      ],
      exercices: [
        {
          enonce:
            "Quelles sont les racines de $f(x) = (x - 2)(x + 3)$ ? Écris-les séparées par un point-virgule.",
          reponses: [{ attendu: "2 ; -3" }],
          correction:
            "On annule chaque parenthèse.\n$x - 2 = 0$ donne $x = 2$. $x + 3 = 0$ donne $x = -3$.\n⛔ Le piège : lire le nombre de la parenthèse sans changer son signe, et répondre $-2$ et $3$.\nRéponse : $2$ et $-3$.",
          micros: ["fct_d2_racines_factorisee"],
        },
        {
          enonce:
            "Quelles sont les racines de $f(x) = 3(x - 1)(x - 4)$ ? Écris-les séparées par un point-virgule.",
          reponses: [{ attendu: "1 ; 4" }],
          correction:
            "$x - 1 = 0$ donne $x = 1$. $x - 4 = 0$ donne $x = 4$.\nLe coefficient $3$ ne s'annule jamais : il ne donne pas de racine.\n⛔ Le piège : ajouter $3$ à la liste des racines.\nRéponse : $1$ et $4$.",
          micros: ["fct_d2_racines_factorisee"],
        },
        {
          enonce:
            "Quelles sont les racines de $f(x) = -2x(x - 5)$ ? Écris-les séparées par un point-virgule.",
          reponses: [{ attendu: "0 ; 5" }],
          correction:
            "Il y a deux facteurs variables : $x$ et $x - 5$.\n$x = 0$ est la première racine. $x - 5 = 0$ donne $x = 5$.\n⛔ Le piège : oublier la racine $0$, parce que le facteur $x$ n'a pas de parenthèse.\nRéponse : $0$ et $5$.",
          micros: ["fct_d2_racines_factorisee"],
        },
        {
          enonce:
            "Pour résoudre $(x - 1)(x + 2) = 10$, Tom écrit : « $x - 1 = 10$ ou $x + 2 = 10$ ». A-t-il raison ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "La règle du produit nul ne vaut que pour $0$. Un produit peut valoir 10 de bien des façons : $2 \\times 5$, $1 \\times 10$…\nRien n'oblige un facteur à valoir 10. Testons sa valeur $x = 11$ : $(11 - 1)(11 + 2) = 10 \\times 13 = 130$, ce n'est pas 10.\n⛔ Le piège : appliquer la recette sans regarder ce qu'il y a à droite du signe égal.\nRéponse : non.",
          micros: ["fct_d2_racines_factorisee"],
        },
        {
          enonce:
            "Sur $]-\\infty\\,;\\,3[$, quel est le signe du facteur $(x - 3)$ ? Réponds positif ou négatif.",
          reponses: [{ attendu: ["négatif", "négative"] }],
          correction:
            "$x - 3$ s'annule en $3$. Il est négatif avant $3$.\nTest : pour $x = 2$, on a $2 - 3 = -1$, négatif.\n⛔ Le piège : voir « $x$ » et croire que l'expression est positive. On compare à la racine du facteur.\nRéponse : négatif.",
          micros: ["fct_d2_signe_tableau"],
        },
        {
          enonce:
            "La courbe tracée est celle de $f(x) = (x + 1)(x - 3)$. Sur $]-1\\,;\\,3[$, quel est le signe de $f(x)$ ? Réponds positif ou négatif.",
          figure: repere([-3, 5, -5, 4], [{ q: [1, -2, -3] }]),
          reponses: [{ attendu: ["négatif", "négative"] }],
          correction:
            "Entre $-1$ et $3$, la courbe est sous l'axe des abscisses : $f(x)$ est négatif.\nCela confirme la règle : $a = 1$ est positif, et entre les racines le signe est contraire à celui de $a$.\n⛔ Le piège : croire que la parabole tournée vers le haut est partout positive.\nRéponse : négatif.",
          micros: ["fct_d2_signe_tableau"],
        },
        {
          enonce:
            "Soit $f(x) = -2(x - 1)(x - 5)$. Sur $]1\\,;\\,5[$, quel est le signe de $f(x)$ ? Réponds positif ou négatif.",
          reponses: [{ attendu: ["positif", "positive"] }],
          correction:
            "$a = -2$ est négatif. Entre les racines, le signe est contraire à celui de $a$ : $f(x)$ est positif.\nLe tableau de signes le confirme.\n⛔ Le piège : répondre « négatif » à cause du $-2$. Le signe de $a$ vaut à l'extérieur des racines, pas entre elles.\nRéponse : positif.",
          schema: tableauSignes(["−∞", "1", "5", "+∞"], [
            ["$-2$", ["-", "-", "-"], ["", ""]],
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 5$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["fct_d2_signe_tableau"],
        },
        {
          enonce:
            "Résous l'inéquation $(x - 1)(x - 4) < 0$. Écris l'intervalle des solutions, par exemple $]2 ; 3[$.",
          reponses: [{ attendu: "]1 ; 4[" }],
          correction:
            "Les racines sont $1$ et $4$, et $a = 1$ est positif.\nDonc l'expression est négative entre les racines.\nLes crochets sont ouverts : en $1$ et en $4$, l'expression vaut $0$, ce qui n'est pas négatif.\n⛔ Le piège : prendre l'extérieur des racines, valable pour « > 0 ».\nRéponse : $]1\\,;\\,4[$.",
          schema: tableauSignes(["−∞", "1", "4", "+∞"], [
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 4$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["fct_d2_inequation"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à traduire : les racines, le signe, puis l'inéquation.",
      rappel: [
        "Le tableau de signes : une ligne par facteur, une dernière ligne pour le produit. On multiplie les signes de chaque colonne.",
        "« Bénéficiaire » veut dire $B(x) > 0$. « Au-dessus » veut dire que la courbe est au-dessus de l'axe.",
        "Quand les solutions sont à l'extérieur des racines, on réunit deux intervalles avec le signe $\\cup$ : tape ∪ ou la lettre U.",
      ],
      exercices: [
        {
          enonce:
            "Adèle, frigoriste, règle une chambre froide (modèle). L'écart à la consigne, en °C, selon la température de réglage $t$ en °C, est $E(t) = (t + 2)(t - 3)$.\na) Quelles sont les racines ? Écris-les séparées par un point-virgule.\nb) Entre ces deux racines, quel est le signe de $E(t)$ ? Réponds positif ou négatif.\nc) Résous $E(t) > 0$.",
          reponses: [
            { question: "a)", attendu: "-2 ; 3" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: reunion("]-∞ ; -2[", "]3 ; +∞[") },
          ],
          correction:
            "a) $t + 2 = 0$ donne $t = -2$. $t - 3 = 0$ donne $t = 3$.\nb) Sur la colonne du milieu, les signes sont $+$ et $-$ : le produit est négatif.\nc) $E(t)$ est positif dans les deux colonnes extérieures : c'est la réunion des deux intervalles.\n⛔ Le piège au c) : n'écrire qu'un seul intervalle, $]3\\,;\\,+\\infty[$. Il y a deux zones positives.\nRéponse : a) $-2$ et $3$ ; b) négatif ; c) $]-\\infty\\,;\\,-2[ \\cup ]3\\,;\\,+\\infty[$.",
          schema: tableauSignes(["−∞", "−2", "3", "+∞"], [
            ["$t + 2$", ["-", "+", "+"], ["0", ""]],
            ["$t - 3$", ["-", "-", "+"], ["", "0"]],
            ["$E(t)$", ["+", "-", "+"], ["0", "0"]],
          ], "t"),
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
        {
          enonce:
            "Zoé, mécanicienne, tient un atelier de vélos. La courbe donne son bénéfice (modèle), en centaines d'euros, pour $x$ dizaines de vélos réparés : $B(x) = -(x - 2)(x - 7)$.\na) Quelles sont les racines ? Écris-les séparées par un point-virgule.\nb) Pour quelles valeurs de $x$ l'atelier est-il bénéficiaire ? Écris l'intervalle.\nc) Pour $x = 8$, l'atelier est-il bénéficiaire ? Réponds oui ou non.",
          figure: repere([-1, 9, -3, 8], [{ q: [-1, 9, -14] }]),
          reponses: [
            { question: "a)", attendu: "2 ; 7" },
            { question: "b)", attendu: "]2 ; 7[" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $x - 2 = 0$ donne $2$, et $x - 7 = 0$ donne $7$.\nb) Bénéficiaire veut dire $B(x) > 0$. La courbe est au-dessus de l'axe entre les racines : $]2\\,;\\,7[$.\nc) $8$ est après la racine $7$. $B(8) = -6 \\times 1 = -6$, négatif : non.\n⛔ Le piège au c) : penser que réparer plus de vélos rapporte toujours plus. Le modèle dit le contraire au-delà de 7.\nRéponse : a) $2$ et $7$ ; b) $]2\\,;\\,7[$ ; c) non.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_inequation"],
        },
        {
          enonce:
            "Valentin, entraîneur de volley, modélise la hauteur d'un ballon au-dessus du filet, en mètres, à la distance $x$ du serveur, en mètres : $h(x) = -0{,}5(x - 1)(x - 7)$.\na) Quelles sont les racines ? Écris-les séparées par un point-virgule.\nb) Sur quel intervalle le ballon est-il au-dessus de la hauteur du filet ?\nc) Après la plus grande racine, quel est le signe de $h(x)$ ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "1 ; 7" },
            { question: "b)", attendu: "]1 ; 7[" },
            { question: "c)", attendu: ["négatif", "négative"] },
          ],
          correction:
            "a) Les parenthèses s'annulent en $1$ et en $7$.\nb) « Au-dessus » veut dire $h(x) > 0$. $a = -0{,}5$ est négatif, donc $h(x)$ est positif entre les racines.\nc) À l'extérieur des racines, le signe est celui de $a$ : négatif.\n⛔ Le piège au b) : lire « signe de $a$ » partout. Entre les racines, c'est le signe contraire.\nRéponse : a) $1$ et $7$ ; b) $]1\\,;\\,7[$ ; c) négatif.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
        {
          enonce:
            "Émile, infirmier, suit un patient (modèle). L'écart à une valeur normale, $t$ heures après un soin, est $E(t) = (t - 1)(t - 5)$.\na) À quels instants l'écart est-il nul ? Écris-les séparés par un point-virgule.\nb) Sur quel intervalle l'écart est-il négatif ?\nc) Pour $t = 6$, quel est le signe de l'écart ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "1 ; 5" },
            { question: "b)", attendu: "]1 ; 5[" },
            { question: "c)", attendu: ["positif", "positive"] },
          ],
          correction:
            "a) L'écart s'annule quand une parenthèse s'annule : $t = 1$ et $t = 5$.\nb) $a = 1$ est positif, donc l'écart est négatif entre les racines.\nc) $E(6) = 5 \\times 1 = 5$, positif.\n⛔ Le piège au b) : donner l'extérieur des racines. Avec $a > 0$, c'est là que l'expression est positive.\nRéponse : a) 1 et 5 ; b) $]1\\,;\\,5[$ ; c) positif.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
        {
          enonce:
            "Pour un observatoire d'oiseaux, Inaya, ornithologue, modélise la variation d'une population, en centaines d'oiseaux, selon $x$, l'écart de température à la normale en °C : $f(x) = -(x + 4)(x - 2)$. Sur $]-\\infty\\,;\\,-4[$, quel est le signe :\na) du facteur $(x + 4)$ ?\nb) du facteur $(x - 2)$ ?\nc) du produit $f(x)$, sans oublier le signe moins devant ?\nRéponds à chaque fois positif ou négatif.",
          reponses: [
            { question: "a)", attendu: ["négatif", "négative"] },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: ["négatif", "négative"] },
          ],
          correction:
            "On prend une valeur test, $x = -5$.\na) $-5 + 4 = -1$ : négatif.\nb) $-5 - 2 = -7$ : négatif.\nc) Trois signes négatifs : le $-1$ de devant et les deux facteurs. Le produit de trois négatifs est négatif.\nVérification : $f(-5) = -(-1)(-7) = -7$.\n⛔ Le piège au c) : oublier le signe moins devant et répondre positif.\nRéponse : a) négatif ; b) négatif ; c) négatif.",
          schema: tableauSignes(["−∞", "−4", "2", "+∞"], [
            ["$-1$", ["-", "-", "-"], ["", ""]],
            ["$x + 4$", ["-", "+", "+"], ["0", ""]],
            ["$x - 2$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["fct_d2_signe_tableau"],
        },
        {
          enonce:
            "Fatou, trésorière d'une association, modélise l'écart de trésorerie, en centaines d'euros, au mois $x$ : $T(x) = 2x(x - 6)$ (modèle).\na) Quelles sont les racines ? Écris-les séparées par un point-virgule.\nb) Résous $T(x) < 0$.",
          reponses: [
            { question: "a)", attendu: "0 ; 6" },
            { question: "b)", attendu: "]0 ; 6[" },
          ],
          correction:
            "a) $x = 0$ annule le facteur $x$, et $x - 6 = 0$ donne $x = 6$.\nb) $a = 2$ est positif : $T(x)$ est négatif entre les racines.\nTest : $T(1) = 2 \\times 1 \\times (-5) = -10$, négatif.\n⛔ Le piège : compter le $2$ comme une racine. Il ne s'annule pas.\nRéponse : a) $0$ et $6$ ; b) $]0\\,;\\,6[$.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_inequation"],
        },
        {
          enonce:
            "Paolo, climatologue, trace un écart de température $f(x)$, en °C, selon $x$, le mois compté à partir d'un mois de référence (modèle). Il a perdu son expression, mais il a sa courbe.\na) Lis les racines. Écris-les séparées par un point-virgule.\nb) Résous $f(x) > 0$.\nc) Quelle expression correspond à la courbe ? Écris la lettre.\nA : $f(x) = 0{,}5(x - 1)(x + 4)$\nB : $f(x) = 0{,}5(x + 1)(x - 4)$\nC : $f(x) = -0{,}5(x + 1)(x - 4)$",
          figure: repere([-3, 6, -5, 5], [{ q: [0.5, -1.5, -2] }]),
          reponses: [
            { question: "a)", attendu: "-1 ; 4" },
            { question: "b)", attendu: reunion("]-∞ ; -1[", "]4 ; +∞[") },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) La courbe coupe l'axe des abscisses en $-1$ et en $4$.\nb) La courbe est au-dessus de l'axe à l'extérieur des racines : deux intervalles.\nc) Les racines $-1$ et $4$ donnent $(x + 1)$ et $(x - 4)$ : A ne convient pas. La parabole est tournée vers le haut, donc $a > 0$ : C ne convient pas.\n⛔ Le piège au b) : donner l'intervalle entre les racines, où la courbe est sous l'axe.\nRéponse : a) $-1$ et $4$ ; b) $]-\\infty\\,;\\,-1[ \\cup ]4\\,;\\,+\\infty[$ ; c) B.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_inequation"],
        },
        {
          enonce:
            "Lucie gère un réseau d'énergie. Elle compare deux soldes d'énergie (modèle), en MWh, à l'heure $x$ : $S(x) = 3(x - 1)(x - 2)$ et $R(x) = -3(x - 1)(x - 2)$.\na) Quel est le signe de $S(1{,}5)$ ? Réponds positif ou négatif.\nb) Quel est le signe de $R(1{,}5)$ ? Réponds positif ou négatif.\nc) Résous $R(x) > 0$.",
          reponses: [
            { question: "a)", attendu: ["négatif", "négative"] },
            { question: "b)", attendu: ["positif", "positive"] },
            { question: "c)", attendu: "]1 ; 2[" },
          ],
          correction:
            "a) $S(1{,}5) = 3 \\times 0{,}5 \\times (-0{,}5) = -0{,}75$ : négatif.\nb) $R(1{,}5)$ est l'opposé : $0{,}75$, positif.\nc) $a = -3$ est négatif, donc $R(x)$ est positif entre les racines $1$ et $2$.\n⛔ Le piège au c) : croire que le changement de $a$ change les racines. Il échange seulement les signes.\nRéponse : a) négatif ; b) positif ; c) $]1\\,;\\,2[$.",
          micros: ["fct_d2_signe_tableau", "fct_d2_inequation"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la phrase, trouver les racines, le signe, puis conclure.",
      rappel: [
        "On traduit d'abord la phrase : « bénéficiaire », « au-dessus », « conforme » deviennent une inéquation.",
        "Les seuils de rentabilité sont les racines : le bénéfice y vaut $0$.",
        "On vérifie avec une valeur test : on calcule une image dans l'intervalle trouvé.",
      ],
      exercices: [
        {
          titre: "L'atelier de céramique",
          enonce:
            "Rose, potière, modélise son bénéfice, en euros, pour $x$ bols vendus : $B(x) = -2(x - 10)(x - 50)$.\na) Quels sont les deux seuils de rentabilité ? Écris-les séparés par un point-virgule.\nb) Pour quelles quantités l'atelier est-il bénéficiaire ? Écris l'intervalle.\nc) Calcule $B(5)$.\nd) Calcule $B(30)$.",
          reponses: [
            { question: "a)", attendu: "10 ; 50" },
            { question: "b)", attendu: "]10 ; 50[" },
            { question: "c)", attendu: "-450" },
            { question: "d)", attendu: "800" },
          ],
          correction:
            "a) Le bénéfice s'annule quand une parenthèse s'annule : $x = 10$ et $x = 50$.\nb) $a = -2$ est négatif : $B(x)$ est positif entre les racines.\nc) $B(5) = -2 \\times (-5) \\times (-45) = -450$ : avant 10 bols, les charges ne sont pas couvertes.\nd) $B(30) = -2 \\times 20 \\times (-20) = 800$ : $30$ est bien dans l'intervalle, le bénéfice est positif.\n⛔ Le piège au c) : compter deux signes moins. Il y en a trois : le $-2$ et les deux parenthèses.\nRéponse : a) $10$ et $50$ ; b) $]10\\,;\\,50[$ ; c) $-450$ ; d) $800$.",
          schema: tableauSignes(["−∞", "10", "50", "+∞"], [
            ["$-2$", ["-", "-", "-"], ["", ""]],
            ["$x - 10$", ["-", "+", "+"], ["0", ""]],
            ["$x - 50$", ["-", "-", "+"], ["", "0"]],
            ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
        {
          titre: "L'eau de la piscine",
          enonce:
            "Ambre, technicienne de piscine, modélise un écart à la norme de l'eau, $t$ heures après l'ouverture : $E(t) = (t - 2)(t - 10)$ (modèle). L'eau est conforme quand cet écart est négatif.\na) À quelles heures l'écart est-il nul ? Écris-les séparées par un point-virgule.\nb) Sur quel intervalle l'eau est-elle conforme ?\nc) Pendant combien d'heures l'eau reste-t-elle conforme ?\nd) Pour $t = 12$, quel est le signe de l'écart ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "2 ; 10" },
            { question: "b)", attendu: "]2 ; 10[" },
            { question: "c)", attendu: "8 h" },
            { question: "d)", attendu: ["positif", "positive"] },
          ],
          correction:
            "a) Les parenthèses s'annulent en $t = 2$ et en $t = 10$.\nb) « Conforme » veut dire $E(t) < 0$. $a = 1$ est positif, donc l'écart est négatif entre les racines.\nc) $10 - 2 = 8$ heures.\nd) $E(12) = 10 \\times 2 = 20$ : positif, l'eau n'est plus conforme.\n⛔ Le piège au b) : croire que conforme veut dire positif. Ici, l'énoncé dit l'inverse : on relit toujours la phrase.\nRéponse : a) 2 et 10 ; b) $]2\\,;\\,10[$ ; c) 8 h ; d) positif.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
        {
          titre: "Les deux drones",
          enonce:
            "Nolan, photographe, fait voler deux drones au-dessus d'un champ (modèle). Leur hauteur au-dessus de la cime des arbres, en mètres, selon la distance $x$ en centaines de mètres, est $D(x) = -(x - 1)(x - 9)$ pour le premier et $G(x) = -(x - 3)(x - 7)$ pour le second.\na) Sur quel intervalle le premier est-il au-dessus des arbres ?\nb) Sur quel intervalle le second est-il au-dessus des arbres ?\nc) Sur quel intervalle sont-ils tous les deux au-dessus ?\nd) Quelle est la longueur de cet intervalle ?",
          reponses: [
            { question: "a)", attendu: "]1 ; 9[" },
            { question: "b)", attendu: "]3 ; 7[" },
            { question: "c)", attendu: "]3 ; 7[" },
            { question: "d)", attendu: "4" },
          ],
          correction:
            "a) $a = -1$ est négatif : $D(x) > 0$ entre les racines $1$ et $9$.\nb) De même, $G(x) > 0$ entre les racines $3$ et $7$.\nc) Il faut être dans les deux intervalles : $]3\\,;\\,7[$ est tout entier dans $]1\\,;\\,9[$.\nd) $7 - 3 = 4$.\n⛔ Le piège au c) : réunir les deux intervalles. « Tous les deux » veut dire dans l'un ET dans l'autre.\nRéponse : a) $]1\\,;\\,9[$ ; b) $]3\\,;\\,7[$ ; c) $]3\\,;\\,7[$ ; d) $4$.",
          micros: ["fct_d2_racines_factorisee", "fct_d2_inequation"],
        },
        {
          titre: "La copie à corriger",
          enonce:
            "Madame Roche, professeure, corrige une copie. Pour résoudre $(x - 2)(x + 5) > 0$, l'élève a écrit : $S = ]-5\\,;\\,2[$.\na) Quelles sont les racines ? Écris-les séparées par un point-virgule.\nb) Calcule l'image de $0$ par l'expression.\nc) $0$ est dans l'intervalle de l'élève. Est-il solution de l'inéquation ? Réponds oui ou non.\nd) Écris le bon ensemble de solutions.",
          reponses: [
            { question: "a)", attendu: "2 ; -5" },
            { question: "b)", attendu: "-10" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: reunion("]-∞ ; -5[", "]2 ; +∞[") },
          ],
          correction:
            "a) $x - 2 = 0$ donne $2$, et $x + 5 = 0$ donne $-5$.\nb) $(0 - 2)(0 + 5) = -2 \\times 5 = -10$.\nc) $-10$ n'est pas positif : $0$ n'est pas solution. L'intervalle de l'élève est donc faux.\nd) $a = 1$ est positif : l'expression est positive à l'extérieur des racines.\n⛔ Le piège : retenir « entre les racines » sans regarder le signe de $a$ ni celui demandé.\nRéponse : a) $2$ et $-5$ ; b) $-10$ ; c) non ; d) $]-\\infty\\,;\\,-5[ \\cup ]2\\,;\\,+\\infty[$.",
          schema: tableauSignes(["−∞", "−5", "2", "+∞"], [
            ["$x + 5$", ["-", "+", "+"], ["0", ""]],
            ["$x - 2$", ["-", "-", "+"], ["", "0"]],
            ["produit", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["fct_d2_racines_factorisee", "fct_d2_signe_tableau", "fct_d2_inequation"],
        },
      ],
    },
  ],
};
