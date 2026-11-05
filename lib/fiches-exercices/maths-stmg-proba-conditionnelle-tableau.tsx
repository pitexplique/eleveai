// ─── Fiche d'exercices : probabilité conditionnelle sur un tableau (STMG) — 20 exercices ─
//
// Notion proba_conditionnelle_tableau du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// ⛔ Programme de PREMIÈRE : tout se calcule sur un TABLEAU CROISÉ d'effectifs,
// $P_A(B)$ = effectif de A et B ÷ effectif de A. Pas d'arbre, pas de probabilités
// totales (terminale). Le coach demande : reconnaître une conditionnelle
// (« parmi », « sachant que »), la noter $P_A(B)$, choisir le dénominateur, calculer.
//
// Aucune donnée réelle : tous les tableaux sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : escalade (monitrice), garage (garagiste), santé (médecin),
// bibliothèque (bibliothécaire), pépinière (pépiniériste), école de musique
// (professeur), clinique vétérinaire (vétérinaire), station de ski (loueur) ;
// RH (responsable), déchets (agente de collectivité), urgences (infirmier),
// boulangerie (boulangère), athlétisme (entraîneur), théâtre (ouvreuse),
// verger (agronome), logement et énergie (diagnostiqueur) ; transport ferroviaire
// (contrôleuse), sommeil des élèves (infirmière scolaire), immobilier (directrice
// de réseau), météo (prévisionniste).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaC_reconnaitre (1, 2, 13, 18), probaC_notation (3, 4, 9,
// 14), probaC_calculer_tableau (5, 6, 7, 8, 9 à 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { croise } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesProbaConditionnelleTableauStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-conditionnelle-tableau",
  titre: "Probabilité conditionnelle sur un tableau",
  accroche:
    "Vingt exercices pour lire un tableau croisé sans se tromper de population : repérer « parmi » et « sachant que », écrire $P_A(B)$, choisir le bon dénominateur, calculer. Un club d'escalade, une école de musique, les urgences, un verger, une agence immobilière, la météo. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître, noter, trouver le dénominateur ou calculer.",
      rappel: [
        "« Parmi », « sachant que » : on ne regarde plus tout le monde, mais un groupe. C'est une probabilité conditionnelle.",
        "« À la fois A et B », dans tout l'ensemble : c'est une intersection, notée $A \\cap B$.",
        "$P_A(B)$ se lit « probabilité de B sachant A ». La lettre en indice est la condition.",
        "$P_A(B)$ = effectif de A et B ÷ effectif de A. Au dénominateur, l'effectif de la condition.",
      ],
      exercices: [
        {
          enonce:
            "Une monitrice d'escalade choisit au hasard une adhérente parmi celles qui ont moins de 18 ans. Elle cherche la probabilité qu'elle grimpe en salle. Est-ce une probabilité conditionnelle ou une intersection ? Écris « conditionnelle » ou « intersection ».",
          reponses: [{ attendu: ["conditionnelle", "une conditionnelle", "probabilité conditionnelle", "une probabilité conditionnelle"] }],
          correction:
            "Le mot « parmi » réduit la population : on ne regarde que les moins de 18 ans.\nOn calcule donc dans ce groupe seulement : c'est une probabilité conditionnelle.\n⛔ Le piège : voir deux caractères (âge et salle) et penser à une intersection. Ce qui décide, c'est la population de départ.\nRéponse : conditionnelle.",
          micros: ["probaC_reconnaitre"],
        },
        {
          enonce:
            "Un garagiste choisit au hasard un client dans tout son fichier. Il cherche la probabilité qu'il ait à la fois une voiture diesel et un contrat d'entretien. Est-ce une probabilité conditionnelle ou une intersection ? Écris « conditionnelle » ou « intersection ».",
          reponses: [{ attendu: ["intersection", "une intersection"] }],
          correction:
            "On choisit dans TOUT le fichier : la population n'est pas réduite.\nOn demande les deux caractères « à la fois » : c'est une intersection.\n⛔ Le piège : croire que deux caractères font une conditionnelle. Sans « parmi » ni « sachant que », on reste sur l'ensemble.\nRéponse : intersection.",
          micros: ["probaC_reconnaitre"],
        },
        {
          enonce:
            "Dans le cabinet d'une médecin, on choisit un patient au hasard. On note $A$ : « le patient a plus de 60 ans » et $B$ : « le patient est vacciné ».\nComment note-t-on la probabilité que le patient soit vacciné, sachant qu'il a plus de 60 ans ? Écris $P_A(B)$ ou $P_B(A)$. Au clavier, tape PA(B) ou PB(A).",
          reponses: [{ attendu: ["P_A(B)", "PA(B)"], exact: true }],
          correction:
            "La condition est ce qui suit « sachant » : « il a plus de 60 ans », c'est $A$.\nLa condition va en indice, ce qu'on cherche va entre parenthèses : $P_A(B)$.\n⛔ Le piège : écrire les lettres dans l'ordre de la phrase. On lit d'abord « sachant ».\nRéponse : $P_A(B)$, soit PA(B) au clavier.",
          micros: ["probaC_notation"],
        },
        {
          enonce:
            "Un bibliothécaire choisit un livre au hasard. Il note $A$ : « le livre est un roman » et $B$ : « le livre est emprunté ».\nComment note-t-on la probabilité que ce livre soit un roman, sachant qu'il est emprunté ? Écris $P_A(B)$ ou $P_B(A)$. Au clavier, tape PA(B) ou PB(A).",
          reponses: [{ attendu: ["P_B(A)", "PB(A)"], exact: true }],
          correction:
            "Ce qui suit « sachant » : « il est emprunté », c'est $B$. Donc $B$ va en indice.\nOn cherche la probabilité de $A$ : $P_B(A)$.\n⛔ Le piège : écrire $P_A(B)$ parce que $A$ vient en premier. Ici, on se place parmi les livres empruntés.\nRéponse : $P_B(A)$, soit PB(A) au clavier.",
          micros: ["probaC_notation"],
        },
        {
          enonce:
            "Une pépiniériste choisit une plante au hasard. On veut une probabilité SACHANT que la plante est un arbuste. Quel effectif faut-il mettre au dénominateur ?",
          figure: croise(["Plante", "Vendue", "Invendue", "Total"], [
            ["Arbre fruitier", 60, 40, 100],
            ["Arbuste", 90, 110, 200],
            ["Total", 150, 150, 300],
          ]),
          reponses: [{ attendu: "200" }],
          correction:
            "La condition, c'est « arbuste ». On se place sur cette ligne.\nSon effectif se lit dans la colonne Total : $90 + 110 = 200$.\n⛔ Le piège : prendre 300, le total général. Sachant que c'est un arbuste, les arbres fruitiers ne comptent plus.\nRéponse : 200.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un professeur de musique choisit un élève au hasard. Sachant que l'élève joue du piano, quelle est la probabilité qu'il ait moins de 15 ans ?",
          figure: croise(["Instrument", "Moins de 15 ans", "15 ans ou plus", "Total"], [
            ["Piano", 30, 20, 50],
            ["Guitare", 10, 40, 50],
            ["Total", 40, 60, 100],
          ]),
          reponses: [{ attendu: "0,6" }],
          correction:
            "La condition : « piano », soit 50 élèves. C'est le dénominateur.\nLa case qui croise piano et moins de 15 ans : 30.\n$\\dfrac{30}{50} = 0{,}6$.\n⛔ Le piège : diviser par 100, le total. Cela donne 0,3, qui répond à une autre question.\nRéponse : 0,6.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Une vétérinaire choisit un animal au hasard parmi ses patients. Sachant que c'est un chat, quelle est la probabilité qu'il ne soit pas vacciné ?",
          figure: croise(["Animal", "Vacciné", "Non vacciné", "Total"], [
            ["Chien", 90, 30, 120],
            ["Chat", 60, 20, 80],
            ["Total", 150, 50, 200],
          ]),
          reponses: [{ attendu: "0,25" }],
          correction:
            "La condition : « chat », soit 80 animaux.\nLa case chat et non vacciné : 20.\n$\\dfrac{20}{80} = 0{,}25$.\n⛔ Le piège : diviser par 50, le total de la colonne. Ce serait la probabilité d'être un chat sachant qu'on n'est pas vacciné.\nRéponse : 0,25.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un loueur de skis choisit un client au hasard parmi ceux qui louent leur matériel. Quelle est la probabilité que ce client soit débutant ?",
          figure: croise(["Niveau", "Location", "Matériel personnel", "Total"], [
            ["Débutant", 70, 10, 80],
            ["Confirmé", 30, 90, 120],
            ["Total", 100, 100, 200],
          ]),
          reponses: [{ attendu: "0,7" }],
          correction:
            "« Parmi ceux qui louent » : la condition est une COLONNE, « Location », soit 100 clients.\nLa case location et débutant : 70.\n$\\dfrac{70}{100} = 0{,}7$.\n⛔ Le piège : diviser par 80, le total de la ligne. La condition peut être une colonne : on la cherche dans la phrase, pas dans le tableau.\nRéponse : 0,7.",
          micros: ["probaC_calculer_tableau"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un tableau à lire, plusieurs questions : repérer la condition avant chaque calcul.",
      rappel: [
        "$P_A(B)$ et $P_B(A)$ ont le même numérateur, la case qui croise A et B. Seul le dénominateur change.",
        "$P_A(B)$ : on divise par le total de A. $P_B(A)$ : on divise par le total de B.",
        "Un tableau croisé se complète par soustraction : les cases d'une ligne redonnent son total.",
      ],
      exercices: [
        {
          enonce:
            "Une responsable RH étudie 200 salariés (modèle). On choisit un salarié au hasard. On note $A$ : « il est cadre » et $B$ : « il télétravaille ».\na) Comment note-t-on la probabilité qu'il télétravaille, sachant qu'il est cadre ? Écris $P_A(B)$ ou $P_B(A)$ (au clavier : PA(B) ou PB(A)).\nb) Calcule cette probabilité.\nc) Calcule la probabilité qu'il soit cadre, sachant qu'il télétravaille. Arrondis au centième.",
          figure: croise(["Statut", "Télétravail", "Sur site", "Total"], [
            ["Cadre", 48, 32, 80],
            ["Employé", 30, 90, 120],
            ["Total", 78, 122, 200],
          ]),
          reponses: [
            { question: "a)", attendu: ["P_A(B)", "PA(B)"], exact: true },
            { question: "b)", attendu: "0,6" },
            { question: "c)", attendu: "0,62", tolerance: 0.005 },
          ],
          correction:
            "a) La condition « il est cadre », c'est $A$ : elle va en indice. On écrit $P_A(B)$.\nb) $P_A(B) = \\dfrac{48}{80} = 0{,}6$.\nc) $P_B(A)$ : on se place parmi les 78 salariés en télétravail. $\\dfrac{48}{78} \\approx 0{,}62$.\n⛔ Le piège au c) : garder 80 au dénominateur. Le numérateur reste 48, mais la condition a changé.\nRéponse : a) PA(B) ; b) 0,6 ; c) 0,62.",
          micros: ["probaC_notation", "probaC_calculer_tableau"],
        },
        {
          enonce:
            "Une agente de collectivité interroge 500 foyers (modèle) sur le compost, et en choisit un au hasard.\na) Sachant que le foyer habite une maison, quelle est la probabilité qu'il composte ?\nb) Sachant qu'il habite un immeuble, quelle est la probabilité qu'il composte ?\nc) Quel type de logement composte le plus souvent ? Écris « maison » ou « immeuble ».",
          figure: croise(["Logement", "Composte", "Ne composte pas", "Total"], [
            ["Maison", 140, 60, 200],
            ["Immeuble", 30, 270, 300],
            ["Total", 170, 330, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "0,1" },
            { question: "c)", attendu: ["maison", "maisons", "la maison", "une maison", "les maisons"] },
          ],
          correction:
            "a) Condition : maison, soit 200 foyers. $\\dfrac{140}{200} = 0{,}7$.\nb) Condition : immeuble, soit 300 foyers. $\\dfrac{30}{300} = 0{,}1$.\nc) 0,7 est plus grand que 0,1 : les maisons compostent le plus souvent.\n⛔ Le piège : diviser partout par 500. On ne pourrait plus comparer les deux types de logement, qui n'ont pas le même effectif.\nRéponse : a) 0,7 ; b) 0,1 ; c) maison.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un infirmier des urgences relève 500 passages (modèle). On choisit un passage au hasard.\na) Sachant que le patient est un adulte, quelle est la probabilité qu'il soit hospitalisé ?\nb) Parmi les patients hospitalisés, quelle est la probabilité de choisir un enfant ? Arrondis au centième.\nc) Sachant que le patient est un enfant, quelle est la probabilité qu'il rentre chez lui ?",
          figure: croise(["Patient", "Hospitalisé", "Rentre chez lui", "Total"], [
            ["Adulte", 90, 210, 300],
            ["Enfant", 20, 180, 200],
            ["Total", 110, 390, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,3" },
            { question: "b)", attendu: "0,18", tolerance: 0.005 },
            { question: "c)", attendu: "0,9" },
          ],
          correction:
            "a) $\\dfrac{90}{300} = 0{,}3$.\nb) « Parmi les hospitalisés » : le dénominateur est le total de la colonne, 110. $\\dfrac{20}{110} \\approx 0{,}18$.\nc) $\\dfrac{180}{200} = 0{,}9$.\n⛔ Le piège au b) : diviser 20 par 200. Cela donne 0,1, la part d'enfants hospitalisés parmi les enfants.\nRéponse : a) 0,3 ; b) 0,18 ; c) 0,9.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Une boulangère compte ses ventes d'une journée (modèle). On choisit un article vendu au hasard.\na) Combien de baguettes a-t-elle vendues le soir ?\nb) Sachant que l'article est une baguette, quelle est la probabilité qu'il ait été vendu le soir ?\nc) Sachant que l'article a été vendu le soir, quelle est la probabilité que ce soit une baguette ? Arrondis au centième.",
          figure: croise(["Article", "Matin", "Soir", "Total"], [
            ["Baguette", 120, "?", 200],
            ["Viennoiserie", 90, 10, 100],
            ["Total", 210, 90, 300],
          ]),
          reponses: [
            { question: "a)", attendu: "80" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "0,89", tolerance: 0.005 },
          ],
          correction:
            "a) Sur la ligne Baguette : $200 - 120 = 80$. Vérification sur la colonne Soir : $80 + 10 = 90$. ✔\nb) Condition : baguette, soit 200. $\\dfrac{80}{200} = 0{,}4$.\nc) Condition : soir, soit 90. $\\dfrac{80}{90} \\approx 0{,}89$.\n⛔ Le piège : croire que b) et c) donnent le même nombre, parce que le numérateur est le même. Les deux groupes n'ont pas la même taille.\nRéponse : a) 80 ; b) 0,4 ; c) 0,89.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un entraîneur d'athlétisme choisit au hasard un de ses 100 licenciés. Voici quatre questions.\n1. Quelle est la probabilité que le licencié soit une fille ?\n2. Quelle est la probabilité que le licencié soit une fille et fasse du sprint ?\n3. Parmi les garçons, quelle est la part de ceux qui font de l'endurance ?\n4. Quelle est la probabilité que le licencié soit une fille ou fasse du sprint ?\na) Laquelle porte sur une probabilité conditionnelle ? Écris son numéro.\nb) Calcule cette probabilité.",
          figure: croise(["Licencié", "Sprint", "Endurance", "Total"], [
            ["Fille", 18, 42, 60],
            ["Garçon", 28, 12, 40],
            ["Total", 46, 54, 100],
          ]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "0,3" },
          ],
          correction:
            "a) Seule la question 3 réduit la population, avec « parmi les garçons ». C'est la conditionnelle.\nb) Condition : garçon, soit 40. Case garçon et endurance : 12. $\\dfrac{12}{40} = 0{,}3$.\n⛔ Le piège au a) : choisir la question 2 à cause du « et ». Le « et » compte sur tout l'ensemble : c'est une intersection.\nRéponse : a) 3 ; b) 0,3.",
          micros: ["probaC_reconnaitre", "probaC_calculer_tableau"],
        },
        {
          enonce:
            "Une ouvreuse de théâtre compte les spectateurs d'un soir (modèle). On choisit un spectateur au hasard. On note $A$ : « le spectateur est abonné » et $B$ : « il est au balcon ».\na) Calcule $P_A(B)$.\nb) Calcule $P_B(A)$. Arrondis au centième.\nc) Dans $P_B(A)$, parmi quels spectateurs se place-t-on ? Écris « abonnés » ou « balcon ».",
          figure: croise(["Spectateur", "Orchestre", "Balcon", "Total"], [
            ["Abonné", 150, 50, 200],
            ["Non abonné", 90, 110, 200],
            ["Total", 240, 160, 400],
          ]),
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: "0,31", tolerance: 0.005 },
            { question: "c)", attendu: ["balcon", "le balcon", "au balcon", "du balcon", "spectateurs du balcon", "les spectateurs du balcon"] },
          ],
          correction:
            "a) L'indice $A$ dit : parmi les 200 abonnés. $\\dfrac{50}{200} = 0{,}25$.\nb) L'indice $B$ dit : parmi les 160 spectateurs du balcon. $\\dfrac{50}{160} \\approx 0{,}31$.\nc) La lettre en indice est $B$ : on se place parmi les spectateurs du balcon.\n⛔ Le piège : lire $P_B(A)$ de gauche à droite et se placer parmi les abonnés. On lit toujours l'indice en premier.\nRéponse : a) 0,25 ; b) 0,31 ; c) balcon.",
          micros: ["probaC_notation", "probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un agronome trie la récolte d'un verger : 500 caisses de pommes (modèle). On choisit une caisse au hasard.\na) Sachant que la caisse contient des Gala, quelle est la probabilité qu'elle soit de calibre B ?\nb) Sachant qu'elle contient des Golden, quelle est la probabilité qu'elle soit de calibre B ?\nc) Parmi les caisses de calibre B, quelle est la probabilité de choisir des Gala ?",
          figure: croise(["Variété", "Calibre A", "Calibre B", "Total"], [
            ["Gala", 240, 60, 300],
            ["Golden", 140, 60, 200],
            ["Total", 380, 120, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,3" },
            { question: "c)", attendu: "0,5" },
          ],
          correction:
            "a) $\\dfrac{60}{300} = 0{,}2$.\nb) $\\dfrac{60}{200} = 0{,}3$.\nc) Condition : calibre B, soit 120. $\\dfrac{60}{120} = 0{,}5$.\n⛔ Le piège : voir le même 60 sur les deux lignes et conclure que les deux variétés se valent. Rapporté à chaque variété, le calibre B est plus fréquent chez les Golden.\nRéponse : a) 0,2 ; b) 0,3 ; c) 0,5.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          enonce:
            "Un diagnostiqueur visite 500 logements (modèle) et note ceux qui ont une pompe à chaleur. On choisit un logement au hasard.\na) Pour la probabilité d'avoir une pompe à chaleur sachant que le logement est un appartement, quel est le dénominateur ?\nb) Calcule cette probabilité.\nc) Calcule la probabilité d'avoir une pompe à chaleur sachant que le logement est une maison.\nd) On lit : « pour la probabilité qu'un logement soit une maison, sachant qu'il a une pompe à chaleur, on divise par 200 ». Réponds vrai ou faux.",
          figure: croise(["Logement", "Pompe à chaleur", "Autre", "Total"], [
            ["Maison", 60, 140, 200],
            ["Appartement", 45, 255, 300],
            ["Total", 105, 395, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "0,15" },
            { question: "c)", attendu: "0,3" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) La condition est « appartement » : 300 logements.\nb) $\\dfrac{45}{300} = 0{,}15$.\nc) $\\dfrac{60}{200} = 0{,}3$.\nd) Faux : sachant « pompe à chaleur », le dénominateur est 105. La bonne fraction est $\\dfrac{60}{105}$. Diviser par 200, c'est le calcul du c), l'autre sens.\n⛔ Le piège au d) : garder le total de la ligne Maison, alors que la condition est la colonne Pompe à chaleur.\nRéponse : a) 300 ; b) 0,15 ; c) 0,3 ; d) faux.",
          micros: ["probaC_calculer_tableau"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on construit ou on lit le tableau, puis on change de condition selon la question.",
      rappel: [
        "Quand le tableau n'est pas donné, on le construit : deux lignes, deux colonnes, les totaux.",
        "À chaque question, on se demande : parmi qui ? Ce groupe donne le dénominateur.",
        "Pour comparer deux groupes de tailles différentes, on compare leurs probabilités conditionnelles, pas leurs effectifs.",
      ],
      exercices: [
        {
          titre: "Les trains en retard",
          enonce:
            "Une contrôleuse étudie 800 trajets (modèle) : 600 en TER et 200 en TGV. 15 % des TER sont en retard, et 50 TGV sont en retard. On choisit un trajet au hasard.\na) Combien de TER sont en retard ?\nb) Combien de trajets sont en retard en tout ?\nc) Sachant que le trajet se fait en TGV, quelle est la probabilité qu'il soit en retard ?\nd) Sachant que le trajet est en retard, quelle est la probabilité que ce soit un TGV ? Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "140" },
            { question: "c)", attendu: "0,25" },
            { question: "d)", attendu: "0,36", tolerance: 0.005 },
          ],
          correction:
            "a) 15 % de 600 : $600 \\times 0{,}15 = 90$ TER en retard.\nb) $90 + 50 = 140$ trajets en retard.\nc) Condition : TGV, soit 200 trajets. $\\dfrac{50}{200} = 0{,}25$.\nd) Condition : en retard, soit 140 trajets. $\\dfrac{50}{140} \\approx 0{,}36$.\n⛔ Le piège au d) : répondre 0,25. Parmi les TGV et parmi les retards, ce ne sont pas les mêmes groupes.\nRéponse : a) 90 ; b) 140 ; c) 0,25 ; d) 0,36.",
          schema: croise(["Train", "Retard", "À l'heure", "Total"], [
            ["TER", 90, 510, 600],
            ["TGV", 50, 150, 200],
            ["Total", 140, 660, 800],
          ]),
          micros: ["probaC_calculer_tableau"],
        },
        {
          titre: "Le sommeil des élèves",
          enonce:
            "Une infirmière scolaire interroge 400 élèves (modèle) : 160 au collège et 240 au lycée. 40 collégiens et 120 lycéens dorment moins de 8 heures. On choisit un élève au hasard.\na) La question « parmi les lycéens, quelle part dort moins de 8 heures ? » est-elle une conditionnelle ou une intersection ? Écris « conditionnelle » ou « intersection ».\nb) Sachant que l'élève est au collège, quelle est la probabilité qu'il dorme moins de 8 heures ?\nc) Sachant qu'il est au lycée, quelle est cette probabilité ?\nd) Sachant que l'élève dort moins de 8 heures, quelle est la probabilité qu'il soit au lycée ?",
          reponses: [
            { question: "a)", attendu: ["conditionnelle", "une conditionnelle", "probabilité conditionnelle", "une probabilité conditionnelle"] },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "0,5" },
            { question: "d)", attendu: "0,75" },
          ],
          correction:
            "a) « Parmi les lycéens » réduit la population : c'est une conditionnelle.\nb) $\\dfrac{40}{160} = 0{,}25$.\nc) $\\dfrac{120}{240} = 0{,}5$.\nd) Moins de 8 heures : $40 + 120 = 160$ élèves. $\\dfrac{120}{160} = 0{,}75$.\n⛔ Le piège au d) : diviser par 240. Le groupe de référence est celui des élèves qui dorment moins de 8 heures.\nRéponse : a) conditionnelle ; b) 0,25 ; c) 0,5 ; d) 0,75.",
          schema: croise(["Élève", "Moins de 8 h", "8 h ou plus", "Total"], [
            ["Collège", 40, 120, 160],
            ["Lycée", 120, 120, 240],
            ["Total", 160, 240, 400],
          ]),
          micros: ["probaC_reconnaitre", "probaC_calculer_tableau"],
        },
        {
          titre: "La meilleure agence",
          enonce:
            "Une directrice de réseau compare deux agences immobilières (modèle). L'agence Centre a organisé 180 visites et obtenu 36 ventes. L'agence Gare a organisé 120 visites et obtenu 30 ventes. Le responsable de Centre affirme : « on vend plus, donc on est meilleurs ». On choisit une visite au hasard.\na) Sachant que la visite a lieu à l'agence Centre, quelle est la probabilité d'une vente ?\nb) Sachant qu'elle a lieu à l'agence Gare, quelle est cette probabilité ?\nc) Quelle agence transforme le mieux ses visites ? Écris « Centre » ou « Gare ».\nd) Sachant que la visite est suivie d'une vente, quelle est la probabilité qu'elle vienne de Centre ? Arrondis au centième.",
          figure: croise(["Agence", "Vente", "Pas de vente", "Total"], [
            ["Centre", 36, 144, 180],
            ["Gare", 30, 90, 120],
            ["Total", 66, 234, 300],
          ]),
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: ["Gare", "la Gare", "agence Gare", "l'agence Gare"] },
            { question: "d)", attendu: "0,55", tolerance: 0.005 },
          ],
          correction:
            "a) $\\dfrac{36}{180} = 0{,}2$.\nb) $\\dfrac{30}{120} = 0{,}25$.\nc) 0,25 est plus grand que 0,2 : c'est l'agence Gare.\nd) Ventes en tout : 66. $\\dfrac{36}{66} \\approx 0{,}55$.\n⛔ Le piège au c) : comparer 36 et 30. Centre a fait plus de visites : ce sont les probabilités conditionnelles qui se comparent.\nRéponse : a) 0,2 ; b) 0,25 ; c) Gare ; d) 0,55.",
          micros: ["probaC_calculer_tableau"],
        },
        {
          titre: "La prévision du matin",
          enonce:
            "Un prévisionniste compare ses prévisions du matin et le temps de la journée sur 360 jours (modèle). On choisit un jour au hasard.\na) Sachant que la pluie était prévue, quelle est la probabilité qu'il ait plu ?\nb) Sachant que la pluie n'était pas prévue, quelle est la probabilité qu'il ait plu ?\nc) Sachant qu'il a plu, quelle est la probabilité que la pluie ait été prévue ? Arrondis au centième.\nd) Combien de jours la prévision s'est-elle trompée ?",
          figure: croise(["Prévision", "Pluie", "Pas de pluie", "Total"], [
            ["Pluie prévue", 72, 18, 90],
            ["Pas prévue", 27, 243, 270],
            ["Total", 99, 261, 360],
          ]),
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "0,1" },
            { question: "c)", attendu: "0,73", tolerance: 0.005 },
            { question: "d)", attendu: "45" },
          ],
          correction:
            "a) $\\dfrac{72}{90} = 0{,}8$.\nb) $\\dfrac{27}{270} = 0{,}1$.\nc) Condition : il a plu, soit 99 jours. $\\dfrac{72}{99} \\approx 0{,}73$.\nd) Il a plu sans être prévu : 27 jours. Prévu sans pluie : 18 jours. $27 + 18 = 45$ jours.\n⛔ Le piège au c) : confondre avec le a). « Il a plu quand c'était prévu » et « c'était prévu quand il a plu » n'ont pas le même dénominateur.\nRéponse : a) 0,8 ; b) 0,1 ; c) 0,73 ; d) 45.",
          micros: ["probaC_calculer_tableau"],
        },
      ],
    },
  ],
};
