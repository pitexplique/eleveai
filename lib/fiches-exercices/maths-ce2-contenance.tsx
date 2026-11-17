// ─── Fiche d'exercices : les contenances (CE2) — 20 exercices corrigés ────────
//
// 17/11/2026 : la feuille interactive de la notion `contenance` du coach CE2
// (« Contenances », 5 micros). Sur la forme des feuilles du CM1 et du CE1
// (`maths-cm1-masse.tsx`, `maths-ce1-masse.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/contenance.bank.ts`) : L, dL et cL ;
// 1 L = 10 dL = 100 cL, 1 dL = 10 cL.
// ⛔ LIMITES DU CE2 : pas de millilitre (le programme s'arrête au
// centilitre), pas de tableau de conversion, pas d'écriture à virgule
// (« 1 L 50 cL », jamais « 1,5 L »), des nombres jusqu'à 10 000.
// ⛔ Aucune question à rédiger : QCM par lettre, signe, vrai ou faux, un
// nombre seul dans l'unité imposée, un mot (une unité, une couleur).
// ⛔ 18 mots au plus par phrase.
//
// Les pièges nommés : 1 L = 10 cL (1, 6), lire le trait du dessus (2), une
// unité absurde (3, 8), comparer 80 et 1 sans les unités (4, 7, 12), la
// bouteille haute prise pour la plus grande (5, 6), 2 L 5 cL = 250 cL (9),
// 3 dL + 5 dL au lieu de 5 dL − 3 dL (10), ne verser qu'un verre (11),
// 2 L 30 cL lu comme 203 cL (12), oublier l'eau déjà utilisée (13), oublier
// l'eau du sirop (14), soustraire au lieu de partager (15), le jus d'un seul
// verre (16), le dernier seau oublié (17), compter les verres au lieu des
// litres (18), vider le grand bidon (19), 240 cL = 24 L (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (10, 14), goûter (11, 16), ferme
// (15), jardin (13), aquarium (17), fête d'école (18), énigme des bidons
// (19), robinet qui fuit (20). Les métiers : jardinier (13), fermière (15).
// UN SEUL contexte réunionnais (16, le jus de goyave de Mamie, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 8 — une canette de boisson contient le plus souvent 33 cL (format
//     standard des canettes en Europe, inscrit sur l'étiquette).
// Tout le reste est un MODÈLE (le lait d'une vache, la fuite d'un robinet,
// la baignoire : des ordres de grandeur, inventés pour l'exercice).
//
// ⭐ LES DESSINS : un pichet gradué en décilitres (`pichet`) et des
// récipients étiquetés (`recipients`) de `dessins-ce2-lotG.tsx`. ⛔ Jamais le
// canvas `contenance` du coach en comparaison (il remplit les bouteilles selon
// les valeurs) ; la quantité cherchée n'est jamais écrite.
//
// Micro-compétences (5/5) : ce2_contenance_unites (1, 2, 3, 8),
// ce2_contenance_relations (1, 2, 6, 7, 9, 10, 12, 14, 16, 18, 20),
// ce2_contenance_comparer (4, 5, 6, 7, 12), ce2_contenance_probleme (10, 11,
// 13, 14, 15, 16, 17, 18, 19, 20), ce2_contenance_defi (17, 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { pichet, recipients } from "@/lib/fiches-exercices/dessins-ce2-lotG";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const L = ["L", "litre", "litres"];
const CL = ["cL", "centilitre", "centilitres"];

export const exercicesContenanceCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "contenance",
  titre: "Les contenances",
  accroche:
    "Vingt exercices, du plus facile au défi. Le litre, le décilitre et le centilitre. Lire un pichet gradué. Comparer des contenances, même quand la bouteille trompe l'œil. Des crêpes, un arrosoir, une ferme, un aquarium, une fête d'école et un robinet qui fuit. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, la lettre, le signe ou le mot.",
      rappel: [
        "1 L = 10 dL = 100 cL.",
        "1 dL = 10 cL.",
        "La forme d'un récipient ne dit pas combien il contient : je lis sa contenance.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 L = … dL\nb) 1 L = … cL\nc) 1 dL = … cL\nd) 3 L = … dL",
          correction:
            "Je relis les égalités du rappel.\na) 1 L = 10 dL.\nb) 1 L = 100 cL.\nc) 1 dL = 10 cL.\nd) 1 L = 10 dL. Donc 3 L, c'est 3 fois 10 dL : 30 dL.\n⛔ Le piège : écrire 1 L = 10 cL. Il faut 100 cL pour faire 1 L ; c'est le décilitre qui va par 10.\nRéponse : a) 10 ; b) 100 ; c) 10 ; d) 30.",
          micros: ["ce2_contenance_unites", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: "10", unite: "dl" },
            { question: "b)", attendu: "100", unite: "cl" },
            { question: "c)", attendu: "10", unite: "cl" },
            { question: "d)", attendu: "30", unite: "dl" },
          ],
        },
        {
          enonce: "Regarde le pichet gradué en décilitres.\na) Combien de décilitres d'eau contient-il ?\nb) Combien de décilitres faut-il ajouter pour avoir 1 L ?",
          figure: pichet(7),
          correction:
            "a) Je lis le trait où arrive l'eau : le 7. Le pichet contient 7 dL.\nb) 1 L = 10 dL. Il manque $10 - 7 = 3$ dL.\nJe vérifie : $7 + 3 = 10$ dL = 1 L.\n⛔ Le piège : lire le trait du dessus, le 8. Je regarde où l'eau s'arrête.\nRéponse : a) 7 ; b) 3.",
          micros: ["ce2_contenance_unites", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"], unite: "dl" },
            { question: "b)", attendu: ["3", "trois"], unite: "dl" },
          ],
        },
        {
          enonce: "Complète avec L ou cL.\na) Une baignoire contient 150 …\nb) Un verre contient 20 …\nc) Un seau contient 10 …\nd) Une petite bouteille de jus contient 25 …",
          correction:
            "Je compare à une grande bouteille d'eau de 1 L.\na) Une baignoire contient beaucoup de grandes bouteilles : 150 L.\nb) Un verre contient bien moins qu'une grande bouteille : 20 cL.\nc) Un seau contient plusieurs grandes bouteilles : 10 L.\nd) 25 L, ce serait 25 grandes bouteilles ! C'est 25 cL.\n⛔ Le piège : écrire L partout. Pour un petit récipient, le centilitre convient mieux.\nRéponse : a) L ; b) cL ; c) L ; d) cL.",
          micros: ["ce2_contenance_unites"],
          reponses: [
            { question: "a)", attendu: L },
            { question: "b)", attendu: CL },
            { question: "c)", attendu: L },
            { question: "d)", attendu: CL },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 1 L … 80 cL\nb) 5 dL … 50 cL\nc) 2 L … 25 dL\nd) 90 cL … 1 L",
          correction:
            "J'écris les deux contenances dans la même unité, puis je compare.\na) 1 L = 100 cL. 100 cL est plus que 80 cL. Donc 1 L > 80 cL.\nb) 1 dL = 10 cL, donc 5 dL = 50 cL. Les deux sont égales.\nc) 2 L = 20 dL. 20 dL est moins que 25 dL. Donc 2 L < 25 dL.\nd) 1 L = 100 cL. 90 cL est moins que 100 cL. Donc 90 cL < 1 L.\n⛔ Le piège : comparer 80 et 1 sans les unités. 80 cL, c'est moins que 1 L.\nRéponse : a) > ; b) = ; c) < ; d) <.",
          micros: ["ce2_contenance_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: "<" },
          ],
        },
        {
          enonce: "Une bouteille haute et un saladier bas.\nLequel contient le plus ? Écris la lettre.",
          figure: recipients([
            { nom: "A", forme: "bouteille", etiquette: "75 cL" },
            { nom: "B", forme: "saladier", etiquette: "2 L" },
          ]),
          correction:
            "Je ne regarde pas la forme : je lis les étiquettes.\nJ'écris tout en centilitres : 2 L = 200 cL.\n200 cL est plus que 75 cL.\nDonc le saladier B contient le plus.\n⛔ Le piège : choisir la bouteille parce qu'elle est plus haute. Le saladier est bas, mais très large.\nRéponse : B.",
          micros: ["ce2_contenance_comparer"],
          reponses: [{ attendu: ["B", "le saladier", "saladier"] }],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 L = 100 cL.\nb) 1 L = 100 dL.\nc) 50 cL, c'est la moitié de 1 L.\nd) Une bouteille haute contient toujours plus qu'une bouteille basse.",
          correction:
            "Je relis les égalités du rappel.\na) 1 L = 100 cL. Vrai.\nb) 1 L = 10 dL, pas 100 dL. Faux.\nc) La moitié de 100 cL : $100 \\div 2 = 50$ cL. Vrai.\nd) Une bouteille basse peut être très large. La forme ne suffit pas. Faux.\n⛔ Le piège du b) : confondre décilitre et centilitre. 10 dL, mais 100 cL.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_contenance_relations", "ce2_contenance_comparer"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Quatre bouteilles :\nA = 1 L ; B = 50 cL ; C = 8 dL ; D = 2 L.\nRange-les de la plus petite à la plus grande contenance.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les contenances en centilitres.\nA = 1 L = 100 cL.\nB = 50 cL.\nC = 8 dL = 80 cL, car 1 dL = 10 cL.\nD = 2 L = 200 cL.\nJe range : 50 < 80 < 100 < 200.\nDonc B, puis C, puis A, puis D.\n⛔ Le piège : mettre A en premier parce que « 1 » est le plus petit nombre. 1 L, c'est 100 cL.\nRéponse : B ; C ; A ; D.",
          micros: ["ce2_contenance_comparer", "ce2_contenance_relations"],
          reponses: [{ attendu: ["B ; C ; A ; D", "B < C < A < D", "B, C, A, D"], ordre: true }],
        },
        {
          enonce: "Choisis la bonne contenance. Écris la lettre.\na) Une canette de boisson : A) 3 cL B) 33 L C) 33 cL\nb) Un arrosoir : A) 10 L B) 10 cL C) 1 cL\nc) Un aquarium de salon : A) 5 dL B) 50 L C) 50 cL",
          correction:
            "Je compare à une grande bouteille d'eau de 1 L, c'est-à-dire 100 cL.\na) Une canette contient un peu moins d'un tiers de grande bouteille : 33 cL. Réponse C.\nb) Un arrosoir contient plusieurs grandes bouteilles : 10 L. Réponse A.\nc) Un aquarium contient beaucoup de grandes bouteilles : 50 L. Réponse B.\n⛔ Le piège : garder le bon nombre et oublier l'unité. « 33 L » pour une canette, c'est trois seaux.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["ce2_contenance_unites"],
          reponses: [
            { question: "a)", attendu: ["C", "C) 33 cL"] },
            { question: "b)", attendu: ["A", "A) 10 L"] },
            { question: "c)", attendu: ["B", "B) 50 L"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mets tout dans la même unité AVANT de calculer.",
      rappel: [
        "1 L 50 cL = 100 cL + 50 cL = 150 cL.",
        "3 L 4 dL = 30 dL + 4 dL = 34 dL.",
        "Avant d'additionner ou de soustraire, j'écris toutes les contenances dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 1 L 50 cL = … cL\nb) 2 L 5 cL = … cL\nc) 3 L 4 dL = … dL\nd) 120 cL = … L … cL",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 1 L = 100 cL. Donc 1 L 50 cL = $100 + 50 = 150$ cL.\nb) 2 L = 200 cL. Donc 2 L 5 cL = $200 + 5 = 205$ cL.\nc) 3 L = 30 dL. Donc 3 L 4 dL = $30 + 4 = 34$ dL.\nd) 120 cL = 100 cL + 20 cL = 1 L 20 cL.\n⛔ Le piège du b) : écrire 250 cL ou 25 cL. Il y a 5 cL, pas 50 : $200 + 5 = 205$.\nRéponse : a) 150 ; b) 205 ; c) 34 ; d) 1 L 20 cL.",
          micros: ["ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: "150", unite: "cl" },
            { question: "b)", attendu: "205", unite: "cl" },
            { question: "c)", attendu: "34", unite: "dl" },
            { question: "d) L", attendu: "1", unite: "l" },
            { question: "d) cL", attendu: "20", unite: "cl" },
          ],
        },
        {
          enonce: "Pour des crêpes, il faut 5 dL de lait.\nLe pichet contient déjà un peu de lait.\na) Combien de dL faut-il encore ajouter ?\nb) Écris 5 dL en centilitres.",
          figure: pichet(3),
          correction:
            "a) Je lis le pichet : le lait arrive au 3. Il y a 3 dL.\nIl en faut 5 dL : $5 - 3 = 2$ dL à ajouter.\nb) 1 dL = 10 cL. Donc 5 dL, c'est 5 fois 10 cL : 50 cL.\n⛔ Le piège du a) : calculer $5 + 3 = 8$ dL. Le lait du pichet est déjà là : je cherche ce qui MANQUE.\nRéponse : a) 2 ; b) 50.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"], unite: "dl" },
            { question: "b)", attendu: "50", unite: "cl" },
          ],
        },
        {
          enonce: "Une bouteille contient 1 L de jus.\nAu goûter, Inès remplit 3 verres de 20 cL.\nCombien de cL de jus reste-t-il dans la bouteille ?",
          correction:
            "Je mets tout en centilitres : 1 L = 100 cL.\nLes 3 verres : $3 \\times 20 = 60$ cL.\nIl reste $100 - 60 = 40$ cL.\nJe vérifie : $60 + 40 = 100$ cL = 1 L.\n⛔ Le piège : ne verser qu'un verre et répondre 80 cL. Inès en remplit trois.\nRéponse : 40.",
          micros: ["ce2_contenance_probleme"],
          reponses: [{ attendu: "40", unite: "cl" }],
        },
        {
          enonce: "Trois bidons. Le rouge contient 2 L 30 cL.\nLe bleu contient 203 cL. Le vert contient 25 dL.\na) Quel bidon contient le plus ? Écris sa couleur.\nb) Quel bidon contient le moins ? Écris sa couleur.",
          correction:
            "J'écris les trois contenances en centilitres.\nRouge : 2 L 30 cL = $200 + 30 = 230$ cL.\nBleu : 203 cL.\nVert : 25 dL = $25 \\times 10 = 250$ cL, car 1 dL = 10 cL.\nJe range : 203 < 230 < 250.\na) Le plus : le vert.\nb) Le moins : le bleu.\n⛔ Le piège : lire 2 L 30 cL comme 203 cL. Après les 2 L, il y a 30 cL, pas 3.\nRéponse : a) le vert ; b) le bleu.",
          micros: ["ce2_contenance_comparer", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: ["vert", "le vert", "le bidon vert"] },
            { question: "b)", attendu: ["bleu", "le bleu", "le bidon bleu"] },
          ],
        },
        {
          enonce: "Un jardinier remplit son arrosoir de 10 L.\nIl arrose 4 rangs de salades, avec 2 L par rang.\na) Combien de litres a-t-il versés ?\nb) Combien de litres restent dans l'arrosoir ?",
          figure: recipients([{ nom: "", forme: "arrosoir", etiquette: "10 L" }]),
          correction:
            "a) 4 rangs de 2 L : $4 \\times 2 = 8$ L.\nb) Il avait 10 L. Il reste $10 - 8 = 2$ L.\nJe vérifie : $8 + 2 = 10$ L.\n⛔ Le piège du b) : calculer $10 - 2 = 8$. Il a versé 2 L sur CHAQUE rang, pas en tout.\nRéponse : a) 8 ; b) 2.",
          micros: ["ce2_contenance_probleme"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"], unite: "l" },
            { question: "b)", attendu: ["2", "deux"], unite: "l" },
          ],
        },
        {
          enonce: "Pour du sirop de menthe, Sacha verse 1 dL de sirop.\nIl ajoute 9 dL d'eau.\na) Combien de dL de boisson obtient-il ?\nb) Écris cette quantité en litres.",
          correction:
            "a) La boisson, c'est le sirop ET l'eau : $1 + 9 = 10$ dL.\nb) 10 dL = 1 L.\n⛔ Le piège : ne compter que l'eau, 9 dL. Le sirop fait aussi partie de la boisson.\nRéponse : a) 10 ; b) 1.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"], unite: "dl" },
            { question: "b)", attendu: ["1", "un"], unite: "l" },
          ],
        },
        {
          enonce: "Une fermière a trait 20 L de lait.\nElle le verse dans des bidons de 5 L.\nCombien de bidons remplit-elle ?",
          correction:
            "Je cherche combien de fois 5 L tient dans 20 L.\nC'est un partage en paquets de 5 : $20 \\div 5 = 4$.\nJe vérifie : $4 \\times 5 = 20$ L.\n⛔ Le piège : calculer $20 - 5 = 15$. On ne remplit pas un seul bidon : on fait des parts égales.\nRéponse : 4.",
          micros: ["ce2_contenance_probleme"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Mamie prépare du jus de goyave pour 8 enfants.\nChaque verre contient 25 cL.\na) Combien de cL de jus faut-il ?\nb) Écris cette quantité en litres.",
          correction:
            "a) 8 verres de 25 cL : $8 \\times 25 = 200$ cL.\nJe peux compter par 4 verres : $4 \\times 25 = 100$ cL, deux fois : 200 cL.\nb) 100 cL = 1 L. Donc 200 cL = 2 L.\n⛔ Le piège : répondre 25 cL, le jus d'un seul verre. Il y a 8 enfants.\nRéponse : a) 200 ; b) 2.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_relations"],
          reponses: [
            { question: "a)", attendu: "200", unite: "cl" },
            { question: "b)", attendu: ["2", "deux"], unite: "l" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque contenance dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, et j'y écris toutes les contenances.",
        "Pour ce qui manque : je calcule ce qu'il faut − ce que j'ai.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "L'aquarium à remplir",
          enonce: "Un aquarium contient 60 L quand il est plein.\nNoah y verse 4 seaux de 10 L.\na) Combien de litres a-t-il versés ?\nb) Combien de litres manque-t-il ?\nc) Combien de seaux de 10 L doit-il encore verser ?",
          correction:
            "a) 4 seaux de 10 L : $4 \\times 10 = 40$ L.\nb) Il manque $60 - 40 = 20$ L.\nc) Combien de fois 10 L dans 20 L ? $20 \\div 10 = 2$ seaux.\nJe vérifie : 4 + 2 = 6 seaux. $6 \\times 10 = 60$ L.\n⛔ Le piège du c) : répondre 20. On demande des seaux, pas des litres.\nRéponse : a) 40 ; b) 20 ; c) 2.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_defi"],
          reponses: [
            { question: "a)", attendu: "40", unite: "l" },
            { question: "b)", attendu: "20", unite: "l" },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Le jus de la fête de l'école",
          enonce: "Pour la fête de l'école, il faut 30 verres de 20 cL.\nLe jus est vendu en bouteilles de 1 L.\na) Combien de cL de jus faut-il ?\nb) Écris cette quantité en litres.\nc) Combien de bouteilles de 1 L faut-il acheter ?",
          correction:
            "a) 30 verres de 20 cL : $30 \\times 20 = 600$ cL.\nb) 100 cL = 1 L. Dans 600 cL, il y a 6 fois 100 cL : 6 L.\nc) Une bouteille contient 1 L. Pour 6 L, il faut 6 bouteilles.\n⛔ Le piège : acheter 30 bouteilles, une par verre. Une bouteille de 1 L remplit 5 verres de 20 cL.\nRéponse : a) 600 ; b) 6 ; c) 6.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_relations", "ce2_contenance_defi"],
          reponses: [
            { question: "a)", attendu: "600", unite: "cl" },
            { question: "b)", attendu: ["6", "six"], unite: "l" },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "L'énigme des deux bidons",
          enonce: "Léa a un bidon de 5 L et un bidon de 3 L, sans graduations.\nElle remplit le grand bidon. Puis elle verse dans le petit, jusqu'à ce qu'il soit plein.\na) Combien de litres restent dans le grand bidon ?\nb) Elle vide le petit et y verse ces litres. Elle remplit encore le grand, puis complète le petit. Combien reste-t-il dans le grand ?",
          figure: recipients([
            { nom: "grand", forme: "bidon", etiquette: "5 L" },
            { nom: "petit", forme: "bidon", etiquette: "3 L" },
          ]),
          correction:
            "a) Le grand bidon a 5 L. Le petit se remplit avec 3 L.\nDans le grand, il reste $5 - 3 = 2$ L.\nb) Le petit contient maintenant ces 2 L. Il peut recevoir encore $3 - 2 = 1$ L.\nLe grand est de nouveau plein : 5 L. Il donne 1 L au petit.\nDans le grand, il reste $5 - 1 = 4$ L.\n⛔ Le piège du b) : verser encore 3 L. Le petit contient déjà 2 L : il n'a de place que pour 1 L.\nRéponse : a) 2 ; b) 4.",
          micros: ["ce2_contenance_defi", "ce2_contenance_probleme"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"], unite: "l" },
            { question: "b)", attendu: ["4", "quatre"], unite: "l" },
          ],
        },
        {
          titre: "Le robinet qui fuit",
          enonce: "Un robinet qui fuit remplit un verre de 10 cL en 1 heure.\na) Combien de cL perd-il en 10 heures ?\nb) Écris cette quantité en litres.\nc) En 24 heures, il perd … L et … cL. Écris les deux nombres.",
          correction:
            "a) 10 heures, c'est 10 verres de 10 cL : $10 \\times 10 = 100$ cL.\nb) 100 cL = 1 L.\nc) 24 heures : $24 \\times 10 = 240$ cL.\n240 cL = 200 cL + 40 cL = 2 L 40 cL.\n⛔ Le piège du c) : écrire 24 L. Il perd 240 cL : c'est 2 L et 40 cL.\nUne petite fuite gaspille beaucoup d'eau : je ferme bien le robinet !\nRéponse : a) 100 ; b) 1 ; c) 2 L 40 cL.",
          micros: ["ce2_contenance_probleme", "ce2_contenance_relations", "ce2_contenance_defi"],
          reponses: [
            { question: "a)", attendu: "100", unite: "cl" },
            { question: "b)", attendu: ["1", "un"], unite: "l" },
            { question: "c) L", attendu: ["2", "deux"], unite: "l" },
            { question: "c) cL", attendu: "40", unite: "cl" },
          ],
        },
      ],
    },
  ],
};
