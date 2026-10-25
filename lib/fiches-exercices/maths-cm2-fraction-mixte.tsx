// ─── Fiche d'exercices : les fractions plus grandes que 1 (CM2) ───────────────
//
// 25/10/2026 : la DEUXIÈME des trois feuilles de fractions du CM2 (avec
// `maths-cm2-fraction.tsx` et `maths-cm2-fraction-calcul.tsx`). Même forme :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, dessins de `dessins-fractions-cm2.tsx`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// fractions-superieures.bank.ts` (notionId fraction_mixte) et sur les trois
// objectifs du programme de CM2 (cm2-N-fractions-2, -3, -4) : écrire une
// fraction plus grande que 1 comme « entier + fraction plus petite que 1 »,
// regrouper « entier + fraction » en une seule fraction, encadrer une fraction
// entre deux entiers qui se suivent. ⭐ Tout repose sur d/d = 1 et sur la TABLE
// de multiplication : 58/7 = 56/7 + 2/7 = 8 + 2/7 (exemple de réussite du
// programme, repris en modèle à l'exercice 11).
// La fiche de cours `lib/fiches/maths-cm2-fractions.tsx` (seule fiche de cours
// de fractions du CM2) en donne le départ : 5/4 > 1, 7/3 entre 2 et 3 — ces
// deux exemples ne sont pas repris.
// ⛔ LIMITES DU CM2 : aucune addition de deux fractions (feuille
// `fraction-calcul`) ; « 2 + 3/5 » se lit comme 2 unités et 3 cinquièmes.
// ⭐ FRÉDÉRIC (25/10) : ses élèves ne savent pas simplifier, ni passer au
// décimal. La feuille relie les deux : 6/4 = 3/2 = 1 + 1/2 = 1,5 (9, 13, 15,
// 18, 20).
//
// Les pièges nommés : « une fraction est toujours plus petite que 1 » (1, 2),
// d/d lu comme 0 ou d (3), 7/4 « entre 7 et 8 » (4, 5, 14), compter les sauts
// depuis le mauvais entier (4, 16), coller l'entier devant le numérateur
// (6, 10 : 2 + 3/5 = 23/5), ajouter l'entier en haut (10 : 5/5), oublier un
// paquet de la table (8, 11), 7/4 = 7,4 et 1 + 3/4 = 1,3 (9, 18), « égal à 3 »
// pris pour « entre 2 et 3 » (14), comparer des fractions et des entiers sans
// tout mettre en tiers (12), simplifier seulement le haut (13), 1/4 d'heure =
// 25 minutes (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fête (1), vélo (7), cuisine (15),
// boulangerie (17), train (18), couture (19). Les métiers : cycliste (7),
// pâtissier (15), boulangère (17), conductrice de train (18), couturière (19).
// Pas de fait réel : tout est un MODÈLE (décors et nombres vraisemblables).
//
// ⭐ LES DESSINS : des BARRES de plusieurs unités (un trait rouge sépare les
// unités), deux pizzas en DISQUES, et surtout la DROITE GRADUÉE — une fraction
// plus grande que 1 ne tient pas dans un seul disque, elle a simplement une
// place plus loin sur la droite (la banque le dit). 13 dessins imprimés.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm2-fraction-mixte.mjs`.
//
// Micro-compétences : fraction_mixte_ecrire (1, 2, 3, 8, 9, 11, 13, 16, 17,
// 18, 20), fraction_mixte_regrouper (6, 7, 10, 12, 15, 19, 20),
// fraction_encadrer (4, 5, 11, 12, 14, 16, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, deuxDisques, droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

const VERT = "#16a34a";

export const exercicesFractionMixteCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction-mixte",
  titre: "Les fractions plus grandes que 1",
  accroche:
    "Vingt exercices, du geste seul au problème. Une fraction peut dépasser 1 : sept quarts, c'est une pizza entière et trois quarts. On apprend à l'écrire « entier + fraction », à regrouper les deux en une seule fraction, à la placer entre deux entiers. Des pizzas, une piste cyclable, une recette, des tartes, un train et des rubans. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé et la droite dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/fraction", titre: "Les fractions" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je fais des paquets : 4 quarts font 1, 3 tiers font 1.",
      rappel: [
        "Quand le haut est égal au bas, la fraction vaut 1 : 4 quarts = 1, 7 septièmes = 1.",
        "Quand le haut dépasse le bas, la fraction dépasse 1 : 7 quarts = 1 + 3 quarts.",
        "Sur la droite, une fraction plus grande que 1 se place après 1.",
      ],
      exercices: [
        {
          enonce: "Pour la fête, Yanis coupe des pizzas en 4 parts égales. Les invités mangent les parts bleues.\na) Combien de quarts de pizza sont mangés ?\nb) Combien de pizzas entières ? Combien de quarts en plus ?\nc) Complète : $\\dfrac{7}{4} = 1 + \\dfrac{\\ldots}{4}$.",
          figure: deuxDisques([4, 4], [3, 4], false),
          correction:
            "a) Je compte les parts bleues : 4 dans la première pizza, 3 dans la deuxième. 4 + 3 = 7 quarts : $\\dfrac{7}{4}$.\nb) 4 quarts font une pizza entière : $\\dfrac{4}{4} = 1$. Il reste 3 quarts en plus.\nc) $\\dfrac{7}{4} = 1 + \\dfrac{3}{4}$.\n⛔ Le piège : croire qu'une fraction est toujours plus petite que 1. $\\dfrac{7}{4}$, c'est plus d'une pizza !\nRéponse : a) 7 quarts ; b) 1 pizza et 3 quarts ; c) $\\dfrac{7}{4} = 1 + \\dfrac{3}{4}$.",
          micros: ["fraction_mixte_ecrire"],
        },
        {
          enonce: "Chaque barre fait 2 unités ; le trait rouge sépare les unités.\nQuelle fraction est coloriée ? Écris-la, puis écris-la « entier + fraction ».",
          figure: barres([
            { d: 3, label: "A", parts: [5], fois: 2 },
            { d: 5, label: "B", parts: [8], fois: 2 },
          ]),
          correction:
            "Je regarde d'abord en combien de parts est coupée UNE unité : c'est le dénominateur.\nBarre A : une unité en 3 parts. 5 parts bleues : $\\dfrac{5}{3}$. Une unité pleine (3 tiers) et 2 tiers : $\\dfrac{5}{3} = 1 + \\dfrac{2}{3}$.\nBarre B : une unité en 5 parts. 8 parts bleues : $\\dfrac{8}{5}$. Une unité pleine (5 cinquièmes) et 3 cinquièmes : $\\dfrac{8}{5} = 1 + \\dfrac{3}{5}$.\n⛔ Le piège : écrire $\\dfrac{5}{6}$ pour A, en comptant les parts des DEUX unités en bas. Le dénominateur, c'est le partage d'UNE unité.\nRéponse : A : $\\dfrac{5}{3} = 1 + \\dfrac{2}{3}$ ; B : $\\dfrac{8}{5} = 1 + \\dfrac{3}{5}$.",
          micros: ["fraction_mixte_ecrire"],
        },
        {
          enonce: "Complète.\na) $\\dfrac{5}{5} = \\ldots$\nb) $\\dfrac{10}{5} = \\ldots$\nc) $\\dfrac{12}{4} = \\ldots$\nd) $\\dfrac{18}{6} = \\ldots$\ne) $2 = \\dfrac{\\ldots}{7}$",
          correction:
            "Un paquet complet, c'est 1 : $\\dfrac{5}{5} = 1$. Je compte les paquets avec la table.\na) 5 cinquièmes, un paquet : 1.\nb) 10 cinquièmes : 2 × 5 = 10, deux paquets. $\\dfrac{10}{5} = 2$.\nc) 12 quarts : 3 × 4 = 12, trois paquets. $\\dfrac{12}{4} = 3$.\nd) 18 sixièmes : 3 × 6 = 18. $\\dfrac{18}{6} = 3$.\ne) 2 unités de 7 septièmes : 2 × 7 = 14. $2 = \\dfrac{14}{7}$.\n⛔ Le piège : dire $\\dfrac{5}{5} = 0$ ou 5. Toutes les parts sont prises : c'est l'unité entière, 1.\nRéponse : a) 1 ; b) 2 ; c) 3 ; d) 3 ; e) $\\dfrac{14}{7}$.",
          schema: ecranSeulement(
            barres([
              { d: 4, label: "12/4", parts: [12], fois: 3 },
              { d: 6, label: "18/6", parts: [18], fois: 3 },
            ]),
          ),
          micros: ["fraction_mixte_ecrire"],
        },
        {
          enonce: "La droite est graduée en quarts.\na) Écris l'abscisse des points A, B et C avec une fraction.\nb) Entre quels nombres entiers se trouve chaque point ?",
          figure: droiteRel(0, 3, 0.25, [
            { value: 1.75, label: "A" },
            { value: 2.25, label: "B" },
            { value: 2.75, label: "C" },
          ], { nombres: 1 }),
          correction:
            "Entre deux entiers, il y a 4 sauts : chaque saut vaut $\\dfrac{1}{4}$. Je compte les sauts depuis 0.\na) A est à 7 sauts de 0 : $\\dfrac{7}{4}$. B est à 9 sauts : $\\dfrac{9}{4}$. C est à 11 sauts : $\\dfrac{11}{4}$.\nb) $1 < \\dfrac{7}{4} < 2$ ; $2 < \\dfrac{9}{4} < 3$ ; $2 < \\dfrac{11}{4} < 3$.\n⛔ Le piège : dire que $\\dfrac{7}{4}$ est « entre 7 et 8 ». C'est 7 QUARTS, pas 7 unités : à peine moins de 2.\nRéponse : a) A : $\\dfrac{7}{4}$ ; B : $\\dfrac{9}{4}$ ; C : $\\dfrac{11}{4}$ ; b) A entre 1 et 2 ; B et C entre 2 et 3.",
          micros: ["fraction_encadrer"],
        },
        {
          enonce: "Entre quels nombres entiers qui se suivent se trouve chaque fraction ?\na) $\\dfrac{5}{2}$\nb) $\\dfrac{10}{3}$\nc) $\\dfrac{9}{4}$\nd) $\\dfrac{23}{10}$\ne) $\\dfrac{26}{5}$",
          correction:
            "Je cherche dans la table du dénominateur le plus grand multiple qui ne dépasse pas le numérateur.\na) 2 × 2 = 4 et 3 × 2 = 6. 5 est entre 4 et 6 : $2 < \\dfrac{5}{2} < 3$.\nb) 3 × 3 = 9 et 4 × 3 = 12. 10 est entre 9 et 12 : $3 < \\dfrac{10}{3} < 4$.\nc) 2 × 4 = 8 et 3 × 4 = 12. 9 est entre 8 et 12 : $2 < \\dfrac{9}{4} < 3$.\nd) 2 × 10 = 20 et 3 × 10 = 30. 23 est entre 20 et 30 : $2 < \\dfrac{23}{10} < 3$.\ne) 5 × 5 = 25 et 6 × 5 = 30. 26 est entre 25 et 30 : $5 < \\dfrac{26}{5} < 6$.\n⛔ Le piège : lire le numérateur comme un nombre d'unités. $\\dfrac{26}{5}$ n'est pas « vers 26 » : ce sont 26 cinquièmes.\nRéponse : a) 2 et 3 ; b) 3 et 4 ; c) 2 et 3 ; d) 2 et 3 ; e) 5 et 6.",
          schema: ecranSeulement(
            droiteRel(0, 6, 1, [
              { value: 2.5, label: "5/2" },
              { value: 10 / 3, label: "10/3" },
              { value: 2.25, label: "9/4" },
              { value: 2.3, label: "23/10" },
              { value: 5.2, label: "26/5" },
            ]),
          ),
          micros: ["fraction_encadrer"],
        },
        {
          enonce: "Écris chaque nombre avec une seule fraction.\na) $1 + \\dfrac{1}{4}$\nb) $2 + \\dfrac{1}{3}$\nc) $3 + \\dfrac{2}{5}$\nd) $1 + \\dfrac{5}{6}$",
          correction:
            "J'écris chaque unité avec le même dénominateur que la fraction, puis je compte toutes les parts.\na) $1 = \\dfrac{4}{4}$. 4 quarts et 1 quart : $1 + \\dfrac{1}{4} = \\dfrac{5}{4}$.\nb) $2 = \\dfrac{6}{3}$ (2 × 3 = 6). 6 tiers et 1 tiers : $2 + \\dfrac{1}{3} = \\dfrac{7}{3}$.\nc) $3 = \\dfrac{15}{5}$ (3 × 5 = 15). 15 cinquièmes et 2 : $3 + \\dfrac{2}{5} = \\dfrac{17}{5}$.\nd) $1 = \\dfrac{6}{6}$. 6 sixièmes et 5 : $1 + \\dfrac{5}{6} = \\dfrac{11}{6}$.\n⛔ Le piège : coller l'entier devant le numérateur. $2 + \\dfrac{1}{3}$ n'est pas $\\dfrac{21}{3}$ : ça ferait 7 unités !\nRéponse : a) $\\dfrac{5}{4}$ ; b) $\\dfrac{7}{3}$ ; c) $\\dfrac{17}{5}$ ; d) $\\dfrac{11}{6}$.",
          schema: ecranSeulement(barres([{ d: 4, label: "1 + 1/4", parts: [5], fois: 2 }])),
          micros: ["fraction_mixte_regrouper"],
        },
        {
          enonce: "Lou, cycliste, s'entraîne sur une piste de 3 km. Le point d'eau est à $2 + \\dfrac{1}{4}$ km du départ.\na) Écris cette distance avec une seule fraction, en quarts de kilomètre.\nb) Place le point d'eau sur la droite.",
          figure: droiteRel(0, 3, 0.25, [], { nombres: 1 }),
          correction:
            "a) 1 km, ce sont 4 quarts. 2 km, ce sont 2 × 4 = 8 quarts. Et 1 quart de plus : 9 quarts.\n$2 + \\dfrac{1}{4} = \\dfrac{9}{4}$ km.\nb) Je vais jusqu'à 2, puis j'avance d'un saut : le point d'eau est juste après 2.\n⛔ Le piège : placer le point à 1 saut de 0, en oubliant les 2 km entiers.\nRéponse : a) $\\dfrac{9}{4}$ km ; b) un saut après 2.",
          schema: ecranSeulement(droiteRel(0, 3, 0.25, [{ value: 2.25, label: "9/4", color: VERT }], { nombres: 1 })),
          micros: ["fraction_mixte_regrouper"],
        },
        {
          enonce: "Avec la table, écris chaque fraction « entier + fraction plus petite que 1 ».\na) $\\dfrac{9}{2}$\nb) $\\dfrac{13}{4}$\nc) $\\dfrac{22}{7}$\nd) $\\dfrac{47}{6}$",
          correction:
            "Je cherche combien de paquets complets tiennent dans le numérateur, avec la table du dénominateur.\na) 4 × 2 = 8 : $\\dfrac{9}{2} = \\dfrac{8}{2} + \\dfrac{1}{2} = 4 + \\dfrac{1}{2}$.\nb) 3 × 4 = 12 : $\\dfrac{13}{4} = \\dfrac{12}{4} + \\dfrac{1}{4} = 3 + \\dfrac{1}{4}$.\nc) 3 × 7 = 21 : $\\dfrac{22}{7} = \\dfrac{21}{7} + \\dfrac{1}{7} = 3 + \\dfrac{1}{7}$.\nd) 7 × 6 = 42 : $\\dfrac{47}{6} = \\dfrac{42}{6} + \\dfrac{5}{6} = 7 + \\dfrac{5}{6}$.\n⛔ Le piège du d) : s'arrêter à 6 × 6 = 36. Il reste alors 11 sixièmes : plus d'un paquet. Le reste doit être plus petit que le dénominateur.\nRéponse : a) $4 + \\dfrac{1}{2}$ ; b) $3 + \\dfrac{1}{4}$ ; c) $3 + \\dfrac{1}{7}$ ; d) $7 + \\dfrac{5}{6}$.",
          schema: ecranSeulement(
            droiteRel(0, 8, 1, [
              { value: 4.5, label: "9/2" },
              { value: 3.25, label: "13/4" },
              { value: 22 / 7, label: "22/7" },
              { value: 47 / 6, label: "47/6" },
            ]),
          ),
          micros: ["fraction_mixte_ecrire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je fais les paquets avec la table, puis je vérifie sur la droite.",
      rappel: [
        "Pour écrire « entier + fraction », je cherche dans la table : 58 septièmes = 56 septièmes + 2 septièmes = 8 + 2 septièmes.",
        "Pour regrouper, j'écris l'entier dans les mêmes parts : 2 = 10 cinquièmes, donc 2 + 3 cinquièmes = 13 cinquièmes.",
        "Un quart = 0,25 et une moitié = 0,5 : 1 + 3 quarts = 1,75.",
      ],
      exercices: [
        {
          enonce: "Écris chaque fraction « entier + fraction », puis avec une virgule.\na) $\\dfrac{5}{4}$\nb) $\\dfrac{3}{2}$\nc) $\\dfrac{7}{4}$\nd) $\\dfrac{12}{10}$",
          correction:
            "Je fais le paquet de 1, puis j'écris la fraction qui reste avec une virgule : un quart = 0,25 ; une moitié = 0,5 ; trois quarts = 0,75 ; un dixième = 0,1.\na) $\\dfrac{5}{4} = 1 + \\dfrac{1}{4} = 1{,}25$.\nb) $\\dfrac{3}{2} = 1 + \\dfrac{1}{2} = 1{,}5$.\nc) $\\dfrac{7}{4} = 1 + \\dfrac{3}{4} = 1{,}75$.\nd) $\\dfrac{12}{10} = 1 + \\dfrac{2}{10} = 1{,}2$.\n⛔ Le piège du c) : écrire 7,4, ou 1,3 pour « 1 et 3 quarts ». Trois quarts, ce n'est pas 0,3 : c'est 75 centièmes, 0,75.\nRéponse : a) 1,25 ; b) 1,5 ; c) 1,75 ; d) 1,2.",
          schema: droiteRel(1, 2, 0.25, [
            { value: 1.25, label: "5/4" },
            { value: 1.5, label: "3/2" },
            { value: 1.75, label: "7/4" },
          ]),
          micros: ["fraction_mixte_ecrire"],
        },
        {
          enonce: "Deux élèves écrivent $2 + \\dfrac{3}{5}$ avec une seule fraction.\nTom trouve $\\dfrac{5}{5}$ : il ajoute 2 en haut.\nLéa trouve $\\dfrac{23}{5}$ : elle colle le 2 devant le 3.\na) Combien vaut la fraction de Tom ?\nb) Entre quels entiers est la fraction de Léa ?\nc) Trouve la bonne fraction.",
          correction:
            "$2 + \\dfrac{3}{5}$, ce sont 2 unités entières ET 3 cinquièmes : un nombre entre 2 et 3.\na) $\\dfrac{5}{5} = 1$. Or le nombre dépasse 2 : Tom a perdu une unité. Ajouter 2 en haut, c'est ajouter seulement 2 cinquièmes.\nb) 4 × 5 = 20 : $\\dfrac{23}{5} = 4 + \\dfrac{3}{5}$. C'est entre 4 et 5 : trop grand.\nc) $2 = \\dfrac{10}{5}$ (2 × 5 = 10). Donc $2 + \\dfrac{3}{5} = \\dfrac{13}{5}$.\n⭐ Je vérifie : $\\dfrac{13}{5} = \\dfrac{10}{5} + \\dfrac{3}{5}$, entre 2 et 3.\n⛔ Les deux pièges : ajouter l'entier en haut, ou le coller devant. Je change l'entier en parts, puis je compte.\nRéponse : a) $\\dfrac{5}{5} = 1$, trop petit ; b) $\\dfrac{23}{5}$ est entre 4 et 5 ; c) $\\dfrac{13}{5}$.",
          schema: barres([{ d: 5, label: "2 + 3/5", parts: [13], fois: 3 }]),
          micros: ["fraction_mixte_regrouper"],
        },
        {
          enonce: "Exemple : $\\dfrac{58}{7} = \\dfrac{56}{7} + \\dfrac{2}{7} = 8 + \\dfrac{2}{7}$, donc $8 < \\dfrac{58}{7} < 9$.\nFais de même avec :\na) $\\dfrac{29}{4}$\nb) $\\dfrac{38}{5}$\nc) $\\dfrac{50}{9}$",
          correction:
            "Comme dans l'exemple, je cherche dans la table le plus grand multiple qui ne dépasse pas le numérateur.\na) 7 × 4 = 28 : $\\dfrac{29}{4} = \\dfrac{28}{4} + \\dfrac{1}{4} = 7 + \\dfrac{1}{4}$, donc $7 < \\dfrac{29}{4} < 8$.\nb) 7 × 5 = 35 : $\\dfrac{38}{5} = \\dfrac{35}{5} + \\dfrac{3}{5} = 7 + \\dfrac{3}{5}$, donc $7 < \\dfrac{38}{5} < 8$.\nc) 5 × 9 = 45 : $\\dfrac{50}{9} = \\dfrac{45}{9} + \\dfrac{5}{9} = 5 + \\dfrac{5}{9}$, donc $5 < \\dfrac{50}{9} < 6$.\n⛔ Le piège du c) : prendre 6 × 9 = 54. C'est plus que 50 : ce paquet ne tient pas.\nRéponse : a) $7 + \\dfrac{1}{4}$, entre 7 et 8 ; b) $7 + \\dfrac{3}{5}$, entre 7 et 8 ; c) $5 + \\dfrac{5}{9}$, entre 5 et 6.",
          schema: ecranSeulement(
            droiteRel(5, 8, 1, [
              { value: 7.25, label: "29/4" },
              { value: 7.6, label: "38/5" },
              { value: 50 / 9, label: "50/9" },
            ]),
          ),
          micros: ["fraction_mixte_ecrire", "fraction_encadrer"],
        },
        {
          enonce: "Range ces nombres du plus petit au plus grand.\n$2 + \\dfrac{1}{3}$ ; $\\dfrac{8}{3}$ ; 2 ; $\\dfrac{5}{3}$ ; 3",
          correction:
            "J'écris tout en tiers : 1 = 3 tiers.\n$2 = \\dfrac{6}{3}$ ; $2 + \\dfrac{1}{3} = \\dfrac{7}{3}$ ; $3 = \\dfrac{9}{3}$.\nJe range les numérateurs : 5 < 6 < 7 < 8 < 9.\n⛔ Le piège : placer $\\dfrac{8}{3}$ après 3 « parce que 8 est plus grand que 3 ». 8 tiers, c'est moins que 9 tiers.\nRéponse : $\\dfrac{5}{3} < 2 < 2 + \\dfrac{1}{3} < \\dfrac{8}{3} < 3$.",
          schema: ecranSeulement(
            droiteRel(1, 3, 1 / 3, [
              { value: 5 / 3, label: "5/3" },
              { value: 7 / 3, label: "2 + 1/3" },
              { value: 8 / 3, label: "8/3" },
            ], { nombres: 1 }),
          ),
          micros: ["fraction_mixte_regrouper", "fraction_encadrer"],
        },
        {
          enonce: "Simplifie, puis écris « entier + fraction ».\na) $\\dfrac{6}{4}$\nb) $\\dfrac{10}{4}$\nc) $\\dfrac{9}{6}$",
          correction:
            "Je simplifie d'abord : je divise le haut ET le bas par le même nombre. Puis je fais les paquets.\na) 6 ÷ 2 = 3 et 4 ÷ 2 = 2 : $\\dfrac{6}{4} = \\dfrac{3}{2} = 1 + \\dfrac{1}{2}$.\nb) 10 ÷ 2 = 5 et 4 ÷ 2 = 2 : $\\dfrac{10}{4} = \\dfrac{5}{2} = 2 + \\dfrac{1}{2}$.\nc) 9 ÷ 3 = 3 et 6 ÷ 3 = 2 : $\\dfrac{9}{6} = \\dfrac{3}{2} = 1 + \\dfrac{1}{2}$.\n⭐ Sur les barres, $\\dfrac{6}{4}$ et $\\dfrac{3}{2}$ ont la même longueur bleue.\n⛔ Le piège : diviser seulement le haut. $\\dfrac{3}{4}$ n'est pas égal à $\\dfrac{6}{4}$ : c'est la moitié.\nRéponse : a) $1 + \\dfrac{1}{2}$ ; b) $2 + \\dfrac{1}{2}$ ; c) $1 + \\dfrac{1}{2}$.",
          schema: barres([
            { d: 4, label: "6/4", parts: [6], fois: 2 },
            { d: 2, label: "3/2", parts: [3], fois: 2 },
          ]),
          micros: ["fraction_mixte_ecrire"],
        },
        {
          enonce: "Vrai ou faux ?\na) $\\dfrac{7}{4}$ est entre 7 et 8.\nb) $\\dfrac{9}{3}$ est entre 2 et 3.\nc) $\\dfrac{11}{5}$ est entre 2 et 3.\nd) $\\dfrac{4}{5}$ est entre 0 et 1.",
          correction:
            "a) Faux. 1 × 4 = 4 et 2 × 4 = 8 : $1 < \\dfrac{7}{4} < 2$.\nb) Faux. 3 × 3 = 9 : $\\dfrac{9}{3} = 3$. Il n'est pas entre 2 et 3, il est ÉGAL à 3.\nc) Vrai. 2 × 5 = 10 et 3 × 5 = 15 : $2 < \\dfrac{11}{5} < 3$.\nd) Vrai. Le haut est plus petit que le bas : $0 < \\dfrac{4}{5} < 1$.\n⛔ Le piège du a) : lire 7 quarts comme 7 unités. Le piège du b) : oublier qu'une fraction peut tomber pile sur un entier.\nRéponse : a) faux ; b) faux ; c) vrai ; d) vrai.",
          schema: droiteRel(0, 3, 1, [
            { value: 1.75, label: "7/4" },
            { value: 3, label: "9/3" },
            { value: 2.2, label: "11/5" },
            { value: 0.8, label: "4/5" },
          ]),
          micros: ["fraction_encadrer"],
        },
        {
          enonce: "Marc, pâtissier, met $2 + \\dfrac{3}{4}$ tasses de farine dans un gâteau. Il n'a qu'une mesure d'un quart de tasse.\na) Combien de fois remplit-il sa mesure ?\nb) Écris la quantité de farine avec une seule fraction.\nc) Écris-la avec une virgule.",
          correction:
            "a) 1 tasse = 4 quarts. 2 tasses = 2 × 4 = 8 quarts. Et 3 quarts de plus : 8 + 3 = 11 quarts. Il remplit sa mesure 11 fois.\nb) $2 + \\dfrac{3}{4} = \\dfrac{11}{4}$ tasses.\nc) 3 quarts = 0,75 : $2 + \\dfrac{3}{4} = 2{,}75$ tasses.\n⛔ Le piège du a) : répondre 5 (2 + 3). Les 2 tasses entières contiennent chacune 4 quarts.\nRéponse : a) 11 fois ; b) $\\dfrac{11}{4}$ ; c) 2,75 tasses.",
          schema: ecranSeulement(barres([{ d: 4, label: "farine", parts: [11], fois: 3 }])),
          micros: ["fraction_mixte_regrouper"],
        },
        {
          enonce: "La droite est graduée en cinquièmes, de 2 à 4.\na) Écris l'abscisse de A et de B avec une seule fraction.\nb) Écris-les « entier + fraction ».",
          figure: droiteRel(2, 4, 0.2, [
            { value: 2.6, label: "A" },
            { value: 3.4, label: "B" },
          ], { nombres: 1 }),
          correction:
            "Entre deux entiers, il y a 5 sauts : chaque saut vaut $\\dfrac{1}{5}$.\na) $2 = \\dfrac{10}{5}$. A est 3 sauts après 2 : $\\dfrac{13}{5}$.\n$3 = \\dfrac{15}{5}$. B est 2 sauts après 3 : $\\dfrac{17}{5}$.\nb) $\\dfrac{13}{5} = 2 + \\dfrac{3}{5}$ et $\\dfrac{17}{5} = 3 + \\dfrac{2}{5}$.\n⛔ Le piège : écrire $\\dfrac{3}{5}$ pour A. La droite ne commence pas à 0 : il faut compter les 2 unités d'avant.\nRéponse : a) A : $\\dfrac{13}{5}$ ; B : $\\dfrac{17}{5}$ ; b) $2 + \\dfrac{3}{5}$ et $3 + \\dfrac{2}{5}$.",
          micros: ["fraction_mixte_ecrire", "fraction_encadrer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je compte en parts, puis je fais les paquets.",
      rappel: [
        "Un entier s'écrit dans les parts de la fraction : 3 = 15 cinquièmes.",
        "« Entier + fraction » : je cherche les paquets complets avec la table, le reste va dans la fraction.",
        "Je vérifie sur le dessin : la fraction est entre deux entiers qui se suivent.",
      ],
      exercices: [
        {
          titre: "Les tartes de la boulangerie",
          enonce: "Sofia, boulangère, coupe ses tartes aux pommes en 6 parts égales. Ce matin, elle vend 17 parts.\na) Quelle fraction de tarte a-t-elle vendue ?\nb) Écris-la « entier + fraction ».\nc) Entre combien de tartes entières se trouve cette vente ?\nd) Combien de parts manque-t-il pour vendre 3 tartes entières ?",
          figure: barres([{ d: 6, label: "tartes", parts: [17], fois: 3 }]),
          correction:
            "a) Une part, c'est $\\dfrac{1}{6}$ de tarte. 17 parts : $\\dfrac{17}{6}$ de tarte.\nb) 2 × 6 = 12 : $\\dfrac{17}{6} = \\dfrac{12}{6} + \\dfrac{5}{6} = 2 + \\dfrac{5}{6}$.\nc) $2 < \\dfrac{17}{6} < 3$ : entre 2 et 3 tartes.\nd) 3 tartes = 3 × 6 = 18 parts. 18 − 17 = 1 part manque.\n⛔ Le piège : dire « 17 tartes ». Sofia vend 17 PARTS, des sixièmes de tarte.\nRéponse : a) $\\dfrac{17}{6}$ ; b) $2 + \\dfrac{5}{6}$ ; c) entre 2 et 3 ; d) 1 part.",
          micros: ["fraction_mixte_ecrire", "fraction_encadrer"],
        },
        {
          titre: "Le train",
          enonce: "Maëlle, conductrice de train, fait un trajet aller de $\\dfrac{9}{4}$ heures.\na) Écris cette durée « entier + fraction ».\nb) Un quart d'heure dure 15 minutes. Écris la durée en heures et minutes.\nc) Écris la durée avec une virgule.\nd) Le retour dure $2 + \\dfrac{1}{2}$ heures. Quel trajet est le plus long ?",
          correction:
            "a) 2 × 4 = 8 : $\\dfrac{9}{4} = \\dfrac{8}{4} + \\dfrac{1}{4} = 2 + \\dfrac{1}{4}$ heures.\nb) 2 heures et un quart d'heure : 2 h 15 min.\nc) Un quart = 0,25 : $\\dfrac{9}{4} = 2{,}25$ heures.\nd) $2 + \\dfrac{1}{2} = \\dfrac{10}{4}$ (une moitié = 2 quarts). Et $\\dfrac{10}{4} > \\dfrac{9}{4}$ : le retour est plus long, de 15 minutes.\n⛔ Le piège du b) : écrire 2 h 25 min en lisant 2,25. Un quart d'heure, c'est 15 minutes, pas 25.\nRéponse : a) $2 + \\dfrac{1}{4}$ ; b) 2 h 15 min ; c) 2,25 heures ; d) le retour.",
          schema: droiteRel(0, 3, 0.25, [
            { value: 2.25, label: "aller" },
            { value: 2.5, label: "retour", color: VERT },
          ], { nombres: 1 }),
          micros: ["fraction_mixte_ecrire", "fraction_encadrer"],
        },
        {
          titre: "Les rubans de la couturière",
          enonce: "Zoé, couturière, a $3 + \\dfrac{2}{5}$ mètres de ruban. Elle le coupe en morceaux de $\\dfrac{1}{5}$ de mètre.\na) Combien de morceaux obtient-elle ?\nb) Écris la longueur du ruban avec une seule fraction.\nc) Elle coud 12 morceaux sur une robe. Écris cette longueur « entier + fraction ».\nd) Combien de morceaux lui restent ? Quelle longueur cela fait-il ?",
          figure: barres([{ d: 5, label: "ruban", parts: [17], fois: 4 }]),
          correction:
            "a) 1 mètre = 5 morceaux. 3 mètres = 3 × 5 = 15 morceaux. Et 2 de plus : 15 + 2 = 17 morceaux.\nb) $3 + \\dfrac{2}{5} = \\dfrac{17}{5}$ mètres.\nc) 12 morceaux : $\\dfrac{12}{5}$ m. Et 2 × 5 = 10 : $\\dfrac{12}{5} = \\dfrac{10}{5} + \\dfrac{2}{5} = 2 + \\dfrac{2}{5}$ m.\nd) 17 − 12 = 5 morceaux. $\\dfrac{5}{5} = 1$ : il reste 1 mètre.\n⛔ Le piège du a) : répondre 5 morceaux (3 + 2). Chaque mètre entier donne 5 morceaux.\nRéponse : a) 17 ; b) $\\dfrac{17}{5}$ ; c) $2 + \\dfrac{2}{5}$ m ; d) 5 morceaux, 1 mètre.",
          micros: ["fraction_mixte_regrouper", "fraction_mixte_ecrire"],
        },
        {
          titre: "Qui suis-je ?",
          enonce: "Je suis une fraction de dénominateur 4.\nIndice 1 : je suis entre 3 et 4.\nIndice 2 : mon numérateur est impair.\nIndice 3 : je suis plus grande que $3 + \\dfrac{1}{2}$.\na) Écris 3, puis 4, puis $3 + \\dfrac{1}{2}$ en quarts.\nb) Qui suis-je ?\nc) Écris-moi « entier + fraction », puis avec une virgule.",
          figure: droiteRel(3, 4, 0.25, [{ value: 3.5, label: "3 + 1/2" }], { nombres: 1 }),
          correction:
            "a) $3 = \\dfrac{12}{4}$ ; $4 = \\dfrac{16}{4}$ ; $3 + \\dfrac{1}{2} = \\dfrac{14}{4}$ (une moitié = 2 quarts).\nb) Indice 1 : mon numérateur est entre 12 et 16. Il vaut 13, 14 ou 15.\nIndice 2 : il est impair, il reste 13 ou 15.\nIndice 3 : il dépasse 14. Je suis $\\dfrac{15}{4}$.\nc) $\\dfrac{15}{4} = 3 + \\dfrac{3}{4} = 3{,}75$.\n⛔ Le piège : chercher un numérateur entre 3 et 4. Il faut d'abord écrire 3 et 4 en QUARTS.\nRéponse : b) $\\dfrac{15}{4}$ ; c) $3 + \\dfrac{3}{4}$ et 3,75.",
          micros: ["fraction_encadrer", "fraction_mixte_regrouper", "fraction_mixte_ecrire"],
        },
      ],
    },
  ],
};
