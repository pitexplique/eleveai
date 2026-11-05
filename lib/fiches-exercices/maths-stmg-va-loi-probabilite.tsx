// ─── Fiche d'exercices : variable aléatoire, loi de probabilité (STMG) — 20 exercices ─
//
// Notion va_loi_probabilite du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// ne définit jamais une variable aléatoire comme une application : on la fait
// fonctionner en situation. Il demande : traduire « au moins », « au plus »,
// « plus de », « moins de » en écritures P(X ⩽ a)…, additionner des colonnes,
// passer par le contraire, dresser une loi depuis des effectifs ou une
// composition (en regroupant les lots de même montant), compléter une case,
// juger un tableau. Rien de plus.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives (le mot « modèle » figure dans l'énoncé quand il y a une situation chiffrée).
//
// Domaines et métiers : médecine vétérinaire (vétérinaire), bibliothèque de
// quartier (lecteurs), ascenseurs (ascensoriste), covoiturage (conductrice),
// météo (météorologue), tir à l'arc (archère), élevage (éleveuse), sécurité
// (gardien de nuit), santé dentaire (dentiste), théâtre amateur (trésorière),
// marché de Noël (commerçant), rail (contrôleuse), librairie (libraire), climat
// (climatologue), informatique (stagiaire développeur), escalade (monitrice),
// vélos en libre-service (technicienne), rugby (président de club), apiculture
// (apicultrice), cinéma (programmatrice).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Micro-compétences : va_ecritures (1, 2, 12, 13), va_calculer_probabilites
// (3, 4, 5, 10, 11, 12, 14, 17, 18, 19, 20), va_dresser_loi (8, 9, 10, 11, 16, 17,
// 18, 20), va_somme_un (6, 7, 9, 14, 15, 16, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesVaLoiProbabiliteStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-loi-probabilite",
  titre: "Variable aléatoire : loi de probabilité",
  accroche:
    "Vingt exercices pour lire et construire la loi d'une variable aléatoire : traduire « au moins » et « au plus » en écritures, additionner les bonnes colonnes, passer par le contraire, dresser une loi, trouver la case manquante, repérer un tableau impossible. Une tombola de rugby, des ruches, des trains en retard, une salle de cinéma, un mur d'escalade. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire une écriture, additionner des colonnes, ou trouver une case.",
      rappel: [
        "$X$ est un nombre qui dépend du hasard. Sa loi donne chaque valeur et sa probabilité.",
        "$P(X \\leqslant a)$ : « au plus $a$ », et $P(X \\geqslant a)$ : « au moins $a$ » gardent $a$. $P(X < a)$ : « moins de $a$ », et $P(X > a)$ : « plus de $a$ » l'excluent.",
        "Pour un évènement qui regroupe plusieurs valeurs, on additionne leurs probabilités. Le contraire : $P(X > a) = 1 - P(X \\leqslant a)$.",
        "La somme de toutes les probabilités d'une loi vaut $1$. Avec des effectifs : probabilité = effectif ÷ total.",
      ],
      exercices: [
        {
          enonce:
            "Une vétérinaire reçoit de $0$ à $4$ chiens par heure. On note $X$ ce nombre de chiens. Quelles valeurs de $X$ réalisent l'évènement $X \\leqslant 2$ ? Écris-les en les séparant par « ; ».",
          reponses: [{ attendu: "0 ; 1 ; 2" }],
          correction:
            "Le signe $\\leqslant$ veut dire « inférieur ou égal » : c'est « au plus $2$ ».\nOn garde $2$ et tout ce qui est en dessous : $0$, $1$ et $2$.\n⛔ Le piège : oublier le $2$. Avec « au plus », la valeur $2$ fait partie de l'évènement.\nRéponse : 0 ; 1 ; 2.",
          micros: ["va_ecritures"],
        },
        {
          enonce:
            "Dans une bibliothèque de quartier, on choisit un lecteur au hasard. $X$ est le nombre de livres qu'il emprunte. On cherche la probabilité qu'il emprunte au moins $3$ livres. Quelle écriture convient ? Écris sa lettre.\nA : $P(X < 3)$\nB : $P(X > 3)$\nC : $P(X \\geqslant 3)$\nD : $P(X \\leqslant 3)$",
          reponses: [{ attendu: "C" }],
          correction:
            "« Au moins $3$ », c'est $3$ ou plus : le $3$ est dedans.\nLe signe qui garde le $3$ et va vers le haut est $\\geqslant$.\n⛔ Le piège : choisir B. $P(X > 3)$ veut dire « plus de $3$ » et laisse le $3$ dehors.\nRéponse : C.",
          micros: ["va_ecritures"],
        },
        {
          enonce:
            "Un ascensoriste note $X$, le nombre de pannes d'un ascenseur en une semaine (modèle). Calcule $P(X \\leqslant 1)$.",
          figure: grille(["xᵢ", "0", "1", "2", "3"], [["P(X = xᵢ)", "0,3", "0,4", "0,2", "0,1"]]),
          reponses: [{ attendu: "0,7" }],
          correction:
            "« Au plus $1$ » regroupe les colonnes $0$ et $1$.\nOn additionne leurs probabilités : $0{,}3 + 0{,}4 = 0{,}7$.\n⛔ Le piège : ne lire que la colonne $1$ et répondre $0{,}4$. Ce serait $P(X = 1)$.\nRéponse : 0,7.",
          micros: ["va_calculer_probabilites"],
        },
        {
          enonce:
            "Une conductrice de covoiturage note $X$, le nombre de personnes à bord de sa voiture (modèle). Calcule $P(X \\geqslant 3)$.",
          figure: grille(["xᵢ", "1", "2", "3", "4"], [["P(X = xᵢ)", "0,5", "0,3", "0,15", "0,05"]]),
          reponses: [{ attendu: "0,2" }],
          correction:
            "« Au moins $3$ » regroupe les colonnes $3$ et $4$.\n$0{,}15 + 0{,}05 = 0{,}2$.\n⛔ Le piège : exclure le $3$ et répondre $0{,}05$. Le signe $\\geqslant$ garde le $3$.\nRéponse : 0,2.",
          micros: ["va_calculer_probabilites"],
        },
        {
          enonce:
            "Un météorologue note $X$, le nombre de jours de gel en une semaine d'hiver (modèle). Il a trouvé $P(X \\leqslant 2) = 0{,}85$. Déduis-en $P(X > 2)$.",
          reponses: [{ attendu: "0,15" }],
          correction:
            "« Plus de $2$ » est le contraire de « au plus $2$ » : à eux deux, ils couvrent tous les cas.\nLeurs probabilités font donc $1$ : $1 - 0{,}85 = 0{,}15$.\n⛔ Le piège : répondre $0{,}85$. C'est la probabilité du contraire.\nRéponse : 0,15.",
          micros: ["va_calculer_probabilites"],
        },
        {
          enonce:
            "Une archère tire trois flèches et note $X$, le nombre de flèches dans la zone jaune (modèle). Détermine la probabilité manquante $p$.",
          figure: grille(["xᵢ", "0", "1", "2", "3"], [["P(X = xᵢ)", "0,25", "p", "0,35", "0,1"]]),
          reponses: [{ attendu: "0,3" }],
          correction:
            "La somme de toutes les probabilités vaut $1$.\nOn additionne celles qu'on connaît : $0{,}25 + 0{,}35 + 0{,}1 = 0{,}7$.\nOn retire le résultat à $1$ : $p = 1 - 0{,}7 = 0{,}3$.\n⛔ Le piège : s'arrêter à $0{,}7$. C'est le total des cases connues, pas la case cherchée.\nRéponse : 0,3.",
          micros: ["va_somme_un"],
        },
        {
          enonce:
            "Une éleveuse propose ce tableau pour $X$, le nombre d'agneaux nés d'une brebis (modèle).\na) Calcule la somme des probabilités du tableau.\nb) Ce tableau peut-il être une loi de probabilité ? Réponds oui ou non.",
          figure: grille(["xᵢ", "1", "2", "3"], [["P(X = xᵢ)", "0,2", "0,5", "0,4"]]),
          reponses: [
            { question: "a)", attendu: "1,1" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $0{,}2 + 0{,}5 + 0{,}4 = 1{,}1$.\nb) La somme doit faire exactement $1$. Ici elle fait $1{,}1$ : ce n'est pas une loi de probabilité.\n⛔ Le piège : regarder seulement si chaque case est entre $0$ et $1$. Il faut aussi faire la somme.\nRéponse : a) 1,1 ; b) non.",
          micros: ["va_somme_un"],
        },
        {
          enonce:
            "Sur $50$ nuits (modèle), un gardien a compté $X$, le nombre d'alertes par nuit : $30$ nuits sans alerte, $15$ nuits avec $1$ alerte, $5$ nuits avec $2$ alertes. On assimile chaque probabilité à la fréquence observée. Que vaut $P(X = 1)$ ?",
          reponses: [{ attendu: "0,3" }],
          correction:
            "Probabilité = effectif ÷ total.\n$15 \\div 50 = 0{,}3$.\n⛔ Le piège : répondre $15$. C'est un effectif, et une probabilité ne dépasse jamais $1$.\nRéponse : 0,3.",
          micros: ["va_dresser_loi"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on repère les valeurs de X et leurs probabilités avant de calculer.",
      rappel: [
        "Dresser une loi : on écrit chaque valeur possible, puis sa probabilité (effectif ÷ total, ou nombre de cas favorables ÷ nombre de cas).",
        "Deux lots de même montant donnent la même valeur de $X$ : on les regroupe avant de diviser.",
        "Une loi est acceptable si chaque probabilité est entre $0$ et $1$ ET si leur somme vaut $1$.",
        "Quand une probabilité est arrondie, la somme des arrondis doit rester proche de $1$.",
      ],
      exercices: [
        {
          enonce:
            "Une dentiste relève le nombre de caries de $100$ enfants (modèle). On choisit un de ces enfants au hasard, et $X$ est son nombre de caries.\na) Dresse la loi de $X$ : donne $P(X = 0)$, $P(X = 1)$, $P(X = 2)$ et $P(X = 3)$ dans cet ordre, séparées par « ; ».\nb) Calcule la somme de ces quatre probabilités.",
          figure: grille(["Caries", "0", "1", "2", "3"], [["Enfants", 55, 25, 15, 5]]),
          reponses: [
            { question: "a)", attendu: "0,55 ; 0,25 ; 0,15 ; 0,05", ordre: true },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) On divise chaque effectif par le total $100$ : $55 \\div 100 = 0{,}55$ ; $25 \\div 100 = 0{,}25$ ; $15 \\div 100 = 0{,}15$ ; $5 \\div 100 = 0{,}05$.\nb) $0{,}55 + 0{,}25 + 0{,}15 + 0{,}05 = 1$ : la loi est cohérente.\n⛔ Le piège : écrire les effectifs dans la loi. Une loi contient des probabilités, pas des effectifs.\nRéponse : a) 0,55 ; 0,25 ; 0,15 ; 0,05 ; b) 1.",
          micros: ["va_dresser_loi", "va_somme_un"],
        },
        {
          enonce:
            "La trésorière d'un théâtre amateur vend une tombola de $20$ billets : $12$ billets ne rapportent rien, $5$ font gagner $5$ €, $2$ font gagner $10$ € et $1$ fait gagner $50$ €. On prend un billet au hasard et $X$ est le gain en euros.\na) Donne $P(X = 0)$, $P(X = 5)$, $P(X = 10)$ et $P(X = 50)$ dans cet ordre, séparées par « ; ».\nb) Calcule $P(X \\geqslant 10)$.",
          reponses: [
            { question: "a)", attendu: "0,6 ; 0,25 ; 0,1 ; 0,05", ordre: true },
            { question: "b)", attendu: "0,15" },
          ],
          correction:
            "a) Il y a $20$ billets : $12 \\div 20 = 0{,}6$ ; $5 \\div 20 = 0{,}25$ ; $2 \\div 20 = 0{,}1$ ; $1 \\div 20 = 0{,}05$.\nb) « Au moins $10$ € » regroupe $10$ et $50$ : $0{,}1 + 0{,}05 = 0{,}15$.\n⛔ Le piège au b) : oublier la colonne $50$. Gagner $50$ €, c'est bien gagner au moins $10$ €.\nRéponse : a) 0,6 ; 0,25 ; 0,1 ; 0,05 ; b) 0,15.",
          micros: ["va_dresser_loi", "va_calculer_probabilites"],
        },
        {
          enonce:
            "Un commerçant du marché de Noël fait tourner une roue de $10$ secteurs identiques : $2$ secteurs bleus et $1$ secteur jaune font gagner $5$ €, $3$ secteurs rouges font gagner $2$ €, les $4$ autres ne rapportent rien. $X$ est le gain en euros.\na) Calcule $P(X = 5)$.\nb) Calcule $P(X = 0)$.\nc) Calcule $P(X \\geqslant 2)$.",
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "0,6" },
          ],
          correction:
            "a) Les bleus et le jaune donnent le même gain : $2 + 1 = 3$ secteurs. $3 \\div 10 = 0{,}3$.\nb) $4 \\div 10 = 0{,}4$.\nc) C'est le contraire de « ne rien gagner » : $1 - 0{,}4 = 0{,}6$.\n⛔ Le piège au a) : compter seulement les $2$ secteurs bleus. Tous les secteurs à $5$ € se regroupent.\nRéponse : a) 0,3 ; b) 0,4 ; c) 0,6.",
          micros: ["va_dresser_loi", "va_calculer_probabilites"],
        },
        {
          enonce:
            "Une contrôleuse de train note $X$, le retard d'un train en minutes (modèle). Calcule la probabilité que le retard soit :\na) d'au plus $5$ minutes ;\nb) de plus de $5$ minutes ;\nc) de moins de $5$ minutes ;\nd) d'au moins $10$ minutes.",
          figure: grille(["xᵢ", "0", "5", "10", "20"], [["P(X = xᵢ)", "0,6", "0,2", "0,15", "0,05"]]),
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "0,2" },
            { question: "c)", attendu: "0,6" },
            { question: "d)", attendu: "0,2" },
          ],
          correction:
            "a) $P(X \\leqslant 5) = 0{,}6 + 0{,}2 = 0{,}8$.\nb) $P(X > 5) = 1 - 0{,}8 = 0{,}2$ (le contraire du a).\nc) $P(X < 5)$ exclut le $5$ : il ne reste que la colonne $0$, soit $0{,}6$.\nd) $P(X \\geqslant 10) = 0{,}15 + 0{,}05 = 0{,}2$.\n⛔ Le piège au c) : confondre « moins de $5$ » et « au plus $5$ ». Avec « moins de », le $5$ reste dehors.\nRéponse : a) 0,8 ; b) 0,2 ; c) 0,6 ; d) 0,2.",
          micros: ["va_ecritures", "va_calculer_probabilites"],
        },
        {
          enonce:
            "Un libraire choisit un client au hasard et note $X$, le nombre de livres qu'il achète. Associe chaque phrase à la bonne écriture : réponds par la lettre.\nA : $P(X \\leqslant 2)$     B : $P(X < 2)$     C : $P(X \\geqslant 2)$     D : $P(X > 2)$\na) Le client achète au moins $2$ livres.\nb) Le client achète moins de $2$ livres.\nc) Le client achète au plus $2$ livres.\nd) Le client achète plus de $2$ livres.",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "D" },
          ],
          correction:
            "« Au moins » et « au plus » gardent le $2$ : signes $\\geqslant$ et $\\leqslant$.\n« Plus de » et « moins de » l'excluent : signes $>$ et $<$.\na) Au moins $2$ : C. b) Moins de $2$ : B. c) Au plus $2$ : A. d) Plus de $2$ : D.\n⛔ Le piège : lire « au moins » comme « moins de ». « Au moins $2$ » va vers le haut : c'est $2$ ou plus.\nRéponse : a) C ; b) B ; c) A ; d) D.",
          micros: ["va_ecritures"],
        },
        {
          enonce:
            "Une climatologue note $X$, le nombre d'orages en un mois d'été dans une vallée (modèle).\na) Détermine $p$.\nb) Calcule la probabilité d'avoir au moins un orage dans le mois.",
          figure: grille(["xᵢ", "0", "1", "2", "3"], [["P(X = xᵢ)", "0,45", "0,3", "p", "0,05"]]),
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,55" },
          ],
          correction:
            "a) $0{,}45 + 0{,}3 + 0{,}05 = 0{,}8$, donc $p = 1 - 0{,}8 = 0{,}2$.\nb) « Au moins un orage » est le contraire de « aucun orage » : $1 - 0{,}45 = 0{,}55$.\nVérification : $0{,}3 + 0{,}2 + 0{,}05 = 0{,}55$. ✔\n⛔ Le piège au b) : répondre $0{,}3$, la probabilité d'exactement un orage.\nRéponse : a) 0,2 ; b) 0,55.",
          micros: ["va_somme_un", "va_calculer_probabilites"],
        },
        {
          enonce:
            "Un stagiaire développeur propose ce tableau pour $X$, le nombre de bugs trouvés dans un programme (modèle).\na) Calcule la somme de la ligne des probabilités.\nb) Ce tableau peut-il être une loi de probabilité ? Réponds oui ou non.",
          figure: grille(["xᵢ", "0", "1", "2"], [["P(X = xᵢ)", "0,7", "−0,1", "0,4"]]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $0{,}7 + (-0{,}1) + 0{,}4 = 1$.\nb) La somme est bonne, mais une case vaut $-0{,}1$. Une probabilité n'est jamais négative : ce tableau n'est pas une loi.\n⛔ Le piège : conclure « oui » dès que la somme fait $1$. Il faut aussi que chaque case soit entre $0$ et $1$.\nRéponse : a) 1 ; b) non.",
          micros: ["va_somme_un"],
        },
        {
          enonce:
            "Une monitrice d'escalade relève le nombre de tentatives de $150$ grimpeurs pour réussir une voie (modèle). On choisit un de ces grimpeurs au hasard, et $X$ est son nombre de tentatives. Arrondis au centième.\na) Calcule $P(X = 1)$.\nb) Calcule $P(X = 2)$.\nc) Calcule $P(X = 3)$.\nd) Calcule la somme de tes trois résultats.",
          figure: grille(["Tentatives", "1", "2", "3"], [["Grimpeurs", 81, 52, 17]]),
          reponses: [
            { question: "a)", attendu: "0,54" },
            { question: "b)", attendu: "0,35", tolerance: 0.005 },
            { question: "c)", attendu: "0,11", tolerance: 0.005 },
            { question: "d)", attendu: "1" },
          ],
          correction:
            "a) $81 \\div 150 = 0{,}54$.\nb) $52 \\div 150 \\approx 0{,}347$, soit $0{,}35$ au centième.\nc) $17 \\div 150 \\approx 0{,}113$, soit $0{,}11$ au centième.\nd) $0{,}54 + 0{,}35 + 0{,}11 = 1$ : la loi est cohérente.\n⛔ Le piège : diviser par $3$, le nombre de colonnes. Le total, c'est $150$ grimpeurs.\nRéponse : a) 0,54 ; b) 0,35 ; c) 0,11 ; d) 1.",
          micros: ["va_dresser_loi", "va_somme_un"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : dresser la loi, la vérifier, puis traduire chaque question en écriture.",
      rappel: [
        "On dresse d'abord la loi, et on vérifie que la somme fait $1$.",
        "Avant de calculer, on écrit l'évènement : « au moins $3$ », c'est $X \\geqslant 3$.",
        "Quand le contraire a moins de colonnes, on passe par lui : c'est plus court.",
      ],
      exercices: [
        {
          titre: "Les vélos en panne",
          enonce:
            "Une technicienne de vélos en libre-service a relevé pendant $200$ jours le nombre $X$ de vélos en panne dans une station (modèle). On assimile chaque probabilité à la fréquence observée.\na) Donne $P(X = 0)$, $P(X = 1)$, $P(X = 2)$, $P(X = 3)$ et $P(X = 4)$ dans cet ordre, séparées par « ; ».\nb) Calcule $P(X \\leqslant 1)$.\nc) Calcule $P(X > 1)$.\nd) Elle demande du renfort quand au moins $3$ vélos sont en panne. Avec quelle probabilité ?",
          figure: grille(["Vélos en panne", "Jours"], [[0, 70], [1, 60], [2, 40], [3, 20], [4, 10]]),
          reponses: [
            { question: "a)", attendu: "0,35 ; 0,3 ; 0,2 ; 0,1 ; 0,05", ordre: true },
            { question: "b)", attendu: "0,65" },
            { question: "c)", attendu: "0,35" },
            { question: "d)", attendu: "0,15" },
          ],
          correction:
            "a) On divise par $200$ : $70 \\div 200 = 0{,}35$ ; $60 \\div 200 = 0{,}3$ ; $40 \\div 200 = 0{,}2$ ; $20 \\div 200 = 0{,}1$ ; $10 \\div 200 = 0{,}05$. La somme fait bien $1$.\nb) $0{,}35 + 0{,}3 = 0{,}65$.\nc) C'est le contraire : $1 - 0{,}65 = 0{,}35$.\nd) $P(X \\geqslant 3) = 0{,}1 + 0{,}05 = 0{,}15$.\n⛔ Le piège au c) : croire que le a) et le c) disent la même chose parce qu'ils donnent $0{,}35$. $P(X = 0)$ et $P(X > 1)$ sont deux évènements différents.\nRéponse : a) 0,35 ; 0,3 ; 0,2 ; 0,1 ; 0,05 ; b) 0,65 ; c) 0,35 ; d) 0,15.",
          micros: ["va_dresser_loi", "va_calculer_probabilites"],
        },
        {
          titre: "La tombola du club de rugby",
          enonce:
            "Le président d'un club de rugby prépare une tombola de $50$ billets : $35$ ne rapportent rien, $8$ font gagner $2$ €, $4$ font gagner $5$ €, $2$ font gagner $20$ € et $1$ fait gagner $100$ €. On prend un billet au hasard et $X$ est le gain en euros.\na) Donne les probabilités des gains $0$, $2$, $5$, $20$ et $100$ dans cet ordre, séparées par « ; ».\nb) Calcule $P(X \\geqslant 5)$.\nc) Calcule la probabilité de gagner quelque chose.\nd) Le président annonce : « plus d'une chance sur quatre de gagner quelque chose ». Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "0,7 ; 0,16 ; 0,08 ; 0,04 ; 0,02", ordre: true },
            { question: "b)", attendu: "0,14" },
            { question: "c)", attendu: "0,3" },
            { question: "d)", attendu: "vrai" },
          ],
          correction:
            "a) On divise par $50$ : $35 \\div 50 = 0{,}7$ ; $8 \\div 50 = 0{,}16$ ; $4 \\div 50 = 0{,}08$ ; $2 \\div 50 = 0{,}04$ ; $1 \\div 50 = 0{,}02$.\nb) $0{,}08 + 0{,}04 + 0{,}02 = 0{,}14$.\nc) Gagner quelque chose, c'est le contraire de ne rien gagner : $1 - 0{,}7 = 0{,}3$.\nd) Une chance sur quatre, c'est $0{,}25$. Or $0{,}3 > 0{,}25$ : c'est vrai.\n⛔ Le piège au c) : additionner quatre colonnes et se tromper. Le contraire n'en demande qu'une.\nRéponse : a) 0,7 ; 0,16 ; 0,08 ; 0,04 ; 0,02 ; b) 0,14 ; c) 0,3 ; d) vrai.",
          micros: ["va_dresser_loi", "va_calculer_probabilites"],
        },
        {
          titre: "Le tableau de l'apicultrice",
          enonce:
            "Une apicultrice note $X$, le nombre de ruches malades de son rucher en une saison (modèle). Un tableau est proposé.\na) Calcule la somme de ses probabilités.\nb) Ce tableau peut-il être une loi ? Réponds oui ou non.\nc) On garde les trois premières cases. Quelle valeur mettre dans la dernière pour obtenir une loi ?\nd) Avec ce nouveau tableau, calcule $P(X \\geqslant 2)$.",
          figure: grille(["xᵢ", "0", "1", "2", "3"], [["P(X = xᵢ)", "0,4", "0,3", "0,2", "0,2"]]),
          reponses: [
            { question: "a)", attendu: "1,1" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "0,1" },
            { question: "d)", attendu: "0,3" },
          ],
          correction:
            "a) $0{,}4 + 0{,}3 + 0{,}2 + 0{,}2 = 1{,}1$.\nb) La somme doit valoir $1$ : ce tableau n'est pas une loi.\nc) Les trois premières cases font $0{,}4 + 0{,}3 + 0{,}2 = 0{,}9$. La dernière vaut donc $1 - 0{,}9 = 0{,}1$.\nd) $P(X \\geqslant 2) = 0{,}2 + 0{,}1 = 0{,}3$.\n⛔ Le piège au d) : garder l'ancienne case et trouver $0{,}4$. Après une correction, on calcule avec le nouveau tableau.\nRéponse : a) 1,1 ; b) non ; c) 0,1 ; d) 0,3.",
          micros: ["va_somme_un", "va_calculer_probabilites"],
        },
        {
          titre: "Les salles du cinéma",
          enonce:
            "Une programmatrice de cinéma a relevé sur $40$ soirées le nombre $X$ de salles complètes (modèle). On assimile chaque probabilité à la fréquence observée.\na) Donne $P(X = 0)$, $P(X = 1)$, $P(X = 2)$ et $P(X = 3)$ dans cet ordre, séparées par « ; ».\nb) Calcule $P(X \\leqslant 1)$.\nc) Calcule $P(X \\geqslant 2)$.\nd) Elle prévoit un agent de plus quand au moins $2$ salles sont complètes. Sur $200$ soirées, pour environ combien de soirées faut-il le prévoir ?",
          figure: grille(["Salles complètes", "0", "1", "2", "3"], [["Soirées", 10, 18, 8, 4]]),
          reponses: [
            { question: "a)", attendu: "0,25 ; 0,45 ; 0,2 ; 0,1", ordre: true },
            { question: "b)", attendu: "0,7" },
            { question: "c)", attendu: "0,3" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "a) On divise par $40$ : $10 \\div 40 = 0{,}25$ ; $18 \\div 40 = 0{,}45$ ; $8 \\div 40 = 0{,}2$ ; $4 \\div 40 = 0{,}1$.\nb) $0{,}25 + 0{,}45 = 0{,}7$.\nc) C'est le contraire : $1 - 0{,}7 = 0{,}3$.\nd) $0{,}3$ des soirées sont concernées : $200 \\times 0{,}3 = 60$ soirées environ.\n⛔ Le piège au a) : diviser par $4$, le nombre de colonnes. Le total, c'est $40$ soirées.\nRéponse : a) 0,25 ; 0,45 ; 0,2 ; 0,1 ; b) 0,7 ; c) 0,3 ; d) 60.",
          micros: ["va_dresser_loi", "va_calculer_probabilites"],
        },
      ],
    },
  ],
};
