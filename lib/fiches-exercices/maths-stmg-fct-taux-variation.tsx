// ─── Fiche d'exercices : taux de variation et sécante (STMG) — 20 exercices ─────
//
// Notion fct_taux_variation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-representation.bank.ts`). Le
// coach demande : le calcul (f(b) − f(a)) ÷ (b − a) sur une expression du second
// degré ou sur deux valeurs, retrouver une image à partir du taux (on multiplie
// par l'écart), le taux comme coefficient directeur de la sécante, la sécante
// horizontale (taux nul ne veut pas dire constante), et le sens du taux : une
// variation MOYENNE par unité, qui n'est pas un pourcentage. Pas de nombre dérivé.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : quatre calculs nus (ex. 1 à 4), une droite (ex. 5), une
// courbe (ex. 6) ; atelier (coût de production), prévision (ex. 8) ; cyclisme
// (cycliste), commerce en ligne (e-commerçante), froid (technicienne de
// maintenance), numérique (community manager), musée (médiatrice), rivière
// (hydrologue), textile (responsable d'atelier), démographie (démographe) ;
// course à pied (coureuse), édition (imprimeur), barrage (gestionnaire), deux
// magasins (directrice commerciale).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fct_taux_calculer (1, 2, 3, 4, 6, 8, 10, 15, 17, 18, 20),
// fct_taux_secante (5, 6, 13, 14, 20), fct_taux_interpreter (7, 9, 11, 12, 14,
// 16, 17, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesFctTauxVariationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-taux-variation",
  titre: "Taux de variation et sécante",
  accroche:
    "Vingt exercices sur le taux de variation : le calculer entre deux valeurs, le voir comme la pente d'une sécante, et surtout dire ce qu'il veut dire : une variation moyenne, en euros par article ou en kilomètres par heure, et pas un pourcentage. Une chambre froide en panne, une rivière en décrue, le rythme d'une coureuse, deux magasins qui finissent au même point. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : appliquer la formule du taux, ou lire ce qu'il signifie.",
      rappel: [
        "Le taux de variation de $f$ entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$. C'est l'écart des images divisé par l'écart des abscisses.",
        "Sur un dessin, c'est le coefficient directeur de la droite qui joint les deux points : la sécante.",
        "Il se lit par unité : un taux de 30 entre deux quantités d'articles, c'est 30 € de plus en moyenne par article.",
        "Pour remonter du taux à une image : écart des images = taux × écart des abscisses.",
      ],
      exercices: [
        {
          enonce:
            "On sait que $f(2) = 5$ et $f(6) = 13$. Calcule le taux de variation de $f$ entre 2 et 6.",
          reponses: [{ attendu: "2" }],
          correction:
            "On applique la formule : l'écart des images divisé par l'écart des abscisses.\n$\\dfrac{f(6) - f(2)}{6 - 2} = \\dfrac{13 - 5}{4} = \\dfrac{8}{4} = 2$.\n⛔ Le piège : s'arrêter à $13 - 5 = 8$. Il faut encore diviser par l'écart des abscisses.\nRéponse : 2.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "On sait que $f(1) = 20$ et $f(5) = 12$. Calcule le taux de variation de $f$ entre 1 et 5.",
          reponses: [{ attendu: "-2" }],
          correction:
            "$\\dfrac{f(5) - f(1)}{5 - 1} = \\dfrac{12 - 20}{4} = \\dfrac{-8}{4} = -2$.\nLe taux est négatif : entre 1 et 5, la valeur baisse.\n⛔ Le piège : calculer $20 - 12$ et répondre 2. On part toujours de la valeur de droite, $f(5)$, comme pour $5 - 1$.\nRéponse : $-2$.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "Soit $f(x) = x^2$. Calcule le taux de variation de $f$ entre 1 et 3.",
          reponses: [{ attendu: "4" }],
          correction:
            "On calcule d'abord les deux images : $f(1) = 1$ et $f(3) = 9$.\nPuis le taux : $\\dfrac{9 - 1}{3 - 1} = \\dfrac{8}{2} = 4$.\n⛔ Le piège : répondre 8, en oubliant de diviser par $3 - 1 = 2$.\nRéponse : 4.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "Soit $f(x) = 2x^2 - 3x$. Calcule le taux de variation de $f$ entre 1 et 2.",
          reponses: [{ attendu: "3" }],
          correction:
            "$f(1) = 2 \\times 1 - 3 \\times 1 = -1$.\n$f(2) = 2 \\times 4 - 3 \\times 2 = 8 - 6 = 2$.\nLe taux : $\\dfrac{2 - (-1)}{2 - 1} = \\dfrac{3}{1} = 3$.\n⛔ Le piège : écrire $2 - 1 = 1$ au numérateur. On retire $-1$, ce qui revient à ajouter 1.\nRéponse : 3.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "La droite passe par les points $A(1\\,;\\,2)$ et $B(4\\,;\\,8)$. Calcule son coefficient directeur.",
          figure: repere([-1, 6, -1, 10], [{ q: [0, 2, 0] }], [{ x: 1, y: 2, label: "A" }, { x: 4, y: 8, label: "B" }]),
          reponses: [{ attendu: "2" }],
          correction:
            "Le coefficient directeur se calcule comme un taux de variation : l'écart des ordonnées divisé par l'écart des abscisses.\n$\\dfrac{8 - 2}{4 - 1} = \\dfrac{6}{3} = 2$.\n⛔ Le piège : diviser dans l'autre sens, $3 \\div 6 = 0{,}5$. Les ordonnées vont au numérateur.\nRéponse : 2.",
          micros: ["fct_taux_secante"],
        },
        {
          enonce:
            "La courbe de $f$ et sa sécante en orange sont tracées.\na) Lis $f(2)$.\nb) Lis $f(4)$.\nc) Calcule le coefficient directeur de la sécante passant par les points d'abscisses 2 et 4.",
          figure: repere(
            [-1, 6, -1, 10],
            [{ q: [0.5, 0, 0] }, { pts: [[1.5, 0.5], [4.5, 9.5]], couleur: ORANGE }],
            [{ x: 2, y: 2 }, { x: 4, y: 8 }],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) En $x = 2$, la courbe est à la hauteur 2.\nb) En $x = 4$, la courbe est à la hauteur 8.\nc) La pente de la sécante est le taux de variation de $f$ entre 2 et 4 : $\\dfrac{8 - 2}{4 - 2} = \\dfrac{6}{2} = 3$.\n⛔ Le piège au c) : répondre 6. C'est l'écart des hauteurs, pas encore la pente.\nRéponse : a) 2 ; b) 8 ; c) 3.",
          micros: ["fct_taux_calculer", "fct_taux_secante"],
        },
        {
          enonce:
            "Le coût de production d'un atelier passe de 900 € à 1 500 € quand la quantité produite passe de 50 à 100 articles.\na) Calcule le taux de variation du coût.\nb) Que signifie ce nombre ? Écris le numéro.\n1. Ce que coûte en moyenne chaque article de plus, en euros.\n2. Le pourcentage d'augmentation du coût.\n3. Le coût total, en euros.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) $\\dfrac{1\\,500 - 900}{100 - 50} = \\dfrac{600}{50} = 12$.\nb) Le coût est en euros, la quantité en articles : le taux est en euros PAR article. C'est la phrase 1.\n⛔ Le piège au b) : lire un pourcentage. Un taux de variation n'est pas un taux d'évolution.\nRéponse : a) 12 ; b) 1.",
          micros: ["fct_taux_interpreter"],
        },
        {
          enonce:
            "Le taux de variation d'une grandeur entre 2 et 5 vaut 15. Sa valeur en 2 est 200. Quelle est sa valeur en 5 ?",
          reponses: [{ attendu: "245" }],
          correction:
            "L'écart des images, c'est le taux multiplié par l'écart des abscisses.\nL'écart des abscisses : $5 - 2 = 3$.\nL'écart des images : $15 \\times 3 = 45$.\nLa valeur en 5 : $200 + 45 = 245$.\n⛔ Le piège : ajouter 15 une seule fois, ce qui donne 215. Le taux vaut pour UNE unité, et il y en a 3.\nRéponse : 245.",
          micros: ["fct_taux_calculer"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on calcule le taux, on donne son unité, on dit ce qu'il signifie.",
      rappel: [
        "L'unité d'un taux : l'unité de la grandeur PAR unité de la variable (km/h, € par article, visiteurs par jour).",
        "Taux positif : la grandeur monte en moyenne. Taux négatif : elle baisse en moyenne.",
        "Un taux compare seulement les DEUX extrémités : un taux nul veut dire que les deux images sont égales, pas que la grandeur reste constante entre les deux.",
      ],
      exercices: [
        {
          enonce:
            "Une cycliste, Salomé, a parcouru 50 km au bout de 2 heures, et 110 km au bout de 5 heures.\na) Calcule le taux de variation de la distance entre 2 h et 5 h. Donne-le en km/h.\nb) Si elle garde ce rythme, quelle distance aura-t-elle parcourue au bout de 6 heures ?",
          reponses: [
            { question: "a)", attendu: "20 km/h" },
            { question: "b)", attendu: "130 km" },
          ],
          correction:
            "a) $\\dfrac{110 - 50}{5 - 2} = \\dfrac{60}{3} = 20$ km/h : c'est sa vitesse moyenne sur ces trois heures.\nb) Une heure de plus, soit 20 km de plus : $110 + 20 = 130$ km.\n⛔ Le piège au a) : diviser 110 par 5, ce qui donne 22. Le taux utilise les ÉCARTS entre les deux moments, pas la dernière valeur seule.\nRéponse : a) 20 km/h ; b) 130 km.",
          micros: ["fct_taux_interpreter"],
        },
        {
          enonce:
            "Une e-commerçante suit son chiffre d'affaires, en milliers d'euros (k€), au fil des mois (modèle).\na) Calcule le taux de variation entre le mois 1 et le mois 3.\nb) Calcule le taux de variation entre le mois 3 et le mois 6.\nc) Sur quelle période le chiffre d'affaires grimpe-t-il le plus vite en moyenne ? Écris 1 pour « mois 1 à 3 », 2 pour « mois 3 à 6 ».",
          figure: grille(["Mois", "1", "3", "6"], [["CA (k€)", 12, 18, 30]]),
          reponses: [
            { question: "a)", attendu: ["3", "3 k€", "3 k€ par mois", "3 k€/mois"] },
            { question: "b)", attendu: ["4", "4 k€", "4 k€ par mois", "4 k€/mois"] },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) $\\dfrac{18 - 12}{3 - 1} = \\dfrac{6}{2} = 3$ k€ par mois.\nb) $\\dfrac{30 - 18}{6 - 3} = \\dfrac{12}{3} = 4$ k€ par mois.\nc) 4 est plus grand que 3 : la deuxième période grimpe le plus vite.\n⛔ Le piège au c) : comparer seulement 6 et 12. La deuxième période dure plus longtemps : on compare les taux, pas les écarts.\nRéponse : a) 3 k€ par mois ; b) 4 k€ par mois ; c) 2.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "Une technicienne de maintenance suit une chambre froide en panne (modèle). Sa température est de $-18$ °C au moment de la panne, et de $-6$ °C six heures plus tard.\na) Calcule le taux de variation de la température, en °C par heure.\nb) La température est-elle en hausse ou en baisse ? Écris hausse ou baisse.\nc) Si ce rythme continue, quelle sera la température 9 heures après la panne ?",
          reponses: [
            { question: "a)", attendu: ["2", "2 °C", "2°C", "2 °C/h", "2°C/h", "2 °C par heure"] },
            { question: "b)", attendu: "hausse" },
            { question: "c)", attendu: ["0", "0 °C", "0°C"] },
          ],
          correction:
            "a) $\\dfrac{-6 - (-18)}{6 - 0} = \\dfrac{-6 + 18}{6} = \\dfrac{12}{6} = 2$ °C par heure.\nb) Le taux est positif : la température est en hausse.\nc) Trois heures de plus : $3 \\times 2 = 6$ °C de plus, et $-6 + 6 = 0$ °C.\n⛔ Le piège au a) : calculer $-6 - 18 = -24$. Retirer $-18$, c'est ajouter 18.\nRéponse : a) 2 °C par heure ; b) hausse ; c) 0 °C.",
          micros: ["fct_taux_interpreter"],
        },
        {
          enonce:
            "Une community manager suit la fréquentation d'un site (modèle) : 800 visiteurs le jour 3, et 500 visiteurs le jour 8.\na) Calcule le taux de variation de la fréquentation, en visiteurs par jour.\nb) Sur cette période, la fréquentation est-elle en hausse ou en baisse ? Écris hausse ou baisse.\nc) Si ce rythme continue, combien de visiteurs y aura-t-il le jour 10 ?",
          reponses: [
            { question: "a)", attendu: "-60" },
            { question: "b)", attendu: "baisse" },
            { question: "c)", attendu: "380" },
          ],
          correction:
            "a) $\\dfrac{500 - 800}{8 - 3} = \\dfrac{-300}{5} = -60$ visiteurs par jour.\nb) Le taux est négatif : baisse, de 60 visiteurs par jour en moyenne.\nc) Deux jours de plus : $2 \\times (-60) = -120$, et $500 - 120 = 380$ visiteurs.\n⛔ Le piège au a) : oublier le signe et répondre 60. Le signe dit justement si ça monte ou si ça baisse.\nRéponse : a) $-60$ ; b) baisse ; c) 380.",
          micros: ["fct_taux_interpreter"],
        },
        {
          enonce:
            "Une médiatrice de musée suit le nombre de visiteurs présents, en centaines, $x$ heures après l'ouverture (modèle). La courbe représente $f(x) = -x^2 + 6x$, et la droite orange est la sécante passant par les points d'abscisses 1 et 5.\na) Calcule $f(1)$.\nb) Calcule $f(5)$.\nc) Quel est le taux de variation de $f$ entre 1 et 5 ?\nd) Le nombre de visiteurs reste-t-il constant entre 1 h et 5 h ? Réponds oui ou non.\ne) Calcule le taux de variation de $f$ entre 1 et 3.",
          figure: repere([-1, 7, -1, 10], [{ q: [-1, 6, 0] }, { pts: [[0, 5], [6, 5]], couleur: ORANGE }], [{ x: 1, y: 5 }, { x: 5, y: 5 }], undefined, true),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "a) $f(1) = -1 + 6 = 5$.\nb) $f(5) = -25 + 30 = 5$.\nc) $\\dfrac{5 - 5}{5 - 1} = 0$ : la sécante est horizontale.\nd) Non : la courbe monte jusqu'à $f(3) = 9$, puis redescend.\ne) $\\dfrac{9 - 5}{3 - 1} = \\dfrac{4}{2} = 2$.\n⛔ Le piège au d) : conclure « taux nul, donc constant ». Le taux compare les deux extrémités et ne dit rien de ce qui se passe entre les deux.\nRéponse : a) 5 ; b) 5 ; c) 0 ; d) non ; e) 2.",
          micros: ["fct_taux_secante"],
        },
        {
          enonce:
            "Une hydrologue suit la hauteur d'une rivière, en mètres, $x$ jours après une crue (modèle). La droite orange est la sécante qui joint les points $A(2\\,;\\,5)$ et $B(6\\,;\\,3)$.\na) Calcule le coefficient directeur de cette sécante.\nb) En moyenne, de combien de mètres la rivière baisse-t-elle par jour entre le jour 2 et le jour 6 ?",
          figure: repere(
            [-1, 9, -1, 7],
            [
              { pts: [[0, 5], [1, 5.5], [2, 5], [3, 4.5], [4, 3.8], [5, 3.3], [6, 3], [7, 3.2], [8, 3.5]] },
              { pts: [[2, 5], [6, 3]], couleur: ORANGE },
            ],
            [{ x: 2, y: 5, label: "A" }, { x: 6, y: 3, label: "B" }],
          ),
          reponses: [
            { question: "a)", attendu: "-0,5" },
            { question: "b)", attendu: ["0,5 m", "0,5 m par jour"] },
          ],
          correction:
            "a) $\\dfrac{3 - 5}{6 - 2} = \\dfrac{-2}{4} = -0{,}5$.\nb) Ce coefficient est aussi le taux de variation de la hauteur entre le jour 2 et le jour 6 : $-0{,}5$ m par jour, soit une baisse moyenne de 0,5 m par jour.\n⛔ Le piège : croire qu'elle baisse de 0,5 m CHAQUE jour. La courbe ne descend pas régulièrement : le taux donne une MOYENNE.\nRéponse : a) $-0{,}5$ ; b) 0,5 m par jour.",
          micros: ["fct_taux_secante", "fct_taux_interpreter"],
        },
        {
          enonce:
            "La responsable d'un atelier textile modélise le coût de production par $C(x) = x^2 + 10x$, où $x$ est le nombre de centaines de pièces, et $C(x)$ le coût en centaines d'euros.\na) Calcule $C(2)$.\nb) Calcule $C(4)$.\nc) Calcule le taux de variation de $C$ entre 2 et 4.\nd) Calcule le taux de variation de $C$ entre 4 et 6.\ne) Le coût augmente-t-il de plus en plus vite ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "56" },
            { question: "c)", attendu: "16" },
            { question: "d)", attendu: "20" },
            { question: "e)", attendu: "oui" },
          ],
          correction:
            "a) $C(2) = 4 + 20 = 24$.\nb) $C(4) = 16 + 40 = 56$.\nc) $\\dfrac{56 - 24}{4 - 2} = \\dfrac{32}{2} = 16$.\nd) $C(6) = 36 + 60 = 96$, puis $\\dfrac{96 - 56}{6 - 4} = \\dfrac{40}{2} = 20$.\ne) Le taux passe de 16 à 20 : oui, le coût augmente de plus en plus vite.\n⛔ Le piège au c) : répondre 32. C'est l'écart des coûts : il reste à le diviser par $4 - 2 = 2$.\nRéponse : a) 24 ; b) 56 ; c) 16 ; d) 20 ; e) oui.",
          micros: ["fct_taux_calculer"],
        },
        {
          enonce:
            "Une démographe étudie une commune (modèle) : 4 000 habitants en 2015, et 4 300 habitants en 2020.\na) Calcule le taux de variation de la population, en habitants par an.\nb) Que signifie ce nombre ? Écris le numéro.\n1. La hausse de la population en pourcentage, chaque année.\n2. Le nombre d'habitants de la commune.\n3. La hausse moyenne de la population, en habitants par an.\nc) Si ce rythme continue, combien d'habitants y aura-t-il en 2025 ?",
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "4 600" },
          ],
          correction:
            "a) $\\dfrac{4\\,300 - 4\\,000}{2020 - 2015} = \\dfrac{300}{5} = 60$ habitants par an.\nb) Des habitants par an : c'est la phrase 3.\nc) Cinq ans de plus : $5 \\times 60 = 300$, et $4\\,300 + 300 = 4\\,600$ habitants.\n⛔ Le piège au b) : lire 60 comme un pourcentage. Ce nombre a une unité : des habitants par an.\nRéponse : a) 60 ; b) 3 ; c) 4 600.",
          micros: ["fct_taux_interpreter"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs calculs de taux : on compare, on prévoit, on dit ce que le taux ne montre pas.",
      rappel: [
        "On calcule toujours un taux sur un intervalle précis : changer d'intervalle change le taux.",
        "Prévoir : valeur d'arrivée = valeur de départ + taux × durée, si le rythme ne change pas.",
        "Deux courbes qui partent et arrivent aux mêmes points ont le même taux, même si elles n'évoluent pas de la même façon.",
      ],
      exercices: [
        {
          titre: "L'allure de la coureuse",
          enonce:
            "Une coureuse, Awa, note la distance parcourue sur un marathon d'entraînement de 42 km (modèle).\na) Calcule sa vitesse moyenne entre 0 h et 2 h, en km/h.\nb) Calcule sa vitesse moyenne entre 2 h et 4 h, en km/h.\nc) Calcule sa vitesse moyenne sur toute la course, en km/h.\nd) Sur quelle moitié a-t-elle couru le plus vite ? Écris 1 pour la première, 2 pour la seconde.",
          figure: grille(["Temps (h)", "Distance (km)"], [[0, 0], [1, 12], [2, 23], [3, 32], [4, 42]]),
          reponses: [
            { question: "a)", attendu: "11,5 km/h" },
            { question: "b)", attendu: "9,5 km/h" },
            { question: "c)", attendu: "10,5 km/h" },
            { question: "d)", attendu: "1" },
          ],
          correction:
            "a) $\\dfrac{23 - 0}{2 - 0} = 11{,}5$ km/h.\nb) $\\dfrac{42 - 23}{4 - 2} = \\dfrac{19}{2} = 9{,}5$ km/h.\nc) $\\dfrac{42 - 0}{4 - 0} = 10{,}5$ km/h.\nd) 11,5 est plus grand que 9,5 : elle a couru plus vite sur la première moitié.\n⛔ Le piège au b) : diviser 42 par 4 ou 23 par 2. On prend les écarts sur L'INTERVALLE demandé.\nRéponse : a) 11,5 km/h ; b) 9,5 km/h ; c) 10,5 km/h ; d) 1.",
          micros: ["fct_taux_calculer", "fct_taux_interpreter"],
        },
        {
          titre: "Le coût de l'imprimeur",
          enonce:
            "Un imprimeur modélise son coût par $C(x) = 0{,}5x^2 + 4x + 10$, où $x$ est le nombre de centaines de livres et $C(x)$ le coût en centaines d'euros.\na) Calcule $C(2)$.\nb) Calcule $C(4)$.\nc) Calcule le taux de variation de $C$ entre 2 et 4.\nd) Entre 200 et 400 livres, combien d'euros coûte en moyenne chaque livre de plus ?\ne) Calcule le taux de variation de $C$ entre 4 et 6.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "34" },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "7 €" },
            { question: "e)", attendu: "9" },
          ],
          correction:
            "a) $C(2) = 0{,}5 \\times 4 + 8 + 10 = 2 + 8 + 10 = 20$.\nb) $C(4) = 0{,}5 \\times 16 + 16 + 10 = 8 + 16 + 10 = 34$.\nc) $\\dfrac{34 - 20}{4 - 2} = \\dfrac{14}{2} = 7$.\nd) Le taux vaut 7 centaines d'euros par centaine de livres, soit 700 € pour 100 livres : 7 € par livre.\ne) $C(6) = 18 + 24 + 10 = 52$, puis $\\dfrac{52 - 34}{6 - 4} = \\dfrac{18}{2} = 9$.\n⛔ Le piège au d) : répondre 700 €. Ces 700 € sont pour 100 livres, pas pour un seul.\nRéponse : a) 20 ; b) 34 ; c) 7 ; d) 7 € ; e) 9.",
          micros: ["fct_taux_calculer", "fct_taux_interpreter"],
        },
        {
          titre: "La retenue du barrage",
          enonce:
            "Le gestionnaire d'un barrage suit le volume d'eau de sa retenue, en millions de m³ (modèle) : 80 au jour 0, et 50 au jour 10.\na) Calcule le taux de variation du volume, en millions de m³ par jour.\nb) Si ce rythme continue, quel sera le volume au jour 14 ?\nc) Si ce rythme continue, quel jour le volume sera-t-il de 20 millions de m³ ?",
          reponses: [
            { question: "a)", attendu: "-3" },
            { question: "b)", attendu: ["38", "38 millions", "38 millions de m³"] },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "a) $\\dfrac{50 - 80}{10 - 0} = \\dfrac{-30}{10} = -3$ : le volume baisse de 3 millions de m³ par jour en moyenne.\nb) Quatre jours de plus : $4 \\times (-3) = -12$, et $50 - 12 = 38$ millions de m³.\nc) Il faut descendre de 50 à 20, soit de 30 : $30 \\div 3 = 10$ jours de plus après le jour 10, donc le jour 20.\n⛔ Le piège au c) : répondre 10. C'est le nombre de jours APRÈS le jour 10, pas le numéro du jour.\nRéponse : a) $-3$ ; b) 38 millions de m³ ; c) le jour 20.",
          micros: ["fct_taux_interpreter"],
        },
        {
          titre: "Les deux magasins",
          enonce:
            "Une directrice commerciale compare le chiffre d'affaires mensuel de deux magasins, en milliers d'euros, $x$ mois après l'ouverture (modèle). La droite bleue représente le magasin A, la courbe orange le magasin B : $B(x) = -0{,}5x^2 + 4x + 2$.\na) Calcule le taux de variation de A entre 0 et 6.\nb) Calcule le taux de variation de B entre 0 et 6.\nc) Calcule le taux de variation de B entre 4 et 6.\nd) Un collègue, Hugo, dit : « même taux entre 0 et 6, donc les deux magasins ont évolué de la même façon ». Réponds vrai ou faux.",
          figure: repere([-1, 8, -1, 11], [{ q: [0, 1, 2] }, { q: [-0.5, 4, 2], couleur: ORANGE }], [{ x: 0, y: 2 }, { x: 6, y: 8 }], undefined, true),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "-1" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) On lit $A(0) = 2$ et $A(6) = 8$ : $\\dfrac{8 - 2}{6 - 0} = 1$.\nb) $B(0) = 2$ et $B(6) = -18 + 24 + 2 = 8$ : $\\dfrac{8 - 2}{6 - 0} = 1$.\nc) $B(4) = -8 + 16 + 2 = 10$ : $\\dfrac{8 - 10}{6 - 4} = \\dfrac{-2}{2} = -1$.\nd) Faux : A monte régulièrement, alors que B monte jusqu'à 10 puis redescend. Les deux ont la même sécante, pas la même histoire.\n⛔ Le piège : conclure avec un seul taux. Il ne compare que le début et la fin.\nRéponse : a) 1 ; b) 1 ; c) $-1$ ; d) faux.",
          micros: ["fct_taux_calculer", "fct_taux_secante"],
        },
      ],
    },
  ],
};
