// ─── Fiche d'exercices : les longueurs (CE2) — 20 exercices corrigés ──────────
//
// 17/11/2026 : la feuille interactive de la notion `longueur` du coach CE2
// (« Longueurs », 8 micros). Sur la forme des feuilles du CM1 et du CE1
// (`maths-cm1-masse.tsx`, `maths-ce1-longueur.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/longueur.bank.ts`, `grandeurs-ce2.ts`) :
// km, m, dm, cm et mm ; 1 km = 1 000 m, 1 m = 10 dm = 100 cm, 1 dm = 10 cm,
// 1 cm = 10 mm ; mesurer à la règle, au millimètre près.
// ⛔ LIMITES DU CE2 : pas de tableau de conversion, pas d'écriture à virgule
// (« 2 m 50 cm », jamais « 2,50 m »), des nombres jusqu'à 10 000. Pas de
// périmètre ici (c'est la notion `perimetre`).
// ⛔ Aucune question à rédiger : QCM par lettre, signe, vrai ou faux, un
// nombre seul dans l'unité imposée, un mot (une unité, un prénom).
// ⛔ 18 mots au plus par phrase.
//
// Les pièges nommés : 1 m = 10 cm (1, 7), lire le bout de l'objet quand il ne
// part pas de 0 (2, 10), compter les centimètres et oublier les millimètres
// (3), une unité absurde (4, 6, 13), comparer 90 et 1 sans les unités (5, 7,
// 8, 15), 3 m 8 cm = 38 cm (9), 1 200 m pris pour moins de 1 km (11), ne
// couper qu'un morceau (12), soustraire au lieu de partager (14), 2 m 4 cm lu
// 2 m 40 cm (15), 3 200 + 800 = 3 km 1 000 m (16), ne compter qu'une
// guirlande (17), 100 ÷ 20 = 5 jours (18), oublier de convertir les km (19),
// « 2 fois plus court » pris pour « 2 fois plus long » (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (2, 3), sport (11, 15), couture
// (12), menuiserie (14), sortie scolaire (16), fête (17), animaux (18),
// facteur (19), bricolage (20). Les métiers : couturière (12), menuisier
// (14), facteur (19).
// Aucun contexte réunionnais ici (les autres feuilles du lot en ont un).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 6 — une pièce de 1 € a une épaisseur de 2,33 mm (Banque centrale
//     européenne, « pièces en euros ») : « environ 2 mm ».
//   · ex. 11 — une piste d'athlétisme standard mesure 400 m (World Athletics,
//     règlement des installations).
// Tout le reste est un MODÈLE (tailles d'une voiture, d'un enfant, d'une
// fourmi : des ordres de grandeur).
//
// ⭐ LES DESSINS : une règle graduée en centimètres et en millimètres
// (`regle` de `dessins-ce2-lotG.tsx`), les objets posés dessus. Jamais la
// longueur cherchée écrite.
//
// Micro-compétences (8/8) : ce2_longueur_unites (1, 4), ce2_longueur_relations
// (1, 3, 7, 8, 9, 11, 12, 14, 15, 16, 17, 19, 20), ce2_longueur_mesurer (2, 3,
// 10), ce2_longueur_comparer (5, 7, 8, 10, 15, 19), ce2_longueur_choisir_unite
// (4, 13), ce2_longueur_estimer (6, 13), ce2_longueur_probleme (11, 12, 14,
// 16, 17, 18, 19), ce2_longueur_defi (17, 18, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";
import { regle } from "@/lib/fiches-exercices/dessins-ce2-lotG";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const KM = ["km", "kilomètre", "kilomètres"];
const M = ["m", "mètre", "mètres"];
const CM = ["cm", "centimètre", "centimètres"];
const MM = ["mm", "millimètre", "millimètres"];

export const exercicesLongueurCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du plus facile au défi. Le kilomètre, le mètre, le décimètre, le centimètre et le millimètre. Mesurer à la règle. Comparer et ranger des longueurs. Choisir la bonne unité. Une piste de course, un ruban de couturière, une planche de menuisier, un escargot et le trajet du facteur. Lis le rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, la lettre, le signe ou le mot.",
      rappel: [
        "1 km = 1 000 m. 1 m = 100 cm. 1 m = 10 dm.",
        "1 dm = 10 cm. 1 cm = 10 mm.",
        "Pour mesurer, je pose le 0 de la règle au bout de l'objet.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 m = … cm\nb) 1 cm = … mm\nc) 1 km = … m\nd) 1 dm = … cm",
          correction:
            "Je relis les égalités du rappel.\na) 1 m = 100 cm.\nb) 1 cm = 10 mm : sur la règle, il y a 10 petits traits dans 1 cm.\nc) 1 km = $1\\,000$ m.\nd) 1 dm = 10 cm.\n⛔ Le piège : écrire 1 m = 10 cm. Dans 1 m, il y a 100 cm ; c'est le décimètre qui vaut 10 cm.\nRéponse : a) 100 ; b) 10 ; c) $1\\,000$ ; d) 10.",
          micros: ["ce2_longueur_unites", "ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: "100", unite: "cm" },
            { question: "b)", attendu: "10", unite: "mm" },
            { question: "c)", attendu: "1000", unite: "m" },
            { question: "d)", attendu: "10", unite: "cm" },
          ],
        },
        {
          enonce: "Le crayon de Tom est posé sur la règle.\nCombien mesure le crayon, en centimètres ?",
          figure: regle([{ de: 20, a: 90, label: "crayon", couleur: ORANGE }], 10, 0, false),
          correction:
            "Le crayon ne commence pas au 0 : il commence au 2.\nIl finit au 9.\nJe compte les centimètres entre les deux : $9 - 2 = 7$ cm.\nJe vérifie en comptant les cases : 3, 4, 5, 6, 7, 8, 9. Ça fait 7.\n⛔ Le piège : lire 9, le nombre au bout du crayon. Le crayon ne part pas de 0.\nRéponse : 7.",
          micros: ["ce2_longueur_mesurer"],
          reponses: [{ attendu: ["7", "sept"], unite: "cm" }],
        },
        {
          enonce: "Le trombone part du 0 de la règle.\na) Il mesure … cm et … mm. Écris les deux nombres.\nb) Combien mesure-t-il en millimètres ?",
          figure: regle([{ de: 0, a: 34, label: "trombone", couleur: BLEU }], 5),
          correction:
            "a) Le trombone dépasse le 3. Il a 3 cm entiers.\nPuis je compte les petits traits après le 3 : 4 traits, donc 4 mm.\nIl mesure 3 cm 4 mm.\nb) 3 cm = 30 mm. Donc 3 cm 4 mm = $30 + 4 = 34$ mm.\n⛔ Le piège : répondre 3 cm et oublier les millimètres. Les petits traits comptent aussi.\nRéponse : a) 3 et 4 ; b) 34.",
          micros: ["ce2_longueur_mesurer", "ce2_longueur_relations"],
          reponses: [
            { question: "a) cm", attendu: ["3", "trois"], unite: "cm" },
            { question: "a) mm", attendu: ["4", "quatre"], unite: "mm" },
            { question: "b)", attendu: "34", unite: "mm" },
          ],
        },
        {
          enonce: "Quelle unité choisir : km, m, cm ou mm ?\na) La longueur d'une fourmi\nb) La longueur d'une piscine\nc) La distance entre deux villes\nd) La longueur d'un crayon",
          correction:
            "Je compare à des repères : 1 mm, l'épaisseur d'un trait ; 1 cm, la largeur d'un doigt ; 1 m, un grand pas.\na) Une fourmi est toute petite : mm.\nb) Une piscine se mesure en grands pas : m.\nc) Entre deux villes, on roule longtemps : km.\nd) Un crayon fait quelques largeurs de main : cm.\n⛔ Le piège : choisir cm pour tout. Une distance entre deux villes en centimètres donnerait un nombre énorme.\nRéponse : a) mm ; b) m ; c) km ; d) cm.",
          micros: ["ce2_longueur_choisir_unite", "ce2_longueur_unites"],
          reponses: [
            { question: "a)", attendu: MM },
            { question: "b)", attendu: M },
            { question: "c)", attendu: KM },
            { question: "d)", attendu: CM },
          ],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 1 m … 90 cm\nb) 2 km … 2 000 m\nc) 50 mm … 6 cm\nd) 1 m … 120 cm",
          correction:
            "J'écris les deux longueurs dans la même unité, puis je compare.\na) 1 m = 100 cm. 100 cm est plus que 90 cm. Donc 1 m > 90 cm.\nb) 2 km = $2\\,000$ m. Les deux sont égales.\nc) 6 cm = 60 mm. 50 mm est moins que 60 mm. Donc 50 mm < 6 cm.\nd) 1 m = 100 cm. 100 cm est moins que 120 cm. Donc 1 m < 120 cm.\n⛔ Le piège : comparer 1 et 90 sans les unités. 90 est plus grand que 1, mais 90 cm est plus court que 1 m.\nRéponse : a) > ; b) = ; c) < ; d) <.",
          micros: ["ce2_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: "<" },
          ],
        },
        {
          enonce: "Choisis la bonne longueur. Écris la lettre.\na) Une voiture : A) 4 cm B) 40 km C) 4 m\nb) L'épaisseur d'une pièce de 1 euro : A) 2 mm B) 2 cm C) 2 m\nc) La taille d'un enfant de CE2 : A) 13 m B) 130 cm C) 13 cm",
          correction:
            "Je compare à des repères connus.\na) Une voiture, c'est environ 4 grands pas : 4 m. Réponse C.\nb) Une pièce est très fine, à peine plus que deux traits de crayon : environ 2 mm. Réponse A.\nc) Un enfant de CE2 mesure un peu plus d'un mètre : 130 cm. 13 cm, c'est la longueur d'un crayon. Réponse B.\n⛔ Le piège : garder le bon nombre et oublier l'unité. « 13 m » pour un enfant, c'est la hauteur d'un immeuble.\nRéponse : a) C ; b) A ; c) B.",
          micros: ["ce2_longueur_estimer"],
          reponses: [
            { question: "a)", attendu: ["C", "C) 4 m"] },
            { question: "b)", attendu: ["A", "A) 2 mm"] },
            { question: "c)", attendu: ["B", "B) 130 cm"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 m = 10 dm.\nb) 1 km = 100 m.\nc) 10 mm = 1 cm.\nd) 80 cm est plus long que 1 m.",
          correction:
            "Je relis les égalités du rappel.\na) 1 m = 10 dm. Vrai.\nb) 1 km = $1\\,000$ m, pas 100 m. Faux.\nc) 1 cm = 10 mm. Vrai.\nd) 1 m = 100 cm. 80 cm < 100 cm : 80 cm est plus court. Faux.\n⛔ Le piège du d) : croire 80 cm plus long parce que 80 est plus grand que 1.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_longueur_relations", "ce2_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Quatre ficelles :\nA = 1 m 20 cm ; B = 95 cm ; C = 2 m ; D = 1 m 5 cm.\nRange-les de la plus courte à la plus longue.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les longueurs en centimètres.\nA = 1 m 20 cm = $100 + 20 = 120$ cm.\nB = 95 cm.\nC = 2 m = 200 cm.\nD = 1 m 5 cm = $100 + 5 = 105$ cm.\nJe range : 95 < 105 < 120 < 200.\nDonc B, puis D, puis A, puis C.\n⛔ Le piège : lire 1 m 5 cm comme 150 cm. Il y a 5 cm, pas 50 cm.\nRéponse : B ; D ; A ; C.",
          micros: ["ce2_longueur_comparer", "ce2_longueur_relations"],
          reponses: [{ attendu: ["B ; D ; A ; C", "B < D < A < C", "B, D, A, C"], ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je mets tout dans la même unité AVANT de calculer.",
      rappel: [
        "2 m 35 cm = 200 cm + 35 cm = 235 cm.",
        "3 km 200 m = 3 000 m + 200 m = 3 200 m.",
        "Avant d'additionner ou de soustraire, j'écris toutes les longueurs dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 2 m 35 cm = … cm\nb) 3 m 8 cm = … cm\nc) 4 cm 6 mm = … mm\nd) 2 km 500 m = … m",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 2 m = 200 cm. Donc 2 m 35 cm = $200 + 35 = 235$ cm.\nb) 3 m = 300 cm. Donc 3 m 8 cm = $300 + 8 = 308$ cm.\nc) 4 cm = 40 mm. Donc 4 cm 6 mm = $40 + 6 = 46$ mm.\nd) 2 km = $2\\,000$ m. Donc 2 km 500 m = $2\\,000 + 500 = 2\\,500$ m.\n⛔ Le piège du b) : coller les nombres et écrire 38 cm. 3 m, ce sont 300 cm.\nRéponse : a) 235 ; b) 308 ; c) 46 ; d) $2\\,500$.",
          micros: ["ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: "235", unite: "cm" },
            { question: "b)", attendu: "308", unite: "cm" },
            { question: "c)", attendu: "46", unite: "mm" },
            { question: "d)", attendu: "2500", unite: "m" },
          ],
        },
        {
          enonce: "Deux rubans sont posés sur la règle.\na) Combien mesure le ruban bleu, en mm ?\nb) Combien mesure le ruban orange, en mm ?\nc) Quel ruban est le plus long, et de combien de mm ?",
          figure: regle(
            [
              { de: 10, a: 52, label: "bleu", couleur: BLEU },
              { de: 0, a: 45, label: "orange", couleur: ORANGE },
            ],
            6,
          ),
          correction:
            "a) Le ruban bleu commence au 1, c'est-à-dire à 10 mm. Il finit 2 traits après le 5, à 52 mm.\nIl mesure $52 - 10 = 42$ mm.\nb) Le ruban orange part du 0. Il finit au trait du milieu après le 4 : 45 mm.\nc) 45 > 42 : l'orange est le plus long. $45 - 42 = 3$ mm de plus.\n⛔ Le piège du a) : lire 52 mm. Le ruban bleu ne part pas de 0 : j'enlève les 10 mm du début.\nRéponse : a) 42 ; b) 45 ; c) l'orange, de 3 mm.",
          micros: ["ce2_longueur_mesurer", "ce2_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "42", unite: "mm" },
            { question: "b)", attendu: "45", unite: "mm" },
            { question: "c) le ruban", attendu: ["orange", "l'orange", "le orange", "le ruban orange"] },
            { question: "c) de … mm", attendu: ["3", "trois"], unite: "mm" },
          ],
        },
        {
          enonce: "Lina fait 3 tours d'une piste de 400 m.\na) Quelle distance a-t-elle courue, en mètres ?\nb) Comparée à 1 km, c'est : A) plus B) moins C) autant",
          correction:
            "a) 3 tours de 400 m : $3 \\times 400 = 1\\,200$ m.\nb) 1 km = $1\\,000$ m. $1\\,200$ > $1\\,000$ : c'est plus. Réponse A.\n⛔ Le piège du b) : croire que 1 km est plus long, parce que « kilo » sonne grand. J'écris d'abord 1 km = $1\\,000$ m.\nRéponse : a) $1\\,200$ ; b) A.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: "1200", unite: "m" },
            { question: "b)", attendu: ["A", "A) plus", "plus"] },
          ],
        },
        {
          enonce: "Une couturière a un ruban de 2 m.\nElle coupe 3 morceaux de 40 cm.\nQuelle longueur de ruban reste-t-il, en centimètres ?",
          correction:
            "Je mets tout en centimètres : 2 m = 200 cm.\nLes 3 morceaux : $3 \\times 40 = 120$ cm.\nIl reste : $200 - 120 = 80$ cm.\nJe vérifie : $120 + 80 = 200$ cm = 2 m.\n⛔ Le piège : ne couper qu'un morceau et répondre $200 - 40 = 160$ cm. Elle en coupe trois.\nRéponse : 80.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations"],
          reponses: [{ attendu: "80", unite: "cm" }],
        },
        {
          enonce: "Complète avec km, m, cm ou mm.\na) Une table mesure 80 … de long.\nb) Un pont mesure 300 … de long.\nc) Une fourmi mesure 5 … de long.\nd) De l'école à la mer, il y a 5 …",
          correction:
            "Je lis le nombre ET je pense à l'objet.\na) 80 m, ce serait un terrain de foot. Une table : 80 cm.\nb) 300 cm, c'est 3 m : trop court pour un pont. 300 m.\nc) 5 cm, c'est un gros insecte. Une fourmi : 5 mm.\nd) 5 m, c'est la longueur d'une voiture. Jusqu'à la mer : 5 km.\n⛔ Le piège : choisir une unité sans penser à l'objet. Le même nombre change de sens avec l'unité.\nRéponse : a) cm ; b) m ; c) mm ; d) km.",
          micros: ["ce2_longueur_choisir_unite", "ce2_longueur_estimer"],
          reponses: [
            { question: "a)", attendu: CM },
            { question: "b)", attendu: M },
            { question: "c)", attendu: MM },
            { question: "d)", attendu: KM },
          ],
        },
        {
          enonce: "Un menuisier a une planche de 1 m 50 cm.\nIl la coupe en 3 morceaux égaux.\nCombien mesure un morceau, en centimètres ?",
          correction:
            "Je mets tout en centimètres : 1 m 50 cm = $100 + 50 = 150$ cm.\nTrois morceaux égaux : je partage en 3. $150 \\div 3 = 50$ cm.\nJe vérifie : $3 \\times 50 = 150$ cm.\n⛔ Le piège : calculer $150 - 3$. On ne retire pas 3 cm : on coupe en 3 parts égales.\nRéponse : 50.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations"],
          reponses: [{ attendu: "50", unite: "cm" }],
        },
        {
          enonce: "Au saut en longueur, Tom saute 2 m 40 cm.\nAna saute 245 cm. Léo saute 2 m 4 cm.\na) Qui a sauté le plus loin ?\nb) Qui a sauté le moins loin ?",
          correction:
            "J'écris les trois sauts en centimètres.\nTom : 2 m 40 cm = $200 + 40 = 240$ cm.\nAna : 245 cm.\nLéo : 2 m 4 cm = $200 + 4 = 204$ cm.\nJe range : 204 < 240 < 245.\na) Le plus loin : Ana.\nb) Le moins loin : Léo.\n⛔ Le piège : lire 2 m 4 cm comme 2 m 40 cm. Léo n'a que 4 cm après ses 2 m.\nRéponse : a) Ana ; b) Léo.",
          micros: ["ce2_longueur_comparer", "ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: ["Ana"] },
            { question: "b)", attendu: ["Léo", "Leo"] },
          ],
        },
        {
          enonce: "Pour aller au musée, la classe fait 3 km 200 m en bus.\nPuis elle marche 800 m.\na) Quelle distance en tout, en mètres ?\nb) Écris cette distance en kilomètres.",
          correction:
            "a) 3 km 200 m = $3\\,000 + 200 = 3\\,200$ m.\nJ'ajoute la marche : $3\\,200 + 800 = 4\\,000$ m.\nb) $4\\,000$ m = 4 fois $1\\,000$ m = 4 km.\n⛔ Le piège : écrire « 3 km $1\\,000$ m » et s'arrêter. $1\\,000$ m, c'est 1 km de plus.\nRéponse : a) $4\\,000$ ; b) 4.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: "4000", unite: "m" },
            { question: "b)", attendu: "4", unite: "km" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque longueur dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, et j'y écris toutes les longueurs.",
        "Pour ce qui manque : je calcule ce qu'il faut − ce que j'ai.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "La guirlande de la fête",
          enonce: "Pour la fête, il faut 10 m de guirlande.\nZoé a 3 guirlandes de 2 m 50 cm.\na) Combien mesure une guirlande, en cm ?\nb) Combien mesurent les 3 guirlandes, en cm ?\nc) Combien de cm manque-t-il pour faire 10 m ?",
          correction:
            "Je mets tout en centimètres.\na) 2 m 50 cm = $200 + 50 = 250$ cm.\nb) $3 \\times 250 = 750$ cm.\nc) 10 m = $1\\,000$ cm. Il manque $1\\,000 - 750 = 250$ cm.\nJe vérifie : $750 + 250 = 1\\,000$ cm = 10 m.\n⛔ Le piège : ne compter qu'une guirlande. Zoé en a trois.\nRéponse : a) 250 ; b) 750 ; c) 250.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations", "ce2_longueur_defi"],
          reponses: [
            { question: "a)", attendu: "250", unite: "cm" },
            { question: "b)", attendu: "750", unite: "cm" },
            { question: "c)", attendu: "250", unite: "cm" },
          ],
        },
        {
          titre: "L'escargot et le mur",
          enonce: "Un escargot grimpe un mur de 1 m.\nLe jour, il monte de 40 cm. La nuit, il glisse de 20 cm.\na) À la fin de la première nuit, à quelle hauteur est-il, en cm ?\nb) Combien de jours lui faut-il pour arriver en haut ?",
          correction:
            "1 m = 100 cm.\na) Jour 1 : il monte à 40 cm. Nuit 1 : il glisse à $40 - 20 = 20$ cm.\nb) Je suis l'escargot jour après jour.\nJour 2 : $20 + 40 = 60$ cm, puis il glisse à 40 cm.\nJour 3 : $40 + 40 = 80$ cm, puis il glisse à 60 cm.\nJour 4 : $60 + 40 = 100$ cm. Il est en haut ! Il ne glisse plus.\nIl lui faut 4 jours.\n⛔ Le piège : dire « 20 cm par jour, donc $100 \\div 20 = 5$ jours ». Le 4e jour, il arrive en haut AVANT la nuit.\nRéponse : a) 20 ; b) 4.",
          micros: ["ce2_longueur_defi", "ce2_longueur_probleme"],
          reponses: [
            { question: "a)", attendu: "20", unite: "cm" },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "La tournée du facteur",
          enonce: "Le matin, le facteur fait 2 km 400 m. L'après-midi, il fait 1 km 800 m.\na) Quelle distance fait-il dans la journée, en mètres ?\nb) De combien de mètres le trajet du matin est-il plus long ?\nc) Combien de mètres lui manque-t-il pour faire 5 km ?",
          correction:
            "Je mets tout en mètres.\nMatin : 2 km 400 m = $2\\,000 + 400 = 2\\,400$ m.\nAprès-midi : 1 km 800 m = $1\\,000 + 800 = 1\\,800$ m.\na) $2\\,400 + 1\\,800 = 4\\,200$ m.\nb) $2\\,400 - 1\\,800 = 600$ m.\nc) 5 km = $5\\,000$ m. $5\\,000 - 4\\,200 = 800$ m.\n⛔ Le piège : calculer $5 - 4\\,200$. J'écris d'abord 5 km = $5\\,000$ m.\nRéponse : a) $4\\,200$ ; b) 600 ; c) 800.",
          micros: ["ce2_longueur_probleme", "ce2_longueur_relations", "ce2_longueur_comparer"],
          reponses: [
            { question: "a)", attendu: "4200", unite: "m" },
            { question: "b)", attendu: "600", unite: "m" },
            { question: "c)", attendu: "800", unite: "m" },
          ],
        },
        {
          titre: "Les trois rubans",
          enonce: "Le ruban rouge mesure 1 m.\nLe ruban bleu est 2 fois plus court que le rouge.\nLe ruban vert mesure 15 cm de plus que le bleu.\na) Combien mesure le bleu, en cm ?\nb) Combien mesure le vert, en cm ?\nc) Combien mesurent les trois rubans mis bout à bout, en cm ?",
          correction:
            "Je mets tout en centimètres : le rouge, 1 m = 100 cm.\na) 2 fois plus court : je partage en 2. $100 \\div 2 = 50$ cm.\nb) 15 cm de plus que le bleu : $50 + 15 = 65$ cm.\nc) $100 + 50 + 65 = 215$ cm.\n⛔ Le piège du a) : calculer $100 \\times 2 = 200$ cm. « Plus court » : le bleu est plus petit que le rouge.\nRéponse : a) 50 ; b) 65 ; c) 215.",
          micros: ["ce2_longueur_defi", "ce2_longueur_relations"],
          reponses: [
            { question: "a)", attendu: "50", unite: "cm" },
            { question: "b)", attendu: "65", unite: "cm" },
            { question: "c)", attendu: "215", unite: "cm" },
          ],
        },
      ],
    },
  ],
};
