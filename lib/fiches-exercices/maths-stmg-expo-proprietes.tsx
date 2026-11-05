// ─── Fiche d'exercices : propriétés algébriques de aˣ (STMG, Tle) — 20 exercices
//
// Notion expo_proprietes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts`). Le coach demande :
// produit (on additionne les exposants), quotient (on soustrait), puissance de
// puissance (on multiplie), l'exposant manquant, l'erreur à diagnostiquer
// (« il a divisé les exposants »), et l'enchaînement, y compris avec un x qui
// disparaît. Toujours la même base a, jamais de nombre e.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8 et 16) ; épargne (Anaïs),
// fromagerie (microbiologiste), énergie (fournisseur d'électricité), cinéma
// (programmatrice), réseaux sociaux (community manager), voile (présidente de
// club), acoustique (ingénieur du son), immobilier (agent immobilier), informatique
// (ingénieure réseau), médecine du sport (médecin), enseignement (professeure qui
// corrige une copie).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-exponentielle.mjs`.
//
// Micro-compétences : expoT_somme_exposants (1, 2, 9, 12, 13, 17),
// expoT_difference_exposants (3, 4, 10, 14, 17, 18), expoT_puissance_exposant (5, 6,
// 11, 15, 16, 18, 19), expoT_transformer (7, 8, 16, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesExpoProprietesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "expo-proprietes",
  titre: "Propriétés algébriques de aˣ",
  accroche:
    "Vingt exercices pour ne plus confondre les trois règles : un produit additionne les exposants, un quotient les soustrait, une puissance de puissance les multiplie. Un placement sur plusieurs années, des levures en fromagerie, un prix de l'électricité, une vidéo qui circule, des adresses informatiques, et une copie à corriger. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : garder la base et choisir la bonne opération sur les exposants.",
      rappel: [
        "Un PRODUIT de puissances de même base : on additionne les exposants. $a^x \\times a^y = a^{x+y}$.",
        "Un QUOTIENT de puissances de même base : on soustrait les exposants. $\\dfrac{a^x}{a^y} = a^{x-y}$.",
        "Une PUISSANCE de puissance : on multiplie les exposants. $\\left(a^x\\right)^n = a^{nx}$.",
      ],
      exercices: [
        {
          enonce: "Écris $1{,}5^3 \\times 1{,}5^4$ sous la forme d'une seule puissance de 1,5.",
          reponses: [{ attendu: ["1,5^7", "(1,5)^7"], exact: true }],
          correction:
            "C'est un produit de puissances de même base : on garde la base et on additionne les exposants.\n$1{,}5^3 \\times 1{,}5^4 = 1{,}5^{3+4} = 1{,}5^7$.\n⛔ Le piège : multiplier les exposants et écrire $1{,}5^{12}$. On multiplie les exposants seulement pour une puissance de puissance.\nRéponse : $1{,}5^7$.",
          micros: ["expoT_somme_exposants"],
        },
        {
          enonce: "Complète : $1{,}2^5 \\times 1{,}2^{\\square} = 1{,}2^{13}$. Quel exposant manque ?",
          reponses: [{ attendu: "8" }],
          correction:
            "Les exposants s'additionnent : $5 + \\square = 13$.\nCelui qui manque est la différence : $13 - 5 = 8$.\nVérification : $1{,}2^5 \\times 1{,}2^8 = 1{,}2^{13}$. ✔\n⛔ Le piège : additionner $5 + 13 = 18$. Le 13 est déjà le total.\nRéponse : 8.",
          micros: ["expoT_somme_exposants"],
        },
        {
          enonce: "Écris $\\dfrac{3^9}{3^2}$ sous la forme d'une seule puissance de 3.",
          reponses: [{ attendu: "3^7", exact: true }],
          correction:
            "C'est un quotient de puissances de même base : on soustrait l'exposant du bas à celui du haut.\n$\\dfrac{3^9}{3^2} = 3^{9-2} = 3^7$.\n⛔ Le piège : diviser les exposants et écrire $3^{4{,}5}$. La division se lit sur les puissances ; sur les exposants, elle devient une soustraction.\nRéponse : $3^7$.",
          micros: ["expoT_difference_exposants"],
        },
        {
          enonce:
            "Un élève écrit : $\\dfrac{4^{10}}{4^4} = 4^{2{,}5}$.\na) Son calcul est-il juste ? Réponds oui ou non.\nb) Écris le bon résultat sous la forme d'une seule puissance de 4.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "4^6", exact: true },
          ],
          correction:
            "a) Non : il a divisé les exposants ($10 \\div 4 = 2{,}5$) au lieu de les soustraire.\nb) $\\dfrac{4^{10}}{4^4} = 4^{10-4} = 4^6$.\n⛔ Le piège : croire qu'un quotient divise tout. Sur les exposants, on soustrait.\nRéponse : a) non ; b) $4^6$.",
          micros: ["expoT_difference_exposants"],
        },
        {
          enonce: "Écris $\\left(1{,}2^3\\right)^4$ sous la forme d'une seule puissance de 1,2.",
          reponses: [{ attendu: ["1,2^12", "(1,2)^12"], exact: true }],
          correction:
            "C'est une puissance de puissance : on multiplie les exposants.\n$\\left(1{,}2^3\\right)^4 = 1{,}2^{3 \\times 4} = 1{,}2^{12}$.\n⛔ Le piège : additionner et écrire $1{,}2^7$. C'est la règle du produit, pas celle de la puissance de puissance.\nRéponse : $1{,}2^{12}$.",
          micros: ["expoT_puissance_exposant"],
        },
        {
          enonce: "On sait que $\\left(0{,}8^x\\right)^3 = 0{,}8^{12}$. Que vaut $x$ ?",
          reponses: [{ attendu: "4" }],
          correction:
            "Les exposants se multiplient : $3x = 12$.\nOn isole $x$ par une division : $x = 12 \\div 3 = 4$.\nVérification : $\\left(0{,}8^4\\right)^3 = 0{,}8^{12}$. ✔\n⛔ Le piège : soustraire et répondre 9. Ici, l'opération sur les exposants est une multiplication.\nRéponse : $x = 4$.",
          micros: ["expoT_puissance_exposant"],
        },
        {
          enonce: "Simplifie $\\dfrac{1{,}05^4 \\times 1{,}05^5}{1{,}05^2}$ sous la forme d'une seule puissance de 1,05.",
          reponses: [{ attendu: ["1,05^7", "(1,05)^7"], exact: true }],
          correction:
            "D'abord le numérateur : $1{,}05^4 \\times 1{,}05^5 = 1{,}05^9$.\nPuis le quotient : $\\dfrac{1{,}05^9}{1{,}05^2} = 1{,}05^{9-2} = 1{,}05^7$.\n⛔ Le piège : tout additionner ($4 + 5 + 2 = 11$). L'exposant du dénominateur se soustrait.\nRéponse : $1{,}05^7$.",
          micros: ["expoT_transformer"],
        },
        {
          enonce: "Simplifie $\\dfrac{2^{x+5}}{2^{x+2}}$ sous la forme d'une seule puissance de 2.",
          reponses: [{ attendu: "2^3", exact: true }],
          correction:
            "On soustrait les exposants : $(x + 5) - (x + 2) = x - x + 5 - 2 = 3$.\nDonc $\\dfrac{2^{x+5}}{2^{x+2}} = 2^3$ : le résultat ne dépend plus de $x$.\n⛔ Le piège : garder un $x$ et écrire $2^{x+3}$. Les deux $x$ se compensent.\nRéponse : $2^3$.",
          micros: ["expoT_transformer"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : écrire le calcul avec une seule puissance, puis le faire à la calculatrice.",
      rappel: [
        "Deux périodes qui s'enchaînent : les coefficients se multiplient, donc les exposants s'ajoutent. $1{,}03^2 \\times 1{,}03^5 = 1{,}03^7$.",
        "Comparer deux dates : on divise, donc on soustrait les exposants. Un exposant négatif se traite de la même façon : $7^6 \\times 7^{-4} = 7^{6-4}$.",
        "Répéter un même bloc : c'est une puissance de puissance. Quatre blocs de cinq ans : $\\left(a^5\\right)^4 = a^{20}$.",
      ],
      exercices: [
        {
          enonce:
            "Anaïs place 2 000 € à 5 % par an (modèle). Le coefficient sur 3 ans est $1{,}05^3$, puis celui des 4 années suivantes est $1{,}05^4$.\na) Écris le coefficient sur toute la durée sous la forme d'une seule puissance.\nb) Calcule le capital à la fin de cette durée, arrondi à l'euro.",
          reponses: [
            { question: "a)", attendu: ["1,05^7", "(1,05)^7"], exact: true },
            { question: "b)", attendu: "2 814 €", tolerance: 0.5 },
          ],
          correction:
            "a) Les périodes s'enchaînent : $1{,}05^3 \\times 1{,}05^4 = 1{,}05^{3+4} = 1{,}05^7$.\nb) $2\\,000 \\times 1{,}05^7 \\approx 2\\,814$ €.\n⛔ Le piège au a) : écrire $1{,}05^{12}$ en multipliant 3 par 4. Il n'y a que 7 ans.\nRéponse : a) $1{,}05^7$ ; b) environ 2 814 €.",
          micros: ["expoT_somme_exposants"],
        },
        {
          enonce:
            "Une microbiologiste de fromagerie suit des levures dont le nombre double chaque heure (modèle). Au bout de $x$ heures, ce nombre est proportionnel à $2^x$.\na) Le rapport entre le nombre de levures à la 10e heure et celui à la 4e heure est $\\dfrac{2^{10}}{2^4}$. Écris-le sous la forme d'une seule puissance de 2.\nb) Par combien le nombre de levures a-t-il été multiplié entre ces deux heures ?",
          reponses: [
            { question: "a)", attendu: "2^6", exact: true },
            { question: "b)", attendu: "64", exact: true },
          ],
          correction:
            "a) Un quotient de puissances : $\\dfrac{2^{10}}{2^4} = 2^{10-4} = 2^6$.\nb) $2^6 = 64$ : il s'est écoulé 6 heures, soit 6 doublements.\n⛔ Le piège au a) : diviser les exposants et écrire $2^{2{,}5}$. Entre la 4e et la 10e heure, il y a 6 heures, pas 2,5.\nRéponse : a) $2^6$ ; b) 64.",
          micros: ["expoT_difference_exposants"],
        },
        {
          enonce:
            "Un fournisseur prévoit une hausse de l'électricité de 8 % par an (modèle). Sur 2 ans, le coefficient est $1{,}08^2$.\na) Écris le coefficient sur 3 fois 2 ans, $\\left(1{,}08^2\\right)^3$, sous la forme d'une seule puissance.\nb) Calcule ce coefficient, arrondi au millième.\nc) Quelle est la hausse totale, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: ["1,08^6", "(1,08)^6"], exact: true },
            { question: "b)", attendu: "1,587", tolerance: 0.0005 },
            { question: "c)", attendu: "58,7 %", tolerance: 0.05 },
          ],
          correction:
            "a) Une puissance de puissance : $\\left(1{,}08^2\\right)^3 = 1{,}08^{2 \\times 3} = 1{,}08^6$.\nb) À la calculatrice : $1{,}08^6 \\approx 1{,}587$.\nc) On retire 1 au coefficient : $1{,}587 - 1 = 0{,}587$, soit 58,7 %.\n⛔ Le piège au c) : compter $6 \\times 8 = 48$ %. Les hausses se multiplient, elles ne s'additionnent pas.\nRéponse : a) $1{,}08^6$ ; b) environ 1,587 ; c) environ 58,7 %.",
          micros: ["expoT_puissance_exposant"],
        },
        {
          enonce:
            "La programmatrice d'un cinéma part de 5 000 entrées par mois. Ce nombre est multiplié par 1,1 chaque mois (modèle).\na) Complète : $1{,}1^4 \\times 1{,}1^{\\square} = 1{,}1^{12}$. Quel exposant manque ?\nb) Calcule le nombre d'entrées mensuelles au bout de 12 mois, arrondi à l'unité.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "15 692", tolerance: 0.5 },
          ],
          correction:
            "a) Les exposants s'additionnent : $4 + \\square = 12$, donc $\\square = 8$. Après 4 mois, il reste 8 mois.\nb) $5\\,000 \\times 1{,}1^{12} \\approx 15\\,692$ entrées.\n⛔ Le piège au a) : calculer $12 \\div 4 = 3$. C'est un produit de puissances : l'exposant manquant se trouve par une soustraction.\nRéponse : a) 8 ; b) environ 15 692.",
          micros: ["expoT_somme_exposants"],
        },
        {
          enonce:
            "Un community manager observe une vidéo dont le nombre de vues est multiplié par 3 chaque jour (situation fictive), soit une évolution en $3^x$, avec $x$ en jours.\na) Complète : $3^{x+2} = 3^x \\times 3^{\\square}$. Quel exposant manque ?\nb) Calcule le nombre par lequel on multiplie les vues en 2 jours.\nc) La vidéo a 500 vues aujourd'hui. Combien en aura-t-elle dans 2 jours ?",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "9", exact: true },
            { question: "c)", attendu: "4 500" },
          ],
          correction:
            "a) La règle du produit, à l'envers : $3^{x+2} = 3^x \\times 3^2$.\nb) $3^2 = 9$.\nc) $500 \\times 9 = 4\\,500$ vues.\n⛔ Le piège au b) : confondre $3^{x+2}$ avec $3^x + 2$, et ajouter 2 vues. Un $+2$ dans l'exposant multiplie.\nRéponse : a) 2 ; b) 9 ; c) 4 500 vues.",
          micros: ["expoT_somme_exposants"],
        },
        {
          enonce:
            "La présidente d'un club de voile compte 800 adhérents. Leur nombre est multiplié par 1,25 chaque année (modèle).\na) Complète : $1{,}25^{x-3} = \\dfrac{1{,}25^x}{1{,}25^{\\square}}$. Quel exposant manque ?\nb) Calcule $1{,}25^3$.\nc) Combien y avait-il d'adhérents il y a 3 ans ? Arrondis à l'unité.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "1,953125", exact: true },
            { question: "c)", attendu: "410", tolerance: 0.5 },
          ],
          correction:
            "a) La règle du quotient : $1{,}25^{x-3} = \\dfrac{1{,}25^x}{1{,}25^3}$.\nb) $1{,}25^3 = 1{,}953125$.\nc) Trois ans en arrière, on divise : $800 \\div 1{,}953125 = 409{,}6$, soit environ 410 adhérents.\n⛔ Le piège au c) : retirer 3 fois 25 %, ce qui donne 200 adhérents. Remonter le temps, c'est diviser par le coefficient.\nRéponse : a) 3 ; b) 1,953125 ; c) environ 410.",
          micros: ["expoT_difference_exposants"],
        },
        {
          enonce:
            "Un ingénieur du son teste des panneaux : chaque panneau laisse passer une fraction 0,5 du son (modèle). Une paroi contient 2 panneaux, soit $0{,}5^2$, et le studio a 3 parois à la suite.\na) Écris $\\left(0{,}5^2\\right)^3$ sous la forme d'une seule puissance de 0,5.\nb) Calcule cette valeur.\nc) Écris cette fraction du son en pourcentage.",
          reponses: [
            { question: "a)", attendu: ["0,5^6", "(0,5)^6"], exact: true },
            { question: "b)", attendu: ["0,015625", "1/64"], exact: true },
            { question: "c)", attendu: "1,5625 %", exact: true },
          ],
          correction:
            "a) Une puissance de puissance : $\\left(0{,}5^2\\right)^3 = 0{,}5^{2 \\times 3} = 0{,}5^6$.\nb) $0{,}5^6 = 0{,}015625$, c'est-à-dire $\\dfrac{1}{64}$.\nc) On multiplie par 100 : 1,5625 %.\n⛔ Le piège au a) : additionner et écrire $0{,}5^5$. Le son traverse 6 panneaux en tout, pas 5.\nRéponse : a) $0{,}5^6$ ; b) 0,015625 ; c) 1,5625 %.",
          micros: ["expoT_puissance_exposant"],
        },
        {
          enonce:
            "Écris chaque expression sous la forme d'une seule puissance.\na) $\\left(2^3\\right)^2 \\times 2^4$\nb) $3^5 \\times 3^{-2}$\nc) $\\dfrac{1{,}5^6}{\\left(1{,}5^2\\right)^2}$",
          reponses: [
            { question: "a)", attendu: "2^10", exact: true },
            { question: "b)", attendu: "3^3", exact: true },
            { question: "c)", attendu: ["1,5^2", "(1,5)^2"], exact: true },
          ],
          correction:
            "a) $\\left(2^3\\right)^2 = 2^6$, puis $2^6 \\times 2^4 = 2^{10}$.\nb) $3^5 \\times 3^{-2} = 3^{5-2} = 3^3$.\nc) $\\left(1{,}5^2\\right)^2 = 1{,}5^4$, puis $\\dfrac{1{,}5^6}{1{,}5^4} = 1{,}5^2$.\n⛔ Le piège au a) : additionner tout, $3 + 2 + 4 = 9$. La parenthèse se traite d'abord, par une multiplication.\nRéponse : a) $2^{10}$ ; b) $3^3$ ; c) $1{,}5^2$.",
          micros: ["expoT_puissance_exposant", "expoT_transformer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : traduire la situation en puissances, simplifier, puis calculer à la fin.",
      rappel: [
        "On simplifie d'abord les exposants, on sort la calculatrice ensuite : un seul calcul, donc moins d'erreurs.",
        "Pour une hausse entre deux dates : le coefficient est un quotient de puissances, et la hausse en pourcentage est ce coefficient moins 1.",
        "Une expression compliquée se traite dans l'ordre : parenthèses, produit, puis quotient.",
      ],
      exercices: [
        {
          titre: "Le prix du mètre carré",
          enonce:
            "Un agent immobilier estime un prix à 2 000 € le m², en hausse de 4 % par an (modèle).\na) Le coefficient sur 5 ans, puis sur 3 ans de plus, est $1{,}04^5 \\times 1{,}04^3$. Écris-le sous la forme d'une seule puissance.\nb) Calcule le prix du m² à la fin de cette durée, arrondi à l'euro.\nc) Le coefficient de la 6e année à la fin de la durée est le quotient du coefficient total par $1{,}04^6$. Écris ce quotient sous la forme d'une seule puissance.\nd) Quelle est la hausse sur cette fin de durée, en pourcentage arrondi au dixième ?",
          reponses: [
            { question: "a)", attendu: ["1,04^8", "(1,04)^8"], exact: true },
            { question: "b)", attendu: "2 737 €", tolerance: 0.5 },
            { question: "c)", attendu: ["1,04^2", "(1,04)^2"], exact: true },
            { question: "d)", attendu: "8,2 %", tolerance: 0.05 },
          ],
          correction:
            "a) $1{,}04^{5+3} = 1{,}04^8$.\nb) $2\\,000 \\times 1{,}04^8 \\approx 2\\,737$ €.\nc) $\\dfrac{1{,}04^8}{1{,}04^6} = 1{,}04^{8-6} = 1{,}04^2$.\nd) $1{,}04^2 = 1{,}0816$, et $1{,}0816 - 1 = 0{,}0816$, soit environ 8,2 %.\n⛔ Le piège au d) : compter $2 \\times 4 = 8$ %. Chaque hausse s'applique à une valeur qui a déjà monté.\nRéponse : a) $1{,}04^8$ ; b) environ 2 737 € ; c) $1{,}04^2$ ; d) environ 8,2 %.",
          micros: ["expoT_somme_exposants", "expoT_difference_exposants"],
        },
        {
          titre: "Les adresses du réseau",
          enonce:
            "Une ingénieure réseau sait qu'un code de $x$ bits donne $2^x$ adresses différentes.\na) Écris $\\left(2^{10}\\right)^2$ sous la forme d'une seule puissance de 2.\nb) Calcule cette puissance : c'est le nombre d'adresses d'un code qui a ce nombre de bits.\nc) Écris $\\dfrac{2^{23}}{2^{18}}$ sous la forme d'une seule puissance de 2.\nd) Combien de fois plus d'adresses donnent 23 bits que 18 bits ?",
          reponses: [
            { question: "a)", attendu: "2^20", exact: true },
            { question: "b)", attendu: "1 048 576", exact: true },
            { question: "c)", attendu: "2^5", exact: true },
            { question: "d)", attendu: "32", exact: true },
          ],
          correction:
            "a) $\\left(2^{10}\\right)^2 = 2^{10 \\times 2} = 2^{20}$.\nb) $2^{20} = 1\\,048\\,576$ adresses.\nc) $\\dfrac{2^{23}}{2^{18}} = 2^{23-18} = 2^5$.\nd) $2^5 = 32$ : cinq bits de plus, c'est 32 fois plus d'adresses.\n⛔ Le piège au a) : écrire $2^{12}$ en additionnant 10 et 2. Une puissance de puissance multiplie les exposants.\nRéponse : a) $2^{20}$ ; b) 1 048 576 ; c) $2^5$ ; d) 32 fois.",
          micros: ["expoT_puissance_exposant", "expoT_difference_exposants"],
        },
        {
          titre: "La caféine dans le sang",
          enonce:
            "Une médecin du sport explique à un athlète que la quantité de caféine dans son sang est divisée par 2 toutes les 5 heures (modèle). Au bout de $x$ périodes de 5 heures, il reste la fraction $0{,}5^x$ de la dose.\na) Simplifie $\\dfrac{0{,}5^{x+1}}{0{,}5^x}$. Donne un nombre.\nb) Écris $\\left(0{,}5^2\\right)^2$ sous la forme d'une seule puissance de 0,5.\nc) Calcule cette valeur.\nd) Écris cette fraction de la dose en pourcentage.\ne) Au bout de combien d'heures reste-t-il cette fraction de la dose ?",
          reponses: [
            { question: "a)", attendu: "0,5" },
            { question: "b)", attendu: ["0,5^4", "(0,5)^4"], exact: true },
            { question: "c)", attendu: ["0,0625", "1/16"], exact: true },
            { question: "d)", attendu: "6,25 %", exact: true },
            { question: "e)", attendu: "20 h" },
          ],
          correction:
            "a) On soustrait les exposants : $(x + 1) - x = 1$, donc $0{,}5^1 = 0{,}5$. D'une période à la suivante, la quantité est bien multipliée par 0,5.\nb) $\\left(0{,}5^2\\right)^2 = 0{,}5^{2 \\times 2} = 0{,}5^4$.\nc) $0{,}5^4 = 0{,}0625$, c'est-à-dire $\\dfrac{1}{16}$.\nd) On multiplie par 100 : 6,25 %.\ne) L'exposant 4 compte les périodes : $4 \\times 5 = 20$ heures.\n⛔ Le piège au e) : répondre 4. Le 4 compte les périodes, et une période dure 5 heures.\nRéponse : a) 0,5 ; b) $0{,}5^4$ ; c) 0,0625 ; d) 6,25 % ; e) 20 heures.",
          micros: ["expoT_transformer", "expoT_puissance_exposant"],
        },
        {
          titre: "La copie de Lucas",
          enonce:
            "Une professeure corrige la copie de Lucas. Il a écrit :\na) $1{,}2^3 \\times 1{,}2^4 = 1{,}2^{12}$\nb) $\\dfrac{5^8}{5^2} = 5^4$\nc) $\\left(0{,}7^2\\right)^3 = 0{,}7^6$\nd) $\\dfrac{3^{x+4}}{3^{x+1}} = 3^3$\nPour les questions a) à d), écris le résultat juste, sous la forme d'une seule puissance.\ne) Combien de ces quatre égalités Lucas a-t-il réussies ?",
          reponses: [
            { question: "a)", attendu: ["1,2^7", "(1,2)^7"], exact: true },
            { question: "b)", attendu: "5^6", exact: true },
            { question: "c)", attendu: ["0,7^6", "(0,7)^6"], exact: true },
            { question: "d)", attendu: "3^3", exact: true },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "a) Un produit : on additionne, $3 + 4 = 7$. Le juste est $1{,}2^7$ : Lucas a multiplié.\nb) Un quotient : on soustrait, $8 - 2 = 6$. Le juste est $5^6$ : Lucas a divisé.\nc) Une puissance de puissance : $2 \\times 3 = 6$. Lucas a raison.\nd) $(x + 4) - (x + 1) = 3$. Lucas a raison.\ne) Deux égalités sont justes : c) et d).\n⛔ Le piège au b) : garder $5^4$ parce que $8 \\div 2 = 4$ a l'air logique. Un quotient soustrait les exposants.\nRéponse : a) $1{,}2^7$ ; b) $5^6$ ; c) $0{,}7^6$ ; d) $3^3$ ; e) 2.",
          micros: ["expoT_transformer"],
        },
      ],
    },
  ],
};
