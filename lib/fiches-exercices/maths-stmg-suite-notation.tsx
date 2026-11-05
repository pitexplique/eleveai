// ─── Fiche d'exercices : notation et modes de génération d'une suite (STMG) ─────
//
// Notion suite_notation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : passer de u(n) à l'indice, distinguer le RANG et le TERME, reconnaître
// une définition fonctionnelle ou par récurrence, traduire une situation en
// relation de récurrence, et lire ce que dit une relation. Rien de plus : le
// terme général d'une suite géométrique ou arithmétique est en terminale.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1, 4, 5, 6, 7) ; musée (médiatrice),
// médecine du sport (kiné, tableau), jardinerie (vendeuse) ; piscine (maître-nageur),
// énergie solaire (technicienne), escalade (trésorier), agriculture (agriculteur),
// déchets (responsable environnement), pharmacie d'hôpital (préparateur),
// athlétisme (entraîneuse), informatique (développeuse) ; théâtre (directrice),
// vélos (vendeur), hôtellerie (gérante), glacier (glaciologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`.
//
// Micro-compétences : suite_gen_notation (1, 2, 3, 9, 17), suite_gen_fonctionnelle
// (4, 6, 10, 15, 16, 17), suite_gen_recurrence (5, 7, 8, 10 à 20). 3/3.

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

export const exercicesSuiteNotationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-notation",
  titre: "Suites : notation et modes de génération",
  accroche:
    "Vingt exercices pour lire une suite sans se tromper : le rang et le terme, les deux notations, une définition fonctionnelle ou par récurrence, et la relation qui traduit une situation. Une piscine, un mur d'escalade, un stock de pharmacie, un théâtre et un glacier. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : changer de notation, lire un rang, reconnaître une définition, écrire une relation.",
      rappel: [
        "$u(n)$ et $u_n$ désignent le même nombre : le terme de rang $n$. Dans $u(6) = 90$, 6 est le RANG (la place), 90 est le TERME (la valeur).",
        "Définition fonctionnelle : $u(n)$ se calcule directement avec $n$. Exemple : $u(n) = 3n + 1$.",
        "Définition par récurrence : on donne le premier terme, et chaque terme se calcule à partir du précédent. Exemple : $u(0) = 2$ et $u(n+1) = u(n) + 3$.",
        "Une même quantité ajoutée à chaque étape s'écrit $u(n+1) = u(n) + r$.",
      ],
      exercices: [
        {
          enonce:
            "Change de notation. Pour écrire un indice au clavier, utilise le tiret bas : u_5.\na) Écris $u(7)$ en notation indicielle.\nb) Écris $u_{12}$ en notation fonctionnelle.",
          reponses: [
            { question: "a)", attendu: ["u_7", "u7", "u_{7}"], exact: true },
            { question: "b)", attendu: "u(12)", exact: true },
          ],
          correction:
            "Les deux notations désignent le même nombre : on garde le rang, on change seulement la façon de l'écrire.\na) Le rang 7 passe en indice : $u_7$.\nb) Le rang 12 passe entre parenthèses : $u(12)$.\n⛔ Le piège : lire $u(7)$ comme « u fois 7 ». Les parenthèses indiquent une place dans la liste, pas une multiplication.\nRéponse : a) u_7 ; b) u(12).",
          micros: ["suite_gen_notation"],
        },
        {
          enonce:
            "Une médiatrice de musée note $u(n)$ le nombre de visiteurs pendant le mois $n$. Elle écrit $u(4) = 250$.\na) Quel est le rang ?\nb) Quelle est la valeur du terme ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "250" },
          ],
          correction:
            "On lit l'écriture comme une phrase : « au rang 4, la valeur est 250 ».\na) Ce qui est entre parenthèses est le rang : 4.\nb) Ce qui suit le signe égal est le terme : 250 visiteurs.\n⛔ Le piège : intervertir les deux. Le rang se compte ici en mois, le terme en visiteurs.\nRéponse : a) 4 ; b) 250.",
          micros: ["suite_gen_notation"],
        },
        {
          enonce:
            "Un kiné note le nombre de répétitions d'un exercice à chaque séance. Le tableau donne les premiers termes de la suite $u$. Lis $u(2)$.",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 5, 9, 14, 20]]),
          reponses: [{ attendu: "14" }],
          correction:
            "On cherche la colonne où $n$ vaut 2.\nDans cette colonne, on lit 14 : $u(2) = 14$.\n⛔ Le piège : prendre la deuxième valeur du tableau (9). Ici, les rangs commencent à 0 : 9 est $u(1)$.\nRéponse : 14.",
          micros: ["suite_gen_notation"],
        },
        {
          enonce:
            "Une suite est définie par $u(n) = 4n + 3$. Cette définition est-elle fonctionnelle ou par récurrence ? Écris « fonctionnelle » ou « récurrence ».",
          reponses: [{ attendu: "fonctionnelle" }],
          correction:
            "On regarde si l'écriture fait apparaître le terme précédent.\nIci, $u(n)$ s'exprime seulement avec $n$ : on peut calculer $u(100)$ sans connaître $u(99)$.\n⛔ Le piège : croire qu'il y a récurrence dès qu'on voit la lettre $u$. Il faudrait un $u$ dans le membre de droite.\nRéponse : fonctionnelle.",
          micros: ["suite_gen_fonctionnelle"],
        },
        {
          enonce:
            "Une suite est définie par $u(0) = 12$ et $u(n+1) = u(n) + 5$. Cette définition est-elle fonctionnelle ou par récurrence ? Écris « fonctionnelle » ou « récurrence ».",
          reponses: [{ attendu: ["récurrence", "par récurrence"] }],
          correction:
            "Le membre de droite contient $u(n)$ : chaque terme se calcule à partir du précédent.\nC'est aussi pour cela qu'on donne le premier terme $u(0)$ : sans lui, on ne peut pas démarrer.\n⛔ Le piège : répondre « fonctionnelle » parce que $n$ apparaît. Ici, $n$ ne sert qu'à nommer les termes.\nRéponse : récurrence.",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce: "Une suite est définie par $u(n) = 2n + 7$. Calcule $u(5)$.",
          reponses: [{ attendu: "17" }],
          correction:
            "La définition est fonctionnelle : on remplace $n$ par 5.\n$u(5) = 2 \\times 5 + 7 = 10 + 7 = 17$.\n⛔ Le piège : écrire « 25 + 7 ». $2n$ veut dire 2 fois $n$, on ne colle pas les chiffres.\nRéponse : 17.",
          micros: ["suite_gen_fonctionnelle"],
        },
        {
          enonce: "Une suite est définie par $u(0) = 40$ et $u(n+1) = u(n) + 6$. Calcule $u(1)$.",
          reponses: [{ attendu: "46" }],
          correction:
            "La relation dit : le terme suivant, c'est le terme courant plus 6.\nAvec $n = 0$ : $u(1) = u(0) + 6 = 40 + 6 = 46$.\n⛔ Le piège : multiplier ($40 \\times 6$). La relation écrit un « + ».\nRéponse : 46.",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce:
            "Une vendeuse de jardinerie reçoit 30 sachets de graines de plus chaque mois. On note $u(n)$ son stock de sachets le mois $n$, sans aucune vente. Complète la relation : $u(n+1) = \\ldots$",
          reponses: [{ attendu: relation("u(n) + 30", "30 + u(n)") }],
          correction:
            "Une quantité fixe s'ajoute à chaque étape : on part du terme courant $u(n)$ et on ajoute 30.\n$u(n+1) = u(n) + 30$.\n⛔ Le piège : écrire $u(n+1) = 30 \\times u(n)$. Le stock serait multiplié par 30 chaque mois.\nRéponse : u(n+1) = u(n) + 30.",
          micros: ["suite_gen_recurrence"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : repérer le rang et le terme, traduire en relation, ou lire ce que dit la relation.",
      rappel: [
        "Une hausse de t % multiplie par $1 + \\dfrac{t}{100}$ ; une baisse de t % multiplie par $1 - \\dfrac{t}{100}$. Exemple : + 5 % donne $u(n+1) = 1{,}05 \\times u(n)$.",
        "Lire une relation : un coefficient au-dessus de 1 fait augmenter, en dessous de 1 il fait diminuer. L'écart à 1 donne le pourcentage.",
        "Une récurrence décrit un pas, pas un saut : pour atteindre $u(20)$, il faut passer par tous les termes précédents.",
      ],
      exercices: [
        {
          enonce:
            "Un maître-nageur note $u(n)$ le nombre d'entrées à la piscine la semaine $n$ (modèle). Il écrit $u(3) = 420$.\na) Quel est le rang ?\nb) Quelle est la valeur du terme ?\nc) Comment écrit-il, en notation fonctionnelle, le nombre d'entrées de la semaine 5 ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "420" },
            { question: "c)", attendu: "u(5)", exact: true },
          ],
          correction:
            "a) Le rang est entre parenthèses : 3, la semaine.\nb) Le terme suit le signe égal : 420 entrées.\nc) La semaine 5 est le rang 5 : on l'écrit $u(5)$.\n⛔ Le piège : comparer 3 et 420. L'un compte des semaines, l'autre des entrées : ils ne se comparent pas.\nRéponse : a) 3 ; b) 420 ; c) u(5).",
          micros: ["suite_gen_notation"],
        },
        {
          enonce:
            "Une technicienne décrit de deux façons la production de panneaux solaires, en kWh, au mois $n$ (modèle) : $u(n) = 12n + 30$, et $v(0) = 30$ avec $v(n+1) = v(n) + 12$.\na) Le mode de définition de $u$ : écris « fonctionnelle » ou « récurrence ».\nb) Le mode de définition de $v$ : écris « fonctionnelle » ou « récurrence ».\nc) Calcule $u(3)$.\nd) Calcule $v(3)$.",
          reponses: [
            { question: "a)", attendu: "fonctionnelle" },
            { question: "b)", attendu: ["récurrence", "par récurrence"] },
            { question: "c)", attendu: "66" },
            { question: "d)", attendu: "66" },
          ],
          correction:
            "a) $u(n)$ se calcule directement avec $n$ : définition fonctionnelle.\nb) $v(n+1)$ se calcule avec $v(n)$ : définition par récurrence.\nc) On remplace $n$ par 3 : $u(3) = 12 \\times 3 + 30 = 36 + 30 = 66$.\nd) On avance pas à pas : $v(1) = 30 + 12 = 42$, $v(2) = 42 + 12 = 54$, $v(3) = 54 + 12 = 66$.\n⛔ Le piège au d) : faire un seul pas ($30 + 12 = 42$). Pour aller au rang 3, il faut trois pas.\nRéponse : a) fonctionnelle ; b) récurrence ; c) 66 ; d) 66.",
          micros: ["suite_gen_fonctionnelle", "suite_gen_recurrence"],
        },
        {
          enonce:
            "Le trésorier d'un club d'escalade prévoit que le nombre d'adhérents augmentera de 8 % chaque année (modèle). On note $u(n)$ ce nombre l'année $n$.\na) Par quel coefficient multiplie-t-on chaque année ?\nb) Complète la relation : $u(n+1) = \\ldots$",
          reponses: [
            { question: "a)", attendu: "1,08" },
            { question: "b)", attendu: relation("1,08 × u(n)", "1,08u(n)", "1,08*u(n)", "u(n) × 1,08") },
          ],
          correction:
            "a) Une hausse de 8 % multiplie par $1 + 0{,}08 = 1{,}08$.\nb) Le terme suivant est le terme courant multiplié par ce coefficient : $u(n+1) = 1{,}08 \\times u(n)$.\n⛔ Le piège : écrire $u(n+1) = u(n) + 8$. Ajouter 8, c'est 8 adhérents de plus, pas 8 %.\nRéponse : a) 1,08 ; b) u(n+1) = 1,08 × u(n).",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce:
            "Un agriculteur vise une consommation d'eau en baisse de 5 % par an (modèle). On note $u(n)$ cette consommation l'année $n$.\na) Par quel coefficient multiplie-t-on chaque année ?\nb) Complète la relation : $u(n+1) = \\ldots$",
          reponses: [
            { question: "a)", attendu: "0,95" },
            { question: "b)", attendu: relation("0,95 × u(n)", "0,95u(n)", "0,95*u(n)", "u(n) × 0,95") },
          ],
          correction:
            "a) Une baisse de 5 % multiplie par $1 - 0{,}05 = 0{,}95$.\nb) $u(n+1) = 0{,}95 \\times u(n)$.\n⛔ Le piège : prendre 0,05 comme coefficient. Multiplier par 0,05 ne garderait que 5 % de l'eau, alors qu'on en garde 95 %.\nRéponse : a) 0,95 ; b) u(n+1) = 0,95 × u(n).",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce:
            "Une responsable environnement note $u(n)$ le tonnage de déchets d'une ville l'année $n$ (modèle), avec $u(n+1) = 0{,}85 \\times u(n)$.\na) Le tonnage augmente-t-il ou diminue-t-il ? Écris « augmente » ou « diminue ».\nb) De quel pourcentage par an ?",
          reponses: [
            { question: "a)", attendu: "diminue" },
            { question: "b)", attendu: ["15 %", "-15 %"] },
          ],
          correction:
            "a) On compare le coefficient à 1 : 0,85 est plus petit que 1, le tonnage diminue.\nb) L'écart à 1 donne le taux : $1 - 0{,}85 = 0{,}15$, soit 15 %.\n⛔ Le piège au b) : répondre 85 %. On garde 85 % des déchets, on en retire 15 %.\nRéponse : a) diminue ; b) 15 %.",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce:
            "Un préparateur de pharmacie d'hôpital note $u(n)$ son stock de boîtes de gants au bout de $n$ jours (modèle), avec $u(0) = 600$ et $u(n+1) = u(n) - 40$.\na) Le stock augmente-t-il ou diminue-t-il ? Écris « augmente » ou « diminue ».\nb) De combien de boîtes par jour ?\nc) Calcule $u(2)$.",
          reponses: [
            { question: "a)", attendu: "diminue" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "520" },
          ],
          correction:
            "a) On retire 40 à chaque pas : le stock diminue.\nb) Il perd 40 boîtes par jour. C'est une quantité, pas un pourcentage.\nc) $u(1) = 600 - 40 = 560$, puis $u(2) = 560 - 40 = 520$.\n⛔ Le piège au b) : lire « 40 % ». La relation retire 40, elle ne multiplie pas.\nRéponse : a) diminue ; b) 40 ; c) 520.",
          micros: ["suite_gen_recurrence"],
        },
        {
          enonce:
            "Une entraîneuse d'athlétisme fait courir Lina : $u(0) = 150$ mètres et $u(n+1) = u(n) + 25$ à chaque séance (modèle).\na) Peut-on obtenir $u(20)$ directement en remplaçant $n$ par 20 dans la relation ? Réponds oui ou non.\nb) Combien de pas faut-il pour aller de $u(0)$ à $u(20)$ ?\nc) Pour un autre coureur, elle utilise $w(n) = 25n + 200$. Calcule $w(20)$.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "700" },
          ],
          correction:
            "a) Remplacer $n$ par 20 donne $u(21) = u(20) + 25$ : on ne connaît toujours pas $u(20)$. La réponse est non.\nb) Chaque pas fait gagner un rang : de 0 à 20, il y a 20 pas.\nc) $w$ a une définition fonctionnelle, on saute directement : $w(20) = 25 \\times 20 + 200 = 500 + 200 = 700$.\n⛔ Le piège au a) : remplacer $n$ et croire avoir fini. Une récurrence décrit un pas, pas un saut.\nRéponse : a) non ; b) 20 ; c) 700.",
          micros: ["suite_gen_recurrence", "suite_gen_fonctionnelle"],
        },
        {
          enonce:
            "Une développeuse teste trois suites :\nA : $u(n) = n^2 + 1$.\nB : $u(0) = 3$ et $u(n+1) = 2 \\times u(n)$.\nC : $u(n) = 5n$.\na) Laquelle est définie par récurrence ? Écris sa lettre.\nb) Calcule $u(2)$ pour la suite A.\nc) Calcule $u(2)$ pour la suite B.\nd) Calcule $u(3)$ pour la suite C.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "12" },
            { question: "d)", attendu: "15" },
          ],
          correction:
            "a) Seule B fait apparaître le terme précédent $u(n)$ à droite : c'est la suite B.\nb) $u(2) = 2^2 + 1 = 4 + 1 = 5$.\nc) On avance pas à pas : $u(1) = 2 \\times 3 = 6$, puis $u(2) = 2 \\times 6 = 12$.\nd) $u(3) = 5 \\times 3 = 15$.\n⛔ Le piège au c) : faire un seul pas et s'arrêter à 6, le terme de rang 1.\nRéponse : a) B ; b) 5 ; c) 12 ; d) 15.",
          micros: ["suite_gen_fonctionnelle", "suite_gen_recurrence"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la situation, calculer de proche en proche, puis juger une affirmation.",
      rappel: [
        "Quantité fixe : on AJOUTE, $u(n+1) = u(n) + r$. Pourcentage : on MULTIPLIE, $u(n+1) = q \\times u(n)$.",
        "On calcule une récurrence de proche en proche, un rang après l'autre.",
        "Si la hausse est en pourcentage, la quantité gagnée change d'une année sur l'autre, car on prend le pourcentage d'un nombre qui a changé.",
      ],
      exercices: [
        {
          titre: "Les abonnés du théâtre",
          enonce:
            "La directrice d'un théâtre compte 800 abonnés la première saison, notés $u(0)$, et prévoit 50 abonnés de plus par saison (modèle).\na) Complète la relation : $u(n+1) = \\ldots$\nb) Donne $u(1)$ et $u(2)$, dans cet ordre.\nc) Son adjoint écrit $v(n) = 50n + 800$. Ce mode de définition : écris « fonctionnelle » ou « récurrence ».\nd) Calcule $v(10)$.",
          reponses: [
            { question: "a)", attendu: relation("u(n) + 50", "50 + u(n)") },
            { question: "b)", attendu: "850 ; 900", ordre: true },
            { question: "c)", attendu: "fonctionnelle" },
            { question: "d)", attendu: "1 300" },
          ],
          correction:
            "a) Une quantité fixe s'ajoute : $u(n+1) = u(n) + 50$.\nb) $u(1) = 800 + 50 = 850$, puis $u(2) = 850 + 50 = 900$.\nc) $v(n)$ se calcule directement avec $n$ : définition fonctionnelle.\nd) $v(10) = 50 \\times 10 + 800 = 500 + 800 = 1\\,300$.\n⛔ Le piège au d) : s'arrêter à $50 \\times 10 = 500$ et oublier les 800 abonnés du départ.\nRéponse : a) u(n+1) = u(n) + 50 ; b) 850 ; 900 ; c) fonctionnelle ; d) 1 300.",
          micros: ["suite_gen_recurrence", "suite_gen_fonctionnelle", "suite_gen_notation"],
        },
        {
          titre: "Le vendeur de vélos",
          enonce:
            "Un vendeur a vendu 500 vélos électriques cette année, notés $u(0)$, et espère 20 % de plus chaque année (modèle).\na) Par quel coefficient multiplie-t-on chaque année ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Donne $u(1)$ et $u(2)$, dans cet ordre.\nd) Un collègue écrit $u(n+1) = u(n) + 20$. Sa relation est-elle juste ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: relation("1,2 × u(n)", "1,2u(n)", "1,2*u(n)", "u(n) × 1,2") },
            { question: "c)", attendu: "600 ; 720", ordre: true },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) Une hausse de 20 % multiplie par $1 + 0{,}2 = 1{,}2$.\nb) $u(n+1) = 1{,}2 \\times u(n)$.\nc) $u(1) = 500 \\times 1{,}2 = 600$, puis $u(2) = 600 \\times 1{,}2 = 720$.\nd) Non : sa relation ajoute 20 vélos, alors que la hausse réelle est de 100 vélos la première année.\n⛔ Le piège au c) : ajouter deux fois 100. La deuxième hausse porte sur 600, elle vaut 120.\nRéponse : a) 1,2 ; b) u(n+1) = 1,2 × u(n) ; c) 600 ; 720 ; d) non.",
          micros: ["suite_gen_recurrence"],
        },
        {
          titre: "Deux baux pour un hôtel",
          enonce:
            "La gérante d'un hôtel loue un local 5 000 € par an (modèle). On lui propose deux contrats. Contrat A : le loyer augmente de 100 € par an, noté $u(n)$. Contrat B : le loyer augmente de 3 % par an, noté $v(n)$. Au départ, $u(0) = v(0) = 5\\,000$.\na) Complète : $u(n+1) = \\ldots$\nb) Complète : $v(n+1) = \\ldots$\nc) Donne $u(1)$ et $v(1)$, dans cet ordre.\nd) Quel contrat est le moins cher l'année 1 ? Écris sa lettre.",
          reponses: [
            { question: "a)", attendu: relation("u(n) + 100", "100 + u(n)") },
            { question: "b)", attendu: relationV("1,03 × v(n)", "1,03v(n)", "1,03*v(n)", "v(n) × 1,03") },
            { question: "c)", attendu: "5 100 ; 5 150", ordre: true },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) 100 €, c'est une quantité fixe : $u(n+1) = u(n) + 100$.\nb) 3 %, c'est un pourcentage, donc un coefficient : $v(n+1) = 1{,}03 \\times v(n)$.\nc) $u(1) = 5\\,000 + 100 = 5\\,100$, et $v(1) = 5\\,000 \\times 1{,}03 = 5\\,150$.\nd) 5 100 est plus petit que 5 150 : le contrat A est le moins cher.\n⛔ Le piège au b) : ajouter 3 au loyer. Le mot « % » annonce une multiplication.\nRéponse : a) u(n+1) = u(n) + 100 ; b) v(n+1) = 1,03 × v(n) ; c) 5 100 ; 5 150 ; d) A.",
          micros: ["suite_gen_recurrence"],
        },
        {
          titre: "Le glacier de la glaciologue",
          enonce:
            "Une glaciologue étudie un glacier fictif de 1 000 m de long, noté $u(0)$. Dans son modèle, la longueur baisse de 2 % par an.\na) Par quel coefficient multiplie-t-on chaque année ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Donne $u(1)$ et $u(2)$, dans cet ordre.\nd) Un journaliste écrit : « Le glacier perd 20 m chaque année. » Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "0,98" },
            { question: "b)", attendu: relation("0,98 × u(n)", "0,98u(n)", "0,98*u(n)", "u(n) × 0,98") },
            { question: "c)", attendu: "980 ; 960,4", ordre: true },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) Une baisse de 2 % multiplie par $1 - 0{,}02 = 0{,}98$.\nb) $u(n+1) = 0{,}98 \\times u(n)$.\nc) $u(1) = 1\\,000 \\times 0{,}98 = 980$, puis $u(2) = 980 \\times 0{,}98 = 960{,}4$.\nd) Faux : la première année le glacier perd 20 m, mais la deuxième $980 - 960{,}4 = 19{,}6$ m.\n⛔ Le piège au d) : croire qu'un pourcentage constant donne une quantité constante. Il s'applique à une longueur qui a changé.\nRéponse : a) 0,98 ; b) u(n+1) = 0,98 × u(n) ; c) 980 ; 960,4 ; d) faux.",
          micros: ["suite_gen_recurrence"],
        },
      ],
    },
  ],
};
