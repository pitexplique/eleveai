// ─── Fiche d'exercices : les fractions inférieures ou égales à 1 (CE2) ────────
//
// 17/11/2026 : la feuille interactive de la notion `fraction` du coach CE2
// (« Fractions inférieures ou égales à 1 », 10 micros). Sur la forme des
// feuilles du CM1 et du CE1 (`maths-cm1-masse.tsx`, `maths-ce1-fraction.tsx`) :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/ce2/maths/fraction.bank.ts`) : l'unité
// partagée en parts égales, lire et représenter, l'ÉGALITÉ de fractions,
// additionner et soustraire (même dénominateur, ou l'un multiple de l'autre :
// 1/2 + 1/4), la bande unité, la droite graduée de 0 à 1, comparer deux
// fractions (même dénominateur, même numérateur, dénominateur multiple),
// comparer à 1, la fraction d'une quantité (le quart de 12 billes).
// ⛔ LIMITES DU CE2 : dénominateur 12 au plus, fractions inférieures ou
// égales à 1, pas de dénominateurs sans rapport (1/3 + 1/4), pas de
// simplification demandée. ⛔ Aucun piège hors CE2 dans les QCM (pas de 8/5,
// pas de 1/100), et jamais deux choix de même valeur (2/4 et 1/2).
// ⛔ Aucune question à rédiger : QCM par lettre, signe, vrai ou faux, un
// nombre (le numérateur qui manque, un nombre de parts), un prénom.
// ⛔ 18 mots au plus par phrase.
//
// Les pièges nommés : compter 6 morceaux sans voir qu'ils sont inégaux (1),
// lire les parts blanches (2, 4), écrire « deux tiers » 2/10 (3), 5/5 < 1
// (5), compter les traits au lieu des parts (6, 15), 1/5 < 1/3 parce que
// 5 > 3 (7), ajouter aussi les dénominateurs (8, 11), la même partie
// coloriée vue comme des fractions différentes (9), multiplier en bas
// seulement (10), comparer 7 et 5 sans changer de partage (12), compter
// les traits de la bande (13), donner 4 billes pour un quart (14), la part
// mangée prise pour celle qui reste (16), oublier les fleurs (17), le quart
// de 100 = 4 (18), Hugo devant parce que 5 > 3 (19), oublier une part (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : chocolat (1), tarte (2), carrelage (4),
// randonnée (15), pizza (16), jardin (17), couture (18), course de relais
// (19), anniversaire (20), billes (14). Les métiers : carreleur (4),
// couturière (18), jardinière (17).
// Aucun contexte réunionnais ici (les autres feuilles du lot en ont un).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le disque (camembert) et le rectangle du canvas `fraction`
// du coach (`disque`, `rect`), les barres empilées (`barres`), les billes
// rangées (`jetons`) et la droite graduée de 0 à 1 (`droiteRel`, n'écrit que
// 0 et 1) de `dessins-fractions-cm2.tsx` ; les bandes en parts égales ou non
// (`bandes`, `dessins-ce1-nombres-calcul.tsx`) ; la bande unité et un ruban
// (`bandeUnite`, `dessins-ce2-lotG.tsx`). La fraction cherchée n'est jamais
// écrite sous un dessin.
//
// Micro-compétences (10/10) : ce2_fraction_unite (1, 14, 17),
// ce2_fraction_lire (2, 3), ce2_fraction_representer (4, 14),
// ce2_fraction_egalite (9, 10, 11, 12, 17, 20), ce2_fraction_add_sous (8, 11,
// 16, 18, 20), ce2_fraction_bande_unite (13, 18), ce2_fraction_droite (6, 15,
// 19), ce2_fraction_comparer (7, 12, 16, 19), ce2_fraction_comparer_unite (5,
// 15, 16), ce2_fraction_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, disque, droiteRel, jetons, rect } from "@/lib/fiches-exercices/dessins-fractions-cm2";
import { bandes } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";
import { bandeUnite } from "@/lib/fiches-exercices/dessins-ce2-lotG";

const VRAI = ["vrai", "oui"];

export const exercicesFractionCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "fraction",
  titre: "Les fractions inférieures ou égales à 1",
  accroche:
    "Vingt exercices, du plus facile au défi. Partager l'unité en parts égales. Lire et colorier une fraction. Trouver deux fractions égales. Ajouter des fractions. Placer une fraction sur une droite graduée. Comparer deux fractions, et comparer à 1. Une tarte, des carreaux, une pizza, un jardin, un ruban et un gâteau d'anniversaire. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris la lettre, le signe ou le nombre seul.",
      rappel: [
        "Une fraction, c'est l'unité partagée en parts ÉGALES.",
        "Dans $\\frac{5}{12}$ : l'unité est partagée en 12 parts égales, j'en prends 5.",
        "Quand je prends toutes les parts, j'ai l'unité entière : $\\frac{8}{8} = 1$.",
      ],
      exercices: [
        {
          enonce: "Trois tablettes de chocolat sont coupées en 6 morceaux.\na) Quelle tablette est coupée en 6 parts ÉGALES ?\nb) Une part de cette tablette s'appelle : A) un sixième B) un demi C) un quart",
          figure: bandes([
            { nom: "A", parts: [2, 1, 1, 2, 1, 1], colorie: [0] },
            { nom: "B", parts: [1, 2, 1, 1, 3, 1], colorie: [0] },
            { nom: "C", parts: [1, 1, 1, 1, 1, 1], colorie: [0] },
          ]),
          correction:
            "a) Des parts égales ont toutes la même taille.\nA : le premier morceau est deux fois plus long que le deuxième. Pas égal.\nB : le cinquième morceau est très long. Pas égal.\nC : les 6 morceaux ont la même taille. Égal.\nb) La tablette C est partagée en 6 parts égales. Une part, c'est un sixième : $\\frac{1}{6}$. Réponse A.\n⛔ Le piège : compter 6 morceaux et dire « un sixième » pour A ou B. Il faut aussi que les morceaux soient égaux.\nRéponse : a) C ; b) A.",
          micros: ["ce2_fraction_unite"],
          reponses: [
            { question: "a)", attendu: ["C"] },
            { question: "b)", attendu: ["A", "A) un sixième", "un sixième"] },
          ],
        },
        {
          enonce: "La tarte de Lucie est coupée en parts égales.\na) En combien de parts est-elle coupée ?\nb) Combien de parts sont coloriées ?\nc) Quelle fraction est coloriée ? A) $\\frac{7}{10}$ B) $\\frac{3}{7}$ C) $\\frac{3}{10}$",
          figure: disque(3, 10),
          correction:
            "a) Je compte toutes les parts : 10.\nb) Je compte les parts coloriées : 3.\nc) En bas, le nombre de parts : 10. En haut, les parts prises : 3. C'est $\\frac{3}{10}$. Réponse C.\n⛔ Le piège : choisir $\\frac{7}{10}$. 7, ce sont les parts blanches.\nRéponse : a) 10 ; b) 3 ; c) C.",
          micros: ["ce2_fraction_lire"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["C"] },
          ],
        },
        {
          enonce: "Choisis la bonne écriture. Écris la lettre.\na) Deux tiers : A) $\\frac{1}{3}$ B) $\\frac{2}{3}$ C) $\\frac{2}{6}$\nb) Cinq huitièmes : A) $\\frac{5}{8}$ B) $\\frac{3}{8}$ C) $\\frac{5}{6}$\nc) Un dixième : A) $\\frac{1}{12}$ B) $\\frac{9}{10}$ C) $\\frac{1}{10}$",
          correction:
            "Le premier mot dit combien de parts je prends (en haut). Le deuxième dit le partage (en bas).\na) « Deux tiers » : 2 parts, l'unité partagée en 3. C'est $\\frac{2}{3}$. Réponse B.\nb) « Cinq huitièmes » : 5 parts, partage en 8. C'est $\\frac{5}{8}$. Réponse A.\nc) « Un dixième » : 1 part, partage en 10. C'est $\\frac{1}{10}$. Réponse C.\n⛔ Le piège : lire « tiers » comme 6 ou 10. Tiers, c'est 3 ; quart, 4 ; dixième, 10.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["ce2_fraction_lire"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["A"] },
            { question: "c)", attendu: ["C"] },
          ],
        },
        {
          enonce: "Un carreleur pose une frise de 10 carreaux égaux.\nIl veut $\\frac{7}{10}$ de la frise en bleu.\na) Combien de carreaux bleus pose-t-il ?\nb) Combien de carreaux restent blancs ?\nc) Quelle fraction est blanche ? A) $\\frac{3}{10}$ B) $\\frac{7}{10}$ C) $\\frac{3}{7}$",
          figure: rect(2, 5, 0),
          correction:
            "a) La frise a 10 carreaux égaux : un carreau, c'est $\\frac{1}{10}$.\n$\\frac{7}{10}$, c'est 7 carreaux.\nb) $10 - 7 = 3$ carreaux blancs.\nc) 3 carreaux sur 10 : $\\frac{3}{10}$. Réponse A.\n⛔ Le piège du c) : choisir $\\frac{3}{7}$. En bas, j'écris TOUS les carreaux de la frise : 10.\nRéponse : a) 7 ; b) 3 ; c) A.",
          micros: ["ce2_fraction_representer"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["A"] },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) $\\frac{3}{4}$ … 1\nb) $\\frac{5}{5}$ … 1\nc) 1 … $\\frac{7}{8}$\nd) $\\frac{12}{12}$ … 1",
          correction:
            "Je compare le nombre du haut et le nombre du bas.\na) 3 parts sur 4 : il manque une part pour faire l'unité. $\\frac{3}{4}$ < 1.\nb) 5 parts sur 5 : toutes les parts, l'unité entière. $\\frac{5}{5}$ = 1.\nc) 7 parts sur 8 : il manque une part. Donc 1 > $\\frac{7}{8}$.\nd) 12 parts sur 12 : l'unité entière. $\\frac{12}{12}$ = 1.\n⛔ Le piège : croire $\\frac{5}{5}$ plus petit que 1. Quand le haut et le bas sont égaux, c'est 1.\nRéponse : a) < ; b) = ; c) > ; d) =.",
          micros: ["ce2_fraction_comparer_unite"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: "=" },
          ],
        },
        {
          enonce: "Sur la droite, l'unité de 0 à 1 est partagée en parts égales.\nQuelle fraction est au point A ? A) $\\frac{1}{4}$ B) $\\frac{3}{4}$ C) $\\frac{2}{4}$",
          figure: droiteRel(0, 1, 0.25, [{ value: 0.75, label: "A" }], { nombres: 1 }),
          correction:
            "Je compte les parts entre 0 et 1 : il y a 4 parts égales. Chaque part, c'est $\\frac{1}{4}$.\nDepuis 0, j'avance jusqu'au point A : 1, 2, 3 parts.\nA est à $\\frac{3}{4}$. Réponse B.\n⛔ Le piège : compter les traits (il y en a 5, avec 0 et 1) au lieu des parts (4).\nRéponse : B.",
          micros: ["ce2_fraction_droite"],
          reponses: [{ attendu: ["B"] }],
        },
        {
          enonce: "Écris le signe < ou >.\na) $\\frac{5}{12}$ … $\\frac{7}{12}$\nb) $\\frac{3}{8}$ … $\\frac{1}{8}$\nc) $\\frac{1}{3}$ … $\\frac{1}{5}$\nd) $\\frac{5}{12}$ … $\\frac{5}{8}$",
          correction:
            "a) et b) Le même partage : je compare les parts prises.\na) 5 parts < 7 parts : $\\frac{5}{12}$ < $\\frac{7}{12}$.\nb) 3 parts > 1 part : $\\frac{3}{8}$ > $\\frac{1}{8}$.\nc) et d) Le même nombre de parts prises : je compare la TAILLE des parts.\nc) Partager en 3 donne de plus grosses parts qu'en 5. $\\frac{1}{3}$ > $\\frac{1}{5}$.\nd) Un douzième est plus petit qu'un huitième. 5 petites parts < 5 grosses parts : $\\frac{5}{12}$ < $\\frac{5}{8}$.\n⛔ Le piège du c) : dire $\\frac{1}{5}$ plus grand, parce que 5 > 3. Plus on partage, plus la part est petite.\nRéponse : a) < ; b) > ; c) > ; d) <.",
          micros: ["ce2_fraction_comparer"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: ">" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: "<" },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre du haut.\na) $\\frac{2}{8} + \\frac{3}{8} = \\frac{?}{8}$\nb) $\\frac{6}{10} - \\frac{4}{10} = \\frac{?}{10}$\nc) $\\frac{1}{5} + \\frac{4}{5} = \\frac{?}{5}$",
          correction:
            "Le partage est le même : j'ajoute ou j'enlève des parts, le nombre du bas ne change pas.\na) 2 huitièmes + 3 huitièmes = 5 huitièmes : $\\frac{5}{8}$.\nb) 6 dixièmes − 4 dixièmes = 2 dixièmes : $\\frac{2}{10}$.\nc) 1 cinquième + 4 cinquièmes = 5 cinquièmes : $\\frac{5}{5}$, c'est 1.\n⛔ Le piège : ajouter aussi les nombres du bas, $\\frac{5}{16}$. Les parts restent des huitièmes.\nRéponse : a) 5 ; b) 2 ; c) 5.",
          micros: ["ce2_fraction_add_sous"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je dessine au brouillon si j'hésite.",
      rappel: [
        "Deux fractions sont égales quand elles colorient la même partie de l'unité : $\\frac{1}{2} = \\frac{2}{4}$.",
        "Pour trouver une fraction égale, je multiplie le haut ET le bas par le même nombre.",
        "$\\frac{1}{2} + \\frac{1}{4}$ : j'écris d'abord $\\frac{1}{2} = \\frac{2}{4}$, puis j'ajoute les quarts.",
      ],
      exercices: [
        {
          enonce: "Les trois barres ont la même partie coloriée. A montre $\\frac{1}{2}$.\na) Quelle fraction montre B ? A) $\\frac{1}{4}$ B) $\\frac{2}{4}$ C) $\\frac{3}{4}$\nb) Quelle fraction montre C ? A) $\\frac{4}{8}$ B) $\\frac{1}{8}$ C) $\\frac{6}{8}$\nc) Vrai ou faux : $\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}$.",
          figure: barres([
            { d: 2, label: "A", parts: [1] },
            { d: 4, label: "B", parts: [2] },
            { d: 8, label: "C", parts: [4] },
          ]),
          correction:
            "a) La barre B est partagée en 4 parts égales. 2 sont coloriées : $\\frac{2}{4}$. Réponse B.\nb) La barre C est partagée en 8 parts égales. 4 sont coloriées : $\\frac{4}{8}$. Réponse A.\nc) Les trois barres colorient la même longueur. Ces fractions sont égales. Vrai.\n⛔ Le piège : croire que $\\frac{4}{8}$ est plus grand que $\\frac{1}{2}$, parce que 4 et 8 sont de grands nombres.\nRéponse : a) B ; b) A ; c) vrai.",
          micros: ["ce2_fraction_egalite"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["A"] },
            { question: "c)", attendu: VRAI },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre du haut.\na) $\\frac{1}{2} = \\frac{?}{6}$\nb) $\\frac{1}{3} = \\frac{?}{6}$\nc) $\\frac{3}{4} = \\frac{?}{8}$\nd) $\\frac{2}{5} = \\frac{?}{10}$",
          correction:
            "Je regarde par combien le nombre du bas est multiplié. Je multiplie le haut par le même nombre.\na) 2 → 6 : × 3. Donc $1 \\times 3 = 3$ : $\\frac{1}{2} = \\frac{3}{6}$.\nb) 3 → 6 : × 2. Donc $1 \\times 2 = 2$ : $\\frac{1}{3} = \\frac{2}{6}$.\nc) 4 → 8 : × 2. Donc $3 \\times 2 = 6$ : $\\frac{3}{4} = \\frac{6}{8}$.\nd) 5 → 10 : × 2. Donc $2 \\times 2 = 4$ : $\\frac{2}{5} = \\frac{4}{10}$.\n⛔ Le piège du c) : garder 3 en haut. $\\frac{3}{8}$ est plus petit que $\\frac{3}{4}$ : il faut multiplier le haut aussi.\nRéponse : a) 3 ; b) 2 ; c) 6 ; d) 4.",
          micros: ["ce2_fraction_egalite"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["6", "six"] },
            { question: "d)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Regarde les deux barres : la première montre $\\frac{1}{2}$, la deuxième $\\frac{1}{4}$.\na) $\\frac{1}{2} + \\frac{1}{4}$ = ? A) $\\frac{2}{6}$ B) $\\frac{2}{4}$ C) $\\frac{3}{4}$\nb) $\\frac{1}{3} + \\frac{1}{6} = \\frac{?}{6}$\nc) $\\frac{3}{4} - \\frac{1}{2} = \\frac{?}{4}$",
          figure: barres([
            { d: 4, label: "1/2", parts: [2] },
            { d: 4, label: "1/4", parts: [1] },
          ]),
          correction:
            "J'écris d'abord les deux fractions avec le même partage.\na) $\\frac{1}{2} = \\frac{2}{4}$ (la barre le montre). Puis $\\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$. Réponse C.\nb) $\\frac{1}{3} = \\frac{2}{6}$. Puis $\\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6}$.\nc) $\\frac{1}{2} = \\frac{2}{4}$. Puis $\\frac{3}{4} - \\frac{2}{4} = \\frac{1}{4}$.\n⛔ Le piège du a) : ajouter le haut et le bas, $\\frac{2}{6}$. On ne peut ajouter que des parts de même taille.\nRéponse : a) C ; b) 3 ; c) 1.",
          micros: ["ce2_fraction_add_sous", "ce2_fraction_egalite"],
          reponses: [
            { question: "a)", attendu: ["C"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) $\\frac{7}{12}$ … $\\frac{5}{6}$\nb) $\\frac{3}{4}$ … $\\frac{5}{8}$\nc) $\\frac{1}{2}$ … $\\frac{4}{8}$",
          correction:
            "J'écris les deux fractions avec le même partage, puis je compare les parts.\na) $\\frac{5}{6} = \\frac{10}{12}$ (× 2 en haut et en bas). 7 < 10, donc $\\frac{7}{12}$ < $\\frac{5}{6}$.\nb) $\\frac{3}{4} = \\frac{6}{8}$. 6 > 5, donc $\\frac{3}{4}$ > $\\frac{5}{8}$.\nc) $\\frac{1}{2} = \\frac{4}{8}$. Les deux sont égales.\n⛔ Le piège du a) : comparer 7 et 5 et dire $\\frac{7}{12}$ plus grand. Les parts n'ont pas la même taille.\nRéponse : a) < ; b) > ; c) =.",
          micros: ["ce2_fraction_comparer", "ce2_fraction_egalite"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: ">" },
            { question: "c)", attendu: "=" },
          ],
        },
        {
          enonce: "Le ruban orange est posé sous la bande unité.\na) Le ruban mesure : A) $\\frac{2}{5}$ d'unité B) $\\frac{3}{5}$ d'unité C) $\\frac{3}{4}$ d'unité\nb) Un autre ruban mesure $\\frac{4}{5}$ d'unité. Il est : A) plus court B) plus long C) pareil",
          figure: bandeUnite(5, 3),
          correction:
            "a) La bande unité est partagée en 5 parts égales : chaque part, c'est $\\frac{1}{5}$ d'unité.\nLe ruban couvre 3 parts. Il mesure $\\frac{3}{5}$ d'unité. Réponse B.\nb) $\\frac{4}{5}$, c'est 4 parts : une de plus que 3. L'autre ruban est plus long. Réponse B.\n⛔ Le piège du a) : compter les traits en pointillés (il y en a 6). Je compte les PARTS de la bande.\nRéponse : a) B ; b) B.",
          micros: ["ce2_fraction_bande_unite"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["B", "B) plus long", "plus long"] },
          ],
        },
        {
          enonce: "Lou a 12 billes. Elle donne le quart de ses billes à son frère.\na) Combien de billes donne-t-elle ?\nb) Combien de billes lui reste-t-il ?\nc) Quelle fraction de ses billes lui reste-t-il ? A) $\\frac{3}{4}$ B) $\\frac{1}{4}$ C) $\\frac{2}{4}$",
          figure: jetons(4, 3, []),
          correction:
            "Le quart, c'est partager en 4 parts égales et en prendre une.\na) Les 12 billes en 4 rangées égales : $12 \\div 4 = 3$ billes par rangée. Elle donne 3 billes.\nb) $12 - 3 = 9$ billes.\nc) Il lui reste 3 rangées sur 4 : $\\frac{3}{4}$. Réponse A.\n⛔ Le piège du a) : donner 4 billes, parce que « quart » fait penser à 4. Le 4 dit le partage, pas le nombre de billes.\nRéponse : a) 3 ; b) 9 ; c) A.",
          micros: ["ce2_fraction_unite", "ce2_fraction_representer"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["9", "neuf"] },
            { question: "c)", attendu: ["A"] },
          ],
        },
        {
          enonce: "Le sentier de la randonnée va du départ (0) à l'arrivée (1).\na) Le refuge A est à $\\frac{?}{6}$ du sentier. Écris le nombre du haut.\nb) La cascade B est à $\\frac{?}{6}$ du sentier. Écris le nombre du haut.\nc) Quel point est le plus près de l'arrivée ? Écris la lettre.",
          figure: droiteRel(0, 1, 1 / 6, [
            { value: 2 / 6, label: "A" },
            { value: 5 / 6, label: "B" },
          ], { nombres: 1 }),
          correction:
            "Je compte les parts entre 0 et 1 : 6 parts égales. Chaque part, c'est $\\frac{1}{6}$.\na) De 0 à A, j'avance de 2 parts : $\\frac{2}{6}$.\nb) De 0 à B, j'avance de 5 parts : $\\frac{5}{6}$.\nc) B est à 1 part de l'arrivée, A à 4 parts. B est le plus près.\n⛔ Le piège : compter les traits (avec celui du 0) au lieu des parts. Je compte les SAUTS depuis 0.\nRéponse : a) 2 ; b) 5 ; c) B.",
          micros: ["ce2_fraction_droite", "ce2_fraction_comparer_unite"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["B"] },
          ],
        },
        {
          enonce: "Une pizza est coupée en 8 parts égales. Les parts mangées sont en couleur.\nTom mange $\\frac{3}{8}$ de la pizza, Lisa $\\frac{2}{8}$.\na) Ensemble, ils mangent $\\frac{?}{8}$. Écris le nombre du haut.\nb) Il reste $\\frac{?}{8}$. Écris le nombre du haut.\nc) Ce qui reste, c'est : A) plus que la moitié B) moins que la moitié C) la moitié",
          figure: disque(5, 8),
          correction:
            "a) $\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}$ : 5 parts mangées.\nb) La pizza entière, c'est $\\frac{8}{8}$. Il reste $\\frac{8}{8} - \\frac{5}{8} = \\frac{3}{8}$.\nc) La moitié de 8 parts, c'est 4 parts : $\\frac{4}{8}$. 3 < 4 : il reste moins que la moitié. Réponse B.\n⛔ Le piège du b) : répondre 5, les parts en couleur. Ce sont les parts MANGÉES ; il reste les blanches.\nRéponse : a) 5 ; b) 3 ; c) B.",
          micros: ["ce2_fraction_add_sous", "ce2_fraction_comparer", "ce2_fraction_comparer_unite"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["B", "B) moins que la moitié", "moins"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je trouve d'abord l'unité et son partage, puis je calcule pas à pas.",
      rappel: [
        "Pour prendre $\\frac{1}{4}$ de 12, je partage 12 en 4 parts égales : $12 \\div 4 = 3$.",
        "Pour comparer, j'écris les fractions avec le même partage.",
        "Toute l'unité, c'est 1 : $\\frac{12}{12} = 1$.",
      ],
      exercices: [
        {
          titre: "Le jardin partagé",
          enonce: "Une jardinière partage son jardin en 12 parcelles égales.\nLes tomates prennent $\\frac{1}{4}$ du jardin. Les carottes, $\\frac{1}{3}$. Les fleurs, le reste.\na) Combien de parcelles de tomates ?\nb) Combien de parcelles de carottes ?\nc) Combien de parcelles de fleurs ?\nd) Quelle fraction du jardin pour les fleurs ? A) $\\frac{7}{12}$ B) $\\frac{5}{12}$ C) $\\frac{5}{7}$",
          figure: rect(3, 4, 0),
          correction:
            "a) $\\frac{1}{4}$ de 12 : je partage 12 en 4. $12 \\div 4 = 3$ parcelles.\nb) $\\frac{1}{3}$ de 12 : je partage 12 en 3. $12 \\div 3 = 4$ parcelles.\nc) Le reste : $12 - 3 - 4 = 5$ parcelles.\nd) 5 parcelles sur 12 : $\\frac{5}{12}$. Réponse B.\nJe vérifie : $3 + 4 + 5 = 12$ parcelles.\n⛔ Le piège du d) : choisir $\\frac{7}{12}$. 7, ce sont les parcelles de tomates ET de carottes.\nRéponse : a) 3 ; b) 4 ; c) 5 ; d) B.",
          micros: ["ce2_fraction_defi", "ce2_fraction_unite", "ce2_fraction_egalite"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
            { question: "d)", attendu: ["B"] },
          ],
        },
        {
          titre: "Le ruban de la couturière",
          enonce: "Une couturière a un ruban de 1 m, c'est-à-dire 100 cm.\nElle coupe $\\frac{1}{4}$ du ruban pour un chapeau.\nPuis elle coupe $\\frac{2}{4}$ du ruban pour une robe.\na) Combien de cm pour le chapeau ?\nb) Combien de cm pour la robe ?\nc) Quelle fraction du ruban reste ? A) $\\frac{3}{4}$ B) $\\frac{2}{4}$ C) $\\frac{1}{4}$",
          correction:
            "Le ruban entier, c'est l'unité : 100 cm.\na) $\\frac{1}{4}$ de 100 cm : je partage 100 en 4. $100 \\div 4 = 25$ cm.\nb) $\\frac{2}{4}$, c'est 2 quarts : $2 \\times 25 = 50$ cm.\nc) Elle a coupé $\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$. Il reste $\\frac{4}{4} - \\frac{3}{4} = \\frac{1}{4}$. Réponse C.\nJe vérifie : $25 + 50 + 25 = 100$ cm.\n⛔ Le piège du a) : répondre 4 cm. Le 4 dit le partage en 4 : chaque quart fait 25 cm.\nRéponse : a) 25 ; b) 50 ; c) C.",
          micros: ["ce2_fraction_bande_unite", "ce2_fraction_add_sous", "ce2_fraction_defi"],
          reponses: [
            { question: "a)", attendu: "25", unite: "cm" },
            { question: "b)", attendu: "50", unite: "cm" },
            { question: "c)", attendu: ["C"] },
          ],
        },
        {
          titre: "La course de relais",
          enonce: "Trois amis courent une partie du parcours. La droite peut t'aider.\nInès court $\\frac{3}{4}$ du parcours, Hugo $\\frac{5}{8}$, Maé $\\frac{1}{2}$.\na) Qui court le plus ?\nb) Qui court le moins ?\nc) Hugo court : A) plus que la moitié B) moins que la moitié C) la moitié",
          figure: droiteRel(0, 1, 1 / 8, [], { nombres: 1 }),
          correction:
            "J'écris les trois fractions en huitièmes, comme la droite.\nInès : $\\frac{3}{4} = \\frac{6}{8}$. Hugo : $\\frac{5}{8}$. Maé : $\\frac{1}{2} = \\frac{4}{8}$.\nJe range : 4 < 5 < 6.\na) Inès court le plus.\nb) Maé court le moins.\nc) La moitié, c'est $\\frac{4}{8}$. Hugo court $\\frac{5}{8}$ : plus que la moitié. Réponse A.\n⛔ Le piège : mettre Hugo devant, parce que 5 et 8 sont plus grands que 3 et 4.\nRéponse : a) Inès ; b) Maé ; c) A.",
          micros: ["ce2_fraction_comparer", "ce2_fraction_droite", "ce2_fraction_defi"],
          reponses: [
            { question: "a)", attendu: ["Inès", "Ines"] },
            { question: "b)", attendu: ["Maé", "Mae"] },
            { question: "c)", attendu: ["A", "A) plus que la moitié", "plus"] },
          ],
        },
        {
          titre: "Le gâteau d'anniversaire",
          enonce: "Le gâteau d'anniversaire est rectangulaire. Il est coupé en 12 parts égales.\nPapa mange $\\frac{1}{6}$ du gâteau, Maman $\\frac{1}{4}$, et les enfants $\\frac{1}{2}$.\na) Combien de parts mange Papa ?\nb) Combien de parts mange Maman ?\nc) Combien de parts mangent les enfants ?\nd) Combien de parts restent ?",
          figure: rect(2, 6, 0),
          correction:
            "J'écris chaque fraction en douzièmes.\na) $\\frac{1}{6} = \\frac{2}{12}$ (× 2) : 2 parts.\nb) $\\frac{1}{4} = \\frac{3}{12}$ (× 3) : 3 parts.\nc) $\\frac{1}{2} = \\frac{6}{12}$ (× 6) : 6 parts.\nd) Mangé : $2 + 3 + 6 = 11$ parts. Il reste $12 - 11 = 1$ part, $\\frac{1}{12}$ du gâteau.\n⛔ Le piège : croire que Papa mange 6 parts, parce que $\\frac{1}{6}$ contient un 6. Le 6 dit le partage.\nRéponse : a) 2 ; b) 3 ; c) 6 ; d) 1.",
          micros: ["ce2_fraction_defi", "ce2_fraction_egalite", "ce2_fraction_add_sous"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["6", "six"] },
            { question: "d)", attendu: ["1", "un", "une"] },
          ],
        },
      ],
    },
  ],
};
