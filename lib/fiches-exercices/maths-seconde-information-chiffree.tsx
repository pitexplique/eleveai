// ─── Fiche d'exercices : information chiffrée (seconde) — 20 exercices corrigés ─
//
// ⭐ LA PREMIÈRE FEUILLE DE SECONDE (20/09/2026), et le trio de la Une : le short
// « fiche de paie : −47 % ou +89 % ? », la fiche de cours, la feuille. Frédéric :
// « on envoie la vidéo, mais elle doit être connectée à un coach IA en maths avec
// fiche de cours et fiche d'exercices — comme avec les baleines ».
//
// Alignée sur la banque
// `lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank.ts`
// (notionId information_chiffree_evolutions), renforcée le même jour de huit
// énoncés « fiche de paie » : avant, rien ne rapportait UNE somme à DEUX totaux,
// et le mot « point » n'apparaissait nulle part.
//
// ⭐⭐ LE FIL : UN POURCENTAGE NE DIT RIEN SANS SA RÉFÉRENCE. Le même bulletin
// donne 47 % (du coût) et 89 % (du net) ; la même baisse fait 3,3 points et
// 6,5 %. Chaque exercice demande d'abord : « pour cent de QUOI ? ».
//
// ⭐ DE VRAIS CHIFFRES, relevés le 20/09/2026 à la source primaire :
//   - OCDE, base « Taxing Wages » (sdmx.oecd.org, DF_TW_COMP) : célibataire sans
//     enfant, part des prélèvements (cotisations + impôt sur le revenu) dans le
//     coût du travail. France au salaire moyen : 50,5 % (2005) → 47,2 % (2025) ;
//     à 67 % du salaire moyen 46,5 → 41,2 ; à 167 % 53,3 → 54,1. En 2025 :
//     Belgique 52,5 · Allemagne 49,3 · France 47,2 · moyenne OCDE 35,1 · Suisse
//     23,0. Salaire moyen par mois : coût 3 655 €, net 1 809 € (2005) ; coût
//     5 223 €, net 2 759 € (2025) ; brut annuel 30 521 € → 45 964 €.
//   - URSSAF, simulateur mon-entreprise (API publique), règles 2026, CDI non
//     cadre : SMIC 1 823 € brut → coût 1 899 €, net 1 421 € ; 2 950 € brut →
//     coût 3 925 €, net avant impôt 2 313 €.
//   - INSEE, indice des prix à la consommation, série 001759970 (base 2015) :
//     87,85 en moyenne 2005, 120,95 en 2025, soit +37,7 %.
//   - Le bulletin 3 922 € → 2 079 € est celui d'un livre paru en 2026 (S. Knafo,
//     « Le Casse du siècle ») ; son rapport, 47,0 %, recoupe l'OCDE.
//
// ⛔ LA FEUILLE CALCULE, ELLE NE JUGE PAS : les prélèvements financent la
// retraite, la santé, le chômage. Aucun énoncé ne dit « trop » ni « pas assez ».
//
// ⛔ Écrit simplement : c'est la règle de la fille de Frédéric, en tête de
// lib/fiches/types.ts. Une phrase par idée, le mot de la classe.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-information-chiffree.mjs`.
//
// Micro-compétences : info_proportion (1, 2, 9, 15, 16, 20),
// info_pourcentage_de_pourcentage (3, 13), info_variation_absolue_relative (4,
// 10, 15, 18), info_taux_evolution (4, 5, 6, 11, 16, 17),
// info_evolutions_successives (7, 12, 17), info_evolution_reciproque (8, 11, 14,
// 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le même canvas que le coach (`tableau_donnees`) : l'élève retrouve dans le
// corrigé la figure de la question. ⛔ Deux colonnes de valeurs, jamais trois :
// à 375 px une troisième colonne sort de la carte.
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [number | string, number | string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesInformationChiffreeSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "information-chiffree-evolutions",
  titre: "Pourcentages et évolutions",
  accroche:
    "Vingt exercices, du calcul seul au problème, sur de vrais chiffres : une fiche de paie, vingt ans de salaires, cinq pays. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/seconde/information-chiffree-evolutions",
      titre: "Pourcentages et évolutions",
    },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat avec son unité.",
      rappel: [
        "PROPORTION : partie $\\div$ total. On la donne souvent en pourcentage : $\\dfrac{28}{80} = 0{,}35 = 35\\,\\%$. Un pourcentage se lit toujours avec son total : « pour cent de QUOI ? ».",
        "VARIATION : absolue $= V_A - V_D$ (en euros, en points…) ; relative $= \\dfrac{V_A - V_D}{V_D}$ (en %). $V_D$ est la valeur de départ, $V_A$ la valeur d'arrivée.",
        "COEFFICIENT MULTIPLICATEUR : augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$.",
        "Deux évolutions à la suite : on MULTIPLIE les coefficients. Pour revenir en arrière : on prend l'INVERSE du coefficient.",
      ],
      exercices: [
        {
          enonce: "Une entreprise compte $80$ salariés, dont $28$ cadres. Quelle est la proportion de cadres, en pourcentage ?",
          correction:
            "On divise la partie par le total : $\\dfrac{28}{80} = 0{,}35$.\nOn écrit ce nombre en pourcentage : $0{,}35 = 35\\,\\%$.\nLes cadres représentent $35\\,\\%$ des salariés.\n⛔ Le piège : diviser dans l'autre sens. $\\dfrac{80}{28} \\approx 2{,}86$ ne peut pas être une proportion : une proportion est toujours entre $0$ et $1$.",
          micros: ["info_proportion"],
        },
        {
          enonce: "Un salaire brut est de $2\\,000\\,€$. Les cotisations du salarié en représentent $22\\,\\%$.\na) Calculer le montant des cotisations.\nb) En déduire le salaire net.",
          correction:
            "a) Prendre $22\\,\\%$, c'est multiplier par $0{,}22$ : $2\\,000 \\times 0{,}22 = 440\\,€$.\nb) Le net est ce qui reste : $2\\,000 - 440 = 1\\,560\\,€$.\n⭐ Plus rapide : il reste $100\\,\\% - 22\\,\\% = 78\\,\\%$ du brut, donc $2\\,000 \\times 0{,}78 = 1\\,560\\,€$. Le nombre $0{,}78$ est le coefficient multiplicateur du brut au net.",
          micros: ["info_proportion"],
        },
        {
          enonce: "Sur une fiche de paie, la CSG vaut $9{,}2\\,\\%$ d'une base, et cette base vaut $98{,}25\\,\\%$ du salaire brut.\na) Quel pourcentage du salaire brut la CSG représente-t-elle ?\nb) Calculer la CSG pour un brut de $2\\,000\\,€$.",
          correction:
            "a) Un pourcentage d'un pourcentage : on multiplie les deux proportions.\n$0{,}092 \\times 0{,}9825 \\approx 0{,}0904$, soit environ $9{,}04\\,\\%$ du brut.\nb) $2\\,000 \\times 0{,}0904 = 180{,}80\\,€$.\n⛔ Le piège : lire « $9{,}2\\,\\%$ » sur le bulletin et l'appliquer au brut entier. On trouverait $184\\,€$ : le taux est juste, mais pas le total auquel on l'applique.",
          micros: ["info_pourcentage_de_pourcentage"],
        },
        {
          enonce: "En France, le salaire brut annuel moyen est passé de $30\\,521\\,€$ en 2005 à $45\\,964\\,€$ en 2025 (source : OCDE).\na) Calculer la variation absolue.\nb) Calculer la variation relative, en pourcentage, arrondie au dixième.",
          correction:
            "a) Variation absolue : $45\\,964 - 30\\,521 = 15\\,443\\,€$. Elle se donne dans l'unité des valeurs.\nb) Variation relative : on rapporte cette variation à la valeur de DÉPART.\n$\\dfrac{15\\,443}{30\\,521} \\approx 0{,}506$, soit $+50{,}6\\,\\%$.\n⛔ Le piège : diviser par la valeur d'arrivée. $\\dfrac{15\\,443}{45\\,964} \\approx 33{,}6\\,\\%$ répond à une autre question : « quelle part du salaire de 2025 est venue en vingt ans ? ».",
          micros: ["info_variation_absolue_relative", "info_taux_evolution"],
        },
        {
          enonce: "Compléter.\na) Une hausse de $3{,}5\\,\\%$ correspond au coefficient multiplicateur …\nb) Une baisse de $22\\,\\%$ correspond au coefficient …\nc) Le coefficient $0{,}53$ correspond à une … de … $\\%$.\nd) Le coefficient $1{,}89$ correspond à une … de … $\\%$.",
          correction:
            "a) $1 + \\dfrac{3{,}5}{100} = 1{,}035$.\nb) $1 - \\dfrac{22}{100} = 0{,}78$.\nc) $0{,}53 < 1$ : c'est une baisse. $0{,}53 - 1 = -0{,}47$, donc une baisse de $47\\,\\%$.\nd) $1{,}89 > 1$ : c'est une hausse. $1{,}89 - 1 = 0{,}89$, donc une hausse de $89\\,\\%$.\n⭐ À retenir : coefficient plus grand que $1$, ça monte ; plus petit que $1$, ça baisse. Le taux, c'est le coefficient moins $1$.",
          micros: ["info_taux_evolution"],
        },
        {
          enonce: "Pour un salarié non cadre, le salaire net vaut environ le salaire brut multiplié par $0{,}78$. Calculer le net pour un brut de $2\\,500\\,€$.",
          correction:
            "On applique le coefficient : $2\\,500 \\times 0{,}78 = 1\\,950\\,€$.\nLe net est d'environ $1\\,950\\,€$.\n⭐ Multiplier par $0{,}78$, c'est retirer $22\\,\\%$ : une seule multiplication remplace « calculer $22\\,\\%$, puis soustraire ».",
          micros: ["info_taux_evolution"],
        },
        {
          enonce: "Un salaire augmente de $10\\,\\%$, puis encore de $10\\,\\%$ l'année suivante. Quel est le taux d'évolution global ?",
          correction:
            "Chaque hausse de $10\\,\\%$ multiplie par $1{,}1$.\nDeux hausses à la suite : $1{,}1 \\times 1{,}1 = 1{,}21$.\n$1{,}21 - 1 = 0{,}21$ : la hausse globale est de $21\\,\\%$.\n⛔ Le piège : répondre $20\\,\\%$. Les pourcentages ne s'additionnent pas, parce que la seconde hausse porte sur un salaire déjà augmenté.",
          micros: ["info_evolutions_successives"],
        },
        {
          enonce: "Un prix baisse de $20\\,\\%$. De quel pourcentage faut-il l'augmenter pour revenir au prix de départ ?",
          correction:
            "La baisse de $20\\,\\%$ multiplie par $0{,}8$.\nPour revenir, on multiplie par l'inverse : $\\dfrac{1}{0{,}8} = 1{,}25$.\n$1{,}25 - 1 = 0{,}25$ : il faut une hausse de $25\\,\\%$.\n⛔ Le piège : répondre $20\\,\\%$. Vérification sur $100\\,€$ : $100 \\to 80$, puis $80 \\times 1{,}2 = 96\\,€$. On n'est pas revenu à $100$.",
          micros: ["info_evolution_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, de vrais chiffres. À chaque pourcentage, on écrit son total.",
      rappel: [
        "La MÊME somme donne des pourcentages différents selon le total choisi. Avant de calculer, on écrit : « en pourcentage de … ».",
        "Entre deux pourcentages, l'écart se compte en POINTS : de $50\\,\\%$ à $45\\,\\%$, la baisse est de $5$ points. En relatif, c'est $\\dfrac{-5}{50} = -10\\,\\%$. Ce sont deux nombres différents pour le même fait.",
        "Retrouver la valeur de départ : on DIVISE par le coefficient. Si $V_A = V_D \\times 0{,}78$, alors $V_D = V_A \\div 0{,}78$.",
      ],
      exercices: [
        {
          enonce: "Dans un livre paru en 2026, un salarié coûte $3\\,922\\,€$ par mois à son employeur et touche $2\\,079\\,€$ net, impôt sur le revenu déduit.\na) Calculer le total des prélèvements (cotisations et impôt).\nb) Quel pourcentage du coût pour l'employeur représentent-ils ?\nc) Quel pourcentage du salaire net représentent-ils ?\nd) Un titre annonce « $47\\,\\%$ de prélèvements », un autre « $89\\,\\%$ ». Qui a raison ?",
          correction:
            "a) $3\\,922 - 2\\,079 = 1\\,843\\,€$.\nb) On rapporte au coût : $\\dfrac{1\\,843}{3\\,922} \\approx 0{,}470$, soit $47{,}0\\,\\%$ du coût.\nc) On rapporte au net : $\\dfrac{1\\,843}{2\\,079} \\approx 0{,}886$, soit $88{,}6\\,\\%$ du net.\nd) Les deux ont raison. La somme est la même, $1\\,843\\,€$ ; c'est le total qui change. « $47\\,\\%$ de ce que je coûte » et « $89\\,\\%$ de ce que je touche » décrivent le même bulletin.\n⭐ Ces prélèvements financent la retraite, la santé, le chômage. Le calcul ne dit pas si c'est trop ou pas assez : il dit seulement qu'un pourcentage sans son total ne veut rien dire.",
          schema: tableau("Les mêmes 1 843 €", ["en % du coût", "en % du net"], [
            { label: "Total choisi", values: ["3 922 €", "2 079 €"] },
            { label: "Pourcentage", values: ["47,0 %", "88,6 %"] },
          ]),
          micros: ["info_proportion"],
        },
        {
          enonce: "Selon l'OCDE, pour un célibataire payé au salaire moyen en France, la part des prélèvements dans le coût du travail est passée de $50{,}5\\,\\%$ en 2005 à $47{,}2\\,\\%$ en 2025.\na) Calculer la variation en points.\nb) Calculer la variation relative, arrondie au dixième.\nc) Un titre dit : « Les prélèvements ont baissé de $3{,}3\\,\\%$ ». Est-ce juste ?",
          correction:
            "a) $47{,}2 - 50{,}5 = -3{,}3$ : une baisse de $3{,}3$ POINTS. Entre deux pourcentages, l'écart se compte en points.\nb) On rapporte à la valeur de départ : $\\dfrac{-3{,}3}{50{,}5} \\approx -0{,}065$, soit $-6{,}5\\,\\%$.\nc) Non. La baisse est de $3{,}3$ points, ou de $6{,}5\\,\\%$ en relatif. « $3{,}3\\,\\%$ » mélange les deux : le nombre vient du premier calcul, l'unité du second.\n⭐ Pour savoir lequel donner, on écrit l'unité avant de calculer.",
          micros: ["info_variation_absolue_relative"],
        },
        {
          enonce: "Après les cotisations, qui retirent $22\\,\\%$ du salaire brut, un salarié touche $1\\,716\\,€$ net. Quel est son salaire brut ?",
          correction:
            "Retirer $22\\,\\%$, c'est multiplier par $0{,}78$ : $\\text{brut} \\times 0{,}78 = 1\\,716$.\nOn cherche la valeur de départ : on divise par le coefficient.\n$\\text{brut} = \\dfrac{1\\,716}{0{,}78} = 2\\,200\\,€$.\n⛔ Le piège : ajouter $22\\,\\%$ au net. $1\\,716 \\times 1{,}22 \\approx 2\\,094\\,€$ : c'est faux, parce que les $22\\,\\%$ ont été calculés sur le brut, pas sur le net.\nVérification : $2\\,200 \\times 0{,}78 = 1\\,716$. ✓",
          micros: ["info_taux_evolution", "info_evolution_reciproque"],
        },
        {
          enonce: "D'après le simulateur de l'URSSAF (règles 2026), un salarié non cadre payé $2\\,950\\,€$ brut coûte $3\\,925\\,€$ à son employeur et touche $2\\,313\\,€$ net avant impôt.\na) Quel pourcentage retire-t-on en passant du coût au brut ?\nb) Et en passant du brut au net ?\nc) Et en passant directement du coût au net ?\nd) Vérifier le résultat du c) avec les coefficients du a) et du b).",
          correction:
            "a) $\\dfrac{2\\,950}{3\\,925} \\approx 0{,}752$ : on retire $1 - 0{,}752 = 0{,}248$, soit $24{,}8\\,\\%$.\nb) $\\dfrac{2\\,313}{2\\,950} \\approx 0{,}784$ : on retire $21{,}6\\,\\%$.\nc) $\\dfrac{2\\,313}{3\\,925} \\approx 0{,}589$ : on retire $41{,}1\\,\\%$.\nd) On multiplie les coefficients : $0{,}752 \\times 0{,}784 \\approx 0{,}589$. On retrouve le c).\n⛔ Le piège : additionner. $24{,}8 + 21{,}6 = 46{,}4$, et non $41{,}1$. Le second pourcentage porte sur le brut, qui est déjà plus petit que le coût.",
          micros: ["info_evolutions_successives"],
        },
        {
          enonce: "Dans une entreprise de $250$ salariés, $40\\,\\%$ sont cadres, et $30\\,\\%$ des cadres sont des femmes.\na) Quelle proportion de l'ensemble des salariés les femmes cadres représentent-elles ?\nb) Vérifier avec les effectifs.",
          correction:
            "a) Une proportion de proportion : on multiplie. $0{,}40 \\times 0{,}30 = 0{,}12$, soit $12\\,\\%$ des salariés.\nb) Cadres : $250 \\times 0{,}40 = 100$. Femmes cadres : $100 \\times 0{,}30 = 30$. Et $\\dfrac{30}{250} = 0{,}12$. ✓\n⛔ Le piège : répondre $30\\,\\%$. Ce sont $30\\,\\%$ DES CADRES, pas de tous les salariés : le total n'est pas le même.",
          micros: ["info_pourcentage_de_pourcentage"],
        },
        {
          enonce: "Du coût pour l'employeur au salaire net, un bulletin retire $47\\,\\%$. De quel pourcentage faut-il augmenter le net pour retrouver le coût ? Arrondir au dixième.",
          correction:
            "Retirer $47\\,\\%$, c'est multiplier par $0{,}53$.\nLe chemin retour multiplie par l'inverse : $\\dfrac{1}{0{,}53} \\approx 1{,}887$.\n$1{,}887 - 1 = 0{,}887$ : il faut augmenter le net de $88{,}7\\,\\%$.\n⭐ C'est le résultat de l'exercice 9, retrouvé autrement : $-47\\,\\%$ à l'aller, $+89\\,\\%$ au retour, pour le même bulletin. (L'exercice 9 donnait $88{,}6$ : l'écart vient de l'arrondi de $46{,}99$ à $47$.)",
          micros: ["info_evolution_reciproque"],
        },
        {
          enonce: "Part des prélèvements dans le coût du travail en 2025, pour un célibataire au salaire moyen (source : OCDE) : Belgique $52{,}5\\,\\%$, Allemagne $49{,}3\\,\\%$, France $47{,}2\\,\\%$, moyenne de l'OCDE $35{,}1\\,\\%$, Suisse $23{,}0\\,\\%$.\na) Pour un coût de $4\\,000\\,€$, calculer le net en Belgique, en France et en Suisse.\nb) Quel est l'écart entre la France et la moyenne de l'OCDE ?\nc) En 2005, la Belgique était à $55{,}5\\,\\%$ et la France à $50{,}5\\,\\%$. Lequel des deux pays a le plus baissé ?",
          correction:
            "a) Le net est ce qui reste. Belgique : $4\\,000 \\times (1 - 0{,}525) = 4\\,000 \\times 0{,}475 = 1\\,900\\,€$.\nFrance : $4\\,000 \\times 0{,}528 = 2\\,112\\,€$. Suisse : $4\\,000 \\times 0{,}77 = 3\\,080\\,€$.\nb) $47{,}2 - 35{,}1 = 12{,}1$ points. On compare deux pourcentages : l'écart est en points.\nc) Belgique : $52{,}5 - 55{,}5 = -3{,}0$ points. France : $47{,}2 - 50{,}5 = -3{,}3$ points. La France a un peu plus baissé.\n⚠️ Ces nets ne se comparent pas tels quels : selon le pays, la retraite ou la santé sont payées par les prélèvements, ou à part, après le net.",
          micros: ["info_proportion", "info_variation_absolue_relative"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes. On choisit soi-même l'outil, et on conclut par une phrase.",
      rappel: [
        "Pour comparer deux évolutions (un salaire et des prix), on DIVISE les coefficients : $\\dfrac{1{,}50}{1{,}20} = 1{,}25$. On ne soustrait pas les pourcentages.",
        "Une situation est PROPORTIONNELLE si le coefficient est le même partout. Un bulletin de paie ne l'est pas : la part prélevée change avec le salaire.",
        "Avant de dire « ça monte » ou « ça baisse », on précise : pour QUI, par rapport à QUOI, et en points ou en pourcentage.",
      ],
      exercices: [
        {
          titre: "Du SMIC à 2 950 € brut",
          enonce: "D'après le simulateur de l'URSSAF (règles 2026) : au SMIC, le brut est de $1\\,823\\,€$, le coût pour l'employeur de $1\\,899\\,€$ et le net de $1\\,421\\,€$. Pour un brut de $2\\,950\\,€$, le coût est de $3\\,925\\,€$ et le net de $2\\,313\\,€$ (avant impôt).\na) Calculer la part des prélèvements dans le coût, pour chacun des deux salaires.\nb) Du premier salaire au second, calculer le taux d'évolution du brut, du net, puis du coût.\nc) Les prélèvements sont-ils proportionnels au coût ?",
          correction:
            "a) Au SMIC : $1\\,899 - 1\\,421 = 478\\,€$, et $\\dfrac{478}{1\\,899} \\approx 25{,}2\\,\\%$.\nÀ $2\\,950\\,€$ brut : $3\\,925 - 2\\,313 = 1\\,612\\,€$, et $\\dfrac{1\\,612}{3\\,925} \\approx 41{,}1\\,\\%$.\nb) Brut : $\\dfrac{2\\,950}{1\\,823} \\approx 1{,}618$, soit $+61{,}8\\,\\%$. Net : $\\dfrac{2\\,313}{1\\,421} \\approx 1{,}628$, soit $+62{,}8\\,\\%$.\nCoût : $\\dfrac{3\\,925}{1\\,899} \\approx 2{,}067$, soit $+106{,}7\\,\\%$.\nc) Non. La part passe de $25{,}2\\,\\%$ à $41{,}1\\,\\%$ : le coefficient n'est pas le même. Pour que le net augmente de $63\\,\\%$, le coût doit plus que doubler.\n⭐ C'est voulu par la loi : près du SMIC, les cotisations de l'employeur sont fortement réduites.",
          schema: tableau("Deux bulletins (URSSAF, 2026)", ["SMIC", "2 950 € brut"], [
            { label: "Coût employeur", values: ["1 899 €", "3 925 €"] },
            { label: "Net", values: ["1 421 €", "2 313 €"] },
            { label: "Part prélevée", values: ["25,2 %", "41,1 %"] },
          ]),
          micros: ["info_proportion", "info_taux_evolution"],
        },
        {
          titre: "Vingt ans de salaire moyen",
          enonce: "Pour un célibataire payé au salaire moyen en France (source : OCDE), par mois : en 2005, le coût pour l'employeur était de $3\\,655\\,€$ et le net, impôt déduit, de $1\\,809\\,€$ ; en 2025, le coût est de $5\\,223\\,€$ et le net de $2\\,759\\,€$. Sur la même période, les prix ont augmenté de $37{,}7\\,\\%$ (source : INSEE).\na) Calculer le taux d'évolution du coût, puis celui du net.\nb) Calculer la part des prélèvements dans le coût en 2005, puis en 2025.\nc) De combien le pouvoir d'achat du salaire net a-t-il évolué ?",
          correction:
            "a) Coût : $\\dfrac{5\\,223}{3\\,655} \\approx 1{,}429$, soit $+42{,}9\\,\\%$. Net : $\\dfrac{2\\,759}{1\\,809} \\approx 1{,}525$, soit $+52{,}5\\,\\%$.\nLe net a augmenté plus vite que le coût.\nb) 2005 : $\\dfrac{3\\,655 - 1\\,809}{3\\,655} = \\dfrac{1\\,846}{3\\,655} \\approx 50{,}5\\,\\%$. 2025 : $\\dfrac{5\\,223 - 2\\,759}{5\\,223} = \\dfrac{2\\,464}{5\\,223} \\approx 47{,}2\\,\\%$.\nOn retrouve les deux taux de l'exercice 10 : c'est parce que la part a baissé que le net a augmenté plus vite que le coût.\nc) On divise les coefficients : $\\dfrac{1{,}525}{1{,}377} \\approx 1{,}108$. Le pouvoir d'achat du net a augmenté d'environ $10{,}8\\,\\%$ en vingt ans.\n⛔ Le piège : $52{,}5 - 37{,}7 = 14{,}8$. On ne soustrait pas des pourcentages qui n'ont pas le même total.",
          schema: tableau("Salaire moyen, par mois (OCDE)", ["2005", "2025"], [
            { label: "Coût employeur", values: ["3 655 €", "5 223 €"] },
            { label: "Net", values: ["1 809 €", "2 759 €"] },
            { label: "Part prélevée", values: ["50,5 %", "47,2 %"] },
          ]),
          micros: ["info_taux_evolution", "info_evolutions_successives"],
        },
        {
          titre: "Qui a raison ?",
          enonce: "Part des prélèvements dans le coût du travail en France, pour un célibataire (source : OCDE). Aux deux tiers du salaire moyen : $46{,}5\\,\\%$ en 2005, $41{,}2\\,\\%$ en 2025. Au salaire moyen : $50{,}5\\,\\%$ puis $47{,}2\\,\\%$. À $1{,}67$ fois le salaire moyen : $53{,}3\\,\\%$ puis $54{,}1\\,\\%$.\na) Calculer la variation en points pour chacun des trois salaires.\nb) Calculer la variation relative pour le plus bas et pour le plus haut.\nc) Un titre dit : « En vingt ans, les prélèvements sur les salaires ont baissé ». Un autre : « Ils ont augmenté ». Qui a raison ?",
          correction:
            "a) Bas salaire : $41{,}2 - 46{,}5 = -5{,}3$ points. Salaire moyen : $-3{,}3$ points. Haut salaire : $54{,}1 - 53{,}3 = +0{,}8$ point.\nb) Bas salaire : $\\dfrac{-5{,}3}{46{,}5} \\approx -11{,}4\\,\\%$. Haut salaire : $\\dfrac{0{,}8}{53{,}3} \\approx +1{,}5\\,\\%$.\nc) Chacun a raison pour une partie des salariés : la part a baissé pour les salaires bas et moyens, elle a un peu monté pour les hauts salaires.\n⭐ Un titre sans « pour qui » est incomplet, même quand son chiffre est exact. C'est la même question qu'à l'exercice 9 : pour cent de QUOI, et ici pour QUI.",
          schema: tableau("Part prélevée en France (OCDE)", ["2005", "2025"], [
            { label: "⅔ du salaire moyen", values: ["46,5 %", "41,2 %"] },
            { label: "Salaire moyen", values: ["50,5 %", "47,2 %"] },
            { label: "1,67 fois le salaire moyen", values: ["53,3 %", "54,1 %"] },
          ]),
          micros: ["info_variation_absolue_relative"],
        },
        {
          titre: "100 € de plus sur le compte",
          enonce: "On suppose que la part des prélèvements dans le coût reste fixe : $47\\,\\%$ en France, $23\\,\\%$ en Suisse, $52{,}5\\,\\%$ en Belgique. Un salarié veut toucher $100\\,€$ net de plus par mois.\na) De combien le coût pour l'employeur doit-il augmenter en France ?\nb) Même question en Suisse, puis en Belgique.",
          correction:
            "a) En France, $\\text{net} = \\text{coût} \\times 0{,}53$. On cherche la valeur de départ : on divise.\n$\\dfrac{100}{0{,}53} \\approx 188{,}68\\,€$. Il faut environ $189\\,€$ de coût en plus.\nb) Suisse : $\\dfrac{100}{0{,}77} \\approx 129{,}87\\,€$. Belgique : $\\dfrac{100}{0{,}475} \\approx 210{,}53\\,€$.\n⛔ Le piège : calculer $100 \\times 1{,}47 = 147\\,€$. Les $47\\,\\%$ sont une part du COÛT, pas du net : on ne peut pas les ajouter au net.\n⚠️ L'hypothèse « la part reste fixe » simplifie : l'exercice 16 montre qu'en réalité elle change avec le salaire.",
          micros: ["info_evolution_reciproque"],
        },
        {
          titre: "Un bulletin, du brut aux deux pourcentages",
          enonce: "Un bulletin simplifié : le brut est de $2\\,000\\,€$. Les cotisations du salarié valent $22\\,\\%$ du brut ; celles de l'employeur valent $30\\,\\%$ du brut et s'ajoutent au brut.\na) Calculer le net, puis le coût pour l'employeur.\nb) Quelle part du coût les cotisations représentent-elles ?\nc) Et quelle part du net ?\nd) Du coût au net, quel est le coefficient multiplicateur ? En déduire le taux de l'évolution réciproque.\ne) Comparer les résultats du c) et du d). Expliquer.",
          correction:
            "a) Net : $2\\,000 \\times 0{,}78 = 1\\,560\\,€$. Coût : $2\\,000 \\times 1{,}30 = 2\\,600\\,€$.\nb) Cotisations : $2\\,600 - 1\\,560 = 1\\,040\\,€$, et $\\dfrac{1\\,040}{2\\,600} = 0{,}40$, soit $40\\,\\%$ du coût.\nc) $\\dfrac{1\\,040}{1\\,560} \\approx 0{,}667$, soit $66{,}7\\,\\%$ du net.\nd) $\\dfrac{1\\,560}{2\\,600} = 0{,}6$. L'inverse : $\\dfrac{1}{0{,}6} \\approx 1{,}667$, soit $+66{,}7\\,\\%$ pour remonter du net au coût.\ne) C'est le même nombre, et ce n'est pas un hasard : $\\dfrac{\\text{coût} - \\text{net}}{\\text{net}} = \\dfrac{\\text{coût}}{\\text{net}} - 1$. « La part des cotisations dans le net » et « la hausse qui ramène du net au coût » sont un seul et même calcul.\n⭐ Voilà pourquoi un bulletin porte toujours deux pourcentages : $40\\,\\%$ à l'aller, $66{,}7\\,\\%$ au retour.",
          micros: ["info_proportion", "info_evolution_reciproque"],
        },
      ],
    },
  ],
};
