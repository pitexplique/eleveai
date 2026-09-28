// ─── Fiche d'exercices : problème de seuil, croissance linéaire (1re, sans spé)
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonctions-affines.bank.ts`
// (micros lin_seuil_calcul, lin_seuil_tableau, lin_seuil_graphique) : le
// tableau « extrait d'un tableur » (11, 20) est la forme de l'exercice 2 des
// sujets de juin, d'après la banque.
//
// ⭐⭐ LE FIL : TROIS CHEMINS, UNE RÉPONSE. Le calcul (une inéquation), le
// tableau (le premier terme qui franchit), le graphique (le croisement avec
// l'HORIZONTALE du seuil, tracée en pointillés : 4, 6, 10, 12, 13, 16, 17,
// 20). Les problèmes (17 à 20) demandent plusieurs chemins et les confrontent.
// Pièges nommés : arrondir AU-DESSUS pour un rang (1, 9, 16), diviser par un
// négatif retourne l'inégalité (2, 6, 10, 18), répondre par le rang et non par
// la valeur (3), « au moins » et « plus de » quand le seuil tombe pile (8, 18,
// 19), les dizaines d'un axe (10, 16), partir de u₁ (12), 0,25 h n'est pas
// 25 min (14), une hausse de température n'est pas une température (15), le
// 1er mars est le rang 0 (18), un tableau qui avance de deux en deux (20).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes, dont la PHYSIQUE (rail qui
// se dilate, 15) et l'HISTOIRE-GÉO (rivière en crue et gestion du risque, 13),
// à côté de l'économie (cagnotte, jeune entreprise, deux entreprises), de
// l'écologie (CO₂ d'un territoire, ferme solaire), du sport (vélo, randonnée,
// ski) et de la nature (cigognes). Chiffres = MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-seuil.mjs`.
//
// Micro-compétences : lin_seuil_calcul (1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13,
// 14, 15, 16, 17, 18, 19, 20), lin_seuil_tableau (3, 7, 9, 11, 14, 15, 17, 18,
// 20), lin_seuil_graphique (4, 6, 10, 12, 13, 16, 17, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const GRIS = "#94a3b8";

export const exercicesLinSeuilPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-seuil",
  titre: "Problème de seuil : croissance linéaire",
  accroche:
    "Vingt exercices pour trouver à partir de quand une grandeur qui croît (ou décroît) de façon linéaire franchit un seuil : par le calcul, avec un tableau de valeurs, ou sur un graphique où le seuil est une horizontale. Un rappel de cours avant chaque niveau, une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une méthode par exercice : le calcul, le tableau ou le graphique.",
      rappel: [
        "Un problème de SEUIL : trouver à partir de quand une grandeur dépasse une valeur donnée, ou passe en dessous.",
        "Par le calcul : on résout une inéquation, comme $50 + 8n \\geq 120$. Pour une suite, $n$ est un ENTIER : on arrondit au-dessus.",
        "Avec un tableau de valeurs : on cherche la première valeur qui franchit le seuil.",
        "Sur un graphique : on trace l'horizontale du seuil, on repère où la courbe la croise, et on lit l'ABSCISSE.",
      ],
      exercices: [
        {
          enonce: "Une suite est définie par $u_n = 50 + 8n$. Déterminer le plus petit entier $n$ tel que $u_n \\geq 120$.",
          correction:
            "On résout $50 + 8n \\geq 120$ : $8n \\geq 70$, donc $n \\geq \\dfrac{70}{8} = 8{,}75$.\n$n$ est un entier : le plus petit qui convient est $n = 9$.\n✔️ $u_8 = 50 + 8 \\times 8 = 114$, encore sous $120$ ; $u_9 = 50 + 8 \\times 9 = 122$, au-dessus.\n⚠️ On arrondit AU-DESSUS : $n = 8$ ne suffit pas.\nSur le dessin (en dizaines), l'horizontale $12$ passe entre les points des rangs $8$ et $9$ : le premier point au-dessus est celui du rang $9$.",
          schema: repere([-1, 11, -1, 14], [{ q: [0, 0.8, 5], couleur: GRIS }], [
            { x: 8, y: 11.4, label: "" },
            { x: 9, y: 12.2, label: "" },
          ], 12, true),
          micros: ["lin_seuil_calcul"],
        },
        {
          enonce: "Une suite est définie par $u_n = 200 - 15n$. Déterminer le plus petit entier $n$ tel que $u_n < 100$.",
          correction:
            "$200 - 15n < 100$ donne $-15n < -100$, puis $n > \\dfrac{100}{15} \\approx 6{,}67$.\n⚠️ En divisant par $-15$, un nombre négatif, on change le sens de l'inégalité.\nLe plus petit entier est $n = 7$.\n✔️ $u_6 = 200 - 15 \\times 6 = 110$ et $u_7 = 200 - 15 \\times 7 = 95$.\nSur le dessin (en centaines), les termes descendent ; le point du rang $7$ est le premier sous l'horizontale $1$.",
          schema: repere([-1, 11, -1, 3], [{ q: [0, -0.15, 2], couleur: GRIS }], [
            { x: 6, y: 1.1, label: "" },
            { x: 7, y: 0.95, label: "" },
          ], 1, true),
          micros: ["lin_seuil_calcul"],
        },
        {
          enonce: "Le tableau donne les premiers termes d'une suite arithmétique. À partir de quel rang dépasse-t-elle $30$ ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5"], ["u(n)", 12, 19, 26, 33, 40, 47], true),
          correction:
            "On parcourt le tableau : $u_2 = 26$ est encore sous $30$, et $u_3 = 33$ le dépasse.\nLa suite dépasse $30$ à partir du rang $3$.\n⭐ La suite est croissante, de raison $7$ : une fois le seuil franchi, elle reste au-dessus.\n⚠️ On répond par le RANG, $3$, et non par la valeur $33$.",
          micros: ["lin_seuil_tableau"],
        },
        {
          enonce: "La droite représente $f(x) = 1{,}5x + 2$ ; l'horizontale en pointillés marque le seuil $8$. Lire pour quelles valeurs de $x$ on a $f(x) \\geq 8$, puis le vérifier par le calcul.",
          figure: repere([-1, 6, -1, 11], [{ q: [0, 1.5, 2] }], [], 8, true),
          correction:
            "La droite croise l'horizontale $y = 8$ au point d'abscisse $4$ ; à droite de ce point, elle est au-dessus.\nDonc $f(x) \\geq 8$ pour $x \\geq 4$.\n✔️ Calcul : $1{,}5x + 2 \\geq 8$ donne $1{,}5x \\geq 6$, donc $x \\geq \\dfrac{6}{1{,}5} = 4$.\n⭐ Sur un graphique, le seuil est une horizontale : on lit l'ABSCISSE du croisement.",
          micros: ["lin_seuil_graphique", "lin_seuil_calcul"],
        },
        {
          enonce: "Soit $f(x) = 3x + 5$. Résoudre $f(x) \\geq 20$.",
          correction:
            "$3x + 5 \\geq 20$ donne $3x \\geq 15$, donc $x \\geq 5$.\nIci, $x$ peut prendre toutes les valeurs, pas seulement des entiers : la réponse est « $x \\geq 5$ ».\n✔️ $f(5) = 3 \\times 5 + 5 = 20$ : le seuil est atteint exactement en $5$.\nSur le dessin (en dizaines), la droite rejoint l'horizontale $2$ en $x = 5$ et reste au-dessus ensuite.",
          schema: ecranSeulement(repere([-1, 7, -1, 3], [{ q: [0, 0.3, 0.5] }], [{ x: 5, y: 2, label: "" }], 2)),
          micros: ["lin_seuil_calcul"],
        },
        {
          enonce: "La droite représente $g(x) = -2x + 10$ ; l'horizontale en pointillés marque le seuil $3$. Pour quelles valeurs de $x$ a-t-on $g(x) < 3$ ? Lire, puis vérifier.",
          figure: repere([-1, 6, -1, 11], [{ q: [0, -2, 10] }], [], 3, true),
          correction:
            "La droite descend et croise l'horizontale $y = 3$ en $x = 3{,}5$. Après ce point, elle est en dessous.\nDonc $g(x) < 3$ pour $x > 3{,}5$.\n✔️ $-2x + 10 < 3$ donne $-2x < -7$, puis $x > 3{,}5$ : on divise par $-2$ et on change le sens.\n⚠️ La droite descend : la réponse est à DROITE du croisement, avec un signe $>$.",
          micros: ["lin_seuil_graphique", "lin_seuil_calcul"],
        },
        {
          enonce: "Le tableau donne les premiers termes d'une suite. À partir de quel rang passe-t-elle sous $50$ ?",
          figure: tableau(["n", "0", "1", "2", "3", "4", "5"], ["u(n)", 80, 72, 64, 56, 48, 40], true),
          correction:
            "$u_3 = 56$ est encore au-dessus de $50$ ; $u_4 = 48$ est en dessous.\nLa suite passe sous $50$ à partir du rang $4$.\n✔️ C'est une suite arithmétique de raison $-8$ : $u_n = 80 - 8n$, et $80 - 8 \\times 4 = 48$.",
          micros: ["lin_seuil_tableau"],
        },
        {
          enonce: "Une suite est définie par $u_n = 1\\,000 + 250n$. Déterminer le plus petit entier $n$ tel que $u_n \\geq 3\\,000$, puis le plus petit entier $n$ tel que $u_n > 3\\,000$.",
          correction:
            "$1\\,000 + 250n \\geq 3\\,000$ donne $250n \\geq 2\\,000$, donc $n \\geq 8$ : le plus petit entier est $n = 8$, car $u_8 = 1\\,000 + 250 \\times 8 = 3\\,000$ exactement.\nAvec une inégalité STRICTE, $u_n > 3\\,000$ : $n > 8$, et le plus petit entier est $n = 9$.\n⚠️ « Au moins » ($\\geq$) et « plus de » ($>$) ne donnent pas la même réponse quand le seuil tombe pile sur un terme. Le tableau le montre : $u_8$ vaut exactement $3\\,000$.",
          schema: ecranSeulement(tableau(["n", "7", "8", "9"], ["u(n)", "2 750", "3 000", "3 250"])),
          micros: ["lin_seuil_calcul"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire le seuil par une inégalité, le trouver, puis vérifier.",
      rappel: [
        "On traduit la phrase : « atteindre au moins » s'écrit $\\geq$, « dépasser » s'écrit $>$, « passer sous » s'écrit $<$.",
        "Pour une suite, on répond par un RANG entier, puis par l'année, le mois ou la semaine qu'il représente.",
        "On vérifie avec le terme d'avant (seuil pas encore franchi) et le terme trouvé (seuil franchi).",
      ],
      exercices: [
        {
          titre: "Une cagnotte pour un voyage",
          enonce:
            "Une association a $1\\,500$ € dans sa cagnotte et y ajoute $120$ € chaque mois. Il lui faut au moins $3\\,000$ € pour un voyage.\na) Modéliser la cagnotte par une suite $u_n$, avec $n$ en mois.\nb) Au bout de combien de mois l'objectif est-il atteint ? Répondre par le calcul, puis vérifier avec les termes voisins.",
          correction:
            "a) $u_n = 1\\,500 + 120n$.\nb) $1\\,500 + 120n \\geq 3\\,000$ donne $120n \\geq 1\\,500$, soit $n \\geq \\dfrac{1\\,500}{120} = 12{,}5$. Le plus petit entier est $n = 13$.\n✔️ $u_{12} = 1\\,500 + 120 \\times 12 = 2\\,940$ €, pas encore assez ; $u_{13} = 1\\,500 + 120 \\times 13 = 3\\,060$ €, objectif atteint.\nIl faudra $13$ mois pour réunir la somme.\n⚠️ $12{,}5$ mois n'a pas de sens ici : l'argent arrive une fois par mois, on arrondit au-dessus.",
          schema: ecranSeulement(tableau(["mois n", "11", "12", "13", "14"], ["cagnotte (€)", "2 820", "2 940", "3 060", "3 180"])),
          micros: ["lin_seuil_calcul", "lin_seuil_tableau"],
        },
        {
          titre: "Les émissions d'un territoire",
          enonce:
            "Les émissions de CO₂ d'une communauté de communes sont modélisées par $E(t) = 60 - 4t$, en milliers de tonnes, $t$ années après 2020 (chiffres d'un modèle). On fait un bilan chaque année, donc $t$ est un entier. Le dessin représente $E$ en dizaines de milliers de tonnes ; l'objectif, moins de $30\\,000$ tonnes, est en pointillés.\na) Lire à partir de quand l'objectif est atteint.\nb) Retrouver ce résultat par le calcul, puis donner l'année du premier bilan sous l'objectif.",
          figure: repere([-1, 13, -1, 7], [{ q: [0, -0.4, 6] }], [], 3, true),
          correction:
            "a) La droite croise l'horizontale en $t = 7{,}5$ ; à droite de ce point, elle est en dessous.\nb) $60 - 4t < 30$ donne $-4t < -30$, donc $t > 7{,}5$. Le premier entier est $t = 8$ : en 2028.\n✔️ $E(7) = 60 - 4 \\times 7 = 32$, encore au-dessus ; $E(8) = 60 - 4 \\times 8 = 28$, en dessous.\n« L'objectif serait atteint au bilan de 2028. »\n⚠️ Le dessin est en DIZAINES de milliers : $3$ sur l'axe, ce sont $30\\,000$ tonnes.",
          micros: ["lin_seuil_graphique", "lin_seuil_calcul"],
        },
        {
          titre: "Un club de randonnée",
          enonce:
            "Un club de randonnée comptait $340$ adhérents à sa création, et en gagne $25$ par an (chiffres d'un modèle). Le tableau, extrait d'un tableur, donne le nombre d'adhérents $u_n$ au bout de $n$ années.\na) Lire à partir de quelle année le club dépasse $500$ adhérents.\nb) Retrouver ce résultat par le calcul.",
          figure: tableau(["années n", "4", "5", "6", "7", "8"], ["adhérents", 440, 465, 490, 515, 540]),
          correction:
            "a) $u_6 = 490$ est encore sous $500$ ; $u_7 = 515$ le dépasse. C'est à partir de la $7$e année.\nb) $340 + 25n > 500$ donne $25n > 160$, soit $n > \\dfrac{160}{25} = 6{,}4$. Le plus petit entier est $n = 7$.\n⭐ Le tableau répond d'un coup d'œil ; le calcul marche même quand le tableau ne va pas assez loin.",
          micros: ["lin_seuil_tableau", "lin_seuil_calcul"],
        },
        {
          titre: "Une sortie longue à vélo",
          enonce:
            "Une cycliste prépare une randonnée de $100$ km. La première semaine, sa sortie longue fait $40$ km ; chaque semaine, elle ajoute $5$ km. On note $u_n$ la distance de la semaine $n$, avec $u_1 = 40$.\na) Exprimer $u_n$ en fonction de $n$.\nb) À partir de quelle semaine sa sortie atteint-elle $100$ km ?",
          correction:
            "a) La suite commence à $u_1$ : $u_n = 40 + 5(n - 1)$, soit $u_n = 5n + 35$.\nb) $5n + 35 \\geq 100$ donne $5n \\geq 65$, donc $n \\geq 13$ : à partir de la semaine $13$.\n✔️ $u_{13} = 5 \\times 13 + 35 = 100$ km exactement.\nSur le dessin (en dizaines de km), la droite qui porte les termes atteint l'horizontale du seuil au rang $13$.\n⚠️ On part de $u_1$ : de la semaine $1$ à la semaine $13$, il y a $12$ ajouts de $5$ km, et $40 + 12 \\times 5 = 100$.",
          schema: ecranSeulement(repere([-1, 14, -1, 11], [{ q: [0, 0.5, 3.5] }], [
            { x: 1, y: 4, label: "" },
            { x: 13, y: 10, label: "" },
          ], 10, true)),
          micros: ["lin_seuil_calcul", "lin_seuil_graphique"],
        },
        {
          titre: "Une rivière en crue",
          enonce:
            "Pendant une crue, la hauteur d'une rivière est modélisée par $H(t) = 0{,}15t + 1{,}2$, en mètres, $t$ heures après le début de l'alerte. La vigilance passe au niveau supérieur quand l'eau atteint $2{,}4$ m, en pointillés (chiffres d'un modèle).\na) Lire sur le dessin quand ce seuil est atteint.\nb) Le vérifier par le calcul.\nc) Les secours ont besoin de $3$ heures pour évacuer un camping. L'alerte a débuté à 6 h : à quelle heure, au plus tard, doivent-ils commencer ?",
          figure: repere([-1, 11, -1, 4], [{ q: [0, 0.15, 1.2] }], [], 2.4, true),
          correction:
            "a) La droite rejoint l'horizontale $2{,}4$ en $t = 8$.\nb) $0{,}15t + 1{,}2 \\geq 2{,}4$ donne $0{,}15t \\geq 1{,}2$, donc $t \\geq \\dfrac{1{,}2}{0{,}15} = 8$.\nc) Le seuil est atteint à $6 + 8 = 14$ h. Il faut commencer au plus tard $3$ heures avant : à $11$ h.\n⭐ En géographie, on étudie les risques : prévoir un seuil, c'est gagner du temps pour protéger les habitants.",
          micros: ["lin_seuil_graphique", "lin_seuil_calcul"],
        },
        {
          titre: "La réserve d'eau d'un randonneur",
          enonce:
            "Un randonneur part avec $3$ L d'eau et en boit $0{,}4$ L par heure. Il veut garder au moins $0{,}5$ L en réserve.\na) Modéliser la quantité d'eau $Q(t)$, en litres, après $t$ heures.\nb) Au bout de combien de temps passe-t-il sous la réserve ? Donner la réponse en heures et minutes.\nc) Vérifier avec un tableau de valeurs.",
          correction:
            "a) $Q(t) = 3 - 0{,}4t$.\nb) $3 - 0{,}4t < 0{,}5$ donne $-0{,}4t < -2{,}5$, donc $t > \\dfrac{2{,}5}{0{,}4} = 6{,}25$ h, soit $6$ h $15$ min.\n« Au-delà de $6$ h $15$ min de marche, il entame sa réserve. »\nc) Dans le tableau : $Q(6) = 0{,}6$ L, encore au-dessus ; $Q(7) = 0{,}2$ L, en dessous.\n⚠️ $0{,}25$ h, c'est un quart d'heure, $15$ minutes, et non $25$ minutes.",
          schema: ecranSeulement(tableau(["heures t", "5", "6", "6,25", "7"], ["eau (L)", 1, 0.6, 0.5, 0.2])),
          micros: ["lin_seuil_calcul", "lin_seuil_tableau"],
        },
        {
          titre: "Un rail qui se dilate",
          enonce:
            "En physique, un métal s'allonge quand il chauffe. On modélise l'allongement d'un rail d'acier de $30$ m par $A(t) = 0{,}36t$, en mm, où $t$ est la hausse de température en °C. Le joint laissé entre deux rails mesure $9$ mm.\na) Dresser un tableau de valeurs pour $t = 10$, $20$, $25$ et $30$.\nb) À partir de quelle hausse de température le rail comble-t-il le joint ?\nc) Le rail a été posé à $20$ °C. À quelle température du rail cela correspond-il ?",
          correction:
            "a) $A(10) = 3{,}6$ ; $A(20) = 7{,}2$ ; $A(25) = 0{,}36 \\times 25 = 9$ ; $A(30) = 10{,}8$.\nb) Le tableau montre que le seuil de $9$ mm est atteint pour $t = 25$. Par le calcul : $0{,}36t \\geq 9$ donne $t \\geq \\dfrac{9}{0{,}36} = 25$.\nc) $20 + 25 = 45$ : le rail comble le joint quand il atteint $45$ °C, ce qui peut arriver en plein soleil.\n⚠️ $25$ est une HAUSSE de température, pas une température : on l'ajoute aux $20$ °C de départ.",
          schema: tableau(["hausse t (°C)", "10", "20", "25", "30"], ["allongement (mm)", 3.6, 7.2, 9, 10.8]),
          micros: ["lin_seuil_tableau", "lin_seuil_calcul"],
        },
        {
          titre: "Une jeune entreprise",
          enonce:
            "Le chiffre d'affaires mensuel d'une jeune entreprise est modélisé par $C(n) = 12 + 2{,}5n$, en milliers d'euros, $n$ mois après sa création (chiffres d'un modèle). Elle pourra embaucher quand il atteindra $40\\,000$ € par mois. Le dessin représente $C$ en dizaines de milliers d'euros, avec le seuil en pointillés.\na) Lire sur le dessin le mois de l'embauche.\nb) Le retrouver par le calcul.",
          figure: repere([-1, 15, -1, 6], [{ q: [0, 0.25, 1.2] }], [], 4, true),
          correction:
            "a) La droite franchit l'horizontale $4$ entre $n = 11$ et $n = 12$ : on pourra embaucher le mois $12$.\nb) $12 + 2{,}5n \\geq 40$ donne $2{,}5n \\geq 28$, soit $n \\geq \\dfrac{28}{2{,}5} = 11{,}2$. Le plus petit entier est $n = 12$.\n✔️ $C(11) = 12 + 2{,}5 \\times 11 = 39{,}5$ et $C(12) = 12 + 2{,}5 \\times 12 = 42$.\n⚠️ Sur l'axe, $4$ signifie $40$ milliers d'euros, soit $40\\,000$ €.",
          micros: ["lin_seuil_graphique", "lin_seuil_calcul"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet : le calcul, le tableau et le graphique doivent dire la même chose.",
      rappel: [
        "Trois chemins pour un seuil : le calcul (une inéquation), le tableau (le premier terme qui franchit), le graphique (le croisement avec l'horizontale).",
        "On vérifie avec le terme d'avant et le terme trouvé.",
        "On conclut par une phrase : l'année, le mois ou le jour.",
      ],
      exercices: [
        {
          titre: "Une ferme solaire",
          enonce:
            "Une région compte $120$ MW de panneaux solaires installés en 2025 et en ajoute $35$ MW par an (chiffres d'un modèle). Son objectif : $400$ MW.\na) Modéliser la puissance installée par une suite $u_n$, $n$ années après 2025.\nb) Calculer $u_6$, $u_7$, $u_8$ et $u_9$, et lire dans ce tableau l'année où l'objectif est atteint.\nc) Retrouver le résultat par le calcul.\nd) Sur le dessin, où lit-on la réponse ?",
          correction:
            "a) $u_n = 120 + 35n$.\nb) $u_6 = 330$, $u_7 = 365$, $u_8 = 400$, $u_9 = 435$. L'objectif est atteint pour $n = 8$, en 2033.\nc) $120 + 35n \\geq 400$ donne $35n \\geq 280$, donc $n \\geq 8$. ✔️\nd) Sur le dessin (en centaines de MW), le point du rang $8$ est pile sur l'horizontale du seuil.\n« La région atteindrait son objectif de $400$ MW en 2033. »\n⭐ Le tableau, le calcul et le dessin donnent la même réponse : c'est la meilleure des vérifications.",
          schema: repere([-1, 11, -1, 5], [], [
            { x: 0, y: 1.2, label: "" },
            { x: 1, y: 1.55, label: "" },
            { x: 2, y: 1.9, label: "" },
            { x: 3, y: 2.25, label: "" },
            { x: 4, y: 2.6, label: "" },
            { x: 5, y: 2.95, label: "" },
            { x: 6, y: 3.3, label: "" },
            { x: 7, y: 3.65, label: "" },
            { x: 8, y: 4, label: "" },
            { x: 9, y: 4.35, label: "" },
            { x: 10, y: 4.7, label: "" },
          ], 4, true),
          micros: ["lin_seuil_calcul", "lin_seuil_tableau", "lin_seuil_graphique"],
        },
        {
          titre: "La neige d'une station de ski",
          enonce:
            "Au 1er mars, une piste de ski a $150$ cm de neige, et elle en perd $4$ cm par jour (chiffres d'un modèle). La piste ferme quand il reste moins de $50$ cm.\na) Modéliser l'épaisseur $u_n$, $n$ jours après le 1er mars.\nb) Déterminer par le calcul le jour de fermeture.\nc) Vérifier avec les valeurs de $u_{24}$, $u_{25}$ et $u_{26}$.",
          correction:
            "a) $u_n = 150 - 4n$.\nb) $150 - 4n < 50$ donne $-4n < -100$, donc $n > 25$. Le plus petit entier est $n = 26$ : $26$ jours après le 1er mars, c'est le 27 mars.\nc) $u_{24} = 54$, $u_{25} = 50$ et $u_{26} = 46$. Le 26 mars ($n = 25$), il reste exactement $50$ cm : la piste reste ouverte. Elle ferme le 27 mars.\n⚠️ « Moins de $50$ » est une inégalité STRICTE : à $50$ cm pile, on skie encore.\n⚠️ $n = 26$ n'est pas le 26 mars : le 1er mars est le rang $0$.",
          schema: ecranSeulement(tableau(["jours n", "24", "25", "26"], ["neige (cm)", 54, 50, 46])),
          micros: ["lin_seuil_calcul", "lin_seuil_tableau"],
        },
        {
          titre: "Deux entreprises",
          enonce:
            "Une entreprise A compte $25$ salariés et en embauche $3$ par an ; une entreprise B en compte $60$ et en perd $2$ par an (chiffres d'un modèle). On note $n$ le nombre d'années.\na) Exprimer les effectifs $a_n$ et $b_n$.\nb) À partir de quelle année A a-t-elle plus de salariés que B ? Répondre par le calcul.\nc) Le lire sur le dessin.",
          correction:
            "a) $a_n = 25 + 3n$ et $b_n = 60 - 2n$.\nb) $25 + 3n > 60 - 2n$ donne $5n > 35$, donc $n > 7$. Le plus petit entier est $n = 8$.\n✔️ $a_7 = 25 + 3 \\times 7 = 46$ et $b_7 = 60 - 2 \\times 7 = 46$ : égalité, pas encore de dépassement. $a_8 = 49$ et $b_8 = 44$ : A est devant.\nc) Sur le dessin (en dizaines de salariés), les droites se croisent au rang $7$ ; à partir du rang $8$, la bleue, celle de A, est au-dessus.\n⚠️ Au rang $7$, les effectifs sont ÉGAUX : « plus que » demande le rang suivant.",
          schema: repere([-1, 11, -1, 7], [{ q: [0, 0.3, 2.5] }, { q: [0, -0.2, 6], couleur: ORANGE }], [{ x: 7, y: 4.6, label: "" }], undefined, true),
          micros: ["lin_seuil_calcul", "lin_seuil_graphique"],
        },
        {
          titre: "Des cigognes de retour",
          enonce:
            "Dans une réserve naturelle, on comptait $40$ couples de cigognes en 2015. Le tableau, extrait d'un tableur, donne le nombre de couples tous les deux ans (chiffres d'un modèle).\na) Montrer que l'on gagne toujours le même nombre de couples chaque année. Lequel ?\nb) Modéliser par une suite $u_n$, $n$ années après 2015.\nc) En quelle année la réserve comptera-t-elle au moins $100$ couples ?",
          figure: tableau(["année", "2015", "2017", "2019", "2021", "2023"], ["couples", 40, 52, 64, 76, 88]),
          correction:
            "a) Tous les deux ans, on gagne $52 - 40 = 12$ couples, et de même ensuite : $64 - 52 = 76 - 64 = 88 - 76 = 12$. Soit $\\dfrac{12}{2} = 6$ couples par an.\nb) $u_n = 40 + 6n$.\nc) $40 + 6n \\geq 100$ donne $6n \\geq 60$, donc $n \\geq 10$ : en 2025.\n✔️ $u_{10} = 40 + 6 \\times 10 = 100$.\nSur le dessin (en dizaines de couples), la droite qui porte les termes atteint l'horizontale $10$ au rang $10$.\n⚠️ Le tableau avance de deux ans en deux ans : l'écart de $12$ couples vaut pour DEUX années.",
          schema: ecranSeulement(repere([-1, 13, -1, 12], [{ q: [0, 0.6, 4] }], [{ x: 10, y: 10, label: "" }], 10, true)),
          micros: ["lin_seuil_calcul", "lin_seuil_tableau", "lin_seuil_graphique"],
        },
      ],
    },
  ],
};
