// ─── Fiche d'exercices : les fractions simples (CE1) — 20 exercices corrigés ──
//
// 17/11/2026 : la feuille interactive de la notion `fraction` du coach CE1
// (« Fractions simples », 13 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-fraction.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/fraction.bank.ts`) : la fraction
// d'UN TOUT, le demi, le tiers, le quart, puis 1/5, 1/6, 1/8, 1/10 ;
// numérateur et dénominateur ; comparer ; additionner et soustraire à même
// dénominateur ; le complément à 1.
// ⛔ LIMITES DU CE1 : dénominateurs 2, 3, 4, 5, 6, 8 ou 10, jamais 7 ni 12 ;
// des fractions inférieures ou égales à 1 ; pas de fraction d'une quantité
// (« 1/4 de 12 » est du CE2).
// ⛔ Aucune question à rédiger : QCM par lettre, signe, vrai ou faux, un
// nombre (le numérateur qui manque), un mot. Une fraction tapée (« 3/4 »)
// n'est demandée qu'une fois, à la lettre (`exact`).
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : des parts inégales (1, 14), le numérateur et le
// dénominateur inversés (2, 4), compter les parts blanches (2, 11), « un
// sixième » écrit 6 (5), colorier 2 cases pour un demi (6), 1/8 plus grand
// que 1/3 parce que 8 > 3 (7, 13, 18, 19), comparer les dénominateurs quand
// ils sont égaux (8, 16), additionner aussi les dénominateurs (9, 10, 17),
// la part mangée prise pour celle qui reste (12), écrire 4/3 pour « trois
// quarts » (15), oublier une des trois cultures (17), le quart pris pour
// 4 huitièmes (18), la moitié d'une tablette de 8 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : pizza (2, 19), tarte (11), gâteau (12, 16),
// drapeaux (1, 14), jardin partagé (17), couture (18), chocolat (20).
// Les métiers : couturière (18), jardinier (17).
// UN SEUL contexte réunionnais (12, le gâteau patate de Mamie, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le disque (camembert) et le rectangle du canvas `fraction`
// du coach (`disque`, `deuxDisques`, `rect`), les barres empilées (`barres`),
// des bandes coupées en parts égales ou NON (`bandes`).
//
// Micro-compétences (13/13) : ce1_fraction_partage (1, 2, 14), ce1_fraction_demi
// (3, 6, 20), ce1_fraction_quart (1, 3), ce1_fraction_tiers (3, 12),
// ce1_fraction_unitaires (5, 15), ce1_fraction_vocabulaire (4, 15),
// ce1_fraction_representer (6, 14, 20), ce1_fraction_inferieure_1 (2, 8, 11,
// 14, 15), ce1_fraction_comparer_meme_denominateur (8, 16, 17),
// ce1_fraction_comparer_unitaires (7, 13, 18, 19), ce1_fraction_additionner
// (9, 10, 16, 17, 19, 20), ce1_fraction_complement_1 (10, 11, 12, 17, 18, 20),
// ce1_fraction_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, deuxDisques, disque, ecranSeulement, rect } from "@/lib/fiches-exercices/dessins-fractions-cm2";
import { bandes } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesFractionCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "fraction",
  titre: "Les fractions simples",
  accroche:
    "Vingt exercices, du plus facile au défi. Couper un tout en parts égales. Reconnaître un demi, un tiers, un quart, un dixième. Le numérateur et le dénominateur. Comparer deux fractions. Ajouter des parts. Des pizzas, des tartes, un jardin, un ruban et du chocolat. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris la lettre, le signe ou le nombre seul.",
      rappel: [
        "Une fraction, c'est un tout coupé en parts ÉGALES.",
        "Dans $\\frac{3}{8}$ : le tout est coupé en 8 parts, j'en prends 3.",
        "Plus on coupe de parts, plus chaque part est petite : $\\frac{1}{8}$ < $\\frac{1}{3}$.",
      ],
      exercices: [
        {
          enonce: "Trois drapeaux sont coupés en 4 morceaux.\nQuel drapeau est coupé en 4 parts égales ?",
          figure: bandes([
            { nom: "A", parts: [3, 1, 2, 2], colorie: [0] },
            { nom: "B", parts: [1, 1, 1, 1], colorie: [0] },
            { nom: "C", parts: [1, 1, 2, 4], colorie: [0] },
          ]),
          correction:
            "Des parts égales ont toutes la même taille.\nA : le premier morceau est bien plus grand que le deuxième. Pas égal.\nB : les 4 morceaux ont la même taille. Égal.\nC : le dernier morceau est très grand. Pas égal.\nDans B, une part est un quart : $\\frac{1}{4}$.\n⛔ Le piège : compter 4 morceaux et dire « c'est un quart ». Il faut aussi que les morceaux soient égaux.\nRéponse : B.",
          micros: ["ce1_fraction_partage", "ce1_fraction_quart"],
          reponses: [{ attendu: ["B"] }],
        },
        {
          enonce: "Regarde la pizza.\na) En combien de parts égales est-elle coupée ?\nb) Combien de parts sont coloriées ?\nc) Quelle fraction est coloriée ? A) $\\frac{8}{3}$ B) $\\frac{3}{8}$ C) $\\frac{5}{8}$",
          figure: disque(3, 8),
          correction:
            "a) Je compte toutes les parts : 8.\nb) Je compte les parts coloriées : 3.\nc) On écrit les parts prises en haut, et le nombre de parts en bas : $\\frac{3}{8}$. Réponse B.\n⛔ Le piège : choisir $\\frac{5}{8}$. 5, ce sont les parts blanches.\nRéponse : a) 8 ; b) 3 ; c) B.",
          micros: ["ce1_fraction_inferieure_1", "ce1_fraction_partage"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["B"] },
          ],
        },
        {
          enonce: "Regarde les trois barres.\na) Quelle barre montre un demi colorié ?\nb) Quelle barre montre un tiers colorié ?\nc) Quelle barre montre un quart colorié ?",
          figure: barres([
            { d: 3, label: "A", parts: [1] },
            { d: 4, label: "B", parts: [1] },
            { d: 2, label: "C", parts: [1] },
          ]),
          correction:
            "Je compte en combien de parts égales chaque barre est coupée.\nA : 3 parts, 1 coloriée. C'est un tiers, $\\frac{1}{3}$.\nB : 4 parts, 1 coloriée. C'est un quart, $\\frac{1}{4}$.\nC : 2 parts, 1 coloriée. C'est un demi, $\\frac{1}{2}$.\n⛔ Le piège : croire que « un tiers » veut dire 3 parts coloriées. On colorie 1 part sur 3.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["ce1_fraction_demi", "ce1_fraction_tiers", "ce1_fraction_quart"],
          reponses: [
            { question: "a)", attendu: ["C"] },
            { question: "b)", attendu: ["A"] },
            { question: "c)", attendu: ["B"] },
          ],
        },
        {
          enonce: "Regarde la fraction $\\frac{2}{5}$.\na) Quel est le numérateur ?\nb) Quel est le dénominateur ?\nc) Le dénominateur dit : A) combien de parts on prend B) en combien de parts égales on coupe",
          correction:
            "Le numérateur est en haut. Le dénominateur est en bas.\na) En haut, il y a 2 : le numérateur est 2.\nb) En bas, il y a 5 : le dénominateur est 5.\nc) Le dénominateur dit en combien de parts égales on coupe le tout. Réponse B.\n⛔ Le piège : inverser les deux mots. Dénominateur, comme « en bas ».\nRéponse : a) 2 ; b) 5 ; c) B.",
          micros: ["ce1_fraction_vocabulaire"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["B"] },
          ],
        },
        {
          enonce: "Écris le dénominateur de chaque fraction.\na) un cinquième\nb) un sixième\nc) un huitième\nd) un dixième",
          correction:
            "Le mot dit en combien de parts on coupe.\na) Un cinquième : 5 parts. $\\frac{1}{5}$, le dénominateur est 5.\nb) Un sixième : 6 parts. $\\frac{1}{6}$, le dénominateur est 6.\nc) Un huitième : 8 parts. $\\frac{1}{8}$, le dénominateur est 8.\nd) Un dixième : 10 parts. $\\frac{1}{10}$, le dénominateur est 10.\n⛔ Le piège : écrire 1. Le 1 est le numérateur, en haut.\nRéponse : a) 5 ; b) 6 ; c) 8 ; d) 10.",
          micros: ["ce1_fraction_unitaires"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["8", "huit"] },
            { question: "d)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "La barre a 6 cases égales.\nCombien de cases faut-il colorier pour montrer :\na) $\\frac{1}{6}$ ?\nb) $\\frac{4}{6}$ ?\nc) un demi de la barre ?",
          figure: rect(1, 6, 0),
          correction:
            "La barre a 6 cases : chaque case est $\\frac{1}{6}$.\na) $\\frac{1}{6}$ : je colorie 1 case.\nb) $\\frac{4}{6}$ : je colorie 4 cases.\nc) Un demi : je coupe la barre en 2 parts égales. 3 + 3 = 6. Je colorie 3 cases.\n⛔ Le piège du c) : colorier 2 cases, à cause du 2 de « demi ». Un demi, c'est la moitié du tout.\nRéponse : a) 1 ; b) 4 ; c) 3.",
          micros: ["ce1_fraction_representer", "ce1_fraction_demi"],
          reponses: [
            { question: "a)", attendu: ["1", "une", "un"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Écris le signe < ou >.\na) $\\frac{1}{2}$ … $\\frac{1}{4}$\nb) $\\frac{1}{8}$ … $\\frac{1}{3}$\nc) $\\frac{1}{10}$ … $\\frac{1}{5}$",
          correction:
            "Le numérateur est 1 partout. Plus on coupe de parts, plus chaque part est petite.\na) En 2 parts, chaque part est plus grande qu'en 4 parts. $\\frac{1}{2}$ > $\\frac{1}{4}$.\nb) En 8 parts, chaque part est plus petite qu'en 3 parts. $\\frac{1}{8}$ < $\\frac{1}{3}$.\nc) En 10 parts, chaque part est plus petite qu'en 5 parts. $\\frac{1}{10}$ < $\\frac{1}{5}$.\n⛔ Le piège du b) : dire $\\frac{1}{8}$ > $\\frac{1}{3}$, parce que 8 > 3. C'est l'inverse.\nRéponse : a) > ; b) < ; c) <.",
          schema: ecranSeulement(
            barres([
              { d: 2, label: "1/2", parts: [1] },
              { d: 3, label: "1/3", parts: [1] },
              { d: 4, label: "1/4", parts: [1] },
              { d: 8, label: "1/8", parts: [1] },
            ]),
          ),
          micros: ["ce1_fraction_comparer_unitaires"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "<" },
          ],
        },
        {
          enonce: "Écris le signe < ou >.\na) $\\frac{3}{5}$ … $\\frac{1}{5}$\nb) $\\frac{2}{8}$ … $\\frac{5}{8}$\nc) $\\frac{4}{4}$ … $\\frac{3}{4}$",
          correction:
            "Les parts ont la même taille : même dénominateur. Je compare le nombre de parts.\na) 3 parts, c'est plus que 1 part. $\\frac{3}{5}$ > $\\frac{1}{5}$.\nb) 2 parts, c'est moins que 5 parts. $\\frac{2}{8}$ < $\\frac{5}{8}$.\nc) $\\frac{4}{4}$, c'est le tout. C'est plus que 3 parts. $\\frac{4}{4}$ > $\\frac{3}{4}$.\n⛔ Le piège : comparer les dénominateurs. Ils sont égaux : seuls les numérateurs comptent.\nRéponse : a) > ; b) < ; c) >.",
          micros: ["ce1_fraction_comparer_meme_denominateur", "ce1_fraction_inferieure_1"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: ">" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je regarde le dénominateur. Puis je compte les parts.",
      rappel: [
        "1 quart + 2 quarts = 3 quarts : $\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$.",
        "Le dénominateur ne change pas : j'ajoute seulement les parts.",
        "Le tout, c'est 1 : $\\frac{8}{8} = 1$.",
      ],
      exercices: [
        {
          enonce: "Trouve le numérateur qui manque. Écris le nombre seul.\na) $\\frac{1}{4} + \\frac{2}{4} = \\frac{…}{4}$\nb) $\\frac{3}{8} + \\frac{4}{8} = \\frac{…}{8}$\nc) $\\frac{2}{5} + \\frac{3}{5} = \\frac{…}{5}$\nd) Donc $\\frac{2}{5} + \\frac{3}{5}$ est égal à quel nombre entier ?",
          correction:
            "Les parts ont la même taille. J'ajoute seulement les parts.\na) 1 quart + 2 quarts = 3 quarts. $\\frac{3}{4}$.\nb) 3 huitièmes + 4 huitièmes = 7 huitièmes. $\\frac{7}{8}$.\nc) 2 cinquièmes + 3 cinquièmes = 5 cinquièmes. $\\frac{5}{5}$.\nd) 5 parts sur 5 : c'est le tout. $\\frac{5}{5} = 1$.\n⛔ Le piège : ajouter aussi les dénominateurs, 4 + 4 = 8. La taille des parts ne change pas.\nRéponse : a) 3 ; b) 7 ; c) 5 ; d) 1.",
          micros: ["ce1_fraction_additionner"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: ["5", "cinq"] },
            { question: "d)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Trouve le numérateur qui manque. Écris le nombre seul.\na) $\\frac{5}{6} - \\frac{2}{6} = \\frac{…}{6}$\nb) $\\frac{9}{10} - \\frac{4}{10} = \\frac{…}{10}$\nc) $1 - \\frac{1}{3} = \\frac{…}{3}$",
          correction:
            "J'enlève des parts de même taille.\na) 5 sixièmes − 2 sixièmes = 3 sixièmes. $\\frac{3}{6}$.\nb) 9 dixièmes − 4 dixièmes = 5 dixièmes. $\\frac{5}{10}$.\nc) 1, c'est le tout : $\\frac{3}{3}$. J'enlève 1 tiers : il reste 2 tiers. $\\frac{2}{3}$.\n⛔ Le piège du c) : faire 1 − 1 = 0. J'écris d'abord le tout en tiers : $1 = \\frac{3}{3}$.\nRéponse : a) 3 ; b) 5 ; c) 2.",
          micros: ["ce1_fraction_additionner", "ce1_fraction_complement_1"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Regarde la tarte.\na) Quelle fraction n'est pas coloriée ? $\\frac{…}{8}$ : écris le numérateur.\nb) Le tout s'écrit $\\frac{…}{8}$. Écris le numérateur.",
          figure: disque(5, 8),
          correction:
            "La tarte est coupée en 8 parts égales. 5 sont coloriées.\na) Les parts blanches : 8 − 5 = 3. C'est $\\frac{3}{8}$.\nb) Le tout, ce sont les 8 parts : $\\frac{8}{8}$.\nJe vérifie : $\\frac{5}{8} + \\frac{3}{8} = \\frac{8}{8}$, la tarte entière.\n⛔ Le piège du a) : répondre 5. 5, ce sont les parts coloriées.\nRéponse : a) 3 ; b) 8.",
          micros: ["ce1_fraction_complement_1", "ce1_fraction_inferieure_1"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Mamie coupe un gâteau patate en 3 parts égales.\nTom mange une part.\na) Quelle fraction du gâteau mange-t-il ? A) $\\frac{1}{2}$ B) $\\frac{1}{3}$ C) $\\frac{1}{4}$\nb) Quelle fraction reste-t-il ? A) $\\frac{2}{3}$ B) $\\frac{1}{3}$ C) $\\frac{3}{3}$",
          correction:
            "a) Le gâteau est coupé en 3 parts. Tom en mange 1. C'est un tiers, $\\frac{1}{3}$. Réponse B.\nb) Il reste 3 − 1 = 2 parts. C'est $\\frac{2}{3}$. Réponse A.\nJe vérifie : $\\frac{1}{3} + \\frac{2}{3} = \\frac{3}{3}$, le gâteau entier.\n⛔ Le piège du b) : choisir $\\frac{1}{3}$ encore. C'est la part mangée, pas celle qui reste.\nRéponse : a) B ; b) A.",
          micros: ["ce1_fraction_tiers", "ce1_fraction_complement_1"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["A"] },
          ],
        },
        {
          enonce: "Range ces fractions de la plus petite à la plus grande.\nA = $\\frac{1}{3}$ ; B = $\\frac{1}{10}$ ; C = $\\frac{1}{2}$ ; D = $\\frac{1}{6}$\nÉcris les lettres séparées par « ; ».",
          correction:
            "Le numérateur est 1 partout. Plus le dénominateur est grand, plus la part est petite.\nLa plus petite part : 10 parts, $\\frac{1}{10}$. Puis 6 parts, $\\frac{1}{6}$.\nPuis 3 parts, $\\frac{1}{3}$. La plus grande : 2 parts, $\\frac{1}{2}$.\nDonc B, puis D, puis A, puis C.\n⛔ Le piège : ranger les dénominateurs, 2, 3, 6, 10. Cela range les parts de la plus grande à la plus petite.\nRéponse : B ; D ; A ; C.",
          schema: ecranSeulement(
            barres([
              { d: 10, label: "B 1/10", parts: [1] },
              { d: 6, label: "D 1/6", parts: [1] },
              { d: 3, label: "A 1/3", parts: [1] },
              { d: 2, label: "C 1/2", parts: [1] },
            ]),
          ),
          micros: ["ce1_fraction_comparer_unitaires"],
          reponses: [{ attendu: ["B ; D ; A ; C", "B < D < A < C", "B, D, A, C"], ordre: true }],
        },
        {
          enonce: "Vrai ou faux ?\na) Le drapeau A montre $\\frac{1}{4}$.\nb) Le drapeau B montre $\\frac{1}{4}$.\nc) Le drapeau C montre $\\frac{2}{3}$.",
          figure: bandes([
            { nom: "A", parts: [1, 1, 1, 1], colorie: [1] },
            { nom: "B", parts: [4, 2, 1, 1], colorie: [3] },
            { nom: "C", parts: [1, 1, 1], colorie: [0, 1] },
          ]),
          correction:
            "Je vérifie d'abord que les parts sont égales.\na) A : 4 parts égales, 1 coloriée. C'est $\\frac{1}{4}$. Vrai.\nb) B : 4 morceaux, mais pas égaux. La part coloriée est toute petite. Faux.\nc) C : 3 parts égales, 2 coloriées. C'est $\\frac{2}{3}$. Vrai.\n⛔ Le piège du b) : compter 4 morceaux et dire un quart. Sans parts égales, pas de fraction.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["ce1_fraction_partage", "ce1_fraction_representer", "ce1_fraction_inferieure_1"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
          ],
        },
        {
          enonce: "Écris chaque fraction en chiffres, avec la barre, comme 1/2.\na) trois quarts\nb) deux tiers\nc) sept dixièmes",
          correction:
            "Le premier mot dit combien de parts je prends : c'est le numérateur, en haut.\nLe deuxième mot dit en combien de parts on coupe : c'est le dénominateur, en bas.\na) trois quarts : $\\frac{3}{4}$, qui s'écrit 3/4.\nb) deux tiers : $\\frac{2}{3}$, qui s'écrit 2/3.\nc) sept dixièmes : $\\frac{7}{10}$, qui s'écrit 7/10.\n⛔ Le piège : écrire 4/3 pour « trois quarts ». Le nombre de parts prises va en haut.\nRéponse : a) 3/4 ; b) 2/3 ; c) 7/10.",
          micros: ["ce1_fraction_vocabulaire", "ce1_fraction_unitaires", "ce1_fraction_inferieure_1"],
          reponses: [
            { question: "a)", attendu: ["3/4"], exact: true },
            { question: "b)", attendu: ["2/3"], exact: true },
            { question: "c)", attendu: ["7/10"], exact: true },
          ],
        },
        {
          enonce: "Léa mange $\\frac{3}{8}$ d'un gâteau. Sam mange $\\frac{5}{8}$ du même gâteau.\na) Qui a mangé le plus ? Écris le prénom.\nb) Reste-t-il du gâteau ? Réponds oui ou non.",
          correction:
            "a) Les parts ont la même taille : des huitièmes. 5 parts, c'est plus que 3.\nSam a mangé le plus.\nb) $\\frac{3}{8} + \\frac{5}{8} = \\frac{8}{8}$ : c'est le gâteau entier. Il ne reste rien : non.\n⛔ Le piège du b) : répondre oui sans calculer. J'ajoute les parts pour savoir.\nRéponse : a) Sam ; b) non.",
          micros: ["ce1_fraction_comparer_meme_denominateur", "ce1_fraction_additionner"],
          reponses: [
            { question: "a)", attendu: ["Sam"] },
            { question: "b)", attendu: FAUX },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je dessine le tout au brouillon et je colorie les parts.",
      rappel: [
        "Le tout, c'est 1. Avec 10 parts : $1 = \\frac{10}{10}$.",
        "Ce qui reste = le tout − ce qu'on a pris.",
        "Un quart, c'est 2 huitièmes : $\\frac{1}{4} = \\frac{2}{8}$.",
      ],
      exercices: [
        {
          titre: "Le jardin partagé",
          enonce: "Un jardinier coupe son jardin en 10 parts égales.\nLes salades prennent $\\frac{3}{10}$. Les tomates prennent $\\frac{4}{10}$. Le reste, ce sont des fleurs.\na) Salades et tomates ensemble : $\\frac{…}{10}$. Écris le numérateur.\nb) Les fleurs : $\\frac{…}{10}$. Écris le numérateur.\nc) Qui prend la plus grande place ? A) les salades B) les tomates C) les fleurs",
          figure: rect(2, 5, 0),
          correction:
            "a) 3 dixièmes + 4 dixièmes = 7 dixièmes : $\\frac{7}{10}$.\nb) Le jardin entier, c'est $\\frac{10}{10}$. 10 − 7 = 3. Les fleurs prennent $\\frac{3}{10}$.\nc) Je compare : salades 3, tomates 4, fleurs 3 parts. Les tomates prennent le plus. Réponse B.\n⛔ Le piège du a) : écrire $\\frac{7}{20}$ en ajoutant les dénominateurs. Le jardin a toujours 10 parts.\nRéponse : a) 7 ; b) 3 ; c) B.",
          micros: ["ce1_fraction_defi", "ce1_fraction_additionner", "ce1_fraction_complement_1", "ce1_fraction_comparer_meme_denominateur"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["B", "B) les tomates", "les tomates", "tomates"] },
          ],
        },
        {
          titre: "Le ruban de la couturière",
          enonce: "Une couturière a un ruban. Elle en donne $\\frac{1}{4}$ à Inès et $\\frac{1}{8}$ à Zoé.\na) Qui a le plus long morceau ? Écris le prénom.\nb) Combien de huitièmes y a-t-il dans un quart ?\nc) Il reste $\\frac{…}{8}$ du ruban. Écris le numérateur.",
          figure: barres([
            { d: 4, label: "quarts", parts: [0] },
            { d: 8, label: "huitièmes", parts: [0] },
          ]),
          correction:
            "a) Un quart : le ruban coupé en 4. Un huitième : coupé en 8. En 4, les morceaux sont plus longs.\nInès a le plus long morceau.\nb) Sur le dessin, un quart couvre 2 huitièmes. $\\frac{1}{4} = \\frac{2}{8}$.\nc) Elle a donné 2 huitièmes à Inès et 1 huitième à Zoé : 3 huitièmes.\nLe ruban entier, c'est $\\frac{8}{8}$. 8 − 3 = 5. Il reste $\\frac{5}{8}$.\n⛔ Le piège du a) : dire Zoé, parce que 8 > 4. Plus on coupe, plus les morceaux sont petits.\nRéponse : a) Inès ; b) 2 ; c) 5.",
          micros: ["ce1_fraction_defi", "ce1_fraction_comparer_unitaires", "ce1_fraction_complement_1"],
          reponses: [
            { question: "a)", attendu: ["Inès", "Ines"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Les pizzas du match",
          enonce: "Après le match, il y a deux pizzas de la même taille.\nLa pizza A est coupée en 6 parts égales. La pizza B en 8 parts égales.\nTom prend une part de A. Lina prend une part de B.\na) Qui a la plus grosse part ? Écris le prénom.\nb) Écris le signe < ou > : $\\frac{1}{6}$ … $\\frac{1}{8}$\nc) Tom reprend une part de A. Il a mangé $\\frac{…}{6}$. Écris le numérateur.",
          figure: deuxDisques([0, 6], [0, 8], false),
          correction:
            "a) La pizza A a moins de parts : chaque part est plus grosse. Tom a la plus grosse part.\nb) Un sixième est plus grand qu'un huitième : $\\frac{1}{6}$ > $\\frac{1}{8}$.\nc) Tom a mangé 1 part, puis 1 autre : 2 parts de A. $\\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6}$.\n⛔ Le piège du a) : dire Lina, parce que 8 > 6. Sa pizza est coupée en plus de parts : elles sont plus petites.\nRéponse : a) Tom ; b) > ; c) 2.",
          micros: ["ce1_fraction_defi", "ce1_fraction_comparer_unitaires", "ce1_fraction_additionner"],
          reponses: [
            { question: "a)", attendu: ["Tom"] },
            { question: "b)", attendu: ">" },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "La tablette de chocolat",
          enonce: "Une tablette de chocolat a 8 carrés égaux.\nAna mange $\\frac{3}{8}$ de la tablette. Léo mange $\\frac{2}{8}$.\na) Combien de carrés ont-ils mangés ensemble ?\nb) Il reste $\\frac{…}{8}$ de la tablette. Écris le numérateur.\nc) Ce qui reste, est-ce plus ou moins que la moitié ? Écris « plus » ou « moins ».",
          figure: rect(2, 4, 0),
          correction:
            "a) 3 carrés + 2 carrés = 5 carrés. Ils ont mangé $\\frac{5}{8}$.\nb) La tablette entière : 8 carrés. 8 − 5 = 3. Il reste $\\frac{3}{8}$.\nc) La moitié de 8 carrés, c'est 4 carrés : $\\frac{4}{8}$. Il en reste 3. 3 < 4 : c'est moins.\n⛔ Le piège du c) : croire que la moitié, c'est 2 carrés, à cause du 2 de « demi ». La moitié de 8, c'est 4.\nRéponse : a) 5 ; b) 3 ; c) moins.",
          micros: ["ce1_fraction_defi", "ce1_fraction_additionner", "ce1_fraction_complement_1", "ce1_fraction_demi", "ce1_fraction_representer"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["moins"] },
          ],
        },
      ],
    },
  ],
};
