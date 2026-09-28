// ─── Fiche d'exercices : l'ajustement affine (1re, sans spécialité) ──────────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), 28/09/2026 : une
// feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/ajustement-affine.bank.ts`.
//
// ⛔ LE PROGRAMME : « plusieurs ajustements sont proposés, mais AUCUNE
// connaissance théorique n'est attendue ». On ne calcule donc jamais de droite
// de régression : la droite est DONNÉE, ou on la fait passer par deux points
// (souvent le premier et le dernier du nuage), ou par un point et un
// coefficient donnés. Interpoler et extrapoler ont leur propre feuille
// (`info-interpoler-extrapoler`) : ici, on calcule dans la plage des données.
//
// ⭐ Frédéric, 28/09 : « beaucoup de canvas et de visuel », et des contextes
// d'économie, d'écologie, de sport, de nature, de physique et d'histoire-géo —
// ses élèves de première « détestent tous les maths ». Chaque nuage est
// DESSINÉ ; les droites s'écrivent en clair (`q: [0, a, b]`) pour que le script
// les relise. Les chiffres sont des MODÈLES arrondis, jamais des données
// officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-ajustement-affine.mjs`.
//
// Micro-compétences : info_ajust_pertinence (1, 2, 7, 9, 12, 17, 19, 20),
// info_ajust_determiner (3, 4, 9, 11, 13, 14, 15, 17, 18, 19, 20),
// info_ajust_equation (5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages) :
 *  les nuages qu'on LIT restent imprimés ; seuls partent ceux qui redisent le
 *  corrigé. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoAjustementAffinePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-ajustement-affine",
  titre: "Ajustement affine",
  accroche:
    "Vingt exercices pour résumer un nuage de points par une droite : juger si c'est pertinent, trouver l'équation de la droite, puis s'en servir pour calculer. Arbres, vélos partagés, ressorts, pouls d'un coureur, festival : un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On regarde, on calcule, on conclut.",
      rappel: [
        "Un ajustement affine remplace un nuage de points par une DROITE qui le résume. Il est pertinent quand les points sont à peu près alignés.",
        "La droite qui passe par $A(x_A ; y_A)$ et $B(x_B ; y_B)$ a pour coefficient directeur $a = \\dfrac{y_B - y_A}{x_B - x_A}$. Puis on trouve $b$ avec un point : $y_A = a x_A + b$.",
        "Avec l'équation $y = ax + b$ : on remplace $x$ pour calculer $y$ ; on résout $ax + b = k$ pour trouver $x$.",
        "Le coefficient $a$ se lit comme une vitesse : quand $x$ augmente de $1$, $y$ augmente de $a$ (ou diminue, si $a < 0$).",
      ],
      exercices: [
        {
          enonce:
            "Dans une jeune forêt, on mesure chaque année la hauteur moyenne des arbres, en mètres ($x$ : les années depuis la première mesure). Voici le nuage de points. Un ajustement affine est-il pertinent ?",
          figure: repere([-1, 6, -1, 10], [], [
            { x: 0, y: 2, label: "" },
            { x: 1, y: 3, label: "" },
            { x: 2, y: 5, label: "" },
            { x: 3, y: 6, label: "" },
            { x: 4, y: 8, label: "" },
            { x: 5, y: 9, label: "" },
          ], undefined, true),
          correction:
            "On regarde l'allure d'ensemble du nuage, sans s'arrêter sur chaque point.\nLes points montent régulièrement, d'environ $1{,}4$ m par an, et restent près d'une même ligne droite.\nOui : un ajustement affine est pertinent.\n⚠️ Les points ne sont pas PARFAITEMENT alignés, et ce n'est pas demandé : il suffit qu'ils le soient à peu près.\nSur le dessin, la droite qui passe par le premier et le dernier point, d'équation $y = 1{,}4x + 2$, frôle tous les autres.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 10], [{ q: [0, 1.4, 2] }], [
              { x: 0, y: 2, label: "" },
              { x: 1, y: 3, label: "" },
              { x: 2, y: 5, label: "" },
              { x: 3, y: 6, label: "" },
              { x: 4, y: 8, label: "" },
              { x: 5, y: 9, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_pertinence"],
        },
        {
          enonce:
            "Un refuge de montagne compte ses nuitées, en centaines, chaque mois de mai ($x = 0$) à novembre ($x = 6$). Faut-il résumer ce nuage par une droite ?",
          figure: repere([-1, 7, -1, 9], [], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 4, label: "" },
            { x: 2, y: 6, label: "" },
            { x: 3, y: 7, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 5, y: 4, label: "" },
            { x: 6, y: 1, label: "" },
          ]),
          correction:
            "Les nuitées MONTENT de mai à août, puis REDESCENDENT jusqu'en novembre : le nuage a la forme d'une bosse.\nUne droite, elle, ne change jamais de sens : elle monte toujours, ou descend toujours.\nNon : un ajustement affine n'est pas pertinent ici.\n⚠️ On peut toujours CALCULER une droite qui passe « au milieu » des points. Mais elle serait loin de presque tous : elle ne résumerait rien.",
          micros: ["info_ajust_pertinence"],
        },
        {
          enonce:
            "La droite tracée ajuste le nuage. Elle passe par les deux points du nuage d'abscisses $0$ et $4$. Lire les coordonnées de ces deux points, puis déterminer l'équation de la droite.",
          figure: repere([-1, 5, -1, 10], [{ q: [0, 1.5, 3] }], [
            { x: 0, y: 3, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 6, label: "" },
            { x: 3, y: 7, label: "" },
            { x: 4, y: 9, label: "" },
          ], undefined, true),
          correction:
            "On lit $A(0 ; 3)$ et $B(4 ; 9)$.\nLe coefficient directeur : $a = \\dfrac{9 - 3}{4 - 0} = \\dfrac{6}{4} = 1{,}5$.\nLa droite coupe l'axe des ordonnées en $3$ : c'est l'ordonnée à l'origine, $b = 3$.\nL'équation est $y = 1{,}5x + 3$.\n✔️ Vérification avec $B$ : $1{,}5 \\times 4 + 3 = 9$.\n⚠️ Le piège : écrire $\\dfrac{4 - 0}{9 - 3}$. On divise ce que la droite MONTE par ce qu'elle AVANCE, dans cet ordre.",
          micros: ["info_ajust_determiner"],
        },
        {
          enonce: "Déterminer l'équation de la droite d'ajustement qui passe par les points $A(2 ; 50)$ et $B(6 ; 70)$.",
          correction:
            "Le coefficient directeur : $a = \\dfrac{70 - 50}{6 - 2} = \\dfrac{20}{4} = 5$.\nPour trouver $b$, on écrit que $A$ est sur la droite : $50 = 5 \\times 2 + b$, donc $b = 50 - 10 = 40$.\nL'équation est $y = 5x + 40$.\n✔️ Vérification avec $B$ : $5 \\times 6 + 40 = 70$.\n⚠️ $b$ ne vaut pas $50$ : $b$ est la valeur de $y$ pour $x = 0$, pas pour $x = 2$.\n⭐ Sur le dessin, en dizaines : la droite passe par $A$ et $B$, et coupe l'axe vertical en $4$ dizaines, soit $b = 40$.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 9], [{ q: [0, 0.5, 4] }], [
              { x: 2, y: 5, label: "" },
              { x: 6, y: 7, label: "" },
            ]),
          ),
          micros: ["info_ajust_determiner"],
        },
        {
          enonce: "Une droite d'ajustement a pour équation $y = 0{,}8x + 12$. Quelle valeur de $y$ donne-t-elle pour $x = 5$ ?",
          correction:
            "On remplace $x$ par $5$ : $y = 0{,}8 \\times 5 + 12$.\nLa multiplication d'abord : $0{,}8 \\times 5 = 4$.\nPuis l'addition : $y = 4 + 12 = 16$.\n⚠️ Le piège des priorités : $0{,}8 \\times (5 + 12) = 13{,}6$ n'est pas le bon calcul.",
          schema: ecranSeulement(tableau(["x", "0", "5", "10"], ["y = 0,8x + 12", 12, 16, 20])),
          micros: ["info_ajust_equation"],
        },
        {
          enonce: "Une droite d'ajustement a pour équation $y = 2{,}5x + 10$. Pour quelle valeur de $x$ donne-t-elle $y = 30$ ?",
          correction:
            "Cette fois, on connaît $y$ et on cherche $x$ : on résout une équation.\n$2{,}5x + 10 = 30$, donc $2{,}5x = 20$.\n$x = \\dfrac{20}{2{,}5} = 8$.\n✔️ Vérification : $2{,}5 \\times 8 + 10 = 20 + 10 = 30$.\n⭐ Deux questions, deux gestes : « que vaut $y$ ? » se calcule, « pour quel $x$ ? » se résout.",
          schema: ecranSeulement(tableau(["x", "0", "4", "8"], ["y = 2,5x + 10", 10, 20, 30])),
          micros: ["info_ajust_equation"],
        },
        {
          enonce:
            "Une vidéo devient populaire : voici le nombre de vues, en milliers, jour après jour depuis sa mise en ligne. Un ajustement affine est-il pertinent ?",
          figure: repere([-1, 7, -1, 14], [], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 2, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 3, y: 4, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 5, y: 9, label: "" },
            { x: 6, y: 13, label: "" },
          ], undefined, true),
          correction:
            "On regarde de combien le nombre de vues augmente d'un jour à l'autre : $+1$, $+1$, $+1$, $+2$, $+3$, $+4$.\nLes hausses GRANDISSENT : le nuage se courbe vers le haut.\nUne droite, elle, monte toujours du même pas.\nNon : un ajustement affine n'est pas pertinent. La droite passerait loin des derniers points.\n⭐ Une croissance qui s'accélère ressemble plutôt à une croissance exponentielle.",
          micros: ["info_ajust_pertinence"],
        },
        {
          enonce:
            "La hauteur d'eau d'une citerne de jardin, en cm, est ajustée par $y = -1{,}5x + 40$, où $x$ est le nombre de jours sans pluie.\na) Que donne le modèle pour $x = 10$ ?\nb) Que signifie le nombre $-1{,}5$ ?",
          correction:
            "a) $y = -1{,}5 \\times 10 + 40 = -15 + 40 = 25$ : il reste environ $25$ cm d'eau après dix jours.\nb) Le coefficient directeur vaut $-1{,}5$ : chaque jour sans pluie, la hauteur d'eau BAISSE d'environ $1{,}5$ cm.\n⚠️ Le signe moins dit que l'eau diminue : on arrose avec.\nSur le dessin, en dizaines de cm : la droite descend de $4$ à $2{,}5$ en dix jours.",
          schema: ecranSeulement(
            repere([-1, 12, -1, 5], [{ q: [0, -0.15, 4] }], [{ x: 10, y: 2.5, label: "" }], undefined, true),
          ),
          micros: ["info_ajust_equation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Regarder le nuage, trouver la droite, s'en servir, puis conclure par une phrase.",
      rappel: [
        "On commence TOUJOURS par regarder le nuage : un ajustement affine n'a de sens que si les points sont à peu près alignés.",
        "Pour trouver la droite, on choisit deux points (souvent le premier et le dernier du nuage), on calcule $a$, puis $b$.",
        "Le modèle donne une ESTIMATION : la valeur observée peut s'en écarter un peu. Une droite résume, elle ne recopie pas.",
        "Le coefficient $a$ a une unité : « $1{,}5$ cm par jour », « $150$ € par an ».",
      ],
      exercices: [
        {
          titre: "La boulangerie bio",
          enonce:
            "Une boulangerie bio note son chiffre d'affaires mensuel, en milliers d'euros, pendant ses six premiers mois ($x$ : le numéro du mois).\na) Un ajustement affine est-il pertinent ?\nb) Déterminer l'équation de la droite qui passe par les points des mois $1$ et $6$.\nc) Quel chiffre d'affaires le modèle donne-t-il pour le mois $4$ ? Comparer au relevé.",
          figure: repere([-1, 7, -1, 8], [], [
            { x: 1, y: 4, label: "" },
            { x: 2, y: 5, label: "" },
            { x: 3, y: 5, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 5, y: 6.5, label: "" },
            { x: 6, y: 7, label: "" },
          ]),
          correction:
            "a) Les points montent assez régulièrement et restent près d'une ligne droite : oui, l'ajustement affine est pertinent.\nb) On lit $(1 ; 4)$ et $(6 ; 7)$. $a = \\dfrac{7 - 4}{6 - 1} = \\dfrac{3}{5} = 0{,}6$.\nPuis $4 = 0{,}6 \\times 1 + b$, donc $b = 4 - 0{,}6 = 3{,}4$. L'équation est $y = 0{,}6x + 3{,}4$.\nc) $y = 0{,}6 \\times 4 + 3{,}4 = 2{,}4 + 3{,}4 = 5{,}8$ : le modèle donne $5\\,800$ €.\nLe relevé du mois $4$ est $6\\,000$ € : ce mois-là, la boulangerie a fait $200$ € de mieux que le modèle.\n⚠️ Le premier point est au mois $1$, pas au mois $0$ : $b$ n'est pas $4$, il faut le calculer.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 8], [{ q: [0, 0.6, 3.4] }], [
              { x: 1, y: 4, label: "" },
              { x: 2, y: 5, label: "" },
              { x: 3, y: 5, label: "" },
              { x: 4, y: 6, label: "" },
              { x: 5, y: 6.5, label: "" },
              { x: 6, y: 7, label: "" },
            ]),
          ),
          micros: ["info_ajust_pertinence", "info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "L'eau du lac",
          enonce:
            "La température de l'eau d'un lac, relevée tous les sept jours en mai, est ajustée par la droite $y = 0{,}2x + 9{,}8$ ($x$ : le jour du mois ; $y$ en °C).\na) Que prévoit le modèle pour le $15$ mai ? Quel est l'écart avec le relevé ?\nb) Quel jour le modèle annonce-t-il une eau à $13{,}8$ °C ?\nc) Traduire le nombre $0{,}2$ par une phrase.",
          figure: tableau(["jour de mai", "1", "8", "15", "22", "29"], ["eau (°C)", 10, 11.5, 13, 14, 16]),
          correction:
            "a) $y = 0{,}2 \\times 15 + 9{,}8 = 3 + 9{,}8 = 12{,}8$ °C. Le relevé du $15$ mai est $13$ °C : l'écart est de $0{,}2$ °C.\nb) On résout $0{,}2x + 9{,}8 = 13{,}8$ : $0{,}2x = 4$, donc $x = \\dfrac{4}{0{,}2} = 20$. C'est le $20$ mai.\nc) Selon le modèle, l'eau se réchauffe d'environ $0{,}2$ °C par jour, soit $1{,}4$ °C par semaine.\n⭐ Le modèle ne dit rien d'un jour précis de pluie ou de vent : il donne la TENDANCE du mois.",
          micros: ["info_ajust_equation"],
        },
        {
          titre: "Le pouls du coureur",
          enonce:
            "Un coureur débutant mesure son pouls au repos, en battements par minute, toutes les deux semaines.\na) Déterminer l'équation de la droite qui passe par le premier et le dernier relevé.\nb) Que donne le modèle pour la semaine $2$ ? pour la semaine $4$ ? Comparer aux relevés.\nc) Que signifie le coefficient directeur ?",
          figure: tableau(["semaine", "0", "2", "4", "6", "8"], ["pouls", 72, 70, 66, 63, 60]),
          correction:
            "a) Les deux points : $(0 ; 72)$ et $(8 ; 60)$. $a = \\dfrac{60 - 72}{8 - 0} = \\dfrac{-12}{8} = -1{,}5$.\nLa droite passe par $(0 ; 72)$ : $b = 72$. L'équation est $y = -1{,}5x + 72$.\nb) Semaine $2$ : $-1{,}5 \\times 2 + 72 = 69$, pour $70$ relevé. Semaine $4$ : $-1{,}5 \\times 4 + 72 = 66$, exactement le relevé.\nc) Le pouls au repos baisse d'environ $1{,}5$ battement par minute chaque semaine : le cœur s'entraîne, il bat moins vite pour le même travail.\n⚠️ Le numérateur $60 - 72$ est NÉGATIF : oublier le signe donnerait une droite qui monte.",
          micros: ["info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "Le mois de naissance",
          enonce:
            "Pour sept élèves nés de janvier ($x = 1$) à juillet ($x = 7$), on note le mois de naissance et la note sur $10$ au dernier contrôle ($y$). Un ajustement affine est-il pertinent ?",
          figure: repere([-1, 8, -1, 10], [], [
            { x: 1, y: 6, label: "" },
            { x: 2, y: 2, label: "" },
            { x: 3, y: 8, label: "" },
            { x: 4, y: 3, label: "" },
            { x: 5, y: 7, label: "" },
            { x: 6, y: 4, label: "" },
            { x: 7, y: 9, label: "" },
          ], undefined, true),
          correction:
            "Les points montent, descendent, remontent : ils ne suivent aucune direction.\nNon : il n'y a aucune tendance à résumer, un ajustement affine n'a pas de sens.\n⚠️ Un tableur calculerait quand même une droite. Elle ne voudrait rien dire : la note ne dépend pas du mois de naissance.\n⭐ On regarde le nuage AVANT de calculer : c'est le premier réflexe du statisticien.",
          micros: ["info_ajust_pertinence"],
        },
        {
          titre: "Le prix des panneaux solaires",
          enonce:
            "Dans un modèle, le prix d'un panneau solaire, en centaines d'euros, baisse d'année en année ($x$ : les années depuis le premier relevé).\na) Déterminer l'équation de la droite qui passe par le premier et le dernier point.\nb) Que donne le modèle pour $x = 4$ ? Traduire en euros.\nc) De combien le prix baisse-t-il chaque année, selon ce modèle ?",
          figure: repere([-1, 7, -1, 13], [], [
            { x: 0, y: 12, label: "" },
            { x: 1, y: 10, label: "" },
            { x: 2, y: 9, label: "" },
            { x: 3, y: 8, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 5, y: 5, label: "" },
            { x: 6, y: 3, label: "" },
          ], undefined, true),
          correction:
            "a) Les deux points : $(0 ; 12)$ et $(6 ; 3)$. $a = \\dfrac{3 - 12}{6 - 0} = \\dfrac{-9}{6} = -1{,}5$, et $b = 12$.\nL'équation est $y = -1{,}5x + 12$.\nb) $y = -1{,}5 \\times 4 + 12 = -6 + 12 = 6$ : $6$ centaines d'euros, soit $600$ € le panneau.\nc) Le coefficient $-1{,}5$ est en centaines d'euros par an : le prix baisse d'environ $150$ € par an.\n⚠️ L'unité ! « $-1{,}5$ » n'est pas « $1{,}50$ € de moins » : l'axe des ordonnées compte en centaines.",
          schema: ecranSeulement(
            repere([-1, 7, -1, 13], [{ q: [0, -1.5, 12] }], [
              { x: 0, y: 12, label: "" },
              { x: 1, y: 10, label: "" },
              { x: 2, y: 9, label: "" },
              { x: 3, y: 8, label: "" },
              { x: 4, y: 6, label: "" },
              { x: 5, y: 5, label: "" },
              { x: 6, y: 3, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "Les vélos partagés",
          enonce:
            "Un service de vélos partagés compte ses locations, en milliers, chaque mois depuis son ouverture. Deux élèves proposent une droite d'ajustement : la bleue, $y = 1{,}6x + 1$, et l'orange, $y = 0{,}4x + 4$.\na) Calculer, pour chacune, la valeur donnée pour $x = 0$ et pour $x = 5$. Comparer aux relevés.\nb) Quelle droite choisir ?",
          figure: repere([-1, 6, -1, 10], [{ q: [0, 1.6, 1] }, { q: [0, 0.4, 4], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 3, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 3, y: 6, label: "" },
            { x: 4, y: 7, label: "" },
            { x: 5, y: 9, label: "" },
          ], undefined, true),
          correction:
            "a) La bleue : $1{,}6 \\times 0 + 1 = 1$ et $1{,}6 \\times 5 + 1 = 9$. Ce sont exactement les relevés, $1$ et $9$.\nL'orange : $0{,}4 \\times 0 + 4 = 4$ et $0{,}4 \\times 5 + 4 = 6$. Elle se trompe de $3$ milliers au début ET à la fin.\nb) On choisit la bleue : elle suit la direction du nuage, avec des points de part et d'autre tout du long.\nL'orange est trop plate : elle passe au-dessus des premiers points et au-dessous des derniers.\n⭐ Une bonne droite d'ajustement laisse des points des DEUX côtés, au début comme à la fin.",
          micros: ["info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "Le ressort",
          enonce:
            "En TP de physique, on mesure la longueur d'un ressort, en cm, selon la masse accrochée, en dizaines de grammes. On ajuste le nuage par une droite de coefficient directeur $0{,}5$ qui passe par le point $G(10 ; 8)$.\na) Déterminer l'équation de la droite.\nb) Quelle longueur le modèle donne-t-il pour une masse de $140$ g ?\nc) Que représente l'ordonnée à l'origine ?",
          correction:
            "a) L'équation est de la forme $y = 0{,}5x + b$. $G$ est sur la droite : $8 = 0{,}5 \\times 10 + b$, donc $b = 8 - 5 = 3$.\nL'équation est $y = 0{,}5x + 3$.\nb) $140$ g, c'est $14$ dizaines de grammes : $x = 14$. $y = 0{,}5 \\times 14 + 3 = 7 + 3 = 10$ : le ressort mesure $10$ cm.\nc) Pour $x = 0$, sans aucune masse, $y = 3$ : c'est la longueur du ressort à vide, $3$ cm.\n⚠️ $x = 14$ et non $140$ : l'axe compte en dizaines de grammes.\n⭐ Le coefficient $0{,}5$ dit que le ressort s'allonge de $0{,}5$ cm par dizaine de grammes. Un ressort plus raide aurait un coefficient plus petit.",
          schema: ecranSeulement(tableau(["masse (g)", "0", "100", "120", "140"], ["longueur (cm)", 3, 8, 9, 10])),
          micros: ["info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "La ville qui grandit",
          enonce:
            "Dans un pays imaginaire, la part de la population qui vit en ville, en %, est ajustée par $y = 0{,}4x + 58$, où $x$ est le nombre d'années depuis $1990$.\na) Que donne le modèle pour $2020$ ?\nb) En quelle année le modèle atteint-il $74$ % ?\nc) En $2010$, on a mesuré $67$ %. Est-ce au-dessus ou au-dessous du modèle ?",
          correction:
            "a) $2020$, c'est $x = 30$. $y = 0{,}4 \\times 30 + 58 = 12 + 58 = 70$ : $70$ % de citadins.\nb) On résout $0{,}4x + 58 = 74$ : $0{,}4x = 16$, donc $x = \\dfrac{16}{0{,}4} = 40$. C'est l'année $1990 + 40 = 2030$.\nc) $2010$, c'est $x = 20$ : le modèle donne $0{,}4 \\times 20 + 58 = 66$ %. La mesure, $67$ %, est $1$ point AU-DESSUS du modèle.\n⚠️ $x$ n'est pas l'année elle-même : remplacer $x$ par $2020$ donnerait $866$ %, absurde.\n⭐ Le coefficient dit que la part des citadins gagne environ $0{,}4$ point par an : c'est l'exode rural, lu dans une équation.",
          schema: ecranSeulement(tableau(["année", "1990", "2010", "2020", "2030"], ["modèle (%)", 58, 66, 70, 74])),
          micros: ["info_ajust_equation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet : juger le nuage, trouver la droite, s'en servir, interpréter.",
      rappel: [
        "Quatre étapes : 1) le nuage est-il à peu près rectiligne ? 2) l'équation, par deux points ; 3) les calculs avec l'équation ; 4) une phrase avec les unités.",
        "Résoudre $ax + b = k$ répond à la question « quand ? » ou « combien faut-il ? » ; remplacer $x$ répond à « combien ? ».",
      ],
      exercices: [
        {
          titre: "Les abeilles du jardin",
          enonce:
            "Dans sept jardins, un club nature compte les massifs fleuris ($x$) et les abeilles observées en dix minutes ($y$, en dizaines).\na) Le nuage justifie-t-il un ajustement affine ?\nb) Déterminer l'équation de la droite qui passe par les points d'abscisses $1$ et $7$.\nc) Combien d'abeilles le modèle prévoit-il dans un jardin de $4$ massifs ? Comparer au relevé.\nd) Un jardin compte $95$ abeilles. Combien de massifs le modèle lui associe-t-il ?",
          figure: repere([-1, 8, -1, 12], [], [
            { x: 1, y: 2, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 3, y: 5, label: "" },
            { x: 4, y: 6, label: "" },
            { x: 5, y: 8, label: "" },
            { x: 6, y: 10, label: "" },
            { x: 7, y: 11, label: "" },
          ], undefined, true),
          correction:
            "a) Les points montent régulièrement, sans s'écarter d'une ligne droite : oui.\nb) Les points $(1 ; 2)$ et $(7 ; 11)$ : $a = \\dfrac{11 - 2}{7 - 1} = \\dfrac{9}{6} = 1{,}5$.\n$2 = 1{,}5 \\times 1 + b$, donc $b = 0{,}5$. L'équation est $y = 1{,}5x + 0{,}5$.\nc) $y = 1{,}5 \\times 4 + 0{,}5 = 6{,}5$ dizaines : $65$ abeilles. Le relevé en donne $60$ : $5$ de moins que le modèle.\nd) $95$ abeilles, c'est $9{,}5$ dizaines. $1{,}5x + 0{,}5 = 9{,}5$, donc $1{,}5x = 9$ et $x = 6$ massifs.\n⚠️ Les unités : $y$ compte des DIZAINES d'abeilles. Résoudre $1{,}5x + 0{,}5 = 95$ donnerait $63$ massifs, absurde.\n⭐ Le modèle ne dit pas que les fleurs « fabriquent » des abeilles : il dit que les deux vont ensemble.",
          schema: ecranSeulement(
            repere([-1, 8, -1, 12], [{ q: [0, 1.5, 0.5] }], [
              { x: 1, y: 2, label: "" },
              { x: 2, y: 4, label: "" },
              { x: 3, y: 5, label: "" },
              { x: 4, y: 6, label: "" },
              { x: 5, y: 8, label: "" },
              { x: 6, y: 10, label: "" },
              { x: 7, y: 11, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_pertinence", "info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "La courbe de croissance",
          enonce:
            "Un carnet de santé donne la taille d'un enfant, en cm, à différents âges.\na) Déterminer l'équation de la droite qui passe par les relevés de $2$ ans et de $10$ ans.\nb) Quelle taille le modèle donne-t-il à $7$ ans ?\nc) À quel âge le modèle donne-t-il $107{,}5$ cm ?\nd) Que signifie le coefficient directeur ?",
          figure: tableau(["âge (ans)", "2", "4", "6", "8", "10"], ["taille (cm)", 88, 102, 115, 128, 140]),
          correction:
            "a) Les points $(2 ; 88)$ et $(10 ; 140)$ : $a = \\dfrac{140 - 88}{10 - 2} = \\dfrac{52}{8} = 6{,}5$.\n$88 = 6{,}5 \\times 2 + b$, donc $b = 88 - 13 = 75$. L'équation est $y = 6{,}5x + 75$.\nb) $y = 6{,}5 \\times 7 + 75 = 45{,}5 + 75 = 120{,}5$ cm.\nc) $6{,}5x + 75 = 107{,}5$, donc $6{,}5x = 32{,}5$ et $x = 5$ : à $5$ ans.\nd) Entre $2$ et $10$ ans, l'enfant grandit d'environ $6{,}5$ cm par an.\n✔️ Le modèle colle aux relevés : il donne $101$ cm à $4$ ans, $114$ cm à $6$ ans, $127$ cm à $8$ ans, pour $102$, $115$ et $128$ mesurés.\n⚠️ Le modèle donnerait $75$ cm à la naissance, alors qu'un bébé mesure bien moins : une droite d'ajustement ne vaut que sur la plage de ses relevés.",
          micros: ["info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "Le budget d'un festival",
          enonce:
            "Les organisateurs d'un festival ont noté, sur six éditions, le nombre de festivaliers ($x$, en milliers) et le coût total ($y$, en dizaines de milliers d'euros).\na) Un ajustement affine est-il pertinent ?\nb) Déterminer l'équation de la droite qui passe par les points d'abscisses $1$ et $6$.\nc) Que représentent $a$ et $b$ ? Traduire en euros.\nd) Le billet coûte $15$ €. La recette est donc $y = 1{,}5x$, dans les mêmes unités. À partir de combien de festivaliers la recette dépasse-t-elle le coût ?",
          figure: repere([-1, 7, -1, 10], [], [
            { x: 1, y: 4, label: "" },
            { x: 2, y: 5, label: "" },
            { x: 3, y: 5.5, label: "" },
            { x: 4, y: 7, label: "" },
            { x: 5, y: 7.5, label: "" },
            { x: 6, y: 9, label: "" },
          ], undefined, true),
          correction:
            "a) Les points montent régulièrement et restent près d'une droite : oui.\nb) Les points $(1 ; 4)$ et $(6 ; 9)$ : $a = \\dfrac{9 - 4}{6 - 1} = \\dfrac{5}{5} = 1$. $4 = 1 \\times 1 + b$, donc $b = 3$.\nL'équation du coût est $y = x + 3$.\nc) $b = 3$ : même sans public, le festival coûte $3$ dizaines de milliers, soit $30\\,000$ € (scène, sécurité). Ce sont les frais fixes.\n$a = 1$ : chaque millier de festivaliers ajoute $10\\,000$ € de coût, soit $10$ € par personne.\nd) $15$ € par billet, c'est $15\\,000$ € par millier, soit $1{,}5$ dizaine de milliers : la recette est $y = 1{,}5x$.\nOn compare : $1{,}5x > x + 3$ quand $0{,}5x > 3$, soit $x > 6$.\nLa recette dépasse le coût au-delà de $6\\,000$ festivaliers. Sur le dessin, les deux droites se croisent au point $(6 ; 9)$.\n⭐ Les frais fixes expliquent tout : il faut assez de public pour les « rembourser ».",
          schema: ecranSeulement(
            repere([-1, 7, -1, 10], [{ q: [0, 1, 3] }, { q: [0, 1.5, 0], couleur: ORANGE }], [
              { x: 6, y: 9, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_pertinence", "info_ajust_determiner", "info_ajust_equation"],
        },
        {
          titre: "Voiture électrique : vitesse et autonomie",
          enonce:
            "Sur autoroute, on mesure l'autonomie d'une voiture électrique ($y$, en centaines de km) selon sa vitesse ($x$, en dizaines de km/h).\na) Un ajustement affine est-il pertinent ?\nb) Déterminer l'équation de la droite qui passe par le premier et le dernier point.\nc) Quelle autonomie le modèle donne-t-il à $90$ km/h ? Comparer au relevé.\nd) À quelle vitesse faut-il rouler, selon le modèle, pour parcourir $400$ km ?",
          figure: repere([-1, 14, -1, 6], [], [
            { x: 5, y: 4.5, label: "" },
            { x: 7, y: 4.1, label: "" },
            { x: 9, y: 3.4, label: "" },
            { x: 11, y: 3, label: "" },
            { x: 13, y: 2.5, label: "" },
          ], undefined, true),
          correction:
            "a) Plus on roule vite, moins on va loin, et les points descendent à peu près en ligne droite : oui.\nb) Les points $(5 ; 4{,}5)$ et $(13 ; 2{,}5)$ : $a = \\dfrac{2{,}5 - 4{,}5}{13 - 5} = \\dfrac{-2}{8} = -0{,}25$.\n$4{,}5 = -0{,}25 \\times 5 + b$, donc $b = 4{,}5 + 1{,}25 = 5{,}75$. L'équation est $y = -0{,}25x + 5{,}75$.\nc) $90$ km/h, c'est $x = 9$ : $y = -2{,}25 + 5{,}75 = 3{,}5$, soit $350$ km. Le relevé donne $340$ km : $10$ km de moins.\nd) $400$ km, c'est $y = 4$. $-0{,}25x + 5{,}75 = 4$, donc $0{,}25x = 1{,}75$ et $x = 7$ : il faut rouler à $70$ km/h.\n⚠️ Deux changements d'unité : les vitesses sont en DIZAINES de km/h, les distances en CENTAINES de km.\n⭐ En physique, la résistance de l'air grandit vite avec la vitesse : rouler moins vite, c'est aller plus loin avec la même batterie.",
          schema: ecranSeulement(
            repere([-1, 14, -1, 6], [{ q: [0, -0.25, 5.75] }], [
              { x: 5, y: 4.5, label: "" },
              { x: 7, y: 4.1, label: "" },
              { x: 9, y: 3.4, label: "" },
              { x: 11, y: 3, label: "" },
              { x: 13, y: 2.5, label: "" },
            ], undefined, true),
          ),
          micros: ["info_ajust_pertinence", "info_ajust_determiner", "info_ajust_equation"],
        },
      ],
    },
  ],
};
