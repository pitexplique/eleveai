// ─── Fiche d'exercices : trier et classer (CM1) — 20 exercices corrigés ───────
//
// 10/11/2026 : la feuille de la notion `trier_classer` du coach CM1 (3 micros),
// sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// ⚠️ Notion hors programme français (Belgique, P3 à P6, ligne 4.1), masquée en
// France dans le coach (`lib/tutor-v4/micros-masquees.ts`). Alignée sur la
// banque `questionBank/cm1/maths/trier-classer.bank.ts` et sur la carte
// mentale `cm1/trier_classer` (`lib/cartes/remplies/cm1.json`) : trier selon
// des critères successifs, deux ou trois ensembles qui se croisent (compter
// une zone, un ensemble en tout), arbre de tri (suivre, compléter).
// ⛔ Aucune question à rédiger : QCM, oui ou non, une liste, un nombre, une
// case de l'arbre.
//
// Les pièges nommés : garder au 2e tri un nombre parti au 1er (1, 9), compter
// une seule zone pour tout l'ensemble (4, 10, 18), lire le « non » à gauche
// (5, 8), oublier une condition (6, 15, 20), croire que l'ordre des tris
// change le résultat (7), le dehors oublié (3, 10), une question qui ne sépare
// rien (12), additionner deux ensembles qui se croisent (14, 17), une branche
// oubliée dans l'arbre (16), un objet qui ne répond à aucune question (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : nombres (1, 3, 5, 6, 7, 9, 11, 15, 20),
// animaux (2, 8, 10), sport (4, 14), géométrie (12), brocante (13), école
// (16), bibliothèque (17), refuge pour chiens (18), recyclage (19), magie (20).
// Les métiers des problèmes : bibliothécaire (17), éducatrice canine (18),
// agent de tri (19), magicien (20). Pas de contexte réunionnais sur cette
// feuille. Aucun fait réel : tous les nombres sont des MODÈLES (les bacs de
// tri de l'exercice 19 changent selon les villes).
//
// Micro-compétences : tri_criteres_successifs (1, 2, 6, 7, 9, 13, 15, 17, 20),
// tri_ensembles_intersection (3, 4, 10, 11, 14, 18), tri_arbre (5, 8, 12, 16,
// 17, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { venn } from "@/lib/fiches-exercices/figures";
import { arbreTri, ecranSeulement, table, venn3 } from "@/lib/fiches-exercices/dessins-cm1-nombres";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

export const exercicesTrierClasserCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "trier-classer",
  titre: "Trier et classer",
  accroche:
    "Vingt exercices, du geste seul au problème. Trier des nombres ou des objets selon un critère, puis un deuxième. Lire deux ou trois ensembles qui se croisent, et compter chaque zone. Suivre un arbre de tri, et trouver la question qui manque. Des animaux, des sports, une brocante, une bibliothèque, un refuge pour chiens, un centre de recyclage et un tour de magie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Pour écrire une liste, je sépare les éléments par « ; ».",
      rappel: [
        "Trier, c'est garder ce qui répond « oui » à une question, et mettre le reste de côté.",
        "Deux tris de suite : le 2e tri se fait seulement sur ce qui reste après le 1er.",
        "Dans des ensembles qui se croisent, la zone du milieu appartient aux deux ensembles.",
        "Dans un arbre de tri, je suis « oui » à gauche et « non » à droite.",
      ],
      exercices: [
        {
          enonce: "Voici une liste : $3$ ; $8$ ; $12$ ; $15$ ; $20$.\na) Garde seulement les nombres pairs.\nb) Parmi eux, garde ceux qui sont plus grands que $10$.\nc) Combien de nombres restent à la fin ?",
          reponses: [
            { question: "a)", attendu: "8 ; 12 ; 20" },
            { question: "b)", attendu: "12 ; 20" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) Un nombre pair finit par $0$, $2$, $4$, $6$ ou $8$. Je garde $8$, $12$ et $20$. Je mets $3$ et $15$ de côté.\nb) Je trie seulement $8$ ; $12$ ; $20$. $8$ n'est pas plus grand que $10$. Je garde $12$ et $20$.\nc) Il reste $2$ nombres.\n⛔ Le piège : garder $15$ au b) parce qu'il est plus grand que $10$. Il est parti au 1er tri : il est impair.\nRéponse : a) $8$ ; $12$ ; $20$ ; b) $12$ ; $20$ ; c) $2$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Voici des animaux : chat, poule, araignée, chien, canard, fourmi.\na) Écris ceux qui ont $4$ pattes.\nb) Écris ceux qui ont $2$ pattes.\nc) Combien ont plus de $4$ pattes ?",
          reponses: [
            { question: "a)", attendu: "chat ; chien" },
            { question: "b)", attendu: "poule ; canard" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "Je regarde chaque animal, un par un.\nLe chat et le chien ont $4$ pattes. La poule et le canard ont $2$ pattes.\nL'araignée a $8$ pattes. La fourmi a $6$ pattes, comme tous les insectes.\na) chat ; chien.\nb) poule ; canard.\nc) L'araignée et la fourmi ont plus de $4$ pattes : cela fait $2$ animaux.\n⛔ Le piège : oublier un animal. Je barre chaque animal quand je l'ai rangé.\nRéponse : a) chat ; chien ; b) poule ; canard ; c) $2$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Les nombres sont rangés dans deux ensembles.\nA : les nombres pairs. B : les nombres plus grands que $10$.\na) Quels nombres sont dans A et dans B à la fois ?\nb) Quels nombres sont pairs, mais pas plus grands que $10$ ?\nc) Combien de nombres sont en dehors des deux ensembles ?",
          figure: venn({ aSeul: ["4"], commun: ["12", "18", "20"], bSeul: ["15"], dehors: ["3", "7", "9"] }, { a: "A", b: "B" }),
          reponses: [
            { question: "a)", attendu: "12 ; 18 ; 20" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) A et B à la fois, c'est la zone du milieu, où les cercles se croisent. J'y lis $12$, $18$ et $20$.\nb) Pairs mais pas plus grands que $10$ : la partie de A seule. J'y lis $4$.\nc) En dehors des cercles, je lis $3$, $7$ et $9$. Cela fait $3$ nombres.\n⭐ Je vérifie : ils sont impairs et plus petits que $10$.\n⛔ Le piège du a) : écrire tous les nombres de A. Je prends seulement la zone commune.\nRéponse : a) $12$ ; $18$ ; $20$ ; b) $4$ ; c) $3$.",
          micros: ["tri_ensembles_intersection"],
        },
        {
          enonce: "Les enfants d'un club font du foot, de la danse ou du judo. Le dessin donne le nombre d'enfants dans chaque zone.\na) Combien d'enfants font seulement de la danse ?\nb) Combien d'enfants font les trois sports ?\nc) Combien d'enfants font du foot en tout ?\nd) Combien d'enfants font de la danse en tout ?",
          figure: venn3(["Foot", "Danse", "Judo"], { a: "6", b: "4", c: "3", ab: "2", ac: "1", bc: "2", abc: "1" }),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "9" },
          ],
          correction:
            "a) « Seulement la danse » : la partie du cercle Danse qui ne touche aucun autre cercle. J'y lis $4$.\nb) Les trois sports : la zone au centre, où les trois cercles se croisent. J'y lis $1$.\nc) Le cercle Foot a quatre zones : $6$ (foot seul), $2$ (avec danse), $1$ (avec judo), $1$ (les trois).\n$6 + 2 + 1 + 1 = 10$ enfants.\nd) Le cercle Danse : $4 + 2 + 2 + 1 = 9$ enfants.\n⛔ Le piège du c) : répondre $6$. $6$, ce sont les enfants qui font SEULEMENT du foot.\nRéponse : a) $4$ ; b) $1$ ; c) $10$ ; d) $9$.",
          micros: ["tri_ensembles_intersection"],
        },
        {
          enonce: "Suis l'arbre de tri. Dans quelle case arrive chaque nombre ?\na) $14$\nb) $7$\nc) $6$\nd) $13$",
          figure: arbreTri({ q: "Pair ?", oui: { q: "Plus de 10 ?", oui: "A", non: "B" }, non: { q: "Plus de 10 ?", oui: "C", non: "D" } }),
          reponses: [
            { question: "a)", attendu: ["A", "case A"] },
            { question: "b)", attendu: ["D", "case D"] },
            { question: "c)", attendu: ["B", "case B"] },
            { question: "d)", attendu: ["C", "case C"] },
          ],
          correction:
            "À chaque question, je vais à gauche pour « oui », à droite pour « non ».\na) $14$ est pair : oui, à gauche. Plus de $10$ : oui, à gauche. Case A.\nb) $7$ est pair : non, à droite. Plus de $10$ : non, à droite. Case D.\nc) $6$ est pair : oui. Plus de $10$ : non. Case B.\nd) $13$ est pair : non. Plus de $10$ : oui. Case C.\n⛔ Le piège : partir à gauche pour $7$. Il n'est pas pair : il part à droite dès la 1re question.\nRéponse : a) A ; b) D ; c) B ; d) C.",
          micros: ["tri_arbre"],
        },
        {
          enonce: "Voici une liste : $5$ ; $14$ ; $23$ ; $30$ ; $41$ ; $50$ ; $62$.\na) Enlève les nombres qui finissent par $0$. Écris ceux qui restent.\nb) Parmi eux, garde ceux qui sont plus petits que $40$.\nc) Combien de nombres restent à la fin ?",
          reponses: [
            { question: "a)", attendu: "5 ; 14 ; 23 ; 41 ; 62" },
            { question: "b)", attendu: "5 ; 14 ; 23" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) $30$ et $50$ finissent par $0$ : je les enlève. Il reste $5$ ; $14$ ; $23$ ; $41$ ; $62$.\nb) Je garde ceux plus petits que $40$ : $5$, $14$ et $23$. $41$ et $62$ sont trop grands.\nc) Il reste $3$ nombres.\n⛔ Le piège du b) : garder $30$, qui est plus petit que $40$. Il a été enlevé au a).\nRéponse : a) $5$ ; $14$ ; $23$ ; $41$ ; $62$ ; b) $5$ ; $14$ ; $23$ ; c) $3$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Voici une liste : $6$ ; $11$ ; $16$ ; $21$ ; $26$.\na) Garde les nombres pairs, puis ceux qui sont plus grands que $15$. Écris ce qui reste.\nb) On refait le tri dans l'autre ordre : d'abord plus grands que $15$, puis pairs. Obtient-on les mêmes nombres ? Réponds par oui ou non.\nc) Combien de nombres restent ?",
          reponses: [
            { question: "a)", attendu: "16 ; 26" },
            { question: "b)", attendu: OUI },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) Pairs : $6$, $16$, $26$. Puis plus grands que $15$ : $16$ et $26$.\nb) Plus grands que $15$ : $16$, $21$, $26$. Puis pairs : $16$ et $26$. Ce sont les mêmes : oui.\nc) Il reste $2$ nombres.\n⭐ À la fin, je garde les nombres qui répondent « oui » aux DEUX questions. L'ordre ne change rien.\n⛔ Le piège : croire qu'on trouve autre chose en changeant l'ordre. Je refais le tri pour vérifier.\nRéponse : a) $16$ ; $26$ ; b) oui ; c) $2$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Suis l'arbre de tri. Dans quelle case arrive chaque animal ?\na) le pigeon\nb) le papillon\nc) le poisson\nd) le lapin",
          figure: arbreTri({ q: "Il vole ?", oui: { q: "Des plumes ?", oui: "A", non: "B" }, non: { q: "Vit dans l'eau ?", oui: "C", non: "D" } }),
          reponses: [
            { question: "a)", attendu: ["A", "case A"] },
            { question: "b)", attendu: ["B", "case B"] },
            { question: "c)", attendu: ["C", "case C"] },
            { question: "d)", attendu: ["D", "case D"] },
          ],
          correction:
            "Je réponds aux questions, de haut en bas.\na) Le pigeon vole : oui. Il a des plumes : oui. Case A.\nb) Le papillon vole : oui. Il a des plumes : non, il a des ailes sans plumes. Case B.\nc) Le poisson vole : non. Il vit dans l'eau : oui. Case C.\nd) Le lapin vole : non. Il vit dans l'eau : non. Case D.\n⛔ Le piège : lire « non » à gauche. Sur cet arbre, « oui » est toujours à gauche.\nRéponse : a) A ; b) B ; c) C ; d) D.",
          micros: ["tri_arbre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je trie au brouillon et je barre chaque élément rangé.",
      rappel: [
        "Pour compter un ensemble EN TOUT, j'additionne toutes ses zones, le milieu compris.",
        "« Seulement » veut dire : dans une seule zone, sans les autres ensembles.",
        "Une bonne question de tri sépare les objets en deux groupes : les « oui » et les « non ».",
      ],
      exercices: [
        {
          enonce: "Liste de départ : $7$ ; $12$ ; $18$ ; $22$ ; $25$ ; $30$.\nOn garde d'abord les nombres pairs. Puis on garde ceux qui sont plus petits que $20$.\na) Quels nombres restent après le 1er tri ?\nb) Quels nombres sont enlevés au 2e tri ?\nc) Quand le nombre $25$ est-il enlevé ?\nA) au 1er tri   B) au 2e tri   C) il n'est jamais enlevé",
          reponses: [
            { question: "a)", attendu: "12 ; 18 ; 22 ; 30" },
            { question: "b)", attendu: "22 ; 30" },
            { question: "c)", attendu: ["A", "a) au 1er tri"] },
          ],
          correction:
            "a) Je garde les nombres pairs : $12$, $18$, $22$ et $30$. J'enlève $7$ et $25$.\nb) Je trie $12$ ; $18$ ; $22$ ; $30$. Je garde ceux plus petits que $20$ : $12$ et $18$.\nJ'enlève donc $22$ et $30$.\nc) $25$ est impair : il part dès le 1er tri. Réponse A.\n⛔ Le piège du c) : répondre B parce que $25$ est plus grand que $20$. Il n'est même pas arrivé au 2e tri.\nRéponse : a) $12$ ; $18$ ; $22$ ; $30$ ; b) $22$ ; $30$ ; c) A.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Une classe de $25$ élèves dit quels animaux elle a à la maison : chat, chien ou poisson.\na) Combien d'élèves ont un chat ?\nb) Combien d'élèves ont un chien ?\nc) Combien d'élèves ont au moins un animal ?\nd) Combien d'élèves n'ont aucun de ces animaux ?",
          figure: venn3(["Chat", "Chien", "Poisson"], { a: "5", b: "7", c: "2", ab: "3", ac: "1", bc: "2", abc: "1" }),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: "21" },
            { question: "d)", attendu: "4" },
          ],
          correction:
            "a) Le cercle Chat : $5 + 3 + 1 + 1 = 10$ élèves.\nb) Le cercle Chien : $7 + 3 + 2 + 1 = 13$ élèves.\nc) J'additionne les sept zones, une seule fois chacune : $5 + 7 + 2 + 3 + 1 + 2 + 1 = 21$ élèves.\nd) La classe a $25$ élèves. $25 - 21 = 4$ élèves n'ont aucun de ces animaux.\n⛔ Le piège du c) : faire $10 + 13 + 6$. Les élèves du milieu seraient comptés plusieurs fois.\nRéponse : a) $10$ ; b) $13$ ; c) $21$ ; d) $4$.",
          micros: ["tri_ensembles_intersection"],
        },
        {
          enonce: "A : les multiples de $5$. B : les nombres pairs. Le dessin montre quatre zones.\nDans quelle zone va chaque nombre ? Écris le numéro de la zone.\na) $20$\nb) $15$\nc) $8$\nd) $9$",
          figure: venn({ aSeul: ["zone 1"], commun: ["zone 2"], bSeul: ["zone 3"], dehors: ["zone 4"] }, { a: "A", b: "B" }),
          reponses: [
            { question: "a)", attendu: ["2", "zone 2"] },
            { question: "b)", attendu: ["1", "zone 1"] },
            { question: "c)", attendu: ["3", "zone 3"] },
            { question: "d)", attendu: ["4", "zone 4"] },
          ],
          correction:
            "Pour chaque nombre, je pose les deux questions : multiple de $5$ ? pair ?\na) $20$ finit par $0$ : multiple de $5$, et pair. Il va dans les deux : zone $2$.\nb) $15$ finit par $5$ : multiple de $5$, mais impair. Zone $1$.\nc) $8$ est pair, mais pas multiple de $5$. Zone $3$.\nd) $9$ n'est ni pair, ni multiple de $5$. En dehors : zone $4$.\n⛔ Le piège du a) : mettre $20$ dans A seulement. Il répond « oui » aux deux questions.\nRéponse : a) zone $2$ ; b) zone $1$ ; c) zone $3$ ; d) zone $4$.",
          micros: ["tri_ensembles_intersection"],
        },
        {
          enonce: "Cet arbre trie un carré, un rectangle et un triangle. Il manque une question.\na) Quelle question faut-il écrire à la place du « ? » ?\nA) A-t-il 3 côtés ?   B) A-t-il 4 angles droits ?   C) A-t-il 4 côtés égaux ?\nb) Avec cette question, dans quelle case va un losange ? Il a $4$ côtés égaux, mais pas d'angle droit.\nc) Dans quelle case va un autre triangle ?",
          figure: arbreTri({ q: "4 côtés ?", oui: { q: "?", oui: "1 carré", non: "2 rectangle" }, non: "3 triangle" }),
          reponses: [
            { question: "a)", attendu: ["C", "c) A-t-il 4 côtés égaux ?"] },
            { question: "b)", attendu: ["1", "case 1"] },
            { question: "c)", attendu: ["3", "case 3"] },
          ],
          correction:
            "a) La question doit séparer le carré (oui) du rectangle (non).\nA ne marche pas : les deux ont $4$ côtés. B ne marche pas : les deux ont $4$ angles droits.\nC marche : le carré a $4$ côtés égaux, le rectangle non. Réponse C.\nb) Le losange a $4$ côtés : oui. $4$ côtés égaux : oui. Il va dans la case $1$, avec le carré.\nc) Un triangle n'a pas $4$ côtés : non, dès la 1re question. Case $3$.\n⛔ Le piège du a) : choisir B. Une question où tout le monde répond « oui » ne trie rien.\nRéponse : a) C ; b) case $1$ ; c) case $3$.",
          micros: ["tri_arbre"],
        },
        {
          enonce: "À la brocante, Margot regarde ces objets.\na) Écris les objets bleus.\nb) Parmi eux, écris ceux qui coûtent moins de $10$ €.\nc) Combien coûtent ces objets du b), ensemble ?\nd) Combien d'objets rouges coûtent plus de $10$ € ?",
          figure: table(["Objet", "Prix", "Couleur"], [
            ["livre", "3 €", "bleu"],
            ["vélo", "45 €", "rouge"],
            ["lampe", "12 €", "bleu"],
            ["ballon", "5 €", "rouge"],
            ["jeu", "8 €", "vert"],
            ["tasse", "2 €", "bleu"],
          ]),
          reponses: [
            { question: "a)", attendu: "livre ; lampe ; tasse" },
            { question: "b)", attendu: "livre ; tasse" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "1" },
          ],
          correction:
            "a) Je lis la colonne « Couleur ». Les objets bleus : livre, lampe, tasse.\nb) Je regarde le prix de ces trois objets seulement. Livre : $3$ €. Lampe : $12$ €, trop cher. Tasse : $2$ €.\nJe garde livre et tasse.\nc) $3 + 2 = 5$ €.\nd) Les objets rouges : vélo ($45$ €) et ballon ($5$ €). Seul le vélo coûte plus de $10$ € : $1$ objet.\n⛔ Le piège du b) : ajouter le ballon, qui coûte $5$ €. Il est rouge : il est parti au 1er tri.\nRéponse : a) livre ; lampe ; tasse ; b) livre ; tasse ; c) $5$ € ; d) $1$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Dans un club, $12$ enfants font du tennis et $9$ font du vélo. $4$ enfants font les deux. Chaque enfant fait au moins un des deux sports.\na) Combien d'enfants font seulement du tennis ?\nb) Combien d'enfants font seulement du vélo ?\nc) Combien d'enfants y a-t-il dans le club ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "17" },
          ],
          correction:
            "Je dessine deux cercles qui se croisent. Au milieu, je mets les $4$ enfants qui font les deux.\na) Tennis : $12$ en tout, dont $4$ au milieu. Seulement tennis : $12 - 4 = 8$.\nb) Vélo : $9$ en tout, dont $4$ au milieu. Seulement vélo : $9 - 4 = 5$.\nc) J'additionne les trois zones : $8 + 4 + 5 = 17$ enfants.\n⛔ Le piège du c) : faire $12 + 9 = 21$. Les $4$ enfants du milieu seraient comptés deux fois.\nRéponse : a) $8$ ; b) $5$ ; c) $17$.",
          schema: ecranSeulement(venn({ aSeul: ["8"], commun: ["4"], bSeul: ["5"] }, { a: "Tennis", b: "Vélo" })),
          micros: ["tri_ensembles_intersection"],
        },
        {
          enonce: "Je cherche les nombres de $1$ à $30$ qui sont pairs, multiples de $3$ et plus grands que $15$.\na) Écris ces nombres.\nb) Combien y en a-t-il ?\nc) Sans la condition « plus grand que $15$ », combien de nombres en plus trouverait-on ?",
          reponses: [
            { question: "a)", attendu: "18 ; 24 ; 30" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "Je fais les tris un par un.\n1er tri, multiples de $3$ : $3$ ; $6$ ; $9$ ; $12$ ; $15$ ; $18$ ; $21$ ; $24$ ; $27$ ; $30$.\n2e tri, pairs : $6$ ; $12$ ; $18$ ; $24$ ; $30$.\n3e tri, plus grands que $15$ : $18$ ; $24$ ; $30$.\na) $18$ ; $24$ ; $30$.\nb) Il y en a $3$.\nc) Sans le 3e tri, on garderait aussi $6$ et $12$ : $2$ nombres en plus.\n⛔ Le piège : oublier une condition, par exemple garder $21$, qui est impair.\nRéponse : a) $18$ ; $24$ ; $30$ ; b) $3$ ; c) $2$.",
          micros: ["tri_criteres_successifs"],
        },
        {
          enonce: "Un arbre trie les enfants d'un groupe. Le nombre d'enfants est écrit dans chaque case.\na) Combien d'enfants portent des lunettes ?\nb) Combien d'enfants ont plus de $9$ ans ?\nc) Combien d'enfants y a-t-il dans le groupe ?\nd) Combien d'enfants n'ont pas de lunettes et n'ont pas plus de $9$ ans ?",
          figure: arbreTri({ q: "Lunettes ?", oui: { q: "Plus de 9 ans ?", oui: "3", non: "2" }, non: { q: "Plus de 9 ans ?", oui: "5", non: "6" } }),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "16" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "a) Lunettes : la branche « oui » de gauche. Elle a deux cases : $3 + 2 = 5$ enfants.\nb) Plus de $9$ ans : les cases « oui » de la 2e question, des deux côtés. $3 + 5 = 8$ enfants.\nc) J'additionne les quatre cases : $3 + 2 + 5 + 6 = 16$ enfants.\nd) Pas de lunettes : à droite. Pas plus de $9$ ans : encore à droite. La case vaut $6$.\n⛔ Le piège du b) : oublier une branche et répondre $3$ ou $5$. La question est posée des deux côtés.\nRéponse : a) $5$ ; b) $8$ ; c) $16$ ; d) $6$.",
          micros: ["tri_arbre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je fais un dessin au brouillon : des cercles ou un arbre.",
      rappel: [
        "Quand deux groupes se croisent, je place d'abord le milieu, puis je calcule les zones seules.",
        "Pour compter tout le monde, chaque zone est comptée une seule fois.",
        "Un arbre de tri peut poser plusieurs questions à la suite : je m'arrête dès que j'arrive dans une case.",
      ],
      exercices: [
        {
          titre: "Les livres de la bibliothécaire",
          enonce: "Olga est bibliothécaire. Elle trie $60$ livres.\n$25$ livres sont des bandes dessinées (BD). Parmi les BD, $10$ sont en anglais.\nParmi les autres livres, $12$ sont en anglais.\na) Combien de livres ne sont pas des BD ?\nb) Combien de livres sont en anglais en tout ?\nc) Combien de BD ne sont pas en anglais ?\nd) Combien de livres ne sont ni des BD, ni en anglais ?",
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "22" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: "23" },
          ],
          correction:
            "Je fais un arbre : 1re question « BD ? », 2e question « En anglais ? ».\na) $60 - 25 = 35$ livres ne sont pas des BD.\nb) En anglais : $10$ BD et $12$ autres livres. $10 + 12 = 22$ livres.\nc) Les BD : $25$, dont $10$ en anglais. $25 - 10 = 15$ BD ne sont pas en anglais.\nd) Les autres livres : $35$, dont $12$ en anglais. $35 - 12 = 23$ livres.\n⭐ Je vérifie : $10 + 15 + 12 + 23 = 60$.\n⛔ Le piège du b) : répondre $10$ ou $12$. Je prends les livres en anglais des DEUX branches.\nRéponse : a) $35$ ; b) $22$ ; c) $15$ ; d) $23$.",
          schema: ecranSeulement(arbreTri({ q: "BD ?", oui: { q: "En anglais ?", oui: "10", non: "15" }, non: { q: "En anglais ?", oui: "12", non: "23" } })),
          micros: ["tri_criteres_successifs", "tri_arbre"],
        },
        {
          titre: "Les chiens du refuge",
          enonce: "Elsa est éducatrice canine dans un refuge. Elle note les tours que savent faire les chiens : s'asseoir, donner la patte, rapporter la balle. Chaque chien sait faire au moins un tour.\na) Combien de chiens savent s'asseoir ?\nb) Combien de chiens savent faire les trois tours ?\nc) Combien de chiens savent faire exactement deux tours ?\nd) Combien de chiens y a-t-il au refuge ?",
          figure: venn3(["Assis", "Patte", "Balle"], { a: "4", b: "3", c: "5", ab: "2", ac: "3", bc: "1", abc: "2" }),
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "20" },
          ],
          correction:
            "a) Le cercle « Assis » a quatre zones : $4 + 2 + 3 + 2 = 11$ chiens.\nb) Les trois tours : la zone du centre. $2$ chiens.\nc) Exactement deux tours : les trois zones où deux cercles seulement se croisent. $2 + 3 + 1 = 6$ chiens.\nd) J'additionne les sept zones : $4 + 3 + 5 + 2 + 3 + 1 + 2 = 20$ chiens.\n⛔ Le piège du c) : ajouter aussi le centre. Au centre, les chiens savent faire TROIS tours, pas deux.\nRéponse : a) $11$ ; b) $2$ ; c) $6$ ; d) $20$.",
          micros: ["tri_ensembles_intersection"],
        },
        {
          titre: "Le centre de tri",
          enonce: "Hugo est agent de tri dans un centre de recyclage. Il suit cet arbre pour choisir le bac.\na) Dans quel bac va une bouteille en verre ?\nb) Dans quel bac va un journal ?\nc) Dans quel bac va une canette en métal ?\nd) Dans quel bac va un vieux crayon cassé ? Il n'est ni en verre, ni en papier, ni un emballage.",
          figure: arbreTri({ q: "Du verre ?", oui: "bac vert", non: { q: "Papier, carton ?", oui: "bac bleu", non: { q: "Plastique, métal ?", oui: "bac jaune", non: "bac gris" } } }),
          reponses: [
            { question: "a)", attendu: ["vert", "bac vert", "le bac vert"] },
            { question: "b)", attendu: ["bleu", "bac bleu", "le bac bleu"] },
            { question: "c)", attendu: ["jaune", "bac jaune", "le bac jaune"] },
            { question: "d)", attendu: ["gris", "bac gris", "le bac gris"] },
          ],
          correction:
            "Je pose les questions dans l'ordre. Je m'arrête dès que la réponse est « oui ».\na) Une bouteille en verre : du verre ? oui. Bac vert.\nb) Un journal : du verre ? non. Papier ? oui. Bac bleu.\nc) Une canette : du verre ? non. Papier ? non. Métal ? oui. Bac jaune.\nd) Le crayon : non, non, non. Il va au bout de l'arbre : bac gris.\n⛔ Le piège : s'arrêter à la 1re question pour la canette, et la mettre « nulle part ». Un « non » envoie à la question suivante.\nRéponse : a) vert ; b) bleu ; c) jaune ; d) gris.",
          micros: ["tri_arbre"],
        },
        {
          titre: "Le nombre du magicien",
          enonce: "Le magicien Arthur pense à un nombre de $1$ à $50$. Il donne quatre indices, l'un après l'autre.\n1) Il est multiple de $5$. 2) Il est pair. 3) Il est plus grand que $25$. 4) Son chiffre des dizaines est $4$.\na) Combien de nombres sont possibles après l'indice 1 ?\nb) Et après l'indice 2 ?\nc) Et après l'indice 3 ?\nd) Quel est le nombre du magicien ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "40" },
          ],
          correction:
            "Chaque indice est un nouveau tri sur les nombres qui restent.\na) Multiples de $5$ : $5$ ; $10$ ; $15$ ; $20$ ; $25$ ; $30$ ; $35$ ; $40$ ; $45$ ; $50$. Il y en a $10$.\nb) Pairs : $10$ ; $20$ ; $30$ ; $40$ ; $50$. Il en reste $5$.\nc) Plus grands que $25$ : $30$ ; $40$ ; $50$. Il en reste $3$.\nd) Chiffre des dizaines $4$ : seul $40$ convient.\n⛔ Le piège du d) : répondre $45$. Il a bien $4$ dizaines, mais il a été enlevé à l'indice 2 : il est impair.\nRéponse : a) $10$ ; b) $5$ ; c) $3$ ; d) $40$.",
          micros: ["tri_criteres_successifs"],
        },
      ],
    },
  ],
};
