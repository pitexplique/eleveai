// ─── Fiche d'exercices : fonction, représenter et noter (STMG) — 20 exercices ───
//
// Notion fct_representation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-representation.bank.ts`). Le
// coach demande : lire une image sur une courbe ou dans un tableau, retrouver
// l'expression qui colle à un tableau (en la testant), les mots image et
// antécédent, la lecture de x ↦ 5x, le modèle C(x) = ax + b et le sens de a et
// de b, et les grandeurs composées : x × y = k (inversement proportionnelles) et
// y = kx² (doubler x multiplie y par 4). Rien de plus.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : cinq calculs nus (ex. 1 à 5, sans métier) ; cinéma,
// salle de sport, chantier (maçons) ; météo (météorologue), santé (infirmière),
// restauration (gérant de food truck), énergie (conseillère), son (ingénieur du
// son), fleuristerie (fleuriste), paysage (paysagiste), transport (chauffeuse de
// taxi) ; escalade (club), cuisine (pizzaïolo), sortie associative (animatrice),
// athlétisme (entraîneur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fct_rep_modes (2, 3, 4, 9, 10, 16, 20), fct_rep_notations
// (1, 4, 5, 10, 13, 20), fct_rep_modeliser (6, 7, 11, 12, 16, 17, 19),
// fct_rep_grandeur_composee (8, 14, 15, 18, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesFctRepresentationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-representation",
  titre: "Fonction : représenter et noter",
  accroche:
    "Vingt exercices pour lire une fonction sous ses trois visages : une expression, une courbe, un tableau. Image et antécédent, écrire un coût et dire ce que veulent dire ses nombres, puis les grandeurs inversement proportionnelles et celles qui dépendent d'un carré. Un food truck, un taxi, un lancer de poids, une pizza de 40 cm. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire une image, calculer une image, ou écrire une expression courte.",
      rappel: [
        "$f(a) = b$ se lit : l'image de $a$ par $f$ est $b$. Le nombre entre parenthèses, $a$, est un antécédent de $b$.",
        "$x \\mapsto 5x$ se lit : à $x$, on associe $5x$.",
        "Une fonction se donne par une expression, une courbe ou un tableau. Sur une courbe : on part de $x$ sur l'axe horizontal, on va jusqu'à la courbe, on lit la hauteur $f(x)$.",
        "Deux grandeurs sont inversement proportionnelles quand leur produit est constant : $x \\times y = k$.",
      ],
      exercices: [
        {
          enonce:
            "On sait que $f(3) = 7$.\na) Quelle est l'image de 3 par $f$ ?\nb) Donne un antécédent de 7 par $f$.",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "Dans $f(3) = 7$, on part de 3 et on arrive à 7.\na) L'image, c'est le nombre d'arrivée : 7.\nb) L'antécédent, c'est le nombre de départ, celui des parenthèses : 3.\n⛔ Le piège : inverser les deux mots. L'image n'est jamais le nombre entre parenthèses.\nRéponse : a) 7 ; b) 3.",
          micros: ["fct_rep_notations"],
        },
        {
          enonce:
            "La fonction $f$ est définie par $f(x) = 2x + 5$.\na) Calcule $f(4)$.\nb) Calcule $f(0)$.",
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "5" },
          ],
          correction:
            "On remplace $x$ par le nombre entre parenthèses.\na) $f(4) = 2 \\times 4 + 5 = 8 + 5 = 13$.\nb) $f(0) = 2 \\times 0 + 5 = 0 + 5 = 5$.\n⛔ Le piège : écrire $f(4) = 24 + 5$. Le $2x$ est un produit, pas un nombre à deux chiffres.\nRéponse : a) 13 ; b) 5.",
          micros: ["fct_rep_modes"],
        },
        {
          enonce:
            "La courbe représente une fonction $f$. Lis les valeurs suivantes.\na) $f(0)$\nb) $f(1)$\nc) $f(3)$",
          figure: repere([-3, 5, -3, 6], [{ q: [-1, 2, 3] }]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "0" },
          ],
          correction:
            "On part de $x$ sur l'axe horizontal, on va jusqu'à la courbe, on lit la hauteur.\na) En $x = 0$, la courbe est à la hauteur 3.\nb) En $x = 1$, la courbe est à la hauteur 4.\nc) En $x = 3$, la courbe coupe l'axe horizontal : la hauteur est 0.\n⛔ Le piège au c) : répondre 3. On a lu l'abscisse, alors que $f(3)$ est une hauteur.\nRéponse : a) 3 ; b) 4 ; c) 0.",
          micros: ["fct_rep_modes"],
        },
        {
          enonce:
            "Le tableau donne quelques valeurs d'une fonction $f$.\na) Quelle est l'image de 3 ?\nb) Quel est l'antécédent de 14 dans ce tableau ?",
          figure: grille(["x", "1", "2", "3", "4"], [["f(x)", 5, 8, 11, 14]]),
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "La ligne du haut donne les nombres de départ, la ligne du bas leurs images.\na) Sous 3, on lit 11 : $f(3) = 11$.\nb) On cherche 14 dans la ligne du bas : il est sous 4, donc $f(4) = 14$.\n⛔ Le piège au a) : chercher 3 dans la ligne du bas. L'image se lit EN DESSOUS du nombre de départ.\nRéponse : a) 11 ; b) 4.",
          micros: ["fct_rep_modes", "fct_rep_notations"],
        },
        {
          enonce:
            "a) Comment se lit $x \\mapsto 5x$ ? Écris le numéro de la bonne phrase.\n1. À $x$, on associe $5x$.\n2. $x$ est égal à $5x$.\n3. $x$ est l'image de $5x$.\nb) Quelle est l'image de 2 par cette fonction ?",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "10" },
          ],
          correction:
            "a) La flèche décrit un procédé : on prend $x$ et on le multiplie par 5. C'est la phrase 1.\nb) $5 \\times 2 = 10$.\n⛔ Le piège : lire la flèche comme un signe égal. $x$ n'est pas égal à $5x$, on lui ASSOCIE $5x$.\nRéponse : a) 1 ; b) 10.",
          micros: ["fct_rep_notations"],
        },
        {
          enonce:
            "Une place de cinéma coûte 7 €. On note $C(x)$ le prix de $x$ places. Écris $C(x)$ en fonction de $x$.",
          reponses: [{ attendu: "7x" }],
          correction:
            "Chaque place coûte 7 € : pour $x$ places, on paie $x$ fois 7 €.\nDonc $C(x) = 7x$.\nVérification : pour 2 places, $7 \\times 2 = 14$ €. ✔\n⛔ Le piège : écrire $x + 7$. On ajouterait 7 € une seule fois, quel que soit le nombre de places.\nRéponse : $C(x) = 7x$.",
          micros: ["fct_rep_modeliser"],
        },
        {
          enonce:
            "Une salle de sport demande 20 € d'inscription, puis 8 € par séance. On note $C(x)$ le coût total pour $x$ séances. Écris $C(x)$ en fonction de $x$.",
          reponses: [{ attendu: "8x + 20" }],
          correction:
            "On sépare ce qui est fixe et ce qui dépend du nombre de séances.\nLa partie fixe : 20 €. La partie qui dépend de $x$ : $8x$.\nDonc $C(x) = 8x + 20$.\n⛔ Le piège : écrire $20x + 8$. On paierait alors 20 € à chaque séance.\nRéponse : $C(x) = 8x + 20$.",
          micros: ["fct_rep_modeliser"],
        },
        {
          enonce:
            "Sur un chantier, $x$ maçons mettent $y$ jours pour finir un mur (modèle), avec $x \\times y = 60$.\na) Combien de jours faut-il à 5 maçons ?\nb) Combien de jours faut-il à 10 maçons ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "Le produit reste égal à 60 : pour trouver $y$, on divise 60 par $x$.\na) $60 \\div 5 = 12$ jours.\nb) $60 \\div 10 = 6$ jours.\nDeux fois plus de maçons, deux fois moins de jours : les grandeurs sont inversement proportionnelles.\n⛔ Le piège : calculer $60 - 5$ ou $60 \\times 5$. Ici, c'est le PRODUIT $x \\times y$ qui vaut 60.\nRéponse : a) 12 jours ; b) 6 jours.",
          micros: ["fct_rep_grandeur_composee"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : passer du tableau à l'expression, relire un modèle, lire une courbe.",
      rappel: [
        "Pour trouver l'expression qui colle à un tableau, on teste chaque expression sur au moins deux colonnes.",
        "Dans $C(x) = ax + b$ : $a$ est le coût de chaque unité de plus, et $b = C(0)$ est la partie fixe, payée même si $x = 0$.",
        "Si $x \\times y = k$, alors $y = \\dfrac{k}{x}$ : quand $x$ double, $y$ est divisé par 2.",
        "Si $y = kx^2$ : quand $x$ double, $y$ est multiplié par 4.",
      ],
      exercices: [
        {
          enonce:
            "Une météorologue relève la température $T(x)$, en °C, à $x$ centaines de mètres d'altitude (modèle).\na) Quelle expression colle au tableau ? Écris son numéro.\n1. $T(x) = 15x - 0{,}6$\n2. $T(x) = -0{,}6x + 15$\n3. $T(x) = 0{,}6x + 15$\nb) Avec cette expression, quelle température prévoit-elle à 1 000 m ?",
          figure: grille(["x", "0", "1", "2", "5"], [["T(x)", "15", "14,4", "13,8", "12"]]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: ["9", "9 °C", "9°C"] },
          ],
          correction:
            "a) On teste sur deux colonnes.\nEn $x = 0$, l'expression 1 donne $-0{,}6$ : elle ne convient pas.\nEn $x = 1$, l'expression 3 donne $15{,}6$ : elle ne convient pas.\nL'expression 2 donne $-0{,}6 + 15 = 14{,}4$ en $x = 1$, et $-3 + 15 = 12$ en $x = 5$. ✔\nb) 1 000 m, c'est 10 centaines de mètres : $x = 10$. $T(10) = -6 + 15 = 9$ °C.\n⛔ Le piège au b) : remplacer $x$ par 1 000. L'unité de $x$ est la centaine de mètres.\nRéponse : a) 2 ; b) 9 °C.",
          micros: ["fct_rep_modes"],
        },
        {
          enonce:
            "Une infirmière suit la quantité d'un médicament dans le sang, en mg/L, $x$ heures après la prise (modèle). La courbe représente cette quantité $f(x)$.\na) Lis $f(2)$.\nb) Lis $f(4)$.\nc) Donne les deux antécédents de 6 par $f$.",
          figure: repere([-1, 9, -1, 10], [{ q: [-0.5, 4, 0] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "2 ; 6" },
          ],
          correction:
            "a) En $x = 2$, la courbe est à la hauteur 6.\nb) En $x = 4$, la courbe est à la hauteur 8.\nc) Cette fois, on part de la hauteur 6 sur l'axe vertical et on cherche les points de la courbe à cette hauteur. Il y en a deux : $x = 2$ et $x = 6$.\n⛔ Le piège au c) : s'arrêter au premier point. Une image peut avoir plusieurs antécédents : la quantité passe par 6 mg/L en montant, puis en redescendant.\nRéponse : a) 6 ; b) 8 ; c) 2 et 6.",
          micros: ["fct_rep_modes", "fct_rep_notations"],
        },
        {
          enonce:
            "Le gérant d'un food truck paie 450 € de charges fixes par mois, et chaque repas lui coûte 6 € (modèle). On note $C(x)$ le coût total pour $x$ repas dans le mois.\na) Écris $C(x)$ en fonction de $x$.\nb) Calcule $C(200)$.\nc) Un mois, le coût total est de 2 850 €. Combien de repas a-t-il préparés ?",
          reponses: [
            { question: "a)", attendu: "6x + 450" },
            { question: "b)", attendu: "1 650 €" },
            { question: "c)", attendu: "400" },
          ],
          correction:
            "a) Partie fixe : 450 €. Partie qui dépend de $x$ : $6x$. Donc $C(x) = 6x + 450$.\nb) $C(200) = 6 \\times 200 + 450 = 1\\,200 + 450 = 1\\,650$ €.\nc) On résout $6x + 450 = 2\\,850$.\nOn retire la partie fixe : $6x = 2\\,400$. On divise par 6 : $x = 400$.\n⛔ Le piège au c) : diviser 2 850 par 6 sans retirer les charges fixes.\nRéponse : a) $C(x) = 6x + 450$ ; b) 1 650 € ; c) 400 repas.",
          micros: ["fct_rep_modeliser"],
        },
        {
          enonce:
            "Une conseillère en énergie présente une facture d'électricité (modèle) : pour $x$ kWh consommés dans le mois, le montant est $C(x) = 0{,}2x + 12$, en euros.\na) Calcule $C(0)$.\nb) Que représente le nombre 12 ? Écris le numéro.\n1. Le prix d'un kWh.\n2. Le montant total de la facture.\n3. L'abonnement, payé même sans consommer.\nc) De combien d'euros la facture augmente-t-elle pour chaque kWh de plus ?",
          reponses: [
            { question: "a)", attendu: "12 €" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "0,2 €" },
          ],
          correction:
            "a) $C(0) = 0{,}2 \\times 0 + 12 = 12$ €.\nb) C'est ce qu'on paie pour $x = 0$, sans rien consommer : l'abonnement, la phrase 3.\nc) Le coefficient de $x$ donne le coût de chaque unité de plus : 0,2 € par kWh.\nVérification : $C(1) = 12{,}2$, soit 0,2 € de plus que $C(0)$. ✔\n⛔ Le piège au b) : prendre 12 pour le montant total. Le total, c'est $C(x)$ tout entier.\nRéponse : a) 12 € ; b) 3 ; c) 0,2 €.",
          micros: ["fct_rep_modeliser"],
        },
        {
          enonce:
            "Un ingénieur du son note $g(x)$ le volume, en décibels, pour le réglage $x$ de sa console (modèle). Il sait que $g(5) = 62$. Sa stagiaire, Lina, affirme : « l'image de 62 est 5 ».\na) Cette phrase est-elle vraie ? Réponds vrai ou faux.\nb) Quelle est l'image de 5 par $g$ ?\nc) Donne un antécédent de 62 par $g$.",
          reponses: [
            { question: "a)", attendu: "faux" },
            { question: "b)", attendu: "62" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "Dans $g(5) = 62$, on part du réglage 5 et on arrive au volume 62.\na) La stagiaire a inversé les rôles : c'est faux.\nb) L'image de 5 est 62.\nc) 5 est un antécédent de 62.\n⛔ Le piège : croire qu'on ne peut rien dire sans l'expression de $g$. L'égalité suffit, elle donne une image et un antécédent.\nRéponse : a) faux ; b) 62 ; c) 5.",
          micros: ["fct_rep_notations"],
        },
        {
          enonce:
            "Une fleuriste, Naïma, vend toujours ses bouquets 12 € (modèle). Avec $x$ fleurs dans le bouquet, chaque fleur revient à $y$ euros. La courbe donne $y$ en fonction de $x$.\na) Lis $y$ pour $x = 3$.\nb) Lis $y$ pour $x = 6$.\nc) Calcule $x \\times y$ en ces deux points : quelle valeur trouves-tu ?\nd) Écris $y$ en fonction de $x$.\ne) Quand $x$ double, que devient $y$ ? Réponds « multiplié par 2 » ou « divisé par 2 ».",
          figure: repere(
            [-1, 13, -1, 13],
            [{ pts: [[1, 12], [1.5, 8], [2, 6], [2.5, 4.8], [3, 4], [4, 3], [5, 2.4], [6, 2], [8, 1.5], [10, 1.2], [12, 1]] }],
            [{ x: 3, y: 4 }, { x: 6, y: 2 }],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "4 €" },
            { question: "b)", attendu: "2 €" },
            { question: "c)", attendu: "12" },
            { question: "d)", attendu: "12/x" },
            { question: "e)", attendu: ["divisé par 2", "divisée par 2", "divisé par deux", "divisée par deux"] },
          ],
          correction:
            "a) En $x = 3$, on lit $y = 4$.\nb) En $x = 6$, on lit $y = 2$.\nc) $3 \\times 4 = 12$ et $6 \\times 2 = 12$ : le produit est constant.\nd) $x \\times y = 12$, donc $y = \\dfrac{12}{x}$.\ne) De $x = 3$ à $x = 6$, $x$ double, et $y$ passe de 4 à 2 : il est divisé par 2.\n⛔ Le piège : voir une proportionnalité. La courbe DESCEND : plus il y a de fleurs, moins chacune coûte.\nRéponse : a) 4 € ; b) 2 € ; c) 12 ; d) $y = \\dfrac{12}{x}$ ; e) divisé par 2.",
          micros: ["fct_rep_grandeur_composee"],
        },
        {
          enonce:
            "Un paysagiste pose du gazon sur des terrains carrés (modèle). Pour un côté de $x$ mètres, le prix est $y = 3x^2$, en euros.\na) Calcule $y$ pour $x = 10$.\nb) Calcule $y$ pour $x = 20$.\nc) Par combien le prix a-t-il été multiplié ?\nd) Un collègue dit : « côté deux fois plus long, prix deux fois plus élevé ». Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "300 €" },
            { question: "b)", attendu: "1 200 €" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $3 \\times 10^2 = 3 \\times 100 = 300$ €.\nb) $3 \\times 20^2 = 3 \\times 400 = 1\\,200$ €.\nc) $1\\,200 \\div 300 = 4$.\nd) Faux : le côté est multiplié par 2, mais le prix par $2^2 = 4$.\n⛔ Le piège au a) : calculer $(3 \\times 10)^2 = 900$. Le carré porte seulement sur $x$.\nRéponse : a) 300 € ; b) 1 200 € ; c) 4 ; d) faux.",
          micros: ["fct_rep_grandeur_composee"],
        },
        {
          enonce:
            "Une chauffeuse de taxi affiche ses tarifs (modèle). Le tableau donne le prix d'une course selon la distance $x$, en km.\na) Quel est le prix quand $x = 0$ (la prise en charge) ?\nb) Combien coûte chaque kilomètre ?\nc) Écris le prix $f(x)$ en fonction de $x$.\nd) Quel est le prix d'une course de 20 km ?",
          figure: grille(["x (km)", "0", "2", "4", "10"], [["Prix (€)", 4, 7, 10, 19]]),
          reponses: [
            { question: "a)", attendu: "4 €" },
            { question: "b)", attendu: "1,5 €" },
            { question: "c)", attendu: "1,5x + 4" },
            { question: "d)", attendu: "34 €" },
          ],
          correction:
            "a) On lit le prix sous $x = 0$ : 4 €.\nb) De 0 à 2 km, le prix monte de 3 € : $3 \\div 2 = 1{,}5$ € par kilomètre.\nc) Partie fixe 4, plus 1,5 par km : $f(x) = 1{,}5x + 4$.\nOn teste sur une autre colonne : $f(10) = 15 + 4 = 19$. ✔\nd) $f(20) = 1{,}5 \\times 20 + 4 = 30 + 4 = 34$ €.\n⛔ Le piège au b) : répondre 3 €. Ces 3 € correspondent à 2 km, pas à 1.\nRéponse : a) 4 € ; b) 1,5 € ; c) $f(x) = 1{,}5x + 4$ ; d) 34 €.",
          micros: ["fct_rep_modes", "fct_rep_modeliser"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : écrire le modèle, calculer, comparer, puis répondre à la question de départ.",
      rappel: [
        "Modéliser : on écrit ce qui est fixe, puis ce qui dépend de $x$.",
        "Deux modèles se comparent en calculant leurs valeurs pour un même $x$.",
        "Une image se lit sur la courbe ou se calcule avec l'expression : les deux doivent donner le même nombre.",
      ],
      exercices: [
        {
          titre: "Le tarif du club d'escalade",
          enonce:
            "Un club d'escalade propose deux tarifs à Théo (modèle). Tarif A : 12 € la séance. Tarif B : 60 € d'abonnement, puis 8 € la séance. On note $x$ le nombre de séances.\na) Écris le coût $A(x)$ du tarif A.\nb) Écris le coût $B(x)$ du tarif B.\nc) Pour 10 séances, quel tarif est le moins cher ? Écris A ou B.\nd) Pour combien de séances les deux tarifs coûtent-ils le même prix ?\ne) Pour 20 séances, quel tarif est le moins cher ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "12x" },
            { question: "b)", attendu: "8x + 60" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "15" },
            { question: "e)", attendu: "B" },
          ],
          correction:
            "a) $A(x) = 12x$.\nb) $B(x) = 8x + 60$.\nc) $A(10) = 120$ € et $B(10) = 80 + 60 = 140$ € : le tarif A est le moins cher.\nd) On résout $12x = 8x + 60$. On retire $8x$ : $4x = 60$, donc $x = 15$.\nVérification : $A(15) = 180$ et $B(15) = 120 + 60 = 180$. ✔\ne) $A(20) = 240$ € et $B(20) = 160 + 60 = 220$ € : le tarif B est le moins cher.\n⛔ Le piège : croire qu'un tarif est toujours le meilleur. La réponse dépend du nombre de séances.\nRéponse : a) $12x$ ; b) $8x + 60$ ; c) A ; d) 15 séances ; e) B.",
          micros: ["fct_rep_modeliser"],
        },
        {
          titre: "La pâte du pizzaïolo",
          enonce:
            "Un pizzaïolo utilise $y = 0{,}25x^2$ grammes de pâte pour une pizza de $x$ cm de diamètre (modèle).\na) Combien de pâte pour une pizza de 20 cm ?\nb) Combien de pâte pour une pizza de 40 cm ?\nc) Le diamètre a doublé : par combien la quantité de pâte a-t-elle été multipliée ?\nd) Combien de pâte pour une pizza de 30 cm ?\ne) Il lui reste 900 g de pâte. Combien de pizzas de 30 cm peut-il faire ?",
          reponses: [
            { question: "a)", attendu: "100 g" },
            { question: "b)", attendu: "400 g" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "225 g" },
            { question: "e)", attendu: "4" },
          ],
          correction:
            "a) $0{,}25 \\times 20^2 = 0{,}25 \\times 400 = 100$ g.\nb) $0{,}25 \\times 40^2 = 0{,}25 \\times 1\\,600 = 400$ g.\nc) $400 \\div 100 = 4$ : doubler le diamètre multiplie la pâte par 4.\nd) $0{,}25 \\times 30^2 = 0{,}25 \\times 900 = 225$ g.\ne) $900 \\div 225 = 4$ pizzas.\n⛔ Le piège au c) : répondre 2 par réflexe. Ici, $y$ dépend du CARRÉ de $x$.\nRéponse : a) 100 g ; b) 400 g ; c) 4 ; d) 225 g ; e) 4 pizzas.",
          micros: ["fct_rep_grandeur_composee"],
        },
        {
          titre: "Le car de la sortie",
          enonce:
            "Une animatrice d'association loue un car 900 € pour une sortie (modèle). Les $x$ participants partagent le prix : chacun paie $y$ euros.\na) Écris $y$ en fonction de $x$.\nb) Combien chacun paie-t-il s'il y a 30 participants ?\nc) Et s'il y en a 45 ?\nd) Et s'il y en a 60 ?\ne) De 30 à 60 participants, $x$ double. Réponds pour la part de chacun : « multipliée par 2 » ou « divisée par 2 ».",
          reponses: [
            { question: "a)", attendu: "900/x" },
            { question: "b)", attendu: "30 €" },
            { question: "c)", attendu: "20 €" },
            { question: "d)", attendu: "15 €" },
            { question: "e)", attendu: ["divisée par 2", "divisé par 2", "divisée par deux", "divisé par deux"] },
          ],
          correction:
            "a) Le produit $x \\times y$ est le prix du car : $x \\times y = 900$, donc $y = \\dfrac{900}{x}$.\nb) $900 \\div 30 = 30$ €.\nc) $900 \\div 45 = 20$ €.\nd) $900 \\div 60 = 15$ €.\ne) La part passe de 30 € à 15 € : elle est divisée par 2.\n⛔ Le piège au a) : écrire $y = 900 - x$. On ne retire pas un participant du prix : on PARTAGE le prix entre les participants.\nRéponse : a) $y = \\dfrac{900}{x}$ ; b) 30 € ; c) 20 € ; d) 15 € ; e) divisée par 2.",
          micros: ["fct_rep_modeliser", "fct_rep_grandeur_composee"],
        },
        {
          titre: "Le lancer de poids",
          enonce:
            "Un entraîneur d'athlétisme étudie un lancer de poids (modèle). La hauteur du poids, en mètres, à $x$ mètres de la lanceuse est $h(x) = -0{,}25x^2 + 2x + 1$. La courbe représente $h$.\na) Lis $h(4)$ sur la courbe.\nb) Calcule $h(2)$ avec l'expression.\nc) Donne les deux antécédents de 4 par $h$.\nd) Calcule $h(8)$ avec l'expression.",
          figure: repere([-1, 10, -1, 7], [{ q: [-0.25, 2, 1] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "5 m" },
            { question: "b)", attendu: "4 m" },
            { question: "c)", attendu: "2 ; 6" },
            { question: "d)", attendu: "1 m" },
          ],
          correction:
            "a) En $x = 4$, la courbe est à la hauteur 5 : $h(4) = 5$.\nb) $h(2) = -0{,}25 \\times 2^2 + 2 \\times 2 + 1 = -1 + 4 + 1 = 4$.\nc) On cherche les points de la courbe à la hauteur 4 : $x = 2$, qu'on vient de calculer, et $x = 6$.\nVérification : $h(6) = -9 + 12 + 1 = 4$. ✔\nd) $h(8) = -0{,}25 \\times 8^2 + 2 \\times 8 + 1 = -16 + 16 + 1 = 1$.\n⛔ Le piège au b) : calculer $(-0{,}25 \\times 2)^2$. On élève d'abord $x$ au carré, puis on multiplie.\nRéponse : a) 5 m ; b) 4 m ; c) 2 et 6 ; d) 1 m.",
          micros: ["fct_rep_modes", "fct_rep_notations"],
        },
      ],
    },
  ],
};
