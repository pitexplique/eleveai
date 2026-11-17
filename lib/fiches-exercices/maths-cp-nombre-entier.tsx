// ─── Fiche d'exercices : les nombres jusqu'à 100 (CP) — 20 exercices corrigés ─
//
// 17/11/2026 : la feuille interactive de la notion `nombre_entier` du coach CP
// (12 micros). Sur la forme des feuilles du CM1 (`maths-cm1-masse.tsx`) : 8 ★,
// 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne,
// étape par étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/nombres-entiers.bank.ts` : barres de
// dix et cubes, files, demi-droite graduée de un en un).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : nombres jusqu'à 100 ; écriture
// en LETTRES jusqu'à cinquante seulement ; ordinaux jusqu'à « vingtième » ;
// demi-droite graduée de un en un.
// ⛔ Aucune question à rédiger : QCM (la lettre), vrai ou faux, un signe, un
// nombre, un mot. Phrases de l'énoncé : 14 mots au plus, une idée par phrase.
//
// Les pièges nommés : compter deux fois le même objet (1), lire les cubes
// avant les barres (2), écrire ce qu'on entend, « 405 » pour quarante-cinq (3,
// 16), comparer le chiffre des unités (4, 15), chiffre des dizaines et des
// unités inversés (5, 11), compter l'enfant marqué parmi ceux de devant (6,
// 14, 19), recompter tout au lieu de compléter (7), lire la graduation
// d'avant (8, 13), 6 dizaines et 4 unités écrit 604 (9), ranger par le
// dernier chiffre (10), 3 dizaines et 12 unités écrit 312 (12), un indice
// oublié (17), 6 paquets et 8 seuls écrit 14 (18), le plus grand chiffre aux
// unités (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 20), fête (7), boulangerie (6),
// sport (14), ferme et zoo (19), marché (18). Métier : marchande (18), le
// conducteur du petit train (19).
// UN SEUL contexte réunionnais (18, letchis au marché de Saint-Paul, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS (`dessins-cp-lot-a.tsx`) : billes à compter, barres de dix et
// cubes, une file devant la boulangerie, un train, la demi-droite graduée
// (`droiteRel` du CM1). Aucun ne donne la réponse.
//
// Micro-compétences : cp_entier_denombre (1, 7), cp_entier_lire_ecrire (3, 15,
// 16), cp_entier_construire_collection (7, 18), cp_entier_dizaine_unite (2, 5,
// 12, 15), cp_entier_representations (2, 11, 12), cp_entier_decomposer (9,
// 17), cp_entier_comparer (4, 15, 20), cp_entier_ordonner (10), cp_entier_droite
// (8, 13), cp_entier_ordinal (6, 14), cp_entier_rang (6, 14, 19),
// cp_entier_defi (17, 18, 19, 20). 12/12.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { baseDix, baseDixChoix, collection, file } from "@/lib/fiches-exercices/dessins-cp-lot-a";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesNombreEntierCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "nombre-entier",
  titre: "Les nombres jusqu'à 100",
  accroche:
    "Vingt exercices, du geste seul au problème. Compter des billes. Lire les dizaines et les unités. Écrire un nombre en chiffres. Comparer, ranger, placer sur une ligne graduée. Trouver le rang dans une file. Une boulangerie, une course, un petit train et un marché. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre en chiffres.",
      rappel: [
        "10 unités font 1 dizaine.",
        "Dans 34, le 3 compte les dizaines. Le 4 compte les unités.",
        "Pour comparer deux nombres, je regarde d'abord les dizaines.",
      ],
      exercices: [
        {
          enonce: "Compte les billes.\nCombien y a-t-il de billes ?",
          figure: collection([{ n: 23, forme: "bille" }]),
          correction:
            "Les billes sont rangées par lignes de 10.\nJe compte les lignes pleines : 10, 20. Cela fait 2 dizaines.\nPuis les billes de la dernière ligne : 21, 22, 23.\nIl y a 23 billes.\n⛔ Le piège : compter une bille deux fois. Je compte ligne par ligne, de gauche à droite.\nRéponse : 23.",
          micros: ["cp_entier_denombre"],
          reponses: [{ attendu: ["23", "vingt-trois"] }],
        },
        {
          enonce: "Les barres valent 10. Les cubes valent 1.\nQuel nombre est dessiné ?",
          figure: baseDix(4, 7),
          correction:
            "Je compte d'abord les barres de dix : 10, 20, 30, 40. Il y a 4 dizaines.\nPuis les cubes : 1, 2, 3, 4, 5, 6, 7. Il y a 7 unités.\n4 dizaines et 7 unités, c'est 47.\n⛔ Le piège : écrire 74. Les dizaines s'écrivent à gauche, les unités à droite.\nRéponse : 47.",
          micros: ["cp_entier_dizaine_unite", "cp_entier_representations"],
          reponses: [{ attendu: "47" }],
        },
        {
          enonce: "Écris chaque nombre en chiffres.\na) trente-deux\nb) dix-neuf\nc) quarante-cinq\nd) cinquante",
          correction:
            "J'écris le chiffre des dizaines, puis celui des unités.\na) Trente, c'est 3 dizaines. Puis deux. Donc 32.\nb) Dix, c'est 1 dizaine. Puis neuf. Donc 19.\nc) Quarante, c'est 4 dizaines. Puis cinq. Donc 45.\nd) Cinquante, c'est 5 dizaines et 0 unité. Donc 50.\n⛔ Le piège : écrire ce qu'on entend, 405 pour quarante-cinq. Un nombre jusqu'à 99 n'a que deux chiffres.\nRéponse : a) 32 ; b) 19 ; c) 45 ; d) 50.",
          micros: ["cp_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: "32" },
            { question: "b)", attendu: "19" },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "50" },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 23 … 32\nb) 41 … 39\nc) 60 … 60\nd) 18 … 81",
          correction:
            "Je regarde d'abord les dizaines.\na) 23 a 2 dizaines. 32 en a 3. Donc 23 < 32.\nb) 41 a 4 dizaines. 39 en a 3. Donc 41 > 39.\nc) Les deux nombres sont pareils. Donc 60 = 60.\nd) 18 a 1 dizaine. 81 en a 8. Donc 18 < 81.\n⛔ Le piège du b) : regarder les unités, 1 et 9. Les dizaines passent d'abord.\nRéponse : a) < ; b) > ; c) = ; d) <.",
          micros: ["cp_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: ">" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: "<" },
          ],
        },
        {
          enonce: "Regarde le nombre 58.\na) Quel est le chiffre des dizaines ?\nb) Quel est le chiffre des unités ?",
          correction:
            "Dans un nombre à deux chiffres, les dizaines sont à gauche.\na) À gauche, je lis 5. Le chiffre des dizaines est 5.\nb) À droite, je lis 8. Le chiffre des unités est 8.\nDonc 58, c'est 5 dizaines et 8 unités.\n⛔ Le piège : inverser les deux. Le chiffre des unités est toujours le dernier, à droite.\nRéponse : a) 5 ; b) 8.",
          micros: ["cp_entier_dizaine_unite"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Des enfants attendent devant la boulangerie.\na) L'enfant en orange est : A) troisième B) cinquième C) sixième\nb) Combien d'enfants sont devant lui ?",
          figure: file(8, 5),
          correction:
            "Je compte depuis la porte de la boulangerie : c'est l'avant de la file.\na) Premier, deuxième, troisième, quatrième, cinquième. L'enfant en orange est cinquième. Réponse B.\nb) Devant lui, je compte les enfants entre lui et la porte : 1, 2, 3, 4.\nIl y a 4 enfants devant lui.\n⛔ Le piège : répondre 5. Le cinquième ne compte pas : il n'est pas devant lui-même.\nRéponse : a) B ; b) 4.",
          micros: ["cp_entier_ordinal", "cp_entier_rang"],
          reponses: [
            { question: "a)", attendu: ["B", "B) cinquième", "cinquième", "5e"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Pour la fête, Mia veut coller 15 étoiles.\nElle en a déjà collé. Combien d'étoiles doit-elle ajouter ?",
          figure: collection([{ n: 9, forme: "etoile" }]),
          correction:
            "Je compte les étoiles déjà collées : il y en a 9.\nJe compte à partir de 9 jusqu'à 15 : 10, 11, 12, 13, 14, 15.\nJ'ai compté 6 nombres. Il faut ajouter 6 étoiles.\nJe vérifie : 9 + 6 = 15.\n⛔ Le piège : répondre 15. Mia en a déjà 9 : je cherche seulement celles qui manquent.\nRéponse : 6.",
          micros: ["cp_entier_construire_collection", "cp_entier_denombre"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Sur la ligne, chaque petit trait avance de 1.\na) Quel nombre est au point A ?\nb) Quel nombre est au point B ?",
          figure: droiteRel(0, 20, 1, [{ value: 7, label: "A" }, { value: 13, label: "B" }], { nombres: 5 }),
          correction:
            "Je pars d'un nombre écrit, puis j'avance trait par trait.\na) Je pars de 5. J'avance de 2 traits : 6, 7. A est au 7.\nb) Je pars de 10. J'avance de 3 traits : 11, 12, 13. B est au 13.\n⛔ Le piège : compter le trait de départ. Je compte les pas, pas les traits.\nRéponse : a) 7 ; b) 13.",
          micros: ["cp_entier_droite"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["13", "treize"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je pense aux dizaines et aux unités.",
      rappel: [
        "64, c'est 6 dizaines et 4 unités. 64 = 60 + 4.",
        "Pour ranger, je compare les dizaines, puis les unités.",
        "Si j'ai 10 unités ou plus, je fais une dizaine de plus.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 64 = … dizaines et … unités\nb) 70 + 3 = …\nc) 5 dizaines et 9 unités = …",
          correction:
            "Je sépare les dizaines et les unités.\na) Dans 64, le 6 compte les dizaines et le 4 les unités. 64 = 6 dizaines et 4 unités.\nb) 70, c'est 7 dizaines. J'ajoute 3 unités : 73.\nc) 5 dizaines, c'est 50. J'ajoute 9 : 59.\n⛔ Le piège du b) : écrire 703. Les 3 unités prennent la place du 0.\nRéponse : a) 6 et 4 ; b) 73 ; c) 59.",
          micros: ["cp_entier_decomposer"],
          reponses: [
            { question: "a) dizaines", attendu: ["6", "six"] },
            { question: "a) unités", attendu: ["4", "quatre"] },
            { question: "b)", attendu: "73" },
            { question: "c)", attendu: "59" },
          ],
        },
        {
          enonce: "Range ces nombres du plus petit au plus grand.\n45 ; 54 ; 39 ; 50\nSépare-les par « ; ».",
          correction:
            "Je regarde d'abord les dizaines.\n39 a 3 dizaines : c'est le plus petit.\n45 a 4 dizaines : il vient ensuite.\n54 et 50 ont 5 dizaines. Je compare les unités : 0 < 4. Donc 50, puis 54.\nJe range : 39 < 45 < 50 < 54.\n⛔ Le piège : ranger par le dernier chiffre. 50 finit par 0, mais il n'est pas le plus petit.\nRéponse : 39 ; 45 ; 50 ; 54.",
          micros: ["cp_entier_ordonner", "cp_entier_comparer"],
          reponses: [{ attendu: ["39 ; 45 ; 50 ; 54", "39 < 45 < 50 < 54"], ordre: true }],
        },
        {
          enonce: "Regarde les trois dessins.\na) Quel dessin montre 35 ? Écris la lettre.\nb) Quel nombre montre le dessin B ?",
          figure: baseDixChoix([
            { nom: "A", d: 5, u: 3 },
            { nom: "B", d: 5, u: 0 },
            { nom: "C", d: 3, u: 5 },
          ]),
          correction:
            "Je compte les barres (les dizaines), puis les cubes (les unités).\nA : 5 barres et 3 cubes. C'est 53.\nB : 5 barres et aucun cube. C'est 50.\nC : 3 barres et 5 cubes. C'est 35.\na) Le dessin de 35 est C.\nb) Le dessin B montre 50.\n⛔ Le piège : choisir A. A montre 53, pas 35 : les chiffres sont inversés.\nRéponse : a) C ; b) 50.",
          micros: ["cp_entier_representations", "cp_entier_dizaine_unite"],
          reponses: [
            { question: "a)", attendu: ["C", "le C"] },
            { question: "b)", attendu: ["50", "cinquante"] },
          ],
        },
        {
          enonce: "Écris le nombre.\na) 3 dizaines et 12 unités = …\nb) 1 dizaine et 10 unités = …\nc) 4 dizaines et 0 unité = …",
          correction:
            "10 unités font 1 dizaine.\na) 12 unités, c'est 1 dizaine et 2 unités. J'ai donc 3 + 1 = 4 dizaines et 2 unités. C'est 42.\nb) 10 unités, c'est 1 dizaine. J'ai donc 2 dizaines. C'est 20.\nc) 4 dizaines et rien d'autre : c'est 40.\n⛔ Le piège du a) : écrire 312. Je ne peux pas mettre 12 à la place des unités.\nRéponse : a) 42 ; b) 20 ; c) 40.",
          micros: ["cp_entier_dizaine_unite", "cp_entier_representations"],
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: ["20", "vingt"] },
            { question: "c)", attendu: ["40", "quarante"] },
          ],
        },
        {
          enonce: "Chaque petit trait avance de 1.\na) Quel nombre est au point A ?\nb) Quel nombre est au point B ?\nc) Quel nombre est au point C ?",
          figure: droiteRel(30, 50, 1, [{ value: 38, label: "A" }, { value: 41, label: "B" }, { value: 46, label: "C" }], { nombres: 10 }),
          correction:
            "Je pars du nombre écrit le plus proche.\na) A est 2 traits avant 40 : 39, 38. A est au 38.\nb) B est 1 trait après 40 : B est au 41.\nc) C est 6 traits après 40 : 41, 42, 43, 44, 45, 46. C est au 46.\n⛔ Le piège : lire 48 pour A, en comptant depuis 50. A est plus près de 40.\nRéponse : a) 38 ; b) 41 ; c) 46.",
          micros: ["cp_entier_droite", "cp_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "38" },
            { question: "b)", attendu: "41" },
            { question: "c)", attendu: "46" },
          ],
        },
        {
          enonce: "À la course, Lina arrive troisième.\nSacha arrive juste après elle.\na) Sacha est : A) deuxième B) quatrième C) troisième\nb) Combien d'enfants arrivent avant Sacha ?",
          correction:
            "a) Juste après la troisième, vient la quatrième place. Sacha est quatrième. Réponse B.\nb) Avant Sacha, il y a le premier, le deuxième et Lina, la troisième.\nCela fait 3 enfants.\n⛔ Le piège : répondre 4. Sacha est le quatrième : les enfants avant lui sont 3.\nRéponse : a) B ; b) 3.",
          micros: ["cp_entier_ordinal", "cp_entier_rang"],
          reponses: [
            { question: "a)", attendu: ["B", "B) quatrième", "quatrième", "4e"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 47 a 4 dizaines.\nb) 60, c'est 6 dizaines.\nc) 29 est plus grand que 31.\nd) 52 s'écrit cinquante-deux.",
          correction:
            "a) Dans 47, le chiffre des dizaines est 4. Vrai.\nb) 6 dizaines, c'est 60. Vrai.\nc) 29 a 2 dizaines, 31 en a 3. Donc 29 < 31. Faux.\nd) 52, c'est cinquante et deux : cinquante-deux. Vrai.\n⛔ Le piège du c) : croire que 29 gagne grâce au 9. Les dizaines passent d'abord.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) vrai.",
          micros: ["cp_entier_dizaine_unite", "cp_entier_comparer", "cp_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: FAUX },
            { question: "d)", attendu: VRAI },
          ],
        },
        {
          enonce: "Choisis la bonne réponse. Écris la lettre.\na) 17 s'écrit : A) dix-sept B) soixante-dix C) sept-dix\nb) « quarante-huit » s'écrit : A) 408 B) 48 C) 84",
          correction:
            "a) 17, c'est 1 dizaine et 7 unités : dix et sept. On dit dix-sept. Réponse A.\nb) Quarante, c'est 4 dizaines. Puis huit unités. Donc 48. Réponse B.\n⛔ Le piège du b) : choisir 408. J'entends « quarante » puis « huit », mais il n'y a que deux chiffres.\nRéponse : a) A ; b) B.",
          micros: ["cp_entier_lire_ecrire"],
          reponses: [
            { question: "a)", attendu: ["A", "A) dix-sept", "dix-sept"] },
            { question: "b)", attendu: ["B", "B) 48"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout. Je cherche avec les dizaines et les unités.",
      rappel: [
        "Je lis chaque indice, un par un.",
        "Un paquet de 10, c'est une dizaine.",
        "À la fin, je vérifie avec tous les indices.",
      ],
      exercices: [
        {
          titre: "Le nombre mystère",
          enonce: "a) Mon nombre est entre 40 et 50. Son chiffre des unités est 6.\nb) Mon nombre a 3 dizaines. Son chiffre des unités est aussi 3.",
          correction:
            "a) Entre 40 et 50, les nombres ont 4 dizaines : 41, 42… 49.\nSon chiffre des unités est 6. Le nombre est 46.\nb) 3 dizaines : le nombre commence par 3.\nLe chiffre des unités est aussi 3. Le nombre est 33.\n⛔ Le piège : oublier un indice. 36 a bien un 6, mais il n'est pas entre 40 et 50.\nRéponse : a) 46 ; b) 33.",
          micros: ["cp_entier_defi", "cp_entier_decomposer"],
          reponses: [
            { question: "a)", attendu: "46" },
            { question: "b)", attendu: "33" },
          ],
        },
        {
          titre: "Les letchis du marché",
          enonce: "Au marché de Saint-Paul, une marchande vend des letchis.\nElle a 6 paquets de 10 letchis et 8 letchis seuls.\na) Combien a-t-elle de letchis ?\nb) Elle veut 70 letchis. Combien en manque-t-il ?",
          correction:
            "a) 6 paquets de 10, ce sont 6 dizaines : 60 letchis.\nAvec les 8 letchis seuls : 60 et 8 font 68.\nb) De 68 à 70, je compte : 69, 70. Il manque 2 letchis.\n⛔ Le piège du a) : additionner 6 + 8 = 14. Un paquet compte 10 letchis, pas 1.\nRéponse : a) 68 ; b) 2.",
          micros: ["cp_entier_defi", "cp_entier_construire_collection"],
          reponses: [
            { question: "a)", attendu: "68" },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Le petit train du zoo",
          enonce: "Le petit train du zoo a 9 wagons.\nLe wagon des enfants est en orange.\na) Combien de wagons sont devant lui ?\nb) Combien de wagons sont derrière lui ?",
          figure: file(9, 4, "wagons"),
          correction:
            "L'avant du train, c'est la locomotive, à gauche.\nLe wagon orange est le quatrième en partant de la locomotive.\na) Devant lui : 1, 2, 3. Il y a 3 wagons.\nb) Il y a 9 wagons en tout. J'enlève les 3 de devant et le wagon orange : 9 − 3 − 1 = 5.\nJe vérifie en comptant ceux de droite : 1, 2, 3, 4, 5.\n⛔ Le piège : oublier le wagon orange. Il n'est ni devant ni derrière lui-même.\nRéponse : a) 3 ; b) 5.",
          micros: ["cp_entier_rang", "cp_entier_defi"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Les cartes de Léo",
          enonce: "Léo a trois cartes : 7, 3 et 5.\nIl en prend deux pour faire un nombre à deux chiffres.\na) Quel est le plus grand nombre possible ?\nb) Quel est le plus petit nombre possible ?",
          correction:
            "Le chiffre de gauche compte les dizaines : c'est lui qui compte le plus.\na) Pour le plus grand, je mets le plus grand chiffre à gauche : 7. Puis le suivant : 5. Le nombre est 75.\nb) Pour le plus petit, je mets le plus petit chiffre à gauche : 3. Puis 5. Le nombre est 35.\nJe vérifie : 35 < 37 < 53 < 57 < 73 < 75.\n⛔ Le piège du a) : écrire 57. Le 7 doit aller aux dizaines.\nRéponse : a) 75 ; b) 35.",
          micros: ["cp_entier_defi", "cp_entier_comparer"],
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "35" },
          ],
        },
      ],
    },
  ],
};
