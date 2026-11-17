// ─── Fiche d'exercices : résolution de problèmes (CE2) — 20 exercices ─────────
//
// 17/11/2026 : la feuille interactive de la notion `probleme` du coach CE2
// (« Résolution de problèmes », 10 micros). Sur la forme des feuilles du CM1
// et du CE1 (`maths-cm1-masse.tsx`, `maths-ce1-probleme.tsx`) : 8 ★, 8 ★★,
// 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne,
// étape par étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/probleme.bank.ts`) et sur les SIX
// types nommés par le programme : parties-tout en une étape, comparaison
// additive, deux étapes, multiplicatif, mixte en trois étapes, comparaison
// multiplicative (« fois plus », « fois moins ») et produit cartésien.
// ⛔ LIMITES DU CE2 : nombres jusqu'à 10 000, aucun résultat sous zéro, la
// division comme partage (« ÷ », sans division posée).
// ⛔ Aucune question à rédiger : QCM par lettre, vrai ou faux, un nombre seul.
// ⛔ 18 mots au plus par phrase.
//
// Les pièges nommés : prendre le mot « gagne » sans lire la question (1),
// soustraire au lieu d'ajouter les parts (2), ajouter le tout et la part (3),
// « de plus » qui fait soustraire (4), « en moins » qui fait ajouter (5),
// « 40 fois plus » = 50 + 40 (6), additionner 3 + 2 au lieu de faire les
// paires (7), ne pas estimer (8, 14), oublier la 2e vente (9), oublier un
// plateau (10), « fois moins » qui multiplie (11), oublier les desserts (12),
// lire le schéma à l'envers (13), 365 + 218 (15), payer 5 € pour tout le
// monde (16), oublier les dépenses (17), partager tous les livres (18),
// avancer au lieu de revenir en arrière (19), partager 50 en deux moitiés (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 4, 20), transport (2, 14),
// jardin botanique (3), verger (5), ferme (6), vêtements (7), fleuriste (9),
// boulangerie (10), animaux (11), cantine (12), club de foot (13), marché
// (15), piscine (16), kermesse (17), bibliothèque (18), énigme (19).
// Les métiers : fleuriste (9), boulangère (10), marchande (15),
// bibliothécaire (18), chauffeur de car (14).
// UN SEUL contexte réunionnais (15, le marché de Saint-Paul, MODÈLE).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : le schéma en barres (parties-tout, comparaison, parts) et
// le tableau des associations du produit cartésien (`schema`,
// `tableauAssociations` de `dessins-ce2-lotG.tsx`). Le nombre cherché est
// toujours un « ? » orange, jamais écrit.
//
// Micro-compétences (10/10) : ce2_probleme_choisir_operation (1, 16),
// ce2_probleme_une_etape (2, 3, 14), ce2_probleme_comparaison (4, 5, 15),
// ce2_probleme_deux_etapes (9, 10, 16, 20), ce2_probleme_trois_etapes (17,
// 18), ce2_probleme_comparaison_multiplicative (6, 11),
// ce2_probleme_produit_cartesien (7, 12), ce2_probleme_schema_barre (2, 3, 4,
// 13, 20), ce2_probleme_verifier (8, 14), ce2_probleme_defi (19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { schema, tableauAssociations } from "@/lib/fiches-exercices/dessins-ce2-lotG";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesProblemeCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "probleme",
  titre: "Résoudre des problèmes",
  accroche:
    "Vingt problèmes, du plus facile au défi. Choisir la bonne opération. Chercher le tout ou une partie. Comparer : « de plus », « de moins », « fois plus ». Compter toutes les tenues possibles. Vérifier qu'un résultat a du sens. Un bus, un verger, une fleuriste, une cantine, une kermesse et une énigme. Lis le rappel avant chaque niveau. Dessine un schéma au brouillon. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une opération par problème. J'écris la lettre ou le nombre seul.",
      rappel: [
        "Je lis la question : qu'est-ce que je cherche ?",
        "Je cherche le tout : j'ajoute les parts. Je cherche une part : j'enlève l'autre part au tout.",
        "Des groupes égaux : je multiplie. Un partage en parts égales : je divise (÷).",
      ],
      exercices: [
        {
          enonce: "Quelle opération faut-il faire ? Écris la lettre.\na) Zoé a 25 images. Elle en gagne 12. Combien en a-t-elle ? A) 25 − 12 B) 25 + 12 C) 25 × 12\nb) Il y a 4 boîtes de 6 œufs. Combien d'œufs ? A) 4 + 6 B) 6 − 4 C) 4 × 6\nc) 30 bonbons sont partagés entre 5 enfants. Combien chacun ? A) 30 ÷ 5 B) 30 − 5 C) 30 × 5",
          correction:
            "Je me demande à chaque fois ce qui se passe.\na) Zoé gagne des images : elle en a plus. J'ajoute : $25 + 12$. Réponse B.\nb) 4 boîtes de 6 : ce sont 4 groupes égaux. Je multiplie : $4 \\times 6$. Réponse C.\nc) On partage 30 en 5 parts égales. Je divise : $30 \\div 5$. Réponse A.\n⛔ Le piège : choisir l'opération à un seul mot. Je relis toute la phrase et la question.\nRéponse : a) B ; b) C ; c) A.",
          micros: ["ce2_probleme_choisir_operation"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["C"] },
            { question: "c)", attendu: ["A"] },
          ],
        },
        {
          enonce: "Dans un bus, il y a 47 adultes et 28 enfants.\nCombien de passagers y a-t-il dans le bus ?",
          figure: schema([{ nom: "", morceaux: [{ n: 47, texte: "47" }, { n: 28, texte: "28" }] }], "?"),
          correction:
            "Je cherche le tout : tous les passagers.\nLes deux parts sont les adultes et les enfants. J'ajoute.\n$47 + 28 = 75$.\nJe vérifie : $75 - 28 = 47$.\n⛔ Le piège : soustraire, $47 - 28$. Les enfants ne descendent pas : ils sont aussi dans le bus.\nRéponse : 75.",
          micros: ["ce2_probleme_une_etape", "ce2_probleme_schema_barre"],
          reponses: [{ attendu: "75" }],
        },
        {
          enonce: "Un jardin botanique a 350 arbres. 120 sont des palmiers.\nCombien d'arbres ne sont pas des palmiers ?",
          figure: schema([{ nom: "", morceaux: [{ n: 120, texte: "120" }, { n: 230, texte: "?" }] }], "350"),
          correction:
            "Je connais le tout (350) et une part (120). Je cherche l'autre part.\nJ'enlève la part connue au tout : $350 - 120 = 230$.\nJe vérifie : $120 + 230 = 350$.\n⛔ Le piège : ajouter, $350 + 120$. Les palmiers sont DÉJÀ comptés dans les 350 arbres.\nRéponse : 230.",
          micros: ["ce2_probleme_une_etape", "ce2_probleme_schema_barre"],
          reponses: [{ attendu: "230" }],
        },
        {
          enonce: "Nadia a 135 cartes. Sam a 40 cartes de plus que Nadia.\nCombien de cartes Sam a-t-il ?",
          figure: schema([
            { nom: "Nadia", morceaux: [{ n: 135, texte: "135" }] },
            { nom: "Sam", morceaux: [{ n: 135, texte: "135" }, { n: 40, texte: "40" }] },
          ]),
          correction:
            "Sam a autant que Nadia, et encore 40 de plus.\nJ'ajoute : $135 + 40 = 175$.\nLe schéma le montre : la barre de Sam est plus longue de 40.\n⛔ Le piège : soustraire parce qu'on compare. « De plus » : Sam en a PLUS que Nadia.\nRéponse : 175.",
          micros: ["ce2_probleme_comparaison", "ce2_probleme_schema_barre"],
          reponses: [{ attendu: "175" }],
        },
        {
          enonce: "Dans un verger, un pommier a donné 280 pommes. Un poirier a donné 190 poires.\nCombien de fruits le poirier a-t-il donnés de moins que le pommier ?",
          figure: schema([
            { nom: "pommier", morceaux: [{ n: 280, texte: "280" }] },
            { nom: "poirier", morceaux: [{ n: 190, texte: "190" }, { n: 90, texte: "?" }] },
          ]),
          correction:
            "Je compare deux quantités : je cherche l'écart.\nJ'enlève la plus petite à la plus grande : $280 - 190 = 90$.\nJe vérifie : $190 + 90 = 280$.\n⛔ Le piège : ajouter, $280 + 190$. On ne cherche pas tous les fruits : on cherche la DIFFÉRENCE.\nRéponse : 90.",
          micros: ["ce2_probleme_comparaison"],
          reponses: [{ attendu: "90" }],
        },
        {
          enonce: "À la ferme, un poussin pèse 50 g. Sa maman poule pèse 40 fois plus.\na) Combien pèse la poule, en grammes ?\nb) Écris cette masse en kilogrammes.",
          correction:
            "a) « 40 fois plus » : je multiplie par 40.\n$50 \\times 40 = 2\\,000$ g. (5 × 4 = 20, et j'ajoute les deux zéros.)\nb) $1\\,000$ g = 1 kg. Donc $2\\,000$ g = 2 kg.\n⛔ Le piège : calculer $50 + 40 = 90$ g. « Fois plus », c'est une multiplication.\nRéponse : a) $2\\,000$ ; b) 2.",
          micros: ["ce2_probleme_comparaison_multiplicative"],
          reponses: [
            { question: "a)", attendu: "2000", unite: "g" },
            { question: "b)", attendu: "2", unite: "kg" },
          ],
        },
        {
          enonce: "Pour le sport, Rayan a 3 T-shirts : rouge, bleu, vert.\nIl a 2 shorts : noir et blanc.\nCombien de tenues différentes peut-il faire avec un T-shirt et un short ?",
          figure: tableauAssociations(["rouge", "bleu", "vert"], ["noir", "blanc"]),
          correction:
            "Chaque T-shirt va avec chaque short. Le tableau montre une case par tenue.\nAvec le T-shirt rouge : 2 tenues (short noir, short blanc). Pareil pour le bleu et le vert.\n3 T-shirts, 2 tenues chacun : $3 \\times 2 = 6$ tenues.\n⛔ Le piège : ajouter, $3 + 2 = 5$. Il faut compter les PAIRES, une par case du tableau.\nRéponse : 6.",
          micros: ["ce2_probleme_produit_cartesien"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Ces résultats sont-ils possibles ? Écris A (oui) ou B (non).\na) Tom calcule 198 + 205. Il trouve 4 030.\nb) Lina calcule 512 − 98. Elle trouve 414.\nc) Léo dit : « 6 paquets de 10 images, ça fait 16 images. »",
          correction:
            "J'estime avec des nombres ronds.\na) 198, c'est presque 200. 205, presque 200. $200 + 200 = 400$. 4 030 est bien trop grand. Réponse B.\nb) 512 − 98, c'est presque $512 - 100 = 412$. 414 est tout près. Je vérifie : $414 + 98 = 512$. Réponse A.\nc) 6 paquets de 10 : $6 \\times 10 = 60$. 16, c'est 6 + 10 : Léo a ajouté. Réponse B.\n⛔ Le piège : ne pas regarder si le résultat a du sens. Un calcul rapide en nombres ronds suffit.\nRéponse : a) B ; b) A ; c) B.",
          micros: ["ce2_probleme_verifier"],
          reponses: [
            { question: "a)", attendu: ["B", "non"] },
            { question: "b)", attendu: ["A", "oui"] },
            { question: "c)", attendu: ["B", "non"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. J'écris chaque calcul, l'un après l'autre.",
      rappel: [
        "Un problème à deux étapes : je cherche d'abord un résultat caché, puis la réponse.",
        "« 4 fois plus » : je multiplie par 4. « 3 fois moins » : je divise par 3.",
        "À la fin, je vérifie que la réponse a du sens.",
      ],
      exercices: [
        {
          enonce: "Une fleuriste a 120 roses.\nElle vend 45 roses le matin et 38 roses l'après-midi.\nCombien de roses lui reste-t-il le soir ?",
          correction:
            "Étape 1 : les roses vendues. $45 + 38 = 83$ roses.\nÉtape 2 : les roses qui restent. $120 - 83 = 37$ roses.\nJe vérifie : $37 + 83 = 120$.\n⛔ Le piège : enlever seulement la vente du matin, $120 - 45 = 75$. Elle vend aussi l'après-midi.\nRéponse : 37.",
          micros: ["ce2_probleme_deux_etapes"],
          reponses: [{ attendu: "37" }],
        },
        {
          enonce: "Une boulangère fait 6 plateaux de 25 croissants.\nDans la journée, elle vend 130 croissants.\nCombien de croissants lui reste-t-il ?",
          correction:
            "Étape 1 : tous les croissants. $6 \\times 25 = 150$ croissants.\n(4 plateaux font 100, et 2 plateaux font 50.)\nÉtape 2 : ceux qui restent. $150 - 130 = 20$ croissants.\n⛔ Le piège : oublier des plateaux et ne compter que 25 croissants. Il y a 6 plateaux.\nRéponse : 20.",
          micros: ["ce2_probleme_deux_etapes"],
          reponses: [{ attendu: "20" }],
        },
        {
          enonce: "a) Le ruban de Sara mesure 12 cm. Celui de Noé est 4 fois plus long.\nCombien mesure le ruban de Noé, en cm ?\nb) Un chien mange 600 g de croquettes par jour. Le chat mange 3 fois moins.\nCombien de grammes mange le chat ?",
          correction:
            "a) « 4 fois plus long » : je multiplie par 4. $12 \\times 4 = 48$ cm.\nb) « 3 fois moins » : je partage en 3. $600 \\div 3 = 200$ g.\nJe vérifie : $3 \\times 200 = 600$.\n⛔ Le piège du b) : multiplier, $600 \\times 3$. « Fois moins » : le chat mange MOINS que le chien.\nRéponse : a) 48 ; b) 200.",
          micros: ["ce2_probleme_comparaison_multiplicative"],
          reponses: [
            { question: "a)", attendu: "48", unite: "cm" },
            { question: "b)", attendu: "200", unite: "g" },
          ],
        },
        {
          enonce: "À la cantine, il y a 3 entrées et 4 plats.\na) Combien de repas différents avec une entrée et un plat ?\nb) On ajoute 2 desserts. Combien de repas avec une entrée, un plat et un dessert ?",
          figure: tableauAssociations(["salade", "soupe", "melon"], ["poisson", "poulet", "pâtes", "riz"]),
          correction:
            "a) Chaque entrée va avec chaque plat : une case du tableau par repas.\n$3 \\times 4 = 12$ repas.\nb) Chacun des 12 repas peut finir par 2 desserts.\n$12 \\times 2 = 24$ repas.\n⛔ Le piège du b) : ajouter, $12 + 2 = 14$. Chaque repas se double : un avec le 1er dessert, un avec le 2e.\nRéponse : a) 12 ; b) 24.",
          micros: ["ce2_probleme_produit_cartesien"],
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "24" },
          ],
        },
        {
          enonce: "Un club de foot a 900 €. Il achète des maillots pour 350 €.\nRegarde le schéma.\na) Quel calcul faut-il faire ? A) 900 + 350 B) 900 − 350 C) 350 − 900\nb) Combien d'euros reste-t-il au club ?",
          figure: schema([{ nom: "", morceaux: [{ n: 350, texte: "350" }, { n: 550, texte: "?" }] }], "900"),
          correction:
            "a) Le schéma montre le tout (900) et une part (350). Le « ? » est l'autre part.\nPour trouver une part, j'enlève l'autre au tout : $900 - 350$. Réponse B.\nb) $900 - 350 = 550$ €.\nJe vérifie : $350 + 550 = 900$.\n⛔ Le piège du a) : choisir $350 - 900$. On enlève toujours le plus petit au plus grand.\nRéponse : a) B ; b) 550.",
          micros: ["ce2_probleme_schema_barre", "ce2_probleme_une_etape"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: "550" },
          ],
        },
        {
          enonce: "Un chauffeur de car emmène 48 enfants et 5 adultes au zoo.\nMme Ali dit : « Il y a 98 personnes dans le car. »\na) Vrai ou faux ?\nb) Combien de personnes y a-t-il dans le car ?",
          correction:
            "a) J'estime : 48, c'est presque 50. $50 + 5 = 55$. 98 est bien trop grand. Faux.\nb) Je calcule : $48 + 5 = 53$ personnes.\nMme Ali a sans doute ajouté 48 + 50 au lieu de 48 + 5.\n⛔ Le piège : croire un résultat sans le vérifier. Une estimation rapide suffit à voir l'erreur.\nRéponse : a) faux ; b) 53.",
          micros: ["ce2_probleme_verifier", "ce2_probleme_une_etape"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: "53" },
          ],
        },
        {
          enonce: "Au marché de Saint-Paul, une marchande vend 365 ananas le samedi.\nLe dimanche, elle en vend 218.\nCombien d'ananas a-t-elle vendus de moins le dimanche ?",
          correction:
            "Je compare les deux ventes : je cherche l'écart.\n$365 - 218 = 147$.\nJe vérifie : $218 + 147 = 365$.\n⛔ Le piège : ajouter, $365 + 218 = 583$. Ce serait toutes les ventes, pas la différence.\nRéponse : 147.",
          micros: ["ce2_probleme_comparaison"],
          reponses: [{ attendu: "147" }],
        },
        {
          enonce: "À la piscine, l'entrée coûte 5 € pour un adulte et 3 € pour un enfant.\nUne famille vient avec 2 adultes et 3 enfants.\nCombien paie la famille ?",
          correction:
            "Étape 1 : les adultes. $2 \\times 5 = 10$ €.\nÉtape 2 : les enfants. $3 \\times 3 = 9$ €.\nÉtape 3 : j'ajoute. $10 + 9 = 19$ €.\n⛔ Le piège : compter 5 personnes à 5 €, $5 \\times 5 = 25$ €. Les enfants paient moins cher.\nRéponse : 19.",
          micros: ["ce2_probleme_deux_etapes", "ce2_probleme_choisir_operation"],
          reponses: [{ attendu: "19", unite: "€" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche les étapes une par une, et j'écris chaque calcul.",
      rappel: [
        "Je réponds aux questions dans l'ordre : chaque réponse sert à la suivante.",
        "Je fais un schéma au brouillon pour voir le tout et les parts.",
        "Je vérifie avec l'opération inverse : $50 - 20 = 30$, car $30 + 20 = 50$.",
      ],
      exercices: [
        {
          titre: "La kermesse",
          enonce: "À la kermesse, la classe vend 85 gâteaux à 2 € et 40 boissons à 1 €.\nElle avait dépensé 60 € pour tout acheter.\na) Combien d'euros rapportent les gâteaux ?\nb) Combien d'euros rapportent les gâteaux et les boissons ?\nc) Combien d'euros la classe gagne-t-elle vraiment ?",
          correction:
            "a) 85 gâteaux à 2 € : $85 \\times 2 = 170$ €.\nb) Les boissons : $40 \\times 1 = 40$ €. En tout : $170 + 40 = 210$ €.\nc) J'enlève ce qui a été dépensé : $210 - 60 = 150$ €.\n⛔ Le piège du c) : répondre 210 €. La classe avait déjà payé 60 € : je les enlève.\nRéponse : a) 170 ; b) 210 ; c) 150.",
          micros: ["ce2_probleme_trois_etapes"],
          reponses: [
            { question: "a)", attendu: "170", unite: "€" },
            { question: "b)", attendu: "210", unite: "€" },
            { question: "c)", attendu: "150", unite: "€" },
          ],
        },
        {
          titre: "Les livres de la bibliothécaire",
          enonce: "Une bibliothécaire a déjà 380 livres. Elle reçoit 5 cartons de 24 livres.\na) Combien de livres reçoit-elle ?\nb) Combien de livres a-t-elle maintenant ?\nc) Elle range les livres reçus sur 6 étagères, autant sur chacune. Combien par étagère ?",
          correction:
            "a) 5 cartons de 24 : $5 \\times 24 = 120$ livres.\nb) $380 + 120 = 500$ livres.\nc) Je partage les 120 livres reçus en 6 : $120 \\div 6 = 20$ livres par étagère.\nJe vérifie : $6 \\times 20 = 120$.\n⛔ Le piège du c) : partager les 500 livres. Elle ne range que les livres REÇUS.\nRéponse : a) 120 ; b) 500 ; c) 20.",
          micros: ["ce2_probleme_trois_etapes"],
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "500" },
            { question: "c)", attendu: "20" },
          ],
        },
        {
          titre: "Le nombre mystère",
          enonce: "Je pense à un nombre. Je lui ajoute 25. Puis je multiplie le résultat par 2.\nJe trouve 100.\nQuel est mon nombre ?",
          correction:
            "Je remonte le chemin à l'envers, en faisant l'opération contraire.\nLa dernière étape : « × 2 » donne 100. Avant, il y avait $100 \\div 2 = 50$.\nL'étape d'avant : « + 25 » donne 50. Avant, il y avait $50 - 25 = 25$.\nJe vérifie : $25 + 25 = 50$, puis $50 \\times 2 = 100$.\n⛔ Le piège : faire les mêmes opérations, $100 + 25$ puis × 2. Pour revenir en arrière, j'inverse.\nRéponse : 25.",
          micros: ["ce2_probleme_defi"],
          reponses: [{ attendu: "25" }],
        },
        {
          titre: "Les billes des deux frères",
          enonce: "Deux frères ont 50 billes en tout.\nLe grand a 10 billes de plus que le petit.\na) Combien de billes a le petit ?\nb) Combien de billes a le grand ?",
          figure: schema(
            [
              { nom: "petit", morceaux: [{ n: 20, texte: "?" }] },
              { nom: "grand", morceaux: [{ n: 20, texte: "?" }, { n: 10, texte: "10" }] },
            ],
            "50",
          ),
          correction:
            "Le schéma montre deux barres pareilles, et 10 billes de plus pour le grand.\nJ'enlève d'abord les 10 billes en plus : $50 - 10 = 40$.\nIl reste deux parts égales : $40 \\div 2 = 20$. Le petit a 20 billes.\nLe grand : $20 + 10 = 30$ billes.\nJe vérifie : $20 + 30 = 50$, et $30 - 20 = 10$.\n⛔ Le piège : partager 50 en deux, 25 et 25. Alors le grand n'aurait pas 10 billes de plus.\nRéponse : a) 20 ; b) 30.",
          micros: ["ce2_probleme_defi", "ce2_probleme_deux_etapes", "ce2_probleme_schema_barre"],
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "30" },
          ],
        },
      ],
    },
  ],
};
