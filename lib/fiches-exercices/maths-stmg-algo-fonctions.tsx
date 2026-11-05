// ─── Fiche d'exercices : les fonctions en Python (STMG) — 20 exercices ──────────
//
// Notion algo_fonctions du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// repérer les entrées (entre parenthèses) et la sortie (après return), la fonction
// sans return, l'appel avec trop peu d'arguments, la valeur renvoyée par un appel,
// l'appel imbriqué, et l'intérêt d'une fonction : écrire un calcul une seule fois.
// Il fait LIRE les fonctions ; compléter une ligne reste le geste le plus exigeant.
//
// Une seule formule réelle : l'IMC, masse ÷ taille² (ex. 10, définition de l'OMS).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; commerce (vendeur), santé
// (diététicienne), écologie (écologue), marathon (chronométreur), marché (primeur),
// pâtisserie (pâtissière), menuiserie (menuisier), fleurs (fleuriste), zoo
// (agent d'accueil), soldes (commerçante), électricité (conseillère), réseau social
// (chargé de communication).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs`.
//
// Micro-compétences : algo_fct_entrees_sorties (2, 3, 4, 10, 12, 17, 20),
// algo_fct_definir (5, 7, 13), algo_fct_appeler (1, 2, 4, 6, 8, 9, 10, 11, 12, 13,
// 14, 17, 18, 19, 20), algo_fct_structurer (15, 16, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme } from "@/lib/fiches-exercices/figures";

export const exercicesAlgoFonctionsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "algo-fonctions",
  titre: "Fonctions en Python",
  accroche:
    "Vingt exercices pour lire une fonction en Python : ses entrées, sa sortie, le return qu'on oublie, la valeur renvoyée par un appel, et l'intérêt d'écrire un calcul une seule fois. Une pâtisserie, un marathon, un zoo, des soldes, une facture d'électricité : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Repérer les entrées et la sortie, ou calculer la valeur renvoyée par un appel.",
      rappel: [
        "def nom(entrées): définit une fonction. Les entrées sont entre parenthèses. La sortie est ce qui suit return.",
        "Appeler une fonction : les valeurs données prennent la place des entrées, DANS L'ORDRE.",
        "Sans return, le calcul est fait puis perdu : la fonction ne renvoie rien.",
        "Une fonction s'appelle avec autant de valeurs qu'elle a d'entrées. Sinon, Python renvoie une erreur.",
      ],
      exercices: [
        {
          enonce: "Qu'affiche ce programme ?",
          figure: programme(["def double(x):", "    return 2 * x", "", "print(double(7))"]),
          reponses: [{ attendu: "14" }],
          correction:
            "L'appel double(7) donne à x la valeur 7.\nLa fonction renvoie $2 \\times 7 = 14$.\n⛔ Le piège : répondre 7. La valeur entre parenthèses est l'entrée, pas la sortie.\nRéponse : 14.",
          micros: ["algo_fct_appeler"],
        },
        {
          enonce: "On lit cette fonction.\na) Combien d'entrées a-t-elle ?\nb) Qu'affiche le programme ?",
          figure: programme(["def aire(a, b):", "    return a * b", "", "print(aire(6, 4))"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "24" },
          ],
          correction:
            "a) Entre les parenthèses de la ligne def, il y a a et b : deux entrées.\nb) a reçoit 6, b reçoit 4 : $6 \\times 4 = 24$.\n⛔ Le piège au a) : compter aussi la sortie. Les entrées sont seulement dans les parenthèses du def.\nRéponse : a) 2 ; b) 24.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
        {
          enonce: "Écris le nom de la deuxième entrée de cette fonction.",
          figure: programme(["def prix_ttc(prix_ht, taux):", "    c = 1 + taux / 100", "    return prix_ht * c"]),
          reponses: [{ attendu: "taux" }],
          correction:
            "On lit la ligne def, entre les parenthèses : prix_ht, puis taux.\nLa deuxième entrée s'appelle taux.\n⛔ Le piège : répondre prix_ttc. C'est le nom de la fonction, écrit avant les parenthèses.\nRéponse : taux.",
          micros: ["algo_fct_entrees_sorties"],
        },
        {
          enonce: "On lit cette fonction.\na) Quelle variable est renvoyée ? Écris son nom.\nb) Que renvoie f(2) ?",
          figure: programme(["def f(x):", "    y = 3 * x + 1", "    return y"]),
          reponses: [
            { question: "a)", attendu: "y" },
            { question: "b)", attendu: "7" },
          ],
          correction:
            "a) La sortie est ce qui suit return : y.\nb) x vaut 2 : $3 \\times 2 + 1 = 7$.\n⛔ Le piège au a) : répondre x. x est l'entrée.\nRéponse : a) y ; b) 7.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
        {
          enonce:
            "Cette fonction doit appliquer une remise de 10 % et renvoyer le nouveau prix.\na) Renvoie-t-elle le nouveau prix ? Réponds oui ou non.\nb) Quelle ligne faut-il ajouter à la fin de la fonction ?",
          figure: programme(["def remise(prix):", "    nouveau = prix * 0.9"]),
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: ["return nouveau", "return(nouveau)", "return prix * 0,9", "return 0,9 * prix"], exact: true },
          ],
          correction:
            "a) La fonction calcule le nouveau prix, mais rien ne le renvoie : il est perdu.\nb) Il manque return nouveau, décalé comme la ligne d'avant. Écrire return prix * 0,9 revient au même.\n⛔ Le piège au a) : croire qu'un calcul fait est un résultat rendu. Sans return, l'appel ne rend rien.\nRéponse : a) non ; b) return nouveau.",
          micros: ["algo_fct_definir"],
        },
        {
          enonce: "Cette fonction a deux entrées, et l'ordre compte. Qu'affiche ce programme ?",
          figure: programme(["def ecart(a, b):", "    return a - b", "", "print(ecart(3, 10))"]),
          reponses: [{ attendu: "-7" }],
          correction:
            "Les valeurs prennent la place des entrées dans l'ordre : a vaut 3 et b vaut 10.\n$3 - 10 = -7$.\n⛔ Le piège : répondre 7, en soustrayant le petit au grand. La fonction fait a − b, dans cet ordre.\nRéponse : −7.",
          micros: ["algo_fct_appeler"],
        },
        {
          enonce: "Ce programme provoque une erreur.\na) Combien de valeurs la fonction attend-elle ?\nb) Combien de valeurs l'appel lui donne-t-il ?",
          figure: programme(["def total(a, b):", "    return a + b", "", "print(total(5))"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) La ligne def annonce deux entrées : a et b.\nb) L'appel total(5) n'en donne qu'une : Python ne sait pas quoi mettre dans b.\n⛔ Le piège : chercher l'erreur dans le return. Il est juste : c'est l'appel qui est incomplet.\nRéponse : a) 2 ; b) 1.",
          micros: ["algo_fct_definir"],
        },
        {
          enonce: "On lit cette fonction. Que renvoie chaque appel ?\na) frais(150)\nb) frais(60)\nc) frais(100)",
          figure: programme(["def frais(m):", "    if m >= 100:", "        return 0", "    else:", "        return 8"]),
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "0" },
          ],
          correction:
            "a) 150 >= 100 est vrai : la fonction renvoie 0.\nb) 60 >= 100 est faux : elle renvoie 8.\nc) 100 >= 100 est vrai : elle renvoie 0.\n⛔ Le piège au c) : répondre 8. Le signe >= garde l'égalité.\nRéponse : a) 0 ; b) 8 ; c) 0.",
          micros: ["algo_fct_appeler"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation, une fonction : on remplace les entrées par leurs valeurs et on calcule.",
      rappel: [
        "Un appel dans un appel : on calcule d'abord celui de l'intérieur, et son résultat entre dans celui de l'extérieur.",
        "La valeur renvoyée peut se ranger dans une variable : y = f(5).",
        "Une fonction évite de recopier un calcul : s'il change, une seule ligne est à corriger.",
      ],
      exercices: [
        {
          enonce:
            "Un vendeur calcule des prix TTC : h est le prix hors taxes, t le taux de TVA en %.\na) Qu'affiche le programme ?\nb) Que renvoie prix_ttc(20, 200), où les deux valeurs sont inversées ?",
          figure: programme(["def prix_ttc(h, t):", "    return h * (1 + t / 100)", "", "print(prix_ttc(200, 20))"]),
          reponses: [
            { question: "a)", attendu: "240" },
            { question: "b)", attendu: "60" },
          ],
          correction:
            "a) h vaut 200 et t vaut 20 : $200 \\times (1 + 0{,}2) = 240$.\nb) Cette fois h vaut 20 et t vaut 200 : $20 \\times (1 + 2) = 60$.\n⛔ Le piège : croire que l'ordre ne compte pas. La première valeur va dans la première entrée.\nRéponse : a) 240 ; b) 60.",
          micros: ["algo_fct_appeler"],
        },
        {
          enonce:
            "Une diététicienne calcule l'indice de masse corporelle : la masse en kg, divisée par le carré de la taille en m.\na) Qu'affiche le programme ?\nb) Que renvoie la fonction pour une masse de 72 kg et une taille de 1,50 m ?",
          figure: programme(["def imc(m, t):", "    return m / (t * t)", "", "print(round(imc(64, 1.6), 1))"]),
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "32" },
          ],
          correction:
            "a) $1{,}6 \\times 1{,}6 = 2{,}56$, puis $64 \\div 2{,}56 = 25$.\nb) $1{,}5 \\times 1{,}5 = 2{,}25$, puis $72 \\div 2{,}25 = 32$.\n⛔ Le piège : diviser par la taille une seule fois ($64 \\div 1{,}6 = 40$). Les parenthèses disent de multiplier t par lui-même d'abord.\nRéponse : a) 25 ; b) 32.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
        {
          enonce:
            "Une écologue modélise une population de 1 000 lynx qui grandit de 10 % par an.\na) Que renvoie l'appel de l'intérieur, an(1000) ?\nb) Qu'affiche le programme ?",
          figure: programme(["def an(c):", "    return c * 1.1", "", "print(round(an(an(1000)), 2))"]),
          reponses: [
            { question: "a)", attendu: "1 100" },
            { question: "b)", attendu: "1 210" },
          ],
          correction:
            "a) On commence par l'intérieur : $1\\,000 \\times 1{,}1 = 1\\,100$.\nb) Ce résultat entre dans la fonction : $1\\,100 \\times 1{,}1 = 1\\,210$.\n⛔ Le piège au b) : répondre 1 100 ou 1 200. La fonction est appelée deux fois : deux années à 10 %, soit $1{,}1 \\times 1{,}1$.\nRéponse : a) 1 100 ; b) 1 210.",
          micros: ["algo_fct_appeler"],
        },
        {
          enonce:
            "Un chronométreur de marathon utilise cette fonction : d est la distance en km, t la durée en heures.\na) Combien d'entrées a la fonction ?\nb) Que renvoie vitesse(20, 2) ?\nc) Que renvoie vitesse(42, 3) ?",
          figure: programme(["def vitesse(d, t):", "    return d / t"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "14" },
          ],
          correction:
            "a) d et t : 2 entrées.\nb) $20 \\div 2 = 10$.\nc) $42 \\div 3 = 14$, soit 14 km par heure.\n⛔ Le piège : calculer t ÷ d. La fonction renvoie d ÷ t : l'ordre est écrit après return.\nRéponse : a) 2 ; b) 10 ; c) 14.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
        {
          enonce:
            "Un primeur veut une fonction qui renvoie sa marge : le prix de vente moins le prix d'achat.\na) Écris ce qu'il faut mettre après return.\nb) Quelle est sa marge sur un cageot acheté 18 € et vendu 30 € ?",
          figure: programme(["def marge(vente, achat):", "    return .........."]),
          reponses: [
            { question: "a)", attendu: ["vente - achat", "return vente - achat", "-achat + vente"], exact: true },
            { question: "b)", attendu: "12 €" },
          ],
          correction:
            "a) La marge, c'est la vente moins l'achat : return vente - achat.\nb) marge(30, 18) renvoie $30 - 18 = 12$ €.\n⛔ Le piège au a) : écrire achat - vente. La marge serait négative pour un commerce qui gagne de l'argent.\nRéponse : a) vente - achat ; b) 12 €.",
          micros: ["algo_fct_definir", "algo_fct_appeler"],
        },
        {
          enonce:
            "Une pâtissière calcule la farine nécessaire : 250 g par tarte, plus 100 g pour le plan de travail.\na) Que vaut t après la ligne t = farine(4) ?\nb) Qu'affiche le programme ?",
          figure: programme(["def farine(n):", "    return 250 * n", "", "t = farine(4)", "t = t + 100", "print(t)"]),
          reponses: [
            { question: "a)", attendu: "1 000" },
            { question: "b)", attendu: "1 100" },
          ],
          correction:
            "a) farine(4) renvoie $250 \\times 4 = 1\\,000$, et cette valeur est rangée dans t.\nb) $1\\,000 + 100 = 1\\,100$.\n⛔ Le piège : croire que l'appel affiche quelque chose. C'est le print de la dernière ligne qui affiche.\nRéponse : a) 1 000 ; b) 1 100.",
          micros: ["algo_fct_appeler"],
        },
        {
          enonce:
            "Un menuisier applique un coefficient de TVA à ses prix, sans fonction. La TVA change.\na) Combien de lignes faut-il modifier ?\nb) Avec une fonction qui contient le coefficient, combien de lignes faudrait-il modifier ?",
          figure: programme(["table = 400 * 1.2", "chaise = 80 * 1.2", "banc = 150 * 1.2", "print(table + chaise + banc)"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) Le coefficient est recopié dans les trois premières lignes : il faut les modifier toutes les trois.\nb) Dans une fonction, il n'est écrit qu'une fois : une seule ligne à modifier.\n⛔ Le piège au a) : compter aussi la ligne du print. Elle ne contient pas le coefficient.\nRéponse : a) 3 ; b) 1.",
          micros: ["algo_fct_structurer"],
        },
        {
          enonce:
            "Une fleuriste calcule un panier de bouquets.\na) Combien de fois la fonction ttc est-elle appelée ?\nb) Qu'affiche le programme ?\nc) Combien de fois le coefficient est-il écrit dans le programme ?",
          figure: programme(["def ttc(h):", "    return h * 1.2", "", "panier = [10, 20, 30]", "total = 0", "for p in panier:", "    total = total + ttc(p)", "print(round(total, 2))"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "72" },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "a) La boucle fait 3 tours, et chaque tour appelle ttc : 3 appels.\nb) Les prix TTC sont 12, 24 et 36 : $12 + 24 + 36 = 72$.\nc) Le coefficient n'est écrit qu'une fois, dans la fonction : c'est tout l'intérêt.\n⛔ Le piège au c) : répondre 3. Le calcul est FAIT trois fois, mais ÉCRIT une seule fois.\nRéponse : a) 3 ; b) 72 ; c) 1.",
          micros: ["algo_fct_structurer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une ou deux fonctions, des appels : on calcule de l'intérieur vers l'extérieur, puis on répond dans la situation.",
      rappel: [
        "Dès qu'un return s'exécute, la fonction s'arrête et rend sa valeur : un seul return s'exécute à chaque appel.",
        "Une fonction peut en appeler une autre, ou contenir une boucle : on la déroule de la même façon.",
        "Une baisse de t % suivie d'une baisse de u % : on multiplie les coefficients, on n'additionne pas les taux.",
      ],
      exercices: [
        {
          titre: "L'entrée du zoo",
          enonce:
            "Un agent d'accueil de zoo calcule le prix pour une famille (modèle).\na) Combien d'entrées la fonction tarif a-t-elle ?\nb) Que renvoie tarif(4) ?\nc) Qu'affiche le programme ?",
          figure: programme(["def tarif(age):", "    if age < 4:", "        return 0", "    elif age < 18:", "        return 12", "    else:", "        return 20", "", "total = 0", "for a in [2, 9, 15, 40, 43]:", "    total = total + tarif(a)", "print(total)"]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "64" },
          ],
          correction:
            "a) Une seule entrée : age.\nb) 4 < 4 est faux, 4 < 18 est vrai : 12.\nc) 2 ans : 0. 9 ans : 12. 15 ans : 12. 40 ans : 20. 43 ans : 20.\n$0 + 12 + 12 + 20 + 20 = 64$.\n⛔ Le piège au b) : répondre 0. Le signe < exclut l'égalité : un enfant de 4 ans paie.\nRéponse : a) 1 ; b) 12 ; c) 64.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
        {
          titre: "Les soldes en deux temps",
          enonce:
            "Une commerçante baisse un prix de 200 € de 10 %, puis le nouveau prix de 20 %.\na) Que renvoie l'appel de l'intérieur, r(200, 10) ?\nb) Qu'affiche le programme ?\nc) Quelle est la baisse totale en pourcentage ?",
          figure: programme(["def r(p, t):", "    return p * (1 - t / 100)", "", "print(r(r(200, 10), 20))"]),
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: "144" },
            { question: "c)", attendu: "28 %" },
          ],
          correction:
            "a) $200 \\times 0{,}9 = 180$.\nb) $180 \\times 0{,}8 = 144$.\nc) Le prix a perdu $200 - 144 = 56$ €, et $56 \\div 200 = 0{,}28$, soit 28 %.\n⛔ Le piège au c) : additionner $10 + 20 = 30$. Les 20 % portent sur 180 €, pas sur 200 €.\nRéponse : a) 180 ; b) 144 ; c) 28 %.",
          micros: ["algo_fct_appeler"],
        },
        {
          titre: "La facture d'électricité",
          enonce:
            "Une conseillère modélise une facture mensuelle : 15 € d'abonnement, plus 0,20 € par kWh.\na) Que renvoie facture(100) ?\nb) Que renvoie facture(0) ?\nc) Qu'affiche le programme ?\nd) Le prix du kWh change. Combien de lignes faut-il modifier ?",
          figure: programme(["def facture(k):", "    return 15 + 0.2 * k", "", "def annee(k):", "    return 12 * facture(k)", "", "print(annee(100))"]),
          reponses: [
            { question: "a)", attendu: "35 €" },
            { question: "b)", attendu: "15 €" },
            { question: "c)", attendu: "420" },
            { question: "d)", attendu: "1" },
          ],
          correction:
            "a) $15 + 0{,}2 \\times 100 = 35$ €.\nb) Sans consommation, il reste l'abonnement : 15 €.\nc) annee(100) renvoie $12 \\times 35 = 420$.\nd) Le prix du kWh n'est écrit qu'une fois, dans facture : une seule ligne.\n⛔ Le piège au c) : calculer $12 \\times 100$. La fonction annee ne multiplie pas k : elle multiplie ce que renvoie facture(k).\nRéponse : a) 35 € ; b) 15 € ; c) 420 ; d) 1.",
          micros: ["algo_fct_appeler", "algo_fct_structurer"],
        },
        {
          titre: "Combien de temps pour grandir ?",
          enonce:
            "Un chargé de communication modélise un compte dont le nombre d'abonnés est multiplié par 1,5 chaque mois. La fonction cherche un seuil : c est le nombre d'abonnés au départ, s le seuil à atteindre.\na) Quelle variable la fonction renvoie-t-elle ? Écris son nom.\nb) Que renvoie mois(100, 300) ?\nc) Que renvoie mois(100, 1000) ?",
          figure: programme(["def mois(c, s):", "    n = 0", "    while c < s:", "        c = c * 1.5", "        n = n + 1", "    return n"]),
          reponses: [
            { question: "a)", attendu: "n" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) Ce qui suit return : n.\nb) c prend les valeurs 150, 225, 337,5. Il dépasse 300 au 3e tour : 3.\nc) On continue : 506,25, puis environ 759,4, puis environ 1 139. Il dépasse 1 000 au 6e tour : 6.\n⛔ Le piège au c) : croire qu'un seuil environ trois fois plus grand demande trois fois plus de temps. Une croissance en pourcentage accélère.\nRéponse : a) n ; b) 3 ; c) 6.",
          micros: ["algo_fct_entrees_sorties", "algo_fct_appeler"],
        },
      ],
    },
  ],
};
