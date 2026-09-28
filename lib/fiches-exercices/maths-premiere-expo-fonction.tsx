// ─── Fiche d'exercices : la fonction exponentielle x ↦ aˣ (1re, sans spé) ────
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), troisième feuille. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts`.
//
// ⛔ LE PROGRAMME : x ↦ aˣ avec a > 0, pour x ⩾ 0 — le PROLONGEMENT d'une
// suite géométrique aux valeurs non entières. Propriétés algébriques ADMISES
// (aˣ⁺ʸ = aˣ × aʸ), exposant 1/n (racine n-ième). Pas l'exponentielle eˣ de
// la spécialité, pas de logarithme.
//
// ⭐⭐ LE FIL : UN EXPOSANT NON ENTIER A UN SENS, ET IL NE SE PARTAGE PAS. Les
// pièges nommés : x³ pris pour 3ˣ (1), 2⁰ lu 0 (2), 9^(1/2) lu 9/2 (6), une
// demi-période lue comme la moitié de l'effet (9, 11, 18), le taux divisé par
// le nombre de périodes (13, 17), doubler l'exposant pris pour doubler le
// coefficient (16), les pourcentages additionnés (12, 20).
//
// ⭐ Contextes : économie (abonnement 10, loyer 16, placement mensuel 17),
// physique (rayonnement et plomb 18), histoire-géo (population 12, exode
// rural 20), sport (chaîne vidéo de trail 13), écologie (polluant 15),
// nature (levures 9, pucerons 14, yaourt 19), santé (médicament 11). Chiffres
// = MODÈLES, aucun fait réel cité.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-fonction.mjs`.
//
// Micro-compétences : expo_fct_reconnaitre (1, 10, 14, 18, 20),
// expo_fct_calculer (2, 3, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// expo_fct_proprietes (4, 5, 8, 9, 11, 12, 15, 16, 17, 18, 19, 20),
// expo_fct_exposant_fractionnaire (6, 8, 9, 13, 14, 17, 18, 19). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoFonctionPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-fonction",
  titre: "La fonction exponentielle x ↦ aˣ",
  accroche:
    "Vingt exercices sur les fonctions x ↦ aˣ : les reconnaître, calculer une image même pour un x non entier, utiliser les propriétés des puissances et l'exposant 1/n. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec ses courbes et ses tableaux.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Une fonction exponentielle s'écrit $f(x) = a^x$, avec $a > 0$ : la base est FIXE, et c'est la variable $x$ qui est en exposant.",
        "Pour un entier : $a^3 = a \\times a \\times a$, et $a^0 = 1$. Pour $x$ non entier, $a^x$ se calcule à la calculatrice.",
        "Propriétés (admises) : $a^{x+y} = a^x \\times a^y$ et $a^{x-y} = \\dfrac{a^x}{a^y}$.",
        "$a^{\\frac{1}{n}}$ est le nombre positif dont la puissance $n$ vaut $a$. Par exemple $a^{\\frac{1}{2}} = \\sqrt{a}$.",
      ],
      exercices: [
        {
          enonce: "Parmi les fonctions suivantes, définies pour $x \\geq 0$, lesquelles sont des fonctions exponentielles ?\n$f(x) = 3^x$ ; $g(x) = x^3$ ; $h(x) = 3x$ ; $k(x) = 0{,}5^x$.",
          correction:
            "Dans une fonction exponentielle, la base est un nombre fixe positif, et $x$ est en EXPOSANT.\n$f(x) = 3^x$ : oui, de base $3$.\n$k(x) = 0{,}5^x$ : oui, de base $0{,}5$. Une base entre $0$ et $1$ est permise.\n$g(x) = x^3$ : non, c'est une fonction puissance. La variable est en BAS.\n$h(x) = 3x$ : non, c'est une fonction linéaire.\n⚠️ $3^x$ et $x^3$ se ressemblent, mais pour $x = 4$ : $3^4 = 81$ et $4^3 = 64$.\nSur le dessin, $3^x$ en bleu part de $1$, $x^3$ en orange part de $0$ : deux fonctions différentes.",
          schema: ecranSeulement(repere([-1, 3, -1, 10], [{ pts: [[0, 1], [0.25, 1.32], [0.5, 1.73], [0.75, 2.28], [1, 3], [1.25, 3.95], [1.5, 5.2], [1.75, 6.84], [2, 9]] }, { pts: [[0, 0], [0.25, 0.02], [0.5, 0.13], [0.75, 0.42], [1, 1], [1.25, 1.95], [1.5, 3.38], [1.75, 5.36], [2, 8]], couleur: ORANGE }], [], undefined, true)),
          micros: ["expo_fct_reconnaitre"],
        },
        {
          enonce: "Soit $f(x) = 2^x$. Calculer $f(0)$, $f(3)$ et $f(5)$.",
          correction:
            "$f(0) = 2^0 = 1$.\n$f(3) = 2^3 = 2 \\times 2 \\times 2 = 8$.\n$f(5) = 2^5 = 32$.\n⚠️ $f(0)$ ne vaut pas $0$ : toute fonction exponentielle vaut $1$ en $0$.\n⚠️ $2^5$ n'est pas $2 \\times 5 = 10$.",
          schema: ecranSeulement(tableau(["x", "0", "1", "2", "3", "4", "5"], ["2ˣ", 1, 2, 4, 8, 16, 32], true)),
          micros: ["expo_fct_calculer"],
        },
        {
          enonce: "Soit $f(x) = 0{,}5^x$. Calculer $f(0)$, $f(1)$, $f(2)$ et $f(3)$.",
          correction:
            "$f(0) = 1$ ; $f(1) = 0{,}5$ ; $f(2) = 0{,}5 \\times 0{,}5 = 0{,}25$ ; $f(3) = 0{,}125$.\n⭐ Avec une base entre $0$ et $1$, les valeurs DIMINUENT : chaque fois que $x$ augmente de $1$, on prend la moitié.\n⚠️ Elles restent strictement positives : $0{,}5^x$ n'est jamais nul.\nSur le dessin, la courbe de $0{,}5^x$ descend vers l'axe sans le toucher.",
          schema: ecranSeulement(repere([-1, 4, -1, 2], [{ pts: [[0, 1], [0.5, 0.71], [1, 0.5], [1.5, 0.35], [2, 0.25], [2.5, 0.18], [3, 0.13]] }], [{ x: 1, y: 0.5 }, { x: 2, y: 0.25 }, { x: 3, y: 0.125 }])),
          micros: ["expo_fct_calculer"],
        },
        {
          enonce: "Écrire $2^3 \\times 2^4$ sous la forme d'une seule puissance de $2$, puis calculer.",
          correction:
            "Même base : on ADDITIONNE les exposants. $2^3 \\times 2^4 = 2^{3+4} = 2^7$.\n$2^7 = 128$.\n✔️ Vérification : $2^3 \\times 2^4 = 8 \\times 16 = 128$.\n⚠️ Pas $2^{12}$ : on n'additionne pas en multipliant les exposants. Et pas $4^7$ : la base ne change pas.",
          schema: ecranSeulement(tableau(["exposant", "3", "4", "3 + 4 = 7"], ["2 puissance", 8, 16, 128])),
          micros: ["expo_fct_proprietes"],
        },
        {
          enonce: "Sans calculatrice, calculer $5^{1{,}5} \\times 5^{0{,}5}$.",
          correction:
            "Les exposants ne sont pas entiers, mais la propriété reste vraie : $5^{1{,}5} \\times 5^{0{,}5} = 5^{1{,}5 + 0{,}5} = 5^2 = 25$.\n⭐ Aucun des deux facteurs n'est « simple » ; leur produit, si.\n✔️ À la calculatrice : $5^{1{,}5} \\approx 11{,}18$ et $5^{0{,}5} \\approx 2{,}236$. Leur produit fait bien environ $25$.",
          schema: ecranSeulement(tableau(["facteur", "5 puissance 1,5", "5 puissance 0,5", "produit"], ["valeur", 11.18, 2.236, 25])),
          micros: ["expo_fct_proprietes"],
        },
        {
          enonce: "Calculer, sans calculatrice : $9^{\\frac{1}{2}}$, $8^{\\frac{1}{3}}$ et $16^{\\frac{1}{4}}$.",
          correction:
            "$9^{\\frac{1}{2}}$ est le nombre positif dont le carré vaut $9$ : c'est $3$, car $3^2 = 9$.\n$8^{\\frac{1}{3}}$ est le nombre positif dont le cube vaut $8$ : c'est $2$, car $2^3 = 8$.\n$16^{\\frac{1}{4}}$ est le nombre positif dont la puissance $4$ vaut $16$ : c'est $2$, car $2^4 = 16$.\n⚠️ $9^{\\frac{1}{2}}$ n'est pas $\\dfrac{9}{2} = 4{,}5$ : l'exposant $\\dfrac{1}{2}$ veut dire « racine carrée », pas « moitié ».",
          schema: ecranSeulement(tableau(["nombre", "9 puissance 1/2", "8 puissance 1/3", "16 puissance 1/4"], ["valeur", 3, 2, 2])),
          micros: ["expo_fct_exposant_fractionnaire"],
        },
        {
          enonce: "Soit $f(x) = 1{,}5^x$. Calculer $f(2)$, puis, à la calculatrice, $f(2{,}5)$ au centième.",
          correction:
            "$f(2) = 1{,}5^2 = 2{,}25$.\n$f(2{,}5) = 1{,}5^{2{,}5} \\approx 2{,}76$.\n⭐ $2{,}5$ n'est pas un entier : on ne peut pas « multiplier $2{,}5$ fois ». C'est la fonction exponentielle qui donne un sens à $1{,}5^{2{,}5}$, entre $f(2) = 2{,}25$ et $f(3) = 3{,}375$.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 6], [{ pts: [[0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38], [3.5, 4.13], [4, 5.06]] }], [
              { x: 2, y: 2.25 },
              { x: 2.5, y: 2.76 },
            ]),
          ),
          micros: ["expo_fct_calculer"],
        },
        {
          enonce: "a) Calculer $2^{\\frac{1}{2}} \\times 2^{\\frac{1}{2}}$ avec la propriété $a^x \\times a^y = a^{x+y}$. En déduire une autre écriture de $2^{\\frac{1}{2}}$.\nb) Calculer $4^{1{,}5}$ sans calculatrice.",
          correction:
            "a) $2^{\\frac{1}{2}} \\times 2^{\\frac{1}{2}} = 2^{\\frac{1}{2} + \\frac{1}{2}} = 2^1 = 2$.\n$2^{\\frac{1}{2}}$ est donc le nombre positif dont le carré vaut $2$ : $2^{\\frac{1}{2}} = \\sqrt{2} \\approx 1{,}414$.\nb) $1{,}5 = 1 + 0{,}5$, donc $4^{1{,}5} = 4^1 \\times 4^{0{,}5} = 4 \\times \\sqrt{4} = 4 \\times 2 = 8$.\n⚠️ $4^{1{,}5}$ n'est pas $4 \\times 1{,}5 = 6$.",
          micros: ["expo_fct_exposant_fractionnaire", "expo_fct_proprietes"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Écrire la fonction, calculer à la calculatrice, justifier avec les propriétés.",
      rappel: [
        "Une quantité qui augmente de $t$ % par an vaut, au bout de $x$ années, départ $\\times \\left(1 + \\dfrac{t}{100}\\right)^x$ : même pour $x$ non entier.",
        "$f(x + 1) = a \\times f(x)$ : quand $x$ augmente de $1$, on multiplie par la base $a$.",
        "Un coefficient $C$ obtenu en $n$ périodes correspond à $C^{\\frac{1}{n}}$ par période.",
        "À la calculatrice, un exposant fraction s'écrit entre parenthèses.",
      ],
      exercices: [
        {
          titre: "Des levures qui triplent",
          enonce:
            "Dans une cuve, une population de levures est multipliée par $3$ toutes les heures (modèle). Au départ, on compte $1$ million de levures. Au bout de $x$ heures, il y en a $f(x) = 3^x$ millions.\na) Compléter le tableau (au centième).\nb) Que signifie $f(1{,}5)$ ? Tracer l'allure de la courbe de $f$.\nc) Montrer, sans calculatrice, que $f(0{,}5) = \\sqrt{3}$.",
          figure: tableau(["x (heures)", "0", "0,5", "1", "1,5", "2"], ["f(x)", "1", "?", "3", "?", "9"]),
          correction:
            "a) $f(0{,}5) = 3^{0{,}5} \\approx 1{,}73$ et $f(1{,}5) = 3^{1{,}5} \\approx 5{,}20$.\nb) $f(1{,}5) \\approx 5{,}20$ : au bout d'une heure et demie, il y a environ $5{,}2$ millions de levures.\nOn place les points du tableau et on les relie par une courbe : la fonction est définie pour tous les $x \\geq 0$, pas seulement pour les heures entières.\nc) $f(0{,}5) \\times f(0{,}5) = 3^{0{,}5 + 0{,}5} = 3^1 = 3$ : $f(0{,}5)$ est le nombre positif dont le carré vaut $3$, soit $\\sqrt{3}$.\n⚠️ En une demi-heure, les levures ne sont pas multipliées par $1{,}5$, la moitié de $3$, mais par $\\sqrt{3} \\approx 1{,}73$.",
          schema: repere([-1, 3, -1, 10], [{ pts: [[0, 1], [0.25, 1.32], [0.5, 1.73], [0.75, 2.28], [1, 3], [1.25, 3.95], [1.5, 5.2], [1.75, 6.84], [2, 9]] }], [
            { x: 0.5, y: 1.73 },
            { x: 1.5, y: 5.2 },
          ], undefined, true),
          micros: ["expo_fct_calculer", "expo_fct_exposant_fractionnaire", "expo_fct_proprietes"],
        },
        {
          titre: "Le prix d'un abonnement",
          enonce:
            "Un abonnement de transport coûte $600$ € par an aujourd'hui. On prévoit une hausse de $3$ % par an (modèle).\na) Parmi $P(x) = 600 + 3x$, $P(x) = 600 \\times 1{,}03^x$ et $P(x) = 600 \\times 3^x$, quelle fonction donne le prix au bout de $x$ années ?\nb) Calculer $P(4)$ et $P(2{,}5)$ au centime. Que représente $P(2{,}5)$ ?",
          correction:
            "a) $+3$ % par an, c'est multiplier par $1{,}03$ chaque année : $P(x) = 600 \\times 1{,}03^x$.\n$600 + 3x$ ajoute $3$ €, pas $3$ %. $600 \\times 3^x$ triplerait le prix chaque année.\nb) $P(4) = 600 \\times 1{,}03^4 \\approx 675{,}31$ €.\n$P(2{,}5) = 600 \\times 1{,}03^{2{,}5} \\approx 646{,}02$ € : le prix au bout de deux ans et demi, si la hausse se fait progressivement au fil des mois.\n⭐ Une suite ne donnait le prix qu'aux années entières ; la fonction le donne à tout moment.",
          schema: ecranSeulement(tableau(["année", "0", "1", "2", "2,5", "3"], ["prix (€)", 600, 618, 636.54, 646.02, 655.64])),
          micros: ["expo_fct_reconnaitre", "expo_fct_calculer"],
        },
        {
          titre: "Un médicament dans le sang",
          enonce:
            "Après une injection, la concentration d'un médicament dans le sang, en mg/L, est $C(x) = 20 \\times 0{,}75^x$, où $x$ est le temps en heures (modèle).\na) Calculer $C(0)$, $C(1)$ et $C(2)$. Interpréter $C(0)$.\nb) Montrer que $C(x + 1) = 0{,}75 \\times C(x)$. Que signifie cette égalité ?\nc) Calculer $C(0{,}5)$ au centième.",
          correction:
            "a) $C(0) = 20$ : la concentration juste après l'injection, $20$ mg/L. $C(1) = 20 \\times 0{,}75 = 15$ ; $C(2) = 20 \\times 0{,}5625 = 11{,}25$.\nb) $C(x + 1) = 20 \\times 0{,}75^{x+1} = 20 \\times 0{,}75^x \\times 0{,}75 = 0{,}75 \\times C(x)$.\nChaque heure, la concentration est multipliée par $0{,}75$ : elle baisse de $25$ % par heure.\nc) $C(0{,}5) = 20 \\times 0{,}75^{0{,}5} \\approx 17{,}32$ mg/L.\n⚠️ En une demi-heure, elle ne baisse pas de $12{,}5$ %, la moitié de $25$ % : $\\dfrac{17{,}32}{20} \\approx 0{,}866$, soit une baisse d'environ $13{,}4$ %.",
          schema: tableau(["heures", "0", "0,5", "1", "2"], ["C (mg/L)", 20, 17.32, 15, 11.25]),
          micros: ["expo_fct_calculer", "expo_fct_proprietes"],
        },
        {
          titre: "Une population qui double",
          enonce:
            "En 1950, un pays compte $10$ millions d'habitants ; sa population augmente de $2$ % par an (modèle). Au bout de $x$ années, elle vaut $P(x) = 10 \\times 1{,}02^x$ millions.\na) Calculer $P(35)$ au dixième. Que remarque-t-on ?\nb) Sans calculatrice, en écrivant $1{,}02^{70} = 1{,}02^{35} \\times 1{,}02^{35}$, estimer $P(70)$. En quelle année est-on ?\nc) Vérifier à la calculatrice.",
          correction:
            "a) $P(35) = 10 \\times 1{,}02^{35} \\approx 20{,}0$ millions : la population a doublé en $35$ ans.\nb) $1{,}02^{35} \\approx 2$, donc $1{,}02^{70} = 1{,}02^{35} \\times 1{,}02^{35} \\approx 2 \\times 2 = 4$.\n$P(70) \\approx 10 \\times 4 = 40$ millions, en $1950 + 70 = 2020$.\nc) $10 \\times 1{,}02^{70} \\approx 40{,}0$. ✔️\n⭐ Doubler en $35$ ans, puis encore doubler en $35$ ans : on a multiplié par $4$, pas par $3$.\n⚠️ $2$ % par an pendant $70$ ans ne font pas $140$ % : c'est environ $300$ % de hausse.",
          schema: diagramme("barres", [
            { label: "1950", value: 10 },
            { label: "1985", value: 20 },
            { label: "2020", value: 40 },
          ]),
          micros: ["expo_fct_calculer", "expo_fct_proprietes"],
        },
        {
          titre: "Une chaîne vidéo de trail",
          enonce:
            "Les abonnés d'une chaîne vidéo consacrée au trail doublent tous les $4$ mois (modèle). On cherche le coefficient multiplicateur MENSUEL $a$, supposé constant.\na) Expliquer pourquoi $a^4 = 2$. En déduire $a = 2^{\\frac{1}{4}}$, et en donner une valeur approchée au millième.\nb) Quel est le taux d'évolution mensuel ?\nc) Un fan pense : « Ils doublent en $4$ mois, donc c'est $+25$ % par mois. » Qu'en penser ?",
          correction:
            "a) En $4$ mois, on multiplie $4$ fois par $a$ : $a \\times a \\times a \\times a = a^4$. Ce coefficient vaut $2$ : $a^4 = 2$.\n$a$ est le nombre positif dont la puissance $4$ vaut $2$ : $a = 2^{\\frac{1}{4}} \\approx 1{,}189$.\nb) $1{,}189 = 1 + 0{,}189$ : environ $+18{,}9$ % par mois.\nc) $1{,}25^4 \\approx 2{,}44$ : avec $+25$ % par mois, on ferait bien plus que doubler.\n⚠️ Diviser $100$ % par $4$ ne donne pas le taux mensuel : les hausses se multiplient.\nSur le tableau, avec $1\\,000$ abonnés au départ : ils doublent tous les $4$ mois.",
          schema: ecranSeulement(tableau(["mois", "0", "4", "8", "12"], ["abonnés", 1000, 2000, 4000, 8000])),
          micros: ["expo_fct_exposant_fractionnaire", "expo_fct_calculer"],
        },
        {
          titre: "Des pucerons sur un rosier",
          enonce:
            "Le tableau donne le nombre de pucerons sur un rosier, en milliers, en fonction du temps $x$ en semaines (modèle).\na) Montrer qu'on peut modéliser ce nombre par $f(x) = 5 \\times 3^x$.\nb) Calculer $f(0{,}5)$ au dixième. Interpréter.\nc) Que vaudrait $f(4)$ ? Pourquoi le jardinier a-t-il intérêt à agir vite ?",
          figure: tableau(["x (semaines)", "0", "1", "2", "3"], ["pucerons (milliers)", 5, 15, 45, 135]),
          correction:
            "a) $f(0) = 5 \\times 3^0 = 5$ ; $f(1) = 15$ ; $f(2) = 5 \\times 9 = 45$ ; $f(3) = 5 \\times 27 = 135$ : ce sont les valeurs du tableau.\nOn passe d'une semaine à la suivante en multipliant par $3$ : c'est bien une exponentielle de base $3$.\nb) $f(0{,}5) = 5 \\times 3^{0{,}5} = 5\\sqrt{3} \\approx 8{,}7$ milliers, soit environ $8\\,660$ pucerons au bout d'une demi-semaine.\n⚠️ À la demi-semaine, on n'est pas « à mi-chemin » entre $5$ et $15$, soit $10$ : on a multiplié par $\\sqrt{3} \\approx 1{,}73$.\nc) $f(4) = 5 \\times 81 = 405$ milliers de pucerons. Chaque semaine d'attente TRIPLE le problème.",
          micros: ["expo_fct_reconnaitre", "expo_fct_calculer", "expo_fct_exposant_fractionnaire"],
        },
        {
          titre: "Un lac qui se dépollue",
          enonce:
            "Après la fermeture d'une usine, la concentration d'un polluant dans un lac diminue de $10$ % par an (modèle). Elle vaut $C(x) = 80 \\times 0{,}9^x$ microgrammes par litre au bout de $x$ années.\na) Calculer $C(2)$ et $C(5)$ au dixième.\nb) Montrer que $C(x + 2) = 0{,}81 \\times C(x)$. Que signifie cette égalité ?\nc) Calculer $C(0{,}5)$ au dixième. La concentration a-t-elle baissé de $5$ % en six mois ?",
          correction:
            "a) $C(2) = 80 \\times 0{,}81 = 64{,}8$ ; $C(5) = 80 \\times 0{,}9^5 \\approx 47{,}2$ µg/L.\nb) $C(x + 2) = 80 \\times 0{,}9^{x+2} = 80 \\times 0{,}9^x \\times 0{,}9^2 = 0{,}81 \\times C(x)$.\nEn deux ans, quelle que soit la date de départ, la concentration baisse de $19$ %.\n⚠️ Pas de $20$ % : $0{,}9 \\times 0{,}9 = 0{,}81$.\nc) $C(0{,}5) = 80 \\times 0{,}9^{0{,}5} \\approx 75{,}9$ µg/L. $\\dfrac{75{,}9}{80} \\approx 0{,}949$ : une baisse d'environ $5{,}1$ %, un peu plus que $5$ %.\nSur le dessin, la concentration est en dizaines de µg/L.",
          schema: repere([-1, 7, -1, 9], [{ pts: [[0, 8], [1, 7.2], [2, 6.48], [3, 5.83], [4, 5.25], [5, 4.72], [6, 4.25]] }], [
            { x: 2, y: 6.48 },
            { x: 5, y: 4.72 },
          ]),
          micros: ["expo_fct_calculer", "expo_fct_proprietes"],
        },
        {
          titre: "Un loyer sur vingt ans",
          enonce:
            "Un loyer augmente de $3$ % par an (modèle) : au bout de $x$ années, il est multiplié par $1{,}03^x$. On donne $1{,}03^{10} \\approx 1{,}344$.\na) Sans calculer $1{,}03^{20}$ directement, l'estimer grâce à une propriété.\nb) Un loyer vaut $700$ € en 2025. L'estimer en 2045.\nc) Vérifier à la calculatrice.",
          correction:
            "a) $1{,}03^{20} = 1{,}03^{10+10} = 1{,}03^{10} \\times 1{,}03^{10} \\approx 1{,}344 \\times 1{,}344 \\approx 1{,}806$.\nb) 2045, c'est $20$ ans plus tard : $700 \\times 1{,}806 \\approx 1\\,264$ €.\nc) $1{,}03^{20} \\approx 1{,}806$. ✔️\n⚠️ Doubler l'exposant ne double pas le coefficient : $1{,}806$ n'est pas $2 \\times 1{,}344 = 2{,}688$.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "2025", value: 700 },
              { label: "2035", value: 940.8 },
              { label: "2045", value: 1264 },
            ]),
          ),
          micros: ["expo_fct_proprietes", "expo_fct_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "On écrit la fonction : valeur de départ $\\times$ base$^x$.",
        "Pour $x$ non entier, la calculatrice ; pour relier deux dates, la propriété $a^{x+y} = a^x \\times a^y$.",
        "Un coefficient $C$ obtenu en $n$ périodes correspond à $C^{\\frac{1}{n}}$ par période : on ne divise pas le taux par $n$.",
      ],
      exercices: [
        {
          titre: "Un taux par mois",
          enonce:
            "Une banque affiche un placement à $4$ % par an. On cherche le taux MENSUEL équivalent : celui qui, appliqué $12$ fois, donne $+4$ %.\na) Soit $a$ le coefficient mensuel. Justifier que $a^{12} = 1{,}04$, puis que $a = 1{,}04^{\\frac{1}{12}}$.\nb) Calculer $a$ à $0{,}00001$ près. Quel est le taux mensuel, en % ?\nc) Un client pense que le taux mensuel est de $\\dfrac{4}{12}$ %. Que donneraient $12$ mois à ce taux ?\nd) Pour $10\\,000$ € placés, quel capital au bout de $18$ mois ?",
          correction:
            "a) Douze mois de suite, on multiplie par $a$ : $a^{12}$. Ce coefficient doit être celui de l'année, $1{,}04$.\n$a$ est le nombre positif dont la puissance $12$ vaut $1{,}04$ : $a = 1{,}04^{\\frac{1}{12}}$.\nb) $a \\approx 1{,}00327$ : un taux mensuel d'environ $0{,}327$ %.\nc) $\\dfrac{4}{12} \\approx 0{,}333$ % par mois : $1{,}00333^{12} \\approx 1{,}0407$, soit environ $+4{,}07$ % sur l'année. C'est un peu trop.\n⚠️ Diviser le taux annuel par $12$ surestime : les hausses mensuelles se multiplient, elles ne s'additionnent pas.\nd) $18$ mois, c'est $1{,}5$ an : $10\\,000 \\times 1{,}04^{1{,}5} \\approx 10\\,605{,}96$ €.\n⭐ Avec les mois, on trouve la même chose : $a^{18} = a^{12} \\times a^{6}$, soit $1{,}04 \\times 1{,}04^{0{,}5}$.",
          schema: tableau(["mois", "0", "6", "12", "18"], ["capital (€)", 10000, 10198.04, 10400, 10605.96]),
          micros: ["expo_fct_exposant_fractionnaire", "expo_fct_proprietes", "expo_fct_calculer"],
        },
        {
          titre: "Un écran de plomb",
          enonce:
            "Un rayonnement traverse une plaque de plomb. On admet (modèle) que chaque centimètre de plomb laisse passer la moitié du rayonnement qui l'atteint : la fraction qui traverse une épaisseur de $x$ cm est $f(x) = 0{,}5^x$.\na) De quel type de fonction s'agit-il ? Calculer $f(1)$, $f(2)$ et $f(3)$.\nb) En utilisant $f(0{,}5) \\times f(0{,}5) = f(1)$, calculer $f(0{,}5)$ au millième. Un demi-centimètre arrête-t-il un quart du rayonnement ?\nc) En déduire $f(1{,}5)$ sans calculatrice, puis vérifier.\nd) Tracer l'allure de la courbe de $f$ sur l'intervalle $[0 ; 4]$.",
          correction:
            "a) C'est une fonction exponentielle, de base $0{,}5$. $f(1) = 0{,}5$ ; $f(2) = 0{,}25$ ; $f(3) = 0{,}125$.\nb) $f(0{,}5) \\times f(0{,}5) = 0{,}5$ : $f(0{,}5) = \\sqrt{0{,}5} \\approx 0{,}707$. Un demi-centimètre laisse passer environ $70{,}7$ % du rayonnement : il en arrête environ $29{,}3$ %, plus qu'un quart.\n⚠️ Le « bon sens » dirait : un demi-centimètre fait la moitié de l'effet, donc $75$ % passent. C'est faux : l'effet se MULTIPLIE, il ne se partage pas.\nc) $f(1{,}5) = f(1) \\times f(0{,}5) \\approx 0{,}5 \\times 0{,}707 \\approx 0{,}354$. La calculatrice donne $0{,}5^{1{,}5} \\approx 0{,}354$. ✔️\nd) Sur le dessin, les fractions sont en dixièmes : la courbe part de $10$, passe par $5$ en $x = 1$, et descend de moins en moins vite.",
          schema: repere([-1, 5, -1, 11], [{ pts: [[0, 10], [0.5, 7.07], [1, 5], [1.5, 3.54], [2, 2.5], [2.5, 1.77], [3, 1.25], [3.5, 0.88], [4, 0.63]] }], [
            { x: 0.5, y: 7.07 },
            { x: 1, y: 5 },
          ], undefined, true),
          micros: ["expo_fct_reconnaitre", "expo_fct_calculer", "expo_fct_proprietes", "expo_fct_exposant_fractionnaire"],
        },
        {
          titre: "Le yaourt maison",
          enonce:
            "Pour faire du yaourt, on ajoute des bactéries au lait. Dans ce modèle, leur nombre est multiplié par $8$ en $3$ heures, toujours au même rythme. Au départ, on en compte $1$ million par mL.\na) Soit $a$ le coefficient multiplicateur horaire. Justifier que $a^3 = 8$ et en déduire $a$.\nb) On note $N(x) = a^x$ le nombre de bactéries, en millions par mL, au bout de $x$ heures. Calculer $N(0{,}5)$ et $N(2{,}5)$ au centième.\nc) Montrer que $N(x + 1) = 2 \\times N(x)$ et interpréter.\nd) Au bout de combien de temps y a-t-il $4$ millions de bactéries par mL ? $32$ millions ?",
          correction:
            "a) En $3$ heures, on multiplie trois fois par $a$ : $a^3 = 8$. Donc $a = 8^{\\frac{1}{3}} = 2$, car $2^3 = 8$.\nb) $N(x) = 2^x$. $N(0{,}5) = \\sqrt{2} \\approx 1{,}41$ et $N(2{,}5) = 2^2 \\times 2^{0{,}5} = 4\\sqrt{2} \\approx 5{,}66$ millions par mL.\nc) $N(x + 1) = 2^{x+1} = 2^x \\times 2 = 2 \\times N(x)$ : le nombre de bactéries double chaque heure.\nd) $2^2 = 4$ : au bout de $2$ heures. $2^5 = 32$ : au bout de $5$ heures.\n⚠️ En $3$ heures, on multiplie par $8$, mais pas par $\\dfrac{8}{3}$ chaque heure : $\\left(\\dfrac{8}{3}\\right)^3 \\approx 19$, bien trop.",
          schema: repere([-1, 4, -1, 9], [{ pts: [[0, 1], [0.5, 1.41], [1, 2], [1.5, 2.83], [2, 4], [2.5, 5.66], [3, 8]] }], [
            { x: 2, y: 4 },
            { x: 2.5, y: 5.66 },
          ]),
          micros: ["expo_fct_exposant_fractionnaire", "expo_fct_proprietes", "expo_fct_calculer"],
        },
        {
          titre: "Un village qui se vide",
          enonce:
            "Au XXe siècle, l'exode rural vide de nombreux villages. Un village compte $1\\,200$ habitants en 1950 ; on modélise sa population, $x$ années après 1950, par $P(x) = 1\\,200 \\times 0{,}98^x$.\na) Quelle évolution annuelle ce modèle traduit-il ?\nb) Calculer $P(10)$, $P(30)$ et $P(50)$ à l'unité. À quelles années correspondent-ils ?\nc) Montrer que $P(x + 10) \\approx 0{,}817 \\times P(x)$. Que perd le village à chaque décennie ?\nd) Le maire dit : « Nous perdons $2$ % par an : en $50$ ans, cela fait $100$ %, il ne restera personne. » A-t-il raison ?",
          correction:
            "a) $0{,}98 = 1 - 0{,}02$ : la population baisse de $2$ % par an.\nb) $P(10) \\approx 980$ (en 1960) ; $P(30) \\approx 655$ (en 1980) ; $P(50) \\approx 437$ habitants (en 2000).\nc) $P(x + 10) = 1\\,200 \\times 0{,}98^x \\times 0{,}98^{10} = 0{,}98^{10} \\times P(x)$, et $0{,}98^{10} \\approx 0{,}817$.\nÀ chaque décennie, le village perd environ $18{,}3$ % de ses habitants.\nd) Non. $\\dfrac{P(50)}{1\\,200} = 0{,}98^{50} \\approx 0{,}364$ : il reste environ $36$ % des habitants.\n⚠️ Les pourcentages de baisse ne s'additionnent pas : chaque année, on perd $2$ % de ce qui RESTE. Dans le modèle, la population ne tombe jamais à $0$.",
          schema: diagramme("barres", [
            { label: "1950", value: 1200 },
            { label: "1960", value: 980 },
            { label: "1980", value: 655 },
            { label: "2000", value: 437 },
          ]),
          micros: ["expo_fct_reconnaitre", "expo_fct_calculer", "expo_fct_proprietes"],
        },
      ],
    },
  ],
};
