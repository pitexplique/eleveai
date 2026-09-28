// ─── Fiche d'exercices : le taux d'évolution moyen (1re, sans spé) ───────────
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), cinquième feuille. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts`
// (notion expo_taux_moyen) et `evolutions.bank.ts`.
//
// ⛔ LE PROGRAMME : « taux d'évolution moyen correspondant à n évolutions
// successives » — le coefficient moyen c = C^(1/n), où C est le coefficient
// global. Calculatrice autorisée. La feuille voisine des automatismes
// (`maths-premiere-auto-taux-evolution.tsx`) fait les taux globaux et
// réciproques ; celle-ci ne la répète pas : tout y tourne autour de C^(1/n).
//
// ⭐⭐ LE FIL : LE TAUX MOYEN N'EST NI LE TAUX GLOBAL DIVISÉ PAR n, NI LA
// MOYENNE DES TAUX. Les pièges nommés : 44 % en deux ans lus 22 % par an (3),
// 4 × 5 % lus 20 % (4), +20 % puis −20 % lus « taux moyen nul » (5), la
// moyenne des taux (14, 19), le taux global divisé par n (8, 10, 16), les
// périodes comptées sur les barres au lieu des passages (9), et « il reste
// 35 % à faire » (13).
//
// ⭐ Contextes : économie (chiffre d'affaires 9, inflation 15, placements
// 19), physique (filtres 10, four de potier 18), histoire-géo (population
// mondiale 11, métropoles 17), sport (10 km 12, vidéo d'un but 20), écologie
// (émissions 13), nature (castors 14), santé (médicament 16). Chiffres =
// MODÈLES, sauf les faits réels de l'exercice 11 : la population mondiale
// d'environ 1 milliard vers 1800, 2 milliards vers 1927, 8 milliards en
// 2022, et un taux annuel d'environ 2 % dans les années 1960.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-taux-moyen.mjs`.
//
// Micro-compétences : expo_taux_moyen_sens (3, 5, 8, 10, 14, 18, 19),
// expo_taux_moyen_calculer (1, 2, 3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
// 18, 19, 20), expo_taux_moyen_global (4, 5, 7, 9, 14, 15, 17, 19, 20),
// expo_taux_moyen_interpreter (7, 9, 11, 12, 13, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoTauxMoyenPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-taux-moyen",
  titre: "Le taux d'évolution moyen",
  accroche:
    "Vingt exercices sur le taux d'évolution moyen : le trouver à partir d'une évolution globale, repasser du taux moyen au taux global, et comprendre ce qu'il dit — et ce qu'il ne dit pas. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec ses diagrammes et ses tableaux.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Calculatrice autorisée.",
      rappel: [
        "Le taux moyen sur $n$ périodes est le taux CONSTANT qui, appliqué $n$ fois, donne la même évolution globale.",
        "Si $C$ est le coefficient global, le coefficient moyen est $c = C^{\\frac{1}{n}}$, et le taux moyen est $c - 1$.",
        "Dans l'autre sens : un taux moyen $t$ sur $n$ périodes donne le coefficient global $(1 + t)^n$.",
        "⚠️ Le taux moyen n'est pas le taux global divisé par $n$.",
      ],
      exercices: [
        {
          enonce: "Sur deux ans, un prix a été multiplié par $1{,}21$. Quel est le coefficient multiplicateur moyen par an ? le taux moyen ?",
          correction:
            "On cherche $c$ tel que $c^2 = 1{,}21$ : $c = 1{,}21^{\\frac{1}{2}} = \\sqrt{1{,}21} = 1{,}1$.\nTaux moyen : $1{,}1 - 1 = 0{,}1$, soit $+10$ % par an.\n✔️ $1{,}1 \\times 1{,}1 = 1{,}21$.\n⭐ Deux hausses de $10$ % font $+21$ % : le taux moyen, lui, retrouve les $10$ %.",
          micros: ["expo_taux_moyen_calculer"],
        },
        {
          enonce: "Sur trois ans, une quantité a été multipliée par $8$. Quel est le taux d'évolution moyen annuel ?",
          correction:
            "$c^3 = 8$, donc $c = 8^{\\frac{1}{3}} = 2$, car $2^3 = 8$.\nTaux moyen : $2 - 1 = 1$, soit $+100$ % par an : la quantité double, en moyenne, chaque année.\n⚠️ Pas « multipliée par $\\dfrac{8}{3}$ chaque année » : $\\left(\\dfrac{8}{3}\\right)^3$ ferait bien plus que $8$.\nSur le tableau, avec $1$ au départ : $\\times 2$ chaque année donne bien $8$.",
          schema: ecranSeulement(tableau(["année", "0", "1", "2", "3"], ["quantité", 1, 2, 4, 8])),
          micros: ["expo_taux_moyen_calculer"],
        },
        {
          enonce: "Une population a augmenté de $44$ % en deux ans. Un élève affirme : « C'est $+22$ % par an en moyenne. » Vérifier.",
          correction:
            "Avec $+22$ % deux fois : $1{,}22 \\times 1{,}22 = 1{,}4884$, soit $+48{,}84$ %, et non $+44$ %.\nLe bon coefficient moyen : $c^2 = 1{,}44$, donc $c = \\sqrt{1{,}44} = 1{,}2$, soit $+20$ % par an.\n⭐ Pour des hausses, le taux moyen est toujours un peu plus PETIT que le taux global divisé par $n$ : les hausses se composent.",
          micros: ["expo_taux_moyen_sens", "expo_taux_moyen_calculer"],
        },
        {
          enonce: "Une quantité augmente en moyenne de $5$ % par an pendant $4$ ans. Quel est le taux d'évolution global ?",
          correction:
            "Le coefficient moyen est $1{,}05$. Sur $4$ ans : $1{,}05^4 = 1{,}21550625$.\nTaux global : environ $+21{,}55$ %.\n⚠️ Pas $+20$ % ($4 \\times 5$) : chaque hausse porte sur une quantité déjà augmentée.",
          schema: ecranSeulement(diagramme("barres", [{ label: "départ", value: 100 }, { label: "an 1", value: 105 }, { label: "an 2", value: 110.25 }, { label: "an 3", value: 115.76 }, { label: "an 4", value: 121.55 }])),
          micros: ["expo_taux_moyen_global"],
        },
        {
          enonce: "Un prix augmente de $20$ %, puis baisse de $20$ %. Le taux moyen est-il nul ? Le calculer au centième de %.",
          correction:
            "Coefficient global : $1{,}2 \\times 0{,}8 = 0{,}96$ : une baisse de $4$ % au total.\nCoefficient moyen : $c = \\sqrt{0{,}96} \\approx 0{,}9798$, soit un taux moyen d'environ $-2{,}02$ % par période.\n⚠️ La moyenne des taux, $\\dfrac{20 + (-20)}{2} = 0$, fait croire que rien n'a changé. Le taux moyen dit la vérité : l'ensemble est une baisse.",
          micros: ["expo_taux_moyen_sens", "expo_taux_moyen_global"],
        },
        {
          enonce: "La valeur d'un objet a été multipliée par $0{,}64$ en deux ans. Quel est le taux d'évolution moyen annuel ?",
          correction:
            "$c^2 = 0{,}64$, donc $c = \\sqrt{0{,}64} = 0{,}8$.\nTaux moyen : $0{,}8 - 1 = -0{,}2$, soit $-20$ % par an.\n⭐ Pour une baisse, le coefficient moyen est entre $0$ et $1$, et le taux moyen est négatif.",
          micros: ["expo_taux_moyen_calculer"],
        },
        {
          enonce: "Le taux d'évolution moyen d'une population est de $+2$ % par an sur $10$ ans.\na) A-t-elle forcément augmenté de $2$ % chaque année ?\nb) Quelle est son évolution globale sur les $10$ ans ?",
          correction:
            "a) Non : le taux moyen résume l'ensemble. Certaines années ont pu monter de $5$ %, d'autres baisser.\nb) Coefficient global : $1{,}02^{10} \\approx 1{,}219$, soit environ $+21{,}9$ %.\n⚠️ Pas $+20$ % : les hausses se composent, elles ne s'additionnent pas.",
          schema: ecranSeulement(tableau(["année", "0", "5", "10"], ["population (base 100)", 100, 110.41, 121.9])),
          micros: ["expo_taux_moyen_interpreter", "expo_taux_moyen_global"],
        },
        {
          enonce: "En $5$ ans, le prix d'un produit a augmenté de $30$ %. Calculer le taux moyen annuel au centième de %. Est-ce $6$ % ?",
          correction:
            "Coefficient global : $1{,}3$. Coefficient moyen : $c = 1{,}3^{\\frac{1}{5}} \\approx 1{,}0539$ (à la calculatrice, $1{,}3$ puissance $0{,}2$).\nTaux moyen : environ $+5{,}39$ % par an, et non $6$ %.\n✔️ $1{,}0539^5 \\approx 1{,}30$.\nSur le tableau, au taux moyen de $5{,}39$ % chaque année, on arrive bien à $130$.",
          schema: ecranSeulement(tableau(["année", "0", "1", "2", "3", "4", "5"], ["prix (base 100)", 100, 105.39, 111.07, 117.05, 123.36, 130], true)),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_sens"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Trouver le coefficient global, compter les périodes, calculer le taux moyen, conclure.",
      rappel: [
        "Coefficient global : $C = \\dfrac{\\text{valeur finale}}{\\text{valeur initiale}}$, ou le produit des coefficients de chaque période.",
        "On compte les PASSAGES : de 2020 à 2023, il y a $3$ périodes, pas $4$.",
        "Coefficient moyen $c = C^{\\frac{1}{n}}$ à la calculatrice ; taux moyen $c - 1$, en %.",
        "Le taux moyen décrit un rythme régulier équivalent, pas ce qui s'est passé chaque année.",
      ],
      exercices: [
        {
          titre: "Le chiffre d'affaires",
          enonce:
            "Le diagramme donne le chiffre d'affaires d'une petite entreprise, en milliers d'euros (modèle).\na) Calculer le taux d'évolution de chaque année.\nb) Calculer le coefficient global de 2020 à 2023, puis le taux moyen annuel.\nc) Une seule année a connu exactement ce taux moyen. Laquelle ? Le taux moyen dit-il ce qui s'est passé chaque année ?",
          figure: diagramme("barres", [
            { label: "2020", value: 200 },
            { label: "2021", value: 250 },
            { label: "2022", value: 242 },
            { label: "2023", value: 266.2 },
          ]),
          correction:
            "a) 2020 → 2021 : $\\dfrac{250}{200} = 1{,}25$, soit $+25$ %. 2021 → 2022 : $\\dfrac{242}{250} = 0{,}968$, soit $-3{,}2$ %. 2022 → 2023 : $\\dfrac{266{,}2}{242} = 1{,}1$, soit $+10$ %.\nb) $C = \\dfrac{266{,}2}{200} = 1{,}331$, sur $3$ ans : on compte les passages, pas les barres.\n$c = 1{,}331^{\\frac{1}{3}} = 1{,}1$, car $1{,}1^3 = 1{,}331$. Taux moyen : $+10$ % par an.\nc) Seul le passage 2022 → 2023 a connu $+10$ %. Les autres : $+25$ % et $-3{,}2$ %.\n⭐ Le taux moyen est le taux RÉGULIER qui mènerait au même résultat. Il lisse les à-coups.",
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_global", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "Quatre filtres",
          enonce:
            "Une lumière traverse $4$ filtres identiques. Le diagramme donne son intensité, en %, avant et après les filtres (modèle).\na) Calculer le coefficient global.\nb) En déduire le coefficient d'un seul filtre. Quel pourcentage de la lumière chaque filtre absorbe-t-il ?\nc) Un élève dit : « $59{,}04$ % absorbés en $4$ filtres, donc $14{,}76$ % par filtre. » Qu'en penser ?",
          figure: diagramme("barres", [
            { label: "sans filtre", value: 100 },
            { label: "4 filtres", value: 40.96 },
          ]),
          correction:
            "a) $C = \\dfrac{40{,}96}{100} = 0{,}4096$.\nb) $c^4 = 0{,}4096$, donc $c = 0{,}4096^{\\frac{1}{4}} = 0{,}8$, car $0{,}8^4 = 0{,}4096$.\nChaque filtre laisse passer $80$ % de la lumière : il en absorbe $20$ %.\nc) L'élève divise le taux global par $4$ : $59{,}04 \\div 4 = 14{,}76$. Avec $-14{,}76$ % quatre fois, il resterait $0{,}8524^4 \\approx 0{,}528$, soit environ $52{,}8$ % de la lumière, et non $40{,}96$ %.\n⚠️ Chaque filtre absorbe $20$ % de ce qui lui ARRIVE, pas de la lumière de départ.",
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_sens"],
        },
        {
          titre: "La population mondiale",
          enonce:
            "La population mondiale a atteint environ $1$ milliard d'habitants vers 1800, $2$ milliards vers 1927, et $8$ milliards en 2022.\na) Calculer le taux d'évolution moyen annuel de 1800 à 1927, au centième de %.\nb) Même question de 1927 à 2022.\nc) Que disent ces deux taux de l'histoire de la population mondiale ?",
          correction:
            "a) Coefficient global $2$ en $1927 - 1800 = 127$ ans. $c = 2^{\\frac{1}{127}} \\approx 1{,}00547$ : environ $+0{,}55$ % par an.\nb) Coefficient global $\\dfrac{8}{2} = 4$ en $2022 - 1927 = 95$ ans. $c = 4^{\\frac{1}{95}} \\approx 1{,}0147$ : environ $+1{,}47$ % par an.\nc) Le taux moyen a presque triplé : la croissance s'est fortement accélérée au XXe siècle, avec la baisse de la mortalité.\n⭐ De $1$ à $2$ milliards : $127$ ans. De $2$ à $8$ milliards : $95$ ans seulement.\n⚠️ Ces taux moyens lissent de fortes variations : le taux annuel a atteint environ $2$ % dans les années 1960, puis il a baissé.",
          schema: diagramme("barres", [
            { label: "1800", value: 1 },
            { label: "1927", value: 2 },
            { label: "2022", value: 8 },
          ]),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "Le 10 km d'une coureuse",
          enonce:
            "Le tableau donne le temps d'une coureuse sur $10$ km, une fois par an.\na) Calculer le taux d'évolution de chaque année, au centième de %.\nb) Calculer le taux d'évolution moyen annuel entre 2023 et 2025.\nc) Si elle garde ce taux moyen, quel temps peut-elle espérer en 2026 ? Est-ce réaliste longtemps ?",
          figure: tableau(["année", "2023", "2024", "2025"], ["temps (min)", 50, 44, 40.5]),
          correction:
            "a) $\\dfrac{44}{50} = 0{,}88$ : $-12$ %. $\\dfrac{40{,}5}{44} \\approx 0{,}9205$ : environ $-7{,}95$ %.\nb) $C = \\dfrac{40{,}5}{50} = 0{,}81$, sur $2$ ans. $c = \\sqrt{0{,}81} = 0{,}9$ : $-10$ % par an en moyenne.\nc) $40{,}5 \\times 0{,}9 = 36{,}45$ minutes. Mais on ne peut pas progresser de $10$ % par an indéfiniment : le modèle ne vaut que sur une courte période.\n⭐ Ni $-12$ %, ni $-7{,}95$ % : le taux moyen, $-10$ %, est le rythme régulier qui mène au même temps final.",
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "Réduire les émissions",
          enonce:
            "Une ville a réduit ses émissions de gaz à effet de serre de $20$ % en $5$ ans. Elle vise maintenant une baisse totale de $55$ % en $10$ ans, par rapport au départ (modèle).\na) Quel a été le taux moyen annuel sur les $5$ premières années, au centième de % ?\nb) Pour atteindre $-55$ % en $10$ ans, quel taux moyen faudra-t-il sur les $5$ années suivantes ?\nc) Comparer les deux rythmes.",
          correction:
            "a) Coefficient global $0{,}8$ en $5$ ans. $c = 0{,}8^{\\frac{1}{5}} \\approx 0{,}9564$ : environ $-4{,}36$ % par an.\nb) En tout, il faut multiplier par $1 - 0{,}55 = 0{,}45$. Il reste à multiplier par $\\dfrac{0{,}45}{0{,}8} = 0{,}5625$ en $5$ ans.\n$c = 0{,}5625^{\\frac{1}{5}} \\approx 0{,}8913$ : environ $-10{,}87$ % par an.\nc) Il faudra baisser environ $2{,}5$ fois plus vite chaque année : un effort bien plus grand.\n⚠️ Il ne reste pas « $55 - 20 = 35$ % à faire » : les baisses se multiplient, et elles partent d'émissions déjà réduites.",
          schema: diagramme("barres", [
            { label: "départ", value: 100 },
            { label: "5 ans", value: 80 },
            { label: "10 ans", value: 45 },
          ]),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "Le retour des castors",
          enonce:
            "On a réintroduit des castors le long d'une rivière. Le graphique donne leur nombre, en dizaines, chaque année (modèle).\na) Lire le nombre de castors au départ et au bout de $4$ ans. Calculer le coefficient global.\nb) Calculer le taux d'évolution moyen annuel, au dixième de %.\nc) Calculer les quatre taux annuels, puis leur moyenne. Est-ce le taux moyen ?",
          figure: repere([-1, 5, -1, 6], [], [
            { x: 0, y: 2 },
            { x: 1, y: 2.6 },
            { x: 2, y: 3 },
            { x: 3, y: 3.8 },
            { x: 4, y: 4.5 },
          ]),
          correction:
            "a) $20$ castors au départ, $45$ au bout de $4$ ans. $C = \\dfrac{45}{20} = 2{,}25$.\nb) $c = 2{,}25^{\\frac{1}{4}} \\approx 1{,}2247$ : environ $+22{,}5$ % par an.\nc) $\\dfrac{26}{20} = 1{,}3$, soit $+30$ % ; $\\dfrac{30}{26} \\approx 1{,}1538$, soit environ $+15{,}4$ % ; $\\dfrac{38}{30} \\approx 1{,}2667$, soit environ $+26{,}7$ % ; $\\dfrac{45}{38} \\approx 1{,}1842$, soit environ $+18{,}4$ %.\nLeur moyenne vaut environ $22{,}6$ % : proche du taux moyen, $22{,}5$ %, mais différente.\n⚠️ Le taux moyen n'est PAS la moyenne des taux : c'est le taux constant qui mène au même résultat.\n⭐ Astuce : $2{,}25 = 1{,}5^2$, donc $c = \\sqrt{1{,}5}$.",
          micros: ["expo_taux_moyen_sens", "expo_taux_moyen_calculer", "expo_taux_moyen_global"],
        },
        {
          titre: "Quatre ans d'inflation",
          enonce:
            "Le tableau donne la hausse des prix (l'inflation) dans un pays, quatre années de suite (modèle).\na) Calculer le coefficient global et le taux global sur les $4$ ans.\nb) En déduire le taux moyen annuel, au centième de %.\nc) Un panier de courses coûtait $100$ € au début. Combien coûte-t-il à la fin ?",
          figure: tableau(["année", "1", "2", "3", "4"], ["inflation (%)", 2, 5, 6, 3]),
          correction:
            "a) $C = 1{,}02 \\times 1{,}05 \\times 1{,}06 \\times 1{,}03 \\approx 1{,}1693$ : environ $+16{,}93$ % en quatre ans.\nb) $c = 1{,}1693^{\\frac{1}{4}} \\approx 1{,}0399$ : environ $+3{,}99$ % par an.\nc) $100 \\times 1{,}1693 \\approx 116{,}93$ €.\n⭐ Ici, la moyenne des taux, $4$ %, est proche du taux moyen, car les taux sont petits et proches. Ce n'est pourtant pas la même chose.\n⚠️ Pas $2 + 5 + 6 + 3 = 16$ % : les hausses se composent.",
          micros: ["expo_taux_moyen_global", "expo_taux_moyen_calculer"],
        },
        {
          titre: "Un médicament éliminé",
          enonce:
            "La concentration d'un médicament dans le sang est divisée par $4$ en $6$ heures (modèle).\na) Quel est le coefficient global ? le coefficient moyen par heure, au millième ?\nb) Quel pourcentage du médicament l'organisme élimine-t-il, en moyenne, chaque heure ?\nc) Une infirmière dit : « divisée par $4$ en $6$ heures, c'est $-12{,}5$ % par heure ». Qu'en penser ?",
          correction:
            "a) Diviser par $4$, c'est multiplier par $0{,}25$ : $C = 0{,}25$. $c = 0{,}25^{\\frac{1}{6}} \\approx 0{,}794$.\nb) $1 - 0{,}794 = 0{,}206$ : environ $20{,}6$ % éliminés chaque heure, en moyenne.\nc) $-12{,}5$ %, c'est $\\dfrac{75}{6}$ : le taux global divisé par $6$. Avec $0{,}875^6 \\approx 0{,}449$, il resterait environ $45$ % du médicament au bout de $6$ heures, et non $25$ %.\n⭐ Au bout de $3$ heures, il en reste la moitié : $0{,}25^{\\frac{1}{2}} = 0{,}5$.",
          schema: ecranSeulement(tableau(["heures", "0", "3", "6"], ["concentration (%)", 100, 50, 25])),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "On lit les valeurs de départ et d'arrivée, on compte les périodes, on calcule $C$ puis $c = C^{\\frac{1}{n}}$.",
        "Le taux moyen décrit un rythme régulier équivalent, pas ce qui s'est passé à chaque période.",
        "Pour comparer deux évolutions, on compare leurs taux moyens ; pour comparer des gains, leurs différences.",
      ],
      exercices: [
        {
          titre: "Deux métropoles",
          enonce:
            "Deux métropoles (modèles) : la ville $A$ passe de $1$ à $5$ millions d'habitants entre 1960 et 2020 ; la ville $B$, de $6$ à $12$ millions sur la même période.\na) Calculer le coefficient global de chaque ville.\nb) Calculer leurs taux d'évolution moyens annuels, au centième de %.\nc) Laquelle a grandi le plus vite ? Laquelle a gagné le plus d'habitants ?\nd) Au rythme moyen de $A$, en combien d'années environ sa population double-t-elle ? Tester des valeurs.",
          correction:
            "a) $A$ : $\\dfrac{5}{1} = 5$. $B$ : $\\dfrac{12}{6} = 2$. Les deux sur $60$ ans.\nb) $A$ : $c = 5^{\\frac{1}{60}} \\approx 1{,}02719$, soit environ $+2{,}72$ % par an. $B$ : $c = 2^{\\frac{1}{60}} \\approx 1{,}01162$, soit environ $+1{,}16$ % par an.\nc) $A$ a grandi le plus vite : son taux moyen est plus du double de celui de $B$. Mais $B$ a gagné le plus d'habitants : $6$ millions, contre $4$ pour $A$.\n⭐ Deux questions, deux outils : le taux moyen mesure la VITESSE, la différence mesure le GAIN.\nd) $1{,}02719^{25} \\approx 1{,}96$ et $1{,}02719^{26} \\approx 2{,}01$ : la population de $A$ double en environ $26$ ans.",
          schema: diagramme("barres", [
            { label: "A 1960", value: 1 },
            { label: "A 2020", value: 5 },
            { label: "B 1960", value: 6 },
            { label: "B 2020", value: 12 },
          ]),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter", "expo_taux_moyen_global"],
        },
        {
          titre: "Le four du potier",
          enonce:
            "Un four de potier est éteint. L'écart entre sa température et celle de l'atelier passe de $200$ °C à $50$ °C en $2$ heures ; on suppose que cet écart baisse à un taux constant (modèle).\na) Quel est le coefficient global ? le coefficient moyen par heure ?\nb) Quel est le coefficient moyen par demi-heure ? En déduire l'écart au bout de $30$ minutes, puis d'une heure et demie (au dixième).\nc) Par quart d'heure, quel pourcentage de l'écart disparaît en moyenne ?",
          correction:
            "a) $C = \\dfrac{50}{200} = 0{,}25$. En $2$ heures : $c = \\sqrt{0{,}25} = 0{,}5$ par heure. L'écart est divisé par $2$ chaque heure.\nb) Il y a $4$ demi-heures en $2$ heures : $c = 0{,}25^{\\frac{1}{4}} = \\sqrt{0{,}5} \\approx 0{,}7071$.\nAu bout de $30$ minutes : $200 \\times 0{,}7071 \\approx 141{,}4$ °C. Au bout d'une heure et demie : $100 \\times 0{,}7071 \\approx 70{,}7$ °C.\nc) Il y a $8$ quarts d'heure : $c = 0{,}25^{\\frac{1}{8}} \\approx 0{,}8409$. Environ $15{,}9$ % de l'écart disparaît chaque quart d'heure.\n⚠️ En une demi-heure, l'écart ne perd pas $25$ %, la moitié des $50$ % d'une heure : il en perd environ $29{,}3$ %.",
          schema: tableau(["temps (h)", "0", "0,5", "1", "1,5", "2"], ["écart (°C)", 200, 141.4, 100, 70.7, 50]),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_sens", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "Deux placements",
          enonce:
            "Deux placements sur deux ans (modèles). Placement $A$ : $+8$ % la première année, $+2$ % la deuxième. Placement $B$ : $+5$ % chaque année.\na) Un client dit : « $A$ fait $+5$ % par an en moyenne, comme $B$. » Calculer le coefficient global de chaque placement.\nb) Calculer le taux moyen annuel de $A$, au centième de %.\nc) Pour $10\\,000$ € placés, quel est le meilleur placement, et de combien ?\nd) Pourquoi la moyenne des taux trompe-t-elle le client ?",
          correction:
            "a) $A$ : $1{,}08 \\times 1{,}02 = 1{,}1016$. $B$ : $1{,}05 \\times 1{,}05 = 1{,}1025$.\nb) $c = \\sqrt{1{,}1016} \\approx 1{,}0496$ : environ $+4{,}96$ % par an, un peu moins que $5$ %.\nc) $A$ donne $11\\,016$ €, $B$ donne $11\\,025$ € : $B$ rapporte $9$ € de plus.\nd) La moyenne des taux, $\\dfrac{8 + 2}{2} = 5$ %, ne tient pas compte de la composition. Le taux moyen, lui, vient du coefficient global.\n⭐ Le calcul le montre : $1{,}08 \\times 1{,}02 = (1{,}05 + 0{,}03)(1{,}05 - 0{,}03) = 1{,}05^2 - 0{,}03^2$. Pour la même moyenne des taux, des taux irréguliers rapportent un peu moins.",
          schema: diagramme("barres", [
            { label: "A", value: 11016 },
            { label: "B", value: 11025 },
          ]),
          micros: ["expo_taux_moyen_sens", "expo_taux_moyen_calculer", "expo_taux_moyen_global", "expo_taux_moyen_interpreter"],
        },
        {
          titre: "La vidéo d'un but",
          enonce:
            "La vidéo d'un but spectaculaire est vue $1\\,000$ fois le jour de sa mise en ligne (jour $0$), et elle a atteint $1\\,000\\,000$ de vues au jour $10$ (modèle).\na) Quel est le coefficient global ? le coefficient moyen par jour, au millième ?\nb) Montrer qu'en moyenne, le nombre de vues a presque doublé chaque jour. Pourquoi $2^{10} = 1\\,024$ le confirme-t-il ?\nc) Si ce rythme moyen continuait $10$ jours de plus, combien de vues ? Est-ce réaliste ?",
          correction:
            "a) $C = \\dfrac{1\\,000\\,000}{1\\,000} = 1\\,000$, en $10$ jours. $c = 1\\,000^{\\frac{1}{10}} \\approx 1{,}995$.\nb) $1{,}995$, c'est presque $2$ : en moyenne, les vues doublent presque chaque jour.\nEt doubler $10$ fois, c'est multiplier par $2^{10} = 1\\,024$, à peine plus que $1\\,000$.\nc) Dix jours de plus : encore multiplié par $1\\,000$, soit $1\\,000\\,000\\,000$ de vues, un milliard. Très peu de vidéos y parviennent : le rythme ralentit forcément.\n⭐ C'est l'ordre de grandeur à retenir : doubler dix fois, c'est multiplier par environ mille.\nSur le tableau, au jour $5$, la moitié du chemin en temps : $1\\,000 \\times 1\\,000^{\\frac{1}{2}} \\approx 31\\,623$ vues seulement.",
          schema: tableau(["jour", "0", "5", "10"], ["vues", "1 000", "31 623", "1 000 000"]),
          micros: ["expo_taux_moyen_calculer", "expo_taux_moyen_interpreter", "expo_taux_moyen_global"],
        },
      ],
    },
  ],
};
