// ─── Fiche d'exercices : représenter les termes d'une suite (STMG) ──────────────
//
// Notion suite_representation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : le nuage de points (n ; u(n)), jamais relié car une suite n'existe
// qu'aux rangs entiers, lire un terme et lire un rang, CONJECTURER la nature (points
// alignés, écarts qui s'accentuent) en sachant qu'un graphique ne démontre rien, et
// la formule de tableur recopiable, avec référence relative. ⛔ Pas de terme général.
//
// ⛔ Formules de tableur : texte nu, jamais de signe dollar écrit (KaTeX l'avalerait).
// La référence absolue se dit donc en mots dans le dernier problème.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; yoga (professeure), médiathèque
// (bibliothécaire), capteurs de chantier (technicien), ostéopathie (ostéopathe),
// élevage (éleveuse), déchets d'un collège (agent), entrepôt (logisticien), compta
// (comptable) ; marketing (cheffe de produit), serre (maraîcher), jeu vidéo
// (développeur), coopérative (responsable).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`, qui relit
// aussi les points dessinés.
//
// Micro-compétences : suite_rep_nuage (1, 4, 9, 13, 17, 18, 20), suite_rep_lire
// (2, 3, 10, 11, 13, 14, 19), suite_rep_conjecturer (5, 6, 11, 12, 14, 17, 18, 19),
// suite_rep_tableur (7, 8, 15, 16, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

/** Les points d'une suite : le rang en abscisse, le terme en ordonnée. */
const points = (termes: number[]) => termes.map((y, x) => ({ x, y }));
const NOMS: [string, string] = ["n", "u(n)"];
const NI = ["ni", "ni l'une ni l'autre", "ni arithmétique ni géométrique"];
/** Une formule : avec ou sans « = », et colonne bloquée ($B2), juste à la recopie. ⛔ Jamais B$2 ni $B$2. */
const formule = (...f: string[]) =>
  f.flatMap((x) => {
    const mixte = x.replace(/B(\d)/g, (_, k) => "$B" + k);
    return [x, x.slice(1), mixte, mixte.slice(1)];
  });

export const exercicesSuiteRepresentationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-representation",
  titre: "Représenter les termes d'une suite",
  accroche:
    "Vingt exercices pour voir une suite : placer les points, lire un terme ou un rang, deviner la nature de la suite à l'allure du nuage, puis obtenir ses termes au tableur avec une formule qu'on recopie. Un studio de yoga, une médiathèque, un entrepôt, une serre et un jeu vidéo. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire un point, lire un rang, reconnaître une allure, ou écrire une formule.",
      rappel: [
        "On représente une suite par des POINTS isolés $(n\\,;\\,u(n))$ : le rang en abscisse, le terme en ordonnée. Un rang est un nombre entier : on ne relie pas les points.",
        "Lire un terme : on part du rang sur l'axe horizontal. Lire un rang : on part de la valeur sur l'axe vertical.",
        "Points alignés : suite probablement arithmétique. Écarts qui s'accentuent : suite probablement géométrique.",
        "Au tableur : si $u(0)$ est en B2, on écrit en B3 une formule qui pointe la cellule du dessus, par exemple =B2+10 ou =B2*1,5, puis on la recopie vers le bas.",
      ],
      exercices: [
        {
          enonce:
            "Le nuage de points représente les termes d'une suite. Quelles sont les coordonnées du point qui représente $u(3)$ ? Écris-les sous la forme (x ; y).",
          figure: nuage([0, 5, 1, 0, 140, 20], points([20, 40, 60, 80, 100, 120]), { noms: NOMS }),
          reponses: [{ attendu: "(3 ; 80)", ordre: true }],
          correction:
            "Le rang se lit en abscisse : on part de 3 sur l'axe horizontal.\nOn monte jusqu'au point, puis on lit l'ordonnée : 80.\nLe point a pour coordonnées $(3\\,;\\,80)$.\n⛔ Le piège : écrire $(80\\,;\\,3)$. L'abscisse, c'est toujours le rang.\nRéponse : (3 ; 80).",
          micros: ["suite_rep_nuage"],
        },
        {
          enonce: "Lis sur le graphique la valeur de $u(2)$.",
          figure: nuage([0, 4, 1, 0, 60, 10], points([10, 30, 20, 40, 50]), { noms: NOMS }),
          reponses: [{ attendu: "20" }],
          correction:
            "On part de 2 sur l'axe horizontal, on monte jusqu'au point, puis on lit à gauche : 20.\n⛔ Le piège : prendre le deuxième point du nuage (30). Les rangs commencent à 0 : ce point est $u(1)$.\nRéponse : 20.",
          micros: ["suite_rep_lire"],
        },
        {
          enonce: "Sur ce graphique, pour quel rang la suite prend-elle la valeur 60 ?",
          figure: nuage([0, 4, 1, 0, 120, 20], points([100, 80, 60, 40, 20]), { noms: NOMS }),
          reponses: [{ attendu: "2" }],
          correction:
            "On part de 60 sur l'axe vertical, on avance jusqu'au point, puis on descend lire le rang : 2.\nDonc $u(2) = 60$.\n⛔ Le piège : répondre 3, parce que c'est le troisième point. Le rang se lit sur l'axe.\nRéponse : 2.",
          micros: ["suite_rep_lire"],
        },
        {
          enonce:
            "Les termes d'une suite sont représentés par des points isolés. Peut-on les relier par une courbe continue pour lire la valeur au rang 2,5 ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "Une suite n'a de valeur qu'aux rangs entiers : 0, 1, 2, 3…\nIl n'existe pas de terme de rang 2,5.\nUne ligne tracée inventerait des valeurs qui n'existent pas.\n⛔ Le piège : relier les points parce qu'ils sont bien alignés. Même alignés, ils restent isolés.\nRéponse : non.",
          micros: ["suite_rep_nuage"],
        },
        {
          enonce:
            "À partir de sa représentation, quelle est la nature probable de cette suite ? Écris « arithmétique » ou « géométrique ».",
          figure: nuage([0, 4, 1, 0, 100, 20], points([10, 30, 50, 70, 90]), { noms: NOMS }),
          reponses: [{ attendu: "arithmétique" }],
          correction:
            "Les points paraissent alignés.\nOn le vérifie sur les valeurs : on monte de 20 à chaque rang.\nUne quantité fixe ajoutée à chaque pas : la suite est probablement arithmétique.\n⛔ Le piège : croire qu'une suite qui monte est forcément géométrique. C'est l'alignement qui compte.\nRéponse : arithmétique.",
          micros: ["suite_rep_conjecturer"],
        },
        {
          enonce:
            "À partir de la forme de ce nuage, quelle est la nature probable de la suite ? Écris « arithmétique » ou « géométrique ».",
          figure: nuage([0, 4, 1, 0, 80, 10], points([5, 10, 20, 40, 80]), { noms: NOMS }),
          reponses: [{ attendu: "géométrique" }],
          correction:
            "Les points ne sont pas alignés, et les écarts s'accentuent : 5, 10, 20, 40.\nChaque terme semble être le double du précédent.\nLa suite est probablement géométrique.\n⛔ Le piège : regarder seulement le dernier point, très haut. C'est la progression des écarts qu'il faut lire.\nRéponse : géométrique.",
          micros: ["suite_rep_conjecturer"],
        },
        {
          enonce:
            "La suite est définie par $u(0) = 200$ et $u(n+1) = u(n) + 30$. La valeur de $u(0)$ est en B2. Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ?",
          figure: grille(["", "A", "B"], [[1, "n", "u(n)"], [2, 0, 200], [3, 1, "?"]]),
          reponses: [{ attendu: formule("=B2+30", "=30+B2"), exact: true }],
          correction:
            "Le terme suivant, c'est le terme du dessus plus 30.\nLa formule en B3 pointe donc B2 : =B2+30.\n⛔ Le piège : écrire =B3+30. La cellule pointerait sur elle-même : c'est une référence circulaire.\nRéponse : =B2+30.",
          micros: ["suite_rep_tableur"],
        },
        {
          enonce:
            "La suite est définie par $u(0) = 400$ et $u(n+1) = 1{,}05 \\times u(n)$. La valeur de $u(0)$ est en B2. Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ? Pour multiplier, tape le signe *.",
          reponses: [{ attendu: formule("=B2*1,05", "=1,05*B2", "=B2*105%", "=B2+B2*0,05", "=B2+0,05*B2"), exact: true }],
          correction:
            "Le terme suivant, c'est le terme du dessus multiplié par 1,05.\nLa formule en B3 est donc =B2*1,05. Justes aussi : =B2*105% et =B2+B2*0,05.\n⛔ Le piège : écrire =B2+1,05. Un coefficient multiplie, il ne s'ajoute pas.\nRéponse : =B2*1,05.",
          micros: ["suite_rep_tableur"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un graphique ou un tableur à exploiter : lire, conjecturer, vérifier par le calcul.",
      rappel: [
        "Géométrique avec une raison entre 0 et 1 : les points descendent et les écarts se réduisent.",
        "Un graphique permet de CONJECTURER. Pour affirmer, il faut un calcul : la différence pour une suite arithmétique, le quotient pour une suite géométrique.",
        "La recopie décale la formule : =B2+10 en B3 devient =B3+10 en B4. La cellule pointe toujours celle du dessus.",
      ],
      exercices: [
        {
          enonce:
            "Une professeure de yoga a 30 élèves au départ, notés $u(0)$, puis 15 de plus chaque trimestre (modèle).\na) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nb) Quelles sont les coordonnées du point de rang 2 ? Écris-les sous la forme (x ; y).",
          reponses: [
            { question: "a)", attendu: "45 ; 60 ; 75", ordre: true },
            { question: "b)", attendu: "(2 ; 60)", ordre: true },
          ],
          correction:
            "a) On ajoute 15 à chaque pas : $30 + 15 = 45$, puis 60, puis 75.\nb) Le rang en abscisse, le terme en ordonnée : $(2\\,;\\,60)$.\nLe dessin montre le nuage : quatre points isolés.\n⛔ Le piège au b) : lire le rang 2 comme la deuxième valeur, et écrire $(2\\,;\\,45)$. 45 est $u(1)$.\nRéponse : a) 45 ; 60 ; 75 ; b) (2 ; 60).",
          schema: nuage([0, 3, 1, 0, 90, 15], points([30, 45, 60, 75]), { noms: NOMS }),
          micros: ["suite_rep_nuage"],
        },
        {
          enonce:
            "Une bibliothécaire de médiathèque représente le nombre d'inscrits par mois (modèle).\na) Lis $u(3)$.\nb) La suite paraît arithmétique : quelle est sa raison ?\nc) Pour quel rang la suite vaut-elle 120 ?",
          figure: nuage([0, 4, 1, 0, 140, 20], points([40, 60, 80, 100, 120]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) Au rang 3, le point est à la hauteur 100.\nb) D'un rang au suivant, on monte de 20 : $60 - 40 = 20$.\nc) La valeur 120 se lit au dernier point : rang 4.\n⛔ Le piège au c) : répondre 5, parce que c'est le cinquième point. Les rangs partent de 0.\nRéponse : a) 100 ; b) 20 ; c) 4.",
          micros: ["suite_rep_lire"],
        },
        {
          enonce:
            "Un technicien installe des capteurs sur un chantier fictif. Le graphique donne leur nombre semaine après semaine.\na) Lis $u(2)$.\nb) Lis $u(3)$.\nc) Calcule $u(3) \\div u(2)$.\nd) Quelle est la nature probable de la suite ? Écris « arithmétique » ou « géométrique ».",
          figure: nuage([0, 4, 1, 0, 160, 20], points([10, 20, 40, 80, 160]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "80" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "géométrique" },
          ],
          correction:
            "a) Au rang 2, on lit 40.\nb) Au rang 3, on lit 80.\nc) $80 \\div 40 = 2$.\nd) Les écarts s'accentuent et le quotient vaut 2 : la suite est probablement géométrique.\n⛔ Le piège au d) : conclure après un seul regard. C'est l'allure ET le calcul qui se complètent.\nRéponse : a) 40 ; b) 80 ; c) 2 ; d) géométrique.",
          micros: ["suite_rep_lire", "suite_rep_conjecturer"],
        },
        {
          enonce:
            "Une ostéopathe représente le nombre de patients par mois (modèle) et voit des points alignés.\na) Quelle nature cela fait-il penser ? Écris « arithmétique » ou « géométrique ».\nb) Le graphique suffit-il à l'affirmer ? Réponds oui ou non.\nc) Calcule la différence entre les deux premiers termes.",
          figure: nuage([0, 4, 1, 0, 105, 15], points([30, 45, 60, 75, 90]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "arithmétique" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "a) Des points alignés font penser à une suite arithmétique.\nb) Non : le graphique permet de conjecturer. Sur quelques points, deux suites différentes peuvent donner presque la même image.\nc) On lit 30 et 45 : $45 - 30 = 15$. Pour confirmer, il faudrait la même différence sur toutes les paires.\n⛔ Le piège au b) : répondre oui parce que « ça se voit ». Voir, ce n'est pas démontrer.\nRéponse : a) arithmétique ; b) non ; c) 15.",
          micros: ["suite_rep_conjecturer"],
        },
        {
          enonce:
            "Une éleveuse relève chaque mois sa production d'œufs, en centaines (modèle).\na) Lis $u(2)$ et $u(3)$, dans cet ordre.\nb) En reliant les deux points par un trait, quelle valeur lirait-on au milieu du trait ?\nc) Le terme de rang 2,5 existe-t-il ? Réponds oui ou non.",
          figure: nuage([0, 4, 1, 0, 180, 30], points([30, 60, 90, 120, 150]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "90 ; 120", ordre: true },
            { question: "b)", attendu: "105" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) Au rang 2, on lit 90 ; au rang 3, on lit 120.\nb) Le milieu du trait est à la hauteur $(90 + 120) \\div 2 = 105$.\nc) Non : il n'y a pas de relevé au mois « deux et demi ». Une suite n'existe qu'aux rangs entiers.\n⛔ Le piège : prendre ce 105 pour un vrai terme. Le tracé inventerait une valeur.\nRéponse : a) 90 ; 120 ; b) 105 ; c) non.",
          micros: ["suite_rep_lire", "suite_rep_nuage"],
        },
        {
          enonce:
            "L'agent d'entretien d'un collège suit le poids de déchets par mois, en kg (modèle).\na) Lis $u(1)$.\nb) Calcule le quotient $u(1) \\div u(0)$.\nc) Quelle est la nature probable de la suite ? Écris « arithmétique » ou « géométrique ».",
          figure: nuage([0, 4, 1, 0, 160, 20], points([160, 80, 40, 20, 10]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "80" },
            { question: "b)", attendu: "0,5" },
            { question: "c)", attendu: "géométrique" },
          ],
          correction:
            "a) Au rang 1, on lit 80.\nb) On lit $u(0) = 160$ : $80 \\div 160 = 0{,}5$.\nc) Les points descendent, et les écarts se réduisent : 80, puis 40, puis 20. La suite est probablement géométrique, de raison 0,5.\n⛔ Le piège au c) : croire qu'une suite géométrique monte toujours. Avec une raison entre 0 et 1, elle descend.\nRéponse : a) 80 ; b) 0,5 ; c) géométrique.",
          micros: ["suite_rep_lire", "suite_rep_conjecturer"],
        },
        {
          enonce:
            "Un logisticien suit au tableur un stock de 500 cartons, avec $u(n+1) = u(n) - 40$ (modèle). La valeur de $u(0)$ est en B2.\na) Quelle formule saisir en B3 ?\nb) Cette formule est recopiée vers le bas. Que contient alors B4 ?\nc) Quelle valeur s'affiche en B4 ?\nd) Quelle valeur s'affiche en B7 ?",
          figure: grille(["", "A", "B"], [[1, "n", "u(n)"], [2, 0, 500], [3, 1, "?"], [4, 2, "?"]]),
          reponses: [
            { question: "a)", attendu: formule("=B2-40", "=-40+B2"), exact: true },
            { question: "b)", attendu: formule("=B3-40", "=-40+B3"), exact: true },
            { question: "c)", attendu: "420" },
            { question: "d)", attendu: "300" },
          ],
          correction:
            "a) Le terme suivant, c'est celui du dessus moins 40 : =B2-40.\nb) Recopiée d'une ligne vers le bas, la formule pointe une ligne plus bas : =B3-40.\nc) B3 affiche 460, donc B4 affiche $460 - 40 = 420$.\nd) On continue : B5 affiche 380, B6 affiche 340, B7 affiche 300.\n⛔ Le piège au d) : croire que B7 est $u(7)$. B2 contient $u(0)$ : B7 contient donc $u(5)$.\nRéponse : a) =B2-40 ; b) =B3-40 ; c) 420 ; d) 300.",
          micros: ["suite_rep_tableur"],
        },
        {
          enonce:
            "Une comptable suit un chiffre d'affaires de 1 000 €, en B2, en hausse de 10 % par an (modèle).\na) Quelle formule saisir en B3 ? Pour multiplier, tape le signe *.\nb) Cette formule est recopiée vers le bas. Que contient alors B4 ?\nc) Quelles valeurs s'affichent en B3 et B4 ? Donne-les dans cet ordre.",
          reponses: [
            { question: "a)", attendu: formule("=B2*1,1", "=1,1*B2", "=B2*110%", "=B2*(1+10%)", "=B2*(1+0,1)", "=B2+B2*10%", "=B2+B2*0,1", "=B2+0,1*B2"), exact: true },
            { question: "b)", attendu: formule("=B3*1,1", "=1,1*B3", "=B3*110%", "=B3*(1+10%)", "=B3*(1+0,1)", "=B3+B3*10%", "=B3+B3*0,1", "=B3+0,1*B3"), exact: true },
            { question: "c)", attendu: "1 100 ; 1 210", ordre: true },
          ],
          correction:
            "a) Une hausse de 10 % multiplie par 1,1 : =B2*1,1. Justes aussi : =B2*110%, =B2*(1+10%), =B2*(1+0,1) et =B2+B2*0,1.\nb) La recopie décale la référence : =B3*1,1.\nc) $1\\,000 \\times 1{,}1 = 1\\,100$, puis $1\\,100 \\times 1{,}1 = 1\\,210$.\n⛔ Le piège au b) : écrire =B4*1,1. La cellule B4 pointerait sur elle-même : le tableur refuse cette référence circulaire.\nRéponse : a) =B2*1,1 ; b) =B3*1,1 ; c) 1 100 ; 1 210.",
          micros: ["suite_rep_tableur"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : du tableau au nuage, du nuage à une conjecture, de la conjecture au tableur.",
      rappel: [
        "On place $(n\\,;\\,u(n))$, sans relier les points.",
        "On conjecture avec l'allure, puis on vérifie par les différences ou les quotients.",
        "Au tableur, la formule pointe la cellule du dessus : recopiée vers le bas, elle donne toute la colonne.",
      ],
      exercices: [
        {
          titre: "Trois lancements de produits",
          enonce:
            "Une cheffe de produit compare les ventes de trois produits fictifs, suites A, B et C, en dizaines.\na) Si l'on place les points, quelle suite donne des points alignés ? Écris sa lettre.\nb) Quelle suite a un quotient constant ? Écris sa lettre.\nc) Quelle est la nature de C ? Écris « arithmétique », « géométrique » ou « ni ».\nd) Donne les coordonnées du point de C au rang 3, sous la forme (x ; y).",
          figure: grille(["n", "A", "B", "C"], [[0, 10, 10, 10], [1, 20, 20, 20], [2, 30, 40, 25], [3, 40, 80, 25], [4, 50, 160, 20]]),
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: NI },
            { question: "d)", attendu: "(3 ; 25)", ordre: true },
          ],
          correction:
            "a) A ajoute 10 à chaque pas : ses points sont alignés.\nb) B est multiplié par 2 à chaque pas : $20 \\div 10 = 2$, $40 \\div 20 = 2$, $80 \\div 40 = 2$.\nc) C : les différences sont 10, 5, 0, −5 et les quotients 2, 1,25, 1… Ni l'une ni l'autre.\nd) Au rang 3, C vaut 25 : $(3\\,;\\,25)$.\n⛔ Le piège au c) : ranger C dans une case parce que ses deux premiers termes sont ceux de A et de B. Il faut regarder toutes les paires.\nRéponse : a) A ; b) B ; c) ni l'une ni l'autre ; d) (3 ; 25).",
          micros: ["suite_rep_nuage", "suite_rep_conjecturer"],
        },
        {
          titre: "La serre du maraîcher",
          enonce:
            "Un maraîcher mesure un plant de tomate fictif : 12 cm au départ, notés $u(0)$, en B2 de son tableur, puis 8 cm de plus par semaine.\na) Quelle formule saisir en B3 ?\nb) Calcule $u(3)$.\nc) Quelles sont les coordonnées du point de rang 3 ? Écris-les sous la forme (x ; y).\nd) Les points seront-ils alignés ? Réponds oui ou non.\ne) Quelle est donc la nature de la suite ? Écris « arithmétique » ou « géométrique ».",
          reponses: [
            { question: "a)", attendu: formule("=B2+8", "=8+B2"), exact: true },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "(3 ; 36)", ordre: true },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "arithmétique" },
          ],
          correction:
            "a) On ajoute 8 au terme du dessus : =B2+8.\nb) 12, 20, 28, 36 : $u(3) = 36$.\nc) Le rang en abscisse, le terme en ordonnée : $(3\\,;\\,36)$.\nd) On monte de 8 à chaque rang : les points sont alignés, comme le montre le dessin.\ne) Une quantité fixe s'ajoute à chaque pas : la suite est arithmétique.\n⛔ Le piège au a) : écrire =B2*8. Le plant gagne 8 cm, il n'est pas multiplié par 8.\nRéponse : a) =B2+8 ; b) 36 ; c) (3 ; 36) ; d) oui ; e) arithmétique.",
          schema: nuage([0, 4, 1, 0, 48, 8], points([12, 20, 28, 36, 44]), { noms: NOMS }),
          micros: ["suite_rep_tableur", "suite_rep_nuage", "suite_rep_conjecturer"],
        },
        {
          titre: "Les joueurs du jeu vidéo",
          enonce:
            "Un développeur suit les joueurs de son jeu vidéo, mois après mois (modèle). Il place les termes sur un graphique, et $u(0)$ est en B2 de son tableur.\na) Lis $u(2)$.\nb) Quelle est la nature probable de la suite ? Écris « arithmétique » ou « géométrique ».\nc) Quelle est sa raison ?\nd) Quelle formule saisir en B3 ? Pour multiplier, tape le signe *.\ne) Si le rythme se maintient, que vaudra $u(4)$ ?",
          figure: nuage([0, 3, 1, 0, 800, 100], points([100, 200, 400, 800]), { noms: NOMS }),
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "géométrique" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: formule("=B2*2", "=2*B2", "=B2+B2"), exact: true },
            { question: "e)", attendu: "1 600" },
          ],
          correction:
            "a) Au rang 2, on lit 400.\nb) Les écarts s'accentuent : 100, 200, 400. La suite est probablement géométrique.\nc) $200 \\div 100 = 2$, $400 \\div 200 = 2$, $800 \\div 400 = 2$.\nd) On multiplie le terme du dessus par 2 : =B2*2.\ne) $800 \\times 2 = 1\\,600$.\n⛔ Le piège au e) : ajouter 400 pour trouver 1 200. Le rythme est un coefficient, on multiplie.\nRéponse : a) 400 ; b) géométrique ; c) 2 ; d) =B2*2 ; e) 1 600.",
          micros: ["suite_rep_lire", "suite_rep_conjecturer", "suite_rep_tableur"],
        },
        {
          titre: "Le piège de la recopie",
          enonce:
            "La responsable d'une coopérative suit ses adhérents : 500 en B2, puis + 20 % par an (modèle). Elle saisit =B2*1,2 en B3 et recopie vers le bas.\na) Quelles valeurs s'affichent en B3, B4 et B5 ? Donne-les dans cet ordre.\nb) Donne les coordonnées du point de rang 2, sous la forme (x ; y).\nc) Une collègue bloque la référence à B2 : la formule garde alors B2 dans toutes les lignes. Quelle valeur s'afficherait en B4 ?\nd) Quelle est la nature de la suite obtenue sans blocage ? Écris « arithmétique » ou « géométrique ».",
          reponses: [
            { question: "a)", attendu: "600 ; 720 ; 864", ordre: true },
            { question: "b)", attendu: "(2 ; 720)", ordre: true },
            { question: "c)", attendu: "600" },
            { question: "d)", attendu: "géométrique" },
          ],
          correction:
            "a) $500 \\times 1{,}2 = 600$, $600 \\times 1{,}2 = 720$, $720 \\times 1{,}2 = 864$.\nb) B4 contient $u(2)$, soit 720 : le point est $(2\\,;\\,720)$.\nc) Avec la référence bloquée, B4 calcule encore $500 \\times 1{,}2 = 600$. Toute la colonne répète 600.\nd) On multiplie à chaque pas par le même nombre : la suite est géométrique, de raison 1,2.\n⛔ Le piège au b) : prendre 600, la première valeur calculée. B3 contient $u(1)$, pas $u(2)$.\nRéponse : a) 600 ; 720 ; 864 ; b) (2 ; 720) ; c) 600 ; d) géométrique.",
          micros: ["suite_rep_tableur", "suite_rep_nuage"],
        },
      ],
    },
  ],
};
