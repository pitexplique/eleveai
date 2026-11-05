// ─── Fiche d'exercices : arbre de probabilités, construire (STMG, Tle) — 20 exercices ─
//
// Notion proba_arbre du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// Le coach demande : ce que portent le premier niveau (probabilités simples) et le
// second (conditionnelles), la somme à 1 sur chaque nœud, placer un nombre de
// l'énoncé sur sa branche, compléter un arbre, repérer un arbre impossible, traduire
// une branche par une phrase. ⛔ Les chemins et les probabilités totales sont la
// notion suivante (proba_arbre_calcul) : la feuille ne les fait pas calculer.
//
// Aucune donnée réelle : tous les chiffres sont des modèles.
//
// Domaines et métiers : élevage (éleveuse), restaurant (chef), viticulture
// (vigneron), climat (climatologue), véhicules de société (gestionnaire de flotte),
// sport en salle (coach), compostage (maraîcher), transports (conductrice) ; épicerie
// (épicier), optique (opticienne), banque (conseillère), tourisme (guide), covoiturage
// (urbaniste), comédie musicale (régisseuse), hôtellerie (réceptionniste), lycée
// (CPE) ; urgences (médecin), vacances (agent de voyages), industrie automobile
// (contrôleur, un arbre à corriger), port de pêche (mareyeuse).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaT_arbre_construire (3, 4, 9, 11, 15, 16, 17, 18, 20),
// probaT_arbre_ponderer (5, 6, 10, 13, 14, 17, 18), probaT_arbre_completer (1, 2, 7,
// 9, 10, 13, 19), probaT_arbre_interpreter (8, 12, 14, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";

export const exercicesProbaArbreStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-arbre",
  titre: "Arbre de probabilités : construire",
  accroche:
    "Vingt exercices pour construire un arbre sans se tromper de branche : ce que porte le premier niveau, ce que porte le second, placer un nombre de l'énoncé, compléter, repérer un arbre impossible, traduire une branche par une phrase. Une épicerie, une opticienne, les urgences, un port de pêche, des vacances. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : compléter une branche, nommer un niveau, placer un nombre.",
      rappel: [
        "Le premier niveau porte des probabilités simples : $P(A)$. Le second porte des probabilités conditionnelles : $P_A(B)$.",
        "Les branches qui partent d'un même nœud ont une somme égale à 1.",
        "« Parmi les A, x % sont B » se place sur la branche qui part de A et va vers B.",
      ],
      exercices: [
        {
          enonce:
            "Une éleveuse a des vaches de deux races, à forte production de lait (Lait+) ou non (Lait−). Elle en choisit une au hasard. Quelle probabilité porte la branche marquée « ? » ?",
          figure: arbre([
            { label: "Race A", proba: "0,35", enfants: [{ label: "Lait+", proba: "0,2" }, { label: "Lait−", proba: "0,8" }] },
            { label: "Race B", proba: "?", enfants: [{ label: "Lait+", proba: "0,1" }, { label: "Lait−", proba: "0,9" }] },
          ]),
          reponses: [{ attendu: "0,65" }],
          correction:
            "Les deux branches du premier niveau partent du même point : leur somme vaut 1.\n$1 - 0{,}35 = 0{,}65$.\n⛔ Le piège : chercher dans le second niveau. La branche marquée se complète avec sa voisine, celle qui part du même nœud.\nRéponse : 0,65.",
          micros: ["probaT_arbre_completer"],
        },
        {
          enonce:
            "Un chef note ce que commandent ses clients, et en choisit un au hasard. Quelle probabilité porte la branche marquée « ? » ?",
          figure: arbre([
            { label: "Viande", proba: "0,6", enfants: [{ label: "Frites", proba: "0,3" }, { label: "Salade", proba: "?" }] },
            { label: "Poisson", proba: "0,4", enfants: [{ label: "Frites", proba: "0,5" }, { label: "Salade", proba: "0,5" }] },
          ]),
          reponses: [{ attendu: "0,7" }],
          correction:
            "La branche part du nœud « Viande ». Sa voisine, « Frites », porte 0,3.\n$1 - 0{,}3 = 0{,}7$.\n⛔ Le piège : prendre 0,5, la valeur de la même issue sur l'autre nœud. Chaque nœud a son propre partage.\nRéponse : 0,7.",
          micros: ["probaT_arbre_completer"],
        },
        {
          enonce:
            "Un vigneron trace un arbre : au premier niveau, le cépage ; au second, la qualité de la récolte. Quelle sorte de probabilité porte une branche du SECOND niveau ? Écris « simple » ou « conditionnelle ».",
          reponses: [{ attendu: ["conditionnelle", "une conditionnelle", "probabilité conditionnelle", "une probabilité conditionnelle"] }],
          correction:
            "Une branche du second niveau part d'un cépage : on sait déjà de quel cépage il s'agit.\nC'est donc une probabilité « sachant ce cépage » : elle est conditionnelle.\n⛔ Le piège : croire qu'elle dit « cépage et qualité à la fois ». Cela, c'est l'intersection, qui ne se lit pas sur une seule branche.\nRéponse : conditionnelle.",
          micros: ["probaT_arbre_construire"],
        },
        {
          enonce:
            "Une climatologue trace un arbre : au premier niveau, la saison ; au second, la température. Quelle sorte de probabilité porte une branche du PREMIER niveau ? Écris « simple » ou « conditionnelle ».",
          reponses: [{ attendu: ["simple", "une simple", "probabilité simple", "une probabilité simple"] }],
          correction:
            "Une branche du premier niveau part de la racine : on ne sait encore rien.\nElle porte donc une probabilité simple, comme $P(\\text{été})$.\n⛔ Le piège : dire que toutes les branches sont conditionnelles. Seul le second niveau suppose quelque chose de connu.\nRéponse : simple.",
          micros: ["probaT_arbre_construire"],
        },
        {
          enonce:
            "Un gestionnaire de flotte choisit un véhicule au hasard et note $V$ : « le véhicule est électrique » et $L$ : « il est en location ». « Parmi les véhicules électriques, 30 % sont en location. » Quelle probabilité vaut 0,3 ? Écris $P_V(L)$ ou $P_L(V)$. Au clavier, tape PV(L) ou PL(V).",
          reponses: [{ attendu: ["P_V(L)", "PV(L)"], exact: true }],
          correction:
            "« Parmi les véhicules électriques » : la condition est $V$. Elle va en indice.\nDonc $P_V(L) = 0{,}3$. Sur l'arbre, cette branche part de $V$ et va vers $L$.\n⛔ Le piège : écrire $P_L(V)$. Ce nombre se placerait sur un autre arbre, qui commence par la location.\nRéponse : $P_V(L)$, soit PV(L) au clavier.",
          micros: ["probaT_arbre_ponderer"],
        },
        {
          enonce:
            "Un coach compte ses adhérents, et en choisit un au hasard. « Parmi les adhérents du matin, 60 % font de la musculation. » Quelle probabilité porte la branche marquée « ? » ?",
          figure: arbre([
            { label: "Matin", proba: "0,4", enfants: [{ label: "Muscu", proba: "?" }, { label: "Cardio", proba: "…" }] },
            { label: "Soir", proba: "0,6", enfants: [{ label: "Muscu", proba: "0,3" }, { label: "Cardio", proba: "0,7" }] },
          ]),
          reponses: [{ attendu: "0,6" }],
          correction:
            "La branche part de « Matin » et va vers « Muscu » : c'est exactement ce que dit la phrase.\nOn recopie : 60 % s'écrit 0,6.\n⛔ Le piège : calculer $0{,}4 \\times 0{,}6$. Une branche porte la probabilité de la phrase, pas un produit.\nRéponse : 0,6.",
          micros: ["probaT_arbre_ponderer"],
        },
        {
          enonce:
            "Un maraîcher a tracé cet arbre, pour un fruit choisi au hasard. Sur le nœud « Bac 1 », les deux branches ne vont pas : leur somme dépasse 1. La première est juste. Quelle valeur la seconde devrait-elle porter ?",
          figure: arbre([
            { label: "Bac 1", proba: "0,5", enfants: [{ label: "Mûr", proba: "0,3" }, { label: "Pas mûr", proba: "0,8" }] },
            { label: "Bac 2", proba: "0,5", enfants: [{ label: "Mûr", proba: "0,6" }, { label: "Pas mûr", proba: "0,4" }] },
          ]),
          reponses: [{ attendu: "0,7" }],
          correction:
            "$0{,}3 + 0{,}8 = 1{,}1$ : c'est impossible, la somme doit valoir 1.\nLa première est juste, donc la seconde vaut $1 - 0{,}3 = 0{,}7$.\n⛔ Le piège : croire qu'il faut changer aussi le nœud « Bac 2 ». Lui est correct : $0{,}6 + 0{,}4 = 1$.\nRéponse : 0,7.",
          micros: ["probaT_arbre_completer"],
        },
        {
          enonce:
            "Une conductrice note ses trajets, et en choisit un au hasard. Sur l'arbre, la branche qui part de « Bus » et va vers « Heure » porte 0,8. Que traduit ce nombre ? Écris le numéro de la bonne phrase.\n1. Parmi les trajets en bus, 80 % sont à l'heure.\n2. 80 % des trajets sont en bus et à l'heure.\n3. 80 % des trajets sont à l'heure.",
          figure: arbre([
            { label: "Bus", proba: "0,7", enfants: [{ label: "Heure", proba: "0,8" }, { label: "Retard", proba: "0,2" }] },
            { label: "Tram", proba: "0,3", enfants: [{ label: "Heure", proba: "0,9" }, { label: "Retard", proba: "0,1" }] },
          ]),
          reponses: [{ attendu: "1" }],
          correction:
            "La branche part de « Bus » : on se place parmi les trajets en bus.\nC'est la phrase 1 : la probabilité d'être à l'heure, sachant que le trajet est en bus.\n⛔ Le piège : choisir la phrase 2. Elle parle de tous les trajets : c'est une intersection.\nRéponse : 1.",
          micros: ["probaT_arbre_interpreter"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on repère ce qui se place au premier niveau, ce qui se place au second.",
      rappel: [
        "Pour construire : au premier niveau, ce qu'on connaît sur tout le monde. Au second, ce qui est donné « parmi » un groupe.",
        "Depuis des effectifs : au premier niveau, on divise par le total général. Au second, par le total du groupe d'où part la branche.",
        "« À la fois A et B » ne se place sur aucune branche : ce nombre se rapporte à tout le monde.",
      ],
      exercices: [
        {
          enonce:
            "Un épicier a trois producteurs de pommes, et choisit une pomme au hasard. 50 % des pommes viennent du Nord, 30 % de l'Ouest, le reste de l'Est. Pour chaque producteur, on regarde si la pomme est bio ou non.\na) Quelle probabilité porte la branche vers « Est » ?\nb) Combien l'arbre a-t-il de branches en tout ?",
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "a) Trois branches partent de la racine, leur somme vaut 1. $1 - 0{,}5 - 0{,}3 = 0{,}2$.\nb) 3 branches au premier niveau, et 2 branches au second pour chacune : $3 \\times 2 = 6$. En tout, $3 + 6 = 9$ branches.\n⛔ Le piège au b) : répondre 6, le nombre de chemins. On oublie les 3 branches du premier niveau.\nRéponse : a) 0,2 ; b) 9.",
          micros: ["probaT_arbre_construire", "probaT_arbre_completer"],
        },
        {
          enonce:
            "Une opticienne fait le point sur ses ventes (modèle), et en choisit une au hasard. 70 % sont des lunettes de vue, le reste des lunettes de soleil. Parmi les lunettes de vue, 60 % ont un traitement anti-reflets. Parmi les lunettes de soleil, 10 % en ont un.\na) Quelle probabilité porte la branche « Soleil » ?\nb) Quelle probabilité porte la branche qui va de « Vue » à « Sans traitement » ?\nc) Quelle probabilité porte la branche qui va de « Soleil » à « Sans traitement » ?",
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "0,9" },
          ],
          correction:
            "a) $1 - 0{,}7 = 0{,}3$.\nb) Depuis « Vue » : $1 - 0{,}6 = 0{,}4$.\nc) Depuis « Soleil » : $1 - 0{,}1 = 0{,}9$.\n⛔ Le piège : mettre 0,6 et 0,1 sur la même paire de branches, parce que ce sont les deux valeurs de « traitement ». Chacune appartient à son nœud.\nRéponse : a) 0,3 ; b) 0,4 ; c) 0,9.",
          schema: arbre([
            { label: "Vue", proba: "0,7", enfants: [{ label: "Anti-reflets", proba: "0,6" }, { label: "Sans", proba: "0,4" }] },
            { label: "Soleil", proba: "0,3", enfants: [{ label: "Anti-reflets", proba: "0,1" }, { label: "Sans", proba: "0,9" }] },
          ]),
          micros: ["probaT_arbre_ponderer", "probaT_arbre_completer"],
        },
        {
          enonce:
            "Une conseillère bancaire a 800 dossiers (modèle) : 200 sont des prêts immobiliers, les autres des prêts auto. On choisit un dossier au hasard. Parmi les prêts immobiliers, 150 sont acceptés. Parmi les prêts auto, 300 sont acceptés.\na) Quelle probabilité porte la branche « Immobilier » ?\nb) Quelle probabilité porte la branche qui va de « Immobilier » à « Accepté » ?\nc) Quelle probabilité porte la branche qui va de « Auto » à « Accepté » ?",
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,75" },
            { question: "c)", attendu: "0,5" },
          ],
          correction:
            "a) Sur les 800 dossiers : $\\dfrac{200}{800} = 0{,}25$.\nb) Sur les 200 prêts immobiliers : $\\dfrac{150}{200} = 0{,}75$.\nc) Prêts auto : $800 - 200 = 600$. Puis $\\dfrac{300}{600} = 0{,}5$.\n⛔ Le piège au b) : diviser par 800. Cela donnerait la part de tous les dossiers, pas celle des prêts immobiliers.\nRéponse : a) 0,25 ; b) 0,75 ; c) 0,5.",
          micros: ["probaT_arbre_construire"],
        },
        {
          enonce:
            "Un guide choisit un de ses touristes au hasard. On note $M$ : « il visite le musée » et $B$ : « il prend un billet groupé ».\na) Quelle probabilité porte la branche de « M » vers « B » ? Écris $P(M)$, $P_M(B)$ ou $P_B(M)$ (au clavier : P(M), PM(B) ou PB(M)).\nb) Combien vaut-elle ?\nc) Traduis-la : parmi 100 touristes qui visitent le musée, combien en moyenne prennent un billet groupé ?",
          figure: arbre([
            { label: "M", proba: "0,55", enfants: [{ label: "B", proba: "0,4" }, { label: "Pas B", proba: "0,6" }] },
            { label: "Pas M", proba: "0,45", enfants: [{ label: "B", proba: "0,1" }, { label: "Pas B", proba: "0,9" }] },
          ]),
          reponses: [
            { question: "a)", attendu: ["P_M(B)", "PM(B)"], exact: true },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "40" },
          ],
          correction:
            "a) La branche part de $M$ : on sait déjà que le touriste visite le musée. C'est $P_M(B)$.\nb) On lit sur l'arbre : 0,4.\nc) $100 \\times 0{,}4 = 40$ touristes.\n⛔ Le piège au a) : écrire $P_B(M)$. Sur cet arbre, c'est $M$ qui vient d'abord : c'est lui la condition.\nRéponse : a) PM(B) ; b) 0,4 ; c) 40.",
          micros: ["probaT_arbre_interpreter"],
        },
        {
          enonce:
            "Une urbaniste étudie le covoiturage (modèle), et choisit un salarié au hasard. On note $C$ : « le salarié covoiture » et $V$ : « il habite à plus de 20 km ». Elle sait que $P(V) = 0{,}25$, $P_V(C) = 0{,}2$ et $P_{\\overline{V}}(C) = 0{,}6$.\na) Quelle probabilité porte la branche $\\overline{V}$ ?\nb) Quelle probabilité porte la branche de $V$ vers $\\overline{C}$ ?\nc) Quelle probabilité porte la branche de $\\overline{V}$ vers $\\overline{C}$ ?",
          reponses: [
            { question: "a)", attendu: "0,75" },
            { question: "b)", attendu: "0,8" },
            { question: "c)", attendu: "0,4" },
          ],
          correction:
            "a) $1 - 0{,}25 = 0{,}75$.\nb) Depuis $V$ : $1 - 0{,}2 = 0{,}8$.\nc) Depuis $\\overline{V}$ : $1 - 0{,}6 = 0{,}4$.\n⛔ Le piège au c) : calculer $1 - 0{,}2$. Chaque nœud se complète avec sa propre branche voisine.\nRéponse : a) 0,75 ; b) 0,8 ; c) 0,4.",
          schema: arbre([
            { label: "V", proba: "0,25", enfants: [{ label: "C", proba: "0,2" }, { label: "Pas C", proba: "0,8" }] },
            { label: "Pas V", proba: "0,75", enfants: [{ label: "C", proba: "0,6" }, { label: "Pas C", proba: "0,4" }] },
          ]),
          micros: ["probaT_arbre_ponderer", "probaT_arbre_completer"],
        },
        {
          enonce:
            "Une régisseuse de comédie musicale choisit au hasard un membre de la troupe, et lit trois phrases. Le premier niveau de l'arbre est « danseur ou non », le second « a un contrat long ou non ».\n1. 30 % de la troupe sont des danseurs.\n2. Parmi les danseurs, 40 % ont un contrat long.\n3. 12 % de la troupe sont à la fois danseurs et en contrat long.\na) Quelle phrase donne une branche du premier niveau ? Écris son numéro.\nb) Quelle phrase donne une branche du second niveau ? Écris son numéro.\nc) Peut-on écrire le 0,12 de la phrase 3 sur une branche ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) La phrase 1 parle de toute la troupe et d'un seul caractère : premier niveau.\nb) La phrase 2 dit « parmi les danseurs » : second niveau.\nc) Non : la phrase 3 parle de toute la troupe et de deux caractères. Ce nombre ne se pose sur aucune branche.\n⛔ Le piège au c) : poser 0,12 sur la branche qui va vers « contrat long ». Cette branche porte 0,4.\nRéponse : a) 1 ; b) 2 ; c) non.",
          micros: ["probaT_arbre_ponderer", "probaT_arbre_interpreter"],
        },
        {
          enonce:
            "Un réceptionniste compte 400 réservations (modèle) : 320 viennent du site de l'hôtel, les autres d'une agence. On choisit une réservation au hasard. Parmi les réservations du site, 16 sont annulées. Parmi celles d'une agence, 20 sont annulées.\na) Quelle probabilité porte la branche « Site » ?\nb) Quelle probabilité porte la branche de « Site » vers « Annulée » ?\nc) Quelle probabilité porte la branche de « Agence » vers « Annulée » ?",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "0,05" },
            { question: "c)", attendu: "0,25" },
          ],
          correction:
            "a) $\\dfrac{320}{400} = 0{,}8$.\nb) Sur les 320 du site : $\\dfrac{16}{320} = 0{,}05$.\nc) Agence : $400 - 320 = 80$. Puis $\\dfrac{20}{80} = 0{,}25$.\n⛔ Le piège au c) : voir 20 plus grand que 16 et diviser par 400. Au second niveau, on divise par le groupe d'où part la branche.\nRéponse : a) 0,8 ; b) 0,05 ; c) 0,25.",
          micros: ["probaT_arbre_construire"],
        },
        {
          enonce:
            "Une CPE choisit un élève au hasard et note : « Parmi les internes, 80 % déjeunent à la cantine. Parmi les externes, 25 % y déjeunent. 30 % des élèves sont internes. »\na) Quel caractère se place au premier niveau de l'arbre ? Écris « internat » ou « cantine ».\nb) Quelle est la probabilité que l'élève soit externe ?\nc) Sachant que l'élève est externe, quelle est la probabilité qu'il déjeune à la cantine ?",
          reponses: [
            { question: "a)", attendu: ["internat", "l'internat", "interne", "internes"] },
            { question: "b)", attendu: "0,7" },
            { question: "c)", attendu: "0,25" },
          ],
          correction:
            "a) Les phrases disent « parmi les internes », « parmi les externes » : la condition, c'est l'internat. Il vient d'abord.\nb) C'est la branche « Externe » : $1 - 0{,}3 = 0{,}7$.\nc) C'est la branche de « Externe » vers « Cantine ». « Parmi les externes, 25 % » : on recopie 0,25.\n⛔ Le piège au a) : commencer par la cantine, parce que c'est le sujet de la phrase. L'énoncé ne donne aucune probabilité « parmi ceux qui mangent à la cantine ».\nRéponse : a) internat ; b) 0,7 ; c) 0,25.",
          micros: ["probaT_arbre_construire"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "L'arbre entier : on le construit, on le vérifie nœud par nœud, on le traduit en phrases.",
      rappel: [
        "On construit dans l'ordre : le premier niveau, puis le second, nœud par nœud.",
        "On vérifie : sur chaque nœud, la somme des branches vaut 1.",
        "Selon le caractère placé d'abord, on obtient un autre arbre, avec d'autres nombres.",
      ],
      exercices: [
        {
          titre: "Les urgences de nuit",
          enonce:
            "Une médecin étudie 1 000 passages aux urgences (modèle) : 400 la nuit, 600 le jour. Parmi ceux de nuit, 100 mènent à une hospitalisation. Parmi ceux de jour, 240. On choisit un passage au hasard.\nDonne la probabilité portée par chaque branche.\na) La branche « Nuit ».\nb) La branche « Jour ».\nc) La branche de « Nuit » vers « Hospitalisé ».\nd) La branche de « Jour » vers « Hospitalisé ».\ne) La branche de « Jour » vers « Rentre ».",
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,6" },
            { question: "c)", attendu: "0,25" },
            { question: "d)", attendu: "0,4" },
            { question: "e)", attendu: "0,6" },
          ],
          correction:
            "a) $\\dfrac{400}{1\\,000} = 0{,}4$.\nb) $1 - 0{,}4 = 0{,}6$.\nc) $\\dfrac{100}{400} = 0{,}25$.\nd) $\\dfrac{240}{600} = 0{,}4$.\ne) $1 - 0{,}4 = 0{,}6$.\n⛔ Le piège au c) : diviser 100 par 1 000. Sur une branche du second niveau, le tout est le groupe d'où elle part.\nRéponse : a) 0,4 ; b) 0,6 ; c) 0,25 ; d) 0,4 ; e) 0,6.",
          schema: arbre([
            { label: "Nuit", proba: "0,4", enfants: [{ label: "Hospit.", proba: "0,25" }, { label: "Rentre", proba: "0,75" }] },
            { label: "Jour", proba: "0,6", enfants: [{ label: "Hospit.", proba: "0,4" }, { label: "Rentre", proba: "0,6" }] },
          ]),
          micros: ["probaT_arbre_construire", "probaT_arbre_ponderer"],
        },
        {
          titre: "Trois destinations",
          enonce:
            "Un agent de voyages vend trois destinations (modèle). 45 % des clients partent à la montagne, 35 % à la mer, les autres à la campagne. Parmi les clients de la montagne, 20 % prennent une assurance. Parmi ceux de la mer, 40 %. Parmi ceux de la campagne, 5 %. On choisit un client au hasard.\na) Quelle probabilité porte la branche « Campagne » ?\nb) Quelle probabilité porte la branche de « Mer » vers « Sans assurance » ?\nc) Quelle probabilité porte la branche de « Campagne » vers « Sans assurance » ?\nd) Combien l'arbre a-t-il de chemins ?",
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,6" },
            { question: "c)", attendu: "0,95" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "a) $1 - 0{,}45 - 0{,}35 = 0{,}2$.\nb) Depuis « Mer » : $1 - 0{,}4 = 0{,}6$.\nc) Depuis « Campagne » : $1 - 0{,}05 = 0{,}95$.\nd) 3 destinations, 2 issues pour chacune : $3 \\times 2 = 6$ chemins.\n⛔ Le piège au a) : penser que c'est forcément $1 - 0{,}45$. Avec trois branches, on retire les deux autres.\nRéponse : a) 0,2 ; b) 0,6 ; c) 0,95 ; d) 6.",
          schema: arbre([
            { label: "Montagne", proba: "0,45", enfants: [{ label: "Assuré", proba: "0,2" }, { label: "Sans", proba: "0,8" }] },
            { label: "Mer", proba: "0,35", enfants: [{ label: "Assuré", proba: "0,4" }, { label: "Sans", proba: "0,6" }] },
            { label: "Campagne", proba: "0,2", enfants: [{ label: "Assuré", proba: "0,05" }, { label: "Sans", proba: "0,95" }] },
          ]),
          micros: ["probaT_arbre_construire", "probaT_arbre_ponderer"],
        },
        {
          titre: "L'arbre à corriger",
          enonce:
            "Un contrôleur de l'industrie automobile vérifie l'arbre d'un stagiaire. L'énoncé disait : « 75 % des pièces viennent de l'atelier A, les autres de l'atelier B. Parmi celles de A, 10 % ont un défaut. Parmi celles de B, 30 % ont un défaut. On choisit une pièce au hasard. »\na) La branche « B » est fausse. Quelle valeur doit-elle porter ?\nb) La branche de « A » vers « Défaut » est fausse : le stagiaire y a mis 0,075. Quelle valeur doit-elle porter ?\nc) La branche de « A » vers « Bon » est fausse. Quelle valeur doit-elle porter ?\nd) Le nœud « B » est-il juste ? Réponds oui ou non.",
          figure: arbre([
            { label: "A", proba: "0,75", enfants: [{ label: "Défaut", proba: "0,075" }, { label: "Bon", proba: "0,1" }] },
            { label: "B", proba: "0,35", enfants: [{ label: "Défaut", proba: "0,3" }, { label: "Bon", proba: "0,7" }] },
          ]),
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,1" },
            { question: "c)", attendu: "0,9" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $1 - 0{,}75 = 0{,}25$.\nb) « Parmi celles de A, 10 % » : on recopie 0,1. Le 0,075 est le produit $0{,}75 \\times 0{,}1$, qui n'a pas sa place sur une branche.\nc) $1 - 0{,}1 = 0{,}9$.\nd) Oui : l'énoncé donne 30 % et $0{,}3 + 0{,}7 = 1$.\n⛔ Le piège au b) : garder un produit sur une branche. Une branche du second niveau porte une conditionnelle.\nRéponse : a) 0,25 ; b) 0,1 ; c) 0,9 ; d) oui.",
          micros: ["probaT_arbre_completer", "probaT_arbre_interpreter"],
        },
        {
          titre: "Deux arbres pour un port",
          enonce:
            "Une mareyeuse compte 500 caisses de poissons (modèle) : sur 200 caisses de bar, 150 sont de première qualité ; sur 300 caisses de thon, 100 le sont. On choisit une caisse au hasard. On note $B$ : « c'est du bar » et $Q$ : « c'est de première qualité ».\nPremier arbre, l'espèce d'abord.\na) Quelle probabilité porte la branche $B$ ?\nb) Quelle probabilité porte la branche de $B$ vers $Q$ ?\nSecond arbre, la qualité d'abord.\nc) Quelle probabilité porte la branche $Q$ ?\nd) Quelle probabilité porte la branche de $Q$ vers $B$ ?",
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,75" },
            { question: "c)", attendu: "0,5" },
            { question: "d)", attendu: "0,6" },
          ],
          correction:
            "a) $\\dfrac{200}{500} = 0{,}4$.\nb) Parmi les 200 caisses de bar : $\\dfrac{150}{200} = 0{,}75$.\nc) Première qualité : $150 + 100 = 250$ caisses. $\\dfrac{250}{500} = 0{,}5$.\nd) Parmi ces 250 caisses : $\\dfrac{150}{250} = 0{,}6$.\n⛔ Le piège au d) : recopier 0,75. $P_B(Q)$ et $P_Q(B)$ ne sont pas sur le même arbre.\nRéponse : a) 0,4 ; b) 0,75 ; c) 0,5 ; d) 0,6.",
          micros: ["probaT_arbre_construire", "probaT_arbre_interpreter"],
        },
      ],
    },
  ],
};
