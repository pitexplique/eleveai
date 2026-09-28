// ─── Fiche d'exercices : probabilités, les bases (1re, automatismes) ─────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : des probabilités décimales à un ou deux chiffres, des
// fractions qui se simplifient de tête.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts`
// (notionId auto_proba_base). L'exercice 3 est celui d'Asie (un dé truqué dont
// on cherche la probabilité manquante, la somme des issues valant 1).
// ⛔ PAS de probabilité conditionnelle ici : c'est la feuille suivante,
// `auto-proba-lecture`. L'exercice 17 ne fait que l'annoncer (taux de chômage).
//
// ⭐⭐ LE FIL : TROIS RÈGLES, ET ELLES SE VÉRIFIENT L'UNE L'AUTRE. Une
// probabilité est entre 0 et 1 ; toutes les issues font 1 ; le contraire,
// c'est ce qui manque pour faire 1. Les exercices 7, 12 et 15 font démasquer
// une probabilité impossible par ces règles seules.
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (dé, billes, roue, arbre, tableau des
// deux dés, diagrammes) et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (population
// par âge, tirage au sort, sondage, roulette, départements, marché du travail,
// jurés d'assises, ponctualité d'un train, tombola). Les chiffres sont des
// MODÈLES arrondis, jamais présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-proba-base.mjs`.
//
// Micro-compétences : auto_proba_encadrement (1, 7, 12, 15, 20),
// auto_proba_contraire (2, 5, 7, 9, 11, 13, 14, 16, 17, 18, 19, 20),
// auto_proba_somme_issues (3, 6, 9, 12, 15, 17, 18, 19),
// auto_proba_equiprobabilite (4, 5, 6, 8, 10, 11, 13, 14, 16, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, billes, de, diagramme, roue, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const VERT = "#16a34a";

export const exercicesAutoProbaBasePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-proba-base",
  titre: "Probabilités : les bases",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : reconnaître une probabilité, additionner les issues, passer à l'évènement contraire, compter les cas favorables quand tout est équiprobable. Dés, urnes, roue, puis population par âge, sondage, roulette, départements, marché du travail, jurés d'assises, retards de train et tombola. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Une probabilité est un nombre entre $0$ et $1$ : $0$ pour un évènement impossible, $1$ pour un évènement certain.",
        "La somme des probabilités de TOUTES les issues vaut $1$. La probabilité d'un évènement est la somme des probabilités de ses issues.",
        "Évènement contraire : $P(\\overline{A}) = 1 - P(A)$.",
        "Si toutes les issues ont la même probabilité : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues possibles}}$.",
      ],
      exercices: [
        {
          enonce: "Parmi ces nombres, lesquels peuvent être des probabilités ?\n$0{,}7$ ; $1{,}2$ ; $-0{,}1$ ; $\\dfrac{3}{4}$ ; $\\dfrac{5}{4}$ ; $0$ ; $1$ ; $120$ %.",
          correction:
            "Une probabilité doit être comprise entre $0$ et $1$, bornes comprises.\nOui : $0{,}7$ ; $\\dfrac{3}{4} = 0{,}75$ ; $0$ (évènement impossible) ; $1$ (évènement certain).\nNon : $1{,}2$ et $\\dfrac{5}{4} = 1{,}25$ dépassent $1$ ; $-0{,}1$ est négatif ; $120$ % $= 1{,}2$ dépasse $1$.\n⚠️ Une fraction dont le numérateur dépasse le dénominateur est plus grande que $1$ : ce n'est jamais une probabilité.",
          micros: ["auto_proba_encadrement"],
        },
        {
          enonce: "La probabilité qu'un train arrive en retard est $0{,}15$. On suppose qu'un train est soit en retard, soit à l'heure. Quelle est la probabilité qu'il arrive à l'heure ?",
          correction:
            "« À l'heure » est l'évènement CONTRAIRE de « en retard » : l'un ou l'autre arrive, jamais les deux.\n$P(\\text{à l'heure}) = 1 - 0{,}15 = 0{,}85$.\n⭐ En pourcentage : $15$ % de retards, donc $85$ % de trains à l'heure.",
          micros: ["auto_proba_contraire"],
        },
        {
          enonce: "On lance un dé truqué à quatre faces. Le tableau donne la probabilité de trois faces. Quelle est la probabilité d'obtenir la face $4$ ?",
          figure: tableau(["Face", "1", "2", "3", "4"], ["Probabilité", "0,1", "0,3", "0,2", "?"]),
          correction:
            "Les quatre faces sont TOUTES les issues : leurs probabilités font $1$.\n$0{,}1 + 0{,}3 + 0{,}2 = 0{,}6$.\n$P(4) = 1 - 0{,}6 = 0{,}4$.\n⭐ C'est la question tombée au sujet d'Asie, en juin 2026.\n⚠️ Le dé est truqué : on ne peut PAS répondre $\\dfrac{1}{4}$ « parce qu'il y a quatre faces ».",
          micros: ["auto_proba_somme_issues"],
        },
        {
          enonce: "On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir un multiple de $3$ ?",
          correction:
            "Le dé est équilibré : les $6$ faces ont la même probabilité.\nLes multiples de $3$ entre $1$ et $6$ sont $3$ et $6$ : $2$ issues favorables.\n$P = \\dfrac{2}{6} = \\dfrac{1}{3}$.\n⚠️ Le piège : oublier $6$, qui est aussi un multiple de $3$ ($6 = 2 \\times 3$).",
          schema: de([3, 6]),
          micros: ["auto_proba_equiprobabilite"],
        },
        {
          enonce: "Une urne contient $3$ billes rouges, $5$ bleues et $2$ vertes, indiscernables au toucher. On tire une bille au hasard.\na) Quelle est la probabilité de tirer une bille bleue ?\nb) Quelle est la probabilité de ne PAS tirer une bille verte ?",
          figure: billes([
            { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE },
            { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU },
            { couleur: VERT }, { couleur: VERT },
          ]),
          correction:
            "Il y a $3 + 5 + 2 = 10$ billes, et chacune a la même chance d'être tirée.\na) $5$ billes bleues sur $10$ : $P(\\text{bleue}) = \\dfrac{5}{10} = \\dfrac{1}{2}$.\nb) $P(\\text{verte}) = \\dfrac{2}{10} = 0{,}2$, donc par le contraire $P(\\text{pas verte}) = 1 - 0{,}2 = 0{,}8$.\n✔️ Autre chemin : $3 + 5 = 8$ billes non vertes, et $\\dfrac{8}{10} = 0{,}8$.\n⭐ « Indiscernables » : c'est ce mot qui autorise l'équiprobabilité.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_contraire"],
        },
        {
          enonce: "Une roue de loterie est partagée en $8$ secteurs égaux : $1$ secteur « $10$ € », $3$ secteurs « $2$ € » et $4$ secteurs « Perdu ». On la fait tourner.\na) Quelle est la probabilité de chaque issue ?\nb) Quelle est la probabilité de gagner de l'argent ?",
          figure: roue([
            { label: "10 €", poids: 1 },
            { label: "2 €", poids: 3 },
            { label: "Perdu", poids: 4 },
          ]),
          correction:
            "a) Les $8$ secteurs sont égaux : chacun a la probabilité $\\dfrac{1}{8}$.\n$P(10\\text{ €}) = \\dfrac{1}{8}$, $P(2\\text{ €}) = \\dfrac{3}{8}$, $P(\\text{Perdu}) = \\dfrac{4}{8} = \\dfrac{1}{2}$.\n✔️ $\\dfrac{1}{8} + \\dfrac{3}{8} + \\dfrac{4}{8} = 1$.\nb) Gagner de l'argent, c'est « $10$ € » ou « $2$ € » : on additionne, $\\dfrac{1}{8} + \\dfrac{3}{8} = \\dfrac{4}{8} = \\dfrac{1}{2}$.\n⚠️ Le piège : $P(10\\text{ €}) = \\dfrac{1}{3}$ « parce qu'il y a trois issues ». Les trois issues n'ont pas la même taille.",
          micros: ["auto_proba_somme_issues", "auto_proba_equiprobabilite"],
        },
        {
          enonce: "Un élève écrit : « $P(A) = 0{,}4$ et $P(\\overline{A}) = 0{,}5$ ». Est-ce possible ?",
          correction:
            "$A$ et $\\overline{A}$ se partagent toutes les issues : $P(A) + P(\\overline{A}) = 1$.\nIci $0{,}4 + 0{,}5 = 0{,}9$, pas $1$ : c'est impossible.\nSi $P(A) = 0{,}4$, alors $P(\\overline{A}) = 1 - 0{,}4 = 0{,}6$.\n⭐ Deux nombres entre $0$ et $1$ ne suffisent pas : un évènement et son contraire doivent faire $1$ ensemble.",
          micros: ["auto_proba_contraire", "auto_proba_encadrement"],
        },
        {
          enonce: "On tire une carte au hasard dans un jeu de $32$ cartes ($4$ couleurs de $8$ cartes, un roi par couleur). Quelle est la probabilité de tirer un roi ? un cœur ? le roi de cœur ?",
          correction:
            "Les $32$ cartes ont la même chance d'être tirées.\nRoi : $4$ cartes favorables, $\\dfrac{4}{32} = \\dfrac{1}{8}$.\nCœur : $8$ cartes, $\\dfrac{8}{32} = \\dfrac{1}{4}$.\nRoi de cœur : $1$ seule carte, $\\dfrac{1}{32}$.\n⚠️ Le roi de cœur est à la fois roi ET cœur : sa probabilité est bien plus petite que chacune des deux autres.",
          micros: ["auto_proba_equiprobabilite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Compter, additionner, passer au contraire, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Quand on tire au hasard une personne dans une population, la probabilité d'un groupe est sa PART dans la population.",
        "Pour deux dés ou deux pièces, on dresse la liste de TOUTES les issues (tableau ou arbre) avant de compter.",
        "« Au moins un » se calcule souvent par le contraire : $P(\\text{au moins un}) = 1 - P(\\text{aucun})$.",
      ],
      exercices: [
        {
          titre: "La population par âge",
          enonce: "Dans un pays (modèle), $23$ % des habitants ont moins de $20$ ans, $55$ % ont de $20$ à $64$ ans, les autres ont $65$ ans ou plus. On tire un habitant au hasard.\na) Quelle est la probabilité qu'il ait $65$ ans ou plus ?\nb) Qu'il ait moins de $65$ ans ?\nc) Qu'il ait au moins $20$ ans ?",
          correction:
            "a) Les trois tranches couvrent toute la population : $P(65\\text{ ans ou plus}) = 1 - 0{,}23 - 0{,}55 = 0{,}22$.\nb) C'est le contraire de a) : $1 - 0{,}22 = 0{,}78$.\n✔️ Autre chemin : $0{,}23 + 0{,}55 = 0{,}78$.\nc) « Au moins $20$ ans » est le contraire de « moins de $20$ ans » : $1 - 0{,}23 = 0{,}77$.\n⭐ Tirer une personne au hasard transforme chaque PART de la population en probabilité.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Moins de 20 ans", value: 23 },
              { label: "20-64 ans", value: 55 },
              { label: "65 ans et +", value: 22 },
            ], 2),
          ),
          micros: ["auto_proba_somme_issues", "auto_proba_contraire"],
        },
        {
          titre: "Les deux dés",
          enonce: "Dans un jeu de société, on lance deux dés équilibrés et on additionne les faces.\na) Combien y a-t-il d'issues ?\nb) Quelle est la probabilité d'obtenir une somme de $7$ ? de $12$ ?\nc) Quelle somme est la plus probable ?",
          correction:
            "a) Chaque dé a $6$ faces : $6 \\times 6 = 36$ couples, tous équiprobables.\nb) Somme $7$ : $(1\\,;\\,6)$, $(2\\,;\\,5)$, $(3\\,;\\,4)$, $(4\\,;\\,3)$, $(5\\,;\\,2)$, $(6\\,;\\,1)$. $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.\nSomme $12$ : seulement $(6\\,;\\,6)$. $P = \\dfrac{1}{36}$.\nc) Le $7$ : c'est la seule somme qui occupe toute une diagonale du tableau.\n⛔ Le piège : dire qu'il y a $11$ sommes possibles (de $2$ à $12$), donc $P(7) = \\dfrac{1}{11}$. Les $11$ sommes ne sont PAS équiprobables ; les $36$ couples, si.",
          schema: tableauProba(
            ["", "1", "2", "3", "4", "5", "6"],
            [
              ["1", "2", "3", "4", "5", "6", "7"],
              ["2", "3", "4", "5", "6", "7", "8"],
              ["3", "4", "5", "6", "7", "8", "9"],
              ["4", "5", "6", "7", "8", "9", "10"],
              ["5", "6", "7", "8", "9", "10", "11"],
              ["6", "7", "8", "9", "10", "11", "12"],
            ],
            [[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1]],
          ),
          micros: ["auto_proba_equiprobabilite"],
        },
        {
          titre: "Le voyage d'entreprise",
          enonce: "Une entreprise de $250$ salariés compte $40$ cadres. Elle tire au sort un salarié pour gagner un voyage.\na) Quelle est la probabilité que ce soit un cadre ?\nb) Que ce ne soit pas un cadre ?",
          correction:
            "Le tirage est au sort : les $250$ salariés ont la même chance.\na) $P(\\text{cadre}) = \\dfrac{40}{250} = \\dfrac{4}{25} = \\dfrac{16}{100} = 0{,}16$.\nb) Par le contraire : $1 - 0{,}16 = 0{,}84$.\n✔️ Autre chemin : $250 - 40 = 210$ non-cadres, et $\\dfrac{210}{250} = \\dfrac{84}{100}$.\n⭐ Pour passer d'une fraction sur $25$ à un pourcentage, on multiplie en haut et en bas par $4$.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_contraire"],
        },
        {
          titre: "Le pronostic",
          enonce: "Avant le second tour d'une élection à trois candidats, un commentateur annonce : « A a une probabilité $0{,}5$ de gagner, B une probabilité $0{,}4$, et C une probabilité $0{,}2$ ». Il n'y aura qu'un seul élu.\na) Ces trois probabilités sont-elles possibles ensemble ?\nb) Si les deux premières sont justes, quelle est la probabilité que C gagne ?",
          correction:
            "a) Un seul élu : « A gagne », « B gagne », « C gagne » sont toutes les issues, sans chevauchement. Leurs probabilités doivent faire $1$.\n$0{,}5 + 0{,}4 + 0{,}2 = 1{,}1$ : c'est plus que $1$, impossible.\nb) $P(C) = 1 - 0{,}5 - 0{,}4 = 0{,}1$.\n⭐ Chaque nombre était, seul, une probabilité acceptable. C'est leur SOMME qui trahit l'erreur.",
          micros: ["auto_proba_somme_issues", "auto_proba_encadrement"],
        },
        {
          titre: "Deux pièces",
          enonce: "On lance deux pièces équilibrées.\na) Écrire toutes les issues.\nb) Quelle est la probabilité d'obtenir au moins un pile ?",
          correction:
            "a) Pile ou face pour la première, pile ou face pour la seconde : $PP$, $PF$, $FP$, $FF$. Quatre issues équiprobables.\nb) Le contraire de « au moins un pile », c'est « aucun pile », c'est-à-dire $FF$.\n$P(FF) = \\dfrac{1}{4}$, donc $P(\\text{au moins un pile}) = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.\n✔️ En comptant : $PP$, $PF$, $FP$, trois issues sur quatre.\n⛔ Le piège : ne voir que trois issues (« deux piles, un pile, zéro pile »). « Un pile » arrive de DEUX façons, $PF$ et $FP$.",
          schema: arbre([
            { label: "P", proba: "1/2", enfants: [{ label: "P → PP", proba: "1/2" }, { label: "F → PF", proba: "1/2" }] },
            { label: "F", proba: "1/2", enfants: [{ label: "P → FP", proba: "1/2" }, { label: "F → FF", proba: "1/2" }] },
          ]),
          micros: ["auto_proba_contraire", "auto_proba_equiprobabilite"],
        },
        {
          titre: "La roulette",
          enonce: "Une roulette de casino européenne compte $37$ cases : $18$ rouges, $18$ noires, et le zéro, vert. La bille tombe au hasard dans une case.\na) Quelle est la probabilité que la bille tombe sur une case rouge ?\nb) Qu'elle ne tombe pas sur une case rouge ?\nc) Un joueur pense avoir « une chance sur deux » en misant sur le rouge. Est-ce exact ?",
          correction:
            "a) $37$ cases équiprobables, dont $18$ rouges : $P(\\text{rouge}) = \\dfrac{18}{37}$.\nb) Par le contraire : $1 - \\dfrac{18}{37} = \\dfrac{19}{37}$ ($18$ noires et le zéro).\nc) Non : $\\dfrac{18}{37}$ est un peu moins que $\\dfrac{18}{36} = \\dfrac{1}{2}$.\n⭐ C'est le zéro qui fait pencher la balance du côté du casino, à chaque partie.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_contraire"],
        },
        {
          titre: "Le dé truqué",
          enonce: "Un dé cubique est truqué : les faces $1$ à $5$ ont la même probabilité $p$, et la face $6$ a une probabilité trois fois plus grande.\na) Calculer $p$.\nb) Quelle est la probabilité d'obtenir $6$ ? un nombre pair ?",
          correction:
            "a) Les six faces font $1$ : $5p + 3p = 1$, donc $8p = 1$ et $p = \\dfrac{1}{8}$.\nb) $P(6) = 3 \\times \\dfrac{1}{8} = \\dfrac{3}{8}$.\nPair, c'est $2$, $4$ ou $6$ : $\\dfrac{1}{8} + \\dfrac{1}{8} + \\dfrac{3}{8} = \\dfrac{5}{8}$.\n⚠️ Le dé est truqué : $P(\\text{pair})$ n'est pas $\\dfrac{3}{6}$. On additionne les probabilités des issues, on ne les compte pas.",
          schema: ecranSeulement(tableau(["Face", "1", "2", "3", "4", "5", "6"], ["Probabilité", "1/8", "1/8", "1/8", "1/8", "1/8", "3/8"])),
          micros: ["auto_proba_somme_issues", "auto_proba_encadrement"],
        },
        {
          titre: "Un département au hasard",
          enonce: "La France métropolitaine compte $96$ départements, dont $12$ en Nouvelle-Aquitaine et $4$ en Bretagne. On tire un département au hasard.\na) Quelle est la probabilité qu'il soit en Nouvelle-Aquitaine ?\nb) Qu'il ne soit pas en Nouvelle-Aquitaine ?\nc) Qu'il soit en Bretagne ?",
          correction:
            "Les $96$ départements ont la même chance d'être tirés.\na) $\\dfrac{12}{96} = \\dfrac{1}{8}$ (car $8 \\times 12 = 96$).\nb) Par le contraire : $1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.\nc) $\\dfrac{4}{96} = \\dfrac{1}{24}$.\n⚠️ Tirer un DÉPARTEMENT au hasard n'est pas tirer un HABITANT au hasard : la Bretagne a $1$ chance sur $24$ ici, mais sa part de la population est différente.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_contraire"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation réelle, des questions qui s'enchaînent, et une phrase pour conclure. Sans calculatrice.",
      rappel: [
        "On nomme les issues, on vérifie qu'elles font $1$ à elles toutes, puis on répond.",
        "Contraire, somme, équiprobabilité : on choisit la règle la plus courte, et on vérifie avec une autre.",
      ],
      exercices: [
        {
          titre: "Le marché du travail",
          enonce: "Le diagramme donne la situation des $20\\,000$ adultes d'une ville (modèle, en %). On interroge un adulte au hasard.\na) Quelle est la probabilité qu'il soit retraité ?\nb) Qu'il soit actif, c'est-à-dire en emploi ou au chômage ?\nc) Qu'il ne soit pas retraité ?\nd) Combien d'adultes sont au chômage ? Quelle est la probabilité d'interroger un chômeur ?\ne) Le taux de chômage se calcule parmi les ACTIFS seulement. Que vaut-il ?",
          figure: diagramme("camembert", [
            { label: "En emploi", value: 45 },
            { label: "Au chômage", value: 5 },
            { label: "Retraités", value: 30 },
            { label: "Autres inactifs", value: 20 },
          ]),
          correction:
            "a) $P(\\text{retraité}) = 0{,}3$.\nb) En emploi OU au chômage : on additionne, $0{,}45 + 0{,}05 = 0{,}5$.\nc) Par le contraire : $1 - 0{,}3 = 0{,}7$.\n✔️ $0{,}45 + 0{,}05 + 0{,}2 = 0{,}7$.\nd) $5$ % de $20\\,000$ : $1\\,000$ chômeurs. $P(\\text{chômeur}) = 0{,}05$, une chance sur vingt.\ne) Les actifs sont $50$ % de $20\\,000$, soit $10\\,000$. Taux de chômage : $\\dfrac{1\\,000}{10\\,000} = 10$ %.\n⭐ $5$ % ou $10$ % : ce n'est pas la même population de référence. Ce « parmi les actifs » est une probabilité CONDITIONNELLE, le sujet de la feuille suivante.",
          micros: ["auto_proba_somme_issues", "auto_proba_contraire"],
        },
        {
          titre: "Les jurés d'assises",
          enonce: "Les jurés d'assises sont tirés au sort sur les listes électorales. Une commune compte $2\\,000$ inscrits ; le diagramme les répartit par âge (modèle). On tire un nom au hasard.\na) Calculer la probabilité de chaque tranche d'âge. Vérifier leur somme.\nb) Quelle est la probabilité que le juré ait au moins $30$ ans ?\nc) Qu'il ait de $30$ à $64$ ans ?\nd) Un habitant affirme : « les $65$ ans et plus ont moins de chances d'être tirés que les $50$-$64$ ans ». A-t-il raison ?",
          figure: diagramme("barres", [
            { label: "18-29 ans", value: 300 },
            { label: "30-49", value: 700 },
            { label: "50-64", value: 500 },
            { label: "65 et +", value: 500 },
          ]),
          correction:
            "a) Chaque inscrit a la même chance : on divise chaque effectif par $2\\,000$.\n$\\dfrac{300}{2\\,000} = 0{,}15$ ; $\\dfrac{700}{2\\,000} = 0{,}35$ ; $\\dfrac{500}{2\\,000} = 0{,}25$ ; $\\dfrac{500}{2\\,000} = 0{,}25$.\n✔️ $0{,}15 + 0{,}35 + 0{,}25 + 0{,}25 = 1$.\nb) Contraire de « moins de $30$ ans » : $1 - 0{,}15 = 0{,}85$.\nc) On additionne deux tranches : $0{,}35 + 0{,}25 = 0{,}6$.\nd) Non : les deux groupes comptent $500$ inscrits, ils ont la même probabilité, $0{,}25$.\n⭐ Un tirage au sort est équitable entre PERSONNES : un groupe a d'autant plus de chances qu'il est nombreux.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_somme_issues", "auto_proba_contraire"],
        },
        {
          titre: "Le train de 7 h 42",
          enonce: "On a observé un train régional pendant $200$ jours ; le diagramme donne le nombre de jours de chaque situation (modèle). On choisit un jour au hasard parmi ces $200$.\na) Calculer la probabilité de chaque situation. Vérifier leur somme.\nb) Quelle est la probabilité que le train ait circulé ?\nc) Qu'il ait été en retard, peu ou beaucoup ?\nd) Qu'il n'ait pas été à l'heure ? Vérifier de deux façons.\ne) L'opérateur affiche : « $98$ % de nos trains à l'heure ». Qu'en penser ?",
          figure: diagramme("barres", [
            { label: "À l'heure", value: 150 },
            // ⛔ Libellés courts : à 375 px, « Retard < 15 min » chevauchait ses voisins.
            { label: "< 15 min", value: 36 },
            { label: "≥ 15 min", value: 10 },
            { label: "Supprimé", value: 4 },
          ]),
          correction:
            "a) On divise par $200$ (diviser par $2$, puis par $100$) : $0{,}75$ ; $0{,}18$ ; $0{,}05$ ; $0{,}02$.\n✔️ $0{,}75 + 0{,}18 + 0{,}05 + 0{,}02 = 1$.\nb) Contraire de « supprimé » : $1 - 0{,}02 = 0{,}98$.\nc) $0{,}18 + 0{,}05 = 0{,}23$.\nd) Contraire de « à l'heure » : $1 - 0{,}75 = 0{,}25$.\n✔️ En additionnant : $0{,}18 + 0{,}05 + 0{,}02 = 0{,}25$.\ne) $98$ %, c'est la part des trains qui ont CIRCULÉ, pas de ceux qui étaient à l'heure : ceux-là ne font que $75$ %.\n⭐ Même série, deux chiffres très différents : tout dépend de l'évènement qu'on choisit d'afficher.",
          micros: ["auto_proba_somme_issues", "auto_proba_contraire", "auto_proba_equiprobabilite"],
        },
        {
          titre: "La tombola",
          enonce: "Une association vend $400$ billets de tombola à $2$ € pièce. Un seul billet gagne un vélo, $4$ billets gagnent un bon d'achat, $15$ billets gagnent une place de cinéma. On achète un billet.\na) Quelle est la probabilité de gagner le vélo ?\nb) De gagner un lot, quel qu'il soit ?\nc) De ne rien gagner ?\nd) Julie achète $10$ billets. Quelle probabilité a-t-elle de gagner le vélo ?\ne) Combien faudrait-il acheter de billets pour avoir une chance sur deux de gagner le vélo ? Combien cela coûterait-il ?",
          correction:
            "Les $400$ billets ont la même chance d'être tirés.\na) $P(\\text{vélo}) = \\dfrac{1}{400} = 0{,}0025$.\nb) $1 + 4 + 15 = 20$ billets gagnants : $\\dfrac{20}{400} = \\dfrac{1}{20} = 0{,}05$.\nc) Par le contraire : $1 - 0{,}05 = 0{,}95$.\nd) $10$ billets sur $400$ portent sa chance : $\\dfrac{10}{400} = \\dfrac{1}{40}$.\ne) Une chance sur deux, c'est $\\dfrac{200}{400}$ : il faut $200$ billets, soit $400$ €.\n⭐ L'association, elle, récolte $400 \\times 2 = 800$ € : c'est pour cela qu'une tombola rapporte.\n⚠️ Une probabilité si petite ($0{,}0025$) reste une probabilité : elle est bien entre $0$ et $1$.",
          micros: ["auto_proba_equiprobabilite", "auto_proba_contraire", "auto_proba_encadrement"],
        },
      ],
    },
  ],
};
