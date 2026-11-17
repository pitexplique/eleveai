// ─── Fiche d'exercices : partages et groupements (CE1) — 20 exercices ─────────
//
// 17/11/2026 : la feuille interactive de la notion `division_partage` du coach
// CE1 (« Partages et groupements », 4 micros). Sur la forme des feuilles du
// CM1 (`maths-cm1-masse.tsx`, `maths-cm1-division.tsx`) : 8 ★, 8 ★★, 4 ★★★,
// un rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/division-partage.bank.ts`) : chercher
// la valeur d'une part, chercher le nombre de parts, et le reste à
// interpréter (on le laisse de côté, ou il faut une boîte de plus).
// ⛔ LIMITES DU CE1 : la division n'est PAS une opération du CE1. On
// distribue, on groupe, on compte, et on vérifie par une multiplication. Ni
// « 18/3 », ni le signe ÷ (il arrive au CE2) : le mot « partager » suffit.
// ⛔ Aucune question à rédiger : QCM par lettre, vrai ou faux, un nombre.
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : donner tout à un seul enfant (1), confondre le nombre
// de boîtes et le nombre d'œufs par boîte (2, 4), un partage qui n'est pas
// égal (6, 15), oublier le reste (5, 8, 14), jeter les enfants qui restent
// (11), la page de plus (10), 20 partagés entre 4 donnant 4 (12, 15), lire
// la multiplication à l'envers (13), garder les biscuits dans le paquet (16),
// les œufs qui restent comptés comme une boîte (17), un paquet de moins (18),
// partager les 30 billes sans enlever celles de Sam (19), l'étape oubliée
// (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fruits (1), ferme (2, 8, 17), jeux (3, 19),
// sport (4), friandises (5), pâtisserie (6, 14), chaussures (7), école (9,
// 18), photos (10), sortie en barque (11), argent de poche (12), billes (13),
// cuisine (16), potager (20).
// Les métiers : fermier (2, 17), pâtissier (14), jardinière (20),
// animatrice (11).
// UN SEUL contexte réunionnais (1, des letchis, MODÈLE).
// Un exemple du programme : le fermier aux 75 œufs vendus par boîtes de 6
// (17) — programme du cycle 2, BO n° 41 du 31/10/2024, annexe 4. Le reste
// est MODÈLE.
//
// ⭐ LES DESSINS : le tout en jetons rangés par dix (`jetons`), des assiettes
// vides ou garnies (`assiettesVides`, `partages`), des rectangles de billes
// (`billes`) : le dessin montre le tout, jamais les parts déjà faites.
//
// Micro-compétences (4/4) : ce1_division_partage (1, 3, 5, 6, 9, 12, 13, 15,
// 16, 19, 20), ce1_division_groupement (2, 4, 7, 8, 10, 11, 13, 14, 17, 18,
// 20), ce1_division_reste (5, 8, 10, 11, 14, 15, 17, 18, 20),
// ce1_division_defi (14, 17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { assiettesVides, jetons, partages } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesDivisionPartageCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "division-partage",
  titre: "Partages et groupements",
  accroche:
    "Vingt exercices, du plus facile au défi. Partager en parts égales. Faire des paquets de même taille. Savoir ce qu'on fait des objets qui restent. Vérifier avec une multiplication. Des letchis, des œufs, des barques, des photos et un potager. Lis le rappel avant chaque niveau. Cherche d'abord : dessine des ronds au brouillon. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je distribue au brouillon, puis j'écris le nombre seul.",
      rappel: [
        "Partager en parts égales : chacun reçoit autant.",
        "Je distribue un par un, chacun son tour, jusqu'à la fin.",
        "Je vérifie avec une multiplication : 3 parts de 4, c'est 3 × 4 = 12.",
      ],
      exercices: [
        {
          enonce: "Maman partage 12 letchis entre 3 enfants.\nChacun reçoit autant.\nCombien de letchis reçoit chaque enfant ?",
          figure: jetons(12, "#dc2626"),
          correction:
            "Je distribue les letchis un par un aux 3 enfants.\nUn tour : 3 letchis donnés. Deux tours : 6. Trois tours : 9. Quatre tours : 12.\nJ'ai fait 4 tours : chaque enfant a 4 letchis.\nJe vérifie : 3 × 4 = 12.\n⛔ Le piège : donner tout à un enfant, puis ce qui reste aux autres. Les parts doivent être égales.\nRéponse : 4.",
          micros: ["ce1_division_partage"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Le fermier range 15 œufs dans des boîtes de 5.\nCombien de boîtes remplit-il ?",
          figure: jetons(15, "#fde68a"),
          correction:
            "Je fais des paquets de 5 œufs.\n1 boîte : 5. 2 boîtes : 10. 3 boîtes : 15.\nIl remplit 3 boîtes.\nJe vérifie : 3 × 5 = 15.\n⛔ Le piège : répondre 5. 5, c'est le nombre d'œufs dans une boîte, pas le nombre de boîtes.\nRéponse : 3.",
          micros: ["ce1_division_groupement"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Lou a 10 billes.\na) Elle les partage entre 2 amis. Combien chacun ?\nb) Elle les partage entre 5 amis. Combien chacun ?",
          correction:
            "a) 10 partagé entre 2 : chacun la moitié. 5 + 5 = 10.\nChaque ami a 5 billes. Je vérifie : 2 × 5 = 10.\nb) 10 partagé entre 5 : je distribue un tour, 5 billes. Deux tours, 10.\nChaque ami a 2 billes. Je vérifie : 5 × 2 = 10.\n⛔ Le piège du b) : croire que plus d'amis donne plus de billes. Plus on est, plus la part est petite.\nRéponse : a) 5 ; b) 2.",
          micros: ["ce1_division_partage"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Au sport, 20 élèves font des équipes de 4.\nCombien d'équipes y a-t-il ?",
          correction:
            "Je fais des groupes de 4 élèves. Je compte de 4 en 4.\n4, 8, 12, 16, 20 : j'ai fait 5 groupes.\nIl y a 5 équipes.\nJe vérifie : 5 × 4 = 20.\n⛔ Le piège : répondre 4. 4, c'est le nombre d'élèves dans une équipe.\nRéponse : 5.",
          micros: ["ce1_division_groupement"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Tom partage 7 bonbons entre 2 enfants, en parts égales.\na) Combien de bonbons reçoit chaque enfant ?\nb) Combien de bonbons restent ?",
          figure: jetons(7, "#db2777"),
          correction:
            "Je distribue deux par deux : 2, 4, 6. Trois tours.\nAprès 6 bonbons, il en reste 1. Je ne peux pas le donner sans faire de jaloux.\na) Chaque enfant reçoit 3 bonbons.\nb) Il reste 1 bonbon.\nJe vérifie : 2 × 3 + 1 = 7.\n⛔ Le piège : oublier le bonbon qui reste, ou donner 4 à l'un et 3 à l'autre.\nRéponse : a) 3 ; b) 1.",
          micros: ["ce1_division_reste", "ce1_division_partage"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
        {
          enonce: "Un pâtissier pose 12 macarons sur 3 assiettes.\nQuel partage est juste : A, B ou C ?",
          figure: partages([
            { nom: "A", parts: [5, 4, 3] },
            { nom: "B", parts: [4, 4, 4] },
            { nom: "C", parts: [6, 6, 0] },
          ]),
          correction:
            "Je compte les macarons de chaque assiette.\nA : 5, 4 et 3. Les parts ne sont pas égales.\nB : 4, 4 et 4. Les trois parts sont égales. Et 4 + 4 + 4 = 12.\nC : 6, 6 et 0. Une assiette est vide : ce n'est pas égal.\n⛔ Le piège : choisir A parce qu'il y a 12 macarons en tout. Le total ne suffit pas : les parts doivent être égales.\nRéponse : B.",
          micros: ["ce1_division_partage"],
          reponses: [{ attendu: ["B"] }],
        },
        {
          enonce: "Dans le vestiaire, il y a 16 chaussures.\nCombien de paires de chaussures y a-t-il ?",
          correction:
            "Une paire, c'est 2 chaussures. Je fais des groupes de 2.\nJe compte de 2 en 2 : 2, 4, 6, 8, 10, 12, 14, 16.\nJ'ai compté 8 fois : 8 paires.\nJe vérifie : 8 × 2 = 16.\n⛔ Le piège : répondre 16. On demande les paires, pas les chaussures.\nRéponse : 8.",
          micros: ["ce1_division_groupement"],
          reponses: [{ attendu: ["8", "huit"] }],
        },
        {
          enonce: "Le fermier a 13 œufs. Il remplit des boîtes de 6.\na) Combien de boîtes pleines a-t-il ?\nb) Combien d'œufs restent hors des boîtes ?",
          figure: jetons(13, "#fde68a"),
          correction:
            "Je fais des paquets de 6 : 6, puis 12.\nAvec 2 boîtes, j'ai rangé 12 œufs. Il n'y en a pas assez pour une 3e boîte.\na) 2 boîtes pleines.\nb) 13 − 12 = 1 œuf reste.\n⛔ Le piège : compter l'œuf qui reste comme une boîte. Une boîte pleine a 6 œufs.\nRéponse : a) 2 ; b) 1.",
          micros: ["ce1_division_reste", "ce1_division_groupement"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["1", "un"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je cherche : combien de parts, ou combien dans chaque part ? Puis je regarde le reste.",
      rappel: [
        "Combien chacun ? Je distribue. Combien de paquets ? Je groupe.",
        "Il reste des objets ? Je relis l'histoire : on les laisse, ou il faut un paquet de plus ?",
        "5 × 6 = 30 : 30 en 5 parts, c'est 6. 30 en paquets de 6, c'est 5 paquets.",
      ],
      exercices: [
        {
          enonce: "La maîtresse range 24 crayons dans 4 pots.\nChaque pot a autant de crayons.\nCombien de crayons y a-t-il dans chaque pot ?",
          correction:
            "Je distribue 1 crayon par pot : un tour, c'est 4 crayons.\nJe compte les tours de 4 en 4 : 4, 8, 12, 16, 20, 24.\nJ'ai fait 6 tours : 6 crayons par pot.\nJe vérifie : 4 × 6 = 24.\n⛔ Le piège : répondre 4, le nombre de pots.\nRéponse : 6.",
          micros: ["ce1_division_partage"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Dans un album, on colle 10 photos par page.\na) Pour 30 photos, combien de pages faut-il ?\nb) Pour 35 photos, combien de pages faut-il ?",
          correction:
            "a) Je compte de 10 en 10 : 10, 20, 30. Il faut 3 pages pleines.\nb) 3 pages font 30 photos. Il reste 35 − 30 = 5 photos.\nCes 5 photos doivent aussi être collées. Il faut une page de plus.\n3 + 1 = 4 pages. La 4e page n'est pas pleine.\n⛔ Le piège du b) : répondre 3, et laisser 5 photos hors de l'album.\nRéponse : a) 3 ; b) 4.",
          micros: ["ce1_division_groupement", "ce1_division_reste"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "L'animatrice emmène 26 enfants sur le lac.\nUne barque a 5 places pour les enfants.\na) Combien de barques sont pleines ?\nb) Combien d'enfants restent ?\nc) Combien de barques faut-il pour que tout le monde monte ?",
          correction:
            "Je compte de 5 en 5 : 5, 10, 15, 20, 25.\na) 5 barques pleines, pour 25 enfants.\nb) 26 − 25 = 1 enfant reste.\nc) On ne laisse pas cet enfant au bord du lac ! Il faut une barque de plus.\n5 + 1 = 6 barques.\n⛔ Le piège du c) : répondre 5. Le reste ici ne se jette pas : il faut une barque pour lui.\nRéponse : a) 5 ; b) 1 ; c) 6.",
          micros: ["ce1_division_reste", "ce1_division_groupement"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Mamie partage 20 € entre ses petits-enfants, en parts égales.\na) Ils sont 4. Combien d'euros reçoit chacun ?\nb) Ils sont 5. Combien d'euros reçoit chacun ?",
          correction:
            "a) Je distribue : un tour, 4 €. Je compte de 4 en 4 : 4, 8, 12, 16, 20.\n5 tours : chacun reçoit 5 €. Je vérifie : 4 × 5 = 20.\nb) Un tour, 5 €. Je compte de 5 en 5 : 5, 10, 15, 20.\n4 tours : chacun reçoit 4 €. Je vérifie : 5 × 4 = 20.\n⛔ Le piège du a) : répondre 4, le nombre de petits-enfants.\nRéponse : a) 5 ; b) 4.",
          micros: ["ce1_division_partage"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Je sais que 5 × 6 = 30.\na) 30 billes dans 5 sacs égaux. Combien de billes par sac ?\nb) 30 billes dans des sacs de 6. Combien de sacs ?",
          figure: billes([{ rangees: 5, colonnes: 6 }]),
          correction:
            "Le rectangle a 5 rangées de 6 billes : 5 × 6 = 30.\na) Une rangée = un sac. 5 sacs de 6 billes. Chaque sac a 6 billes.\nb) Je fais des sacs de 6 : chaque rangée en est un. Il y a 5 rangées : 5 sacs.\n⛔ Le piège : donner la même réponse aux deux. Au a), on cherche les billes. Au b), les sacs.\nRéponse : a) 6 ; b) 5.",
          micros: ["ce1_division_partage", "ce1_division_groupement"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Le pâtissier a 23 macarons. Il remplit des boîtes de 10.\na) Combien de boîtes pleines ?\nb) Combien de macarons restent ?\nc) Combien de macarons faut-il en plus pour une 3e boîte pleine ?",
          correction:
            "a) 10, 20 : 2 boîtes pleines, pour 20 macarons.\nb) 23 − 20 = 3 macarons restent.\nc) Une boîte pleine en a 10. J'en ai 3. Il en manque 10 − 3 = 7.\n⛔ Le piège du c) : répondre 3. 3, c'est ce qu'il a. On cherche ce qui manque.\nRéponse : a) 2 ; b) 3 ; c) 7.",
          micros: ["ce1_division_reste", "ce1_division_groupement", "ce1_division_defi"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 14 partagé entre 2 donne 7 chacun.\nb) 20 partagé entre 4 donne 4 chacun.\nc) 9 partagé entre 3 donne 3 chacun.\nd) 11 partagé entre 2 : il ne reste rien.",
          correction:
            "Je vérifie chaque partage avec une multiplication.\na) 2 × 7 = 14. Vrai.\nb) 4 × 4 = 16, pas 20. En fait, 4 × 5 = 20 : chacun a 5. Faux.\nc) 3 × 3 = 9. Vrai.\nd) 2 × 5 = 10. Il reste 11 − 10 = 1. Faux.\n⛔ Le piège du b) : confondre le nombre de parts et la part de chacun.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce1_division_partage", "ce1_division_reste"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Hugo a un paquet de 18 biscuits.\nIl les met sur 3 assiettes, autant sur chacune.\nCombien de biscuits y a-t-il sur chaque assiette ?",
          figure: assiettesVides(3),
          correction:
            "Je distribue 1 biscuit par assiette : un tour, 3 biscuits.\nJe compte de 3 en 3 : 3, 6, 9, 12, 15, 18.\nJ'ai fait 6 tours : 6 biscuits par assiette.\nJe vérifie : 3 × 6 = 18.\n⛔ Le piège : s'arrêter avant la fin du paquet. Je distribue TOUS les biscuits.\nRéponse : 6.",
          micros: ["ce1_division_partage"],
          reponses: [{ attendu: ["6", "six"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je dessine au brouillon. Je cherche une étape après l'autre.",
      rappel: [
        "Pour aller vite, je fais d'abord 10 paquets d'un coup.",
        "10 boîtes de 6, c'est 60 œufs.",
        "À la fin, je relis la question : les paquets pleins, ou tous les paquets ?",
      ],
      exercices: [
        {
          titre: "Les œufs du fermier",
          enonce: "Un fermier a 75 œufs à vendre au marché.\nIl les vend par boîtes de 6.\na) Combien de boîtes pleines peut-il vendre ?\nb) Combien d'œufs restent ?",
          correction:
            "Je fais d'abord 10 boîtes d'un coup : 10 × 6 = 60 œufs.\nIl reste 75 − 60 = 15 œufs.\nDans 15 œufs : 1 boîte de 6, puis 2 boîtes, 12 œufs. Pas assez pour une 3e.\n10 + 2 = 12 boîtes. 12 boîtes font 60 + 12 = 72 œufs.\na) 12 boîtes pleines.\nb) 75 − 72 = 3 œufs restent.\n⛔ Le piège : compter les 3 œufs comme une boîte. On ne vend que des boîtes pleines.\nRéponse : a) 12 ; b) 3.",
          micros: ["ce1_division_defi", "ce1_division_groupement", "ce1_division_reste"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "Le goûter de la classe",
          enonce: "Une classe a 24 élèves. Chaque élève mange 2 gâteaux.\nLes gâteaux sont vendus par paquets de 10.\na) Combien de gâteaux faut-il ?\nb) Combien de paquets faut-il acheter ?\nc) Combien de gâteaux seront en trop ?",
          correction:
            "a) 24 élèves, 2 gâteaux chacun : le double de 24. 24 + 24 = 48 gâteaux.\nb) De 10 en 10 : 10, 20, 30, 40. 4 paquets font 40. Il manque 8 gâteaux.\nIl faut un paquet de plus : 5 paquets, soit 50 gâteaux.\nc) 50 − 48 = 2 gâteaux en trop.\n⛔ Le piège du b) : acheter 4 paquets. 8 élèves n'auraient pas leurs gâteaux.\nRéponse : a) 48 ; b) 5 ; c) 2.",
          micros: ["ce1_division_defi", "ce1_division_reste", "ce1_division_groupement"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Les billes de Sam",
          enonce: "Sam a 30 billes. Il en garde 6 pour lui.\nIl partage les autres entre ses 4 amis, en parts égales.\na) Combien de billes Sam partage-t-il ?\nb) Combien de billes reçoit chaque ami ?\nc) Sam a-t-il autant de billes que chaque ami ? Réponds oui ou non.",
          correction:
            "a) Il garde 6 billes : 30 − 6 = 24 billes à partager.\nb) Je distribue 24 billes à 4 amis. Un tour, 4 billes.\nDe 4 en 4 : 4, 8, 12, 16, 20, 24. 6 tours : chaque ami a 6 billes.\nJe vérifie : 4 × 6 = 24.\nc) Sam a 6 billes, chaque ami aussi. Oui, autant.\n⛔ Le piège : partager les 30 billes. Sam en a gardé 6 d'abord.\nRéponse : a) 24 ; b) 6 ; c) oui.",
          schema: ecranSeulement(billes([{ rangees: 4, colonnes: 6, legende: "4 amis, 6 billes chacun" }])),
          micros: ["ce1_division_defi", "ce1_division_partage"],
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: VRAI },
          ],
        },
        {
          titre: "Le potager de la jardinière",
          enonce: "Une jardinière a 20 salades à planter en rangées égales.\na) Elle fait 4 rangées. Combien de salades par rangée ?\nb) Elle préfère des rangées de 10. Combien de rangées ?\nc) On lui donne 3 salades de plus. Elle fait des rangées de 5. Combien de rangées pleines ?\nd) Combien de salades restent ?",
          correction:
            "a) 20 salades en 4 rangées. De 4 en 4 : 4, 8, 12, 16, 20. 5 tours : 5 salades par rangée.\nb) Rangées de 10 : 10, 20. Il y a 2 rangées.\nc) Elle a maintenant 20 + 3 = 23 salades.\nDe 5 en 5 : 5, 10, 15, 20. 4 rangées pleines.\nd) 23 − 20 = 3 salades restent.\n⛔ Le piège du c) : oublier d'ajouter les 3 salades avant de faire les rangées.\nRéponse : a) 5 ; b) 2 ; c) 4 ; d) 3.",
          micros: ["ce1_division_defi", "ce1_division_partage", "ce1_division_groupement", "ce1_division_reste"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: ["4", "quatre"] },
            { question: "d)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },
  ],
};
