// ─── Fiche d'exercices : les nombres jusqu'à 10 000 (CE2) — 20 exercices ──────
//
// 17/11/2026 : la feuille interactive de la notion `nombre_entier` du coach
// CE2 (« Nombres jusqu'à 10 000 », 7 micros). Sur la forme des feuilles du
// CM1 (`maths-cm1-masse.tsx`, `maths-cm1-nombre-entier.tsx`) et du CE1
// (`maths-ce1-nombre-entier.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/nombres-entiers.bank.ts`) : lire,
// écrire, milliers-centaines-dizaines-unités, décomposer, comparer, ranger,
// encadrer, placer sur une droite graduée.
// ⛔ LIMITES DU CE2 : nombres jusqu'à 10 000 ; pas d'arrondi (cycle 3), on
// s'en tient à l'encadrement.
// ⛔ Aucune question à rédiger : QCM par lettre, signe <, > ou =, un nombre.
// L'écriture en lettres se lit en QCM (on ne fait pas taper l'orthographe).
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : compter les plaques comme des barres (1), oublier le
// zéro d'un rang vide (2, 3, 11), confondre le chiffre des centaines et le
// nombre de centaines (4, 10), coller les nombres de la décomposition (5,
// 16), comparer le dernier chiffre au lieu du premier (6, 9), prendre la
// mauvaise centaine (7, 12), compter les graduations de 1 en 1 (8, 13, 19),
// mettre le plus petit chiffre en premier au lieu du zéro (15), lire les
// mots dans l'ordre de l'énoncé (11), écrire 3 1 462 (18), le plus près
// n'est pas le plus grand (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : villages (9), boulangerie (10), vélo (12),
// randonnée (13), marché (14), jeu de cartes (15), usine de bouchons (18),
// course à pied (19), kermesse (20).
// Les métiers : boulanger (10), marchand (14), ouvrière (18).
// UN SEUL contexte réunionnais (14, les letchis au marché de Saint-Paul, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le matériel de numération jusqu'à 9 999 (`baseDixMille`,
// avec le cube de mille), la droite graduée (`droiteRel`) : le dessin montre
// ce qu'on sait, jamais le nombre cherché.
//
// Micro-compétences (7/7) : ce2_entier_lire_ecrire (1, 2, 3, 11),
// ce2_entier_milliers (1, 4, 10, 15, 17), ce2_entier_decomposer (5, 11, 16,
// 18), ce2_entier_comparer (6, 9, 14, 15, 20), ce2_entier_encadrer (7, 12,
// 20), ce2_entier_droite (8, 13, 19), ce2_entier_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDixMille } from "@/lib/fiches-exercices/dessins-ce2-lotF";

export const exercicesNombreEntierCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "nombre-entier",
  titre: "Les nombres jusqu'à 10 000",
  accroche:
    "Vingt exercices, du plus facile au défi. Lire et écrire les nombres jusqu'à 10 000. Milliers, centaines, dizaines et unités. Décomposer, comparer, ranger, encadrer. Placer un nombre sur une droite graduée. Des villages, une boulangerie, un vélo, des letchis et une course. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le résultat seul.",
      rappel: [
        "1 millier = 10 centaines. 1 centaine = 10 dizaines. 1 dizaine = 10 unités.",
        "Dans 4 507 : 4 milliers, 5 centaines, 0 dizaine, 7 unités.",
        "Pour comparer, je regarde d'abord les milliers, puis les centaines.",
      ],
      exercices: [
        {
          enonce: "Regarde le matériel.\na) Combien y a-t-il de gros cubes de mille ?\nb) Combien y a-t-il de plaques de cent ?\nc) Quel nombre est représenté ?",
          figure: baseDixMille(2, 3, 4, 5),
          correction:
            "a) Les gros cubes valent mille chacun. J'en compte 2.\nb) Les plaques carrées valent cent. J'en compte 3.\nc) Je compte aussi 4 barres de dix et 5 petits cubes.\n2 milliers, 3 centaines, 4 dizaines, 5 unités : 2 000 + 300 + 40 + 5 = 2 345.\n⛔ Le piège : compter les plaques comme des barres. Une plaque, c'est 10 barres.\nRéponse : a) 2 ; b) 3 ; c) 2 345.",
          micros: ["ce2_entier_milliers", "ce2_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: "2 345" },
          ],
        },
        {
          enonce: "Comment s'écrit le nombre en chiffres ?\na) Trois mille deux cent cinq. A) 3 250 B) 3 205 C) 30 205\nb) Deux mille quarante. A) 2 040 B) 2 400 C) 2 004",
          correction:
            "a) Trois mille : 3 milliers. Deux cent : 2 centaines. Cinq : 5 unités.\nIl n'y a pas de dizaines : j'écris 0 au rang des dizaines. 3 205. Réponse B.\nb) Deux mille : 2 milliers. Pas de centaines : 0. Quarante : 4 dizaines. Pas d'unités : 0.\nJ'écris 2 040. Réponse A.\n⛔ Le piège : oublier le 0 d'un rang vide. Un nombre en milliers a toujours 4 chiffres.\nRéponse : a) B ; b) A.",
          micros: ["ce2_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce: "Comment se lit le nombre ?\na) 4 070. A) quatre mille sept B) quatre mille soixante-dix C) quatre cent soixante-dix\nb) 6 008. A) six mille huit B) six mille quatre-vingts C) soixante mille huit",
          correction:
            "a) 4 070 : 4 milliers, 0 centaine, 7 dizaines, 0 unité.\n7 dizaines, c'est soixante-dix. Je lis « quatre mille soixante-dix ». Réponse B.\nb) 6 008 : 6 milliers, 0 centaine, 0 dizaine, 8 unités.\nJe lis « six mille huit ». Réponse A.\n⛔ Le piège : lire le 7 de 4 070 comme des unités. Il est au rang des dizaines.\nRéponse : a) B ; b) A.",
          micros: ["ce2_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce: "Regarde le nombre 5 382.\na) Quel est le chiffre des centaines ?\nb) Quel est le chiffre des milliers ?\nc) Quel est le chiffre des unités ?",
          correction:
            "Je lis les rangs de droite à gauche : unités, dizaines, centaines, milliers.\n5 382 : 2 unités, 8 dizaines, 3 centaines, 5 milliers.\na) Le chiffre des centaines est 3.\nb) Le chiffre des milliers est 5.\nc) Le chiffre des unités est 2.\n⛔ Le piège : lire de gauche à droite et prendre 8 pour les centaines.\nRéponse : a) 3 ; b) 5 ; c) 2.",
          micros: ["ce2_entier_milliers"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Complète.\na) 4 000 + 600 + 20 + 7 = …\nb) 7 352 = 7 000 + … + 50 + 2\nc) 3 000 + 8 = …",
          correction:
            "a) 4 milliers, 6 centaines, 2 dizaines, 7 unités : 4 627.\nb) 7 352 : le 3 est au rang des centaines. Il vaut 300.\nc) 3 milliers et 8 unités. Pas de centaines, pas de dizaines : 3 008.\n⛔ Le piège du c) : coller 3 et 8, et écrire 38. Il faut les deux 0.\nRéponse : a) 4 627 ; b) 300 ; c) 3 008.",
          micros: ["ce2_entier_decomposer"],
          reponses: [
            { question: "a)", attendu: "4 627" },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: "3 008" },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 3 450 … 3 405\nb) 999 … 1 002\nc) 6 200 … 6 000 + 200",
          correction:
            "a) Mêmes milliers, 3. Mêmes centaines, 4. Dizaines : 5 contre 0. 3 450 est plus grand. Donc >.\nb) 999 a 3 chiffres, 1 002 en a 4. Le nombre à 4 chiffres est plus grand. Donc <.\nc) 6 000 + 200 = 6 200. Les deux côtés sont égaux. Donc =.\n⛔ Le piège du b) : voir des 9 et croire que 999 est plus grand.\nRéponse : a) > ; b) < ; c) =.",
          micros: ["ce2_entier_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
          ],
        },
        {
          enonce: "Encadre le nombre.\na) 2 470 est entre 2 400 et …\nb) 5 830 est entre 5 000 et …",
          correction:
            "a) Je cherche les centaines autour de 2 470. 2 470 a 24 centaines et un peu plus.\nLa centaine juste après 2 400 est 2 500. 2 400 < 2 470 < 2 500.\nb) Je cherche les milliers autour de 5 830. Le millier juste après 5 000 est 6 000.\n5 000 < 5 830 < 6 000.\n⛔ Le piège du a) : répondre 3 000. On encadre entre deux centaines qui se suivent.\nRéponse : a) 2 500 ; b) 6 000.",
          micros: ["ce2_entier_encadrer"],
          reponses: [
            { question: "a)", attendu: "2 500" },
            { question: "b)", attendu: "6 000" },
          ],
        },
        {
          enonce: "Regarde la droite graduée.\na) Quel nombre est au point A ?\nb) Quel nombre est au point B ?",
          figure: droiteRel(3000, 4000, 100, [
            { value: 3200, label: "A" },
            { value: 3700, label: "B", color: "#ea580c" },
          ], { nombres: 1000 }),
          correction:
            "De 3 000 à 4 000, il y a 10 petits espaces. 1 000 partagé en 10 : chaque espace vaut 100.\na) A est 2 graduations après 3 000 : 3 000 + 200 = 3 200.\nb) B est 7 graduations après 3 000 : 3 000 + 700 = 3 700.\n⛔ Le piège : compter de 1 en 1 et répondre 3 002. Chaque graduation vaut 100.\nRéponse : a) 3 200 ; b) 3 700.",
          micros: ["ce2_entier_droite"],
          reponses: [
            { question: "a)", attendu: "3 200" },
            { question: "b)", attendu: "3 700" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je regarde chaque rang, des milliers aux unités.",
      rappel: [
        "Dans 3 600, le chiffre des centaines est 6. Mais il y a 36 centaines en tout.",
        "Pour ranger, je compare les milliers, puis les centaines, puis les dizaines.",
        "2 400 < 2 470 < 2 500 : j'encadre entre deux centaines qui se suivent.",
      ],
      exercices: [
        {
          enonce: "Quatre villages de montagne comptent leurs habitants.\nA : 2 315. B : 2 153. C : 3 125. D : 2 531.\na) Quel village a le moins d'habitants ?\nb) Quel village en a le plus ?\nc) Écris les quatre lettres, du plus petit au plus grand.",
          correction:
            "Je compare d'abord les milliers. C a 3 milliers, les autres 2. C est le plus grand.\nPour A, B et D, je compare les centaines : 3, 1 et 5.\nB (1 centaine) < A (3 centaines) < D (5 centaines).\na) Le plus petit : B, 2 153.\nb) Le plus grand : C, 3 125.\nc) 2 153 < 2 315 < 2 531 < 3 125 : B, A, D, C.\n⛔ Le piège : regarder le dernier chiffre. Les unités comptent en dernier.\nRéponse : a) B ; b) C ; c) B A D C.",
          micros: ["ce2_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: ["B ; A ; D ; C", "BADC"], ordre: true },
          ],
        },
        {
          enonce: "Le boulanger range ses 3 600 biscuits par paquets de 100.\na) Combien de paquets fait-il ?\nb) Combien y a-t-il de centaines en tout dans 2 500 ?",
          correction:
            "a) 1 paquet = 100 biscuits = 1 centaine. Je cherche combien de centaines dans 3 600.\n3 600, c'est 3 milliers et 6 centaines. 3 milliers = 30 centaines.\n30 + 6 = 36 centaines. Il fait 36 paquets.\nb) 2 500 : 2 milliers = 20 centaines, plus 5 centaines. 20 + 5 = 25 centaines.\n⛔ Le piège : répondre 6. C'est le chiffre des centaines, pas le nombre de centaines.\nRéponse : a) 36 ; b) 25.",
          micros: ["ce2_entier_milliers"],
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "25" },
          ],
        },
        {
          enonce: "Écris le nombre en chiffres.\na) 5 milliers, 8 dizaines et 2 unités.\nb) 9 centaines et 3 milliers.\nc) 4 milliers et 15 unités.",
          correction:
            "a) 5 milliers, 0 centaine, 8 dizaines, 2 unités : 5 082.\nb) Je range d'abord : 3 milliers, puis 9 centaines. 0 dizaine, 0 unité : 3 900.\nc) 15 unités = 1 dizaine et 5 unités. 4 milliers, 0 centaine, 1 dizaine, 5 unités : 4 015.\n⛔ Le piège du b) : écrire les chiffres dans l'ordre de la phrase, 9 puis 3.\nRéponse : a) 5 082 ; b) 3 900 ; c) 4 015.",
          micros: ["ce2_entier_decomposer", "ce2_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: "5 082" },
            { question: "b)", attendu: "3 900" },
            { question: "c)", attendu: "4 015" },
          ],
        },
        {
          enonce: "Le compteur du vélo de Léa affiche 1 386 km.\na) 1 386 est entre 1 380 et …\nb) 1 386 est entre 1 300 et …\nc) 1 386 est entre 1 000 et …",
          correction:
            "a) Entre deux dizaines : 1 386 a 138 dizaines et 6 unités. La dizaine suivante est 1 390.\nb) Entre deux centaines : après 1 300 vient 1 400. 1 300 < 1 386 < 1 400.\nc) Entre deux milliers : après 1 000 vient 2 000. 1 000 < 1 386 < 2 000.\n⛔ Le piège : répondre 1 387. On encadre entre deux dizaines, centaines ou milliers.\nRéponse : a) 1 390 ; b) 1 400 ; c) 2 000.",
          micros: ["ce2_entier_encadrer"],
          reponses: [
            { question: "a)", attendu: "1 390" },
            { question: "b)", attendu: "1 400" },
            { question: "c)", attendu: "2 000" },
          ],
        },
        {
          enonce: "Sur un sentier de randonnée, des bornes indiquent les mètres parcourus.\na) Quel nombre est au point A ?\nb) Quel nombre est au point B ?\nc) La borne 4 590 est-elle avant ou après B ? Écris avant ou après.",
          figure: droiteRel(4500, 4600, 10, [
            { value: 4530, label: "A" },
            { value: 4580, label: "B", color: "#ea580c" },
          ], { nombres: 50 }),
          correction:
            "De 4 500 à 4 550, il y a 5 espaces. 50 partagé en 5 : chaque espace vaut 10.\na) A est 3 graduations après 4 500 : 4 500 + 30 = 4 530.\nb) B est 3 graduations après 4 550 : 4 550 + 30 = 4 580.\nc) 4 590 > 4 580 : la borne 4 590 est après B, à droite.\n⛔ Le piège : croire qu'une graduation vaut 1. Ici, elle vaut 10.\nRéponse : a) 4 530 ; b) 4 580 ; c) après.",
          micros: ["ce2_entier_droite"],
          reponses: [
            { question: "a)", attendu: "4 530" },
            { question: "b)", attendu: "4 580" },
            { question: "c)", attendu: "après" },
          ],
        },
        {
          enonce: "Au marché de Saint-Paul, un marchand vend 1 250 letchis le samedi.\nLe dimanche, il en vend 1 205.\na) Quel jour en vend-il le plus ? A) le dimanche B) le samedi\nb) Combien de letchis de plus ce jour-là ?",
          correction:
            "a) Je compare 1 250 et 1 205. Mêmes milliers, mêmes centaines.\nDizaines : 5 contre 0. 1 250 > 1 205. Il en vend plus le samedi. Réponse B.\nb) De 1 205 à 1 250, j'avance de 45. 1 205 + 45 = 1 250.\nIl vend 45 letchis de plus le samedi.\n⛔ Le piège du a) : voir le 5 de 1 205 et croire qu'il est plus grand.\nRéponse : a) B ; b) 45.",
          micros: ["ce2_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "45" },
          ],
        },
        {
          enonce: "Inès a quatre cartes : 3, 8, 1 et 6.\nElle les utilise toutes une fois.\na) Écris le plus grand nombre possible.\nb) Écris le plus petit nombre possible.",
          correction:
            "a) Le plus grand chiffre va aux milliers : 8. Puis 6, puis 3, puis 1.\nLe plus grand nombre est 8 631.\nb) Le plus petit chiffre va aux milliers : 1. Puis 3, puis 6, puis 8.\nLe plus petit nombre est 1 368.\n⛔ Le piège : ranger les chiffres dans l'ordre des cartes, 3 816.\nRéponse : a) 8 631 ; b) 1 368.",
          micros: ["ce2_entier_milliers", "ce2_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "8 631" },
            { question: "b)", attendu: "1 368" },
          ],
        },
        {
          enonce: "Calcule.\na) 7 000 + 30 + 400 + 5 = …\nb) 3 000 + 12 centaines = …",
          correction:
            "a) Je range par rangs : 7 milliers, 4 centaines, 3 dizaines, 5 unités.\n7 000 + 400 + 30 + 5 = 7 435.\nb) 12 centaines = 1 200. Car 10 centaines font 1 millier.\n3 000 + 1 200 = 4 200.\n⛔ Le piège du a) : écrire les chiffres dans l'ordre, 7 345. Le 30 et le 400 sont mélangés.\nRéponse : a) 7 435 ; b) 4 200.",
          micros: ["ce2_entier_decomposer"],
          reponses: [
            { question: "a)", attendu: "7 435" },
            { question: "b)", attendu: "4 200" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je cherche une étape après l'autre.",
      rappel: [
        "J'écris le nombre dans un tableau : milliers, centaines, dizaines, unités.",
        "10 unités font une dizaine, 10 dizaines une centaine, 10 centaines un millier.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Le nombre mystère",
          enonce: "Je suis un nombre de 4 chiffres.\nMon chiffre des milliers est 6.\nMon chiffre des centaines est la moitié de 6.\nMon chiffre des dizaines est 0. Mon chiffre des unités est le double de 4.\na) Qui suis-je ?\nb) Quel nombre vient juste après moi ?",
          correction:
            "a) Milliers : 6. Centaines : la moitié de 6, c'est 3.\nDizaines : 0. Unités : le double de 4, c'est 8.\nJe range : 6, 3, 0, 8. Le nombre est 6 308.\nb) Juste après, j'ajoute 1 : 6 308 + 1 = 6 309.\n⛔ Le piège du a) : oublier le 0 des dizaines, et écrire 638.\nRéponse : a) 6 308 ; b) 6 309.",
          micros: ["ce2_entier_defi", "ce2_entier_milliers"],
          reponses: [
            { question: "a)", attendu: "6 308" },
            { question: "b)", attendu: "6 309" },
          ],
        },
        {
          titre: "L'usine de bouchons",
          enonce: "Une ouvrière range des bouchons : sacs de 1 000, boîtes de 100, paquets de 10.\nElle a 3 sacs, 14 boîtes, 6 paquets et 2 bouchons seuls.\na) Combien de bouchons a-t-elle en tout ?\nb) Combien de sacs pleins peut-elle faire avec tous ces bouchons ?",
          correction:
            "a) 3 sacs : 3 000. 14 boîtes : 1 400. 6 paquets : 60. Et 2 seuls.\n3 000 + 1 400 = 4 400. 4 400 + 60 + 2 = 4 462.\nb) 4 462 a 4 milliers. Elle peut faire 4 sacs de 1 000.\n⛔ Le piège du a) : écrire les nombres à la suite, 3 14 6 2. 14 boîtes font plus de 10 centaines.\nRéponse : a) 4 462 ; b) 4.",
          micros: ["ce2_entier_defi", "ce2_entier_decomposer"],
          reponses: [
            { question: "a)", attendu: "4 462" },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "La course de 5 000 mètres",
          enonce: "Ravi et Mia courent une course de 5 000 m. Ravi est en R, Mia est en M.\na) Combien de mètres Ravi a-t-il déjà courus ?\nb) Combien de mètres lui reste-t-il ?\nc) Qui est devant ? A) Ravi B) Mia",
          figure: droiteRel(0, 5000, 500, [
            { value: 3500, label: "R" },
            { value: 1500, label: "M", color: "#ea580c" },
          ], { nombres: 1000 }),
          correction:
            "De 0 à 1 000, il y a 2 espaces. Chaque graduation vaut 500.\na) R est au milieu entre 3 000 et 4 000 : 3 500 m.\nb) De 3 500 à 5 000 : 500 jusqu'à 4 000, puis 1 000. 500 + 1 000 = 1 500 m.\nc) M est à 1 500 m. 3 500 > 1 500 : Ravi est devant. Réponse A.\n⛔ Le piège du c) : croire que M est devant parce que la lettre est orange.\nRéponse : a) 3 500 ; b) 1 500 ; c) A.",
          micros: ["ce2_entier_defi", "ce2_entier_droite"],
          reponses: [
            { question: "a)", attendu: "3 500", unite: "m" },
            { question: "b)", attendu: "1 500", unite: "m" },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          titre: "Le bocal de la kermesse",
          enonce: "À la kermesse, un bocal contient 1 875 perles.\nLina dit 1 900, Tom dit 1 800, Sam dit 1 870.\na) 1 875 est entre 1 800 et …\nb) Qui est le plus près ? A) Lina B) Tom C) Sam\nc) De combien Sam se trompe-t-il ?",
          correction:
            "a) Entre deux centaines : 1 800 < 1 875 < 1 900.\nb) Je cherche l'écart avec 1 875 pour chacun.\nLina : de 1 875 à 1 900, il y a 25. Tom : de 1 800 à 1 875, il y a 75.\nSam : de 1 870 à 1 875, il y a 5. Sam est le plus près. Réponse C.\nc) Sam se trompe de 5 perles.\n⛔ Le piège du b) : choisir le plus grand nombre, 1 900. Le plus près n'est pas le plus grand.\nRéponse : a) 1 900 ; b) C ; c) 5.",
          micros: ["ce2_entier_defi", "ce2_entier_encadrer", "ce2_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "1 900" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },
  ],
};
