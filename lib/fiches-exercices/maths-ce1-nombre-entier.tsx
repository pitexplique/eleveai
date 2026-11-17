// ─── Fiche d'exercices : les nombres jusqu'à 1 000 (CE1) — 20 exercices ───────
//
// 17/11/2026 : la feuille interactive de la notion `nombre_entier` du coach
// CE1 (« Nombres jusqu'à 1 000 », 18 micros). Sur la forme des feuilles du
// CM1 (`maths-cm1-masse.tsx`, `maths-cm1-nombre-entier.tsx`) : 8 ★, 8 ★★,
// 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne,
// étape par étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/nombres-entiers.bank.ts`) : quatre
// écritures d'un nombre, comparer, encadrer, ranger, demi-droite graduée,
// et les ORDINAUX jusqu'à cent.
// ⛔ LIMITES DU CE1 : des entiers jusqu'à 1 000, rien au-delà.
// ⛔ Aucune question à rédiger : QCM par lettre, vrai ou faux, signe, un
// nombre. Un rang se répond par le NOMBRE seul (« 10 », pas « 10e » : la
// saisie lirait 10 × e).
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : compter deux fois un bouquet (1), 2040 pour « deux cent
// quarante » (2), lire les barres comme des cubes (3), le chiffre pris pour sa
// valeur (4, 17), comparer le dernier chiffre (5), compter la personne
// elle-même parmi celles de devant (6, 18), « le 49e puis le 50e » sauté (7),
// les graduations comptées de 1 en 1 (8, 16), 46 pour 400 + 6 (9), 5 dizaines
// dans 450 (10), encadrer à la dizaine (11), « supérieur » et « inférieur »
// confondus (12), 96 rangé à la fin (13), payer avec 245 pièces (14), compter
// le motif depuis 0 (15), 12 dizaines écrites 12 (20), l'ordre décroissant
// demandé (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché aux fleurs (1), supermarché (6),
// course à pied (7, 13), magasin de vélos (14), bijoux de perles (15),
// cinéma (18), recyclage à l'école (19), piscine (20).
// Les métiers : fleuriste (1), caissier (6), vendeuse (14), maître-nageur (20).
// UN SEUL contexte réunionnais (1, le marché de Saint-Paul, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES. L'exemple de la file
// (6) reprend celui du programme du cycle 2 (BO n° 41 du 31/10/2024,
// annexe 4) : « six personnes font la queue, je suis la troisième ».
//
// ⭐ LES DESSINS : le matériel de numération (`baseDix`, plaques, barres,
// cubes), des bouquets à compter (`paquets`), la file d'attente (`file`), la
// frise de perles (`formes`), la demi-droite graduée (`droiteRel`).
//
// Micro-compétences (18/18) : ce1_entier_denombrer (1), ce1_entier_lire_ecrire
// (2), ce1_entier_construire_collection (14), ce1_entier_centaines (3, 10, 20),
// ce1_entier_representations (3, 9, 20), ce1_entier_valeur_position (4, 17),
// ce1_entier_decomposer (9, 14, 20), ce1_entier_comparer (5, 19),
// ce1_entier_expressions (12, 19), ce1_entier_encadrer (11, 17),
// ce1_entier_ordonner (13, 19), ce1_entier_droite (8, 16), ce1_entier_defi
// (17, 18, 19, 20), ce1_ordinal_jusqu_cent (7), ce1_ordinal_utiliser (7, 15),
// ce1_ordinal_rang_file (6, 18), ce1_ordinal_rang_precedents (6, 18),
// ce1_ordinal_suite_symboles (15).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDix, file, formes, paquets } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesNombreEntierCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "nombre-entier",
  titre: "Les nombres jusqu'à 1 000",
  accroche:
    "Vingt exercices, du plus facile au défi. Compter, lire et écrire les nombres jusqu'à 1 000. Les centaines, les dizaines et les unités. Comparer, ranger, encadrer. Placer un nombre sur une droite. Et les rangs : premier, deuxième, dixième. Des fleurs, une course, un cinéma et une piscine. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul.",
      rappel: [
        "10 unités font 1 dizaine. 10 dizaines font 1 centaine.",
        "Dans 352 : 3 centaines, 5 dizaines, 2 unités.",
        "Pour comparer, je regarde d'abord les centaines, puis les dizaines.",
      ],
      exercices: [
        {
          enonce: "Au marché de Saint-Paul, une fleuriste fait des bouquets de 10 roses.\nCombien de roses y a-t-il en tout ?",
          figure: paquets([10, 10, 10, 10], { seuls: 6, couleur: "#db2777" }),
          correction:
            "Je compte les bouquets : il y en a 4.\nChaque bouquet a 10 roses. 4 bouquets, c'est 4 dizaines : 40 roses.\nPuis je compte les roses seules : 6.\n40 et 6, cela fait 46.\n⛔ Le piège : compter les roses une par une et en oublier. Je compte par dizaines.\nRéponse : 46.",
          micros: ["ce1_entier_denombrer"],
          reponses: [{ attendu: ["46", "quarante-six"] }],
        },
        {
          enonce: "Écris chaque nombre en chiffres.\na) deux cent quarante\nb) six cent huit\nc) neuf cent quatre-vingt-dix-neuf\nd) mille",
          correction:
            "Je cherche les centaines, puis le reste.\na) « deux cent » : 2 centaines. « quarante » : 4 dizaines. Donc 240.\nb) « six cent » : 6 centaines. Pas de dizaine : je mets un 0. Puis 8 unités. Donc 608.\nc) « neuf cent » : 9 centaines. « quatre-vingt-dix-neuf » : 99. Donc 999.\nd) « mille », c'est 10 centaines : 1 000.\n⛔ Le piège : écrire 2040 pour « deux cent quarante ». Un nombre jusqu'à 999 a trois chiffres au plus.\nRéponse : a) 240 ; b) 608 ; c) 999 ; d) 1 000.",
          micros: ["ce1_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: "240" },
            { question: "b)", attendu: "608" },
            { question: "c)", attendu: "999" },
            { question: "d)", attendu: "1000" },
          ],
        },
        {
          enonce: "Une plaque vaut 100. Une barre vaut 10. Un cube vaut 1.\nQuel nombre est montré ?",
          figure: baseDix(3, 5, 2),
          correction:
            "Je compte chaque sorte de matériel.\n3 plaques : 3 centaines, c'est 300.\n5 barres : 5 dizaines, c'est 50.\n2 cubes : 2 unités, c'est 2.\n300 + 50 + 2 = 352.\n⛔ Le piège : compter les barres comme des cubes, et trouver 307. Une barre vaut 10.\nRéponse : 352.",
          micros: ["ce1_entier_centaines", "ce1_entier_representations"],
          reponses: [{ attendu: "352" }],
        },
        {
          enonce: "Regarde le nombre 647.\na) Quel est le chiffre des dizaines ?\nb) Quel est le chiffre des centaines ?\nc) Que vaut le chiffre 6 ? A) 6 B) 60 C) 600",
          correction:
            "J'écris le nombre dans le tableau : centaines 6, dizaines 4, unités 7.\na) Le chiffre des dizaines est 4.\nb) Le chiffre des centaines est 6.\nc) Le 6 est à la place des centaines. Il vaut 6 centaines, c'est 600. Réponse C.\n⛔ Le piège : dire que le 6 vaut 6. Sa place compte : il vaut 600.\nRéponse : a) 4 ; b) 6 ; c) C.",
          micros: ["ce1_entier_valeur_position"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["C", "C) 600"] },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 352 … 325\nb) 409 … 490\nc) 780 … 708\nd) 600 … 599",
          correction:
            "Je compare d'abord les centaines. Si elles sont pareilles, je compare les dizaines.\na) 3 centaines des deux côtés. Dizaines : 5 et 2. 5 est plus grand. Donc 352 > 325.\nb) 4 centaines des deux côtés. Dizaines : 0 et 9. Donc 409 < 490.\nc) 7 centaines des deux côtés. Dizaines : 8 et 0. Donc 780 > 708.\nd) Centaines : 6 et 5. 6 est plus grand. Donc 600 > 599.\n⛔ Le piège du d) : regarder les 9 de 599. Ce sont les centaines qui comptent d'abord.\nRéponse : a) > ; b) < ; c) > ; d) >.",
          micros: ["ce1_entier_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Six personnes attendent à la caisse du supermarché.\nLéa est la troisième de la file.\na) Combien de personnes sont devant Léa ?\nb) Combien de personnes sont derrière Léa ?",
          figure: file(6, { marque: 2 }),
          correction:
            "La première personne est tout près de la caisse. Léa a l'étoile.\na) Devant Léa, il y a la première et la deuxième personne : 2 personnes.\nb) Derrière Léa, je compte : 3 personnes.\nJe vérifie : 2 devant + Léa + 3 derrière = 6 personnes.\n⛔ Le piège : répondre 3 au a). Léa est la troisième, mais elle ne compte pas parmi celles de devant.\nRéponse : a) 2 ; b) 3.",
          micros: ["ce1_ordinal_rang_file", "ce1_ordinal_rang_precedents"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Une course a 100 coureurs. Écris le rang avec le nombre seul.\na) Tom arrive dixième.\nb) Zoé arrive centième.\nc) Max arrive juste après le 49e.",
          correction:
            "Je lis le mot du rang, puis j'écris son nombre.\na) « dixième » vient de dix : le rang 10.\nb) « centième » vient de cent : le rang 100. Zoé arrive la dernière.\nc) Juste après le 49e, il y a le 50e : le rang 50.\n⛔ Le piège du c) : écrire 48. « Juste après », c'est un rang de plus.\nRéponse : a) 10 ; b) 100 ; c) 50.",
          micros: ["ce1_ordinal_jusqu_cent", "ce1_ordinal_utiliser"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["100", "cent"] },
            { question: "c)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "La droite va de 10 en 10.\nQuel nombre est au point A ? Au point B ? Au point C ?",
          figure: droiteRel(0, 100, 10, [
            { value: 20, label: "A" },
            { value: 60, label: "B" },
            { value: 90, label: "C" },
          ], { nombres: 50 }),
          correction:
            "Je lis les nombres écrits : 0, 50 et 100. Chaque petit trait ajoute 10.\nA : depuis 0, je compte 2 traits : 10, 20. A = 20.\nB : depuis 50, je compte 1 trait : 60. B = 60.\nC : depuis 100, je recule d'un trait : 90. C = 90.\n⛔ Le piège : compter de 1 en 1. Ici, chaque trait vaut 10.\nRéponse : A = 20 ; B = 60 ; C = 90.",
          micros: ["ce1_entier_droite"],
          reponses: [
            { question: "A", attendu: "20" },
            { question: "B", attendu: "60" },
            { question: "C", attendu: "90" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je pense aux centaines, aux dizaines et aux unités.",
      rappel: [
        "537 = 500 + 30 + 7.",
        "Une place vide s'écrit 0 : 400 + 6 = 406.",
        "Dans 450, il y a 45 dizaines en tout.",
        "Encadrer, c'est trouver un nombre juste avant et un nombre juste après.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 500 + 30 + 7 = …\nb) 400 + 6 = …\nc) 863 = 800 + … + 3\nd) 2 centaines et 15 unités = …",
          correction:
            "J'assemble les centaines, les dizaines et les unités.\na) 5 centaines, 3 dizaines, 7 unités : 537.\nb) 4 centaines, 0 dizaine, 6 unités : 406.\nc) Dans 863, le 6 est aux dizaines. Il vaut 60.\nd) 2 centaines, c'est 200. Puis 15 unités : 200 + 15 = 215.\n⛔ Le piège du b) : écrire 46. Il n'y a pas de dizaine : je mets un 0 au milieu.\nRéponse : a) 537 ; b) 406 ; c) 60 ; d) 215.",
          micros: ["ce1_entier_decomposer", "ce1_entier_representations"],
          reponses: [
            { question: "a)", attendu: "537" },
            { question: "b)", attendu: "406" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "215" },
          ],
        },
        {
          enonce: "Complète.\na) 1 centaine = … dizaines\nb) 30 dizaines = … unités\nc) Dans 450, combien y a-t-il de dizaines en tout ?",
          correction:
            "J'utilise : 1 dizaine = 10 unités, 1 centaine = 10 dizaines.\na) 1 centaine = 10 dizaines.\nb) 10 dizaines font 100. Donc 30 dizaines font 300.\nc) 450, c'est 400 + 50. 400 fait 40 dizaines. 50 fait 5 dizaines.\n40 + 5 = 45 dizaines.\n⛔ Le piège du c) : répondre 5. 5 est le chiffre des dizaines. Mais les centaines contiennent aussi des dizaines.\nRéponse : a) 10 ; b) 300 ; c) 45.",
          micros: ["ce1_entier_centaines"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: "45" },
          ],
        },
        {
          enonce: "Écris la centaine juste avant et la centaine juste après.\na) … < 347 < …\nb) … < 682 < …\nc) Écris un nombre compris entre 198 et 201.",
          correction:
            "a) 347 a 3 centaines. La centaine juste avant : 300. Juste après : 400.\nDonc 300 < 347 < 400.\nb) 682 a 6 centaines. Donc 600 < 682 < 700.\nc) Après 198, je compte : 199, 200, puis 201.\n199 et 200 sont entre 198 et 201. Les deux réponses sont justes.\n⛔ Le piège : écrire 340 et 350. Ce sont des dizaines. On demande des centaines.\nRéponse : a) 300 et 400 ; b) 600 et 700 ; c) 199 ou 200.",
          micros: ["ce1_entier_encadrer"],
          reponses: [
            { question: "a) avant", attendu: "300" },
            { question: "a) après", attendu: "400" },
            { question: "b) avant", attendu: "600" },
            { question: "b) après", attendu: "700" },
            { question: "c)", attendu: ["199", "200"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 508 est supérieur à 580.\nb) 299 est inférieur à 300.\nc) 450 est compris entre 400 et 500.\nd) 7 centaines est égal à 70.",
          correction:
            "« Supérieur » veut dire plus grand. « Inférieur » veut dire plus petit.\na) 508 et 580 : même centaine. Dizaines : 0 et 8. 508 est plus petit. Faux.\nb) 299 vient juste avant 300. Il est plus petit. Vrai.\nc) 450 est plus grand que 400 et plus petit que 500. Vrai.\nd) 7 centaines, c'est 700, pas 70. Faux.\n⛔ Le piège : confondre « supérieur » et « inférieur ». Supérieur, c'est au-dessus : plus grand.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          micros: ["ce1_entier_expressions"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Quatre coureurs portent un dossard.\nA = 609 ; B = 96 ; C = 690 ; D = 906.\nRange les dossards du plus petit au plus grand.\nÉcris les lettres séparées par « ; ».",
          correction:
            "Je compte d'abord les chiffres. 96 n'a que deux chiffres : c'est le plus petit.\nPuis je compare les centaines : 609 et 690 ont 6 centaines. 906 en a 9.\n609 et 690 : dizaines 0 et 9. Donc 609 < 690.\nJ'ai : 96 < 609 < 690 < 906.\nDonc B, puis A, puis C, puis D.\n⛔ Le piège : mettre 96 à la fin, à cause du 9. Il n'a pas de centaine.\nRéponse : B ; A ; C ; D.",
          micros: ["ce1_entier_ordonner"],
          reponses: [{ attendu: ["B ; A ; C ; D", "B < A < C < D", "B, A, C, D"], ordre: true }],
        },
        {
          enonce: "Au magasin de vélos, un casque coûte 245 €.\nTu paies avec des billets de 100 €, de 10 € et des pièces de 1 €.\nTu prends le moins de billets et de pièces possible.\na) Combien de billets de 100 € ?\nb) Combien de billets de 10 € ?\nc) Combien de pièces de 1 € ?",
          correction:
            "Je découpe 245 en centaines, dizaines et unités.\n245 = 200 + 40 + 5.\na) 200 €, c'est 2 billets de 100 €.\nb) 40 €, c'est 4 billets de 10 €.\nc) 5 €, c'est 5 pièces de 1 €.\nJe vérifie : 200 + 40 + 5 = 245.\n⛔ Le piège : payer avec 245 pièces de 1 €. C'est juste, mais ce n'est pas le moins possible.\nRéponse : a) 2 ; b) 4 ; c) 5.",
          micros: ["ce1_entier_construire_collection", "ce1_entier_decomposer"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Inès enfile des perles. Le motif recommence toujours pareil.\na) Quelle est la forme de la 7e perle ? A) triangle B) rond C) carré\nb) Et la 12e perle ?",
          figure: formes(["triangle", "rond", "carre", "triangle", "rond", "carre"]),
          correction:
            "Le motif a 3 perles : triangle, rond, carré. Puis il recommence.\nJe compte les perles de 3 en 3 : les 3e, 6e, 9e et 12e sont des carrés.\na) La 6e est un carré. Le motif recommence : la 7e est un triangle. Réponse A.\nb) La 12e est un carré. Réponse C.\n⛔ Le piège : dessiner seulement les 6 perles et deviner. Je continue le motif jusqu'au bout.\nRéponse : a) A ; b) C.",
          micros: ["ce1_ordinal_suite_symboles", "ce1_ordinal_utiliser"],
          reponses: [
            { question: "a)", attendu: ["A", "A) triangle", "triangle"] },
            { question: "b)", attendu: ["C", "C) carré", "carré", "carre"] },
          ],
        },
        {
          enonce: "Cette droite va de 100 en 100.\na) Quel nombre est au point A ?\nb) Quel nombre est au point B ?\nc) C est au milieu, entre 400 et 500. Quel nombre est en C ?",
          figure: droiteRel(0, 1000, 100, [
            { value: 300, label: "A" },
            { value: 450, label: "C" },
            { value: 800, label: "B" },
          ], { nombres: 500 }),
          correction:
            "Je lis les nombres écrits : 0, 500 et 1 000. Chaque trait ajoute 100.\na) Depuis 0 : 100, 200, 300. A = 300.\nb) Depuis 500 : 600, 700, 800. B = 800.\nc) Au milieu entre 400 et 500, il y a 450.\n⛔ Le piège : croire que chaque trait vaut 10. Entre 0 et 500, il n'y a que 5 écarts.\nRéponse : a) 300 ; b) 800 ; c) 450.",
          micros: ["ce1_entier_droite"],
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "800" },
            { question: "c)", attendu: "450" },
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
        "Je lis chaque indice. Je garde seulement les nombres qui marchent.",
        "Le 8e d'une file a 7 personnes devant lui.",
        "Du plus grand au plus petit : je commence par le nombre qui a le plus de centaines.",
      ],
      exercices: [
        {
          titre: "Le nombre mystère",
          enonce: "Je suis un nombre à trois chiffres.\nMon chiffre des centaines est 4. Mon chiffre des unités est 0.\nJe suis compris entre 460 et 480.\na) Quel est mon chiffre des dizaines ?\nb) Qui suis-je ?",
          correction:
            "Les nombres avec 4 centaines et 0 unité : 400, 410, 420… jusqu'à 490.\nEntre 460 et 480, il reste un seul nombre : 470.\na) Dans 470, le chiffre des dizaines est 7.\nb) Je suis 470.\n⛔ Le piège : répondre 460 ou 480. « Compris entre » veut dire au milieu, pas au bord.\nRéponse : a) 7 ; b) 470.",
          micros: ["ce1_entier_defi", "ce1_entier_encadrer", "ce1_entier_valeur_position"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: "470" },
          ],
        },
        {
          titre: "La file du cinéma",
          enonce: "Au cinéma, Nina est la 8e de la file.\nDerrière elle, il y a 5 personnes.\na) Combien de personnes sont devant Nina ?\nb) Combien de personnes y a-t-il dans la file ?\nc) Les 4 premières personnes entrent. Quel est le rang de Nina maintenant ?",
          correction:
            "a) Nina est la 8e : 7 personnes sont devant elle.\nb) 7 devant + Nina + 5 derrière : 7 + 1 + 5 = 13 personnes.\nc) Devant Nina, il y avait 7 personnes. 4 entrent : 7 − 4 = 3.\nIl reste 3 personnes devant elle. Nina est donc la 4e.\n⛔ Le piège du b) : faire 7 + 5 = 12 et oublier Nina. Elle est dans la file, elle aussi.\nRéponse : a) 7 ; b) 13 ; c) 4.",
          micros: ["ce1_ordinal_rang_precedents", "ce1_ordinal_rang_file", "ce1_entier_defi"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["13", "treize"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Les bouchons de l'école",
          enonce: "Quatre équipes ramassent des bouchons pour le recyclage.\nA : 485 ; B : 548 ; C : 458 ; D : 584.\na) Quelle équipe a le plus de bouchons ?\nb) Range les équipes du plus grand au plus petit. Écris les lettres séparées par « ; ».\nc) Quelle équipe a un nombre compris entre 450 et 470 ?",
          correction:
            "Les quatre nombres ont les mêmes chiffres : 4, 5 et 8. Leur place change tout.\nCentaines : A et C en ont 4. B et D en ont 5.\nB et D : dizaines 4 et 8. Donc 584 > 548.\nA et C : dizaines 8 et 5. Donc 485 > 458.\na) Le plus grand : 584, l'équipe D.\nb) 584 > 548 > 485 > 458 : D ; B ; A ; C.\nc) 458 est entre 450 et 470 : l'équipe C.\n⛔ Le piège du b) : ranger du plus petit au plus grand. Je relis : on demande du plus grand au plus petit.\nRéponse : a) D ; b) D ; B ; A ; C ; c) C.",
          micros: ["ce1_entier_ordonner", "ce1_entier_comparer", "ce1_entier_expressions", "ce1_entier_defi"],
          reponses: [
            { question: "a)", attendu: ["D", "équipe D", "l'équipe D"] },
            { question: "b)", attendu: ["D ; B ; A ; C", "D > B > A > C", "D, B, A, C"], ordre: true },
            { question: "c)", attendu: ["C", "équipe C", "l'équipe C"] },
          ],
        },
        {
          titre: "Le casier de la piscine",
          enonce: "Le maître-nageur donne un code de casier.\nLe code : 5 centaines, 12 dizaines et 4 unités.\na) Combien valent 12 dizaines ?\nb) Quel est le code ?\nc) Le lendemain, le code a 1 centaine de plus. Quel est le nouveau code ?",
          correction:
            "a) 10 dizaines font 100. 2 dizaines font 20. Donc 12 dizaines font 120.\nb) 5 centaines = 500. J'ajoute : 500 + 120 + 4 = 624.\nc) 1 centaine de plus, c'est 100 de plus : 624 + 100 = 724.\n⛔ Le piège du b) : écrire 5, puis 12, puis 4, soit 5124. 12 dizaines ne tiennent pas dans une seule case.\nRéponse : a) 120 ; b) 624 ; c) 724.",
          micros: ["ce1_entier_decomposer", "ce1_entier_representations", "ce1_entier_centaines", "ce1_entier_defi"],
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "624" },
            { question: "c)", attendu: "724" },
          ],
        },
      ],
    },
  ],
};
