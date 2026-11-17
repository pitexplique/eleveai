// ─── Fiche d'exercices : partages et groupements (CE2) — 20 exercices ─────────
//
// 17/11/2026 : la feuille interactive de la notion `division` du coach CE2
// (« Partages et groupements », 5 micros). Sur la forme des feuilles du CM1
// (`maths-cm1-masse.tsx`, `maths-cm1-division.tsx`) et du CE1
// (`maths-ce1-division-partage.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/division.bank.ts`) : le sens de la
// division (partage, groupement) et le signe ÷, le lien avec la
// multiplication, le reste à interpréter, la division dans un problème.
// ⛔ LIMITES DU CE2 : PAS de division posée (elle arrive au CM1). Le quotient
// se trouve dans les tables (de 2 à 10), ou par doubles et moitiés. Le signe
// « ÷ » est au programme (« utiliser le symbole ÷ ») ; jamais « 24/4 ».
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre.
// L'écriture « 24 ÷ 4 » est vérifiée à la lettre (`exact`).
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : multiplier au lieu de partager (1, 4), 18 ÷ 2 = 8 (2),
// lire le fait connu à l'envers (3), oublier le reste (5, 12), table mal
// récitée (6, 7), confondre la part et le nombre de groupes (8, 16), jeter
// les élèves qui restent (9, 17), compter le reste comme une recette (10),
// partager entre 2 au lieu de 3 (11), diviser par 2 au lieu de 4 (13),
// oublier la 2e question (14), un reste plus grand que le diviseur (15),
// compter les fleurs au lieu de l'argent (18), partager avant d'enlever (19),
// confondre ce qui reste et ce qui manque (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 12), école (4, 9), billes (5),
// friandises (8), pâtisserie (10), vide-grenier (11), randonnée (14),
// chocolats (16), fête de l'école (17), fleuriste (18), cartes à
// collectionner (19), apiculture (20).
// Les métiers : pâtissier (10), guide de montagne (14), fleuriste (18),
// apicultrice (20).
// UN SEUL contexte réunionnais (14, une randonnée à Cilaos, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le tout en jetons rangés par dix (`jetons`), un rectangle
// de billes pour un fait connu (`billes`) : le dessin montre le tout, jamais
// les parts déjà faites.
//
// Micro-compétences (5/5) : ce2_division_sens (1, 2, 4, 8, 16),
// ce2_division_lien_multiplication (2, 3, 6, 7, 11, 13, 16),
// ce2_division_reste (5, 9, 10, 12, 15, 17, 18, 20), ce2_division_probleme
// (9, 10, 11, 14, 18, 19), ce2_division_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { jetons } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

export const exercicesDivisionCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "division",
  titre: "Partages et groupements",
  accroche:
    "Vingt exercices, du plus facile au défi. Partager en parts égales, faire des groupes, écrire avec le signe ÷. Retrouver une division dans une table de multiplication. Savoir quoi faire du reste. Des voitures, des recettes, une randonnée, des roses et des pots de miel. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le résultat seul.",
      rappel: [
        "24 jetons partagés entre 4 enfants : on écrit 24 ÷ 4.",
        "Je cherche dans la table : 4 × 6 = 24, donc 24 ÷ 4 = 6.",
        "Ce qu'on ne peut pas partager s'appelle le reste.",
      ],
      exercices: [
        {
          enonce: "On partage ces 24 jetons entre 4 enfants. Chacun a la même part.\na) Écris la division avec le signe ÷.\nb) Combien de jetons a chaque enfant ?",
          figure: jetons(24),
          correction:
            "a) 24 jetons partagés en 4 parts égales : j'écris 24 ÷ 4.\nb) Je cherche dans la table de 4 : 4 × 6 = 24.\nDonc 24 ÷ 4 = 6. Chaque enfant a 6 jetons.\nJe vérifie : 6 + 6 + 6 + 6 = 24.\n⛔ Le piège : multiplier, 24 × 4. On partage, chaque part est plus petite que le tout.\nRéponse : a) 24 ÷ 4 ; b) 6.",
          micros: ["ce2_division_sens"],
          reponses: [
            { question: "a)", attendu: ["24 ÷ 4", "24 : 4"], exact: true },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Calcule.\na) 15 ÷ 3\nb) 20 ÷ 5\nc) 18 ÷ 2\nd) 70 ÷ 10",
          correction:
            "Je cherche le facteur qui manque dans la table.\na) 3 × 5 = 15, donc 15 ÷ 3 = 5.\nb) 5 × 4 = 20, donc 20 ÷ 5 = 4.\nc) 2 × 9 = 18, donc 18 ÷ 2 = 9. C'est la moitié de 18.\nd) 10 × 7 = 70, donc 70 ÷ 10 = 7.\n⛔ Le piège du c) : répondre 8. 2 × 8 = 16, pas 18.\nRéponse : a) 5 ; b) 4 ; c) 9 ; d) 7.",
          micros: ["ce2_division_sens", "ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["9", "neuf"] },
            { question: "d)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Je sais que 6 × 7 = 42.\na) Combien fait 42 ÷ 6 ?\nb) Combien fait 42 ÷ 7 ?",
          figure: billes([{ rangees: 6, colonnes: 7 }]),
          correction:
            "Le rectangle a 6 rangées de 7 billes : 42 billes.\na) 42 billes en 6 rangées : chaque rangée a 7 billes. 42 ÷ 6 = 7.\nb) 42 billes en 7 colonnes : chaque colonne a 6 billes. 42 ÷ 7 = 6.\nUne multiplication donne deux divisions.\n⛔ Le piège : répondre 6 au a). Diviser par 6 donne l'autre facteur, 7.\nRéponse : a) 7 ; b) 6.",
          micros: ["ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "La maîtresse range 35 crayons dans des boîtes de 5.\na) Quel calcul faut-il faire ? A) 35 − 5 B) 35 ÷ 5 C) 35 × 5\nb) Combien de boîtes remplit-elle ?",
          correction:
            "a) Je fais des groupes de 5 dans 35 : c'est une division. 35 ÷ 5. Réponse B.\nb) Table de 5 : 5, 10, 15, 20, 25, 30, 35. C'est 7 × 5.\n35 ÷ 5 = 7. Elle remplit 7 boîtes.\n⛔ Le piège : faire 35 × 5 = 175. On cherche des boîtes, il y en a moins que de crayons.\nRéponse : a) B ; b) 7.",
          micros: ["ce2_division_sens"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Yanis range ces 17 billes dans des sachets de 5.\na) Combien de sachets pleins fait-il ?\nb) Combien de billes restent hors des sachets ?",
          figure: jetons(17, "#16a34a"),
          correction:
            "Je cherche dans la table de 5 : 5, 10, 15, 20. 20 est trop grand.\na) 3 × 5 = 15. Il fait 3 sachets pleins.\nb) 17 − 15 = 2. Il reste 2 billes.\nJ'écris : 17 = 3 × 5 + 2.\n⛔ Le piège : oublier les 2 billes qui restent.\nRéponse : a) 3 ; b) 2.",
          micros: ["ce2_division_reste"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Calcule avec les grandes tables.\na) 56 ÷ 8\nb) 54 ÷ 9\nc) 48 ÷ 6",
          correction:
            "a) Table de 8 : 8 × 7 = 56. Donc 56 ÷ 8 = 7.\nb) Table de 9 : 9 × 6 = 54. Donc 54 ÷ 9 = 6.\nc) Table de 6 : 6 × 8 = 48. Donc 48 ÷ 6 = 8.\n⛔ Le piège du b) : confondre avec 9 × 7 = 63. Je récite la table jusqu'au bon nombre.\nRéponse : a) 7 ; b) 6 ; c) 8.",
          micros: ["ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 30 ÷ 5 = 6\nb) 36 ÷ 4 = 8\nc) 9 × 3 = 27, donc 27 ÷ 3 = 9.",
          correction:
            "Je vérifie chaque division par une multiplication.\na) 5 × 6 = 30. Vrai.\nb) 4 × 8 = 32, pas 36. Faux. 4 × 9 = 36, donc 36 ÷ 4 = 9.\nc) 9 × 3 = 27 : 27 partagé en 3 donne 9. Vrai.\n⛔ Le piège du b) : croire la réponse sans vérifier.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: OUI },
            { question: "b)", attendu: NON },
            { question: "c)", attendu: OUI },
          ],
        },
        {
          enonce: "Lis bien ce que l'on cherche.\na) 20 bonbons pour 4 enfants. On cherche : A) la part de chacun B) le nombre de groupes\nb) 20 bonbons, 4 par sachet. On cherche : A) la part de chacun B) le nombre de sachets\nc) Calcule 20 ÷ 4.",
          correction:
            "a) On partage entre 4 enfants : on cherche ce que reçoit chacun. Réponse A.\nb) On fait des sachets de 4 : on cherche combien de sachets. Réponse B.\nc) 4 × 5 = 20, donc 20 ÷ 4 = 5.\nLes deux histoires donnent le même calcul : 5 bonbons chacun, ou 5 sachets.\n⛔ Le piège : croire que la division ne sert qu'à partager.\nRéponse : a) A ; b) B ; c) 5.",
          micros: ["ce2_division_sens"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je divise, puis je me demande quoi faire du reste.",
      rappel: [
        "26 = 6 × 4 + 2 : 6 groupes de 4, et il reste 2.",
        "Le reste est toujours plus petit que la taille d'un groupe.",
        "S'il reste des personnes, il faut parfois une voiture de plus.",
      ],
      exercices: [
        {
          enonce: "26 élèves partent en sortie. Chaque voiture emmène 4 élèves.\na) Combien de voitures sont pleines ?\nb) Combien de voitures faut-il en tout ?",
          correction:
            "Je cherche dans la table de 4 : 4 × 6 = 24, 4 × 7 = 28. 28 est trop grand.\na) 26 = 6 × 4 + 2. 6 voitures sont pleines.\nb) Il reste 2 élèves. Ils ne restent pas sur le trottoir ! Il faut une voiture de plus.\n6 + 1 = 7 voitures.\n⛔ Le piège du b) : répondre 6 et oublier les 2 élèves.\nRéponse : a) 6 ; b) 7.",
          micros: ["ce2_division_reste", "ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Un pâtissier a 45 œufs. Une recette de gâteau demande 6 œufs.\na) Combien de gâteaux peut-il faire ?\nb) Combien d'œufs lui restent ?",
          correction:
            "Table de 6 : 6 × 7 = 42, 6 × 8 = 48. 48 est trop grand.\na) 45 = 7 × 6 + 3. Il peut faire 7 gâteaux.\nb) 45 − 42 = 3. Il lui reste 3 œufs.\n⛔ Le piège : compter un 8e gâteau. Avec 3 œufs, il ne peut pas en faire un de plus.\nRéponse : a) 7 ; b) 3.",
          micros: ["ce2_division_reste", "ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Trois amis gagnent 27 € au vide-grenier. Ils partagent en parts égales.\na) Combien chaque ami reçoit-il ?\nb) Vérifie : 3 × … = 27.",
          correction:
            "a) 27 € partagés entre 3 : 27 ÷ 3.\nTable de 3 : 3, 6, 9, 12, 15, 18, 21, 24, 27. C'est 3 × 9.\n27 ÷ 3 = 9. Chaque ami reçoit 9 €.\nb) 3 × 9 = 27. Le compte est bon.\n⛔ Le piège : partager entre 2, comme si on était seulement deux amis.\nRéponse : a) 9 ; b) 9.",
          micros: ["ce2_division_lien_multiplication", "ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["9", "neuf"] },
          ],
        },
        {
          enonce: "Ravi a 50 billes. Il fait des tas de 8 billes.\na) Combien de tas fait-il ?\nb) Combien de billes restent ?\nc) Peut-il faire un tas de plus ? Réponds oui ou non.",
          correction:
            "Table de 8 : 8 × 6 = 48, 8 × 7 = 56. 56 est trop grand.\na) 50 = 6 × 8 + 2. Il fait 6 tas.\nb) 50 − 48 = 2. Il reste 2 billes.\nc) Un tas demande 8 billes. Il n'en a que 2. Non.\n⛔ Le piège : oublier le reste et dire que 50 ÷ 8 tombe juste.\nRéponse : a) 6 ; b) 2 ; c) non.",
          micros: ["ce2_division_reste"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: NON },
          ],
        },
        {
          enonce: "Calcule avec les doubles et les moitiés.\na) 60 ÷ 2\nb) 80 ÷ 4\nc) 100 ÷ 4",
          correction:
            "a) 60 ÷ 2, c'est la moitié de 60 : 30. Car 2 × 30 = 60.\nb) ÷ 4, c'est la moitié de la moitié. La moitié de 80 : 40. La moitié de 40 : 20.\nc) La moitié de 100 : 50. La moitié de 50 : 25. Car 4 × 25 = 100.\n⛔ Le piège : prendre une seule moitié pour ÷ 4, et écrire 40 au b).\nRéponse : a) 30 ; b) 20 ; c) 25.",
          micros: ["ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "25" },
          ],
        },
        {
          enonce: "À Cilaos, une guide emmène 32 randonneurs. Elle fait des groupes de 8.\na) Combien de groupes fait-elle ?\nb) Elle partage 40 bananes entre les groupes. Combien de bananes par groupe ?",
          correction:
            "a) Des groupes de 8 dans 32 : 32 ÷ 8. 8 × 4 = 32. Elle fait 4 groupes.\nb) 40 bananes partagées entre 4 groupes : 40 ÷ 4. 4 × 10 = 40.\nChaque groupe a 10 bananes.\n⛔ Le piège du b) : partager entre 8, la taille d'un groupe. Il y a 4 groupes.\nRéponse : a) 4 ; b) 10.",
          micros: ["ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Léo dit : « 28 ÷ 4, ça fait 6, et il reste 4. »\na) Léo a-t-il juste ? Réponds oui ou non.\nb) Combien fait 28 ÷ 4 ?",
          correction:
            "a) Le reste, 4, est aussi grand qu'un groupe de 4. Avec lui, on fait encore un groupe.\nLéo n'a pas juste : non.\nb) 4 × 7 = 28. Donc 28 ÷ 4 = 7, et il ne reste rien.\n⛔ Le piège : garder un reste plus grand que le diviseur, ou égal.\nRéponse : a) non ; b) 7.",
          micros: ["ce2_division_reste"],
          reponses: [
            { question: "a)", attendu: NON },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Une boîte de 36 chocolats est rangée en 4 rangées égales.\na) Combien de chocolats par rangée ?\nb) Une autre boîte de 36 a 6 rangées égales. Combien par rangée ?",
          correction:
            "a) 36 partagés en 4 rangées : 36 ÷ 4. 4 × 9 = 36. 9 chocolats par rangée.\nb) 36 ÷ 6. 6 × 6 = 36. 6 chocolats par rangée.\nPlus il y a de rangées, moins il y a de chocolats dans chacune.\n⛔ Le piège : répondre 4 ou 6, le nombre de rangées. On cherche la part d'une rangée.\nRéponse : a) 9 ; b) 6.",
          micros: ["ce2_division_sens", "ce2_division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["6", "six"] },
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
        "Je dessine au brouillon : des ronds, des groupes, des tables.",
        "Le reste : je le garde, je le jette, ou il faut un groupe de plus.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "La fête de l'école",
          enonce: "60 enfants viennent à la fête. On met 8 enfants par table.\na) Combien de tables sont pleines ?\nb) Combien d'enfants sont à la dernière table ?\nc) Combien de tables faut-il en tout ?",
          correction:
            "Table de 8 : 8 × 7 = 56, 8 × 8 = 64. 64 est trop grand.\na) 60 = 7 × 8 + 4. 7 tables sont pleines.\nb) 60 − 56 = 4. 4 enfants sont à la dernière table.\nc) 7 tables pleines et 1 table pour les 4 enfants : 8 tables.\n⛔ Le piège du c) : répondre 7 et laisser 4 enfants debout.\nRéponse : a) 7 ; b) 4 ; c) 8.",
          micros: ["ce2_division_defi", "ce2_division_reste"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "Les bouquets du fleuriste",
          enonce: "Le fleuriste a 47 roses. Il fait des bouquets de 5 roses.\nIl vend chaque bouquet 6 €.\na) Combien de bouquets fait-il ?\nb) Combien de roses restent seules ?\nc) Il vend tous ses bouquets. Combien gagne-t-il ?",
          correction:
            "Table de 5 : 5 × 9 = 45, 5 × 10 = 50. 50 est trop grand.\na) 47 = 9 × 5 + 2. Il fait 9 bouquets.\nb) 47 − 45 = 2. Il reste 2 roses.\nc) 9 bouquets à 6 € : 9 × 6 = 54. Il gagne 54 €.\n⛔ Le piège du c) : multiplier les 47 roses par 6. Il vend des bouquets, pas des roses.\nRéponse : a) 9 ; b) 2 ; c) 54.",
          micros: ["ce2_division_defi", "ce2_division_reste", "ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: "54" },
          ],
        },
        {
          titre: "Les cartes de Lina",
          enonce: "Lina a 30 cartes. Elle en garde 6 pour elle.\nElle partage les autres entre 4 amis, en parts égales.\na) Combien de cartes partage-t-elle ?\nb) Combien de cartes reçoit chaque ami ?",
          correction:
            "a) Elle garde 6 cartes : 30 − 6 = 24. Elle partage 24 cartes.\nb) 24 cartes entre 4 amis : 24 ÷ 4. 4 × 6 = 24.\nChaque ami reçoit 6 cartes.\n⛔ Le piège : partager les 30 cartes, sans enlever celles de Lina.\nRéponse : a) 24 ; b) 6.",
          micros: ["ce2_division_defi", "ce2_division_probleme"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Les pots de l'apicultrice",
          enonce: "Une apicultrice a 68 pots de miel. Elle les range dans des cartons de 9.\na) Combien de cartons pleins remplit-elle ?\nb) Combien de pots restent hors des cartons ?\nc) Combien de pots manque-t-il pour remplir un carton de plus ?",
          correction:
            "Table de 9 : 9 × 7 = 63, 9 × 8 = 72. 72 est trop grand.\na) 68 = 7 × 9 + 5. Elle remplit 7 cartons.\nb) 68 − 63 = 5. Il reste 5 pots.\nc) Un carton prend 9 pots. Elle en a 5. 9 − 5 = 4. Il manque 4 pots.\n⛔ Le piège du c) : répondre 5. 5, c'est ce qui reste ; 4, c'est ce qui manque.\nRéponse : a) 7 ; b) 5 ; c) 4.",
          micros: ["ce2_division_defi", "ce2_division_reste"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
      ],
    },
  ],
};
