// ─── Fiche d'exercices : suite arithmétique (STMG) — 20 exercices ───────────────
//
// Notion suite_arithmetique du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Le coach
// demande : la raison par différence (voisins, ou deux relevés éloignés avec le
// nombre de PAS), la relation u(n+1) = u(n) + r, le sens par le SIGNE de r, et
// démontrer sur u(n) = an + b par le calcul de u(n+1) − u(n). ⛔ Jamais la formule
// u(n) = u(0) + nr : le terme général est en terminale. On calcule de proche en proche.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1, 2, 3, 6, 7, 8) ; traiteur, randonnée
// (accompagnatrice) ; cinéma (exploitant), vigne (vigneronne), apprentissage
// (apprentie), danse (professeure), taxi (chauffeuse), drone (pilote), station de
// ski (nivologue), architecture (architecte) ; recyclage (ingénieur), vaccins
// (infirmière), natation (entraîneur), transports (cheffe de ligne).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-1.mjs`.
//
// Micro-compétences : suite_arith_reconnaitre (1, 2, 8, 9, 10, 15, 18, 19),
// suite_arith_recurrence (4, 5, 6, 11, 12, 15, 17, 18, 20), suite_arith_variation
// (3, 11, 14, 15, 17, 18, 19, 20), suite_arith_demontrer (7, 13, 14, 16, 17, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

/** Une relation s'accepte avec ou sans son membre de gauche, avec × ou *, en u(n) ou en u_n. */
const relationDe = (l: string) => (...droites: string[]) =>
  droites
    .flatMap((d) => [d, d.replace(/×/g, "*")])
    .flatMap((d) => {
      const indice = d.split(`${l}(n)`).join(`${l}_n`);
      return [d, `${l}(n+1) = ${d}`, indice, `${l}_{n+1} = ${indice}`, `${l}_(n+1) = ${indice}`, `${l}_n+1 = ${indice}`];
    });
const relation = relationDe("u");

export const exercicesSuiteArithmetiqueStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-arithmetique",
  titre: "Suite arithmétique",
  accroche:
    "Vingt exercices sur les suites où l'on ajoute toujours le même nombre : trouver la raison, écrire la relation, lire le sens de variation et démontrer qu'une suite est arithmétique. Un cinéma, une cuve de vigneronne, un taxi, un drone, la neige d'une station et une ligne de bus. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer la raison, écrire la relation, ou lire le sens de variation.",
      rappel: [
        "Une suite est arithmétique si l'on ajoute toujours le même nombre $r$, la raison : $u(n+1) = u(n) + r$.",
        "La raison est une différence : terme suivant moins terme précédent. Elle peut être négative.",
        "Le SIGNE de $r$ donne le sens : $r > 0$, croissante ; $r < 0$, décroissante ; $r = 0$, constante. Le premier terme n'y change rien.",
        "Pour $u(n) = an + b$, la raison est $a$, le nombre devant $n$. Et $b$ est $u(0)$.",
      ],
      exercices: [
        {
          enonce: "Le tableau donne les premiers termes d'une suite arithmétique. Quelle est sa raison ?",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 12, 19, 26, 33]]),
          reponses: [{ attendu: "7" }],
          correction:
            "La raison est la différence entre deux termes voisins : $19 - 12 = 7$.\nOn vérifie sur une autre paire : $26 - 19 = 7$. ✔\n⛔ Le piège : diviser ($19 \\div 12$). Le quotient sert aux suites géométriques.\nRéponse : 7.",
          micros: ["suite_arith_reconnaitre"],
        },
        {
          enonce: "Voici les premiers termes d'une autre suite arithmétique, qui descend. Quelle est sa raison ?",
          figure: grille(["n", "0", "1", "2", "3"], [["u(n)", 100, 88, 76, 64]]),
          reponses: [{ attendu: "-12" }],
          correction:
            "On fait toujours terme suivant moins terme précédent : $88 - 100 = -12$.\nVérification : $76 - 88 = -12$. ✔\n⛔ Le piège : répondre 12. La suite baisse, sa raison est négative : on oublierait le signe.\nRéponse : −12.",
          micros: ["suite_arith_reconnaitre"],
        },
        {
          enonce:
            "Donne le sens de variation de chaque suite arithmétique. Écris « croissante », « décroissante » ou « constante ».\na) $u(0) = 500$ et $r = -3$.\nb) $u(0) = 2$ et $r = 7$.\nc) $u(0) = 40$ et $r = 0$.",
          reponses: [
            { question: "a)", attendu: "décroissante" },
            { question: "b)", attendu: "croissante" },
            { question: "c)", attendu: "constante" },
          ],
          correction:
            "On regarde seulement le signe de $r$.\na) $r = -3$ est négatif : décroissante.\nb) $r = 7$ est positif : croissante.\nc) $r = 0$ : on ajoute 0, la suite est constante.\n⛔ Le piège au a) : se laisser impressionner par 500. Le premier terme ne décide pas du sens.\nRéponse : a) décroissante ; b) croissante ; c) constante.",
          micros: ["suite_arith_variation"],
        },
        {
          enonce:
            "Un traiteur prépare 60 repas de plus chaque mois. On note $u(n)$ le nombre de repas du mois $n$. Complète la relation : $u(n+1) = \\ldots$",
          reponses: [{ attendu: relation("u(n) + 60", "60 + u(n)") }],
          correction:
            "Une quantité fixe s'ajoute à chaque pas : c'est une suite arithmétique de raison 60.\n$u(n+1) = u(n) + 60$.\n⛔ Le piège : écrire $u(n+1) = 60 \\times u(n)$. Le nombre de repas ne serait pas multiplié par 60 chaque mois !\nRéponse : u(n+1) = u(n) + 60.",
          micros: ["suite_arith_recurrence"],
        },
        {
          enonce:
            "Une accompagnatrice de randonnée donne 25 gourdes par mois et n'en rachète pas. On note $u(n)$ son stock au mois $n$. Complète la relation : $u(n+1) = \\ldots$",
          reponses: [{ attendu: relation("u(n) - 25", "-25 + u(n)") }],
          correction:
            "Le stock diminue d'une quantité fixe : la raison est $-25$.\n$u(n+1) = u(n) - 25$.\n⛔ Le piège : écrire $u(n) + 25$. Le stock baisse, on retire.\nRéponse : u(n+1) = u(n) − 25.",
          micros: ["suite_arith_recurrence"],
        },
        {
          enonce: "Une suite vérifie $u(n+1) = u(n) + 8$, et $u(5) = 47$. Calcule $u(6)$.",
          reponses: [{ attendu: "55" }],
          correction:
            "$u(6)$ est le terme suivant de $u(5)$ : on ajoute la raison.\n$u(6) = 47 + 8 = 55$.\n⛔ Le piège : repartir de $u(0)$, qu'on ne connaît pas. On n'a besoin que du terme précédent.\nRéponse : 55.",
          micros: ["suite_arith_recurrence"],
        },
        {
          enonce: "Une suite est définie par $u(n) = 6n + 2$. Elle est arithmétique : quelle est sa raison ?",
          reponses: [{ attendu: "6" }],
          correction:
            "Dans $u(n) = an + b$, la raison est $a$ : c'est ce qu'on ajoute quand $n$ augmente de 1.\nIci, $a = 6$.\nVérification : $u(0) = 2$, $u(1) = 8$, $u(2) = 14$. On ajoute bien 6. ✔\n⛔ Le piège : répondre 2. Le 2 est le premier terme $u(0)$, pas la raison.\nRéponse : 6.",
          micros: ["suite_arith_demontrer"],
        },
        {
          enonce: "Les premiers termes d'une suite sont $2$, $5$, $8$, $12$. Cette suite est-elle arithmétique ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "On calcule toutes les différences : $5 - 2 = 3$, $8 - 5 = 3$, $12 - 8 = 4$.\nLa dernière n'est pas égale aux autres : on n'ajoute pas toujours le même nombre.\n⛔ Le piège : s'arrêter aux deux premières différences, égales à 3.\nRéponse : non.",
          micros: ["suite_arith_reconnaitre"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : la raison, la relation, le sens, puis une démonstration en gardant la lettre n.",
      rappel: [
        "Entre deux rangs éloignés : raison = écart des valeurs ÷ nombre de pas. De $u(3)$ à $u(8)$, il y a $8 - 3 = 5$ pas.",
        "Quantité fixe : on ajoute. Un coefficient qui multiplie, ce n'est pas une suite arithmétique.",
        "Démontrer : on calcule $u(n+1) - u(n)$ en gardant $n$. Si le résultat ne contient plus $n$, il est constant : la suite est arithmétique.",
        "Une vérification sur deux termes peut montrer qu'une suite N'est PAS arithmétique, mais ne prouve jamais qu'elle l'est.",
      ],
      exercices: [
        {
          enonce:
            "L'exploitant d'un cinéma note $u(n)$ le nombre de ses abonnés au mois $n$ : c'est une suite arithmétique (modèle). Il relève $u(2) = 112$ et $u(6) = 136$.\na) Combien y a-t-il de pas entre le rang 2 et le rang 6 ?\nb) Quelle est la raison ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) $6 - 2 = 4$ pas.\nb) Écart des valeurs : $136 - 112 = 24$. On le répartit sur les pas : $24 \\div 4 = 6$.\nVérification : 112, 118, 124, 130, 136. ✔\n⛔ Le piège au b) : diviser par le rang d'arrivée ($24 \\div 6 = 4$). On divise par le nombre de pas franchis.\nRéponse : a) 4 ; b) 6.",
          micros: ["suite_arith_reconnaitre"],
        },
        {
          enonce:
            "Une vigneronne vide peu à peu une cuve : $u(n)$, le volume en hectolitres au bout de $n$ semaines, forme une suite arithmétique (modèle). Elle relève $u(1) = 900$ et $u(5) = 820$.\na) Quelle est la raison ?\nb) Calcule $u(3)$.",
          reponses: [
            { question: "a)", attendu: "-20" },
            { question: "b)", attendu: "860" },
          ],
          correction:
            "a) Écart des valeurs : $820 - 900 = -80$. Nombre de pas : $5 - 1 = 4$. Raison : $-80 \\div 4 = -20$.\nb) On descend de 20 à chaque pas : $u(2) = 880$, puis $u(3) = 860$.\n⛔ Le piège au a) : faire $900 - 820$ et perdre le signe. On fait toujours la valeur d'arrivée moins la valeur de départ.\nRéponse : a) −20 ; b) 860.",
          micros: ["suite_arith_reconnaitre"],
        },
        {
          enonce:
            "Nora, apprentie en coiffure, a 1 500 € sur un livret, notés $u(0)$. Elle verse 120 € chaque mois, sans intérêts (modèle).\na) Complète la relation : $u(n+1) = \\ldots$\nb) Quelle est la raison ?\nc) La suite est-elle croissante ou décroissante ? Écris le mot.\nd) Calcule $u(3)$.",
          reponses: [
            { question: "a)", attendu: relation("u(n) + 120", "120 + u(n)") },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "croissante" },
            { question: "d)", attendu: "1 860 €" },
          ],
          correction:
            "a) On ajoute 120 chaque mois : $u(n+1) = u(n) + 120$.\nb) La raison est 120.\nc) $r = 120$ est positif : la suite est croissante.\nd) $1\\,500 + 120 = 1\\,620$, puis $1\\,740$, puis $1\\,860$.\n⛔ Le piège au d) : faire un pas de trop en comptant quatre versements. De $u(0)$ à $u(3)$, il y en a trois.\nRéponse : a) u(n+1) = u(n) + 120 ; b) 120 ; c) croissante ; d) 1 860 €.",
          micros: ["suite_arith_recurrence", "suite_arith_variation"],
        },
        {
          enonce:
            "Une professeure de danse gagne 40 élèves par an (modèle). Elle note $u(n)$ le nombre d'élèves l'année $n$, avec $u(0) = 100$, et écrit : « $u(n+1) = 40 \\times u(n)$ ».\na) Sa relation est-elle juste ? Réponds oui ou non.\nb) Complète la bonne relation : $u(n+1) = \\ldots$\nc) Calcule $u(1)$ avec sa relation, puis avec la bonne. Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: relation("u(n) + 40", "40 + u(n)") },
            { question: "c)", attendu: "4 000 ; 140", ordre: true },
          ],
          correction:
            "a) Non : 40 élèves de plus, c'est une quantité fixe, elle s'ajoute.\nb) $u(n+1) = u(n) + 40$.\nc) Avec sa relation : $40 \\times 100 = 4\\,000$. Avec la bonne : $100 + 40 = 140$.\nQuatre mille élèves en un an : le résultat doit alerter.\n⛔ Le piège : confondre « 40 de plus » et « multiplié par 40 ». Ajouter et multiplier ne donnent jamais la même suite.\nRéponse : a) non ; b) u(n+1) = u(n) + 40 ; c) 4 000 ; 140.",
          micros: ["suite_arith_recurrence"],
        },
        {
          enonce:
            "Une chauffeuse de taxi facture une course de $n$ km à $u(n) = 2n + 7$ euros (modèle).\na) Écris $u(n+1)$ sous la forme la plus simple.\nb) Calcule la différence $u(n+1) - u(n)$.\nc) La suite est arithmétique : quelle est sa raison ?",
          reponses: [
            { question: "a)", attendu: relation("2n + 9", "9 + 2n", "2 × n + 9", "9 + 2 × n"), exact: true },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "a) On remplace $n$ par $n+1$ : $u(n+1) = 2(n+1) + 7 = 2n + 2 + 7 = 2n + 9$.\nb) $u(n+1) - u(n) = (2n + 9) - (2n + 7) = 2$.\nc) Le résultat ne contient plus $n$ : il est constant. La suite est arithmétique, de raison 2. Chaque kilomètre coûte 2 € de plus.\n⛔ Le piège au a) : écrire $2n + 1 + 7$. Le 2 multiplie tout le contenu de la parenthèse.\nRéponse : a) 2n + 9 ; b) 2 ; c) 2.",
          micros: ["suite_arith_demontrer"],
        },
        {
          enonce:
            "Un pilote de drone estime l'autonomie restante, en minutes, après $n$ vols courts : $u(n) = -4n + 60$ (modèle).\na) Écris $u(n+1)$ sous la forme la plus simple.\nb) Calcule la différence $u(n+1) - u(n)$.\nc) La suite est-elle croissante ou décroissante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: relation("-4n + 56", "56 - 4n", "-4 × n + 56", "56 - 4 × n"), exact: true },
            { question: "b)", attendu: "-4" },
            { question: "c)", attendu: "décroissante" },
          ],
          correction:
            "a) $u(n+1) = -4(n+1) + 60 = -4n - 4 + 60 = -4n + 56$.\nb) $u(n+1) - u(n) = (-4n + 56) - (-4n + 60) = 56 - 60 = -4$.\nc) La raison $-4$ est négative : la suite est décroissante.\n⛔ Le piège au b) : oublier que le moins porte sur toute la parenthèse. Retirer $-4n$, c'est ajouter $4n$.\nRéponse : a) −4n + 56 ; b) −4 ; c) décroissante.",
          micros: ["suite_arith_demontrer", "suite_arith_variation"],
        },
        {
          enonce:
            "Un nivologue suit l'épaisseur de neige d'une station : elle forme une suite arithmétique et baisse mois après mois (modèle). Les trois premiers relevés, en cm, sont $u(0) = 120$, $u(1) = 105$ et $u(2) = 90$.\na) Quel est le signe de la raison ? Écris « positive » ou « négative ».\nb) Quelle est la raison ?\nc) Complète la relation : $u(n+1) = \\ldots$\nd) Calcule $u(4)$.",
          reponses: [
            { question: "a)", attendu: "négative" },
            { question: "b)", attendu: "-15" },
            { question: "c)", attendu: relation("u(n) - 15", "-15 + u(n)") },
            { question: "d)", attendu: "60 cm" },
          ],
          correction:
            "a) La suite baisse : on ajoute à chaque pas un nombre négatif.\nb) $105 - 120 = -15$, et $90 - 105 = -15$.\nc) $u(n+1) = u(n) - 15$.\nd) $u(2) = 90$, puis $u(3) = 75$, puis $u(4) = 60$.\n⛔ Le piège au a) : dire que la raison « décroît ». La raison est un nombre fixe : c'est la suite qui décroît.\nRéponse : a) négative ; b) −15 ; c) u(n+1) = u(n) − 15 ; d) 60 cm.",
          micros: ["suite_arith_reconnaitre", "suite_arith_recurrence", "suite_arith_variation"],
        },
        {
          enonce:
            "Une architecte note $u(n) = n^2 + 1$ le nombre de vitres d'une façade modèle au niveau $n$. Un collègue pense que c'est une suite arithmétique.\na) Calcule $u(1) - u(0)$.\nb) Calcule $u(2) - u(1)$.\nc) La suite est-elle arithmétique ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "On calcule : $u(0) = 0^2 + 1 = 1$, $u(1) = 1^2 + 1 = 2$, $u(2) = 2^2 + 1 = 5$.\na) $u(1) - u(0) = 2 - 1 = 1$.\nb) $u(2) - u(1) = 5 - 2 = 3$.\nc) Les deux différences ne sont pas égales : la suite n'est pas arithmétique.\n⛔ Le piège : voir une formule avec $n$ et croire qu'elle donne forcément une suite arithmétique. Il faut la forme $an + b$.\nRéponse : a) 1 ; b) 3 ; c) non.",
          micros: ["suite_arith_demontrer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on traduit la situation, on trouve la raison, on calcule de proche en proche.",
      rappel: [
        "Quantité fixe à chaque étape : suite arithmétique, $u(n+1) = u(n) + r$.",
        "Le signe de $r$ donne le sens de variation.",
        "Une écriture $u(n) = an + b$ se prouve arithmétique par le calcul de $u(n+1) - u(n)$.",
      ],
      exercices: [
        {
          titre: "L'usine de recyclage",
          enonce:
            "Un ingénieur prévoit qu'une usine recyclera 2 000 tonnes cette année, notées $u(0)$, puis 150 tonnes de plus chaque année (modèle).\na) Complète la relation : $u(n+1) = \\ldots$\nb) Donne $u(1)$, $u(2)$ et $u(3)$, dans cet ordre.\nc) La suite est-elle croissante ou décroissante ? Écris le mot.\nd) Son directeur écrit $v(n) = 150n + 2\\,000$. Calcule la différence $v(n+1) - v(n)$.",
          reponses: [
            { question: "a)", attendu: relation("u(n) + 150", "150 + u(n)") },
            { question: "b)", attendu: "2 150 ; 2 300 ; 2 450", ordre: true },
            { question: "c)", attendu: "croissante" },
            { question: "d)", attendu: "150" },
          ],
          correction:
            "a) $u(n+1) = u(n) + 150$.\nb) $2\\,000 + 150 = 2\\,150$, puis $2\\,300$, puis $2\\,450$.\nc) La raison 150 est positive : croissante.\nd) $v(n+1) = 150(n+1) + 2\\,000 = 150n + 2\\,150$, donc $v(n+1) - v(n) = 2\\,150 - 2\\,000 = 150$. Le résultat ne contient plus $n$ : $v$ est arithmétique de raison 150.\n⛔ Le piège au d) : prendre 2 000 pour la raison. C'est le premier terme.\nRéponse : a) u(n+1) = u(n) + 150 ; b) 2 150 ; 2 300 ; 2 450 ; c) croissante ; d) 150.",
          micros: ["suite_arith_recurrence", "suite_arith_variation", "suite_arith_demontrer"],
        },
        {
          titre: "Le stock de vaccins",
          enonce:
            "Dans un centre fictif, une infirmière dispose de 1 200 doses, notées $u(0)$, et en utilise 75 par jour, sans livraison.\na) Quelle est la raison ?\nb) Complète la relation : $u(n+1) = \\ldots$\nc) Calcule $u(4)$.\nd) La suite est-elle croissante ou décroissante ? Écris le mot.\ne) Calcule $u(10)$.",
          reponses: [
            { question: "a)", attendu: "-75" },
            { question: "b)", attendu: relation("u(n) - 75", "-75 + u(n)") },
            { question: "c)", attendu: "900" },
            { question: "d)", attendu: "décroissante" },
            { question: "e)", attendu: "450" },
          ],
          correction:
            "a) Le stock perd 75 doses par jour : $r = -75$.\nb) $u(n+1) = u(n) - 75$.\nc) 1 125 ; 1 050 ; 975 ; 900 : $u(4) = 900$.\nd) La raison est négative : décroissante.\ne) On continue depuis $u(4)$ : 825 ; 750 ; 675 ; 600 ; 525 ; 450. Donc $u(10) = 450$.\n⛔ Le piège au a) : répondre 75. Le stock baisse : le signe moins fait partie de la raison.\nRéponse : a) −75 ; b) u(n+1) = u(n) − 75 ; c) 900 ; d) décroissante ; e) 450.",
          micros: ["suite_arith_reconnaitre", "suite_arith_recurrence", "suite_arith_variation"],
        },
        {
          titre: "Le chrono de la nageuse",
          enonce:
            "Un entraîneur de natation modélise le temps d'Awa au 100 m, en secondes, par une suite arithmétique : après 3 mois, $u(3) = 58$ ; après 7 mois, $u(7) = 54$.\na) Quelle est la raison ?\nb) Que valait $u(0)$ ?\nc) Calcule $u(10)$.\nd) La suite est-elle croissante ou décroissante ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: "61" },
            { question: "c)", attendu: "51" },
            { question: "d)", attendu: "décroissante" },
          ],
          correction:
            "a) Écart : $54 - 58 = -4$. Pas : $7 - 3 = 4$. Raison : $-4 \\div 4 = -1$.\nb) On remonte de 3 pas en ajoutant 1 à chaque fois : 59 ; 60 ; 61.\nc) On avance de 3 pas depuis $u(7)$ : 53 ; 52 ; 51.\nd) La raison est négative : décroissante. Ici, c'est une bonne nouvelle, le temps baisse.\n⛔ Le piège au a) : diviser par 7, le rang d'arrivée. On divise par le nombre de pas, ici 4.\nRéponse : a) −1 ; b) 61 ; c) 51 ; d) décroissante.",
          micros: ["suite_arith_reconnaitre", "suite_arith_variation"],
        },
        {
          titre: "La ligne de bus",
          enonce:
            "La cheffe d'une ligne de bus modélise les voyageurs par jour au mois $n$ par $u(n) = 350n + 4\\,000$ (modèle).\na) Que vaut $u(0)$ ?\nb) Écris $u(n+1)$ sous la forme la plus simple.\nc) Calcule la différence $u(n+1) - u(n)$.\nd) Complète la relation : $u(n+1) = \\ldots$ en fonction de $u(n)$.\ne) La suite est-elle croissante ou décroissante ? Écris le mot.\nf) Calcule $u(3)$.",
          reponses: [
            { question: "a)", attendu: "4 000" },
            { question: "b)", attendu: relation("350n + 4 350", "4 350 + 350n", "350 × n + 4 350", "4 350 + 350 × n"), exact: true },
            { question: "c)", attendu: "350" },
            { question: "d)", attendu: relation("u(n) + 350", "350 + u(n)") },
            { question: "e)", attendu: "croissante" },
            { question: "f)", attendu: "5 050" },
          ],
          correction:
            "a) $u(0) = 350 \\times 0 + 4\\,000 = 4\\,000$.\nb) $u(n+1) = 350(n+1) + 4\\,000 = 350n + 350 + 4\\,000 = 350n + 4\\,350$.\nc) $u(n+1) - u(n) = 4\\,350 - 4\\,000 = 350$ : le résultat ne contient plus $n$, la suite est arithmétique.\nd) $u(n+1) = u(n) + 350$.\ne) La raison est positive : croissante.\nf) $u(3) = 350 \\times 3 + 4\\,000 = 1\\,050 + 4\\,000 = 5\\,050$.\n⛔ Le piège au c) : vérifier seulement sur $u(1) - u(0)$. Cela ne démontre rien : il faut garder $n$.\nRéponse : a) 4 000 ; b) 350n + 4 350 ; c) 350 ; d) u(n+1) = u(n) + 350 ; e) croissante ; f) 5 050.",
          micros: ["suite_arith_demontrer", "suite_arith_recurrence", "suite_arith_variation"],
        },
      ],
    },
  ],
};
