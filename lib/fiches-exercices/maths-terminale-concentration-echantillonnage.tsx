// ─── Fiche d'exercices : concentration, loi des grands nombres (terminale spé) ─
//                              20 exercices corrigés
//
// Feuille de terminale spé du 29/09/2026, une par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/terminale-spe/maths/concentration.bank.ts`
// (notionId concentration_echantillonnage), au niveau du bac.
//
// ⭐⭐ LE FIL : UNE INÉGALITÉ GARANTIT, ELLE NE CALCULE PAS. Bienaymé-
// Tchebychev pour une variable, la concentration pour une moyenne, la loi des
// grands nombres à la limite ; puis la question de bac : « quelle taille
// d'échantillon suffit ? ». Les dessins montrent l'intervalle garanti sur une
// droite graduée, et le majorant qui fond quand n grandit.
//
// ⛔ LES PIÈGES NOMMÉS : oublier le carré de δ (2, 5, 11), σ/n au lieu de
// σ/√n (1), confondre majorant et valeur (4, 6, 17), la loi des grands nombres
// qui « corrigerait » le passé (7, 16), p inconnu dans p(1 − p) (12), δ mal
// transporté (19, 20).
//
// ⭐ LES DESSINS : intervalles garantis (canvas number_line), la courbe 1/k²,
// les probabilités exactes d'écart qui tombent vers 0 (loi binomiale), la
// parabole p(1 − p), le majorant du sondage, deux programmes Python exécutés
// par le script. Ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Micro-compétences : concentration_echantillon_moyenne (1, 9, 10, 16, 18),
// concentration_inegalite_bienayme (2, 3, 4, 8, 11, 12, 14, 17, 18),
// concentration_inegalite_concentration (5, 6, 9, 10, 15, 16, 18, 19),
// concentration_loi_grands_nombres (7, 10, 13, 16, 19, 20),
// concentration_fluctuation (8, 11, 12, 13, 14, 17, 20), concentration_defi
// (17, 18, 19, 20). 6/6.
//
// Faits cités : la roulette européenne a 37 cases, 18 rouges, 18 noires et le
// zéro (exercice 16). Le reste (batterie, trajets, serveur, usine, sondages,
// pièce testée, polluant, café, assurance) est MODÈLE.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, intervalles, programme, repere, tableau } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Des points (n ; valeur) à partir du rang n0 (valeurs EN CLAIR, arrondies). */
const termes = (n0: number, valeurs: number[]) => valeurs.map((y, i) => ({ x: n0 + i, y, label: "" }));

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

export const exercicesConcentrationEchantillonnageTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "concentration-echantillonnage",
  titre: "Concentration et loi des grands nombres",
  accroche:
    "Vingt exercices, de l'inégalité de Bienaymé-Tchebychev au problème de bac, avec un rappel de cours avant chaque niveau. Une inégalité ne calcule pas une probabilité : elle garantit qu'elle est petite, et dit quelle taille d'échantillon suffit. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine l'intervalle garanti.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Moyenne d'un échantillon : $X_1$, …, $X_n$ indépendantes, de même loi, d'espérance $\\mu$ et de variance $V$. Leur moyenne $M_n$ vérifie $E(M_n) = \\mu$ et $V(M_n) = \\dfrac{V}{n}$.",
        "Inégalité de Bienaymé-Tchebychev : pour tout $\\delta > 0$, $P(|X - E(X)| \\geqslant \\delta) \\leqslant \\dfrac{V(X)}{\\delta^2}$.",
        "Inégalité de concentration : pour tout $\\delta > 0$, $P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{n\\delta^2}$.",
        "Loi des grands nombres : pour tout $\\delta > 0$, $P(|M_n - \\mu| \\geqslant \\delta)$ tend vers $0$ quand $n$ tend vers $+\\infty$.",
      ],
      exercices: [
        {
          enonce:
            "Les variables $X_1$, $X_2$, … sont indépendantes, de même loi, avec $E(X_i) = 12$ et $V(X_i) = 9$. On note $M_n$ la moyenne des $n$ premières.\na) Calculer $E(M_{25})$, $V(M_{25})$ et $\\sigma(M_{25})$.\nb) Combien faut-il de variables pour que $\\sigma(M_n) = 0{,}3$ ?",
          correction:
            "a) $E(M_{25}) = 12$ : la moyenne a la même espérance que chaque variable.\n$V(M_{25}) = \\dfrac{9}{25} = 0{,}36$, donc $\\sigma(M_{25}) = \\sqrt{0{,}36} = 0{,}6$.\nb) $\\sigma(M_n) = \\dfrac{3}{\\sqrt{n}} = 0{,}3$ donne $\\sqrt{n} = 10$, soit $n = 100$.\n⚠️ $\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$, pas $\\dfrac{\\sigma}{n}$ : c'est la VARIANCE qui est divisée par $n$.\n⭐ Le tableau le montre : pour diviser l'écart type par $10$ (de $3$ à $0{,}3$), il faut $100$ fois plus de variables.",
          schema: ecranSeulement(tableau(["n", "1", "4", "25", "100"], ["σ(Mₙ)", "3", "1,5", "0,6", "0,3"])),
          micros: ["concentration_echantillon_moyenne"],
        },
        {
          enonce:
            "Le temps de charge $X$ d'une batterie, en minutes, a pour espérance $50$ et pour variance $16$.\na) Majorer $P(|X - 50| \\geqslant 10)$.\nb) En déduire une minoration de $P(40 < X < 60)$.",
          correction:
            "a) Bienaymé-Tchebychev avec $\\delta = 10$ : $P(|X - 50| \\geqslant 10) \\leqslant \\dfrac{16}{10^2} = 0{,}16$.\nb) L'événement $40 < X < 60$ est le contraire de $|X - 50| \\geqslant 10$.\nDonc $P(40 < X < 60) \\geqslant 1 - 0{,}16 = 0{,}84$.\n⚠️ On divise par $\\delta^2 = 100$, pas par $\\delta = 10$ : on trouverait $1{,}6$, absurde pour une probabilité.\n⚠️ Le contraire de « l'écart est au moins $10$ » est « l'écart est STRICTEMENT inférieur à $10$ » : les bornes $40$ et $60$ sont exclues.\n⭐ Sur la droite : au moins $84$ % des charges durent entre $40$ et $60$ minutes, de part et d'autre de l'espérance $50$.",
          schema: intervalles(30, 70, [{ de: 40, a: 60, label: "au moins 84 %" }], 10, [{ value: 50, label: "E" }]),
          micros: ["concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "Soit $X$ une variable aléatoire d'espérance $\\mu$ et d'écart type $\\sigma > 0$, et $k > 0$.\na) Montrer que $P(|X - \\mu| \\geqslant k\\sigma) \\leqslant \\dfrac{1}{k^2}$.\nb) Que donne cette inégalité pour $k = 2$ ? Pour $k = 3$ ? Pour $k = 1$ ?",
          correction:
            "a) Bienaymé-Tchebychev avec $\\delta = k\\sigma$ : $P(|X - \\mu| \\geqslant k\\sigma) \\leqslant \\dfrac{\\sigma^2}{k^2\\sigma^2} = \\dfrac{1}{k^2}$.\nb) $k = 2$ : s'écarter de $2$ écarts types ou plus arrive avec une probabilité d'au plus $\\dfrac{1}{4} = 0{,}25$.\n$k = 3$ : au plus $\\dfrac{1}{9} \\approx 0{,}11$.\n$k = 1$ : au plus $1$. C'est vrai, mais cela n'apprend rien.\n⚠️ L'inégalité vaut pour TOUTE loi : c'est sa force, et c'est pourquoi elle est souvent large.\n⭐ Sur le dessin : la courbe $y = \\dfrac{1}{x^2}$ ; les points marqués sont les majorants pour $k = 2$ et $k = 3$. Pour $k \\leqslant 1$, la courbe est au-dessus de la droite $y = 1$ : aucune information.",
          schema: repere([-1, 6, -1, 2], [{ pts: echantillon((x) => 1 / (x * x), 0.7, 6, -1, 2) }], [{ x: 2, y: 0.25, label: "" }, { x: 3, y: 0.11, label: "" }], 1),
          micros: ["concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "$X$ suit la loi binomiale $\\mathcal{B}(100 ; 0{,}5)$ : c'est le nombre de piles en $100$ lancers d'une pièce équilibrée.\na) Calculer $E(X)$ et $V(X)$.\nb) Majorer $P(|X - 50| \\geqslant 10)$ avec l'inégalité de Bienaymé-Tchebychev.\nc) La calculatrice donne $P(X \\leqslant 40) \\approx 0{,}0284$. En déduire une valeur approchée de $P(|X - 50| \\geqslant 10)$, et comparer.",
          correction:
            "a) $E(X) = 100 \\times 0{,}5 = 50$ et $V(X) = 100 \\times 0{,}5 \\times 0{,}5 = 25$.\nb) $P(|X - 50| \\geqslant 10) \\leqslant \\dfrac{25}{10^2} = 0{,}25$.\nc) $|X - 50| \\geqslant 10$ signifie $X \\leqslant 40$ ou $X \\geqslant 60$. Comme $p = 0{,}5$, la loi est symétrique : ces deux probabilités sont égales.\nDonc $P(|X - 50| \\geqslant 10) \\approx 2 \\times 0{,}0284 \\approx 0{,}057$.\nLa vraie probabilité est plus de quatre fois plus petite que le majorant.\n⚠️ L'inégalité n'est pas fausse : elle est GROSSIÈRE. Elle ne sert pas à calculer une probabilité, mais à garantir qu'elle est petite.\n⭐ Sur le diagramme (en %) : les deux classes des bords pèsent environ $3$ % chacune, loin des $25$ % autorisés.",
          schema: diagramme("barres", [{ label: "≤ 40", value: 3 }, { label: "41 à 49", value: 43 }, { label: "50", value: 8 }, { label: "51 à 59", value: 43 }, { label: "≥ 60", value: 3 }]),
          micros: ["concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "Le temps de trajet quotidien d'un salarié, en minutes, a pour espérance $20$ et pour variance $4$ ; les trajets sont indépendants. On note $M_n$ le temps moyen sur $n$ jours.\na) Majorer $P(|M_{100} - 20| \\geqslant 0{,}5)$.\nb) Que devient ce majorant pour $400$ jours ? Pour $1\\,600$ jours ?",
          correction:
            "a) Inégalité de concentration avec $V = 4$, $n = 100$ et $\\delta = 0{,}5$ :\n$P(|M_{100} - 20| \\geqslant 0{,}5) \\leqslant \\dfrac{4}{100 \\times 0{,}25} = 0{,}16$.\nb) $n = 400$ : $\\dfrac{4}{400 \\times 0{,}25} = 0{,}04$. $n = 1\\,600$ : $\\dfrac{4}{1\\,600 \\times 0{,}25} = 0{,}01$.\nQuatre fois plus de jours : le majorant est divisé par $4$.\n⚠️ $\\delta^2 = 0{,}25$, pas $0{,}5$ : on n'oublie pas le carré.\n⭐ Le tableau montre le majorant qui fond quand $n$ grandit : la loi des grands nombres se prépare.",
          schema: ecranSeulement(tableau(["n", "100", "400", "1 600"], ["majorant", "0,16", "0,04", "0,01"])),
          micros: ["concentration_inegalite_concentration"],
        },
        {
          enonce:
            "Une variable aléatoire a pour variance $9$. On veut que la moyenne $M_n$ d'un échantillon de taille $n$ vérifie $P(|M_n - \\mu| \\geqslant 0{,}2) \\leqslant 0{,}05$. Quelle taille $n$ suffit, d'après l'inégalité de concentration ?",
          correction:
            "L'inégalité donne $P(|M_n - \\mu| \\geqslant 0{,}2) \\leqslant \\dfrac{9}{n \\times 0{,}04}$.\nIl suffit que $\\dfrac{9}{0{,}04n} \\leqslant 0{,}05$.\nOn multiplie par $0{,}04n > 0$ : $9 \\leqslant 0{,}002n$, donc $n \\geqslant 4\\,500$.\nUn échantillon de $4\\,500$ valeurs suffit.\n⚠️ « Suffit » ne veut pas dire « il faut » : une taille plus petite marcherait peut-être, mais l'inégalité ne le GARANTIT pas.\n⭐ Le tableau : à $4\\,500$, le majorant atteint juste $0{,}05$ ; au double, il est divisé par $2$.",
          schema: ecranSeulement(tableau(["n", "1 000", "2 000", "4 500", "9 000"], ["majorant", "0,225", "0,1125", "0,05", "0,025"])),
          micros: ["concentration_inegalite_concentration"],
        },
        {
          enonce:
            "On lance $n$ fois une pièce équilibrée ; $F_n$ est la fréquence de pile. Le dessin donne, pour $n = 10$, $20$, …, $100$ (abscisse : $n$ en dizaines), la probabilité EXACTE que $F_n$ s'écarte de $0{,}5$ d'au moins $0{,}1$, calculée avec la loi binomiale.\na) Que montre le dessin ? Quel théorème l'annonce ?\nb) Vrai ou faux : « après $5$ piles de suite, face est plus probable au lancer suivant ».\nc) Vrai ou faux : « pour $n$ grand, $F_n$ vaut exactement $0{,}5$ ».",
          figure: repere([-1, 11, -1, 1], [], termes(1, [0.75, 0.5, 0.36, 0.27, 0.2, 0.16, 0.12, 0.09, 0.07, 0.06]), undefined, true),
          correction:
            "a) Les probabilités descendent : environ $0{,}75$ pour $n = 10$, $0{,}20$ pour $n = 50$, $0{,}06$ pour $n = 100$.\nC'est la loi des grands nombres : pour tout $\\delta > 0$, $P(|F_n - 0{,}5| \\geqslant \\delta)$ tend vers $0$.\nb) Faux : les lancers sont indépendants, la pièce n'a pas de mémoire. Face garde la probabilité $0{,}5$.\nc) Faux : pour $n$ impair, $F_n$ ne peut même pas valoir $0{,}5$. La loi dit seulement que les GRANDS écarts deviennent rares.\n⚠️ La loi des grands nombres ne « corrige » pas les écarts passés : elle les noie dans la masse des lancers suivants.\n⭐ Sur le dessin : les points tombent vers l'axe des abscisses, sans jamais l'atteindre.",
          micros: ["concentration_loi_grands_nombres"],
        },
        {
          enonce:
            "Dans une grande usine, $30$ % des pièces sortent d'une machine A. On prélève $400$ pièces au hasard (tirages assimilés à des tirages indépendants) ; $F$ est la fréquence des pièces de la machine A dans le prélèvement.\na) Calculer $E(F)$ et $V(F)$.\nb) Majorer $P(|F - 0{,}3| \\geqslant 0{,}05)$ et interpréter.",
          correction:
            "a) $F = \\dfrac{X}{400}$, où $X$ suit $\\mathcal{B}(400 ; 0{,}3)$. $E(F) = \\dfrac{400 \\times 0{,}3}{400} = 0{,}3$.\n$V(F) = \\dfrac{400 \\times 0{,}3 \\times 0{,}7}{400^2}$ $= \\dfrac{0{,}21}{400} = 0{,}000\\,525$.\nb) Bienaymé-Tchebychev : $P(|F - 0{,}3| \\geqslant 0{,}05)$ $\\leqslant \\dfrac{0{,}000\\,525}{0{,}05^2} = 0{,}21$.\nDans au moins $79$ % des prélèvements, la fréquence tombe strictement entre $25$ % et $35$ %.\n⚠️ $V(F) = \\dfrac{V(X)}{400^2}$ : diviser $X$ par $400$ divise sa variance par $400^2$.\n⭐ Sur la droite (en %) : l'intervalle de $25$ à $35$ entoure $p = 30$ ; au moins $79$ % des fréquences y tombent.",
          schema: ecranSeulement(intervalles(20, 40, [{ de: 25, a: 35, label: "au moins 79 %" }], 5, [{ value: 30, label: "p" }])),
          micros: ["concentration_fluctuation", "concentration_inegalite_bienayme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Fréquence d'un échantillon : si $X$ suit $\\mathcal{B}(n ; p)$, alors $F = \\dfrac{X}{n}$ vérifie $E(F) = p$ et $V(F) = \\dfrac{p(1 - p)}{n}$.",
        "Pour tout $p$ entre $0$ et $1$ : $p(1 - p) \\leqslant \\dfrac{1}{4}$. On s'en sert quand $p$ est inconnu.",
        "Trouver une taille d'échantillon : on écrit « majorant $\\leqslant$ risque accepté », puis on résout en $n$.",
        "Le contraire de $|X - \\mu| \\geqslant \\delta$ est $|X - \\mu| < \\delta$, c'est-à-dire $\\mu - \\delta < X < \\mu + \\delta$.",
      ],
      exercices: [
        {
          enonce:
            "Le temps de réponse d'un serveur informatique à une requête a pour espérance $200$ ms et pour écart type $40$ ms ; les requêtes sont indépendantes. Un logiciel de surveillance calcule le temps moyen $M$ de $64$ requêtes.\na) Calculer $E(M)$ et $\\sigma(M)$.\nb) Majorer la probabilité que $M$ s'écarte de $200$ ms d'au moins $15$ ms.\nc) Le logiciel déclenche une alerte si $M \\geqslant 215$ ms. Le serveur fonctionnant normalement, majorer la probabilité d'une fausse alerte.",
          correction:
            "a) $E(M) = 200$ ms et $V(M) = \\dfrac{40^2}{64} = 25$, donc $\\sigma(M) = 5$ ms.\nb) Inégalité de concentration : $P(|M - 200| \\geqslant 15) \\leqslant \\dfrac{1\\,600}{64 \\times 15^2} = \\dfrac{1}{9} \\approx 0{,}11$.\nc) Si $M \\geqslant 215$, alors $M - 200 \\geqslant 15$, donc $|M - 200| \\geqslant 15$.\nL'événement « alerte » est inclus dans celui du b) : sa probabilité est au plus $\\dfrac{1}{9}$.\n⚠️ L'inégalité majore l'écart des DEUX côtés. Pour un seul côté, elle reste vraie, mais elle est encore plus large.\n⭐ Sur la droite : $M$ tombe entre $185$ et $215$ ms avec une probabilité d'au moins $\\dfrac{8}{9}$ ; l'alerte est au-delà de $215$.",
          schema: intervalles(180, 220, [{ de: 185, a: 215, label: "au moins 8/9" }], 5, [{ value: 200, label: "E" }]),
          micros: ["concentration_echantillon_moyenne", "concentration_inegalite_concentration"],
        },
        {
          enonce:
            "Démonstration du cours. $X_1$, …, $X_n$ sont indépendantes, de même loi, d'espérance $\\mu$ et de variance $V$, et $M_n$ est leur moyenne.\na) Montrer que $E(M_n) = \\mu$ et $V(M_n) = \\dfrac{V}{n}$.\nb) En appliquant l'inégalité de Bienaymé-Tchebychev à $M_n$, démontrer l'inégalité de concentration.\nc) En déduire la loi des grands nombres.\nd) Application : on lance $50$ fois un dé équilibré, pour lequel $\\mu = 3{,}5$ et $V = \\dfrac{35}{12}$. Minorer la probabilité que la moyenne des résultats soit strictement comprise entre $3$ et $4$.",
          correction:
            "a) Par linéarité, $E(M_n) = \\dfrac{1}{n} \\times n\\mu = \\mu$.\nPar indépendance, $V(X_1 + \\cdots + X_n) = nV$ ; puis $V(M_n) = \\dfrac{1}{n^2} \\times nV = \\dfrac{V}{n}$.\nb) Bienaymé-Tchebychev appliquée à $M_n$ : $P(|M_n - E(M_n)| \\geqslant \\delta) \\leqslant \\dfrac{V(M_n)}{\\delta^2}$.\nOn remplace : $P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{n\\delta^2}$.\nc) $\\delta$ est fixé : $\\dfrac{V}{n\\delta^2}$ tend vers $0$ quand $n$ tend vers $+\\infty$. Une probabilité est positive : par le théorème des gendarmes, $P(|M_n - \\mu| \\geqslant \\delta)$ tend vers $0$.\nd) Avec $\\delta = 0{,}5$ : $P(|M_{50} - 3{,}5| \\geqslant 0{,}5)$ $\\leqslant \\dfrac{35}{12 \\times 50 \\times 0{,}25} = \\dfrac{7}{30} \\approx 0{,}23$.\nPar passage au contraire, $P(3 < M_{50} < 4) \\geqslant 1 - \\dfrac{7}{30} = \\dfrac{23}{30} \\approx 0{,}77$.\n⚠️ La loi des grands nombres dit que les écarts deviennent RARES, pas qu'ils disparaissent : $M_n$ reste une variable aléatoire.\n⭐ Sur la droite : la moyenne des $50$ lancers tombe entre $3$ et $4$ avec une probabilité d'au moins $77$ %.",
          schema: ecranSeulement(intervalles(1, 6, [{ de: 3, a: 4, label: "au moins 77 %" }], 1, [{ value: 3.5, label: "3,5" }])),
          micros: ["concentration_echantillon_moyenne", "concentration_inegalite_concentration", "concentration_loi_grands_nombres"],
        },
        {
          enonce:
            "Avant un référendum, $52$ % des électeurs comptent voter « oui ». Un institut interroge $1\\,000$ électeurs pris au hasard (tirages assimilés à des tirages indépendants) ; $F$ est la fréquence de « oui » dans l'échantillon.\na) Calculer $E(F)$ et $\\sigma(F)$.\nb) Majorer la probabilité que le sondage se trompe de $5$ points ou plus.\nc) En pratique, l'institut ne connaît pas $p$ : il utilise $p(1 - p) \\leqslant \\dfrac{1}{4}$. Quel majorant obtient-il ?",
          correction:
            "a) $E(F) = 0{,}52$ et $V(F) = \\dfrac{0{,}52 \\times 0{,}48}{1\\,000} = 0{,}000\\,249\\,6$, donc $\\sigma(F) \\approx 0{,}016$.\nb) « Se tromper de $5$ points ou plus », c'est $|F - 0{,}52| \\geqslant 0{,}05$.\nBienaymé-Tchebychev : $P(|F - 0{,}52| \\geqslant 0{,}05)$ $\\leqslant \\dfrac{0{,}000\\,249\\,6}{0{,}0025} \\approx 0{,}0998$.\nLe sondage tombe à moins de $5$ points de la vérité dans au moins $90$ % des cas.\nc) $V(F) \\leqslant \\dfrac{1}{4 \\times 1\\,000} = 0{,}000\\,25$, d'où le majorant $\\dfrac{0{,}000\\,25}{0{,}0025} = 0{,}1$ : presque le même, sans connaître $p$.\n⚠️ $5$ points, c'est $\\delta = 0{,}05$, donc $\\delta^2 = 0{,}0025$ : pas $25$.\n⭐ Sur la droite (en %) : de $47$ à $57$, la fourchette qui contient $F$ avec une probabilité d'au moins $90$ %. Elle déborde sous $50$ : un sondage peut donner le « non » gagnant alors que le « oui » l'emporte.",
          schema: intervalles(45, 60, [{ de: 47, a: 57, label: "au moins 90 %" }], 5, [{ value: 52, label: "p" }]),
          micros: ["concentration_fluctuation", "concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "Une usine veut estimer la proportion $p$, inconnue, de pièces défectueuses. Elle prélève $n$ pièces (tirages indépendants) et calcule la fréquence $F$ de pièces défectueuses.\na) Montrer que $p(1 - p) \\leqslant \\dfrac{1}{4}$ pour tout $p \\in [0 ; 1]$.\nb) En déduire que $P(|F - p| \\geqslant 0{,}02) \\leqslant \\dfrac{625}{n}$.\nc) Quelle taille $n$ garantit une probabilité d'erreur d'au plus $5$ % ?",
          correction:
            "a) $\\dfrac{1}{4} - p(1 - p) = p^2 - p + \\dfrac{1}{4} = \\left(p - \\dfrac{1}{2}\\right)^2 \\geqslant 0$.\nb) $V(F) = \\dfrac{p(1 - p)}{n} \\leqslant \\dfrac{1}{4n}$. Bienaymé-Tchebychev :\n$P(|F - p| \\geqslant 0{,}02) \\leqslant \\dfrac{1}{4n \\times 0{,}0004}$ $= \\dfrac{1}{0{,}0016n} = \\dfrac{625}{n}$.\nc) $\\dfrac{625}{n} \\leqslant 0{,}05$ donne $n \\geqslant 12\\,500$.\n⚠️ On ne peut pas utiliser $V(F) = \\dfrac{p(1 - p)}{n}$ tel quel : $p$ est justement ce qu'on cherche. D'où la majoration par $\\dfrac{1}{4}$.\n⭐ Sur le dessin : la parabole $y = p(1 - p)$ atteint son sommet $\\dfrac{1}{4}$ en $p = \\dfrac{1}{2}$, et reste sous la droite $y = 0{,}25$.",
          schema: repere([-0.5, 1.5, -0.2, 0.4], [{ q: [-1, 1, 0] }], [{ x: 0.5, y: 0.25, label: "" }], 0.25),
          micros: ["concentration_fluctuation", "concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "La fonction Python ci-dessous simule $n$ lancers d'un dé équilibré.\na) Que renvoie freq(n) ?\nb) On note $F_n$ ce nombre. Calculer $E(F_n)$ et $V(F_n)$.\nc) Majorer $P\\left(\\left|F_n - \\dfrac{1}{6}\\right| \\geqslant 0{,}01\\right)$ pour $n = 100\\,000$.\nd) Que devrait afficher freq(100000) ?",
          figure: programme(["from random import randint", "", "def freq(n):", "    k = 0", "    for i in range(n):", "        if randint(1, 6) == 6:", "            k = k + 1", "    return k / n"]),
          correction:
            "a) La boucle compte les $6$ obtenus (dans k), puis la fonction renvoie k / n : la fréquence des $6$ sur $n$ lancers.\nb) Le nombre de $6$ suit $\\mathcal{B}\\left(n ; \\dfrac{1}{6}\\right)$ : $E(F_n) = \\dfrac{1}{6}$ et $V(F_n) = \\dfrac{1}{n} \\times \\dfrac{1}{6} \\times \\dfrac{5}{6} = \\dfrac{5}{36n}$.\nc) Bienaymé-Tchebychev : le majorant est $\\dfrac{5}{36n \\times 0{,}0001}$.\nPour $n = 100\\,000$ : $\\dfrac{5}{360} = \\dfrac{1}{72} \\approx 0{,}014$.\nd) Un nombre à moins de $0{,}01$ de $\\dfrac{1}{6} \\approx 0{,}1667$, avec une probabilité d'au moins $1 - \\dfrac{1}{72} \\approx 0{,}986$. Une exécution le confirme.\n⚠️ Le programme ne démontre rien : il illustre la loi des grands nombres sur une expérience. La preuve, c'est l'inégalité.\n⭐ La fréquence simulée se rapproche de la probabilité : c'est la loi des grands nombres, sous nos yeux.",
          micros: ["concentration_loi_grands_nombres", "concentration_fluctuation"],
        },
        {
          enonce:
            "Pour tester une pièce, on la lance $10\\,000$ fois : on obtient $5\\,700$ piles. On note $F$ la fréquence de pile sur $10\\,000$ lancers.\na) Si la pièce est équilibrée, calculer $E(F)$ et $V(F)$.\nb) Toujours si la pièce est équilibrée, majorer $P(|F - 0{,}5| \\geqslant 0{,}05)$.\nc) Que penser de la pièce ?",
          correction:
            "a) $E(F) = 0{,}5$ et $V(F) = \\dfrac{0{,}5 \\times 0{,}5}{10\\,000} = 0{,}000\\,025$.\nb) $P(|F - 0{,}5| \\geqslant 0{,}05)$ $\\leqslant \\dfrac{0{,}000\\,025}{0{,}0025} = 0{,}01$.\nc) On a observé $F = 0{,}57$, soit un écart de $0{,}07$, supérieur à $0{,}05$. Avec une pièce équilibrée, un tel écart arrive au plus $1$ fois sur $100$.\nOn a de bonnes raisons de douter que la pièce soit équilibrée.\n⚠️ On ne PROUVE pas que la pièce est truquée : on montre qu'un résultat aussi éloigné serait très improbable si elle ne l'était pas.\n⭐ Sur la droite (en %) : la fréquence observée, $57$, tombe hors de l'intervalle de $45$ à $55$, qui devrait la contenir au moins $99$ fois sur $100$.",
          schema: intervalles(40, 60, [{ de: 45, a: 55, label: "au moins 99 %" }], 5, [{ value: 57, label: "F" }]),
          micros: ["concentration_fluctuation", "concentration_inegalite_bienayme"],
        },
        {
          enonce:
            "Un laboratoire mesure la concentration d'un polluant dans une rivière. Chaque mesure a pour espérance la vraie concentration $\\mu$ et pour écart type $0{,}8$ mg/L ; les mesures sont indépendantes. On retient la moyenne $M_n$ de $n$ mesures.\na) Majorer $P(|M_n - \\mu| \\geqslant 0{,}2)$ en fonction de $n$.\nb) Combien de mesures faut-il pour que ce majorant soit au plus $0{,}1$ ?\nc) Le laboratoire fait $40$ mesures. Quelle précision $\\delta$ peut-il garantir avec un risque d'au plus $10$ % ?",
          correction:
            "a) $V = 0{,}8^2 = 0{,}64$. Inégalité de concentration : $P(|M_n - \\mu| \\geqslant 0{,}2) \\leqslant \\dfrac{0{,}64}{0{,}04n} = \\dfrac{16}{n}$.\nb) $\\dfrac{16}{n} \\leqslant 0{,}1$ donne $n \\geqslant 160$.\nc) On veut $\\dfrac{0{,}64}{40\\delta^2} \\leqslant 0{,}1$, soit $\\delta^2 \\geqslant 0{,}16$, donc $\\delta \\geqslant 0{,}4$ mg/L.\nAvec $40$ mesures, la moyenne est à moins de $0{,}4$ mg/L de la vraie valeur avec une probabilité d'au moins $90$ %.\n⚠️ Quatre fois moins de mesures ($40$ au lieu de $160$) : l'écart garanti est deux fois plus grand ($0{,}4$ au lieu de $0{,}2$), pas quatre fois. C'est $\\delta^2$ qui suit $n$.\n⭐ Le tableau montre le majorant $\\dfrac{16}{n}$ pour $40$, $80$ et $160$ mesures.",
          schema: ecranSeulement(tableau(["n", "40", "80", "160"], ["majorant", "0,4", "0,2", "0,1"])),
          micros: ["concentration_inegalite_concentration"],
        },
        {
          enonce:
            "À la roulette d'un casino, il y a $37$ cases : $18$ rouges, $18$ noires et le zéro. Un joueur mise $1$ € sur « rouge » : il gagne $1$ € si la bille tombe sur une case rouge, sinon il perd sa mise. On note $G$ son gain.\na) Donner la loi de $G$ ; calculer $E(G)$ et $V(G)$.\nb) Le casino voit passer $n$ mises indépendantes, de gains $G_1$, …, $G_n$. Que dit la loi des grands nombres du gain moyen $M_n$ des joueurs ?\nc) Majorer $P\\left(\\left|M_n + \\dfrac{1}{37}\\right| \\geqslant 0{,}02\\right)$ pour $n = 10\\,000$, puis pour $n = 100\\,000$. Interpréter pour le casino.",
          correction:
            "a) $P(G = 1) = \\dfrac{18}{37}$ et $P(G = -1) = \\dfrac{19}{37}$.\n$E(G) = \\dfrac{18 - 19}{37} = -\\dfrac{1}{37} \\approx -0{,}027$ €.\n$E(G^2) = 1$, donc $V(G) = 1 - \\dfrac{1}{37^2} \\approx 0{,}999$.\nb) Pour tout $\\delta > 0$, $P\\left(\\left|M_n + \\dfrac{1}{37}\\right| \\geqslant \\delta\\right)$ tend vers $0$ : sur un très grand nombre de mises, le gain moyen des joueurs est très probablement proche de $-\\dfrac{1}{37}$ € par euro misé.\nc) $n = 10\\,000$ : majorant $\\dfrac{0{,}999}{10\\,000 \\times 0{,}0004} \\approx 0{,}25$.\n$n = 100\\,000$ : majorant $\\approx 0{,}025$.\nPour le casino, qui voit passer des centaines de milliers de mises, un bénéfice moyen proche de $2{,}7$ centimes par euro misé est pratiquement assuré.\n⚠️ La loi des grands nombres ne dit rien d'UNE soirée d'un joueur : sur quelques mises, il peut gagner. Elle parle de la moyenne sur un grand nombre de mises.\n⭐ Sur le diagramme (en %) : les deux barres sont presque égales ; c'est le zéro, une case sur $37$, qui fait pencher l'espérance.",
          schema: ecranSeulement(diagramme("barres", [{ label: "+1 €", value: 49 }, { label: "−1 €", value: 51 }])),
          micros: ["concentration_loi_grands_nombres", "concentration_echantillon_moyenne", "concentration_inegalite_concentration"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. L'inégalité dit quelle taille d'échantillon suffit.",
      rappel: [
        "« Quelle taille d'échantillon garantit… » : on écrit l'inégalité de concentration, puis « majorant $\\leqslant$ risque », et on résout en $n$.",
        "Pour une fréquence : $V(F_n) = \\dfrac{p(1 - p)}{n} \\leqslant \\dfrac{1}{4n}$.",
        "Les inégalités garantissent, elles ne calculent pas : la vraie probabilité est souvent bien plus petite que le majorant.",
      ],
      exercices: [
        {
          titre: "La taille d'un sondage",
          enonce:
            "Un institut veut estimer la proportion $p$ d'électeurs favorables à un projet. Il interroge $n$ personnes, tirées au hasard de façon indépendante ; $F_n$ est la fréquence des favorables dans l'échantillon.\na) Rappeler $E(F_n)$ et $V(F_n)$, puis montrer que $V(F_n) \\leqslant \\dfrac{1}{4n}$.\nb) Montrer que $P(|F_n - p| \\geqslant 0{,}03) \\leqslant \\dfrac{2\\,500}{9n}$.\nc) Quelle taille d'échantillon garantit que $F_n$ est à moins de $3$ points de $p$ avec une probabilité d'au moins $95$ % ?\nd) Avec $1\\,000$ personnes, que garantit l'inégalité ? Commenter.",
          correction:
            "a) $nF_n$ suit $\\mathcal{B}(n ; p)$ : $E(F_n) = p$ et $V(F_n) = \\dfrac{p(1 - p)}{n}$.\nOr $\\dfrac{1}{4} - p(1 - p) = \\left(p - \\dfrac{1}{2}\\right)^2 \\geqslant 0$. Donc $V(F_n) \\leqslant \\dfrac{1}{4n}$.\nb) Bienaymé-Tchebychev : $P(|F_n - p| \\geqslant 0{,}03) \\leqslant \\dfrac{V(F_n)}{0{,}0009}$ $\\leqslant \\dfrac{1}{0{,}0036n}$.\nEt $\\dfrac{1}{0{,}0036} = \\dfrac{10\\,000}{36} = \\dfrac{2\\,500}{9}$.\nc) On veut $\\dfrac{2\\,500}{9n} \\leqslant 0{,}05$, soit $n \\geqslant \\dfrac{2\\,500}{0{,}45} \\approx 5\\,555{,}6$.\nIl suffit d'interroger $5\\,556$ personnes.\nd) $\\dfrac{2\\,500}{9\\,000} \\approx 0{,}28$ : l'inégalité ne garantit qu'une probabilité d'au moins $72$ % d'être à moins de $3$ points.\nC'est une garantie PRUDENTE : le calcul exact avec la loi binomiale donne environ $94$ % pour $p = 0{,}5$.\n⚠️ $5\\,556$ est une taille qui SUFFIT, pas la plus petite possible : l'inégalité, valable pour toutes les lois, paie sa généralité.\n⭐ Sur le dessin (abscisse : $n$ en milliers ; ordonnée : majorant en %) : la courbe passe sous la droite $y = 5$ au point marqué, en $n \\approx 5\\,556$.",
          schema: repere([-1, 9, -1, 12], [{ pts: echantillon((x) => 250 / (9 * x), 2.35, 9, -1, 12) }], [{ x: 5.56, y: 5, label: "" }], 5, true),
          micros: ["concentration_defi", "concentration_fluctuation", "concentration_inegalite_bienayme"],
        },
        {
          titre: "La machine à café",
          enonce:
            "Une machine à café remplit des gobelets. Le volume $X$ d'un gobelet, en mL, a pour espérance $150$ et pour écart type $4$ ; les remplissages sont indépendants. Un contrôleur prélève $25$ gobelets et calcule leur volume moyen $M$.\na) Calculer $E(M)$ et $\\sigma(M)$.\nb) Majorer $P(|X - 150| \\geqslant 10)$ pour UN gobelet.\nc) Majorer $P(|M - 150| \\geqslant 2)$.\nd) Comparer les deux résultats : que gagne-t-on à faire la moyenne ?\ne) Combien de gobelets faut-il prélever pour que $P(|M_n - 150| \\geqslant 1) \\leqslant 0{,}04$ ?",
          correction:
            "a) $E(M) = 150$ mL et $V(M) = \\dfrac{16}{25} = 0{,}64$, donc $\\sigma(M) = 0{,}8$ mL.\nb) Bienaymé-Tchebychev : $P(|X - 150| \\geqslant 10) \\leqslant \\dfrac{16}{100} = 0{,}16$.\nc) Concentration : $P(|M - 150| \\geqslant 2) \\leqslant \\dfrac{16}{25 \\times 4} = 0{,}16$.\nd) Même majorant, mais pour un écart $5$ fois plus petit ($2$ mL au lieu de $10$) : la moyenne de $25$ gobelets est $5$ fois plus précise qu'un gobelet seul, car $\\sqrt{25} = 5$.\ne) $\\dfrac{16}{n \\times 1^2} \\leqslant 0{,}04$ donne $n \\geqslant 400$.\n⚠️ En b), on travaille sur UN gobelet : la taille de l'échantillon n'intervient pas. En c), elle divise la variance.\n⭐ Sur la droite : un gobelet tombe entre $140$ et $160$ mL, la moyenne entre $148$ et $152$ mL, chacun avec une probabilité d'au moins $84$ %.",
          schema: intervalles(135, 165, [{ de: 140, a: 160, label: "X" }, { de: 148, a: 152, label: "M" }], 5, [{ value: 150, label: "E" }]),
          micros: ["concentration_defi", "concentration_echantillon_moyenne", "concentration_inegalite_bienayme", "concentration_inegalite_concentration"],
        },
        {
          titre: "Pourquoi l'assurance tient",
          enonce:
            "Une compagnie assure $n$ logements. Le coût annuel $X_i$ d'un logement, en €, a pour espérance $300$ et pour écart type $1\\,500$ ; les coûts sont indépendants. La cotisation est de $330$ € par logement. On note $M_n$ le coût moyen par logement.\na) Pourquoi l'écart type est-il si grand devant l'espérance ?\nb) Montrer que si $M_n \\geqslant 330$, alors $|M_n - 300| \\geqslant 30$.\nc) En déduire que la probabilité que la compagnie perde de l'argent est au plus $\\dfrac{2\\,500}{n}$.\nd) Calculer ce majorant pour $n = 10\\,000$ et pour $n = 100\\,000$. Combien de logements faut-il pour qu'il soit au plus $0{,}01$ ?\ne) Quel théorème explique que l'assurance « marche » ?",
          correction:
            "a) La plupart des années, un logement ne coûte rien ; rarement, un sinistre coûte très cher. Ces rares gros montants écartent beaucoup les valeurs de la moyenne.\nb) Si $M_n \\geqslant 330$, alors $M_n - 300 \\geqslant 30 > 0$, donc $|M_n - 300| \\geqslant 30$.\nc) La compagnie perd de l'argent quand le coût moyen dépasse la cotisation : $M_n > 330$. D'après b), cet événement est inclus dans $|M_n - 300| \\geqslant 30$.\nInégalité de concentration : $P(|M_n - 300| \\geqslant 30) \\leqslant \\dfrac{1\\,500^2}{900n} = \\dfrac{2\\,500}{n}$.\nd) $n = 10\\,000$ : $0{,}25$. $n = 100\\,000$ : $0{,}025$.\n$\\dfrac{2\\,500}{n} \\leqslant 0{,}01$ donne $n \\geqslant 250\\,000$.\ne) La loi des grands nombres : plus la compagnie a de clients, plus le coût moyen se concentre autour de $300$ €. Ce qui est imprévisible pour UN logement devient presque certain pour des centaines de milliers.\n⚠️ $\\delta = 30$, l'écart entre la cotisation et l'espérance, pas $330$.\n⭐ Le tableau montre le majorant du risque de perte, divisé par $10$ quand les clients sont multipliés par $10$.",
          schema: tableau(["n", "10 000", "100 000", "250 000"], ["majorant", "0,25", "0,025", "0,01"]),
          micros: ["concentration_defi", "concentration_inegalite_concentration", "concentration_loi_grands_nombres"],
        },
        {
          titre: "Calculer π au hasard",
          enonce:
            "On tire un point au hasard dans le carré $[0 ; 1] \\times [0 ; 1]$ : ses coordonnées x et y sont indépendantes, de loi uniforme. On admet que la probabilité qu'il tombe dans le quart de disque $x^2 + y^2 \\leqslant 1$ est égale à son aire, $p = \\dfrac{\\pi}{4}$. On répète $n$ fois, de façon indépendante ; $F_n$ est la fréquence des points tombés dans le quart de disque.\na) Que renvoie estime(n) ? Justifier par la loi des grands nombres que ce nombre approche $\\pi$.\nb) Montrer que $P(|4F_n - \\pi| \\geqslant 0{,}04) \\leqslant \\dfrac{2\\,500}{n}$.\nc) Combien de points faut-il pour que ce majorant soit au plus $0{,}01$ ?\nd) Avec ce nombre de points, à quelle précision connaît-on $\\pi$ ? Commenter.",
          figure: programme(["from random import random", "", "def estime(n):", "    k = 0", "    for i in range(n):", "        x = random()", "        y = random()", "        if x * x + y * y <= 1:", "            k = k + 1", "    return 4 * k / n"]),
          correction:
            "a) Chaque passage tire un point ; k compte ceux du quart de disque. La fonction renvoie $4 \\times \\dfrac{k}{n} = 4F_n$.\nLoi des grands nombres : $F_n$ se concentre autour de $p = \\dfrac{\\pi}{4}$, donc $4F_n$ autour de $\\pi$.\nb) $|4F_n - \\pi| \\geqslant 0{,}04$ équivaut à $\\left|F_n - \\dfrac{\\pi}{4}\\right| \\geqslant 0{,}01$, en divisant par $4$.\n$V(F_n) = \\dfrac{p(1 - p)}{n} \\leqslant \\dfrac{1}{4n}$, et Bienaymé-Tchebychev donne le majorant $\\dfrac{1}{4n \\times 0{,}0001} = \\dfrac{2\\,500}{n}$.\nc) $\\dfrac{2\\,500}{n} \\leqslant 0{,}01$ donne $n \\geqslant 250\\,000$.\nd) Avec $250\\,000$ points, estime renvoie une valeur à moins de $0{,}04$ de $\\pi$ avec une probabilité d'au moins $99$ %.\nC'est lent : pour une décimale de plus ($\\delta$ divisé par $10$), il faut $100$ fois plus de points.\n⚠️ En b), on divise l'écart par $4$ : $0{,}04$ devient $0{,}01$, pas $0{,}16$.\n⭐ Sur le dessin : le quart de disque occupe $\\dfrac{\\pi}{4} \\approx 78{,}5$ % du carré ; c'est, à la longue, la part des points qui y tombent.",
          schema: ecranSeulement(repere([-0.5, 1.5, -0.5, 1.5], [{ pts: echantillon((x) => Math.sqrt(1 - x * x), 0, 1) }, { pts: [[0, 1], [1, 1], [1, 0]], couleur: GRIS }])),
          micros: ["concentration_defi", "concentration_loi_grands_nombres", "concentration_fluctuation"],
        },
      ],
    },
  ],
};
