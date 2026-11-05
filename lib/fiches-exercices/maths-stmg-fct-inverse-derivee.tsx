// ─── Fiche d'exercices : fonction inverse, dérivée et variations (STMG, Tle) ────
//
// Notion fct_inverse_derivee du coach, année de terminale (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonction-inverse.bank.ts`). Le coach
// demande : (k/x)′ = −k/x², la valeur f′(x₀) (le carré d'abord, le signe moins
// ensuite), le sens de variation selon le signe de k, sur CHAQUE intervalle et
// pas sur leur réunion (comparer de part et d'autre de 0 se fait par les signes),
// et les combinaisons a + b/x et ax + b/x dérivées terme à terme, jusqu'au
// minimum par f′(x) = 0, qui mène à x² = c. On reste à ce niveau : ax + b + c/x
// (un coût moyen) au plus, pas de degré 3 écrit, pas de limite.
//
// ⭐ AUCUNE DONNÉE RÉELLE : tous les nombres sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : huit exercices sans contexte en ★, sauf le coût moyen de
// l'ex. 8 ; pharmacie (pharmacien), couture (couturière), secours (pompier),
// entrepôt (magasinier), fleurs (grossiste), start-up (analyste), calcul nu
// (ex. 15), communication (chargée de communication) ; cave à vin (caviste),
// pâtisserie (pâtissière), jeu vidéo (studio), transport maritime (armateur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-1.mjs`.
//
// Micro-compétences : fctT_inverse_derivee (1, 2, 3, 4, 11, 14, 16),
// fctT_inverse_variations (5, 6, 7, 11, 14, 15, 16), fctT_inverse_combinaison
// (8, 9, 10, 12, 13, 17, 18, 19, 20). 3/3.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Le signe, ou la comparaison écrite en entier, dans les deux sens. */
const compare = (a: string, s: "<" | ">", b: string) => [s, `f(${a}) ${s} f(${b})`, `f(${b}) ${s === "<" ? ">" : "<"} f(${a})`];

/** Ex. 18 a) : la somme de trois termes, exacte (sinon l'élève recopie C(x)/x), dans les écritures du clavier : la touche fraction donne (400)/(x). */
const troisTermes = ["400/x", "(400)/(x)", "(400)/x", "400/(x)", "400 ÷ x"].flatMap((q) => [`x + 5 + ${q}`, `5 + x + ${q}`, `${q} + x + 5`, `${q} + 5 + x`, `x + ${q} + 5`, `5 + ${q} + x`]);

/** Le tableau de variations du corrigé, avec la ligne du signe de f′(x). Bornes
 *  et valeurs en texte nu : vrai signe moins, virgule décimale. */
const tableauAvecDerivee = (bornes: string[], signes: ("+" | "-")[], valeurs: string[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        bornes,
        derivee: { label: "f ′(x)", signes, marques: Array(bornes.length - 2).fill("0") },
        variations: { label: "f(x)", valeurs },
      }}
    />
  </div>
);

export const exercicesFctInverseDeriveeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-inverse-derivee",
  titre: "Fonction inverse : dérivée et variations",
  accroche:
    "Vingt exercices pour dériver la fonction inverse et s'en servir : le signe moins qu'on oublie, le sens de variation sur chaque intervalle, puis les coûts qui mêlent une partie en x et une partie en 1/x, jusqu'à trouver le coût le plus bas. Une commande de pharmacie, un entrepôt, une cave à vin, la vitesse d'un cargo. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire la dérivée, calculer un nombre dérivé, ou donner un sens de variation.",
      rappel: [
        "La dérivée de $\\dfrac{1}{x}$ est $-\\dfrac{1}{x^2}$. Celle de $\\dfrac{k}{x}$ est $-\\dfrac{k}{x^2}$. La dérivée d'une constante est 0.",
        "$x^2$ est toujours positif (pour $x \\neq 0$) : le signe de $f'(x)$ est l'opposé de celui de $k$.",
        "$k > 0$ : $f$ est décroissante sur $]-\\infty\\,;\\,0[$ ET sur $]0\\,;\\,+\\infty[$. $k < 0$ : elle est croissante sur chacun.",
        "Ce sens ne vaut que sur UN intervalle. De part et d'autre de 0, on compare par les signes des images.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = \\dfrac{1}{x}$ sur $]0\\,;\\,+\\infty[$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: "-1/x²" }],
          correction:
            "C'est la formule du cours : $f'(x) = -\\dfrac{1}{x^2}$.\n⛔ Le piège : oublier le signe moins, ou écrire $\\dfrac{1}{x^2}$. Le signe moins fait partie de la formule : la fonction descend.\nRéponse : $f'(x) = -\\dfrac{1}{x^2}$.",
          micros: ["fctT_inverse_derivee"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{7}{x}$ sur $]0\\,;\\,+\\infty[$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: "-7/x²" }],
          correction:
            "$f(x) = 7 \\times \\dfrac{1}{x}$ : multiplier la fonction par 7 multiplie sa dérivée par 7.\n$f'(x) = 7 \\times \\left(-\\dfrac{1}{x^2}\\right) = -\\dfrac{7}{x^2}$.\n⛔ Le piège : écrire $-\\dfrac{1}{7x^2}$. Le 7 reste au numérateur.\nRéponse : $f'(x) = -\\dfrac{7}{x^2}$.",
          micros: ["fctT_inverse_derivee"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{12}{x}$ sur $]0\\,;\\,+\\infty[$. Calcule $f'(2)$.",
          reponses: [{ attendu: "-3" }],
          correction:
            "On écrit d'abord la dérivée : $f'(x) = -\\dfrac{12}{x^2}$.\nOn remplace $x$ par 2 : $f'(2) = -\\dfrac{12}{2^2} = -\\dfrac{12}{4} = -3$.\n⛔ Le piège : calculer $-12 \\div 2 = -6$. On oublie le carré.\nRéponse : $-3$.",
          micros: ["fctT_inverse_derivee"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{18}{x}$ sur $]0\\,;\\,+\\infty[$. Calcule $f'(3)$.",
          reponses: [{ attendu: "-2" }],
          correction:
            "$f'(x) = -\\dfrac{18}{x^2}$.\n$f'(3) = -\\dfrac{18}{3^2} = -\\dfrac{18}{9} = -2$.\n⛔ Le piège : répondre 2. Un nombre dérivé de cette fonction est toujours négatif, puisque $k = 18$ est positif.\nRéponse : $-2$.",
          micros: ["fctT_inverse_derivee"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{8}{x}$. Quel est le sens de variation de $f$ sur $]0\\,;\\,+\\infty[$ ? Écris croissante ou décroissante.",
          reponses: [{ attendu: "décroissante" }],
          correction:
            "$f'(x) = -\\dfrac{8}{x^2}$.\n$x^2$ est positif, donc $f'(x)$ est négatif : $f$ est décroissante.\n⛔ Le piège : dire « 8 est positif, donc $f$ est croissante ». Le signe de $f'(x)$ est l'OPPOSÉ de celui de $k$.\nRéponse : décroissante.",
          micros: ["fctT_inverse_variations"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{-6}{x}$. Quel est le sens de variation de $f$ sur $]0\\,;\\,+\\infty[$ ? Écris croissante ou décroissante.",
          reponses: [{ attendu: "croissante" }],
          correction:
            "Ici $k = -6$, donc $f'(x) = -\\dfrac{-6}{x^2} = \\dfrac{6}{x^2}$.\nC'est positif pour tout $x \\neq 0$ : $f$ est croissante.\n⛔ Le piège : répondre « décroissante » par réflexe, sans regarder le signe de $k$.\nRéponse : croissante.",
          micros: ["fctT_inverse_variations"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{4}{x}$. Sans dérivée, compare $f(-2)$ et $f(3)$. Écris le signe < ou >, pour $f(-2)$ … $f(3)$.",
          reponses: [{ attendu: compare("-2", "<", "3") }],
          correction:
            "$-2$ et 3 sont de part et d'autre de 0 : on compare par les signes.\n$f(-2) = 4 \\div (-2) = -2$ : négatif. $f(3) = 4 \\div 3$ : positif.\nUn nombre négatif est plus petit qu'un nombre positif : $f(-2) < f(3)$.\n⛔ Le piège : dire « $f$ est décroissante, donc l'ordre est inversé ». Elle ne l'est que sur chaque intervalle, pas sur leur réunion.\nRéponse : <.",
          micros: ["fctT_inverse_variations"],
        },
        {
          enonce: "Un coût moyen s'écrit $f(x) = 3 + \\dfrac{200}{x}$ pour $x > 0$. Donne l'expression de $f'(x)$.",
          reponses: [{ attendu: "-200/x²" }],
          correction:
            "On dérive terme à terme.\nLa dérivée de la constante 3 est 0. Celle de $\\dfrac{200}{x}$ est $-\\dfrac{200}{x^2}$.\nDonc $f'(x) = -\\dfrac{200}{x^2}$.\n⛔ Le piège : garder le 3 et écrire $3 - \\dfrac{200}{x^2}$. La dérivée d'une constante est nulle.\nRéponse : $f'(x) = -\\dfrac{200}{x^2}$.",
          micros: ["fctT_inverse_combinaison"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "On dérive terme à terme, on regarde le signe, on conclut sur le sens de variation ou sur le minimum.",
      rappel: [
        "On dérive terme à terme : $f(x) = ax + \\dfrac{b}{x}$ donne $f'(x) = a - \\dfrac{b}{x^2}$.",
        "Pour trouver un minimum : on résout $f'(x) = 0$, ce qui mène à $x^2 = c$. Une quantité est positive : on garde la solution positive.",
        "$f'(x)$ négatif : $f$ descend. $f'(x)$ positif : $f$ monte. Si le signe passe de moins à plus, c'est un minimum.",
      ],
      exercices: [
        {
          enonce:
            "Un pharmacien, Paul, modélise le coût de gestion de son stock, en euros, par $f(x) = 2x + \\dfrac{200}{x}$, où $x > 0$ est la taille d'une commande.\na) Donne l'expression de $f'(x)$.\nb) Calcule $f'(5)$.\nc) Calcule $f'(20)$.\nd) Pour $x = 5$, le coût baisse-t-il ou monte-t-il quand $x$ augmente ? Écris baisse ou monte.",
          reponses: [
            { question: "a)", attendu: "2 - 200/x²" },
            { question: "b)", attendu: "-6" },
            { question: "c)", attendu: "1,5" },
            { question: "d)", attendu: "baisse" },
          ],
          correction:
            "a) Terme à terme : la dérivée de $2x$ est 2, celle de $\\dfrac{200}{x}$ est $-\\dfrac{200}{x^2}$. Donc $f'(x) = 2 - \\dfrac{200}{x^2}$.\nb) $f'(5) = 2 - \\dfrac{200}{25} = 2 - 8 = -6$.\nc) $f'(20) = 2 - \\dfrac{200}{400} = 2 - 0{,}5 = 1{,}5$.\nd) $f'(5)$ est négatif : le coût baisse.\n⛔ Le piège au a) : oublier le 2. Seule la dérivée d'une constante est nulle, et $2x$ n'est pas une constante.\nRéponse : a) $f'(x) = 2 - \\dfrac{200}{x^2}$ ; b) $-6$ ; c) 1,5 ; d) baisse.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          enonce:
            "Une couturière, Mei, a un coût moyen $f(x) = 6 + \\dfrac{300}{x}$, en euros par robe, pour $x$ robes (modèle).\na) Donne l'expression de $f'(x)$.\nb) Quel est le sens de variation de $f$ sur $]0\\,;\\,+\\infty[$ ? Écris croissante ou décroissante.\nc) Calcule $f(10)$.\nd) Calcule $f(30)$.",
          reponses: [
            { question: "a)", attendu: "-300/x²" },
            { question: "b)", attendu: "décroissante" },
            { question: "c)", attendu: "36 €" },
            { question: "d)", attendu: "16 €" },
          ],
          correction:
            "a) La constante 6 disparaît : $f'(x) = -\\dfrac{300}{x^2}$.\nb) $x^2$ est positif, donc $f'(x)$ est négatif : $f$ est décroissante.\nc) $f(10) = 6 + 300 \\div 10 = 36$ €.\nd) $f(30) = 6 + 300 \\div 30 = 16$ €.\nPlus elle produit, plus le coût moyen baisse.\n⛔ Le piège au c) : utiliser $f'$ au lieu de $f$. Le coût moyen se calcule avec $f$.\nRéponse : a) $f'(x) = -\\dfrac{300}{x^2}$ ; b) décroissante ; c) 36 € ; d) 16 €.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          enonce:
            "Un pompier estime que le temps pour remplir une citerne est $f(x) = \\dfrac{6}{x}$, en heures, où $x$ est le débit de la pompe, en m³ par heure, sur $[1\\,;\\,6]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Quel est le signe de $f'(x)$ sur $[1\\,;\\,6]$ ? Écris positif ou négatif.\nc) Calcule $f(1)$.\nd) Calcule $f(6)$.",
          reponses: [
            { question: "a)", attendu: "-6/x²" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: "6 h" },
            { question: "d)", attendu: "1 h" },
          ],
          schema: tableauAvecDerivee(["1", "6"], ["-"], ["6", "1"]),
          correction:
            "a) $f'(x) = -\\dfrac{6}{x^2}$.\nb) $x^2$ est positif, donc $f'(x)$ est négatif : le temps diminue quand le débit augmente.\nc) $f(1) = 6 \\div 1 = 6$ h.\nd) $f(6) = 6 \\div 6 = 1$ h.\nLe tableau de variations ci-dessous résume l'étude.\n⛔ Le piège au b) : regarder le 6 positif et conclure « positif ». Il y a le signe moins de la formule.\nRéponse : a) $f'(x) = -\\dfrac{6}{x^2}$ ; b) négatif ; c) 6 h ; d) 1 h.",
          micros: ["fctT_inverse_derivee", "fctT_inverse_variations"],
        },
        {
          enonce:
            "Un magasinier, Bilal, modélise le coût de stockage, en euros, par $f(x) = x + \\dfrac{100}{x}$, où $x$ est le nombre de palettes commandées, sur $[1\\,;\\,20]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?\nc) Quel est le coût minimal ?",
          reponses: [
            { question: "a)", attendu: "1 - 100/x²" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "20" },
          ],
          schema: tableauAvecDerivee(["1", "10", "20"], ["-", "+"], ["101", "20", "25"]),
          correction:
            "a) La dérivée de $x$ est 1 : $f'(x) = 1 - \\dfrac{100}{x^2}$.\nb) $1 - \\dfrac{100}{x^2} = 0$ donne $x^2 = 100$, soit $x = 10$ ou $x = -10$. Un nombre de palettes est positif : $x = 10$.\nc) $f(10) = 10 + 100 \\div 10 = 20$.\n$f'(5) = 1 - 4 = -3$ est négatif et $f'(20) = 1 - 0{,}25 = 0{,}75$ est positif : $f$ descend, puis monte. C'est bien un minimum (voir le tableau).\n⛔ Le piège au c) : répondre 10. C'est l'endroit du minimum, pas le coût.\nRéponse : a) $f'(x) = 1 - \\dfrac{100}{x^2}$ ; b) 10 ; c) 20.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          enonce:
            "Une grossiste en fleurs modélise le coût d'un réassort, en euros, par $f(x) = 2x + \\dfrac{450}{x}$, où $x$ est le nombre de cartons, sur $[5\\,;\\,30]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?\nc) Quel est le coût minimal ?\nd) Calcule $f(5)$.",
          reponses: [
            { question: "a)", attendu: "2 - 450/x²" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "100" },
          ],
          schema: tableauAvecDerivee(["5", "15", "30"], ["-", "+"], ["100", "60", "75"]),
          correction:
            "a) $f'(x) = 2 - \\dfrac{450}{x^2}$.\nb) $2 - \\dfrac{450}{x^2} = 0$ donne $2x^2 = 450$, donc $x^2 = 225$. On garde la solution positive : $x = 15$.\nc) $f(15) = 30 + 450 \\div 15 = 30 + 30 = 60$.\nd) $f(5) = 10 + 450 \\div 5 = 10 + 90 = 100$.\nLe tableau de variations ci-dessous montre que $f$ descend jusqu'à $x = 15$, puis remonte.\n⛔ Le piège au b) : oublier de diviser par 2 et prendre la racine de 450.\nRéponse : a) $f'(x) = 2 - \\dfrac{450}{x^2}$ ; b) 15 ; c) 60 ; d) 100.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          enonce:
            "Une analyste modélise le résultat d'une start-up, en millions d'euros, par $f(x) = \\dfrac{-12}{x}$, $x$ années après sa création, pour $x > 0$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Quel est le sens de variation de $f$ sur $]0\\,;\\,+\\infty[$ ? Écris croissante ou décroissante.\nc) Calcule $f(1)$.\nd) Calcule $f(3)$.",
          reponses: [
            { question: "a)", attendu: "12/x²" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "-12" },
            { question: "d)", attendu: "-4" },
          ],
          correction:
            "a) Ici $k = -12$, donc $f'(x) = -\\dfrac{-12}{x^2} = \\dfrac{12}{x^2}$.\nb) C'est positif : $f$ est croissante.\nc) $f(1) = -12 \\div 1 = -12$.\nd) $f(3) = -12 \\div 3 = -4$.\nLa perte se réduit : $-4$ est plus grand que $-12$.\n⛔ Le piège au b) : lire « $f(3)$ est plus petit en valeur », et conclure à une baisse. $-4$ est AU-DESSUS de $-12$.\nRéponse : a) $f'(x) = \\dfrac{12}{x^2}$ ; b) croissante ; c) $-12$ ; d) $-4$.",
          micros: ["fctT_inverse_derivee", "fctT_inverse_variations"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{6}{x}$.\na) Calcule $f(-1)$.\nb) Calcule $f(2)$.\nc) Écris le signe < ou > pour $f(-1)$ … $f(2)$.\nd) Écris le signe < ou > pour $f(-3)$ … $f(-1)$.\ne) « $f$ est décroissante sur tout son ensemble de définition. » Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "-6" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: compare("-1", "<", "2") },
            { question: "d)", attendu: compare("-3", ">", "-1") },
            { question: "e)", attendu: "faux" },
          ],
          correction:
            "a) $6 \\div (-1) = -6$.\nb) $6 \\div 2 = 3$.\nc) $-6 < 3$, donc $f(-1) < f(2)$, alors que $-1 < 2$ : ici l'ordre est CONSERVÉ.\nd) $-3$ et $-1$ sont dans $]-\\infty\\,;\\,0[$, où $f$ décroît : $f(-3) > f(-1)$. En effet $f(-3) = -2$ est plus grand que $-6$.\ne) Faux : le c) le montre. $f$ est décroissante sur chacun des deux intervalles, pas sur leur réunion.\n⛔ Le piège au c) : appliquer la décroissance à deux nombres de part et d'autre de 0.\nRéponse : a) $-6$ ; b) 3 ; c) < ; d) > ; e) faux.",
          micros: ["fctT_inverse_variations"],
        },
        {
          enonce:
            "Une chargée de communication modélise le coût par abonné d'une campagne, en euros, par $f(x) = \\dfrac{20}{x}$, où $x > 0$ est le nombre de milliers d'abonnés.\na) Calcule $f(2)$.\nb) Calcule $f'(2)$.\nc) Calcule $f'(10)$.\nd) Où la courbe descend-elle le plus fort ? Écris 2 ou 10.",
          reponses: [
            { question: "a)", attendu: "10 €" },
            { question: "b)", attendu: "-5" },
            { question: "c)", attendu: "-0,2" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "a) $f(2) = 20 \\div 2 = 10$ €.\nb) $f'(x) = -\\dfrac{20}{x^2}$, donc $f'(2) = -\\dfrac{20}{4} = -5$.\nc) $f'(10) = -\\dfrac{20}{100} = -0{,}2$.\nd) La pente de la tangente est $-5$ en $x = 2$ et $-0{,}2$ en $x = 10$ : la courbe descend bien plus fort en $x = 2$.\n⛔ Le piège au d) : répondre 10 car $-0{,}2$ est plus grand que $-5$. Pour la raideur de la descente, on regarde la taille de la pente, sans le signe.\nRéponse : a) 10 € ; b) $-5$ ; c) $-0{,}2$ ; d) 2.",
          micros: ["fctT_inverse_derivee", "fctT_inverse_variations"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une étude complète : la dérivée, l'endroit où elle s'annule, le tableau de variations, puis la réponse à la question.",
      rappel: [
        "L'étude : on dérive terme à terme, on résout $f'(x) = 0$, on teste le signe de $f'$ de chaque côté, on dresse le tableau.",
        "Le coût moyen est le coût total divisé par $x$ : $\\dfrac{x^2 + 3x + 90}{x} = x + 3 + \\dfrac{90}{x}$.",
        "Une dérivée toujours négative : pas de minimum à l'intérieur, la fonction descend jusqu'au bout de l'intervalle.",
      ],
      exercices: [
        {
          titre: "La commande du caviste",
          enonce:
            "Un caviste modélise le coût de ses commandes, en euros, par $f(x) = 2x + \\dfrac{800}{x}$, où $x$ est le nombre de caisses par commande, sur $[5\\,;\\,60]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?\nc) Quel est le sens de variation de $f$ avant cette valeur de $x$ ? Écris croissante ou décroissante.\nd) Quel est le coût minimal ?",
          reponses: [
            { question: "a)", attendu: "2 - 800/x²" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "décroissante" },
            { question: "d)", attendu: "80" },
          ],
          schema: tableauAvecDerivee(["5", "20", "60"], ["-", "+"], ["170", "80", "133,33"]),
          correction:
            "a) $f'(x) = 2 - \\dfrac{800}{x^2}$.\nb) $2 - \\dfrac{800}{x^2} = 0$ donne $2x^2 = 800$, donc $x^2 = 400$. On garde la solution positive : $x = 20$.\nc) $f'(10) = 2 - 8 = -6$ est négatif : $f$ est décroissante sur $[5\\,;\\,20]$.\nEt $f'(40) = 2 - 0{,}5 = 1{,}5$ est positif : $f$ est croissante sur $[20\\,;\\,60]$.\nd) $f(20) = 40 + 40 = 80$. Le tableau de variations ci-dessous, avec $f(5) = 170$ et $f(60) \\approx 133{,}33$, le confirme.\n⛔ Le piège au c) : croire que $f'(x) = 0$ suffit. C'est le changement de signe qui fait le minimum.\nRéponse : a) $f'(x) = 2 - \\dfrac{800}{x^2}$ ; b) 20 ; c) décroissante ; d) 80.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          titre: "Le coût moyen de la pâtissière",
          enonce:
            "Une pâtissière a un coût total $C(x) = x^2 + 5x + 400$, en euros, pour $x$ gâteaux, sur $[5\\,;\\,50]$ (modèle).\na) Écris le coût moyen $f(x) = \\dfrac{C(x)}{x}$ sous la forme d'une somme de trois termes.\nb) Donne l'expression de $f'(x)$.\nc) Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?\nd) Quel est le coût moyen minimal ?",
          reponses: [
            { question: "a)", attendu: troisTermes, exact: true },
            { question: "b)", attendu: "1 - 400/x²" },
            { question: "c)", attendu: "20" },
            { question: "d)", attendu: "45 €" },
          ],
          schema: tableauAvecDerivee(["5", "20", "50"], ["-", "+"], ["90", "45", "63"]),
          correction:
            "a) On divise chaque terme par $x$ : $f(x) = x + 5 + \\dfrac{400}{x}$.\nb) Terme à terme : $f'(x) = 1 + 0 - \\dfrac{400}{x^2} = 1 - \\dfrac{400}{x^2}$.\nc) $1 - \\dfrac{400}{x^2} = 0$ donne $x^2 = 400$. On garde la solution positive : $x = 20$.\nd) $f(20) = 20 + 5 + 20 = 45$ €.\nLes bornes : $f(5) = 5 + 5 + 80 = 90$ et $f(50) = 50 + 5 + 8 = 63$. Le tableau ci-dessous le confirme.\n⛔ Le piège au b) : garder le 5. La dérivée d'une constante est nulle.\nRéponse : a) $f(x) = x + 5 + \\dfrac{400}{x}$ ; b) $f'(x) = 1 - \\dfrac{400}{x^2}$ ; c) 20 ; d) 45 €.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          titre: "Le studio de jeu vidéo",
          enonce:
            "Un studio de jeu vidéo a un coût moyen $f(x) = 10 + \\dfrac{2\\,000}{x}$, en euros par jeu vendu, pour $x$ jeux, sur $[100\\,;\\,1\\,000]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Quel est le signe de $f'(x)$ ? Écris positif ou négatif.\nc) Calcule $f(100)$.\nd) Calcule $f(1\\,000)$.\ne) Le coût moyen peut-il devenir égal à 10 €, si les ventes continuent de grandir ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "-2000/x²" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: "30 €" },
            { question: "d)", attendu: "12 €" },
            { question: "e)", attendu: "non" },
          ],
          schema: tableauAvecDerivee(["100", "1 000"], ["-"], ["30", "12"]),
          correction:
            "a) La constante 10 disparaît : $f'(x) = -\\dfrac{2\\,000}{x^2}$.\nb) $x^2$ est positif, donc $f'(x)$ est négatif : $f$ est décroissante.\nc) $f(100) = 10 + 2\\,000 \\div 100 = 30$ €.\nd) $f(1\\,000) = 10 + 2\\,000 \\div 1\\,000 = 12$ €.\ne) Non : $\\dfrac{2\\,000}{x}$ s'approche de 0 sans l'atteindre, donc $f(x)$ reste au-dessus de 10.\n⛔ Le piège au e) : confondre « s'approcher de 10 » et « atteindre 10 ».\nRéponse : a) $f'(x) = -\\dfrac{2\\,000}{x^2}$ ; b) négatif ; c) 30 € ; d) 12 € ; e) non.",
          micros: ["fctT_inverse_combinaison"],
        },
        {
          titre: "La vitesse du cargo",
          enonce:
            "Un armateur modélise le coût d'une traversée, en milliers d'euros, par $f(x) = 0{,}5x + \\dfrac{200}{x}$, où $x$ est la vitesse du cargo en nœuds, sur $[10\\,;\\,40]$ (modèle).\na) Donne l'expression de $f'(x)$.\nb) Calcule $f'(10)$.\nc) Calcule $f'(40)$.\nd) Pour quelle vitesse le coût est-il minimal, en nœuds ?\ne) Quel est ce coût minimal, en milliers d'euros ?",
          reponses: [
            { question: "a)", attendu: "0,5 - 200/x²" },
            { question: "b)", attendu: "-1,5" },
            { question: "c)", attendu: "0,375" },
            { question: "d)", attendu: "20" },
            { question: "e)", attendu: "20" },
          ],
          schema: tableauAvecDerivee(["10", "20", "40"], ["-", "+"], ["25", "20", "25"]),
          correction:
            "a) $f'(x) = 0{,}5 - \\dfrac{200}{x^2}$.\nb) $f'(10) = 0{,}5 - \\dfrac{200}{100} = 0{,}5 - 2 = -1{,}5$.\nc) $f'(40) = 0{,}5 - \\dfrac{200}{1\\,600} = 0{,}5 - 0{,}125 = 0{,}375$.\nd) $0{,}5 - \\dfrac{200}{x^2} = 0$ donne $0{,}5x^2 = 200$, donc $x^2 = 400$. On garde la solution positive : $x = 20$ nœuds. La dérivée passe bien de négative à positive.\ne) $f(20) = 10 + 10 = 20$. Avec $f(10) = 5 + 20 = 25$ et $f(40) = 20 + 5 = 25$, le tableau ci-dessous le montre : aller trop lentement ou trop vite coûte plus cher.\n⛔ Le piège au d) : croire qu'il faut aller le plus lentement possible. Une traversée lente dure plus longtemps et coûte plus cher.\nRéponse : a) $f'(x) = 0{,}5 - \\dfrac{200}{x^2}$ ; b) $-1{,}5$ ; c) 0,375 ; d) 20 nœuds ; e) 20.",
          micros: ["fctT_inverse_combinaison"],
        },
      ],
    },
  ],
};
