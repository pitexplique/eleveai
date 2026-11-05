// ─── Fiche d'exercices : deux épreuves indépendantes (STMG) — 20 exercices ──────
//
// Notion proba_epreuves_independantes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// Le coach demande : l'arbre où le second niveau porte les MÊMES probabilités ;
// un chemin = le produit de ses branches ; « aucun », « les deux », « exactement
// une fois » ; la répétition d'une épreuve (n ≤ 4) et « au moins une fois »
// = 1 − (1 − p)^n ; avec remise (indépendant), sans remise (le second tirage change).
//
// ⛔ Le dessin `arbre` ne trace que deux niveaux de branches : pour n = 3 ou 4, la
// feuille raisonne sur le nombre de chemins (2 × 2 × 2…) et sur les produits, sans
// dessin à trois niveaux.
//
// Aucune donnée réelle : toutes les probabilités sont des modèles.
//
// Domaines et métiers : javelot (athlète), ferry (capitaine), laboratoire (laborantine),
// jeu de société (animatrice), sondage (enquêtrice), pile ou face (arbitre),
// loto de quartier, entrepôt (magasinier) ; feux tricolores (ambulancier), tennis
// (joueuse), pêche (pêcheur), vaccins (pharmacien), parachutisme (monitrice),
// fléchettes (joueur), médiathèque (médiathécaire), transports (urbaniste) ;
// sauvegarde informatique (technicienne), tir à l'arc (archère), tombola
// (organisateur), météo d'un séjour (guide).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaI_arbre_deux_epreuves (1, 3, 4, 9, 15), probaI_produit
// (1, 2, 6, 9, 10, 12, 15, 16), probaI_bernoulli_repetition (5, 6, 11, 13, 14, 17,
// 18, 20), probaI_avec_sans_remise (7, 8, 12, 15, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";

export const exercicesProbaEpreuvesIndependantesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-epreuves-independantes",
  titre: "Deux épreuves indépendantes",
  accroche:
    "Vingt exercices sur les expériences qui se répètent sans se souvenir du passé : dessiner l'arbre, multiplier le long d'un chemin, calculer « au moins une fois » par le contraire, et voir ce que change un tirage sans remise. Un tir à l'arc, des feux tricolores, une sauvegarde informatique, une tombola, trois jours de randonnée. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire l'arbre, multiplier, compter les chemins.",
      rappel: [
        "Deux épreuves sont indépendantes si le résultat de la première ne change rien à la seconde. Le second niveau de l'arbre porte alors les mêmes probabilités des deux côtés.",
        "Les branches qui partent d'un même point ont une somme égale à 1.",
        "La probabilité d'un chemin est le produit des probabilités de ses branches.",
        "Avec remise, le stock ne change pas : les tirages sont indépendants. Sans remise, le stock change : ils ne le sont pas.",
      ],
      exercices: [
        {
          enonce:
            "Une lanceuse de javelot réussit un lancer avec la probabilité 0,6. Ses deux lancers sont indépendants. Quelle est la probabilité qu'elle réussisse les deux ?",
          figure: arbre([
            { label: "Réussi", proba: "0,6", enfants: [{ label: "Réussi", proba: "0,6" }, { label: "Raté", proba: "0,4" }] },
            { label: "Raté", proba: "0,4", enfants: [{ label: "Réussi", proba: "0,6" }, { label: "Raté", proba: "0,4" }] },
          ]),
          reponses: [{ attendu: "0,36" }],
          correction:
            "On suit le chemin « Réussi puis Réussi » sur l'arbre.\nOn multiplie ses deux branches : $0{,}6 \\times 0{,}6 = 0{,}36$.\n⛔ Le piège : additionner ($0{,}6 + 0{,}6 = 1{,}2$). Une probabilité ne dépasse jamais 1.\nRéponse : 0,36.",
          micros: ["probaI_arbre_deux_epreuves", "probaI_produit"],
        },
        {
          enonce:
            "Une capitaine fait deux traversées en ferry. À chaque traversée, indépendamment, la probabilité de retard est 0,3. Quelle est la probabilité de n'avoir AUCUN retard ?",
          reponses: [{ attendu: "0,49" }],
          correction:
            "Pas de retard à une traversée : $1 - 0{,}3 = 0{,}7$.\nAucun retard sur les deux : $0{,}7 \\times 0{,}7 = 0{,}49$.\n⛔ Le piège : calculer $1 - 0{,}3 \\times 0{,}3 = 0{,}91$. Ce nombre est la probabilité de ne pas avoir deux retards, ce n'est pas la question.\nRéponse : 0,49.",
          micros: ["probaI_produit"],
        },
        {
          enonce:
            "Une laborantine répète deux fois un essai : les deux essais sont indépendants. Quelle probabilité porte la branche marquée « ? » ?",
          figure: arbre([
            { label: "Oui", proba: "0,8", enfants: [{ label: "Oui", proba: "0,8" }, { label: "Non", proba: "?" }] },
            { label: "Non", proba: "…", enfants: [{ label: "Oui", proba: "0,8" }, { label: "Non", proba: "…" }] },
          ]),
          reponses: [{ attendu: "0,2" }],
          correction:
            "Les deux branches qui partent d'un même point ont une somme égale à 1.\n$1 - 0{,}8 = 0{,}2$.\nC'est aussi la valeur portée par la même issue de l'autre côté, car les épreuves sont indépendantes.\n⛔ Le piège : y mettre le produit $0{,}8 \\times 0{,}2$. Une branche porte une probabilité, le produit se fait le long du chemin.\nRéponse : 0,2.",
          micros: ["probaI_arbre_deux_epreuves"],
        },
        {
          enonce:
            "Une animatrice de jeux fait tourner deux fois une roue. Le secteur doré sort avec la probabilité 0,4, à chaque tour, indépendamment. Le premier tour a donné le doré. Quelle est la probabilité que le second donne le doré ?",
          reponses: [{ attendu: "0,4" }],
          correction:
            "La roue ne se souvient pas du premier tour : les épreuves sont indépendantes.\nLa probabilité reste la même : 0,4.\n⛔ Le piège : croire que le doré devient plus rare après être sorti, ou calculer $0{,}4 \\times 0{,}4$. Le premier résultat est déjà connu.\nRéponse : 0,4.",
          micros: ["probaI_arbre_deux_epreuves"],
        },
        {
          enonce:
            "Une enquêtrice interroge 3 personnes l'une après l'autre. Pour chacune, deux issues : oui ou non. Combien l'arbre complet a-t-il de chemins ?",
          reponses: [{ attendu: "8" }],
          correction:
            "Chaque personne double le nombre de chemins.\n$2 \\times 2 \\times 2 = 8$ chemins.\n⛔ Le piège : répondre 6 ($2 \\times 3$). À chaque niveau, chaque branche se sépare en deux : on multiplie.\nRéponse : 8.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          enonce:
            "Un arbitre lance 3 fois une pièce équilibrée. Quelle est la probabilité d'obtenir Pile les 3 fois ?",
          reponses: [{ attendu: "0,125" }],
          correction:
            "Les trois lancers sont indépendants, chacun donne Pile avec la probabilité 0,5.\nOn multiplie les trois branches : $0{,}5 \\times 0{,}5 \\times 0{,}5 = 0{,}125$.\n⛔ Le piège : calculer $0{,}5 \\times 3 = 1{,}5$. On multiplie les probabilités entre elles, pas par le nombre de lancers.\nRéponse : 0,125.",
          micros: ["probaI_produit", "probaI_bernoulli_repetition"],
        },
        {
          enonce:
            "Au loto du quartier, on tire un jeton dans un sac, on le note, on le REMET dans le sac, puis on tire un second jeton. Les deux tirages sont-ils indépendants ? Réponds oui ou non.",
          reponses: [{ attendu: "oui" }],
          correction:
            "Le jeton est remis : le sac est identique au second tirage.\nLe premier résultat ne change donc rien au second : les tirages sont indépendants.\n⛔ Le piège : penser que deux tirages à la suite dépendent forcément l'un de l'autre. Tout dépend de la remise.\nRéponse : oui.",
          micros: ["probaI_avec_sans_remise"],
        },
        {
          enonce:
            "Un magasinier a un carton de 10 pièces, dont 3 défectueuses. Il en prend une au hasard, elle est défectueuse, et il ne la remet pas. Il en prend une autre au hasard. Quelle est la probabilité qu'elle soit défectueuse ? Donne une fraction.",
          reponses: [{ attendu: "2/9" }],
          correction:
            "Il reste 9 pièces dans le carton.\nIl reste 2 pièces défectueuses, puisqu'une est partie.\nLa probabilité est $\\dfrac{2}{9}$, soit 2/9.\n⛔ Le piège : garder $\\dfrac{3}{10}$. Sans remise, le stock a changé.\nRéponse : 2/9.",
          micros: ["probaI_avec_sans_remise"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un arbre en tête, plusieurs chemins : on repère ceux qui répondent à la question.",
      rappel: [
        "Plusieurs chemins répondent à la question : on calcule chacun, puis on additionne.",
        "« Au moins une fois » : on passe par le contraire, « aucune fois ». Avec n épreuves : $1 - (1 - p)^n$.",
        "Sans remise, on réécrit la fraction à chaque tirage : le total baisse de 1, et le nombre d'objets concernés aussi s'il vient d'en sortir un.",
      ],
      exercices: [
        {
          enonce:
            "Un ambulancier passe deux feux éloignés l'un de l'autre : ils sont indépendants. Chaque feu est vert avec la probabilité 0,4.\na) Quelle est la probabilité que les deux soient verts ?\nb) Quelle est la probabilité qu'aucun ne soit vert ?\nc) Quelle est la probabilité qu'un seul des deux soit vert ?",
          reponses: [
            { question: "a)", attendu: "0,16" },
            { question: "b)", attendu: "0,36" },
            { question: "c)", attendu: "0,48" },
          ],
          correction:
            "Pas vert : $1 - 0{,}4 = 0{,}6$.\na) $0{,}4 \\times 0{,}4 = 0{,}16$.\nb) $0{,}6 \\times 0{,}6 = 0{,}36$.\nc) Deux chemins : vert puis pas vert, et pas vert puis vert. $0{,}4 \\times 0{,}6 + 0{,}6 \\times 0{,}4 = 0{,}24 + 0{,}24 = 0{,}48$.\nVérification : $0{,}16 + 0{,}36 + 0{,}48 = 1$. ✔\n⛔ Le piège au c) : ne compter qu'un chemin (0,24). L'ordre peut être l'un ou l'autre.\nRéponse : a) 0,16 ; b) 0,36 ; c) 0,48.",
          schema: arbre([
            { label: "Vert", proba: "0,4", enfants: [{ label: "Vert", proba: "0,4" }, { label: "Autre", proba: "0,6" }] },
            { label: "Autre", proba: "0,6", enfants: [{ label: "Vert", proba: "0,4" }, { label: "Autre", proba: "0,6" }] },
          ]),
          micros: ["probaI_arbre_deux_epreuves", "probaI_produit"],
        },
        {
          enonce:
            "Une joueuse de tennis passe sa première balle avec la probabilité 0,8, à chaque point, indépendamment. On regarde deux points.\na) Quelle est la probabilité qu'elle la passe seulement au premier point ?\nb) Quelle est la probabilité qu'elle la passe exactement une fois sur les deux points ?",
          reponses: [
            { question: "a)", attendu: "0,16" },
            { question: "b)", attendu: "0,32" },
          ],
          correction:
            "Rater : $1 - 0{,}8 = 0{,}2$.\na) Passée puis ratée : $0{,}8 \\times 0{,}2 = 0{,}16$.\nb) Deux chemins : passée puis ratée, ratée puis passée. $0{,}16 + 0{,}16 = 0{,}32$.\n⛔ Le piège au b) : s'arrêter à 0,16. « Exactement une fois » ne dit pas laquelle.\nRéponse : a) 0,16 ; b) 0,32.",
          micros: ["probaI_produit"],
        },
        {
          enonce:
            "Un pêcheur remonte 3 casiers. Chacun, indépendamment, contient un homard avec la probabilité 0,2.\na) Quelle est la probabilité qu'aucun casier n'en contienne ?\nb) Quelle est la probabilité qu'au moins un casier en contienne ?",
          reponses: [
            { question: "a)", attendu: "0,512" },
            { question: "b)", attendu: "0,488" },
          ],
          correction:
            "Casier vide : $1 - 0{,}2 = 0{,}8$.\na) $0{,}8 \\times 0{,}8 \\times 0{,}8 = 0{,}512$.\nb) « Au moins un » est le contraire de « aucun » : $1 - 0{,}512 = 0{,}488$.\n⛔ Le piège au b) : additionner $0{,}2 + 0{,}2 + 0{,}2 = 0{,}6$. Ces trois évènements peuvent arriver ensemble : on ne les additionne pas.\nRéponse : a) 0,512 ; b) 0,488.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          enonce:
            "Un pharmacien contrôle des boîtes de vaccins. Un lot contient 20 boîtes, dont 4 sont abîmées. Il en prélève deux au hasard, l'une après l'autre.\na) Avec remise, quelle est la probabilité que les deux soient abîmées ?\nb) Sans remise, quelle est cette probabilité ? Arrondis au millième.",
          reponses: [
            { question: "a)", attendu: "0,04" },
            { question: "b)", attendu: "0,032", tolerance: 0.0005 },
          ],
          correction:
            "a) Avec remise : $\\dfrac{4}{20} \\times \\dfrac{4}{20} = 0{,}2 \\times 0{,}2 = 0{,}04$.\nb) Sans remise, le second tirage se fait parmi 19 boîtes, dont 3 abîmées : $\\dfrac{4}{20} \\times \\dfrac{3}{19} \\approx 0{,}032$.\n⛔ Le piège au b) : garder $\\dfrac{4}{20}$ au second tirage. Une boîte abîmée est déjà sortie.\nRéponse : a) 0,04 ; b) 0,032.",
          micros: ["probaI_produit", "probaI_avec_sans_remise"],
        },
        {
          enonce:
            "Une monitrice de parachutisme vérifie 4 sangles. Chacune, indépendamment, est bien réglée avec la probabilité 0,9.\na) Combien l'arbre a-t-il de chemins ?\nb) Quelle est la probabilité que les 4 sangles soient bien réglées ?\nc) Quelle est la probabilité qu'au moins une sangle soit mal réglée ?",
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "0,6561" },
            { question: "c)", attendu: "0,3439" },
          ],
          correction:
            "a) $2 \\times 2 \\times 2 \\times 2 = 16$ chemins.\nb) $0{,}9 \\times 0{,}9 \\times 0{,}9 \\times 0{,}9 = 0{,}6561$.\nc) C'est le contraire du b) : $1 - 0{,}6561 = 0{,}3439$.\n⛔ Le piège au c) : calculer $0{,}1 \\times 4 = 0{,}4$. « Au moins une » se calcule par le contraire.\nRéponse : a) 16 ; b) 0,6561 ; c) 0,3439.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          enonce:
            "Un joueur lance 2 fléchettes. Chacune, indépendamment, atteint la cible avec la probabilité 0,3. Pour la probabilité d'atteindre la cible au moins une fois, il écrit $1 - 0{,}7^2$.\na) Que vaut $0{,}7^2$ ?\nb) Ce nombre est la probabilité que combien de fléchettes atteignent la cible ? Écris « aucune » ou « les deux ».\nc) Quelle est la probabilité d'atteindre la cible au moins une fois ?",
          reponses: [
            { question: "a)", attendu: "0,49" },
            { question: "b)", attendu: ["aucune", "aucun", "aucune fléchette", "0"] },
            { question: "c)", attendu: "0,51" },
          ],
          correction:
            "a) $0{,}7 \\times 0{,}7 = 0{,}49$.\nb) 0,7 est la probabilité de rater : $0{,}7^2$ est la probabilité de rater les deux fois. Aucune fléchette n'atteint la cible.\nc) $1 - 0{,}49 = 0{,}51$.\n⛔ Le piège au b) : lire les deux réussites. Celle-là vaut $0{,}3 \\times 0{,}3 = 0{,}09$.\nRéponse : a) 0,49 ; b) aucune ; c) 0,51.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          enonce:
            "Une médiathécaire tire au sort, l'un après l'autre et sans remise, 2 livres dans une caisse de 10 livres, dont 4 sont des romans.\na) Le premier est un roman. Quelle est la probabilité que le second en soit un ? Donne une fraction irréductible.\nb) Le premier n'est pas un roman. Quelle est la probabilité que le second en soit un ? Donne une fraction irréductible.\nc) Quelle est la probabilité que les deux soient des romans ? Donne une fraction irréductible.",
          reponses: [
            { question: "a)", attendu: "1/3", exact: true },
            { question: "b)", attendu: "4/9", exact: true },
            { question: "c)", attendu: "2/15", exact: true },
          ],
          correction:
            "a) Il reste 9 livres, dont 3 romans : $\\dfrac{3}{9} = \\dfrac{1}{3}$, soit 1/3.\nb) Il reste 9 livres, dont encore 4 romans : $\\dfrac{4}{9}$, soit 4/9.\nc) On multiplie le long du chemin : $\\dfrac{4}{10} \\times \\dfrac{1}{3} = \\dfrac{4}{30} = \\dfrac{2}{15}$, soit 2/15.\n⛔ Le piège : voir que a) et b) ne sont pas égaux et penser à une erreur. Sans remise, le second niveau change d'une branche à l'autre : les tirages ne sont pas indépendants.\nRéponse : a) 1/3 ; b) 4/9 ; c) 2/15.",
          schema: arbre([
            { label: "Roman", proba: "4/10", enfants: [{ label: "Roman", proba: "3/9" }, { label: "Autre", proba: "6/9" }] },
            { label: "Autre", proba: "6/10", enfants: [{ label: "Roman", proba: "4/9" }, { label: "Autre", proba: "5/9" }] },
          ]),
          micros: ["probaI_arbre_deux_epreuves", "probaI_produit", "probaI_avec_sans_remise"],
        },
        {
          enonce:
            "Une urbaniste suit un trajet avec un train puis un bus, indépendants. Le train est à l'heure avec la probabilité 0,9, le bus avec la probabilité 0,8.\na) Quelle est la probabilité que les deux soient à l'heure ?\nb) Quelle est la probabilité qu'au moins l'un des deux soit en retard ?",
          reponses: [
            { question: "a)", attendu: "0,72" },
            { question: "b)", attendu: "0,28" },
          ],
          correction:
            "a) Épreuves indépendantes : on multiplie. $0{,}9 \\times 0{,}8 = 0{,}72$.\nb) C'est le contraire de « les deux à l'heure » : $1 - 0{,}72 = 0{,}28$.\n⛔ Le piège au b) : additionner les retards, $0{,}1 + 0{,}2 = 0{,}3$. On compterait deux fois le cas où les deux sont en retard.\nRéponse : a) 0,72 ; b) 0,28.",
          micros: ["probaI_produit"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs épreuves : on décide d'abord s'il y a indépendance, puis on multiplie ou on passe par le contraire.",
      rappel: [
        "On commence par se demander : le résultat d'avant change-t-il le suivant ?",
        "« Toutes » et « aucune » : un seul chemin, un produit. « Au moins une » : le contraire de « aucune ».",
        "Sans remise, chaque fraction se réécrit : le stock a baissé.",
      ],
      exercices: [
        {
          titre: "Les trois disques",
          enonce:
            "Une technicienne sauvegarde des données sur 3 disques indépendants (modèle). Chacun tombe en panne dans l'année avec la probabilité 0,1.\na) Quelle est la probabilité que les 3 disques tombent en panne ?\nb) Quelle est la probabilité qu'au moins un disque continue à fonctionner ?\nc) Quelle est la probabilité qu'aucun disque ne tombe en panne ?",
          reponses: [
            { question: "a)", attendu: "0,001" },
            { question: "b)", attendu: "0,999" },
            { question: "c)", attendu: "0,729" },
          ],
          correction:
            "a) $0{,}1 \\times 0{,}1 \\times 0{,}1 = 0{,}001$.\nb) « Au moins un fonctionne » est le contraire de « tous en panne » : $1 - 0{,}001 = 0{,}999$.\nc) Un disque ne tombe pas en panne avec la probabilité 0,9. $0{,}9 \\times 0{,}9 \\times 0{,}9 = 0{,}729$.\n⛔ Le piège : confondre b) et c). « Au moins un marche » accepte une ou deux pannes, « aucune panne » non.\nRéponse : a) 0,001 ; b) 0,999 ; c) 0,729.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          titre: "Quatre flèches",
          enonce:
            "Une archère tire 4 flèches. Chacune, indépendamment, touche la cible avec la probabilité 0,7 (modèle).\na) Combien l'arbre a-t-il de chemins ?\nb) Quelle est la probabilité que les 4 flèches touchent ?\nc) Quelle est la probabilité qu'aucune ne touche ?\nd) Quelle est la probabilité qu'au moins une touche ?",
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "0,2401" },
            { question: "c)", attendu: "0,0081" },
            { question: "d)", attendu: "0,9919" },
          ],
          correction:
            "a) $2 \\times 2 \\times 2 \\times 2 = 16$ chemins.\nb) $0{,}7 \\times 0{,}7 \\times 0{,}7 \\times 0{,}7 = 0{,}2401$.\nc) Rater : 0,3. $0{,}3 \\times 0{,}3 \\times 0{,}3 \\times 0{,}3 = 0{,}0081$.\nd) $1 - 0{,}0081 = 0{,}9919$.\n⛔ Le piège au d) : prendre le contraire du b), soit $1 - 0{,}2401$. Ce nombre répond à « au moins une flèche rate ».\nRéponse : a) 16 ; b) 0,2401 ; c) 0,0081 ; d) 0,9919.",
          micros: ["probaI_bernoulli_repetition"],
        },
        {
          titre: "La tombola",
          enonce:
            "Un organisateur vend 50 tickets, dont 5 gagnants. Une famille achète 2 tickets au hasard, forcément différents.\na) Ce choix de deux tickets se fait-il avec remise ? Réponds oui ou non.\nb) Quelle est la probabilité que les deux soient gagnants ? Arrondis au millième.\nc) Quelle est la probabilité qu'aucun ne soit gagnant ? Arrondis au millième.\nd) Quelle est la probabilité qu'au moins un soit gagnant ? Arrondis au millième.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "0,008", tolerance: 0.0005 },
            { question: "c)", attendu: "0,808", tolerance: 0.0005 },
            { question: "d)", attendu: "0,192", tolerance: 0.0005 },
          ],
          correction:
            "a) Un ticket vendu ne revient pas : non, c'est sans remise.\nb) $\\dfrac{5}{50} \\times \\dfrac{4}{49} \\approx 0{,}008$.\nc) Il y a 45 tickets perdants : $\\dfrac{45}{50} \\times \\dfrac{44}{49} \\approx 0{,}808$.\nd) $1 - 0{,}808 = 0{,}192$.\n⛔ Le piège au b) : calculer $0{,}1 \\times 0{,}1 = 0{,}01$. C'est le calcul avec remise.\nRéponse : a) non ; b) 0,008 ; c) 0,808 ; d) 0,192.",
          micros: ["probaI_avec_sans_remise"],
        },
        {
          titre: "Trois jours de randonnée",
          enonce:
            "Une guide prépare une randonnée de 3 jours dans les Alpes (modèle). Chaque jour, indépendamment, il pleut avec la probabilité 0,25. Sa brochure annonce : « 75 % de chances d'avoir trois jours sans pluie ».\na) Quelle est la probabilité qu'il ne pleuve aucun des trois jours ? Arrondis au millième.\nb) Quelle est la probabilité qu'il pleuve au moins un jour ? Arrondis au millième.\nc) La phrase de la brochure est-elle juste ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "0,422", tolerance: 0.0005 },
            { question: "b)", attendu: "0,578", tolerance: 0.0005 },
            { question: "c)", attendu: "faux" },
          ],
          correction:
            "Pas de pluie un jour donné : $1 - 0{,}25 = 0{,}75$.\na) $0{,}75 \\times 0{,}75 \\times 0{,}75 \\approx 0{,}422$.\nb) $1 - 0{,}422 = 0{,}578$.\nc) Faux : 75 %, c'est pour UN jour. Pour trois jours, la probabilité tombe à environ 42 %.\n⛔ Le piège : garder 0,75 pour tout le séjour. Chaque jour de plus est une branche de plus à multiplier.\nRéponse : a) 0,422 ; b) 0,578 ; c) faux.",
          micros: ["probaI_bernoulli_repetition"],
        },
      ],
    },
  ],
};
