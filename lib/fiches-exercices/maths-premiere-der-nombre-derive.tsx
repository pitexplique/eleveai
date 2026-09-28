// ─── Fiche d'exercices : nombre dérivé et tangente (1re, sans spécialité) ─────
//                              20 exercices corrigés
//
// Deuxième des six feuilles du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026), notion `der_nombre_derive` du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/derivee-lecture.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : le nombre dérivé est le coefficient directeur de la
// tangente, et une VITESSE instantanée. Coefficient directeur par deux points,
// équation réduite y = mx + p trouvée avec le point de contact : oui. Équation
// de tangente par la formule y = f′(a)(x − a) + f(a) : NON, pas au programme.
// Aucune dérivée à calculer ici : les formules viennent dans der-formules.
//
// ⭐ Le dessin de la notion : l'ESCALIER du coefficient directeur (en vert) —
// on avance, on monte, on divise (1, 2, 16). Et la corde verte de la chute (11)
// : vitesse moyenne contre vitesse instantanée.
// Physique : la pierre qui tombe (11), le radiateur et sa puissance (16), le TGV
// (17). Histoire-géo : l'exode rural (9), le glacier (15), la température en
// altitude (19). Économie : recette et coût marginaux (7, 10, 12, 18).
// Écologie : le CO₂ (14), la cuve d'eau de pluie (20). Sport : le marathon (13).
// Les chiffres sont des MODÈLES arrondis, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-nombre-derive.mjs`.
//
// Micro-compétences : der_nombre_derive_sens (3, 4, 8, 9, 11, 13, 14, 15, 17,
// 18, 19, 20), der_tangente_coefficient (1, 2, 5, 6, 9, 10, 11, 12, 13, 15,
// 16, 17, 19, 20), der_modele_interpreter (7, 8, 10, 12, 14, 15, 16, 17, 18,
// 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé. Les courbes qu'on LIT restent imprimées (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDerNombreDerivePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-nombre-derive",
  titre: "Nombre dérivé et tangente",
  accroche:
    "Vingt exercices sur le nombre dérivé : coefficient directeur d'une tangente, équation réduite par deux points, vitesse instantanée, valeur approchée, coût marginal. Une pierre qui tombe, un TGV, un glacier, le CO₂, une cuve d'eau de pluie. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f'(a)$ est le coefficient directeur de la tangente au point d'abscisse $a$. Si elle passe par $A(x_A ; y_A)$ et $B(x_B ; y_B)$ : $f'(a) = \\dfrac{y_B - y_A}{x_B - x_A}$.",
        "L'équation réduite de la tangente s'écrit $y = mx + p$, avec $m = f'(a)$ ; on trouve $p$ grâce au point de contact.",
        "$f'(a)$ est aussi une VITESSE : près de $a$, quand $x$ augmente de $h$, $f(x)$ varie d'environ $f'(a) \\times h$.",
      ],
      exercices: [
        {
          enonce: "La tangente à la courbe de $f$ au point $A(0 ; 1)$ passe aussi par le point $B(2 ; 7)$. Calculer $f'(0)$.",
          correction:
            "$f'(0)$ est le coefficient directeur de la tangente $(AB)$ :\n$f'(0) = \\dfrac{7 - 1}{2 - 0} = \\dfrac{6}{2} = 3$.\nSur le dessin, l'escalier vert : on avance de $2$, on monte de $6$. Pour un pas de $1$, on monte donc de $3$.\n⚠️ En haut les ordonnées, en bas les abscisses, et DANS LE MÊME ORDRE : $B$ moins $A$ en haut comme en bas.",
          schema: repere([-1, 4, -1, 8], [{ q: [0, 3, 1], couleur: ORANGE }, { pts: [[0, 1], [2, 1], [2, 7]], couleur: VERT }], [
            { x: 0, y: 1, label: "A" },
            { x: 2, y: 7, label: "B" },
          ]),
          micros: ["der_tangente_coefficient"],
        },
        {
          enonce: "La tangente à la courbe de $g$ au point $A(1 ; 5)$ passe aussi par le point $B(4 ; -1)$.\na) Calculer $g'(1)$.\nb) Donner l'équation réduite de cette tangente.",
          correction:
            "a) $g'(1) = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = -2$.\nb) La tangente a une équation de la forme $y = -2x + p$. Elle passe par $A(1 ; 5)$ : $5 = -2 \\times 1 + p$, donc $p = 7$.\nC'est la droite $y = -2x + 7$. ✔️ Avec $B$ : $-2 \\times 4 + 7 = -1$.\n⚠️ $-1 - 5 = -6$ : on garde le signe moins. Sur l'escalier, on avance de $3$ et on DESCEND de $6$.",
          schema: repere([-1, 5, -2, 7], [{ q: [0, -2, 7], couleur: ORANGE }, { pts: [[1, 5], [4, 5], [4, -1]], couleur: VERT }], [
            { x: 1, y: 5, label: "A" },
            { x: 4, y: -1, label: "B" },
          ]),
          micros: ["der_tangente_coefficient"],
        },
        {
          enonce: "La distance parcourue par une cycliste, en kilomètres, est $d(t)$, où $t$ est le temps en heures. On sait que $d'(2) = 25$. Que signifie ce nombre ?",
          correction:
            "$d'(2)$ est une vitesse : l'unité de $d$ (le kilomètre) PAR unité de $t$ (l'heure).\n$d'(2) = 25$ signifie : au bout de $2$ heures, la cycliste roule à $25$ km/h. C'est ce qu'affiche son compteur à cet instant.\n⚠️ Ce n'est ni la distance parcourue, ni sa vitesse moyenne depuis le départ : c'est sa vitesse À CET INSTANT, dite instantanée.\n⭐ Le tableau : à $25$ km/h, en $6$ minutes ($0{,}1$ h), elle parcourt environ $25 \\times 0{,}1 = 2{,}5$ km.",
          schema: ecranSeulement(tableau(["temps", "2 h", "2 h 06", "2 h 12"], ["distance en plus (km)", 0, 2.5, 5])),
          micros: ["der_nombre_derive_sens"],
        },
        {
          enonce: "On sait que $f(3) = 10$ et $f'(3) = 4$. Donner une valeur approchée de $f(3{,}1)$, puis de $f(2{,}9)$.",
          correction:
            "Près de $3$, la courbe se confond presque avec sa tangente : quand $x$ varie de $h$, $f(x)$ varie d'environ $f'(3) \\times h$.\n$f(3{,}1) \\approx 10 + 4 \\times 0{,}1 = 10{,}4$.\nPour $2{,}9$, on RECULE de $0{,}1$ : $h = -0{,}1$, et $f(2{,}9) \\approx 10 + 4 \\times (-0{,}1) = 9{,}6$.\n⚠️ Ce sont des valeurs APPROCHÉES : on écrit $\\approx$, pas $=$.",
          schema: ecranSeulement(tableau(["x", "2,9", "3", "3,1"], ["f(x) environ", 9.6, 10, 10.4])),
          micros: ["der_nombre_derive_sens"],
        },
        {
          enonce: "La droite orange est la tangente à la courbe de $f$ au point $A$.\na) Lire les coordonnées de $A$ et de $B$.\nb) Calculer $f'(2)$.\nc) Donner l'équation réduite de la tangente.",
          figure: repere([-1, 4, -1, 6], [{ q: [1, -2, 2] }, { q: [0, 2, -2], couleur: ORANGE }], [
            { x: 2, y: 2, label: "A" },
            { x: 3, y: 4, label: "B" },
          ]),
          correction:
            "a) $A(2 ; 2)$ et $B(3 ; 4)$.\nb) $f'(2) = \\dfrac{4 - 2}{3 - 2} = 2$.\nc) $y = 2x + p$, et $A$ est sur la tangente : $2 = 2 \\times 2 + p$, donc $p = -2$. La tangente a pour équation $y = 2x - 2$.\n✔️ Avec $B$ : $2 \\times 3 - 2 = 4$.\n⭐ On choisit des points sur des NŒUDS du quadrillage : là, la lecture est exacte.",
          micros: ["der_tangente_coefficient"],
        },
        {
          enonce: "La tangente à la courbe de $f$ au point d'abscisse $4$ a pour équation $y = -0{,}5x + 3$. Que valent $f'(4)$ et $f(4)$ ?",
          correction:
            "Le coefficient directeur de la tangente est $-0{,}5$ : $f'(4) = -0{,}5$.\nLe point de contact est à la fois sur la courbe et sur la tangente : $f(4) = -0{,}5 \\times 4 + 3 = -2 + 3 = 1$.\n⚠️ $f'(4)$ n'est pas $3$ : $3$ est l'ordonnée à l'origine de la tangente, pas sa pente.",
          schema: ecranSeulement(
            repere([-1, 8, -1, 8], [{ q: [0.25, -2.5, 7] }, { q: [0, -0.5, 3], couleur: ORANGE }], [{ x: 4, y: 1, label: "" }]),
          ),
          micros: ["der_tangente_coefficient"],
        },
        {
          enonce: "Une boulangerie fabrique $q$ baguettes par jour, pour un coût total de $C(q)$ euros. On a $C'(200) = 0{,}3$. Que signifie ce nombre ?",
          correction:
            "$C'(200)$ est en euros PAR baguette.\nQuand on fabrique déjà $200$ baguettes, en fabriquer une de plus coûte environ $0{,}30$ €. C'est le COÛT MARGINAL.\n⚠️ Ce n'est ni le coût total, ni le coût moyen d'une baguette : c'est le coût de la baguette SUPPLÉMENTAIRE.\n⭐ Le tableau : $10$ baguettes de plus coûtent environ $10 \\times 0{,}3 = 3$ €.",
          schema: ecranSeulement(tableau(["baguettes", "200", "201", "210"], ["coût en plus (€)", 0, 0.3, 3])),
          micros: ["der_modele_interpreter"],
        },
        {
          enonce: "La masse d'un bébé, en kilogrammes, est $m(t)$, où $t$ est son âge en semaines. On sait que $m(6) = 5$ et $m'(6) = 0{,}2$.\na) Que signifie $m'(6)$ ?\nb) Estimer sa masse à $7$ semaines.",
          correction:
            "a) $m'(6)$ est en kg PAR semaine : à $6$ semaines, le bébé prend environ $0{,}2$ kg, soit $200$ g, par semaine.\nb) Une semaine plus tard : $m(7) \\approx 5 + 0{,}2 \\times 1 = 5{,}2$ kg.\n⚠️ $m'(6)$ n'est pas une masse : $0{,}2$ kg, c'est ce que le bébé GAGNE par semaine, pas ce qu'il pèse.",
          schema: ecranSeulement(tableau(["âge (semaines)", "6", "7", "8"], ["masse environ (kg)", 5, 5.2, 5.4])),
          micros: ["der_nombre_derive_sens", "der_modele_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On répond avec les unités.",
      rappel: [
        "L'unité de $f'(a)$ : l'unité de $f$ PAR unité de $x$ (kilomètres par heure, habitants par an, euros par objet).",
        "En économie, $C'(q)$ est le COÛT MARGINAL : le coût, à peu près, d'une unité de plus. De même, $R'(q)$ est la recette marginale.",
        "Approximation : $f(a + h) \\approx f(a) + f'(a) \\times h$, d'autant meilleure que $h$ est petit.",
      ],
      exercices: [
        {
          titre: "Un village pendant l'exode rural",
          enonce:
            "Pendant l'exode rural, les campagnes françaises se vident au profit des villes. La population d'un village de montagne, en centaines d'habitants, est $P(t)$, où $t$ est le nombre de décennies écoulées depuis 1940. On sait que $P(2) = 5$ et $P'(2) = -3$.\na) En quelle année est-on quand $t = 2$ ? Combien le village a-t-il d'habitants ?\nb) Que vaut le coefficient directeur de la tangente au point d'abscisse $2$ ? La population augmente-t-elle ou diminue-t-elle ?\nc) Entre $t = 2$ et $t = 2{,}1$, c'est-à-dire en un an, de combien d'habitants environ la population varie-t-elle ?",
          correction:
            "a) $t = 2$ : deux décennies après 1940, soit en 1960. $P(2) = 5$ centaines : le village a $500$ habitants.\nb) Le coefficient directeur de la tangente, c'est le nombre dérivé : $-3$. Il est négatif : la population DIMINUE.\nc) Près de $2$, la courbe se confond presque avec sa tangente : quand $t$ augmente de $0{,}1$, $P(t)$ varie d'environ $-3 \\times 0{,}1 = -0{,}3$ centaine.\nLe village perd donc environ $30$ habitants en un an : ils partent pour la ville.\n⭐ C'est le sens du nombre dérivé : une VITESSE. $P'(2) = -3$ se lit « moins $300$ habitants par décennie », au rythme de 1960.\n⚠️ Ce n'est qu'une approximation : plus on s'éloigne de 1960, moins la tangente colle à la courbe.",
          schema: ecranSeulement(repere([-1, 5, -1, 8], [{ q: [0, -3, 11], couleur: ORANGE }], [{ x: 2, y: 5, label: "1960" }])),
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient"],
        },
        {
          titre: "La recette d'une entreprise",
          enonce:
            "Une entreprise vend $x$ centaines de sacs à dos. Sa recette, en milliers d'euros, est $R(x)$. Sur la courbe de $R$, la tangente au point $A(1 ; 3)$ passe aussi par le point $B(3 ; 7)$.\na) Calculer $R'(1)$.\nb) Donner l'équation réduite de cette tangente.\nc) Les économistes appellent $R'(1)$ la « recette marginale ». Que rapporte, à peu près, une centaine de sacs de plus quand on en vend déjà cent ?",
          figure: repere([-1, 4, -1, 8], [{ q: [0, 2, 1], couleur: ORANGE }], [
            { x: 1, y: 3, label: "A" },
            { x: 3, y: 7, label: "B" },
          ]),
          correction:
            "a) $R'(1)$ est le coefficient directeur de la tangente, qui passe par $A$ et $B$ :\n$R'(1) = \\dfrac{7 - 3}{3 - 1} = \\dfrac{4}{2} = 2$.\nb) La tangente a une équation de la forme $y = 2x + p$. Elle passe par $A(1 ; 3)$ : $3 = 2 \\times 1 + p$, donc $p = 1$.\nC'est la droite $y = 2x + 1$. ✔️ Avec $B$ : $2 \\times 3 + 1 = 7$.\nc) $R'(1) = 2$ milliers d'euros par centaine de sacs : une centaine de sacs de plus rapporte environ $2\\,000$ euros, soit $20$ euros par sac.\n⚠️ Dans le quotient, les ordonnées en haut, les abscisses en bas, DANS LE MÊME ORDRE : $\\dfrac{7 - 3}{3 - 1}$, pas $\\dfrac{7 - 3}{1 - 3}$.",
          micros: ["der_tangente_coefficient", "der_modele_interpreter"],
        },
        {
          titre: "Une pierre qui tombe",
          enonce:
            "On lâche une pierre du haut d'une falaise. La distance parcourue, en dizaines de mètres, est $d(t)$, où $t$ est le temps en secondes. Sur le dessin : la courbe de $d$, la tangente en $A$ (orange) et la corde qui joint l'origine à $A$ (verte).\na) Calculer $d'(2)$ avec les points $A$ et $B$ : c'est la vitesse INSTANTANÉE de la pierre à $2$ s. La donner en m/s, puis en km/h.\nb) Calculer le coefficient directeur de la corde verte : c'est la vitesse MOYENNE entre $0$ et $2$ s. Comparer.",
          figure: repere([-1, 4, -1, 6], [{ q: [0.5, 0, 0] }, { q: [0, 2, -2], couleur: ORANGE }, { pts: [[0, 0], [2, 2]], couleur: VERT }], [
            { x: 2, y: 2, label: "A" },
            { x: 3, y: 4, label: "B" },
          ]),
          correction:
            "a) $A(2 ; 2)$ et $B(3 ; 4)$ : $d'(2) = \\dfrac{4 - 2}{3 - 2} = 2$ dizaines de mètres par seconde, soit $20$ m/s.\nEn km/h : $20 \\times 3{,}6 = 72$ km/h.\nb) La corde va de $(0 ; 0)$ à $A(2 ; 2)$ : son coefficient directeur vaut $\\dfrac{2 - 0}{2 - 0} = 1$ dizaine de mètres par seconde, soit $10$ m/s.\nÀ $2$ s, la pierre va DEUX fois plus vite que sa vitesse moyenne depuis le départ : elle accélère.\n⭐ Vitesse moyenne : la pente de la corde. Vitesse instantanée : la pente de la tangente.\n⚠️ La pierre a parcouru $20$ m en $2$ s, mais elle ne va pas à $10$ m/s à l'instant $2$ : elle va déjà à $20$ m/s.",
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient"],
        },
        {
          titre: "Le coût marginal",
          enonce:
            "Un fabricant produit $q$ centaines de vélos. Son coût, en milliers d'euros, est $C(q)$. La tangente à la courbe de $C$ en $A$ passe par $B$.\na) Calculer $C'(2)$.\nb) Quand on fabrique déjà $200$ vélos, combien coûte, à peu près, une centaine de vélos de plus ? Et un vélo ?\nc) En réalité, $C(3) = 9{,}5$. Calculer $C(3) - C(2)$ et comparer avec la réponse b).",
          figure: repere(
            [-1, 5, -1, 11],
            [{ q: [0.5, 1, 2] }, { q: [0, 3, 0], couleur: ORANGE }],
            [
              { x: 2, y: 6, label: "A" },
              { x: 3, y: 9, label: "B" },
              { x: 3, y: 9.5, label: "" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) $A(2 ; 6)$ et $B(3 ; 9)$ : $C'(2) = \\dfrac{9 - 6}{3 - 2} = 3$.\nb) $C'(2) = 3$ milliers d'euros par centaine de vélos : une centaine de plus coûte environ $3\\,000$ €, soit $30$ € par vélo.\nc) $C(3) - C(2) = 9{,}5 - 6 = 3{,}5$ : la centaine supplémentaire coûte en réalité $3\\,500$ €.\nLe coût marginal en est une APPROXIMATION : sur le dessin, en $x = 3$, la courbe passe un peu au-dessus de sa tangente.\n⭐ Plus l'écart est petit, meilleure est l'approximation : pour un seul vélo de plus, elle est excellente.",
          micros: ["der_modele_interpreter", "der_tangente_coefficient"],
        },
        {
          titre: "Le marathonien",
          enonce:
            "La distance parcourue par un marathonien, en km, est $d(t)$, où $t$ est le temps en heures. On sait que $d(1) = 12$ et $d'(1) = 12$.\na) Que signifie $d'(1)$ ?\nb) Estimer la distance parcourue au bout d'$1$ h $15$ min.\nc) Donner l'équation réduite de la tangente au point $(1 ; 12)$. Que remarque-t-on ?",
          correction:
            "a) $d'(1) = 12$ km/h : au bout d'une heure, le coureur court à $12$ km/h.\nb) $1$ h $15$ min $= 1{,}25$ h : on avance de $0{,}25$.\n$d(1{,}25) \\approx 12 + 12 \\times 0{,}25 = 15$ km.\nc) La tangente a pour équation $y = 12t + p$ et passe par $(1 ; 12)$ : $12 = 12 \\times 1 + p$, donc $p = 0$.\nC'est la droite $y = 12t$ : elle passe par l'ORIGINE. C'est la course d'un coureur qui aurait tenu $12$ km/h depuis le départ.\n⚠️ $1$ h $15$ min ne fait pas $1{,}15$ h : un quart d'heure, c'est $0{,}25$ h.",
          schema: ecranSeulement(tableau(["t (h)", "1", "1,25", "1,5"], ["d(t) environ (km)", 12, 15, 18])),
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient"],
        },
        {
          titre: "Le CO₂ de l'atmosphère",
          enonce:
            "Dans un modèle arrondi, la concentration de CO₂ dans l'air est $C(t)$ ppm (parties par million), où $t$ est l'année. On prend $C(2020) = 415$ et $C'(2020) = 2{,}5$.\na) Quelle est l'unité de $C'(2020)$ ? Que signifie ce nombre ?\nb) Estimer $C(2024)$.\nc) Un article affirme : « en 2020, la concentration augmente de $2{,}5$ % par an ». Qu'en penser ?",
          correction:
            "a) $C'(2020)$ est en ppm PAR AN : en 2020, la concentration augmente d'environ $2{,}5$ ppm chaque année.\nb) Quatre ans plus tard : $C(2024) \\approx 415 + 2{,}5 \\times 4 = 425$ ppm.\nc) L'article confond deux choses : $2{,}5$ ppm n'est pas $2{,}5$ %.\nEn pourcentage : $\\dfrac{2{,}5}{415} \\approx 0{,}006$, soit environ $0{,}6$ % par an.\n⚠️ Le nombre dérivé a l'unité de la grandeur (des ppm) par unité de temps : ce n'est pas un pourcentage.",
          schema: ecranSeulement(tableau(["année", "2020", "2022", "2024"], ["C environ (ppm)", 415, 420, 425])),
          micros: ["der_modele_interpreter", "der_nombre_derive_sens"],
        },
        {
          titre: "Le recul d'un glacier",
          enonce:
            "Dans un modèle, la longueur d'un glacier des Alpes, en centaines de mètres, est $L(t)$, où $t$ est le nombre de décennies depuis 1950.\na) La tangente en $A$ passe par $(3 ; 6)$, celle en $B$ par $(5 ; 2)$. Calculer $L'(2)$ et $L'(4)$.\nb) Traduire ces deux nombres en mètres par an.\nc) Que dire du recul du glacier entre 1970 et 1990 ?",
          figure: repere([-1, 6, -1, 9], [{ q: [-0.25, 0, 8] }, { q: [0, -1, 9], couleur: ORANGE }, { q: [0, -2, 12], couleur: ORANGE }], [
            { x: 2, y: 7, label: "A" },
            { x: 4, y: 4, label: "B" },
          ]),
          correction:
            "a) $L'(2) = \\dfrac{6 - 7}{3 - 2} = -1$ et $L'(4) = \\dfrac{2 - 4}{5 - 4} = -2$.\nb) $L'(2) = -1$ centaine de mètres par décennie : en 1970, le glacier recule de $100$ m en dix ans, soit $10$ m par an.\n$L'(4) = -2$ : en 1990, il recule de $200$ m par décennie, soit $20$ m par an.\nc) Le recul s'ACCÉLÈRE : en vingt ans, sa vitesse a doublé.\n⚠️ Les deux nombres dérivés sont négatifs : le glacier RACCOURCIT. Plus le nombre est négatif, plus il recule vite.",
          micros: ["der_tangente_coefficient", "der_nombre_derive_sens", "der_modele_interpreter"],
        },
        {
          titre: "La puissance d'un radiateur",
          enonce:
            "L'énergie consommée par un radiateur électrique, en kWh, est $E(t)$ au bout de $t$ heures. La tangente à la courbe de $E$ au point $A(2 ; 3)$ passe par $B(4 ; 6)$.\na) Calculer $E'(2)$. En physique, $E'(t)$ est la PUISSANCE du radiateur, en kilowatts (kW).\nb) Dans ce modèle, le kWh coûte $0{,}20$ €. Combien coûte, environ, une heure de chauffage de plus à ce moment-là ?",
          correction:
            "a) $E'(2) = \\dfrac{6 - 3}{4 - 2} = \\dfrac{3}{2} = 1{,}5$.\n$E'(2)$ est en kWh PAR heure, c'est-à-dire en kilowatts : à cet instant, la puissance du radiateur est $1{,}5$ kW.\nb) En une heure, il consomme environ $1{,}5$ kWh, qui coûtent $1{,}5 \\times 0{,}20 = 0{,}30$ €.\n⭐ La puissance est la vitesse à laquelle l'énergie est consommée : c'est le nombre dérivé de l'énergie.\n⚠️ Le kW mesure une puissance, le kWh une énergie : ce sont deux grandeurs différentes.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 8], [{ q: [0, 1.5, 0], couleur: ORANGE }, { pts: [[2, 3], [4, 3], [4, 6]], couleur: VERT }], [
              { x: 2, y: 3, label: "A" },
              { x: 4, y: 6, label: "B" },
            ]),
          ),
          micros: ["der_modele_interpreter", "der_tangente_coefficient"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Le nombre dérivé y devient une vitesse.",
      rappel: [
        "Vitesse MOYENNE entre deux instants : le coefficient directeur de la corde. Vitesse INSTANTANÉE : celui de la tangente.",
        "Une tangente prolonge la vitesse d'un instant : elle prévoit bien tout près du point de contact, mal au loin.",
        "On répond avec l'unité, et on écrit $\\approx$ quand la valeur est approchée.",
      ],
      exercices: [
        {
          titre: "Le départ d'un TGV",
          enonce:
            "Un TGV quitte une gare. La distance parcourue, en km, est $x(t)$, où $t$ est le temps en minutes. Les tangentes en $A$ et en $B$ sont tracées.\na) Lire $x'(2)$ et $x'(4)$, en km par minute, puis les convertir en km/h.\nb) Calculer la vitesse moyenne du train entre $t = 0$ et $t = 4$. La comparer à $x'(2)$.\nc) Donner l'équation réduite de la tangente en $B$.\nd) En déduire une valeur approchée de la distance parcourue à $t = 4{,}5$.",
          figure: repere(
            [-1, 7, -1, 10],
            [{ q: [0.25, 0, 0] }, { q: [0, 1, -1], couleur: ORANGE }, { q: [0, 2, -4], couleur: ORANGE }],
            [
              { x: 2, y: 1, label: "A" },
              { x: 4, y: 4, label: "B" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) En $A(2 ; 1)$, la tangente passe par $(3 ; 2)$ : $x'(2) = 1$ km par minute. En une heure : $1 \\times 60 = 60$ km/h.\nEn $B(4 ; 4)$, elle passe par $(5 ; 6)$ : $x'(4) = 2$ km par minute, soit $2 \\times 60 = 120$ km/h.\nb) Entre $0$ et $4$ min, le train parcourt $4$ km : sa vitesse moyenne est $\\dfrac{4}{4} = 1$ km par minute, soit $60$ km/h.\nC'est exactement $x'(2)$ : ici, la vitesse moyenne sur $[0 ; 4]$ est la vitesse instantanée au milieu.\nc) $y = 2t + p$ passe par $B(4 ; 4)$ : $4 = 2 \\times 4 + p$, donc $p = -4$. La tangente a pour équation $y = 2t - 4$.\nd) Près de $4$, la courbe colle à sa tangente : $x(4{,}5) \\approx 2 \\times 4{,}5 - 4 = 5$ km.\n⚠️ La vitesse moyenne ($60$ km/h) cache l'accélération : à $t = 4$, le train roule déjà deux fois plus vite.\n⭐ Pour passer des km par minute aux km/h, on multiplie par $60$.",
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient", "der_modele_interpreter"],
        },
        {
          titre: "L'atelier de vélos",
          enonce:
            "Un atelier fabrique et vend $q$ vélos par mois. Chaque vélo est vendu $500$ € : la recette marginale vaut $R'(q) = 500$ euros. Le coût marginal est $C'(q) = 4q + 400$ euros.\na) Calculer $C'(20)$ et $C'(40)$. Que signifient ces nombres ?\nb) Pour $q = 20$, puis pour $q = 40$, fabriquer un vélo de plus fait-il gagner ou perdre de l'argent ? Combien, environ ?\nc) Pour quelle production le coût marginal est-il égal à la recette marginale ? Les économistes disent que le bénéfice y est maximal.",
          correction:
            "a) $C'(20) = 4 \\times 20 + 400 = 480$ et $C'(40) = 4 \\times 40 + 400 = 560$.\nQuand l'atelier fabrique $20$ vélos, un vélo de plus coûte environ $480$ € ; à $40$ vélos, environ $560$ €.\nb) À $20$ vélos : le vélo de plus rapporte $500$ € et coûte environ $480$ € : on GAGNE environ $500 - 480 = 20$ €.\nÀ $40$ vélos : il rapporte $500$ € et coûte environ $560$ € : $500 - 560 = -60$, on PERD environ $60$ €.\nc) $4q + 400 = 500$ donne $4q = 100$, donc $q = 25$.\nÀ $25$ vélos par mois, le vélo suivant ne rapporte plus rien : c'est la production qui rend le bénéfice maximal.\n⚠️ Le coût marginal AUGMENTE avec la production (heures supplémentaires, machines usées) : c'est lui qui finit par manger le gain.\n⭐ Le tableau le résume : le gain d'un vélo de plus passe de positif à négatif, et il s'annule à $25$.",
          schema: tableau(["vélos par mois", "20", "25", "40"], ["gain d'un vélo de plus (€)", 20, 0, -60]),
          micros: ["der_modele_interpreter", "der_nombre_derive_sens"],
        },
        {
          titre: "La température en montagne",
          enonce:
            "En montagne, la température baisse quand on monte. Un ballon-sonde mesure la température $T(z)$, en °C, à l'altitude $z$, en km. La tangente à la courbe de $T$ au point $A(2 ; 7)$ passe par $B(4 ; -6)$.\na) Calculer $T'(2)$. Quelle est son unité ?\nb) Donner l'équation réduite de cette tangente.\nc) En déduire une estimation de la température à $2{,}4$ km d'altitude.\nd) Les météorologues retiennent une baisse moyenne d'environ $6{,}5$ °C par kilomètre d'altitude. La mesure est-elle cohérente ?",
          correction:
            "a) $T'(2) = \\dfrac{-6 - 7}{4 - 2} = \\dfrac{-13}{2} = -6{,}5$ °C par km.\nÀ $2$ km d'altitude, la température baisse d'environ $6{,}5$ °C par kilomètre de montée.\nb) $y = -6{,}5z + p$ passe par $A(2 ; 7)$ : $7 = -6{,}5 \\times 2 + p$, soit $7 = -13 + p$, donc $p = 20$.\nLa tangente a pour équation $y = -6{,}5z + 20$.\nc) $T(2{,}4) \\approx -6{,}5 \\times 2{,}4 + 20 = 4{,}4$ °C.\nd) Oui : $-6{,}5$ °C par km, c'est exactement la baisse moyenne retenue.\n⚠️ $-6 - 7 = -13$, pas $-1$ : les deux ordonnées sont de part et d'autre de $0$.\n⭐ C'est pourquoi il peut neiger au sommet quand il pleut dans la vallée.\n⭐ Sur le dessin, l'escalier vert : on avance de $2$ km, on DESCEND de $13$ °C.",
          schema: ecranSeulement(
            repere(
              [-1, 5, -7, 8],
              [{ q: [0, -6.5, 20], couleur: ORANGE }, { pts: [[2, 7], [4, 7], [4, -6]], couleur: VERT }],
              [
                { x: 2, y: 7, label: "A" },
                { x: 4, y: -6, label: "B" },
              ],
              undefined,
              true,
            ),
          ),
          micros: ["der_tangente_coefficient", "der_nombre_derive_sens", "der_modele_interpreter"],
        },
        {
          titre: "La cuve d'eau de pluie",
          enonce:
            "Une cuve récupère l'eau de pluie pour arroser un jardin. On ouvre le robinet : le volume d'eau restant, en hectolitres ($1$ hL $= 100$ L), est $V(t)$, où $t$ est le temps en minutes. Les tangentes en $A$ et en $B$ sont tracées.\na) Lire $V'(2)$ et $V'(4)$. Les traduire en litres par minute.\nb) Pourquoi ces nombres sont-ils négatifs ? Que devient le débit ?\nc) Un jardinier raisonne ainsi : « à $t = 2$, il reste $400$ L, et l'eau s'écoule à $200$ L par minute ; la cuve sera donc vide à $t = 4$ ». Où lit-on son raisonnement sur le dessin ? Pourquoi a-t-il tort ?",
          figure: repere(
            [-1, 7, -1, 10],
            [{ q: [0.25, -3, 9] }, { q: [0, -2, 8], couleur: ORANGE }, { q: [0, -1, 5], couleur: ORANGE }],
            [
              { x: 2, y: 4, label: "A" },
              { x: 4, y: 1, label: "B" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) En $A(2 ; 4)$, la tangente passe par $(3 ; 2)$ : $V'(2) = -2$ hL par minute, soit $-200$ L par minute.\nEn $B(4 ; 1)$, elle passe par $(5 ; 0)$ : $V'(4) = -1$ hL par minute, soit $-100$ L par minute.\nb) Ils sont négatifs parce que la cuve se VIDE : le volume diminue.\nLe débit, lui, baisse : $200$ L par minute à $t = 2$, puis $100$ L par minute à $t = 4$. Moins il reste d'eau, moins elle pousse.\nc) Le jardinier suit la TANGENTE en $A$ : elle coupe l'axe des abscisses en $t = 4$.\nMais la courbe s'aplatit : l'eau coule de moins en moins vite, et la cuve n'est vide qu'à $t = 6$.\n⚠️ Une tangente prolonge la vitesse d'un instant : elle ne prévoit bien que tout près du point de contact.",
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient", "der_modele_interpreter"],
        },
      ],
    },
  ],
};
