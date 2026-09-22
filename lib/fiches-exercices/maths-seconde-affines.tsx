// ─── Fiche d'exercices : les fonctions affines (seconde) ─────────────────────
//
// Quatrième feuille du bloc « Fonctions » de seconde (22/09/2026). Alignée sur
// la banque `lib/tutor-v4/questionBank/seconde/maths/fonctions-affines.bank.ts`
// (notionId fonctions_affines_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-affines.tsx`.
// ⛔ Aucune fonction de la fiche de cours n'est reprise (ni −3x + 5, ni 3x + 2,
// ni 4x − 12, ni ses points (1 ; 5) et (4 ; 14)).
//
// ⭐ LE FIL : b est le point de DÉPART, a ce qui s'ajoute à CHAQUE unité. Dans
// chaque problème, on dit ce que valent a et b dans la situation : un débit, un
// prix par minute, un degré tous les 300 m.
//
// ⭐ LE MONDE : les degrés Fahrenheit (et −40 °C = −40 °F), l'eau qui bout à
// 84 °C au sommet du mont Blanc et vers 70 °C sur l'Everest, la vitesse du son
// et l'orage, une facture d'électricité à décoder, deux offres de vélos en
// libre-service.
// Repères physiques (modèles d'usage courant, arrondis) : ébullition abaissée
// d'environ 1 °C tous les 300 m ; vitesse du son dans l'air v ≈ 331 + 0,6T m/s ;
// Everest 8 849 m (mesure de 2020).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-affines.mjs`.
//
// Micro-compétences : affine_forme (1, 8, 14, 15, 17, 18), affine_calculer_image
// (2, 6, 7, 8, 9, 14, 17, 18, 19, 20), affine_determiner_expression (3, 4, 6, 9,
// 12, 13, 16, 19), affine_signe (5, 10, 11, 14, 16, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauSignes, type Courbe } from "@/lib/fiches-exercices/figures";

/* Les droites lues dans les énoncés. */
const DROITE_3: Courbe[] = [{ q: [0, 2, -1] }];
const DROITES_13: Courbe[] = [{ q: [0, -1, 3] }, { q: [0, 1.5, -2], couleur: ORANGE }];

export const exercicesAffinesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonctions-affines-2de",
  titre: "Les fonctions affines",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître a et b, calculer une image, lire une droite, trouver l'expression par deux points, étudier le signe, comparer deux offres. Les degrés Fahrenheit, l'eau qui bout à 84 °C au sommet du mont Blanc, le tonnerre, une facture d'électricité, des vélos en libre-service. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/fonctions-affines-2de", titre: "Les fonctions affines" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : reconnaître, calculer, lire, tracer.",
      rappel: [
        "Une fonction AFFINE s'écrit $f(x) = ax + b$. Sa courbe est une DROITE.",
        "$b = f(0)$ est l'ordonnée à l'origine : là où la droite coupe l'axe des ordonnées.",
        "$a$ est le coefficient directeur : quand $x$ augmente de $1$, $f(x)$ augmente de $a$ (ou diminue, si $a$ est négatif).",
        "Le signe de $ax + b$ : le signe de $a$ à DROITE de la valeur qui l'annule, le signe contraire à gauche.",
      ],
      exercices: [
        {
          enonce: "Lesquelles de ces fonctions sont affines ? Donner alors $a$ et $b$.\na) $f(x) = 7 - 2x$\nb) $g(x) = 3x^2 + 1$\nc) $h(x) = \\dfrac{x}{4}$\nd) $k(x) = 2(x - 3) + 1$\ne) $u(x) = \\dfrac{5}{x}$",
          correction:
            "Une fonction est affine si elle peut s'écrire $ax + b$, avec $a$ et $b$ deux nombres.\na) $f(x) = -2x + 7$ : affine, avec $a = -2$ et $b = 7$.\nb) $g$ n'est PAS affine, à cause du $x^2$.\nc) $h(x) = \\dfrac{1}{4}x$ : affine, avec $a = \\dfrac{1}{4}$ et $b = 0$. On dit qu'elle est LINÉAIRE.\nd) $k(x) = 2x - 6 + 1 = 2x - 5$ : affine, avec $a = 2$ et $b = -5$.\ne) $u$ n'est PAS affine : le $x$ est au dénominateur.\n⛔ Le piège au a) : lire $a = 7$. Le coefficient $a$ est celui qui MULTIPLIE $x$, où qu'il soit écrit.",
          // f en bleu (a = −2, elle descend), k en orange (a = 2, elle monte).
          schema: repere([-1, 4, -6, 8], [{ q: [0, -2, 7] }, { q: [0, 2, -5], couleur: ORANGE }]),
          micros: ["affine_forme"],
        },
        {
          enonce: "Soit $f(x) = -4x + 6$.\na) Calculer $f(0)$, $f(2)$ et $f(-1{,}5)$.\nb) Trouver l'antécédent de $-10$.\nc) Trouver l'antécédent de $0$.",
          correction:
            "a) $f(0) = 6$, $f(2) = -4 \\times 2 + 6 = -8 + 6 = -2$ et $f(-1{,}5) = -4 \\times (-1{,}5) + 6 = 6 + 6 = 12$.\nb) $-4x + 6 = -10$ donne $-4x = -16$, donc $x = 4$.\nc) $-4x + 6 = 0$ donne $-4x = -6$, donc $x = 1{,}5$.\n⛔ Le piège au a) : $-4 \\times (-1{,}5)$ vaut $+6$, et non $-6$.",
          // Vertical : six colonnes demandaient 211 px pour 208 à 360 (mesuré).
          schema: tableau(["x", "−1,5", "0", "1,5", "2", "4"], ["f(x)", 12, 6, 0, -2, -10], true),
          micros: ["affine_calculer_image"],
        },
        {
          enonce: "Voici la droite qui représente une fonction affine $f$.\na) Lire l'ordonnée à l'origine $b$.\nb) Lire le coefficient directeur $a$.\nc) En déduire l'expression de $f(x)$.",
          figure: repere([-2, 4, -3, 5], DROITE_3),
          correction:
            "a) La droite coupe l'axe des ordonnées en $-1$ : $b = -1$.\nb) Depuis le point $(0\\,;\\,-1)$, on avance de $1$ vers la droite : la droite monte de $2$, jusqu'au point $(1\\,;\\,1)$. Donc $a = 2$.\nc) $f(x) = 2x - 1$. On vérifie avec un autre point lu, $(2\\,;\\,3)$ : $2 \\times 2 - 1 = 3$. ✓\n⛔ Le piège au b) : lire $a$ là où la droite coupe l'axe des abscisses. Le coefficient se lit en AVANÇANT de $1$.",
          schema: repere([-2, 4, -3, 5], DROITE_3, [{ x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3 }]),
          micros: ["affine_determiner_expression"],
        },
        {
          enonce: "Soit $f$ une fonction affine telle que $f(-1) = 7$ et $f(3) = -1$. Déterminer l'expression de $f(x)$.",
          correction:
            "Le coefficient directeur : $a = \\dfrac{f(3) - f(-1)}{3 - (-1)} = \\dfrac{-1 - 7}{4} = \\dfrac{-8}{4} = -2$.\nOn trouve $b$ avec l'un des deux points : $f(-1) = -2 \\times (-1) + b = 2 + b = 7$, donc $b = 5$.\nAinsi $f(x) = -2x + 5$. On vérifie avec l'autre point : $f(3) = -6 + 5 = -1$. ✓\n⛔ Le piège : écrire $3 - 1$ au dénominateur au lieu de $3 - (-1)$.",
          schema: repere([-2, 4, -2, 9], [{ q: [0, -2, 5] }], [{ x: -1, y: 7 }, { x: 3, y: -1 }]),
          micros: ["affine_determiner_expression"],
        },
        {
          enonce: "Étudier le signe de $f(x) = -2x + 7$, puis dresser son tableau de signes.",
          correction:
            "$-2x + 7 = 0$ donne $x = \\dfrac{7}{2} = 3{,}5$.\n$a = -2$ est négatif : $f(x)$ est POSITIF avant $3{,}5$ et NÉGATIF après.\nVérification : $f(0) = 7$, positif. ✓\n⛔ Le piège : écrire « $-$ avant, $+$ après » par habitude. À droite de la valeur qui annule, c'est le signe de $a$.",
          schema: tableauSignes(["−∞", "$3{,}5$", "+∞"], [["$-2x + 7$", ["+", "-"], ["0"]]]),
          micros: ["affine_signe"],
        },
        {
          enonce: "Soit $f$ une fonction affine. Quand $x$ augmente de $1$, $f(x)$ augmente de $3$ ; et $f(0) = -2$.\na) Que valent $a$ et $b$ ?\nb) Calculer $f(1)$, $f(4)$ et $f(-2)$.",
          correction:
            "a) $b = f(0) = -2$. Et $a$ est ce dont $f(x)$ augmente quand $x$ augmente de $1$ : $a = 3$. Donc $f(x) = 3x - 2$.\nb) $f(1) = 3 - 2 = 1$, $f(4) = 12 - 2 = 10$ et $f(-2) = -6 - 2 = -8$.\n⭐ Les accroissements sont PROPORTIONNELS : de $x = 1$ à $x = 4$, $x$ augmente de $3$, et $f(x)$ de $3 \\times 3 = 9$, de $1$ à $10$.",
          schema: tableau(["x", "−2", "0", "1", "4"], ["f(x)", -8, -2, 1, 10]),
          micros: ["affine_determiner_expression", "affine_calculer_image"],
        },
        {
          enonce: "Aux États-Unis, la température se donne en degrés Fahrenheit : $F(c) = 1{,}8c + 32$, où $c$ est la température en degrés Celsius.\na) Convertir $20$ °C, puis $100$ °C.\nb) Un thermomètre américain affiche $98{,}6$ °F. Quelle est la température en °C ?\nc) Pour quelle température les deux échelles affichent-elles le même nombre ?",
          correction:
            "a) $F(20) = 1{,}8 \\times 20 + 32 = 36 + 32 = 68$ °F. Et $F(100) = 180 + 32 = 212$ °F : l'eau bout à $212$ °F.\nb) On cherche l'antécédent : $1{,}8c + 32 = 98{,}6$ donne $1{,}8c = 66{,}6$, donc $c = 37$ °C. C'est la température du corps humain.\nc) On veut $1{,}8c + 32 = c$, soit $0{,}8c = -32$, donc $c = -40$. $-40$ °C, c'est aussi $-40$ °F.\n⛔ Le piège au b) : calculer $F(98{,}6)$. On connaît l'image, on cherche l'antécédent.",
          schema: tableau(["°C", "−40", "0", "20", "37", "100"], ["°F", -40, 32, 68, "98,6", 212], true),
          micros: ["affine_calculer_image"],
        },
        {
          enonce: "Soit $f(x) = -\\dfrac{1}{2}x + 3$.\na) Calculer $f(0)$ et $f(4)$.\nb) Tracer la droite qui représente $f$.\nc) Où coupe-t-elle l'axe des abscisses ?",
          correction:
            "a) $f(0) = 3$ et $f(4) = -2 + 3 = 1$.\nb) Une droite se trace avec DEUX points : $(0\\,;\\,3)$ et $(4\\,;\\,1)$. On les relie à la règle, et on prolonge.\nc) On résout $-\\dfrac{1}{2}x + 3 = 0$ : $\\dfrac{1}{2}x = 3$, donc $x = 6$. La droite coupe l'axe au point $(6\\,;\\,0)$.\n⭐ Choisir $x = 4$, un multiple de $2$, évite les fractions : $-\\dfrac{1}{2} \\times 4 = -2$.",
          schema: repere([-1, 7, -2, 5], [{ q: [0, -0.5, 3] }], [{ x: 0, y: 3 }, { x: 4, y: 1 }, { x: 6, y: 0 }]),
          micros: ["affine_forme", "affine_calculer_image"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : trouver l'expression, comparer deux droites, étudier un signe.",
      rappel: [
        "Par deux points $A$ et $B$ : $a = \\dfrac{y_B - y_A}{x_B - x_A}$, puis on trouve $b$ en remplaçant par l'un des deux points.",
        "Deux droites de même coefficient directeur sont parallèles.",
        "Pour comparer deux fonctions affines, on étudie le signe de leur DIFFÉRENCE : c'est encore une fonction affine.",
      ],
      exercices: [
        {
          enonce: "Soit $f$ une fonction affine telle que $f(2) = -1$ et $f(6) = 5$.\na) Déterminer $f(x)$.\nb) Calculer $f(10)$.\nc) Trouver la valeur exacte de l'antécédent de $0$.",
          correction:
            "a) $a = \\dfrac{5 - (-1)}{6 - 2} = \\dfrac{6}{4} = 1{,}5$. Puis $f(2) = 1{,}5 \\times 2 + b = 3 + b = -1$, donc $b = -4$. Ainsi $f(x) = 1{,}5x - 4$.\nb) $f(10) = 15 - 4 = 11$.\nc) $1{,}5x - 4 = 0$ donne $1{,}5x = 4$, donc $x = \\dfrac{4}{1{,}5} = \\dfrac{8}{3}$.\n⭐ On vérifie le a) avec l'autre point : $f(6) = 9 - 4 = 5$. ✓\n⛔ Le piège au c) : écrire $2{,}67$, qui n'est qu'une valeur approchée de $\\dfrac{8}{3}$.",
          schema: repere([-1, 7, -5, 7], [{ q: [0, 1.5, -4] }], [{ x: 2, y: -1 }, { x: 6, y: 5 }]),
          micros: ["affine_determiner_expression", "affine_calculer_image"],
        },
        {
          enonce: "Soit $f(x) = 4 - 0{,}8x$.\na) Dresser le tableau de signes de $f$.\nb) Résoudre $f(x) > 0$.\nc) Résoudre $f(x) \\geqslant 2$.",
          correction:
            "a) $4 - 0{,}8x = 0$ donne $0{,}8x = 4$, donc $x = 5$. Le coefficient $-0{,}8$ est négatif : $+$ avant $5$, $-$ après.\nb) $f(x) > 0$ pour $x < 5$ : les solutions forment $]{-\\infty}\\,;\\,5[$.\nc) $4 - 0{,}8x \\geqslant 2$ donne $-0{,}8x \\geqslant -2$. On divise par $-0{,}8$, négatif : le sens se retourne, $x \\leqslant 2{,}5$. Les solutions forment $]{-\\infty}\\,;\\,2{,}5]$.\n⛔ Le piège au c) : garder le sens en divisant par $-0{,}8$.",
          schema: tableauSignes(["−∞", "5", "+∞"], [["$4 - 0{,}8x$", ["+", "-"], ["0"]]]),
          micros: ["affine_signe"],
        },
        {
          enonce: "Soit $f(x) = 2x - 3$ et $g(x) = -x + 6$.\na) Calculer les coordonnées du point d'intersection de leurs droites.\nb) Étudier le signe de $f(x) - g(x)$.\nc) Sur quel intervalle la droite de $f$ est-elle au-dessus de celle de $g$ ?",
          correction:
            "a) On résout $f(x) = g(x)$ : $2x - 3 = -x + 6$, donc $3x = 9$ et $x = 3$. Puis $f(3) = 6 - 3 = 3$. Le point d'intersection est $(3\\,;\\,3)$.\nb) $f(x) - g(x) = 2x - 3 + x - 6 = 3x - 9$ : une fonction affine, nulle en $3$, de coefficient $3$ positif. Elle est négative avant $3$, positive après.\nc) La droite de $f$ est au-dessus quand $f(x) - g(x) > 0$ : sur $]3\\,;\\,+\\infty[$.\n⛔ Le piège au b) : écrire $2x - 3 - x + 6$. Le moins porte sur TOUT $g(x)$.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["−∞", "3", "+∞"], [["$3x - 9$", ["-", "+"], ["0"]]])}
              {repere([-1, 5, -4, 7], [{ q: [0, 2, -3] }, { q: [0, -1, 6], couleur: ORANGE }], [{ x: 3, y: 3 }])}
            </div>
          ),
          micros: ["affine_signe", "affine_calculer_image"],
        },
        {
          enonce: "La fonction affine $g$ a le même coefficient directeur que $f(x) = 3x - 1$, et sa droite passe par le point $A(2\\,;\\,-4)$.\na) Déterminer $g(x)$.\nb) Que peut-on dire des deux droites ?",
          correction:
            "a) Même coefficient directeur : $g(x) = 3x + b$. Le point $A$ donne $g(2) = -4$ : $6 + b = -4$, donc $b = -10$. Ainsi $g(x) = 3x - 10$.\nb) Même coefficient directeur, mais ordonnées à l'origine différentes ($-1$ et $-10$) : les droites sont PARALLÈLES, sans point commun.\n⛔ Le piège au a) : reprendre aussi le $b$ de $f$. Seule la pente est commune.",
          schema: repere([-1, 4, -8, 8], [{ q: [0, 3, -1] }, { q: [0, 3, -10], couleur: ORANGE }], [{ x: 2, y: -4, label: "A" }]),
          micros: ["affine_determiner_expression"],
        },
        {
          enonce: "Voici les droites de deux fonctions affines, $f$ en bleu et $g$ en orange.\na) Lire l'expression de $f(x)$.\nb) Lire l'expression de $g(x)$.\nc) Calculer les coordonnées de leur point d'intersection, et le vérifier sur le dessin.",
          figure: repere([-1, 4, -3, 4], DROITES_13),
          correction:
            "a) La droite bleue coupe l'axe des ordonnées en $3$, et descend de $1$ quand on avance de $1$ : $f(x) = -x + 3$.\nb) La droite orange coupe l'axe des ordonnées en $-2$. Quand on avance de $2$, elle monte de $3$ : $a = \\dfrac{3}{2} = 1{,}5$, et $g(x) = 1{,}5x - 2$.\nc) $-x + 3 = 1{,}5x - 2$ donne $2{,}5x = 5$, donc $x = 2$. Puis $f(2) = 1$ : le point d'intersection est $(2\\,;\\,1)$, bien visible sur le dessin.\n⛔ Le piège au b) : lire $a = 3$, parce qu'on a avancé de $2$ sans diviser.",
          schema: repere([-1, 4, -3, 4], DROITES_13, [{ x: 2, y: 1 }, { x: 0, y: 3 }, { x: 0, y: -2 }]),
          micros: ["affine_determiner_expression"],
        },
        {
          enonce: "Une baignoire contient $150$ L d'eau. On ouvre la bonde : elle se vide de $12$ L par minute. On note $V(t)$ le volume restant, en litres, au bout de $t$ minutes.\na) Montrer que $V(t) = 150 - 12t$. Est-ce une fonction affine ?\nb) Combien reste-t-il d'eau au bout de $5$ minutes ?\nc) Au bout de combien de temps reste-t-il $30$ L ?\nd) Quand la baignoire est-elle vide ? Sur quel intervalle $V$ a-t-elle un sens ?",
          correction:
            "a) Chaque minute, $12$ L s'en vont : au bout de $t$ minutes, $12t$ litres sont partis, et il reste $150 - 12t$. C'est une fonction affine, avec $a = -12$ et $b = 150$.\nb) $V(5) = 150 - 60 = 90$ L.\nc) $150 - 12t = 30$ donne $12t = 120$, donc $t = 10$ minutes.\nd) $150 - 12t = 0$ donne $t = 12{,}5$ : la baignoire est vide au bout de $12$ min $30$ s. $V$ a un sens sur $[0\\,;\\,12{,}5]$ : avant, on n'a pas ouvert ; après, il n'y a plus d'eau.\n⭐ Le coefficient directeur, c'est le débit : $a = -12$, le volume diminue de $12$ L chaque minute.",
          schema: tableau(["t (min)", "0", "5", "10", "12,5"], ["V (L)", 150, 90, 30, 0]),
          micros: ["affine_forme", "affine_calculer_image", "affine_signe"],
        },
        {
          enonce: "Soit $m$ un nombre, et $f(x) = (m - 2)x + 1$.\na) Pour quelles valeurs de $m$ la fonction $f$ est-elle décroissante ?\nb) Pour quelle valeur de $m$ est-elle constante ?\nc) Trouver $m$ pour que $f(3) = 7$.",
          correction:
            "a) $f$ est affine, de coefficient $a = m - 2$. Elle est décroissante quand $a < 0$ : $m - 2 < 0$, soit $m < 2$.\nb) Elle est constante quand $a = 0$ : $m = 2$, et alors $f(x) = 1$.\nc) $f(3) = 3(m - 2) + 1 = 3m - 5$. On résout $3m - 5 = 7$ : $3m = 12$, donc $m = 4$. Alors $f(x) = 2x + 1$, et $f(3) = 7$. ✓\n⛔ Le piège au a) : répondre « $m < 0$ ». C'est le coefficient $m - 2$ qui doit être négatif, pas $m$.",
          // Pour m = 4 (en bleu) et pour m = 2 (en orange, constante).
          schema: repere([-2, 3, -3, 8], [{ q: [0, 2, 1] }, { q: [0, 0, 1], couleur: ORANGE }], [{ x: 3, y: 7 }]),
          micros: ["affine_forme", "affine_determiner_expression"],
        },
        {
          enonce: "La droite d'une fonction affine $f$ passe par le point $A(-1\\,;\\,6)$ et coupe l'axe des abscisses en $2$.\na) Déterminer $f(x)$.\nb) Dresser le tableau de signes de $f$.",
          correction:
            "a) Couper l'axe des abscisses en $2$, c'est passer par le point $(2\\,;\\,0)$ : $f(2) = 0$.\n$a = \\dfrac{0 - 6}{2 - (-1)} = \\dfrac{-6}{3} = -2$. Puis $f(2) = -4 + b = 0$, donc $b = 4$. Ainsi $f(x) = -2x + 4$.\nb) $f$ s'annule en $2$, et $a = -2$ est négatif : $+$ avant $2$, $-$ après.\n⭐ On vérifie avec $A$ : $f(-1) = 2 + 4 = 6$. ✓",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["−∞", "2", "+∞"], [["$-2x + 4$", ["+", "-"], ["0"]]])}
              {repere([-2, 4, -3, 8], [{ q: [0, -2, 4] }], [{ x: -1, y: 6, label: "A" }, { x: 2, y: 0 }])}
            </div>
          ),
          micros: ["affine_determiner_expression", "affine_signe"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on écrit la fonction affine, on dit ce que valent a et b, on répond par une phrase.",
      rappel: [
        "Dans une situation, $b$ est la valeur de DÉPART, et $a$ ce qui s'ajoute à chaque unité : un prix par minute, un débit, un degré tous les $300$ m.",
        "On vérifie toujours son expression sur une donnée de l'énoncé.",
        "On répond avec l'unité : « $84$ °C », pas « $84$ ».",
      ],
      exercices: [
        {
          titre: "Les pâtes au sommet",
          enonce: "En montagne, l'eau ne bout pas à $100$ °C : sa température d'ébullition baisse d'environ $1$ °C tous les $300$ m. On la modélise par $T(h) = 100 - \\dfrac{h}{300}$, où $h$ est l'altitude en mètres.\na) Pourquoi $T$ est-elle une fonction affine ? Donner $a$ et $b$.\nb) À quelle température l'eau bout-elle au sommet du mont Blanc, à environ $4\\,800$ m ?\nc) À quelle altitude bout-elle à $90$ °C ?\nd) Au sommet de l'Everest, à $8\\,849$ m, un alpiniste fait cuire des pâtes. Pourquoi cuisent-elles mal ?",
          correction:
            "a) $T(h) = -\\dfrac{1}{300}h + 100$ : c'est la forme $ah + b$, avec $a = -\\dfrac{1}{300}$ et $b = 100$. Au niveau de la mer, $h = 0$, l'eau bout à $100$ °C.\nb) $T(4\\,800) = 100 - \\dfrac{4\\,800}{300} = 100 - 16 = 84$ °C.\nc) $100 - \\dfrac{h}{300} = 90$ donne $\\dfrac{h}{300} = 10$, donc $h = 3\\,000$ m.\nd) $T(8\\,849) = 100 - \\dfrac{8\\,849}{300} \\approx 70{,}5$ °C. L'eau bout, mais elle ne dépasse pas $70$ °C environ : trop peu pour bien cuire.\n⭐ En altitude, l'eau bout PLUS VITE, mais elle est MOINS chaude : c'est la pression de l'air, plus faible là-haut, qui abaisse son point d'ébullition.\n⛔ Le piège au a) : lire $a = 300$. On DIVISE par $300$ : le coefficient est $-\\dfrac{1}{300}$.",
          schema: tableau(["Altitude (m)", "0", "3 000", "4 800", "8 849"], ["T (°C)", 100, 90, 84, "70,5"], true),
          micros: ["affine_forme", "affine_calculer_image"],
        },
        {
          titre: "L'orage",
          enonce: "Le son se propage dans l'air à une vitesse qui dépend de la température : $v(T) = 0{,}6T + 331$, en m/s, où $T$ est la température en °C.\na) Calculer la vitesse du son à $0$ °C, puis à $20$ °C.\nb) À quelle température le son va-t-il à $340$ m/s ?\nc) Un soir d'orage, à $20$ °C, on entend le tonnerre $6$ secondes après l'éclair. À quelle distance la foudre est-elle tombée ?\nd) Que signifie le nombre $0{,}6$ ?",
          correction:
            "a) $v(0) = 331$ m/s et $v(20) = 0{,}6 \\times 20 + 331 = 12 + 331 = 343$ m/s.\nb) $0{,}6T + 331 = 340$ donne $0{,}6T = 9$, donc $T = 15$ °C.\nc) La lumière de l'éclair arrive presque aussitôt ; le son met $6$ s. Distance $=$ vitesse $\\times$ durée $= 343 \\times 6 = 2\\,058$ m : la foudre est tombée à environ $2$ km.\nd) C'est le coefficient directeur : chaque degré de plus, le son va $0{,}6$ m/s plus vite.\n⭐ La règle des randonneurs : compter les secondes et diviser par $3$ donne la distance en km. Ici, $6 \\div 3 = 2$ km. ✓",
          schema: tableau(["T (°C)", "0", "15", "20"], ["v (m/s)", 331, 340, 343], true),
          micros: ["affine_forme", "affine_calculer_image"],
        },
        {
          titre: "La facture d'électricité",
          enonce: "Une facture d'électricité est une fonction affine du nombre $x$ de kWh consommés dans le mois : $F(x) = ax + b$, où $b$ est l'abonnement mensuel. En janvier, $350$ kWh ont coûté $99{,}50$ € ; en mars, $250$ kWh ont coûté $74{,}50$ €.\na) Calculer le prix du kWh, $a$, puis l'abonnement, $b$.\nb) Quelle sera la facture d'un mois à $180$ kWh ?\nc) Un autre fournisseur propose $G(x) = 0{,}20x + 22$. Étudier le signe de $F(x) - G(x)$ : à partir de combien de kWh par mois est-il moins cher ?",
          correction:
            "a) $a = \\dfrac{99{,}50 - 74{,}50}{350 - 250} = \\dfrac{25}{100} = 0{,}25$ € par kWh. Puis $0{,}25 \\times 350 + b = 99{,}50$, soit $87{,}50 + b = 99{,}50$, donc $b = 12$ €.\nAinsi $F(x) = 0{,}25x + 12$.\nb) $F(180) = 45 + 12 = 57$ €.\nc) $F(x) - G(x) = 0{,}05x - 10$ : nulle en $x = 200$, négative avant, positive après.\nAu-delà de $200$ kWh par mois, $F(x) > G(x)$ : le second fournisseur est moins cher.\n⭐ Un abonnement plus cher peut être rattrapé par un kWh moins cher : c'est le cas des gros consommateurs, pas des petits.\n⛔ Le piège au a) : diviser $99{,}50$ par $350$. Ce serait oublier l'abonnement, qu'on paie même sans rien consommer.",
          schema: tableauSignes(["0", "200", "+∞"], [["$F(x) - G(x)$", ["-", "+"], ["0"]]]),
          micros: ["affine_determiner_expression", "affine_calculer_image", "affine_signe"],
        },
        {
          titre: "Les vélos en libre-service",
          enonce: "Dans une ville, deux offres de vélos en libre-service. Offre A : $1$ € au déblocage, puis $0{,}20$ € la minute. Offre B : $0{,}30$ € la minute, sans déblocage.\na) Exprimer le prix $A(t)$ et le prix $B(t)$ d'un trajet de $t$ minutes.\nb) Combien coûte un trajet de $25$ minutes avec chaque offre ?\nc) Résoudre $A(t) = B(t)$, et interpréter.\nd) Étudier le signe de $B(t) - A(t)$ : quelle offre choisir selon la durée du trajet ?",
          correction:
            "a) $A(t) = 0{,}20t + 1$ et $B(t) = 0{,}30t$. Deux fonctions affines ; $B$ est même linéaire.\nb) $A(25) = 5 + 1 = 6$ € et $B(25) = 7{,}50$ €.\nc) $0{,}20t + 1 = 0{,}30t$ donne $1 = 0{,}10t$, donc $t = 10$ : pour $10$ minutes, les deux offres coûtent $3$ €.\nd) $B(t) - A(t) = 0{,}10t - 1$ : nulle en $10$, de coefficient positif, donc négative avant $10$ et positive après.\nPour un trajet de moins de $10$ minutes, l'offre B est moins chère ; au-delà, c'est l'offre A. Sur le dessin, A en bleu, B en orange.\n⛔ Le piège au d) : choisir une offre une fois pour toutes. La bonne offre dépend de la durée du trajet.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["0", "10", "+∞"], [["$B(t) - A(t)$", ["-", "+"], ["0"]]], "t")}
              {repere([0, 16, -1, 6], [{ q: [0, 0.2, 1] }, { q: [0, 0.3, 0], couleur: ORANGE }], [{ x: 10, y: 3 }])}
            </div>
          ),
          micros: ["affine_calculer_image", "affine_signe"],
        },
      ],
    },
  ],
};
