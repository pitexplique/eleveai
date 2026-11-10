// ─── Fiche d'exercices : la symétrie axiale (CM1) — 20 exercices corrigés ──────
//
// 10/11/2026 : feuille interactive de la notion `symetrie` du coach CM1 (5
// micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Chaque exercice a son champ `reponses`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/symetrie.bank.ts`
// et la carte mentale `cm1/symetrie` : l'axe (on plie, les deux moitiés se
// recouvrent), la même distance de part et d'autre, la symétrie garde les
// longueurs et les angles, plier dans sa tête dans chaque sens.
// ⛔ CM1 : AUCUNE construction à rendre. « Compléter » et « construire »
// deviennent une lecture sur quadrillage : quelle case, quel point, combien de
// carreaux, combien de cases. Axes verticaux ou horizontaux seulement.
//
// Les pièges nommés : la diagonale du rectangle (1, 2), la lettre N (3),
// compter depuis le mauvais bord (4, 10), la distance de M à M' (5), « la
// symétrie agrandit » (6, 14, 16), le T et le F (7), descendre trop bas (8),
// oublier la moitié déjà là (9), le reflet plus petit (11), le parallélogramme
// (12), recopier sans retourner (13), un seul trou (15), la porte comptée deux
// fois (17), un seul axe sur deux (18), le drapeau français (19), les rosiers
// sur l'axe (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bataille navale (10), photographie de
// nature (11), graphisme (13), pliage et découpage (15), architecture (17,
// une case créole : le SEUL contexte réunionnais de la feuille), carrelage
// (18), couture de drapeaux (19), jardin à la française (20).
// Métiers : photographe (11), graphiste (13), architecte (17), carreleur (18),
// couturière (19), paysagiste (20).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 19 — le drapeau français : trois bandes verticales, bleu, blanc,
//     rouge (Constitution de 1958, art. 2) ; le drapeau japonais : un disque
//     rouge AU CENTRE d'un fond blanc (loi sur le drapeau et l'hymne national,
//     1999) ; le drapeau suisse : CARRÉ, rouge, avec une croix blanche au
//     centre (loi fédérale sur la protection des armoiries, 2013).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessins-geometrie-cm1.tsx` (repère en carreaux, y vers le
// bas). L'axe est toujours en pointillés rouges.
//
// Micro-compétences : symetrie_axe (1, 2, 3, 7, 12, 19), symetrie_completer
// (4, 9, 10, 13, 17, 18, 20), symetrie_construire (5, 8, 10, 11, 14),
// symetrie_propriete (6, 11, 14, 16), symetrie_defi (15, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, cases, dessin, ecranSeulement, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

/** L'axe de symétrie : un trait rouge en pointillés. */
const axe = (de: P, vers: P): Forme => ({ t: "seg", de, vers, c: ROUGE, pt: true, w: 2.5 });

/** Un damier de bataille navale : colonnes A à H, lignes 1 à 6. */
const damier = (): Forme[] => {
  const f: Forme[] = [];
  for (let x = 1; x <= 8; x++) for (let y = 1; y <= 6; y++) f.push({ t: "case", x, y, fill: "white", bord: "#94a3b8" });
  "ABCDEFGH".split("").forEach((l, i) => f.push({ t: "texte", en: [i + 1.5, 0.45], txt: l }));
  for (let y = 1; y <= 6; y++) f.push({ t: "texte", en: [0.45, y + 0.5], txt: String(y) });
  return f;
};

export const exercicesSymetrieCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "symetrie",
  titre: "La symétrie axiale",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un axe de symétrie : on plie, les deux moitiés se recouvrent. Compter les axes d'une figure. Trouver le symétrique d'une case ou d'un point sur un quadrillage. Savoir que la symétrie garde les longueurs. Une bataille navale, un reflet dans un lac, un logo, une case créole, un carrelage, des drapeaux et un jardin. Un rappel de cours avant chaque niveau. Cherche d'abord sur le dessin, en comptant les carreaux. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je plie la figure dans ma tête, le long de l'axe.",
      rappel: [
        "Un axe de symétrie : je plie sur cette ligne, les deux moitiés se recouvrent exactement.",
        "Le symétrique d'un point est de l'autre côté de l'axe, à la même distance.",
        "Sur un quadrillage, je compte les carreaux jusqu'à l'axe, puis autant de l'autre côté.",
        "La symétrie ne change pas la taille : les longueurs restent les mêmes.",
      ],
      exercices: [
        {
          enonce: "Dans quelle figure la ligne rouge est-elle un axe de symétrie ?\nA) le rectangle coupé par sa diagonale\nB) le rectangle coupé par un trait vertical\nC) le triangle coupé par un trait vertical",
          figure: dessin({
            l: 15,
            h: 6,
            label: "Trois figures coupées par une ligne rouge en pointillés : A, B et C",
            formes: [
              { t: "poly", pts: [[0.5, 1.5], [4.5, 1.5], [4.5, 4.5], [0.5, 4.5]], c: BLEU, fill: BLEU_CLAIR },
              axe([0.5, 1.5], [4.5, 4.5]),
              { t: "texte", en: [2.5, 5.4], txt: "A" },
              { t: "poly", pts: [[5.5, 1.5], [9.5, 1.5], [9.5, 4.5], [5.5, 4.5]], c: BLEU, fill: BLEU_CLAIR },
              axe([6.4, 0.8], [6.4, 5]),
              { t: "texte", en: [7.5, 5.4], txt: "B" },
              { t: "poly", pts: [[10.5, 4.5], [14.5, 4.5], [12.5, 1]], c: BLEU, fill: BLEU_CLAIR },
              axe([12.5, 0.4], [12.5, 5]),
              { t: "texte", en: [12.5, 5.4], txt: "C" },
            ],
          }),
          correction:
            "Je plie chaque figure dans ma tête, le long de la ligne rouge.\nA) Je plie le rectangle sur sa diagonale. Les coins ne tombent pas l'un sur l'autre : ce n'est pas un axe.\nB) Le trait n'est pas au milieu : un morceau est plus large que l'autre. Ce n'est pas un axe.\nC) Le trait part de la pointe et passe au milieu de la base. Les deux moitiés du triangle se recouvrent : c'est un axe.\n⛔ Le piège : A. La diagonale coupe le rectangle en deux parts de même taille… mais elles ne se recouvrent pas quand on plie.\nRéponse : C.",
          reponses: [{ attendu: ["C", "le triangle", "c) le triangle coupé par un trait vertical"] }],
          micros: ["symetrie_axe"],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque figure ?\na) le carré\nb) le rectangle\nc) le triangle aux trois côtés égaux",
          figure: dessin({
            l: 15,
            h: 5.2,
            label: "Un carré, un rectangle et un triangle aux trois côtés égaux",
            formes: [
              { t: "poly", pts: [[0.5, 1], [3.5, 1], [3.5, 4], [0.5, 4]], c: BLEU, fill: BLEU_CLAIR },
              { t: "droit", en: [0.5, 1], u: [1, 0], v: [0, 1] },
              { t: "code", de: [0.5, 1], vers: [3.5, 1], n: 1 },
              { t: "code", de: [3.5, 1], vers: [3.5, 4], n: 1 },
              { t: "code", de: [3.5, 4], vers: [0.5, 4], n: 1 },
              { t: "code", de: [0.5, 4], vers: [0.5, 1], n: 1 },
              { t: "texte", en: [2, 4.7], txt: "a)" },
              { t: "poly", pts: [[5, 1.5], [10, 1.5], [10, 3.5], [5, 3.5]], c: VERT, fill: VERT_CLAIR },
              { t: "droit", en: [5, 1.5], u: [1, 0], v: [0, 1] },
              { t: "texte", en: [7.5, 4.7], txt: "b)" },
              { t: "poly", pts: [[11, 4], [14, 4], [12.5, 1.402]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "code", de: [11, 4], vers: [14, 4], n: 2 },
              { t: "code", de: [14, 4], vers: [12.5, 1.402], n: 2 },
              { t: "code", de: [12.5, 1.402], vers: [11, 4], n: 2 },
              { t: "texte", en: [12.5, 4.7], txt: "c)" },
            ],
          }),
          correction:
            "Je plie chaque figure dans tous les sens possibles.\na) Le carré : je plie de haut en bas, puis de gauche à droite. Puis sur chaque diagonale : les côtés sont égaux, donc les coins se recouvrent. 2 + 2 = 4 axes.\nb) Le rectangle : de haut en bas, puis de gauche à droite. Sur la diagonale, les coins ne se recouvrent pas. 2 axes.\nc) Le triangle aux trois côtés égaux : de chaque pointe jusqu'au milieu du côté d'en face. 3 axes.\n⛔ Le piège : donner 4 axes au rectangle. Ses diagonales ne sont pas des axes : il n'a que 2 axes.\nRéponse : a) 4 ; b) 2 ; c) 3.",
          schema: ecranSeulement(
            dessin({
              l: 15,
              h: 5.2,
              label: "Les axes du carré, du rectangle et du triangle",
              formes: [
                { t: "poly", pts: [[0.5, 1], [3.5, 1], [3.5, 4], [0.5, 4]], c: BLEU, fill: BLEU_CLAIR },
                axe([2, 0.4], [2, 4.6]),
                axe([-0.1, 2.5], [4.1, 2.5]),
                axe([0.5, 1], [3.5, 4]),
                axe([3.5, 1], [0.5, 4]),
                { t: "poly", pts: [[5, 1.5], [10, 1.5], [10, 3.5], [5, 3.5]], c: VERT, fill: VERT_CLAIR },
                axe([7.5, 0.8], [7.5, 4.2]),
                axe([4.4, 2.5], [10.6, 2.5]),
                { t: "poly", pts: [[11, 4], [14, 4], [12.5, 1.402]], c: ORANGE, fill: ORANGE_CLAIR },
                axe([12.5, 1.402], [12.5, 4]),
                axe([11, 4], [13.25, 2.701]),
                axe([14, 4], [11.75, 2.701]),
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["3", "trois"] },
          ],
          micros: ["symetrie_axe"],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque lettre ?\na) la lettre H\nb) la lettre A\nc) la lettre N",
          figure: dessin({
            l: 12,
            h: 5.4,
            label: "Les lettres H, A et N",
            formes: [
              { t: "seg", de: [1, 1], vers: [1, 4], w: 6 },
              { t: "seg", de: [3, 1], vers: [3, 4], w: 6 },
              { t: "seg", de: [1, 2.5], vers: [3, 2.5], w: 6 },
              { t: "texte", en: [2, 4.9], txt: "a)" },
              { t: "poly", pts: [[5, 4], [6, 1], [7, 4]], ouvert: true, w: 6 },
              { t: "seg", de: [5.4, 2.8], vers: [6.6, 2.8], w: 6 },
              { t: "texte", en: [6, 4.9], txt: "b)" },
              { t: "poly", pts: [[9, 4], [9, 1], [11, 4], [11, 1]], ouvert: true, w: 6 },
              { t: "texte", en: [10, 4.9], txt: "c)" },
            ],
          }),
          correction:
            "Je plie chaque lettre dans ma tête : de haut en bas, puis de gauche à droite.\na) H : la moitié gauche recouvre la droite. La moitié du haut recouvre celle du bas. 2 axes.\nb) A : la moitié gauche recouvre la droite. Mais la pointe du haut ne tombe pas sur le bas. 1 axe.\nc) N : pliée de gauche à droite, le trait penché part dans l'autre sens. Pliée de haut en bas, pareil. 0 axe.\n⛔ Le piège : donner un axe au N parce qu'il « a l'air équilibré ». Pliée, aucune moitié ne recouvre l'autre : 0.\nRéponse : a) 2 ; b) 1 ; c) 0.",
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: ["0", "zéro", "aucun", "aucun axe"] },
          ],
          micros: ["symetrie_axe"],
        },
        {
          enonce: "La ligne rouge est l'axe de symétrie.\nQuelle case est le symétrique de la case bleue : A, B ou C ?",
          figure: dessin({
            l: 10,
            h: 5,
            grille: true,
            label: "Un quadrillage avec un axe vertical, une case bleue à gauche et trois cases A, B, C à droite",
            formes: [
              { t: "case", x: 2, y: 2, fill: BLEU },
              { t: "case", x: 7, y: 2, fill: ORANGE_CLAIR },
              { t: "case", x: 6, y: 2, fill: ORANGE_CLAIR },
              { t: "case", x: 8, y: 2, fill: ORANGE_CLAIR },
              { t: "texte", en: [7.5, 2.5], txt: "A" },
              { t: "texte", en: [6.5, 2.5], txt: "B" },
              { t: "texte", en: [8.5, 2.5], txt: "C" },
              axe([5, 0], [5, 5]),
            ],
          }),
          correction:
            "Je compte les carreaux entre la case bleue et l'axe.\nÀ droite de la case bleue, il y a 2 carreaux vides avant l'axe.\nDe l'autre côté, je laisse aussi 2 carreaux vides après l'axe. La case suivante est la case A.\nJe vérifie en pliant : la case bleue tombe juste sur A.\n⛔ Le piège : choisir B, la case qui « touche presque » l'axe. Il faut le même écart des deux côtés : 2 carreaux.\nRéponse : A.",
          reponses: [{ attendu: ["A", "la case A", "case A"] }],
          micros: ["symetrie_completer"],
        },
        {
          enonce: "M est à 3 carreaux à gauche de l'axe rouge. M' est son symétrique.\na) M' est à combien de carreaux de l'axe ?\nb) M' est à combien de carreaux de M ?",
          figure: dessin({
            l: 10,
            h: 4,
            grille: true,
            label: "Un point M à gauche d'un axe vertical sur un quadrillage",
            formes: [axe([5, 0], [5, 4]), { t: "point", en: [2, 2], nom: "M", vers: "h", c: BLEU }],
          }),
          correction:
            "a) Le symétrique est de l'autre côté de l'axe, à la même distance. M est à 3 carreaux : M' aussi, à 3 carreaux à droite de l'axe.\nb) De M à l'axe : 3 carreaux. De l'axe à M' : 3 carreaux. En tout : 3 + 3 = 6 carreaux.\n⛔ Le piège : répondre 6 en a). 6 carreaux, c'est la distance de M à M'. Jusqu'à l'axe, M' n'est qu'à 3 carreaux.\nRéponse : a) 3 ; b) 6.",
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 4,
              grille: true,
              label: "Le point M et son symétrique M'",
              formes: [axe([5, 0], [5, 4]), { t: "point", en: [2, 2], nom: "M", vers: "h", c: BLEU }, { t: "point", en: [8, 2], nom: "M'", vers: "h", c: ORANGE }, { t: "seg", de: [2, 2], vers: [8, 2], c: "#94a3b8", pt: true, w: 1.5 }],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
          micros: ["symetrie_construire"],
        },
        {
          enonce: "Une figure et sa figure symétrique.\na) Le segment [AB] mesure 5 cm. Combien mesure son symétrique [A'B'] ?\nb) Vrai ou faux : la symétrie change la forme de la figure.\nc) Vrai ou faux : le symétrique d'un angle droit est un angle droit.",
          correction:
            "La symétrie, c'est un pliage. Quand je plie, rien ne grandit et rien ne rétrécit.\na) [A'B'] recouvre exactement [AB] : il mesure aussi 5 cm.\nb) La figure est retournée, comme dans un miroir. Mais sa forme et sa taille restent les mêmes. Faux.\nc) Les angles se recouvrent aussi : un angle droit reste un angle droit. Vrai.\n⛔ Le piège : a) répondre 10 cm. La symétrie ne double pas les longueurs : 5 cm donne 5 cm.\nRéponse : a) 5 cm ; b) faux ; c) vrai.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
          micros: ["symetrie_propriete"],
        },
        {
          enonce: "Quelle lettre a un axe de symétrie ?\nA) la lettre F   B) la lettre T   C) la lettre L",
          figure: dessin({
            l: 12,
            h: 5.4,
            label: "Les lettres F, T et L",
            formes: [
              { t: "poly", pts: [[1, 4], [1, 1], [3, 1]], ouvert: true, w: 6 },
              { t: "seg", de: [1, 2.5], vers: [2.5, 2.5], w: 6 },
              { t: "texte", en: [2, 4.9], txt: "A" },
              { t: "seg", de: [4.8, 1], vers: [7.2, 1], w: 6 },
              { t: "seg", de: [6, 1], vers: [6, 4], w: 6 },
              { t: "texte", en: [6, 4.9], txt: "B" },
              { t: "poly", pts: [[9, 1], [9, 4], [11, 4]], ouvert: true, w: 6 },
              { t: "texte", en: [10, 4.9], txt: "C" },
            ],
          }),
          correction:
            "Je plie chaque lettre de gauche à droite, puis de haut en bas.\nA) F : ses barres partent toutes à droite. Pliée, la moitié gauche ne recouvre pas la droite. Pas d'axe.\nB) T : je plie au milieu, le long de la barre verticale. Les deux moitiés du chapeau se recouvrent. Un axe.\nC) L : la barre du bas part à droite seulement. Pas d'axe.\n⛔ Le piège : le F. Il ressemble au E, qui a un axe de haut en bas. Mais au F, il manque la barre du bas.\nRéponse : B.",
          reponses: [{ attendu: ["B", "la lettre T", "T", "b) la lettre T"] }],
          micros: ["symetrie_axe"],
        },
        {
          enonce: "L'axe rouge est horizontal. P est au-dessus.\nQuel point est le symétrique de P : E, F ou G ?",
          figure: dessin({
            l: 7,
            h: 7,
            grille: true,
            u: 26,
            label: "Un axe horizontal, un point P au-dessus et trois points E, F, G en dessous",
            formes: [
              axe([0, 3], [7, 3]),
              { t: "point", en: [2, 1], nom: "P", vers: "hd", c: BLEU },
              { t: "point", en: [4, 5], nom: "E", vers: "bd" },
              { t: "point", en: [2, 5], nom: "F", vers: "bd" },
              { t: "point", en: [2, 6], nom: "G", vers: "bd" },
            ],
          }),
          correction:
            "Je descends tout droit depuis P, en comptant les carreaux.\nDe P jusqu'à l'axe : 2 carreaux.\nJe continue de l'autre côté : encore 2 carreaux, tout droit. J'arrive sur F.\nE est décalé à droite : il n'est pas en face de P. G est à 3 carreaux de l'axe : trop loin.\n⛔ Le piège : choisir G. Il est bien en face de P, mais à 3 carreaux de l'axe au lieu de 2.\nRéponse : F.",
          reponses: [{ attendu: ["F", "le point F"] }],
          micros: ["symetrie_construire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je compte les carreaux au crayon, sur le dessin.",
      rappel: [
        "Pour compléter une figure, je prends chaque case et je cherche son image, une par une.",
        "Une case collée à l'axe a son image collée à l'axe, de l'autre côté.",
        "Un point SUR l'axe est son propre symétrique : il ne bouge pas.",
        "La symétrie garde les longueurs, les angles et le périmètre.",
      ],
      exercices: [
        {
          enonce: "Sacha dessine la moitié d'un sapin. La ligne rouge est l'axe.\na) Combien de cases doit-il encore colorier pour finir le sapin ?\nb) Combien de cases aura le sapin entier ?\nc) Le coin A est à 3 carreaux de l'axe. Son symétrique est à combien de carreaux de l'axe ?",
          figure: dessin({
            l: 10,
            h: 6,
            grille: true,
            label: "La moitié gauche d'un sapin en cases vertes, un axe vertical, le coin A",
            formes: [
              ...cases([[4, 1], [3, 2], [4, 2], [2, 3], [3, 3], [4, 3], [4, 4]], VERT, "#166534"),
              axe([5, 0], [5, 6]),
              { t: "point", en: [2, 3], nom: "A", vers: "hg", c: ENCRE },
            ],
          }),
          correction:
            "a) Je compte les cases vertes : 1 en haut, 2, puis 3, puis 1 pour le tronc. 1 + 2 + 3 + 1 = 7 cases.\nChaque case a son image de l'autre côté de l'axe. Il faut donc colorier 7 cases de plus.\nb) Le sapin entier : 7 + 7 = 14 cases.\nc) Le symétrique est à la même distance de l'axe : 3 carreaux, à droite.\n⛔ Le piège : b) répondre 7. Les 7 cases déjà coloriées font partie du sapin : il faut ajouter leurs 7 images.\nRéponse : a) 7 ; b) 14 ; c) 3.",
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 6,
              grille: true,
              label: "Le sapin complété par symétrie",
              formes: [
                ...cases([[4, 1], [3, 2], [4, 2], [2, 3], [3, 3], [4, 3], [4, 4]], VERT, "#166534"),
                ...cases([[5, 1], [6, 2], [5, 2], [7, 3], [6, 3], [5, 3], [5, 4]], VERT_CLAIR, "#166534"),
                axe([5, 0], [5, 6]),
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "14" },
            { question: "c)", attendu: "3" },
          ],
          micros: ["symetrie_completer"],
        },
        {
          enonce: "Aïcha joue à la bataille navale. L'axe rouge passe entre les colonnes D et E.\nDonne le nom de la case symétrique de chaque case.\na) la case bleue B2\nb) la case orange C5\nc) la case verte D1",
          figure: dessin({
            l: 9,
            h: 7,
            label: "Un damier de bataille navale, colonnes A à H, lignes 1 à 6, avec un axe entre D et E",
            formes: [...damier(), { t: "case", x: 2, y: 2, fill: BLEU }, { t: "case", x: 3, y: 5, fill: ORANGE }, { t: "case", x: 4, y: 1, fill: VERT }, axe([5, 0.9], [5, 7])],
          }),
          correction:
            "Je compte les colonnes entre la case et l'axe, puis autant de l'autre côté. La ligne ne change pas.\na) B2 : B est la 3e colonne avant l'axe (D, C, B). La 3e colonne après l'axe (E, F, G) est G. Réponse G2.\nb) C5 : C est la 2e colonne avant l'axe (D, C). La 2e après l'axe (E, F) est F. Réponse F5.\nc) D1 : D touche l'axe. Son image touche l'axe de l'autre côté : E. Réponse E1.\n⛔ Le piège : changer aussi le numéro de ligne. L'axe est vertical : la case glisse à droite, elle ne monte pas et ne descend pas.\nRéponse : a) G2 ; b) F5 ; c) E1.",
          reponses: [
            { question: "a)", attendu: ["G2"] },
            { question: "b)", attendu: ["F5"] },
            { question: "c)", attendu: ["E1"] },
          ],
          micros: ["symetrie_completer", "symetrie_construire"],
        },
        {
          enonce: "Un photographe prend un sapin et une cabane au bord d'un lac. L'eau fait un miroir : la ligne rouge est l'axe.\na) Le haut du sapin est à 3 carreaux au-dessus de l'eau. Son reflet est à combien de carreaux sous l'eau ?\nb) Le reflet du sapin est-il plus petit que le sapin ? Réponds oui ou non.\nc) La cabane fait 2 carreaux de large. Combien de carreaux de large fait son reflet ?",
          figure: dessin({
            l: 8,
            h: 7,
            grille: true,
            label: "Un sapin et une cabane au bord d'un lac, la surface de l'eau est l'axe",
            formes: [
              { t: "case", x: 0, y: 4, l: 8, h: 3, fill: "#e0f2fe" },
              { t: "seg", de: [3, 4], vers: [3, 3], c: "#92400e", w: 4 },
              { t: "poly", pts: [[1.5, 3], [4.5, 3], [3, 1]], c: VERT, fill: VERT_CLAIR },
              { t: "poly", pts: [[5, 4], [7, 4], [7, 2.5], [6, 1.5], [5, 2.5]], c: ORANGE, fill: ORANGE_CLAIR },
              axe([0, 4], [8, 4]),
            ],
          }),
          correction:
            "a) Le reflet est le symétrique par rapport à la surface de l'eau. Le haut du sapin est à 3 carreaux au-dessus : son reflet est à 3 carreaux en dessous.\nb) La symétrie garde les longueurs. Le reflet a la même taille que le sapin : non, il n'est pas plus petit. Il est seulement la tête en bas.\nc) La largeur ne change pas non plus : 2 carreaux.\n⛔ Le piège : b) répondre oui, comme pour un objet au loin. Dans un miroir d'eau calme, le reflet a exactement la taille de l'objet.\nRéponse : a) 3 ; b) non ; c) 2.",
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
          micros: ["symetrie_construire", "symetrie_propriete"],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque figure ?\na) le losange\nb) le parallélogramme\nc) le triangle à deux côtés égaux",
          figure: dessin({
            l: 15,
            h: 6,
            label: "Un losange, un parallélogramme et un triangle à deux côtés égaux",
            formes: [
              { t: "poly", pts: [[2.5, 0.6], [4.2, 2.8], [2.5, 5], [0.8, 2.8]], c: BLEU, fill: BLEU_CLAIR },
              { t: "code", de: [2.5, 0.6], vers: [4.2, 2.8], n: 1 },
              { t: "code", de: [4.2, 2.8], vers: [2.5, 5], n: 1 },
              { t: "code", de: [2.5, 5], vers: [0.8, 2.8], n: 1 },
              { t: "code", de: [0.8, 2.8], vers: [2.5, 0.6], n: 1 },
              { t: "texte", en: [2.5, 5.6], txt: "a)" },
              { t: "poly", pts: [[5.5, 4.5], [8.5, 4.5], [10, 1.5], [7, 1.5]], c: VERT, fill: VERT_CLAIR },
              { t: "texte", en: [7.75, 5.6], txt: "b)" },
              { t: "poly", pts: [[11, 4.5], [14, 4.5], [12.5, 1]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "code", de: [11, 4.5], vers: [12.5, 1], n: 2 },
              { t: "code", de: [14, 4.5], vers: [12.5, 1], n: 2 },
              { t: "texte", en: [12.5, 5.6], txt: "c)" },
            ],
          }),
          correction:
            "Je plie chaque figure dans tous les sens, y compris sur les diagonales.\na) Le losange : je plie sur chaque diagonale, ses 4 côtés égaux se recouvrent. Mais pas de haut en bas au milieu des côtés. 2 axes.\nb) Le parallélogramme : de haut en bas, il penche ; de gauche à droite aussi ; sur ses diagonales, les coins ne se recouvrent pas. 0 axe.\nc) Le triangle à deux côtés égaux : je plie de la pointe au milieu de la base. 1 axe.\n⛔ Le piège : b). Le parallélogramme a deux moitiés pareilles, mais il faut les TOURNER pour les superposer. Pliées, elles ne se recouvrent pas : 0 axe.\nRéponse : a) 2 ; b) 0 ; c) 1.",
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["0", "zéro", "aucun", "aucun axe"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
          micros: ["symetrie_axe"],
        },
        {
          enonce: "Une graphiste dessine un logo symétrique. Elle a fait la moitié gauche.\nQuelle moitié droite complète le logo : A, B ou C ?",
          figure: dessin({
            l: 18,
            h: 6,
            grille: true,
            u: 21,
            label: "La moitié gauche d'un logo avec son axe, et trois moitiés droites A, B et C",
            formes: [
              ...cases([[2, 1], [2, 2], [1, 2], [2, 3], [1, 3], [0, 3], [2, 4]], BLEU, ENCRE),
              axe([3, 0.3], [3, 5.2]),
              ...cases([[7, 1], [7, 2], [6, 2], [7, 3], [6, 3], [5, 3], [7, 4]], ORANGE, ENCRE),
              { t: "texte", en: [6.5, 5.6], txt: "A" },
              ...cases([[9, 1], [9, 2], [10, 2], [9, 3], [10, 3], [11, 3], [9, 4]], ORANGE, ENCRE),
              { t: "texte", en: [10.5, 5.6], txt: "B" },
              ...cases([[13, 4], [13, 3], [14, 3], [13, 2], [14, 2], [15, 2], [13, 1]], ORANGE, ENCRE),
              { t: "texte", en: [14.5, 5.6], txt: "C" },
            ],
          }),
          correction:
            "Je cherche l'image de chaque ligne de cases. La ligne garde sa hauteur, mais la gauche et la droite s'échangent.\nLigne 1 : 1 case, collée à l'axe. Son image : 1 case collée à l'axe, de l'autre côté.\nLigne 3 : 3 cases qui s'étirent vers la GAUCHE. Leur image s'étire vers la DROITE.\nJe compare : en A, les cases s'étirent encore vers la gauche. En C, la ligne de 3 cases est montée d'un cran. En B, tout est retourné comme dans un miroir : c'est B.\n⛔ Le piège : choisir A, la moitié simplement recopiée. La symétrie retourne la figure, elle ne la recopie pas.\nRéponse : B.",
          reponses: [{ attendu: ["B", "la moitié B"] }],
          micros: ["symetrie_completer"],
        },
        {
          enonce: "Noé trace le symétrique du segment [AB]. La ligne rouge est l'axe.\na) A' est à combien de carreaux de l'axe ?\nb) B' est à combien de carreaux de l'axe ?\nc) Sur la feuille de Noé, [AB] mesure 3 cm. Combien mesure [A'B'] ?",
          figure: dessin({
            l: 10,
            h: 6,
            grille: true,
            label: "Le segment [AB] à gauche d'un axe vertical",
            formes: [axe([5, 0], [5, 6]), { t: "seg", de: [4, 4], vers: [2, 2], c: BLEU }, { t: "point", en: [4, 4], nom: "A", vers: "bg", c: BLEU }, { t: "point", en: [2, 2], nom: "B", vers: "hg", c: BLEU }],
          }),
          correction:
            "Je compte les carreaux de chaque point jusqu'à l'axe.\na) A est à 1 carreau de l'axe. A' est à 1 carreau, de l'autre côté.\nb) B est à 3 carreaux de l'axe. B' est à 3 carreaux, de l'autre côté.\nc) La symétrie garde les longueurs : [A'B'] mesure 3 cm, comme [AB].\n⛔ Le piège : placer B' à 3 carreaux de A' au lieu de 3 carreaux de l'axe. Je compte toujours à partir de l'axe.\nRéponse : a) 1 ; b) 3 ; c) 3 cm.",
          schema: ecranSeulement(
            dessin({
              l: 10,
              h: 6,
              grille: true,
              label: "Le segment [AB] et son symétrique [A'B']",
              formes: [
                axe([5, 0], [5, 6]),
                { t: "seg", de: [4, 4], vers: [2, 2], c: BLEU },
                { t: "point", en: [4, 4], nom: "A", vers: "bg", c: BLEU },
                { t: "point", en: [2, 2], nom: "B", vers: "hg", c: BLEU },
                { t: "seg", de: [6, 4], vers: [8, 2], c: ORANGE },
                { t: "point", en: [6, 4], nom: "A'", vers: "bd", c: ORANGE },
                { t: "point", en: [8, 2], nom: "B'", vers: "hd", c: ORANGE },
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: "3" },
          ],
          micros: ["symetrie_construire", "symetrie_propriete"],
        },
        {
          enonce: "On plie une feuille, on perce UN trou avec une perforatrice, puis on déplie.\na) La feuille est pliée en 2. Combien de trous vois-tu en dépliant ?\nb) La feuille est pliée en 2, puis encore en 2. Combien de trous en dépliant ?",
          figure: dessin({
            l: 10,
            h: 5,
            label: "a) une feuille pliée en 2 avec un trou ; b) une feuille pliée en 4 avec un trou",
            formes: [
              { t: "poly", pts: [[1, 1], [3.5, 1], [3.5, 4], [1, 4]], fill: "#fefce8" },
              axe([1, 1], [1, 4]),
              { t: "texte", en: [0.5, 2.5], txt: "pli", c: ROUGE, taille: 11 },
              { t: "cercle", en: [2.4, 2.5], r: 0.35, fill: "white" },
              { t: "texte", en: [2.25, 4.6], txt: "a)" },
              { t: "poly", pts: [[6, 1.5], [8.5, 1.5], [8.5, 4], [6, 4]], fill: "#fefce8" },
              axe([6, 1.5], [6, 4]),
              axe([6, 1.5], [8.5, 1.5]),
              { t: "texte", en: [7.25, 0.9], txt: "pli", c: ROUGE, taille: 11 },
              { t: "cercle", en: [7.4, 2.9], r: 0.35, fill: "white" },
              { t: "texte", en: [7.25, 4.6], txt: "b)" },
            ],
          }),
          correction:
            "Chaque pli est un axe de symétrie. Le trou a son symétrique de l'autre côté du pli.\na) Un pli : le trou et son symétrique. 2 trous.\nb) Premier pli : 2 trous. Le deuxième pli double encore : 2 × 2 = 4 trous.\nJe vérifie : la feuille pliée en 4 a 4 épaisseurs. La perforatrice traverse les 4 : 4 trous.\n⛔ Le piège : répondre 1 trou en a). La perforatrice traverse les 2 épaisseurs de papier à la fois.\nRéponse : a) 2 ; b) 4.",
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
          micros: ["symetrie_defi", "symetrie_axe"],
        },
        {
          enonce: "Un triangle a des côtés de 3 cm, 4 cm et 5 cm. Il a un angle droit.\nOn trace son symétrique par rapport à une droite.\na) Quel est le périmètre du triangle symétrique, en cm ?\nb) Combien d'angles droits a le triangle symétrique ?",
          correction:
            "La symétrie garde les longueurs et les angles.\na) Le triangle symétrique a les mêmes côtés : 3 cm, 4 cm et 5 cm.\nSon périmètre : 3 + 4 + 5 = 12 cm.\nb) L'angle droit reste un angle droit : 1 angle droit.\n⛔ Le piège : a) doubler, 24 cm. Le symétrique est UN autre triangle, de la même taille : on ne les additionne pas.\nRéponse : a) 12 cm ; b) 1.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: ["1", "un"] },
          ],
          micros: ["symetrie_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout, je plie la figure dans ma tête, puis je réponds question par question.",
      rappel: [
        "Ce qui est SUR l'axe ne se double pas : il est son propre symétrique.",
        "Avec deux axes, je fais la première symétrie, puis la deuxième sur le résultat.",
        "Pour compter les axes, je plie : de haut en bas, de gauche à droite, puis sur les diagonales.",
      ],
      exercices: [
        {
          titre: "La case créole de l'architecte",
          enonce: "Une architecte dessine la façade d'une case créole. La façade est symétrique : la ligne rouge est l'axe.\nElle a dessiné les fenêtres de gauche et la porte.\na) Combien de fenêtres aura la façade finie ?\nb) Combien de portes aura la façade finie ?",
          figure: dessin({
            l: 12,
            h: 7.4,
            u: 22,
            label: "La façade d'une case : trois fenêtres à gauche, une porte au milieu sur l'axe",
            formes: [
              { t: "poly", pts: [[1, 2.3], [11, 2.3], [11, 7], [1, 7]], fill: "#fef9c3" },
              { t: "poly", pts: [[0.4, 2.3], [11.6, 2.3], [6, 0.3]], fill: ORANGE_CLAIR, c: ORANGE },
              { t: "poly", pts: [[1.8, 3], [3, 3], [3, 4.2], [1.8, 4.2]], fill: BLEU_CLAIR, c: BLEU },
              { t: "poly", pts: [[3.7, 3], [4.9, 3], [4.9, 4.2], [3.7, 4.2]], fill: BLEU_CLAIR, c: BLEU },
              { t: "poly", pts: [[1.8, 5], [3, 5], [3, 6.2], [1.8, 6.2]], fill: BLEU_CLAIR, c: BLEU },
              { t: "poly", pts: [[5.2, 4.6], [6.8, 4.6], [6.8, 7], [5.2, 7]], fill: "#d6a36b", c: "#92400e" },
              axe([6, 0], [6, 7.4]),
            ],
          }),
          correction:
            "a) Je compte les fenêtres à gauche de l'axe : 3.\nChaque fenêtre a sa symétrique à droite : 3 de plus. En tout : 3 + 3 = 6 fenêtres.\nb) La porte est au milieu, SUR l'axe. Quand je plie, elle retombe sur elle-même : elle est sa propre symétrique.\nIl n'y a donc qu'une porte : 1.\n⛔ Le piège : b) compter 2 portes. Ce qui est sur l'axe ne se double pas.\nRéponse : a) 6 ; b) 1.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["1", "une"] },
          ],
          micros: ["symetrie_defi", "symetrie_completer"],
        },
        {
          titre: "Le carreleur et ses deux axes",
          enonce: "Un carreleur pose un motif symétrique par rapport aux DEUX lignes rouges.\nIl a posé 3 carreaux bleus dans le coin en haut à gauche.\na) Après la symétrie par la ligne verticale, combien de carreaux bleus y a-t-il ?\nb) Après la symétrie par la ligne horizontale, combien de carreaux bleus en tout ?",
          figure: dessin({
            l: 8,
            h: 8,
            grille: true,
            u: 24,
            max: "max-w-[15rem] print:max-w-[11rem]",
            label: "Un carrelage de 8 sur 8 avec deux axes et trois carreaux bleus en haut à gauche",
            formes: [...cases([[1, 1], [3, 1], [2, 3]], BLEU, ENCRE), axe([4, 0], [4, 8]), axe([0, 4], [8, 4])],
          }),
          correction:
            "a) La ligne verticale donne à chaque carreau un symétrique, en haut à droite.\n3 carreaux + 3 symétriques = 3 × 2 = 6 carreaux.\nb) La ligne horizontale donne à ces 6 carreaux un symétrique, en bas.\n6 carreaux + 6 symétriques = 6 × 2 = 12 carreaux.\nJe vérifie : 3 carreaux dans chacun des 4 coins, 3 × 4 = 12.\n⛔ Le piège : b) faire la symétrie horizontale avec les 3 carreaux du début seulement : 9. Il faut prendre les 6 carreaux déjà posés.\nRéponse : a) 6 ; b) 12.",
          schema: ecranSeulement(
            dessin({
              l: 8,
              h: 8,
              grille: true,
              u: 24,
              max: "max-w-[15rem] print:max-w-[11rem]",
              label: "Le motif complet : 12 carreaux bleus",
              formes: [
                ...cases([[1, 1], [3, 1], [2, 3]], BLEU, ENCRE),
                ...cases([[6, 1], [4, 1], [5, 3]], BLEU_CLAIR, ENCRE),
                ...cases([[1, 6], [3, 6], [2, 4], [6, 6], [4, 6], [5, 4]], BLEU_CLAIR, ENCRE),
                axe([4, 0], [4, 8]),
                axe([0, 4], [8, 4]),
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "12" },
          ],
          micros: ["symetrie_defi", "symetrie_completer"],
        },
        {
          titre: "Les drapeaux de la couturière",
          enonce: "Une couturière coud des drapeaux. Combien d'axes de symétrie a chaque drapeau ?\na) le drapeau de la France\nb) le drapeau du Japon\nc) le drapeau de la Suisse (il est carré)",
          figure: dessin({
            l: 13,
            h: 4,
            u: 26,
            label: "Les drapeaux de la France, du Japon et de la Suisse",
            formes: [
              { t: "case", x: 0.3, y: 0.5, l: 1, h: 2, fill: "#1d4ed8" },
              { t: "case", x: 1.3, y: 0.5, l: 1, h: 2, fill: "white" },
              { t: "case", x: 2.3, y: 0.5, l: 1, h: 2, fill: "#dc2626" },
              { t: "poly", pts: [[0.3, 0.5], [3.3, 0.5], [3.3, 2.5], [0.3, 2.5]], w: 1.2 },
              { t: "texte", en: [1.8, 3.3], txt: "a) France", taille: 13 },
              { t: "case", x: 4.8, y: 0.5, l: 3, h: 2, fill: "white" },
              { t: "cercle", en: [6.3, 1.5], r: 0.6, fill: "#dc2626", c: "#dc2626" },
              { t: "poly", pts: [[4.8, 0.5], [7.8, 0.5], [7.8, 2.5], [4.8, 2.5]], w: 1.2 },
              { t: "texte", en: [6.3, 3.3], txt: "b) Japon", taille: 13 },
              { t: "case", x: 9.8, y: 0.5, l: 2, h: 2, fill: "#dc2626" },
              { t: "case", x: 10.6, y: 0.9, l: 0.4, h: 1.2, fill: "white" },
              { t: "case", x: 10.2, y: 1.3, l: 1.2, h: 0.4, fill: "white" },
              { t: "poly", pts: [[9.8, 0.5], [11.8, 0.5], [11.8, 2.5], [9.8, 2.5]], w: 1.2 },
              { t: "texte", en: [10.8, 3.3], txt: "c) Suisse", taille: 13 },
            ],
          }),
          correction:
            "Je plie chaque drapeau dans ma tête, et je regarde aussi les COULEURS : elles doivent se recouvrir.\na) France : pliée de gauche à droite, le bleu tombe sur le rouge. Pas d'axe. Pliée de haut en bas, chaque bande retombe sur elle-même. 1 axe.\nb) Japon : le disque rouge est au centre. De gauche à droite : oui. De haut en bas : oui. Sur une diagonale : non, le drapeau n'est pas carré. 2 axes.\nc) Suisse : le drapeau est carré et la croix est au centre. De haut en bas, de gauche à droite, et sur les 2 diagonales : 4 axes.\n⛔ Le piège : a) donner 2 axes au drapeau français, « comme un rectangle ». Les couleurs comptent : le bleu ne recouvre pas le rouge.\nRéponse : a) 1 ; b) 2 ; c) 4.",
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
          micros: ["symetrie_defi", "symetrie_axe"],
        },
        {
          titre: "Les rosiers du paysagiste",
          enonce: "Un paysagiste plante des rosiers dans un jardin symétrique. La ligne rouge est l'allée du milieu, l'axe.\nIl a planté les rosiers à gauche et sur l'allée.\na) Combien de rosiers doit-il encore planter à droite ?\nb) Combien de rosiers y aura-t-il en tout ?",
          figure: dessin({
            l: 10,
            h: 6,
            grille: true,
            label: "Un jardin : cinq rosiers à gauche de l'axe et deux rosiers sur l'axe",
            formes: [
              axe([5, 0], [5, 6]),
              ...([[1, 1], [2, 3], [3, 5], [4, 2], [1, 4], [5, 1], [5, 4]] as P[]).map((en) => ({ t: "point" as const, en, c: "#db2777", rond: true })),
            ],
          }),
          correction:
            "Je sépare les rosiers en deux groupes.\nÀ gauche de l'allée : je compte 5 rosiers. Chacun a son symétrique à droite.\na) Il doit planter 5 rosiers à droite.\nSur l'allée : 2 rosiers. Ils sont sur l'axe : ils sont leurs propres symétriques. Rien à ajouter pour eux.\nb) En tout : 5 à gauche + 2 sur l'allée + 5 à droite = 12 rosiers.\n⛔ Le piège : doubler les 7 rosiers, 14. Les 2 rosiers de l'allée ne se doublent pas.\nRéponse : a) 5 ; b) 12.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: "12" },
          ],
          micros: ["symetrie_defi", "symetrie_completer"],
        },
      ],
    },
  ],
};
