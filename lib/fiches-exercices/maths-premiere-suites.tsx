// ─── Fiche d'exercices : les suites numériques (1re spé) ─────────────────────
//                              20 exercices corrigés
//
// Quatrième feuille du format (17/09/2026), après l'exponentielle, le second
// degré et les variations. Alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/suites.bank.ts`, renforcée le
// matin même de neuf générateurs.
//
// ⭐⭐ LE FIL : UNE SUITE SE DÉCRIT DE DEUX FAÇONS, ET ELLES NE SE VALENT PAS.
// Par récurrence, on sait passer d'un terme au suivant mais il faut tous les
// calculer. Explicitement, on saute directement au rang voulu. Tout le chapitre
// consiste à passer de la première à la seconde — et quand on ne sait pas le
// faire directement, on passe par une SUITE AUXILIAIRE.
//
// ⭐ CE QUE CETTE FEUILLE FAIT ET QUE LE COACH NE FAISAIT PAS avant ce matin :
// - on MONTRE qu'une suite est arithmétique ou géométrique (exercices 9 et 10),
//   au lieu de seulement la reconnaître ;
// - on CALCULE une somme (11, 12, 19), au lieu de réciter sa formule ;
// - on traite la SUITE AUXILIAIRE en entier (16 et 20), l'exercice type de fin
//   de chapitre — c'est la micro `suite_auxiliaire`, créée le 17/09.
//
// ⭐ Les corrigés DESSINENT la frise des termes (canvas `suite`) là où le
// mécanisme compte : voir `schema` dans lib/fiches-exercices/types.ts.
//
// ⛔ Écrit simplement : c'est la règle de la fille de Frédéric, en tête de
// lib/fiches/types.ts. Une phrase par idée, le mot de la classe.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-suites.mjs`.
//
// Micro-compétences : suite_termes (1), suite_recurrence (2), suite_arithmetique
// (3, 9), suite_geometrique (4, 10), suite_variation (5, 13), suite_registres
// (6, 20), suite_evolution (7, 17, 18), suite_sommes (8, 11), suite_somme_geo
// (12, 19), suite_algorithme (14, 17), suite_modeliser (15, 18),
// suite_auxiliaire (16, 20), suite_limite (16, 20). 13/13.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/**
 * La frise des premiers termes, avec ce qu'on fait pour passer de l'un à l'autre.
 * ⛔ `premierRang: 0` — toutes les suites de cette feuille commencent à u(0), et
 * sans lui la frise appellerait « terme 3 » ce que le corrigé nomme u(2).
 */
function frise(terms: Array<number | string>, arrows?: string[], rule?: string) {
  return (
    <CanvasRenderer
      figure={{
        kind: "suite",
        premierRang: 0,
        terms,
        arrows,
        rule,
        display: { showArrows: Boolean(arrows), showRule: Boolean(rule), showLabels: true },
      }}
    />
  );
}

export const exercicesSuitesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "suites",
  titre: "Les suites numériques",
  accroche:
    "Vingt exercices, du calcul d'un terme au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/premiere-spe/suites",
      titre: "Les suites numériques",
    },
  ],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Écriture EXPLICITE : $u_n$ se calcule directement à partir de $n$. On remplace $n$ par sa valeur.",
        "Écriture par RÉCURRENCE : $u_{n+1}$ se calcule à partir de $u_n$. Il faut tous les termes précédents.",
        "Suite ARITHMÉTIQUE : on AJOUTE toujours le même nombre $r$. Alors $u_n = u_0 + rn$.",
        "Suite GÉOMÉTRIQUE : on MULTIPLIE toujours par le même nombre $q$. Alors $u_n = u_0 \\times q^{n}$.",
      ],
      exercices: [
        {
          enonce: "Soit $u_n = 3n + 5$. Calculer $u_0$, $u_1$ et $u_{10}$.",
          correction:
            "L'écriture est explicite : on remplace $n$ par la valeur demandée.\n$u_0 = 3 \\times 0 + 5 = 5$.\n$u_1 = 3 \\times 1 + 5 = 8$.\n$u_{10} = 3 \\times 10 + 5 = 35$.\n⭐ On a calculé $u_{10}$ sans passer par les neuf termes d'avant : c'est tout l'intérêt de l'écriture explicite.",
          micros: ["suite_termes"],
        },
        {
          enonce: "Soit $u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Calculer $u_1$, $u_2$ et $u_3$.",
          correction:
            "L'écriture est par récurrence : chaque terme se calcule à partir du précédent.\n$u_1 = 3 \\times 2 - 1 = 5$.\n$u_2 = 3 \\times 5 - 1 = 14$.\n$u_3 = 3 \\times 14 - 1 = 41$.\n⚠️ On ne peut pas sauter directement à $u_3$ : il faut passer par $u_1$ et $u_2$. C'est la limite de cette écriture.",
          schema: frise([2, 5, 14, 41], ["×3 −1", "×3 −1", "×3 −1"], "u(n+1) = 3u(n) − 1"),
          micros: ["suite_recurrence"],
        },
        {
          enonce: "Soit $u_n = 4n - 7$. Cette suite est-elle arithmétique ? Si oui, donner sa raison et son premier terme.",
          correction:
            "On calcule la différence entre deux termes qui se suivent.\n$u_{n+1} = 4(n+1) - 7 = 4n + 4 - 7 = 4n - 3$.\n$u_{n+1} - u_n = (4n - 3) - (4n - 7) = 4$.\nLa différence vaut $4$ quel que soit $n$ : la suite est ARITHMÉTIQUE, de raison $r = 4$.\nSon premier terme est $u_0 = 4 \\times 0 - 7 = -7$.\n⚠️ La raison est $4$, pas $-7$ : c'est le nombre qui multiplie $n$.",
          micros: ["suite_arithmetique"],
        },
        {
          enonce: "Soit $u_n = 5 \\times 2^{n}$. Cette suite est-elle géométrique ? Si oui, donner sa raison et son premier terme.",
          correction:
            "On calcule le quotient d'un terme par le précédent.\n$u_{n+1} = 5 \\times 2^{n+1} = 5 \\times 2^{n} \\times 2$.\n$\\dfrac{u_{n+1}}{u_n} = \\dfrac{5 \\times 2^{n} \\times 2}{5 \\times 2^{n}} = 2$.\nLe quotient vaut $2$ quel que soit $n$ : la suite est GÉOMÉTRIQUE, de raison $q = 2$.\nSon premier terme est $u_0 = 5 \\times 2^{0} = 5 \\times 1 = 5$.\n⚠️ $2^{0} = 1$, donc $u_0 = 5$ et non $0$.",
          schema: frise([5, 10, 20, 40, 80], ["×2", "×2", "×2", "×2"], "u(n) = 5 × 2ⁿ"),
          micros: ["suite_geometrique"],
        },
        {
          enonce: "Soit $u_n = -3n + 10$. La suite est-elle croissante ou décroissante ?",
          correction:
            "On calcule $u_{n+1} - u_n$.\n$u_{n+1} = -3(n+1) + 10 = -3n - 3 + 10$.\n$u_{n+1} - u_n = -3$.\nLa différence est NÉGATIVE : chaque terme est plus petit que le précédent. La suite est décroissante.\n⭐ Pour une suite arithmétique, le signe de la raison suffit : $r > 0$ croissante, $r < 0$ décroissante.",
          micros: ["suite_variation"],
        },
        {
          enonce:
            "Une suite est décrite ainsi : « on part de $100$, et on ajoute $15$ à chaque rang ».\na) Écrire cette suite par récurrence.\nb) Écrire cette suite explicitement.",
          correction:
            "a) « On part de $100$ » donne $u_0 = 100$. « On ajoute $15$ » donne $u_{n+1} = u_n + 15$.\nb) Au rang $n$, on a ajouté $15$ exactement $n$ fois : $u_n = 100 + 15n$.\n⭐ Les deux écritures décrivent la MÊME suite. La première dit comment avancer, la seconde permet d'arriver directement au rang voulu.",
          schema: frise([100, 115, 130, 145], ["+15", "+15", "+15"], "u(n) = 100 + 15n"),
          micros: ["suite_registres"],
        },
        {
          enonce: "Un loyer de $200$ € augmente de $8\\,\\%$ par an. Par quel nombre multiplie-t-on chaque année ? Quel sera le loyer au bout de $3$ ans ? (arrondir au centime)",
          correction:
            "Augmenter de $8\\,\\%$, c'est multiplier par $1 + \\dfrac{8}{100} = 1{,}08$.\nLa suite est géométrique de raison $1{,}08$ et de premier terme $200$.\nAu bout de $3$ ans : $200 \\times 1{,}08^{3} = 200 \\times 1{,}259712 \\approx 251{,}94$ €.\n⛔ Le piège : ajouter trois fois $8\\,\\%$ de $200$, c'est-à-dire $248$ €. C'est faux, car chaque année le pourcentage porte sur un loyer déjà augmenté.",
          micros: ["suite_evolution"],
        },
        {
          enonce: "Calculer $1 + 2 + 3 + \\ldots + 50$.",
          correction:
            "On regroupe les termes par paires : le premier avec le dernier, le deuxième avec l'avant-dernier.\nChaque paire vaut $50 + 1 = 51$, et il y a $50$ termes.\nEn écrivant la somme à l'endroit puis à l'envers, on obtient le DOUBLE de la somme : $50 \\times 51 = 2550$.\nDonc $1 + 2 + \\ldots + 50 = \\dfrac{50 \\times 51}{2} = 1275$.\n⭐ La formule $\\dfrac{n(n+1)}{2}$ n'est que l'écriture de ce raisonnement.",
          micros: ["suite_sommes"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "MONTRER qu'une suite est arithmétique : calculer $u_{n+1} - u_n$ et vérifier que le résultat ne dépend plus de $n$.",
        "MONTRER qu'elle est géométrique : calculer $\\dfrac{u_{n+1}}{u_n}$ et vérifier que le résultat ne dépend plus de $n$.",
        "Somme arithmétique : nombre de termes $\\times$ la moyenne du premier et du dernier. ⚠️ De $u_0$ à $u_n$, il y a $n+1$ termes.",
        "Somme géométrique : $1 + q + \\ldots + q^{n} = \\dfrac{q^{n+1} - 1}{q - 1}$ quand $q \\neq 1$.",
      ],
      exercices: [
        {
          enonce: "Soit $u_n = 7 - 2n$. Montrer que $(u_n)$ est arithmétique, puis donner sa raison et son premier terme.",
          correction:
            "Pour montrer qu'une suite est arithmétique, on calcule la différence entre deux termes qui se suivent.\n$u_{n+1} = 7 - 2(n+1) = 7 - 2n - 2 = 5 - 2n$.\n$u_{n+1} - u_n = (5 - 2n) - (7 - 2n) = 5 - 2n - 7 + 2n = -2$.\nCette différence vaut $-2$ quel que soit $n$ : la suite est donc arithmétique, de raison $r = -2$.\nSon premier terme est $u_0 = 7$.\n⛔ Écrire « c'est du premier degré en $n$, donc c'est arithmétique » ne démontre rien. C'est le calcul de $u_{n+1} - u_n$ qui fait la preuve.",
          micros: ["suite_arithmetique"],
        },
        {
          enonce: "Soit $u_n = 3 \\times 4^{n}$. Montrer que $(u_n)$ est géométrique, puis donner sa raison et son premier terme.",
          correction:
            "Pour montrer qu'une suite est géométrique, on calcule le quotient d'un terme par le précédent.\n$u_{n+1} = 3 \\times 4^{n+1}$.\nOn utilise $4^{n+1} = 4^{n} \\times 4$, donc $u_{n+1} = 3 \\times 4^{n} \\times 4$.\n$\\dfrac{u_{n+1}}{u_n} = \\dfrac{3 \\times 4^{n} \\times 4}{3 \\times 4^{n}} = 4$.\nCe quotient vaut $4$ quel que soit $n$ : la suite est géométrique, de raison $q = 4$ et de premier terme $u_0 = 3$.\n⚠️ On divise, on ne soustrait pas : la différence $u_{n+1} - u_n$ dépendrait encore de $n$.",
          micros: ["suite_geometrique"],
        },
        {
          enonce: "$(u_n)$ est arithmétique, de premier terme $u_0 = 5$ et de raison $3$. Calculer la somme $u_0 + u_1 + \\ldots + u_{20}$.",
          correction:
            "On compte d'abord les termes : de $u_0$ à $u_{20}$, il y a $21$ termes.\nOn calcule le dernier : $u_{20} = 5 + 20 \\times 3 = 65$.\nLa somme vaut : nombre de termes $\\times$ la moyenne du premier et du dernier.\n$S = 21 \\times \\dfrac{5 + 65}{2} = 21 \\times 35 = 735$.\n⛔ L'erreur la plus fréquente est de compter $20$ termes au lieu de $21$. Le rang $0$ est un terme comme les autres.",
          micros: ["suite_sommes"],
        },
        {
          enonce: "Calculer $1 + 2 + 4 + 8 + \\ldots + 2^{10}$.",
          correction:
            "Chaque terme est le double du précédent : c'est une somme géométrique de raison $q = 2$.\nLe dernier terme est $2^{10}$, donc la somme va de $q^{0}$ à $q^{10}$ : il y a $11$ termes.\nOn applique $1 + q + \\ldots + q^{n} = \\dfrac{q^{n+1} - 1}{q - 1}$ avec $q = 2$ et $n = 10$.\n$S = \\dfrac{2^{11} - 1}{2 - 1} = 2048 - 1 = 2047$.\n⭐ Pour $q = 2$, la somme vaut toujours le terme suivant moins $1$ : c'est pratique pour vérifier.",
          micros: ["suite_somme_geo"],
        },
        {
          enonce: "Soit $u_n = n^{2} - 6n$. Étudier le sens de variation de cette suite.",
          correction:
            "On calcule $u_{n+1} - u_n$.\n$u_{n+1} = (n+1)^{2} - 6(n+1) = n^{2} + 2n + 1 - 6n - 6$.\n$u_{n+1} - u_n = (n^{2} + 2n + 1 - 6n - 6) - (n^{2} - 6n) = 2n - 5$.\nCette différence dépend de $n$ : la suite n'est donc pas arithmétique, et son sens change.\n$2n - 5 < 0$ pour $n \\leqslant 2$, et $2n - 5 > 0$ pour $n \\geqslant 3$.\nLa suite décroît de $u_0$ à $u_3$, puis croît à partir de $u_3$. Son minimum est $u_3 = 9 - 18 = -9$.\n⚠️ Ici $n$ est un entier : on cherche à partir de quel RANG la différence change de signe, et $2{,}5$ n'est pas un rang.",
          schema: frise([0, -5, -8, -9, -8, -5], ["−5", "−3", "−1", "+1", "+3"], "u(n) = n² − 6n"),
          micros: ["suite_variation"],
        },
        {
          enonce:
            "Une somme de $1000$ € est placée à $5\\,\\%$ par an : $u_{n+1} = 1{,}05\\,u_n$ avec $u_0 = 1000$.\nÀ partir de quelle année la somme dépasse-t-elle $2000$ € ?",
          correction:
            "En première, un problème de seuil se traite en calculant les termes un par un.\nC'est ce que fait un algorithme « tant que » : tant que $u \\leqslant 2000$, on multiplie $u$ par $1{,}05$ et on compte une année de plus.\nAu bout de $14$ ans : $1000 \\times 1{,}05^{14} \\approx 1979{,}93$ €, ce n'est pas encore assez.\nAu bout de $15$ ans : $1000 \\times 1{,}05^{15} \\approx 2078{,}93$ €.\nLa somme dépasse $2000$ € à partir de la $15^{e}$ année.\n⚠️ On répond par le RANG, pas par la valeur atteinte.",
          micros: ["suite_algorithme"],
        },
        {
          enonce:
            "Un club compte $250$ membres.\na) Il en gagne $30$ chaque année. Quelle suite modélise le nombre de membres, et combien en aura-t-il dans $5$ ans ?\nb) Même question si le nombre de membres augmente de $12\\,\\%$ par an. (arrondir à l'unité)",
          correction:
            "a) On ajoute toujours la même quantité : la suite est ARITHMÉTIQUE, de raison $30$ et de premier terme $250$.\n$u_n = 250 + 30n$, donc $u_5 = 250 + 150 = 400$ membres.\nb) On multiplie par le même nombre : la suite est GÉOMÉTRIQUE, de raison $1{,}12$.\n$v_n = 250 \\times 1{,}12^{n}$, donc $v_5 = 250 \\times 1{,}12^{5} \\approx 250 \\times 1{,}7623 \\approx 441$ membres.\n⭐ Une hausse fixe donne une suite arithmétique, un pourcentage donne une géométrique. C'est le premier tri à faire devant un énoncé.",
          micros: ["suite_modeliser", "suite_evolution"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "⭐ LA SUITE AUXILIAIRE, l'exercice type : quand $u_{n+1} = a\\,u_n + b$, la suite $(u_n)$ n'est ni arithmétique ni géométrique. On pose $v_n = u_n - L$, et $(v_n)$, elle, est géométrique de raison $a$.",
        "Le nombre $L$ est donné par l'énoncé. C'est la valeur qui ne bouge plus : celle qui vérifie $L = aL + b$.",
        "On écrit ensuite $v_n = v_0 \\times a^{n}$, puis on REVIENT à $u$ : $u_n = v_n + L$.",
        "Si $0 < a < 1$, l'écart à $L$ est multiplié par $a$ à chaque étape : il diminue, et $u_n$ s'approche de $L$.",
      ],
      exercices: [
        {
          titre: "La suite auxiliaire",
          enonce:
            "Soit $(u_n)$ définie par $u_0 = 10$ et $u_{n+1} = 0{,}8\\,u_n + 6$. On pose $v_n = u_n - 30$.\na) Calculer $u_1$ et $u_2$.\nb) Montrer que $(v_n)$ est géométrique. Donner sa raison et $v_0$.\nc) Exprimer $v_n$, puis $u_n$, en fonction de $n$.\nd) Vers quelle valeur $u_n$ s'approche-t-elle ?",
          correction:
            "a) $u_1 = 0{,}8 \\times 10 + 6 = 14$, puis $u_2 = 0{,}8 \\times 14 + 6 = 17{,}2$.\nb) On part de $v_{n+1} = u_{n+1} - 30$ et on remplace $u_{n+1}$ :\n$v_{n+1} = 0{,}8\\,u_n + 6 - 30 = 0{,}8\\,u_n - 24$.\nOn factorise pour faire réapparaître $u_n - 30$ : comme $0{,}8 \\times 30 = 24$, on écrit\n$v_{n+1} = 0{,}8\\,(u_n - 30) = 0{,}8\\,v_n$.\nChaque terme s'obtient en multipliant le précédent par $0{,}8$ : $(v_n)$ est géométrique de raison $0{,}8$.\nSon premier terme est $v_0 = u_0 - 30 = 10 - 30 = -20$.\nc) Pour une suite géométrique, $v_n = v_0 \\times q^{n}$, donc $v_n = -20 \\times 0{,}8^{n}$.\nOn revient à $u$ : comme $v_n = u_n - 30$, on a $u_n = v_n + 30$, soit $u_n = -20 \\times 0{,}8^{n} + 30$.\nVérification avec $n = 1$ : $-20 \\times 0{,}8 + 30 = -16 + 30 = 14$, c'est bien $u_1$. ✔️\nd) Comme $0 < 0{,}8 < 1$, le nombre $0{,}8^{n}$ devient de plus en plus petit et s'approche de $0$.\nDonc $u_n$ s'approche de $30$, sans jamais l'atteindre.\n⛔ L'oubli classique est de s'arrêter à $v_n$. La question porte sur $u_n$ : il faut toujours faire le chemin du retour.",
          schema: frise([10, 14, "17,2", "19,76"], ["×0,8 +6", "×0,8 +6", "×0,8 +6"], "u(n+1) = 0,8u(n) + 6"),
          micros: ["suite_auxiliaire", "suite_limite"],
        },
        {
          titre: "Une espèce protégée",
          enonce:
            "Une population de $800$ oiseaux augmente de $6\\,\\%$ par an.\na) Quelle suite modélise cette population ? Donner sa raison.\nb) Combien d'oiseaux dans $10$ ans ? (arrondir à l'unité)\nc) À partir de quelle année la population dépasse-t-elle $1500$ oiseaux ?",
          correction:
            "a) Augmenter de $6\\,\\%$, c'est multiplier par $1{,}06$. La suite est GÉOMÉTRIQUE, de raison $1{,}06$ et de premier terme $u_0 = 800$.\nSon terme général est $u_n = 800 \\times 1{,}06^{n}$.\nb) $u_{10} = 800 \\times 1{,}06^{10} \\approx 800 \\times 1{,}7908 \\approx 1433$ oiseaux.\nc) On calcule les termes un par un jusqu'à dépasser $1500$.\nAu bout de $10$ ans : environ $1433$ oiseaux, ce n'est pas assez.\nAu bout de $11$ ans : $800 \\times 1{,}06^{11} \\approx 1519$ oiseaux.\nLa population dépasse $1500$ oiseaux à partir de la $11^{e}$ année.\n⚠️ Une population se compte en entiers : on arrondit le résultat, mais jamais les calculs intermédiaires.",
          micros: ["suite_evolution", "suite_algorithme"],
        },
        {
          titre: "Deux abonnements",
          enonce:
            "Deux salles de sport ouvrent le même mois.\nLa salle A demande $15$ € le premier mois, puis $2$ € de plus chaque mois.\nLa salle B demande $10$ € le premier mois, puis augmente son tarif de $10\\,\\%$ chaque mois.\na) Modéliser chaque tarif par une suite.\nb) Comparer les tarifs au bout de $12$ mois.\nc) À partir de quel mois la salle B devient-elle la plus chère ?",
          correction:
            "a) Salle A : on ajoute toujours $2$ €, la suite est arithmétique. $a_n = 15 + 2n$.\nSalle B : on multiplie toujours par $1{,}1$, la suite est géométrique. $b_n = 10 \\times 1{,}1^{n}$.\n($n$ compte les mois écoulés depuis l'ouverture.)\nb) Au bout de $12$ mois : $a_{12} = 15 + 24 = 39$ € et $b_{12} = 10 \\times 1{,}1^{12} \\approx 31{,}38$ €.\nLa salle B est encore la moins chère.\nc) On compare mois par mois.\nAu mois $16$ : $a_{16} = 47$ € et $b_{16} \\approx 45{,}95$ € — B est encore moins chère.\nAu mois $17$ : $a_{17} = 49$ € et $b_{17} \\approx 50{,}54$ € — B devient plus chère.\nC'est donc à partir du $17^{e}$ mois.\n⭐ C'est la leçon du chapitre : une croissance en pourcentage part plus lentement, puis rattrape et dépasse toujours une croissance à somme fixe. La question n'est pas SI, mais QUAND.",
          micros: ["suite_modeliser", "suite_evolution"],
        },
        {
          titre: "Les grains de riz",
          enonce:
            "Une vieille légende raconte qu'un roi doit poser $1$ grain de riz sur la première case d'un damier, $2$ sur la deuxième, $4$ sur la troisième, et ainsi de suite en doublant à chaque case.\na) Combien de grains sur la $20^{e}$ case ?\nb) Combien de grains en tout sur les $20$ premières cases ?",
          correction:
            "a) Le nombre de grains double à chaque case : c'est une suite géométrique de raison $2$.\nLa première case porte $1$ grain, soit $u_0 = 1$, et la case de rang $n+1$ porte $u_n = 2^{n}$.\nLa $20^{e}$ case correspond à $n = 19$ : elle porte $2^{19} = 524\\,288$ grains.\nb) Le total est la somme $1 + 2 + 4 + \\ldots + 2^{19}$, une somme géométrique de $20$ termes.\n$S = \\dfrac{2^{20} - 1}{2 - 1} = 2^{20} - 1 = 1\\,048\\,575$ grains.\n⭐ La dernière case porte à elle seule presque la moitié du total : c'est ce que veut dire « croissance exponentielle ».\n⚠️ Attention aux rangs : la $20^{e}$ case est le rang $19$ si l'on part de $u_0$.",
          micros: ["suite_somme_geo", "suite_geometrique"],
        },
        {
          titre: "Lire un tableau",
          enonce:
            "On relève les premiers termes d'une suite :\n$u_0 = 100$, $u_1 = 70$, $u_2 = 55$, $u_3 = 47{,}5$.\na) Cette suite est-elle arithmétique ? géométrique ? Justifier.\nb) Vérifier que $u_{n+1} = 0{,}5\\,u_n + 20$.\nc) On pose $v_n = u_n - 40$. Montrer que $(v_n)$ est géométrique.\nd) Vers quelle valeur la suite s'approche-t-elle ?",
          correction:
            "a) On teste les deux.\nDifférences : $70 - 100 = -30$, puis $55 - 70 = -15$. Elles ne sont pas égales : la suite n'est pas arithmétique.\nQuotients : $\\dfrac{70}{100} = 0{,}7$, puis $\\dfrac{55}{70} \\approx 0{,}786$. Ils ne sont pas égaux non plus : elle n'est pas géométrique.\nb) On teste la relation sur les termes connus.\n$0{,}5 \\times 100 + 20 = 70$, c'est bien $u_1$.\n$0{,}5 \\times 70 + 20 = 55$, c'est bien $u_2$.\n$0{,}5 \\times 55 + 20 = 47{,}5$, c'est bien $u_3$. ✔️\nc) $v_{n+1} = u_{n+1} - 40 = 0{,}5\\,u_n + 20 - 40 = 0{,}5\\,u_n - 20$.\nComme $0{,}5 \\times 40 = 20$, on factorise : $v_{n+1} = 0{,}5\\,(u_n - 40) = 0{,}5\\,v_n$.\n$(v_n)$ est donc géométrique de raison $0{,}5$, avec $v_0 = 100 - 40 = 60$.\nd) L'écart à $40$ est divisé par $2$ à chaque étape : il devient de plus en plus petit.\nLa suite s'approche donc de $40$.\n⭐ Une suite qui n'est ni arithmétique ni géométrique n'est pas pour autant hors de portée : la suite auxiliaire la ramène à une géométrique, la seule dont on sache tout dire.",
          schema: frise([100, 70, 55, "47,5", "43,75"], ["×0,5 +20", "×0,5 +20", "×0,5 +20", "×0,5 +20"], "vers 40 ?"),
          micros: ["suite_registres", "suite_auxiliaire", "suite_limite"],
        },
      ],
    },
  ],
};
