// ─── Fiche d'exercices : le repérage (CM1) — 20 exercices corrigés ────────────
//
// 10/11/2026 : la feuille de la notion `reperage` du coach CM1 (5 micros). Sur
// la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Chaque exercice a ses réponses vérifiées sans IA (`reponses`).
//
// Alignée sur la carte mentale remplie `cm1/reperage` et sur la banque du coach
// (`reperage.bank.ts`) : DEUX façons de repérer, comme sur la carte mentale.
//   · Une CASE : la lettre de la colonne, puis le nombre de la ligne, « C4 »
//     (colonnes A, B, C… en bas ; lignes 1, 2, 3… à gauche, 1 en bas).
//     Saisie acceptée « C4 » ou « c4 » ; « 4C » est refusé.
//   · Un POINT sur les nœuds : (nombre en bas ; nombre sur le côté), « (3 ; 2) »,
//     départ du 0 en bas à gauche. Les coordonnées se vérifient DANS L'ORDRE
//     (`ordre: true`) : (2 ; 3) n'est pas (3 ; 2).
// ⛔ LIMITES DU CM1 : entiers positifs seulement, pas de nombres négatifs.
// ⛔ Aucune question à rédiger, ni « place le point » : « quel point est en… »,
// « où arrive-t-il… », un QCM, un nombre de carreaux.
//
// Les pièges nommés : écrire 2C (1, 8), le nombre lu avant la lettre (2),
// l'ordre des coordonnées inversé (3, 4, 5, 7, 15), le point de départ compté
// (6), monter vers les grands numéros de ligne (8, 9), un carré pris pour un
// rectangle (10), un sommet placé au hasard (11), descendre fait monter (12,
// 16, 17), la gauche et la droite (13), touché à côté du bateau (14), compter
// les nœuds au lieu des carreaux (18), le chemin « en diagonale » (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 2, 8, 14), ménage robotisé (6),
// randonnée (9), plan de ville (13), musée (15), programmation (16), colonie
// de vacances (17), arpentage (18), musique (19), jeu vidéo (20).
// Les métiers : guide de randonnée (9), guide de musée (15), animatrice (17),
// géomètre (18), cheffe d'orchestre (19), développeuse de jeux vidéo (20).
// ⭐ La Réunion : UN exercice (9, la carte quadrillée de Mafate est un MODÈLE ;
// Mafate est un cirque sans route, on y va à pied — Larousse, « Mafate »).
//
// Micro-compétences : reperage_quadrillage (1, 2, 7, 8, 13, 14),
// reperage_coordonnees (3, 4, 7, 15, 18), reperage_placer_point (5, 10, 11),
// reperage_deplacement (6, 8, 9, 12, 16, 19), reperage_defi (11, 17, 18, 19,
// 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, ecranSeulement, grille } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const GRIS_BATEAU = "#94a3b8";

export const exercicesReperageCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "reperage",
  titre: "Le repérage",
  accroche:
    "Vingt exercices, du geste seul au problème. Trouver une case avec sa lettre et son nombre, comme à la bataille navale. Lire les coordonnées d'un point, dans le bon ordre. Trouver le point qui est à une adresse donnée. Suivre un trajet de case en case, ou un code de flèches. Un plateau de jeu, un robot aspirateur, une carte de randonnée, un plan de ville, un musée, une chasse au trésor, un orchestre et un jeu vidéo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je suis la colonne avec un doigt et la ligne avec l'autre.",
      rappel: [
        "Une CASE se repère par sa colonne (une lettre) puis sa ligne (un nombre) : C4.",
        "Un POINT se repère par deux nombres : d'abord celui d'en bas, puis celui du côté. On écrit (3 ; 2).",
        "Pour lire (3 ; 2), je pars du 0 : 3 carreaux vers la droite, puis 2 vers le haut.",
      ],
      exercices: [
        {
          enonce: "Sur ce plateau de jeu, chaque case a une adresse.\na) Dans quelle case est l'étoile ★ ?\nb) Dans quelle case est le rond ● ?\nc) Dans quelle case est le triangle ▲ ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 2, l: 1, texte: "★", couleurTexte: ORANGE },
              { c: 0, l: 3, texte: "●", couleurTexte: BLEU },
              { c: 4, l: 0, texte: "▲", couleurTexte: VERT },
            ],
          }),
          correction:
            "Pour chaque objet, je descends jusqu'à la lettre de la colonne. Puis je vais à gauche jusqu'au nombre de la ligne.\na) L'étoile : colonne C, ligne 2. Elle est en C2.\nb) Le rond : colonne A, ligne 4. Il est en A4.\nc) Le triangle : colonne E, ligne 1. Il est en E1.\n⛔ Le piège : écrire 2C. La lettre (la colonne) vient TOUJOURS d'abord.\nRéponse : a) C2 ; b) A4 ; c) E1.",
          reponses: [
            { question: "a)", attendu: "C2" },
            { question: "b)", attendu: "A4" },
            { question: "c)", attendu: "E1" },
          ],
          micros: ["reperage_quadrillage"],
        },
        {
          enonce: "Sur ce plateau, des jetons de couleur sont posés.\na) De quelle couleur est le jeton de la case B3 ?\nb) De quelle couleur est le jeton de la case D1 ?\nc) Dans quelle case est le jeton vert ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 1, l: 2, texte: "●", couleurTexte: BLEU },
              { c: 3, l: 0, texte: "●", couleurTexte: ROUGE },
              { c: 4, l: 3, texte: "●", couleurTexte: VERT },
              { c: 2, l: 1, texte: "●", couleurTexte: "#eab308" },
            ],
          }),
          correction:
            "a) B3 : je trouve la colonne B en bas. Je monte jusqu'à la ligne 3. Le jeton est bleu.\nb) D1 : colonne D, ligne 1, tout en bas. Le jeton est rouge.\nc) Le jeton vert est dans la colonne E, sur la ligne 4. Il est en E4.\n⛔ Le piège : lire B3 à l'envers, colonne C et ligne 2. On tombe sur le jeton jaune. La lettre donne la colonne, le nombre donne la ligne.\nRéponse : a) bleu ; b) rouge ; c) E4.",
          reponses: [
            { question: "a)", attendu: ["bleu", "bleue"] },
            { question: "b)", attendu: "rouge" },
            { question: "c)", attendu: "E4" },
          ],
          micros: ["reperage_quadrillage"],
        },
        {
          enonce: "Lis les coordonnées de chaque point. Écris-les comme (3 ; 2).\na) le point A\nb) le point B\nc) le point C",
          figure: grille({
            col: 6,
            lig: 5,
            axes: true,
            points: [
              { en: [2, 3], nom: "A" },
              { en: [5, 1], nom: "B", couleur: BLEU },
              { en: [0, 4], nom: "C", couleur: VERT },
            ],
          }),
          correction:
            "Je pars du point. Je descends jusqu'au nombre d'en bas : c'est le premier nombre.\nPuis je vais à gauche jusqu'au nombre du côté : c'est le second.\na) A : en bas 2, sur le côté 3. A (2 ; 3).\nb) B : en bas 5, sur le côté 1. B (5 ; 1).\nc) C est sur le trait de gauche : en bas 0, sur le côté 4. C (0 ; 4).\n⛔ Le piège : écrire (3 ; 2) pour A. L'ordre compte : d'abord le nombre d'EN BAS.\nRéponse : a) (2 ; 3) ; b) (5 ; 1) ; c) (0 ; 4).",
          reponses: [
            { question: "a)", attendu: ["(2 ; 3)", "A(2 ; 3)"], ordre: true },
            { question: "b)", attendu: ["(5 ; 1)", "B(5 ; 1)"], ordre: true },
            { question: "c)", attendu: ["(0 ; 4)", "C(0 ; 4)"], ordre: true },
          ],
          micros: ["reperage_coordonnees"],
        },
        {
          enonce: "Quelles sont les coordonnées du point P ?\nA) (1 ; 4)   B) (4 ; 1)   C) (4 ; 4)",
          figure: grille({ col: 5, lig: 5, axes: true, points: [{ en: [1, 4], nom: "P" }] }),
          correction:
            "Je descends du point P jusqu'en bas : je lis 1. C'est le premier nombre.\nJe vais à gauche jusqu'au côté : je lis 4. C'est le second nombre.\nP (1 ; 4) : la réponse A.\n⛔ Le piège : choisir (4 ; 1), la réponse B. C'est le même couple à l'envers : un autre point, en bas à droite.\nRéponse : A) (1 ; 4).",
          reponses: [{ attendu: ["A", "(1 ; 4)"], ordre: true }],
          micros: ["reperage_coordonnees"],
        },
        {
          enonce: "Quatre points sont tout près les uns des autres.\na) Quel point est en (3 ; 2) ?\nb) Quel point est en (2 ; 3) ?",
          figure: grille({
            col: 5,
            lig: 4,
            axes: true,
            points: [
              { en: [2, 3], nom: "D" },
              { en: [3, 2], nom: "E", couleur: BLEU },
              { en: [3, 3], nom: "F", couleur: VERT },
              { en: [2, 2], nom: "G", couleur: ORANGE },
            ],
          }),
          correction:
            "a) (3 ; 2) : je pars du 0. Je vais de 3 carreaux vers la droite, puis je monte de 2. J'arrive sur le point E.\nb) (2 ; 3) : 2 carreaux vers la droite, puis je monte de 3. J'arrive sur le point D.\n⛔ Le piège : mélanger D et E. Les deux nombres sont les mêmes, mais pas dans le même ordre : ce ne sont pas les mêmes points.\nRéponse : a) E ; b) D.",
          reponses: [
            { question: "a)", attendu: ["E", "le point E"] },
            { question: "b)", attendu: ["D", "le point D"] },
          ],
          micros: ["reperage_placer_point"],
        },
        {
          enonce: "Un robot aspirateur part du point R. Il doit aller jusqu'au point T.\na) De combien de carreaux doit-il aller vers la droite ?\nb) De combien de carreaux doit-il monter ?",
          figure: grille({
            col: 6,
            lig: 4,
            axes: true,
            points: [
              { en: [1, 1], nom: "R", couleur: BLEU },
              { en: [4, 3], nom: "T" },
            ],
          }),
          correction:
            "Je lis les coordonnées : R (1 ; 1) et T (4 ; 3).\na) En bas, je vais de 1 à 4. Je compte les sauts : 2, 3, 4. Cela fait 3 carreaux vers la droite. C'est aussi 4 − 1 = 3.\nb) Sur le côté, je vais de 1 à 3 : 3 − 1 = 2 carreaux vers le haut.\n⛔ Le piège : compter le point de départ. De 1 à 4, il y a 3 pas, pas 4.\nRéponse : a) 3 carreaux ; b) 2 carreaux.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
          ],
          micros: ["reperage_deplacement"],
        },
        {
          enonce: "Vrai ou faux ?\na) Pour la case C4, j'écris d'abord la lettre de la colonne.\nb) Les points (2 ; 5) et (5 ; 2) sont le même point.\nc) Pour aller en (2 ; 5), je pars du 0. Je vais de 2 vers la droite, puis je monte de 5.",
          figure: grille({
            col: 6,
            lig: 6,
            axes: true,
            points: [
              { en: [2, 5], nom: "M" },
              { en: [5, 2], nom: "N", couleur: BLEU },
            ],
          }),
          correction:
            "a) On écrit C4 : la lettre de la colonne, puis le nombre de la ligne. C'est vrai.\nb) Sur le dessin, M (2 ; 5) est en haut à gauche. N (5 ; 2) est en bas à droite. Ce sont deux points différents : c'est faux.\nc) Le premier nombre se lit en bas, vers la droite. Le second se lit sur le côté, vers le haut. C'est vrai.\n⛔ Le piège : croire que l'ordre ne compte pas, comme dans 2 + 5 = 5 + 2. Pour un point, l'ordre compte.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
          micros: ["reperage_quadrillage", "reperage_coordonnees"],
        },
        {
          enonce: "Le pion rouge est sur la case B2.\na) Il avance de 2 cases vers la droite. Sur quelle case arrive-t-il ?\nb) Puis il monte d'une case. Sur quelle case arrive-t-il ?",
          figure: grille({ col: 5, lig: 4, lettres: true, cases: [{ c: 1, l: 1, texte: "●", couleurTexte: ROUGE }] }),
          correction:
            "a) Vers la droite, la LETTRE change : B, puis C, puis D. La ligne reste 2. Il arrive en D2.\nb) Vers le haut, le NOMBRE change : la ligne 2 devient la ligne 3. La colonne reste D. Il arrive en D3.\n⛔ Le piège : changer le nombre quand on va à droite. À droite ou à gauche, c'est la lettre qui change.\nRéponse : a) D2 ; b) D3.",
          reponses: [
            { question: "a)", attendu: "D2" },
            { question: "b)", attendu: "D3" },
          ],
          micros: ["reperage_deplacement", "reperage_quadrillage"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je suis le trajet sur la grille avec mon crayon, pas à pas.",
      rappel: [
        "Vers la droite, le premier nombre augmente. Vers le haut, le second nombre augmente.",
        "Vers la gauche ou vers le bas, le nombre DIMINUE.",
        "Je compte les pas, pas les traits : de 1 à 4, il y a 3 pas.",
      ],
      exercices: [
        {
          enonce: "Un guide de randonnée dessine une carte quadrillée du cirque de Mafate, à La Réunion.\nLe gîte ★ est en A1. La cascade ● est en E2.\na) Depuis le gîte, il marche 3 cases vers la droite, puis 3 cases vers le haut. Sur quelle case arrive-t-il ?\nb) De là, de combien de cases doit-il descendre pour arriver sur la ligne de la cascade ?\nc) Puis de combien de cases doit-il aller vers la droite pour arriver à la cascade ?",
          figure: grille({
            col: 6,
            lig: 5,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "★", couleurTexte: ORANGE, couleur: ORANGE_CLAIR },
              { c: 4, l: 1, texte: "●", couleurTexte: BLEU, couleur: BLEU_CLAIR },
            ],
          }),
          correction:
            "a) Depuis A1, 3 cases vers la droite : B, C, D. Il est en D1.\nPuis 3 cases vers le haut : 2, 3, 4. Il arrive en D4.\nb) De la ligne 4 à la ligne 2 : 4 − 2 = 2. Il descend de 2 cases. Il est en D2.\nc) De la colonne D à la colonne E : 1 case vers la droite. Il arrive en E2.\n⛔ Le piège : monter « vers la ligne 1 ». Ici, la ligne 1 est EN BAS : monter fait grandir le nombre.\nRéponse : a) D4 ; b) 2 cases ; c) 1 case.",
          reponses: [
            { question: "a)", attendu: "D4" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: ["1", "une"] },
          ],
          micros: ["reperage_deplacement"],
        },
        {
          enonce: "Sur ce quadrillage, Ibrahim place A (1 ; 1), B (5 ; 1), C (5 ; 4) et D (1 ; 4). Puis il les relie dans l'ordre.\na) Quelle figure obtient-il ?\nA) un carré   B) un triangle   C) un rectangle\nb) Combien de carreaux mesure le côté AB ?\nc) Combien de carreaux mesure le côté BC ?",
          figure: grille({ col: 6, lig: 5, axes: true }),
          correction:
            "Je place les points au brouillon.\nA (1 ; 1) et B (5 ; 1) sont sur la même ligne, en bas. C (5 ; 4) est au-dessus de B. D (1 ; 4) est au-dessus de A.\nb) De A à B : de 1 à 5, 5 − 1 = 4 carreaux.\nc) De B à C : de 1 à 4, 4 − 1 = 3 carreaux.\na) Les quatre coins sont droits. Les côtés font 4 et 3 carreaux : ils ne sont pas égaux. C'est un rectangle, la réponse C.\n⛔ Le piège : dire « carré » parce qu'il a 4 coins droits. Un carré a 4 côtés ÉGAUX.\nRéponse : a) C, un rectangle ; b) 4 ; c) 3.",
          schema: ecranSeulement(
            grille({
              col: 6,
              lig: 5,
              axes: true,
              formes: [{ pts: [[1, 1], [5, 1], [5, 4], [1, 4]], couleur: BLEU_CLAIR, contour: BLEU }],
              points: [
                { en: [1, 1], nom: "A" },
                { en: [5, 1], nom: "B" },
                { en: [5, 4], nom: "C" },
                { en: [1, 4], nom: "D" },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["C", "un rectangle", "rectangle"] },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "3" },
          ],
          micros: ["reperage_placer_point"],
        },
        {
          enonce: "A, B et C sont trois sommets d'un carré ABCD.\nQuelles sont les coordonnées du quatrième sommet, D ?",
          figure: grille({
            col: 6,
            lig: 5,
            axes: true,
            points: [
              { en: [1, 1], nom: "A" },
              { en: [4, 1], nom: "B" },
              { en: [4, 4], nom: "C" },
            ],
          }),
          correction:
            "Je lis : A (1 ; 1), B (4 ; 1), C (4 ; 4).\nDe A à B, on va de 3 carreaux vers la droite. De B à C, on monte de 3 carreaux.\nD doit être au-dessus de A, à la même hauteur que C.\nAu-dessus de A : le premier nombre reste 1. À la hauteur de C : le second nombre est 4.\nD (1 ; 4).\n⭐ Je vérifie : de D à C, il y a 4 − 1 = 3 carreaux, comme les autres côtés.\n⛔ Le piège : écrire (4 ; 1), qui est le point B. Je relis : D est en haut à gauche.\nRéponse : D (1 ; 4).",
          schema: ecranSeulement(
            grille({
              col: 6,
              lig: 5,
              axes: true,
              formes: [{ pts: [[1, 1], [4, 1], [4, 4], [1, 4]], couleur: VERT_CLAIR, contour: VERT }],
              points: [
                { en: [1, 1], nom: "A" },
                { en: [4, 1], nom: "B" },
                { en: [4, 4], nom: "C" },
                { en: [1, 4], nom: "D", couleur: VERT },
              ],
            }),
          ),
          reponses: [{ attendu: ["(1 ; 4)", "D(1 ; 4)"], ordre: true }],
          micros: ["reperage_placer_point", "reperage_defi"],
        },
        {
          enonce: "Zoé part du point Z (1 ; 5).\nElle va de 4 carreaux vers la droite, puis descend de 3 carreaux.\na) Où est-elle après les 4 carreaux vers la droite ?\nb) Où arrive-t-elle à la fin ?",
          figure: grille({ col: 6, lig: 6, axes: true, points: [{ en: [1, 5], nom: "Z", couleur: BLEU }] }),
          correction:
            "a) Vers la droite, le PREMIER nombre augmente : 1 + 4 = 5. Le second ne bouge pas : 5. Elle est en (5 ; 5).\nb) Vers le bas, le SECOND nombre diminue : 5 − 3 = 2. Le premier ne bouge pas : 5. Elle arrive en (5 ; 2).\n⛔ Le piège : ajouter 3 en descendant, et trouver (5 ; 8). Descendre fait BAISSER le second nombre.\nRéponse : a) (5 ; 5) ; b) (5 ; 2).",
          schema: ecranSeulement(
            grille({
              col: 6,
              lig: 6,
              axes: true,
              chemins: [{ pts: [[1, 5], [5, 5], [5, 2]] }],
              points: [
                { en: [1, 5], nom: "Z", couleur: BLEU },
                { en: [5, 2], nom: "arrivée" },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "(5 ; 5)", ordre: true },
            { question: "b)", attendu: "(5 ; 2)", ordre: true },
          ],
          micros: ["reperage_deplacement"],
        },
        {
          enonce: "Voici le plan d'une petite ville.\n■ : l'école. ● : la piscine. ★ : la boulangerie.\na) Dans quelle case est la boulangerie ?\nb) Quelle est la case juste au-dessus de la piscine ?\nc) Quelle est la case juste à gauche de l'école ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 2, l: 2, texte: "■", couleurTexte: VERT },
              { c: 4, l: 0, texte: "●", couleurTexte: BLEU },
              { c: 0, l: 1, texte: "★", couleurTexte: ORANGE },
            ],
          }),
          correction:
            "a) La boulangerie est dans la colonne A, sur la ligne 2 : A2.\nb) La piscine est en E1. Juste au-dessus, la colonne ne change pas, la ligne passe de 1 à 2 : E2.\nc) L'école est en C3. Juste à gauche, la ligne ne change pas, la lettre recule de C à B : B3.\n⛔ Le piège : aller vers la droite, en D3. La gauche, c'est vers le A.\nRéponse : a) A2 ; b) E2 ; c) B3.",
          reponses: [
            { question: "a)", attendu: "A2" },
            { question: "b)", attendu: "E2" },
            { question: "c)", attendu: "B3" },
          ],
          micros: ["reperage_quadrillage"],
        },
        {
          enonce: "Lucas joue à la bataille navale. Son bateau est en gris.\na) Écris les cases du bateau, séparées par des points-virgules.\nb) Son amie tire en C2. Écris : touché ou à l'eau.\nc) Puis elle tire en C3. Écris : touché ou à l'eau.",
          figure: grille({ col: 5, lig: 4, lettres: true, cases: [{ c: 1, l: 1, couleur: GRIS_BATEAU }, { c: 2, l: 1, couleur: GRIS_BATEAU }, { c: 3, l: 1, couleur: GRIS_BATEAU }] }),
          correction:
            "a) Le bateau est sur la ligne 2, dans les colonnes B, C et D. Ses cases : B2, C2, D2.\nb) C2 est une case du bateau : touché !\nc) C3 : colonne C, ligne 3. C'est juste au-dessus du bateau, sur une case vide : à l'eau.\n⛔ Le piège : dire « touché » pour C3 parce que la colonne C touche le bateau. Il faut la bonne colonne ET la bonne ligne.\nRéponse : a) B2 ; C2 ; D2 ; b) touché ; c) à l'eau.",
          reponses: [
            { question: "a)", attendu: ["B2 ; C2 ; D2", "B2, C2, D2"] },
            { question: "b)", attendu: ["touché", "oui"] },
            { question: "c)", attendu: ["à l'eau", "eau", "dans l'eau", "raté", "manqué", "non"] },
          ],
          micros: ["reperage_quadrillage"],
        },
        {
          enonce: "Sur le plan d'un musée, la statue est au point S.\na) Quelles sont les coordonnées de S ?\nA) (5 ; 3)   B) (3 ; 3)   C) (3 ; 5)\nb) Le guide du musée va de S à la sortie E. De combien de carreaux va-t-il vers la droite ?",
          figure: grille({
            col: 7,
            lig: 6,
            axes: true,
            points: [
              { en: [3, 5], nom: "S" },
              { en: [6, 5], nom: "E", couleur: VERT },
            ],
          }),
          correction:
            "a) Je descends de S jusqu'en bas : je lis 3. Je vais à gauche : je lis 5. S (3 ; 5) : la réponse C.\nb) La sortie E est en (6 ; 5), sur la même ligne que S. De 3 à 6 : 6 − 3 = 3 carreaux vers la droite.\n⛔ Le piège : choisir (5 ; 3), la réponse A, en lisant d'abord le côté. Je commence TOUJOURS par le nombre d'en bas.\nRéponse : a) C) (3 ; 5) ; b) 3 carreaux.",
          reponses: [
            { question: "a)", attendu: ["C", "(3 ; 5)"], ordre: true },
            { question: "b)", attendu: "3" },
          ],
          micros: ["reperage_coordonnees"],
        },
        {
          enonce: "Un petit robot suit un code de flèches. Il part du point D (1 ; 2).\nSon code : → → ↑ → ↓\nChaque flèche le fait avancer d'un carreau.\na) Où arrive-t-il ?\nb) Pour revenir en D, de combien de carreaux doit-il aller vers la gauche ?",
          figure: grille({ col: 6, lig: 5, axes: true, points: [{ en: [1, 2], nom: "D", couleur: BLEU }] }),
          correction:
            "Je suis le code flèche par flèche, et j'écris chaque arrêt.\n→ : (2 ; 2). → : (3 ; 2). ↑ : (3 ; 3). → : (4 ; 3). ↓ : (4 ; 2).\na) Il arrive en (4 ; 2).\nb) Il est sur la même ligne que D (1 ; 2). De 4 à 1 : 4 − 1 = 3 carreaux vers la gauche.\n⛔ Le piège : oublier la dernière flèche ↓ et répondre (4 ; 3). Je coche chaque flèche faite.\nRéponse : a) (4 ; 2) ; b) 3 carreaux.",
          schema: ecranSeulement(
            grille({
              col: 6,
              lig: 5,
              axes: true,
              chemins: [{ pts: [[1, 2], [2, 2], [3, 2], [3, 3], [4, 3], [4, 2]] }],
              points: [{ en: [1, 2], nom: "D", couleur: BLEU }],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "(4 ; 2)", ordre: true },
            { question: "b)", attendu: "3" },
          ],
          micros: ["reperage_deplacement"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je fais le trajet au brouillon et j'écris chaque arrêt.",
      rappel: [
        "Un trajet en plusieurs étapes : je note l'adresse après CHAQUE étape.",
        "Le nombre de pas d'un trajet : j'additionne les pas de chaque étape.",
        "Sur un quadrillage, on avance par les lignes, jamais en diagonale.",
      ],
      exercices: [
        {
          titre: "La chasse au trésor",
          enonce: "Une animatrice de colonie cache un trésor. Les enfants partent du point O (0 ; 0).\nIndice : « 5 pas vers la droite, puis 4 pas vers le haut, puis 2 pas vers la gauche. »\na) Où sont-ils après les deux premières étapes ?\nb) Où est le trésor ?\nc) Combien de pas ont-ils faits en tout ?",
          figure: grille({ col: 7, lig: 5, axes: true, points: [{ en: [0, 0], nom: "O", couleur: BLEU }] }),
          correction:
            "Je note l'adresse après chaque étape.\n5 pas vers la droite : (5 ; 0). 4 pas vers le haut : (5 ; 4).\na) Après deux étapes : (5 ; 4).\nb) 2 pas vers la gauche : le premier nombre diminue, 5 − 2 = 3. Le trésor est en (3 ; 4).\nc) 5 + 4 + 2 = 11 pas.\n⛔ Le piège : ajouter les 2 pas vers la gauche et trouver (7 ; 4). Vers la gauche, on recule.\nRéponse : a) (5 ; 4) ; b) (3 ; 4) ; c) 11 pas.",
          schema: ecranSeulement(
            grille({
              col: 7,
              lig: 5,
              axes: true,
              chemins: [{ pts: [[0, 0], [5, 0], [5, 4], [3, 4]] }],
              points: [
                { en: [0, 0], nom: "O", couleur: BLEU },
                { en: [3, 4], nom: "trésor" },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "(5 ; 4)", ordre: true },
            { question: "b)", attendu: "(3 ; 4)", ordre: true },
            { question: "c)", attendu: "11" },
          ],
          micros: ["reperage_defi", "reperage_deplacement"],
        },
        {
          titre: "Le champ du géomètre",
          enonce: "Un géomètre mesure un champ rectangulaire avec un drone. Chaque carreau vaut 10 m.\nLes coins du champ sont A, B, C et D.\na) Combien de carreaux mesure le côté AB ?\nb) Combien de carreaux mesure le côté BC ?\nc) Combien de carreaux fait le tour du champ ?\nd) Combien de mètres fait le tour du champ ?",
          figure: grille({
            col: 7,
            lig: 5,
            axes: true,
            formes: [{ pts: [[1, 1], [6, 1], [6, 4], [1, 4]], couleur: VERT_CLAIR, contour: VERT }],
            points: [
              { en: [1, 1], nom: "A" },
              { en: [6, 1], nom: "B" },
              { en: [6, 4], nom: "C" },
              { en: [1, 4], nom: "D" },
            ],
          }),
          correction:
            "Je lis les coordonnées : A (1 ; 1), B (6 ; 1), C (6 ; 4), D (1 ; 4).\na) A et B sont sur la même ligne. De 1 à 6 : 6 − 1 = 5 carreaux.\nb) B et C sont sur la même colonne. De 1 à 4 : 4 − 1 = 3 carreaux.\nc) Le tour : 5 + 3 + 5 + 3 = 16 carreaux.\nd) Un carreau vaut 10 m : 16 × 10 = 160 m.\n⛔ Le piège : compter les traits, 6 au lieu de 5 pour AB. Je compte les sauts entre les traits.\nRéponse : a) 5 ; b) 3 ; c) 16 ; d) 160 m.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "16" },
            { question: "d)", attendu: "160 m" },
          ],
          micros: ["reperage_coordonnees", "reperage_defi"],
        },
        {
          titre: "La place des musiciens",
          enonce: "Une cheffe d'orchestre place ses musiciens sur une grille. Le violon ★ est en B2.\na) La flûte est 2 cases à droite du violon, et 1 case plus haut. Dans quelle case est-elle ?\nb) La harpe est 2 cases au-dessus de la flûte. Dans quelle case est-elle ?\nc) Le piano est en F2. De combien de cases est-il à droite du violon ?",
          figure: grille({ col: 6, lig: 5, lettres: true, cases: [{ c: 1, l: 1, texte: "★", couleurTexte: ORANGE }] }),
          correction:
            "a) Depuis B2, 2 cases à droite : C, puis D. Je suis en D2. 1 case plus haut : D3. La flûte est en D3.\nb) Depuis D3, 2 cases au-dessus : la ligne 3 devient 4, puis 5. La harpe est en D5.\nc) Le violon et le piano sont sur la ligne 2. De B à F : C, D, E, F. Cela fait 4 cases.\n⛔ Le piège : compter la case du violon et trouver 5. Je compte les pas, à partir de la case suivante.\nRéponse : a) D3 ; b) D5 ; c) 4 cases.",
          schema: ecranSeulement(
            grille({
              col: 6,
              lig: 5,
              lettres: true,
              cases: [
                { c: 1, l: 1, texte: "★", couleurTexte: ORANGE },
                { c: 3, l: 2, texte: "flûte", couleur: BLEU_CLAIR },
                { c: 3, l: 4, texte: "harpe", couleur: BLEU_CLAIR },
                { c: 5, l: 1, texte: "piano", couleur: BLEU_CLAIR },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "D3" },
            { question: "b)", attendu: "D5" },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
          micros: ["reperage_deplacement", "reperage_defi"],
        },
        {
          titre: "Le héros du jeu vidéo",
          enonce: "Une développeuse de jeux vidéo teste son héros sur une grille.\nLe héros avance d'un carreau à chaque pas, vers la droite, la gauche, le haut ou le bas. Jamais en diagonale.\na) Il va de (0 ; 0) à la clé, en (4 ; 3). Combien de pas faut-il, au moins ?\nb) Puis il va de la clé à la porte, en (1 ; 5). Combien de pas, au moins ?\nc) Combien de pas en tout, au moins ?",
          figure: grille({
            col: 6,
            lig: 6,
            axes: true,
            points: [
              { en: [0, 0], nom: "héros", couleur: BLEU },
              { en: [4, 3], nom: "clé", couleur: ORANGE },
              { en: [1, 5], nom: "porte", couleur: VERT },
            ],
          }),
          correction:
            "Le chemin le plus court : je vais tout droit dans un sens, puis tout droit dans l'autre.\na) De 0 à 4 vers la droite : 4 pas. De 0 à 3 vers le haut : 3 pas. 4 + 3 = 7 pas.\nb) De 4 à 1 vers la gauche : 4 − 1 = 3 pas. De 3 à 5 vers le haut : 5 − 3 = 2 pas. 3 + 2 = 5 pas.\nc) 7 + 5 = 12 pas.\n⛔ Le piège : compter la diagonale comme un seul pas. Le héros ne peut pas couper en diagonale.\nRéponse : a) 7 ; b) 5 ; c) 12.",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "12" },
          ],
          micros: ["reperage_defi"],
        },
      ],
    },
  ],
};
