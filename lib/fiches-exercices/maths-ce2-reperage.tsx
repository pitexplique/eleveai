// ─── Fiche d'exercices : le repérage sur quadrillage (CE2) — 20 exercices ─────
//
// 17/11/2026 : la feuille interactive de la notion `reperage` du coach CE2
// (« Repérage sur quadrillage », 4 micros). Sur la forme de
// `maths-cm1-masse.tsx` et de `maths-ce1-reperage.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/reperage.bank.ts`) : lire et placer
// sur un quadrillage, décrire un déplacement, lire un plan simple.
// ⛔ LIMITES DU CE2 : la banque le dit, c'est une RÉVISION du CE1 (la colonne
// CE2 du BO n° 41 est vide pour le repérage). Pas de repère, ni abscisse ni
// ordonnée : « la colonne, puis la ligne ». Des cases repérées par une lettre
// (colonne, en bas) et un nombre (ligne, à gauche, 1 en bas), « C2 ». Des
// déplacements en cases, codés par des flèches, sans diagonale.
// ⛔ Aucune question à rédiger, ni « place » ou « trace » : une case, un mot,
// un nombre, une lettre de QCM.
// ⛔ 8 ans : phrases de 18 mots au plus, une idée par phrase.
//
// ⛔ UNE CASE SE TAPE LETTRE PUIS NOMBRE, « C2 » ou « c2 » : `exact` refuse
// « 2C » (sans lui, le vérificateur calcule 2 × c = c × 2).
//
// Les pièges nommés : le nombre avant la lettre (1, 7, 15), lire la ligne
// d'abord (2), compter la case de départ (3, 6), monter au lieu d'aller à
// droite (4), lire le plan à l'envers (5, 8), inverser les deux nombres d'un
// trajet (9), oublier le dernier pas (10), aller en biais (11, 17), un pas
// oublié dans le code (12), la gauche prise pour la droite (13), « en bas »
// lu sur la ligne (14), répéter un seul pas (16), compter les rangées au lieu
// des pas (18), garder la flèche du départ (19), croire qu'on se croise (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 2, 4, 7, 15), robots (3, 16,
// 19), école (5), animaux (6, 9), zoo (8), ville (11), dessin animé (12),
// pirates (13, 17), supermarché (14), ferme (18), amis (20).
// Les métiers : fermier (18), soigneur de zoo (8).
// Aucun contexte réunionnais sur cette feuille (la notion en a ailleurs).
// Tout est un MODÈLE (aucun fait réel à sourcer sur cette feuille).
//
// ⭐ LES DESSINS : le quadrillage du CM1 (`grille`, lettres et nombres), des
// plans en cases (`plan`). Le dessin ne donne jamais la réponse : l'arrivée
// d'un trajet n'est jamais marquée.
//
// Micro-compétences : ce2_reperage_coordonnees (1, 2, 5, 7, 13, 15),
// ce2_reperage_deplacement (3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20),
// ce2_reperage_plan (5, 8, 11, 14, 18), ce2_reperage_defi (17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, grille } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const GRIS_CLAIR = "#e2e8f0";
const JAUNE_CLAIR = "#fef3c7";

/**
 * Un plan en cases, avec ses lettres et ses nombres : `lignes` du HAUT vers le
 * BAS, chaque case un lieu (texte) ; « allée » ou « rue » en gris, « » vide.
 */
const plan = (lignes: string[][], taille = 70) =>
  grille({
    col: lignes[0].length,
    lig: lignes.length,
    taille,
    lettres: true,
    largeur: "max-w-[22rem] print:max-w-[16rem]",
    cases: lignes.flatMap((l, i) =>
      l.map((t, c) => ({
        c,
        l: lignes.length - 1 - i,
        texte: t === "allée" || t === "rue" ? undefined : t || undefined,
        couleur: t === "allée" || t === "rue" ? GRIS_CLAIR : t ? JAUNE_CLAIR : "white",
      })),
    ),
  });

export const exercicesReperageCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "reperage",
  titre: "Le repérage sur quadrillage",
  accroche:
    "Vingt exercices, du plus simple au problème. Trouver une case avec sa lettre et son nombre : C2. Suivre un chemin codé par des flèches. Décrire un trajet. Lire le plan de l'école, d'un zoo, d'un supermarché et d'une ferme. Des robots, des pirates et deux amis qui se retrouvent. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris une case, un mot ou un nombre.",
      rappel: [
        "Une case se lit lettre puis nombre : C2. La lettre est en bas, le nombre à gauche.",
        "→ veut dire une case à droite, ← à gauche, ↑ en haut, ↓ en bas.",
        "Pour un trajet, je ne compte pas la case de départ.",
      ],
      exercices: [
        {
          enonce: "Sur ce plateau de jeu, chaque case a une lettre et un nombre.\na) Dans quelle case est l'étoile ★ ?\nb) Dans quelle case est le rond ● ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 3, l: 2, texte: "★", couleurTexte: ORANGE },
              { c: 1, l: 0, texte: "●", couleurTexte: BLEU },
            ],
          }),
          correction:
            "a) Je descends de l'étoile jusqu'en bas : lettre D. Je vais à gauche : nombre 3. L'étoile est en D3.\nb) Je descends du rond : lettre B. Je vais à gauche : nombre 1. Le rond est en B1.\n⛔ Le piège : écrire 3D. La lettre de la colonne vient d'abord, puis le nombre.\nRéponse : a) D3 ; b) B1.",
          micros: ["ce2_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "D3", exact: true },
            { question: "b)", attendu: "B1", exact: true },
          ],
        },
        {
          enonce: "Regarde le plateau.\na) Qu'y a-t-il dans la case C4 : le triangle, le carré ou le cœur ?\nb) Qu'y a-t-il dans la case E2 ?",
          figure: grille({
            col: 5,
            lig: 5,
            lettres: true,
            cases: [
              { c: 2, l: 3, texte: "▲", couleurTexte: VERT },
              { c: 4, l: 1, texte: "■", couleurTexte: BLEU },
              { c: 3, l: 2, texte: "♥", couleurTexte: ROUGE },
            ],
          }),
          correction:
            "a) C4 : je trouve la colonne C en bas, puis je monte jusqu'à la ligne 4. Il y a le triangle.\nb) E2 : la colonne E, tout à droite, puis la ligne 2. Il y a le carré.\n⛔ Le piège du a) : lire la ligne d'abord. Je tomberais sur le cœur, en D3.\nRéponse : a) le triangle ; b) le carré.",
          micros: ["ce2_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: ["triangle", "le triangle", "▲"] },
            { question: "b)", attendu: ["carré", "le carré", "■"] },
          ],
        },
        {
          enonce: "Le robot R est en B2.\nIl avance de 3 cases vers la droite.\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 6, lig: 4, lettres: true, cases: [{ c: 1, l: 1, texte: "R", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }] }),
          correction:
            "Je pars de B2. Je ne compte pas la case de départ.\nJ'avance d'une case à la fois : C2, D2, E2.\nTrois cases : le robot arrive en E2.\n⛔ Le piège : compter B2 comme première case, et s'arrêter en D2.\nRéponse : E2.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: "E2", exact: true }],
        },
        {
          enonce: "Le pion est en A1. Il suit ce code : → → ↑ ↑ ↑\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 5, lig: 5, lettres: true, cases: [{ c: 0, l: 0, texte: "●", couleurTexte: ROUGE }] }),
          correction:
            "Je suis les flèches dans l'ordre, une case par flèche.\n→ → : deux cases à droite, B1 puis C1.\n↑ ↑ ↑ : trois cases en haut, C2, C3 puis C4.\nLe pion arrive en C4.\n⛔ Le piège : monter d'abord. Je lis le code de gauche à droite, dans l'ordre.\nRéponse : C4.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: "C4", exact: true }],
        },
        {
          enonce: "Voici le plan de l'école.\na) Dans quelle case est la cantine ?\nb) Qu'y a-t-il dans la case D3 ?",
          figure: plan([
            ["BCD", "classe", "classe", "préau"],
            ["cantine", "cour", "cour", "jardin"],
            ["entrée", "bureau", "cour", "gym"],
          ]),
          correction:
            "a) Je trouve la cantine. Je descends jusqu'en bas : lettre A. Je vais à gauche : nombre 2. La cantine est en A2.\nb) D3 : la colonne D, puis je monte à la ligne 3. Il y a le préau.\n⛔ Le piège : lire le plan de haut en bas pour les nombres. La ligne 1 est en BAS.\nRéponse : a) A2 ; b) le préau.",
          micros: ["ce2_reperage_plan", "ce2_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "A2", exact: true },
            { question: "b)", attendu: ["préau", "le préau"] },
          ],
        },
        {
          enonce: "Le chat est en B2. La souris est en B5.\nDe combien de cases le chat doit-il monter pour l'attraper ?",
          figure: grille({
            col: 4,
            lig: 5,
            lettres: true,
            cases: [
              { c: 1, l: 1, texte: "chat", couleur: ORANGE_CLAIR, couleurTexte: ORANGE },
              { c: 1, l: 4, texte: "souris", couleur: BLEU_CLAIR, couleurTexte: BLEU },
            ],
          }),
          correction:
            "Les deux sont dans la même colonne B. Je compte seulement les lignes.\nDe la ligne 2 à la ligne 5 : 3, 4, 5. Trois bonds.\nOu bien : $5 - 2 = 3$ cases.\n⛔ Le piège : compter la case du chat, et dire 4.\nRéponse : 3.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Écris le nom de la case.\na) La colonne E et la ligne 3.\nb) La colonne A et la ligne 4.",
          figure: grille({ col: 5, lig: 4, lettres: true }),
          correction:
            "Le nom d'une case : la lettre de la colonne, puis le nombre de la ligne.\na) Colonne E, ligne 3 : E3.\nb) Colonne A, ligne 4 : A4.\n⛔ Le piège : écrire 3E ou 4A. La lettre vient toujours en premier.\nRéponse : a) E3 ; b) A4.",
          micros: ["ce2_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "E3", exact: true },
            { question: "b)", attendu: "A4", exact: true },
          ],
        },
        {
          enonce: "Le soigneur regarde le plan du zoo. Il est devant les lions.\na) Il va 2 cases à droite. Quel animal trouve-t-il ?\nb) Des lions, il va 2 cases en bas. Quel animal trouve-t-il ?",
          figure: plan([
            ["lions", "zèbres", "girafes", "ours"],
            ["allée", "allée", "allée", "allée"],
            ["manchots", "singes", "tortues", "loups"],
          ]),
          correction:
            "Les lions sont en A3.\na) 2 cases à droite : B3 (les zèbres), puis C3. Ce sont les girafes.\nb) 2 cases en bas : A2 (l'allée), puis A1. Ce sont les manchots.\n⛔ Le piège : compter la case des lions, et s'arrêter aux zèbres.\nRéponse : a) les girafes ; b) les manchots.",
          micros: ["ce2_reperage_plan", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: ["girafes", "les girafes", "girafe", "la girafe"] },
            { question: "b)", attendu: ["manchots", "les manchots", "manchot", "le manchot"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je suis le chemin avec le doigt, une case à la fois.",
      rappel: [
        "Pour aller d'une case à une autre, je compte les colonnes, puis les lignes.",
        "Un code se lit dans l'ordre, flèche par flèche.",
        "On ne va jamais en biais : à droite, à gauche, en haut ou en bas.",
      ],
      exercices: [
        {
          enonce: "Le lapin L veut aller à la carotte C.\nQuel chemin doit-il suivre ? Écris la lettre.\nA) 2 → puis 3 ↑\nB) 3 → puis 3 ↑\nC) 3 → puis 2 ↑",
          figure: grille({
            col: 5,
            lig: 5,
            lettres: true,
            cases: [
              { c: 0, l: 1, texte: "L", couleur: BLEU_CLAIR, couleurTexte: BLEU },
              { c: 3, l: 3, texte: "C", couleur: ORANGE_CLAIR, couleurTexte: ORANGE },
            ],
          }),
          correction:
            "Le lapin est en A2. La carotte est en D4.\nVers la droite, de A à D : B, C, D. Trois cases.\nVers le haut, de 2 à 4 : 3, 4. Deux cases.\nLe chemin : 3 → puis 2 ↑. Réponse C.\n⛔ Le piège : inverser les deux nombres (réponse A). Le lapin arriverait en C5.\nRéponse : C.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: "C" }],
        },
        {
          enonce: "Le pion part de E3. Il suit : ↑ ↑ ← ← ← ↓\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 6, lig: 5, lettres: true, cases: [{ c: 4, l: 2, texte: "●", couleurTexte: ROUGE }] }),
          correction:
            "Je pars de E3 et je suis les flèches dans l'ordre.\n↑ ↑ : E4, puis E5.\n← ← ← : D5, C5, puis B5.\n↓ : B4.\nLe pion arrive en B4.\n⛔ Le piège : oublier la dernière flèche, et s'arrêter en B5.\nRéponse : B4.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: "B4", exact: true }],
        },
        {
          enonce: "Sur le plan du quartier, Nina va de sa maison à la bibliothèque.\nElle marche de case en case, sans aller en biais.\nCombien de cases, au moins, doit-elle traverser ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "maison", couleur: VERT_CLAIR, couleurTexte: VERT },
              { c: 3, l: 2, texte: "biblio", couleur: ORANGE_CLAIR, couleurTexte: ORANGE },
            ],
          }),
          correction:
            "La maison est en A1. La bibliothèque est en D3.\nVers la droite, de A à D : 3 cases.\nVers le haut, de 1 à 3 : 2 cases.\n$3 + 2 = 5$ cases au moins.\n⛔ Le piège : compter en biais, en diagonale. C'est interdit sur le quadrillage.\nRéponse : 5.",
          micros: ["ce2_reperage_plan", "ce2_reperage_deplacement"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Le héros du dessin animé suit le chemin orange, depuis A1.\na) Dans quelle case arrive-t-il ?\nb) Quel est le code de ce chemin ? A) → → ↑ → B) → → ↑ ↑ → C) → ↑ ↑ →",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [{ c: 0, l: 0, texte: "★", couleurTexte: BLEU }],
            chemins: [{ pts: [[0.5, 0.5], [2.5, 0.5], [2.5, 2.5], [3.5, 2.5]] }],
          }),
          correction:
            "Je suis le chemin orange avec le doigt.\nIl va 2 cases à droite : B1, C1. Code : → →.\nPuis 2 cases en haut : C2, C3. Code : ↑ ↑.\nPuis 1 case à droite : D3. Code : →.\na) Il arrive en D3.\nb) Le code complet : → → ↑ ↑ →. Réponse B.\n⛔ Le piège du b) : oublier une flèche. Il faut une flèche par case.\nRéponse : a) D3 ; b) B.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "D3", exact: true },
            { question: "b)", attendu: "B" },
          ],
        },
        {
          enonce: "Sur la carte des pirates, le coffre est en E4.\na) Le perroquet est 2 cases à gauche du coffre. Dans quelle case est-il ?\nb) Le bateau est 3 cases sous le perroquet. Dans quelle case est-il ?",
          figure: grille({ col: 6, lig: 5, lettres: true, cases: [{ c: 4, l: 3, texte: "coffre", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }] }),
          correction:
            "a) Je pars du coffre, en E4. Je vais à gauche : D4, puis C4.\nLe perroquet est en C4.\nb) Je pars du perroquet, en C4. Je descends : C3, C2, puis C1.\nLe bateau est en C1.\n⛔ Le piège du a) : aller à droite, vers F4. À gauche, les lettres reculent : E, D, C.\nRéponse : a) C4 ; b) C1.",
          micros: ["ce2_reperage_coordonnees", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "C4", exact: true },
            { question: "b)", attendu: "C1", exact: true },
          ],
        },
        {
          enonce: "Voici le plan du supermarché. Nina part des fruits.\na) Elle va : 3 → puis 2 ↓. Dans quelle case arrive-t-elle ?\nb) Quel rayon y a-t-il dans cette case ?",
          figure: plan([
            ["fruits", "légumes", "fromage", "poisson"],
            ["allée", "allée", "allée", "allée"],
            ["caisse", "lait", "jus", "pain"],
          ]),
          correction:
            "Les fruits sont en A3.\na) 3 → : B3, C3, D3. Puis 2 ↓ : D2, puis D1.\nNina arrive en D1.\nb) Dans la case D1, il y a le pain.\n⛔ Le piège : descendre en montant les nombres. En bas, les nombres diminuent : 3, 2, 1.\nRéponse : a) D1 ; b) le pain.",
          micros: ["ce2_reperage_plan", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "D1", exact: true },
            { question: "b)", attendu: ["pain", "le pain"] },
          ],
        },
        {
          enonce: "Léo a écrit la ligne avant la colonne. Écris les bonnes cases.\na) Léo a écrit « 3B ».\nb) Léo a écrit « 5D ».",
          correction:
            "Le bon ordre : la lettre de la colonne, puis le nombre de la ligne.\na) « 3B » : la colonne B, la ligne 3. J'écris B3.\nb) « 5D » : la colonne D, la ligne 5. J'écris D5.\n⛔ Le piège : changer aussi la lettre ou le nombre. Je les remets seulement dans l'ordre.\nRéponse : a) B3 ; b) D5.",
          micros: ["ce2_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "B3", exact: true },
            { question: "b)", attendu: "D5", exact: true },
          ],
        },
        {
          enonce: "Le robot part de A1. Il répète 3 fois ce code : → ↑\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 5, lig: 5, lettres: true, cases: [{ c: 0, l: 0, texte: "R", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }] }),
          correction:
            "J'écris tout le code : → ↑ → ↑ → ↑.\n1re fois : B1, puis B2.\n2e fois : C2, puis C3.\n3e fois : D3, puis D4.\nLe robot arrive en D4.\n⛔ Le piège : faire le code une seule fois, et s'arrêter en B2.\nRéponse : D4.",
          micros: ["ce2_reperage_deplacement"],
          reponses: [{ attendu: "D4", exact: true }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je suis chaque trajet pas à pas, avec le doigt.",
      rappel: [
        "Le plus court chemin : les cases sur le côté, plus les cases en haut ou en bas.",
        "Pour revenir, je fais le chemin à l'envers : → devient ←, ↑ devient ↓.",
        "Je vérifie toujours ma case d'arrivée sur le dessin.",
      ],
      exercices: [
        {
          titre: "Le trésor des pirates",
          enonce: "Le pirate P part de A1. Le trésor est en F5.\na) Combien de cases, au moins, doit-il parcourir ?\nb) Le perroquet est juste au-dessus du trésor. Dans quelle case est-il ?",
          figure: grille({
            col: 6,
            lig: 6,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "P", couleur: BLEU_CLAIR, couleurTexte: BLEU },
              { c: 5, l: 4, texte: "★", couleurTexte: ORANGE },
            ],
          }),
          correction:
            "a) De A à F, vers la droite : B, C, D, E, F. Cinq cases.\nDe 1 à 5, vers le haut : 2, 3, 4, 5. Quatre cases.\n$5 + 4 = 9$ cases au moins.\nb) Juste au-dessus de F5 : même colonne, une ligne plus haut. C'est F6.\n⛔ Le piège du a) : aller en biais. Sur le quadrillage, on ne va jamais en diagonale.\nRéponse : a) 9 ; b) F6.",
          micros: ["ce2_reperage_defi", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: "F6", exact: true },
          ],
        },
        {
          titre: "Le plan de la ferme",
          enonce: "Le fermier part de la mare.\na) Il va : 2 → puis 3 ↓. Il trouve le tracteur. Dans quelle case est le tracteur ?\nb) De la mare aux poules, combien de cases au moins ?",
          figure: plan(
            [
              ["mare", "", "", ""],
              ["", "vaches", "", ""],
              ["", "", "", "poules"],
              ["", "", "", ""],
            ],
            58,
          ),
          correction:
            "La mare est en A4. Les poules sont en D2.\na) 2 → : B4, C4. Puis 3 ↓ : C3, C2, C1.\nLe tracteur est en C1.\nb) De A4 à D2 : vers la droite, de A à D, 3 cases.\nVers le bas, de 4 à 2, 2 cases.\n$3 + 2 = 5$ cases au moins.\n⛔ Le piège du b) : compter les lignes de 1 à 4. Je compte seulement les pas, de 4 à 2.\nRéponse : a) C1 ; b) 5.",
          micros: ["ce2_reperage_defi", "ce2_reperage_plan"],
          reponses: [
            { question: "a)", attendu: "C1", exact: true },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Le retour du robot",
          enonce: "Le robot part de B2. Il fait : → → → ↑ ↑\na) Dans quelle case arrive-t-il ?\nb) Pour revenir en B2, quel code ? A) → → → ↓ ↓ B) ← ← ↓ ↓ ↓ C) ← ← ← ↓ ↓",
          figure: grille({ col: 6, lig: 5, lettres: true, cases: [{ c: 1, l: 1, texte: "R", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }] }),
          correction:
            "a) → → → : C2, D2, E2. Puis ↑ ↑ : E3, E4.\nLe robot arrive en E4.\nb) Pour revenir, je fais le chemin à l'envers.\nIl est monté de 2 : il descend de 2, ↓ ↓.\nIl est allé 3 fois à droite : il va 3 fois à gauche, ← ← ←.\nLe code C : ← ← ← ↓ ↓. Je vérifie : E4, D4, C4, B4, B3, B2.\n⛔ Le piège : garder → (réponse A). Pour revenir, la droite devient la gauche.\nRéponse : a) E4 ; b) C.",
          micros: ["ce2_reperage_defi", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "E4", exact: true },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          titre: "Les deux amis",
          enonce: "Tom est en A1. Lou est en E5. Ils marchent l'un vers l'autre.\na) Tom fait : → → ↑ ↑. Où est-il ?\nb) Lou fait : ← ← ↓ ↓. Où est-elle ?\nc) Sont-ils dans la même case ? Réponds oui ou non.",
          figure: grille({
            col: 5,
            lig: 5,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "Tom", couleur: BLEU_CLAIR, couleurTexte: BLEU },
              { c: 4, l: 4, texte: "Lou", couleur: ORANGE_CLAIR, couleurTexte: ORANGE },
            ],
          }),
          correction:
            "a) Tom part de A1. → → : B1, C1. ↑ ↑ : C2, C3. Tom est en C3.\nb) Lou part de E5. ← ← : D5, C5. ↓ ↓ : C4, C3. Lou est en C3.\nc) Les deux sont en C3 : ils sont dans la même case. Oui.\n⛔ Le piège : croire qu'ils ne se retrouvent pas, parce que leurs codes sont différents.\nRéponse : a) C3 ; b) C3 ; c) oui.",
          micros: ["ce2_reperage_defi", "ce2_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "C3", exact: true },
            { question: "b)", attendu: "C3", exact: true },
            { question: "c)", attendu: ["oui"] },
          ],
        },
      ],
    },
  ],
};
