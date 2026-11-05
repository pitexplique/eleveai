// ─── Fiche d'exercices : coefficients binomiaux, triangle de Pascal (STMG, terminale) — 20 exercices ─
//
// Notion va_binomiale_coefficients du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// définit le coefficient comme un NOMBRE DE CHEMINS d'un arbre, le lit dans le
// triangle (ligne n, colonne k, n ⩽ 10), additionne deux termes de la ligne
// précédente (formule de Pascal) ou soustrait (formule remontée), utilise la
// symétrie, la somme d'une ligne (2 puissance n), et dénombre sur un arbre pour
// n ⩽ 4, « au moins » et « au plus » compris. ⛔ JAMAIS de factorielle.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives.
//
// Domaines et métiers : des calculs nus (ex. 1 à 4, 7, 8 et 17) ; coiffure (coiffeuse),
// pizzeria (pizzaïolo), maintenance de panneaux (technicien), volley (coach),
// service client (superviseuse), gestion de projet (cheffe de projet), musique
// (Aurélie), échecs (Bastien), éolien (technicienne), théâtre (régisseur, Léo),
// drones (pilote), archives (archiviste), biathlon (biathlète).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Micro-compétences : vaT_coef_definition (1, 9, 14, 16), vaT_triangle_pascal
// (2, 3, 4, 8, 10, 13, 17, 20), vaT_formule_pascal (7, 8, 12, 13, 17, 19),
// vaT_coef_denombrer (5, 6, 11, 15, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/stmg-arbre";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

/** Le triangle de Pascal, ligne par ligne, écrit en clair (relu par le script de recalcul). */
const LIGNES = [
  "1",
  "1 1",
  "1 2 1",
  "1 3 3 1",
  "1 4 6 4 1",
  "1 5 10 10 5 1",
  "1 6 15 20 15 6 1",
  "1 7 21 35 35 21 7 1",
  "1 8 28 56 70 56 28 8 1",
  "1 9 36 84 126 126 84 36 9 1",
  "1 10 45 120 210 252 210 120 45 10 1",
];
const triangle = (nMax: number) => grille(["Ligne", "Colonnes 0, 1, 2… de gauche à droite"], LIGNES.slice(0, nMax + 1).map((l, n) => [n, l]));

export const exercicesVaBinomialeCoefficientsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-binomiale-coefficients",
  titre: "Coefficients binomiaux et triangle de Pascal",
  accroche:
    "Vingt exercices pour compter les chemins d'un arbre : comprendre ce que compte un coefficient binomial, le lire dans le triangle de Pascal, construire une ligne à partir de la précédente, utiliser la symétrie, et dénombrer « au moins » et « au plus ». Des drones de livraison, un biathlon, un tournoi d'échecs, un vieux cahier d'archives. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire le triangle, compter sur un arbre, ou additionner deux termes.",
      rappel: [
        "$\\binom{n}{k}$ est le NOMBRE de chemins à $k$ succès dans un arbre de $n$ épreuves. C'est un entier, pas une probabilité.",
        "Dans le triangle de Pascal, on lit la ligne $n$, puis la colonne $k$. Les deux se comptent à partir de $0$. Chaque ligne commence et finit par $1$.",
        "Formule de Pascal : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$. Chaque terme est la somme de deux termes voisins de la ligne du dessus.",
      ],
      exercices: [
        {
          enonce:
            "Un arbre représente $4$ épreuves indépendantes (S = succès, E = échec). Que représente $\\binom{4}{2}$ ? Écris la lettre.\nA : le nombre de chemins de l'arbre comportant exactement $2$ fois S.\nB : la probabilité d'obtenir exactement $2$ succès.\nC : le quotient de $4$ par $2$.",
          reponses: [{ attendu: "A" }],
          correction:
            "Le coefficient binomial COMPTE des chemins.\n$\\binom{4}{2}$ compte ceux qui ont exactement $2$ succès sur $4$ épreuves.\n⛔ Le piège : choisir B. Un coefficient est un entier, souvent plus grand que $1$ : ce n'est pas une probabilité.\nRéponse : A.",
          micros: ["vaT_coef_definition"],
        },
        {
          enonce: "À l'aide du triangle de Pascal, détermine $\\binom{5}{2}$.",
          figure: triangle(6),
          reponses: [{ attendu: "10" }],
          correction:
            "On lit la ligne $5$ : $1$, $5$, $10$, $10$, $5$, $1$.\nOn compte les colonnes à partir de $0$ : colonne $0$ : $1$ ; colonne $1$ : $5$ ; colonne $2$ : $10$.\n⛔ Le piège : compter les colonnes à partir de $1$ et répondre $5$. La première colonne porte le numéro $0$.\nRéponse : 10.",
          micros: ["vaT_triangle_pascal"],
        },
        {
          enonce: "À l'aide du triangle de Pascal, détermine :\na) $\\binom{6}{0}$\nb) $\\binom{6}{6}$",
          figure: triangle(6),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "1" },
          ],
          correction:
            "a) Colonne $0$ de la ligne $6$ : $1$. Aucun succès : un seul chemin, EEEEEE.\nb) Dernière colonne de la ligne $6$ : $1$. Que des succès : un seul chemin, SSSSSS.\n⛔ Le piège : répondre $0$ au a). Zéro succès est possible, et il y a bien un chemin pour cela.\nRéponse : a) 1 ; b) 1.",
          micros: ["vaT_triangle_pascal"],
        },
        {
          enonce: "À l'aide du triangle de Pascal, détermine :\na) $\\binom{7}{1}$\nb) $\\binom{7}{3}$",
          figure: triangle(7),
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "35" },
          ],
          correction:
            "La ligne $7$ est : $1$, $7$, $21$, $35$, $35$, $21$, $7$, $1$.\na) Colonne $1$ : $7$. Un seul succès peut tomber à chacune des $7$ places.\nb) Colonne $3$ : $35$.\n⛔ Le piège au b) : lire la ligne $3$ et la colonne $7$. Le nombre du haut, $n$, donne la ligne.\nRéponse : a) 7 ; b) 35.",
          micros: ["vaT_triangle_pascal"],
        },
        {
          enonce:
            "Une coiffeuse reçoit $2$ clients, de façon indépendante. S = « il prend une couleur », E = le contraire. $X$ compte les S. Compte sur l'arbre les chemins de l'évènement $\\{X = 1\\}$.",
          figure: arbre([
            { label: "S", proba: "0,3", enfants: [{ label: "S", proba: "0,3" }, { label: "E", proba: "0,7" }] },
            { label: "E", proba: "0,7", enfants: [{ label: "S", proba: "0,3" }, { label: "E", proba: "0,7" }] },
          ]),
          reponses: [{ attendu: "2" }],
          correction:
            "Les chemins sont SS, SE, ES et EE.\nExactement un S : SE et ES, soit $2$ chemins.\nOn retrouve $\\binom{2}{1} = 2$.\n⛔ Le piège : compter SE et ES comme un seul chemin. L'ordre change le chemin.\nRéponse : 2.",
          micros: ["vaT_coef_denombrer"],
        },
        {
          enonce:
            "Un pizzaïolo livre $3$ pizzas, de façon indépendante. S = « à l'heure », E = « en retard ». Compte sur l'arbre les chemins à $0$, $1$, $2$ et $3$ succès. Écris les quatre nombres dans cet ordre, séparés par « ; ».",
          figure: arbre([
            { label: "S", proba: "0,8", enfants: [
              { label: "S", proba: "0,8", enfants: [{ label: "S", proba: "0,8" }, { label: "E", proba: "0,2" }] },
              { label: "E", proba: "0,2", enfants: [{ label: "S", proba: "0,8" }, { label: "E", proba: "0,2" }] },
            ] },
            { label: "E", proba: "0,2", enfants: [
              { label: "S", proba: "0,8", enfants: [{ label: "S", proba: "0,8" }, { label: "E", proba: "0,2" }] },
              { label: "E", proba: "0,2", enfants: [{ label: "S", proba: "0,8" }, { label: "E", proba: "0,2" }] },
            ] },
          ]),
          reponses: [{ attendu: "1 ; 3 ; 3 ; 1", ordre: true }],
          correction:
            "$0$ succès : EEE, soit $1$ chemin.\n$1$ succès : SEE, ESE, EES, soit $3$ chemins.\n$2$ succès : SSE, SES, ESS, soit $3$ chemins.\n$3$ succès : SSS, soit $1$ chemin.\nC'est la ligne $3$ du triangle.\n⛔ Le piège : oublier les chemins où le succès n'est pas en tête, comme EES.\nRéponse : 1 ; 3 ; 3 ; 1.",
          micros: ["vaT_coef_denombrer"],
        },
        {
          enonce:
            "On sait que $\\binom{5}{1} = 5$ et que $\\binom{5}{2} = 10$. La formule de Pascal donne $\\binom{6}{2} = \\binom{5}{1} + \\binom{5}{2}$. Calcule $\\binom{6}{2}$.",
          reponses: [{ attendu: "15" }],
          correction:
            "On remplace dans la formule, puis on additionne.\n$\\binom{6}{2} = 5 + 10 = 15$.\n⛔ Le piège : multiplier les deux termes. La formule de Pascal est une somme.\nRéponse : 15.",
          micros: ["vaT_formule_pascal"],
        },
        {
          enonce:
            "La ligne $4$ du triangle de Pascal est : $1$ ; $4$ ; $6$ ; $4$ ; $1$. Écris la ligne $5$, en séparant les nombres par « ; ».",
          reponses: [{ attendu: "1 ; 5 ; 10 ; 10 ; 5 ; 1", ordre: true }],
          correction:
            "La ligne commence et finit par $1$.\nEntre les deux, on additionne deux voisins de la ligne $4$ :\n$1 + 4 = 5$ ; $4 + 6 = 10$ ; $6 + 4 = 10$ ; $4 + 1 = 5$.\n⛔ Le piège : oublier le dernier $1$. La ligne $5$ a six nombres.\nRéponse : 1 ; 5 ; 10 ; 10 ; 5 ; 1.",
          micros: ["vaT_triangle_pascal", "vaT_formule_pascal"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : traduire la question en chemins, puis lire ou calculer le coefficient.",
      rappel: [
        "Symétrie : un chemin à $k$ succès sur $n$ épreuves a $n-k$ échecs, donc $\\binom{n}{k} = \\binom{n}{n-k}$.",
        "La somme de la ligne $n$ vaut $2^n$ : c'est le nombre total de chemins de l'arbre.",
        "« Au moins $k$ » ou « au plus $k$ » réunit plusieurs valeurs de $X$ : on additionne leurs coefficients.",
        "Formule remontée : si l'on connaît la somme et un terme, l'autre s'obtient par soustraction.",
      ],
      exercices: [
        {
          enonce:
            "Un technicien contrôle $9$ panneaux solaires, de façon indépendante (S = « en bon état »). Il y a $\\binom{9}{2} = 36$ chemins comportant exactement $2$ succès.\na) Un chemin à $7$ succès sur $9$ comporte combien d'échecs ?\nb) Sans triangle, que vaut $\\binom{9}{7}$ ?",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "36" },
          ],
          correction:
            "a) $9 - 7 = 2$ échecs.\nb) Placer $7$ succès revient à placer les $2$ échecs : $\\binom{9}{7} = \\binom{9}{2} = 36$.\n⛔ Le piège au b) : croire que ce nombre est différent parce que $7$ est plus grand que $2$. Ce sont les mêmes chemins, décrits autrement.\nRéponse : a) 2 ; b) 36.",
          micros: ["vaT_coef_definition"],
        },
        {
          enonce:
            "Le coach d'une équipe de volley note les $6$ prochains matchs : S = « gagné », E = « perdu ». Un arbre représente ces $6$ matchs.\na) Calcule la somme de la ligne $6$ du triangle.\nb) Combien l'arbre compte-t-il de chemins en tout ?",
          figure: triangle(6),
          reponses: [
            { question: "a)", attendu: "64" },
            { question: "b)", attendu: "64" },
          ],
          correction:
            "a) $1 + 6 + 15 + 20 + 15 + 6 + 1 = 64$.\nb) Chaque match double le nombre de chemins : $2^6 = 64$. Les deux calculs se rejoignent, car chaque chemin a un nombre de succès et un seul.\n⛔ Le piège au b) : répondre $12$ ($2 \\times 6$). On double $6$ fois de suite : c'est une puissance.\nRéponse : a) 64 ; b) 64.",
          micros: ["vaT_triangle_pascal"],
        },
        {
          enonce:
            "Une superviseuse écoute $4$ appels d'un service client, de façon indépendante. S = « résolu au premier contact ». $X$ compte les S.\na) Combien de chemins comportent au moins $2$ succès ?\nb) Combien de chemins comportent au plus $1$ succès ?",
          figure: triangle(4),
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "5" },
          ],
          correction:
            "La ligne $4$ donne les chemins à $0$, $1$, $2$, $3$, $4$ succès : $1$, $4$, $6$, $4$, $1$.\na) Au moins $2$ : $k = 2$, $3$ ou $4$. $6 + 4 + 1 = 11$.\nb) Au plus $1$ : $k = 0$ ou $1$. $1 + 4 = 5$.\nVérification : $11 + 5 = 16 = 2^4$. ✔\n⛔ Le piège au a) : ne prendre que $k = 2$. « Au moins » réunit tout ce qui est au-dessus.\nRéponse : a) 11 ; b) 5.",
          micros: ["vaT_coef_denombrer"],
        },
        {
          enonce:
            "Une cheffe de projet observe $7$ tâches indépendantes. On sait que $\\binom{7}{2} = 21$ et que $\\binom{8}{3} = 56$. Avec la formule de Pascal $\\binom{8}{3} = \\binom{7}{2} + \\binom{7}{3}$, retrouve $\\binom{7}{3}$ sans triangle.",
          reponses: [{ attendu: "35" }],
          correction:
            "On écrit la relation : $56 = 21 + \\binom{7}{3}$.\nOn isole le terme manquant : $\\binom{7}{3} = 56 - 21 = 35$.\n⛔ Le piège : additionner et trouver $77$. Ici, la somme est connue : on soustrait.\nRéponse : 35.",
          micros: ["vaT_formule_pascal"],
        },
        {
          enonce:
            "Aurélie écrit des rythmes de $8$ temps. Chaque temps est frappé (S) ou silencieux (E) : un rythme est donc un chemin d'un arbre à $8$ épreuves. La ligne $7$ est : $1$ ; $7$ ; $21$ ; $35$ ; $35$ ; $21$ ; $7$ ; $1$.\na) Écris la ligne $8$, en séparant les nombres par « ; ».\nb) Combien de rythmes de $8$ temps ont exactement $4$ temps frappés ?",
          reponses: [
            { question: "a)", attendu: "1 ; 8 ; 28 ; 56 ; 70 ; 56 ; 28 ; 8 ; 1", ordre: true },
            { question: "b)", attendu: "70" },
          ],
          correction:
            "a) On additionne les voisins : $1 + 7 = 8$ ; $7 + 21 = 28$ ; $21 + 35 = 56$ ; $35 + 35 = 70$ ; puis la ligne se répète en miroir : $56$, $28$, $8$. Elle commence et finit par $1$.\nb) C'est $\\binom{8}{4}$, colonne $4$ de la ligne $8$ : $70$.\n⛔ Le piège au b) : prendre le quatrième nombre écrit, $56$. Les colonnes commencent à $0$ : la colonne $4$ est le cinquième nombre.\nRéponse : a) 1 ; 8 ; 28 ; 56 ; 70 ; 56 ; 28 ; 8 ; 1 ; b) 70.",
          micros: ["vaT_triangle_pascal", "vaT_formule_pascal"],
        },
        {
          enonce:
            "Bastien joue $5$ parties d'échecs dans un tournoi (S = « gagnée », E = « non gagnée »).\na) Que vaut $\\binom{5}{3}$ ?\nb) Combien de chemins de l'arbre comportent exactement $2$ échecs, c'est-à-dire $2$ parties non gagnées ?",
          figure: triangle(5),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "10" },
          ],
          correction:
            "a) Ligne $5$, colonne $3$ : $10$.\nb) $2$ E sur $5$ parties, c'est $3$ S : ce sont les mêmes chemins. Il y en a donc $10$.\n⛔ Le piège au b) : confondre $2$ échecs et $2$ succès. Ici les deux donnent $10$ grâce à la symétrie, mais on raisonne d'abord sur ce que compte la question.\nRéponse : a) 10 ; b) 10.",
          micros: ["vaT_coef_definition"],
        },
        {
          enonce:
            "Une technicienne vérifie $3$ éoliennes, de façon indépendante. S = « elle tourne », E = « à l'arrêt ».\na) Écris tous les chemins comportant au moins $2$ succès, séparés par « ; » (exemple d'écriture : SEE).\nb) Combien y en a-t-il ?",
          figure: arbre([
            { label: "S", proba: "0,9", enfants: [
              { label: "S", proba: "0,9", enfants: [{ label: "S", proba: "0,9" }, { label: "E", proba: "0,1" }] },
              { label: "E", proba: "0,1", enfants: [{ label: "S", proba: "0,9" }, { label: "E", proba: "0,1" }] },
            ] },
            { label: "E", proba: "0,1", enfants: [
              { label: "S", proba: "0,9", enfants: [{ label: "S", proba: "0,9" }, { label: "E", proba: "0,1" }] },
              { label: "E", proba: "0,1", enfants: [{ label: "S", proba: "0,9" }, { label: "E", proba: "0,1" }] },
            ] },
          ]),
          reponses: [
            { question: "a)", attendu: "SSS ; SSE ; SES ; ESS" },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "a) Trois S : SSS. Exactement deux S : SSE, SES, ESS.\nb) $1 + 3 = 4$ chemins, soit $\\binom{3}{3} + \\binom{3}{2}$.\n⛔ Le piège au a) : oublier SSS. « Au moins $2$ » contient aussi $3$ succès.\nRéponse : a) SSS ; SSE ; SES ; ESS ; b) 4.",
          micros: ["vaT_coef_denombrer"],
        },
        {
          enonce:
            "Un régisseur suit $6$ représentations d'une pièce, de façon indépendante. S = « salle complète ». Léo affirme que $\\binom{6}{3}$ est la probabilité d'avoir $3$ salles complètes.\na) Que vaut $\\binom{6}{3}$ ?\nb) Ce nombre peut-il être une probabilité ? Réponds oui ou non.",
          figure: triangle(6),
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) Ligne $6$, colonne $3$ : $20$.\nb) Une probabilité ne dépasse jamais $1$. $20$ est un nombre de chemins, pas une probabilité.\n⛔ Le piège : confondre le nombre de chemins et la probabilité de l'évènement. Il manque ici la probabilité de chaque chemin.\nRéponse : a) 20 ; b) non.",
          micros: ["vaT_coef_definition"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : construire ou lire le triangle, réunir des chemins, puis vérifier avec le total.",
      rappel: [
        "Pour aller jusqu'à la ligne $10$, on construit le triangle ligne par ligne : chaque terme est la somme de deux voisins du dessus.",
        "On vérifie une ligne avec sa somme, qui doit valoir $2^n$.",
        "Quand des évènements couvrent tous les cas sans se chevaucher, comme $X \\leqslant 2$, $X = 3$ et $X \\geqslant 4$ sur $6$ épreuves, leurs nombres de chemins redonnent le total.",
      ],
      exercices: [
        {
          titre: "Jusqu'à la ligne 10",
          enonce:
            "La ligne $8$ du triangle est : $1$ ; $8$ ; $28$ ; $56$ ; $70$ ; $56$ ; $28$ ; $8$ ; $1$. Sépare les nombres par « ; ».\na) Écris la ligne $9$.\nb) Écris la ligne $10$.\nc) Que vaut $\\binom{10}{5}$ ?\nd) Combien vaut la somme de la ligne $10$ ?",
          reponses: [
            { question: "a)", attendu: "1 ; 9 ; 36 ; 84 ; 126 ; 126 ; 84 ; 36 ; 9 ; 1", ordre: true },
            { question: "b)", attendu: "1 ; 10 ; 45 ; 120 ; 210 ; 252 ; 210 ; 120 ; 45 ; 10 ; 1", ordre: true },
            { question: "c)", attendu: "252" },
            { question: "d)", attendu: "1 024" },
          ],
          correction:
            "a) $1 + 8 = 9$ ; $8 + 28 = 36$ ; $28 + 56 = 84$ ; $56 + 70 = 126$ ; puis le miroir : $126$, $84$, $36$, $9$, et $1$ aux deux bouts.\nb) $1 + 9 = 10$ ; $9 + 36 = 45$ ; $36 + 84 = 120$ ; $84 + 126 = 210$ ; $126 + 126 = 252$ ; puis le miroir : $210$, $120$, $45$, $10$, et $1$ aux deux bouts.\nc) Colonne $5$ de la ligne $10$ : $252$.\nd) $2^{10} = 1\\,024$.\n⛔ Le piège au a) : oublier que la ligne $9$ a deux $126$ au milieu. Une ligne de rang impair a un nombre pair de termes.\nRéponse : a) 1 ; 9 ; 36 ; 84 ; 126 ; 126 ; 84 ; 36 ; 9 ; 1 ; b) 1 ; 10 ; 45 ; 120 ; 210 ; 252 ; 210 ; 120 ; 45 ; 10 ; 1 ; c) 252 ; d) 1 024.",
          micros: ["vaT_triangle_pascal", "vaT_formule_pascal"],
        },
        {
          titre: "Quatre vols de drone",
          enonce:
            "Une pilote de drone prévoit $4$ livraisons, de façon indépendante. S = « livraison réussie ». $X$ compte les S.\na) Combien de chemins compte l'arbre en tout ?\nb) Combien de chemins réalisent $\\{X = 2\\}$ ?\nc) Combien de chemins réalisent $\\{X \\geqslant 3\\}$ ?\nd) Combien de chemins réalisent $\\{X \\leqslant 1\\}$ ?",
          figure: triangle(4),
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "5" },
          ],
          correction:
            "a) $2^4 = 16$ chemins.\nb) Ligne $4$, colonne $2$ : $6$.\nc) $k = 3$ ou $4$ : $4 + 1 = 5$.\nd) $k = 0$ ou $1$ : $1 + 4 = 5$.\nVérification : $5 + 6 + 5 = 16$. ✔\n⛔ Le piège au c) : lire $\\geqslant$ comme « plus de $3$ » et oublier $k = 3$.\nRéponse : a) 16 ; b) 6 ; c) 5 ; d) 5.",
          micros: ["vaT_coef_denombrer"],
        },
        {
          titre: "Le cahier abîmé",
          enonce:
            "Une archiviste retrouve un vieux cahier où la ligne $6$ du triangle est tachée : $1$ ; $6$ ; $15$ ; … ; $15$ ; $6$ ; $1$. On sait que $\\binom{5}{2} = 10$ et que $\\binom{5}{3} = 10$.\na) Avec la formule de Pascal, calcule le nombre taché, $\\binom{6}{3}$.\nb) Quelle doit être la somme de la ligne $6$ ?\nc) Avec $\\binom{7}{3} = \\binom{6}{2} + \\binom{6}{3}$, calcule $\\binom{7}{3}$.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "64" },
            { question: "c)", attendu: "35" },
          ],
          correction:
            "a) $\\binom{6}{3} = \\binom{5}{2} + \\binom{5}{3} = 10 + 10 = 20$.\nb) $2^6 = 64$. Vérification : $1 + 6 + 15 + 20 + 15 + 6 + 1 = 64$. ✔\nc) La colonne $2$ de la ligne $6$ vaut $15$ : $\\binom{7}{3} = 15 + 20 = 35$.\n⛔ Le piège au c) : prendre $\\binom{6}{2} = 6$. La colonne $0$ vaut $1$, la colonne $1$ vaut $6$, la colonne $2$ vaut $15$.\nRéponse : a) 20 ; b) 64 ; c) 35.",
          micros: ["vaT_formule_pascal"],
        },
        {
          titre: "Dix tirs au biathlon",
          enonce:
            "Une biathlète tire $10$ balles, de façon indépendante. S = « cible touchée ». $X$ compte les S.\na) Combien de chemins comportent exactement $8$ succès ?\nb) Que vaut $\\binom{10}{2}$ ?\nc) Combien de chemins comportent au moins $8$ succès ?\nd) Combien de chemins compte l'arbre en tout ?",
          figure: triangle(10),
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: "56" },
            { question: "d)", attendu: "1 024" },
          ],
          correction:
            "a) Ligne $10$, colonne $8$ : $45$.\nb) Ligne $10$, colonne $2$ : $45$. C'est la symétrie : $8$ succès, c'est $2$ échecs.\nc) $k = 8$, $9$ ou $10$ : $45 + 10 + 1 = 56$.\nd) $2^{10} = 1\\,024$.\n⛔ Le piège au c) : s'arrêter à $k = 9$. Les dix cibles touchées font partie de « au moins $8$ ».\nRéponse : a) 45 ; b) 45 ; c) 56 ; d) 1 024.",
          micros: ["vaT_triangle_pascal", "vaT_coef_denombrer"],
        },
      ],
    },
  ],
};
