// ─── Fiche d'exercices : les nombres décimaux (CM1) — 20 exercices corrigés ───
//
// 10/11/2026 : feuille interactive de la notion `nombre_decimal` du coach CM1
// (12 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par étape,
// avec le piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur la carte mentale `cm1/nombre_decimal` (`lib/cartes/remplies/
// cm1.json`) et sur les banques `decimaux.bank.ts`, `decimal-droite.gen.ts`,
// `fractions-decimaux-trous.bank.ts` : lire et écrire, fraction décimale ↔
// nombre décimal, valeur d'un chiffre, comparer, ranger, droite graduée,
// arrondir à l'unité, somme de fractions décimales, × et ÷ par 10 ou 100,
// ajouter des dixièmes et des centièmes, défis.
// ⛔ LIMITES DU CM1 : décimaux jusqu'aux CENTIÈMES, arrondi à l'unité seulement.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot.
//
// Les pièges nommés : 2,7 pour « sept centièmes » (1), 0,3 pour 3/100 (2), le 6
// de 4,56 lu en unités (3), comparer 65 et 7 (4, 15), compter les nombres au
// lieu des traits (5, 13), 3,5 arrondi à 3 (6, 14), 2 + 35/10 (7), « ajouter
// un zéro » (8, 16), ranger d'après la longueur (9, 19), 35 > 4 donc
// 35/100 > 4/10 (10), 1,9 + 0,1 = 1,10 (11, 19), 7,5 pour 7,05 € (12),
// additionner sans aligner les virgules (17), un écart lu en dixièmes (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (1), mesures (3), sciences de la
// nature (9, grenouilles), philatélie et monnaie (16), papeterie (12, 17),
// athlétisme (18), soins aux animaux (19), jeux (20).
// Les métiers des problèmes : libraire (17), juge d'athlétisme (18),
// vétérinaire (19), créatrice de jeux (20).
// Tous les nombres sont des MODÈLES (aucun fait réel).
//
// Micro-compétences : decimal_lire (1, 12), decimal_fraction (2, 12),
// decimal_valeur_chiffre (3, 15, 20), decimal_comparer (4, 15, 18),
// decimal_ordonner (9, 19), decimal_droite (5, 13), decimal_arrondir (6, 14,
// 18, 20), decimal_somme_fractions (7), fraction_decimale_comparer (10),
// decimal_puissance_dix (8, 16, 20), decimal_ajouter_dixiemes (11, 19),
// decimal_defi (17, 18, 19, 20). 12/12.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel, ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

export const exercicesNombreDecimalCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "nombre-decimal",
  titre: "Les nombres décimaux",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire et écrire un nombre à virgule. Passer d'une fraction décimale au nombre décimal. Trouver la valeur d'un chiffre. Comparer, ranger, placer sur la droite graduée. Arrondir à l'unité. Multiplier et diviser par 10 ou 100. Des grenouilles qui sautent, des timbres, un saut en longueur, des chatons chez la vétérinaire et une énigme. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien la place de chaque chiffre.",
      rappel: [
        "La virgule sépare les unités des chiffres après la virgule.",
        "Après la virgule : le 1er chiffre donne les dixièmes, le 2e les centièmes.",
        "Un dixième : $\\dfrac{1}{10} = 0{,}1$. Un centième : $\\dfrac{1}{100} = 0{,}01$.",
      ],
      exercices: [
        {
          enonce:
            "Écris chaque nombre en chiffres.\na) trois unités et quatre dixièmes\nb) deux unités et sept centièmes\nc) douze unités et quarante-cinq centièmes\nd) zéro unité et huit dixièmes",
          reponses: [
            { question: "a)", attendu: "3,4" },
            { question: "b)", attendu: "2,07" },
            { question: "c)", attendu: "12,45" },
            { question: "d)", attendu: "0,8" },
          ],
          correction:
            "J'écris les unités, puis la virgule.\nJuste après la virgule, je mets les dixièmes. Puis les centièmes.\na) 3 unités, virgule, 4 dixièmes : $3{,}4$.\nb) 2 unités. Il n'y a pas de dixièmes : je mets un 0. Puis les 7 centièmes : $2{,}07$.\nc) 12 unités. 45 centièmes, c'est 4 dixièmes et 5 centièmes : $12{,}45$.\nd) 0 unité, virgule, 8 dixièmes : $0{,}8$.\n⛔ Le piège : écrire $2{,}7$ au b). $2{,}7$, c'est 7 DIXIÈMES. Pour les centièmes, il faut le 0 avant.\nRéponse : a) $3{,}4$ ; b) $2{,}07$ ; c) $12{,}45$ ; d) $0{,}8$.",
          micros: ["decimal_lire"],
        },
        {
          enonce:
            "Écris chaque fraction comme un nombre à virgule.\na) $\\dfrac{7}{10}$\nb) $\\dfrac{45}{100}$\nc) $\\dfrac{3}{100}$\nd) Complète : $0{,}6 = \\dfrac{…}{10}$",
          reponses: [
            { question: "a)", attendu: "0,7", exact: true },
            { question: "b)", attendu: "0,45", exact: true },
            { question: "c)", attendu: "0,03", exact: true },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "Le nombre du bas me dit où s'arrête le nombre.\n10 en bas : des dixièmes, UN chiffre après la virgule. 100 en bas : des centièmes, DEUX chiffres.\na) 7 dixièmes : $\\dfrac{7}{10} = 0{,}7$.\nb) 45 centièmes : $\\dfrac{45}{100} = 0{,}45$.\nc) 3 centièmes : il faut deux chiffres après la virgule. $\\dfrac{3}{100} = 0{,}03$.\nd) $0{,}6$, ce sont 6 dixièmes : $0{,}6 = \\dfrac{6}{10}$.\n⛔ Le piège : écrire $0{,}3$ au c). $0{,}3$, c'est $\\dfrac{3}{10}$, dix fois plus.\nRéponse : a) $0{,}7$ ; b) $0{,}45$ ; c) $0{,}03$ ; d) 6.",
          micros: ["decimal_fraction"],
        },
        {
          enonce:
            "Un ruban mesure 4,56 m. Une planche mesure 37,08 dm.\na) Dans 4,56, le chiffre 5 est le chiffre des… ?\nb) Dans 4,56, combien vaut le chiffre 6 ? Écris-le avec une virgule.\nc) Dans 37,08, quel est le chiffre des dixièmes ?\nd) Dans 37,08, quel est le chiffre des dizaines ?",
          reponses: [
            { question: "a)", attendu: ["dixièmes", "des dixièmes", "les dixièmes"] },
            { question: "b)", attendu: "0,06", exact: true },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "3" },
          ],
          correction:
            "Je nomme chaque place. Avant la virgule : unités, puis dizaines à gauche. Après : dixièmes, puis centièmes.\na) Dans $4{,}56$, le 5 est juste après la virgule : c'est le chiffre des dixièmes.\nb) Le 6 est le 2e chiffre après la virgule : 6 centièmes, soit $0{,}06$.\nc) Dans $37{,}08$, juste après la virgule, il y a 0 : le chiffre des dixièmes est 0.\nd) Avant la virgule : 7 unités et 3 dizaines. Le chiffre des dizaines est 3.\n⛔ Le piège du b) : dire que le 6 vaut 6. Il vaut 6 centièmes, $0{,}06$.\nRéponse : a) les dixièmes ; b) $0{,}06$ ; c) 0 ; d) 3.",
          micros: ["decimal_valeur_chiffre"],
        },
        {
          enonce: "Compare avec < ou >.\na) 2,7 … 2,65\nb) 5,09 … 5,1\nc) 0,8 … 0,75\nd) 12,4 … 12,41",
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: "<" },
          ],
          correction:
            "Je compare d'abord les unités. Si elles sont égales, les dixièmes. Puis les centièmes.\na) Mêmes unités, 2. Dixièmes : 7 contre 6. $2{,}7 > 2{,}65$.\nb) Mêmes unités, 5. Dixièmes : 0 contre 1. $5{,}09 < 5{,}1$.\nc) Mêmes unités, 0. Dixièmes : 8 contre 7. $0{,}8 > 0{,}75$.\nd) Mêmes unités, mêmes dixièmes. Centièmes : $12{,}4 = 12{,}40$, et 0 < 1. $12{,}4 < 12{,}41$.\n⛔ Le piège : comparer 65 et 7 au a). Le nombre le plus long n'est pas forcément le plus grand.\nRéponse : a) > ; b) < ; c) > ; d) <.",
          micros: ["decimal_comparer"],
        },
        {
          enonce: "La droite est graduée de 0 à 2. Quel nombre est au point…\na) A ?\nb) B ?\nc) C ?",
          figure: droiteRel(0, 2, 0.1, [
            { value: 0.7, label: "A" },
            { value: 1.3, label: "B" },
            { value: 1.9, label: "C" },
          ], { nombres: 1 }),
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "1,3" },
            { question: "c)", attendu: "1,9" },
          ],
          correction:
            "Entre 0 et 1, je compte 10 petits sauts égaux. Un petit saut vaut donc 1 dixième, $0{,}1$.\na) A est 7 petits sauts après 0 : $0{,}7$.\nb) B est 3 petits sauts après 1 : $1{,}3$.\nc) C est 9 petits sauts après 1, juste avant 2 : $1{,}9$.\n⛔ Le piège : dire que A est en 7. Un petit saut vaut $0{,}1$, pas 1.\nRéponse : a) $0{,}7$ ; b) $1{,}3$ ; c) $1{,}9$.",
          micros: ["decimal_droite"],
        },
        {
          enonce: "Arrondis chaque nombre à l'unité.\na) 3,6\nb) 3,4\nc) 7,5\nd) 9,82",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "10" },
          ],
          correction:
            "Je regarde le chiffre des dixièmes. 5 ou plus : je monte à l'unité suivante. Moins de 5 : je garde l'unité.\na) $3{,}6$ : 6 dixièmes, c'est 5 ou plus. J'arrondis à 4.\nb) $3{,}4$ : 4 dixièmes, moins de 5. J'arrondis à 3.\nc) $7{,}5$ : 5 dixièmes, c'est 5 ou plus. J'arrondis à 8.\nd) $9{,}82$ : 8 dixièmes. Je monte : après 9 vient 10.\n⛔ Le piège : arrondir $7{,}5$ à 7. Avec 5 dixièmes, on monte.\nRéponse : a) 4 ; b) 3 ; c) 8 ; d) 10.",
          schema: ecranSeulement(droiteRel(3, 4, 0.1, [
            { value: 3.4, label: "3,4" },
            { value: 3.6, label: "3,6" },
          ], { nombres: 1 })),
          micros: ["decimal_arrondir"],
        },
        {
          enonce:
            "Complète.\na) $2{,}35 = 2 + \\dfrac{3}{10} + \\dfrac{…}{100}$\nb) $4{,}08 = 4 + \\dfrac{…}{10} + \\dfrac{8}{100}$\nc) $6 + \\dfrac{7}{10} + \\dfrac{2}{100} = …$ (écris le nombre à virgule)\nd) $1 + \\dfrac{5}{100} = …$ (écris le nombre à virgule)",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "6,72", exact: true },
            { question: "d)", attendu: "1,05", exact: true },
          ],
          correction:
            "Je sépare les unités, les dixièmes et les centièmes.\na) Dans $2{,}35$ : 2 unités, 3 dixièmes, 5 centièmes. Il manque 5.\nb) Dans $4{,}08$, le chiffre des dixièmes est 0. Il manque 0.\nc) 6 unités, 7 dixièmes, 2 centièmes : $6{,}72$.\nd) 1 unité, 0 dixième, 5 centièmes : $1{,}05$.\n⛔ Le piège du a) : écrire $2 + \\dfrac{35}{10}$. 35 dixièmes, c'est 3 unités et demie, beaucoup trop.\nRéponse : a) 5 ; b) 0 ; c) $6{,}72$ ; d) $1{,}05$.",
          micros: ["decimal_somme_fractions"],
        },
        {
          enonce: "Calcule.\na) 2,5 × 10\nb) 2,5 × 100\nc) 36 ÷ 10\nd) 4,7 ÷ 10",
          reponses: [
            { question: "a)", attendu: "25", exact: true },
            { question: "b)", attendu: "250", exact: true },
            { question: "c)", attendu: "3,6", exact: true },
            { question: "d)", attendu: "0,47", exact: true },
          ],
          correction:
            "× 10 : chaque chiffre vaut 10 fois plus, il glisse d'un rang vers la gauche. ÷ 10 : 10 fois moins, un rang vers la droite.\na) Les 2 unités deviennent 2 dizaines. Les 5 dixièmes deviennent 5 unités : $2{,}5 \\times 10 = 25$.\nb) × 100 : deux rangs vers la gauche. $2{,}5 \\times 100 = 250$.\nc) Les 3 dizaines deviennent 3 unités. Les 6 unités deviennent 6 dixièmes : $36 \\div 10 = 3{,}6$.\nd) Les 4 unités deviennent 4 dixièmes. Les 7 dixièmes deviennent 7 centièmes : $4{,}7 \\div 10 = 0{,}47$.\n⛔ Le piège : écrire $2{,}50$ au a). Ajouter un zéro à la fin ne change pas la valeur.\nRéponse : a) 25 ; b) 250 ; c) $3{,}6$ ; d) $0{,}47$.",
          micros: ["decimal_puissance_dix"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois gestes par exercice. J'écris chaque étape au brouillon.",
      rappel: [
        "Pour comparer : les unités d'abord, puis les dixièmes, puis les centièmes.",
        "Pour ranger, je compare les nombres deux par deux.",
        "10 dixièmes font 1 unité. 10 centièmes font 1 dixième.",
      ],
      exercices: [
        {
          enonce:
            "Au club nature, cinq grenouilles font un concours de saut. Leurs sauts, en mètres : 1,8 ; 1,52 ; 2,1 ; 1,5 ; 1,08.\na) Range les sauts du plus court au plus long.\nb) Quel est le saut le plus court ?",
          reponses: [
            { question: "a)", attendu: ["1,08 < 1,5 < 1,52 < 1,8 < 2,1", "1,08 ; 1,5 ; 1,52 ; 1,8 ; 2,1"], ordre: true },
            { question: "b)", attendu: "1,08" },
          ],
          correction:
            "Je compare d'abord les unités : $2{,}1$ est le seul à 2 unités. C'est le plus long.\nLes quatre autres ont 1 unité. Je compare les dixièmes : 0, 5, 5 et 8.\n$1{,}08$ a 0 dixième : il est le plus petit. $1{,}8$ a 8 dixièmes : il vient juste avant $2{,}1$.\n$1{,}5$ et $1{,}52$ ont 5 dixièmes. Je compare les centièmes : $1{,}5 = 1{,}50$, et 0 < 2.\na) $1{,}08 < 1{,}5 < 1{,}52 < 1{,}8 < 2{,}1$.\nb) Le saut le plus court : $1{,}08$ m.\n⛔ Le piège : placer $1{,}52$ après $1{,}8$ parce que 52 > 8. Je compare les dixièmes : 5 < 8.\nRéponse : a) $1{,}08 < 1{,}5 < 1{,}52 < 1{,}8 < 2{,}1$ ; b) $1{,}08$ m.",
          micros: ["decimal_ordonner", "decimal_comparer"],
        },
        {
          enonce:
            "Compare avec < ou >.\na) $\\dfrac{3}{10}$ … $\\dfrac{35}{100}$\nb) $\\dfrac{4}{10}$ … $\\dfrac{35}{100}$\nc) $\\dfrac{7}{10}$ … $\\dfrac{68}{100}$\nd) Range du plus petit au plus grand : $\\dfrac{4}{10}$ ; $\\dfrac{35}{100}$ ; $\\dfrac{3}{10}$.",
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: ">" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ["3/10 < 35/100 < 4/10", "3/10 ; 35/100 ; 4/10"], ordre: true },
          ],
          correction:
            "J'écris toutes les fractions en centièmes. 1 dixième = 10 centièmes.\na) $\\dfrac{3}{10} = \\dfrac{30}{100}$. 30 < 35, donc $\\dfrac{3}{10} < \\dfrac{35}{100}$.\nb) $\\dfrac{4}{10} = \\dfrac{40}{100}$. 40 > 35, donc $\\dfrac{4}{10} > \\dfrac{35}{100}$.\nc) $\\dfrac{7}{10} = \\dfrac{70}{100}$. 70 > 68, donc $\\dfrac{7}{10} > \\dfrac{68}{100}$.\nd) 30, 35, 40 centièmes : $\\dfrac{3}{10} < \\dfrac{35}{100} < \\dfrac{4}{10}$.\n⛔ Le piège du b) : croire que 35 centièmes est plus grand parce que 35 > 4. Un dixième vaut 10 centièmes.\nRéponse : a) < ; b) > ; c) > ; d) $\\dfrac{3}{10} < \\dfrac{35}{100} < \\dfrac{4}{10}$.",
          micros: ["fraction_decimale_comparer"],
        },
        {
          enonce:
            "Calcule.\na) 1,4 + 3 dixièmes\nb) 2,58 − 5 centièmes\nc) 1,9 + 1 dixième\nd) 3,07 + 3 centièmes",
          reponses: [
            { question: "a)", attendu: "1,7", exact: true },
            { question: "b)", attendu: "2,53", exact: true },
            { question: "c)", attendu: "2", exact: true },
            { question: "d)", attendu: "3,1", exact: true },
          ],
          correction:
            "J'ajoute les dixièmes aux dixièmes et les centièmes aux centièmes.\na) 4 dixièmes + 3 dixièmes = 7 dixièmes : $1{,}7$.\nb) 8 centièmes − 5 centièmes = 3 centièmes : $2{,}53$.\nc) 9 dixièmes + 1 dixième = 10 dixièmes, c'est 1 unité. 1 + 1 = 2.\nd) 7 centièmes + 3 centièmes = 10 centièmes, c'est 1 dixième. $3{,}07$ devient $3{,}10$, soit $3{,}1$.\n⛔ Le piège du c) : écrire $1{,}10$. 10 dixièmes font 1 unité de plus.\nRéponse : a) $1{,}7$ ; b) $2{,}53$ ; c) 2 ; d) $3{,}1$.",
          micros: ["decimal_ajouter_dixiemes"],
        },
        {
          enonce:
            "À la papeterie, un cahier coûte sept euros et cinq centimes.\na) Quel prix est bien écrit ? A) 7,5 €  B) 75 €  C) 7,05 €\nb) Un stylo coûte 2,40 €. Combien de centimes en plus des 2 € ?",
          reponses: [
            { question: "a)", attendu: ["C", "7,05 €"] },
            { question: "b)", attendu: "40" },
          ],
          correction:
            "1 centime, c'est 1 centième d'euro : il se met au 2e rang après la virgule.\na) 7 euros, puis 5 centimes. 5 centimes = 0 dixième et 5 centièmes. J'écris $7{,}05$ €. C'est le C.\nA) $7{,}5$ €, c'est 7 euros et 50 centimes. B) 75 €, c'est bien trop cher.\nb) $2{,}40$ € : après la virgule, je lis 40. Il y a 40 centimes en plus des 2 €.\n⛔ Le piège : choisir A. $7{,}5$, c'est 5 DIXIÈMES d'euro, donc 50 centimes.\nRéponse : a) C ; b) 40 centimes.",
          micros: ["decimal_lire", "decimal_fraction"],
        },
        {
          enonce:
            "Un chronomètre de natation affiche les centièmes. Sur la droite, un petit trait = un centième de seconde.\na) Quel nombre est au point P ?\nb) Quel nombre est au point Q ?\nc) Quel nombre est au point R ?",
          figure: droiteRel(2, 2.2, 0.01, [
            { value: 2.05, label: "P" },
            { value: 2.13, label: "Q" },
            { value: 2.19, label: "R" },
          ], { nombres: 0.1 }),
          reponses: [
            { question: "a)", attendu: "2,05" },
            { question: "b)", attendu: "2,13" },
            { question: "c)", attendu: "2,19" },
          ],
          correction:
            "Entre 2 et $2{,}1$, je compte 10 petits sauts. Chacun vaut 1 centième, $0{,}01$.\na) P est 5 petits sauts après 2 : $2{,}05$.\nb) Q est 3 petits sauts après $2{,}1$ : $2{,}13$.\nc) R est 9 petits sauts après $2{,}1$ : $2{,}19$.\n⛔ Le piège : lire P comme $2{,}5$. Les petits traits sont des centièmes, pas des dixièmes.\nRéponse : a) $2{,}05$ ; b) $2{,}13$ ; c) $2{,}19$.",
          micros: ["decimal_droite"],
        },
        {
          enonce:
            "a) Un sac pèse 4,7 kg. Arrondis au kilogramme.\nb) Une bouteille contient 1,25 L. Arrondis au litre.\nc) Une corde mesure 12,5 m. Arrondis au mètre.\nd) Entre quels nombres entiers qui se suivent se trouve 8,3 ? Écris-les du plus petit au plus grand.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "13" },
            { question: "d)", attendu: ["8 ; 9", "8 < 8,3 < 9"], ordre: true },
          ],
          correction:
            "Pour arrondir à l'unité, je regarde le chiffre des dixièmes.\na) $4{,}7$ : 7 dixièmes, c'est 5 ou plus. J'arrondis à 5 kg.\nb) $1{,}25$ : 2 dixièmes, moins de 5. J'arrondis à 1 L.\nc) $12{,}5$ : 5 dixièmes. Je monte : 13 m.\nd) $8{,}3$ a 8 unités. Il est après 8 et avant 9 : $8 < 8{,}3 < 9$.\n⛔ Le piège du b) : regarder le 5 des centièmes. Pour l'unité, seul le chiffre des dixièmes compte.\nRéponse : a) 5 kg ; b) 1 L ; c) 13 m ; d) 8 et 9.",
          micros: ["decimal_arrondir"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Dans 25,63, le 6 vaut 6 dixièmes.\nb) Dans 25,63, le 3 vaut 3 dixièmes.\nc) 0,5 et 0,50 sont le même nombre.\nd) 3,12 est plus grand que 3,2.",
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
          correction:
            "a) Le 6 est juste après la virgule : 6 dixièmes. Vrai.\nb) Le 3 est le 2e chiffre après la virgule : 3 centièmes, pas 3 dixièmes. Faux.\nc) $0{,}50$, c'est 5 dixièmes et 0 centième. Comme $0{,}5$. Vrai.\nd) Mêmes unités, 3. Dixièmes : 1 contre 2. Donc $3{,}12 < 3{,}2$. Faux.\n⛔ Le piège du d) : comparer 12 et 2. On compare chiffre par chiffre, les dixièmes d'abord.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["decimal_valeur_chiffre", "decimal_comparer"],
        },
        {
          enonce:
            "a) Un timbre mesure 2,5 cm de large. 10 timbres collés en ligne mesurent combien de cm ?\nb) Et 100 timbres ?\nc) Une pile de 10 pièces mesure 19 mm. Quelle est l'épaisseur d'une pièce, en mm ?\nd) Un paquet de 100 feuilles pèse 450 g. Combien pèse une feuille, en g ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "250" },
            { question: "c)", attendu: "1,9" },
            { question: "d)", attendu: "4,5" },
          ],
          correction:
            "10 fois plus : × 10. 10 fois moins : ÷ 10. Pareil avec 100.\na) $2{,}5 \\times 10 = 25$ cm.\nb) $2{,}5 \\times 100 = 250$ cm.\nc) Une pièce, c'est 10 fois moins que la pile : $19 \\div 10 = 1{,}9$ mm.\nd) Une feuille, c'est 100 fois moins que le paquet : $450 \\div 100 = 4{,}5$ g.\n⭐ Je vérifie le c) : $1{,}9 \\times 10 = 19$.\n⛔ Le piège du a) : écrire $2{,}50$. Les chiffres changent de rang : 25.\nRéponse : a) 25 cm ; b) 250 cm ; c) $1{,}9$ mm ; d) $4{,}5$ g.",
          micros: ["decimal_puissance_dix"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche ce qu'on demande, puis je calcule étape par étape.",
      rappel: [
        "Pour additionner des prix, j'aligne les virgules : centimes sous centimes.",
        "Pour comparer, je compare chiffre par chiffre, depuis la gauche.",
        "Je vérifie que mon résultat est possible.",
      ],
      exercices: [
        {
          titre: "Chez la libraire",
          enonce:
            "Mila a 5 €. À la librairie, elle prend une gomme à 1,50 € et un stylo à 2,35 €.\na) Combien coûtent la gomme et le stylo ensemble, en € ?\nb) Peut-elle payer avec ses 5 € ? Réponds oui ou non.\nc) Combien la libraire lui rend-elle, en € ?",
          reponses: [
            { question: "a)", attendu: "3,85" },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: "1,15" },
          ],
          correction:
            "a) J'aligne les virgules : $1{,}50 + 2{,}35$.\nCentimes : 50 + 35 = 85. Euros : 1 + 2 = 3. Total : $3{,}85$ €.\nb) $3{,}85$ € est moins que 5 €. Oui, elle peut payer.\nc) Je cherche ce qui manque de $3{,}85$ à 5. De $3{,}85$ à 4 : 15 centimes. De 4 à 5 : 1 €. La libraire rend $1{,}15$ €.\n⭐ Je vérifie : $3{,}85 + 1{,}15 = 5$.\n⛔ Le piège : poser $1{,}5 + 2{,}35$ sans aligner les virgules, et trouver $2{,}50$.\nRéponse : a) $3{,}85$ € ; b) oui ; c) $1{,}15$ €.",
          micros: ["decimal_defi", "decimal_lire"],
        },
        {
          titre: "La juge du saut en longueur",
          enonce:
            "Julia est juge d'athlétisme. Elle note quatre sauts : 3,45 m ; 3,5 m ; 3,08 m ; 3,4 m.\na) Quel est le saut le plus long ?\nb) Quel est le saut le plus court ?\nc) Arrondis le saut le plus long au mètre.\nd) De combien de centièmes de mètre le saut de 3,45 m dépasse-t-il celui de 3,4 m ?",
          reponses: [
            { question: "a)", attendu: "3,5" },
            { question: "b)", attendu: "3,08" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "5" },
          ],
          correction:
            "Tous les sauts ont 3 unités. Je compare les dixièmes : 4, 5, 0 et 4.\na) $3{,}5$ a 5 dixièmes, le plus de dixièmes. Le plus long : $3{,}5$ m.\nb) $3{,}08$ a 0 dixième. Le plus court : $3{,}08$ m.\nc) $3{,}5$ : 5 dixièmes, je monte. J'arrondis à 4 m.\nd) $3{,}4 = 3{,}40$. De 40 centièmes à 45 centièmes : 5 centièmes.\n⛔ Le piège du a) : choisir $3{,}45$ parce qu'il a plus de chiffres. $3{,}5 = 3{,}50$, et 50 > 45.\nRéponse : a) $3{,}5$ m ; b) $3{,}08$ m ; c) 4 m ; d) 5 centièmes.",
          micros: ["decimal_defi", "decimal_comparer", "decimal_arrondir"],
        },
        {
          titre: "Les chatons de la vétérinaire",
          enonce:
            "Kenzo est vétérinaire. Il pèse quatre chatons : 0,85 kg ; 0,9 kg ; 0,78 kg ; 1,02 kg.\na) Range les poids du plus léger au plus lourd.\nb) Combien de chatons pèsent plus de 1 kg ?\nc) Un mois plus tard, le chaton de 0,85 kg a pris 2 dixièmes de kg. Combien pèse-t-il, en kg ?",
          reponses: [
            { question: "a)", attendu: ["0,78 < 0,85 < 0,9 < 1,02", "0,78 ; 0,85 ; 0,9 ; 1,02"], ordre: true },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: "1,05" },
          ],
          correction:
            "a) Un seul chaton a 1 unité : $1{,}02$. Il est le plus lourd.\nLes autres ont 0 unité. Dixièmes : 8, 9 et 7. Donc $0{,}78 < 0{,}85 < 0{,}9$.\nRangement : $0{,}78 < 0{,}85 < 0{,}9 < 1{,}02$.\nb) Seul $1{,}02$ dépasse 1 kg : 1 chaton.\nc) $0{,}85$ a 8 dixièmes. 8 + 2 = 10 dixièmes, c'est 1 unité. $0{,}85 + 0{,}2 = 1{,}05$ kg.\n⛔ Le piège du a) : placer $0{,}9$ avant $0{,}85$ parce que 9 < 85. 9 dixièmes, c'est plus que 8 dixièmes.\nRéponse : a) $0{,}78 < 0{,}85 < 0{,}9 < 1{,}02$ ; b) 1 ; c) $1{,}05$ kg.",
          micros: ["decimal_defi", "decimal_ordonner", "decimal_ajouter_dixiemes"],
        },
        {
          titre: "L'énigme de la créatrice de jeux",
          enonce:
            "Amina invente des jeux. Elle pose une énigme : « Je suis un nombre entre 4 et 5. Mon chiffre des dixièmes est 7. Mon chiffre des centièmes est la moitié de 4. »\na) Qui suis-je ?\nb) Arrondis ce nombre à l'unité.\nc) Multiplie ce nombre par 100.",
          reponses: [
            { question: "a)", attendu: "4,72", exact: true },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "472" },
          ],
          correction:
            "a) Entre 4 et 5 : le chiffre des unités est 4.\nLe chiffre des dixièmes est 7. La moitié de 4, c'est 2 : le chiffre des centièmes est 2.\nLe nombre est $4{,}72$.\nb) $4{,}72$ : 7 dixièmes, c'est 5 ou plus. J'arrondis à 5.\nc) × 100 : chaque chiffre glisse de deux rangs vers la gauche. $4{,}72 \\times 100 = 472$.\n⛔ Le piège du a) : écrire $4{,}27$. Le 7 va juste après la virgule, aux dixièmes.\nRéponse : a) $4{,}72$ ; b) 5 ; c) 472.",
          micros: ["decimal_defi", "decimal_valeur_chiffre", "decimal_arrondir", "decimal_puissance_dix"],
        },
      ],
    },
  ],
};
