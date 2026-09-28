// ─── Fiche d'exercices : le nuage de points (1re, sans spécialité) ───────────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), quatrième notion du
// coach (28/09/2026) : lire un point, construire le nuage d'un tableau, décrire
// sa tendance. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/ajustement-affine.bank.ts`
// (info_nuage_lire, info_nuage_construire, info_nuage_tendance).
//
// ⭐⭐ LE FIL : UN INDIVIDU = UN POINT (x ; y), DANS CET ORDRE. Et une tendance
// se dit en une phrase : « quand x augmente, y a tendance à augmenter (ou à
// diminuer) ; les points sont presque alignés (ou non) ». Un point isolé se
// signale (10, 19). Un lien n'est pas une cause (15, 18).
//
// ⛔ LE REPÈRE (règles mesurées à 375 px) : les nuages sont des `marques` de
// `repere()` (points rouges), sans courbe ; unités choisies pour rester sous
// 15 graduations (« en dizaines », « en centaines ») ; `grand = true` au-delà
// de 10 ; une étiquette (« A », « P ») seulement sur un point isolé, loin des
// axes et des autres points.
//
// ⭐ Contextes : nature (chênes, tournesol, croissance d'un arbre, abeilles),
// économie (prix et ventes, glaces, revenus et loisirs), physique (éolienne et
// vent, 9 ; température de l'eau en profondeur, 10 ; vitesse et consommation,
// 16), histoire-géo (forêt et densité des régions, 15 ; recul d'un glacier, 17 ;
// médecins des villes, 20), écologie (CO₂ et richesse), sport, école. Les
// chiffres sont des MODÈLES, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-nuage.mjs` (chaque
// point dessiné est comparé au tableau ou à la liste de l'énoncé).
//
// Micro-compétences : info_nuage_lire (1, 2, 4, 7, 8, 10, 11, 12, 13, 15, 16,
// 17, 18, 19, 20), info_nuage_construire (3, 5, 8, 9, 11, 14, 15, 16, 17, 19, 20),
// info_nuage_tendance (2, 4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le nuage construit
 *  qui redit le corrigé. Les nuages qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoNuagePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-nuage",
  titre: "Le nuage de points",
  accroche:
    "Vingt exercices pour lire un nuage de points, le construire à partir d'un tableau, et décrire sa tendance. Chênes et tournesols, glaces et soleil, éolienne et vent, recul d'un glacier, abeilles, médecins des villes. Un rappel de cours avant chaque niveau, une correction étape par étape avec le nuage dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire un point, placer un point, ou dire une tendance.",
      rappel: [
        "Un nuage de points représente deux caractères chiffrés : chaque individu donne UN point $(x ; y)$.",
        "$x$ (l'abscisse) se lit sur l'axe horizontal, $y$ (l'ordonnée) sur l'axe vertical, dans cet ordre.",
        "On lit les unités des axes : « en dizaines », « en centaines »…",
        "Tendance : les points montent (croissante), descendent (décroissante), ou partent dans tous les sens (aucune tendance).",
      ],
      exercices: [
        {
          enonce:
            "Chaque point représente un chêne d'une forêt : en abscisse, son âge en DIZAINES d'années ; en ordonnée, le diamètre de son tronc en DIZAINES de centimètres (modèle).\na) Lire les coordonnées du point $A$.\nb) Traduire par une phrase.\nc) Combien de chênes ont un tronc de plus de $50$ cm de diamètre ?",
          figure: repere([-1, 9, -1, 9], [], [
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 5, y: 4, label: "A" },
            { x: 6, y: 6 },
            { x: 8, y: 7 },
          ]),
          correction:
            "a) On descend de $A$ vers l'axe horizontal : $x = 5$. On va vers l'axe vertical : $y = 4$. Donc $A(5 ; 4)$.\nb) Ce chêne a $5$ dizaines d'années, soit $50$ ans, et un tronc de $4$ dizaines de cm, soit $40$ cm de diamètre.\nc) « Plus de $50$ cm », c'est $y > 5$ : les points d'ordonnées $6$ et $7$. Deux chênes.\n⚠️ Les unités d'abord : « $5$ » sur l'axe veut dire $50$ ans.",
          micros: ["info_nuage_lire"],
        },
        {
          enonce:
            "Un marchand a essayé cinq prix pour un même jus de fruits. Chaque point donne le prix (en €) et le nombre de bouteilles vendues dans la semaine, en CENTAINES (modèle).\na) Combien de bouteilles a-t-il vendues au prix de $3$ € ?\nb) À quel prix en a-t-il vendu $200$ ?\nc) Décrire la tendance du nuage.",
          figure: repere([-1, 6, -1, 10], [], [
            { x: 1, y: 9 },
            { x: 2, y: 7 },
            { x: 3, y: 6 },
            { x: 4, y: 4 },
            { x: 5, y: 2 },
          ], undefined, true),
          correction:
            "a) Le point d'abscisse $3$ a pour ordonnée $6$ : $6$ centaines, soit $600$ bouteilles.\nb) $200$ bouteilles, ce sont $2$ centaines : le point d'ordonnée $2$ a pour abscisse $5$. Au prix de $5$ €.\nc) Quand le prix augmente, les ventes diminuent : le nuage est décroissant, et ses points sont presque alignés.\n⭐ C'est la loi de la demande : plus c'est cher, moins on vend.",
          micros: ["info_nuage_lire", "info_nuage_tendance"],
        },
        {
          enonce:
            "Le tableau donne la consommation d'énergie de chauffage d'une maison, en DIZAINES de kWh par jour, selon la température extérieure (modèle). Construire le nuage de points.",
          figure: tableauProba(
            ["Température (°C)", "0", "2", "4", "6", "8"],
            [["Conso. (dizaines de kWh)", "10", "9", "7", "5", "4"]],
          ),
          correction:
            "La température va en abscisse, la consommation en ordonnée.\nChaque colonne du tableau donne un point : $(0 ; 10)$, $(2 ; 9)$, $(4 ; 7)$, $(6 ; 5)$, $(8 ; 4)$.\nOn place les cinq points, sans les relier.\n⭐ Plus il fait froid, plus on chauffe : le nuage descend.\n⚠️ On ne relie pas les points : entre deux mesures, on ne sait rien.",
          schema: ecranSeulement(
            repere([-1, 9, -1, 11], [], [
              { x: 0, y: 10 },
              { x: 2, y: 9 },
              { x: 4, y: 7 },
              { x: 6, y: 5 },
              { x: 8, y: 4 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire"],
        },
        {
          enonce:
            "Un randonneur relève la température à différentes altitudes, un même matin. En abscisse, l'altitude en CENTAINES de mètres ; en ordonnée, la température en °C (modèle).\na) Décrire la tendance du nuage.\nb) De combien de degrés la température baisse-t-elle entre $100$ m et $900$ m d'altitude ?",
          figure: repere([-1, 10, -1, 13], [], [
            { x: 1, y: 12 },
            { x: 3, y: 11 },
            { x: 5, y: 9 },
            { x: 7, y: 8 },
            { x: 9, y: 6 },
          ], undefined, true),
          correction:
            "a) Quand l'altitude augmente, la température diminue : le nuage est décroissant, et ses points sont presque alignés.\nb) À $100$ m (abscisse $1$) : $12$ °C. À $900$ m (abscisse $9$) : $6$ °C. La baisse est de $12 - 6 = 6$ °C.\n⭐ Plus on monte, plus il fait frais : les randonneurs en montagne le savent bien.",
          micros: ["info_nuage_tendance", "info_nuage_lire"],
        },
        {
          enonce:
            "Dans un nuage, chaque point représente un coureur : en abscisse, la distance parcourue en km ; en ordonnée, son temps en DIZAINES de minutes. Un coureur a parcouru $8$ km en $40$ minutes. Quel point faut-il placer : $(8 ; 4)$, $(4 ; 8)$, $(8 ; 40)$ ou $(40 ; 8)$ ?",
          correction:
            "L'abscisse est la distance : $x = 8$.\nL'ordonnée est le temps en dizaines de minutes : $40$ minutes, ce sont $4$ dizaines, donc $y = 4$.\nLe point est $(8 ; 4)$.\n⚠️ $(4 ; 8)$ inverse les deux caractères ; $(8 ; 40)$ oublie l'unité de l'axe.",
          schema: ecranSeulement(repere([-1, 9, -1, 6], [], [{ x: 8, y: 4, label: "P" }])),
          micros: ["info_nuage_construire"],
        },
        {
          enonce:
            "Pour huit matchs d'une équipe de football, on a placé le nombre de spectateurs (en milliers) en abscisse et le nombre de buts marqués en ordonnée (modèle). Le nombre de buts dépend-il du nombre de spectateurs ?",
          figure: repere([-1, 9, -1, 6], [], [
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 3, y: 4 },
            { x: 4, y: 2 },
            { x: 5, y: 3 },
            { x: 6, y: 1 },
            { x: 7, y: 4 },
            { x: 8, y: 2 },
          ]),
          correction:
            "Quand le nombre de spectateurs augmente, les points ne montent pas et ne descendent pas : ils oscillent entre $1$ et $4$ buts.\nLe nuage n'a aucune tendance.\nDans ce modèle, le nombre de buts ne semble pas lié au nombre de spectateurs.\n⭐ « Aucune tendance » est une vraie réponse : tous les nuages ne montent pas.",
          micros: ["info_nuage_tendance"],
        },
        {
          enonce:
            "Un glacier (le marchand de glaces !) note, chaque jour, le nombre d'heures de soleil (abscisse) et le nombre de glaces vendues, en CENTAINES (ordonnée).\na) Combien de glaces a-t-il vendues le jour où il y a eu $6$ h de soleil ?\nb) Combien de jours a-t-il vendu plus de $600$ glaces ?\nc) Décrire la tendance du nuage.",
          figure: repere([-1, 10, -1, 11], [], [
            { x: 4, y: 2 },
            { x: 5, y: 3 },
            { x: 6, y: 5 },
            { x: 7, y: 6 },
            { x: 8, y: 7 },
            { x: 9, y: 9 },
          ], undefined, true),
          correction:
            "a) Le point d'abscisse $6$ a pour ordonnée $5$ : $500$ glaces.\nb) « Plus de $600$ », c'est $y > 6$ : les points d'ordonnées $7$ et $9$. Deux jours.\n⚠️ Le jour à exactement $600$ glaces ne compte pas : $6$ n'est pas plus grand que $6$.\nc) Plus il y a de soleil, plus il vend de glaces : le nuage est croissant, presque aligné.",
          micros: ["info_nuage_lire", "info_nuage_tendance"],
        },
        {
          enonce:
            "Lina mesure son tournesol chaque semaine. Semaine $1$ : $10$ cm ; semaine $2$ : $20$ cm ; semaine $3$ : $40$ cm ; semaine $4$ : $60$ cm ; semaine $5$ : $80$ cm. Elle a placé les points (hauteur en DIZAINES de cm), mais un point est mal placé. Lequel ? Le corriger.",
          figure: repere([-1, 6, -1, 9], [], [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 5 },
            { x: 4, y: 6 },
            { x: 5, y: 8 },
          ]),
          correction:
            "On traduit chaque mesure en point : $(1 ; 1)$, $(2 ; 2)$, $(3 ; 4)$, $(4 ; 6)$, $(5 ; 8)$.\nOn compare au dessin, point par point : à la semaine $3$, le point est à $5$, soit $50$ cm.\nOr la semaine $3$, le tournesol mesurait $40$ cm : le bon point est $(3 ; 4)$.\n⭐ Vérifier un nuage, c'est relire le tableau colonne par colonne.",
          micros: ["info_nuage_construire", "info_nuage_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Choisir les unités, construire, puis décrire la tendance par une phrase.",
      rappel: [
        "Construire : choisir une unité pour chaque axe, puis placer les points un par un, $(x ; y)$ dans cet ordre.",
        "Décrire : « quand $x$ augmente, $y$ a tendance à augmenter (ou à diminuer) » ; les points sont-ils presque sur une droite ?",
        "Un point isolé, loin des autres, se signale : erreur de mesure, ou cas particulier.",
        "Une tendance montre un lien, pas forcément une cause.",
      ],
      exercices: [
        {
          titre: "Le vent et l'éolienne",
          enonce:
            "On a mesuré la puissance produite par une éolienne selon la vitesse du vent (modèle) : pour $10$, $20$, $30$, $40$ et $50$ km/h, elle produit $100$, $300$, $600$, $900$ et $1\\,100$ kW.\na) On gradue l'axe horizontal en dizaines de km/h, l'axe vertical en centaines de kW. Pourquoi ?\nb) Donner les coordonnées des cinq points, puis construire le nuage.\nc) Décrire la tendance.",
          correction:
            "a) Sinon, il faudrait $50$ graduations sur un axe et $1\\,100$ sur l'autre : illisible. Avec ces unités, $x$ va de $1$ à $5$ et $y$ de $1$ à $11$.\nb) $(1 ; 1)$, $(2 ; 3)$, $(3 ; 6)$, $(4 ; 9)$, $(5 ; 11)$.\nc) Plus le vent est fort, plus l'éolienne produit : le nuage est croissant.\nMais les points ne sont pas tout à fait alignés : la puissance gagne $2$, puis $3$, $3$ et $2$ centaines de kW d'un point à l'autre.\n⭐ Une éolienne produit peu par vent faible : il faut un vent assez fort pour qu'elle soit utile.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 12], [], [
              { x: 1, y: 1 },
              { x: 2, y: 3 },
              { x: 3, y: 6 },
              { x: 4, y: 9 },
              { x: 5, y: 11 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_tendance"],
        },
        {
          titre: "La température de l'eau",
          enonce:
            "Un plongeur mesure la température de l'eau d'un lac à différentes profondeurs. En abscisse, la profondeur en DIZAINES de mètres ; en ordonnée, la température en °C (modèle).\na) Décrire la tendance du nuage.\nb) Un point est isolé. Lequel ? Que dit-il ?\nc) Que penser de cette mesure ?",
          figure: repere([-1, 7, -1, 14], [], [
            { x: 1, y: 13 },
            { x: 2, y: 12 },
            { x: 3, y: 10 },
            { x: 4, y: 3, label: "P" },
            { x: 5, y: 8 },
            { x: 6, y: 7 },
          ], undefined, true),
          correction:
            "a) Plus on descend, plus l'eau est froide : le nuage est décroissant, presque aligné… sauf un point.\nb) Le point $P(4 ; 3)$ : à $40$ m de profondeur, l'eau serait à $3$ °C.\nc) Ses voisins donnent $10$ °C à $30$ m et $8$ °C à $50$ m : on attendrait environ $9$ °C à $40$ m.\nC'est très probablement une erreur de mesure (capteur, recopie), à vérifier avant d'utiliser les données.\n⚠️ On ne supprime pas un point isolé sans raison : on le signale, et on cherche pourquoi.",
          micros: ["info_nuage_tendance", "info_nuage_lire"],
        },
        {
          titre: "Revenus et loisirs",
          enonce:
            "Pour six ménages, on connaît le revenu mensuel, en MILLIERS d'euros, et les dépenses de loisirs, en CENTAINES d'euros par mois (modèle) : $(1 ; 1)$, $(2 ; 2)$, $(3 ; 2)$, $(4 ; 3)$, $(5 ; 4)$, $(6 ; 5)$.\na) Construire le nuage.\nb) Combien dépense en loisirs le ménage qui gagne $4\\,000$ € ?\nc) Décrire la tendance.",
          correction:
            "a) On place les six points ; l'axe horizontal va jusqu'à $6$, l'axe vertical jusqu'à $5$.\nb) Revenu de $4\\,000$ €, c'est $x = 4$ : le point $(4 ; 3)$. Ce ménage dépense $300$ € par mois en loisirs.\nc) Plus le revenu est élevé, plus les dépenses de loisirs sont élevées : le nuage est croissant, presque aligné.\n⭐ Un nuage croissant se lit dans les deux sens : un faible revenu va avec de faibles dépenses de loisirs.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 6], [], [
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 2 },
              { x: 4, y: 3 },
              { x: 5, y: 4 },
              { x: 6, y: 5 },
            ]),
          ),
          micros: ["info_nuage_construire", "info_nuage_lire", "info_nuage_tendance"],
        },
        {
          titre: "Richesse et CO₂",
          enonce:
            "Chaque point est un pays imaginaire : en abscisse, sa richesse par habitant, en DIZAINES de milliers de dollars ; en ordonnée, ses émissions de CO₂ par habitant, en tonnes par an (modèle).\na) Combien de pays émettent plus de $6$ tonnes par habitant ?\nb) Le pays le plus riche est-il le plus émetteur ?\nc) Comparer les pays d'abscisses $4$ et $5$. Que montre cet exemple ?\nd) Décrire la tendance.",
          figure: repere([-1, 7, -1, 13], [], [
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 5 },
            { x: 4, y: 9 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
          ], undefined, true),
          correction:
            "a) « Plus de $6$ » : les points d'ordonnées $9$, $8$ et $12$. Trois pays.\nb) Oui : le point le plus à droite, $(6 ; 12)$, est aussi le plus haut.\nc) Le pays d'abscisse $5$ est plus riche que celui d'abscisse $4$, mais il émet moins : $8$ tonnes contre $9$.\nUne tendance n'est pas une règle : elle vaut pour l'ensemble, pas pour chaque pays.\nd) Plus un pays est riche, plus il a tendance à émettre de CO₂ par habitant : le nuage est croissant.",
          micros: ["info_nuage_lire", "info_nuage_tendance"],
        },
        {
          titre: "La croissance d'un arbre",
          enonce:
            "Un forestier a mesuré des épicéas d'âges différents : en abscisse, l'âge en DIZAINES d'années ; en ordonnée, la hauteur en mètres (modèle).\na) De combien un épicéa grandit-il entre $10$ et $30$ ans ? entre $50$ et $80$ ans ?\nb) Décrire la tendance. Les points sont-ils alignés ?",
          figure: repere([-1, 9, -1, 14], [], [
            { x: 1, y: 2 },
            { x: 2, y: 5 },
            { x: 3, y: 8 },
            { x: 4, y: 10 },
            { x: 5, y: 11 },
            { x: 6, y: 12 },
            { x: 7, y: 12 },
            { x: 8, y: 13 },
          ], undefined, true),
          correction:
            "a) De $10$ à $30$ ans : de $2$ à $8$ m, soit $6$ m. De $50$ à $80$ ans : de $11$ à $13$ m, soit $2$ m seulement, en plus de temps.\nb) Plus l'arbre est vieux, plus il est grand : le nuage est croissant.\nMais il n'est pas aligné : il monte vite au début, puis de moins en moins. Le nuage se courbe.\n⭐ « Croissant » ne veut pas dire « aligné » : un bon commentaire dit les deux choses.",
          micros: ["info_nuage_tendance", "info_nuage_lire"],
        },
        {
          titre: "La pluie et le blé",
          enonce:
            "Pour cinq années, un agriculteur a noté la pluie tombée au printemps, en DIZAINES de mm, et le rendement de son blé, en tonnes par hectare (modèle) : $(2 ; 4)$, $(4 ; 6)$, $(6 ; 7)$, $(8 ; 8)$, $(10 ; 7)$.\na) Construire le nuage.\nb) Décrire la tendance.",
          correction:
            "a) L'axe horizontal va jusqu'à $10$ : on prend un grand repère. On place les cinq points.\nb) Jusqu'à $80$ mm de pluie, plus il pleut, meilleur est le rendement : de $4$ à $8$ tonnes par hectare.\nAu-delà, le rendement baisse : $7$ tonnes pour $100$ mm.\nLe nuage monte puis redescend : il n'est pas aligné, et il n'est pas croissant sur toute la plage.\n⭐ Trop peu d'eau, le blé a soif ; trop d'eau, il souffre aussi.",
          schema: ecranSeulement(
            repere([-1, 11, -1, 9], [], [
              { x: 2, y: 4 },
              { x: 4, y: 6 },
              { x: 6, y: 7 },
              { x: 8, y: 8 },
              { x: 10, y: 7 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_tendance"],
        },
        {
          titre: "La forêt et la densité des régions",
          enonce:
            "Pour six régions imaginaires, on connaît la densité de population, en DIZAINES d'habitants par km², et la part du territoire couverte de forêt, en DIZAINES de % (modèle) : $(2 ; 6)$, $(3 ; 5)$, $(5 ; 4)$, $(6 ; 4)$, $(8 ; 3)$, $(10 ; 2)$.\na) Construire le nuage.\nb) Quelle est la région la plus boisée ? Donner sa densité et sa part de forêt.\nc) Décrire la tendance.\nd) Peut-on conclure que les habitants font disparaître la forêt ?",
          correction:
            "a) On place les six points, dans un grand repère (l'axe horizontal va jusqu'à $10$).\nb) Le point le plus haut, $(2 ; 6)$ : $20$ habitants par km², et $60$ % de forêt.\nc) Plus une région est densément peuplée, moins elle est boisée : le nuage est décroissant, presque aligné.\nd) Non, pas avec ce seul nuage. Les régions boisées sont peut-être des régions de montagne, où l'on s'installe moins.\n⛔ Un lien entre deux caractères n'est pas une cause.",
          schema: ecranSeulement(
            repere([-1, 11, -1, 7], [], [
              { x: 2, y: 6 },
              { x: 3, y: 5 },
              { x: 5, y: 4 },
              { x: 6, y: 4 },
              { x: 8, y: 3 },
              { x: 10, y: 2 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_lire", "info_nuage_tendance"],
        },
        {
          titre: "Vitesse et consommation",
          enonce:
            "On mesure la consommation d'une voiture, en litres pour $100$ km, selon sa vitesse (modèle) : à $50$, $70$, $90$, $110$ et $130$ km/h, elle consomme $5$, $5$, $6$, $7$ et $9$ L/100 km.\na) En graduant la vitesse en dizaines de km/h, donner les coordonnées des points, et construire le nuage.\nb) Décrire la tendance.\nc) Sur autoroute, combien économise-t-on en roulant à $110$ km/h au lieu de $130$ km/h, sur un trajet de $500$ km ?",
          correction:
            "a) $(5 ; 5)$, $(7 ; 5)$, $(9 ; 6)$, $(11 ; 7)$, $(13 ; 9)$.\nb) Au-delà de $70$ km/h, plus on roule vite, plus on consomme : le nuage est croissant, et il monte de plus en plus vite.\nc) À $130$ km/h : $9$ L pour $100$ km ; à $110$ km/h : $7$ L. On économise $2$ L tous les $100$ km.\nSur $500$ km : $2 \\times 5 = 10$ litres de carburant économisés.\n⭐ La résistance de l'air grandit vite avec la vitesse : c'est elle qui fait grimper la consommation.",
          schema: ecranSeulement(
            repere([-1, 14, -1, 10], [], [
              { x: 5, y: 5 },
              { x: 7, y: 5 },
              { x: 9, y: 6 },
              { x: 11, y: 7 },
              { x: 13, y: 9 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_lire", "info_nuage_tendance"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Choisir les unités, construire le nuage, le lire, décrire sa tendance, et rester prudent.",
      rappel: [
        "On choisit des unités qui tiennent sur les axes, et on les écrit.",
        "On construit le nuage, on lit ce qu'on demande, on décrit la tendance en une phrase.",
        "On signale les points isolés, et on ne confond pas un lien avec une cause.",
      ],
      exercices: [
        {
          titre: "Le glacier qui recule",
          enonce:
            "On a mesuré la longueur d'un glacier des Alpes tous les dix ans (modèle).\na) On prend pour abscisse $x$ le nombre de décennies écoulées depuis $1980$. Quelle est l'abscisse de $2010$ ?\nb) Construire le nuage.\nc) Décrire la tendance.\nd) De combien le glacier a-t-il reculé en tout ? en moyenne par décennie ?",
          figure: tableauProba(
            ["Année", "1980", "1990", "2000", "2010", "2020"],
            [["Longueur (km)", "12", "11", "10", "8", "7"]],
          ),
          correction:
            "a) De $1980$ à $2010$, il s'est écoulé $3$ décennies : $x = 3$.\nb) Les points : $(0 ; 12)$, $(1 ; 11)$, $(2 ; 10)$, $(3 ; 8)$, $(4 ; 7)$.\nc) Le nuage est décroissant et presque aligné : le glacier raccourcit à chaque mesure.\nd) Recul total : $12 - 7 = 5$ km en $4$ décennies.\nEn moyenne : $5 \\div 4 = 1{,}25$ km par décennie.\n⭐ Choisir « le nombre de décennies » évite des abscisses à quatre chiffres : $0$ à $4$ au lieu de $1980$ à $2020$.",
          schema: repere([-1, 5, -1, 13], [], [
            { x: 0, y: 12 },
            { x: 1, y: 11 },
            { x: 2, y: 10 },
            { x: 3, y: 8 },
            { x: 4, y: 7 },
          ], undefined, true),
          micros: ["info_nuage_construire", "info_nuage_lire", "info_nuage_tendance"],
        },
        {
          titre: "Les abeilles et les pesticides",
          enonce:
            "Près de huit champs, un apiculteur a installé $10$ ruches. En abscisse, un indice de pesticides utilisés dans le champ (de $1$, faible, à $8$, fort) ; en ordonnée, le nombre de ruches encore actives au bout d'un an (modèle).\na) Combien de ruches sont restées actives près du champ d'indice $4$ ?\nb) Près de combien de champs reste-t-il au moins $6$ ruches actives ?\nc) Décrire la tendance.\nd) Ce nuage PROUVE-t-il que les pesticides font disparaître les ruches ?",
          figure: repere([-1, 9, -1, 11], [], [
            { x: 1, y: 10 },
            { x: 2, y: 9 },
            { x: 3, y: 9 },
            { x: 4, y: 7 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
            { x: 7, y: 4 },
            { x: 8, y: 3 },
          ], undefined, true),
          correction:
            "a) Le point d'abscisse $4$ a pour ordonnée $7$ : $7$ ruches actives.\nb) « Au moins $6$ » : les ordonnées $10$, $9$, $9$, $7$, $6$, $6$. Six champs.\nc) Plus l'indice de pesticides est fort, moins il reste de ruches actives : le nuage est décroissant, presque aligné.\nd) Non : il montre un lien fort, pas une preuve. D'autres causes peuvent jouer (les fleurs disponibles, les maladies, le climat).\nPour prouver une cause, il faut une expérience où l'on ne change QU'UNE chose à la fois.\n⭐ Un nuage est un signal d'alerte, qui pousse à chercher la cause.",
          micros: ["info_nuage_lire", "info_nuage_tendance"],
        },
        {
          titre: "Réviser, ça paie ?",
          enonce:
            "Neuf élèves ont noté le temps passé à réviser un contrôle (en heures) et leur note (sur $10$).\na) Construire le nuage.\nb) Décrire la tendance.\nc) Un point est isolé. Lequel ? Quelle explication imaginer ?\nd) Tom dit : « Si je révise $8$ h, j'aurai $9$ sur $10$. » Qu'en penser ?",
          figure: tableauProba(
            ["Heures", "1", "2", "2", "3", "4", "5", "6", "7", "8"],
            [["Note", "3", "4", "9", "4", "6", "7", "7", "8", "9"]],
          ),
          correction:
            "a) Neuf points : $(1 ; 3)$, $(2 ; 4)$, $(2 ; 9)$, $(3 ; 4)$, $(4 ; 6)$, $(5 ; 7)$, $(6 ; 7)$, $(7 ; 8)$, $(8 ; 9)$.\nb) Plus on révise, meilleure est la note : le nuage est croissant, presque aligné.\nc) Le point $(2 ; 9)$ : $9$ sur $10$ avec seulement $2$ h de révision. Peut-être un élève qui avait déjà bien compris en classe.\nd) C'est une TENDANCE, pas une promesse : l'élève qui a révisé $8$ h a eu $9$, mais un autre pourrait avoir moins.\n⭐ Le nuage dit que réviser aide, en moyenne. Il ne prédit pas la note d'un élève précis.",
          schema: ecranSeulement(
            repere([-1, 9, -1, 11], [], [
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 2, y: 9 },
              { x: 3, y: 4 },
              { x: 4, y: 6 },
              { x: 5, y: 7 },
              { x: 6, y: 7 },
              { x: 7, y: 8 },
              { x: 8, y: 9 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_tendance", "info_nuage_lire"],
        },
        {
          titre: "Les médecins des villes",
          enonce:
            "Pour six villes d'un département (modèle) : $2\\,000$ habitants et $2$ médecins ; $4\\,000$ et $4$ ; $5\\,000$ et $3$ ; $8\\,000$ et $8$ ; $10\\,000$ et $10$ ; $12\\,000$ et $12$.\na) En prenant la population en milliers d'habitants, construire le nuage.\nb) Décrire la tendance. Combien de médecins pour $1\\,000$ habitants, à peu près ?\nc) Une ville est « sous-dotée ». Laquelle ? Justifier.",
          correction:
            "a) Les points : $(2 ; 2)$, $(4 ; 4)$, $(5 ; 3)$, $(8 ; 8)$, $(10 ; 10)$, $(12 ; 12)$, dans un grand repère.\nb) Plus une ville est peuplée, plus elle a de médecins : le nuage est croissant, et presque tous les points sont sur la droite $y = x$.\nCela fait environ $1$ médecin pour $1\\,000$ habitants.\nc) La ville de $5\\,000$ habitants : avec la tendance, elle devrait avoir environ $5$ médecins ; elle n'en a que $3$.\nSon point est nettement sous les autres.\n⭐ C'est ainsi qu'on repère un « désert médical » : un territoire en dessous de la tendance.",
          schema: ecranSeulement(
            repere([-1, 13, -1, 13], [], [
              { x: 2, y: 2 },
              { x: 4, y: 4 },
              { x: 5, y: 3 },
              { x: 8, y: 8 },
              { x: 10, y: 10 },
              { x: 12, y: 12 },
            ], undefined, true),
          ),
          micros: ["info_nuage_construire", "info_nuage_lire", "info_nuage_tendance"],
        },
      ],
    },
  ],
};
