// ─── Fiche d'exercices : probabilités sur un ensemble fini (seconde) ─────────
//
// Septième feuille du lot (24/09/2026), sans fiche de cours (Frédéric : « on
// fait toutes les fiches d'exercices d'abord »). Alignée sur la banque
// `lib/tutor-v4/questionBank/seconde/maths/probabilites.bank.ts` (notionId
// probabilites_ensemble_fini). Le rappel de chaque niveau porte le cours :
// univers, événement, loi, équiprobabilité, contraire, réunion et
// intersection, P(A ∪ B) = P(A) + P(B) − P(A ∩ B), arbre et tableau.
// ⛔ PAS de probabilité conditionnelle ici (elle a sa propre feuille) : les
// arbres ne portent que des tirages successifs, lus par le produit des branches.
//
// ⭐ LE FIL : on COMPTE les issues quand elles sont équiprobables ; sinon, c'est
// la LOI qui donne les probabilités. Et « au moins un » se calcule presque
// toujours par le CONTRAIRE.
// ⛔ LES PIÈGES : additionner P(A) + P(B) sans retirer l'intersection
// (exercices 7, 11, 15) ; croire les sommes de deux dés équiprobables (9) ;
// « au moins deux nés le même mois » qui semble improbable et ne l'est pas (18).
// ⭐ UN CANVAS PAR CORRIGÉ : dé, roue, urne, tableau à double entrée, arbre —
// ceux du coach.
//
// ⭐ LE MONDE : un digicode, les mois de naissance d'un groupe d'amis, la
// roulette européenne (37 cases : 18 rouges, 18 noires, le 0 vert), les groupes
// sanguins en France (Établissement français du sang : O 42 %, A 45 %, B 9 %,
// AB 4 % ; rhésus positif 85 %).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-probabilites.mjs`.
//
// Micro-compétences : proba_vocabulaire (1, 15), proba_modele (2, 3, 10, 14,
// 17, 19, 20), proba_calculer (2, 5, 9, 10, 16, 17, 18), proba_evenement_
// contraire (4, 5, 8, 11, 13, 17, 18, 20), proba_reunion_intersection (6, 10,
// 11, 12, 19, 20), proba_formule_union (7, 11, 12, 15, 19), proba_tableau_arbre
// (8, 9, 12, 13, 16, 18, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, billes, de, diagramme, roue, tableauProba } from "@/lib/fiches-exercices/figures";

const R = "#dc2626", B = "#2563eb", V = "#059669", J = "#eab308", N = "#1f2937";

export const exercicesProbabilitesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "probabilites-ensemble-fini",
  titre: "Les probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème : univers et événements, loi de probabilité, équiprobabilité, événement contraire, réunion et intersection, la formule P(A ∪ B), arbres et tableaux. Un digicode, les mois de naissance d'un groupe d'amis, la roulette du casino, les groupes sanguins. Chaque corrigé a son schéma : dé, roue, urne, tableau ou arbre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lister, compter, compléter une loi, passer au contraire.",
      rappel: [
        "L'UNIVERS $\\Omega$ est l'ensemble des issues. Un ÉVÉNEMENT est une partie de l'univers.",
        "Une loi de probabilité donne à chaque issue un nombre entre $0$ et $1$ ; leur somme vaut $1$.",
        "Si les issues sont ÉQUIPROBABLES : $P(A) = \\dfrac{\\text{nombre d'issues de } A}{\\text{nombre total d'issues}}$.",
        "Le contraire : $P(\\overline{A}) = 1 - P(A)$. Et $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
      ],
      exercices: [
        {
          enonce: "On lance un dé à six faces. On note $A$ l'événement « obtenir un nombre pair » et $B$ « obtenir au moins $5$ ».\na) Écrire l'univers $\\Omega$.\nb) Écrire $A$ et $B$ sous forme d'ensembles.\nc) Écrire $A \\cap B$ et $\\overline{A}$.",
          correction:
            "a) $\\Omega = \\{1\\,;\\,2\\,;\\,3\\,;\\,4\\,;\\,5\\,;\\,6\\}$ : six issues.\nb) $A = \\{2\\,;\\,4\\,;\\,6\\}$ et $B = \\{5\\,;\\,6\\}$ (« au moins $5$ », c'est $5$ OU plus).\nc) $A \\cap B$ contient les issues qui sont dans $A$ ET dans $B$ : $A \\cap B = \\{6\\}$. Le contraire de $A$ : $\\overline{A} = \\{1\\,;\\,3\\,;\\,5\\}$, les impairs.\n⛔ Le piège au b) : écrire $B = \\{6\\}$, en lisant « plus que $5$ ». « Au moins $5$ » compte le $5$.",
          schema: de([2, 4, 6]),
          micros: ["proba_vocabulaire"],
        },
        {
          enonce: "Le dé de l'exercice 1 est équilibré. Calculer $P(A)$ et $P(B)$.",
          correction:
            "Équilibré : les six issues ont la même probabilité, $\\dfrac{1}{6}$ chacune. On compte.\n$P(A) = \\dfrac{3}{6} = \\dfrac{1}{2}$ et $P(B) = \\dfrac{2}{6} = \\dfrac{1}{3}$.\n⭐ Compter ne marche que si les issues sont ÉQUIPROBABLES : avec un dé truqué, il faut sa loi (exercice 3).",
          schema: de([5, 6]),
          micros: ["proba_modele", "proba_calculer"],
        },
        {
          enonce: "Un dé est truqué : les faces $1$ à $5$ sortent chacune avec la probabilité $0{,}1$. Quelle est la probabilité de la face $6$ ? Est-ce un dé équitable ?",
          correction:
            "La somme des probabilités de toutes les issues vaut $1$ : $5 \\times 0{,}1 + P(6) = 1$, donc $P(6) = 1 - 0{,}5 = 0{,}5$.\nLe $6$ sort une fois sur deux, les autres faces une fois sur dix : ce dé n'est pas équitable.\n⛔ Le piège : répondre $0{,}1$ « comme les autres ». La loi n'est pas équiprobable, c'est justement la question.",
          schema: roue([{ label: "1", poids: 1, couleur: B }, { label: "2", poids: 1, couleur: V }, { label: "3", poids: 1, couleur: J }, { label: "4", poids: 1, couleur: "#8b5cf6" }, { label: "5", poids: 1, couleur: "#f97316" }, { label: "6", poids: 5, couleur: R }]),
          micros: ["proba_modele"],
        },
        {
          enonce: "La météo annonce une probabilité de pluie de $0{,}35$ pour demain. Quelle est la probabilité qu'il ne pleuve pas ?",
          correction:
            "« Il ne pleut pas » est l'événement contraire de « il pleut » : l'un ou l'autre arrive, jamais les deux.\n$P(\\overline{\\text{pluie}}) = 1 - 0{,}35 = 0{,}65$.\n⭐ Soit $65$ %. Deux événements contraires ont des probabilités qui font toujours $1$.",
          schema: roue([{ label: "pluie 0,35", poids: 35, couleur: B }, { label: "pas de pluie 0,65", poids: 65, couleur: J }]),
          micros: ["proba_evenement_contraire"],
        },
        {
          enonce: "Une urne contient $5$ boules rouges, $3$ bleues et $2$ vertes, indiscernables au toucher. On en tire une au hasard.\na) Calculer la probabilité de tirer une boule rouge.\nb) Calculer la probabilité de ne pas tirer une boule verte.",
          correction:
            "« Au hasard » et « indiscernables » : les $10$ boules ont la même chance d'être tirées.\na) $P(\\text{rouge}) = \\dfrac{5}{10} = 0{,}5$.\nb) $P(\\text{verte}) = \\dfrac{2}{10} = 0{,}2$, donc $P(\\text{pas verte}) = 1 - 0{,}2 = 0{,}8$.\n⭐ On peut aussi compter : $5 + 3 = 8$ boules non vertes, $\\dfrac{8}{10} = 0{,}8$. ✓\n⛔ Le piège : calculer $\\dfrac{1}{3}$ « une couleur sur trois ». Ce sont les BOULES qui sont équiprobables, pas les couleurs.",
          schema: billes([{ couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: B }, { couleur: B }, { couleur: B }, { couleur: V }, { couleur: V }]),
          micros: ["proba_calculer", "proba_evenement_contraire"],
        },
        {
          enonce: "On lance un dé équilibré. $A$ : « obtenir un nombre pair », $C$ : « obtenir au moins $4$ ».\na) Écrire $A \\cap C$ et $A \\cup C$.\nb) Calculer leurs probabilités.",
          correction:
            "$A = \\{2\\,;\\,4\\,;\\,6\\}$ et $C = \\{4\\,;\\,5\\,;\\,6\\}$.\na) $A \\cap C$ (dans les deux) : $\\{4\\,;\\,6\\}$. $A \\cup C$ (dans l'un OU l'autre, ou les deux) : $\\{2\\,;\\,4\\,;\\,5\\,;\\,6\\}$.\nb) $P(A \\cap C) = \\dfrac{2}{6} = \\dfrac{1}{3}$ et $P(A \\cup C) = \\dfrac{4}{6} = \\dfrac{2}{3}$.\n⛔ Le piège au a) : écrire deux fois le $4$ et le $6$ dans $A \\cup C$, et compter $6$ issues. Un ensemble ne contient chaque issue qu'une fois.",
          schema: de([2, 4, 5, 6]),
          micros: ["proba_reunion_intersection"],
        },
        {
          enonce: "On sait que $P(A) = 0{,}5$, $P(B) = 0{,}4$ et $P(A \\cap B) = 0{,}15$. Calculer $P(A \\cup B)$.",
          correction:
            "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0{,}5 + 0{,}4 - 0{,}15 = 0{,}75$.\n⭐ Pourquoi retirer $P(A \\cap B)$ ? En ajoutant $P(A)$ et $P(B)$, les issues qui sont dans les DEUX ont été comptées deux fois.\n⛔ Le piège : répondre $0{,}9$, sans retirer l'intersection.",
          schema: tableauProba(["", "B", "non B", "Total"], [["A", "0,15", "0,35", "0,5"], ["non A", "0,25", "0,25", "0,5"], ["Total", "0,4", "0,6", "1"]], [[0, 1], [0, 2], [1, 1]]),
          micros: ["proba_formule_union"],
        },
        {
          enonce: "On lance deux pièces équilibrées.\na) Dessiner l'arbre des issues.\nb) Quelle est la probabilité d'obtenir deux piles ?\nc) Quelle est la probabilité d'obtenir au moins un pile ?",
          correction:
            "a) Chaque pièce donne P (pile) ou F (face) : quatre chemins, PP, PF, FP et FF, équiprobables.\nb) Un seul chemin sur quatre : $P(\\text{PP}) = \\dfrac{1}{4}$.\nc) Le contraire de « au moins un pile » est « aucun pile », c'est-à-dire FF : $P = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.\n⛔ Le piège au b) : dire $\\dfrac{1}{3}$, en croyant trois cas (deux piles, deux faces, un de chaque). « Un de chaque » arrive de DEUX façons, PF et FP.",
          schema: arbre([{ label: "P", proba: "1/2", enfants: [{ label: "P", proba: "1/2" }, { label: "F", proba: "1/2" }] }, { label: "F", proba: "1/2", enfants: [{ label: "P", proba: "1/2" }, { label: "F", proba: "1/2" }] }]),
          micros: ["proba_tableau_arbre", "proba_evenement_contraire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : organiser les issues, puis calculer.",
      rappel: [
        "Deux épreuves successives : on liste les issues dans un TABLEAU à double entrée ou un ARBRE, puis on compte.",
        "Sur un arbre de tirages successifs, la probabilité d'un chemin est le PRODUIT des probabilités de ses branches.",
        "« Au moins un » : on passe presque toujours par le contraire, « aucun ».",
      ],
      exercices: [
        {
          enonce: "On lance deux dés équilibrés et on fait la somme.\na) Construire le tableau des $36$ issues.\nb) Calculer la probabilité d'obtenir une somme de $8$.\nc) Calculer la probabilité d'obtenir un double.",
          correction:
            "a) Le tableau croise le premier dé (lignes) et le second (colonnes) : $6 \\times 6 = 36$ cases équiprobables.\nb) La somme $8$ apparaît $5$ fois : $(2\\,;\\,6)$, $(3\\,;\\,5)$, $(4\\,;\\,4)$, $(5\\,;\\,3)$, $(6\\,;\\,2)$. $P = \\dfrac{5}{36}$.\nc) Les doubles sont sur la diagonale : $6$ cases. $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.\n⛔ Le piège au b) : dire $\\dfrac{1}{11}$, « une somme parmi les onze possibles ». Les onze sommes ne sont PAS équiprobables ; ce sont les $36$ cases qui le sont.",
          schema: tableauProba(
            ["+", "1", "2", "3", "4", "5", "6"],
            [
              ["1", "2", "3", "4", "5", "6", "7"],
              ["2", "3", "4", "5", "6", "7", "8"],
              ["3", "4", "5", "6", "7", "8", "9"],
              ["4", "5", "6", "7", "8", "9", "10"],
              ["5", "6", "7", "8", "9", "10", "11"],
              ["6", "7", "8", "9", "10", "11", "12"],
            ],
            [[1, 6], [2, 5], [3, 4], [4, 3], [5, 2]],
          ),
          micros: ["proba_tableau_arbre", "proba_calculer"],
        },
        {
          enonce: "Une roue de loterie est partagée en trois secteurs : rouge ($180°$), bleu ($120°$) et jaune ($60°$). La probabilité de chaque couleur est proportionnelle à l'angle de son secteur.\na) Donner la loi de probabilité.\nb) Calculer la probabilité de ne pas obtenir rouge, de deux façons.",
          correction:
            "a) Le tour complet fait $360°$. Rouge : $\\dfrac{180}{360} = \\dfrac{1}{2}$ ; bleu : $\\dfrac{120}{360} = \\dfrac{1}{3}$ ; jaune : $\\dfrac{60}{360} = \\dfrac{1}{6}$.\nOn vérifie : $\\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{3 + 2 + 1}{6} = 1$. ✓\nb) Par le contraire : $1 - \\dfrac{1}{2} = \\dfrac{1}{2}$. Par la réunion de bleu et jaune, qui ne se chevauchent pas : $\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{1}{2}$. ✓\n⛔ Le piège au a) : donner $\\dfrac{1}{3}$ à chaque couleur. Trois couleurs ne veulent pas dire trois chances égales.",
          schema: roue([{ label: "rouge 1/2", poids: 180, couleur: R }, { label: "bleu 1/3", poids: 120, couleur: B }, { label: "jaune 1/6", poids: 60, couleur: J }]),
          micros: ["proba_modele", "proba_calculer", "proba_reunion_intersection"],
        },
        {
          enonce: "Dans une classe de $30$ élèves, $18$ font du football, $12$ de la natation, et $5$ font les deux. On choisit un élève au hasard.\na) Calculer la probabilité qu'il fasse du football ou de la natation.\nb) Calculer la probabilité qu'il ne fasse aucun des deux.",
          correction:
            "On note $F$ « fait du football » et $N$ « fait de la natation ». $P(F) = \\dfrac{18}{30}$, $P(N) = \\dfrac{12}{30}$, $P(F \\cap N) = \\dfrac{5}{30}$.\na) $P(F \\cup N) = \\dfrac{18 + 12 - 5}{30} = \\dfrac{25}{30} = \\dfrac{5}{6}$.\nb) « Aucun des deux » est le contraire de « l'un ou l'autre » : $1 - \\dfrac{5}{6} = \\dfrac{1}{6}$, soit $5$ élèves.\n⛔ Le piège au a) : $\\dfrac{18 + 12}{30} = 1$ — tous les élèves feraient du sport, ce qui est faux. Les $5$ qui font les deux ont été comptés deux fois.",
          schema: tableauProba(["", "Natation", "Pas natation", "Total"], [["Football", "5", "13", "18"], ["Pas football", "7", "5", "12"], ["Total", "12", "18", "30"]], [[1, 2]]),
          micros: ["proba_formule_union", "proba_evenement_contraire", "proba_reunion_intersection"],
        },
        {
          enonce: "Dans un lycée de $400$ élèves, on relève la classe et le régime. Parmi les $220$ élèves de seconde, $150$ sont demi-pensionnaires ; parmi les $180$ élèves de première, $90$ le sont. On choisit un élève au hasard.\na) Compléter le tableau.\nb) Calculer la probabilité que l'élève soit en seconde ET demi-pensionnaire.\nc) Calculer la probabilité qu'il soit en seconde OU demi-pensionnaire.",
          correction:
            "a) Demi-pensionnaires : $150 + 90 = 240$ ; externes : $70$ en seconde, $90$ en première, $160$ en tout.\nb) $P(S \\cap D) = \\dfrac{150}{400} = 0{,}375$.\nc) $P(S \\cup D) = P(S) + P(D) - P(S \\cap D) = \\dfrac{220 + 240 - 150}{400} = \\dfrac{310}{400} = 0{,}775$.\n⭐ Vérification : le contraire, « en première ET externe », compte $90$ élèves, et $1 - \\dfrac{90}{400} = 0{,}775$. ✓",
          schema: tableauProba(["", "Demi-pension", "Externe", "Total"], [["Seconde", "150", "70", "220"], ["Première", "90", "90", "180"], ["Total", "240", "160", "400"]], [[0, 1]]),
          micros: ["proba_reunion_intersection", "proba_formule_union", "proba_tableau_arbre"],
        },
        {
          enonce: "On lance trois pièces équilibrées.\na) Combien y a-t-il d'issues ? Sont-elles équiprobables ?\nb) Calculer la probabilité d'obtenir au moins un pile.",
          correction:
            "a) Chaque pièce double le nombre de chemins : $2 \\times 2 \\times 2 = 8$ issues (PPP, PPF, …, FFF), toutes équiprobables, de probabilité $\\dfrac{1}{8}$.\nb) Le contraire de « au moins un pile » est « aucun pile », c'est-à-dire FFF : une seule issue.\n$P(\\text{au moins un pile}) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.\n⭐ Compter directement les issues avec au moins un pile demande d'en lister sept ; le contraire n'en demande qu'une.",
          // ⛔ Le canvas d'arbre du coach n'a que DEUX niveaux (colonnes 24, 168, 320) :
          // un troisième s'empilait sur le deuxième (mesuré le 24/09). Les huit
          // issues vont donc dans un tableau, « aucun pile » surligné.
          schema: tableauProba(["Pièce 1", "Pièce 2", "Pièce 3", "Issue"], [["P", "P", "P", "PPP"], ["P", "P", "F", "PPF"], ["P", "F", "P", "PFP"], ["P", "F", "F", "PFF"], ["F", "P", "P", "FPP"], ["F", "P", "F", "FPF"], ["F", "F", "P", "FFP"], ["F", "F", "F", "FFF"]], [[7, 0], [7, 1], [7, 2], [7, 3]]),
          micros: ["proba_evenement_contraire", "proba_tableau_arbre"],
        },
        {
          enonce: "Un dé est truqué : la face $6$ sort deux fois plus souvent que chacune des autres, qui sont équiprobables entre elles.\na) Déterminer la loi de probabilité.\nb) Calculer la probabilité d'obtenir un nombre pair.",
          correction:
            "a) On note $p$ la probabilité de chacune des faces $1$ à $5$ ; celle du $6$ est $2p$. La somme vaut $1$ : $5p + 2p = 1$, donc $p = \\dfrac{1}{7}$.\nLoi : $P(1) = \\dots = P(5) = \\dfrac{1}{7}$ et $P(6) = \\dfrac{2}{7}$.\nb) $P(\\text{pair}) = P(2) + P(4) + P(6) = \\dfrac{1}{7} + \\dfrac{1}{7} + \\dfrac{2}{7} = \\dfrac{4}{7}$.\n⛔ Le piège au a) : écrire $P(6) = \\dfrac{2}{6}$. Le dé n'est plus équilibré : on ne compte plus, on met la loi en équation.",
          schema: roue([{ label: "1", poids: 1, couleur: B }, { label: "2", poids: 1, couleur: V }, { label: "3", poids: 1, couleur: J }, { label: "4", poids: 1, couleur: "#8b5cf6" }, { label: "5", poids: 1, couleur: "#f97316" }, { label: "6", poids: 2, couleur: R }]),
          micros: ["proba_modele"],
        },
        {
          enonce: "On tire une carte au hasard dans un jeu de $32$ cartes (quatre couleurs de $8$ cartes : 7, 8, 9, 10, valet, dame, roi, as). $C$ : « la carte est un cœur » ; $F$ : « la carte est une figure » (valet, dame ou roi).\na) Décrire l'événement $C \\cap F$.\nb) Calculer $P(C)$, $P(F)$, $P(C \\cap F)$, puis $P(C \\cup F)$.",
          correction:
            "a) $C \\cap F$ : « la carte est une figure de cœur » : valet, dame ou roi de cœur, $3$ cartes.\nb) $P(C) = \\dfrac{8}{32}$, $P(F) = \\dfrac{12}{32}$ ($3$ figures dans chacune des $4$ couleurs), $P(C \\cap F) = \\dfrac{3}{32}$.\n$P(C \\cup F) = \\dfrac{8 + 12 - 3}{32} = \\dfrac{17}{32}$.\n⛔ Le piège : $\\dfrac{8 + 12}{32} = \\dfrac{20}{32}$, qui compte deux fois les trois figures de cœur.",
          schema: tableauProba(["", "Figure", "Pas figure", "Total"], [["Cœur", "3", "5", "8"], ["Pas cœur", "9", "15", "24"], ["Total", "12", "20", "32"]], [[0, 1], [0, 2], [1, 1]]),
          micros: ["proba_vocabulaire", "proba_formule_union"],
        },
        {
          enonce: "Une urne contient $3$ boules rouges et $2$ bleues. On tire une boule, on ne la remet PAS, puis on en tire une seconde.\na) Construire l'arbre des tirages, avec les probabilités sur les branches.\nb) Calculer la probabilité de tirer deux boules rouges.\nc) Calculer la probabilité de tirer deux boules de la même couleur.",
          correction:
            "a) Premier tirage : rouge $\\dfrac{3}{5}$, bleue $\\dfrac{2}{5}$. Au second, il ne reste que $4$ boules : après une rouge, rouge $\\dfrac{2}{4}$ et bleue $\\dfrac{2}{4}$ ; après une bleue, rouge $\\dfrac{3}{4}$ et bleue $\\dfrac{1}{4}$.\nb) On multiplie le long du chemin : $P(RR) = \\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{6}{20} = \\dfrac{3}{10}$.\nc) Deux chemins : $RR$ et $BB$. $P(BB) = \\dfrac{2}{5} \\times \\dfrac{1}{4} = \\dfrac{1}{10}$. Donc $P = \\dfrac{3}{10} + \\dfrac{1}{10} = \\dfrac{2}{5}$.\n⛔ Le piège au a) : garder $\\dfrac{3}{5}$ au second tirage. Sans remise, l'urne a CHANGÉ.",
          schema: arbre([
            { label: "R", proba: "3/5", enfants: [{ label: "R", proba: "2/4" }, { label: "B", proba: "2/4" }] },
            { label: "B", proba: "2/5", enfants: [{ label: "R", proba: "3/4" }, { label: "B", proba: "1/4" }] },
          ]),
          micros: ["proba_tableau_arbre", "proba_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on choisit le modèle, on calcule, on dit ce que la probabilité signifie.",
      rappel: [
        "On précise toujours le modèle : les issues sont-elles équiprobables ? Sinon, quelle est la loi ?",
        "Une probabilité proche de $0$ n'est pas nulle ; une probabilité de $0{,}5$ ne veut pas dire « une fois sur deux, à coup sûr ».",
        "Le contraire est souvent le chemin le plus court.",
      ],
      exercices: [
        {
          titre: "Le digicode",
          enonce: "La porte d'un immeuble s'ouvre avec un code de $4$ chiffres (de $0000$ à $9999$). Un voleur tape un code au hasard.\na) Combien y a-t-il de codes possibles ? Quelle est la probabilité de trouver le bon du premier coup ?\nb) Le digicode bloque après $3$ essais faux. Quelle est la probabilité que le voleur entre ?\nc) Quelle est la probabilité qu'un code tiré au hasard ait ses $4$ chiffres tous différents ? Et qu'il ait au moins deux chiffres identiques ?",
          correction:
            "a) $10$ choix pour chaque chiffre : $10 \\times 10 \\times 10 \\times 10 = 10\\,000$ codes, équiprobables. $P = \\dfrac{1}{10\\,000} = 0{,}0001$.\nb) Il essaie $3$ codes différents : $P = \\dfrac{3}{10\\,000} = 0{,}0003$, soit $0{,}03$ %.\nc) Tous différents : $10$ choix pour le premier chiffre, $9$ pour le deuxième, $8$, puis $7$. $\\dfrac{10 \\times 9 \\times 8 \\times 7}{10\\,000} = \\dfrac{5\\,040}{10\\,000} = 0{,}504$.\nAu moins deux identiques, c'est le contraire : $1 - 0{,}504 = 0{,}496$.\n⭐ Presque un code sur deux a un chiffre répété : bien plus qu'on ne le croirait.",
          schema: diagramme("barres", [{ label: "Tous différents", value: 5040 }, { label: "Un chiffre répété", value: 4960 }]),
          micros: ["proba_modele", "proba_calculer", "proba_evenement_contraire"],
        },
        {
          titre: "Nés le même mois",
          enonce: "On suppose que chaque personne a la même probabilité, $\\dfrac{1}{12}$, d'être née n'importe quel mois, indépendamment des autres.\na) Deux amies se rencontrent. Quelle est la probabilité qu'elles soient nées le même mois ?\nb) Dans un groupe de $3$ personnes, calculer la probabilité qu'elles soient nées trois mois différents, puis qu'au moins deux soient nées le même mois.\nc) Le diagramme donne cette probabilité pour des groupes de $2$ à $6$ personnes. À partir de combien de personnes dépasse-t-elle $\\dfrac{1}{2}$ ?",
          correction:
            "a) Quel que soit le mois de la première, la seconde tombe sur le même avec la probabilité $\\dfrac{1}{12} \\approx 0{,}083$.\nb) Trois mois différents : la deuxième évite le mois de la première ($\\dfrac{11}{12}$), la troisième évite les deux ($\\dfrac{10}{12}$). $P = \\dfrac{11}{12} \\times \\dfrac{10}{12} = \\dfrac{110}{144} \\approx 0{,}764$.\nAu moins deux le même mois, c'est le contraire : $1 - 0{,}764 \\approx 0{,}236$.\nc) On lit $0{,}427$ pour $4$ personnes et $0{,}618$ pour $5$ : dès $5$ personnes, il est plus probable qu'improbable que deux soient nées le même mois.\n⭐ C'est le « paradoxe des anniversaires » : avec les jours de l'année, il suffit de $23$ personnes pour dépasser une chance sur deux.",
          schema: diagramme("barres", [{ label: "2", value: 0.083 }, { label: "3", value: 0.236 }, { label: "4", value: 0.427 }, { label: "5", value: 0.618 }, { label: "6", value: 0.777 }], 3),
          micros: ["proba_evenement_contraire", "proba_calculer", "proba_tableau_arbre"],
        },
        {
          titre: "La roulette du casino",
          enonce: "Une roulette européenne a $37$ cases équiprobables : le $0$ (vert) et les nombres de $1$ à $36$, dont $18$ rouges et $18$ noirs. Parmi les rouges, $8$ sont pairs (12, 14, 16, 18, 30, 32, 34 et 36).\na) Calculer la probabilité de « rouge ». Est-ce $\\dfrac{1}{2}$ ?\nb) Calculer la probabilité de « rouge ou pair » (le $0$ ne compte pas comme pair).\nc) Pourquoi dit-on que le casino gagne toujours à la longue ?",
          correction:
            "a) $P(\\text{rouge}) = \\dfrac{18}{37} \\approx 0{,}486$ : un peu MOINS que $\\dfrac{1}{2}$, à cause du $0$ vert.\nb) Les pairs de $1$ à $36$ sont $18$ ; les rouges pairs sont $8$. $P(\\text{rouge} \\cup \\text{pair}) = \\dfrac{18 + 18 - 8}{37} = \\dfrac{28}{37} \\approx 0{,}757$.\nc) Un pari sur « rouge » rapporte comme si la chance était de $\\dfrac{1}{2}$, alors qu'elle n'est que de $\\dfrac{18}{37}$. Sur un coup, tout peut arriver ; sur des milliers de coups, ce petit écart dû au $0$ joue toujours pour le casino.\n⛔ Le piège au a) : « rouge ou noir, une chance sur deux ». Le $0$ n'est ni l'un ni l'autre.",
          schema: roue([{ label: "rouge 18", poids: 18, couleur: R }, { label: "noir 18", poids: 18, couleur: N }, { label: "0", poids: 1, couleur: V }]),
          micros: ["proba_modele", "proba_formule_union", "proba_reunion_intersection"],
        },
        {
          titre: "Les groupes sanguins",
          enonce: "En France, selon l'Établissement français du sang, la répartition des groupes sanguins est : O $42$ %, A $45$ %, B $9$ %, AB $4$ %. Par ailleurs, $85$ % des personnes sont de rhésus positif. On choisit une personne au hasard.\na) Quelle est la probabilité qu'elle ne soit pas du groupe A ?\nb) Quelle est la probabilité qu'elle soit du groupe O ou du groupe B ?\nc) On suppose que le rhésus ne dépend pas du groupe. Compléter l'arbre, puis calculer la probabilité d'être O négatif, le « donneur universel ».",
          correction:
            "a) Par le contraire : $1 - 0{,}45 = 0{,}55$.\nb) O et B ne se chevauchent pas (on n'a qu'un groupe) : $0{,}42 + 0{,}09 = 0{,}51$.\nc) Sur la branche O, le rhésus négatif a la probabilité $1 - 0{,}85 = 0{,}15$. Le long du chemin : $P(\\text{O}^-) = 0{,}42 \\times 0{,}15 = 0{,}063$, soit environ $6$ %.\n⭐ C'est bien l'ordre de grandeur donné par l'EFS : environ $6$ % de donneurs universels. D'où les appels répétés au don de sang O négatif.\n⛔ Le piège au c) : répondre $0{,}15$, la part des rhésus négatifs de TOUTE la population.",
          schema: arbre([
            { label: "O", proba: "0,42", enfants: [{ label: "Rh+", proba: "0,85" }, { label: "Rh−", proba: "0,15" }] },
            { label: "A", proba: "0,45" },
            { label: "B", proba: "0,09" },
            { label: "AB", proba: "0,04" },
          ]),
          micros: ["proba_modele", "proba_evenement_contraire", "proba_tableau_arbre", "proba_reunion_intersection"],
        },
      ],
    },
  ],
};
