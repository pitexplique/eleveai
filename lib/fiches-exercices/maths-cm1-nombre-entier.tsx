// ─── Fiche d'exercices : les nombres entiers (CM1) — 20 exercices corrigés ────
//
// 10/11/2026 : la feuille de la notion `nombre_entier` du coach CM1 (9 micros),
// sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant
// chaque niveau, corrigés à la première personne, étape par étape, avec le
// piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur les banques du coach (`questionBank/cm1/maths/nombres-entiers.bank.ts`
// et `nombres-entiers-trous.bank.ts`) et sur la carte mentale `cm1/nombre_entier`
// (`lib/cartes/remplies/cm1.json`) : lire et écrire, comparer et ranger,
// décomposer, arrondir, multiples, diviseurs, droite graduée, encadrer, défis.
// ⛔ LIMITES DU CM1 : des entiers jusqu'au million, aucun calcul de division
// posée, des diviseurs vus comme « la division tombe juste ».
// ⛔ Aucune question à rédiger : QCM, oui ou non, un nombre, un mot court.
//
// Les pièges nommés : oublier les zéros (1, 11), « soixante-dix » lu « sept »
// (2), chiffre et nombre de centaines (3, 17), comparer le premier chiffre (4,
// 9, 19), arrondir « en coupant » (5, 12, 15), un nombre qui « finit par 4 »
// pris pour un multiple de 4 (6), compter les traits au lieu des écarts (7,
// 13), encadrer trop serré (8, 15), 12 centaines écrites 124 (11), les
// diviseurs oubliés, 1 et 12 (14), un indice oublié (16, 20), un carton avec
// un reste (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : santé et sport (10, podomètre), musique (12,
// salle de concert), cyclisme (13, distances en mètres), bibliothèque
// (17), livraison (18), musée (19), jeu d'évasion (20).
// Les métiers des problèmes : bibliothécaire (17), livreur (18), guide de
// musée (19), animatrice de jeu d'évasion (20).
// Aucun fait réel : tous les nombres sont des MODÈLES.
//
// Micro-compétences : entier_lire (1, 2, 10, 20), entier_comparer (4, 9, 10, 19),
// entier_decomposer (3, 11, 17), entier_arrondir (5, 12, 15, 17, 19, 20),
// entier_multiple (6, 14, 18, 20), entier_defi (16, 17, 18, 19, 20),
// entier_droite (7, 13), entier_diviseur (14, 18), entier_encadrer (8, 15). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { droiteRel, ecranSeulement, numeration } from "@/lib/fiches-exercices/dessins-cm1-nombres";

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

export const exercicesNombreEntierCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "nombre-entier",
  titre: "Les nombres entiers",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire et écrire les grands nombres. Les comparer, les ranger, les décomposer. Les arrondir et les encadrer. Les placer sur une droite graduée. Reconnaître un multiple et un diviseur. Un podomètre, une salle de concert, une course de vélo, une bibliothèque, des cartons de jus, un musée et un coffre à code. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je sépare les chiffres par paquets de trois, depuis la droite.",
      rappel: [
        "Je lis un grand nombre par paquets de trois chiffres : $45\\,207$ se lit « quarante-cinq mille deux cent sept ».",
        "Chaque chiffre a une valeur selon sa place : unités, dizaines, centaines, puis milliers.",
        "Pour comparer : le nombre qui a le plus de chiffres est le plus grand.",
        "Arrondir, c'est prendre le nombre rond le plus proche.",
      ],
      exercices: [
        {
          enonce: "Écris chaque nombre en chiffres.\na) trois mille huit\nb) quarante-cinq mille deux cent sept\nc) six cent mille quatre-vingts\nd) deux cent douze mille",
          reponses: [
            { question: "a)", attendu: "3008" },
            { question: "b)", attendu: "45207" },
            { question: "c)", attendu: "600080" },
            { question: "d)", attendu: "212000" },
          ],
          correction:
            "Je coupe au mot « mille ». Après « mille », il faut toujours trois chiffres.\na) « trois » mille, puis « huit ». Huit s'écrit $008$. Donc $3\\,008$.\nb) « quarante-cinq » mille, puis « deux cent sept ». Donc $45\\,207$.\nc) « six cent » mille, puis « quatre-vingts ». Quatre-vingts s'écrit $080$. Donc $600\\,080$.\nd) « deux cent douze » mille, puis rien. Donc $212\\,000$.\n⛔ Le piège : écrire $38$ pour « trois mille huit ». Je n'oublie pas les zéros.\nRéponse : a) $3\\,008$ ; b) $45\\,207$ ; c) $600\\,080$ ; d) $212\\,000$.",
          schema: ecranSeulement(numeration(["3008", "45207", "600080", "212000"], { noms: ["a)", "b)", "c)", "d)"] })),
          micros: ["entier_lire"],
        },
        {
          enonce: "Choisis la bonne réponse.\na) Comment s'écrit $70\\,405$ en lettres ?\nA) sept mille quatre cent cinq\nB) soixante-dix mille quatre cent cinq\nC) soixante-dix mille quarante-cinq\nb) Quel nombre s'écrit « neuf cent mille neuf » ?\nA) 900 009\nB) 9 009\nC) 900 900",
          reponses: [
            { question: "a)", attendu: ["B", "b) soixante-dix mille quatre cent cinq"] },
            { question: "b)", attendu: ["A", "a) 900 009", "900009"] },
          ],
          correction:
            "a) Je coupe $70\\,405$ en deux paquets : $70$ et $405$.\n$70$ mille se lit « soixante-dix mille ». $405$ se lit « quatre cent cinq ».\nC'est la réponse B : soixante-dix mille quatre cent cinq.\nb) « neuf cent » mille, puis « neuf ». Neuf s'écrit $009$ après mille.\nC'est la réponse A : $900\\,009$.\n⛔ Le piège : lire « sept mille » pour $70\\,405$. Le paquet des mille est $70$, pas $7$.\nRéponse : a) B ; b) A.",
          micros: ["entier_lire"],
        },
        {
          enonce: "Voici le nombre $58\\,362$.\na) Quel est le chiffre des centaines ?\nb) Quel est le chiffre des dizaines de mille ?\nc) Quel est le nombre de centaines ?\nd) Complète : $58\\,362 = 50\\,000 + 8\\,000 + \\ldots + 60 + 2$.",
          figure: numeration(["58362"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "583" },
            { question: "d)", attendu: "300" },
          ],
          correction:
            "Je range le nombre dans le tableau, les unités à droite.\na) Dans la colonne des centaines, je lis $3$.\nb) Dans la colonne des dizaines de mille, je lis $5$.\nc) Le nombre de centaines : je lis tous les chiffres jusqu'aux centaines. C'est $583$.\nd) Le $3$ des centaines vaut $300$. Donc $58\\,362 = 50\\,000 + 8\\,000 + 300 + 60 + 2$.\n⛔ Le piège : confondre « chiffre des centaines » ($3$) et « nombre de centaines » ($583$).\nRéponse : a) $3$ ; b) $5$ ; c) $583$ ; d) $300$.",
          micros: ["entier_decomposer"],
        },
        {
          enonce: "Complète par $<$ ou $>$.\na) $9\\,800$ … $12\\,050$\nb) $4\\,732$ … $4\\,750$\nc) $306\\,010$ … $306\\,001$\nd) $100\\,000$ … $99\\,999$",
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ">" },
          ],
          correction:
            "Je compte d'abord les chiffres. S'ils en ont autant, je compare depuis la gauche.\na) $4$ chiffres contre $5$ : $9\\,800 < 12\\,050$.\nb) Même longueur. Aux dizaines, $3 < 5$ : $4\\,732 < 4\\,750$.\nc) Même longueur. Aux dizaines, $1 > 0$ : $306\\,010 > 306\\,001$.\nd) $6$ chiffres contre $5$ : $100\\,000 > 99\\,999$.\n⛔ Le piège : croire que $9\\,800$ gagne parce qu'il commence par $9$. Je compte les chiffres d'abord.\nRéponse : a) $<$ ; b) $<$ ; c) $>$ ; d) $>$.",
          micros: ["entier_comparer"],
        },
        {
          enonce: "Arrondis chaque nombre.\na) $47$ à la dizaine\nb) $643$ à la centaine\nc) $3\\,580$ au millier\nd) $25\\,461$ au millier",
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "600" },
            { question: "c)", attendu: "4000" },
            { question: "d)", attendu: "25000" },
          ],
          correction:
            "Je cherche les deux nombres ronds autour, puis je prends le plus proche.\na) $47$ est entre $40$ et $50$. Il est plus près de $50$.\nb) $643$ est entre $600$ et $700$. $43$ est moins que $50$ : il est plus près de $600$.\nc) $3\\,580$ est entre $3\\,000$ et $4\\,000$. $580$ est plus que $500$ : il est plus près de $4\\,000$.\nd) $25\\,461$ est entre $25\\,000$ et $26\\,000$. $461$ est moins que $500$ : il est plus près de $25\\,000$.\n⛔ Le piège : « couper » le nombre. $47$ ne devient pas $40$ : il est plus près de $50$.\nRéponse : a) $50$ ; b) $600$ ; c) $4\\,000$ ; d) $25\\,000$.",
          schema: ecranSeulement(droiteRel(3000, 4000, 100, [{ value: 3580, label: "3 580" }], { nombres: 500 })),
          micros: ["entier_arrondir"],
        },
        {
          enonce: "Réponds par oui ou non.\na) $28$ est-il un multiple de $4$ ?\nb) $14$ est-il un multiple de $4$ ?\nc) $136$ est-il un multiple de $2$ ?\nd) Parmi $15$ ; $22$ ; $40$ ; $53$ ; $75$, écris les multiples de $5$.",
          reponses: [
            { question: "a)", attendu: OUI },
            { question: "b)", attendu: NON },
            { question: "c)", attendu: OUI },
            { question: "d)", attendu: "15 ; 40 ; 75" },
          ],
          correction:
            "Un multiple de $4$ est un résultat de la table de $4$.\na) $4 \\times 7 = 28$. Oui, $28$ est un multiple de $4$.\nb) $4 \\times 3 = 12$ et $4 \\times 4 = 16$. $14$ est entre les deux : non.\nc) Un multiple de $2$ est un nombre pair. $136$ finit par $6$ : il est pair. Oui.\nd) Un multiple de $5$ finit par $0$ ou par $5$. Je garde $15$, $40$ et $75$.\n⛔ Le piège : dire oui pour $14$ « parce qu'il finit par $4$ ». Je cherche dans la table de $4$.\nRéponse : a) oui ; b) non ; c) oui ; d) $15$ ; $40$ ; $75$.",
          micros: ["entier_multiple"],
        },
        {
          enonce: "Regarde la droite graduée.\na) Combien vaut un écart entre deux petits traits ?\nb) Quel nombre repère le point A ?\nc) Quel nombre repère le point B ?\nd) Quel nombre repère le point C ?",
          figure: droiteRel(200, 300, 10, [
            { value: 260, label: "A" },
            { value: 230, label: "B" },
            { value: 290, label: "C" },
          ], { nombres: 50 }),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "260" },
            { question: "c)", attendu: "230" },
            { question: "d)", attendu: "290" },
          ],
          correction:
            "a) De $200$ à $250$, je compte $5$ écarts. $50 \\div 5 = 10$ : un écart vaut $10$.\nb) A est $6$ écarts après $200$ : $200 + 60 = 260$.\nc) B est $3$ écarts après $200$ : $200 + 30 = 230$.\nd) C est $4$ écarts après $250$ : $250 + 40 = 290$.\n⛔ Le piège : croire qu'un écart vaut toujours $1$. Ici, il vaut $10$.\nRéponse : a) $10$ ; b) $260$ ; c) $230$ ; d) $290$.",
          micros: ["entier_droite"],
        },
        {
          enonce: "a) Encadre $648$ entre deux centaines : … $< 648 <$ …\nb) Encadre $3\\,684$ entre deux milliers : … $< 3\\,684 <$ …\nc) Écris un nombre entier entre $15$ et $18$.\nd) Quel nombre vient juste après $9\\,999$ ?",
          reponses: [
            { question: "a)", attendu: ["600 ; 700", "600 < 648 < 700"], ordre: true },
            { question: "b)", attendu: ["3000 ; 4000", "3000 < 3684 < 4000"], ordre: true },
            { question: "c)", attendu: ["16", "17"] },
            { question: "d)", attendu: "10000" },
          ],
          correction:
            "Encadrer, c'est trouver le nombre rond juste avant et celui juste après.\na) Je mets des $0$ aux dizaines et aux unités : $600$. La centaine suivante est $700$.\n$600 < 648 < 700$.\nb) Les milliers : $3\\,000$, puis $4\\,000$.\n$3\\,000 < 3\\,684 < 4\\,000$.\nc) Entre $15$ et $18$, il y a $16$ et $17$. L'un ou l'autre est juste.\nd) $9\\,999 + 1 = 10\\,000$ : dix mille.\n⛔ Le piège : encadrer $648$ par $640$ et $650$. On demande des centaines, pas des dizaines.\nRéponse : a) $600$ et $700$ ; b) $3\\,000$ et $4\\,000$ ; c) $16$ ou $17$ ; d) $10\\,000$.",
          micros: ["entier_encadrer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris les nombres dans un tableau au brouillon avant de répondre. Pour une liste, je sépare les nombres par « ; ».",
      rappel: [
        "Pour ranger, je compare d'abord le nombre de chiffres, puis chiffre par chiffre depuis la gauche.",
        "$12$ centaines, c'est $1\\,200$ : un millier et deux centaines.",
        "$3$ est un diviseur de $12$ si $12 \\div 3$ tombe juste, sans reste.",
      ],
      exercices: [
        {
          enonce: "Range ces nombres dans l'ordre croissant, du plus petit au plus grand.\n$45\\,300$ ; $4\\,530$ ; $45\\,030$ ; $453\\,000$ ; $45\\,003$",
          reponses: [
            { attendu: ["4530 < 45003 < 45030 < 45300 < 453000", "4530 ; 45003 ; 45030 ; 45300 ; 453000"], ordre: true },
          ],
          correction:
            "Je groupe d'abord les nombres par nombre de chiffres.\n$4$ chiffres : $4\\,530$. $6$ chiffres : $453\\,000$.\n$5$ chiffres : $45\\,300$, $45\\,030$ et $45\\,003$. Ils commencent tous par $45$.\nAux centaines : $3$, $0$ et $0$. Donc $45\\,300$ est le plus grand des trois.\nAux dizaines : $45\\,030$ a $3$, $45\\,003$ a $0$. Donc $45\\,003 < 45\\,030$.\n⛔ Le piège : ranger d'après les premiers chiffres. Ici, ils sont presque tous pareils.\nRéponse : $4\\,530 < 45\\,003 < 45\\,030 < 45\\,300 < 453\\,000$.",
          schema: ecranSeulement(numeration(["4530", "45003", "45030", "45300", "453000"])),
          micros: ["entier_comparer"],
        },
        {
          enonce: "Le podomètre de Malik compte ses pas.\nLundi : $12\\,480$ pas. Mardi : $9\\,875$ pas.\nMercredi : $12\\,408$ pas. Jeudi : $10\\,050$ pas.\na) Quel jour a-t-il fait le plus de pas ?\nb) Quel jour a-t-il fait le moins de pas ?\nc) Écris en lettres le nombre de pas du jeudi.",
          reponses: [
            { question: "a)", attendu: ["lundi", "le lundi"] },
            { question: "b)", attendu: ["mardi", "le mardi"] },
            { question: "c)", attendu: ["dix mille cinquante", "dix-mille-cinquante"], exact: true },
          ],
          correction:
            "a) Trois nombres ont $5$ chiffres. Je compare $12\\,480$, $12\\,408$ et $10\\,050$.\n$12\\,480$ et $12\\,408$ commencent par $124$. Aux dizaines, $8 > 0$.\nLe plus grand est $12\\,480$ : c'est lundi.\nb) $9\\,875$ n'a que $4$ chiffres : c'est le plus petit. C'est mardi.\nc) $10\\,050$ : « dix » mille, puis « cinquante ». Je lis « dix mille cinquante ».\n⛔ Le piège : croire que $9\\,875$ est grand parce qu'il commence par $9$.\nRéponse : a) lundi ; b) mardi ; c) dix mille cinquante.",
          micros: ["entier_comparer", "entier_lire"],
        },
        {
          enonce: "Écris chaque nombre en chiffres.\na) $7\\,000 + 400 + 9$\nb) $3 \\times 10\\,000 + 5 \\times 100 + 2$\nc) $12$ centaines et $4$ unités\nd) $6$ centaines de mille, $3$ milliers et $8$ dizaines",
          reponses: [
            { question: "a)", attendu: "7409" },
            { question: "b)", attendu: "30502" },
            { question: "c)", attendu: "1204" },
            { question: "d)", attendu: "603080" },
          ],
          correction:
            "Je calcule la valeur de chaque morceau, puis j'additionne. Les rangs vides reçoivent un $0$.\na) $7\\,000 + 400 + 9 = 7\\,409$. Il n'y a pas de dizaine : $0$ aux dizaines.\nb) $30\\,000 + 500 + 2 = 30\\,502$.\nc) $12$ centaines, c'est $1\\,200$. Puis $1\\,200 + 4 = 1\\,204$.\nd) $600\\,000 + 3\\,000 + 80 = 603\\,080$.\n⛔ Le piège du c) : écrire $124$. Une colonne ne contient qu'un seul chiffre.\nRéponse : a) $7\\,409$ ; b) $30\\,502$ ; c) $1\\,204$ ; d) $603\\,080$.",
          schema: ecranSeulement(numeration(["7409", "30502", "1204", "603080"], { noms: ["a)", "b)", "c)", "d)"] })),
          micros: ["entier_decomposer"],
        },
        {
          enonce: "Un soir, $2\\,468$ personnes viennent écouter un concert.\na) Arrondis ce nombre à la centaine.\nb) Arrondis-le au millier.\nc) Arrondis-le à la dizaine.\nd) Le journal écrit « environ 2 500 personnes ». Comment a-t-il arrondi ?\nA) à la dizaine B) au millier C) à la centaine",
          reponses: [
            { question: "a)", attendu: "2500" },
            { question: "b)", attendu: "2000" },
            { question: "c)", attendu: "2470" },
            { question: "d)", attendu: ["C", "c) à la centaine"] },
          ],
          correction:
            "a) $2\\,468$ est entre $2\\,400$ et $2\\,500$. $68$ est plus que $50$ : j'arrondis à $2\\,500$.\nb) $2\\,468$ est entre $2\\,000$ et $3\\,000$. $468$ est moins que $500$ : j'arrondis à $2\\,000$.\nc) $2\\,468$ est entre $2\\,460$ et $2\\,470$. $8$ est plus que $5$ : j'arrondis à $2\\,470$.\nd) $2\\,500$, c'est l'arrondi à la centaine du a). Réponse C.\n⛔ Le piège du b) : arrondir à $3\\,000$ « parce que $2\\,468$ est grand ». Je regarde $468$ : moins que $500$.\nRéponse : a) $2\\,500$ ; b) $2\\,000$ ; c) $2\\,470$ ; d) C.",
          micros: ["entier_arrondir"],
        },
        {
          enonce: "Une course de vélo fait $50\\,000$ mètres. La droite montre la fin du parcours, en mètres.\na) Combien vaut un écart entre deux traits ?\nb) Quel nombre repère le point A ?\nc) Quel nombre repère le point B ?\nd) Combien d'écarts faut-il compter depuis $40\\,000$ pour placer $46\\,000$ ?",
          figure: droiteRel(40000, 50000, 2000, [
            { value: 44000, label: "A" },
            { value: 48000, label: "B" },
          ], { nombres: 10000 }),
          reponses: [
            { question: "a)", attendu: "2000" },
            { question: "b)", attendu: "44000" },
            { question: "c)", attendu: "48000" },
            { question: "d)", attendu: "3" },
          ],
          correction:
            "a) De $40\\,000$ à $50\\,000$, il y a $10\\,000$. Je compte $5$ écarts.\n$10\\,000 \\div 5 = 2\\,000$ : un écart vaut $2\\,000$.\nb) A est $2$ écarts après $40\\,000$ : $40\\,000 + 4\\,000 = 44\\,000$.\nc) B est $4$ écarts après $40\\,000$ : $40\\,000 + 8\\,000 = 48\\,000$.\nd) $46\\,000 - 40\\,000 = 6\\,000$. Et $6\\,000 = 3 \\times 2\\,000$ : $3$ écarts.\n⛔ Le piège : compter les traits, $40\\,000$ compris. On trouverait $3$ traits pour A au lieu de $2$ écarts.\nRéponse : a) $2\\,000$ ; b) $44\\,000$ ; c) $48\\,000$ ; d) $3$ écarts.",
          micros: ["entier_droite"],
        },
        {
          enonce: "a) $3$ est-il un diviseur de $12$ ? Réponds par oui ou non.\nb) $5$ est-il un diviseur de $12$ ?\nc) Écris tous les diviseurs de $12$.\nd) Quel nombre de la table de $6$ est entre $40$ et $45$ ?",
          reponses: [
            { question: "a)", attendu: OUI },
            { question: "b)", attendu: NON },
            { question: "c)", attendu: "1 ; 2 ; 3 ; 4 ; 6 ; 12" },
            { question: "d)", attendu: "42" },
          ],
          correction:
            "Un diviseur de $12$ partage $12$ sans reste.\na) $12 \\div 3 = 4$, sans reste. Oui : $3 \\times 4 = 12$.\nb) $5 \\times 2 = 10$ et $5 \\times 3 = 15$. $12$ n'est pas dans la table de $5$. Non.\nc) Je cherche les produits égaux à $12$ : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$.\nLes diviseurs sont $1$ ; $2$ ; $3$ ; $4$ ; $6$ ; $12$.\nd) Table de $6$ : $36$, $42$, $48$. Seul $42$ est entre $40$ et $45$ : $6 \\times 7 = 42$.\n⛔ Le piège du c) : oublier $1$ et $12$. Tout nombre se divise par $1$ et par lui-même.\nRéponse : a) oui ; b) non ; c) $1$ ; $2$ ; $3$ ; $4$ ; $6$ ; $12$ ; d) $42$.",
          micros: ["entier_diviseur", "entier_multiple"],
        },
        {
          enonce: "Encadre $37\\,485$.\na) Entre deux dizaines : … $< 37\\,485 <$ …\nb) Entre deux centaines : … $< 37\\,485 <$ …\nc) Entre deux milliers : … $< 37\\,485 <$ …\nd) Arrondis $37\\,485$ au millier.",
          reponses: [
            { question: "a)", attendu: ["37480 ; 37490", "37480 < 37485 < 37490"], ordre: true },
            { question: "b)", attendu: ["37400 ; 37500", "37400 < 37485 < 37500"], ordre: true },
            { question: "c)", attendu: ["37000 ; 38000", "37000 < 37485 < 38000"], ordre: true },
            { question: "d)", attendu: "37000" },
          ],
          correction:
            "a) Je mets un $0$ aux unités : $37\\,480$. La dizaine suivante est $37\\,490$.\n$37\\,480 < 37\\,485 < 37\\,490$.\nb) Je mets des $0$ aux dizaines et aux unités : $37\\,400$, puis $37\\,500$.\n$37\\,400 < 37\\,485 < 37\\,500$.\nc) Les milliers : $37\\,000$, puis $38\\,000$.\n$37\\,000 < 37\\,485 < 38\\,000$.\nd) $485$ est moins que $500$ : $37\\,485$ est plus près de $37\\,000$.\n⛔ Le piège du b) : écrire $37\\,400 < 37\\,485 < 37\\,490$. Les deux centaines doivent se suivre.\nRéponse : a) $37\\,480$ et $37\\,490$ ; b) $37\\,400$ et $37\\,500$ ; c) $37\\,000$ et $38\\,000$ ; d) $37\\,000$.",
          micros: ["entier_encadrer", "entier_arrondir"],
        },
        {
          enonce: "Devinettes : qui suis-je ?\na) Je suis entre $30$ et $40$. Mon chiffre des unités est $5$.\nb) J'ai trois chiffres. Mon chiffre des centaines est $4$. Mon chiffre des dizaines est $0$. Mon chiffre des unités est le double de $4$.\nc) Je suis le plus grand nombre de quatre chiffres.\nd) Je suis le plus petit nombre de cinq chiffres tous différents.",
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "408" },
            { question: "c)", attendu: "9999" },
            { question: "d)", attendu: "10234" },
          ],
          correction:
            "Je trouve les chiffres un par un, rang par rang.\na) Entre $30$ et $40$, le chiffre des dizaines est $3$. Les unités : $5$. Je suis $35$.\nb) Centaines : $4$. Dizaines : $0$. Unités : le double de $4$, c'est $8$. Je suis $408$.\nc) Je mets le plus grand chiffre, $9$, partout : $9\\,999$.\nd) Je mets les plus petits chiffres, de gauche à droite. Le premier ne peut pas être $0$ : je mets $1$.\nPuis $0$, $2$, $3$, $4$. Je suis $10\\,234$.\n⛔ Le piège du a) : répondre $53$. $53$ n'est pas entre $30$ et $40$.\nRéponse : a) $35$ ; b) $408$ ; c) $9\\,999$ ; d) $10\\,234$.",
          micros: ["entier_defi", "entier_decomposer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je souligne les nombres, puis je réponds pas à pas.",
      rappel: [
        "Le nombre de milliers se lit jusqu'à la colonne des milliers : $24\\,380$ a $24$ milliers.",
        "Un carton est complet quand la division tombe juste : $36 \\div 4 = 9$, sans reste.",
        "Pour arrondir à la centaine, je regarde les dizaines et les unités : moins de $50$, j'arrondis en dessous.",
      ],
      exercices: [
        {
          titre: "Les livres de la bibliothécaire",
          enonce: "Samia est bibliothécaire. Sa bibliothèque a $24\\,380$ livres.\na) Combien de milliers de livres y a-t-il ?\nb) Elle reçoit $1\\,000$ livres de plus. Combien de livres a-t-elle alors ?\nc) Au départ, elle range ses $24\\,380$ livres par paquets de $10$. Combien de paquets fait-elle ?\nd) Arrondis $24\\,380$ au millier.",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "25380" },
            { question: "c)", attendu: "2438" },
            { question: "d)", attendu: "24000" },
          ],
          correction:
            "a) Le nombre de milliers : je lis jusqu'à la colonne des milliers. C'est $24$.\nb) Mille de plus : le chiffre des milliers augmente de $1$. $24\\,380 + 1\\,000 = 25\\,380$.\nc) Le nombre de dizaines : je lis jusqu'à la colonne des dizaines. C'est $2\\,438$ paquets de $10$.\nJe vérifie : $2\\,438 \\times 10 = 24\\,380$.\nd) $380$ est moins que $500$ : $24\\,380$ s'arrondit à $24\\,000$.\n⛔ Le piège du a) : répondre $4$, le chiffre des milliers. On demande le NOMBRE de milliers.\nRéponse : a) $24$ ; b) $25\\,380$ ; c) $2\\,438$ paquets ; d) $24\\,000$.",
          schema: ecranSeulement(numeration(["24380"], { surligne: 3 })),
          micros: ["entier_decomposer", "entier_arrondir", "entier_defi"],
        },
        {
          titre: "Les cartons du livreur",
          enonce: "Théo est livreur. Il doit ranger $36$ bouteilles de jus dans des cartons. Tous les cartons ont le même nombre de bouteilles. Il ne doit rester aucune bouteille.\na) Peut-il faire des cartons de $4$ bouteilles ? Réponds par oui ou non.\nb) Peut-il faire des cartons de $5$ bouteilles ?\nc) Avec des cartons de $6$ bouteilles, combien de cartons remplit-il ?\nd) Il veut des cartons de plus de $10$ bouteilles et de moins de $15$. Combien de bouteilles met-il par carton ?",
          reponses: [
            { question: "a)", attendu: OUI },
            { question: "b)", attendu: NON },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "12" },
          ],
          correction:
            "Un carton complet, sans reste : la taille du carton doit être un diviseur de $36$.\na) $4 \\times 9 = 36$. Oui : $9$ cartons de $4$.\nb) $5 \\times 7 = 35$ : il reste $1$ bouteille. Non.\nc) $6 \\times 6 = 36$ : il remplit $6$ cartons.\nd) J'essaie $11$, $12$, $13$, $14$. Seul $12$ marche : $12 \\times 3 = 36$.\n⛔ Le piège du b) : dire oui car $7$ cartons « presque » pleins. Il reste une bouteille : ce n'est pas juste.\nRéponse : a) oui ; b) non ; c) $6$ cartons ; d) $12$ bouteilles.",
          micros: ["entier_diviseur", "entier_multiple", "entier_defi"],
        },
        {
          titre: "Les visiteurs du musée",
          enonce: "Lucie est guide dans un musée. Elle note les visiteurs de quatre mois.\nJanvier : $18\\,540$. Février : $21\\,305$.\nMars : $18\\,450$. Avril : $21\\,350$.\na) Quel mois a eu le plus de visiteurs ?\nb) Quel mois a eu le moins de visiteurs ?\nc) Combien de mois ont eu plus de $20\\,000$ visiteurs ?\nd) Arrondis le nombre de janvier à la centaine.",
          reponses: [
            { question: "a)", attendu: ["avril", "en avril"] },
            { question: "b)", attendu: ["mars", "en mars"] },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "18500" },
          ],
          correction:
            "a) Février et avril commencent par $21\\,3$. Aux dizaines, $5 > 0$ : $21\\,350 > 21\\,305$. C'est avril.\nb) Janvier et mars commencent par $18$. Aux centaines, $4 < 5$ : $18\\,450 < 18\\,540$. C'est mars.\nc) Février et avril dépassent $20\\,000$. Janvier et mars non. Cela fait $2$ mois.\nd) $18\\,540$ est entre $18\\,500$ et $18\\,600$. $40$ est moins que $50$ : $18\\,500$.\n⛔ Le piège : confondre $18\\,540$ et $18\\,450$. Ils ont les mêmes chiffres, mais pas aux mêmes places.\nRéponse : a) avril ; b) mars ; c) $2$ mois ; d) $18\\,500$.",
          schema: ecranSeulement(numeration(["18540", "21305", "18450", "21350"], { noms: ["janv.", "févr.", "mars", "avril"] })),
          micros: ["entier_comparer", "entier_arrondir", "entier_defi"],
        },
        {
          titre: "Le coffre du jeu d'évasion",
          enonce: "Nadia anime un jeu d'évasion. Le code du coffre est un nombre de six chiffres.\n· Le chiffre des centaines de mille est $7$.\n· Le chiffre des dizaines de mille est $0$.\n· Le chiffre des milliers est $3$.\n· Le chiffre des centaines est le double de celui des milliers.\n· Le chiffre des dizaines est $0$, et celui des unités est $5$.\na) Écris le code en chiffres.\nb) Écris-le en lettres.\nc) Arrondis le code au millier.\nd) Le code est-il un multiple de $5$ ? Réponds par oui ou non.",
          reponses: [
            { question: "a)", attendu: "703605" },
            { question: "b)", attendu: ["sept cent trois mille six cent cinq", "sept-cent-trois-mille-six-cent-cinq"], exact: true },
            { question: "c)", attendu: "704000" },
            { question: "d)", attendu: OUI },
          ],
          correction:
            "a) Je remplis les rangs de gauche à droite : $7$, $0$, $3$.\nLes centaines : le double de $3$, c'est $6$. Puis $0$ et $5$. Le code est $703\\,605$.\nb) « sept cent trois » mille, puis « six cent cinq » : sept cent trois mille six cent cinq.\nc) $703\\,605$ est entre $703\\,000$ et $704\\,000$. $605$ est plus que $500$ : $704\\,000$.\nd) Il finit par $5$ : oui, c'est un multiple de $5$.\n⛔ Le piège : oublier un indice, par exemple le $0$ des dizaines de mille. On écrirait $73\\,605$, qui n'a que cinq chiffres.\nRéponse : a) $703\\,605$ ; b) sept cent trois mille six cent cinq ; c) $704\\,000$ ; d) oui.",
          schema: ecranSeulement(numeration(["703605"])),
          micros: ["entier_lire", "entier_arrondir", "entier_multiple", "entier_defi"],
        },
      ],
    },
  ],
};
