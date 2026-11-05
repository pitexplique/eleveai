// ─── Fiche d'exercices : suite géométrique (STMG) — 20 exercices ────────────────
//
// Notion suite_geometrique du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : la raison par le QUOTIENT, terme suivant ÷ terme précédent (le sens
// compte), dérouler u(n+1) = q × u(n), remonter en divisant, et démontrer en
// montrant le quotient constant à partir de la situation. Termes strictement
// positifs. ⛔ Pas de u(n) = u(0) × qⁿ : le terme général est en terminale. Le sens
// de variation appartient à la notion suite_geo_evolution : il n'est pas ici.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 7) ; commerce (ex. 8, gérant) ;
// sociologie (sociologue), garage (gestionnaire), mer (biologiste marin), mutuelle
// (gestionnaire), forêt (agent forestier), café (torréfacteur), entreprise
// (responsable environnement), food-truck (cuisinière) ; banque (conseillère),
// parc naturel (écologue), festival (trésorière), pharmacologie (pharmacologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`.
//
// Micro-compétences : suite_geo_reconnaitre (1, 2, 3, 7, 11, 15, 16, 18),
// suite_geo_recurrence (4, 5, 6, 9, 10, 14, 15, 17, 18, 19, 20), suite_geo_demontrer
// (8, 12, 13, 16, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

/** Une relation s'accepte avec ou sans son membre de gauche, avec × ou *, en u(n) ou en u_n. */
const relationDe = (l: string) => (...droites: string[]) =>
  droites
    .flatMap((d) => [d, d.replace(/×/g, "*")])
    .flatMap((d) => {
      const indice = d.split(`${l}(n)`).join(`${l}_n`);
      return [d, `${l}(n+1) = ${d}`, indice, `${l}_{n+1} = ${indice}`, `${l}_(n+1) = ${indice}`, `${l}_n+1 = ${indice}`];
    });
const relation = relationDe("u");
const relationV = relationDe("v");

export const exercicesSuiteGeometriqueStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-geometrique",
  titre: "Suite géométrique",
  accroche:
    "Vingt exercices sur les suites où l'on multiplie toujours par le même nombre : trouver la raison par un quotient, dérouler la relation, remonter en divisant et démontrer qu'une suite est géométrique. Une rumeur, une voiture de société, un placement, un food-truck et un festival. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer la raison, avancer dans la suite, ou remonter.",
      rappel: [
        "Une suite est géométrique si l'on multiplie toujours par le même nombre $q$, la raison : $u(n+1) = q \\times u(n)$.",
        "La raison est un QUOTIENT : terme suivant ÷ terme précédent. On vérifie sur toutes les paires.",
        "Pour avancer, on multiplie par $q$ autant de fois qu'il y a de rangs. Pour remonter, on divise par $q$.",
        "Une hausse de t % à chaque étape donne un quotient constant : $1 + \\dfrac{t}{100}$.",
      ],
      exercices: [
        {
          enonce: "Le tableau donne les premiers termes d'une suite géométrique. Quelle est sa raison ?",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 16, 24, 36, 54]]),
          reponses: [{ attendu: "1,5" }],
          correction:
            "La raison est le terme suivant divisé par le précédent : $24 \\div 16 = 1{,}5$.\nVérification : $36 \\div 24 = 1{,}5$. ✔\n⛔ Le piège : soustraire ($24 - 16 = 8$). La différence sert aux suites arithmétiques, et ici elle n'est pas constante.\nRéponse : 1,5.",
          micros: ["suite_geo_reconnaitre"],
        },
        {
          enonce: "Voici les premiers termes d'une autre suite géométrique, qui descend. Quelle est sa raison ?",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 80, 40, 20, 10]]),
          reponses: [{ attendu: "0,5" }],
          correction:
            "Terme suivant ÷ terme précédent : $40 \\div 80 = 0{,}5$.\nVérification : $20 \\div 40 = 0{,}5$. ✔\n⛔ Le piège : répondre 2 en divisant à l'envers ($80 \\div 40$). Multiplier par 2 ferait monter, or la suite descend.\nRéponse : 0,5.",
          micros: ["suite_geo_reconnaitre"],
        },
        {
          enonce: "Une suite géométrique vérifie $u(1) = 20$ et $u(2) = 30$. Calcule sa raison.",
          reponses: [{ attendu: "1,5" }],
          correction:
            "On divise le terme suivant par le précédent : $30 \\div 20 = 1{,}5$.\nVérification : $20 \\times 1{,}5 = 30$. ✔\n⛔ Le piège : calculer $20 \\div 30$. On trouve environ 0,67, l'inverse de la raison.\nRéponse : 1,5.",
          micros: ["suite_geo_reconnaitre"],
        },
        {
          enonce: "Une suite est définie par $u(0) = 50$ et $u(n+1) = 3 \\times u(n)$. Calcule $u(2)$.",
          reponses: [{ attendu: "450" }],
          correction:
            "On multiplie une fois par rang franchi.\n$u(1) = 3 \\times 50 = 150$.\n$u(2) = 3 \\times 150 = 450$.\n⛔ Le piège : multiplier par 6 ($50 \\times 6 = 300$). Multiplier deux fois par 3, c'est multiplier par 9, pas par 6.\nRéponse : 450.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce: "Une suite géométrique a pour premier terme $u(0) = 100$ et pour raison $q = 1{,}5$. Calcule $u(3)$.",
          reponses: [{ attendu: "337,5" }],
          correction:
            "$u(1) = 100 \\times 1{,}5 = 150$.\n$u(2) = 150 \\times 1{,}5 = 225$.\n$u(3) = 225 \\times 1{,}5 = 337{,}5$.\n⛔ Le piège : ajouter 50 à chaque pas. La hausse grandit : 50, puis 75, puis 112,5.\nRéponse : 337,5.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce: "Une suite géométrique de raison $q = 2$ vérifie $u(3) = 160$. Que vaut $u(0)$ ?",
          reponses: [{ attendu: "20" }],
          correction:
            "Pour remonter d'un rang, on divise par la raison. Il y a 3 rangs à remonter.\n$u(2) = 160 \\div 2 = 80$.\n$u(1) = 80 \\div 2 = 40$.\n$u(0) = 40 \\div 2 = 20$.\n⛔ Le piège : multiplier par 2 au lieu de diviser. On s'éloigne du départ au lieu d'y revenir.\nRéponse : 20.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce: "Les premiers termes d'une suite sont $3$, $6$, $12$, $25$. Cette suite est-elle géométrique ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "On calcule tous les quotients : $6 \\div 3 = 2$, $12 \\div 6 = 2$, $25 \\div 12 \\approx 2{,}08$.\nLe dernier n'est pas égal à 2 : on ne multiplie pas toujours par le même nombre.\n⛔ Le piège : s'arrêter aux deux premiers quotients.\nRéponse : non.",
          micros: ["suite_geo_reconnaitre"],
        },
        {
          enonce:
            "Le gérant d'une boutique voit son chiffre d'affaires augmenter de 4 % chaque année (modèle). On note $u(n)$ ce chiffre l'année $n$. Quelle est la valeur du quotient $\\dfrac{u(n+1)}{u(n)}$ ?",
          reponses: [{ attendu: "1,04" }],
          correction:
            "Une hausse de 4 % multiplie par $1 + 0{,}04 = 1{,}04$ : $u(n+1) = 1{,}04 \\times u(n)$.\nOn divise par $u(n)$ : le quotient vaut 1,04, quel que soit $n$.\nComme il est constant, la suite est géométrique.\n⛔ Le piège : répondre 4 ou 0,04. Le 4 est le taux, 0,04 est le taux en décimal ; il manque le 1 qui représente la valeur de départ.\nRéponse : 1,04.",
          micros: ["suite_geo_demontrer"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : écrire la relation, avancer ou remonter, puis prouver que la suite est géométrique.",
      rappel: [
        "Une hausse de t % multiplie par $1 + \\dfrac{t}{100}$ ; une baisse de t % multiplie par $1 - \\dfrac{t}{100}$. Exemple : − 30 % donne $q = 0{,}7$.",
        "Démontrer : à partir de la situation, on écrit $u(n+1) = q \\times u(n)$, donc $\\dfrac{u(n+1)}{u(n)} = q$ pour tout $n$. Le quotient est constant.",
        "Vérifier sur trois termes ne démontre rien : cela ne fait que suggérer.",
        "Dans une suite géométrique, les différences changent. Ce n'est donc pas une suite arithmétique.",
      ],
      exercices: [
        {
          enonce:
            "Une sociologue étudie une rumeur (modèle). Le premier jour, 5 personnes la connaissent, notées $u(0)$. Chaque jour, ce nombre est multiplié par 3.\na) Complète la relation : $u(n+1) = \\ldots$\nb) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nc) Quelle est la raison ?",
          reponses: [
            { question: "a)", attendu: relation("3 × u(n)", "3u(n)", "3*u(n)", "u(n) × 3") },
            { question: "b)", attendu: "15 ; 45 ; 135", ordre: true },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) On multiplie par 3 : $u(n+1) = 3 \\times u(n)$.\nb) $5 \\times 3 = 15$, $15 \\times 3 = 45$, $45 \\times 3 = 135$.\nc) La raison est 3.\n⛔ Le piège au a) : écrire $u(n) + 3$. Multiplié par 3, ce n'est pas 3 personnes de plus.\nRéponse : a) u(n+1) = 3 × u(n) ; b) 15 ; 45 ; 135 ; c) 3.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce:
            "Une gestionnaire de garage suit la valeur d'une voiture de société : 20 000 € à l'achat, notés $u(0)$, puis une baisse de 20 % par an (modèle).\na) Quelle est la raison ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Calcule $u(1)$.\nd) Calcule $u(2)$.",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: relation("0,8 × u(n)", "0,8u(n)", "0,8*u(n)", "u(n) × 0,8") },
            { question: "c)", attendu: "16 000 €" },
            { question: "d)", attendu: "12 800 €" },
          ],
          correction:
            "a) Une baisse de 20 % multiplie par $1 - 0{,}2 = 0{,}8$.\nb) $u(n+1) = 0{,}8 \\times u(n)$.\nc) $20\\,000 \\times 0{,}8 = 16\\,000$ €.\nd) $16\\,000 \\times 0{,}8 = 12\\,800$ €.\n⛔ Le piège au d) : retirer encore 4 000 € et trouver 12 000 €. La deuxième baisse porte sur 16 000 €.\nRéponse : a) 0,8 ; b) u(n+1) = 0,8 × u(n) ; c) 16 000 € ; d) 12 800 €.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce:
            "Un biologiste marin compte des méduses sur deux plages fictives, suites A et B.\na) La suite A est-elle géométrique ? Réponds oui ou non.\nb) La suite B est-elle géométrique ? Réponds oui ou non.\nc) Quelle est la raison de celle qui est géométrique ?",
          figure: grille(["n", "A", "B"], [[0, 5, 5], [1, 15, 10], [2, 45, 20], [3, 135, 35]]),
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) A : $15 \\div 5 = 3$, $45 \\div 15 = 3$, $135 \\div 45 = 3$. Les quotients sont constants : oui.\nb) B : $10 \\div 5 = 2$, $20 \\div 10 = 2$, mais $35 \\div 20 = 1{,}75$. Non.\nc) La raison de A est 3.\n⛔ Le piège au b) : s'arrêter aux deux premiers quotients. Une seule paire qui diffère suffit à dire non.\nRéponse : a) oui ; b) non ; c) 3.",
          micros: ["suite_geo_reconnaitre"],
        },
        {
          enonce:
            "Une gestionnaire de mutuelle modélise la cotisation d'un contrat : 2 000 € la première année, notés $u(0)$, puis une hausse de 3 % par an.\na) Complète la relation : $u(n+1) = \\ldots$\nb) Quelle est la valeur du quotient $\\dfrac{u(n+1)}{u(n)}$ ?\nc) Calcule $u(1)$ et $u(2)$, dans cet ordre.\nd) Calcule $u(1) - u(0)$ et $u(2) - u(1)$, dans cet ordre.",
          reponses: [
            { question: "a)", attendu: relation("1,03 × u(n)", "1,03u(n)", "1,03*u(n)", "u(n) × 1,03") },
            { question: "b)", attendu: "1,03" },
            { question: "c)", attendu: "2 060 ; 2 121,8", ordre: true },
            { question: "d)", attendu: "60 ; 61,8", ordre: true },
          ],
          correction:
            "a) Une hausse de 3 % multiplie par 1,03 : $u(n+1) = 1{,}03 \\times u(n)$.\nb) En divisant par $u(n)$, le quotient vaut 1,03 pour tout $n$ : la suite est géométrique.\nc) $2\\,000 \\times 1{,}03 = 2\\,060$, puis $2\\,060 \\times 1{,}03 = 2\\,121{,}8$.\nd) $2\\,060 - 2\\,000 = 60$, et $2\\,121{,}8 - 2\\,060 = 61{,}8$ : les différences changent.\n⛔ Le piège : tester la différence pour démontrer. Ici, elle n'est pas constante : c'est le quotient qui l'est.\nRéponse : a) u(n+1) = 1,03 × u(n) ; b) 1,03 ; c) 2 060 ; 2 121,8 ; d) 60 ; 61,8.",
          micros: ["suite_geo_demontrer"],
        },
        {
          enonce:
            "Un agent forestier modélise une parcelle dont la surface boisée diminue de 5 % chaque année. On note $u(n)$ cette surface l'année $n$.\na) Pour démontrer que la suite est géométrique, que montre-t-on constant ? Écris « différence » ou « quotient ».\nb) Vérifier le quotient sur les trois premiers termes suffit-il à le démontrer ? Réponds oui ou non.\nc) Quelle est la raison ?",
          reponses: [
            { question: "a)", attendu: ["quotient", "le quotient"] },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "0,95" },
          ],
          correction:
            "a) Une suite géométrique se reconnaît à son quotient constant.\nb) Non : trois termes ne parlent pas de tous les autres. Une preuve doit être valable pour tout $n$.\nc) La baisse de 5 % se traduit par $u(n+1) = 0{,}95 \\times u(n)$ : le quotient vaut 0,95, quel que soit $n$. C'est la démonstration.\n⛔ Le piège au a) : répondre « différence », le test des suites arithmétiques.\nRéponse : a) quotient ; b) non ; c) 0,95.",
          micros: ["suite_geo_demontrer"],
        },
        {
          enonce:
            "Un torréfacteur modélise ses ventes de café, en kg, par une suite géométrique de raison $q = 1{,}5$. Il a vendu $u(2) = 90$ kg.\na) Que valait $u(1)$ ?\nb) Que valait $u(0)$ ?",
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "40" },
          ],
          correction:
            "Pour remonter, on divise par la raison.\na) $u(1) = 90 \\div 1{,}5 = 60$.\nb) $u(0) = 60 \\div 1{,}5 = 40$.\nVérification : $40 \\times 1{,}5 = 60$, puis $60 \\times 1{,}5 = 90$. ✔\n⛔ Le piège : multiplier par 1,5. On obtiendrait 135 puis 202,5, ce qui n'est pas le passé mais l'avenir.\nRéponse : a) 60 ; b) 40.",
          micros: ["suite_geo_recurrence"],
        },
        {
          enonce:
            "Une responsable environnement voit les achats de papier passer de 200 à 150 kg d'une année à l'autre, et prévoit la même baisse en pourcentage ensuite (modèle). On note $u(0) = 200$ et $u(1) = 150$.\na) Quelle est la raison ?\nb) Calcule $u(2)$.\nc) Calcule $u(3)$.",
          reponses: [
            { question: "a)", attendu: "0,75" },
            { question: "b)", attendu: "112,5" },
            { question: "c)", attendu: "84,375" },
          ],
          correction:
            "a) Terme suivant ÷ terme précédent : $150 \\div 200 = 0{,}75$.\nb) $150 \\times 0{,}75 = 112{,}5$.\nc) $112{,}5 \\times 0{,}75 = 84{,}375$.\n⛔ Le piège au a) : diviser dans l'autre sens ($200 \\div 150 \\approx 1{,}33$). Ce nombre annoncerait une hausse, alors que les achats baissent.\nRéponse : a) 0,75 ; b) 112,5 ; c) 84,375.",
          micros: ["suite_geo_reconnaitre", "suite_geo_recurrence"],
        },
        {
          enonce:
            "Une cuisinière de food-truck relève ses recettes mensuelles : 2 500 €, 3 000 €, 3 600 € (modèle).\na) Calcule les deux différences, dans l'ordre.\nb) Calcule les deux quotients, dans l'ordre.\nc) Quelle est la nature probable de la suite ? Écris « arithmétique » ou « géométrique ».\nd) En gardant ce rythme, quelle recette prévoir le mois suivant ?",
          reponses: [
            { question: "a)", attendu: "500 ; 600", ordre: true },
            { question: "b)", attendu: "1,2 ; 1,2", ordre: true },
            { question: "c)", attendu: "géométrique" },
            { question: "d)", attendu: "4 320 €" },
          ],
          correction:
            "a) $3\\,000 - 2\\,500 = 500$, et $3\\,600 - 3\\,000 = 600$ : les différences changent.\nb) $3\\,000 \\div 2\\,500 = 1{,}2$, et $3\\,600 \\div 3\\,000 = 1{,}2$ : les quotients sont égaux.\nc) La suite paraît géométrique, de raison 1,2.\nd) $3\\,600 \\times 1{,}2 = 4\\,320$ €.\n⛔ Le piège au d) : ajouter 600 et trouver 4 200 €. Le rythme est un coefficient, pas une quantité.\nRéponse : a) 500 ; 600 ; b) 1,2 ; 1,2 ; c) géométrique ; d) 4 320 €.",
          micros: ["suite_geo_reconnaitre", "suite_geo_demontrer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la situation, dérouler la suite, puis juger ce qu'on obtient.",
      rappel: [
        "Pourcentage constant : suite géométrique, $u(n+1) = q \\times u(n)$. Quantité constante : suite arithmétique, $u(n+1) = u(n) + r$.",
        "On calcule de proche en proche, un rang à la fois, avec le résultat exact du rang précédent.",
        "Dans une suite géométrique, ce qu'on gagne ou perd change à chaque pas.",
      ],
      exercices: [
        {
          titre: "Le placement",
          enonce:
            "Une conseillère de banque présente à Tom un placement fictif : 3 000 € au départ, notés $u(0)$, à 5 % par an, intérêts gardés sur le compte.\na) Quelle est la raison ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Donne $u(1)$ et $u(2)$, dans cet ordre.\nd) Quels sont les intérêts de la première et de la deuxième année ? Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: "1,05" },
            { question: "b)", attendu: relation("1,05 × u(n)", "1,05u(n)", "1,05*u(n)", "u(n) × 1,05") },
            { question: "c)", attendu: "3 150 ; 3 307,5", ordre: true },
            { question: "d)", attendu: "150 ; 157,5", ordre: true },
          ],
          correction:
            "a) Une hausse de 5 % multiplie par 1,05.\nb) $u(n+1) = 1{,}05 \\times u(n)$.\nc) $3\\,000 \\times 1{,}05 = 3\\,150$, puis $3\\,150 \\times 1{,}05 = 3\\,307{,}5$.\nd) $3\\,150 - 3\\,000 = 150$, et $3\\,307{,}5 - 3\\,150 = 157{,}5$.\n⛔ Le piège au d) : répondre deux fois 150. La deuxième année, les 5 % portent aussi sur les intérêts de la première.\nRéponse : a) 1,05 ; b) u(n+1) = 1,05 × u(n) ; c) 3 150 ; 3 307,5 ; d) 150 ; 157,5.",
          micros: ["suite_geo_recurrence"],
        },
        {
          titre: "Les lynx du parc",
          enonce:
            "Une écologue modélise la population de lynx d'un parc fictif. Les premiers relevés donnent $u(0) = 16$, $u(1) = 24$ et $u(2) = 36$.\na) Quelle est la raison ?\nb) Donne $u(3)$ et $u(4)$, dans cet ordre.\nc) Pour aller de $u(0)$ à $u(4)$, combien de fois multiplie-t-on ?\nd) Un stagiaire calcule $u(4) = 16 + 4 \\times 8 = 48$. Est-ce juste ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1,5" },
            { question: "b)", attendu: "54 ; 81", ordre: true },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $24 \\div 16 = 1{,}5$, et $36 \\div 24 = 1{,}5$.\nb) $36 \\times 1{,}5 = 54$, puis $54 \\times 1{,}5 = 81$.\nc) Quatre passages, donc 4 multiplications.\nd) Non : il ajoute 8 à chaque pas, comme pour une suite arithmétique. Le calcul juste donne 81.\n⛔ Le piège au c) : compter 5 multiplications, parce qu'il y a 5 valeurs de $u(0)$ à $u(4)$.\nRéponse : a) 1,5 ; b) 54 ; 81 ; c) 4 ; d) non.",
          micros: ["suite_geo_reconnaitre", "suite_geo_recurrence"],
        },
        {
          titre: "Le budget du festival",
          enonce:
            "La trésorière d'un festival fictif a un budget de 10 000 €. Plan A : + 5 % par an, noté $u(n)$. Plan B : + 500 € par an, noté $v(n)$. Au départ, $u(0) = v(0) = 10\\,000$.\na) Complète : $u(n+1) = \\ldots$\nb) Complète : $v(n+1) = \\ldots$\nc) Calcule $u(2)$ et $v(2)$, dans cet ordre.\nd) Lequel des deux plans donne une suite géométrique ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: relation("1,05 × u(n)", "1,05u(n)", "1,05*u(n)", "u(n) × 1,05") },
            { question: "b)", attendu: relationV("v(n) + 500", "500 + v(n)") },
            { question: "c)", attendu: "11 025 ; 11 000", ordre: true },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) 5 % : on multiplie, $u(n+1) = 1{,}05 \\times u(n)$.\nb) 500 € : on ajoute, $v(n+1) = v(n) + 500$.\nc) $u$ : 10 500, puis $10\\,500 \\times 1{,}05 = 11\\,025$. $v$ : 10 500, puis $10\\,500 + 500 = 11\\,000$.\nd) Le quotient de A vaut 1,05 pour tout $n$ : A est géométrique.\n⛔ Le piège : conclure que les deux plans sont pareils parce qu'ils donnent 10 500 la première année. Leurs années suivantes diffèrent.\nRéponse : a) u(n+1) = 1,05 × u(n) ; b) v(n+1) = v(n) + 500 ; c) 11 025 ; 11 000 ; d) A.",
          micros: ["suite_geo_recurrence", "suite_geo_demontrer"],
        },
        {
          titre: "L'élimination d'un médicament",
          enonce:
            "Un pharmacologue utilise un modèle simplifié : la quantité d'un médicament fictif dans le sang baisse de 50 % toutes les 6 heures. On note $u(n)$ la quantité après $n$ périodes de 6 heures, avec $u(0) = 400$ mg.\na) Quelle est la raison ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Calcule $u(3)$.\nd) Une mesure donne $u(5) = 12{,}5$ mg. Que valait $u(4)$ ?",
          reponses: [
            { question: "a)", attendu: "0,5" },
            { question: "b)", attendu: relation("0,5 × u(n)", "0,5u(n)", "0,5*u(n)", "u(n) × 0,5") },
            { question: "c)", attendu: "50 mg" },
            { question: "d)", attendu: "25 mg" },
          ],
          correction:
            "a) Une baisse de 50 % multiplie par $1 - 0{,}5 = 0{,}5$.\nb) $u(n+1) = 0{,}5 \\times u(n)$.\nc) 200, puis 100, puis 50 : $u(3) = 50$ mg.\nd) On remonte d'un rang en divisant par la raison : $12{,}5 \\div 0{,}5 = 25$ mg.\n⛔ Le piège au c) : retirer 200 à chaque pas, ce qui donnerait 0 au rang 2. La quantité est multipliée, elle reste positive.\nRéponse : a) 0,5 ; b) u(n+1) = 0,5 × u(n) ; c) 50 mg ; d) 25 mg.",
          micros: ["suite_geo_recurrence"],
        },
      ],
    },
  ],
};
