// ─── Fiche d'exercices : suite arithmétique, terme général (1re, sans spé) ────
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts`
// (micros lin_suite_explicite, lin_suite_variation, lin_suite_graphique,
// lin_suite_interpreter). La feuille d'avant, « reconnaître », travaille la
// récurrence ; celle-ci SAUTE au rang voulu : uₙ = u₀ + n × r.
//
// ⭐⭐ LE FIL : UNE FORMULE, UN DESSIN, UNE PHRASE. Le terme général donne le
// nombre ; les points (n ; uₙ), alignés, donnent la pente (la raison) et le
// sens de variation ; la phrase rend le nombre à son contexte, avec l'unité et
// l'année. Seul le SIGNE DE LA RAISON décide du sens de variation.
// Pièges nommés : u₁ comme départ, donc n − 1 pas (3, 12), un premier terme
// négatif n'empêche pas de croître (4), la raison est le coefficient de n (7),
// le terme n'est pas le total gagné (8, 16), les dizaines d'un axe (11), un
// modèle qui devient absurde (10, 18), longueur et allongement (14), en sport
// un temps qui décroît est un progrès (18).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes. Petites lignes de train
// (géographie), hérissons, panneaux solaires, loyer, réservoirs pendant une
// canicule, ressort (physique), papier, car scolaire, zone humide, 400 m, CO₂
// d'une entreprise, flotte électrique. Chiffres = MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-suite-terme-general.mjs`.
//
// Micro-compétences : lin_suite_explicite (1, 2, 3, 6, 7, 9, 10, 11, 12, 14,
// 16, 17, 19, 20), lin_suite_variation (4, 6, 7, 9, 10, 13, 14, 15, 17, 18, 19,
// 20), lin_suite_graphique (5, 6, 9, 11, 13, 14, 15, 17, 19),
// lin_suite_interpreter (8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les points qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const GRIS = "#94a3b8";
const VERT = "#16a34a";

export const exercicesLinSuiteTermeGeneralPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-suite-terme-general",
  titre: "Suite arithmétique : terme général",
  accroche:
    "Vingt exercices pour écrire le terme général d'une suite arithmétique, trouver son sens de variation, dessiner ses termes et interpréter un résultat dans son contexte. Un rappel de cours avant chaque niveau, une correction écrite étape par étape, avec les points alignés dans un repère.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique la formule, on conclut.",
      rappel: [
        "Une suite arithmétique de premier terme $u_0$ et de raison $r$ a pour terme général $u_n = u_0 + n \\times r$.",
        "Si elle commence à $u_1$ : $u_n = u_1 + (n - 1) \\times r$, car de $u_1$ à $u_n$ il y a $n - 1$ pas.",
        "Sens de variation : si $r > 0$, la suite est croissante ; si $r < 0$, décroissante ; si $r = 0$, constante.",
        "Dans un repère, les points $(n ; u_n)$ sont alignés : d'un point au suivant, on avance de $1$ et on monte de $r$.",
      ],
      exercices: [
        {
          enonce: "Une suite arithmétique a pour premier terme $u_0 = 5$ et pour raison $r = 3$. Exprimer $u_n$ en fonction de $n$, puis calculer $u_{20}$.",
          correction:
            "Terme général : $u_n = u_0 + n \\times r$, donc $u_n = 5 + 3n$.\n$u_{20} = 5 + 3 \\times 20 = 65$.\n✔️ Vérification sur un petit rang : $u_1 = 5 + 3 = 8$, c'est bien $u_0 + r$.\n⭐ La formule évite de calculer les $19$ termes d'avant : le tableau saute directement du rang $2$ au rang $20$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "20"], ["u(n)", 5, 8, 11, 65])),
          micros: ["lin_suite_explicite"],
        },
        {
          enonce: "Une suite arithmétique a pour premier terme $u_0 = 40$ et pour raison $r = -2{,}5$. Exprimer $u_n$ en fonction de $n$, puis calculer $u_8$.",
          correction:
            "$u_n = 40 + n \\times (-2{,}5)$, soit $u_n = 40 - 2{,}5n$.\n$u_8 = 40 - 2{,}5 \\times 8 = 40 - 20 = 20$.\n⚠️ Avec une raison négative, le signe moins passe devant $2{,}5n$ : on écrit $40 - 2{,}5n$.\nSur le dessin (en dizaines), la marche orange : $8$ rangs vers la droite, puis une descente de $8 \\times 2{,}5 = 20$, soit deux carreaux.",
          schema: repere([-1, 9, -1, 5], [{ q: [0, -0.25, 4], couleur: GRIS }, { pts: [[0, 4], [8, 4], [8, 2]], couleur: ORANGE }], [
            { x: 0, y: 4, label: "" },
            { x: 8, y: 2, label: "" },
          ]),
          micros: ["lin_suite_explicite"],
        },
        {
          enonce: "Une suite arithmétique vérifie $u_1 = 7$ et a pour raison $4$. Exprimer $u_n$ en fonction de $n$, puis calculer $u_{15}$.",
          correction:
            "La suite commence à $u_1$ : de $u_1$ à $u_n$, il y a $n - 1$ pas.\n$u_n = 7 + (n - 1) \\times 4 = 7 + 4n - 4$, soit $u_n = 4n + 3$.\n✔️ Pour $n = 1$ : $4 \\times 1 + 3 = 7$, c'est bien $u_1$.\n$u_{15} = 4 \\times 15 + 3 = 63$.\n⚠️ Écrire $u_n = 7 + 4n$ donnerait $u_1 = 11$ : un pas de trop. Le tableau commence bien au rang $1$.",
          schema: ecranSeulement(tableau(["n", "1", "2", "3", "15"], ["u(n)", 7, 11, 15, 63])),
          micros: ["lin_suite_explicite"],
        },
        {
          enonce: "Donner le sens de variation de chaque suite arithmétique.\na) $u_0 = 12$ et $r = -3$\nb) $u_0 = -100$ et $r = 2$\nc) $u_n = 7 + 0{,}5n$\nd) $u_n = 4 - n$\ne) $u_0 = 9$ et $r = 0$",
          correction:
            "Seul le SIGNE de la raison compte.\na) $r = -3 < 0$ : décroissante.\nb) $r = 2 > 0$ : croissante, même si elle commence à $-100$.\nc) $r = 0{,}5 > 0$ : croissante.\nd) $u_n = 4 + n \\times (-1)$ : $r = -1 < 0$, décroissante.\ne) $r = 0$ : tous les termes valent $9$, la suite est constante.\n⚠️ Le piège est b) : un premier terme négatif ne rend pas la suite décroissante.\nSur le dessin, les droites qui portent les termes : a) en bleu descend, c) en orange monte, e) en vert reste à plat. Le départ ne décide de rien, seule la pente compte.",
          schema: ecranSeulement(repere([-1, 5, -1, 13], [{ q: [0, -3, 12] }, { q: [0, 0.5, 7], couleur: ORANGE }, { q: [0, 0, 9], couleur: VERT }], [], undefined, true)),
          micros: ["lin_suite_variation"],
        },
        {
          enonce: "Représenter dans un repère les termes $u_0$ à $u_4$ de la suite définie par $u_n = 2n - 1$. Que remarque-t-on ?",
          correction:
            "On calcule les termes : $u_0 = -1$, $u_1 = 1$, $u_2 = 3$, $u_3 = 5$, $u_4 = 7$.\nOn place les points $(0 ; -1)$, $(1 ; 1)$, $(2 ; 3)$, $(3 ; 5)$ et $(4 ; 7)$.\nIls sont alignés, sur la droite d'équation $y = 2x - 1$ : d'un point au suivant, on avance de $1$ et on monte de $2$, la raison.\n⚠️ On place des POINTS, un par rang : entre deux rangs, la suite n'a pas de valeur.",
          schema: repere([-1, 5, -2, 8], [{ q: [0, 2, -1], couleur: GRIS }], [
            { x: 0, y: -1, label: "" },
            { x: 1, y: 1, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 3, y: 5, label: "" },
            { x: 4, y: 7, label: "" },
          ]),
          micros: ["lin_suite_graphique"],
        },
        {
          enonce: "Le repère montre les premiers termes d'une suite arithmétique. Lire $u_0$ et la raison, puis exprimer $u_n$ en fonction de $n$. Quel est son sens de variation ?",
          figure: repere([-1, 6, -1, 7], [], [
            { x: 0, y: 6, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 3, y: 3, label: "" },
            { x: 4, y: 2, label: "" },
            { x: 5, y: 1, label: "" },
          ]),
          correction:
            "$u_0$ est la hauteur du point d'abscisse $0$ : $u_0 = 6$.\nD'un point au suivant, on descend de $1$ : la raison est $r = -1$.\nDonc $u_n = 6 - n$, et la suite est décroissante, puisque $r < 0$.\n✔️ $u_5 = 6 - 5 = 1$ : c'est bien le dernier point dessiné.",
          micros: ["lin_suite_graphique", "lin_suite_explicite", "lin_suite_variation"],
        },
        {
          enonce: "Une suite est définie par $u_n = 12 - 0{,}5n$. Donner $u_0$, la raison et le sens de variation, puis calculer $u_{30}$.",
          correction:
            "$u_0 = 12 - 0{,}5 \\times 0 = 12$.\n$u_n = 12 + n \\times (-0{,}5)$ : c'est une suite arithmétique de raison $-0{,}5$.\n$r < 0$ : la suite est décroissante.\n$u_{30} = 12 - 0{,}5 \\times 30 = 12 - 15 = -3$.\n⚠️ La raison est le nombre qui MULTIPLIE $n$, avec son signe : $-0{,}5$, et non $12$.\nLe tableau, de $10$ en $10$ rangs : la suite perd $5$ à chaque fois, et passe sous zéro.",
          schema: ecranSeulement(tableau(["n", "0", "10", "20", "30"], ["u(n)", 12, 7, 2, -3])),
          micros: ["lin_suite_explicite", "lin_suite_variation"],
        },
        {
          enonce: "Le nombre d'abonnés à la lettre d'information d'un musée, $n$ mois après son lancement, est modélisé par $u_n = 250 + 30n$. Que représentent $250$ et $30$ ? Calculer $u_{12}$ et l'interpréter par une phrase.",
          correction:
            "$250 = u_0$ : le nombre d'abonnés au lancement.\n$30$ est la raison : chaque mois, la lettre gagne $30$ abonnés.\n$u_{12} = 250 + 30 \\times 12 = 610$ : un an après son lancement, la lettre compte $610$ abonnés.\n⚠️ $u_{12}$ n'est pas le nombre d'abonnés GAGNÉS en un an : ceux-là sont $30 \\times 12 = 360$.\nSur le dessin (en centaines), la marche orange monte de $3{,}6$ : ce sont les $360$ abonnés gagnés, et non les $610$.",
          schema: repere([-1, 13, -1, 7], [{ q: [0, 0.3, 2.5], couleur: GRIS }, { pts: [[0, 2.5], [12, 2.5], [12, 6.1]], couleur: ORANGE }], [
            { x: 0, y: 2.5, label: "" },
            { x: 12, y: 6.1, label: "" },
          ], undefined, true),
          micros: ["lin_suite_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Écrire le terme général, puis rendre chaque résultat à son contexte.",
      rappel: [
        "Dans un problème, $u_0$ est la valeur de départ et la raison ce qui s'ajoute à chaque étape. Le terme général $u_n = u_0 + n \\times r$ donne directement la valeur au rang $n$.",
        "On interprète avec l'unité et l'année : « $u_6 = 170$ » devient « en 2031, $170$ km de voies seront rouverts ».",
        "Croissante ou décroissante : on regarde le signe de la raison, puis on le traduit en mots (le stock augmente, la population diminue).",
      ],
      exercices: [
        {
          titre: "Des petites lignes de train rouvertes",
          enonce:
            "Une région rouvre des petites lignes de train : $80$ km de voies sont rouverts en 2025, puis $15$ km de plus chaque année (chiffres d'un modèle). On note $u_n$ la longueur de voies rouvertes, en km, l'année $2025 + n$.\na) Exprimer $u_n$ en fonction de $n$.\nb) Quel est le sens de variation de la suite ? Était-ce prévisible ?\nc) Calculer $u_6$ et interpréter le résultat.\nd) Représenter les termes $u_0$ à $u_4$.",
          correction:
            "a) $u_0 = 80$ et $r = 15$ : $u_n = 80 + 15n$.\nb) $r = 15 > 0$ : la suite est croissante. C'était prévisible : chaque année, on rouvre des voies, on n'en ferme pas.\nc) $u_6 = 80 + 15 \\times 6 = 170$ : en 2031, $170$ km de voies seront rouverts.\nd) Termes : $80$ ; $95$ ; $110$ ; $125$ ; $140$. Sur le dessin (en dizaines de km), les points sont alignés et montent d'un carreau et demi par an.\n⚠️ 2031, c'est le rang $6$ : ni $7$, ni $2031$.",
          schema: repere([-1, 5, -1, 15], [], [
            { x: 0, y: 8, label: "" },
            { x: 1, y: 9.5, label: "" },
            { x: 2, y: 11, label: "" },
            { x: 3, y: 12.5, label: "" },
            { x: 4, y: 14, label: "" },
          ], undefined, true),
          micros: ["lin_suite_explicite", "lin_suite_variation", "lin_suite_interpreter", "lin_suite_graphique"],
        },
        {
          titre: "Les hérissons d'un parc",
          enonce:
            "Dans un parc, on compte $150$ hérissons en 2024, et ce nombre diminue de $12$ chaque année (chiffres d'un modèle). On note $u_n$ le nombre de hérissons l'année $2024 + n$.\na) Exprimer $u_n$ en fonction de $n$ et donner le sens de variation.\nb) Calculer $u_5$ et $u_{10}$, et les interpréter.\nc) Ce modèle peut-il durer $15$ ans ?",
          correction:
            "a) $u_0 = 150$ et $r = -12$ : $u_n = 150 - 12n$. La raison est négative : la suite est décroissante, la population diminue.\nb) $u_5 = 150 - 12 \\times 5 = 90$ : en 2029, il resterait $90$ hérissons.\n$u_{10} = 150 - 12 \\times 10 = 30$ : en 2034, il n'en resterait que $30$.\nc) $u_{15} = 150 - 12 \\times 15 = -30$ : un nombre négatif d'animaux n'a pas de sens. Le modèle cesse d'être valable avant 2039.\n⭐ Une suite arithmétique décroissante finit toujours par devenir négative : dans la réalité, quelque chose change avant.",
          schema: tableau(["année", "2024", "2029", "2034", "2039"], ["hérissons", 150, 90, 30, -30]),
          micros: ["lin_suite_explicite", "lin_suite_variation", "lin_suite_interpreter"],
        },
        {
          titre: "Des panneaux solaires sur les toits",
          enonce:
            "Le repère montre le nombre de panneaux solaires installés sur les toits d'un village, en dizaines, $n$ années après 2020 (chiffres d'un modèle). On note $u_n$ ce nombre.\na) Lire $u_0$ et la raison. Traduire par une phrase.\nb) Exprimer $u_n$ en fonction de $n$, en dizaines de panneaux.\nc) Combien de panneaux ce modèle prévoit-il en 2030 ?",
          figure: repere([-1, 5, -1, 10], [], [
            { x: 0, y: 2, label: "" },
            { x: 1, y: 3.5, label: "" },
            { x: 2, y: 5, label: "" },
            { x: 3, y: 6.5, label: "" },
            { x: 4, y: 8, label: "" },
          ], undefined, true),
          correction:
            "a) Le premier point est à la hauteur $2$ : $u_0 = 2$, soit $20$ panneaux en 2020. D'un point au suivant, on monte d'un carreau et demi : $r = 1{,}5$, soit $15$ panneaux de plus par an.\nb) $u_n = 2 + 1{,}5n$, en dizaines de panneaux.\nc) 2030, c'est le rang $10$ : $u_{10} = 2 + 1{,}5 \\times 10 = 17$ dizaines, soit $170$ panneaux.\n⚠️ Le graphique compte en DIZAINES : $17$ sur l'axe, ce sont $170$ panneaux.",
          micros: ["lin_suite_graphique", "lin_suite_explicite", "lin_suite_interpreter"],
        },
        {
          titre: "Le loyer d'un local",
          enonce:
            "Un commerçant loue un local. Le loyer mensuel est de $600$ € la première année, puis augmente de $25$ € chaque année (chiffres d'un modèle). On note $u_n$ le loyer mensuel de la $n$-ième année, donc $u_1 = 600$.\na) Exprimer $u_n$ en fonction de $n$.\nb) Calculer $u_{10}$ et interpréter.\nc) Que représente $u_{10} - u_1$ ?",
          correction:
            "a) La suite commence à $u_1$ : $u_n = 600 + (n - 1) \\times 25$, soit $u_n = 575 + 25n$.\n✔️ $575 + 25 \\times 1 = 600$ : on retrouve $u_1$.\nb) $u_{10} = 575 + 25 \\times 10 = 825$ : la dixième année, le loyer est de $825$ € par mois.\nc) $u_{10} - u_1 = 825 - 600 = 225$ : c'est la hausse du loyer mensuel en $9$ ans, soit $9 \\times 25$.\n⚠️ De la première à la dixième année, il y a $9$ hausses, pas $10$.",
          schema: ecranSeulement(tableau(["année n", "1", "2", "3", "10"], ["loyer (€)", 600, 625, 650, 825])),
          micros: ["lin_suite_explicite", "lin_suite_interpreter"],
        },
        {
          titre: "Deux réservoirs pendant une canicule",
          enonce:
            "Pendant une canicule, le réservoir A d'une commune contient $u_n = 900 - 35n$ m³ d'eau au bout de $n$ jours ; le réservoir B, alimenté par une source, contient $v_n = 300 + 25n$ m³ (chiffres d'un modèle). Le dessin montre, en centaines de m³, les droites qui portent les termes des deux suites : A en bleu, B en orange.\na) Donner le sens de variation de chaque suite, puis le traduire par une phrase.\nb) Calculer $u_{10}$ et $v_{10}$. Que remarque-t-on ?\nc) Lire sur le dessin quel réservoir contient le plus d'eau au bout de $12$ jours.",
          figure: repere([-1, 13, -1, 10], [{ q: [0, -0.35, 9] }, { q: [0, 0.25, 3], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) $u$ a pour raison $-35 < 0$ : elle est décroissante, le réservoir A perd $35$ m³ par jour.\n$v$ a pour raison $25 > 0$ : elle est croissante, le réservoir B gagne $25$ m³ par jour.\nb) $u_{10} = 900 - 35 \\times 10 = 550$ et $v_{10} = 300 + 25 \\times 10 = 550$ : au bout de $10$ jours, les deux réservoirs contiennent autant d'eau.\nc) Après le croisement des droites, au rang $10$, la droite orange passe au-dessus de la bleue : au bout de $12$ jours, c'est B qui contient le plus d'eau.\n✔️ $u_{12} = 900 - 35 \\times 12 = 480$ et $v_{12} = 300 + 25 \\times 12 = 600$.",
          micros: ["lin_suite_variation", "lin_suite_interpreter", "lin_suite_graphique"],
        },
        {
          titre: "Un ressort",
          enonce:
            "En physique, on accroche des masses de $100$ g à un ressort. Sans masse, il mesure $4{,}5$ cm ; chaque masse l'allonge de $0{,}8$ cm (modèle valable tant qu'on n'abîme pas le ressort). On note $u_n$ sa longueur, en cm, avec $n$ masses accrochées.\na) Exprimer $u_n$ en fonction de $n$. Quel est le sens de variation ?\nb) Quelle est la longueur avec $10$ masses, c'est-à-dire $1$ kg ?\nc) Représenter les termes $u_0$ à $u_5$.",
          correction:
            "a) $u_0 = 4{,}5$ et $r = 0{,}8$ : $u_n = 4{,}5 + 0{,}8n$. La raison est positive : la suite est croissante, le ressort s'allonge.\nb) $u_{10} = 4{,}5 + 0{,}8 \\times 10 = 12{,}5$ : avec $1$ kg, le ressort mesure $12{,}5$ cm.\nc) Termes : $4{,}5$ ; $5{,}3$ ; $6{,}1$ ; $6{,}9$ ; $7{,}7$ ; $8{,}5$. Les points sont alignés.\n⭐ C'est la loi des ressorts : l'allongement est proportionnel à la masse accrochée. Ici, $0{,}8 \\times 10 = 8$ cm d'allongement pour $1$ kg.\n⚠️ $12{,}5$ cm est la LONGUEUR du ressort ; son ALLONGEMENT n'est que de $8$ cm.",
          schema: ecranSeulement(repere([-1, 6, -1, 10], [{ q: [0, 0.8, 4.5], couleur: GRIS }], [
            { x: 0, y: 4.5, label: "" },
            { x: 1, y: 5.3, label: "" },
            { x: 2, y: 6.1, label: "" },
            { x: 3, y: 6.9, label: "" },
            { x: 4, y: 7.7, label: "" },
            { x: 5, y: 8.5, label: "" },
          ], undefined, true)),
          micros: ["lin_suite_explicite", "lin_suite_variation", "lin_suite_graphique"],
        },
        {
          titre: "Moins de papier au bureau",
          enonce:
            "Une entreprise réduit sa consommation de papier. Le nombre de ramettes utilisées le mois $n$ est modélisé par $u_n = 60 - 4n$.\na) Donner le sens de variation de la suite, puis le traduire.\nb) Représenter les termes $u_0$ à $u_5$.\nc) Calculer $u_{12}$ et l'interpréter.",
          correction:
            "a) $u_n = 60 + n \\times (-4)$ : raison $-4 < 0$, la suite est décroissante. Chaque mois, on utilise $4$ ramettes de moins que le mois d'avant.\nb) Termes : $60$ ; $56$ ; $52$ ; $48$ ; $44$ ; $40$. Sur le dessin (en dizaines de ramettes), les points descendent régulièrement.\nc) $u_{12} = 60 - 4 \\times 12 = 12$ : un an plus tard, l'entreprise n'utiliserait plus que $12$ ramettes par mois.",
          schema: repere([-1, 6, -1, 7], [], [
            { x: 0, y: 6, label: "" },
            { x: 1, y: 5.6, label: "" },
            { x: 2, y: 5.2, label: "" },
            { x: 3, y: 4.8, label: "" },
            { x: 4, y: 4.4, label: "" },
            { x: 5, y: 4, label: "" },
          ]),
          micros: ["lin_suite_variation", "lin_suite_graphique", "lin_suite_interpreter"],
        },
        {
          titre: "Le compteur d'un car scolaire",
          enonce:
            "Le compteur kilométrique d'un car scolaire affiche $32\\,000$ km à la rentrée. Chaque jour de classe, le car parcourt $180$ km. On note $u_n$ le kilométrage après $n$ jours de classe.\na) Exprimer $u_n$ en fonction de $n$.\nb) Que signifie $u_{n+1} - u_n = 180$ ?\nc) On compte $160$ jours de classe dans l'année (chiffre d'un modèle). Calculer $u_{160}$ et interpréter.",
          correction:
            "a) $u_0 = 32\\,000$ et $r = 180$ : $u_n = 32\\,000 + 180n$.\nb) C'est la raison : chaque jour de classe ajoute $180$ km au compteur.\nc) $u_{160} = 32\\,000 + 180 \\times 160 = 60\\,800$ : à la fin de l'année, le compteur affiche $60\\,800$ km.\n⚠️ Le car n'a pas roulé $60\\,800$ km cette année : il en a roulé $180 \\times 160 = 28\\,800$. Le reste était déjà au compteur.",
          schema: ecranSeulement(tableau(["jours n", "0", "1", "2", "160"], ["compteur (km)", "32 000", "32 180", "32 360", "60 800"])),
          micros: ["lin_suite_explicite", "lin_suite_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent.",
      rappel: [
        "Terme général, sens de variation, dessin : trois façons de dire la même suite.",
        "Entre deux rangs, l'écart vaut (nombre de pas) fois (raison) : $u_{10} - u_5 = 5 \\times r$.",
        "Un modèle a une durée de validité : un nombre négatif d'animaux ou un temps nul signalent qu'il faut s'arrêter.",
      ],
      exercices: [
        {
          titre: "Une zone humide restaurée",
          enonce:
            "Une zone humide, refuge pour les oiseaux migrateurs, couvre $12$ hectares en 2020. Grâce à des travaux, elle gagne $3$ hectares par an (chiffres d'un modèle). On note $u_n$ sa surface, en hectares, l'année $2020 + n$.\na) Donner $u_0$ et la raison, puis exprimer $u_n$ en fonction de $n$.\nb) Quel est le sens de variation de $u$ ?\nc) Représenter les termes $u_0$ à $u_4$ dans un repère.\nd) Calculer $u_{10}$ et interpréter.\ne) Que représente $u_{10} - u_5$ ?",
          correction:
            "a) $u_0 = 12$ et $r = 3$ : $u_n = 12 + 3n$.\nb) $r = 3 > 0$ : la suite est croissante, la zone humide s'agrandit.\nc) Termes : $12$ ; $15$ ; $18$ ; $21$ ; $24$. Sur le dessin (un carreau pour $3$ ha), les points montent d'un carreau par an, alignés.\nd) $u_{10} = 12 + 3 \\times 10 = 42$ : en 2030, la zone humide couvrirait $42$ hectares.\ne) $u_5 = 12 + 3 \\times 5 = 27$, et $u_{10} - u_5 = 42 - 27 = 15$ : c'est la surface gagnée entre 2025 et 2030, soit $5$ fois $3$ ha.",
          schema: repere([-1, 5, -1, 9], [{ q: [0, 1, 4], couleur: GRIS }], [
            { x: 0, y: 4, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 6, label: "" },
            { x: 3, y: 7, label: "" },
            { x: 4, y: 8, label: "" },
          ]),
          micros: ["lin_suite_explicite", "lin_suite_variation", "lin_suite_graphique", "lin_suite_interpreter"],
        },
        {
          titre: "Le 400 m",
          enonce:
            "Une athlète court le $400$ m. Son entraîneur modélise son temps, en secondes, après $n$ semaines d'entraînement par $u_n = 75 - 0{,}5n$, pour un programme de $12$ semaines.\na) Quel est le sens de variation de $u$ ? Est-ce une bonne nouvelle pour l'athlète ?\nb) Calculer son temps après $4$, $8$ et $12$ semaines.\nc) Que donnerait le modèle pour $n = 150$ ? Conclure.",
          correction:
            "a) Raison $-0{,}5 < 0$ : la suite est décroissante. Son temps baisse d'une demi-seconde par semaine : c'est un PROGRÈS.\nb) $u_4 = 75 - 0{,}5 \\times 4 = 73$ ; $u_8 = 75 - 0{,}5 \\times 8 = 71$ ; $u_{12} = 75 - 0{,}5 \\times 12 = 69$. Après $12$ semaines, elle court le $400$ m en $69$ secondes.\nc) $u_{150} = 75 - 0{,}5 \\times 150 = 0$ : un $400$ m en $0$ seconde, c'est impossible.\nLe modèle ne vaut que pour la durée du programme : les progrès finissent toujours par ralentir.\n⚠️ En sport, un temps qui DÉCROÎT est une amélioration : décroissante ne veut pas dire « moins bien ».",
          schema: tableau(["semaines n", "0", "4", "8", "12"], ["temps (s)", 75, 73, 71, 69]),
          micros: ["lin_suite_variation", "lin_suite_interpreter"],
        },
        {
          titre: "Réduire les émissions de CO₂",
          enonce:
            "Une entreprise émet $480$ tonnes de CO₂ en 2024 et s'engage à réduire ses émissions de $40$ tonnes chaque année (chiffres d'un modèle). On note $u_n$ les émissions, en tonnes, l'année $2024 + n$.\na) Exprimer $u_n$ en fonction de $n$ et donner le sens de variation.\nb) Calculer $u_6$. Que remarque-t-on ?\nc) En quelle année les émissions seraient-elles nulles ? Vérifier avec la formule.",
          correction:
            "a) $u_0 = 480$ et $r = -40$ : $u_n = 480 - 40n$. La raison est négative : la suite est décroissante, les émissions baissent.\nb) $u_6 = 480 - 40 \\times 6 = 240$ : en 2030, les émissions auraient été divisées par deux.\nc) Il faut retirer $480$ tonnes par paquets de $40$ : $\\dfrac{480}{40} = 12$ ans, soit en 2036. Vérification : $u_{12} = 480 - 40 \\times 12 = 0$.\nSur le dessin (en centaines de tonnes, un point tous les deux ans), les points descendent régulièrement jusqu'à l'axe horizontal.\n⭐ Divisées par deux en $6$ ans, annulées en $6$ ans de plus : dans une baisse linéaire, chaque année retire la même quantité.",
          schema: repere([-1, 13, -1, 6], [], [
            { x: 0, y: 4.8, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 4, y: 3.2, label: "" },
            { x: 6, y: 2.4, label: "" },
            { x: 8, y: 1.6, label: "" },
            { x: 10, y: 0.8, label: "" },
            { x: 12, y: 0, label: "" },
          ], undefined, true),
          micros: ["lin_suite_explicite", "lin_suite_variation", "lin_suite_interpreter", "lin_suite_graphique"],
        },
        {
          titre: "Une flotte qui passe à l'électrique",
          enonce:
            "Une entreprise de livraison possède $1\\,400$ véhicules. En 2025, $400$ sont électriques ; chaque année, elle remplace $30$ véhicules thermiques par des électriques (chiffres d'un modèle). On note $e_n$ et $t_n$ les nombres de véhicules électriques et thermiques l'année $2025 + n$.\na) Exprimer $e_n$ et $t_n$ en fonction de $n$. Donner le sens de variation de chaque suite.\nb) Que vaut $e_n + t_n$ ? Pourquoi ?\nc) En quelle année y aura-t-il autant de véhicules électriques que thermiques ?",
          correction:
            "a) $e_n = 400 + 30n$ : raison $30 > 0$, suite croissante.\n$t_0 = 1\\,400 - 400 = 1\\,000$ et $t_n = 1\\,000 - 30n$ : raison $-30 < 0$, suite décroissante.\nb) $e_n + t_n = 400 + 30n + 1\\,000 - 30n = 1\\,400$ : le total ne change pas, chaque véhicule électrique en remplace un thermique.\nc) Autant des deux, c'est $700$ chacun, la moitié de $1\\,400$. $e_n = 700$ quand $30n = 300$, soit $n = 10$ : en 2035.\n✔️ $e_{10} = 400 + 30 \\times 10 = 700$ et $t_{10} = 1\\,000 - 30 \\times 10 = 700$.\nSur le dessin (en centaines), les droites qui portent les termes se croisent au rang $10$, à la hauteur $7$.\n⭐ Deux raisons opposées, $30$ et $-30$ : l'écart entre les deux suites diminue de $60$ chaque année.",
          schema: repere([-1, 13, -1, 11], [{ q: [0, 0.3, 4] }, { q: [0, -0.3, 10], couleur: ORANGE }], [{ x: 10, y: 7, label: "" }], undefined, true),
          micros: ["lin_suite_explicite", "lin_suite_variation"],
        },
      ],
    },
  ],
};
