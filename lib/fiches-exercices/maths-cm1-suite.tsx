// ─── Fiche d'exercices : les suites de nombres (CM1) — 20 exercices corrigés ──
//
// 10/11/2026 : la feuille de la notion `suite` du coach CM1 (4 micros), sur la
// forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur la banque du coach (`questionBank/cm1/maths/suites.bank.ts`) et
// sur la carte mentale `cm1/suite` (`lib/cartes/remplies/cm1.json`) :
// continuer une suite, la compléter, trouver sa règle (+, −, ×), dire si elle
// est croissante ou décroissante, défis pas à pas.
// ⛔ LIMITES DU CM1 : des entiers, des règles simples (+ n, − n, × 2, × 10),
// pas de formule du terme général.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot court.
//
// Les pièges nommés : ajouter 1 au lieu du pas (1), le pas dans le mauvais sens
// (2), la règle lue sur le premier nombre (3), « grand nombre = croissante »
// (4), le trou mal rempli (5), compter les traits au lieu des sauts (6),
// sauter un nombre (7, 9), le dernier écart seul (10), passer 1 000 (11),
// oublier le 1er poste (12), compter les carrés au lieu des allumettes (13),
// la citerne « vide » trop tôt (14), une règle qui change (15), ajouter une
// seule fois au lieu de chaque semaine (17), le rang compté depuis 0 (18, 19),
// le motif mal découpé (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : course à pied (12, trail à La Réunion, le
// seul contexte réunionnais de la feuille), bricolage (13, allumettes), eau
// (14, citerne), épargne (17), jardinage (18), architecture (19, gradins),
// art (20, céramique).
// Les métiers des problèmes : jardinier (18), architecte (19), céramiste (20).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// Micro-compétences : suite_continuer (1, 2, 5, 6, 7, 11, 12, 13), suite_regle
// (3, 8, 9, 10, 13, 15, 16, 18, 19), suite_croissante_decroissante (4, 10, 14,
// 19), suite_defi (7, 12, 14, 15, 16, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { allumettes, droiteRel, ecranSeulement, frise } from "@/lib/fiches-exercices/dessins-cm1-nombres";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const CROISSANTE = ["croissante", "elle est croissante"];
const DECROISSANTE = ["décroissante", "elle est décroissante"];

export const exercicesSuiteCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "suite",
  titre: "Les suites de nombres",
  accroche:
    "Vingt exercices, du geste seul au problème. Continuer une suite de nombres. Trouver sa règle : ajouter, enlever ou multiplier. Dire si elle monte ou si elle descend. Compléter un nombre manquant. Des sauts sur une droite, des carrés en allumettes, une course en montagne, une citerne, une tirelire, un jardin, des gradins et une frise en céramique. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je calcule l'écart entre deux nombres qui se suivent. Pour deux nombres, je les sépare par « ; ».",
      rappel: [
        "Une suite de nombres suit une règle : on fait le même calcul à chaque pas.",
        "Pour trouver la règle, je calcule l'écart entre deux nombres voisins : $7 - 3 = 4$, la règle est « $+ 4$ ».",
        "Croissante : les nombres montent. Décroissante : ils descendent.",
      ],
      exercices: [
        {
          enonce: "Écris les deux nombres suivants.\na) $5$ ; $10$ ; $15$ ; $20$ ; … ; …\nb) $3$ ; $6$ ; $9$ ; $12$ ; … ; …\nc) $100$ ; $200$ ; $300$ ; … ; …\nd) $7$ ; $17$ ; $27$ ; $37$ ; … ; …",
          reponses: [
            { question: "a)", attendu: "25 ; 30", ordre: true },
            { question: "b)", attendu: "15 ; 18", ordre: true },
            { question: "c)", attendu: "400 ; 500", ordre: true },
            { question: "d)", attendu: "47 ; 57", ordre: true },
          ],
          correction:
            "Je cherche ce qu'on ajoute à chaque pas, puis je continue deux fois.\na) $10 - 5 = 5$ : on ajoute $5$. $20 + 5 = 25$, puis $25 + 5 = 30$.\nb) $6 - 3 = 3$ : on ajoute $3$. $12 + 3 = 15$, puis $15 + 3 = 18$.\nc) On ajoute $100$. $300 + 100 = 400$, puis $500$.\nd) On ajoute $10$ : seul le chiffre des dizaines change. $37 + 10 = 47$, puis $57$.\n⛔ Le piège : écrire $21$ après $20$. On ajoute $5$, pas $1$.\nRéponse : a) $25$ ; $30$ ; b) $15$ ; $18$ ; c) $400$ ; $500$ ; d) $47$ ; $57$.",
          micros: ["suite_continuer"],
        },
        {
          enonce: "Écris les deux nombres suivants.\na) $50$ ; $45$ ; $40$ ; … ; …\nb) $30$ ; $27$ ; $24$ ; … ; …\nc) $1\\,000$ ; $900$ ; $800$ ; … ; …\nd) $64$ ; $54$ ; $44$ ; … ; …",
          reponses: [
            { question: "a)", attendu: "35 ; 30", ordre: true },
            { question: "b)", attendu: "21 ; 18", ordre: true },
            { question: "c)", attendu: "700 ; 600", ordre: true },
            { question: "d)", attendu: "34 ; 24", ordre: true },
          ],
          correction:
            "Les nombres descendent : à chaque pas, on enlève le même nombre.\na) $50 - 45 = 5$ : on enlève $5$. $40 - 5 = 35$, puis $35 - 5 = 30$.\nb) On enlève $3$. $24 - 3 = 21$, puis $21 - 3 = 18$.\nc) On enlève $100$. $800 - 100 = 700$, puis $600$.\nd) On enlève $10$. $44 - 10 = 34$, puis $24$.\n⛔ Le piège : ajouter au lieu d'enlever, et écrire $45$ après $40$. La suite descend : je continue à descendre.\nRéponse : a) $35$ ; $30$ ; b) $21$ ; $18$ ; c) $700$ ; $600$ ; d) $34$ ; $24$.",
          micros: ["suite_continuer"],
        },
        {
          enonce: "Choisis la règle de chaque suite.\na) $3$ ; $7$ ; $11$ ; $15$\nA) + 3   B) + 4   C) − 4\nb) $40$ ; $35$ ; $30$ ; $25$\nA) − 5   B) + 5   C) − 10\nc) $2$ ; $4$ ; $8$ ; $16$\nA) + 2   B) + 6   C) × 2",
          reponses: [
            { question: "a)", attendu: ["B", "b) + 4"] },
            { question: "b)", attendu: ["A", "a) − 5"] },
            { question: "c)", attendu: ["C", "c) × 2"] },
          ],
          correction:
            "Je calcule l'écart entre plusieurs nombres voisins, pas un seul.\na) $7 - 3 = 4$, $11 - 7 = 4$, $15 - 11 = 4$. La règle est « $+ 4$ » : réponse B.\nb) $40 - 35 = 5$, $35 - 30 = 5$. Les nombres descendent : « $- 5$ ». Réponse A.\nc) $2 + 2 = 4$, mais $4 + 2 = 6$, pas $8$. Ce n'est pas « $+ 2$ ».\n$2 \\times 2 = 4$, $4 \\times 2 = 8$, $8 \\times 2 = 16$. La règle est « $\\times 2$ » : réponse C.\n⛔ Le piège : choisir « $+ 3$ » au a) parce que la suite commence par $3$.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["suite_regle"],
        },
        {
          enonce: "Chaque suite est-elle croissante ou décroissante ?\na) $2$ ; $4$ ; $6$ ; $8$\nb) $100$ ; $90$ ; $80$ ; $70$\nc) $12$ ; $21$ ; $30$ ; $39$\nd) $99$ ; $88$ ; $77$ ; $66$",
          reponses: [
            { question: "a)", attendu: CROISSANTE },
            { question: "b)", attendu: DECROISSANTE },
            { question: "c)", attendu: CROISSANTE },
            { question: "d)", attendu: DECROISSANTE },
          ],
          correction:
            "Je regarde si les nombres montent ou descendent, de gauche à droite.\na) $2 < 4 < 6 < 8$ : ils montent. Croissante.\nb) $100 > 90 > 80 > 70$ : ils descendent. Décroissante.\nc) $12 < 21 < 30 < 39$ : ils montent, de $9$ en $9$. Croissante.\nd) $99 > 88 > 77 > 66$ : ils descendent, de $11$ en $11$. Décroissante.\n⛔ Le piège : dire « croissante » pour b) parce que $100$ est un grand nombre. Je regarde le sens, pas la taille.\nRéponse : a) croissante ; b) décroissante ; c) croissante ; d) décroissante.",
          micros: ["suite_croissante_decroissante"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $5$ ; $10$ ; … ; $20$ ; $25$\nb) $20$ ; $30$ ; … ; $50$ ; $60$\nc) $4$ ; … ; $12$ ; $16$\nd) $90$ ; $75$ ; … ; $45$",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "Je trouve la règle avec deux nombres voisins, puis je remplis le trou.\na) $25 - 20 = 5$ : on ajoute $5$. $10 + 5 = 15$.\nb) On ajoute $10$. $30 + 10 = 40$.\nc) $16 - 12 = 4$ : on ajoute $4$. $4 + 4 = 8$.\nd) $90 - 75 = 15$ : on enlève $15$. $75 - 15 = 60$. Je vérifie : $60 - 15 = 45$.\n⛔ Le piège : chercher la règle avec les deux nombres autour du trou. Je prends deux nombres qui se SUIVENT.\nRéponse : a) $15$ ; b) $40$ ; c) $8$ ; d) $60$.",
          micros: ["suite_continuer"],
        },
        {
          enonce: "Une grenouille saute sur la droite. Elle part de $0$.\na) De combien avance-t-elle à chaque saut ?\nb) Où arrive-t-elle au saut suivant ?\nc) Et au saut d'après ?",
          figure: droiteRel(0, 30, 1, [
            { value: 0, label: "" },
            { value: 6, label: "" },
            { value: 12, label: "" },
            { value: 18, label: "" },
          ], {
            nombres: 10,
            sauts: [
              { de: 0, vers: 6, label: "?" },
              { de: 6, vers: 12, label: "?" },
              { de: 12, vers: 18, label: "?" },
            ],
          }),
          reponses: [
            { question: "a)", attendu: ["6", "+6"] },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "30" },
          ],
          correction:
            "Un petit trait vaut $1$. Je compte les sauts de $1$ entre deux points.\na) Du point de $0$ au point suivant, je compte $6$ traits. Elle avance de $6$.\nLes points sont à $0$, $6$, $12$ et $18$.\nb) $18 + 6 = 24$.\nc) $24 + 6 = 30$.\n⛔ Le piège : compter les traits, $0$ compris. On trouverait $7$ au lieu de $6$.\nRéponse : a) $6$ ; b) $24$ ; c) $30$.",
          micros: ["suite_continuer", "suite_regle"],
        },
        {
          enonce: "Voici une suite : $1$ ; $3$ ; $5$ ; $7$ ; …\na) Quel est le 5e nombre ?\nb) Quel est le 8e nombre ?\nc) Ces nombres sont-ils pairs ou impairs ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: ["impairs", "impair"] },
          ],
          correction:
            "La règle est « $+ 2$ ». J'écris la suite sans sauter de nombre.\n1er : $1$ ; 2e : $3$ ; 3e : $5$ ; 4e : $7$.\na) 5e : $7 + 2 = 9$.\nb) Puis 6e : $11$ ; 7e : $13$ ; 8e : $15$.\nc) Ils finissent tous par $1$, $3$, $5$, $7$ ou $9$ : ils sont impairs.\n⛔ Le piège : sauter un nombre en comptant de tête. J'écris chaque nombre avec son rang.\nRéponse : a) $9$ ; b) $15$ ; c) impairs.",
          micros: ["suite_continuer", "suite_defi"],
        },
        {
          enonce: "Écris la règle de chaque suite.\na) $6$ ; $12$ ; $18$ ; $24$\nb) $80$ ; $70$ ; $60$ ; $50$\nc) $1$ ; $10$ ; $100$ ; $1\\,000$",
          reponses: [
            { question: "a)", attendu: ["+6", "ajouter 6", "on ajoute 6", "plus 6"] },
            { question: "b)", attendu: ["-10", "enlever 10", "on enlève 10", "moins 10", "retirer 10", "on retire 10"] },
            { question: "c)", attendu: ["×10", "x10", "*10", "multiplier par 10", "on multiplie par 10", "fois 10"] },
          ],
          correction:
            "Je compare deux nombres voisins.\na) $12 - 6 = 6$ et $18 - 12 = 6$. La règle est « $+ 6$ » : on ajoute $6$.\nb) Les nombres descendent. $80 - 70 = 10$. La règle est « $- 10$ » : on enlève $10$.\nc) $1 + 9 = 10$, mais $10 + 9 = 19$, pas $100$. Ce n'est pas « $+ 9$ ».\n$1 \\times 10 = 10$, $10 \\times 10 = 100$. La règle est « $\\times 10$ ».\n⛔ Le piège du b) : écrire « $+ 10$ ». La suite descend : on enlève.\nRéponse : a) $+ 6$ ; b) $- 10$ ; c) $\\times 10$.",
          micros: ["suite_regle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris la suite au brouillon, nombre par nombre, avec son rang.",
      rappel: [
        "Je vérifie la règle sur TOUS les écarts, pas sur un seul.",
        "Pour trouver le 10e nombre, j'écris les nombres un par un, ou je compte les pas : du 1er au 10e, il y a $9$ pas.",
        "Une suite peut être faite de figures : je compte ce qu'on ajoute d'une figure à la suivante.",
      ],
      exercices: [
        {
          enonce: "Voici une suite : $4$ ; $7$ ; $10$ ; $13$ ; …\na) Écris la règle.\nb) Écris les deux nombres suivants.\nc) Quel est le 10e nombre ?",
          reponses: [
            { question: "a)", attendu: ["+3", "ajouter 3", "on ajoute 3", "plus 3"] },
            { question: "b)", attendu: "16 ; 19", ordre: true },
            { question: "c)", attendu: "31" },
          ],
          correction:
            "a) $7 - 4 = 3$, $10 - 7 = 3$, $13 - 10 = 3$. La règle est « $+ 3$ ».\nb) $13 + 3 = 16$, puis $16 + 3 = 19$.\nc) J'écris la suite avec les rangs : 1er $4$, 2e $7$, 3e $10$, 4e $13$, 5e $16$, 6e $19$, 7e $22$, 8e $25$, 9e $28$, 10e $31$.\n⭐ Autre façon : du 1er au 10e, il y a $9$ pas de $3$. $4 + 9 \\times 3 = 4 + 27 = 31$.\n⛔ Le piège : faire $10 \\times 3 = 30$. Il y a $9$ pas, et on part de $4$.\nRéponse : a) $+ 3$ ; b) $16$ ; $19$ ; c) $31$.",
          micros: ["suite_regle", "suite_continuer"],
        },
        {
          enonce: "Vrai ou faux ?\na) La suite $3$ ; $6$ ; $10$ ; $15$ suit la règle « $+ 3$ ».\nb) Dans la suite $10$ ; $20$ ; $40$ ; $80$, on ajoute toujours $10$.\nc) La suite $1\\,000$ ; $950$ ; $900$ ; $850$ est décroissante.\nd) Dans la suite $2$ ; $5$ ; $8$ ; $11$ ; …, le nombre $20$ viendra.",
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: VRAI },
          ],
          correction:
            "Je vérifie chaque écart.\na) $6 - 3 = 3$, mais $10 - 6 = 4$. La règle change : faux.\nb) $20 - 10 = 10$, mais $40 - 20 = 20$. On multiplie par $2$ : faux.\nc) Les nombres descendent de $50$ en $50$ : vrai, elle est décroissante.\nd) On ajoute $3$ : $11$ ; $14$ ; $17$ ; $20$. Vrai, $20$ viendra.\n⛔ Le piège du a) : regarder seulement le premier écart. Une règle doit marcher partout.\nRéponse : a) faux ; b) faux ; c) vrai ; d) vrai.",
          micros: ["suite_regle", "suite_croissante_decroissante"],
        },
        {
          enonce: "Écris les deux nombres suivants.\na) $2\\,500$ ; $3\\,000$ ; $3\\,500$ ; … ; …\nb) $12\\,000$ ; $11\\,000$ ; $10\\,000$ ; … ; …\nc) $125$ ; $150$ ; $175$ ; … ; …\nd) $990$ ; $995$ ; $1\\,000$ ; … ; …",
          reponses: [
            { question: "a)", attendu: "4000 ; 4500", ordre: true },
            { question: "b)", attendu: "9000 ; 8000", ordre: true },
            { question: "c)", attendu: "200 ; 225", ordre: true },
            { question: "d)", attendu: "1005 ; 1010", ordre: true },
          ],
          correction:
            "a) On ajoute $500$. $3\\,500 + 500 = 4\\,000$, puis $4\\,500$.\nb) On enlève $1\\,000$. $10\\,000 - 1\\,000 = 9\\,000$, puis $8\\,000$.\nc) On ajoute $25$. $175 + 25 = 200$, puis $225$.\nd) On ajoute $5$. $1\\,000 + 5 = 1\\,005$, puis $1\\,010$.\n⛔ Le piège du d) : écrire $1\\,100$ après $1\\,000$. On ajoute toujours $5$, même après $1\\,000$.\nRéponse : a) $4\\,000$ ; $4\\,500$ ; b) $9\\,000$ ; $8\\,000$ ; c) $200$ ; $225$ ; d) $1\\,005$ ; $1\\,010$.",
          micros: ["suite_continuer"],
        },
        {
          enonce: "Pendant un trail à La Réunion, un poste d'eau est posé tous les $5$ km. Le 1er poste est au km $5$.\na) À quel km est le 4e poste ?\nb) La course s'arrête au km $40$. Il y a un poste à l'arrivée. Combien y a-t-il de postes ?\nc) Y a-t-il un poste au km $32$ ? Réponds par oui ou non.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "Les postes forment une suite : $5$ ; $10$ ; $15$ ; … On ajoute $5$.\na) 1er : $5$, 2e : $10$, 3e : $15$, 4e : $20$. Le 4e poste est au km $20$.\nb) Je continue : $25$ ; $30$ ; $35$ ; $40$. Je compte : $5$, $10$, $15$, $20$, $25$, $30$, $35$, $40$. Cela fait $8$ postes.\n⭐ Je vérifie : $8 \\times 5 = 40$.\nc) Les postes sont aux multiples de $5$. $32$ ne finit ni par $0$ ni par $5$ : non.\n⛔ Le piège du b) : compter un poste au km $0$. Le 1er poste est au km $5$.\nRéponse : a) km $20$ ; b) $8$ postes ; c) non.",
          micros: ["suite_continuer", "suite_defi"],
        },
        {
          enonce: "Lina fait des carrés avec des allumettes.\nFigure 1 : $4$ allumettes. Figure 2 : $7$ allumettes. Figure 3 : $10$ allumettes.\na) Combien d'allumettes ajoute-t-on d'une figure à la suivante ?\nb) Combien faut-il d'allumettes pour la figure 4 ?\nc) Et pour la figure 6 ?",
          figure: allumettes([1, 2, 3]),
          reponses: [
            { question: "a)", attendu: ["3", "+3"] },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: "19" },
          ],
          correction:
            "a) $7 - 4 = 3$ et $10 - 7 = 3$. Un nouveau carré prend $3$ allumettes : il partage un côté avec le carré d'avant.\nb) Figure 4 : $10 + 3 = 13$ allumettes.\nc) Figure 5 : $13 + 3 = 16$. Figure 6 : $16 + 3 = 19$ allumettes.\n⛔ Le piège : ajouter $4$ allumettes par carré. Le côté du milieu est partagé : on n'en ajoute que $3$.\nRéponse : a) $3$ ; b) $13$ ; c) $19$.",
          micros: ["suite_regle", "suite_continuer"],
        },
        {
          enonce: "Une citerne contient $1\\,200$ litres d'eau le lundi. Chaque jour, on utilise $150$ litres.\na) Combien de litres reste-t-il le mardi ?\nb) Combien de litres reste-t-il le jeudi ?\nc) La suite des litres est-elle croissante ou décroissante ?\nd) Combien de jours après lundi la citerne sera-t-elle vide ?",
          reponses: [
            { question: "a)", attendu: "1050" },
            { question: "b)", attendu: "750" },
            { question: "c)", attendu: DECROISSANTE },
            { question: "d)", attendu: "8" },
          ],
          correction:
            "Chaque jour, on enlève $150$ litres. La règle est « $- 150$ ».\na) Mardi : $1\\,200 - 150 = 1\\,050$ litres.\nb) Mercredi : $1\\,050 - 150 = 900$. Jeudi : $900 - 150 = 750$ litres.\nc) Les nombres descendent : décroissante.\nd) Je continue : $600$ ; $450$ ; $300$ ; $150$ ; $0$.\nDepuis lundi, je compte les pas : $1\\,050$, $900$, $750$, $600$, $450$, $300$, $150$, $0$. Cela fait $8$ jours.\n⭐ Je vérifie : $8 \\times 150 = 1\\,200$.\n⛔ Le piège du d) : s'arrêter à $150$ litres. La citerne n'est pas encore vide.\nRéponse : a) $1\\,050$ L ; b) $750$ L ; c) décroissante ; d) $8$ jours.",
          micros: ["suite_croissante_decroissante", "suite_defi"],
        },
        {
          enonce: "Trouve le nombre qui manque. Cherche d'abord la règle.\na) $8$ ; … ; $20$ ; $26$\nb) $55$ ; $48$ ; … ; $34$\nc) $3$ ; $6$ ; $12$ ; … ; $48$\nd) $1$ ; $4$ ; $9$ ; $16$ ; … (les écarts sont $3$, $5$, $7$…)",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "41" },
            { question: "c)", attendu: "24" },
            { question: "d)", attendu: "25" },
          ],
          correction:
            "a) $26 - 20 = 6$ : on ajoute $6$. $8 + 6 = 14$. Je vérifie : $14 + 6 = 20$.\nb) $55 - 48 = 7$ : on enlève $7$. $48 - 7 = 41$. Je vérifie : $41 - 7 = 34$.\nc) $3 \\times 2 = 6$, $6 \\times 2 = 12$ : on multiplie par $2$. $12 \\times 2 = 24$, et $24 \\times 2 = 48$.\nd) Les écarts grandissent de $2$ : $3$, $5$, $7$, puis $9$. $16 + 9 = 25$.\n⛔ Le piège du c) : croire à « $+ 3$ » avec $3$ et $6$ seulement. $6 + 3 = 9$, pas $12$.\nRéponse : a) $14$ ; b) $41$ ; c) $24$ ; d) $25$.",
          micros: ["suite_regle", "suite_defi"],
        },
        {
          enonce: "Voici la suite de la table de $7$ : $7$ ; $14$ ; $21$ ; …\na) Quel est le 6e nombre ?\nb) Quel est le 10e nombre ?\nc) $50$ est-il dans cette suite ? Réponds par oui ou non.\nd) $63$ est-il dans cette suite ?",
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "70" },
            { question: "c)", attendu: ["non", "faux"] },
            { question: "d)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "La règle est « $+ 7$ ». Le 6e nombre de la suite, c'est $6 \\times 7$.\na) 6e : $6 \\times 7 = 42$. Je vérifie : $7$ ; $14$ ; $21$ ; $28$ ; $35$ ; $42$.\nb) 10e : $10 \\times 7 = 70$.\nc) $7 \\times 7 = 49$ et $7 \\times 8 = 56$. $50$ est entre les deux : non.\nd) $7 \\times 9 = 63$ : oui, c'est le 9e nombre.\n⛔ Le piège du c) : dire oui car $50$ est « rond ». Je cherche dans la table de $7$.\nRéponse : a) $42$ ; b) $70$ ; c) non ; d) oui.",
          micros: ["suite_regle", "suite_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris la suite pas à pas, sans sauter de nombre.",
      rappel: [
        "J'écris la suite dans un tableau : le rang en haut, le nombre en bas.",
        "Si on ajoute $3$ chaque semaine, après $3$ semaines on a ajouté $3$ fois $3$.",
        "Un motif qui se répète : je repère sa longueur, puis je compte par paquets.",
      ],
      exercices: [
        {
          titre: "La tirelire",
          enonce: "Inès a $6$ € dans sa tirelire. Chaque semaine, elle y met $3$ €.\na) Combien a-t-elle après $1$ semaine ?\nb) Combien a-t-elle après $3$ semaines ?\nc) Après combien de semaines aura-t-elle $30$ € ?\nd) Son frère a $26$ €. Chaque semaine, il dépense $2$ €. Après combien de semaines auront-ils la même somme ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "4" },
          ],
          correction:
            "La suite d'Inès commence à $6$ et la règle est « $+ 3$ ».\na) $6 + 3 = 9$ €.\nb) $9$ ; $12$ ; $15$. Après $3$ semaines, elle a $15$ €.\nc) Je continue : $18$ ; $21$ ; $24$ ; $27$ ; $30$. Je compte les semaines : $9$, $12$, $15$, $18$, $21$, $24$, $27$, $30$. Cela fait $8$ semaines.\nd) Son frère : $26$ ; $24$ ; $22$ ; $20$ ; $18$. Inès : $6$ ; $9$ ; $12$ ; $15$ ; $18$.\nAprès $4$ semaines, ils ont tous les deux $18$ €.\n⛔ Le piège du b) : faire $6 + 3 = 9$ €. Elle ajoute $3$ € TROIS fois, donc $15$ €.\nRéponse : a) $9$ € ; b) $15$ € ; c) $8$ semaines ; d) $4$ semaines.",
          micros: ["suite_continuer", "suite_defi"],
        },
        {
          titre: "Les tulipes du jardinier",
          enonce: "Karim est jardinier. Il plante des tulipes en rangées.\nLa 1re rangée a $5$ tulipes. Chaque rangée a $4$ tulipes de plus que la précédente.\na) Combien de tulipes a la 4e rangée ?\nb) Combien de tulipes a la 6e rangée ?\nc) Combien de tulipes y a-t-il en tout dans les $4$ premières rangées ?\nd) Quelle rangée aura $41$ tulipes ? Donne son numéro.",
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: "25" },
            { question: "c)", attendu: "44" },
            { question: "d)", attendu: ["10", "10e", "la 10e"] },
          ],
          correction:
            "La suite commence à $5$, la règle est « $+ 4$ ».\na) 1re : $5$, 2e : $9$, 3e : $13$, 4e : $17$ tulipes.\nb) 5e : $21$, 6e : $25$ tulipes.\nc) $5 + 9 + 13 + 17 = 44$ tulipes.\nd) Je continue : 7e : $29$, 8e : $33$, 9e : $37$, 10e : $41$. C'est la 10e rangée.\n⛔ Le piège du a) : faire $5 + 4 = 9$ et s'arrêter. $9$, c'est la 2e rangée. Je compte les rangs un par un.\nRéponse : a) $17$ ; b) $25$ ; c) $44$ ; d) la 10e rangée.",
          micros: ["suite_regle", "suite_defi"],
        },
        {
          titre: "Les gradins de l'architecte",
          enonce: "Léa est architecte. Elle dessine les gradins d'un petit stade.\nLe 1er rang a $30$ places. Chaque rang a $4$ places de plus que celui de devant.\na) Combien de places a le 5e rang ?\nb) Quel rang a $62$ places ? Donne son numéro.\nc) La suite des places est-elle croissante ou décroissante ?\nd) Combien de places y a-t-il en tout dans les $3$ premiers rangs ?",
          reponses: [
            { question: "a)", attendu: "46" },
            { question: "b)", attendu: ["9", "9e", "le 9e"] },
            { question: "c)", attendu: CROISSANTE },
            { question: "d)", attendu: "102" },
          ],
          correction:
            "La suite commence à $30$, la règle est « $+ 4$ ».\na) 1er : $30$, 2e : $34$, 3e : $38$, 4e : $42$, 5e : $46$ places.\nb) Je continue : 6e : $50$, 7e : $54$, 8e : $58$, 9e : $62$. C'est le 9e rang.\n⭐ Je vérifie : du 1er au 9e, $8$ pas de $4$. $30 + 8 \\times 4 = 30 + 32 = 62$.\nc) Les nombres montent : croissante.\nd) $30 + 34 + 38 = 102$ places.\n⛔ Le piège du b) : compter les pas ($8$) au lieu du rang ($9$). Le 1er rang compte aussi.\nRéponse : a) $46$ ; b) le 9e rang ; c) croissante ; d) $102$ places.",
          micros: ["suite_regle", "suite_croissante_decroissante", "suite_defi"],
        },
        {
          titre: "La frise de la céramiste",
          enonce: "Zoé est céramiste. Elle pose une frise de carreaux : bleu, jaune, jaune, puis bleu, jaune, jaune, et ainsi de suite.\na) De quelle couleur est le 10e carreau ?\nb) Combien y a-t-il de carreaux bleus parmi les $30$ premiers ?\nc) Combien y a-t-il de carreaux jaunes parmi les $30$ premiers ?\nd) De quelle couleur est le 50e carreau ?",
          figure: frise(["b", "j", "j", "b", "j", "j", "b", "j", "j"]),
          reponses: [
            { question: "a)", attendu: "bleu" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "20" },
            { question: "d)", attendu: "jaune" },
          ],
          correction:
            "Le motif a $3$ carreaux : bleu, jaune, jaune.\nLes carreaux bleus sont aux rangs $1$ ; $4$ ; $7$ ; $10$… C'est une suite de règle « $+ 3$ ».\na) $10$ est dans la suite des bleus : le 10e carreau est bleu.\nb) $30$ carreaux, ce sont $30 \\div 3 = 10$ motifs. Chaque motif a $1$ bleu : $10$ bleus.\nc) Chaque motif a $2$ jaunes : $10 \\times 2 = 20$ jaunes. Je vérifie : $10 + 20 = 30$.\nd) Les bleus : $1$ ; $4$ ; … ; $46$ ; $49$. Le 49e est bleu, donc le 50e est le jaune qui suit.\n⛔ Le piège : croire que les rangs pairs sont jaunes. Le 4e et le 10e sont bleus : le motif a $3$ carreaux, pas $2$.\nRéponse : a) bleu ; b) $10$ ; c) $20$ ; d) jaune.",
          micros: ["suite_regle", "suite_defi"],
        },
      ],
    },
  ],
};
