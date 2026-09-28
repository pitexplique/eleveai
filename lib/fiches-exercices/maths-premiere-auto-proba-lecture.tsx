// ─── Fiche d'exercices : lire une probabilité dans un tableau ou un arbre ────
//                   (1re, automatismes) — 20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : des effectifs ronds, des fractions qui se simplifient.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts`
// (notionId auto_proba_lecture) : lire P(A ∩ B) dans une case, lire P_A(B) sur
// une ligne, distinguer les trois quotients. Les tableaux de 120 sportifs, de
// 1 000 clients d'une compagnie aérienne et de 1 000 lycéens reprennent la
// FORME des exercices 1 des sujets de juin 2026 (Métropole, Centres étrangers,
// Asie), avec d'autres nombres.
// ⛔ Pas de formule des probabilités totales nommée : sur un arbre, on
// ADDITIONNE les chemins (exercices 18 et 20), comme en seconde.
//
// ⭐⭐ LE FIL : MÊME CASE, TROIS DÉNOMINATEURS. Le total général pour
// P(A ∩ B), le total de A pour P_A(B), le total de B pour P_B(A).
// ⛔ LE PIÈGE CENTRAL : P_A(B) n'est pas P_B(A) (exercices 3, 8, 9, 12, 16,
// 18, 19, 20) — un détecteur de fraude fiable à 90 % ne signale une vraie
// fraude qu'une fois sur onze (exercice 16).
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (tableaux croisés et arbres, la case
// ou la branche lue MISE EN ÉVIDENCE dans le corrigé) et un lien à l'ÉCONOMIE
// ou à l'HISTOIRE-GÉO (satisfaction des clients, vote par âge, emploi des
// diplômés, chômage des jeunes, trajets domicile-travail, fraude bancaire,
// retours d'achats en ligne, sondage et vote réel). Les chiffres sont des
// MODÈLES arrondis, jamais présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-proba-lecture.mjs`.
//
// Micro-compétences : auto_proba_conditionnelle_lecture (2, 3, 4, 5, 8, 9, 10,
// 11, 14, 15, 16, 17, 18, 19, 20), auto_proba_intersection_tableau (1, 4, 6,
// 9, 10, 12, 14, 17, 19, 20), auto_proba_distinguer (3, 4, 6, 7, 8, 9, 10, 11,
// 12, 13, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoProbaLecturePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-proba-lecture",
  titre: "Lire une probabilité dans un tableau ou un arbre",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : lire P(A ∩ B) dans une case d'un tableau croisé, lire une probabilité conditionnelle sur une ligne ou sur une branche d'arbre, et ne plus confondre « B sachant A » et « A sachant B ». Clients d'une compagnie aérienne, vote par âge, emploi des diplômés, chômage des jeunes, fraude bancaire, achats en ligne. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par exercice : la case, puis le bon dénominateur.",
      rappel: [
        "$P(A \\cap B)$ se lit « $A$ ET $B$ ». Dans un tableau croisé : la CASE, divisée par le TOTAL général.",
        "$P_A(B)$ se lit « $B$ sachant $A$ » : on se place PARMI les $A$. La case, divisée par le total de la ligne (ou de la colonne) de $A$.",
        "Même case, trois dénominateurs : le total pour $P(A \\cap B)$, le total de $A$ pour $P_A(B)$, le total de $B$ pour $P_B(A)$.",
        "Sur un arbre, les branches du deuxième niveau portent des probabilités CONDITIONNELLES. Pour $P(A \\cap B)$, on MULTIPLIE le long du chemin.",
      ],
      exercices: [
        {
          enonce: "Un centre d'entraînement accueille $120$ sportifs, en judo ou en natation, au niveau espoir ou élite. On choisit un sportif au hasard. On note $J$ « faire du judo » et $E$ « être au niveau élite ».\nQuelle est la probabilité $P(J \\cap E)$ que le sportif fasse du judo ET soit au niveau élite ?",
          figure: tableauProba(["", "Espoir", "Élite", "Total"], [["Judo", "36", "12", "48"], ["Natation", "48", "24", "72"], ["Total", "84", "36", "120"]]),
          correction:
            "« Judo ET élite » : c'est UNE case, au croisement de la ligne Judo et de la colonne Élite. Elle contient $12$ sportifs.\nOn divise par le TOTAL, puisqu'on choisit parmi tous les sportifs : $P(J \\cap E) = \\dfrac{12}{120} = \\dfrac{1}{10}$.\n⚠️ Le piège : diviser par $48$ (les judokas) ou par $36$ (les élites). Ce seraient des probabilités « sachant », pas « et ».",
          micros: ["auto_proba_intersection_tableau"],
        },
        {
          enonce: "Avec le tableau de l'exercice 1, on choisit un JUDOKA au hasard. Quelle est la probabilité qu'il soit au niveau élite ?",
          correction:
            "« Parmi les judokas » : on se place sur la ligne Judo, qui compte $48$ sportifs.\nParmi eux, $12$ sont élites : $P_J(E) = \\dfrac{12}{48} = \\dfrac{1}{4}$.\n⭐ Le dénominateur est le total de la LIGNE, pas le total général.",
          schema: ecranSeulement(tableauProba(["", "Espoir", "Élite", "Total"], [["Judo", "36", "12", "48"], ["Natation", "48", "24", "72"], ["Total", "84", "36", "120"]], [[0, 2], [0, 3]])),
          micros: ["auto_proba_conditionnelle_lecture"],
        },
        {
          enonce: "Toujours avec le même tableau, on choisit un sportif de niveau ÉLITE au hasard. Quelle est la probabilité qu'il fasse du judo ? Comparer avec l'exercice 2.",
          correction:
            "« Parmi les élites » : on se place dans la colonne Élite, qui compte $36$ sportifs.\nParmi eux, $12$ font du judo : $P_E(J) = \\dfrac{12}{36} = \\dfrac{1}{3}$.\nÀ l'exercice 2, $P_J(E) = \\dfrac{1}{4}$.\n⛔ Même case, $12$ sportifs, mais deux questions et deux réponses : $P_E(J) \\neq P_J(E)$. Ce qui est APRÈS « sachant » donne le dénominateur.",
          schema: tableauProba(["", "Espoir", "Élite", "Total"], [["Judo", "36", "12", "48"], ["Natation", "48", "24", "72"], ["Total", "84", "36", "120"]], [[0, 2], [2, 2]]),
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          enonce: "Le tableau donne directement des PROBABILITÉS.\na) Lire $P(A \\cap B)$ et $P(A)$.\nb) Calculer $P_A(B)$ puis $P_B(A)$.",
          figure: tableauProba(["", "B", "non B", "Total"], [["A", "0,12", "0,28", "0,4"], ["non A", "0,24", "0,36", "0,6"], ["Total", "0,36", "0,64", "1"]]),
          correction:
            "a) $P(A \\cap B)$ est la case au croisement de $A$ et de $B$ : $0{,}12$. $P(A)$ est le total de la ligne $A$ : $0{,}4$.\nb) $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0{,}12}{0{,}4} = 0{,}3$.\n$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}12}{0{,}36} = \\dfrac{1}{3}$.\n⭐ Dans un tableau de probabilités, le total général vaut $1$ : la case se lit donc directement comme $P(A \\cap B)$.",
          micros: ["auto_proba_intersection_tableau", "auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          enonce: "Lire sur cet arbre pondéré : $P(A)$, $P_A(B)$, $P(\\overline{A})$ et $P_{\\overline{A}}(\\overline{B})$.",
          figure: arbre([
            { label: "A", proba: "0,6", enfants: [{ label: "B", proba: "0,3" }, { label: "non B", proba: "0,7" }] },
            { label: "non A", proba: "0,4", enfants: [{ label: "B", proba: "0,5" }, { label: "non B", proba: "0,5" }] },
          ]),
          correction:
            "Le premier niveau porte $P(A) = 0{,}6$ et $P(\\overline{A}) = 0{,}4$.\nLa branche qui part de $A$ vers $B$ porte $P_A(B) = 0{,}3$ : c'est une probabilité SACHANT $A$.\nLa branche qui part de $\\overline{A}$ vers $\\overline{B}$ porte $P_{\\overline{A}}(\\overline{B}) = 0{,}5$.\n⚠️ Le piège : lire $0{,}3$ comme $P(B)$. Une branche du deuxième niveau dépend toujours du nœud d'où elle part.",
          micros: ["auto_proba_conditionnelle_lecture"],
        },
        {
          enonce: "Avec l'arbre de l'exercice 5, calculer $P(A \\cap B)$ et $P(\\overline{A} \\cap B)$.",
          correction:
            "On multiplie le long de chaque chemin.\n$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}6 \\times 0{,}3 = 0{,}18$.\n$P(\\overline{A} \\cap B) = 0{,}4 \\times 0{,}5 = 0{,}2$.\n⛔ Le piège : répondre $P(A \\cap B) = 0{,}3$. $0{,}3$ est la probabilité de $B$ PARMI $A$ ; il faut encore tomber dans $A$.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,6", enfants: [{ label: "B → 0,18", proba: "0,3" }, { label: "non B", proba: "0,7" }] },
              { label: "non A", proba: "0,4", enfants: [{ label: "B → 0,2", proba: "0,5" }, { label: "non B", proba: "0,5" }] },
            ]),
          ),
          micros: ["auto_proba_intersection_tableau", "auto_proba_distinguer"],
        },
        {
          enonce: "On note $M$ « être malade » et $T$ « avoir un test positif ». Traduire chaque phrase par une probabilité.\na) « Parmi les malades, $95$ % ont un test positif. »\nb) « $2$ % des personnes sont malades et ont un test positif. »\nc) « Parmi les tests positifs, $40$ % correspondent à des malades. »",
          correction:
            "a) « Parmi les malades » : on SAIT que la personne est malade. $P_M(T) = 0{,}95$.\nb) « Malades ET positives », parmi toutes les personnes : $P(M \\cap T) = 0{,}02$.\nc) « Parmi les tests positifs » : on SAIT que le test est positif. $P_T(M) = 0{,}4$.\n⭐ Le mot « parmi » annonce le « sachant » : ce qui le suit va en INDICE.\n⚠️ a) et c) parlent des mêmes personnes, malades et positives, mais pas vues du même côté : $0{,}95$ et $0{,}4$.",
          micros: ["auto_proba_distinguer"],
        },
        {
          enonce: "Une classe de $30$ élèves compte $18$ filles. $12$ élèves font du latin, dont $9$ filles. On choisit un élève au hasard ; $L$ : « faire du latin », $F$ : « être une fille ».\nCalculer $P(L \\cap F)$, $P_L(F)$ et $P_F(L)$.",
          correction:
            "On range les effectifs dans un tableau : latinistes $9$ filles et $3$ garçons ; non-latinistes $9$ filles et $9$ garçons.\n$P(L \\cap F) = \\dfrac{9}{30} = 0{,}3$ : on divise par TOUTE la classe.\n$P_L(F) = \\dfrac{9}{12} = \\dfrac{3}{4}$ : parmi les $12$ latinistes.\n$P_F(L) = \\dfrac{9}{18} = \\dfrac{1}{2}$ : parmi les $18$ filles.\n⭐ Trois quarts des latinistes sont des filles, mais seule une fille sur deux fait du latin.",
          schema: ecranSeulement(tableauProba(["", "Filles", "Garçons", "Total"], [["Latin", "9", "3", "12"], ["Pas latin", "9", "9", "18"], ["Total", "18", "12", "30"]], [[0, 1]])),
          micros: ["auto_proba_distinguer", "auto_proba_conditionnelle_lecture"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Compléter, lire, puis dire en une phrase ce que la probabilité signifie. Sans calculatrice.",
      rappel: [
        "Pour compléter un tableau croisé : les cases d'une ligne font le total de la ligne, les cases d'une colonne le total de la colonne.",
        "Un pourcentage « parmi les… » est une probabilité CONDITIONNELLE : il va sur une branche du deuxième niveau, ou se calcule sur une ligne.",
        "Pour passer d'un arbre à un tableau, on raisonne sur un effectif simple : $100$, $1\\,000$, $10\\,000$ personnes.",
      ],
      exercices: [
        {
          titre: "La compagnie aérienne",
          enonce: "Une compagnie aérienne interroge $1\\,000$ clients : ont-ils acheté leur billet en agence ou sur internet, et sont-ils satisfaits ? On choisit un client au hasard.\na) Quelle est la probabilité qu'il ait acheté sur internet ET soit satisfait ?\nb) Parmi les clients d'internet, quelle est la probabilité d'être satisfait ? Et parmi ceux d'agence ?\nc) Quel canal donne les clients les plus souvent satisfaits ?\nd) Un client est satisfait. Quelle est la probabilité qu'il ait acheté sur internet ?",
          figure: tableauProba(["", "Satisfait", "Non satisfait", "Total"], [["Agence", "160", "40", "200"], ["Internet", "560", "240", "800"], ["Total", "720", "280", "1000"]]),
          correction:
            "a) La case Internet × Satisfait : $\\dfrac{560}{1\\,000} = 0{,}56$.\nb) Internet : $\\dfrac{560}{800} = 0{,}7$. Agence : $\\dfrac{160}{200} = 0{,}8$.\nc) L'agence : $80$ % de satisfaits contre $70$ %.\n⚠️ Pourtant il y a bien plus de satisfaits sur internet ($560$ contre $160$) : c'est un NOMBRE, pas une proportion. Internet a quatre fois plus de clients.\nd) Parmi les $720$ satisfaits : $P_S(I) = \\dfrac{560}{720} = \\dfrac{7}{9} \\approx 0{,}78$.\n⭐ b) et d) utilisent la même case, $560$, avec deux dénominateurs : $800$ et $720$.",
          micros: ["auto_proba_intersection_tableau", "auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Le vote par âge",
          enonce: "Un institut interroge $500$ électeurs (modèle). $200$ ont moins de $35$ ans, dont $110$ déclarent qu'ils iront voter. Parmi les $300$ autres, $240$ iront voter. On choisit un électeur au hasard ; $J$ : « avoir moins de $35$ ans », $V$ : « aller voter ».\na) Compléter un tableau croisé.\nb) Calculer $P(J \\cap V)$, $P_J(V)$ et $P_{\\overline{J}}(V)$. Commenter.\nc) Calculer $P_V(J)$.",
          correction:
            "a) Moins de $35$ ans : $110$ votent, $200 - 110 = 90$ non. $35$ ans et plus : $240$ votent, $60$ non. Votants : $350$ ; abstentionnistes : $150$.\nb) $P(J \\cap V) = \\dfrac{110}{500} = 0{,}22$.\n$P_J(V) = \\dfrac{110}{200} = 0{,}55$ et $P_{\\overline{J}}(V) = \\dfrac{240}{300} = 0{,}8$.\nLes moins de $35$ ans déclarent moins souvent aller voter : $55$ % contre $80$ %.\nc) Parmi les $350$ votants : $P_V(J) = \\dfrac{110}{350} = \\dfrac{11}{35} \\approx 0{,}31$.\n⛔ Le piège : confondre $P_J(V) = 0{,}55$ (la participation des jeunes) et $P_V(J) \\approx 0{,}31$ (la part des jeunes parmi les votants).",
          schema: ecranSeulement(tableauProba(["", "Vote", "Ne vote pas", "Total"], [["Moins de 35 ans", "110", "90", "200"], ["35 ans et plus", "240", "60", "300"], ["Total", "350", "150", "500"]], [[0, 1], [0, 3], [2, 1]])),
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_intersection_tableau", "auto_proba_distinguer"],
        },
        {
          titre: "L'emploi des diplômés",
          enonce: "Dans une région (modèle), $60$ % des jeunes sortis de formation ont un diplôme du supérieur ($S$). Parmi eux, $90$ % ont un emploi ($E$) trois ans après ; parmi les autres, $70$ %.\na) Construire l'arbre pondéré.\nb) Lire $P_S(E)$. Calculer $P(S \\cap E)$ et $P(\\overline{S} \\cap E)$.",
          correction:
            "a) Premier niveau : $P(S) = 0{,}6$, $P(\\overline{S}) = 0{,}4$. Deuxième niveau : $P_S(E) = 0{,}9$, $P_S(\\overline{E}) = 0{,}1$ ; $P_{\\overline{S}}(E) = 0{,}7$, $P_{\\overline{S}}(\\overline{E}) = 0{,}3$.\nb) $P_S(E) = 0{,}9$, lu sur la branche $S \\to E$.\n$P(S \\cap E) = 0{,}6 \\times 0{,}9 = 0{,}54$ et $P(\\overline{S} \\cap E) = 0{,}4 \\times 0{,}7 = 0{,}28$.\n⭐ « Parmi eux, $90$ % » va sur la branche derrière $S$ : c'est une probabilité sachant $S$.\n⚠️ $0{,}9$ n'est pas la part des jeunes qui ont un emploi : c'est la part PARMI les diplômés du supérieur.",
          schema: arbre([
            { label: "S", proba: "0,6", enfants: [{ label: "E → 0,54", proba: "0,9" }, { label: "non E", proba: "0,1" }] },
            { label: "non S", proba: "0,4", enfants: [{ label: "E → 0,28", proba: "0,7" }, { label: "non E", proba: "0,3" }] },
          ]),
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "De l'arbre au tableau",
          enonce: "Reprendre l'exercice 11 avec $1\\,000$ jeunes.\na) Compléter le tableau croisé des effectifs.\nb) Y lire $P(S \\cap E)$.\nc) Un jeune a un emploi. Quelle est, à peu près, la probabilité qu'il soit diplômé du supérieur ?",
          correction:
            "a) Supérieur : $600$ jeunes, dont $0{,}9 \\times 600 = 540$ en emploi et $60$ sans. Autres : $400$, dont $0{,}7 \\times 400 = 280$ en emploi et $120$ sans. En emploi : $540 + 280 = 820$ ; sans emploi : $180$.\nb) La case Supérieur × Emploi, sur le total : $\\dfrac{540}{1\\,000} = 0{,}54$. C'est bien le résultat de l'arbre.\nc) Parmi les $820$ jeunes en emploi, $540$ sont diplômés du supérieur : $P_E(S) = \\dfrac{540}{820}$.\nLes deux tiers de $820$ font environ $547$ : $P_E(S)$ vaut environ $\\dfrac{2}{3}$.\n⭐ L'arbre donnait $P_S(E) = 0{,}9$ ; le tableau donne l'autre sens, $P_E(S) \\approx 0{,}66$.",
          schema: ecranSeulement(tableauProba(["Sur 1000", "Emploi", "Sans emploi", "Total"], [["Supérieur", "540", "60", "600"], ["Autres", "280", "120", "400"], ["Total", "820", "180", "1000"]], [[0, 1], [2, 1]])),
          micros: ["auto_proba_intersection_tableau", "auto_proba_distinguer"],
        },
        {
          titre: "Le soir de l'élection",
          enonce: "Un sondage réalisé à la sortie des urnes (modèle) donne trois phrases. On choisit un votant au hasard ; $J$ : « avoir moins de $35$ ans », $A$ : « avoir voté pour la candidate A ».\n« $30$ % des votants ont moins de $35$ ans. » « Parmi les moins de $35$ ans, $40$ % ont voté A. » « $25$ % des électeurs de A ont moins de $35$ ans. »\na) Traduire chaque phrase par une probabilité.\nb) Calculer $P(J \\cap A)$, puis en déduire $P(A)$.",
          correction:
            "a) $P(J) = 0{,}3$ ; « parmi les moins de $35$ ans » : $P_J(A) = 0{,}4$ ; « des électeurs de A » : $P_A(J) = 0{,}25$.\nb) $P(J \\cap A) = P(J) \\times P_J(A) = 0{,}3 \\times 0{,}4 = 0{,}12$.\nOr $P_A(J) = \\dfrac{P(J \\cap A)}{P(A)}$, donc $P(A) = \\dfrac{0{,}12}{0{,}25} = 0{,}48$.\nLa candidate A a obtenu environ $48$ % des voix.\n⭐ Les deux phrases conditionnelles ont servi DANS LES DEUX SENS : l'une pour trouver $P(J \\cap A)$, l'autre pour remonter à $P(A)$.",
          micros: ["auto_proba_distinguer"],
        },
        {
          titre: "Le chômage et le diplôme",
          enonce: "On a interrogé $400$ actifs (modèle). $160$ sont diplômés du supérieur, dont $8$ au chômage ; parmi les $240$ autres, $24$ sont au chômage. On choisit un actif au hasard ; $D$ : « diplômé du supérieur », $C$ : « au chômage ».\na) Calculer $P(D \\cap C)$.\nb) Calculer le taux de chômage des diplômés, $P_D(C)$, puis celui des autres.\nc) Un actif est au chômage. Quelle est la probabilité qu'il soit diplômé du supérieur ?",
          correction:
            "a) $8$ actifs sont diplômés ET au chômage : $P(D \\cap C) = \\dfrac{8}{400} = 0{,}02$.\nb) Parmi les $160$ diplômés : $P_D(C) = \\dfrac{8}{160} = 0{,}05$. Parmi les $240$ autres : $\\dfrac{24}{240} = 0{,}1$.\nLe taux de chômage est deux fois plus faible chez les diplômés du supérieur.\nc) Chômeurs : $8 + 24 = 32$. Parmi eux, $8$ diplômés : $P_C(D) = \\dfrac{8}{32} = 0{,}25$.\n⛔ Le piège : $0{,}02$, $0{,}05$ et $0{,}25$ ont tous le même numérateur, $8$. Seul le dénominateur dit de qui on parle.",
          schema: ecranSeulement(tableauProba(["", "En emploi", "Chômage", "Total"], [["Diplômés", "152", "8", "160"], ["Autres", "216", "24", "240"], ["Total", "368", "32", "400"]], [[0, 2], [0, 3], [2, 2]])),
          micros: ["auto_proba_intersection_tableau", "auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Les trajets domicile-travail",
          enonce: "Dans une agglomération (modèle), on choisit au hasard un trajet domicile-travail ; $V$ : « le trajet se fait en voiture », $L$ : « le trajet dépasse $10$ km ». Lire sur l'arbre $P(V)$ et $P_V(L)$, puis calculer $P(V \\cap L)$ et $P(\\overline{V} \\cap L)$.",
          figure: arbre([
            { label: "V", proba: "0,7", enfants: [{ label: "L", proba: "0,8" }, { label: "non L", proba: "0,2" }] },
            { label: "non V", proba: "0,3", enfants: [{ label: "L", proba: "0,25" }, { label: "non L", proba: "0,75" }] },
          ]),
          correction:
            "Premier niveau : $P(V) = 0{,}7$. Branche $V \\to L$ : $P_V(L) = 0{,}8$, « parmi les trajets en voiture, $80$ % dépassent $10$ km ».\n$P(V \\cap L) = 0{,}7 \\times 0{,}8 = 0{,}56$.\n$P(\\overline{V} \\cap L) = 0{,}3 \\times 0{,}25 = 0{,}075$.\n⚠️ $0{,}8$ n'est pas la part des trajets longs : c'est leur part PARMI les trajets en voiture.\n⭐ Les longs trajets se font presque tous en voiture : $0{,}56$ contre $0{,}075$. C'est là que se jouent les politiques de transport.",
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Le détecteur de fraude",
          enonce: "Une banque teste un détecteur de fraude sur $10\\,000$ paiements (modèle). $20$ sont frauduleux ; le détecteur en signale $18$. Il signale aussi, à tort, $180$ paiements honnêtes.\na) Compléter un tableau croisé.\nb) Calculer $P_F(S)$, la probabilité qu'une fraude soit signalée.\nc) Un paiement est signalé. Quelle est la probabilité que ce soit vraiment une fraude ?",
          correction:
            "a) Fraudes : $18$ signalées, $2$ non. Paiements honnêtes : $9\\,980$, dont $180$ signalés et $9\\,800$ non. Signalés : $18 + 180 = 198$.\nb) Parmi les $20$ fraudes : $P_F(S) = \\dfrac{18}{20} = 0{,}9$. Le détecteur attrape $90$ % des fraudes.\nc) Parmi les $198$ paiements signalés : $P_S(F) = \\dfrac{18}{198} = \\dfrac{1}{11} \\approx 0{,}09$.\nUne alerte sur onze seulement est une vraie fraude.\n⛔ Le piège : répondre $0{,}9$ au c). Les paiements honnêtes sont si NOMBREUX que leurs fausses alertes noient les vraies.",
          schema: tableauProba(["Sur 10000", "Signalé", "Non signalé", "Total"], [["Fraude", "18", "2", "20"], ["Honnête", "180", "9800", "9980"], ["Total", "198", "9802", "10000"]], [[0, 1], [2, 1]]),
          micros: ["auto_proba_distinguer", "auto_proba_conditionnelle_lecture"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Tableau ou arbre, la bonne question, puis une phrase qui dit ce que ça signifie. Sans calculatrice.",
      rappel: [
        "Avant chaque calcul, on se demande : PARMI QUI ? La réponse donne le dénominateur.",
        "Sur un arbre, on multiplie le long d'un chemin, et on additionne les chemins qui mènent au même évènement.",
        "Pour « retourner » un arbre, on passe par un tableau d'effectifs : $1\\,000$ personnes suffisent souvent.",
      ],
      exercices: [
        {
          titre: "Le projet du lycée",
          enonce: "Un lycée consulte ses $1\\,000$ élèves sur un projet. On choisit un élève au hasard ; $F$ : « être favorable », $T$ : « être en terminale ».\na) Quelle est la probabilité qu'un élève soit en première ET favorable ?\nb) Calculer $P_T(F)$ et $P_F(T)$.\nc) Le proviseur dit : « $60$ % des élèves sont favorables, donc $60$ % des terminales le sont aussi. » A-t-il raison ?\nd) Dans quel niveau le projet a-t-il le plus de soutien, en proportion ?",
          figure: tableauProba(["", "Favorable", "Défavorable", "Total"], [["Seconde", "240", "110", "350"], ["Première", "200", "150", "350"], ["Terminale", "160", "140", "300"], ["Total", "600", "400", "1000"]]),
          correction:
            "a) La case Première × Favorable, sur le total : $\\dfrac{200}{1\\,000} = 0{,}2$.\nb) Parmi les $300$ terminales : $P_T(F) = \\dfrac{160}{300} = \\dfrac{8}{15} \\approx 0{,}53$.\nParmi les $600$ favorables : $P_F(T) = \\dfrac{160}{600} = \\dfrac{4}{15} \\approx 0{,}27$.\nc) Non : $P(F) = \\dfrac{600}{1\\,000} = 0{,}6$ pour tout le lycée, mais $P_T(F) \\approx 0{,}53$ chez les terminales. La moyenne du lycée ne s'applique pas à chaque niveau.\nd) Seconde : $\\dfrac{240}{350} = \\dfrac{24}{35} \\approx 0{,}69$. Première : $\\dfrac{200}{350} = \\dfrac{4}{7} \\approx 0{,}57$. Terminale : $\\approx 0{,}53$. C'est en seconde.\n⭐ Pour comparer des groupes de tailles différentes, on compare des probabilités « sachant », jamais des cases brutes.",
          micros: ["auto_proba_intersection_tableau", "auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Le chômage des jeunes",
          enonce: "Dans un pays (modèle), $20$ % des actifs ont moins de $25$ ans ($J$). Le taux de chômage ($C$) est de $20$ % chez les moins de $25$ ans et de $5$ % chez les autres actifs. On choisit un actif au hasard.\na) Construire l'arbre pondéré.\nb) Calculer $P(J \\cap C)$ et $P(\\overline{J} \\cap C)$.\nc) En déduire la probabilité qu'un actif soit au chômage.\nd) Un actif est au chômage. Quelle est la probabilité qu'il ait moins de $25$ ans ? Commenter.",
          correction:
            "a) Premier niveau : $P(J) = 0{,}2$, $P(\\overline{J}) = 0{,}8$. Deuxième niveau : $P_J(C) = 0{,}2$, $P_{\\overline{J}}(C) = 0{,}05$, et leurs contraires $0{,}8$ et $0{,}95$.\nb) $P(J \\cap C) = 0{,}2 \\times 0{,}2 = 0{,}04$ et $P(\\overline{J} \\cap C) = 0{,}8 \\times 0{,}05 = 0{,}04$.\nc) Deux chemins mènent à $C$ : $P(C) = 0{,}04 + 0{,}04 = 0{,}08$. Le taux de chômage global est de $8$ %.\nd) $P_C(J) = \\dfrac{P(J \\cap C)}{P(C)} = \\dfrac{0{,}04}{0{,}08} = 0{,}5$.\nLes moins de $25$ ans sont $20$ % des actifs, mais la MOITIÉ des chômeurs.\n⛔ Le piège : lire $0{,}2$ sur la branche et dire « $20$ % des chômeurs sont jeunes ». $0{,}2$ est $P_J(C)$, le taux de chômage des jeunes.",
          schema: arbre([
            { label: "J", proba: "0,2", enfants: [{ label: "C → 0,04", proba: "0,2" }, { label: "non C", proba: "0,8" }] },
            { label: "non J", proba: "0,8", enfants: [{ label: "C → 0,04", proba: "0,05" }, { label: "non C", proba: "0,95" }] },
          ]),
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Les retours d'une boutique en ligne",
          enonce: "Une boutique en ligne étudie $1\\,000$ commandes (modèle). $40$ % sont des vêtements ($V$). $25$ % des commandes de vêtements sont renvoyées ($R$), contre $5$ % des autres commandes.\na) Compléter un tableau croisé des effectifs.\nb) Calculer $P(V \\cap R)$ et $P_V(R)$.\nc) Une commande est renvoyée. Quelle est la probabilité que ce soit un vêtement ?\nd) Un client affirme : « un quart des retours sont des vêtements ». Qu'a-t-il confondu ?",
          correction:
            "a) Vêtements : $400$ commandes, dont $0{,}25 \\times 400 = 100$ renvoyées et $300$ gardées. Autres : $600$, dont $0{,}05 \\times 600 = 30$ renvoyées et $570$ gardées. Retours : $130$.\nb) $P(V \\cap R) = \\dfrac{100}{1\\,000} = 0{,}1$ et $P_V(R) = \\dfrac{100}{400} = 0{,}25$.\nc) Parmi les $130$ retours : $P_R(V) = \\dfrac{100}{130} = \\dfrac{10}{13} \\approx 0{,}77$.\nd) Il a confondu $P_V(R) = 0{,}25$ (« un vêtement sur quatre est renvoyé ») et $P_R(V) \\approx 0{,}77$ (« plus de trois retours sur quatre sont des vêtements »).\n⭐ Pour la boutique, c'est la seconde qui compte : c'est sur les vêtements qu'il faut agir pour réduire les retours.",
          schema: ecranSeulement(tableauProba(["", "Renvoyée", "Gardée", "Total"], [["Vêtements", "100", "300", "400"], ["Autres", "30", "570", "600"], ["Total", "130", "870", "1000"]], [[0, 1], [2, 1]])),
          micros: ["auto_proba_intersection_tableau", "auto_proba_conditionnelle_lecture", "auto_proba_distinguer"],
        },
        {
          titre: "Ce qu'on dit, ce qu'on vote",
          enonce: "Avant une élection (modèle), $55$ % des électeurs déclarent vouloir voter pour A ($D$). Le jour du vote, $80$ % d'entre eux votent vraiment A ($V$) ; parmi les autres électeurs, $10$ % votent finalement A.\na) Construire l'arbre, puis compléter un tableau sur $1\\,000$ électeurs.\nb) Calculer $P(D \\cap V)$ et $P(V)$. A obtient-il la majorité ?\nc) Parmi les électeurs de A, la part de ceux qui l'avaient annoncé dépasse-t-elle $90$ % ?",
          correction:
            "a) $P(D) = 0{,}55$, $P_D(V) = 0{,}8$ ; $P(\\overline{D}) = 0{,}45$, $P_{\\overline{D}}(V) = 0{,}1$.\nSur $1\\,000$ : $550$ l'annoncent, dont $0{,}8 \\times 550 = 440$ votent A et $110$ non. $450$ ne l'annoncent pas, dont $45$ votent A et $405$ non. Votes pour A : $485$.\nb) $P(D \\cap V) = \\dfrac{440}{1\\,000} = 0{,}44$ et $P(V) = \\dfrac{485}{1\\,000} = 0{,}485$.\nNon : $48{,}5$ % $< 50$ %, alors que $55$ % l'annonçaient.\nc) $P_V(D) = \\dfrac{440}{485}$. Or $90$ % de $485$ font $436{,}5$, et $440 > 436{,}5$ : oui, un peu plus de $90$ %.\n⭐ $P_D(V) = 0{,}8$ et $P_V(D) > 0{,}9$ : les électeurs de A l'avaient presque tous annoncé, mais tous ceux qui l'annonçaient ne l'ont pas voté.",
          schema: tableauProba(["Sur 1000", "Vote A", "Autre vote", "Total"], [["Annonce A", "440", "110", "550"], ["N'annonce pas", "45", "405", "450"], ["Total", "485", "515", "1000"]], [[0, 1], [2, 1]]),
          micros: ["auto_proba_conditionnelle_lecture", "auto_proba_intersection_tableau", "auto_proba_distinguer"],
        },
      ],
    },
  ],
};
