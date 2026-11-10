// ─── Fiche d'exercices : la division (CM1) — 20 exercices corrigés ────────────
//
// 10/11/2026 : la feuille de la notion `division` du coach CM1 (6 micros : le
// sens, le lien avec la multiplication, la division posée, le reste, les
// problèmes, les défis). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★,
// 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne, étape
// par étape, avec le piège nommé. Alignée sur la carte mentale `cm1/division`
// (`lib/cartes/remplies/cm1.json`) et sur la banque du coach
// (`lib/tutor-v4/questionBank/cm1/maths/division.bank.ts`) : un dividende de
// 2 ou 3 chiffres, un diviseur d'un chiffre.
// ⛔ Le signe « ÷ » partout, jamais 12/3 (Frédéric, 06/10 : ses élèves ne
// lisent pas la barre comme une division).
// ⛔ Le quotient et le reste se saisissent en DEUX sous-questions séparées.
// ⛔ Aucune question à rédiger : un nombre, vrai ou faux, une lettre.
//
// ⭐ LES BILLES (Frédéric, 07/10) : 12 billes en 3 rangées de 4, encadrées par
// colonnes (12 ÷ 4 = 3) puis par rangées (12 ÷ 3 = 4) : on ne bouge aucune
// bille (1). Puis le reste, en billes grises (5).
// ⛔ Les pièges nommés : enlever au lieu de partager (1, 2), 42 − 6 au lieu de
// 42 ÷ 6 (3), le reste pris pour le quotient (6, 7), le reste oublié dans la
// division posée (9, 10), le reste plus grand que le diviseur (11), oublier la
// part de plus (12, 17, 18), multiplier au lieu de partager (13).
//
// ⭐ LES MATHS SONT TRANSVERSALES : billes (1, 5), jeu de cartes (2),
// jardinage (2), sport nautique (12, canoës), couture (13), jeu vidéo (16),
// randonnée (17), bibliothèque (18), pâtisserie (19), énigmes (20).
// Les métiers : couturière (13), guide de montagne (17), bibliothécaire (18),
// pâtissier (19). UN contexte réunionnais : le Piton des Neiges (17), sans
// fait chiffré. Tous les nombres sont des MODÈLES.
//
// Micro-compétences : division_sens (1, 2, 7, 16), division_lien_
// multiplication (1, 3, 4, 8, 14, 15, 16), division_posee (9, 10, 11, 18, 19),
// division_reste (5, 6, 7, 11, 12, 13, 17, 18), division_probleme (2, 12, 13,
// 16, 17, 18, 19), division_defi (14, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, numeration, potence } from "@/lib/fiches-exercices/dessins-calcul-cm1";

export const exercicesDivisionCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "division",
  titre: "La division",
  accroche:
    "Vingt exercices, du geste seul au problème. Partager en parts égales, faire des paquets. Lire deux divisions dans un rectangle de billes. Retrouver une division dans les tables. Poser une division, trouver le quotient et le reste. Savoir quand il faut une part de plus. Des cartes, des graines, des canoës, un ruban, un jeu vidéo, une randonnée, une bibliothèque, des macarons et des énigmes. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche dans les tables de multiplication.",
      rappel: [
        "Diviser, c'est partager en parts égales, ou faire des paquets égaux.",
        "Une multiplication donne deux divisions : $3 \\times 4 = 12$, donc $12 \\div 4 = 3$ et $12 \\div 3 = 4$.",
        "Le reste, c'est ce qui ne fait pas un paquet entier. Il est plus petit que le diviseur.",
      ],
      exercices: [
        {
          enonce: "Ce sont les MÊMES 12 billes, trois fois.\na) Combien y a-t-il de billes en tout ?\nb) Au milieu, on partage en 4 colonnes. Combien de billes dans chaque colonne ?\nc) À droite, on partage en 3 rangées. Combien de billes dans chaque rangée ?",
          figure: billes([
            { rangees: 3, colonnes: 4, legende: "le rectangle" },
            { rangees: 3, colonnes: 4, cadre: "colonnes", legende: "4 colonnes" },
            { rangees: 3, colonnes: 4, cadre: "rangees", legende: "3 rangées" },
          ]),
          correction:
            "a) 3 rangées de 4 billes : $3 \\times 4 = 12$ billes.\nb) Je compte les billes d'un cadre vert : 3. Donc $12 \\div 4 = 3$.\nc) Je compte les billes d'un cadre orange : 4. Donc $12 \\div 3 = 4$.\n⭐ Je n'ai bougé aucune bille. $3 \\times 4 = 12$ donne deux divisions : $12 \\div 4 = 3$ et $12 \\div 3 = 4$.\n⛔ Le piège : enlever au lieu de partager. $12 - 4 = 8$ n'est pas $12 \\div 4$.\nRéponse : a) 12 billes ; b) 3 billes ; c) 4 billes.",
          micros: ["division_sens", "division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "a) On partage 20 cartes entre 5 joueurs. Combien de cartes pour chacun ?\nb) Sofia plante 30 graines en rangées de 6. Combien de rangées ?\nc) Calcule $24 \\div 8$.",
          correction:
            "a) Je partage 20 en 5 parts égales. Je cherche $5 \\times \\ldots = 20$ : $5 \\times 4 = 20$. $20 \\div 5 = 4$ cartes chacun.\nb) Je fais des paquets de 6 dans 30. Je cherche $\\ldots \\times 6 = 30$ : $5 \\times 6 = 30$. $30 \\div 6 = 5$ rangées.\nc) Je cherche $8 \\times \\ldots = 24$ : $8 \\times 3 = 24$. $24 \\div 8 = 3$.\n⛔ Le piège : faire $20 - 5 = 15$. On ne retire pas 5 cartes : on PARTAGE en 5.\nRéponse : a) 4 cartes ; b) 5 rangées ; c) 3.",
          micros: ["division_sens", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "3" },
          ],
        },
        {
          enonce: "Je sais que $7 \\times 8 = 56$ et que $9 \\times 6 = 54$.\na) $56 \\div 7 = \\ldots$\nb) $56 \\div 8 = \\ldots$\nc) $54 \\div 9 = \\ldots$",
          correction:
            "Une multiplication donne deux divisions.\na) $7 \\times 8 = 56$, donc dans 56, il y a 8 fois 7. $56 \\div 7 = 8$.\nb) $7 \\times 8 = 56$, donc dans 56, il y a 7 fois 8. $56 \\div 8 = 7$.\nc) $9 \\times 6 = 54$, donc $54 \\div 9 = 6$.\n⛔ Le piège : soustraire, $56 - 7 = 49$. On cherche combien de FOIS 7 dans 56.\nRéponse : a) 8 ; b) 7 ; c) 6.",
          micros: ["division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "6" },
          ],
        },
        {
          enonce: "Calcule en t'aidant des tables.\na) $35 \\div 5$\nb) $63 \\div 9$\nc) $48 \\div 6$\nd) $72 \\div 8$",
          correction:
            "Pour diviser, je cherche le nombre qui manque dans la table.\na) $5 \\times 7 = 35$, donc $35 \\div 5 = 7$.\nb) $9 \\times 7 = 63$, donc $63 \\div 9 = 7$.\nc) $6 \\times 8 = 48$, donc $48 \\div 6 = 8$.\nd) $8 \\times 9 = 72$, donc $72 \\div 8 = 9$.\n⭐ Je vérifie en multipliant : $8 \\times 9 = 72$, juste.\n⛔ Le piège du c) : confondre $6 \\times 8 = 48$ et $6 \\times 7 = 42$, et répondre 7.\nRéponse : a) 7 ; b) 7 ; c) 8 ; d) 9.",
          micros: ["division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "9" },
          ],
        },
        {
          enonce: "Nour range 14 billes dans des sachets de 4.\nLes sachets pleins sont entourés. Les billes grises n'ont pas de sachet.\na) Combien de sachets pleins ?\nb) Combien de billes restent ?",
          figure: billes([{ rangees: 3, colonnes: 4, cadre: "rangees", reste: 2 }]),
          correction:
            "Je fais des paquets de 4 dans 14.\na) $4 \\times 3 = 12$ et $4 \\times 4 = 16$. 16 dépasse 14. Je peux faire 3 sachets pleins.\nb) $14 - 12 = 2$ billes restent.\n⭐ Je l'écris : $14 = 4 \\times 3 + 2$. Le quotient est 3, le reste est 2.\n⛔ Le piège : faire un 4e sachet avec 2 billes. Il ne serait pas plein.\nRéponse : a) 3 sachets ; b) 2 billes.",
          micros: ["division_reste"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          enonce: "Trouve le quotient et le reste.\na) $17 \\div 5$ : le quotient ?\nb) $17 \\div 5$ : le reste ?\nc) $30 \\div 7$ : le quotient ?\nd) $30 \\div 7$ : le reste ?",
          correction:
            "Je cherche le plus grand nombre de la table qui ne dépasse pas.\na) Table de 5 : $5 \\times 3 = 15$ et $5 \\times 4 = 20$. 20 dépasse 17. Le quotient est 3.\nb) $17 - 15 = 2$. Le reste est 2. Je vérifie : $17 = 5 \\times 3 + 2$.\nc) Table de 7 : $7 \\times 4 = 28$ et $7 \\times 5 = 35$. 35 dépasse 30. Le quotient est 4.\nd) $30 - 28 = 2$. Le reste est 2. Je vérifie : $30 = 7 \\times 4 + 2$.\n⛔ Le piège : donner un reste plus grand que le diviseur. Avec un reste de 7 au d), on pourrait faire un paquet de plus.\nRéponse : a) 3 ; b) 2 ; c) 4 ; d) 2.",
          micros: ["division_reste"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "2" },
          ],
        },
        {
          enonce: "Choisis la bonne réponse.\na) Quelle situation se calcule par $18 \\div 3$ ? A) 18 bonbons partagés entre 3 enfants B) 18 bonbons et 3 de plus C) 3 sacs de 18 bonbons\nb) Dans $23 \\div 4$, quel est le reste ? A) 5 B) 3 C) 1",
          correction:
            "a) Partager 18 bonbons entre 3 enfants, c'est $18 \\div 3 = 6$ bonbons chacun. C'est le choix A. Le B est une addition. Le C est une multiplication, $3 \\times 18$.\nb) Table de 4 : $4 \\times 5 = 20$ et $4 \\times 6 = 24$. 24 dépasse 23. Le quotient est 5. Le reste : $23 - 20 = 3$. C'est le choix B.\n⛔ Le piège du b) : choisir A. 5 est le QUOTIENT, pas le reste.\nRéponse : a) A ; b) B.",
          micros: ["division_sens", "division_reste"],
          reponses: [
            { question: "a)", attendu: ["A", "a) 18 bonbons partagés entre 3 enfants"] },
            { question: "b)", attendu: ["B", "b) 3"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) $40 \\div 5 = 8$\nb) $36 \\div 4 = 8$\nc) $45 \\div 9 = 5$\nd) $50 \\div 10 = 5$",
          correction:
            "Je vérifie chaque division avec une multiplication.\na) $5 \\times 8 = 40$. Vrai.\nb) $4 \\times 8 = 32$, pas 36. Et $4 \\times 9 = 36$ : $36 \\div 4 = 9$. Faux.\nc) $9 \\times 5 = 45$. Vrai.\nd) $10 \\times 5 = 50$. Vrai.\n⛔ Le piège du b) : croire que c'est juste parce que 8 est « proche ». Je vérifie toujours en multipliant.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) vrai.",
          micros: ["division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je pose la division et je vérifie avec une multiplication.",
      rappel: [
        "Pour poser, je partage chiffre par chiffre, en commençant par la GAUCHE.",
        "Ce qui reste d'un chiffre va avec le chiffre suivant : je l'abaisse.",
        "Je vérifie : diviseur × quotient + reste = dividende.",
        "Quand le reste n'est pas 0, il faut parfois une part de plus.",
      ],
      exercices: [
        {
          enonce: "Pose $96 \\div 4$.\na) Dans 9 dizaines, combien de fois 4 ?\nb) Il reste 1 dizaine. J'abaisse le 6. Quel nombre j'obtiens ?\nc) Combien font $96 \\div 4$ ?",
          figure: potence("96", "4", "??"),
          correction:
            "Je commence par la gauche : les dizaines.\na) $4 \\times 2 = 8$ et $4 \\times 3 = 12$. 12 dépasse 9. Dans 9, il y a 2 fois 4. J'écris 2 au quotient.\nb) $9 - 8 = 1$ : il reste 1 dizaine. Avec les 6 unités, cela fait 16.\nc) $16 \\div 4 = 4$. J'écris 4 au quotient. Il reste 0. $96 \\div 4 = 24$.\n⭐ Je vérifie : $4 \\times 24 = 96$.\n⛔ Le piège : oublier la dizaine qui reste, et faire $6 \\div 4$. On trouverait 21, faux.\nRéponse : a) 2 ; b) 16 ; c) 24.",
          schema: potence("96", "4", "24", [
            { t: "8", fin: 0, moins: true },
            { t: "16", fin: 1 },
            { t: "16", fin: 1, moins: true },
            { t: "0", fin: 1 },
          ]),
          micros: ["division_posee"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "24" },
          ],
        },
        {
          enonce: "Pose et calcule.\na) $84 \\div 3$\nb) $156 \\div 4$\nc) $245 \\div 7$",
          correction:
            "a) $8 \\div 3$ : 2 fois, car $3 \\times 2 = 6$. Reste $8 - 6 = 2$. J'abaisse le 4 : 24. $24 \\div 3 = 8$. Donc $84 \\div 3 = 28$.\nb) 1 centaine ne contient pas 4. Je prends 15 dizaines. $15 \\div 4$ : 3 fois, car $4 \\times 3 = 12$. Reste 3. J'abaisse le 6 : 36. $36 \\div 4 = 9$. Donc $156 \\div 4 = 39$.\nc) Je prends 24 dizaines. $24 \\div 7$ : 3 fois, car $7 \\times 3 = 21$. Reste 3. J'abaisse le 5 : 35. $35 \\div 7 = 5$. Donc $245 \\div 7 = 35$.\n⭐ Je vérifie : $3 \\times 28 = 84$, $4 \\times 39 = 156$, $7 \\times 35 = 245$.\n⛔ Le piège du b) : écrire 0 puis s'arrêter. Quand le premier chiffre est trop petit, je prends deux chiffres.\nRéponse : a) 28 ; b) 39 ; c) 35.",
          micros: ["division_posee"],
          reponses: [
            { question: "a)", attendu: "28" },
            { question: "b)", attendu: "39" },
            { question: "c)", attendu: "35" },
          ],
        },
        {
          enonce: "Pose $87 \\div 5$.\na) Quel est le quotient ?\nb) Quel est le reste ?\nc) Vérifie : $5 \\times 17 + 2 = \\ldots$",
          correction:
            "$8 \\div 5$ : 1 fois, car $5 \\times 1 = 5$. Reste $8 - 5 = 3$.\nJ'abaisse le 7 : 37. $37 \\div 5$ : 7 fois, car $5 \\times 7 = 35$. Reste $37 - 35 = 2$.\na) Le quotient est 17.\nb) Le reste est 2. Il est plus petit que 5 : c'est bon.\nc) $5 \\times 17 = 85$. $85 + 2 = 87$ : je retrouve le dividende.\n⛔ Le piège : garder un reste de 7 après $37 \\div 5 = 6$. Un reste de 7 contient encore un 5 : le quotient est 7.\nRéponse : a) 17 ; b) 2 ; c) 87.",
          micros: ["division_posee", "division_reste"],
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "87" },
          ],
        },
        {
          enonce: "26 enfants font du canoë. Un canoë a 3 places.\na) $26 \\div 3$ : quel est le quotient ?\nb) Quel est le reste ?\nc) Combien de canoës faut-il pour que tous les enfants naviguent ?",
          correction:
            "a) Table de 3 : $3 \\times 8 = 24$ et $3 \\times 9 = 27$. 27 dépasse 26. Le quotient est 8.\nb) $26 - 24 = 2$. Le reste est 2.\nc) 8 canoës pleins emmènent 24 enfants. Il reste 2 enfants sur la rive ! Il faut un canoë de plus : $8 + 1 = 9$ canoës.\n⛔ Le piège : répondre 8. Avec 8 canoës, 2 enfants ne naviguent pas.\nRéponse : a) 8 ; b) 2 ; c) 9 canoës.",
          micros: ["division_reste", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "9" },
          ],
        },
        {
          enonce: "Une couturière a un ruban de 50 cm. Elle coupe des morceaux de 8 cm.\na) Combien de morceaux entiers obtient-elle ?\nb) Combien de centimètres de ruban restent ?",
          correction:
            "Je cherche combien de fois 8 dans 50.\na) Table de 8 : $8 \\times 6 = 48$ et $8 \\times 7 = 56$. 56 dépasse 50. Elle obtient 6 morceaux.\nb) $50 - 48 = 2$ cm restent. Trop court pour un morceau de 8 cm.\n⭐ Ici, pas de part de plus : on ne peut pas faire un morceau de 8 cm avec 2 cm.\n⛔ Le piège : multiplier, $50 \\times 8 = 400$. Couper donne des morceaux plus PETITS que le ruban.\nRéponse : a) 6 morceaux ; b) 2 cm.",
          micros: ["division_reste", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          enonce: "Complète avec le nombre qui manque.\na) $\\ldots \\div 6 = 9$\nb) $63 \\div \\ldots = 7$\nc) $80 \\div \\ldots = 10$",
          correction:
            "Je transforme chaque division en multiplication.\na) Le nombre partagé en 6 donne 9. C'est $6 \\times 9 = 54$. Donc $54 \\div 6 = 9$.\nb) Je cherche $\\ldots \\times 7 = 63$ : $9 \\times 7 = 63$. Donc $63 \\div 9 = 7$.\nc) Je cherche $\\ldots \\times 10 = 80$ : $8 \\times 10 = 80$. Donc $80 \\div 8 = 10$.\n⛔ Le piège du a) : diviser, $9 \\div 6$. Ici le nombre cherché est le plus GRAND : je multiplie.\nRéponse : a) 54 ; b) 9 ; c) 8.",
          micros: ["division_lien_multiplication", "division_defi"],
          reponses: [
            { question: "a)", attendu: "54" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "8" },
          ],
        },
        {
          enonce: "Diviser par 10, c'est faire descendre chaque chiffre d'une colonne.\na) $120 \\div 10 = \\ldots$\nb) $3\\,400 \\div 100 = \\ldots$\nc) $5\\,000 \\div 10 = \\ldots$",
          figure: numeration(["UM", "C", "D", "U"], [
            { label: "3 400", chiffres: "3400" },
            { label: "3 400 ÷ 100", chiffres: "??" },
          ]),
          correction:
            "Diviser par 10, c'est l'inverse de multiplier par 10 : chaque chiffre descend d'une colonne.\na) 120 : 1 centaine, 2 dizaines. Ils deviennent 1 dizaine, 2 unités. $120 \\div 10 = 12$.\nb) Divisé par 100, chaque chiffre descend de deux colonnes. 3 unités de mille, 4 centaines deviennent 3 dizaines, 4 unités. $3\\,400 \\div 100 = 34$.\nc) 5 unités de mille descendent d'une colonne : 5 centaines. $5\\,000 \\div 10 = 500$.\n⭐ Je vérifie : $34 \\times 100 = 3\\,400$.\n⛔ Le piège du b) : descendre d'une seule colonne, et écrire 340. Divisé par 100, c'est deux colonnes.\nRéponse : a) 12 ; b) 34 ; c) 500.",
          micros: ["division_lien_multiplication"],
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "34" },
            { question: "c)", attendu: "500" },
          ],
        },
        {
          enonce: "Trois amies achètent ensemble un jeu vidéo à 45 €. Elles paient la même somme.\na) Combien paie chacune ?\nb) Quel calcul vérifie ta réponse ? A) $15 + 3$ B) $45 - 15$ C) $15 \\times 3$",
          correction:
            "a) Je partage 45 € en 3 parts égales : $45 \\div 3$. $3 \\times 15 = 45$. Chacune paie 15 €.\n⭐ En posant : $4 \\div 3$ : 1 fois, reste 1. J'abaisse le 5 : 15. $15 \\div 3 = 5$. Quotient 15.\nb) Pour vérifier une division, je multiplie : 3 amies paient 15 € chacune, $15 \\times 3 = 45$ €. C'est le choix C.\n⛔ Le piège : répondre 42 €, en faisant $45 - 3$. On partage, on ne retire pas.\nRéponse : a) 15 € ; b) C.",
          micros: ["division_sens", "division_lien_multiplication", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: ["C", "c) 15 × 3", "15 × 3"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je me demande : que veut dire le reste ici ?",
      rappel: [
        "Partager ou faire des paquets égaux : je divise.",
        "Le reste peut demander une part de plus (des places, des boîtes), ou être laissé de côté.",
        "Je vérifie : diviseur × quotient + reste = dividende.",
      ],
      exercices: [
        {
          titre: "La randonnée",
          enonce: "Un guide de montagne emmène 38 randonneurs vers le Piton des Neiges. Il fait des groupes de 6 personnes au plus.\na) $38 \\div 6$ : quel est le quotient ?\nb) Quel est le reste ?\nc) Combien de groupes faut-il pour emmener tout le monde ?",
          correction:
            "a) Table de 6 : $6 \\times 6 = 36$ et $6 \\times 7 = 42$. 42 dépasse 38. Le quotient est 6.\nb) $38 - 36 = 2$. Le reste est 2.\nc) 6 groupes pleins emmènent 36 personnes. Il reste 2 randonneurs. Ils forment un groupe de plus : $6 + 1 = 7$ groupes.\n⭐ Je vérifie : $6 \\times 6 + 2 = 38$.\n⛔ Le piège : répondre 6 groupes. Deux randonneurs resteraient en bas !\nRéponse : a) 6 ; b) 2 ; c) 7 groupes.",
          micros: ["division_reste", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "7" },
          ],
        },
        {
          titre: "La bibliothèque",
          enonce: "Un bibliothécaire range 150 livres neufs. Une étagère contient 8 livres.\na) Combien d'étagères pleines remplit-il ?\nb) Combien de livres restent ?\nc) Combien d'étagères lui faut-il pour ranger tous les livres ?",
          correction:
            "Je pose $150 \\div 8$.\n1 centaine ne contient pas 8. Je prends 15 dizaines. $15 \\div 8$ : 1 fois, reste $15 - 8 = 7$.\nJ'abaisse le 0 : 70. $70 \\div 8$ : 8 fois, car $8 \\times 8 = 64$. Reste $70 - 64 = 6$.\na) Le quotient est 18 : 18 étagères pleines.\nb) Le reste est 6 : 6 livres restent.\nc) Les 6 livres ont besoin d'une étagère de plus : $18 + 1 = 19$ étagères.\n⭐ Je vérifie : $8 \\times 18 = 144$, et $144 + 6 = 150$.\n⛔ Le piège : oublier le 0 de 150 et s'arrêter à $15 \\div 8$.\nRéponse : a) 18 étagères ; b) 6 livres ; c) 19 étagères.",
          micros: ["division_posee", "division_reste", "division_probleme"],
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "19" },
          ],
        },
        {
          titre: "Les macarons",
          enonce: "Un pâtissier fait 96 macarons. Il les range par boîtes de 6.\na) Combien de boîtes remplit-il ?\nb) Il vend chaque boîte 5 €. Combien gagne-t-il s'il vend toutes les boîtes ?",
          correction:
            "a) Je pose $96 \\div 6$. $9 \\div 6$ : 1 fois, reste 3. J'abaisse le 6 : 36. $36 \\div 6 = 6$. Quotient 16, reste 0 : 16 boîtes.\n⭐ Je vérifie : $6 \\times 16 = 96$.\nb) 16 boîtes à 5 € : $16 \\times 5 = 80$ €.\n⛔ Le piège du b) : multiplier les macarons, $96 \\times 5 = 480$ €. Le prix de 5 € est celui d'une BOÎTE.\nRéponse : a) 16 boîtes ; b) 80 €.",
          micros: ["division_posee", "division_probleme", "division_defi"],
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "80" },
          ],
        },
        {
          titre: "Les énigmes",
          enonce: "Trouve le nombre mystère.\na) Je suis entre 20 et 30. Divisé par 5, il reste 3. Divisé par 4, il reste 0.\nb) Je suis entre 30 et 40. Divisé par 6, il reste 1. Divisé par 5, il reste 2.",
          correction:
            "a) Divisé par 5, reste 3 : je pars de la table de 5 et j'ajoute 3. $20 + 3 = 23$ et $25 + 3 = 28$.\nDivisé par 4, reste 0 : le nombre est dans la table de 4. 23 n'y est pas. $4 \\times 7 = 28$ : c'est 28.\nb) Divisé par 6, reste 1 : $30 + 1 = 31$ et $36 + 1 = 37$.\nDivisé par 5, reste 2 : $31 = 5 \\times 6 + 1$, reste 1, non. $37 = 5 \\times 7 + 2$, reste 2, oui. C'est 37.\n⛔ Le piège : s'arrêter à la première condition. Il faut vérifier les DEUX.\nRéponse : a) 28 ; b) 37.",
          micros: ["division_reste", "division_defi"],
          reponses: [
            { question: "a)", attendu: "28" },
            { question: "b)", attendu: "37" },
          ],
        },
      ],
    },
  ],
};
