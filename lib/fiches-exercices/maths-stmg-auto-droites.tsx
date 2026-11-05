// ─── Fiche d'exercices : droites et coefficient directeur (STMG) — 20 exercices ─
//
// Notion auto_droites du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-graphiques.bank.ts`). C'est
// un AUTOMATISME : placer un second point, lire y = ax + b sur le dessin, calculer
// a avec deux points, remonter à b. Coefficients simples, pas de droite verticale,
// pas de droites parallèles, pas de système : le coach ne les demande pas.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus et droites sans contexte (ex. 1 à 8) ; montgolfière
// (pilote), boulangerie (boulangère), escalade (trésorier), piscine (technicien),
// cyclisme (coach), pépinière (pépiniériste), médiathèque (stagiaire), céramique
// (céramiste), taxi (chauffeuse), glacier (glaciologue), salle de sport (coach),
// hôpital (infirmier).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`.
//
// Micro-compétences : auto_fct_tracer_droite (1, 2, 9, 14), auto_fct_lire_equation_reduite
// (3, 4, 5, 12, 15, 18), auto_fct_coefficient_directeur (6, 7, 8, 9, 12, 13, 18),
// auto_fct_equation_deux_points (10, 11, 16, 17, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesAutoDroitesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-droites",
  titre: "Droites et coefficient directeur",
  accroche:
    "Vingt exercices pour que la droite devienne un réflexe : placer un point, lire une équation réduite sur le dessin, calculer un coefficient directeur, trouver l'équation à partir de deux points. Une montgolfière, un four de boulanger, un bassin de piscine, un taxi, un glacier, une perfusion. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : placer un point, lire la droite, ou calculer le coefficient directeur.",
      rappel: [
        "Dans $y = ax + b$ : $a$ est le coefficient directeur, $b$ l'ordonnée à l'origine. La droite passe par le point $(0\\,;\\,b)$.",
        "Pour placer un point : on choisit $x$, puis on calcule $y = ax + b$.",
        "Lire $a$ sur le dessin : on avance de 1 vers la droite. On monte de $a$ si $a$ est positif, on descend si $a$ est négatif.",
        "Avec deux points : $a = \\dfrac{y_B - y_A}{x_B - x_A}$.",
      ],
      exercices: [
        {
          enonce:
            "On veut tracer la droite d'équation $y = 2x + 1$. Quelle est l'ordonnée de son point d'abscisse 3 ?",
          reponses: [{ attendu: "7" }],
          correction:
            "On remplace $x$ par 3 dans l'équation.\n$y = 2 \\times 3 + 1 = 6 + 1 = 7$.\nLe point $(3\\,;\\,7)$ est sur la droite : avec $(0\\,;\\,1)$, cela suffit pour la tracer.\n⛔ Le piège : s'arrêter à $2 \\times 3 = 6$ et oublier le $+ 1$.\nRéponse : 7.",
          micros: ["auto_fct_tracer_droite"],
        },
        {
          enonce:
            "On veut tracer la droite d'équation $y = -x + 4$.\na) Quelles sont les coordonnées de son point situé sur l'axe vertical ? Écris-les sous la forme (x ; y).\nb) Quelles sont les coordonnées de son point d'abscisse 3 ?",
          reponses: [
            { question: "a)", attendu: "(0 ; 4)", ordre: true },
            { question: "b)", attendu: "(3 ; 1)", ordre: true },
          ],
          correction:
            "a) Sur l'axe vertical, $x = 0$ : $y = -0 + 4 = 4$. C'est l'ordonnée à l'origine.\nb) $y = -3 + 4 = 1$.\n⛔ Le piège au b) : oublier le signe moins devant $x$ et écrire $3 + 4 = 7$.\nRéponse : a) (0 ; 4) ; b) (3 ; 1).",
          micros: ["auto_fct_tracer_droite"],
        },
        {
          enonce:
            "Voici une droite.\na) Lis l'ordonnée à l'origine $b$.\nb) Lis le coefficient directeur $a$.",
          figure: repere([-2, 4, -4, 6], [{ q: [0, 2, -1] }]),
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: "2" },
          ],
          correction:
            "a) La droite coupe l'axe VERTICAL en $-1$, donc $b = -1$.\nb) En partant de $(0\\,;\\,-1)$, on avance de 1 : on arrive à $(1\\,;\\,1)$. On est monté de 2, donc $a = 2$.\n⛔ Le piège au a) : regarder où la droite coupe l'axe horizontal. L'ordonnée à l'origine se lit sur l'axe vertical.\nRéponse : a) $-1$ ; b) 2.",
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          enonce:
            "Lis l'équation réduite de cette droite. Écris-la sous la forme $y = ax + b$.",
          figure: repere([-2, 5, -4, 6], [{ q: [0, -2, 3] }]),
          reponses: [{ attendu: "y = -2x + 3" }],
          correction:
            "La droite coupe l'axe vertical en 3, donc $b = 3$.\nDe $(0\\,;\\,3)$ à $(1\\,;\\,1)$, on avance de 1 et on descend de 2, donc $a = -2$.\n$y = -2x + 3$.\n⛔ Le piège : échanger les deux nombres et écrire $y = 3x - 2$. Le nombre devant $x$ est la pente, pas la hauteur de départ.\nRéponse : $y = -2x + 3$.",
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          enonce:
            "Quelle est l'équation réduite de la droite tracée ici ? Écris-la sous la forme $y = ax + b$.",
          figure: repere([-2, 6, -4, 5], [{ q: [0, 1, -2] }]),
          reponses: [{ attendu: "y = x - 2" }],
          correction:
            "La droite coupe l'axe vertical en $-2$, donc $b = -2$.\nDe $(0\\,;\\,-2)$ à $(1\\,;\\,-1)$, on avance de 1 et on monte de 1, donc $a = 1$.\nOn écrit $y = 1x - 2$, soit $y = x - 2$.\n⛔ Le piège : prendre 2 comme ordonnée à l'origine, parce qu'elle coupe l'axe horizontal en 2. On lit $b$ sur l'axe vertical.\nRéponse : $y = x - 2$.",
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          enonce: "Quel est le coefficient directeur de cette droite ?",
          figure: repere([-2, 4, -5, 8], [{ q: [0, 3, -1] }], [], undefined, true),
          reponses: [{ attendu: "3" }],
          correction:
            "On prend deux points faciles à lire : $(0\\,;\\,-1)$ et $(1\\,;\\,2)$.\nEn avançant de 1, on monte de $2 - (-1) = 3$.\nDonc $a = 3$.\n⛔ Le piège : répondre $-1$, l'ordonnée à l'origine. Le coefficient directeur dit de combien on monte, pas où on commence.\nRéponse : 3.",
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          enonce:
            "Une droite passe par $A(1\\,;\\,2)$ et $B(3\\,;\\,10)$. Calcule son coefficient directeur.",
          reponses: [{ attendu: "4" }],
          correction:
            "On divise la différence des ordonnées par la différence des abscisses.\n$a = \\dfrac{10 - 2}{3 - 1} = \\dfrac{8}{2} = 4$.\n⛔ Le piège : renverser la fraction, $\\dfrac{2}{8}$. Les ordonnées vont en haut : c'est la montée, divisée par l'avancée.\nRéponse : 4.",
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          enonce:
            "Une droite passe par $A(-1\\,;\\,5)$ et $B(2\\,;\\,-1)$. Calcule son coefficient directeur.",
          reponses: [{ attendu: "-2" }],
          correction:
            "$a = \\dfrac{-1 - 5}{2 - (-1)} = \\dfrac{-6}{3} = -2$.\nLe résultat est négatif : la droite descend. C'est logique, car $y$ passe de 5 à $-1$ quand $x$ augmente.\n⛔ Le piège : calculer $2 - 1$ en bas au lieu de $2 - (-1) = 3$. Une abscisse négative se met entre parenthèses.\nRéponse : $-2$.",
          micros: ["auto_fct_coefficient_directeur"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : lire la droite, ou trouver son équation.",
      rappel: [
        "Un point et le coefficient $a$ : pour $p$ pas vers la droite, on monte de $p \\times a$.",
        "L'équation à partir de deux points : on calcule $a$ avec la formule, puis on trouve $b$ en remplaçant $x$ et $y$ par les coordonnées d'un des points.",
        "Dans une situation, $a$ est ce qui s'ajoute à chaque unité de plus, et $b$ est la valeur de départ, pour $x = 0$.",
      ],
      exercices: [
        {
          enonce:
            "Le pilote d'une montgolfière modélise sa montée par une droite (modèle) : $x$ est le temps en minutes, $y$ l'altitude en centaines de mètres. La droite passe par $A(1\\,;\\,2)$ et son coefficient directeur vaut 3.\na) De combien la droite monte-t-elle en avançant de 2 vers la droite ?\nb) Quelles sont les coordonnées du point $B$ obtenu à partir de $A$ ? Écris-les sous la forme (x ; y).\nc) Quelle est alors l'altitude, en mètres ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "(3 ; 8)", ordre: true },
            { question: "c)", attendu: "800 m" },
          ],
          correction:
            "a) Pour 1 pas, on monte de 3. Pour 2 pas : $2 \\times 3 = 6$.\nb) Abscisse : $1 + 2 = 3$. Ordonnée : $2 + 6 = 8$. Donc $B(3\\,;\\,8)$.\nc) $y$ est en centaines de mètres : $8 \\times 100 = 800$ m.\n⛔ Le piège au a) : ne monter que de 3, comme pour un seul pas.\nRéponse : a) 6 ; b) (3 ; 8) ; c) 800 m.",
          micros: ["auto_fct_tracer_droite", "auto_fct_coefficient_directeur"],
        },
        {
          enonce:
            "Une boulangère note la température de son four pendant qu'il chauffe (modèle). Elle est donnée par une droite : 50 °C après 1 minute, 140 °C après 4 minutes.\na) Calcule le coefficient directeur $a$.\nb) Calcule l'ordonnée à l'origine $b$.\nc) Écris l'équation réduite de la droite, avec $x$ en minutes et $y$ en °C.",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "y = 30x + 20" },
          ],
          correction:
            "Les deux points sont $(1\\,;\\,50)$ et $(4\\,;\\,140)$.\na) $a = \\dfrac{140 - 50}{4 - 1} = \\dfrac{90}{3} = 30$ : le four gagne 30 °C par minute.\nb) On remplace avec le premier point : $50 = 30 \\times 1 + b$, donc $b = 20$. C'est la température de départ.\nc) $y = 30x + 20$.\nVérification : $30 \\times 4 + 20 = 140$. ✔\n⛔ Le piège au b) : prendre $b = 50$. Or 50 est la valeur pour $x = 1$, et $b$ est la valeur pour $x = 0$.\nRéponse : a) 30 ; b) 20 ; c) $y = 30x + 20$.",
          micros: ["auto_fct_equation_deux_points"],
        },
        {
          enonce:
            "Le trésorier d'un club d'escalade modélise le résultat d'un stage par une droite : $x$ est le nombre de dizaines d'inscrits, $y$ le résultat en centaines d'euros. Elle passe par $A(0\\,;\\,-3)$ et $B(2\\,;\\,5)$.\na) Calcule le coefficient directeur.\nb) Écris l'équation réduite de la droite.\nc) Quel est le résultat, en euros, pour 50 inscrits ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "y = 4x - 3" },
            { question: "c)", attendu: "1 700 €" },
          ],
          correction:
            "a) $a = \\dfrac{5 - (-3)}{2 - 0} = \\dfrac{8}{2} = 4$.\nb) $A$ est sur l'axe vertical : on y lit directement $b = -3$. Donc $y = 4x - 3$.\nc) 50 inscrits, ce sont 5 dizaines : $x = 5$. $y = 4 \\times 5 - 3 = 17$ centaines d'euros, soit 1 700 €.\n⛔ Le piège au c) : remplacer $x$ par 50. Ici, $x$ compte des dizaines d'inscrits.\nRéponse : a) 4 ; b) $y = 4x - 3$ ; c) 1 700 €.",
          micros: ["auto_fct_equation_deux_points"],
        },
        {
          enonce:
            "Un technicien de piscine vide un bassin. La droite donne le volume restant : $x$ est le temps en heures, $y$ le volume en centaines de litres (modèle).\na) Lis le volume de départ, en centaines de litres.\nb) Lis le coefficient directeur.\nc) Écris l'équation réduite de la droite.\nd) Au bout de combien d'heures le bassin est-il vide ?",
          figure: repere([-1, 9, -1, 8], [{ q: [0, -1, 7] }]),
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "-1" },
            { question: "c)", attendu: "y = -x + 7" },
            { question: "d)", attendu: "7 h" },
          ],
          correction:
            "a) La droite coupe l'axe vertical en 7 : 7 centaines de litres au départ.\nb) En avançant de 1, on descend de 1, donc $a = -1$.\nc) $y = -x + 7$.\nd) Le bassin est vide quand $y = 0$ : la droite coupe l'axe horizontal en 7, donc au bout de 7 heures.\n⛔ Le piège au b) : répondre 1. La droite descend, son coefficient directeur est négatif.\nRéponse : a) 7 ; b) $-1$ ; c) $y = -x + 7$ ; d) 7 h.",
          micros: ["auto_fct_lire_equation_reduite", "auto_fct_coefficient_directeur"],
        },
        {
          enonce:
            "Un coach de cyclisme compare deux entraînements à vitesse constante (modèle). $x$ est le temps en heures, $y$ la distance en kilomètres.\nLa droite de Léna passe par $(0\\,;\\,0)$ et $(2\\,;\\,40)$. Celle de Tom passe par $(1\\,;\\,25)$ et $(3\\,;\\,70)$.\na) Calcule le coefficient directeur de la droite de Léna.\nb) Calcule celui de la droite de Tom.\nc) Qui roule le plus vite ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "22,5" },
            { question: "c)", attendu: "Tom" },
          ],
          correction:
            "a) $\\dfrac{40 - 0}{2 - 0} = \\dfrac{40}{2} = 20$ : Léna fait 20 km par heure.\nb) $\\dfrac{70 - 25}{3 - 1} = \\dfrac{45}{2} = 22{,}5$ : Tom fait 22,5 km par heure.\nc) $22{,}5$ est plus grand que 20 : Tom roule le plus vite. Le coefficient directeur est ici la vitesse.\n⛔ Le piège : comparer 40 et 70. Ces distances ne sont pas parcourues dans le même temps.\nRéponse : a) 20 ; b) 22,5 ; c) Tom.",
          micros: ["auto_fct_coefficient_directeur"],
        },
        {
          enonce:
            "Un pépiniériste modélise la hauteur d'un arbuste par la droite d'équation $y = 0{,}5x + 2$ : $x$ est l'âge en années, $y$ la hauteur en mètres. Il veut placer des points pour la tracer.\na) Calcule $y$ pour $x = 0$, puis $x = 2$, puis $x = 4$. Donne les trois nombres dans cet ordre.\nb) Quelle est la hauteur de l'arbuste à 6 ans ?",
          reponses: [
            { question: "a)", attendu: "2 ; 3 ; 4", ordre: true },
            { question: "b)", attendu: "5 m" },
          ],
          correction:
            "a) $0{,}5 \\times 0 + 2 = 2$ ; $0{,}5 \\times 2 + 2 = 3$ ; $0{,}5 \\times 4 + 2 = 4$.\nLes points $(0\\,;\\,2)$, $(2\\,;\\,3)$ et $(4\\,;\\,4)$ sont alignés : c'est le contrôle du tracé.\nb) $0{,}5 \\times 6 + 2 = 3 + 2 = 5$ m.\n⛔ Le piège au a) : pour $x = 0$, répondre 0. Le $+ 2$ reste : c'est la hauteur à la plantation.\nRéponse : a) 2 ; 3 ; 4 ; b) 5 m.",
          micros: ["auto_fct_tracer_droite"],
        },
        {
          enonce:
            "Dans une médiathèque, le dessin donne le nombre d'inscrits : $x$ est le rang du mois, $y$ le nombre de centaines d'inscrits (modèle). Un stagiaire lit l'équation $y = 3x + 2$.\na) Lis le coefficient directeur.\nb) Lis l'ordonnée à l'origine.\nc) Écris l'équation réduite de la droite.\nd) Le stagiaire a-t-il raison ? Réponds oui ou non.",
          figure: repere([-2, 5, -2, 12], [{ q: [0, 2, 3] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "y = 2x + 3" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) De $(0\\,;\\,3)$ à $(1\\,;\\,5)$, on avance de 1 et on monte de 2 : $a = 2$.\nb) La droite coupe l'axe vertical en 3 : $b = 3$.\nc) $y = 2x + 3$.\nd) Non : le stagiaire a écrit les deux bons nombres, mais échangés.\n⛔ Le piège : lire le premier nombre vu, 3, et le placer devant $x$. Le nombre devant $x$ est la montée pour un pas.\nRéponse : a) 2 ; b) 3 ; c) $y = 2x + 3$ ; d) non.",
          micros: ["auto_fct_lire_equation_reduite"],
        },
        {
          enonce:
            "Pour une céramiste, le coût total de production est une fonction affine du nombre de pièces (modèle). Le tableau donne deux relevés.\na) Combien coûte chaque pièce supplémentaire ? C'est le coefficient directeur.\nb) Quel est le coût fixe, celui qu'on paie sans rien produire ?\nc) Quel serait le coût total pour 100 pièces ?",
          figure: grille(["Pièces produites", "Coût total (€)"], [
            [20, 700],
            [60, 1500],
          ]),
          reponses: [
            { question: "a)", attendu: "20 €" },
            { question: "b)", attendu: "300 €" },
            { question: "c)", attendu: "2 300 €" },
          ],
          correction:
            "a) $a = \\dfrac{1\\,500 - 700}{60 - 20} = \\dfrac{800}{40} = 20$ € par pièce.\nb) $700 = 20 \\times 20 + b$, soit $700 = 400 + b$, donc $b = 300$ €.\nc) $20 \\times 100 + 300 = 2\\,300$ €.\nVérification avec le second relevé : $20 \\times 60 + 300 = 1\\,500$. ✔\n⛔ Le piège au a) : calculer $700 \\div 20 = 35$. Ce serait oublier le coût fixe, compté dans les 700 €.\nRéponse : a) 20 € ; b) 300 € ; c) 2 300 €.",
          micros: ["auto_fct_equation_deux_points"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : deux points, le coefficient, l'équation, puis la réponse dans la situation.",
      rappel: [
        "La méthode : on relève deux points, on calcule $a$, puis $b$, et on écrit $y = ax + b$.",
        "On vérifie : le second point doit redonner la bonne valeur dans l'équation.",
        "Comparer deux tarifs : on calcule les deux valeurs pour la même quantité.",
      ],
      exercices: [
        {
          titre: "Le tarif du taxi",
          enonce:
            "Une chauffeuse de taxi facture une prise en charge, puis un prix fixe par kilomètre (modèle). Une course de 5 km coûte 12 €, une course de 15 km coûte 26 €.\na) Calcule le prix d'un kilomètre.\nb) Calcule le prix de la prise en charge.\nc) Écris l'équation réduite, avec $x$ en kilomètres et $y$ en euros.\nd) Combien coûte une course de 30 km ?",
          reponses: [
            { question: "a)", attendu: "1,4 €" },
            { question: "b)", attendu: "5 €" },
            { question: "c)", attendu: "y = 1,4x + 5" },
            { question: "d)", attendu: "47 €" },
          ],
          correction:
            "a) $a = \\dfrac{26 - 12}{15 - 5} = \\dfrac{14}{10} = 1{,}4$ € par kilomètre.\nb) $12 = 1{,}4 \\times 5 + b$, soit $12 = 7 + b$, donc $b = 5$ €.\nc) $y = 1{,}4x + 5$.\nVérification : $1{,}4 \\times 15 + 5 = 26$. ✔\nd) $1{,}4 \\times 30 + 5 = 42 + 5 = 47$ €.\n⛔ Le piège au d) : doubler le prix de 15 km, soit 52 €. La prise en charge ne se paie qu'une fois : la droite ne passe pas par l'origine.\nRéponse : a) 1,4 € ; b) 5 € ; c) $y = 1{,}4x + 5$ ; d) 47 €.",
          micros: ["auto_fct_equation_deux_points"],
        },
        {
          titre: "Le glacier qui recule",
          enonce:
            "Une glaciologue modélise la longueur d'un glacier imaginaire par une droite : $x$ est le temps en décennies, $y$ la longueur en kilomètres.\na) Lis la longueur de départ.\nb) Lis le coefficient directeur.\nc) Écris l'équation réduite.\nd) Quelle est la longueur au bout de 3 décennies ?\ne) Au bout de combien d'années le glacier a-t-il disparu dans ce modèle ?",
          figure: repere([-1, 7, -2, 12], [{ q: [0, -2, 10] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "10 km" },
            { question: "b)", attendu: "-2" },
            { question: "c)", attendu: "y = -2x + 10" },
            { question: "d)", attendu: "4 km" },
            { question: "e)", attendu: "50 ans" },
          ],
          correction:
            "a) La droite coupe l'axe vertical en 10 : 10 km.\nb) En avançant de 1, on descend de 2 : $a = -2$. Le glacier perd 2 km par décennie.\nc) $y = -2x + 10$.\nd) $-2 \\times 3 + 10 = 4$ km.\ne) $y = 0$ pour $x = 5$ : c'est là que la droite coupe l'axe horizontal. Or 5 décennies, cela fait $5 \\times 10 = 50$ ans.\n⛔ Le piège au e) : répondre 5 ans. L'axe horizontal compte des décennies.\nRéponse : a) 10 km ; b) $-2$ ; c) $y = -2x + 10$ ; d) 4 km ; e) 50 ans.",
          micros: ["auto_fct_lire_equation_reduite", "auto_fct_coefficient_directeur"],
        },
        {
          titre: "Deux formules de sport",
          enonce:
            "Une coach sportive propose deux formules (modèle), avec $x$ le nombre de séances et $y$ le prix en euros.\nFormule A : sa droite passe par $(0\\,;\\,20)$ et $(10\\,;\\,50)$.\nFormule B : sa droite passe par $(0\\,;\\,0)$ et $(4\\,;\\,20)$.\na) Calcule le coefficient directeur de la formule A.\nb) Écris l'équation réduite de la formule A.\nc) Écris l'équation réduite de la formule B.\nd) Calcule le prix de A pour 15 séances.\ne) Calcule le prix de B pour 15 séances.\nf) Quelle formule est la moins chère pour 15 séances ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "y = 3x + 20" },
            { question: "c)", attendu: "y = 5x" },
            { question: "d)", attendu: "65 €" },
            { question: "e)", attendu: "75 €" },
            { question: "f)", attendu: "A" },
          ],
          correction:
            "a) $a = \\dfrac{50 - 20}{10 - 0} = \\dfrac{30}{10} = 3$.\nb) Le point $(0\\,;\\,20)$ donne $b = 20$ : $y = 3x + 20$.\nc) $a = \\dfrac{20 - 0}{4 - 0} = 5$ et $b = 0$ : $y = 5x$.\nd) $3 \\times 15 + 20 = 65$ €.\ne) $5 \\times 15 = 75$ €.\nf) 65 € est moins que 75 € : la formule A est la moins chère.\n⛔ Le piège au f) : choisir B parce qu'elle n'a pas de frais de départ. Ce qui compte, c'est le prix pour le même nombre de séances.\nRéponse : a) 3 ; b) $y = 3x + 20$ ; c) $y = 5x$ ; d) 65 € ; e) 75 € ; f) A.",
          micros: ["auto_fct_equation_deux_points"],
        },
        {
          titre: "La perfusion",
          enonce:
            "Un infirmier suit une perfusion (modèle) : le volume restant dans la poche est donné par une droite, avec $x$ le temps en minutes et $y$ le volume en millilitres. Il reste 400 mL à 10 minutes et 300 mL à 30 minutes.\na) Calcule le coefficient directeur.\nb) Calcule l'ordonnée à l'origine, le volume de départ.\nc) Écris l'équation réduite.\nd) Au bout de combien de minutes la poche est-elle vide ?",
          reponses: [
            { question: "a)", attendu: "-5" },
            { question: "b)", attendu: "450" },
            { question: "c)", attendu: "y = -5x + 450" },
            { question: "d)", attendu: "90 min" },
          ],
          correction:
            "a) $a = \\dfrac{300 - 400}{30 - 10} = \\dfrac{-100}{20} = -5$ : la poche perd 5 mL par minute.\nb) $400 = -5 \\times 10 + b$, soit $400 = -50 + b$, donc $b = 450$ mL.\nc) $y = -5x + 450$.\nVérification : $-5 \\times 30 + 450 = 300$. ✔\nd) La poche est vide quand $y = 0$ : $5x = 450$, donc $x = 450 \\div 5 = 90$ minutes.\n⛔ Le piège au a) : écrire $\\dfrac{100}{20} = 5$ sans le signe. Le volume baisse, le coefficient directeur est négatif.\nRéponse : a) $-5$ ; b) 450 ; c) $y = -5x + 450$ ; d) 90 min.",
          micros: ["auto_fct_equation_deux_points"],
        },
      ],
    },
  ],
};
