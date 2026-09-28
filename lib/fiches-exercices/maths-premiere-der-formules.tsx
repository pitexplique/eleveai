// ─── Fiche d'exercices : les formules de base de la dérivée (1re, sans spé) ───
//                              20 exercices corrigés
//
// Troisième des six feuilles du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026), notion `der_formules` du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/derivee-calcul.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : dérivées de la constante, de l'identité (et d'une fonction
// affine, sa pente), du carré et du cube. RIEN d'autre ici : ni 5x² ni x² + x³
// — le produit par un réel et la somme sont la notion suivante (der-polynome).
// Pas de produit, pas de quotient, pas de racine carrée.
//
// ⭐ Les dessins montrent POURQUOI : une droite a la même pente partout, la
// parabole a la pente 2a en a, le cube a deux tangentes parallèles en −1 et 1.
// Physique : le train (9), la plaque qui se dilate (11), les billes de Galilée
// (17), le cycliste et le scooter (18). Histoire-géo : la route du plateau (14),
// les sécantes de Fermat, Newton et Leibniz (19). Économie : les abonnements
// (10), le taxi (15), l'enclos (20). Écologie et nature : le glaçon (12),
// l'algue invasive (16), les moutons (20). Sport : la skieuse (13).
// Les chiffres sont des MODÈLES arrondis, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-formules.mjs`.
//
// Micro-compétences : der_derivee_constante (1, 5, 10, 14, 15, 20),
// der_derivee_identite (2, 5, 7, 9, 10, 14, 15, 18, 20), der_derivee_carre_cube
// (3, 4, 5, 6, 8, 11, 12, 13, 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDerFormulesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-formules",
  titre: "Les formules de base de la dérivée",
  accroche:
    "Vingt exercices sur les quatre formules de départ : la constante, l'identité et les fonctions affines, le carré, le cube. Un train, un abonnement, un glaçon qui fond, les billes de Galilée, un enclos de moutons. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice. On dérive, puis on remplace si on le demande.",
      rappel: [
        "Une constante : $k' = 0$. L'identité : $x' = 1$. Une fonction affine : $(mx + p)' = m$, sa pente.",
        "Le carré : $(x^2)' = 2x$. Le cube : $(x^3)' = 3x^2$. L'exposant descend devant, puis il baisse de $1$.",
        "Pour un nombre dérivé, on dérive d'abord, puis on remplace $x$ : la dérivée de $x^2$ en $3$ vaut $2 \\times 3 = 6$.",
      ],
      exercices: [
        {
          enonce: "Dériver chacune de ces fonctions : $f(x) = 2$ ; $g(x) = -2$ ; $h(x) = \\sqrt{2}$ ; $k(x) = 0$.",
          correction:
            "Une fonction constante ne varie pas : sa courbe est une droite horizontale, de pente nulle.\nDonc $f'(x) = 0$, $g'(x) = 0$, $h'(x) = 0$ et $k'(x) = 0$.\n⚠️ $\\sqrt{2}$ est un NOMBRE, pas une expression en $x$ : sa dérivée est $0$.\n⚠️ La dérivée de $-2$ n'est pas $-2$ : c'est $0$.\n⭐ Sur le dessin, les courbes de $f$ et de $g$ : deux droites horizontales.",
          schema: ecranSeulement(repere([-3, 3, -3, 4], [{ q: [0, 0, 2] }, { q: [0, 0, -2], couleur: ORANGE }])),
          micros: ["der_derivee_constante"],
        },
        {
          enonce: "Dériver : $f(x) = x$ ; $g(x) = 4x - 1$ ; $h(x) = -x + 5$ ; $k(x) = 0{,}5x$.",
          correction:
            "Une fonction affine $mx + p$ a pour dérivée $m$ : son coefficient directeur, sa pente.\n$f'(x) = 1$.\n$g'(x) = 4$.\n$h'(x) = -1$.\n$k'(x) = 0{,}5$.\n⚠️ Le nombre seul ($-1$ dans $g$, $5$ dans $h$) disparaît : c'est une constante.\n⭐ Sur le dessin, la droite de $g$ (bleue) monte de $4$ à chaque pas ; celle de $h$ (orange) descend de $1$.",
          schema: repere([-2, 4, -3, 6], [{ q: [0, 4, -1] }, { q: [0, -1, 5], couleur: ORANGE }], [
            { x: 0, y: -1, label: "" },
            { x: 1, y: 3, label: "" },
          ]),
          micros: ["der_derivee_identite"],
        },
        {
          enonce: "Soit $f(x) = x^2$. Donner $f'(x)$, puis calculer $f'(3)$, $f'(-1)$ et $f'(0)$.",
          correction:
            "$f'(x) = 2x$.\nOn remplace : $f'(3) = 2 \\times 3 = 6$ ; $f'(-1) = 2 \\times (-1) = -2$ ; $f'(0) = 2 \\times 0 = 0$.\nSur le dessin : en $-1$, la tangente descend de $2$ à chaque pas ; en $1$, elle monte de $2$ ; en $0$, au fond de la parabole, elle est horizontale.\n⚠️ $(x^2)' = 2x$, et non $x^2$ ni $2x^2$ : l'exposant $2$ passe devant, et il reste $x^1 = x$.",
          schema: repere([-3, 3, -2, 6], [{ q: [1, 0, 0] }, { q: [0, -2, -1], couleur: ORANGE }, { q: [0, 2, -1], couleur: ORANGE }], [
            { x: -1, y: 1, label: "" },
            { x: 1, y: 1, label: "" },
          ]),
          micros: ["der_derivee_carre_cube"],
        },
        {
          enonce: "Soit $f(x) = x^3$. Donner $f'(x)$, puis calculer $f'(2)$, $f'(-2)$ et $f'(0)$.",
          correction:
            "$f'(x) = 3x^2$.\n$f'(2) = 3 \\times 2^2 = 3 \\times 4 = 12$.\n$f'(-2) = 3 \\times (-2)^2 = 3 \\times 4 = 12$.\n$f'(0) = 3 \\times 0^2 = 0$.\n⚠️ $(-2)^2 = 4$ : $f'(-2)$ est POSITIF. La courbe du cube monte partout, même à gauche de $0$.\n⭐ Sur le dessin, les tangentes en $-1$ et en $1$ ont la même pente, $3 \\times 1^2 = 3$ : elles sont parallèles.",
          schema: repere([-2, 2, -4, 4], [{ p: [1, 0, 0, 0] }, { q: [0, 3, -2], couleur: ORANGE }, { q: [0, 3, 2], couleur: ORANGE }], [
            { x: -1, y: -1, label: "" },
            { x: 1, y: 1, label: "" },
          ]),
          micros: ["der_derivee_carre_cube"],
        },
        {
          enonce: "Associer chaque fonction à sa dérivée.\nFonctions : $f_1(x) = x^2$ ; $f_2(x) = x^3$ ; $f_3(x) = x$ ; $f_4(x) = 5$.\nDérivées : (A) $1$ ; (B) $3x^2$ ; (C) $0$ ; (D) $2x$.",
          correction:
            "$f_1$ va avec (D) : $(x^2)' = 2x$.\n$f_2$ va avec (B) : $(x^3)' = 3x^2$.\n$f_3$ va avec (A) : $x' = 1$.\n$f_4$ va avec (C) : $5$ est une constante, sa dérivée est $0$.\n⚠️ Le piège : associer $f_4(x) = 5$ à la dérivée $1$. Une constante ne « compte » pas pour $1$, elle ne varie pas du tout.",
          schema: ecranSeulement(tableau(["f(x)", "x²", "x³", "x", "5"], ["f′(x)", "2x", "3x²", "1", "0"])),
          micros: ["der_derivee_constante", "der_derivee_identite", "der_derivee_carre_cube"],
        },
        {
          enonce: "a) En quel point la tangente à la courbe de $x \\mapsto x^2$ est-elle horizontale ?\nb) Même question pour la courbe de $x \\mapsto x^3$.\nc) Dans les deux cas, ce point est-il un sommet ou un creux de la courbe ?",
          correction:
            "a) $(x^2)' = 2x$, qui s'annule pour $x = 0$ : la tangente est horizontale à l'origine.\nb) $(x^3)' = 3x^2$, qui s'annule aussi pour $x = 0$ : tangente horizontale à l'origine.\nc) Pour le carré, l'origine est le CREUX de la parabole : un minimum.\nPour le cube, la courbe monte avant $0$ ET après $0$ : l'origine n'est ni un sommet ni un creux, c'est un palier.\n⭐ Une tangente horizontale n'annonce pas toujours un sommet ou un creux : il faut regarder si la courbe change de sens.",
          schema: ecranSeulement(repere([-2, 2, -4, 4], [{ p: [1, 0, 0, 0] }, { q: [0, 0, 0], couleur: ORANGE }], [{ x: 0, y: 0, label: "" }])),
          micros: ["der_derivee_carre_cube"],
        },
        {
          enonce: "Soit $f(x) = 3 - 2x$. Calculer $f'(x)$. Que vaut $f'(100)$ ?",
          correction:
            "$f(x) = 3 - 2x$ s'écrit aussi $f(x) = -2x + 3$ : c'est une fonction affine de pente $-2$.\nDonc $f'(x) = -2$, et $f'(100) = -2$.\n⚠️ La dérivée d'une fonction affine ne dépend pas de $x$ : elle vaut $-2$ en $100$ comme partout.\n⚠️ Le signe moins se garde : $f'(x) = -2$, pas $2$.\n⭐ Sur le dessin, l'escalier vert : on avance de $1$, la droite descend de $2$, partout pareil.",
          schema: ecranSeulement(
            repere([-1, 4, -4, 4], [{ q: [0, -2, 3] }, { pts: [[0, 3], [1, 3], [1, 1]], couleur: VERT }], [
              { x: 0, y: 3, label: "" },
              { x: 1, y: 1, label: "" },
            ]),
          ),
          micros: ["der_derivee_identite"],
        },
        {
          enonce: "Quelle est la pente de la tangente à la parabole d'équation $y = x^2$ au point d'abscisse $1{,}5$ ? Quelles sont les coordonnées de ce point ?",
          correction:
            "La pente de la tangente est le nombre dérivé. Avec $f(x) = x^2$, on a $f'(x) = 2x$.\nEn $1{,}5$ : $f'(1{,}5) = 2 \\times 1{,}5 = 3$.\nLe point de contact a pour ordonnée $1{,}5^2 = 2{,}25$ : c'est le point $(1{,}5 ; 2{,}25)$.\n⚠️ Ne pas confondre $f(1{,}5) = 2{,}25$, la HAUTEUR du point, et $f'(1{,}5) = 3$, la PENTE de la tangente.\n⭐ Sur le dessin, l'escalier vert : à partir du point de contact, on avance de $1$, la tangente monte de $3$.",
          schema: ecranSeulement(
            repere([-1, 3, -1, 6], [{ q: [1, 0, 0] }, { q: [0, 3, -2.25], couleur: ORANGE }, { pts: [[1.5, 2.25], [2.5, 2.25], [2.5, 5.25]], couleur: VERT }], [
              { x: 1.5, y: 2.25, label: "" },
            ]),
          ),
          micros: ["der_derivee_carre_cube"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "On dérive, puis on dit ce que la dérivée signifie dans la situation, avec son unité.",
      rappel: [
        "La dérivée est une VITESSE : pour une position, la vitesse ; pour un coût, le coût d'une unité de plus.",
        "Ce qui est constant (un abonnement, une prise en charge, un point de départ) disparaît à la dérivation : il ne fait rien varier.",
        "Une droite a la même pente partout : sa dérivée est un nombre. Une courbe change de pente : sa dérivée dépend de $x$.",
      ],
      exercices: [
        {
          titre: "Le train régional",
          enonce:
            "Un train roule à allure régulière. Sa position sur la ligne, repérée par le point kilométrique, est $x(t) = 80t + 12$, en km, où $t$ est le temps en heures.\na) Calculer $x'(t)$.\nb) Que signifie ce nombre ?\nc) Que représente le $12$ ? Pourquoi disparaît-il ?",
          correction:
            "a) $x(t) = 80t + 12$ est affine : $x'(t) = 80$.\nb) $x'(t)$ est une vitesse, en km PAR heure : le train roule à $80$ km/h, à tout instant.\nc) $12$ est la position du train au départ ($t = 0$), le point kilométrique $12$.\nIl disparaît à la dérivation : la vitesse ne dépend pas de l'endroit d'où l'on part.\n⭐ Dérivée constante, vitesse constante : les physiciens parlent de mouvement uniforme.\n⭐ Le tableau : chaque heure, la position augmente de $80$ km, quel que soit le départ.",
          schema: ecranSeulement(tableau(["t (h)", "0", "1", "2"], ["x(t) (km)", 12, 92, 172])),
          micros: ["der_derivee_identite"],
        },
        {
          titre: "Deux abonnements",
          enonce:
            "Une plateforme de films propose deux formules : l'illimité, à $8$ € par mois, soit $C(x) = 8$ ; ou $4$ € par mois plus $0{,}50$ € par film, soit $D(x) = 0{,}5x + 4$, où $x$ est le nombre de films vus dans le mois.\na) Calculer $C'(x)$ et $D'(x)$.\nb) Que signifient ces deux nombres ?\nc) À partir de combien de films l'illimité est-il le plus avantageux ?",
          figure: repere([-1, 10, -1, 10], [{ q: [0, 0, 8] }, { q: [0, 0.5, 4], couleur: ORANGE }], [{ x: 8, y: 8, label: "" }], undefined, true),
          correction:
            "a) $C$ est constante : $C'(x) = 0$.\n$D$ est affine : $D'(x) = 0{,}5$.\nb) $C'(x) = 0$ : avec l'illimité, un film de plus ne coûte rien.\n$D'(x) = 0{,}5$ : avec l'autre formule, chaque film de plus coûte $0{,}50$ €.\nc) L'illimité est plus avantageux quand $0{,}5x + 4 > 8$, soit $0{,}5x > 4$, donc $x > 8$ : au-delà de $8$ films par mois.\nSur le dessin, les deux droites se croisent au point $(8 ; 8)$.\n⚠️ Les $4$ € fixes de la seconde formule disparaissent à la dérivation : ils ne dépendent pas du nombre de films.",
          micros: ["der_derivee_constante", "der_derivee_identite"],
        },
        {
          titre: "La plaque qui se dilate",
          enonce:
            "Une plaque de verre carrée chauffe au soleil et se dilate : son côté $x$, en cm, augmente un peu. Son aire est $A(x) = x^2$, en cm².\na) Calculer $A'(x)$, puis $A'(5)$.\nb) Le côté passe de $5$ cm à $5{,}1$ cm. Calculer l'augmentation exacte $A(5{,}1) - A(5)$, et la comparer avec $A'(5) \\times 0{,}1$.",
          correction:
            "a) $A'(x) = 2x$, donc $A'(5) = 2 \\times 5 = 10$ cm² par cm.\nb) $A(5{,}1) - A(5) = 26{,}01 - 25 = 1{,}01$ cm².\nEt $A'(5) \\times 0{,}1 = 10 \\times 0{,}1 = 1$ cm² : c'est presque la même chose.\n⭐ Le carré grandit de deux bandes de $5$ cm sur $0{,}1$ cm, soit $1$ cm², plus un tout petit carré dans le coin, $0{,}1 \\times 0{,}1 = 0{,}01$ cm².\n⚠️ $5{,}1^2 = 26{,}01$, pas $25{,}1$ ni $25{,}01$.",
          schema: ecranSeulement(tableau(["côté x (cm)", "5", "5,1", "5,2"], ["aire x² (cm²)", 25, 26.01, 27.04])),
          micros: ["der_derivee_carre_cube"],
        },
        {
          titre: "Le glaçon qui fond",
          enonce:
            "Un glaçon a la forme d'un cube de côté $x$ cm. Son volume est $V(x) = x^3$, en cm³.\na) Calculer $V'(x)$, puis $V'(2)$.\nb) En fondant, le côté passe de $2$ cm à $1{,}9$ cm. Estimer la perte de volume avec $V'(2)$, puis la calculer exactement.",
          correction:
            "a) $V'(x) = 3x^2$, donc $V'(2) = 3 \\times 2^2 = 12$.\nb) Le côté diminue de $0{,}1$ : le volume diminue d'environ $12 \\times 0{,}1 = 1{,}2$ cm³.\nExactement : $V(2) - V(1{,}9) = 8 - 6{,}859 = 1{,}141$ cm³. L'estimation est bonne, à $0{,}06$ cm³ près.\n⭐ Sur le dessin, la tangente en $A(2 ; 8)$ monte de $12$ pour un pas de $1$ : le volume d'un cube réagit fort à son côté.\n⚠️ $3 \\times 2^2 = 12$, et non $(3 \\times 2)^2 = 36$ : on élève au carré AVANT de multiplier.",
          schema: repere([-1, 3, -2, 9], [{ p: [1, 0, 0, 0] }, { q: [0, 12, -16], couleur: ORANGE }], [{ x: 2, y: 8, label: "A" }], undefined, true),
          micros: ["der_derivee_carre_cube"],
        },
        {
          titre: "La skieuse",
          enonce:
            "Au départ d'une descente, la distance parcourue par une skieuse, en mètres, est $d(t) = t^2$, où $t$ est le temps en secondes ($0 \\leqslant t \\leqslant 10$).\na) Calculer $d'(t)$ : c'est sa vitesse, en m/s.\nb) Calculer sa vitesse à $5$ s, puis à $10$ s, en m/s puis en km/h.\nc) Quand le temps double, que devient la vitesse ? Et la distance ?",
          correction:
            "a) $d'(t) = 2t$.\nb) $d'(5) = 10$ m/s, soit $10 \\times 3{,}6 = 36$ km/h.\n$d'(10) = 20$ m/s, soit $20 \\times 3{,}6 = 72$ km/h.\nc) De $5$ à $10$ s, la vitesse DOUBLE : $10$ puis $20$ m/s.\nLa distance, elle, est multipliée par QUATRE : $d(5) = 25$ m et $d(10) = 100$ m.\n⭐ La distance suit $t^2$, la vitesse suit $2t$ : dériver fait descendre l'exposant.",
          schema: tableau(["t (s)", "0", "5", "10"], ["vitesse d′(t) (m/s)", 0, 10, 20]),
          micros: ["der_derivee_carre_cube"],
        },
        {
          titre: "La route du plateau",
          enonce:
            "Une route traverse un plateau à $350$ m d'altitude, puis monte régulièrement vers un village. On note $x$ la distance horizontale parcourue dans chaque partie, en mètres.\n• Sur le plateau : $a(x) = 350$.\n• Dans la montée : $a(x) = 0{,}08x + 350$.\na) Calculer $a'(x)$ sur le plateau, puis dans la montée.\nb) Un panneau annonce une pente de $8$ %. Est-ce cohérent ?",
          correction:
            "a) Sur le plateau, $a$ est constante : $a'(x) = 0$. La route est plate.\nDans la montée, $a$ est affine : la dérivée vaut $0{,}08$.\nb) La route monte de $0{,}08$ m par mètre parcouru, soit $8$ m pour $100$ m : c'est bien une pente de $8$ %.\n⚠️ Dans la montée, les $350$ m de départ disparaissent à la dérivation : la pente ne dépend pas de l'altitude, seulement de la façon dont elle change.",
          schema: ecranSeulement(tableau(["mètres de montée", "0", "100", "200"], ["altitude (m)", 350, 358, 366])),
          micros: ["der_derivee_constante", "der_derivee_identite"],
        },
        {
          titre: "La course de taxi",
          enonce:
            "Une course de taxi coûte $4$ € de prise en charge, plus $2$ € par kilomètre : pour $x$ km, elle coûte $P(x) = 2x + 4$ euros.\na) Calculer $P'(x)$. Que signifie ce nombre ?\nb) Que devient la prise en charge quand on dérive ? Pourquoi ?\nc) Pour une course de $10$ km, combien coûte un kilomètre de plus ? Et pour une course de $30$ km ?",
          correction:
            "a) $P'(x) = 2$ : chaque kilomètre de plus coûte $2$ €.\nb) La prise en charge est une constante : sa dérivée est $0$. Elle se paie une fois, au départ, et ne dépend pas de la distance.\nc) $2$ € dans les deux cas : la dérivée d'une fonction affine est la même partout.\n⚠️ Le prix d'une course de $10$ km est $P(10) = 24$ € ; le prix d'un kilomètre de PLUS est $2$ €. Ce ne sont pas les mêmes questions.\n⭐ Sur le dessin, la droite du prix part de $4$ (la prise en charge) ; l'escalier vert : un kilomètre de plus, $2$ € de plus.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 14], [{ q: [0, 2, 4] }, { pts: [[1, 6], [2, 6], [2, 8]], couleur: VERT }], [{ x: 0, y: 4, label: "" }], undefined, true),
          ),
          micros: ["der_derivee_identite", "der_derivee_constante"],
        },
        {
          titre: "L'algue invasive",
          enonce:
            "Deux modèles décrivent la surface envahie par une algue dans un lac, en m², au bout de $t$ semaines : $A_1(t) = t^2$ (courbe bleue) et $A_2(t) = t^3$ (courbe orange).\na) Calculer $A_1'(t)$ et $A_2'(t)$.\nb) Quel modèle grandit le plus vite à $t = 0{,}5$ ? Et à $t = 2$ ?\nc) Lire sur le dessin la surface envahie à $t = 2$ dans chaque modèle.",
          figure: repere([-1, 3, -1, 9], [{ q: [1, 0, 0] }, { p: [1, 0, 0, 0], couleur: ORANGE }], [
            { x: 2, y: 4, label: "" },
            { x: 2, y: 8, label: "" },
          ]),
          correction:
            "a) $A_1'(t) = 2t$ et $A_2'(t) = 3t^2$.\nb) À $t = 0{,}5$ : $A_1'(0{,}5) = 2 \\times 0{,}5 = 1$ et $A_2'(0{,}5) = 3 \\times 0{,}5^2 = 0{,}75$. Le modèle $A_1$ grandit le plus vite.\nÀ $t = 2$ : $A_1'(2) = 2 \\times 2 = 4$ et $A_2'(2) = 3 \\times 2^2 = 12$. Le modèle $A_2$ grandit trois fois plus vite.\nc) À $t = 2$ : $4$ m² avec $A_1$, $8$ m² avec $A_2$.\n⚠️ $0{,}5^2 = 0{,}25$ : pour un nombre entre $0$ et $1$, le carré est plus PETIT que le nombre. C'est pourquoi le cube démarre plus lentement.\n⭐ Au début, le cube est en retard ; ensuite, il explose. C'est ce qui rend une invasion difficile à repérer à temps.",
          micros: ["der_derivee_carre_cube"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet, avec ses questions qui s'enchaînent. On dérive, on remplace, on interprète.",
      rappel: [
        "On dérive, on remplace, on traduit avec les unités.",
        "Deux droites de même coefficient directeur sont parallèles : une tangente et une droite aussi.",
        "La pente de la tangente est la limite des pentes des sécantes, quand les deux points se rapprochent.",
      ],
      exercices: [
        {
          titre: "Les billes de Galilée",
          enonce:
            "Au début du XVIIᵉ siècle, Galilée fait rouler des billes sur un plan incliné. Il constate que la distance parcourue est proportionnelle au CARRÉ du temps. Dans des unités bien choisies, $d(t) = t^2$, en décimètres, où $t$ est le temps en secondes. Le tableau donne des mesures de ce modèle.\na) Calculer $d'(t)$, la vitesse de la bille, en dm/s.\nb) Calculer sa vitesse à $1$, $2$ et $3$ s.\nc) Calculer la vitesse moyenne entre $0$ et $2$ s. La comparer avec $d'(1)$.\nd) À quel instant la bille atteint-elle $10$ dm/s ?",
          figure: tableau(["t (s)", "1", "2", "3"], ["d(t) (dm)", 1, 4, 9]),
          correction:
            "a) $d'(t) = 2t$.\nb) $d'(1) = 2$ dm/s ; $d'(2) = 4$ dm/s ; $d'(3) = 6$ dm/s. La vitesse augmente de $2$ dm/s chaque seconde : la bille accélère régulièrement.\nc) Entre $0$ et $2$ s, elle parcourt $4$ dm : sa vitesse moyenne est $\\dfrac{4}{2} = 2$ dm/s. C'est exactement $d'(1)$, la vitesse au milieu du trajet.\nd) $2t = 10$ donne $t = 5$ s.\n⭐ Sur le dessin, la corde verte (de $0$ à $2$ s) est parallèle à la tangente orange en $1$ s : même pente, $2$.\n⚠️ À $t = 3$, la bille a parcouru $9$ dm, mais sa vitesse est $6$ dm/s : ne pas confondre $d(3)$ et $d'(3)$.",
          schema: ecranSeulement(
            repere(
              [-1, 4, -1, 10],
              [{ q: [1, 0, 0] }, { q: [0, 2, -1], couleur: ORANGE }, { pts: [[0, 0], [2, 4]], couleur: VERT }],
              [
                { x: 1, y: 1, label: "" },
                { x: 2, y: 4, label: "" },
              ],
              undefined,
              true,
            ),
          ),
          micros: ["der_derivee_carre_cube"],
        },
        {
          titre: "Le cycliste et le scooter",
          enonce:
            "Un cycliste roule à vitesse constante ; à côté de lui, un scooter démarre. Leurs distances au feu, en hectomètres ($1$ hm $= 100$ m), sont $c(t) = 2t + 1$ pour le cycliste et $s(t) = t^2$ pour le scooter, où $t$ est le temps en minutes.\na) Calculer $c'(t)$ et $s'(t)$.\nb) À quel instant ont-ils la même vitesse ? Donner cette vitesse en km/h.\nc) À $t = 3$, qui est devant ? Qui va le plus vite ?\nd) Sur le dessin, la droite verte est celle du cycliste ($C$) ; la droite orange est la tangente à la courbe du scooter ($S$) en $t = 1$. Pourquoi sont-elles parallèles ?",
          figure: repere(
            [-1, 4, -1, 10],
            [{ q: [1, 0, 0] }, { q: [0, 2, 1], couleur: VERT }, { q: [0, 2, -1], couleur: ORANGE }],
            [
              { x: 1, y: 1, label: "S" },
              { x: 1, y: 3, label: "C" },
            ],
            undefined,
            true,
          ),
          correction:
            "a) $c'(t) = 2$ : le cycliste roule toujours à $2$ hm par minute.\n$s'(t) = 2t$ : la vitesse du scooter augmente avec le temps.\nb) $2t = 2$ donne $t = 1$ : au bout d'une minute, ils roulent à la même vitesse.\n$2$ hm par minute, c'est $200$ m par minute, soit $200 \\times 60 = 12\\,000$ m par heure : $12$ km/h.\nc) $c(3) = 7$ et $s(3) = 9$ : le scooter est devant, à $900$ m contre $700$ m.\nSa vitesse : $s'(3) = 6$ hm par minute, soit $36$ km/h, contre $12$ km/h pour le cycliste. Le scooter va le plus vite.\nd) Deux droites de même coefficient directeur sont parallèles. La droite du cycliste a pour pente $2$ ; la tangente au scooter en $1$ a pour pente $s'(1) = 2 \\times 1 = 2$.\n⚠️ À $t = 1$, ils vont aussi vite, mais ils ne sont pas au même endroit : $c(1) = 3$ et $s(1) = 1$. Même vitesse ne veut pas dire même position.",
          micros: ["der_derivee_identite", "der_derivee_carre_cube"],
        },
        {
          titre: "Le geste de Fermat, Newton et Leibniz",
          enonce:
            "Au XVIIᵉ siècle, des mathématiciens comme Fermat, puis Newton et Leibniz, trouvent la pente d'une tangente en rapprochant deux points de la courbe. Refaisons leur geste.\na) Sur la courbe de $f(x) = x^2$, calculer la pente de la sécante qui joint $A(3 ; 9)$ au point d'abscisse $3 + h$, pour $h = 1$, puis $h = 0{,}1$, puis $h = 0{,}01$.\nb) De quel nombre ces pentes s'approchent-elles ? Le comparer avec $f'(3)$ donné par la formule.\nc) Même travail pour $g(x) = x^3$ au point d'abscisse $1$, avec $h = 0{,}1$.",
          correction:
            "a) La pente de la sécante vaut $\\dfrac{f(3 + h) - f(3)}{h}$.\n$h = 1$ : $\\dfrac{16 - 9}{1} = 7$.\n$h = 0{,}1$ : $\\dfrac{9{,}61 - 9}{0{,}1} = 6{,}1$.\n$h = 0{,}01$ : $\\dfrac{9{,}0601 - 9}{0{,}01} = 6{,}01$.\nb) Les pentes s'approchent de $6$. La formule donne $f'(x) = 2x$, donc $f'(3) = 6$ : c'est le même nombre.\nc) $\\dfrac{1{,}331 - 1}{0{,}1} = 3{,}31$ : c'est proche de $g'(1) = 3 \\times 1^2 = 3$.\n⭐ La tangente est la position limite des sécantes : c'est la définition du nombre dérivé, et l'origine des formules.\n⚠️ On ne peut pas prendre $h = 0$ : on diviserait par zéro. On s'approche, sans jamais y arriver.",
          schema: tableau(["h", "1", "0,1", "0,01"], ["pente de la sécante", 7, 6.1, 6.01]),
          micros: ["der_derivee_carre_cube"],
        },
        {
          titre: "L'enclos des moutons",
          enonce:
            "Un éleveur construit un enclos carré de côté $x$ mètres pour ses moutons. L'aire de l'enclos est $A(x) = x^2$, en m² ; la longueur de clôture est $L(x) = 4x$, en m ; le portail coûte $150$ €, quelle que soit la taille : $P(x) = 150$.\na) Calculer $A'(x)$, $L'(x)$ et $P'(x)$.\nb) Pour un enclos de $10$ m de côté, que gagne-t-on, environ, en allongeant le côté d'un mètre ? Combien faut-il de clôture en plus ? Le portail coûte-t-il plus cher ?\nc) Pour quel côté a-t-on $A'(x) = L'(x)$ ?\nd) Au-delà, un mètre de côté en plus apporte-t-il plus de m² d'herbe que de mètres de clôture ?",
          correction:
            "a) $A'(x) = 2x$ ; $L'(x) = 4$ ; $P'(x) = 0$.\nb) $A'(10) = 20$ : environ $20$ m² d'herbe en plus (exactement $A(11) - A(10) = 121 - 100 = 21$).\n$L'(10) = 4$ : $4$ m de clôture en plus, un mètre par côté.\nLe portail ne coûte rien de plus : sa dérivée est nulle.\nc) $2x = 4$ donne $x = 2$.\nd) Oui : pour $x > 2$, on a $2x > 4$. Chaque mètre de côté ajoute plus de m² d'herbe que de mètres de clôture, et l'écart grandit avec l'enclos.\n⭐ Sur le dessin, la tangente orange à la parabole en $x = 2$ est parallèle à la droite verte de la clôture : même pente, $4$.\n⚠️ On ne compare pas $A(x)$ et $L(x)$, des m² et des m : on compare ce que rapporte un mètre DE PLUS.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 10], [{ q: [1, 0, 0] }, { q: [0, 4, 0], couleur: VERT }, { q: [0, 4, -4], couleur: ORANGE }], [{ x: 2, y: 4, label: "" }], undefined, true),
          ),
          micros: ["der_derivee_carre_cube", "der_derivee_identite", "der_derivee_constante"],
        },
      ],
    },
  ],
};
