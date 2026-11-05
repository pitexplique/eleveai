// ─── Fiche d'exercices : boucles et instruction conditionnelle (STMG) — 20 exercices ─
//
// Notion algo_boucles du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// compter les tours de range(n) et range(a, b), le if / elif / else (et l'ordre
// des conditions), la boucle while de recherche de seuil, le FORMAT DU BAC en
// langage naturel (« ← », « Tant que » : que contient n à la fin, quelle ligne
// compléter, quelle année en déduire), et le déroulement d'un programme.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus et piscine municipale (ex. 1 à 8) ; épargne
// (conseiller financier), serre (horticultrice), recyclage (chargée de mission),
// littoral (garde du littoral), tennis (président de club), pluie (météorologue),
// réseaux sociaux (community manager), apiculture (apicultrice), rivière
// (technicien de l'eau), club de sport (trésorière), chaînes vidéo (vidéaste),
// immobilier (agent).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs`.
//
// Micro-compétences : algo_boucle_bornee (1, 2, 3, 9, 14, 18), algo_condition_si
// (4, 5, 6, 10, 14, 18), algo_boucle_conditionnelle (7, 11, 12, 13, 17, 19, 20),
// algo_derouler (3, 8, 15, 16, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme, trace } from "@/lib/fiches-exercices/figures";

export const exercicesAlgoBouclesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "algo-boucles",
  titre: "Boucles et instruction conditionnelle",
  accroche:
    "Vingt exercices pour dérouler un programme : compter les tours d'une boucle, choisir la bonne branche d'un if, chercher un seuil avec « Tant que », comme au bac. Une serre, une rivière, un club de tennis, des oiseaux du littoral, deux chaînes vidéo : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Compter les tours, tester une condition, ou dérouler une boucle courte.",
      rappel: [
        "for i in range(n) : le bloc décalé tourne n fois, et i va de 0 à n − 1. range(a, b) : i va de a à b − 1, soit b − a tours.",
        "if / elif / else : on teste les conditions dans l'ordre, et on s'arrête à la première qui est vraie.",
        "while : on répète tant que la condition est vraie. En langage naturel, on écrit « Tant que », et x ← 3 veut dire « x reçoit 3 ».",
      ],
      exercices: [
        {
          enonce: "On regarde cette boucle.\na) Combien de tours fait-elle ?\nb) Qu'affiche le programme ?",
          figure: programme(["s = 0", "for i in range(6):", "    s = s + 2", "print(s)"]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "12" },
          ],
          correction:
            "a) range(6) donne 0, 1, 2, 3, 4, 5 : cela fait 6 tours.\nb) s gagne 2 à chaque tour : $6 \\times 2 = 12$.\n⛔ Le piège au a) : répondre 5 parce que i s'arrête à 5. On compte aussi le tour où i vaut 0.\nRéponse : a) 6 ; b) 12.",
          micros: ["algo_boucle_bornee"],
        },
        {
          enonce: "On regarde cette boucle.\na) Combien de tours fait-elle ?\nb) Quelle est la dernière valeur prise par i ?",
          figure: programme(["for i in range(3, 8):", "    print(i)"]),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "7" },
          ],
          correction:
            "a) i prend les valeurs 3, 4, 5, 6, 7 : cela fait $8 - 3 = 5$ tours.\nb) La borne de droite n'est jamais atteinte : la dernière valeur est 7.\n⛔ Le piège au b) : répondre 8. Dans range(3, 8), le 3 est inclus, le 8 ne l'est pas.\nRéponse : a) 5 ; b) 7.",
          micros: ["algo_boucle_bornee"],
        },
        {
          enonce: "Qu'affiche ce programme, ligne après ligne ? Écris les nombres dans l'ordre, séparés par des points-virgules.",
          figure: programme(["for i in range(4):", "    print(i)"]),
          reponses: [{ attendu: "0 ; 1 ; 2 ; 3", ordre: true }],
          correction:
            "range(4) commence à 0 et s'arrête avant 4.\nLe print est dans la boucle : il écrit une ligne à chaque tour.\n⛔ Le piège : écrire 1 ; 2 ; 3 ; 4. En Python, on compte à partir de 0.\nRéponse : 0 ; 1 ; 2 ; 3.",
          micros: ["algo_boucle_bornee", "algo_derouler"],
        },
        {
          enonce: "Qu'affiche ce programme ? Écris le mot affiché.",
          figure: programme(["note = 8", "if note >= 10:", "    print('oui')", "else:", "    print('non')"]),
          reponses: [{ attendu: "non" }],
          correction:
            "On teste la condition : 8 est-il supérieur ou égal à 10 ? Non.\nLa condition est fausse : on saute le bloc du if et on exécute celui du else.\n⛔ Le piège : exécuter les deux blocs. Un seul des deux s'exécute.\nRéponse : non.",
          micros: ["algo_condition_si"],
        },
        {
          enonce: "Une piscine municipale fixe son tarif selon l'âge (modèle). Qu'affiche ce programme ?",
          figure: programme(["age = 16", "if age < 12:", "    p = 5", "elif age < 18:", "    p = 8", "else:", "    p = 12", "print(p)"]),
          reponses: [{ attendu: "8" }],
          correction:
            "16 < 12 est faux : on passe au elif.\n16 < 18 est vrai : p reçoit 8, et on ne regarde pas le else.\n⛔ Le piège : répondre 12 parce que 16 ans semble « grand ». On suit les tests dans l'ordre, sans deviner.\nRéponse : 8.",
          micros: ["algo_condition_si"],
        },
        {
          enonce: "Ce programme devrait donner 15 % de remise à partir de 500 €, et 5 % à partir de 200 €. Qu'affiche-t-il pour un montant de 900 € ?",
          figure: programme(["m = 900", "if m >= 200:", "    r = 5", "elif m >= 500:", "    r = 15", "else:", "    r = 0", "print(r)"]),
          reponses: [{ attendu: "5" }],
          correction:
            "900 >= 200 est vrai : r reçoit 5, et on s'arrête là. Le elif n'est jamais testé.\nLa branche à 15 % ne sert donc jamais. Il faudrait tester le plus grand seuil en premier.\n⛔ Le piège : répondre 15 parce que 900 dépasse 500. Les conditions ne sont pas un ensemble de règles : la première vraie gagne.\nRéponse : 5.",
          micros: ["algo_condition_si"],
        },
        {
          enonce: "Qu'affiche ce programme ?",
          figure: programme(["x = 1", "n = 0", "while x < 20:", "    x = x * 2", "    n = n + 1", "print(n)"]),
          reponses: [{ attendu: "5" }],
          correction:
            "x prend les valeurs 1, 2, 4, 8, 16, 32.\nÀ 32, la condition x < 20 devient fausse et la boucle s'arrête.\nOn a doublé 5 fois : n vaut 5.\n⛔ Le piège : répondre 32. Le programme affiche n, le nombre de tours, et non x.\nRéponse : 5.",
          micros: ["algo_boucle_conditionnelle"],
        },
        {
          enonce: "Cet algorithme est écrit en langage naturel. Quelle valeur affiche-t-il ?",
          figure: programme(["u ← 3", "n ← 0", "Tant que n < 3", "    u ← u + 4", "    n ← n + 1", "Fin Tant que", "Afficher u"]),
          reponses: [{ attendu: "15" }],
          correction:
            "n vaut 0, 1, puis 2 : la boucle fait 3 tours. À n = 3, la condition est fausse.\nu prend les valeurs 7, 11, puis 15.\n⛔ Le piège : faire un tour de plus quand n vaut 3, ce qui donne 19. La condition n < 3 exclut 3.\nRéponse : 15.",
          micros: ["algo_derouler"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation, un algorithme : on le complète, on le déroule, on interprète le résultat.",
      rappel: [
        "Hausse de t % : on multiplie par 1 + t ÷ 100. Baisse de t % : on multiplie par 1 − t ÷ 100.",
        "Un algorithme de seuil a quatre morceaux : les valeurs de départ, la condition, l'évolution de la grandeur, le comptage.",
        "Hausse de t % : l'évolution est une multiplication (suite géométrique). Hausse de r unités : c'est une addition (suite arithmétique).",
        "La variable de comptage donne un nombre d'années : on l'ajoute à l'année de départ.",
      ],
      exercices: [
        {
          enonce:
            "Un conseiller financier place 500 € à 10 % par an (modèle).\na) Combien de tours fait la boucle ?\nb) Qu'affiche le programme ?",
          figure: programme(["capital = 500", "for i in range(3):", "    capital = capital * 1.1", "print(round(capital, 2))"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "665,5" },
          ],
          correction:
            "a) range(3) fait 3 tours.\nb) Le capital prend les valeurs 550, 605, puis 665,5.\n$500 \\times 1{,}1^3 = 665{,}5$.\n⛔ Le piège au b) : calculer $500 + 3 \\times 50 = 650$. Chaque tour prend 10 % de la nouvelle valeur, pas de la première.\nRéponse : a) 3 ; b) 665,5.",
          micros: ["algo_boucle_bornee"],
        },
        {
          enonce:
            "Une horticultrice programme l'alarme de sa serre : t est la température, en °C. Le programme écrit ici t = 31. Quel mot affiche-t-il dans chaque cas ?\na) t = 31\nb) t = 40\nc) t = 28",
          figure: programme(["t = 31", "if t > 35:", "    print('alerte')", "elif t > 28:", "    print('aerer')", "else:", "    print('rien')"]),
          reponses: [
            { question: "a)", attendu: "aerer" },
            { question: "b)", attendu: "alerte" },
            { question: "c)", attendu: "rien" },
          ],
          correction:
            "a) 31 > 35 est faux, 31 > 28 est vrai : aerer.\nb) 40 > 35 est vrai : alerte, et on s'arrête.\nc) 28 > 35 est faux, 28 > 28 est faux aussi : rien.\n⛔ Le piège au c) : répondre aerer. Le signe > exclut l'égalité : 28 n'est pas strictement plus grand que 28.\nRéponse : a) aerer ; b) alerte ; c) rien.",
          micros: ["algo_condition_si"],
        },
        {
          enonce:
            "Une chargée de mission modélise le taux de recyclage d'une ville : 60 % en 2024, avec une hausse de 5 % par an. V est ce taux, et n le nombre d'années écoulées.\na) Par quel coefficient faut-il remplacer les pointillés ?\nb) Que contient n à la fin ?\nc) En quelle année le taux atteint-il 70 % ?",
          figure: programme(["V ← 60", "n ← 0", "Tant que V < 70", "    V ← ...... × V", "    n ← n + 1", "Fin Tant que"]),
          reponses: [
            { question: "a)", attendu: "1,05" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "2028" },
          ],
          correction:
            "a) Une hausse de 5 % revient à multiplier par 1,05.\nb) V prend les valeurs 63, puis 66,15, puis environ 69,46, puis environ 72,93. Au 4e tour, V dépasse 70 : n vaut 4.\nc) n compte les années depuis 2024 : $2024 + 4 = 2028$.\n⛔ Le piège au c) : répondre 4. L'algorithme donne un nombre d'années, la question demande une date.\nRéponse : a) 1,05 ; b) 4 ; c) 2028.",
          schema: trace(["n", "V"], [[0, "60"], [1, "63"], [2, "66,15"], [3, "69,46"], [4, "72,93"]]),
          micros: ["algo_boucle_conditionnelle"],
        },
        {
          enonce:
            "Une garde du littoral compte 8 000 oiseaux en 2025 (modèle). La population baisse de 10 % par an. N est le nombre d'oiseaux, A l'année.\na) Par quoi faut-il remplacer les pointillés ? Écris le calcul, avec N.\nb) Que contient A à la fin ?",
          figure: programme(["N ← 8000", "A ← 2025", "Tant que N > 5000", "    N ← ..........", "    A ← A + 1", "Fin Tant que"]),
          reponses: [
            { question: "a)", attendu: ["0,9 × N", "N × 0,9", "0,9xN", "Nx0,9", "0,9N", "N - 0,1 × N", "N - 0,1N", "N × (1 - 0,1)"], exact: true },
            { question: "b)", attendu: "2030" },
          ],
          correction:
            "a) Une baisse de 10 % revient à multiplier par $1 - 0{,}1 = 0{,}9$ : on écrit 0,9 × N.\nb) N prend les valeurs 7 200, 6 480, 5 832, environ 5 249, puis environ 4 724. Il passe sous 5 000 au 5e tour.\n$2025 + 5 = 2030$.\n⛔ Le piège au a) : écrire N − 10. La baisse est de 10 %, pas de 10 oiseaux.\nRéponse : a) 0,9 × N ; b) 2030.",
          micros: ["algo_boucle_conditionnelle"],
        },
        {
          enonce:
            "Le président d'un club de tennis compte 200 adhérents en 2024 (modèle), et 30 de plus chaque année. Il cherche l'année où le club atteint 350 adhérents. C est le nombre d'adhérents, A l'année.\na) Que faut-il écrire après A ← ? Écris le calcul, avec A.\nb) Que faut-il écrire après C ← ? Écris le calcul, avec C.\nc) Que contient A à la fin ?",
          figure: programme(["C ← 200", "A ← 2024", "Tant que C < 350", "    A ← ..........", "    C ← ..........", "Fin Tant que"]),
          reponses: [
            { question: "a)", attendu: ["A + 1", "1 + A"], exact: true },
            { question: "b)", attendu: ["C + 30", "30 + C"], exact: true },
            { question: "c)", attendu: "2029" },
          ],
          correction:
            "a) A avance d'une année à chaque tour : A + 1.\nb) Une hausse de 30 adhérents par an est une addition : C + 30.\nc) C prend les valeurs 230, 260, 290, 320, 350. À 350, la condition C < 350 est fausse : la boucle s'arrête après 5 tours. $2024 + 5 = 2029$.\n⛔ Le piège au b) : écrire 1,3 × C. Ici la hausse est fixe : c'est une suite arithmétique.\nRéponse : a) A + 1 ; b) C + 30 ; c) 2029.",
          micros: ["algo_boucle_conditionnelle"],
        },
        {
          enonce:
            "Un météorologue relève la pluie de six jours, en mm (modèle).\na) Qu'affiche le programme ?\nb) Combien de tours fait la boucle ?",
          figure: programme(["p = [2, 14, 0, 25, 11, 16]", "c = 0", "for v in p:", "    if v > 10:", "        c = c + 1", "print(c)"]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) On teste chaque jour : 14, 25, 11 et 16 dépassent 10. Le compteur vaut 4.\nb) La boucle lit toutes les valeurs de la liste, même celles qui ne passent pas le test : 6 tours.\n⛔ Le piège au b) : répondre 4. Le if décide si l'on compte, pas si l'on fait le tour.\nRéponse : a) 4 ; b) 6.",
          micros: ["algo_boucle_bornee", "algo_condition_si"],
        },
        {
          enonce:
            "Une community manager modélise le nombre de partages d'une vidéo avec ce programme.\na) Que vaut u après le 1er tour ?\nb) Que vaut u après le 2e tour ?\nc) Qu'affiche le programme ?",
          figure: programme(["u = 3", "for i in range(4):", "    u = 2 * u + 1", "print(u)"]),
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "63" },
          ],
          correction:
            "On note u après chaque tour.\na) $2 \\times 3 + 1 = 7$.\nb) $2 \\times 7 + 1 = 15$.\nc) $2 \\times 15 + 1 = 31$, puis $2 \\times 31 + 1 = 63$.\n⛔ Le piège : repartir de 3 à chaque tour. La ligne utilise toujours la dernière valeur de u.\nRéponse : a) 7 ; b) 15 ; c) 63.",
          schema: trace(["tour", "u"], [[1, 7], [2, 15], [3, 31], [4, 63]]),
          micros: ["algo_derouler"],
        },
        {
          enonce:
            "Une apicultrice modélise une colonie de 2 000 abeilles qui grandit de 20 % par période.\na) Combien de tours fait la boucle ?\nb) Que vaut N à la fin ?\nc) Quelle valeur l'algorithme affiche-t-il ?",
          figure: programme(["C ← 2000", "N ← 0", "Tant que N < 3", "    C ← C × 1,2", "    N ← N + 1", "Fin Tant que", "Afficher C"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "3 456" },
          ],
          correction:
            "a) N vaut 0, 1, puis 2 au moment du test : 3 tours.\nb) Après le 3e tour, N vaut 3. La condition est fausse : on sort.\nc) C prend les valeurs 2 400, 2 880, puis 3 456.\n⛔ Le piège au c) : calculer $2\\,000 \\times 1{,}2 \\times 3 = 7\\,200$. Trois hausses à la suite, c'est multiplier trois fois par 1,2.\nRéponse : a) 3 ; b) 3 ; c) 3 456.",
          micros: ["algo_derouler"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un algorithme entier : on le complète, on le déroule dans un tableau, puis on répond dans la situation.",
      rappel: [
        "Pour dérouler : un tableau, une ligne par tour, et on s'arrête dès que la condition devient fausse.",
        "for quand on connaît le nombre de tours ; while quand on ne le connaît pas à l'avance : c'est le cas d'un seuil.",
        "À la fin, on répond dans la situation : une année, un montant, un nombre de mois.",
      ],
      exercices: [
        {
          titre: "La rivière qui se dépollue",
          enonce:
            "Un technicien de l'eau mesure 1 200 mg de polluant par litre en 2025 (modèle). Ce taux baisse de 15 % par an. Il veut l'année où il passe sous 600 mg. Q est ce taux, n le nombre d'années écoulées.\na) Écris le calcul à mettre après Q ←, avec Q.\nb) Écris la condition à mettre après Tant que.\nc) Que contient n à la fin ?\nd) En quelle année le taux passe-t-il sous 600 mg ?",
          figure: programme(["Q ← 1200", "n ← 0", "Tant que ..........", "    Q ← ..........", "    n ← n + 1", "Fin Tant que"]),
          reponses: [
            { question: "a)", attendu: ["0,85 × Q", "Q × 0,85", "0,85xQ", "Qx0,85", "0,85Q", "Q - 0,15 × Q", "Q - 0,15Q", "Q × (1 - 0,15)"], exact: true },
            { question: "b)", attendu: ["Q > 600", "Q >= 600", "Q ≥ 600", "600 < Q", "600 <= Q", "600 ≤ Q"], exact: true },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "2030" },
          ],
          correction:
            "a) Une baisse de 15 % revient à multiplier par $1 - 0{,}15 = 0{,}85$.\nb) On répète tant que le seuil n'est pas franchi : Q > 600.\nc) Q prend les valeurs 1 020, 867, environ 737, environ 626, environ 532. Il passe sous 600 au 5e tour : n vaut 5.\nd) $2025 + 5 = 2030$.\n⛔ Le piège au b) : écrire Q < 600. La boucle ne tournerait pas du tout, car 1 200 n'est pas sous 600 : la condition dit quand on CONTINUE.\nRéponse : a) 0,85 × Q ; b) Q > 600 ; c) 5 ; d) 2030.",
          schema: trace(["n", "Q"], [[0, "1 200"], [1, "1 020"], [2, "867"], [3, "736,95"], [4, "626,41"], [5, "532,45"]]),
          micros: ["algo_boucle_conditionnelle"],
        },
        {
          titre: "Les cotisations du club",
          enonce:
            "La trésorière d'un club de sport calcule les cotisations de cinq adhérents (modèle).\na) Combien de tours fait la boucle ?\nb) Quelle cotisation paie l'adhérent de 15 ans ?\nc) Qu'affiche le programme ?",
          figure: programme(["ages = [10, 15, 30, 17, 40]", "total = 0", "for a in ages:", "    if a < 12:", "        total = total + 20", "    elif a < 18:", "        total = total + 35", "    else:", "        total = total + 60", "print(total)"]),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "35 €" },
            { question: "c)", attendu: "210" },
          ],
          correction:
            "a) La liste a 5 âges : 5 tours.\nb) 15 < 12 est faux, 15 < 18 est vrai : 35 €.\nc) On suit total : 10 ans donne 20, 15 ans donne 55, 30 ans donne 115, 17 ans donne 150, 40 ans donne 210.\n⛔ Le piège au b) : ajouter 20 et 35. Une seule branche s'exécute à chaque tour.\nRéponse : a) 5 ; b) 35 € ; c) 210.",
          schema: trace(["a", "ajout", "total"], [[10, 20, 20], [15, 35, 55], [30, 60, 115], [17, 35, 150], [40, 60, 210]]),
          micros: ["algo_boucle_bornee", "algo_condition_si", "algo_derouler"],
        },
        {
          titre: "Les deux chaînes vidéo",
          enonce:
            "Un vidéaste compare deux chaînes de 100 abonnés (modèle). La chaîne A gagne 30 abonnés par mois. La chaîne B gagne 20 % par mois.\na) Combien d'abonnés a la chaîne A après un mois ?\nb) Combien d'abonnés a la chaîne B après un mois ?\nc) Qu'affiche le programme ?\nd) Combien d'abonnés a la chaîne A à ce moment-là ?",
          figure: programme(["a = 100", "b = 100", "m = 0", "while b <= a:", "    a = a + 30", "    b = b * 1.2", "    m = m + 1", "print(m)"]),
          reponses: [
            { question: "a)", attendu: "130" },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "280" },
          ],
          correction:
            "a) $100 + 30 = 130$.\nb) $100 \\times 1{,}2 = 120$.\nc) On déroule (voir le tableau). Au 6e mois, b vaut environ 298,6 et a vaut 280 : b dépasse a, la boucle s'arrête. Le programme affiche 6.\nd) a a reçu 30 six fois : $100 + 6 \\times 30 = 280$.\n⛔ Le piège : croire que la chaîne A garde son avance. Une hausse en pourcentage finit par dépasser une hausse fixe.\nRéponse : a) 130 ; b) 120 ; c) 6 ; d) 280.",
          schema: trace(["m", "a", "b"], [[1, 130, "120"], [2, 160, "144"], [3, 190, "172,8"], [4, 220, "207,36"], [5, 250, "248,83"], [6, 280, "298,60"]]),
          micros: ["algo_boucle_conditionnelle", "algo_derouler"],
        },
        {
          titre: "Le loyer",
          enonce:
            "Un agent immobilier suit un loyer de 600 € qui augmente de 2 % par an (modèle). Il a écrit deux programmes.\nProgramme 1 : le loyer après 5 ans, avec for i in range(5).\nProgramme 2 : le nombre d'années pour dépasser 650 €, dessiné ci-dessous.\na) Quel est le loyer après 5 ans, arrondi au centime ?\nb) Qu'affiche le programme 2 ?\nc) Quel mot de Python choisit-on quand on ne connaît pas le nombre de tours à l'avance ? Écris for ou while.",
          figure: programme(["l = 600", "n = 0", "while l <= 650:", "    l = l * 1.02", "    n = n + 1", "print(n)"]),
          reponses: [
            { question: "a)", attendu: "662,45 €", tolerance: 0.005 },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "while" },
          ],
          correction:
            "a) $600 \\times 1{,}02^5 \\approx 662{,}45$ €.\nb) l prend les valeurs 612 ; 624,24 ; environ 636,72 ; environ 649,46 ; environ 662,45. Après 4 tours, on est encore sous 650. Il faut 5 tours : le programme affiche 5.\nc) On ne sait pas d'avance combien de tours il faudra : while.\n⛔ Le piège au b) : s'arrêter à 649,46 parce que c'est « presque 650 ». La boucle continue tant que l <= 650.\nRéponse : a) 662,45 € ; b) 5 ; c) while.",
          micros: ["algo_boucle_conditionnelle", "algo_derouler"],
        },
      ],
    },
  ],
};
