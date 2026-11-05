// ─── Fiche d'exercices : les listes en Python (STMG) — 20 exercices ─────────────
//
// Notion algo_listes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// la liste en compréhension et l'instruction qui la produit, L[i] et le dernier
// indice, for v in L et for i in range(len(L)), le maximum, append et la liste
// construite par un filtre, len(L). ⛔ Le libellé de la micro dit « ajouter ou
// supprimer », mais la banque ne supprime jamais : la feuille non plus.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; marché aux poissons
// (poissonnière), montagne (guide), natation (coach), ressources humaines (RH),
// électricité (conseiller énergie), laboratoire (biologiste), lycée (enseignante),
// théâtre (directeur), livraison (préparateur de colis), handball (statisticienne
// du club), librairie (libraire), climat (climatologue, modèle).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs`.
//
// Micro-compétences : algo_liste_generer (4, 5, 11, 14, 18), algo_liste_indices
// (1, 2, 3, 12, 13, 18, 20), algo_liste_parcourir (7, 8, 10, 15, 16, 17, 19, 20),
// algo_liste_modifier (6, 9, 14, 17, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme, trace } from "@/lib/fiches-exercices/figures";
import { liste } from "@/lib/fiches-exercices/stmg-algo-tableur-outils";

export const exercicesAlgoListesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "algo-listes",
  titre: "Listes",
  accroche:
    "Vingt exercices sur les listes de Python : créer une liste, lire L[0], parcourir ses valeurs, ajouter un élément avec append, garder ce qui passe un test. Un marché aux poissons, des sommets, un théâtre, des colis, un relevé de températures : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire une valeur, écrire une liste, ou parcourir une liste courte.",
      rappel: [
        "Une liste s'écrit entre crochets : L = [4, 7, 2]. Le premier élément est L[0], le deuxième L[1].",
        "len(L) donne le nombre d'éléments. Une liste de n éléments s'arrête à l'indice n − 1.",
        "L.append(v) ajoute v à la fin. [10 * i for i in range(3)] applique le calcul à i = 0, 1, 2 : c'est une liste en compréhension.",
        "for v in L donne les VALEURS de la liste ; for i in range(len(L)) donne les POSITIONS.",
      ],
      exercices: [
        {
          enonce: "Qu'affiche ce programme ?",
          figure: programme(["L = [15, 8, 23, 4]", "print(L[2])"]),
          reponses: [{ attendu: "23" }],
          correction:
            "On compte les positions à partir de 0 : L[0] vaut 15, L[1] vaut 8, L[2] vaut 23.\n⛔ Le piège : répondre 8 en comptant à partir de 1. L'indice 2 désigne le troisième élément.\nRéponse : 23.",
          micros: ["algo_liste_indices"],
        },
        {
          enonce: "On donne la liste L ci-dessous.\na) Que vaut L[0] ?\nb) Que vaut L[4] ?\nc) Que vaut len(L) ?",
          figure: programme(["L = [30, 12, 45, 9, 27]"]),
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "27" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) L[0] est le premier élément : 30.\nb) L[4] est le cinquième élément : 27.\nc) len(L) compte les éléments : il y en a 5.\n⛔ Le piège au c) : répondre 4, le dernier indice. Il y a bien 5 éléments, numérotés de 0 à 4.\nRéponse : a) 30 ; b) 27 ; c) 5.",
          micros: ["algo_liste_indices"],
        },
        {
          enonce: "Quelle écriture donne le dernier élément de cette liste ? Écris-la, sous la forme L[…].",
          figure: programme(["L = [5, 9, 1, 7, 3, 8]"]),
          reponses: [{ attendu: ["L[5]", "L[-1]"], exact: true }],
          correction:
            "La liste a 6 éléments : leurs indices vont de 0 à 5.\nLe dernier élément est donc L[5], qui vaut 8. En Python, L[-1] le désigne aussi.\n⛔ Le piège : écrire L[6]. Cet indice n'existe pas : Python renverrait une erreur.\nRéponse : L[5].",
          micros: ["algo_liste_indices"],
        },
        {
          enonce: "Que contient la liste L ? Écris ses éléments dans l'ordre, séparés par des points-virgules.",
          figure: programme(["L = [2 * i for i in range(4)]"]),
          reponses: [{ attendu: liste(0, 2, 4, 6), ordre: true }],
          correction:
            "i prend les valeurs 0, 1, 2, 3.\nOn applique le calcul : $2 \\times 0 = 0$, $2 \\times 1 = 2$, $2 \\times 2 = 4$, $2 \\times 3 = 6$.\nLa liste est [0, 2, 4, 6].\n⛔ Le piège : écrire 2 ; 4 ; 6 ; 8, en faisant commencer i à 1.\nRéponse : 0 ; 2 ; 4 ; 6.",
          micros: ["algo_liste_generer"],
        },
        {
          enonce: "Que contient la liste C ? Écris ses éléments dans l'ordre, séparés par des points-virgules.",
          figure: programme(["C = [i * i for i in range(5)]"]),
          reponses: [{ attendu: liste(0, 1, 4, 9, 16), ordre: true }],
          correction:
            "i prend les valeurs 0, 1, 2, 3, 4, et chacune est multipliée par elle-même.\nLa liste est [0, 1, 4, 9, 16].\n⛔ Le piège : aller jusqu'à $5 \\times 5 = 25$. range(5) s'arrête à 4.\nRéponse : 0 ; 1 ; 4 ; 9 ; 16.",
          micros: ["algo_liste_generer"],
        },
        {
          enonce: "Que contient la liste L à la fin ? Écris ses éléments dans l'ordre, séparés par des points-virgules.",
          figure: programme(["L = [3, 6]", "L.append(9)", "L.append(1)"]),
          reponses: [{ attendu: liste(3, 6, 9, 1), ordre: true }],
          correction:
            "append ajoute à la fin, dans l'ordre des appels.\nAprès le premier append : [3, 6, 9]. Après le second : [3, 6, 9, 1].\n⛔ Le piège : ranger la liste par ordre croissant. append ne trie rien.\nRéponse : 3 ; 6 ; 9 ; 1.",
          micros: ["algo_liste_modifier"],
        },
        {
          enonce: "Qu'affiche ce programme, ligne après ligne ? Écris les nombres dans l'ordre, séparés par des points-virgules.",
          figure: programme(["L = [7, 2, 5]", "for i in range(len(L)):", "    print(i)"]),
          reponses: [{ attendu: "0 ; 1 ; 2", ordre: true }],
          correction:
            "len(L) vaut 3, donc i prend les valeurs 0, 1, 2.\nLe programme affiche i, la position, et non la valeur.\n⛔ Le piège : répondre 7 ; 2 ; 5. Pour afficher les valeurs, il faudrait print(L[i]).\nRéponse : 0 ; 1 ; 2.",
          micros: ["algo_liste_parcourir"],
        },
        {
          enonce: "Ce programme parcourt une liste de quatre nombres. Qu'affiche-t-il ?",
          figure: programme(["L = [4, 11, 6, 9]", "s = 0", "for v in L:", "    s = s + v", "print(s)"]),
          reponses: [{ attendu: "30" }],
          correction:
            "for v in L donne les valeurs une à une : 4, 11, 6, 9.\ns les additionne : $4 + 11 + 6 + 9 = 30$.\n⛔ Le piège : additionner les positions ($0 + 1 + 2 + 3 = 6$). Ici v est la valeur, pas la position.\nRéponse : 30.",
          micros: ["algo_liste_parcourir"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation, une liste : on suit le programme tour après tour et on répond.",
      rappel: [
        "Une liste qui part vide (L = []) ne contient, à la fin, que ce qu'on y a ajouté avec append.",
        "Pour chercher le maximum : m part de L[0], et m change seulement si une valeur plus grande arrive.",
        "On peut construire une liste en boucle : à chaque tour, on calcule une valeur et on l'ajoute.",
      ],
      exercices: [
        {
          enonce:
            "Une poissonnière garde les poissons de plus de 30 cm dans une liste (modèle).\na) Que contient L à la fin ? Écris ses éléments dans l'ordre, séparés par des points-virgules.\nb) Qu'affiche le programme ?",
          figure: programme(["d = [12, 45, 8, 33, 27, 51]", "L = []", "for v in d:", "    if v > 30:", "        L.append(v)", "print(len(L))"]),
          reponses: [
            { question: "a)", attendu: liste(45, 33, 51), ordre: true },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "a) L part vide. Seules les valeurs au-dessus de 30 y entrent : L vaut [45, 33, 51].\nb) len(L) donne le nombre d'éléments : 3.\n⛔ Le piège au b) : répondre 6, la longueur de d. Le programme affiche la longueur de L.\nRéponse : a) 45 ; 33 ; 51 ; b) 3.",
          micros: ["algo_liste_modifier"],
        },
        {
          enonce:
            "Un guide de montagne note l'altitude de quatre sommets, en mètres (modèle).\na) Que vaut m après le 2e tour de boucle ?\nb) Qu'affiche le programme ?",
          figure: programme(["L = [1200, 850, 2100, 1700]", "m = L[0]", "for v in L:", "    if v > m:", "        m = v", "print(m)"]),
          reponses: [
            { question: "a)", attendu: "1 200" },
            { question: "b)", attendu: "2 100" },
          ],
          correction:
            "m part de 1 200.\na) 1er tour : 1 200 n'est pas plus grand que m. 2e tour : 850 non plus. m vaut toujours 1 200.\nb) 3e tour : 2 100 est plus grand, m devient 2 100. 4e tour : 1 700 ne change rien.\n⛔ Le piège au b) : répondre 1 700, la dernière valeur lue. m ne change que si une valeur plus grande arrive.\nRéponse : a) 1 200 ; b) 2 100.",
          schema: trace(["tour", "v", "m"], [[1, 1200, 1200], [2, 850, 1200], [3, 2100, 2100], [4, 1700, 2100]]),
          micros: ["algo_liste_parcourir"],
        },
        {
          enonce:
            "Une coach de natation veut la liste des longueurs à nager : 5, 10, 15, 20.\nA : [5 * i for i in range(4)]\nB : [5 * (i + 1) for i in range(4)]\nC : [5 * i for i in range(1, 4)]\na) Quelle instruction produit cette liste ? Réponds par la lettre.\nb) Que contient la liste de l'instruction A ? Écris ses éléments dans l'ordre, séparés par des points-virgules.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: liste(0, 5, 10, 15), ordre: true },
          ],
          correction:
            "a) Avec B, i + 1 vaut 1, 2, 3, 4 : on obtient 5, 10, 15, 20.\nb) Avec A, i vaut 0, 1, 2, 3 : on obtient [0, 5, 10, 15].\nC ne donne que 3 éléments : 5, 10, 15.\n⛔ Le piège au a) : choisir A. range commence à 0, donc la liste commencerait par 0.\nRéponse : a) B ; b) 0 ; 5 ; 10 ; 15.",
          micros: ["algo_liste_generer"],
        },
        {
          enonce:
            "Une responsable RH range quatre salaires bruts dans une liste, en euros (modèle).\na) Que vaut S[1] ?\nb) Quel est le dernier indice de la liste ?\nc) L'instruction print(S[4]) provoque-t-elle une erreur ? Réponds oui ou non.",
          figure: programme(["S = [1900, 2300, 2100, 3000]"]),
          reponses: [
            { question: "a)", attendu: "2 300" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) S[1] est le deuxième élément : 2 300.\nb) 4 éléments : les indices vont de 0 à 3.\nc) L'indice 4 n'existe pas : Python renvoie une erreur.\n⛔ Le piège au a) : répondre 1 900. S[0] vaut 1 900.\nRéponse : a) 2 300 ; b) 3 ; c) oui.",
          micros: ["algo_liste_indices"],
        },
        {
          enonce:
            "Un conseiller énergie note la consommation de quatre mois, en kWh (modèle).\na) Quel nombre la ligne 2 affiche-t-elle ?\nb) Quel nombre la ligne 3 affiche-t-elle ?",
          figure: programme(["C = [320, 280, 410, 350]", "print(C[0] + C[3])", "print(C[2] - C[1])"]),
          reponses: [
            { question: "a)", attendu: "670" },
            { question: "b)", attendu: "130" },
          ],
          correction:
            "a) C[0] vaut 320 et C[3] vaut 350 : $320 + 350 = 670$.\nb) C[2] vaut 410 et C[1] vaut 280 : $410 - 280 = 130$.\n⛔ Le piège : lire C[3] comme le 3e mois. C'est le 4e, car on compte à partir de 0.\nRéponse : a) 670 ; b) 130.",
          micros: ["algo_liste_indices"],
        },
        {
          enonce:
            "Un biologiste note une colonie de bactéries qui double à chaque période (modèle).\na) Que contient L à la fin ? Écris ses éléments dans l'ordre, séparés par des points-virgules.\nb) Que vaut L[3] ?",
          figure: programme(["x = 100", "L = [x]", "for i in range(3):", "    x = x * 2", "    L.append(x)", "print(L)"]),
          reponses: [
            { question: "a)", attendu: liste(100, 200, 400, 800), ordre: true },
            { question: "b)", attendu: "800" },
          ],
          correction:
            "a) L part avec 100. Puis, à chaque tour, x double et s'ajoute à la fin : L vaut [100, 200, 400, 800].\nb) L[3] est le quatrième élément : 800.\n⛔ Le piège au a) : oublier le 100 de départ, et ne compter que 3 éléments. La boucle fait 3 tours, mais la liste en avait déjà un.\nRéponse : a) 100 ; 200 ; 400 ; 800 ; b) 800.",
          micros: ["algo_liste_generer", "algo_liste_modifier"],
        },
        {
          enonce:
            "Une enseignante calcule la moyenne de cinq notes.\na) Que vaut len(n) ?\nb) Que vaut s à la fin ?\nc) Qu'affiche le programme ?",
          figure: programme(["n = [12, 8, 15, 9, 16]", "s = 0", "for v in n:", "    s = s + v", "print(s / len(n))"]),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) La liste contient 5 notes.\nb) $12 + 8 + 15 + 9 + 16 = 60$.\nc) $60 \\div 5 = 12$.\n⛔ Le piège au c) : diviser par 4, le dernier indice. On divise par le nombre de notes.\nRéponse : a) 5 ; b) 60 ; c) 12.",
          micros: ["algo_liste_parcourir"],
        },
        {
          enonce:
            "Le directeur d'un théâtre note le nombre de places vendues par soirée (modèle).\na) Quels nombres le programme affiche-t-il ? Écris-les dans l'ordre, séparés par des points-virgules.\nb) Que vaut P[3] ?",
          figure: programme(["P = [80, 120, 95, 150, 100]", "for i in range(len(P)):", "    if P[i] >= 100:", "        print(i)"]),
          reponses: [
            { question: "a)", attendu: "1 ; 3 ; 4", ordre: true },
            { question: "b)", attendu: "150" },
          ],
          correction:
            "a) On teste chaque position. Les valeurs à 100 ou plus sont 120 (position 1), 150 (position 3) et 100 (position 4).\nLe programme affiche i, donc 1, 3 et 4.\nb) P[3] vaut 150.\n⛔ Le piège au a) : écrire 120 ; 150 ; 100. La ligne est print(i), et non print(P[i]).\nRéponse : a) 1 ; 3 ; 4 ; b) 150.",
          micros: ["algo_liste_parcourir"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une liste, plusieurs variables : on suit tout dans un tableau, puis on répond dans la situation.",
      rappel: [
        "On peut, dans la même boucle, remplir une liste et cumuler un total.",
        "Quand on lit L[i + 1] dans une boucle, i doit s'arrêter un cran plus tôt, sinon on sort de la liste.",
        "Une position dans une liste se traduit dans la situation : l'indice 0 peut être janvier, l'indice 1 février…",
      ],
      exercices: [
        {
          titre: "Les colis lourds",
          enonce:
            "Un préparateur de colis met à part les colis de plus de 10 kg (modèle). La liste P donne les six masses, en kg.\na) Que contient L à la fin ? Écris ses éléments dans l'ordre, séparés par des points-virgules.\nb) Que vaut len(L) ?\nc) Que vaut total à la fin ?\nd) La masse totale des six colis est de 80 kg. Quel pourcentage de cette masse représentent les colis lourds ?",
          figure: programme(["P = [2, 15, 8, 31, 12, 12]", "L = []", "total = 0", "for v in P:", "    if v > 10:", "        L.append(v)", "        total = total + v", "print(L)", "print(total)"]),
          reponses: [
            { question: "a)", attendu: liste(15, 31, 12, 12), ordre: true },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "70" },
            { question: "d)", attendu: "87,5 %" },
          ],
          correction:
            "a) Au-dessus de 10 : L vaut [15, 31, 12, 12]. Le 12 entre deux fois : il y a deux colis de 12 kg.\nb) 4 éléments.\nc) $15 + 31 + 12 + 12 = 70$.\nd) $70 \\div 80 = 0{,}875$, soit 87,5 %.\n⛔ Le piège au a) : n'écrire le 12 qu'une fois. Une liste garde les doublons.\nRéponse : a) 15 ; 31 ; 12 ; 12 ; b) 4 ; c) 70 ; d) 87,5 %.",
          micros: ["algo_liste_parcourir", "algo_liste_modifier"],
        },
        {
          titre: "Le barème du tournoi",
          enonce:
            "Une statisticienne de club de handball construit un barème de points.\na) Que contient S ? Écris ses éléments dans l'ordre, séparés par des points-virgules.\nb) Que vaut S[2] ?\nc) On exécute S.append(20). Que vaut alors len(S) ?\nd) Quel est alors le dernier indice ?",
          figure: programme(["S = [3 * i + 1", "     for i in range(5)]"]),
          reponses: [
            { question: "a)", attendu: liste(1, 4, 7, 10, 13), ordre: true },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "5" },
          ],
          correction:
            "a) i vaut 0, 1, 2, 3, 4. Le calcul $3 \\times i + 1$ donne [1, 4, 7, 10, 13].\nb) S[2] est le troisième élément : 7.\nc) La liste avait 5 éléments, append en ajoute un : 6.\nd) Avec 6 éléments, les indices vont de 0 à 5.\n⛔ Le piège au a) : commencer à $3 \\times 1 + 1 = 4$. Le premier i vaut 0.\nRéponse : a) 1 ; 4 ; 7 ; 10 ; 13 ; b) 7 ; c) 6 ; d) 5.",
          micros: ["algo_liste_generer", "algo_liste_indices", "algo_liste_modifier"],
        },
        {
          titre: "Le meilleur mois",
          enonce:
            "Une libraire note ses ventes de janvier à mai (modèle). L'indice 0 correspond à janvier.\na) Que vaut m à la fin ?\nb) Que vaut r à la fin ?\nc) Quel mois a été le meilleur ? Écris son nom.",
          figure: programme(["V = [420, 510, 380, 640, 590]", "m = V[0]", "r = 0", "for i in range(len(V)):", "    if V[i] > m:", "        m = V[i]", "        r = i", "print(m, r)"]),
          reponses: [
            { question: "a)", attendu: "640" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: ["avril", "en avril"] },
          ],
          correction:
            "a) m garde la plus grande valeur rencontrée : 420, puis 510, puis 640. Le 590 n'y change rien.\nb) r garde la position de ce maximum : 640 est à l'indice 3.\nc) Indice 0 : janvier, 1 : février, 2 : mars, 3 : avril.\n⛔ Le piège au c) : répondre mars, en lisant l'indice 3 comme le 3e mois. L'indice 3 est le 4e élément.\nRéponse : a) 640 ; b) 3 ; c) avril.",
          schema: trace(["i", "V[i]", "m", "r"], [[0, 420, 420, 0], [1, 510, 510, 1], [2, 380, 510, 1], [3, 640, 640, 3], [4, 590, 640, 3]]),
          micros: ["algo_liste_parcourir"],
        },
        {
          titre: "Les écarts de température",
          enonce:
            "Une climatologue étudie cinq températures, en degrés (modèle). Elle calcule l'écart entre chaque valeur et la suivante.\na) Que contient E à la fin ? Écris ses éléments dans l'ordre, séparés par des points-virgules.\nb) Combien d'éléments E contient-il ?\nc) Quelle est la plus forte hausse d'une valeur à la suivante ?\nd) On écrit range(5) à la place de range(4). Le programme provoque-t-il une erreur ? Réponds oui ou non.",
          figure: programme(["T = [14, 16, 19, 23, 21]", "E = []", "for i in range(4):", "    E.append(T[i+1] - T[i])", "print(E)"]),
          reponses: [
            { question: "a)", attendu: liste(2, 3, 4, -2), ordre: true },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $16 - 14 = 2$, $19 - 16 = 3$, $23 - 19 = 4$, $21 - 23 = -2$. E vaut [2, 3, 4, -2].\nb) Quatre tours, donc 4 éléments.\nc) La plus grande valeur de E est 4.\nd) Oui : avec i = 4, T[i+1] serait T[5], qui n'existe pas.\n⛔ Le piège au a) : écrire 2 au lieu de −2 à la fin. L'ordre compte : la valeur suivante moins la valeur d'avant.\nRéponse : a) 2 ; 3 ; 4 ; −2 ; b) 4 ; c) 4 ; d) oui.",
          micros: ["algo_liste_indices", "algo_liste_parcourir", "algo_liste_modifier"],
        },
      ],
    },
  ],
};
