// ─── Fiche d'exercices : algorithmique et programmation (1re spé) ─────────────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/algorithmique.bank.ts`
// (notion « algorithmique », dix micros). Pas de fiche de cours.
//
// ⭐⭐ LE FIL : LA LISTE, ET LA SUITE QU'ON PROGRAMME. La seconde a appris la
// variable, la boucle et la fonction (feuille `maths-seconde-python.tsx`, rien
// n'en est repris). La spé ajoute ce que dit le BO : la liste (en extension, par
// ajouts, en compréhension ; indices ; parcours), la fonction qui RENVOIE une
// valeur qu'on réutilise, la boucle while de seuil sur une suite, la simulation
// qui approche une espérance, et les algorithmes des autres chapitres (sécantes,
// Euler, Newton).
//
// ⭐ LES DESSINS : le programme (`programme`), sa TRACE (`trace`), la liste en
// cases indexées (`cases`, aide locale : le coach n'en a pas), les termes d'une
// suite sur un repère avec le seuil en horizontale.
// ⛔ PDF : les programmes de l'énoncé sont imprimés (ils SONT la question) ; les
// traces et repères du corrigé passent en `ecranSeulement`, sauf la trace de
// l'exercice 1. Les programmes courts sont écrits dans l'énoncé, entre « ».
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-premiere-spe-algorithmique.mjs`
// EXÉCUTE chaque programme avec Python (et les simulations avec la graine 23).
//
// Micro-compétences : algo_variable (1, 14, 16), algo_listes (2, 9, 11, 13, 15,
// 17, 18, 19, 20), algo_liste_manipuler (3, 11, 19), algo_liste_parcourir (4, 10,
// 19), algo_boucles (5, 9, 16, 20), algo_condition (4, 6, 10, 15, 17), algo_while
// (7, 12, 14, 18), algo_seuil (12, 18), algo_fonctions (6, 8, 10, 13, 17, 19, 20),
// algo_modulaire (13, 15, 17, 20). 10/10.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, trace } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/** Un dessin montré à l'écran, pas imprimé (le PDF reste sous 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins l'un sous l'autre (le programme, puis sa trace). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid gap-3">
    {a}
    {b}
  </div>
);

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = Math.round((de + k * 0.05) * 100) / 100;
    return [x, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

/**
 * Une LISTE dessinée en cases, l'indice au-dessus de chaque case, le nom de la
 * liste au-dessus de la rangée. SVG, texte NU, vrai signe moins.
 * ⭐ Le script de recalcul relit `{ nom, valeurs }` et compare à Python.
 * ⛔ Huit cases au plus : la case s'élargit avec le plus long nombre.
 */
function cases(rangees: { nom: string; valeurs: (string | number)[] }[]) {
  const n = Math.max(...rangees.map((r) => r.valeurs.length));
  const long = Math.max(...rangees.flatMap((r) => r.valeurs.map((v) => String(v).length)));
  const C = Math.max(32, long * 9 + 16);
  const W = n * C + 8;
  const H = rangees.length * 74 + 4;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Liste dessinée en cases indexées">
        {rangees.map((r, j) => (
          <g key={j} transform={`translate(0 ${j * 74})`}>
            <text x={4} y={14} fontSize="13" fontWeight="800" fill="#0f172a">
              {r.nom}
            </text>
            {r.valeurs.map((v, i) => (
              <g key={i}>
                <text x={4 + i * C + C / 2} y={32} textAnchor="middle" fontSize="12" fill="#64748b">
                  {i}
                </text>
                <rect x={4 + i * C} y={38} width={C} height={30} fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                <text x={4 + i * C + C / 2} y={58} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
                  {String(v).replace(/-/g, "−")}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

export const exercicesAlgorithmiquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "algorithmique",
  titre: "Algorithmique et programmation",
  accroche:
    "Vingt exercices, du geste seul au problème de contrôle : l'affectation simultanée, les listes (en extension, par ajouts, en compréhension), leurs indices et leur parcours, la fonction qui renvoie une valeur, la boucle de seuil sur une suite, la simulation d'un jeu. Des truites dans un lac, la pluie d'une semaine, une randonnée, deux plateformes qui se disputent des abonnés, la racine de 2 par la méthode de Newton. Chaque corrigé montre la trace du programme ou la liste dessinée case par case. Un rappel de cours avant chaque niveau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme par exercice : le suivre ligne à ligne, en notant les valeurs.",
      rappel: [
        "« a, b = b, a + b » est une affectation SIMULTANÉE : Python calcule d'abord les deux valeurs de droite, avec les anciennes valeurs, puis il les range.",
        "Une LISTE s'écrit entre crochets : « L = [5, 8, 2] ». Les indices commencent à $0$ : L[0] est le premier élément, L[-1] le dernier, len(L) le nombre d'éléments.",
        "Trois façons de créer une liste : en EXTENSION « [3, 6, 9] » ; par AJOUTS avec « L.append(x) » dans une boucle ; en COMPRÉHENSION « [3*k for k in range(1, 4)] ».",
        "Une fonction RENVOIE son résultat avec « return ». « print » l'affiche seulement : la fonction renvoie alors None, une valeur vide.",
      ],
      exercices: [
        {
          enonce: "On exécute « a, b = 1, 1 », puis trois fois la ligne « a, b = b, a + b ».\na) Que valent a et b à la fin ? Faire la trace.\nb) Un élève remplace chaque ligne « a, b = b, a + b » par les deux lignes « a = b » puis « b = a + b ». Que valent alors a et b à la fin ?",
          correction:
            "a) Dans « a, b = b, a + b », Python calcule D'ABORD les deux valeurs de droite avec les anciennes valeurs, puis il les range.\nDépart : a vaut $1$ et b vaut $1$.\n1er passage : a reçoit $1$ (l'ancien b), b reçoit $1 + 1 = 2$.\n2e passage : a reçoit $2$, b reçoit $1 + 2 = 3$.\n3e passage : a reçoit $3$, b reçoit $2 + 3 = 5$.\nÀ la fin, a vaut $3$ et b vaut $5$. On reconnaît les nombres de Fibonacci : $1$, $1$, $2$, $3$, $5$…\nb) Avec deux lignes, « b = a + b » utilise le NOUVEAU a.\n1er passage : a vaut $1$, puis b vaut $1 + 1 = 2$. 2e : a vaut $2$, puis b vaut $2 + 2 = 4$. 3e : a vaut $4$, puis b vaut $4 + 4 = 8$.\nÀ la fin, a vaut $4$ et b vaut $8$ : ce n'est plus la même suite.\n⛔ Le piège : croire que les deux écritures font la même chose. L'affectation simultanée évite d'écraser une valeur dont on a encore besoin.",
          schema: trace(["étape", "a", "b"], [[0, 1, 1], [1, 1, 2], [2, 2, 3], [3, 3, 5]]),
          micros: ["algo_variable"],
        },
        {
          enonce: "Voici trois façons de créer une liste L.\nA : « L = [3, 6, 9, 12] »\nB : « L = [] » puis « for k in range(4): L.append(3 * k) »\nC : « L = [3*k for k in range(1, 5)] »\na) Donner la liste obtenue par chaque programme.\nb) Lesquels donnent la même liste ? Corriger celui qui diffère.",
          correction:
            "a) A est écrite en EXTENSION : L vaut [3, 6, 9, 12].\nB part d'une liste vide et AJOUTE $3k$ à la fin, pour k = $0$, $1$, $2$, $3$ : L vaut [0, 3, 6, 9].\nC est écrite en COMPRÉHENSION, pour k = $1$, $2$, $3$, $4$ : L vaut [3, 6, 9, 12].\nb) A et C donnent la même liste ; B commence à $0$.\nPour corriger B, on fait partir k de $1$ : « for k in range(1, 5): L.append(3 * k) ».\n⛔ Le piège : « range(4) » commence à $0$ et s'arrête à $3$. Il donne bien quatre valeurs, mais pas celles qu'on croit.",
          schema: ecranSeulement(cases([{ nom: "A et C", valeurs: [3, 6, 9, 12] }, { nom: "B", valeurs: [0, 3, 6, 9] }])),
          micros: ["algo_listes"],
        },
        {
          enonce: "On a créé la liste « L = [5, 8, 2, 9, 4] », dessinée ci-dessous avec ses indices.\na) Que valent L[0], L[3], L[-1] et len(L) ?\nb) Que contient L après l'instruction « L[1] = 7 » ?\nc) Que se passe-t-il si l'on demande L[5] ?",
          figure: cases([{ nom: "L", valeurs: [5, 8, 2, 9, 4] }]),
          correction:
            "a) Les indices commencent à $0$ : L[0] est le PREMIER élément, $5$.\nL[3] est le quatrième élément : $9$.\nL[-1] est le DERNIER élément : $4$.\nlen(L) est le nombre d'éléments : $5$.\nb) « L[1] = 7 » remplace l'élément d'indice $1$, c'est-à-dire le deuxième : L devient [5, 7, 2, 9, 4].\nc) Les indices vont de $0$ à $4$ : L[5] n'existe pas. Python s'arrête sur une erreur (IndexError).\n⛔ Le piège : croire que L[3] est le troisième élément. L'indice est toujours décalé de $1$ par rapport au rang.",
          schema: ecranSeulement(cases([{ nom: "L après L[1] = 7", valeurs: [5, 7, 2, 9, 4] }])),
          micros: ["algo_liste_manipuler"],
        },
        {
          enonce: "Voici les températures maximales d'une semaine de mai (en °C), rangées dans une liste T, et un programme.\na) Faire la trace de x et de m.\nb) Qu'affiche le programme ? Que calcule-t-il ?\nc) Pourquoi part-on de « m = T[0] » plutôt que de « m = 0 » ? Penser à une semaine d'hiver très froide.",
          figure: programme(["T = [12, 15, 9, 17, 14]", "m = T[0]", "for x in T:", "    if x > m:", "        m = x", "print(m)"]),
          correction:
            "a) « for x in T » donne à x chaque ÉLÉMENT de la liste, dans l'ordre : $12$, $15$, $9$, $17$, $14$.\nm vaut d'abord $12$. Avec $15 > 12$, m devient $15$. Avec $9$, rien ne change. Avec $17 > 15$, m devient $17$. Avec $14$, rien ne change.\nb) Le programme affiche $17$ : c'est le MAXIMUM de la liste.\nc) Si toutes les températures sont négatives, par exemple [-8, -3, -11], « m = 0 » donnerait $0$, qui n'est même pas dans la liste. En partant de T[0], m est toujours une vraie valeur de la liste.\n⭐ Pour trouver le minimum, on garde le même programme et on remplace « > » par « < ».",
          schema: ecranSeulement(trace(["x", "x > m ?", "m"], [[12, "non", 12], [15, "oui", 15], [9, "non", 15], [17, "oui", 17], [14, "non", 17]])),
          micros: ["algo_liste_parcourir", "algo_condition"],
        },
        {
          enonce: "La suite $(u_n)$ est définie par $u_0 = 5$ et $u_{n+1} = 2u_n - 3$. On exécute « u = 5 », puis « for k in range(4): u = 2 * u - 3 ».\na) Faire la trace de k et de u.\nb) Quel terme de la suite u contient-il à la fin ?",
          correction:
            "a) « range(4) » donne k = $0$, $1$, $2$, $3$ : la boucle fait $4$ tours.\nÀ chaque tour, u est remplacé par $2u - 3$ : $2 \\times 5 - 3 = 7$, puis $2 \\times 7 - 3 = 11$, puis $19$, puis $35$.\nb) Au départ, u contient $u_0$ ; après un tour, $u_1$ ; après $4$ tours, $u_4$.\nÀ la fin, u vaut $35 = u_4$.\n⛔ Le piège : répondre $u_3$, parce que le dernier k vaut $3$. Ce qui compte, c'est le NOMBRE de tours : $4$ tours font avancer de $4$ rangs.",
          schema: ecranSeulement(deux(programme(["u = 5", "for k in range(4):", "    u = 2 * u - 3", "print(u)"]), trace(["k", "u après le tour", "terme"], [[0, 7, "u₁"], [1, 11, "u₂"], [2, 19, "u₃"], [3, 35, "u₄"]]))),
          micros: ["algo_boucles"],
        },
        {
          enonce: "Cette fonction dit combien de racines réelles a le trinôme $ax^2 + bx + c$.\na) Que renvoient nb_racines(1, -2, 1), nb_racines(2, 3, -5) et nb_racines(1, 1, 1) ?\nb) Pourquoi écrit-on « == » à la ligne 5, et non « = » ?",
          figure: programme(["def nb_racines(a, b, c):", "    d = b**2 - 4*a*c", "    if d > 0:", "        return 2", "    elif d == 0:", "        return 1", "    else:", "        return 0"]),
          correction:
            "a) La fonction calcule le discriminant d, puis teste les cas DANS L'ORDRE et renvoie le premier qui convient.\nnb_racines(1, -2, 1) : $d = (-2)^2 - 4 \\times 1 \\times 1 = 0$. « d > 0 » est faux, « d == 0 » est vrai : elle renvoie $1$.\nnb_racines(2, 3, -5) : $d = 9 + 40 = 49 > 0$ : elle renvoie $2$.\nnb_racines(1, 1, 1) : $d = 1 - 4 = -3$. Les deux tests sont faux : on arrive au « else », elle renvoie $0$.\nb) « == » COMPARE deux valeurs et donne True ou False. « = » RANGE une valeur : dans un « if », Python refuserait la ligne.\n⭐ Dès qu'un « return » est exécuté, la fonction s'arrête : les lignes suivantes ne sont pas lues.",
          schema: ecranSeulement(trace(["appel", "d", "renvoie"], [["(1, −2, 1)", 0, 1], ["(2, 3, −5)", 49, 2], ["(1, 1, 1)", "−3", 0]])),
          micros: ["algo_condition", "algo_fonctions"],
        },
        {
          enonce: "On exécute « n = 0 », « s = 0 », puis « while s <= 30: » suivi, en retrait, des deux lignes « n = n + 1 » et « s = s + n ». On affiche enfin n et s.\na) Faire la trace de n et de s.\nb) Qu'affiche le programme ? Traduire le résultat par une phrase sur la somme $1 + 2 + \\dots + n$.",
          correction:
            "a) On teste la condition AVANT chaque tour : on continue tant que s est inférieur ou égal à $30$.\nn vaut $1$, $2$, $3$… et s ajoute n à chaque tour : $1$, $3$, $6$, $10$, $15$, $21$, $28$.\nAvec s = $28$, la condition « 28 <= 30 » est vraie : encore un tour. n devient $8$ et s devient $36$.\nMaintenant « 36 <= 30 » est faux : on sort.\nb) Le programme affiche « 8 36 ».\nPhrase : $8$ est le plus petit entier n tel que $1 + 2 + \\dots + n > 30$ ; cette somme vaut alors $36$.\n⛔ Le piège : s'arrêter à $28$, « la dernière somme sous $30$ ». La boucle s'arrête quand la condition devient FAUSSE, donc juste APRÈS avoir dépassé $30$.",
          schema: ecranSeulement(deux(programme(["n = 0", "s = 0", "while s <= 30:", "    n = n + 1", "    s = s + n", "print(n, s)"]), trace(["tour", "n", "s"], [[1, 1, 1], [2, 2, 3], [3, 3, 6], [4, 4, 10], [5, 5, 15], [6, 6, 21], [7, 7, 28], [8, 8, 36]]))),
          micros: ["algo_while"],
        },
        {
          enonce: "Voici deux fonctions presque identiques.\na) Que vaut « f(4) » ?\nb) On exécute « y = f(4) + 1 ». Que vaut y ?\nc) On exécute « z = g(4) + 1 ». Le programme affiche $5$, puis s'arrête sur une erreur. Expliquer.",
          figure: programme(["def f(x):", "    return x**2 - 3*x + 1", "", "def g(x):", "    print(x**2 - 3*x + 1)"]),
          correction:
            "a) $f(4) = 4^2 - 3 \\times 4 + 1 = 16 - 12 + 1 = 5$.\nb) f RENVOIE son résultat : « f(4) » vaut $5$, qu'on peut réutiliser dans un calcul. y vaut $5 + 1 = 6$.\nc) g AFFICHE le nombre $5$ à l'écran, mais ne renvoie rien : en Python, « g(4) » vaut None, une valeur vide.\n« None + 1 » n'a pas de sens : Python s'arrête (TypeError).\n⭐ « print » montre un résultat à l'humain ; « return » le donne au programme. Une fonction mathématique se programme avec « return ».\n⛔ Le piège : croire que g fait comme f parce qu'on voit « 5 » à l'écran.",
          schema: ecranSeulement(trace(["appel", "affiche", "renvoie"], [["f(4)", "rien", 5], ["g(4)", 5, "None"]])),
          micros: ["algo_fonctions"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : lire un programme, le faire tourner à la main, en écrire un morceau.",
      rappel: [
        "Parcourir une liste : « for x in L » donne les ÉLÉMENTS ; « for i in range(len(L)) » donne les INDICES, et L[i] l'élément d'indice i.",
        "Recherche de SEUIL : « while u <= S » répète tant que le seuil S n'est pas dépassé. Le compteur n donne, à la sortie, le premier rang où il l'est.",
        "Une fonction peut en appeler une autre : on découpe un problème en petites fonctions, chacune facile à tester.",
        "Les nombres à virgule (float) sont arrondis en binaire : « 0.1 » n'est pas exact en machine, et les petites erreurs s'accumulent.",
      ],
      exercices: [
        {
          enonce: "La suite $(u_n)$ est définie par $u_0 = 1$ et $u_{n+1} = u_n + n$.\nProgramme A : « u = 1 », « L = [u] », puis « for n in range(5): » suivi, en retrait, de « u = u + n » et « L.append(u) ».\nProgramme B : « M = [1 + n*(n-1)//2 for n in range(6)] ».\na) Faire la trace du programme A. Que contient L à la fin ?\nb) Que contient M ? Qu'est-ce que cela suggère ?\nc) Placer les termes dans un repère. La suite est-elle arithmétique ?",
          correction:
            "a) L commence avec $u_0 = 1$. À chaque tour, on calcule le terme suivant, puis on l'AJOUTE à la fin de L.\nn = $0$ : u devient $1 + 0 = 1$. n = $1$ : $1 + 1 = 2$. n = $2$ : $2 + 2 = 4$. n = $3$ : $4 + 3 = 7$. n = $4$ : $7 + 4 = 11$.\nL vaut [1, 1, 2, 4, 7, 11] : ce sont $u_0$, …, $u_5$, soit six termes pour cinq tours.\nb) M est écrite en compréhension : pour n de $0$ à $5$, on calcule $1 + \\dfrac{n(n - 1)}{2}$ (« // » est la division entière, sans perte ici car $n(n - 1)$ est toujours pair). M vaut aussi [1, 1, 2, 4, 7, 11].\nLes deux listes coïncident : on peut CONJECTURER que $u_n = 1 + \\dfrac{n(n - 1)}{2}$ pour tout n. Six termes ne le démontrent pas, mais le rendent plausible.\nc) Les points ne sont pas alignés : la suite n'est pas arithmétique (les écarts $0$, $1$, $2$, $3$, $4$ ne sont pas constants). Ils sont sur la parabole $y = 0{,}5x^2 - 0{,}5x + 1$.\n⛔ Le piège : oublier que L contient déjà $u_0$ avant la boucle. Cinq tours donnent six termes.",
          schema: ecranSeulement(
            deux(
              cases([{ nom: "L (l'indice est le rang n)", valeurs: [1, 1, 2, 4, 7, 11] }]),
              repere([-1, 6, -1, 12], [{ q: [0.5, -0.5, 1], couleur: ORANGE }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 7 }, { x: 5, y: 11 }], undefined, true),
            ),
          ),
          micros: ["algo_listes", "algo_boucles"],
        },
        {
          enonce: "La liste mm contient la pluie tombée chaque jour d'une semaine, en millimètres.\na) Que renvoie « jours_secs(mm) » ? Que compte la fonction ?\nb) Écrire une fonction « moyenne(L) » qui renvoie la moyenne des éléments de L, en parcourant la liste avec une boucle.\nc) Que renvoie « moyenne(mm) » ?",
          figure: programme(["mm = [0, 12, 3, 0, 25, 9, 0]", "", "def jours_secs(L):", "    n = 0", "    for x in L:", "        if x == 0:", "            n = n + 1", "    return n"]),
          correction:
            "a) La boucle parcourt les ÉLÉMENTS de la liste. À chaque jour sans pluie (x == 0), le compteur n augmente de $1$.\nLes jours à $0$ mm sont le 1er, le 4e et le 7e : la fonction renvoie $3$. Elle compte les jours SECS.\nb) On additionne les éléments dans une variable s, puis on divise par le nombre d'éléments, len(L) : voir le programme.\nc) $s = 0 + 12 + 3 + 0 + 25 + 9 + 0 = 49$ et len(mm) vaut $7$ : « moyenne(mm) » renvoie « 7.0 », soit $7$ mm par jour en moyenne.\n⭐ « 7.0 » et non « 7 » : la division « / » donne toujours un float.\n⛔ Le piège au b) : diviser par $7$ écrit à la main. Avec « len(L) », la fonction marche pour une liste de n'importe quelle longueur.",
          schema: ecranSeulement(programme(["def moyenne(L):", "    s = 0", "    for x in L:", "        s = s + x", "    return s / len(L)"], 4)),
          micros: ["algo_liste_parcourir", "algo_condition", "algo_fonctions"],
        },
        {
          enonce: "Sur une randonnée, un GPS relève l'altitude (en m) tous les deux kilomètres : « alt = [320, 450, 610, 580, 720] ».\na) Que contient la liste « e = [alt[i+1] - alt[i] for i in range(len(alt) - 1)] » ? Que représente-t-elle ?\nb) Le DÉNIVELÉ POSITIF est la somme des montées. Le calculer à partir de e.\nc) Pourquoi « range(len(alt) - 1) », et pas « range(len(alt)) » ?",
          correction:
            "a) len(alt) vaut $5$, donc « range(4) » : i prend les valeurs $0$, $1$, $2$, $3$.\nPour chaque i, on calcule l'écart entre deux relevés voisins : $450 - 320 = 130$ ; $610 - 450 = 160$ ; $580 - 610 = -30$ ; $720 - 580 = 140$.\ne vaut [130, 160, -30, 140] : ce sont les VARIATIONS d'altitude sur chaque tronçon de $2$ km. Le $-30$ est une descente.\nb) On ajoute les écarts positifs : $130 + 160 + 140 = 430$ m.\n⚠️ Ce n'est pas $720 - 320 = 400$ m : la descente de $30$ m a dû être remontée.\nc) Avec « range(5) », le dernier tour prendrait i = $4$ et demanderait alt[5], qui n'existe pas : erreur IndexError. Cinq relevés donnent seulement quatre écarts.\n⛔ Le piège : oublier qu'une liste de n éléments a ses indices de $0$ à $n - 1$.",
          schema: ecranSeulement(cases([{ nom: "alt", valeurs: [320, 450, 610, 580, 720] }, { nom: "e", valeurs: [130, 160, -30, 140] }])),
          micros: ["algo_liste_manipuler", "algo_listes"],
        },
        {
          enonce: "Dans un lac, on modélise le nombre de truites (en milliers) par la suite $u_0 = 1$ et $u_{n+1} = 0{,}6\\,u_n + 3$ : chaque année, $40$ % des truites disparaissent et l'on en réintroduit $3\\,000$.\na) Qu'affiche le programme ? Interpréter.\nb) Que se passerait-il si l'on remplaçait $7$ par $8$ dans la condition du « while » ?",
          figure: programme(["u = 1", "n = 0", "while u <= 7:", "    u = 0.6 * u + 3", "    n = n + 1", "print(n)"]),
          correction:
            "a) On calcule les termes tant qu'ils ne dépassent pas $7$ : $u_1 = 0{,}6 \\times 1 + 3 = 3{,}6$ ; $u_2 = 5{,}16$ ; $u_3 = 6{,}096$ ; $u_4 \\approx 6{,}66$ ; $u_5 \\approx 6{,}99$ ; $u_6 \\approx 7{,}20$.\n$u_5 \\approx 6{,}99$ est encore inférieur ou égal à $7$ : un tour de plus. $u_6 > 7$ : on sort. Le programme affiche $6$.\nInterprétation : c'est au bout de $6$ ans que le lac compte, pour la première fois, plus de $7\\,000$ truites.\nb) Les termes montent vers $7{,}5$ sans jamais le dépasser : si $u_n < 7{,}5$, alors $u_{n+1} = 0{,}6\\,u_n + 3 < 0{,}6 \\times 7{,}5 + 3 = 7{,}5$.\nDonc u reste toujours sous $8$ : la condition « u <= 8 » reste vraie, et la boucle ne s'arrête JAMAIS.\n⛔ Le piège : lancer une recherche de seuil sans vérifier que le seuil peut être atteint. Sur le dessin, les points franchissent la droite $y = 7$, mais se tassent bien sous la droite $y = 8$.",
          schema: ecranSeulement(
            repere(
              [-1, 9, -1, 9],
              [],
              [
                { x: 0, y: 1 },
                { x: 1, y: 3.6 },
                { x: 2, y: 5.16 },
                { x: 3, y: 6.096 },
                { x: 4, y: 6.6576 },
                { x: 5, y: 6.99456 },
                { x: 6, y: 7.196736 },
                { x: 7, y: 7.3180416 },
                { x: 8, y: 7.39082496 },
              ],
              [7, 8],
            ),
          ),
          micros: ["algo_seuil", "algo_while"],
        },
        {
          enonce: "Pour approcher le nombre dérivé de $f(x) = x^2$ en $1$, on calcule des pentes de sécantes de plus en plus proches.\na) Que calcule « taux(a, h) » ? Pourquoi cette fonction appelle-t-elle f ?\nb) Python affiche « [3.0, 2.100000000000002, 2.0100000000000007] ». Retrouver ces valeurs par le calcul, et expliquer les derniers chiffres.\nc) Quelle valeur de $f'(1)$ ces pentes suggèrent-elles ?",
          figure: programme(["def f(x):", "    return x**2", "", "def taux(a, h):", "    d = f(a + h) - f(a)", "    return d / h", "", "L = [taux(1, h) for h in", "     [1, 0.1, 0.01]]", "print(L)"]),
          correction:
            "a) « taux(a, h) » calcule $\\dfrac{f(a + h) - f(a)}{h}$ : la pente de la sécante qui joint les points de la courbe d'abscisses $a$ et $a + h$.\nElle appelle f au lieu de recopier la formule : pour changer de fonction, on ne modifie QUE f. C'est l'intérêt de découper en fonctions.\nb) $\\dfrac{f(1 + h) - f(1)}{h} = \\dfrac{(1 + h)^2 - 1}{h} = \\dfrac{2h + h^2}{h} = 2 + h$.\nPour $h = 1$ : $3$ ; pour $h = 0{,}1$ : $2{,}1$ ; pour $h = 0{,}01$ : $2{,}01$.\nLes derniers chiffres de « 2.100000000000002 » viennent des arrondis du calcul en binaire : $0{,}1$ ne s'écrit pas exactement en machine.\nc) Les pentes $2 + h$ se rapprochent de $2$ quand h rétrécit : on conjecture $f'(1) = 2$, ce que confirme la formule $f'(x) = 2x$.\n⭐ Sur le dessin : la sécante pour $h = 1$ (en vert, pente $3$) pivote autour du point $(1 ; 1)$ vers la tangente (en orange, pente $2$).",
          schema: ecranSeulement(repere([-1, 3, -2, 5], [{ q: [1, 0, 0] }, { q: [0, 3, -2], couleur: VERT }, { q: [0, 2, -1], couleur: ORANGE }], [{ x: 1, y: 1 }, { x: 2, y: 4 }])),
          micros: ["algo_modulaire", "algo_fonctions", "algo_listes"],
        },
        {
          enonce: "Une population de bactéries y vérifie $y' = y$ et $y(0) = 1$ : sa vitesse de croissance est égale à sa taille. La méthode d'Euler avance à petits pas h en suivant la tangente : $y(x + h) \\approx y(x) + h \\times y(x)$.\na) Faire la trace du programme. Qu'affiche-t-il ?\nb) Comparer avec la valeur exacte $y(1) = e \\approx 2{,}718$. Comment améliorer l'approximation ?\nc) Avec « h = 0.1 », la boucle tourne $11$ fois au lieu de $10$. Pourquoi ?",
          figure: programme(["x = 0", "y = 1", "h = 0.25", "while x < 1:", "    y = y + h * y", "    x = x + h", "print(y)"]),
          correction:
            "a) À chaque tour, y est multiplié par $1 + h = 1{,}25$ et x avance de $0{,}25$.\nx : $0{,}25$ ; $0{,}5$ ; $0{,}75$ ; $1$. y : $1{,}25$ ; $1{,}5625$ ; $1{,}953125$ ; $2{,}44140625$.\nAvec x = $1$, « 1 < 1 » est faux : on sort après $4$ tours. Le programme affiche $2{,}44140625 = 1{,}25^4$.\nb) Euler donne une valeur trop petite : la courbe s'incurve vers le haut, et les segments de tangente restent en dessous.\nPour faire mieux, on diminue le pas h : plus de tours, mais des segments plus courts, qui collent mieux à la courbe.\nc) En machine, $0{,}1$ n'est pas exact. Après dix ajouts, x vaut $0{,}9999999999999999$, un peu moins que $1$ : « x < 1 » est encore vrai, et la boucle fait un $11$e tour.\nLe programme affiche alors $1{,}1^{11} \\approx 2{,}85$ au lieu de $1{,}1^{10} \\approx 2{,}59$.\n⛔ Le piège : arrêter une boucle sur une comparaison de float. Plus sûr : compter les tours, avec « for k in range(10) ».",
          schema: ecranSeulement(
            deux(
              trace(["tour", "x", "y"], [[1, 0.25, 1.25], [2, 0.5, 1.5625], [3, 0.75, 1.953125], [4, 1, 2.44140625]]),
              repere(
                [-1, 2, -1, 3],
                [{ pts: echantillon(Math.exp, -1, 1.1, -1, 3) }, { pts: [[0, 1], [0.25, 1.25], [0.5, 1.5625], [0.75, 1.953125], [1, 2.44140625]], couleur: ORANGE }],
                [{ x: 1, y: 2.44140625 }],
              ),
            ),
          ),
          micros: ["algo_while", "algo_variable"],
        },
        {
          enonce: "On veut la liste des nombres premiers inférieurs à $20$. Un nombre premier a exactement deux diviseurs : $1$ et lui-même.\na) Que renvoie « diviseurs(12) » ?\nb) Que renvoient « est_premier(13) » et « est_premier(1) » ?\nc) Que contient la liste P ?",
          figure: programme(["def diviseurs(n):", "    L = []", "    for d in range(1, n + 1):", "        if n % d == 0:", "            L.append(d)", "    return L", "", "def est_premier(n):", "    k = len(diviseurs(n))", "    return k == 2", "", "P = [n for n in range(20)", "     if est_premier(n)]"]),
          correction:
            "a) diviseurs(n) parcourt d de $1$ à n (« range(1, n + 1) », car la borne de droite est exclue) et AJOUTE d à L quand le reste « n % d » est nul.\ndiviseurs(12) renvoie [1, 2, 3, 4, 6, 12].\nb) est_premier APPELLE diviseurs et compte les diviseurs obtenus. $13$ en a deux, [1, 13] : True.\n$1$ n'en a qu'un, [1] : False. C'est voulu : $1$ n'est pas un nombre premier.\nc) P garde les n de $0$ à $19$ pour lesquels est_premier(n) est vrai : P vaut [2, 3, 5, 7, 11, 13, 17, 19].\n$0$ est écarté aussi : diviseurs(0) est la liste vide, qui a $0$ élément.\n⭐ Deux petites fonctions, chacune facile à tester, font un programme sûr : c'est le découpage en fonctions.\n⛔ Le piège au a) : « range(1, n) », qui oublie n lui-même. Alors $13$ n'aurait qu'un diviseur et ne serait plus premier.",
          schema: ecranSeulement(cases([{ nom: "diviseurs(12)", valeurs: [1, 2, 3, 4, 6, 12] }, { nom: "P", valeurs: [2, 3, 5, 7, 11, 13, 17, 19] }])),
          micros: ["algo_modulaire", "algo_condition", "algo_listes"],
        },
        {
          enonce: "Un escargot parcourt $1$ m la première heure, puis, chaque heure, la moitié de la distance de l'heure précédente. On exécute « S = 0 », « u = 1 », puis « for k in range(5): » suivi, en retrait, de « S = S + u » et « u = u / 2 ».\na) Faire la trace de S et de u. Que vaut S à la fin ? Que représente-t-il ?\nb) Un élève inverse les deux lignes de la boucle. Que vaut alors S ?\nc) L'escargot atteindra-t-il $2$ m ?",
          correction:
            "a) u est la distance parcourue pendant l'heure en cours ; S additionne ces distances.\nTour 1 : S reçoit $0 + 1 = 1$, puis u devient $0{,}5$. Tour 2 : S vaut $1{,}5$, u vaut $0{,}25$. Puis S vaut $1{,}75$ ; $1{,}875$ ; $1{,}9375$.\nÀ la fin, S vaut $1{,}9375$ : la distance totale parcourue en $5$ heures, en mètres.\nb) Si l'on divise u par $2$ AVANT de l'ajouter, la première heure compte pour $0{,}5$ : S vaut $0{,}5 + 0{,}25 + 0{,}125 + 0{,}0625 + 0{,}03125 = 0{,}96875$.\nC'est faux : l'ordre des lignes dans une boucle compte.\nc) Après chaque heure, il manque exactement la distance de l'heure qui vient de s'écouler : $2 - 1{,}9375 = 0{,}0625$. L'escargot s'approche de $2$ m, sans jamais les atteindre.\n⭐ Ici, tous les calculs sont exacts en machine : $0{,}5$, $0{,}25$… s'écrivent parfaitement en binaire.",
          schema: ecranSeulement(deux(programme(["S = 0", "u = 1", "for k in range(5):", "    S = S + u", "    u = u / 2", "print(S)"]), trace(["k", "S", "u après"], [[0, 1, 0.5], [1, 1.5, 0.25], [2, 1.75, 0.125], [3, 1.875, 0.0625], [4, 1.9375, 0.03125]]))),
          micros: ["algo_boucles", "algo_variable"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes : on lit le programme, on le fait tourner à la main, on interprète ce qu'il affiche.",
      rappel: [
        "Un programme se lit en trois temps : ce que contiennent les variables au départ, ce que fait UN tour de boucle, quand on s'arrête.",
        "« from random import randint » puis « randint(1, 6) » : un entier au hasard entre $1$ et $6$, bornes COMPRISES. La moyenne des gains sur un grand nombre de parties approche l'espérance.",
        "Une suite se programme par sa relation de récurrence : une variable u, remplacée à chaque tour par le terme suivant. Pour garder tous les termes, on les ajoute à une liste.",
      ],
      exercices: [
        {
          titre: "Le jeu de dé de la fête",
          enonce: "À une fête de village, on lance un dé. Avec un $6$, on gagne $5$ € ; avec un $4$ ou un $5$, on gagne $1$ € ; sinon, on perd $2$ €.\na) Le gain d'une partie est une variable aléatoire $X$. Donner sa loi et calculer son espérance.\nb) Que renvoie « partie() » ? Que calcule « moyenne(N) » ?\nc) Un essai a donné : « moyenne(10) » renvoie « -0.8 », « moyenne(100) » renvoie « 0.0 », « moyenne(10000) » renvoie « 0.1703 ». Commenter.\nd) Le jeu est-il favorable au joueur ?",
          figure: programme(["from random import randint", "", "def partie():", "    d = randint(1, 6)", "    if d == 6:", "        return 5", "    elif d >= 4:", "        return 1", "    else:", "        return -2", "", "def moyenne(N):", "    L = [partie()", "         for k in range(N)]", "    return sum(L) / N"]),
          correction:
            "a) $P(X = 5) = \\dfrac{1}{6}$ ; $P(X = 1) = \\dfrac{2}{6}$ ; $P(X = -2) = \\dfrac{3}{6}$.\n$E(X) = 5 \\times \\dfrac{1}{6} + 1 \\times \\dfrac{2}{6} - 2 \\times \\dfrac{3}{6} = \\dfrac{5 + 2 - 6}{6} = \\dfrac{1}{6} \\approx 0{,}17$ €.\nb) « partie() » tire un dé et RENVOIE le gain d'une partie : $5$, $1$ ou $-2$, avec les probabilités de la loi de $X$.\n« moyenne(N) » APPELLE partie() N fois, range les N gains dans la liste L (en compréhension), puis renvoie leur moyenne : le gain moyen sur N parties.\nc) Sur $10$ parties, on a perdu en moyenne $0{,}80$ € par partie ; sur $100$, on n'a rien gagné. Sur $10\\,000$ parties, le gain moyen vaut $0{,}1703$ €, très proche de $E(X) \\approx 0{,}1667$.\nPlus N est grand, plus la moyenne se rapproche de l'espérance : c'est la loi des grands nombres.\nd) $E(X) > 0$ : en moyenne, le joueur gagne environ $17$ centimes par partie. Le jeu lui est légèrement favorable, et fera perdre de l'argent à l'organisateur sur un grand nombre de parties.\n⛔ Le piège : juger le jeu sur $10$ parties. Un petit nombre de parties fluctue beaucoup : ici, il faisait croire à un jeu perdant.",
          schema: ecranSeulement(trace(["N", "moyenne(N)"], [[10, -0.8], [100, 0.0], [10000, 0.1703]])),
          micros: ["algo_fonctions", "algo_modulaire", "algo_condition", "algo_listes"],
        },
        {
          titre: "Qui aura le plus d'abonnés ?",
          enonce: "Deux plateformes lancent leur service le même mois. On modélise leurs abonnés, en milliers : A part de $5$ et gagne $0{,}5$ par mois ; B part de $1$ et augmente de $25$ % par mois. On note $a_n$ et $b_n$ ces nombres au bout de n mois.\na) Exprimer $a_n$ et $b_n$ en fonction de $n$.\nb) Qu'affiche le programme ? Interpréter.\nc) Pourquoi la condition est-elle « b <= a », et pas « b < a » ?\nd) Modifier le programme pour qu'il range aussi les valeurs successives de b dans une liste LB.",
          figure: programme(["a = 5", "b = 1", "n = 0", "while b <= a:", "    a = a + 0.5", "    b = b * 1.25", "    n = n + 1", "print(n)"]),
          correction:
            "a) A gagne la même quantité chaque mois : suite arithmétique, $a_n = 5 + 0{,}5n$.\nB est multipliée par $1{,}25$ chaque mois : suite géométrique, $b_n = 1{,}25^n$.\nb) La boucle tourne tant que B n'a pas dépassé A. Au bout de $10$ mois : $a_{10} = 10$ et $b_{10} \\approx 9{,}31$. Au bout de $11$ mois : $a_{11} = 10{,}5$ et $b_{11} \\approx 11{,}64$ : on sort.\nLe programme affiche $11$ : B dépasse A au bout de $11$ mois, avec environ $11\\,640$ abonnés contre $10\\,500$.\nc) On veut le premier mois où B a STRICTEMENT plus d'abonnés que A. Avec « b < a », une égalité arrêterait la boucle trop tôt (ici, elle ne se produit pas).\nd) Avant la boucle, « LB = [b] » ; dans la boucle, après « b = b * 1.25 », on ajoute « LB.append(b) ». À la fin, LB contient $b_0$, …, $b_{11}$ : douze valeurs.\n⭐ Une croissance en pourcentage finit toujours par dépasser une croissance constante : sur le dessin, la ligne orange de B finit par croiser la droite de A.",
          schema: ecranSeulement(
            repere(
              [-1, 12, -1, 13],
              [
                { q: [0, 0.5, 5] },
                {
                  pts: [[0, 1], [1, 1.25], [2, 1.563], [3, 1.953], [4, 2.441], [5, 3.052], [6, 3.815], [7, 4.768], [8, 5.96], [9, 7.451], [10, 9.313], [11, 11.642]],
                  couleur: ORANGE,
                },
              ],
              [{ x: 11, y: 10.5 }, { x: 11, y: 11.642 }],
              undefined,
              true,
            ),
          ),
          micros: ["algo_seuil", "algo_while", "algo_listes"],
        },
        {
          titre: "Les kilomètres d'une course",
          enonce: "Une coureuse chronomètre chaque kilomètre d'une course de $5$ km. Les temps, en secondes, sont rangés dans la liste T.\na) Que renvoie « plus_rapide(T) » ? Quel kilomètre a-t-elle couru le plus vite ?\nb) Que contient la liste C à la fin ? Que représente C[-1] ?\nc) Calculer son allure moyenne, en minutes par kilomètre.",
          figure: programme(["T = [312, 305, 298, 301, 284]", "", "def plus_rapide(T):", "    i_min = 0", "    for i in range(len(T)):", "        if T[i] < T[i_min]:", "            i_min = i", "    return i_min", "", "C = [T[0]]", "for i in range(1, len(T)):", "    C.append(C[-1] + T[i])"]),
          correction:
            "a) La fonction parcourt les INDICES i de $0$ à $4$ et retient dans i_min l'indice du plus petit temps rencontré.\nT[4] = $284$ est le plus petit : « plus_rapide(T) » renvoie $4$.\nL'indice $4$ correspond au 5e kilomètre, le dernier, couru en $284$ s, soit $4$ min $44$ s.\n⛔ Le piège : répondre « le 4e kilomètre ». L'indice commence à $0$ : l'indice $4$ est le 5e élément.\nb) C commence par T[0] = $312$ ; chaque tour ajoute à la fin le dernier total, C[-1], plus le temps suivant.\nC vaut [312, 617, 915, 1216, 1500] : les temps CUMULÉS au passage de chaque kilomètre.\nC[-1] = $1\\,500$ s est le temps total de la course : $25$ minutes.\nc) Allure moyenne : $\\dfrac{1\\,500}{5} = 300$ s par kilomètre, soit $5$ min par kilomètre.\n⭐ Elle a fini plus vite qu'elle n'a commencé : son dernier kilomètre est le plus rapide.",
          schema: ecranSeulement(cases([{ nom: "T", valeurs: [312, 305, 298, 301, 284] }, { nom: "C", valeurs: [312, 617, 915, 1216, 1500] }])),
          micros: ["algo_liste_manipuler", "algo_liste_parcourir", "algo_listes", "algo_fonctions"],
        },
        {
          titre: "La racine de 2 par la méthode de Newton",
          enonce: "On cherche la solution positive de $x^2 - 2 = 0$, c'est-à-dire $\\sqrt{2}$. On part de $x_0 = 1$ et, à chaque étape, on remplace x par l'abscisse du point où la tangente à la courbe de $f(x) = x^2 - 2$ coupe l'axe des abscisses : $x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$.\na) Écrire l'équation de la tangente en $x_0 = 1$ et retrouver $x_1 = 1{,}5$.\nb) Expliquer le rôle de fp et de la liste L. Pour « newton(1, 4) », Python affiche « [1, 1.5, 1.4166666666666667, 1.4142156862745099, 1.4142135623746899] » : vérifier $x_2$ par le calcul.\nc) Sachant que $\\sqrt{2} = 1{,}41421356237\\ldots$, combien de décimales justes a chaque terme ? Que remarque-t-on ?",
          figure: programme(["def f(x):", "    return x**2 - 2", "", "def fp(x):", "    return 2*x", "", "def newton(x, n):", "    L = [x]", "    for k in range(n):", "        x = x - f(x) / fp(x)", "        L.append(x)", "    return L"]),
          correction:
            "a) $f(1) = -1$ et $f'(x) = 2x$, donc $f'(1) = 2$. Tangente : $y = 2(x - 1) - 1 = 2x - 3$.\nElle coupe l'axe des abscisses quand $2x - 3 = 0$ : $x_1 = 1{,}5$. C'est bien $1 - \\dfrac{f(1)}{f'(1)} = 1 - \\dfrac{-1}{2} = 1{,}5$.\nb) fp est la dérivée $f'$. newton APPELLE f et fp à chaque étape, et range chaque nouvelle valeur dans L : la liste garde tous les termes, de $x_0$ à $x_n$.\n$x_2 = 1{,}5 - \\dfrac{1{,}5^2 - 2}{2 \\times 1{,}5} = 1{,}5 - \\dfrac{0{,}25}{3} = \\dfrac{17}{12} \\approx 1{,}4167$.\nc) $x_1 = 1{,}5$ : aucune décimale juste. $x_2 \\approx 1{,}4167$ : $2$ décimales. $x_3 \\approx 1{,}414216$ : $5$ décimales. $x_4 \\approx 1{,}414213562375$ : $11$ décimales.\nLe nombre de décimales justes double à peu près à chaque étape : la méthode est très rapide.\n⭐ Pour $\\sqrt{2}$, ce calcul est celui qu'on attribue à Héron d'Alexandrie (Ier siècle) ; la méthode générale porte le nom de Newton (XVIIᵉ siècle).",
          schema: ecranSeulement(repere([-1, 3, -3, 4], [{ q: [1, 0, -2] }, { q: [0, 2, -3], couleur: ORANGE }], [{ x: 1, y: -1 }, { x: 1.5, y: 0 }])),
          micros: ["algo_modulaire", "algo_fonctions", "algo_listes", "algo_boucles"],
        },
      ],
    },
  ],
};
