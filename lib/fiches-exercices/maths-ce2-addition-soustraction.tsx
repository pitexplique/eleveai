// ─── Fiche d'exercices : additions et soustractions posées (CE2) — 20 ─────────
//
// 17/11/2026 : la feuille interactive de la notion `addition_soustraction` du
// coach CE2 (« Additions et soustractions posées », 6 micros). Sur la forme
// des feuilles du CM1 (`maths-cm1-masse.tsx`, `maths-cm1-calcul.tsx`) et du
// CE1 (`maths-ce1-addition-soustraction.tsx`) : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/addition-soustraction.bank.ts`) :
// poser une addition et une soustraction avec retenues, les mots terme, somme
// et différence, compléter une égalité additive, estimer pour contrôler.
// ⛔ LIMITES DU CE2 : nombres jusqu'à 10 000.
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre.
// ⛔ Des enfants de 7-8 ans : 18 mots au plus par phrase.
//
// Les pièges nommés : oublier la retenue (1, 4), retourner la soustraction
// dans une colonne (2, 12), confondre somme et différence (3, 10), compter
// deux fois le même terme (4), compléter à la mauvaise centaine (5, 11),
// estimer au mauvais rang (6, 13, 18), un zéro qui ne se « casse » pas (7),
// aligner à gauche (8), soustraire au lieu d'ajouter (9), ajouter au lieu
// de compléter (11, 15, 20), la retenue cachée (16), oublier une des deux
// étapes (17, 18, 19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bibliothèque (9), stade (10), magasin de
// vélos (11), transport (13), marché (14), voyage de classe (17),
// boulangerie (18), vacances en voiture (19).
// Les métiers : bibliothécaire (9), chauffeur de camion (13), boulangère (18).
// UN SEUL contexte réunionnais (14, les samoussas du marché forain de
// Saint-Pierre, MODÈLE). Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : l'opération posée en colonnes (`posee`), SANS son résultat
// — sauf le résultat FAUX d'un élève qu'on demande de juger (12) — et deux
// opérations posées côte à côte (`deuxPoses`) pour l'alignement.
//
// Micro-compétences (6/6) : ce2_addition_posee (1, 4, 8, 9, 13, 14, 16, 17),
// ce2_soustraction_posee (2, 7, 10, 12, 14, 18, 19), ce2_add_sous_vocabulaire
// (3, 10, 15, 20), ce2_add_sous_complement (5, 11, 15, 17, 20),
// ce2_add_sous_estimer (6, 13, 18), ce2_add_sous_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { posee } from "@/lib/fiches-exercices/dessins-calcul-cm1";
import { deuxPoses } from "@/lib/fiches-exercices/dessins-ce1-nombres-calcul";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

export const exercicesAdditionSoustractionCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "addition-soustraction",
  titre: "Additions et soustractions posées",
  accroche:
    "Vingt exercices, du plus facile au défi. Poser une addition et une soustraction avec retenues. Les mots terme, somme et différence. Compléter jusqu'à 1 000. Estimer pour vérifier un résultat. Une bibliothèque, un stade, un camion, des samoussas et un voyage de classe. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le résultat seul.",
      rappel: [
        "Je pose les unités sous les unités. Je commence par la colonne des unités.",
        "7 + 8 = 15 : j'écris 5 et je retiens 1 dans la colonne suivante.",
        "Dans 300 + 120 = 420 : 300 et 120 sont les termes, 420 est la somme.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule 2 457 + 1 328.\na) Quelle retenue écris-tu au-dessus des dizaines ?\nb) Quel est le résultat ?",
          figure: posee(["2457", "1328"], { signe: "+", traits: [1] }),
          correction:
            "Unités : 7 + 8 = 15. J'écris 5, je retiens 1 au-dessus des dizaines.\nDizaines : 1 + 5 + 2 = 8. Centaines : 4 + 3 = 7. Milliers : 2 + 1 = 3.\nLe résultat est 3 785.\n⛔ Le piège : oublier la retenue et écrire 3 775.\nRéponse : a) 1 ; b) 3 785.",
          micros: ["ce2_addition_posee"],
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: "3 785" },
          ],
        },
        {
          enonce: "Pose et calcule 4 806 − 1 352.",
          figure: posee(["4806", "1352"], { signe: "−", traits: [1] }),
          correction:
            "Unités : 6 − 2 = 4.\nDizaines : 0 − 5, impossible. Je casse une des 8 centaines en 10 dizaines.\nIl reste 7 centaines. 10 − 5 = 5 dizaines.\nCentaines : 7 − 3 = 4. Milliers : 4 − 1 = 3.\nLe résultat est 3 454. Je vérifie : 1 352 + 3 454 = 4 806.\n⛔ Le piège : faire 5 − 0 = 5 dans les dizaines, en retournant le calcul.\nRéponse : 3 454.",
          micros: ["ce2_soustraction_posee"],
          reponses: [{ attendu: "3 454" }],
        },
        {
          enonce: "Les mots des calculs.\na) Dans 345 + 120 = 465, 465 est : A) un terme B) la somme C) la différence\nb) Dans 800 − 300 = 500, 500 est : A) la somme B) un terme C) la différence\nc) Combien de termes a l'addition 12 + 30 + 5 ?",
          correction:
            "a) Le résultat d'une addition s'appelle la somme. 465 est la somme. Réponse B.\nb) Le résultat d'une soustraction s'appelle la différence. 500 est la différence. Réponse C.\nc) Les nombres qu'on additionne sont les termes : 12, 30 et 5. Il y en a 3.\n⛔ Le piège du b) : dire « la somme » pour tous les résultats.\nRéponse : a) B ; b) C ; c) 3.",
          micros: ["ce2_add_sous_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Pose et calcule 1 205 + 348 + 2 090.",
          figure: posee(["1205", "348", "2090"], { plus: 2, signe: "+", traits: [2] }),
          correction:
            "Unités : 5 + 8 + 0 = 13. J'écris 3, je retiens 1.\nDizaines : 1 + 0 + 4 + 9 = 14. J'écris 4, je retiens 1.\nCentaines : 1 + 2 + 3 + 0 = 6. Milliers : 1 + 2 = 3.\nLe résultat est 3 643.\n⛔ Le piège : poser 348 sous les milliers. Ses unités vont sous les unités.\nRéponse : 3 643.",
          micros: ["ce2_addition_posee"],
          reponses: [{ attendu: "3 643" }],
        },
        {
          enonce: "Complète.\na) 600 + … = 1 000\nb) 3 500 + … = 4 000\nc) … + 250 = 1 000",
          correction:
            "a) De 600 à 1 000, il manque 4 centaines : 400.\nb) De 3 500 à 4 000, il manque 5 centaines : 500.\nc) De 250 à 300 : 50. De 300 à 1 000 : 700. 50 + 700 = 750.\n⛔ Le piège du c) : répondre 850. Je vérifie : 250 + 750 = 1 000.\nRéponse : a) 400 ; b) 500 ; c) 750.",
          micros: ["ce2_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "500" },
            { question: "c)", attendu: "750" },
          ],
        },
        {
          enonce: "Estime sans poser.\na) 2 980 + 4 010 est proche de : A) 600 B) 7 000 C) 70 000\nb) 6 120 − 1 990 est proche de : A) 4 000 B) 8 000 C) 400",
          correction:
            "a) 2 980 est proche de 3 000. 4 010 est proche de 4 000.\n3 000 + 4 000 = 7 000. Réponse B.\nb) 6 120 est proche de 6 000. 1 990 est proche de 2 000.\n6 000 − 2 000 = 4 000. Réponse A.\n⛔ Le piège : perdre un rang. Des milliers donnent des milliers, pas des centaines.\nRéponse : a) B ; b) A.",
          micros: ["ce2_add_sous_estimer"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce: "Pose et calcule 5 000 − 1 275.",
          figure: posee(["5000", "1275"], { signe: "−", traits: [1] }),
          correction:
            "Unités : 0 − 5, impossible. Il n'y a ni dizaine ni centaine à casser.\nJe casse un millier : 5 000 = 4 milliers, 9 centaines, 9 dizaines et 10 unités.\nUnités : 10 − 5 = 5. Dizaines : 9 − 7 = 2.\nCentaines : 9 − 2 = 7. Milliers : 4 − 1 = 3.\nLe résultat est 3 725. Je vérifie : 1 275 + 3 725 = 5 000.\n⛔ Le piège : écrire 5 − 0 = 5 dans chaque colonne.\nRéponse : 3 725.",
          micros: ["ce2_soustraction_posee"],
          reponses: [{ attendu: "3 725" }],
        },
        {
          enonce: "Malo veut calculer 3 482 + 516.\na) Quelle opération est bien posée ? A ou B ?\nb) Quel est le résultat ?",
          figure: deuxPoses(["3482", "516 "], ["3482", "516"]),
          correction:
            "a) Dans A, le 5 de 516 est sous le 3 des milliers. C'est faux : 5 vaut 5 centaines.\nDans B, les unités sont sous les unités. B est bien posée.\nb) 2 + 6 = 8. 8 + 1 = 9. 4 + 5 = 9. Il reste le 3.\nLe résultat est 3 998.\n⛔ Le piège : aligner à gauche, comme quand on écrit une phrase.\nRéponse : a) B ; b) 3 998.",
          micros: ["ce2_addition_posee"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "3 998" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis l'histoire. Je choisis l'opération, puis je la pose.",
      rappel: [
        "On réunit ou on ajoute : addition. On enlève ou on compare : soustraction.",
        "865 + … = 1 000 : je cherche ce qui manque.",
        "Je vérifie une soustraction par une addition.",
      ],
      exercices: [
        {
          enonce: "La bibliothécaire a 2 750 livres. Elle en achète 1 380 de plus.\na) Quel calcul faut-il faire ? A) 2 750 − 1 380 B) 2 750 + 1 380 C) 1 380 − 2 750\nb) Combien de livres a-t-elle maintenant ?",
          correction:
            "a) Elle ajoute des livres : c'est une addition. Réponse B.\nb) Unités : 0 + 0 = 0. Dizaines : 5 + 8 = 13, j'écris 3, je retiens 1.\nCentaines : 1 + 7 + 3 = 11, j'écris 1, je retiens 1. Milliers : 1 + 2 + 1 = 4.\nElle a 4 130 livres.\n⛔ Le piège : oublier la 2e retenue, et écrire 4 030.\nRéponse : a) B ; b) 4 130.",
          micros: ["ce2_addition_posee"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "4 130" },
          ],
        },
        {
          enonce: "Le stade a 6 400 places. 4 785 spectateurs sont venus.\na) Combien de places sont vides ?\nb) Ce nombre est : A) la somme B) la différence",
          correction:
            "a) J'enlève les places prises : 6 400 − 4 785.\nUnités : 0 − 5, impossible. Il n'y a pas de dizaine : je casse une centaine.\n6 400 = 6 milliers, 3 centaines, 9 dizaines, 10 unités.\n10 − 5 = 5. 9 − 8 = 1. 3 − 7 : je casse un millier, 13 − 7 = 6. 5 − 4 = 1.\nIl y a 1 615 places vides. Je vérifie : 4 785 + 1 615 = 6 400.\nb) C'est le résultat d'une soustraction : la différence. Réponse B.\n⛔ Le piège : poser 4 785 − 6 400. Le grand nombre va en haut.\nRéponse : a) 1 615 ; b) B.",
          micros: ["ce2_soustraction_posee", "ce2_add_sous_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "1 615" },
            { question: "b)", attendu: "B" },
          ],
        },
        {
          enonce: "Un vélo coûte 1 000 €. Sami a 865 €.\na) Combien lui manque-t-il ?\nb) Complète : … + 1 450 = 2 000.",
          correction:
            "a) Je complète 865 jusqu'à 1 000.\nDe 865 à 870 : 5. De 870 à 900 : 30. De 900 à 1 000 : 100.\n5 + 30 + 100 = 135. Il lui manque 135 €.\nb) De 1 450 à 1 500 : 50. De 1 500 à 2 000 : 500. 50 + 500 = 550.\n⛔ Le piège : ajouter 865 + 1 000. On cherche ce qui manque.\nRéponse : a) 135 ; b) 550.",
          micros: ["ce2_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: "135" },
            { question: "b)", attendu: "550" },
          ],
        },
        {
          enonce: "Zoé a posé 724 − 358. Elle a trouvé 434.\na) Zoé a-t-elle juste ? Réponds oui ou non.\nb) Quel est le bon résultat ?",
          figure: posee(["724", "358", "434"], { signe: "−", traits: [1] }),
          correction:
            "a) Je vérifie : 358 + 434 = 792. Ce n'est pas 724. Non, c'est faux.\nZoé a fait 8 − 4 au lieu de 4 − 8. Elle a retourné le calcul.\nb) Unités : 4 − 8, impossible. Je casse une dizaine : 14 − 8 = 6.\nDizaines : il reste 1. 1 − 5, impossible. Je casse une centaine : 11 − 5 = 6.\nCentaines : il reste 6. 6 − 3 = 3. Le résultat est 366.\n⛔ Le piège : prendre toujours le petit chiffre au grand, dans chaque colonne.\nRéponse : a) non ; b) 366.",
          micros: ["ce2_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: NON },
            { question: "b)", attendu: "366" },
          ],
        },
        {
          enonce: "Un camion peut porter 6 000 kg. Le chauffeur charge 2 980 kg, puis 2 040 kg.\na) Estime le total. A) environ 500 kg B) environ 5 000 kg C) environ 50 000 kg\nb) Calcule le total exact.\nc) Le camion peut-il tout porter ? Réponds oui ou non.",
          correction:
            "a) 2 980 est proche de 3 000. 2 040 est proche de 2 000. 3 000 + 2 000 = 5 000. Réponse B.\nb) Je pose 2 980 + 2 040. 0 + 0 = 0. 8 + 4 = 12, je retiens 1.\n1 + 9 + 0 = 10, je retiens 1. 1 + 2 + 2 = 5. Le total est 5 020 kg.\nc) 5 020 < 6 000. Oui, le camion peut tout porter.\n⛔ Le piège du a) : estimer 2 980 à 2 000. Il est bien plus près de 3 000.\nRéponse : a) B ; b) 5 020 ; c) oui.",
          micros: ["ce2_add_sous_estimer", "ce2_addition_posee"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "5 020", unite: "kg" },
            { question: "c)", attendu: OUI },
          ],
        },
        {
          enonce: "Au marché forain de Saint-Pierre, une association vend 1 245 samoussas samedi. Dimanche, elle en vend 980.\na) Combien en vend-elle en tout ?\nb) Combien en vend-elle de plus samedi ?",
          correction:
            "a) Je réunis : 1 245 + 980.\n5 + 0 = 5. 4 + 8 = 12, je retiens 1. 1 + 2 + 9 = 12, je retiens 1. 1 + 1 = 2.\nElle vend 2 225 samoussas.\nb) Je compare : 1 245 − 980. 5 − 0 = 5. 4 − 8 : je casse une centaine, 14 − 8 = 6.\nIl reste 1 centaine : 1 − 9, je casse le millier, 11 − 9 = 2. Il reste 0 millier.\nElle en vend 265 de plus. Je vérifie : 980 + 265 = 1 245.\n⛔ Le piège du b) : ajouter encore. « De plus » demande l'écart.\nRéponse : a) 2 225 ; b) 265.",
          micros: ["ce2_addition_posee", "ce2_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: "2 225" },
            { question: "b)", attendu: "265" },
          ],
        },
        {
          enonce: "Les termes et la différence.\na) La somme de deux termes est 1 500. Un terme est 700. Quel est l'autre ?\nb) Quelle est la différence entre 2 000 et 1 250 ?",
          correction:
            "a) 700 + … = 1 500. De 700 à 1 500 : 300 pour aller à 1 000, puis 500.\n300 + 500 = 800. L'autre terme est 800.\nb) La différence, c'est 2 000 − 1 250. De 1 250 à 2 000 : 750.\n⛔ Le piège du a) : ajouter 1 500 + 700. On cherche un terme, pas la somme.\nRéponse : a) 800 ; b) 750.",
          micros: ["ce2_add_sous_vocabulaire", "ce2_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: "800" },
            { question: "b)", attendu: "750" },
          ],
        },
        {
          enonce: "Un chiffre est caché dans cette addition. Quel chiffre remplace le « ? » ?",
          figure: posee(["2?65", "1438", "4103"], { signe: "+", traits: [1] }),
          correction:
            "Unités : 5 + 8 = 13. J'écris 3, je retiens 1.\nDizaines : 1 + 6 + 3 = 10. J'écris 0, je retiens 1.\nCentaines : 1 + ? + 4 doit finir par 1. 1 + 4 = 5. 5 + 6 = 11.\nLe chiffre caché est 6. Je retiens 1 : milliers, 1 + 2 + 1 = 4.\nJe vérifie : 2 665 + 1 438 = 4 103.\n⛔ Le piège : oublier la retenue des dizaines, et trouver 7.\nRéponse : 6.",
          micros: ["ce2_addition_posee"],
          reponses: [{ attendu: ["6", "six"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Défis ───────────────────────── */
    {
      niveau: 3,
      titre: "Défis",
      consigne: "Je lis tout. Je fais une étape, puis l'autre.",
      rappel: [
        "Je cherche d'abord ce qu'on sait, puis ce qu'on demande.",
        "J'estime avant de poser : mon résultat doit être proche.",
        "À la fin, je relis la question.",
      ],
      exercices: [
        {
          titre: "Le voyage de la classe",
          enonce: "La classe veut 2 500 € pour un voyage.\nElle gagne 1 380 € à la kermesse et 745 € avec un loto.\na) Combien a-t-elle gagné ?\nb) Combien lui manque-t-il ?",
          correction:
            "a) Je réunis : 1 380 + 745.\n0 + 5 = 5. 8 + 4 = 12, je retiens 1. 1 + 3 + 7 = 11, je retiens 1. 1 + 1 = 2.\nElle a gagné 2 125 €.\nb) Je complète 2 125 jusqu'à 2 500.\nDe 2 125 à 2 200 : 75. De 2 200 à 2 500 : 300. 75 + 300 = 375.\nIl manque 375 €.\n⛔ Le piège : s'arrêter au a). La question b) demande ce qui manque.\nRéponse : a) 2 125 ; b) 375.",
          micros: ["ce2_add_sous_defi", "ce2_addition_posee", "ce2_add_sous_complement"],
          reponses: [
            { question: "a)", attendu: "2 125" },
            { question: "b)", attendu: "375" },
          ],
        },
        {
          titre: "Les baguettes de la boulangère",
          enonce: "La boulangère cuit 1 200 baguettes. Elle en vend 785 le matin et 268 le soir.\na) Combien en a-t-elle vendu ?\nb) Combien en reste-t-il ?\nc) Estime le reste. A) environ 150 B) environ 1 500 C) environ 15",
          correction:
            "a) 785 + 268. 5 + 8 = 13, je retiens 1. 1 + 8 + 6 = 15, je retiens 1. 1 + 7 + 2 = 10.\nElle a vendu 1 053 baguettes.\nb) 1 200 − 1 053. De 1 053 à 1 100 : 47. De 1 100 à 1 200 : 100.\n47 + 100 = 147. Il en reste 147.\nc) J'estime : 800 + 250 = 1 050. 1 200 − 1 050 = 150. 147 est proche de 150. Réponse A.\n⛔ Le piège : enlever seulement les baguettes du matin.\nRéponse : a) 1 053 ; b) 147 ; c) A.",
          micros: ["ce2_add_sous_defi", "ce2_add_sous_estimer", "ce2_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: "1 053" },
            { question: "b)", attendu: "147" },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          titre: "Les vacances en voiture",
          enonce: "Une famille veut rouler 3 450 km cet été.\nElle roule 1 875 km la 1re semaine et 990 km la 2e semaine.\na) Combien de kilomètres a-t-elle déjà faits ?\nb) Combien de kilomètres lui reste-t-il ?",
          correction:
            "a) 1 875 + 990. 5 + 0 = 5. 7 + 9 = 16, je retiens 1.\n1 + 8 + 9 = 18, je retiens 1. 1 + 1 = 2. Elle a fait 2 865 km.\nb) 3 450 − 2 865. Je complète : de 2 865 à 2 900 : 35. De 2 900 à 3 450 : 550.\n35 + 550 = 585. Il reste 585 km.\nJe vérifie : 2 865 + 585 = 3 450.\n⛔ Le piège : faire 3 450 − 1 875 et oublier la 2e semaine.\nRéponse : a) 2 865 ; b) 585.",
          micros: ["ce2_add_sous_defi", "ce2_soustraction_posee"],
          reponses: [
            { question: "a)", attendu: "2 865", unite: "km" },
            { question: "b)", attendu: "585", unite: "km" },
          ],
        },
        {
          titre: "Le nombre caché",
          enonce: "Je pense à un nombre. Je lui ajoute 1 250 et je trouve 4 000.\na) Quel est mon nombre ?\nb) Quelle est la différence entre 4 000 et mon nombre ?",
          correction:
            "a) … + 1 250 = 4 000. Je cherche ce qui manque : 4 000 − 1 250.\nDe 1 250 à 2 000 : 750. De 2 000 à 4 000 : 2 000. 750 + 2 000 = 2 750.\nMon nombre est 2 750. Je vérifie : 2 750 + 1 250 = 4 000.\nb) 4 000 − 2 750 = 1 250. C'est le nombre que j'avais ajouté.\n⛔ Le piège du a) : faire 4 000 + 1 250. On cherche le nombre de départ.\nRéponse : a) 2 750 ; b) 1 250.",
          micros: ["ce2_add_sous_defi", "ce2_add_sous_complement", "ce2_add_sous_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "2 750" },
            { question: "b)", attendu: "1 250" },
          ],
        },
      ],
    },
  ],
};
