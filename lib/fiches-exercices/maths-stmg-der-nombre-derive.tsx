// ─── Fiche d'exercices : le nombre dérivé (STMG) — 20 exercices ────────────────
//
// Notion der_nombre_derive du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : le taux de variation et le nombre
// dont il se rapproche, le nombre dérivé comme coefficient directeur de la
// tangente, sa lecture sur un dessin (valeur, signe, annulation), son sens en
// contexte (vitesse à un instant, coût marginal : « une unité de plus »).
// Quand il faut une formule de dérivée, elle est DONNÉE : les formules sont la
// notion suivante.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (1 à 7), pâtisserie (8) ; voile (skipper, 9),
// pharmacie d'hôpital (pharmacienne, 10), climat (climatologue, 11), musique
// (ingénieur du son, 12), artisanat (bougies, 13), botanique (agricultrice, 14),
// santé (kinésithérapeute, 15), nappe phréatique (hydrologue, 16) ; édition
// (éditeur, 17), transport (conductrice de tram, 18), énergie (conseillère, 19),
// médias (journaliste, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_nd_definition (1, 2, 14, 18), der_nd_geometrique
// (3, 4, 6, 12), der_nd_lire_graphique (5, 7, 11, 15, 16, 19), der_nd_cout_marginal
// (8, 9, 10, 13, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

export const exercicesDerNombreDeriveStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-nombre-derive",
  titre: "Le nombre dérivé",
  accroche:
    "Vingt exercices pour donner un sens au nombre dérivé : le nombre dont se rapproche le taux de variation, le coefficient directeur de la tangente, ce qu'on lit sur une courbe, et ce qu'il veut dire dans la vie : une vitesse à un instant, le coût d'une unité de plus. Un voilier, un tram, un stock de médicaments, des bougies artisanales, un livre à éditer. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer un taux, lire une tangente, donner le sens d'un nombre dérivé.",
      rappel: [
        "Le taux de variation entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$. C'est le coefficient directeur de la sécante.",
        "Le nombre dérivé $f'(a)$ est le nombre dont se rapproche ce taux quand $b$ se rapproche de $a$.",
        "$f'(a)$ est aussi le coefficient directeur de la tangente au point d'abscisse $a$ : tangente qui monte, $f'(a) > 0$ ; qui descend, $f'(a) < 0$ ; horizontale, $f'(a) = 0$.",
        "Le coût marginal : $C'(50) = 8$ veut dire qu'une unité de plus, après la cinquantième, coûte environ 8 €.",
      ],
      exercices: [
        {
          enonce:
            "On calcule le taux de variation d'une fonction $f$ entre 3 et $3 + h$. On trouve $6{,}5$ pour $h = 0{,}5$, puis $6{,}1$ pour $h = 0{,}1$, puis $6{,}01$ pour $h = 0{,}01$. Quel nombre dérivé $f'(3)$ ces calculs suggèrent-ils ?",
          reponses: [{ attendu: "6" }],
          correction:
            "Quand $h$ devient très petit, le taux se resserre autour d'un nombre.\n$6{,}5$, puis $6{,}1$, puis $6{,}01$ : ce nombre est 6.\nDonc $f'(3) = 6$.\n⛔ Le piège : répondre 6,01, le dernier calcul. Le nombre dérivé est celui dont on se rapproche.\nRéponse : 6.",
          micros: ["der_nd_definition"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 - 2x$. Calcule le taux de variation de $f$ entre 1 et 4, c'est-à-dire $\\dfrac{f(4) - f(1)}{4 - 1}$.",
          reponses: [{ attendu: "3" }],
          correction:
            "$f(4) = 16 - 8 = 8$ et $f(1) = 1 - 2 = -1$.\nEn haut : $8 - (-1) = 9$. En bas : $4 - 1 = 3$.\n$9 \\div 3 = 3$.\n⛔ Le piège : calculer $8 - 1 = 7$ en oubliant que $f(1)$ est négatif.\nRéponse : 3.",
          micros: ["der_nd_definition"],
        },
        {
          enonce:
            "La tangente à la courbe de $f$ au point d'abscisse 2 a pour équation $y = 3x - 1$. Que vaut $f'(2)$ ?",
          reponses: [{ attendu: "3" }],
          correction:
            "$f'(2)$ est le coefficient directeur de la tangente en 2.\nDans $y = 3x - 1$, le coefficient directeur est le nombre devant $x$ : 3.\n⛔ Le piège : répondre $-1$, l'ordonnée à l'origine. Ou 5, l'ordonnée du point : c'est $f(2)$, pas $f'(2)$.\nRéponse : 3.",
          micros: ["der_nd_geometrique"],
        },
        {
          enonce:
            "La tangente à la courbe de $f$ au point A$(1\\,;2)$ passe aussi par B$(3\\,;6)$. Que vaut $f'(1)$ ?",
          reponses: [{ attendu: "2" }],
          correction:
            "$f'(1)$ est le coefficient directeur de la tangente, qui passe par A et B.\n$(6 - 2) \\div (3 - 1) = 4 \\div 2 = 2$.\n⛔ Le piège : s'arrêter à $6 - 2 = 4$ sans diviser par l'écart des abscisses.\nRéponse : 2.",
          micros: ["der_nd_geometrique"],
        },
        {
          enonce:
            "La droite orange est la tangente à la courbe de $f$ en A. Le point B est sur cette tangente. Lis le nombre dérivé $f'(2)$.",
          figure: repere([-2, 5, -3, 6], [{ q: [0.5, 0, 1] }, { q: [0, 2, -1], couleur: ORANGE }], [
            { x: 2, y: 3, label: "A" },
            { x: 3, y: 5, label: "B" },
          ]),
          reponses: [{ attendu: "2" }],
          correction:
            "De A à B, on avance de 1 vers la droite et on monte de 2.\nLe coefficient directeur est $2 \\div 1 = 2$.\nDonc $f'(2) = 2$.\n⛔ Le piège : répondre 3, l'ordonnée de A. C'est $f(2)$ : le nombre dérivé se lit sur la pente, pas sur la hauteur.\nRéponse : 2.",
          micros: ["der_nd_lire_graphique"],
        },
        {
          enonce:
            "La droite orange est la tangente à la courbe de $f$ en A, d'abscisse 1. Quel est le signe de $f'(1)$ ? Réponds positif, négatif ou nul.",
          figure: repere([-3, 3, -2, 5], [{ q: [-1, 0, 3] }, { q: [0, -2, 4], couleur: ORANGE }], [{ x: 1, y: 2, label: "A" }]),
          reponses: [{ attendu: ["négatif", "négative"] }],
          correction:
            "On regarde la tangente, de gauche à droite : elle descend.\nUne droite qui descend a un coefficient directeur négatif.\nDonc $f'(1) < 0$.\n⛔ Le piège : regarder la hauteur du point A, au-dessus de l'axe. $f(1)$ est positif, mais $f'(1)$ est négatif.\nRéponse : négatif.",
          micros: ["der_nd_geometrique"],
        },
        {
          enonce:
            "La courbe d'une fonction $f$ est tracée. En quelle abscisse le nombre dérivé est-il nul ?",
          figure: repere([-1, 5, -2, 5], [{ q: [1, -4, 3] }]),
          reponses: [{ attendu: "2" }],
          correction:
            "Le nombre dérivé est nul là où la tangente est horizontale.\nC'est au point le plus bas de la courbe, d'abscisse 2.\n⛔ Le piège : répondre $-1$, l'ordonnée de ce point. Ou 1 et 3, là où la courbe coupe l'axe : c'est $f(x)$ qui y est nul, pas $f'(x)$.\nRéponse : 2.",
          micros: ["der_nd_lire_graphique"],
        },
        {
          enonce:
            "Un pâtissier note $C(x)$ le coût total, en euros, de $x$ gâteaux. Il a calculé $C'(100) = 12$. Combien coûte environ un gâteau de plus, quand il en a déjà produit 100 ?",
          reponses: [{ attendu: ["12 €", "environ 12 €"] }],
          correction:
            "$C'(100)$ est le coût marginal : le coût d'une unité de plus, à partir de 100.\nIci, il vaut environ 12 €.\n⛔ Le piège : lire « 100 gâteaux coûtent 12 € ». Le coût total de ces 100 gâteaux, c'est $C(100)$, sans le prime.\nRéponse : environ 12 €.",
          micros: ["der_nd_cout_marginal"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : dire ce que mesure le nombre dérivé avant de calculer.",
      rappel: [
        "Si $d(t)$ est une distance, $d'(t)$ est la vitesse à l'instant $t$ ; le taux de variation est une vitesse moyenne.",
        "$f'(a)$ donne le rythme à l'instant $a$ : $f(a + 1)$ vaut environ $f(a) + f'(a)$.",
        "Sur une courbe : là où elle monte, $f'(x)$ est positif ; là où elle descend, négatif ; là où sa tangente est horizontale, nul.",
        "La tangente en $a$ a pour coefficient directeur $f'(a)$, et elle passe par le point de la courbe d'ordonnée $f(a)$.",
      ],
      exercices: [
        {
          enonce:
            "Une skippeuse suit son voilier au départ d'une régate. La distance parcourue est $d(t) = t^2 + 4t$, en mètres, où $t$ est le temps en secondes (modèle). On admet que $d'(t) = 2t + 4$.\na) Quelle est sa vitesse moyenne entre $t = 2$ et $t = 4$ ?\nb) Quelle est sa vitesse à l'instant $t = 2$ ?\nc) Quelle est sa vitesse à l'instant $t = 4$ ?",
          reponses: [
            { question: "a)", attendu: "10 m/s" },
            { question: "b)", attendu: "8 m/s" },
            { question: "c)", attendu: "12 m/s" },
          ],
          correction:
            "a) $d(2) = 4 + 8 = 12$ et $d(4) = 16 + 16 = 32$. Donc $(32 - 12) \\div (4 - 2) = 10$ m/s.\nb) $d'(2) = 2 \\times 2 + 4 = 8$ m/s.\nc) $d'(4) = 2 \\times 4 + 4 = 12$ m/s.\n⛔ Le piège au a) : calculer $32 \\div 4 = 8$, en comptant depuis le départ. Entre 2 et 4, la distance parcourue est $32 - 12$, et la durée est de 2 secondes.\nRéponse : a) 10 m/s ; b) 8 m/s ; c) 12 m/s.",
          micros: ["der_nd_cout_marginal"],
        },
        {
          enonce:
            "Une pharmacienne d'hôpital suit le stock d'un médicament, $S(t)$, en boîtes, où $t$ est le temps en jours (modèle). Le jour 5, elle a $S(5) = 400$ et $S'(5) = -30$.\na) Le jour 5, le stock augmente-t-il ou diminue-t-il ? Réponds augmente ou diminue.\nb) De combien de boîtes par jour, environ ?\nc) Estime le stock du jour 6.",
          reponses: [
            { question: "a)", attendu: "diminue" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "370" },
          ],
          correction:
            "a) $S'(5)$ est négatif : le stock diminue.\nb) Le rythme est d'environ 30 boîtes par jour : c'est la valeur de $S'(5)$, sans son signe.\nc) $S(6) \\approx S(5) + S'(5) = 400 - 30 = 370$ boîtes.\n⛔ Le piège au a) : lire le signe de $S(5)$, qui est positif. Le sens d'évolution se lit sur $S'(5)$.\nRéponse : a) diminue ; b) 30 ; c) 370.",
          micros: ["der_nd_cout_marginal"],
        },
        {
          enonce:
            "Une climatologue trace, sur $[-2\\,;5]$, la courbe d'une fonction $f$ : l'écart de température à la normale, en °C, où $x$ est le temps en dizaines d'années, compté depuis aujourd'hui (modèle). Les trois droites orange sont les tangentes à la courbe en A, B et C, d'abscisses $-1$, 1 et 3.\na) Lis $f'(-1)$.\nb) Lis $f'(1)$.\nc) Lis $f'(3)$.\nd) Sur quel intervalle de $[-2\\,;5]$ le nombre dérivé $f'(x)$ est-il positif ou nul ?",
          figure: repere([-2, 5, -1, 6], [
            { q: [-0.5, 1, 2.5] },
            { q: [0, 2, 3], couleur: ORANGE },
            { q: [0, 0, 3], couleur: ORANGE },
            { q: [0, -2, 7], couleur: ORANGE },
          ], [
            { x: -1, y: 1, label: "A" },
            { x: 1, y: 3, label: "B" },
            { x: 3, y: 1, label: "C" },
          ]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "-2" },
            { question: "d)", attendu: "[-2 ; 1]" },
          ],
          correction:
            "a) En A, la tangente monte : on avance de 1, on monte de 2. Donc $f'(-1) = 2$.\nb) En B, la tangente est horizontale : $f'(1) = 0$.\nc) En C, elle descend : on avance de 1, on descend de 2. Donc $f'(3) = -2$.\nd) La courbe monte de $-2$ à 1, puis descend : $f'(x)$ est positif ou nul sur $[-2\\,;1]$.\n⛔ Le piège au d) : répondre là où la courbe est au-dessus de l'axe. Le signe de $f'$ se lit sur le sens de la courbe, pas sur sa hauteur.\nRéponse : a) 2 ; b) 0 ; c) $-2$ ; d) $[-2\\,;1]$.",
          micros: ["der_nd_lire_graphique"],
        },
        {
          enonce:
            "Un ingénieur du son modélise le niveau d'une enceinte par une fonction $f$, où $x$ est l'écart au réglage habituel (modèle). La tangente en $-1$ a pour équation $y = -x + 2$. La tangente en 2 a pour équation $y = 3x - 1$.\na) Que vaut $f'(-1)$ ?\nb) Que vaut $f'(2)$ ?\nc) Que vaut $f(2)$ ?",
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) Le coefficient directeur de $y = -x + 2$ est $-1$ : $f'(-1) = -1$.\nb) Le coefficient directeur de $y = 3x - 1$ est 3 : $f'(2) = 3$.\nc) La tangente et la courbe se touchent en 2 : elles y ont la même ordonnée. $f(2) = 3 \\times 2 - 1 = 5$.\n⛔ Le piège au c) : répondre 3. Ce nombre est la pente $f'(2)$, pas la hauteur $f(2)$.\nRéponse : a) $-1$ ; b) 3 ; c) 5.",
          micros: ["der_nd_geometrique"],
        },
        {
          enonce:
            "Une artisane fabrique $x$ bougies. Le coût total est $C(x) = 0{,}05x^2 + 20x + 500$, en euros (modèle). On admet que $C'(x) = 0{,}1x + 20$.\na) Calcule le coût marginal $C'(40)$.\nb) Calcule le vrai coût de la 41e bougie : $C(41) - C(40)$.\nc) Chaque bougie se vend 30 €. Produire une bougie de plus après la 40e est-il rentable ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "24 €" },
            { question: "b)", attendu: "24,05 €" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) $C'(40) = 0{,}1 \\times 40 + 20 = 24$ €.\nb) $C(41) = 84{,}05 + 820 + 500 = 1\\,404{,}05$ et $C(40) = 80 + 800 + 500 = 1\\,380$. L'écart vaut $24{,}05$ €.\nLe coût marginal donne bien une valeur très proche du vrai coût.\nc) Une bougie de plus coûte environ 24 € et rapporte 30 € : oui.\n⛔ Le piège au c) : comparer 30 € au coût total $C(40)$. Pour décider d'UNE unité de plus, on compare au coût marginal.\nRéponse : a) 24 € ; b) 24,05 € ; c) oui.",
          micros: ["der_nd_cout_marginal"],
        },
        {
          enonce:
            "Une agricultrice suit la hauteur d'un plant : $f(x) = 0{,}5x^2 + x$, en cm, où $x$ est le nombre de semaines (modèle).\na) Calcule $f(4)$.\nb) Calcule le taux de variation de $f$ entre 4 et 5.\nc) Calcule le taux de variation de $f$ entre 4 et $4{,}1$.\nd) Entre 4 et $4{,}01$, le taux vaut $5{,}005$. Quel nombre dérivé $f'(4)$ ces calculs suggèrent-ils ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "5,5" },
            { question: "c)", attendu: "5,05" },
            { question: "d)", attendu: "5" },
          ],
          correction:
            "a) $f(4) = 0{,}5 \\times 16 + 4 = 12$.\nb) $f(5) = 12{,}5 + 5 = 17{,}5$, donc $(17{,}5 - 12) \\div 1 = 5{,}5$.\nc) $f(4{,}1) = 8{,}405 + 4{,}1 = 12{,}505$, donc $(12{,}505 - 12) \\div 0{,}1 = 5{,}05$.\nd) $5{,}5$, puis $5{,}05$, puis $5{,}005$ : on se rapproche de 5.\n⛔ Le piège au c) : oublier de diviser par $0{,}1$ et répondre $0{,}505$.\nRéponse : a) 12 ; b) 5,5 ; c) 5,05 ; d) 5.",
          micros: ["der_nd_definition"],
        },
        {
          enonce:
            "Une kinésithérapeute suit la progression de l'amplitude d'un genou par une fonction $f$ (modèle). La droite orange est la tangente à la courbe en A, et elle passe aussi par B.\na) Lis $f(2)$.\nb) Lis $f'(2)$.\nc) Donne l'équation de la tangente, sous la forme $y = mx + p$.",
          figure: repere([-2, 5, -2, 7], [{ q: [0.25, 0, 2] }, { q: [0, 1, 1], couleur: ORANGE }], [
            { x: 2, y: 3, label: "A" },
            { x: 4, y: 5, label: "B" },
          ]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: ["y = x + 1", "y = 1 + x"], exact: true },
          ],
          correction:
            "a) A a pour ordonnée 3 : $f(2) = 3$.\nb) De A à B, on avance de 2 et on monte de 2 : $2 \\div 2 = 1$. Donc $f'(2) = 1$.\nc) $y = 1 \\times x + p$. La tangente coupe l'axe vertical en 1, donc $p = 1$.\nVérification en A : $2 + 1 = 3$. ✔\n⛔ Le piège : confondre $f(2)$, la hauteur de A, et $f'(2)$, la pente de la tangente.\nRéponse : a) 3 ; b) 1 ; c) $y = x + 1$.",
          micros: ["der_nd_lire_graphique"],
        },
        {
          enonce:
            "Un hydrologue trace la courbe d'une fonction $f$ : le niveau d'une nappe phréatique par rapport à sa moyenne, où $x$ est le temps en mois, compté depuis aujourd'hui (modèle). On lit la courbe aux points A, B et C. Pour a), b) et c), réponds positif ou négatif.\na) Quel est le signe de $f'(-2)$ ?\nb) Quel est le signe de $f'(0)$ ?\nc) Quel est le signe de $f'(2)$ ?\nd) En quelles abscisses le nombre dérivé est-il nul ?",
          figure: repere([-3, 3, -4, 4], [{ p: [-1, 0, 3, 0] }], [
            { x: -2, y: 2, label: "A" },
            { x: 0, y: 0, label: "B" },
            { x: 2, y: -2, label: "C" },
          ]),
          reponses: [
            { question: "a)", attendu: ["négatif", "négative"] },
            { question: "b)", attendu: ["positif", "positive"] },
            { question: "c)", attendu: ["négatif", "négative"] },
            { question: "d)", attendu: "-1 ; 1" },
          ],
          correction:
            "On suit la courbe de gauche à droite.\na) En A, elle descend : $f'(-2)$ est négatif.\nb) En B, elle monte : $f'(0)$ est positif.\nc) En C, elle descend : $f'(2)$ est négatif.\nd) La tangente est horizontale aux deux points où la courbe change de sens : le creux en $x = -1$ et la bosse en $x = 1$.\n⛔ Le piège au a) : dire « positif » parce que A est au-dessus de l'axe. La hauteur donne le signe de $f$, le sens donne le signe de $f'$.\nRéponse : a) négatif ; b) positif ; c) négatif ; d) $-1$ et 1.",
          micros: ["der_nd_lire_graphique"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : calculer le nombre dérivé, dire ce qu'il veut dire, décider.",
      rappel: [
        "Une unité de plus est rentable si elle rapporte plus que le coût marginal.",
        "Une vitesse nulle, $d'(t) = 0$ : le véhicule est à l'arrêt.",
        "$f(a)$ donne la valeur à l'instant $a$, $f'(a)$ donne son rythme d'évolution : deux nombres, deux sens.",
      ],
      exercices: [
        {
          titre: "L'éditeur et son tirage",
          enonce:
            "Un éditeur imprime $x$ exemplaires d'un livre. Le coût total est $C(x) = 0{,}02x^2 + 3x + 200$, en euros (modèle). On admet que $C'(x) = 0{,}04x + 3$. Chaque livre lui rapporte 9 €.\na) Calcule $C'(100)$.\nb) Calcule $C'(200)$.\nc) Après le 100e exemplaire, en imprimer un de plus est-il rentable ? Réponds oui ou non.\nd) Après le 200e exemplaire ? Réponds oui ou non.\ne) Pour quel tirage $x$ le coût marginal vaut-il exactement 9 € ?",
          reponses: [
            { question: "a)", attendu: "7 €" },
            { question: "b)", attendu: "11 €" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: "150" },
          ],
          correction:
            "a) $C'(100) = 0{,}04 \\times 100 + 3 = 7$ €.\nb) $C'(200) = 0{,}04 \\times 200 + 3 = 11$ €.\nc) Un de plus coûte environ 7 € et rapporte 9 € : oui.\nd) Un de plus coûte environ 11 € et rapporte 9 € : non.\ne) $0{,}04x + 3 = 9$, donc $0{,}04x = 6$, donc $x = 6 \\div 0{,}04 = 150$.\n⛔ Le piège au e) : résoudre $C(x) = 9$. La question porte sur le coût marginal, $C'$.\nRéponse : a) 7 € ; b) 11 € ; c) oui ; d) non ; e) 150.",
          micros: ["der_nd_cout_marginal"],
        },
        {
          titre: "Le freinage du tram",
          enonce:
            "Une conductrice de tram freine. La distance parcourue depuis le début du freinage est $d(t) = -t^2 + 20t$, en mètres, où $t$ est le temps en secondes (modèle). On admet que $d'(t) = -2t + 20$.\na) Quelle est la vitesse au début du freinage, à $t = 0$ ?\nb) Quelle est la vitesse à $t = 5$ ?\nc) Quelle est la vitesse moyenne entre $t = 0$ et $t = 5$ ?\nd) À quel instant le tram s'arrête-t-il ?\ne) Quelle distance a-t-il parcourue en freinant ?",
          reponses: [
            { question: "a)", attendu: "20 m/s" },
            { question: "b)", attendu: "10 m/s" },
            { question: "c)", attendu: "15 m/s" },
            { question: "d)", attendu: "10 s" },
            { question: "e)", attendu: "100 m" },
          ],
          correction:
            "a) $d'(0) = 20$ m/s.\nb) $d'(5) = -10 + 20 = 10$ m/s.\nc) $d(5) = -25 + 100 = 75$ et $d(0) = 0$, donc $75 \\div 5 = 15$ m/s.\nd) À l'arrêt, la vitesse est nulle : $-2t + 20 = 0$, donc $t = 10$ s.\ne) $d(10) = -100 + 200 = 100$ m.\n⛔ Le piège au d) : résoudre $d(t) = 0$. Cette équation dit « distance nulle », pas « vitesse nulle ».\nRéponse : a) 20 m/s ; b) 10 m/s ; c) 15 m/s ; d) 10 s ; e) 100 m.",
          micros: ["der_nd_cout_marginal", "der_nd_definition"],
        },
        {
          titre: "Le réglage du chauffage",
          enonce:
            "Une conseillère en énergie trace le coût de chauffage $C(x)$ d'un bâtiment, en centaines d'euros par mois, selon un réglage $x$ de la chaudière (modèle). Les droites orange sont les tangentes à la courbe en A, B et C.\na) Lis $C'(2)$.\nb) Lis $C'(6)$.\nc) En quelle abscisse la tangente est-elle horizontale ?\nd) Quel est le coût pour ce réglage ?\ne) En passant du réglage 6 au réglage 7, le coût augmente-t-il ou diminue-t-il ? Réponds augmente ou diminue.",
          figure: repere([-1, 8, -1, 8], [
            { q: [0.5, -4, 10] },
            { q: [0, -2, 8], couleur: ORANGE },
            { q: [0, 0, 2], couleur: ORANGE },
            { q: [0, 2, -8], couleur: ORANGE },
          ], [
            { x: 2, y: 4, label: "A" },
            { x: 4, y: 2, label: "B" },
            { x: 6, y: 4, label: "C" },
          ]),
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: ["2", "200 €"] },
            { question: "e)", attendu: "augmente" },
          ],
          correction:
            "a) En A, la tangente descend de 2 quand on avance de 1 : $C'(2) = -2$.\nb) En C, elle monte de 2 quand on avance de 1 : $C'(6) = 2$.\nc) En B, d'abscisse 4, la tangente est horizontale.\nd) B a pour ordonnée 2 : le coût vaut 2 centaines d'euros, soit 200 € par mois.\ne) En 6, le nombre dérivé est positif : le coût augmente.\n⛔ Le piège au a) : lire l'ordonnée de A, qui vaut 4. On lit la pente de la tangente, avec son signe.\nRéponse : a) $-2$ ; b) 2 ; c) 4 ; d) 2 ; e) augmente.",
          micros: ["der_nd_lire_graphique", "der_nd_cout_marginal"],
        },
        {
          titre: "La phrase de la journaliste",
          enonce:
            "Un magazine en ligne note $S(t)$ son nombre d'abonnés, en milliers, où $t$ est le temps en mois (modèle). On a $S(6) = 40$ et $S'(6) = 2$. Une journaliste écrit : « Le magazine a atteint 2 000 abonnés au mois 6. »\na) Combien d'abonnés le magazine a-t-il au mois 6 ?\nb) De combien d'abonnés par mois ce nombre augmente-t-il à ce moment-là ?\nc) Estime $S(7)$, en milliers.\nd) La phrase de la journaliste est-elle vraie ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: ["40 000", "40 milliers", "40 mille"] },
            { question: "b)", attendu: ["2 000", "2 milliers", "2 mille"] },
            { question: "c)", attendu: "42" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $S(6) = 40$ milliers : $40\\,000$ abonnés.\nb) $S'(6) = 2$ milliers par mois : $2\\,000$ abonnés par mois.\nc) $S(7) \\approx S(6) + S'(6) = 40 + 2 = 42$ milliers.\nd) Faux : 2 000 est le rythme, pas le nombre d'abonnés.\n⛔ Le piège : confondre la valeur, $S(6)$, et le rythme, $S'(6)$. C'est exactement l'erreur de la journaliste.\nRéponse : a) 40 000 ; b) 2 000 ; c) 42 ; d) faux.",
          micros: ["der_nd_cout_marginal"],
        },
      ],
    },
  ],
};
