// ─── Fiche d'exercices : loi binomiale, reconnaître (STMG, terminale) — 20 exercices ─
//
// Notion va_binomiale_reconnaitre du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// demande : les conditions (nombre fixé, épreuves identiques et indépendantes,
// X compte les succès), les paramètres de B(n ; p) et leur relecture, {X = k} sur
// un arbre (S et E, n ⩽ 3), la probabilité d'un chemin (produit), et ce qui n'est
// PAS binomial (sans remise, jusqu'au premier succès, probabilité qui change,
// fréquence). Le calcul de P(X = k) avec un coefficient appartient à
// va_binomiale_calcul ; ici on additionne seulement des chemins de l'arbre.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives.
//
// Domaines et métiers : fleuristerie (fleuriste), pâtisserie (pâtissière), centre
// d'appels (téléconseillère), contrôle technique (garagiste), banque (conseiller),
// vaccination (infirmier), basket (Salomé), recrutement (recruteuse), sommellerie
// (sommelière), natation (Malik), conserverie (contrôleur), fromagerie (fromager),
// assistance informatique (technicien), golf (golfeuse), aéroport (agent), atelier
// de jeux (animatrice), cabinet médical (médecin), parfumerie (parfumeur), forêt
// (forestière), comptabilité (comptable).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Micro-compétences : vaT_bin_reconnaitre (1, 11, 14, 16, 20), vaT_bin_parametres
// (3, 4, 5, 14, 15, 16, 17, 18, 19, 20), vaT_bin_arbre (6, 7, 9, 10, 17),
// vaT_bin_contre_exemple (2, 8, 11, 12, 13, 16, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";

export const exercicesVaBinomialeReconnaitreStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-binomiale-reconnaitre",
  titre: "Loi binomiale : reconnaître",
  accroche:
    "Vingt exercices pour savoir quand la loi binomiale s'applique : vérifier les conditions, lire les deux paramètres dans un énoncé, repérer l'évènement sur un arbre, calculer la probabilité d'un chemin, et démasquer les situations qui n'en relèvent pas. Une salle d'attente, des flacons de parfum, des arbres malades, des vols en retard, un parcours de golf. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : vérifier une condition, lire un paramètre, ou compter sur un arbre.",
      rappel: [
        "$X$ suit une loi binomiale si : le nombre d'épreuves est fixé d'avance, les épreuves sont identiques et indépendantes, chacune a deux issues, et $X$ compte les succès.",
        "$\\mathcal{B}(n\\,;\\,p)$ : $n$ est le nombre de répétitions, $p$ la probabilité de succès d'UNE épreuve.",
        "Sur l'arbre (S = succès, E = échec), l'évènement $\\{X = k\\}$ regroupe tous les chemins qui contiennent exactement $k$ fois S.",
        "Un tirage SANS remise dans un petit lot n'est pas indépendant : ce n'est pas une loi binomiale.",
      ],
      exercices: [
        {
          enonce:
            "Une fleuriste prépare $12$ bouquets, de façon indépendante. Chacun est vendu dans la journée avec la probabilité $0{,}3$. $X$ compte les bouquets vendus. $X$ suit-elle une loi binomiale ? Réponds oui ou non.",
          reponses: [{ attendu: "oui" }],
          correction:
            "Un nombre fixé d'épreuves : $12$.\nIdentiques et indépendantes, de même probabilité $0{,}3$.\n$X$ compte les succès.\n⛔ Le piège : refuser parce que $p$ n'est pas $0{,}5$. La loi binomiale accepte n'importe quelle probabilité.\nRéponse : oui.",
          micros: ["vaT_bin_reconnaitre"],
        },
        {
          enonce:
            "Une pâtissière prélève au hasard $5$ éclairs SANS REMISE dans une boîte de $10$, et $X$ compte les éclairs abîmés. $X$ suit-elle une loi binomiale ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "Chaque éclair retiré change la composition de la boîte.\nLa probabilité du tirage suivant change donc : les épreuves ne sont pas indépendantes.\n⛔ Le piège : répondre oui parce que $X$ compte bien quelque chose. Il faut aussi l'indépendance.\nRéponse : non.",
          micros: ["vaT_bin_contre_exemple"],
        },
        {
          enonce:
            "Une téléconseillère appelle $30$ clients, de façon indépendante. Chacun souscrit avec la probabilité $0{,}2$. $X$ compte les clients qui souscrivent et suit la loi $\\mathcal{B}(n\\,;\\,p)$.\na) Que vaut $n$ ?\nb) Que vaut $p$ ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "0,2" },
          ],
          correction:
            "a) $n$ est le nombre de répétitions : $30$ appels.\nb) $p$ est la probabilité de succès d'un appel : $0{,}2$.\n⛔ Le piège : inverser les deux. Une probabilité ne vaut jamais $30$.\nRéponse : a) 30 ; b) 0,2.",
          micros: ["vaT_bin_parametres"],
        },
        {
          enonce:
            "Un garagiste suit $16$ voitures au contrôle technique, de façon indépendante. Une voiture doit passer une contre-visite dans $25$ % des cas (modèle). $X$ compte ces voitures.\na) Que vaut $n$ ?\nb) Que vaut $p$ ?",
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "0,25" },
          ],
          correction:
            "a) $16$ voitures suivies : $n = 16$.\nb) $25$ %, c'est $0{,}25$ : $p = 0{,}25$.\n⛔ Le piège au b) : garder $25$. Le paramètre $p$ est une probabilité, entre $0$ et $1$.\nRéponse : a) 16 ; b) 0,25.",
          micros: ["vaT_bin_parametres"],
        },
        {
          enonce:
            "Un conseiller bancaire étudie $X$, le nombre d'emprunteurs qui remboursent en retard. $X$ suit la loi $\\mathcal{B}(40\\,;\\,0{,}15)$. Écris la bonne lettre.\nA : le nombre d'emprunteurs examinés.\nB : la probabilité qu'un emprunteur rembourse en retard.\nC : le nombre moyen d'emprunteurs en retard.\na) Que représente $40$ ?\nb) Que représente $0{,}15$ ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "a) Le premier paramètre compte les répétitions : les $40$ emprunteurs examinés.\nb) Le second porte sur UN emprunteur : c'est sa probabilité d'être en retard.\n⛔ Le piège : choisir C. Le nombre moyen se calcule à partir des deux paramètres, ce n'est aucun des deux.\nRéponse : a) A ; b) B.",
          micros: ["vaT_bin_parametres"],
        },
        {
          enonce:
            "Un infirmier reçoit $2$ patients, de façon indépendante. S = « le patient est déjà vacciné », E = le contraire. $X$ compte les S. Combien de chemins de l'arbre réalisent l'évènement $\\{X = 1\\}$ ?",
          figure: arbre([
            { label: "S", proba: "0,6", enfants: [{ label: "S", proba: "0,6" }, { label: "E", proba: "0,4" }] },
            { label: "E", proba: "0,4", enfants: [{ label: "S", proba: "0,6" }, { label: "E", proba: "0,4" }] },
          ]),
          reponses: [{ attendu: "2" }],
          correction:
            "Les quatre chemins sont SS, SE, ES et EE.\nExactement une fois S : SE et ES, soit $2$ chemins.\n⛔ Le piège : répondre $1$ en ne voyant que SE. Le succès peut arriver au premier ou au second patient.\nRéponse : 2.",
          micros: ["vaT_bin_arbre"],
        },
        {
          enonce:
            "Salomé tire $3$ lancers francs, de façon indépendante. S = « réussi », E = « manqué ». $X$ compte les S. Écris tous les chemins de l'évènement $\\{X = 2\\}$, séparés par « ; » (exemple d'écriture : SEE).",
          figure: arbre([
            { label: "S", proba: "0,7", enfants: [
              { label: "S", proba: "0,7", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
              { label: "E", proba: "0,3", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
            ] },
            { label: "E", proba: "0,3", enfants: [
              { label: "S", proba: "0,7", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
              { label: "E", proba: "0,3", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
            ] },
          ]),
          reponses: [{ attendu: "SSE ; SES ; ESS" }],
          correction:
            "On garde les chemins qui ont exactement deux S et un E.\nLe E peut être à la fin, au milieu ou au début : SSE, SES et ESS.\n⛔ Le piège : ajouter SSS. Il a trois S : il appartient à $\\{X = 3\\}$.\nRéponse : SSE ; SES ; ESS.",
          micros: ["vaT_bin_arbre"],
        },
        {
          enonce:
            "Une recruteuse appelle des candidats un par un jusqu'au premier qui accepte le poste, et $X$ compte les appels. Quelle condition de la loi binomiale manque ? Écris la lettre.\nA : l'indépendance des épreuves.\nB : un nombre de répétitions fixé à l'avance.\nC : la même probabilité de succès à chaque épreuve.",
          reponses: [{ attendu: "B" }],
          correction:
            "Elle s'arrête au premier succès : on ne sait pas d'avance combien d'appels elle fera.\nLe nombre d'épreuves n'est donc pas fixé.\n⛔ Le piège : choisir A. Les appels sont bien indépendants ; c'est leur NOMBRE qui manque.\nRéponse : B.",
          micros: ["vaT_bin_contre_exemple"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : vérifier les conditions, puis lire les paramètres ou suivre un chemin.",
      rappel: [
        "La probabilité d'un chemin est le PRODUIT des probabilités de ses branches. Tous les chemins qui ont le même nombre de S ont la même probabilité.",
        "$P(X = k)$ : on additionne les probabilités de tous les chemins de $\\{X = k\\}$.",
        "Sans remise : après un tirage, il reste un élément de moins, et un succès de moins si le tirage était un succès. La probabilité change.",
        "$p$ est la probabilité de ce que $X$ compte. Une FRÉQUENCE n'est pas un comptage : ce n'est pas une variable binomiale.",
      ],
      exercices: [
        {
          enonce:
            "Une sommelière contrôle $3$ bouteilles, de façon indépendante (modèle). S = « le bouchon a un défaut », avec la probabilité $0{,}4$, E = le contraire. Calcule la probabilité du chemin « SES ».",
          figure: arbre([
            { label: "S", proba: "0,4", enfants: [
              { label: "S", proba: "0,4", enfants: [{ label: "S", proba: "0,4" }, { label: "E", proba: "0,6" }] },
              { label: "E", proba: "0,6", enfants: [{ label: "S", proba: "0,4" }, { label: "E", proba: "0,6" }] },
            ] },
            { label: "E", proba: "0,6", enfants: [
              { label: "S", proba: "0,4", enfants: [{ label: "S", proba: "0,4" }, { label: "E", proba: "0,6" }] },
              { label: "E", proba: "0,6", enfants: [{ label: "S", proba: "0,4" }, { label: "E", proba: "0,6" }] },
            ] },
          ]),
          reponses: [{ attendu: "0,096" }],
          correction:
            "On multiplie les probabilités le long du chemin.\nS, puis E, puis S : $0{,}4 \\times 0{,}6 \\times 0{,}4 = 0{,}096$.\n⛔ Le piège : additionner ($0{,}4 + 0{,}6 + 0{,}4 = 1{,}4$). Une probabilité ne dépasse jamais $1$.\nRéponse : 0,096.",
          micros: ["vaT_bin_arbre"],
        },
        {
          enonce:
            "Malik, nageur, dispute $2$ courses indépendantes (modèle). S = « il se qualifie », avec la probabilité $0{,}7$, E = le contraire. $X$ compte les S.\na) Combien de chemins réalisent $\\{X = 2\\}$ ?\nb) Calcule la probabilité du chemin SS.\nc) Calcule la probabilité du chemin ES.\nd) Calcule $P(X = 1)$.",
          figure: arbre([
            { label: "S", proba: "0,7", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
            { label: "E", proba: "0,3", enfants: [{ label: "S", proba: "0,7" }, { label: "E", proba: "0,3" }] },
          ]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "0,49" },
            { question: "c)", attendu: "0,21" },
            { question: "d)", attendu: "0,42" },
          ],
          correction:
            "a) Deux succès : seul SS convient, soit $1$ chemin.\nb) $0{,}7 \\times 0{,}7 = 0{,}49$.\nc) $0{,}3 \\times 0{,}7 = 0{,}21$.\nd) $\\{X = 1\\}$ regroupe SE et ES, de même probabilité $0{,}21$ : $0{,}21 + 0{,}21 = 0{,}42$.\n⛔ Le piège au d) : s'arrêter à $0{,}21$. Il y a deux chemins à un succès.\nRéponse : a) 1 ; b) 0,49 ; c) 0,21 ; d) 0,42.",
          micros: ["vaT_bin_arbre"],
        },
        {
          enonce:
            "Un contrôleur de conserverie étudie des boîtes de conserve dans une palette. Dans quel cas $X$ suit-elle une loi binomiale ? Écris la lettre.\nA : il prélève au hasard $5$ boîtes SANS REMISE dans une palette de $20$, et $X$ compte les boîtes abîmées.\nB : il prélève au hasard $5$ boîtes AVEC REMISE, et $X$ compte les boîtes abîmées.\nC : il prélève au hasard des boîtes une par une jusqu'à la première abîmée, et $X$ compte les boîtes prélevées.\nD : il prélève au hasard $5$ boîtes AVEC REMISE, et $X$ est la FRÉQUENCE des boîtes abîmées.",
          reponses: [{ attendu: "B" }],
          correction:
            "On teste les conditions sur chaque cas.\nA : sans remise, il n'y a pas d'indépendance. C : le nombre d'épreuves n'est pas fixé. D : une fréquence n'est pas un comptage.\nSeul B vérifie tout.\n⛔ Le piège : choisir D. La situation est la bonne, mais $X$ ne compte pas les succès : il les divise par $5$.\nRéponse : B.",
          micros: ["vaT_bin_reconnaitre", "vaT_bin_contre_exemple"],
        },
        {
          enonce:
            "Un fromager a $12$ fromages, dont $4$ abîmés. Il en tire deux au hasard, SANS REMISE. Le premier est abîmé. Arrondis au centième.\na) Quelle était la probabilité de tirer un fromage abîmé au départ ?\nb) Quelle est maintenant la probabilité que le second soit abîmé ?\nc) Les deux tirages sont-ils indépendants ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,33", tolerance: 0.005 },
            { question: "b)", attendu: "0,27", tolerance: 0.005 },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $\\dfrac{4}{12} \\approx 0{,}33$.\nb) Il reste $3$ fromages abîmés sur $11$ : $\\dfrac{3}{11} \\approx 0{,}27$.\nc) La probabilité a changé : les tirages ne sont pas indépendants.\n⛔ Le piège au b) : enlever le fromage abîmé mais garder $12$ au total. Il y a aussi un fromage de moins dans le lot.\nRéponse : a) 0,33 ; b) 0,27 ; c) non.",
          micros: ["vaT_bin_contre_exemple"],
        },
        {
          enonce:
            "Un technicien d'assistance suit $12$ appels indépendants : $6$ le matin, résolus chacun avec la probabilité $0{,}1$, puis $6$ l'après-midi, résolus chacun avec la probabilité $0{,}4$ (modèle). $X$ compte les appels résolus.\na) $X$ suit-elle une loi binomiale ? Réponds oui ou non.\nb) Quelle phrase justifie ta réponse ? Écris la lettre.\nA : les épreuves ne sont pas indépendantes.\nB : le nombre d'épreuves n'est pas fixé.\nC : la probabilité n'est pas la même à chaque épreuve.\nD : toutes les conditions sont vérifiées.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "C" },
          ],
          correction:
            "a) La probabilité passe de $0{,}1$ à $0{,}4$ : les épreuves ne sont pas identiques. Ce n'est pas une loi binomiale.\nb) La condition qui manque est la même probabilité à chaque épreuve : C.\n⛔ Le piège : choisir B parce qu'il y a deux séries. Le nombre total, $12$, est bien fixé d'avance.\nRéponse : a) non ; b) C.",
          micros: ["vaT_bin_contre_exemple"],
        },
        {
          enonce:
            "Une golfeuse joue $8$ coups roulés, de façon indépendante. Chacun rentre avec la probabilité $0{,}6$ (modèle). $X$ compte les coups réussis.\na) $X$ suit-elle une loi binomiale ? Réponds oui ou non.\nb) Que vaut $n$ ?\nc) Que vaut $p$ ?\nd) Quelle est la plus grande valeur possible de $X$ ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "0,6" },
            { question: "d)", attendu: "8" },
          ],
          correction:
            "a) Nombre fixé, épreuves identiques et indépendantes, $X$ compte les succès : oui.\nb) $n = 8$.\nc) $p = 0{,}6$.\nd) Au mieux, tous les coups réussissent : $8$.\n⛔ Le piège au d) : répondre $n \\times p$. C'est une moyenne, pas la valeur la plus grande.\nRéponse : a) oui ; b) 8 ; c) 0,6 ; d) 8.",
          micros: ["vaT_bin_reconnaitre", "vaT_bin_parametres"],
        },
        {
          enonce:
            "Un agent d'aéroport suit $20$ vols, de façon indépendante. $10$ % des vols partent en retard (modèle). $X$ compte les vols qui partent À L'HEURE, et suit la loi $\\mathcal{B}(n\\,;\\,p)$.\na) Que vaut $n$ ?\nb) Que vaut $p$ ?",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "0,9" },
          ],
          correction:
            "a) $20$ vols suivis : $n = 20$.\nb) $X$ compte les vols à l'heure : le succès, c'est « à l'heure ». Sa probabilité est $1 - 0{,}1 = 0{,}9$.\n⛔ Le piège au b) : répondre $0{,}1$, la probabilité du retard. $p$ est la probabilité de ce que $X$ compte.\nRéponse : a) 20 ; b) 0,9.",
          micros: ["vaT_bin_parametres"],
        },
        {
          enonce:
            "Une animatrice d'atelier de jeux a un sac de $20$ jetons, dont $8$ rouges. On tire $5$ jetons au hasard, AVEC REMISE. $X$ compte les jetons rouges.\na) $X$ suit-elle une loi binomiale ? Réponds oui ou non.\nb) Que vaut $n$ ?\nc) Que vaut $p$ ?\nd) Si l'on tirait SANS remise, $X$ suivrait-elle encore une loi binomiale ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "0,4" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) Avec remise, le sac reste le même : les tirages sont identiques et indépendants. Oui.\nb) $5$ tirages : $n = 5$.\nc) $p = 8 \\div 20 = 0{,}4$.\nd) Sans remise, le sac change à chaque tirage : non.\n⛔ Le piège au b) : prendre $n = 20$. $20$ est le nombre de jetons du sac, $n$ est le nombre de tirages.\nRéponse : a) oui ; b) 5 ; c) 0,4 ; d) non.",
          micros: ["vaT_bin_reconnaitre", "vaT_bin_parametres", "vaT_bin_contre_exemple"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : vérifier les conditions, poser les paramètres, puis raisonner sur l'arbre.",
      rappel: [
        "On répond dans l'ordre : quel est le succès ? combien d'épreuves ? toutes indépendantes et identiques ? $X$ compte-t-elle les succès ?",
        "Un arbre à $n$ épreuves a $2^n$ chemins.",
        "$P(X = k)$ = nombre de chemins à $k$ succès × probabilité d'un de ces chemins.",
      ],
      exercices: [
        {
          titre: "La salle d'attente",
          enonce:
            "Une médecin attend $3$ patients, de façon indépendante (modèle). Chacun est absent avec la probabilité $0{,}2$. S = « absent », E = « présent », et $X$ compte les S.\na) Que vaut $n$ ?\nb) Que vaut $p$ ?\nc) Combien de chemins compte l'arbre en tout ?\nd) Combien de chemins réalisent $\\{X = 1\\}$ ?\ne) Calcule la probabilité du chemin ESE.\nf) Calcule $P(X = 1)$.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "0,2" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "3" },
            { question: "e)", attendu: "0,128" },
            { question: "f)", attendu: "0,384" },
          ],
          correction:
            "a) $3$ patients : $n = 3$.\nb) Le succès est l'absence : $p = 0{,}2$.\nc) $2^3 = 8$ chemins.\nd) SEE, ESE et EES : $3$ chemins.\ne) $0{,}8 \\times 0{,}2 \\times 0{,}8 = 0{,}128$.\nf) Les $3$ chemins ont la même probabilité : $3 \\times 0{,}128 = 0{,}384$.\n⛔ Le piège au e) : prendre $0{,}2$ pour E. Ici le succès, c'est l'absence : E porte $0{,}8$.\nRéponse : a) 3 ; b) 0,2 ; c) 8 ; d) 3 ; e) 0,128 ; f) 0,384.",
          micros: ["vaT_bin_parametres", "vaT_bin_arbre"],
        },
        {
          titre: "Les flacons du parfumeur",
          enonce:
            "Un parfumeur a un carton de $15$ flacons, dont $6$ fêlés. Il en prélève $4$ au hasard, SANS REMISE, et $X$ compte les flacons fêlés.\na) Quelle condition de la loi binomiale manque ? Écris la lettre. A : l'indépendance. B : un nombre fixé d'épreuves. C : deux issues par épreuve.\nb) Quelle est la probabilité de tirer un flacon fêlé au premier tirage ?\nc) Le premier flacon est fêlé. Quelle est la probabilité que le deuxième le soit aussi ? Arrondis au centième.\nd) S'il tirait AVEC remise, que vaudrait $n$ ?\ne) Et que vaudrait $p$ ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "0,36", tolerance: 0.005 },
            { question: "d)", attendu: "4" },
            { question: "e)", attendu: "0,4" },
          ],
          correction:
            "a) Sans remise, le carton change : pas d'indépendance.\nb) $6 \\div 15 = 0{,}4$.\nc) Il reste $5$ flacons fêlés sur $14$ : $\\dfrac{5}{14} \\approx 0{,}36$. La probabilité a changé.\nd) $4$ tirages : $n = 4$.\ne) Le carton ne change plus : $p = 0{,}4$ à chaque tirage.\n⛔ Le piège au d) : prendre $n = 15$. $n$ compte les tirages, pas les flacons du carton.\nRéponse : a) A ; b) 0,4 ; c) 0,36 ; d) 4 ; e) 0,4.",
          micros: ["vaT_bin_contre_exemple", "vaT_bin_parametres"],
        },
        {
          titre: "Les arbres de la parcelle",
          enonce:
            "Une forestière examine $50$ arbres, de façon indépendante. $X$ compte les arbres malades et suit la loi $\\mathcal{B}(50\\,;\\,0{,}04)$ (modèle).\na) Combien d'arbres examine-t-elle ?\nb) Quelle est la probabilité qu'un arbre donné soit malade ?\nc) Quelle est la plus grande valeur possible de $X$ ?\nd) « $X$ peut valoir $0$ ». Réponds vrai ou faux.\ne) « $0{,}04$ est la probabilité qu'au moins un arbre des $50$ soit malade ». Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "0,04" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "vrai" },
            { question: "e)", attendu: "faux" },
          ],
          correction:
            "a) Le premier paramètre : $50$ arbres.\nb) Le second paramètre porte sur UN arbre : $0{,}04$.\nc) Au pire, les $50$ sont malades : $50$.\nd) Il peut n'y avoir aucun arbre malade : vrai.\ne) $0{,}04$ concerne un seul arbre, pas les $50$ : faux.\n⛔ Le piège au e) : relire $p$ comme une probabilité sur l'ensemble. $p$ ne concerne qu'UNE épreuve.\nRéponse : a) 50 ; b) 0,04 ; c) 50 ; d) vrai ; e) faux.",
          micros: ["vaT_bin_parametres"],
        },
        {
          titre: "Trois situations, trois verdicts",
          enonce:
            "Une comptable examine trois situations (modèle). $X$ suit-elle une loi binomiale ? Réponds oui ou non.\na) Elle examine $20$ factures, de façon indépendante. Chacune est payée en retard avec la probabilité $0{,}15$. $X$ compte les factures en retard.\nb) Pour ces mêmes factures, $X$ est la fréquence des factures en retard.\nc) Elle tire au hasard $5$ factures SANS REMISE dans un dossier de $8$. $X$ compte les factures en retard.\nPour la situation a), donne maintenant :\nd) la valeur de $n$ ;\ne) la valeur de $p$.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "20" },
            { question: "e)", attendu: "0,15" },
          ],
          correction:
            "a) Toutes les conditions sont vérifiées : oui.\nb) Une fréquence vaut le nombre de succès divisé par $20$ : ce n'est pas un comptage. Non.\nc) Sans remise dans un petit dossier : pas d'indépendance. Non.\nd) $n = 20$.\ne) $p = 0{,}15$.\n⛔ Le piège au b) : répondre oui parce que la situation est la même qu'au a). Il faut aussi que $X$ COMPTE les succès.\nRéponse : a) oui ; b) non ; c) non ; d) 20 ; e) 0,15.",
          micros: ["vaT_bin_reconnaitre", "vaT_bin_contre_exemple", "vaT_bin_parametres"],
        },
      ],
    },
  ],
};
