// ─── Fiche d'exercices : vocabulaire ensembliste et logique (seconde) ────────
//
// Huitième feuille du lot (24/09/2026), sans fiche de cours. Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/logique-ensembles.bank.ts`
// (notionId logique_ensembles). Le rappel de chaque niveau porte le cours :
// appartenance, inclusion, réunion, intersection, complémentaire, « et » /
// « ou », négation, contre-exemple, implication, réciproque, équivalence.
//
// ⭐ LE FIL : la logique des maths est celle de la vie, rendue PRÉCISE. « Ou »
// y est inclusif (l'un, l'autre, ou les deux) ; la négation de « tous » est
// « il en existe un qui ne… pas » ; un seul contre-exemple suffit à tuer une
// affirmation générale, et mille exemples ne la prouvent pas (exercice 19).
// ⛔ LES PIÈGES : la réciproque n'a pas la même valeur de vérité (8, 16, 17) ;
// nier « et » donne « ou » (6, 11) ; confondre ∈ et ⊂ (1, 2).
// ⭐ LES SCHÉMAS : le coach n'a pas de diagramme de Venn — `venn()` le dessine
// (figures.tsx) ; `intervalles()` empile une droite graduée par intervalle,
// mêmes graduations ; tableaux et courbes pour les contre-exemples. « Les élèves adorent
// les schémas, à utiliser lorsque ça aide » (Frédéric, 24/09).
//
// ⭐ LE MONDE : le feu rouge et le code de la route, les conditions d'une aide
// aux jeunes, la formule d'Euler n² + n + 41 (première à ne pas être première
// pour n = 40 : 1 681 = 41²), la température d'un aquarium pour deux espèces.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-logique.mjs`.
//
// Micro-compétences : logique_appartenance_inclusion (1, 2, 12, 20),
// logique_union_intersection (3, 4, 10, 12, 20), logique_connecteurs (5, 11, 15,
// 17, 18), logique_negation_contre_exemple (6, 7, 11, 13, 17, 19),
// logique_implication_reciproque (8, 9, 14, 16, 17). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, intervalles, repere, tableauProba, trace, vecteurs, venn } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb", VERT = "#16a34a";

export const exercicesLogiqueSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "logique-ensembles",
  titre: "Ensembles et logique",
  accroche:
    "Vingt exercices, du geste seul au problème : appartenance et inclusion, réunion, intersection et complémentaire, « et » et « ou », négation, contre-exemple, implication, réciproque et équivalence. Le feu rouge et le code de la route, les conditions d'une aide aux jeunes, une formule qui donne quarante nombres premiers de suite… puis se trompe, un aquarium pour deux espèces de poissons. Des schémas quand ils aident : diagrammes de Venn, intervalles, tableaux. Un rappel de cours avant chaque niveau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : appartenir, être inclus, réunir, croiser, nier.",
      rappel: [
        "$x \\in A$ : l'ÉLÉMENT $x$ appartient à l'ensemble $A$. $A \\subset B$ : l'ENSEMBLE $A$ est inclus dans $B$ (tout élément de $A$ est dans $B$).",
        "$A \\cap B$ (« A inter B ») : les éléments dans $A$ ET dans $B$. $A \\cup B$ (« A union B ») : les éléments dans $A$ OU dans $B$ (ou les deux).",
        "Le complémentaire $\\overline{A}$ : les éléments de l'univers qui ne sont PAS dans $A$.",
        "Pour montrer qu'une affirmation « pour tout… » est fausse, UN contre-exemple suffit.",
      ],
      exercices: [
        {
          enonce: "Compléter avec $\\in$ ou $\\notin$ :\na) $3 \\,\\ldots\\, \\mathbb{N}$  b) $-2 \\,\\ldots\\, \\mathbb{N}$  c) $0{,}5 \\,\\ldots\\, \\mathbb{Q}$  d) $\\sqrt{2} \\,\\ldots\\, \\mathbb{Q}$  e) $\\pi \\,\\ldots\\, \\mathbb{R}$\nf) Compléter avec $\\subset$ : $\\mathbb{N} \\,\\ldots\\, \\mathbb{Z} \\,\\ldots\\, \\mathbb{D} \\,\\ldots\\, \\mathbb{Q} \\,\\ldots\\, \\mathbb{R}$.",
          correction:
            "a) $3 \\in \\mathbb{N}$, un entier naturel.\nb) $-2 \\notin \\mathbb{N}$ : il est négatif. Mais $-2 \\in \\mathbb{Z}$.\nc) $0{,}5 = \\dfrac{1}{2} \\in \\mathbb{Q}$.\nd) $\\sqrt{2} \\notin \\mathbb{Q}$ : il est irrationnel.\ne) $\\pi \\in \\mathbb{R}$ (mais $\\pi \\notin \\mathbb{Q}$).\nf) $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ : chaque ensemble est contenu dans le suivant.\n⛔ Le piège : écrire $3 \\subset \\mathbb{N}$. $\\subset$ relie deux ENSEMBLES ; entre un élément et un ensemble, c'est $\\in$. (On écrirait $\\{3\\} \\subset \\mathbb{N}$.)",
          schema: tableauProba(["Nombre", "ℕ", "ℤ", "ℚ", "ℝ"], [["3", "oui", "oui", "oui", "oui"], ["−2", "non", "oui", "oui", "oui"], ["0,5", "non", "non", "oui", "oui"], ["√2", "non", "non", "non", "oui"], ["π", "non", "non", "non", "oui"]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 4]]),
          micros: ["logique_appartenance_inclusion"],
        },
        {
          enonce: "Soit $A = \\{2\\,;\\,4\\,;\\,6\\,;\\,8\\}$ et $B$ l'ensemble des nombres pairs compris entre $1$ et $10$.\na) Écrire $B$ en extension (en listant ses éléments).\nb) A-t-on $A \\subset B$ ? $B \\subset A$ ?",
          correction:
            "a) $B = \\{2\\,;\\,4\\,;\\,6\\,;\\,8\\,;\\,10\\}$.\nb) Chaque élément de $A$ est dans $B$ : $A \\subset B$.\nMais $10 \\in B$ et $10 \\notin A$ : $B$ n'est PAS inclus dans $A$.\n⭐ Pour prouver $A \\subset B$, il faut vérifier TOUS les éléments de $A$ ; pour prouver que $B \\not\\subset A$, UN élément suffit.",
          schema: venn({ aSeul: [], commun: ["2", "4", "6", "8"], bSeul: ["10"] }),
          micros: ["logique_appartenance_inclusion"],
        },
        {
          enonce: "Soit $I = [-2\\,;\\,5]$ et $J = \\,]1\\,;\\,7]$. Déterminer $I \\cap J$ et $I \\cup J$.",
          correction:
            "On dessine les deux intervalles l'un sous l'autre, avec les mêmes graduations : l'intersection se lit à la verticale.\n$I \\cap J$ : les réels dans les DEUX, là où ils se chevauchent. $I \\cap J = \\,]1\\,;\\,5]$ ($1$ est exclu, car exclu de $J$ ; $5$ est inclus, car inclus dans les deux).\n$I \\cup J$ : les réels dans l'un OU l'autre. $I \\cup J = [-2\\,;\\,7]$.\n⛔ Le piège : écrire $I \\cap J = [1\\,;\\,5]$. Pour être dans l'intersection, une borne doit être dans les DEUX intervalles.",
          schema: intervalles(-3, 8, [{ de: -2, a: 5, deInclus: true, aInclus: true, label: "I", color: BLEU }, { de: 1, a: 7, deInclus: false, aInclus: true, label: "J", color: ORANGE }, { de: 1, a: 5, deInclus: false, aInclus: true, label: "I ∩ J", color: VERT }]),
          micros: ["logique_union_intersection"],
        },
        {
          enonce: "$A$ est l'ensemble des diviseurs de $12$, et $B$ celui des diviseurs de $18$.\na) Écrire $A$ et $B$ en extension.\nb) Écrire $A \\cap B$ et $A \\cup B$.\nc) Que représente $A \\cap B$ ?",
          correction:
            "a) $A = \\{1\\,;\\,2\\,;\\,3\\,;\\,4\\,;\\,6\\,;\\,12\\}$ et $B = \\{1\\,;\\,2\\,;\\,3\\,;\\,6\\,;\\,9\\,;\\,18\\}$.\nb) $A \\cap B = \\{1\\,;\\,2\\,;\\,3\\,;\\,6\\}$ et $A \\cup B = \\{1\\,;\\,2\\,;\\,3\\,;\\,4\\,;\\,6\\,;\\,9\\,;\\,12\\,;\\,18\\}$.\nc) Les diviseurs COMMUNS de $12$ et $18$. Le plus grand, $6$, est leur PGCD.\n⛔ Le piège au b) : écrire deux fois $1$, $2$, $3$ et $6$ dans la réunion. Un ensemble ne répète pas ses éléments.",
          schema: venn({ aSeul: ["4", "12"], commun: ["1", "2", "3", "6"], bSeul: ["9", "18"] }, {}, "commun"),
          micros: ["logique_union_intersection"],
        },
        {
          enonce: "Écrire sous forme d'intervalle, ou de réunion d'intervalles, l'ensemble des réels $x$ tels que :\na) « $x > 2$ et $x < 5$ »\nb) « $x < -1$ ou $x > 3$ »",
          correction:
            "a) « Et » : il faut les DEUX conditions à la fois. $x$ est entre $2$ et $5$, bornes exclues : $]2\\,;\\,5[$. C'est l'intersection de $]2\\,;\\,+\\infty[$ et de $]-\\infty\\,;\\,5[$.\nb) « Ou » : UNE des deux conditions suffit. $]-\\infty\\,;\\,-1[\\, \\cup \\,]3\\,;\\,+\\infty[$. C'est une réunion, en deux morceaux.\n⛔ Le piège au b) : écrire $]3\\,;\\,-1[$, qui ne veut rien dire. Un « ou » entre deux zones séparées donne DEUX intervalles.",
          schema: intervalles(-3, 7, [{ de: 2, a: 5, deInclus: false, aInclus: false, label: "a)", color: VERT }, { a: -1, aInclus: false, label: "b)", color: ORANGE }, { de: 3, deInclus: false, label: "b)", color: ORANGE }]),
          micros: ["logique_connecteurs"],
        },
        {
          enonce: "Écrire la négation de chaque phrase :\na) « Il pleut et il fait froid. »\nb) « Tous les élèves de la classe ont réussi. »\nc) « $x \\geqslant 3$ »",
          correction:
            "a) « Il ne pleut pas OU il ne fait pas froid. » La négation d'un « et » est un « ou » : il suffit que l'une des deux conditions manque.\nb) « Au moins un élève de la classe n'a pas réussi. » La négation de « tous » n'est pas « aucun » : un seul échec suffit.\nc) « $x < 3$ » (et non $x \\leqslant 3$ : le $3$ lui-même vérifie $x \\geqslant 3$).\n⛔ Le piège au b) : « Aucun élève n'a réussi ». C'est trop fort : il suffit d'UN élève qui échoue pour que « tous ont réussi » soit faux.",
          schema: intervalles(-1, 7, [{ de: 3, deInclus: true, label: "x ≥ 3", color: BLEU }, { a: 3, aInclus: false, label: "sa négation : x < 3", color: ORANGE }]),
          micros: ["logique_negation_contre_exemple"],
        },
        {
          enonce: "Un élève affirme : « Pour tout réel $x$, $x^2 \\geqslant x$. » A-t-il raison ?",
          correction:
            "C'est vrai pour beaucoup de nombres : $3^2 = 9 \\geqslant 3$, $(-2)^2 = 4 \\geqslant -2$.\nMais avec $x = 0{,}5$ : $0{,}5^2 = 0{,}25$, et $0{,}25 < 0{,}5$. C'est un CONTRE-EXEMPLE : l'affirmation est fausse.\n⭐ Sur le dessin, la parabole $y = x^2$ passe SOUS la droite $y = x$ entre $0$ et $1$ : tous les nombres de $]0\\,;\\,1[$ sont des contre-exemples.\n⛔ Le piège : conclure « c'est vrai » après trois exemples. Des exemples ne prouvent jamais un « pour tout ».",
          schema: repere([-1, 3, -1, 4], [{ q: [1, 0, 0] }, { q: [0, 1, 0], couleur: ORANGE }], [{ x: 0.5, y: 0.25 }, { x: 0.5, y: 0.5 }]),
          micros: ["logique_negation_contre_exemple"],
        },
        {
          enonce: "a) L'implication « si $n$ est un multiple de $4$, alors $n$ est pair » est-elle vraie ?\nb) Énoncer sa réciproque. Est-elle vraie ?",
          correction:
            "a) Si $n = 4k$, alors $n = 2 \\times (2k)$ : $n$ est pair. L'implication est VRAIE.\nb) La réciproque échange les deux parties : « si $n$ est pair, alors $n$ est un multiple de $4$ ».\nElle est FAUSSE : $6$ est pair, mais n'est pas un multiple de $4$. C'est un contre-exemple.\n⭐ Une implication vraie peut avoir une réciproque fausse : il faut toujours les vérifier séparément.",
          schema: trace(["n", "pair ?", "multiple de 4 ?"], [[2, "oui", "non"], [4, "oui", "oui"], [6, "oui", "non"], [8, "oui", "oui"], [10, "oui", "non"], [12, "oui", "oui"]]),
          micros: ["logique_implication_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : traduire, décider vrai ou faux, justifier.",
      rappel: [
        "« $P \\Rightarrow Q$ » : si $P$ est vraie, alors $Q$ l'est. Sa RÉCIPROQUE est « $Q \\Rightarrow P$ ». Si les deux sont vraies : ÉQUIVALENCE, « $P \\Leftrightarrow Q$ ».",
        "Nier « pour tout $x$, … » donne « il existe un $x$ tel que non … ». Nier « il existe » donne « pour tout … non ».",
        "Nier « $P$ et $Q$ » donne « non $P$ ou non $Q$ » ; nier « $P$ ou $Q$ » donne « non $P$ et non $Q$ ».",
      ],
      exercices: [
        {
          enonce: "Vrai ou faux ? Justifier.\na) « $x = 2 \\Rightarrow x^2 = 4$ »\nb) « $x^2 = 4 \\Rightarrow x = 2$ »\nc) Écrire une équivalence correcte qui commence par « $x^2 = 4 \\Leftrightarrow$ ».",
          correction:
            "a) VRAI : si $x = 2$, alors $x^2 = 4$.\nb) FAUX : $x = -2$ vérifie $x^2 = 4$ mais pas $x = 2$. C'est un contre-exemple.\nc) $x^2 = 4 \\Leftrightarrow x = 2$ ou $x = -2$.\n⭐ Sur le dessin : la droite horizontale $y = 4$ coupe la parabole en DEUX points, d'abscisses $-2$ et $2$.\n⛔ Le piège : oublier la solution négative. « Prendre la racine » des deux côtés ne donne que $2$.",
          schema: repere([-3, 3, -1, 5], [{ q: [1, 0, 0] }], [{ x: -2, y: 4 }, { x: 2, y: 4 }], 4),
          micros: ["logique_implication_reciproque"],
        },
        {
          enonce: "L'univers est $\\mathbb{R}$. Soit $A = \\,]-\\infty\\,;\\,2]$ et $B = [0\\,;\\,5]$.\na) Déterminer le complémentaire $\\overline{A}$.\nb) Déterminer $A \\cap B$ et $\\overline{A} \\cap B$.",
          correction:
            "a) Les réels qui ne sont PAS inférieurs ou égaux à $2$ : $\\overline{A} = \\,]2\\,;\\,+\\infty[$. Le $2$ appartient à $A$, donc pas à son complémentaire.\nb) $A \\cap B = [0\\,;\\,2]$ et $\\overline{A} \\cap B = \\,]2\\,;\\,5]$.\n⭐ Les deux morceaux se recollent : $[0\\,;\\,2] \\cup \\,]2\\,;\\,5] = [0\\,;\\,5] = B$, sans chevauchement.\n⛔ Le piège au a) : écrire $[2\\,;\\,+\\infty[$. Un réel ne peut pas être à la fois dans $A$ et dans $\\overline{A}$.",
          schema: intervalles(-2, 7, [{ a: 2, aInclus: true, label: "A", color: BLEU }, { de: 2, deInclus: false, label: "complémentaire de A", color: ORANGE }, { de: 0, a: 5, deInclus: true, aInclus: true, label: "B", color: VERT }]),
          micros: ["logique_union_intersection"],
        },
        {
          enonce: "a) Écrire « $x \\in [1\\,;\\,4]$ » à l'aide de deux inégalités et d'un connecteur.\nb) En déduire la négation de « $x \\in [1\\,;\\,4]$ », puis l'ensemble des réels qui ne sont pas dans $[1\\,;\\,4]$.",
          correction:
            "a) « $x \\geqslant 1$ ET $x \\leqslant 4$ ».\nb) La négation d'un « et » est un « ou » : « $x < 1$ OU $x > 4$ ».\nL'ensemble correspondant est $]-\\infty\\,;\\,1[\\, \\cup \\,]4\\,;\\,+\\infty[$.\n⛔ Le piège : « $x < 1$ ET $x > 4$ ». Aucun réel n'est à la fois plus petit que $1$ et plus grand que $4$ : on obtiendrait l'ensemble vide.",
          schema: intervalles(-1, 6, [{ de: 1, a: 4, deInclus: true, aInclus: true, label: "[1 ; 4]", color: BLEU }, { a: 1, aInclus: false, label: "négation", color: ORANGE }, { de: 4, deInclus: false, label: "négation", color: ORANGE }]),
          micros: ["logique_connecteurs", "logique_negation_contre_exemple"],
        },
        {
          enonce: "L'univers est $E = \\{1\\,;\\,2\\,;\\,\\dots\\,;\\,20\\}$. $A$ est l'ensemble des multiples de $3$ de $E$, et $B$ celui des multiples de $5$.\na) Écrire $A$, $B$ et $A \\cap B$.\nb) Combien $A \\cup B$ a-t-il d'éléments ? Et son complémentaire dans $E$ ?",
          correction:
            "a) $A = \\{3\\,;\\,6\\,;\\,9\\,;\\,12\\,;\\,15\\,;\\,18\\}$, $B = \\{5\\,;\\,10\\,;\\,15\\,;\\,20\\}$, et $A \\cap B = \\{15\\}$ : les multiples de $15$.\nb) $6 + 4 - 1 = 9$ éléments : on retire $15$, compté deux fois. Le complémentaire de $A \\cup B$ en a $20 - 9 = 11$.\n⭐ C'est la même règle qu'en probabilités : pour une réunion, on ajoute, puis on retire ce qui a été compté deux fois.",
          schema: venn({ aSeul: ["3 6 9", "12 18"], commun: ["15"], bSeul: ["5 10", "20"], dehors: ["11 autres"] }, { e: "E = {1 ; … ; 20}" }, "union"),
          micros: ["logique_union_intersection", "logique_appartenance_inclusion"],
        },
        {
          enonce: "Vrai ou faux ? Écrire la négation de chaque phrase, puis dire laquelle, de la phrase ou de sa négation, est vraie.\na) « Tous les nombres premiers sont impairs. »\nb) « Il existe un réel $x$ tel que $x^2 < 0$. »",
          correction:
            "a) Négation : « Il existe un nombre premier qui n'est pas impair », c'est-à-dire pair. Elle est VRAIE : $2$ est premier et pair. La phrase de départ est donc fausse, et $2$ en est le contre-exemple.\nb) Négation : « Pour tout réel $x$, $x^2 \\geqslant 0$. » Elle est VRAIE : un carré n'est jamais négatif. La phrase de départ est fausse.\n⭐ Une phrase et sa négation ne sont jamais vraies ensemble, ni fausses ensemble : exactement l'une des deux est vraie.",
          schema: trace(["nombre premier", "pair ?"], [[2, "oui"], [3, "non"], [5, "non"], [7, "non"], [11, "non"]]),
          micros: ["logique_negation_contre_exemple"],
        },
        {
          enonce: "a) Démontrer que : si $n$ est un entier impair, alors $n^2$ est impair.\nb) Énoncer la réciproque. On admet que si $n$ est pair, $n^2$ est pair : en déduire que la réciproque est vraie.\nc) Peut-on écrire une équivalence ?",
          correction:
            "a) $n$ impair s'écrit $n = 2k + 1$, avec $k$ entier. Alors $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ : c'est un nombre impair.\nb) Réciproque : « si $n^2$ est impair, alors $n$ est impair ». Supposons $n^2$ impair : $n$ ne peut pas être pair, car alors $n^2$ serait pair. Donc $n$ est impair : la réciproque est vraie.\nc) Oui : « $n$ est impair $\\Leftrightarrow$ $n^2$ est impair ».\n⭐ Au b), on a raisonné « par l'absurde » : on écarte la seule autre possibilité.\n⛔ Le piège au a) : vérifier sur $1$, $3$, $5$ et s'arrêter là. Des exemples ne démontrent rien ; la lettre $k$ couvre TOUS les impairs à la fois.",
          schema: trace(["n", "n²", "parité de n²"], [[1, 1, "impair"], [2, 4, "pair"], [3, 9, "impair"], [4, 16, "pair"], [5, 25, "impair"], [6, 36, "pair"]]),
          micros: ["logique_implication_reciproque"],
        },
        {
          enonce: "Résoudre, et écrire la solution sous forme d'intervalle ou de réunion d'intervalles :\na) « $2x - 1 > 3$ et $x \\leqslant 6$ »\nb) « $2x - 1 > 3$ ou $x \\leqslant 0$ »",
          correction:
            "On résout d'abord l'inéquation : $2x - 1 > 3$ donne $2x > 4$, donc $x > 2$.\na) « $x > 2$ et $x \\leqslant 6$ » : $]2\\,;\\,6]$, une intersection.\nb) « $x > 2$ ou $x \\leqslant 0$ » : $]-\\infty\\,;\\,0]\\, \\cup \\,]2\\,;\\,+\\infty[$, une réunion en deux morceaux.\n⭐ Même inéquation, même droite graduée ; seul le connecteur change, et avec lui toute la réponse.",
          schema: intervalles(-2, 8, [{ de: 2, a: 6, deInclus: false, aInclus: true, label: "a)", color: VERT }, { a: 0, aInclus: true, label: "b)", color: ORANGE }, { de: 2, deInclus: false, label: "b)", color: ORANGE }]),
          micros: ["logique_connecteurs"],
        },
        {
          enonce: "Vrai ou faux ? Justifier.\na) « Si $ABCD$ est un carré, alors ses diagonales ont la même longueur. »\nb) Sa réciproque.\nc) « $ABCD$ est un parallélogramme $\\Leftrightarrow$ ses diagonales ont le même milieu. »",
          correction:
            "a) VRAI : un carré est un rectangle, et les diagonales d'un rectangle ont la même longueur.\nb) Réciproque : « si les diagonales ont la même longueur, alors $ABCD$ est un carré ». FAUX : un rectangle non carré, comme sur le dessin, a des diagonales de même longueur sans être un carré.\nc) VRAI dans les deux sens : c'est la caractérisation du parallélogramme par ses diagonales.\n⛔ Le piège au b) : croire que « mêmes diagonales » suffit. Pour un carré, il faut AUSSI qu'elles soient perpendiculaires et qu'elles aient le même milieu.",
          schema: vecteurs(
            [-2, 7],
            [
              { de: [1, 1], vers: [6, 1], pointe: false },
              { de: [6, 1], vers: [6, 4], pointe: false },
              { de: [6, 4], vers: [1, 4], pointe: false },
              { de: [1, 4], vers: [1, 1], pointe: false },
              { de: [1, 1], vers: [6, 4], couleur: ORANGE, pointe: false },
              { de: [6, 1], vers: [1, 4], couleur: ORANGE, pointe: false },
            ],
            [{ x: 1, y: 1, label: "A" }, { x: 6, y: 1, label: "B" }, { x: 6, y: 4, label: "C" }, { x: 1, y: 4, label: "D" }],
          ),
          micros: ["logique_implication_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des phrases de la vie : on les traduit en logique, on décide, on explique.",
      rappel: [
        "Dans la vie aussi, une réciproque peut être fausse : « s'il pleut, le sol est mouillé » ne dit pas que le sol mouillé vient de la pluie.",
        "Des parenthèses changent le sens : « A et (B ou C) » n'est pas « (A et B) ou C ».",
        "Mille exemples ne prouvent pas un « pour tout » ; un seul contre-exemple le détruit.",
      ],
      exercices: [
        {
          titre: "Le feu rouge",
          enonce: "Le code de la route dit : « si le feu est rouge, alors je m'arrête ».\na) Énoncer la réciproque. Est-elle vraie ?\nb) Écrire la négation de la règle. Dans quelle situation l'automobiliste est-il en infraction ?\nc) Un policier voit une voiture passer sans s'arrêter. Que peut-il conclure sur le feu, si le conducteur respecte la règle ?",
          correction:
            "a) « Si je m'arrête, alors le feu est rouge. » FAUSSE : on s'arrête aussi à un stop, pour laisser passer un piéton, dans un bouchon.\nb) La règle est fausse seulement quand « le feu est rouge ET je ne m'arrête pas ». C'est la seule case d'infraction du tableau.\nc) Il ne s'est pas arrêté ; s'il respecte la règle, le feu ne pouvait PAS être rouge. « Si je ne m'arrête pas, alors le feu n'est pas rouge » dit la même chose que la règle : c'est sa CONTRAPOSÉE.\n⭐ La réciproque change le sens ; la contraposée le garde.",
          schema: tableauProba(["", "Je m'arrête", "Je passe"], [["Feu rouge", "règle respectée", "INFRACTION"], ["Feu pas rouge", "règle respectée", "règle respectée"]], [[0, 2]]),
          micros: ["logique_implication_reciproque", "logique_negation_contre_exemple", "logique_connecteurs"],
        },
        {
          titre: "Qui a droit à l'aide ?",
          enonce: "Une commune verse une aide aux jeunes : « il faut avoir moins de $25$ ans ET être étudiant ou demandeur d'emploi ». Quatre personnes se présentent : Lou, $19$ ans, étudiante ; Malik, $23$ ans, salarié ; Nina, $31$ ans, demandeuse d'emploi ; Théo, $24$ ans, demandeur d'emploi.\na) Écrire la condition avec des parenthèses, sans ambiguïté.\nb) Qui a droit à l'aide ?\nc) Qu'est-ce qui change si l'on lit « (moins de $25$ ans et étudiant) ou demandeur d'emploi » ?",
          correction:
            "a) « moins de $25$ ans » ET (« étudiant » OU « demandeur d'emploi ») : l'âge est obligatoire, puis l'une des deux situations.\nb) Lou : $19 < 25$ et étudiante, OUI. Malik : moins de $25$ ans mais ni étudiant ni demandeur d'emploi, NON. Nina : $31$ ans, NON, la condition d'âge manque. Théo : $24 < 25$ et demandeur d'emploi, OUI.\nc) Avec l'autre lecture, tout demandeur d'emploi y aurait droit, quel que soit son âge : Nina, à $31$ ans, deviendrait bénéficiaire.\n⭐ Un règlement mal parenthésé n'est pas un détail : ici, il change qui reçoit l'argent.",
          schema: tableauProba(["", "Âge < 25", "Étudiant ou DE", "Aide"], [["Lou", "oui", "oui", "OUI"], ["Malik", "oui", "non", "non"], ["Nina", "non", "oui", "non"], ["Théo", "oui", "oui", "OUI"]], [[0, 3], [3, 3]]),
          micros: ["logique_connecteurs"],
        },
        {
          titre: "La formule qui se trompe à 40",
          enonce: "Le mathématicien Leonhard Euler a remarqué, au XVIIIᵉ siècle, que le nombre $n^2 + n + 41$ semble toujours premier.\na) Calculer ce nombre pour $n = 0$, $1$ et $2$. Sont-ils premiers ?\nb) On admet que c'est vrai pour tous les entiers de $0$ à $39$. Peut-on en conclure que c'est vrai pour tout entier naturel $n$ ?\nc) Calculer ce nombre pour $n = 40$. Conclure.",
          correction:
            "a) $41$, $43$ et $47$ : trois nombres premiers.\nb) Non : quarante exemples ne prouvent pas un « pour tout ». Il faudrait une démonstration.\nc) $40^2 + 40 + 41 = 1\\,600 + 40 + 41 = 1\\,681 = 41^2 = 41 \\times 41$ : ce n'est PAS un nombre premier.\n$n = 40$ est un contre-exemple : l'affirmation « pour tout entier naturel $n$, $n^2 + n + 41$ est premier » est fausse.\n⭐ Astuce pour le voir sans calcul : $40^2 + 40 + 41 = 40 \\times 41 + 41 = 41 \\times 41$.\n⛔ Le piège : s'arrêter aux premiers exemples. C'est exactement l'erreur que l'exercice veut faire toucher du doigt.",
          schema: trace(["n", "n² + n + 41", "premier ?"], [[0, 41, "oui"], [1, 43, "oui"], [2, 47, "oui"], [39, 1601, "oui"], [40, 1681, "NON : 41 × 41"]]),
          micros: ["logique_negation_contre_exemple"],
        },
        {
          titre: "L'aquarium pour deux espèces",
          enonce: "Un poisson néon vit bien entre $22$ °C et $28$ °C ; un poisson disque entre $25$ °C et $30$ °C (bornes comprises). On note $N = [22\\,;\\,28]$ et $D = [25\\,;\\,30]$.\na) À quelles températures peut-on les garder ensemble ? Écrire l'ensemble avec $N$ et $D$.\nb) À quelles températures au moins l'une des deux espèces est-elle bien ?\nc) L'aquarium est réglé à $24$ °C. Pour chaque espèce, dire si $24 \\in N$, puis si $24 \\in D$.",
          correction:
            "a) Il faut convenir aux DEUX : $N \\cap D = [25\\,;\\,28]$.\nb) Il suffit de convenir à l'une : $N \\cup D = [22\\,;\\,30]$.\nc) $24 \\in N$ : le néon va bien. $24 \\notin D$ : c'est trop froid pour le disque. Donc $24 \\notin N \\cap D$, mais $24 \\in N \\cup D$.\n⭐ Pour garder les deux espèces, on règle le chauffage entre $25$ et $28$ °C, par exemple à $26$ °C.",
          schema: intervalles(20, 31, [{ de: 22, a: 28, deInclus: true, aInclus: true, label: "néon", color: BLEU }, { de: 25, a: 30, deInclus: true, aInclus: true, label: "disque", color: ORANGE }, { de: 25, a: 28, deInclus: true, aInclus: true, label: "les deux", color: VERT }]),
          micros: ["logique_union_intersection", "logique_appartenance_inclusion"],
        },
      ],
    },
  ],
};
