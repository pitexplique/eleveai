// ─── Fiche d'exercices : indépendance de deux évènements (STMG, Tle) — 20 exercices ─
//
// Notion proba_independance du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// Le coach demande : $P_A(B) = P(B)$ ; $P(A \cap B) = P(A) \times P(B)$ pour calculer,
// ou pour retrouver une probabilité ; justifier sur un tableau ou un arbre ; ne pas
// confondre indépendants et incompatibles.
//
// Aucune donnée réelle : tous les chiffres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : soutien scolaire (professeure), café (barista), serveurs
// informatiques (administrateur), parapente (moniteur), théâtre de rue (comédienne),
// dés (mathématiques nues, ex. 6), boulangerie bio (meunier), jeu de pièces (ex. 8) ;
// médiathèque (bibliothécaire), jeu vidéo (développeuse), maternité (sage-femme),
// réseau d'électricité (électricienne), avions (pilote), collecte de sang (médecin),
// abeilles (apicultrice), magasin de vélos (réparateur) ; recrutement (DRH), deux
// machines d'imprimerie (imprimeur), plateforme de vidéos (analyste), ferme laitière
// (agricultrice).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaT_indep_definition (1, 2, 7, 11, 16, 20), probaT_indep_produit
// (3, 4, 5, 12, 13, 18), probaT_indep_justifier (9, 10, 11, 16, 17, 18, 20),
// probaT_indep_incompatible (6, 8, 14, 15, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";
import { croise } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesProbaIndependanceStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-independance",
  titre: "Indépendance de deux évènements",
  accroche:
    "Vingt exercices pour savoir si un évènement change quelque chose à un autre : comparer $P_A(B)$ et $P(B)$, utiliser le produit, justifier sur un tableau ou sur un arbre, et ne plus confondre indépendants et incompatibles. Un recrutement, une collecte de sang, des abeilles, un jeu vidéo. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : comparer deux probabilités, faire un produit, reconnaître l'incompatibilité.",
      rappel: [
        "A et B sont indépendants si savoir que A est réalisé ne change rien pour B : $P_A(B) = P(B)$.",
        "Si A et B sont indépendants : $P(A \\cap B) = P(A) \\times P(B)$.",
        "Sur un arbre : si les branches vers C portent la même valeur depuis les deux nœuds, C est indépendant du premier niveau.",
        "Incompatibles : A et B ne peuvent pas arriver ensemble, $P(A \\cap B) = 0$. Si leurs probabilités ne sont pas nulles, ils ne sont pas indépendants.",
      ],
      exercices: [
        {
          enonce:
            "Une professeure choisit un élève au hasard et note $A$ : « l'élève suit le soutien du mardi » et $B$ : « il a la moyenne ». Elle trouve $P_A(B) = 0{,}3$ et $P(B) = 0{,}3$. $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.",
          reponses: [{ attendu: "oui" }],
          correction:
            "On compare $P_A(B)$ et $P(B)$ : les deux valent 0,3.\nSavoir que $A$ est réalisé ne change donc rien pour $B$ : ils sont indépendants.\n⛔ Le piège : croire qu'indépendants veut dire « sans rapport dans la vie ». Ici, c'est le calcul qui décide.\nRéponse : oui.",
          micros: ["probaT_indep_definition"],
        },
        {
          enonce:
            "Une barista choisit un client au hasard et note $A$ : « le client commande avant 9 h » et $B$ : « il prend un café noir ». Elle trouve $P_A(B) = 0{,}4$ et $P(B) = 0{,}5$. $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "On compare : $P_A(B) = 0{,}4$ et $P(B) = 0{,}5$. Ces deux nombres sont différents.\nSavoir que le client vient avant 9 h change la probabilité : ils ne sont pas indépendants.\n⛔ Le piège : trouver l'écart petit et dire « presque ». L'indépendance demande l'égalité.\nRéponse : non.",
          micros: ["probaT_indep_definition"],
        },
        {
          enonce:
            "Un administrateur a deux serveurs indépendants. Le premier tombe en panne avec la probabilité 0,5 cette année, le second avec la probabilité 0,2. Quelle est la probabilité que les deux tombent en panne cette année ?",
          reponses: [{ attendu: "0,1" }],
          correction:
            "Les évènements sont indépendants : on multiplie.\n$0{,}5 \\times 0{,}2 = 0{,}1$.\n⛔ Le piège : additionner et trouver 0,7. L'addition ne répond pas à « les deux à la fois ».\nRéponse : 0,1.",
          micros: ["probaT_indep_produit"],
        },
        {
          enonce:
            "Un moniteur de parapente note $A$ : « il y a du vent » et $B$ : « un client annule ». Ces deux évènements sont indépendants, avec $P(A) = 0{,}8$ et $P(B) = 0{,}25$. Calcule $P(A \\cap B)$.",
          reponses: [{ attendu: "0,2" }],
          correction:
            "$A$ et $B$ sont indépendants, donc $P(A \\cap B) = P(A) \\times P(B)$.\n$0{,}8 \\times 0{,}25 = 0{,}2$.\n⛔ Le piège : appliquer ce produit sans vérifier qu'on a le droit. Il ne vaut que pour des évènements indépendants, et l'énoncé le dit ici.\nRéponse : 0,2.",
          micros: ["probaT_indep_produit"],
        },
        {
          enonce:
            "Une comédienne de rue étudie deux évènements indépendants $A$ et $B$, avec $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}12$. Que vaut $P(B)$ ?",
          reponses: [{ attendu: "0,3" }],
          correction:
            "Comme $A$ et $B$ sont indépendants : $0{,}4 \\times P(B) = 0{,}12$.\nDonc $P(B) = 0{,}12 \\div 0{,}4 = 0{,}3$.\nVérification : $0{,}4 \\times 0{,}3 = 0{,}12$. ✔\n⛔ Le piège : calculer $0{,}12 \\times 0{,}4$. On cherche un facteur : on divise.\nRéponse : 0,3.",
          micros: ["probaT_indep_produit"],
        },
        {
          enonce:
            "On lance un dé. $A$ : « le résultat est pair », $B$ : « le résultat est impair ».\na) Ces évènements peuvent-ils arriver ensemble ? Réponds oui ou non.\nb) Sont-ils indépendants ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) Un résultat ne peut pas être à la fois pair et impair : non, $A$ et $B$ sont incompatibles.\nb) $P(A) = 0{,}5$ et $P(B) = 0{,}5$, donc le produit vaut 0,25. Or $P(A \\cap B) = 0$. Ils ne sont pas indépendants.\n⛔ Le piège au b) : penser qu'« ils n'ont rien en commun » veut dire « indépendants ». C'est le contraire : savoir que $A$ est réalisé rend $B$ impossible.\nRéponse : a) non ; b) non.",
          micros: ["probaT_indep_incompatible"],
        },
        {
          enonce:
            "Un meunier suit la qualité de ses farines, pour un sac choisi au hasard. D'après cet arbre, « Bio » est-il indépendant de « Moulin » ? Réponds oui ou non.",
          figure: arbre([
            { label: "Moulin 1", proba: "0,7", enfants: [{ label: "Bio", proba: "0,3" }, { label: "Non", proba: "0,7" }] },
            { label: "Moulin 2", proba: "0,3", enfants: [{ label: "Bio", proba: "0,3" }, { label: "Non", proba: "0,7" }] },
          ]),
          reponses: [{ attendu: "oui" }],
          correction:
            "Depuis les deux moulins, la branche vers « Bio » porte la même valeur : 0,3.\nSavoir de quel moulin vient la farine ne change rien : c'est l'indépendance.\n⛔ Le piège : regarder 0,7 et 0,3 au premier niveau et dire que les moulins diffèrent. On compare les branches du SECOND niveau.\nRéponse : oui.",
          micros: ["probaT_indep_definition"],
        },
        {
          enonce:
            "On lance une pièce deux fois. $A$ : « Pile au premier lancer », $B$ : « Pile au second lancer ». Ces évènements sont-ils indépendants ou incompatibles ? Écris « indépendants » ou « incompatibles ».",
          reponses: [{ attendu: ["indépendants", "indépendant", "ils sont indépendants"] }],
          correction:
            "Les deux évènements peuvent arriver ensemble : Pile puis Pile. Ils ne sont pas incompatibles.\nLe premier lancer ne change rien au second : ils sont indépendants.\n⛔ Le piège : prendre un mot pour l'autre. Incompatibles : jamais ensemble. Indépendants : l'un ne renseigne pas sur l'autre.\nRéponse : indépendants.",
          micros: ["probaT_indep_incompatible"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Justifier par un calcul : on écrit les nombres, on compare, on conclut.",
      rappel: [
        "Pour justifier sur un tableau : on calcule $P(A)$, $P(B)$ et $P(A \\cap B)$, puis on compare $P(A \\cap B)$ et $P(A) \\times P(B)$.",
        "Égalité : indépendants. Pas d'égalité : pas indépendants.",
        "Incompatibles : on cherche d'abord si les deux peuvent arriver ensemble.",
      ],
      exercices: [
        {
          enonce:
            "Une bibliothécaire étudie 1 000 emprunts (modèle). On en choisit un au hasard. On note $A$ : « l'emprunteur est un enfant » et $B$ : « l'emprunt est une bande dessinée ».\na) Calcule $P(A)$.\nb) Calcule $P(B)$.\nc) Calcule $P(A \\cap B)$.\nd) $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.",
          figure: croise(["Emprunteur", "BD", "Autre", "Total"], [
            ["Enfant", 200, 200, 400],
            ["Adulte", 300, 300, 600],
            ["Total", 500, 500, 1000],
          ]),
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,5" },
            { question: "c)", attendu: "0,2" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $\\dfrac{400}{1\\,000} = 0{,}4$.\nb) $\\dfrac{500}{1\\,000} = 0{,}5$.\nc) $\\dfrac{200}{1\\,000} = 0{,}2$.\nd) $0{,}4 \\times 0{,}5 = 0{,}2$ : le produit est égal à $P(A \\cap B)$. Oui, ils sont indépendants.\n⛔ Le piège : conclure avant de calculer, en se disant que les enfants lisent forcément plus de BD. Dans ce tableau, ce n'est pas le cas.\nRéponse : a) 0,4 ; b) 0,5 ; c) 0,2 ; d) oui.",
          micros: ["probaT_indep_justifier"],
        },
        {
          enonce:
            "Une développeuse de jeu vidéo étudie 500 joueurs (modèle). On en choisit un au hasard. On note $A$ : « il joue sur téléphone » et $B$ : « il a acheté une extension ».\na) Calcule $P(A) \\times P(B)$.\nb) Calcule $P(A \\cap B)$.\nc) $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.",
          figure: croise(["Joueur", "Extension", "Sans", "Total"], [
            ["Téléphone", 120, 80, 200],
            ["Console", 130, 170, 300],
            ["Total", 250, 250, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,24" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $P(A) = \\dfrac{200}{500} = 0{,}4$ et $P(B) = \\dfrac{250}{500} = 0{,}5$. Puis $0{,}4 \\times 0{,}5 = 0{,}2$.\nb) $\\dfrac{120}{500} = 0{,}24$.\nc) $0{,}24$ et $0{,}2$ sont différents : non, ils ne sont pas indépendants.\n⛔ Le piège : voir 120 et 130, deux nombres proches, et conclure à l'indépendance. Seule la comparaison des probabilités tranche.\nRéponse : a) 0,2 ; b) 0,24 ; c) non.",
          micros: ["probaT_indep_justifier"],
        },
        {
          enonce:
            "Une sage-femme lit cet arbre (modèle), pour un accouchement choisi au hasard. On note $J$ : « ce sont des jumeaux » et $C$ : « l'accouchement a lieu la nuit ».\na) Quelle est la valeur de $P_J(C)$, la branche de « Jumeaux » vers « Nuit » ?\nb) Calcule $P(C)$ avec les deux chemins.\nc) $C$ est-il indépendant de $J$ ? Réponds oui ou non.",
          figure: arbre([
            { label: "Jumeaux", proba: "0,1", enfants: [{ label: "Nuit", proba: "0,4" }, { label: "Jour", proba: "0,6" }] },
            { label: "Un bébé", proba: "0,9", enfants: [{ label: "Nuit", proba: "0,4" }, { label: "Jour", proba: "0,6" }] },
          ]),
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) On lit la branche : 0,4.\nb) $0{,}1 \\times 0{,}4 + 0{,}9 \\times 0{,}4 = 0{,}04 + 0{,}36 = 0{,}4$.\nc) $P_J(C) = P(C) = 0{,}4$ : oui, ils sont indépendants.\n⛔ Le piège au b) : calculer $0{,}4 + 0{,}4 = 0{,}8$. Chaque chemin se multiplie d'abord par le premier niveau.\nRéponse : a) 0,4 ; b) 0,4 ; c) oui.",
          micros: ["probaT_indep_definition", "probaT_indep_justifier"],
        },
        {
          enonce:
            "Une électricienne suit deux lignes indépendantes (modèle). La ligne A fonctionne avec la probabilité 0,9, la ligne B avec la probabilité 0,8.\na) Quelle est la probabilité que les deux fonctionnent ?\nb) Sur 1 000 jours, combien de jours les deux fonctionnent-elles, en moyenne ?",
          reponses: [
            { question: "a)", attendu: "0,72" },
            { question: "b)", attendu: "720" },
          ],
          correction:
            "a) Indépendantes : $0{,}9 \\times 0{,}8 = 0{,}72$.\nb) $1\\,000 \\times 0{,}72 = 720$ jours.\n⛔ Le piège au a) : choisir le plus petit des deux, 0,8. Avoir deux conditions à remplir fait baisser la probabilité.\nRéponse : a) 0,72 ; b) 720.",
          micros: ["probaT_indep_produit"],
        },
        {
          enonce:
            "Une pilote note $A$ : « il y a du vent à l'aller » et $B$ : « il y a du vent au retour ». On admet qu'ils sont indépendants, avec $P(A) = 0{,}5$ et $P(A \\cap B) = 0{,}15$.\na) Calcule $P(B)$.\nb) Que vaut $P_A(B)$ ?",
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,3" },
          ],
          correction:
            "a) $0{,}5 \\times P(B) = 0{,}15$, donc $P(B) = 0{,}15 \\div 0{,}5 = 0{,}3$.\nb) $A$ et $B$ sont indépendants, donc $P_A(B) = P(B) = 0{,}3$.\n⛔ Le piège au b) : garder 0,15. Ce nombre est $P(A \\cap B)$, sur tout l'ensemble, pas sur ceux qui ont vu $A$.\nRéponse : a) 0,3 ; b) 0,3.",
          micros: ["probaT_indep_produit"],
        },
        {
          enonce:
            "Un médecin de la collecte de sang choisit un donneur au hasard. Il note $D$ : « le donneur est du groupe O » et $G$ : « il est du groupe A ». On admet $P(D) = 0{,}3$ et $P(G) = 0{,}4$ (modèle). Un donneur n'a qu'un groupe.\na) Que vaut $P(D \\cap G)$ ?\nb) Que vaut $P(D) \\times P(G)$ ?\nc) Ces évènements sont-ils incompatibles, indépendants, ou les deux ? Écris « incompatibles », « indépendants » ou « les deux ».",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "0,12" },
            { question: "c)", attendu: ["incompatibles", "incompatible", "ils sont incompatibles"] },
          ],
          correction:
            "a) Un donneur ne peut pas être des deux groupes : $P(D \\cap G) = 0$.\nb) $0{,}3 \\times 0{,}4 = 0{,}12$.\nc) 0 et 0,12 sont différents : ils ne sont pas indépendants. Ils sont seulement incompatibles.\n⛔ Le piège au c) : répondre « les deux ». Avec des probabilités non nulles, incompatibles et indépendants s'excluent.\nRéponse : a) 0 ; b) 0,12 ; c) incompatibles.",
          micros: ["probaT_indep_incompatible"],
        },
        {
          enonce:
            "Une apicultrice compare des couples d'évènements sur ses ruches. Pour chaque cas, écris le numéro de la bonne réponse : 1 pour incompatibles, 2 pour indépendants, 3 pour ni l'un ni l'autre à coup sûr.\na) Pour une même ruche : « elle est vide » et « elle est pleine ».\nb) On tire au hasard une ruche AVEC remise, deux fois : « la première est vide » et « la seconde est vide ».\nc) Pour une même ruche : « elle est en forêt » et « elle est pleine », sans autre information.",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) Une ruche ne peut pas être vide et pleine en même temps : incompatibles.\nb) Avec remise, le premier tirage ne change rien au second : indépendants.\nc) Une ruche peut être en forêt et pleine : pas incompatibles. Rien ne garantit l'indépendance : il faudrait la vérifier par un calcul.\n⛔ Le piège au c) : dire « indépendants » parce que les deux n'ont pas l'air liés. L'indépendance se calcule, elle ne se devine pas.\nRéponse : a) 1 ; b) 2 ; c) 3.",
          micros: ["probaT_indep_incompatible"],
        },
        {
          enonce:
            "Un réparateur de vélos étudie 400 vélos (modèle). On en choisit un au hasard. On note $A$ : « c'est un vélo électrique » et $B$ : « il revient pour une crevaison ».\na) Calcule $P(B)$.\nb) Calcule $P_A(B)$.\nc) $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.",
          figure: croise(["Vélo", "Crevaison", "Autre motif", "Total"], [
            ["Électrique", 30, 70, 100],
            ["Classique", 90, 210, 300],
            ["Total", 120, 280, 400],
          ]),
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,3" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) $\\dfrac{120}{400} = 0{,}3$.\nb) Parmi les 100 vélos électriques : $\\dfrac{30}{100} = 0{,}3$.\nc) $P_A(B) = P(B)$ : oui, ils sont indépendants.\n⛔ Le piège : voir que 90 est plus grand que 30 et conclure que les vélos classiques crèvent plus. Ils sont aussi trois fois plus nombreux.\nRéponse : a) 0,3 ; b) 0,3 ; c) oui.",
          micros: ["probaT_indep_definition", "probaT_indep_justifier"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une question de la vie réelle : on la traduit en évènements, on calcule, on conclut par une phrase.",
      rappel: [
        "On nomme d'abord les évènements A et B.",
        "On compare, puis on répond à la question posée.",
        "Être indépendant ne veut pas dire être sans lien dans la vie : le calcul décrit seulement ces données.",
      ],
      exercices: [
        {
          titre: "L'embauche",
          enonce:
            "Une DRH examine 300 candidatures (modèle). On en choisit une au hasard. On note $F$ : « c'est une candidate » et $E$ : « la personne est embauchée ».\na) Calcule $P_F(E)$.\nb) Calcule $P(E)$.\nc) $F$ et $E$ sont-ils indépendants ? Réponds oui ou non.\nd) Un syndicat dit : « On embauche plus d'hommes (45 contre 30), donc les femmes ont moins de chances. » Cette phrase est-elle juste sur ces données ? Réponds vrai ou faux.",
          figure: croise(["Candidature", "Embauchée", "Non retenue", "Total"], [
            ["Femme", 30, 90, 120],
            ["Homme", 45, 135, 180],
            ["Total", 75, 225, 300],
          ]),
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $\\dfrac{30}{120} = 0{,}25$.\nb) $\\dfrac{75}{300} = 0{,}25$.\nc) $P_F(E) = P(E)$ : oui, ils sont indépendants.\nd) Faux : les hommes ont aussi candidaté plus nombreux. La probabilité d'être embauché vaut 0,25 dans les deux groupes.\n⛔ Le piège au d) : comparer 45 et 30, deux effectifs de groupes de tailles différentes.\nRéponse : a) 0,25 ; b) 0,25 ; c) oui ; d) faux.",
          micros: ["probaT_indep_justifier"],
        },
        {
          titre: "Les deux machines",
          enonce:
            "Un imprimeur a deux machines. La machine A tombe en panne un jour donné avec la probabilité 0,1, la machine B avec la probabilité 0,2 (modèle). Sur 1 000 jours, les deux étaient en panne ensemble 40 jours.\na) Si les pannes étaient indépendantes, quelle serait la probabilité d'une double panne ?\nb) Quelle probabilité observe-t-on ?\nc) Les pannes sont-elles indépendantes d'après ces données ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,02" },
            { question: "b)", attendu: "0,04" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $0{,}1 \\times 0{,}2 = 0{,}02$.\nb) $\\dfrac{40}{1\\,000} = 0{,}04$.\nc) 0,04 et 0,02 sont différents : non. La double panne arrive deux fois plus souvent que prévu, peut-être à cause d'un problème commun, comme une coupure de courant.\n⛔ Le piège : utiliser le produit sans se demander s'il vaut ici. On ne peut multiplier que pour des évènements indépendants.\nRéponse : a) 0,02 ; b) 0,04 ; c) non.",
          micros: ["probaT_indep_produit", "probaT_indep_justifier"],
        },
        {
          titre: "La plateforme de vidéos",
          enonce:
            "Un analyste étudie une plateforme (modèle). On choisit un abonné au hasard. $A$ : « il a un compte gratuit », avec $P(A) = 0{,}6$. $B$ : « il a un compte payant », avec $P(B) = 0{,}4$. Un abonné a un seul compte. Puis on tire deux abonnés au hasard, avec remise. $C$ : « le premier a un compte gratuit », $D$ : « le second a un compte payant ».\na) Que vaut $P(A \\cap B)$ ?\nb) $A$ et $B$ sont-ils incompatibles ? Réponds oui ou non.\nc) $A$ et $B$ sont-ils indépendants ? Réponds oui ou non.\nd) $C$ et $D$ sont-ils indépendants ? Réponds oui ou non.\ne) Calcule $P(C \\cap D)$.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "0,24" },
          ],
          correction:
            "a) Un abonné a un seul compte : $P(A \\cap B) = 0$.\nb) Oui : $A$ et $B$ ne peuvent pas arriver ensemble.\nc) Non : $0{,}6 \\times 0{,}4 = 0{,}24$, et ce nombre n'est pas 0.\nd) Oui : avec remise, le premier tirage ne change rien au second.\ne) $0{,}6 \\times 0{,}4 = 0{,}24$.\n⛔ Le piège : confondre les deux situations. Mêmes nombres, même produit, mais un seul abonné pour $A$ et $B$, et deux abonnés pour $C$ et $D$.\nRéponse : a) 0 ; b) oui ; c) non ; d) oui ; e) 0,24.",
          micros: ["probaT_indep_incompatible"],
        },
        {
          titre: "La ferme laitière",
          enonce:
            "Une agricultrice a deux troupeaux (modèle), et prélève au hasard un litre de son lait. Le troupeau 1 fournit 60 % du lait. Une analyse montre que 70 % du lait du troupeau 1 est de qualité A, et 70 % du lait du troupeau 2 aussi. Après un changement de fourrage dans le troupeau 2, ce taux y tombe à 50 %.\nAvant le changement :\na) Calcule la probabilité que le lait soit de qualité A.\nb) La qualité A est-elle indépendante du troupeau ? Réponds oui ou non.\nAprès le changement :\nc) Calcule la probabilité que le lait soit de qualité A.\nd) La qualité A est-elle indépendante du troupeau ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "0,62" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $0{,}6 \\times 0{,}7 + 0{,}4 \\times 0{,}7 = 0{,}42 + 0{,}28 = 0{,}7$.\nb) Depuis les deux troupeaux, la branche vaut 0,7 : oui.\nc) $0{,}6 \\times 0{,}7 + 0{,}4 \\times 0{,}5 = 0{,}42 + 0{,}2 = 0{,}62$.\nd) La branche vaut 0,7 depuis le troupeau 1 et 0,62 en tout : non.\n⛔ Le piège au d) : garder « oui » parce que le troupeau 1 n'a pas changé. Dès que les deux branches diffèrent (0,7 et 0,5), l'indépendance tombe.\nRéponse : a) 0,7 ; b) oui ; c) 0,62 ; d) non.",
          schema: arbre([
            { label: "Troupeau 1", proba: "0,6", enfants: [{ label: "A", proba: "0,7" }, { label: "Non", proba: "0,3" }] },
            { label: "Troupeau 2", proba: "0,4", enfants: [{ label: "A", proba: "0,5" }, { label: "Non", proba: "0,5" }] },
          ]),
          micros: ["probaT_indep_definition", "probaT_indep_justifier"],
        },
      ],
    },
  ],
};
