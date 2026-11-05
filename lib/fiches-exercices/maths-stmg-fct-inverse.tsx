// ─── Fiche d'exercices : fonction inverse (STMG, terminale) — 20 exercices ──────
//
// Notion fct_inverse du coach, année de terminale (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonction-inverse.bank.ts`). Le coach
// demande : lire la courbe de x ↦ k/x, retrouver k par le produit x × y, ce que
// devient k/x quand x devient très grand ou très proche de 0 (sans limite ni
// définition d'asymptote : « s'approche de 0 sans l'atteindre »), et le coût moyen
// C(x) ÷ x = a + b/x, y compris retrouver la quantité pour un coût moyen visé. La
// dérivée est dans la feuille suivante (fct-inverse-derivee).
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : calculs et courbes sans contexte en ★, coût moyen d'un
// atelier (ex. 8) ; yoga (professeure), transport routier (chauffeuse), bijouterie
// (créatrice), fromagerie (fromager), photographie (photographe), pisciculture
// (pisciculteur), torréfaction (torréfacteur), achats (responsable) ; théâtre
// (troupe amateur), sport municipal (élue), piscine (nageuse), industrie (cheffe
// d'atelier).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fctT_inverse_courbe (1, 2, 3, 4, 9, 10, 14, 15, 18, 20),
// fctT_inverse_bornes (5, 6, 7, 11, 13, 15, 17, 18, 19), fctT_inverse_cout_moyen
// (8, 11, 12, 15, 16, 17, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

/** La forme a + b/x, exacte (sinon l'élève recopie (ax + b)/x), dans les écritures du clavier : la touche fraction donne (b)/(x). */
const formeSomme = (a: string, b: string) =>
  [`${b}/x`, `(${b})/(x)`, `(${b})/x`, `${b}/(x)`, `${b} ÷ x`].flatMap((q) => [`${a} + ${q}`, `${q} + ${a}`]);

export const exercicesFctInverseStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-inverse",
  titre: "Fonction inverse",
  accroche:
    "Vingt exercices sur la fonction inverse et son hyperbole : lire la courbe, retrouver le coefficient par le produit des coordonnées, voir ce qui se passe quand x devient très grand ou très proche de zéro, et surtout comprendre le coût moyen : la charge fixe se dilue, sans jamais disparaître. Un cours de yoga, une troupe de théâtre, un abonnement de piscine, deux fournisseurs. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer une image, utiliser le produit, ou dire ce que devient la fonction.",
      rappel: [
        "La fonction inverse : $f(x) = \\dfrac{1}{x}$, pour $x \\neq 0$. Sa courbe est une hyperbole. Plus généralement : $f(x) = \\dfrac{k}{x}$.",
        "Sur la courbe de $\\dfrac{k}{x}$, le produit des coordonnées de chaque point vaut $k$ : $x \\times y = k$.",
        "Quand $x$ devient très grand, $\\dfrac{k}{x}$ se rapproche de 0 sans jamais l'atteindre. Quand $x$ se rapproche de 0 (avec $x > 0$ et $k > 0$), $\\dfrac{k}{x}$ devient de plus en plus grand.",
        "Le coût moyen, c'est le coût total divisé par la quantité : $\\dfrac{C(x)}{x}$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = \\dfrac{1}{x}$.\na) Calcule $f(2)$.\nb) Calcule $f(4)$.\nc) Calcule $f(0{,}5)$.",
          reponses: [
            { question: "a)", attendu: "0,5" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "On divise 1 par le nombre.\na) $1 \\div 2 = 0{,}5$.\nb) $1 \\div 4 = 0{,}25$.\nc) $1 \\div 0{,}5 = 2$ : il y a deux moitiés dans 1.\n⛔ Le piège au c) : répondre 0,5. Diviser par un nombre plus petit que 1 AGRANDIT le résultat.\nRéponse : a) 0,5 ; b) 0,25 ; c) 2.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "La courbe représente la fonction $f(x) = \\dfrac{12}{x}$.\na) Lis $f(3)$.\nb) Lis $f(6)$.",
          figure: repere(
            [-1, 13, -1, 13],
            [{ pts: [[1, 12], [1.5, 8], [2, 6], [2.5, 4.8], [3, 4], [4, 3], [5, 2.4], [6, 2], [8, 1.5], [10, 1.2], [12, 1]] }],
            [],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2" },
          ],
          correction:
            "On part de $x$ sur l'axe horizontal, on va jusqu'à la courbe, on lit la hauteur.\na) En $x = 3$, la hauteur est 4. Vérification : $3 \\times 4 = 12$. ✔\nb) En $x = 6$, la hauteur est 2. Vérification : $6 \\times 2 = 12$. ✔\n⛔ Le piège : croire que la courbe descend régulièrement. Entre 3 et 6, elle perd 2, puis de moins en moins.\nRéponse : a) 4 ; b) 2.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Une hyperbole représente une fonction de la forme $f(x) = \\dfrac{k}{x}$. Elle passe par le point $A(4\\,;\\,5)$. Que vaut $k$ ?",
          reponses: [{ attendu: "20" }],
          correction:
            "Sur cette courbe, le produit des coordonnées vaut $k$.\n$k = 4 \\times 5 = 20$.\nLa fonction est donc $f(x) = \\dfrac{20}{x}$.\n⛔ Le piège : calculer $5 \\div 4$. On a $y = \\dfrac{k}{x}$, donc $k = x \\times y$ : on multiplie.\nRéponse : $k = 20$.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{24}{x}$. Réponds oui ou non.\na) Le point $A(3\\,;\\,8)$ est-il sur la courbe de $f$ ?\nb) Le point $B(4\\,;\\,5)$ est-il sur la courbe de $f$ ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "Un point est sur la courbe si le produit de ses coordonnées vaut 24.\na) $3 \\times 8 = 24$ : oui.\nb) $4 \\times 5 = 20$, ce n'est pas 24 : non.\n⛔ Le piège : ajouter les coordonnées. C'est le PRODUIT qui reste constant.\nRéponse : a) oui ; b) non.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{10}{x}$ sur $]0\\,;\\,+\\infty[$.\na) Calcule $f(100)$.\nb) Calcule $f(1\\,000)$.\nc) Que devient $f(x)$ quand $x$ devient de plus en plus grand ? Écris le numéro.\n1. Elle devient de plus en plus grande.\n2. Elle se rapproche de 0 sans jamais l'atteindre.\n3. Elle se rapproche de 10.",
          reponses: [
            { question: "a)", attendu: "0,1" },
            { question: "b)", attendu: "0,01" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) $10 \\div 100 = 0{,}1$.\nb) $10 \\div 1\\,000 = 0{,}01$.\nc) Les valeurs sont de plus en plus petites, mais toujours positives : c'est la phrase 2.\n⛔ Le piège : choisir la phrase 3 parce que le numérateur vaut 10. Le numérateur ne donne pas la valeur vers laquelle on va.\nRéponse : a) 0,1 ; b) 0,01 ; c) 2.",
          micros: ["fctT_inverse_bornes"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{5}{x}$ sur $]0\\,;\\,+\\infty[$.\na) Calcule $f(0{,}1)$.\nb) Calcule $f(0{,}01)$.\nc) Quand $x$ se rapproche de 0, $f(x)$ devient-elle de plus en plus grande ou de plus en plus petite ? Écris grande ou petite.",
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "500" },
            { question: "c)", attendu: ["grande", "plus grande", "de plus en plus grande"] },
          ],
          correction:
            "a) $5 \\div 0{,}1 = 50$.\nb) $5 \\div 0{,}01 = 500$.\nc) Les valeurs augmentent sans cesse : $f(x)$ devient de plus en plus grande.\n⛔ Le piège : croire qu'un petit $x$ donne un petit résultat. Ici, $x$ est au DÉNOMINATEUR : c'est l'inverse.\nRéponse : a) 50 ; b) 500 ; c) grande.",
          micros: ["fctT_inverse_bornes"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{20}{x}$ sur $]0\\,;\\,+\\infty[$. Un élève, Nolan, affirme : « quand $x$ devient très grand, $f(x)$ finit par valoir 0 ».\na) Calcule $f(1\\,000)$.\nb) L'élève a-t-il raison ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "0,02" },
            { question: "b)", attendu: "faux" },
          ],
          correction:
            "a) $20 \\div 1\\,000 = 0{,}02$.\nb) Un quotient n'est nul que si son numérateur est nul. Ici, le numérateur vaut 20 : $f(x)$ n'est jamais nul. C'est faux.\n⛔ Le piège : confondre « très petit » et « nul ». Une calculatrice peut afficher 0, mais le résultat reste au-dessus de zéro.\nRéponse : a) 0,02 ; b) faux.",
          micros: ["fctT_inverse_bornes"],
        },
        {
          enonce:
            "Le coût total de production de $x$ articles est $C(x) = 5x + 800$, en euros. Quel est le coût moyen par article pour $x = 100$ ?",
          reponses: [{ attendu: ["13 €", "13 € par article"] }],
          correction:
            "Le coût total : $C(100) = 5 \\times 100 + 800 = 1\\,300$ €.\nLe coût moyen : $1\\,300 \\div 100 = 13$ € par article.\n⛔ Le piège : répondre 1 300 €. C'est le coût de TOUS les articles, pas d'un seul.\nRéponse : 13 € par article.",
          micros: ["fctT_inverse_cout_moyen"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on écrit la fonction, on calcule plusieurs valeurs, on dit ce que cela signifie.",
      rappel: [
        "Si le coût total est $C(x) = ax + b$, le coût moyen est $a + \\dfrac{b}{x}$ : la part variable $a$ ne bouge pas, la charge fixe $b$ se répartit sur plus d'unités.",
        "Quand la quantité augmente, le coût moyen baisse et se rapproche de $a$, sans jamais l'atteindre.",
        "Pour un coût moyen visé : on écrit $a + \\dfrac{b}{x} =$ objectif, on isole $\\dfrac{b}{x}$, puis on divise $b$ par le nombre trouvé.",
      ],
      exercices: [
        {
          enonce:
            "Une professeure de yoga, Fatou, loue une salle 240 € par séance (modèle). Elle partage ce prix entre les $x$ participants : chacun paie $y = \\dfrac{240}{x}$ euros.\na) Combien chacun paie-t-il avec 8 participants ?\nb) Avec 12 participants ?\nc) Avec 20 participants ?\nd) Combien vaut le produit $x \\times y$ ?",
          reponses: [
            { question: "a)", attendu: "30 €" },
            { question: "b)", attendu: "20 €" },
            { question: "c)", attendu: "12 €" },
            { question: "d)", attendu: "240" },
          ],
          correction:
            "a) $240 \\div 8 = 30$ €.\nb) $240 \\div 12 = 20$ €.\nc) $240 \\div 20 = 12$ €.\nd) $8 \\times 30 = 240$ : le produit vaut toujours 240, le prix de la salle.\n⛔ Le piège : croire que 12 participants de plus retirent 12 € à chacun. Le prix par personne baisse de moins en moins vite.\nRéponse : a) 30 € ; b) 20 € ; c) 12 € ; d) 240.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Une chauffeuse routière fait un trajet de 180 km (modèle). La courbe donne la durée $y$, en heures, en fonction de sa vitesse moyenne, $x$ étant en dizaines de km/h.\na) Lis $y$ pour $x = 3$.\nb) Lis $y$ pour $x = 6$.\nc) Combien vaut le produit $x \\times y$ ?\nd) Écris $y$ en fonction de $x$.",
          figure: repere(
            [-1, 13, -1, 13],
            [{ pts: [[1.5, 12], [2, 9], [2.5, 7.2], [3, 6], [4, 4.5], [5, 3.6], [6, 3], [8, 2.25], [9, 2], [10, 1.8], [12, 1.5]] }],
            [{ x: 3, y: 6 }, { x: 6, y: 3 }],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "6 h" },
            { question: "b)", attendu: "3 h" },
            { question: "c)", attendu: "18" },
            { question: "d)", attendu: "18/x" },
          ],
          correction:
            "a) En $x = 3$, soit 30 km/h, on lit $y = 6$ heures.\nb) En $x = 6$, soit 60 km/h, on lit $y = 3$ heures.\nc) $3 \\times 6 = 18$ et $6 \\times 3 = 18$ : le produit est constant.\nd) $x \\times y = 18$, donc $y = \\dfrac{18}{x}$.\n⛔ Le piège au d) : écrire $y = \\dfrac{180}{x}$. Ici, $x$ compte des dizaines de km/h : le produit lu sur la courbe vaut 18.\nRéponse : a) 6 h ; b) 3 h ; c) 18 ; d) $y = \\dfrac{18}{x}$.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Une créatrice de bijoux a un coût total $C(x) = 8x + 1\\,200$, en euros, pour $x$ bijoux (modèle).\na) Écris le coût moyen sous la forme $a + \\dfrac{b}{x}$.\nb) Calcule le coût moyen pour 100 bijoux.\nc) Calcule le coût moyen pour 300 bijoux.\nd) Calcule le coût moyen pour 600 bijoux.\ne) De quelle valeur le coût moyen se rapproche-t-il quand la production augmente ?",
          reponses: [
            { question: "a)", attendu: formeSomme("8", "1200"), exact: true },
            { question: "b)", attendu: "20 €" },
            { question: "c)", attendu: "12 €" },
            { question: "d)", attendu: "10 €" },
            { question: "e)", attendu: "8 €" },
          ],
          correction:
            "a) $\\dfrac{8x + 1\\,200}{x} = 8 + \\dfrac{1\\,200}{x}$.\nb) $8 + 1\\,200 \\div 100 = 8 + 12 = 20$ €.\nc) $8 + 1\\,200 \\div 300 = 8 + 4 = 12$ €.\nd) $8 + 1\\,200 \\div 600 = 8 + 2 = 10$ €.\ne) $\\dfrac{1\\,200}{x}$ se rapproche de 0 : le coût moyen se rapproche de 8 €, le coût de fabrication de chaque bijou.\n⛔ Le piège au e) : répondre 0. La charge fixe se dilue, mais chaque bijou coûte toujours 8 €.\nRéponse : a) $8 + \\dfrac{1\\,200}{x}$ ; b) 20 € ; c) 12 € ; d) 10 € ; e) 8 €.",
          micros: ["fctT_inverse_bornes", "fctT_inverse_cout_moyen"],
        },
        {
          enonce:
            "Un fromager a un coût total $C(x) = 10x + 1\\,000$, en euros, pour $x$ fromages (modèle). Il vise un coût moyen de 15 € par fromage.\na) Écris le coût moyen sous la forme $a + \\dfrac{b}{x}$.\nb) Combien de fromages doit-il produire pour atteindre exactement 15 € ?\nc) Calcule le coût total pour cette quantité.",
          reponses: [
            { question: "a)", attendu: formeSomme("10", "1000"), exact: true },
            { question: "b)", attendu: "200" },
            { question: "c)", attendu: "3 000 €" },
          ],
          correction:
            "a) $\\dfrac{10x + 1\\,000}{x} = 10 + \\dfrac{1\\,000}{x}$.\nb) On résout $10 + \\dfrac{1\\,000}{x} = 15$.\nOn retire 10 : $\\dfrac{1\\,000}{x} = 5$. Donc $x = 1\\,000 \\div 5 = 200$.\nc) $C(200) = 2\\,000 + 1\\,000 = 3\\,000$ €.\nVérification : $3\\,000 \\div 200 = 15$. ✔\n⛔ Le piège au b) : diviser 1 000 par 15. On retire d'abord le coût de chaque fromage, 10 €.\nRéponse : a) $10 + \\dfrac{1\\,000}{x}$ ; b) 200 fromages ; c) 3 000 €.",
          micros: ["fctT_inverse_cout_moyen"],
        },
        {
          enonce:
            "Un photographe utilise le modèle $f(x) = \\dfrac{50}{x}$ : le temps de pose, en secondes, pour une sensibilité $x$ de son appareil.\na) Calcule $f(1)$.\nb) Calcule $f(10)$.\nc) Calcule $f(1\\,000)$.\nd) Existe-t-il une sensibilité $x > 0$ qui donne un temps de pose exactement nul ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "50 s" },
            { question: "b)", attendu: "5 s" },
            { question: "c)", attendu: "0,05 s" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $50 \\div 1 = 50$ s.\nb) $50 \\div 10 = 5$ s.\nc) $50 \\div 1\\,000 = 0{,}05$ s.\nd) Non : le numérateur 50 n'est pas nul, donc le quotient ne l'est jamais.\n⛔ Le piège au d) : répondre oui parce que les valeurs deviennent minuscules. La courbe s'approche de l'axe sans le toucher.\nRéponse : a) 50 s ; b) 5 s ; c) 0,05 s ; d) non.",
          micros: ["fctT_inverse_bornes"],
        },
        {
          enonce:
            "Un pisciculteur note $x$ le nombre de centaines de poissons d'un bassin, et $y$ leur masse moyenne, en kg (modèle). Il constate que $y = \\dfrac{k}{x}$, et que le point $A(2\\,;\\,9)$ est sur la courbe.\na) Que vaut $k$ ?\nb) Calcule $y$ pour $x = 6$.\nc) Pour quelle valeur de $x$ a-t-on $y = 1{,}5$ ?",
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: "3 kg" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) $k = 2 \\times 9 = 18$.\nb) $18 \\div 6 = 3$ kg.\nc) $x \\times 1{,}5 = 18$, donc $x = 18 \\div 1{,}5 = 12$.\n⛔ Le piège au c) : multiplier 18 par 1,5. Si le produit vaut 18, on retrouve l'autre coordonnée en DIVISANT.\nRéponse : a) 18 ; b) 3 kg ; c) 12.",
          micros: ["fctT_inverse_courbe"],
        },
        {
          enonce:
            "Un torréfacteur a un coût moyen $f(x) = 2 + \\dfrac{12}{x}$, en euros par paquet, pour $x$ milliers de paquets (modèle). La courbe représente $f$.\na) Lis $f(4)$.\nb) Lis $f(12)$.\nc) De quelle valeur $f(x)$ se rapproche-t-il quand $x$ devient très grand ?\nd) Cette valeur est-elle atteinte ? Réponds oui ou non.",
          figure: repere(
            [-1, 13, -1, 14],
            [{ pts: [[1, 14], [1.5, 10], [2, 8], [3, 6], [4, 5], [5, 4.4], [6, 4], [8, 3.5], [10, 3.2], [12, 3]] }],
            [],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "5 €" },
            { question: "b)", attendu: "3 €" },
            { question: "c)", attendu: "2 €" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) En $x = 4$, la hauteur est 5. Par le calcul : $2 + 12 \\div 4 = 5$.\nb) En $x = 12$, la hauteur est 3. Par le calcul : $2 + 12 \\div 12 = 3$.\nc) $\\dfrac{12}{x}$ se rapproche de 0 : $f(x)$ se rapproche de 2.\nd) Non : $\\dfrac{12}{x}$ n'est jamais nul, donc $f(x)$ reste au-dessus de 2.\n⛔ Le piège au c) : répondre 0, en oubliant le « 2 + ». Ce n'est pas $\\dfrac{12}{x}$ seule : la courbe est décalée de 2 vers le haut.\nRéponse : a) 5 € ; b) 3 € ; c) 2 € ; d) non.",
          micros: ["fctT_inverse_courbe", "fctT_inverse_bornes", "fctT_inverse_cout_moyen"],
        },
        {
          enonce:
            "Une responsable des achats compare deux fournisseurs (modèle). Pour $x$ articles, le coût total est $A(x) = 4x + 600$ chez A et $B(x) = 6x + 200$ chez B, en euros.\na) Donne le coût moyen pour 100 articles, chez A puis chez B.\nb) Donne le coût moyen pour 400 articles, chez A puis chez B.\nc) Pour quelle quantité les deux coûts moyens sont-ils égaux ?\nd) Pour 400 articles, quel fournisseur est le moins cher ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "10 ; 8", ordre: true },
            { question: "b)", attendu: "5,5 ; 6,5", ordre: true },
            { question: "c)", attendu: "200" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) A : $4 + 600 \\div 100 = 10$ €. B : $6 + 200 \\div 100 = 8$ €.\nb) A : $4 + 600 \\div 400 = 5{,}5$ €. B : $6 + 200 \\div 400 = 6{,}5$ €.\nc) Les coûts moyens sont égaux quand les coûts totaux le sont : $4x + 600 = 6x + 200$, donc $400 = 2x$ et $x = 200$.\nVérification : A et B donnent 7 € pour 200 articles. ✔\nd) 5,5 € contre 6,5 € : A.\n⛔ Le piège : garder le gagnant du a). À petite quantité, la grosse charge fixe de A pèse lourd ; à grande quantité, elle se dilue.\nRéponse : a) 10 ; 8 ; b) 5,5 ; 6,5 ; c) 200 ; d) A.",
          micros: ["fctT_inverse_cout_moyen"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : écrire la fonction, calculer, viser un objectif, dire ce qui se passe à grande échelle.",
      rappel: [
        "On distingue toujours le coût total $C(x)$ et le coût moyen $\\dfrac{C(x)}{x}$.",
        "Si $x$ double, $\\dfrac{k}{x}$ est divisé par 2 ; dans $a + \\dfrac{k}{x}$, seule la partie $\\dfrac{k}{x}$ est divisée par 2.",
        "Sur des courbes de $\\dfrac{k}{x}$, le coefficient $k$ se trouve avec un seul point : $k = x \\times y$.",
      ],
      exercices: [
        {
          titre: "Le théâtre de la troupe",
          enonce:
            "Une troupe amateur paie 1 800 € de frais fixes pour un spectacle, plus 3 € par spectateur (modèle). Pour $x$ spectateurs, le coût moyen est $f(x) = 3 + \\dfrac{1\\,800}{x}$.\na) Calcule le coût moyen pour 100 spectateurs.\nb) Calcule le coût moyen pour 300 spectateurs.\nc) Le billet est à 12 €. Pour combien de spectateurs le coût moyen vaut-il exactement 12 € ?\nd) De quelle valeur le coût moyen se rapproche-t-il avec beaucoup de spectateurs ?\ne) Atteindra-t-il cette valeur ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "21 €" },
            { question: "b)", attendu: "9 €" },
            { question: "c)", attendu: "200" },
            { question: "d)", attendu: "3 €" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) $3 + 1\\,800 \\div 100 = 3 + 18 = 21$ €.\nb) $3 + 1\\,800 \\div 300 = 3 + 6 = 9$ €.\nc) $3 + \\dfrac{1\\,800}{x} = 12$, donc $\\dfrac{1\\,800}{x} = 9$ et $x = 1\\,800 \\div 9 = 200$.\nd) $\\dfrac{1\\,800}{x}$ se rapproche de 0 : le coût moyen se rapproche de 3 €.\ne) Non : $\\dfrac{1\\,800}{x}$ n'est jamais nul.\n⛔ Le piège au c) : calculer $1\\,800 \\div 12 = 150$. Le billet doit couvrir aussi les 3 € par spectateur.\nRéponse : a) 21 € ; b) 9 € ; c) 200 spectateurs ; d) 3 € ; e) non.",
          micros: ["fctT_inverse_bornes", "fctT_inverse_cout_moyen"],
        },
        {
          titre: "La subvention des clubs",
          enonce:
            "Une élue partage une subvention de 6 000 € à parts égales entre $x$ clubs de sport (modèle).\na) Écris la part $y$ de chaque club en fonction de $x$.\nb) Calcule la part de chaque club pour 4 clubs.\nc) Calcule la part de chaque club pour 12 clubs.\nd) Pour combien de clubs chacun reçoit-il 250 € ?\ne) Si le nombre de clubs double, que devient la part de chacun ? Réponds « multipliée par 2 » ou « divisée par 2 ».\nf) La part peut-elle devenir nulle, même avec énormément de clubs ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "6000/x" },
            { question: "b)", attendu: "1 500 €" },
            { question: "c)", attendu: "500 €" },
            { question: "d)", attendu: "24" },
            { question: "e)", attendu: ["divisée par 2", "divisé par 2", "divisée par deux", "divisé par deux"] },
            { question: "f)", attendu: "non" },
          ],
          correction:
            "a) $x \\times y = 6\\,000$, donc $y = \\dfrac{6\\,000}{x}$.\nb) $6\\,000 \\div 4 = 1\\,500$ €.\nc) $6\\,000 \\div 12 = 500$ €.\nd) $x = 6\\,000 \\div 250 = 24$ clubs.\ne) De 12 à 24 clubs, la part passe de 500 € à 250 € : elle est divisée par 2.\nf) Non : $\\dfrac{6\\,000}{x}$ s'approche de 0 sans l'atteindre.\n⛔ Le piège au a) : écrire $y = 6\\,000 - x$. On partage, on ne retire pas.\nRéponse : a) $y = \\dfrac{6\\,000}{x}$ ; b) 1 500 € ; c) 500 € ; d) 24 clubs ; e) divisée par 2 ; f) non.",
          micros: ["fctT_inverse_courbe", "fctT_inverse_bornes"],
        },
        {
          titre: "L'abonnement de la piscine",
          enonce:
            "Une nageuse, Léa, hésite (modèle). L'abonnement annuel coûte 60 €, puis 2 € l'entrée. Sans abonnement, l'entrée est à 8 €. Pour $x$ entrées avec l'abonnement, le coût moyen d'une entrée est $f(x) = 2 + \\dfrac{60}{x}$.\na) Calcule $f(5)$.\nb) Calcule $f(30)$.\nc) Pour combien d'entrées le coût moyen vaut-il exactement 8 € ?\nd) Avec 20 entrées, l'abonnement est-il plus avantageux que le prix sans abonnement ? Réponds oui ou non.\ne) De quelle valeur le coût moyen se rapproche-t-il si elle nage très souvent ?",
          reponses: [
            { question: "a)", attendu: "14 €" },
            { question: "b)", attendu: "4 €" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "oui" },
            { question: "e)", attendu: "2 €" },
          ],
          correction:
            "a) $2 + 60 \\div 5 = 2 + 12 = 14$ €.\nb) $2 + 60 \\div 30 = 2 + 2 = 4$ €.\nc) $2 + \\dfrac{60}{x} = 8$, donc $\\dfrac{60}{x} = 6$ et $x = 60 \\div 6 = 10$.\nd) $f(20) = 2 + 3 = 5$ € : c'est moins que 8 €, donc oui.\ne) $\\dfrac{60}{x}$ se rapproche de 0 : le coût moyen se rapproche de 2 €.\n⛔ Le piège au c) : calculer $60 \\div 8$. Chaque entrée coûte déjà 2 € : seuls 6 € servent à rembourser l'abonnement.\nRéponse : a) 14 € ; b) 4 € ; c) 10 entrées ; d) oui ; e) 2 €.",
          micros: ["fctT_inverse_bornes", "fctT_inverse_cout_moyen"],
        },
        {
          titre: "Deux hyperboles à l'atelier",
          enonce:
            "Une cheffe d'atelier compare deux commandes (modèle). Avec $x$ ouvriers, la durée en heures suit $f(x) = \\dfrac{k}{x}$ pour la commande n° 1 (la courbe qui passe par le point A), et $g(x) = \\dfrac{m}{x}$ pour la commande n° 2 (la courbe qui passe par le point B).\na) Lis les coordonnées de A et calcule $k$.\nb) Lis les coordonnées de B et calcule $m$.\nc) Calcule $f(4)$.\nd) Calcule $g(4)$.\ne) Pour un même nombre d'ouvriers, combien de fois la commande n° 2 est-elle plus longue ?",
          figure: repere(
            [-1, 13, -1, 13],
            [
              { pts: [[1, 6], [1.5, 4], [2, 3], [3, 2], [4, 1.5], [6, 1], [8, 0.75], [12, 0.5]] },
              { pts: [[1, 12], [1.5, 8], [2, 6], [3, 4], [4, 3], [6, 2], [8, 1.5], [12, 1]], couleur: ORANGE },
            ],
            [{ x: 2, y: 3, label: "A" }, { x: 3, y: 4, label: "B" }],
            undefined,
            true,
          ),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "1,5 h" },
            { question: "d)", attendu: "3 h" },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "a) A a pour coordonnées $(2\\,;\\,3)$ : $k = 2 \\times 3 = 6$.\nb) B a pour coordonnées $(3\\,;\\,4)$ : $m = 3 \\times 4 = 12$.\nc) $f(4) = 6 \\div 4 = 1{,}5$ h.\nd) $g(4) = 12 \\div 4 = 3$ h.\ne) $3 \\div 1{,}5 = 2$ : la commande n° 2 est deux fois plus longue, car 12 est le double de 6.\n⛔ Le piège au a) : prendre l'ordonnée de A pour $k$. C'est le PRODUIT des deux coordonnées.\nRéponse : a) 6 ; b) 12 ; c) 1,5 h ; d) 3 h ; e) 2.",
          micros: ["fctT_inverse_courbe"],
        },
      ],
    },
  ],
};
