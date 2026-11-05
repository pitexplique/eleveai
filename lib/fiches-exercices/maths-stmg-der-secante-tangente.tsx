// ─── Fiche d'exercices : sécantes et tangente (STMG) — 20 exercices ────────────
//
// Notion der_secante_tangente du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : le coefficient directeur d'une
// sécante, les points qu'elle joint, son équation ; les coefficients qui se
// rapprochent d'un nombre (sans le mot « limite » en calcul) ; distinguer
// tangente et sécante, tester une droite avec f'(a) DONNÉ ici.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : deux calculs nus (1, 3), dessins nus (2, 4, 5), copie (6),
// suites de coefficients (7, 8) ; ski (monitrice, 9), santé (pharmacologue, 10),
// hydrologie (hydrologue, 11), apiculture (apicultrice, 12), énergie solaire
// (technicien, 13), architecture (architecte, 14), tourisme (gérante de gîte, 15),
// cinéma (programmateur, 16), plongeon (entraîneur, 17), randonnée (garde
// forestière, 18), réseaux sociaux (community manager, 19), nature (garde-nature, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_secante_tracer (1, 2, 3, 10, 14, 16, 18, 20),
// der_tangente_limite (7, 8, 9, 13, 14, 17, 18, 19), der_tangente_reconnaitre
// (4, 5, 6, 11, 12, 15, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

const VERT = "#16a34a";

export const exercicesDerSecanteTangenteStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-secante-tangente",
  titre: "Sécantes et tangente",
  accroche:
    "Vingt exercices pour voir naître la tangente : calculer le coefficient directeur d'une sécante, rapprocher le second point du premier, reconnaître la tangente sur un dessin et par le calcul. Une skieuse, un médicament, un panneau solaire, une arche, un plongeon, un sentier de randonnée. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer un coefficient directeur, lire un dessin, nommer une droite.",
      rappel: [
        "Une sécante joint deux points A et B de la courbe. Son coefficient directeur : $\\dfrac{y_B - y_A}{x_B - x_A}$, dans le même ordre en haut et en bas.",
        "La tangente en A touche la courbe en A et suit sa direction autour de ce point.",
        "Quand B se rapproche de A, la sécante (AB) se rapproche de la tangente en A, et son coefficient directeur se rapproche de celui de la tangente.",
        "Le coefficient directeur de la tangente au point d'abscisse $a$ s'appelle le nombre dérivé $f'(a)$.",
      ],
      exercices: [
        {
          enonce:
            "Une sécante à une courbe passe par les points A$(1\\,;2)$ et B$(3\\,;8)$. Quel est son coefficient directeur ?",
          reponses: [{ attendu: "3" }],
          correction:
            "On divise la différence des ordonnées par la différence des abscisses.\nEn haut : $8 - 2 = 6$. En bas : $3 - 1 = 2$.\n$6 \\div 2 = 3$.\n⛔ Le piège : diviser les abscisses par les ordonnées ($2 \\div 6$). Les ordonnées vont en haut.\nRéponse : 3.",
          micros: ["der_secante_tracer"],
        },
        {
          enonce:
            "La parabole et la droite orange sont tracées. Par quels points de la courbe passe cette droite ? Donne leurs deux abscisses.",
          figure: repere([-3, 3, -1, 6], [{ q: [1, 0, 0] }, { q: [0, 1, 2], couleur: ORANGE }], [
            { x: -1, y: 1, label: "A" },
            { x: 2, y: 4, label: "B" },
          ]),
          reponses: [{ attendu: "-1 ; 2" }],
          correction:
            "Une sécante coupe la courbe en deux points : on lit l'abscisse de chacun sur l'axe horizontal.\nA a pour abscisse $-1$ et B a pour abscisse $2$.\n⛔ Le piège : donner les ordonnées, 1 et 4. L'abscisse se lit en bas, sur l'axe horizontal.\nRéponse : $-1$ et $2$.",
          micros: ["der_secante_tracer"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 + 1$. On trace la sécante qui joint les points de la courbe d'abscisses 1 et 3.\na) Calcule $f(1)$.\nb) Calcule $f(3)$.\nc) Quel est le coefficient directeur de cette sécante ?",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) $f(1) = 1^2 + 1 = 2$.\nb) $f(3) = 3^2 + 1 = 10$.\nc) $\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{10 - 2}{2} = 4$.\n⛔ Le piège au c) : oublier de diviser par $3 - 1$ et répondre 8.\nRéponse : a) 2 ; b) 10 ; c) 4.",
          micros: ["der_secante_tracer"],
        },
        {
          enonce:
            "La droite orange passe par le point A de la courbe. Est-ce une tangente ou une sécante ? Réponds tangente ou sécante.",
          figure: repere([-3, 4, -2, 6], [{ q: [-1, 0, 4] }, { q: [0, -2, 5], couleur: ORANGE }], [{ x: 1, y: 3, label: "A" }]),
          reponses: [{ attendu: ["tangente", "une tangente", "la tangente"] }],
          correction:
            "La droite touche la courbe en A seulement, et elle suit sa direction autour de A.\nElle ne traverse pas la courbe pour la retrouver plus loin : c'est la tangente en A.\n⛔ Le piège : croire que toute droite qui passe par un point de la courbe est une tangente. Il faut qu'elle suive la direction de la courbe.\nRéponse : tangente.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "On regarde la droite orange et la courbe.\na) Combien de points communs ont-elles sur ce dessin ?\nb) Cette droite est-elle une tangente ou une sécante ? Réponds tangente ou sécante.",
          figure: repere([-3, 4, -3, 4], [{ q: [0.5, 0, -2] }, { q: [0, 1, -2], couleur: ORANGE }]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: ["sécante", "une sécante", "la sécante"] },
          ],
          correction:
            "a) La droite coupe la courbe en deux points, d'abscisses 0 et 2.\nb) Elle traverse la courbe en deux points : c'est une sécante.\n⛔ Le piège au b) : regarder seulement un des deux points et conclure « tangente ».\nRéponse : a) 2 ; b) sécante.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "Un élève écrit : « La tangente au point d'abscisse 3 a pour coefficient directeur $f(3)$. » Est-ce vrai ? Réponds vrai ou faux.",
          reponses: [{ attendu: "faux" }],
          correction:
            "Le coefficient directeur de la tangente s'appelle le nombre dérivé : c'est $f'(3)$, avec le prime.\n$f(3)$ est autre chose : c'est l'ordonnée du point de la courbe.\n⛔ Le piège : confondre $f(3)$, une hauteur, et $f'(3)$, une pente.\nRéponse : faux.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "On trace des sécantes à une courbe, toutes issues du point d'abscisse 2, en rapprochant le second point. Leurs coefficients directeurs valent successivement $5$, puis $4{,}1$, puis $4{,}01$. Vers quel nombre se dirigent-ils ?",
          reponses: [{ attendu: "4" }],
          correction:
            "Les nombres se resserrent : $5$, puis $4{,}1$, puis $4{,}01$.\nIls se rapprochent de 4.\nCe nombre est le coefficient directeur de la tangente au point d'abscisse 2.\n⛔ Le piège : répondre 4,01, le dernier nombre calculé. Il n'est pas encore arrivé.\nRéponse : 4.",
          micros: ["der_tangente_limite"],
        },
        {
          enonce:
            "Le coefficient directeur de la sécante entre les points d'abscisses 3 et $3 + h$ vaut $7 + h$. Vers quelle valeur se rapproche-t-il quand $h$ se rapproche de 0 ?",
          reponses: [{ attendu: "7" }],
          correction:
            "Quand $h$ devient très petit, $7 + h$ devient très proche de 7.\nExemples : $h = 0{,}1$ donne $7{,}1$, et $h = 0{,}01$ donne $7{,}01$.\n⛔ Le piège : répondre 3, l'abscisse du point. On cherche le coefficient directeur.\nRéponse : 7.",
          micros: ["der_tangente_limite"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : les points d'abord, le coefficient directeur ensuite.",
      rappel: [
        "L'équation d'une sécante s'écrit $y = mx + p$ : on calcule $m$, puis on trouve $p$ en remplaçant par les coordonnées d'un point.",
        "Si la grandeur est une distance, le coefficient directeur d'une sécante est une vitesse moyenne, et celui de la tangente une vitesse à l'instant choisi.",
        "Une tangente horizontale a pour coefficient directeur 0.",
        "Une droite est la tangente en A si elle passe par A ET si son coefficient directeur vaut le nombre dérivé en A.",
      ],
      exercices: [
        {
          enonce:
            "Une monitrice de ski observe Hugo qui s'élance. La distance parcourue au bout de $t$ secondes vaut $d(t) = 2t^2$, en mètres (modèle).\na) Quelle est sa vitesse moyenne entre $t = 3$ et $t = 4$ ?\nb) Entre $t = 3$ et $t = 3{,}1$ ?\nc) Entre $t = 3$ et $t = 3{,}01$ ?\nd) Vers quel nombre ces vitesses se dirigent-elles ? C'est la vitesse à l'instant $t = 3$.",
          reponses: [
            { question: "a)", attendu: "14 m/s" },
            { question: "b)", attendu: "12,2 m/s" },
            { question: "c)", attendu: "12,02 m/s" },
            { question: "d)", attendu: "12 m/s" },
          ],
          correction:
            "On a $d(3) = 2 \\times 9 = 18$.\na) $d(4) = 32$, donc $(32 - 18) \\div 1 = 14$ m/s.\nb) $d(3{,}1) = 19{,}22$, donc $(19{,}22 - 18) \\div 0{,}1 = 12{,}2$ m/s.\nc) $d(3{,}01) = 18{,}1202$, donc $0{,}1202 \\div 0{,}01 = 12{,}02$ m/s.\nd) $14$, puis $12{,}2$, puis $12{,}02$ : ces vitesses se rapprochent de 12 m/s.\n⛔ Le piège au b) : oublier de diviser par la durée, ici $0{,}1$ seconde, et répondre $1{,}22$.\nRéponse : a) 14 m/s ; b) 12,2 m/s ; c) 12,02 m/s ; d) 12 m/s.",
          micros: ["der_tangente_limite"],
        },
        {
          enonce:
            "Une pharmacologue modélise la concentration d'un médicament dans le sang par $C(t) = -t^2 + 6t$, en mg/L, où $t$ est le temps en heures.\na) Calcule $C(1)$.\nb) Calcule $C(3)$.\nc) Quel est le coefficient directeur de la sécante entre les points d'abscisses 1 et 3 ?\nd) Donne l'équation de cette sécante, sous la forme $y = mt + p$.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: ["y = 2t + 3", "y = 3 + 2t"], exact: true },
          ],
          correction:
            "a) $C(1) = -1 + 6 = 5$.\nb) $C(3) = -9 + 18 = 9$.\nc) $(9 - 5) \\div (3 - 1) = 2$.\nd) $y = 2t + p$. La droite passe par le point $(1\\,;5)$ : $5 = 2 \\times 1 + p$, donc $p = 3$.\nVérification avec l'autre point : $2 \\times 3 + 3 = 9$. ✔\n⛔ Le piège au a) : écrire $-t^2 = (-1)^2 = 1$. Le carré porte sur $t$ seul : $-1^2 = -1$.\nRéponse : a) 5 ; b) 9 ; c) 2 ; d) $y = 2t + 3$.",
          schema: repere([-1, 7, -1, 10], [{ q: [-1, 6, 0] }, { q: [0, 2, 3], couleur: ORANGE }], [
            { x: 1, y: 5, label: "A" },
            { x: 3, y: 9, label: "B" },
          ], undefined, true),
          micros: ["der_secante_tracer"],
        },
        {
          enonce:
            "Un hydrologue a tracé le niveau d'un lac, en mètres au-dessus d'un repère, en fonction du temps $t$ en mois (modèle).\na) En quelle abscisse la tangente à la courbe est-elle horizontale ?\nb) Quel est le coefficient directeur de cette tangente ?\nc) Quel est le niveau du lac à ce moment-là ?",
          figure: repere([-1, 7, -1, 7], [{ q: [0.5, -3, 5.5] }]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "0" },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "a) La courbe descend, puis remonte. Au point le plus bas, elle est à plat : la tangente y est horizontale. Ce point a pour abscisse 3.\nb) Une droite horizontale a pour coefficient directeur 0.\nc) On lit l'ordonnée du point le plus bas : 1 mètre.\n⛔ Le piège au a) : répondre 1, l'ordonnée. L'abscisse se lit sur l'axe horizontal.\nRéponse : a) 3 ; b) 0 ; c) 1.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "Une apicultrice modélise son stock de miel par $S(t) = t^2 - 4t + 5$, en quintaux, où $t$ est le temps en mois. Soit A le point de la courbe d'abscisse 3. On admet que $S'(3) = 2$. Deux droites sont candidates : la rouge $y = 2t - 4$ et la bleue $y = 3t - 7$.\na) Calcule $S(3)$.\nb) La droite rouge passe-t-elle par A ? Réponds oui ou non.\nc) La droite bleue passe-t-elle par A ? Réponds oui ou non.\nd) Laquelle est la tangente en A ? Réponds rouge ou bleue.",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "rouge" },
          ],
          correction:
            "a) $S(3) = 9 - 12 + 5 = 2$ : A a pour coordonnées $(3\\,;2)$.\nb) En $t = 3$ : $2 \\times 3 - 4 = 2$. Oui.\nc) En $t = 3$ : $3 \\times 3 - 7 = 2$. Oui.\nd) Les deux passent par A : seul le coefficient directeur les départage. La tangente a pour coefficient $S'(3) = 2$ : c'est la rouge.\n⛔ Le piège au d) : s'arrêter à « elle passe par A ». Une infinité de droites passent par A, une seule est la tangente.\nRéponse : a) 2 ; b) oui ; c) oui ; d) rouge.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "Un technicien suit la puissance d'un panneau solaire : $P(t) = -t^2 + 8t$, en kW, où $t$ est le nombre d'heures après 8 h (modèle). Il étudie les sécantes issues du point d'abscisse 3. Le tableau donne leurs coefficients directeurs pour trois écarts $h$.\na) Calcule $P(3)$.\nb) Calcule $P(4)$.\nc) Quel est le coefficient directeur de la sécante pour l'écart $h = 1$ ?\nd) D'après le tableau, vers quel nombre ces coefficients se dirigent-ils ?",
          figure: grille(["Écart h", "Coefficient directeur"], [
            ["0,5", "1,5"],
            ["0,1", "1,9"],
            ["0,01", "1,99"],
          ]),
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "1" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "a) $P(3) = -9 + 24 = 15$.\nb) $P(4) = -16 + 32 = 16$.\nc) $(16 - 15) \\div (4 - 3) = 1$.\nd) $1$, puis $1{,}5$, puis $1{,}9$, puis $1{,}99$ : on se rapproche de 2.\nC'est le coefficient directeur de la tangente au point d'abscisse 3.\n⛔ Le piège au d) : prendre le plus grand nombre du tableau, 1,99, pour la réponse. Il reste un écart.\nRéponse : a) 15 ; b) 16 ; c) 1 ; d) 2.",
          micros: ["der_tangente_limite"],
        },
        {
          enonce:
            "Une architecte dessine une arche dont le profil est $f(x) = -0{,}5x^2 + 4$. La droite orange est la sécante (AB), avec A d'abscisse 0 et B d'abscisse 2.\na) Quel est le coefficient directeur de cette sécante ?\nb) On rapproche B de A, en restant sur la courbe. Vers quelle droite la sécante se rapproche-t-elle ? Réponds tangente ou axe.\nc) A est le sommet de l'arche : la tangente y est à plat. Quel est son coefficient directeur ?",
          figure: repere([-4, 4, -1, 5], [{ q: [-0.5, 0, 4] }, { q: [0, -1, 4], couleur: ORANGE }], [
            { x: 0, y: 4, label: "A" },
            { x: 2, y: 2, label: "B" },
          ]),
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: ["tangente", "la tangente", "une tangente"] },
            { question: "c)", attendu: "0" },
          ],
          correction:
            "a) A$(0\\,;4)$ et B$(2\\,;2)$ : $(2 - 4) \\div (2 - 0) = -1$. La droite descend, son coefficient est négatif.\nb) Quand B se rapproche de A, la sécante se rapproche de la tangente en A.\nc) Au sommet, la tangente est horizontale : son coefficient directeur est 0.\n⛔ Le piège au a) : oublier le signe et répondre 1. Une droite qui descend a un coefficient négatif.\nRéponse : a) $-1$ ; b) tangente ; c) 0.",
          micros: ["der_secante_tracer", "der_tangente_limite"],
        },
        {
          enonce:
            "Une gérante de gîte modélise ses réservations par $R(t) = 2t^2 - 3t + 1$, où $t$ est le temps en semaines. Soit A le point de la courbe d'abscisse 2. On admet que $R'(2) = 5$.\na) Calcule $R(2)$.\nb) La droite $y = 5t - 7$ passe-t-elle par A ? Réponds oui ou non.\nc) Est-elle la tangente en A ? Réponds oui ou non.\nd) La droite $y = 4t - 5$ passe aussi par A. Est-elle la tangente en A ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $R(2) = 2 \\times 4 - 6 + 1 = 3$.\nb) En $t = 2$ : $5 \\times 2 - 7 = 3$. Oui.\nc) Elle passe par A et son coefficient directeur vaut $R'(2) = 5$ : oui.\nd) Son coefficient directeur vaut 4, et non 5 : non, c'est une sécante.\n⛔ Le piège au d) : conclure « oui » parce qu'elle passe par A. Il faut les deux conditions.\nRéponse : a) 3 ; b) oui ; c) oui ; d) non.",
          micros: ["der_tangente_reconnaitre"],
        },
        {
          enonce:
            "Un programmateur de cinéma note le nombre total de spectateurs d'un film depuis sa sortie, en centaines, semaine après semaine (modèle). Les points sont sur une courbe.\na) Quel est le coefficient directeur de la sécante entre les semaines 1 et 3 ?\nb) Entre les semaines 2 et 4 ?\nc) Donne l'équation de la sécante du a), sous la forme $y = mx + p$.",
          figure: grille(["Semaine x", "Spectateurs (centaines)"], [
            [0, 2],
            [1, 3],
            [2, 6],
            [3, 11],
            [4, 18],
          ]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: ["y = 4x - 1", "y = -1 + 4x"], exact: true },
          ],
          correction:
            "a) Points $(1\\,;3)$ et $(3\\,;11)$ : $(11 - 3) \\div (3 - 1) = 4$.\nb) Points $(2\\,;6)$ et $(4\\,;18)$ : $(18 - 6) \\div (4 - 2) = 6$.\nc) $y = 4x + p$ passe par $(1\\,;3)$ : $3 = 4 + p$, donc $p = -1$.\nVérification : $4 \\times 3 - 1 = 11$. ✔\n⛔ Le piège au a) : oublier de diviser par 2 semaines et répondre 8.\nRéponse : a) 4 ; b) 6 ; c) $y = 4x - 1$.",
          micros: ["der_secante_tracer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : calculer des coefficients directeurs, voir vers quoi ils se dirigent, conclure sur la tangente.",
      rappel: [
        "Pour un coefficient directeur : la différence des ordonnées divisée par la différence des abscisses, avec le signe.",
        "Plus le second point est proche du premier, plus la sécante ressemble à la tangente.",
        "Tester une tangente : passe-t-elle par le point ? Son coefficient directeur vaut-il le nombre dérivé ? Il faut deux oui.",
      ],
      exercices: [
        {
          titre: "Le plongeon",
          enonce:
            "Un entraîneur étudie le saut de Maya. Sa hauteur au-dessus de l'eau est $h(t) = -5t^2 + 5t + 10$, en mètres, où $t$ est le temps en secondes (modèle).\na) Quel est le coefficient directeur de la sécante entre $t = 1$ et $t = 2$ ?\nb) Entre $t = 1$ et $t = 1{,}1$ ?\nc) Entre $t = 1$ et $t = 1{,}01$ ?\nd) Vers quel nombre ces coefficients se dirigent-ils ?\ne) À l'instant $t = 1$, Maya monte-t-elle ou descend-elle ? Réponds monte ou descend.",
          reponses: [
            { question: "a)", attendu: "-10" },
            { question: "b)", attendu: "-5,5" },
            { question: "c)", attendu: "-5,05" },
            { question: "d)", attendu: "-5" },
            { question: "e)", attendu: "descend" },
          ],
          correction:
            "D'abord $h(1) = -5 + 5 + 10 = 10$.\na) $h(2) = -20 + 10 + 10 = 0$, donc $(0 - 10) \\div 1 = -10$.\nb) $h(1{,}1) = 9{,}45$, donc $(9{,}45 - 10) \\div 0{,}1 = -5{,}5$.\nc) $h(1{,}01) = 9{,}9495$, donc $(9{,}9495 - 10) \\div 0{,}01 = -5{,}05$.\nd) $-10$, puis $-5{,}5$, puis $-5{,}05$ : on se rapproche de $-5$.\ne) Ce nombre est négatif : la hauteur diminue, Maya descend.\n⛔ Le piège au d) : répondre $-5{,}05$. C'est encore une vitesse moyenne, pas celle de l'instant $t = 1$.\nRéponse : a) $-10$ ; b) $-5{,}5$ ; c) $-5{,}05$ ; d) $-5$ ; e) descend.",
          micros: ["der_tangente_limite"],
        },
        {
          titre: "Le sentier de randonnée",
          enonce:
            "Une garde forestière a tracé le profil d'un sentier. La droite orange passe par A$(1\\,;2{,}5)$ et B$(3\\,;4{,}5)$. La droite verte passe par A et par C$(2\\,;4{,}5)$.\na) Laquelle est la tangente à la courbe en A ? Réponds orange ou verte.\nb) Quel est le coefficient directeur de la droite orange ?\nc) Quel est le coefficient directeur de la droite verte ?\nd) On rapproche B de A sur la courbe. Vers quel nombre le coefficient directeur de la sécante (AB) se rapproche-t-il ?",
          figure: repere([-1, 7, -1, 6], [{ q: [-0.5, 3, 0] }, { q: [0, 1, 1.5], couleur: ORANGE }, { q: [0, 2, 0.5], couleur: VERT }], [
            { x: 1, y: 2.5, label: "A" },
            { x: 3, y: 4.5, label: "B" },
            { x: 2, y: 4.5, label: "C" },
          ]),
          reponses: [
            { question: "a)", attendu: "verte" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "2" },
          ],
          correction:
            "a) La droite orange coupe la courbe en A et en B : c'est une sécante. La verte touche la courbe en A et suit sa direction : c'est la tangente.\nb) $(4{,}5 - 2{,}5) \\div (3 - 1) = 1$.\nc) $(4{,}5 - 2{,}5) \\div (2 - 1) = 2$.\nd) La sécante se rapproche de la tangente, donc son coefficient se rapproche de celui de la droite verte : 2.\n⛔ Le piège au a) : croire que C est sur la courbe. C est sur la droite verte, au-dessus de la courbe.\nRéponse : a) verte ; b) 1 ; c) 2 ; d) 2.",
          micros: ["der_tangente_reconnaitre", "der_secante_tracer", "der_tangente_limite"],
        },
        {
          titre: "Le rythme des abonnés",
          enonce:
            "Une community manager modélise le nombre d'abonnés d'un compte par $N(t) = t^2 + 2t + 1$, en milliers, où $t$ est le temps en mois. Elle étudie le point A d'abscisse 2.\na) Calcule $N(2)$.\nb) Calcule $N(3)$.\nc) Quel est le coefficient directeur de la sécante entre $t = 2$ et $t = 3$ ?\nd) On montre que le coefficient directeur de la sécante entre $2$ et $2 + h$ vaut $6 + h$. Quel est le coefficient directeur de la tangente en A ?\ne) La droite $y = 5t - 1$ passe aussi par A. Est-elle la tangente en A ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "7" },
            { question: "d)", attendu: "6" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) $N(2) = 4 + 4 + 1 = 9$.\nb) $N(3) = 9 + 6 + 1 = 16$.\nc) $(16 - 9) \\div (3 - 2) = 7$.\nOn retrouve $6 + h$ avec $h = 1$. ✔\nd) Quand $h$ se rapproche de 0, $6 + h$ se rapproche de 6.\ne) En $t = 2$ : $5 \\times 2 - 1 = 9$, la droite passe bien par A. Mais son coefficient directeur vaut 5, et non 6 : non.\n⛔ Le piège au d) : répondre 7, le coefficient de la sécante du c). C'est encore un second point éloigné.\nRéponse : a) 9 ; b) 16 ; c) 7 ; d) 6 ; e) non.",
          micros: ["der_tangente_limite", "der_tangente_reconnaitre"],
        },
        {
          titre: "La population de cerfs",
          enonce:
            "Une garde-nature modélise une population de cerfs par $P(x) = -0{,}5x^2 + 5x$, en dizaines, où $x$ est le nombre d'années. La courbe est tracée.\na) Quel est le coefficient directeur de la sécante entre $x = 2$ et $x = 4$ ?\nb) Donne l'équation de cette sécante, sous la forme $y = mx + p$.\nc) En quelle abscisse la tangente est-elle horizontale ?\nd) On admet que $P'(2) = 3$. La droite $y = 3x + 3$ est-elle la tangente au point d'abscisse 2 ? Réponds oui ou non.",
          figure: repere([-1, 11, -1, 14], [{ q: [-0.5, 5, 0] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: ["y = 2x + 4", "y = 4 + 2x"], exact: true },
            { question: "c)", attendu: "5" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $P(2) = -2 + 10 = 8$ et $P(4) = -8 + 20 = 12$. Donc $(12 - 8) \\div (4 - 2) = 2$.\nb) $y = 2x + p$ passe par $(2\\,;8)$ : $8 = 4 + p$, donc $p = 4$.\nc) Le sommet de la courbe est au milieu de ses deux passages par 0, en $x = 0$ et $x = 10$ : en $x = 5$, la tangente est à plat.\nd) En $x = 2$ : $3 \\times 2 + 3 = 9$, alors que $P(2) = 8$. La droite ne passe pas par le point : non.\n⛔ Le piège au d) : voir le bon coefficient, 3, et répondre oui. Il faut aussi passer par le point.\nRéponse : a) 2 ; b) $y = 2x + 4$ ; c) 5 ; d) non.",
          micros: ["der_secante_tracer", "der_tangente_reconnaitre"],
        },
      ],
    },
  ],
};
