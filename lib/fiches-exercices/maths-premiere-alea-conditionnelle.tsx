// ─── Fiche d'exercices : probabilité conditionnelle, reconnaître (1re) ────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`. Calculatrice
// autorisée, mais des effectifs qui tombent juste.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts`
// (notionId alea_conditionnelle) : repérer le « parmi » et le « sachant que »,
// écrire P_A(B), le calculer dans un tableau croisé d'EFFECTIFS.
// ⛔ La feuille voisine `maths-premiere-auto-proba-lecture.tsx` (automatismes)
// a déjà pris le judo, la compagnie aérienne, le vote, le chômage, la fraude :
// aucun de ses contextes n'est repris ici.
//
// ⭐⭐ LE FIL : CE QUI SUIT « PARMI » VA EN INDICE, ET DONNE LE DÉNOMINATEUR.
// ⛔ LE PIÈGE CENTRAL : P_A(B) n'est pas P_B(A) (exercices 4, 6, 9, 10, 12,
// 17, 18) — trois tirs arrêtés sur quatre l'ont été à gauche, mais c'est
// « arrêté SACHANT le côté » qui dit où tirer (exercice 12).
//
// ⭐ Frédéric, 28/09 : beaucoup de visuel (tableaux croisés, la case lue mise en
// évidence), et des contextes d'économie, d'écologie, de sport, de nature, de
// PHYSIQUE (capteurs défaillants, exercice 14) et d'HISTOIRE-GÉO (exode rural,
// exercice 11). Les chiffres sont des MODÈLES arrondis, jamais présentés comme
// des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-conditionnelle.mjs`.
//
// Micro-compétences : alea_cond_reconnaitre (1, 2, 5, 7, 11, 16),
// alea_cond_notation (2, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20),
// alea_cond_tableau (3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { de, diagramme, roue, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaConditionnellePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-conditionnelle",
  titre: "Probabilité conditionnelle : reconnaître",
  accroche:
    "Vingt exercices pour repérer une probabilité conditionnelle dans une phrase (« parmi », « sachant que »), l'écrire avec la notation du cours et la calculer dans un tableau croisé. Forêts et arbres malades, abeilles, festival, tirs au but, capteurs de laboratoire, exode rural, tortues marines, tennis. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un mot à repérer, une notation, une case à lire.",
      rappel: [
        "« Parmi les $A$ » ou « sachant que $A$ est réalisé » annonce une probabilité CONDITIONNELLE : on la note $P_A(B)$.",
        "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ ». Ce qui est SU va en indice.",
        "Dans un tableau croisé d'effectifs : $P_A(B) = \\dfrac{\\text{nombre de } A \\text{ et } B}{\\text{nombre de } A}$. Le dénominateur est le total de $A$, pas le total général.",
      ],
      exercices: [
        {
          enonce:
            "Dans un lycée, on lit quatre phrases. On choisit un élève au hasard ; $I$ : « être interne », $S$ : « faire du sport le mercredi ».\na) « $30$ % des élèves sont internes. »\nb) « Parmi les internes, $80$ % font du sport le mercredi. »\nc) « $24$ % des élèves sont internes et font du sport le mercredi. »\nd) « Sachant qu'un élève fait du sport le mercredi, il y a une chance sur deux qu'il soit interne. »\nQuelles phrases donnent une probabilité conditionnelle ?",
          correction:
            "On cherche les mots qui RESTREIGNENT le groupe : « parmi », « sachant que ».\na) Tous les élèves : ce n'est pas conditionnel. $P(I) = 0{,}3$.\nb) « Parmi les internes » : conditionnelle. $P_I(S) = 0{,}8$.\nc) « Internes ET sportifs », parmi tous les élèves : ce n'est pas conditionnel. $P(I \\cap S) = 0{,}24$.\nd) « Sachant qu'il fait du sport » : conditionnelle. $P_S(I) = 0{,}5$.\nLes phrases b) et d).\nSur $100$ élèves : la phrase b) se lit sur la ligne des internes ($24$ sur $30$), la phrase d) dans la colonne des sportifs ($24$ sur $48$), la phrase c) dans la case seule ($24$ sur $100$).\n⚠️ Le mot « et » de la phrase c) n'annonce pas un « sachant » : on reste parmi TOUS les élèves.",
          schema: ecranSeulement(tableauProba(["Sur 100", "Sport", "Pas sport", "Total"], [["Internes", "24", "6", "30"], ["Externes", "24", "46", "70"], ["Total", "48", "52", "100"]], [[0, 1], [0, 3], [2, 1]])),
          micros: ["alea_cond_reconnaitre"],
        },
        {
          enonce:
            "Dans une forêt, on choisit un arbre au hasard. $F$ : « l'arbre est un feuillu », $M$ : « l'arbre est malade ». Écrire avec la bonne notation :\na) la probabilité qu'un feuillu soit malade ;\nb) la probabilité qu'un arbre malade soit un feuillu ;\nc) la probabilité qu'un arbre soit un feuillu malade.",
          correction:
            "a) On SAIT que l'arbre est un feuillu : $F$ va en indice. $P_F(M)$.\nb) On SAIT que l'arbre est malade : $M$ va en indice. $P_M(F)$.\nc) Aucune information connue d'avance : l'arbre est feuillu ET malade. $P(F \\cap M)$.\n⭐ Pour placer l'indice, on se demande : « qu'est-ce qu'on sait déjà de l'arbre ? »\n⚠️ a) et b) ne sont pas la même probabilité : on ne regarde pas le même groupe d'arbres.\n⭐ Sur le tableau : la case surlignée est « feuillu ET malade ». $P_F(M)$ la compare à la ligne Feuillu, $P_M(F)$ à la colonne Malade, $P(F \\cap M)$ à tous les arbres.",
          schema: ecranSeulement(tableauProba(["", "Malade", "Sain"], [["Feuillu", "F ∩ M", "F ∩ non M"], ["Résineux", "non F ∩ M", "non F ∩ non M"]], [[0, 1]])),
          micros: ["alea_cond_notation", "alea_cond_reconnaitre"],
        },
        {
          enonce:
            "Un garde forestier recense les $200$ arbres d'une parcelle. On choisit un arbre au hasard ; $F$ : « feuillu », $M$ : « malade ».\nCalculer $P_F(M)$.",
          figure: tableauProba(["", "Malade", "Sain", "Total"], [["Feuillus", "12", "108", "120"], ["Résineux", "16", "64", "80"], ["Total", "28", "172", "200"]]),
          correction:
            "« Sachant $F$ » : on se place sur la ligne des feuillus, qui compte $120$ arbres.\nParmi eux, $12$ sont malades.\n$P_F(M) = \\dfrac{12}{120} = \\dfrac{1}{10} = 0{,}1$.\nUn feuillu sur dix est malade.\n⚠️ Le piège : diviser par $200$. On obtiendrait $P(F \\cap M)$, pas $P_F(M)$.",
          micros: ["alea_cond_tableau"],
        },
        {
          enonce: "Avec le tableau de l'exercice 3, calculer $P_M(F)$, puis $P_R(M)$, où $R$ : « résineux ».",
          correction:
            "$P_M(F)$ : on se place PARMI les $28$ arbres malades (la colonne Malade). $12$ sont des feuillus.\n$P_M(F) = \\dfrac{12}{28} = \\dfrac{3}{7} \\approx 0{,}43$.\n$P_R(M)$ : parmi les $80$ résineux, $16$ sont malades. $P_R(M) = \\dfrac{16}{80} = 0{,}2$.\nLes résineux sont deux fois plus souvent malades que les feuillus ($0{,}2$ contre $0{,}1$).\n⛔ $P_F(M) = 0{,}1$ et $P_M(F) \\approx 0{,}43$ : même case, $12$ arbres, mais deux dénominateurs.",
          schema: ecranSeulement(tableauProba(["", "Malade", "Sain", "Total"], [["Feuillus", "12", "108", "120"], ["Résineux", "16", "64", "80"], ["Total", "28", "172", "200"]], [[0, 1], [2, 1]])),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          enonce:
            "On choisit un élève au hasard ; $C$ : « venir au lycée à vélo », $H$ : « habiter à moins de $5$ km ». On sait que $P_H(C) = 0{,}4$ et $P_C(H) = 0{,}9$. Traduire chaque égalité par une phrase.",
          correction:
            "$P_H(C) = 0{,}4$ : l'indice $H$ dit qui l'on regarde. « Parmi les élèves qui habitent à moins de $5$ km, $40$ % viennent à vélo. »\n$P_C(H) = 0{,}9$ : « Parmi les élèves qui viennent à vélo, $90$ % habitent à moins de $5$ km. »\n⭐ La phrase commence toujours par « parmi » suivi de l'INDICE.\n⚠️ Presque tous les cyclistes habitent près, mais la plupart des élèves qui habitent près ne viennent pas à vélo : les deux nombres ne disent pas la même chose.\nUn exemple sur $100$ élèves (modèle) : $18$ cyclistes proches sur $45$ élèves proches font $0{,}4$ ; $18$ sur $20$ cyclistes font $0{,}9$.",
          schema: ecranSeulement(tableauProba(["Sur 100", "Vélo", "Pas vélo", "Total"], [["Moins de 5 km", "18", "27", "45"], ["5 km et plus", "2", "53", "55"], ["Total", "20", "80", "100"]], [[0, 1], [0, 3], [2, 1]])),
          micros: ["alea_cond_notation", "alea_cond_reconnaitre"],
        },
        {
          enonce:
            "Une station de baguage a capturé $220$ oiseaux. On choisit un oiseau au hasard ; $J$ : « c'est un jeune de l'année », $M$ : « c'est une mésange ».\nCalculer $P_J(M)$ et $P_M(J)$.",
          figure: tableauProba(["", "Adultes", "Jeunes", "Total"], [["Mésanges", "60", "90", "150"], ["Rouges-gorges", "40", "30", "70"], ["Total", "100", "120", "220"]]),
          correction:
            "$P_J(M)$ : parmi les $120$ jeunes (colonne Jeunes), $90$ sont des mésanges.\n$P_J(M) = \\dfrac{90}{120} = \\dfrac{3}{4} = 0{,}75$.\n$P_M(J)$ : parmi les $150$ mésanges (ligne Mésanges), $90$ sont des jeunes.\n$P_M(J) = \\dfrac{90}{150} = \\dfrac{3}{5} = 0{,}6$.\n⭐ Même case ($90$), deux dénominateurs : la colonne pour « sachant $J$ », la ligne pour « sachant $M$ ».",
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          enonce:
            "On lance un dé équilibré. On note $A$ : « le résultat est pair » et $B$ : « on obtient $6$ ».\na) Calculer $P(B)$.\nb) On apprend que le résultat est pair. Quelle est alors la probabilité d'avoir obtenu $6$ ? Écrire cette probabilité avec la notation du cours.",
          figure: de([2, 4, 6]),
          correction:
            "a) Six faces équiprobables, une seule donne $6$ : $P(B) = \\dfrac{1}{6}$.\nb) « Sachant que le résultat est pair » : il ne reste que les trois faces surlignées, $2$, $4$ et $6$.\nUne seule donne $6$ : $P_A(B) = \\dfrac{1}{3}$.\n⭐ Savoir que $A$ est réalisé RÉDUIT l'univers : on passe de six issues à trois.\n⚠️ L'information a changé la probabilité : de $\\dfrac{1}{6}$ à $\\dfrac{1}{3}$.",
          micros: ["alea_cond_reconnaitre", "alea_cond_notation"],
        },
        {
          enonce:
            "Dans un quartier, $80$ foyers : $50$ vivent en appartement, dont $35$ trient leurs déchets ; $30$ vivent en maison, dont $27$ trient leurs déchets.\nOn choisit un foyer au hasard. Calculer la probabilité qu'il trie ses déchets sachant qu'il vit en maison, puis sachant qu'il vit en appartement.",
          correction:
            "On range d'abord les effectifs dans un tableau croisé : c'est lui qui donne les bons dénominateurs.\nMaison : $27$ trient, $30 - 27 = 3$ non. Appartement : $35$ trient, $50 - 35 = 15$ non.\nSachant « maison » : $\\dfrac{27}{30} = 0{,}9$.\nSachant « appartement » : $\\dfrac{35}{50} = 0{,}7$.\nLes foyers en maison trient plus souvent : $90$ % contre $70$ %.\n⚠️ En nombre, il y a plus de foyers qui trient en appartement ($35$ contre $27$) : un nombre n'est pas une proportion.",
          schema: tableauProba(["", "Trie", "Ne trie pas", "Total"], [["Appartement", "35", "15", "50"], ["Maison", "27", "3", "30"], ["Total", "62", "18", "80"]], [[1, 1], [1, 3]]),
          micros: ["alea_cond_tableau"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire ou construire le tableau, calculer, puis dire en une phrase ce que la probabilité signifie.",
      rappel: [
        "Pour « sachant $A$ », on se place sur la ligne (ou la colonne) de $A$ : le dénominateur est son total.",
        "Même case, deux questions : $P_A(B)$ divise par le total de $A$, $P_B(A)$ par le total de $B$.",
        "Pour comparer deux groupes de tailles différentes, on compare des probabilités conditionnelles, jamais des effectifs bruts.",
      ],
      exercices: [
        {
          titre: "Le festival et les gobelets",
          enonce:
            "À l'entrée d'un festival, on interroge $500$ festivaliers : sont-ils venus en train ou en voiture ? ont-ils pris le gobelet réutilisable ou un gobelet jetable ? On choisit un festivalier au hasard ; $T$ : « venu en train », $G$ : « gobelet réutilisable ».\na) Calculer $P(G)$.\nb) Calculer $P_T(G)$, puis la probabilité de prendre le gobelet réutilisable sachant qu'on est venu en voiture.\nc) Calculer $P_G(T)$ et l'écrire par une phrase.",
          figure: tableauProba(["", "Gobelet", "Jetable", "Total"], [["Train", "180", "20", "200"], ["Voiture", "150", "150", "300"], ["Total", "330", "170", "500"]]),
          correction:
            "a) Parmi tous les festivaliers : $P(G) = \\dfrac{330}{500} = 0{,}66$.\nb) Parmi les $200$ venus en train : $P_T(G) = \\dfrac{180}{200} = 0{,}9$.\nParmi les $300$ venus en voiture : $\\dfrac{150}{300} = 0{,}5$.\nc) Parmi les $330$ qui ont pris le gobelet : $P_G(T) = \\dfrac{180}{330} = \\dfrac{6}{11} \\approx 0{,}55$.\n« Parmi les festivaliers au gobelet réutilisable, environ $55$ % sont venus en train. »\n⛔ $P_T(G) = 0{,}9$ et $P_G(T) \\approx 0{,}55$ : même case, $180$, deux dénominateurs.",
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Les abeilles et les pesticides",
          enonce:
            "Un apiculteur suit $400$ ruches pendant un hiver (modèle). $160$ sont dans une zone sans pesticide, et $144$ d'entre elles survivent. Les $240$ autres sont en zone de grandes cultures, et $180$ survivent. On choisit une ruche au hasard ; $B$ : « zone sans pesticide », $S$ : « la colonie survit ».\na) Construire le tableau croisé des effectifs.\nb) Calculer $P_B(S)$ et $P_{\\overline{B}}(S)$.\nc) Calculer $P_S(B)$. Pourquoi est-elle plus petite que $\\dfrac{1}{2}$, alors qu'on survit mieux en zone sans pesticide ?",
          correction:
            "a) Sans pesticide : $144$ survivent, $160 - 144 = 16$ meurent. Grandes cultures : $180$ survivent, $60$ meurent. Survivantes : $324$ ; mortes : $76$.\nb) Parmi les $160$ ruches sans pesticide : $P_B(S) = \\dfrac{144}{160} = 0{,}9$.\nParmi les $240$ autres : $P_{\\overline{B}}(S) = \\dfrac{180}{240} = 0{,}75$.\nc) Parmi les $324$ survivantes : $P_S(B) = \\dfrac{144}{324} = \\dfrac{4}{9} \\approx 0{,}44$.\nC'est que la zone sans pesticide compte MOINS de ruches ($160$ sur $400$) : même en survivant mieux, elles restent minoritaires parmi les survivantes.\n⚠️ $P_S(B)$ dit d'où viennent les survivantes ; $P_B(S)$ dit si l'on survit bien. C'est $P_B(S)$ qui juge la zone.",
          schema: tableauProba(["", "Survit", "Meurt", "Total"], [["Sans pesticide", "144", "16", "160"], ["Cultures", "180", "60", "240"], ["Total", "324", "76", "400"]], [[0, 1], [0, 3]]),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "L'exode rural",
          enonce:
            "Au XIXᵉ siècle, beaucoup de paysans quittent les campagnes pour les villes industrielles : c'est l'exode rural. Un historien reconstitue, à partir de registres, $1\\,000$ actifs d'une ville industrielle vers $1900$ (modèle). On choisit un actif au hasard ; $C$ : « né à la campagne », $O$ : « ouvrier d'usine ».\nPour chaque phrase, dire si elle donne une probabilité conditionnelle, l'écrire avec une notation, et vérifier qu'elle est juste.\na) « Parmi les ouvriers, $60$ % sont nés à la campagne. »\nb) « $72$ % des actifs nés à la campagne sont ouvriers. »\nc) « $36$ % des actifs sont des ouvriers nés à la campagne. »",
          figure: tableauProba(["", "Ouvriers", "Autres", "Total"], [["Nés campagne", "360", "140", "500"], ["Nés en ville", "240", "260", "500"], ["Total", "600", "400", "1000"]]),
          correction:
            "a) « Parmi les ouvriers » : conditionnelle, $P_O(C)$. Parmi les $600$ ouvriers, $360$ sont nés à la campagne : $\\dfrac{360}{600} = 0{,}6$. Juste.\nb) « Des actifs nés à la campagne » : on se place parmi eux, c'est conditionnel, $P_C(O)$. $\\dfrac{360}{500} = 0{,}72$. Juste.\nc) Parmi TOUS les actifs : pas de condition, c'est $P(O \\cap C) = \\dfrac{360}{1\\,000} = 0{,}36$. Juste.\n⭐ Trois phrases vraies, un seul nombre de départ, $360$, et trois dénominateurs : $600$, $500$, $1\\,000$.\n⚠️ Dans b), « parmi » n'est pas écrit : « $72$ % DES actifs nés à la campagne » veut dire la même chose.",
          micros: ["alea_cond_reconnaitre", "alea_cond_notation"],
        },
        {
          titre: "Les tirs au but",
          enonce:
            "L'entraîneur d'un gardien de but a noté $60$ tirs au but qu'il a affrontés : tir à sa gauche ou à sa droite, arrêté ou marqué. On choisit un tir au hasard ; $G$ : « tir à gauche du gardien », $A$ : « tir arrêté ».\na) Calculer $P_G(A)$ et $P_D(A)$, où $D$ : « tir à droite ».\nb) Un tireur veut marquer. De quel côté doit-il tirer ?\nc) Calculer $P_A(G)$. Un commentateur en conclut : « il arrête presque tout à gauche, il faut tirer à droite ». Son raisonnement est-il bon ?",
          figure: tableauProba(["", "Arrêté", "Marqué", "Total"], [["Gauche", "9", "27", "36"], ["Droite", "3", "21", "24"], ["Total", "12", "48", "60"]]),
          correction:
            "a) Parmi les $36$ tirs à gauche : $P_G(A) = \\dfrac{9}{36} = 0{,}25$.\nParmi les $24$ tirs à droite : $P_D(A) = \\dfrac{3}{24} = 0{,}125$.\nb) À droite, le gardien arrête un tir sur huit ; à gauche, un sur quatre. Il faut tirer à droite.\nc) Parmi les $12$ tirs arrêtés : $P_A(G) = \\dfrac{9}{12} = 0{,}75$.\nLa conclusion est la bonne, mais pas le raisonnement. $P_A(G)$ est grand aussi parce que les tireurs visent plus souvent sa gauche ($36$ tirs sur $60$).\n⛔ Pour choisir un côté, il faut « arrêté SACHANT le côté », pas « le côté SACHANT arrêté ».",
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Le télétravail",
          enonce:
            "Une entreprise compte $250$ salariés : $60$ cadres, dont $45$ en télétravail au moins un jour par semaine, et $190$ non-cadres, dont $38$ en télétravail. On choisit un salarié au hasard ; $C$ : « être cadre », $T$ : « télétravailler ».\na) Calculer $P_C(T)$ et $P_{\\overline{C}}(T)$.\nb) Calculer $P_T(C)$, arrondie au centième.\nc) Écrire chaque résultat par une phrase.",
          correction:
            "a) Parmi les $60$ cadres : $P_C(T) = \\dfrac{45}{60} = 0{,}75$.\nParmi les $190$ non-cadres : $P_{\\overline{C}}(T) = \\dfrac{38}{190} = 0{,}2$.\nb) Télétravailleurs : $45 + 38 = 83$. Parmi eux, $45$ cadres : $P_T(C) = \\dfrac{45}{83} \\approx 0{,}54$.\nc) « Trois cadres sur quatre télétravaillent. » « Un non-cadre sur cinq télétravaille. » « Un peu plus de la moitié des télétravailleurs sont des cadres. »\n⚠️ Les cadres sont peu nombreux ($60$ sur $250$) : ils télétravaillent beaucoup, mais ne forment qu'un peu plus de la moitié des télétravailleurs.",
          schema: ecranSeulement(tableauProba(["", "Télétravail", "Sur site", "Total"], [["Cadres", "45", "15", "60"], ["Non-cadres", "38", "152", "190"], ["Total", "83", "167", "250"]], [[0, 1], [2, 1]])),
          micros: ["alea_cond_notation", "alea_cond_tableau"],
        },
        {
          titre: "Les capteurs du laboratoire",
          enonce:
            "Un laboratoire de physique achète $200$ capteurs de température : $120$ chez le fournisseur $A$ et $80$ chez le fournisseur $B$. Au contrôle, on compare chaque capteur à un thermomètre de référence : $6$ capteurs de $A$ et $12$ capteurs de $B$ donnent une mesure hors tolérance. On choisit un capteur au hasard ; $D$ : « le capteur est défaillant ».\na) Calculer $P_A(D)$ et $P_B(D)$. Quel fournisseur est le plus fiable ?\nb) Un capteur est défaillant. Quelle est la probabilité qu'il vienne de $A$ ?",
          correction:
            "a) Parmi les $120$ capteurs de $A$ : $P_A(D) = \\dfrac{6}{120} = 0{,}05$.\nParmi les $80$ capteurs de $B$ : $P_B(D) = \\dfrac{12}{80} = 0{,}15$.\n$A$ est le plus fiable : $5$ % de défaillants contre $15$ %.\nb) Défaillants : $6 + 12 = 18$. Parmi eux, $6$ viennent de $A$ : $P_D(A) = \\dfrac{6}{18} = \\dfrac{1}{3}$.\n⚠️ $P_A(D)$ juge le fournisseur ; $P_D(A)$ dit d'où vient une panne. Ce sont deux questions différentes.",
          schema: ecranSeulement(tableauProba(["", "Défaillant", "Conforme", "Total"], [["A", "6", "114", "120"], ["B", "12", "68", "80"], ["Total", "18", "182", "200"]], [[0, 1], [0, 3], [1, 1], [1, 3]])),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Le téléphone dans la chambre",
          enonce:
            "Une infirmière scolaire interroge $300$ élèves (modèle). $180$ gardent leur téléphone dans la chambre la nuit, et $108$ d'entre eux se disent fatigués le matin. Parmi les $120$ autres, $36$ se disent fatigués. On choisit un élève au hasard ; $T$ : « téléphone dans la chambre », $F$ : « fatigué le matin ».\na) Calculer $P_T(F)$ et $P_{\\overline{T}}(F)$.\nb) Calculer $P_F(T)$.\nc) Peut-on dire que le téléphone CAUSE la fatigue ?",
          correction:
            "a) Parmi les $180$ élèves au téléphone : $P_T(F) = \\dfrac{108}{180} = 0{,}6$.\nParmi les $120$ autres : $P_{\\overline{T}}(F) = \\dfrac{36}{120} = 0{,}3$.\nLa fatigue est deux fois plus fréquente avec le téléphone dans la chambre.\nb) Fatigués : $108 + 36 = 144$. $P_F(T) = \\dfrac{108}{144} = 0{,}75$ : trois élèves fatigués sur quatre gardent leur téléphone.\nc) Non, pas avec ce seul tableau. Il montre un LIEN, pas une cause : d'autres raisons (se coucher tard, le stress) peuvent jouer sur les deux.\n⭐ Une probabilité conditionnelle mesure un lien ; prouver une cause demande une expérience.",
          schema: diagramme("barres", [
            { label: "Téléphone (%)", value: 60 },
            { label: "Sans (%)", value: 30 },
          ]),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "La roue de la kermesse",
          enonce:
            "Une roue de kermesse a huit secteurs de même taille : quatre rouges et quatre bleus. G veut dire gagné, P perdu. On fait tourner la roue ; $R$ : « le secteur est rouge », $G$ : « gagner ».\na) Calculer $P(G)$.\nb) Un ami voit que la roue s'arrête sur du rouge. Quelle est alors la probabilité d'avoir gagné ? Quelle phrase de l'énoncé annonce une probabilité conditionnelle ?\nc) Calculer $P_G(R)$.",
          figure: roue([
            { label: "G", poids: 1, couleur: "#dc2626" },
            { label: "G", poids: 1, couleur: "#dc2626" },
            { label: "P", poids: 1, couleur: "#dc2626" },
            { label: "P", poids: 1, couleur: "#dc2626" },
            { label: "G", poids: 1, couleur: "#2563eb" },
            { label: "P", poids: 1, couleur: "#2563eb" },
            { label: "P", poids: 1, couleur: "#2563eb" },
            { label: "P", poids: 1, couleur: "#2563eb" },
          ]),
          correction:
            "a) Huit secteurs équiprobables, trois gagnants : $P(G) = \\dfrac{3}{8}$.\nb) « Il voit que la roue s'arrête sur du rouge » : on SAIT que $R$ est réalisé. C'est $P_R(G)$.\nParmi les $4$ secteurs rouges, $2$ sont gagnants : $P_R(G) = \\dfrac{2}{4} = \\dfrac{1}{2}$.\nc) Parmi les $3$ secteurs gagnants, $2$ sont rouges : $P_G(R) = \\dfrac{2}{3}$.\n⭐ Une probabilité conditionnelle n'est pas toujours annoncée par « parmi » : ici, c'est une INFORMATION reçue (« il voit que… »).",
          micros: ["alea_cond_reconnaitre", "alea_cond_notation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet : lire, calculer, comparer, et conclure par une phrase.",
      rappel: [
        "Avant chaque calcul, on se demande : PARMI QUI ? La réponse donne le dénominateur.",
        "On compare deux groupes par leurs probabilités conditionnelles : $P_A(B)$ et $P_{\\overline{A}}(B)$.",
        "Une probabilité conditionnelle mesure un lien entre deux caractères, pas une cause.",
      ],
      exercices: [
        {
          titre: "Les randonneurs et la météo",
          enonce:
            "Au départ d'un sentier de haute montagne, un gardien de refuge interroge $500$ randonneurs (modèle) : ont-ils lu le bulletin météo avant de partir ? ont-ils fait demi-tour ? On choisit un randonneur au hasard ; $M$ : « a lu la météo », $D$ : « a fait demi-tour ».\na) Calculer $P_M(D)$ et $P_{\\overline{M}}(D)$. Comparer.\nb) Calculer $P_D(M)$ et l'écrire par une phrase.\nc) Le gardien affirme : « plus de la moitié des demi-tours sont faits par des randonneurs qui n'ont pas lu la météo ». A-t-il raison ?",
          figure: tableauProba(["", "Demi-tour", "Continue", "Total"], [["Météo lue", "35", "315", "350"], ["Pas lue", "45", "105", "150"], ["Total", "80", "420", "500"]]),
          correction:
            "a) Parmi les $350$ qui ont lu la météo : $P_M(D) = \\dfrac{35}{350} = 0{,}1$.\nParmi les $150$ autres : $P_{\\overline{M}}(D) = \\dfrac{45}{150} = 0{,}3$.\nSans bulletin, on fait trois fois plus souvent demi-tour : on découvre le mauvais temps en chemin.\nb) Parmi les $80$ demi-tours : $P_D(M) = \\dfrac{35}{80} = \\dfrac{7}{16} \\approx 0{,}44$. « Parmi les randonneurs qui ont fait demi-tour, environ $44$ % avaient lu la météo. »\nc) Parmi les $80$ demi-tours, $45$ n'avaient pas lu la météo : $\\dfrac{45}{80} \\approx 0{,}56$. Oui, un peu plus de la moitié.\n⚠️ Ils ne sont pourtant que $150$ sur $500$ : c'est leur taux de demi-tour, $0{,}3$, qui les rend majoritaires parmi les demi-tours.",
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Les voitures électriques",
          enonce:
            "Un concessionnaire a vendu $2\\,000$ voitures neuves en un an (modèle), à des clients des villes ou des campagnes. On choisit une vente au hasard ; $V$ : « client de la ville », $E$ : « voiture électrique ».\na) Calculer $P_V(E)$ et $P_{\\overline{V}}(E)$.\nb) Calculer $P_E(V)$.\nc) Le concessionnaire veut lancer une publicité pour l'électrique. Un conseiller lui dit : « visez la campagne, c'est là qu'on en vend le moins, il y a de la marge ». Un autre : « visez la ville, trois électriques sur quatre y sont vendues ». Quelles probabilités chacun utilise-t-il ?",
          figure: tableauProba(["", "Électrique", "Thermique", "Total"], [["Ville", "360", "840", "1200"], ["Campagne", "120", "680", "800"], ["Total", "480", "1520", "2000"]]),
          correction:
            "a) Parmi les $1\\,200$ clients de la ville : $P_V(E) = \\dfrac{360}{1\\,200} = 0{,}3$.\nParmi les $800$ clients de la campagne : $P_{\\overline{V}}(E) = \\dfrac{120}{800} = 0{,}15$.\nb) Parmi les $480$ électriques : $P_E(V) = \\dfrac{360}{480} = 0{,}75$.\nc) Le premier compare $P_{\\overline{V}}(E) = 0{,}15$ et $P_V(E) = 0{,}3$ : la part d'électriques est deux fois plus faible à la campagne.\nLe second utilise $P_E(V) = 0{,}75$ : trois électriques sur quatre partent en ville.\n⭐ Les deux calculs sont justes : ils ne répondent pas à la même question. Choisir entre eux, c'est un choix d'entreprise, pas de maths.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Ville (%)", value: 30 },
              { label: "Campagne (%)", value: 15 },
            ]),
          ),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Les tortues marines",
          enonce:
            "Sur une plage de ponte, une association surveille $200$ nids de tortues marines (modèle). $120$ nids sont protégés par un grillage contre les prédateurs, et $102$ d'entre eux éclosent. Parmi les $80$ nids non protégés, $48$ éclosent. On choisit un nid au hasard ; $P$ : « nid protégé », $E$ : « le nid éclot ».\na) Construire le tableau croisé des effectifs.\nb) Calculer $P_P(E)$ et $P_{\\overline{P}}(E)$. Le grillage semble-t-il utile ?\nc) Calculer $P_E(P)$ et $P_{\\overline{E}}(P)$, et les écrire par une phrase.",
          correction:
            "a) Protégés : $102$ éclosent, $18$ non. Non protégés : $48$ éclosent, $32$ non. Éclos : $150$ ; pas éclos : $50$.\nb) Parmi les $120$ nids protégés : $P_P(E) = \\dfrac{102}{120} = 0{,}85$.\nParmi les $80$ autres : $P_{\\overline{P}}(E) = \\dfrac{48}{80} = 0{,}6$.\nOui : $85$ % d'éclosions avec grillage, $60$ % sans.\nc) Parmi les $150$ nids éclos : $P_E(P) = \\dfrac{102}{150} = 0{,}68$. « $68$ % des nids éclos étaient protégés. »\nParmi les $50$ nids qui n'ont pas éclos : $P_{\\overline{E}}(P) = \\dfrac{18}{50} = 0{,}36$. « $36$ % des échecs étaient protégés. »\n⭐ C'est b) qui juge le grillage : on compare deux groupes de nids, chacun sur son propre total.",
          schema: tableauProba(["", "Éclos", "Pas éclos", "Total"], [["Protégé", "102", "18", "120"], ["Non protégé", "48", "32", "80"], ["Total", "150", "50", "200"]], [[0, 1], [1, 1]]),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
        {
          titre: "Le premier service au tennis",
          enonce:
            "Une joueuse de tennis a servi $200$ points pendant un tournoi (modèle). Sa première balle est passée $120$ fois, et elle a gagné $90$ de ces points. Les $80$ autres fois, elle a dû jouer une seconde balle, et elle a gagné $40$ points. On choisit un point au hasard ; $R$ : « première balle réussie », $G$ : « point gagné ».\na) Calculer $P_R(G)$ et $P_{\\overline{R}}(G)$.\nb) Calculer $P(G)$.\nc) Calculer $P_G(R)$, arrondie au centième, et l'écrire par une phrase.\nd) Son entraîneur dit : « quand ta première balle passe, tu gagnes le point une fois et demie plus souvent ». A-t-il raison ?",
          correction:
            "a) Parmi les $120$ points en première balle : $P_R(G) = \\dfrac{90}{120} = 0{,}75$.\nParmi les $80$ points en seconde balle : $P_{\\overline{R}}(G) = \\dfrac{40}{80} = 0{,}5$.\nb) Points gagnés : $90 + 40 = 130$ sur $200$. $P(G) = \\dfrac{130}{200} = 0{,}65$.\nc) Parmi les $130$ points gagnés : $P_G(R) = \\dfrac{90}{130} = \\dfrac{9}{13} \\approx 0{,}69$. « Environ $69$ % des points gagnés l'ont été sur une première balle. »\nd) On compare les deux probabilités conditionnelles par leur quotient : $\\dfrac{0{,}75}{0{,}5} = 1{,}5$. Oui, il a raison.\n⚠️ $P(G) = 0{,}65$ est une moyenne des deux situations : elle ne dit rien de la valeur d'une première balle.",
          schema: ecranSeulement(tableauProba(["", "Gagné", "Perdu", "Total"], [["1re balle", "90", "30", "120"], ["2e balle", "40", "40", "80"], ["Total", "130", "70", "200"]], [[0, 1], [1, 1]])),
          micros: ["alea_cond_tableau", "alea_cond_notation"],
        },
      ],
    },
  ],
};
