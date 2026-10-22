// ─── Fiche d'exercices : ajustement affine (Tle STMG) — 20 exercices ─────────
//
// Deuxième des cinq feuilles STMG « séries statistiques à deux variables »
// (22/10/2026), après `maths-stmg-stat-nuage.tsx` (mêmes dessins, même ton).
// Alignée sur la banque `lib/tutor-v4/questionBank/stmg/maths/
// statistique-deux-variables.bank.ts`, notion stat_ajustement : juger si un
// ajustement affine est PERTINENT, tracer une droite AU JUGÉ (par le point
// moyen G, autant de points de part et d'autre), trouver son ÉQUATION (deux
// points, ou G et le coefficient directeur), et s'en servir pour CALCULER
// (y à partir de x, x à partir de y).
// ⛔ La droite des MOINDRES CARRÉS (calculatrice, somme des carrés des écarts)
// est la notion stat_moindres_carres ; l'interpolation et ses limites, la
// notion stat_interpoler ; chacune a sa feuille.
// ⭐ L'ESPRIT CRITIQUE du BO : un nuage qui se courbe (2, 9, 20), un point
// isolé à écarter (10), une droite « des extrêmes » qui ne passe pas par G (9),
// un modèle qui donne une valeur absurde (16).
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 9 — CO₂ dans l'atmosphère à Mauna Loa, moyennes annuelles (NOAA,
//     en ppm) : 1960 316,9 ; 1970 325,7 ; 1980 338,8 ; 1990 354,4 ; 2000
//     369,7 ; 2010 389,9 ; 2020 414,2.
// Le reste est un MODÈLE, à des ordres de grandeur vraisemblables (camion,
// cyberattaques, camping, laverie, voiture d'occasion, hôtel, podomètre,
// électricien, SAV, train, cabinet comptable, brasserie, self-stockage, usine,
// isolation, food truck, PME, festival, voiture électrique).
// Métiers, un par exercice : responsable de flotte, analyste en
// cybersécurité, gérante de camping, gérant de laverie, garagiste, directeur
// d'hôtel, diététicienne, électricien, ingénieure du climat, responsable du
// service après-vente, agente de voyages, expert-comptable, brasseur, gérante
// de self-stockage, ingénieure environnement, conseillère en rénovation
// énergétique, gérant de food truck, contrôleur de gestion, directrice de
// festival, ingénieure en mobilité électrique.
//
// ⭐ Les dessins : `nuage` (droites, G, lectures) et `grille`, de
// `stmg-deux-variables-figures.tsx`. 13 imprimés.
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-stat-ajustement.mjs`
// (chaque droite au jugé est comparée à la vraie droite des moindres carrés).
//
// Micro-compétences : statT_ajust_pertinence (1, 2, 9, 10, 16, 17, 20),
// statT_ajust_au_juge (3, 7, 9, 10, 11, 12, 17, 18, 19), statT_ajust_equation
// (4, 7, 8, 9, 11, 13, 15, 17, 18, 19, 20), statT_ajust_calculer (5, 6, 9,
// 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesStatAjustementStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "stat-ajustement",
  titre: "Ajustement affine",
  accroche:
    "Vingt exercices, du geste seul au problème : dire si un ajustement affine a du sens, tracer une droite au jugé par le point moyen, trouver son équation, puis s'en servir pour calculer une valeur. Le CO₂ de l'atmosphère, un food truck, la masse salariale d'une PME, un festival, la consommation d'une voiture électrique. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la droite dessinée et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : juger le nuage, choisir une droite, trouver une équation ou calculer une valeur.",
      rappel: [
        "Un ajustement affine est pertinent quand les points se rapprochent d'une droite : les hausses successives restent du même ordre.",
        "Au jugé, la droite passe par le point moyen $G$ et laisse à peu près autant de points au-dessus qu'en dessous.",
        "Équation par deux points $A$ et $B$ : $a = \\dfrac{y_B - y_A}{x_B - x_A}$, puis $b = y_A - a \\times x_A$.",
        "Pour calculer $y$, je remplace $x$ dans $y = ax + b$. Pour trouver $x$, je résous $ax + b = $ la valeur donnée.",
      ],
      exercices: [
        {
          enonce:
            "Un responsable de flotte relève, pour un camion, la charge transportée (en tonnes) et la consommation de gazole (en litres pour 100 km), sur sept trajets.\na) Décris la tendance du nuage.\nb) Calcule les hausses de consommation d'une tonne à la suivante. Les valeurs, de 1 à 7 tonnes : 22 ; 24 ; 25 ; 27 ; 29 ; 30 ; 32.\nc) Un ajustement affine est-il pertinent ?",
          figure: nuage([0, 8, 1, 20, 34, 2], [
            { x: 1, y: 22 },
            { x: 2, y: 24 },
            { x: 3, y: 25 },
            { x: 4, y: 27 },
            { x: 5, y: 29 },
            { x: 6, y: 30 },
            { x: 7, y: 32 },
          ], { noms: ["charge (t)", "gazole (L/100 km)"] }),
          correction:
            "a) « Quand la charge augmente, la consommation a tendance à augmenter. »\nb) $24 - 22 = 2$ ; $25 - 24 = 1$ ; $27 - 25 = 2$ ; $29 - 27 = 2$ ; $30 - 29 = 1$ ; $32 - 30 = 2$.\nc) Oui : les hausses restent du même ordre, 1 ou 2 litres par tonne. Les points se rapprochent d'une droite, un ajustement affine est pertinent.\n⛔ Le piège : exiger des hausses toutes égales. Des données réelles ne sont jamais parfaitement alignées ; il suffit qu'elles restent du même ordre.\nRéponse : a) croissante ; b) 2, 1, 2, 2, 1, 2 ; c) oui.",
          micros: ["statT_ajust_pertinence"],
        },
        {
          enonce:
            "Une analyste en cybersécurité compte les tentatives d'intrusion sur le réseau d'une entreprise, en CENTAINES, pendant six mois : 3 ; 5 ; 8 ; 13 ; 21 ; 34.\na) Calcule les hausses d'un mois au suivant.\nb) Un ajustement affine est-il pertinent ? Justifie.",
          figure: nuage([0, 7, 1, 0, 35, 5], [
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 8 },
            { x: 4, y: 13 },
            { x: 5, y: 21 },
            { x: 6, y: 34 },
          ], { noms: ["rang du mois", "tentatives (centaines)"] }),
          correction:
            "a) $5 - 3 = 2$ ; $8 - 5 = 3$ ; $13 - 8 = 5$ ; $21 - 13 = 8$ ; $34 - 21 = 13$.\nb) Non. Les hausses grandissent à chaque mois, de 2 à 13 : le nuage se courbe vers le haut. Une droite passerait au-dessus des points du milieu et sous les points des bords.\n⛔ Le piège : dire « le nuage monte, donc une droite convient ». Monter ne suffit pas : il faut monter du même pas.\nRéponse : a) 2, 3, 5, 8, 13 ; b) non, le nuage se courbe.",
          micros: ["statT_ajust_pertinence"],
        },
        {
          enonce:
            "Une gérante de camping compare la température moyenne d'un mois (°C) et le nombre de nuitées, en centaines. Deux droites sont tracées : $d_1$ (bleue) d'équation $y = 1{,}4x - 7{,}6$ et $d_2$ (verte) d'équation $y = 1{,}4x - 3$.\nTempératures : 14, 16, 18, 20, 22, 24, 26. Nuitées : 12, 15, 17, 21, 23, 26, 29.\na) Calcule les coordonnées du point moyen $G$. Arrondis au centième.\nb) Laquelle des deux droites passe le plus près de $G$ ?\nc) Laquelle est la meilleure droite d'ajustement au jugé ?",
          figure: nuage([12, 28, 2, 8, 32, 4], [
            { x: 14, y: 12 },
            { x: 16, y: 15 },
            { x: 18, y: 17 },
            { x: 20, y: 21 },
            { x: 22, y: 23 },
            { x: 24, y: 26 },
            { x: 26, y: 29 },
          ], { noms: ["température (°C)", "nuitées (centaines)"], droites: [[1.4, -7.6], [1.4, -3]] }),
          correction:
            "a) $\\bar{x} = \\dfrac{14 + 16 + 18 + 20 + 22 + 24 + 26}{7} = \\dfrac{140}{7} = 20$ et $\\bar{y} = \\dfrac{12 + 15 + 17 + 21 + 23 + 26 + 29}{7} = \\dfrac{143}{7} \\approx 20{,}43$. Donc $G(20 ; 20{,}43)$.\nb) Pour $x = 20$ : $d_1$ donne $1{,}4 \\times 20 - 7{,}6 = 20{,}4$ ; $d_2$ donne $1{,}4 \\times 20 - 3 = 25$. $d_1$ passe tout près de $G$, $d_2$ bien au-dessus.\nc) $d_1$ : elle passe par $G$, et les points se répartissent de part et d'autre. $d_2$ a la bonne pente, mais tous les points sont en dessous.\n⛔ Le piège : choisir une droite parce qu'elle a la bonne direction. Elle doit aussi passer au milieu des points, c'est-à-dire par $G$.\nRéponse : a) $G(20 ; 20{,}43)$ ; b) $d_1$ ; c) $d_1$.",
          micros: ["statT_ajust_au_juge"],
        },
        {
          enonce:
            "Le gérant d'une laverie trace au jugé une droite d'ajustement du nombre de lavages par jour, en dizaines, selon le rang de la semaine depuis l'ouverture. Sa droite passe par $A(2 ; 30)$ et $B(8 ; 60)$.\na) Calcule son coefficient directeur $a$.\nb) Calcule son ordonnée à l'origine $b$.\nc) Écris l'équation de la droite.",
          correction:
            "a) $a = \\dfrac{60 - 30}{8 - 2} = \\dfrac{30}{6} = 5$.\nb) La droite passe par $A$ : $30 = 5 \\times 2 + b$, donc $b = 30 - 10 = 20$.\nc) $y = 5x + 20$.\nContrôle avec $B$ : $5 \\times 8 + 20 = 60$. C'est bon.\n⭐ Chaque semaine, la laverie gagne environ 5 dizaines, soit 50 lavages par jour.\n⛔ Le piège au a) : calculer $\\dfrac{8 - 2}{60 - 30}$. Le coefficient directeur, c'est la hausse des $y$ divisée par la hausse des $x$.\nRéponse : $y = 5x + 20$.",
          schema: ecranSeulement(
            nuage([0, 10, 2, 10, 70, 10], [
              { x: 2, y: 30, label: "A" },
              { x: 8, y: 60, label: "B" },
            ], { noms: ["rang de la semaine", "lavages (dizaines)"], droites: [[5, 20]] }),
          ),
          micros: ["statT_ajust_equation"],
        },
        {
          enonce:
            "Un garagiste estime la valeur d'une citadine d'occasion, en milliers d'euros, selon son âge $x$ en années. Il a tracé la droite d'ajustement $y = -0{,}8x + 15$.\na) Avec l'équation, estime la valeur d'une citadine de 6 ans.\nb) Que représente le nombre 15 ?\nc) Que représente le nombre $-0{,}8$ ?",
          figure: nuage([0, 10, 1, 6, 16, 2], [
            { x: 1, y: 14 },
            { x: 2, y: 13.6 },
            { x: 3, y: 12.4 },
            { x: 4, y: 11.9 },
            { x: 5, y: 11 },
            { x: 7, y: 9.6 },
            { x: 8, y: 8.4 },
          ], { noms: ["âge (années)", "valeur (k€)"], droites: [[-0.8, 15]] }),
          correction:
            "a) Je remplace $x$ par 6 : $y = -0{,}8 \\times 6 + 15 = -4{,}8 + 15 = 10{,}2$. Environ 10,2 milliers d'euros, soit 10 200 €.\nb) Pour $x = 0$, $y = 15$ : la valeur estimée d'une citadine neuve, 15 000 €.\nc) Chaque année de plus, $y$ baisse de $0{,}8$ : la voiture perd environ 800 € par an.\n⛔ Le piège au a) : oublier le signe moins et trouver $0{,}8 \\times 6 + 15 = 19{,}8$. Une voiture qui vieillit ne prend pas de valeur.\nRéponse : a) environ 10 200 € ; b) la valeur neuve ; c) une perte de 800 € par an.",
          schema: ecranSeulement(
            nuage([0, 10, 1, 6, 16, 2], [], { noms: ["âge (années)", "valeur (k€)"], droites: [[-0.8, 15]], lectures: [{ x: 6 }] }),
          ),
          micros: ["statT_ajust_calculer"],
        },
        {
          enonce:
            "Un directeur d'hôtel modélise le chiffre d'affaires mensuel, en milliers d'euros, par $y = 4x + 25$, où $x$ est le rang du mois (janvier a le rang 1).\na) Quel chiffre d'affaires le modèle donne-t-il pour le mois de rang 3 ?\nb) Pour quel rang le modèle donne-t-il 65 milliers d'euros ?\nc) À quel mois correspond ce rang ?",
          correction:
            "a) $y = 4 \\times 3 + 25 = 12 + 25 = 37$ milliers d'euros.\nb) Je résous $4x + 25 = 65$.\n$4x = 65 - 25 = 40$, donc $x = 40 \\div 4 = 10$.\nc) Le rang 10, c'est octobre.\n⛔ Le piège au b) : remplacer $x$ par 65 et trouver $4 \\times 65 + 25 = 285$. Ici, c'est $y$ qui est connu : on cherche $x$.\nRéponse : a) 37 k€ ; b) le rang 10 ; c) octobre.",
          schema: ecranSeulement(
            nuage([0, 12, 2, 20, 80, 10], [], { noms: ["rang du mois", "CA (k€)"], droites: [[4, 25]], lectures: [{ y: 65 }] }),
          ),
          micros: ["statT_ajust_calculer"],
        },
        {
          enonce:
            "Une diététicienne suit cinq patients pendant deux mois : $x$ est leur nombre moyen de pas par jour, en milliers ; $y$ leur perte de poids, en kg.\nPas : 3, 4, 6, 8, 9. Perte : 1, 2, 3, 4, 5.\nDeux droites sont proposées : $d_1$ : $y = 0{,}6x - 0{,}6$ et $d_2$ : $y = 0{,}5x + 0{,}5$.\na) Calcule les coordonnées du point moyen $G$.\nb) Quelle droite passe par $G$ ?\nc) Laquelle choisis-tu comme droite d'ajustement au jugé ?",
          correction:
            "a) $\\bar{x} = \\dfrac{3 + 4 + 6 + 8 + 9}{5} = \\dfrac{30}{5} = 6$ et $\\bar{y} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = \\dfrac{15}{5} = 3$. Donc $G(6 ; 3)$.\nb) Pour $x = 6$ : $d_1$ donne $0{,}6 \\times 6 - 0{,}6 = 3$, c'est $G$. $d_2$ donne $0{,}5 \\times 6 + 0{,}5 = 3{,}5$ : elle passe au-dessus de $G$.\nc) $d_1$, qui passe par $G$.\n⛔ Le piège : tester la droite avec un seul point du nuage. Le point qui résume tout le nuage, c'est $G$.\nRéponse : a) $G(6 ; 3)$ ; b) $d_1$ ; c) $d_1$.",
          schema: ecranSeulement(
            nuage([0, 10, 1, 0, 6, 1], [
              { x: 3, y: 1 },
              { x: 4, y: 2 },
              { x: 6, y: 3 },
              { x: 8, y: 4 },
              { x: 9, y: 5 },
            ], { noms: ["pas (milliers)", "perte (kg)"], droites: [[0.6, -0.6], [0.5, 0.5]], moyen: [6, 3] }),
          ),
          micros: ["statT_ajust_au_juge", "statT_ajust_equation"],
        },
        {
          enonce:
            "Un électricien compare la durée de ses chantiers, en heures, et le montant de ses factures, en DIZAINES d'euros. Il a tracé une droite d'ajustement.\na) Lis les coordonnées de deux points de la droite placés sur des nœuds du quadrillage.\nb) Déduis-en l'équation de la droite.\nc) Que représentent, pour l'électricien, les deux nombres de l'équation ?",
          figure: nuage([0, 9, 1, 0, 60, 10], [
            { x: 1, y: 14 },
            { x: 2, y: 21 },
            { x: 3, y: 24 },
            { x: 5, y: 34 },
            { x: 6, y: 41 },
            { x: 8, y: 52 },
          ], { noms: ["durée (h)", "facture (dizaines d'€)"], droites: [[5, 10]] }),
          correction:
            "a) La droite coupe l'axe vertical en $(0 ; 10)$ et passe par le nœud $(4 ; 30)$.\nb) $a = \\dfrac{30 - 10}{4 - 0} = \\dfrac{20}{4} = 5$. La droite coupe l'axe vertical à 10 : $b = 10$. Donc $y = 5x + 10$.\nc) $b = 10$ dizaines : 100 € facturés même pour un chantier très court, le déplacement. $a = 5$ dizaines : 50 € par heure de travail.\n⛔ Le piège : lire deux points du NUAGE au lieu de deux points de la DROITE. Les points rouges ne sont pas sur la droite.\nRéponse : a) $(0 ; 10)$ et $(4 ; 30)$ ; b) $y = 5x + 10$ ; c) 100 € de déplacement, 50 € de l'heure.",
          micros: ["statT_ajust_equation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur la même série : je juge le nuage, je trace la droite au jugé par le point moyen, je trouve son équation, puis je calcule.",
      rappel: [
        "Une droite qui passe par $G$ et de coefficient directeur $a$ : $b = \\bar{y} - a \\times \\bar{x}$.",
        "Une bonne droite au jugé laisse à peu près autant de points au-dessus qu'en dessous.",
        "Un point isolé, expliqué par un événement, s'écarte avant de tracer la droite.",
        "J'arrondis seulement le résultat final, comme le demande l'énoncé.",
      ],
      exercices: [
        {
          enonce:
            "Une ingénieure du climat étudie la concentration de CO₂ dans l'air, mesurée à l'observatoire de Mauna Loa (moyennes annuelles, source : NOAA). On note $x$ le rang de la décennie (1960 a le rang 0, 1970 le rang 1…) et $y$ la concentration en ppm.\na) Calcule les hausses d'une décennie à la suivante. Un ajustement affine est-il pertinent ?\nb) Calcule les coordonnées du point moyen $G$. Arrondis $\\bar{y}$ au dixième.\nc) Lina trace la droite $d$ qui passe par les points de 1960 et de 2020. Trouve son équation ; arrondis $a$ au dixième.\nd) La droite $d$ passe-t-elle par $G$ ?\ne) Écris l'équation de la droite $d'$ de même coefficient directeur qui passe par $G$. Que donne-t-elle pour 2020 ?",
          figure: grille(["année", "CO₂ (ppm)"], [
            [1960, 316.9],
            [1970, 325.7],
            [1980, 338.8],
            [1990, 354.4],
            [2000, 369.7],
            [2010, 389.9],
            [2020, 414.2],
          ]),
          correction:
            "a) $8{,}8$ ; $13{,}1$ ; $15{,}6$ ; $15{,}3$ ; $20{,}2$ ; $24{,}3$ ppm. Les hausses grandissent : le nuage se courbe un peu. Une droite reste une approximation acceptable sur ces 60 ans, mais elle va s'écarter des points récents.\nb) $\\bar{x} = \\dfrac{0 + 1 + 2 + 3 + 4 + 5 + 6}{7} = 3$ et $\\bar{y} = \\dfrac{2509{,}6}{7} \\approx 358{,}5$. Donc $G(3 ; 358{,}5)$.\nc) $a = \\dfrac{414{,}2 - 316{,}9}{6 - 0} = \\dfrac{97{,}3}{6} \\approx 16{,}2$. Pour $x = 0$, $y = 316{,}9$ : $b = 316{,}9$. Donc $d$ : $y = 16{,}2x + 316{,}9$.\nd) Pour $x = 3$ : $16{,}2 \\times 3 + 316{,}9 = 365{,}5$. Or $\\bar{y} \\approx 358{,}5$ : $d$ passe 7 ppm au-dessus de $G$. Non.\ne) $b = 358{,}5 - 16{,}2 \\times 3 = 358{,}5 - 48{,}6 = 309{,}9$. Donc $d'$ : $y = 16{,}2x + 309{,}9$.\nPour 2020 ($x = 6$) : $16{,}2 \\times 6 + 309{,}9 = 407{,}1$ ppm, contre 414,2 mesurés : 7,1 ppm d'écart. Le CO₂ monte de plus en plus vite.\n⛔ Le piège au c) : croire qu'une droite qui passe par deux points du nuage est une bonne droite d'ajustement. Elle doit passer au milieu de TOUS les points, donc par $G$.\nRéponse : b) $G(3 ; 358{,}5)$ ; c) $y = 16{,}2x + 316{,}9$ ; d) non ; e) $y = 16{,}2x + 309{,}9$, soit $407{,}1$ ppm en 2020.",
          schema: ecranSeulement(
            nuage([0, 7, 1, 300, 420, 20], [
              { x: 0, y: 316.9 },
              { x: 1, y: 325.7 },
              { x: 2, y: 338.8 },
              { x: 3, y: 354.4 },
              { x: 4, y: 369.7 },
              { x: 5, y: 389.9 },
              { x: 6, y: 414.2 },
            ], { noms: ["rang de la décennie", "CO₂ (ppm)"], droites: [[16.2, 309.9], [16.2, 316.9]], moyen: [3, 358.5] }),
          ),
          micros: ["statT_ajust_pertinence", "statT_ajust_au_juge", "statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          enonce:
            "Le responsable du service après-vente d'une marque d'électroménager compare, mois par mois, les ventes (en centaines d'appareils) et les appels reçus (en dizaines). Le mois $S$, un serveur informatique est tombé en panne.\nVentes : 2, 3, 4, 5, 6, 7, 8. Appels : 5, 7, 8, 19, 12, 13, 15.\na) Quel est le point $S$ ? Faut-il le garder pour ajuster le nuage ?\nb) Sans $S$, calcule les coordonnées du point moyen $G$.\nc) Écris l'équation de la droite qui passe par $G$ avec le coefficient directeur $1{,}7$.\nd) Combien d'appels prévoir un mois à 900 appareils vendus ?",
          figure: nuage([0, 9, 1, 0, 20, 4], [
            { x: 2, y: 5 },
            { x: 3, y: 7 },
            { x: 4, y: 8 },
            { x: 5, y: 19, label: "S" },
            { x: 6, y: 12 },
            { x: 7, y: 13 },
            { x: 8, y: 15 },
          ], { noms: ["ventes (centaines)", "appels (dizaines)"] }),
          correction:
            "a) $S(5 ; 19)$ : 190 appels, bien plus que ses voisins. Ces appels viennent de la panne, pas des ventes : on écarte $S$.\nb) $\\bar{x} = \\dfrac{2 + 3 + 4 + 6 + 7 + 8}{6} = \\dfrac{30}{6} = 5$ et $\\bar{y} = \\dfrac{5 + 7 + 8 + 12 + 13 + 15}{6} = \\dfrac{60}{6} = 10$. Donc $G(5 ; 10)$.\nc) $b = 10 - 1{,}7 \\times 5 = 10 - 8{,}5 = 1{,}5$. Donc $y = 1{,}7x + 1{,}5$.\nd) 900 appareils, ce sont 9 centaines : $y = 1{,}7 \\times 9 + 1{,}5 = 16{,}8$ dizaines, soit environ 168 appels.\n⛔ Le piège au b) : garder $S$ dans la moyenne. On trouverait $\\bar{y} \\approx 11{,}3$ : la panne tirerait toute la droite vers le haut.\nRéponse : a) $S(5 ; 19)$, on l'écarte ; b) $G(5 ; 10)$ ; c) $y = 1{,}7x + 1{,}5$ ; d) environ 168 appels.",
          micros: ["statT_ajust_pertinence", "statT_ajust_au_juge", "statT_ajust_calculer"],
        },
        {
          enonce:
            "Une agente de voyages compare la distance d'un trajet en train, en centaines de km, et le prix moyen du billet, en euros.\nDistance : 2, 3, 4, 5, 6, 7, 8. Prix : 35, 44, 52, 62, 70, 81, 90.\nElle trace au jugé la droite $d$ : $y = 9x + 17$.\na) Calcule les coordonnées du point moyen $G$. La droite $d$ passe-t-elle par $G$ ?\nb) Combien de points sont au-dessus de $d$, en dessous, ou dessus ?\nc) Avec $d$, estime le prix d'un trajet de 550 km.\nd) Que représente le nombre 17 ?",
          correction:
            "a) $\\bar{x} = \\dfrac{2 + 3 + 4 + 5 + 6 + 7 + 8}{7} = \\dfrac{35}{7} = 5$ et $\\bar{y} = \\dfrac{35 + 44 + 52 + 62 + 70 + 81 + 90}{7} = \\dfrac{434}{7} = 62$. Donc $G(5 ; 62)$.\nPour $x = 5$ : $9 \\times 5 + 17 = 62$. Oui, $d$ passe par $G$.\nb) La droite donne 35, 44, 53, 62, 71, 80 et 89. Je compare aux prix : 3 points sur la droite, 2 en dessous (52 et 70), 2 au-dessus (81 et 90). La droite est bien équilibrée.\nc) 550 km, c'est $x = 5{,}5$ : $y = 9 \\times 5{,}5 + 17 = 66{,}5$ €.\nd) Pour $x = 0$, $y = 17$ : la part du prix qui ne dépend pas de la distance, environ 17 €.\n⛔ Le piège au c) : remplacer $x$ par 550. L'axe compte en centaines de km.\nRéponse : a) $G(5 ; 62)$, oui ; b) 2 au-dessus, 2 en dessous, 3 dessus ; c) 66,5 € ; d) une part fixe de 17 €.",
          schema: ecranSeulement(
            nuage([0, 9, 1, 30, 100, 10], [
              { x: 2, y: 35 },
              { x: 3, y: 44 },
              { x: 4, y: 52 },
              { x: 5, y: 62 },
              { x: 6, y: 70 },
              { x: 7, y: 81 },
              { x: 8, y: 90 },
            ], { noms: ["distance (centaines de km)", "prix (€)"], droites: [[9, 17]], moyen: [5, 62] }),
          ),
          micros: ["statT_ajust_au_juge", "statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          enonce:
            "Dans un cabinet d'expertise comptable, deux stagiaires ajustent au jugé le temps de saisie mensuel, en heures, selon le nombre de factures, en centaines. Léa trace $d_1$ (bleue) : $y = 2{,}8x + 5{,}2$. Tom trace $d_2$ (verte) : $y = 2x + 9$.\nFactures : 1, 2, 3, 4, 5, 6. Heures : 8, 11, 13, 17, 19, 22.\na) Calcule les coordonnées du point moyen $G$.\nb) Quelle droite passe par $G$ ?\nc) Compare la droite de Tom aux mesures pour 100 et pour 600 factures. Que lui reproches-tu ?\nd) Avec la droite de Léa, estime le temps de saisie pour 450 factures.",
          figure: nuage([0, 7, 1, 4, 24, 4], [
            { x: 1, y: 8 },
            { x: 2, y: 11 },
            { x: 3, y: 13 },
            { x: 4, y: 17 },
            { x: 5, y: 19 },
            { x: 6, y: 22 },
          ], { noms: ["factures (centaines)", "saisie (h)"], droites: [[2.8, 5.2], [2, 9]] }),
          correction:
            "a) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3{,}5$ et $\\bar{y} = \\dfrac{8 + 11 + 13 + 17 + 19 + 22}{6} = \\dfrac{90}{6} = 15$. Donc $G(3{,}5 ; 15)$.\nb) Léa : $2{,}8 \\times 3{,}5 + 5{,}2 = 9{,}8 + 5{,}2 = 15$, c'est $G$. Tom : $2 \\times 3{,}5 + 9 = 16$, il passe au-dessus.\nc) Pour $x = 1$, Tom donne $2 \\times 1 + 9 = 11$ heures au lieu de 8 ; pour $x = 6$, $2 \\times 6 + 9 = 21$ au lieu de 22. Sa droite est trop haute à gauche, trop basse à droite : elle ne monte pas assez vite.\nd) $x = 4{,}5$ : $y = 2{,}8 \\times 4{,}5 + 5{,}2 = 12{,}6 + 5{,}2 = 17{,}8$ heures.\n⛔ Le piège : juger une droite sur un seul point. On regarde $G$, puis les deux bouts du nuage.\nRéponse : a) $G(3{,}5 ; 15)$ ; b) celle de Léa ; c) pente trop faible ; d) 17,8 heures.",
          micros: ["statT_ajust_au_juge", "statT_ajust_calculer"],
        },
        {
          enonce:
            "Un brasseur ajuste ses ventes de bière, en hectolitres par semaine, selon la température maximale moyenne de la semaine, en °C. Sa droite d'ajustement passe par le point moyen $G(22 ; 45)$ et par le point $P(30 ; 61)$.\na) Trouve l'équation de la droite.\nb) Quelles ventes prévoit-elle pour une semaine à 26 °C ?\nc) À partir de quelle température prévoit-elle 40 hectolitres ?",
          correction:
            "a) $a = \\dfrac{61 - 45}{30 - 22} = \\dfrac{16}{8} = 2$. La droite passe par $G$ : $45 = 2 \\times 22 + b$, donc $b = 45 - 44 = 1$. Donc $y = 2x + 1$.\nb) $y = 2 \\times 26 + 1 = 53$ hectolitres.\nc) Je résous $2x + 1 = 40$ : $2x = 39$, donc $x = 39 \\div 2 = 19{,}5$ °C.\n⛔ Le piège au a) : calculer $b$ avec $x$ et $y$ inversés, $22 = 2 \\times 45 + b$. Je remplace $x$ par l'abscisse, $y$ par l'ordonnée.\nRéponse : a) $y = 2x + 1$ ; b) 53 hL ; c) 19,5 °C.",
          schema: ecranSeulement(
            nuage([14, 34, 4, 20, 70, 10], [{ x: 30, y: 61, label: "P" }], { noms: ["température (°C)", "ventes (hL)"], droites: [[2, 1]], moyen: [22, 45] }),
          ),
          micros: ["statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          enonce:
            "La gérante d'un self-stockage loue des box de rangement. Elle a ajusté le loyer mensuel $y$, en euros, selon la surface $x$ du box, en m² : $y = 6{,}5x + 20$.\na) Quel loyer le modèle donne-t-il pour un box de 12 m² ?\nb) Un client dispose de 150 € par mois. Quelle surface peut-il louer ?\nc) Un concurrent loue 15 m² pour 100 €. Est-il moins cher que le modèle ?",
          correction:
            "a) $y = 6{,}5 \\times 12 + 20 = 78 + 20 = 98$ €.\nb) Je résous $6{,}5x + 20 = 150$ : $6{,}5x = 130$, donc $x = 130 \\div 6{,}5 = 20$ m².\nc) Pour 15 m², le modèle donne $6{,}5 \\times 15 + 20 = 117{,}5$ €. Le concurrent, à 100 €, est moins cher de $117{,}5 - 100 = 17{,}5$ €.\n⛔ Le piège au b) : diviser 150 par 6,5 sans retirer d'abord les 20 € fixes.\nRéponse : a) 98 € ; b) 20 m² ; c) oui, de 17,5 €.",
          schema: ecranSeulement(
            nuage([0, 25, 5, 0, 200, 25], [], { noms: ["surface (m²)", "loyer (€)"], droites: [[6.5, 20]], lectures: [{ x: 12 }, { y: 150 }] }),
          ),
          micros: ["statT_ajust_calculer"],
        },
        {
          enonce:
            "Une ingénieure environnement suit les émissions de CO₂ d'une usine, en kilotonnes, selon le rang de l'année depuis le début d'un plan de réduction. Elle a tracé une droite d'ajustement.\na) Lis deux points de la droite sur des nœuds du quadrillage, et trouve son équation.\nb) Que prévoit la droite pour l'année de rang 12 ?\nc) À partir de quel rang les émissions passent-elles sous 50 kilotonnes ?",
          figure: nuage([0, 12, 2, 10, 90, 10], [
            { x: 1, y: 76 },
            { x: 2, y: 69 },
            { x: 3, y: 66 },
            { x: 4, y: 61 },
            { x: 5, y: 54 },
            { x: 6, y: 51 },
            { x: 7, y: 44 },
            { x: 8, y: 41 },
          ], { noms: ["rang de l'année", "CO₂ (kt)"], droites: [[-5, 80]] }),
          correction:
            "a) La droite passe par $(0 ; 80)$ et par $(10 ; 30)$.\n$a = \\dfrac{30 - 80}{10 - 0} = \\dfrac{-50}{10} = -5$ et $b = 80$. Donc $y = -5x + 80$.\nb) $y = -5 \\times 12 + 80 = -60 + 80 = 20$ kilotonnes.\nc) Je résous $-5x + 80 = 50$ : $-5x = -30$, donc $x = 6$. Au-delà du rang 6, la droite passe sous 50 : à partir du rang 7.\n⛔ Le piège au a) : oublier le signe moins. La droite descend : son coefficient directeur est négatif.\nRéponse : a) $y = -5x + 80$ ; b) 20 kt ; c) à partir du rang 7.",
          micros: ["statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          enonce:
            "Une conseillère en rénovation énergétique a relevé, sur des maisons semblables isolées de 0 à 30 cm, la consommation de chauffage en kWh par mois. Elle l'ajuste par $y = -12x + 450$, où $x$ est l'épaisseur d'isolant en cm.\na) Que donne le modèle pour 20 cm d'isolant ?\nb) Quelle épaisseur faut-il pour descendre sous 300 kWh par mois ?\nc) Que donne le modèle pour 40 cm ? Qu'en penses-tu ?",
          correction:
            "a) $y = -12 \\times 20 + 450 = -240 + 450 = 210$ kWh par mois.\nb) Je résous $-12x + 450 = 300$ : $-12x = -150$, donc $x = 12{,}5$. Il faut plus de 12,5 cm d'isolant.\nc) $y = -12 \\times 40 + 450 = -480 + 450 = -30$ kWh : une consommation négative, c'est absurde. L'ajustement n'a été fait qu'entre 0 et 30 cm : au-delà, la droite ne décrit plus rien.\n⛔ Le piège au c) : croire le modèle partout. Une droite d'ajustement ne vaut que là où on a des mesures.\nRéponse : a) 210 kWh ; b) plus de 12,5 cm ; c) $-30$ kWh, absurde.",
          schema: ecranSeulement(
            nuage([0, 40, 5, 0, 500, 100], [], { noms: ["isolant (cm)", "chauffage (kWh/mois)"], droites: [[-12, 450]], lectures: [{ x: 20 }, { y: 300 }] }),
          ),
          micros: ["statT_ajust_pertinence", "statT_ajust_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation complète : je juge le nuage, je calcule le point moyen, je trouve l'équation de la droite, je calcule, puis je critique le modèle.",
      rappel: [
        "Les étapes : nuage, pertinence, point moyen $G$, droite par $G$, équation, calcul, critique.",
        "Le coefficient directeur se lit comme une vitesse : tant de $y$ en plus pour 1 de $x$ en plus.",
        "Une droite ne vaut que dans la zone des mesures, et seulement si le nuage s'allonge vraiment le long d'elle.",
      ],
      exercices: [
        {
          titre: "Le food truck",
          enonce:
            "Le gérant d'un food truck relève, sur sept jours de marché, la température maximale et le nombre de repas vendus. Il veut prévoir ses achats.\na) Construis le nuage. Un ajustement affine est-il pertinent ?\nb) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nc) Il choisit la droite de coefficient directeur $2{,}5$ qui passe par $G$. Trouve son équation ; arrondis $b$ à l'unité.\nd) Combien de repas prévoir un jour à 26 °C ?\ne) À partir de quelle température la droite prévoit-elle 95 repas ?",
          figure: grille(["température (°C)", "repas vendus"], [
            [15, 62],
            [18, 70],
            [20, 74],
            [23, 83],
            [25, 88],
            [28, 95],
            [30, 100],
          ]),
          correction:
            "a) Sept points, de $(15 ; 62)$ à $(30 ; 100)$ : ils montent et se rapprochent d'une droite. Oui, un ajustement affine est pertinent.\nb) $\\bar{x} = \\dfrac{15 + 18 + 20 + 23 + 25 + 28 + 30}{7} = \\dfrac{159}{7} \\approx 22{,}7$ et $\\bar{y} = \\dfrac{62 + 70 + 74 + 83 + 88 + 95 + 100}{7} = \\dfrac{572}{7} \\approx 81{,}7$. Donc $G(22{,}7 ; 81{,}7)$.\nc) $b = 81{,}7 - 2{,}5 \\times 22{,}7 = 81{,}7 - 56{,}75 = 24{,}95$, soit environ 25. Donc $y = 2{,}5x + 25$.\nd) $y = 2{,}5 \\times 26 + 25 = 65 + 25 = 90$ repas.\ne) Je résous $2{,}5x + 25 = 95$ : $2{,}5x = 70$, donc $x = 70 \\div 2{,}5 = 28$ °C.\n⭐ Le coefficient $2{,}5$ se lit : un degré de plus, deux à trois repas de plus.\n⛔ Le piège au c) : arrondir $\\bar{x}$ à 23 avant de calculer $b$. On trouverait $81{,}7 - 57{,}5 = 24{,}2$, puis 24 : l'arrondi se fait à la fin.\nRéponse : b) $G(22{,}7 ; 81{,}7)$ ; c) $y = 2{,}5x + 25$ ; d) 90 repas ; e) 28 °C.",
          schema: ecranSeulement(
            nuage([10, 35, 5, 50, 110, 10], [
              { x: 15, y: 62 },
              { x: 18, y: 70 },
              { x: 20, y: 74 },
              { x: 23, y: 83 },
              { x: 25, y: 88 },
              { x: 28, y: 95 },
              { x: 30, y: 100 },
            ], { noms: ["température (°C)", "repas vendus"], droites: [[2.5, 25]], moyen: [22.7, 81.7] }),
          ),
          micros: ["statT_ajust_pertinence", "statT_ajust_au_juge", "statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          titre: "La masse salariale d'une PME",
          enonce:
            "Un contrôleur de gestion compare six PME d'un même secteur : leur effectif et leur masse salariale annuelle (salaires et cotisations), en milliers d'euros.\na) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nb) Il ajuste le nuage par la droite de coefficient directeur 40 qui passe par $G$. Montre que $b = \\dfrac{5630 - 5600}{6}$, puis écris l'équation.\nc) Que représente le nombre 40 ?\nd) Quelle masse salariale la droite donne-t-elle pour une PME de 35 salariés ?\ne) Une PME a un budget de 1 300 k€ pour ses salaires. Combien de salariés peut-elle employer, au plus ?",
          figure: grille(["effectif", "masse salariale (k€)"], [
            [10, 420],
            [15, 610],
            [20, 800],
            [25, 1010],
            [30, 1180],
            [40, 1610],
          ]),
          correction:
            "a) $\\bar{x} = \\dfrac{10 + 15 + 20 + 25 + 30 + 40}{6} = \\dfrac{140}{6} \\approx 23{,}3$ et $\\bar{y} = \\dfrac{420 + 610 + 800 + 1010 + 1180 + 1610}{6} = \\dfrac{5630}{6} \\approx 938{,}3$. Donc $G(23{,}3 ; 938{,}3)$.\nb) $b = \\bar{y} - 40 \\times \\bar{x} = \\dfrac{5630}{6} - 40 \\times \\dfrac{140}{6} = \\dfrac{5630 - 5600}{6} = 5$. Donc $y = 40x + 5$.\nc) Un salarié de plus, c'est environ 40 k€ de plus par an : le coût moyen d'un salarié pour l'entreprise.\nd) $y = 40 \\times 35 + 5 = 1405$ k€.\ne) Je résous $40x + 5 = 1300$ : $40x = 1295$, donc $x = 1295 \\div 40 = 32{,}375$. Au plus 32 salariés.\n⛔ Le piège au b) : calculer $b$ avec les valeurs arrondies, $938{,}3 - 40 \\times 23{,}3 = 6{,}3$. Avec les fractions exactes, on trouve 5.\n⛔ Le piège au e) : arrondir 32,375 à 33. Avec 33 salariés, on dépasse le budget.\nRéponse : a) $G(23{,}3 ; 938{,}3)$ ; b) $y = 40x + 5$ ; d) 1 405 k€ ; e) 32 salariés.",
          schema: ecranSeulement(
            nuage([0, 45, 5, 0, 1800, 300], [
              { x: 10, y: 420 },
              { x: 15, y: 610 },
              { x: 20, y: 800 },
              { x: 25, y: 1010 },
              { x: 30, y: 1180 },
              { x: 40, y: 1610 },
            ], { noms: ["effectif", "masse salariale (k€)"], droites: [[40, 5]], moyen: [23.3, 938.3] }),
          ),
          micros: ["statT_ajust_au_juge", "statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          titre: "Le festival",
          enonce:
            "La directrice d'un festival de musique compare, sur six éditions, le nombre d'artistes programmés et le nombre de spectateurs, en milliers.\nArtistes : 4, 6, 8, 10, 12, 14. Spectateurs : 9, 12, 16, 18, 23, 25.\na) Calcule les coordonnées du point moyen $G$. Arrondis au dixième.\nb) Elle trace la droite qui passe par le premier et le dernier point du nuage. Trouve son équation.\nc) Cette droite passe-t-elle près de $G$ ? Peut-elle servir de droite d'ajustement au jugé ?\nd) Combien de spectateurs prévoit-elle avec 16 artistes ?\ne) Combien d'artistes faut-il programmer pour attendre 20 000 spectateurs ?",
          figure: nuage([2, 16, 2, 4, 28, 4], [
            { x: 4, y: 9 },
            { x: 6, y: 12 },
            { x: 8, y: 16 },
            { x: 10, y: 18 },
            { x: 12, y: 23 },
            { x: 14, y: 25 },
          ], { noms: ["artistes", "spectateurs (milliers)"] }),
          correction:
            "a) $\\bar{x} = \\dfrac{4 + 6 + 8 + 10 + 12 + 14}{6} = \\dfrac{54}{6} = 9$ et $\\bar{y} = \\dfrac{9 + 12 + 16 + 18 + 23 + 25}{6} = \\dfrac{103}{6} \\approx 17{,}2$. Donc $G(9 ; 17{,}2)$.\nb) Elle passe par $(4 ; 9)$ et $(14 ; 25)$ : $a = \\dfrac{25 - 9}{14 - 4} = \\dfrac{16}{10} = 1{,}6$ et $b = 9 - 1{,}6 \\times 4 = 9 - 6{,}4 = 2{,}6$. Donc $y = 1{,}6x + 2{,}6$.\nc) Pour $x = 9$ : $1{,}6 \\times 9 + 2{,}6 = 17$, à $0{,}2$ de $\\bar{y}$. Oui, elle passe tout près de $G$ : elle convient au jugé.\nd) $y = 1{,}6 \\times 16 + 2{,}6 = 28{,}2$ milliers, soit environ 28 200 spectateurs.\ne) Je résous $1{,}6x + 2{,}6 = 20$ : $1{,}6x = 17{,}4$, donc $x = 17{,}4 \\div 1{,}6 = 10{,}875$. Il faut programmer 11 artistes.\n⛔ Le piège au e) : arrondir 10,875 à 10. Avec 10 artistes, la droite prévoit moins de 20 000 spectateurs.\nRéponse : a) $G(9 ; 17{,}2)$ ; b) $y = 1{,}6x + 2{,}6$ ; c) oui ; d) environ 28 200 ; e) 11 artistes.",
          schema: ecranSeulement(
            nuage([2, 16, 2, 4, 28, 4], [
              { x: 4, y: 9 },
              { x: 6, y: 12 },
              { x: 8, y: 16 },
              { x: 10, y: 18 },
              { x: 12, y: 23 },
              { x: 14, y: 25 },
            ], { noms: ["artistes", "spectateurs (milliers)"], droites: [[1.6, 2.6]], moyen: [9, 17.2] }),
          ),
          micros: ["statT_ajust_au_juge", "statT_ajust_equation", "statT_ajust_calculer"],
        },
        {
          titre: "La voiture électrique",
          enonce:
            "Une ingénieure en mobilité électrique mesure la consommation d'une voiture électrique, en kWh pour 100 km, à cinq vitesses stabilisées.\na) Calcule les hausses de consommation d'une vitesse à la suivante.\nb) Un collègue trace la droite qui passe par les points à 50 et à 130 km/h. Trouve son équation.\nc) Que donne cette droite à 90 km/h ? Compare à la mesure.\nd) Calcule le point moyen $G$. La droite passe-t-elle par $G$ ?\ne) Un ajustement affine est-il pertinent ici ?",
          figure: grille(["vitesse (km/h)", "conso (kWh/100 km)"], [
            [50, 12],
            [70, 14],
            [90, 17],
            [110, 21],
            [130, 26],
          ]),
          correction:
            "a) $14 - 12 = 2$ ; $17 - 14 = 3$ ; $21 - 17 = 4$ ; $26 - 21 = 5$ kWh.\nb) $a = \\dfrac{26 - 12}{130 - 50} = \\dfrac{14}{80} = 0{,}175$ et $b = 12 - 0{,}175 \\times 50 = 12 - 8{,}75 = 3{,}25$. Donc $y = 0{,}175x + 3{,}25$.\nc) $y = 0{,}175 \\times 90 + 3{,}25 = 15{,}75 + 3{,}25 = 19$ kWh, contre 17 mesurés : la droite surestime de 2 kWh.\nd) $\\bar{x} = \\dfrac{50 + 70 + 90 + 110 + 130}{5} = 90$ et $\\bar{y} = \\dfrac{12 + 14 + 17 + 21 + 26}{5} = \\dfrac{90}{5} = 18$. $G(90 ; 18)$ ; la droite donne 19 en 90 : elle passe au-dessus de $G$.\ne) Peu pertinent : les hausses grandissent, de 2 à 5, le nuage se courbe. La résistance de l'air croît beaucoup plus vite que la vitesse.\n⛔ Le piège : conclure « affine » parce que la consommation augmente avec la vitesse. Elle augmente de plus en plus vite.\nRéponse : b) $y = 0{,}175x + 3{,}25$ ; c) 19 au lieu de 17 ; d) $G(90 ; 18)$, non ; e) peu pertinent.",
          schema: ecranSeulement(
            nuage([40, 140, 20, 8, 28, 4], [
              { x: 50, y: 12 },
              { x: 70, y: 14 },
              { x: 90, y: 17 },
              { x: 110, y: 21 },
              { x: 130, y: 26 },
            ], { noms: ["vitesse (km/h)", "conso (kWh/100 km)"], droites: [[0.175, 3.25]], moyen: [90, 18] }),
          ),
          micros: ["statT_ajust_pertinence", "statT_ajust_equation", "statT_ajust_calculer"],
        },
      ],
    },
  ],
};
