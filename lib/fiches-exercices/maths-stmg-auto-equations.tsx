// ─── Fiche d'exercices : équations et inéquations (STMG) — 20 exercices ────────
//
// Notion auto_equations du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts`). Le coach
// demande : résoudre $ax + b = cx + d$, mettre en équation deux offres, résoudre
// une inéquation du premier degré (le sens se retourne quand on divise par un
// négatif), $x^2 = a$ avec $a$ un carré (deux solutions opposées) ou $a < 0$
// (aucune), l'équation produit nul, et voir que cette règle ne vaut que pour
// ZÉRO. Pas de discriminant, pas de racine non entière : la feuille non plus.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; escalade (gérant de salle),
// irrigation (technicienne), une règle à appliquer (ex. 11), photographie de
// mariage (photographe), maçonnerie (maçon), spéléologie (spéléologue), brasserie
// (brasseuse), une copie à corriger (ex. 16) ; énergie (conseiller), logistique
// (logisticienne), météo de montagne (prévisionniste), urbanisme (agente municipale).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-1.mjs`.
//
// Micro-compétences : auto_alg_equation_premier_degre (1, 2, 3, 9, 17, 19),
// auto_alg_inequation (4, 5, 10, 11, 12, 17, 18, 19), auto_alg_equation_carre
// (6, 7, 13, 14, 20), auto_alg_produit_nul (8, 15, 16, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

/** « x ≤ 5 » : les deux sens, le clavier ordinaire, et l'intervalle. */
const inferieurOuEgal = (a: string): string[] => [`x ≤ ${a}`, `x <= ${a}`, `${a} ≥ x`, `${a} >= x`, `]-∞ ; ${a}]`];
const superieurOuEgal = (a: string): string[] => [`x ≥ ${a}`, `x >= ${a}`, `${a} ≤ x`, `${a} <= x`, `[${a} ; +∞[`];
const inferieur = (a: string): string[] => [`x < ${a}`, `${a} > x`, `]-∞ ; ${a}[`];
const superieur = (a: string): string[] => [`x > ${a}`, `${a} < x`, `]${a} ; +∞[`];

export const exercicesAutoEquationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-equations",
  titre: "Équations et inéquations",
  accroche:
    "Vingt exercices pour résoudre sans hésiter : une équation du premier degré, une inéquation dont le sens se retourne, x² = a et ses deux solutions, une équation produit nul. Une salle d'escalade, une cuve d'irrigation, une dalle de maçon, une grotte, un contrat d'électricité, un monte-charge, la température en montagne. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : résoudre. Quand il y a deux solutions, sépare-les par un point-virgule.",
      rappel: [
        "Équation du premier degré : on rassemble les $x$ d'un côté, les nombres de l'autre, puis on divise par le coefficient de $x$.",
        "Inéquation : même méthode. Mais diviser par un nombre NÉGATIF retourne le sens du symbole.",
        "$x^2 = a$ : deux solutions opposées si $a > 0$ ($\\sqrt{a}$ et $-\\sqrt{a}$), aucune si $a < 0$. Un carré n'est jamais négatif.",
        "Un produit est nul si l'un au moins de ses facteurs est nul : on annule chaque facteur.",
      ],
      exercices: [
        {
          enonce: "Résous l'équation : $3x + 4 = 19$.",
          reponses: [{ attendu: "5" }],
          correction:
            "On enlève $4$ des deux côtés : $3x = 15$.\nOn divise par $3$ : $x = 15 \\div 3 = 5$.\nVérification : $3 \\times 5 + 4 = 19$. ✔\n⛔ Le piège : ajouter $4$ au lieu de l'enlever, et trouver $3x = 23$.\nRéponse : $x = 5$.",
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce: "Résous l'équation : $7x - 2 = 4x + 16$.",
          reponses: [{ attendu: "6" }],
          correction:
            "On rassemble les $x$ à gauche : $7x - 4x - 2 = 16$, soit $3x - 2 = 16$.\nOn rassemble les nombres à droite : $3x = 18$.\nOn divise par $3$ : $x = 6$.\nVérification : $7 \\times 6 - 2 = 40$ et $4 \\times 6 + 16 = 40$. ✔\n⛔ Le piège : écrire $3x = 14$ en oubliant que $-2$ devient $+2$ de l'autre côté.\nRéponse : $x = 6$.",
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce: "Résous l'équation : $5x + 9 = 2x - 6$.",
          reponses: [{ attendu: "-5" }],
          correction:
            "Les $x$ à gauche : $3x + 9 = -6$.\nLes nombres à droite : $3x = -6 - 9 = -15$.\nOn divise par $3$ : $x = -5$.\nVérification : $5 \\times (-5) + 9 = -16$ et $2 \\times (-5) - 6 = -16$. ✔\n⛔ Le piège : écrire $-6 - 9 = 3$ ou $-3$. Deux nombres négatifs s'ajoutent : $-15$.\nRéponse : $x = -5$.",
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce: "Résous l'inéquation : $2x - 3 \\leqslant 7$. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$",
          reponses: [{ attendu: inferieurOuEgal("5") }],
          correction:
            "On ajoute $3$ des deux côtés : $2x \\leqslant 10$.\nOn divise par $2$, un nombre POSITIF : le sens ne change pas.\n$x \\leqslant 5$.\n⛔ Le piège : retourner le symbole sans raison. Il ne se retourne que si l'on divise par un négatif.\nRéponse : $x \\leqslant 5$.",
          micros: ["auto_alg_inequation"],
        },
        {
          enonce: "Résous l'inéquation : $-3x + 2 \\geqslant 14$. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$",
          reponses: [{ attendu: inferieurOuEgal("-4") }],
          correction:
            "On enlève $2$ des deux côtés : $-3x \\geqslant 12$.\nOn divise par $-3$, un nombre NÉGATIF : le sens se retourne.\n$x \\leqslant -4$.\nVérification avec $x = -5$ : $-3 \\times (-5) + 2 = 17$, et $17 \\geqslant 14$. ✔\n⛔ Le piège : écrire $x \\geqslant -4$. C'est la faute la plus fréquente du chapitre.\nRéponse : $x \\leqslant -4$.",
          micros: ["auto_alg_inequation"],
        },
        {
          enonce: "Résous l'équation : $x^2 = 81$. Écris les deux solutions, séparées par un point-virgule.",
          reponses: [{ attendu: "9 ; -9" }],
          correction:
            "On cherche les nombres dont le carré vaut $81$.\n$9^2 = 81$ et $(-9)^2 = 81$.\n⛔ Le piège : donner seulement $9$. Le nombre négatif convient aussi.\nRéponse : $9$ et $-9$.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce: "Combien l'équation $x^2 = -16$ a-t-elle de solutions ? Écris le nombre de solutions.",
          reponses: [{ attendu: ["0", "aucune", "aucune solution", "pas de solution"] }],
          correction:
            "Un carré est toujours positif ou nul.\n$4^2 = 16$ et $(-4)^2 = 16$ : on n'obtient jamais $-16$.\nL'équation a donc $0$ solution.\n⛔ Le piège : répondre $x = -4$, en transportant le signe moins dans la solution.\nRéponse : 0 solution.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce: "Résous l'équation : $(x - 3)(x + 7) = 0$. Écris les deux solutions, séparées par un point-virgule.",
          reponses: [{ attendu: "3 ; -7" }],
          correction:
            "Un produit est nul si l'un de ses facteurs est nul.\n$x - 3 = 0$ donne $x = 3$.\n$x + 7 = 0$ donne $x = -7$.\n⛔ Le piège : lire le nombre dans la parenthèse sans changer son signe, et répondre $-3$ et $7$.\nRéponse : $3$ et $-7$.",
          micros: ["auto_alg_produit_nul"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : écrire l'équation ou l'inéquation, la résoudre, puis répondre à la question posée.",
      rappel: [
        "Mettre en équation : on écrit la même grandeur de deux façons, puis on écrit qu'elles sont égales.",
        "Multiplier ou diviser par un nombre négatif retourne le symbole : $-2x > -8$ donne $x < 4$.",
        "Dans un problème, une solution doit avoir du sens : une longueur ou une durée n'est pas négative.",
        "La règle du produit nul ne vaut que si le produit est ÉGAL À ZÉRO : un produit égal à $12$ ne dit rien sur chaque facteur.",
      ],
      exercices: [
        {
          enonce:
            "Le gérant d'une salle d'escalade propose deux formules (modèle), données dans le tableau.\na) Écris le coût de la formule A au bout de $x$ mois.\nb) Au bout de combien de mois les deux formules coûtent-elles la même chose ?\nc) Combien coûtent-elles alors ?",
          figure: grille(["Formule", "Inscription", "Par mois"], [
            ["A", "30 €", "12 €"],
            ["B", "90 €", "7 €"],
          ]),
          reponses: [
            { question: "a)", attendu: "30 + 12x" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "174 €" },
          ],
          correction:
            "a) Inscription + mensualité × nombre de mois : $30 + 12x$.\nb) La formule B coûte $90 + 7x$. On écrit l'égalité : $30 + 12x = 90 + 7x$.\nOn rassemble : $12x - 7x = 90 - 30$, soit $5x = 60$, donc $x = 12$.\nc) $30 + 12 \\times 12 = 174$ €. Vérification : $90 + 7 \\times 12 = 174$. ✔\n⛔ Le piège au b) : comparer seulement les inscriptions ou seulement les mensualités. Il faut le coût total.\nRéponse : a) $30 + 12x$ ; b) 12 mois ; c) 174 €.",
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce:
            "Une technicienne surveille une cuve d'irrigation de $900$ litres qui perd $30$ litres par heure (modèle). La cuve doit garder au moins $300$ litres.\na) Écris le contenu de la cuve au bout de $x$ heures.\nb) Écris l'inéquation « la cuve garde au moins $300$ litres », puis résous-la. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$",
          reponses: [
            { question: "a)", attendu: "900 - 30x" },
            { question: "b)", attendu: inferieurOuEgal("20") },
          ],
          correction:
            "a) On part de $900$ et on retire $30$ par heure : $900 - 30x$.\nb) L'inéquation est $900 - 30x \\geqslant 300$.\nOn enlève $900$ des deux côtés : $-30x \\geqslant -600$.\nOn divise par $-30$, un nombre négatif : le sens se retourne, $x \\leqslant 20$.\nLa cuve tient au plus $20$ heures.\n⛔ Le piège au b) : garder le sens et écrire $x \\geqslant 20$. Cela voudrait dire que la cuve est assez pleine seulement après $20$ heures, ce qui n'a pas de sens.\nRéponse : a) $900 - 30x$ ; b) $x \\leqslant 20$.",
          micros: ["auto_alg_inequation"],
        },
        {
          enonce:
            "En résolvant deux inéquations, Amina arrive à deux étapes. Elle divise chaque fois par le coefficient de $x$.\na) $-4x > -28$. Qu'obtient-elle ? Écris le résultat sous la forme $x > \\dots$ ou $x < \\dots$\nb) $-5x < 35$. Qu'obtient-elle ?",
          reponses: [
            { question: "a)", attendu: inferieur("7") },
            { question: "b)", attendu: superieur("-7") },
          ],
          correction:
            "a) On divise par $-4$ : $-28 \\div (-4) = 7$, et le sens se retourne : $x < 7$.\nb) On divise par $-5$ : $35 \\div (-5) = -7$, et le sens se retourne : $x > -7$.\n⛔ Le piège au a) : écrire $x < -7$. Le quotient de deux nombres négatifs est positif.\nRéponse : a) $x < 7$ ; b) $x > -7$.",
          micros: ["auto_alg_inequation"],
        },
        {
          enonce:
            "Un photographe de mariage facture $400$ € de forfait, puis $50$ € par heure (modèle). On note $x$ le nombre d'heures. Un couple dispose de $900$ € au plus.\na) Résous $400 + 50x \\leqslant 900$. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$\nb) Le couple peut-il réserver $11$ heures ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: inferieurOuEgal("10") },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) On enlève $400$ : $50x \\leqslant 500$.\nOn divise par $50$, un nombre positif : le sens ne change pas, $x \\leqslant 10$.\nb) $11$ est plus grand que $10$ : c'est non.\nVérification : $400 + 50 \\times 11 = 950$, et $950$ € dépasse $900$ €. ✔\n⛔ Le piège au a) : diviser $900$ par $50$ sans retirer le forfait d'abord.\nRéponse : a) $x \\leqslant 10$ ; b) non.",
          micros: ["auto_alg_inequation"],
        },
        {
          enonce:
            "Un maçon coule une dalle carrée de $144$ mètres carrés. On note $x$ son côté, en mètres : $x^2 = 144$.\na) Donne les deux solutions de cette équation, séparées par un point-virgule.\nb) Laquelle est le côté de la dalle ? Donne sa valeur.",
          reponses: [
            { question: "a)", attendu: "12 ; -12" },
            { question: "b)", attendu: "12 m" },
          ],
          correction:
            "a) $12^2 = 144$ et $(-12)^2 = 144$ : les solutions sont $12$ et $-12$.\nb) Une longueur n'est pas négative : on garde $12$ mètres.\n⛔ Le piège au a) : diviser par 2 et trouver $72$. Le carré n'est pas le double.\nRéponse : a) $12$ et $-12$ ; b) 12 m.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce:
            "Une spéléologue lâche un caillou dans un puits de $125$ mètres de profondeur. On prend le modèle $d = 5t^2$ : la distance de chute $d$ en mètres, au bout de $t$ secondes.\na) Écris l'équation sous la forme $t^2 = \\dots$ Donne la valeur de $t^2$.\nb) Donne les deux solutions de cette équation, séparées par un point-virgule.\nc) Au bout de combien de secondes le caillou touche-t-il le fond ?",
          reponses: [
            { question: "a)", attendu: ["25", "t² = 25", "t^2 = 25"] },
            { question: "b)", attendu: "5 ; -5" },
            { question: "c)", attendu: "5 s" },
          ],
          correction:
            "a) $5t^2 = 125$. On divise par $5$ : $t^2 = 25$.\nb) $5^2 = 25$ et $(-5)^2 = 25$ : les solutions sont $5$ et $-5$.\nc) Une durée n'est pas négative : le caillou touche le fond au bout de $5$ secondes.\n⛔ Le piège au c) : répondre $25$ en oubliant le carré. $25$ est la valeur de $t^2$, pas celle de $t$.\nRéponse : a) 25 ; b) $5$ et $-5$ ; c) 5 s.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce:
            "Une brasseuse modélise son résultat par $B(x) = (x - 20)(60 - x)$, en euros, où $x$ est le nombre d'hectolitres vendus (modèle).\na) Résous $B(x) = 0$. Écris les deux solutions, séparées par un point-virgule.\nb) Calcule $B(40)$.",
          reponses: [
            { question: "a)", attendu: "20 ; 60" },
            { question: "b)", attendu: "400 €" },
          ],
          correction:
            "a) Un produit est nul si l'un de ses facteurs est nul.\n$x - 20 = 0$ donne $x = 20$. $60 - x = 0$ donne $x = 60$.\nb) $B(40) = (40 - 20)(60 - 40) = 20 \\times 20 = 400$.\n⛔ Le piège au a) : répondre $-60$ pour le second facteur. Il faut résoudre $60 - x = 0$, pas recopier le nombre.\nRéponse : a) $20$ et $60$ ; b) 400 €.",
          micros: ["auto_alg_produit_nul"],
        },
        {
          enonce:
            "Pour résoudre $(x - 1)(x - 3) = 8$, Théo écrit : « $x - 1 = 8$ ou $x - 3 = 8$ ». Il trouve notamment $x = 9$.\na) Calcule $(x - 1)(x - 3)$ pour $x = 9$.\nb) $9$ est-il solution ? Réponds oui ou non.\nc) Calcule $(x - 1)(x - 3)$ pour $x = 5$.\nd) $5$ est-il solution ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $(9 - 1)(9 - 3) = 8 \\times 6 = 48$.\nb) $48$ n'est pas égal à $8$ : non.\nc) $(5 - 1)(5 - 3) = 4 \\times 2 = 8$.\nd) On trouve bien $8$ : oui.\nAucun des deux facteurs ne vaut $8$ quand $x = 5$ : ils valent $4$ et $2$.\n⛔ Le piège : appliquer la règle du produit nul à un produit qui ne vaut pas zéro. Elle n'est vraie que pour zéro.\nRéponse : a) 48 ; b) non ; c) 8 ; d) oui.",
          micros: ["auto_alg_produit_nul"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la situation, résoudre, puis revenir à la question.",
      rappel: [
        "Une équation répond à « quand est-ce égal ? », une inéquation à « jusqu'à quand ? » ou « à partir de quand ? ».",
        "Une inéquation se résout comme une équation, avec une seule règle en plus : le sens se retourne si l'on divise par un négatif.",
        "$x^2 = a$ et le produit nul donnent deux solutions : on garde celle qui a du sens.",
      ],
      exercices: [
        {
          titre: "Le contrat d'électricité",
          enonce:
            "Un conseiller en énergie compare deux contrats annuels (modèle), donnés dans le tableau.\na) Écris le coût du contrat A pour $x$ kWh.\nb) Pour combien de kWh les deux contrats coûtent-ils la même chose ?\nc) Écris l'inéquation « A coûte moins que B ou autant », puis résous-la. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$\nd) Un foyer consomme $3\\,000$ kWh. Quel contrat doit-il choisir ? Écris A ou B.",
          figure: grille(["Contrat", "Abonnement", "Par kWh"], [
            ["A", "120 €", "0,20 €"],
            ["B", "180 €", "0,15 €"],
          ]),
          reponses: [
            { question: "a)", attendu: "120 + 0,2x" },
            { question: "b)", attendu: "1 200 kWh" },
            { question: "c)", attendu: inferieurOuEgal("1200") },
            { question: "d)", attendu: ["B", "contrat B", "le contrat B"] },
          ],
          correction:
            "a) Abonnement + prix du kWh × nombre de kWh : $120 + 0{,}2x$.\nb) $120 + 0{,}20x = 180 + 0{,}15x$ donne $0{,}05x = 60$, donc $x = 60 \\div 0{,}05 = 1\\,200$.\nc) L'inéquation est $120 + 0{,}20x \\leqslant 180 + 0{,}15x$. Le même calcul donne $0{,}05x \\leqslant 60$. On divise par $0{,}05$, un nombre positif : $x \\leqslant 1\\,200$.\nd) $3\\,000$ dépasse $1\\,200$ : le contrat B est le moins cher.\nVérification : A coûte $120 + 0{,}2 \\times 3\\,000 = 720$ € et B coûte $180 + 0{,}15 \\times 3\\,000 = 630$ €. ✔\n⛔ Le piège au d) : choisir A parce que son abonnement est plus bas. Au-delà de $1\\,200$ kWh, c'est le prix du kWh qui décide.\nRéponse : a) $120 + 0{,}2x$ ; b) 1 200 kWh ; c) $x \\leqslant 1\\,200$ ; d) B.",
          micros: ["auto_alg_equation_premier_degre", "auto_alg_inequation"],
        },
        {
          titre: "Le monte-charge",
          enonce:
            "Une logisticienne utilise un monte-charge limité à $1\\,480$ kg (modèle). L'opérateur pèse $80$ kg et chaque caisse $35$ kg. On note $x$ le nombre de caisses d'un voyage.\na) Résous $80 + 35x \\leqslant 1\\,480$. Écris le résultat sous la forme $x \\leqslant \\dots$ ou $x \\geqslant \\dots$\nb) Elle doit monter $100$ caisses. Combien de voyages faut-il au minimum ?\nc) Combien de caisses reste-t-il pour le dernier voyage ?",
          reponses: [
            { question: "a)", attendu: inferieurOuEgal("40") },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "a) On enlève $80$ : $35x \\leqslant 1\\,400$. On divise par $35$ : $x \\leqslant 40$.\nAu plus $40$ caisses par voyage.\nb) Deux voyages montent $2 \\times 40 = 80$ caisses : ce n'est pas assez. Il en faut $3$.\nc) $100 - 80 = 20$ caisses au dernier voyage.\n⛔ Le piège au a) : oublier l'opérateur, et diviser $1\\,480$ par $35$. Lui aussi pèse sur le monte-charge.\nRéponse : a) $x \\leqslant 40$ ; b) 3 voyages ; c) 20 caisses.",
          micros: ["auto_alg_inequation"],
        },
        {
          titre: "La température en montagne",
          enonce:
            "Une prévisionniste prend un modèle simple : au sol, il fait $15$ °C, et la température baisse de $6$ °C par kilomètre d'altitude. À $x$ kilomètres, elle vaut $15 - 6x$.\na) Quelle est la température à $2$ km d'altitude ?\nb) À quelle altitude, en km, fait-il $0$ °C ?\nc) Résous $15 - 6x < -9$. Écris le résultat sous la forme $x > \\dots$ ou $x < \\dots$",
          reponses: [
            { question: "a)", attendu: ["3", "3 °C", "3 °"] },
            { question: "b)", attendu: "2,5 km" },
            { question: "c)", attendu: superieur("4") },
          ],
          correction:
            "a) $15 - 6 \\times 2 = 3$ °C.\nb) $15 - 6x = 0$ donne $6x = 15$, donc $x = 15 \\div 6 = 2{,}5$ km.\nc) On enlève $15$ : $-6x < -24$.\nOn divise par $-6$, un nombre négatif : le sens se retourne, $x > 4$.\nAu-dessus de $4$ km, il fait moins de $-9$ °C.\nVérification : à $5$ km, $15 - 30 = -15$, et $-15 < -9$. ✔\n⛔ Le piège au c) : écrire $x < 4$. Plus on monte, plus il fait froid : les grandes altitudes doivent convenir.\nRéponse : a) 3 °C ; b) 2,5 km ; c) $x > 4$.",
          micros: ["auto_alg_equation_premier_degre", "auto_alg_inequation"],
        },
        {
          titre: "La place du marché de Noël",
          enonce:
            "Une agente municipale prépare une place carrée de $225$ mètres carrés (modèle). On note $x$ son côté : $x^2 = 225$. Cette équation s'écrit aussi $(x - 15)(x + 15) = 0$.\na) Résous $(x - 15)(x + 15) = 0$. Écris les deux solutions, séparées par un point-virgule.\nb) Ces deux nombres sont-ils solutions de $x^2 = 225$ ? Réponds oui ou non.\nc) Quel est le côté de la place ?\nd) Elle pose une barrière tout autour, à $12$ € le mètre. Quel est le coût de la barrière ?",
          reponses: [
            { question: "a)", attendu: "15 ; -15" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "15 m" },
            { question: "d)", attendu: "720 €" },
          ],
          correction:
            "a) $x - 15 = 0$ donne $x = 15$ ; $x + 15 = 0$ donne $x = -15$.\nb) $15^2 = 225$ et $(-15)^2 = 225$ : oui, on retrouve les deux solutions de $x^2 = 225$.\nc) Une longueur n'est pas négative : le côté mesure $15$ m.\nd) Le tour de la place : $4 \\times 15 = 60$ m. Le coût : $60 \\times 12 = 720$ €.\n⛔ Le piège au d) : multiplier l'aire par $12$. La barrière suit le tour de la place, pas sa surface.\nRéponse : a) $15$ et $-15$ ; b) oui ; c) 15 m ; d) 720 €.",
          micros: ["auto_alg_equation_carre", "auto_alg_produit_nul"],
        },
      ],
    },
  ],
};
