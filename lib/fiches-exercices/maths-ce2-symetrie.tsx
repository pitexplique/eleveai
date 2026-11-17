// ─── Fiche d'exercices : la symétrie axiale (CE2) — 20 exercices corrigés ──────
//
// 17/11/2026 : la feuille interactive de la notion `symetrie` du coach CE2
// (4 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/symetrie.bank.ts` : reconnaître un ou
// plusieurs axes de symétrie (pliage), compléter une figure pour la rendre
// symétrique, construire le symétrique d'un point sur quadrillage.
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : pas de symétrie centrale (5ᵉ),
// des axes debout ou couchés sur quadrillage, des distances comptées en
// carreaux ou en mètres entiers.
// ⛔ Aucune construction à rendre : le symétrique devient une CASE nommée
// (« E3 », lettre de colonne + nombre de ligne), un point à choisir, un nombre
// de carreaux. Plusieurs cases : séparées par « ; », dans n'importe quel
// ordre. Aucune question à rédiger. Phrases de 18 mots au plus.
//
// LE PIÈGE DE LA NOTION (celui de la banque) : la diagonale du rectangle.
// L'élève donne 4 axes au rectangle, il n'en a que 2 : plié sur la diagonale,
// les deux moitiés ne se superposent pas. Le second : le symétrique d'un point
// est à LA MÊME DISTANCE de l'axe, de l'autre côté, sur la même ligne.
//
// Les pièges nommés : la diagonale du rectangle (1, 5), compter un axe à F
// (2), recopier la moitié sans la retourner (8), compter depuis le bord au
// lieu de l'axe (4, 6), descendre au lieu de monter (7), le triangle
// rectangle cru symétrique (9), oublier la case qui touche l'axe (10),
// recolorier une case déjà en double (11), la mauvaise distance (12, 13), la
// cheminée oubliée (14), l'axe au milieu du dessin et pas de la figure (15),
// A plié sur D (16), oublier le côté peint (17), compter une seule moitié
// (18), le mur entier pris pour la moitié (19), additionner un seul côté (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1 à 16), peinture (17), carrelage
// (18), architecture (19), jardin (20). Métiers : artiste peintre (17),
// carreleuse (18), charpentier (19), jardinier (20). UN SEUL contexte
// réunionnais (19, la façade d'une case créole, MODÈLE).
//
// ⭐ FAITS RÉELS : aucun. Les mesures sont des MODÈLES.
//
// ⭐ LES DESSINS : `quadrillage` (cases nommées, axe rouge en pointillés, de
// `dessins-ce2-lotI.tsx`) et `dessin` (repère en carreaux, de
// `dessins-geometrie-cm1.tsx`). La figure complétée du corrigé passe en
// `ecranSeulement` : elle ne s'imprime pas avec l'énoncé.
//
// Micro-compétences : ce2_symetrie_axe (1, 2, 5, 9, 14, 15, 16),
// ce2_symetrie_completer (3, 8, 11, 17, 18), ce2_symetrie_construire (4, 6,
// 7, 10, 12, 13, 18, 19, 20), ce2_symetrie_defi (17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, VIOLET, cases, dessin, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";
import { ecranSeulement, quadrillage } from "@/lib/fiches-exercices/dessins-ce2-lotI";

type Vers = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

/** Un point (croix) et son nom. */
const pt = (en: P, nom: string, vers: Vers = "h", c = ENCRE): Forme => ({ t: "point", en, nom, vers, c });

/** L'axe : un trait rouge épais en pointillés. */
const axe = (de: P, vers: P): Forme => ({ t: "seg", de, vers, c: ROUGE, w: 3, pt: true });

/** Des cases coloriées d'une même couleur, pour `quadrillage`. */
const peint = (liste: string[], fill: string) => liste.map((c) => ({ c, fill }));

const BLEU_Q = "#93c5fd";
const ORANGE_Q = "#fdba74";

export const exercicesSymetrieCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "symetrie",
  titre: "La symétrie axiale",
  accroche:
    "Vingt exercices, du geste seul au problème. Trouver les axes de symétrie d'une figure, en pliant dans sa tête. Compléter une figure pour qu'elle soit symétrique. Trouver la case ou le point symétrique sur un quadrillage, en comptant les carreaux depuis l'axe. Une artiste peintre, une carreleuse, une case créole et un jardin. Un rappel avant chaque niveau. Cherche d'abord sur le dessin. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je plie dans ma tête le long du trait rouge.",
      rappel: [
        "Un axe de symétrie est un pli : les deux moitiés se superposent exactement.",
        "Le symétrique d'une case est de l'autre côté de l'axe, à la même distance, sur la même ligne.",
        "Une case se nomme par sa lettre, puis son nombre : E3.",
      ],
      exercices: [
        {
          enonce: "Le trait rouge est-il un axe de symétrie de la figure ? Écris oui ou non.\na) figure 1\nb) figure 2\nc) figure 3",
          figure: dessin({
            l: 18,
            h: 5.4,
            grille: true,
            label: "Trois figures coupées par un trait rouge en pointillés",
            formes: [
              { t: "poly", pts: [[1, 1], [5, 1], [5, 4], [1, 4]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              axe([3, 0.4], [3, 4.6]),
              { t: "texte", en: [3, 5], txt: "1" },
              { t: "poly", pts: [[7, 1], [11, 1], [11, 4], [7, 4]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              axe([6.5, 0.625], [11.5, 4.375]),
              { t: "texte", en: [9, 5], txt: "2" },
              { t: "poly", pts: [[13, 4], [17, 4], [15, 1]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              axe([15, 0.4], [15, 4.6]),
              { t: "texte", en: [15, 5], txt: "3" },
            ],
          }),
          correction:
            "Je plie chaque figure dans ma tête, le long du trait rouge.\na) Le rectangle plié au milieu : les deux moitiés se recouvrent exactement. Oui.\nb) Le rectangle plié sur sa diagonale : les deux triangles se croisent, ils dépassent. Non.\nc) Le triangle plié au milieu : les deux moitiés se recouvrent. Oui.\n⛔ Le piège du b) : dire oui, parce que la diagonale coupe le rectangle en deux morceaux pareils. Pareils, mais ils ne se superposent pas en pliant.\nRéponse : a) oui ; b) non ; c) oui.",
          schema: ecranSeulement(
            dessin({
              l: 8,
              h: 5,
              grille: true,
              max: "max-w-[12rem]",
              label: "Le rectangle plié sur sa diagonale : le triangle replié dépasse",
              formes: [
                { t: "poly", pts: [[1, 1], [5, 1], [5, 4]], c: ORANGE, fill: ORANGE_CLAIR, w: 2 },
                { t: "poly", pts: [[1, 1], [5, 4], [3.88, 0.16]], c: VIOLET, w: 2, pt: true },
              ],
            }),
          ),
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque lettre ?\na) la lettre A\nb) la lettre H\nc) la lettre F",
          figure: dessin({
            l: 15,
            h: 6,
            label: "Les lettres A, H et F en bâtons",
            formes: [
              { t: "poly", pts: [[1, 5], [2.5, 1], [4, 5]], c: BLEU, w: 6, ouvert: true },
              { t: "seg", de: [1.6, 3.4], vers: [3.4, 3.4], c: BLEU, w: 6 },
              { t: "seg", de: [6, 1], vers: [6, 5], c: ORANGE, w: 6 },
              { t: "seg", de: [9, 1], vers: [9, 5], c: ORANGE, w: 6 },
              { t: "seg", de: [6, 3], vers: [9, 3], c: ORANGE, w: 6 },
              { t: "seg", de: [11, 1], vers: [11, 5], c: VERT, w: 6 },
              { t: "seg", de: [11, 1], vers: [14, 1], c: VERT, w: 6 },
              { t: "seg", de: [11, 3], vers: [13.2, 3], c: VERT, w: 6 },
            ],
          }),
          correction:
            "Je cherche chaque pli qui superpose les deux moitiés.\na) A : un pli debout, au milieu. Pas de pli couché : le haut pointu ne recouvre pas le bas ouvert. 1 axe.\nb) H : un pli debout au milieu, et un pli couché au milieu. 2 axes.\nc) F : plié debout, les barres vont toutes à droite. Plié couché, la barre du haut est plus longue. 0 axe.\n⛔ Le piège du c) : donner un axe couché à F. Ses deux barres n'ont pas la même longueur.\nRéponse : a) 1 ; b) 2 ; c) 0.",
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["0", "zéro", "aucun"] },
          ],
        },
        {
          enonce: "Il faut compléter la figure pour qu'elle soit symétrique par rapport au trait rouge.\na) Combien de cases faut-il colorier à droite ?\nb) Combien de cases aura la figure finie ?",
          figure: quadrillage(6, 4, { axe: { apresColonne: 3 }, couleurs: peint(["B1", "C1", "C2", "C3", "B3"], BLEU_Q) }),
          schema: ecranSeulement(quadrillage(6, 4, { axe: { apresColonne: 3 }, couleurs: [...peint(["B1", "C1", "C2", "C3", "B3"], BLEU_Q), ...peint(["E1", "D1", "D2", "D3", "E3"], ORANGE_Q)] })),
          correction:
            "Chaque case bleue à gauche a sa case symétrique à droite, à la même distance du trait.\nJe compte les cases bleues : B1, C1, C2, C3, B3. Il y en a 5.\na) Il faut colorier 5 cases à droite : D1, D2, D3, E1, E3.\nb) La figure finie : 5 + 5 = 10 cases.\n⛔ Le piège : colorier moins de cases, en oubliant celles collées au trait. C1, C2, C3 ont aussi leur symétrique.\nRéponse : a) 5 ; b) 10.",
          micros: ["ce2_symetrie_completer"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Le trait rouge est l'axe de symétrie.\na) Quelle case est le symétrique de B3 ?\nb) Quelle case est le symétrique de A1 ?",
          figure: quadrillage(6, 4, { axe: { apresColonne: 3 }, couleurs: [...peint(["B3"], BLEU_Q), ...peint(["A1"], ORANGE_Q)] }),
          correction:
            "Je compte les colonnes depuis le trait rouge, pas depuis le bord.\na) B3 : de B au trait, je passe par B et C. 2 colonnes à gauche.\nDe l'autre côté, 2 colonnes à droite : D, puis E. Même ligne 3. C'est E3.\nb) A1 : A, B, C. 3 colonnes à gauche. À droite : D, E, F. Même ligne 1. C'est F1.\n⛔ Le piège : poser la case juste après le trait, en D3. B3 n'est pas collée au trait : elle est à 2 colonnes.\nRéponse : a) E3 ; b) F1.",
          micros: ["ce2_symetrie_construire"],
          reponses: [
            { question: "a)", attendu: ["E3", "la case E3"] },
            { question: "b)", attendu: ["F1", "la case F1"] },
          ],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque figure ?\na) le carré\nb) le rectangle",
          figure: dessin({
            l: 13,
            h: 5,
            label: "Un carré et un rectangle",
            formes: [
              { t: "poly", pts: [[1, 0.8], [4.6, 0.8], [4.6, 4.4], [1, 4.4]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "poly", pts: [[6.5, 1.2], [12.3, 1.2], [12.3, 4], [6.5, 4]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
            ],
          }),
          correction:
            "Je cherche tous les plis qui superposent les deux moitiés.\na) Le carré : un pli debout au milieu, un pli couché au milieu, et les deux diagonales. 4 axes.\nb) Le rectangle : un pli debout au milieu, un pli couché au milieu. 2 axes.\nPlié sur une diagonale, le rectangle dépasse : ses côtés n'ont pas la même longueur.\n⛔ Le piège du b) : donner 4 axes au rectangle, comme au carré. Ses diagonales ne sont pas des axes.\nRéponse : a) 4 ; b) 2.",
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Le point A est à gauche du trait rouge.\na) À combien de carreaux de l'axe est A ?\nb) Quel point est le symétrique de A : M, N ou P ?",
          figure: dessin({
            l: 11,
            h: 5,
            grille: true,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un point A, l'axe rouge, et trois points M, N, P à droite",
            formes: [axe([5, 0.2], [5, 4.8]), pt([3, 3], "A", "g", BLEU), pt([7, 2], "M", "h", ORANGE), pt([7, 3], "N", "b", ORANGE), pt([8, 3], "P", "d", ORANGE)],
          }),
          correction:
            "a) Je compte les carreaux de A jusqu'au trait rouge, sur sa ligne : 2 carreaux.\nb) Le symétrique est de l'autre côté, à 2 carreaux de l'axe, sur la même ligne.\nN est sur la même ligne, à 2 carreaux à droite : c'est N.\nM est à 2 carreaux, mais une ligne plus haut. P est sur la bonne ligne, mais à 3 carreaux.\n⛔ Le piège : choisir P, en comptant depuis A au lieu de l'axe. Je compte toujours depuis l'axe.\nRéponse : a) 2 ; b) N.",
          micros: ["ce2_symetrie_construire"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["N", "le point N"] },
          ],
        },
        {
          enonce: "Ici, l'axe de symétrie est couché.\na) Quelle case est le symétrique de C1 ?\nb) Quelle case est le symétrique de B2 ?",
          figure: quadrillage(5, 4, { axe: { apresLigne: 2 }, couleurs: [...peint(["C1"], BLEU_Q), ...peint(["B2"], ORANGE_Q)] }),
          correction:
            "L'axe passe entre la ligne 2 et la ligne 3. Je compte les lignes depuis l'axe.\na) C1 est à 2 lignes sous l'axe (1 et 2). Au-dessus, 2 lignes : 3, puis 4. Même colonne C : C4.\nb) B2 est collée sous l'axe. Son symétrique est collé au-dessus : ligne 3. Même colonne B : B3.\n⛔ Le piège : changer de colonne. Avec un axe couché, la lettre ne bouge pas : seul le nombre change.\nRéponse : a) C4 ; b) B3.",
          micros: ["ce2_symetrie_construire"],
          reponses: [
            { question: "a)", attendu: ["C4", "la case C4"] },
            { question: "b)", attendu: ["B3", "la case B3"] },
          ],
        },
        {
          enonce: "On a complété la moitié gauche de trois façons.\nQuel dessin est vraiment symétrique par rapport au trait rouge ? Écris la lettre.",
          figure: dessin({
            l: 18,
            h: 5,
            grille: true,
            label: "Trois dessins A, B et C : une forme en L à gauche et sa copie à droite",
            formes: [
              ...cases([[0.5, 0.5], [0.5, 1.5], [0.5, 2.5], [1.5, 2.5]], BLEU_Q, BLEU),
              ...cases([[2.5, 0.5], [2.5, 1.5], [2.5, 2.5], [3.5, 2.5]], ORANGE_Q, ORANGE),
              axe([2.5, 0.2], [2.5, 3.8]),
              { t: "texte", en: [2.5, 4.4], txt: "A" },
              ...cases([[6.5, 0.5], [6.5, 1.5], [6.5, 2.5], [7.5, 2.5]], BLEU_Q, BLEU),
              ...cases([[9.5, 0.5], [9.5, 1.5], [9.5, 2.5], [8.5, 2.5]], ORANGE_Q, ORANGE),
              axe([8.5, 0.2], [8.5, 3.8]),
              { t: "texte", en: [8.5, 4.4], txt: "B" },
              ...cases([[12.5, 0.5], [12.5, 1.5], [12.5, 2.5], [13.5, 2.5]], BLEU_Q, BLEU),
              ...cases([[16.5, 0.5], [16.5, 1.5], [16.5, 2.5], [15.5, 2.5]], ORANGE_Q, ORANGE),
              axe([14.5, 0.2], [14.5, 3.8]),
              { t: "texte", en: [14.5, 4.4], txt: "C" },
            ],
          }),
          correction:
            "Je plie chaque dessin le long du trait rouge : le bleu doit tomber exactement sur l'orange.\nA : l'orange est la même forme, recopiée sans la retourner. Le pied du L part du mauvais côté. Non.\nB : entre la barre bleue et l'axe, 1 carreau vide. Entre l'axe et la barre orange, 1 carreau vide aussi. Les pieds touchent l'axe des deux côtés. Oui.\nC : la forme est bien retournée, mais elle est trop loin : son pied ne touche plus l'axe. Non.\n⛔ Le piège : choisir A. Recopier ne suffit pas : la moitié doit être RETOURNÉE, comme dans un miroir.\nRéponse : B.",
          micros: ["ce2_symetrie_completer"],
          reponses: [{ attendu: ["B", "le dessin B"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je compte les carreaux depuis l'axe, case par case.",
      rappel: [
        "Axe debout : la ligne ne change pas, je compte les colonnes depuis l'axe.",
        "Axe couché : la colonne ne change pas, je compte les lignes depuis l'axe.",
        "Une case collée à l'axe a son symétrique collée de l'autre côté.",
      ],
      exercices: [
        {
          enonce: "Combien d'axes de symétrie a chaque figure ?\na) le losange\nb) le triangle 2\nc) le triangle 3",
          figure: dessin({
            l: 16,
            h: 6,
            grille: true,
            label: "Un losange, un triangle rectangle quelconque et un triangle aux deux côtés égaux",
            formes: [
              { t: "poly", pts: [[2.5, 0.5], [4, 3], [2.5, 5.5], [1, 3]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "poly", pts: [[6, 5], [10, 5], [6, 2]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              { t: "texte", en: [7.2, 5.6], txt: "2" },
              { t: "poly", pts: [[11.5, 5], [15.5, 5], [13.5, 1]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              { t: "texte", en: [13.5, 5.6], txt: "3" },
            ],
          }),
          correction:
            "Je cherche tous les plis qui superposent les deux moitiés.\na) Le losange : un pli debout par ses pointes du haut et du bas, un pli couché par ses pointes de côté. 2 axes.\nb) Le triangle 2 a un angle droit et trois côtés de longueurs différentes. Aucun pli ne marche : 0 axe.\nc) Le triangle 3 a deux côtés égaux. Un pli debout au milieu : 1 axe.\n⛔ Le piège du b) : chercher un pli au milieu. Les deux moitiés n'ont pas la même forme.\nRéponse : a) 2 ; b) 0 ; c) 1.",
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["0", "zéro", "aucun"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Quelles cases faut-il colorier pour construire le symétrique de la figure bleue ?\nÉcris les trois cases, séparées par « ; ».",
          figure: quadrillage(6, 4, { axe: { apresColonne: 3 }, couleurs: peint(["B2", "B3", "C3"], BLEU_Q) }),
          schema: ecranSeulement(quadrillage(6, 4, { axe: { apresColonne: 3 }, couleurs: [...peint(["B2", "B3", "C3"], BLEU_Q), ...peint(["E2", "E3", "D3"], ORANGE_Q)] })),
          correction:
            "Je fais chaque case, une par une, en comptant depuis le trait rouge.\nB2 : 2 colonnes à gauche (B, C). À droite : D, E. C'est E2.\nB3 : même chose, sur la ligne 3. C'est E3.\nC3 : collée au trait. Son symétrique est collé de l'autre côté : D3.\n⛔ Le piège : oublier C3, ou la mettre en E3. Une case collée à l'axe reste collée à l'axe.\nRéponse : D3 ; E2 ; E3.",
          micros: ["ce2_symetrie_construire"],
          reponses: [{ attendu: ["D3 ; E2 ; E3", "E2 ; E3 ; D3"] }],
        },
        {
          enonce: "La figure bleue doit devenir symétrique par rapport au trait rouge. D2 et E2 sont déjà coloriées.\na) Combien de cases faut-il encore colorier ?\nb) Combien de cases aura la figure finie ?",
          figure: quadrillage(8, 4, { axe: { apresColonne: 4 }, couleurs: peint(["B1", "C1", "C3", "D2", "E2"], BLEU_Q) }),
          schema: ecranSeulement(quadrillage(8, 4, { axe: { apresColonne: 4 }, couleurs: [...peint(["B1", "C1", "C3", "D2", "E2"], BLEU_Q), ...peint(["G1", "F1", "F3"], ORANGE_Q)] })),
          correction:
            "Je cherche chaque case bleue, et je regarde si sa symétrique est déjà là.\nD2 et E2 sont collées de chaque côté du trait : elles sont symétriques l'une de l'autre. Rien à faire.\nB1 → G1. C1 → F1. C3 → F3. Ces trois cases manquent.\na) Il faut colorier 3 cases.\nb) La figure finie : 5 cases bleues + 3 nouvelles = 8 cases.\n⛔ Le piège : colorier aussi une case pour D2. Sa symétrique est E2, déjà coloriée.\nRéponse : a) 3 ; b) 8.",
          micros: ["ce2_symetrie_completer"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Ici, l'axe rouge est couché.\nQuel point est le symétrique de A : M, N ou P ?",
          figure: dessin({
            l: 7,
            h: 6,
            grille: true,
            u: 30,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "Un axe rouge couché, un point A au-dessus, trois points M, N, P en dessous",
            formes: [axe([0.2, 3], [6.8, 3]), pt([3, 1], "A", "h", BLEU), pt([3, 5], "M", "b", ORANGE), pt([4, 5], "N", "b", ORANGE), pt([3, 4], "P", "g", ORANGE)],
          }),
          correction:
            "A est au-dessus de l'axe. Je compte les carreaux de A jusqu'à l'axe, tout droit : 2 carreaux.\nLe symétrique est en dessous, à 2 carreaux de l'axe, dans la même colonne.\nM est dans la même colonne, 2 carreaux sous l'axe : c'est M.\nN est à la bonne hauteur, mais une colonne à côté. P est trop près : 1 carreau.\n⛔ Le piège : choisir P, juste de l'autre côté. Il faut la même distance : 2 carreaux.\nRéponse : M.",
          micros: ["ce2_symetrie_construire"],
          reponses: [{ attendu: ["M", "le point M"] }],
        },
        {
          enonce: "Le point A est à 3 carreaux à gauche de l'axe. B est son symétrique.\na) À combien de carreaux de l'axe est B ?\nb) Combien de carreaux y a-t-il de A à B ?",
          figure: dessin({
            l: 10,
            h: 3,
            grille: true,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Un point A à gauche d'un axe rouge debout",
            formes: [axe([5, 0.2], [5, 2.8]), pt([2, 1.5], "A", "h", BLEU)],
          }),
          correction:
            "a) Le symétrique est à la même distance de l'axe : B est à 3 carreaux, à droite.\nb) De A à l'axe : 3 carreaux. De l'axe à B : encore 3. 3 + 3 = 6 carreaux.\n⛔ Le piège du b) : répondre 3. 3, c'est seulement la moitié du chemin, de A jusqu'à l'axe.\nRéponse : a) 3 ; b) 6.",
          micros: ["ce2_symetrie_construire"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Chaque figure est-elle symétrique par rapport au trait rouge ? Écris oui ou non.\na) la maison 1\nb) la maison 2\nc) la flèche 3",
          figure: dessin({
            l: 17,
            h: 6.6,
            grille: true,
            label: "Deux maisons et une flèche, chacune coupée par un trait rouge",
            formes: [
              { t: "poly", pts: [[1, 6], [5, 6], [5, 3], [3, 1], [1, 3]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              axe([3, 0.4], [3, 6.4]),
              { t: "texte", en: [0.5, 0.6], txt: "1" },
              { t: "poly", pts: [[7, 6], [11, 6], [11, 3], [10, 2], [10, 1], [9.5, 1], [9.5, 1.5], [9, 1], [7, 3]], c: ORANGE, fill: ORANGE_CLAIR, w: 2.5 },
              axe([9, 0.4], [9, 6.4]),
              { t: "texte", en: [6.5, 0.6], txt: "2" },
              { t: "poly", pts: [[14, 1], [16.5, 3.5], [15, 3.5], [15, 6], [13, 6], [13, 3.5], [11.5, 3.5]], c: VERT, fill: VERT_CLAIR, w: 2.5 },
              axe([14, 0.4], [14, 6.4]),
              { t: "texte", en: [16.5, 0.6], txt: "3" },
            ],
          }),
          correction:
            "Je plie chaque figure le long du trait rouge.\na) La maison 1 : à gauche et à droite, le mur et le toit sont pareils. Les moitiés se recouvrent : oui.\nb) La maison 2 a une cheminée d'un seul côté. Pliée, la cheminée ne retombe sur rien : non.\nc) La flèche : la pointe et la tige sont pareilles des deux côtés. Oui.\n⛔ Le piège du b) : ne regarder que le mur et le toit. Un seul petit morceau en trop, et la figure n'est plus symétrique.\nRéponse : a) oui ; b) non ; c) oui.",
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          enonce: "Trois traits passent sur cette figure en T.\nQuel trait est un axe de symétrie : le 1, le 2 ou le 3 ?",
          figure: dessin({
            l: 9,
            h: 7,
            grille: true,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Une figure en forme de T et trois traits numérotés",
            formes: [
              { t: "poly", pts: [[1, 1], [7, 1], [7, 2], [5, 2], [5, 6], [3, 6], [3, 2], [1, 2]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              { t: "seg", de: [3, 0.3], vers: [3, 6.7], c: VIOLET, w: 2.5, pt: true },
              { t: "texte", en: [2.6, 6.6], txt: "1", c: VIOLET },
              { t: "seg", de: [4, 0.3], vers: [4, 6.7], c: ROUGE, w: 2.5, pt: true },
              { t: "texte", en: [4.4, 6.6], txt: "2", c: ROUGE },
              { t: "seg", de: [0.3, 3.5], vers: [8.3, 3.5], c: VERT, w: 2.5, pt: true },
              { t: "texte", en: [8.6, 3.5], txt: "3", c: VERT },
            ],
          }),
          correction:
            "Je plie la figure sur chaque trait, dans ma tête.\nTrait 1 : à gauche, 2 carreaux de barre ; à droite, 4 carreaux et la tige. Ça ne se recouvre pas.\nTrait 2 : il coupe la barre en 3 + 3 carreaux et la tige en 1 + 1. Tout se recouvre.\nTrait 3 : en haut, la barre large ; en bas, la tige étroite. Ça ne se recouvre pas.\n⛔ Le piège : choisir le trait 1, collé au bord de la tige. L'axe passe au milieu de la figure.\nRéponse : 2.",
          micros: ["ce2_symetrie_axe"],
          reponses: [{ attendu: ["2", "le trait 2", "deux"] }],
        },
        {
          enonce: "Je plie le rectangle ABCD le long du trait rouge.\na) Sur quel point tombe A ?\nb) Sur quel point tombe D ?",
          figure: dessin({
            l: 10,
            h: 6,
            max: "max-w-[15rem] print:max-w-[10rem]",
            label: "Un rectangle ABCD et un trait rouge debout en son milieu",
            formes: [
              { t: "poly", pts: [[1, 1], [9, 1], [9, 5], [1, 5]], c: BLEU, fill: BLEU_CLAIR, w: 2.5 },
              axe([5, 0.3], [5, 5.7]),
              pt([1, 1], "A", "hg"),
              pt([9, 1], "B", "hd"),
              pt([9, 5], "C", "bd"),
              pt([1, 5], "D", "bg"),
            ],
          }),
          correction:
            "Le trait est debout, au milieu : en pliant, la gauche vient sur la droite. Le haut reste en haut.\na) A est en haut à gauche. Il tombe en haut à droite : sur B.\nb) D est en bas à gauche. Il tombe en bas à droite : sur C.\n⛔ Le piège : faire tomber A sur D. A et D sont du même côté du trait : le pli ne les rapproche pas.\nRéponse : a) B ; b) C.",
          micros: ["ce2_symetrie_axe"],
          reponses: [
            { question: "a)", attendu: ["B", "sur B", "le point B"] },
            { question: "b)", attendu: ["C", "sur C", "le point C"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je repère l'axe, puis je fais chaque morceau, un par un.",
      rappel: [
        "Le symétrique est à la même distance de l'axe, de l'autre côté.",
        "Une figure symétrique a deux moitiés pareilles : je compte une moitié, puis je double.",
        "La distance entre un point et son symétrique : 2 fois la distance à l'axe.",
      ],
      exercices: [
        {
          titre: "Le papillon de l'artiste",
          enonce: "Une artiste peint 3 taches bleues et 2 taches rouges sur la moitié gauche d'une feuille. Elle plie la feuille, la peinture encore fraîche.\na) Combien de taches y a-t-il sur la feuille dépliée ?\nb) Combien de taches rouges ?",
          figure: dessin({
            l: 10,
            h: 7,
            max: "max-w-[14rem] print:max-w-[10rem]",
            label: "La moitié gauche d'un papillon peint, et le pli au milieu",
            formes: [
              { t: "ellipse", en: [3, 2.4], rx: 2, ry: 1.7, c: VIOLET, fill: "#f5f3ff" },
              { t: "ellipse", en: [3.4, 5], rx: 1.6, ry: 1.3, c: VIOLET, fill: "#f5f3ff" },
              { t: "cercle", en: [2.2, 2], r: 0.45, c: BLEU, fill: BLEU },
              { t: "cercle", en: [3.6, 2.9], r: 0.4, c: BLEU, fill: BLEU },
              { t: "cercle", en: [3.4, 5.2], r: 0.4, c: BLEU, fill: BLEU },
              { t: "cercle", en: [3.8, 1.5], r: 0.35, c: ROUGE, fill: ROUGE },
              { t: "cercle", en: [2.6, 5], r: 0.35, c: ROUGE, fill: ROUGE },
              axe([5, 0.2], [5, 6.8]),
            ],
          }),
          correction:
            "En pliant, chaque tache se recopie de l'autre côté du pli, à la même distance.\nÀ gauche : 3 taches bleues + 2 taches rouges = 5 taches.\na) À droite, 5 taches de plus. 5 + 5 = 10 taches.\nb) 2 taches rouges à gauche, et leurs 2 symétriques à droite : 2 + 2 = 4.\n⛔ Le piège : répondre 5. Les 5 taches peintes restent à gauche : le pli en ajoute 5 autres.\nRéponse : a) 10 ; b) 4.",
          micros: ["ce2_symetrie_completer", "ce2_symetrie_defi"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "La frise de la carreleuse",
          enonce: "Une carreleuse pose des carreaux de couleur à gauche de l'axe. La frise doit être symétrique.\na) Combien de carreaux de couleur y aura-t-il en tout ?\nb) Quelle case est le symétrique de C3 ?\nc) Quelle case est le symétrique de A1 ?",
          figure: quadrillage(8, 3, { axe: { apresColonne: 4 }, couleurs: peint(["A1", "B1", "B2", "C3", "D2"], ORANGE_Q), max: "max-w-[20rem] print:max-w-[14rem]" }),
          schema: ecranSeulement(
            quadrillage(8, 3, { axe: { apresColonne: 4 }, couleurs: [...peint(["A1", "B1", "B2", "C3", "D2"], ORANGE_Q), ...peint(["H1", "G1", "G2", "F3", "E2"], BLEU_Q)], max: "max-w-[20rem]" }),
          ),
          correction:
            "a) À gauche, je compte 5 carreaux. Chacun aura son symétrique à droite : 5 de plus.\n5 + 5 = 10 carreaux de couleur.\nb) C3 : de C à l'axe, 2 colonnes (C, D). À droite : E, F. Même ligne : F3.\nc) A1 : A, B, C, D, 4 colonnes. À droite : E, F, G, H. C'est H1.\n⛔ Le piège : compter seulement les carreaux déjà posés. La frise finie a les deux moitiés.\nRéponse : a) 10 ; b) F3 ; c) H1.",
          micros: ["ce2_symetrie_completer", "ce2_symetrie_construire", "ce2_symetrie_defi"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["F3", "la case F3"] },
            { question: "c)", attendu: ["H1", "la case H1"] },
          ],
        },
        {
          titre: "La façade de la case créole",
          enonce: "Un charpentier construit la façade d'une case créole. La façade est symétrique : l'axe passe au milieu de la porte.\na) La fenêtre de gauche est à 3 m de l'axe. À combien de mètres est celle de droite ?\nb) Combien de mètres entre les deux fenêtres ?\nc) La façade mesure 12 m de large. Combien de mètres de l'axe au bord droit ?",
          figure: dessin({
            l: 14,
            h: 8,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "La façade d'une case créole : un toit, une porte au milieu, une fenêtre à gauche",
            formes: [
              { t: "poly", pts: [[1, 3], [13, 3], [13, 7.5], [1, 7.5]], c: "#92400e", fill: "#fef3c7", w: 2.5 },
              { t: "poly", pts: [[0.4, 3], [7, 0.4], [13.6, 3]], c: ROUGE, fill: "#fecaca", w: 2.5 },
              { t: "poly", pts: [[6, 4.5], [8, 4.5], [8, 7.5], [6, 7.5]], c: "#92400e", fill: "#d97706", w: 2 },
              { t: "poly", pts: [[3.3, 4.5], [4.7, 4.5], [4.7, 6], [3.3, 6]], c: "#0369a1", fill: "#bae6fd", w: 2 },
              axe([7, 0.1], [7, 7.9]),
              { t: "seg", de: [4, 6.6], vers: [7, 6.6], c: VIOLET, w: 2 },
              { t: "texte", en: [5.5, 7], txt: "3 m", c: VIOLET, taille: 13 },
            ],
          }),
          correction:
            "a) Le symétrique est à la même distance de l'axe : la fenêtre de droite est aussi à 3 m.\nb) De la fenêtre de gauche à l'axe : 3 m. De l'axe à la fenêtre de droite : 3 m. 3 + 3 = 6 m.\nc) L'axe coupe la façade en deux moitiés pareilles. La moitié de 12 m : 6 + 6 = 12. Donc 6 m.\n⛔ Le piège du c) : répondre 12 m. 12 m, c'est toute la façade, d'un bord à l'autre.\nRéponse : a) 3 ; b) 6 ; c) 6.",
          micros: ["ce2_symetrie_construire", "ce2_symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "3", unite: "m" },
            { question: "b)", attendu: "6", unite: "m" },
            { question: "c)", attendu: "6", unite: "m" },
          ],
        },
        {
          titre: "Les rosiers du jardinier",
          enonce: "Un jardinier plante des rosiers des deux côtés d'une allée droite. Les deux côtés sont symétriques par rapport à l'allée.\nÀ gauche, les rosiers sont à 2 m, 5 m et 8 m de l'allée.\na) Combien de rosiers en tout ?\nb) Le symétrique du rosier à 5 m est à combien de mètres de l'allée ?\nc) Combien de mètres entre les deux rosiers les plus loin de l'allée ?",
          figure: dessin({
            l: 13,
            h: 4,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Une allée droite et trois rosiers à gauche, à 2 m, 5 m et 8 m",
            formes: [
              { t: "poly", pts: [[9.3, 0.2], [9.7, 0.2], [9.7, 3.8], [9.3, 3.8]], c: "#a8a29e", fill: "#e7e5e4" },
              axe([9.5, 0.2], [9.5, 3.8]),
              { t: "seg", de: [1, 2], vers: [9.3, 2], c: "#94a3b8", w: 1.5 },
              { t: "cercle", en: [7.5, 2], r: 0.35, c: ROUGE, fill: "#fecdd3" },
              { t: "cercle", en: [4.5, 2], r: 0.35, c: ROUGE, fill: "#fecdd3" },
              { t: "cercle", en: [1.5, 2], r: 0.35, c: ROUGE, fill: "#fecdd3" },
              { t: "texte", en: [7.5, 1.1], txt: "2 m", taille: 12 },
              { t: "texte", en: [4.5, 1.1], txt: "5 m", taille: 12 },
              { t: "texte", en: [1.5, 1.1], txt: "8 m", taille: 12 },
              { t: "texte", en: [11.3, 2], txt: "allée", c: "#57534e", taille: 13 },
            ],
          }),
          correction:
            "a) 3 rosiers à gauche, et 3 symétriques à droite : 3 + 3 = 6 rosiers.\nb) Le symétrique est à la même distance de l'allée, de l'autre côté : 5 m.\nc) Les plus loin sont à 8 m, un de chaque côté. 8 + 8 = 16 m.\n⛔ Le piège du c) : répondre 8 m. 8 m, c'est la distance d'un seul rosier à l'allée.\nRéponse : a) 6 ; b) 5 ; c) 16.",
          micros: ["ce2_symetrie_construire", "ce2_symetrie_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: "5", unite: "m" },
            { question: "c)", attendu: "16", unite: "m" },
          ],
        },
      ],
    },
  ],
};
