// ─── Fiche d'exercices : arbre, chemins et probabilités totales (STMG, Tle) — 20 exercices ─
//
// Notion proba_arbre_calcul du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// Le coach demande : un chemin = le produit de ses branches ; retrouver une branche
// depuis un chemin ; un évènement = la somme de ses chemins ; la formule
// $P(C) = P(A) P_A(C) + P(\overline{A}) P_{\overline{A}}(C)$ ; passer de l'arbre au
// tableau et du tableau à l'arbre. Il ne demande PAS de « remonter » l'arbre
// ($P_C(A)$ par la formule de Bayes) : la feuille non plus.
//
// Aucune donnée réelle : tous les chiffres sont des modèles.
//
// Domaines et métiers : potager (jardinier), galerie d'art (galeriste), salon de
// coiffure (coiffeuse), musée (médiatrice), chaussures (ouvrier), mathématiques nues
// (ex. 6), golf (caddie), vétérinaire équin (ex. 8) ; cave à vin (caviste), moteurs
// (ingénieure), examen (une correction d'élève), fruits (grossiste), lait (technicien
// laitier), magasin de sport (vendeur), radio (programmatrice), course à pied
// (kinésithérapeute) ; cinéma de quartier (gérante), lettre d'information (chargée
// de marketing), peinture (artisan), réseau de bus (cheffe d'exploitation).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaT_chemin (1, 2, 5, 9, 10, 16, 17, 18), probaT_somme_chemins
// (3, 9, 10, 12, 13, 17, 18, 19), probaT_probabilites_totales (4, 6, 11, 12, 18, 19),
// probaT_arbre_vers_tableau (7, 8, 14, 15, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";
import { croise } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesProbaArbreCalculStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-arbre-calcul",
  titre: "Arbre : chemins et probabilités totales",
  accroche:
    "Vingt exercices pour calculer sur un arbre : multiplier le long d'un chemin, additionner les chemins qui mènent au même résultat, écrire la formule des probabilités totales, passer de l'arbre au tableau et retour. Une cave à vin, des moteurs, une radio, un réseau de bus. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : multiplier sur un chemin, additionner deux chemins, passer à l'effectif.",
      rappel: [
        "Un chemin : on multiplie ses branches. $P(A \\cap C) = P(A) \\times P_A(C)$.",
        "Un évènement atteint par plusieurs chemins : on additionne ces chemins.",
        "Probabilités totales : deux chemins mènent à C, un par A et un par « non A ». On calcule le produit de chacun, puis on additionne.",
        "Effectif d'une case = effectif total × probabilité du chemin.",
      ],
      exercices: [
        {
          enonce:
            "Un jardinier sème des graines, et en choisit une au hasard. Quelle est la probabilité que la graine soit une tomate ET qu'elle germe ?",
          figure: arbre([
            { label: "Tomate", proba: "0,6", enfants: [{ label: "Germe", proba: "0,5" }, { label: "Non", proba: "0,5" }] },
            { label: "Courge", proba: "0,4", enfants: [{ label: "Germe", proba: "0,8" }, { label: "Non", proba: "0,2" }] },
          ]),
          reponses: [{ attendu: "0,3" }],
          correction:
            "« Tomate ET germe » : c'est un chemin de l'arbre.\nOn multiplie ses deux branches : $0{,}6 \\times 0{,}5 = 0{,}3$.\n⛔ Le piège : répondre 0,5, la branche seule. Ce nombre suppose que la graine est déjà une tomate.\nRéponse : 0,3.",
          micros: ["probaT_chemin"],
        },
        {
          enonce:
            "Un galeriste vend des œuvres, et en choisit une au hasard. Quelle est la probabilité qu'elle soit une sculpture ET qu'elle soit vendue ?",
          figure: arbre([
            { label: "Sculpture", proba: "0,25", enfants: [{ label: "Vendue", proba: "0,8" }, { label: "Non", proba: "0,2" }] },
            { label: "Tableau", proba: "0,75", enfants: [{ label: "Vendue", proba: "0,4" }, { label: "Non", proba: "0,6" }] },
          ]),
          reponses: [{ attendu: "0,2" }],
          correction:
            "On suit le chemin « Sculpture » puis « Vendue ».\n$0{,}25 \\times 0{,}8 = 0{,}2$.\n⛔ Le piège : additionner ($0{,}25 + 0{,}8 = 1{,}05$). Sur un chemin, on multiplie.\nRéponse : 0,2.",
          micros: ["probaT_chemin"],
        },
        {
          enonce:
            "Une coiffeuse sait que deux chemins de son arbre mènent à « client fidèle » : l'un vaut 0,24, l'autre vaut 0,18. Quelle est la probabilité qu'un client choisi au hasard soit fidèle ?",
          reponses: [{ attendu: "0,42" }],
          correction:
            "Les deux chemins arrivent au même résultat : on additionne.\n$0{,}24 + 0{,}18 = 0{,}42$.\n⛔ Le piège : multiplier $0{,}24 \\times 0{,}18$. On multiplie le long d'un chemin, on additionne entre les chemins.\nRéponse : 0,42.",
          micros: ["probaT_somme_chemins"],
        },
        {
          enonce:
            "Une médiatrice de musée note que la moitié des visiteurs viennent en groupe. Parmi ceux qui viennent en groupe, 20 % prennent un audioguide. Parmi les autres, 40 % en prennent un. Quelle est la probabilité qu'un visiteur choisi au hasard prenne un audioguide ?",
          reponses: [{ attendu: "0,3" }],
          correction:
            "Deux chemins mènent à « audioguide ».\nEn groupe : $0{,}5 \\times 0{,}2 = 0{,}1$.\nSeul : $0{,}5 \\times 0{,}4 = 0{,}2$.\nOn additionne : $0{,}1 + 0{,}2 = 0{,}3$.\n⛔ Le piège : additionner 20 % et 40 % sans les multiplier par la part de chaque groupe. Cela ferait 0,6.\nRéponse : 0,3.",
          micros: ["probaT_probabilites_totales"],
        },
        {
          enonce:
            "Un ouvrier en usine de chaussures lit un arbre, pour une paire choisie au hasard. La branche « Cuir » porte 0,6, et le chemin « Cuir » puis « Sans défaut » vaut 0,3. Quelle probabilité porte la seconde branche de ce chemin ?",
          reponses: [{ attendu: "0,5" }],
          correction:
            "Le chemin est le produit : $0{,}6 \\times \\text{?} = 0{,}3$.\nDonc la branche vaut $0{,}3 \\div 0{,}6 = 0{,}5$.\n⛔ Le piège : répondre 0,3. Ce nombre est le chemin entier, il se lit au bout, pas sur la branche.\nRéponse : 0,5.",
          micros: ["probaT_chemin"],
        },
        {
          enonce:
            "Quelle formule donne $P(C)$ sur un arbre dont le premier niveau est $A$, $\\overline{A}$ ? Écris le numéro de la bonne formule.\n1. $P(C) = P(A) + P_A(C)$\n2. $P(C) = P(A) \\times P_A(C) + P(\\overline{A}) \\times P_{\\overline{A}}(C)$\n3. $P(C) = P_A(C) + P_{\\overline{A}}(C)$",
          reponses: [{ attendu: "2" }],
          correction:
            "Deux chemins mènent à $C$, un par $A$, un par $\\overline{A}$.\nChaque chemin est un produit, et on additionne les deux chemins : c'est la formule 2.\n⛔ Le piège : la formule 3. Elle oublie le premier niveau, et sa valeur peut dépasser 1.\nRéponse : 2.",
          micros: ["probaT_probabilites_totales"],
        },
        {
          enonce:
            "Un caddie étudie 1 000 parties de golf (modèle). Le chemin « Week-end » puis « Pluie » vaut 0,3 sur l'arbre. Combien de parties se jouent un week-end sous la pluie ?",
          reponses: [{ attendu: "300" }],
          correction:
            "Effectif de la case = effectif total × probabilité du chemin.\n$1\\,000 \\times 0{,}3 = 300$ parties.\n⛔ Le piège : répondre 0,3. La question demande un nombre de parties, pas une probabilité.\nRéponse : 300.",
          micros: ["probaT_arbre_vers_tableau"],
        },
        {
          enonce:
            "Une vétérinaire équine veut construire l'arbre de ce tableau, avec le type d'animal au premier niveau. Quelle probabilité porte la branche de « Poney » vers « Vacciné » ?",
          figure: croise(["Animal", "Vacciné", "Non vacciné", "Total"], [
            ["Poney", 120, 80, 200],
            ["Cheval de selle", 240, 60, 300],
            ["Total", 360, 140, 500],
          ]),
          reponses: [{ attendu: "0,6" }],
          correction:
            "La branche part de « Poney » : le tout, c'est les 200 poneys.\n$\\dfrac{120}{200} = 0{,}6$.\n⛔ Le piège : diviser par 500. Cela donne 0,24, le chemin entier, pas la branche.\nRéponse : 0,6.",
          micros: ["probaT_arbre_vers_tableau"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un arbre à lire ou à construire : chemins, puis somme des chemins.",
      rappel: [
        "On écrit chaque chemin sur sa ligne, puis on additionne : $P(C) = P(A) \\times P_A(C) + P(\\overline{A}) \\times P_{\\overline{A}}(C)$.",
        "$P(\\overline{C}) = 1 - P(C)$ : un bon moyen de vérifier, ou d'aller plus vite.",
        "Arbre vers tableau : le premier niveau donne les totaux des lignes, les chemins donnent les cases.",
      ],
      exercices: [
        {
          enonce:
            "Un caviste vend du vin, et choisit une bouteille au hasard. 40 % des bouteilles sont du rouge. Parmi les rouges, 75 % sont en bio. Parmi les autres, 25 % sont en bio.\na) Quelle est la probabilité d'une bouteille rouge et bio ?\nb) Quelle est la probabilité d'une bouteille non rouge et bio ?\nc) Quelle est la probabilité qu'une bouteille soit bio ?",
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,15" },
            { question: "c)", attendu: "0,45" },
          ],
          correction:
            "a) $0{,}4 \\times 0{,}75 = 0{,}3$.\nb) Non rouge : $1 - 0{,}4 = 0{,}6$. Puis $0{,}6 \\times 0{,}25 = 0{,}15$.\nc) Les deux chemins mènent à « bio » : $0{,}3 + 0{,}15 = 0{,}45$.\n⛔ Le piège au b) : garder 0,4 sur le second chemin. Il passe par « non rouge », qui vaut 0,6.\nRéponse : a) 0,3 ; b) 0,15 ; c) 0,45.",
          schema: arbre([
            { label: "Rouge", proba: "0,4", enfants: [{ label: "Bio", proba: "0,75" }, { label: "Pas bio", proba: "0,25" }] },
            { label: "Autre", proba: "0,6", enfants: [{ label: "Bio", proba: "0,25" }, { label: "Pas bio", proba: "0,75" }] },
          ]),
          micros: ["probaT_chemin", "probaT_somme_chemins"],
        },
        {
          enonce:
            "Une ingénieure suit deux usines de moteurs (modèle), et choisit un moteur au hasard. L'usine A fait 70 % de la production, avec 2 % de moteurs défectueux. L'usine B fait le reste, avec 5 % de moteurs défectueux.\na) Quelle est la probabilité qu'un moteur vienne de A et soit défectueux ?\nb) Quelle est la probabilité qu'il vienne de B et soit défectueux ?\nc) Quelle est la probabilité qu'un moteur soit défectueux ?",
          reponses: [
            { question: "a)", attendu: "0,014" },
            { question: "b)", attendu: "0,015" },
            { question: "c)", attendu: "0,029" },
          ],
          correction:
            "a) $0{,}7 \\times 0{,}02 = 0{,}014$.\nb) B fait $1 - 0{,}7 = 0{,}3$. Puis $0{,}3 \\times 0{,}05 = 0{,}015$.\nc) $0{,}014 + 0{,}015 = 0{,}029$.\n⛔ Le piège au c) : faire la moyenne de 2 % et de 5 %, soit 3,5 %. L'usine A pèse plus lourd.\nRéponse : a) 0,014 ; b) 0,015 ; c) 0,029.",
          micros: ["probaT_chemin", "probaT_somme_chemins"],
        },
        {
          enonce:
            "Sur cet arbre, on choisit un individu au hasard. Un élève calcule $P(C)$ et écrit : « $0{,}6 + 0{,}4 \\times 0{,}5 = 0{,}8$ ».\na) Quel nombre a-t-il oublié de multiplier par 0,6 ?\nb) Calcule la bonne valeur de $P(C)$.",
          figure: arbre([
            { label: "A", proba: "0,6", enfants: [{ label: "C", proba: "0,7" }, { label: "Pas C", proba: "0,3" }] },
            { label: "Pas A", proba: "0,4", enfants: [{ label: "C", proba: "0,5" }, { label: "Pas C", proba: "0,5" }] },
          ]),
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "0,62" },
          ],
          correction:
            "a) Le chemin par $A$ passe aussi par la branche vers $C$, qui porte 0,7. L'élève l'a oubliée.\nb) $0{,}6 \\times 0{,}7 + 0{,}4 \\times 0{,}5 = 0{,}42 + 0{,}2 = 0{,}62$.\n⛔ Le piège : s'arrêter au premier niveau sur un chemin. Un chemin va de la racine jusqu'au bout.\nRéponse : a) 0,7 ; b) 0,62.",
          micros: ["probaT_probabilites_totales"],
        },
        {
          enonce:
            "Un grossiste reçoit des fruits de trois producteurs (modèle), et choisit un fruit au hasard. Le producteur 1 fournit 50 %, avec 10 % de fruits abîmés. Le producteur 2 fournit 30 %, avec 20 % de fruits abîmés. Le producteur 3 fournit le reste, avec 30 % de fruits abîmés.\na) Quelle part fournit le producteur 3 ?\nb) Quelle est la probabilité qu'un fruit soit abîmé ?",
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,17" },
          ],
          correction:
            "a) $1 - 0{,}5 - 0{,}3 = 0{,}2$.\nb) Trois chemins : $0{,}5 \\times 0{,}1 = 0{,}05$ ; $0{,}3 \\times 0{,}2 = 0{,}06$ ; $0{,}2 \\times 0{,}3 = 0{,}06$.\nOn additionne : $0{,}05 + 0{,}06 + 0{,}06 = 0{,}17$.\n⛔ Le piège au b) : oublier le troisième chemin. Tous les chemins qui finissent par « abîmé » comptent.\nRéponse : a) 0,2 ; b) 0,17.",
          schema: arbre([
            { label: "P1", proba: "0,5", enfants: [{ label: "Abîmé", proba: "0,1" }, { label: "Bon", proba: "0,9" }] },
            { label: "P2", proba: "0,3", enfants: [{ label: "Abîmé", proba: "0,2" }, { label: "Bon", proba: "0,8" }] },
            { label: "P3", proba: "0,2", enfants: [{ label: "Abîmé", proba: "0,3" }, { label: "Bon", proba: "0,7" }] },
          ]),
          micros: ["probaT_somme_chemins", "probaT_probabilites_totales"],
        },
        {
          enonce:
            "Un technicien laitier teste des échantillons, et en choisit un au hasard. 20 % viennent de la ferme A, et 90 % de ceux-ci sont conformes. Les autres viennent de la ferme B, et 60 % de ceux-là sont conformes.\na) Calcule la probabilité qu'un échantillon soit conforme.\nb) Déduis-en la probabilité qu'il ne soit pas conforme.\nc) Quelle est la probabilité du chemin « ferme A puis non conforme » ?",
          reponses: [
            { question: "a)", attendu: "0,66" },
            { question: "b)", attendu: "0,34" },
            { question: "c)", attendu: "0,02" },
          ],
          correction:
            "a) $0{,}2 \\times 0{,}9 + 0{,}8 \\times 0{,}6 = 0{,}18 + 0{,}48 = 0{,}66$.\nb) Le contraire : $1 - 0{,}66 = 0{,}34$.\nc) $0{,}2 \\times 0{,}1 = 0{,}02$. L'autre chemin vaut $0{,}8 \\times 0{,}4 = 0{,}32$, et $0{,}02 + 0{,}32 = 0{,}34$. ✔\n⛔ Le piège au c) : utiliser 0,9. Depuis la ferme A, la branche « non conforme » vaut $1 - 0{,}9 = 0{,}1$.\nRéponse : a) 0,66 ; b) 0,34 ; c) 0,02.",
          micros: ["probaT_somme_chemins"],
        },
        {
          enonce:
            "Un vendeur de sport étudie 500 clients (modèle). 40 % achètent en ligne. Parmi eux, 60 % sont adhérents. Parmi les clients en boutique, 20 % sont adhérents. On remplit le tableau ci-dessous.\na) Combien de clients sont en ligne et adhérents ?\nb) Combien de clients sont en boutique et non adhérents ?\nc) Combien de clients sont adhérents en tout ?",
          figure: croise(["Client", "Adhérent", "Non adhérent", "Total"], [
            ["En ligne", "?", "…", "…"],
            ["En boutique", "…", "?", "…"],
            ["Total", "?", "…", 500],
          ]),
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "240" },
            { question: "c)", attendu: "180" },
          ],
          correction:
            "En ligne : $500 \\times 0{,}4 = 200$ clients. En boutique : $500 - 200 = 300$ clients.\na) $200 \\times 0{,}6 = 120$.\nb) En boutique, non adhérents : 80 % de 300. $300 \\times 0{,}8 = 240$.\nc) Adhérents en boutique : $300 - 240 = 60$. En tout : $120 + 60 = 180$.\n⛔ Le piège au b) : calculer 20 % de 300. Les 20 % sont les adhérents, on demande les autres.\nRéponse : a) 120 ; b) 240 ; c) 180.",
          schema: croise(["Client", "Adhérent", "Non adhérent", "Total"], [
            ["En ligne", 120, 80, 200],
            ["En boutique", 60, 240, 300],
            ["Total", 180, 320, 500],
          ]),
          micros: ["probaT_arbre_vers_tableau"],
        },
        {
          enonce:
            "Une programmatrice de radio a ce tableau de 400 titres (modèle) et veut l'arbre, avec la langue au premier niveau. On choisit un titre au hasard.\na) Quelle probabilité porte la branche « Français » ?\nb) Quelle probabilité porte la branche de « Français » vers « Récent » ?\nc) Quelle probabilité porte la branche de « Anglais » vers « Récent » ?\nd) Que vaut le chemin « Français » puis « Récent » ?",
          figure: croise(["Titre", "Récent", "Ancien", "Total"], [
            ["Français", 90, 60, 150],
            ["Anglais", 50, 200, 250],
            ["Total", 140, 260, 400],
          ]),
          reponses: [
            { question: "a)", attendu: "0,375" },
            { question: "b)", attendu: "0,6" },
            { question: "c)", attendu: "0,2" },
            { question: "d)", attendu: "0,225" },
          ],
          correction:
            "a) $\\dfrac{150}{400} = 0{,}375$.\nb) $\\dfrac{90}{150} = 0{,}6$.\nc) $\\dfrac{50}{250} = 0{,}2$.\nd) $0{,}375 \\times 0{,}6 = 0{,}225$. Vérification sur le tableau : $\\dfrac{90}{400} = 0{,}225$. ✔\n⛔ Le piège au b) : diviser 90 par 400. Le quotient par le total général, c'est le chemin entier, celui du d).\nRéponse : a) 0,375 ; b) 0,6 ; c) 0,2 ; d) 0,225.",
          micros: ["probaT_arbre_vers_tableau"],
        },
        {
          enonce:
            "Un kinésithérapeute suit des coureurs (modèle), et en choisit un au hasard. La branche « Route » porte 0,4. Le chemin « Route » puis « Blessé » vaut 0,04. Sur l'autre chemin, « Trail » puis « Blessé » vaut 0,12.\na) Quelle probabilité porte la branche de « Route » vers « Blessé » ?\nb) Quelle probabilité porte la branche de « Trail » vers « Blessé » ?\nc) Quelle est la probabilité qu'un coureur soit blessé ?",
          reponses: [
            { question: "a)", attendu: "0,1" },
            { question: "b)", attendu: "0,2" },
            { question: "c)", attendu: "0,16" },
          ],
          correction:
            "a) $0{,}4 \\times \\text{?} = 0{,}04$, donc $0{,}04 \\div 0{,}4 = 0{,}1$.\nb) La branche « Trail » porte $1 - 0{,}4 = 0{,}6$. Puis $0{,}12 \\div 0{,}6 = 0{,}2$.\nc) $0{,}04 + 0{,}12 = 0{,}16$.\n⛔ Le piège au b) : diviser 0,12 par 0,4. Ce chemin passe par « Trail », qui porte 0,6.\nRéponse : a) 0,1 ; b) 0,2 ; c) 0,16.",
          micros: ["probaT_chemin"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Tout l'arbre : on le construit, on calcule, on répond à la question de départ.",
      rappel: [
        "On construit d'abord l'arbre, en complétant chaque nœud à 1.",
        "On repère tous les chemins qui répondent à la question.",
        "Une probabilité totale est une moyenne pondérée : elle tombe entre les valeurs du second niveau.",
      ],
      exercices: [
        {
          titre: "Le cinéma de quartier",
          enonce:
            "La gérante d'un cinéma observe (modèle), pour une séance choisie au hasard : 30 % des séances sont en soirée. En soirée, 80 % des séances sont rentables. Le reste du temps, 50 % le sont.\na) Quelle est la probabilité qu'une séance soit en soirée et rentable ?\nb) Quelle est la probabilité qu'une séance soit hors soirée et rentable ?\nc) Quelle est la probabilité qu'une séance soit rentable ?\nd) Sur 400 séances, combien de séances rentables peut-on prévoir ?",
          reponses: [
            { question: "a)", attendu: "0,24" },
            { question: "b)", attendu: "0,35" },
            { question: "c)", attendu: "0,59" },
            { question: "d)", attendu: "236" },
          ],
          correction:
            "a) $0{,}3 \\times 0{,}8 = 0{,}24$.\nb) Hors soirée : 0,7. $0{,}7 \\times 0{,}5 = 0{,}35$.\nc) $0{,}24 + 0{,}35 = 0{,}59$.\nd) $400 \\times 0{,}59 = 236$ séances.\n⛔ Le piège au c) : faire la moyenne de 80 % et 50 %, soit 65 %. Les séances hors soirée sont plus nombreuses : elles comptent plus.\nRéponse : a) 0,24 ; b) 0,35 ; c) 0,59 ; d) 236.",
          schema: arbre([
            { label: "Soirée", proba: "0,3", enfants: [{ label: "Rentable", proba: "0,8" }, { label: "Non", proba: "0,2" }] },
            { label: "Autre", proba: "0,7", enfants: [{ label: "Rentable", proba: "0,5" }, { label: "Non", proba: "0,5" }] },
          ]),
          micros: ["probaT_chemin", "probaT_somme_chemins"],
        },
        {
          titre: "La lettre d'information",
          enonce:
            "Une chargée de marketing envoie une lettre à 2 000 abonnés (modèle). 60 % sont des clients. Parmi les clients, 50 % ouvrent la lettre. Parmi les autres, 25 % l'ouvrent. Son objectif : au moins 800 lettres ouvertes. On choisit un abonné au hasard.\na) Quelle est la probabilité qu'un abonné soit un client qui ouvre la lettre ?\nb) Calcule la probabilité qu'une lettre soit ouverte.\nc) Combien de lettres ouvertes peut-on prévoir ?\nd) L'objectif est-il atteint ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "800" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $0{,}6 \\times 0{,}5 = 0{,}3$.\nb) $0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.\nc) $2\\,000 \\times 0{,}4 = 800$ lettres.\nd) 800 atteint l'objectif : « au moins 800 » accepte 800. Oui.\n⛔ Le piège au b) : additionner $0{,}5 + 0{,}25$. Chaque taux porte sur un groupe : il faut d'abord le multiplier par la part du groupe.\nRéponse : a) 0,3 ; b) 0,4 ; c) 800 ; d) oui.",
          micros: ["probaT_chemin", "probaT_somme_chemins", "probaT_probabilites_totales"],
        },
        {
          titre: "Trois pots de peinture",
          enonce:
            "Un artisan peintre achète chez trois fournisseurs (modèle) : A pour 25 %, B pour 35 %, C pour le reste. 4 % des pots de A sont non conformes, 2 % de ceux de B et 5 % de ceux de C. On choisit un pot au hasard.\na) Quelle part achète-t-il chez C ?\nb) Quelle est la probabilité qu'un pot vienne de C et soit non conforme ?\nc) Quelle est la probabilité qu'un pot soit non conforme ?\nd) Quelle est la probabilité qu'un pot soit conforme ?",
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,02" },
            { question: "c)", attendu: "0,037" },
            { question: "d)", attendu: "0,963" },
          ],
          correction:
            "a) $1 - 0{,}25 - 0{,}35 = 0{,}4$.\nb) $0{,}4 \\times 0{,}05 = 0{,}02$.\nc) $0{,}25 \\times 0{,}04 + 0{,}35 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 0{,}01 + 0{,}007 + 0{,}02 = 0{,}037$.\nd) Le contraire : $1 - 0{,}037 = 0{,}963$.\n⛔ Le piège au c) : faire la somme $4 + 2 + 5 = 11$ %. Chaque taux est pondéré par la part du fournisseur.\nRéponse : a) 0,4 ; b) 0,02 ; c) 0,037 ; d) 0,963.",
          micros: ["probaT_somme_chemins", "probaT_probabilites_totales"],
        },
        {
          titre: "Du tableau à l'arbre, et retour",
          enonce:
            "Une cheffe d'exploitation étudie 600 courses de bus (modèle). 150 courses sont faites le soir, les autres en journée. Le soir, 30 courses sont en retard. En journée, 90 sont en retard. On choisit une course au hasard.\na) Quelle probabilité porte la branche « Soir » ?\nb) Quelle probabilité porte la branche de « Soir » vers « Retard » ?\nc) Quelle probabilité porte la branche de « Journée » vers « Retard » ?\nd) Par les chemins, calcule la probabilité qu'une course soit en retard.\ne) Combien de courses à l'heure y a-t-il en journée ?",
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,2" },
            { question: "c)", attendu: "0,2" },
            { question: "d)", attendu: "0,2" },
            { question: "e)", attendu: "360" },
          ],
          correction:
            "a) $\\dfrac{150}{600} = 0{,}25$.\nb) $\\dfrac{30}{150} = 0{,}2$.\nc) En journée : $600 - 150 = 450$ courses. $\\dfrac{90}{450} = 0{,}2$.\nd) $0{,}25 \\times 0{,}2 + 0{,}75 \\times 0{,}2 = 0{,}05 + 0{,}15 = 0{,}2$. Vérification : $\\dfrac{120}{600} = 0{,}2$. ✔\ne) $450 - 90 = 360$ courses.\n⛔ Le piège : voir 90 retards contre 30 et conclure que la journée est pire. Rapporté à chaque groupe, le taux est le même : 20 %.\nRéponse : a) 0,25 ; b) 0,2 ; c) 0,2 ; d) 0,2 ; e) 360.",
          schema: croise(["Course", "Retard", "À l'heure", "Total"], [
            ["Soir", 30, 120, 150],
            ["Journée", 90, 360, 450],
            ["Total", 120, 480, 600],
          ]),
          micros: ["probaT_arbre_vers_tableau"],
        },
      ],
    },
  ],
};
