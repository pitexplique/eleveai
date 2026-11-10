// ─── Fiche d'exercices : la proportionnalité (CM1) — 20 exercices corrigés ────
//
// 10/11/2026 : feuille interactive de la notion `proportionnalite` du coach
// CM1 (7 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★,
// un rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Chaque exercice a ses `reponses` (sans IA).
//
// Alignée sur la carte mentale `cm1/proportionnalite` (`lib/cartes/remplies/
// cm1.json`) et sur `proportionnalite.bank.ts` : reconnaître une situation de
// proportionnalité, « fois plus », « fois moins », compléter un tableau, le
// coefficient, passer par la valeur pour 1, défis.
// ⛔ LIMITES DU CM1 : pas de produit en croix, pas de pourcentage, pas de
// règle de trois écrite ; des entiers, et des prix à deux décimales au plus.
//
// Les pièges nommés : l'âge et la taille (1, 13), ajouter au lieu de
// multiplier (2, 5, 6, 14), soustraire au lieu de diviser (3, 7), ajouter 2 à
// chaque case (4), croire qu'un tableau qui monte est proportionnel (10),
// multiplier le prix de 3 croissants par 5 (12), un écart constant pris pour un
// coefficient (9, 15), la demi-heure (16), diviser la masse voulue par le
// nombre de sacs (17), oublier une ligne de la recette (18), oublier le prix
// pour 1 (19), un prix « qui monte » sans être proportionnel (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché (1), pâtisserie (2), cuisine (3,
// 11, 18), fête foraine (4), ferme (5), imprimerie (6), randonnée (7),
// papeterie (8, 15), smoothies (9), boulangerie (12), sport et météo (13),
// architecture (14), vélo (16), jardin (17), peinture (19), photographie (20).
// Les métiers des problèmes : jardinier (17), cuisinière de cantine (18),
// peintre en bâtiment (19), photographe (20).
// Tous les nombres sont des MODÈLES (aucun fait réel).
//
// Micro-compétences : prop_reconnaitre (1, 10, 13, 20), prop_fois_plus (2, 6,
// 11, 16, 18), prop_fois_moins (3, 7, 11, 16), prop_tableau (4, 9, 10, 15),
// prop_coefficient (5, 10, 14, 18), prop_probleme (8, 12, 17, 19),
// prop_defi (17, 18, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

export const exercicesProportionnaliteCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître une situation de proportionnalité. Raisonner en « fois plus » et en « fois moins ». Compléter un tableau. Trouver le coefficient. Passer par la valeur pour 1. Des recettes, des tickets de manège, une imprimante, des croissants, un plan d'architecte, un cycliste, du terreau, de la peinture et des photos. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche combien de fois plus, ou combien de fois moins.",
      rappel: [
        "C'est proportionnel si, quand une quantité double, l'autre double aussi.",
        "3 fois plus de l'un, c'est 3 fois plus de l'autre : je multiplie.",
        "2 fois moins de l'un, c'est 2 fois moins de l'autre : je divise.",
      ],
      exercices: [
        {
          enonce:
            "Est-ce proportionnel ? Réponds oui ou non.\na) Au marché : 1 kg de pommes coûte 3 €, 2 kg coûtent 6 €, 4 kg coûtent 12 €.\nb) Léo mesure 110 cm à 5 ans et 140 cm à 10 ans.\nc) 1 paquet contient 8 gâteaux, 3 paquets en contiennent 24.\nd) Au manège : 1 tour coûte 2 €, 3 tours coûtent 5 €.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "Je regarde si une quantité est multipliée par le même nombre que l'autre.\na) 2 fois plus de pommes : $3 \\times 2 = 6$ €. 4 fois plus : $3 \\times 4 = 12$ €. Oui.\nb) L'âge double, de 5 à 10 ans. La taille ne double pas : 140 cm, pas 220 cm. Non.\nc) 3 fois plus de paquets : $8 \\times 3 = 24$ gâteaux. Oui.\nd) 3 fois plus de tours, mais $2 \\times 3 = 6$ €, pas 5 €. Non.\n⛔ Le piège du b) : croire que l'âge et la taille sont proportionnels. On ne grandit pas 2 fois plus en 2 fois plus de temps.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce:
            "Un pâtissier utilise 4 œufs pour 2 gâteaux.\na) Combien d'œufs pour 6 gâteaux (3 fois plus) ?\nb) Combien d'œufs pour 10 gâteaux ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "20" },
          ],
          correction:
            "a) 6 gâteaux, c'est 3 fois plus que 2 gâteaux. Il faut 3 fois plus d'œufs : $4 \\times 3 = 12$ œufs.\nb) 10 gâteaux, c'est 5 fois plus que 2 gâteaux : $4 \\times 5 = 20$ œufs.\n⛔ Le piège du a) : faire $4 + 3 = 7$ œufs. « 3 fois plus », c'est une multiplication.\nRéponse : a) 12 œufs ; b) 20 œufs.",
          micros: ["prop_fois_plus"],
        },
        {
          enonce:
            "Une recette pour 8 personnes demande 400 g de farine et 120 g de beurre.\na) Combien de farine pour 4 personnes, en g ?\nb) Combien de farine pour 2 personnes, en g ?\nc) Combien de beurre pour 4 personnes, en g ?",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "100" },
            { question: "c)", attendu: "60" },
          ],
          correction:
            "a) 4 personnes, c'est 2 fois moins que 8. Il faut 2 fois moins de farine : $400 \\div 2 = 200$ g.\nb) 2 personnes, c'est 4 fois moins que 8 : $400 \\div 4 = 100$ g.\nc) 2 fois moins de beurre : $120 \\div 2 = 60$ g.\n⛔ Le piège du a) : faire $400 - 2 = 398$ g. « 2 fois moins », c'est une division.\nRéponse : a) 200 g ; b) 100 g ; c) 60 g.",
          micros: ["prop_fois_moins"],
        },
        {
          enonce:
            "À la fête foraine, 1 ticket coûte 2 €. Complète le tableau.\na) Prix de 3 tickets, en € ?\nb) Prix de 5 tickets, en € ?\nc) Prix de 10 tickets, en € ?",
          figure: tableau(["Tickets", "1", "3", "5", "10"], ["Prix (€)", 2, "?", "?", "?"]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "Chaque ticket coûte 2 €. Je multiplie le nombre de tickets par 2.\na) $3 \\times 2 = 6$ €.\nb) $5 \\times 2 = 10$ €.\nc) $10 \\times 2 = 20$ €.\n⛔ Le piège du b) : faire $6 + 2 = 8$ € parce qu'on « ajoute 2 ». De 3 à 5 tickets, il y a 2 tickets de plus, donc 4 € de plus.\nRéponse : a) 6 € ; b) 10 € ; c) 20 €.",
          micros: ["prop_tableau"],
        },
        {
          enonce:
            "À la ferme, une boîte contient 6 œufs.\na) Par quel nombre multiplie-t-on le nombre de boîtes pour avoir le nombre d'œufs ?\nb) Combien d'œufs dans 4 boîtes ?\nc) Combien d'œufs dans 7 boîtes ?",
          figure: tableau(["Boîtes", "1", "4", "7"], ["Œufs", 6, "?", "?"]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "42" },
          ],
          correction:
            "a) 1 boîte, 6 œufs. On multiplie toujours par 6 : c'est le coefficient.\nb) $4 \\times 6 = 24$ œufs.\nc) $7 \\times 6 = 42$ œufs.\n⛔ Le piège du c) : faire $7 + 6 = 13$ œufs. On multiplie par le coefficient.\nRéponse : a) 6 ; b) 24 œufs ; c) 42 œufs.",
          micros: ["prop_coefficient"],
        },
        {
          enonce:
            "À l'imprimerie, une machine imprime 15 pages en 1 minute.\na) Combien de pages en 2 minutes ?\nb) Combien de pages en 4 minutes ?\nc) Combien de pages en 10 minutes ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "150" },
          ],
          correction:
            "Chaque minute, 15 pages. 2 fois plus de temps, 2 fois plus de pages.\na) $15 \\times 2 = 30$ pages.\nb) $15 \\times 4 = 60$ pages.\nc) $15 \\times 10 = 150$ pages.\n⛔ Le piège du a) : faire $15 + 2 = 17$ pages. Le temps double, donc les pages doublent.\nRéponse : a) 30 pages ; b) 60 pages ; c) 150 pages.",
          micros: ["prop_fois_plus"],
        },
        {
          enonce:
            "Pour une randonnée, 12 bouteilles d'eau pèsent 18 kg.\na) Combien pèsent 6 bouteilles, en kg ?\nb) Combien pèsent 4 bouteilles, en kg ?\nc) Combien pèsent 2 bouteilles, en kg ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) 6 bouteilles, c'est 2 fois moins que 12 : $18 \\div 2 = 9$ kg.\nb) 4 bouteilles, c'est 3 fois moins que 12 : $18 \\div 3 = 6$ kg.\nc) 2 bouteilles, c'est 6 fois moins que 12 : $18 \\div 6 = 3$ kg.\n⭐ Je vérifie : 2 bouteilles pèsent 3 kg, donc 12 bouteilles pèsent $3 \\times 6 = 18$ kg.\n⛔ Le piège du b) : faire $18 - 8 = 10$ kg parce qu'il y a 8 bouteilles de moins. On divise.\nRéponse : a) 9 kg ; b) 6 kg ; c) 3 kg.",
          micros: ["prop_fois_moins"],
        },
        {
          enonce: "À la papeterie, 5 cahiers coûtent 15 €.\na) Combien coûte 1 cahier, en € ?\nb) Combien coûtent 7 cahiers, en € ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "21" },
          ],
          correction:
            "Je cherche d'abord le prix pour 1, puis je multiplie.\na) 1 cahier, c'est 5 fois moins que 5 cahiers : $15 \\div 5 = 3$ €.\nb) 7 cahiers : $7 \\times 3 = 21$ €.\n⛔ Le piège du b) : faire $15 + 2 = 17$ €. Deux cahiers de plus coûtent $2 \\times 3 = 6$ € de plus.\nRéponse : a) 3 € ; b) 21 €.",
          micros: ["prop_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois gestes par exercice. Je cherche le lien entre les colonnes.",
      rappel: [
        "Dans un tableau de proportionnalité, on passe d'une ligne à l'autre en multipliant par le même nombre : le coefficient.",
        "Je peux aussi passer d'une colonne à l'autre : 2 fois plus, ou 2 fois moins.",
        "Quand c'est difficile, je cherche la valeur pour 1.",
      ],
      exercices: [
        {
          enonce:
            "Pour faire des smoothies, il faut 3 bananes pour 2 verres. Complète le tableau.\na) Bananes pour 4 verres ?\nb) Bananes pour 6 verres ?\nc) Bananes pour 10 verres ?",
          figure: tableau(["Verres", "2", "4", "6", "10"], ["Bananes", 3, "?", "?", "?"]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "Je compare chaque colonne à la colonne « 2 verres ».\na) 4 verres, c'est 2 fois plus que 2 verres : $3 \\times 2 = 6$ bananes.\nb) 6 verres, c'est 3 fois plus : $3 \\times 3 = 9$ bananes.\nc) 10 verres, c'est 5 fois plus : $3 \\times 5 = 15$ bananes.\n⛔ Le piège : ajouter 2 à chaque fois, comme pour les verres. On trouverait 5, 7, 11 : c'est faux.\nRéponse : a) 6 ; b) 9 ; c) 15.",
          micros: ["prop_tableau"],
        },
        {
          enonce:
            "a) Quel tableau est un tableau de proportionnalité ?\nA) 1 → 4 ; 2 → 6 ; 3 → 8  B) 1 → 5 ; 2 → 10 ; 3 → 16  C) 1 → 4 ; 2 → 8 ; 3 → 12\nb) Quel est le coefficient de ce tableau ?",
          reponses: [
            { question: "a)", attendu: ["C"] },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "Je vérifie si on multiplie TOUJOURS par le même nombre.\nA) $1 \\times 4 = 4$, mais $2 \\times 4 = 8$, pas 6. Non : on ajoute 2.\nB) $1 \\times 5 = 5$, $2 \\times 5 = 10$, mais $3 \\times 5 = 15$, pas 16. Non.\nC) $1 \\times 4 = 4$, $2 \\times 4 = 8$, $3 \\times 4 = 12$. Oui.\na) C'est le C.\nb) Le coefficient est 4.\n⛔ Le piège : choisir A parce que les nombres montent. Monter ne suffit pas : il faut multiplier par le même nombre.\nRéponse : a) C ; b) 4.",
          micros: ["prop_reconnaitre", "prop_tableau", "prop_coefficient"],
        },
        {
          enonce:
            "Pour 3 personnes, il faut 300 g de pâtes.\na) Pour 6 personnes, en g ?\nb) Pour 9 personnes, en g ?\nc) Pour 1 personne, en g ?\nd) Pour 5 personnes, en g ?",
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "900" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: "500" },
          ],
          correction:
            "a) 2 fois plus de personnes : $300 \\times 2 = 600$ g.\nb) 3 fois plus : $300 \\times 3 = 900$ g.\nc) 3 fois moins : $300 \\div 3 = 100$ g.\nd) Je passe par 1 personne : $5 \\times 100 = 500$ g.\n⛔ Le piège du d) : chercher « 5 fois plus que 3 ». Passer par 1 personne est plus simple.\nRéponse : a) 600 g ; b) 900 g ; c) 100 g ; d) 500 g.",
          micros: ["prop_fois_plus", "prop_fois_moins"],
        },
        {
          enonce:
            "À la boulangerie, 3 croissants coûtent 3,60 €.\na) Combien coûte 1 croissant, en € ?\nb) Combien coûtent 5 croissants, en € ?\nc) Combien coûtent 10 croissants, en € ?",
          reponses: [
            { question: "a)", attendu: "1,20" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) 1 croissant, c'est 3 fois moins : $3{,}60 \\div 3 = 1{,}20$ €. (3 € ÷ 3 = 1 €, et 60 centimes ÷ 3 = 20 centimes.)\nb) $5 \\times 1{,}20 = 6$ €. (5 × 1 € = 5 €, et 5 × 20 centimes = 1 €.)\nc) 10 croissants, c'est 2 fois 5 croissants : $6 \\times 2 = 12$ €.\n⛔ Le piège du b) : faire $3{,}60 \\times 5 = 18$ €. $3{,}60$ €, c'est le prix de 3 croissants, pas d'un seul.\nRéponse : a) $1{,}20$ € ; b) 6 € ; c) 12 €.",
          micros: ["prop_probleme"],
        },
        {
          enonce:
            "Est-ce proportionnel ? Réponds oui ou non.\na) Le prix des tomates et leur masse, à 2 € le kg.\nb) La pointure de chaussures et l'âge d'un enfant.\nc) Le nombre de tours d'une piste de 400 m et la distance parcourue.\nd) La température et l'heure de la journée.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "Je me demande : si l'un double, l'autre double-t-il toujours ?\na) 1 kg : 2 €. 2 kg : 4 €. Le prix double. Oui.\nb) À 10 ans, on ne chausse pas 2 fois plus grand qu'à 5 ans. Non.\nc) 1 tour : 400 m. 2 tours : 800 m. Oui.\nd) À midi, il ne fait pas 2 fois plus chaud qu'à 6 h. Non.\n⛔ Le piège : dire oui dès que les deux quantités grandissent ensemble. Il faut qu'elles soient multipliées par le même nombre.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce:
            "Une architecte dessine un plan. Sur le plan, 1 cm représente 5 m en vrai.\na) Un mur mesure 4 cm sur le plan. Combien mesure-t-il en vrai, en m ?\nb) Un jardin mesure 9 cm sur le plan. Combien en vrai, en m ?\nc) Une allée mesure 60 m en vrai. Combien de cm sur le plan ?",
          figure: tableau(["Plan (cm)", "1", "4", "9", "?"], ["Vrai (m)", 5, "?", "?", 60]),
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "Le coefficient est 5 : vrai = plan × 5.\na) $4 \\times 5 = 20$ m.\nb) $9 \\times 5 = 45$ m.\nc) Je fais l'inverse : plan = vrai ÷ 5. $60 \\div 5 = 12$ cm.\n⛔ Le piège du a) : faire $4 + 5 = 9$ m. Chaque centimètre vaut 5 m : on multiplie.\nRéponse : a) 20 m ; b) 45 m ; c) 12 cm.",
          micros: ["prop_coefficient"],
        },
        {
          enonce:
            "À la papeterie, 2 stylos coûtent 4 € et 3 stylos coûtent 6 €.\na) Combien coûtent 5 stylos, en € ?\nb) Combien coûtent 10 stylos, en € ?",
          figure: tableau(["Stylos", "2", "3", "5", "10"], ["Prix (€)", 4, 6, "?", "?"]),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "20" },
          ],
          correction:
            "a) 5 stylos, c'est 2 stylos + 3 stylos. Je peux ajouter les prix : $4 + 6 = 10$ €.\nb) 10 stylos, c'est 2 fois 5 stylos : $10 \\times 2 = 20$ €.\n⭐ Je vérifie : 1 stylo coûte $4 \\div 2 = 2$ €. 5 stylos : $5 \\times 2 = 10$ €.\n⛔ Le piège : voir que le prix monte de 2 € de 2 à 3 stylos, et ajouter 2 € pour aller à 5 stylos : 8 €. Ce sont 2 stylos de plus, donc 4 € de plus.\nRéponse : a) 10 € ; b) 20 €.",
          micros: ["prop_tableau"],
        },
        {
          enonce:
            "Un cycliste roule toujours à la même vitesse : 18 km en 1 heure.\na) Combien de km en 2 heures ?\nb) Combien de km en 3 heures ?\nc) Combien de km en une demi-heure ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "54" },
            { question: "c)", attendu: "9" },
          ],
          correction:
            "a) 2 fois plus de temps : $18 \\times 2 = 36$ km.\nb) 3 fois plus de temps : $18 \\times 3 = 54$ km.\nc) Une demi-heure, c'est 2 fois moins qu'une heure : $18 \\div 2 = 9$ km.\n⛔ Le piège du c) : faire $18 \\times 2 = 36$ km. Moins de temps, donc moins de kilomètres : je divise par 2.\nRéponse : a) 36 km ; b) 54 km ; c) 9 km.",
          micros: ["prop_fois_plus", "prop_fois_moins"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche la valeur pour 1, puis je multiplie.",
      rappel: [
        "Je cherche d'abord combien pour 1 : je divise.",
        "Puis je multiplie par le nombre demandé.",
        "Je vérifie que la situation est bien proportionnelle.",
      ],
      exercices: [
        {
          titre: "Le terreau du jardinier",
          enonce:
            "Un jardinier achète 4 sacs de terreau. Ils pèsent 20 kg en tout. Tous les sacs ont la même masse.\na) Combien pèse 1 sac, en kg ?\nb) Combien pèsent 6 sacs, en kg ?\nc) Il lui faut 45 kg de terreau. Combien de sacs doit-il prendre ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "9" },
          ],
          correction:
            "a) 1 sac, c'est 4 fois moins : $20 \\div 4 = 5$ kg.\nb) 6 sacs : $6 \\times 5 = 30$ kg.\nc) Combien de fois 5 kg dans 45 kg ? $45 \\div 5 = 9$ sacs.\n⭐ Je vérifie : $9 \\times 5 = 45$ kg.\n⛔ Le piège du b) : faire $20 + 2 = 22$ kg. Deux sacs de plus pèsent $2 \\times 5 = 10$ kg de plus.\nRéponse : a) 5 kg ; b) 30 kg ; c) 9 sacs.",
          micros: ["prop_probleme", "prop_defi"],
        },
        {
          titre: "La cuisinière de la cantine",
          enonce:
            "Clara est cuisinière à la cantine. Sa recette pour 4 personnes : 200 g de riz et 2 oignons. Elle cuisine pour 24 élèves.\na) 24 élèves, c'est combien de fois plus que 4 personnes ?\nb) Combien de riz lui faut-il, en g ?\nc) Combien d'oignons lui faut-il ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "1200" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) $4 \\times 6 = 24$ : c'est 6 fois plus de personnes.\nb) 6 fois plus de riz : $200 \\times 6 = 1\\,200$ g.\nc) 6 fois plus d'oignons : $2 \\times 6 = 12$ oignons.\n⛔ Le piège : multiplier le riz et oublier les oignons. Tous les ingrédients sont multipliés par 6.\nRéponse : a) 6 fois ; b) $1\\,200$ g ; c) 12 oignons.",
          micros: ["prop_fois_plus", "prop_coefficient", "prop_defi"],
        },
        {
          titre: "Les pots du peintre",
          enonce:
            "Un peintre en bâtiment utilise 3 pots de peinture pour 36 m² de mur.\na) Combien de m² couvre 1 pot ?\nb) Il doit peindre 84 m². Combien de pots lui faut-il ?\nc) Un pot coûte 15 €. Combien coûtent ces pots, en € ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "105" },
          ],
          correction:
            "a) 1 pot, c'est 3 fois moins : $36 \\div 3 = 12$ m².\nb) Combien de fois 12 m² dans 84 m² ? $12 \\times 7 = 84$. Il faut 7 pots.\nc) $7 \\times 15 = 105$ €. (7 × 10 = 70 et 7 × 5 = 35.)\n⛔ Le piège du b) : faire $84 \\div 3 = 28$ pots. 3 pots, c'est pour 36 m², pas pour 1 m².\nRéponse : a) 12 m² ; b) 7 pots ; c) 105 €.",
          micros: ["prop_probleme", "prop_defi"],
        },
        {
          titre: "Les tirages de la photographe",
          enonce:
            "Mei est photographe. Elle compare deux boutiques de tirages.\nBoutique Clic : 10 photos 3 €, 20 photos 6 €, 50 photos 15 €.\nBoutique Flash : 10 photos 4 €, 20 photos 5 €.\na) Chez Clic, le prix est-il proportionnel au nombre de photos ? Réponds oui ou non.\nb) Chez Clic, combien coûtent 30 photos, en € ?\nc) Chez Flash, le prix est-il proportionnel ? Réponds oui ou non.\nd) Pour 20 photos, quelle boutique est la moins chère ?",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: ["non", "faux"] },
            { question: "d)", attendu: ["Flash", "la boutique Flash", "boutique Flash"] },
          ],
          correction:
            "a) Chez Clic : 2 fois plus de photos, $3 \\times 2 = 6$ €. 5 fois plus, $3 \\times 5 = 15$ €. Oui.\nb) 30 photos, c'est 3 fois 10 photos : $3 \\times 3 = 9$ €.\nc) Chez Flash : 2 fois plus de photos, mais 5 € au lieu de $4 \\times 2 = 8$ €. Non.\nd) 20 photos : 6 € chez Clic, 5 € chez Flash. Flash est la moins chère.\n⛔ Le piège du c) : dire oui parce que le prix monte. Pour être proportionnel, il faudrait 8 € pour 20 photos.\nRéponse : a) oui ; b) 9 € ; c) non ; d) Flash.",
          micros: ["prop_reconnaitre", "prop_defi"],
        },
      ],
    },
  ],
};
