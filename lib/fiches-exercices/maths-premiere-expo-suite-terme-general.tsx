// ─── Fiche d'exercices : le terme général d'une suite géométrique (1re) ──────
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), deuxième feuille : après « reconnaître », la
// formule u_n = u_0 × qⁿ, le sens de variation, les points (n ; u_n), et ce
// que dit un terme dans son contexte. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts`.
//
// ⛔ Suites à termes STRICTEMENT POSITIFS : le sens de variation se lit sur la
// seule raison (q > 1 croissante, 0 < q < 1 décroissante, q = 1 constante).
//
// ⭐⭐ LE FIL : LE RANG EST UN EXPOSANT, ET IL N'EST PAS L'ANNÉE. Les pièges
// nommés : 0,8³ lu 0,8 × 3 (2), 1,5⁰ lu 0 (3), la formule écrite depuis u_1
// (6), le rang confondu avec l'année (8, 12), dix fois 3 % lu 30 % (9, 13,
// 16), la moitié du temps pour la moitié de la surface (14), et la
// température qui n'est pas géométrique quand l'écart l'est (18).
//
// ⭐ Contextes : économie (capital 9, salaire et prix 19), physique
// (condensateur 10, café qui refroidit 18), histoire-géo (population
// mondiale 11, ville industrielle et exode rural 17), sport (club
// d'escalade 12), écologie (CO₂ 13, forêt 16), nature (nénuphars 14,
// abeilles 20), santé (bactéries 15). Chiffres = MODÈLES ; seuls faits réels
// cités : la population mondiale vers 1960 et vers 2000 (exercice 11).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-suite-terme-general.mjs`.
//
// Micro-compétences : expo_suite_explicite (1, 2, 3, 5, 6, 7, 9, 10, 11, 12,
// 13, 14, 15, 16, 17, 18, 19, 20), expo_suite_variation (4, 5, 10, 13, 15, 16,
// 17, 18, 19, 20), expo_suite_graphique (7, 11, 14, 15, 17, 18, 20),
// expo_suite_interpreter (8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoSuiteTermeGeneralPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-suite-terme-general",
  titre: "Suite géométrique : le terme général",
  accroche:
    "Vingt exercices pour écrire uₙ en fonction de n, trouver le sens de variation d'une suite géométrique, placer ses points et dire ce que représente un terme. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec ses dessins.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Suite géométrique de premier terme $u_0$ et de raison $q$ : $u_n = u_0 \\times q^n$.",
        "On calcule d'abord la puissance $q^n$, puis on multiplie par $u_0$. Et $q^0 = 1$.",
        "Termes strictement positifs : si $q > 1$, la suite est croissante ; si $0 < q < 1$, décroissante ; si $q = 1$, constante.",
        "Pour la représenter, on place les points $(n ; u_n)$. On ne les relie pas.",
      ],
      exercices: [
        {
          enonce: "Soit $(u_n)$ la suite géométrique de premier terme $u_0 = 3$ et de raison $q = 2$. Exprimer $u_n$ en fonction de $n$, puis calculer $u_5$.",
          correction:
            "$u_n = u_0 \\times q^n = 3 \\times 2^n$.\n$u_5 = 3 \\times 2^5 = 3 \\times 32 = 96$.\n⚠️ $3 \\times 2^5$ n'est pas $6^5$ : on calcule d'abord la puissance, puis on multiplie par $3$.\n⭐ La formule évite de calculer $u_1$, $u_2$, $u_3$, $u_4$ : on saute directement au rang voulu.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "5"], ["uₙ", 3, 6, 12, 96])),
          micros: ["expo_suite_explicite"],
        },
        {
          enonce: "On donne $u_0 = 5\\,000$ et $q = 0{,}8$. Exprimer $u_n$ en fonction de $n$, puis calculer $u_3$.",
          correction:
            "$u_n = 5\\,000 \\times 0{,}8^n$.\n$u_3 = 5\\,000 \\times 0{,}8^3 = 5\\,000 \\times 0{,}512 = 2\\,560$.\n⚠️ $0{,}8^3$ n'est pas $0{,}8 \\times 3 = 2{,}4$ : c'est $0{,}8 \\times 0{,}8 \\times 0{,}8$.\nSur le dessin, les termes en milliers : chaque point est à $0{,}8$ fois la hauteur du précédent.",
          schema: ecranSeulement(repere([-1, 5, -1, 6], [], [{ x: 0, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 3.2 }, { x: 3, y: 2.56 }])),
          micros: ["expo_suite_explicite"],
        },
        {
          enonce: "On donne $u_n = 7 \\times 1{,}5^n$. Donner le premier terme $u_0$ et la raison, puis calculer $u_2$.",
          correction:
            "$u_0 = 7 \\times 1{,}5^0 = 7 \\times 1 = 7$.\nLa raison est le nombre élevé à la puissance $n$ : $q = 1{,}5$.\n$u_2 = 7 \\times 1{,}5^2 = 7 \\times 2{,}25 = 15{,}75$.\n⚠️ $1{,}5^0 = 1$, et pas $0$ : un nombre non nul à la puissance $0$ vaut toujours $1$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2"], ["uₙ", 7, 10.5, 15.75])),
          micros: ["expo_suite_explicite"],
        },
        {
          enonce: "Donner le sens de variation de chaque suite géométrique.\na) $u_0 = 10$ et $q = 1{,}3$.\nb) $v_0 = 50$ et $q = 0{,}6$.\nc) $w_0 = 8$ et $q = 1$.",
          correction:
            "Les termes sont strictement positifs : c'est la raison, comparée à $1$, qui décide.\na) $1{,}3 > 1$ : $(u_n)$ est croissante.\nb) $0 < 0{,}6 < 1$ : $(v_n)$ est décroissante.\nc) $q = 1$ : on multiplie par $1$, rien ne change. $(w_n)$ est constante, égale à $8$.\n⚠️ Ce n'est pas le premier terme qui décide : $v_0 = 50$ est grand, et pourtant la suite décroît.\nSur le dessin, les trois suites divisées par $5$ : $(u_n)$ en bleu monte, $(v_n)$ en orange descend, $(w_n)$ en vert reste plate.",
          schema: ecranSeulement(repere([-1, 4, -1, 11], [{ pts: [[0, 2], [1, 2.6], [2, 3.38], [3, 4.39]] }, { pts: [[0, 10], [1, 6], [2, 3.6], [3, 2.16]], couleur: ORANGE }, { pts: [[0, 1.6], [3, 1.6]], couleur: "#16a34a" }], [], undefined, true)),
          micros: ["expo_suite_variation"],
        },
        {
          enonce: "On donne $u_n = 400 \\times 0{,}9^n$. Quel est le sens de variation de $(u_n)$ ? Le vérifier sur $u_0$, $u_1$ et $u_2$.",
          correction:
            "$u_0 = 400 > 0$ et la raison $q = 0{,}9$ est entre $0$ et $1$ : la suite est décroissante.\n$u_0 = 400$ ; $u_1 = 400 \\times 0{,}9 = 360$ ; $u_2 = 400 \\times 0{,}81 = 324$ : les termes baissent bien.\n⭐ $q = 0{,}9$, c'est une baisse de $10$ % à chaque étape.\nSur le dessin, les termes en centaines : ils descendent.",
          schema: ecranSeulement(repere([-1, 5, -1, 5], [], [{ x: 0, y: 4 }, { x: 1, y: 3.6 }, { x: 2, y: 3.24 }, { x: 3, y: 2.92 }])),
          micros: ["expo_suite_variation", "expo_suite_explicite"],
        },
        {
          enonce: "Une suite géométrique vérifie $u_1 = 6$ et a pour raison $q = 3$. Calculer $u_0$, exprimer $u_n$ en fonction de $n$, puis calculer $u_4$.",
          correction:
            "On recule d'un rang en divisant par la raison : $u_0 = \\dfrac{6}{3} = 2$.\nDonc $u_n = 2 \\times 3^n$.\n$u_4 = 2 \\times 3^4 = 2 \\times 81 = 162$.\n⚠️ Écrire $u_n = 6 \\times 3^n$ serait faux : la formule part de $u_0$, pas de $u_1$. Elle donnerait $u_1 = 18$, au lieu de $6$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3", "4"], ["uₙ", 2, 6, 18, 54, 162])),
          micros: ["expo_suite_explicite"],
        },
        {
          enonce: "On donne $u_n = 6 \\times 0{,}5^n$. Calculer $u_0$, $u_1$, $u_2$, $u_3$ et $u_4$, puis placer les points $(n ; u_n)$ dans un repère.",
          correction:
            "$u_0 = 6$ ; $u_1 = 3$ ; $u_2 = 1{,}5$ ; $u_3 = 0{,}75$ ; $u_4 = 0{,}375$.\nOn place les points $(0 ; 6)$, $(1 ; 3)$, $(2 ; 1{,}5)$, $(3 ; 0{,}75)$ et $(4 ; 0{,}375)$.\n⭐ Les points ne sont pas alignés : ils descendent de moins en moins vite, et s'approchent de l'axe sans jamais le toucher.\n⚠️ On ne relie pas les points : une suite n'a de valeurs qu'aux rangs entiers.",
          schema: repere([-1, 5, -1, 7], [], [
            { x: 0, y: 6 },
            { x: 1, y: 3 },
            { x: 2, y: 1.5 },
            { x: 3, y: 0.75 },
            { x: 4, y: 0.375 },
          ]),
          micros: ["expo_suite_graphique", "expo_suite_explicite"],
        },
        {
          enonce: "Le nombre d'habitants d'une ville, $n$ années après 2020, est modélisé par $u_n = 12\\,000 \\times 1{,}05^n$.\na) Que représentent $12\\,000$ et $1{,}05$ ?\nb) Calculer $u_2$. Que représente ce nombre ?",
          correction:
            "a) $12\\,000 = u_0$ : la population en 2020. $1{,}05$ est la raison : la population augmente de $5$ % par an.\nb) $u_2 = 12\\,000 \\times 1{,}05^2 = 12\\,000 \\times 1{,}1025 = 13\\,230$.\nC'est la population prévue en $2020 + 2 = 2022$ : $13\\,230$ habitants.\n⚠️ Le rang $n$ n'est pas l'année : $u_2$ parle de 2022, pas de l'an $2$.",
          schema: ecranSeulement(diagramme("barres", [{ label: "2020", value: 12000 }, { label: "2021", value: 12600 }, { label: "2022", value: 13230 }])),
          micros: ["expo_suite_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Écrire la formule, calculer le terme demandé, dire ce qu'il représente.",
      rappel: [
        "$u_n = u_0 \\times q^n$ : $u_0$ est la valeur de DÉPART (rang $0$), $q$ le coefficient multiplicateur d'une étape.",
        "Si $n$ compte les années depuis 2020, le rang $n$ correspond à l'année $2020 + n$.",
        "$n$ hausses de $t$ % ne font pas $n \\times t$ % : on calcule $q^n$.",
        "Croissante si $q > 1$, décroissante si $0 < q < 1$. Les points $(n ; u_n)$ ne sont pas alignés.",
      ],
      exercices: [
        {
          titre: "Un capital qui dort",
          enonce:
            "Samir place $5\\,000$ € à intérêts composés, au taux de $3$ % par an (modèle). On note $u_n$ le capital au bout de $n$ années.\na) Exprimer $u_n$ en fonction de $n$.\nb) Calculer le capital au bout de $5$ ans, puis de $10$ ans (au centime).\nc) Le capital a-t-il augmenté de $30$ % en $10$ ans ?",
          correction:
            "a) $+3$ % par an : raison $1{,}03$, et $u_0 = 5\\,000$. Donc $u_n = 5\\,000 \\times 1{,}03^n$.\nb) $u_5 = 5\\,000 \\times 1{,}03^5 \\approx 5\\,796{,}37$ €.\n$u_{10} = 5\\,000 \\times 1{,}03^{10} \\approx 6\\,719{,}58$ €.\nc) $\\dfrac{6\\,719{,}58}{5\\,000} \\approx 1{,}344$ : une hausse d'environ $34{,}4$ %, plus que $30$ %.\n⭐ Chaque année, les $3$ % portent sur un capital plus gros : dix hausses de $3$ % font plus que $30$ %.",
          schema: tableau(["année", "0", "5", "10"], ["capital (€)", 5000, 5796.37, 6719.58]),
          micros: ["expo_suite_explicite", "expo_suite_interpreter"],
        },
        {
          titre: "Un condensateur qui se décharge",
          enonce:
            "Un condensateur chargé sous $12$ V se décharge dans une résistance. Chaque seconde, sa tension baisse de $10$ % (modèle). On note $U_n$ la tension, en volts, au bout de $n$ secondes.\na) Exprimer $U_n$ en fonction de $n$.\nb) Donner le sens de variation de la suite $(U_n)$.\nc) Calculer $U_3$ et $U_5$ (au centième). Que représente $U_5$ ?",
          correction:
            "a) Baisser de $10$ %, c'est multiplier par $0{,}9$ : $U_n = 12 \\times 0{,}9^n$.\nb) $U_0 = 12 > 0$ et $0 < 0{,}9 < 1$ : la suite est décroissante. La tension baisse à chaque seconde.\nc) $U_3 = 12 \\times 0{,}9^3 = 12 \\times 0{,}729 = 8{,}748$, soit environ $8{,}75$ V.\n$U_5 = 12 \\times 0{,}9^5 \\approx 7{,}09$ V : c'est la tension au bout de $5$ secondes.\n⚠️ En $5$ secondes, la tension n'a pas perdu $50$ % : il reste plus de la moitié des $12$ V.\nSur le dessin, les points descendent de moins en moins vite.",
          schema: repere([-1, 6, -1, 13], [], [
            { x: 0, y: 12 },
            { x: 1, y: 10.8 },
            { x: 2, y: 9.72 },
            { x: 3, y: 8.75 },
            { x: 4, y: 7.87 },
            { x: 5, y: 7.09 },
          ], undefined, true),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_interpreter"],
        },
        {
          titre: "La population mondiale",
          enonce:
            "En 1960, la Terre comptait environ $3$ milliards d'habitants. Un modèle simple suppose une hausse de $2$ % par an. On note $p_n$ la population, en milliards, en l'année $1960 + n$. Le graphique place les points du modèle tous les dix ans : l'abscisse compte les décennies.\na) Exprimer $p_n$ en fonction de $n$.\nb) Calculer $p_{10}$ et $p_{40}$ (au centième). À quelles années correspondent-ils ?\nc) En 2000, la population réelle était d'environ $6{,}1$ milliards. Le modèle en prévoit-il trop, ou pas assez ?",
          figure: repere([-1, 5, -1, 8], [], [
            { x: 0, y: 3 },
            { x: 1, y: 3.66 },
            { x: 2, y: 4.46 },
            { x: 3, y: 5.43 },
            { x: 4, y: 6.62 },
          ]),
          correction:
            "a) $p_n = 3 \\times 1{,}02^n$.\nb) $p_{10} = 3 \\times 1{,}02^{10} \\approx 3{,}66$ milliards : c'est 1970.\n$p_{40} = 3 \\times 1{,}02^{40} \\approx 6{,}62$ milliards : c'est 2000.\nSur le graphique, l'abscisse compte les DÉCENNIES : le point d'abscisse $4$ est $p_{40}$, pas $p_4$.\nc) Le modèle donne $6{,}62$ milliards, la réalité environ $6{,}1$ : le modèle en prévoit trop.\nLa croissance réelle a ralenti : le taux annuel n'est pas resté à $2$ %.\n⭐ Un modèle géométrique suppose un taux CONSTANT. Quand le taux change, le modèle s'éloigne de la réalité.",
          micros: ["expo_suite_explicite", "expo_suite_graphique", "expo_suite_interpreter"],
        },
        {
          titre: "Un club d'escalade",
          enonce:
            "Le diagramme donne le nombre d'adhérents d'un club d'escalade (modèle).\na) Montrer que ces nombres sont les premiers termes d'une suite géométrique $(a_n)$, où $a_n$ est le nombre d'adhérents en l'année $2022 + n$.\nb) Exprimer $a_n$ en fonction de $n$.\nc) Si l'évolution continue, combien d'adhérents le club aura-t-il en 2028 ?",
          figure: diagramme("barres", [
            { label: "2022", value: 125 },
            { label: "2023", value: 150 },
            { label: "2024", value: 180 },
            { label: "2025", value: 216 },
          ]),
          correction:
            "a) $\\dfrac{150}{125} = 1{,}2$ ; $\\dfrac{180}{150} = 1{,}2$ ; $\\dfrac{216}{180} = 1{,}2$ : quotient constant, suite géométrique de raison $1{,}2$.\nb) $a_n = 125 \\times 1{,}2^n$.\nc) 2028, c'est le rang $n = 2028 - 2022 = 6$. $a_6 = 125 \\times 1{,}2^6 \\approx 373{,}2$ : environ $373$ adhérents.\n⚠️ Le rang de 2028 est $6$ : ni $2028$, ni $4$. La quatrième barre, 2025, est le rang $3$.",
          micros: ["expo_suite_explicite", "expo_suite_interpreter"],
        },
        {
          titre: "Réduire ses émissions de CO₂",
          enonce:
            "Une entreprise émettait $800$ tonnes de CO₂ en 2025. Elle s'engage à réduire ses émissions de $5$ % par an (modèle). On note $E_n$ ses émissions, en tonnes, en l'année $2025 + n$.\na) Exprimer $E_n$ en fonction de $n$ ; donner le sens de variation de la suite.\nb) Calculer $E_{10}$ à la tonne près. Que représente-t-il ?\nc) L'entreprise annonce : « En dix ans, nous aurons divisé nos émissions par deux. » Est-ce vrai ?",
          correction:
            "a) $E_n = 800 \\times 0{,}95^n$. La raison est entre $0$ et $1$, le premier terme est positif : la suite est décroissante.\nb) $E_{10} = 800 \\times 0{,}95^{10} \\approx 479$ tonnes : les émissions prévues en 2035.\nc) La moitié de $800$, c'est $400$. Or $479 > 400$ : non. La baisse est d'environ $40$ %, pas de $50$ %.\n⚠️ Dix baisses de $5$ % ne font pas $-50$ % : on perd $5$ % d'une quantité de plus en plus petite.",
          schema: ecranSeulement(tableau(["année", "2025", "2030", "2035"], ["émissions (t)", 800, 619.02, 478.99])),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_interpreter"],
        },
        {
          titre: "Les nénuphars de l'étang",
          enonce:
            "Sur un étang, des nénuphars s'étendent. Le graphique donne la surface couverte, en m², jour après jour (modèle).\na) Parmi $u_n = 1 + n$, $u_n = 2n$ et $u_n = 2^n$, quelle formule correspond aux points ?\nb) Calculer $u_{10}$. Que représente-t-il ?\nc) L'étang est entièrement couvert le jour $20$. Quel jour était-il à moitié couvert ?",
          figure: repere([-1, 5, -1, 9], [], [
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 8 },
          ]),
          correction:
            "a) On lit $1$ ; $2$ ; $4$ ; $8$ : la surface double chaque jour. $u_n = 2^n$ convient : $2^0 = 1$, $2^1 = 2$, $2^2 = 4$, $2^3 = 8$.\n$1 + n$ donne $1$ ; $2$ ; $3$ ; $4$ : non. $2n$ donne $0$ au rang $0$ : non.\nb) $u_{10} = 2^{10} = 1\\,024$ m² : la surface couverte le jour $10$.\nc) La surface double chaque jour : la veille du jour $20$, elle valait la moitié. C'est le jour $19$.\n⚠️ Pas le jour $10$ ! Le jour $10$, les nénuphars couvrent à peine un millième de l'étang : $\\dfrac{2^{10}}{2^{20}} = \\dfrac{1}{1\\,024}$.",
          micros: ["expo_suite_graphique", "expo_suite_explicite", "expo_suite_interpreter"],
        },
        {
          titre: "Avec ou sans traitement",
          enonce:
            "Dans une culture, on compte $1\\,000$ bactéries. Sans traitement, leur nombre augmente de $10$ % par heure ; avec un traitement, il baisse de $30$ % par heure (modèles). On note $v_n$ et $u_n$ le nombre de bactéries au bout de $n$ heures, sans et avec traitement.\na) Exprimer $v_n$ et $u_n$ en fonction de $n$.\nb) Donner le sens de variation de chaque suite.\nc) Calculer $v_3$ et $u_3$. Représenter les termes de $n = 0$ à $n = 4$, en centaines.",
          correction:
            "a) $v_n = 1\\,000 \\times 1{,}1^n$ et $u_n = 1\\,000 \\times 0{,}7^n$.\nb) $1{,}1 > 1$ : $(v_n)$ est croissante. $0 < 0{,}7 < 1$ : $(u_n)$ est décroissante.\nc) $v_3 = 1\\,000 \\times 1{,}331 = 1\\,331$ bactéries ; $u_3 = 1\\,000 \\times 0{,}343 = 343$ bactéries.\nSur le dessin, en centaines : les points rouges sont ceux de $v_n$, les points reliés en orange ceux de $u_n$. Les deux partent de $10$ centaines, puis s'écartent.\n⭐ Même départ, deux raisons : c'est la raison, et elle seule, qui décide du sens.",
          schema: repere([-1, 5, -1, 15], [{ pts: [[0, 10], [1, 7], [2, 4.9], [3, 3.43], [4, 2.4]], couleur: ORANGE }], [
            { x: 0, y: 10 },
            { x: 1, y: 11 },
            { x: 2, y: 12.1 },
            { x: 3, y: 13.31 },
            { x: 4, y: 14.64 },
          ], undefined, true),
          micros: ["expo_suite_variation", "expo_suite_explicite", "expo_suite_graphique"],
        },
        {
          titre: "Une forêt qui recule",
          enonce:
            "La surface boisée d'une région, en milliers d'hectares, est modélisée par $f_n = 250 \\times 0{,}98^n$, où $n$ est le nombre d'années après 2020.\na) Que représentent $250$ et $0{,}98$ ?\nb) Quel est le sens de variation de $(f_n)$ ? Que traduit-il ?\nc) Calculer $f_{10}$ au dixième. Quelle surface la région aura-t-elle perdue en dix ans ?",
          correction:
            "a) $250$ : la surface en 2020, $250$ milliers d'hectares, soit $250\\,000$ ha. $0{,}98 = 1 - 0{,}02$ : la forêt perd $2$ % de sa surface par an.\nb) $0 < 0{,}98 < 1$ : suite décroissante. La forêt recule chaque année.\nc) $f_{10} = 250 \\times 0{,}98^{10} \\approx 204{,}3$ milliers d'hectares.\nPerte : $250 - 204{,}3 = 45{,}7$ milliers d'hectares.\n⚠️ Pas $20$ % de $250$, soit $50$ : chaque année, on perd $2$ % d'une forêt déjà réduite.",
          schema: ecranSeulement(tableau(["année", "2020", "2025", "2030"], ["forêt (milliers d'ha)", 250, 225.98, 204.27])),
          micros: ["expo_suite_interpreter", "expo_suite_variation", "expo_suite_explicite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "On identifie $u_0$ et $q$, on écrit $u_n = u_0 \\times q^n$, on vérifie sur $u_1$.",
        "On traduit l'année en rang (ou l'inverse) avant de calculer.",
        "On conclut par une phrase, avec l'unité, et on dit si le modèle est raisonnable.",
      ],
      exercices: [
        {
          titre: "Une ville de l'ère industrielle",
          enonce:
            "Au XIXe siècle, l'exode rural fait grandir les villes industrielles. Une ville compte $20\\,000$ habitants en 1850 ; on suppose (modèle) que sa population augmente de $3$ % par an. On note $u_n$ la population en l'année $1850 + n$.\na) Exprimer $u_n$ en fonction de $n$ et donner son sens de variation.\nb) Calculer la population tous les dix ans, de 1860 à 1900, à la centaine près, puis représenter ces valeurs.\nc) Par combien la population a-t-elle été multipliée entre 1850 et 1900 ?\nd) Dans ce modèle d'exercice, on suppose que les archives donnent $80\\,000$ habitants en 1900. Que dire du modèle ?",
          correction:
            "a) $u_n = 20\\,000 \\times 1{,}03^n$. Raison $1{,}03 > 1$ : la suite est croissante.\nb) 1860 : $u_{10} \\approx 26\\,900$ ; 1870 : $u_{20} \\approx 36\\,100$ ; 1880 : $u_{30} \\approx 48\\,500$ ; 1890 : $u_{40} \\approx 65\\,200$ ; 1900 : $u_{50} \\approx 87\\,700$ habitants.\nSur le dessin, l'abscisse compte les décennies et la population est en dizaines de milliers.\nc) $1{,}03^{50} \\approx 4{,}38$ : la population a été multipliée par plus de $4$.\nd) Le modèle donne environ $87\\,700$, les archives $80\\,000$ : il surestime d'environ $10$ %. La croissance a sans doute ralenti en fin de siècle.\n⭐ Chaque décennie, la population est multipliée par le même nombre, $1{,}03^{10} \\approx 1{,}34$ : les points montent de plus en plus vite.",
          schema: repere([-1, 6, -1, 10], [], [
            { x: 0, y: 2 },
            { x: 1, y: 2.69 },
            { x: 2, y: 3.61 },
            { x: 3, y: 4.85 },
            { x: 4, y: 6.52 },
            { x: 5, y: 8.77 },
          ], undefined, true),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_graphique", "expo_suite_interpreter"],
        },
        {
          titre: "Le café qui refroidit",
          enonce:
            "Un café à $80$ °C est posé dans une pièce à $20$ °C. L'écart de température entre le café et la pièce diminue de $20$ % chaque minute (modèle). On note $E_n$ cet écart, en °C, au bout de $n$ minutes, et $T_n$ la température du café.\na) Calculer $E_0$. Exprimer $E_n$ en fonction de $n$.\nb) En déduire $T_n$ en fonction de $n$, puis la température du café au bout de $5$ minutes (au dixième).\nc) La suite $(T_n)$ est-elle géométrique ? Quel est son sens de variation ?\nd) Représenter $E_0$ à $E_5$. Selon le modèle, le café atteindra-t-il $20$ °C ?",
          correction:
            "a) $E_0 = 80 - 20 = 60$ °C. Baisse de $20$ % par minute : $E_n = 60 \\times 0{,}8^n$.\nb) La température du café, c'est celle de la pièce plus l'écart : $T_n = 20 + 60 \\times 0{,}8^n$.\n$T_5 = 20 + 60 \\times 0{,}8^5 = 20 + 60 \\times 0{,}32768 \\approx 39{,}7$ °C.\nc) $T_0 = 80$, $T_1 = 68$, $T_2 = 58{,}4$. $\\dfrac{68}{80} = 0{,}85$ mais $\\dfrac{58{,}4}{68} \\approx 0{,}86$ : les quotients changent, $(T_n)$ n'est PAS géométrique. C'est l'écart $(E_n)$ qui l'est.\n$(E_n)$ est décroissante, donc $(T_n)$ aussi : le café refroidit.\nd) Sur le dessin, les écarts sont en dizaines de degrés. $E_n$ reste strictement positif : selon le modèle, le café s'approche de $20$ °C sans jamais l'atteindre.\n⚠️ Écrire $T_n = 80 \\times 0{,}8^n$ serait faux : le café descendrait vers $0$ °C, plus froid que la pièce !",
          schema: repere([-1, 6, -1, 7], [], [
            { x: 0, y: 6 },
            { x: 1, y: 4.8 },
            { x: 2, y: 3.84 },
            { x: 3, y: 3.07 },
            { x: 4, y: 2.46 },
            { x: 5, y: 1.97 },
          ]),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_graphique", "expo_suite_interpreter"],
        },
        {
          titre: "Le salaire et les prix",
          enonce:
            "Un salarié gagne $2\\,000$ € par mois en 2025. Son salaire augmente de $1{,}5$ % par an ; les prix, eux, augmentent de $2$ % par an (modèles). On note $s_n$ son salaire en l'année $2025 + n$, et $p_n$ le prix d'un « panier » de dépenses qui coûte $2\\,000$ € en 2025.\na) Exprimer $s_n$ et $p_n$ en fonction de $n$. Quel est le sens de variation de chaque suite ?\nb) Calculer $s_{20}$ et $p_{20}$ à l'euro près. À quelle année correspondent-ils ?\nc) En 2045, son salaire lui permettra-t-il d'acheter le panier ? Que dire de son pouvoir d'achat ?",
          correction:
            "a) $s_n = 2\\,000 \\times 1{,}015^n$ et $p_n = 2\\,000 \\times 1{,}02^n$. Les deux raisons sont plus grandes que $1$ : les deux suites sont croissantes.\nb) $s_{20} = 2\\,000 \\times 1{,}015^{20} \\approx 2\\,694$ € et $p_{20} = 2\\,000 \\times 1{,}02^{20} \\approx 2\\,972$ €. C'est l'année $2025 + 20 = 2045$.\nc) Non : il lui manque environ $278$ € par mois.\n$\\dfrac{2\\,694}{2\\,972} \\approx 0{,}906$ : avec son salaire, il n'achète plus qu'environ $90{,}6$ % du panier. Son pouvoir d'achat a baissé d'environ $9$ %.\n⚠️ Un écart de « seulement » $0{,}5$ point par an finit par peser lourd : sur vingt ans, les puissances creusent l'écart.",
          schema: diagramme("barres", [
            { label: "en 2025", value: 2000 },
            { label: "salaire 2045", value: 2694 },
            { label: "panier 2045", value: 2972 },
          ]),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_interpreter"],
        },
        {
          titre: "Une colonie d'abeilles",
          enonce:
            "Au printemps, une colonie compte $5\\,000$ abeilles. Pendant quelques semaines, sa population augmente de $20$ % par semaine (modèle). On note $a_n$ le nombre d'abeilles au bout de $n$ semaines.\na) Exprimer $a_n$ en fonction de $n$ ; donner son sens de variation.\nb) Calculer $a_1$, $a_2$, $a_3$, $a_4$ et $a_5$ (à l'unité), et représenter les points $(n ; a_n)$ en milliers.\nc) Au bout de combien de semaines la colonie a-t-elle doublé ?\nd) Pourquoi ce modèle ne peut-il pas durer toute l'année ?",
          correction:
            "a) $a_n = 5\\,000 \\times 1{,}2^n$. Raison $1{,}2 > 1$ : suite croissante.\nb) $a_1 = 6\\,000$ ; $a_2 = 7\\,200$ ; $a_3 = 8\\,640$ ; $a_4 = 10\\,368$ ; $a_5 = 12\\,441{,}6$, soit environ $12\\,442$ abeilles.\nc) Doubler, c'est atteindre $10\\,000$. $a_3 = 8\\,640 < 10\\,000$ et $a_4 = 10\\,368 > 10\\,000$ : au bout de $4$ semaines. Sur le dessin, c'est le premier point au-dessus de la ligne en pointillés.\nd) Au bout de $52$ semaines, le modèle donnerait $5\\,000 \\times 1{,}2^{52}$ : plus de $60$ millions d'abeilles dans une seule ruche ! La place et la nourriture manquent bien avant.\n⭐ Une croissance géométrique ne dure jamais indéfiniment dans la nature : le modèle ne vaut que sur une courte période.",
          schema: repere([-1, 6, -1, 14], [], [
            { x: 0, y: 5 },
            { x: 1, y: 6 },
            { x: 2, y: 7.2 },
            { x: 3, y: 8.64 },
            { x: 4, y: 10.37 },
            { x: 5, y: 12.44 },
          ], 10, true),
          micros: ["expo_suite_explicite", "expo_suite_variation", "expo_suite_graphique", "expo_suite_interpreter"],
        },
      ],
    },
  ],
};
