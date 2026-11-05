// ─── Fiche d'exercices : lire une courbe (STMG) — 20 exercices ──────────────────
//
// Notion auto_lecture_graphique du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-graphiques.bank.ts`). Le coach
// demande : image et antécédent lus sur la courbe, variation entre deux dates,
// graduation et échelle (« en milliers d'euros »), appartenance d'un point à une
// courbe d'équation connue, seuil et première date où il est dépassé. Rien de plus.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs et courbes sans contexte (ex. 1, 2, 4 à 7) ;
// librairie (ex. 3) ; suivi d'un commerce (ex. 8) ; rivière (technicienne),
// photovoltaïque (installatrice), musée (responsable), fleuristerie (fleuriste),
// volley (entraîneur), climat (climatologue), santé (kinésithérapeute), logistique
// (responsable), cinéma (gérant), usine (ingénieure de production), drone
// (télépilote), abeilles (apiculteur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`,
// qui relit les courbes dans les figures.
//
// Tolérance : ex. 20 c) à 0,3 près, car c'est une lecture sur la courbe (valeur exacte 4,9).
//
// Micro-compétences : auto_fct_image_antecedent (1, 2, 9, 16, 17, 19, 20),
// auto_fct_reperer_graphique (3, 4, 10, 11, 15, 17, 18), auto_fct_appartenance_courbe
// (5, 6, 7, 12, 13, 18, 19, 20), auto_fct_estimer_seuil (8, 14, 15, 16, 17, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";

export const exercicesAutoLectureGraphiqueStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-lecture-graphique",
  titre: "Lire une courbe",
  accroche:
    "Vingt exercices pour lire une courbe sans se tromper d'axe : une image, un antécédent, une échelle en milliers d'euros, un point qui appartient ou non à une courbe, un seuil dépassé. Une rivière en crue, des panneaux solaires, un musée, un drone, des abeilles. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire sur la courbe, lire l'échelle, ou remplacer x dans une équation.",
      rappel: [
        "L'image de $a$ : on part de $a$ sur l'axe horizontal, on va jusqu'à la courbe, on lit sur l'axe vertical.",
        "Un antécédent de $b$ : on part de $b$ sur l'axe vertical, on va jusqu'à la courbe, on lit sur l'axe horizontal.",
        "Avant de lire, on regarde ce que vaut une graduation et l'unité de chaque axe.",
        "Un point est sur une courbe si ses coordonnées vérifient l'équation : on remplace $x$ et on compare à $y$.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$. Lis l'image de 4 par $f$.",
          figure: repere([-1, 7, -1, 7], [{ pts: [[0, 1], [2, 5], [4, 3], [6, 6]] }]),
          reponses: [{ attendu: "3" }],
          correction:
            "On part de 4 sur l'axe HORIZONTAL.\nOn va jusqu'à la courbe : on arrive au point $(4\\,;\\,3)$.\nOn lit sur l'axe vertical : $f(4) = 3$.\n⛔ Le piège : partir de 4 sur l'axe vertical. Ce serait chercher un antécédent de 4, pas son image.\nRéponse : 3.",
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce:
            "Voici la courbe d'une fonction $f$. Lis les antécédents de 7 par $f$. Donne les deux nombres.",
          figure: repere([-4, 4, -3, 8], [{ q: [1, 0, -2] }], [], undefined, true),
          reponses: [{ attendu: "-3 ; 3" }],
          correction:
            "On part de 7 sur l'axe VERTICAL.\nL'horizontale à la hauteur 7 rencontre la courbe en deux points : $(-3\\,;\\,7)$ et $(3\\,;\\,7)$.\nLes antécédents sont les abscisses de ces points : $-3$ et 3.\n⛔ Le piège : s'arrêter au premier point trouvé. Une horizontale peut couper une courbe plusieurs fois.\nRéponse : $-3$ et 3.",
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce:
            "La courbe donne le chiffre d'affaires d'une librairie, en milliers d'euros, selon le rang du mois (modèle).\na) À quelle hauteur est le point du mois 3 ?\nb) Quel est le chiffre d'affaires du mois 3, en euros ?",
          figure: repere([-1, 7, -1, 7], [{ pts: [[1, 2], [2, 3], [3, 4], [4, 3], [5, 5], [6, 6]] }]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "4 000 €" },
          ],
          correction:
            "a) Au-dessus du 3, le point est à la hauteur 4.\nb) Une graduation vaut mille euros : $4 \\times 1\\,000 = 4\\,000$ €.\n⛔ Le piège au b) : répondre 4 €. La graduation n'est pas l'unité demandée : on lit d'abord ce que dit l'énoncé sur l'axe.\nRéponse : a) 4 ; b) 4 000 €.",
          micros: ["auto_fct_reperer_graphique"],
        },
        {
          enonce:
            "Sur un axe vertical, 0 et 100 sont séparés par 5 intervalles égaux.\na) Que vaut une graduation ?\nb) Un point est à la hauteur de la troisième graduation au-dessus de 0. Que vaut-il ?",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "60" },
          ],
          correction:
            "a) On partage 100 en 5 : $100 \\div 5 = 20$.\nb) Trois graduations : $3 \\times 20 = 60$.\n⛔ Le piège au a) : croire qu'une graduation vaut toujours 1 ou 10. On la calcule à chaque nouveau graphique.\nRéponse : a) 20 ; b) 60.",
          micros: ["auto_fct_reperer_graphique"],
        },
        {
          enonce:
            "Une droite a pour équation $y = 2x - 1$.\na) Le point $A(3\\,;\\,5)$ appartient-il à la droite ? Réponds oui ou non.\nb) Le point $B(2\\,;\\,4)$ appartient-il à la droite ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) Pour $x = 3$ : $2 \\times 3 - 1 = 5$. C'est bien l'ordonnée de $A$ : oui.\nb) Pour $x = 2$ : $2 \\times 2 - 1 = 3$. L'ordonnée de $B$ est 4, et $3 \\ne 4$ : non.\n⛔ Le piège : remplacer $x$ par l'ordonnée. On remplace $x$ par l'abscisse, puis on compare le résultat à l'ordonnée.\nRéponse : a) oui ; b) non.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "Une courbe a pour équation $y = x^2 - 3$. Le point $A$ de la courbe a pour abscisse $-2$. Calcule son ordonnée.",
          reponses: [{ attendu: "1" }],
          correction:
            "On remplace $x$ par $-2$, entre parenthèses.\n$y = (-2)^2 - 3 = 4 - 3 = 1$.\n⛔ Le piège : écrire $-2^2 = -4$, ce qui donne $-7$. Le carré d'un nombre négatif est positif : $(-2) \\times (-2) = 4$.\nRéponse : 1.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "Une droite a pour équation $y = 3x + 4$. Le point $B$ de la droite a pour ordonnée 10. Quelle est son abscisse ?",
          reponses: [{ attendu: "2" }],
          correction:
            "Le point est sur la droite : son ordonnée vérifie l'équation.\n$3x + 4 = 10$, donc $3x = 6$, donc $x = 2$.\nVérification : $3 \\times 2 + 4 = 10$. ✔\n⛔ Le piège : remplacer $x$ par 10, ce qui donne 34. Ici, 10 est l'ordonnée : c'est $x$ qu'on cherche.\nRéponse : 2.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "La courbe donne les ventes d'un commerce, en milliers d'euros, selon le rang du mois (modèle). Quel est le premier mois où les ventes dépassent 5 milliers d'euros ?",
          figure: repere([-1, 8, -1, 9], [{ pts: [[1, 2], [2, 3], [3, 4], [4, 6], [5, 7], [6, 8]] }]),
          reponses: [{ attendu: "4" }],
          correction:
            "On imagine l'horizontale à la hauteur 5.\nOn parcourt les points de gauche à droite : 2, 3, 4, tous sous 5. Puis 6 au mois 4 : c'est au-dessus.\n⛔ Le piège : répondre 6, le mois du maximum. On demande le PREMIER mois au-dessus du seuil, pas le plus haut.\nRéponse : le mois 4.",
          micros: ["auto_fct_estimer_seuil"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une courbe dans une situation, plusieurs questions : on lit, on convertit, on compare.",
      rappel: [
        "La variation entre deux dates : valeur d'arrivée − valeur de départ. Un résultat négatif dit une baisse.",
        "Un seuil : on imagine l'horizontale à sa hauteur et on regarde les points au-dessus.",
        "La valeur réelle : la hauteur lue × ce que vaut une graduation.",
        "L'équation d'une courbe sert à calculer ce qu'on ne lit pas bien sur le dessin.",
      ],
      exercices: [
        {
          enonce:
            "Une technicienne de rivière suit la hauteur de l'eau pendant une crue (modèle). $x$ est le temps en heures, $y$ la hauteur en mètres.\na) Quelle est la hauteur au bout de 4 h ?\nb) Quelle est la hauteur au bout de 8 h ?\nc) Quelle est la variation entre 4 h et 8 h ? Réponds par un nombre négatif s'il s'agit d'une baisse.\nd) À quels moments la hauteur vaut-elle 4 m ? Donne les deux nombres.",
          figure: repere([-1, 11, -1, 9], [{ pts: [[0, 2], [2, 4], [4, 7], [6, 5], [8, 3], [10, 2]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "7 m" },
            { question: "b)", attendu: "3 m" },
            { question: "c)", attendu: "-4" },
            { question: "d)", attendu: "2 ; 7" },
          ],
          correction:
            "a) Au-dessus de 4, la courbe est à la hauteur 7.\nb) Au-dessus de 8, la courbe est à la hauteur 3.\nc) Arrivée − départ : $3 - 7 = -4$. L'eau a baissé de 4 m.\nd) L'horizontale à la hauteur 4 coupe la courbe deux fois : en $x = 2$ et en $x = 7$.\n⛔ Le piège au c) : calculer $7 - 3 = 4$. Le départ se retire de l'arrivée, sinon une baisse devient une hausse.\nRéponse : a) 7 m ; b) 3 m ; c) $-4$ ; d) 2 h et 7 h.",
          micros: ["auto_fct_image_antecedent"],
        },
        {
          enonce:
            "Une installatrice de panneaux solaires suit la production d'un toit, en centaines de kWh, selon le rang du mois (modèle).\na) Quelle est la production du mois 4, en kWh ?\nb) Quelle est la production du mois 2, en kWh ?\nc) De combien de kWh la production augmente-t-elle entre le mois 3 et le mois 6 ?",
          figure: repere([-1, 8, -1, 11], [{ pts: [[1, 2], [2, 3], [3, 5], [4, 8], [5, 9], [6, 10]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "800 kWh" },
            { question: "b)", attendu: "300 kWh" },
            { question: "c)", attendu: "500 kWh" },
          ],
          correction:
            "Une graduation verticale vaut 100 kWh.\na) Hauteur 8 : $8 \\times 100 = 800$ kWh.\nb) Hauteur 3 : $3 \\times 100 = 300$ kWh.\nc) L'écart en graduations : $10 - 5 = 5$. Puis $5 \\times 100 = 500$ kWh.\n⛔ Le piège au c) : répondre 5. C'est l'écart en graduations ; on le convertit avec l'unité annoncée.\nRéponse : a) 800 kWh ; b) 300 kWh ; c) 500 kWh.",
          micros: ["auto_fct_reperer_graphique"],
        },
        {
          enonce:
            "La responsable d'un musée regarde ce graphique (modèle) : sur l'axe horizontal, $x = 0$ représente l'année 2020 ; l'axe vertical compte les visiteurs en milliers.\na) Quelle année $x = 3$ représente-t-il ?\nb) Combien de visiteurs y a-t-il cette année-là ?\nc) Quelle est l'année du maximum, et combien y a-t-il alors de visiteurs ? Donne les deux nombres dans cet ordre.",
          figure: repere([-1, 7, -1, 9], [{ pts: [[0, 3], [1, 5], [2, 6], [3, 4], [4, 8], [5, 7]] }]),
          reponses: [
            { question: "a)", attendu: "2023" },
            { question: "b)", attendu: "4 000" },
            { question: "c)", attendu: "2024 ; 8 000", ordre: true },
          ],
          correction:
            "a) $x = 0$ représente 2020 : $2020 + 3 = 2023$.\nb) Hauteur 4, en milliers : $4 \\times 1\\,000 = 4\\,000$ visiteurs.\nc) Le point le plus haut est au-dessus de $x = 4$, à la hauteur 8. C'est l'année $2020 + 4 = 2024$, avec $8 \\times 1\\,000 = 8\\,000$ visiteurs.\n⛔ Le piège au a) : répondre 3. L'axe ne compte pas les années depuis l'an 0 : on regarde ce que représente $x = 0$.\nRéponse : a) 2023 ; b) 4 000 ; c) 2024 ; 8 000.",
          micros: ["auto_fct_reperer_graphique"],
        },
        {
          enonce:
            "Une fleuriste calcule son coût avec la droite d'équation $y = 5x + 20$ : $x$ est le nombre de bouquets, $y$ le coût en euros (modèle).\na) Le point $A(4\\,;\\,40)$ appartient-il à la droite ? Réponds oui ou non.\nb) Le point $B(10\\,;\\,60)$ appartient-il à la droite ? Réponds oui ou non.\nc) Calcule le coût de 6 bouquets.\nd) Un coût de 95 € correspond à combien de bouquets ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "50 €" },
            { question: "d)", attendu: "15" },
          ],
          correction:
            "a) $5 \\times 4 + 20 = 40$ : oui.\nb) $5 \\times 10 + 20 = 70$, et non 60 : non.\nc) $5 \\times 6 + 20 = 50$ €.\nd) $5x + 20 = 95$, donc $5x = 75$, donc $x = 15$ bouquets.\n⛔ Le piège au d) : calculer $5 \\times 95 + 20$. On connaît $y$ et on cherche $x$ : on résout une équation.\nRéponse : a) oui ; b) non ; c) 50 € ; d) 15 bouquets.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "Un entraîneur de volley modélise la trajectoire d'un ballon par la courbe d'équation $y = -x^2 + 4x + 1$ : $x$ et $y$ sont en mètres.\na) Calcule la hauteur du ballon pour $x = 2$.\nb) Le point $(3\\,;\\,4)$ appartient-il à la courbe ? Réponds oui ou non.\nc) Le point $(4\\,;\\,2)$ appartient-il à la courbe ? Réponds oui ou non.",
          figure: repere([-1, 5, -1, 6], [{ q: [-1, 4, 1] }]),
          reponses: [
            { question: "a)", attendu: "5 m" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $-2^2 + 4 \\times 2 + 1 = -4 + 8 + 1 = 5$ m.\nb) $-3^2 + 4 \\times 3 + 1 = -9 + 12 + 1 = 4$ : oui.\nc) $-4^2 + 4 \\times 4 + 1 = -16 + 16 + 1 = 1$, et non 2 : non.\n⛔ Le piège au a) : compter $-2^2$ comme $+4$, ce qui donne 13. Dans $-x^2$, on élève au carré d'abord, puis on met le signe moins.\nRéponse : a) 5 m ; b) oui ; c) non.",
          micros: ["auto_fct_appartenance_courbe"],
        },
        {
          enonce:
            "Une climatologue trace la température moyenne d'une ville imaginaire, en °C, selon le rang du mois.\na) Quel est le premier mois où la température dépasse 6 °C ?\nb) Pendant combien de mois tracés dépasse-t-elle 8 °C ?\nc) Quel est le mois le plus chaud ?",
          figure: repere([-1, 8, -1, 13], [{ pts: [[1, 2], [2, 4], [3, 7], [4, 10], [5, 12], [6, 9], [7, 5]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "On relit les points : 2, 4, 7, 10, 12, 9, 5.\na) Le premier point au-dessus de 6 est 7, au mois 3.\nb) Au-dessus de 8, il y a 10, 12 et 9 : cela fait 3 mois.\nc) Le maximum est 12, au mois 5.\n⛔ Le piège au a) : répondre 5, le mois du maximum. Le seuil est franchi bien avant le sommet.\nRéponse : a) le mois 3 ; b) 3 mois ; c) le mois 5.",
          micros: ["auto_fct_estimer_seuil"],
        },
        {
          enonce:
            "Une kinésithérapeute suit le rythme cardiaque d'un patient pendant un effort (modèle). $x$ est le temps en minutes. Une graduation verticale vaut 10 battements par minute.\na) Quel est le rythme à la minute 3 ?\nb) Quelle est la première minute où le rythme dépasse 120 ?\nc) Parmi les six relevés, combien dépassent 110 ?",
          figure: repere([-1, 7, -1, 14], [{ pts: [[0, 7], [1, 8], [2, 10], [3, 13], [4, 14], [5, 12]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "130" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) Hauteur 13 : $13 \\times 10 = 130$ battements par minute.\nb) Le seuil 120, c'est la hauteur 12. Les hauteurs relevées sont 7, 8, 10, 13 : on passe au-dessus à la minute 3.\nc) Le seuil 110, c'est la hauteur 11. Les relevés au-dessus : 13, 14 et 12, soit 3 relevés.\n⛔ Le piège au b) : chercher 120 directement sur l'axe. L'axe compte des dizaines : on divise d'abord le seuil par 10.\nRéponse : a) 130 ; b) la minute 3 ; c) 3.",
          micros: ["auto_fct_reperer_graphique", "auto_fct_estimer_seuil"],
        },
        {
          enonce:
            "Un responsable logistique suit un stock, en centaines de cartons, selon le rang de la semaine (modèle).\na) Quel est le stock en semaine 2, en cartons ?\nb) En quelle semaine la hauteur vaut-elle 6 ?\nc) Quelle est la première semaine où le stock est sous 500 cartons ?\nd) Quelle est la variation du stock entre la semaine 0 et la semaine 8, en cartons ? Réponds par un nombre négatif s'il s'agit d'une baisse.",
          figure: repere([-1, 9, -1, 10], [{ pts: [[0, 9], [1, 8], [2, 7], [3, 7], [4, 6], [5, 4], [6, 3], [7, 2], [8, 1]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "700" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "-800" },
          ],
          correction:
            "a) Hauteur 7 : $7 \\times 100 = 700$ cartons.\nb) L'horizontale à la hauteur 6 touche la courbe en $x = 4$ : semaine 4.\nc) 500 cartons, c'est la hauteur 5. En semaine 4, on est à 6 ; en semaine 5, à 4 : la semaine 5 est la première sous le seuil.\nd) $1 - 9 = -8$ en graduations, soit $-8 \\times 100 = -800$ cartons.\n⛔ Le piège au c) : répondre 4, la dernière semaine au-dessus. On cherche la première en dessous.\nRéponse : a) 700 ; b) 4 ; c) 5 ; d) $-800$.",
          micros: ["auto_fct_image_antecedent", "auto_fct_estimer_seuil"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : lire, convertir, calculer, puis répondre dans la situation.",
      rappel: [
        "On commence toujours par les axes : que compte chacun, et que vaut une graduation ?",
        "Une lecture sur une courbe est souvent approchée. L'équation, quand on l'a, donne la valeur exacte.",
        "Le seuil traduit une phrase : « au-dessus de », « au plus », « dépasse ».",
      ],
      exercices: [
        {
          titre: "Les entrées du cinéma",
          enonce:
            "Le gérant d'un cinéma lit ce graphique (modèle) : $x$ est le rang du mois, $y$ le nombre d'entrées en centaines.\na) Combien d'entrées y a-t-il au mois 3 ?\nb) Quelle est la variation, en entrées, entre le mois 3 et le mois 5 ? Réponds par un nombre négatif s'il s'agit d'une baisse.\nc) Pendant combien de mois tracés les entrées dépassent-elles 650 ?\nd) Combien d'entrées y a-t-il au total sur les 6 mois ?",
          figure: repere([-1, 8, -1, 10], [{ pts: [[1, 4], [2, 6], [3, 9], [4, 7], [5, 5], [6, 8]] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "900" },
            { question: "b)", attendu: "-400" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "3 900" },
          ],
          correction:
            "On relit les hauteurs : 4, 6, 9, 7, 5, 8.\na) $9 \\times 100 = 900$ entrées.\nb) $5 - 9 = -4$ graduations, soit $-400$ entrées.\nc) 650 entrées, c'est la hauteur $6{,}5$. Au-dessus : 9, 7 et 8, soit 3 mois.\nd) $4 + 6 + 9 + 7 + 5 + 8 = 39$, soit $39 \\times 100 = 3\\,900$ entrées.\n⛔ Le piège au c) : compter le mois 2. Sa hauteur 6 est sous $6{,}5$ : le seuil tombe entre deux graduations.\nRéponse : a) 900 ; b) $-400$ ; c) 3 ; d) 3 900.",
          micros: ["auto_fct_image_antecedent", "auto_fct_reperer_graphique", "auto_fct_estimer_seuil"],
        },
        {
          titre: "Le budget de l'usine",
          enonce:
            "Une ingénieure de production modélise un coût par la droite d'équation $y = 2x + 3$ : $x$ est le nombre de centaines de pièces, $y$ le coût en milliers d'euros.\na) Lis la hauteur de la droite pour $x = 3$.\nb) Quel est alors le coût, en euros ?\nc) Le point $(4\\,;\\,11)$ appartient-il à la droite ? Réponds oui ou non.\nd) Combien de pièces peut-on produire avec un budget de 13 000 € ?\ne) Avec un budget de 8 000 €, combien de pièces peut-on produire au plus ?",
          figure: repere([-1, 7, -1, 14], [{ q: [0, 2, 3] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "9 000 €" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "500" },
            { question: "e)", attendu: "250" },
          ],
          correction:
            "a) Pour $x = 3$ : $2 \\times 3 + 3 = 9$, ce qu'on lit sur la droite.\nb) $y$ compte des milliers : $9 \\times 1\\,000 = 9\\,000$ €.\nc) $2 \\times 4 + 3 = 11$ : oui.\nd) 13 000 €, c'est $y = 13$. $2x + 3 = 13$, donc $x = 5$, soit $5 \\times 100 = 500$ pièces.\ne) 8 000 €, c'est $y = 8$. $2x + 3 = 8$, donc $2x = 5$ et $x = 2{,}5$, soit $2{,}5 \\times 100 = 250$ pièces au plus.\n⛔ Le piège au d) : répondre 5. L'axe horizontal compte des centaines de pièces.\nRéponse : a) 9 ; b) 9 000 € ; c) oui ; d) 500 ; e) 250.",
          micros: ["auto_fct_reperer_graphique", "auto_fct_appartenance_courbe", "auto_fct_estimer_seuil"],
        },
        {
          titre: "Le vol du drone",
          enonce:
            "Une télépilote modélise le vol d'un drone par la courbe d'équation $y = -x^2 + 6x$ : $x$ est le temps en minutes, $y$ la hauteur en dizaines de mètres.\na) Quelle est la hauteur, en mètres, à la minute 1 ?\nb) Quelle est la hauteur maximale, en mètres ?\nc) À quels moments la hauteur vaut-elle 80 m ? Donne les deux nombres.\nd) Le point $(5\\,;\\,5)$ appartient-il à la courbe ? Réponds oui ou non.\ne) Pendant combien de minutes le drone est-il au-dessus de 50 m ?",
          figure: repere([-1, 7, -1, 10], [{ q: [-1, 6, 0] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "50 m" },
            { question: "b)", attendu: "90 m" },
            { question: "c)", attendu: "2 ; 4" },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "4 min" },
          ],
          correction:
            "a) $-1^2 + 6 \\times 1 = 5$, soit $5 \\times 10 = 50$ m.\nb) Le sommet de la courbe est à la hauteur 9, pour $x = 3$ : $9 \\times 10 = 90$ m.\nc) 80 m, c'est la hauteur 8. L'horizontale coupe la courbe en $x = 2$ et $x = 4$. Vérification : $-4 + 12 = 8$ et $-16 + 24 = 8$. ✔\nd) $-5^2 + 6 \\times 5 = -25 + 30 = 5$ : oui.\ne) 50 m, c'est la hauteur 5, atteinte en $x = 1$ et $x = 5$. Entre les deux, la courbe est au-dessus : $5 - 1 = 4$ minutes.\n⛔ Le piège au c) : chercher 80 sur l'axe vertical, qui s'arrête à 9. On divise d'abord par 10.\nRéponse : a) 50 m ; b) 90 m ; c) 2 min et 4 min ; d) oui ; e) 4 min.",
          micros: ["auto_fct_image_antecedent", "auto_fct_appartenance_courbe"],
        },
        {
          titre: "Les abeilles de l'apiculteur",
          enonce:
            "Un apiculteur modélise une colonie par la courbe d'équation $y = 0{,}25x^2 + 1$ : $x$ est le temps en semaines, $y$ le nombre de milliers d'abeilles.\na) Lis $y$ pour $x = 2$.\nb) Lis $y$ pour $x = 4$.\nc) Estime sur la courbe la semaine où la colonie atteint 7 000 abeilles.\nd) Calcule $y$ pour $x = 5$.\ne) Combien d'abeilles cela fait-il ?",
          figure: repere([-1, 7, -1, 11], [{ q: [0.25, 0, 1] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "5", tolerance: 0.3 },
            { question: "d)", attendu: "7,25" },
            { question: "e)", attendu: "7 250" },
          ],
          correction:
            "a) $0{,}25 \\times 2^2 + 1 = 1 + 1 = 2$.\nb) $0{,}25 \\times 4^2 + 1 = 4 + 1 = 5$.\nc) 7 000 abeilles, c'est la hauteur 7. L'horizontale coupe la courbe un peu avant $x = 5$ : environ 5 semaines.\nd) L'équation donne la valeur exacte : $0{,}25 \\times 5^2 + 1 = 6{,}25 + 1 = 7{,}25$.\ne) $7{,}25 \\times 1\\,000 = 7\\,250$ abeilles. À la semaine 5, le seuil de 7 000 est donc déjà un peu dépassé.\n⛔ Le piège au d) : calculer $0{,}25 \\times 5 = 1{,}25$ en oubliant le carré.\nRéponse : a) 2 ; b) 5 ; c) environ 5 ; d) 7,25 ; e) 7 250.",
          micros: ["auto_fct_image_antecedent", "auto_fct_appartenance_courbe", "auto_fct_estimer_seuil"],
        },
      ],
    },
  ],
};
