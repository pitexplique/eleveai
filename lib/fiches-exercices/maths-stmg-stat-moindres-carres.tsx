// ─── Fiche d'exercices : la méthode des moindres carrés (Tle STMG) — 20 ex. ──
//
// Troisième des cinq feuilles STMG « séries statistiques à deux variables »
// (22/10/2026), après `maths-stmg-stat-nuage.tsx` et
// `maths-stmg-stat-ajustement.tsx` (mêmes dessins, même ton). Alignée sur la
// banque `lib/tutor-v4/questionBank/stmg/maths/statistique-deux-variables.
// bank.ts`, notion stat_moindres_carres : le PRINCIPE (la droite qui rend
// minimale la somme des carrés des écarts verticaux, donnée par la
// calculatrice, qui passe par G), CALCULER la somme des carrés des écarts
// d'une droite donnée, COMPARER deux droites par cette somme.
// ⛔ « Aucun développement théorique n'est attendu » (BO) : aucune formule de
// a et b ; la calculatrice ou le tableur donnent les coefficients, ARRONDIS
// comme l'énoncé l'annonce. Chaque somme se fait à la main sur 3 à 6 points,
// dans un tableau (valeur observée, valeur de la droite, écart, carré).
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 17 — abonnés payants de Spotify en fin d'année (rapports
//     trimestriels de Spotify, en millions) : 2017 71 ; 2018 96 ; 2019 124 ;
//     2020 155 ; 2021 180 ; 2022 205 ; 2023 236 ; 2024 263.
// Le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
// Métiers, un par exercice : gérant de salle d'escalade, podcasteuse,
// caviste, analyste vidéo d'un club de basket, chargé d'études d'une agence
// d'intérim, chargée de communication d'un musée, stagiaire en contrôle de
// gestion, responsable d'un parc de loisirs, responsable e-commerce,
// responsable d'une boutique en ligne, loueuse de vélos, formatrice à
// l'INSEE, responsable RSE, data analyst d'une enseigne de sport,
// professeure d'EPS, notaire, analyste de l'industrie musicale, responsable
// développement durable d'un hôtel, contrôleuse de gestion industrielle,
// responsable des caisses d'un supermarché.
//
// ⭐ Les dessins : `nuage` (droites, écarts en pointillés rouges, G) et
// `grille`, de `stmg-deux-variables-figures.tsx`. 14 imprimés.
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-stat-moindres-carres.mjs`
// (chaque écart, chaque carré, chaque somme ; chaque droite « de la
// calculatrice » recalculée par les moindres carrés et comparée à l'arrondi
// annoncé).
//
// Micro-compétences : statT_mc_principe (1, 5, 6, 7, 9, 10, 12, 13, 14, 17,
// 19, 20), statT_mc_calculer (2, 3, 8, 9, 11, 13, 15, 16, 17, 18, 19, 20),
// statT_mc_comparer (4, 7, 9, 10, 11, 14, 15, 16, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesStatMoindresCarresStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "stat-moindres-carres",
  titre: "La méthode des moindres carrés",
  accroche:
    "Vingt exercices, du geste seul au problème : comprendre ce que la droite des moindres carrés rend le plus petit possible, calculer à la main la somme des carrés des écarts d'une droite, comparer deux droites, et se servir de la droite donnée par la calculatrice. Les abonnés de Spotify, la consommation d'eau d'un hôtel, le coût de production d'une usine, l'attente aux caisses. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le tableau des écarts et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un écart, calculer une somme de carrés, comparer deux droites ou utiliser la droite de la calculatrice.",
      rappel: [
        "L'écart d'un point à une droite se mesure à la verticale : valeur observée moins valeur donnée par la droite.",
        "La somme des carrés des écarts : j'élève chaque écart au carré, puis j'additionne. Un carré n'est jamais négatif.",
        "La droite des moindres carrés est celle qui rend cette somme la plus petite possible. La calculatrice la donne ; elle passe par le point moyen $G$.",
        "De deux droites, la meilleure au sens des moindres carrés est celle qui a la plus petite somme des carrés des écarts.",
      ],
      exercices: [
        {
          enonce:
            "Le gérant d'une salle d'escalade suit le nombre d'adhérents, en dizaines, selon le rang du mois depuis l'ouverture. La calculatrice donne la droite des moindres carrés $y = 2{,}1x + 9{,}9$ (coefficients arrondis au dixième). Les traits rouges sont tracés entre chaque point et la droite.\na) Que représente chaque trait rouge ?\nb) Quelle quantité la droite des moindres carrés rend-elle la plus petite possible ?\nc) Pourquoi élever les écarts au carré, au lieu de les additionner tels quels ?",
          figure: nuage([0, 7, 1, 10, 26, 2], [
            { x: 1, y: 12 },
            { x: 2, y: 15 },
            { x: 3, y: 15 },
            { x: 4, y: 19 },
            { x: 5, y: 20 },
            { x: 6, y: 23 },
          ], { noms: ["rang du mois", "adhérents (dizaines)"], droites: [[2.1, 9.9]], ecarts: true }),
          correction:
            "a) L'écart vertical entre un point du nuage et la droite : la différence entre le nombre d'adhérents observé et celui que donne la droite, le même mois.\nb) La somme des carrés de ces écarts. Aucune autre droite ne donne une somme plus petite.\nc) Certains points sont au-dessus de la droite (écart positif), d'autres en dessous (écart négatif) : additionnés, ils se compenseraient, et une très mauvaise droite pourrait avoir une somme nulle. Un carré est toujours positif ou nul : rien ne se compense.\n⛔ Le piège au a) : mesurer la distance la plus courte, en biais. L'écart se mesure à la verticale, à $x$ fixé.\nRéponse : a) l'écart vertical ; b) la somme des carrés des écarts ; c) pour que les écarts ne se compensent pas.",
          micros: ["statT_mc_principe"],
        },
        {
          enonce:
            "Une podcasteuse compare le nombre d'épisodes publiés dans le mois et les écoutes, en centaines. Elle teste la droite $d$ : $y = 5x + 8$.\nÉpisodes : 1, 2, 3. Écoutes : 14, 17, 24.\na) Calcule la valeur donnée par $d$ pour chaque nombre d'épisodes.\nb) Calcule chaque écart, puis chaque carré.\nc) Calcule la somme des carrés des écarts.",
          correction:
            "a) $5 \\times 1 + 8 = 13$ ; $5 \\times 2 + 8 = 18$ ; $5 \\times 3 + 8 = 23$.\nb) Écarts : $14 - 13 = 1$ ; $17 - 18 = -1$ ; $24 - 23 = 1$. Carrés : $1^2 = 1$ ; $(-1)^2 = 1$ ; $1^2 = 1$.\nc) $1 + 1 + 1 = 3$.\n⛔ Le piège au b) : écrire $(-1)^2 = -1$. Le carré d'un nombre négatif est positif.\nRéponse : la somme des carrés des écarts vaut 3.",
          schema: ecranSeulement(
            nuage([0, 4, 1, 10, 26, 2], [
              { x: 1, y: 14 },
              { x: 2, y: 17 },
              { x: 3, y: 24 },
            ], { noms: ["épisodes", "écoutes (centaines)"], droites: [[5, 8]], ecarts: true }),
          ),
          micros: ["statT_mc_calculer"],
        },
        {
          enonce:
            "Un caviste compare le prix d'une bouteille et ses ventes du mois, en dizaines. Il ajuste par la droite $d$ : $y = -2x + 30$.\na) Recopie le tableau et ajoute trois colonnes : la valeur donnée par $d$, l'écart, le carré de l'écart.\nb) Calcule la somme des carrés des écarts.",
          figure: grille(["prix (€)", "ventes (dizaines)"], [
            [5, 21],
            [7, 15],
            [9, 13],
            [11, 7],
          ]),
          correction:
            "a) Pour 5 € : $-2 \\times 5 + 30 = 20$, écart $21 - 20 = 1$, carré 1.\nPour 7 € : $-2 \\times 7 + 30 = 16$, écart $15 - 16 = -1$, carré 1.\nPour 9 € : $-2 \\times 9 + 30 = 12$, écart $13 - 12 = 1$, carré 1.\nPour 11 € : $-2 \\times 11 + 30 = 8$, écart $7 - 8 = -1$, carré 1.\nb) $1 + 1 + 1 + 1 = 4$.\n⛔ Le piège : additionner les écarts, $1 - 1 + 1 - 1 = 0$, et croire la droite parfaite. Ce sont les CARRÉS qu'on additionne.\nRéponse : la somme des carrés des écarts vaut 4.",
          schema: ecranSeulement(
            grille(["prix", "ventes", "droite", "écart", "carré"], [
              [5, 21, 20, 1, 1],
              [7, 15, 16, "−1", 1],
              [9, 13, 12, 1, 1],
              [11, 7, 8, "−1", 1],
            ]),
          ),
          micros: ["statT_mc_calculer"],
        },
        {
          enonce:
            "L'analyste vidéo d'un club de basket compare les minutes jouées par cinq joueuses, en dizaines, et leurs points marqués sur la saison, en dizaines. Le tableur donne, pour deux droites :\n$d_1$ : $y = 3x + 2$, somme des carrés des écarts : 4 ;\n$d_2$ : $y = 3{,}2x + 1{,}4$, somme des carrés des écarts : 3,6.\nMinutes : 1, 2, 3, 4, 5. Points : 4, 9, 10, 15, 17.\na) Laquelle des deux droites est la meilleure au sens des moindres carrés ?\nb) $d_2$ est la droite donnée par la calculatrice. Peut-on trouver une droite dont la somme des carrés des écarts vaut 3 ?",
          correction:
            "a) $3{,}6 < 4$ : la somme des carrés des écarts de $d_2$ est la plus petite. $d_2$ est la meilleure au sens des moindres carrés.\nb) Non. La droite de la calculatrice est celle des moindres carrés : aucune droite ne fait mieux que 3,6.\n⛔ Le piège au a) : choisir la droite qui a la plus GRANDE somme. Une somme de carrés mesure l'erreur : plus elle est petite, mieux la droite colle au nuage.\nRéponse : a) $d_2$ ; b) non, 3,6 est le minimum.",
          schema: ecranSeulement(
            nuage([0, 6, 1, 0, 20, 4], [
              { x: 1, y: 4 },
              { x: 2, y: 9 },
              { x: 3, y: 10 },
              { x: 4, y: 15 },
              { x: 5, y: 17 },
            ], { noms: ["minutes (dizaines)", "points (dizaines)"], droites: [[3.2, 1.4], [3, 2]] }),
          ),
          micros: ["statT_mc_comparer"],
        },
        {
          enonce:
            "Un chargé d'études d'une agence d'intérim suit le nombre de missions signées, en dizaines, selon le rang de la semaine. Sa calculatrice donne la droite des moindres carrés $y = 1{,}5x + 4$.\nSemaine : 2, 4, 6, 8, 10. Missions : 8, 11, 9, 17, 20.\na) Calcule les coordonnées du point moyen $G$.\nb) Vérifie que $G$ est sur la droite de la calculatrice.\nc) Est-ce un hasard ?",
          correction:
            "a) $\\bar{x} = \\dfrac{2 + 4 + 6 + 8 + 10}{5} = \\dfrac{30}{5} = 6$ et $\\bar{y} = \\dfrac{8 + 11 + 9 + 17 + 20}{5} = \\dfrac{65}{5} = 13$. Donc $G(6 ; 13)$.\nb) $1{,}5 \\times 6 + 4 = 9 + 4 = 13$ : $G$ est sur la droite.\nc) Non : la droite des moindres carrés passe TOUJOURS par le point moyen. C'est un moyen de contrôler ce qu'on a tapé sur la calculatrice.\n⛔ Le piège au a) : prendre le point du milieu du tableau, $(6 ; 9)$. Le point moyen se calcule avec toutes les valeurs.\nRéponse : a) $G(6 ; 13)$ ; b) oui ; c) non, c'est toujours vrai.",
          schema: ecranSeulement(
            nuage([0, 12, 2, 4, 24, 4], [
              { x: 2, y: 8 },
              { x: 4, y: 11 },
              { x: 6, y: 9 },
              { x: 8, y: 17 },
              { x: 10, y: 20 },
            ], { noms: ["rang de la semaine", "missions (dizaines)"], droites: [[1.5, 4]], moyen: [6, 13] }),
          ),
          micros: ["statT_mc_principe"],
        },
        {
          enonce:
            "Une chargée de communication d'un musée compare le budget de communication d'une exposition, en milliers d'euros, et le nombre de visiteurs, en milliers. Sa calculatrice donne la droite des moindres carrés $y = 2{,}11x + 7{,}08$ (coefficients arrondis au centième).\na) Avec cette droite, estime le nombre de visiteurs pour un budget de 7 000 €.\nb) Que représente le nombre $2{,}11$ ?\nc) Le point moyen est $G(5{,}5 ; 18{,}67)$. Calcule l'ordonnée du point de la droite d'abscisse $5{,}5$. Pourquoi ne tombe-t-on pas exactement sur $18{,}67$ ?",
          figure: grille(["budget (k€)", "visiteurs (milliers)"], [
            [2, 11],
            [3, 14],
            [5, 17],
            [6, 20],
            [8, 24],
            [9, 26],
          ]),
          correction:
            "a) 7 000 €, c'est $x = 7$ : $y = 2{,}11 \\times 7 + 7{,}08 = 14{,}77 + 7{,}08 = 21{,}85$ milliers, soit environ 21 850 visiteurs.\nb) Chaque millier d'euros de plus apporte environ 2 110 visiteurs de plus.\nc) $2{,}11 \\times 5{,}5 + 7{,}08 = 11{,}605 + 7{,}08 = 18{,}685$, soit environ $18{,}69$. La droite passe par $G$, mais ses coefficients sont ARRONDIS au centième : le calcul tombe tout près, pas pile.\n⛔ Le piège au a) : remplacer $x$ par 7 000. Le budget est compté en milliers d'euros.\nRéponse : a) environ 21 850 visiteurs ; b) 2 110 visiteurs par millier d'euros ; c) $18{,}685$, à cause des arrondis.",
          micros: ["statT_mc_principe"],
        },
        {
          enonce:
            "Un stagiaire en contrôle de gestion veut comparer deux droites en ADDITIONNANT les écarts, sans les élever au carré. Pour le nuage $(1 ; 13)$, $(2 ; 15)$, $(3 ; 15)$, $(4 ; 18)$, il teste $d_1$ : $y = 0{,}5x + 14$ et $d_2$ : $y = 2x + 10$.\na) Calcule les écarts de chaque droite, puis leur somme.\nb) Calcule la somme des carrés des écarts de chaque droite.\nc) Quelle droite le stagiaire choisirait-il ? Laquelle est la meilleure au sens des moindres carrés ?",
          correction:
            "a) $d_1$ donne $14{,}5$ ; $15$ ; $15{,}5$ ; $16$. Écarts : $-1{,}5$ ; $0$ ; $-0{,}5$ ; $2$. Somme : $0$.\n$d_2$ donne $12$ ; $14$ ; $16$ ; $18$. Écarts : $1$ ; $1$ ; $-1$ ; $0$. Somme : $1$.\nb) $d_1$ : $2{,}25 + 0 + 0{,}25 + 4 = 6{,}5$. $d_2$ : $1 + 1 + 1 + 0 = 3$.\nc) Le stagiaire choisirait $d_1$, dont les écarts se compensent jusqu'à 0. Mais $d_1$ est presque plate et s'écarte des deux bouts du nuage : au sens des moindres carrés, $d_2$ est bien meilleure, $3 < 6{,}5$.\n⛔ Le piège : croire qu'une somme d'écarts nulle veut dire une droite parfaite. Les écarts positifs et négatifs se sont annulés.\nRéponse : a) 0 et 1 ; b) 6,5 et 3 ; c) le stagiaire prendrait $d_1$, la meilleure est $d_2$.",
          schema: ecranSeulement(
            nuage([0, 5, 1, 10, 20, 2], [
              { x: 1, y: 13 },
              { x: 2, y: 15 },
              { x: 3, y: 15 },
              { x: 4, y: 18 },
            ], { droites: [[2, 10], [0.5, 14]], ecarts: true }),
          ),
          micros: ["statT_mc_principe", "statT_mc_comparer"],
        },
        {
          enonce:
            "Le responsable d'un parc de loisirs compare le rang du week-end dans la saison et les entrées, en centaines. Il a tracé la droite $y = 2x + 2$ et les écarts de chaque point.\na) Lis chaque écart sur le dessin.\nb) Calcule la somme des carrés des écarts.",
          figure: nuage([0, 6, 1, 0, 14, 2], [
            { x: 1, y: 5 },
            { x: 2, y: 5 },
            { x: 3, y: 9 },
            { x: 4, y: 9 },
            { x: 5, y: 12 },
          ], { noms: ["rang du week-end", "entrées (centaines)"], droites: [[2, 2]], ecarts: true }),
          correction:
            "La droite passe par $(1 ; 4)$, $(2 ; 6)$, $(3 ; 8)$, $(4 ; 10)$ et $(5 ; 12)$.\na) Le point d'abscisse 1 est au milieu, entre 4 et 6 : 5, soit un écart $5 - 4 = 1$. En 2 : $5 - 6 = -1$. En 3 : $9 - 8 = 1$. En 4 : $9 - 10 = -1$. En 5 : le point est sur la droite, $12 - 12 = 0$.\nb) $1 + 1 + 1 + 1 + 0 = 4$.\n⛔ Le piège : compter le point sur la droite comme un écart de 1. Un point sur la droite a un écart nul.\nRéponse : a) $1$ ; $-1$ ; $1$ ; $-1$ ; $0$ ; b) 4.",
          micros: ["statT_mc_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur la même série : je dresse le tableau des écarts, je calcule les sommes de carrés, je compare, puis je conclus par une phrase.",
      rappel: [
        "Le tableau des écarts : $x$, $y$ observé, $y$ de la droite, écart, carré. La somme se fait sur la dernière colonne.",
        "Passer par $G$ ne suffit pas : parmi toutes les droites qui passent par $G$, une seule a la plus petite somme.",
        "Un point très écarté pèse lourd : son écart au carré peut valoir plus que tous les autres réunis.",
        "J'arrondis les coefficients donnés par la calculatrice comme l'énoncé le demande, et seulement à la fin.",
      ],
      exercices: [
        {
          enonce:
            "Un responsable e-commerce compare les visites du site, en milliers par jour, et les commandes, en dizaines. Il hésite entre $d_1$ (verte) : $y = 2x + 1$ et $d_2$ (bleue) : $y = 1{,}8x + 1{,}2$.\nVisites : 1, 2, 3, 4, 5. Commandes : 3, 5, 6, 9, 10.\na) Dresse le tableau des écarts de $d_1$ et calcule la somme de leurs carrés.\nb) Même travail pour $d_2$.\nc) Quelle droite est la meilleure au sens des moindres carrés ?\nd) La calculatrice donne $y = 1{,}8x + 1{,}2$. Était-ce prévisible ?",
          figure: nuage([0, 6, 1, 0, 12, 2], [
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 6 },
            { x: 4, y: 9 },
            { x: 5, y: 10 },
          ], { noms: ["visites (milliers)", "commandes (dizaines)"], droites: [[1.8, 1.2], [2, 1]] }),
          correction:
            "a) $d_1$ donne 3, 5, 7, 9, 11. Écarts : $0$ ; $0$ ; $-1$ ; $0$ ; $-1$. Carrés : 0, 0, 1, 0, 1. Somme : 2.\nb) $d_2$ donne $3$ ; $4{,}8$ ; $6{,}6$ ; $8{,}4$ ; $10{,}2$. Écarts : $0$ ; $0{,}2$ ; $-0{,}6$ ; $0{,}6$ ; $-0{,}2$. Carrés : $0$ ; $0{,}04$ ; $0{,}36$ ; $0{,}36$ ; $0{,}04$. Somme : $0{,}8$.\nc) $0{,}8 < 2$ : $d_2$ est la meilleure.\nd) Oui : $d_2$ est la droite des moindres carrés, celle de la calculatrice. Aucune droite ne peut avoir une somme plus petite que $0{,}8$.\n⛔ Le piège : préférer $d_1$ parce que trois points tombent pile dessus. Ce qui compte, c'est la somme de TOUS les carrés.\nRéponse : a) 2 ; b) $0{,}8$ ; c) $d_2$ ; d) oui.",
          micros: ["statT_mc_principe", "statT_mc_calculer", "statT_mc_comparer"],
        },
        {
          enonce:
            "La responsable d'une boutique en ligne suit ses commandes hebdomadaires, en centaines, sur six semaines. La semaine 6 est celle du Black Friday (point $B$).\nCommandes : 10, 12, 15, 16, 19, 40.\nSa calculatrice donne, avec les coefficients arrondis au centième :\nsans $B$ : $y = 2{,}2x + 7{,}8$ ;\navec $B$ : $y = 4{,}91x + 1{,}47$.\na) Avec chaque droite, estime les commandes de la semaine 4. Laquelle colle le mieux à la valeur observée ?\nb) Pourquoi un seul point change-t-il autant la droite ?\nc) Quelle droite garder pour prévoir une semaine ordinaire ?",
          figure: nuage([0, 7, 1, 0, 40, 5], [
            { x: 1, y: 10 },
            { x: 2, y: 12 },
            { x: 3, y: 15 },
            { x: 4, y: 16 },
            { x: 5, y: 19 },
            { x: 6, y: 40, label: "B" },
          ], { noms: ["rang de la semaine", "commandes (centaines)"] }),
          correction:
            "a) Sans $B$ : $2{,}2 \\times 4 + 7{,}8 = 16{,}6$ centaines. Avec $B$ : $4{,}91 \\times 4 + 1{,}47 = 21{,}11$ centaines. On a observé 16 : la droite sans $B$ colle bien mieux.\nb) La droite des moindres carrés rend petite la somme des CARRÉS des écarts. Sans $B$, la droite prévoit $2{,}2 \\times 6 + 7{,}8 = 21$ centaines en semaine 6 : $B$ est $40 - 21 = 19$ centaines au-dessus, et $19^2 = 361$ pèse bien plus que tous les autres carrés réunis. La droite se cabre pour s'en approcher.\nc) Celle sans $B$ : le Black Friday est un événement à part, qui ne dit rien d'une semaine ordinaire.\n⛔ Le piège : croire que la droite des moindres carrés « ignore » un point isolé. Au contraire, elle le suit de près.\nRéponse : a) $16{,}6$ et $21{,}11$, la première ; b) le carré de son grand écart ; c) celle sans $B$.",
          micros: ["statT_mc_principe", "statT_mc_comparer"],
        },
        {
          enonce:
            "Une loueuse de vélos a testé cinq prix de location à la journée, et compté les locations par jour.\na) Calcule la somme des carrés des écarts de la droite $d_1$ : $y = -2{,}7x + 79$.\nb) Même travail pour $d_2$ : $y = -2{,}5x + 76$.\nc) Quelle droite garder ?",
          figure: grille(["prix (€)", "locations"], [
            [10, 52],
            [12, 47],
            [14, 40],
            [16, 37],
            [18, 30],
          ]),
          correction:
            "a) $d_1$ donne $52$ ; $46{,}6$ ; $41{,}2$ ; $35{,}8$ ; $30{,}4$. Écarts : $0$ ; $0{,}4$ ; $-1{,}2$ ; $1{,}2$ ; $-0{,}4$. Carrés : $0$ ; $0{,}16$ ; $1{,}44$ ; $1{,}44$ ; $0{,}16$. Somme : $3{,}2$.\nb) $d_2$ donne 51, 46, 41, 36, 31. Écarts : $1$ ; $1$ ; $-1$ ; $1$ ; $-1$. Carrés : 1, 1, 1, 1, 1. Somme : 5.\nc) $3{,}2 < 5$ : on garde $d_1$.\n⛔ Le piège : calculer $-2{,}7 \\times 12$ sans le signe. $-2{,}7 \\times 12 + 79 = -32{,}4 + 79 = 46{,}6$.\nRéponse : a) $3{,}2$ ; b) 5 ; c) $d_1$.",
          schema: ecranSeulement(
            grille(["prix", "locations", "d1", "écart", "carré"], [
              [10, 52, 52, 0, 0],
              [12, 47, 46.6, 0.4, 0.16],
              [14, 40, 41.2, "−1,2", 1.44],
              [16, 37, 35.8, 1.2, 1.44],
              [18, 30, 30.4, "−0,4", 0.16],
            ]),
          ),
          micros: ["statT_mc_calculer", "statT_mc_comparer"],
        },
        {
          enonce:
            "Une formatrice de l'INSEE prépare un quiz sur la droite des moindres carrés. Sur le dessin : le nuage, la droite donnée par la calculatrice $y = 0{,}8x + 1{,}8$, les écarts en pointillés, et le point moyen $G(3 ; 4{,}2)$. Vrai ou faux ?\na) La droite passe par $G$.\nb) La droite passe forcément par au moins deux points du nuage.\nc) Elle rend minimale la somme des carrés des écarts verticaux.\nd) Tous les écarts sont positifs.\ne) Si on déplace un seul point, la droite change.",
          figure: nuage([0, 6, 1, 0, 7, 1], [
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
          ], { droites: [[0.8, 1.8]], ecarts: true, moyen: [3, 4.2] }),
          correction:
            "a) Vrai : $0{,}8 \\times 3 + 1{,}8 = 2{,}4 + 1{,}8 = 4{,}2$.\nb) Faux : la droite donne $2{,}6$ ; $3{,}4$ ; $4{,}2$ ; $5$ ; $5{,}8$, et aucun point du nuage n'a ces ordonnées.\nc) Vrai : c'est sa définition.\nd) Faux : les écarts valent $-0{,}6$ ; $0{,}6$ ; $0{,}8$ ; $-1$ ; $0{,}2$. Certains points sont sous la droite.\ne) Vrai : chaque point compte dans la somme des carrés.\n⛔ Le piège au b) : confondre avec la droite au jugé tracée par deux points. La droite des moindres carrés ne passe en général par aucun point.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux ; e) vrai.",
          micros: ["statT_mc_principe"],
        },
        {
          enonce:
            "Un responsable RSE (responsabilité sociale des entreprises) compare, pour cinq commerciaux, les kilomètres parcourus en voiture dans l'année, en milliers, et les émissions de CO₂, en tonnes. La calculatrice donne la droite des moindres carrés $y = 0{,}192x + 0{,}22$.\na) Calcule le point moyen $G$ et vérifie qu'il est sur la droite.\nb) Dresse le tableau des écarts et calcule la somme de leurs carrés.\nc) Que représente le coefficient $0{,}192$, en grammes par kilomètre ?",
          figure: grille(["km (milliers)", "CO₂ (t)"], [
            [10, 2.1],
            [15, 3.2],
            [20, 3.9],
            [25, 5.2],
            [30, 5.9],
          ]),
          correction:
            "a) $\\bar{x} = \\dfrac{10 + 15 + 20 + 25 + 30}{5} = 20$ et $\\bar{y} = \\dfrac{2{,}1 + 3{,}2 + 3{,}9 + 5{,}2 + 5{,}9}{5} = \\dfrac{20{,}3}{5} = 4{,}06$. Donc $G(20 ; 4{,}06)$.\n$0{,}192 \\times 20 + 0{,}22 = 3{,}84 + 0{,}22 = 4{,}06$ : $G$ est sur la droite.\nb) La droite donne $2{,}14$ ; $3{,}1$ ; $4{,}06$ ; $5{,}02$ ; $5{,}98$. Écarts : $-0{,}04$ ; $0{,}1$ ; $-0{,}16$ ; $0{,}18$ ; $-0{,}08$. Carrés : $0{,}0016$ ; $0{,}01$ ; $0{,}0256$ ; $0{,}0324$ ; $0{,}0064$. Somme : $0{,}076$.\nc) 1 000 km de plus, c'est $0{,}192$ tonne de plus, soit 192 kg pour 1 000 km : 192 grammes par kilomètre.\n⛔ Le piège au b) : arrondir les carrés au centième, et écrire $0{,}04^2 = 0$. On garde tous les chiffres jusqu'à la somme.\nRéponse : a) $G(20 ; 4{,}06)$ ; b) $0{,}076$ ; c) 192 g/km.",
          micros: ["statT_mc_principe", "statT_mc_calculer"],
        },
        {
          enonce:
            "Un data analyst d'une enseigne de sport compare le budget publicitaire d'un magasin, en milliers d'euros, et ses ventes, en milliers d'articles.\nBudget : 2, 4, 6, 8, 10. Ventes : 7, 8, 12, 13, 16.\nUn collègue a tracé la droite $d_1$ qui passe par le premier et le dernier point : $y = 1{,}125x + 4{,}75$. Le tableur donne la droite des moindres carrés $d_2$ : $y = 1{,}15x + 4{,}3$, et sa somme des carrés des écarts : $1{,}9$.\na) Calcule la somme des carrés des écarts de $d_1$.\nb) Compare les deux droites.\nc) Un troisième collègue annonce une droite de somme $1{,}5$. Qu'en penses-tu ?",
          correction:
            "a) $d_1$ donne $7$ ; $9{,}25$ ; $11{,}5$ ; $13{,}75$ ; $16$. Écarts : $0$ ; $-1{,}25$ ; $0{,}5$ ; $-0{,}75$ ; $0$. Carrés : $0$ ; $1{,}5625$ ; $0{,}25$ ; $0{,}5625$ ; $0$. Somme : $2{,}375$.\nb) $1{,}9 < 2{,}375$ : $d_2$ est meilleure, même si $d_1$ passe exactement par deux points.\nc) C'est impossible : $1{,}9$ est la plus petite somme possible, celle de la droite des moindres carrés. Il s'est trompé dans ses calculs.\n⛔ Le piège : croire qu'une droite qui passe par deux points du nuage est forcément la meilleure.\nRéponse : a) $2{,}375$ ; b) $d_2$ ; c) impossible.",
          schema: ecranSeulement(
            nuage([0, 12, 2, 4, 18, 2], [
              { x: 2, y: 7 },
              { x: 4, y: 8 },
              { x: 6, y: 12 },
              { x: 8, y: 13 },
              { x: 10, y: 16 },
            ], { noms: ["budget (k€)", "ventes (milliers)"], droites: [[1.15, 4.3], [1.125, 4.75]] }),
          ),
          micros: ["statT_mc_principe", "statT_mc_comparer"],
        },
        {
          enonce:
            "Une professeure d'EPS compare, pour cinq élèves, les heures d'entraînement par semaine et le temps au 1 000 m, en secondes.\nHeures : 0, 1, 2, 3, 4. Temps : 300, 290, 276, 268, 256.\nLa calculatrice donne la droite des moindres carrés $y = -11x + 300$.\na) Calcule la somme des carrés des écarts de cette droite.\nb) Calcule le temps moyen $\\bar{y}$, puis la somme des carrés des écarts de la droite horizontale $y = \\bar{y}$, qui ignore l'entraînement.\nc) Compare. Que conclure ?",
          correction:
            "a) La droite donne 300, 289, 278, 267, 256. Écarts : $0$ ; $1$ ; $-2$ ; $1$ ; $0$. Carrés : 0, 1, 4, 1, 0. Somme : 6.\nb) $\\bar{y} = \\dfrac{300 + 290 + 276 + 268 + 256}{5} = \\dfrac{1390}{5} = 278$.\nÉcarts à $y = 278$ : $22$ ; $12$ ; $-2$ ; $-10$ ; $-22$. Carrés : 484, 144, 4, 100, 484. Somme : 1 216.\nc) $6$ contre $1\\,216$ : la droite qui tient compte de l'entraînement colle bien mieux. Le temps baisse d'environ 11 secondes par heure d'entraînement hebdomadaire.\n⛔ Le piège au a) : oublier le signe et calculer $11 \\times 1 + 300 = 311$. La droite descend.\nRéponse : a) 6 ; b) 1 216 ; c) l'entraînement explique bien les temps.",
          schema: ecranSeulement(
            nuage([0, 5, 1, 250, 310, 10], [
              { x: 0, y: 300 },
              { x: 1, y: 290 },
              { x: 2, y: 276 },
              { x: 3, y: 268 },
              { x: 4, y: 256 },
            ], { noms: ["entraînement (h/semaine)", "1 000 m (s)"], droites: [[-11, 300], [0, 278]] }),
          ),
          micros: ["statT_mc_calculer", "statT_mc_comparer"],
        },
        {
          enonce:
            "Un notaire compare la surface de cinq maisons, en dizaines de m², et leur prix de vente, en dizaines de milliers d'euros. Deux droites passent par le point moyen $G(10 ; 22{,}6)$ : $d_1$ (bleue) : $y = 1{,}9x + 3{,}6$ et $d_2$ (verte) : $y = 2x + 2{,}6$.\nSurface : 6, 8, 10, 12, 14. Prix : 15, 19, 22, 27, 30.\na) Vérifie que les deux droites passent par $G$.\nb) Calcule la somme des carrés des écarts de chaque droite.\nc) Passer par $G$ suffit-il pour être la droite des moindres carrés ?",
          figure: nuage([4, 16, 2, 12, 32, 4], [
            { x: 6, y: 15 },
            { x: 8, y: 19 },
            { x: 10, y: 22 },
            { x: 12, y: 27 },
            { x: 14, y: 30 },
          ], { noms: ["surface (dizaines de m²)", "prix (dizaines de k€)"], droites: [[1.9, 3.6], [2, 2.6]] }),
          correction:
            "a) $1{,}9 \\times 10 + 3{,}6 = 22{,}6$ et $2 \\times 10 + 2{,}6 = 22{,}6$ : les deux passent par $G$.\nb) $d_1$ donne $15$ ; $18{,}8$ ; $22{,}6$ ; $26{,}4$ ; $30{,}2$. Écarts : $0$ ; $0{,}2$ ; $-0{,}6$ ; $0{,}6$ ; $-0{,}2$. Somme des carrés : $0 + 0{,}04 + 0{,}36 + 0{,}36 + 0{,}04 = 0{,}8$.\n$d_2$ donne $14{,}6$ ; $18{,}6$ ; $22{,}6$ ; $26{,}6$ ; $30{,}6$. Écarts : $0{,}4$ ; $0{,}4$ ; $-0{,}6$ ; $0{,}4$ ; $-0{,}6$. Somme des carrés : $0{,}16 + 0{,}16 + 0{,}36 + 0{,}16 + 0{,}36 = 1{,}2$.\nc) Non. Une infinité de droites passent par $G$ ; la droite des moindres carrés est celle qui a, en plus, la bonne pente. Ici $d_1$, avec $0{,}8 < 1{,}2$.\n⛔ Le piège : s'arrêter au test du point moyen. Il élimine les mauvaises droites, il ne désigne pas la meilleure.\nRéponse : a) oui ; b) $0{,}8$ et $1{,}2$ ; c) non.",
          micros: ["statT_mc_calculer", "statT_mc_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation complète : je calcule le point moyen, j'utilise la droite de la calculatrice, je compare des droites par la somme des carrés des écarts, puis je conclus.",
      rappel: [
        "La droite de la calculatrice est la droite des moindres carrés : elle passe par $G$ et aucune droite n'a une somme de carrés plus petite.",
        "Le coefficient directeur se lit comme un coût, une vitesse ou un gain par unité de $x$.",
        "Je présente les écarts dans un tableau, je garde tous les chiffres, et j'arrondis seulement la réponse finale.",
      ],
      exercices: [
        {
          titre: "Les abonnés de Spotify",
          enonce:
            "Un analyste de l'industrie musicale étudie le nombre d'abonnés payants de Spotify en fin d'année (source : rapports de Spotify). On note $x$ le rang de l'année (2017 a le rang 1) et $y$ le nombre d'abonnés, en millions. La calculatrice donne la droite des moindres carrés $y = 27{,}52x + 42{,}39$ (coefficients arrondis au centième).\na) Calcule les coordonnées du point moyen $G$.\nb) Vérifie que la droite passe tout près de $G$.\nc) Que représente le nombre $27{,}52$ ?\nd) Calcule l'écart entre le nombre d'abonnés observé en 2020 et celui de la droite.\ne) Un collègue propose la droite qui passe par les points de 2017 et de 2024. Trouve son équation (coefficients au centième). Le tableur donne pour elle une somme des carrés des écarts d'environ 22,9, contre 18,0 pour celle de la calculatrice. Conclus.",
          figure: grille(["année", "abonnés (millions)"], [
            [2017, 71],
            [2018, 96],
            [2019, 124],
            [2020, 155],
            [2021, 180],
            [2022, 205],
            [2023, 236],
            [2024, 263],
          ]),
          correction:
            "a) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6 + 7 + 8}{8} = 4{,}5$ et $\\bar{y} = \\dfrac{71 + 96 + 124 + 155 + 180 + 205 + 236 + 263}{8} = \\dfrac{1330}{8} = 166{,}25$. Donc $G(4{,}5 ; 166{,}25)$.\nb) $27{,}52 \\times 4{,}5 + 42{,}39 = 123{,}84 + 42{,}39 = 166{,}23$, à $0{,}02$ de $\\bar{y}$ : l'écart vient de l'arrondi des coefficients.\nc) Chaque année, environ 27,5 millions d'abonnés de plus.\nd) En 2020, $x = 4$ : $27{,}52 \\times 4 + 42{,}39 = 152{,}47$. Écart : $155 - 152{,}47 = 2{,}53$ millions.\ne) $a = \\dfrac{263 - 71}{8 - 1} = \\dfrac{192}{7} \\approx 27{,}43$ et $b = 71 - \\dfrac{192}{7} \\approx 43{,}57$ : $y = 27{,}43x + 43{,}57$.\n$18{,}0 < 22{,}9$ : la droite de la calculatrice colle mieux au nuage, comme prévu. Les deux droites sont pourtant très proches : le nuage est presque aligné.\n⛔ Le piège au d) : calculer l'écart à l'envers, $152{,}47 - 155$. L'écart, c'est la valeur observée moins celle de la droite : ici il est positif, le point est au-dessus de la droite.\nRéponse : a) $G(4{,}5 ; 166{,}25)$ ; c) + 27,5 millions par an ; d) $2{,}53$ millions ; e) $y = 27{,}43x + 43{,}57$, moins bonne.",
          schema: ecranSeulement(
            nuage([0, 9, 1, 50, 300, 50], [
              { x: 1, y: 71 },
              { x: 2, y: 96 },
              { x: 3, y: 124 },
              { x: 4, y: 155 },
              { x: 5, y: 180 },
              { x: 6, y: 205 },
              { x: 7, y: 236 },
              { x: 8, y: 263 },
            ], { noms: ["rang de l'année", "abonnés (millions)"], droites: [[27.52, 42.39]], moyen: [4.5, 166.25] }),
          ),
          micros: ["statT_mc_principe", "statT_mc_calculer", "statT_mc_comparer"],
        },
        {
          titre: "L'eau d'un hôtel",
          enonce:
            "La responsable développement durable d'un hôtel compare, sur quatre mois, les nuitées, en centaines, et la consommation d'eau, en m³.\na) Calcule les coordonnées du point moyen $G$.\nb) Elle trace au jugé $d_1$ : $y = 5x + 21$. Vérifie qu'elle passe par $G$, puis calcule sa somme des carrés des écarts.\nc) La calculatrice donne $d_2$ : $y = 5{,}2x + 20$. Calcule sa somme des carrés des écarts.\nd) Quelle droite garder ?\ne) Avec elle, estime la consommation d'eau d'un mois à 700 nuitées.",
          figure: grille(["nuitées (centaines)", "eau (m³)"], [
            [2, 30],
            [4, 42],
            [6, 50],
            [8, 62],
          ]),
          correction:
            "a) $\\bar{x} = \\dfrac{2 + 4 + 6 + 8}{4} = 5$ et $\\bar{y} = \\dfrac{30 + 42 + 50 + 62}{4} = \\dfrac{184}{4} = 46$. Donc $G(5 ; 46)$.\nb) $5 \\times 5 + 21 = 46$ : $d_1$ passe par $G$. Elle donne 31, 41, 51, 61. Écarts : $-1$ ; $1$ ; $-1$ ; $1$. Somme des carrés : $1 + 1 + 1 + 1 = 4$.\nc) $d_2$ donne $30{,}4$ ; $40{,}8$ ; $51{,}2$ ; $61{,}6$. Écarts : $-0{,}4$ ; $1{,}2$ ; $-1{,}2$ ; $0{,}4$. Somme des carrés : $0{,}16 + 1{,}44 + 1{,}44 + 0{,}16 = 3{,}2$.\nd) $3{,}2 < 4$ : on garde $d_2$, la droite des moindres carrés.\ne) 700 nuitées, c'est $x = 7$ : $y = 5{,}2 \\times 7 + 20 = 36{,}4 + 20 = 56{,}4$ m³.\n⛔ Le piège au c) : trouver les écarts de $d_2$ plus grands en 4 et en 6, et conclure qu'elle est moins bonne. On compare les SOMMES, pas les écarts un par un.\nRéponse : a) $G(5 ; 46)$ ; b) 4 ; c) $3{,}2$ ; d) $d_2$ ; e) $56{,}4$ m³.",
          schema: ecranSeulement(
            nuage([0, 10, 2, 20, 70, 10], [
              { x: 2, y: 30 },
              { x: 4, y: 42 },
              { x: 6, y: 50 },
              { x: 8, y: 62 },
            ], { noms: ["nuitées (centaines)", "eau (m³)"], droites: [[5.2, 20], [5, 21]], ecarts: true, moyen: [5, 46] }),
          ),
          micros: ["statT_mc_calculer", "statT_mc_comparer"],
        },
        {
          titre: "Le coût de production",
          enonce:
            "Une contrôleuse de gestion industrielle relève, sur six mois, la quantité de casques audio produite, en centaines, et le coût total de production, en milliers d'euros. La calculatrice donne la droite des moindres carrés $y = 3{,}2x + 14{,}8$.\na) Calcule le point moyen $G$ et vérifie qu'il est sur la droite.\nb) Calcule la somme des carrés des écarts de cette droite.\nc) Que représentent $14{,}8$ et $3{,}2$ pour l'entreprise ?\nd) Chaque casque est vendu 50 €. À partir de combien de casques par mois l'entreprise fait-elle un bénéfice, d'après la droite ?",
          figure: grille(["casques (centaines)", "coût (k€)"], [
            [1, 18],
            [2, 21],
            [3, 25],
            [4, 27],
            [5, 31],
            [6, 34],
          ]),
          correction:
            "a) $\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3{,}5$ et $\\bar{y} = \\dfrac{18 + 21 + 25 + 27 + 31 + 34}{6} = \\dfrac{156}{6} = 26$. Donc $G(3{,}5 ; 26)$. $3{,}2 \\times 3{,}5 + 14{,}8 = 11{,}2 + 14{,}8 = 26$ : $G$ est sur la droite.\nb) La droite donne $18$ ; $21{,}2$ ; $24{,}4$ ; $27{,}6$ ; $30{,}8$ ; $34$. Écarts : $0$ ; $-0{,}2$ ; $0{,}6$ ; $-0{,}6$ ; $0{,}2$ ; $0$. Somme des carrés : $0 + 0{,}04 + 0{,}36 + 0{,}36 + 0{,}04 + 0 = 0{,}8$.\nc) $14{,}8$ k€ : le coût même sans production, les coûts fixes (loyer, machines). $3{,}2$ k€ par centaine : 32 € par casque, le coût variable.\nd) Vendre $x$ centaines de casques à 50 € rapporte $5x$ milliers d'euros. Bénéfice : $5x - (3{,}2x + 14{,}8) = 1{,}8x - 14{,}8$.\n$1{,}8x - 14{,}8 > 0$ donne $x > 14{,}8 \\div 1{,}8 \\approx 8{,}22$ centaines. À partir de 823 casques par mois.\n⛔ Le piège au d) : oublier les coûts fixes, et croire chaque casque bénéficiaire dès le premier. Il faut d'abord payer les 14 800 € fixes.\nRéponse : a) $G(3{,}5 ; 26)$ ; b) $0{,}8$ ; c) coûts fixes et coût par casque ; d) à partir de 823 casques.",
          micros: ["statT_mc_principe", "statT_mc_calculer"],
        },
        {
          titre: "L'attente aux caisses",
          enonce:
            "Le responsable des caisses d'un supermarché compare le nombre de clients par heure, en dizaines, et le temps d'attente moyen, en minutes.\nClients : 2, 3, 4, 5, 6. Attente : 3, 4, 6, 7, 10.\nTrois droites sont proposées. Paul : $y = 2x - 2$. Inès : $y = 1{,}5x$. La calculatrice : $y = 1{,}7x - 0{,}8$.\na) Calcule $G$ et vérifie que les trois droites passent par $G$.\nb) Calcule la somme des carrés des écarts de chaque droite.\nc) Classe les trois droites. Paul dit : « La mienne passe par trois points du nuage, c'est la meilleure. » A-t-il raison ?\nd) Avec la meilleure droite, estime l'attente pour 45 clients par heure.",
          figure: nuage([0, 7, 1, 0, 12, 2], [
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 6 },
            { x: 5, y: 7 },
            { x: 6, y: 10 },
          ], { noms: ["clients (dizaines/h)", "attente (min)"] }),
          correction:
            "a) $\\bar{x} = \\dfrac{2 + 3 + 4 + 5 + 6}{5} = 4$ et $\\bar{y} = \\dfrac{3 + 4 + 6 + 7 + 10}{5} = \\dfrac{30}{5} = 6$. Donc $G(4 ; 6)$.\nPaul : $2 \\times 4 - 2 = 6$. Inès : $1{,}5 \\times 4 = 6$. Calculatrice : $1{,}7 \\times 4 - 0{,}8 = 6$. Les trois passent par $G$.\nb) Paul donne 2, 4, 6, 8, 10 : écarts $1$ ; $0$ ; $0$ ; $-1$ ; $0$, somme des carrés 2.\nInès donne $3$ ; $4{,}5$ ; $6$ ; $7{,}5$ ; $9$ : écarts $0$ ; $-0{,}5$ ; $0$ ; $-0{,}5$ ; $1$, somme des carrés $1{,}5$.\nLa calculatrice donne $2{,}6$ ; $4{,}3$ ; $6$ ; $7{,}7$ ; $9{,}4$ : écarts $0{,}4$ ; $-0{,}3$ ; $0$ ; $-0{,}7$ ; $0{,}6$, somme des carrés $0{,}16 + 0{,}09 + 0 + 0{,}49 + 0{,}36 = 1{,}1$.\nc) $1{,}1 < 1{,}5 < 2$ : la calculatrice, puis Inès, puis Paul. Paul a tort : ses trois points pile sur la droite ne compensent pas ses deux écarts de 1.\nd) $x = 4{,}5$ : $y = 1{,}7 \\times 4{,}5 - 0{,}8 = 7{,}65 - 0{,}8 = 6{,}85$ minutes, soit presque 7 minutes.\n⛔ Le piège au c) : compter les points sur la droite. Le critère des moindres carrés regarde tous les écarts à la fois.\nRéponse : a) $G(4 ; 6)$ ; b) 2 ; $1{,}5$ ; $1{,}1$ ; c) calculatrice, Inès, Paul ; non ; d) $6{,}85$ minutes.",
          schema: ecranSeulement(
            nuage([0, 7, 1, 0, 12, 2], [
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 6 },
              { x: 5, y: 7 },
              { x: 6, y: 10 },
            ], { noms: ["clients (dizaines/h)", "attente (min)"], droites: [[1.7, -0.8], [2, -2]], ecarts: true, moyen: [4, 6] }),
          ),
          micros: ["statT_mc_principe", "statT_mc_calculer", "statT_mc_comparer"],
        },
      ],
    },
  ],
};
