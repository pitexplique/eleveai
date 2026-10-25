// ─── Fiche d'exercices : calculer avec les fractions (CM2) ────────────────────
//
// 25/10/2026 : la TROISIÈME des trois feuilles de fractions du CM2 (avec
// `maths-cm2-fraction.tsx` et `maths-cm2-fraction-mixte.tsx`). Même forme :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, dessins de `dessins-fractions-cm2.tsx`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// fractions-calcul.bank.ts` (notionId fraction_calcul) et sur les trois
// objectifs du programme de CM2 (cm2-N-fractions-8, -9, -10) :
//   · additionner et soustraire — MÊME dénominateur, ou un dénominateur
//     MULTIPLE de l'autre (1/2 + 1/4). ⛔ Jamais 1/3 + 1/4 (c'est la 6e) ;
//   · multiplier une fraction par un entier = une addition répétée
//     (3 × 2/7 = 2/7 + 2/7 + 2/7 = 6/7) ;
//   · prendre une fraction d'une quantité : je PARTAGE (÷ par le bas), puis je
//     PRENDS (× par le haut). 2/3 de 12 = 2 × (12 ÷ 3) = 8.
// ⭐ « Le dénominateur NOMME l'unité, il ne se compte pas » (la banque) : 3
// quarts + 2 quarts = 5 quarts, comme 3 pommes + 2 pommes.
// La fiche de cours `lib/fiches/maths-cm2-fractions.tsx` (seule fiche de cours
// de fractions du CM2) ne calcule pas : aucun de ses exemples n'est repris.
// ⭐ FRÉDÉRIC (25/10) : ses élèves ne savent pas simplifier, ni passer au
// décimal et au pourcentage. Chaque résultat se simplifie quand il le peut
// (2, 3, 7, 9, 10, 20), et 1/4 de 20 € = 25 % de 20 € (13).
//
// Les pièges nommés : ajouter les dénominateurs, 1/4 + 2/4 = 3/8 (1, 2, 10,
// 14), soustraire en bas (3), multiplier aussi le bas, 3 × 2/7 = 6/21 (4, 10,
// 11), diviser par le haut (5, 16), oublier de prendre après avoir partagé (6,
// 12), additionner deux dénominateurs différents sans redécouper (7, 10, 17,
// 19), oublier de simplifier (9), 1/4 d'heure = 25 minutes (15), un
// pourcentage lu comme un nombre d'euros (13), oublier le dénominateur du
// reste (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : pizza (1), billes (6), grenouille (8),
// course à pied (14), piano (15), football (17), kermesse (18), refuge pour
// tortues (19), parc (20), cuisine (11), argent de poche (13), école (12).
// Les métiers : cuisinier (11), entraîneuse (17), vétérinaire (19),
// paysagistes (20).
//
// ⭐ UN FAIT RÉEL, et sa source :
//   · ex. 17 — un match de football : deux périodes égales de 45 minutes, 90
//     minutes (IFAB, Lois du jeu, loi 7 « La durée du match »).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : des BARRES où chaque morceau ajouté a sa couleur (on VOIT
// que le dénominateur ne bouge pas), des BILLES rangées en parts égales
// (Frédéric les adore : 2/3 de 12, c'est 2 rangées sur 3), des sauts sur la
// droite graduée, la grille de 100 et le disque. 13 dessins imprimés.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm2-fraction-calcul.mjs`.
//
// Micro-compétences : fraction_additionner (1, 2, 3, 7, 9, 10, 14, 17, 18,
// 19, 20), fraction_produit_entier (4, 8, 10, 11, 15, 18), fraction_quantite
// (5, 6, 12, 13, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, cent, disque, droiteRel, ecranSeulement, jetons } from "@/lib/fiches-exercices/dessins-fractions-cm2";

export const exercicesFractionCalculCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème. Additionner et soustraire des fractions : trois quarts plus deux quarts font cinq quarts, comme trois pommes plus deux pommes. Multiplier une fraction par un nombre entier. Prendre une fraction d'une quantité : je partage, puis je prends. Une pizza, des billes, une grenouille, un match de football, une kermesse, un refuge pour tortues et une haie à planter. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé et les parts dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/fraction", titre: "Les fractions" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Le nombre du bas dit la taille des parts : il ne change pas.",
      rappel: [
        "Même dénominateur : j'ajoute les numérateurs, le dénominateur reste. 1 quart + 2 quarts = 3 quarts.",
        "3 fois 2 septièmes, c'est 2 septièmes + 2 septièmes + 2 septièmes = 6 septièmes.",
        "Un tiers de 21 : je partage 21 en 3 parts égales. 21 ÷ 3 = 7.",
      ],
      exercices: [
        {
          enonce: "Elsa et son frère Noah partagent une pizza coupée en 8 parts égales. Elsa mange les parts bleues, Noah les parts orange.\na) Quelle fraction de la pizza mange chacun ?\nb) Quelle fraction mangent-ils ensemble ?\nc) Quelle fraction reste ?",
          figure: barres([{ d: 8, label: "pizza", parts: [3, 2] }]),
          correction:
            "a) La pizza a 8 parts égales. Elsa : 3 parts, $\\dfrac{3}{8}$. Noah : 2 parts, $\\dfrac{2}{8}$.\nb) 3 huitièmes et 2 huitièmes font 5 huitièmes : $\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$.\nc) La pizza entière, c'est $\\dfrac{8}{8}$. Il reste 8 − 5 = 3 parts : $\\dfrac{3}{8}$.\n⛔ Le piège : écrire $\\dfrac{5}{16}$ en ajoutant aussi les dénominateurs. La pizza a toujours 8 parts, pas 16 !\nRéponse : a) $\\dfrac{3}{8}$ et $\\dfrac{2}{8}$ ; b) $\\dfrac{5}{8}$ ; c) $\\dfrac{3}{8}$.",
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule. Simplifie quand c'est possible.\na) $\\dfrac{1}{4} + \\dfrac{2}{4}$\nb) $\\dfrac{3}{7} + \\dfrac{3}{7}$\nc) $\\dfrac{5}{9} + \\dfrac{4}{9}$\nd) $\\dfrac{2}{6} + \\dfrac{1}{6}$",
          correction:
            "Même dénominateur : j'ajoute les numérateurs, le dénominateur ne bouge pas.\na) 1 quart + 2 quarts = 3 quarts : $\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{4}$.\nb) $\\dfrac{3}{7} + \\dfrac{3}{7} = \\dfrac{6}{7}$.\nc) $\\dfrac{5}{9} + \\dfrac{4}{9} = \\dfrac{9}{9} = 1$ : l'unité entière.\nd) $\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6}$. Je simplifie : 3 ÷ 3 = 1 et 6 ÷ 3 = 2, donc $\\dfrac{3}{6} = \\dfrac{1}{2}$.\n⛔ Le piège : $\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{8}$. Faux ! $\\dfrac{3}{8}$ est plus petit que $\\dfrac{2}{4}$ : en ajoutant, j'aurais perdu.\nRéponse : a) $\\dfrac{3}{4}$ ; b) $\\dfrac{6}{7}$ ; c) 1 ; d) $\\dfrac{1}{2}$.",
          schema: ecranSeulement(barres([{ d: 4, label: "1/4 + 2/4", parts: [1, 2] }])),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule. Simplifie quand c'est possible.\na) $\\dfrac{7}{8} - \\dfrac{3}{8}$\nb) $\\dfrac{5}{6} - \\dfrac{1}{6}$\nc) $1 - \\dfrac{2}{5}$\nd) $\\dfrac{9}{10} - \\dfrac{4}{10}$",
          correction:
            "Même dénominateur : j'enlève des numérateurs, le dénominateur reste.\na) $\\dfrac{7}{8} - \\dfrac{3}{8} = \\dfrac{4}{8}$. Je simplifie par 4 : $\\dfrac{4}{8} = \\dfrac{1}{2}$.\nb) $\\dfrac{5}{6} - \\dfrac{1}{6} = \\dfrac{4}{6}$. Je simplifie par 2 : $\\dfrac{4}{6} = \\dfrac{2}{3}$.\nc) $1 = \\dfrac{5}{5}$. Donc $1 - \\dfrac{2}{5} = \\dfrac{5}{5} - \\dfrac{2}{5} = \\dfrac{3}{5}$.\nd) $\\dfrac{9}{10} - \\dfrac{4}{10} = \\dfrac{5}{10}$. Je simplifie par 5 : $\\dfrac{5}{10} = \\dfrac{1}{2}$.\n⛔ Le piège : enlever aussi en bas. $\\dfrac{7}{8} - \\dfrac{3}{8}$ n'est pas $\\dfrac{4}{0}$ : les parts restent des huitièmes.\nRéponse : a) $\\dfrac{1}{2}$ ; b) $\\dfrac{2}{3}$ ; c) $\\dfrac{3}{5}$ ; d) $\\dfrac{1}{2}$.",
          schema: ecranSeulement(barres([{ d: 8, label: "7/8 − 3/8", parts: [4, 3] }])),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Écris chaque produit comme une addition, puis calcule.\na) $3 \\times \\dfrac{2}{7}$\nb) $4 \\times \\dfrac{1}{5}$\nc) $2 \\times \\dfrac{3}{8}$\nd) $5 \\times \\dfrac{2}{10}$",
          correction:
            "Multiplier par 3, c'est ajouter 3 fois la même fraction. Le dénominateur reste.\na) $3 \\times \\dfrac{2}{7} = \\dfrac{2}{7} + \\dfrac{2}{7} + \\dfrac{2}{7} = \\dfrac{6}{7}$.\nb) $4 \\times \\dfrac{1}{5} = \\dfrac{1}{5} + \\dfrac{1}{5} + \\dfrac{1}{5} + \\dfrac{1}{5} = \\dfrac{4}{5}$.\nc) $2 \\times \\dfrac{3}{8} = \\dfrac{3}{8} + \\dfrac{3}{8} = \\dfrac{6}{8}$. Je simplifie : $\\dfrac{6}{8} = \\dfrac{3}{4}$.\nd) $5 \\times \\dfrac{2}{10} = \\dfrac{10}{10} = 1$.\n⛔ Le piège : multiplier aussi le bas. $3 \\times \\dfrac{2}{7}$ n'est pas $\\dfrac{6}{21}$ : on ajoute des septièmes, ils restent des septièmes.\nRéponse : a) $\\dfrac{6}{7}$ ; b) $\\dfrac{4}{5}$ ; c) $\\dfrac{3}{4}$ ; d) 1.",
          schema: barres([{ d: 7, label: "3 × 2/7", parts: [2, 2, 2] }]),
          micros: ["fraction_produit_entier"],
        },
        {
          enonce: "Calcule.\na) $\\dfrac{1}{2}$ de 18\nb) $\\dfrac{1}{3}$ de 21\nc) $\\dfrac{1}{4}$ de 32\nd) $\\dfrac{1}{5}$ de 45",
          correction:
            "Prendre un tiers, c'est partager en 3 parts égales : je divise par le nombre du bas.\na) 18 ÷ 2 = 9.\nb) 21 ÷ 3 = 7. Sur le dessin : 3 rangées de 7 billes, j'en prends une.\nc) 32 ÷ 4 = 8.\nd) 45 ÷ 5 = 9.\n⛔ Le piège : multiplier, 21 × 3 = 63. Un tiers de 21 est PLUS PETIT que 21.\nRéponse : a) 9 ; b) 7 ; c) 8 ; d) 9.",
          schema: ecranSeulement(jetons(3, 7, [{ n: 7, nom: "1/3" }])),
          micros: ["fraction_quantite"],
        },
        {
          enonce: "Les 12 billes de Rayan sont rangées en 3 rangées égales.\na) Combien de billes dans une rangée ? C'est $\\dfrac{1}{3}$ des billes.\nb) Rayan donne $\\dfrac{2}{3}$ de ses billes. Combien en donne-t-il ?\nc) Combien lui en reste-t-il ?",
          figure: jetons(3, 4, []),
          correction:
            "a) Je partage 12 en 3 rangées égales : 12 ÷ 3 = 4 billes. $\\dfrac{1}{3}$ de 12, c'est 4.\nb) $\\dfrac{2}{3}$, ce sont 2 rangées : 2 × 4 = 8 billes.\nc) 12 − 8 = 4 billes : une rangée, $\\dfrac{1}{3}$ des billes.\n⛔ Le piège du b) : s'arrêter à 4. J'ai partagé (÷ 3), il faut encore PRENDRE 2 parts (× 2).\nRéponse : a) 4 billes ; b) 8 billes ; c) 4 billes.",
          schema: ecranSeulement(jetons(3, 4, [{ n: 8, nom: "donnée" }], "gardée")),
          micros: ["fraction_quantite"],
        },
        {
          enonce: "Les dénominateurs sont différents : un des deux est un multiple de l'autre.\nCalcule en redécoupant.\na) $\\dfrac{1}{2} + \\dfrac{1}{4}$\nb) $\\dfrac{1}{3} + \\dfrac{1}{6}$\nc) $\\dfrac{3}{4} - \\dfrac{1}{8}$",
          correction:
            "Je coupe les grosses parts pour avoir des parts de même taille, puis j'ajoute.\na) 2 × 2 = 4 : $\\dfrac{1}{2} = \\dfrac{2}{4}$. Donc $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$.\nb) 3 × 2 = 6 : $\\dfrac{1}{3} = \\dfrac{2}{6}$. Donc $\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6}$, et je simplifie : $\\dfrac{3}{6} = \\dfrac{1}{2}$.\nc) 4 × 2 = 8 : $\\dfrac{3}{4} = \\dfrac{6}{8}$. Donc $\\dfrac{3}{4} - \\dfrac{1}{8} = \\dfrac{6}{8} - \\dfrac{1}{8} = \\dfrac{5}{8}$.\n⛔ Le piège : $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{6}$. Les parts n'ont pas la même taille : je redécoupe d'abord.\nRéponse : a) $\\dfrac{3}{4}$ ; b) $\\dfrac{1}{2}$ ; c) $\\dfrac{5}{8}$.",
          schema: barres([
            { d: 2, label: "1/2", parts: [1] },
            { d: 4, label: "1/2 + 1/4", parts: [2, 1] },
          ]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Une grenouille fait 3 sauts. Chaque saut mesure $\\dfrac{3}{4}$ de mètre.\na) Écris la distance avec une addition, puis avec un produit.\nb) Calcule la distance.\nc) Entre quels nombres entiers de mètres arrive-t-elle ?",
          figure: droiteRel(0, 3, 0.25, [], {
            sauts: [
              { de: 0, vers: 0.75, label: "3/4" },
              { de: 0.75, vers: 1.5, label: "3/4" },
              { de: 1.5, vers: 2.25, label: "3/4" },
            ],
            nombres: 1,
          }),
          correction:
            "a) $\\dfrac{3}{4} + \\dfrac{3}{4} + \\dfrac{3}{4} = 3 \\times \\dfrac{3}{4}$.\nb) 3 quarts, trois fois : 3 × 3 = 9 quarts. $3 \\times \\dfrac{3}{4} = \\dfrac{9}{4}$ m.\nc) 2 × 4 = 8 : $\\dfrac{9}{4} = 2 + \\dfrac{1}{4}$. Elle arrive entre 2 et 3 mètres. Sur la droite, le 3e saut finit un trait après 2.\n⛔ Le piège : écrire $\\dfrac{9}{12}$. Chaque saut mesure des QUARTS de mètre : le résultat aussi.\nRéponse : a) $3 \\times \\dfrac{3}{4}$ ; b) $\\dfrac{9}{4}$ m ; c) entre 2 et 3 m.",
          micros: ["fraction_produit_entier"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je calcule, je simplifie, puis je vérifie sur le dessin.",
      rappel: [
        "Dénominateurs différents : je redécoupe d'abord, 1 demi = 2 quarts, puis j'ajoute.",
        "Deux tiers de 30 : je partage, 30 ÷ 3 = 10 ; puis je prends 2 parts, 2 × 10 = 20.",
        "Je simplifie le résultat : 6 huitièmes = 3 quarts. Un quart = 0,25 = 25 %.",
      ],
      exercices: [
        {
          enonce: "Calcule, simplifie, puis écris le résultat avec une virgule.\na) $\\dfrac{1}{4} + \\dfrac{1}{4}$\nb) $\\dfrac{3}{10} + \\dfrac{2}{10}$\nc) $\\dfrac{1}{2} + \\dfrac{1}{4}$\nd) $\\dfrac{3}{4} + \\dfrac{3}{4}$",
          correction:
            "a) $\\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{2}{4} = \\dfrac{1}{2} = 0{,}5$.\nb) $\\dfrac{3}{10} + \\dfrac{2}{10} = \\dfrac{5}{10} = \\dfrac{1}{2} = 0{,}5$.\nc) $\\dfrac{1}{2} = \\dfrac{2}{4}$, donc $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{3}{4} = 0{,}75$. Sur la grille de 100 : 50 cases + 25 cases = 75 cases.\nd) $\\dfrac{3}{4} + \\dfrac{3}{4} = \\dfrac{6}{4} = \\dfrac{3}{2} = 1{,}5$. C'est plus que 1 !\n⛔ Le piège : s'arrêter à $\\dfrac{2}{4}$ ou $\\dfrac{5}{10}$ sans voir la moitié. Je cherche toujours à simplifier.\nRéponse : a) 0,5 ; b) 0,5 ; c) 0,75 ; d) 1,5.",
          schema: cent(75),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Trois élèves se trompent. Trouve la bonne réponse.\na) Tom : « $\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{8}$ »\nb) Léa : « $3 \\times \\dfrac{2}{5} = \\dfrac{6}{15}$ »\nc) Sam : « $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{6}$ »",
          correction:
            "a) Tom ajoute aussi les dénominateurs. Des quarts plus des quarts font des quarts : $\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{4}$.\nb) Léa multiplie aussi le bas. $3 \\times \\dfrac{2}{5} = \\dfrac{2}{5} + \\dfrac{2}{5} + \\dfrac{2}{5} = \\dfrac{6}{5}$. Et $\\dfrac{6}{15} = \\dfrac{2}{5}$ : trois fois $\\dfrac{2}{5}$ ne peut pas valoir $\\dfrac{2}{5}$ !\nc) Sam ajoute des parts de tailles différentes. Je redécoupe : $\\dfrac{1}{2} = \\dfrac{2}{4}$, donc $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{3}{4}$.\n⭐ Je vérifie avec du bon sens : en ajoutant, le résultat doit être PLUS GRAND que chaque nombre.\nRéponse : a) $\\dfrac{3}{4}$ ; b) $\\dfrac{6}{5}$ ; c) $\\dfrac{3}{4}$.",
          schema: ecranSeulement(
            barres([
              { d: 4, label: "1/4 + 2/4", parts: [1, 2] },
              { d: 8, label: "3/8", parts: [3] },
            ]),
          ),
          micros: ["fraction_additionner", "fraction_produit_entier"],
        },
        {
          enonce: "Omar, cuisinier, met $\\dfrac{3}{4}$ de litre de lait dans un gâteau.\na) Il fait 4 gâteaux. Écris le lait nécessaire avec un produit, puis calcule.\nb) Simplifie ce résultat.\nc) Pour 6 gâteaux, combien de litres ? Écris-le « entier + fraction », puis avec une virgule.",
          correction:
            "a) $4 \\times \\dfrac{3}{4} = \\dfrac{3}{4} + \\dfrac{3}{4} + \\dfrac{3}{4} + \\dfrac{3}{4} = \\dfrac{12}{4}$.\nb) 3 × 4 = 12 : $\\dfrac{12}{4} = 3$. Il faut 3 litres.\nc) $6 \\times \\dfrac{3}{4} = \\dfrac{18}{4}$. 4 × 4 = 16 : $\\dfrac{18}{4} = 4 + \\dfrac{2}{4} = 4 + \\dfrac{1}{2} = 4{,}5$ litres.\n⛔ Le piège : $4 \\times \\dfrac{3}{4} = \\dfrac{12}{16}$. C'est moins d'un litre pour 4 gâteaux : impossible !\nRéponse : a) $\\dfrac{12}{4}$ ; b) 3 litres ; c) $4 + \\dfrac{1}{2}$, soit 4,5 litres.",
          schema: barres([{ d: 4, label: "4 gâteaux", parts: [3, 3, 3, 3], fois: 3 }]),
          micros: ["fraction_produit_entier"],
        },
        {
          enonce: "Dans une classe de 28 élèves, $\\dfrac{3}{4}$ des élèves viennent à pied. Les autres viennent en bus.\na) Combien d'élèves viennent à pied ?\nb) Combien viennent en bus ? Quelle fraction de la classe est-ce ?\nc) $\\dfrac{2}{7}$ des élèves ont un vélo. Combien sont-ils ?",
          correction:
            "a) Je partage : 28 ÷ 4 = 7. Je prends 3 parts : 3 × 7 = 21 élèves à pied.\nb) 28 − 21 = 7 élèves en bus. C'est une part sur quatre : $\\dfrac{1}{4}$ de la classe.\nc) Je partage : 28 ÷ 7 = 4. Je prends 2 parts : 2 × 4 = 8 élèves ont un vélo.\n⛔ Le piège du a) : s'arrêter à 7. 7, c'est un quart ; il en faut trois.\nRéponse : a) 21 ; b) 7, soit $\\dfrac{1}{4}$ ; c) 8.",
          schema: ecranSeulement(jetons(4, 7, [{ n: 21, nom: "à pied" }], "en bus")),
          micros: ["fraction_quantite"],
        },
        {
          enonce: "Lila a 20 € d'argent de poche.\na) Combien font $\\dfrac{1}{4}$ de 20 € ?\nb) Combien font 25 % de 20 € ?\nc) Elle dépense $\\dfrac{3}{4}$ de son argent. Combien d'euros ? Quel pourcentage ?\nd) Combien font 10 % de 20 € ?",
          correction:
            "a) 20 ÷ 4 = 5 : $\\dfrac{1}{4}$ de 20 €, c'est 5 €.\nb) 25 % = $\\dfrac{25}{100} = \\dfrac{1}{4}$. Donc 25 % de 20 €, c'est aussi 5 €.\nc) 3 × 5 = 15 € : $\\dfrac{3}{4}$ = 75 %.\nd) 10 % = $\\dfrac{10}{100} = \\dfrac{1}{10}$. 20 ÷ 10 = 2 €.\n⛔ Le piège du b) : répondre 25 €. 25 % n'est pas 25 euros : c'est 25 centièmes de la somme, un quart.\nRéponse : a) 5 € ; b) 5 € ; c) 15 €, 75 % ; d) 2 €.",
          schema: ecranSeulement(cent(25)),
          micros: ["fraction_quantite"],
        },
        {
          enonce: "Mia court $\\dfrac{3}{8}$ de kilomètre, puis encore $\\dfrac{4}{8}$ de kilomètre.\na) Quelle distance a-t-elle courue ?\nb) Combien lui manque-t-il pour faire 1 km ?\nc) Elle court encore $\\dfrac{2}{8}$ de kilomètre. Quelle distance en tout ? Écris-la « entier + fraction ».",
          figure: droiteRel(0, 1.25, 0.125, [], {
            sauts: [
              { de: 0, vers: 0.375, label: "3/8" },
              { de: 0.375, vers: 0.875, label: "4/8" },
            ],
            nombres: 1,
          }),
          correction:
            "a) $\\dfrac{3}{8} + \\dfrac{4}{8} = \\dfrac{7}{8}$ km.\nb) 1 km = $\\dfrac{8}{8}$. $\\dfrac{8}{8} - \\dfrac{7}{8} = \\dfrac{1}{8}$ km : un seul saut de graduation.\nc) $\\dfrac{7}{8} + \\dfrac{2}{8} = \\dfrac{9}{8}$ km. Et $\\dfrac{9}{8} = 1 + \\dfrac{1}{8}$ km : un peu plus d'un kilomètre.\n⛔ Le piège du a) : $\\dfrac{7}{16}$. Ce serait moins que $\\dfrac{4}{8}$ : elle aurait reculé !\nRéponse : a) $\\dfrac{7}{8}$ km ; b) $\\dfrac{1}{8}$ km ; c) $\\dfrac{9}{8} = 1 + \\dfrac{1}{8}$ km.",
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Hugo joue du piano $\\dfrac{1}{4}$ d'heure par jour, 5 jours par semaine.\na) Écris la durée de la semaine avec un produit, puis calcule.\nb) Écris-la « entier + fraction ».\nc) Un quart d'heure dure 15 minutes. Combien de minutes en tout ? Écris-le en heures et minutes.",
          correction:
            "a) $5 \\times \\dfrac{1}{4} = \\dfrac{5}{4}$ d'heure : 5 quarts d'heure.\nb) 4 quarts font une heure : $\\dfrac{5}{4} = 1 + \\dfrac{1}{4}$ heure.\nc) 5 × 15 = 75 minutes. 1 heure = 60 minutes, et 75 − 60 = 15 : 1 h 15 min.\n⛔ Le piège : compter 25 minutes pour un quart d'heure, en pensant à 0,25. Une heure a 60 minutes : 60 ÷ 4 = 15.\nRéponse : a) $\\dfrac{5}{4}$ d'heure ; b) $1 + \\dfrac{1}{4}$ heure ; c) 75 minutes, soit 1 h 15 min.",
          schema: ecranSeulement(
            droiteRel(0, 1.5, 0.25, [], {
              sauts: [
                { de: 0, vers: 0.25, label: "1" },
                { de: 0.25, vers: 0.5, label: "2" },
                { de: 0.5, vers: 0.75, label: "3" },
                { de: 0.75, vers: 1, label: "4" },
                { de: 1, vers: 1.25, label: "5" },
              ],
              nombres: 1,
            }),
          ),
          micros: ["fraction_produit_entier"],
        },
        {
          enonce: "Complète.\na) $\\dfrac{1}{3}$ de 30 = …\nb) $\\dfrac{2}{3}$ de 30 = …\nc) $\\dfrac{3}{3}$ de 30 = …\nd) $\\dfrac{3}{5}$ de 40 = …\ne) $\\dfrac{7}{10}$ de 50 = …",
          correction:
            "Je partage par le nombre du BAS, puis je prends autant de parts que le nombre du HAUT.\na) 30 ÷ 3 = 10.\nb) 30 ÷ 3 = 10, puis 2 × 10 = 20.\nc) 30 ÷ 3 = 10, puis 3 × 10 = 30 : trois tiers, c'est le tout.\nd) 40 ÷ 5 = 8, puis 3 × 8 = 24.\ne) 50 ÷ 10 = 5, puis 7 × 5 = 35.\n⛔ Le piège du b) : diviser par le nombre du haut, 30 ÷ 2 = 15. Le bas partage, le haut prend.\nRéponse : a) 10 ; b) 20 ; c) 30 ; d) 24 ; e) 35.",
          schema: jetons(3, 10, [{ n: 20, nom: "2/3" }]),
          micros: ["fraction_quantite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je partage, je prends, j'ajoute, puis je vérifie.",
      rappel: [
        "Une fraction d'une quantité : je divise par le bas, puis je multiplie par le haut.",
        "Pour ajouter deux fractions, il faut des parts de même taille.",
        "Le tout, c'est 1 : ce qui reste, c'est 1 moins ce qui est pris.",
      ],
      exercices: [
        {
          titre: "Le match de football",
          enonce: "Un match de football dure 90 minutes, en deux mi-temps égales (Lois du jeu).\na) Quelle fraction du match dure une mi-temps ? Combien de minutes ?\nb) Inès, l'entraîneuse, fait jouer Théo pendant $\\dfrac{2}{3}$ du match. Combien de minutes ?\nc) Kenza joue la première mi-temps, puis $\\dfrac{1}{6}$ du match. Quelle fraction du match joue-t-elle ?\nd) Kenza joue-t-elle plus ou moins longtemps que Théo ?",
          correction:
            "a) 2 mi-temps égales : une mi-temps, c'est $\\dfrac{1}{2}$ du match. 90 ÷ 2 = 45 minutes.\nb) Je partage : 90 ÷ 3 = 30. Je prends 2 parts : 2 × 30 = 60 minutes.\nc) $\\dfrac{1}{2} = \\dfrac{3}{6}$. Donc $\\dfrac{1}{2} + \\dfrac{1}{6} = \\dfrac{3}{6} + \\dfrac{1}{6} = \\dfrac{4}{6}$. Je simplifie : $\\dfrac{4}{6} = \\dfrac{2}{3}$.\nd) Kenza joue $\\dfrac{2}{3}$ du match, comme Théo : autant, 60 minutes. Je vérifie : 45 + 15 = 60.\n⛔ Le piège du c) : $\\dfrac{1}{2} + \\dfrac{1}{6} = \\dfrac{2}{8}$. C'est moins qu'une mi-temps : impossible !\nRéponse : a) $\\dfrac{1}{2}$, 45 minutes ; b) 60 minutes ; c) $\\dfrac{2}{3}$ ; d) autant.",
          schema: disque(2, 3),
          micros: ["fraction_quantite", "fraction_additionner"],
        },
        {
          titre: "Les crêpes de la kermesse",
          enonce: "Pour 12 crêpes, Ana verse $\\dfrac{1}{2}$ litre de lait. Pour la kermesse, elle fait 3 fois la recette.\na) Combien de litres de lait verse-t-elle ? Écris-le « entier + fraction ».\nb) Elle a acheté 2 litres. Combien de lait reste-t-il ?\nc) Combien de crêpes fait-elle ?\nd) $\\dfrac{1}{3}$ des crêpes sont au sucre. Combien de crêpes au sucre ?",
          correction:
            "a) $3 \\times \\dfrac{1}{2} = \\dfrac{3}{2}$ litres. 2 demis font 1 : $\\dfrac{3}{2} = 1 + \\dfrac{1}{2}$ litre, soit 1,5 litre.\nb) $2 = \\dfrac{4}{2}$. $\\dfrac{4}{2} - \\dfrac{3}{2} = \\dfrac{1}{2}$ litre reste.\nc) 3 × 12 = 36 crêpes.\nd) 36 ÷ 3 = 12 crêpes au sucre.\n⛔ Le piège du a) : $3 \\times \\dfrac{1}{2} = \\dfrac{3}{6}$. Ce serait moins que pour une seule recette !\nRéponse : a) $1 + \\dfrac{1}{2}$ litre ; b) $\\dfrac{1}{2}$ litre ; c) 36 crêpes ; d) 12 crêpes.",
          schema: barres([{ d: 2, label: "lait", parts: [1, 1, 1], fois: 2 }]),
          micros: ["fraction_produit_entier", "fraction_additionner", "fraction_quantite"],
        },
        {
          titre: "Le refuge des tortues",
          enonce: "Au refuge, Nadia, vétérinaire, soigne 24 tortues. $\\dfrac{3}{8}$ sont des tortues de mer. $\\dfrac{1}{4}$ sont des tortues d'eau douce. Les autres sont des tortues de terre.\na) Combien de tortues de mer ?\nb) Combien de tortues d'eau douce ?\nc) Combien de tortues de terre ?\nd) Quelle fraction des tortues vit dans l'eau, mer et eau douce ensemble ?",
          figure: jetons(3, 8, [
            { n: 9, nom: "mer" },
            { n: 6, nom: "douce" },
          ], "terre"),
          correction:
            "a) 24 ÷ 8 = 3, puis 3 × 3 = 9 tortues de mer.\nb) 24 ÷ 4 = 6 tortues d'eau douce.\nc) 24 − 9 − 6 = 9 tortues de terre.\nd) $\\dfrac{1}{4} = \\dfrac{2}{8}$. Donc $\\dfrac{3}{8} + \\dfrac{1}{4} = \\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$.\n⭐ Je vérifie avec les nombres : 9 + 6 = 15 tortues, et $\\dfrac{5}{8}$ de 24 = 5 × 3 = 15. C'est juste.\n⛔ Le piège du d) : $\\dfrac{3}{8} + \\dfrac{1}{4} = \\dfrac{4}{12}$. Je redécoupe les quarts en huitièmes d'abord.\nRéponse : a) 9 ; b) 6 ; c) 9 ; d) $\\dfrac{5}{8}$.",
          micros: ["fraction_quantite", "fraction_additionner"],
        },
        {
          titre: "La haie du parc",
          enonce: "Une équipe de paysagistes plante une haie de 40 mètres. Lundi, elle plante $\\dfrac{1}{4}$ de la haie. Mardi, $\\dfrac{3}{8}$. Mercredi, le reste.\na) Quelle fraction de la haie est plantée lundi et mardi ?\nb) Quelle fraction reste pour mercredi ?\nc) Combien de mètres plante-t-elle mercredi ?\nd) Lundi, quel pourcentage de la haie est planté ?",
          figure: barres([{ d: 8, label: "haie", parts: [2, 3] }]),
          correction:
            "a) $\\dfrac{1}{4} = \\dfrac{2}{8}$. Donc $\\dfrac{1}{4} + \\dfrac{3}{8} = \\dfrac{2}{8} + \\dfrac{3}{8} = \\dfrac{5}{8}$.\nb) Toute la haie, c'est $\\dfrac{8}{8}$. $\\dfrac{8}{8} - \\dfrac{5}{8} = \\dfrac{3}{8}$.\nc) 40 ÷ 8 = 5, puis 3 × 5 = 15 mètres.\nd) $\\dfrac{1}{4} = \\dfrac{25}{100}$ : 25 % de la haie.\n⛔ Le piège du b) : calculer 8 − 5 sans le dénominateur, et écrire 3 mètres. Ce sont 3 HUITIÈMES de la haie.\nRéponse : a) $\\dfrac{5}{8}$ ; b) $\\dfrac{3}{8}$ ; c) 15 mètres ; d) 25 %.",
          micros: ["fraction_additionner", "fraction_quantite"],
        },
      ],
    },
  ],
};
