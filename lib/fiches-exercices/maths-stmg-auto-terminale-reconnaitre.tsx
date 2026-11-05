// ─── Fiche d'exercices : reconnaître, automatismes de Tle (STMG) ────────────────
//
// Notion auto_terminale_reconnaitre du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-terminale.bank.ts`). Trois
// réflexes de terminale : un pourcentage qui se répète signe une suite géométrique
// (une quantité fixe, une suite arithmétique) ; la raison q = 1 + t ÷ 100 et le
// chemin retour q → taux ; le signe de a(x − r₁)(x − r₂) par l'image mentale.
// ⛔ Aucune figure de parabole : le coach (et le BO) demande de conclure SANS la
// tracer, c'est ce qu'on travaille. Le seul dessin est un tableau de relevés.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs et situations courtes (ex. 1 à 8) ; radio
// (animatrice), montagne (garde forestier), garage (garagiste), banque (conseillère),
// kayak (loueuse), calcul nu (ex. 14), aquarium (soigneur), presse (éditrice),
// logement étudiant (gestionnaire), entrepôt (responsable), salon du livre
// (organisatrice), papillons (stagiaire d'observatoire).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`.
//
// Micro-compétences : autoT_suite_geo_reconnaitre (1, 2, 3, 9, 10, 16, 17, 20),
// autoT_suite_geo_raison (4, 5, 6, 9, 10, 11, 12, 16, 17, 18, 20),
// autoT_signe_image_mentale (7, 8, 13, 14, 15, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

// Un signe : le mot, au masculin ou au féminin (« l'expression est positive »), ou + / −.
const POSITIF = ["positif", "positive", "+"];
const NEGATIF = ["négatif", "négative", "-"];

export const exercicesAutoTerminaleReconnaitreStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-terminale-reconnaitre",
  titre: "Reconnaître : les automatismes de terminale",
  accroche:
    "Vingt exercices pour reconnaître d'un coup d'œil : un pourcentage qui se répète, c'est une suite géométrique ; la raison se lit dans le taux, et le taux dans la raison ; le signe d'une expression factorisée se trouve sans rien tracer. Des bouquetins, un loyer, une machine qui perd de sa valeur, un stock qui fond, des papillons. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître la suite, écrire la raison, ou donner un signe sans tracer.",
      rappel: [
        "Un POURCENTAGE qui se répète : on multiplie toujours par le même nombre, c'est une suite géométrique. Une QUANTITÉ FIXE ajoutée : c'est une suite arithmétique.",
        "La raison d'une hausse de $t$ % : $q = 1 + t \\div 100$. D'une baisse de $t$ % : $q = 1 - t \\div 100$.",
        "Retour : $q$ plus grand que 1, c'est une hausse ; $q$ plus petit que 1, c'est une baisse. L'écart à 1 donne le pourcentage.",
        "$a(x - r_1)(x - r_2)$ : parabole vers le haut si $a$ est positif, vers le bas si $a$ est négatif. Du signe de $a$ à l'EXTÉRIEUR des racines, du signe contraire ENTRE elles.",
      ],
      exercices: [
        {
          enonce:
            "Un capital est placé à 3 % d'intérêts composés par an. Par quel type de suite le modélise-t-on ? Réponds géométrique ou arithmétique.",
          reponses: [{ attendu: ["géométrique", "suite géométrique", "une suite géométrique"] }],
          correction:
            "L'énoncé donne un pourcentage qui se répète chaque année.\nChaque année, on multiplie par le même nombre, 1,03.\n⛔ Le piège : voir « 3 » et penser qu'on ajoute 3 chaque année. On ajoute 3 % de la somme du moment, et cette somme grandit.\nRéponse : géométrique.",
          micros: ["autoT_suite_geo_reconnaitre"],
        },
        {
          enonce:
            "Une épargne est alimentée par un versement fixe de 50 € par mois. Par quel type de suite la modélise-t-on ? Réponds géométrique ou arithmétique.",
          reponses: [{ attendu: ["arithmétique", "suite arithmétique", "une suite arithmétique"] }],
          correction:
            "L'énoncé donne une quantité fixe, en euros, pas un pourcentage.\nChaque mois, on ajoute toujours le même nombre, 50.\n⛔ Le piège : répondre géométrique dès qu'il s'agit d'épargne. C'est la forme de l'évolution qui décide, pas le sujet.\nRéponse : arithmétique.",
          micros: ["autoT_suite_geo_reconnaitre"],
        },
        {
          enonce:
            "Laquelle de ces situations ne se modélise PAS par une suite géométrique ? Écris sa lettre.\nA : un loyer revalorisé de 2 % chaque année.\nB : un compteur qui avance de 120 unités par jour.\nC : une machine qui perd 15 % de sa valeur par an.",
          reponses: [{ attendu: "B" }],
          correction:
            "A : 2 % répétés, géométrique.\nB : 120 unités ajoutées chaque jour, une quantité fixe : arithmétique.\nC : 15 % répétés, géométrique.\n⛔ Le piège : choisir C parce que la valeur baisse. Une baisse en pourcentage reste une suite géométrique.\nRéponse : B.",
          micros: ["autoT_suite_geo_reconnaitre"],
        },
        {
          enonce:
            "Un abonnement augmente de 8 % par an. On le modélise par une suite géométrique. Quelle est sa raison ?",
          reponses: [{ attendu: "1,08" }],
          correction:
            "La raison est le coefficient multiplicateur : $q = 1 + 8 \\div 100$.\n$q = 1 + 0{,}08 = 1{,}08$.\n⛔ Le piège : répondre 0,08 ou 8. Sans le 1, on ne garde que l'augmentation et on perd la valeur de départ.\nRéponse : 1,08.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Un stock diminue de 25 % chaque mois. On le modélise par une suite géométrique. Quelle est sa raison ?",
          reponses: [{ attendu: "0,75" }],
          correction:
            "C'est une baisse : $q = 1 - 25 \\div 100$.\n$q = 1 - 0{,}25 = 0{,}75$.\n⛔ Le piège : répondre 1,25, comme pour une hausse, ou 0,25, ce qu'on perd. On multiplie par ce qu'il RESTE.\nRéponse : 0,75.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Une suite géométrique de raison $q = 0{,}92$ modélise une évolution.\na) Est-ce une hausse ou une baisse ? Écris le mot.\nb) De quel pourcentage ?",
          reponses: [
            { question: "a)", attendu: ["baisse", "une baisse"] },
            { question: "b)", attendu: ["8 %", "-8 %"] },
          ],
          correction:
            "a) $0{,}92$ est plus petit que 1 : c'est une baisse.\nb) L'écart à 1 : $1 - 0{,}92 = 0{,}08$, soit 8 %.\n⛔ Le piège au b) : lire 92 %. La valeur est multipliée par 0,92 : elle garde 92 % et perd 8 %.\nRéponse : a) baisse ; b) 8 %.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Sans calculer, donne le signe de $2(x - 1)(x - 4)$ pour $x = 6$. Réponds positif ou négatif.",
          reponses: [{ attendu: POSITIF }],
          correction:
            "Les racines sont 1 et 4, et $a = 2$ est positif : parabole vers le haut.\n6 est à l'EXTÉRIEUR des racines : l'expression a le signe de $a$.\n⛔ Le piège : donner à l'extérieur le signe contraire de $a$. C'est ENTRE les racines qu'il change.\nRéponse : positif.",
          micros: ["autoT_signe_image_mentale"],
        },
        {
          enonce:
            "Sans calculer, donne le signe de $-(x + 2)(x - 3)$ pour $x = 5$. Réponds positif ou négatif.",
          reponses: [{ attendu: NEGATIF }],
          correction:
            "Les racines sont $-2$ et 3, et $a = -1$ est négatif : parabole vers le bas.\n5 est à l'extérieur des racines : l'expression a le signe de $a$, négatif.\n⛔ Le piège : lire les racines 2 et $-3$, avec les signes de l'expression. La racine de $x + 2$ est $-2$, celle de $x - 3$ est 3.\nRéponse : négatif.",
          micros: ["autoT_signe_image_mentale"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation : on reconnaît la suite, on écrit la raison, on calcule. Pour un signe, on se fait l'image de la courbe.",
      rappel: [
        "Le terme suivant d'une suite géométrique : terme × $q$. Dans une suite arithmétique : terme + la quantité fixe.",
        "Pour savoir si une série est géométrique : on divise chaque valeur par la précédente. Pour savoir si elle est arithmétique : on les soustrait.",
        "Le signe sans tracer : entre les racines, un seul intervalle ; à l'extérieur, deux morceaux réunis par ∪.",
      ],
      exercices: [
        {
          enonce:
            "L'animatrice d'une radio locale voit son nombre d'auditeurs fidèles progresser de 12 % par mois (modèle). Elle en a 500.\na) Quel type de suite modélise cette situation ? Réponds géométrique ou arithmétique.\nb) Quelle est sa raison ?\nc) Combien d'auditeurs aura-t-elle le mois suivant ?",
          reponses: [
            { question: "a)", attendu: ["géométrique", "suite géométrique", "une suite géométrique"] },
            { question: "b)", attendu: "1,12" },
            { question: "c)", attendu: "560" },
          ],
          correction:
            "a) Un pourcentage se répète chaque mois : suite géométrique.\nb) $q = 1 + 12 \\div 100 = 1{,}12$.\nc) $500 \\times 1{,}12 = 560$ auditeurs.\n⛔ Le piège au c) : calculer $500 + 12 = 512$. Les 12 sont un pourcentage, pas 12 personnes.\nRéponse : a) géométrique ; b) 1,12 ; c) 560.",
          micros: ["autoT_suite_geo_reconnaitre", "autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Un garde forestier note trois évolutions (modèle).\nA : on plante 40 arbres de plus chaque année.\nB : une population de bouquetins croît de 5 % par an.\nC : une forêt perd 2 % de sa surface par an.\na) Laquelle est arithmétique ? Écris sa lettre.\nb) Quelle est la raison de B ?\nc) Quelle est la raison de C ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "1,05" },
            { question: "c)", attendu: "0,98" },
          ],
          correction:
            "a) A ajoute une quantité fixe, 40 arbres : arithmétique.\nb) Hausse de 5 % : $q = 1 + 0{,}05 = 1{,}05$.\nc) Baisse de 2 % : $q = 1 - 0{,}02 = 0{,}98$.\n⛔ Le piège au c) : écrire 0,8. 2 % s'écrit 0,02 : $2 \\div 100 = 0{,}02$.\nRéponse : a) A ; b) 1,05 ; c) 0,98.",
          micros: ["autoT_suite_geo_reconnaitre", "autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Un garagiste achète un pont élévateur 20 000 €. Il perd 15 % de sa valeur par an (modèle).\na) Quelle est la raison de la suite géométrique qui modélise sa valeur ?\nb) Quelle est sa valeur au bout d'un an ?\nc) Quelle est sa valeur au bout de deux ans ?",
          reponses: [
            { question: "a)", attendu: "0,85" },
            { question: "b)", attendu: "17 000 €" },
            { question: "c)", attendu: "14 450 €" },
          ],
          correction:
            "a) Baisse de 15 % : $q = 1 - 0{,}15 = 0{,}85$.\nb) $20\\,000 \\times 0{,}85 = 17\\,000$ €.\nc) $17\\,000 \\times 0{,}85 = 14\\,450$ €.\n⛔ Le piège au c) : retirer deux fois 3 000 €, soit 14 000 €. La seconde baisse porte sur 17 000 €, pas sur 20 000 €.\nRéponse : a) 0,85 ; b) 17 000 € ; c) 14 450 €.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Une conseillère bancaire lit trois raisons de suites géométriques. Donne chaque évolution en pourcentage, avec son signe : + pour une hausse, − pour une baisse.\na) $q = 1{,}06$\nb) $q = 0{,}7$\nc) $q = 1{,}015$",
          reponses: [
            { question: "a)", attendu: "+6 %" },
            { question: "b)", attendu: "-30 %" },
            { question: "c)", attendu: "+1,5 %" },
          ],
          correction:
            "On calcule l'écart à 1, puis on le lit en pourcentage.\na) $1{,}06 - 1 = 0{,}06$ : une hausse de 6 %.\nb) $0{,}7 - 1 = -0{,}3$ : une baisse de 30 %.\nc) $1{,}015 - 1 = 0{,}015$ : une hausse de 1,5 %.\n⛔ Le piège au b) : lire une baisse de 70 %. Multiplier par 0,7, c'est garder 70 % et perdre 30 %.\nRéponse : a) +6 % ; b) −30 % ; c) +1,5 %.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          enonce:
            "Une loueuse de kayaks modélise son bénéfice par $B(x) = -2(x - 1)(x - 6)$, en centaines d'euros, pour $x$ dizaines de locations, sans le tracer.\na) Quelles sont les deux racines ?\nb) La parabole est-elle tournée vers le haut ou vers le bas ? Écris haut ou bas.\nc) Quel est le signe de $B(x)$ pour $x = 3$ ? Réponds positif ou négatif.\nd) Quel est le signe de $B(x)$ pour $x = 8$ ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "1 ; 6" },
            { question: "b)", attendu: ["bas", "vers le bas"] },
            { question: "c)", attendu: POSITIF },
            { question: "d)", attendu: NEGATIF },
          ],
          correction:
            "a) $x = 1$ ou $x = 6$.\nb) $a = -2$ est négatif : vers le bas.\nc) 3 est entre les racines : signe contraire de $a$, donc positif.\nd) 8 est à l'extérieur : signe de $a$, donc négatif.\n⛔ Le piège au c) : donner le signe de $a$ partout. La parabole vers le bas est AU-DESSUS de l'axe entre ses racines.\nRéponse : a) 1 et 6 ; b) bas ; c) positif ; d) négatif.",
          micros: ["autoT_signe_image_mentale"],
        },
        {
          enonce:
            "Sans rien tracer, on étudie l'expression $3(x + 1)(x - 4)$.\na) Sur quel ensemble est-elle strictement négative ?\nb) Sur quel ensemble est-elle strictement positive ?",
          reponses: [
            { question: "a)", attendu: "]-1 ; 4[" },
            { question: "b)", attendu: "]-∞ ; -1[ ∪ ]4 ; +∞[" },
          ],
          correction:
            "Les racines sont $-1$ et 4, et $a = 3$ est positif : parabole vers le haut.\na) Une parabole vers le haut plonge sous l'axe ENTRE ses racines : ]−1 ; 4[.\nb) Elle est au-dessus de part et d'autre : deux morceaux.\n⛔ Le piège au b) : ne garder qu'un seul morceau, ]4 ; +∞[. À gauche de $-1$, l'expression est aussi positive.\nRéponse : a) ]−1 ; 4[ ; b) ]−∞ ; −1[ ∪ ]4 ; +∞[.",
          micros: ["autoT_signe_image_mentale"],
        },
        {
          enonce:
            "Un soigneur d'aquarium suit l'écart de salinité d'un bassin : $E(x) = -(x - 2)(x - 5)$, en grammes par litre, pour $x$ jours, sur $[0\\,;\\,8]$ (modèle). Il ne trace rien.\na) Sur quel intervalle l'écart est-il strictement positif ?\nb) Sur quel ensemble est-il strictement négatif ?",
          reponses: [
            { question: "a)", attendu: "]2 ; 5[" },
            { question: "b)", attendu: "[0 ; 2[ ∪ ]5 ; 8]" },
          ],
          correction:
            "Les racines sont 2 et 5, et $a = -1$ est négatif : parabole vers le bas.\na) Elle est au-dessus de l'axe entre ses racines : ]2 ; 5[.\nb) À l'extérieur, elle est en dessous. On reste sur $[0\\,;\\,8]$ : les bornes 0 et 8 sont dans le domaine, d'où leurs crochets fermés.\n⛔ Le piège au a) : répondre comme si $a$ était positif. Le signe moins devant le produit retourne la parabole.\nRéponse : a) ]2 ; 5[ ; b) [0 ; 2[ ∪ ]5 ; 8].",
          micros: ["autoT_signe_image_mentale"],
        },
        {
          enonce:
            "Une éditrice de presse compare les abonnés de deux magazines sur quatre ans (modèle).\na) Lequel suit une suite géométrique ? Écris son nom.\nb) Quelle est sa raison ?\nc) Quel est le taux d'évolution annuel correspondant ?\nd) Pour l'autre magazine, quelle quantité s'ajoute chaque année ?",
          figure: grille(["Année", "1", "2", "3", "4"], [
            ["Magazine A", 1000, 1100, 1210, 1331],
            ["Magazine B", 1000, 1100, 1200, 1300],
          ]),
          reponses: [
            { question: "a)", attendu: ["A", "Magazine A", "le magazine A"] },
            { question: "b)", attendu: "1,1" },
            { question: "c)", attendu: "10 %" },
            { question: "d)", attendu: "100" },
          ],
          correction:
            "a) On divise chaque valeur de A par la précédente : $1\\,100 \\div 1\\,000 = 1{,}1$ ; $1\\,210 \\div 1\\,100 = 1{,}1$ ; $1\\,331 \\div 1\\,210 = 1{,}1$. Le rapport est constant : A est géométrique.\nb) $q = 1{,}1$.\nc) $1{,}1 - 1 = 0{,}1$, soit 10 %.\nd) Pour B : $1\\,100 - 1\\,000 = 100$ ; $1\\,200 - 1\\,100 = 100$ ; $1\\,300 - 1\\,200 = 100$. On ajoute 100 : B est arithmétique.\n⛔ Le piège au a) : conclure sur les deux premières valeurs, identiques. Il faut regarder toutes les années.\nRéponse : a) A ; b) 1,1 ; c) 10 % ; d) 100.",
          micros: ["autoT_suite_geo_reconnaitre", "autoT_suite_geo_raison"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : reconnaître, écrire la raison, calculer, ou se faire l'image de la courbe.",
      rappel: [
        "Deux baisses de 10 % ne font pas 20 % : on multiplie $0{,}9 \\times 0{,}9$, car la seconde porte sur ce qui reste.",
        "L'image mentale en trois temps : les racines, le signe de $a$, la place de $x$.",
        "Comparer deux modèles : on calcule leurs valeurs à la même date.",
      ],
      exercices: [
        {
          titre: "Deux loyers",
          enonce:
            "Le gestionnaire d'une résidence étudiante hésite entre deux contrats pour louer un box de rangement, à 100 € par mois la première année (modèle). Contrat A : le loyer augmente de 8 % par an. Contrat B : il augmente de 10 € par an.\na) Quel type de suite modélise A ? Réponds géométrique ou arithmétique.\nb) Quelle est sa raison ?\nc) Quel type de suite modélise B ? Réponds géométrique ou arithmétique.\nd) Quel est le loyer de A, deux ans après ?\ne) Quel est le loyer de B, deux ans après ?\nf) Lequel est le moins cher, deux ans après ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: ["géométrique", "suite géométrique", "une suite géométrique"] },
            { question: "b)", attendu: "1,08" },
            { question: "c)", attendu: ["arithmétique", "suite arithmétique", "une suite arithmétique"] },
            { question: "d)", attendu: "116,64 €" },
            { question: "e)", attendu: "120 €" },
            { question: "f)", attendu: "A" },
          ],
          correction:
            "a) 8 % se répètent : géométrique.\nb) $q = 1 + 8 \\div 100 = 1{,}08$.\nc) 10 € s'ajoutent : arithmétique.\nd) $100 \\times 1{,}08 = 108$, puis $108 \\times 1{,}08 = 116{,}64$ €.\ne) $100 + 10 + 10 = 120$ €.\nf) 116,64 € est moins que 120 € : le contrat A est le moins cher.\n⛔ Le piège au d) : ajouter deux fois 8 €, soit 116 €. La seconde hausse porte sur 108 €.\nRéponse : a) géométrique ; b) 1,08 ; c) arithmétique ; d) 116,64 € ; e) 120 € ; f) A.",
          micros: ["autoT_suite_geo_reconnaitre", "autoT_suite_geo_raison"],
        },
        {
          titre: "Le stock qui fond",
          enonce:
            "Une responsable d'entrepôt voit un stock de 1 600 pièces diminuer de 25 % chaque mois (modèle).\na) Quelle est la raison ?\nb) Quel est le stock après 1 mois ?\nc) Quel est le stock après 2 mois ?\nd) De quel pourcentage le stock a-t-il baissé en 2 mois ?",
          reponses: [
            { question: "a)", attendu: "0,75" },
            { question: "b)", attendu: "1 200" },
            { question: "c)", attendu: "900" },
            { question: "d)", attendu: "43,75 %" },
          ],
          correction:
            "a) $q = 1 - 25 \\div 100 = 0{,}75$.\nb) $1\\,600 \\times 0{,}75 = 1\\,200$ pièces.\nc) $1\\,200 \\times 0{,}75 = 900$ pièces.\nd) Le coefficient sur deux mois : $0{,}75 \\times 0{,}75 = 0{,}5625$. Et $1 - 0{,}5625 = 0{,}4375$, soit 43,75 %.\nVérification : $900 \\div 1\\,600 = 0{,}5625$. ✔\n⛔ Le piège au d) : additionner, 25 % + 25 % = 50 %. La seconde baisse porte sur 1 200 pièces, pas sur 1 600.\nRéponse : a) 0,75 ; b) 1 200 ; c) 900 ; d) 43,75 %.",
          micros: ["autoT_suite_geo_raison"],
        },
        {
          titre: "Le bénéfice sans dessin",
          enonce:
            "L'organisatrice d'un salon du livre modélise son bénéfice par $B(x) = -3(x - 2)(x - 9)$, en centaines d'euros, pour $x$ centaines de visiteurs, sur $[0\\,;\\,12]$. Elle ne trace rien.\na) Quelles sont les deux racines ?\nb) La parabole est-elle tournée vers le haut ou vers le bas ? Écris haut ou bas.\nc) Sur quel intervalle le bénéfice est-il strictement positif ?\nd) Sur quel ensemble est-il strictement négatif ?\ne) Quel est le signe de $B(x)$ pour 1 000 visiteurs ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "2 ; 9" },
            { question: "b)", attendu: ["bas", "vers le bas"] },
            { question: "c)", attendu: "]2 ; 9[" },
            { question: "d)", attendu: "[0 ; 2[ ∪ ]9 ; 12]" },
            { question: "e)", attendu: NEGATIF },
          ],
          correction:
            "a) $x = 2$ ou $x = 9$.\nb) $a = -3$ est négatif : vers le bas.\nc) Entre les racines, elle est au-dessus de l'axe : ]2 ; 9[.\nd) À l'extérieur, elle est en dessous. On reste sur $[0\\,;\\,12]$.\ne) 1 000 visiteurs, ce sont 10 centaines : $x = 10$. C'est à l'extérieur des racines : signe de $a$, négatif.\n⛔ Le piège au e) : remplacer $x$ par 1 000. Ici, $x$ compte des centaines de visiteurs.\nRéponse : a) 2 et 9 ; b) bas ; c) ]2 ; 9[ ; d) [0 ; 2[ ∪ ]9 ; 12] ; e) négatif.",
          micros: ["autoT_signe_image_mentale"],
        },
        {
          titre: "Le dossier de Yanis",
          enonce:
            "Yanis, stagiaire d'un observatoire, compte 5 000 papillons d'une espèce imaginaire : leur nombre diminue de 4 % par an. Il suit aussi un indicateur $S(x) = (x + 3)(x - 1)$, où $x$ est le réglage de son capteur.\na) Quel type de suite modélise les papillons ? Réponds géométrique ou arithmétique.\nb) Quelle est sa raison ?\nc) Combien de papillons reste-t-il au bout d'un an ?\nd) Sans calculer, quel est le signe de $S(x)$ pour $x = 0$ ? Réponds positif ou négatif.\ne) Sur quel intervalle $S(x)$ est-il strictement négatif ?",
          reponses: [
            { question: "a)", attendu: ["géométrique", "suite géométrique", "une suite géométrique"] },
            { question: "b)", attendu: "0,96" },
            { question: "c)", attendu: "4 800" },
            { question: "d)", attendu: NEGATIF },
            { question: "e)", attendu: "]-3 ; 1[" },
          ],
          correction:
            "a) Un pourcentage qui se répète : géométrique.\nb) $q = 1 - 4 \\div 100 = 0{,}96$.\nc) $5\\,000 \\times 0{,}96 = 4\\,800$ papillons.\nd) Les racines sont $-3$ et 1, et $a = 1$ est positif. 0 est entre les racines : signe contraire de $a$, négatif.\ne) Parabole vers le haut : sous l'axe entre ses racines, soit ]−3 ; 1[.\n⛔ Le piège au c) : retirer 4 papillons. Les 4 sont un pourcentage : 4 % de 5 000, c'est 200.\nRéponse : a) géométrique ; b) 0,96 ; c) 4 800 ; d) négatif ; e) ]−3 ; 1[.",
          micros: ["autoT_suite_geo_reconnaitre", "autoT_suite_geo_raison", "autoT_signe_image_mentale"],
        },
      ],
    },
  ],
};
