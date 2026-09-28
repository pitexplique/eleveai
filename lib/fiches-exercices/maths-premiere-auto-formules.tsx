// ─── Fiche d'exercices : utiliser une formule (1re, automatismes) ─────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (épreuve anticipée, première partie,
// SANS CALCULATRICE), sur le modèle de l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-algebre.bank.ts`.
// Trois questions des sujets de juin 2026 : la valeur de $2x^2 - 3x - 4$ pour
// $x = -1$ (Centres étrangers, exercice 1), $R = \dfrac{U^2}{P}$ avec $U = 20$
// et $P = 80$ (Antilles, exercice 4), et le geste d'isoler une lettre dans une
// formule à plusieurs lettres (Centres étrangers, exercices 5 et 8).
//
// ⭐⭐ LE FIL : UNE FORMULE SE LIT DANS LES DEUX SENS. Du prix HT au prix TTC,
// puis du TTC au HT ; de la distance au temps ; de la densité à la population.
// Isoler la lettre cherchée AVANT de remplacer évite les pièges : les exercices
// 9 et 14 sont bâtis sur « retirer 20 % du prix TTC » et « ajouter 20 % au
// net », deux erreurs qu'une formule bien retournée empêche.
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (tableaux de valeurs, diagrammes, une droite dans un repère)
// et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (TVA, salaire brut et net,
// intérêts, coût moyen, échelle d'une carte, natalité, densité de population).
// Les chiffres sont des MODÈLES arrondis, jamais présentés comme des données
// officielles (seuls les taux de TVA de 10 % et 20 % sont les taux français).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-formules.mjs`.
//
// Micro-compétences : auto_alg_litteral (1, 2, 3, 7, 8, 16, 17),
// auto_alg_isoler_variable (5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20),
// auto_alg_application_formule (4, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
// 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

export const exercicesAutoFormulesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-formules",
  titre: "Utiliser une formule",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer la valeur d'une expression, isoler une lettre dans une formule, faire une application numérique. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Remplacer une lettre par un nombre : on écrit le nombre ENTRE PARENTHÈSES, surtout s'il est négatif.",
        "Priorités : les puissances d'abord, puis $\\times$ et $\\div$, puis $+$ et $-$. Ainsi $(-1)^2 = 1$, mais $-1^2 = -1$.",
        "Isoler une lettre : on fait la même opération des deux côtés. Ce qui MULTIPLIE la lettre passe de l'autre côté en DIVISANT, et inversement.",
      ],
      exercices: [
        {
          enonce: "Calculer la valeur de l'expression $2x^2 - 3x - 4$ pour $x = -1$.",
          correction:
            "On remplace $x$ par $(-1)$, entre parenthèses : $2 \\times (-1)^2 - 3 \\times (-1) - 4$.\nLa puissance d'abord : $(-1)^2 = 1$, donc $2 \\times 1 = 2$.\nLe produit ensuite : $-3 \\times (-1) = +3$.\nLa somme enfin : $2 + 3 - 4 = 1$.\nL'expression vaut $1$.\n⚠️ Sans parenthèses, on écrit $2 \\times -1^2$, et l'erreur de signe arrive.\n⭐ C'est la question du sujet des Centres étrangers, en juin 2026.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "Calculer la valeur de $-x^2 + 5x$ pour $x = -2$.",
          correction:
            "On remplace : $-(-2)^2 + 5 \\times (-2)$.\nLa puissance d'abord : $(-2)^2 = 4$. Le signe moins devant s'applique APRÈS : $-(-2)^2 = -4$.\nLe produit : $5 \\times (-2) = -10$.\nLa somme : $-4 - 10 = -14$.\n⚠️ Le piège : écrire $-(-2)^2 = +4$. Dans $-x^2$, on élève au carré, PUIS on prend l'opposé.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "On donne $a = -3$ et $b = 5$. Calculer $a - b$, $a \\times b$, $-a + 2b$ et $a^2 - b^2$.",
          correction:
            "$a - b = -3 - 5 = -8$.\n$a \\times b = (-3) \\times 5 = -15$ : un négatif fois un positif donne un négatif.\n$-a + 2b = -(-3) + 2 \\times 5 = 3 + 10 = 13$ : l'opposé de $-3$ est $3$.\n$a^2 - b^2 = (-3)^2 - 5^2 = 9 - 25 = -16$.\n⚠️ $-a$ n'est pas forcément négatif : si $a$ est négatif, $-a$ est positif.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "La résistance d'un appareil est donnée par $R = \\dfrac{U^2}{P}$, où $U$ est la tension en volts et $P$ la puissance en watts. Calculer $R$ pour $U = 20$ et $P = 80$.",
          correction:
            "On remplace chaque lettre par sa valeur : $R = \\dfrac{20^2}{80}$.\nLe carré d'abord : $20^2 = 20 \\times 20 = 400$.\nLa division ensuite : $\\dfrac{400}{80} = 5$.\nLa résistance vaut $5$ ohms.\n⚠️ $20^2$ veut dire $20 \\times 20$, et non $20 \\times 2$.\n⭐ C'est la question du sujet des Antilles, en juin 2026.",
          micros: ["auto_alg_application_formule"],
        },
        {
          enonce: "La puissance électrique vérifie $P = U \\times I$. Isoler $I$, puis vérifier avec $P = 60$ et $U = 12$.",
          correction:
            "Dans $P = U \\times I$, la lettre $I$ est MULTIPLIÉE par $U$.\nOn divise les deux côtés par $U$ : $\\dfrac{P}{U} = I$.\nDonc $I = \\dfrac{P}{U}$.\nVérification : $I = \\dfrac{60}{12} = 5$, et $12 \\times 5 = 60$. ✔️\n⚠️ Le piège : écrire $I = \\dfrac{U}{P}$. On divise PAR ce qui multipliait $I$, c'est-à-dire par $U$.",
          micros: ["auto_alg_isoler_variable"],
        },
        {
          enonce: "La distance parcourue vérifie $d = v \\times t$. Isoler $t$, puis calculer la durée d'un trajet de $150$ km à $60$ km/h.",
          correction:
            "$t$ est multiplié par $v$ : on divise les deux côtés par $v$. Donc $t = \\dfrac{d}{v}$.\nApplication : $t = \\dfrac{150}{60} = 2{,}5$ heures.\n$0{,}5$ heure, c'est une demi-heure, donc $30$ minutes : le trajet dure $2$ h $30$ min.\n⚠️ $2{,}5$ h ne veut PAS dire $2$ h $50$ : une heure compte $60$ minutes, pas $100$.",
          schema: tableau(["durée", "1 h", "2 h", "2 h 30"], ["distance (km)", 60, 120, 150]),
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          enonce: "Écrire $\\dfrac{x}{3} + \\dfrac{x}{6}$ sous la forme d'une seule fraction, la plus simple possible.",
          correction:
            "On met au même dénominateur, $6$ : $\\dfrac{x}{3} = \\dfrac{2x}{6}$.\nDonc $\\dfrac{2x}{6} + \\dfrac{x}{6} = \\dfrac{3x}{6}$.\nOn simplifie par $3$ : $\\dfrac{3x}{6} = \\dfrac{x}{2}$.\n✔️ Vérification avec $x = 6$ : $\\dfrac{6}{3} + \\dfrac{6}{6} = 2 + 1 = 3$, et $\\dfrac{6}{2} = 3$.\n⚠️ Le piège : additionner les dénominateurs, $\\dfrac{2x}{9}$. On n'additionne JAMAIS les dénominateurs.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "On a $y = 3x - 6$. Exprimer $x$ en fonction de $y$.",
          correction:
            "On veut $x$ seul. D'abord, on ajoute $6$ des deux côtés : $y + 6 = 3x$.\nEnsuite, $x$ est multiplié par $3$ : on divise les deux côtés par $3$.\nDonc $x = \\dfrac{y + 6}{3}$.\n✔️ Vérification : pour $x = 4$, $y = 12 - 6 = 6$, et $\\dfrac{6 + 6}{3} = 4$.\n⚠️ Le piège : $x = \\dfrac{y}{3} + 6$. On retire ce qui est « le plus loin » de $x$ en premier : le $-6$, puis le $\\times 3$.",
          micros: ["auto_alg_isoler_variable", "auto_alg_litteral"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Repérer ce que l'on connaît et ce que l'on cherche, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Une formule relie des grandeurs. On repère ce que l'on CONNAÎT et ce que l'on CHERCHE.",
        "Si la grandeur cherchée n'est pas seule, on l'isole d'abord, puis on remplace.",
        "On contrôle l'unité et l'ordre de grandeur : un prix HT est plus petit que le prix TTC, un salaire net plus petit que le brut.",
      ],
      exercices: [
        {
          titre: "Hors taxes, toutes taxes",
          enonce:
            "En France, avec une TVA à $20$ %, le prix TTC (toutes taxes comprises) s'obtient à partir du prix HT (hors taxes) par $P_{TTC} = 1{,}2 \\times P_{HT}$.\na) Un casque coûte $50$ € HT. Quel est son prix TTC ?\nb) Isoler $P_{HT}$ dans la formule.\nc) Un vélo coûte $90$ € TTC. Quel est son prix HT ?",
          correction:
            "a) $P_{TTC} = 1{,}2 \\times 50 = 60$ €.\nb) $P_{HT}$ est multiplié par $1{,}2$ : on divise par $1{,}2$. Donc $P_{HT} = \\dfrac{P_{TTC}}{1{,}2}$.\nc) $P_{HT} = \\dfrac{90}{1{,}2} = \\dfrac{900}{12} = 75$ €.\n✔️ Vérification : $1{,}2 \\times 75 = 90$.\n⚠️ Le piège : retirer $20$ % de $90$, ce qui donne $72$ €. Faux : les $20$ % se calculent sur le prix HT, pas sur le TTC.",
          schema: tableau(["prix HT (€)", "50", "75", "100"], ["prix TTC (€)", 60, 90, 120]),
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "La météo en Fahrenheit",
          enonce:
            "Aux États-Unis, les températures s'expriment en degrés Fahrenheit (°F). La formule $F = 1{,}8 \\times C + 32$ convertit une température $C$ en degrés Celsius en degrés Fahrenheit.\na) Convertir $20$ °C, $0$ °C et $-10$ °C.\nb) Isoler $C$ dans la formule.\nc) Un bulletin météo annonce $50$ °F. Fait-il chaud ?",
          correction:
            "a) $1{,}8 \\times 20 + 32 = 36 + 32 = 68$ °F.\n$1{,}8 \\times 0 + 32 = 32$ °F : l'eau gèle à $32$ °F.\n$1{,}8 \\times (-10) + 32 = -18 + 32 = 14$ °F.\nb) D'abord on retire $32$ : $F - 32 = 1{,}8 \\times C$. Puis on divise par $1{,}8$ : $C = \\dfrac{F - 32}{1{,}8}$.\nc) $C = \\dfrac{50 - 32}{1{,}8} = \\dfrac{18}{1{,}8} = 10$ °C. Il fait frais.\n⚠️ Le piège : diviser $50$ par $1{,}8$ avant de retirer $32$. On défait les opérations dans l'ordre INVERSE.",
          schema: tableau(["°C", "−10", "0", "10", "20"], ["°F", 14, 32, 50, 68]),
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "La vitesse d'un train",
          enonce:
            "Un train relie deux villes distantes de $450$ km en $2$ h $30$ min.\na) Calculer sa vitesse moyenne avec $v = \\dfrac{d}{t}$.\nb) À cette vitesse, combien de temps faut-il pour parcourir $540$ km ?",
          correction:
            "a) On convertit la durée en heures : $2$ h $30$ min $= 2{,}5$ h.\n$v = \\dfrac{450}{2{,}5} = \\dfrac{4\\,500}{25} = 180$ km/h.\n⚠️ Le piège : écrire $2{,}30$ h. Trente minutes, c'est une DEMI-heure, donc $0{,}5$ h.\nb) On isole $t$ : $v = \\dfrac{d}{t}$ donne $t = \\dfrac{d}{v}$.\n$t = \\dfrac{540}{180} = 3$ heures.",
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "Le taux de natalité",
          enonce:
            "Le taux de natalité d'une ville, en naissances pour mille habitants, est $n = \\dfrac{N}{P} \\times 1\\,000$, où $N$ est le nombre de naissances dans l'année et $P$ la population (chiffres de modèle).\na) Une ville de $50\\,000$ habitants compte $600$ naissances. Calculer $n$.\nb) Isoler $N$ dans la formule.\nc) Une ville de $80\\,000$ habitants a un taux de natalité de $10$ pour mille. Combien de naissances y a-t-il eu ?",
          correction:
            "a) $n = \\dfrac{600}{50\\,000} \\times 1\\,000 = \\dfrac{600\\,000}{50\\,000} = 12$ naissances pour mille habitants.\nb) On multiplie par $P$, puis on divise par $1\\,000$ : $N = \\dfrac{n \\times P}{1\\,000}$.\nc) $N = \\dfrac{10 \\times 80\\,000}{1\\,000} = \\dfrac{800\\,000}{1\\,000} = 800$ naissances.\n⭐ Un taux « pour mille » permet de comparer des villes de tailles différentes : c'est l'outil des démographes.",
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "Les intérêts simples",
          enonce:
            "Un capital $C$ placé à intérêts simples au taux annuel $t$ rapporte, en $n$ années, $I = C \\times t \\times n$ euros.\na) Calculer $I$ pour $C = 2\\,000$ €, $t = 0{,}03$ (soit $3$ %) et $n = 4$ ans.\nb) Isoler $n$ dans la formule.\nc) Combien d'années faut-il pour que ces $2\\,000$ € rapportent $300$ € ?",
          correction:
            "a) Par an : $2\\,000 \\times 0{,}03 = 60$ €. En $4$ ans : $I = 60 \\times 4 = 240$ €.\nb) $n$ est multiplié par $C \\times t$ : on divise par $C \\times t$. Donc $n = \\dfrac{I}{C \\times t}$.\nc) $n = \\dfrac{300}{2\\,000 \\times 0{,}03} = \\dfrac{300}{60} = 5$ ans.\n⭐ Intérêts SIMPLES : on gagne la même somme chaque année, $60$ €. Les barres montent d'un pas régulier.",
          schema: diagramme("barres", [
            { label: "1 an", value: 60 },
            { label: "2 ans", value: 120 },
            { label: "3 ans", value: 180 },
            { label: "4 ans", value: 240 },
            { label: "5 ans", value: 300 },
          ]),
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "Salaire brut, salaire net",
          enonce:
            "Dans un modèle simplifié (le vrai taux dépend du contrat), le salaire net vaut $N = 0{,}8 \\times B$, où $B$ est le salaire brut.\na) Calculer le net pour un brut de $2\\,000$ €.\nb) Isoler $B$ dans la formule.\nc) Une offre d'emploi annonce $2\\,400$ € net. Quel est le brut ?",
          correction:
            "a) $N = 0{,}8 \\times 2\\,000 = 1\\,600$ €.\nb) $B$ est multiplié par $0{,}8$ : on divise par $0{,}8$. Donc $B = \\dfrac{N}{0{,}8}$.\nc) $B = \\dfrac{2\\,400}{0{,}8} = \\dfrac{24\\,000}{8} = 3\\,000$ €.\nLes cotisations valent $3\\,000 - 2\\,400 = 600$ €.\n⚠️ Le piège : ajouter $20$ % au net, $2\\,400 + 480 = 2\\,880$ €. Faux : les $20$ % se prennent sur le BRUT.",
          schema: diagramme("barres", [
            { label: "Brut", value: 3000 },
            { label: "Net", value: 2400 },
            { label: "Cotisations", value: 600 },
          ]),
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "L'échelle d'une carte",
          enonce:
            "Sur une carte de randonnée au $\\dfrac{1}{25\\,000}$, une distance réelle $D$ et sa mesure $d$ sur la carte vérifient $D = 25\\,000 \\times d$ (dans la même unité).\na) Deux refuges sont à $4$ cm l'un de l'autre sur la carte. Quelle est la distance réelle, en km ?\nb) Isoler $d$.\nc) Un sentier fait $3$ km. Quelle longueur mesure-t-il sur la carte ?",
          correction:
            "a) $D = 25\\,000 \\times 4 = 100\\,000$ cm.\nOn convertit : $100\\,000$ cm $= 1\\,000$ m $= 1$ km.\nb) $d$ est multiplié par $25\\,000$ : $d = \\dfrac{D}{25\\,000}$.\nc) D'abord la même unité : $3$ km $= 300\\,000$ cm.\n$d = \\dfrac{300\\,000}{25\\,000} = 12$ cm.\n⚠️ Le piège des unités : $\\dfrac{3}{25\\,000}$ ne veut rien dire en cm. On convertit AVANT de remplacer.",
          schema: tableau(["carte (cm)", "1", "4", "12"], ["réalité (km)", "0,25", "1", "3"]),
          micros: ["auto_alg_application_formule", "auto_alg_isoler_variable"],
        },
        {
          titre: "Le coût moyen",
          enonce:
            "Une entreprise fabrique $q$ objets. Son coût total est $C = 5q + 200$ euros : $5$ € de matière par objet, et $200$ € de frais fixes.\na) Le coût moyen d'un objet est $M = \\dfrac{C}{q}$. Montrer que $M = 5 + \\dfrac{200}{q}$.\nb) Calculer $M$ pour $q = 50$, $q = 100$ et $q = 200$.\nc) Que devient le coût moyen quand on produit beaucoup ?",
          correction:
            "a) $M = \\dfrac{5q + 200}{q} = \\dfrac{5q}{q} + \\dfrac{200}{q} = 5 + \\dfrac{200}{q}$.\n⚠️ On divise CHAQUE terme du numérateur par $q$ ; on ne « barre » pas le $q$ de $5q$ tout seul.\nb) $q = 50$ : $5 + \\dfrac{200}{50} = 5 + 4 = 9$ €.\n$q = 100$ : $5 + 2 = 7$ €. $q = 200$ : $5 + 1 = 6$ €.\nc) $\\dfrac{200}{q}$ devient de plus en plus petit : le coût moyen se rapproche de $5$ €.\n⭐ Les frais fixes se partagent entre plus d'objets : ce sont les économies d'échelle.",
          schema: diagramme("barres", [
            { label: "50 objets", value: 9 },
            { label: "100 objets", value: 7 },
            { label: "200 objets", value: 6 },
          ]),
          micros: ["auto_alg_litteral", "auto_alg_application_formule"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On écrit la formule, on isole la grandeur cherchée, on remplace, on calcule, on conclut avec l'unité.",
        "Une vérification rapide : on remet le résultat dans la formule de départ.",
      ],
      exercices: [
        {
          titre: "Qui paie le plus de TVA ?",
          enonce:
            "En France, la TVA est à $10$ % au restaurant et à $20$ % pour la plupart des achats. Avec un taux $t$ (en écriture décimale), $P_{TTC} = P_{HT} \\times (1 + t)$.\na) Vérifier que, pour $t = 0{,}2$, on retrouve $P_{TTC} = 1{,}2 \\times P_{HT}$.\nb) Isoler $P_{HT}$.\nc) Une addition au restaurant s'élève à $44$ € TTC. Calculer le prix HT, puis la TVA payée.\nd) Un pull coûte $36$ € TTC. Même question.\ne) Lequel des deux achats rapporte le plus de TVA à l'État ?",
          correction:
            "a) $1 + 0{,}2 = 1{,}2$ : on retrouve bien $P_{TTC} = 1{,}2 \\times P_{HT}$.\nb) $P_{HT}$ est multiplié par $(1 + t)$ : $P_{HT} = \\dfrac{P_{TTC}}{1 + t}$.\nc) $t = 0{,}1$ : $P_{HT} = \\dfrac{44}{1{,}1} = \\dfrac{440}{11} = 40$ €. La TVA vaut $44 - 40 = 4$ €.\nd) $t = 0{,}2$ : $P_{HT} = \\dfrac{36}{1{,}2} = \\dfrac{360}{12} = 30$ €. La TVA vaut $36 - 30 = 6$ €.\ne) Le pull, pourtant moins cher, rapporte plus de TVA : $6$ € contre $4$ €.\n⭐ Ce n'est pas le prix qui décide, c'est le prix ET le taux. Sur le diagramme, chaque prix HT est suivi de sa TVA.\n⚠️ $10$ % de $44$ € ferait $4{,}40$ € : faux, la TVA se calcule sur le HT.",
          schema: diagramme("barres", [
            { label: "Resto", value: 40 },
            { label: "TVA", value: 4 },
            { label: "Pull", value: 30 },
            { label: "TVA", value: 6 },
          ]),
          micros: ["auto_alg_litteral", "auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          titre: "La vitesse moyenne d'une livraison",
          enonce:
            "Un camion livre un magasin à $120$ km de son entrepôt. À l'aller, chargé, il roule à $40$ km/h de moyenne ; au retour, à vide, à $60$ km/h.\na) Dans $v = \\dfrac{d}{t}$, isoler $t$.\nb) Calculer la durée de l'aller, puis celle du retour.\nc) Calculer la vitesse moyenne sur l'aller-retour.\nd) Pourquoi n'est-ce pas $50$ km/h, la moyenne de $40$ et $60$ ?",
          correction:
            "a) On multiplie par $t$, puis on divise par $v$ : $t = \\dfrac{d}{v}$.\nb) Aller : $t = \\dfrac{120}{40} = 3$ h. Retour : $t = \\dfrac{120}{60} = 2$ h.\nc) Distance totale : $240$ km. Durée totale : $3 + 2 = 5$ h.\n$v = \\dfrac{240}{5} = 48$ km/h.\nd) Le camion passe PLUS DE TEMPS à $40$ km/h ($3$ h) qu'à $60$ km/h ($2$ h) : la vitesse lente pèse plus lourd.\n⚠️ Une vitesse moyenne ne se calcule jamais en faisant la moyenne des vitesses : on repart TOUJOURS de $\\dfrac{\\text{distance totale}}{\\text{durée totale}}$.",
          schema: tableau(["trajet", "aller", "retour", "total"], ["durée (h)", 3, 2, 5]),
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          titre: "Le prix d'une course en taxi",
          enonce:
            "Un taxi applique un tarif de modèle : $2$ € de prise en charge, puis $1$ € par kilomètre. Pour $d$ km, le prix est $P = 2 + d$ euros. La droite ci-dessous représente ce prix.\na) Combien coûte une course de $7$ km ?\nb) Isoler $d$ dans la formule.\nc) Avec $12$ €, combien de kilomètres peut-on parcourir ?\nd) Lire sur le graphique la distance parcourue pour $8$ €, puis la vérifier par le calcul.",
          figure: repere([-1, 11, -2, 13], [{ q: [0, 1, 2] }], [], undefined, true),
          correction:
            "a) $P = 2 + 7 = 9$ €.\nb) On retire $2$ des deux côtés : $d = P - 2$.\nc) $d = 12 - 2 = 10$ km.\nd) Sur le graphique : on part de $8$ sur l'axe vertical, on va jusqu'à la droite, on descend. On lit $6$ km.\nPar le calcul : $d = 8 - 2 = 6$ km. ✔️\n⭐ Isoler $d$, c'est lire le graphique « à l'envers » : du prix vers la distance.\n⚠️ Le prix n'est PAS proportionnel à la distance : $10$ km coûtent $12$ €, pas le double de $5$ km ($7$ €).",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          titre: "Trois pays, trois densités",
          enonce:
            "La densité de population est $d = \\dfrac{N}{S}$, en habitants par km², où $N$ est le nombre d'habitants et $S$ la surface en km². Trois pays (chiffres de modèle) :\n· pays $A$ : $12$ millions d'habitants sur $300\\,000$ km² ;\n· pays $B$ : une densité de $120$ habitants par km² sur $500\\,000$ km² ;\n· pays $C$ : $18$ millions d'habitants et une densité de $90$ habitants par km².\na) Calculer la densité du pays $A$.\nb) Isoler $N$, puis calculer la population du pays $B$.\nc) Isoler $S$, puis calculer la surface du pays $C$.\nd) Ranger les trois pays par densité croissante.",
          correction:
            "a) $d = \\dfrac{12\\,000\\,000}{300\\,000} = \\dfrac{120}{3} = 40$ habitants par km².\nb) On multiplie par $S$ : $N = d \\times S = 120 \\times 500\\,000 = 60\\,000\\,000$, soit $60$ millions d'habitants.\nc) $S$ est au dénominateur : on multiplie par $S$ ($d \\times S = N$), puis on divise par $d$ : $S = \\dfrac{N}{d}$.\n$S = \\dfrac{18\\,000\\,000}{90} = 200\\,000$ km².\nd) $A$ ($40$) $<$ $C$ ($90$) $<$ $B$ ($120$).\n⚠️ Le piège : $S = \\dfrac{d}{N}$. Un pays de $200\\,000$ km² est plausible ; un pays de $0{,}000005$ km² ne l'est pas. L'ordre de grandeur trahit l'erreur.",
          schema: diagramme("barres", [
            { label: "A", value: 40 },
            { label: "B", value: 120 },
            { label: "C", value: 90 },
          ]),
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
      ],
    },
  ],
};
