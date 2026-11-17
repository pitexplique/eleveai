// ─── Fiche d'exercices : résoudre des problèmes (CP) — 20 problèmes corrigés ──
//
// 17/11/2026 : la feuille interactive de la notion `probleme` du coach CP
// (9 micros). Sur la forme des feuilles du CM1 : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/probleme.bank.ts`) : comprendre,
// modéliser (dessin, schéma en barre), calculer, répondre, vérifier.
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : problèmes additifs en une étape
// (parties-tout, ajout, retrait, écart) jusqu'à 100 ; en DEUX étapes et
// MULTIPLICATIFS (le tout, le nombre de parts, la valeur d'une part) jusqu'à
// 30. ⛔ Aucun signe × ni ÷ : on dit « fois », on distribue un par un, on
// ajoute plusieurs fois le même nombre.
// ⭐ Le BO demande de tendre le piège des MOTS-CLÉS : « plus » qui cache une
// soustraction (10), « moins » qui cache une addition (16).
// ⛔ Aucune question à rédiger : un nombre, un QCM, oui ou non.
// Phrases de l'énoncé : 14 mots au plus.
//
// Les pièges nommés : confondre ce qu'on cherche et ce qu'on sait (1), ne
// compter qu'une couleur (2), additionner quand on enlève (3), additionner le
// tout et la part (4), 3 + 4 pour 3 nids de 4 (5), donner le nombre d'amis (6),
// une réponse impossible, 14 crayons pris dans 10 (7), « de plus » donc +
// (8), oublier le 2e arrêt (9), « de plus » qui cache une soustraction (10),
// 8 + 3 pour 3 araignées (11), répondre 20 au lieu du nombre de paquets (12),
// oublier l'après-midi (13), la phrase qui ne répond pas à la question (14),
// donner le nombre total de fraises (15), « de moins » qui cache une
// addition (16), oublier une classe (17), oublier les pieds en plus (18),
// oublier les adultes (19), partager en deux parts égales (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : billes (1), aquarium (2), jardin (3, 18),
// école (4, 17), oiseaux (5), bonbons (6), crayons (7, 12), jeux de cubes (8),
// bus (9), cartes (10), araignées (11), bibliothèque (13), livraison (14),
// pique-nique (15), perles (16), sortie au zoo (19), billes (20). Métiers : la
// jardinière (3), la conductrice de bus (9), la bibliothécaire (13), le livreur
// (14).
// UN SEUL contexte réunionnais (18, le jardin de Mamie Rose à Cilaos, MODÈLE).
// ⭐ FAIT RÉEL : une araignée a 8 pattes (ex. 11). Tout le reste est un MODÈLE.
//
// Micro-compétences : cp_probleme_identifier (1, 10, 16), cp_probleme_additif
// (1, 2, 13, 16, 17), cp_probleme_soustractif (3, 4, 8, 10, 14),
// cp_probleme_schema (4, 13, 20), cp_probleme_deux_etapes (9, 17, 18, 19),
// cp_probleme_multiplicatif (5, 11, 18), cp_probleme_partage (6, 12, 15, 19),
// cp_probleme_reponse (7, 14), cp_probleme_defi (17, 18, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { barre, collection, groupes, tours } from "@/lib/fiches-exercices/dessins-cp-lot-a";

export const exercicesProblemeCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "probleme",
  titre: "Résoudre des problèmes",
  accroche:
    "Vingt problèmes, du plus court au défi. Comprendre ce qu'on cherche. Réunir, enlever, comparer. Faire un dessin ou un schéma. Compter des groupes égaux, partager. Vérifier que la réponse est possible. Un aquarium, un bus, des araignées, une bibliothèque, un jardin et une sortie au zoo. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule opération. Je lis l'histoire, puis je calcule.",
      rappel: [
        "Je lis l'histoire. Je cherche ce que la question demande.",
        "Je peux faire un dessin de l'histoire.",
        "À la fin, je vérifie : ma réponse est-elle possible ?",
      ],
      exercices: [
        {
          enonce: "Lou a 12 billes. Elle en gagne 5.\na) Que cherche-t-on ?\nA) les billes de Lou à la fin\nB) les billes gagnées\nC) le nombre d'enfants\nb) Combien Lou a-t-elle de billes à la fin ?",
          correction:
            "a) On sait déjà qu'elle gagne 5 billes. On cherche combien elle en a à la fin. Réponse A.\nb) Elle gagne : elle en a plus. 12 + 5 : 2 + 5 = 7. Donc 17.\nLou a 17 billes à la fin.\n⛔ Le piège : choisir B. Les billes gagnées, on les connaît : ce sont les 5.\nRéponse : a) A ; b) 17.",
          micros: ["cp_probleme_identifier", "cp_probleme_additif"],
          reponses: [
            { question: "a)", attendu: ["A", "A) les billes de Lou à la fin"] },
            { question: "b)", attendu: "17" },
          ],
        },
        {
          enonce: "Dans l'aquarium, il y a des poissons orange et des poissons bleus.\nCombien de poissons en tout ?",
          figure: collection([
            { n: 8, forme: "poisson", legende: "orange" },
            { n: 6, forme: "poisson", couleur: "#2563eb", legende: "bleus" },
          ], { parLigne: 4 }),
          correction:
            "Je compte : 8 poissons orange et 6 poissons bleus.\nJe veux tous les poissons : je réunis. 8 + 6.\n8 + 2 = 10. Il reste 4 : 10 + 4 = 14.\nIl y a 14 poissons.\n⛔ Le piège : ne compter qu'une couleur. « En tout », c'est les deux groupes ensemble.\nRéponse : 14.",
          micros: ["cp_probleme_additif"],
          reponses: [{ attendu: ["14", "quatorze"] }],
        },
        {
          enonce: "Une jardinière plante 15 salades.\nLes lapins en mangent 4.\nCombien de salades reste-t-il ?",
          correction:
            "Les lapins mangent : il y a moins de salades. J'enlève.\n15 − 4 : aux unités, 5 − 4 = 1. La dizaine reste. Donc 11.\nIl reste 11 salades.\nJe vérifie : 11 + 4 = 15.\n⛔ Le piège : calculer 15 + 4 = 19. Il ne peut pas y avoir plus de salades qu'au début.\nRéponse : 11.",
          micros: ["cp_probleme_soustractif"],
          reponses: [{ attendu: ["11", "onze"] }],
        },
        {
          enonce: "Il y a 20 enfants dans la classe.\n12 sont des filles. Les autres sont des garçons.\nCombien y a-t-il de garçons ?",
          figure: barre("20", [
            { label: "12", poids: 12 },
            { label: "?", poids: 8 },
          ]),
          correction:
            "Le schéma montre le tout, 20 enfants, et une part, 12 filles.\nJe cherche l'autre part : les garçons.\nDe 12 à 20, je compte : 12 + 8 = 20. Donc 20 − 12 = 8.\nIl y a 8 garçons.\n⛔ Le piège : calculer 20 + 12 = 32. Les filles sont déjà dans les 20 enfants.\nRéponse : 8.",
          micros: ["cp_probleme_schema", "cp_probleme_soustractif"],
          reponses: [{ attendu: ["8", "huit"] }],
        },
        {
          enonce: "Dans le jardin, il y a 4 nids.\nDans chaque nid, il y a 3 œufs.\nCombien d'œufs en tout ?",
          figure: groupes(4, 3, "oeuf"),
          correction:
            "Chaque nid a 3 œufs. Il y a 4 nids.\nJ'ajoute 3 quatre fois : 3 + 3 + 3 + 3.\n3 + 3 = 6. 6 + 3 = 9. 9 + 3 = 12.\nOn dit aussi : 4 fois 3 = 12. Il y a 12 œufs.\n⛔ Le piège : calculer 4 + 3 = 7. Le 4 compte les nids, pas des œufs.\nRéponse : 12.",
          micros: ["cp_probleme_multiplicatif"],
          reponses: [{ attendu: ["12", "douze"] }],
        },
        {
          enonce: "Mia partage 12 bonbons entre 3 amis.\nChaque ami en a autant.\nCombien de bonbons a chaque ami ?",
          figure: collection([{ n: 12, forme: "bonbon" }], { parLigne: 6 }),
          correction:
            "Je distribue un bonbon à chaque ami, chacun son tour.\nTour 1 : 3 bonbons donnés. Tour 2 : 6. Tour 3 : 9. Tour 4 : 12.\nIl y a eu 4 tours : chaque ami a 4 bonbons.\nJe vérifie : 4 + 4 + 4 = 12.\n⛔ Le piège : répondre 3. 3, c'est le nombre d'amis, pas de bonbons.\nRéponse : 4.",
          micros: ["cp_probleme_partage"],
          reponses: [{ attendu: ["4", "quatre"] }],
          schema: ecranSeulement(groupes(3, 4, "bonbon")),
        },
        {
          enonce: "Une boîte a 10 crayons. Léo en prend 4.\nIl dit : « Il en reste 14. »\na) Est-ce possible ? Oui ou non ?\nb) Combien de crayons reste-t-il ?",
          correction:
            "a) Léo prend des crayons : il en reste moins que 10. 14 est plus que 10. Ce n'est pas possible : non.\nb) J'enlève : 10 − 4. Je sais que 4 + 6 = 10. Il reste 6 crayons.\n⛔ Le piège : additionner 10 et 4 comme Léo. Je relis l'histoire : on prend, on enlève.\nRéponse : a) non ; b) 6.",
          micros: ["cp_probleme_reponse", "cp_probleme_soustractif"],
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Tom et Zoé font une tour de cubes.\nCombien de cubes Tom a-t-il de plus que Zoé ?",
          figure: tours([
            { nom: "Tom", n: 9, couleur: "#2563eb" },
            { nom: "Zoé", n: 6, couleur: "#ea580c" },
          ]),
          correction:
            "Je compte : la tour de Tom a 9 cubes, celle de Zoé 6 cubes.\nJe cherche l'écart : ce que Tom a en plus.\nDe 6 à 9 : 7, 8, 9. Cela fait 3. Donc 9 − 6 = 3.\nTom a 3 cubes de plus.\n⛔ Le piège : voir « de plus » et calculer 9 + 6 = 15. On cherche une différence.\nRéponse : 3.",
          micros: ["cp_probleme_soustractif"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis deux fois. Je fais un dessin ou un schéma si j'hésite.",
      rappel: [
        "Deux étapes : je fais la première, puis la deuxième.",
        "Des groupes égaux : j'ajoute plusieurs fois le même nombre.",
        "« De plus » ne veut pas toujours dire + : je lis l'histoire.",
      ],
      exercices: [
        {
          enonce: "Dans le bus, il y a 12 personnes.\nAu 1er arrêt, 5 personnes montent.\nAu 2e arrêt, 3 personnes descendent.\na) Combien de personnes après le 1er arrêt ?\nb) Combien de personnes après le 2e arrêt ?",
          correction:
            "a) Des personnes montent : j'ajoute. 12 + 5 = 17.\nb) Des personnes descendent : j'enlève. 17 − 3 = 14.\nIl y a 14 personnes dans le bus.\n⛔ Le piège : oublier le 2e arrêt et répondre 17. L'histoire a deux étapes.\nRéponse : a) 17 ; b) 14.",
          micros: ["cp_probleme_deux_etapes"],
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: ["14", "quatorze"] },
          ],
        },
        {
          enonce: "Ravi a 18 cartes.\nIl a 5 cartes de plus que Jade.\na) Quel calcul ? A) 18 + 5 B) 18 − 5\nb) Combien de cartes a Jade ?",
          figure: barre("18 cartes de Ravi", [
            { label: "Jade : ?", poids: 13 },
            { label: "5", poids: 5 },
          ]),
          correction:
            "a) Ravi en a plus que Jade. Donc Jade en a moins que Ravi.\nPour trouver Jade, j'enlève les 5 de plus : 18 − 5. Réponse B.\nb) 8 − 5 = 3 aux unités. Donc 18 − 5 = 13. Jade a 13 cartes.\nJe vérifie : 13 + 5 = 18.\n⛔ Le piège : voir « plus » et calculer 18 + 5 = 23. Jade a moins de cartes que Ravi.\nRéponse : a) B ; b) 13.",
          micros: ["cp_probleme_identifier", "cp_probleme_soustractif"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 18 − 5", "18 − 5"] },
            { question: "b)", attendu: ["13", "treize"] },
          ],
        },
        {
          enonce: "Une araignée a 8 pattes.\nCombien de pattes ont 3 araignées ?",
          correction:
            "Chaque araignée a 8 pattes. Il y a 3 araignées.\nJ'ajoute 8 trois fois : 8 + 8 + 8.\n8 + 8 = 16. Puis 16 + 8 : 16 + 4 = 20, et 20 + 4 = 24.\n3 fois 8 = 24. Il y a 24 pattes.\n⛔ Le piège : calculer 8 + 3 = 11. Le 3 compte des araignées, pas des pattes.\nRéponse : 24.",
          micros: ["cp_probleme_multiplicatif"],
          reponses: [{ attendu: "24" }],
        },
        {
          enonce: "Le maître a 20 crayons.\nIl fait des paquets de 5 crayons.\nCombien de paquets fait-il ?",
          figure: collection([{ n: 20, forme: "crayon" }], { parLigne: 10 }),
          correction:
            "Je fais des paquets de 5, et je les compte.\n5 crayons : 1 paquet. 10 : 2 paquets. 15 : 3 paquets. 20 : 4 paquets.\nIl fait 4 paquets.\nJe vérifie : 5 + 5 + 5 + 5 = 20.\n⛔ Le piège : répondre 20 ou 5. On cherche le nombre de paquets.\nRéponse : 4.",
          micros: ["cp_probleme_partage"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "La bibliothécaire range 14 livres le matin.\nElle en range 9 l'après-midi.\nCombien de livres a-t-elle rangés dans la journée ?",
          figure: barre("?", [
            { label: "14", poids: 14 },
            { label: "9", poids: 9 },
          ]),
          correction:
            "Le schéma montre deux parts : 14 et 9. Je cherche le tout.\nJe réunis : 14 + 9.\n14 + 6 = 20. Il reste 3 : 20 + 3 = 23.\nElle a rangé 23 livres.\n⛔ Le piège : oublier l'après-midi et répondre 14. La journée, c'est le matin et l'après-midi.\nRéponse : 23.",
          micros: ["cp_probleme_schema", "cp_probleme_additif"],
          reponses: [{ attendu: "23" }],
        },
        {
          enonce: "Un livreur a 16 vélos dans son camion.\nIl en livre 9.\nChoisis la bonne phrase. Écris la lettre.\nA) Il reste 25 vélos.\nB) Il reste 7 vélos.\nC) Il livre 7 vélos.",
          correction:
            "Il livre des vélos : il en reste moins. J'enlève : 16 − 9.\n9 + 1 = 10, puis 10 + 6 = 16. J'ai ajouté 1 + 6 = 7. Donc 16 − 9 = 7.\nA) 25 est plus que 16 : impossible.\nC) Il livre 9 vélos, pas 7.\nB) Il reste 7 vélos : c'est juste.\n⛔ Le piège : choisir C. Le nombre est juste, mais la phrase ne répond pas à la question.\nRéponse : B.",
          micros: ["cp_probleme_reponse", "cp_probleme_soustractif"],
          reponses: [{ attendu: ["B", "B) Il reste 7 vélos."] }],
        },
        {
          enonce: "Pour le pique-nique, 3 enfants se partagent 18 fraises.\nChacun en a autant.\nCombien de fraises a chaque enfant ?",
          figure: collection([{ n: 18, forme: "fraise" }], { parLigne: 9 }),
          correction:
            "Je distribue les fraises une par une aux 3 enfants.\nChaque tour donne 3 fraises : 3, 6, 9, 12, 15, 18.\nJ'ai fait 6 tours : chaque enfant a 6 fraises.\nJe vérifie : 6 + 6 + 6 = 18.\n⛔ Le piège : répondre 18. C'est le nombre de toutes les fraises, pas la part d'un enfant.\nRéponse : 6.",
          micros: ["cp_probleme_partage"],
          reponses: [{ attendu: ["6", "six"] }],
          schema: ecranSeulement(groupes(3, 6, "fraise")),
        },
        {
          enonce: "Lina a 15 perles.\nElle a 6 perles de moins que Zoé.\nCombien de perles a Zoé ?",
          correction:
            "Lina en a moins que Zoé. Donc Zoé en a plus que Lina : 6 de plus.\nJ'ajoute : 15 + 6.\n15 + 5 = 20. Il reste 1 : 20 + 1 = 21.\nZoé a 21 perles.\nJe vérifie : 21 − 6 = 15.\n⛔ Le piège : voir « moins » et calculer 15 − 6 = 9. Zoé a plus de perles que Lina.\nRéponse : 21.",
          micros: ["cp_probleme_identifier", "cp_probleme_additif"],
          reponses: [{ attendu: "21" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je trouve les étapes, puis je calcule.",
      rappel: [
        "Je cherche d'abord ce qu'il faut savoir pour répondre.",
        "Je fais une étape, puis l'autre.",
        "Je vérifie avec l'histoire.",
      ],
      exercices: [
        {
          titre: "Les gâteaux de la fête",
          enonce: "La maîtresse apporte 30 gâteaux pour la fête.\nLes CP en mangent 12. Les CE1 en mangent 10.\na) Combien de gâteaux sont mangés ?\nb) Combien de gâteaux restent ?",
          correction:
            "a) Je réunis ce que mangent les deux classes : 12 + 10 = 22.\n22 gâteaux sont mangés.\nb) J'enlève les gâteaux mangés : 30 − 22.\n22 + 8 = 30. Donc il en reste 8.\n⛔ Le piège : oublier une classe et enlever seulement 12. Les deux classes mangent.\nRéponse : a) 22 ; b) 8.",
          micros: ["cp_probleme_deux_etapes", "cp_probleme_additif", "cp_probleme_defi"],
          reponses: [
            { question: "a)", attendu: "22" },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "Le jardin de Mamie Rose",
          enonce: "À Cilaos, Mamie Rose plante des piments.\nElle fait 3 rangs de 5 pieds.\nPuis elle plante encore 4 pieds.\na) Combien de pieds dans les 3 rangs ?\nb) Combien de pieds en tout ?",
          figure: groupes(3, 5, "fleur", "#16a34a"),
          correction:
            "a) Chaque rang a 5 pieds. J'ajoute 5 trois fois : 5 + 5 + 5 = 15.\n3 fois 5 = 15 pieds.\nb) Elle en plante encore 4 : 15 + 4 = 19.\nIl y a 19 pieds de piment.\n⛔ Le piège : oublier les 4 pieds plantés en plus. L'histoire continue après les rangs.\nRéponse : a) 15 ; b) 19.",
          micros: ["cp_probleme_multiplicatif", "cp_probleme_deux_etapes", "cp_probleme_defi"],
          reponses: [
            { question: "a)", attendu: ["15", "quinze"] },
            { question: "b)", attendu: ["19", "dix-neuf"] },
          ],
        },
        {
          titre: "La sortie au zoo",
          enonce: "24 enfants vont au zoo.\nOn fait des groupes de 6 enfants.\nChaque groupe a 1 adulte.\na) Combien de groupes ?\nb) Combien d'adultes ?\nc) Combien de personnes en tout ?",
          correction:
            "a) Je fais des paquets de 6 : 6, 12, 18, 24. Cela fait 4 groupes.\nb) 1 adulte par groupe, 4 groupes : 4 adultes.\nc) Je réunis les enfants et les adultes : 24 + 4 = 28.\n⛔ Le piège du c) : répondre 24. Les adultes viennent aussi.\nRéponse : a) 4 ; b) 4 ; c) 28.",
          micros: ["cp_probleme_partage", "cp_probleme_deux_etapes", "cp_probleme_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: "28" },
          ],
        },
        {
          titre: "Le défi des billes",
          enonce: "Tom et Léa ont 20 billes à eux deux.\nTom a 4 billes de plus que Léa.\na) Combien de billes a Léa ?\nb) Combien de billes a Tom ?",
          figure: barre("20", [
            { label: "Léa", poids: 10 },
            { label: "Tom", poids: 13 },
          ]),
          correction:
            "J'enlève d'abord les 4 billes de plus de Tom : 20 − 4 = 16.\nIl reste 16 billes à partager en deux parts égales.\nLa moitié de 16 : 8 + 8 = 16. Donc 8.\na) Léa a 8 billes.\nb) Tom a 4 de plus : 8 + 4 = 12.\nJe vérifie : 8 + 12 = 20, et 12 a bien 4 de plus que 8.\n⛔ Le piège : partager 20 en deux, 10 et 10. Alors Tom n'aurait pas 4 billes de plus.\nRéponse : a) 8 ; b) 12.",
          micros: ["cp_probleme_defi", "cp_probleme_schema"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
      ],
    },
  ],
};
