// ─── Fiche d'exercices : probabilité conditionnelle, calculer (1re) ───────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`. Calculatrice
// autorisée, des probabilités qui tombent juste ou s'arrondissent au centième.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts`
// (notionId alea_conditionnelle_calcul) : la formule P_A(B) = P(A ∩ B) / P(A),
// son retournement P(A ∩ B) = P(A) × P_A(B), la phrase qui interprète, et le
// paradoxe des faux positifs.
// ⛔ Pas de formule des probabilités totales nommée : quand il faut P(T), on la
// DONNE ou on la lit dans un tableau d'effectifs (exercices 9, 15, 17).
//
// ⭐⭐ LE FIL : UNE FORMULE, TROIS USAGES. Trouver P_A(B), trouver P(A ∩ B),
// trouver P(A). Et toujours la PHRASE : « parmi les A, … ».
// ⛔ LE PIÈGE CENTRAL : P_M(T) n'est pas P_T(M). Un test fiable à 95 % ne
// donne qu'une chance sur six d'être malade quand il est positif (exercice 9) ;
// la même personne, le même test, mais hors épidémie : 17 % au lieu de 68 %
// (exercice 17).
//
// ⭐ Frédéric, 28/09 : beaucoup de visuel (arbres, tableaux, diagrammes), et
// des contextes d'économie, d'écologie, de sport, de nature, de PHYSIQUE
// (banc de test des résistances, exercice 10 ; désintégration de l'iode 131,
// exercice 18) et d'HISTOIRE-GÉO (le choléra de Londres en 1854, exercice 11 ;
// les trajets domicile-travail, exercice 16 ; l'espérance de vie, exercice
// 20). Les chiffres sont des MODÈLES arrondis, jamais présentés comme des
// données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-conditionnelle-calcul.mjs`.
//
// Micro-compétences : alea_cond_formule (1, 3, 4, 6, 8, 10, 11, 13, 14, 16,
// 18, 19, 20), alea_cond_intersection (2, 5, 10, 12, 14, 16, 19),
// alea_cond_interpreter (4, 5, 8, 10, 11, 12, 13, 14, 16, 18, 19, 20),
// alea_cond_faux_positifs (7, 9, 15, 17). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, diagramme, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaConditionnelleCalculPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-conditionnelle-calcul",
  titre: "Probabilité conditionnelle : calculer",
  accroche:
    "Vingt exercices pour calculer une probabilité conditionnelle avec la formule du cours, retrouver la probabilité d'une intersection, écrire la phrase qui dit ce que le nombre signifie, et comprendre pourquoi un test positif ne veut pas toujours dire malade. Dépistage, contrôle qualité, choléra de Londres, incendies de forêt, recrutement, iode radioactif, espérance de vie. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice, puis une phrase.",
      rappel: [
        "Si $P(A) \\neq 0$ : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
        "Retournée, la même formule donne l'intersection : $P(A \\cap B) = P(A) \\times P_A(B)$.",
        "Pour interpréter $P_A(B) = 0{,}8$, on écrit : « parmi les $A$, $80$ % sont $B$ ». L'indice vient après « parmi ».",
      ],
      exercices: [
        {
          enonce: "On sait que $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}1$. Calculer $P_A(B)$.",
          correction:
            "On applique la formule : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.\n$P_A(B) = \\dfrac{0{,}1}{0{,}4} = 0{,}25$.\n⚠️ On divise par $P(A)$, la probabilité de ce qui est en INDICE, pas par $P(B)$.",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0,1", "0,3", "0,4"]], [[0, 1], [0, 3]])),
          micros: ["alea_cond_formule"],
        },
        {
          enonce: "On sait que $P(A) = 0{,}3$ et $P_A(B) = 0{,}6$. Calculer $P(A \\cap B)$.",
          correction:
            "La formule retournée : $P(A \\cap B) = P(A) \\times P_A(B)$.\n$P(A \\cap B) = 0{,}3 \\times 0{,}6 = 0{,}18$.\n✔️ Vérification : $\\dfrac{0{,}18}{0{,}3} = 0{,}6$, on retrouve bien $P_A(B)$.\n⚠️ Le piège : additionner. Pour « $A$ puis $B$ parmi les $A$ », on MULTIPLIE.",
          schema: ecranSeulement(arbre([{ label: "A", proba: "0,3", enfants: [{ label: "B → 0,18", proba: "0,6" }, { label: "non B", proba: "0,4" }] }, { label: "non A", proba: "0,7", enfants: [{ label: "B", proba: "?" }, { label: "non B", proba: "?" }] }])),
          micros: ["alea_cond_intersection"],
        },
        {
          enonce:
            "Dans une ville, on note $A$ : « il pleut le matin » et $B$ : « il pleut l'après-midi », pour un jour choisi au hasard. Le tableau donne des probabilités (modèle). Calculer $P_A(B)$ et $P_{\\overline{A}}(B)$.",
          figure: tableauProba(["", "B", "non B", "Total"], [["A", "0,24", "0,06", "0,3"], ["non A", "0,14", "0,56", "0,7"], ["Total", "0,38", "0,62", "1"]]),
          correction:
            "On lit $P(A \\cap B) = 0{,}24$ dans la case, et $P(A) = 0{,}3$ dans le total de la ligne.\n$P_A(B) = \\dfrac{0{,}24}{0{,}3} = 0{,}8$.\nDe même : $P_{\\overline{A}}(B) = \\dfrac{P(\\overline{A} \\cap B)}{P(\\overline{A})} = \\dfrac{0{,}14}{0{,}7} = 0{,}2$.\n⭐ Dans un tableau de probabilités, la formule se lit comme une division « case sur total de la ligne ».",
          micros: ["alea_cond_formule"],
        },
        {
          enonce:
            "Avec le tableau de l'exercice 3 :\na) écrire par une phrase ce que signifie $P_A(B) = 0{,}8$ ;\nb) calculer $P_B(A)$ au centième près, et l'écrire par une phrase.",
          correction:
            "a) « Quand il pleut le matin, il pleut aussi l'après-midi $8$ fois sur $10$. »\nb) $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}24}{0{,}38} = \\dfrac{12}{19} \\approx 0{,}63$.\n« Parmi les jours où il pleut l'après-midi, il avait déjà plu le matin dans environ $63$ % des cas. »\n⚠️ Le dénominateur change avec l'indice : $0{,}3$ pour « sachant $A$ », $0{,}38$ pour « sachant $B$ ».",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0,24", "0,06", "0,3"], ["non A", "0,14", "0,56", "0,7"], ["Total", "0,38", "0,62", "1"]], [[0, 1], [2, 1]])),
          micros: ["alea_cond_interpreter", "alea_cond_formule"],
        },
        {
          enonce:
            "Dans une boulangerie, $45$ % des clients achètent une baguette ($B$). Parmi eux, $20$ % achètent aussi un croissant ($C$). On choisit un client au hasard.\na) Écrire les deux données avec des probabilités.\nb) Calculer $P(B \\cap C)$ et l'écrire par une phrase.",
          correction:
            "a) $P(B) = 0{,}45$. « Parmi eux » : $P_B(C) = 0{,}2$.\nb) $P(B \\cap C) = P(B) \\times P_B(C) = 0{,}45 \\times 0{,}2 = 0{,}09$.\n« $9$ % des clients achètent une baguette ET un croissant. »\n⚠️ $0{,}2$ n'est pas la part des clients qui prennent baguette et croissant : c'est leur part PARMI les acheteurs de baguette.",
          schema: ecranSeulement(arbre([{ label: "B", proba: "0,45", enfants: [{ label: "C → 0,09", proba: "0,2" }, { label: "non C", proba: "0,8" }] }, { label: "non B", proba: "0,55", enfants: [{ label: "C", proba: "?" }, { label: "non C", proba: "?" }] }])),
          micros: ["alea_cond_intersection", "alea_cond_interpreter"],
        },
        {
          enonce:
            "Dans un club de montagne, $12$ % des adhérents font à la fois de l'escalade ($E$) et du ski ($S$). Parmi les grimpeurs, $40$ % font du ski. Quelle est la proportion de grimpeurs dans le club ?",
          correction:
            "Les données : $P(E \\cap S) = 0{,}12$ et $P_E(S) = 0{,}4$. On cherche $P(E)$.\nLa formule $P_E(S) = \\dfrac{P(E \\cap S)}{P(E)}$ donne $P(E) = \\dfrac{P(E \\cap S)}{P_E(S)}$.\n$P(E) = \\dfrac{0{,}12}{0{,}4} = 0{,}3$ : $30$ % des adhérents font de l'escalade.\n✔️ Vérification : $0{,}3 \\times 0{,}4 = 0{,}12$.\n⭐ Une formule à trois nombres : on en connaît deux, on trouve le troisième.",
          schema: ecranSeulement(tableauProba(["", "S", "non S", "Total"], [["E", "0,12", "0,18", "0,3"]], [[0, 1], [0, 3]])),
          micros: ["alea_cond_formule"],
        },
        {
          enonce:
            "Un fabricant annonce : « notre test de dépistage détecte $99$ % des personnes malades ». On note $M$ : « être malade » et $T$ : « avoir un test positif ».\na) Traduire l'annonce par une probabilité conditionnelle.\nb) Un journal titre : « Test positif : $99$ % de risque d'être malade ». Quelle probabilité le journal annonce-t-il ? Est-ce la même ?",
          correction:
            "a) « Parmi les malades, $99$ % ont un test positif » : $P_M(T) = 0{,}99$.\nb) Le journal parle des personnes au test positif : il annonce $P_T(M) = 0{,}99$.\nCe n'est pas la même probabilité : l'indice a changé.\n⛔ C'est la confusion des faux positifs. $P_T(M)$ dépend aussi du nombre de malades dans la population : si la maladie est rare, la plupart des tests positifs viennent de personnes saines (exercices 9 et 15).\n⭐ Sur l'arbre : $0{,}99$ est sur la branche qui part de $M$. Pour $P_T(M)$, il manque la part des malades et la branche des personnes saines.",
          schema: ecranSeulement(arbre([{ label: "M", proba: "?", enfants: [{ label: "T", proba: "0,99" }, { label: "non T", proba: "0,01" }] }, { label: "non M", proba: "?", enfants: [{ label: "T", proba: "?" }, { label: "non T", proba: "?" }] }])),
          micros: ["alea_cond_faux_positifs"],
        },
        {
          enonce:
            "On choisit au hasard un jeune qui a passé le permis de conduire (modèle). $C$ : « a fait la conduite accompagnée », $E$ : « a eu le permis du premier coup ». On sait que $P_C(E) = 0{,}75$, $P_{\\overline{C}}(E) = 0{,}6$ et $P(C \\cap E) = 0{,}3$.\na) Écrire chacune des trois données par une phrase.\nb) Calculer $P(C)$.",
          correction:
            "a) $P_C(E) = 0{,}75$ : « parmi les jeunes en conduite accompagnée, $75$ % ont le permis du premier coup ».\n$P_{\\overline{C}}(E) = 0{,}6$ : « parmi les autres, $60$ % l'ont du premier coup ».\n$P(C \\cap E) = 0{,}3$ : « $30$ % de tous les candidats ont fait la conduite accompagnée ET réussi du premier coup ».\nb) $P(C) = \\dfrac{P(C \\cap E)}{P_C(E)} = \\dfrac{0{,}3}{0{,}75} = 0{,}4$.\n⭐ Une phrase avec « parmi » pour une conditionnelle, une phrase avec « et » pour une intersection.",
          schema: ecranSeulement(arbre([{ label: "C", proba: "0,4", enfants: [{ label: "E → 0,3", proba: "0,75" }, { label: "non E", proba: "0,25" }] }, { label: "non C", proba: "0,6", enfants: [{ label: "E", proba: "0,6" }, { label: "non E", proba: "0,4" }] }])),
          micros: ["alea_cond_interpreter", "alea_cond_formule"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire les données, calculer avec la formule, puis interpréter par une phrase.",
      rappel: [
        "Un pourcentage « parmi les $A$ » est $P_A(B)$ ; un pourcentage de tout le monde est $P(B)$ ou $P(A \\cap B)$.",
        "$P(A \\cap B) = P(A) \\times P_A(B)$, et $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
        "Pour un test : $P_M(T)$ dit si le test repère les malades ; $P_T(M)$ dit si un test positif est fiable. Pour passer de l'un à l'autre, on compte sur $10\\,000$ personnes.",
      ],
      exercices: [
        {
          titre: "Le test de dépistage",
          enonce:
            "Une maladie touche $2$ % de la population (modèle). Un test est positif chez $95$ % des malades, mais aussi chez $10$ % des personnes saines. On teste une personne au hasard ; $M$ : « être malade », $T$ : « test positif ».\na) Sur $10\\,000$ personnes, compléter un tableau d'effectifs.\nb) Lire $P_M(T)$ sur l'arbre.\nc) Calculer $P_T(M)$, au centième près. Interpréter.",
          figure: arbre([
            { label: "M", proba: "0,02", enfants: [{ label: "T", proba: "0,95" }, { label: "non T", proba: "0,05" }] },
            { label: "non M", proba: "0,98", enfants: [{ label: "T", proba: "0,1" }, { label: "non T", proba: "0,9" }] },
          ]),
          correction:
            "a) Malades : $0{,}02 \\times 10\\,000 = 200$, dont $0{,}95 \\times 200 = 190$ positifs et $10$ négatifs.\nSaines : $9\\,800$, dont $0{,}1 \\times 9\\,800 = 980$ positives (les faux positifs) et $8\\,820$ négatives.\nTests positifs : $190 + 980 = 1\\,170$.\nb) $P_M(T) = 0{,}95$, sur la branche $M \\to T$.\nc) Parmi les $1\\,170$ positifs, $190$ sont malades : $P_T(M) = \\dfrac{190}{1\\,170} = \\dfrac{19}{117} \\approx 0{,}16$.\nUn test positif ne correspond à un malade qu'environ une fois sur six.\n⛔ Les faux positifs ($980$) sont cinq fois plus nombreux que les vrais ($190$) : il y a tant de personnes saines que $10$ % d'entre elles pèsent plus que $95$ % des malades.",
          schema: tableauProba(["Sur 10000", "Positif", "Négatif", "Total"], [["Malade", "190", "10", "200"], ["Sain", "980", "8820", "9800"], ["Total", "1170", "8830", "10000"]], [[0, 1], [2, 1]]),
          micros: ["alea_cond_faux_positifs"],
        },
        {
          titre: "Le banc de test des résistances",
          enonce:
            "Une usine fabrique des résistances électriques. $4$ % sont hors tolérance ($D$). Un banc de mesure rejette ($R$) $90$ % des résistances hors tolérance, mais aussi, à cause des incertitudes de mesure, $5$ % des résistances conformes. On admet que $P(R) = 0{,}084$.\na) Calculer $P(D \\cap R)$ et $P(\\overline{D} \\cap R)$.\nb) Calculer $P_R(D)$, au centième près.\nc) Interpréter : que penser des résistances rejetées ?",
          correction:
            "a) $P(D \\cap R) = P(D) \\times P_D(R) = 0{,}04 \\times 0{,}9 = 0{,}036$.\n$P(\\overline{D} \\cap R) = 0{,}96 \\times 0{,}05 = 0{,}048$.\n✔️ $0{,}036 + 0{,}048 = 0{,}084$ : c'est bien $P(R)$.\nb) $P_R(D) = \\dfrac{P(D \\cap R)}{P(R)} = \\dfrac{0{,}036}{0{,}084} = \\dfrac{3}{7} \\approx 0{,}43$.\nc) « Parmi les résistances rejetées, seulement $43$ % environ sont vraiment hors tolérance. » Plus de la moitié des rejets sont des pièces bonnes.\n⭐ En physique, toute mesure a une incertitude : un banc de test se trompe dans les deux sens. On peut remesurer les pièces rejetées avant de les jeter.",
          schema: arbre([
            { label: "D", proba: "0,04", enfants: [{ label: "R → 0,036", proba: "0,9" }, { label: "non R", proba: "0,1" }] },
            { label: "non D", proba: "0,96", enfants: [{ label: "R → 0,048", proba: "0,05" }, { label: "non R", proba: "0,95" }] },
          ]),
          micros: ["alea_cond_intersection", "alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "Le choléra de Londres",
          enonce:
            "En $1854$, à Londres, le médecin John Snow relie une épidémie de choléra à une pompe à eau de Broad Street. On reprend son raisonnement avec des chiffres d'un modèle. On choisit un habitant du quartier au hasard ; $E$ : « buvait l'eau de la pompe », $C$ : « a eu le choléra ».\na) Calculer $P_E(C)$ et $P_{\\overline{E}}(C)$.\nb) Combien de fois le risque est-il plus grand pour ceux qui buvaient à la pompe ?\nc) Calculer $P_C(E)$, au centième près, et l'interpréter.",
          figure: tableauProba(["", "Malade", "Pas malade", "Total"], [["Pompe", "0,05", "0,15", "0,2"], ["Autre eau", "0,008", "0,792", "0,8"], ["Total", "0,058", "0,942", "1"]]),
          correction:
            "a) $P_E(C) = \\dfrac{P(E \\cap C)}{P(E)} = \\dfrac{0{,}05}{0{,}2} = 0{,}25$.\n$P_{\\overline{E}}(C) = \\dfrac{0{,}008}{0{,}8} = 0{,}01$.\nb) $\\dfrac{0{,}25}{0{,}01} = 25$ : le risque est $25$ fois plus grand.\nc) $P_C(E) = \\dfrac{0{,}05}{0{,}058} = \\dfrac{25}{29} \\approx 0{,}86$. « Parmi les malades, environ $86$ % buvaient l'eau de la pompe. »\n⭐ C'est ce type de comparaison qui a désigné l'eau comme coupable, à une époque où l'on croyait le choléra transmis par l'air.",
          micros: ["alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "La finale du 100 m",
          enonce:
            "Pour un sprinteur, un entraîneur estime (modèle) : la probabilité d'atteindre la finale d'un championnat est $0{,}4$ ($F$), et, s'il l'atteint, la probabilité de décrocher une médaille ($M$) est $0{,}3$.\na) Calculer $P(F \\cap M)$.\nb) Pourquoi a-t-on ici $P(M) = P(F \\cap M)$ ?\nc) Calculer $P_M(F)$ et l'interpréter.",
          correction:
            "a) $P(F \\cap M) = P(F) \\times P_F(M) = 0{,}4 \\times 0{,}3 = 0{,}12$.\nb) Les médailles se gagnent en finale : pas de médaille sans finale. Tous les médaillés sont donc finalistes, et $M$ est contenu dans $F$ : $P(M) = P(F \\cap M) = 0{,}12$.\nc) $P_M(F) = \\dfrac{P(F \\cap M)}{P(M)} = \\dfrac{0{,}12}{0{,}12} = 1$.\n« Un médaillé est forcément un finaliste. »\n⚠️ $P_F(M) = 0{,}3$ mais $P_M(F) = 1$ : les deux sens n'ont rien à voir.",
          schema: arbre([
            { label: "F", proba: "0,4", enfants: [{ label: "M → 0,12", proba: "0,3" }, { label: "non M", proba: "0,7" }] },
            { label: "non F", proba: "0,6", enfants: [{ label: "M → 0", proba: "0" }, { label: "non M", proba: "1" }] },
          ]),
          micros: ["alea_cond_intersection", "alea_cond_interpreter"],
        },
        {
          titre: "Les prêts immobiliers",
          enonce:
            "Une banque étudie ses demandes de prêt immobilier (modèle). $30$ % viennent de primo-accédants, qui achètent leur premier logement ($A$). $18$ % des demandes viennent de primo-accédants ET sont acceptées ($K$). Au total, $72$ % des demandes sont acceptées.\na) Calculer $P_A(K)$.\nb) Calculer $P_{\\overline{A}}(K)$, au centième près.\nc) Interpréter en une phrase.",
          correction:
            "a) $P_A(K) = \\dfrac{P(A \\cap K)}{P(A)} = \\dfrac{0{,}18}{0{,}3} = 0{,}6$.\nb) Les autres demandes acceptées : $P(\\overline{A} \\cap K) = 0{,}72 - 0{,}18 = 0{,}54$.\n$P_{\\overline{A}}(K) = \\dfrac{0{,}54}{0{,}7} = \\dfrac{27}{35} \\approx 0{,}77$.\nc) « $60$ % des demandes des primo-accédants sont acceptées, contre environ $77$ % pour les autres. »\n⭐ Les primo-accédants ont souvent moins d'apport personnel : la banque les accepte moins souvent.",
          schema: ecranSeulement(tableauProba(["", "Acceptée", "Refusée", "Total"], [["Primo", "0,18", "0,12", "0,3"], ["Autres", "0,54", "0,16", "0,7"], ["Total", "0,72", "0,28", "1"]], [[0, 1], [0, 3], [1, 1], [1, 3]])),
          micros: ["alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "Les incendies de forêt",
          enonce:
            "Dans un massif forestier (modèle), un été est sec ($S$) avec la probabilité $0{,}4$. Un été sec, la probabilité d'un grand incendie ($I$) est $0{,}5$ ; un été qui n'est pas sec, elle est de $0{,}1$. On admet que $P(I) = 0{,}26$.\na) Calculer $P(S \\cap I)$ et $P(\\overline{S} \\cap I)$.\nb) Il y a eu un grand incendie cet été. Quelle est la probabilité que l'été ait été sec ?\nc) Écrire les résultats par des phrases.",
          figure: arbre([
            { label: "S", proba: "0,4", enfants: [{ label: "I", proba: "0,5" }, { label: "non I", proba: "0,5" }] },
            { label: "non S", proba: "0,6", enfants: [{ label: "I", proba: "0,1" }, { label: "non I", proba: "0,9" }] },
          ]),
          correction:
            "a) $P(S \\cap I) = 0{,}4 \\times 0{,}5 = 0{,}2$ et $P(\\overline{S} \\cap I) = 0{,}6 \\times 0{,}1 = 0{,}06$.\n✔️ $0{,}2 + 0{,}06 = 0{,}26$ : c'est bien $P(I)$.\nb) $P_I(S) = \\dfrac{P(S \\cap I)}{P(I)} = \\dfrac{0{,}2}{0{,}26} = \\dfrac{10}{13} \\approx 0{,}77$.\nc) « Un été sur cinq est sec et connaît un grand incendie. » « Parmi les étés à grand incendie, environ $77$ % sont des étés secs. »\n⭐ Avec des étés secs plus fréquents, $P(S)$ augmente, et le nombre de grands incendies aussi.",
          micros: ["alea_cond_intersection", "alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "La maladie rare",
          enonce:
            "Une maladie rare touche une personne sur $1\\,000$. Un test la détecte chez $99$ % des malades, mais il est aussi positif chez $2$ % des personnes saines. On imagine $100\\,000$ personnes testées.\na) Combien sont malades ? Combien de vrais positifs ?\nb) Combien de personnes saines ? Combien de faux positifs ?\nc) Calculer la probabilité d'être malade sachant que le test est positif, au centième près.",
          correction:
            "a) Malades : $\\dfrac{100\\,000}{1\\,000} = 100$. Vrais positifs : $0{,}99 \\times 100 = 99$.\nb) Saines : $99\\,900$. Faux positifs : $0{,}02 \\times 99\\,900 = 1\\,998$.\nc) Tests positifs : $99 + 1\\,998 = 2\\,097$. $P_T(M) = \\dfrac{99}{2\\,097} \\approx 0{,}05$.\nMoins d'un test positif sur vingt correspond à un malade.\n⛔ Le test est excellent pour $P_M(T) = 0{,}99$, et pourtant $P_T(M)$ est minuscule : la maladie est si rare que les faux positifs écrasent les vrais.\n⭐ C'est pourquoi on confirme toujours un test positif par un second examen.",
          schema: diagramme("barres", [
            { label: "Vrais positifs", value: 99 },
            { label: "Faux positifs", value: 1998 },
          ]),
          micros: ["alea_cond_faux_positifs"],
        },
        {
          titre: "Les trajets domicile-travail",
          enonce:
            "Dans une région (modèle), $35$ % des actifs travaillent dans une autre commune que la leur ($N$). Parmi eux, $80$ % s'y rendent en voiture ($V$). Au total, $60$ % des actifs vont travailler en voiture.\na) Calculer $P(N \\cap V)$.\nb) Calculer $P_V(N)$, au centième près.\nc) Interpréter les deux résultats par une phrase.",
          correction:
            "a) $P(N \\cap V) = P(N) \\times P_N(V) = 0{,}35 \\times 0{,}8 = 0{,}28$.\nb) $P_V(N) = \\dfrac{P(N \\cap V)}{P(V)} = \\dfrac{0{,}28}{0{,}6} = \\dfrac{7}{15} \\approx 0{,}47$.\nc) « $28$ % des actifs travaillent hors de leur commune ET y vont en voiture. » « Parmi les automobilistes, environ $47$ % sortent de leur commune pour travailler. »\n⭐ En géographie, ces allers-retours quotidiens s'appellent des migrations pendulaires : ils dessinent l'aire d'attraction d'une ville.",
          schema: ecranSeulement(arbre([{ label: "N", proba: "0,35", enfants: [{ label: "V → 0,28", proba: "0,8" }, { label: "non V", proba: "0,2" }] }, { label: "non N", proba: "0,65", enfants: [{ label: "V", proba: "?" }, { label: "non V", proba: "?" }] }])),
          micros: ["alea_cond_intersection", "alea_cond_formule", "alea_cond_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet : traduire, calculer, puis juger ce que les nombres veulent dire.",
      rappel: [
        "On écrit d'abord chaque donnée avec sa notation : $P(A)$, $P_A(B)$ ou $P(A \\cap B)$.",
        "La formule sert dans les trois sens : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, $P(A \\cap B) = P(A) \\times P_A(B)$, $P(A) = \\dfrac{P(A \\cap B)}{P_A(B)}$.",
        "Si $B$ ne peut arriver que si $A$ arrive, alors $A \\cap B = B$.",
      ],
      exercices: [
        {
          titre: "Le test en période d'épidémie",
          enonce:
            "Un test rapide est positif chez $80$ % des malades et chez $2$ % des personnes saines. Pendant une épidémie, $5$ % de la population est malade (modèle).\na) Sur $10\\,000$ personnes, compter les malades positifs et les faux positifs.\nb) En déduire $P(T)$, puis $P_T(M)$ au centième près.\nc) Hors épidémie, seulement $0{,}5$ % de la population est malade. Refaire le calcul de $P_T(M)$.\nd) Le même test, positif, a-t-il la même valeur dans les deux cas ?",
          figure: arbre([
            { label: "M", proba: "0,05", enfants: [{ label: "T", proba: "0,8" }, { label: "non T", proba: "0,2" }] },
            { label: "non M", proba: "0,95", enfants: [{ label: "T", proba: "0,02" }, { label: "non T", proba: "0,98" }] },
          ]),
          correction:
            "a) Malades : $500$, dont $0{,}8 \\times 500 = 400$ positifs. Saines : $9\\,500$, dont $0{,}02 \\times 9\\,500 = 190$ faux positifs.\nb) Positifs : $400 + 190 = 590$. $P(T) = \\dfrac{590}{10\\,000} = 0{,}059$.\n$P_T(M) = \\dfrac{400}{590} = \\dfrac{40}{59} \\approx 0{,}68$.\nc) Malades : $50$, dont $40$ positifs. Saines : $9\\,950$, dont $0{,}02 \\times 9\\,950 = 199$ faux positifs.\n$P_T(M) = \\dfrac{40}{40 + 199} = \\dfrac{40}{239} \\approx 0{,}17$.\nd) Non. Pendant l'épidémie, un positif est malade environ $2$ fois sur $3$ ; hors épidémie, environ $1$ fois sur $6$.\n⛔ $P_M(T)$ est une qualité du TEST ; $P_T(M)$ dépend AUSSI de la population testée.",
          schema: diagramme("barres", [
            { label: "Épidémie (%)", value: 68 },
            { label: "Hors épidémie (%)", value: 17 },
          ]),
          micros: ["alea_cond_faux_positifs"],
        },
        {
          titre: "L'iode radioactif",
          enonce:
            "Un noyau d'iode 131 se désintègre au hasard ; sa demi-vie est d'environ $8$ jours. Le diagramme montre combien de noyaux, sur $1\\,000$ au départ, sont encore intacts après $8$, $16$ et $24$ jours. On choisit un noyau au hasard ; $S_8$ : « intact au jour $8$ », $S_{16}$ : « intact au jour $16$ », $S_{24}$ : « intact au jour $24$ ».\na) Lire $P(S_8)$, $P(S_{16})$ et $P(S_{24})$.\nb) Pourquoi a-t-on $S_8 \\cap S_{16} = S_{16}$ ?\nc) Calculer $P_{S_8}(S_{16})$, puis $P_{S_{16}}(S_{24})$.\nd) Interpréter : un noyau « vieillit »-il ?",
          figure: diagramme("barres", [
            { label: "Jour 0", value: 1000 },
            { label: "Jour 8", value: 500 },
            { label: "Jour 16", value: 250 },
            { label: "Jour 24", value: 125 },
          ]),
          correction:
            "a) $P(S_8) = \\dfrac{500}{1\\,000} = 0{,}5$, $P(S_{16}) = 0{,}25$ et $P(S_{24}) = 0{,}125$.\nb) Un noyau intact au jour $16$ était forcément intact au jour $8$ : une désintégration ne se défait pas.\nc) $P_{S_8}(S_{16}) = \\dfrac{P(S_8 \\cap S_{16})}{P(S_8)} = \\dfrac{0{,}25}{0{,}5} = 0{,}5$.\n$P_{S_{16}}(S_{24}) = \\dfrac{0{,}125}{0{,}25} = 0{,}5$.\nd) « Parmi les noyaux encore intacts, la moitié le restent $8$ jours de plus », quel que soit leur âge.\n⭐ Un noyau ne vieillit pas : ce qui lui est arrivé avant ne change pas son avenir. C'est ce qui définit la demi-vie.",
          micros: ["alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "Le recrutement",
          enonce:
            "Pour un poste, une entreprise reçoit des candidatures (modèle). $20$ % des candidats sont ingénieurs ($I$). Un ingénieur est embauché ($E$) avec la probabilité $0{,}3$ ; un autre candidat avec la probabilité $0{,}05$.\na) Calculer $P(I \\cap E)$ et $P(\\overline{I} \\cap E)$.\nb) Compléter le tableau des probabilités, et lire $P(E)$.\nc) Calculer $P_E(I)$.\nd) Un journaliste écrit : « dans cette entreprise, on embauche surtout des ingénieurs ». Un autre : « un ingénieur n'y est embauché que trois fois sur dix ». Qui a raison ?",
          correction:
            "a) $P(I \\cap E) = 0{,}2 \\times 0{,}3 = 0{,}06$ et $P(\\overline{I} \\cap E) = 0{,}8 \\times 0{,}05 = 0{,}04$.\nb) Ligne Ingénieur : $0{,}06$ et $0{,}14$, total $0{,}2$. Ligne Autre : $0{,}04$ et $0{,}76$, total $0{,}8$. Colonne Embauché : $P(E) = 0{,}06 + 0{,}04 = 0{,}1$.\nc) $P_E(I) = \\dfrac{0{,}06}{0{,}1} = 0{,}6$.\nd) Les deux. Le premier parle de $P_E(I) = 0{,}6$ : $60$ % des embauchés sont ingénieurs. Le second de $P_I(E) = 0{,}3$.\n⭐ Les ingénieurs ne sont que $20$ % des candidats, mais $60$ % des embauchés : leur chance est six fois plus grande ($0{,}3$ contre $0{,}05$).",
          schema: tableauProba(["", "Embauché", "Pas embauché", "Total"], [["Ingénieur", "0,06", "0,14", "0,2"], ["Autre", "0,04", "0,76", "0,8"], ["Total", "0,1", "0,9", "1"]], [[0, 1], [2, 1]]),
          micros: ["alea_cond_intersection", "alea_cond_formule", "alea_cond_interpreter"],
        },
        {
          titre: "L'espérance de vie",
          enonce:
            "Dans un pays (modèle), sur $100$ naissances, $90$ personnes atteignent $60$ ans, $60$ atteignent $80$ ans et $24$ atteignent $90$ ans. On choisit une personne au hasard à sa naissance ; $A_{60}$, $A_{80}$, $A_{90}$ : « atteindre $60$, $80$, $90$ ans ».\na) Pourquoi a-t-on $A_{60} \\cap A_{80} = A_{80}$ ?\nb) Une personne vient d'avoir $60$ ans. Quelle est la probabilité qu'elle atteigne $80$ ans ?\nc) Même question pour atteindre $90$ ans sachant qu'on a $80$ ans.\nd) Comparer $P(A_{80})$ et $P_{A_{60}}(A_{80})$, et expliquer la différence.",
          figure: diagramme("barres", [
            { label: "60 ans", value: 90 },
            { label: "80 ans", value: 60 },
            { label: "90 ans", value: 24 },
          ]),
          correction:
            "a) Pour atteindre $80$ ans, il faut d'abord avoir atteint $60$ ans : $A_{80}$ est contenu dans $A_{60}$.\nb) $P_{A_{60}}(A_{80}) = \\dfrac{P(A_{80})}{P(A_{60})} = \\dfrac{0{,}6}{0{,}9} = \\dfrac{2}{3} \\approx 0{,}67$.\nc) $P_{A_{80}}(A_{90}) = \\dfrac{0{,}24}{0{,}6} = 0{,}4$.\nd) À la naissance, $P(A_{80}) = 0{,}6$ ; à $60$ ans, la probabilité monte à environ $0{,}67$.\nLa personne de $60$ ans a déjà « passé » les risques des soixante premières années : on ne compte plus ceux qui sont morts avant.\n⭐ C'est pourquoi les démographes calculent aussi une espérance de vie « à $60$ ans » : plus on avance en âge, plus l'âge qu'on peut espérer atteindre recule.",
          micros: ["alea_cond_formule", "alea_cond_interpreter"],
        },
      ],
    },
  ],
};
