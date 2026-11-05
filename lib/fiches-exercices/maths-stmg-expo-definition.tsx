// ─── Fiche d'exercices : la fonction x ↦ aˣ, définition (STMG, Tle) — 20 exercices
//
// Notion expo_definition du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts`). En STMG,
// l'exponentielle est de BASE a : aucun nombre e, aucun logarithme ici. Le coach
// demande : reconnaître aˣ (variable à l'exposant), écrire k × aˣ depuis un
// pourcentage répété, prolonger une suite géométrique aux durées non entières,
// calculer une image (y compris chercher l'exposant par essais), et a⁻ˣ = 1 ÷ aˣ,
// y compris le sens « il y a x années » de f(−x).
//
// ⭐ LA SEULE DONNÉE RÉELLE, sourcée :
//   · ex. 14 — la période (demi-vie) du carbone 14 vaut environ 5 730 ans
//     (valeur de référence de la datation au radiocarbone, dite « période de
//     Cambridge »).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs et reconnaissances nus (ex. 1 à 8) ; biologie
// (biologiste), énergie
// (chargé de mission), plantes (paysagiste), épargne (conseiller bancaire), musée
// (directrice), archéologie (archéologue), analyse de l'eau (technicienne),
// podcast (responsable marketing), forêt (forestier), santé (infirmière),
// café-restauration (gérante), cyclisme (entraîneur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-exponentielle.mjs`.
//
// Micro-compétences : expoT_reconnaitre (1, 2, 9, 10, 16, 17, 18),
// expoT_prolongement (8, 11, 12, 20), expoT_calculer_image (3, 4, 5, 9, 10, 11,
// 12, 14, 15, 16, 17, 18, 19, 20), expoT_exposant_negatif (6, 7, 13, 15, 17, 18,
// 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere } from "@/lib/fiches-exercices/figures";

export const exercicesExpoDefinitionStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "expo-definition",
  titre: "La fonction x ↦ aˣ : définition",
  accroche:
    "Vingt exercices pour reconnaître une fonction exponentielle et s'en servir : la variable à l'exposant, le calcul d'une image, l'exposant négatif, et le prolongement d'une suite géométrique aux durées non entières. Des bactéries, un musée, une datation au carbone 14, un podcast, une forêt, un entraînement de cyclisme. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : repérer l'exposant, calculer une image, ou passer à l'inverse.",
      rappel: [
        "Une fonction exponentielle de base $a$ (avec $a > 0$) s'écrit $f(x) = a^x$ : la variable $x$ est à l'EXPOSANT, la base est un nombre fixe.",
        "Pour un exposant entier, on multiplie la base par elle-même : $2^3 = 2 \\times 2 \\times 2 = 8$. Et $a^0 = 1$, quelle que soit la base.",
        "Un exposant négatif donne l'inverse : $a^{-x} = \\dfrac{1}{a^x}$. Le résultat reste positif.",
        "La fonction $f(x) = k \\times a^x$ prolonge la suite géométrique $u(n) = k \\times a^n$ : aux rangs entiers, elles donnent la même valeur.",
      ],
      exercices: [
        {
          enonce:
            "Parmi ces expressions, laquelle définit une fonction exponentielle ? Réponds par la lettre.\nA. $f(x) = x^3$\nB. $f(x) = 1{,}5^x$\nC. $f(x) = 5x$\nD. $f(x) = 2x^2$",
          reponses: [{ attendu: "B" }],
          correction:
            "On regarde où se trouve $x$.\nDans $1{,}5^x$, $x$ est à l'exposant et la base est un nombre fixe : c'est une exponentielle.\nDans $x^3$ et $2x^2$, $x$ est à la base. Dans $5x$, il n'y a pas d'exposant.\n⛔ Le piège : choisir A parce qu'on y voit un exposant. Il faut que ce soit $x$, l'exposant.\nRéponse : B.",
          micros: ["expoT_reconnaitre"],
        },
        {
          enonce:
            "Chacune de ces fonctions est-elle une fonction exponentielle ? Réponds oui ou non.\na) $f(x) = 0{,}8^x$\nb) $g(x) = x^4$\nc) $h(x) = 3^x$\nd) $m(x) = 3x$",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "On cherche $x$ à l'exposant, avec une base positive et fixe.\na) $0{,}8^x$ : $x$ est à l'exposant, oui.\nb) $x^4$ : $x$ est à la base, non.\nc) $3^x$ : $x$ est à l'exposant, oui.\nd) $3x$ : $3$ est multiplié par $x$, non.\n⛔ Le piège au a) : croire qu'une base plus petite que 1 est interdite. Il suffit que $a$ soit positif.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["expoT_reconnaitre"],
        },
        {
          enonce: "Soit $f(x) = 2^x$. Calcule $f(5)$.",
          reponses: [{ attendu: "32", exact: true }],
          correction:
            "On remplace $x$ par 5 : $f(5) = 2^5$.\nL'exposant dit combien de facteurs on multiplie : $2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$.\n⛔ Le piège : calculer $2 \\times 5 = 10$. L'exposant n'est pas un facteur.\nRéponse : 32.",
          micros: ["expoT_calculer_image"],
        },
        {
          enonce:
            "Soit $f(x) = 0{,}5^x$.\na) Calcule $f(3)$.\nb) Calcule $f(0)$.",
          reponses: [
            { question: "a)", attendu: ["0,125", "1/8"], exact: true },
            { question: "b)", attendu: "1", exact: true },
          ],
          correction:
            "a) $f(3) = 0{,}5 \\times 0{,}5 \\times 0{,}5 = 0{,}125$, c'est-à-dire $\\dfrac{1}{8}$.\nb) $f(0) = 0{,}5^0 = 1$ : toute base positive à la puissance 0 vaut 1.\n⛔ Le piège au a) : calculer $0{,}5 \\times 3 = 1{,}5$. Et au b) : répondre 0.\nRéponse : a) 0,125 ; b) 1.",
          micros: ["expoT_calculer_image"],
        },
        {
          enonce: "Soit $f(x) = 3^x$. Pour quelle valeur de $x$ a-t-on $f(x) = 81$ ?",
          reponses: [{ attendu: "4" }],
          correction:
            "On dresse la liste des puissances de 3, jusqu'à tomber sur 81.\n$3^1 = 3$ ; $3^2 = 9$ ; $3^3 = 27$ ; $3^4 = 81$.\nDonc $x = 4$.\n⛔ Le piège : calculer $81 \\div 3 = 27$. On cherche l'exposant, pas un quotient.\nRéponse : $x = 4$.",
          micros: ["expoT_calculer_image"],
        },
        {
          enonce: "Que vaut $2^{-3}$ ? Donne le résultat sous forme décimale.",
          reponses: [{ attendu: "0,125", exact: true }],
          correction:
            "Un exposant négatif donne l'inverse : $2^{-3} = \\dfrac{1}{2^3}$.\nOn calcule la puissance positive : $2^3 = 8$.\nPuis l'inverse : $1 \\div 8 = 0{,}125$.\n⛔ Le piège : répondre $-8$. Un exposant négatif ne rend pas le résultat négatif.\nRéponse : 0,125.",
          micros: ["expoT_exposant_negatif"],
        },
        {
          enonce:
            "Écris chaque nombre sous forme décimale.\na) $10^{-2}$\nb) $5^{-1}$",
          reponses: [
            { question: "a)", attendu: "0,01", exact: true },
            { question: "b)", attendu: "0,2", exact: true },
          ],
          correction:
            "a) $10^{-2} = \\dfrac{1}{10^2} = 1 \\div 100 = 0{,}01$.\nb) $5^{-1} = \\dfrac{1}{5^1} = 1 \\div 5 = 0{,}2$.\n⛔ Le piège au a) : écrire $-100$. Le signe moins de l'exposant veut dire « inverse », pas « négatif ».\nRéponse : a) 0,01 ; b) 0,2.",
          micros: ["expoT_exposant_negatif"],
        },
        {
          enonce:
            "La suite géométrique $u(n) = 3 \\times 2^n$ est prolongée par la fonction $f(x) = 3 \\times 2^x$.\na) Calcule $u(2)$.\nb) Calcule $f(2)$.\nc) Ces deux valeurs sont-elles égales ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "12", exact: true },
            { question: "b)", attendu: "12", exact: true },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) La puissance d'abord : $2^2 = 4$, puis $u(2) = 3 \\times 4 = 12$.\nb) Même calcul : $f(2) = 3 \\times 2^2 = 12$.\nc) Oui : aux rangs entiers, la fonction passe exactement par les points de la suite.\n⛔ Le piège au a) : calculer $(3 \\times 2)^2 = 36$. La puissance porte seulement sur le 2.\nRéponse : a) 12 ; b) 12 ; c) oui.",
          micros: ["expoT_prolongement"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : repérer la valeur de départ et la base avant de calculer.",
      rappel: [
        "Un pourcentage répété se modélise par $f(x) = k \\times a^x$ : $k$ est la valeur de départ, $a$ le coefficient multiplicateur. Hausse de 4 % : $a = 1{,}04$. Baisse de 7 % : $a = 0{,}93$.",
        "Une suite ne donne de valeurs qu'aux rangs entiers. La fonction donne aussi les durées non entières : 9 mois, c'est $x = 0{,}75$ année.",
        "Si $x$ compte les années à partir d'aujourd'hui, $f(-3)$ est la valeur d'il y a 3 ans.",
      ],
      exercices: [
        {
          enonce:
            "Une biologiste observe une culture de 500 bactéries. Leur nombre double chaque heure (modèle).\na) Écris la fonction $f$ qui donne le nombre de bactéries au bout de $x$ heures.\nb) Calcule $f(3)$.",
          reponses: [
            { question: "a)", attendu: "500 × 2^x" },
            { question: "b)", attendu: "4 000" },
          ],
          correction:
            "a) Doubler, c'est multiplier par 2 : la base est 2. La valeur de départ est 500.\nDonc $f(x) = 500 \\times 2^x$.\nb) $2^3 = 8$, puis $f(3) = 500 \\times 8 = 4\\,000$.\n⛔ Le piège au a) : écrire $500 + 2x$. Ce serait 2 bactéries de plus par heure, pas un doublement.\nRéponse : a) $f(x) = 500 \\times 2^x$ ; b) 4 000 bactéries.",
          micros: ["expoT_reconnaitre", "expoT_calculer_image"],
        },
        {
          enonce:
            "Un chargé de mission suit un bâtiment qui consomme 800 MWh par an. Sa consommation baisse de 5 % par an (modèle).\na) Quel est le coefficient multiplicateur annuel ?\nb) Écris la fonction $f$ qui donne la consommation au bout de $x$ années.\nc) Calcule la consommation au bout de 3 ans, arrondie à l'unité.",
          reponses: [
            { question: "a)", attendu: "0,95" },
            { question: "b)", attendu: "800 × 0,95^x" },
            { question: "c)", attendu: "686 MWh", tolerance: 0.5 },
          ],
          correction:
            "a) Une baisse de 5 % : $1 - 0{,}05 = 0{,}95$.\nb) Le coefficient devient la base, la consommation de départ devient $k$ : $f(x) = 800 \\times 0{,}95^x$.\nc) $f(3) = 800 \\times 0{,}95^3 = 685{,}9$, soit environ 686 MWh.\n⛔ Le piège au a) : prendre 0,05 comme base. Ce nombre est le taux : il resterait 5 % chaque année, pas 95 %.\nRéponse : a) 0,95 ; b) $f(x) = 800 \\times 0{,}95^x$ ; c) environ 686 MWh.",
          micros: ["expoT_reconnaitre", "expoT_calculer_image"],
        },
        {
          enonce:
            "Une paysagiste suit une plante couvre-sol. Sa surface, en m², est modélisée par $f(x) = 1{,}5^x$, où $x$ compte les années. Les points marqués donnent la surface en fin d'année ; la courbe prolonge la suite entre ces points.\na) Calcule $f(3)$.\nb) Calcule la surface au bout de 2,5 années, arrondie au centième.\nc) La suite géométrique donne-t-elle à elle seule une valeur au rang 2,5 ? Réponds oui ou non.",
          figure: repere([-1, 5, -1, 6], [{ pts: [[0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38], [3.5, 4.13], [4, 5.06]] }], [{ x: 0, y: 1 }, { x: 1, y: 1.5 }, { x: 2, y: 2.25 }, { x: 3, y: 3.38 }, { x: 4, y: 5.06 }]),
          reponses: [
            { question: "a)", attendu: "3,375" },
            { question: "b)", attendu: "2,76 m²", tolerance: 0.005 },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $f(3) = 1{,}5 \\times 1{,}5 \\times 1{,}5 = 3{,}375$.\nb) On garde la même base et on met la durée en exposant : $f(2{,}5) = 1{,}5^{2{,}5} \\approx 2{,}76$ m².\nc) Non : une suite n'a de valeurs qu'aux rangs entiers. C'est la fonction qui remplit les trous.\n⛔ Le piège au b) : prendre le milieu de $f(2) = 2{,}25$ et $f(3) = 3{,}375$. On trouverait 2,8125, mais la courbe n'est pas une droite.\nRéponse : a) 3,375 ; b) environ 2,76 m² ; c) non.",
          micros: ["expoT_prolongement", "expoT_calculer_image"],
        },
        {
          enonce:
            "Un conseiller bancaire présente un placement de 2 000 € qui rapporte 10 % par an (modèle). La valeur au bout de $x$ années est $f(x) = 2\\,000 \\times 1{,}1^x$.\na) Combien d'années font 18 mois ? Écris le nombre sous forme décimale.\nb) Calcule la valeur du placement au bout de 18 mois, arrondie à l'euro.",
          reponses: [
            { question: "a)", attendu: "1,5", exact: true },
            { question: "b)", attendu: "2 307 €", tolerance: 0.5 },
          ],
          correction:
            "a) Une année fait 12 mois : $18 \\div 12 = 1{,}5$ année.\nb) $f(1{,}5) = 2\\,000 \\times 1{,}1^{1{,}5} \\approx 2\\,307$ €.\n⛔ Le piège au b) : ajouter 15 % ($10 + 5$), ce qui donne 2 300 €. Les hausses se multiplient : elles ne s'ajoutent pas.\nRéponse : a) 1,5 ; b) environ 2 307 €.",
          micros: ["expoT_prolongement", "expoT_calculer_image"],
        },
        {
          enonce:
            "La directrice d'un musée modélise le nombre de visiteurs par $f(x) = 8\\,000 \\times 1{,}25^x$, où $x$ compte les années à partir d'aujourd'hui (modèle).\na) Calcule $f(-2)$.\nb) Que représente $f(-2)$ ? Réponds par la lettre.\nA. Le nombre de visiteurs dans 2 ans.\nB. Le nombre de visiteurs il y a 2 ans.\nC. La baisse totale sur 2 ans.",
          reponses: [
            { question: "a)", attendu: "5 120" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "a) $1{,}25^2 = 1{,}5625$, et l'exposant négatif donne l'inverse.\n$f(-2) = 8\\,000 \\times 1{,}25^{-2} = 8\\,000 \\div 1{,}5625 = 5\\,120$.\nb) $x$ compte les années à partir d'aujourd'hui : $x = -2$, c'est 2 ans en arrière.\nVérification : $5\\,120 \\times 1{,}5625 = 8\\,000$. ✔\n⛔ Le piège au a) : calculer $f(2) = 12\\,500$, c'est-à-dire l'avenir au lieu du passé.\nRéponse : a) 5 120 ; b) B.",
          micros: ["expoT_exposant_negatif"],
        },
        {
          enonce:
            "Une archéologue date un os. La proportion de carbone 14 qui reste au bout de $x$ périodes de 5 730 ans est $f(x) = 0{,}5^x$.\na) Quelle proportion reste-t-il au bout de 2 périodes ? Donne-la en pourcentage.\nb) Même question au bout de 3 périodes.\nc) L'os contient encore une proportion de 0,0625. Combien de périodes se sont écoulées ?\nd) Quel âge l'os a-t-il, en années ?",
          reponses: [
            { question: "a)", attendu: "25 %", exact: true },
            { question: "b)", attendu: "12,5 %", exact: true },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "22 920 ans" },
          ],
          correction:
            "a) $0{,}5^2 = 0{,}25$, soit 25 %.\nb) $0{,}5^3 = 0{,}125$, soit 12,5 %.\nc) On continue la liste : $0{,}5^4 = 0{,}0625$. Il s'est donc écoulé 4 périodes.\nd) $4 \\times 5\\,730 = 22\\,920$ ans.\n⛔ Le piège au d) : répondre 4. Le 4 compte des périodes, pas des années : l'unité de $x$, c'est 5 730 ans.\nRéponse : a) 25 % ; b) 12,5 % ; c) 4 ; d) 22 920 ans.",
          micros: ["expoT_calculer_image"],
        },
        {
          enonce:
            "Une technicienne d'analyse de l'eau dilue un échantillon. Chaque étape divise la concentration par 10 : au bout de $x$ étapes, il reste la fraction $f(x) = 10^{-x}$ de la concentration de départ.\na) Écris $f(2)$ sous forme décimale.\nb) Écris $f(4)$ sous forme décimale.\nc) Au bout de combien d'étapes reste-t-il 0,001 de la concentration de départ ?",
          reponses: [
            { question: "a)", attendu: "0,01", exact: true },
            { question: "b)", attendu: "0,0001", exact: true },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) $10^{-2} = \\dfrac{1}{10^2} = 0{,}01$.\nb) $10^{-4} = \\dfrac{1}{10^4} = 0{,}0001$.\nc) $0{,}001 = \\dfrac{1}{1\\,000} = \\dfrac{1}{10^3} = 10^{-3}$, donc 3 étapes.\n⛔ Le piège au a) : écrire $-100$. Une concentration n'est jamais négative, et $10^{-2}$ non plus.\nRéponse : a) 0,01 ; b) 0,0001 ; c) 3 étapes.",
          micros: ["expoT_exposant_negatif", "expoT_calculer_image"],
        },
        {
          enonce:
            "Une responsable marketing lance un podcast qui compte 1 000 abonnés. Deux scénarios (modèle) :\nA : 200 abonnés de plus chaque mois.\nB : 20 % d'abonnés de plus chaque mois.\na) Quel scénario se modélise par une fonction exponentielle ? Réponds A ou B.\nb) Écris la fonction $f$ de ce scénario, avec $x$ en mois.\nc) Calcule $f(6)$, arrondi à l'unité.\nd) Combien d'abonnés donne l'autre scénario au bout de 6 mois ?",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "1 000 × 1,2^x" },
            { question: "c)", attendu: "2 986", tolerance: 0.5 },
            { question: "d)", attendu: "2 200" },
          ],
          correction:
            "a) Un pourcentage répété donne une exponentielle : c'est B.\nb) Une hausse de 20 % donne le coefficient 1,2 : $f(x) = 1\\,000 \\times 1{,}2^x$.\nc) $f(6) = 1\\,000 \\times 1{,}2^6 \\approx 2\\,986$.\nd) Le scénario A ajoute le même nombre : $1\\,000 + 6 \\times 200 = 2\\,200$.\n⛔ Le piège au a) : croire que les deux se valent parce qu'ils donnent 1 200 au bout d'un mois. Ensuite, B accélère.\nRéponse : a) B ; b) $f(x) = 1\\,000 \\times 1{,}2^x$ ; c) environ 2 986 ; d) 2 200.",
          micros: ["expoT_reconnaitre", "expoT_calculer_image"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : écrire le modèle, le traduire en durées, calculer, puis lire le résultat.",
      rappel: [
        "On commence toujours par écrire $f(x) = k \\times a^x$ : le reste en découle.",
        "On traduit chaque question en valeur de $x$ : 3 ans et 9 mois, c'est $x = 3{,}75$ ; il y a 4 ans, c'est $x = -4$.",
        "Avant de répondre, on regarde si le résultat est plausible : avant une hausse, la valeur était plus petite.",
      ],
      exercices: [
        {
          titre: "Le bois de la forêt",
          enonce:
            "Un forestier estime le bois d'une parcelle à 400 m³ aujourd'hui, avec une hausse de 3 % par an (modèle).\na) Écris la fonction $f$ qui donne le volume au bout de $x$ années.\nb) Calcule le volume dans 10 ans, arrondi à l'unité.\nc) Calcule le volume dans 2 ans et 6 mois, arrondi à l'unité.\nd) Calcule le volume qu'il y avait il y a 5 ans, arrondi à l'unité.",
          reponses: [
            { question: "a)", attendu: "400 × 1,03^x" },
            { question: "b)", attendu: "538 m³", tolerance: 0.5 },
            { question: "c)", attendu: "431 m³", tolerance: 0.5 },
            { question: "d)", attendu: "345 m³", tolerance: 0.5 },
          ],
          correction:
            "a) Hausse de 3 % : coefficient 1,03. Donc $f(x) = 400 \\times 1{,}03^x$.\nb) $f(10) = 400 \\times 1{,}03^{10} \\approx 538$ m³.\nc) 2 ans et 6 mois, c'est $x = 2{,}5$ : $f(2{,}5) = 400 \\times 1{,}03^{2{,}5} \\approx 431$ m³.\nd) Il y a 5 ans, c'est $x = -5$ : $f(-5) = 400 \\times 1{,}03^{-5} \\approx 345$ m³. C'est moins que 400 : c'est plausible.\n⛔ Le piège au d) : calculer $400 \\times 0{,}97^5$. Le coefficient de la hausse reste 1,03, seul l'exposant change de signe.\nRéponse : a) $f(x) = 400 \\times 1{,}03^x$ ; b) environ 538 m³ ; c) environ 431 m³ ; d) environ 345 m³.",
          micros: ["expoT_reconnaitre", "expoT_calculer_image", "expoT_exposant_negatif"],
        },
        {
          titre: "Le médicament",
          enonce:
            "Une infirmière suit un médicament : le sang en contient 200 mg au moment de la mesure, et la quantité baisse de 20 % par heure (modèle).\na) Quelle est la base du modèle ?\nb) Écris la fonction $f$ qui donne la quantité au bout de $x$ heures.\nc) Calcule la quantité au bout de 2 h 30, arrondie à l'unité.\nd) Reste-t-il plus de 50 mg au bout de 6 heures ? Réponds oui ou non.\ne) Calcule la quantité une heure avant la mesure.",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "200 × 0,8^x" },
            { question: "c)", attendu: "114 mg", tolerance: 0.5 },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "250 mg" },
          ],
          correction:
            "a) Baisse de 20 % : $1 - 0{,}2 = 0{,}8$.\nb) $f(x) = 200 \\times 0{,}8^x$.\nc) 2 h 30, c'est $x = 2{,}5$ : $200 \\times 0{,}8^{2{,}5} \\approx 114$ mg.\nd) $f(6) = 200 \\times 0{,}8^6 \\approx 52{,}4$ mg : c'est plus que 50 mg, donc oui.\ne) Une heure avant, c'est $x = -1$ : $f(-1) = 200 \\times 0{,}8^{-1} = 200 \\div 0{,}8 = 250$ mg.\n⛔ Le piège au e) : calculer $200 \\times 1{,}2 = 240$. Remonter une baisse de 20 %, c'est diviser par 0,8, pas ajouter 20 %.\nRéponse : a) 0,8 ; b) $f(x) = 200 \\times 0{,}8^x$ ; c) environ 114 mg ; d) oui ; e) 250 mg.",
          micros: ["expoT_reconnaitre", "expoT_calculer_image", "expoT_exposant_negatif"],
        },
        {
          titre: "Le chiffre d'affaires du café",
          enonce:
            "La gérante d'un café, Nora, modélise son chiffre d'affaires, en milliers d'euros, par $f(x) = 150 \\times 1{,}2^x$, où $x$ compte les années à partir d'aujourd'hui (modèle).\na) Que représente $f(-2)$ ? Réponds par la lettre.\nA. Le chiffre d'affaires dans 2 ans.\nB. Une valeur négative : le modèle n'a plus de sens.\nC. Le chiffre d'affaires il y a 2 ans.\nb) Calcule $f(-2)$, arrondi au centième.\nc) Son associé Malik affirme : « Un exposant négatif donne toujours un résultat négatif. » Réponds vrai ou faux.\nd) Calcule le chiffre d'affaires dans 6 mois, arrondi au centième.",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "104,17", tolerance: 0.005 },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "164,32", tolerance: 0.005 },
          ],
          correction:
            "a) $x = -2$ fait remonter de 2 ans dans le temps : c'est C.\nb) $1{,}2^2 = 1{,}44$, donc $f(-2) = 150 \\div 1{,}44 \\approx 104{,}17$ milliers d'euros.\nc) Faux : $a^{-x} = \\dfrac{1}{a^x}$ est l'inverse d'un nombre positif, donc reste positif.\nd) 6 mois, c'est $x = 0{,}5$ : $f(0{,}5) = 150 \\times 1{,}2^{0{,}5} \\approx 164{,}32$ milliers d'euros.\n⛔ Le piège au d) : remplacer $x$ par 6. L'unité de $x$ est l'année, pas le mois.\nRéponse : a) C ; b) environ 104,17 ; c) faux ; d) environ 164,32.",
          micros: ["expoT_calculer_image", "expoT_exposant_negatif"],
        },
        {
          titre: "L'entraînement de cyclisme",
          enonce:
            "Un entraîneur fait rouler Lucie 10 km au début de sa préparation, et il augmente la distance de 10 % par semaine (modèle). La distance après $n$ semaines est $u(n) = 10 \\times 1{,}1^n$.\na) Calcule $u(4)$, arrondi au centième.\nb) Écris la fonction $f$ qui prolonge cette suite.\nc) Calcule $f(4{,}5)$, arrondi au centième.\nd) Peut-on calculer $u(4{,}5)$ avec la suite ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "14,64 km", tolerance: 0.005 },
            { question: "b)", attendu: "10 × 1,1^x" },
            { question: "c)", attendu: "15,36 km", tolerance: 0.005 },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $u(4) = 10 \\times 1{,}1^4 = 14{,}641$, soit environ 14,64 km.\nb) La raison devient la base, le premier terme devient le coefficient, $n$ devient $x$ : $f(x) = 10 \\times 1{,}1^x$.\nc) $f(4{,}5) = 10 \\times 1{,}1^{4{,}5} \\approx 15{,}36$ km.\nd) Non : le rang d'une suite est un entier. La fonction seule accepte 4,5.\n⛔ Le piège au b) : écrire $1{,}1 \\times 10^x$. C'est la RAISON qui devient la base, pas le premier terme.\nRéponse : a) environ 14,64 km ; b) $f(x) = 10 \\times 1{,}1^x$ ; c) environ 15,36 km ; d) non.",
          micros: ["expoT_prolongement", "expoT_calculer_image"],
        },
      ],
    },
  ],
};
