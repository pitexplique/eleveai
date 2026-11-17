// ─── Fiche d'exercices : les masses (CE2) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `masse` du coach CE2
// (« Masses », 7 micros). Sur la forme des feuilles du CM1 et du CE1
// (`maths-cm1-masse.tsx`, `maths-ce1-masse.tsx`) : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/masse.bank.ts`, `grandeurs-ce2.ts`) :
// g, kg et t ; 1 kg = 1 000 g, 1 t = 1 000 kg ; la tare (la boîte pleine pèse
// la boîte PLUS ce qu'il y a dedans).
// ⛔ LIMITES DU CE2 : pas de tableau de conversion, pas d'écriture à virgule
// (« 2 kg 500 g », jamais « 2,5 kg »), des nombres jusqu'à 10 000 (jamais les
// grammes d'une tonne).
// ⛔ Aucune question à rédiger : QCM par lettre, signe, vrai ou faux, un
// nombre seul dans l'unité imposée, un mot (une unité, oui / non).
// ⛔ 18 mots au plus par phrase.
//
// Les pièges nommés : 1 kg = 100 g (1, 7), additionner 1 + 500 + 200 sans
// convertir (2), comparer 2 et 1 900 sans les unités (3, 8, 12), le kilo de
// plumes « plus léger » (7), le plateau du haut pris pour le plus lourd (6),
// une unité absurde (4, 5, 13), 4 kg 5 g = 4 500 g (9), oublier la boîte (10),
// lire 2 kg 50 g comme 2 500 g (12), garder la masse d'un seul gâteau (14),
// soustraire au lieu de partager (15), deux melons pour un (16), 3 + 2 500
// (17), compter un pot à moitié plein (18), oublier les trois bouteilles (19),
// le cube pris pour 1 kg (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : potager (2), cuisine (10, 14), sport (11),
// épicerie (12), marché (15, 16), chantier (17), confiture (18), randonnée
// (19), énigme de balances (20). Les métiers : épicière (12), maraîchère (15),
// conducteur de camion (17), guide de montagne (19).
// UN SEUL contexte réunionnais (18, les goyaviers de Kenzo, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 7 — « un kilo de plumes pèse autant qu'un kilo de pierres » : c'est
//     la définition même de la masse (1 kg = 1 kg), pas un fait mesuré.
//   · ex. 13 — un ballon de football pèse de 410 à 450 g (Lois du jeu de
//     l'IFAB, loi 2) : « 400 g » est le choix le plus proche ; un éléphant
//     d'Afrique adulte pèse plusieurs tonnes (de 4 à 7 t, Larousse,
//     « éléphant »).
// Tout le reste est un MODÈLE (les masses d'une banane, d'un cartable, d'une
// fraise sont des ordres de grandeur).
//
// ⭐ LES DESSINS : la balance à plateaux (`balance`, `deuxBalances` de
// `dessins-ce2-lotG.tsx`), équilibrée ou penchée, jamais la masse cherchée.
//
// Micro-compétences (7/7) : ce2_masse_unites (1, 4, 7), ce2_masse_relations
// (1, 2, 7, 8, 9, 11, 12, 14, 16, 17, 18, 19, 20), ce2_masse_comparer (3, 6,
// 7, 8, 12), ce2_masse_choisir_unite (4, 13), ce2_masse_estimer (5, 13),
// ce2_masse_probleme (10, 11, 14, 15, 17, 18, 19), ce2_masse_defi (16, 17,
// 18, 19, 20).

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { balance, deuxBalances } from "@/lib/fiches-exercices/dessins-ce2-lotG";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];
const G = ["g", "gramme", "grammes"];
const KG = ["kg", "kilogramme", "kilogrammes", "kilo", "kilos"];
const T = ["t", "tonne", "tonnes"];

export const exercicesMasseCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "masse",
  titre: "Les masses",
  accroche:
    "Vingt exercices, du plus facile au défi. Le gramme, le kilogramme et la tonne. Lire une balance à plateaux. Comparer et ranger des masses. Estimer la masse d'un objet. Une citrouille, un sac de sport, un camion de sable, de la confiture et un sac de randonnée. Lis le rappel avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, la lettre, le signe ou le mot.",
      rappel: [
        "1 kg = 1 000 g. 1 t = 1 000 kg.",
        "Pour comparer deux masses, je les écris d'abord dans la même unité.",
        "Sur une balance, le plateau le plus lourd descend.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 kg = … g\nb) 3 kg = … g\nc) 2 t = … kg\nd) 6 000 g = … kg",
          correction:
            "J'utilise les égalités du rappel.\na) 1 kg = $1\\,000$ g.\nb) 3 kg, c'est 3 fois $1\\,000$ g : $3\\,000$ g.\nc) 1 t = $1\\,000$ kg. Donc 2 t, c'est $2\\,000$ kg.\nd) Dans $6\\,000$ g, il y a 6 fois $1\\,000$ g. Donc $6\\,000$ g = 6 kg.\n⛔ Le piège : écrire 1 kg = 100 g. Dans 1 kg, il y a $1\\,000$ g : trois zéros.\nRéponse : a) $1\\,000$ ; b) $3\\,000$ ; c) $2\\,000$ ; d) 6.",
          micros: ["ce2_masse_unites", "ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: "1000", unite: "g" },
            { question: "b)", attendu: "3000", unite: "g" },
            { question: "c)", attendu: "2000", unite: "kg" },
            { question: "d)", attendu: "6", unite: "kg" },
          ],
        },
        {
          enonce: "Au potager, Jade pèse une citrouille.\nLa balance est équilibrée.\nCombien pèse la citrouille, en grammes ?",
          figure: balance(["citrouille"], ["200 g", "500 g", "1 kg"]),
          correction:
            "La balance est équilibrée : les deux plateaux ont la même masse.\nÀ droite, je mets tout en grammes : 1 kg = $1\\,000$ g.\nJ'additionne : $1\\,000 + 500 + 200 = 1\\,700$ g.\nDonc la citrouille pèse $1\\,700$ g.\n⛔ Le piège : calculer $1 + 500 + 200 = 701$. Le 1 compte des kilogrammes, pas des grammes.\nRéponse : $1\\,700$.",
          micros: ["ce2_masse_relations"],
          reponses: [{ attendu: "1700", unite: "g" }],
        },
        {
          enonce: "Écris le signe <, > ou =.\na) 2 kg … 1 900 g\nb) 700 g … 1 kg\nc) 4 000 kg … 4 t\nd) 3 kg … 300 g",
          correction:
            "J'écris les deux masses dans la même unité, puis je compare.\na) 2 kg = $2\\,000$ g. $2\\,000$ g est plus que $1\\,900$ g. Donc 2 kg > $1\\,900$ g.\nb) 1 kg = $1\\,000$ g. 700 g est moins que $1\\,000$ g. Donc 700 g < 1 kg.\nc) 4 t = $4\\,000$ kg. Les deux sont égales : $4\\,000$ kg = 4 t.\nd) 3 kg = $3\\,000$ g. C'est plus que 300 g. Donc 3 kg > 300 g.\n⛔ Le piège : comparer 2 et $1\\,900$ sans les unités. 2 kg, ce sont $2\\,000$ g.\nRéponse : a) > ; b) < ; c) = ; d) >.",
          micros: ["ce2_masse_comparer"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce: "Quelle unité choisir : g, kg ou t ?\na) Un camion\nb) Une gomme\nc) Un enfant de CE2\nd) Une baleine",
          correction:
            "Je compare à deux repères : un paquet de sucre pèse 1 kg, une voiture environ 1 t.\na) Un camion pèse plus que plusieurs voitures : t.\nb) Une gomme est bien plus légère qu'un paquet de sucre : g.\nc) Un enfant pèse comme plusieurs dizaines de paquets de sucre : kg.\nd) Une baleine pèse plus qu'un camion : t.\n⛔ Le piège : choisir kg pour tout. Pour ce qui est très lourd, la tonne convient mieux.\nRéponse : a) t ; b) g ; c) kg ; d) t.",
          micros: ["ce2_masse_choisir_unite", "ce2_masse_unites"],
          reponses: [
            { question: "a)", attendu: T },
            { question: "b)", attendu: G },
            { question: "c)", attendu: KG },
            { question: "d)", attendu: T },
          ],
        },
        {
          enonce: "Choisis la bonne masse. Écris la lettre.\na) Une banane : A) 12 kg B) 120 g C) 1 g\nb) Un cartable plein : A) 30 g B) 3 t C) 3 kg\nc) Une voiture : A) 1 t B) 10 kg C) 100 g",
          correction:
            "Je compare au paquet de sucre de 1 kg.\na) Il faut environ 8 bananes pour faire 1 kg. Une banane : environ 120 g. Réponse B.\nb) Un cartable plein pèse comme trois paquets de sucre : environ 3 kg. Réponse C.\nc) Une voiture est très lourde : environ 1 t, c'est-à-dire $1\\,000$ kg. Réponse A.\n⛔ Le piège : garder le bon nombre et changer l'unité. « 3 t » pour un cartable, c'est le poids de trois voitures.\nRéponse : a) B ; b) C ; c) A.",
          micros: ["ce2_masse_estimer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 120 g"] },
            { question: "b)", attendu: ["C", "C) 3 kg"] },
            { question: "c)", attendu: ["A", "A) 1 t"] },
          ],
        },
        {
          enonce: "Regarde la balance.\nLe chou pèse : A) plus que 1 kg B) moins que 1 kg C) autant que 1 kg",
          figure: balance(["chou"], ["1 kg"], "droite"),
          correction:
            "Le plateau de la masse de 1 kg est descendu. Le plateau du chou est monté.\nLe plateau le plus lourd descend.\nDonc la masse de 1 kg est plus lourde : le chou pèse moins que 1 kg. Réponse B.\n⛔ Le piège : croire que le plateau du haut est le plus lourd. C'est l'inverse : le lourd tire vers le bas.\nRéponse : B.",
          micros: ["ce2_masse_comparer"],
          reponses: [{ attendu: ["B", "B) moins que 1 kg", "moins"] }],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 t = 1 000 kg.\nb) 1 kg = 10 g.\nc) 2 000 g = 2 kg.\nd) Un kilo de plumes est plus léger qu'un kilo de pierres.",
          correction:
            "Je relis les égalités du rappel.\na) 1 t = $1\\,000$ kg. Vrai.\nb) 1 kg = $1\\,000$ g, pas 10 g. Faux.\nc) $2\\,000$ g, c'est 2 fois $1\\,000$ g : 2 kg. Vrai.\nd) Un kilo de plumes pèse 1 kg. Un kilo de pierres pèse aussi 1 kg. Ils pèsent pareil. Faux.\n⛔ Le piège du d) : penser aux plumes légères. Il en faut beaucoup, mais 1 kg reste 1 kg.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_masse_unites", "ce2_masse_relations", "ce2_masse_comparer"],
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
            { question: "d)", attendu: FAUX },
          ],
        },
        {
          enonce: "Quatre paquets :\nA = 1 kg 200 g ; B = 900 g ; C = 2 kg ; D = 1 050 g.\nRange-les du plus léger au plus lourd.\nÉcris les lettres séparées par « ; ».",
          correction:
            "J'écris toutes les masses en grammes.\nA = 1 kg 200 g = $1\\,000 + 200 = 1\\,200$ g.\nB = 900 g.\nC = 2 kg = $2\\,000$ g.\nD = $1\\,050$ g.\nJe range : 900 < $1\\,050$ < $1\\,200$ < $2\\,000$.\nDonc B, puis D, puis A, puis C.\n⛔ Le piège : mettre C en premier parce que « 2 » est un petit nombre. 2 kg, c'est $2\\,000$ g.\nRéponse : B ; D ; A ; C.",
          micros: ["ce2_masse_comparer", "ce2_masse_relations"],
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
        "2 kg 300 g = 2 000 g + 300 g = 2 300 g.",
        "Une boîte pleine pèse la boîte PLUS ce qu'il y a dedans.",
        "Avant d'additionner ou de soustraire, j'écris toutes les masses dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 2 kg 300 g = … g\nb) 4 kg 5 g = … g\nc) 1 600 g = … kg … g\nd) 3 t 200 kg = … kg",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) 2 kg = $2\\,000$ g. Donc 2 kg 300 g = $2\\,000 + 300 = 2\\,300$ g.\nb) 4 kg = $4\\,000$ g. Donc 4 kg 5 g = $4\\,000 + 5 = 4\\,005$ g.\nc) $1\\,600$ g = $1\\,000$ g + 600 g = 1 kg 600 g.\nd) 3 t = $3\\,000$ kg. Donc 3 t 200 kg = $3\\,000 + 200 = 3\\,200$ kg.\n⛔ Le piège du b) : écrire $4\\,500$ g ou 45 g. Il y a 5 g, pas 500 g : $4\\,000 + 5 = 4\\,005$.\nRéponse : a) $2\\,300$ ; b) $4\\,005$ ; c) 1 kg 600 g ; d) $3\\,200$.",
          micros: ["ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: "2300", unite: "g" },
            { question: "b)", attendu: "4005", unite: "g" },
            { question: "c) kg", attendu: "1", unite: "kg" },
            { question: "c) g", attendu: "600", unite: "g" },
            { question: "d)", attendu: "3200", unite: "kg" },
          ],
        },
        {
          enonce: "Une boîte vide pèse 200 g.\nPleine de biscuits, elle pèse 1 kg.\nCombien pèsent les biscuits seuls, en grammes ?",
          figure: balance(["boîte pleine"], ["1 kg"]),
          correction:
            "La boîte pleine pèse la boîte PLUS les biscuits.\nJe mets tout en grammes : 1 kg = $1\\,000$ g.\nJ'enlève la boîte : $1\\,000 - 200 = 800$ g.\nJe vérifie : $800 + 200 = 1\\,000$ g = 1 kg.\n⛔ Le piège : répondre 1 kg. La balance pèse aussi la boîte : je l'enlève.\nRéponse : 800.",
          micros: ["ce2_masse_probleme"],
          reponses: [{ attendu: "800", unite: "g" }],
        },
        {
          enonce: "Dans son sac de sport, Yanis met un ballon de 450 g.\nIl ajoute des chaussures de 800 g et une gourde de 750 g.\na) Combien pèse le sac, en grammes ?\nb) Écris cette masse en kilogrammes.",
          correction:
            "a) Toutes les masses sont en grammes. J'additionne.\n$450 + 750 = 1\\,200$. Puis $1\\,200 + 800 = 2\\,000$ g.\nb) $2\\,000$ g, c'est 2 fois $1\\,000$ g : 2 kg.\n⛔ Le piège du b) : écrire 2 000 kg. Le nombre de kilogrammes est plus petit que le nombre de grammes.\nRéponse : a) $2\\,000$ ; b) 2.",
          micros: ["ce2_masse_probleme", "ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: "2000", unite: "g" },
            { question: "b)", attendu: "2", unite: "kg" },
          ],
        },
        {
          enonce: "Une épicière range trois sacs de riz.\nA : 2 kg 50 g. B : 2 500 g. C : 2 kg 200 g.\na) Quel sac est le plus lourd ? Écris la lettre.\nb) Quel sac est le plus léger ? Écris la lettre.",
          correction:
            "J'écris les trois masses en grammes.\nA : 2 kg 50 g = $2\\,000 + 50 = 2\\,050$ g.\nB : $2\\,500$ g.\nC : 2 kg 200 g = $2\\,000 + 200 = 2\\,200$ g.\nJe range : $2\\,050$ < $2\\,200$ < $2\\,500$.\na) Le plus lourd : B.\nb) Le plus léger : A.\n⛔ Le piège : lire 2 kg 50 g comme $2\\,500$ g. Ici, il n'y a que 50 g après les 2 kg.\nRéponse : a) B ; b) A.",
          micros: ["ce2_masse_comparer", "ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: ["B", "le B", "le sac B"] },
            { question: "b)", attendu: ["A", "le A", "le sac A"] },
          ],
        },
        {
          enonce: "Complète avec g, kg ou t.\na) Une fraise pèse environ 20 …\nb) Un ballon de football pèse environ 400 …\nc) Un éléphant d'Afrique pèse environ 5 …\nd) Un sac de farine pèse 1 …",
          correction:
            "Je lis le nombre ET je pense à l'objet.\na) 20 kg pour une fraise, ce serait le poids d'un gros chien. C'est 20 g.\nb) Un ballon se lance d'une main : 400 g.\nc) 5 kg, c'est le poids d'un chat. Un éléphant pèse comme plusieurs voitures : 5 t.\nd) Un sac de farine, comme un paquet de sucre : 1 kg.\n⛔ Le piège : choisir la même unité pour tout. Le même nombre change de sens avec l'unité.\nRéponse : a) g ; b) g ; c) t ; d) kg.",
          micros: ["ce2_masse_estimer", "ce2_masse_choisir_unite"],
          reponses: [
            { question: "a)", attendu: G },
            { question: "b)", attendu: G },
            { question: "c)", attendu: T },
            { question: "d)", attendu: KG },
          ],
        },
        {
          enonce: "Pour un gâteau, il faut 300 g de farine.\nMaël fait 3 gâteaux. Il a un paquet de 1 kg.\na) Combien de grammes de farine utilise-t-il ?\nb) Combien de grammes reste-t-il dans le paquet ?",
          correction:
            "a) 3 gâteaux, c'est 3 fois 300 g : $3 \\times 300 = 900$ g.\nb) Je mets le paquet en grammes : 1 kg = $1\\,000$ g.\nJ'enlève la farine utilisée : $1\\,000 - 900 = 100$ g.\n⛔ Le piège : garder 300 g, la farine d'un seul gâteau. Trois gâteaux, trois fois plus de farine.\nRéponse : a) 900 ; b) 100.",
          micros: ["ce2_masse_probleme", "ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: "900", unite: "g" },
            { question: "b)", attendu: "100", unite: "g" },
          ],
        },
        {
          enonce: "Une maraîchère a 40 kg de pommes de terre.\nElle les range dans des sacs de 5 kg.\nCombien de sacs remplit-elle ?",
          correction:
            "Je cherche combien de fois 5 kg tient dans 40 kg.\nC'est un partage en paquets de 5 : $40 \\div 5 = 8$.\nJe vérifie : $8 \\times 5 = 40$ kg.\n⛔ Le piège : calculer $40 - 5 = 35$. On ne retire pas un seul sac : on fait des paquets égaux.\nRéponse : 8.",
          micros: ["ce2_masse_probleme"],
          reponses: [{ attendu: ["8", "huit"] }],
        },
        {
          enonce: "Au marché, deux melons pareils sont sur un plateau.\nLa balance est équilibrée.\nCombien pèse UN melon, en grammes ?",
          figure: balance(["melon", "melon"], ["2 kg"]),
          correction:
            "La balance est équilibrée : les deux melons pèsent 2 kg ensemble.\nJe mets en grammes : 2 kg = $2\\,000$ g.\nLes deux melons sont pareils : je partage en 2. $2\\,000 \\div 2 = 1\\,000$ g.\nJe vérifie : $1\\,000 + 1\\,000 = 2\\,000$ g.\n⛔ Le piège : répondre $2\\,000$ g. C'est la masse des DEUX melons.\nRéponse : $1\\,000$.",
          micros: ["ce2_masse_defi", "ce2_masse_relations"],
          reponses: [{ attendu: "1000", unite: "g" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'écris chaque masse dans la même unité, puis je calcule pas à pas.",
      rappel: [
        "Je choisis UNE unité, et j'y écris toutes les masses.",
        "Pour une limite (« au plus 6 t »), je compare le total à la limite.",
        "À la fin, je relis la question : quelle unité demande-t-elle ?",
      ],
      exercices: [
        {
          titre: "Le camion de sable",
          enonce: "Un conducteur de camion part au chantier.\nSon camion vide pèse 3 t. Il charge 2 500 kg de sable.\na) Écris la masse du camion vide en kilogrammes.\nb) Combien pèse le camion chargé, en kilogrammes ?\nc) Un pont porte 6 t au plus. Le camion peut-il passer ? Écris oui ou non.",
          correction:
            "a) 1 t = $1\\,000$ kg. Donc 3 t = $3\\,000$ kg.\nb) J'ajoute le sable : $3\\,000 + 2\\,500 = 5\\,500$ kg.\nc) 6 t = $6\\,000$ kg. $5\\,500$ < $6\\,000$ : le camion est assez léger. Oui, il peut passer.\n⛔ Le piège : calculer $3 + 2\\,500$. J'écris d'abord 3 t = $3\\,000$ kg.\nRéponse : a) $3\\,000$ ; b) $5\\,500$ ; c) oui.",
          micros: ["ce2_masse_probleme", "ce2_masse_relations", "ce2_masse_defi"],
          reponses: [
            { question: "a)", attendu: "3000", unite: "kg" },
            { question: "b)", attendu: "5500", unite: "kg" },
            { question: "c)", attendu: ["oui", "oui il peut"] },
          ],
        },
        {
          titre: "La confiture de goyaviers",
          enonce: "Kenzo cueille 1 kg 500 g de goyaviers. Sa sœur en cueille 800 g.\na) Combien de grammes de fruits ont-ils en tout ?\nb) Il faut 500 g de fruits pour un pot. Combien de pots PLEINS ?\nc) Combien de grammes de fruits restent ?",
          correction:
            "a) 1 kg 500 g = $1\\,000 + 500 = 1\\,500$ g.\nJ'ajoute : $1\\,500 + 800 = 2\\,300$ g.\nb) Je compte par 500 : 500, $1\\,000$, $1\\,500$, $2\\,000$. Ça fait 4 pots.\nUn 5e pot demanderait $2\\,500$ g : il n'y a pas assez.\nc) $2\\,300 - 2\\,000 = 300$ g restent.\n⛔ Le piège du b) : compter 5 pots. Avec 300 g, le 5e pot n'est pas plein.\nRéponse : a) $2\\,300$ ; b) 4 ; c) 300.",
          micros: ["ce2_masse_probleme", "ce2_masse_relations", "ce2_masse_defi"],
          reponses: [
            { question: "a)", attendu: "2300", unite: "g" },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: "300", unite: "g" },
          ],
        },
        {
          titre: "Le sac de randonnée",
          enonce: "Un guide de montagne prépare son sac. Le sac vide pèse 1 kg.\nIl met 3 bouteilles d'eau de 500 g chacune.\nIl ajoute un pique-nique de 700 g et une veste de 800 g.\na) Combien pèsent les 3 bouteilles, en grammes ?\nb) Combien pèse le sac plein, en grammes ?\nc) Écris cette masse en kilogrammes.",
          correction:
            "a) $3 \\times 500 = 1\\,500$ g.\nb) Je mets tout en grammes : le sac vide, 1 kg = $1\\,000$ g.\nJ'additionne : $1\\,000 + 1\\,500 + 700 + 800 = 4\\,000$ g.\nc) $4\\,000$ g = 4 fois $1\\,000$ g = 4 kg.\n⛔ Le piège : compter une seule bouteille de 500 g. Il y en a trois.\nRéponse : a) $1\\,500$ ; b) $4\\,000$ ; c) 4.",
          micros: ["ce2_masse_probleme", "ce2_masse_relations", "ce2_masse_defi"],
          reponses: [
            { question: "a)", attendu: "1500", unite: "g" },
            { question: "b)", attendu: "4000", unite: "g" },
            { question: "c)", attendu: "4", unite: "kg" },
          ],
        },
        {
          titre: "L'énigme des deux balances",
          enonce: "Les deux balances sont équilibrées. Les cubes sont tous pareils.\na) Combien pèse un cube, en grammes ?\nb) Combien pèse le ballon, en grammes ?",
          figure: deuxBalances([
            { nom: "Balance 1", gauche: ["cube", "cube"], droite: ["1 kg"] },
            { nom: "Balance 2", gauche: ["ballon"], droite: ["cube", "cube", "cube"] },
          ]),
          correction:
            "a) Balance 1 : deux cubes pèsent 1 kg, c'est-à-dire $1\\,000$ g.\nUn cube pèse la moitié : $1\\,000 \\div 2 = 500$ g.\nb) Balance 2 : le ballon pèse autant que trois cubes.\n$3 \\times 500 = 1\\,500$ g.\n⛔ Le piège : croire qu'un cube pèse 1 kg. Sur la balance 1, il faut DEUX cubes pour 1 kg.\nRéponse : a) 500 ; b) $1\\,500$.",
          micros: ["ce2_masse_defi", "ce2_masse_relations"],
          reponses: [
            { question: "a)", attendu: "500", unite: "g" },
            { question: "b)", attendu: "1500", unite: "g" },
          ],
        },
      ],
    },
  ],
};
