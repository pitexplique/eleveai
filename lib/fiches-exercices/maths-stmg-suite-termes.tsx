// ─── Fiche d'exercices : calculer les termes d'une suite (STMG) ─────────────────
//
// Notion suite_termes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : dérouler une récurrence de proche en proche, remonter une suite,
// compter les PAS (de u(0) à u(4), quatre pas et non cinq), et reconnaître une
// suite ni arithmétique ni géométrique par les deux tests. Pas de terme général :
// il est en terminale.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1, 2, 3, 5, 6, 7, 8) ; apiculture
// (apiculteur) ; bornes de recharge (technicien), refuge animalier (soigneuse),
// course à pied (coureuse), ressources humaines (gestionnaire de paie), salle de
// concert (régisseuse), biologie (biologiste), botanique (botaniste), réseaux
// sociaux (community manager) ; boulangerie (boulanger), podcast (journaliste),
// reboisement (forestière), lac et laboratoire (hydrologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`.
//
// Micro-compétences : suite_gen_premiers_termes (1, 2, 3, 9, 10, 17, 19, 20),
// suite_gen_terme_rang (4, 5, 11, 12, 17, 18, 19, 20), suite_gen_ni_ni
// (6, 7, 8, 13, 14, 15, 16). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

/** « Ni l'une ni l'autre » : les écritures que l'élève peut taper. */
const NI = ["ni", "ni l'une ni l'autre", "ni arithmétique ni géométrique"];

export const exercicesSuiteTermesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-termes",
  titre: "Suites : calculer des termes",
  accroche:
    "Vingt exercices pour dérouler une suite pas à pas, sans sauter d'étape : calculer les premiers termes, atteindre un rang donné, remonter en arrière, compter les pas, et repérer une suite qui n'est ni arithmétique ni géométrique. Des ruches, des bornes de recharge, un podcast, une boulangerie et un lac. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : appliquer la relation, compter les pas, ou tester la nature d'une suite.",
      rappel: [
        "On part de $u(0)$ et on applique la relation une étape à la fois : $u(1)$, puis $u(2)$, puis $u(3)$. Une hausse de 30 % multiplie par 1,3.",
        "De $u(0)$ à $u(n)$, il y a $n$ pas : on compte les flèches entre les colonnes, pas les colonnes.",
        "Arithmétique : les différences entre termes voisins sont constantes. Géométrique : les quotients (terme suivant ÷ terme précédent) sont constants.",
        "Si aucun des deux tests ne marche, la suite n'est ni arithmétique ni géométrique.",
      ],
      exercices: [
        {
          enonce: "Une suite est définie par $u(0) = 200$ et $u(n+1) = u(n) + 25$. Calcule $u(3)$.",
          reponses: [{ attendu: "275" }],
          correction:
            "On avance d'un rang à la fois.\n$u(1) = 200 + 25 = 225$.\n$u(2) = 225 + 25 = 250$.\n$u(3) = 250 + 25 = 275$.\n⛔ Le piège : s'arrêter à 225. Faire un seul pas donne $u(1)$, pas $u(3)$.\nRéponse : 275.",
          micros: ["suite_gen_premiers_termes"],
        },
        {
          enonce:
            "Une suite est définie par $u(0) = 500$ et $u(n+1) = u(n) - 40$. Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.",
          reponses: [{ attendu: "460 ; 420 ; 380", ordre: true }],
          correction:
            "On retire 40 à chaque pas.\n$u(1) = 500 - 40 = 460$.\n$u(2) = 460 - 40 = 420$.\n$u(3) = 420 - 40 = 380$.\n⛔ Le piège : ajouter 40 par habitude. Le signe de la relation est un moins.\nRéponse : 460 ; 420 ; 380.",
          micros: ["suite_gen_premiers_termes"],
        },
        {
          enonce: "Une suite est définie par $u(0) = 2$ et $u(n+1) = 3 \\times u(n)$. Calcule $u(3)$.",
          reponses: [{ attendu: "54" }],
          correction:
            "On multiplie par 3 à chaque pas.\n$u(1) = 3 \\times 2 = 6$.\n$u(2) = 3 \\times 6 = 18$.\n$u(3) = 3 \\times 18 = 54$.\n⛔ Le piège : s'arrêter à 18, qui est $u(2)$. Pour le rang 3, il faut trois multiplications.\nRéponse : 54.",
          micros: ["suite_gen_premiers_termes"],
        },
        {
          enonce:
            "Un apiculteur note $u(n)$ le nombre d'abeilles d'une ruche la semaine $n$. Ce nombre augmente de 10 % par semaine (modèle). Le tableau donne les premiers termes. Quelle est la valeur de $u(3)$ ?",
          figure: grille(["n", "0", "1", "2"], [["u(n)", "1 000", "1 100", "1 210"]]),
          reponses: [{ attendu: "1 331" }],
          correction:
            "Le dernier terme connu est $u(2) = 1\\,210$.\nUne hausse de 10 % multiplie par 1,1 : $1\\,210 \\times 1{,}1 = 1\\,331$.\n⛔ Le piège : ajouter 110 comme entre les deux dernières colonnes. La hausse porte sur 1 210, elle vaut 121.\nRéponse : 1 331.",
          micros: ["suite_gen_terme_rang"],
        },
        {
          enonce:
            "Une suite vérifie $u(n+1) = u(n) + 10$. Pour passer de $u(0)$ à $u(4)$, combien de fois ajoute-t-on 10 ?",
          reponses: [{ attendu: "4" }],
          correction:
            "On écrit les passages : $u(0) \\to u(1) \\to u(2) \\to u(3) \\to u(4)$.\nIl y a 5 valeurs, mais seulement 4 flèches : on ajoute 10 quatre fois.\n⛔ Le piège : répondre 5, le nombre de valeurs. Ce sont les passages qui comptent.\nRéponse : 4.",
          micros: ["suite_gen_terme_rang"],
        },
        {
          enonce:
            "Les premiers termes d'une suite sont $5$, $8$, $13$, $20$.\na) Calcule les différences entre termes voisins, dans l'ordre.\nb) Ces différences sont-elles constantes ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "3 ; 5 ; 7", ordre: true },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) On soustrait chaque terme au suivant : $8 - 5 = 3$, $13 - 8 = 5$, $20 - 13 = 7$.\nb) 3, 5 et 7 ne sont pas égaux : les différences ne sont pas constantes, la suite n'est donc pas arithmétique.\n⛔ Le piège au a) : soustraire à l'envers et obtenir −3, −5, −7. C'est le terme suivant moins le précédent.\nRéponse : a) 3 ; 5 ; 7 ; b) non.",
          micros: ["suite_gen_ni_ni"],
        },
        {
          enonce:
            "Les premiers termes d'une suite sont $3$, $6$, $12$, $24$. Cette suite est-elle arithmétique, géométrique, ou ni l'une ni l'autre ? Écris « arithmétique », « géométrique » ou « ni ».",
          reponses: [{ attendu: "géométrique" }],
          correction:
            "Différences : 3, 6, 12. Elles ne sont pas constantes : la suite n'est pas arithmétique.\nQuotients : $6 \\div 3 = 2$, $12 \\div 6 = 2$, $24 \\div 12 = 2$. Ils sont constants : la suite est géométrique.\n⛔ Le piège : conclure « ni » après le seul test des différences. Il reste à tester les quotients.\nRéponse : géométrique.",
          micros: ["suite_gen_ni_ni"],
        },
        {
          enonce:
            "Les premiers termes d'une suite sont $1$, $4$, $9$, $16$. Cette suite est-elle arithmétique, géométrique, ou ni l'une ni l'autre ? Écris « arithmétique », « géométrique » ou « ni ».",
          reponses: [{ attendu: NI }],
          correction:
            "Différences : 3, 5, 7. Elles ne sont pas constantes : pas arithmétique.\nQuotients : $4 \\div 1 = 4$, puis $9 \\div 4 = 2{,}25$. Ils ne sont pas constants : pas géométrique.\nLes deux tests échouent : ce sont les carrés de 1, 2, 3, 4.\n⛔ Le piège : ranger toute suite dans l'une des deux cases. Beaucoup de suites ne sont ni l'une ni l'autre.\nRéponse : ni l'une ni l'autre.",
          micros: ["suite_gen_ni_ni"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : avancer ou remonter dans la suite, ou mener les deux tests avant de conclure.",
      rappel: [
        "Remonter d'un rang, c'est faire l'opération inverse : on retire ce qu'on ajoutait, on divise par ce qui multipliait.",
        "Une hausse de t % multiplie par $1 + \\dfrac{t}{100}$ : la hausse suivante porte sur le nouveau nombre.",
        "Pour dire « ni arithmétique ni géométrique », il faut que les DEUX tests échouent. Un quotient égal sur deux paires ne suffit pas : on teste toutes les paires.",
      ],
      exercices: [
        {
          enonce:
            "Un technicien installe des bornes de recharge pour une commune : $u(n+1) = u(n) + 15$, où $u(n)$ est le nombre de bornes au bout de $n$ mois (modèle). Il en compte $u(4) = 140$.\na) Combien de bornes y avait-il un mois plus tôt ?\nb) Que vaut $u(0)$ ?",
          reponses: [
            { question: "a)", attendu: "125" },
            { question: "b)", attendu: "80" },
          ],
          correction:
            "Pour remonter, on fait l'opération inverse : on retire 15 à chaque pas.\na) $u(3) = 140 - 15 = 125$.\nb) De $u(4)$ à $u(0)$, il y a 4 pas en arrière : $140 - 4 \\times 15 = 140 - 60 = 80$.\nVérification depuis $u(0)$ : 80, 95, 110, 125, 140. ✔\n⛔ Le piège : ajouter 15 en remontant. On s'éloigne du départ au lieu d'y revenir.\nRéponse : a) 125 ; b) 80.",
          micros: ["suite_gen_premiers_termes"],
        },
        {
          enonce:
            "Une soigneuse de refuge animalier reçoit 64 demandes d'adoption le premier mois, notées $u(0)$. Dans son modèle, ce nombre augmente de 25 % par mois.\na) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nb) Combien de multiplications faut-il pour aller de $u(0)$ à $u(3)$ ?",
          reponses: [
            { question: "a)", attendu: "80 ; 100 ; 125", ordre: true },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "a) Une hausse de 25 % multiplie par 1,25.\n$u(1) = 64 \\times 1{,}25 = 80$, $u(2) = 80 \\times 1{,}25 = 100$, $u(3) = 100 \\times 1{,}25 = 125$.\nb) Une multiplication par passage : 3 passages, donc 3 multiplications.\n⛔ Le piège au a) : ajouter 16 à chaque fois. 25 % de 64, c'est 16, mais 25 % de 80, c'est 20.\nRéponse : a) 80 ; 100 ; 125 ; b) 3.",
          micros: ["suite_gen_premiers_termes"],
        },
        {
          enonce:
            "Maya, coureuse, parcourt 2 km à sa première sortie, notés $u(0)$, puis 0,5 km de plus à chaque sortie : $u(n+1) = u(n) + 0{,}5$.\na) Calcule $u(2)$.\nb) Combien de pas y a-t-il entre $u(0)$ et $u(6)$ ?\nc) Calcule $u(6)$.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) $u(1) = 2 + 0{,}5 = 2{,}5$, puis $u(2) = 2{,}5 + 0{,}5 = 3$.\nb) Du rang 0 au rang 6, il y a 6 pas.\nc) On continue de proche en proche : 3 ; 3,5 ; 4 ; 4,5 ; 5. Donc $u(6) = 5$.\n⛔ Le piège au c) : compter 7 pas et trouver 5,5, parce que $u(6)$ est la septième valeur.\nRéponse : a) 3 ; b) 6 ; c) 5.",
          micros: ["suite_gen_terme_rang"],
        },
        {
          enonce:
            "Un gestionnaire de paie simule un salaire de 1 800 € par mois, noté $u(0)$, avec une hausse de 2 % par an (modèle).\na) Calcule $u(1)$.\nb) Calcule $u(2)$.",
          reponses: [
            { question: "a)", attendu: "1 836" },
            { question: "b)", attendu: "1 872,72" },
          ],
          correction:
            "Une hausse de 2 % multiplie par 1,02.\na) $u(1) = 1\\,800 \\times 1{,}02 = 1\\,836$.\nb) $u(2) = 1\\,836 \\times 1{,}02 = 1\\,872{,}72$.\n⛔ Le piège au b) : ajouter deux fois 36 € et trouver 1 872. La deuxième hausse porte sur 1 836 €, elle vaut 36,72 €.\nRéponse : a) 1 836 € ; b) 1 872,72 €.",
          micros: ["suite_gen_terme_rang"],
        },
        {
          enonce:
            "Une régisseuse de salle de concert dispose des chaises en gradins. Le nombre total de chaises après chaque rangée donne la suite $1$, $3$, $6$, $10$, $15$ (modèle).\na) Calcule les différences entre termes voisins, dans l'ordre.\nb) Calcule les deux premiers quotients : $3 \\div 1$ et $6 \\div 3$, dans cet ordre.\nc) Cette suite est-elle arithmétique, géométrique, ou ni l'une ni l'autre ? Écris « arithmétique », « géométrique » ou « ni ».",
          reponses: [
            { question: "a)", attendu: "2 ; 3 ; 4 ; 5", ordre: true },
            { question: "b)", attendu: "3 ; 2", ordre: true },
            { question: "c)", attendu: NI },
          ],
          correction:
            "a) $3 - 1 = 2$, $6 - 3 = 3$, $10 - 6 = 4$, $15 - 10 = 5$ : les différences changent, la suite n'est pas arithmétique.\nb) $3 \\div 1 = 3$ et $6 \\div 3 = 2$ : les quotients changent, la suite n'est pas géométrique.\nc) Les deux tests échouent : ni l'une ni l'autre.\n⛔ Le piège au c) : voir une règle (+ 2, + 3, + 4…) et conclure « arithmétique ». Une suite arithmétique ajoute toujours le MÊME nombre.\nRéponse : a) 2 ; 3 ; 4 ; 5 ; b) 3 ; 2 ; c) ni l'une ni l'autre.",
          micros: ["suite_gen_ni_ni"],
        },
        {
          enonce:
            "Une biologiste mesure trois cultures de cellules, suites A, B et C (modèle). Pour chacune, écris « arithmétique », « géométrique » ou « ni ».\na) La suite A.\nb) La suite B.\nc) La suite C.",
          figure: grille(["n", "A", "B", "C"], [[0, 4, 4, 4], [1, 7, 8, 6], [2, 10, 16, 9], [3, 13, 32, 14]]),
          reponses: [
            { question: "a)", attendu: "arithmétique" },
            { question: "b)", attendu: "géométrique" },
            { question: "c)", attendu: NI },
          ],
          correction:
            "a) A : on ajoute 3 à chaque pas ($7 - 4$, $10 - 7$, $13 - 10$). Arithmétique.\nb) B : on multiplie par 2 à chaque pas ($8 \\div 4$, $16 \\div 8$, $32 \\div 16$). Géométrique.\nc) C : les différences sont 2, 3, 5. Les quotients sont $6 \\div 4 = 1{,}5$, $9 \\div 6 = 1{,}5$, puis $14 \\div 9 \\approx 1{,}56$. Aucun test ne marche jusqu'au bout : ni l'une ni l'autre.\n⛔ Le piège au c) : s'arrêter aux deux premiers quotients, égaux à 1,5. On teste TOUTES les paires.\nRéponse : a) arithmétique ; b) géométrique ; c) ni l'une ni l'autre.",
          micros: ["suite_gen_ni_ni"],
        },
        {
          enonce:
            "Une botaniste compte les spirales d'une fleur et trouve les premiers termes $2$, $3$, $5$, $8$, $13$ : chaque terme est la somme des deux précédents. On note $u(0) = 2$.\na) Calcule $u(5)$.\nb) Cette suite est-elle arithmétique, géométrique, ou ni l'une ni l'autre ? Écris « arithmétique », « géométrique » ou « ni ».",
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: NI },
          ],
          correction:
            "a) $u(4) = 13$ et $u(3) = 8$, donc $u(5) = 13 + 8 = 21$.\nb) Différences : 1, 2, 3, 5, elles changent. Quotients : $3 \\div 2 = 1{,}5$, puis $5 \\div 3 \\approx 1{,}67$, ils changent aussi. Ni l'une ni l'autre.\n⛔ Le piège au a) : prendre 13 pour $u(5)$, parce que c'est le cinquième nombre. Les rangs partent de 0 : 13 est $u(4)$.\nRéponse : a) 21 ; b) ni l'une ni l'autre.",
          micros: ["suite_gen_ni_ni"],
        },
        {
          enonce:
            "Un community manager suit le partage d'une vidéo : $5$, $10$, $20$, $40$ partages (modèle). Il dit : « Les différences ne sont pas constantes, donc cette suite n'est ni arithmétique ni géométrique. »\na) Calcule les différences, dans l'ordre.\nb) Calcule les quotients, dans l'ordre.\nc) Sa phrase est-elle juste ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "5 ; 10 ; 20", ordre: true },
            { question: "b)", attendu: "2 ; 2 ; 2", ordre: true },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $10 - 5 = 5$, $20 - 10 = 10$, $40 - 20 = 20$.\nb) $10 \\div 5 = 2$, $20 \\div 10 = 2$, $40 \\div 20 = 2$ : les quotients sont constants.\nc) Non : la suite est géométrique. Il n'a mené qu'un test sur deux.\n⛔ Le piège : conclure après un seul test. Une suite géométrique a, elle aussi, des différences qui changent.\nRéponse : a) 5 ; 10 ; 20 ; b) 2 ; 2 ; 2 ; c) non.",
          micros: ["suite_gen_ni_ni"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on déroule la suite, on compte les pas, on vérifie en revenant en arrière.",
      rappel: [
        "On calcule de proche en proche, et on écrit les termes intermédiaires pour ne pas perdre le rang.",
        "Quantité fixe : on ajoute. Pourcentage : on multiplie.",
        "Pour vérifier une valeur, on refait le chemin en sens inverse.",
      ],
      exercices: [
        {
          titre: "La farine du boulanger",
          enonce:
            "Un boulanger a 1 000 kg de farine en réserve, notés $u(0)$, et il en utilise 120 kg par jour, sans livraison (modèle).\na) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nb) Combien de pas y a-t-il entre $u(0)$ et $u(5)$ ?\nc) Calcule $u(5)$.\nd) Calcule $u(7)$.",
          reponses: [
            { question: "a)", attendu: "880 ; 760 ; 640", ordre: true },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "400 kg" },
            { question: "d)", attendu: "160 kg" },
          ],
          correction:
            "a) On retire 120 à chaque pas : $1\\,000 - 120 = 880$, $880 - 120 = 760$, $760 - 120 = 640$.\nb) Du rang 0 au rang 5, il y a 5 pas.\nc) On continue : $u(4) = 640 - 120 = 520$, puis $u(5) = 520 - 120 = 400$.\nd) $u(6) = 400 - 120 = 280$, puis $u(7) = 280 - 120 = 160$.\n⛔ Le piège au c) : compter 6 pas, parce qu'il y a 6 valeurs de $u(0)$ à $u(5)$.\nRéponse : a) 880 ; 760 ; 640 ; b) 5 ; c) 400 kg ; d) 160 kg.",
          micros: ["suite_gen_premiers_termes", "suite_gen_terme_rang"],
        },
        {
          titre: "L'audience du podcast",
          enonce:
            "Une journaliste lance un podcast écouté 1 500 fois le premier mois, noté $u(0)$. Dans son modèle, l'audience augmente de 20 % par mois.\na) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nb) Combien de multiplications faut-il pour aller de $u(0)$ à $u(3)$ ?\nc) Un collègue calcule $u(3)$ ainsi : $1\\,500 + 3 \\times 300 = 2\\,400$. Son calcul est-il juste ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1 800 ; 2 160 ; 2 592", ordre: true },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $1\\,500 \\times 1{,}2 = 1\\,800$, $1\\,800 \\times 1{,}2 = 2\\,160$, $2\\,160 \\times 1{,}2 = 2\\,592$.\nb) Trois passages, donc 3 multiplications.\nc) Non : il ajoute 300 à chaque fois, alors que la hausse grandit (300, puis 360, puis 432). Il trouve 2 400 au lieu de 2 592.\n⛔ Le piège au c) : traiter un pourcentage comme une quantité fixe.\nRéponse : a) 1 800 ; 2 160 ; 2 592 ; b) 3 ; c) non.",
          micros: ["suite_gen_terme_rang"],
        },
        {
          titre: "Deux plans de reboisement",
          enonce:
            "Une forestière compare deux plans de plantation, en milliers d'arbres, $n$ étant le nombre d'années (modèle). Plan U : $u(0) = 100$ et $u(n+1) = u(n) + 30$. Plan V : $v(0) = 100$ et $v(n+1) = 1{,}2 \\times v(n)$.\na) Calcule $u(3)$.\nb) Calcule $v(3)$.\nc) Calcule $v(5)$, arrondi au centième.\nd) Calcule $u(5)$.\ne) Quel plan donne le plus d'arbres au rang 5 ? Écris u ou v.",
          reponses: [
            { question: "a)", attendu: "190" },
            { question: "b)", attendu: "172,8" },
            { question: "c)", attendu: "248,83", tolerance: 0.005 },
            { question: "d)", attendu: "250" },
            { question: "e)", attendu: ["u", "plan u"] },
          ],
          correction:
            "a) 100, 130, 160, 190 : $u(3) = 190$.\nb) $100 \\times 1{,}2 = 120$, $120 \\times 1{,}2 = 144$, $144 \\times 1{,}2 = 172{,}8$ : $v(3) = 172{,}8$.\nc) $172{,}8 \\times 1{,}2 = 207{,}36$, puis $207{,}36 \\times 1{,}2 = 248{,}832$ : $v(5) \\approx 248{,}83$.\nd) On continue $u$ : $190 + 30 = 220$, puis $220 + 30 = 250$.\ne) 250 est plus grand que 248,83 : c'est $u$, de très peu.\n⛔ Le piège au b) : ajouter 20 à chaque pas. 1,2 est un coefficient, on multiplie.\nRéponse : a) 190 ; b) 172,8 ; c) 248,83 ; d) 250 ; e) u.",
          micros: ["suite_gen_premiers_termes", "suite_gen_terme_rang"],
        },
        {
          titre: "Remonter le temps",
          enonce:
            "Une hydrologue suit la hauteur d'un petit lac de barrage, en cm au-dessus d'un repère (modèle) : $u(n+1) = u(n) - 15$. Après 6 mois, elle lit $u(6) = 70$.\na) Que valait $u(0)$ ?\nb) Que valait $u(3)$ ?\nDans son laboratoire, une culture d'algues double chaque jour : $w(n+1) = 2 \\times w(n)$, et $w(3) = 40$.\nc) Que valait $w(0)$ ?",
          reponses: [
            { question: "a)", attendu: "160" },
            { question: "b)", attendu: "115" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) On remonte de 6 pas, en ajoutant 15 à chaque fois : $70 + 6 \\times 15 = 70 + 90 = 160$.\nb) On remonte de 3 pas depuis $u(6)$ : $70 + 3 \\times 15 = 70 + 45 = 115$.\nc) On remonte en divisant par 2 : $40 \\div 2 = 20$, $20 \\div 2 = 10$, $10 \\div 2 = 5$.\nVérification : $5 \\to 10 \\to 20 \\to 40$. ✔\n⛔ Le piège au a) : retirer 15 parce que la relation écrit un moins. En remontant, on fait l'opération inverse.\nRéponse : a) 160 ; b) 115 ; c) 5.",
          micros: ["suite_gen_premiers_termes", "suite_gen_terme_rang"],
        },
      ],
    },
  ],
};
