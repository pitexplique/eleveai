// ─── Fiche d'exercices : arbre pondéré, calculer (1re) ────────────────────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`. Calculatrice
// autorisée, des produits qui tombent juste.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/arbres-ponderes.bank.ts`
// (notionId alea_arbre_calcul) : la probabilité d'un CHEMIN (on multiplie),
// celle d'un évènement atteint par plusieurs chemins (on additionne), et le
// passage de l'arbre au tableau croisé, et retour.
// ⛔ Pas de formule des probabilités totales NOMMÉE : on additionne les chemins
// qui mènent au même évènement, comme au tableau.
//
// ⭐⭐ LE FIL : LE LONG D'UN CHEMIN, ON MULTIPLIE ; ENTRE LES CHEMINS, ON
// ADDITIONNE. L'arbre et le tableau croisé disent la même chose : on passe de
// l'un à l'autre avec 100, 1 000 ou 10 000 individus.
// ⛔ LE PIÈGE CENTRAL : oublier un chemin (exercices 2, 4, 7, 10, 12) ou lire
// la branche au lieu du chemin (exercices 1, 3, 9).
//
// ⭐ Frédéric, 28/09 : des arbres qui MONTRENT le chemin calculé (« B → 0,2 »
// au bout de la branche), des tableaux croisés, et des contextes d'économie,
// d'écologie, de sport, de nature, de PHYSIQUE (détecteur de particules,
// exercice 9 ; radar à effet Doppler, exercice 17) et d'HISTOIRE-GÉO
// (élection à deux tours, exercice 10 ; ménages d'une ville, exercice 15 ;
// choléra de Paris en 1832, exercice 18). Les chiffres sont des MODÈLES
// arrondis, jamais présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-arbre-calcul.mjs`.
//
// Micro-compétences : alea_arbre_chemin (1, 3, 7, 8, 9, 10, 11, 12, 14, 16,
// 17, 18, 19, 20), alea_arbre_somme_chemins (2, 4, 7, 9, 10, 11, 12, 13, 14,
// 15, 16, 17, 18, 19, 20), alea_arbre_vers_tableau (5, 6, 9, 11, 13, 15, 17,
// 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaArbreCalculPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-arbre-calcul",
  titre: "Arbre pondéré : calculer",
  accroche:
    "Vingt exercices pour calculer avec un arbre pondéré : la probabilité d'un chemin (on multiplie), celle d'un évènement atteint par plusieurs chemins (on additionne), et le passage de l'arbre au tableau croisé. Feux tricolores, détecteur de particules, élection à deux tours, biathlon, cigognes migratrices, radar routier, choléra de 1832, panneaux solaires, frelon asiatique. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un chemin à multiplier, des chemins à additionner, ou un tableau à remplir.",
      rappel: [
        "La probabilité d'un CHEMIN est le PRODUIT des probabilités de ses branches : $P(A \\cap B) = P(A) \\times P_A(B)$.",
        "Si plusieurs chemins mènent à $B$, on ADDITIONNE leurs probabilités : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
        "Pour passer au tableau croisé, on multiplie chaque chemin par un effectif simple ($100$, $1\\,000$…).",
      ],
      exercices: [
        {
          enonce: "Avec l'arbre ci-dessous, calculer $P(A \\cap B)$ et $P(\\overline{A} \\cap \\overline{B})$.",
          figure: arbre([
            { label: "A", proba: "0,8", enfants: [{ label: "B", proba: "0,25" }, { label: "non B", proba: "0,75" }] },
            { label: "non A", proba: "0,2", enfants: [{ label: "B", proba: "0,5" }, { label: "non B", proba: "0,5" }] },
          ]),
          correction:
            "$A \\cap B$, c'est le chemin « $A$ puis $B$ » : on multiplie ses deux branches.\n$P(A \\cap B) = 0{,}8 \\times 0{,}25 = 0{,}2$.\nDe même : $P(\\overline{A} \\cap \\overline{B}) = 0{,}2 \\times 0{,}5 = 0{,}1$.\n⚠️ Le piège : répondre $0{,}25$. C'est la branche seule, $P_A(B)$ ; il faut encore passer par $A$.",
          micros: ["alea_arbre_chemin"],
        },
        {
          enonce: "Avec l'arbre de l'exercice 1, calculer $P(B)$.",
          correction:
            "Deux chemins mènent à $B$ : « $A$ puis $B$ » et « $\\overline{A}$ puis $B$ ».\n$P(A \\cap B) = 0{,}8 \\times 0{,}25 = 0{,}2$ et $P(\\overline{A} \\cap B) = 0{,}2 \\times 0{,}5 = 0{,}1$.\nOn additionne : $P(B) = 0{,}2 + 0{,}1 = 0{,}3$.\n⛔ Le piège : oublier un des deux chemins, et répondre $0{,}2$.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,8", enfants: [{ label: "B → 0,2", proba: "0,25" }, { label: "non B", proba: "0,75" }] },
              { label: "non A", proba: "0,2", enfants: [{ label: "B → 0,1", proba: "0,5" }, { label: "non B", proba: "0,5" }] },
            ]),
          ),
          micros: ["alea_arbre_somme_chemins"],
        },
        {
          enonce:
            "Une graine de tournesol germe avec la probabilité $0{,}9$. Une graine qui a germé donne une plante qui fleurit avec la probabilité $0{,}7$. Quelle est la probabilité qu'une graine semée donne une fleur ?",
          correction:
            "L'arbre a deux étapes : germer ($G$), puis fleurir ($F$). Pour fleurir, il faut d'abord germer.\nLe chemin « $G$ puis $F$ » : $P(G \\cap F) = 0{,}9 \\times 0{,}7 = 0{,}63$.\nSur $100$ graines, environ $63$ donnent une fleur.\n⚠️ $0{,}7$ ne répond pas à la question : c'est la probabilité de fleurir PARMI les graines qui ont germé.",
          schema: ecranSeulement(arbre([{ label: "G", proba: "0,9", enfants: [{ label: "F → 0,63", proba: "0,7" }, { label: "non F", proba: "0,3" }] }, { label: "non G", proba: "0,1" }])),
          micros: ["alea_arbre_chemin"],
        },
        {
          enonce:
            "Un élève vient au lycée en bus, à pied ou en voiture, puis arrive en retard ($R$) ou non. Calculer $P(R)$.",
          figure: arbre([
            { label: "Bus", proba: "0,5", enfants: [{ label: "R", proba: "0,1" }, { label: "non R", proba: "0,9" }] },
            { label: "Pied", proba: "0,3", enfants: [{ label: "R", proba: "0,05" }, { label: "non R", proba: "0,95" }] },
            { label: "Voiture", proba: "0,2", enfants: [{ label: "R", proba: "0,2" }, { label: "non R", proba: "0,8" }] },
          ]),
          correction:
            "Trois chemins mènent à $R$ : un par moyen de transport.\nBus : $0{,}5 \\times 0{,}1 = 0{,}05$. Pied : $0{,}3 \\times 0{,}05 = 0{,}015$. Voiture : $0{,}2 \\times 0{,}2 = 0{,}04$.\n$P(R) = 0{,}05 + 0{,}015 + 0{,}04 = 0{,}105$.\n⭐ Autant de chemins que de branches au premier niveau : on n'en oublie aucun.",
          micros: ["alea_arbre_somme_chemins"],
        },
        {
          enonce:
            "On sait que $P(A) = 0{,}4$, $P_A(B) = 0{,}5$ et $P_{\\overline{A}}(B) = 0{,}25$. Compléter un tableau croisé pour $100$ individus, puis y lire $P(B)$.",
          correction:
            "$A$ : $0{,}4 \\times 100 = 40$ individus, dont $0{,}5 \\times 40 = 20$ dans $B$ et $20$ hors de $B$.\n$\\overline{A}$ : $60$ individus, dont $0{,}25 \\times 60 = 15$ dans $B$ et $45$ hors de $B$.\nColonne $B$ : $20 + 15 = 35$. Donc $P(B) = \\dfrac{35}{100} = 0{,}35$.\n✔️ Par l'arbre : $0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}25 = 0{,}2 + 0{,}15 = 0{,}35$.\n⭐ Chaque case du tableau est un chemin de l'arbre, multiplié par $100$.",
          schema: tableauProba(["Sur 100", "B", "non B", "Total"], [["A", "20", "20", "40"], ["non A", "15", "45", "60"], ["Total", "35", "65", "100"]], [[0, 1], [1, 1], [2, 1]]),
          micros: ["alea_arbre_vers_tableau"],
        },
        {
          enonce:
            "Une association compte $200$ bénévoles. $A$ : « avoir moins de $25$ ans », $B$ : « venir chaque semaine ». À partir du tableau, construire l'arbre pondéré qui commence par $A$.",
          figure: tableauProba(["", "B", "non B", "Total"], [["A", "30", "20", "50"], ["non A", "60", "90", "150"], ["Total", "90", "110", "200"]]),
          correction:
            "Premier niveau : $P(A) = \\dfrac{50}{200} = 0{,}25$ et $P(\\overline{A}) = 0{,}75$.\nDerrière $A$, on se place sur la ligne $A$ : $P_A(B) = \\dfrac{30}{50} = 0{,}6$, et $P_A(\\overline{B}) = 0{,}4$.\nDerrière $\\overline{A}$ : $P_{\\overline{A}}(B) = \\dfrac{60}{150} = 0{,}4$, et $P_{\\overline{A}}(\\overline{B}) = 0{,}6$.\n⚠️ Les branches du deuxième niveau se calculent sur le total de la LIGNE, pas sur $200$.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,25", enfants: [{ label: "B", proba: "0,6" }, { label: "non B", proba: "0,4" }] },
              { label: "non A", proba: "0,75", enfants: [{ label: "B", proba: "0,4" }, { label: "non B", proba: "0,6" }] },
            ]),
          ),
          micros: ["alea_arbre_vers_tableau"],
        },
        {
          enonce:
            "Sur un trajet, on passe deux feux tricolores. Le premier est vert ($V_1$) ou rouge ($R_1$) ; les feux sont réglés ensemble, et le second dépend du premier. Calculer la probabilité de trouver exactement un feu vert.",
          figure: arbre([
            { label: "V1", proba: "0,6", enfants: [{ label: "V2", proba: "0,8" }, { label: "R2", proba: "0,2" }] },
            { label: "R1", proba: "0,4", enfants: [{ label: "V2", proba: "0,3" }, { label: "R2", proba: "0,7" }] },
          ]),
          correction:
            "« Exactement un vert », ce sont deux chemins : vert puis rouge, ou rouge puis vert.\n$V_1$ puis $R_2$ : $0{,}6 \\times 0{,}2 = 0{,}12$.\n$R_1$ puis $V_2$ : $0{,}4 \\times 0{,}3 = 0{,}12$.\nOn additionne : $0{,}12 + 0{,}12 = 0{,}24$.\n⚠️ Le chemin « vert puis vert » a DEUX feux verts : il ne compte pas.",
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins"],
        },
        {
          enonce:
            "On donne $P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\\overline{A}}(B) = 0{,}2$. Calculer la probabilité de chacun des quatre chemins de l'arbre, puis vérifier le résultat.",
          correction:
            "$P(A \\cap B) = 0{,}3 \\times 0{,}6 = 0{,}18$ et $P(A \\cap \\overline{B}) = 0{,}3 \\times 0{,}4 = 0{,}12$.\n$P(\\overline{A} \\cap B) = 0{,}7 \\times 0{,}2 = 0{,}14$ et $P(\\overline{A} \\cap \\overline{B}) = 0{,}7 \\times 0{,}8 = 0{,}56$.\nVérification : $0{,}18 + 0{,}12 + 0{,}14 + 0{,}56 = 1$.\n⭐ Les chemins d'un arbre décrivent TOUTES les issues, sans en répéter : leur somme vaut toujours $1$.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,3", enfants: [{ label: "B → 0,18", proba: "0,6" }, { label: "non B → 0,12", proba: "0,4" }] },
              { label: "non A", proba: "0,7", enfants: [{ label: "B → 0,14", proba: "0,2" }, { label: "non B → 0,56", proba: "0,8" }] },
            ]),
          ),
          micros: ["alea_arbre_chemin"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Construire ou lire l'arbre, calculer les chemins utiles, les additionner, et conclure.",
      rappel: [
        "On repère les chemins qui mènent à l'évènement cherché ; on calcule chacun par un produit ; on les additionne.",
        "Un tableau croisé sur $1\\,000$ individus contient les mêmes informations que l'arbre : chaque case est un chemin fois $1\\,000$.",
        "Dans l'autre sens, les branches du deuxième niveau se lisent sur les LIGNES du tableau.",
      ],
      exercices: [
        {
          titre: "Le détecteur de particules",
          enonce:
            "Une source radioactive émet des particules alpha ou bêta. Un détecteur enregistre ($D$) une particule alpha avec la probabilité $0{,}9$, une particule bêta avec la probabilité $0{,}6$.\na) Calculer la probabilité qu'une particule émise soit une alpha détectée.\nb) Calculer la probabilité qu'une particule soit détectée.\nc) Compléter un tableau croisé pour $1\\,000$ particules émises.",
          figure: arbre([
            { label: "Alpha", proba: "0,3", enfants: [{ label: "D", proba: "0,9" }, { label: "non D", proba: "0,1" }] },
            { label: "Bêta", proba: "0,7", enfants: [{ label: "D", proba: "0,6" }, { label: "non D", proba: "0,4" }] },
          ]),
          correction:
            "a) Le chemin « Alpha puis $D$ » : $0{,}3 \\times 0{,}9 = 0{,}27$.\nb) Deux chemins mènent à $D$. « Bêta puis $D$ » : $0{,}7 \\times 0{,}6 = 0{,}42$.\n$P(D) = 0{,}27 + 0{,}42 = 0{,}69$.\nc) Alpha : $300$ particules, dont $270$ détectées et $30$ non. Bêta : $700$, dont $420$ détectées et $280$ non. Détectées : $690$.\n⭐ Le physicien parle de l'« efficacité » du détecteur : ici, il enregistre $69$ % des particules émises.",
          schema: ecranSeulement(tableauProba(["Sur 1000", "Détectée", "Non", "Total"], [["Alpha", "270", "30", "300"], ["Bêta", "420", "280", "700"], ["Total", "690", "310", "1000"]], [[0, 1], [1, 1], [2, 1]])),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
        {
          titre: "L'élection à deux tours",
          enonce:
            "Dans une élection à deux tours (modèle), au premier tour, un électeur a voté pour A, pour B, ou pour un autre candidat. Au second tour, il ne reste que A et B, et on suppose que tout le monde revote. L'arbre donne les reports de voix.\na) Calculer la probabilité qu'un électeur ait voté pour B au premier tour puis pour A au second.\nb) Quelle est la probabilité de voter A au second tour ? Qui gagne l'élection ?",
          figure: arbre([
            { label: "A", proba: "0,4", enfants: [{ label: "Vote A", proba: "0,95" }, { label: "Vote B", proba: "0,05" }] },
            { label: "B", proba: "0,35", enfants: [{ label: "Vote A", proba: "0,1" }, { label: "Vote B", proba: "0,9" }] },
            { label: "Autre", proba: "0,25", enfants: [{ label: "Vote A", proba: "0,5" }, { label: "Vote B", proba: "0,5" }] },
          ]),
          correction:
            "a) Le chemin « B puis Vote A » : $0{,}35 \\times 0{,}1 = 0{,}035$.\nb) Trois chemins mènent à « Vote A » : $0{,}4 \\times 0{,}95 = 0{,}38$ ; $0{,}035$ ; $0{,}25 \\times 0{,}5 = 0{,}125$.\n$P(\\text{Vote A}) = 0{,}38 + 0{,}035 + 0{,}125 = 0{,}54$.\nA l'emporte avec $54$ % des voix.\n⭐ En tête au premier tour avec $40$ %, A gagne grâce aux REPORTS : les électeurs des autres candidats se partagent.",
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins"],
        },
        {
          titre: "Les ampoules de la maison",
          enonce:
            "Dans une maison, $60$ % des ampoules sont des LED, les autres sont halogènes. Dans l'année, une LED tombe en panne ($P$) avec la probabilité $0{,}02$ ; une halogène avec la probabilité $0{,}2$ (modèle).\na) Construire l'arbre et calculer $P(P)$.\nb) Compléter un tableau croisé pour $1\\,000$ ampoules.\nc) Parmi les ampoules en panne, combien sont des halogènes ? Qu'en conclure ?",
          correction:
            "a) LED puis panne : $0{,}6 \\times 0{,}02 = 0{,}012$. Halogène puis panne : $0{,}4 \\times 0{,}2 = 0{,}08$.\n$P(P) = 0{,}012 + 0{,}08 = 0{,}092$.\nb) LED : $600$ ampoules, dont $12$ en panne et $588$ non. Halogènes : $400$, dont $80$ en panne et $320$ non. En panne : $92$.\nc) $80$ des $92$ pannes viennent des halogènes, soit presque neuf sur dix.\n⭐ Une LED dure plus longtemps et consomme moins : remplacer les halogènes réduit les déchets ET la facture.",
          schema: ecranSeulement(
            arbre([
              { label: "LED", proba: "0,6", enfants: [{ label: "P → 0,012", proba: "0,02" }, { label: "non P", proba: "0,98" }] },
              { label: "Halogène", proba: "0,4", enfants: [{ label: "P → 0,08", proba: "0,2" }, { label: "non P", proba: "0,8" }] },
            ]),
          ),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
        {
          titre: "Le biathlon",
          enonce:
            "Une biathlète tire une série couchée puis une série debout. $C$ : « la série couchée est sans faute », $D$ : « la série debout est sans faute ». Après une série couchée sans faute, elle est plus confiante (modèle).\na) Calculer la probabilité qu'elle réussisse les deux séries sans faute.\nb) Calculer la probabilité qu'elle réussisse exactement une série sans faute.\nc) Calculer la probabilité qu'elle n'en réussisse aucune, et vérifier la somme des trois résultats.",
          figure: arbre([
            { label: "C", proba: "0,6", enfants: [{ label: "D", proba: "0,5" }, { label: "non D", proba: "0,5" }] },
            { label: "non C", proba: "0,4", enfants: [{ label: "D", proba: "0,3" }, { label: "non D", proba: "0,7" }] },
          ]),
          correction:
            "a) Le chemin « $C$ puis $D$ » : $0{,}6 \\times 0{,}5 = 0{,}3$.\nb) Deux chemins : « $C$ puis $\\overline{D}$ », $0{,}6 \\times 0{,}5 = 0{,}3$ ; « $\\overline{C}$ puis $D$ », $0{,}4 \\times 0{,}3 = 0{,}12$.\nExactement une : $0{,}3 + 0{,}12 = 0{,}42$.\nc) « $\\overline{C}$ puis $\\overline{D}$ » : $0{,}4 \\times 0{,}7 = 0{,}28$.\nVérification : $0{,}3 + 0{,}42 + 0{,}28 = 1$.\n⭐ Zéro, une ou deux séries sans faute : trois cas qui couvrent tout, donc leur somme vaut $1$.",
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins"],
        },
        {
          titre: "L'application de la banque",
          enonce:
            "Une banque compte $30$ % de clients de moins de $30$ ans ($J$). Parmi eux, $60$ % utilisent l'application mobile ($M$) ; parmi les autres clients, $40$ % (modèle).\na) Compléter un tableau croisé pour $1\\,000$ clients.\nb) En déduire $P(M)$, et le retrouver par l'arbre.",
          correction:
            "a) Jeunes : $300$ clients, dont $0{,}6 \\times 300 = 180$ utilisent l'application et $120$ non.\nAutres : $700$ clients, dont $0{,}4 \\times 700 = 280$ l'utilisent et $420$ non. Utilisateurs : $180 + 280 = 460$.\nb) $P(M) = \\dfrac{460}{1\\,000} = 0{,}46$.\nPar l'arbre : $0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}4 = 0{,}18 + 0{,}28 = 0{,}46$.\n⭐ Les deux chemins de l'arbre sont les deux cases de la colonne $M$, divisées par $1\\,000$.",
          schema: tableauProba(["Sur 1000", "Appli", "Pas d'appli", "Total"], [["Jeunes", "180", "120", "300"], ["Autres", "280", "420", "700"], ["Total", "460", "540", "1000"]], [[0, 1], [1, 1], [2, 1]]),
          micros: ["alea_arbre_vers_tableau", "alea_arbre_somme_chemins"],
        },
        {
          titre: "Les cigognes migratrices",
          enonce:
            "À l'automne, les cigognes blanches d'Europe gagnent l'Afrique soit par l'ouest (détroit de Gibraltar), soit par l'est (Bosphore). Dans une colonie (modèle), $70$ % des jeunes partent par l'ouest et survivent au voyage ($S$) avec la probabilité $0{,}8$ ; ceux qui partent par l'est survivent avec la probabilité $0{,}6$.\na) Construire l'arbre.\nb) Calculer la probabilité qu'un jeune parte par l'est et survive.\nc) Calculer $P(S)$.",
          correction:
            "a) Premier niveau : « Ouest » $0{,}7$, « Est » $0{,}3$. Derrière « Ouest » : $S$ $0{,}8$, $\\overline{S}$ $0{,}2$. Derrière « Est » : $S$ $0{,}6$, $\\overline{S}$ $0{,}4$.\nb) Le chemin « Est puis $S$ » : $0{,}3 \\times 0{,}6 = 0{,}18$.\nc) « Ouest puis $S$ » : $0{,}7 \\times 0{,}8 = 0{,}56$. Donc $P(S) = 0{,}56 + 0{,}18 = 0{,}74$.\n⭐ Les grands voiliers évitent de traverser la mer : ils ont besoin des courants d'air chaud qui montent au-dessus des terres. D'où ces deux passages étroits.",
          schema: ecranSeulement(
            arbre([
              { label: "Ouest", proba: "0,7", enfants: [{ label: "S → 0,56", proba: "0,8" }, { label: "non S", proba: "0,2" }] },
              { label: "Est", proba: "0,3", enfants: [{ label: "S → 0,18", proba: "0,6" }, { label: "non S", proba: "0,4" }] },
            ]),
          ),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins"],
        },
        {
          titre: "Vivre seul",
          enonce:
            "Un recensement (modèle) décrit $500$ habitants d'un quartier selon leur âge et le fait de vivre seul ($S$). On choisit un habitant au hasard.\na) Construire l'arbre pondéré qui commence par l'âge.\nb) Recalculer $P(S)$ avec l'arbre, et vérifier sur le tableau.",
          figure: tableauProba(["", "Seul", "Pas seul", "Total"], [["Moins de 60", "60", "340", "400"], ["60 et plus", "40", "60", "100"], ["Total", "100", "400", "500"]]),
          correction:
            "a) Premier niveau : « Moins de $60$ ans » $\\dfrac{400}{500} = 0{,}8$ ; « $60$ ans et plus » $0{,}2$.\nDeuxième niveau, sur chaque LIGNE : $P(S)$ sachant moins de $60$ ans $= \\dfrac{60}{400} = 0{,}15$ ; sachant $60$ ans et plus $= \\dfrac{40}{100} = 0{,}4$.\nb) $P(S) = 0{,}8 \\times 0{,}15 + 0{,}2 \\times 0{,}4 = 0{,}12 + 0{,}08 = 0{,}2$.\nSur le tableau : $\\dfrac{100}{500} = 0{,}2$. Les deux chemins donnent bien la colonne « Seul ».\n⭐ Les plus âgés sont peu nombreux mais vivent bien plus souvent seuls : c'est un enjeu des politiques du vieillissement.",
          schema: ecranSeulement(
            arbre([
              { label: "Moins de 60", proba: "0,8", enfants: [{ label: "S → 0,12", proba: "0,15" }, { label: "non S", proba: "0,85" }] },
              { label: "60 et plus", proba: "0,2", enfants: [{ label: "S → 0,08", proba: "0,4" }, { label: "non S", proba: "0,6" }] },
            ]),
          ),
          micros: ["alea_arbre_vers_tableau", "alea_arbre_somme_chemins"],
        },
        {
          titre: "Les colis en retard",
          enonce:
            "Un transporteur livre $50$ % de ses colis en ville, $30$ % en zone périurbaine et $20$ % à la campagne. Un colis arrive en retard ($R$) avec la probabilité $0{,}1$ en ville, $0{,}2$ en périurbain et $0{,}4$ à la campagne (modèle).\na) Construire l'arbre.\nb) Calculer $P(R)$.\nc) Quelle zone produit le plus de retards ? Le taux de retard le plus élevé ?",
          correction:
            "a) Premier niveau : $0{,}5$, $0{,}3$, $0{,}2$. Derrière chaque zone : $R$ avec $0{,}1$, $0{,}2$, $0{,}4$, et $\\overline{R}$ avec le complément à $1$.\nb) Ville : $0{,}5 \\times 0{,}1 = 0{,}05$. Périurbain : $0{,}3 \\times 0{,}2 = 0{,}06$. Campagne : $0{,}2 \\times 0{,}4 = 0{,}08$.\n$P(R) = 0{,}05 + 0{,}06 + 0{,}08 = 0{,}19$.\nc) Le plus de retards : la campagne, avec $0{,}08$ sur $0{,}19$. Le taux le plus élevé : la campagne aussi, $0{,}4$.\n⚠️ Les deux ne vont pas toujours ensemble : un chemin dépend AUSSI de la première branche.",
          schema: arbre([
            { label: "Ville", proba: "0,5", enfants: [{ label: "R → 0,05", proba: "0,1" }, { label: "non R", proba: "0,9" }] },
            { label: "Périurbain", proba: "0,3", enfants: [{ label: "R → 0,06", proba: "0,2" }, { label: "non R", proba: "0,8" }] },
            { label: "Campagne", proba: "0,2", enfants: [{ label: "R → 0,08", proba: "0,4" }, { label: "non R", proba: "0,6" }] },
          ]),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Arbre, chemins, tableau croisé, puis une phrase qui répond à la question posée.",
      rappel: [
        "Multiplier le long d'un chemin, additionner les chemins qui mènent au même évènement.",
        "Pour répondre à « parmi les $B$, quelle part de $A$ ? », on passe au tableau : la case divisée par le total de la colonne $B$.",
      ],
      exercices: [
        {
          titre: "Le radar routier",
          enonce:
            "Un radar mesure la vitesse des voitures grâce à l'effet Doppler, avec une petite incertitude. Sur une route (modèle), $10$ % des voitures sont en excès de vitesse ($E$). Le radar flashe ($F$) $95$ % des voitures en excès, et, à cause de l'incertitude, $1$ % des voitures en règle.\na) Construire l'arbre pondéré.\nb) Calculer $P(E \\cap F)$ et $P(\\overline{E} \\cap F)$, puis $P(F)$.\nc) Compléter un tableau croisé pour $10\\,000$ voitures.\nd) Parmi les voitures flashées, quelle part était vraiment en excès ?",
          correction:
            "a) Premier niveau : $E$ $0{,}1$, $\\overline{E}$ $0{,}9$. Derrière $E$ : $F$ $0{,}95$, $\\overline{F}$ $0{,}05$. Derrière $\\overline{E}$ : $F$ $0{,}01$, $\\overline{F}$ $0{,}99$.\nb) $P(E \\cap F) = 0{,}1 \\times 0{,}95 = 0{,}095$ et $P(\\overline{E} \\cap F) = 0{,}9 \\times 0{,}01 = 0{,}009$.\n$P(F) = 0{,}095 + 0{,}009 = 0{,}104$.\nc) En excès : $1\\,000$, dont $950$ flashées. En règle : $9\\,000$, dont $90$ flashées. Flashées : $1\\,040$.\nd) Parmi les $1\\,040$ voitures flashées, $950$ étaient en excès : $\\dfrac{950}{1\\,040} \\approx 0{,}91$.\n⭐ Environ $9$ flashs sur $10$ sont justifiés. C'est pour tenir compte de l'incertitude de mesure qu'en France on retire une marge de quelques km/h à la vitesse relevée par un radar.",
          schema: tableauProba(["Sur 10000", "Flash", "Pas flash", "Total"], [["Excès", "950", "50", "1000"], ["En règle", "90", "8910", "9000"], ["Total", "1040", "8960", "10000"]], [[0, 1], [2, 1]]),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
        {
          titre: "Le choléra de Paris en 1832",
          enonce:
            "En $1832$, une épidémie de choléra frappe Paris. On en fait un modèle : un habitant vit dans les quartiers du centre, très peuplés, dans les faubourgs, ou dans les quartiers de l'ouest, plus aisés ; l'arbre donne la probabilité de tomber malade ($M$) dans chacun.\na) Calculer $P(M)$.\nb) Compléter un tableau croisé pour $10\\,000$ habitants.\nc) Parmi les malades, quelle part vivait au centre ? Comparer à la part des habitants du centre.",
          figure: arbre([
            { label: "Centre", proba: "0,4", enfants: [{ label: "M", proba: "0,05" }, { label: "non M", proba: "0,95" }] },
            { label: "Faubourgs", proba: "0,35", enfants: [{ label: "M", proba: "0,03" }, { label: "non M", proba: "0,97" }] },
            { label: "Ouest", proba: "0,25", enfants: [{ label: "M", proba: "0,01" }, { label: "non M", proba: "0,99" }] },
          ]),
          correction:
            "a) Trois chemins : $0{,}4 \\times 0{,}05 = 0{,}02$ ; $0{,}35 \\times 0{,}03 = 0{,}0105$ ; $0{,}25 \\times 0{,}01 = 0{,}0025$.\n$P(M) = 0{,}02 + 0{,}0105 + 0{,}0025 = 0{,}033$.\nb) Centre : $4\\,000$ habitants, $200$ malades. Faubourgs : $3\\,500$, $105$ malades. Ouest : $2\\,500$, $25$ malades. Malades : $330$.\nc) $\\dfrac{200}{330} \\approx 0{,}61$ : environ $61$ % des malades vivaient au centre, qui ne compte que $40$ % des habitants.\n⭐ Dans ce modèle, l'épidémie frappe plus fort là où l'on vit entassé : le choléra est aussi une question de géographie sociale.",
          schema: ecranSeulement(tableauProba(["Sur 10000", "Malade", "Sain", "Total"], [["Centre", "200", "3800", "4000"], ["Faubourgs", "105", "3395", "3500"], ["Ouest", "25", "2475", "2500"], ["Total", "330", "9670", "10000"]], [[0, 1], [3, 1]])),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Dans un lotissement (modèle), $40$ % des toits équipés de panneaux solaires sont orientés plein sud ; les autres sont orientés est ou ouest. Un toit plein sud produit assez d'électricité pour la maison en été ($A$) avec la probabilité $0{,}9$ ; un toit est ou ouest avec la probabilité $0{,}5$.\na) Calculer $P(A)$.\nb) Compléter un tableau croisé pour $200$ maisons.\nc) Parmi les maisons dont la production ne suffit pas, quelle part a un toit plein sud ?",
          correction:
            "a) Sud puis $A$ : $0{,}4 \\times 0{,}9 = 0{,}36$. Est-ouest puis $A$ : $0{,}6 \\times 0{,}5 = 0{,}3$.\n$P(A) = 0{,}36 + 0{,}3 = 0{,}66$.\nb) Sud : $80$ maisons, $72$ suffisantes et $8$ non. Est-ouest : $120$ maisons, $60$ et $60$. Suffisantes : $132$ ; insuffisantes : $68$.\nc) $\\dfrac{8}{68} = \\dfrac{2}{17} \\approx 0{,}12$ : environ $12$ % seulement.\n⭐ Un panneau reçoit le plus d'énergie quand il fait face au soleil de midi : en France, c'est plein sud.",
          schema: ecranSeulement(
            arbre([
              { label: "Sud", proba: "0,4", enfants: [{ label: "A → 0,36", proba: "0,9" }, { label: "non A", proba: "0,1" }] },
              { label: "Est-ouest", proba: "0,6", enfants: [{ label: "A → 0,3", proba: "0,5" }, { label: "non A", proba: "0,5" }] },
            ]),
          ),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
        {
          titre: "Le frelon asiatique",
          enonce:
            "Le frelon asiatique chasse les abeilles devant leurs ruches. Dans un rucher (modèle), $30$ % des ruches sont attaquées ($F$) pendant l'été. Une ruche attaquée passe l'hiver ($S$) avec la probabilité $0{,}5$ ; une ruche épargnée avec la probabilité $0{,}9$.\na) Construire l'arbre et calculer $P(S)$.\nb) Compléter un tableau croisé pour $200$ ruches.\nc) Parmi les ruches mortes, quelle part avait été attaquée ?",
          correction:
            "a) $F$ puis $S$ : $0{,}3 \\times 0{,}5 = 0{,}15$. $\\overline{F}$ puis $S$ : $0{,}7 \\times 0{,}9 = 0{,}63$.\n$P(S) = 0{,}15 + 0{,}63 = 0{,}78$.\nb) Attaquées : $60$ ruches, $30$ survivent et $30$ meurent. Épargnées : $140$, dont $126$ survivent et $14$ meurent. Mortes : $44$.\nc) $\\dfrac{30}{44} = \\dfrac{15}{22} \\approx 0{,}68$ : plus de deux ruches mortes sur trois avaient été attaquées.\n⭐ Les ruches attaquées ne sont que $30$ %, mais elles font la majorité des pertes : c'est là que l'apiculteur doit protéger en priorité.",
          schema: ecranSeulement(tableauProba(["Sur 200", "Survit", "Meurt", "Total"], [["Attaquée", "30", "30", "60"], ["Épargnée", "126", "14", "140"], ["Total", "156", "44", "200"]], [[0, 2], [2, 2]])),
          micros: ["alea_arbre_chemin", "alea_arbre_somme_chemins", "alea_arbre_vers_tableau"],
        },
      ],
    },
  ],
};
