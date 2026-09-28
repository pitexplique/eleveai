// ─── Fiche d'exercices : lire des graphiques statistiques (1re, automatismes) ──
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : des pourcentages multiples de 5, des totaux ronds.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts`
// (notionId auto_lire_statistiques) : lire une barre, additionner des barres,
// passer d'un pourcentage du diagramme circulaire à un effectif.
//
// ⭐⭐ LE FIL : UN GRAPHIQUE SE LIT AVANT DE SE CALCULER. Le titre, ce que porte
// chaque axe, la graduation — puis seulement les nombres. Deux pièges tiennent
// toute la feuille : l'axe qui ne part pas de zéro (exercices 3 et 18) et le
// diagramme circulaire qui montre des PARTS, pas des effectifs (exercices 5,
// 16, 17).
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (chaque exercice en lit ou en construit un) et un lien à
// l'ÉCONOMIE ou à l'HISTOIRE-GÉO (population par âge, élections, salaires,
// sondage, loyers, mix électrique, budget d'un ménage, jours de forte chaleur).
// Les chiffres sont des MODÈLES arrondis, jamais présentés comme des données
// officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-lire-statistiques.mjs`.
//
// Micro-compétences : auto_stat_lire_graphique (1, 2, 3, 8, 9, 11, 18, 20),
// auto_stat_graphiques_usuels (4, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20),
// auto_stat_graphique_donnees (4, 5, 6, 7, 10, 11, 12, 13, 15, 16, 17, 18, 19,
// 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

export const exercicesAutoLireStatistiquesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-lire-statistiques",
  titre: "Lire des graphiques statistiques",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : lire un diagramme en barres, en bâtons, circulaire, un nuage de points, et passer du graphique aux données puis des données au graphique. Population par âge, élections, salaires, loyers, budget d'un ménage, jours de forte chaleur. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par exercice. Sans calculatrice.",
      rappel: [
        "Avant de lire : le TITRE, puis ce que porte chaque AXE (quoi, en quelle unité), puis la GRADUATION (de combien en combien).",
        "Diagramme en barres ou en bâtons : on lit la HAUTEUR. Diagramme circulaire : chaque secteur est une PART du tout, et $100$ % font $360°$.",
        "Du pourcentage à l'effectif : on multiplie le pourcentage par le total. De l'effectif au pourcentage : $\\dfrac{\\text{effectif}}{\\text{total}}$.",
      ],
      exercices: [
        {
          enonce:
            "Le diagramme donne les ventes mensuelles de trottinettes d'un magasin.\na) Combien de trottinettes ont été vendues en mars ?\nb) Quel mois a eu le plus de ventes ?\nc) Combien de trottinettes de plus en avril qu'en janvier ?",
          figure: diagramme("barres", [
            { label: "Janvier", value: 120 },
            { label: "Février", value: 150 },
            { label: "Mars", value: 90 },
            { label: "Avril", value: 240 },
          ]),
          correction:
            "a) On repère la barre de mars, puis on lit sa hauteur : $90$ trottinettes.\nb) La barre la plus haute est celle d'avril : $240$ trottinettes.\nc) On fait la différence des deux hauteurs : $240 - 120 = 120$ trottinettes de plus.\n⭐ Avril a vendu exactement deux fois plus que janvier : $240 = 2 \\times 120$.\n⚠️ On vérifie l'unité avant de répondre : des trottinettes, pas des euros.",
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "Sur l'axe vertical d'un diagramme en barres, on lit $0$ puis $200$, et il y a $5$ intervalles égaux entre les deux.\na) Que vaut une graduation ?\nb) Une barre s'arrête $3$ graduations au-dessus du $200$. Quelle valeur représente-t-elle ?",
          correction:
            "a) On partage $200$ en $5$ parts égales : $200 \\div 5 = 40$. Une graduation vaut $40$.\nb) Trois graduations au-dessus de $200$ : $200 + 3 \\times 40 = 200 + 120 = 320$.\n⚠️ Le piège : croire qu'une graduation vaut $1$, ou $10$. On ne la devine pas, on la CALCULE à partir de deux nombres écrits sur l'axe.",
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "Un graphique montre le prix d'un même panier de courses : $102$ € en 2023 et $104$ € en 2024. L'axe vertical commence à $100$ €. Sur le dessin, la barre de 2024 paraît deux fois plus haute que celle de 2023. Le prix a-t-il doublé ?",
          correction:
            "Au-dessus de $100$ €, les barres dépassent de $102 - 100 = 2$ et de $104 - 100 = 4$ : c'est pour cela que l'une paraît deux fois plus haute que l'autre.\nMais le vrai prix passe de $102$ € à $104$ € : il augmente de $2$ €.\n$2$ € sur un peu plus de $100$ €, c'est un peu moins de $2$ %.\nLe prix n'a pas doublé : il a augmenté d'à peine $2$ %.\n⛔ Le piège : l'axe ne part pas de ZÉRO. On regarde toujours où commence l'axe avant de comparer des hauteurs.",
          schema: diagramme("barres", [
            { label: "2023", value: 102 },
            { label: "2024", value: 104 },
          ]),
          micros: ["auto_stat_lire_graphique"],
        },
        {
          enonce:
            "Le diagramme en bâtons donne le nombre d'enfants des $20$ familles d'un immeuble.\na) Combien de familles ont $2$ enfants ?\nb) Combien de familles ont au moins $2$ enfants ?\nc) Combien d'enfants vivent dans l'immeuble ?",
          figure: diagramme("batons", [
            { label: "0 enfant", value: 4 },
            { label: "1", value: 7 },
            { label: "2", value: 6 },
            { label: "3", value: 2 },
            { label: "4", value: 1 },
          ]),
          correction:
            "a) Le bâton au-dessus de $2$ a pour hauteur $6$ : $6$ familles.\nb) Au moins $2$, c'est $2$, $3$ ou $4$ enfants : $6 + 2 + 1 = 9$ familles.\nc) Chaque famille compte autant d'enfants que l'indique son abscisse.\n$0 \\times 4 + 1 \\times 7 + 2 \\times 6 + 3 \\times 2 + 4 \\times 1 = 0 + 7 + 12 + 6 + 4 = 29$ enfants.\n⛔ Le piège au c) : répondre $20$. La HAUTEUR compte des familles ; l'ABSCISSE, des enfants.",
          micros: ["auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Le diagramme circulaire donne la répartition, en pourcentage, des $400$ élèves d'un lycée selon leur mode de transport. Combien d'élèves viennent à pied ?",
          figure: diagramme("camembert", [
            { label: "Bus", value: 50 },
            { label: "Voiture", value: 25 },
            { label: "À pied", value: 15 },
            { label: "Vélo", value: 10 },
          ]),
          correction:
            "On lit la part des élèves à pied : $15$ %.\nOn l'applique au total : $15$ % de $400$, c'est $0{,}15 \\times 400 = 60$.\nDe tête : $10$ % de $400$ font $40$, $5$ % font $20$, donc $15$ % font $60$.\n$60$ élèves viennent à pied.\n⛔ Le piège : répondre « $15$ élèves ». $15$ est un POURCENTAGE, pas un nombre d'élèves.",
          schema: diagramme("barres", [
            { label: "Bus", value: 200 },
            { label: "Voiture", value: 100 },
            { label: "À pied", value: 60 },
            { label: "Vélo", value: 40 },
          ], 2),
          micros: ["auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Pour élire le délégué, $24$ élèves ont voté : $12$ voix pour Inès, $9$ pour Tom, $3$ pour Sami. On veut tracer le diagramme circulaire des voix. Quel angle donner à chaque secteur ?",
          correction:
            "Les $24$ voix se partagent les $360°$ du disque : une voix vaut $360 \\div 24 = 15°$.\nInès : $12 \\times 15 = 180°$. Tom : $9 \\times 15 = 135°$. Sami : $3 \\times 15 = 45°$.\n✔️ Vérification : $180 + 135 + 45 = 360°$.\n⭐ Inès a la moitié des voix, et son secteur est un demi-disque.",
          schema: diagramme("camembert", [
            { label: "Inès", value: 12 },
            { label: "Tom", value: 9 },
            { label: "Sami", value: 3 },
          ]),
          micros: ["auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Sur $50$ personnes interrogées, $20$ préfèrent le train, $18$ la voiture et $12$ l'avion. On veut un diagramme en barres EN POURCENTAGES. Quelle hauteur, en %, donner à chaque barre ?",
          correction:
            "On divise chaque effectif par le total $50$.\nAstuce : sur $50$, il suffit de multiplier par $2$ pour obtenir un pourcentage.\nTrain : $20 \\times 2 = 40$ %. Voiture : $18 \\times 2 = 36$ %. Avion : $12 \\times 2 = 24$ %.\n✔️ Vérification : $40 + 36 + 24 = 100$ %.\n⚠️ Un diagramme en pourcentages doit toujours faire $100$ % au total.",
          schema: diagramme("barres", [
            { label: "Train (%)", value: 40 },
            { label: "Voiture (%)", value: 36 },
            { label: "Avion (%)", value: 24 },
          ]),
          micros: ["auto_stat_graphique_donnees"],
        },
        {
          enonce:
            "Dans un diagramme en barres, $1$ cm de hauteur représente $50$ élèves.\na) Quelle hauteur donner à une barre de $175$ élèves ?\nb) Combien d'élèves représente une barre de $4{,}4$ cm ?",
          correction:
            "a) On cherche combien de fois $50$ il y a dans $175$ : $175 \\div 50 = 3{,}5$. La barre mesure $3{,}5$ cm.\nb) On fait le chemin inverse : $4{,}4 \\times 50 = 220$ élèves.\n⭐ L'échelle se lit dans les deux sens : on divise pour dessiner, on multiplie pour lire.\n⚠️ Le piège : croire que la hauteur en cm EST le nombre d'élèves.",
          micros: ["auto_stat_lire_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire, calculer, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Un graphique se commente en trois temps : ce qu'on LIT (des valeurs), ce qu'on COMPARE (des écarts), ce qu'on CONCLUT (une phrase).",
        "Diagramme circulaire : des PARTS d'un même tout. Diagramme en barres : des VALEURS à comparer. Nuage de points : deux grandeurs qui varient ou non ensemble.",
        "Un pourcentage ne dit rien sans son total : $20$ % de $500$ n'est pas $20$ % de $50$.",
      ],
      exercices: [
        {
          titre: "La population par âge",
          enonce:
            "Le diagramme donne la population d'un pays européen par tranche d'âge (modèle arrondi, en millions d'habitants).\na) Quelle est la population totale ?\nb) Combien de personnes ont $60$ ans ou plus ?\nc) Représentent-elles plus ou moins d'un quart de la population ?",
          figure: diagramme("barres", [
            { label: "0-19 ans", value: 16 },
            { label: "20-39", value: 16 },
            { label: "40-59", value: 17 },
            { label: "60-79", value: 15 },
            { label: "80 et +", value: 4 },
          ]),
          correction:
            "a) On additionne les cinq barres : $16 + 16 + 17 + 15 + 4 = 68$ millions d'habitants.\nb) $60$ ans ou plus, ce sont les deux dernières barres : $15 + 4 = 19$ millions.\nc) Un quart de $68$ millions, c'est $68 \\div 4 = 17$ millions.\n$19 > 17$ : les $60$ ans ou plus représentent PLUS d'un quart de la population.\n⭐ Comparer à une fraction simple (un quart) évite une division difficile.\n⚠️ On lit des MILLIONS : $19$ millions de personnes, pas $19$ personnes.",
          micros: ["auto_stat_lire_graphique", "auto_stat_graphiques_usuels"],
        },
        {
          titre: "Les municipales",
          enonce:
            "Au second tour d'une élection municipale, il y a eu $2\\,000$ suffrages exprimés. Le diagramme donne la part de chaque liste (modèle, en %).\na) Combien de voix a obtenu chaque liste ?\nb) Quel est l'angle du secteur de la liste A ?\nc) La liste A a-t-elle obtenu la majorité absolue, c'est-à-dire plus de la moitié des suffrages ?",
          figure: diagramme("camembert", [
            { label: "Liste A", value: 45 },
            { label: "Liste B", value: 35 },
            { label: "Liste C", value: 20 },
          ]),
          correction:
            "a) $1$ % de $2\\,000$, c'est $20$ voix.\nListe A : $45 \\times 20 = 900$ voix. Liste B : $35 \\times 20 = 700$ voix. Liste C : $20 \\times 20 = 400$ voix.\n✔️ Vérification : $900 + 700 + 400 = 2\\,000$.\nb) $45$ % de $360°$ : $0{,}45 \\times 360 = 162°$ (la moitié de $360$ fait $180$, on retire $5$ %, soit $18$).\nc) La majorité absolue demande plus de $50$ %, soit plus de $1\\,000$ voix. A n'a que $45$ % : non.\nA est pourtant EN TÊTE : $900$ voix, plus que chacune des deux autres listes.\n⭐ « En tête » et « majorité absolue » sont deux choses différentes.",
          micros: ["auto_stat_graphique_donnees", "auto_stat_graphiques_usuels"],
        },
        {
          titre: "Les salaires d'une entreprise",
          enonce:
            "Le diagramme donne la répartition des $200$ salariés d'une entreprise selon leur salaire mensuel net, en milliers d'euros (modèle). Les classes ont toutes la même largeur, $500$ €.\na) Combien de salariés gagnent entre $2\\,000$ € et $2\\,500$ € ?\nb) Combien gagnent moins de $2\\,500$ € ? Quel pourcentage cela fait-il ?\nc) Quel pourcentage gagne au moins $3\\,000$ € ?\nd) Peut-on savoir combien de salariés gagnent exactement $2\\,200$ € ?",
          figure: diagramme("barres", [
            { label: "1,5 à 2", value: 60 },
            { label: "2 à 2,5", value: 70 },
            { label: "2,5 à 3", value: 40 },
            { label: "3 à 3,5", value: 20 },
            { label: "3,5 à 4", value: 10 },
          ]),
          correction:
            "a) C'est la barre « $2$ à $2{,}5$ » : $70$ salariés.\nb) Moins de $2\\,500$ €, ce sont les deux premières barres : $60 + 70 = 130$ salariés.\nEn pourcentage : $\\dfrac{130}{200} = \\dfrac{65}{100} = 65$ %.\nc) Au moins $3\\,000$ €, ce sont les deux dernières barres : $20 + 10 = 30$ salariés, soit $\\dfrac{30}{200} = 15$ %.\nd) Non. Le graphique REGROUPE les salaires par classes : on sait que $70$ salariés sont entre $2\\,000$ et $2\\,500$ €, pas comment ils s'y répartissent.\n⚠️ Un graphique par classes perd le détail des valeurs : on ne peut pas le « dé-regrouper ».",
          micros: ["auto_stat_lire_graphique", "auto_stat_graphique_donnees"],
        },
        {
          titre: "Le sondage",
          enonce:
            "Un institut interroge $1\\,200$ personnes sur une réforme (modèle). Résultats : très favorable $15$ %, plutôt favorable $30$ %, plutôt opposé $35$ %, très opposé $20$ %.\na) Combien de personnes interrogées sont favorables, très ou plutôt ?\nb) Un titre annonce : « Une majorité des sondés opposés à la réforme ». Les chiffres le permettent-ils ?\nc) Dans un diagramme circulaire, quel angle donner au secteur « très opposé » ?",
          correction:
            "a) Favorables : $15 + 30 = 45$ %. $1$ % de $1\\,200$, c'est $12$ : $45 \\times 12 = 540$ personnes.\nb) Opposés : $35 + 20 = 55$ %, plus de la moitié : oui, parmi les sondés, les opposés sont majoritaires.\n⚠️ C'est un SONDAGE : $1\\,200$ personnes, pas toute la population. Le résultat réel peut être un peu différent.\nc) $20$ % de $360°$ : $0{,}2 \\times 360 = 72°$.\n✔️ Les quatre parts font bien $15 + 30 + 35 + 20 = 100$ %.",
          // ⛔ Libellés de 8 signes au plus : à 375 px, « Très favorable »
          // chevauchait « Très opposé » (mesuré le 28/09).
          schema: diagramme("camembert", [
            // Les deux petits secteurs séparés par un grand : bouclé, le cercle
            // mettait « T. pour » contre « T. contre » (mesuré le 28/09).
            { label: "T. pour", value: 15 },
            { label: "Pour", value: 30 },
            { label: "T. contre", value: 20 },
            { label: "Contre", value: 35 },
          ]),
          micros: ["auto_stat_graphique_donnees", "auto_stat_graphiques_usuels"],
        },
        {
          titre: "Les loyers d'une ville",
          enonce:
            "Chaque point du nuage est un appartement d'une ville : en abscisse, sa surface en DIZAINES de m² ; en ordonnée, son loyer mensuel en CENTAINES d'euros (modèle).\na) Quel est le loyer de l'appartement de $40$ m² ?\nb) Le loyer augmente-t-il avec la surface ?\nc) Calculer le loyer au m² de l'appartement de $20$ m², puis de celui de $60$ m². Que remarque-t-on ?",
          figure: repere([-1, 7, -1, 13], [], [
            { x: 2, y: 5 },
            { x: 3, y: 6 },
            { x: 4, y: 8 },
            { x: 5, y: 9 },
            { x: 6, y: 12 },
          ]),
          correction:
            "a) $40$ m², c'est $4$ dizaines : le point d'abscisse $4$ a pour ordonnée $8$. Le loyer est de $8$ centaines d'euros, soit $800$ €.\nb) Oui : plus on va à droite, plus les points montent. Les deux grandeurs varient dans le même sens.\nc) $20$ m² : le point $(2\\,;\\,5)$, donc $500$ €, et $\\dfrac{500}{20} = 25$ € le m².\n$60$ m² : le point $(6\\,;\\,12)$, donc $1\\,200$ €, et $\\dfrac{1\\,200}{60} = 20$ € le m².\nLe petit appartement coûte PLUS CHER au m².\n⚠️ On traduit les unités des axes avant de répondre : « $8$ » veut dire $800$ €.",
          micros: ["auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"],
        },
        {
          titre: "Le bon graphique",
          enonce:
            "Pour chaque situation, quel graphique choisir : diagramme circulaire, diagramme en barres, ou nuage de points ?\na) La répartition des sièges d'une assemblée entre les partis.\nb) Le nombre de touristes accueillis dans un pays chaque année, de 2015 à 2024.\nc) Pour $30$ pays, le revenu moyen par habitant et l'espérance de vie.\nd) Les budgets des cinq ministères les mieux dotés.",
          correction:
            "a) Circulaire : les sièges forment un TOUT, qu'on partage entre les partis.\nb) Barres : on compare des valeurs, année après année, et on voit l'évolution.\nc) Nuage de points : chaque pays porte DEUX nombres, un point par pays.\nd) Barres : on compare cinq valeurs.\n⛔ Le piège au d) : un diagramme circulaire. Cinq ministères ne font pas TOUT le budget de l'État : leurs parts ne forment pas un tout.",
          micros: ["auto_stat_graphiques_usuels"],
        },
        {
          titre: "Le mix électrique",
          enonce:
            "Dans le diagramme circulaire de la production d'électricité d'un pays (modèle), le secteur « nucléaire » mesure $234°$, le secteur « renouvelables » $90°$, et le secteur « fossiles » le reste. La production totale est de $500$ TWh.\na) Quel est l'angle du secteur « fossiles » ?\nb) Quelle part de la production représente chaque source ?\nc) Combien de TWh produit chaque source ?",
          correction:
            "a) Le disque fait $360°$ : $360 - 234 - 90 = 36°$.\nb) On divise chaque angle par $360$.\nRenouvelables : $\\dfrac{90}{360} = \\dfrac{1}{4} = 25$ %. Fossiles : $\\dfrac{36}{360} = \\dfrac{1}{10} = 10$ %.\nNucléaire : le reste, $100 - 25 - 10 = 65$ %. ✔️ $0{,}65 \\times 360 = 216 + 18 = 234°$.\nc) Nucléaire : $0{,}65 \\times 500 = 325$ TWh. Renouvelables : $125$ TWh. Fossiles : $50$ TWh.\n✔️ $325 + 125 + 50 = 500$.\n⭐ Le calcul le plus dur, $\\dfrac{234}{360}$, s'évite en trouvant d'abord les deux parts faciles.",
          schema: diagramme("camembert", [
            { label: "Nucléaire", value: 65 },
            { label: "Renouvelables", value: 25 },
            { label: "Fossiles", value: 10 },
          ]),
          micros: ["auto_stat_graphique_donnees"],
        },
        {
          titre: "Moins de cadres ?",
          enonce:
            "En 2000, une entreprise comptait $50$ salariés, dont $20$ % de cadres. En 2020, elle en compte $200$, dont $15$ % de cadres. Sur les deux diagrammes circulaires, le secteur « cadres » a rétréci. Le nombre de cadres a-t-il baissé ?",
          correction:
            "En 2000 : $20$ % de $50$, c'est $10$ cadres.\nEn 2020 : $15$ % de $200$, c'est $30$ cadres.\nLe nombre de cadres a TRIPLÉ, alors que leur part a baissé.\nC'est l'entreprise entière qui a grandi plus vite que le nombre de cadres.\n⛔ Le piège : un diagramme circulaire montre des PARTS. Il ne dit rien des effectifs, tant qu'on ne connaît pas le total.",
          schema: diagramme("barres", [
            { label: "Cadres en 2000", value: 10 },
            { label: "Cadres en 2020", value: 30 },
          ]),
          micros: ["auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On lit le graphique en entier (titre, axes, unités) avant la première question.",
        "Une PART (un pourcentage) et un EFFECTIF (un nombre de personnes) ne racontent pas la même histoire : on passe de l'un à l'autre avec le total.",
        "On conclut par une phrase qui répond à la question posée.",
      ],
      exercices: [
        {
          titre: "Une ville qui vieillit",
          enonce:
            "Les deux tableaux donnent la répartition des habitants d'une ville par âge, en 1975 et en 2025 (modèle). La ville comptait $50\\,000$ habitants en 1975 et $60\\,000$ en 2025.\na) Calculer le nombre d'habitants de chaque tranche d'âge, en 1975 puis en 2025.\nb) Le nombre de personnes de $60$ ans et plus a-t-il doublé ?\nc) La part des $20$-$59$ ans n'a pas bougé. Leur nombre non plus ?\nd) Quel graphique permettrait de comparer les EFFECTIFS des deux années ?",
          figure: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Âge", "0-19", "20-59", "60 et +"], ["1975 (%)", 35, 50, 15])}
              {tableau(["Âge", "0-19", "20-59", "60 et +"], ["2025 (%)", 22, 50, 28])}
            </div>
          ),
          correction:
            "a) 1975 : $1$ % de $50\\,000$, c'est $500$. Donc $35 \\times 500 = 17\\,500$ jeunes, $50 \\times 500 = 25\\,000$ adultes de $20$ à $59$ ans, $15 \\times 500 = 7\\,500$ personnes de $60$ ans et plus.\n2025 : $1$ % de $60\\,000$, c'est $600$. Donc $22 \\times 600 = 13\\,200$, $50 \\times 600 = 30\\,000$ et $28 \\times 600 = 16\\,800$.\n✔️ $17\\,500 + 25\\,000 + 7\\,500 = 50\\,000$ et $13\\,200 + 30\\,000 + 16\\,800 = 60\\,000$.\nb) Le double de $7\\,500$ est $15\\,000$, et $16\\,800 > 15\\,000$ : leur nombre a PLUS que doublé.\nc) Non : ils passent de $25\\,000$ à $30\\,000$. Même part, mais d'un total plus grand.\nd) Un diagramme en barres, avec pour chaque tranche deux barres côte à côte (1975 et 2025), en nombres d'habitants.\n⭐ Pendant ce temps, le nombre de jeunes a BAISSÉ, de $17\\,500$ à $13\\,200$ : la ville vieillit par les deux bouts.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Âge", "0-19", "20-59", "60 et +"], ["1975 (hab.)", "17 500", "25 000", "7 500"])}
              {tableau(["Âge", "0-19", "20-59", "60 et +"], ["2025 (hab.)", "13 200", "30 000", "16 800"])}
            </div>
          ),
          micros: ["auto_stat_graphique_donnees", "auto_stat_graphiques_usuels"],
        },
        {
          titre: "L'affiche électorale",
          enonce:
            "Au premier tour d'une élection (modèle), le candidat A obtient $26$ % des suffrages exprimés et le candidat B $24$ %. Le camp de A publie un diagramme en barres dont l'axe vertical commence à $22$ %, avec $1$ cm par point de pourcentage.\na) Quelle hauteur a chaque barre sur l'affiche ?\nb) Combien de fois la barre de A paraît-elle plus haute que celle de B ?\nc) Il y a eu $50\\,000$ suffrages exprimés. Combien de voix pour chacun ? Quel écart ?\nd) A a-t-il vraiment « deux fois plus » de voix que B ? Combien en a-t-il de plus, en pourcentage des voix de B ?",
          correction:
            "a) L'axe part de $22$ : la barre de A mesure $26 - 22 = 4$ cm, celle de B $24 - 22 = 2$ cm.\nb) $4$ cm contre $2$ cm : la barre de A paraît DEUX fois plus haute.\nc) $1$ % de $50\\,000$, c'est $500$. A : $26 \\times 500 = 13\\,000$ voix. B : $24 \\times 500 = 12\\,000$ voix. L'écart est de $1\\,000$ voix.\nd) Non. $1\\,000$ voix de plus sur $12\\,000$, c'est $\\dfrac{1}{12}$, environ $8$ % de plus. Très loin du double.\n⛔ Le piège : un axe qui ne part pas de zéro exagère les écarts. Redessiné à partir de $0$, les deux barres ont presque la même hauteur.",
          schema: diagramme("barres", [
            { label: "Candidat A (%)", value: 26 },
            { label: "Candidat B (%)", value: 24 },
          ]),
          micros: ["auto_stat_lire_graphique", "auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"],
        },
        {
          titre: "Le budget d'un ménage",
          enonce:
            "Un ménage dispose de $2\\,500$ € par mois. Le diagramme circulaire donne la part de chaque poste de dépense (modèle, en %).\na) Calculer le montant, en euros, de chaque poste.\nb) Le loyer augmente de $100$ €. Pour ne pas toucher à son épargne, le ménage réduit ses loisirs de $100$ €. Quelles sont les nouvelles parts du logement et des loisirs ?\nc) De combien de degrés le secteur « logement » grandit-il ?\nd) Un autre ménage gagne $5\\,000$ € et paie un loyer de $1\\,000$ €. Quelle est la part du logement dans son budget ? Comparer.",
          figure: diagramme("camembert", [
            // ⛔ Libellés courts : à 375 px, « Alimentation », « Transports » et
            // « Loisirs » se chevauchaient (mesuré le 28/09).
            { label: "Logement", value: 28 },
            { label: "Repas", value: 16 },
            { label: "Trajets", value: 14 },
            { label: "Loisirs", value: 12 },
            { label: "Épargne", value: 10 },
            { label: "Autres", value: 20 },
          ]),
          correction:
            "a) $1$ % de $2\\,500$ €, c'est $25$ €.\nLogement $28 \\times 25 = 700$ €, alimentation $400$ €, transports $350$ €, loisirs $300$ €, épargne $250$ €, autres $500$ €.\n✔️ $700 + 400 + 350 + 300 + 250 + 500 = 2\\,500$ €.\nb) Logement : $800$ €, soit $\\dfrac{800}{2\\,500} = \\dfrac{32}{100} = 32$ %. Loisirs : $200$ €, soit $\\dfrac{200}{2\\,500} = 8$ %.\nc) La part passe de $28$ % à $32$ % : $4$ points. Un point vaut $3{,}6°$, donc le secteur grandit de $4 \\times 3{,}6 = 14{,}4°$.\nd) $\\dfrac{1\\,000}{5\\,000} = 20$ %. Le loyer est plus élevé en euros, mais pèse MOINS dans le budget.\n⭐ Même dépense, poids différent : tout dépend du total. C'est pourquoi une hausse des loyers touche davantage les petits budgets.",
          micros: ["auto_stat_graphique_donnees", "auto_stat_graphiques_usuels"],
        },
        {
          titre: "Les journées de forte chaleur",
          enonce:
            "Une station météo a compté, décennie par décennie, les jours où il a fait plus de $35$ °C (modèle, pas des relevés réels). La barre « 1970 » couvre les années 1970 à 1979, et ainsi de suite.\na) Combien de jours de forte chaleur dans les années 2000 ? Combien en moyenne par an ?\nb) Un élève affirme : « le nombre augmente de $10$ à chaque décennie ». A-t-il raison ?\nc) Combien de fois plus de jours dans les années 2010 que dans les années 1970 ?\nd) Sur les cinq décennies, les années 2010 représentent-elles plus d'un tiers des jours de forte chaleur ?",
          figure: diagramme("barres", [
            { label: "1970", value: 10 },
            { label: "1980", value: 10 },
            { label: "1990", value: 20 },
            { label: "2000", value: 30 },
            { label: "2010", value: 50 },
          ]),
          correction:
            "a) La barre « 2000 » : $30$ jours. Une décennie compte $10$ ans : $30 \\div 10 = 3$ jours par an en moyenne.\nb) On calcule les écarts d'une barre à la suivante : $10 - 10 = 0$, $20 - 10 = 10$, $30 - 20 = 10$, $50 - 30 = 20$.\nNon : l'augmentation n'est pas régulière, et elle s'ACCÉLÈRE à la fin.\nc) $\\dfrac{50}{10} = 5$ : cinq fois plus.\nd) Total : $10 + 10 + 20 + 30 + 50 = 120$ jours. Un tiers de $120$, c'est $40$, et $50 > 40$ : oui, plus d'un tiers.\n⭐ Une seule décennie sur cinq concentre plus du tiers des jours de forte chaleur.",
          schema: tableau(["Décennie", "1980", "1990", "2000", "2010"], ["Écart avec la précédente", 0, 10, 10, 20]),
          micros: ["auto_stat_lire_graphique", "auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"],
        },
      ],
    },
  ],
};
