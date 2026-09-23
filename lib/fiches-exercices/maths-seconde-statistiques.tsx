// ─── Fiche d'exercices : statistiques descriptives (seconde) ─────────────────
//
// Troisième feuille de la fin de seconde (23/09/2026), la première du bloc
// « Statistiques et probabilités » après celle des pourcentages. Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank.ts`
// (notionId statistiques_descriptives) et sur la fiche de cours
// `lib/fiches/maths-seconde-statistiques.tsx` — et sur SES conventions : un
// quartile est une valeur de la série, de rang arrondi à l'entier SUPÉRIEUR ;
// l'écart type est celui de la série (division par l'effectif).
// ⛔ La clé de la feuille est le notionId du coach, `statistiques-descriptives` ;
// la fiche de cours, elle, est rangée sous `statistiques-descriptives-2de`
// (alias posé le 23/09 dans `lib/fiches/registre.ts`).
//
// ⭐ LE FIL (celui de la fiche de cours) : un seul nombre ne résume jamais une
// série. Moyenne ↔ écart type, médiane ↔ quartiles. L'exercice 18 le montre
// d'un coup : deux climats de même moyenne, que tout oppose.
// ⛔ LE PIÈGE CENTRAL : lire la médiane sans ranger la série (exercices 4, 5, 6).
// Et la moyenne des moyennes (exercice 16), la moyenne sans les effectifs
// (exercice 3), la moyenne « tirée » par une valeur extrême (exercice 17).
//
// ⭐ LE MONDE : un coureur et ses tours de piste, deux archers, les temps de
// trajet de 200 salariés, un bulletin à coefficients, un PDG dans la moyenne des
// salaires, deux climats (océanique et continental, valeurs arrondies de type
// normales climatiques, non attribuées à une ville), une machine qui remplit des
// paquets de pâtes, le temps d'écran des élèves.
// ⭐ CHAQUE CORRIGÉ A SON CANVAS (Frédéric, 23/09 : « n'oublie pas les
// canvas ») : bâtons, barres, camembert, boîte, tableau — ceux du coach.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-statistiques.mjs`.
//
// Micro-compétences : stat_lire_serie (1, 12), stat_moyenne (2, 11, 13, 17, 18,
// 19), stat_moyenne_ponderee (3, 9, 15, 16, 20), stat_mediane_quartiles (4, 5,
// 6, 9, 12, 17, 18), stat_frequence (1, 7, 20), stat_ecart_interquartile (6, 12,
// 18), stat_linearite_moyenne (8, 14, 19), stat_ecart_type (10, 11, 14, 19),
// stat_interpreter (11, 16, 17, 18, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { boite, diagramme, tableau, ORANGE } from "@/lib/fiches-exercices/figures";

export const exercicesStatistiquesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "statistiques-descriptives",
  titre: "Les statistiques descriptives",
  accroche:
    "Vingt exercices, du geste seul au problème : effectifs et fréquences, moyenne simple et pondérée, médiane et quartiles (en rangeant d'abord !), diagramme en boîte, écart interquartile, écart type, et ce qu'ils disent vraiment. Deux archers, un bulletin à coefficients, un PDG dans la moyenne des salaires, deux climats de même moyenne que tout oppose, une machine à paquets de pâtes. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/statistiques-descriptives-2de", titre: "Les statistiques descriptives" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : compter, faire une moyenne, ranger puis couper.",
      rappel: [
        "La FRÉQUENCE d'une valeur : son effectif divisé par l'effectif total. Un nombre entre $0$ et $1$, souvent écrit en pourcentage.",
        "La MOYENNE : la somme des valeurs divisée par leur nombre. Avec des effectifs, chaque valeur compte autant de fois que son effectif.",
        "La MÉDIANE coupe la série RANGÉE en deux moitiés. Les QUARTILES : $Q_1$ est la valeur de rang $\\dfrac{N}{4}$, $Q_3$ celle de rang $\\dfrac{3N}{4}$, rangs arrondis à l'entier supérieur.",
      ],
      exercices: [
        {
          enonce: "Voici les notes d'un contrôle.\na) Combien d'élèves ont passé le contrôle ?\nb) Combien ont eu au moins $12$ ?\nc) Quelle est la fréquence de la note $12$ ? Et celle des notes d'au moins $12$ ?",
          figure: tableau(["Note", "8", "10", "12", "14", "16"], ["Effectif", 3, 5, 8, 6, 3]),
          correction:
            "a) L'effectif total est la somme des effectifs : $3 + 5 + 8 + 6 + 3 = 25$ élèves.\nb) Au moins $12$, c'est $12$, $14$ ou $16$ : $8 + 6 + 3 = 17$ élèves.\nc) Fréquence de $12$ : $\\dfrac{8}{25} = 0{,}32$, soit $32$ %. Fréquence des notes d'au moins $12$ : $\\dfrac{17}{25} = 0{,}68$, soit $68$ %.\n⛔ Le piège au a) : répondre $5$, le nombre de notes différentes. On compte les ÉLÈVES, donc les effectifs.",
          schema: diagramme("batons", [{ label: "8", value: 3 }, { label: "10", value: 5 }, { label: "12", value: 8 }, { label: "14", value: 6 }, { label: "16", value: 3 }], 2),
          micros: ["stat_lire_serie", "stat_frequence"],
        },
        {
          enonce: "Un coureur chronomètre ses cinq tours de piste, en secondes : $72$, $75$, $70$, $78$ et $85$. Calculer son temps moyen par tour.",
          correction:
            "On additionne les cinq temps, puis on divise par leur nombre.\n$72 + 75 + 70 + 78 + 85 = 380$, et $\\dfrac{380}{5} = 76$.\nSon temps moyen est de $76$ secondes par tour.\n⛔ Le piège : faire la moyenne du tour le plus rapide et du plus lent, $\\dfrac{70 + 85}{2} = 77{,}5$. La moyenne tient compte de TOUS les tours.",
          schema: diagramme("barres", [{ label: "T1", value: 72 }, { label: "T2", value: 75 }, { label: "T3", value: 70 }, { label: "T4", value: 78 }, { label: "T5", value: 85 }]),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "Reprendre les notes de l'exercice 1 et calculer la note moyenne de la classe.",
          correction:
            "Chaque note compte autant de fois que son effectif : on multiplie, on additionne, puis on divise par l'effectif total.\n$8 \\times 3 + 10 \\times 5 + 12 \\times 8 + 14 \\times 6 + 16 \\times 3 = 24 + 50 + 96 + 84 + 48 = 302$.\nMoyenne : $\\dfrac{302}{25} = 12{,}08$.\n⭐ La moyenne n'est la note de personne : aucun élève n'a eu $12{,}08$.\n⛔ Le piège : faire la moyenne des cinq notes, $\\dfrac{8 + 10 + 12 + 14 + 16}{5} = 12$. Ce serait compter autant les $3$ élèves à $8$ que les $8$ élèves à $12$.",
          schema: tableau(["Note", "8", "10", "12", "14", "16"], ["Note × effectif", 24, 50, 96, 84, 48]),
          micros: ["stat_moyenne_ponderee"],
        },
        {
          enonce: "Déterminer la médiane de la série : $14$, $9$, $17$, $11$, $20$, $9$, $15$.",
          correction:
            "On RANGE d'abord : $9$, $9$, $11$, $14$, $15$, $17$, $20$.\nIl y a $7$ valeurs, un nombre impair : la médiane est la valeur du milieu, la $4^e$. Donc la médiane est $14$.\n⭐ Trois valeurs sont en dessous, trois au-dessus.\n⛔ Le piège : prendre la $4^e$ valeur de la liste telle qu'elle arrive, $11$. Sans ranger, le milieu de la liste ne veut rien dire.",
          // Série rangée : Q1 de rang 2 (1,75 arrondi), Q3 de rang 6 (5,25 arrondi).
          schema: boite([{ min: 9, q1: 9, mediane: 14, q3: 17, max: 20 }], { min: 8, max: 21, step: 1 }),
          micros: ["stat_mediane_quartiles"],
        },
        {
          enonce: "Déterminer la médiane de la série : $3$, $12$, $7$, $15$, $10$, $8$, $6$, $5$.",
          correction:
            "On range : $3$, $5$, $6$, $7$, $8$, $10$, $12$, $15$.\nIl y a $8$ valeurs, un nombre pair : pas de valeur au milieu. La médiane est la moyenne des $4^e$ et $5^e$ valeurs : $\\dfrac{7 + 8}{2} = 7{,}5$.\n⭐ La médiane n'est pas une valeur de la série, et ce n'est pas grave : elle coupe quand même la série en deux moitiés de $4$ valeurs.\n⛔ Le piège : prendre la moyenne des $4^e$ et $5^e$ valeurs SANS ranger, $\\dfrac{15 + 10}{2} = 12{,}5$.",
          // Q1 de rang 2, Q3 de rang 6.
          schema: boite([{ min: 3, q1: 5, mediane: 7.5, q3: 10, max: 15 }], { min: 2, max: 16, step: 1 }),
          micros: ["stat_mediane_quartiles"],
        },
        {
          enonce: "Voici $12$ temps d'attente à un guichet, en minutes : $9$, $4$, $15$, $2$, $12$, $7$, $18$, $4$, $11$, $5$, $13$, $8$.\na) Déterminer la médiane.\nb) Déterminer $Q_1$ et $Q_3$.\nc) Calculer l'écart interquartile.",
          correction:
            "On range : $2$, $4$, $4$, $5$, $7$, $8$, $9$, $11$, $12$, $13$, $15$, $18$.\na) $12$ valeurs : la médiane est la moyenne des $6^e$ et $7^e$, $\\dfrac{8 + 9}{2} = 8{,}5$ minutes.\nb) $\\dfrac{12}{4} = 3$ : $Q_1$ est la $3^e$ valeur, $Q_1 = 4$. Et $\\dfrac{3 \\times 12}{4} = 9$ : $Q_3$ est la $9^e$ valeur, $Q_3 = 12$.\nc) $Q_3 - Q_1 = 12 - 4 = 8$ minutes : la moitié centrale des attentes tient dans $8$ minutes.\n⛔ Le piège au b) : croire que $Q_1$ est « la médiane de la première moitié ». Au lycée, $Q_1$ est une valeur de la série, de rang $\\dfrac{N}{4}$ arrondi au-dessus.",
          schema: boite([{ min: 2, q1: 4, mediane: 8.5, q3: 12, max: 18 }], { min: 0, max: 20, step: 2 }),
          micros: ["stat_mediane_quartiles", "stat_ecart_interquartile"],
        },
        {
          enonce: "On a demandé à $40$ élèves comment ils viennent au lycée : $18$ en bus, $10$ en voiture, $4$ à vélo et $8$ à pied. Calculer la fréquence de chaque mode de transport, en décimal puis en pourcentage.",
          correction:
            "On divise chaque effectif par l'effectif total, $40$.\nBus : $\\dfrac{18}{40} = 0{,}45$, soit $45$ %. Voiture : $\\dfrac{10}{40} = 0{,}25$, soit $25$ %.\nVélo : $\\dfrac{4}{40} = 0{,}1$, soit $10$ %. À pied : $\\dfrac{8}{40} = 0{,}2$, soit $20$ %.\n⭐ On vérifie : $0{,}45 + 0{,}25 + 0{,}1 + 0{,}2 = 1$. Les fréquences d'une série font toujours $1$, soit $100$ %.",
          schema: diagramme("camembert", [{ label: "Bus", value: 18 }, { label: "Voiture", value: 10 }, { label: "Vélo", value: 4 }, { label: "À pied", value: 8 }]),
          micros: ["stat_frequence"],
        },
        {
          enonce: "a) Sur une semaine, la température moyenne à midi a été de $20$ °C. On convertit chaque relevé en degrés Fahrenheit par $F = 1{,}8C + 32$. Quelle est la moyenne en °F ?\nb) La moyenne d'une classe à un contrôle est $11{,}4$. Le professeur ajoute $2$ points à chaque copie. Quelle est la nouvelle moyenne ?\nc) Au a), l'écart type des relevés était de $3$ °C. Que devient-il en °F ?",
          correction:
            "a) Si on transforme chaque valeur par $1{,}8C + 32$, la moyenne subit la MÊME transformation : $1{,}8 \\times 20 + 32 = 36 + 32 = 68$ °F.\nb) Ajouter $2$ à chaque note ajoute $2$ à la moyenne : $11{,}4 + 2 = 13{,}4$.\nc) L'écart type mesure un étalement : le $+32$ décale toute la série sans l'étaler, il ne compte pas. Seul le $\\times 1{,}8$ agit : $1{,}8 \\times 3 = 5{,}4$ °F.\n⛔ Le piège au c) : calculer $1{,}8 \\times 3 + 32$. Un décalage ne change pas la dispersion.",
          schema: tableau(["", "°C", "°F"], ["Moyenne", 20, 68]),
          micros: ["stat_linearite_moyenne"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : effectifs cumulés, dispersion, comparer deux séries.",
      rappel: [
        "Avec des effectifs, on cherche un rang dans les EFFECTIFS CUMULÉS : la valeur de rang $k$ est la première dont l'effectif cumulé atteint $k$.",
        "L'écart type : la racine de la moyenne des carrés des écarts à la moyenne. Plus il est grand, plus la série s'étale.",
        "Moyenne ↔ écart type ; médiane ↔ quartiles. On ne mélange pas les deux couples.",
      ],
      exercices: [
        {
          enonce: "Voici les pointures de $30$ élèves.\na) Construire la ligne des effectifs cumulés.\nb) Déterminer la médiane, $Q_1$ et $Q_3$.\nc) Calculer la pointure moyenne, arrondie au centième.",
          figure: tableau(["Pointure", "36", "37", "38", "39", "40", "41"], ["Effectif", 2, 5, 9, 8, 4, 2], true),
          correction:
            "a) On additionne les effectifs au fur et à mesure : $2$, $7$, $16$, $24$, $28$, $30$.\nb) Médiane : $30$ valeurs, c'est la moyenne des $15^e$ et $16^e$. Les pointures $38$ vont du rang $8$ au rang $16$ : les deux valent $38$, la médiane est $38$.\n$Q_1$ : $\\dfrac{30}{4} = 7{,}5$, arrondi à $8$ ; la $8^e$ valeur est $38$ (le cumul passe de $7$ à $16$), donc $Q_1 = 38$.\n$Q_3$ : $\\dfrac{3 \\times 30}{4} = 22{,}5$, arrondi à $23$ ; la $23^e$ valeur est $39$ (cumul de $17$ à $24$), donc $Q_3 = 39$.\nc) $36 \\times 2 + 37 \\times 5 + 38 \\times 9 + 39 \\times 8 + 40 \\times 4 + 41 \\times 2 = 72 + 185 + 342 + 312 + 160 + 82 = 1\\,153$, et $\\dfrac{1\\,153}{30} \\approx 38{,}43$.\n⛔ Le piège au b) : arrondir $7{,}5$ à $7$. Le rang d'un quartile s'arrondit toujours à l'entier SUPÉRIEUR.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Pointure", "36", "37", "38", "39", "40", "41"], ["Effectif cumulé", 2, 7, 16, 24, 28, 30], true)}
              {boite([{ min: 36, q1: 38, mediane: 38, q3: 39, max: 41 }], { min: 35, max: 42, step: 1 })}
            </div>
          ),
          micros: ["stat_mediane_quartiles", "stat_moyenne_ponderee"],
        },
        {
          enonce: "Calculer la moyenne et l'écart type de la série : $4$, $6$, $8$, $10$, $12$. Donner l'écart type en valeur exacte, puis arrondi au centième.",
          correction:
            "Moyenne : $\\dfrac{4 + 6 + 8 + 10 + 12}{5} = \\dfrac{40}{5} = 8$.\nLes écarts à la moyenne : $-4$, $-2$, $0$, $2$, $4$. Leurs carrés : $16$, $4$, $0$, $4$, $16$.\nLa moyenne des carrés : $\\dfrac{16 + 4 + 0 + 4 + 16}{5} = \\dfrac{40}{5} = 8$ (c'est la VARIANCE).\nL'écart type est sa racine : $\\sqrt{8} = 2\\sqrt{2} \\approx 2{,}83$.\n⛔ Le piège : faire la moyenne des écarts eux-mêmes, $\\dfrac{-4 - 2 + 0 + 2 + 4}{5} = 0$. Les écarts se compensent toujours : c'est pour ça qu'on les met au carré.",
          schema: tableau(["Valeur", "4", "6", "8", "10", "12"], ["Carré de l'écart", 16, 4, 0, 4, 16]),
          micros: ["stat_ecart_type"],
        },
        {
          enonce: "Deux archers tirent cinq flèches chacun. Points obtenus : archer A : $7$, $8$, $8$, $9$, $8$ ; archer B : $10$, $5$, $10$, $6$, $9$.\na) Calculer la moyenne de chacun.\nb) Calculer l'écart type de chacun, arrondi au centième.\nc) Lequel est le plus régulier ? Lequel choisir pour une épreuve où il faut éviter le mauvais tir ?",
          correction:
            "a) A : $\\dfrac{7 + 8 + 8 + 9 + 8}{5} = \\dfrac{40}{5} = 8$. B : $\\dfrac{10 + 5 + 10 + 6 + 9}{5} = \\dfrac{40}{5} = 8$. Même moyenne.\nb) A : écarts $-1$, $0$, $0$, $1$, $0$ ; carrés $1$, $0$, $0$, $1$, $0$ ; variance $\\dfrac{2}{5} = 0{,}4$ ; écart type $\\sqrt{0{,}4} \\approx 0{,}63$.\nB : écarts $2$, $-3$, $2$, $-2$, $1$ ; carrés $4$, $9$, $4$, $4$, $1$ ; variance $\\dfrac{22}{5} = 4{,}4$ ; écart type $\\sqrt{4{,}4} \\approx 2{,}10$.\nc) L'archer A a un écart type plus de trois fois plus petit : il est bien plus RÉGULIER. Pour éviter le mauvais tir, on choisit A.\n⭐ La moyenne seule ne les distinguait pas. C'est la dispersion qui dit la différence.",
          schema: boite(
            [
              { label: "A", min: 7, q1: 8, mediane: 8, q3: 8, max: 9 },
              { label: "B", min: 5, q1: 6, mediane: 9, q3: 10, max: 10, couleur: ORANGE },
            ],
            { min: 4, max: 11, step: 1 },
          ),
          micros: ["stat_moyenne", "stat_ecart_type", "stat_interpreter"],
        },
        {
          enonce: "Voici le diagramme en boîte des temps de trajet domicile-travail de $200$ salariés, en minutes.\na) Lire le minimum, le maximum, les quartiles et la médiane.\nb) Calculer l'écart interquartile et l'étendue.\nc) Compléter : « au moins la moitié des salariés mettent … minutes ou moins » ; « au plus … salariés mettent plus de $30$ minutes ».",
          figure: boite([{ min: 12, q1: 18, mediane: 23, q3: 30, max: 45 }], { min: 10, max: 50, step: 5 }),
          correction:
            "a) Minimum $12$, $Q_1 = 18$, médiane $23$, $Q_3 = 30$, maximum $45$ (les deux bouts des moustaches, les deux bords de la boîte, le trait dedans).\nb) Écart interquartile : $Q_3 - Q_1 = 30 - 18 = 12$ minutes, la largeur de la boîte. Étendue : $45 - 12 = 33$ minutes, d'un bout à l'autre.\nc) Au moins la moitié des salariés mettent $23$ minutes ou moins (la médiane).\nAu moins $75$ % mettent $30$ minutes ou moins ($Q_3$) : au plus $25$ % mettent plus de $30$ minutes, soit au plus $0{,}25 \\times 200 = 50$ salariés.\n⛔ Le piège au b) : confondre les deux. L'écart interquartile ne regarde que la moitié centrale, l'étendue regarde les deux salariés les plus extrêmes.",
          schema: boite([{ min: 12, q1: 18, mediane: 23, q3: 30, max: 45 }], { min: 10, max: 50, step: 5 }),
          micros: ["stat_lire_serie", "stat_mediane_quartiles", "stat_ecart_interquartile"],
        },
        {
          enonce: "Léa a eu $12$, $9$, $15$ et $11$ aux quatre premiers contrôles. Quelle note doit-elle avoir au cinquième pour que sa moyenne soit exactement $12$ ?",
          correction:
            "Une moyenne de $12$ sur $5$ notes, c'est un total de $12 \\times 5 = 60$ points.\nElle en a déjà $12 + 9 + 15 + 11 = 47$.\nIl lui manque $60 - 47 = 13$ : elle doit avoir $13$.\n⭐ On vérifie : $\\dfrac{12 + 9 + 15 + 11 + 13}{5} = \\dfrac{60}{5} = 12$. ✓\n⛔ Le piège : répondre $12$, « la moyenne voulue ». Ses notes actuelles ont une moyenne de $11{,}75$ : il faut compenser.",
          schema: diagramme("barres", [{ label: "C1", value: 12 }, { label: "C2", value: 9 }, { label: "C3", value: 15 }, { label: "C4", value: 11 }, { label: "C5", value: 13 }], 4),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "Dans une entreprise, le salaire moyen est de $1\\,800$ € et l'écart type de $250$ €.\na) Tous les salaires augmentent de $3$ %. Que deviennent la moyenne et l'écart type ?\nb) Au lieu de cela, chaque salarié reçoit une prime de $50$ €. Que deviennent-ils ?\nc) Laquelle des deux mesures creuse les écarts de salaire, en euros ?",
          correction:
            "a) Augmenter de $3$ %, c'est multiplier chaque salaire par $1{,}03$. La moyenne est multipliée par $1{,}03$ : $1\\,800 \\times 1{,}03 = 1\\,854$ €. L'écart type AUSSI : $250 \\times 1{,}03 = 257{,}5$ €.\nb) Ajouter $50$ € à chaque salaire ajoute $50$ € à la moyenne : $1\\,850$ €. Mais tout le monde bouge de la même somme : l'écart type reste $250$ €.\nc) L'augmentation en pourcentage : elle donne plus en euros aux gros salaires, et l'écart type grandit. La prime fixe, elle, ne change pas les écarts en euros.\n⛔ Le piège au b) : ajouter aussi $50$ à l'écart type. Un décalage ne change pas la dispersion.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["", "Avant", "+3 %", "+50 €"], ["Moyenne (€)", "1 800", "1 854", "1 850"])}
              {tableau(["", "Avant", "+3 %", "+50 €"], ["Écart type (€)", 250, "257,5", 250])}
            </div>
          ),
          micros: ["stat_linearite_moyenne", "stat_ecart_type"],
        },
        {
          enonce: "Sur un bulletin, les notes et les coefficients sont : maths $14$ (coefficient $4$), français $11$ (coefficient $3$), anglais $16$ (coefficient $2$), EPS $18$ (coefficient $1$). Calculer la moyenne générale.",
          correction:
            "Chaque note compte autant de fois que son coefficient.\nSomme des notes × coefficients : $14 \\times 4 + 11 \\times 3 + 16 \\times 2 + 18 \\times 1 = 56 + 33 + 32 + 18 = 139$.\nSomme des coefficients : $4 + 3 + 2 + 1 = 10$.\nMoyenne : $\\dfrac{139}{10} = 13{,}9$.\n⛔ Le piège : la moyenne simple des quatre notes, $\\dfrac{14 + 11 + 16 + 18}{4} = 14{,}75$. Le $18$ d'EPS pèse quatre fois moins que le $14$ de maths.\n⛔ Et diviser par $4$ (le nombre de matières) au lieu de $10$ (le total des coefficients).",
          schema: tableau(["Matière", "Maths", "Français", "Anglais", "EPS"], ["Note × coef.", 56, 33, 32, 18], true),
          micros: ["stat_moyenne_ponderee"],
        },
        {
          enonce: "La classe A compte $20$ élèves et a eu $11$ de moyenne ; la classe B compte $30$ élèves et a eu $13$. Quelle est la moyenne des $50$ élèves ensemble ?",
          correction:
            "On ne fait pas la moyenne des moyennes : on reconstitue les TOTAUX.\nClasse A : $20 \\times 11 = 220$ points. Classe B : $30 \\times 13 = 390$ points.\nEnsemble : $\\dfrac{220 + 390}{50} = \\dfrac{610}{50} = 12{,}2$.\n⭐ C'est plus près de $13$ que de $11$ : la classe B, plus nombreuse, pèse plus.\n⛔ Le piège : répondre $\\dfrac{11 + 13}{2} = 12$. Ce serait vrai seulement si les deux classes avaient le même effectif.",
          schema: diagramme("barres", [{ label: "Classe A", value: 11 }, { label: "Classe B", value: 13 }, { label: "Les 50", value: 12.2 }], 2),
          micros: ["stat_moyenne_ponderee", "stat_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des séries réelles : on calcule, on compare, et on dit ce que les nombres racontent.",
      rappel: [
        "Une valeur très à l'écart TIRE la moyenne, pas la médiane.",
        "Pour comparer deux séries, on donne toujours un indicateur de position ET un indicateur de dispersion.",
        "On conclut par une phrase : un nombre n'est pas une réponse.",
      ],
      exercices: [
        {
          titre: "Le PDG dans la moyenne",
          enonce: "Une petite entreprise compte $11$ personnes. Salaires mensuels nets : $4$ salariés à $1\\,800$ €, $3$ à $1\\,900$ €, $2$ à $2\\,100$ €, $1$ à $2\\,500$ €, et le PDG à $12\\,000$ €.\na) Calculer le salaire moyen, à l'euro près.\nb) Déterminer le salaire médian.\nc) Le PDG annonce : « chez nous, on gagne en moyenne près de $2\\,900$ € ». Est-ce faux ? Est-ce honnête ?\nd) Recalculer la moyenne et la médiane sans le PDG. Que remarque-t-on ?",
          correction:
            "a) Total : $4 \\times 1\\,800 + 3 \\times 1\\,900 + 2 \\times 2\\,100 + 2\\,500 + 12\\,000 = 7\\,200 + 5\\,700 + 4\\,200 + 2\\,500 + 12\\,000 = 31\\,600$ €. Moyenne : $\\dfrac{31\\,600}{11} \\approx 2\\,873$ €.\nb) $11$ salaires rangés : la médiane est le $6^e$. Les rangs $1$ à $4$ sont à $1\\,800$, les rangs $5$ à $7$ à $1\\,900$ : la médiane est $1\\,900$ €.\nc) Ce n'est pas faux : la moyenne vaut bien environ $2\\,873$ €. Mais dix personnes sur onze gagnent moins de $2\\,873$ € ; c'est le salaire du PDG qui tire la moyenne vers le haut. La médiane, $1\\,900$ €, décrit mieux le salarié ordinaire.\nd) Sans le PDG : moyenne $\\dfrac{19\\,600}{10} = 1\\,960$ €, médiane $1\\,900$ € (moyenne des $5^e$ et $6^e$, tous deux à $1\\,900$).\nLa moyenne perd plus de $900$ €, la médiane ne bouge pas : elle RÉSISTE aux valeurs extrêmes.\n⭐ C'est pour cela qu'on parle souvent de salaire MÉDIAN : en France aussi, le salaire moyen est au-dessus du salaire médian.",
          schema: diagramme("batons", [{ label: "1 800", value: 4 }, { label: "1 900", value: 3 }, { label: "2 100", value: 2 }, { label: "2 500", value: 1 }, { label: "12 000", value: 1 }], 1),
          micros: ["stat_moyenne", "stat_mediane_quartiles", "stat_interpreter"],
        },
        {
          titre: "Deux climats, une même moyenne",
          enonce: "Voici les températures moyennes de chaque mois, de janvier à décembre, dans deux villes (en °C, arrondies). Ville A, au bord de l'océan : $7$, $7$, $9$, $10$, $13$, $15$, $17$, $17$, $15$, $12$, $9$, $7$. Ville B, au cœur du continent : $1$, $3$, $7$, $11$, $16$, $20$, $22$, $21$, $17$, $12$, $6$, $2$.\na) Calculer la température moyenne annuelle de chaque ville.\nb) Déterminer, pour chacune, la médiane, $Q_1$, $Q_3$ et l'écart interquartile.\nc) Tracer les deux diagrammes en boîte sur un même axe, puis décrire les deux climats en une phrase chacun.",
          correction:
            "a) Ville A : la somme des douze mois vaut $138$, et $\\dfrac{138}{12} = 11{,}5$ °C. Ville B : la somme vaut aussi $138$, donc $11{,}5$ °C. La même moyenne.\nb) On range. A : $7$, $7$, $7$, $9$, $9$, $10$, $12$, $13$, $15$, $15$, $17$, $17$. B : $1$, $2$, $3$, $6$, $7$, $11$, $12$, $16$, $17$, $20$, $21$, $22$.\nRangs : médiane entre la $6^e$ et la $7^e$ valeur, $Q_1$ la $3^e$, $Q_3$ la $9^e$.\nA : médiane $\\dfrac{10 + 12}{2} = 11$, $Q_1 = 7$, $Q_3 = 15$, écart interquartile $8$.\nB : médiane $\\dfrac{11 + 12}{2} = 11{,}5$, $Q_1 = 3$, $Q_3 = 17$, écart interquartile $14$.\nc) Même centre, mais la boîte de B est presque deux fois plus large : ses températures s'étalent de $1$ à $22$ °C, celles de A de $7$ à $17$ °C seulement.\nVille A : un climat doux toute l'année, l'océan amortit les saisons. Ville B : des hivers froids et des étés chauds, un climat CONTINENTAL.\n⭐ Avec la moyenne seule, on aurait dit « même climat ». C'est l'exemple même de la phrase du chapitre : un seul nombre ne résume jamais une série.",
          schema: boite(
            [
              { label: "A", min: 7, q1: 7, mediane: 11, q3: 15, max: 17 },
              { label: "B", min: 1, q1: 3, mediane: 11.5, q3: 17, max: 22, couleur: ORANGE },
            ],
            { min: 0, max: 24, step: 2 },
          ),
          micros: ["stat_moyenne", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_interpreter"],
        },
        {
          titre: "La machine à paquets de pâtes",
          enonce: "Une machine remplit des paquets de pâtes de $500$ g. Pour la contrôler, on pèse $10$ paquets, en grammes : $498$, $502$, $501$, $497$, $500$, $503$, $499$, $500$, $502$, $498$. La machine est jugée bien réglée si la masse moyenne est entre $499$ g et $501$ g ET si l'écart type est inférieur à $2$ g.\na) Calculer la masse moyenne.\nb) Calculer l'écart type, arrondi au centième.\nc) La machine est-elle bien réglée ?\nd) Le lendemain, un défaut ajoute $4$ g à chaque paquet. Sans refaire les calculs, que deviennent la moyenne et l'écart type ? Faut-il intervenir ?",
          correction:
            "a) La somme vaut $5\\,000$ g, donc la moyenne est $\\dfrac{5\\,000}{10} = 500$ g.\nb) Écarts à $500$ : $-2$, $2$, $1$, $-3$, $0$, $3$, $-1$, $0$, $2$, $-2$. Carrés : $4$, $4$, $1$, $9$, $0$, $9$, $1$, $0$, $4$, $4$, de somme $36$.\nVariance : $\\dfrac{36}{10} = 3{,}6$. Écart type : $\\sqrt{3{,}6} \\approx 1{,}90$ g.\nc) La moyenne, $500$ g, est entre $499$ et $501$ ; l'écart type, $1{,}90$ g, est inférieur à $2$ g. La machine est bien réglée.\nd) Chaque masse augmente de $4$ g : la moyenne passe à $504$ g, l'écart type reste $1{,}90$ g. La machine reste aussi RÉGULIÈRE, mais elle est DÉCALÉE : la moyenne sort de l'intervalle, il faut la régler.\n⭐ Les deux critères surveillent deux défauts différents : un mauvais réglage (la moyenne) et un manque de précision (l'écart type).",
          schema: diagramme("batons", [{ label: "497", value: 1 }, { label: "498", value: 2 }, { label: "499", value: 1 }, { label: "500", value: 2 }, { label: "501", value: 1 }, { label: "502", value: 2 }, { label: "503", value: 1 }], 3),
          micros: ["stat_moyenne", "stat_ecart_type", "stat_linearite_moyenne", "stat_interpreter"],
        },
        {
          titre: "Le temps d'écran",
          enonce: "On a relevé le temps d'écran quotidien, hors travail scolaire, de $50$ élèves de seconde. Les temps sont regroupés en classes d'une heure.\na) Quelle proportion des élèves passe au moins $3$ heures par jour devant un écran ?\nb) En prenant pour chaque classe son CENTRE, estimer le temps d'écran moyen, en heures puis en heures et minutes.\nc) Dans quelle classe se trouve la médiane ?",
          figure: tableau(["Temps (h)", "[0 ; 1[", "[1 ; 2[", "[2 ; 3[", "[3 ; 4[", "[4 ; 5["], ["Effectif", 6, 14, 18, 8, 4], "ecran"),
          correction:
            "a) Au moins $3$ heures : les deux dernières classes, $8 + 4 = 12$ élèves. Fréquence : $\\dfrac{12}{50} = 0{,}24$, soit $24$ %, près d'un élève sur quatre.\nb) Les centres des classes : $0{,}5$ ; $1{,}5$ ; $2{,}5$ ; $3{,}5$ ; $4{,}5$.\n$0{,}5 \\times 6 + 1{,}5 \\times 14 + 2{,}5 \\times 18 + 3{,}5 \\times 8 + 4{,}5 \\times 4 = 3 + 21 + 45 + 28 + 18 = 115$, et $\\dfrac{115}{50} = 2{,}3$ h.\n$0{,}3$ h, c'est $0{,}3 \\times 60 = 18$ minutes : environ $2$ h $18$ min par jour.\nc) La médiane est entre la $25^e$ et la $26^e$ valeur. Effectifs cumulés : $6$, $20$, $38$… Les rangs $21$ à $38$ sont dans la classe $[2\\,;\\,3[$ : la médiane y est.\n⭐ Au b), ce n'est qu'une ESTIMATION : on fait comme si chaque élève d'une classe était pile au milieu.\n⛔ Le piège au b) : écrire « $2{,}3$ h $= 2$ h $30$ min ». Une heure fait $60$ minutes, pas $100$.",
          schema: diagramme("barres", [{ label: "0-1 h", value: 6 }, { label: "1-2 h", value: 14 }, { label: "2-3 h", value: 18 }, { label: "3-4 h", value: 8 }, { label: "4-5 h", value: 4 }], 2),
          micros: ["stat_frequence", "stat_moyenne_ponderee", "stat_interpreter"],
        },
      ],
    },
  ],
};
