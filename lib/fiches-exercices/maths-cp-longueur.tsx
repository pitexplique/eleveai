// ─── Fiche d'exercices : les longueurs (CP) — 20 exercices corrigés ───────────
//
// 17/11/2026 : la feuille interactive de la notion `longueur` du coach CP
// (6 micros). Sur la forme des feuilles du CM1 (`maths-cm1-longueur.tsx`) :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/cp/maths/longueur.bank.ts` : rubans sur un
// quadrillage, règle graduée, objets du quotidien).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : le lexique long, court, près,
// loin ; comparer en alignant, ou en reportant une bandelette ; mesurer avec
// une règle graduée en cm ; DEUX unités seulement, m et cm, avec 1 m = 100 cm.
// ⛔ Ni km (CE1), ni dm ni mm (CE2). L'item du BO, mot pour mot : « L'élève
// sait dire si la longueur d'une trousse est plutôt 2 cm, 20 cm ou 1 m » (6).
// ⛔ Aucune question à rédiger : un nombre, une couleur, un nom, une unité, un
// QCM. Phrases de l'énoncé : 14 mots au plus.
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 5 cm » vaut 5) : chaque mesure est
// demandée « en cm » et l'élève peut écrire le nombre seul.
//
// Les pièges nommés : confondre long et haut (1), le plus loin pris pour le
// plus près (2, 16), compter les traits du quadrillage au lieu des carreaux
// (3), ne pas partir du 0 (4, 5, 11, 18), une trousse de 2 cm (6), comparer
// sans aligner (7), cm pour un couloir (8), ranger dans le mauvais sens (9),
// comparer des bandelettes de tailles différentes (10), un doigt de 50 cm
// (12), 1 m = 10 cm (13), 80 plus grand que 1 sans les unités (14), compter
// la graduation de départ (15), oublier une coupe (17), 6 cubes = 6 cm (19),
// le chemin qui « a l'air » plus long (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : couture (1, 17), village (2), jardin (3,
// serpents de laine), école (4, 5, 6, 11), maison (8, 12), sport (16, saut en
// longueur ; 18, course d'escargots), jeux (19, tour de cubes), nature (20,
// lapin et fourmi). Métiers : la couturière (17), le menuisier (10).
// Aucun contexte réunionnais sur cette feuille.
// ⭐ ORDRES DE GRANDEUR (pas des faits sourcés) : trousse ≈ 20 cm, porte ≈ 2 m,
// lit ≈ 2 m, bus ≈ 12 m, doigt ≈ 5 cm. Ce sont des repères courants, arrondis
// pour un enfant de 6 ans. Tout le reste est un MODÈLE.
//
// Micro-compétences : cp_longueur_lexique (1, 2, 16), cp_longueur_comparer (1,
// 7, 9, 11, 14), cp_longueur_mesurer_unite (3, 10), cp_longueur_regle (4, 5,
// 11, 15, 18), cp_longueur_m_cm (6, 8, 12, 13, 14, 19), cp_longueur_defi (17,
// 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { chemin, regle, rubans } from "@/lib/fiches-exercices/dessins-cp-lot-a";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const CM = ["cm", "centimètre", "centimètres", "centimetre"];
const M = ["m", "mètre", "mètres", "metre"];

export const exercicesLongueurCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du geste seul au problème. Dire long, court, près, loin. Comparer deux rubans en les alignant. Compter les carreaux. Mesurer avec la règle, en partant du 0. Choisir entre le mètre et le centimètre. Un ruban de couturière, une course d'escargots, une tour de cubes, un lapin et une fourmi. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien le dessin.",
      rappel: [
        "Pour comparer deux objets, je les aligne au même départ.",
        "Avec la règle, je pars toujours du 0.",
        "1 m = 100 cm. Une trousse mesure environ 20 cm.",
      ],
      exercices: [
        {
          enonce: "La couturière a deux rubans.\na) Quel ruban est le plus long ? Écris sa couleur.\nb) Quel ruban est le plus court ?",
          figure: rubans([
            { debut: 0, long: 9, couleur: "#dc2626" },
            { debut: 0, long: 6, couleur: "#2563eb" },
          ], 11),
          correction:
            "Les deux rubans partent du même bord, à gauche. Je peux les comparer.\na) Le ruban rouge va plus loin à droite. Le rouge est le plus long.\nb) Le ruban bleu s'arrête avant. Le bleu est le plus court.\n⛔ Le piège : comparer l'épaisseur. Les deux rubans sont aussi épais : je regarde la longueur.\nRéponse : a) rouge ; b) bleu.",
          micros: ["cp_longueur_lexique", "cp_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ["rouge", "le rouge", "le ruban rouge"] },
            { question: "b)", attendu: ["bleu", "le bleu", "le ruban bleu"] },
          ],
        },
        {
          enonce: "Regarde le chemin.\na) Qui est le plus près de la maison : le chat ou le chien ?\nb) Qui est le plus loin de la maison ?",
          figure: chemin("maison", [
            { nom: "chien", x: 8, couleur: "#92400e" },
            { nom: "chat", x: 2, couleur: "#ea580c" },
            { nom: "vélo", x: 5, couleur: "#16a34a" },
          ]),
          correction:
            "Je pars de la maison et je regarde le chemin.\na) Le chat est tout de suite après la maison. Le chat est le plus près.\nb) Le chien est au bout du chemin. Le chien est le plus loin.\n⛔ Le piège : confondre près et loin. Près, c'est à côté. Loin, c'est à beaucoup de pas.\nRéponse : a) le chat ; b) le chien.",
          micros: ["cp_longueur_lexique"],
          reponses: [
            { question: "a)", attendu: ["chat", "le chat"] },
            { question: "b)", attendu: ["chien", "le chien"] },
          ],
        },
        {
          enonce: "Au jardin, deux serpents de laine sont posés sur le quadrillage.\na) Combien de carreaux mesure le serpent vert ?\nb) Et le serpent jaune ?",
          figure: rubans([
            { debut: 1, long: 6, couleur: "#16a34a" },
            { debut: 0, long: 9, couleur: "#facc15" },
          ], 11),
          correction:
            "Je compte les carreaux sous chaque serpent, un par un.\na) Le vert couvre 1, 2, 3, 4, 5, 6 carreaux. Il mesure 6 carreaux.\nb) Le jaune couvre 9 carreaux.\nLe jaune est le plus long.\n⛔ Le piège : compter les traits au lieu des carreaux. On trouve toujours 1 de trop.\nRéponse : a) 6 ; b) 9.",
          micros: ["cp_longueur_mesurer_unite"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["9", "neuf"] },
          ],
        },
        {
          enonce: "Le crayon est posé sur la règle.\nCombien mesure-t-il, en cm ?",
          figure: regle(10, [{ de: 0, a: 5, couleur: "#ea580c", nom: "crayon" }]),
          correction:
            "Le crayon commence au 0 de la règle.\nIl s'arrête au 5.\nIl mesure 5 cm.\n⛔ Le piège : poser la règle par son bord, pas par le 0. Le 0 est le départ de la mesure.\nRéponse : 5.",
          micros: ["cp_longueur_regle"],
          reponses: [{ attendu: ["5", "cinq"], unite: "cm" }],
        },
        {
          enonce: "Ce trait ne commence pas au 0.\nCombien mesure-t-il, en cm ?",
          figure: regle(10, [{ de: 2, a: 9, couleur: "#2563eb" }]),
          correction:
            "Le trait commence au 2 et finit au 9.\nJe compte les centimètres entre les deux : 3, 4, 5, 6, 7, 8, 9. Cela fait 7.\nOu bien : 9 − 2 = 7.\nLe trait mesure 7 cm.\n⛔ Le piège : répondre 9, le nombre de la fin. Le trait ne part pas du 0.\nRéponse : 7.",
          micros: ["cp_longueur_regle"],
          reponses: [{ attendu: ["7", "sept"], unite: "cm" }],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Une trousse : A) 2 cm B) 20 cm C) 1 m\nb) La porte de la classe : A) 2 m B) 20 cm C) 2 cm",
          correction:
            "Je compare avec ce que je connais. 1 cm, c'est la largeur d'un doigt. 1 m, c'est un grand pas d'adulte.\na) 2 cm, c'est deux doigts : trop petit. 1 m, c'est plus grand que ma table. Une trousse : 20 cm. Réponse B.\nb) Un adulte passe sous la porte : elle mesure environ 2 m. Réponse A.\n⛔ Le piège : garder le nombre et oublier l'unité. 2 cm et 2 m, c'est très différent.\nRéponse : a) B ; b) A.",
          micros: ["cp_longueur_m_cm"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 20 cm"] },
            { question: "b)", attendu: ["A", "A) 2 m"] },
          ],
        },
        {
          enonce: "Les rubans ne partent pas du même bord.\nQuel ruban est le plus long ? Écris sa couleur.",
          figure: rubans([
            { debut: 4, long: 5, couleur: "#dc2626" },
            { debut: 0, long: 7, couleur: "#2563eb" },
          ], 11),
          correction:
            "Je compte les carreaux de chaque ruban.\nLe rouge : 5 carreaux. Le bleu : 7 carreaux.\n7 est plus que 5. Le bleu est le plus long.\n⛔ Le piège : choisir le rouge parce qu'il va plus loin à droite. Il part plus loin aussi : je dois aligner les départs.\nRéponse : bleu.",
          micros: ["cp_longueur_comparer"],
          reponses: [{ attendu: ["bleu", "le bleu", "le ruban bleu"] }],
        },
        {
          enonce: "Écris l'unité : m ou cm ?\na) Ma gomme mesure 3 …\nb) Le couloir mesure 10 …\nc) Un crayon mesure 15 …",
          correction:
            "Petit objet : cm. Grand objet, comme un couloir ou une pièce : m.\na) 3 m, ce serait plus long qu'un lit. Une gomme : 3 cm.\nb) 10 cm, c'est la longueur d'une main. Un couloir : 10 m.\nc) Un crayon tient dans ma main : 15 cm.\n⛔ Le piège du b) : écrire cm partout. Le couloir est bien plus grand qu'une main.\nRéponse : a) cm ; b) m ; c) cm.",
          micros: ["cp_longueur_m_cm"],
          reponses: [
            { question: "a)", attendu: CM },
            { question: "b)", attendu: M },
            { question: "c)", attendu: CM },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mesure, puis je compare.",
      rappel: [
        "Mesurer, c'est compter combien de fois l'unité rentre.",
        "Sur la règle : la longueur = le nombre de la fin − le nombre du départ.",
        "1 m = 100 cm : pour comparer, j'écris tout en cm.",
      ],
      exercices: [
        {
          enonce: "Range les baguettes de la plus courte à la plus longue.\nÉcris les lettres, séparées par « ; ».",
          figure: rubans([
            { nom: "A", debut: 0, long: 4 },
            { nom: "B", debut: 0, long: 8 },
            { nom: "C", debut: 0, long: 2 },
            { nom: "D", debut: 0, long: 6 },
          ], 9),
          correction:
            "Les baguettes partent toutes du même bord. Je compte leurs carreaux.\nA : 4. B : 8. C : 2. D : 6.\nJe range : 2 < 4 < 6 < 8.\nDonc C, puis A, puis D, puis B.\n⛔ Le piège : ranger de la plus longue à la plus courte. Je relis : de la plus COURTE d'abord.\nRéponse : C ; A ; D ; B.",
          micros: ["cp_longueur_comparer"],
          reponses: [{ attendu: ["C ; A ; D ; B", "C < A < D < B"], ordre: true }],
        },
        {
          enonce: "Le menuisier mesure avec une bandelette.\nLa table mesure 4 bandelettes. Le banc mesure 6 bandelettes.\na) Qui est le plus long : la table ou le banc ?\nb) De combien de bandelettes ?",
          correction:
            "Il utilise la même bandelette pour les deux : je peux comparer les nombres.\na) 6 est plus que 4. Le banc est le plus long.\nb) De 4 à 6 : 6 − 4 = 2. Le banc mesure 2 bandelettes de plus.\n⛔ Le piège : comparer avec deux bandelettes différentes. Ici, c'est la même : les nombres se comparent.\nRéponse : a) le banc ; b) 2.",
          micros: ["cp_longueur_mesurer_unite"],
          reponses: [
            { question: "a)", attendu: ["banc", "le banc"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Deux traits sont posés sur la règle.\na) Combien mesure le trait vert, en cm ?\nb) Combien mesure le trait violet, en cm ?\nc) Quel trait est le plus long ?",
          figure: regle(12, [
            { de: 1, a: 7, couleur: "#16a34a", nom: "vert" },
            { de: 3, a: 11, couleur: "#7c3aed", nom: "violet" },
          ]),
          correction:
            "Pour chaque trait : le nombre de la fin moins le nombre du départ.\na) Le vert va de 1 à 7 : 7 − 1 = 6 cm.\nb) Le violet va de 3 à 11 : 11 − 3 = 8 cm.\nc) 8 cm est plus que 6 cm : le violet est le plus long.\n⛔ Le piège : lire 7 cm et 11 cm. Aucun des deux traits ne part du 0.\nRéponse : a) 6 ; b) 8 ; c) violet.",
          micros: ["cp_longueur_regle", "cp_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ["6", "six"], unite: "cm" },
            { question: "b)", attendu: ["8", "huit"], unite: "cm" },
            { question: "c)", attendu: ["violet", "le violet", "le trait violet"] },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Un lit : A) 2 m B) 2 cm C) 20 cm\nb) Un doigt : A) 1 m B) 5 cm C) 50 cm\nc) Un bus : A) 12 cm B) 12 m",
          correction:
            "Je pense à un grand pas d'adulte pour 1 m, et à un doigt de large pour 1 cm.\na) Un adulte s'allonge sur un lit : environ 2 m. Réponse A.\nb) Un doigt est petit : environ 5 cm. Réponse B.\nc) Un bus est bien plus long qu'une voiture : environ 12 m. Réponse B.\n⛔ Le piège du b) : choisir 50 cm. C'est plus long qu'un bras d'enfant.\nRéponse : a) A ; b) B ; c) B.",
          micros: ["cp_longueur_m_cm"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 2 m"] },
            { question: "b)", attendu: ["B", "B) 5 cm"] },
            { question: "c)", attendu: ["B", "B) 12 m"] },
          ],
        },
        {
          enonce: "Complète ou réponds.\na) 1 m = … cm\nb) Vrai ou faux : 1 m est plus long que 90 cm.\nc) 50 cm + 50 cm = … cm",
          correction:
            "a) 1 m = 100 cm. C'est une égalité à savoir.\nb) 1 m = 100 cm. 100 cm est plus que 90 cm. Vrai.\nc) 50 + 50 = 100. Cela fait 100 cm, c'est-à-dire 1 m.\n⛔ Le piège du a) : écrire 10. Dans 1 m, il y a 100 cm.\nRéponse : a) 100 ; b) vrai ; c) 100.",
          micros: ["cp_longueur_m_cm"],
          reponses: [
            { question: "a)", attendu: ["100", "cent"], unite: "cm" },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: ["100", "cent"], unite: "cm" },
          ],
        },
        {
          enonce: "Le fil de Lou mesure 1 m. Le fil de Tom mesure 80 cm.\nQui a le fil le plus long ?",
          correction:
            "Les deux fils n'ont pas la même unité. J'écris tout en cm.\nLou : 1 m = 100 cm. Tom : 80 cm.\n100 cm est plus que 80 cm. Le fil de Lou est le plus long.\n⛔ Le piège : comparer 1 et 80 sans les unités. 80 est plus grand que 1, mais 80 cm est plus court que 1 m.\nRéponse : Lou.",
          micros: ["cp_longueur_m_cm", "cp_longueur_comparer"],
          reponses: [{ attendu: ["Lou", "le fil de Lou"] }],
        },
        {
          enonce: "Je trace un trait de 8 cm avec la règle.\na) Je commence au 0. Où je m'arrête ?\nb) Je commence au 2. Où je m'arrête ?",
          figure: regle(12),
          correction:
            "Je dois avancer de 8 cm sur la règle.\na) Je pars de 0. J'avance de 8 : je m'arrête au 8.\nb) Je pars de 2. J'avance de 8 : 2 + 8 = 10. Je m'arrête au 10.\n⛔ Le piège du b) : s'arrêter au 8. Le trait irait de 2 à 8 : il ne mesurerait que 6 cm.\nRéponse : a) 8 ; b) 10.",
          micros: ["cp_longueur_regle"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Au saut en longueur, Léa saute 3 m et Sam saute 4 m.\na) Qui saute le plus loin ?\nb) Qui atterrit le plus près du départ ?",
          correction:
            "Plus le saut est long, plus on atterrit loin du départ.\na) 4 m est plus que 3 m. Sam saute le plus loin.\nb) Léa saute moins loin : elle atterrit le plus près du départ.\n⛔ Le piège : croire que « plus près » est le meilleur saut. Au saut en longueur, on veut aller loin.\nRéponse : a) Sam ; b) Léa.",
          micros: ["cp_longueur_lexique", "cp_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ["Sam"] },
            { question: "b)", attendu: ["Léa", "Lea"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je calcule pas à pas, en cm.",
      rappel: [
        "Quand on coupe, la longueur diminue : j'enlève.",
        "Quand on met bout à bout, j'ajoute.",
        "Je relis la question : en cm ou en m ?",
      ],
      exercices: [
        {
          titre: "Le ruban de la couturière",
          enonce: "La couturière a un ruban de 20 cm.\nElle en coupe 8 cm pour une robe.\na) Combien de cm reste-t-il ?\nb) Elle coupe encore 5 cm. Combien de cm reste-t-il ?",
          correction:
            "Couper, c'est enlever un morceau.\na) 20 − 8 : 8 + 2 = 10, puis 10 + 10 = 20. J'ai ajouté 12. Il reste 12 cm.\nb) 12 − 5 : 5 + 5 = 10, puis 2 de plus. Il reste 7 cm.\nJe vérifie : 8 + 5 + 7 = 20.\n⛔ Le piège du b) : enlever 5 à 20. Le ruban ne mesure plus 20 cm après la 1re coupe.\nRéponse : a) 12 ; b) 7.",
          micros: ["cp_longueur_defi"],
          reponses: [
            { question: "a)", attendu: "12", unite: "cm" },
            { question: "b)", attendu: ["7", "sept"], unite: "cm" },
          ],
        },
        {
          titre: "La course d'escargots",
          enonce: "Trois escargots partent du 0 de la règle.\na) Quel escargot est le plus loin ?\nb) Combien de cm entre B et C ?",
          figure: regle(12, [], [
            { x: 6, nom: "A", couleur: "#16a34a" },
            { x: 9, nom: "B", couleur: "#dc2626" },
            { x: 4, nom: "C", couleur: "#2563eb" },
          ]),
          correction:
            "Je lis où est chaque escargot sur la règle.\nA est au 6. B est au 9. C est au 4.\na) 9 est le plus grand nombre : B est le plus loin.\nb) De C à B : de 4 à 9. 9 − 4 = 5 cm.\n⛔ Le piège du b) : répondre 9, la place de B. On cherche l'écart, depuis C.\nRéponse : a) B ; b) 5.",
          micros: ["cp_longueur_regle", "cp_longueur_defi"],
          reponses: [
            { question: "a)", attendu: ["B", "l'escargot B"] },
            { question: "b)", attendu: ["5", "cinq"], unite: "cm" },
          ],
        },
        {
          titre: "La tour de cubes",
          enonce: "Un cube mesure 10 cm de haut.\nTom empile 6 cubes.\na) Combien de cm mesure la tour ?\nb) Combien de cubes faut-il pour une tour de 1 m ?",
          correction:
            "a) Chaque cube ajoute 10 cm : 10, 20, 30, 40, 50, 60.\nLa tour mesure 60 cm.\nb) 1 m = 100 cm. Je compte de 10 en 10 jusqu'à 100 : 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.\nCela fait 10 cubes.\n⛔ Le piège du a) : écrire 6 cm. Chaque cube mesure 10 cm, pas 1 cm.\nRéponse : a) 60 ; b) 10.",
          micros: ["cp_longueur_m_cm", "cp_longueur_defi"],
          reponses: [
            { question: "a)", attendu: "60", unite: "cm" },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          titre: "Le lapin et la fourmi",
          enonce: "Le lapin va chercher une carotte.\nIl fait 3 cm, puis 4 cm, puis 2 cm.\nLa fourmi fait un chemin de 12 cm.\na) Combien de cm mesure le chemin du lapin ?\nb) Qui fait le chemin le plus long ?",
          correction:
            "a) Les morceaux du chemin sont mis bout à bout : j'ajoute.\n3 + 4 = 7. Puis 7 + 2 = 9. Le chemin du lapin mesure 9 cm.\nb) 12 cm est plus que 9 cm. La fourmi fait le chemin le plus long.\n⛔ Le piège : croire le lapin plus loin parce qu'il a plus de morceaux. Je compare les longueurs.\nRéponse : a) 9 ; b) la fourmi.",
          micros: ["cp_longueur_defi"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"], unite: "cm" },
            { question: "b)", attendu: ["fourmi", "la fourmi"] },
          ],
        },
      ],
    },
  ],
};
