// ─── Fiche d'exercices : contre-exemple et réciproque (STMG) — 20 exercices ─────
//
// Notion logique_raisonnement du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// un seul contre-exemple suffit (et le trouver parmi plusieurs cas), écrire la
// réciproque de « si A alors B » et la juger, écrire et utiliser la contraposée
// « si non B alors non A » (micro logique_contraposee, ajoutée au coach le 05/11 :
// gabarits de `lycee-logique-commun.ts`), dire si une condition est nécessaire ou suffisante, et reconnaître
// une équivalence (« si et seulement si »). Aucune démonstration n'est demandée.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : nombres nus et phrases courtes (ex. 1 à 8) ; vente en ligne
// (responsable logistique), football (arbitre), immobilier (agent), comptabilité
// (comptable), lycée (professeure), énergie (journaliste), usine (ingénieure), jury
// d'examen (président de jury), commerce (directrice commerciale), banque
// (banquier), magasin (magasinier), assurance (analyste).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs`.
//
// Micro-compétences : logique_contre_exemple (1, 2, 3, 4, 10, 12, 13, 14, 15, 18, 19,
// 20), logique_reciproque (5, 6, 9, 10, 11, 12, 17, 19), logique_necessaire_suffisante
// (7, 8, 9, 10, 11, 16, 17, 19, 20), logique_contraposee (5, 10, 17, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

// Les mots tels que l'élève les tape : sans accord, ou avec « condition ».
const VRAIE = ["vraie", "vrai"];
const FAUSSE = ["fausse", "faux"];
const SUFFISANTE = ["suffisante", "suffisant", "condition suffisante", "une condition suffisante"];
const NECESSAIRE = ["nécessaire", "condition nécessaire", "une condition nécessaire"];
const LES_DEUX = ["les deux", "nécessaire et suffisante", "suffisante et nécessaire", "condition nécessaire et suffisante"];

export const exercicesLogiqueRaisonnementStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "logique-raisonnement",
  titre: "Contre-exemple, réciproque, contraposée",
  accroche:
    "Vingt exercices pour raisonner juste : un seul contre-exemple suffit à faire tomber une affirmation, une phrase vraie peut avoir une réciproque fausse, et « il faut » ne veut pas dire « il suffit ». Un match de foot, un jury d'examen, une prime commerciale, un placement, un magasin : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Trouver un contre-exemple, reconnaître une réciproque ou une contraposée, nommer une condition.",
      rappel: [
        "Pour montrer qu'une affirmation générale est fausse, un seul cas suffit : c'est un contre-exemple. Des exemples où elle marche ne prouvent rien.",
        "La réciproque de « si A alors B » est « si B alors A ». On échange, on ne nie rien. Elle peut être fausse même si la phrase de départ est vraie.",
        "La contraposée de « si A alors B » est « si non B alors non A » : on échange ET on nie.",
        "Dans « si A alors B » : A est une condition SUFFISANTE pour B, et B est une condition NÉCESSAIRE pour A.",
      ],
      exercices: [
        {
          enonce: "Affirmation : « le carré d'un nombre est toujours plus grand que ce nombre ». Parmi 0,5 ; 3 ; 7 et 12, lequel est un contre-exemple ? Écris-le.",
          reponses: [{ attendu: "0,5" }],
          correction:
            "On teste chaque nombre. $3^2 = 9$, $7^2 = 49$ et $12^2 = 144$ : l'affirmation tient.\nMais $0{,}5^2 = 0{,}25$, qui est plus petit que 0,5.\n⛔ Le piège : conclure avec 3, 7 et 12 que l'affirmation est vraie. Un seul cas contraire suffit à la faire tomber.\nRéponse : 0,5.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce: "Affirmation : « tout nombre est plus petit que son double ». Parmi −4, 2, 9 et 15, lequel est un contre-exemple ? Écris-le.",
          reponses: [{ attendu: "-4" }],
          correction:
            "Le double de 2 est 4, celui de 9 est 18, celui de 15 est 30 : l'affirmation tient.\nLe double de −4 est −8, et −8 est plus petit que −4.\n⛔ Le piège : ne penser qu'aux nombres positifs. L'affirmation dit « tout nombre ».\nRéponse : −4.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce: "Affirmation : « tout multiple de 3 est impair ». Parmi 9, 15, 12 et 21, lequel est un contre-exemple ? Écris-le.",
          reponses: [{ attendu: "12" }],
          correction:
            "Les quatre nombres sont des multiples de 3. Il en faut un qui soit pair.\n$12 = 3 \\times 4$ est pair : l'affirmation tombe.\n⛔ Le piège : chercher un nombre qui n'est pas multiple de 3. Un contre-exemple doit vérifier le début de la phrase, mais pas la fin.\nRéponse : 12.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce: "Affirmation : « une hausse puis une baisse du même pourcentage ramènent au prix de départ ». On teste un prix de 100 €, avec une hausse de 50 % puis une baisse de 50 %. Quel est le prix final ?",
          reponses: [{ attendu: "75 €" }],
          correction:
            "Après la hausse : $100 \\times 1{,}5 = 150$ €.\nAprès la baisse : $150 \\times 0{,}5 = 75$ €.\nOn ne revient pas à 100 € : l'affirmation est fausse.\n⛔ Le piège : répondre 100. Les 50 % de la baisse portent sur 150 €, pas sur 100 €.\nRéponse : 75 €.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce:
            "On part de la phrase « s'il pleut, alors la route est mouillée ».\nA : s'il ne pleut pas, alors la route n'est pas mouillée.\nB : si la route est mouillée, alors il pleut.\nC : si la route n'est pas mouillée, alors il ne pleut pas.\na) Laquelle est sa réciproque ? Réponds par la lettre.\nb) Laquelle est sa contraposée ? Réponds par la lettre.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
          ],
          correction:
            "Le début est « il pleut », la fin « la route est mouillée ».\na) La réciproque échange les deux morceaux, sans rien nier : si la route est mouillée, alors il pleut.\nb) La contraposée les échange ET les nie : si la route n'est pas mouillée, alors il ne pleut pas.\n⛔ Le piège au b) : choisir A. Elle nie sans échanger : ce n'est pas la contraposée.\nRéponse : a) B ; b) C.",
          micros: ["logique_reciproque", "logique_contraposee"],
        },
        {
          enonce: "La phrase « si un nombre vaut 10, alors il est positif » est vraie. Sa réciproque est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [{ attendu: FAUSSE }],
          correction:
            "La réciproque est : « si un nombre est positif, alors il vaut 10 ».\nLe nombre 3 est positif et ne vaut pas 10 : c'est un contre-exemple.\n⛔ Le piège : croire qu'une réciproque hérite de la vérité de la phrase de départ. Il faut la tester à part.\nRéponse : fausse.",
          micros: ["logique_reciproque"],
        },
        {
          enonce: "On sait que : si un nombre est supérieur à 10, alors il est positif. Pour être positif, « être supérieur à 10 » est-il une condition nécessaire ou suffisante ? Écris le mot.",
          reponses: [{ attendu: SUFFISANTE }],
          correction:
            "Il suffit qu'un nombre dépasse 10 pour qu'il soit positif : c'est suffisant.\nCe n'est pas nécessaire : 3 est positif sans dépasser 10.\n⛔ Le piège : confondre les deux mots. Ce qui est avant « alors » est suffisant.\nRéponse : suffisante.",
          micros: ["logique_necessaire_suffisante"],
        },
        {
          enonce: "On sait que : si une personne habite à Lyon, alors elle habite en France. Pour habiter à Lyon, « habiter en France » est-il une condition nécessaire ou suffisante ? Écris le mot.",
          reponses: [{ attendu: NECESSAIRE }],
          correction:
            "Pour habiter à Lyon, il faut habiter en France : sans cela, c'est impossible. C'est nécessaire.\nCe n'est pas suffisant : on peut habiter en France sans habiter à Lyon.\n⛔ Le piège : répondre suffisante. Ce qui est après « alors » est nécessaire.\nRéponse : nécessaire.",
          micros: ["logique_necessaire_suffisante"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une phrase, une situation : on repère A et B, puis on teste dans les deux sens.",
      rappel: [
        "On repère A et B dans « si A alors B », puis on écrit la réciproque « si B alors A » et on cherche un contre-exemple.",
        "Un contre-exemple doit vérifier le début de la phrase et contredire la fin.",
        "Si la phrase ET sa réciproque sont vraies, c'est une équivalence : on écrit « A si et seulement si B ». A est alors nécessaire et suffisante pour B.",
        "Une phrase vraie a toujours une contraposée vraie. Sa réciproque, elle, se teste à part.",
      ],
      exercices: [
        {
          enonce:
            "Un site annonce : « si la commande dépasse 200 €, alors la livraison est gratuite ». La responsable logistique ajoute que les clients fidèles ont aussi la livraison gratuite, quel que soit le montant.\na) Quelle est la réciproque ? Réponds par la lettre.\nA : si la commande ne dépasse pas 200 €, alors la livraison est payante.\nB : si la livraison est gratuite, alors la commande dépasse 200 €.\nb) Cette réciproque est-elle vraie ou fausse sur ce site ? Écris « vraie » ou « fausse ».\nc) Pour avoir la livraison gratuite, « dépasser 200 € » est-il une condition nécessaire ou suffisante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: FAUSSE },
            { question: "c)", attendu: SUFFISANTE },
          ],
          correction:
            "a) On échange les deux morceaux : si la livraison est gratuite, alors la commande dépasse 200 €.\nb) Un client fidèle qui commande pour 50 € a la livraison gratuite : la réciproque est fausse.\nc) Dépasser 200 € suffit. Ce n'est pas nécessaire, puisque les clients fidèles l'ont aussi.\n⛔ Le piège au a) : choisir A, qui nie sans échanger.\nRéponse : a) B ; b) fausse ; c) suffisante.",
          micros: ["logique_reciproque", "logique_necessaire_suffisante"],
        },
        {
          enonce:
            "Un arbitre de football affirme : « si une équipe gagne un match, alors elle a marqué au moins un but » (sans compter les forfaits).\na) La réciproque est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».\nb) Quel score, écrit pour l'équipe puis pour l'adversaire, est un contre-exemple à la réciproque ? Réponds par la lettre.\nA : 2 à 0. B : 1 à 3. C : 0 à 0.\nc) Pour gagner, « marquer au moins un but » est-il une condition nécessaire ou suffisante ? Écris le mot.\nd) La contraposée de la phrase de l'arbitre est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [
            { question: "a)", attendu: FAUSSE },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: NECESSAIRE },
            { question: "d)", attendu: VRAIE },
          ],
          correction:
            "a) La réciproque dit : si une équipe a marqué au moins un but, alors elle gagne. C'est faux.\nb) À 1 à 3, l'équipe a marqué et elle a perdu : c'est le contre-exemple.\nc) Sans but, on ne peut pas gagner : c'est nécessaire. Mais cela ne suffit pas.\nd) La contraposée dit : si une équipe n'a marqué aucun but, alors elle ne gagne pas. La phrase de l'arbitre est vraie : sa contraposée aussi.\n⛔ Le piège au b) : choisir C. À 0 à 0, l'équipe n'a pas marqué : ce cas ne vérifie pas le début de la réciproque.\nRéponse : a) fausse ; b) B ; c) nécessaire ; d) vraie.",
          micros: ["logique_contre_exemple", "logique_reciproque", "logique_contraposee", "logique_necessaire_suffisante"],
        },
        {
          enonce:
            "Un agent immobilier écrit : « si un prix augmente de 20 %, alors il est multiplié par 1,2 ».\na) La réciproque est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».\nb) Peut-on écrire « un prix augmente de 20 % si et seulement s'il est multiplié par 1,2 » ? Réponds oui ou non.\nc) Un appartement coûte 80 000 €. Quel est son prix après cette hausse ?",
          reponses: [
            { question: "a)", attendu: VRAIE },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "96 000 €" },
          ],
          correction:
            "a) Si un prix est multiplié par 1,2, il augmente de 20 % : la réciproque est vraie.\nb) La phrase et sa réciproque sont vraies : c'est une équivalence, oui.\nc) $80\\,000 \\times 1{,}2 = 96\\,000$ €.\n⛔ Le piège au a) : répondre fausse par réflexe. Une réciproque peut être fausse, mais elle peut aussi être vraie : on la teste.\nRéponse : a) vraie ; b) oui ; c) 96 000 €.",
          micros: ["logique_reciproque", "logique_necessaire_suffisante"],
        },
        {
          enonce:
            "Une comptable sait que : « si une suite géométrique à termes positifs a pour raison 2, alors elle est croissante ». Elle lit la réciproque : « si une suite est croissante, alors c'est une suite géométrique de raison 2 ».\nQuelle suite est un contre-exemple à la réciproque ? Réponds par la lettre.\nA : 5 ; 10 ; 20 ; 40.\nB : 1 ; 4 ; 7 ; 10.\nC : 8 ; 4 ; 2 ; 1.",
          reponses: [{ attendu: "B" }],
          correction:
            "Il faut une suite croissante qui ne soit pas géométrique de raison 2.\nA : elle est croissante, mais de raison 2 : elle vérifie la réciproque.\nB : elle est croissante, et on ajoute 3 à chaque terme : ce n'est pas une suite de raison 2. C'est le contre-exemple.\nC : elle décroît : elle ne vérifie pas le début de la réciproque.\n⛔ Le piège : choisir C. Un contre-exemple doit être croissant, puisque le début de la réciproque le demande.\nRéponse : B.",
          micros: ["logique_contre_exemple", "logique_reciproque"],
        },
        {
          enonce:
            "Une professeure entend : « si deux classes ont la même moyenne, alors elles ont les mêmes notes ». Elle prend deux petits groupes : le groupe A a les notes 8 et 12, le groupe B a les notes 10 et 10.\na) Quelle est la moyenne du groupe A ?\nb) Quelle est la moyenne du groupe B ?\nc) L'affirmation est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: FAUSSE },
          ],
          correction:
            "a) $(8 + 12) \\div 2 = 10$.\nb) $(10 + 10) \\div 2 = 10$.\nc) Même moyenne, mais pas les mêmes notes : ces deux groupes sont un contre-exemple. L'affirmation est fausse.\n⛔ Le piège au c) : chercher d'autres groupes pour vérifier. Un seul contre-exemple suffit.\nRéponse : a) 10 ; b) 10 ; c) fausse.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce:
            "Une journaliste écrit : « deux hausses de 10 % à la suite font toujours une hausse de 20 % ». Elle teste avec une facture d'énergie de 100 € (modèle).\na) Quel est le montant après les deux hausses ?\nb) Quelle est la hausse totale en pourcentage ?\nc) L'affirmation est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [
            { question: "a)", attendu: "121 €" },
            { question: "b)", attendu: "21 %" },
            { question: "c)", attendu: FAUSSE },
          ],
          correction:
            "a) $100 \\times 1{,}1 = 110$, puis $110 \\times 1{,}1 = 121$ €.\nb) Le montant gagne 21 € sur 100 € : 21 %.\nc) 21 % n'est pas 20 % : l'affirmation est fausse.\n⛔ Le piège au b) : additionner $10 + 10$. La seconde hausse porte sur 110 €, pas sur 100 €.\nRéponse : a) 121 € ; b) 21 % ; c) fausse.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce:
            "Une ingénieure lit : « un nombre plus grand a toujours un inverse plus grand ». Elle compare 2 et 4.\na) Quelle est la valeur de l'inverse de 2, soit $\\dfrac{1}{2}$ ?\nb) Quelle est la valeur de l'inverse de 4, soit $\\dfrac{1}{4}$ ?\nc) L'affirmation est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [
            { question: "a)", attendu: "0,5" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: FAUSSE },
          ],
          correction:
            "a) $1 \\div 2 = 0{,}5$.\nb) $1 \\div 4 = 0{,}25$.\nc) 4 est plus grand que 2, mais son inverse est plus petit : l'affirmation est fausse.\n⛔ Le piège au c) : penser qu'il faudrait tester beaucoup de nombres. Ce seul cas suffit.\nRéponse : a) 0,5 ; b) 0,25 ; c) fausse.",
          micros: ["logique_contre_exemple"],
        },
        {
          enonce:
            "Un président de jury classe des conditions. Écris « nécessaire », « suffisante » ou « les deux ».\na) « moyenne ≥ 14 » pour avoir « moyenne ≥ 10 ».\nb) « moyenne ≥ 10 » pour avoir « moyenne ≥ 14 ».\nc) « x = 5 » pour avoir « x + 1 = 6 ».",
          reponses: [
            { question: "a)", attendu: SUFFISANTE },
            { question: "b)", attendu: NECESSAIRE },
            { question: "c)", attendu: LES_DEUX },
          ],
          correction:
            "a) Si la moyenne atteint 14, elle atteint 10 : c'est suffisant. Ce n'est pas nécessaire : 12 convient aussi.\nb) Pour atteindre 14, il faut atteindre 10 : c'est nécessaire. Ce n'est pas suffisant : 12 n'atteint pas 14.\nc) « x = 5 » et « x + 1 = 6 » disent la même chose : l'implication marche dans les deux sens. C'est une équivalence.\n⛔ Le piège au b) : voir les mêmes mots qu'au a) et donner la même réponse. Le sens de la phrase a changé.\nRéponse : a) suffisante ; b) nécessaire ; c) les deux.",
          micros: ["logique_necessaire_suffisante"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une règle, plusieurs cas : on dit ce qu'on peut conclure, et ce qu'on ne peut pas.",
      rappel: [
        "Si « si A alors B » est vrai et que A est vrai, alors B est vrai.",
        "Si « si A alors B » est vrai et que B est faux, alors A est faux : « si non B, alors non A » est toujours vraie en même temps que la phrase de départ. Ce n'est pas la réciproque.",
        "Si B est vrai, on ne peut rien conclure sur A : ce serait utiliser la réciproque.",
      ],
      exercices: [
        {
          titre: "La prime",
          enonce:
            "Une directrice commerciale fixe cette règle : « si un vendeur dépasse 50 000 € de ventes, alors il a une prime ». Certains vendeurs ont une prime pour d'autres raisons.\na) Mia a vendu pour 60 000 €. A-t-elle une prime ? Réponds oui ou non.\nb) Marc n'a pas de prime. A-t-il dépassé 50 000 € ? Réponds oui ou non.\nc) Léa a une prime. Peut-on affirmer qu'elle a dépassé 50 000 € ? Réponds oui ou non.\nd) Pour avoir une prime, « dépasser 50 000 € » est-il une condition nécessaire ou suffisante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: SUFFISANTE },
          ],
          correction:
            "a) Mia vérifie le début de la règle : elle a une prime.\nb) S'il avait dépassé 50 000 €, Marc aurait une prime. Il n'en a pas : il n'a pas dépassé 50 000 €. C'est la contraposée de la règle.\nc) Non : ce serait utiliser la réciproque, et elle est fausse ici.\nd) Dépasser 50 000 € suffit, mais n'est pas nécessaire.\n⛔ Le piège au c) : répondre oui. La règle va dans un seul sens.\nRéponse : a) oui ; b) non ; c) non ; d) suffisante.",
          micros: ["logique_reciproque", "logique_contraposee", "logique_necessaire_suffisante"],
        },
        {
          titre: "L'affirmation du vendeur",
          enonce:
            "Un vendeur affirme à un banquier : « un placement qui gagne 10 % puis perd 10 % revient à son capital de départ ». Le banquier teste avec 2 000 €.\na) Quel est le capital après le gain ?\nb) Quel est le capital à la fin ?\nc) Quel est le coefficient global des deux évolutions, c'est-à-dire le produit de leurs coefficients ?\nd) L'affirmation est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».",
          reponses: [
            { question: "a)", attendu: "2 200 €" },
            { question: "b)", attendu: "1 980 €" },
            { question: "c)", attendu: "0,99" },
            { question: "d)", attendu: FAUSSE },
          ],
          correction:
            "a) $2\\,000 \\times 1{,}1 = 2\\,200$ €.\nb) $2\\,200 \\times 0{,}9 = 1\\,980$ €.\nc) $1{,}1 \\times 0{,}9 = 0{,}99$ : le capital perd 1 %.\nd) Ce seul calcul est un contre-exemple : l'affirmation est fausse.\n⛔ Le piège au d) : dire que +10 % et −10 % s'annulent. Les 10 % de la perte portent sur 2 200 €.\nRéponse : a) 2 200 € ; b) 1 980 € ; c) 0,99 ; d) fausse.",
          micros: ["logique_contre_exemple"],
        },
        {
          titre: "Les paquets du magasin",
          enonce:
            "Un magasinier sait que : « si un nombre d'objets se range par paquets de 6, alors il se range par paquets de 3 ».\na) Parmi 12, 18, 9 et 24 objets, lequel se range par paquets de 3 mais pas par paquets de 6 ? Écris le nombre.\nb) La réciproque, « si un nombre se range par paquets de 3, alors il se range par paquets de 6 », est-elle vraie ou fausse ? Écris « vraie » ou « fausse ».\nc) Pour se ranger par paquets de 6, « se ranger par paquets de 3 » est-il une condition nécessaire ou suffisante ? Écris le mot.\nd) Un lot ne se range pas par paquets de 3. Peut-il se ranger par paquets de 6 ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: FAUSSE },
            { question: "c)", attendu: NECESSAIRE },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $9 = 3 \\times 3$, et $9 \\div 6$ ne tombe pas juste. Les trois autres nombres sont multiples de 6.\nb) 9 est un contre-exemple : la réciproque est fausse.\nc) Pour se ranger par 6, il faut se ranger par 3 : c'est nécessaire. Cela ne suffit pas, comme le montre 9.\nd) Non : c'est la contraposée de la phrase de départ. Si un nombre ne se range pas par paquets de 3, il ne se range pas par paquets de 6.\n⛔ Le piège au b) : tester seulement 12, 18 et 24. Ces cas vérifient la réciproque, mais ne prouvent rien.\nRéponse : a) 9 ; b) fausse ; c) nécessaire ; d) non.",
          micros: ["logique_contre_exemple", "logique_reciproque", "logique_contraposee", "logique_necessaire_suffisante"],
        },
        {
          titre: "Quelle équivalence ?",
          enonce:
            "Une analyste d'assurance relit des phrases avant de les publier.\na) Dans quelle paire peut-on écrire « si et seulement si » ? Réponds par la lettre.\nA : « un prix est multiplié par 1,25 » et « il augmente de 25 % ».\nB : « un nombre est supérieur à 10 » et « il est positif ».\nC : « un nombre est le carré d'un entier » et « il est positif ».\nb) Pour la paire B, parmi 2, 12 et 20, quel nombre montre que l'équivalence est fausse ? Écris-le.\nc) Pour la paire C, parmi 16, 25 et 7, quel nombre montre que l'équivalence est fausse ? Écris-le.",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "7" },
          ],
          correction:
            "a) Pour A, les deux phrases se déduisent l'une de l'autre : c'est une équivalence.\nb) 2 est positif, mais il n'est pas supérieur à 10.\nc) 7 est positif, mais ce n'est pas le carré d'un entier ($2^2 = 4$ et $3^2 = 9$).\n⛔ Le piège au a) : retenir B parce que « si un nombre dépasse 10, il est positif » est vrai. Il faut que cela marche dans les deux sens.\nRéponse : a) A ; b) 2 ; c) 7.",
          micros: ["logique_contre_exemple", "logique_necessaire_suffisante"],
        },
      ],
    },
  ],
};
