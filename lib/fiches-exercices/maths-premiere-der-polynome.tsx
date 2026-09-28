// ─── Fiche d'exercices : dériver un polynôme (1re, sans spécialité) ───────────
//                              20 exercices corrigés
//
// Quatrième des six feuilles du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026), notion `der_polynome` du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/derivee-calcul.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : produit par un réel, somme, polynômes de degré 3 au plus,
// calcul de f′(a). PAS de produit ni de quotient de fonctions, PAS de
// discriminant. Le signe de f′ et les variations sont les deux notions
// suivantes (der-signe, der-variations) : ici on dérive, on remplace, on
// interprète.
//
// ⭐ Chaque dessin CONFIRME un calcul : la tangente tracée a la pente que la
// formule donne (3, 4, 5, 8, 11, 16), la courbe de l'épidémie montre le pic
// que N′(10) = 0 annonce (17).
// Physique : la chute libre (9), le four (15), la balle lancée vers le haut
// (20). Histoire-géo : le sentier (11), l'exode rural (14), la ville nouvelle
// (19). Économie : le coût marginal (10), les confitures (18). Nature : les
// cigognes (12). Sport : le lancer du poids (13), la rampe de skate (16).
// Santé : l'épidémie (17). Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-polynome.mjs`.
//
// Micro-compétences : der_derivee_produit_reel (1, 7, 9, 13, 16, 17, 18, 19,
// 20), der_derivee_somme (2, 6, 10, 18, 19, 20), der_derivee_degre2 (3, 6, 8,
// 10, 13, 14, 15, 20), der_derivee_degre3 (4, 7, 11, 12, 16, 17, 18, 19),
// der_calculer_nombre_derive (5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauSignes } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDerPolynomePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-polynome",
  titre: "Dériver un polynôme",
  accroche:
    "Vingt exercices pour dériver un polynôme de degré 2 ou 3 et calculer un nombre dérivé : un nombre qui multiplie, une somme, terme à terme. La chute libre, un four, un sentier de montagne, des cigognes, une épidémie, une ville nouvelle. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On dérive terme à terme, on écrit le résultat.",
      rappel: [
        "Un nombre qui multiplie reste devant : $(k \\times u)' = k \\times u'$. Par exemple, $(5x^2)' = 5 \\times 2x = 10x$.",
        "Une somme se dérive terme à terme : $(u + v)' = u' + v'$.",
        "Les formules de base : $k' = 0$ ; $x' = 1$ ; $(x^2)' = 2x$ ; $(x^3)' = 3x^2$.",
        "Pour $f'(a)$ : on écrit d'abord $f'(x)$, puis on remplace $x$ par $a$.",
      ],
      exercices: [
        {
          enonce: "Dériver : $f(x) = 5x^2$ ; $g(x) = -2x^3$ ; $h(x) = 0{,}5x^2$ ; $k(x) = -7x$.",
          correction:
            "Un nombre qui multiplie reste devant : $(k \\times u)' = k \\times u'$.\n$f'(x) = 5 \\times 2x = 10x$.\n$g'(x) = -2 \\times 3x^2 = -6x^2$.\n$h'(x) = 0{,}5 \\times 2x = x$.\n$k'(x) = -7 \\times 1 = -7$.\n⚠️ Le signe moins de $-2x^3$ se garde : $g'(x) = -6x^2$, pas $6x^2$.",
          schema: ecranSeulement(tableau(["f(x)", "5x²", "−2x³", "0,5x²", "−7x"], ["f′(x)", "10x", "−6x²", "x", "−7"])),
          micros: ["der_derivee_produit_reel"],
        },
        {
          enonce: "Dériver : $f(x) = x^2 + x^3$ ; $g(x) = x^3 - x + 4$.",
          correction:
            "Une somme se dérive terme à terme.\n$f'(x) = 2x + 3x^2$.\n$g'(x) = 3x^2 - 1 + 0 = 3x^2 - 1$.\n⚠️ $-x$ se dérive en $-1$, et le $4$ disparaît : il ne reste pas « $+ 4$ » dans la dérivée.",
          schema: ecranSeulement(tableau(["terme de g", "x³", "−x", "4"], ["sa dérivée", "3x²", "−1", "0"])),
          micros: ["der_derivee_somme"],
        },
        {
          enonce: "Dériver : $f(x) = 4x^2 - 3x + 8$ ; $g(x) = -x^2 + 6x - 5$ ; $h(x) = 0{,}5x^2 + 2x$.",
          correction:
            "On dérive terme à terme.\n$f'(x) = 4 \\times 2x - 3 = 8x - 3$.\n$g'(x) = -2x + 6$.\n$h'(x) = 0{,}5 \\times 2x + 2 = x + 2$.\n⚠️ Le terme constant ($8$, $-5$) disparaît ; le terme en $x$ ($-3x$, $6x$, $2x$) laisse son coefficient.\n⭐ Sur le dessin, la parabole de $g$ et sa tangente au point $(1 ; 0)$ : $g'(1) = -2 + 6 = 4$, elle monte bien de $4$ par pas.",
          schema: repere([-1, 6, -5, 5], [{ q: [-1, 6, -5] }, { q: [0, 4, -4], couleur: ORANGE }], [{ x: 1, y: 0, label: "" }]),
          micros: ["der_derivee_degre2"],
        },
        {
          enonce: "Dériver $f(x) = 2x^3 - 6x^2 + x - 4$.",
          correction:
            "On dérive terme à terme.\n$(2x^3)' = 2 \\times 3x^2 = 6x^2$.\n$(-6x^2)' = -6 \\times 2x = -12x$.\n$(x)' = 1$ et $(-4)' = 0$.\nDonc $f'(x) = 6x^2 - 12x + 1$.\n⭐ La dérivée d'un polynôme de degré $3$ est un polynôme de degré $2$ : chaque exposant baisse de $1$.\nSur le dessin : $f'(0) = 1$, et la tangente au point $(0 ; -4)$ monte bien de $1$ à chaque pas de $1$.",
          schema: repere([-1, 4, -10, 2], [{ p: [2, -6, 1, -4] }, { q: [0, 1, -4], couleur: ORANGE }], [{ x: 0, y: -4, label: "" }], undefined, true),
          micros: ["der_derivee_degre3"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 4x + 1$. Calculer $f'(2)$, $f'(0)$ et $f'(-1)$.",
          correction:
            "D'abord la dérivée : $f'(x) = 3x^2 - 4$.\nPuis on remplace $x$ : $f'(2) = 3 \\times 4 - 4 = 8$ ; $f'(0) = -4$ ; $f'(-1) = 3 \\times 1 - 4 = -1$.\nEn $0$ et en $-1$, le nombre dérivé est négatif : la courbe y descend. En $2$, elle monte fort.\n⛔ On remplace dans $f'$, pas dans $f$ : $f(2) = 8 - 8 + 1 = 1$, ce n'est pas la réponse.\n⚠️ $(-1)^2 = 1$ : $3 \\times (-1)^2 = 3$, et non $-3$.",
          schema: repere([-3, 3, -3, 5], [{ p: [1, 0, -4, 1] }, { q: [0, -4, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }]),
          micros: ["der_calculer_nombre_derive"],
        },
        {
          enonce: "Dériver $f(x) = 7 - 2x + 3x^2$.",
          correction:
            "Les termes ne sont pas rangés : ce n'est pas grave, on dérive chacun à sa place.\n$(7)' = 0$ ; $(-2x)' = -2$ ; $(3x^2)' = 3 \\times 2x = 6x$.\nDonc $f'(x) = -2 + 6x$, que l'on range : $f'(x) = 6x - 2$.\n⚠️ Le piège : croire que le premier terme est le « plus grand ». Ici, c'est $3x^2$ qui est de degré $2$, même s'il est écrit en dernier.",
          schema: ecranSeulement(tableau(["terme", "7", "−2x", "3x²"], ["sa dérivée", "0", "−2", "6x"])),
          micros: ["der_derivee_somme", "der_derivee_degre2"],
        },
        {
          enonce: "Dériver $g(x) = \\dfrac{1}{3}x^3 - 2x^2 + 5$.",
          correction:
            "$\\dfrac{1}{3}$ est un nombre qui multiplie : il reste devant.\n$\\left(\\dfrac{1}{3}x^3\\right)' = \\dfrac{1}{3} \\times 3x^2 = x^2$.\n$(-2x^2)' = -4x$ et $(5)' = 0$.\nDonc $g'(x) = x^2 - 4x$.\n⭐ Le $\\dfrac{1}{3}$ a été choisi pour « manger » le $3$ qui descend : c'est un classique des sujets.",
          schema: ecranSeulement(tableau(["terme", "(1/3)x³", "−2x²", "5"], ["sa dérivée", "x²", "−4x", "0"])),
          micros: ["der_derivee_produit_reel", "der_derivee_degre3"],
        },
        {
          enonce: "Soit $f(x) = -x^2 + 4x$. Calculer $f'(1)$, $f'(2)$ et $f'(3)$, puis vérifier sur le dessin, où les tangentes en $1$ et en $3$ sont tracées.",
          figure: repere([-1, 5, -2, 6], [{ q: [-1, 4, 0] }, { q: [0, 2, 1], couleur: ORANGE }, { q: [0, -2, 9], couleur: ORANGE }], [
            { x: 1, y: 3, label: "" },
            { x: 3, y: 3, label: "" },
          ]),
          correction:
            "$f'(x) = -2x + 4$.\n$f'(1) = -2 + 4 = 2$ ; $f'(2) = -4 + 4 = 0$ ; $f'(3) = -6 + 4 = -2$.\nSur le dessin : en $1$, la tangente monte de $2$ par pas ; en $3$, elle descend de $2$ ; en $2$, au sommet de la parabole, la tangente est horizontale.\n⭐ Le calcul et la lecture disent la même chose : c'est la meilleure des vérifications.",
          micros: ["der_calculer_nombre_derive", "der_derivee_degre2"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "On dérive, on calcule le nombre dérivé demandé, puis on dit ce qu'il signifie, avec son unité.",
      rappel: [
        "Dans un problème, $f'(a)$ est une VITESSE : l'unité de $f$ par unité de $x$ (mètres par seconde, couples par an, euros par objet).",
        "On remplace dans $f'$, jamais dans $f$ : $f(a)$ est une valeur, $f'(a)$ une vitesse.",
        "Un nombre dérivé négatif : la grandeur diminue. Nul : elle est à un sommet ou dans un creux.",
      ],
      exercices: [
        {
          titre: "La chute libre",
          enonce:
            "On lâche une balle du haut d'une tour. Sans frottement de l'air, la distance parcourue, en mètres, est $d(t) = 4{,}9t^2$, où $t$ est le temps en secondes.\na) Calculer $v(t) = d'(t)$, la vitesse de la balle.\nb) Calculer sa vitesse à $1$, $2$ et $3$ secondes.\nc) Convertir la vitesse à $2$ s en km/h.",
          correction:
            "a) $v(t) = 4{,}9 \\times 2t = 9{,}8t$.\nb) $v(1) = 9{,}8$ m/s ; $v(2) = 19{,}6$ m/s ; $v(3) = 29{,}4$ m/s. Chaque seconde, la vitesse augmente de $9{,}8$ m/s.\nc) $19{,}6 \\times 3{,}6 = 70{,}56$ : environ $70{,}6$ km/h.\n⭐ Ce $9{,}8$ est l'intensité de la pesanteur terrestre, en m/s² : c'est la dérivée de la vitesse.\n⚠️ À $2$ s, la balle a parcouru $d(2) = 19{,}6$ m et va à $19{,}6$ m/s : même nombre, mais pas la même grandeur ni la même unité.",
          schema: tableau(["t (s)", "1", "2", "3"], ["v(t) (m/s)", 9.8, 19.6, 29.4]),
          micros: ["der_derivee_produit_reel", "der_calculer_nombre_derive"],
        },
        {
          titre: "Le coût marginal",
          enonce:
            "Un artisan fabrique $q$ objets par semaine. Son coût, en euros, est $C(q) = 0{,}5q^2 + 10q + 200$.\na) Calculer $C'(q)$, puis $C'(20)$.\nb) Que signifie $C'(20)$ ?\nc) Calculer $C(21) - C(20)$ et comparer.",
          correction:
            "a) $C'(q) = 0{,}5 \\times 2q + 10 = q + 10$, donc $C'(20) = 30$.\nb) Quand l'artisan fabrique déjà $20$ objets, en fabriquer un de plus coûte environ $30$ € : c'est le coût marginal.\nc) $C(20) = 200 + 200 + 200 = 600$ et $C(21) = 220{,}5 + 210 + 200 = 630{,}5$, donc $C(21) - C(20) = 30{,}5$.\nLe coût du $21$ᵉ objet est $30{,}50$ € : le coût marginal en donne une très bonne valeur approchée.\n⚠️ Les $200$ € de frais fixes disparaissent à la dérivation : ils se paient quel que soit le nombre d'objets.\n⭐ Le tableau : d'une ligne à l'autre, le coût augmente de $30{,}5$ puis de $31{,}5$ € ; le coût marginal suit $q + 10$.",
          schema: ecranSeulement(tableau(["q (objets)", "20", "21", "22"], ["C(q) (€)", 600, 630.5, 662])),
          micros: ["der_derivee_somme", "der_derivee_degre2", "der_calculer_nombre_derive"],
        },
        {
          titre: "Le sentier de montagne",
          enonce:
            "L'altitude d'un sentier, en centaines de mètres, est $h(x) = -0{,}25x^3 + 1{,}5x^2 + 2$, où $x$ est la distance parcourue en kilomètres ($0 \\leqslant x \\leqslant 6$). Les tangentes en $A$ et en $S$ sont tracées.\na) Calculer $h'(x)$.\nb) Calculer $h'(2)$ et $h'(4)$, et vérifier sur les tangentes.\nc) Calculer $h'(5)$. La descente après le sommet est-elle plus raide que la montée en $A$ ?",
          figure: repere(
            [-1, 7, -1, 11],
            [{ p: [-0.25, 1.5, 0, 2] }, { q: [0, 3, 0], couleur: ORANGE }, { q: [0, 0, 10], couleur: ORANGE }],
            [
              { x: 2, y: 6, label: "A" },
              { x: 4, y: 10, label: "S" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) $h'(x) = -0{,}25 \\times 3x^2 + 1{,}5 \\times 2x = -0{,}75x^2 + 3x$.\nb) $h'(2) = -0{,}75 \\times 4 + 6 = 3$ : la tangente en $A$ monte bien de $3$ par pas. ✔️\n$h'(4) = -0{,}75 \\times 16 + 12 = 0$ : la tangente en $S$ est bien horizontale. ✔️\nc) $h'(5) = -0{,}75 \\times 25 + 15 = -3{,}75$.\nEn valeur absolue, $3{,}75 > 3$ : la descente au kilomètre $5$ est plus raide que la montée en $A$. Elle descend de $375$ m par kilomètre, une pente de $37{,}5$ %.\n⚠️ $-0{,}75 \\times 25 = -18{,}75$ : on calcule $x^2$ d'abord, puis on multiplie.",
          micros: ["der_derivee_degre3", "der_calculer_nombre_derive"],
        },
        {
          titre: "Le retour des cigognes",
          enonce:
            "Dans un modèle, le nombre de couples de cigognes d'une région est $N(t) = -0{,}5t^3 + 6t^2 + 40$, où $t$ est le nombre d'années depuis la création d'une réserve ($0 \\leqslant t \\leqslant 10$).\na) Calculer $N'(t)$.\nb) Calculer $N'(2)$, $N'(8)$ et $N'(10)$.\nc) Que racontent ces trois nombres ?",
          correction:
            "a) $N'(t) = -0{,}5 \\times 3t^2 + 6 \\times 2t = -1{,}5t^2 + 12t$.\nb) $N'(2) = -1{,}5 \\times 4 + 24 = 18$ ; $N'(8) = -1{,}5 \\times 64 + 96 = 0$ ; $N'(10) = -1{,}5 \\times 100 + 120 = -30$.\nc) La deuxième année, la population gagne environ $18$ couples par an.\nLa huitième année, elle ne varie plus : elle a atteint son maximum.\nLa dixième année, elle perd environ $30$ couples par an : la réserve est peut-être trop petite pour tous.\n⚠️ $N'(8) = 0$ ne veut pas dire qu'il n'y a plus de cigognes : $N(8) = -256 + 384 + 40 = 168$ couples.",
          schema: tableau(["t (années)", "2", "8", "10"], ["N′(t) (couples par an)", 18, 0, -30]),
          micros: ["der_derivee_degre3", "der_calculer_nombre_derive"],
        },
        {
          titre: "Le lancer du poids",
          enonce:
            "La hauteur d'un poids lancé par une athlète, en mètres, est $h(x) = -0{,}05x^2 + 0{,}75x + 2$, où $x$ est la distance horizontale parcourue, en mètres.\na) Calculer $h'(x)$.\nb) Calculer $h'(0)$ et $h'(10)$. Que disent leurs signes ?\nc) Pour quelle valeur de $x$ a-t-on $h'(x) = 0$ ? Que se passe-t-il en ce point ?",
          correction:
            "a) $h'(x) = -0{,}05 \\times 2x + 0{,}75 = -0{,}1x + 0{,}75$.\nb) $h'(0) = 0{,}75$ : au départ, la trajectoire monte, avec une pente de $0{,}75$.\n$h'(10) = -1 + 0{,}75 = -0{,}25$ : à $10$ m, le poids redescend.\nc) $-0{,}1x + 0{,}75 = 0$ donne $x = 7{,}5$ : à $7{,}5$ m, la trajectoire est horizontale. Le poids est au plus haut, à $h(7{,}5) = 4{,}8125$ m, soit environ $4{,}8$ m.\n⚠️ $x$ est une DISTANCE, pas un temps : $h'(x)$ est la pente de la trajectoire, pas une vitesse.\n⭐ Le tableau de signes de $h'(x)$ : la trajectoire monte jusqu'à $7{,}5$ m, puis redescend.",
          schema: ecranSeulement(tableauSignes(["0", "$7{,}5$", "15"], [["$h'(x)$", ["+", "-"], ["0"]]])),
          micros: ["der_derivee_produit_reel", "der_derivee_degre2", "der_calculer_nombre_derive"],
        },
        {
          titre: "Un canton pendant l'exode rural",
          enonce:
            "Dans un modèle, la population d'un canton rural, en milliers d'habitants, est $R(t) = 0{,}5t^2 - 6t + 20$, où $t$ est le nombre de décennies depuis 1900.\na) Calculer $R'(t)$.\nb) Calculer $R'(2)$, $R'(6)$ et $R'(8)$.\nc) Raconter l'histoire du canton en 1920, en 1960 et en 1980.",
          correction:
            "a) $R'(t) = 0{,}5 \\times 2t - 6 = t - 6$.\nb) $R'(2) = -4$ ; $R'(6) = 0$ ; $R'(8) = 2$.\nc) En 1920, le canton perd environ $4\\,000$ habitants par décennie : c'est l'exode rural, les jeunes partent vers les villes.\nEn 1960, la population ne varie plus : c'est le creux, avec $R(6) = 18 - 36 + 20 = 2$ milliers d'habitants.\nEn 1980, elle regagne environ $2\\,000$ habitants par décennie : des citadins s'installent à la campagne.\n⚠️ $R'(t)$ est en milliers d'habitants PAR DÉCENNIE : $R'(2) = -4$ ne veut pas dire « $4$ habitants par an ».",
          schema: ecranSeulement(tableau(["année", "1920", "1960", "1980"], ["R′(t) (milliers)", -4, 0, 2])),
          micros: ["der_derivee_degre2", "der_calculer_nombre_derive"],
        },
        {
          titre: "Le four qui chauffe",
          enonce:
            "On allume un four. Sa température, en °C, est $T(t) = -0{,}5t^2 + 20t + 20$, où $t$ est le temps en minutes ($0 \\leqslant t \\leqslant 20$).\na) Calculer $T'(t)$.\nb) Calculer $T'(0)$, $T'(10)$ et $T'(20)$. Que représentent ces nombres ?\nc) Quelle est la température du four au bout de $20$ minutes ?",
          correction:
            "a) $T'(t) = -0{,}5 \\times 2t + 20 = -t + 20$.\nb) $T'(0) = 20$ ; $T'(10) = 10$ ; $T'(20) = 0$.\nCe sont des vitesses de chauffe, en °C par minute : au départ, le four gagne $20$ °C par minute ; à $10$ min, $10$ °C par minute ; à $20$ min, il ne chauffe plus.\nc) $T(20) = -0{,}5 \\times 400 + 400 + 20 = 220$ °C : la température demandée est atteinte, le thermostat la maintient.\n⚠️ $T'(20) = 0$ ne veut pas dire que le four est froid : il est à $220$ °C, mais sa température ne CHANGE plus.",
          schema: ecranSeulement(tableau(["t (min)", "0", "10", "20"], ["T′(t) (°C/min)", 20, 10, 0])),
          micros: ["der_derivee_degre2", "der_calculer_nombre_derive"],
        },
        {
          titre: "La rampe de skate",
          enonce:
            "Le profil d'une rampe de skate, en mètres, est $h(x) = 0{,}5x^3 - 1{,}5x^2 + 2$, où $x$ est la distance horizontale en mètres. Le skateur part du point $D$.\na) Calculer $h'(x)$.\nb) Calculer $h'(0)$, $h'(1)$ et $h'(2)$, et les retrouver sur le dessin.\nc) Calculer $h'(3)$. Que fait la rampe après $B$ ?",
          figure: repere([-1, 4, -2, 5], [{ p: [0.5, -1.5, 0, 2] }, { q: [0, -1.5, 2.5], couleur: ORANGE }], [
            { x: 0, y: 2, label: "D" },
            { x: 1, y: 1, label: "A" },
            { x: 2, y: 0, label: "B" },
          ]),
          correction:
            "a) $h'(x) = 0{,}5 \\times 3x^2 - 1{,}5 \\times 2x = 1{,}5x^2 - 3x$.\nb) $h'(0) = 0$ : le skateur part à plat, en haut de la rampe, en $D$.\n$h'(1) = 1{,}5 - 3 = -1{,}5$ : en $A$, la rampe descend ; la tangente orange descend de $1{,}5$ par pas.\n$h'(2) = 6 - 6 = 0$ : en $B$, c'est le creux de la rampe, à plat, au niveau du sol.\nc) $h'(3) = 13{,}5 - 9 = 4{,}5$ : après $B$, la rampe remonte, et de plus en plus raide.\n⚠️ $1{,}5 \\times 2^2 = 6$, et non $1{,}5 \\times 2 \\times 2 \\times 2$ : le carré porte sur $x$, pas sur le coefficient.",
          micros: ["der_derivee_degre3", "der_derivee_produit_reel", "der_calculer_nombre_derive"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Le nombre dérivé y devient une vitesse.",
      rappel: [
        "Les questions s'enchaînent : $f'(x)$ d'abord, puis les nombres dérivés, puis leur sens.",
        "Une grandeur peut être grande et croître lentement : on ne confond pas $f(a)$ et $f'(a)$.",
        "On répond à la question posée, avec son unité : des malades par jour, des euros par millier de pots.",
      ],
      exercices: [
        {
          titre: "Une épidémie de grippe",
          enonce:
            "Pendant une épidémie de grippe, le nombre de malades dans une ville, $t$ jours après le premier cas, est modélisé par $N(t) = -t^3 + 15t^2 + 100$, pour $t$ entre $0$ et $14$. La courbe donne ce nombre en centaines.\na) Calculer $N'(t)$.\nb) Calculer $N'(2)$, $N'(5)$ et $N'(8)$. Que représentent ces nombres ?\nc) Calculer $N'(10)$. Que se passe-t-il le jour $10$ ? Lire le nombre de malades ce jour-là.\nd) Le jour $8$, il y a plus de malades que le jour $5$. L'épidémie progresse-t-elle plus vite pour autant ?",
          figure: repere([-1, 13, -1, 7], [{ p: [-0.01, 0.15, 0, 1] }], [{ x: 10, y: 6, label: "P" }], undefined, true),
          correction:
            "a) $N'(t) = -3t^2 + 15 \\times 2t = -3t^2 + 30t$.\nb) $N'(2) = -12 + 60 = 48$ ; $N'(5) = -75 + 150 = 75$ ; $N'(8) = -192 + 240 = 48$.\nCe sont des vitesses, en malades PAR JOUR : le jour $5$, l'épidémie gagne environ $75$ malades par jour.\nc) $N'(10) = -300 + 300 = 0$ : l'épidémie ne progresse plus. C'est le pic $P$, avec $600$ malades.\nd) Non : $N(8) = 548$ et $N(5) = 350$, mais $N'(8) = 48 < N'(5) = 75$. L'épidémie ralentit déjà, c'est le signe que le pic approche.\n⚠️ Au pic, $N'(10) = 0$ et pourtant il n'y a jamais eu autant de malades : la vitesse est nulle, pas le nombre.",
          micros: ["der_derivee_degre3", "der_calculer_nombre_derive", "der_derivee_produit_reel"],
        },
        {
          titre: "La coopérative de confitures",
          enonce:
            "Une coopérative fabrique $x$ milliers de pots de confiture par mois, avec $0 \\leqslant x \\leqslant 10$. Son bénéfice mensuel, en centaines d'euros, est $B(x) = -x^3 + 12x^2 - 21x - 10$.\na) Calculer $B'(x)$.\nb) Calculer $B'(1)$, $B'(4)$, $B'(7)$ et $B'(9)$.\nc) Quand la coopérative fabrique $4\\,000$ pots, que rapporte, environ, un millier de pots de plus ? Et quand elle en fabrique $9\\,000$ ?\nd) Vérifier la réponse c) en calculant $B(5) - B(4)$.",
          correction:
            "a) $B'(x) = -3x^2 + 12 \\times 2x - 21 = -3x^2 + 24x - 21$.\nb) $B'(1) = -3 + 24 - 21 = 0$ ; $B'(4) = -48 + 96 - 21 = 27$ ; $B'(7) = -147 + 168 - 21 = 0$ ; $B'(9) = -243 + 216 - 21 = -48$.\nc) À $4\\,000$ pots, un millier de plus rapporte environ $27$ centaines d'euros, soit $2\\,700$ €.\nÀ $9\\,000$ pots, un millier de plus fait PERDRE environ $4\\,800$ € : il faut payer des heures supplémentaires, et les pots se vendent mal.\nd) $B(4) = -64 + 192 - 84 - 10 = 34$ et $B(5) = -125 + 300 - 105 - 10 = 60$ : $B(5) - B(4) = 26$, tout près de $27$. ✔️\n⭐ $B'(1) = 0$ et $B'(7) = 0$ : ce sont les deux productions où le bénéfice cesse de baisser ou de monter. On les retrouvera dans la feuille des variations.",
          schema: tableau(["x (milliers)", "1", "4", "7", "9"], ["B′(x)", 0, 27, 0, -48]),
          micros: ["der_derivee_degre3", "der_calculer_nombre_derive", "der_derivee_produit_reel", "der_derivee_somme"],
        },
        {
          titre: "Une ville nouvelle",
          enonce:
            "À partir des années 1960, des villes nouvelles sont créées autour de Paris. Dans un modèle, la population de l'une d'elles, en dizaines de milliers d'habitants, est $P(t) = -0{,}1t^3 + 1{,}5t^2 + 2$, où $t$ est le nombre de décennies depuis 1960.\na) Calculer $P'(t)$.\nb) Calculer $P'(1)$, $P'(5)$ et $P'(10)$, et les traduire en habitants par décennie.\nc) Laquelle de ces trois décennies connaît la croissance la plus rapide ?\nd) Que prévoit le modèle pour 2060 ?",
          correction:
            "a) $P'(t) = -0{,}1 \\times 3t^2 + 1{,}5 \\times 2t = -0{,}3t^2 + 3t$.\nb) $P'(1) = -0{,}3 + 3 = 2{,}7$ : en 1970, la ville gagne environ $27\\,000$ habitants par décennie.\n$P'(5) = -0{,}3 \\times 25 + 15 = 7{,}5$ : en 2010, environ $75\\,000$ habitants par décennie.\n$P'(10) = -0{,}3 \\times 100 + 30 = 0$.\nc) C'est autour de 2010 ($t = 5$) que la ville grandit le plus vite parmi les trois.\nd) En 2060, $P'(10) = 0$ : la population ne grandirait plus. Elle serait de $P(10) = -100 + 150 + 2 = 52$ dizaines de milliers, soit $520\\,000$ habitants.\n⚠️ Ce n'est qu'un modèle : prévoir 2060 à partir de lui suppose que rien ne change.",
          schema: ecranSeulement(tableau(["année", "1970", "2010", "2060"], ["P′(t)", 2.7, 7.5, 0])),
          micros: ["der_derivee_degre3", "der_calculer_nombre_derive", "der_derivee_produit_reel", "der_derivee_somme"],
        },
        {
          titre: "La balle lancée vers le haut",
          enonce:
            "On lance une balle verticalement vers le haut, depuis une hauteur de $1{,}5$ m. Sa hauteur, en mètres, est $h(t) = -5t^2 + 20t + 1{,}5$, où $t$ est le temps en secondes.\na) Calculer $v(t) = h'(t)$, la vitesse de la balle.\nb) Calculer $v(0)$, $v(1)$, $v(2)$ et $v(3)$. Que signifie le signe de $v(t)$ ?\nc) À quel instant la balle est-elle au plus haut ? À quelle hauteur ?\nd) Calculer $v'(t)$. Que représente ce nombre en physique ?",
          correction:
            "a) $v(t) = -5 \\times 2t + 20 = -10t + 20$.\nb) $v(0) = 20$ m/s ; $v(1) = 10$ m/s ; $v(2) = 0$ ; $v(3) = -10$ m/s.\n$v(t) > 0$ : la balle monte. $v(t) < 0$ : elle redescend.\nc) Au plus haut, la balle s'arrête un instant : $v(2) = 0$. Elle y est à $h(2) = -20 + 40 + 1{,}5 = 21{,}5$ m.\nd) $v'(t) = -10$ : la vitesse perd $10$ m/s chaque seconde. C'est l'effet de la pesanteur, qui freine la montée puis accélère la chute.\n⚠️ À $t = 2$, la vitesse est nulle, mais la balle est à $21{,}5$ m : ne pas confondre la hauteur et la vitesse.",
          schema: tableau(["t (s)", "0", "1", "2", "3"], ["v(t) (m/s)", 20, 10, 0, -10]),
          micros: ["der_derivee_degre2", "der_calculer_nombre_derive", "der_derivee_produit_reel", "der_derivee_somme"],
        },
      ],
    },
  ],
};
