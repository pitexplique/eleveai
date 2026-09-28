// ─── Fiche d'exercices : problème de seuil, croissance exponentielle (1re) ───
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), septième et dernière feuille. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts`
// (notion expo_seuil).
//
// ⛔ PAS DE LOGARITHME au programme de première sans spé : un seuil se trouve
// en TESTANT les rangs (calculatrice), en lisant un TABLEAU de valeurs, ou en
// lisant un GRAPHIQUE avec la droite horizontale du seuil — les trois chemins
// du programme, et du sujet de Métropole 2026 (exercice 2). Demi-vie et
// temps de doublement se comptent en périodes entières.
//
// ⭐⭐ LE FIL : LA RÉPONSE EST UN RANG, ET ON LA TRADUIT DANS LE CONTEXTE.
// Les pièges nommés : donner la valeur au lieu du rang (1), oublier la
// colonne n = 0 (3), « deux demi-vies, il ne reste rien » (5), doubler trois
// fois lu × 3 (6), 100 ÷ 5 = 20 ans pour doubler (8), additionner les
// pourcentages (12), la perte fixe au lieu de la perte sur ce qui reste (13,
// 16), doubler dix fois lu × 20 (14).
//
// ⭐ Dessins : le seuil est une HORIZONTALE en pointillés sur chaque courbe
// (4, 10, 13, 16, 18, 20). Contextes : économie (livret 9, règle de 72 19),
// physique (iode 131 10, lumière sous l'eau 15, carbone 14 17), histoire-géo
// (population mondiale 11, exode rural 18), sport (cycliste 12), écologie
// (amphibiens 13, glacier 20), nature et santé (bactéries 14, médicament 16).
// Faits réels cités : demi-vie de l'iode 131 (environ 8 jours) et son usage
// médical (10) ; 8 milliards d'habitants en 2022 et un taux de croissance en
// baisse depuis les années 1960 (11) ; demi-vie du carbone 14 (environ
// 5 730 ans), sa baisse après la mort, disparition des dinosaures il y a
// environ 66 millions d'années (17) ; la « règle de 72 » des banquiers (19).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-seuil.mjs`.
//
// Micro-compétences : expo_seuil_calcul (1, 2, 8, 9, 10, 11, 14, 17, 18, 19,
// 20), expo_seuil_tableau (3, 9, 12, 15, 17, 19), expo_seuil_graphique (4, 13,
// 16, 18, 20), expo_demi_vie (5, 6, 7, 10, 11, 13, 14, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoSeuilPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-seuil",
  titre: "Problème de seuil : croissance exponentielle",
  accroche:
    "Vingt exercices pour trouver le moment où une quantité franchit un seuil : en testant les rangs à la calculatrice, en lisant un tableau de valeurs, en lisant une courbe. Et la demi-vie, du carbone 14 au glacier. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Calculatrice autorisée.",
      rappel: [
        "Un problème de seuil : trouver le PREMIER rang $n$ où une quantité dépasse (ou passe sous) une valeur donnée.",
        "Par le calcul, on teste $n = 1, 2, 3…$ jusqu'à franchir le seuil. Dans un tableau, on cherche la première valeur qui le franchit. Sur un graphique, on trace l'horizontale du seuil.",
        "La DEMI-VIE est la durée au bout de laquelle une quantité est divisée par $2$ ; le TEMPS DE DOUBLEMENT, celle au bout de laquelle elle double.",
      ],
      exercices: [
        {
          enonce: "Une quantité vaut $100$ et double à chaque étape. À partir de quelle étape dépasse-t-elle $1\\,000$ ?",
          correction:
            "On calcule les valeurs une à une : $100$ ; $200$ ; $400$ ; $800$ ; $1\\,600$.\nÀ l'étape $3$, $800 < 1\\,000$ ; à l'étape $4$, $1\\,600 > 1\\,000$.\nLe seuil est franchi à partir de l'étape $4$.\n⚠️ La réponse est un RANG, $4$, et pas la valeur $1\\,600$.\nSur le dessin, la barre mise en évidence est la première au-dessus de $1\\,000$.",
          schema: ecranSeulement(diagramme("barres", [{ label: "étape 0", value: 100 }, { label: "étape 1", value: 200 }, { label: "étape 2", value: 400 }, { label: "étape 3", value: 800 }, { label: "étape 4", value: 1600 }], 4)),
          micros: ["expo_seuil_calcul"],
        },
        {
          enonce: "On pose $u_n = 500 \\times 0{,}8^n$. Quel est le plus petit entier $n$ tel que $u_n < 200$ ?",
          correction:
            "$u_0 = 500$ ; $u_1 = 400$ ; $u_2 = 320$ ; $u_3 = 256$ ; $u_4 = 204{,}8$ ; $u_5 = 163{,}84$.\n$u_4 = 204{,}8$ est encore au-dessus de $200$ ; $u_5 = 163{,}84$ est en dessous.\nLe plus petit entier est $n = 5$.\n⭐ La suite est décroissante : une fois passée sous $200$, elle y reste.\nSur le dessin, en centaines : le premier point sous la ligne des $200$ est celui de rang $5$.",
          schema: ecranSeulement(repere([-1, 6, -1, 6], [], [{ x: 0, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 3.2 }, { x: 3, y: 2.56 }, { x: 4, y: 2.048 }, { x: 5, y: 1.6384 }], 2)),
          micros: ["expo_seuil_calcul"],
        },
        {
          enonce: "Le tableau donne un capital de $1\\,000$ € placé à $6$ % par an, au centime près, au bout de $n$ années. Au bout de combien d'années dépasse-t-il $1\\,500$ € ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5", "6", "7"], ["capital (€)", 1000, 1060, 1123.6, 1191.02, 1262.48, 1338.23, 1418.52, 1503.63], true),
          correction:
            "On parcourt la ligne jusqu'à la première valeur au-dessus de $1\\,500$ : $1\\,418{,}52$ pour $n = 6$, puis $1\\,503{,}63$ pour $n = 7$.\nLe capital dépasse $1\\,500$ € au bout de $7$ ans.\n⚠️ Pas « $8$ ans » en comptant les colonnes : la première, $n = 0$, est le jour du dépôt.",
          micros: ["expo_seuil_tableau"],
        },
        {
          enonce: "Le graphique donne, étape par étape, une population de papillons, en centaines (modèle). La ligne en pointillés marque $900$ papillons. À partir de quelle étape la population dépasse-t-elle $900$ ?",
          figure: repere([-1, 5, -1, 11], [], [
            { x: 0, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4.5 },
            { x: 3, y: 6.75 },
            { x: 4, y: 10.13 },
          ], 9, true),
          correction:
            "$900$ papillons, ce sont $9$ centaines : c'est la hauteur de la ligne en pointillés.\nÀ l'étape $3$, le point est encore en dessous, vers $6{,}75$ centaines.\nLe premier point au-dessus de la ligne est celui de l'étape $4$, vers $10$ centaines.\nLa population dépasse $900$ papillons à partir de l'étape $4$.",
          micros: ["expo_seuil_graphique"],
        },
        {
          enonce: "Un échantillon contient $80$ g d'une substance radioactive, dont la demi-vie est de $10$ ans. Quelle masse reste-t-il au bout de $30$ ans ?",
          correction:
            "$30$ ans, c'est $\\dfrac{30}{10} = 3$ demi-vies.\nÀ chaque demi-vie, la masse est divisée par $2$ : $80$, puis $40$, puis $20$, puis $10$.\nIl reste $10$ g.\n⚠️ Il ne reste pas $0$ g au bout de deux demi-vies : on prend la moitié, puis la moitié de la moitié… il en reste toujours.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0 an", value: 80 }, { label: "10 ans", value: 40 }, { label: "20 ans", value: 20 }, { label: "30 ans", value: 10 }], 3)),
          micros: ["expo_demi_vie"],
        },
        {
          enonce: "Une population de $5\\,000$ habitants double tous les $20$ ans (modèle). Combien d'habitants au bout de $60$ ans ?",
          correction:
            "$60$ ans, ce sont $3$ temps de doublement : $5\\,000 \\times 2^3 = 5\\,000 \\times 8 = 40\\,000$ habitants.\n⚠️ Pas $5\\,000 \\times 3 = 15\\,000$ : on double trois fois, on ne triple pas.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0 an", value: 5000 }, { label: "20 ans", value: 10000 }, { label: "40 ans", value: 20000 }, { label: "60 ans", value: 40000 }], 3)),
          micros: ["expo_demi_vie"],
        },
        {
          enonce: "Quelle part d'une substance radioactive reste-t-il au bout de $4$ demi-vies ? Donner un pourcentage.",
          correction:
            "À chaque demi-vie, on multiplie par $\\dfrac{1}{2}$ : au bout de $4$ demi-vies, par $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$.\n$\\dfrac{1}{16} = 0{,}0625$ : il reste $6{,}25$ %.\n⭐ C'est une suite géométrique de raison $\\dfrac{1}{2}$ : $100$ %, $50$ %, $25$ %, $12{,}5$ %, $6{,}25$ %.\nSur le dessin, le pourcentage restant après $0$, $1$, $2$, $3$ et $4$ demi-vies.",
          schema: ecranSeulement(diagramme("barres", [{ label: "départ", value: 100 }, { label: "1", value: 50 }, { label: "2", value: 25 }, { label: "3", value: 12.5 }, { label: "4", value: 6.25 }], 4)),
          micros: ["expo_demi_vie"],
        },
        {
          enonce: "À la calculatrice, trouver le plus petit entier $n$ tel que $1{,}05^n > 2$. Interpréter pour un placement à $5$ % par an.",
          correction:
            "On teste : $1{,}05^{14} \\approx 1{,}980$, encore sous $2$ ; $1{,}05^{15} \\approx 2{,}079$, au-dessus.\nLe plus petit entier est $n = 15$.\nUn capital placé à $5$ % par an a doublé au bout de $15$ ans.\n⚠️ Pas $20$ ans, le résultat de $100 \\div 5$ : les intérêts composés font doubler plus vite.\nSur le dessin, le bâton mis en évidence est le premier au-dessus de $2$.",
          schema: ecranSeulement(diagramme("batons", [{ label: "n = 13", value: 1.886 }, { label: "n = 14", value: 1.98 }, { label: "n = 15", value: 2.079 }, { label: "n = 16", value: 2.183 }], 2)),
          micros: ["expo_seuil_calcul"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Écrire le modèle, franchir le seuil, répondre dans le contexte.",
      rappel: [
        "On écrit le modèle, $u_n = u_0 \\times q^n$, puis on teste les rangs jusqu'à franchir le seuil.",
        "On répond dans le contexte : une année, une durée, une profondeur, et pas seulement « $n = 8$ ».",
        "Après $k$ demi-vies, il reste $\\left(\\dfrac{1}{2}\\right)^k$ de la quantité de départ. Après $k$ temps de doublement, elle est multipliée par $2^k$.",
      ],
      exercices: [
        {
          titre: "Un livret d'épargne",
          enonce:
            "Nina place $2\\,000$ € sur un livret à $3$ % par an (modèle). On note $u_n$ son capital au bout de $n$ années.\na) Exprimer $u_n$ en fonction de $n$.\nb) En testant des valeurs, trouver au bout de combien d'années son capital dépasse $2\\,500$ €.\nc) Présenter les valeurs utiles dans un tableau.",
          correction:
            "a) $u_n = 2\\,000 \\times 1{,}03^n$.\nb) $u_7 = 2\\,000 \\times 1{,}03^7 \\approx 2\\,459{,}75$ €, sous $2\\,500$ € ; $u_8 = 2\\,000 \\times 1{,}03^8 \\approx 2\\,533{,}54$ €, au-dessus.\nLe capital dépasse $2\\,500$ € au bout de $8$ ans.\nc) Dans le tableau, la première valeur au-dessus de $2\\,500$ est dans la colonne $8$.\n⭐ Avec des intérêts simples de $60$ € par an, il faudrait $500 \\div 60 \\approx 8{,}3$, donc $9$ ans : les intérêts composés vont plus vite.",
          schema: tableau(["année", "6", "7", "8"], ["capital (€)", 2388.1, 2459.75, 2533.54]),
          micros: ["expo_seuil_calcul", "expo_seuil_tableau"],
        },
        {
          titre: "L'iode 131 à l'hôpital",
          enonce:
            "L'iode 131, utilisé en médecine, a une demi-vie d'environ $8$ jours. Un flacon a une activité de $400$ unités (modèle).\na) Quelle activité reste-t-il au bout de $8$, $16$ et $24$ jours ?\nb) Au bout de combien de demi-vies entières l'activité est-elle passée sous $10$ % de l'activité de départ ? Combien de jours cela fait-il ?",
          correction:
            "a) $8$ jours : une demi-vie, il reste $200$ unités. $16$ jours : deux demi-vies, $100$. $24$ jours : trois demi-vies, $50$.\nb) $10$ % de $400$, c'est $40$. Après $3$ demi-vies : $50$, encore au-dessus. Après $4$ demi-vies : $25$, en dessous.\nIl faut $4$ demi-vies, soit $4 \\times 8 = 32$ jours.\n⭐ En comptant les demi-vies, on trouve le seuil de tête : le premier $k$ tel que $2^k > 10$ est $4$, car $2^4 = 16$.\nSur le dessin, en centaines d'unités : un point par demi-vie, et la ligne des $40$ unités.",
          schema: repere([-1, 5, -1, 5], [], [
            { x: 0, y: 4 },
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 0.5 },
            { x: 4, y: 0.25 },
          ], 0.4),
          micros: ["expo_demi_vie", "expo_seuil_calcul"],
        },
        {
          titre: "Dix milliards d'humains ?",
          enonce:
            "En 2022, la population mondiale a atteint $8$ milliards d'habitants. On suppose (modèle) qu'elle augmente ensuite de $1$ % par an.\na) Exprimer la population $p_n$, en milliards, en l'année $2022 + n$.\nb) En quelle année dépasserait-elle $10$ milliards ?\nc) Quel serait son temps de doublement ? Tester $n = 69$ et $n = 70$.",
          correction:
            "a) $p_n = 8 \\times 1{,}01^n$.\nb) $p_{22} \\approx 9{,}96$ et $p_{23} \\approx 10{,}06$ : on dépasse $10$ milliards pour $n = 23$, soit en $2022 + 23 = 2045$.\nc) $1{,}01^{69} \\approx 1{,}987$ et $1{,}01^{70} \\approx 2{,}007$ : la population doublerait en $70$ ans environ.\n⭐ Ce modèle suppose un taux constant. Or le taux de croissance de la population mondiale baisse depuis les années 1960 : on s'attend à une croissance plus lente.",
          schema: tableau(["année", "2044", "2045"], ["population (milliards)", 9.96, 10.06]),
          micros: ["expo_seuil_calcul", "expo_demi_vie"],
        },
        {
          titre: "La puissance d'un cycliste",
          enonce:
            "Un cycliste développe une puissance de $200$ watts sur une heure. Grâce à l'entraînement, elle augmente de $2$ % par mois (modèle). Le tableau donne sa puissance au bout de $n$ mois.\na) Vérifier la valeur de la colonne $10$ par le calcul.\nb) À partir de quel mois dépasse-t-il $250$ W ?\nc) Un coéquipier dit : « À $+2$ % par mois, il faut $12{,}5$ mois pour gagner $25$ %. » Qu'en penser ?",
          figure: tableau(["mois", "10", "11", "12", "13"], ["puissance (W)", 243.8, 248.67, 253.65, 258.72]),
          correction:
            "a) $200 \\times 1{,}02^{10} \\approx 243{,}80$ W. ✔️\nb) Au mois $11$ : $248{,}67$ W, encore sous $250$. Au mois $12$ : $253{,}65$ W. Il dépasse $250$ W à partir du mois $12$.\nc) Le coéquipier divise : $25 \\div 2 = 12{,}5$. Mais les hausses se composent : $1{,}02^{12} \\approx 1{,}268$, soit environ $+26{,}8$ % en $12$ mois.\n⚠️ Et une progression de $2$ % par mois ne dure pas indéfiniment : le modèle ne vaut que quelques mois.",
          micros: ["expo_seuil_tableau"],
        },
        {
          titre: "Des amphibiens en danger",
          enonce:
            "Une espèce d'amphibiens décline dans une zone humide : sa population, en centaines d'individus, vaut $P(x) = 5 \\times 0{,}9^x$ au bout de $x$ années (modèle). Les biologistes jugent la situation critique sous $250$ individus : c'est la ligne en pointillés.\na) Lire au bout de combien d'années la population passe sous le seuil critique.\nb) Vérifier par le calcul avec $P(6)$ et $P(7)$.\nc) En déduire une valeur approchée de la « demi-vie » de cette population. Que devient-elle au bout de deux demi-vies ?",
          figure: repere([-1, 11, -1, 6], [{ pts: [[0, 5], [1, 4.5], [2, 4.05], [3, 3.65], [4, 3.28], [5, 2.95], [6, 2.66], [7, 2.39], [8, 2.15], [9, 1.94], [10, 1.74]] }], [], 2.5, true),
          correction:
            "a) $250$ individus, ce sont $2{,}5$ centaines. La courbe passe sous la ligne entre $x = 6$ et $x = 7$ : au bout de $7$ ans, la population est sous le seuil.\nb) $P(6) = 5 \\times 0{,}9^6 \\approx 2{,}66$ : encore au-dessus. $P(7) \\approx 2{,}39$ : en dessous. ✔️\nc) La population est divisée par $2$, de $500$ à $250$, en un peu plus de $6$ ans : sa demi-vie vaut environ $6{,}6$ ans. Au bout de deux demi-vies, environ $13$ ans, il en reste le quart : environ $125$ individus.\n⚠️ La population ne perd pas $10$ % de $500$, soit $50$ individus, chaque année : elle perd $10$ % de ce qui RESTE.",
          micros: ["expo_seuil_graphique", "expo_demi_vie"],
        },
        {
          titre: "Un plat oublié sur la table",
          enonce:
            "Hors du réfrigérateur, des bactéries doublent toutes les $20$ minutes dans un aliment (modèle). On part de $1\\,000$ bactéries.\na) Combien y en a-t-il au bout d'une heure ?\nb) Au bout de combien de temps dépassent-elles $1$ million ? Utiliser $2^{10} = 1\\,024$.\nc) Pourquoi ne faut-il pas laisser un plat plusieurs heures à température ambiante ?",
          correction:
            "a) Une heure, ce sont $3$ temps de doublement : $1\\,000 \\times 2^3 = 8\\,000$ bactéries.\nb) Pour passer de $1\\,000$ à $1$ million, il faut multiplier par $1\\,000$. Or $2^9 = 512$ ne suffit pas, et $2^{10} = 1\\,024$ suffit : il faut $10$ doublements.\n$10 \\times 20 = 200$ minutes, soit $3$ h $20$ min.\nc) En quelques heures, le nombre de bactéries est multiplié par des milliers : c'est la croissance exponentielle qui rend l'aliment dangereux.\n⚠️ Doubler $10$ fois, ce n'est pas multiplier par $20$ : c'est multiplier par $1\\,024$.",
          schema: ecranSeulement(tableau(["temps", "0", "1 h", "2 h", "3 h 20"], ["bactéries", "1 000", "8 000", "64 000", "1 024 000"])),
          micros: ["expo_demi_vie", "expo_seuil_calcul"],
        },
        {
          titre: "Jusqu'où descend la lumière ?",
          enonce:
            "Dans l'eau d'un lac, chaque mètre absorbe $20$ % de la lumière qui l'atteint (modèle) : à $n$ mètres, il reste $100 \\times 0{,}8^n$ % de la lumière de la surface. On considère ici que les algues ne peuvent plus vivre sous $1$ % de cette lumière.\na) Vérifier une valeur du tableau.\nb) À partir de quelle profondeur, en mètres entiers, passe-t-on sous $1$ % ?\nc) Dans une eau plus trouble, qui absorbe $30$ % par mètre, ce seuil serait-il plus ou moins profond ? Tester $n = 12$ et $n = 13$.",
          figure: tableau(["profondeur (m)", "19", "20", "21", "22"], ["lumière (%)", 1.44, 1.15, 0.92, 0.74]),
          correction:
            "a) $100 \\times 0{,}8^{20} \\approx 1{,}15$ %. ✔️\nb) À $20$ m : environ $1{,}15$ %, encore au-dessus de $1$ %. À $21$ m : environ $0{,}92$ %, en dessous. On passe sous $1$ % à partir de $21$ m.\nc) Avec $30$ % absorbés : $100 \\times 0{,}7^{12} \\approx 1{,}38$ % et $100 \\times 0{,}7^{13} \\approx 0{,}97$ %. Le seuil est atteint dès $13$ m : moins profond.\n⭐ Plus l'eau est trouble, plus la vie végétale reste près de la surface.",
          micros: ["expo_seuil_tableau"],
        },
        {
          titre: "Quand reprendre le médicament ?",
          enonce:
            "Un patient prend $100$ mg d'un médicament ; son organisme en élimine $30$ % par heure (modèle). La courbe donne la quantité restante, en dizaines de mg, au bout de $x$ heures. Le médecin prévoit une nouvelle prise quand il reste moins de $20$ mg : c'est la ligne en pointillés.\na) Lire au bout de combien de temps il faut reprendre le médicament.\nb) Vérifier en calculant la quantité restante au bout de $4$ h, puis de $5$ h.\nc) Pourquoi la courbe descend-elle de moins en moins vite ?",
          figure: repere([-1, 7, -1, 11], [{ pts: [[0, 10], [0.5, 8.37], [1, 7], [1.5, 5.86], [2, 4.9], [2.5, 4.1], [3, 3.43], [3.5, 2.87], [4, 2.4], [4.5, 2.01], [5, 1.68], [5.5, 1.41], [6, 1.18]] }], [], 2, true),
          correction:
            "a) $20$ mg, ce sont $2$ dizaines. La courbe passe sous la ligne pour $x \\approx 4{,}5$ : au bout d'environ $4$ h $30$.\nb) $100 \\times 0{,}7^4 = 24{,}01$ mg, encore au-dessus ; $100 \\times 0{,}7^5 \\approx 16{,}81$ mg, en dessous. ✔️ Le seuil est franchi entre $4$ h et $5$ h.\nc) Chaque heure, l'organisme élimine $30$ % de ce qui RESTE : $30$ mg la première heure, puis $21$ mg, puis $14{,}7$ mg… de moins en moins.",
          micros: ["expo_seuil_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "Trois chemins qui se contrôlent : la lecture graphique donne une estimation, le tableau et le calcul la confirment.",
        "La demi-vie ne dépend pas de la quantité de départ : de $100$ à $50$, ou de $50$ à $25$, c'est la même durée.",
        "On répond dans le contexte : une année, une date, un âge.",
      ],
      exercices: [
        {
          titre: "Dater avec le carbone 14",
          enonce:
            "Le carbone 14 est radioactif ; sa demi-vie est d'environ $5\\,730$ ans. Un être vivant en contient une proportion constante ; à sa mort, il n'est plus renouvelé et se désintègre. Les archéologues s'en servent pour dater des os, du bois, des tissus.\na) Un os contient $25$ % du carbone 14 d'un os actuel. Estimer son âge.\nb) Même question pour un charbon de bois qui en contient $12{,}5$ %.\nc) Au bout de combien de demi-vies entières reste-t-il moins de $1$ % du carbone 14 ? Combien d'années cela fait-il ?\nd) Pourquoi cette méthode ne permet-elle pas de dater des os de dinosaures ?",
          correction:
            "a) $100$ %, puis $50$ %, puis $25$ % : deux demi-vies. Âge : environ $2 \\times 5\\,730 = 11\\,460$ ans.\nb) $12{,}5$ % : trois demi-vies, soit environ $3 \\times 5\\,730 = 17\\,190$ ans.\nc) Après $k$ demi-vies, il reste $\\dfrac{100}{2^k}$ %. Avec $2^6 = 64$ : $1{,}5625$ %, encore au-dessus de $1$ %. Avec $2^7 = 128$ : environ $0{,}78$ %. Il faut $7$ demi-vies, soit $7 \\times 5\\,730 = 40\\,110$ ans.\nd) Les dinosaures ont disparu il y a environ $66$ millions d'années : plus de $11\\,000$ demi-vies. Il ne reste pratiquement plus de carbone 14 à mesurer.\n⭐ Au-delà de quelques dizaines de milliers d'années, il faut d'autres méthodes de datation.",
          schema: tableau(["demi-vies", "0", "1", "2", "3", "7"], ["carbone 14 (%)", 100, 50, 25, 12.5, 0.78]),
          micros: ["expo_demi_vie", "expo_seuil_calcul", "expo_seuil_tableau"],
        },
        {
          titre: "Un village et l'exode rural",
          enonce:
            "Un village compte $800$ habitants en 1950. Avec l'exode rural, il perd $3$ % de ses habitants chaque année (modèle). La courbe donne la population, en centaines, l'abscisse comptant les DÉCENNIES depuis 1950. Les lignes en pointillés marquent $400$ et $200$ habitants.\na) Exprimer la population $p_n$ en l'année $1950 + n$.\nb) Lire entre quelles dates la population passe sous $400$ habitants.\nc) Trouver l'année exacte en testant $n = 22$ et $n = 23$.\nd) Sans lire le graphique, prévoir vers quelle année la population passe sous $200$ habitants. Vérifier avec $n = 45$ et $n = 46$.",
          figure: repere([-1, 6, -1, 9], [{ pts: [[0, 8], [0.5, 6.87], [1, 5.9], [1.5, 5.07], [2, 4.35], [2.5, 3.74], [3, 3.21], [3.5, 2.75], [4, 2.37], [4.5, 2.03], [5, 1.74]] }], [], [4, 2]),
          correction:
            "a) $p_n = 800 \\times 0{,}97^n$.\nb) La courbe passe sous la hauteur $4$ entre les abscisses $2$ et $2{,}5$ : entre $20$ et $25$ ans après 1950, donc entre 1970 et 1975.\nc) $p_{22} \\approx 409{,}3$ et $p_{23} \\approx 397{,}0$ : la population passe sous $400$ habitants en $1950 + 23 = 1973$.\nd) La population a été divisée par $2$ en environ $23$ ans : c'est sa demi-vie. Pour passer de $400$ à $200$, il faut une nouvelle demi-vie : environ $46$ ans en tout, vers 1996.\n$p_{45} \\approx 203{,}2$ et $p_{46} \\approx 197{,}1$. ✔️ En 1996.\n⭐ La demi-vie ne dépend pas du point de départ : de $800$ à $400$, puis de $400$ à $200$, c'est la même durée.",
          micros: ["expo_seuil_graphique", "expo_seuil_calcul", "expo_demi_vie"],
        },
        {
          titre: "La règle de 72",
          enonce:
            "Les banquiers utilisent une « règle de $72$ » : un capital placé à $t$ % par an double en environ $\\dfrac{72}{t}$ années.\na) Un capital est placé à $4$ % par an. Au bout de combien d'années entières a-t-il doublé ? S'aider d'un tableau de valeurs de $1{,}04^n$.\nb) Même question à $6$ %, en testant $n = 11$ et $n = 12$.\nc) Comparer avec la règle de $72$.\nd) À $4$ %, au bout de combien d'années le capital est-il multiplié par $4$ ? Justifier sans calcul, puis vérifier.",
          correction:
            "a) $1{,}04^{17} \\approx 1{,}948$, sous $2$ ; $1{,}04^{18} \\approx 2{,}026$, au-dessus. Le capital a doublé au bout de $18$ ans.\nb) $1{,}06^{11} \\approx 1{,}898$ et $1{,}06^{12} \\approx 2{,}012$ : au bout de $12$ ans.\nc) La règle donne $\\dfrac{72}{4} = 18$ ans et $\\dfrac{72}{6} = 12$ ans : exactement nos résultats.\nd) Multiplier par $4$, c'est doubler deux fois : $2 \\times 18 = 36$ ans. En effet, $1{,}04^{36} = 1{,}04^{18} \\times 1{,}04^{18} \\approx 4{,}10$, alors que $1{,}04^{35} \\approx 3{,}95$.\n⚠️ La règle de $72$ est une approximation, pratique pour des taux de quelques pour cent.",
          schema: tableau(["années", "16", "17", "18"], ["1,04 puissance n", 1.873, 1.948, 2.026]),
          micros: ["expo_seuil_tableau", "expo_seuil_calcul", "expo_demi_vie"],
        },
        {
          titre: "Un glacier qui fond",
          enonce:
            "Un glacier des Alpes couvre $10$ km² en 2025. On suppose (modèle) que sa surface diminue de $2$ % par an. La courbe donne sa surface, en km² ; l'abscisse compte les DÉCENNIES depuis 2025. La ligne en pointillés marque la moitié.\na) Exprimer la surface $s_n$ en l'année $2025 + n$.\nb) Lire au bout de combien de temps le glacier a perdu la moitié de sa surface.\nc) Trouver l'année en testant $n = 34$ et $n = 35$.\nd) Quelle surface peut-on prévoir en 2095, sans nouveau calcul de puissance ? Vérifier.",
          figure: repere([-1, 5, -1, 11], [{ pts: [[0, 10], [0.5, 9.04], [1, 8.17], [1.5, 7.39], [2, 6.68], [2.5, 6.03], [3, 5.45], [3.5, 4.93], [4, 4.46]] }], [], 5, true),
          correction:
            "a) $s_n = 10 \\times 0{,}98^n$.\nb) La courbe passe sous la hauteur $5$ entre les abscisses $3$ et $3{,}5$ : entre $30$ et $35$ ans.\nc) $s_{34} \\approx 5{,}03$ km², encore au-dessus ; $s_{35} \\approx 4{,}93$ km², en dessous. C'est en $2025 + 35 = 2060$.\nd) 2095, c'est $70$ ans après 2025 : environ deux demi-vies de $35$ ans. Il resterait environ le quart : $2{,}5$ km².\n✔️ $s_{70} = 10 \\times 0{,}98^{70} \\approx 2{,}43$ km².\n⚠️ Dans le modèle, la surface ne s'annule jamais. En réalité, un glacier devenu trop petit peut disparaître : le modèle ne dit pas tout.",
          micros: ["expo_seuil_graphique", "expo_seuil_calcul", "expo_demi_vie"],
        },
      ],
    },
  ],
};
