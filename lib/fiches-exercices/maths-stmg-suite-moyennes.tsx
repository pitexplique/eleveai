// ─── Fiche d'exercices : moyennes arithmétique et géométrique (STMG, Tle) ──────
//
// Notion suite_moyennes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-terminale.bank.ts`). Le coach demande :
// la demi-somme, le second nombre connaissant la moyenne, la racine du produit,
// POURQUOI on l'emploie pour des taux (elle conserve le produit), et intercaler
// un terme, sur des nombres nus ou sur un capital (« le même pourcentage chaque
// année »). Les racines tombent juste. Rien de plus.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; magasin de sport (vendeuse),
// épargne (Hugo), commerce (commerciale), nature (garde du parc, cigognes), boutique
// en ligne (gérant), formation (formatrice en gestion),
// botanique (botaniste), festival (programmatrice), logement (Maëva, loyer),
// association (trésorière), vente (Yanis, prime), radio (journaliste).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suiteT_moyenne_arithmetique (1, 2, 3, 6, 11, 15, 18, 19),
// suiteT_moyenne_geometrique (4, 5, 6, 13, 14, 15, 18, 20), suiteT_moyenne_intercaler
// (7, 8, 9, 10, 12, 16, 17, 18). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesSuiteMoyennesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-moyennes",
  titre: "Moyenne arithmétique et moyenne géométrique",
  accroche:
    "Vingt exercices pour ne plus confondre les deux moyennes : la demi-somme quand on ajoute la même chose, la racine du produit quand on applique le même pourcentage. Calculer, retrouver un nombre manquant, intercaler un terme, comprendre pourquoi un +100 % suivi d'un −50 % ne fait pas +25 %. Un loyer, des cigognes, une prime de vente, l'audience d'une radio. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : additionner et diviser par 2, ou multiplier et prendre la racine.",
      rappel: [
        "Moyenne arithmétique de $a$ et $b$ : leur demi-somme, $\\dfrac{a + b}{2}$. Si la moyenne vaut $m$, alors $a + b = 2m$.",
        "Moyenne géométrique de deux nombres positifs : la racine de leur produit, $\\sqrt{a \\times b}$.",
        "Entre deux termes d'une suite arithmétique, on intercale la moyenne arithmétique.",
        "Entre deux termes d'une suite géométrique, on intercale la moyenne géométrique.",
      ],
      exercices: [
        {
          enonce: "Quelle est la moyenne arithmétique de 18 et 46 ?",
          reponses: [{ attendu: "32" }],
          correction:
            "On additionne, puis on divise par 2.\n$\\dfrac{18 + 46}{2} = \\dfrac{64}{2} = 32$.\n⛔ Le piège : oublier de diviser par 2 et répondre 64.\nRéponse : 32.",
          micros: ["suiteT_moyenne_arithmetique"],
        },
        {
          enonce: "Quelle est la moyenne arithmétique de 7 et 12 ?",
          reponses: [{ attendu: "9,5" }],
          correction:
            "$\\dfrac{7 + 12}{2} = \\dfrac{19}{2} = 9{,}5$.\n⛔ Le piège : arrondir à 10. La moyenne de deux entiers n'est pas toujours un entier, et 9,5 est exactement au milieu.\nRéponse : 9,5.",
          micros: ["suiteT_moyenne_arithmetique"],
        },
        {
          enonce: "La moyenne arithmétique de 24 et d'un second nombre vaut 40. Quel est ce second nombre ?",
          reponses: [{ attendu: "56" }],
          correction:
            "On multiplie la moyenne par 2 pour obtenir la somme : $2 \\times 40 = 80$.\nOn retranche le nombre connu : $80 - 24 = 56$.\nVérification : $\\dfrac{24 + 56}{2} = 40$. ✔\n⛔ Le piège : retrancher 24 à la moyenne ($40 - 24 = 16$). C'est à la SOMME qu'on retranche.\nRéponse : 56.",
          micros: ["suiteT_moyenne_arithmetique"],
        },
        {
          enonce: "Quelle est la moyenne géométrique de 4 et 25 ?",
          reponses: [{ attendu: "10" }],
          correction:
            "On multiplie, puis on prend la racine carrée.\n$\\sqrt{4 \\times 25} = \\sqrt{100} = 10$.\n⛔ Le piège : calculer la demi-somme, 14,5. C'est la moyenne arithmétique.\nRéponse : 10.",
          micros: ["suiteT_moyenne_geometrique"],
        },
        {
          enonce: "Quelle est la moyenne géométrique de 3 et 48 ?",
          reponses: [{ attendu: "12" }],
          correction:
            "$\\sqrt{3 \\times 48} = \\sqrt{144} = 12$.\n⛔ Le piège : s'arrêter au produit, 144. Il reste à prendre la racine.\nRéponse : 12.",
          micros: ["suiteT_moyenne_geometrique"],
        },
        {
          enonce: "On prend les nombres 2 et 18.\na) Quelle est leur moyenne arithmétique ?\nb) Quelle est leur moyenne géométrique ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) $\\dfrac{2 + 18}{2} = 10$.\nb) $\\sqrt{2 \\times 18} = \\sqrt{36} = 6$.\n⛔ Le piège : croire que les deux moyennes donnent la même chose. La moyenne géométrique est plus petite.\nRéponse : a) 10 ; b) 6.",
          micros: ["suiteT_moyenne_arithmetique", "suiteT_moyenne_geometrique"],
        },
        {
          enonce: "Quel nombre faut-il intercaler entre 16 et 30 pour obtenir trois termes consécutifs d'une suite arithmétique ?",
          reponses: [{ attendu: "23" }],
          correction:
            "Suite arithmétique : on intercale la moyenne arithmétique.\n$\\dfrac{16 + 30}{2} = 23$.\nVérification : $23 - 16 = 7$ et $30 - 23 = 7$. ✔\n⛔ Le piège : donner l'écart, $30 - 16 = 14$. Ce n'est pas le terme du milieu.\nRéponse : 23.",
          micros: ["suiteT_moyenne_intercaler"],
        },
        {
          enonce: "Quel nombre faut-il intercaler entre 5 et 20 pour obtenir trois termes consécutifs d'une suite géométrique ?",
          reponses: [{ attendu: "10" }],
          correction:
            "Suite géométrique : on intercale la moyenne géométrique.\n$\\sqrt{5 \\times 20} = \\sqrt{100} = 10$.\nVérification : $10 \\div 5 = 2$ et $20 \\div 10 = 2$. ✔\n⛔ Le piège : prendre la demi-somme, 12,5. Elle ne donne pas le même quotient : $12{,}5 \\div 5 = 2{,}5$ et $20 \\div 12{,}5 = 1{,}6$.\nRéponse : 10.",
          micros: ["suiteT_moyenne_intercaler"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : décider d'abord si l'on ajoute ou si l'on multiplie, puis choisir la moyenne.",
      rappel: [
        "« La même quantité ajoutée » : suite arithmétique, demi-somme. « Le même pourcentage » : suite géométrique, racine du produit.",
        "La moyenne arithmétique conserve la SOMME : $m + m = a + b$. La moyenne géométrique conserve le PRODUIT : $m \\times m = a \\times b$.",
        "Des évolutions successives se multiplient : le coefficient moyen de deux évolutions est donc la moyenne géométrique de leurs coefficients.",
      ],
      exercices: [
        {
          enonce:
            "Une vendeuse d'un magasin de sport note ses ventes de vélos : 120 en janvier et 180 en mars, avec la même augmentation (en nombre de vélos) chaque mois. Combien en a-t-elle vendu en février ?",
          reponses: [{ attendu: "150" }],
          correction:
            "« La même augmentation en nombre » : on ajoute la même chose, suite arithmétique.\nFévrier est au milieu : $\\dfrac{120 + 180}{2} = 150$.\nVérification : $+30$ puis $+30$. ✔\n⛔ Le piège : prendre la racine du produit par réflexe. Ici, rien ne parle de pourcentage.\nRéponse : 150 vélos.",
          micros: ["suiteT_moyenne_intercaler"],
        },
        {
          enonce:
            "Sur un livret, le capital de Hugo passe de 2 000 € à 2 880 € en deux ans, avec le même pourcentage d'augmentation chaque année.\na) Quel était le capital au bout d'un an ?\nb) Quel est le coefficient annuel ?",
          reponses: [
            { question: "a)", attendu: "2 400 €" },
            { question: "b)", attendu: "1,2" },
          ],
          correction:
            "a) « Le même pourcentage » : suite géométrique, moyenne géométrique.\n$\\sqrt{2\\,000 \\times 2\\,880} = \\sqrt{5\\,760\\,000} = 2\\,400$ €.\nb) $2\\,400 \\div 2\\,000 = 1{,}2$, et $2\\,880 \\div 2\\,400 = 1{,}2$. ✔\n⛔ Le piège au a) : la demi-somme donne 2 440 €, soit 40 € de trop. Elle décrit des ajouts égaux, pas un pourcentage.\nRéponse : a) 2 400 € ; b) 1,2.",
          micros: ["suiteT_moyenne_intercaler"],
        },
        {
          enonce:
            "Une commerciale a réalisé 64 k€ de ventes en mai. Sa moyenne sur mai et juin doit atteindre 80 k€. Combien doit-elle réaliser en juin ?",
          reponses: [{ attendu: ["96", "96 k€"] }],
          correction:
            "La somme des deux mois doit valoir $2 \\times 80 = 160$ k€.\n$160 - 64 = 96$ k€.\nVérification : $\\dfrac{64 + 96}{2} = 80$. ✔\n⛔ Le piège : calculer $80 - 64 = 16$ et répondre 16 k€. Ce serait une chute des ventes, et la moyenne tomberait à 40 k€.\nRéponse : 96 k€.",
          micros: ["suiteT_moyenne_arithmetique"],
        },
        {
          enonce:
            "Un garde de parc naturel compte 500 cigognes une année, puis 720 deux ans plus tard (situation fictive). Il suppose le même pourcentage de hausse chaque année.\na) Combien y en avait-il l'année du milieu ?\nb) Quel est le coefficient annuel ?\nc) Quel est le pourcentage de hausse annuel ?",
          reponses: [
            { question: "a)", attendu: "600" },
            { question: "b)", attendu: "1,2" },
            { question: "c)", attendu: "20 %" },
          ],
          correction:
            "a) $\\sqrt{500 \\times 720} = \\sqrt{360\\,000} = 600$.\nb) $600 \\div 500 = 1{,}2$.\nc) $1{,}2 = 1 + 0{,}2$ : la hausse est de 20 % par an.\n⛔ Le piège au a) : la demi-somme, 610. Elle suppose le même nombre de cigognes en plus chaque année, pas le même pourcentage.\nRéponse : a) 600 ; b) 1,2 ; c) 20 %.",
          micros: ["suiteT_moyenne_intercaler"],
        },
        {
          enonce:
            "Le chiffre d'affaires de la boutique en ligne d'un gérant augmente de 60 % la première année, puis baisse de 10 % la deuxième.\na) Quel est le coefficient global sur les deux ans ?\nb) Quel est le coefficient moyen annuel ?\nc) Quel est le taux moyen annuel, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "1,44" },
            { question: "b)", attendu: "1,2" },
            { question: "c)", attendu: "20 %" },
          ],
          correction:
            "a) Les coefficients sont 1,6 et 0,9. Ils se multiplient : $1{,}6 \\times 0{,}9 = 1{,}44$.\nb) La moyenne géométrique des deux coefficients : $\\sqrt{1{,}6 \\times 0{,}9} = \\sqrt{1{,}44} = 1{,}2$.\nc) $1{,}2 = 1 + 0{,}2$ : soit +20 % par an.\nVérification : $1{,}2 \\times 1{,}2 = 1{,}44$. ✔\n⛔ Le piège au c) : faire la moyenne de 60 et de −10, soit +25 %. Or $1{,}25 \\times 1{,}25 = 1{,}5625$, ce n'est pas 1,44.\nRéponse : a) 1,44 ; b) 1,2 ; c) 20 %.",
          micros: ["suiteT_moyenne_geometrique"],
        },
        {
          enonce:
            "Une formatrice en gestion prend les nombres 2 et 50.\na) Quelle est leur moyenne géométrique ?\nb) Quelle est leur moyenne arithmétique ?\nc) Que vaut le carré de la moyenne géométrique ?\nd) Pourquoi utilise-t-on la moyenne géométrique pour des taux d'évolution ? Réponds par la lettre.\nA : Parce qu'elle est plus petite, donc plus prudente.\nB : Parce qu'elle conserve le produit, et que deux évolutions successives se multiplient.\nC : Parce qu'elle est plus simple à calculer.",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "26" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "a) $\\sqrt{2 \\times 50} = \\sqrt{100} = 10$.\nb) $\\dfrac{2 + 50}{2} = 26$.\nc) $10 \\times 10 = 100 = 2 \\times 50$ : le produit est conservé.\nd) La bonne raison est B. Avec la moyenne arithmétique, $26 \\times 26 = 676$ : on est loin de 100.\n⛔ Le piège au d) : choisir A. Elle est en effet plus petite, mais c'est une conséquence, pas la raison.\nRéponse : a) 10 ; b) 26 ; c) 100 ; d) B.",
          micros: ["suiteT_moyenne_geometrique"],
        },
        {
          enonce:
            "Une botaniste mesure une plante à 8 cm, 12 cm puis 18 cm, à une semaine d'intervalle.\na) Quelle est la moyenne arithmétique de 8 et 18 ?\nb) Quelle est la moyenne géométrique de 8 et 18 ?\nc) La mesure du milieu correspond à laquelle ? Réponds arithmétique ou géométrique.",
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: ["géométrique", "géométriques", "la géométrique", "moyenne géométrique", "la moyenne géométrique"] },
          ],
          correction:
            "a) $\\dfrac{8 + 18}{2} = 13$.\nb) $\\sqrt{8 \\times 18} = \\sqrt{144} = 12$.\nc) La mesure du milieu est 12 : c'est la moyenne géométrique. La plante est multipliée chaque semaine par 1,5.\n⛔ Le piège au c) : répondre arithmétique parce que 12 est « à peu près » au milieu. Le vrai milieu serait 13.\nRéponse : a) 13 ; b) 12 ; c) géométrique.",
          micros: ["suiteT_moyenne_arithmetique", "suiteT_moyenne_geometrique"],
        },
        {
          enonce:
            "Une programmatrice de festival a vendu 9 000 billets la première année et 49 000 la troisième. Quel a été le nombre de billets la deuxième année ?\na) Si l'on ajoute le même nombre de billets chaque année.\nb) Si l'on augmente du même pourcentage chaque année.",
          reponses: [
            { question: "a)", attendu: "29 000" },
            { question: "b)", attendu: "21 000" },
          ],
          correction:
            "a) Suite arithmétique : $\\dfrac{9\\,000 + 49\\,000}{2} = 29\\,000$.\nb) Suite géométrique : $\\sqrt{9\\,000 \\times 49\\,000} = \\sqrt{441\\,000\\,000} = 21\\,000$.\n⛔ Le piège : donner la même réponse aux deux. C'est l'hypothèse sur la croissance qui décide de la moyenne.\nRéponse : a) 29 000 ; b) 21 000.",
          micros: ["suiteT_moyenne_intercaler"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on choisit la moyenne, on calcule, on vérifie, on compare.",
      rappel: [
        "On vérifie un terme intercalé en recalculant les deux écarts (arithmétique) ou les deux quotients (géométrique).",
        "Pour poursuivre une suite géométrique, on multiplie encore par le coefficient ; pour une suite arithmétique, on ajoute encore l'écart.",
        "Faire la moyenne de deux pourcentages donne un résultat faux : on passe par les coefficients.",
      ],
      exercices: [
        {
          titre: "Le loyer de Maëva",
          enonce:
            "Le loyer de Maëva passe de 800 € à 968 € en deux ans, avec le même pourcentage de hausse chaque année.\na) Quel était son loyer au bout d'un an ?\nb) Quel est le coefficient annuel ?\nc) Quel est le pourcentage de hausse annuel ?\nd) Quelle serait la valeur de la demi-somme ? De combien dépasse-t-elle le bon loyer ? Donne les deux nombres dans cet ordre, séparés par un point-virgule.",
          reponses: [
            { question: "a)", attendu: "880 €" },
            { question: "b)", attendu: "1,1" },
            { question: "c)", attendu: "10 %" },
            { question: "d)", attendu: "884 ; 4", ordre: true },
          ],
          correction:
            "a) $\\sqrt{800 \\times 968} = \\sqrt{774\\,400} = 880$ €.\nb) $880 \\div 800 = 1{,}1$, et $968 \\div 880 = 1{,}1$. ✔\nc) $1{,}1 = 1 + 0{,}1$ : soit 10 % par an.\nd) $\\dfrac{800 + 968}{2} = 884$, et $884 - 880 = 4$ €.\n⛔ Le piège : croire qu'une hausse de 168 € en deux ans fait 84 € par an. La hausse de la deuxième année est plus forte que celle de la première : 80 € puis 88 €.\nRéponse : a) 880 € ; b) 1,1 ; c) 10 % ; d) 884 ; 4.",
          micros: ["suiteT_moyenne_intercaler"],
        },
        {
          titre: "L'association en deux scénarios",
          enonce:
            "La trésorière d'une association compte 200 adhérents en 2022 et 450 en 2024. Elle ne connaît pas le chiffre de 2023 et veut prévoir 2025 (scénarios fictifs).\na) Scénario 1, même pourcentage chaque année : combien d'adhérents en 2023 ?\nb) Quel est le coefficient annuel de ce scénario ?\nc) Quelle est la prévision pour 2025 dans ce scénario ?\nd) Scénario 2, même nombre d'adhérents en plus chaque année : combien en 2023 ?\ne) Quelle est la prévision pour 2025 dans ce scénario ?",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "1,5" },
            { question: "c)", attendu: "675" },
            { question: "d)", attendu: "325" },
            { question: "e)", attendu: "575" },
          ],
          correction:
            "a) $\\sqrt{200 \\times 450} = \\sqrt{90\\,000} = 300$.\nb) $300 \\div 200 = 1{,}5$.\nc) On multiplie encore par 1,5 : $450 \\times 1{,}5 = 675$.\nd) $\\dfrac{200 + 450}{2} = 325$. On ajoute donc 125 par an.\ne) $450 + 125 = 575$.\n⛔ Le piège au c) : ajouter 125 alors qu'on est dans le scénario du pourcentage. Chaque scénario se poursuit avec sa propre règle.\nRéponse : a) 300 ; b) 1,5 ; c) 675 ; d) 325 ; e) 575.",
          micros: ["suiteT_moyenne_intercaler", "suiteT_moyenne_arithmetique", "suiteT_moyenne_geometrique"],
        },
        {
          titre: "La prime de Yanis",
          enonce:
            "Yanis touche une prime si la moyenne de ses ventes sur deux mois atteint au moins 70 k€. En septembre, il a vendu 58 k€.\na) Combien doit-il vendre au minimum en octobre ?\nb) Finalement, il vend 90 k€ en octobre. Quelle est sa moyenne ?\nc) Touche-t-il la prime ? Réponds oui ou non.\nd) Si la moyenne visée passait à 75 k€, combien lui aurait-il fallu en octobre ?",
          reponses: [
            { question: "a)", attendu: ["82", "82 k€"] },
            { question: "b)", attendu: ["74", "74 k€"] },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: ["92", "92 k€"] },
          ],
          correction:
            "a) La somme doit atteindre $2 \\times 70 = 140$ k€. $140 - 58 = 82$ k€.\nb) $\\dfrac{58 + 90}{2} = 74$ k€.\nc) 74 est plus grand que 70 : il touche la prime.\nd) $2 \\times 75 = 150$, et $150 - 58 = 92$ k€.\n⛔ Le piège au a) : calculer $70 - 58 = 12$ et croire qu'il suffit de 12 k€ de plus. Il faut compenser le retard de septembre : $70 + 12 = 82$.\nRéponse : a) 82 k€ ; b) 74 k€ ; c) oui ; d) 92 k€.",
          micros: ["suiteT_moyenne_arithmetique"],
        },
        {
          titre: "La phrase de la journaliste",
          enonce:
            "L'audience d'une petite radio passe de 4 000 à 8 000 auditeurs en un an, soit +100 %, puis retombe à 4 000 l'année suivante, soit −50 % (situation fictive). Une journaliste écrit : « en moyenne, +25 % par an ».\na) Donne les deux coefficients, dans l'ordre, séparés par un point-virgule.\nb) Quel est le coefficient global sur les deux ans ?\nc) Quel est le coefficient moyen annuel (moyenne géométrique) ?\nd) Quel coefficient donne la moyenne arithmétique ?\ne) La phrase de la journaliste est-elle vraie ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "2 ; 0,5", ordre: true },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "1" },
            { question: "d)", attendu: "1,25" },
            { question: "e)", attendu: ["faux", "fausse", "non"] },
          ],
          correction:
            "a) +100 % donne 2, −50 % donne 0,5.\nb) $2 \\times 0{,}5 = 1$ : l'audience est revenue au point de départ.\nc) $\\sqrt{2 \\times 0{,}5} = \\sqrt{1} = 1$ : pas de hausse en moyenne.\nd) $\\dfrac{2 + 0{,}5}{2} = 1{,}25$ : c'est le +25 % de la journaliste.\ne) Faux. Deux ans à +25 % donneraient $4\\,000 \\times 1{,}25 \\times 1{,}25 = 6\\,250$ auditeurs, et non 4 000.\n⛔ Le piège : faire la moyenne de deux pourcentages. Les évolutions se multiplient : la moyenne qui leur convient est la géométrique.\nRéponse : a) 2 ; 0,5 ; b) 1 ; c) 1 ; d) 1,25 ; e) faux.",
          micros: ["suiteT_moyenne_geometrique"],
        },
      ],
    },
  ],
};
