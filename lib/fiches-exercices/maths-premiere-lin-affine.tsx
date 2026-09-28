// ─── Fiche d'exercices : fonction affine (1re, sans spé) ──────────────────────
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonctions-affines.bank.ts`
// (micros lin_affine_expression, lin_affine_taux_accroissement,
// lin_affine_variation). Le programme : « remobiliser » la seconde, et surtout
// le LIEN ENTRE LE TAUX D'ACCROISSEMENT ET LE COEFFICIENT DIRECTEUR.
//
// ⛔ Pas de redite de la feuille des automatismes `maths-premiere-auto-droites
// .tsx` (tracer, lire une équation réduite, taxis, kayaks, glacier…). Ici, tout
// passe par la NOTATION FONCTIONNELLE et le taux (f(x₂) − f(x₁)) / (x₂ − x₁).
//
// ⭐⭐ LE FIL : UNE FONCTION AFFINE A UN SEUL TAUX D'ACCROISSEMENT. Quels que
// soient les deux nombres choisis, il vaut a. C'est ce qui la reconnaît dans un
// tableau (6 : des x irréguliers ; 7 et 15 : des taux qui changent, donc pas
// affine), et c'est une VITESSE avec son unité (°F par °C, m par an, € par
// table, L par km, points de % par heure, battements par an).
// Pièges nommés : 3 − (−1) (2), a est le coefficient de x et non le premier
// nombre écrit (5), des x qui ne vont pas de 1 en 1 (6), affine n'est pas
// linéaire (9), coût marginal et coût moyen (11), taux négatif et consommation
// positive (12), une pente de 8 % n'est pas 8° (13), t compté depuis 8 h (14),
// un modèle affine faux et dangereux (15).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes, dont la PHYSIQUE (Celsius et
// Fahrenheit 9, batterie 14, freinage 15) et l'HISTOIRE-GÉO (route de montagne
// sur une carte 13, ville nouvelle 20). Chiffres = MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-affine.mjs`.
//
// Micro-compétences : lin_affine_expression (3, 4, 6, 10, 11, 13, 14, 16, 17,
// 18, 19, 20), lin_affine_taux_accroissement (1, 2, 6, 7, 8, 9, 10, 11, 12, 13,
// 14, 15, 17, 18, 19, 20), lin_affine_variation (5, 8, 9, 11, 12, 16, 17, 18,
// 19). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les tableaux et les droites qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const VERT = "#16a34a";
const GRIS = "#94a3b8";

export const exercicesLinAffinePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-affine",
  titre: "Fonction affine et taux d'accroissement",
  accroche:
    "Vingt exercices sur les fonctions affines en première : calculer un taux d'accroissement, retrouver l'expression à partir de deux images, donner le sens de variation. Le fil : une fonction affine a un seul taux d'accroissement, son coefficient directeur. Un rappel de cours avant chaque niveau, une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On calcule, on conclut.",
      rappel: [
        "Une fonction affine s'écrit $f(x) = ax + b$ ; sa courbe est une droite de coefficient directeur $a$.",
        "Le taux d'accroissement de $f$ entre $x_1$ et $x_2$ : $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$. Pour une fonction affine, il vaut TOUJOURS $a$, quels que soient les deux nombres.",
        "Si $a > 0$, $f$ est croissante ; si $a < 0$, décroissante ; si $a = 0$, constante.",
        "Avec deux images : $a$ est le taux d'accroissement, puis on trouve $b$ en remplaçant $x$ par l'un des deux nombres.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = 3x - 2$. Calculer le taux d'accroissement de $f$ entre $1$ et $4$.",
          correction:
            "$f(1) = 3 \\times 1 - 2 = 1$ et $f(4) = 3 \\times 4 - 2 = 10$.\nTaux d'accroissement : $\\dfrac{10 - 1}{4 - 1} = \\dfrac{9}{3} = 3$.\n⭐ On retrouve $3$, le coefficient directeur : pour une fonction affine, c'est toujours le cas.\n⚠️ Même ordre en haut et en bas : $f(4) - f(1)$ sur $4 - 1$.\nSur le dessin, l'escalier orange : on avance de $3$, on monte de $9$. Monter de $9$ pour $3$, c'est $3$ par unité.",
          schema: repere([-1, 5, -3, 11], [{ q: [0, 3, -2] }, { pts: [[1, 1], [4, 1], [4, 10]], couleur: ORANGE }], [
            { x: 1, y: 1, label: "" },
            { x: 4, y: 10, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement"],
        },
        {
          enonce: "Soit $g(x) = -2x + 7$. Calculer le taux d'accroissement de $g$ entre $-1$ et $3$.",
          correction:
            "$g(-1) = -2 \\times (-1) + 7 = 9$ et $g(3) = -2 \\times 3 + 7 = 1$.\nTaux : $\\dfrac{1 - 9}{3 - (-1)} = \\dfrac{-8}{4} = -2$.\n⚠️ Le piège : $3 - (-1) = 4$, et non $2$.\n⭐ Le taux vaut $-2$, le coefficient directeur : la fonction perd $2$ quand $x$ augmente de $1$.\nSur le dessin, l'escalier orange : on avance de $4$ et on descend de $8$.",
          schema: ecranSeulement(repere([-2, 4, -1, 10], [{ q: [0, -2, 7] }, { pts: [[-1, 9], [3, 9], [3, 1]], couleur: ORANGE }], [
            { x: -1, y: 9, label: "" },
            { x: 3, y: 1, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_taux_accroissement"],
        },
        {
          enonce: "Une fonction affine $f$ vérifie $f(2) = 5$ et $f(6) = 13$. Déterminer son expression.",
          correction:
            "$a$ est le taux d'accroissement : $a = \\dfrac{13 - 5}{6 - 2} = \\dfrac{8}{4} = 2$.\nDonc $f(x) = 2x + b$. Avec $f(2) = 5$ : $2 \\times 2 + b = 5$, donc $b = 5 - 4 = 1$.\n$f(x) = 2x + 1$.\n✔️ On vérifie avec l'autre image : $f(6) = 2 \\times 6 + 1 = 13$.\nSur le dessin, l'escalier orange va de $(2 ; 5)$ à $(6 ; 13)$ : $4$ en avant, $8$ en haut. La droite coupe l'axe vertical en $1$, c'est $b$.",
          schema: ecranSeulement(repere([-1, 7, -1, 14], [{ q: [0, 2, 1] }, { pts: [[2, 5], [6, 5], [6, 13]], couleur: ORANGE }], [
            { x: 2, y: 5, label: "" },
            { x: 6, y: 13, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_expression"],
        },
        {
          enonce: "Une fonction affine $f$ vérifie $f(0) = 4$ et $f(5) = -6$. Déterminer son expression.",
          correction:
            "$f(0) = 4$ donne directement $b = 4$ : l'image de $0$ est l'ordonnée à l'origine.\n$a = \\dfrac{-6 - 4}{5 - 0} = \\dfrac{-10}{5} = -2$.\n$f(x) = -2x + 4$.\n✔️ $f(5) = -2 \\times 5 + 4 = -6$.\n⚠️ Ne pas échanger les rôles : $4$ est $b$, pas $a$.\nSur le dessin, la droite part de $4$ sur l'axe vertical ; l'escalier orange avance de $5$ et descend de $10$.",
          schema: repere([-1, 6, -7, 6], [{ q: [0, -2, 4] }, { pts: [[0, 4], [5, 4], [5, -6]], couleur: ORANGE }], [
            { x: 0, y: 4, label: "" },
            { x: 5, y: -6, label: "" },
          ], undefined, true),
          micros: ["lin_affine_expression"],
        },
        {
          enonce: "Donner le sens de variation de chaque fonction affine.\na) $f(x) = 0{,}5x - 3$\nb) $g(x) = 4 - 3x$\nc) $h(x) = -7$\nd) $k(x) = -x$",
          correction:
            "On lit le coefficient de $x$, avec son signe.\na) $a = 0{,}5 > 0$ : $f$ est croissante.\nb) $g(x) = -3x + 4$ : $a = -3 < 0$, $g$ est décroissante.\nc) $h(x) = 0 \\times x - 7$ : $a = 0$, $h$ est constante.\nd) $k(x) = -1 \\times x$ : $a = -1 < 0$, $k$ est décroissante.\n⚠️ Le piège est b) : le coefficient directeur est $-3$, le nombre qui multiplie $x$, et non $4$, écrit en premier.\n⭐ Le nombre $b$ déplace la droite vers le haut ou vers le bas ; il ne change pas son sens.\nSur le dessin : $f$ en bleu monte ; $g$ en orange et $k$ en gris descendent ; $h$ en vert est horizontale.",
          schema: ecranSeulement(repere([-2, 4, -8, 6], [{ q: [0, 0.5, -3] }, { q: [0, -3, 4], couleur: ORANGE }, { q: [0, 0, -7], couleur: VERT }, { q: [0, -1, 0], couleur: GRIS }], [], undefined, true)),
          micros: ["lin_affine_variation"],
        },
        {
          enonce: "Le tableau donne des valeurs d'une fonction $f$. Calculer les taux d'accroissement entre $0$ et $2$, entre $2$ et $5$, puis entre $5$ et $9$. La fonction peut-elle être affine ? Si oui, donner son expression.",
          figure: tableau(["x", "0", "2", "5", "9"], ["f(x)", 1, 7, 16, 28]),
          correction:
            "Entre $0$ et $2$ : $\\dfrac{7 - 1}{2 - 0} = \\dfrac{6}{2} = 3$.\nEntre $2$ et $5$ : $\\dfrac{16 - 7}{5 - 2} = \\dfrac{9}{3} = 3$.\nEntre $5$ et $9$ : $\\dfrac{28 - 16}{9 - 5} = \\dfrac{12}{4} = 3$.\nLe taux vaut toujours $3$ : $f$ peut être affine, avec $a = 3$ et $b = f(0) = 1$, soit $f(x) = 3x + 1$.\n⚠️ Les valeurs de $x$ ne vont pas de $1$ en $1$ : comparer seulement les écarts $6$, $9$ et $12$ ferait croire, à tort, que $f$ n'est pas affine.",
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression"],
        },
        {
          enonce: "Le tableau donne des valeurs d'une fonction $g$. Est-elle affine ?",
          figure: tableau(["x", "0", "1", "2", "3"], ["g(x)", 2, 3, 6, 11]),
          correction:
            "Taux entre $0$ et $1$ : $\\dfrac{3 - 2}{1 - 0} = 1$. Entre $1$ et $2$ : $\\dfrac{6 - 3}{2 - 1} = 3$. Entre $2$ et $3$ : $\\dfrac{11 - 6}{3 - 2} = 5$.\nLes taux changent : $g$ n'est pas affine.\nSur le dessin, les points ne sont pas alignés : la courbe se redresse. C'est celle de $x^2 + 2$.\n⭐ Une fonction affine a UN SEUL taux d'accroissement : c'est ce qui la reconnaît.",
          schema: ecranSeulement(repere([-1, 4, -1, 12], [{ q: [1, 0, 2], couleur: ORANGE }], [
            { x: 0, y: 2, label: "" },
            { x: 1, y: 3, label: "" },
            { x: 2, y: 6, label: "" },
            { x: 3, y: 11, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_taux_accroissement"],
        },
        {
          enonce: "Une fonction affine $f$ vérifie $f(1) = 10$ et $f(4) = 4$. Est-elle croissante ou décroissante ? Justifier.",
          correction:
            "Son coefficient directeur est son taux d'accroissement : $a = \\dfrac{4 - 10}{4 - 1} = \\dfrac{-6}{3} = -2$.\n$a < 0$ : $f$ est décroissante.\n✔️ On le voyait déjà : $x$ augmente de $1$ à $4$, et l'image baisse de $10$ à $4$.\n⭐ Pour une fonction affine, deux images suffisent pour connaître le sens de variation.\nSur le dessin, l'escalier orange avance de $3$ et descend de $6$ : la droite descend.",
          schema: ecranSeulement(repere([-1, 6, -1, 13], [{ q: [0, -2, 12] }, { pts: [[1, 10], [4, 10], [4, 4]], couleur: ORANGE }], [
            { x: 1, y: 10, label: "" },
            { x: 4, y: 4, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_variation", "lin_affine_taux_accroissement"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Calculer le taux, trouver l'expression, puis tout dire avec l'unité.",
      rappel: [
        "Dans un problème, le taux d'accroissement est une VITESSE, avec une unité : des degrés Fahrenheit par degré Celsius, des mètres par an, des euros par objet.",
        "Pour une fonction affine, ce taux est le même partout : c'est le coefficient directeur $a$.",
        "$b = f(0)$ est la valeur de départ ; elle ne change pas le sens de variation.",
      ],
      exercices: [
        {
          titre: "Des degrés Celsius aux degrés Fahrenheit",
          enonce:
            "En physique, on convertit une température $x$, en degrés Celsius, en degrés Fahrenheit par la fonction $f(x) = 1{,}8x + 32$.\na) Calculer $f(0)$ et $f(100)$. Que représentent ces deux températures ?\nb) Calculer le taux d'accroissement de $f$ entre $0$ et $100$. L'interpréter.\nc) $f$ est-elle croissante ? Était-ce prévisible ?\nd) Convertir $20$ °C, puis $-10$ °C.",
          correction:
            "a) $f(0) = 32$ et $f(100) = 1{,}8 \\times 100 + 32 = 212$ : à la pression atmosphérique normale, l'eau gèle à $32$ °F et bout à $212$ °F.\nb) $\\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1{,}8$ : un degré Celsius de plus, c'est $1{,}8$ degré Fahrenheit de plus. C'est le coefficient directeur.\nc) $a = 1{,}8 > 0$ : $f$ est croissante. Normal : plus il fait chaud en Celsius, plus il fait chaud en Fahrenheit.\nd) $f(20) = 1{,}8 \\times 20 + 32 = 68$ °F et $f(-10) = 1{,}8 \\times (-10) + 32 = 14$ °F.\n⚠️ $f$ n'est pas linéaire : $0$ °C ne donne pas $0$ °F, et doubler une température en Celsius ne la double pas en Fahrenheit.\nSur le dessin (en dizaines de degrés sur les deux axes), la droite coupe l'axe vertical en $3{,}2$.",
          schema: repere([-2, 5, -1, 12], [{ q: [0, 1.8, 3.2] }], [
            { x: -1, y: 1.4, label: "" },
            { x: 0, y: 3.2, label: "" },
            { x: 2, y: 6.8, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement", "lin_affine_variation"],
        },
        {
          titre: "Un arbre qui grandit",
          enonce:
            "Un jeune chêne est planté dans un parc. On modélise sa hauteur, en mètres, par une fonction affine $h$ du temps $t$, en années : $h(2) = 3{,}1$ et $h(10) = 7{,}1$ (chiffres d'un modèle).\na) Calculer le taux d'accroissement de $h$ entre $2$ et $10$. Que représente-t-il ?\nb) En déduire l'expression de $h(t)$.\nc) Quelle était la hauteur de l'arbre à la plantation ?",
          correction:
            "a) $\\dfrac{7{,}1 - 3{,}1}{10 - 2} = \\dfrac{4}{8} = 0{,}5$ : l'arbre grandit de $0{,}5$ m, soit $50$ cm, par an.\nb) $h(t) = 0{,}5t + b$ et $h(2) = 3{,}1$ : $0{,}5 \\times 2 + b = 3{,}1$, donc $b = 3{,}1 - 1 = 2{,}1$. Ainsi $h(t) = 0{,}5t + 2{,}1$.\nc) À la plantation, $t = 0$ : $h(0) = 2{,}1$ m.\n✔️ $h(10) = 0{,}5 \\times 10 + 2{,}1 = 7{,}1$.\n⭐ $b$ n'est pas « rien » : c'est la hauteur du jeune arbre qu'on a planté.",
          schema: repere([-1, 12, -1, 9], [{ q: [0, 0.5, 2.1] }], [
            { x: 2, y: 3.1, label: "" },
            { x: 10, y: 7.1, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression"],
        },
        {
          titre: "Le coût de fabrication",
          enonce:
            "Un atelier fabrique des tables en bois. Son coût de production, en euros, est une fonction affine $C$ du nombre $q$ de tables : $C(10) = 1\\,500$ et $C(30) = 2\\,300$ (chiffres d'un modèle).\na) Calculer le taux d'accroissement de $C$ entre $10$ et $30$. Que représente-t-il ?\nb) Déterminer $C(q)$. Que représente $C(0)$ ?\nc) La fonction $C$ est-elle croissante ?",
          correction:
            "a) $\\dfrac{2\\,300 - 1\\,500}{30 - 10} = \\dfrac{800}{20} = 40$ : chaque table de plus coûte $40$ € à fabriquer.\nb) $C(q) = 40q + b$ et $C(10) = 1\\,500$ : $40 \\times 10 + b = 1\\,500$, donc $b = 1\\,100$. Ainsi $C(q) = 40q + 1\\,100$.\n$C(0) = 1\\,100$ : ce sont les coûts FIXES (atelier, machines), payés même sans rien fabriquer.\nc) $a = 40 > 0$ : $C$ est croissante, plus on fabrique, plus cela coûte.\n⚠️ Le coût moyen d'une table n'est pas $40$ € : pour $10$ tables, c'est $\\dfrac{1\\,500}{10} = 150$ € par table, car les coûts fixes sont partagés.",
          schema: ecranSeulement(tableau(["tables q", "0", "10", "20", "30"], ["coût (€)", "1 100", "1 500", "1 900", "2 300"])),
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression", "lin_affine_variation"],
        },
        {
          titre: "Le réservoir d'une voiture",
          enonce:
            "Une voiture part avec $50$ L d'essence. Le volume restant, en litres, après $d$ kilomètres, est modélisé par $V(d) = 50 - 0{,}06d$.\na) Quel est le sens de variation de $V$ ? Pourquoi ?\nb) Calculer le taux d'accroissement de $V$ entre $100$ et $500$. L'interpréter en litres aux $100$ km.\nc) Combien reste-t-il d'essence après $500$ km ?",
          correction:
            "a) $a = -0{,}06 < 0$ : $V$ est décroissante, le réservoir se vide en roulant.\nb) $V(100) = 50 - 0{,}06 \\times 100 = 44$ et $V(500) = 50 - 0{,}06 \\times 500 = 20$. Taux : $\\dfrac{20 - 44}{500 - 100} = \\dfrac{-24}{400} = -0{,}06$ L par km.\nLa voiture consomme $0{,}06 \\times 100 = 6$ litres aux $100$ km.\nc) $V(500) = 20$ : il reste $20$ L.\nSur le dessin (en centaines de km et en dizaines de litres), la droite descend et atteindrait l'axe horizontal vers $833$ km.\n⚠️ Le taux est NÉGATIF, car le volume baisse. La consommation, elle, se dit avec un nombre positif.",
          schema: repere([-1, 9, -1, 6], [{ q: [0, -0.6, 5] }], [
            { x: 1, y: 4.4, label: "" },
            { x: 5, y: 2, label: "" },
          ]),
          micros: ["lin_affine_variation", "lin_affine_taux_accroissement"],
        },
        {
          titre: "Une route de montagne",
          enonce:
            "Sur une carte routière, un panneau annonce une pente de $8$ % : la route monte de $8$ m pour $100$ m parcourus à l'horizontale. Au pied de la côte, l'altitude est de $600$ m. On note $h(d)$ l'altitude, en mètres, après $d$ mètres parcourus à l'horizontale.\na) Justifier que $h(d) = 0{,}08d + 600$.\nb) Quel est le taux d'accroissement de $h$ ? Le relier à la pente.\nc) Quelle altitude atteint-on après $2{,}5$ km à l'horizontale ?",
          correction:
            "a) Au départ, $h(0) = 600$. Chaque mètre à l'horizontale fait monter de $\\dfrac{8}{100} = 0{,}08$ m. Donc $h(d) = 0{,}08d + 600$.\nb) Le taux d'accroissement est le coefficient directeur : $0{,}08$ m par mètre. La pente de $8$ %, c'est ce coefficient écrit en pourcentage.\nc) $2{,}5$ km, ce sont $2\\,500$ m : $h(2\\,500) = 0{,}08 \\times 2\\,500 + 600 = 800$ m.\n⚠️ Une pente de $8$ % n'est pas un angle de $8$ degrés : c'est $8$ m de montée pour $100$ m à l'horizontale.\nSur le dessin (en km et en centaines de mètres), la droite monte de $0{,}8$ par km.",
          schema: ecranSeulement(repere([-1, 6, -1, 11], [{ q: [0, 0.8, 6] }], [{ x: 2.5, y: 8, label: "" }], undefined, true)),
          micros: ["lin_affine_expression", "lin_affine_taux_accroissement"],
        },
        {
          titre: "La batterie d'un téléphone",
          enonce:
            "La charge de la batterie d'un téléphone, en %, est une fonction affine $B$ du temps $t$, en heures écoulées depuis 8 h. À 10 h, elle est de $76$ % ; à 14 h, de $52$ % (chiffres d'un modèle).\na) Calculer le taux d'accroissement de $B$ entre $t = 2$ et $t = 6$. L'interpréter.\nb) Déterminer $B(t)$. Quelle était la charge à 8 h ?\nc) Quelle charge ce modèle prévoit-il à 20 h ?",
          correction:
            "a) À 10 h, $t = 2$ ; à 14 h, $t = 6$. Taux : $\\dfrac{52 - 76}{6 - 2} = \\dfrac{-24}{4} = -6$ : la batterie perd $6$ points de pourcentage par heure.\nb) $B(t) = -6t + b$ et $B(2) = 76$ : $-6 \\times 2 + b = 76$, donc $b = 88$. Ainsi $B(t) = -6t + 88$ : à 8 h, la charge était de $88$ %.\nc) 20 h, c'est $t = 12$ : $B(12) = -6 \\times 12 + 88 = 16$ %.\n⚠️ $t$ compte les heures DEPUIS 8 h : 14 h, c'est $t = 6$, pas $t = 14$.\nSur le dessin (en dizaines de %), la droite descend d'un peu plus d'un demi-carreau par heure.",
          schema: repere([-1, 13, -1, 10], [{ q: [0, -0.6, 8.8] }], [
            { x: 2, y: 7.6, label: "" },
            { x: 6, y: 5.2, label: "" },
            { x: 12, y: 1.6, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression"],
        },
        {
          titre: "La distance de freinage",
          enonce:
            "Dans un modèle de sécurité routière, le tableau donne la distance de freinage d'une voiture sur route sèche selon sa vitesse.\na) Calculer le taux d'accroissement entre $0$ et $50$ km/h, puis entre $50$ et $100$ km/h.\nb) La distance de freinage est-elle une fonction affine de la vitesse ?\nc) Un élève prolonge la droite qui passe par les deux premiers points. Quelle distance prévoit-il à $100$ km/h ? Qu'en penser ?",
          figure: tableau(["vitesse (km/h)", "0", "50", "100"], ["freinage (m)", 0, 15, 60]),
          correction:
            "a) Entre $0$ et $50$ : $\\dfrac{15 - 0}{50 - 0} = 0{,}3$ m par km/h. Entre $50$ et $100$ : $\\dfrac{60 - 15}{100 - 50} = \\dfrac{45}{50} = 0{,}9$ m par km/h.\nb) Les deux taux sont différents : la distance de freinage n'est PAS une fonction affine de la vitesse.\nc) Avec un taux de $0{,}3$, il prévoit $0{,}3 \\times 100 = 30$ m, au lieu de $60$ m : il se trompe de moitié.\nSur le dessin (en dizaines), la courbe bleue se redresse et quitte la droite orange.\n⭐ En physique, la distance de freinage est proportionnelle au CARRÉ de la vitesse : rouler deux fois plus vite, c'est freiner sur une distance quatre fois plus longue.\n⚠️ Un modèle affine faux peut être dangereux : ici, il sous-estime la distance.",
          schema: repere([-1, 11, -1, 7], [{ q: [0.06, 0, 0] }, { pts: [[0, 0], [10, 3]], couleur: ORANGE }], [
            { x: 5, y: 1.5, label: "" },
            { x: 10, y: 6, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement"],
        },
        {
          titre: "Un smartphone d'occasion",
          enonce:
            "Le prix de revente d'un smartphone est modélisé par une fonction affine du temps $t$, en mois : $600$ € neuf, $420$ € au bout de $12$ mois (chiffres d'un modèle).\na) Déterminer l'expression $P(t)$.\nb) Quel est son sens de variation ? Interpréter le coefficient directeur.\nc) Au bout de combien de mois le modèle donne-t-il un prix nul ?",
          correction:
            "a) $P(0) = 600$, donc $b = 600$. $a = \\dfrac{420 - 600}{12 - 0} = \\dfrac{-180}{12} = -15$. Ainsi $P(t) = -15t + 600$.\nb) $a = -15 < 0$ : $P$ est décroissante. Le téléphone perd $15$ € de valeur par mois.\nc) $-15t + 600 = 0$ donne $t = \\dfrac{600}{15} = 40$ mois, un peu plus de trois ans.\n⭐ Dans la réalité, un téléphone garde souvent une petite valeur : le modèle affine s'arrête avant.",
          schema: ecranSeulement(repere([-1, 5, -1, 7], [{ q: [0, -1.5, 6] }], [
            { x: 1.2, y: 4.2, label: "" },
            { x: 4, y: 0, label: "" },
          ])),
          micros: ["lin_affine_expression", "lin_affine_variation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "Deux images données : on calcule $a$, le taux, puis $b$, puis on VÉRIFIE avec l'autre image.",
        "On interprète $a$ (une vitesse, avec son unité) et $b$ (la valeur de départ).",
        "Si les taux d'accroissement changent d'un intervalle à l'autre, la fonction n'est pas affine.",
      ],
      exercices: [
        {
          titre: "La fréquence cardiaque maximale",
          enonce:
            "En sport, on estime souvent la fréquence cardiaque maximale, en battements par minute, par la formule $F(x) = 220 - x$, où $x$ est l'âge en années. Pour un entraînement d'endurance, on vise $70$ % de ce maximum : $E(x) = 0{,}7 \\times (220 - x)$.\na) Calculer $F(16)$ et $E(16)$.\nb) Montrer que $E$ est une fonction affine : donner son coefficient directeur et son ordonnée à l'origine.\nc) Quel est le sens de variation de $F$ et de $E$ ? Interpréter.\nd) Calculer le taux d'accroissement de $E$ entre $20$ et $60$ ans.",
          correction:
            "a) $F(16) = 220 - 16 = 204$ battements par minute, et $E(16) = 0{,}7 \\times 204 = 142{,}8$, soit environ $143$.\nb) On développe : $E(x) = 0{,}7 \\times 220 - 0{,}7x = 154 - 0{,}7x$. C'est une fonction affine, avec $a = -0{,}7$ et $b = 154$.\nc) $F$ a pour coefficient directeur $-1$, et $E$ a pour coefficient directeur $-0{,}7$ : les deux sont décroissantes. Avec l'âge, le cœur bat moins vite à l'effort.\nd) $E(20) = 154 - 0{,}7 \\times 20 = 140$ et $E(60) = 154 - 0{,}7 \\times 60 = 112$. Taux : $\\dfrac{112 - 140}{60 - 20} = \\dfrac{-28}{40} = -0{,}7$. On retrouve le coefficient directeur.\n⭐ Le diagramme le montre : la fréquence visée baisse de $7$ battements tous les $10$ ans.\n⚠️ Cette formule est une estimation moyenne : d'une personne à l'autre, le vrai maximum varie.",
          schema: diagramme("barres", [
            { label: "20 ans", value: 140 },
            { label: "40 ans", value: 126 },
            { label: "60 ans", value: 112 },
          ]),
          micros: ["lin_affine_expression", "lin_affine_variation", "lin_affine_taux_accroissement"],
        },
        {
          titre: "Le salaire d'un commercial",
          enonce:
            "Un commercial touche chaque mois un fixe de $1\\,400$ € et une commission de $5$ % du chiffre d'affaires $x$ qu'il réalise, en euros.\na) Exprimer son salaire $S(x)$. Est-ce une fonction affine ?\nb) Calculer $S(10\\,000)$ et $S(30\\,000)$, puis le taux d'accroissement entre ces deux valeurs. L'interpréter.\nc) Quel est le sens de variation de $S$ ?\nd) Quel chiffre d'affaires lui faut-il pour gagner $2\\,000$ € ?",
          correction:
            "a) $5$ % de $x$, c'est $0{,}05x$ : $S(x) = 0{,}05x + 1\\,400$. C'est une fonction affine, avec $a = 0{,}05$ et $b = 1\\,400$.\nb) $S(10\\,000) = 0{,}05 \\times 10\\,000 + 1\\,400 = 1\\,900$ et $S(30\\,000) = 0{,}05 \\times 30\\,000 + 1\\,400 = 2\\,900$.\nTaux : $\\dfrac{2\\,900 - 1\\,900}{30\\,000 - 10\\,000} = \\dfrac{1\\,000}{20\\,000} = 0{,}05$ : chaque euro vendu rapporte $5$ centimes, soit $5$ € pour $100$ € vendus.\nc) $a = 0{,}05 > 0$ : $S$ est croissante.\nd) $0{,}05x + 1\\,400 = 2\\,000$ donne $0{,}05x = 600$, donc $x = \\dfrac{600}{0{,}05} = 12\\,000$ €.\n⚠️ Le taux d'accroissement n'est pas le salaire : $0{,}05$, c'est ce que rapporte UN euro vendu de plus.\nSur le dessin (en dizaines de milliers d'euros de ventes, en milliers d'euros de salaire), la droite part de $1{,}4$.",
          schema: repere([-1, 4, -1, 4], [{ q: [0, 0.5, 1.4] }], [
            { x: 1, y: 1.9, label: "" },
            { x: 3, y: 2.9, label: "" },
          ]),
          micros: ["lin_affine_expression", "lin_affine_taux_accroissement", "lin_affine_variation"],
        },
        {
          titre: "La fonte d'un névé",
          enonce:
            "Au printemps, en montagne, un névé fond. Son épaisseur, en cm, est une fonction affine $E$ du nombre de jours $t$ : $120$ cm le 1er mai ($t = 0$), $99$ cm trois jours plus tard (chiffres d'un modèle).\na) Calculer le taux d'accroissement de $E$ entre $0$ et $3$. L'interpréter.\nb) Déterminer $E(t)$ et son sens de variation.\nc) Quelle épaisseur reste-t-il au bout de $10$ jours ?\nd) Au bout de combien de jours le névé a-t-il disparu, selon ce modèle ?",
          correction:
            "a) $\\dfrac{99 - 120}{3 - 0} = \\dfrac{-21}{3} = -7$ : le névé perd $7$ cm par jour.\nb) $E(t) = -7t + 120$. Comme $a = -7 < 0$, $E$ est décroissante.\nc) $E(10) = -7 \\times 10 + 120 = 50$ cm.\nd) $-7t + 120 = 0$ donne $t = \\dfrac{120}{7} \\approx 17{,}1$ : le névé disparaît au cours du $18$e jour.\nSur le dessin (en dizaines de cm), la droite descend de $0{,}7$ carreau par jour.\n⚠️ Le taux est en cm PAR JOUR : on divise la perte, $21$ cm, par le nombre de jours, $3$.",
          schema: repere([-1, 15, -1, 13], [{ q: [0, -0.7, 12] }], [
            { x: 0, y: 12, label: "" },
            { x: 3, y: 9.9, label: "" },
            { x: 10, y: 5, label: "" },
          ], undefined, true),
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression", "lin_affine_variation"],
        },
        {
          titre: "Une ville nouvelle",
          enonce:
            "Une ville nouvelle est sortie de terre dans les années 1980. Le tableau donne sa population, en milliers d'habitants (chiffres d'un modèle). On note $P(x)$ la population, en milliers, $x$ années après 1990.\na) Calculer le taux d'accroissement de $P$ entre 1990 et 2000, puis entre 2000 et 2020. Que constate-t-on ?\nb) On suppose $P$ affine. Déterminer $P(x)$.\nc) Interpréter le coefficient directeur en habitants par an.\nd) Quelle population ce modèle prévoit-il en 2030 ?",
          figure: tableau(["année", "1990", "2000", "2010", "2020"], ["habitants (milliers)", 4, 7, 10, 13]),
          correction:
            "a) Entre 1990 et 2000 : $\\dfrac{7 - 4}{10} = 0{,}3$. Entre 2000 et 2020 : $\\dfrac{13 - 7}{20} = \\dfrac{6}{20} = 0{,}3$. Le taux est le même, quels que soient les deux instants : c'est la marque d'une fonction affine.\nb) $a = 0{,}3$ et $b = P(0) = 4$ : $P(x) = 0{,}3x + 4$.\nc) $0{,}3$ millier d'habitants par an, ce sont $300$ habitants de plus chaque année.\nd) 2030, c'est $x = 40$ : $P(40) = 0{,}3 \\times 40 + 4 = 16$, soit $16\\,000$ habitants.\nSur le dessin (en dizaines d'années et en milliers d'habitants), les quatre points sont alignés.\n⚠️ Le taux entre 2000 et 2020 se divise par $20$ ans, pas par $10$.",
          schema: ecranSeulement(repere([-1, 4, -1, 14], [{ q: [0, 3, 4] }], [
            { x: 0, y: 4, label: "" },
            { x: 1, y: 7, label: "" },
            { x: 2, y: 10, label: "" },
            { x: 3, y: 13, label: "" },
          ], undefined, true)),
          micros: ["lin_affine_taux_accroissement", "lin_affine_expression"],
        },
      ],
    },
  ],
};
