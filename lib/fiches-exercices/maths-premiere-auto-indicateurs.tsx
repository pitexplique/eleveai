// ─── Fiche d'exercices : moyenne, médiane, quartiles (1re, automatismes) ─────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : des séries courtes, des totaux qui se divisent de tête.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts`
// (notionId auto_indicateurs) et sur SES conventions, celles de la seconde : un
// quartile est une valeur de la série, de rang arrondi à l'entier SUPÉRIEUR.
// L'exercice 2 est celui de Métropole (« la médiane de 2 ; 3 ; 5 ; 4 ; 2 ; 3 »).
//
// ⭐⭐ LE FIL : UN SEUL NOMBRE NE RÉSUME JAMAIS UNE SÉRIE. La moyenne se laisse
// TIRER par une valeur extrême, la médiane résiste (exercices 8, 11, 15, 17,
// 20) ; deux séries de même centre peuvent n'avoir rien de commun (13, 18).
// ⛔ LE PIÈGE CENTRAL : chercher la médiane sans RANGER la série (2, 3, 5, 12).
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (boîtes, séries rangées, barres) et un
// lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (salaires, loyers, patrimoine, temps
// de trajet, absences, climat, âge des salariés, dons). Les chiffres sont des
// MODÈLES arrondis, jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-indicateurs.mjs`.
//
// Micro-compétences : auto_stat_moyenne (1, 6, 9, 10, 11, 14, 16, 17, 19, 20),
// auto_stat_mediane (2, 3, 11, 14, 16, 17, 19, 20), auto_stat_quartiles (4, 5,
// 12, 14, 16, 17, 18, 20), auto_stat_interpreter_indicateurs (8, 11, 13, 15,
// 16, 17, 18, 19, 20), auto_stat_boites (7, 12, 13, 17, 18). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { boite, diagramme, tableau, ORANGE } from "@/lib/fiches-exercices/figures";

export const exercicesAutoIndicateursPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-indicateurs",
  titre: "Moyenne, médiane, quartiles",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer une moyenne (avec effectifs, avec classes), ranger pour trouver la médiane, les quartiles, lire et comparer des boîtes à moustaches, et dire ce que les nombres racontent. Salaires, loyers, patrimoine, temps de trajet, climat, dons à une association. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un indicateur par exercice. Sans calculatrice.",
      rappel: [
        "MOYENNE : la somme des valeurs divisée par leur nombre. Avec des effectifs, chaque valeur compte autant de fois que son effectif.",
        "MÉDIANE : on RANGE la série. Effectif impair : la valeur du milieu. Effectif pair : la moyenne des deux valeurs du milieu.",
        "QUARTILES d'une série rangée de $N$ valeurs : $Q_1$ est la valeur de rang $\\dfrac{N}{4}$, $Q_3$ celle de rang $\\dfrac{3N}{4}$, rangs arrondis à l'entier SUPÉRIEUR.",
        "Diagramme en boîte : minimum, $Q_1$, médiane, $Q_3$, maximum.",
      ],
      exercices: [
        {
          enonce: "Températures relevées à midi pendant cinq jours, en °C : $12$, $15$, $9$, $14$, $10$. Calculer la température moyenne.",
          correction:
            "On additionne les cinq valeurs : $12 + 15 + 9 + 14 + 10 = 60$.\nOn divise par leur nombre, $5$ : $\\dfrac{60}{5} = 12$ °C.\n⚠️ Le piège : faire la moyenne de la plus petite et de la plus grande, $\\dfrac{9 + 15}{2} = 12$. Ici on tombe juste par hasard ; en général, c'est faux.",
          micros: ["auto_stat_moyenne"],
        },
        {
          enonce: "Voici les six dernières notes, sur $5$, attribuées à un hôtel : $2$ ; $3$ ; $5$ ; $4$ ; $2$ ; $3$. Quelle est la médiane de cette série ?",
          correction:
            "On RANGE d'abord : $2$ ; $2$ ; $3$ ; $3$ ; $4$ ; $5$.\n$6$ valeurs, un nombre pair : la médiane est la moyenne des $3^e$ et $4^e$ valeurs.\n$\\dfrac{3 + 3}{2} = 3$. La médiane est $3$.\n⛔ Le piège : prendre les $3^e$ et $4^e$ valeurs SANS ranger, $5$ et $4$, et répondre $4{,}5$.",
          schema: tableau(["Rang", "1", "2", "3", "4", "5", "6"], ["Valeur", 2, 2, 3, 3, 4, 5]),
          micros: ["auto_stat_mediane"],
        },
        {
          enonce: "Déterminer la médiane de la série : $8$, $13$, $5$, $11$, $16$, $7$, $10$.",
          correction:
            "On range : $5$, $7$, $8$, $10$, $11$, $13$, $16$.\n$7$ valeurs, un nombre impair : la médiane est la valeur du milieu, la $4^e$.\nLa médiane est $10$ : trois valeurs en dessous, trois au-dessus.\n⛔ Le piège : prendre la $4^e$ valeur de la liste telle qu'elle arrive, $11$.",
          micros: ["auto_stat_mediane"],
        },
        {
          enonce: "Une série rangée compte $8$ valeurs : $3$, $5$, $6$, $8$, $9$, $11$, $12$, $15$. Déterminer $Q_1$ et $Q_3$.",
          correction:
            "$Q_1$ : $\\dfrac{8}{4} = 2$. C'est la $2^e$ valeur : $Q_1 = 5$.\n$Q_3$ : $\\dfrac{3 \\times 8}{4} = 6$. C'est la $6^e$ valeur : $Q_3 = 11$.\n⭐ Au moins un quart des valeurs sont inférieures ou égales à $5$, au moins trois quarts à $11$.\n✔️ Au passage, la médiane : $\\dfrac{8 + 9}{2} = 8{,}5$.",
          schema: boite([{ min: 3, q1: 5, mediane: 8.5, q3: 11, max: 15 }], { min: 2, max: 16, step: 1 }),
          micros: ["auto_stat_quartiles"],
        },
        {
          enonce: "Déterminer $Q_1$ et $Q_3$ de la série de $10$ valeurs : $12$, $4$, $9$, $15$, $7$, $10$, $6$, $13$, $8$, $11$.",
          correction:
            "On range : $4$, $6$, $7$, $8$, $9$, $10$, $11$, $12$, $13$, $15$.\n$Q_1$ : $\\dfrac{10}{4} = 2{,}5$, arrondi à $3$. La $3^e$ valeur : $Q_1 = 7$.\n$Q_3$ : $\\dfrac{3 \\times 10}{4} = 7{,}5$, arrondi à $8$. La $8^e$ valeur : $Q_3 = 12$.\n⛔ Le piège : arrondir $2{,}5$ à $2$. Le rang d'un quartile s'arrondit TOUJOURS à l'entier supérieur.",
          schema: tableau(["Rang", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["Valeur", 4, 6, 7, 8, 9, 10, 11, 12, 13, 15], "ecran"),
          micros: ["auto_stat_quartiles"],
        },
        {
          enonce: "Voici les notes d'un petit groupe. Calculer la note moyenne.",
          figure: tableau(["Note", "8", "10", "12", "15"], ["Effectif", 2, 5, 2, 1]),
          correction:
            "Effectif total : $2 + 5 + 2 + 1 = 10$ élèves.\nChaque note compte autant de fois que son effectif : $8 \\times 2 + 10 \\times 5 + 12 \\times 2 + 15 \\times 1 = 16 + 50 + 24 + 15 = 105$.\nMoyenne : $\\dfrac{105}{10} = 10{,}5$.\n⛔ Le piège : la moyenne des quatre notes, $\\dfrac{8 + 10 + 12 + 15}{4} = 11{,}25$. Elle compte autant le seul $15$ que les cinq $10$.",
          schema: tableau(["Note", "8", "10", "12", "15"], ["Note × effectif", 16, 50, 24, 15]),
          micros: ["auto_stat_moyenne"],
        },
        {
          enonce: "Lire sur ce diagramme en boîte le minimum, $Q_1$, la médiane, $Q_3$ et le maximum. Calculer l'écart interquartile et l'étendue.",
          figure: boite([{ min: 5, q1: 8, mediane: 10, q3: 14, max: 20 }], { min: 4, max: 21, step: 1 }),
          correction:
            "Les bouts des moustaches : minimum $5$, maximum $20$.\nLes bords de la boîte : $Q_1 = 8$ et $Q_3 = 14$. Le trait dans la boîte : la médiane, $10$.\nÉcart interquartile : $Q_3 - Q_1 = 14 - 8 = 6$, la largeur de la boîte.\nÉtendue : $20 - 5 = 15$, d'un bout à l'autre.\n⛔ Le piège : prendre le trait de la boîte pour la MOYENNE. C'est la médiane ; la moyenne n'apparaît pas sur une boîte.",
          micros: ["auto_stat_boites"],
        },
        {
          enonce: "Dans une entreprise, le salaire MOYEN est de $2\\,800$ € et le salaire MÉDIAN de $2\\,100$ €. Vrai ou faux ?\na) La moitié des salariés gagnent au moins $2\\,800$ €.\nb) Au moins la moitié des salariés gagnent $2\\,100$ € ou moins.\nc) Quelques salaires très élevés tirent la moyenne vers le haut.",
          correction:
            "a) Faux. C'est la MÉDIANE qui coupe les salariés en deux moitiés, pas la moyenne.\nb) Vrai : c'est la définition de la médiane.\nc) Vrai : la moyenne dépasse la médiane de $700$ €. Il faut quelques gros salaires pour la faire monter si haut.\n⭐ C'est pour cela qu'on publie souvent le salaire MÉDIAN : il résiste aux valeurs extrêmes.",
          micros: ["auto_stat_interpreter_indicateurs"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, puis une phrase qui dit ce que les nombres signifient.",
      rappel: [
        "Données en CLASSES : on remplace chaque classe par son CENTRE, puis on fait la moyenne avec les effectifs. C'est une estimation.",
        "Le total se retrouve à partir de la moyenne : total $=$ moyenne $\\times$ effectif.",
        "Une valeur extrême TIRE la moyenne ; la médiane, elle, ne bouge presque pas.",
        "Comparer deux séries : un indicateur de position (médiane) ET un indicateur de dispersion (écart interquartile $Q_3 - Q_1$).",
      ],
      exercices: [
        {
          titre: "Le temps de trajet",
          enonce: "On a relevé le temps de trajet domicile-travail de $50$ salariés, en minutes, regroupé en classes (modèle). Estimer le temps de trajet moyen.",
          figure: tableau(["Temps (min)", "[0 ; 10[", "[10 ; 20[", "[20 ; 30[", "[30 ; 40["], ["Effectif", 10, 20, 15, 5], "ecran"),
          correction:
            "On prend le CENTRE de chaque classe : $5$, $15$, $25$ et $35$ minutes.\nOn multiplie par les effectifs : $5 \\times 10 + 15 \\times 20 + 25 \\times 15 + 35 \\times 5 = 50 + 300 + 375 + 175 = 900$.\nOn divise par l'effectif total : $\\dfrac{900}{50} = 18$ minutes.\n⭐ C'est une ESTIMATION : on fait comme si chaque salarié était pile au centre de sa classe.\n⛔ Le piège : la moyenne des quatre centres, $\\dfrac{5 + 15 + 25 + 35}{4} = 20$. Elle oublie que $20$ salariés sont dans la classe $[10\\,;\\,20[$.",
          schema: tableau(["Centre (min)", "5", "15", "25", "35"], ["Centre × effectif", 50, 300, 375, 175]),
          micros: ["auto_stat_moyenne"],
        },
        {
          titre: "Une embauche",
          enonce: "Une petite entreprise compte $20$ salariés, payés en moyenne $2\\,000$ € par mois. Elle embauche un ingénieur à $2\\,420$ €. Quel est le nouveau salaire moyen ?",
          correction:
            "On retrouve la masse salariale : $20 \\times 2\\,000 = 40\\,000$ €.\nOn ajoute le nouveau salaire : $40\\,000 + 2\\,420 = 42\\,420$ €.\nOn divise par le nouvel effectif, $21$ : $\\dfrac{42\\,420}{21} = 2\\,020$ €.\n✔️ Vérification : $21 \\times 2\\,020 = 42\\,000 + 420 = 42\\,420$.\n⛔ Le piège : $\\dfrac{2\\,000 + 2\\,420}{2} = 2\\,210$ €. Le nouveau venu ne pèse qu'un salaire sur $21$.",
          micros: ["auto_stat_moyenne"],
        },
        {
          titre: "Les loyers d'un immeuble",
          enonce: "Les sept appartements d'un immeuble sont loués (en € par mois) : $550$, $600$, $620$, $650$, $700$, $720$, et $2\\,460$ pour le dernier étage.\na) Calculer le loyer moyen et le loyer médian.\nb) Lequel décrit le mieux le loyer « ordinaire » de l'immeuble ?",
          correction:
            "a) Somme : $550 + 600 + 620 + 650 + 700 + 720 + 2\\,460 = 6\\,300$ €. Moyenne : $\\dfrac{6\\,300}{7} = 900$ €.\nLa série est déjà rangée, $7$ valeurs : la médiane est la $4^e$, $650$ €.\nb) Six loyers sur sept sont sous la moyenne : c'est le dernier étage qui la tire vers le haut.\nLa médiane, $650$ €, décrit mieux le loyer ordinaire.\n⭐ Une seule valeur extrême a déplacé la moyenne de $250$ € au-dessus de la médiane.",
          schema: diagramme("barres", [
            { label: "1", value: 550 },
            { label: "2", value: 600 },
            { label: "3", value: 620 },
            { label: "4", value: 650 },
            { label: "5", value: 700 },
            { label: "6", value: 720 },
            { label: "7", value: 2460 },
          ], 6),
          micros: ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_interpreter_indicateurs"],
        },
        {
          titre: "Le service client",
          enonce: "Voici la durée de $12$ appels à un service client, en minutes : $3$, $8$, $5$, $12$, $4$, $6$, $15$, $7$, $5$, $9$, $4$, $10$.\na) Déterminer la médiane, $Q_1$ et $Q_3$.\nb) Calculer l'écart interquartile, puis tracer le diagramme en boîte.",
          correction:
            "On range : $3$, $4$, $4$, $5$, $5$, $6$, $7$, $8$, $9$, $10$, $12$, $15$.\na) $12$ valeurs : la médiane est la moyenne des $6^e$ et $7^e$, $\\dfrac{6 + 7}{2} = 6{,}5$ minutes.\n$\\dfrac{12}{4} = 3$ : $Q_1$ est la $3^e$ valeur, $Q_1 = 4$. $\\dfrac{3 \\times 12}{4} = 9$ : $Q_3$ est la $9^e$ valeur, $Q_3 = 9$.\nb) $Q_3 - Q_1 = 9 - 4 = 5$ minutes : la moitié centrale des appels dure entre $4$ et $9$ minutes.\nLa boîte va de $4$ à $9$, les moustaches de $3$ à $15$.\n⚠️ La moustache de droite est longue : quelques appels durent beaucoup plus que les autres.",
          schema: boite([{ min: 3, q1: 4, mediane: 6.5, q3: 9, max: 15 }], { min: 2, max: 16, step: 1 }),
          micros: ["auto_stat_quartiles", "auto_stat_boites"],
        },
        {
          titre: "Deux entreprises",
          enonce: "Les diagrammes en boîte donnent les salaires mensuels nets dans deux entreprises A et B, en CENTAINES d'euros (modèle).\na) Dans quelle entreprise le salaire médian est-il le plus élevé ?\nb) Comparer les écarts interquartiles.\nc) Dans quelle entreprise au moins $75$ % des salariés gagnent-ils $2\\,000$ € ou plus ?\nd) Où se trouve le salaire le plus élevé ?",
          figure: boite(
            [
              { label: "A", min: 14, q1: 16, mediane: 18, q3: 22, max: 40 },
              { label: "B", min: 16, q1: 20, mediane: 22, q3: 24, max: 30, couleur: ORANGE },
            ],
            { min: 12, max: 40, step: 2 },
          ),
          correction:
            "a) On lit le trait dans chaque boîte : $18$ pour A, $22$ pour B. Médianes : $1\\,800$ € et $2\\,200$ €. C'est B.\nb) A : $22 - 16 = 6$, soit $600$ €. B : $24 - 20 = 4$, soit $400$ €. Les salaires du milieu sont plus resserrés dans B.\nc) Dans B : $Q_1 = 20$. Au plus un quart des salariés gagnent moins de $2\\,000$ €, donc au moins $75$ % gagnent $2\\,000$ € ou plus.\nd) Dans A : sa moustache va jusqu'à $40$, soit $4\\,000$ €.\n⭐ A a le plus haut salaire, mais B paie mieux la plupart de ses salariés. Deux indicateurs, deux réponses.\n⚠️ On traduit l'unité : « $22$ » veut dire $2\\,200$ €.",
          micros: ["auto_stat_boites", "auto_stat_interpreter_indicateurs"],
        },
        {
          titre: "Les absences",
          enonce: "Le tableau donne le nombre de jours d'absence, sur un mois, des $25$ salariés d'un atelier.\na) Déterminer la médiane, $Q_1$ et $Q_3$.\nb) Calculer le nombre moyen de jours d'absence.",
          figure: tableau(["Jours d'absence", "0", "1", "2", "3", "4"], ["Effectif", 8, 6, 5, 4, 2]),
          correction:
            "On cumule les effectifs : $8$, $14$, $19$, $23$, $25$.\na) $25$ valeurs : la médiane est la $13^e$. Les rangs $9$ à $14$ valent $1$ : la médiane est $1$ jour.\n$\\dfrac{25}{4} = 6{,}25$, arrondi à $7$ : la $7^e$ valeur est $0$, donc $Q_1 = 0$.\n$\\dfrac{3 \\times 25}{4} = 18{,}75$, arrondi à $19$ : les rangs $15$ à $19$ valent $2$, donc $Q_3 = 2$.\nb) $0 \\times 8 + 1 \\times 6 + 2 \\times 5 + 3 \\times 4 + 4 \\times 2 = 0 + 6 + 10 + 12 + 8 = 36$ jours en tout.\nMoyenne : $\\dfrac{36}{25} = \\dfrac{144}{100} = 1{,}44$ jour.\n⛔ Le piège au a) : prendre la valeur du milieu du TABLEAU, $2$. On cherche le salarié du milieu, pas la colonne du milieu.",
          micros: ["auto_stat_mediane", "auto_stat_quartiles", "auto_stat_moyenne"],
        },
        {
          titre: "Le patrimoine des ménages",
          enonce: "Dans un pays (modèle), le patrimoine MÉDIAN des ménages est de $180\\,000$ € et le patrimoine MOYEN de $300\\,000$ €.\na) Que signifie la médiane, en une phrase ?\nb) Pourquoi la moyenne est-elle beaucoup plus grande ?\nc) Un article écrit : « le ménage typique possède $300\\,000$ € ». Est-ce juste ?",
          correction:
            "a) La moitié des ménages possèdent $180\\,000$ € ou moins, l'autre moitié $180\\,000$ € ou plus.\nb) Quelques ménages très riches ont des patrimoines énormes : ils tirent la moyenne vers le haut, pas la médiane.\nc) Non. Plus de la moitié des ménages possèdent moins de $300\\,000$ € (la médiane est bien en dessous). Le ménage « typique » est mieux décrit par la médiane.\n⭐ Quand la moyenne dépasse nettement la médiane, c'est le signe de quelques valeurs très grandes : les inégalités se lisent dans cet écart.",
          micros: ["auto_stat_interpreter_indicateurs"],
        },
        {
          titre: "Un climat en quatre nombres",
          enonce: "Températures moyennes de chaque mois, de janvier à décembre, dans une ville (modèle, en °C) : $4$, $5$, $8$, $11$, $15$, $18$, $21$, $20$, $17$, $13$, $8$, $4$.\na) Calculer la moyenne annuelle.\nb) Déterminer la médiane, $Q_1$ et $Q_3$.\nc) Compléter : « au moins un quart des mois ont une température moyenne d'au moins … °C ».",
          correction:
            "a) Somme : $144$. Moyenne : $\\dfrac{144}{12} = 12$ °C.\nb) On range : $4$, $4$, $5$, $8$, $8$, $11$, $13$, $15$, $17$, $18$, $20$, $21$.\nMédiane : $\\dfrac{11 + 13}{2} = 12$ °C. $Q_1$ : rang $3$, $Q_1 = 5$ °C. $Q_3$ : rang $9$, $Q_3 = 17$ °C.\nc) Les valeurs de rang $9$ à $12$ sont au moins égales à $Q_3$ : au moins un quart des mois ont au moins $17$ °C.\n⭐ Ici moyenne et médiane coïncident, $12$ °C : aucune valeur extrême ne tire la moyenne.\n⚠️ On range AVANT de chercher les rangs : l'ordre des mois n'est pas l'ordre des températures.",
          schema: boite([{ min: 4, q1: 5, mediane: 12, q3: 17, max: 21 }], { min: 2, max: 22, step: 2 }),
          micros: ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_quartiles", "auto_stat_interpreter_indicateurs"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des séries tirées de la vie économique : on calcule, on compare, et on dit ce que les nombres racontent.",
      rappel: [
        "On range TOUJOURS la série avant la médiane et les quartiles.",
        "Pour comparer deux séries : la médiane pour la position, l'écart interquartile pour la dispersion.",
        "On conclut par une phrase : un nombre n'est pas une réponse.",
      ],
      exercices: [
        {
          titre: "Le salaire du dirigeant",
          enonce: "Une entreprise compte $9$ personnes. Salaires mensuels nets, en euros : $1\\,600$, $1\\,700$, $1\\,700$, $1\\,800$, $1\\,900$, $2\\,000$, $2\\,100$, $2\\,400$, et $7\\,300$ pour le dirigeant.\na) Calculer le salaire moyen et le salaire médian.\nb) Combien de personnes gagnent moins que la moyenne ?\nc) Déterminer $Q_1$, $Q_3$ et l'écart interquartile.\nd) Le dirigeant s'augmente de $900$ €. Que deviennent la moyenne et la médiane ?",
          correction:
            "a) Somme : $22\\,500$ €. Moyenne : $\\dfrac{22\\,500}{9} = 2\\,500$ €.\n$9$ valeurs, déjà rangées : la médiane est la $5^e$, $1\\,900$ €.\nb) Huit personnes sur neuf gagnent moins de $2\\,500$ € : seul le dirigeant est au-dessus.\nc) $\\dfrac{9}{4} = 2{,}25$, arrondi à $3$ : $Q_1 = 1\\,700$ €. $\\dfrac{3 \\times 9}{4} = 6{,}75$, arrondi à $7$ : $Q_3 = 2\\,100$ €. Écart interquartile : $400$ €.\nd) La somme augmente de $900$ €, donc la moyenne de $\\dfrac{900}{9} = 100$ € : elle passe à $2\\,600$ €.\nLa $5^e$ valeur n'a pas changé : la médiane reste $1\\,900$ €.\n⭐ La moyenne suit le dirigeant ; la médiane et les quartiles décrivent les huit autres.",
          // ⛔ Axe de 2 000 en 2 000 (5 étiquettes) : à 375 px, les nombres
          // serrés autour de la boîte se touchaient (mesuré le 28/09).
          schema: boite([{ min: 1600, q1: 1700, mediane: 1900, q3: 2100, max: 7300 }], { min: 0, max: 8000, step: 2000 }),
          micros: ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_quartiles", "auto_stat_interpreter_indicateurs", "auto_stat_boites"],
        },
        {
          titre: "Deux quartiers",
          enonce: "Les boîtes donnent les loyers, en euros par m², des appartements de deux quartiers d'une ville (modèle).\na) Comparer les loyers médians.\nb) Comparer les écarts interquartiles, puis les étendues.\nc) Un étudiant cherche un loyer d'au plus $13$ € le m². Dans quel quartier est-il sûr de trouver le plus d'appartements en proportion ?\nd) Peut-on connaître le loyer moyen de chaque quartier ?",
          figure: boite(
            [
              { label: "Nord", min: 8, q1: 10, mediane: 12, q3: 13, max: 20 },
              { label: "Sud", min: 9, q1: 11, mediane: 12, q3: 16, max: 18, couleur: ORANGE },
            ],
            { min: 6, max: 22, step: 2 },
          ),
          correction:
            "a) Même médiane, $12$ € le m² : la moitié des appartements de chaque quartier sont à $12$ € ou moins.\nb) Écarts interquartiles : Nord $13 - 10 = 3$, Sud $16 - 11 = 5$. Au centre, le Sud est plus dispersé.\nÉtendues : Nord $20 - 8 = 12$, Sud $18 - 9 = 9$. Aux extrêmes, c'est le Nord.\nc) Au Nord, $Q_3 = 13$ : au moins $75$ % des appartements sont à $13$ € ou moins.\nAu Sud, $13$ est entre la médiane et $Q_3$ : on est sûr d'au moins $50$ % seulement. C'est le Nord.\nd) Non : une boîte donne cinq nombres, jamais la moyenne.\n⭐ Même médiane, deux quartiers très différents : un seul nombre ne suffit pas.",
          micros: ["auto_stat_boites", "auto_stat_quartiles", "auto_stat_interpreter_indicateurs"],
        },
        {
          titre: "L'âge des salariés",
          enonce: "Le diagramme donne la répartition par âge des $50$ salariés d'une entreprise (modèle), en classes de $10$ ans : de $20$ à $30$ ans, de $30$ à $40$ ans, etc.\na) Estimer l'âge moyen.\nb) Dans quelle classe se trouve l'âge médian ?\nc) Si personne ne part et personne n'arrive, quel sera l'âge moyen dans $10$ ans ?\nd) Quelle part des salariés a $50$ ans ou plus ? Pourquoi la direction s'y intéresse-t-elle ?",
          figure: diagramme("barres", [
            { label: "20-30 ans", value: 12 },
            { label: "30-40", value: 18 },
            { label: "40-50", value: 14 },
            { label: "50-60", value: 6 },
          ]),
          correction:
            "a) Centres : $25$, $35$, $45$ et $55$ ans.\n$25 \\times 12 + 35 \\times 18 + 45 \\times 14 + 55 \\times 6 = 300 + 630 + 630 + 330 = 1\\,890$.\n$\\dfrac{1\\,890}{50} = 37{,}8$ ans (diviser par $50$, c'est multiplier par $2$ puis diviser par $100$).\nb) $50$ salariés : la médiane est entre le $25^e$ et le $26^e$. Effectifs cumulés : $12$, puis $30$. Ils sont dans la classe $[30\\,;\\,40[$.\nc) Chacun a $10$ ans de plus : la moyenne augmente aussi de $10$, soit environ $47{,}8$ ans.\nd) $\\dfrac{6}{50} = \\dfrac{12}{100} = 12$ %. Ce sont les prochains départs à la retraite : il faudra recruter ou former pour les remplacer.\n⚠️ Au a), c'est une ESTIMATION : on a remplacé chaque âge par le centre de sa classe.",
          micros: ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_interpreter_indicateurs"],
        },
        {
          titre: "Le don moyen",
          enonce: "Une association a reçu $10$ dons, en euros : $10$, $20$, $20$, $30$, $40$, $40$, $50$, $60$, $130$, $1\\,000$.\na) Calculer le don moyen et le don médian.\nb) Déterminer $Q_1$, $Q_3$ et l'écart interquartile.\nc) Recalculer la moyenne et la médiane sans le don de $1\\,000$ €.\nd) Pour sa campagne, l'association écrit : « don moyen : $140$ € ». Pourquoi est-ce trompeur ?",
          correction:
            "a) Somme : $1\\,400$ €. Moyenne : $\\dfrac{1\\,400}{10} = 140$ €.\n$10$ valeurs, déjà rangées : médiane $\\dfrac{40 + 40}{2} = 40$ €.\nb) $\\dfrac{10}{4} = 2{,}5$, arrondi à $3$ : $Q_1 = 20$ €. $\\dfrac{30}{4} = 7{,}5$, arrondi à $8$ : $Q_3 = 60$ €. Écart interquartile : $40$ €.\nc) Il reste $9$ dons, de somme $400$ € : moyenne $\\dfrac{400}{9} \\approx 44$ €. La médiane est la $5^e$ valeur, $40$ € : elle n'a pas bougé.\nd) Neuf donateurs sur dix ont donné moins de $140$ €. C'est un seul don de $1\\,000$ € qui fait la moyenne.\nUn nouveau donateur qui lit « $140$ € » croit qu'on attend de lui bien plus que ce que donne la plupart des gens.\n⭐ Une valeur sur dix a multiplié la moyenne par plus de trois ; la médiane, elle, n'a pas bougé.",
          schema: diagramme("barres", [
            { label: "D1", value: 10 },
            { label: "D2", value: 20 },
            { label: "D3", value: 20 },
            { label: "D4", value: 30 },
            { label: "D5", value: 40 },
            { label: "D6", value: 40 },
            { label: "D7", value: 50 },
            { label: "D8", value: 60 },
            { label: "D9", value: 130 },
            { label: "D10", value: 1000 },
          ], 9),
          micros: ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_quartiles", "auto_stat_interpreter_indicateurs"],
        },
      ],
    },
  ],
};
