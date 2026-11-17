// ─── Fiche d'exercices : programmes et déplacements codés (CE2) — 20 exercices ─
//
// 17/11/2026 : la feuille interactive de la notion `algorithmique` du coach
// CE2 (5 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/algorithmique.bank.ts` : lire un
// programme d'instructions, coder un déplacement sur quadrillage, utiliser une
// répétition (« répéter 4 fois »), CORRIGER une instruction fausse.
// ⚠️ HORS ATTENDUS DE FIN DE CE2 (note de la banque, BO n° 41 du 31/10/2024) :
// le codage de déplacements vit dans le repérage du CP et du CE1. Au CE2,
// c'est de la consolidation, gardée avec le feu vert de Frédéric. Ne pas
// annoncer « l'algorithmique au programme du CE2 ».
// ⛔ LIMITES : ni variable, ni « si… alors », ni compteur, ni boucle dans une
// boucle. On avance, on tourne d'un quart de tour, on répète.
// ⛔ Aucune question à rédiger : la case d'arrivée (« C2 »), un nombre, un mot
// (« haut », « carré »), le numéro d'une instruction (nombre seul), ou le QCM
// du bon code. Phrases de 18 mots au plus.
//
// LE QUADRILLAGE : colonnes en lettres (A, B, C… de gauche à droite), lignes en
// nombres (1 en bas). → fait passer à la lettre suivante, ↑ au nombre suivant.
// Le robot part du rond vert « R » ; sa pointe rouge montre où il regarde.
//
// LE PIÈGE DE LA NOTION (celui de la banque) : L'ORDRE. « Avancer puis
// tourner » et « tourner puis avancer » n'arrivent pas au même endroit (15).
// Le second : la répétition MULTIPLIE. « Répéter 5 fois : avancer de 3 » fait
// 15 cases, ni 8, ni 3 (16).
//
// Les pièges nommés : lire les flèches dans le désordre (1), prendre ← pour →
// (2), passer sur la cible sans s'y arrêter (3), faire la boucle une seule
// fois (4, 8), inverser lettres et nombres (5), tourner du mauvais côté (6),
// l'instruction qui manque (7), oublier le virage (9), compter les flèches
// au lieu des répétitions (10), le rocher (11), refaire l'aller au lieu de le
// retourner (12), oublier la dernière marche (13), compter les virages comme
// des pas (14), l'ordre (15), additionner 5 + 3 (16), oublier le premier
// trajet (17), oublier la case de départ (18), changer la mauvaise
// instruction (19), changer le nombre de répétitions (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1 à 8), robot de classe (9 à 16),
// livraison (17), jardin (18), entrepôt (19), dessin et informatique (20).
// Métiers : livreur (17), jardinier (18), magasinière (19), informaticienne
// (20). Aucun contexte réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Robots et tondeuses sont des MODÈLES.
//
// ⭐ LES DESSINS (de `dessins-ce2-lotI.tsx`) : `quadrillage` (cases lettre +
// nombre, rochers gris, objets, regard du robot, trajet du corrigé en
// orange), `bande` (une ligne de cases numérotées), `programme` (les
// instructions en cartes numérotées, la répétition décalée) et `orientation`.
// Les trajets du corrigé sont `ecranSeulement`.
//
// Micro-compétences : ce2_algo_instruction (1, 2, 6, 9, 14, 15),
// ce2_algo_deplacement (3, 5, 12, 17, 18), ce2_algo_repetition (4, 8, 10, 13,
// 16, 20), ce2_algo_corriger (7, 11, 15, 19), ce2_algo_defi (17, 18, 19, 20).
// 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { bande, ecranSeulement, orientation, programme, quadrillage } from "@/lib/fiches-exercices/dessins-ce2-lotI";

const ETOILE = "★";

export const exercicesAlgorithmiqueCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "algorithmique",
  titre: "Programmes et déplacements codés",
  accroche:
    "Vingt exercices, du geste seul au problème. Suivre un code de flèches sur un quadrillage. Lire un programme : avancer, tourner d'un quart de tour, répéter. Trouver et corriger l'instruction qui ne marche pas. Un livreur à vélo, une tondeuse robot, un robot d'entrepôt et un robot qui dessine. Un rappel avant chaque niveau. Cherche d'abord avec ton doigt sur le quadrillage. Puis ouvre la correction : étape par étape, avec le trajet dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je suis les instructions une par une, dans l'ordre, avec mon doigt.",
      rappel: [
        "Une flèche = une case. → à droite, ← à gauche, ↑ en haut, ↓ en bas.",
        "Une case se nomme par sa lettre, puis son nombre : C2.",
        "« Répéter 4 fois » : je fais l'instruction 4 fois de suite.",
      ],
      exercices: [
        {
          enonce: "Le robot R suit ce code : → → → ↑ ↑\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "A1" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", chemin: ["A1", "B1", "C1", "D1", "D2", "D3"] })),
          correction:
            "Je pars de A1 et je suis les flèches dans l'ordre, de gauche à droite.\n→ B1, → C1, → D1 : trois cases à droite.\n↑ D2, ↑ D3 : deux cases vers le haut.\n⛔ Le piège : monter d'abord, parce que les ↑ se voient mieux. L'ordre du code compte.\nRéponse : D3.",
          micros: ["ce2_algo_instruction"],
          reponses: [{ attendu: ["D3", "la case D3"] }],
        },
        {
          enonce: "Le robot R suit ce code : ← ↓ ↓ ←\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "E4" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "E4", chemin: ["E4", "D4", "D3", "D2", "C2"] })),
          correction:
            "Je pars de E4.\n← : une case à gauche, en D4.\n↓ : je descends, en D3. ↓ : encore, en D2.\n← : une case à gauche, en C2.\n⛔ Le piège : aller à droite pour ←. La pointe de la flèche montre où aller.\nRéponse : C2.",
          micros: ["ce2_algo_instruction"],
          reponses: [{ attendu: ["C2", "la case C2"] }],
        },
        {
          enonce: "Quel code mène le robot R jusqu'à l'étoile, et s'y arrête ?\nA) → → ↑ → ↑   B) → → → ↑   C) ↑ → → → →",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "D2", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "D2", t: ETOILE }], chemin: ["A1", "B1", "C1", "D1", "D2"] })),
          correction:
            "J'essaie chaque code avec mon doigt, depuis A1. L'étoile est en D2.\nA) B1, C1, C2, D2, D3. Il passe sur l'étoile, mais finit en D3.\nB) B1, C1, D1, puis D2. Il s'arrête sur l'étoile.\nC) A2, B2, C2, D2, E2. Il passe sur l'étoile, mais finit en E2.\n⛔ Le piège : choisir A ou C, parce qu'ils passent sur l'étoile. Le robot doit S'ARRÊTER dessus.\nRéponse : B.",
          micros: ["ce2_algo_deplacement"],
          reponses: [{ attendu: ["B", "B) → → → ↑"] }],
        },
        {
          enonce: "Le programme du robot R : répéter 4 fois « → ».\nSur quelle case s'arrête-t-il ?",
          figure: quadrillage(5, 3, { depart: "A2" }),
          schema: ecranSeulement(quadrillage(5, 3, { depart: "A2", chemin: ["A2", "B2", "C2", "D2", "E2"] })),
          correction:
            "« Répéter 4 fois → », c'est écrire → → → →.\nDepuis A2 : B2, C2, D2, E2.\n⛔ Le piège : faire → une seule fois, et s'arrêter en B2. Le 4 dit combien de fois.\nRéponse : E2.",
          micros: ["ce2_algo_repetition"],
          reponses: [{ attendu: ["E2", "la case E2"] }],
        },
        {
          enonce: "Je veux aller de R à l'étoile, avec des → et des ↑.\na) Combien de flèches → ?\nb) Combien de flèches ↑ ?",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "E3", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "E3", t: ETOILE }], chemin: ["A1", "B1", "C1", "D1", "E1", "E2", "E3"] })),
          correction:
            "Le robot est en A1, l'étoile en E3.\na) De A à E, je passe par B, C, D, E : 4 colonnes. 4 flèches →.\nb) De 1 à 3, je passe par 2, puis 3 : 2 lignes. 2 flèches ↑.\nUn code possible : → → → → ↑ ↑.\n⛔ Le piège : compter 5 flèches →, en comptant la case A. Je compte les pas, pas les cases.\nRéponse : a) 4 ; b) 2.",
          micros: ["ce2_algo_deplacement"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Le robot regarde vers la droite.\na) Il tourne d'un quart de tour à gauche. Où regarde-t-il ?\nb) Il tourne encore d'un quart de tour à gauche. Où regarde-t-il ?\nÉcris : haut, bas, gauche ou droite.",
          figure: orientation("d"),
          correction:
            "Je tourne sur place, comme le robot, vers ma gauche.\na) Je regarde à droite. Un quart de tour à gauche : je regarde en haut.\nb) Je regarde en haut. Encore un quart de tour à gauche : je regarde à gauche.\n⛔ Le piège : a) répondre « bas ». Tourner à gauche, en regardant à droite, fait lever la tête vers le haut.\nRéponse : a) haut ; b) gauche.",
          micros: ["ce2_algo_instruction"],
          reponses: [
            { question: "a)", attendu: ["haut", "en haut", "vers le haut"] },
            { question: "b)", attendu: ["gauche", "à gauche", "vers la gauche"] },
          ],
        },
        {
          enonce: "Le robot doit aller de A1 à l'étoile. Son code : → ↑ ↑\nIl arrive en B3, à côté. Quelle flèche manque ?\nA) →   B) ↑   C) ←",
          figure: quadrillage(4, 4, { depart: "A1", objets: [{ c: "C3", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(4, 4, { depart: "A1", objets: [{ c: "C3", t: ETOILE }], chemin: ["A1", "B1", "C1", "C2", "C3"] })),
          correction:
            "L'étoile est en C3. Depuis A1 : de A à C, il faut 2 flèches →. De 1 à 3, il faut 2 flèches ↑.\nLe code a 1 seule flèche → : il en manque une.\nLe code juste : → → ↑ ↑.\n⛔ Le piège : ajouter une ↑. Le robot est déjà sur la bonne ligne, la ligne 3 : il lui manque une colonne.\nRéponse : A.",
          micros: ["ce2_algo_corriger"],
          reponses: [{ attendu: ["A", "A) →"] }],
        },
        {
          enonce: "Le robot est sur la case 1.\nSon programme : répéter 4 fois « avancer de 2 cases ».\nSur quelle case s'arrête-t-il ?",
          figure: bande(10, 1),
          correction:
            "Je fais l'instruction 4 fois, en partant de 1.\n1re fois : de 1 à 3. 2e fois : de 3 à 5. 3e fois : de 5 à 7. 4e fois : de 7 à 9.\nJe vérifie : il avance de 2 + 2 + 2 + 2 = 8 cases. 1 + 8 = 9.\n⛔ Le piège : répondre 8, en partant de 0. Le robot part de la case 1.\nRéponse : 9.",
          micros: ["ce2_algo_repetition"],
          reponses: [{ attendu: ["9", "neuf", "la case 9"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je fais chaque instruction dans l'ordre, et je note où est le robot.",
      rappel: [
        "« Avancer » : le robot va tout droit, là où il regarde. « Tourner » : il change de direction, sans bouger.",
        "« Répéter 5 fois : avancer de 3 » : 3 + 3 + 3 + 3 + 3, c'est 5 × 3.",
        "Pour revenir, je fais le chemin à l'envers : les flèches retournées, dans l'ordre inverse.",
      ],
      exercices: [
        {
          enonce: "Le robot R est en A1. Il regarde vers la droite.\nSon programme : avancer de 3 cases, tourner à gauche, avancer de 2 cases.\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "A1", regard: "d" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", regard: "d", chemin: ["A1", "B1", "C1", "D1", "D2", "D3"] })),
          correction:
            "Le robot regarde à droite.\nAvancer de 3 : B1, C1, D1.\nTourner à gauche : en regardant à droite, il se met à regarder en haut. Il reste en D1.\nAvancer de 2 : D2, D3.\n⛔ Le piège : oublier le virage, et continuer à droite jusqu'en E1. Après « tourner », le robot regarde en haut.\nRéponse : D3.",
          micros: ["ce2_algo_instruction"],
          reponses: [{ attendu: ["D3", "la case D3"] }],
        },
        {
          enonce: "Le code → → → → ↑ ↑ peut s'écrire plus court :\n« répéter … fois → », puis « répéter … fois ↑ ».\na) Quel nombre pour → ?\nb) Quel nombre pour ↑ ?",
          figure: programme(["répéter ? fois : →", "répéter ? fois : ↑"]),
          correction:
            "Je compte les flèches de chaque sorte, à la suite.\na) → → → → : 4 flèches →. « Répéter 4 fois → ».\nb) ↑ ↑ : 2 flèches ↑. « Répéter 2 fois ↑ ».\nLe programme fait le même trajet, mais il tient en 2 lignes.\n⛔ Le piège : répondre 6, le nombre de flèches en tout. Chaque sorte de flèche a sa répétition.\nRéponse : a) 4 ; b) 2.",
          micros: ["ce2_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Le robot R suit le programme des cartes.\nIl heurte un rocher gris. À quelle instruction ? Écris son numéro.",
          figure: (
            <div className="flex flex-wrap items-start justify-center gap-3">
              {quadrillage(5, 4, { depart: "A1", rochers: ["C2"] })}
              {programme(["→", "→", "↑", "↑", "→"])}
            </div>
          ),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", rochers: ["C2"], chemin: ["A1", "B1", "C1", "C2"] })),
          correction:
            "Je suis les cartes une par une, depuis A1.\nCarte 1, → : B1. Carte 2, → : C1.\nCarte 3, ↑ : je monte en C2. C2 est un rocher gris !\nLe robot heurte le rocher à l'instruction 3.\n⛔ Le piège : chercher le rocher sur le dessin, sans suivre le code. Il faut savoir à quel moment le robot y arrive.\nRéponse : 3.",
          micros: ["ce2_algo_corriger"],
          reponses: [{ attendu: ["3", "trois", "l'instruction 3"] }],
        },
        {
          enonce: "Le robot est allé de A1 en C3 avec le code → → ↑ ↑.\nQuel code le ramène en A1 ?\nA) → → ↑ ↑   B) ↓ ↓ ← ←   C) ↑ ↑ ← ←",
          figure: quadrillage(4, 4, { depart: "C3", objets: [{ c: "A1", t: "?" }] }),
          schema: ecranSeulement(quadrillage(4, 4, { depart: "C3", chemin: ["C3", "C2", "C1", "B1", "A1"] })),
          correction:
            "Pour revenir, je retourne chaque flèche, et je les prends dans l'ordre inverse.\nLe dernier pas était ↑ : je fais d'abord ↓. Puis ↓ encore.\nEnsuite, les → deviennent ← : ← ←.\nLe code du retour : ↓ ↓ ← ←. Depuis C3 : C2, C1, B1, A1.\n⛔ Le piège : choisir A, le même code. Il éloignerait encore le robot, vers la droite et vers le haut.\nRéponse : B.",
          micros: ["ce2_algo_deplacement"],
          reponses: [{ attendu: ["B", "B) ↓ ↓ ← ←"] }],
        },
        {
          enonce: "Le robot R est en A1. Il regarde vers la droite.\nSon programme : répéter 3 fois « avancer de 1, tourner à gauche, avancer de 1, tourner à droite ».\na) Sur quelle case arrive-t-il ?\nb) Quelle forme a son chemin ? A) un escalier   B) un carré   C) une ligne droite",
          figure: quadrillage(5, 5, { depart: "A1", regard: "d" }),
          schema: ecranSeulement(quadrillage(5, 5, { depart: "A1", regard: "d", chemin: ["A1", "B1", "B2", "C2", "C3", "D3", "D4"] })),
          correction:
            "Je fais le bloc une fois. Avancer de 1 : B1. Tourner à gauche : il regarde en haut.\nAvancer de 1 : B2. Tourner à droite : il regarde à droite.\nAprès le 1er bloc : B2, et il regarde à droite, comme au départ.\n2e bloc : C2, puis C3. 3e bloc : D3, puis D4.\na) Il arrive en D4.\nb) Une case à droite, une case en haut, trois fois : c'est un escalier. Réponse A.\n⛔ Le piège : faire le bloc deux fois seulement, et s'arrêter en C3. Il faut 3 marches.\nRéponse : a) D4 ; b) A.",
          micros: ["ce2_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["D4", "la case D4"] },
            { question: "b)", attendu: ["A", "A) un escalier", "escalier", "un escalier"] },
          ],
        },
        {
          enonce: "Lis le programme du robot.\na) De combien de cases avance-t-il en tout ?\nb) Combien d'instructions y a-t-il ?\nc) Combien de fois tourne-t-il ?",
          figure: programme(["avancer de 3 cases", "tourner à droite", "avancer de 2 cases", "tourner à gauche", "avancer de 1 case"]),
          correction:
            "a) Je garde seulement les « avancer » : 3, puis 2, puis 1. 3 + 2 + 1 = 6 cases.\nb) Je compte les cartes : 1, 2, 3, 4, 5. Il y a 5 instructions.\nc) Je compte les « tourner » : à droite, puis à gauche. 2 fois.\n⛔ Le piège du a) : ajouter les virages, comme s'ils faisaient avancer. Tourner change la direction, pas la case.\nRéponse : a) 6 ; b) 5 ; c) 2.",
          micros: ["ce2_algo_instruction"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Le robot R est en A1. Il regarde vers le haut.\nProgramme P : tourner à droite, puis avancer de 2.\nProgramme Q : avancer de 2, puis tourner à droite.\na) Où finit le robot avec P ?\nb) Où finit le robot avec Q ?",
          figure: quadrillage(4, 4, { depart: "A1", regard: "h" }),
          correction:
            "a) P : il tourne d'abord à droite. Il regarde à droite. Puis il avance de 2 : B1, C1. Il finit en C1.\nb) Q : il avance d'abord de 2, vers le haut : A2, A3. Puis il tourne à droite, sur place. Il finit en A3.\nLes deux programmes ont les mêmes instructions, mais pas dans le même ordre : ils n'arrivent pas au même endroit.\n⛔ Le piège : donner la même case pour P et Q. Dans un programme, l'ordre compte.\nRéponse : a) C1 ; b) A3.",
          micros: ["ce2_algo_instruction", "ce2_algo_corriger"],
          reponses: [
            { question: "a)", attendu: ["C1", "la case C1"] },
            { question: "b)", attendu: ["A3", "la case A3"] },
          ],
        },
        {
          enonce: "Voici le programme d'un robot.\na) De combien de cases avance-t-il en tout ?\nb) Combien de lignes sont écrites dans ce programme ?",
          figure: programme(["répéter 5 fois :", "· avancer de 3 cases"]),
          correction:
            "a) Le robot avance de 3 cases, 5 fois de suite : 3 + 3 + 3 + 3 + 3.\n3 + 3 = 6, 6 + 3 = 9, 9 + 3 = 12, 12 + 3 = 15. C'est aussi 5 × 3 = 15 cases.\nb) Je compte les cartes écrites : « répéter 5 fois », et « avancer de 3 cases ». 2 lignes.\n⛔ Le piège du a) : calculer 5 + 3 = 8. La répétition fait faire 5 fois 3 cases : je multiplie.\nRéponse : a) 15 ; b) 2.",
          micros: ["ce2_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je suis le trajet avec mon doigt, et je note chaque case.",
      rappel: [
        "Je pars toujours de la case de départ, et je note la case après chaque instruction.",
        "Une répétition : je fais le bloc entier, autant de fois que le nombre le dit.",
        "Pour corriger un programme, je trouve la PREMIÈRE instruction qui fait sortir du bon chemin.",
      ],
      exercices: [
        {
          titre: "Le livreur à vélo",
          enonce: "Un livreur part de A1. Il livre la maison 1, puis la maison 2.\na) Après le code → → ↑ ↑, sur quelle case est-il ?\nb) Pour aller ensuite à la maison 2, combien de flèches → ?\nc) Et combien de flèches ↑ ?\nd) Combien de flèches y a-t-il dans tout son trajet ?",
          figure: quadrillage(6, 5, {
            depart: "A1",
            objets: [
              { c: "C3", t: "1" },
              { c: "E4", t: "2" },
            ],
          }),
          schema: ecranSeulement(
            quadrillage(6, 5, {
              depart: "A1",
              objets: [
                { c: "C3", t: "1" },
                { c: "E4", t: "2" },
              ],
              chemin: ["A1", "B1", "C1", "C2", "C3", "D3", "E3", "E4"],
            }),
          ),
          correction:
            "a) Depuis A1 : → B1, → C1, ↑ C2, ↑ C3. Il est en C3, sur la maison 1.\nb) De C3 à E4 : de C à E, il passe par D, puis E. 2 flèches →.\nc) De la ligne 3 à la ligne 4 : 1 flèche ↑.\nd) Le premier trajet a 4 flèches, le second 2 + 1 = 3. En tout : 4 + 3 = 7 flèches.\n⛔ Le piège du d) : compter seulement le trajet vers la maison 2. Le livreur est d'abord allé à la maison 1.\nRéponse : a) C3 ; b) 2 ; c) 1 ; d) 7.",
          micros: ["ce2_algo_deplacement", "ce2_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["C3", "la case C3"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["1", "une", "un"] },
            { question: "d)", attendu: ["7", "sept"] },
          ],
        },
        {
          titre: "La tondeuse du jardinier",
          enonce: "Un jardinier programme sa tondeuse robot. Elle part de A1 et suit ce code :\n→ → → ↑ ← ← ← ↑ → → →\na) Sur quelle case finit-elle ?\nb) Combien de cases a-t-elle tondues, en comptant la case de départ ?\nc) Combien de flèches y a-t-il dans le code ?",
          figure: quadrillage(4, 3, { depart: "A1" }),
          schema: ecranSeulement(quadrillage(4, 3, { depart: "A1", chemin: ["A1", "B1", "C1", "D1", "D2", "C2", "B2", "A2", "A3", "B3", "C3", "D3"] })),
          correction:
            "a) Ligne 1 : B1, C1, D1. ↑ : D2. Ligne 2 vers la gauche : C2, B2, A2. ↑ : A3. Ligne 3 : B3, C3, D3. Elle finit en D3.\nb) Elle passe par toutes les cases de la pelouse, une seule fois. 4 colonnes et 3 lignes : 4 × 3 = 12 cases.\nc) Je compte les flèches : 3 + 1 + 3 + 1 + 3 = 11 flèches.\n⛔ Le piège du b) : répondre 11, comme les flèches. La case de départ A1 est tondue aussi : 11 + 1 = 12.\nRéponse : a) D3 ; b) 12 ; c) 11.",
          micros: ["ce2_algo_deplacement", "ce2_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["D3", "la case D3"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: ["11", "onze"] },
          ],
        },
        {
          titre: "Le robot de l'entrepôt",
          enonce: "Une magasinière programme un robot. Il doit prendre la caisse en D4. Il part de A1.\na) Sur quelle case arrive-t-il avec ce programme ?\nb) Quelle instruction faut-il changer ? Écris son numéro.\nc) Quelle flèche faut-il mettre ? A) ←   B) ↑   C) ↓",
          figure: (
            <div className="flex flex-wrap items-start justify-center gap-3">
              {quadrillage(5, 5, { depart: "A1", objets: [{ c: "D4", t: "■", fond: "#fdba74" }] })}
              {programme(["→ → →", "↑ ↑", "→"])}
            </div>
          ),
          schema: ecranSeulement(quadrillage(5, 5, { depart: "A1", objets: [{ c: "D4", t: "■", fond: "#fdba74" }], chemin: ["A1", "B1", "C1", "D1", "D2", "D3", "D4"] })),
          correction:
            "a) Carte 1 : B1, C1, D1. Carte 2 : D2, D3. Carte 3, → : E3. Il arrive en E3.\nb) Après la carte 2, il est en D3 : la bonne colonne, juste sous la caisse. C'est la carte 3 qui l'écarte.\nc) De D3 à D4, il faut monter d'une case : ↑. Réponse B.\nLe programme juste : → → →, puis ↑ ↑, puis ↑.\n⛔ Le piège : changer la carte 1 ou la carte 2. Elles mènent bien en D3 : seule la carte 3 est fausse.\nRéponse : a) E3 ; b) 3 ; c) B.",
          micros: ["ce2_algo_corriger", "ce2_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["E3", "la case E3"] },
            { question: "b)", attendu: ["3", "trois", "la carte 3"] },
            { question: "c)", attendu: ["B", "B) ↑"] },
          ],
        },
        {
          titre: "Le robot qui dessine",
          enonce: "Une informaticienne programme un robot crayon. Il trace un trait quand il avance.\nSon programme : répéter 4 fois « avancer de 3, tourner à droite ».\na) Quelle figure trace-t-il ?\nb) Combien de cases de trait trace-t-il en tout ?\nc) Elle veut un carré de côté 5. Quel nombre doit remplacer le 3 ?\nd) Combien de cases de trait pour ce grand carré ?",
          figure: programme(["répéter 4 fois :", "· avancer de 3", "· tourner à droite"]),
          correction:
            "a) Il avance de 3 et tourne d'un quart de tour, 4 fois. 4 côtés de 3 cases, 4 angles droits : un carré.\nb) 4 côtés de 3 cases : 3 + 3 + 3 + 3 = 12. C'est 4 × 3 = 12 cases.\nc) Le côté, c'est la longueur de « avancer ». Elle remplace 3 par 5. Le 4 ne change pas : un carré a toujours 4 côtés.\nd) 4 côtés de 5 cases : 4 × 5 = 20 cases.\n⛔ Le piège du c) : changer le 4. Avec « répéter 5 fois », le robot repasserait sur un côté déjà tracé.\nRéponse : a) carré ; b) 12 ; c) 5 ; d) 20.",
          micros: ["ce2_algo_repetition", "ce2_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré", "carre"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: ["5", "cinq"] },
            { question: "d)", attendu: ["20", "vingt"] },
          ],
        },
      ],
    },
  ],
};
