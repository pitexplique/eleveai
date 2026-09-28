// ─── Fiche d'exercices : interpoler et extrapoler (1re, sans spécialité) ─────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), 28/09/2026 : une
// feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/ajustement-affine.bank.ts`
// (items `info_ajust_interpoler`, `info_ajust_extrapoler`, `info_ajust_limites`).
//
// ⭐⭐ LE FIL : LE CALCUL EST LE MÊME, C'EST LA CONFIANCE QUI CHANGE. Chaque
// exercice commence par SITUER la valeur cherchée par rapport à la plage des
// données (dedans : interpolation ; dehors : extrapolation), et les problèmes
// finissent tous par une prévision absurde — taille de 3 m, temps nul, part de
// 103 %, eau à 140 °C, 410e jour de l'année — qui montre où le modèle s'arrête.
//
// ⭐ Frédéric, 28/09 : du visuel partout, et des contextes d'économie,
// d'écologie, de sport, de nature, de physique et d'histoire-géo. Les chiffres
// sont des MODÈLES arrondis, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-interpoler-extrapoler.mjs`.
//
// Micro-compétences : info_ajust_interpoler (1, 3, 4, 8, 9, 10, 11, 12, 13, 14,
// 15, 16, 17, 18, 19, 20), info_ajust_extrapoler (2, 3, 5, 7, 9, 10, 11, 12,
// 13, 15, 17, 18, 19, 20), info_ajust_limites (6, 7, 9, 11, 12, 13, 14, 15, 16,
// 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { intervalles, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoInterpolerExtrapolerPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-interpoler-extrapoler",
  titre: "Interpoler et extrapoler",
  accroche:
    "Vingt exercices pour se servir d'une droite d'ajustement : estimer une valeur entre les relevés, prévoir au-delà, et savoir quand la prévision devient absurde. Montagne, glacier, ville, casserole d'eau, vendanges : un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Situer la valeur cherchée, puis calculer avec l'équation.",
      rappel: [
        "INTERPOLER : estimer une valeur À L'INTÉRIEUR de la plage des données, entre la plus petite et la plus grande valeur de $x$ observée.",
        "EXTRAPOLER : estimer une valeur EN DEHORS de cette plage, après la dernière donnée, ou avant la première.",
        "Le calcul est le même : on remplace $x$ dans $y = ax + b$, ou on résout $ax + b = k$. Ce qui change, c'est la CONFIANCE : plus on s'éloigne des données, moins l'estimation est sûre.",
      ],
      exercices: [
        {
          enonce:
            "La population d'une ville, en milliers d'habitants, relevée de $x = 0$ à $x = 8$, est ajustée par $y = 3x + 20$. Estimer la population pour $x = 5$. Est-ce une interpolation ou une extrapolation ?",
          correction:
            "On situe d'abord : $5$ est entre $0$ et $8$, à l'intérieur de la plage des relevés. C'est une interpolation.\nOn calcule : $y = 3 \\times 5 + 20 = 15 + 20 = 35$.\nLa population est estimée à $35\\,000$ habitants.\n⭐ Entre deux relevés, la tendance a très peu de chances de faire un écart : on peut avoir confiance.\nSur la droite graduée : la valeur cherchée tombe DANS la zone des données.",
          schema: ecranSeulement(intervalles(0, 14, [{ de: 0, a: 8, deInclus: true, aInclus: true, label: "données" }], 2, [{ value: 5, label: "?" }])),
          micros: ["info_ajust_interpoler"],
        },
        {
          enonce:
            "Même ville, même modèle $y = 3x + 20$, relevés de $x = 0$ à $x = 8$. Que prévoit le modèle pour $x = 12$ ? Est-ce une interpolation ou une extrapolation ?",
          correction:
            "$12$ est plus grand que $8$ : on sort de la plage des relevés. C'est une extrapolation.\n$y = 3 \\times 12 + 20 = 36 + 20 = 56$.\nLe modèle prévoit $56\\,000$ habitants.\n⚠️ Le calcul est aussi simple qu'à l'exercice 1, mais c'est une PRÉVISION : elle suppose que la ville continue de grandir au même rythme.\nSur la droite graduée : la valeur cherchée tombe HORS de la zone des données.",
          schema: ecranSeulement(intervalles(0, 14, [{ de: 0, a: 8, deInclus: true, aInclus: true, label: "données" }], 2, [{ value: 12, label: "?" }])),
          micros: ["info_ajust_extrapoler"],
        },
        {
          enonce:
            "Des relevés vont de $2015$ à $2023$. On veut une estimation pour trois années : $A$ : $2019$ ; $B$ : $2028$ ; $C$ : $2012$. Pour chacune, dire s'il s'agit d'une interpolation ou d'une extrapolation.",
          correction:
            "La plage des données va de $2015$ à $2023$.\n$A$ : $2019$ est entre $2015$ et $2023$ : interpolation.\n$B$ : $2028$ est après $2023$ : extrapolation (vers l'avenir).\n$C$ : $2012$ est avant $2015$ : extrapolation aussi, vers le passé.\n⚠️ Extrapoler ne veut pas dire seulement « prévoir le futur » : c'est sortir de la plage, d'un côté ou de l'autre.",
          schema: intervalles(2010, 2030, [{ de: 2015, a: 2023, deInclus: true, aInclus: true, label: "données" }], 5, [
            { value: 2019, label: "A" },
            { value: 2028, label: "B" },
            { value: 2012, label: "C" },
          ]),
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler"],
        },
        {
          enonce:
            "Sur un sentier, on compte les randonneurs, en centaines, tous les deux ans ($x$ : les années depuis le premier comptage). L'année $x = 3$ n'a pas été comptée. Lire sur la droite d'ajustement une estimation pour cette année-là.",
          figure: repere([-1, 7, -1, 10], [{ q: [0, 1, 2] }], [
            { x: 0, y: 2, label: "" },
            { x: 2, y: 4.5, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 6, y: 8, label: "" },
          ], undefined, true),
          correction:
            "$3$ est entre $0$ et $6$ : c'est une interpolation.\nOn part de $x = 3$ sur l'axe horizontal, on monte jusqu'à la DROITE (pas jusqu'à un point), puis on lit l'ordonnée : $5$.\nL'estimation est de $5$ centaines, soit $500$ randonneurs.\n✔️ Avec l'équation de la droite, $y = x + 2$ : $3 + 2 = 5$.\n⚠️ On lit sur la droite, qui résume tous les relevés, et non en « recopiant » un point voisin.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 10], [{ q: [0, 1, 2] }], [
              { x: 0, y: 2, label: "" },
              { x: 2, y: 4.5, label: "" },
              { x: 3, y: 5, label: "" },
              { x: 4, y: 6, label: "" },
              { x: 6, y: 8, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_interpoler"],
        },
        {
          enonce:
            "Un modèle $y = 2x + 10$ a été construit sur des relevés allant de $x = 0$ à $x = 10$. Pour quelle valeur de $x$ donne-t-il $y = 40$ ? Est-ce une interpolation ou une extrapolation ?",
          correction:
            "On résout $2x + 10 = 40$ : $2x = 30$, donc $x = 15$.\n$15$ est au-delà de $10$, la dernière valeur relevée : c'est une extrapolation.\n⭐ On situe la RÉPONSE, pas seulement la question : ici, c'est le $x$ trouvé qui sort de la plage.\nSur la droite graduée : $x = 15$ est à droite de la zone des données.",
          schema: ecranSeulement(intervalles(0, 16, [{ de: 0, a: 10, deInclus: true, aInclus: true, label: "données" }], 2, [{ value: 15, label: "?" }])),
          micros: ["info_ajust_extrapoler"],
        },
        {
          enonce:
            "La taille d'un enfant, en cm, relevée de $2$ à $10$ ans, est ajustée par $y = 6x + 76$. Que prévoit ce modèle à $40$ ans ? Qu'en penser ?",
          correction:
            "$y = 6 \\times 40 + 76 = 240 + 76 = 316$ : le modèle prévoit $316$ cm, soit plus de $3$ mètres !\nC'est absurde : on arrête de grandir à la fin de l'adolescence.\nLe modèle n'est valable que sur la plage de ses relevés, de $2$ à $10$ ans.\n⚠️ Le calcul est juste ; c'est le MODÈLE qui ne s'applique plus.\nSur la droite graduée : $40$ ans est quatre fois plus loin que le dernier relevé.",
          schema: ecranSeulement(intervalles(0, 40, [{ de: 2, a: 10, deInclus: true, aInclus: true, label: "données" }], 5, [{ value: 40, label: "?" }])),
          micros: ["info_ajust_limites"],
        },
        {
          enonce:
            "Une nageuse s'entraîne pendant $10$ semaines. Son temps au $100$ m, en secondes, est ajusté par $y = -0{,}5x + 70$ ($x$ : la semaine).\na) Que prévoit le modèle pour la semaine $12$ ?\nb) Et pour la semaine $140$ ? Commenter.",
          correction:
            "a) $y = -0{,}5 \\times 12 + 70 = -6 + 70 = 64$ secondes. C'est une extrapolation proche : la prévision reste crédible.\nb) $y = -0{,}5 \\times 140 + 70 = -70 + 70 = 0$ seconde : nager $100$ m en zéro seconde, c'est impossible.\nLes progrès d'un sportif RALENTISSENT avec le temps : une droite ne le voit pas.\n⚠️ Plus on extrapole loin, plus le modèle affine devient faux.\nSur la droite graduée : $a$ touche presque la zone des données, $b$ en est très loin.",
          schema: ecranSeulement(intervalles(0, 140, [{ de: 0, a: 10, deInclus: true, aInclus: true, label: "données" }], 20, [{ value: 12, label: "a" }, { value: 140, label: "b" }])),
          micros: ["info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          enonce:
            "Un modèle $y = 1{,}2x + 4$ est construit sur des relevés allant de $x = 0$ à $x = 10$. Pour quelle valeur de $x$ donne-t-il $y = 10$ ? Interpolation ou extrapolation ?",
          correction:
            "On résout $1{,}2x + 4 = 10$ : $1{,}2x = 6$, donc $x = \\dfrac{6}{1{,}2} = 5$.\n$5$ est entre $0$ et $10$ : c'est une interpolation.\n✔️ Vérification : $1{,}2 \\times 5 + 4 = 6 + 4 = 10$.\nSur la droite graduée : $x = 5$ est au milieu de la zone des données.",
          schema: ecranSeulement(intervalles(0, 10, [{ de: 0, a: 10, deInclus: true, aInclus: true, label: "données" }], 2, [{ value: 5, label: "?" }])),
          micros: ["info_ajust_interpoler"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Situer, calculer, puis dire quelle confiance accorder au résultat.",
      rappel: [
        "Avant de calculer, on situe la valeur : dans la plage des données (interpolation) ou dehors (extrapolation).",
        "Une extrapolation PROCHE des données est souvent raisonnable. LOINTAINE, elle devient hasardeuse : rien ne dit que la tendance continue.",
        "Une prévision impossible (une taille de $3$ m, un temps négatif, une part de plus de $100$ %) prouve que le modèle a dépassé ses limites.",
      ],
      exercices: [
        {
          titre: "Monter en altitude",
          enonce:
            "Le même matin, des stations météo situées de $0$ à $2$ km d'altitude relèvent la température. La droite d'ajustement a pour équation $y = -6x + 12$ ($x$ en km, $y$ en °C).\na) Estimer la température à un refuge situé à $1{,}2$ km d'altitude.\nb) Estimer la température au sommet d'une montagne de $4{,}8$ km.\nc) Quelle confiance accorder à chacun de ces deux résultats ?",
          figure: repere([-1, 3, -1, 13], [{ q: [0, -6, 12] }], [
            { x: 0, y: 12, label: "" },
            { x: 0.5, y: 9.5, label: "" },
            { x: 1, y: 5.5, label: "" },
            { x: 1.5, y: 3, label: "" },
            { x: 2, y: 0, label: "" },
          ], undefined, true),
          correction:
            "a) $1{,}2$ km est entre $0$ et $2$ km : interpolation. $y = -6 \\times 1{,}2 + 12 = -7{,}2 + 12 = 4{,}8$ °C.\nb) $4{,}8$ km est bien au-delà de $2$ km : extrapolation. $y = -6 \\times 4{,}8 + 12 = -28{,}8 + 12 = -16{,}8$ °C.\nc) Le refuge est entre deux stations : on peut avoir confiance.\nLe sommet est $2{,}8$ km plus haut que la dernière station, plus loin que toute la plage mesurée : c'est une prévision fragile. Le vent, le soleil, la neige peuvent tout changer ; seule une station au sommet trancherait.\n⭐ Le coefficient $-6$ se lit : la température baisse d'environ $6$ °C par kilomètre d'altitude, ce matin-là.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Une ville moyenne",
          enonce:
            "Voici la population d'une ville, en milliers d'habitants. On l'ajuste par la droite $y = 0{,}5x + 40$, où $x$ est le nombre d'années depuis $2000$.\na) Estimer la population en $2012$.\nb) Que prévoit le modèle pour $2030$ ?\nc) En quelle année le modèle annonce-t-il $60\\,000$ habitants ?\nd) Classer ces trois résultats du plus sûr au moins sûr.",
          figure: tableau(["année", "2000", "2005", "2010", "2015", "2020"], ["habitants (milliers)", 40, 43, 45, 48, 50]),
          correction:
            "a) $2012$, c'est $x = 12$, dans la plage $2000$–$2020$ : interpolation. $y = 0{,}5 \\times 12 + 40 = 46$, soit $46\\,000$ habitants.\nb) $2030$, c'est $x = 30$, après $2020$ : extrapolation. $y = 0{,}5 \\times 30 + 40 = 55$, soit $55\\,000$ habitants.\nc) $0{,}5x + 40 = 60$, donc $0{,}5x = 20$ et $x = 40$ : l'année $2040$, encore une extrapolation.\nd) Du plus sûr au moins sûr : $2012$ (entre deux relevés), puis $2030$ ($10$ ans après le dernier), puis $2040$ ($20$ ans après).\n⭐ En démographie, une usine qui ferme, une ligne de train qui ouvre, et la tendance change : plus on prévoit loin, plus on parie.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler"],
        },
        {
          titre: "Le glacier qui recule",
          enonce:
            "Dans un modèle, la longueur d'un glacier alpin, en km, est relevée à chaque décennie ($x$ : les décennies depuis le premier relevé). La droite d'ajustement $y = -0{,}6x + 8$ est prolongée sur le dessin.\na) Estimer la longueur du glacier au milieu de la troisième décennie, pour $x = 2{,}5$.\nb) Pour quelle valeur de $x$ le modèle annonce-t-il la disparition du glacier ? Traduire en années.\nc) Que penser de cette prévision ?",
          figure: repere([-1, 14, -1, 9], [{ q: [0, -0.6, 8] }], [
            { x: 0, y: 8, label: "" },
            { x: 1, y: 7.5, label: "" },
            { x: 2, y: 6.8, label: "" },
            { x: 3, y: 6.4, label: "" },
            { x: 4, y: 5.6, label: "" },
            { x: 5, y: 5, label: "" },
          ], undefined, true),
          correction:
            "a) $2{,}5$ est entre $0$ et $5$ : interpolation. $y = -0{,}6 \\times 2{,}5 + 8 = -1{,}5 + 8 = 6{,}5$ km.\nb) Le glacier disparaît quand $y = 0$ : $-0{,}6x + 8 = 0$, donc $x = \\dfrac{8}{0{,}6} \\approx 13{,}3$ décennies, soit environ $133$ ans après le premier relevé.\nc) Les relevés couvrent $5$ décennies ; la prévision porte sur plus de $13$ : on extrapole plus de deux fois plus loin que ce qu'on a mesuré.\nLa fonte peut s'accélérer si le climat se réchauffe plus vite, ou ralentir quand le glacier ne garde que sa partie la plus haute, la plus froide. La date est très incertaine ; la tendance, elle, est claire.\n⚠️ Sur le dessin, la droite continue bien après le dernier point : c'est tout le problème de l'extrapolation.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "La voiture électrique",
          enonce:
            "Dans un pays imaginaire, la part des voitures électriques dans les ventes de voitures neuves, en %, est relevée pendant cinq ans ($x = 0$ à $4$). Elle est ajustée par $y = 2{,}5x + 3$.\na) Pour quelle valeur de $x$ le modèle donne-t-il $9$ % ?\nb) Que prévoit-il pour $x = 10$ ?\nc) Et pour $x = 40$ ? Commenter.",
          figure: tableau(["année", "0", "1", "2", "3", "4"], ["part (%)", 3, 6, 8, 10, 13]),
          correction:
            "a) $2{,}5x + 3 = 9$, donc $2{,}5x = 6$ et $x = \\dfrac{6}{2{,}5} = 2{,}4$ : pendant la troisième année. C'est une interpolation ($2{,}4$ est entre $0$ et $4$).\nb) $x = 10$ : extrapolation. $y = 2{,}5 \\times 10 + 3 = 28$ %.\nc) $x = 40$ : $y = 2{,}5 \\times 40 + 3 = 103$ %.\nPlus de $100$ % des ventes, c'est impossible : une part ne dépasse jamais le tout.\n⚠️ Une part ne peut pas monter en ligne droite pour toujours : elle finit par ralentir. Le modèle affine a atteint ses limites bien avant $x = 40$.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Le plan d'entraînement",
          enonce:
            "Une coureuse note la distance de sa sortie longue, en km, chaque semaine ($x$ : la semaine). La droite d'ajustement a pour équation $y = 1{,}5x + 4$.\na) Quelle distance le modèle donne-t-il pour la semaine $3$ ? Comparer au relevé.\nb) Que prévoit-il pour la semaine $8$ ?\nc) Et pour la semaine $20$ ? Commenter.",
          figure: repere([-1, 7, -1, 14], [{ q: [0, 1.5, 4] }], [
            { x: 0, y: 4, label: "" },
            { x: 1, y: 6, label: "" },
            { x: 2, y: 7, label: "" },
            { x: 3, y: 8, label: "" },
            { x: 4, y: 10, label: "" },
            { x: 5, y: 11, label: "" },
            { x: 6, y: 13, label: "" },
          ], undefined, true),
          correction:
            "a) La semaine $3$ est dans la plage des relevés : interpolation. $y = 1{,}5 \\times 3 + 4 = 8{,}5$ km, pour $8$ km relevés : un demi-kilomètre d'écart.\nb) Semaine $8$ : extrapolation proche. $y = 1{,}5 \\times 8 + 4 = 16$ km. C'est crédible.\nc) Semaine $20$ : $y = 1{,}5 \\times 20 + 4 = 34$ km, presque un marathon en sortie d'entraînement.\nUn corps ne progresse pas indéfiniment au même rythme : il faut des semaines de repos, et on se blesse à forcer. La prévision n'a plus de sens.\n⭐ Le modèle décrit ce qui S'EST passé ; il ne décide pas de ce qui se passera.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Le marchand de glaces",
          enonce:
            "Un marchand de glaces relève ses ventes selon la température de l'après-midi, entre $20$ °C et $32$ °C. Il les ajuste par $y = 15x - 150$ ($x$ en °C, $y$ : le nombre de glaces).\na) Estimer ses ventes à $26$ °C.\nb) Que prévoit le modèle à $5$ °C ?\nc) Et à $40$ °C ? Peut-on s'y fier ?",
          figure: tableau(["température (°C)", "20", "24", "28", "32"], ["glaces vendues", 150, 200, 280, 330]),
          correction:
            "a) $26$ °C est entre $20$ et $32$ : interpolation. $y = 15 \\times 26 - 150 = 390 - 150 = 240$ glaces.\nb) $5$ °C est hors de la plage : $y = 15 \\times 5 - 150 = 75 - 150 = -75$. Vendre $-75$ glaces, c'est impossible.\nc) $y = 15 \\times 40 - 150 = 600 - 150 = 450$ glaces. Le calcul marche, mais on n'a jamais observé une telle chaleur : par une canicule, les gens restent peut-être à l'ombre.\n⚠️ Extrapoler vers le bas comme vers le haut peut donner un résultat absurde : un nombre de glaces ne peut pas être négatif.",
          micros: ["info_ajust_interpoler", "info_ajust_limites"],
        },
        {
          titre: "La casserole d'eau",
          enonce:
            "En TP de physique, on chauffe de l'eau et on relève sa température toutes les deux minutes, pendant $6$ minutes. Les relevés sont ajustés par $y = 8x + 20$ ($x$ en minutes, $y$ en °C).\na) Estimer la température au bout de $5$ minutes.\nb) Que prévoit le modèle au bout de $15$ minutes ?\nc) Au bout de combien de minutes le modèle atteint-il $100$ °C ? Que se passe-t-il ensuite, en réalité ?",
          correction:
            "a) $5$ est entre $0$ et $6$ : interpolation. $y = 8 \\times 5 + 20 = 40 + 20 = 60$ °C.\nb) $15$ minutes : extrapolation. $y = 8 \\times 15 + 20 = 120 + 20 = 140$ °C.\nc) $8x + 20 = 100$, donc $8x = 80$ et $x = 10$ minutes.\nEn réalité, sous la pression atmosphérique normale, l'eau bout à $100$ °C, et sa température reste à $100$ °C tant qu'elle bout. Les $140$ °C du modèle sont impossibles.\nSur le dessin, en dizaines de degrés : la droite des relevés, et le palier à $100$ °C où l'eau s'arrête.\n⭐ La physique impose une limite que la droite ignore : c'est le cas typique d'une extrapolation qui casse.",
          schema: repere([-1, 12, -1, 12], [{ q: [0, 0.8, 2] }], [
            { x: 0, y: 2, label: "" },
            { x: 2, y: 3.6, label: "" },
            { x: 4, y: 5.2, label: "" },
            { x: 6, y: 6.8, label: "" },
            { x: 10, y: 10, label: "" },
          ], 10, true),
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Le chauffage de la maison",
          enonce:
            "Une famille relève la consommation électrique de son chauffage, en kWh par jour, selon la température extérieure, de $-5$ °C à $15$ °C. On l'ajuste par $y = -0{,}4x + 12$.\na) Estimer la consommation par une journée à $2$ °C.\nb) À quelle température le modèle donne-t-il $8$ kWh ?\nc) Que donne-t-il à $35$ °C ? Commenter.",
          figure: tableau(["température (°C)", "−5", "0", "5", "10", "15"], ["kWh par jour", 14, 12.5, 10, 7.5, 6]),
          correction:
            "a) $2$ °C est entre $-5$ et $15$ : interpolation. $y = -0{,}4 \\times 2 + 12 = -0{,}8 + 12 = 11{,}2$ kWh.\nb) $-0{,}4x + 12 = 8$, donc $-0{,}4x = -4$ et $x = 10$ °C. C'est dans la plage : interpolation.\nc) $y = -0{,}4 \\times 35 + 12 = -14 + 12 = -2$ kWh : une consommation négative, absurde.\nPar forte chaleur, le chauffage est simplement ÉTEINT : la consommation vaut $0$, pas $-2$.\n⚠️ En divisant par $-0{,}4$, un nombre négatif, on garde bien le signe : $\\dfrac{-4}{-0{,}4} = 10$.",
          micros: ["info_ajust_interpoler", "info_ajust_limites"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Situer chaque valeur, calculer, puis juger la prévision.",
      rappel: [
        "À chaque question : interpolation ou extrapolation ? Puis le calcul. Puis une phrase qui dit jusqu'où l'on peut croire le résultat.",
        "Un modèle affine suppose que la tendance reste la même. Tout ce qui peut l'infléchir (une limite physique, une ressource qui manque, une décision humaine) limite l'extrapolation.",
      ],
      exercices: [
        {
          titre: "Le niveau de la mer",
          enonce:
            "Dans un port, un modèle simplifié donne la hausse du niveau moyen de la mer, en cm, depuis $1995$. On l'ajuste par $y = 0{,}4x$, où $x$ est le nombre d'années depuis $1995$.\na) Estimer la hausse en $2010$.\nb) Que prévoit le modèle pour $2100$ ?\nc) En quelle année le modèle annonce-t-il une hausse de $30$ cm ?\nd) Pourquoi ces prévisions lointaines sont-elles fragiles ?",
          figure: tableau(["année", "1995", "2005", "2015", "2025"], ["hausse (cm)", 0, 4, 9, 12]),
          correction:
            "a) $2010$ est entre $1995$ et $2025$ : interpolation. $x = 15$ et $y = 0{,}4 \\times 15 = 6$ cm.\nb) $2100$ : $x = 105$, loin après $2025$. Extrapolation : $y = 0{,}4 \\times 105 = 42$ cm.\nc) $0{,}4x = 30$, donc $x = \\dfrac{30}{0{,}4} = 75$ : l'année $1995 + 75 = 2070$. Extrapolation encore.\nd) On a $30$ ans de relevés, et on prévoit $75$ ans après leur fin. Un modèle affine suppose une hausse régulière : si elle s'accélère, ce que les scientifiques étudient justement, la droite sous-estime.\n⭐ La droite donne un ordre de grandeur, pas une date : prévoir, ce n'est pas mesurer.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Le retour du lynx",
          enonce:
            "Des lynx ont été réintroduits dans une forêt. Le nombre d'animaux, en dizaines, est relevé tous les deux ans pendant $8$ ans et ajusté par $y = 0{,}3x + 1$ ($x$ : les années depuis la réintroduction).\na) Estimer le nombre de lynx au bout de $5$ ans.\nb) Que prévoit le modèle au bout de $10$ ans ? de $50$ ans ?\nc) Les biologistes estiment que cette forêt ne peut pas nourrir plus d'environ $60$ lynx. Au bout de combien d'années le modèle dépasse-t-il cette limite ? Que penser de la prévision à $50$ ans ?",
          figure: repere([-1, 11, -1, 5], [{ q: [0, 0.3, 1] }], [
            { x: 0, y: 1, label: "" },
            { x: 2, y: 1.7, label: "" },
            { x: 4, y: 2.2, label: "" },
            { x: 6, y: 2.8, label: "" },
            { x: 8, y: 3.4, label: "" },
          ], undefined, true),
          correction:
            "a) $5$ ans, entre $0$ et $8$ : interpolation. $y = 0{,}3 \\times 5 + 1 = 2{,}5$ dizaines, soit $25$ lynx.\nb) $10$ ans : extrapolation proche, $y = 0{,}3 \\times 10 + 1 = 4$ dizaines, soit $40$ lynx. Crédible.\n$50$ ans : extrapolation lointaine, $y = 0{,}3 \\times 50 + 1 = 16$ dizaines, soit $160$ lynx.\nc) $60$ lynx, c'est $6$ dizaines : $0{,}3x + 1 = 6$, donc $x = \\dfrac{5}{0{,}3} \\approx 16{,}7$ ans.\nAprès environ $17$ ans, le modèle dépasse ce que la forêt peut nourrir : les $160$ lynx à $50$ ans sont impossibles. La population va plafonner.\n⚠️ $y$ compte des DIZAINES de lynx : $2{,}5$ veut dire $25$ animaux.\n⭐ Dans la nature, une population ne grandit pas sans fin : la nourriture et l'espace finissent par manquer.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "Les ventes d'un jeu vidéo",
          enonce:
            "Un éditeur suit les ventes hebdomadaires d'un nouveau jeu vidéo, en milliers d'exemplaires, pendant $8$ semaines. Il les ajuste par la droite qui passe par la première et la dernière semaine.\na) Déterminer cette droite.\nb) Estimer les ventes de la semaine $5$, puis prévoir celles de la semaine $12$.\nc) Que prévoit le modèle pour la semaine $20$ ? Commenter.\nd) Quelle semaine le modèle annonce-t-il zéro vente ?",
          figure: tableau(["semaine", "1", "2", "4", "6", "8"], ["ventes (milliers)", 28, 27, 22, 18, 14]),
          correction:
            "a) Les points $(1 ; 28)$ et $(8 ; 14)$ : $a = \\dfrac{14 - 28}{8 - 1} = \\dfrac{-14}{7} = -2$. $28 = -2 \\times 1 + b$, donc $b = 30$. La droite : $y = -2x + 30$.\nb) Semaine $5$ (interpolation) : $y = -2 \\times 5 + 30 = 20$, soit $20\\,000$ jeux.\nSemaine $12$ (extrapolation) : $y = -2 \\times 12 + 30 = 6$, soit $6\\,000$ jeux.\nc) Semaine $20$ : $y = -2 \\times 20 + 30 = -10$. Des ventes négatives, c'est absurde.\nd) $-2x + 30 = 0$ donne $x = 15$.\nEn réalité, les ventes d'un jeu ralentissent sans s'arrêter d'un coup : une promotion, une mise à jour les relancent. La droite ne sait pas « freiner ».\n⚠️ Un modèle qui DESCEND finit toujours par passer sous zéro : c'est le premier signe qu'on l'a poussé trop loin.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
        {
          titre: "La date des vendanges",
          enonce:
            "Dans une région viticole imaginaire, on relève la date de début des vendanges, comptée en jours depuis le $1^{er}$ janvier (le $1^{er}$ septembre est le $244^{e}$ jour). On l'ajuste par $y = -0{,}5x + 270$, où $x$ est le nombre d'années depuis $1980$.\na) Estimer le jour des vendanges en $2004$, et le traduire en date.\nb) Que prévoit le modèle pour $2050$ ? Traduire en date (le $1^{er}$ août est le $213^{e}$ jour).\nc) « Remontons le temps » : que donne le modèle pour $1700$ ? Commenter.",
          figure: tableau(["année", "1980", "1990", "2000", "2010", "2020"], ["jour de l'année", 270, 264, 261, 255, 250]),
          correction:
            "a) $2004$ est dans la plage $1980$–$2020$ : interpolation. $x = 24$, $y = -0{,}5 \\times 24 + 270 = -12 + 270 = 258$.\nLe $244^{e}$ jour est le $1^{er}$ septembre, donc le $258^{e}$ est le $15$ septembre ($258 - 244 = 14$ jours plus tard).\nb) $2050$ : extrapolation, $x = 70$. $y = -0{,}5 \\times 70 + 270 = -35 + 270 = 235$.\nLe $213^{e}$ jour est le $1^{er}$ août, donc le $235^{e}$ est le $23$ août ($235 - 213 = 22$ jours plus tard).\nc) $1700$ : $x = -280$, extrapolation vers le passé. $y = -0{,}5 \\times (-280) + 270 = 140 + 270 = 410$.\nLe $410^{e}$ jour d'une année qui n'en compte que $365$ : absurde.\n⭐ Le modèle dit que les vendanges avancent d'un demi-jour par an sur $40$ ans. Il ne dit rien des siècles passés, ni de la façon dont les vignerons s'adapteront.\n⚠️ $x = 1700 - 1980 = -280$ est NÉGATIF : oublier le signe donnerait $130$, un faux résultat qui a l'air normal.",
          micros: ["info_ajust_interpoler", "info_ajust_extrapoler", "info_ajust_limites"],
        },
      ],
    },
  ],
};
