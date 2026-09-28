// ─── Fiche d'exercices : indépendance de deux évènements (1re) ────────────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`. Calculatrice
// autorisée, des produits qui tombent juste.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts`
// (notionId alea_independance) : la définition P_B(A) = P(A), le produit
// P(A ∩ B) = P(A) × P(B), la justification par le calcul, et la différence
// avec l'incompatibilité. C'est la dernière question des six exercices 1 des
// sujets de juin 2026 : « ces évènements sont-ils indépendants ? ».
//
// ⭐⭐ LE FIL : INDÉPENDANTS = SAVOIR L'UN NE CHANGE RIEN À L'AUTRE. Sur un
// tableau : la même proportion sur chaque ligne ; sur un arbre : les mêmes
// branches derrière chaque nœud ; en calcul : le produit.
// ⛔ LE PIÈGE CENTRAL : incompatible n'est pas indépendant — c'est presque le
// contraire (exercices 4, 8, 13, 18) : si l'un arrive, l'autre est impossible.
// ⛔ Le produit ne se sert que si l'indépendance est DONNÉE ou DÉMONTRÉE.
//
// ⭐ Frédéric, 28/09 : tableaux croisés, arbres, diagrammes, et des contextes
// d'économie, d'écologie, de sport, de nature, de PHYSIQUE (circuit en série,
// exercice 10 ; noyaux de radon, exercice 14 ; détecteurs de fumée, exercice
// 17) et d'HISTOIRE-GÉO (vote par région, exercice 11 ; signatures des
// registres de mariage, exercice 16 ; cadres en ville, exercice 19). Les
// chiffres sont des MODÈLES arrondis, jamais présentés comme des données
// officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-independance.mjs`.
//
// Micro-compétences : alea_indep_definition (1, 5, 6, 9, 11, 15), alea_indep_produit
// (2, 7, 9, 10, 14, 17, 18, 20), alea_indep_justifier (3, 5, 6, 11, 12, 13,
// 15, 16, 19), alea_indep_incompatible (4, 8, 13, 18). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, de, diagramme, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaIndependancePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-independance",
  titre: "Indépendance de deux évènements",
  accroche:
    "Vingt exercices pour reconnaître deux évènements indépendants, utiliser le produit des probabilités, justifier par un calcul qu'ils le sont ou ne le sont pas, et ne plus confondre indépendant et incompatible. Lancers francs, circuit électrique, vote par région, glacier et météo, noyaux radioactifs, registres de mariage, détecteurs de fumée, machines d'usine, pièges photographiques. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une définition, un produit, ou une comparaison.",
      rappel: [
        "$A$ et $B$ sont INDÉPENDANTS quand savoir $B$ ne change pas la probabilité de $A$ : $P_B(A) = P(A)$.",
        "C'est la même chose que $P(A \\cap B) = P(A) \\times P(B)$. C'est cette égalité qu'on vérifie pour JUSTIFIER.",
        "INCOMPATIBLES veut dire $P(A \\cap B) = 0$ : ils ne peuvent pas arriver ensemble. Ce n'est pas l'indépendance.",
      ],
      exercices: [
        {
          enonce: "On sait que $P(A) = 0{,}3$, $P_B(A) = 0{,}3$ et $P_C(A) = 0{,}5$. Les évènements $A$ et $B$ sont-ils indépendants ? Et $A$ et $C$ ?",
          correction:
            "$P_B(A) = 0{,}3 = P(A)$ : savoir que $B$ est réalisé ne change pas la probabilité de $A$. $A$ et $B$ sont indépendants.\n$P_C(A) = 0{,}5 \\neq 0{,}3$ : savoir $C$ fait passer la probabilité de $A$ de $0{,}3$ à $0{,}5$. $A$ et $C$ ne sont pas indépendants.\n⭐ On compare la probabilité « avec l'information » à la probabilité « sans l'information ».\nSur le dessin, en pour cent : P(A), puis A sachant B, puis A sachant C.",
          // ⛔ Libellés courts : « Sachant B (%) » chevauchait son voisin à 375 px (28/09).
          schema: ecranSeulement(diagramme("barres", [{ label: "P(A)", value: 30 }, { label: "si B", value: 30 }, { label: "si C", value: 50 }])),
          micros: ["alea_indep_definition"],
        },
        {
          enonce: "$A$ et $B$ sont deux évènements indépendants, avec $P(A) = 0{,}4$ et $P(B) = 0{,}25$. Calculer $P(A \\cap B)$.",
          correction:
            "L'indépendance est DONNÉE : on peut utiliser le produit.\n$P(A \\cap B) = P(A) \\times P(B) = 0{,}4 \\times 0{,}25 = 0{,}1$.\n⚠️ Sans l'indépendance, ce calcul serait faux : il faudrait $P(A) \\times P_A(B)$.\n⭐ Dans ce tableau, chaque case est le produit de son total de ligne et de son total de colonne : c'est cela, l'indépendance.",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0,1", "0,3", "0,4"], ["non A", "0,15", "0,45", "0,6"], ["Total", "0,25", "0,75", "1"]], [[0, 1]])),
          micros: ["alea_indep_produit"],
        },
        {
          enonce:
            "On donne $P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(D) = 0{,}6$, $P(A \\cap B) = 0{,}2$ et $P(A \\cap D) = 0{,}2$.\na) $A$ et $B$ sont-ils indépendants ?\nb) $A$ et $D$ sont-ils indépendants ?",
          correction:
            "On compare $P(A \\cap \\ldots)$ au produit des deux probabilités.\na) $P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$, et $P(A \\cap B) = 0{,}2$. Égalité : $A$ et $B$ sont indépendants.\nb) $P(A) \\times P(D) = 0{,}5 \\times 0{,}6 = 0{,}3$, mais $P(A \\cap D) = 0{,}2$. $0{,}3 \\neq 0{,}2$ : $A$ et $D$ ne sont pas indépendants.\n⭐ Une justification se termine toujours par une égalité vérifiée… ou refusée.",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0,2", "0,3", "0,5"], ["non A", "0,2", "0,3", "0,5"], ["Total", "0,4", "0,6", "1"]], [[0, 1], [0, 3], [2, 1]])),
          micros: ["alea_indep_justifier"],
        },
        {
          enonce:
            "On lance un dé équilibré. $A$ : « obtenir $1$ », $B$ : « obtenir $6$ ».\na) $A$ et $B$ sont-ils incompatibles ?\nb) Sont-ils indépendants ?",
          figure: de([1, 6]),
          correction:
            "a) On ne peut pas obtenir $1$ et $6$ sur le même lancer : $P(A \\cap B) = 0$. Ils sont incompatibles.\nb) $P(A) \\times P(B) = \\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$, alors que $P(A \\cap B) = 0$. Ils ne sont PAS indépendants.\nD'ailleurs, savoir que $B$ est arrivé rend $A$ impossible : $P_B(A) = 0 \\neq \\dfrac{1}{6}$.\n⛔ Incompatibles, c'est très LIÉS : l'un empêche l'autre.",
          micros: ["alea_indep_incompatible"],
        },
        {
          enonce:
            "Dans un lycée, on a interrogé $200$ élèves. On choisit un élève au hasard ; $E$ : « est né en été », $M$ : « joue d'un instrument de musique ». Les évènements $E$ et $M$ sont-ils indépendants ?",
          figure: tableauProba(["", "Musique", "Pas musique", "Total"], [["Né en été", "24", "56", "80"], ["Autre saison", "36", "84", "120"], ["Total", "60", "140", "200"]]),
          correction:
            "Sans information : $P(M) = \\dfrac{60}{200} = 0{,}3$.\nParmi les élèves nés en été : $P_E(M) = \\dfrac{24}{80} = 0{,}3$.\n$P_E(M) = P(M)$ : $E$ et $M$ sont indépendants.\n✔️ Avec le produit : $P(E) \\times P(M) = 0{,}4 \\times 0{,}3 = 0{,}12$, et $P(E \\cap M) = \\dfrac{24}{200} = 0{,}12$.\n⭐ Sur un tableau, l'indépendance se VOIT : la proportion de musiciens est la même sur chaque ligne ($\\dfrac{24}{80}$ et $\\dfrac{36}{120}$ valent tous deux $0{,}3$).",
          micros: ["alea_indep_definition", "alea_indep_justifier"],
        },
        {
          enonce: "Sur cet arbre, $A$ et $B$ sont-ils indépendants ? Justifier.",
          figure: arbre([
            { label: "A", proba: "0,6", enfants: [{ label: "B", proba: "0,3" }, { label: "non B", proba: "0,7" }] },
            { label: "non A", proba: "0,4", enfants: [{ label: "B", proba: "0,3" }, { label: "non B", proba: "0,7" }] },
          ]),
          correction:
            "On calcule $P(B)$ avec les deux chemins : $P(B) = 0{,}6 \\times 0{,}3 + 0{,}4 \\times 0{,}3 = 0{,}18 + 0{,}12 = 0{,}3$.\nSur la branche, $P_A(B) = 0{,}3$.\n$P_A(B) = P(B)$ : $A$ et $B$ sont indépendants.\n⭐ Sur un arbre, l'indépendance se VOIT : les branches derrière $A$ et derrière $\\overline{A}$ portent les mêmes nombres. Que $A$ arrive ou non, $B$ a la même probabilité.",
          micros: ["alea_indep_definition", "alea_indep_justifier"],
        },
        {
          enonce:
            "a) On lance deux dés équilibrés, un rouge et un bleu. Quelle est la probabilité d'obtenir deux $6$ ?\nb) On lance deux pièces équilibrées. Quelle est la probabilité d'obtenir deux fois « face » ?",
          correction:
            "a) Le dé bleu ne « sait » pas ce qu'a fait le dé rouge : les deux lancers sont indépendants.\n$P(\\text{deux } 6) = \\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$.\nb) De même : $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$.\n⭐ Deux objets physiques séparés, lancés sans lien : c'est l'exemple type de l'indépendance.",
          schema: ecranSeulement(arbre([{ label: "6", proba: "1/6", enfants: [{ label: "6 → 1/36", proba: "1/6" }, { label: "non 6", proba: "5/6" }] }, { label: "non 6", proba: "5/6", enfants: [{ label: "6", proba: "1/6" }, { label: "non 6", proba: "5/6" }] }])),
          micros: ["alea_indep_produit"],
        },
        {
          enonce:
            "On donne $P(A) = 0{,}3$ et $P(B) = 0{,}2$, et on sait que $A$ et $B$ sont incompatibles. Peuvent-ils être indépendants ?",
          correction:
            "Incompatibles : $P(A \\cap B) = 0$.\nS'ils étaient indépendants, on aurait $P(A \\cap B) = 0{,}3 \\times 0{,}2 = 0{,}06$.\n$0 \\neq 0{,}06$ : ils ne sont pas indépendants.\n⛔ Deux évènements incompatibles, de probabilités non nulles, ne sont JAMAIS indépendants.",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0", "0,3", "0,3"], ["non A", "0,2", "0,5", "0,7"], ["Total", "0,2", "0,8", "1"]], [[0, 1]])),
          micros: ["alea_indep_incompatible"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Calculer, comparer, puis conclure par une phrase : indépendants ou non, et ce que ça signifie.",
      rappel: [
        "Pour justifier avec un tableau : on compare $P(A \\cap B)$ et $P(A) \\times P(B)$, ou bien $P_A(B)$ et $P(B)$.",
        "Pour des expériences physiquement séparées (deux dés, deux composants, deux noyaux), l'indépendance est une HYPOTHÈSE naturelle : on multiplie.",
        "« Indépendants » se dit en français : « le fait de… ne dépend pas de… ».",
      ],
      exercices: [
        {
          titre: "Les lancers francs",
          enonce:
            "Une basketteuse tire deux lancers francs. $R_1$ : « le premier est réussi », $R_2$ : « le second est réussi ».\na) Les évènements $R_1$ et $R_2$ sont-ils indépendants ? Justifier sur l'arbre.\nb) Calculer la probabilité qu'elle réussisse les deux lancers.",
          figure: arbre([
            { label: "R1", proba: "0,8", enfants: [{ label: "R2", proba: "0,8" }, { label: "non R2", proba: "0,2" }] },
            { label: "non R1", proba: "0,2", enfants: [{ label: "R2", proba: "0,8" }, { label: "non R2", proba: "0,2" }] },
          ]),
          correction:
            "a) Derrière $R_1$ comme derrière $\\overline{R_1}$, $R_2$ a la probabilité $0{,}8$.\nDonc $P(R_2) = 0{,}8 \\times 0{,}8 + 0{,}2 \\times 0{,}8 = 0{,}8$, et $P_{R_1}(R_2) = 0{,}8 = P(R_2)$ : indépendants.\nRéussir ou rater le premier ne change rien au second.\nb) Par l'indépendance : $P(R_1 \\cap R_2) = 0{,}8 \\times 0{,}8 = 0{,}64$.\n⭐ Dans ce modèle, chaque tir est un nouveau départ : un tir raté ne fait pas rater le suivant.",
          micros: ["alea_indep_definition", "alea_indep_produit"],
        },
        {
          titre: "Le circuit en série",
          enonce:
            "Une lampe de poche contient un interrupteur ($I$ : « il fonctionne ») et une ampoule ($A$ : « elle fonctionne »), montés en série : la lampe s'allume seulement si les deux fonctionnent. $P(I) = 0{,}95$ et $P(A) = 0{,}9$, et les deux pannes sont indépendantes.\na) Calculer la probabilité que la lampe s'allume.\nb) En déduire la probabilité qu'elle ne s'allume pas.",
          correction:
            "a) En série, il faut $I$ ET $A$. Par l'indépendance : $P(I \\cap A) = 0{,}95 \\times 0{,}9 = 0{,}855$.\nb) L'évènement contraire : $1 - 0{,}855 = 0{,}145$.\n⚠️ Chaque composant est fiable à au moins $90$ %, mais la lampe ne l'est qu'à $85{,}5$ % : en série, les risques de panne s'accumulent.\n⭐ C'est pourquoi un circuit en série est d'autant plus fragile qu'il a de composants.",
          schema: arbre([
            { label: "I", proba: "0,95", enfants: [{ label: "A → 0,855", proba: "0,9" }, { label: "non A", proba: "0,1" }] },
            { label: "non I", proba: "0,05", enfants: [{ label: "A", proba: "0,9" }, { label: "non A", proba: "0,1" }] },
          ]),
          micros: ["alea_indep_produit"],
        },
        {
          titre: "Le vote et la région",
          enonce:
            "Un sondage (modèle) interroge $1\\,000$ électeurs du Nord et du Sud d'un pays. On choisit un électeur au hasard ; $N$ : « habite le Nord », $A$ : « vote pour la candidate A ».\na) Calculer $P(A)$, $P_N(A)$ et $P_{\\overline{N}}(A)$.\nb) $N$ et $A$ sont-ils indépendants ? Que signifie ce résultat ?",
          figure: tableauProba(["", "Vote A", "Autre", "Total"], [["Nord", "180", "220", "400"], ["Sud", "270", "330", "600"], ["Total", "450", "550", "1000"]]),
          correction:
            "a) $P(A) = \\dfrac{450}{1\\,000} = 0{,}45$. $P_N(A) = \\dfrac{180}{400} = 0{,}45$. $P_{\\overline{N}}(A) = \\dfrac{270}{600} = 0{,}45$.\nb) $P_N(A) = P(A)$ : $N$ et $A$ sont indépendants.\n✔️ $P(N) \\times P(A) = 0{,}4 \\times 0{,}45 = 0{,}18$ et $P(N \\cap A) = \\dfrac{180}{1\\,000} = 0{,}18$.\n« Dans ce sondage, le vote pour A ne dépend pas de la région : $45$ % au Nord comme au Sud. »\n⭐ Une carte électorale de ce pays serait d'une seule couleur pour cette candidate.",
          micros: ["alea_indep_definition", "alea_indep_justifier"],
        },
        {
          titre: "Le glacier et la météo",
          enonce:
            "Un glacier a noté, sur $100$ jours d'été, le temps qu'il faisait et ses ventes (modèle). On choisit un jour au hasard ; $B$ : « beau temps », $V$ : « bonne vente ».\na) Calculer $P(V)$ et $P_B(V)$.\nb) $B$ et $V$ sont-ils indépendants ? Justifier aussi avec le produit.",
          figure: tableauProba(["", "Bonne vente", "Faible", "Total"], [["Beau temps", "48", "12", "60"], ["Mauvais", "8", "32", "40"], ["Total", "56", "44", "100"]]),
          correction:
            "a) $P(V) = \\dfrac{56}{100} = 0{,}56$. Parmi les $60$ jours de beau temps : $P_B(V) = \\dfrac{48}{60} = 0{,}8$.\nb) $P_B(V) = 0{,}8 \\neq 0{,}56$ : savoir qu'il fait beau change la probabilité d'une bonne vente. Ils ne sont pas indépendants.\nAvec le produit : $P(B) \\times P(V) = 0{,}6 \\times 0{,}56 = 0{,}336$, mais $P(B \\cap V) = 0{,}48$. Pas d'égalité.\n⭐ Sans surprise : les ventes de glaces DÉPENDENT de la météo. Le glacier a donc intérêt à regarder les prévisions avant de commander.",
          micros: ["alea_indep_justifier"],
        },
        {
          titre: "La forêt et la maladie",
          enonce:
            "Dans une forêt (modèle), on choisit un arbre au hasard. $C$ : « c'est un chêne », $H$ : « c'est un hêtre », $M$ : « il est malade ». On sait que $P(C) = 0{,}4$, $P(H) = 0{,}3$, $P(M) = 0{,}1$, $P(C \\cap M) = 0{,}04$ et $P(H \\cap M) = 0{,}06$.\nPour chaque paire, dire si les évènements sont incompatibles, indépendants, ou ni l'un ni l'autre : $C$ et $H$ ; $C$ et $M$ ; $H$ et $M$.",
          correction:
            "$C$ et $H$ : un arbre ne peut pas être à la fois un chêne et un hêtre. $P(C \\cap H) = 0$ : incompatibles, donc pas indépendants.\n$C$ et $M$ : $P(C) \\times P(M) = 0{,}4 \\times 0{,}1 = 0{,}04 = P(C \\cap M)$. Indépendants : les chênes sont malades aussi souvent que les autres arbres.\n$H$ et $M$ : $P(H) \\times P(M) = 0{,}3 \\times 0{,}1 = 0{,}03$, mais $P(H \\cap M) = 0{,}06$. Ni indépendants, ni incompatibles.\n$P_H(M) = \\dfrac{0{,}06}{0{,}3} = 0{,}2$ : les hêtres sont deux fois plus souvent malades que l'ensemble des arbres.\n⭐ Trois paires, trois situations : il faut CALCULER à chaque fois.",
          schema: ecranSeulement(tableauProba(["", "Malade", "Sain", "Total"], [["Chêne", "0,04", "0,36", "0,4"], ["Hêtre", "0,06", "0,24", "0,3"], ["Autre", "0", "0,3", "0,3"], ["Total", "0,1", "0,9", "1"]], [[0, 1], [1, 1]])),
          micros: ["alea_indep_incompatible", "alea_indep_justifier"],
        },
        {
          titre: "Deux noyaux de radon",
          enonce:
            "Le radon 222 est un gaz radioactif naturel ; la demi-vie d'un noyau est d'environ $3{,}8$ jours. Un noyau a donc une chance sur deux d'être encore intact au bout de $3{,}8$ jours. On observe deux noyaux, qui se désintègrent indépendamment l'un de l'autre.\na) Quelle est la probabilité que les deux soient encore intacts au bout de $3{,}8$ jours ?\nb) Quelle est la probabilité qu'au moins un des deux se soit désintégré ?",
          correction:
            "a) Par l'indépendance : $P(\\text{deux intacts}) = 0{,}5 \\times 0{,}5 = 0{,}25$.\nb) « Au moins un désintégré » est le contraire de « deux intacts » : $1 - 0{,}25 = 0{,}75$.\n⭐ Les noyaux ne se « parlent » pas : chacun se désintègre au hasard, sans tenir compte des autres. C'est pourquoi la moitié d'un grand échantillon se désintègre en une demi-vie.",
          schema: arbre([
            { label: "Intact 1", proba: "0,5", enfants: [{ label: "Intact 2 → 0,25", proba: "0,5" }, { label: "Désint. 2", proba: "0,5" }] },
            { label: "Désint. 1", proba: "0,5", enfants: [{ label: "Intact 2", proba: "0,5" }, { label: "Désint. 2", proba: "0,5" }] },
          ]),
          micros: ["alea_indep_produit"],
        },
        {
          titre: "Le covoiturage",
          enonce:
            "Une enquête (modèle) interroge les actifs d'un département : $70$ % habitent en ville ($V$). Le diagramme donne la part de ceux qui covoiturent ($C$) parmi les urbains et parmi les ruraux.\na) Calculer $P(C)$.\nb) $V$ et $C$ sont-ils indépendants ?",
          figure: diagramme("barres", [
            { label: "Urbains (%)", value: 20 },
            { label: "Ruraux (%)", value: 20 },
          ]),
          correction:
            "a) On lit $P_V(C) = 0{,}2$ et $P_{\\overline{V}}(C) = 0{,}2$.\nDeux chemins : $P(C) = 0{,}7 \\times 0{,}2 + 0{,}3 \\times 0{,}2 = 0{,}14 + 0{,}06 = 0{,}2$.\nb) $P_V(C) = 0{,}2 = P(C)$ : $V$ et $C$ sont indépendants.\n« Dans ce département, covoiturer ne dépend pas du lieu de vie. »\n⭐ Deux barres de même hauteur : c'est le dessin de l'indépendance.",
          micros: ["alea_indep_definition", "alea_indep_justifier"],
        },
        {
          titre: "Les registres de mariage",
          enonce:
            "Pour mesurer l'instruction au XIXᵉ siècle, les historiens comptent les époux capables de signer le registre de leur mariage. On étudie $200$ mariages d'un canton vers $1870$ (modèle), soit $400$ époux. On choisit un époux au hasard ; $F$ : « c'est une femme », $S$ : « signe le registre ».\na) Calculer $P(S)$, $P_F(S)$ et $P_{\\overline{F}}(S)$.\nb) $F$ et $S$ sont-ils indépendants ? Interpréter.",
          figure: tableauProba(["", "Signe", "Ne signe pas", "Total"], [["Hommes", "160", "40", "200"], ["Femmes", "120", "80", "200"], ["Total", "280", "120", "400"]]),
          correction:
            "a) $P(S) = \\dfrac{280}{400} = 0{,}7$. $P_F(S) = \\dfrac{120}{200} = 0{,}6$. $P_{\\overline{F}}(S) = \\dfrac{160}{200} = 0{,}8$.\nb) $P_F(S) = 0{,}6 \\neq 0{,}7$ : pas indépendants.\nAvec le produit : $P(F) \\times P(S) = 0{,}5 \\times 0{,}7 = 0{,}35$, mais $P(F \\cap S) = \\dfrac{120}{400} = 0{,}3$.\n« Dans ce canton, savoir signer dépend du sexe : les femmes signent moins souvent que les hommes. »\n⭐ Les lois Ferry de $1881$-$1882$ rendent l'école primaire gratuite, obligatoire et laïque, pour les filles comme pour les garçons.",
          micros: ["alea_indep_justifier"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Démontrer ou supposer l'indépendance, calculer, puis dire ce que le résultat signifie.",
      rappel: [
        "Indépendants : $P(A \\cap B) = P(A) \\times P(B)$. Incompatibles : $P(A \\cap B) = 0$.",
        "« Au moins un » est le contraire de « aucun » : $P(\\text{au moins un}) = 1 - P(\\text{aucun})$.",
      ],
      exercices: [
        {
          titre: "Les détecteurs de fumée",
          enonce:
            "Un couloir est équipé de deux détecteurs de fumée qui fonctionnent indépendamment. Chacun détecte un début d'incendie avec la probabilité $0{,}9$.\na) Calculer la probabilité qu'aucun des deux ne le détecte.\nb) En déduire la probabilité que l'alarme sonne, c'est-à-dire qu'au moins un détecteur réagisse.\nc) Avec trois détecteurs identiques, quelle serait cette probabilité ?",
          correction:
            "a) Un détecteur manque l'incendie avec la probabilité $1 - 0{,}9 = 0{,}1$. Par l'indépendance : $0{,}1 \\times 0{,}1 = 0{,}01$.\nb) $1 - 0{,}01 = 0{,}99$.\n✔️ Par l'arbre : $0{,}81 + 0{,}09 + 0{,}09 = 0{,}99$.\nc) Aucun des trois : $0{,}1 \\times 0{,}1 \\times 0{,}1 = 0{,}001$. L'alarme sonne avec la probabilité $1 - 0{,}001 = 0{,}999$.\n⭐ En parallèle, la redondance rend le système presque sûr. C'est le contraire du circuit en série de l'exercice 10.\n⚠️ Tout repose sur l'indépendance : deux détecteurs branchés sur la même pile tomberaient en panne ensemble.",
          schema: arbre([
            { label: "D1", proba: "0,9", enfants: [{ label: "D2 → 0,81", proba: "0,9" }, { label: "non D2 → 0,09", proba: "0,1" }] },
            { label: "non D1", proba: "0,1", enfants: [{ label: "D2 → 0,09", proba: "0,9" }, { label: "non D2 → 0,01", proba: "0,1" }] },
          ]),
          micros: ["alea_indep_produit"],
        },
        {
          titre: "Les deux machines",
          enonce:
            "Dans un atelier, la machine 1 tombe en panne dans la journée ($P_1$) avec la probabilité $0{,}1$, et la machine 2 ($P_2$) avec la probabilité $0{,}05$. Leurs pannes sont indépendantes.\na) Calculer la probabilité que les deux soient en panne.\nb) Calculer la probabilité qu'au moins une soit en panne.\nc) Calculer la probabilité qu'exactement une soit en panne.\nd) Le chef d'atelier dit : « les pannes sont indépendantes, donc elles ne peuvent pas arriver le même jour ». Qu'a-t-il confondu ?",
          figure: arbre([
            { label: "P1", proba: "0,1", enfants: [{ label: "P2", proba: "0,05" }, { label: "non P2", proba: "0,95" }] },
            { label: "non P1", proba: "0,9", enfants: [{ label: "P2", proba: "0,05" }, { label: "non P2", proba: "0,95" }] },
          ]),
          correction:
            "a) $P(P_1 \\cap P_2) = 0{,}1 \\times 0{,}05 = 0{,}005$.\nb) Aucune panne : $0{,}9 \\times 0{,}95 = 0{,}855$. Au moins une : $1 - 0{,}855 = 0{,}145$.\nc) Deux chemins : $0{,}1 \\times 0{,}95 = 0{,}095$ et $0{,}9 \\times 0{,}05 = 0{,}045$. Exactement une : $0{,}095 + 0{,}045 = 0{,}14$.\n✔️ $0{,}005 + 0{,}14 + 0{,}855 = 1$.\nd) Il a confondu indépendantes et incompatibles. Ne pas pouvoir arriver le même jour, ce serait $P(P_1 \\cap P_2) = 0$ ; or elle vaut $0{,}005$.\n⭐ Sur $1\\,000$ jours, les deux machines tombent en panne ensemble environ $5$ jours.",
          micros: ["alea_indep_produit", "alea_indep_incompatible"],
        },
        {
          titre: "Les cadres et la ville",
          enonce:
            "Dans une région (modèle), on choisit un actif au hasard ; $U$ : « habite en zone urbaine », $C$ : « est cadre ».\na) Calculer $P(U)$ et $P(C)$. Si $U$ et $C$ étaient indépendants, combien de cadres urbains devrait-on compter ?\nb) $U$ et $C$ sont-ils indépendants ?\nc) Calculer $P_U(C)$ et $P_{\\overline{U}}(C)$, et interpréter.",
          figure: tableauProba(["", "Cadre", "Non cadre", "Total"], [["Urbain", "150", "450", "600"], ["Rural", "50", "350", "400"], ["Total", "200", "800", "1000"]]),
          correction:
            "a) $P(U) = \\dfrac{600}{1\\,000} = 0{,}6$ et $P(C) = \\dfrac{200}{1\\,000} = 0{,}2$.\nSi indépendants : $P(U \\cap C) = 0{,}6 \\times 0{,}2 = 0{,}12$, soit $120$ cadres urbains sur $1\\,000$.\nb) On en compte $150$, pas $120$ : $U$ et $C$ ne sont pas indépendants.\nc) $P_U(C) = \\dfrac{150}{600} = 0{,}25$ et $P_{\\overline{U}}(C) = \\dfrac{50}{400} = 0{,}125$.\nUn urbain est deux fois plus souvent cadre qu'un rural.\n⭐ Les géographes parlent de métropolisation : les emplois les plus qualifiés se concentrent dans les grandes villes.",
          micros: ["alea_indep_justifier"],
        },
        {
          titre: "Les pièges photographiques",
          enonce:
            "Pour prouver la présence d'un lynx dans une forêt, des naturalistes installent deux pièges photographiques éloignés l'un de l'autre. Pendant un mois, le premier photographie le lynx avec la probabilité $0{,}3$, le second avec la probabilité $0{,}4$, indépendamment.\na) Calculer la probabilité que les deux le photographient.\nb) Calculer la probabilité qu'au moins un le photographie.\nc) Combien de pièges comme le premier faudrait-il pour avoir plus de $90$ % de chances d'au moins une photo ?",
          correction:
            "a) $0{,}3 \\times 0{,}4 = 0{,}12$.\nb) Aucune photo : $0{,}7 \\times 0{,}6 = 0{,}42$. Au moins une : $1 - 0{,}42 = 0{,}58$.\nc) Avec $n$ pièges à $0{,}3$, aucune photo a la probabilité $0{,}7^n$. On veut $1 - 0{,}7^n > 0{,}9$, soit $0{,}7^n < 0{,}1$.\nÀ la calculatrice : $0{,}7^6 \\approx 0{,}118$ (trop) et $0{,}7^7 \\approx 0{,}082$ (assez). Il faut $7$ pièges.\n⭐ Chaque piège ajoute peu, mais « aucune photo » devient vite rare : c'est la force de l'évènement contraire.",
          schema: ecranSeulement(
            arbre([
              { label: "Photo 1", proba: "0,3", enfants: [{ label: "Photo 2 → 0,12", proba: "0,4" }, { label: "non 2 → 0,18", proba: "0,6" }] },
              { label: "non 1", proba: "0,7", enfants: [{ label: "Photo 2 → 0,28", proba: "0,4" }, { label: "non 2 → 0,42", proba: "0,6" }] },
            ]),
          ),
          micros: ["alea_indep_produit"],
        },
      ],
    },
  ],
};
