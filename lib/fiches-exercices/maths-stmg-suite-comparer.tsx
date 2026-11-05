// ─── Fiche d'exercices : comparer deux suites (STMG, Tle) — 20 exercices ───────
//
// Notion suite_comparer du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts`). Le coach demande :
// le rang où une suite géométrique dépasse une autre (tableau), qui l'emporte à long
// terme (la plus grande raison), arithmétique contre géométrique, intérêts simples
// contre composés (valeurs et nature des suites), taux proportionnel (on divise) et
// taux équivalent (celui qui redonne exactement le taux annuel). Le coach ne fait
// jamais CALCULER le taux équivalent par une racine : la feuille le donne et le met
// à l'épreuve par une puissance, comme lui.
//
// ⭐ Aucune donnée réelle : tous les taux et toutes les offres sont fictifs (modèles).
//
// Domaines et métiers : suites nues et placements simples (ex. 1 à 8) ; cinéma
// (directrice de réseau), éolien (cheffe de projet), notariat (notaire), retraite
// (Jules), banque (conseiller), conseil financier (conseillère), épargne
// (Salomé), jeu vidéo (plateformes, analyste), famille (grand-mère de Lou), RH
// (contrats), placement (Mathis), panneaux solaires (ingénieure).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suiteT_comparer_geometriques (1, 2, 9, 16),
// suiteT_comparer_arith_geo (3, 4, 10, 18, 20), suiteT_interets_simples_composes
// (5, 6, 8, 11, 12, 17), suiteT_taux_equivalent_proportionnel (7, 13, 14, 15, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

// Les écritures qu'un élève tape vraiment : le correcteur compare ces mots au texte.
const ARITH = ["arithmétique", "arithmétiques", "suite arithmétique", "la suite arithmétique", "une suite arithmétique", "l'arithmétique"];
const GEO = ["géométrique", "géométriques", "suite géométrique", "la suite géométrique", "une suite géométrique", "la géométrique"];

export const exercicesSuiteComparerStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-comparer",
  titre: "Comparer deux suites",
  accroche:
    "Vingt exercices pour choisir entre deux évolutions : quel placement finit par passer devant, ajouter ou multiplier, intérêts simples ou composés, taux proportionnel ou taux équivalent. Un petit taux part devant, un grand taux le rattrape, et le choix dépend souvent de la durée. Deux cinémas, deux projets éoliens, deux contrats de travail, la somme d'une grand-mère. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un croisement, calculer une valeur acquise, diviser un taux, ou nommer une suite.",
      rappel: [
        "Comparer deux suites : on cherche le premier rang où l'une passe devant l'autre. À long terme, c'est la plus grande raison qui gagne.",
        "Une croissance exponentielle (raison > 1) finit toujours par dépasser une croissance linéaire.",
        "Intérêts simples : on ajoute chaque année le même montant, suite arithmétique. Intérêts composés : on multiplie par le même coefficient, suite géométrique.",
        "Taux proportionnel : on DIVISE le taux annuel par le nombre de périodes.",
      ],
      exercices: [
        {
          enonce:
            "Placement A : 2 000 € à 1 % par an. Placement B : 1 000 € à 20 % par an. Sur une très longue durée, lequel l'emporte ? Réponds par la lettre.\nA : Le placement A, parce qu'il part de plus haut.\nB : Le placement B, parce que sa raison est plus grande.\nC : On ne peut pas le savoir.",
          reponses: [{ attendu: "B" }],
          correction:
            "On compare les raisons : 1,01 pour A, 1,2 pour B.\nL'avance de départ est fixe, l'écart de raison se multiplie chaque année : B finit par passer devant.\n⛔ Le piège : choisir A, qui est bel et bien devant les premières années. À long terme, seule la raison compte.\nRéponse : B.",
          micros: ["suiteT_comparer_geometriques"],
        },
        {
          enonce:
            "Le tableau donne deux suites géométriques (valeurs arrondies). À partir de quel rang B dépasse-t-elle A ?",
          figure: grille(["n", "A", "B"], [
            [0, 2400, 1200],
            [1, 2448, 1500],
            [2, 2497, 1875],
            [3, 2547, 2344],
            [4, 2598, 2930],
          ]),
          reponses: [{ attendu: "4" }],
          correction:
            "On compare ligne à ligne.\nRang 3 : 2 344 est encore sous 2 547.\nRang 4 : 2 930 dépasse 2 598.\n⛔ Le piège : répondre 2 930. On demande le rang, pas la valeur.\nRéponse : à partir du rang 4.",
          micros: ["suiteT_comparer_geometriques"],
        },
        {
          enonce:
            "Une suite arithmétique de raison 500 part de 1 000. Une suite géométrique de raison 1,1 part aussi de 1 000. Laquelle finit par dépasser l'autre, et le reste définitivement ? Réponds arithmétique ou géométrique.",
          reponses: [{ attendu: GEO }],
          correction:
            "Au début, l'arithmétique domine : au rang 10, elle vaut 6 000 contre environ 2 594.\nMais au rang 40, elle vaut 21 000 contre environ 45 259, et l'écart ne cesse de se creuser.\nUne croissance exponentielle finit toujours par dépasser une croissance linéaire.\n⛔ Le piège : comparer 500 et 1,1. Ces raisons ne sont pas de même nature : l'une s'ajoute, l'autre multiplie.\nRéponse : géométrique.",
          micros: ["suiteT_comparer_arith_geo"],
        },
        {
          enonce:
            "Le projet A rapporte 3 000 € au rang 0, puis 1 000 € de plus à chaque rang. Le projet B rapporte 300 € au rang 0, puis est multiplié par 2 à chaque rang. À partir de quel rang B rapporte-t-il plus que A ?",
          figure: grille(["n", "A", "B"], [
            [0, 3000, 300],
            [1, 4000, 600],
            [2, 5000, 1200],
            [3, 6000, 2400],
            [4, 7000, 4800],
            [5, 8000, 9600],
          ]),
          reponses: [{ attendu: "5" }],
          correction:
            "Rang 4 : 4 800 est encore sous 7 000.\nRang 5 : 9 600 dépasse 8 000.\n⛔ Le piège : s'arrêter en voyant que B est très loin au début. Celle qui multiplie part de très bas, mais elle accélère.\nRéponse : à partir du rang 5.",
          micros: ["suiteT_comparer_arith_geo"],
        },
        {
          enonce:
            "Un capital de 3 000 € est placé à 5 % par an pendant 4 ans, à intérêts SIMPLES. Quelle est sa valeur acquise ?",
          reponses: [{ attendu: "3 600 €" }],
          correction:
            "Chaque année, on ajoute 5 % de 3 000 €, soit 150 €.\n$3\\,000 + 4 \\times 150 = 3\\,600$ €.\n⛔ Le piège : calculer 5 % sur le capital déjà augmenté. En intérêts simples, le pourcentage porte toujours sur le capital de départ.\nRéponse : 3 600 €.",
          micros: ["suiteT_interets_simples_composes"],
        },
        {
          enonce:
            "Le même capital de 3 000 € est placé à 5 % par an pendant 4 ans, à intérêts COMPOSÉS. Quelle est sa valeur acquise, au centime près ?",
          reponses: [{ attendu: "3 646,52 €", tolerance: 0.005 }],
          correction:
            "En intérêts composés, on multiplie chaque année par 1,05.\n$3\\,000 \\times 1{,}05^4 = 3\\,646{,}51875$, soit $3\\,646{,}52$ € au centime près.\n⛔ Le piège : calculer $3\\,000 \\times 1{,}05 \\times 4$. L'exposant compte les années, on ne multiplie pas par 4.\nRéponse : 3 646,52 €.",
          micros: ["suiteT_interets_simples_composes"],
        },
        {
          enonce:
            "Un taux annuel de 6 % est ramené à une période plus courte.\na) Quel est le taux mensuel proportionnel ?\nb) Quel est le taux trimestriel proportionnel ?",
          reponses: [
            { question: "a)", attendu: "0,5 %" },
            { question: "b)", attendu: "1,5 %" },
          ],
          correction:
            "Le taux proportionnel s'obtient en divisant.\na) 12 mois : $6 \\div 12 = 0{,}5$, soit 0,5 %.\nb) 4 trimestres : $6 \\div 4 = 1{,}5$, soit 1,5 %.\n⛔ Le piège au b) : diviser par 3, parce qu'un trimestre dure 3 mois. On divise par le nombre de périodes dans l'année : 4.\nRéponse : a) 0,5 % ; b) 1,5 %.",
          micros: ["suiteT_taux_equivalent_proportionnel"],
        },
        {
          enonce:
            "Un capital est placé à 4 % par an. Réponds arithmétique ou géométrique.\na) À intérêts simples, sa valeur suit quelle suite ?\nb) À intérêts composés, sa valeur suit quelle suite ?",
          reponses: [
            { question: "a)", attendu: ARITH },
            { question: "b)", attendu: GEO },
          ],
          correction:
            "a) En simples, la même somme s'ajoute chaque année : suite arithmétique.\nb) En composés, on multiplie par 1,04 chaque année : suite géométrique.\n⛔ Le piège : inverser. « Composés » veut dire que les intérêts produisent eux-mêmes des intérêts, donc une multiplication.\nRéponse : a) arithmétique ; b) géométrique.",
          micros: ["suiteT_interets_simples_composes"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : calculer les deux valeurs, comparer, puis conclure.",
      rappel: [
        "Valeur à intérêts simples : capital + nombre d'années × intérêt annuel. Valeur à intérêts composés : capital × $q^n$.",
        "Le dernier rang où A est encore devant, c'est le rang du croisement moins 1.",
        "Taux équivalent : celui qui, appliqué à chaque période, redonne EXACTEMENT le taux annuel. Il est un peu plus petit que le taux proportionnel.",
        "Pour tester un taux périodique, on élève son coefficient à la puissance du nombre de périodes, et on compare au coefficient annuel.",
      ],
      exercices: [
        {
          enonce:
            "Une directrice compare deux cinémas, dont les recettes sont données en k€ (valeurs arrondies, modèle). A part de 2 500 k€ et gagne 2 % par an. B part de 1 100 k€ et gagne 20 % par an.\na) À partir de quel rang B dépasse-t-il A ?\nb) Quel est le dernier rang où A est encore devant ?\nc) Quelle est l'avance de A au rang 0 ?",
          figure: grille(["n", "A", "B"], [
            [0, 2500, 1100],
            [1, 2550, 1320],
            [2, 2601, 1584],
            [3, 2653, 1901],
            [4, 2706, 2281],
            [5, 2760, 2737],
            [6, 2815, 3285],
          ]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: ["1 400", "1 400 k€"] },
          ],
          correction:
            "a) Rang 5 : 2 737 est encore sous 2 760. Rang 6 : 3 285 dépasse 2 815.\nb) $6 - 1 = 5$.\nc) $2\\,500 - 1\\,100 = 1\\,400$ k€.\n⛔ Le piège au a) : répondre 5, parce que les deux valeurs y sont presque égales. A a encore 23 k€ d'avance.\nRéponse : a) 6 ; b) 5 ; c) 1 400 k€.",
          micros: ["suiteT_comparer_geometriques"],
        },
        {
          enonce:
            "Une cheffe de projet compare deux parcs éoliens, en MWh produits par an (valeurs arrondies, modèle). A part de 5 000 et gagne 800 MWh par an. B part de 200 et est multiplié par 2,5 chaque année.\na) À partir de quel rang B dépasse-t-il A ?\nb) Quel est le dernier rang où A est devant ?\nc) Laquelle de ces suites est arithmétique ? Écris A ou B.",
          figure: grille(["n", "A", "B"], [
            [0, 5000, 200],
            [1, 5800, 500],
            [2, 6600, 1250],
            [3, 7400, 3125],
            [4, 8200, 7813],
            [5, 9000, 19531],
          ]),
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "a) Rang 4 : 7 813 est encore sous 8 200. Rang 5 : 19 531 dépasse 9 000.\nb) $5 - 1 = 4$.\nc) A ajoute toujours 800 : suite arithmétique. B multiplie par 2,5 : suite géométrique.\n⛔ Le piège au a) : penser que 7 813 suffit parce qu'il est grand. On le compare à A sur la MÊME ligne.\nRéponse : a) 5 ; b) 4 ; c) A.",
          micros: ["suiteT_comparer_arith_geo"],
        },
        {
          enonce:
            "Une notaire place 5 000 € à 8 % par an pendant 5 ans.\na) Quelle est la valeur acquise à intérêts simples ?\nb) Quelle est la valeur acquise à intérêts composés, au centime près ?\nc) De combien la seconde dépasse-t-elle la première, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "7 000 €" },
            { question: "b)", attendu: "7 346,64 €", tolerance: 0.005 },
            { question: "c)", attendu: "347 €", tolerance: 0.5 },
          ],
          correction:
            "a) Intérêt annuel : $5\\,000 \\times 0{,}08 = 400$ €. $5\\,000 + 5 \\times 400 = 7\\,000$ €.\nb) $5\\,000 \\times 1{,}08^5 \\approx 7\\,346{,}64$ €.\nc) $7\\,346{,}64 - 7\\,000 = 346{,}64$, soit environ 347 €.\n⛔ Le piège au b) : ajouter 400 € par an. Ce sont les intérêts simples du a).\nRéponse : a) 7 000 € ; b) 7 346,64 € ; c) 347 €.",
          micros: ["suiteT_interets_simples_composes"],
        },
        {
          enonce:
            "Jules place 10 000 € à 3 % par an pendant 10 ans pour sa retraite.\na) À intérêts simples, quelle est la raison $r$ de la suite ?\nb) À intérêts composés, quelle est la raison $q$ de la suite ?\nc) Quelle est la valeur finale à intérêts simples ?\nd) Quelle est la valeur finale à intérêts composés, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "1,03" },
            { question: "c)", attendu: "13 000 €" },
            { question: "d)", attendu: "13 439 €", tolerance: 0.5 },
          ],
          correction:
            "a) On ajoute 3 % de 10 000 €, soit $r = 300$.\nb) On multiplie par $q = 1{,}03$.\nc) $10\\,000 + 10 \\times 300 = 13\\,000$ €.\nd) $10\\,000 \\times 1{,}03^{10} \\approx 13\\,439{,}16$, soit environ $13\\,439$ €.\n⛔ Le piège au a) : répondre 3 ou 0,03. La raison d'une suite arithmétique est le montant ajouté, en euros.\nRéponse : a) 300 ; b) 1,03 ; c) 13 000 € ; d) 13 439 €.",
          micros: ["suiteT_interets_simples_composes"],
        },
        {
          enonce:
            "Un conseiller bancaire annonce un taux annuel de 12 %.\na) Quel est le taux mensuel proportionnel ?\nb) Élève le coefficient de ce taux mensuel à la puissance 12 : que trouves-tu, à $0{,}0001$ près ?\nc) Appliqué chaque mois, quel taux annuel ce taux mensuel donne-t-il réellement, à 0,01 point près ?\nd) Dépasse-t-il les 12 % annoncés ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1 %" },
            { question: "b)", attendu: "1,1268", tolerance: 0.00005 },
            { question: "c)", attendu: "12,68 %", tolerance: 0.005 },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $12 \\div 12 = 1$, soit 1 %.\nb) Le coefficient mensuel est 1,01 : $1{,}01^{12} \\approx 1{,}1268$.\nc) $1{,}1268 = 1 + 0{,}1268$ : soit 12,68 %.\nd) 12,68 % dépasse 12 %.\n⛔ Le piège : croire que 12 fois 1 % font exactement 12 %. Les intérêts de chaque mois produisent à leur tour des intérêts.\nRéponse : a) 1 % ; b) 1,1268 ; c) 12,68 % ; d) oui.",
          micros: ["suiteT_taux_equivalent_proportionnel"],
        },
        {
          enonce:
            "Une conseillère compare deux taux trimestriels pour un taux annuel de 8 %, soit un coefficient annuel de 1,08. Le taux proportionnel est à calculer. Le taux équivalent est donné : environ 1,94 %.\na) Quel est le taux trimestriel proportionnel ?\nb) Élève le coefficient de ce taux trimestriel à la puissance 4 : que trouves-tu, à $0{,}0001$ près ?\nc) Que vaut $1{,}0194^4$, à $0{,}0001$ près ?\nd) Lequel redonne (presque exactement) 1,08 sur l'année ? Réponds par la lettre.\nA : le taux proportionnel.\nB : le taux équivalent.",
          reponses: [
            { question: "a)", attendu: "2 %" },
            { question: "b)", attendu: "1,0824", tolerance: 0.00005 },
            { question: "c)", attendu: "1,0799", tolerance: 0.00005 },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "a) $8 \\div 4 = 2$, soit 2 %.\nb) $1{,}02^4 \\approx 1{,}0824$ : c'est au-dessus de 1,08.\nc) $1{,}0194^4 \\approx 1{,}0799$ : c'est 1,08 à l'arrondi près.\nd) Le taux équivalent redonne le coefficient annuel.\n⛔ Le piège au d) : choisir le proportionnel parce qu'il est plus simple à calculer. Appliqué 4 fois, il dépasse les 8 % annoncés.\nRéponse : a) 2 % ; b) 1,0824 ; c) 1,0799 ; d) B.",
          micros: ["suiteT_taux_equivalent_proportionnel"],
        },
        {
          enonce:
            "Salomé place son épargne à un taux annuel de 4 %, avec des intérêts versés tous les six mois.\na) Quel est le taux semestriel proportionnel ?\nb) Élève le coefficient de ce taux semestriel au carré : que trouves-tu ?\nc) Quel taux annuel ce taux semestriel donne-t-il réellement ?",
          reponses: [
            { question: "a)", attendu: "2 %" },
            { question: "b)", attendu: "1,0404" },
            { question: "c)", attendu: "4,04 %" },
          ],
          correction:
            "a) Deux semestres dans l'année : $4 \\div 2 = 2$, soit 2 %.\nb) $1{,}02 \\times 1{,}02 = 1{,}0404$.\nc) $1{,}0404 = 1 + 0{,}0404$ : soit 4,04 %.\n⛔ Le piège au c) : répondre 4 %. Les intérêts du premier semestre rapportent au second : 0,04 point de plus.\nRéponse : a) 2 % ; b) 1,0404 ; c) 4,04 %.",
          micros: ["suiteT_taux_equivalent_proportionnel"],
        },
        {
          enonce:
            "Une analyste compare deux plateformes de jeu vidéo (modèle). La plateforme A a 5 000 abonnés et gagne 3 % par an. La plateforme B a 2 000 abonnés et gagne 30 % par an.\na) Combien d'abonnés pour A au bout de 10 ans, à l'unité près ?\nb) Combien d'abonnés pour B au bout de 10 ans, à l'unité près ?\nc) Quelle plateforme l'emporte à long terme ? Réponds par la lettre.\nA : La plateforme A, parce qu'elle part de plus haut.\nB : La plateforme B, parce que sa raison est plus grande.",
          reponses: [
            { question: "a)", attendu: "6 720", tolerance: 0.5 },
            { question: "b)", attendu: "27 572", tolerance: 0.5 },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) $5\\,000 \\times 1{,}03^{10} \\approx 6\\,719{,}58$, soit environ $6\\,720$ abonnés.\nb) $2\\,000 \\times 1{,}3^{10} \\approx 27\\,571{,}70$, soit environ $27\\,572$ abonnés.\nc) La raison 1,3 est plus grande que 1,03 : B l'emporte.\n⛔ Le piège au c) : se fier au nombre de départ. L'avance de A, 3 000 abonnés, est fixe ; l'écart de raison se compose chaque année.\nRéponse : a) 6 720 ; b) 27 572 ; c) B.",
          micros: ["suiteT_comparer_geometriques"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : le meilleur choix dépend souvent de la durée. On calcule à chaque échéance, puis on conclut.",
      rappel: [
        "Un bon choix dépend de la durée : on compare à l'échéance demandée, pas seulement au départ.",
        "Une suite arithmétique peut rester longtemps devant une géométrique : on regarde le tableau jusqu'au bout.",
        "Un taux proportionnel appliqué à chaque période dépasse toujours un peu le taux annuel annoncé.",
      ],
      exercices: [
        {
          titre: "La somme de la grand-mère",
          enonce:
            "Lou reçoit 8 000 € de sa grand-mère et hésite (offres fictives). Offre A : 6 % à intérêts simples. Offre B : 5 % à intérêts composés.\na) Que vaut l'offre A au bout de 5 ans ?\nb) Que vaut l'offre B au bout de 5 ans, à l'euro près ?\nc) Que vaut l'offre A au bout de 10 ans ?\nd) Que vaut l'offre B au bout de 10 ans, à l'euro près ?\ne) Quelle offre est la meilleure sur 5 ans ? Écris A ou B.\nf) Quelle offre est la meilleure sur 10 ans ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "10 400 €" },
            { question: "b)", attendu: "10 210 €", tolerance: 0.5 },
            { question: "c)", attendu: "12 800 €" },
            { question: "d)", attendu: "13 031 €", tolerance: 0.5 },
            { question: "e)", attendu: "A" },
            { question: "f)", attendu: "B" },
          ],
          correction:
            "Offre A : on ajoute 6 % de 8 000 €, soit 480 € par an.\na) $8\\,000 + 5 \\times 480 = 10\\,400$ €.\nb) $8\\,000 \\times 1{,}05^5 \\approx 10\\,210{,}25$, soit environ $10\\,210$ €.\nc) $8\\,000 + 10 \\times 480 = 12\\,800$ €.\nd) $8\\,000 \\times 1{,}05^{10} \\approx 13\\,031{,}16$, soit environ $13\\,031$ €.\ne) Sur 5 ans, A est devant.\nf) Sur 10 ans, B est devant.\n⛔ Le piège : conclure sans regarder la durée. A a le meilleur taux affiché, mais il ne se compose pas.\nRéponse : a) 10 400 € ; b) 10 210 € ; c) 12 800 € ; d) 13 031 € ; e) A ; f) B.",
          micros: ["suiteT_interets_simples_composes"],
        },
        {
          titre: "Deux contrats de travail",
          enonce:
            "Une entreprise propose deux contrats, avec le même salaire de départ de 2 000 € (modèles). Contrat A : 100 € de plus par an. Contrat B : 4 % de plus par an. Le tableau donne les salaires arrondis à l'euro, $n$ étant le nombre d'années.\na) Le contrat A suit-il une suite arithmétique ou géométrique ?\nb) Quelle est la raison du contrat B ?\nc) À partir de quel rang le contrat B dépasse-t-il le contrat A ?\nd) Quelle est l'avance de B sur A au rang 13 ?",
          figure: grille(["n", "A", "B"], [
            [10, 3000, 2960],
            [11, 3100, 3079],
            [12, 3200, 3202],
            [13, 3300, 3330],
          ]),
          reponses: [
            { question: "a)", attendu: ARITH },
            { question: "b)", attendu: "1,04" },
            { question: "c)", attendu: "12" },
            { question: "d)", attendu: "30 €" },
          ],
          correction:
            "a) On ajoute 100 : suite arithmétique.\nb) Une hausse de 4 % : $q = 1{,}04$.\nc) Rang 11 : 3 079 est sous 3 100. Rang 12 : 3 202 dépasse 3 200.\nd) $3\\,330 - 3\\,300 = 30$ €.\n⛔ Le piège au c) : croire que B ne rattrape jamais A, parce que A est devant pendant 11 ans. La croissance exponentielle finit par passer.\nRéponse : a) arithmétique ; b) 1,04 ; c) 12 ; d) 30 €.",
          micros: ["suiteT_comparer_arith_geo"],
        },
        {
          titre: "Le taux de Mathis",
          enonce:
            "Mathis étudie un placement de 10 000 € à 6 % par an, avec des intérêts versés chaque mois. Le taux équivalent mensuel vaut environ 0,49 %.\na) Quel est le taux mensuel proportionnel ?\nb) Élève le coefficient de ce taux mensuel à la puissance 12 : que trouves-tu, à $0{,}0001$ près ?\nc) Au taux mensuel proportionnel, combien a-t-il au bout d'un an, à l'euro près ?\nd) Au taux annuel de 6 %, combien aurait-il au bout d'un an ?\ne) Quel est l'écart, à l'euro près ?\nf) Quel taux mensuel est le plus petit ? Écris proportionnel ou équivalent.",
          reponses: [
            { question: "a)", attendu: "0,5 %" },
            { question: "b)", attendu: "1,0617", tolerance: 0.00005 },
            { question: "c)", attendu: "10 617 €", tolerance: 0.5 },
            { question: "d)", attendu: "10 600 €" },
            { question: "e)", attendu: "17 €", tolerance: 0.5 },
            { question: "f)", attendu: ["équivalent", "taux équivalent", "le taux équivalent", "l'équivalent"] },
          ],
          correction:
            "a) $6 \\div 12 = 0{,}5$, soit 0,5 %.\nb) $1{,}005^{12} \\approx 1{,}0617$.\nc) $10\\,000 \\times 1{,}005^{12} \\approx 10\\,616{,}78$, soit environ $10\\,617$ €.\nd) $10\\,000 \\times 1{,}06 = 10\\,600$ €.\ne) $10\\,617 - 10\\,600 = 17$ €.\nf) 0,49 % est plus petit que 0,5 % : le taux équivalent est le plus petit.\n⛔ Le piège : croire que 0,5 % par mois fait exactement 6 % par an. Il donne un peu plus, parce que les intérêts se composent.\nRéponse : a) 0,5 % ; b) 1,0617 ; c) 10 617 € ; d) 10 600 € ; e) 17 € ; f) équivalent.",
          micros: ["suiteT_taux_equivalent_proportionnel"],
        },
        {
          titre: "Deux plans pour le solaire",
          enonce:
            "Une ingénieure prépare deux plans pour une ville qui a 2 000 m² de panneaux solaires (modèles). Plan A : 500 m² de plus par an. Plan B : 10 % de plus par an.\na) Quelle surface pour A au bout de 10 ans ?\nb) Quelle surface pour B au bout de 10 ans, à l'unité près ?\nc) Quelle surface pour A au bout de 20 ans ?\nd) Quelle surface pour B au bout de 20 ans, à l'unité près ?\ne) Quel plan donne le plus de surface au bout de 10 ans ? Écris A ou B.\nf) Quel plan donne le plus de surface au bout de 20 ans ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "7 000 m²" },
            { question: "b)", attendu: "5 187 m²", tolerance: 0.5 },
            { question: "c)", attendu: "12 000 m²" },
            { question: "d)", attendu: "13 455 m²", tolerance: 0.5 },
            { question: "e)", attendu: "A" },
            { question: "f)", attendu: "B" },
          ],
          correction:
            "a) $2\\,000 + 10 \\times 500 = 7\\,000$ m².\nb) $2\\,000 \\times 1{,}1^{10} \\approx 5\\,187{,}48$, soit environ $5\\,187$ m².\nc) $2\\,000 + 20 \\times 500 = 12\\,000$ m².\nd) $2\\,000 \\times 1{,}1^{20} \\approx 13\\,455$ m².\ne) Au bout de 10 ans, A est devant.\nf) Au bout de 20 ans, B est passé devant.\n⛔ Le piège au f) : prolonger la conclusion du e). Le croisement arrive entre les deux échéances : la croissance exponentielle finit par dépasser la croissance linéaire.\nRéponse : a) 7 000 m² ; b) 5 187 m² ; c) 12 000 m² ; d) 13 455 m² ; e) A ; f) B.",
          micros: ["suiteT_comparer_arith_geo"],
        },
      ],
    },
  ],
};
