// ─── Fiche d'exercices : degré 2, la parabole (STMG) — 20 exercices ────────────
//
// Notion fct_degre2_courbe du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : associer une parabole à ax², ax² + b ou a(x − x₁)(x − x₂), lire le
// signe de a (orientation) et sa valeur absolue (ouverture), et voir b comme une
// translation verticale. Jamais de discriminant ni de forme canonique.
//
// ⭐ AUCUNE DONNÉE RÉELLE : toutes les formules sont des modèles ou des situations
// visiblement fictives.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; jardin public (fontainière),
// petit commerce (gérant), skatepark (architecte), ouvrages d'art (ingénieure),
// gestion (comptable), plongeon (entraîneur), spectacle (éclairagiste),
// laboratoire (biologiste) ; skatepark (constructeur), fromagerie (fromagère),
// analyse de données (analyste), télécoms (technicien).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-2.mjs`.
//
// Micro-compétences : fct_d2_role_a (1, 2, 3, 9, 10, 11, 12, 16, 17, 18),
// fct_d2_translation (4, 5, 6, 12, 13, 14, 17, 20), fct_d2_associer (7, 8, 9, 10,
// 15, 16, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";

export const exercicesFctDegre2CourbeStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-degre2-courbe",
  titre: "Degré 2 : la parabole",
  accroche:
    "Vingt exercices pour lire une parabole sans la tracer : son sens, son ouverture, sa position. Le signe de a, la translation par b, les racines qu'on lit dans les parenthèses. Une fontaine, un skatepark, une arche de pont, une fromagerie et une antenne. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire le sens, l'ouverture, la translation ou les racines.",
      rappel: [
        "La courbe d'une fonction de degré 2 est une parabole. Si $a > 0$, elle est tournée vers le haut ; si $a < 0$, vers le bas.",
        "Plus $|a|$ est grand, plus la parabole est resserrée. Le signe ne compte pas pour l'ouverture.",
        "La courbe de $ax^2 + b$, c'est celle de $ax^2$ translatée verticalement : vers le haut si $b > 0$, vers le bas si $b < 0$. Son sommet est le point $(0 ; b)$.",
        "La courbe de $a(x - x_1)(x - x_2)$ coupe l'axe des abscisses en $x_1$ et $x_2$ : ce sont les racines.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = -3x^2 + 1$. Sa parabole est-elle tournée vers le haut ou vers le bas ? Réponds haut ou bas.",
          reponses: [{ attendu: ["bas", "vers le bas", "le bas"] }],
          correction:
            "Le sens se lit sur le coefficient de $x^2$ : ici $a = -3$.\n$a$ est négatif, donc la parabole est tournée vers le bas.\n⛔ Le piège : regarder le « + 1 ». Il donne la position de la courbe, pas son sens.\nRéponse : bas.",
          micros: ["fct_d2_role_a"],
        },
        {
          enonce:
            "La courbe tracée est celle de $f(x) = ax^2 - 2$. Le coefficient $a$ est-il positif ou négatif ? Réponds positif ou négatif.",
          figure: repere([-4, 4, -3, 6], [{ q: [0.5, 0, -2] }]),
          reponses: [{ attendu: "positif" }],
          correction:
            "Les branches montent quand on s'éloigne du sommet : la parabole est tournée vers le haut.\nDonc $a > 0$.\n⛔ Le piège : voir le sommet sous l'axe et conclure que $a$ est négatif. Le sommet bas vient du « − 2 », pas de $a$.\nRéponse : positif.",
          micros: ["fct_d2_role_a"],
        },
        {
          enonce:
            "Voici trois fonctions : $f(x) = 0{,}5x^2$, $g(x) = -4x^2$ et $h(x) = 2x^2$. Laquelle a la parabole la plus resserrée ? Écris son nom : f, g ou h.",
          reponses: [{ attendu: ["g", "g(x)"] }],
          correction:
            "Pour l'ouverture, on compare les valeurs absolues de $a$, sans les signes : $0{,}5$ ; $4$ ; $2$.\nLa plus grande est $4$ : c'est la parabole de $g$.\n⛔ Le piège : choisir $h$ parce que $2$ est le plus grand des trois nombres écrits. Le signe moins de $g$ donne le sens, pas l'ouverture.\nRéponse : g.",
          micros: ["fct_d2_role_a"],
        },
        {
          enonce:
            "On passe de la courbe de $g(x) = 2x^2$ à celle de $f(x) = 2x^2 + 5$.\na) La courbe est translatée de combien d'unités ?\nb) Vers le haut ou vers le bas ? Réponds haut ou bas.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: ["haut", "vers le haut", "le haut"] },
          ],
          correction:
            "a) On ajoute $5$ à toutes les ordonnées : la courbe bouge de 5 unités.\nb) $5$ est positif : elle monte.\n⛔ Le piège : dire « vers la droite ». Ajouter une constante déplace la courbe verticalement.\nRéponse : a) 5 ; b) haut.",
          micros: ["fct_d2_translation"],
        },
        {
          enonce:
            "On translate la courbe de $g(x) = x^2$ de 3 unités vers le bas. Écris l'expression de la fonction $f$ obtenue.",
          reponses: [{ attendu: "x^2 - 3" }],
          correction:
            "Monter, c'est ajouter ; descendre, c'est retrancher.\nOn retranche $3$ : $f(x) = x^2 - 3$.\n⛔ Le piège : écrire $(x - 3)^2$. Le 3 dans le carré déplace la courbe horizontalement.\nRéponse : $f(x) = x^2 - 3$.",
          micros: ["fct_d2_translation"],
        },
        {
          enonce:
            "Soit $f(x) = -x^2 + 4$. Quelles sont les coordonnées du sommet de sa parabole ? Écris (abscisse ; ordonnée).",
          reponses: [{ attendu: "(0 ; 4)", ordre: true }],
          correction:
            "La courbe de $g(x) = -x^2$ a son sommet en $(0 ; 0)$.\nOn ajoute $4$ : le sommet monte de 4 et arrive en $(0 ; 4)$.\n⛔ Le piège : inverser les coordonnées et écrire $(4 ; 0)$. Une translation verticale ne change pas l'abscisse.\nRéponse : $(0 ; 4)$.",
          micros: ["fct_d2_translation"],
        },
        {
          enonce:
            "Soit $f(x) = (x - 1)(x + 4)$. En quels nombres sa courbe coupe-t-elle l'axe des abscisses ? Écris les deux nombres, séparés par un point-virgule.",
          reponses: [{ attendu: "1 ; -4" }],
          correction:
            "La courbe coupe l'axe là où l'expression vaut $0$, donc là où une parenthèse s'annule.\n$x - 1 = 0$ donne $x = 1$. $x + 4 = 0$ donne $x = -4$.\n⛔ Le piège : recopier les nombres des parenthèses, $-1$ et $4$, sans changer leur signe.\nRéponse : $1$ et $-4$.",
          micros: ["fct_d2_associer"],
        },
        {
          enonce:
            "Quelle expression correspond à la parabole tracée ? Écris la lettre.\nA : $f(x) = (x - 1)(x + 3)$\nB : $f(x) = (x + 1)(x - 3)$\nC : $f(x) = -(x + 1)(x - 3)$",
          figure: repere([-3, 5, -5, 4], [{ q: [1, -2, -3] }]),
          reponses: [{ attendu: "B" }],
          correction:
            "La courbe coupe l'axe des abscisses en $-1$ et en $3$ : ce sont les racines.\nLes facteurs sont donc $(x + 1)$ et $(x - 3)$ : A ne convient pas.\nLa parabole est tournée vers le haut, donc $a > 0$ : C ne convient pas.\n⛔ Le piège : choisir A en recopiant $-1$ et $3$ dans les parenthèses.\nRéponse : B.",
          micros: ["fct_d2_associer"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation, plusieurs questions : le sens, l'ouverture, puis la position de la courbe.",
      rappel: [
        "Pour associer une courbe à une expression : on lit les racines ou le point sur l'axe des ordonnées, puis on regarde le sens.",
        "Dans $a(x - x_1)(x - x_2)$, on annule chaque parenthèse pour trouver la racine. Le coefficient $a$ devant ne crée pas de racine.",
        "La courbe de $ax^2 + b$ coupe l'axe des ordonnées en $b$.",
        "$b$ s'ajoute hors du carré. Mis dans le carré, le déplacement serait horizontal.",
      ],
      exercices: [
        {
          enonce:
            "Lina, fontainière dans un jardin public, règle un jet d'eau (modèle). La hauteur de l'eau, en mètres, à la distance $x$ de la buse (en mètres), est $h(x) = -0{,}5x(x - 6)$.\na) En quels nombres la courbe coupe-t-elle l'axe des abscisses ? Écris-les séparés par un point-virgule.\nb) Le jet est-il tourné vers le haut ou vers le bas ? Réponds haut ou bas.\nc) Quelle est la valeur du coefficient $a$ ?",
          reponses: [
            { question: "a)", attendu: "0 ; 6" },
            { question: "b)", attendu: ["bas", "vers le bas", "le bas"] },
            { question: "c)", attendu: "-0,5" },
          ],
          correction:
            "a) Un produit s'annule quand un facteur s'annule. $x = 0$ annule le facteur $x$, et $x - 6 = 0$ donne $x = 6$.\nb) et c) Le coefficient devant le produit est $a = -0{,}5$. Il est négatif : la courbe est tournée vers le bas, comme un jet d'eau.\n⛔ Le piège au a) : oublier la racine $0$, car le facteur $x$ n'a pas de parenthèse.\nRéponse : a) $0$ et $6$ ; b) bas ; c) $-0{,}5$.",
          micros: ["fct_d2_associer", "fct_d2_role_a"],
        },
        {
          enonce:
            "Marc tient une boutique de vélos. La courbe donne son bénéfice (modèle), en milliers d'euros, pour $x$ centaines de vélos vendus.\na) Lis les deux racines sur la courbe. Écris-les séparées par un point-virgule.\nb) Quelle expression correspond à la courbe ? Écris la lettre.\nA : $B(x) = -2(x - 1)(x - 5)$\nB : $B(x) = 2(x - 1)(x - 5)$\nC : $B(x) = -2(x + 1)(x + 5)$",
          figure: repere([-1, 7, -3, 9], [{ q: [-2, 12, -10] }]),
          reponses: [
            { question: "a)", attendu: "1 ; 5" },
            { question: "b)", attendu: "A" },
          ],
          correction:
            "a) La courbe coupe l'axe des abscisses en $1$ et en $5$.\nb) Les racines $1$ et $5$ donnent les facteurs $(x - 1)$ et $(x - 5)$ : C ne convient pas, ses racines sont $-1$ et $-5$.\nLa parabole est tournée vers le bas, donc $a < 0$ : B ne convient pas.\n⛔ Le piège : regarder seulement les racines. A et B ont les mêmes, seul le sens les sépare.\nRéponse : a) $1$ et $5$ ; b) A.",
          micros: ["fct_d2_associer", "fct_d2_role_a"],
        },
        {
          enonce:
            "Yanis, architecte, dessine trois profils de rampes pour un skatepark : $f(x) = 0{,}2x^2$, $g(x) = 0{,}5x^2$ et $h(x) = 1{,}5x^2$.\na) Quel profil est le plus resserré ? Écris son nom.\nb) Quel profil est le plus ouvert ? Écris son nom.\nc) Sont-ils tournés vers le haut ou vers le bas ? Réponds haut ou bas.",
          reponses: [
            { question: "a)", attendu: ["h", "h(x)"] },
            { question: "b)", attendu: ["f", "f(x)"] },
            { question: "c)", attendu: ["haut", "vers le haut", "le haut"] },
          ],
          correction:
            "a) Plus $|a|$ est grand, plus la parabole est resserrée. Le plus grand coefficient est $1{,}5$ : c'est $h$.\nb) Le plus petit est $0{,}2$ : c'est $f$.\nc) Les trois coefficients sont positifs : les trois profils sont tournés vers le haut.\n⛔ Le piège : croire qu'un grand $a$ donne une courbe plus large. C'est l'inverse : les branches montent plus vite.\nRéponse : a) h ; b) f ; c) haut.",
          schema: repere([-4, 4, -1, 7], [{ q: [0.2, 0, 0] }, { q: [0.5, 0, 0], couleur: ORANGE }, { q: [1.5, 0, 0], couleur: "#16a34a" }], [
            { x: 3.5, y: 2.45, label: "f" },
            { x: 3, y: 4.5, label: "g" },
            { x: 2, y: 6, label: "h" },
          ]),
          micros: ["fct_d2_role_a"],
        },
        {
          enonce:
            "Clara, ingénieure, compare deux arches de pont (modèle), en mètres : l'arche A a pour profil $A(x) = -0{,}25x^2 + 4$, l'arche B a pour profil $B(x) = -x^2 + 4$. Le dessin montre la courbe 1 et la courbe 2.\na) Quelle courbe est celle de l'arche B ? Écris 1 ou 2.\nb) Quelle est la hauteur du sommet de chaque arche, en mètres ?",
          figure: repere([-5, 5, -2, 6], [{ q: [-1, 0, 4] }, { q: [-0.25, 0, 4], couleur: ORANGE }], [
            { x: 1, y: 3, label: "1" },
            { x: 3, y: 1.75, label: "2" },
          ]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "4 m" },
          ],
          correction:
            "a) On compare les valeurs absolues : $1$ pour B et $0{,}25$ pour A. B a la parabole la plus resserrée, c'est la courbe 1.\nb) Les deux expressions se terminent par $+ 4$ : les deux sommets sont en $(0 ; 4)$, à 4 m.\n⛔ Le piège au a) : croire que $-1$ est plus petit que $-0{,}25$, donc plus ouvert. Pour l'ouverture, on oublie le signe.\nRéponse : a) courbe 1 ; b) 4 m.",
          micros: ["fct_d2_role_a", "fct_d2_translation"],
        },
        {
          enonce:
            "Nadia, comptable, modélise le coût de production d'un atelier pour $x$ centaines de pièces : $C(x) = 0{,}5x^2 + 3$, en milliers d'euros, où $3$ représente les charges fixes. Les charges fixes passent de 3 à 5.\na) Écris la nouvelle expression $D(x)$.\nb) La courbe est translatée de combien d'unités ?\nc) Vers le haut ou vers le bas ? Réponds haut ou bas.",
          reponses: [
            { question: "a)", attendu: "0,5x^2 + 5" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: ["haut", "vers le haut", "le haut"] },
          ],
          correction:
            "a) Seule la constante change : $D(x) = 0{,}5x^2 + 5$.\nb) $5 - 3 = 2$ : chaque coût augmente de 2 milliers d'euros.\nc) Les ordonnées augmentent : la courbe monte, sans changer de forme.\n⛔ Le piège au b) : répondre 5. La translation se mesure entre les deux courbes, c'est l'écart entre 3 et 5.\nRéponse : a) $D(x) = 0{,}5x^2 + 5$ ; b) 2 ; c) haut.",
          micros: ["fct_d2_translation"],
        },
        {
          enonce:
            "Théo, entraîneur de plongeon, étudie le saut d'une plongeuse (modèle) : sa hauteur est $g(x) = -x^2 + 4$, en mètres, à l'abscisse $x$ (en mètres). Elle s'élance d'un plongeoir placé 3 m plus bas : la courbe descend de 3 unités.\na) Écris l'expression de la nouvelle fonction $f$.\nb) Quelles sont les coordonnées du nouveau sommet ? Écris (abscisse ; ordonnée).",
          reponses: [
            { question: "a)", attendu: "-x^2 + 1" },
            { question: "b)", attendu: "(0 ; 1)", ordre: true },
          ],
          correction:
            "a) Descendre, c'est retrancher : $f(x) = -x^2 + 4 - 3 = -x^2 + 1$.\nb) Le sommet de $g$ est $(0 ; 4)$. Il descend de 3 : son ordonnée devient $4 - 3 = 1$, soit $(0 ; 1)$.\n⛔ Le piège au a) : écrire $-(x - 3)^2 + 4$. Le 3 dans le carré déplace le saut vers la droite, pas vers le bas.\nRéponse : a) $f(x) = -x^2 + 1$ ; b) $(0 ; 1)$.",
          micros: ["fct_d2_translation"],
        },
        {
          enonce:
            "Sofia, éclairagiste de spectacle, projette un arc de lumière (modèle). Elle hésite entre $f(x) = x^2 + 1$, $g(x) = -x^2 + 1$ et $h(x) = x^2 - 1$. La courbe tracée est le résultat obtenu.\na) En quel nombre la courbe coupe-t-elle l'axe des ordonnées ?\nb) Quelle fonction a-t-elle choisie ? Écris son nom.",
          figure: repere([-3, 3, -4, 3], [{ q: [-1, 0, 1] }]),
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: ["g", "g(x)"] },
          ],
          correction:
            "a) On lit le point de la courbe sur l'axe vertical : son ordonnée est $1$.\nb) $f$ et $g$ conviennent pour ce point, $h$ non (elle donnerait $-1$). La courbe est tournée vers le bas : c'est $g$, dont le coefficient est négatif.\n⛔ Le piège au b) : choisir $f$ à cause du « + 1 ». Il faut aussi regarder le sens.\nRéponse : a) 1 ; b) g.",
          micros: ["fct_d2_associer"],
        },
        {
          enonce:
            "Malik, biologiste, modélise la croissance d'une culture selon la température $t$, en °C : $V(t) = -(t - 2)(t - 10)$. Sans tracer la courbe :\na) En quels nombres coupe-t-elle l'axe des abscisses ? Écris-les séparés par un point-virgule.\nb) Quelle est la valeur du coefficient $a$ ?\nc) Vers quel côté est-elle tournée ? Réponds haut ou bas.",
          reponses: [
            { question: "a)", attendu: "2 ; 10" },
            { question: "b)", attendu: "-1" },
            { question: "c)", attendu: ["bas", "vers le bas", "le bas"] },
          ],
          correction:
            "a) $t - 2 = 0$ donne $t = 2$, et $t - 10 = 0$ donne $t = 10$.\nb) Le signe moins devant le produit, c'est $a = -1$.\nc) $a$ est négatif : la courbe est tournée vers le bas.\n⛔ Le piège au b) : ne voir aucun nombre devant la parenthèse et répondre $1$. Le signe moins compte.\nRéponse : a) $2$ et $10$ ; b) $-1$ ; c) bas.",
          micros: ["fct_d2_associer", "fct_d2_role_a"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : le sens, l'ouverture, la position, puis une vérification par un calcul d'image.",
      rappel: [
        "Devant une parabole, trois questions : quel sens (le signe de $a$) ? quelle ouverture ($|a|$) ? quelle position ($b$ ou les racines) ?",
        "Une translation verticale ne change ni le sens ni l'ouverture.",
        "Pour vérifier une expression, on calcule une image : on remplace $x$ par un nombre, par exemple $0$.",
      ],
      exercices: [
        {
          titre: "La rampe surélevée",
          enonce:
            "Enzo construit une rampe de skate. Son profil, en mètres, est $f(x) = 0{,}5x^2 - 2$ (modèle).\na) La rampe est-elle tournée vers le haut ou vers le bas ? Réponds haut ou bas.\nb) Quelle est l'ordonnée de son point le plus bas ?\nc) Il surélève toute la rampe de 3 m. Écris l'expression de la fonction $g$ obtenue.\nd) Il remplace ensuite $g$ par $k(x) = 2x^2 + 3$. La rampe est-elle plus resserrée que celle de $g$ ? Réponds oui ou non.",
          figure: repere([-4, 4, -3, 6], [{ q: [0.5, 0, -2] }]),
          reponses: [
            { question: "a)", attendu: ["haut", "vers le haut", "le haut"] },
            { question: "b)", attendu: "-2" },
            { question: "c)", attendu: "0,5x^2 + 1" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) $a = 0{,}5$ est positif : la rampe est tournée vers le haut.\nb) Le point le plus bas est le sommet, en $x = 0$ : $f(0) = -2$.\nc) Monter de 3, c'est ajouter 3 : $g(x) = 0{,}5x^2 - 2 + 3 = 0{,}5x^2 + 1$.\nd) On compare les coefficients : $2$ est plus grand que $0{,}5$. Oui, la rampe est plus resserrée.\n⛔ Le piège au d) : regarder le « + 3 » de $k$, plus grand que le « + 1 » de $g$. L'ouverture dépend seulement de $a$.\nRéponse : a) haut ; b) $-2$ ; c) $g(x) = 0{,}5x^2 + 1$ ; d) oui.",
          micros: ["fct_d2_role_a", "fct_d2_translation"],
        },
        {
          titre: "Les deux recettes",
          enonce:
            "Dans une fromagerie, Louise compare deux recettes (modèle). Les bénéfices, en centaines d'euros, pour $x$ dizaines de kilos vendus, sont $P(x) = -0{,}5(x - 2)(x - 8)$ et $Q(x) = -(x - 2)(x - 8)$. Le dessin montre les deux courbes.\na) Quelles sont les racines de $P$ ? Écris-les séparées par un point-virgule.\nb) Quelles sont les racines de $Q$ ? Écris-les séparées par un point-virgule.\nc) Quelle fonction a la parabole la plus resserrée ? Écris son nom.\nd) Calcule $P(5)$.\ne) Calcule $Q(5)$.",
          figure: repere([-1, 10, -2, 10], [{ q: [-0.5, 5, -8] }, { q: [-1, 10, -16], couleur: ORANGE }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2 ; 8" },
            { question: "b)", attendu: "2 ; 8" },
            { question: "c)", attendu: ["Q", "Q(x)"] },
            { question: "d)", attendu: "4,5" },
            { question: "e)", attendu: "9" },
          ],
          correction:
            "a) et b) Le coefficient devant le produit ne crée pas de racine : les deux fonctions s'annulent en $2$ et en $8$.\nc) $|-1| = 1$ est plus grand que $|-0{,}5| = 0{,}5$ : la parabole de $Q$ est la plus resserrée. C'est la courbe orange, qui monte le plus haut.\nd) $P(5) = -0{,}5 \\times (5 - 2) \\times (5 - 8) = -0{,}5 \\times 3 \\times (-3) = 4{,}5$.\ne) $Q(5) = -(5 - 2)(5 - 8) = -3 \\times (-3) = 9$.\n⛔ Le piège au b) : croire que changer $a$ déplace les racines. Il change la hauteur, pas les points sur l'axe.\nRéponse : a) $2$ et $8$ ; b) $2$ et $8$ ; c) Q ; d) $4{,}5$ ; e) $9$.",
          micros: ["fct_d2_associer", "fct_d2_role_a"],
        },
        {
          titre: "Trois courbes à trier",
          enonce:
            "Awa, analyste de données, doit retrouver trois courbes d'un rapport (modèle). Elle a les expressions : $f(x) = 2(x - 1)(x - 4)$, $g(x) = -2(x - 1)(x - 4)$ et $h(x) = 2(x + 1)(x + 4)$.\na) Laquelle a pour racines $-1$ et $-4$ ? Écris son nom.\nb) Laquelle est tournée vers le bas ? Écris son nom.\nc) En quel nombre la courbe de $f$ coupe-t-elle l'axe des ordonnées ?\nd) En quel nombre la courbe de $g$ coupe-t-elle l'axe des ordonnées ?",
          reponses: [
            { question: "a)", attendu: ["h", "h(x)"] },
            { question: "b)", attendu: ["g", "g(x)"] },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "-8" },
          ],
          correction:
            "a) $x + 1 = 0$ donne $x = -1$, et $x + 4 = 0$ donne $x = -4$ : c'est $h$.\nb) Seule $g$ a un coefficient négatif, $a = -2$.\nc) La courbe coupe l'axe des ordonnées en $x = 0$ : $f(0) = 2 \\times (-1) \\times (-4) = 8$.\nd) $g(0) = -2 \\times (-1) \\times (-4) = -8$.\n⛔ Le piège au c) : compter un seul signe moins. Il y en a deux, et leur produit est positif.\nRéponse : a) h ; b) g ; c) $8$ ; d) $-8$.",
          micros: ["fct_d2_associer"],
        },
        {
          titre: "L'antenne relevée",
          enonce:
            "Un technicien, Gabriel, règle une antenne dont le profil est $p(x) = 0{,}25x^2$ (modèle). Il doit la relever de 2 unités vers le haut.\na) Écris l'expression $q(x)$ du profil relevé.\nb) Calcule $q(0)$.\nc) Son collègue propose $r(x) = 0{,}25(x - 2)^2$. Calcule $r(0)$.\nd) La proposition du collègue convient-elle ? Réponds oui ou non.\ne) Calcule $q(2)$.",
          reponses: [
            { question: "a)", attendu: "0,25x^2 + 2" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "1" },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: "3" },
          ],
          correction:
            "a) Monter, c'est ajouter : $q(x) = 0{,}25x^2 + 2$.\nb) $q(0) = 0{,}25 \\times 0^2 + 2 = 2$.\nc) $r(0) = 0{,}25 \\times (0 - 2)^2 = 0{,}25 \\times 4 = 1$.\nd) Le sommet relevé doit être à la hauteur $2$, en $x = 0$. Or $r(0) = 1$ : non, la proposition ne convient pas. Le 2 dans le carré déplace la courbe vers la droite.\ne) $q(2) = 0{,}25 \\times 2^2 + 2 = 1 + 2 = 3$.\n⛔ Le piège : mettre le déplacement DANS le carré. Il faut l'ajouter à l'extérieur.\nRéponse : a) $q(x) = 0{,}25x^2 + 2$ ; b) $2$ ; c) $1$ ; d) non ; e) $3$.",
          micros: ["fct_d2_translation"],
        },
      ],
    },
  ],
};
