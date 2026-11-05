// ─── Fiche d'exercices : développer, factoriser, réduire (STMG) — 20 exercices ──
//
// Notion auto_developper_factoriser du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts`). C'est un
// AUTOMATISME : le coach demande de développer $(ax + b)(cx + d)$, de trouver le
// coefficient du terme en $x$, de développer $(ax \pm b)^2$ et de repérer le
// double produit oublié, de sortir le facteur commun LE PLUS GRAND de
// $ax^2 + bx$, et de factoriser une DIFFÉRENCE de deux carrés (la somme de deux
// carrés ne se factorise pas). Il ne demande PAS de factoriser un carré parfait
// $a^2 + 2ab + b^2$ : la feuille non plus.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : huit calculs nus ou presque (ex. 1 à 8) ; sport
// (gestionnaire d'équipements), graphisme (graphiste), électricité (apprenti),
// cinéma (directrice), apiculture (apiculteur), architecture (architecte),
// jardins municipaux (jardinière), une copie à trier (ex. 16) ; encadrement
// (encadreur), food truck (gérante), carrelage (carreleuse), pépinière
// (ingénieure agronome).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-1.mjs`.
//
// Micro-compétences : auto_alg_developper (1, 2, 3, 9, 12, 18),
// auto_alg_identites (4, 5, 10, 11, 17, 19, 20), auto_alg_factoriser_commun
// (6, 7, 13, 14, 17, 18, 20), auto_alg_factoriser_identite (8, 15, 16, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Une somme, dans tous ses ordres : la FORME compte (`exact`), pas l'ordre des termes. */
const ordres = (...termes: string[]): string[] =>
  termes.length <= 1
    ? termes
    : termes.flatMap((t, i) =>
        ordres(...termes.filter((_, j) => j !== i)).map((reste) => t + (reste.startsWith("-") ? reste : `+${reste}`)),
      );

/** Un facteur devant ou derrière une somme, avec ou sans le signe ×. */
const facteurPar = (facteur: string, ...termes: string[]): string[] =>
  ordres(...termes).flatMap((s) => [`${facteur}(${s})`, `${facteur}×(${s})`, `(${s})${facteur}`, `(${s})×${facteur}`]);

/** (u − v)(u + v), dans les deux sens, u + v écrit dans les deux ordres. */
const differenceDeCarres = (u: string, v: string): string[] =>
  [`${u}+${v}`, `${v}+${u}`].flatMap((p) => [`(${u}-${v})(${p})`, `(${p})(${u}-${v})`, `(${u}-${v})×(${p})`, `(${p})×(${u}-${v})`]);

export const exercicesAutoDevelopperFactoriserStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-developper-factoriser",
  titre: "Développer, factoriser, réduire",
  accroche:
    "Vingt exercices pour que le calcul littéral devienne un réflexe : développer un produit, ne plus oublier le double produit, sortir le plus grand facteur commun, reconnaître une différence de deux carrés. Un terrain de sport, une affiche, une séance de cinéma, un food truck, un cadre photo, un chantier de carrelage. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : développer, ou factoriser.",
      rappel: [
        "Développer : chaque terme de la première parenthèse multiplie chaque terme de la seconde. Puis on regroupe les termes en $x$.",
        "Le carré d'une somme ou d'une différence : $(a + b)^2 = a^2 + 2ab + b^2$ et $(a - b)^2 = a^2 - 2ab + b^2$. Le terme $2ab$ s'appelle le double produit.",
        "Factoriser : on sort ce qui est présent dans TOUS les termes, le nombre et la lettre. Exemple : $10x^2 + 15x = 5x(2x + 3)$.",
        "Une différence de deux carrés se factorise : $u^2 - v^2 = (u - v)(u + v)$.",
      ],
      exercices: [
        {
          enonce: "Développe et réduis : $(x + 3)(x + 5)$.",
          reponses: [{ attendu: ordres("x²", "8x", "15"), exact: true }],
          correction:
            "On écrit les quatre produits : $x \\times x = x^2$ ; $x \\times 5 = 5x$ ; $3 \\times x = 3x$ ; $3 \\times 5 = 15$.\nOn regroupe les termes en $x$ : $5x + 3x = 8x$.\nDonc $(x + 3)(x + 5) = x^2 + 8x + 15$.\n⛔ Le piège : écrire $x^2 + 15$. On a oublié les deux produits croisés.\nRéponse : $x^2 + 8x + 15$.",
          micros: ["auto_alg_developper"],
        },
        {
          enonce: "Développe et réduis : $(2x - 3)(x + 4)$.",
          reponses: [{ attendu: ordres("2x²", "5x", "-12"), exact: true }],
          correction:
            "Les quatre produits : $2x \\times x = 2x^2$ ; $2x \\times 4 = 8x$ ; $(-3) \\times x = -3x$ ; $(-3) \\times 4 = -12$.\nOn regroupe : $8x - 3x = 5x$.\nDonc $(2x - 3)(x + 4) = 2x^2 + 5x - 12$.\n⛔ Le piège : perdre le signe moins de $-3$. Il multiplie les deux termes de la seconde parenthèse.\nRéponse : $2x^2 + 5x - 12$.",
          micros: ["auto_alg_developper"],
        },
        {
          enonce: "On développe $(3x + 2)(2x - 5)$. Quel est le coefficient du terme en $x$ ?",
          reponses: [{ attendu: "-11" }],
          correction:
            "Le terme en $x$ vient de DEUX produits croisés.\nPremier produit : $3x \\times (-5) = -15x$.\nSecond produit : $2 \\times 2x = 4x$.\nOn les additionne : $-15 + 4 = -11$.\n⛔ Le piège : ne garder qu'un seul produit croisé, et répondre $-15$ ou $4$.\nRéponse : $-11$.",
          micros: ["auto_alg_developper"],
        },
        {
          enonce: "Développe : $(x + 6)^2$.",
          reponses: [{ attendu: ordres("x²", "12x", "36"), exact: true }],
          correction:
            "On utilise $(a + b)^2 = a^2 + 2ab + b^2$ avec $a = x$ et $b = 6$.\n$a^2 = x^2$ ; $2ab = 2 \\times x \\times 6 = 12x$ ; $b^2 = 36$.\n⛔ Le piège : écrire $x^2 + 36$. C'est l'erreur la plus fréquente : le carré ne se distribue pas, il manque le double produit.\nRéponse : $x^2 + 12x + 36$.",
          micros: ["auto_alg_identites"],
        },
        {
          enonce: "Développe : $(x - 4)^2$.",
          reponses: [{ attendu: ordres("x²", "-8x", "16"), exact: true }],
          correction:
            "On utilise $(a - b)^2 = a^2 - 2ab + b^2$ avec $a = x$ et $b = 4$.\n$a^2 = x^2$ ; $2ab = 2 \\times x \\times 4 = 8x$, qu'on retranche ; $b^2 = 16$.\n⛔ Le piège : écrire $x^2 - 8x - 16$. Le dernier terme est un carré : il est positif.\nRéponse : $x^2 - 8x + 16$.",
          micros: ["auto_alg_identites"],
        },
        {
          enonce: "Factorise le plus possible : $4x^2 + 10x$.",
          reponses: [{ attendu: facteurPar("2x", "2x", "5"), exact: true }],
          correction:
            "On cherche ce qui est commun aux deux termes.\nLe nombre : $2$ divise $4$ et $10$. La lettre : $x$ est dans les deux termes.\nLe facteur commun est $2x$ : $4x^2 = 2x \\times 2x$ et $10x = 2x \\times 5$.\nDonc $4x^2 + 10x = 2x(2x + 5)$.\n⛔ Le piège : sortir seulement $x$, ce qui donne $x(4x + 10)$. C'est juste, mais incomplet : $4x + 10$ contient encore un $2$.\nRéponse : $2x(2x + 5)$.",
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          enonce: "Quel est le facteur commun LE PLUS GRAND de $6x^2 + 9x$ ?",
          reponses: [{ attendu: "3x", exact: true }],
          correction:
            "Le plus grand nombre qui divise $6$ et $9$ est $3$.\nLes deux termes contiennent $x$.\nLe facteur commun le plus grand est donc $3x$. En effet : $6x^2 + 9x = 3x(2x + 3)$.\n⛔ Le piège : répondre $3$ en oubliant la lettre, ou $x$ en oubliant le nombre.\nRéponse : $3x$.",
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          enonce: "Factorise : $x^2 - 49$.",
          reponses: [{ attendu: differenceDeCarres("x", "7"), exact: true }],
          correction:
            "On reconnaît deux carrés séparés par un moins : $x^2$ et $49 = 7^2$.\nOn utilise $u^2 - v^2 = (u - v)(u + v)$ avec $u = x$ et $v = 7$.\n⛔ Le piège : écrire $(x - 7)^2$. Ce carré redonne $x^2 - 14x + 49$, ce n'est pas la même expression.\nRéponse : $(x - 7)(x + 7)$.",
          micros: ["auto_alg_factoriser_identite"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : écrire l'expression, la transformer, puis remplacer par un nombre.",
      rappel: [
        "L'aire d'un rectangle : longueur × largeur. Si les côtés contiennent $x$, on obtient un produit à développer.",
        "Pour vérifier une transformation : on remplace $x$ par un nombre dans les deux écritures. Elles doivent donner le même résultat.",
        "On peut sortir une lettre seule : $uy + vy = y(u + v)$.",
        "Une SOMME de deux carrés, comme $x^2 + 4$, ne se factorise pas avec l'identité : il faut un moins entre les deux carrés.",
      ],
      exercices: [
        {
          enonce:
            "Un gestionnaire d'équipements sportifs agrandit un terrain carré de côté $x$ mètres (modèle). Il ajoute $8$ mètres à la longueur et $3$ mètres à la largeur.\na) Développe et réduis l'aire du nouveau terrain, $(x + 8)(x + 3)$.\nb) Calcule cette aire pour $x = 20$.",
          reponses: [
            { question: "a)", attendu: ordres("x²", "11x", "24"), exact: true },
            { question: "b)", attendu: "644 m²" },
          ],
          correction:
            "a) $x \\times x = x^2$ ; $x \\times 3 = 3x$ ; $8 \\times x = 8x$ ; $8 \\times 3 = 24$.\nOn regroupe : $3x + 8x = 11x$. L'aire vaut $x^2 + 11x + 24$.\nb) $20^2 + 11 \\times 20 + 24 = 400 + 220 + 24 = 644$.\nVérification avec la forme de départ : $(20 + 8)(20 + 3) = 28 \\times 23 = 644$. ✔\n⛔ Le piège au a) : écrire $x^2 + 24$ en oubliant les deux produits croisés.\nRéponse : a) $x^2 + 11x + 24$ ; b) 644 m².",
          micros: ["auto_alg_developper"],
        },
        {
          enonce:
            "Une graphiste dessine une affiche carrée de côté $3x + 2$ centimètres (modèle).\na) Développe l'aire de l'affiche, $(3x + 2)^2$.\nb) Calcule l'aire pour $x = 10$.",
          reponses: [
            { question: "a)", attendu: ordres("9x²", "12x", "4"), exact: true },
            { question: "b)", attendu: "1 024 cm²" },
          ],
          correction:
            "a) $(a + b)^2$ avec $a = 3x$ et $b = 2$.\n$a^2 = (3x)^2 = 9x^2$ ; $2ab = 2 \\times 3x \\times 2 = 12x$ ; $b^2 = 4$.\nb) $9 \\times 100 + 12 \\times 10 + 4 = 900 + 120 + 4 = 1\\,024$.\nVérification : le côté vaut $3 \\times 10 + 2 = 32$, et $32^2 = 1\\,024$. ✔\n⛔ Le piège au a) : écrire $3x^2$. Le carré porte sur le $3$ aussi : $(3x)^2 = 9x^2$.\nRéponse : a) $9x^2 + 12x + 4$ ; b) 1 024 cm².",
          micros: ["auto_alg_identites"],
        },
        {
          enonce:
            "Yanis, apprenti électricien, écrit dans son carnet : $(x + 5)^2 = x^2 + 25$.\nPour tester, il prend $x = 1$.\na) Combien vaut $(x + 5)^2$ pour $x = 1$ ?\nb) Combien vaut $x^2 + 25$ pour $x = 1$ ?\nc) Quel terme manque dans son développement ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "26" },
            { question: "c)", attendu: "10x" },
          ],
          correction:
            "a) $(1 + 5)^2 = 6^2 = 36$.\nb) $1^2 + 25 = 26$.\nLes deux résultats diffèrent : l'égalité de Yanis est fausse.\nc) $(x + 5)^2 = x^2 + 2 \\times x \\times 5 + 25 = x^2 + 10x + 25$. Il manque le double produit, $10x$.\nVérification : pour $x = 1$, $10x$ vaut $10$, et $36 - 26 = 10$. ✔\n⛔ Le piège au c) : répondre $5x$. Il y a deux produits croisés égaux, d'où le facteur 2.\nRéponse : a) 36 ; b) 26 ; c) $10x$.",
          micros: ["auto_alg_identites"],
        },
        {
          enonce:
            "La directrice d'un cinéma vend $100$ places par soirée, à $30$ € la place (modèle). Si elle baisse le prix de $x$ euros, elle vend $10x$ places de plus. La recette vaut alors $(30 - x)(100 + 10x)$.\na) Développe et réduis cette recette.\nb) Calcule la recette pour $x = 5$.",
          reponses: [
            { question: "a)", attendu: ordres("-10x²", "200x", "3000"), exact: true },
            { question: "b)", attendu: "3 750 €" },
          ],
          correction:
            "a) Les quatre produits : $30 \\times 100 = 3\\,000$ ; $30 \\times 10x = 300x$ ; $(-x) \\times 100 = -100x$ ; $(-x) \\times 10x = -10x^2$.\nOn regroupe : $300x - 100x = 200x$. La recette vaut $-10x^2 + 200x + 3\\,000$.\nb) $-10 \\times 25 + 200 \\times 5 + 3\\,000 = -250 + 1\\,000 + 3\\,000 = 3\\,750$.\nVérification : $(30 - 5)(100 + 50) = 25 \\times 150 = 3\\,750$. ✔\n⛔ Le piège au a) : oublier le signe moins de $x$ dans $-x \\times 10x$.\nRéponse : a) $-10x^2 + 200x + 3\\,000$ ; b) 3 750 €.",
          micros: ["auto_alg_developper"],
        },
        {
          enonce:
            "Un apiculteur vend ses pots de miel $x$ euros pièce (modèle). Il en vend $a$ au marché et $b$ à la ferme. Sa recette vaut $ax + bx$.\na) Factorise cette expression.\nb) Calcule la recette pour $a = 120$, $b = 80$ et $x = 6$.",
          reponses: [
            { question: "a)", attendu: ["x(a+b)", "x(b+a)", "(a+b)x", "(b+a)x", "x×(a+b)", "x×(b+a)", "(a+b)×x", "(b+a)×x"], exact: true },
            { question: "b)", attendu: "1 200 €" },
          ],
          correction:
            "a) La lettre $x$ est dans les deux termes : $ax + bx = x(a + b)$.\nCette écriture dit la même chose en français : le prix d'un pot, multiplié par le nombre total de pots.\nb) $6 \\times (120 + 80) = 6 \\times 200 = 1\\,200$.\n⛔ Le piège au a) : écrire $abx$. Les termes sont ajoutés : $a$ et $b$ restent dans une somme.\nRéponse : a) $x(a + b)$ ; b) 1 200 €.",
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          enonce:
            "Une architecte dessine un atelier rectangulaire d'aire $6x^2 + 15x$ mètres carrés et de largeur $3x$ mètres (modèle).\na) Factorise l'aire par $3x$.\nb) Quelle est la longueur de l'atelier, en fonction de $x$ ?\nc) Calcule l'aire pour $x = 4$.",
          reponses: [
            { question: "a)", attendu: facteurPar("3x", "2x", "5"), exact: true },
            { question: "b)", attendu: ordres("2x", "5") },
            { question: "c)", attendu: "156 m²" },
          ],
          correction:
            "a) $6x^2 = 3x \\times 2x$ et $15x = 3x \\times 5$, donc $6x^2 + 15x = 3x(2x + 5)$.\nb) Aire = largeur × longueur. La largeur est $3x$, il reste donc $2x + 5$ pour la longueur.\nc) La largeur vaut $3 \\times 4 = 12$ et la longueur $2 \\times 4 + 5 = 13$. L'aire vaut $12 \\times 13 = 156$.\nVérification : $6 \\times 16 + 15 \\times 4 = 96 + 60 = 156$. ✔\n⛔ Le piège au a) : écrire $3x(2x + 15x)$ en recopiant le second terme. Chaque terme doit être DIVISÉ par $3x$.\nRéponse : a) $3x(2x + 5)$ ; b) $2x + 5$ ; c) 156 m².",
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          enonce:
            "Une jardinière de la ville entretient un jardin carré de côté $x$ mètres. Au centre, un bassin carré de côté $3$ mètres (modèle).\na) Écris l'aire de la pelouse autour du bassin, en fonction de $x$.\nb) Factorise cette expression.\nc) Calcule cette aire pour $x = 13$.",
          reponses: [
            { question: "a)", attendu: "x²-9" },
            { question: "b)", attendu: differenceDeCarres("x", "3"), exact: true },
            { question: "c)", attendu: "160 m²" },
          ],
          correction:
            "a) L'aire du jardin moins l'aire du bassin : $x^2 - 3^2 = x^2 - 9$.\nb) Deux carrés séparés par un moins : $x^2 - 9 = (x - 3)(x + 3)$.\nc) La forme factorisée se calcule de tête : $(13 - 3)(13 + 3) = 10 \\times 16 = 160$.\nVérification : $13^2 - 9 = 169 - 9 = 160$. ✔\n⛔ Le piège au b) : écrire $(x - 3)^2$. Ce carré vaut $x^2 - 6x + 9$.\nRéponse : a) $x^2 - 9$ ; b) $(x - 3)(x + 3)$ ; c) 160 m².",
          micros: ["auto_alg_factoriser_identite"],
        },
        {
          enonce:
            "Voici quatre expressions :\nA $= x^2 - 25$ ; B $= x^2 + 16$ ; C $= 4x^2 - 9$ ; D $= 49x^2 - 1$.\na) Une seule n'est PAS une différence de deux carrés. Écris sa lettre.\nb) Factorise A.\nc) Factorise C.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: differenceDeCarres("x", "5"), exact: true },
            { question: "c)", attendu: differenceDeCarres("2x", "3"), exact: true },
          ],
          correction:
            "a) B est une SOMME : $x^2 + 16$. Il n'y a pas de moins entre les deux carrés.\nD est bien une différence : $49x^2 = (7x)^2$ et $1 = 1^2$.\nb) $x^2 - 25 = x^2 - 5^2 = (x - 5)(x + 5)$.\nc) $4x^2 = (2x)^2$ et $9 = 3^2$, donc $4x^2 - 9 = (2x - 3)(2x + 3)$.\n⛔ Le piège au c) : prendre $u = 4x$. Le carré de $4x$ vaut $16x^2$, pas $4x^2$.\nRéponse : a) B ; b) $(x - 5)(x + 5)$ ; c) $(2x - 3)(2x + 3)$.",
          micros: ["auto_alg_factoriser_identite"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : développer, réduire, factoriser, puis vérifier avec un nombre.",
      rappel: [
        "On avance dans l'ordre : on développe d'abord, on réduit ensuite, on factorise enfin.",
        "Le facteur commun peut être un simple nombre : $8x + 40 = 8(x + 5)$, car $40 = 8 \\times 5$.",
        "Les identités marchent aussi sur des nombres : $203^2 = (200 + 3)^2$. C'est un outil de calcul mental.",
      ],
      exercices: [
        {
          titre: "Le cadre photo",
          enonce:
            "Un encadreur pose une photo carrée de côté $x$ centimètres dans un cadre. La bordure mesure $3$ centimètres de large tout autour (modèle). Le côté du cadre vaut donc $x + 6$.\na) Développe $(x + 6)^2$.\nb) L'aire de la bordure vaut $(x + 6)^2 - x^2$. Réduis-la.\nc) Factorise le résultat par $12$.\nd) Calcule l'aire de la bordure pour $x = 20$.",
          reponses: [
            { question: "a)", attendu: ordres("x²", "12x", "36"), exact: true },
            { question: "b)", attendu: ordres("12x", "36"), exact: true },
            { question: "c)", attendu: facteurPar("12", "x", "3"), exact: true },
            { question: "d)", attendu: "276 cm²" },
          ],
          correction:
            "a) $(x + 6)^2 = x^2 + 12x + 36$.\nb) $x^2 + 12x + 36 - x^2 = 12x + 36$ : les $x^2$ s'annulent.\nc) $12x + 36 = 12 \\times x + 12 \\times 3 = 12(x + 3)$.\nd) $12 \\times (20 + 3) = 12 \\times 23 = 276$.\nVérification : $26^2 - 20^2 = 676 - 400 = 276$. ✔\n⛔ Le piège au b) : laisser $x^2$ dans le résultat. Or $x^2 - x^2 = 0$ : il ne reste que $12x + 36$.\nRéponse : a) $x^2 + 12x + 36$ ; b) $12x + 36$ ; c) $12(x + 3)$ ; d) 276 cm².",
          micros: ["auto_alg_identites", "auto_alg_factoriser_commun"],
        },
        {
          titre: "Le food truck",
          enonce:
            "La gérante d'un food truck vend $200$ menus par jour, à $8$ € le menu (modèle). Si elle augmente le prix de $x$ euros, elle perd $10x$ clients. Sa recette vaut alors $(8 + x)(200 - 10x)$.\na) Développe et réduis cette recette.\nb) Sa recette de départ est de $1\\,600$ €. Le gain est la recette du a) moins ces $1\\,600$ €. Écris le gain sous forme factorisée par $10x$.\nc) Calcule ce gain pour $x = 5$.",
          reponses: [
            { question: "a)", attendu: ordres("-10x²", "120x", "1600"), exact: true },
            { question: "b)", attendu: facteurPar("10x", "12", "-x"), exact: true },
            { question: "c)", attendu: "350 €" },
          ],
          correction:
            "a) $8 \\times 200 = 1\\,600$ ; $8 \\times (-10x) = -80x$ ; $x \\times 200 = 200x$ ; $x \\times (-10x) = -10x^2$.\nOn regroupe : $-80x + 200x = 120x$. La recette vaut $-10x^2 + 120x + 1\\,600$.\nb) On retire $1\\,600$ : le gain vaut $120x - 10x^2$.\n$120x = 10x \\times 12$ et $10x^2 = 10x \\times x$, donc $120x - 10x^2 = 10x(12 - x)$.\nc) $10 \\times 5 \\times (12 - 5) = 50 \\times 7 = 350$.\nVérification : pour $x = 5$, la recette vaut $13 \\times 150 = 1\\,950$, et $1\\,950 - 1\\,600 = 350$. ✔\n⛔ Le piège au b) : écrire $10x(12 + x)$. Le signe moins du second terme reste dans la parenthèse.\nRéponse : a) $-10x^2 + 120x + 1\\,600$ ; b) $10x(12 - x)$ ; c) 350 €.",
          micros: ["auto_alg_developper", "auto_alg_factoriser_commun"],
        },
        {
          titre: "Les carreaux de la salle",
          enonce:
            "Une carreleuse fait ses calculs de tête, sans calculatrice, avec les identités.\na) Une salle carrée mesure $101$ carreaux de côté. Calcule $101^2$ en écrivant $(100 + 1)^2$.\nb) Une autre mesure $98$ carreaux de côté. Calcule $98^2$ en écrivant $(100 - 2)^2$.\nc) Une salle de $52$ carreaux de côté garde au centre un carré sans carrelage de $48$ carreaux de côté. Combien de carreaux pose-t-elle ? Utilise $u^2 - v^2 = (u - v)(u + v)$.",
          reponses: [
            { question: "a)", attendu: "10 201", exact: true },
            { question: "b)", attendu: "9 604", exact: true },
            { question: "c)", attendu: "400", exact: true },
          ],
          correction:
            "a) $(100 + 1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2 = 10\\,000 + 200 + 1 = 10\\,201$.\nb) $(100 - 2)^2 = 100^2 - 2 \\times 100 \\times 2 + 2^2 = 10\\,000 - 400 + 4 = 9\\,604$.\nc) $52^2 - 48^2 = (52 - 48)(52 + 48) = 4 \\times 100 = 400$.\n⛔ Le piège au a) : écrire $100^2 + 1^2 = 10\\,001$. Le double produit manque, comme avec des lettres.\nRéponse : a) 10 201 ; b) 9 604 ; c) 400.",
          micros: ["auto_alg_identites", "auto_alg_factoriser_identite"],
        },
        {
          titre: "La parcelle de la pépinière",
          enonce:
            "Une ingénieure agronome étudie une parcelle carrée de côté $2x + 3$ mètres. Elle y retire un carré de côté $3$ mètres pour un abri (modèle). L'aire plantée vaut $(2x + 3)^2 - 9$.\na) Développe $(2x + 3)^2$.\nb) Réduis l'aire plantée.\nc) Factorise-la le plus possible.\nd) Calcule l'aire plantée pour $x = 5$.",
          reponses: [
            { question: "a)", attendu: ordres("4x²", "12x", "9"), exact: true },
            { question: "b)", attendu: ordres("4x²", "12x"), exact: true },
            { question: "c)", attendu: facteurPar("4x", "x", "3"), exact: true },
            { question: "d)", attendu: "160 m²" },
          ],
          correction:
            "a) $(2x)^2 + 2 \\times 2x \\times 3 + 3^2 = 4x^2 + 12x + 9$.\nb) $4x^2 + 12x + 9 - 9 = 4x^2 + 12x$.\nc) $4$ divise $4$ et $12$, et $x$ est dans les deux termes : $4x^2 + 12x = 4x(x + 3)$.\nd) $4 \\times 5 \\times (5 + 3) = 20 \\times 8 = 160$.\nVérification : le côté vaut $13$, et $13^2 - 9 = 169 - 9 = 160$. ✔\n⛔ Le piège au c) : s'arrêter à $2x(2x + 6)$. C'est juste mais incomplet : $2x + 6$ contient encore un $2$.\nRéponse : a) $4x^2 + 12x + 9$ ; b) $4x^2 + 12x$ ; c) $4x(x + 3)$ ; d) 160 m².",
          micros: ["auto_alg_identites", "auto_alg_factoriser_commun"],
        },
      ],
    },
  ],
};
