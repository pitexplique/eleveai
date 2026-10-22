// ─── Fiche d'exercices : interpoler, extrapoler (Tle STMG) — 20 exercices ────
//
// Quatrième des cinq feuilles STMG « séries statistiques à deux variables »
// (22/10/2026), après le nuage, l'ajustement et les moindres carrés (mêmes
// dessins, même ton). Alignée sur la banque `lib/tutor-v4/questionBank/stmg/
// maths/statistique-deux-variables.bank.ts`, notion stat_interpoler :
// INTERPOLER (estimer une valeur à l'intérieur de la plage des données),
// EXTRAPOLER (au-delà, y compris « à partir de quand… »), et discuter les
// LIMITES d'une extrapolation — le BO le demande en toutes lettres : « exercer
// leur esprit critique sur […] les limites des extrapolations ».
// ⭐ Chaque estimation dit d'abord si elle est une interpolation ou une
// extrapolation, en citant la plage des données.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 9 — taille médiane des garçons de 3 à 6 ans (OMS, normes de
//     croissance) : 96,1 ; 103,3 ; 110,0 ; 116,0 cm ; à 1 an, 75,7 cm ; taille
//     moyenne d'un homme adulte en France, environ 1,76 m ;
//   · ex. 11 — population mondiale (ONU, World Population Prospects) : 2,5 ;
//     3,0 ; 3,7 ; 4,4 ; 5,3 ; 6,1 ; 6,9 ; 7,8 milliards de 1950 à 2020 ; 5,7
//     en 1995 ; projections de l'ONU (2024) : environ 9,7 milliards en 2050 et
//     10,2 en 2100 ;
//   · ex. 17 — records du monde du 100 m masculin (World Athletics) : Hines
//     1968 9,95 ; Smith 1983 9,93 ; Lewis 1988 9,92 et 1991 9,86 ; Burrell 1994
//     9,85 ; Bailey 1996 9,84 ; Greene 1999 9,79 ; Powell 2005 9,77 et 2007
//     9,74 ; Bolt 2008 9,69 et 2009 9,58.
// Le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
// Métiers, un par exercice : directeur d'une salle de spectacle, responsable
// des stocks, analyste d'une société d'autoroutes, apiculteur, responsable
// d'un musée, responsable du service client, agricultrice bio, démographe
// d'une mairie, infirmière scolaire, responsable d'une plateforme de
// livraison, géographe, hydrologue, ingénieure environnement, gérant d'une
// piscine, technicienne de laboratoire, chef de rayon, journaliste sportive,
// business developer, glaciologue, disquaire.
//
// ⭐ Les dessins : `nuage` (droites, lectures en pointillés orange) et
// `grille`, de `stmg-deux-variables-figures.tsx`. 13 imprimés.
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-stat-interpoler.mjs`
// (chaque estimation, chaque seuil, chaque droite « de la calculatrice »
// recalculée, et chaque mot « interpolation » ou « extrapolation » confronté
// à la plage des données).
//
// Micro-compétences : statT_interpoler (1, 3, 4, 6, 8, 9, 10, 11, 12, 14, 15,
// 16, 17, 19, 20), statT_extrapoler (2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15,
// 17, 18, 19, 20), statT_limites (6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
// 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesStatInterpolerStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "stat-interpoler",
  titre: "Interpoler et extrapoler",
  accroche:
    "Vingt exercices, du geste seul au problème : estimer une valeur avec une droite d'ajustement, à l'intérieur des données (interpoler) ou au-delà (extrapoler), par le calcul ou sur le dessin, puis juger si l'estimation a du sens. La taille des enfants, la population mondiale, le record du 100 m, une droite d'étalonnage de laboratoire, la fonte d'un glacier. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la lecture dessinée et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : estimer une valeur, dire si c'est une interpolation ou une extrapolation, ou juger le résultat.",
      rappel: [
        "INTERPOLER : estimer une valeur pour un $x$ situé ENTRE la plus petite et la plus grande valeur observée.",
        "EXTRAPOLER : estimer une valeur pour un $x$ situé EN DEHORS de la plage observée, avant ou après.",
        "Par le calcul : je remplace $x$ dans l'équation. Sur le dessin : je monte de $x$ jusqu'à la droite, puis je vais lire $y$ sur l'axe vertical.",
        "Une extrapolation suppose que la tendance continue. Plus on s'éloigne des données, moins elle est fiable.",
      ],
      exercices: [
        {
          enonce:
            "Le directeur d'une salle de spectacle a relevé, pour six spectacles, le budget de publicité (en k€, de 2 à 10) et les billets vendus (en centaines). Sa droite d'ajustement : $y = 3{,}5x + 12$.\na) Estime le nombre de billets vendus pour un budget de 7 k€.\nb) Est-ce une interpolation ou une extrapolation ?",
          figure: nuage([0, 12, 2, 0, 60, 10], [
            { x: 2, y: 19 },
            { x: 3, y: 22 },
            { x: 5, y: 29 },
            { x: 6, y: 33 },
            { x: 8, y: 40 },
            { x: 10, y: 47 },
          ], { noms: ["publicité (k€)", "billets (centaines)"], droites: [[3.5, 12]] }),
          correction:
            "a) $y = 3{,}5 \\times 7 + 12 = 24{,}5 + 12 = 36{,}5$ centaines, soit environ 3 650 billets.\nb) Les budgets observés vont de 2 à 10 k€ ; 7 est entre les deux : c'est une interpolation.\n⛔ Le piège au a) : oublier l'unité, et annoncer 36,5 billets. L'axe compte en centaines.\nRéponse : a) environ 3 650 billets ; b) une interpolation.",
          schema: ecranSeulement(
            nuage([0, 12, 2, 0, 60, 10], [], { noms: ["publicité (k€)", "billets (centaines)"], droites: [[3.5, 12]], lectures: [{ x: 7 }] }),
          ),
          micros: ["statT_interpoler"],
        },
        {
          enonce:
            "Une responsable des stocks suit, pendant 10 semaines, le stock d'un produit en fin de semaine, en centaines d'unités. Elle l'ajuste par $y = -1{,}2x + 48$, où $x$ est le rang de la semaine.\na) Que prévoit le modèle pour la semaine 15 ? Est-ce une interpolation ou une extrapolation ?\nb) À partir de quelle semaine le stock passera-t-il sous 20 centaines, si la tendance continue ?",
          correction:
            "a) $y = -1{,}2 \\times 15 + 48 = -18 + 48 = 30$ centaines. Les données s'arrêtent à la semaine 10 : c'est une extrapolation.\nb) Je résous $-1{,}2x + 48 = 20$ : $-1{,}2x = -28$, donc $x = 28 \\div 1{,}2 \\approx 23{,}3$. Le stock passe sous 20 centaines à partir de la semaine 24.\n⛔ Le piège au b) : arrondir 23,3 à 23. En semaine 23, le modèle donne encore $-1{,}2 \\times 23 + 48 = 20{,}4$, au-dessus de 20.\nRéponse : a) 3 000 unités, extrapolation ; b) la semaine 24.",
          schema: ecranSeulement(
            nuage([0, 30, 5, 0, 50, 10], [], { noms: ["rang de la semaine", "stock (centaines)"], droites: [[-1.2, 48]], lectures: [{ x: 15 }, { y: 20 }] }),
          ),
          micros: ["statT_extrapoler"],
        },
        {
          enonce:
            "Un analyste d'une société d'autoroutes dispose du trafic moyen d'une barrière de péage, chaque année de 2015 à 2023. Il veut l'estimer pour 2019, 2030, 2010 et 2021,5.\na) Pour chaque année, dis s'il s'agit d'une interpolation ou d'une extrapolation.\nb) Laquelle de ces estimations est la moins fiable ?",
          correction:
            "La plage observée va de 2015 à 2023.\na) 2019 : entre 2015 et 2023, interpolation. 2030 : après 2023, extrapolation. 2010 : avant 2015, extrapolation. 2021,5 : entre les deux, interpolation (le milieu de l'année 2021, par exemple).\nb) 2030 : c'est la plus éloignée des données, 7 ans après la dernière. 2010 n'est qu'à 5 ans de la première.\n⛔ Le piège : croire qu'extrapoler veut dire « dans le futur ». Estimer 2010 avec des données qui commencent en 2015, c'est aussi extrapoler, vers le passé.\nRéponse : a) interpolation, extrapolation, extrapolation, interpolation ; b) 2030.",
          schema: ecranSeulement(
            nuage([2010, 2030, 2, 30, 60, 5], [
              { x: 2015, y: 41 },
              { x: 2016, y: 42 },
              { x: 2017, y: 44 },
              { x: 2018, y: 45 },
              { x: 2019, y: 46 },
              { x: 2020, y: 47 },
              { x: 2021, y: 49 },
              { x: 2022, y: 50 },
              { x: 2023, y: 51 },
            ], { noms: ["année", "trafic (milliers/jour)"] }),
          ),
          micros: ["statT_interpoler", "statT_extrapoler"],
        },
        {
          enonce:
            "Un apiculteur compare, sur six saisons, le nombre de ruches et la récolte de miel, en DIZAINES de kg. Il a tracé au jugé la droite $y = 2x + 4$.\na) Avec le dessin, estime la récolte avec 5 ruches.\nb) Vérifie par le calcul.\nc) Est-ce une interpolation ou une extrapolation ?",
          figure: nuage([0, 10, 1, 0, 24, 4], [
            { x: 2, y: 8 },
            { x: 3, y: 11 },
            { x: 4, y: 11 },
            { x: 6, y: 17 },
            { x: 7, y: 17 },
            { x: 8, y: 20 },
          ], { noms: ["ruches", "miel (dizaines de kg)"], droites: [[2, 4]] }),
          correction:
            "a) Je monte de $x = 5$ jusqu'à la droite, puis je vais à l'axe vertical : je tombe au milieu, entre 12 et 16, soit 14 dizaines de kg.\nb) $y = 2 \\times 5 + 4 = 14$ : 140 kg de miel.\nc) Les ruches observées vont de 2 à 8 ; 5 est entre les deux : interpolation.\n⛔ Le piège au a) : lire l'ordonnée d'un point du nuage voisin, au lieu de celle de la droite. On estime avec la DROITE.\nRéponse : a) et b) 14 dizaines, soit 140 kg ; c) interpolation.",
          schema: ecranSeulement(
            nuage([0, 10, 1, 0, 24, 4], [], { noms: ["ruches", "miel (dizaines de kg)"], droites: [[2, 4]], lectures: [{ x: 5 }] }),
          ),
          micros: ["statT_interpoler"],
        },
        {
          enonce:
            "Le responsable d'un musée a ajusté la fréquentation des huit premiers mois après sa réouverture par $y = 4x + 50$, où $x$ est le rang du mois et $y$ le nombre de visiteurs en milliers.\na) À partir de quel mois le modèle prévoit-il 100 000 visiteurs ?\nb) Est-ce une interpolation ou une extrapolation ?",
          correction:
            "a) 100 000 visiteurs, ce sont 100 milliers. Je résous $4x + 50 = 100$ : $4x = 50$, donc $x = 50 \\div 4 = 12{,}5$. Le modèle atteint 100 milliers au cours du mois 13.\nb) Les données s'arrêtent au mois 8 ; 12,5 est au-delà : extrapolation. Elle suppose que la fréquentation continue de grimper au même rythme.\n⛔ Le piège au a) : remplacer $x$ par 100. C'est $y$ qui vaut 100, on cherche $x$.\nRéponse : a) le mois 13 ; b) une extrapolation.",
          schema: ecranSeulement(
            nuage([0, 14, 2, 40, 110, 10], [], { noms: ["rang du mois", "visiteurs (milliers)"], droites: [[4, 50]], lectures: [{ y: 100 }] }),
          ),
          micros: ["statT_extrapoler"],
        },
        {
          enonce:
            "La responsable d'un service client a observé, avec 5 à 15 conseillers au téléphone, le temps d'attente moyen, en minutes. Elle l'ajuste par $y = -0{,}5x + 20$, où $x$ est le nombre de conseillers. La droite est prolongée sur le dessin.\na) Que donne le modèle avec 10 conseillers ?\nb) Et avec 50 conseillers ?\nc) Qu'en penses-tu ?",
          figure: nuage([0, 50, 10, -10, 25, 5], [
            { x: 5, y: 17.4 },
            { x: 7, y: 16.6 },
            { x: 9, y: 15.4 },
            { x: 11, y: 14.6 },
            { x: 13, y: 13.4 },
            { x: 15, y: 12.6 },
          ], { noms: ["conseillers", "attente (min)"], droites: [[-0.5, 20]] }),
          correction:
            "a) $y = -0{,}5 \\times 10 + 20 = -5 + 20 = 15$ minutes. 10 est entre 5 et 15 : interpolation, fiable.\nb) $y = -0{,}5 \\times 50 + 20 = -25 + 20 = -5$ minutes.\nc) Une attente négative n'existe pas. 50 est très loin des données (15 au plus) : la droite n'y décrit plus rien. Avec beaucoup de conseillers, l'attente se rapproche de 0 sans jamais passer en dessous.\n⛔ Le piège : faire confiance à la droite partout. Elle ne vaut que près des valeurs observées.\nRéponse : a) 15 minutes ; b) $-5$ minutes ; c) absurde, on est sorti de la zone des données.",
          micros: ["statT_interpoler", "statT_limites"],
        },
        {
          enonce:
            "Une agricultrice bio a relevé, sur huit ans, la surface qu'elle cultive en bio, en hectares. La droite d'ajustement est prolongée au-delà du nuage.\na) Lis sur le dessin la surface prévue pour l'année de rang 12.\nb) Sachant que la droite passe par $(0 ; 20)$ et $(4 ; 40)$, trouve son équation et vérifie par le calcul.\nc) Est-ce une interpolation ou une extrapolation ?",
          figure: nuage([0, 14, 2, 0, 100, 20], [
            { x: 1, y: 26 },
            { x: 2, y: 29 },
            { x: 3, y: 36 },
            { x: 4, y: 41 },
            { x: 5, y: 44 },
            { x: 6, y: 51 },
            { x: 7, y: 54 },
            { x: 8, y: 61 },
          ], { noms: ["rang de l'année", "surface bio (ha)"], droites: [[5, 20]] }),
          correction:
            "a) Je monte de $x = 12$ jusqu'à la droite, puis je vais à l'axe vertical : 80 hectares.\nb) $a = \\dfrac{40 - 20}{4 - 0} = 5$ et $b = 20$ : $y = 5x + 20$. Pour $x = 12$ : $5 \\times 12 + 20 = 80$ hectares.\nc) Les données s'arrêtent à l'année 8 : extrapolation. Elle suppose que l'agricultrice trouve chaque année 5 hectares de plus à convertir.\n⛔ Le piège au a) : lire la valeur du dernier point du nuage. Pour extrapoler, on prolonge la DROITE.\nRéponse : a) et b) 80 ha ; c) une extrapolation.",
          schema: ecranSeulement(
            nuage([0, 14, 2, 0, 100, 20], [], { noms: ["rang de l'année", "surface bio (ha)"], droites: [[5, 20]], lectures: [{ x: 12 }] }),
          ),
          micros: ["statT_extrapoler"],
        },
        {
          enonce:
            "Le démographe d'une mairie a ajusté la population de la commune de 2000 à 2020 par $y = 0{,}15x + 8{,}2$, où $x$ est le nombre d'années depuis 2000 et $y$ la population en milliers d'habitants.\na) Estime la population en 2012, puis en 2060.\nb) Laquelle des deux estimations est la plus fiable ? Pourquoi ?",
          correction:
            "a) 2012 : $x = 12$, $y = 0{,}15 \\times 12 + 8{,}2 = 1{,}8 + 8{,}2 = 10$ milliers, soit 10 000 habitants.\n2060 : $x = 60$, $y = 0{,}15 \\times 60 + 8{,}2 = 9 + 8{,}2 = 17{,}2$ milliers, soit 17 200 habitants.\nb) 2012 : c'est une interpolation, entre 2000 et 2020, au milieu de valeurs observées. 2060 est une extrapolation à 40 ans de la dernière donnée : d'ici là, un nouveau quartier, la fermeture d'une usine ou le vieillissement peuvent tout changer.\n⛔ Le piège : croire qu'un calcul juste donne une prévision sûre. Le calcul est juste ; c'est l'hypothèse « la tendance continue » qui devient fragile.\nRéponse : a) 10 000 et 17 200 habitants ; b) 2012, une interpolation.",
          schema: ecranSeulement(
            nuage([0, 60, 10, 6, 20, 2], [], { noms: ["années depuis 2000", "population (milliers)"], droites: [[0.15, 8.2]], lectures: [{ x: 12 }, { x: 60 }] }),
          ),
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs estimations sur la même série : je situe chaque valeur dans la plage des données, je calcule, puis je juge chaque résultat.",
      rappel: [
        "Avant de calculer, j'écris la plage des données : « les $x$ observés vont de … à … ».",
        "Pour un seuil, je résous $ax + b = $ seuil, puis j'arrondis dans le bon sens : le seuil doit être atteint.",
        "Une extrapolation se juge : la valeur a-t-elle un sens (pas de temps négatif, pas de taille de 2 m pour un enfant) ? La situation peut-elle changer ?",
        "Comparer une estimation à une valeur réelle mesure la qualité du modèle.",
      ],
      exercices: [
        {
          enonce:
            "Une infirmière scolaire étudie la croissance des enfants avec les normes de l'OMS : la taille médiane des garçons de 3 à 6 ans. Sa calculatrice donne la droite des moindres carrés $y = 6{,}64x + 76{,}47$, où $x$ est l'âge en années et $y$ la taille en cm.\na) Estime la taille médiane à 4 ans et demi.\nb) Estime-la à 1 an. L'OMS donne 75,7 cm : que constates-tu ?\nc) Estime-la à 18 ans. Un homme adulte mesure en moyenne 1,76 m en France : qu'en penses-tu ?",
          figure: grille(["âge (ans)", "taille (cm)"], [
            [3, 96.1],
            [4, 103.3],
            [5, 110],
            [6, 116],
          ]),
          correction:
            "Les âges observés vont de 3 à 6 ans.\na) 4,5 est entre 3 et 6 : interpolation. $y = 6{,}64 \\times 4{,}5 + 76{,}47 = 29{,}88 + 76{,}47 = 106{,}35$ cm.\nb) 1 est avant 3 : extrapolation. $y = 6{,}64 \\times 1 + 76{,}47 = 83{,}11$ cm, contre 75,7 cm : la droite se trompe de $7{,}41$ cm. Avant 3 ans, un enfant grandit bien plus vite que 6,64 cm par an.\nc) $y = 6{,}64 \\times 18 + 76{,}47 = 119{,}52 + 76{,}47 = 195{,}99$, soit environ 196 cm, 20 cm de trop. La croissance s'arrête à l'adolescence : la droite, elle, ne s'arrête jamais.\n⛔ Le piège : croire qu'une droite qui colle parfaitement de 3 à 6 ans colle aussi en dehors. Elle ne décrit que la période observée.\nRéponse : a) $106{,}35$ cm ; b) $83{,}11$ cm, beaucoup trop ; c) environ 196 cm, absurde.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Le responsable d'une plateforme de livraison de repas compare, sur sept soirs, le nombre de livreurs en service, en dizaines, et les commandes livrées, en centaines. La calculatrice donne $y = 1{,}79x + 2{,}5$ (coefficients arrondis au centième).\na) Estime les commandes livrées avec 50 livreurs.\nb) Estime-les avec 150 livreurs.\nc) Combien de livreurs faut-il pour livrer 2 000 commandes ?\nd) La ville ne commande jamais plus d'environ 2 000 repas par soir. Que penses-tu du b) ?",
          figure: nuage([0, 10, 1, 0, 20, 4], [
            { x: 2, y: 6 },
            { x: 3, y: 8 },
            { x: 4, y: 10 },
            { x: 5, y: 11 },
            { x: 6, y: 13 },
            { x: 7, y: 15 },
            { x: 8, y: 17 },
          ], { noms: ["livreurs (dizaines)", "commandes (centaines)"], droites: [[1.79, 2.5]] }),
          correction:
            "Les livreurs observés vont de 2 à 8 dizaines.\na) 50 livreurs : $x = 5$, interpolation. $y = 1{,}79 \\times 5 + 2{,}5 = 8{,}95 + 2{,}5 = 11{,}45$ centaines, soit environ 1 145 commandes.\nb) 150 livreurs : $x = 15$, extrapolation. $y = 1{,}79 \\times 15 + 2{,}5 = 26{,}85 + 2{,}5 = 29{,}35$ centaines, soit environ 2 935 commandes.\nc) Je résous $1{,}79x + 2{,}5 = 20$ : $1{,}79x = 17{,}5$, donc $x = 17{,}5 \\div 1{,}79 \\approx 9{,}78$ dizaines. Il faut environ 98 livreurs.\nd) Le b) est impossible : la ville ne commande pas 2 935 repas. Au-delà de 2 000 commandes, ajouter des livreurs n'ajoute plus de commandes : le lien n'est plus affine.\n⛔ Le piège au c) : arrondir 97,8 à 97. Avec 97 livreurs, la droite reste sous 2 000 commandes.\nRéponse : a) environ 1 145 ; b) environ 2 935, irréaliste ; c) 98 livreurs ; d) la demande plafonne.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Un géographe ajuste la population mondiale de 1950 à 2020 (source : ONU) : 2,5 ; 3,0 ; 3,7 ; 4,4 ; 5,3 ; 6,1 ; 6,9 ; 7,8 milliards. On note $x$ le rang de la décennie (1950 a le rang 0). La calculatrice donne $y = 0{,}77x + 2{,}27$ (coefficients arrondis au centième).\na) Estime la population en 1995. L'ONU donne 5,7 milliards.\nb) Estime-la en 2050, puis en 2100.\nc) L'ONU prévoit environ 9,7 milliards en 2050 et 10,2 en 2100. Compare, et explique l'écart.",
          figure: nuage([0, 16, 2, 0, 16, 2], [
            { x: 0, y: 2.5 },
            { x: 1, y: 3 },
            { x: 2, y: 3.7 },
            { x: 3, y: 4.4 },
            { x: 4, y: 5.3 },
            { x: 5, y: 6.1 },
            { x: 6, y: 6.9 },
            { x: 7, y: 7.8 },
          ], { noms: ["rang de la décennie", "population (milliards)"], droites: [[0.77, 2.27]] }),
          correction:
            "Les rangs observés vont de 0 (1950) à 7 (2020).\na) 1995 : $x = 4{,}5$, interpolation. $y = 0{,}77 \\times 4{,}5 + 2{,}27 = 3{,}465 + 2{,}27 = 5{,}735$, soit environ $5{,}74$ milliards, tout près des 5,7 de l'ONU.\nb) 2050 : $x = 10$, $y = 0{,}77 \\times 10 + 2{,}27 = 9{,}97$ milliards. 2100 : $x = 15$, $y = 0{,}77 \\times 15 + 2{,}27 = 13{,}82$ milliards.\nc) En 2050, l'écart est de $9{,}97 - 9{,}7 = 0{,}27$ milliard ; en 2100, de $13{,}82 - 10{,}2 = 3{,}62$ milliards. La droite suppose que la population gagne toujours 770 millions par décennie ; or le nombre d'enfants par femme baisse partout, et la croissance ralentit.\n⛔ Le piège : prendre l'extrapolation pour une prévision. Les démographes de l'ONU ne prolongent pas une droite : ils étudient la natalité, la mortalité et les migrations.\nRéponse : a) environ 5,74 milliards ; b) 9,97 et 13,82 milliards ; c) la droite surestime, de plus en plus.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Une hydrologue compare, après six orages, la hauteur de pluie tombée, en mm, et le débit maximal d'une rivière, en m³/s. Sa droite d'ajustement : $y = 0{,}4x + 2$.\na) Lis sur le dessin le débit prévu pour 45 mm de pluie, puis vérifie par le calcul.\nb) Une alerte annonce 120 mm. Que prévoit la droite ?\nc) Quand le sol est déjà gorgé d'eau, il n'absorbe plus rien. La droite risque-t-elle de surestimer ou de sous-estimer le débit d'une très grosse pluie ?",
          figure: nuage([0, 60, 10, 0, 30, 5], [
            { x: 10, y: 6 },
            { x: 20, y: 10 },
            { x: 25, y: 13 },
            { x: 30, y: 14 },
            { x: 40, y: 18 },
            { x: 50, y: 22 },
          ], { noms: ["pluie (mm)", "débit (m³/s)"], droites: [[0.4, 2]] }),
          correction:
            "Les pluies observées vont de 10 à 50 mm.\na) Je monte de 45 jusqu'à la droite, puis je vais à l'axe vertical : 20 m³/s. Calcul : $0{,}4 \\times 45 + 2 = 18 + 2 = 20$ m³/s. Interpolation.\nb) $0{,}4 \\times 120 + 2 = 48 + 2 = 50$ m³/s. Extrapolation, bien au-delà de 50 mm.\nc) Elle risque de SOUS-estimer : sur un sol saturé, presque toute la pluie ruisselle jusqu'à la rivière, et le débit grimpe plus vite que la droite. Pour une alerte, l'hydrologue prévoit large.\n⛔ Le piège : lire 45 sur l'axe vertical. On part de 45 sur l'axe des pluies.\nRéponse : a) 20 m³/s ; b) 50 m³/s ; c) sous-estimer.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Une ingénieure environnement suit les émissions de CO₂ d'une usine sur huit ans. Elle les ajuste par $y = -3{,}5x + 98$, où $x$ est le rang de l'année et $y$ les émissions en kilotonnes.\na) Que prévoit la droite pour l'année de rang 10 ?\nb) L'objectif est de passer sous 50 kilotonnes. En quelle année de rang la droite l'atteint-elle ?\nc) La droite atteint 0 en l'année de rang 28. Est-ce crédible ?",
          correction:
            "Les années observées vont du rang 1 au rang 8.\na) $y = -3{,}5 \\times 10 + 98 = -35 + 98 = 63$ kilotonnes. Extrapolation à 2 ans : assez fiable.\nb) Je résous $-3{,}5x + 98 = 50$ : $-3{,}5x = -48$, donc $x = 48 \\div 3{,}5 \\approx 13{,}7$. Sous 50 kilotonnes à partir de l'année de rang 14.\nc) Peu crédible : les premières économies sont les plus faciles (isolation, réglages) ; les dernières tonnes demandent de changer de procédé. La baisse a toutes les chances de ralentir.\n⛔ Le piège au b) : répondre l'année 13. En l'année 13, la droite donne $-3{,}5 \\times 13 + 98 = 52{,}5$, encore au-dessus de 50.\nRéponse : a) 63 kt ; b) l'année de rang 14 ; c) non, la baisse ralentira.",
          schema: ecranSeulement(
            nuage([0, 30, 5, 0, 100, 20], [], { noms: ["rang de l'année", "CO₂ (kt)"], droites: [[-3.5, 98]], lectures: [{ x: 10 }, { y: 50 }] }),
          ),
          micros: ["statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Le gérant d'une piscine en plein air a relevé les entrées par jour pour des températures de 22 à 30 °C. Il les ajuste par $y = 25x - 450$, où $x$ est la température en °C.\na) Estime les entrées un jour à 27,5 °C.\nb) Que donne la droite à 15 °C ?\nc) Que donne-t-elle à 40 °C ? La piscine n'accueille pas plus de 400 personnes par jour.",
          correction:
            "Les températures observées vont de 22 à 30 °C.\na) 27,5 est entre les deux : interpolation. $y = 25 \\times 27{,}5 - 450 = 687{,}5 - 450 = 237{,}5$, soit environ 238 entrées.\nb) $y = 25 \\times 15 - 450 = 375 - 450 = -75$ entrées : impossible. Par temps frais, il vient peu de monde, mais jamais moins de zéro.\nc) $y = 25 \\times 40 - 450 = 1000 - 450 = 550$ entrées, plus que la capacité de 400. Et par une telle chaleur, certains évitent le soleil.\n⛔ Le piège : arrondir 237,5 à 237. Pour une estimation de personnes, on arrondit à l'unité la plus proche : 238.\nRéponse : a) environ 238 ; b) $-75$, absurde ; c) 550, au-delà de la capacité.",
          schema: ecranSeulement(
            nuage([10, 45, 5, -100, 600, 100], [], { noms: ["température (°C)", "entrées"], droites: [[25, -450]], lectures: [{ x: 27.5 }] }),
          ),
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Une technicienne de laboratoire dose un polluant dans l'eau. Elle mesure l'absorbance (la lumière absorbée) de cinq solutions de concentration connue, et la calculatrice donne la droite d'étalonnage $y = 0{,}0995x + 0{,}014$, où $x$ est la concentration en mg/L.\na) Un échantillon a une absorbance de 0,50. Estime sa concentration, au centième.\nb) Un autre a une absorbance de 1,20. Que donne la droite ? Que doit faire la technicienne ?\nc) Vérifie que la droite passe par le point moyen.",
          figure: grille(["concentration (mg/L)", "absorbance"], [
            [0, 0.02],
            [2, 0.21],
            [4, 0.4],
            [6, 0.62],
            [8, 0.81],
          ]),
          correction:
            "Les concentrations étalons vont de 0 à 8 mg/L.\na) Je résous $0{,}0995x + 0{,}014 = 0{,}50$ : $0{,}0995x = 0{,}486$, donc $x = 0{,}486 \\div 0{,}0995 \\approx 4{,}88$ mg/L. Entre 0 et 8 : interpolation, fiable.\nb) $0{,}0995x = 1{,}186$, donc $x \\approx 11{,}92$ mg/L : au-delà de 8, extrapolation. À forte concentration, l'absorbance cesse d'être proportionnelle. Elle dilue l'échantillon (par exemple de moitié), le mesure à nouveau, puis multiplie le résultat par 2.\nc) $\\bar{x} = 4$ et $\\bar{y} = \\dfrac{0{,}02 + 0{,}21 + 0{,}4 + 0{,}62 + 0{,}81}{5} = \\dfrac{2{,}06}{5} = 0{,}412$. $0{,}0995 \\times 4 + 0{,}014 = 0{,}398 + 0{,}014 = 0{,}412$ : oui.\n⛔ Le piège au a) : remplacer $x$ par 0,50. Ici on connaît l'absorbance $y$, on cherche la concentration $x$.\nRéponse : a) environ 4,88 mg/L ; b) environ 11,92, à refaire après dilution ; c) oui.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          enonce:
            "Un chef de rayon a testé des prix de 2 à 5 € pour un pack de jus de fruits. Il ajuste les ventes de la semaine par $y = -40x + 260$, où $x$ est le prix en euros.\na) Estime les ventes au prix de 3,50 €.\nb) Que donne la droite pour un pack gratuit ? Ce nombre a-t-il un sens ?\nc) Que donne-t-elle à 7 € ?",
          correction:
            "Les prix testés vont de 2 à 5 €.\na) $y = -40 \\times 3{,}5 + 260 = -140 + 260 = 120$ packs. Interpolation.\nb) $x = 0$ : $y = 260$ packs. Extrapolation jusqu'à un prix jamais testé : gratuit, le rayon serait vidé, bien au-delà de 260. L'ordonnée à l'origine n'a pas de sens ici.\nc) $y = -40 \\times 7 + 260 = -280 + 260 = -20$ packs : absurde. À 7 €, les ventes seraient faibles, mais pas négatives.\n⛔ Le piège : donner un sens à tous les nombres de l'équation. $b$ n'a de sens que si $x = 0$ est proche des données.\nRéponse : a) 120 packs ; b) 260, sans sens ; c) $-20$, absurde.",
          schema: ecranSeulement(
            nuage([0, 8, 1, -40, 280, 40], [], { noms: ["prix (€)", "ventes (packs)"], droites: [[-40, 260]], lectures: [{ x: 3.5 }] }),
          ),
          micros: ["statT_interpoler", "statT_limites"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation complète : j'obtiens la droite, j'interpole et j'extrapole en citant la plage des données, puis je discute ce que vaut chaque estimation.",
      rappel: [
        "Je situe toujours la valeur : interpolation (dans la plage), extrapolation (hors de la plage).",
        "Une extrapolation proche des données est plausible ; lointaine, elle n'est qu'un scénario « si rien ne change ».",
        "Un résultat absurde (négatif, impossible, au-delà d'une capacité) prouve que le modèle a cessé de valoir.",
      ],
      exercices: [
        {
          titre: "Le record du 100 m",
          enonce:
            "Une journaliste sportive prépare un article : « Jusqu'où ira le record du 100 m ? ». Elle relève les records du monde masculins depuis 1968 (source : World Athletics). On note $x$ le nombre d'années depuis 1960 et $y$ le record en secondes. La calculatrice donne $y = -0{,}0079x + 10{,}09$ ($a$ arrondi au dix-millième, $b$ au centième).\na) Estime le record « de la tendance » en 1985. Quel était le vrai record cette année-là ?\nb) Estime-le en 2009. Compare au 9,58 s d'Usain Bolt.\nc) Estime-le en 2030.\nd) À partir de quelle année la droite passe-t-elle sous 9,5 s ?\ne) En quelle année la droite atteindrait-elle 0 seconde ? Conclus.",
          figure: grille(["année", "record (s)", "sprinteur"], [
            [1968, 9.95, "Hines"],
            [1983, 9.93, "Smith"],
            [1988, 9.92, "Lewis"],
            [1991, 9.86, "Lewis"],
            [1994, 9.85, "Burrell"],
            [1996, 9.84, "Bailey"],
            [1999, 9.79, "Greene"],
            [2005, 9.77, "Powell"],
            [2007, 9.74, "Powell"],
            [2008, 9.69, "Bolt"],
            [2009, 9.58, "Bolt"],
          ]),
          correction:
            "Les années observées vont de 1968 ($x = 8$) à 2009 ($x = 49$).\na) 1985 : $x = 25$, interpolation. $y = -0{,}0079 \\times 25 + 10{,}09 = -0{,}1975 + 10{,}09 \\approx 9{,}89$ s. Le vrai record était celui de Smith, 9,93 s, établi en 1983.\nb) 2009 : $x = 49$. $y = -0{,}0079 \\times 49 + 10{,}09 \\approx 9{,}70$ s. Bolt a couru en 9,58 s : 0,12 s plus vite que la tendance, un saut énorme pour un record.\nc) 2030 : $x = 70$, extrapolation. $y = -0{,}0079 \\times 70 + 10{,}09 = -0{,}553 + 10{,}09 \\approx 9{,}54$ s.\nd) Je résous $-0{,}0079x + 10{,}09 = 9{,}5$ : $0{,}0079x = 0{,}59$, donc $x = 0{,}59 \\div 0{,}0079 \\approx 74{,}7$. Sous 9,5 s à partir de 2035.\ne) $0{,}0079x = 10{,}09$ donne $x \\approx 1277$ : l'an 3237. Absurde : un être humain ne courra jamais 100 m en 0 seconde. Le corps humain a des limites ; le record baissera de moins en moins vite. La droite ne vaut qu'au voisinage des données.\n⛔ Le piège : présenter le c) ou le d) comme des prévisions. Ce sont des scénarios « si la tendance continue ».\nRéponse : a) 9,89 s, contre 9,93 ; b) 9,70 s, Bolt a 0,12 s d'avance ; c) 9,54 s ; d) 2035 ; e) l'an 3237, absurde.",
          schema: ecranSeulement(
            nuage([0, 80, 10, 9.4, 10, 0.1], [
              { x: 8, y: 9.95 },
              { x: 23, y: 9.93 },
              { x: 28, y: 9.92 },
              { x: 31, y: 9.86 },
              { x: 34, y: 9.85 },
              { x: 36, y: 9.84 },
              { x: 39, y: 9.79 },
              { x: 45, y: 9.77 },
              { x: 47, y: 9.74 },
              { x: 48, y: 9.69 },
              { x: 49, y: 9.58 },
            ], { noms: ["années depuis 1960", "record (s)"], droites: [[-0.0079, 10.09]], lectures: [{ x: 70 }] }),
          ),
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          titre: "La start-up",
          enonce:
            "Un business developer présente à des investisseurs le chiffre d'affaires de sa start-up sur ses six premiers trimestres. La calculatrice donne $y = 13{,}43x + 6{,}33$ (coefficients arrondis au centième), où $x$ est le rang du trimestre et $y$ le chiffre d'affaires en k€.\na) Calcule le point moyen et vérifie que la droite passe tout près.\nb) Que prévoit la droite pour le trimestre 12 ?\nc) À partir de quel trimestre la droite dépasse-t-elle 200 k€ ?\nd) Un investisseur dit : « Six trimestres, c'est peu pour prévoir trois ans. » Donne deux raisons qui lui donnent raison.",
          figure: grille(["trimestre", "CA (k€)"], [
            [1, 20],
            [2, 34],
            [3, 45],
            [4, 61],
            [5, 72],
            [6, 88],
          ]),
          correction:
            "a) $\\bar{x} = 3{,}5$ et $\\bar{y} = \\dfrac{20 + 34 + 45 + 61 + 72 + 88}{6} = \\dfrac{320}{6} \\approx 53{,}33$. $13{,}43 \\times 3{,}5 + 6{,}33 = 47{,}005 + 6{,}33 = 53{,}335$ : tout près, à l'arrondi des coefficients près.\nb) Les trimestres observés vont de 1 à 6 ; 12 est au-delà : extrapolation. $y = 13{,}43 \\times 12 + 6{,}33 = 161{,}16 + 6{,}33 = 167{,}49$, soit environ 167,5 k€.\nc) Je résous $13{,}43x + 6{,}33 = 200$ : $13{,}43x = 193{,}67$, donc $x = 193{,}67 \\div 13{,}43 \\approx 14{,}42$. À partir du trimestre 15.\nd) Par exemple : un concurrent peut arriver et freiner les ventes ; une levée de fonds peut au contraire accélérer la croissance ; le marché peut saturer ; certaines ventes sont saisonnières. Six points ne disent rien de ces changements.\n⛔ Le piège au c) : répondre le trimestre 14. Au trimestre 14, la droite donne $13{,}43 \\times 14 + 6{,}33 = 194{,}35$, sous les 200 k€.\nRéponse : a) $G(3{,}5 ; 53{,}33)$ ; b) environ 167,5 k€ ; c) le trimestre 15 ; d) concurrence, levée de fonds, saturation.",
          schema: ecranSeulement(
            nuage([0, 16, 2, 0, 250, 50], [
              { x: 1, y: 20 },
              { x: 2, y: 34 },
              { x: 3, y: 45 },
              { x: 4, y: 61 },
              { x: 5, y: 72 },
              { x: 6, y: 88 },
            ], { noms: ["rang du trimestre", "CA (k€)"], droites: [[13.43, 6.33]], lectures: [{ x: 12 }, { y: 200 }] }),
          ),
          micros: ["statT_extrapoler", "statT_limites"],
        },
        {
          titre: "Le glacier",
          enonce:
            "Une glaciologue mesure le recul du front d'un glacier des Alpes depuis l'an 2000, en mètres. En 2000, le glacier était long de 2 400 m. On note $x$ le nombre d'années depuis 2000. La calculatrice donne $y = 28{,}57x - 2{,}38$ (coefficients arrondis au centième).\na) Estime le recul en 2010.\nb) Estime le recul en 2030.\nc) Si la tendance continue, vers quelle année le glacier aurait-il entièrement disparu ?\nd) Donne une raison pour laquelle cette date est incertaine.",
          figure: grille(["année", "recul cumulé (m)"], [
            [2000, 0],
            [2004, 110],
            [2008, 230],
            [2012, 330],
            [2016, 460],
            [2020, 570],
          ]),
          correction:
            "Les années observées vont de 2000 ($x = 0$) à 2020 ($x = 20$).\na) 2010 : $x = 10$, interpolation. $y = 28{,}57 \\times 10 - 2{,}38 = 285{,}7 - 2{,}38 = 283{,}32$, soit environ 283 m.\nb) 2030 : $x = 30$, extrapolation à 10 ans. $y = 28{,}57 \\times 30 - 2{,}38 = 857{,}1 - 2{,}38 = 854{,}72$, soit environ 855 m.\nc) Le glacier disparaît quand le recul atteint 2 400 m : $28{,}57x - 2{,}38 = 2400$, donc $x = 2402{,}38 \\div 28{,}57 \\approx 84{,}1$. Vers 2084.\nd) Par exemple : le réchauffement s'accélère, et la fonte avec lui ; ou bien, en reculant, le front remonte vers des altitudes plus froides et recule moins vite. Une extrapolation à plus de 60 ans n'est qu'un scénario.\n⛔ Le piège au c) : poser $28{,}57x - 2{,}38 = 0$. On cherche le moment où le recul égale toute la longueur du glacier, 2 400 m.\nRéponse : a) environ 283 m ; b) environ 855 m ; c) vers 2084 ; d) le rythme de fonte peut changer.",
          schema: ecranSeulement(
            nuage([0, 30, 5, 0, 900, 150], [
              { x: 0, y: 0 },
              { x: 4, y: 110 },
              { x: 8, y: 230 },
              { x: 12, y: 330 },
              { x: 16, y: 460 },
              { x: 20, y: 570 },
            ], { noms: ["années depuis 2000", "recul (m)"], droites: [[28.57, -2.38]], lectures: [{ x: 10 }, { x: 30 }] }),
          ),
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
        {
          titre: "Les DVD du disquaire",
          enonce:
            "Un disquaire compte les DVD vendus chaque année, en centaines. Il a perdu le chiffre de 2018. Les autres, de 2015 à 2021 : 2015 : 48 ; 2016 : 41 ; 2017 : 36 ; 2019 : 24 ; 2020 : 19 ; 2021 : 13. On note $x$ le nombre d'années depuis 2015. La calculatrice donne $y = -5{,}75x + 47{,}42$ (coefficients arrondis au centième).\na) Estime les ventes de 2018. Est-ce une interpolation ?\nb) Que prévoit la droite pour 2024 ?\nc) En quelle année la droite atteint-elle 0 ?\nd) Les ventes d'un produit en déclin baissent de moins en moins vite (il reste des collectionneurs). Que penser du b) et du c) ?",
          figure: nuage([0, 10, 1, -10, 50, 10], [
            { x: 0, y: 48 },
            { x: 1, y: 41 },
            { x: 2, y: 36 },
            { x: 4, y: 24 },
            { x: 5, y: 19 },
            { x: 6, y: 13 },
          ], { noms: ["années depuis 2015", "DVD (centaines)"], droites: [[-5.75, 47.42]] }),
          correction:
            "Les années observées vont de 2015 ($x = 0$) à 2021 ($x = 6$).\na) 2018 : $x = 3$, entre 0 et 6 : oui, interpolation. $y = -5{,}75 \\times 3 + 47{,}42 = -17{,}25 + 47{,}42 = 30{,}17$ centaines, soit environ 3 017 DVD.\nb) 2024 : $x = 9$, extrapolation. $y = -5{,}75 \\times 9 + 47{,}42 = -51{,}75 + 47{,}42 = -4{,}33$ centaines : des ventes négatives, absurde.\nc) $-5{,}75x + 47{,}42 = 0$ donne $x = 47{,}42 \\div 5{,}75 \\approx 8{,}25$ : au cours de 2023.\nd) Le b) est impossible, et le c) annonce une fin trop brutale : les ventes vont plutôt se stabiliser à un petit niveau. Une droite descend toujours au même rythme ; elle ne sait pas « freiner ».\n⛔ Le piège au a) : croire qu'on ne peut rien dire d'une année manquante. Entre deux années connues, l'interpolation est justement l'outil fiable.\nRéponse : a) environ 3 017 DVD, interpolation ; b) $-4{,}33$ centaines, absurde ; c) 2023 ; d) la droite ne vaut plus au-delà des données.",
          micros: ["statT_interpoler", "statT_extrapoler", "statT_limites"],
        },
      ],
    },
  ],
};
