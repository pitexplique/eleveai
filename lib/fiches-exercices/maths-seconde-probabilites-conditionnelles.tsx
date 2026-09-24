// ─── Fiche d'exercices : probabilités conditionnelles (seconde) ──────────────
//
// Neuvième feuille du lot (24/09/2026), sans fiche de cours. Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/probabilites-conditionnelles.bank.ts`
// (notionId probabilites_conditionnelles_2de). Le rappel de chaque niveau
// porte le cours : P_A(B) = P(A ∩ B) / P(A), arbre pondéré, produit le long
// d'un chemin, somme des chemins, tableau croisé.
// ⛔ PAS DE FORMULE DES PROBABILITÉS TOTALES (le BO 2026 l'exclut) : on
// ADDITIONNE les chemins de l'arbre, sans jamais nommer la formule générale.
//
// ⭐ LE FIL (celui de la banque, Frédéric le 04/09) : le DÉPISTAGE. Malade ou
// sain, puis test positif ou négatif. Et la question que le BO nomme :
// distinguer P_A(B) et P_B(A) — les faux positifs (exercices 7, 15, 17, 18, 20).
// ⛔ LE PIÈGE CENTRAL : croire qu'un test fiable à 99 % donne 99 % de chances
// d'être malade quand il est positif. Pour une maladie rare, c'est 1 sur 6
// (exercice 17).
// ⭐ LES SCHÉMAS : l'arbre pondéré (deux niveaux, ceux du canvas du coach) et le
// tableau croisé d'effectifs « sur 10 000 personnes », qui rend le calcul
// visible — c'est la représentation que la recherche en didactique recommande
// pour les faux positifs.
//
// ⭐ LE MONDE : un test de dépistage, une chaîne de trois machines et son
// contrôle qualité, une application météo, le filtre anti-spam d'une boîte mail.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-probabilites-conditionnelles.mjs`.
//
// Micro-compétences : proba_conditionnelle (2, 6, 9, 12, 15, 16, 17, 19),
// proba_arbre_pondere (3, 4, 8, 11, 14, 16, 17, 19), proba_arbre_chemins (4, 5,
// 9, 11, 14, 16, 17, 19, 20), proba_tableau_croise (1, 6, 7, 10, 13, 18, 20),
// proba_faux_positifs (1, 7, 9, 10, 12, 13, 15, 17, 18, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, tableauProba } from "@/lib/fiches-exercices/figures";

export const exercicesProbabilitesConditionnellesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "probabilites-conditionnelles-2de",
  titre: "Les probabilités conditionnelles",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une probabilité conditionnelle dans un tableau croisé, la calculer, construire et lire un arbre pondéré, additionner les chemins, et surtout ne pas confondre « B sachant A » et « A sachant B ». Un test de dépistage positif (malade ? pas si sûr), trois machines et leur contrôle qualité, une application météo, un filtre anti-spam. Arbres et tableaux dans les corrigés. Un rappel de cours avant chaque niveau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lire, calculer, compléter un arbre.",
      rappel: [
        "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ » : on se place PARMI les issues de $A$ seulement. $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
        "Dans un tableau d'effectifs : $P_A(B) = \\dfrac{\\text{effectif de } A \\cap B}{\\text{effectif de } A}$ — on divise par la LIGNE (ou la colonne) de $A$, pas par le total.",
        "Sur un arbre pondéré, les branches issues d'un même nœud ont des probabilités de somme $1$. Le deuxième niveau porte des probabilités CONDITIONNELLES.",
        "Probabilité d'un chemin : on MULTIPLIE le long du chemin. Probabilité d'un événement : on ADDITIONNE les chemins qui y mènent.",
      ],
      exercices: [
        {
          enonce: "Dans un lycée, on a relevé le régime de $200$ élèves.\na) On choisit une fille au hasard. Quelle est la probabilité qu'elle soit demi-pensionnaire ?\nb) On choisit un demi-pensionnaire au hasard. Quelle est la probabilité que ce soit une fille ?",
          figure: tableauProba(["", "Demi-pension", "Externe", "Total"], [["Filles", "60", "40", "100"], ["Garçons", "50", "50", "100"], ["Total", "110", "90", "200"]]),
          correction:
            "a) On se place parmi les $100$ filles : $P_F(D) = \\dfrac{60}{100} = 0{,}6$.\nb) On se place parmi les $110$ demi-pensionnaires : $P_D(F) = \\dfrac{60}{110} \\approx 0{,}545$.\n⭐ Même case, $60$ élèves, mais pas le même dénominateur : « sachant $F$ » divise par la ligne des filles, « sachant $D$ » par la colonne des demi-pensionnaires.\n⛔ Le piège : diviser par $200$. $\\dfrac{60}{200} = 0{,}3$, c'est $P(F \\cap D)$ : « fille ET demi-pensionnaire », parmi TOUS les élèves.",
          schema: tableauProba(["", "Demi-pension", "Externe", "Total"], [["Filles", "60", "40", "100"], ["Garçons", "50", "50", "100"], ["Total", "110", "90", "200"]], [[0, 1], [0, 3], [2, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs"],
        },
        {
          enonce: "On sait que $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}1$. Calculer $P_A(B)$.",
          correction:
            "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0{,}1}{0{,}4} = 0{,}25$.\n⭐ Lecture : parmi les issues de $A$, un quart sont aussi dans $B$.\n⛔ Le piège : diviser dans l'autre sens, $\\dfrac{0{,}4}{0{,}1} = 4$. Une probabilité ne dépasse jamais $1$.",
          schema: arbre([{ label: "A", proba: "0,4", enfants: [{ label: "B", proba: "0,25" }, { label: "non B", proba: "0,75" }] }, { label: "non A", proba: "0,6" }]),
          micros: ["proba_conditionnelle"],
        },
        {
          enonce: "Compléter l'arbre pondéré sachant que $P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\\overline{A}}(B) = 0{,}2$.",
          correction:
            "Au premier niveau : $P(\\overline{A}) = 1 - 0{,}3 = 0{,}7$.\nAprès $A$ : $P_A(\\overline{B}) = 1 - 0{,}6 = 0{,}4$. Après $\\overline{A}$ : $P_{\\overline{A}}(\\overline{B}) = 1 - 0{,}2 = 0{,}8$.\n⭐ Chaque nœud a des branches de somme $1$ : c'est la seule règle pour compléter un arbre.\n⛔ Le piège : écrire $0{,}6$ sur la branche $A$ → $B$ puis $0{,}2$… sur la branche $A$ → $\\overline{B}$. Les deux nombres donnés appartiennent à DEUX nœuds différents.",
          schema: arbre([{ label: "A", proba: "0,3", enfants: [{ label: "B", proba: "0,6" }, { label: "non B", proba: "0,4" }] }, { label: "non A", proba: "0,7", enfants: [{ label: "B", proba: "0,2" }, { label: "non B", proba: "0,8" }] }]),
          micros: ["proba_arbre_pondere"],
        },
        {
          enonce: "Avec l'arbre de l'exercice 3, calculer $P(A \\cap B)$ et $P(\\overline{A} \\cap B)$.",
          correction:
            "On multiplie le long de chaque chemin.\n$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}3 \\times 0{,}6 = 0{,}18$.\n$P(\\overline{A} \\cap B) = 0{,}7 \\times 0{,}2 = 0{,}14$.\n⛔ Le piège : répondre $P(A \\cap B) = 0{,}6$. $0{,}6$ est la probabilité de $B$ PARMI $A$ ; il faut encore tomber dans $A$, avec la probabilité $0{,}3$.",
          schema: arbre([{ label: "A", proba: "0,3", enfants: [{ label: "B → 0,18", proba: "0,6" }, { label: "non B", proba: "0,4" }] }, { label: "non A", proba: "0,7", enfants: [{ label: "B → 0,14", proba: "0,2" }, { label: "non B", proba: "0,8" }] }]),
          micros: ["proba_arbre_chemins", "proba_arbre_pondere"],
        },
        {
          enonce: "Toujours avec l'arbre de l'exercice 3, calculer $P(B)$.",
          correction:
            "Deux chemins mènent à $B$ : $A \\to B$ et $\\overline{A} \\to B$. On les additionne.\n$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) = 0{,}18 + 0{,}14 = 0{,}32$.\n⛔ Le piège : $P(B) = 0{,}6 + 0{,}2 = 0{,}8$, en additionnant les branches au lieu des chemins.",
          schema: arbre([{ label: "A", proba: "0,3", enfants: [{ label: "B → 0,18", proba: "0,6" }, { label: "non B", proba: "0,4" }] }, { label: "non A", proba: "0,7", enfants: [{ label: "B → 0,14", proba: "0,2" }, { label: "non B", proba: "0,8" }] }]),
          micros: ["proba_arbre_chemins"],
        },
        {
          enonce: "On tire une carte au hasard dans un jeu de $32$ cartes. On sait que c'est une figure (valet, dame ou roi). Quelle est la probabilité que ce soit un cœur ?",
          correction:
            "« Sachant que c'est une figure » : on se place parmi les $12$ figures ($3$ par couleur).\nParmi elles, $3$ sont des cœurs : $P_F(C) = \\dfrac{3}{12} = \\dfrac{1}{4}$.\n⭐ Par la formule : $P(F \\cap C) = \\dfrac{3}{32}$ et $P(F) = \\dfrac{12}{32}$, donc $P_F(C) = \\dfrac{3}{32} \\div \\dfrac{12}{32} = \\dfrac{3}{12}$. ✓\n⛔ Le piège : répondre $\\dfrac{3}{32}$, en oubliant l'information « c'est une figure ».",
          schema: tableauProba(["", "Figure", "Pas figure", "Total"], [["Cœur", "3", "5", "8"], ["Pas cœur", "9", "15", "24"], ["Total", "12", "20", "32"]], [[0, 1], [2, 1]]),
          micros: ["proba_conditionnelle", "proba_tableau_croise"],
        },
        {
          enonce: "Sur $100$ jours, une ville a eu $30$ jours nuageux. Il a plu $12$ de ces jours-là, et jamais par ciel dégagé.\na) Calculer $P_N(P)$, la probabilité qu'il pleuve sachant qu'il y a des nuages.\nb) Calculer $P_P(N)$, la probabilité qu'il y ait des nuages sachant qu'il pleut.\nc) Ces deux probabilités sont-elles égales ?",
          correction:
            "a) Parmi les $30$ jours nuageux, $12$ de pluie : $P_N(P) = \\dfrac{12}{30} = 0{,}4$.\nb) Parmi les $12$ jours de pluie, tous étaient nuageux : $P_P(N) = \\dfrac{12}{12} = 1$.\nc) Non ! « Pluie sachant nuages » vaut $0{,}4$, « nuages sachant pluie » vaut $1$. Les nuages n'annoncent pas toujours la pluie, mais la pluie vient toujours avec des nuages.\n⭐ Échanger ce qu'on sait et ce qu'on cherche change la probabilité : c'est le piège des faux positifs, en version météo.",
          schema: tableauProba(["", "Pluie", "Sec", "Total"], [["Nuages", "12", "18", "30"], ["Ciel clair", "0", "70", "70"], ["Total", "12", "88", "100"]], [[0, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs"],
        },
        {
          enonce: "Au self, $60$ % des élèves prennent des frites. Parmi eux, $30$ % prennent un dessert ; parmi les autres, $50$ %. On choisit un élève au hasard.\na) Construire l'arbre pondéré ($F$ : frites, $D$ : dessert).\nb) Calculer la probabilité qu'il ait pris des frites et un dessert.",
          correction:
            "a) Premier niveau : $P(F) = 0{,}6$ et $P(\\overline{F}) = 0{,}4$. Deuxième niveau : $P_F(D) = 0{,}3$ et $P_F(\\overline{D}) = 0{,}7$ ; $P_{\\overline{F}}(D) = 0{,}5$ et $P_{\\overline{F}}(\\overline{D}) = 0{,}5$.\nb) $P(F \\cap D) = 0{,}6 \\times 0{,}3 = 0{,}18$.\n⭐ « Parmi eux, $30$ % » est une probabilité CONDITIONNELLE : elle va au deuxième niveau, derrière $F$.\n⛔ Le piège : lire « $30$ % prennent un dessert » comme $P(D) = 0{,}3$. Ce n'est vrai que parmi ceux qui ont des frites.",
          schema: arbre([{ label: "F", proba: "0,6", enfants: [{ label: "D", proba: "0,3" }, { label: "non D", proba: "0,7" }] }, { label: "non F", proba: "0,4", enfants: [{ label: "D", proba: "0,5" }, { label: "non D", proba: "0,5" }] }]),
          micros: ["proba_arbre_pondere"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : construire, additionner les chemins, puis retourner la question.",
      rappel: [
        "Pour « retourner » un arbre — calculer $P_B(A)$ quand l'arbre donne $P_A(B)$ — on calcule d'abord $P(B)$ en additionnant les chemins, puis $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
        "Un premier niveau peut avoir TROIS branches, ou plus : leurs probabilités font toujours $1$.",
        "Un tableau « sur $1\\,000$ » ou « sur $10\\,000$ » personnes rend les calculs visibles : on raisonne sur des effectifs.",
      ],
      exercices: [
        {
          enonce: "On reprend l'arbre du self (exercice 8).\na) Calculer la probabilité qu'un élève prenne un dessert.\nb) Un élève a pris un dessert. Quelle est la probabilité qu'il ait pris des frites ?",
          correction:
            "a) Deux chemins mènent à $D$ : $P(D) = 0{,}6 \\times 0{,}3 + 0{,}4 \\times 0{,}5 = 0{,}18 + 0{,}2 = 0{,}38$.\nb) $P_D(F) = \\dfrac{P(F \\cap D)}{P(D)} = \\dfrac{0{,}18}{0{,}38} \\approx 0{,}474$.\n⭐ L'arbre donnait $P_F(D) = 0{,}3$ ; on vient de calculer l'inverse, $P_D(F) \\approx 0{,}47$. Rien ne les oblige à être égales.\n⛔ Le piège au b) : répondre $0{,}3$, la probabilité inscrite sur la branche. Elle répond à une autre question.",
          schema: arbre([{ label: "F", proba: "0,6", enfants: [{ label: "D → 0,18", proba: "0,3" }, { label: "non D", proba: "0,7" }] }, { label: "non F", proba: "0,4", enfants: [{ label: "D → 0,2", proba: "0,5" }, { label: "non D", proba: "0,5" }] }]),
          micros: ["proba_arbre_chemins", "proba_conditionnelle", "proba_faux_positifs"],
        },
        {
          enonce: "Dans une entreprise de $500$ salariés, $200$ ont moins de $30$ ans. Parmi eux, $60$ viennent à vélo ; parmi les autres, $45$.\na) Compléter le tableau croisé.\nb) Calculer la probabilité de venir à vélo, sachant qu'on a moins de $30$ ans, puis sachant qu'on a $30$ ans ou plus.\nc) Un salarié arrive à vélo. Quelle est la probabilité qu'il ait moins de $30$ ans ?",
          correction:
            "a) $30$ ans ou plus : $300$ salariés, dont $45$ à vélo et $255$ autrement. À vélo : $60 + 45 = 105$ en tout.\nb) $P_J(V) = \\dfrac{60}{200} = 0{,}3$ et $P_{\\overline{J}}(V) = \\dfrac{45}{300} = 0{,}15$ : les moins de $30$ ans viennent deux fois plus souvent à vélo.\nc) Parmi les $105$ cyclistes : $P_V(J) = \\dfrac{60}{105} \\approx 0{,}571$.\n⭐ Au c), on se place dans la COLONNE des cyclistes ; au b), dans les LIGNES des âges.",
          schema: tableauProba(["", "Vélo", "Autre", "Total"], [["Moins de 30 ans", "60", "140", "200"], ["30 ans ou plus", "45", "255", "300"], ["Total", "105", "395", "500"]], [[0, 1], [2, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs"],
        },
        {
          enonce: "Une usine fabrique des pièces sur trois machines : $M_1$ produit $50$ % des pièces, $M_2$ $30$ %, $M_3$ $20$ %. Les taux de pièces défectueuses sont $2$ % pour $M_1$, $3$ % pour $M_2$ et $5$ % pour $M_3$.\na) Construire l'arbre pondéré.\nb) Calculer la probabilité qu'une pièce prise au hasard soit défectueuse.",
          correction:
            "a) Trois branches au premier niveau : $0{,}5$ ; $0{,}3$ ; $0{,}2$. Derrière chacune : « défectueuse » ($0{,}02$ ; $0{,}03$ ; $0{,}05$) et « bonne » ($0{,}98$ ; $0{,}97$ ; $0{,}95$).\nb) Trois chemins mènent à « défectueuse » : $0{,}5 \\times 0{,}02 + 0{,}3 \\times 0{,}03 + 0{,}2 \\times 0{,}05 = 0{,}01 + 0{,}009 + 0{,}01 = 0{,}029$.\nEnviron $2{,}9$ % des pièces sont défectueuses.\n⛔ Le piège : faire la moyenne des trois taux, $\\dfrac{2 + 3 + 5}{3} \\approx 3{,}3$ %. Les machines ne produisent pas autant les unes que les autres.",
          schema: arbre([{ label: "M1", proba: "0,5", enfants: [{ label: "défect.", proba: "0,02" }, { label: "bonne", proba: "0,98" }] }, { label: "M2", proba: "0,3", enfants: [{ label: "défect.", proba: "0,03" }, { label: "bonne", proba: "0,97" }] }, { label: "M3", proba: "0,2", enfants: [{ label: "défect.", proba: "0,05" }, { label: "bonne", proba: "0,95" }] }]),
          micros: ["proba_arbre_pondere", "proba_arbre_chemins"],
        },
        {
          enonce: "Suite de l'exercice 11. Une pièce est défectueuse. Quelle est la probabilité qu'elle vienne de la machine $M_3$ ? Et de $M_1$ ?",
          correction:
            "$P_D(M_3) = \\dfrac{P(M_3 \\cap D)}{P(D)} = \\dfrac{0{,}01}{0{,}029} \\approx 0{,}345$.\n$P_D(M_1) = \\dfrac{0{,}01}{0{,}029} \\approx 0{,}345$ aussi.\n⭐ $M_3$ ne fait que $20$ % des pièces, mais $34{,}5$ % des défectueuses : c'est elle qu'il faut régler en priorité. Et $M_1$, la plus sûre, fournit autant de défauts parce qu'elle produit le plus.\n⛔ Le piège : répondre $0{,}05$, le taux de défaut de $M_3$. C'est $P_{M_3}(D)$, pas $P_D(M_3)$.",
          schema: tableauProba(["Machine", "Part des pièces", "Part des défauts"], [["M1", "50 %", "34,5 %"], ["M2", "30 %", "31,0 %"], ["M3", "20 %", "34,5 %"]], [[2, 2]]),
          micros: ["proba_conditionnelle", "proba_faux_positifs"],
        },
        {
          enonce: "Un club compte $80$ membres. $30$ font de la compétition ; parmi eux, les deux tiers sont des garçons. Parmi les membres qui ne font pas de compétition, $40$ % sont des garçons.\na) Compléter le tableau croisé.\nb) Calculer $P_G(C)$ et $P_C(G)$, où $G$ : « être un garçon » et $C$ : « faire de la compétition ».",
          correction:
            "a) Compétition : $\\dfrac{2}{3} \\times 30 = 20$ garçons et $10$ filles. Loisir : $50$ membres, dont $0{,}4 \\times 50 = 20$ garçons et $30$ filles. Total : $40$ garçons et $40$ filles.\nb) $P_G(C) = \\dfrac{20}{40} = 0{,}5$ : un garçon sur deux fait de la compétition.\n$P_C(G) = \\dfrac{20}{30} = \\dfrac{2}{3}$ : deux compétiteurs sur trois sont des garçons.\n⭐ Même case ($20$), deux questions, deux réponses.",
          schema: tableauProba(["", "Compétition", "Loisir", "Total"], [["Garçons", "20", "20", "40"], ["Filles", "10", "30", "40"], ["Total", "30", "50", "80"]], [[0, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs"],
        },
        {
          enonce: "Dans une usine, $5$ % des pièces sont défectueuses. Un contrôle automatique rejette $90$ % des pièces défectueuses, mais rejette aussi, à tort, $2$ % des pièces bonnes.\na) Construire l'arbre pondéré ($D$ : défectueuse, $R$ : rejetée).\nb) Calculer la probabilité qu'une pièce soit rejetée.",
          correction:
            "a) Premier niveau : $P(D) = 0{,}05$, $P(\\overline{D}) = 0{,}95$. Deuxième niveau : $P_D(R) = 0{,}9$, $P_D(\\overline{R}) = 0{,}1$ ; $P_{\\overline{D}}(R) = 0{,}02$, $P_{\\overline{D}}(\\overline{R}) = 0{,}98$.\nb) Deux chemins mènent au rejet : $0{,}05 \\times 0{,}9 + 0{,}95 \\times 0{,}02 = 0{,}045 + 0{,}019 = 0{,}064$.\nEnviron $6{,}4$ % des pièces sont rejetées.\n⛔ Le piège : oublier le second chemin et répondre $0{,}045$. Les pièces bonnes rejetées à tort comptent aussi.",
          schema: arbre([{ label: "D", proba: "0,05", enfants: [{ label: "R → 0,045", proba: "0,9" }, { label: "non R", proba: "0,1" }] }, { label: "non D", proba: "0,95", enfants: [{ label: "R → 0,019", proba: "0,02" }, { label: "non R", proba: "0,98" }] }]),
          micros: ["proba_arbre_pondere", "proba_arbre_chemins"],
        },
        {
          enonce: "Suite de l'exercice 14. Une pièce est rejetée. Quelle est la probabilité qu'elle soit vraiment défectueuse ? Commenter.",
          correction:
            "$P_R(D) = \\dfrac{P(D \\cap R)}{P(R)} = \\dfrac{0{,}045}{0{,}064} \\approx 0{,}703$.\nEnviron $70$ % des pièces rejetées sont défectueuses : les $30$ % restants sont de bonnes pièces jetées pour rien.\n⭐ Le contrôle semble excellent (il attrape $90$ % des défauts, ne se trompe que sur $2$ % des bonnes pièces), et pourtant près d'une pièce rejetée sur trois est bonne. C'est parce que les bonnes pièces sont bien plus NOMBREUSES : $2$ % de beaucoup, c'est beaucoup.\n⛔ Le piège : répondre $0{,}9$, qui est $P_D(R)$.",
          schema: tableauProba(["Sur 1 000", "Rejet", "Accepté", "Total"], [["Défect.", "45", "5", "50"], ["Bonnes", "19", "931", "950"], ["Total", "64", "936", "1000"]], [[0, 1], [2, 1]]),
          micros: ["proba_conditionnelle", "proba_faux_positifs"],
        },
        {
          enonce: "Une urne contient $4$ boules rouges et $6$ bleues. On tire une boule, on ne la remet pas, puis on en tire une seconde.\na) Calculer la probabilité que la seconde soit rouge sachant que la première était rouge.\nb) Construire l'arbre, puis calculer la probabilité que la seconde boule soit rouge. Comparer avec la probabilité que la première le soit.",
          correction:
            "a) Après une rouge, il reste $3$ rouges sur $9$ boules : $P_{R_1}(R_2) = \\dfrac{3}{9} = \\dfrac{1}{3}$.\nb) Premier tirage : $P(R_1) = \\dfrac{4}{10}$, $P(B_1) = \\dfrac{6}{10}$. Après une bleue, il reste $4$ rouges sur $9$ : $P_{B_1}(R_2) = \\dfrac{4}{9}$.\n$P(R_2) = \\dfrac{4}{10} \\times \\dfrac{3}{9} + \\dfrac{6}{10} \\times \\dfrac{4}{9} = \\dfrac{12}{90} + \\dfrac{24}{90} = \\dfrac{36}{90} = 0{,}4$.\nC'est exactement $P(R_1) = 0{,}4$ !\n⭐ Sans savoir ce qu'est la première boule, la seconde a la même chance d'être rouge : tirer en deuxième n'avantage ni ne désavantage personne. C'est pour cela qu'un tirage au sort est équitable, dans l'ordre qu'on veut.",
          schema: arbre([{ label: "R1", proba: "4/10", enfants: [{ label: "R2", proba: "3/9" }, { label: "B2", proba: "6/9" }] }, { label: "B1", proba: "6/10", enfants: [{ label: "R2", proba: "4/9" }, { label: "B2", proba: "5/9" }] }]),
          micros: ["proba_arbre_pondere", "proba_arbre_chemins", "proba_conditionnelle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : arbre ou tableau, puis la bonne question, puis une phrase qui dit ce que ça signifie.",
      rappel: [
        "Un TEST a deux qualités : il détecte les malades (sensibilité) et il ne se trompe pas sur les sains (peu de faux positifs).",
        "Mais la question du patient est $P_{+}(M)$ : « je suis positif, suis-je malade ? ». Elle dépend aussi de la FRÉQUENCE de la maladie.",
        "Raisonner sur $10\\,000$ personnes rend tout visible : on remplit le tableau, puis on lit.",
      ],
      exercices: [
        {
          titre: "Le test de dépistage",
          enonce: "Une maladie touche $1$ % de la population. Un test la détecte chez $99$ % des malades ; chez les personnes saines, il est positif à tort dans $5$ % des cas.\na) Construire l'arbre pondéré ($M$ : malade, $+$ : test positif).\nb) Calculer la probabilité qu'un test soit positif.\nc) Léa a un test positif. Quelle est la probabilité qu'elle soit malade ?\nd) Retrouver ce résultat avec un tableau sur $10\\,000$ personnes. Commenter.",
          correction:
            "a) $P(M) = 0{,}01$, $P(\\overline{M}) = 0{,}99$ ; $P_M(+) = 0{,}99$ ; $P_{\\overline{M}}(+) = 0{,}05$.\nb) Deux chemins : $P(+) = 0{,}01 \\times 0{,}99 + 0{,}99 \\times 0{,}05 = 0{,}0099 + 0{,}0495 = 0{,}0594$.\nc) $P_{+}(M) = \\dfrac{0{,}0099}{0{,}0594} \\approx 0{,}167$ : environ UNE chance sur six.\nd) Sur $10\\,000$ personnes : $100$ malades, dont $99$ positifs ; $9\\,900$ saines, dont $495$ positives. Sur les $594$ positifs, seuls $99$ sont malades : $\\dfrac{99}{594} = \\dfrac{1}{6}$.\n⭐ Le test est fiable, mais la maladie est RARE : les faux positifs, pris sur une foule de gens sains, sont cinq fois plus nombreux que les vrais. C'est pourquoi un test positif se confirme toujours par un second examen.\n⛔ Le piège : répondre $99$ %. C'est $P_M(+)$, la question du laboratoire, pas celle de Léa.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {arbre([{ label: "M", proba: "0,01", enfants: [{ label: "+", proba: "0,99" }, { label: "−", proba: "0,01" }] }, { label: "non M", proba: "0,99", enfants: [{ label: "+", proba: "0,05" }, { label: "−", proba: "0,95" }] }])}
              {tableauProba(["Sur 10 000", "Positif", "Négatif", "Total"], [["Malades", "99", "1", "100"], ["Sains", "495", "9405", "9900"], ["Total", "594", "9406", "10000"]], [[0, 1], [2, 1]])}
            </div>
          ),
          micros: ["proba_faux_positifs", "proba_arbre_pondere", "proba_arbre_chemins", "proba_conditionnelle"],
        },
        {
          titre: "Le même test, chez des patients à risque",
          enonce: "On utilise le test de l'exercice 17 dans un service où $20$ % des patients sont malades (mêmes $99$ % et $5$ %).\na) Compléter un tableau sur $10\\,000$ patients.\nb) Un patient est positif. Quelle est la probabilité qu'il soit malade ?\nc) Comparer avec l'exercice 17 et conclure.",
          correction:
            "a) Malades : $2\\,000$, dont $0{,}99 \\times 2\\,000 = 1\\,980$ positifs et $20$ négatifs. Sains : $8\\,000$, dont $0{,}05 \\times 8\\,000 = 400$ positifs et $7\\,600$ négatifs. Positifs : $1\\,980 + 400 = 2\\,380$.\nb) $P_{+}(M) = \\dfrac{1\\,980}{2\\,380} \\approx 0{,}832$ : plus de huit chances sur dix.\nc) Même test, même fiabilité : $17$ % dans la population générale, $83$ % chez les patients à risque. La valeur d'un test positif dépend de la fréquence de la maladie dans le groupe testé.\n⭐ C'est pour cela qu'on ne dépiste pas tout le monde pour tout : on cible les groupes où la maladie est fréquente.",
          schema: tableauProba(["Sur 10 000", "Positif", "Négatif", "Total"], [["Malades", "1980", "20", "2000"], ["Sains", "400", "7600", "8000"], ["Total", "2380", "7620", "10000"]], [[0, 1], [2, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs"],
        },
        {
          titre: "L'application météo",
          enonce: "Dans une ville, il pleut $25$ % des jours. Les jours de pluie, l'application météo l'avait annoncé $80$ % du temps ; les jours secs, elle avait quand même annoncé de la pluie $10$ % du temps.\na) Construire l'arbre pondéré ($P$ : il pleut, $A$ : pluie annoncée).\nb) Calculer la probabilité que l'application annonce de la pluie.\nc) L'application annonce de la pluie. Quelle est la probabilité qu'il pleuve vraiment ?",
          correction:
            "a) $P(P) = 0{,}25$, $P(\\overline{P}) = 0{,}75$ ; $P_P(A) = 0{,}8$, $P_{\\overline{P}}(A) = 0{,}1$.\nb) $P(A) = 0{,}25 \\times 0{,}8 + 0{,}75 \\times 0{,}1 = 0{,}2 + 0{,}075 = 0{,}275$.\nc) $P_A(P) = \\dfrac{0{,}2}{0{,}275} \\approx 0{,}727$ : environ $73$ %.\n⭐ Quand elle annonce la pluie, l'application a raison environ trois fois sur quatre. Prendre son parapluie reste un bon calcul.\n⛔ Le piège au c) : répondre $0{,}8$, qui est $P_P(A)$ : « annoncée sachant qu'il pleut ».",
          schema: arbre([{ label: "P", proba: "0,25", enfants: [{ label: "A", proba: "0,8" }, { label: "non A", proba: "0,2" }] }, { label: "non P", proba: "0,75", enfants: [{ label: "A", proba: "0,1" }, { label: "non A", proba: "0,9" }] }]),
          micros: ["proba_arbre_pondere", "proba_arbre_chemins", "proba_conditionnelle"],
        },
        {
          titre: "Le filtre anti-spam",
          enonce: "Dans une boîte mail, $60$ % des messages reçus sont des spams. Le filtre envoie dans le dossier « indésirables » $95$ % des spams, mais aussi $2$ % des vrais messages.\na) Compléter un tableau sur $1\\,000$ messages.\nb) Un message est dans « indésirables ». Quelle est la probabilité que ce soit un vrai message ?\nc) Un message est arrivé dans la boîte de réception. Quelle est la probabilité que ce soit un spam ?",
          correction:
            "a) Spams : $600$, dont $570$ filtrés et $30$ qui passent. Vrais messages : $400$, dont $8$ filtrés et $392$ qui passent. Filtrés : $578$ ; reçus : $422$.\nb) Parmi les $578$ filtrés, $8$ vrais messages : $\\dfrac{8}{578} \\approx 0{,}014$, soit environ $1{,}4$ %. Le dossier « indésirables » ne cache presque rien d'important.\nc) Parmi les $422$ messages reçus, $30$ spams : $\\dfrac{30}{422} \\approx 0{,}071$, soit environ $7$ %.\n⭐ Ici, les spams sont MAJORITAIRES : c'est l'inverse du test de dépistage, et les erreurs du filtre pèsent peu.\n⛔ Le piège au b) : répondre $2$ %, la part des vrais messages filtrés. On cherche la part des vrais messages PARMI les filtrés.",
          schema: tableauProba(["Sur 1 000", "Filtré", "Reçu", "Total"], [["Spams", "570", "30", "600"], ["Vrais", "8", "392", "400"], ["Total", "578", "422", "1000"]], [[1, 1], [2, 1]]),
          micros: ["proba_tableau_croise", "proba_faux_positifs", "proba_arbre_chemins"],
        },
      ],
    },
  ],
};
