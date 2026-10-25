// ─── Fiche d'exercices : les fractions (CM2) — 20 exercices corrigés ──────────
//
// 25/10/2026 : la PREMIÈRE des trois feuilles de fractions du CM2 (avec
// `maths-cm2-fraction-mixte.tsx` et `maths-cm2-fraction-calcul.tsx`), une par
// notion du coach. Sur la forme de `maths-6e-fraction-nombre.tsx` et des
// feuilles CM2 `maths-cm2-tableau.tsx` / `maths-cm2-graphique.tsx` : 8 ★,
// 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-fractions.tsx` (même
// vocabulaire : numérateur en haut = parts prises, dénominateur en bas = parts
// du partage, « parts égales ») et sur la banque du coach réparée le 25/10
// (`lib/tutor-v4/questionBank/cm2/maths/fractions-gabarits-*.ts`, notionId
// fraction) : lire, représenter, placer sur la droite, comparer (même
// dénominateur, même numérateur, à 1, en redécoupant quand un dénominateur est
// multiple de l'autre), fractions égales et SIMPLIFIER, fraction décimale →
// nombre décimal → POURCENTAGE, défis (fraction d'une quantité, ÷ puis ×).
// ⛔ LIMITES DU CM2 : aucune addition de fractions (feuille `fraction-calcul`),
// pas d'écriture « entier + fraction » (feuille `fraction-mixte`).
// ⛔ Aucun exemple de la fiche de cours n'est repris (barre 3/4, disques 2/5
// et 2/6, grille 7/10, 3/4 et 5/4 sur la droite, 7/3, 3/8, 5/5, 1/2 au milieu).
//
// ⭐ CE QUE FRÉDÉRIC VOIT SUR LES COPIES (25/10) : ses élèves ne savent pas
// SIMPLIFIER, ni passer fraction → DÉCIMAL → POURCENTAGE. La feuille le
// prépare : fractions égales (7, 9, 13, 18, 19), 1/4 = 25/100 = 0,25 = 25 %
// sur la grille de 100 (10, 14, 15, 17, 18, 20).
// Les pièges nommés : les parts blanches mises en bas (1, 2), une seule ligne
// prise pour le tout (3), compter les traits au lieu des sauts (4), une
// fraction « toujours plus petite que 1 » (5), un grand dénominateur pris pour
// une grande fraction (6, 13), AJOUTER en haut et en bas (7, 15), des
// centièmes lus comme des dixièmes (8), diviser seulement le haut (9),
// 3/4 = 3,4 et 1/4 = 4 % (10, 15, 16, 17), comparer sans redécouper (11, 19),
// ranger aux « petits nombres » (12), 71 % = 7,1 (14), rapporter une part à
// une autre part (18), diviser par le haut (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : anniversaire (2), jardinage (3), course
// d'orientation (5), océans (14), sport (17, basket), art (18, fresque),
// musique (19), jeux (20, billes). Les métiers : jardinière (3), océanographe
// (14), arbitre (17), artiste peintre (18), batteur (19).
//
// ⭐ DES FAITS RÉELS, et leurs sources :
//   · ex. 14 — l'eau couvre environ 71 % de la surface de la Terre (USGS,
//     « How Much Water is There on Earth? » ; Vikidia, portail Eau).
//   · ex. 17 — un match de basket FIBA : 4 quarts-temps de 10 minutes, 40
//     minutes de jeu (Règles officielles du basket-ball FIBA, art. 8).
//   · ex. 19 — les durées des notes : ronde = 4 temps, blanche = 2, noire = 1,
//     croche = 1/2 temps (théorie musicale, solfège de base).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS (`dessins-fractions-cm2.tsx`) : des BARRES empilées, le DISQUE
// du coach, le RECTANGLE partagé en lignes × colonnes, la GRILLE DE 100, les
// deux barres de comparaison, la droite graduée, une grille de carreaux en
// couleurs et des BILLES rangées en parts égales. 13 dessins imprimés ; ceux
// qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm2-fraction.mjs`.
//
// Micro-compétences : fraction_lire (1, 2, 19), fraction_representer (2, 3,
// 13, 20), fraction_droite (4, 5, 12, 16), fraction_comparer (6, 11, 12, 13,
// 16, 19), fraction_equivalente (7, 9, 13, 15, 17, 18, 19), fraction_decimale
// (8, 10, 14, 15, 16, 17, 18, 20), fraction_defi (9, 14, 15, 17, 18, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, carreaux, cent, comparer, deuxDisques, disque, droiteRel, ecranSeulement, jetons, rect } from "@/lib/fiches-exercices/dessins-fractions-cm2";

export const exercicesFractionCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction",
  titre: "Les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une fraction, la dessiner, la placer sur la droite. Comparer deux fractions. Trouver des fractions égales et simplifier. Passer d'une fraction à un nombre à virgule, puis à un pourcentage. Une pizza, un potager, une course d'orientation, les océans, un match de basket, une fresque, des notes de musique et un sac de billes. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé et les parts dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/fraction", titre: "Les fractions" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte d'abord toutes les parts : c'est le nombre du bas.",
      rappel: [
        "Une fraction, ce sont des parts d'un tout coupé en parts ÉGALES.",
        "En haut, le numérateur : les parts prises. En bas, le dénominateur : toutes les parts du partage.",
        "Une fraction est aussi un nombre : elle a sa place sur la droite graduée.",
      ],
      exercices: [
        {
          enonce: "Quelle fraction de chaque barre est coloriée en bleu ?\nÉcris-la en chiffres, puis en lettres.",
          figure: barres([
            { d: 6, label: "A", parts: [5] },
            { d: 4, label: "B", parts: [1] },
            { d: 9, label: "C", parts: [4] },
          ]),
          correction:
            "Je compte d'abord TOUTES les parts : c'est le dénominateur, en bas.\nPuis je compte les parts bleues : c'est le numérateur, en haut.\nBarre A : 6 parts, 5 bleues. $\\dfrac{5}{6}$ : cinq sixièmes.\nBarre B : 4 parts, 1 bleue. $\\dfrac{1}{4}$ : un quart.\nBarre C : 9 parts, 4 bleues. $\\dfrac{4}{9}$ : quatre neuvièmes.\n⛔ Le piège : mettre en bas les parts BLANCHES. Pour B, on écrirait $\\dfrac{1}{3}$. En bas, je mets toutes les parts.\nRéponse : A : $\\dfrac{5}{6}$ ; B : $\\dfrac{1}{4}$ ; C : $\\dfrac{4}{9}$.",
          micros: ["fraction_lire"],
        },
        {
          enonce: "Pour son anniversaire, Chloé coupe une pizza en 8 parts égales. Ses amis mangent les parts bleues.\na) Quelle fraction de la pizza est mangée ?\nb) Quelle fraction reste ?\nc) Dans ta réponse au a), quel est le numérateur ? Et le dénominateur ?",
          figure: disque(5, 8),
          correction:
            "La pizza est coupée en 8 parts égales : le dénominateur est 8.\na) Je compte 5 parts bleues : $\\dfrac{5}{8}$ de la pizza est mangée.\nb) 8 − 5 = 3 parts restent : $\\dfrac{3}{8}$.\nc) Le numérateur, en haut, est 5. Le dénominateur, en bas, est 8.\n⭐ Je vérifie : 5 parts et 3 parts font 8 parts, toute la pizza. $\\dfrac{8}{8} = 1$.\n⛔ Le piège : écrire $\\dfrac{5}{3}$, les parts mangées sur les parts restantes. En bas, toujours TOUTES les parts.\nRéponse : a) $\\dfrac{5}{8}$ ; b) $\\dfrac{3}{8}$ ; c) numérateur 5, dénominateur 8.",
          micros: ["fraction_lire", "fraction_representer"],
        },
        {
          enonce: "Le potager de l'école est un rectangle partagé en carrés égaux. Inès, la jardinière, plante des tomates dans les carrés bleus.\na) Combien y a-t-il de carrés en tout ?\nb) Quelle fraction du potager a des tomates ?\nc) Jules veut planter des salades sur $\\dfrac{3}{20}$ du potager. Combien de carrés lui faut-il ?\nd) Après les salades, quelle fraction du potager reste vide ?",
          figure: rect(4, 5, 7),
          correction:
            "a) 4 lignes de 5 carrés : 4 × 5 = 20 carrés.\nb) Je compte 7 carrés bleus sur 20 : $\\dfrac{7}{20}$.\nc) Le dénominateur 20 dit : 20 carrés en tout. Le numérateur 3 dit : j'en prends 3. Il faut 3 carrés.\nd) 20 − 7 − 3 = 10 carrés vides : $\\dfrac{10}{20}$. C'est la moitié du potager !\n⛔ Le piège : prendre les 5 carrés d'une seule ligne pour le dénominateur. Le tout, c'est le potager entier.\nRéponse : a) 20 ; b) $\\dfrac{7}{20}$ ; c) 3 carrés ; d) $\\dfrac{10}{20}$, la moitié.",
          micros: ["fraction_representer"],
        },
        {
          enonce: "La droite est graduée de 0 à 1.\na) En combien de parts égales l'unité est-elle partagée ?\nb) Écris l'abscisse des points A, B et C avec une fraction.",
          figure: droiteRel(0, 1, 0.125, [
            { value: 0.25, label: "A" },
            { value: 0.625, label: "B" },
            { value: 0.875, label: "C" },
          ], { nombres: 1 }),
          correction:
            "a) Entre 0 et 1, je compte les SAUTS d'une graduation à l'autre : 8 sauts. Chaque saut vaut $\\dfrac{1}{8}$.\nb) A est à 2 sauts de 0 : $\\dfrac{2}{8}$.\nB est à 5 sauts de 0 : $\\dfrac{5}{8}$.\nC est à 7 sauts de 0 : $\\dfrac{7}{8}$.\n⛔ Le piège : compter les TRAITS, 0 compris. Pour A, on trouverait 3. Je compte les sauts.\nRéponse : a) 8 parts ; b) A : $\\dfrac{2}{8}$ ; B : $\\dfrac{5}{8}$ ; C : $\\dfrac{7}{8}$.",
          micros: ["fraction_droite"],
        },
        {
          enonce: "Le sentier d'une course d'orientation fait 2 km. Une balise est posée tous les tiers de kilomètre.\na) Place sur la droite les balises à $\\dfrac{1}{3}$ ; $\\dfrac{2}{3}$ ; $\\dfrac{4}{3}$ et $\\dfrac{5}{3}$ km du départ.\nb) Lesquelles sont après 1 km ?",
          figure: droiteRel(0, 2, 1 / 3, [], { nombres: 1 }),
          correction:
            "Entre 0 et 1, il y a 3 sauts égaux : chaque saut vaut $\\dfrac{1}{3}$.\na) $\\dfrac{1}{3}$ : 1 saut depuis 0. $\\dfrac{2}{3}$ : 2 sauts.\n$\\dfrac{3}{3}$ tombe pile sur 1.\n$\\dfrac{4}{3}$ : 4 sauts, soit 1 saut après 1. $\\dfrac{5}{3}$ : 5 sauts, soit 2 sauts après 1.\nb) $\\dfrac{4}{3}$ et $\\dfrac{5}{3}$ : leur numérateur dépasse 3.\n⛔ Le piège : placer $\\dfrac{4}{3}$ avant 1. Une fraction dépasse 1 dès que le haut dépasse le bas.\nRéponse : b) les balises à $\\dfrac{4}{3}$ et $\\dfrac{5}{3}$ km.",
          schema: ecranSeulement(
            droiteRel(0, 2, 1 / 3, [
              { value: 1 / 3, label: "1/3" },
              { value: 2 / 3, label: "2/3" },
              { value: 4 / 3, label: "4/3" },
              { value: 5 / 3, label: "5/3" },
            ], { nombres: 1 }),
          ),
          micros: ["fraction_droite"],
        },
        {
          enonce: "Compare avec <, > ou =.\na) $\\dfrac{3}{7}$ et $\\dfrac{5}{7}$\nb) $\\dfrac{2}{3}$ et $\\dfrac{2}{5}$\nc) $\\dfrac{9}{8}$ et 1\nd) $\\dfrac{6}{6}$ et 1",
          correction:
            "a) Même dénominateur : les parts ont la même taille. 3 parts contre 5 parts. $\\dfrac{3}{7} < \\dfrac{5}{7}$.\nb) Même numérateur : 2 parts de chaque côté. Mais un tiers est plus GROS qu'un cinquième. $\\dfrac{2}{3} > \\dfrac{2}{5}$.\nc) $\\dfrac{8}{8} = 1$, et 9 huitièmes, c'est un huitième de plus. $\\dfrac{9}{8} > 1$.\nd) 6 parts sur 6, c'est toute l'unité. $\\dfrac{6}{6} = 1$.\n⛔ Le piège du b) : croire $\\dfrac{2}{5}$ plus grand « parce que 5 est plus grand que 3 ». Plus je coupe, plus les parts sont PETITES.\nRéponse : a) < ; b) > ; c) > ; d) =.",
          schema: ecranSeulement(comparer([2, 3], [2, 5])),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Complète les fractions égales.\na) $\\dfrac{1}{2} = \\dfrac{\\ldots}{4} = \\dfrac{\\ldots}{8} = \\dfrac{5}{\\ldots}$\nb) $\\dfrac{1}{3} = \\dfrac{2}{\\ldots} = \\dfrac{\\ldots}{9}$",
          correction:
            "Deux fractions sont égales quand je multiplie le haut ET le bas par le même nombre.\na) En bas, 2 × 2 = 4. Donc en haut, 1 × 2 = 2 : $\\dfrac{2}{4}$.\nEn bas, 2 × 4 = 8. Donc en haut, 1 × 4 = 4 : $\\dfrac{4}{8}$.\nEn haut, 1 × 5 = 5. Donc en bas, 2 × 5 = 10 : $\\dfrac{5}{10}$.\nb) En haut, 1 × 2 = 2. Donc en bas, 3 × 2 = 6 : $\\dfrac{2}{6}$.\nEn bas, 3 × 3 = 9. Donc en haut, 1 × 3 = 3 : $\\dfrac{3}{9}$.\n⭐ Sur les barres, la partie bleue a toujours la même longueur : c'est la même quantité.\n⛔ Le piège : AJOUTER le même nombre en haut et en bas. $\\dfrac{1}{2}$ et $\\dfrac{2}{3}$ ne sont pas égales.\nRéponse : a) $\\dfrac{1}{2} = \\dfrac{2}{4} = \\dfrac{4}{8} = \\dfrac{5}{10}$ ; b) $\\dfrac{1}{3} = \\dfrac{2}{6} = \\dfrac{3}{9}$.",
          schema: ecranSeulement(
            barres([
              { d: 2, label: "1/2", parts: [1] },
              { d: 4, label: "2/4", parts: [2] },
              { d: 8, label: "4/8", parts: [4] },
            ]),
          ),
          micros: ["fraction_equivalente"],
        },
        {
          enonce: "Écris chaque fraction décimale avec une virgule.\na) $\\dfrac{3}{10}$\nb) $\\dfrac{9}{10}$\nc) $\\dfrac{45}{100}$\nd) $\\dfrac{6}{100}$",
          correction:
            "Le dénominateur dit le rang : 10, ce sont des dixièmes ; 100, des centièmes.\na) 3 dixièmes : $\\dfrac{3}{10} = 0{,}3$.\nb) 9 dixièmes : $\\dfrac{9}{10} = 0{,}9$.\nc) 45 centièmes : $\\dfrac{45}{100} = 0{,}45$. Sur la grille de 100, ce sont 45 cases.\nd) 6 centièmes : le 6 va au rang des centièmes. $\\dfrac{6}{100} = 0{,}06$.\n⛔ Le piège du d) : écrire 0,6. Ça, ce sont 6 DIXIÈMES. Des centièmes ont deux chiffres après la virgule.\nRéponse : a) 0,3 ; b) 0,9 ; c) 0,45 ; d) 0,06.",
          schema: ecranSeulement(cent(45)),
          micros: ["fraction_decimale"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine les parts au brouillon avant de répondre.",
      rappel: [
        "Simplifier, c'est DIVISER le haut ET le bas par le même nombre : 6 huitièmes = 3 quarts.",
        "Pour comparer, je veux des parts de même taille : je redécoupe, puis je compare les numérateurs.",
        "Un pourcentage, ce sont des centièmes : un quart = 25 centièmes = 0,25 = 25 %.",
      ],
      exercices: [
        {
          enonce: "Simplifier, c'est trouver une fraction égale avec des nombres plus petits.\na) Simplifie $\\dfrac{6}{8}$ en divisant le haut et le bas par 2.\nb) Simplifie $\\dfrac{10}{15}$, puis $\\dfrac{4}{12}$.\nc) Malik écrit : $\\dfrac{6}{8} = \\dfrac{3}{8}$. Il a divisé seulement le haut par 2. A-t-il raison ?",
          correction:
            "Pour simplifier, je DIVISE le haut ET le bas par le même nombre.\na) 6 ÷ 2 = 3 et 8 ÷ 2 = 4. Donc $\\dfrac{6}{8} = \\dfrac{3}{4}$.\nb) 10 et 15 sont dans la table de 5 : 10 ÷ 5 = 2 et 15 ÷ 5 = 3. Donc $\\dfrac{10}{15} = \\dfrac{2}{3}$.\n4 et 12 sont dans la table de 4 : 4 ÷ 4 = 1 et 12 ÷ 4 = 3. Donc $\\dfrac{4}{12} = \\dfrac{1}{3}$.\nc) Non. $\\dfrac{3}{8}$, c'est la moitié de $\\dfrac{6}{8}$ : la quantité a changé. La bonne réponse est $\\dfrac{3}{4}$.\n⭐ Sur les barres, $\\dfrac{6}{8}$ et $\\dfrac{3}{4}$ ont la même longueur bleue.\n⛔ Le piège : diviser seulement le haut, ou seulement le bas. Le haut ET le bas, toujours.\nRéponse : a) $\\dfrac{3}{4}$ ; b) $\\dfrac{2}{3}$ et $\\dfrac{1}{3}$ ; c) non, $\\dfrac{6}{8} = \\dfrac{3}{4}$.",
          schema: barres([
            { d: 8, label: "6/8", parts: [6] },
            { d: 4, label: "3/4", parts: [3] },
            { d: 8, label: "3/8", parts: [3] },
          ]),
          micros: ["fraction_equivalente", "fraction_defi"],
        },
        {
          enonce: "La grille de 100 cases, c'est l'unité. Une case, c'est 1 %.\nÉcris chaque fraction sur 100, puis avec une virgule, puis en pourcentage.\na) $\\dfrac{1}{4}$\nb) $\\dfrac{1}{2}$\nc) $\\dfrac{3}{4}$\nd) $\\dfrac{1}{5}$",
          correction:
            "Je passe d'abord en centièmes : je multiplie le haut et le bas pour avoir 100 en bas.\na) 4 × 25 = 100. $\\dfrac{1}{4} = \\dfrac{25}{100} = 0{,}25$, soit 25 %. Sur la grille : 25 cases.\nb) 2 × 50 = 100. $\\dfrac{1}{2} = \\dfrac{50}{100} = 0{,}5$, soit 50 %.\nc) 4 × 25 = 100. $\\dfrac{3}{4} = \\dfrac{75}{100} = 0{,}75$, soit 75 %.\nd) 5 × 20 = 100. $\\dfrac{1}{5} = \\dfrac{20}{100} = 0{,}2$, soit 20 %.\n⛔ Le piège : écrire 3,4 pour trois quarts. La barre de fraction n'est pas une virgule : trois quarts, c'est 3 ÷ 4 = 0,75.\n⛔ Autre piège : écrire 4 % pour un quart. Un quart de la grille, ce sont 25 cases : 25 %.\nRéponse : a) 0,25 et 25 % ; b) 0,5 et 50 % ; c) 0,75 et 75 % ; d) 0,2 et 20 %.",
          schema: cent(25),
          micros: ["fraction_decimale"],
        },
        {
          enonce: "Compare en redécoupant.\na) $\\dfrac{3}{4}$ et $\\dfrac{5}{8}$\nb) $\\dfrac{2}{3}$ et $\\dfrac{5}{6}$\nc) $\\dfrac{1}{2}$ et $\\dfrac{3}{8}$",
          correction:
            "Un dénominateur est un multiple de l'autre : je coupe chaque part en morceaux égaux.\na) 4 × 2 = 8 : $\\dfrac{3}{4} = \\dfrac{6}{8}$. Et $\\dfrac{6}{8} > \\dfrac{5}{8}$, donc $\\dfrac{3}{4} > \\dfrac{5}{8}$.\nb) 3 × 2 = 6 : $\\dfrac{2}{3} = \\dfrac{4}{6}$. Et $\\dfrac{4}{6} < \\dfrac{5}{6}$, donc $\\dfrac{2}{3} < \\dfrac{5}{6}$.\nc) 2 × 4 = 8 : $\\dfrac{1}{2} = \\dfrac{4}{8}$. Et $\\dfrac{4}{8} > \\dfrac{3}{8}$, donc $\\dfrac{1}{2} > \\dfrac{3}{8}$.\n⛔ Le piège du a) : dire que $\\dfrac{5}{8}$ est plus grand « parce que 5 est plus grand que 3 ». Je compare les numérateurs seulement quand les parts ont la même taille.\nRéponse : a) $\\dfrac{3}{4} > \\dfrac{5}{8}$ ; b) $\\dfrac{2}{3} < \\dfrac{5}{6}$ ; c) $\\dfrac{1}{2} > \\dfrac{3}{8}$.",
          schema: comparer([3, 4], [5, 8]),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "Range ces nombres du plus petit au plus grand.\n$\\dfrac{3}{4}$ ; $\\dfrac{1}{2}$ ; $\\dfrac{5}{4}$ ; $\\dfrac{1}{4}$ ; 1",
          correction:
            "Je mets tout en quarts : $\\dfrac{1}{2} = \\dfrac{2}{4}$ et $1 = \\dfrac{4}{4}$.\nJe range les numérateurs : 1 < 2 < 3 < 4 < 5.\nSur la droite, chaque saut vaut un quart : je vérifie l'ordre.\n⛔ Le piège : mettre $\\dfrac{1}{2}$ en premier parce que ses nombres sont petits. $\\dfrac{1}{2}$, ce sont 2 quarts : plus que $\\dfrac{1}{4}$.\nRéponse : $\\dfrac{1}{4} < \\dfrac{1}{2} < \\dfrac{3}{4} < 1 < \\dfrac{5}{4}$.",
          schema: ecranSeulement(
            droiteRel(0, 1.5, 0.25, [
              { value: 0.25, label: "1/4" },
              { value: 0.5, label: "1/2" },
              { value: 0.75, label: "3/4" },
              { value: 1.25, label: "5/4" },
            ], { nombres: 0.5 }),
          ),
          micros: ["fraction_comparer", "fraction_droite"],
        },
        {
          enonce: "Hugo et Jade ont deux tartes de même taille. Hugo mange $\\dfrac{3}{9}$ de la sienne. Jade mange $\\dfrac{1}{3}$ de la sienne.\na) Qui a mangé le plus ?\nb) Écris une fraction égale à $\\dfrac{1}{3}$ avec le dénominateur 12.\nc) Ilan mange $\\dfrac{3}{6}$ d'une tarte. Écris cette fraction plus simplement.",
          figure: deuxDisques([3, 9], [1, 3]),
          correction:
            "a) Sur les disques, la partie bleue a la même taille.\nJe divise le haut et le bas de $\\dfrac{3}{9}$ par 3 : $\\dfrac{3}{9} = \\dfrac{1}{3}$. Ils ont mangé autant l'un que l'autre.\nb) 3 × 4 = 12, donc en haut 1 × 4 = 4 : $\\dfrac{1}{3} = \\dfrac{4}{12}$.\nc) 3 ÷ 3 = 1 et 6 ÷ 3 = 2 : $\\dfrac{3}{6} = \\dfrac{1}{2}$, la moitié de la tarte.\n⛔ Le piège du a) : dire Hugo « parce que 3 est plus grand que 1 ». Ses parts sont 3 fois plus petites.\nRéponse : a) autant tous les deux ; b) $\\dfrac{4}{12}$ ; c) $\\dfrac{1}{2}$.",
          micros: ["fraction_equivalente", "fraction_representer", "fraction_comparer"],
        },
        {
          enonce: "Lou est océanographe. Elle explique : l'eau couvre environ 71 % de la surface de la Terre.\na) Écris 71 % en fraction sur 100, puis avec une virgule.\nb) Est-ce plus ou moins que les $\\dfrac{3}{4}$ de la surface ?\nc) Est-ce plus ou moins que $\\dfrac{7}{10}$ de la surface ?\nd) Quel pourcentage de la surface n'est pas couvert d'eau ?",
          correction:
            "a) 71 % veut dire 71 sur 100 : $\\dfrac{71}{100} = 0{,}71$. Sur la grille de 100 : 71 cases.\nb) $\\dfrac{3}{4} = \\dfrac{75}{100}$, soit 75 %. Et 71 < 75 : un peu MOINS que les trois quarts.\nc) $\\dfrac{7}{10} = \\dfrac{70}{100}$, soit 70 %. Et 71 > 70 : un peu PLUS que sept dixièmes.\nd) 100 − 71 = 29 : 29 % de la surface n'est pas couvert d'eau.\n⛔ Le piège : écrire 7,1 pour 71 %. Un pourcentage, ce sont des centièmes : 71 % = 0,71.\nRéponse : a) $\\dfrac{71}{100}$ et 0,71 ; b) moins ; c) plus ; d) 29 %.",
          schema: ecranSeulement(cent(71)),
          micros: ["fraction_decimale", "fraction_defi"],
        },
        {
          enonce: "Trois élèves se trompent. Trouve la bonne réponse.\na) Tom : « $\\dfrac{3}{4} = 3{,}4$. »\nb) Léa : « $\\dfrac{2}{3} = \\dfrac{3}{4}$, car j'ajoute 1 en haut et en bas. »\nc) Sam : « $\\dfrac{1}{4}$, c'est 4 %. »",
          correction:
            "a) La barre de fraction n'est pas une virgule. Trois quarts, c'est 3 ÷ 4 = 0,75. Ou : $\\dfrac{3}{4} = \\dfrac{75}{100} = 0{,}75$.\nb) Ajouter le même nombre en haut et en bas change la fraction. $\\dfrac{2}{3} = \\dfrac{8}{12}$ et $\\dfrac{3}{4} = \\dfrac{9}{12}$ : elles ne sont pas égales. Pour une fraction égale, je multiplie : $\\dfrac{2}{3} = \\dfrac{4}{6}$.\nc) Un quart de la grille de 100, ce sont 100 ÷ 4 = 25 cases : 25 %.\n⛔ Trois pièges à retenir : la barre n'est pas une virgule ; jamais « + » en haut et en bas ; un quart, c'est 25 %, pas 4 %.\nRéponse : a) 0,75 ; b) $\\dfrac{2}{3} = \\dfrac{4}{6}$ ; c) 25 %.",
          schema: ecranSeulement(cent(25)),
          micros: ["fraction_defi", "fraction_decimale", "fraction_equivalente"],
        },
        {
          enonce: "La droite est graduée en demis.\na) Écris l'abscisse des points A, B et C avec une fraction.\nb) Lesquels sont plus grands que 1 ?\nc) Écris $\\dfrac{3}{2}$ avec une virgule.",
          figure: droiteRel(0, 3, 0.5, [
            { value: 1.5, label: "A" },
            { value: 0.5, label: "B" },
            { value: 2.5, label: "C" },
          ], { nombres: 1 }),
          correction:
            "Entre 0 et 1, il y a 2 sauts : chaque saut vaut $\\dfrac{1}{2}$.\na) A est à 3 sauts de 0 : $\\dfrac{3}{2}$. B est à 1 saut : $\\dfrac{1}{2}$. C est à 5 sauts : $\\dfrac{5}{2}$.\nb) A et C : leur numérateur dépasse 2.\nc) $\\dfrac{3}{2}$, c'est 1 et une moitié : $\\dfrac{3}{2} = 1{,}5$.\n⛔ Le piège du c) : écrire 3,2. La barre de fraction n'est pas une virgule.\nRéponse : a) A : $\\dfrac{3}{2}$ ; B : $\\dfrac{1}{2}$ ; C : $\\dfrac{5}{2}$ ; b) A et C ; c) 1,5.",
          micros: ["fraction_droite", "fraction_comparer", "fraction_decimale"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris la part en fraction, je simplifie, puis je réponds.",
      rappel: [
        "Une part d'un tout s'écrit en fraction. En bas, TOUT le tout : 6 carreaux sur 12 s'écrivent 6 douzièmes.",
        "Pour prendre une fraction d'un nombre : je divise par le nombre du bas, puis je multiplie par celui du haut.",
        "Je vérifie sur le dessin, puis je réponds par une phrase courte.",
      ],
      exercices: [
        {
          titre: "Le match de basket",
          enonce: "Au basket, un match officiel (règles FIBA) dure 40 minutes. Il se joue en 4 quarts-temps de 10 minutes.\na) Quelle fraction du match dure un quart-temps ?\nb) Écris cette fraction en pourcentage.\nc) Après 3 quarts-temps, quelle fraction du match est jouée ? Combien de minutes ?\nd) Nora, l'arbitre, siffle la mi-temps après 2 quarts-temps. Écris $\\dfrac{2}{4}$ plus simplement.",
          correction:
            "a) Le match est partagé en 4 parts égales : un quart-temps, c'est $\\dfrac{1}{4}$ du match.\nb) $\\dfrac{1}{4} = \\dfrac{25}{100}$ : 25 % du match.\nc) 3 quarts-temps : $\\dfrac{3}{4}$ du match. 3 × 10 = 30 minutes. Et $\\dfrac{3}{4} = \\dfrac{75}{100}$ : 75 % du match.\nd) 2 ÷ 2 = 1 et 4 ÷ 2 = 2 : $\\dfrac{2}{4} = \\dfrac{1}{2}$. C'est la moitié du match : 20 minutes.\n⛔ Le piège du b) : écrire 4 %. Un quart, c'est 25 % : 25 + 25 + 25 + 25 = 100.\nRéponse : a) $\\dfrac{1}{4}$ ; b) 25 % ; c) $\\dfrac{3}{4}$, 30 minutes ; d) $\\dfrac{1}{2}$.",
          schema: ecranSeulement(disque(3, 4)),
          micros: ["fraction_defi", "fraction_decimale", "fraction_equivalente"],
        },
        {
          titre: "La fresque de la classe",
          enonce: "Avec Awa, artiste peintre, la classe peint une fresque de 12 carreaux égaux : la mer, le sable, la forêt, et un carreau encore vide.\na) Écris la fraction de la fresque pour chaque partie.\nb) Simplifie la fraction de la mer, puis celle du sable.\nc) Écris la fraction de la mer en pourcentage.\nd) La mer et le sable ensemble couvrent-ils plus des $\\dfrac{3}{4}$ de la fresque ?",
          figure: carreaux(3, 4, [
            { n: 6, nom: "mer" },
            { n: 3, nom: "sable" },
            { n: 2, nom: "forêt" },
          ], "vide"),
          correction:
            "a) Le tout, ce sont les 12 carreaux. Mer : $\\dfrac{6}{12}$ ; sable : $\\dfrac{3}{12}$ ; forêt : $\\dfrac{2}{12}$ ; vide : $\\dfrac{1}{12}$.\nb) 6 ÷ 6 = 1 et 12 ÷ 6 = 2 : $\\dfrac{6}{12} = \\dfrac{1}{2}$.\n3 ÷ 3 = 1 et 12 ÷ 3 = 4 : $\\dfrac{3}{12} = \\dfrac{1}{4}$.\nc) $\\dfrac{1}{2} = \\dfrac{50}{100}$ : 50 %.\nd) Ensemble : 6 + 3 = 9 carreaux, soit $\\dfrac{9}{12}$. Et $\\dfrac{3}{4} = \\dfrac{9}{12}$ (× 3 en haut et en bas). Pas plus : exactement les trois quarts.\n⛔ Le piège du a) : écrire $\\dfrac{6}{3}$ pour la mer, en comparant au sable. Une fraction de la fresque se rapporte au TOUT : les 12 carreaux.\nRéponse : a) $\\dfrac{6}{12}$, $\\dfrac{3}{12}$, $\\dfrac{2}{12}$, $\\dfrac{1}{12}$ ; b) $\\dfrac{1}{2}$ et $\\dfrac{1}{4}$ ; c) 50 % ; d) non, exactement $\\dfrac{3}{4}$.",
          micros: ["fraction_defi", "fraction_equivalente", "fraction_decimale"],
        },
        {
          titre: "Les notes de musique",
          enonce: "En musique, une ronde dure 4 temps. Une blanche dure la moitié d'une ronde. Une noire dure un quart de ronde. Une croche dure la moitié d'une noire.\na) Quelle fraction de ronde dure une croche ?\nb) Combien de noires pour une blanche ? Écris $\\dfrac{2}{4}$ plus simplement.\nc) Léon, batteur, joue 3 croches. Est-ce plus ou moins long qu'une noire ?\nd) Combien de croches dans une ronde ?",
          figure: barres([
            { d: 1, label: "ronde", parts: [1] },
            { d: 2, label: "blanche", parts: [1] },
            { d: 4, label: "noire", parts: [1] },
            { d: 8, label: "croche", parts: [1] },
          ]),
          correction:
            "Sur les barres, la ronde est le tout : la barre entière.\na) Une noire, c'est $\\dfrac{1}{4}$ de ronde. Une croche en est la moitié : la ronde est coupée en 8. Une croche dure $\\dfrac{1}{8}$ de ronde.\nb) Une blanche = 2 noires, soit $\\dfrac{2}{4}$ de ronde. Et $\\dfrac{2}{4} = \\dfrac{1}{2}$ : une demi-ronde.\nc) Une noire = 2 croches, soit $\\dfrac{2}{8}$ de ronde. 3 croches font $\\dfrac{3}{8}$. Et $\\dfrac{3}{8} > \\dfrac{2}{8}$ : c'est plus long.\nd) La ronde est coupée en 8 croches : $\\dfrac{8}{8} = 1$.\n⛔ Le piège du c) : comparer 3 et 1 sans regarder la taille des parts. Je passe tout en huitièmes.\nRéponse : a) $\\dfrac{1}{8}$ ; b) 2 noires, $\\dfrac{1}{2}$ ; c) plus long ; d) 8 croches.",
          micros: ["fraction_lire", "fraction_equivalente", "fraction_comparer"],
        },
        {
          titre: "Le sac de billes",
          enonce: "Lina a 20 billes, rangées par 5. Un quart des billes sont bleues. Deux cinquièmes sont orange. Les autres sont vertes.\na) Combien de billes bleues ?\nb) Combien de billes orange ?\nc) Combien de billes vertes ? Quelle fraction des billes ?\nd) Écris la part des billes vertes en pourcentage.",
          figure: jetons(4, 5, [
            { n: 5, nom: "bleues" },
            { n: 8, nom: "orange" },
            { n: 7, nom: "vertes" },
          ]),
          correction:
            "a) $\\dfrac{1}{4}$ de 20 : je partage 20 en 4 parts égales. 20 ÷ 4 = 5 billes bleues : une rangée sur quatre.\nb) $\\dfrac{2}{5}$ de 20 : je partage en 5 parts égales, 20 ÷ 5 = 4. J'en prends 2 : 2 × 4 = 8 billes orange.\nc) 20 − 5 − 8 = 7 billes vertes : $\\dfrac{7}{20}$ des billes.\nd) 20 × 5 = 100 : $\\dfrac{7}{20} = \\dfrac{35}{100}$, soit 35 %.\n⛔ Le piège du b) : calculer 20 ÷ 2. Je divise par le nombre du BAS, puis je multiplie par celui du HAUT.\nRéponse : a) 5 ; b) 8 ; c) 7, soit $\\dfrac{7}{20}$ ; d) 35 %.",
          micros: ["fraction_defi", "fraction_representer", "fraction_decimale"],
        },
      ],
    },
  ],
};
