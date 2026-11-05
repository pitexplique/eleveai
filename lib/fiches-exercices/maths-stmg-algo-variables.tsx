// ─── Fiche d'exercices : variables, compteur et accumulateur (STMG) — 20 exercices ─
//
// Notion algo_variables du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach fait
// LIRE du Python réel et, parfois, la flèche « ← » des sujets de bac. Il demande :
// suivre une affectation, l'échange raté, le compteur (et le compteur remis à
// zéro dans la boucle), l'accumulateur (somme, puis produit qui part de 1),
// random() et la loi de Bernoulli. Rien d'autre.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; boulangerie (boulanger), hôpital
// (infirmier), course à pied (entraîneuse), forêt (garde forestière), prix de
// l'énergie (journaliste), agriculture (biologiste), basket (entraîneur), cinéma
// (programmateur), festival (billetterie), logistique (logisticien), énergie
// solaire (installatrice), enquête de santé (épidémiologiste).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs` (chaque
// programme y est traduit en JavaScript, puis exécuté aussi par Python).
//
// Micro-compétences : algo_affectation (1, 2, 3, 4, 9, 18), algo_compteur (5, 7,
// 10, 12, 16, 17, 19), algo_accumulateur (6, 7, 11, 13, 16, 17, 19), algo_aleatoire
// (8, 14, 15, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme, trace } from "@/lib/fiches-exercices/figures";

export const exercicesAlgoVariablesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "algo-variables",
  titre: "Variables, compteur et accumulateur",
  accroche:
    "Vingt exercices pour lire un programme sans se perdre : suivre une variable ligne à ligne, compter avec un compteur, additionner avec un accumulateur, simuler une expérience avec random(). Un fournil, un service d'hôpital, une forêt, un festival, des panneaux solaires : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire le programme ligne à ligne, dans l'ordre, et noter la valeur de chaque variable.",
      rappel: [
        "Une affectation range une valeur dans une variable. En Python : x = 5. En langage naturel : x ← 5.",
        "x = x + 2 : on calcule d'abord à droite, puis on range le résultat dans x. L'ancienne valeur est perdue.",
        "Un compteur augmente de 1 à chaque fois (c = c + 1). Un accumulateur ajoute la valeur lue (s = s + v).",
        "random() donne un nombre au hasard entre 0 et 1. La condition random() < p est vraie avec la probabilité p.",
      ],
      exercices: [
        {
          enonce: "Qu'affiche ce programme ?",
          figure: programme(["x = 7", "x = x + 5", "print(x)"]),
          reponses: [{ attendu: "12" }],
          correction:
            "x vaut d'abord 7.\nÀ la ligne 2, on calcule à droite : $7 + 5 = 12$. Puis on range 12 dans x.\n⛔ Le piège : répondre 7. Le signe = de Python ne veut pas dire « égale » : il remplace l'ancienne valeur.\nRéponse : 12.",
          micros: ["algo_affectation"],
        },
        {
          enonce: "On exécute ce programme.\na) Que vaut a à la fin ?\nb) Que vaut b à la fin ?",
          figure: programme(["a = 4", "b = 9", "a = a * b"]),
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "a) Le signe * veut dire « fois » : $4 \\times 9 = 36$, et ce résultat va dans a.\nb) La ligne 3 ne change que a : b vaut toujours 9.\n⛔ Le piège : croire que b change aussi. Seule la variable écrite à gauche du = reçoit une nouvelle valeur.\nRéponse : a) 36 ; b) 9.",
          micros: ["algo_affectation"],
        },
        {
          enonce: "Cet algorithme est écrit en langage naturel. Quelle valeur affiche-t-il ?",
          figure: programme(["N ← 20", "N ← N - 6", "N ← 2 × N", "Afficher N"]),
          reponses: [{ attendu: "28" }],
          correction:
            "La flèche se lit « reçoit ».\nN reçoit 20. Puis N reçoit $20 - 6 = 14$. Puis N reçoit $2 \\times 14 = 28$.\n⛔ Le piège : calculer $2 \\times 20$ à la dernière ligne. N ne vaut plus 20 : il vaut 14.\nRéponse : 28.",
          micros: ["algo_affectation"],
        },
        {
          enonce:
            "Ce programme voudrait échanger les valeurs de x et de y. Qu'affiche-t-il réellement ? Écris les deux nombres dans l'ordre, séparés par un point-virgule.",
          figure: programme(["x = 5", "y = 8", "x = y", "y = x", "print(x, y)"]),
          reponses: [{ attendu: "8 ; 8", ordre: true }],
          correction:
            "Après x = y, x vaut 8 et le 5 est perdu.\nAprès y = x, y reçoit 8, qu'il contenait déjà.\nLe programme affiche donc 8 et 8 : l'échange a échoué.\n⛔ Le piège : répondre 8 ; 5. L'ordinateur ne se souvient pas d'une valeur qu'il a écrasée.\nRéponse : 8 ; 8.",
          micros: ["algo_affectation"],
        },
        {
          enonce: "Ce programme parcourt une liste de cinq nombres. Qu'affiche-t-il ?",
          figure: programme(["L = [12, 7, 15, 9, 18]", "c = 0", "for v in L:", "    if v > 10:", "        c = c + 1", "print(c)"]),
          reponses: [{ attendu: "3" }],
          correction:
            "La variable c est un compteur : elle gagne 1 chaque fois que la valeur dépasse 10.\nLes valeurs qui dépassent 10 : 12, 15 et 18. Cela fait 3 valeurs.\n⛔ Le piège : additionner $12 + 15 + 18 = 45$. La ligne est c = c + 1 : un compteur compte, il n'additionne pas.\nRéponse : 3.",
          micros: ["algo_compteur"],
        },
        {
          enonce: "Ce programme parcourt une liste de quatre nombres. Qu'affiche-t-il ?",
          figure: programme(["L = [4, 6, 10, 5]", "s = 0", "for v in L:", "    s = s + v", "print(s)"]),
          reponses: [{ attendu: "25" }],
          correction:
            "La variable s est un accumulateur : à chaque tour, elle reçoit la valeur lue en plus.\n$0 + 4 = 4$, puis $4 + 6 = 10$, puis $10 + 10 = 20$, puis $20 + 5 = 25$.\n⛔ Le piège : répondre 4, le nombre de valeurs. La ligne est s = s + v, et non s = s + 1.\nRéponse : 25.",
          micros: ["algo_accumulateur"],
        },
        {
          enonce:
            "Pour chaque ligne placée dans une boucle, écris « compteur » ou « accumulateur ».\na) n = n + 1\nb) total = total + prix",
          reponses: [
            { question: "a)", attendu: "compteur" },
            { question: "b)", attendu: "accumulateur" },
          ],
          correction:
            "a) n gagne toujours 1 : c'est un compteur.\nb) total gagne la valeur de prix, qui change à chaque tour : c'est un accumulateur.\n⛔ Le piège : se fier au nom de la variable. C'est ce qu'on ajoute qui décide : 1, ou la valeur lue.\nRéponse : a) compteur ; b) accumulateur.",
          micros: ["algo_compteur", "algo_accumulateur"],
        },
        {
          enonce: "random() donne un nombre au hasard entre 0 et 1. Quelle est la probabilité que la condition de cette ligne soit vraie ?",
          figure: programme(["if random() < 0.3:"]),
          reponses: [{ attendu: "0,3" }],
          correction:
            "Tomber en dessous de 0,3, c'est tomber dans l'intervalle de 0 à 0,3, de longueur 0,3.\nLa probabilité de tomber dans un intervalle est égale à sa longueur : ici 0,3.\n⛔ Le piège : répondre 0,7. C'est la probabilité que la condition soit fausse.\nRéponse : 0,3.",
          micros: ["algo_aleatoire"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : on suit les variables, tour après tour.",
      rappel: [
        "Un compteur s'initialise une seule fois, AVANT la boucle. Placé dans la boucle, il repart de zéro à chaque tour.",
        "Pour une somme, l'accumulateur part de 0. Pour un produit, il part de 1.",
        "Répéter random() < p dans une boucle de n tours et compter les succès donne un NOMBRE de succès. Il change d'une exécution à l'autre, et vaut en moyenne n × p.",
        "La fréquence des succès, c'est ce nombre divisé par n.",
      ],
      exercices: [
        {
          enonce:
            "Un boulanger suit son stock de pains avec ce programme.\na) Que vaut pains après la ligne 2 ?\nb) Qu'affiche le programme ?",
          figure: programme(["pains = 120", "pains = pains - 35", "pains = pains + 50", "print(pains)"]),
          reponses: [
            { question: "a)", attendu: "85" },
            { question: "b)", attendu: "135" },
          ],
          correction:
            "a) $120 - 35 = 85$ : il reste 85 pains après la ligne 2.\nb) La ligne 3 part de 85, et non de 120 : $85 + 50 = 135$.\n⛔ Le piège au b) : calculer $120 + 50 = 170$. Chaque ligne repart de la dernière valeur.\nRéponse : a) 85 ; b) 135.",
          micros: ["algo_affectation"],
        },
        {
          enonce:
            "Un infirmier relève la température de six patients, en degrés arrondis (modèle). Il compte ceux qui dépassent 38.\na) Qu'affiche le programme ?\nb) On remplace v > 38 par v >= 38. Qu'affiche-t-il alors ?",
          figure: programme(["t = [37, 39, 38, 40, 36, 38]", "c = 0", "for v in t:", "    if v > 38:", "        c = c + 1", "print(c)"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "a) Strictement au-dessus de 38 : 39 et 40. Le compteur vaut 2.\nb) Avec >=, le 38 compte aussi, et il y en a deux : 39, 38, 40, 38. Le compteur vaut 4.\n⛔ Le piège au a) : compter les 38. Le signe > exclut l'égalité.\nRéponse : a) 2 ; b) 4.",
          micros: ["algo_compteur"],
        },
        {
          enonce:
            "Une entraîneuse additionne les kilomètres courus par Léa en cinq jours (modèle).\na) Qu'affiche le programme ?\nb) Quelle distance moyenne Léa a-t-elle courue par jour ?",
          figure: programme(["km = [8, 12, 5, 15, 10]", "s = 0", "for v in km:", "    s = s + v", "print(s)"]),
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "10 km" },
          ],
          correction:
            "a) L'accumulateur prend 8, 20, 25, 40, puis 50.\nb) La moyenne, c'est le total divisé par le nombre de jours : $50 \\div 5 = 10$ km.\n⛔ Le piège au a) : répondre 15, la plus grande valeur. Le programme additionne, il ne cherche pas le maximum.\nRéponse : a) 50 ; b) 10 km.",
          micros: ["algo_accumulateur"],
        },
        {
          enonce:
            "Une garde forestière veut compter les arbres de plus de 8 m (modèle). Son programme a une erreur.\na) Qu'affiche-t-il ?\nb) Qu'aurait-il dû afficher ?\nc) Quelle ligne faut-il sortir de la boucle ? Recopie-la.",
          figure: programme(["h = [3, 14, 9, 21, 6]", "for v in h:", "    c = 0", "    if v > 8:", "        c = c + 1", "print(c)"]),
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "c = 0", exact: true },
          ],
          correction:
            "a) La ligne c = 0 est dans la boucle : c repart de zéro à chaque tour. Il ne reste que le dernier tour. Or $6$ ne dépasse pas 8 : c vaut 0.\nb) Les arbres de plus de 8 m : 14, 9 et 21. Il fallait trouver 3.\nc) Il faut placer c = 0 avant le for.\n⛔ Le piège : chercher l'erreur dans la condition. Elle est juste : c'est l'indentation qui se trompe.\nRéponse : a) 0 ; b) 3 ; c) c = 0.",
          micros: ["algo_compteur"],
        },
        {
          enonce:
            "Une journaliste suit le prix de l'énergie sur trois périodes (modèle). Ce programme calcule le coefficient global des trois évolutions.\na) Qu'affiche le programme ?\nb) On remplace s = 1 par s = 0. Qu'afficherait-il ?",
          figure: programme(["coefs = [1.1, 0.9, 1.2]", "s = 1", "for c in coefs:", "    s = s * c", "print(round(s, 3))"]),
          reponses: [
            { question: "a)", attendu: "1,188" },
            { question: "b)", attendu: "0" },
          ],
          correction:
            "a) $1 \\times 1{,}1 = 1{,}1$, puis $1{,}1 \\times 0{,}9 = 0{,}99$, puis $0{,}99 \\times 1{,}2 = 1{,}188$.\nb) Si s part de 0, chaque produit vaut 0 : le programme affiche 0.\n⛔ Le piège : partir de 0 par réflexe, comme pour une somme. Un produit part de 1.\nRéponse : a) 1,188 ; b) 0.",
          micros: ["algo_accumulateur"],
        },
        {
          enonce:
            "Une biologiste étudie une graine qui germe avec la probabilité 0,8 (modèle). Elle simule une graine avec ce programme.\na) Écris la condition à mettre à la place de ??? (elle commence par r).\nb) Quelle est la probabilité que la graine ne germe pas ?",
          figure: programme(["from random import random", "r = random()", "if ???:", "    print('germe')", "else:", "    print('ne germe pas')"]),
          reponses: [
            { question: "a)", attendu: ["r < 0,8", "r <= 0,8", "r ≤ 0,8", "r > 0,2", "r >= 0,2", "r ≥ 0,2"], exact: true },
            { question: "b)", attendu: "0,2" },
          ],
          correction:
            "a) Le succès doit avoir la probabilité 0,8 : on garde l'intervalle de 0 à 0,8, de longueur 0,8. La condition est r < 0,8. (r > 0,2 convient aussi : cet intervalle a la même longueur.)\nb) $1 - 0{,}8 = 0{,}2$.\n⛔ Le piège au a) : écrire r > 0,8. Cet intervalle a une longueur de 0,2 seulement : la graine ne germerait qu'une fois sur cinq.\nRéponse : a) r < 0,8 ; b) 0,2.",
          micros: ["algo_aleatoire"],
        },
        {
          enonce:
            "Un entraîneur de basket simule 50 lancers francs d'un joueur qui en réussit 60 % (modèle).\na) Que représente le nombre affiché ? Réponds par la lettre.\nA : la probabilité de réussite. B : le nombre de lancers réussis. C : la fréquence de réussite.\nb) Quelle valeur le nombre affiché a-t-il en moyenne ?\nc) Par quel nombre faut-il diviser s pour obtenir la fréquence ?\nd) Deux exécutions donnent-elles toujours le même nombre ? Réponds oui ou non.",
          figure: programme(["from random import random", "s = 0", "for i in range(50):", "    if random() < 0.6:", "        s = s + 1", "print(s)"]),
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) s gagne 1 à chaque lancer réussi : c'est le nombre de lancers réussis.\nb) En moyenne : $50 \\times 0{,}6 = 30$.\nc) La fréquence, c'est le nombre de succès divisé par le nombre de lancers : on divise par 50.\nd) Non : le hasard change à chaque exécution, c'est la fluctuation.\n⛔ Le piège au a) : répondre C. Le programme affiche un effectif, il manque la division pour avoir une fréquence.\nRéponse : a) B ; b) 30 ; c) 50 ; d) non.",
          micros: ["algo_aleatoire"],
        },
        {
          enonce:
            "Un programmateur de cinéma relève les entrées de quatre séances (modèle).\na) Que vaut t à la fin ?\nb) Que vaut c à la fin ?\nc) Qu'affiche le programme ?",
          figure: programme(["e = [120, 80, 200, 40]", "t = 0", "c = 0", "for v in e:", "    t = t + v", "    c = c + 1", "print(t / c)"]),
          reponses: [
            { question: "a)", attendu: "440" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "110" },
          ],
          correction:
            "On suit les deux variables dans le tableau.\na) t est l'accumulateur : $120 + 80 + 200 + 40 = 440$.\nb) c est le compteur : il y a 4 séances.\nc) $440 \\div 4 = 110$ : le nombre moyen d'entrées par séance.\n⛔ Le piège : confondre les deux variables. t reçoit la valeur lue, c reçoit 1.\nRéponse : a) 440 ; b) 4 ; c) 110.",
          schema: trace(["v", "t", "c"], [[120, 120, 1], [80, 200, 2], [200, 400, 3], [40, 440, 4]]),
          micros: ["algo_compteur", "algo_accumulateur"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un programme, plusieurs variables : on les suit toutes, puis on interprète le résultat.",
      rappel: [
        "Pour ne pas se perdre : un tableau, une colonne par variable, une ligne par tour.",
        "Pour échanger deux variables, il faut une troisième variable qui garde une valeur de côté.",
        "Un programme donne un nombre : il reste à dire ce qu'il veut dire dans la situation.",
      ],
      exercices: [
        {
          titre: "La billetterie du festival",
          enonce:
            "Une billetterie de festival enregistre le prix de cinq billets vendus (modèle).\na) Que vaut total à la fin ?\nb) Que vaut n à la fin ?\nc) Quelle proportion des billets coûte plus de 20 € ?\nd) Quel est le prix moyen d'un billet ?",
          figure: programme(["prix = [12, 25, 12, 40, 25]", "total = 0", "n = 0", "for p in prix:", "    total = total + p", "    if p > 20:", "        n = n + 1", "print(total, n)"]),
          reponses: [
            { question: "a)", attendu: "114" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "60 %" },
            { question: "d)", attendu: "22,8 €" },
          ],
          correction:
            "a) total additionne les cinq prix : $12 + 25 + 12 + 40 + 25 = 114$.\nb) n compte les prix au-dessus de 20 : 25, 40 et 25, donc 3.\nc) 3 billets sur 5 : $3 \\div 5 = 0{,}6$, soit 60 %.\nd) $114 \\div 5 = 22{,}8$ €.\n⛔ Le piège au b) : ne compter qu'une fois le 25. Le programme lit chaque billet, même si le prix se répète.\nRéponse : a) 114 ; b) 3 ; c) 60 % ; d) 22,8 €.",
          schema: trace(["p", "total", "n"], [[12, 12, 0], [25, 37, 1], [12, 49, 1], [40, 89, 2], [25, 114, 3]]),
          micros: ["algo_compteur", "algo_accumulateur"],
        },
        {
          titre: "L'échange des deux entrepôts",
          enonce:
            "Un logisticien échange les stocks de deux entrepôts dans son fichier. Il a ajouté une variable z.\na) Que vaut z à la fin ?\nb) Qu'affiche le programme ? Écris les deux nombres dans l'ordre.\nc) On supprime les lignes z = x et y = z, et on écrit y = x après x = y. Qu'affiche-t-il alors ? Écris les deux nombres dans l'ordre.",
          figure: programme(["x = 30", "y = 70", "z = x", "x = y", "y = z", "print(x, y)"]),
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "70 ; 30", ordre: true },
            { question: "c)", attendu: "70 ; 70", ordre: true },
          ],
          correction:
            "a) z reçoit la valeur de x au moment de la ligne 3 : 30. Elle ne change plus ensuite.\nb) x reçoit 70, puis y reçoit z, soit 30. L'échange a réussi : 70 ; 30.\nc) Sans z : x reçoit 70, et le 30 est perdu. Puis y reçoit x, soit 70. On obtient 70 ; 70.\n⛔ Le piège au a) : croire que z suit x. Une affectation copie la valeur du moment, une seule fois.\nRéponse : a) 30 ; b) 70 ; 30 ; c) 70 ; 70.",
          micros: ["algo_affectation"],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Une installatrice relève la production de panneaux solaires sur six jours, en kWh (modèle). Elle compte aussi les bons jours : ceux à 6 kWh ou plus.\na) Que vaut s à la fin ?\nb) Que vaut c à la fin ?\nc) Quelle est la production moyenne par jour ?\nd) Quel pourcentage des jours sont de bons jours ?",
          figure: programme(["prod = [3, 5, 8, 9, 6, 2]", "s = 0", "c = 0", "for v in prod:", "    s = s + v", "    if v >= 6:", "        c = c + 1", "print(s, c)"]),
          reponses: [
            { question: "a)", attendu: "33" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "5,5 kWh" },
            { question: "d)", attendu: "50 %" },
          ],
          correction:
            "a) $3 + 5 + 8 + 9 + 6 + 2 = 33$.\nb) Les jours à 6 kWh ou plus : 8, 9 et 6. Donc c vaut 3.\nc) $33 \\div 6 = 5{,}5$ kWh par jour.\nd) 3 jours sur 6 : $3 \\div 6 = 0{,}5$, soit 50 %.\n⛔ Le piège au b) : oublier le 6. Le signe >= garde l'égalité.\nRéponse : a) 33 ; b) 3 ; c) 5,5 kWh ; d) 50 %.",
          micros: ["algo_compteur", "algo_accumulateur"],
        },
        {
          titre: "L'enquête simulée",
          enonce:
            "Une épidémiologiste simule une enquête auprès de 200 personnes. Dans sa population modèle, 25 % des personnes sont vaccinées.\na) Écris le nombre à placer à la place de ???.\nb) Quelle valeur la variable s prend-elle en moyenne ?\nc) Une exécution donne s = 46. Quelle est la fréquence observée ?\nd) Cet écart avec la probabilité prouve-t-il que le programme est faux ? Réponds oui ou non.",
          figure: programme(["from random import random", "s = 0", "for i in range(200):", "    if random() < ???:", "        s = s + 1", "print(s)"]),
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "0,23" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) La probabilité d'être vacciné est 25 %, soit 0,25.\nb) En moyenne : $200 \\times 0{,}25 = 50$.\nc) $46 \\div 200 = 0{,}23$.\nd) Non : 0,23 est proche de 0,25. D'une exécution à l'autre, la fréquence fluctue autour de la probabilité.\n⛔ Le piège au d) : attendre exactement 50 à chaque exécution. La moyenne n'est pas une promesse pour chaque essai.\nRéponse : a) 0,25 ; b) 50 ; c) 0,23 ; d) non.",
          micros: ["algo_aleatoire"],
        },
      ],
    },
  ],
};
