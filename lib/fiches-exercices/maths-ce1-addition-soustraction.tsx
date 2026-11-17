// ─── Fiche d'exercices : additions et soustractions (CE1) — 20 exercices ──────
//
// 17/11/2026 : la feuille interactive de la notion `addition_soustraction` du
// coach CE1 (« Additions et soustractions », 5 micros). Sur la forme des
// feuilles du CM1 (`maths-cm1-masse.tsx`, `maths-cm1-calcul.tsx`) : 8 ★,
// 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/ce1/maths/addition-soustraction.bank.ts`) :
// poser une addition de deux ou trois nombres, une soustraction, trouver le
// nombre qui manque, estimer un résultat, l'erreur d'un camarade.
// ⛔ LIMITES DU CE1 : des nombres et des résultats jusqu'à 1 000 ; aucune
// méthode de soustraction imposée (on « casse » une dizaine, sans le nom).
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre.
// ⛔ Des enfants de 6-7 ans qui lisent mal : 16 mots au plus par phrase.
//
// Les pièges nommés : aligner à gauche (1, 4), oublier la retenue (2, 11),
// soustraire le petit chiffre du grand (3, 9), compter à l'envers pour un
// complément (5, 12), calculer au lieu d'estimer (6, 13), additionner au lieu
// de soustraire (8, 14), oublier un des trois nombres (10), oublier la 2e
// étape (15, 17, 18), le chiffre caché pris au hasard (16), refaire
// « + 150 » au lieu de l'enlever (19), confondre ce qui est couru et ce qui
// reste (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : zoo (7, 17), boulangerie (8), jeu de
// points (13), lecture (14), ferme (15), bibliothèque (18), devinettes (19),
// course de relais (20).
// Les métiers : boulangère (8), fermier (15), bibliothécaire (18),
// chauffeur de car (17).
// Aucun contexte réunionnais dans cette feuille (les six autres du lot en
// portent un).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : l'opération posée sans son résultat (`posee`), deux poses
// côte à côte à comparer (`deuxPoses`).
//
// Micro-compétences (5/5) : ce1_addition_posee (1, 2, 4, 7, 10, 11, 13, 16,
// 17, 18, 20), ce1_soustraction_posee (3, 8, 9, 14, 15, 17, 18, 20),
// ce1_add_sous_complement (5, 12, 16, 19), ce1_add_sous_estimer (6, 13, 20),
// ce1_add_sous_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { posee } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { deuxPoses } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

export const exercicesAdditionSoustractionCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "addition-soustraction",
  titre: "Additions et soustractions",
  accroche:
    "Vingt exercices, du plus facile au défi. Poser une addition, avec ou sans retenue. Poser une soustraction. Trouver le nombre qui manque. Estimer un résultat sans poser. Un zoo, une boulangerie, une ferme, une bibliothèque et une course de relais. Lis le rappel avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je pose l'opération au brouillon. J'écris le résultat seul.",
      rappel: [
        "Je pose les unités sous les unités, les dizaines sous les dizaines.",
        "Je calcule en commençant par les unités, à droite.",
        "10 unités ou plus ? J'écris les unités et je retiens 1 dizaine.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule.\na) 234 + 152\nb) 405 + 71",
          figure: posee(["234", "152"], { signe: "+", traits: [1] }),
          correction:
            "Je pose les chiffres en colonnes, unités sous unités.\na) Unités : 4 + 2 = 6. Dizaines : 3 + 5 = 8. Centaines : 2 + 1 = 3.\nDonc 234 + 152 = 386.\nb) Je mets le 1 de 71 sous le 5 de 405.\nUnités : 5 + 1 = 6. Dizaines : 0 + 7 = 7. Centaines : 4.\nDonc 405 + 71 = 476.\n⛔ Le piège du b) : poser 71 sous le 40. Le 1 va sous les unités.\nRéponse : a) 386 ; b) 476.",
          micros: ["ce1_addition_posee"],
          reponses: [
            { question: "a)", attendu: "386" },
            { question: "b)", attendu: "476" },
          ],
        },
        {
          enonce: "Pose et calcule. Attention aux retenues.\na) 47 + 38\nb) 165 + 27",
          figure: posee(["47", "38"], { signe: "+", traits: [1] }),
          correction:
            "a) Unités : 7 + 8 = 15. J'écris 5, je retiens 1 dizaine.\nDizaines : 4 + 3 = 7, plus la retenue : 8.\nDonc 47 + 38 = 85.\nb) Unités : 5 + 7 = 12. J'écris 2, je retiens 1.\nDizaines : 6 + 2 = 8, plus 1 : 9. Centaines : 1.\nDonc 165 + 27 = 192.\n⛔ Le piège : oublier la retenue, et trouver 75 au a).\nRéponse : a) 85 ; b) 192.",
          micros: ["ce1_addition_posee"],
          reponses: [
            { question: "a)", attendu: "85" },
            { question: "b)", attendu: "192" },
          ],
        },
        {
          enonce: "Pose et calcule.\na) 587 − 243\nb) 96 − 54",
          figure: posee(["587", "243"], { signe: "−", traits: [1] }),
          correction:
            "Je commence par les unités. J'enlève le chiffre du bas au chiffre du haut.\na) Unités : 7 − 3 = 4. Dizaines : 8 − 4 = 4. Centaines : 5 − 2 = 3.\nDonc 587 − 243 = 344.\nb) Unités : 6 − 4 = 2. Dizaines : 9 − 5 = 4.\nDonc 96 − 54 = 42.\nJe vérifie : 42 + 54 = 96.\n⛔ Le piège : commencer par la gauche. Je commence toujours par les unités.\nRéponse : a) 344 ; b) 42.",
          micros: ["ce1_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: "344" },
            { question: "b)", attendu: "42" },
          ],
        },
        {
          enonce: "Pour calculer 45 + 7, quelle opération est bien posée ?\nÉcris la lettre.",
          figure: deuxPoses(["45", "7 "], ["45", "7"]),
          correction:
            "Le 7 de 45 + 7, ce sont 7 unités.\nIl doit être sous le 5, la colonne des unités.\nDans A, le 7 est sous le 4 : il compte pour 70. C'est faux.\nDans B, le 7 est sous le 5. C'est juste.\nEt 45 + 7 = 52.\n⛔ Le piège : poser à gauche, comme on écrit. A donne 115 au lieu de 52.\nRéponse : B.",
          micros: ["ce1_addition_posee"],
          reponses: [{ attendu: ["B"] }],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 30 + … = 50\nb) 45 + … = 50\nc) … − 10 = 25",
          correction:
            "a) Je compte de 30 jusqu'à 50 : 40, 50. Ce sont 2 dizaines. Il manque 20.\nb) De 45 à 50 : 46, 47, 48, 49, 50. Il manque 5.\nc) J'ai enlevé 10 et il reste 25. Avant, il y avait 25 + 10 = 35.\nJe vérifie : 35 − 10 = 25.\n⛔ Le piège du c) : faire 25 − 10 = 15. On cherche le nombre de départ : il est plus grand.\nRéponse : a) 20 ; b) 5 ; c) 35.",
          micros: ["ce1_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: ["20", "vingt"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: "35" },
          ],
        },
        {
          enonce: "Ne pose pas l'opération. Choisis le résultat le plus proche.\na) 198 + 301 : A) 300 B) 500 C) 700\nb) 612 − 395 : A) 200 B) 400 C) 1 000",
          correction:
            "J'arrondis chaque nombre à la centaine la plus proche.\na) 198 est presque 200. 301 est presque 300.\n200 + 300 = 500. Réponse B.\nb) 612 est presque 600. 395 est presque 400.\n600 − 400 = 200. Réponse A.\n⛔ Le piège : poser l'opération en entier. Estimer, c'est calculer avec des nombres ronds.\nRéponse : a) B ; b) A.",
          micros: ["ce1_add_sous_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 500"] },
            { question: "b)", attendu: ["A", "A) 200"] },
          ],
        },
        {
          enonce: "Au zoo, 125 adultes et 64 enfants entrent le matin.\nCombien de visiteurs entrent en tout ?",
          correction:
            "« En tout » : j'ajoute les adultes et les enfants.\nJe pose 125 + 64.\nUnités : 5 + 4 = 9. Dizaines : 2 + 6 = 8. Centaines : 1.\n125 + 64 = 189.\n⛔ Le piège : poser 64 sous 12. Le 4 de 64 va sous le 5 de 125.\nRéponse : 189.",
          micros: ["ce1_addition_posee"],
          reponses: [{ attendu: "189" }],
        },
        {
          enonce: "Une boulangère a cuit 85 baguettes.\nElle en vend 52.\nCombien de baguettes lui reste-t-il ?",
          correction:
            "Elle vend des baguettes : il en reste moins. Je fais une soustraction.\nJe pose 85 − 52.\nUnités : 5 − 2 = 3. Dizaines : 8 − 5 = 3.\n85 − 52 = 33.\nJe vérifie : 33 + 52 = 85.\n⛔ Le piège : additionner, et trouver 137. « Il reste » veut dire qu'on enlève.\nRéponse : 33.",
          micros: ["ce1_soustraction_posee"],
          reponses: [{ attendu: "33" }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes, ou une retenue. Je vérifie mon résultat.",
      rappel: [
        "Pas assez d'unités en haut ? Je casse 1 dizaine en 10 unités.",
        "Je vérifie une soustraction par une addition : 37 + 35 = 72.",
        "Pour trouver ce qui manque, je compte du petit nombre jusqu'au grand.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule.\na) 72 − 35\nb) 340 − 125",
          figure: posee(["72", "35"], { signe: "−", traits: [1] }),
          correction:
            "a) Unités : 2 − 5, je ne peux pas. Je casse 1 dizaine de 72.\nIl reste 6 dizaines et 12 unités. 12 − 5 = 7.\nDizaines : 6 − 3 = 3. Donc 72 − 35 = 37.\nb) Unités : 0 − 5, je ne peux pas. Je casse 1 dizaine : 10 − 5 = 5.\nDizaines : il en reste 3. 3 − 2 = 1. Centaines : 3 − 1 = 2.\nDonc 340 − 125 = 215.\nJe vérifie : 37 + 35 = 72 et 215 + 125 = 340.\n⛔ Le piège : faire 5 − 2 = 3 en bas, et trouver 43. On enlève toujours le chiffre du bas.\nRéponse : a) 37 ; b) 215.",
          micros: ["ce1_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: "37" },
            { question: "b)", attendu: "215" },
          ],
        },
        {
          enonce: "Pose et calcule : 128 + 45 + 206.",
          figure: posee(["128", "45", "206"], { plus: 2, signe: "+", traits: [2] }),
          correction:
            "Je pose les trois nombres, unités sous unités.\nUnités : 8 + 5 + 6 = 19. J'écris 9, je retiens 1.\nDizaines : 2 + 4 + 0 = 6, plus 1 : 7.\nCentaines : 1 + 2 = 3.\n128 + 45 + 206 = 379.\n⛔ Le piège : oublier le troisième nombre. Je compte les lignes avant de commencer.\nRéponse : 379.",
          micros: ["ce1_addition_posee"],
          reponses: [{ attendu: "379" }],
        },
        {
          enonce: "Tom a posé 356 + 78. Il trouve 424.\na) Tom a-t-il juste ? Réponds oui ou non.\nb) Quel est le bon résultat ?",
          figure: posee(["356", "78", "424"], { signe: "+", traits: [1] }),
          correction:
            "Je refais le calcul.\nUnités : 6 + 8 = 14. J'écris 4, je retiens 1.\nDizaines : 5 + 7 = 12, plus 1 : 13. J'écris 3, je retiens 1.\nCentaines : 3, plus 1 : 4.\n356 + 78 = 434.\na) Tom a trouvé 424 : non, c'est faux.\nb) Le bon résultat est 434.\n⛔ Le piège de Tom : il a oublié la retenue des unités.\nRéponse : a) non ; b) 434.",
          micros: ["ce1_addition_posee"],
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: "434" },
          ],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 250 + … = 400\nb) 700 − … = 480\nc) … + 75 = 100",
          correction:
            "a) De 250 à 300 : 50. De 300 à 400 : 100. 50 + 100 = 150.\nb) De 480 à 500 : 20. De 500 à 700 : 200. 20 + 200 = 220.\nJe vérifie : 700 − 220 = 480.\nc) De 75 à 100 : 25. Le nombre est 25.\n⛔ Le piège du b) : faire 700 − 480 de tête et se tromper. Je compte par étapes.\nRéponse : a) 150 ; b) 220 ; c) 25.",
          micros: ["ce1_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: "150" },
            { question: "b)", attendu: "220" },
            { question: "c)", attendu: "25" },
          ],
        },
        {
          enonce: "Au jeu de fléchettes, une équipe veut 300 points.\nElle a 189 points. Puis elle gagne 98 points.\na) Estime : a-t-elle plus de 300 points ? Réponds oui ou non.\nb) Combien a-t-elle de points exactement ?",
          correction:
            "a) J'estime : 189, c'est presque 190. 98, c'est presque 100.\n190 + 100 = 290. C'est moins que 300 : non.\nb) Je pose 189 + 98.\nUnités : 9 + 8 = 17. J'écris 7, je retiens 1.\nDizaines : 8 + 9 = 17, plus 1 : 18. J'écris 8, je retiens 1.\nCentaines : 1, plus 1 : 2. Donc 287.\n287 est bien près de 290 : mon estimation était bonne.\n⛔ Le piège : répondre oui parce que 98 est « presque 100 ». Je calcule l'estimation jusqu'au bout.\nRéponse : a) non ; b) 287.",
          micros: ["ce1_add_sous_estimer", "ce1_addition_posee"],
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: "287" },
          ],
        },
        {
          enonce: "Hugo a lu 145 pages. Sara a lu 210 pages.\nCombien de pages Sara a-t-elle lu de plus que Hugo ?",
          correction:
            "« De plus » : je cherche l'écart entre les deux nombres.\nJe calcule 210 − 145.\nDe 145 à 150 : 5. De 150 à 200 : 50. De 200 à 210 : 10.\n5 + 50 + 10 = 65.\nJe vérifie : 145 + 65 = 210.\n⛔ Le piège : additionner, et trouver 355. « De plus » demande l'écart, pas le total.\nRéponse : 65.",
          micros: ["ce1_soustraction_posee"],
          reponses: [{ attendu: "65" }],
        },
        {
          enonce: "Un fermier a 250 œufs.\nIl en vend 120 le matin et 85 l'après-midi.\nCombien d'œufs lui reste-t-il ?",
          correction:
            "Étape 1 : après le matin. 250 − 120 = 130.\nÉtape 2 : après l'après-midi. 130 − 85.\nUnités : 0 − 5, je casse 1 dizaine : 10 − 5 = 5.\nDizaines : il en reste 2. 2 − 8, je casse 1 centaine : 12 − 8 = 4.\nCentaines : il n'en reste plus. Donc 45.\nJe vérifie : 120 + 85 + 45 = 250.\n⛔ Le piège : s'arrêter à 130. Il a encore vendu des œufs l'après-midi.\nRéponse : 45.",
          micros: ["ce1_soustraction_posee"],
          reponses: [{ attendu: "45" }],
        },
        {
          enonce: "Dans cette addition, deux chiffres sont cachés.\nA et B sont des chiffres.\nTrouve A et B.",
          figure: posee(["4A3", "25B", "698"], { signe: "+", traits: [1] }),
          correction:
            "Je commence par les unités.\nUnités : 3 + B = 8. 3 + 5 = 8, donc B = 5.\nIl n'y a pas de retenue.\nDizaines : A + 5 = 9. 4 + 5 = 9, donc A = 4.\nJe vérifie : 443 + 255 = 698.\n⛔ Le piège : choisir un chiffre au hasard. Je cherche colonne par colonne.\nRéponse : A = 4 ; B = 5.",
          micros: ["ce1_addition_posee", "ce1_add_sous_complement"],
          reponses: [
            { question: "A", attendu: ["4", "quatre"] },
            { question: "B", attendu: ["5", "cinq"] },
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
        "« En tout » : j'ajoute. « Il reste » : j'enlève.",
        "Je fais une étape, j'écris son résultat, puis je passe à la suivante.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Le car du zoo",
          enonce: "Deux classes vont au zoo en car.\nIl y a 24 élèves dans l'une et 27 dans l'autre.\n6 adultes viennent aussi. Le car a 60 places.\na) Combien de personnes montent dans le car ?\nb) Combien de places restent vides ?",
          correction:
            "a) J'ajoute tout le monde : 24 + 27 + 6.\n24 + 27 = 51. Puis 51 + 6 = 57.\nb) 60 places, 57 personnes : 60 − 57 = 3.\nJe vérifie : 57 + 3 = 60.\n⛔ Le piège du a) : oublier les 6 adultes. Ils prennent une place eux aussi.\nRéponse : a) 57 ; b) 3.",
          micros: ["ce1_addition_posee", "ce1_soustraction_posee", "ce1_add_sous_defi"],
          reponses: [
            { question: "a)", attendu: "57" },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "La bibliothécaire",
          enonce: "La bibliothèque a 950 livres.\nLundi, la bibliothécaire en prête 320. Mardi, elle en prête 148.\nMercredi, elle reçoit 75 livres neufs.\na) Combien de livres reste-t-il lundi soir ?\nb) Et mardi soir ?\nc) Et mercredi soir ?",
          correction:
            "a) 950 − 320 = 630.\nb) 630 − 148. Unités : 0 − 8, je casse 1 dizaine : 10 − 8 = 2.\nDizaines : il en reste 2. 2 − 4, je casse 1 centaine : 12 − 4 = 8.\nCentaines : il en reste 5. 5 − 1 = 4. Donc 482.\nc) Elle reçoit des livres : j'ajoute. 482 + 75 = 557.\n⛔ Le piège du c) : enlever encore les 75 livres. Elle les reçoit : il y en a plus.\nRéponse : a) 630 ; b) 482 ; c) 557.",
          micros: ["ce1_soustraction_posee", "ce1_addition_posee", "ce1_add_sous_defi"],
          reponses: [
            { question: "a)", attendu: "630" },
            { question: "b)", attendu: "482" },
            { question: "c)", attendu: "557" },
          ],
        },
        {
          titre: "Les devinettes",
          enonce: "a) Je pense à un nombre. J'ajoute 150. Je trouve 420. Quel est mon nombre ?\nb) Ma sœur pense à un nombre. Elle enlève 35. Elle trouve 165. Quel est son nombre ?",
          correction:
            "a) Mon nombre + 150 = 420. Je fais le chemin à l'envers : 420 − 150.\n420 − 100 = 320. Puis 320 − 50 = 270.\nJe vérifie : 270 + 150 = 420.\nb) Son nombre − 35 = 165. À l'envers, j'ajoute : 165 + 35.\n165 + 35 = 200.\nJe vérifie : 200 − 35 = 165.\n⛔ Le piège : refaire « + 150 » au a). Pour revenir en arrière, je fais l'inverse.\nRéponse : a) 270 ; b) 200.",
          micros: ["ce1_add_sous_complement", "ce1_add_sous_defi"],
          reponses: [
            { question: "a)", attendu: "270" },
            { question: "b)", attendu: "200" },
          ],
        },
        {
          titre: "La course de relais",
          enonce: "Une course de relais fait 1 000 mètres.\nAna court 350 mètres. Puis Bilal court 280 mètres.\nChloé court la fin de la course.\na) Combien de mètres ont couru Ana et Bilal ensemble ?\nb) Combien de mètres court Chloé ?\nc) Qui court le plus long morceau : Ana, Bilal ou Chloé ?",
          correction:
            "a) 350 + 280. Dizaines : 5 + 8 = 13. J'écris 3, je retiens 1.\nCentaines : 3 + 2 = 5, plus 1 : 6. Donc 630 mètres.\nb) Chloé court ce qui reste : 1 000 − 630.\nDe 630 à 700 : 70. De 700 à 1 000 : 300. 70 + 300 = 370.\nc) Je compare 350, 280 et 370. Le plus grand est 370 : c'est Chloé.\n⛔ Le piège du c) : répondre Ana, la première. On compare les longueurs, pas l'ordre de départ.\nRéponse : a) 630 ; b) 370 ; c) Chloé.",
          micros: ["ce1_addition_posee", "ce1_soustraction_posee", "ce1_add_sous_estimer", "ce1_add_sous_defi"],
          reponses: [
            { question: "a)", attendu: "630" },
            { question: "b)", attendu: "370" },
            { question: "c)", attendu: ["Chloé", "Chloe"] },
          ],
        },
      ],
    },
  ],
};
