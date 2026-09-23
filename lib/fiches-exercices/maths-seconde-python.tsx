// ─── Fiche d'exercices : algorithmique et Python (seconde) ───────────────────
//
// Quatrième feuille du 23/09/2026. Alignée sur la banque
// `lib/tutor-v4/questionBank/seconde/maths/algorithmique-python.bank.ts`
// (notionId algorithmique_python_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-python.tsx`.
//
// ⭐ ICI, LE VISUEL EST LE CODE (la fiche de cours le disait déjà) : chaque
// programme est dans la FIGURE de l'énoncé (`programme()`), et le corrigé montre
// la TRACE — les valeurs des variables, tour après tour (`trace()`). Tracer, c'est
// le geste du chapitre.
// ⛔ LES DEUX PIÈGES DE LA FICHE DE COURS : `=` n'est pas l'égalité des maths
// (exercices 1, 2, 5) ; `/` rend toujours un flottant (exercices 3, 4, 10). Et
// un troisième, vu à l'exécution : `-1 ** 2` vaut `-1` (exercice 9), et
// `1 + 0.1 + 0.1 + 0.1 + 0.1` n'est pas `1.4` (exercice 20).
//
// ⭐ LE MONDE : un placement à 4 %, le CO₂ de l'atmosphère (Mauna Loa : environ
// 424 ppm en moyenne en 2024 selon la NOAA ; la hausse de 2,5 ppm par an est une
// HYPOTHÈSE de modèle, dite dans l'énoncé), un dé et la loi des grands nombres,
// la conjecture de Syracuse, √2 cherché au pas de 0,1.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-python.mjs` EXÉCUTE
// chaque programme avec Python et compare ce qu'il affiche au corrigé.
//
// Micro-compétences : python_variable_affectation (1, 2, 15, 18),
// python_type_variable (3, 4, 12, 15, 18, 20), python_condition (5, 6, 12, 14,
// 17, 19), python_boucle (7, 10, 13, 16, 17, 19), python_boucle_non_bornee (8,
// 11, 14, 18, 20), python_fonction (6, 9, 12, 16, 17), python_simulation (17,
// 19). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, programme, trace } from "@/lib/fiches-exercices/figures";

export const exercicesPythonSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "algorithmique-python-2de",
  titre: "Algorithmique et Python",
  accroche:
    "Vingt exercices, du geste seul au problème : suivre un programme ligne à ligne, reconnaître un type, lire une condition, dérouler une boucle, écrire une fonction, simuler le hasard. Un placement à 4 %, le CO₂ de l'atmosphère, un dé lancé dix mille fois, la conjecture de Syracuse, la racine de 2 cherchée pas à pas. Chaque corrigé montre la trace du programme, tour après tour. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/algorithmique-python-2de", titre: "Algorithmique et Python" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme par exercice : le suivre ligne à ligne en notant les valeurs.",
      rappel: [
        "« x = x + 1 » n'est pas une égalité : c'est un ORDRE. On calcule à droite avec l'ancienne valeur, puis on range le résultat dans x.",
        "Les types : int (entier), float (nombre à virgule), str (texte, entre guillemets), bool (True ou False). « / » donne TOUJOURS un float ; « // » le quotient entier ; « % » le reste.",
        "« for i in range(1, 6) » : i prend les valeurs 1, 2, 3, 4, 5 — le 6 est EXCLU. « while condition » : on répète TANT QUE la condition est vraie.",
      ],
      exercices: [
        {
          enonce: "Suivre ce programme ligne à ligne. Que valent a et b à la fin ?",
          figure: programme(["a = 5", "b = 3", "a = a + b", "b = a - b", "a = a - b"]),
          correction:
            "On note les valeurs après chaque ligne. À droite du signe « = », on utilise les valeurs du moment.\nLigne 3 : a reçoit $5 + 3 = 8$. Ligne 4 : b reçoit $8 - 3 = 5$. Ligne 5 : a reçoit $8 - 5 = 3$.\nÀ la fin, a vaut $3$ et b vaut $5$ : le programme a ÉCHANGÉ les deux valeurs.\n⛔ Le piège : lire « a = a + b » comme une équation, et conclure que b vaut $0$. En Python, « = » range une valeur, il n'affirme rien.",
          schema: trace(["ligne", "a", "b"], [[1, 5, "–"], [2, 5, 3], [3, 8, 3], [4, 8, 5], [5, 3, 5]]),
          micros: ["python_variable_affectation"],
        },
        {
          enonce: "Que vaut x à la fin de ce programme ?",
          figure: programme(["x = 2", "x = 3 * x + 1", "x = x ** 2"]),
          correction:
            "Ligne 2 : on calcule $3 \\times 2 + 1 = 7$ avec l'ANCIENNE valeur de x, puis x vaut $7$.\nLigne 3 : « ** » est la puissance : x reçoit $7^2 = 49$.\nÀ la fin, x vaut $49$.\n⛔ Le piège : écrire le carré avec l'accent circonflexe, comme sur la calculatrice. En Python, le carré s'écrit « x ** 2 » ; l'accent circonflexe y fait une tout autre opération.",
          schema: trace(["ligne", "x"], [[1, 2], [2, 7], [3, 49]]),
          micros: ["python_variable_affectation"],
        },
        {
          enonce: "Donner la valeur et le type de chaque expression :\na) « 7 »  b) « 7.0 »  c) « 7 / 2 »  d) « 7 // 2 »  e) « 7 % 2 »  f) « '7' »  g) « 3 < 5 »",
          correction:
            "a) $7$, un entier : int.\nb) $7{,}0$, un nombre à virgule : float (le point est la virgule de Python).\nc) $3{,}5$ : float. La division « / » donne toujours un float.\nd) $3$ : int. « // » donne le quotient entier ($7 = 2 \\times 3 + 1$).\ne) $1$ : int. « % » donne le reste de la division.\nf) le texte « 7 », entre guillemets : str. Ce n'est plus un nombre.\ng) True : bool. Une comparaison vaut vrai ou faux.\n⛔ Le piège au f) : croire que '7' et 7 sont la même chose. Les guillemets en font un TEXTE.",
          schema: trace(["expression", "valeur", "type"], [["7", 7, "int"], ["7.0", "7.0", "float"], ["7 / 2", "3.5", "float"], ["7 // 2", 3, "int"], ["7 % 2", 1, "int"], ["'7'", "'7'", "str"], ["3 < 5", "True", "bool"]]),
          micros: ["python_type_variable"],
        },
        {
          enonce: "Que renvoie Python pour chacune de ces expressions ?\na) « 6 / 3 »  b) « '3' + '4' »  c) « 3 + 4 »  d) « int('3') + 4 »  e) « '3' * 2 »",
          correction:
            "a) « 2.0 », et non « 2 » : « / » donne toujours un float, même quand la division tombe juste.\nb) « '34' » : entre deux textes, « + » les COLLE bout à bout.\nc) « 7 » : entre deux nombres, « + » additionne.\nd) « 7 » : int('3') transforme le texte '3' en nombre $3$, puis on ajoute $4$.\ne) « '33' » : un texte multiplié par $2$ est répété deux fois.\n⭐ Le même signe « + » ne fait pas la même chose selon le TYPE de ce qu'il relie.",
          schema: trace(["expression", "résultat"], [["6 / 3", "2.0"], ["'3' + '4'", "'34'"], ["3 + 4", 7], ["int('3') + 4", 7], ["'3' * 2", "'33'"]]),
          micros: ["python_type_variable"],
        },
        {
          enonce: "a) Qu'affiche ce programme ?\nb) Et si l'on remplace la première ligne par « n = 40 » ?",
          figure: programme(["n = 17", "if n % 2 == 0:", "    print('pair')", "else:", "    print('impair')"]),
          correction:
            "a) « n % 2 » est le reste de la division de n par $2$ : $17 = 2 \\times 8 + 1$, le reste vaut $1$. La condition « 1 == 0 » est fausse : on passe dans le « else », le programme affiche « impair ».\nb) $40 = 2 \\times 20 + 0$, le reste vaut $0$ : la condition est vraie, il affiche « pair ».\n⛔ Le piège : écrire « if n % 2 = 0 ». Un seul « = » RANGE une valeur ; pour COMPARER, il en faut deux : « == ».",
          schema: trace(["n", "n % 2", "n % 2 == 0", "affiche"], [[17, 1, "False", "impair"], [40, 0, "True", "pair"]]),
          micros: ["python_condition"],
        },
        {
          enonce: "Un cinéma applique ce tarif. Que renvoient « prix(8) », « prix(12) », « prix(17) » et « prix(18) » ?",
          figure: programme(["def prix(age):", "    if age < 12:", "        return 5", "    elif age < 18:", "        return 7", "    else:", "        return 10"]),
          correction:
            "On teste les conditions DANS L'ORDRE, et on s'arrête à la première vraie.\nprix(8) : $8 < 12$ est vrai, on renvoie $5$.\nprix(12) : $12 < 12$ est FAUX ; $12 < 18$ est vrai, on renvoie $7$.\nprix(17) : $17 < 12$ faux, $17 < 18$ vrai : $7$.\nprix(18) : les deux sont faux, on arrive au « else » : $10$.\n⛔ Le piège : prix(12) = $5$. Avec « < », $12$ n'est pas strictement inférieur à $12$ : à $12$ ans, on paie déjà $7$ €.",
          schema: trace(["âge", "age < 12", "age < 18", "prix"], [[8, "True", "–", 5], [12, "False", "True", 7], [17, "False", "True", 7], [18, "False", "False", 10]]),
          micros: ["python_condition", "python_fonction"],
        },
        {
          enonce: "Qu'affiche ce programme ? Faire la trace de i et de s.",
          figure: programme(["s = 0", "for i in range(1, 6):", "    s = s + i", "print(s)"]),
          correction:
            "« range(1, 6) » donne i = $1$, $2$, $3$, $4$, $5$ : le $6$ est exclu.\nÀ chaque tour, on ajoute i à s : $0 + 1 = 1$, puis $3$, $6$, $10$, $15$.\nLe programme affiche $15$ : c'est $1 + 2 + 3 + 4 + 5$.\n⛔ Le piège : faire aussi un tour avec i = $6$, et trouver $21$. La borne de droite d'un range n'est jamais atteinte.",
          schema: trace(["tour", "i", "s"], [[1, 1, 1], [2, 2, 3], [3, 3, 6], [4, 4, 10], [5, 5, 15]]),
          micros: ["python_boucle"],
        },
        {
          enonce: "Qu'affiche ce programme ? Combien de fois la boucle tourne-t-elle ?",
          figure: programme(["n = 1", "while n < 100:", "    n = n * 2", "print(n)"]),
          correction:
            "On répète TANT QUE n est inférieur à $100$, et on teste AVANT chaque tour.\nn vaut successivement $1$, $2$, $4$, $8$, $16$, $32$, $64$ : à chaque fois, $n < 100$, on continue.\nAvec n = $64$, on fait encore un tour : n devient $128$. Maintenant $128 < 100$ est faux : on sort.\nLa boucle a tourné $7$ fois, et le programme affiche $128$.\n⛔ Le piège : répondre $64$, « le dernier nombre sous $100$ ». La boucle s'arrête quand la condition devient FAUSSE, donc après l'avoir dépassé.",
          schema: trace(["tour", "n avant", "n < 100 ?", "n après"], [[1, 1, "oui", 2], [2, 2, "oui", 4], [3, 4, "oui", 8], [4, 8, "oui", 16], [5, 16, "oui", 32], [6, 32, "oui", 64], [7, 64, "oui", 128]]),
          micros: ["python_boucle_non_bornee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : lire une fonction, compléter un programme, en écrire un.",
      rappel: [
        "Une fonction : « def nom(x): » puis, en retrait, les instructions, et « return » pour rendre le résultat.",
        "Une liste s'écrit entre crochets : « [12, 8, 15] ». « len(L) » donne sa longueur ; « for n in L » parcourt ses éléments.",
        "L'INDENTATION (le retrait) dit ce qui est DANS la boucle ou la condition. Elle fait partie du programme.",
      ],
      exercices: [
        {
          enonce: "a) Que renvoient « f(2) », « f(-1) » et « f(0) » ?\nb) Quelle fonction mathématique ce programme calcule-t-il ?",
          figure: programme(["def f(x):", "    return 3 * x ** 2 - 5"]),
          correction:
            "a) On remplace x par la valeur donnée. « ** » passe avant « * », qui passe avant « - » : les priorités des maths.\n$f(2) = 3 \\times 2^2 - 5 = 12 - 5 = 7$.\n$f(-1) = 3 \\times (-1)^2 - 5 = 3 - 5 = -2$.\n$f(0) = 0 - 5 = -5$.\nb) C'est la fonction $x \\mapsto 3x^2 - 5$.\n⛔ Le piège au a) : taper « -1 ** 2 » dans la console. Python calcule d'abord la puissance : il obtient $-(1^2) = -1$. Quand on appelle f(-1), la valeur $-1$ remplace x tout entier, comme si on écrivait $(-1)^2$.",
          schema: trace(["appel", "calcul", "renvoie"], [["f(2)", "3 * 4 - 5", 7], ["f(-1)", "3 * 1 - 5", -2], ["f(0)", "3 * 0 - 5", -5]]),
          micros: ["python_fonction"],
        },
        {
          enonce: "Qu'affiche ce programme ? Que calcule-t-il ?",
          figure: programme(["notes = [12, 8, 15, 11, 14]", "s = 0", "for n in notes:", "    s = s + n", "print(s / len(notes))"]),
          correction:
            "La boucle parcourt la liste : n prend les valeurs $12$, $8$, $15$, $11$, $14$, et s les additionne : $12$, $20$, $35$, $46$, $60$.\n« len(notes) » vaut $5$, le nombre de notes.\nLe programme affiche « 12.0 » : c'est la MOYENNE des notes, $\\dfrac{60}{5} = 12$.\n⭐ « 12.0 » et non « 12 » : la division « / » donne un float, même quand elle tombe juste.",
          schema: trace(["tour", "n", "s"], [[1, 12, 12], [2, 8, 20], [3, 15, 35], [4, 11, 46], [5, 14, 60]]),
          micros: ["python_boucle"],
        },
        {
          enonce: "On place $1\\,000$ € à $4$ % par an (intérêts composés). Ce programme cherche au bout de combien d'années le capital dépasse $1\\,500$ €.\na) Expliquer la ligne « c = c * 1.04 ».\nb) Qu'affiche le programme ?",
          figure: programme(["c = 1000", "n = 0", "while c < 1500:", "    c = c * 1.04", "    n = n + 1", "print(n)"]),
          correction:
            "a) Augmenter de $4$ %, c'est multiplier par $1{,}04$. Chaque tour de boucle fait passer une année.\nb) On déroule, au centime : $1\\,040$ ; $1\\,081{,}60$ ; $1\\,124{,}86$ … ; au bout de $10$ ans, $1\\,480{,}24$ € : encore sous $1\\,500$, on continue. Au bout de $11$ ans, $1\\,539{,}45$ € : on sort.\nLe programme affiche $11$ : il faut $11$ années.\n⭐ C'est un algorithme de SEUIL : on ne sait pas d'avance combien de tours il faut, d'où le « while ».\n⛔ Le piège : répondre $12{,}5$ ans, « $500$ € à $40$ € par an ». Les intérêts s'ajoutent aux intérêts : le capital grandit plus vite.",
          schema: trace(["n (années)", "c (€)"], [[0, "1 000"], [1, "1 040"], [2, "1 081,60"], [9, "1 423,31"], [10, "1 480,24"], [11, "1 539,45"]]),
          micros: ["python_boucle_non_bornee"],
        },
        {
          enonce: "a) Écrire une fonction « est_multiple(a, b) » qui renvoie True si a est un multiple de b, et False sinon.\nb) Que renvoient « est_multiple(21, 7) » et « est_multiple(22, 7) » ?\nc) Quel est le type de ce qu'elle renvoie ?",
          correction:
            "a) a est un multiple de b quand le reste de la division de a par b est nul :\n« def est_multiple(a, b): » puis, en retrait, « return a % b == 0 ».\nb) $21 = 7 \\times 3 + 0$ : le reste est $0$, elle renvoie True. $22 = 7 \\times 3 + 1$ : le reste est $1$, elle renvoie False.\nc) Une comparaison vaut True ou False : la fonction renvoie un bool.\n⭐ Pas besoin de « if » : la comparaison « a % b == 0 » EST déjà le résultat.",
          schema: programme(["def est_multiple(a, b):", "    return a % b == 0", "", "est_multiple(21, 7)  # True", "est_multiple(22, 7)  # False"], 1),
          micros: ["python_fonction", "python_condition", "python_type_variable"],
        },
        {
          enonce: "Écrire un programme qui calcule et affiche la somme des carrés des entiers de $1$ à $10$ : $1^2 + 2^2 + \\dots + 10^2$. Quelle valeur affiche-t-il ?",
          correction:
            "On garde le schéma de l'exercice 7 : une variable s à $0$, puis une boucle qui ajoute chaque carré.\nLes entiers de $1$ à $10$ : « range(1, 11) », car la borne de droite est exclue.\nÀ chaque tour, on ajoute « k ** 2 ».\nLe programme affiche $385$.\n⭐ Vérification : $1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81 + 100 = 385$.\n⛔ Le piège : « range(1, 10) », qui s'arrête à $9$ et oublie $10^2 = 100$.",
          schema: programme(["s = 0", "for k in range(1, 11):", "    s = s + k ** 2", "print(s)"], 1),
          micros: ["python_boucle"],
        },
        {
          enonce: "Voici l'algorithme de Syracuse : si n est pair, on le divise par $2$ ; sinon, on le multiplie par $3$ et on ajoute $1$. On recommence jusqu'à obtenir $1$.\na) Qu'affiche le programme ?\nb) Que compte la variable etapes ?",
          figure: programme(["n = 6", "etapes = 0", "while n != 1:", "    if n % 2 == 0:", "        n = n // 2", "    else:", "        n = 3 * n + 1", "    etapes = etapes + 1", "print(etapes)"]),
          correction:
            "a) On déroule : $6$ est pair → $3$ ; $3$ est impair → $10$ ; puis $5$, $16$, $8$, $4$, $2$, $1$.\nOn a obtenu $1$ : « n != 1 » (n différent de $1$) est faux, on sort. Le programme affiche $8$.\nb) etapes compte le nombre de transformations pour arriver à $1$ : ici $8$.\n⭐ Personne n'a jamais trouvé de nombre qui n'arrive pas à $1$… mais personne n'a démontré que c'était toujours vrai : c'est la CONJECTURE de Syracuse, toujours ouverte.\n⛔ Le piège : « n / 2 » au lieu de « n // 2 ». On obtiendrait des float, « 3.0 », « 5.0 »…",
          schema: trace(["étape", "n"], [[0, 6], [1, 3], [2, 10], [3, 5], [4, 16], [5, 8], [6, 4], [7, 2], [8, 1]]),
          micros: ["python_boucle_non_bornee", "python_condition"],
        },
        {
          enonce: "Ce programme doit afficher l'âge de l'utilisateur l'an prochain. Il s'arrête sur une erreur.\na) Pourquoi ?\nb) Corriger la première ligne.",
          figure: programme(["age = input('Âge ? ')", "print(age + 1)"]),
          correction:
            "a) « input » renvoie TOUJOURS un texte (str), même si l'on tape des chiffres : age vaut par exemple '15', entre guillemets.\n« age + 1 » demande d'ajouter un texte et un nombre : Python refuse (TypeError).\nb) On convertit le texte en entier dès la saisie : « age = int(input('Âge ? ')) ». Avec $15$, le programme affiche $16$.\n⭐ Le type d'une variable n'est pas écrit dans le programme, mais il décide de ce qu'on peut en faire.",
          schema: programme(["age = int(input('Âge ? '))", "print(age + 1)"], 0),
          micros: ["python_type_variable", "python_variable_affectation"],
        },
        {
          enonce: "a) Que renvoient « somme(4) » et « somme(100) » ?\nb) Comparer avec la formule $\\dfrac{n(n + 1)}{2}$.",
          figure: programme(["def somme(n):", "    s = 0", "    for k in range(n + 1):", "        s = s + k", "    return s"]),
          correction:
            "a) « range(n + 1) » donne k = $0$, $1$, …, $n$. La fonction additionne donc les entiers de $0$ à $n$.\nsomme(4) : $0 + 1 + 2 + 3 + 4 = 10$. somme(100) : $5\\,050$.\nb) $\\dfrac{4 \\times 5}{2} = 10$ ✓ et $\\dfrac{100 \\times 101}{2} = 5\\,050$ ✓.\n⭐ La boucle fait $101$ tours pour somme(100) ; la formule, un seul calcul. Le programme sert à VÉRIFIER une formule sur beaucoup de cas avant de la démontrer.\n⛔ Le piège : « range(n) », qui s'arrête à $n - 1$ et oublie le dernier terme.",
          schema: trace(["k", "s"], [[0, 0], [1, 1], [2, 3], [3, 6], [4, 10]]),
          micros: ["python_fonction", "python_boucle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on lit le programme, on le fait tourner à la main, on interprète ce qu'il affiche.",
      rappel: [
        "« from random import randint » puis « randint(1, 6) » : un entier au hasard entre $1$ et $6$, bornes COMPRISES.",
        "Simuler, c'est répéter une expérience aléatoire un grand nombre de fois et compter : la fréquence obtenue s'approche de la probabilité.",
        "Un programme ne prouve rien d'un modèle : il calcule ce que le modèle PRÉVOIT.",
      ],
      exercices: [
        {
          titre: "Le dé lancé dix mille fois",
          enonce: "a) Que calcule la fonction « lancers(n) » ?\nb) Quelle valeur s'attend-on à trouver pour « lancers(10000) » ?\nc) Deux élèves lancent « lancers(10) » : l'un obtient 0.4, l'autre 0.0. L'un d'eux s'est-il trompé ?",
          figure: programme(["from random import randint", "", "def lancers(n):", "    six = 0", "    for i in range(n):", "        if randint(1, 6) == 6:", "            six = six + 1", "    return six / n"]),
          correction:
            "a) La boucle lance n fois un dé ; à chaque « 6 », on ajoute $1$ au compteur six. À la fin, on divise par n : la fonction renvoie la FRÉQUENCE des six sur n lancers.\nb) La probabilité d'un six est $\\dfrac{1}{6} \\approx 0{,}167$. Sur $10\\,000$ lancers, la fréquence est très proche de $0{,}167$ : c'est la loi des grands nombres.\nc) Personne ne s'est trompé. Sur $10$ lancers, obtenir $4$ six ou aucun est tout à fait possible : un petit échantillon FLUCTUE beaucoup.\n⭐ Le diagramme montre un vrai essai : $0{,}1$ sur $10$ lancers, $0{,}19$ sur $100$, $0{,}1646$ sur $10\\,000$. Plus n est grand, plus la fréquence se resserre autour de $\\dfrac{1}{6}$ : c'est pour cela qu'on simule en grand.",
          // Un VRAI essai (Python, graine 2026) : 0.1, 0.19, 0.1646 — puis la probabilité.
          schema: diagramme("barres", [{ label: "10 lancers", value: 0.1 }, { label: "100", value: 0.19 }, { label: "10 000", value: 0.1646 }, { label: "Proba 1/6", value: 0.167 }], 3),
          micros: ["python_simulation", "python_fonction", "python_boucle", "python_condition"],
        },
        {
          titre: "Le CO₂ de l'atmosphère",
          enonce: "À l'observatoire de Mauna Loa (Hawaï), la concentration moyenne de CO₂ dans l'air était d'environ $424$ ppm (parties par million) en 2024. On suppose qu'elle augmente de $2{,}5$ ppm par an.\na) En quelle année le programme prévoit-il le passage des $450$ ppm ?\nb) Quel est le type de co2 à la fin ? Pourquoi ?\nc) Que faut-il changer pour une hausse de $3$ ppm par an ? Quelle année obtient-on alors ?",
          figure: programme(["co2 = 424", "annee = 2024", "while co2 < 450:", "    co2 = co2 + 2.5", "    annee = annee + 1", "print(annee)"]),
          correction:
            "a) Il faut monter de $450 - 424 = 26$ ppm. Au bout de $10$ ans, $424 + 25 = 449$ : encore sous $450$. Au bout de $11$ ans, $451{,}5$ : on sort.\nLe programme affiche $2035$.\nb) co2 valait l'entier $424$, mais on lui ajoute $2{,}5$ : il devient un float, « 451.5 ».\nc) On remplace « 2.5 » par « 3 ». Il faut alors $9$ ans ($424 + 27 = 451$) : le programme affiche $2033$.\n⭐ Le modèle ne dit rien de l'avenir réel : il dit ce qui arrive SI la hausse reste constante. En 2024, elle a d'ailleurs été plus forte que $2{,}5$ ppm.\n⛔ Le piège au a) : diviser, $\\dfrac{26}{2{,}5} = 10{,}4$, et répondre 2034. On compte des années entières, et $10$ ans ne suffisent pas.",
          schema: trace(["annee", "co2"], [[2024, 424], [2025, "426.5"], [2033, "446.5"], [2034, "449.0"], [2035, "451.5"]]),
          micros: ["python_boucle_non_bornee", "python_variable_affectation", "python_type_variable"],
        },
        {
          titre: "Deux dés : le 7 ou le 12 ?",
          enonce: "On lance deux dés et on fait la somme. Ce programme compte, sur $36\\,000$ lancers, combien de fois on obtient $7$ et combien de fois $12$.\na) Compléter les deux lignes « if ».\nb) Quelles fréquences s'attend-on à trouver ? Justifier avec les $36$ issues possibles.\nc) Un joueur parie sur le $12$ « parce que c'est le plus gros ». A-t-il raison ?",
          figure: programme(["from random import randint", "sept = 0", "douze = 0", "for i in range(36000):", "    d1 = randint(1, 6)", "    d2 = randint(1, 6)", "    s = d1 + d2","    if ...:", "        sept = sept + 1", "    if ...:", "        douze = douze + 1", "print(sept, douze)"]),
          correction:
            "a) « if s == 7: » et « if s == 12: » (deux « = » pour comparer).\nb) Deux dés donnent $6 \\times 6 = 36$ issues équiprobables. La somme $7$ en compte $6$ : (1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2), (6 ; 1). La somme $12$ une seule : (6 ; 6).\nOn attend une fréquence proche de $\\dfrac{6}{36} = \\dfrac{1}{6}$ pour $7$, soit environ $6\\,000$ fois ; et proche de $\\dfrac{1}{36}$ pour $12$, soit environ $1\\,000$ fois.\nc) Non : le $7$ sort environ SIX fois plus souvent. Toutes les sommes ne sont pas équiprobables, même si chaque dé l'est.\n⛔ Le piège au b) : croire les onze sommes, de $2$ à $12$, également probables. Ce sont les $36$ COUPLES qui le sont.",
          schema: diagramme("batons", [{ label: "2", value: 1 }, { label: "3", value: 2 }, { label: "4", value: 3 }, { label: "5", value: 4 }, { label: "6", value: 5 }, { label: "7", value: 6 }, { label: "8", value: 5 }, { label: "9", value: 4 }, { label: "10", value: 3 }, { label: "11", value: 2 }, { label: "12", value: 1 }], 5),
          micros: ["python_simulation", "python_boucle", "python_condition"],
        },
        {
          titre: "La racine de 2, pas à pas",
          enonce: "On cherche $\\sqrt{2}$ sans la touche racine : on part de $1$ et on avance de $0{,}1$ tant que le carré reste sous $2$.\na) Faire la trace de x. Quel encadrement de $\\sqrt{2}$ obtient-on ?\nb) Python affiche en fait « 1.5000000000000004 ». Pourquoi pas « 1.5 » ?\nc) Que faut-il changer pour avoir un encadrement à $0{,}01$ près ? Python affiche alors « 1.4200000000000004 » : quel encadrement en déduit-on ?",
          figure: programme(["x = 1", "while x * x < 2:", "    x = x + 0.1", "print(x)"]),
          correction:
            "a) x vaut $1$, puis $1{,}1$ ; $1{,}2$ ; $1{,}3$ ; $1{,}4$ : leurs carrés, $1{,}21$ ; $1{,}44$ ; $1{,}69$ ; $1{,}96$, sont sous $2$. Avec $1{,}5$, le carré vaut $2{,}25$ : on sort.\n$1{,}4^2 < 2 < 1{,}5^2$, donc $1{,}4 < \\sqrt{2} < 1{,}5$.\nb) L'ordinateur calcule en BINAIRE, où $0{,}1$ ne s'écrit pas exactement (comme $\\dfrac{1}{3}$ en décimal). Chaque ajout garde une minuscule erreur, et elles s'accumulent : $1{,}5000000000000004$ au lieu de $1{,}5$.\nc) On remplace « 0.1 » par « 0.01 ». Le programme s'arrête au premier x dont le carré dépasse $2$, soit $1{,}42$ (à l'erreur près) : $1{,}41 < \\sqrt{2} < 1{,}42$.\n⭐ C'est un algorithme de BALAYAGE : plus le pas est petit, plus l'encadrement est fin — et plus la boucle tourne.\n⛔ Le piège au a) : répondre « $\\sqrt{2} \\approx 1{,}5$ ». Le programme donne la PREMIÈRE valeur trop grande : $\\sqrt{2}$ est juste avant.",
          schema: trace(["x", "x * x", "< 2 ?"], [[1, 1, "oui"], ["1.1", "1.21", "oui"], ["1.2", "1.44", "oui"], ["1.3", "1.69", "oui"], ["1.4", "1.96", "oui"], ["1.5", "2.25", "non"]]),
          micros: ["python_boucle_non_bornee", "python_type_variable"],
        },
      ],
    },
  ],
};
