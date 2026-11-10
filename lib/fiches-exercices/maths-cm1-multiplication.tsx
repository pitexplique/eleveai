// ─── Fiche d'exercices : la multiplication (CM1) — 20 exercices corrigés ──────
//
// 10/11/2026 : la feuille de la notion `multiplication` du coach CM1 (6 micros :
// calcul mental, multiplication posée, × 10 / 100 / 1 000, problèmes, décimal
// × entier, défis). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★,
// 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne, étape
// par étape, avec le piège nommé. Alignée sur la carte mentale
// `cm1/multiplication` (`lib/cartes/remplies/cm1.json`).
// ⛔ × 10, × 100 par la VALEUR DES CHIFFRES d'abord (Frédéric, 05/10) : chaque
// chiffre monte d'une colonne, la colonne vide prend un 0. Jamais « on ajoute
// un zéro » comme méthode (1, 2, 8, 11).
// ⭐ Les PROPRIÉTÉS : l'ordre ne change rien (12, regrouper pour faire 10 ou
// 100), couper un nombre en dizaines et unités (3, 5, 13), l'ordre de
// grandeur (9, 15).
// ⭐ Les billes (Frédéric, 07/10) : 4 × 12 = 4 × 10 + 4 × 2 sur un rectangle
// coupé en deux (5).
// ⛔ Aucune question à rédiger : un nombre, vrai ou faux, une lettre, un chiffre.
// ⛔ Les pièges nommés : 4 + 6 au lieu de 4 × 6 (rappel), × 100 d'une seule
// colonne (1, 2, 11), multiplier seulement les dizaines (3), oublier la
// retenue (6, 7), oublier le décalage de la ligne des dizaines (9), oublier
// la virgule (10), additionner au lieu de multiplier (15).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cahiers (10), sport (14, club de basket),
// musique (16, chorale), boulangerie (17), voyage scolaire (18), chantier
// (19), énigmes (20). Les métiers des problèmes : boulangère (17),
// chauffeuse de car (18), carreleur (19).
// Tous les prix et les nombres sont des MODÈLES.
//
// Micro-compétences : multiplication_mental (3, 4, 5, 12, 13), multiplication_
// posee (6, 7, 9, 16), multiplication_puissance_dix (1, 2, 8, 11),
// multiplication_probleme (14, 15, 16, 17, 18, 19), multiplication_decimale_
// posee (10, 17), multiplication_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, numeration, posee } from "@/lib/fiches-exercices/dessins-calcul-cm1";

export const exercicesMultiplicationCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "multiplication",
  titre: "La multiplication",
  accroche:
    "Vingt exercices, du geste seul au problème. Multiplier par 10, 100 ou 1 000 en regardant la valeur des chiffres. Calculer de tête en coupant un nombre. Poser une multiplication avec ses retenues, puis par un nombre à deux chiffres. Multiplier un prix à virgule. Choisir un ordre malin. Des cahiers, un club de basket, une chorale, une boulangerie, un voyage en car, un carrelage et des chiffres cachés. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde la valeur de chaque chiffre.",
      rappel: [
        "Fois 10 : chaque chiffre monte d'une colonne. 4 unités deviennent 4 dizaines.",
        "Fois 100 : chaque chiffre monte de deux colonnes. Fois 1 000 : de trois.",
        "Une colonne vide prend un 0 : $45 \\times 10 = 450$.",
        "Pour poser, je multiplie chaque chiffre, les unités d'abord. Je n'oublie pas la retenue.",
      ],
      exercices: [
        {
          enonce: "Regarde le tableau de numération.\na) $45 \\times 10 = \\ldots$\nb) $45 \\times 100 = \\ldots$\nc) $45 \\times 1\\,000 = \\ldots$",
          figure: numeration(["DM", "UM", "C", "D", "U"], [
            { label: "45", chiffres: "45" },
            { label: "45 × 10", chiffres: "???" },
            { label: "45 × 100", chiffres: "????" },
            { label: "45 × 1 000", chiffres: "?????" },
          ]),
          correction:
            "45, c'est 4 dizaines et 5 unités.\na) Fois 10, chaque chiffre monte d'une colonne. 4 dizaines deviennent 4 centaines. 5 unités deviennent 5 dizaines. La colonne des unités est vide : j'écris 0. $45 \\times 10 = 450$.\nb) Fois 100, chaque chiffre monte de deux colonnes. 4 unités de mille et 5 centaines : $45 \\times 100 = 4\\,500$.\nc) Fois 1 000, de trois colonnes. 4 dizaines de mille et 5 unités de mille : $45 \\times 1\\,000 = 45\\,000$.\n⛔ Le piège : monter d'une seule colonne pour fois 100, et écrire 450. Fois 100, c'est deux colonnes.\nRéponse : a) 450 ; b) $4\\,500$ ; c) $45\\,000$.",
          micros: ["multiplication_puissance_dix"],
          reponses: [
            { question: "a)", attendu: "450" },
            { question: "b)", attendu: "4500" },
            { question: "c)", attendu: "45000" },
          ],
        },
        {
          enonce: "Calcule.\na) $37 \\times 10$\nb) $208 \\times 10$\nc) $16 \\times 100$\nd) $9 \\times 1\\,000$",
          correction:
            "a) 3 dizaines et 7 unités montent d'une colonne : 3 centaines et 7 dizaines. $37 \\times 10 = 370$.\nb) 2 centaines, 0 dizaine, 8 unités montent d'une colonne : 2 unités de mille, 0 centaine, 8 dizaines. $208 \\times 10 = 2\\,080$.\nc) 1 dizaine et 6 unités montent de deux colonnes : 1 unité de mille et 6 centaines. $16 \\times 100 = 1\\,600$.\nd) 9 unités montent de trois colonnes : 9 unités de mille. $9 \\times 1\\,000 = 9\\,000$.\n⛔ Le piège du c) : écrire 160. C'est $16 \\times 10$. Fois 100, chaque chiffre monte de DEUX colonnes.\nRéponse : a) 370 ; b) $2\\,080$ ; c) $1\\,600$ ; d) $9\\,000$.",
          micros: ["multiplication_puissance_dix"],
          reponses: [
            { question: "a)", attendu: "370" },
            { question: "b)", attendu: "2080" },
            { question: "c)", attendu: "1600" },
            { question: "d)", attendu: "9000" },
          ],
        },
        {
          enonce: "Calcule de tête : coupe le grand nombre en dizaines et unités.\na) $4 \\times 23$\nb) $3 \\times 32$\nc) $5 \\times 14$\nd) $6 \\times 21$",
          correction:
            "Je multiplie les dizaines, puis les unités. J'ajoute les deux résultats.\na) $23 = 20 + 3$. $4 \\times 20 = 80$ et $4 \\times 3 = 12$. $80 + 12 = 92$.\nb) $32 = 30 + 2$. $3 \\times 30 = 90$ et $3 \\times 2 = 6$. $90 + 6 = 96$.\nc) $14 = 10 + 4$. $5 \\times 10 = 50$ et $5 \\times 4 = 20$. $50 + 20 = 70$.\nd) $21 = 20 + 1$. $6 \\times 20 = 120$ et $6 \\times 1 = 6$. $120 + 6 = 126$.\n⛔ Le piège : multiplier seulement les dizaines. Pour a), $80 + 3 = 83$ est faux : le 3 aussi est multiplié par 4.\nRéponse : a) 92 ; b) 96 ; c) 70 ; d) 126.",
          micros: ["multiplication_mental"],
          reponses: [
            { question: "a)", attendu: "92" },
            { question: "b)", attendu: "96" },
            { question: "c)", attendu: "70" },
            { question: "d)", attendu: "126" },
          ],
        },
        {
          enonce: "Calcule de tête.\na) $7 \\times 20$\nb) $30 \\times 6$\nc) $12 \\times 5$\nd) $25 \\times 4$",
          correction:
            "a) 20, c'est 2 dizaines. $7 \\times 2 = 14$ : 14 dizaines. $7 \\times 20 = 140$.\nb) 30, c'est 3 dizaines. $3 \\times 6 = 18$ : 18 dizaines. $30 \\times 6 = 180$.\nc) $12 = 10 + 2$. $10 \\times 5 = 50$ et $2 \\times 5 = 10$. $50 + 10 = 60$.\nd) 4 fois 25, c'est comme 4 pièces de 25 centimes : 1 euro, 100 centimes. $25 \\times 4 = 100$.\n⛔ Le piège du a) : écrire $7 \\times 20 = 14$. Je multiplie des DIZAINES : 14 dizaines, c'est 140.\nRéponse : a) 140 ; b) 180 ; c) 60 ; d) 100.",
          micros: ["multiplication_mental"],
          reponses: [
            { question: "a)", attendu: "140" },
            { question: "b)", attendu: "180" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "100" },
          ],
        },
        {
          enonce: "Il y a 4 rangées de 12 billes. Le trait coupe chaque rangée en 10 et 2.\na) Combien de billes bleues ?\nb) Combien de billes orange ?\nc) Combien de billes en tout ?",
          figure: billes([{ rangees: 4, colonnes: 12, coupe: 10 }]),
          correction:
            "Le trait coupe 12 en $10 + 2$.\na) À gauche : 4 rangées de 10 billes bleues. $4 \\times 10 = 40$.\nb) À droite : 4 rangées de 2 billes orange. $4 \\times 2 = 8$.\nc) $40 + 8 = 48$. Donc $4 \\times 12 = 4 \\times 10 + 4 \\times 2 = 48$.\n⭐ C'est le calcul de tête : je coupe 12 en dizaines et unités.\n⛔ Le piège : oublier les billes orange, et répondre 40.\nRéponse : a) 40 ; b) 8 ; c) 48.",
          micros: ["multiplication_mental"],
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "48" },
          ],
        },
        {
          enonce: "Pose et calcule.\na) $213 \\times 3$\nb) $124 \\times 4$\nc) $306 \\times 5$",
          correction:
            "Je multiplie chaque chiffre du haut, en commençant par les unités.\na) $3 \\times 3 = 9$. $3 \\times 1 = 3$. $3 \\times 2 = 6$. Pas de retenue : 639.\nb) $4 \\times 4 = 16$ : je pose 6, je retiens 1. $4 \\times 2 = 8$, plus la retenue 1 : 9. $4 \\times 1 = 4$. Résultat : 496.\nc) $5 \\times 6 = 30$ : je pose 0, je retiens 3. $5 \\times 0 = 0$, plus 3 : 3. $5 \\times 3 = 15$. Résultat : $1\\,530$.\n⛔ Le piège du c) : croire que le 0 efface la retenue. $5 \\times 0 = 0$, mais j'ajoute la retenue 3.\nRéponse : a) 639 ; b) 496 ; c) $1\\,530$.",
          schema: posee(["124", "4", "496"], { signe: "×", traits: [1], retenues: " 1 " }),
          micros: ["multiplication_posee"],
          reponses: [
            { question: "a)", attendu: "639" },
            { question: "b)", attendu: "496" },
            { question: "c)", attendu: "1530" },
          ],
        },
        {
          enonce: "Kenji a posé $326 \\times 3$. Il a trouvé 968.\na) Quel est le bon résultat ? A) 968 B) 9 618 C) 978\nb) Quelle erreur a-t-il faite ? A) Il a oublié la retenue. B) Il s'est trompé dans la table. C) Il a mal aligné les chiffres.",
          correction:
            "Je refais le calcul, chiffre par chiffre.\n$3 \\times 6 = 18$ : je pose 8, je retiens 1.\n$3 \\times 2 = 6$, plus la retenue 1 : 7.\n$3 \\times 3 = 9$.\na) Le bon résultat est 978 : c'est le choix C.\nb) Kenji a écrit 6 au lieu de 7 aux dizaines. Il a oublié d'ajouter la retenue : c'est le choix A.\n⛔ Le piège : écrire 18 en entier, et trouver 9 618 (choix B). Je pose un seul chiffre, je retiens l'autre.\nRéponse : a) C ; b) A.",
          micros: ["multiplication_posee"],
          reponses: [
            { question: "a)", attendu: ["C", "c) 978", "978"] },
            { question: "b)", attendu: ["A", "a) il a oublié la retenue"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) $308 \\times 10 = 3\\,080$\nb) $52 \\times 100 = 520$\nc) $70 \\times 10 = 700$\nd) $6 \\times 1\\,000 = 600$",
          correction:
            "a) Chaque chiffre de 308 monte d'une colonne : 3 unités de mille, 0 centaine, 8 dizaines, 0 unité. $3\\,080$ : vrai.\nb) Fois 100, deux colonnes : 5 unités de mille et 2 centaines. $52 \\times 100 = 5\\,200$, pas 520 : faux.\nc) 7 dizaines deviennent 7 centaines : 700. Vrai.\nd) Fois 1 000, trois colonnes : 6 unités deviennent 6 unités de mille. $6 \\times 1\\,000 = 6\\,000$, pas 600 : faux.\n⛔ Le piège : ne monter que d'une colonne, quel que soit le nombre. Je compte les zéros de 10, 100 ou 1 000 : 1, 2 ou 3 colonnes.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["multiplication_puissance_dix"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je pose au brouillon et je vérifie l'ordre de grandeur.",
      rappel: [
        "Par un nombre à deux chiffres : je multiplie par les unités, puis par les dizaines. J'ajoute.",
        "La ligne des dizaines commence par un 0 : ce sont des dizaines.",
        "Un prix à virgule : je multiplie sans la virgule, puis je remets autant de chiffres après la virgule.",
        "L'ordre ne change rien : je regroupe pour faire 10 ou 100.",
      ],
      exercices: [
        {
          enonce: "Pose $47 \\times 23$ comme sur le dessin.\na) Première ligne : $47 \\times 3 = \\ldots$\nb) Deuxième ligne : $47 \\times 20 = \\ldots$\nc) Le résultat : $47 \\times 23 = \\ldots$",
          figure: posee(["47", "23", "???", "???", "????"], { signe: "×", traits: [1, 3], plus: 3 }),
          correction:
            "23, c'est 2 dizaines et 3 unités. Je fais deux lignes.\na) $47 \\times 3$ : $3 \\times 7 = 21$, je pose 1, je retiens 2. $3 \\times 4 = 12$, plus 2 : 14. Première ligne : 141.\nb) $47 \\times 20$, c'est 47 fois 2 dizaines. $47 \\times 2 = 94$ : 94 dizaines. J'écris d'abord 0 aux unités. Deuxième ligne : 940.\nc) J'ajoute les deux lignes : $141 + 940 = 1\\,081$.\n⭐ Ordre de grandeur : $50 \\times 20 = 1\\,000$. $1\\,081$ est proche : c'est cohérent.\n⛔ Le piège : oublier le 0 de la deuxième ligne, et ajouter $141 + 94 = 235$. Le 2 de 23 vaut 2 DIZAINES.\nRéponse : a) 141 ; b) 940 ; c) $1\\,081$.",
          micros: ["multiplication_posee"],
          reponses: [
            { question: "a)", attendu: "141" },
            { question: "b)", attendu: "940" },
            { question: "c)", attendu: "1081" },
          ],
        },
        {
          enonce: "Un cahier coûte 2,35 €. Chloé en achète 3.\na) Calcule $235 \\times 3$.\nb) Combien paie-t-elle pour les 3 cahiers ?\nc) Une gomme coûte 1,8 €. Combien coûtent 4 gommes ?",
          correction:
            "a) Je pose $235 \\times 3$. $3 \\times 5 = 15$ : je pose 5, je retiens 1. $3 \\times 3 = 9$, plus 1 : 10, je pose 0, je retiens 1. $3 \\times 2 = 6$, plus 1 : 7. Résultat : 705.\nb) 2,35 a 2 chiffres après la virgule. Je remets 2 chiffres après la virgule dans 705 : $7{,}05$ €.\n⭐ Ordre de grandeur : un peu plus de 2 €, trois fois, un peu plus de 6 €. $7{,}05$ € est cohérent.\nc) Sans la virgule : $18 \\times 4 = 72$. 1,8 a 1 chiffre après la virgule : $7{,}2$ €, soit $7{,}20$ €.\n⛔ Le piège : oublier la virgule, et payer 705 € pour trois cahiers !\nRéponse : a) 705 ; b) $7{,}05$ € ; c) $7{,}2$ €.",
          micros: ["multiplication_decimale_posee"],
          reponses: [
            { question: "a)", attendu: "705" },
            { question: "b)", attendu: "7,05" },
            { question: "c)", attendu: "7,2" },
          ],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $36 \\times \\ldots = 3\\,600$\nb) $\\ldots \\times 10 = 540$\nc) $120 \\times \\ldots = 1\\,200$\nd) $7 \\times \\ldots = 7\\,000$",
          correction:
            "Je regarde de combien de colonnes chaque chiffre a monté.\na) 36 : 3 dizaines, 6 unités. $3\\,600$ : 3 unités de mille, 6 centaines. Deux colonnes : fois 100.\nb) 540 : 5 centaines et 4 dizaines. Chaque chiffre a monté d'une colonne. Avant, c'était 5 dizaines et 4 unités : 54.\nc) 120 : 1 centaine, 2 dizaines. $1\\,200$ : 1 unité de mille, 2 centaines. Une colonne : fois 10.\nd) 7 unités deviennent 7 unités de mille : trois colonnes, fois $1\\,000$.\n⛔ Le piège du b) : répondre 5 400. Ici on cherche le nombre de DÉPART, plus petit que 540.\nRéponse : a) 100 ; b) 54 ; c) 10 ; d) $1\\,000$.",
          micros: ["multiplication_puissance_dix"],
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "54" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "1000" },
          ],
        },
        {
          enonce: "Calcule malin : change l'ordre pour faire 10 ou 100.\na) $4 \\times 17 \\times 25$\nb) $2 \\times 38 \\times 5$\nc) $5 \\times 9 \\times 20$",
          correction:
            "Dans une multiplication, je peux changer l'ordre des nombres. Je cherche les paires qui font 10 ou 100.\na) $4 \\times 25 = 100$. Puis $100 \\times 17 = 1\\,700$.\nb) $2 \\times 5 = 10$. Puis $10 \\times 38 = 380$.\nc) $5 \\times 20 = 100$. Puis $100 \\times 9 = 900$.\n⭐ Avec 100, chaque chiffre monte de deux colonnes : c'est rapide.\n⛔ Le piège : calculer dans l'ordre, $4 \\times 17 = 68$, puis $68 \\times 25$. C'est juste, mais long et risqué.\nRéponse : a) $1\\,700$ ; b) 380 ; c) 900.",
          micros: ["multiplication_mental"],
          reponses: [
            { question: "a)", attendu: "1700" },
            { question: "b)", attendu: "380" },
            { question: "c)", attendu: "900" },
          ],
        },
        {
          enonce: "Yanis calcule $6 \\times 18 = 6 \\times 10 + 6 \\times 8$.\na) Combien font $6 \\times 8$ ?\nb) Combien font $6 \\times 18$ ?\nc) Mei calcule $7 \\times 19 = 7 \\times 20 - 7$. Combien font $7 \\times 19$ ?",
          correction:
            "a) Table de 6 : $6 \\times 8 = 48$.\nb) $6 \\times 10 = 60$. $60 + 48 = 108$. Donc $6 \\times 18 = 108$.\nc) 19, c'est 20 moins 1. $7 \\times 20 = 140$ : 14 dizaines. J'enlève une fois 7 : $140 - 7 = 133$.\n⭐ Ces deux astuces coupent un nombre difficile en nombres faciles.\n⛔ Le piège du c) : enlever 1 au lieu de 7, et trouver 139. J'enlève UNE FOIS 7.\nRéponse : a) 48 ; b) 108 ; c) 133.",
          micros: ["multiplication_mental"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: "108" },
            { question: "c)", attendu: "133" },
          ],
        },
        {
          enonce: "Un club de basket achète 14 ballons à 9 € chacun.\na) Combien coûtent les ballons ?\nb) Il achète aussi 14 maillots à 20 € chacun. Combien coûtent les maillots ?\nc) Combien le club paie-t-il en tout ?",
          correction:
            "a) 14 fois 9 € : $14 \\times 9$. Je fais $14 \\times 10 = 140$, moins 14 : $140 - 14 = 126$ €.\nb) 14 fois 20 € : $14 \\times 2 = 28$, donc 28 dizaines. $14 \\times 20 = 280$ €.\nc) $126 + 280 = 406$ €.\n⛔ Le piège : faire $14 + 9 = 23$ €. Le club paie 14 FOIS 9 €.\nRéponse : a) 126 € ; b) 280 € ; c) 406 €.",
          micros: ["multiplication_probleme"],
          reponses: [
            { question: "a)", attendu: "126" },
            { question: "b)", attendu: "280" },
            { question: "c)", attendu: "406" },
          ],
        },
        {
          enonce: "Choisis la bonne réponse.\na) Quelle situation se calcule par $8 \\times 6$ ? A) 8 billes et 6 de plus B) 8 boîtes de 6 crayons C) 8 bonbons pour 6 enfants\nb) Quel nombre est le plus proche de $49 \\times 21$ ? A) 10 000 B) 100 C) 1 000",
          correction:
            "a) 8 boîtes de 6 crayons : 8 fois 6 crayons, $8 \\times 6 = 48$. C'est le choix B. Le A est une addition, $8 + 6$. Le C est un partage.\nb) J'arrondis : 49 est proche de 50, 21 est proche de 20. $50 \\times 20 = 1\\,000$. C'est le choix C.\n⭐ Le calcul exact donne $49 \\times 21 = 1\\,029$ : tout près de $1\\,000$.\n⛔ Le piège : choisir A au a), à cause du mot « et ». « De plus », c'est une addition.\nRéponse : a) B ; b) C.",
          micros: ["multiplication_probleme"],
          reponses: [
            { question: "a)", attendu: ["B", "b) 8 boîtes de 6 crayons"] },
            { question: "b)", attendu: ["C", "c) 1 000", "c) 1000"] },
          ],
        },
        {
          enonce: "Une chorale chante sur 8 rangs de 12 chanteurs.\na) Combien y a-t-il de chanteurs ?\nb) Chaque chanteur reçoit une partition de 4 pages. Combien de pages faut-il imprimer ?",
          correction:
            "a) 8 rangs de 12 : $8 \\times 12$. $8 \\times 10 = 80$ et $8 \\times 2 = 16$. $80 + 16 = 96$ chanteurs.\nb) 96 chanteurs, 4 pages chacun : $96 \\times 4$.\nJe pose : $4 \\times 6 = 24$, je pose 4, je retiens 2. $4 \\times 9 = 36$, plus 2 : 38. Résultat : 384 pages.\n⭐ Ordre de grandeur : $100 \\times 4 = 400$. 384 est proche.\n⛔ Le piège : oublier la retenue, et trouver 364.\nRéponse : a) 96 chanteurs ; b) 384 pages.",
          micros: ["multiplication_posee", "multiplication_probleme"],
          reponses: [
            { question: "a)", attendu: "96" },
            { question: "b)", attendu: "384" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je découpe le problème en petits calculs.",
      rappel: [
        "Plusieurs fois la même quantité : je multiplie.",
        "Deux étapes : je calcule d'abord ce que je peux, puis je m'en sers.",
        "Je vérifie l'ordre de grandeur à la fin.",
      ],
      exercices: [
        {
          titre: "La boulangerie",
          enonce: "Une boulangère fait 125 baguettes par jour. Elle travaille 6 jours par semaine.\na) Combien de baguettes fait-elle en une semaine ?\nb) Combien en 4 semaines ?\nc) Un croissant coûte 1,15 €. Combien coûtent 4 croissants ?",
          correction:
            "a) $125 \\times 6$. Je pose : $6 \\times 5 = 30$, je pose 0, je retiens 3. $6 \\times 2 = 12$, plus 3 : 15, je pose 5, je retiens 1. $6 \\times 1 = 6$, plus 1 : 7. Résultat : 750 baguettes.\nb) $750 \\times 4$ : $75 \\times 4 = 300$, donc 300 dizaines. $750 \\times 4 = 3\\,000$ baguettes.\nc) Sans la virgule : $115 \\times 4 = 460$. 1,15 a 2 chiffres après la virgule : $4{,}60$ €.\n⛔ Le piège du b) : multiplier 125 par 4 et oublier les 6 jours. Je pars du résultat du a).\nRéponse : a) 750 baguettes ; b) $3\\,000$ baguettes ; c) $4{,}60$ €.",
          micros: ["multiplication_posee", "multiplication_decimale_posee", "multiplication_probleme", "multiplication_defi"],
          reponses: [
            { question: "a)", attendu: "750" },
            { question: "b)", attendu: "3000" },
            { question: "c)", attendu: "4,60" },
          ],
        },
        {
          titre: "Le voyage en car",
          enonce: "Pour une sortie, une chauffeuse conduit un car de 52 places. L'école loue 3 cars.\na) Combien de places y a-t-il en tout ?\nb) 148 élèves et 12 adultes partent. Tout le monde a-t-il une place ? Réponds oui ou non.\nc) Combien de places manque-t-il ?",
          correction:
            "a) 3 cars de 52 places : $3 \\times 52$. $3 \\times 50 = 150$ et $3 \\times 2 = 6$. $150 + 6 = 156$ places.\nb) Il y a $148 + 12 = 160$ personnes. 160 est plus grand que 156 : non.\nc) $160 - 156 = 4$ places manquent.\n⛔ Le piège : oublier les 12 adultes. Pour les élèves seuls, $148 < 156$ : on croirait que ça suffit.\nRéponse : a) 156 places ; b) non ; c) 4 places.",
          micros: ["multiplication_probleme", "multiplication_defi"],
          reponses: [
            { question: "a)", attendu: "156" },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: "4" },
          ],
        },
        {
          titre: "Le carrelage",
          enonce: "Un carreleur pose 24 rangées de 15 carreaux dans une cuisine.\na) Combien de carreaux pose-t-il ?\nb) Un carreau coûte 3 €. Combien coûtent tous les carreaux ?",
          correction:
            "a) $24 \\times 15$. Je coupe 15 en $10 + 5$. $24 \\times 10 = 240$ et $24 \\times 5 = 120$. $240 + 120 = 360$ carreaux.\n⭐ Vérification : $24 \\times 5$, c'est la moitié de $24 \\times 10$ : la moitié de 240 fait 120.\nb) $360 \\times 3$ : $36 \\times 3 = 108$, donc 108 dizaines. $360 \\times 3 = 1\\,080$ €.\n⛔ Le piège : ajouter les rangées et les carreaux, $24 + 15 = 39$. Il y a 24 FOIS 15 carreaux.\nRéponse : a) 360 carreaux ; b) $1\\,080$ €.",
          micros: ["multiplication_mental", "multiplication_probleme", "multiplication_defi"],
          reponses: [
            { question: "a)", attendu: "360" },
            { question: "b)", attendu: "1080" },
          ],
        },
        {
          titre: "Les chiffres cachés",
          enonce: "Un carré ■ cache un chiffre. Trouve-le.\na) $2■3 \\times 4 = 972$\nb) $■8 \\times 5 = 340$\nc) $1■ \\times 7 = 91$",
          figure: posee(["2■3", "4", "972"], { signe: "×", traits: [1] }),
          correction:
            "a) $4 \\times 3 = 12$ : je pose 2, je retiens 1. Le 7 des dizaines vient de $4 \\times ■ + 1$. $4 \\times ■$ finit par 6 : 16 ou 36. Je teste ■ = 4 : $243 \\times 4 = 972$. Juste. (■ = 9 donne $293 \\times 4 = 1\\,172$ : trop grand.)\nb) $5 \\times 8 = 40$ : je pose 0, je retiens 4. Il reste 34 dizaines. $5 \\times ■ + 4 = 34$, donc $5 \\times ■ = 30$ : ■ = 6. Je vérifie : $68 \\times 5 = 340$.\nc) $7 \\times 10 = 70$. Il manque $91 - 70 = 21$. $7 \\times 3 = 21$ : ■ = 3. Je vérifie : $13 \\times 7 = 91$.\n⛔ Le piège du a) : oublier la retenue 1, et chercher $4 \\times ■ = 7$. Aucune table ne donne 7.\nRéponse : a) 4 ; b) 6 ; c) 3.",
          micros: ["multiplication_posee", "multiplication_defi"],
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "3" },
          ],
        },
      ],
    },
  ],
};
