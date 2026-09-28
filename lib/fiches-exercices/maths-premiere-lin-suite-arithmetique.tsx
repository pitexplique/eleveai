// ─── Fiche d'exercices : suite arithmétique, reconnaître (1re, sans spé) ──────
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts` :
// reconnaître, relation de récurrence, notation u(n) puis uₙ, terme d'un rang
// donné. Le terme GÉNÉRAL (uₙ = u₀ + nr comme formule en n, sens de variation)
// est la feuille suivante, `maths-premiere-lin-suite-terme-general.tsx`.
//
// ⭐⭐ LE FIL : ON AJOUTE TOUJOURS LE MÊME NOMBRE. Reconnaître une suite
// arithmétique, c'est calculer TOUS les écarts ; la raison est « suivant moins
// précédent », négative quand la suite descend. Et on compte les PAS : de u₀ à
// u₁₀, dix pas ; de u₁ à u₂₀, dix-neuf.
// Pièges nommés : raison négative (2, 11, 19), multiplier n'est pas ajouter (3,
// 7, 17), u(n+1) n'est pas u(n) + 1 (5), un pas de trop quand on part de u₁
// (8, 15, 18), l'année en indice (12), arbres plantés et total (10).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes. Les termes sont des POINTS
// alignés dans un repère (1, 9, 11, 13, 17) : l'alignement se voit. Contextes :
// tirelire, forêt replantée, club de handball, ruches, entraînement, ligne de
// tramway (géographie), natation, température et altitude (physique), haies,
// cantine, salaires. Chiffres = MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-suite-arithmetique.mjs`.
//
// Micro-compétences : lin_suite_reconnaitre (1, 2, 3, 7, 9, 10, 11, 13, 16, 17,
// 19), lin_suite_recurrence (4, 7, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20),
// lin_suite_notation (5, 8, 9, 12, 17, 19), lin_suite_terme_rang (6, 8, 9, 10,
// 11, 12, 14, 15, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les points qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const GRIS = "#94a3b8";

export const exercicesLinSuiteArithmetiquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-suite-arithmetique",
  titre: "Suite arithmétique : reconnaître",
  accroche:
    "Vingt exercices pour reconnaître une suite arithmétique, trouver sa raison, écrire sa relation de récurrence et calculer un terme de rang donné. Les termes sont dessinés : quand ils sont alignés, la suite est arithmétique. Un rappel de cours avant chaque niveau, une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On calcule, on conclut.",
      rappel: [
        "Une suite est ARITHMÉTIQUE quand on passe d'un terme au suivant en ajoutant toujours le même nombre $r$ : la raison.",
        "La relation de récurrence : $u(n+1) = u(n) + r$, qu'on écrit aussi $u_{n+1} = u_n + r$.",
        "$u(n)$ et $u_n$ désignent le même nombre : le terme de RANG $n$. $u_0$ est le premier terme, $u_1$ le deuxième.",
        "Pour reconnaître une suite arithmétique, on calcule TOUS les écarts $u_1 - u_0$, $u_2 - u_1$… : ils doivent être égaux.",
      ],
      exercices: [
        {
          enonce: "Les premiers termes d'une suite sont $3$ ; $5$ ; $7$ ; $9$ ; $11$. Est-elle arithmétique ? Si oui, donner sa raison.",
          correction:
            "On calcule l'écart entre deux termes qui se suivent : $5 - 3 = 2$, $7 - 5 = 2$, $9 - 7 = 2$, $11 - 9 = 2$.\nTous les écarts valent $2$ : la suite est arithmétique, de raison $r = 2$.\nSur le dessin, les points $(n ; u_n)$ sont ALIGNÉS : c'est la marque d'une suite arithmétique.\n⚠️ Un seul écart ne suffit pas : il faut les vérifier tous.",
          schema: repere([-1, 5, -1, 13], [{ q: [0, 2, 3], couleur: GRIS }], [
            { x: 0, y: 3, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 7, label: "" },
            { x: 3, y: 9, label: "" },
            { x: 4, y: 11, label: "" },
          ], undefined, true),
          micros: ["lin_suite_reconnaitre"],
        },
        {
          enonce: "Les premiers termes d'une suite sont $50$ ; $45$ ; $40$ ; $35$. Est-elle arithmétique ? Quelle est sa raison ?",
          correction:
            "Écarts : $45 - 50 = -5$, $40 - 45 = -5$, $35 - 40 = -5$.\nIls sont tous égaux : la suite est arithmétique, de raison $r = -5$.\nSur le dessin (un carreau pour $5$), chaque marche orange DESCEND d'un carreau : c'est le $-5$.\n⚠️ Le piège : écrire $50 - 45 = 5$. On calcule toujours « terme SUIVANT moins terme PRÉCÉDENT ». La suite descend : sa raison est négative.",
          schema: repere([-1, 4, -1, 11], [{ q: [0, -1, 10], couleur: GRIS }, { pts: [[0, 10], [1, 10], [1, 9], [2, 9], [2, 8], [3, 8], [3, 7]], couleur: ORANGE }], [
            { x: 0, y: 10, label: "" },
            { x: 1, y: 9, label: "" },
            { x: 2, y: 8, label: "" },
            { x: 3, y: 7, label: "" },
          ], undefined, true),
          micros: ["lin_suite_reconnaitre"],
        },
        {
          enonce: "La suite $1$ ; $2$ ; $4$ ; $8$ est-elle arithmétique ?",
          correction:
            "Écarts : $2 - 1 = 1$, puis $4 - 2 = 2$, puis $8 - 4 = 4$.\nIls ne sont pas égaux : la suite n'est PAS arithmétique.\nIci, on passe d'un terme au suivant en MULTIPLIANT par $2$ : c'est une suite géométrique.\nSur le dessin, les points ne sont pas alignés : la ligne orange se redresse.\n⚠️ Ajouter toujours le même nombre, ou multiplier toujours par le même nombre : ce sont deux croissances différentes.",
          schema: repere([-1, 4, -1, 9], [{ pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 2, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 3, y: 8, label: "" },
          ]),
          micros: ["lin_suite_reconnaitre"],
        },
        {
          enonce: "Une suite est définie par $u(0) = 3$ et, pour tout entier naturel $n$, $u(n+1) = u(n) + 4$. Calculer $u(1)$, $u(2)$ et $u(3)$.",
          correction:
            "La relation dit : pour obtenir le terme suivant, on ajoute $4$.\n$u(1) = u(0) + 4 = 3 + 4 = 7$.\n$u(2) = u(1) + 4 = 7 + 4 = 11$.\n$u(3) = u(2) + 4 = 11 + 4 = 15$.\n⭐ C'est une suite arithmétique de premier terme $3$ et de raison $4$.\n⚠️ Avec la récurrence, on avance pas à pas : pour $u(3)$, il faut d'abord $u(1)$ et $u(2)$.\nLe tableau le montre : chaque case vaut la précédente plus $4$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3"], ["u(n)", 3, 7, 11, 15])),
          micros: ["lin_suite_recurrence"],
        },
        {
          enonce: "On note $u(n)$ le terme de rang $n$ d'une suite. Écrire en notation indicielle $u(3)$, $u(n+1)$ et $u(n) + 1$. Les deux dernières écritures désignent-elles le même nombre ?",
          correction:
            "$u(3)$ s'écrit $u_3$ : le terme de rang $3$.\n$u(n+1)$ s'écrit $u_{n+1}$ : le terme qui SUIT $u_n$, au rang $n + 1$.\n$u(n) + 1$ s'écrit $u_n + 1$ : le terme de rang $n$, auquel on ajoute $1$.\nCe n'est pas le même nombre. Exemple avec la suite de l'exercice 4 : $u_1 = 7$, mais $u_0 + 1 = 4$.\nDans le tableau, $u(0 + 1) = u(1) = 7$ se lit une colonne plus loin ; $u(0) + 1 = 4$ n'y figure pas.\n⚠️ L'indice est une PLACE dans la liste, pas un nombre qu'on ajoute au terme.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2"], ["u(n)", 3, 7, 11])),
          micros: ["lin_suite_notation"],
        },
        {
          enonce: "Une suite arithmétique a pour premier terme $u_0 = 20$ et pour raison $r = 3$. Calculer $u_{10}$.",
          correction:
            "De $u_0$ à $u_{10}$, on fait $10$ pas, et chaque pas ajoute $3$.\n$u_{10} = u_0 + 10 \\times 3 = 20 + 30 = 50$.\n✔️ Les premiers termes le confirment : $u_1 = 23$, $u_2 = 26$… on ajoute bien $3$ à chaque fois.\nSur le dessin (en dizaines), la grande marche orange : on avance de $10$ rangs et on monte de $10 \\times 3 = 30$, soit $3$ carreaux.\n⚠️ De $u_0$ à $u_{10}$, il y a $10$ pas, ni $9$ ni $11$ : on compte les PAS, pas les termes.",
          schema: repere([-1, 11, -1, 6], [{ q: [0, 0.3, 2], couleur: GRIS }, { pts: [[0, 2], [10, 2], [10, 5]], couleur: ORANGE }], [
            { x: 0, y: 2, label: "" },
            { x: 10, y: 5, label: "" },
          ], undefined, true),
          micros: ["lin_suite_terme_rang"],
        },
        {
          enonce: "Parmi ces relations, lesquelles définissent une suite arithmétique ? Donner alors sa raison.\na) $u_{n+1} = u_n + 7$\nb) $u_{n+1} = 2u_n$\nc) $u_{n+1} = u_n + n$\nd) $u_{n+1} = u_n - 0{,}5$",
          correction:
            "a) On ajoute toujours $7$ : arithmétique, de raison $7$.\nb) On MULTIPLIE par $2$ : ce n'est pas une suite arithmétique.\nc) On ajoute $n$, qui change à chaque rang : $0$, puis $1$, puis $2$… Ce n'est pas toujours le même nombre : pas arithmétique.\nd) On ajoute toujours $-0{,}5$ : arithmétique, de raison $-0{,}5$.\nSur le dessin, la suite c) en partant de $u_0 = 1$ : $1$ ; $1$ ; $2$ ; $4$ ; $7$. Les marches grandissent, les points ne sont pas alignés.\n⚠️ Le piège est c) : il y a bien une addition, mais ce qu'on ajoute doit être une CONSTANTE.",
          schema: ecranSeulement(repere([-1, 5, -1, 8], [{ pts: [[0, 1], [1, 1], [2, 2], [3, 4], [4, 7]], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 1, label: "" },
            { x: 2, y: 2, label: "" },
            { x: 3, y: 4, label: "" },
            { x: 4, y: 7, label: "" },
          ])),
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence"],
        },
        {
          enonce: "Une suite arithmétique commence au rang $1$ : $u_1 = 5$, et sa raison vaut $2$. Calculer $u_{20}$.",
          correction:
            "De $u_1$ à $u_{20}$, on fait $20 - 1 = 19$ pas.\n$u_{20} = u_1 + 19 \\times 2 = 5 + 38 = 43$.\n⚠️ Le piège : écrire $5 + 20 \\times 2 = 45$. Quand la suite commence à $u_1$, il y a un pas de moins que le rang.\nDans le tableau, $u_3 = 5 + 2 \\times 2 = 9$ : au rang $3$, deux pas seulement.\n⭐ Toujours se demander : combien de PAS entre le terme connu et le terme cherché ?",
          schema: ecranSeulement(tableau(["n", "1", "2", "3", "20"], ["u(n)", 5, 7, 9, 43])),
          micros: ["lin_suite_terme_rang", "lin_suite_notation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la situation par une suite, puis répondre avec l'unité.",
      rappel: [
        "Dans un problème, $u_0$ (ou $u_1$) est la valeur de DÉPART ; la raison est ce qui s'ajoute, ou se retire, à chaque étape : chaque semaine, chaque année, chaque séance.",
        "« Augmente de $15$ € par semaine » : raison $15$. « Perd $10$ licenciés par an » : raison $-10$.",
        "Pour sauter directement au rang $n$ : $u_n = u_0 + n \\times r$, car de $u_0$ à $u_n$ il y a $n$ pas.",
      ],
      exercices: [
        {
          titre: "Une tirelire",
          enonce:
            "Léa a $60$ € dans sa tirelire et y ajoute $15$ € chaque semaine. On note $u(n)$ la somme, en euros, au bout de $n$ semaines.\na) Calculer $u(0)$, $u(1)$ et $u(2)$.\nb) La suite $u$ est-elle arithmétique ? Donner sa raison et la relation entre $u(n+1)$ et $u(n)$.\nc) Écrire $u(4)$ en notation indicielle, puis le calculer.",
          correction:
            "a) $u(0) = 60$ : la somme de départ. $u(1) = 60 + 15 = 75$ et $u(2) = 75 + 15 = 90$.\nb) Chaque semaine, on ajoute la même somme : la suite est arithmétique, de raison $15$, et $u(n+1) = u(n) + 15$.\nc) $u(4)$ s'écrit $u_4$ : la somme au bout de $4$ semaines. $u_4 = 60 + 4 \\times 15 = 120$ €.\nSur le dessin (en dizaines d'euros), chaque semaine fait monter le point d'un carreau et demi, et les points restent alignés.\n⚠️ $u(0)$ est la somme AVANT la première semaine : le rang $0$ n'est pas « rien ».",
          schema: repere([-1, 5, -1, 13], [], [
            { x: 0, y: 6, label: "" },
            { x: 1, y: 7.5, label: "" },
            { x: 2, y: 9, label: "" },
            { x: 3, y: 10.5, label: "" },
            { x: 4, y: 12, label: "" },
          ], undefined, true),
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence", "lin_suite_notation", "lin_suite_terme_rang"],
        },
        {
          titre: "Une forêt replantée",
          enonce:
            "Une commune replante une forêt. Le tableau donne le nombre d'arbres $u_n$, $n$ années après le début du projet (chiffres d'un modèle).\na) Montrer que ce sont les premiers termes d'une suite arithmétique.\nb) Écrire la relation de récurrence.\nc) Si le rythme se maintient, combien d'arbres la forêt comptera-t-elle au bout de $10$ ans ?",
          figure: tableau(["année n", "0", "1", "2", "3"], ["arbres", 1200, 1300, 1400, 1500]),
          correction:
            "a) $1\\,300 - 1\\,200 = 100$, $1\\,400 - 1\\,300 = 100$, $1\\,500 - 1\\,400 = 100$ : on ajoute toujours $100$. La suite est arithmétique, de raison $100$.\nb) $u_{n+1} = u_n + 100$, avec $u_0 = 1\\,200$.\nc) De $u_0$ à $u_{10}$, il y a $10$ pas de $100$ : $u_{10} = 1\\,200 + 10 \\times 100 = 2\\,200$. Au bout de $10$ ans, la forêt comptera $2\\,200$ arbres.\n⚠️ « Montrer » demande les TROIS écarts, pas un seul.\n⭐ En $10$ ans, on a planté $1\\,000$ arbres, mais la forêt en compte $2\\,200$ : ne pas confondre les arbres plantés et le total.",
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Un club qui perd des licenciés",
          enonce:
            "Un club de handball compte $120$ licenciés. Chaque année, il en perd $10$ (chiffres d'un modèle). On note $u_n$ le nombre de licenciés au bout de $n$ années.\na) Donner $u_0$ et la relation de récurrence.\nb) La suite est-elle arithmétique ? Quelle est sa raison ?\nc) Calculer $u_5$ et dire ce qu'il représente.",
          correction:
            "a) $u_0 = 120$, et chaque année on retire $10$ : $u_{n+1} = u_n - 10$.\nb) Oui : on ajoute toujours le même nombre, $-10$. La raison est $r = -10$.\nc) $u_5 = 120 + 5 \\times (-10) = 120 - 50 = 70$ : au bout de $5$ ans, le club compte $70$ licenciés.\nSur le dessin (en dizaines de licenciés), les points descendent d'un carreau par an, alignés.\n⚠️ « Perdre $10$ » donne une raison NÉGATIVE : $r = -10$, et non $10$.",
          schema: repere([-1, 6, -1, 13], [{ q: [0, -1, 12], couleur: GRIS }], [
            { x: 0, y: 12, label: "" },
            { x: 1, y: 11, label: "" },
            { x: 2, y: 10, label: "" },
            { x: 3, y: 9, label: "" },
            { x: 4, y: 8, label: "" },
            { x: 5, y: 7, label: "" },
          ], undefined, true),
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Les ruches d'un apiculteur",
          enonce:
            "Un apiculteur possède $40$ ruches en 2024 et en ajoute $6$ chaque année (chiffres d'un modèle). On note $u(n)$ le nombre de ruches l'année $2024 + n$.\na) Que représente $u(3)$ ? Le lire dans le tableau.\nb) Écrire, en notation indicielle, le nombre de ruches en 2030, puis le calculer.\nc) Écrire la relation de récurrence en notation indicielle.",
          figure: tableau(["année", "2024", "2025", "2026", "2027"], ["ruches", 40, 46, 52, 58]),
          correction:
            "a) $u(3)$ est le nombre de ruches l'année $2024 + 3 = 2027$ : $u(3) = 58$.\nb) 2030, c'est $2024 + 6$ : le rang est $n = 6$. Le nombre de ruches s'écrit $u_6$, et $u_6 = 40 + 6 \\times 6 = 76$.\nc) $u_{n+1} = u_n + 6$, avec $u_0 = 40$.\n⚠️ Le piège : écrire $u_{2030}$. L'indice est le RANG, le nombre d'années depuis 2024, pas l'année.\n⭐ $u(6)$ et $u_6$ : deux écritures, un seul nombre.",
          micros: ["lin_suite_notation", "lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Deux plans d'entraînement",
          enonce:
            "Deux coureurs préparent une course. Voici la durée, en minutes, de leur sortie longue pendant quatre semaines.\nPlan A : $20$ ; $25$ ; $30$ ; $35$.\nPlan B : $20$ ; $22$ ; $26$ ; $32$.\na) Lequel de ces plans suit une suite arithmétique ?\nb) Pour ce plan, quelle serait la durée la cinquième semaine ?",
          correction:
            "a) Plan A : $25 - 20 = 5$, $30 - 25 = 5$, $35 - 30 = 5$. Toujours $5$ : arithmétique, de raison $5$.\nPlan B : $22 - 20 = 2$, $26 - 22 = 4$, $32 - 26 = 6$. Les écarts grandissent : pas arithmétique.\nb) Plan A, cinquième semaine : $35 + 5 = 40$ minutes.\nSur le dessin (un carreau pour $5$ minutes), la droite bleue passe par tous les points du plan A ; la ligne orange du plan B se courbe.\n⚠️ Les deux plans partent de $20$ minutes et montent tous les deux : seul le calcul des écarts les départage.",
          schema: repere([-1, 4, -1, 8], [{ q: [0, 1, 4] }, { pts: [[0, 4], [1, 4.4], [2, 5.2], [3, 6.4]], couleur: ORANGE }], [
            { x: 0, y: 4, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 6, label: "" },
            { x: 3, y: 7, label: "" },
            { x: 1, y: 4.4, label: "" },
            { x: 2, y: 5.2, label: "" },
            { x: 3, y: 6.4, label: "" },
          ]),
          micros: ["lin_suite_reconnaitre"],
        },
        {
          titre: "Une ligne de tramway",
          enonce:
            "Une ville construit une ligne de tramway : $3$ km sont en service en 2025, et l'on en ouvre $2$ km de plus chaque année (chiffres d'un modèle). On note $u_n$ la longueur en service, en km, l'année $2025 + n$.\na) Écrire la relation de récurrence et calculer $u_1$ et $u_2$.\nb) Quelle longueur sera en service en 2035 ?",
          correction:
            "a) $u_0 = 3$ et $u_{n+1} = u_n + 2$. Donc $u_1 = 3 + 2 = 5$ et $u_2 = 5 + 2 = 7$.\nb) 2035, c'est le rang $n = 10$ : $u_{10} = 3 + 10 \\times 2 = 23$. En 2035, la ligne aura $23$ km en service.\n⚠️ De 2025 à 2035, il s'écoule $10$ ans, et non $11$ : l'année 2025 est le rang $0$.",
          schema: ecranSeulement(repere([-1, 5, -1, 13], [], [
            { x: 0, y: 3, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 7, label: "" },
            { x: 3, y: 9, label: "" },
            { x: 4, y: 11, label: "" },
          ], undefined, true)),
          micros: ["lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Le nageur",
          enonce:
            "Un nageur allonge sa distance de $50$ m à chaque séance. À la séance $1$, il nage $800$ m. On note $u_n$ la distance de la séance $n$.\na) Calculer $u_2$ et $u_3$.\nb) Quelle distance nagera-t-il à la séance $12$ ?",
          correction:
            "a) $u_2 = 800 + 50 = 850$ m et $u_3 = 850 + 50 = 900$ m.\nb) De la séance $1$ à la séance $12$, il y a $12 - 1 = 11$ pas : $u_{12} = 800 + 11 \\times 50 = 1\\,350$ m.\n⚠️ Ici, la suite commence à $u_1$ : calculer $12 \\times 50$ compterait une séance de trop.\n✔️ Le tableau montre les premières séances : on ajoute bien $50$ à chaque fois.",
          schema: ecranSeulement(tableau(["séance n", "1", "2", "3", "4"], ["distance (m)", 800, 850, 900, 950])),
          micros: ["lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Monter en altitude",
          enonce:
            "En montagne, on modélise ainsi la température : il fait $15$ °C au pied, à $0$ m d'altitude, et la température baisse de $0{,}6$ °C tous les $100$ m de montée. On note $u_n$ la température après $n$ centaines de mètres.\na) Justifier que $u$ est une suite arithmétique. Donner $u_0$ et sa raison.\nb) Calculer la température à $1\\,000$ m, puis à $2\\,500$ m.",
          correction:
            "a) Tous les $100$ m, on ajoute le même nombre, $-0{,}6$ : la suite est arithmétique, avec $u_0 = 15$ et $r = -0{,}6$.\nb) $1\\,000$ m, ce sont $10$ centaines de mètres : $u_{10} = 15 + 10 \\times (-0{,}6) = 15 - 6 = 9$. Il fait $9$ °C.\n$2\\,500$ m, c'est le rang $25$ : $u_{25} = 15 - 25 \\times 0{,}6 = 15 - 15 = 0$. Il fait $0$ °C.\n⚠️ Le rang n'est pas l'altitude : $u_{1000}$ n'a pas de sens ici, puisqu'un pas vaut $100$ m.\n⭐ Ce modèle est une moyenne : le vent, le soleil ou l'humidité le font varier.",
          schema: ecranSeulement(tableau(["altitude (m)", "0", "1 000", "2 000", "2 500"], ["température (°C)", 15, 9, 3, 0])),
          micros: ["lin_suite_reconnaitre", "lin_suite_terme_rang"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent.",
      rappel: [
        "On nomme la suite et ce qu'elle compte, puis on donne son premier terme, sa raison et sa relation de récurrence.",
        "Arithmétique : on AJOUTE toujours le même nombre. Si l'on MULTIPLIE toujours par le même nombre, par exemple pour un pourcentage, la suite n'est plus arithmétique.",
        "On répond par une phrase, avec l'unité et l'année.",
      ],
      exercices: [
        {
          titre: "Des haies pour la biodiversité",
          enonce:
            "Une association plante des haies pour abriter oiseaux et insectes. Elle en compte $800$ m en 2025. Deux projets sont étudiés (chiffres d'un modèle).\nProjet A : planter $150$ m de plus chaque année.\nProjet B : augmenter la longueur de $10$ % chaque année.\nOn note $a_n$ et $b_n$ les longueurs, en mètres, l'année $2025 + n$.\na) Calculer $a_1$, $a_2$, $b_1$ et $b_2$.\nb) Laquelle des deux suites est arithmétique ? Justifier, puis écrire sa relation de récurrence.\nc) Avec le projet A, quelle longueur de haies en 2031 ? Écrire ce terme en notation fonctionnelle et en notation indicielle.",
          correction:
            "a) Projet A : $a_1 = 800 + 150 = 950$ et $a_2 = 950 + 150 = 1\\,100$.\nProjet B : augmenter de $10$ %, c'est multiplier par $1{,}1$. $b_1 = 800 \\times 1{,}1 = 880$ et $b_2 = 880 \\times 1{,}1 = 968$.\nb) Pour A, l'écart vaut toujours $150$ : la suite est arithmétique, de raison $150$, et $a_{n+1} = a_n + 150$.\nPour B, les écarts valent $880 - 800 = 80$ puis $968 - 880 = 88$ : ils changent, la suite n'est pas arithmétique.\nc) 2031, c'est le rang $6$ : on cherche $a(6)$, qu'on écrit aussi $a_6$. $a_6 = 800 + 6 \\times 150 = 1\\,700$.\nEn 2031, le projet A donnerait $1\\,700$ m de haies.\nSur le dessin (en centaines de mètres), les points de A sont sur la droite bleue ; ceux de B, sur la ligne orange, montent de plus en plus vite.\n⚠️ « $+10$ % » n'est pas « $+80$ m chaque année » : $10$ % d'une longueur qui grandit, c'est chaque année un peu plus de mètres.",
          schema: repere([-1, 4, -1, 13], [{ q: [0, 1.5, 8] }, { pts: [[0, 8], [1, 8.8], [2, 9.68], [3, 10.648]], couleur: ORANGE }], [
            { x: 0, y: 8, label: "" },
            { x: 1, y: 9.5, label: "" },
            { x: 2, y: 11, label: "" },
            { x: 3, y: 12.5, label: "" },
            { x: 1, y: 8.8, label: "" },
            { x: 2, y: 9.68, label: "" },
            { x: 3, y: 10.648, label: "" },
          ], undefined, true),
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence", "lin_suite_notation", "lin_suite_terme_rang"],
        },
        {
          titre: "Préparer une course",
          enonce:
            "Pour préparer une course, Inès court $12$ km la première semaine, puis $3$ km de plus chaque semaine. On note $u_n$ la distance courue la semaine $n$, avec $u_1 = 12$.\na) Calculer $u_2$ et $u_3$, puis écrire la relation de récurrence.\nb) Quelle distance court-elle la semaine $8$ ?\nc) Son ami calcule : « semaine $10$ : $12 + 10 \\times 3 = 42$ km ». Trouver son erreur, puis corriger.",
          correction:
            "a) $u_2 = 12 + 3 = 15$ et $u_3 = 15 + 3 = 18$. La relation : $u_{n+1} = u_n + 3$.\nb) De la semaine $1$ à la semaine $8$, il y a $7$ pas : $u_8 = 12 + 7 \\times 3 = 33$. La semaine $8$, elle court $33$ km.\nc) De la semaine $1$ à la semaine $10$, il y a $9$ pas, et non $10$ : $u_{10} = 12 + 9 \\times 3 = 39$ km.\nSon ami a compté un pas de trop : c'est l'erreur classique quand la suite commence à $u_1$.\n⭐ Le tableau le montre : la semaine $1$ n'a encore rien ajouté aux $12$ km.",
          schema: tableau(["semaine n", "1", "2", "3", "4", "5"], ["km", 12, 15, 18, 21, 24]),
          micros: ["lin_suite_recurrence", "lin_suite_terme_rang"],
        },
        {
          titre: "Moins de déchets à la cantine",
          enonce:
            "Un collège réduit les déchets de sa cantine. Le diagramme donne la masse de déchets, en kg, des quatre premiers mois de l'année scolaire (chiffres d'un modèle). On note $u_n$ la masse $n$ mois après septembre, donc $u_0 = 540$.\na) Montrer que ces valeurs sont les premiers termes d'une suite arithmétique. Quelle est sa raison ?\nb) Écrire la relation de récurrence.\nc) Écrire en notation indicielle la masse de déchets en juin, puis la calculer.\nd) Que donnerait ce modèle pour $n = 36$ ? Qu'en penser ?",
          figure: diagramme("barres", [
            { label: "sept.", value: 540 },
            { label: "oct.", value: 525 },
            { label: "nov.", value: 510 },
            { label: "déc.", value: 495 },
          ]),
          correction:
            "a) $525 - 540 = -15$, $510 - 525 = -15$, $495 - 510 = -15$ : on ajoute toujours $-15$. La suite est arithmétique, de raison $-15$.\nb) $u_{n+1} = u_n - 15$.\nc) Juin vient $9$ mois après septembre : c'est $u_9$. $u_9 = 540 + 9 \\times (-15) = 540 - 135 = 405$. En juin, la cantine produirait $405$ kg de déchets.\nd) $u_{36} = 540 - 36 \\times 15 = 540 - 540 = 0$ : plus aucun déchet au bout de trois ans.\nC'est irréaliste : un modèle arithmétique ne vaut que sur une période limitée.\n⚠️ De septembre à juin, on compte $9$ mois, pas $10$.",
          micros: ["lin_suite_reconnaitre", "lin_suite_recurrence", "lin_suite_notation", "lin_suite_terme_rang"],
        },
        {
          titre: "Deux offres d'emploi",
          enonce:
            "Deux entreprises proposent un poste (chiffres d'un modèle).\nOffre A : $1\\,800$ € par mois la première année, puis $60$ € de plus chaque année.\nOffre B : $1\\,950$ € par mois la première année, puis $30$ € de plus chaque année.\nOn note $a_n$ et $b_n$ les salaires mensuels, en euros, après $n$ années d'ancienneté : $a_0 = 1\\,800$ et $b_0 = 1\\,950$.\na) Écrire les deux relations de récurrence.\nb) Calculer $a_5$ et $b_5$. Que remarque-t-on ?\nc) Quelle offre paie le mieux après $10$ ans ? Et au début ?",
          correction:
            "a) $a_{n+1} = a_n + 60$ et $b_{n+1} = b_n + 30$ : deux suites arithmétiques, de raisons $60$ et $30$.\nb) $a_5 = 1\\,800 + 5 \\times 60 = 2\\,100$ et $b_5 = 1\\,950 + 5 \\times 30 = 2\\,100$ : au bout de $5$ ans, les deux salaires sont ÉGAUX.\nc) $a_{10} = 1\\,800 + 10 \\times 60 = 2\\,400$ et $b_{10} = 1\\,950 + 10 \\times 30 = 2\\,250$ : après $10$ ans, l'offre A paie $150$ € de plus par mois.\nAu début, c'est l'inverse : l'offre B paie $150$ € de plus.\nLe tableau donne l'écart entre les deux salaires : il gagne $30$ € chaque année.\n⭐ Le salaire de départ compte au début ; la raison compte sur la durée.",
          schema: tableau(["années n", "0", "5", "10"], ["écart A − B (€)", -150, 0, 150]),
          micros: ["lin_suite_recurrence", "lin_suite_terme_rang"],
        },
      ],
    },
  ],
};
