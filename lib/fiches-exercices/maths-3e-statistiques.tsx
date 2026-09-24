// ─── Fiche d'exercices : les statistiques (3e) — 20 exercices corrigés ────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-statistiques.tsx` et sur
// les huit micros du coach de 3e (notionId stat_statistique). On reste dans le
// programme de 3e : effectif et fréquence, moyenne (simple et avec effectifs),
// médiane, étendue, lecture d'un tableau (tableur) ou d'un diagramme, et le
// CHOIX de l'indicateur. ⛔ Ni quartiles, ni boîte, ni écart type : c'est la
// feuille de seconde (`maths-seconde-statistiques.tsx`).
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni 8 ; 10 ; 12, ni les
// deux classes de moyenne 12, ni les salaires 40 / 20).
//
// ⭐ LE FIL (celui de la fiche de cours) : savoir LEQUEL des trois nombres dit
// la vérité sur une série. L'orage du 14, les dirigeants du 19.
// Les pièges nommés : la médiane sans ranger (5, 6, 9), l'effectif pair (6, 10,
// 19), la moyenne avec effectifs faite comme une moyenne des valeurs (4, 15,
// 19), l'étendue prise pour le maximum (7, 18), la moyenne tirée par une valeur
// extrême (9, 14, 19).
//
// Les chiffres du monde, et d'où ils viennent :
// - pluie et températures mensuelles de Paris-Montsouris, normales 1991-2020 de
//   Météo-France (moyennes 5,4 ; 6,0 ; 9,2 ; 12,2 ; 15,6 ; 18,8 ; 20,9 ; 20,8 ;
//   17,2 ; 13,2 ; 8,7 ; 5,9 °C, année 12,8 °C ; pluie 47,6 ; 41,8 ; 45,2 ;
//   45,8 ; 69,0 ; 51,3 ; 59,4 ; 58,0 ; 44,7 ; 55,2 ; 54,3 ; 62,0 mm, année
//   634,3 mm), arrondies à l'unité dans la feuille — ex. 2, 10, 18 ;
// - France aux JO de Paris 2024 : 16 or, 26 argent, 22 bronze (tableau des
//   médailles du CIO) — ex. 8 ;
// - Eliud Kipchoge au marathon de Berlin (résultats officiels) : 2 h 04 min 00 s
//   (2015), 2 h 03 min 32 s (2017), 2 h 01 min 39 s (2018), 2 h 01 min 09 s
//   (2022, record du monde alors), 2 h 02 min 42 s (2023) — ex. 17.
// Le reste (match, pas, livres, salaires, orage) est inventé, et dit comme tel.
//
// ⭐ CHAQUE CORRIGÉ A SON DESSIN (« les élèves adorent les schémas ») : la série
// en barres, la série RANGÉE avec la médiane en couleur, ou une barre « Moy. » /
// « Méd. » en couleur à côté des valeurs.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-statistiques-3e.mjs`.
//
// Micro-compétences : stat_lire_tableau (1, 4, 9, 17, 19), stat_lire_graphique
// (2, 11, 18), stat_effectif_frequence (1, 8, 11), stat_moyenne (3, 4, 9, 10,
// 11, 12, 13, 14, 15, 17, 18, 19, 20), stat_mediane (5, 6, 9, 10, 11, 14, 16,
// 17, 18, 19, 20), stat_etendue (7, 9, 12, 16, 17, 18, 20), stat_interpreter
// (10, 12, 14, 16, 18, 19), stat_defi (13, 15, 16, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableau } from "@/lib/fiches-exercices/figures";

export const exercicesStatistiques3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "stat-statistique",
  titre: "Les statistiques",
  accroche:
    "Vingt exercices, du geste seul au problème : effectifs et fréquences, moyenne (avec effectifs aussi), médiane en rangeant d'abord, étendue, puis le vrai travail de la 3e : choisir le nombre qui dit la vérité sur une série. La pluie et les températures de Paris, les médailles de Paris 2024, les marathons de Kipchoge, un orage, des salaires tirés vers le haut par deux dirigeants. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé et un diagramme.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/stat-statistique", titre: "Statistiques : lire une série, et choisir ce qui la résume" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lire, compter, partager, ranger puis couper.",
      rappel: [
        "EFFECTIF : combien de fois une valeur apparaît. FRÉQUENCE : l'effectif divisé par l'effectif TOTAL, un nombre entre $0$ et $1$, souvent écrit en %.",
        "MOYENNE : la somme des valeurs divisée par leur nombre. Avec un tableau d'effectifs, chaque valeur compte autant de fois que son effectif.",
        "MÉDIANE : je RANGE d'abord. Nombre impair de valeurs : celle du milieu. Nombre pair : la moyenne des deux valeurs du milieu.",
        "ÉTENDUE : la plus grande valeur moins la plus petite. C'est un écart, pas un maximum.",
      ],
      exercices: [
        {
          enonce:
            "Une équipe de football a joué une saison. Le tableau donne le nombre de buts qu'elle a marqués à chaque match.\na) Combien de matchs a-t-elle marqué exactement $1$ but ?\nb) Combien de matchs a-t-elle joués en tout ?\nc) Combien de matchs avec au moins $2$ buts ? Quelle fréquence, en pourcentage ?\nd) Quelle est la fréquence des matchs sans but ?",
          figure: tableau(["Buts", "0", "1", "2", "3", "4"], ["Matchs", 4, 8, 7, 4, 2]),
          correction:
            "a) Je lis la colonne « $1$ but » : $8$ matchs.\nb) L'effectif total est la somme de la ligne des effectifs : $4 + 8 + 7 + 4 + 2 = 25$ matchs.\nc) Au moins $2$ buts, c'est $2$, $3$ ou $4$ buts : $7 + 4 + 2 = 13$ matchs. Fréquence : $\\dfrac{13}{25} = 0{,}52$, soit $52$ %.\nd) $\\dfrac{4}{25} = 0{,}16$, soit $16$ %.\n⛔ Le piège : diviser par $5$, le nombre de colonnes. La fréquence se calcule sur l'effectif TOTAL, les $25$ matchs.\nRéponse : $8$ matchs ; $25$ matchs ; $13$ matchs, soit $52$ % ; $16$ % sans but.",
          schema: diagramme("batons", [{ label: "0 but", value: 4 }, { label: "1", value: 8 }, { label: "2", value: 7 }, { label: "3", value: 4 }, { label: "4", value: 2 }], 1),
          micros: ["stat_lire_tableau", "stat_effectif_frequence"],
        },
        {
          enonce:
            "Le diagramme donne la hauteur de pluie tombée en moyenne chaque mois à Paris (station de Montsouris, normales 1991-2020 de Météo-France, arrondies au millimètre).\na) Quel est le mois le plus pluvieux ? Le plus sec ?\nb) Combien de mois reçoivent plus de $55$ mm ?\nc) Quelle hauteur de pluie tombe en juillet ?",
          figure: diagramme("barres", [{ label: "Jan", value: 48 }, { label: "Fév", value: 42 }, { label: "Mar", value: 45 }, { label: "Avr", value: 46 }, { label: "Mai", value: 69 }, { label: "Jun", value: 51 }, { label: "Jul", value: 59 }, { label: "Aoû", value: 58 }, { label: "Sep", value: 45 }, { label: "Oct", value: 55 }, { label: "Nov", value: 54 }, { label: "Déc", value: 62 }]),
          correction:
            "a) Je cherche la barre la plus haute : mai, avec $69$ mm. La plus basse : février, avec $42$ mm.\nb) Je passe les barres en revue et je garde celles qui dépassent $55$ : mai ($69$), juillet ($59$), août ($58$) et décembre ($62$). Cela fait $4$ mois.\nc) Je lis le haut de la barre de juillet : $59$ mm.\n⛔ Le piège au b) : compter octobre. Il reçoit $55$ mm tout juste, et « plus de $55$ » exclut $55$.\n⭐ Surprise : à Paris, le mois le plus sec n'est pas en été, c'est février.\nRéponse : mai ($69$ mm) et février ($42$ mm) ; $4$ mois ; $59$ mm.",
          schema: diagramme("barres", [{ label: "Jan", value: 48 }, { label: "Fév", value: 42 }, { label: "Mar", value: 45 }, { label: "Avr", value: 46 }, { label: "Mai", value: 69 }, { label: "Jun", value: 51 }, { label: "Jul", value: 59 }, { label: "Aoû", value: 58 }, { label: "Sep", value: 45 }, { label: "Oct", value: 55 }, { label: "Nov", value: 54 }, { label: "Déc", value: 62 }], 4),
          micros: ["stat_lire_graphique"],
        },
        {
          enonce: "Une basketteuse a marqué, sur ses six derniers matchs : $18$, $25$, $12$, $30$, $21$ et $14$ points. Calculer son nombre moyen de points par match.",
          correction:
            "J'additionne toutes les valeurs, puis je divise par leur nombre, ici $6$ matchs.\n$18 + 25 + 12 + 30 + 21 + 14 = 120$, et $\\dfrac{120}{6} = 20$.\n⭐ Contrôle : $20$ est bien entre le plus petit score, $12$, et le plus grand, $30$.\n⛔ Le piège : s'arrêter à la somme, $120$. Une moyenne plus grande que tous les scores est impossible : il manque la division.\nRéponse : elle marque en moyenne $20$ points par match.",
          schema: diagramme("barres", [{ label: "M1", value: 18 }, { label: "M2", value: 25 }, { label: "M3", value: 12 }, { label: "M4", value: 30 }, { label: "M5", value: 21 }, { label: "M6", value: 14 }, { label: "Moy.", value: 20 }], 6),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "On a demandé aux $25$ élèves d'une classe combien ils ont de frères et sœurs. Calculer le nombre moyen de frères et sœurs par élève.",
          figure: tableau(["Frères et sœurs", "0", "1", "2", "3", "4"], ["Élèves", 5, 10, 6, 3, 1]),
          correction:
            "Chaque valeur compte autant de fois que son effectif : je multiplie chaque valeur par son effectif, j'additionne, puis je divise par l'effectif total.\nEffectif total : $5 + 10 + 6 + 3 + 1 = 25$ élèves.\nSomme : $0 \\times 5 + 1 \\times 10 + 2 \\times 6 + 3 \\times 3 + 4 \\times 1 = 0 + 10 + 12 + 9 + 4 = 35$.\nMoyenne : $\\dfrac{35}{25} = 1{,}4$.\n⛔ Le piège : faire la moyenne des valeurs du tableau, $\\dfrac{0 + 1 + 2 + 3 + 4}{5} = 2$. Ce serait compter le seul élève qui a $4$ frères et sœurs autant que les $10$ qui en ont $1$.\nRéponse : $1{,}4$ frère ou sœur par élève, en moyenne.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Frères et sœurs", "0", "1", "2", "3", "4"], ["Valeur × effectif", 0, 10, 12, 9, 4])}
              {diagramme("batons", [{ label: "0", value: 5 }, { label: "1", value: 10 }, { label: "2", value: 6 }, { label: "3", value: 3 }, { label: "4", value: 1 }], 1)}
            </div>
          ),
          micros: ["stat_lire_tableau", "stat_moyenne"],
        },
        {
          enonce: "Voici les temps, en minutes, de neuf coureurs sur une course de $10$ km, dans l'ordre d'arrivée des dossards : $52$, $47$, $61$, $44$, $58$, $49$, $55$, $70$, $50$. Déterminer le temps médian.",
          correction:
            "Je RANGE d'abord, du plus petit au plus grand : $44$, $47$, $49$, $50$, $52$, $55$, $58$, $61$, $70$.\nIl y a $9$ valeurs, un nombre impair : la médiane est la valeur du milieu, la $5^e$, avec $4$ valeurs de chaque côté.\nDonc la médiane est $52$ minutes.\n⛔ Le piège : prendre la $5^e$ valeur de la liste telle qu'elle arrive, $58$. Sans ranger, le milieu de la liste ne veut rien dire.\nRéponse : le temps médian est $52$ min : la moitié des coureurs a mis $52$ min ou moins.",
          schema: diagramme("barres", [{ label: "1er", value: 44 }, { label: "2e", value: 47 }, { label: "3e", value: 49 }, { label: "4e", value: 50 }, { label: "5e", value: 52 }, { label: "6e", value: 55 }, { label: "7e", value: 58 }, { label: "8e", value: 61 }, { label: "9e", value: 70 }], 4),
          micros: ["stat_mediane"],
        },
        {
          enonce: "Une coureuse note ses kilomètres parcourus pendant huit semaines, de S1 à S8 : $32$, $45$, $28$, $40$, $36$, $50$, $30$, $38$. Déterminer la médiane de cette série.",
          correction:
            "Je range : $28$, $30$, $32$, $36$, $38$, $40$, $45$, $50$.\nIl y a $8$ valeurs, un nombre pair : pas de valeur au milieu. La médiane est la moyenne des deux valeurs centrales, la $4^e$ et la $5^e$ : $\\dfrac{36 + 38}{2} = 37$.\n⭐ $37$ n'est aucune des valeurs, et ce n'est pas grave : $4$ semaines sont en dessous, $4$ au-dessus.\n⛔ Le piège : avec un effectif pair, prendre une seule des deux valeurs centrales, ou les prendre sans ranger : $\\dfrac{40 + 36}{2} = 38$.\nRéponse : la médiane est $37$ km.",
          schema: diagramme("barres", [{ label: "S3", value: 28 }, { label: "S7", value: 30 }, { label: "S1", value: 32 }, { label: "S5", value: 36 }, { label: "S8", value: 38 }, { label: "S4", value: 40 }, { label: "S2", value: 45 }, { label: "S6", value: 50 }, { label: "Méd.", value: 37 }], 8),
          micros: ["stat_mediane"],
        },
        {
          enonce: "Voici les tailles, en cm, des sept joueurs d'une équipe de volley, de J1 à J7 : $186$, $201$, $194$, $178$, $205$, $190$, $197$. Calculer l'étendue de cette série.",
          correction:
            "L'étendue mesure l'écart entre les deux extrêmes : la plus grande valeur moins la plus petite.\nLa plus grande taille est $205$ cm (J5), la plus petite $178$ cm (J4).\nÉtendue : $205 - 178 = 27$ cm.\n⛔ Le piège : répondre $205$, la valeur maximale. L'étendue n'est pas un maximum, c'est un ÉCART.\n⛔ Autre piège : faire « dernière moins première » dans la liste non rangée, $197 - 186 = 11$.\nRéponse : l'étendue est $27$ cm : entre le plus petit et le plus grand joueur, il y a $27$ cm.",
          schema: diagramme("barres", [{ label: "J1", value: 186 }, { label: "J2", value: 201 }, { label: "J3", value: 194 }, { label: "J4", value: 178 }, { label: "J5", value: 205 }, { label: "J6", value: 190 }, { label: "J7", value: 197 }], 4),
          micros: ["stat_etendue"],
        },
        {
          enonce:
            "Aux Jeux olympiques de Paris 2024, la France a remporté $16$ médailles d'or, $26$ d'argent et $22$ de bronze.\na) Combien de médailles au total ?\nb) Calculer la fréquence de chaque couleur, en pourcentage arrondi au dixième.\nc) Vérifier que les fréquences font bien $100$ %.",
          correction:
            "a) $16 + 26 + 22 = 64$ médailles.\nb) La fréquence d'une couleur est son effectif divisé par l'effectif TOTAL, $64$.\nOr : $\\dfrac{16}{64} = 0{,}25$, soit $25$ %.\nArgent : $\\dfrac{26}{64} = 0{,}40625$, soit environ $40{,}6$ %.\nBronze : $\\dfrac{22}{64} = 0{,}34375$, soit environ $34{,}4$ %.\nc) $0{,}25 + 0{,}40625 + 0{,}34375 = 1$, soit $100$ %. Avec les arrondis : $25 + 40{,}6 + 34{,}4 = 100$.\n⛔ Le piège : diviser par $3$, le nombre de couleurs. On divise par le nombre de MÉDAILLES.\nRéponse : $64$ médailles ; or $25$ %, argent $40{,}6$ %, bronze $34{,}4$ %.",
          schema: diagramme("camembert", [{ label: "Or", value: 16 }, { label: "Argent", value: 26 }, { label: "Bronze", value: 22 }], 1),
          micros: ["stat_effectif_frequence"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet : tableur, diagramme, moyenne avec effectifs, comparer deux séries.",
      rappel: [
        "Avec des effectifs, la médiane se cherche dans les RANGS : j'additionne les effectifs au fur et à mesure (les effectifs cumulés).",
        "Une moyenne tombe toujours entre la plus petite et la plus grande valeur : c'est mon contrôle.",
        "Moyenne et médiane proches : la série est équilibrée. Très éloignées : une valeur extrême tire la moyenne.",
      ],
      exercices: [
        {
          enonce:
            "Un podomètre a compté les pas d'une personne pendant une semaine. Les nombres sont saisis dans un tableur, de la cellule B2 (lundi) à la cellule H2 (dimanche).\na) Quelle formule saisir en I2 pour obtenir la moyenne ?\nb) Calculer cette moyenne.\nc) Déterminer la médiane.\nd) Calculer l'étendue.",
          figure: tableau(["Jour", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"], ["Pas", "8 200", "10 500", "6 400", "12 000", "9 300", "15 100", "8 500"], true),
          correction:
            "a) La moyenne est la somme divisée par le nombre de jours : « =SOMME(B2:H2)/7 », ou directement « =MOYENNE(B2:H2) ».\nb) $8\\,200 + 10\\,500 + 6\\,400 + 12\\,000 + 9\\,300 + 15\\,100 + 8\\,500 = 70\\,000$, et $\\dfrac{70\\,000}{7} = 10\\,000$ pas par jour.\nc) Je range : $6\\,400$, $8\\,200$, $8\\,500$, $9\\,300$, $10\\,500$, $12\\,000$, $15\\,100$. $7$ valeurs : la médiane est la $4^e$, $9\\,300$ pas.\nd) $15\\,100 - 6\\,400 = 8\\,700$ pas.\n⭐ La moyenne ($10\\,000$) dépasse la médiane ($9\\,300$) : le samedi à $15\\,100$ pas tire la moyenne vers le haut.\n⛔ Le piège au c) : répondre $12\\,000$, la valeur du jeudi, au milieu de la SEMAINE mais pas au milieu de la série rangée.\nRéponse : $10\\,000$ pas en moyenne, médiane $9\\,300$ pas, étendue $8\\,700$ pas.",
          schema: diagramme("barres", [{ label: "Lun", value: 8200 }, { label: "Mar", value: 10500 }, { label: "Mer", value: 6400 }, { label: "Jeu", value: 12000 }, { label: "Ven", value: 9300 }, { label: "Sam", value: 15100 }, { label: "Dim", value: 8500 }, { label: "Moy.", value: 10000 }], 7),
          micros: ["stat_lire_tableau", "stat_moyenne", "stat_mediane", "stat_etendue"],
        },
        {
          enonce:
            "Reprendre les hauteurs de pluie de Paris de l'exercice 2, en mm, de janvier à décembre : $48$, $42$, $45$, $46$, $69$, $51$, $59$, $58$, $45$, $55$, $54$, $62$.\na) Calculer la hauteur de pluie sur l'année, puis la moyenne par mois, au dixième.\nb) Déterminer la médiane.\nc) Moyenne et médiane sont-elles proches ? Qu'est-ce que cela dit de la série ?",
          correction:
            "a) Total : $48 + 42 + 45 + 46 + 69 + 51 + 59 + 58 + 45 + 55 + 54 + 62 = 634$ mm. Moyenne : $\\dfrac{634}{12} \\approx 52{,}8$ mm par mois.\nb) Je range : $42$, $45$, $45$, $46$, $48$, $51$, $54$, $55$, $58$, $59$, $62$, $69$. $12$ valeurs, un nombre pair : la médiane est la moyenne des $6^e$ et $7^e$ valeurs, $\\dfrac{51 + 54}{2} = 52{,}5$ mm.\nc) $52{,}8$ et $52{,}5$ sont très proches : aucun mois n'est extrême, la pluie est bien répartie sur l'année. Ici, moyenne et médiane racontent la même histoire.\n⛔ Le piège au b) : prendre la $6^e$ valeur seule, $51$. Avec $12$ valeurs, il y a DEUX valeurs centrales.\nRéponse : $634$ mm par an, environ $52{,}8$ mm par mois en moyenne, médiane $52{,}5$ mm.",
          schema: diagramme("barres", [{ label: "Fév", value: 42 }, { label: "Mar", value: 45 }, { label: "Sep", value: 45 }, { label: "Avr", value: 46 }, { label: "Jan", value: 48 }, { label: "Jun", value: 51 }, { label: "Nov", value: 54 }, { label: "Oct", value: 55 }, { label: "Aoû", value: 58 }, { label: "Jul", value: 59 }, { label: "Déc", value: 62 }, { label: "Mai", value: 69 }, { label: "Méd.", value: 52.5 }], 12),
          micros: ["stat_moyenne", "stat_mediane", "stat_interpreter"],
        },
        {
          enonce:
            "Le diagramme donne le nombre de livres lus pendant l'été par les élèves d'une classe.\na) Combien d'élèves ont lu exactement $2$ livres ? Combien d'élèves compte la classe ?\nb) Calculer le nombre moyen de livres lus.\nc) Déterminer la médiane.\nd) Quelle est la fréquence des élèves qui ont lu au moins $3$ livres ?",
          figure: diagramme("batons", [{ label: "0 livre", value: 4 }, { label: "1", value: 9 }, { label: "2", value: 8 }, { label: "3", value: 5 }, { label: "4", value: 3 }, { label: "5", value: 1 }]),
          correction:
            "a) Je lis le haut du bâton « $2$ » : $8$ élèves. Effectif total : $4 + 9 + 8 + 5 + 3 + 1 = 30$ élèves.\nb) Chaque valeur compte autant de fois que son effectif : $0 \\times 4 + 1 \\times 9 + 2 \\times 8 + 3 \\times 5 + 4 \\times 3 + 5 \\times 1 = 0 + 9 + 16 + 15 + 12 + 5 = 57$, et $\\dfrac{57}{30} = 1{,}9$ livre.\nc) $30$ valeurs : la médiane est la moyenne des $15^e$ et $16^e$. J'additionne les effectifs au fur et à mesure : $4$, $13$, $21$… Les rangs $14$ à $21$ ont lu $2$ livres : la $15^e$ et la $16^e$ valeur valent $2$, donc la médiane est $2$.\nd) Au moins $3$ livres : $5 + 3 + 1 = 9$ élèves, et $\\dfrac{9}{30} = 0{,}3$, soit $30$ %.\n⛔ Le piège au c) : prendre la valeur du plus haut bâton, $1$, ou le milieu de l'axe. La médiane se cherche dans les RANGS, avec les effectifs cumulés.\nRéponse : $8$ élèves sur $30$ ; $1{,}9$ livre en moyenne ; médiane $2$ ; $30$ %.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Livres", "0", "1", "2", "3", "4", "5"], ["Effectif cumulé", 4, 13, 21, 26, 29, 30])}
              {diagramme("batons", [{ label: "0 livre", value: 4 }, { label: "1", value: 9 }, { label: "2", value: 8 }, { label: "3", value: 5 }, { label: "4", value: 3 }, { label: "5", value: 1 }], 2)}
            </div>
          ),
          micros: ["stat_lire_graphique", "stat_effectif_frequence", "stat_moyenne", "stat_mediane"],
        },
        {
          enonce:
            "Deux basketteuses ont joué les cinq mêmes matchs. Points marqués :\nInès : $14$, $16$, $15$, $17$, $13$ ;\nMaya : $5$, $28$, $9$, $25$, $8$.\na) Calculer la moyenne de chacune.\nb) Calculer l'étendue de chacune.\nc) L'entraîneuse cherche une joueuse sur qui compter à chaque match. Laquelle choisir ? Justifier.",
          correction:
            "a) Inès : $\\dfrac{14 + 16 + 15 + 17 + 13}{5} = \\dfrac{75}{5} = 15$. Maya : $\\dfrac{5 + 28 + 9 + 25 + 8}{5} = \\dfrac{75}{5} = 15$. La même moyenne.\nb) Inès : $17 - 13 = 4$ points. Maya : $28 - 5 = 23$ points.\nc) La moyenne ne les distingue pas ; l'étendue, si. Les scores d'Inès sont serrés entre $13$ et $17$ ; ceux de Maya vont de $5$ à $28$. Pour compter sur une joueuse à CHAQUE match, je choisis Inès, la plus régulière.\n⭐ Maya reste utile : elle peut faire un très gros match. Mais on ne sait jamais lequel.\n⛔ Le piège : conclure « elles se valent » en ne regardant que la moyenne.\nRéponse : même moyenne, $15$ points ; étendues $4$ et $23$ ; je choisis Inès.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {diagramme("barres", [{ label: "Inès 1", value: 14 }, { label: "2", value: 16 }, { label: "3", value: 15 }, { label: "4", value: 17 }, { label: "5", value: 13 }, { label: "Moy.", value: 15 }], 5)}
              {diagramme("barres", [{ label: "Maya 1", value: 5 }, { label: "2", value: 28 }, { label: "3", value: 9 }, { label: "4", value: 25 }, { label: "5", value: 8 }, { label: "Moy.", value: 15 }], 5)}
            </div>
          ),
          micros: ["stat_moyenne", "stat_etendue", "stat_interpreter"],
        },
        {
          enonce: "Sur six semaines, la pluie moyenne relevée par une station est de $12$ mm par semaine. Les cinq premières semaines ont donné $8$, $15$, $10$, $14$ et $9$ mm. Combien de millimètres sont tombés la sixième semaine ?",
          correction:
            "Une moyenne de $12$ sur $6$ semaines, c'est un total de $12 \\times 6 = 72$ mm.\nLes cinq semaines connues font $8 + 15 + 10 + 14 + 9 = 56$ mm.\nLa sixième a donc reçu $72 - 56 = 16$ mm.\n⭐ Je vérifie : $\\dfrac{56 + 16}{6} = \\dfrac{72}{6} = 12$.\n⛔ Le piège : répondre $12$, « la moyenne ». Les cinq premières semaines ont une moyenne de $11{,}2$ : il faut compenser.\nRéponse : $16$ mm la sixième semaine.",
          schema: diagramme("barres", [{ label: "S1", value: 8 }, { label: "S2", value: 15 }, { label: "S3", value: 10 }, { label: "S4", value: 14 }, { label: "S5", value: 9 }, { label: "S6", value: 16 }, { label: "Moy.", value: 12 }], 5),
          micros: ["stat_moyenne", "stat_defi"],
        },
        {
          enonce:
            "Pendant dix jours d'août, une station météo relève la pluie tombée chaque jour, en mm : $0$, $2$, $0$, $1$, $3$, $0$, $85$, $2$, $1$, $0$. Le septième jour, un orage a éclaté.\na) Calculer la moyenne et la médiane.\nb) Combien de jours ont reçu plus que la moyenne ?\nc) Quel indicateur décrit le mieux « une journée ordinaire » ? Lequel permet de retrouver la quantité d'eau tombée en tout ?",
          correction:
            "a) Somme : $0 + 2 + 0 + 1 + 3 + 0 + 85 + 2 + 1 + 0 = 94$ mm. Moyenne : $\\dfrac{94}{10} = 9{,}4$ mm.\nJe range : $0$, $0$, $0$, $0$, $1$, $1$, $2$, $2$, $3$, $85$. $10$ valeurs : la médiane est la moyenne des $5^e$ et $6^e$, $\\dfrac{1 + 1}{2} = 1$ mm.\nb) Un seul jour dépasse $9{,}4$ mm : le jour de l'orage. Les neuf autres sont en dessous.\nc) Une journée ordinaire : la MÉDIANE, $1$ mm. L'orage tire la moyenne vers le haut, pas la médiane, qui ne regarde que les rangs.\nLe total d'eau, lui, se retrouve avec la MOYENNE : $9{,}4 \\times 10 = 94$ mm, comme si l'eau était répartie également sur les dix jours.\n⛔ Le piège : dire « il a plu environ $9$ mm par jour ». Aucun jour n'a ressemblé à ça.\nRéponse : moyenne $9{,}4$ mm, médiane $1$ mm ; un seul jour au-dessus de la moyenne.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {diagramme("barres", [{ label: "J1", value: 0 }, { label: "J2", value: 2 }, { label: "J3", value: 0 }, { label: "J4", value: 1 }, { label: "J5", value: 3 }, { label: "J6", value: 0 }, { label: "J7", value: 85 }, { label: "J8", value: 2 }, { label: "J9", value: 1 }, { label: "J10", value: 0 }], 6)}
              {diagramme("barres", [{ label: "Moyenne", value: 9.4 }, { label: "Médiane", value: 1 }], 1)}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_interpreter"],
        },
        {
          enonce: "Un cycliste roule $3$ heures à $30$ km/h, puis $1$ heure à $18$ km/h dans une montée. Quelle est sa vitesse moyenne sur les $4$ heures ?",
          correction:
            "La vitesse moyenne, c'est la distance totale divisée par la durée totale. Chaque vitesse compte autant de fois que le nombre d'heures où il l'a tenue.\nDistance : $3 \\times 30 + 1 \\times 18 = 90 + 18 = 108$ km.\nDurée : $3 + 1 = 4$ h.\nVitesse moyenne : $\\dfrac{108}{4} = 27$ km/h.\n⛔ Le piège : $\\dfrac{30 + 18}{2} = 24$ km/h. Ce serait vrai s'il avait roulé aussi longtemps à chaque vitesse ; il a roulé TROIS fois plus longtemps à $30$ km/h.\nRéponse : $27$ km/h.",
          schema: diagramme("barres", [{ label: "1re h", value: 30 }, { label: "2e h", value: 30 }, { label: "3e h", value: 30 }, { label: "4e h", value: 18 }, { label: "Moy.", value: 27 }], 4),
          micros: ["stat_moyenne", "stat_defi"],
        },
        {
          enonce:
            "Dans une classe de $24$ élèves, on connaît quatre résultats d'un contrôle : la note la plus basse est $5$, la moyenne est $11$, la médiane est $12$ et l'étendue est $14$.\nVrai, faux, ou impossible à savoir ? Justifier.\na) Au moins $12$ élèves ont $12$ ou plus.\nb) La meilleure note est $19$.\nc) Un élève a eu exactement $11$.\nd) Si le professeur ajoute $1$ point à chaque copie, l'étendue devient $15$.",
          correction:
            "a) VRAI. La médiane coupe la série rangée en deux moitiés : au moins la moitié des $24$ élèves, soit $12$, ont une note supérieure ou égale à $12$.\nb) VRAI. L'étendue est la meilleure note moins la plus basse, donc la meilleure note vaut $5 + 14 = 19$.\nc) IMPOSSIBLE À SAVOIR. La moyenne n'est pas forcément une note de la série : $11$ peut n'avoir été obtenu par personne, ou par plusieurs élèves.\nd) FAUX. Toutes les notes montent de $1$ : la plus haute passe à $20$, la plus basse à $6$, et $20 - 6 = 14$. L'écart ne bouge pas.\n⛔ Le piège au c) : croire que la moyenne est la note « d'au moins un élève ».\n⛔ Le piège au d) : croire que tout augmente de $1$. La moyenne et la médiane, oui ; l'étendue, non.\nRéponse : vrai, vrai, impossible à savoir, faux.",
          schema: diagramme("barres", [{ label: "Min", value: 5 }, { label: "Moyenne", value: 11 }, { label: "Médiane", value: 12 }, { label: "Max", value: 19 }], 2),
          micros: ["stat_mediane", "stat_etendue", "stat_interpreter", "stat_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des séries réelles : je calcule, je choisis l'indicateur, et je dis ce que les nombres racontent.",
      rappel: [
        "Une valeur très à l'écart TIRE la moyenne, pas la médiane : pour décrire quelqu'un d'ordinaire, je préfère la médiane.",
        "Pour comparer ou décrire une série : un indicateur de position (moyenne ou médiane) ET un écart (l'étendue).",
        "Je conclus par une phrase : un nombre seul n'est pas une réponse.",
      ],
      exercices: [
        {
          titre: "Kipchoge à Berlin",
          enonce:
            "Eliud Kipchoge a gagné cinq fois le marathon de Berlin. Le tableau donne ses temps officiels.\na) Pour chaque course, calculer le nombre de secondes au-delà de $2$ h.\nb) Calculer son temps moyen, en heures, minutes et secondes.\nc) Déterminer son temps médian.\nd) Calculer l'étendue de ses temps, en minutes et secondes.",
          figure: tableau(["Année", "2015", "2017", "2018", "2022", "2023"], ["Temps", "2 h 04 min 00 s", "2 h 03 min 32 s", "2 h 01 min 39 s", "2 h 01 min 09 s", "2 h 02 min 42 s"], "ecran"),
          correction:
            "a) Je compte les secondes après $2$ h, avec $1$ min $= 60$ s.\n2015 : $4 \\times 60 + 0 = 240$ s. 2017 : $3 \\times 60 + 32 = 212$ s. 2018 : $1 \\times 60 + 39 = 99$ s. 2022 : $1 \\times 60 + 9 = 69$ s. 2023 : $2 \\times 60 + 42 = 162$ s.\nb) $240 + 212 + 99 + 69 + 162 = 782$, et $\\dfrac{782}{5} = 156{,}4$ s. Or $156{,}4 = 2 \\times 60 + 36{,}4$ : le temps moyen est $2$ h $02$ min $36{,}4$ s.\nc) Je range : $69$, $99$, $162$, $212$, $240$. $5$ valeurs : la médiane est la $3^e$, $162$ s, soit $2$ h $02$ min $42$ s, le temps de 2023.\nd) $240 - 69 = 171$ s, et $171 = 2 \\times 60 + 51$ : $2$ min $51$ s entre sa course la plus lente (2015) et la plus rapide (2022, record du monde à l'époque).\n⛔ Le piège : calculer sur les minutes comme sur des décimaux. De $2$ h $01$ min $09$ s à $2$ h $04$ min $00$ s, il n'y a pas « $2{,}91$ min » : une minute compte $60$ secondes, pas $100$.\nRéponse : moyenne $2$ h $02$ min $36{,}4$ s ; médiane $2$ h $02$ min $42$ s ; étendue $2$ min $51$ s.",
          schema: diagramme("barres", [{ label: "2022", value: 69 }, { label: "2018", value: 99 }, { label: "2023", value: 162 }, { label: "2017", value: 212 }, { label: "2015", value: 240 }, { label: "Moy.", value: 156.4 }], 2),
          micros: ["stat_lire_tableau", "stat_moyenne", "stat_mediane", "stat_etendue"],
        },
        {
          titre: "Le climat de Paris",
          enonce:
            "Le diagramme donne la température moyenne de chaque mois à Paris (station de Montsouris, normales 1991-2020 de Météo-France, arrondies au degré).\na) Calculer la température moyenne sur l'année, au dixième.\nb) Déterminer la médiane.\nc) Calculer l'étendue.\nd) Combien de mois sont plus chauds que la moyenne de l'année ?\ne) Météo-France annonce $12{,}8$ °C pour l'année. Pourquoi notre calcul tombe-t-il si près ?",
          figure: diagramme("barres", [{ label: "Jan", value: 5 }, { label: "Fév", value: 6 }, { label: "Mar", value: 9 }, { label: "Avr", value: 12 }, { label: "Mai", value: 16 }, { label: "Jun", value: 19 }, { label: "Jul", value: 21 }, { label: "Aoû", value: 21 }, { label: "Sep", value: 17 }, { label: "Oct", value: 13 }, { label: "Nov", value: 9 }, { label: "Déc", value: 6 }]),
          correction:
            "a) $5 + 6 + 9 + 12 + 16 + 19 + 21 + 21 + 17 + 13 + 9 + 6 = 154$, et $\\dfrac{154}{12} \\approx 12{,}8$ °C.\nb) Je range : $5$, $6$, $6$, $9$, $9$, $12$, $13$, $16$, $17$, $19$, $21$, $21$. $12$ valeurs : la médiane est la moyenne des $6^e$ et $7^e$, $\\dfrac{12 + 13}{2} = 12{,}5$ °C.\nc) $21 - 5 = 16$ °C, entre janvier et juillet-août.\nd) Plus de $12{,}8$ °C : mai, juin, juillet, août, septembre et octobre. $6$ mois, la moitié de l'année.\ne) La moyenne de l'année est presque exactement la moyenne des douze mois (les mois n'ont pas tous le même nombre de jours), et nos arrondis au degré se compensent.\n⛔ Le piège au c) : répondre $21$, le maximum. L'étendue est un écart : la plus grande valeur moins la plus petite.\nRéponse : environ $12{,}8$ °C en moyenne, médiane $12{,}5$ °C, étendue $16$ °C, $6$ mois au-dessus de la moyenne.",
          schema: diagramme("barres", [{ label: "Jan", value: 5 }, { label: "Fév", value: 6 }, { label: "Mar", value: 9 }, { label: "Avr", value: 12 }, { label: "Mai", value: 16 }, { label: "Jun", value: 19 }, { label: "Jul", value: 21 }, { label: "Aoû", value: 21 }, { label: "Sep", value: 17 }, { label: "Oct", value: 13 }, { label: "Nov", value: 9 }, { label: "Déc", value: 6 }, { label: "Moy.", value: 12.8 }], 12),
          micros: ["stat_lire_graphique", "stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter"],
        },
        {
          titre: "Le salaire « moyen » de l'entreprise",
          enonce:
            "Une entreprise affiche dans un tableur les salaires mensuels nets de ses $20$ personnes, dont deux dirigeants.\na) Vérifier l'effectif total.\nb) Calculer le salaire moyen.\nc) Déterminer le salaire médian.\nd) Combien de personnes gagnent moins que le salaire moyen ?\ne) Une annonce d'embauche affiche le salaire moyen. Est-ce faux ? Est-ce honnête ? Quel nombre serait plus parlant ?\nf) Les deux dirigeants s'augmentent de $1\\,000$ € chacun. Que deviennent la moyenne et la médiane ?",
          figure: tableau(["Salaire net (€)", "1 900", "2 200", "2 800", "7 500"], ["Effectif", 10, 6, 2, 2]),
          correction:
            "a) $10 + 6 + 2 + 2 = 20$ personnes.\nb) Chaque salaire compte autant de fois que son effectif : $1\\,900 \\times 10 + 2\\,200 \\times 6 + 2\\,800 \\times 2 + 7\\,500 \\times 2 = 19\\,000 + 13\\,200 + 5\\,600 + 15\\,000 = 52\\,800$ €. Moyenne : $\\dfrac{52\\,800}{20} = 2\\,640$ €.\nc) $20$ salaires, un nombre pair : la médiane est la moyenne des $10^e$ et $11^e$. Rangs $1$ à $10$ : $1\\,900$ € ; rangs $11$ à $16$ : $2\\,200$ €. Médiane : $\\dfrac{1\\,900 + 2\\,200}{2} = 2\\,050$ €.\nd) $10 + 6 = 16$ personnes sur $20$ gagnent moins que $2\\,640$ €, soit $80$ %.\ne) Ce n'est pas faux : la moyenne vaut bien $2\\,640$ €. Mais quatre personnes sur cinq gagnent moins ; ce sont les deux dirigeants qui tirent la moyenne. Le salaire médian, $2\\,050$ €, dit mieux ce que gagne un salarié ordinaire.\nf) Le total augmente de $2\\,000$ € : la moyenne devient $\\dfrac{54\\,800}{20} = 2\\,740$ €. La médiane ne regarde que les rangs $10$ et $11$ : elle reste $2\\,050$ €.\n⛔ Le piège au b) : la moyenne des quatre salaires du tableau, $\\dfrac{1\\,900 + 2\\,200 + 2\\,800 + 7\\,500}{4} = 3\\,600$ €, comme s'il y avait autant de dirigeants que d'employés.\nRéponse : moyenne $2\\,640$ €, médiane $2\\,050$ € ; l'augmentation des dirigeants ajoute $100$ € à la moyenne et rien à la médiane.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["Salaire net (€)", "1 900", "2 200", "2 800", "7 500"], ["Salaire × effectif", "19 000", "13 200", "5 600", "15 000"])}
              {diagramme("barres", [{ label: "Moyenne", value: 2640 }, { label: "Médiane", value: 2050 }], 1)}
            </div>
          ),
          micros: ["stat_lire_tableau", "stat_moyenne", "stat_mediane", "stat_interpreter", "stat_defi"],
        },
        {
          titre: "Le portrait-robot",
          enonce:
            "On cherche cinq notes, des nombres entiers entre $0$ et $20$.\na) Trouver cinq notes dont la moyenne est $12$, la médiane $14$ et l'étendue $10$.\nb) Est-ce possible avec une moyenne de $12$, une médiane de $14$ et une étendue de $4$ ? Justifier.",
          correction:
            "a) Je traduis chaque contrainte. Moyenne $12$ sur $5$ notes : un total de $12 \\times 5 = 60$. Médiane $14$ : la $3^e$ note rangée vaut $14$. Étendue $10$ : la plus grande note dépasse la plus petite de $10$.\nJ'essaie une plus petite note de $6$, donc une plus grande de $16$ : $6$, ?, $14$, ?, $16$. Il reste $60 - 6 - 14 - 16 = 24$ pour les deux notes manquantes, l'une entre $6$ et $14$, l'autre entre $14$ et $16$ : $10$ et $14$ conviennent.\nUne solution : $6$, $10$, $14$, $14$, $16$. Je vérifie : $6 + 10 + 14 + 14 + 16 = 60$, médiane $14$, étendue $16 - 6 = 10$.\nb) Non. La médiane est $14$, donc la plus grande note vaut au moins $14$, et avec une étendue de $4$ la plus petite vaut au moins $14 - 4 = 10$. Les deux notes du bas valent donc au moins $10$, les trois du haut au moins $14$ : le total vaut au moins $10 + 10 + 14 + 14 + 14 = 62$, plus que $60$.\n⛔ Le piège : chercher au hasard. Je pars des contraintes : le total d'abord, puis la note du milieu, puis les extrêmes.\nRéponse : par exemple $6$, $10$, $14$, $14$, $16$ ; au b), c'est impossible.",
          schema: diagramme("barres", [{ label: "N1", value: 6 }, { label: "N2", value: 10 }, { label: "N3", value: 14 }, { label: "N4", value: 14 }, { label: "N5", value: 16 }, { label: "Moy.", value: 12 }], 2),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_defi"],
        },
      ],
    },
  ],
};
