// ─── Fiche d'exercices : vocabulaire ensembliste et logique (1re spé) ─────────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/logique-ensembles.bank.ts`
// (notion « logique_ensembles », treize micros). Pas de fiche de cours.
//
// ⭐⭐ LE FIL : LA LOGIQUE DANS LES OBJETS DE LA CLASSE. Le BO veut ces notions
// « dans des contextes où elles se présentent naturellement » : ici, des suites,
// des trinômes, des fonctions, des figures. La seconde (feuille
// `maths-seconde-logique.tsx`, rien n'en est repris) a vu ∈, ⊂, ∩, ∪, « et »,
// « ou », la négation simple et la réciproque. La spé va plus loin : ∀ et ∃ et
// leur ORDRE, la négation d'une phrase quantifiée et d'une implication, la
// contraposée, la condition nécessaire ou suffisante, le statut des lettres,
// le couple, le raisonnement par l'absurde et par disjonction de cas, et le
// ⇒ qui n'est pas un ⇔ quand on élève au carré.
//
// ⭐ LES DESSINS : diagrammes de Venn, intervalles empilés, tableaux de vérité,
// et des COURBES QUI SERVENT DE CONTRE-EXEMPLE (la fonction carré, la fonction
// cube et sa tangente horizontale, la racine qui rate la droite).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-premiere-spe-logique-ensembles.mjs`.
//
// Micro-compétences : log_appartenance (1, 2), log_operations (2, 16),
// log_couple (3, 4), log_connecteurs (4, 16, 18), log_contre_exemple (5, 17, 19),
// log_implication (6, 10, 12, 14, 18, 19), log_reciproque (9, 19),
// log_equivalence (9, 14), log_condition (10, 20), log_statut_lettres (11),
// log_quantificateurs (7, 15, 17, 19, 20), log_negation (8, 15, 17, 18),
// log_raisonnements (12, 13, 18, 20). 13/13.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, intervalles, repere, tableau, tableauProba, trace, vecteurs, venn } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";
const VIOLET = "#7c3aed";

/** Un dessin montré à l'écran, pas imprimé (le PDF reste sous 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05. */
const echantillon = (f: (x: number) => number, de: number, a: number): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = Math.round((de + k * 0.05) * 100) / 100;
    return [x, Math.round(f(x) * 1000) / 1000] as [number, number];
  });

export const exercicesLogiqueEnsemblesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "logique-ensembles",
  titre: "Vocabulaire ensembliste et logique",
  accroche:
    "Vingt exercices, du geste seul au problème de contrôle : appartenance, opérations sur les ensembles, couples, « et » et « ou », quantificateurs et leur négation, implication, réciproque, contraposée, conditions nécessaires et suffisantes, raisonnement par l'absurde et par disjonction de cas. Tout se passe dans les objets de la classe : suites, trinômes, fonctions, figures, et même l'alarme d'une serre. Diagrammes de Venn, intervalles, tableaux de vérité et courbes qui servent de contre-exemple. Un rappel de cours avant chaque niveau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : appartenir, croiser, quantifier, nier, réfuter.",
      rappel: [
        "$x \\in A$ : l'élément $x$ appartient à l'ensemble $A$. $A \\subset B$ : tout élément de $A$ est dans $B$. $A \\cap B$ : dans $A$ ET dans $B$ ; $A \\cup B$ : dans $A$ OU dans $B$ ; $\\overline{A}$ : hors de $A$.",
        "Un COUPLE $(a ; b)$ est ordonné : $(1 ; 2) \\neq (2 ; 1)$. Le produit cartésien $A \\times B$ est l'ensemble des couples $(a ; b)$ avec $a \\in A$ et $b \\in B$.",
        "$\\forall$ se lit « pour tout », $\\exists$ se lit « il existe ». Nier « $\\forall x$, $P(x)$ » donne « $\\exists x$, non $P(x)$ » ; nier « $\\exists x$, $P(x)$ » donne « $\\forall x$, non $P(x)$ ».",
        "« $P \\Rightarrow Q$ » n'est fausse que dans un cas : $P$ vraie et $Q$ fausse. Un seul contre-exemple suffit à réfuter un « pour tout ».",
      ],
      exercices: [
        {
          enonce: "Soit $(u_n)$ la suite définie pour tout $n \\in \\mathbb{N}$ par $u_n = 3n + 1$, et $U = \\{u_n,\\ n \\in \\mathbb{N}\\}$ l'ensemble de ses termes.\na) Compléter avec $\\in$ ou $\\notin$ : $100 \\,\\ldots\\, U$ ; $2026 \\,\\ldots\\, U$ ; $50 \\,\\ldots\\, U$.\nb) A-t-on $U \\subset \\mathbb{N}$ ? L'ensemble des nombres pairs est-il inclus dans $U$ ?",
          correction:
            "a) Un nombre $m$ est dans $U$ s'il existe un entier naturel $n$ tel que $3n + 1 = m$, c'est-à-dire si $m - 1$ est un multiple de $3$.\n$100 - 1 = 99 = 3 \\times 33$ : $100 = u_{33}$, donc $100 \\in U$.\n$2026 - 1 = 2025 = 3 \\times 675$ : $2026 = u_{675}$, donc $2026 \\in U$.\n$50 - 1 = 49$ n'est pas un multiple de $3$ : $50 \\notin U$.\nb) Chaque terme $3n + 1$ est un entier naturel : $U \\subset \\mathbb{N}$.\nMais $2$ est pair et $2 \\notin U$ ($2 - 1 = 1$ n'est pas un multiple de $3$) : les nombres pairs ne sont PAS inclus dans $U$.\n⛔ Le piège : confondre le RANG $n$ et le TERME $u_n$. « $100 \\in U$ » parle de la valeur $100$, atteinte au rang $33$.",
          schema: tableau(["n", "0", "1", "2", "3", "…", "33"], ["uₙ", 1, 4, 7, 10, "…", 100]),
          micros: ["log_appartenance"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 4$. On note $A$ l'ensemble des réels $x$ tels que $f(x) < 0$, et $B = [0\\,;\\,5]$.\na) Écrire $A$ sous forme d'intervalle.\nb) Déterminer $A \\cap B$, $A \\cup B$ et le complémentaire $\\overline{A}$ de $A$ dans $\\mathbb{R}$.\nc) A-t-on $2 \\in A \\cup B$ ? $2 \\in A \\cap B$ ?",
          correction:
            "a) $x^2 - 4 < 0 \\Leftrightarrow x^2 < 4 \\Leftrightarrow -2 < x < 2$. Donc $A = \\,]-2\\,;\\,2[$.\nb) $A \\cap B = [0\\,;\\,2[$ : les réels qui sont dans les deux à la fois.\n$A \\cup B = \\,]-2\\,;\\,5]$ : les réels qui sont dans l'un ou dans l'autre.\n$\\overline{A} = \\,]-\\infty\\,;\\,-2] \\cup [2\\,;\\,+\\infty[$ : là où $f(x) \\geqslant 0$.\nc) $2 \\notin A$ (borne exclue) mais $2 \\in B$ : donc $2 \\in A \\cup B$, et $2 \\notin A \\cap B$.\n⛔ Le piège : écrire $A \\cap B = [0\\,;\\,2]$. Le $2$ n'est pas dans $A$, il ne peut pas être dans l'intersection.",
          schema: intervalles(-3, 6, [
            { de: -2, a: 2, deInclus: false, aInclus: false, label: "A", color: BLEU },
            { de: 0, a: 5, deInclus: true, aInclus: true, label: "B", color: ORANGE },
            { de: 0, a: 2, deInclus: true, aInclus: false, label: "A ∩ B", color: VERT },
            { de: -2, a: 5, deInclus: false, aInclus: true, label: "A ∪ B", color: VIOLET },
          ]),
          micros: ["log_operations", "log_appartenance"],
        },
        {
          enonce: "On lance une pièce (Pile ou Face), puis un dé à quatre faces numérotées de $1$ à $4$. Un résultat s'écrit comme un couple, par exemple $(P ; 3)$.\na) Écrire l'ensemble $\\{P ; F\\} \\times \\{1 ; 2 ; 3 ; 4\\}$. Combien a-t-il d'éléments ?\nb) Le couple $(3 ; P)$ appartient-il à cet ensemble ?\nc) Le couple $(2 ; 1)$ est-il solution du système formé par $2x + y = 5$ et $x - y = 1$ ? Et le couple $(1 ; 2)$ ?",
          correction:
            "a) On associe chaque côté de la pièce à chaque face du dé : $\\{(P ; 1) ; (P ; 2) ; (P ; 3) ; (P ; 4) ;$ $(F ; 1) ; (F ; 2) ; (F ; 3) ; (F ; 4)\\}$.\nIl a $2 \\times 4 = 8$ éléments : ce sont les cases du tableau à double entrée.\nb) Non : dans un couple de $\\{P ; F\\} \\times \\{1 ; 2 ; 3 ; 4\\}$, le PREMIER élément est un côté de la pièce. $(3 ; P)$ est un couple de l'autre produit, $\\{1 ; 2 ; 3 ; 4\\} \\times \\{P ; F\\}$.\nc) Pour $(2 ; 1)$, $x = 2$ et $y = 1$ : $2 \\times 2 + 1 = 5$ et $2 - 1 = 1$. C'est une solution.\nPour $(1 ; 2)$, $x = 1$ et $y = 2$ : $2 \\times 1 + 2 = 4 \\neq 5$. Ce n'en est pas une.\n⛔ Le piège : croire que $(2 ; 1)$ et $(1 ; 2)$, c'est pareil. Dans un couple, l'ORDRE compte ; dans l'ensemble $\\{1 ; 2\\}$, non.",
          schema: tableauProba(["", "1", "2", "3", "4"], [["P", "(P ; 1)", "(P ; 2)", "(P ; 3)", "(P ; 4)"], ["F", "(F ; 1)", "(F ; 2)", "(F ; 3)", "(F ; 4)"]]),
          micros: ["log_couple"],
        },
        {
          enonce: "a) Résoudre $(x - 1)(x + 2) = 0$. Le « ou » de la réponse est-il exclusif ?\nb) Résoudre, pour des réels $x$ et $y$, l'équation $x^2 + y^2 = 0$. Quel connecteur apparaît ?\nc) Résoudre $(x - 3)^2(x + 1) = 0$, puis $(x - 3)^2 + (x + 1)^2 = 0$.",
          correction:
            "a) Un produit est nul si et seulement si l'un de ses facteurs est nul : $x - 1 = 0$ OU $x + 2 = 0$, soit $x = 1$ ou $x = -2$.\nCe « ou » est INCLUSIF en maths : il n'exclut pas que les deux facteurs soient nuls à la fois (ici, c'est impossible, mais la règle ne l'interdit pas).\nb) Un carré est positif ou nul. Une somme de deux carrés n'est nulle que si les deux carrés le sont : $x = 0$ ET $y = 0$. Seul le couple $(0 ; 0)$ convient.\nc) $(x - 3)^2(x + 1) = 0$ : $x = 3$ ou $x = -1$.\n$(x - 3)^2 + (x + 1)^2 = 0$ demanderait $x = 3$ ET $x = -1$ en même temps : c'est impossible, il n'y a AUCUNE solution.\n⭐ Produit nul : un « ou ». Somme de carrés nulle : un « et ».\nSur le dessin, la parabole $y = (x - 1)(x + 2)$ coupe l'axe des abscisses en $-2$ et en $1$.",
          schema: ecranSeulement(repere([-4, 3, -3, 5], [{ q: [1, 1, -2] }], [{ x: -2, y: 0 }, { x: 1, y: 0 }])),
          micros: ["log_connecteurs", "log_couple"],
        },
        {
          enonce: "Un élève affirme : « Pour tous réels $a$ et $b$, si $a < b$, alors $a^2 < b^2$. »\na) Vérifier l'affirmation pour $a = 1$ et $b = 3$.\nb) Montrer qu'elle est fausse.\nc) Sur quel intervalle l'affirmation devient-elle vraie ? Qu'est-ce que cela dit de la fonction carré ?",
          correction:
            "a) $1 < 3$ et $1^2 = 1 < 9 = 3^2$ : l'implication est vraie pour ce couple.\nb) Prenons $a = -3$ et $b = 1$. On a bien $a < b$, mais $a^2 = 9$ et $b^2 = 1$ : $a^2 > b^2$.\nCe couple est un CONTRE-EXEMPLE : l'affirmation « pour tous $a$ et $b$ » est fausse.\nc) Si $a$ et $b$ sont dans $[0\\,;\\,+\\infty[$, l'affirmation est vraie : la fonction carré est croissante sur $[0\\,;\\,+\\infty[$.\nSur $\\mathbb{R}$ tout entier, elle ne l'est pas : elle décroît sur $]-\\infty\\,;\\,0]$. Sur le dessin, $A$ est à gauche de $B$, mais plus haut.\n⛔ Le piège : conclure après l'exemple du a). Un exemple ne prouve pas un « pour tout » ; un seul contre-exemple le réfute.",
          schema: repere([-4, 3, -1, 11], [{ q: [1, 0, 0] }], [{ x: -3, y: 9, label: "A" }, { x: 1, y: 1, label: "B" }], undefined, true),
          micros: ["log_contre_exemple"],
        },
        {
          enonce: "a) Écrire sous la forme « si …, alors … » la propriété : « Un trinôme dont le discriminant est strictement négatif n'a pas de racine réelle. »\nb) L'utiliser pour montrer que l'équation $2x^2 - 3x + 4 = 0$ n'a pas de solution réelle.\nc) Pour $x^2 - 2x + 1$, on trouve $\\Delta = 0$. Que dit la propriété du a) sur ce trinôme ?",
          correction:
            "a) « Si $\\Delta < 0$, alors le trinôme n'a pas de racine réelle. » L'hypothèse est $\\Delta < 0$ ; la conclusion, « pas de racine réelle ».\nb) $\\Delta = (-3)^2 - 4 \\times 2 \\times 4 = 9 - 32 = -23$. L'hypothèse est vraie ($-23 < 0$) : on applique l'implication, et l'équation n'a pas de solution réelle.\nSur le dessin, la parabole reste au-dessus de l'axe des abscisses.\nc) Ici $\\Delta = 0$ : l'hypothèse est FAUSSE. L'implication ne dit alors RIEN sur ce trinôme.\nEn fait, il a une racine : $x^2 - 2x + 1 = (x - 1)^2$ s'annule en $1$.\n⛔ Le piège : lire l'implication à l'envers, ou l'appliquer quand son hypothèse n'est pas vérifiée.",
          schema: ecranSeulement(repere([-2, 3, -1, 8], [{ q: [2, -3, 4] }])),
          micros: ["log_implication"],
        },
        {
          enonce: "Traduire chaque phrase en français, puis dire si elle est vraie ou fausse.\na) $\\forall x \\in \\mathbb{R},\\ x^2 + 1 > 0$\nb) $\\exists x \\in \\mathbb{R},\\ x^2 + 1 = 0$\nc) $\\forall n \\in \\mathbb{N},\\ \\exists m \\in \\mathbb{N},\\ m > n$\nd) $\\exists m \\in \\mathbb{N},\\ \\forall n \\in \\mathbb{N},\\ m > n$",
          correction:
            "a) « Pour tout réel $x$, $x^2 + 1$ est strictement positif. » VRAIE : $x^2 \\geqslant 0$, donc $x^2 + 1 \\geqslant 1 > 0$.\nb) « Il existe un réel $x$ tel que $x^2 + 1 = 0$. » FAUSSE : d'après a), $x^2 + 1$ n'est jamais nul. Sur le dessin, la parabole ne touche jamais l'axe.\nc) « Pour tout entier $n$, il existe un entier $m$ plus grand que $n$. » VRAIE : il suffit de prendre $m = n + 1$. Le $m$ dépend de $n$.\nd) « Il existe un entier $m$ plus grand que TOUS les entiers $n$. » FAUSSE : un tel $m$ devrait être plus grand que lui-même (avec $n = m$, on aurait $m > m$).\n⛔ Le piège : croire que c) et d) disent la même chose. On a échangé l'ordre des quantificateurs : « chacun a un plus grand que lui » n'est pas « un seul est plus grand que tous ».",
          schema: ecranSeulement(repere([-3, 3, -1, 6], [{ q: [1, 0, 1] }])),
          micros: ["log_quantificateurs"],
        },
        {
          enonce: "Écrire la négation de chaque proposition.\na) « $\\forall n \\in \\mathbb{N},\\ u_n \\leqslant 10$ » (tous les termes de la suite sont inférieurs ou égaux à $10$).\nb) « $\\exists x \\in [0\\,;\\,1],\\ f(x) = 0$ » (la fonction $f$ s'annule sur $[0\\,;\\,1]$).\nc) « $\\forall x \\in \\mathbb{R}$, si $x > 2$, alors $x^2 > 4$ ».",
          correction:
            "a) On échange $\\forall$ et $\\exists$, puis on nie la fin : « $\\exists n \\in \\mathbb{N},\\ u_n > 10$ ». Au moins un terme dépasse $10$.\nb) « $\\forall x \\in [0\\,;\\,1],\\ f(x) \\neq 0$ ». La fonction ne s'annule jamais sur $[0\\,;\\,1]$.\nc) Une implication $P \\Rightarrow Q$ n'est fausse que si $P$ est vraie et $Q$ fausse : c'est la seule ligne F du tableau. Sa négation est donc « $P$ et non $Q$ ».\nNégation : « $\\exists x \\in \\mathbb{R}$, $x > 2$ et $x^2 \\leqslant 4$ ».\n⛔ Le piège au a) : écrire « $\\forall n,\\ u_n > 10$ ». Pour que « tous sont inférieurs ou égaux à $10$ » soit faux, UN seul terme au-dessus suffit.\n⛔ Le piège au c) : nier une implication par une autre implication. La négation d'un « si… alors… » n'est jamais un « si… alors… ».",
          schema: tableauProba(["P", "Q", "P ⇒ Q"], [["V", "V", "V"], ["V", "F", "F"], ["F", "V", "V"], ["F", "F", "V"]], [[1, 2]]),
          micros: ["log_negation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : formuler, décider vrai ou faux, démontrer.",
      rappel: [
        "La RÉCIPROQUE de $P \\Rightarrow Q$ est $Q \\Rightarrow P$ ; elle peut être fausse. Si les deux sont vraies : $P \\Leftrightarrow Q$, « $P$ si et seulement si $Q$ ».",
        "Si $P \\Rightarrow Q$ est vraie : $P$ est une condition SUFFISANTE pour $Q$, et $Q$ une condition NÉCESSAIRE pour $P$.",
        "La CONTRAPOSÉE de $P \\Rightarrow Q$ est « non $Q \\Rightarrow$ non $P$ » : elle est vraie exactement quand l'implication l'est.",
        "Par l'ABSURDE : on suppose le contraire de ce qu'on veut montrer, et l'on aboutit à une contradiction.",
      ],
      exercices: [
        {
          enonce: "a) Énoncer le théorème de Pythagore sous la forme d'une implication, puis sa réciproque. Sont-elles vraies ? Écrire une équivalence.\nb) « Si $ABCD$ est un losange, alors ses diagonales sont perpendiculaires. » Énoncer la réciproque. Est-elle vraie ?",
          correction:
            "a) Implication : « Si le triangle $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$. » VRAIE : c'est le théorème de Pythagore.\nRéciproque : « Si $BC^2 = AB^2 + AC^2$, alors $ABC$ est rectangle en $A$. » VRAIE aussi : c'est la réciproque du théorème de Pythagore.\nÉquivalence : « $ABC$ est rectangle en $A \\Leftrightarrow BC^2 = AB^2 + AC^2$ ».\nb) Réciproque : « Si les diagonales de $ABCD$ sont perpendiculaires, alors $ABCD$ est un losange. » FAUSSE.\nContre-exemple : le cerf-volant du dessin. Ses diagonales $[AC]$ et $[BD]$ sont perpendiculaires, mais ses côtés n'ont pas tous la même longueur : $AB = \\sqrt{13}$ et $BC = \\sqrt{8}$.\n⭐ Ici, pas d'équivalence possible. Un losange, c'est un parallélogramme à diagonales perpendiculaires : il manque « les diagonales ont le même milieu ».",
          schema: vecteurs(
            [-1, 7],
            [
              { de: [3, 6], vers: [5, 3], pointe: false },
              { de: [5, 3], vers: [3, 1], pointe: false },
              { de: [3, 1], vers: [1, 3], pointe: false },
              { de: [1, 3], vers: [3, 6], pointe: false },
              { de: [3, 6], vers: [3, 1], couleur: ORANGE, pointe: false },
              { de: [1, 3], vers: [5, 3], couleur: ORANGE, pointe: false },
            ],
            [
              { x: 3, y: 6, label: "A" },
              { x: 5, y: 3, label: "B" },
              { x: 3, y: 1, label: "C" },
              { x: 1, y: 3, label: "D" },
            ],
          ),
          micros: ["log_reciproque", "log_equivalence"],
        },
        {
          enonce: "Compléter chaque phrase par « il faut », « il suffit » ou « il faut et il suffit ».\na) Pour que $x > 2$, … que $x > 5$.\nb) Pour que $x^2 > 4$, … que $x > 2$.\nc) Pour qu'une suite arithmétique de raison $r$ soit strictement croissante, … que $r > 0$.\nd) Pour que le trinôme $ax^2 + bx + c$ ait deux racines distinctes, … que $\\Delta \\geqslant 0$.",
          correction:
            "On cherche dans quel sens l'implication est vraie. Si $P \\Rightarrow Q$ : « pour que $Q$, il SUFFIT que $P$ » et « pour que $P$, il FAUT que $Q$ ».\na) $x > 5 \\Rightarrow x > 2$ est vraie ; la réciproque est fausse ($x = 3$). Pour que $x > 2$, il SUFFIT que $x > 5$.\nb) $x > 2 \\Rightarrow x^2 > 4$ est vraie ; la réciproque est fausse ($x = -3$ donne $x^2 = 9 > 4$). Il SUFFIT que $x > 2$.\nc) $u_{n+1} - u_n = r$ : la suite est strictement croissante si et seulement si $r > 0$. Il FAUT ET IL SUFFIT que $r > 0$.\nd) Deux racines distinctes $\\Rightarrow \\Delta > 0 \\Rightarrow \\Delta \\geqslant 0$ : la condition est nécessaire. Mais $\\Delta = 0$ ne donne qu'une racine : elle n'est pas suffisante. Il FAUT que $\\Delta \\geqslant 0$.\n⭐ Sur le dessin : $]5\\,;\\,+\\infty[$ est INCLUS dans $]2\\,;\\,+\\infty[$. Une inclusion d'ensembles, c'est une implication.",
          schema: ecranSeulement(intervalles(0, 9, [
            { de: 5, deInclus: false, label: "x > 5", color: BLEU },
            { de: 2, deInclus: false, label: "x > 2", color: ORANGE },
          ])),
          micros: ["log_condition", "log_implication"],
        },
        {
          enonce: "a) Montrer que l'égalité $(x + 1)^2 - (x - 1)^2 = 4x$ est vraie pour tout réel $x$. Est-ce une équation ou une identité ?\nb) Résoudre $x^2 - 5x + 6 = 0$. Pourquoi est-ce une équation ?\nc) Dans $x^2 + mx + 1 = 0$, d'inconnue $x$, quel est le rôle de $m$ ? Pour quelles valeurs de $m$ l'équation a-t-elle une seule solution ?",
          correction:
            "a) $(x + 1)^2 - (x - 1)^2 = (x^2 + 2x + 1) - (x^2 - 2x + 1) = 4x$, quel que soit $x$.\nC'est une IDENTITÉ : elle est vraie pour TOUTES les valeurs de $x$. Ici, $x$ est une VARIABLE.\nb) $\\Delta = 25 - 24 = 1$ : $x = \\dfrac{5 - 1}{2} = 2$ ou $x = \\dfrac{5 + 1}{2} = 3$.\nC'est une ÉQUATION : l'égalité n'est vraie que pour certaines valeurs, $2$ et $3$. Ici, $x$ est une INCONNUE, qu'on cherche.\nc) $m$ est un PARAMÈTRE : un nombre fixé, mais qu'on ne connaît pas encore. À chaque valeur de $m$ correspond une équation différente.\nUne seule solution quand $\\Delta = m^2 - 4 = 0$, soit $m = 2$ ou $m = -2$.\nPour $m = 2$ : $x^2 + 2x + 1 = (x + 1)^2$, solution $-1$. Pour $m = -2$ : solution $1$.\n⭐ Sur le dessin, les paraboles pour $m = 2$ (bleue) et $m = -2$ (orange) touchent l'axe en un seul point ; celle pour $m = 0$ (verte) ne le touche pas.",
          schema: repere([-4, 4, -2, 6], [{ q: [1, 2, 1] }, { q: [1, -2, 1], couleur: ORANGE }, { q: [1, 0, 1], couleur: VERT }], [{ x: -1, y: 0 }, { x: 1, y: 0 }]),
          micros: ["log_statut_lettres"],
        },
        {
          enonce: "Soit $n$ un entier naturel. On veut démontrer : « si $n^2$ est un multiple de $3$, alors $n$ est un multiple de $3$ ».\na) Écrire la contraposée de cette implication.\nb) Un entier qui n'est pas multiple de $3$ s'écrit $3k + 1$ ou $3k + 2$, avec $k$ entier. Dans chacun des deux cas, calculer $n^2$ et montrer qu'il n'est pas multiple de $3$.\nc) Conclure.",
          correction:
            "a) Contraposée : « si $n$ n'est pas un multiple de $3$, alors $n^2$ n'est pas un multiple de $3$ ». Elle est vraie exactement quand l'implication de départ l'est.\nb) On raisonne par DISJONCTION DE CAS : les deux cas couvrent tous les entiers qui ne sont pas multiples de $3$.\nSi $n = 3k + 1$ : $n^2 = 9k^2 + 6k + 1 = 3(3k^2 + 2k) + 1$. Le reste de la division par $3$ est $1$.\nSi $n = 3k + 2$ : $n^2 = 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1$. Le reste est encore $1$.\nDans les deux cas, $n^2$ n'est pas un multiple de $3$ : la contraposée est démontrée.\nc) Une implication et sa contraposée sont vraies ensemble : si $n^2$ est un multiple de $3$, alors $n$ est un multiple de $3$.\n⛔ Le piège : démontrer la réciproque (« si $n$ est un multiple de $3$, alors $n^2$ aussi »), vraie mais facile, et croire avoir fini. Ce n'est pas la même phrase.",
          schema: ecranSeulement(trace(["n", "reste de n ÷ 3", "n²", "reste de n² ÷ 3"], [[1, 1, 1, 1], [2, 2, 4, 1], [3, 0, 9, 0], [4, 1, 16, 1], [5, 2, 25, 1], [6, 0, 36, 0]])),
          micros: ["log_raisonnements", "log_implication"],
        },
        {
          enonce: "On veut montrer PAR L'ABSURDE que la fonction carré, $f(x) = x^2$, n'est pas une fonction affine.\na) Que suppose-t-on au départ ?\nb) En utilisant $f(0)$ et $f(1)$, trouver les seules valeurs possibles de $m$ et $p$ si $f(x) = mx + p$ pour tout réel $x$.\nc) Calculer $f(2)$ de deux façons, et conclure.",
          correction:
            "a) On suppose le CONTRAIRE : il existe deux réels $m$ et $p$ tels que, pour tout réel $x$, $x^2 = mx + p$.\nb) Pour $x = 0$ : $0 = m \\times 0 + p$, donc $p = 0$. Pour $x = 1$ : $1 = m + p = m$, donc $m = 1$.\nLa seule fonction affine possible est donc $x \\mapsto x$.\nc) Pour $x = 2$ : d'un côté, $f(2) = 2^2 = 4$ ; de l'autre, $f(2) = 1 \\times 2 + 0 = 2$.\nOn obtient $4 = 2$ : c'est une CONTRADICTION. La supposition du a) est fausse : la fonction carré n'est pas affine.\n⭐ Sur le dessin : la seule droite qui passe par $(0 ; 0)$ et $(1 ; 1)$ est $y = x$, et elle rate le point $(2 ; 4)$ de la parabole.\n⛔ Le piège : s'arrêter au b). Tant qu'on n'a pas trouvé de contradiction, on n'a rien démontré.",
          schema: repere([-2, 3, -1, 6], [{ q: [1, 0, 0] }, { q: [0, 1, 0], couleur: ORANGE }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 2, y: 2 }]),
          micros: ["log_raisonnements"],
        },
        {
          enonce: "On veut résoudre l'équation $\\sqrt{x + 2} = x$, pour $x \\geqslant -2$.\na) Un élève écrit : « $\\sqrt{x + 2} = x \\Leftrightarrow x + 2 = x^2$ ». Résoudre $x + 2 = x^2$.\nb) Tester les deux valeurs trouvées dans l'équation de départ. Que remarque-t-on ?\nc) Quel symbole l'élève aurait-il dû écrire ? Donner l'ensemble des solutions.",
          correction:
            "a) $x^2 - x - 2 = 0$ : $\\Delta = 1 + 8 = 9$, donc $x = \\dfrac{1 - 3}{2} = -1$ ou $x = \\dfrac{1 + 3}{2} = 2$.\nb) Pour $x = 2$ : $\\sqrt{4} = 2$. Ça marche.\nPour $x = -1$ : $\\sqrt{1} = 1$, et $1 \\neq -1$. Ça ne marche PAS : $-1$ est une fausse solution.\nc) Élever au carré ne marche que dans un sens : si $a = b$, alors $a^2 = b^2$ ; mais $a^2 = b^2$ n'entraîne pas $a = b$ (par exemple, $1^2 = (-1)^2$).\nL'élève aurait dû écrire « $\\Rightarrow$ », puis VÉRIFIER chaque candidat : l'ensemble des solutions est $\\{2\\}$.\n⭐ Sur le dessin : la courbe de $x \\mapsto \\sqrt{x + 2}$ ne coupe la droite $y = x$ qu'en $(2 ; 2)$. En $-1$, la courbe est à la hauteur $1$ et la droite à $-1$.\n⛔ Le piège : écrire « $\\Leftrightarrow$ » partout par habitude. Un $\\Leftrightarrow$ faux fait entrer de fausses solutions.",
          schema: repere([-3, 4, -2, 4], [{ pts: echantillon((x) => Math.sqrt(Math.max(0, x + 2)), -2, 4) }, { q: [0, 1, 0], couleur: ORANGE }], [{ x: 2, y: 2 }, { x: -1, y: 1 }, { x: -1, y: -1 }]),
          micros: ["log_equivalence", "log_implication"],
        },
        {
          enonce: "Soit la suite $(u_n)$ définie pour tout $n \\in \\mathbb{N}$ par $u_n = (-1)^n \\times n$.\na) Écrire avec des quantificateurs : « la suite $(u_n)$ est croissante ».\nb) Écrire la négation de cette phrase. La suite est-elle croissante ?\nc) La suite est-elle décroissante ? Une suite qui n'est pas croissante est-elle forcément décroissante ?",
          correction:
            "a) « $\\forall n \\in \\mathbb{N},\\ u_{n+1} \\geqslant u_n$ ».\nb) Négation : « $\\exists n \\in \\mathbb{N},\\ u_{n+1} < u_n$ ».\n$u_0 = 0$, $u_1 = -1$, $u_2 = 2$, $u_3 = -3$, $u_4 = 4$. Pour $n = 0$ : $u_1 = -1 < 0 = u_0$. La négation est vraie : la suite n'est PAS croissante.\nc) « Décroissante » s'écrit « $\\forall n,\\ u_{n+1} \\leqslant u_n$ ». Or $u_2 = 2 > -1 = u_1$ : elle n'est pas décroissante non plus.\nDonc « pas croissante » ne veut PAS dire « décroissante » : cette suite n'est ni l'une ni l'autre.\n⛔ Le piège : nier « croissante » par « décroissante ». La négation d'un « pour tout » est un « il existe » : un seul endroit où la suite descend suffit.",
          schema: repere([-1, 5, -4, 5], [], [{ x: 0, y: 0 }, { x: 1, y: -1 }, { x: 2, y: 2 }, { x: 3, y: -3 }, { x: 4, y: 4 }]),
          micros: ["log_quantificateurs", "log_negation"],
        },
        {
          enonce: "Dans un lycée, on interroge les $120$ élèves de première : $70$ pratiquent un sport en club (ensemble $S$), $45$ jouent d'un instrument (ensemble $M$), et $20$ font les deux.\na) Combien d'élèves sont dans $S \\cap M$ ? dans $S$ mais pas dans $M$ ? dans $M$ mais pas dans $S$ ?\nb) Combien sont dans $S \\cup M$ ? Combien ne font ni l'un ni l'autre ?\nc) Combien font du sport ou de la musique au sens du « ou » EXCLUSIF (l'un des deux, pas les deux) ?",
          correction:
            "a) $S \\cap M$ : les $20$ qui font les deux.\n$S$ sans $M$ : $70 - 20 = 50$. $M$ sans $S$ : $45 - 20 = 25$.\nb) $S \\cup M$ : $50 + 20 + 25 = 95$, ou encore $70 + 45 - 20 = 95$ (on retire les $20$, comptés deux fois).\nNi l'un ni l'autre : $120 - 95 = 25$ élèves. C'est le complémentaire $\\overline{S \\cup M}$.\nc) « Ou » exclusif : $50 + 25 = 75$ élèves. En maths, « ou » est INCLUSIF : le « ou » du b) compte aussi les $20$ qui font les deux.\n⛔ Le piège : $70 + 45 = 115$. Les $20$ élèves du milieu seraient comptés deux fois.",
          schema: venn({ aSeul: ["50"], commun: ["20"], bSeul: ["25"], dehors: ["25 : aucun des deux"] }, { a: "S", b: "M", e: "120" }, "union"),
          micros: ["log_connecteurs", "log_operations"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle : on traduit, on décide, on démontre ou l'on réfute.",
      rappel: [
        "Pour démontrer un « pour tout », il faut un raisonnement valable dans TOUS les cas (avec des lettres, ou cas par cas). Pour le réfuter, un contre-exemple suffit.",
        "Pour démontrer un « il existe », un exemple suffit. Pour le réfuter, il faut montrer que TOUS les cas échouent.",
        "Nier échange « pour tout » et « il existe », « et » et « ou ». Nier « $P \\Rightarrow Q$ » donne « $P$ et non $Q$ ».",
      ],
      exercices: [
        {
          titre: "Une suite sous la loupe des quantificateurs",
          enonce: "Soit la suite définie pour tout $n \\in \\mathbb{N}$ par $u_n = n^2 - 6n + 11$. Ses premiers termes sont dessinés.\nPour chaque proposition, dire si elle est vraie ou fausse, et le démontrer.\na) $\\forall n \\in \\mathbb{N},\\ u_n > 0$\nb) $\\exists n \\in \\mathbb{N},\\ u_n = 3$\nc) « La suite $(u_n)$ est croissante. »\nd) $\\exists N \\in \\mathbb{N},\\ \\forall n \\geqslant N,\\ u_{n+1} > u_n$. Donner le plus petit $N$ possible.\ne) Écrire la négation de la proposition d).",
          figure: repere(
            [-1, 7, -1, 12],
            [{ q: [1, -6, 11], couleur: ORANGE }],
            [
              { x: 0, y: 11 },
              { x: 1, y: 6 },
              { x: 2, y: 3 },
              { x: 3, y: 2 },
              { x: 4, y: 3 },
              { x: 5, y: 6 },
              { x: 6, y: 11 },
            ],
            3,
            true,
          ),
          correction:
            "a) VRAIE. $u_n = (n - 3)^2 + 2$ : un carré plus $2$, donc $u_n \\geqslant 2 > 0$ pour tout $n$.\nb) VRAIE. $u_n = 3 \\Leftrightarrow n^2 - 6n + 8 = 0 \\Leftrightarrow n = 2$ ou $n = 4$. Un seul exemple suffit : $u_2 = 4 - 12 + 11 = 3$.\nc) FAUSSE. Contre-exemple : $u_1 = 6 < 11 = u_0$. La suite commence par descendre.\nd) VRAIE. $u_{n+1} - u_n = (n + 1)^2 - 6(n + 1) + 11 - (n^2 - 6n + 11) = 2n - 5$.\n$2n - 5 > 0 \\Leftrightarrow n > 2{,}5$, soit $n \\geqslant 3$ pour un entier. Le plus petit $N$ est $3$ : à partir du rang $3$, la suite est strictement croissante ($u_3 = 2$, $u_4 = 3$, $u_5 = 6$…).\ne) On échange les quantificateurs et l'on nie la fin : « $\\forall N \\in \\mathbb{N},\\ \\exists n \\geqslant N,\\ u_{n+1} \\leqslant u_n$ ».\n⭐ Pour a) et d), un « pour tout » : il faut un calcul valable pour tous les $n$. Pour b), un « il existe » : un exemple suffit. Pour c), un contre-exemple suffit à tout faire tomber.",
          micros: ["log_quantificateurs", "log_negation", "log_contre_exemple"],
        },
        {
          titre: "L'alarme de la serre",
          enonce: "Dans une serre, un boîtier déclenche une alarme quand « la température dépasse $35$ °C, ou l'humidité est sous $40$ % et la ventilation est coupée ». On note $T$ : « la température dépasse $35$ °C », $H$ : « l'humidité est sous $40$ % » et $V$ : « la ventilation est coupée ».\na) Le fabricant précise que l'alarme obéit à « $T$ ou ($H$ et $V$) ». Dresser le tableau de vérité de cette proposition (V pour vrai, F pour faux).\nb) Dans combien des $8$ situations l'alarme sonne-t-elle ?\nc) Écrire, avec « et » et « ou », la condition pour que l'alarme NE sonne PAS.\nd) Un soir, l'alarme n'a pas sonné. Que peut-on affirmer sur la température ? Quel raisonnement utilise-t-on ?",
          correction:
            "a) On calcule d'abord « $H$ et $V$ », vrai seulement si les deux le sont ; puis « $T$ ou ($H$ et $V$) », vrai dès que l'un des deux morceaux l'est : voir le tableau.\nb) L'alarme sonne dans $5$ situations : les $4$ où $T$ est vraie, plus celle où $T$ est fausse mais $H$ et $V$ vraies.\nc) On nie : non [$T$ ou ($H$ et $V$)] = (non $T$) et non ($H$ et $V$) = (non $T$) et (non $H$ ou non $V$).\nEn français : « la température ne dépasse pas $35$ °C, ET (l'humidité est d'au moins $40$ % OU la ventilation fonctionne) ».\nd) « Si $T$, alors l'alarme sonne » est vrai. Sa CONTRAPOSÉE : « si l'alarme ne sonne pas, alors $T$ est fausse ». Ce soir-là, la température ne dépassait donc pas $35$ °C.\n⛔ Le piège au c) : garder un « ou » en niant. La négation échange « et » et « ou ».",
          schema: tableauProba(
            ["T", "H", "V", "H et V", "alarme"],
            [
              ["V", "V", "V", "V", "V"],
              ["V", "V", "F", "F", "V"],
              ["V", "F", "V", "F", "V"],
              ["V", "F", "F", "F", "V"],
              ["F", "V", "V", "V", "V"],
              ["F", "V", "F", "F", "F"],
              ["F", "F", "V", "F", "F"],
              ["F", "F", "F", "F", "F"],
            ],
            [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
          ),
          micros: ["log_connecteurs", "log_negation", "log_raisonnements", "log_implication"],
        },
        {
          titre: "Vrai ou faux, comme au contrôle",
          enonce: "Pour chaque affirmation, dire si elle est vraie ou fausse, et justifier.\na) Si une suite arithmétique a une raison strictement positive, alors tous ses termes sont positifs.\nb) Si une fonction $f$ dérivable sur $\\mathbb{R}$ admet un maximum ou un minimum local en $a$, alors $f'(a) = 0$. Énoncer la réciproque. Est-elle vraie ?\nc) Pour tout réel $x$, $x^2 - 4x + 5 > 0$.\nd) Il existe un réel $x$ tel que $e^x \\leqslant 0$.",
          correction:
            "a) FAUSSE. Contre-exemple : $u_0 = -5$ et $r = 1$. La raison est positive, mais $u_0 = -5 < 0$ (et $u_4 = -1$ aussi).\nb) La propriété est VRAIE : c'est une propriété du cours. Réciproque : « si $f'(a) = 0$, alors $f$ admet un maximum ou un minimum local en $a$ ».\nLa réciproque est FAUSSE. Contre-exemple : $f(x) = x^3$. $f'(x) = 3x^2$, donc $f'(0) = 0$ ; mais $f$ est croissante sur $\\mathbb{R}$ : ni maximum ni minimum en $0$. Sur le dessin, la tangente en $0$ est horizontale, et pourtant la courbe continue de monter.\nc) VRAIE. $x^2 - 4x + 5 = (x - 2)^2 + 1 \\geqslant 1 > 0$. (Ou : $\\Delta = 16 - 20 = -4 < 0$ et $a = 1 > 0$.)\nd) FAUSSE. Sa négation, « pour tout réel $x$, $e^x > 0$ », est une propriété du cours : l'exponentielle est strictement positive.\n⭐ Pour réfuter a) et la réciproque du b), un contre-exemple. Pour c), une preuve pour tous les $x$. Pour d), un « il existe » se réfute en prouvant le « pour tout » contraire.",
          schema: repere([-3, 3, -4, 4], [{ p: [1, 0, 0, 0] }, { q: [0, 0, 0], couleur: ORANGE }], [{ x: 0, y: 0 }]),
          micros: ["log_contre_exemple", "log_reciproque", "log_quantificateurs", "log_implication"],
        },
        {
          titre: "L'année 2026 et les entiers consécutifs",
          enonce: "a) Montrer, par disjonction de cas, que pour tout entier naturel $n$, le produit $n(n + 1)$ est pair.\nb) En déduire que, pour tout entier naturel $n$, $n^2 + n + 1$ est impair.\nc) Montrer par l'absurde qu'il n'existe aucun entier naturel $n$ tel que $n^2 + n + 1 = 2026$.\nd) Existe-t-il un entier naturel $n$ tel que $n^2 + n + 1 = 2071$ ?",
          correction:
            "a) Deux cas couvrent tous les entiers.\nSi $n$ est pair, $n = 2k$ : $n(n + 1) = 2k(2k + 1)$, un multiple de $2$.\nSi $n$ est impair, $n = 2k + 1$ : $n + 1 = 2k + 2 = 2(k + 1)$, donc $n(n + 1) = 2(2k + 1)(k + 1)$, un multiple de $2$.\nDans tous les cas, $n(n + 1)$ est pair : de deux entiers consécutifs, l'un est pair.\nb) $n^2 + n + 1 = n(n + 1) + 1$ : un nombre pair plus $1$, donc impair.\nc) Supposons qu'il existe un entier naturel $n$ tel que $n^2 + n + 1 = 2026$. D'après b), $n^2 + n + 1$ est impair ; or $2026$ est pair. Un nombre ne peut pas être à la fois pair et impair : c'est une contradiction.\nDonc aucun entier naturel ne convient.\nd) Oui : $2071$ est impair, la parité ne l'interdit plus. On résout $n^2 + n - 2070 = 0$ : $\\Delta = 1 + 8\\,280 = 8\\,281 = 91^2$, donc $n = \\dfrac{-1 + 91}{2} = 45$ (l'autre racine, $-46$, n'est pas un entier naturel).\nVérification : $45^2 + 45 + 1 = 2\\,025 + 46 = 2\\,071$.\n⛔ Le piège au d) : croire qu'être impair suffit. La parité donne une condition NÉCESSAIRE, pas suffisante : $2027$, impair, n'est atteint par aucun $n$.",
          schema: ecranSeulement(trace(["n", "n(n + 1)", "n² + n + 1"], [[0, 0, 1], [1, 2, 3], [2, 6, 7], [3, 12, 13], [4, 20, 21], [5, 30, 31]])),
          micros: ["log_raisonnements", "log_quantificateurs", "log_condition"],
        },
      ],
    },
  ],
};
