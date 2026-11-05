// ─── Fiche d'exercices : sommes, emprunts et placements (STMG, Tle) ────────────
//
// Notion suite_somme_situations du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts`). Le coach demande :
// un TERME (« au bout de ») ou une SOMME (« au total ») ; le total versé ; la valeur
// acquise de versements réguliers EN DÉBUT D'ANNÉE, S = V × q × (q^n − 1) ÷ (q − 1) ;
// le gain (valeur acquise − total versé) ; le total remboursé, le coût du crédit,
// la mensualité d'un emprunt à mensualités constantes. On ne calcule pas de
// mensualité par une formule d'actualisation : le coach ne le demande pas.
//
// ⭐ Aucune donnée réelle : toutes les offres et tous les taux sont fictifs (modèles).
//
// Domaines et métiers : épargne simple (ex. 1 à 3, 7), emprunt (ex. 4,
// 5, 8), placement simple (ex. 6) ; apiculture (apiculteur), fleuriste (artisane),
// santé (ostéopathe), élevage (éleveuse, bétaillère), cabinet dentaire (dentiste),
// football (trésorier), commerce en ligne (gérante), immobilier (bailleresse), lycée (voyage
// de classe), boulangerie (boulangère), mobilité (Ilan), kinésithérapie (Nadia).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suiteT_somme_reconnaitre (1, 2, 3, 14, 15, 16, 20),
// suiteT_somme_versements (6, 7, 9, 10, 11, 17, 19, 20), suiteT_somme_emprunt (4, 5,
// 8, 12, 13, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

// Les écritures qu'un élève tape vraiment : le correcteur compare ces mots au texte.
const TERME = ["terme", "un terme", "le terme"];
const SOMME = ["somme", "une somme", "la somme"];

export const exercicesSuiteSommeSituationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-somme-situations",
  titre: "Sommes : emprunts et placements",
  accroche:
    "Vingt exercices pour lire un contrat avec des suites : un terme ou une somme ? combien a-t-on versé, combien a-t-on en tout, combien les intérêts ont-ils rapporté, combien coûte vraiment un crédit ? Un four de boulangerie, un voyage de classe, le cabinet d'une dentiste, une bétaillère, une voiture à crédit ou à l'épargne. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître un terme ou une somme, multiplier des versements, retrancher un capital.",
      rappel: [
        "Un terme donne la valeur à UNE date (« au bout de », « à la fin »). Une somme donne le cumul (« au total », « en tout »).",
        "Total remboursé : somme de toutes les mensualités. Coût du crédit : total remboursé moins capital emprunté.",
        "Un versement V placé $k$ années à intérêts composés vaut $V \\times q^k$, avec $q = 1 + t \\div 100$.",
        "Gain : valeur acquise moins total versé.",
      ],
      exercices: [
        {
          enonce:
            "On verse 50 € chaque mois pendant 4 ans, et on veut savoir combien on a versé en tout. Cette situation relève-t-elle d'un terme ou d'une somme ? Écris terme ou somme.",
          reponses: [{ attendu: SOMME }],
          correction:
            "Le mot « en tout » signale un cumul.\nOn additionne tous les versements : c'est une somme de termes.\n⛔ Le piège : voir « 4 ans » et penser qu'on cherche la valeur au bout de 4 ans. La question porte sur le total.\nRéponse : somme.",
          micros: ["suiteT_somme_reconnaitre"],
        },
        {
          enonce:
            "Écris terme ou somme.\na) On place 1 000 € et on veut leur valeur au bout de 5 ans.\nb) On veut le total des intérêts encaissés sur 5 ans.",
          reponses: [
            { question: "a)", attendu: TERME },
            { question: "b)", attendu: SOMME },
          ],
          correction:
            "a) « Au bout de 5 ans » : une valeur à une date, c'est un terme.\nb) « Le total » : on additionne les intérêts de chaque année, c'est une somme.\n⛔ Le piège : répondre pareil aux deux, parce que les deux durent 5 ans. C'est la question qui décide.\nRéponse : a) terme ; b) somme.",
          micros: ["suiteT_somme_reconnaitre"],
        },
        {
          enonce:
            "On verse 100 € chaque mois pendant 3 ans. Combien a-t-on versé au total ?",
          reponses: [{ attendu: "3 600 €" }],
          correction:
            "3 ans, c'est $3 \\times 12 = 36$ mois.\nLes versements sont égaux, leur somme est un produit : $36 \\times 100 = 3\\,600$ €.\n⛔ Le piège : calculer $3 \\times 100 = 300$ €. Le versement est mensuel, la durée est en années.\nRéponse : 3 600 €.",
          micros: ["suiteT_somme_reconnaitre"],
        },
        {
          enonce:
            "Un emprunt de 6 000 € est remboursé par 24 mensualités de 270 €. Quel est le coût du crédit, c'est-à-dire ce qu'on paie EN PLUS du capital emprunté ?",
          reponses: [{ attendu: "480 €" }],
          correction:
            "Total remboursé : $24 \\times 270 = 6\\,480$ €.\nCoût du crédit : $6\\,480 - 6\\,000 = 480$ €.\n⛔ Le piège : répondre 6 480 €. C'est le total remboursé, pas le coût.\nRéponse : 480 €.",
          micros: ["suiteT_somme_emprunt"],
        },
        {
          enonce:
            "Un crédit est remboursé par 36 mensualités de 250 €. Quel est le total remboursé ?",
          reponses: [{ attendu: "9 000 €" }],
          correction:
            "Toutes les mensualités sont égales, la somme est un produit.\n$36 \\times 250 = 9\\,000$ €.\n⛔ Le piège : additionner 36 et 250. On paie 250 € trente-six fois.\nRéponse : 9 000 €.",
          micros: ["suiteT_somme_emprunt"],
        },
        {
          enonce:
            "On place 1 000 € à 3 % d'intérêts composés par an.\na) Que vaut ce versement au bout de 1 an ?\nb) Que vaut-il au bout de 3 ans, au centime près ?",
          reponses: [
            { question: "a)", attendu: "1 030 €" },
            { question: "b)", attendu: "1 092,73 €", tolerance: 0.005 },
          ],
          correction:
            "a) $1\\,000 \\times 1{,}03 = 1\\,030$ €.\nb) $1\\,000 \\times 1{,}03^3 = 1\\,092{,}727$, soit $1\\,092{,}73$ € au centime près.\n⛔ Le piège au b) : ajouter 30 € par an, ce qui donne 1 090 €. En intérêts composés, les intérêts rapportent à leur tour.\nRéponse : a) 1 030 € ; b) 1 092,73 €.",
          micros: ["suiteT_somme_versements"],
        },
        {
          enonce:
            "On a versé 1 000 € par an pendant 3 ans. La valeur acquise à la fin est de 3 245 €. Combien les intérêts ont-ils rapporté ?",
          reponses: [{ attendu: "245 €" }],
          correction:
            "Total versé : $3 \\times 1\\,000 = 3\\,000$ €.\nGain : $3\\,245 - 3\\,000 = 245$ €.\n⛔ Le piège : répondre 3 245 €. Cette somme contient l'argent qu'on a versé soi-même.\nRéponse : 245 €.",
          micros: ["suiteT_somme_versements"],
        },
        {
          enonce:
            "Un total de 4 800 € est remboursé en 24 mensualités égales. Quelle est la mensualité ?",
          reponses: [{ attendu: "200 €" }],
          correction:
            "La mensualité est le total divisé par le nombre de mensualités.\n$4\\,800 \\div 24 = 200$ €.\n⛔ Le piège : diviser par 2, en lisant « 24 mois » comme « 2 ans ». On paie chaque mois, pas chaque année.\nRéponse : 200 €.",
          micros: ["suiteT_somme_emprunt"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : décider si l'on cumule, puis calculer la valeur acquise, le gain ou le coût.",
      rappel: [
        "Versements en début d'année pendant $n$ ans : le premier est placé $n$ années, le dernier une seule. La valeur acquise est la somme de leurs valeurs.",
        "Elle se calcule d'un coup : $S = V \\times q \\times \\dfrac{q^n - 1}{q - 1}$.",
        "Mensualité : (capital + coût du crédit) ÷ nombre de mensualités.",
        "Une somme géométrique : $u(0) \\times \\dfrac{q^N - 1}{q - 1}$. Une somme arithmétique : $N \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.",
      ],
      exercices: [
        {
          enonce:
            "Un apiculteur verse 500 € au début de chaque année pendant 3 ans, sur un livret à 4 % (intérêts composés). On regarde à la fin de la 3e année.\na) Que vaut le 1er versement, placé 3 ans, au centime près ?\nb) Que vaut le 2e versement, placé 2 ans ?\nc) Que vaut le 3e versement, placé 1 an ?\nd) Quelle est la valeur acquise, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "562,43 €", tolerance: 0.005 },
            { question: "b)", attendu: "540,80 €" },
            { question: "c)", attendu: "520 €" },
            { question: "d)", attendu: "1 623 €", tolerance: 0.5 },
          ],
          correction:
            "a) $500 \\times 1{,}04^3 = 562{,}432$, soit $562{,}43$ €.\nb) $500 \\times 1{,}04^2 = 540{,}80$ €.\nc) $500 \\times 1{,}04 = 520$ €.\nd) $562{,}432 + 540{,}80 + 520 = 1\\,623{,}232$, soit environ $1\\,623$ €.\n⛔ Le piège : placer le 3e versement 0 an. Versé au début de la 3e année, il travaille encore un an.\nRéponse : a) 562,43 € ; b) 540,80 € ; c) 520 € ; d) 1 623 €.",
          micros: ["suiteT_somme_versements"],
        },
        {
          enonce:
            "Une artisane fleuriste verse 1 000 € au début de chaque année pendant 4 ans, à 5 % par an (intérêts composés).\na) Quelle est la raison $q$ ?\nb) Combien y a-t-il de versements ?\nc) Quelle est la valeur acquise à la fin de la 4e année, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "1,05" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "4 526 €", tolerance: 0.5 },
          ],
          correction:
            "a) Une hausse de 5 % : $q = 1{,}05$.\nb) 4 versements.\nc) $S = 1\\,000 \\times 1{,}05 \\times \\dfrac{1{,}05^4 - 1}{1{,}05 - 1} \\approx 4\\,525{,}63$, soit environ $4\\,526$ €.\n⛔ Le piège au c) : oublier le facteur $q$. Le premier versement rapporte dès la première année.\nRéponse : a) 1,05 ; b) 4 ; c) 4 526 €.",
          micros: ["suiteT_somme_versements"],
        },
        {
          enonce:
            "Un ostéopathe verse 2 000 € au début de chaque année pendant 5 ans, à 3 % par an (intérêts composés).\na) Quel est le total versé ?\nb) Quelle est la valeur acquise à la fin de la 5e année, à l'euro près ?\nc) Combien les intérêts ont-ils rapporté, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "10 000 €" },
            { question: "b)", attendu: "10 937 €", tolerance: 0.5 },
            { question: "c)", attendu: "937 €", tolerance: 0.5 },
          ],
          correction:
            "a) $5 \\times 2\\,000 = 10\\,000$ €.\nb) $S = 2\\,000 \\times 1{,}03 \\times \\dfrac{1{,}03^5 - 1}{1{,}03 - 1} \\approx 10\\,936{,}82$, soit environ $10\\,937$ €.\nc) $10\\,937 - 10\\,000 = 937$ €.\n⛔ Le piège au c) : compter 3 % de 10 000 €, soit 300 €. Chaque versement n'a pas travaillé le même temps, et les intérêts se composent.\nRéponse : a) 10 000 € ; b) 10 937 € ; c) 937 €.",
          micros: ["suiteT_somme_versements"],
        },
        {
          enonce:
            "Une éleveuse emprunte 9 000 € pour une bétaillère. Elle rembourse 48 mensualités de 215 €.\na) Quel est le total remboursé ?\nb) Quel est le coût du crédit ?",
          reponses: [
            { question: "a)", attendu: "10 320 €" },
            { question: "b)", attendu: "1 320 €" },
          ],
          correction:
            "a) $48 \\times 215 = 10\\,320$ €.\nb) $10\\,320 - 9\\,000 = 1\\,320$ €.\n⛔ Le piège au a) : compter 12 mensualités par an sur 48 ans. 48 est déjà le nombre de mois.\nRéponse : a) 10 320 € ; b) 1 320 €.",
          micros: ["suiteT_somme_emprunt"],
        },
        {
          enonce:
            "Une dentiste contracte un crédit de 6 600 € pour un fauteuil. Elle rembourse en 36 mensualités égales, et le coût du crédit s'élève à 600 €.\na) Quel est le total remboursé ?\nb) Quelle est la mensualité ?",
          reponses: [
            { question: "a)", attendu: "7 200 €" },
            { question: "b)", attendu: "200 €" },
          ],
          correction:
            "a) $6\\,600 + 600 = 7\\,200$ €.\nb) $7\\,200 \\div 36 = 200$ €.\n⛔ Le piège au b) : diviser le seul capital : $6\\,600 \\div 36 \\approx 183{,}33$ €. On oublierait le coût du crédit.\nRéponse : a) 7 200 € ; b) 200 €.",
          micros: ["suiteT_somme_emprunt"],
        },
        {
          enonce:
            "Le trésorier d'un club de football verse 800 € au début de chaque année pendant 6 ans sur un compte.\na) Laquelle de ces questions demande le calcul d'une somme ? Réponds par la lettre.\nA : Combien vaut le versement de la 6e année ?\nB : Combien a-t-on versé au total au bout de 6 ans ?\nC : Quel est le taux d'évolution d'un versement à l'autre ?\nb) Réponds à cette question.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "4 800 €" },
          ],
          correction:
            "a) « Au total » cumule les 6 versements. A porte sur une seule valeur, C sur un taux.\nb) $6 \\times 800 = 4\\,800$ €.\n⛔ Le piège au a) : choisir A à cause du mot « 6e ». Il désigne un seul versement.\nRéponse : a) B ; b) 4 800 €.",
          micros: ["suiteT_somme_reconnaitre"],
        },
        {
          enonce:
            "Une gérante de boutique en ligne reçoit 200 commandes le premier mois. Ce nombre augmente de 10 % par mois (modèle). On note $u(0) = 200$.\na) « Combien de commandes le 6e mois ? » : terme ou somme ?\nb) « Combien de commandes en tout sur 6 mois ? » : terme ou somme ?\nc) Combien de commandes le 6e mois, soit $u(5)$, à l'unité près ?\nd) Combien de commandes en tout, de $u(0)$ à $u(5)$, à l'unité près ?",
          reponses: [
            { question: "a)", attendu: TERME },
            { question: "b)", attendu: SOMME },
            { question: "c)", attendu: "322", tolerance: 0.5 },
            { question: "d)", attendu: "1 543", tolerance: 0.5 },
          ],
          correction:
            "a) Une seule valeur à une date : un terme.\nb) « En tout » : une somme.\nc) $u(5) = 200 \\times 1{,}1^5 \\approx 322{,}1$, soit environ 322 commandes.\nd) 6 termes : $S = 200 \\times \\dfrac{1{,}1^6 - 1}{1{,}1 - 1} \\approx 1\\,543{,}1$, soit environ $1\\,543$ commandes.\n⛔ Le piège au c) : prendre $u(6)$ pour le 6e mois. Comme le 1er mois est $u(0)$, le 6e est $u(5)$.\nRéponse : a) terme ; b) somme ; c) 322 ; d) 1 543.",
          micros: ["suiteT_somme_reconnaitre"],
        },
        {
          enonce:
            "Une bailleresse perçoit 7 800 € de loyers la première année. Les loyers annuels augmentent de 240 € chaque année, pendant 6 ans au total (modèle).\na) « Combien perçoit-elle en tout ? » : terme ou somme ?\nb) Combien perçoit-elle la 6e année ?\nc) Combien perçoit-elle en tout sur les 6 ans ?",
          reponses: [
            { question: "a)", attendu: SOMME },
            { question: "b)", attendu: "9 000 €" },
            { question: "c)", attendu: "50 400 €" },
          ],
          correction:
            "a) « En tout » : une somme.\nb) De la 1re à la 6e année, il y a 5 hausses : $7\\,800 + 5 \\times 240 = 9\\,000$ €.\nc) Suite arithmétique, 6 termes : $S = 6 \\times \\dfrac{7\\,800 + 9\\,000}{2} = 6 \\times 8\\,400 = 50\\,400$ €.\n⛔ Le piège au c) : multiplier 7 800 par 6. Les loyers ne restent pas égaux.\nRéponse : a) somme ; b) 9 000 € ; c) 50 400 €.",
          micros: ["suiteT_somme_reconnaitre"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on sépare ce qu'on verse, ce qu'on a à la fin, et ce qu'on gagne ou qu'on paie.",
      rappel: [
        "Trois nombres à ne pas confondre : le total versé (une multiplication), la valeur acquise (une somme géométrique), le gain (leur différence).",
        "Pour comparer deux crédits, on compare leur coût, pas seulement leur mensualité.",
        "Un versement seul, c'est un terme ; l'ensemble des versements, c'est une somme.",
      ],
      exercices: [
        {
          titre: "Le voyage de la classe",
          enonce:
            "Une classe veut financer un voyage. L'association du lycée verse 800 € au début de chaque année pendant 4 ans, à 2 % par an (intérêts composés, modèle). Le voyage coûte 3 400 €.\na) Quel est le total versé ?\nb) Quelle est la valeur acquise à la fin de la 4e année, à l'euro près ?\nc) Combien les intérêts ont-ils rapporté, à l'euro près ?\nd) Le voyage est-il financé ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "3 200 €" },
            { question: "b)", attendu: "3 363 €", tolerance: 0.5 },
            { question: "c)", attendu: "163 €", tolerance: 0.5 },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $4 \\times 800 = 3\\,200$ €.\nb) $S = 800 \\times 1{,}02 \\times \\dfrac{1{,}02^4 - 1}{1{,}02 - 1} \\approx 3\\,363{,}23$, soit environ $3\\,363$ €.\nc) $3\\,363 - 3\\,200 = 163$ €.\nd) 3 363 € est moins que 3 400 € : il manque environ 37 €.\n⛔ Le piège au d) : comparer 3 400 € au seul total versé, ou arrondir 3 363 à « environ 3 400 ». Il manque bien de l'argent.\nRéponse : a) 3 200 € ; b) 3 363 € ; c) 163 € ; d) non.",
          micros: ["suiteT_somme_versements"],
        },
        {
          titre: "Le four de la boulangère",
          enonce:
            "Une boulangère emprunte 15 000 € pour un four. Offre A : 60 mensualités de 280 €. Offre B : 48 mensualités de 340 € (offres fictives).\na) Quel est le coût du crédit avec l'offre A ?\nb) Quel est le coût du crédit avec l'offre B ?\nc) Quelle offre coûte le moins cher ? Écris A ou B.\nd) De combien la mensualité de B dépasse-t-elle celle de A ?",
          reponses: [
            { question: "a)", attendu: "1 800 €" },
            { question: "b)", attendu: "1 320 €" },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: "60 €" },
          ],
          correction:
            "a) Total : $60 \\times 280 = 16\\,800$ €. Coût : $16\\,800 - 15\\,000 = 1\\,800$ €.\nb) Total : $48 \\times 340 = 16\\,320$ €. Coût : $16\\,320 - 15\\,000 = 1\\,320$ €.\nc) 1 320 € est moins que 1 800 € : l'offre B coûte le moins cher.\nd) $340 - 280 = 60$ €.\n⛔ Le piège au c) : choisir A parce que sa mensualité est plus petite. On paie moins chaque mois, mais plus longtemps.\nRéponse : a) 1 800 € ; b) 1 320 € ; c) B ; d) 60 €.",
          micros: ["suiteT_somme_emprunt"],
        },
        {
          titre: "La voiture d'Ilan",
          enonce:
            "Ilan veut une voiture à 6 000 €. Solution A : l'acheter tout de suite avec un crédit de 24 mensualités de 270 €. Solution B : attendre 3 ans, en versant 2 000 € au début de chaque année à 3 % par an (intérêts composés, modèle).\na) Quel est le coût du crédit de la solution A ?\nb) Quelle est la valeur acquise de la solution B à la fin de la 3e année, à l'euro près ?\nc) Combien les intérêts de B rapportent-ils, à l'euro près ?\nd) Entre payer le coût de A et gagner les intérêts de B, quel est l'écart total, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: "480 €" },
            { question: "b)", attendu: "6 367 €", tolerance: 0.5 },
            { question: "c)", attendu: "367 €", tolerance: 0.5 },
            { question: "d)", attendu: "847 €", tolerance: 0.5 },
          ],
          correction:
            "a) Total : $24 \\times 270 = 6\\,480$ €. Coût : $6\\,480 - 6\\,000 = 480$ €.\nb) $S = 2\\,000 \\times 1{,}03 \\times \\dfrac{1{,}03^3 - 1}{1{,}03 - 1} \\approx 6\\,367{,}25$, soit environ $6\\,367$ €.\nc) Total versé : $3 \\times 2\\,000 = 6\\,000$ €. Gain : $6\\,367 - 6\\,000 = 367$ €.\nd) $480 + 367 = 847$ € : A fait perdre 480 €, B fait gagner 367 €.\n⛔ Le piège au d) : soustraire ($480 - 367$). L'une est une dépense, l'autre un gain : ils s'ajoutent pour mesurer l'écart.\nRéponse : a) 480 € ; b) 6 367 € ; c) 367 € ; d) 847 €.",
          micros: ["suiteT_somme_emprunt", "suiteT_somme_versements"],
        },
        {
          titre: "Le plan de Nadia",
          enonce:
            "Nadia, kinésithérapeute, verse 1 200 € au début de chaque année pendant 10 ans, à 5 % par an (intérêts composés, modèle).\na) « Combien a-t-elle à la fin des 10 ans, tous versements compris ? » : terme ou somme ?\nb) Que vaut le 1er versement à la fin, à l'euro près ?\nc) Que vaut le dernier versement à la fin ?\nd) Quelle est la valeur acquise, à l'euro près ?\ne) Combien les intérêts ont-ils rapporté, à l'euro près ?",
          reponses: [
            { question: "a)", attendu: SOMME },
            { question: "b)", attendu: "1 955 €", tolerance: 0.5 },
            { question: "c)", attendu: "1 260 €" },
            { question: "d)", attendu: "15 848 €", tolerance: 0.5 },
            { question: "e)", attendu: "3 848 €", tolerance: 0.5 },
          ],
          correction:
            "a) On additionne les valeurs de tous les versements : une somme.\nb) Placé 10 ans : $1\\,200 \\times 1{,}05^{10} \\approx 1\\,954{,}67$, soit environ $1\\,955$ €.\nc) Placé 1 an : $1\\,200 \\times 1{,}05 = 1\\,260$ €.\nd) $S = 1\\,200 \\times 1{,}05 \\times \\dfrac{1{,}05^{10} - 1}{1{,}05 - 1} \\approx 15\\,848{,}14$, soit environ $15\\,848$ €.\ne) Total versé : $10 \\times 1\\,200 = 12\\,000$ €. Gain : $15\\,848 - 12\\,000 = 3\\,848$ €.\n⛔ Le piège au d) : calculer $12\\,000 \\times 1{,}05^{10}$. Tout l'argent ne reste pas 10 ans : seul le premier versement y reste.\nRéponse : a) somme ; b) 1 955 € ; c) 1 260 € ; d) 15 848 € ; e) 3 848 €.",
          micros: ["suiteT_somme_reconnaitre", "suiteT_somme_versements"],
        },
      ],
    },
  ],
};
