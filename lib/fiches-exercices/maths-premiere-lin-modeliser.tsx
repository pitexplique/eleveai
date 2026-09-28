// ─── Fiche d'exercices : modéliser une croissance linéaire (1re, sans spé) ────
//                              20 exercices corrigés
//
// Chapitre « Variation linéaire » (BOP1VL) de la première SANS spécialité
// (28/09/2026), une feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonctions-affines.bank.ts`
// (micros lin_modele_reconnaitre, lin_modele_choisir, lin_modele_conclure).
//
// ⭐⭐ LE FIL : TROIS QUESTIONS, TOUJOURS LES MÊMES. 1) Ajoute-t-on une QUANTITÉ
// fixe (linéaire) ou un POURCENTAGE fixe (pas linéaire) ? 2) Mesure-t-on à des
// dates fixes (discret : une suite, des POINTS) ou à tout instant (continu :
// une fonction, une DROITE) ? 3) Qu'est-ce que le nombre trouvé veut dire, dans
// une phrase, avec l'unité ? Le dessin montre la différence : points isolés
// (9, 16, 17) ou trait continu (10, 15, 18, 20).
// Pièges nommés : un pourcentage constant n'est pas linéaire (1, 12, 19), le
// total n'est pas le gain (5), répondre « x = 10 » (8), les unités d'un modèle
// en milliers et en centaines (14), le rang d'une année (11), un départ qui
// n'est pas zéro (15), relier des points discrets (16), 5,33 h n'est pas
// 5 h 33 (18), deux modèles qui se confondent au début (19), t = 4 n'est pas
// 4 h du matin (20).
//
// ⭐ Frédéric, 28/09 : du visuel et des contextes, dont la PHYSIQUE (mouvement
// uniforme 15, charge d'une batterie 18) et l'HISTOIRE-GÉO (recul du trait de
// côte 13), à côté de l'économie (épargne, loyers, recette), de l'écologie
// (covoiturage, piste cyclable, parking à vélos), du sport (natation, course,
// randonnée) et de la nature (troupeau). Chiffres = MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-lin-modeliser.mjs`.
//
// Micro-compétences : lin_modele_reconnaitre (1, 2, 6, 7, 9, 10, 11, 12, 15,
// 16, 17, 19), lin_modele_choisir (2, 3, 4, 6, 9, 10, 11, 12, 13, 15, 16, 17,
// 18, 19, 20), lin_modele_conclure (3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16,
// 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesLinModeliserPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "lin-modeliser",
  titre: "Modéliser une croissance linéaire",
  accroche:
    "Vingt exercices pour reconnaître une croissance linéaire, choisir entre une suite arithmétique et une fonction affine, puis répondre par une phrase dans le contexte. Des points pour ce qui se compte, une droite pour ce qui varie à tout instant. Un rappel de cours avant chaque niveau, une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question à la fois : linéaire ou pas, suite ou fonction, et la phrase.",
      rappel: [
        "Croissance LINÉAIRE : on ajoute toujours la même QUANTITÉ ($+3$ cm par mois, $-50$ € par mois). Si l'on ajoute toujours le même POURCENTAGE, elle ne l'est pas.",
        "Des mesures à des dates fixes (chaque mois, chaque année) : une SUITE arithmétique $u_n = u_0 + n \\times r$. C'est du discret.",
        "Une grandeur qui varie à tout instant (un volume, une distance) : une FONCTION affine $f(x) = ax + b$. C'est du continu.",
        "On conclut par une phrase qui répond à la question, avec l'unité.",
      ],
      exercices: [
        {
          enonce: "Parmi ces situations, lesquelles sont des croissances (ou décroissances) linéaires ?\na) Une plante grandit de $3$ cm par mois.\nb) Une population augmente de $3$ % par an.\nc) Un compte perd $50$ € chaque mois.\nd) Le nombre de bactéries double chaque heure.",
          correction:
            "a) On ajoute toujours $3$ cm : linéaire.\nb) $3$ % d'une population qui grandit, c'est chaque année un peu plus d'habitants : pas linéaire. On multiplie par $1{,}03$.\nc) On retire toujours $50$ € : linéaire, et décroissante.\nd) Doubler, c'est multiplier par $2$ : pas linéaire.\n⚠️ Le piège est b) : un pourcentage constant ne donne pas une croissance linéaire.\nSur le dessin, en partant de $1$ : ajouter $1$ à chaque étape donne des points alignés (droite bleue) ; doubler donne $1$ ; $2$ ; $4$ ; $8$, une ligne orange qui se redresse.",
          schema: ecranSeulement(repere([-1, 4, -1, 9], [{ q: [0, 1, 1] }, { pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 2, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 3, y: 4, label: "" },
            { x: 2, y: 4, label: "" },
            { x: 3, y: 8, label: "" },
          ])),
          micros: ["lin_modele_reconnaitre"],
        },
        {
          enonce: "Pour chaque situation, dire si l'on modélise plutôt par une suite (discret) ou par une fonction (continu).\na) Le nombre d'adhérents d'un club, compté le $1$er septembre de chaque année.\nb) La hauteur d'eau dans une baignoire qui se remplit à débit constant.\nc) Le nombre de places de parking construites chaque année.\nd) La distance parcourue par un train qui roule à vitesse constante.",
          correction:
            "a) On compte une fois par an : une suite $u_n$, avec $n$ le nombre d'années. Discret.\nb) La hauteur change à chaque instant : une fonction $h(t)$ du temps. Continu.\nc) Un bilan chaque année : une suite. Discret.\nd) La distance existe à tout instant : une fonction $d(t)$. Continu.\n⭐ La question à se poser : la grandeur a-t-elle un sens ENTRE deux mesures ? Si oui, c'est du continu.\nSur le dessin : une suite, ce sont les seuls points rouges ; une fonction, c'est toute la droite, entre les points aussi.",
          schema: ecranSeulement(repere([-1, 5, -1, 6], [{ q: [0, 1, 1] }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 2, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 3, y: 4, label: "" },
          ])),
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir"],
        },
        {
          enonce: "Une bibliothèque possède $3\\,000$ livres et en achète $150$ chaque année. Modéliser le nombre de livres par une suite, puis calculer ce nombre au bout de $8$ ans.",
          correction:
            "On compte les livres une fois par an : une suite. On note $u_n$ le nombre de livres au bout de $n$ années.\nOn ajoute toujours $150$ : suite arithmétique de premier terme $u_0 = 3\\,000$ et de raison $150$, donc $u_n = 3\\,000 + 150n$.\n$u_8 = 3\\,000 + 150 \\times 8 = 4\\,200$ : au bout de $8$ ans, la bibliothèque possède $4\\,200$ livres.\n⚠️ Ne pas échanger les rôles : $3\\,000$ est le départ, $150$ la raison.\nSur le dessin (en milliers de livres, un point tous les deux ans), des points isolés : on compte les livres une fois par an.",
          schema: repere([-1, 9, -1, 5], [], [
            { x: 0, y: 3, label: "" },
            { x: 2, y: 3.3, label: "" },
            { x: 4, y: 3.6, label: "" },
            { x: 6, y: 3.9, label: "" },
            { x: 8, y: 4.2, label: "" },
          ]),
          micros: ["lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          enonce: "Un réservoir contient $500$ L d'eau et se vide de $20$ L par minute. Modéliser le volume par une fonction du temps, puis dire quand le réservoir est vide.",
          correction:
            "Le volume change à chaque instant : une fonction $V(t)$, avec $t$ en minutes.\nIl perd toujours $20$ L par minute : $V(t) = 500 - 20t$, une fonction affine décroissante.\n$500 - 20t = 0$ donne $t = \\dfrac{500}{20} = 25$ : le réservoir est vide au bout de $25$ minutes.\n⭐ Le modèle ne vaut que pour $t$ entre $0$ et $25$ : ensuite, le volume ne devient pas négatif.\nSur le dessin (en dizaines de minutes et en centaines de litres), une droite continue qui touche l'axe horizontal en $2{,}5$, soit $25$ minutes.",
          schema: repere([-1, 3, -1, 6], [{ q: [0, -2, 5] }], [{ x: 2.5, y: 0, label: "" }]),
          micros: ["lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          enonce: "Le modèle $u_n = 3\\,500 + 100n$ donne le nombre d'abonnés d'un journal local $n$ mois après janvier. On calcule $u_8 = 4\\,300$. Quelle phrase répond correctement ?\na) « En $8$ mois, le journal a gagné $4\\,300$ abonnés. »\nb) « En septembre, le journal compte $4\\,300$ abonnés. »\nc) « Il faut $4\\,300$ mois pour avoir $8$ abonnés. »",
          correction:
            "$u_8$ est le nombre TOTAL d'abonnés $8$ mois après janvier, c'est-à-dire en septembre.\nLa bonne phrase est b).\na) est fausse : en $8$ mois, le journal a gagné $100 \\times 8 = 800$ abonnés, pas $4\\,300$.\nc) confond le rang et la valeur.\n⚠️ Janvier est le rang $0$ : $8$ mois plus tard, c'est septembre. Le tableau le montre : février est le rang $1$.",
          schema: ecranSeulement(tableau(["mois n (0 = janvier)", "0", "1", "8"], ["abonnés", "3 500", "3 600", "4 300"])),
          micros: ["lin_modele_conclure"],
        },
        {
          enonce: "Le tableau donne le nombre de visiteurs d'un petit musée, en centaines, chaque année depuis son ouverture. La croissance est-elle linéaire ? Si oui, proposer un modèle et dire combien de visiteurs il y a eu l'année $3$.",
          figure: tableau(["année n", "0", "1", "2", "3"], ["visiteurs (centaines)", 100, 130, 160, 190]),
          correction:
            "Écarts : $130 - 100 = 30$, $160 - 130 = 30$, $190 - 160 = 30$. Toujours $30$ : la croissance est linéaire.\nOn compte une fois par an : suite arithmétique, $u_n = 100 + 30n$, en centaines de visiteurs.\n✔️ $u_3 = 100 + 30 \\times 3 = 190$ : c'est la dernière valeur du tableau.\nL'année $3$, le musée a reçu $190$ centaines de visiteurs, soit $19\\,000$ visiteurs.",
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir"],
        },
        {
          enonce: "Le dessin montre deux séries de mesures, A (sur la droite bleue) et B (sur la ligne orange), relevées chaque mois. Laquelle est une croissance linéaire ?",
          figure: repere([-1, 5, -1, 10], [{ q: [0, 2, 1] }, { pts: [[0, 1], [1, 1.5], [2, 2.5], [3, 4.5], [4, 8.5]], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 1, y: 3, label: "" },
            { x: 2, y: 5, label: "" },
            { x: 3, y: 7, label: "" },
            { x: 4, y: 9, label: "" },
            { x: 1, y: 1.5, label: "" },
            { x: 2, y: 2.5, label: "" },
            { x: 3, y: 4.5, label: "" },
            { x: 4, y: 8.5, label: "" },
          ], undefined, true),
          correction:
            "A : les points sont alignés ; d'un point au suivant, on monte toujours de $2$. C'est une croissance linéaire.\nB : les écarts valent $0{,}5$, puis $1$, puis $2$, puis $4$ : ils doublent. La ligne se redresse : ce n'est pas une croissance linéaire.\n⭐ Une croissance linéaire se VOIT : des points alignés.",
          micros: ["lin_modele_reconnaitre"],
        },
        {
          enonce: "Des cours de natation coûtent $f(x) = 12x + 40$ euros pour $x$ séances, dont $40$ € d'inscription. On résout $f(x) = 160$ et on trouve $x = 10$. Rédiger la réponse à la question : « Combien de séances peut-on suivre avec $160$ € ? »",
          correction:
            "$12x + 40 = 160$ donne $12x = 120$, donc $x = 10$.\nRéponse : « Avec $160$ €, on peut suivre $10$ séances de natation. »\n⚠️ On ne répond pas « $x = 10$ » : on dit ce que représente $x$, avec l'unité, dans une phrase qui reprend la question.\n✔️ Le tableau le confirme : $10$ séances coûtent $160$ € ; $11$ séances, $172$ €, c'est trop.",
          schema: ecranSeulement(tableau(["séances x", "8", "9", "10", "11"], ["prix (€)", 136, 148, 160, 172])),
          micros: ["lin_modele_conclure"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Justifier le modèle, calculer, puis conclure par une phrase.",
      rappel: [
        "Modéliser, c'est : repérer la quantité fixe ajoutée, choisir une suite ou une fonction, écrire le modèle, calculer, conclure.",
        "La valeur de départ donne $u_0$ ou $b$ ; ce qui s'ajoute à chaque étape donne la raison $r$ ou le coefficient $a$.",
        "Un modèle a ses limites : il ne vaut que sur une période, et ne doit pas donner de résultat absurde.",
      ],
      exercices: [
        {
          titre: "Le covoiturage",
          enonce:
            "Une application de covoiturage compte $2\\,400$ inscrits dans une ville et en gagne $180$ par mois (chiffres d'un modèle).\na) Justifier qu'une suite arithmétique convient. Donner son premier terme et sa raison.\nb) Combien d'inscrits un an plus tard ?\nc) Rédiger la réponse par une phrase.",
          correction:
            "a) Les inscrits se comptent chaque mois, et on en ajoute toujours $180$ : une suite arithmétique, $u_n = 2\\,400 + 180n$, avec $n$ le nombre de mois, $u_0 = 2\\,400$ et $r = 180$.\nb) Un an, c'est $n = 12$ : $u_{12} = 2\\,400 + 180 \\times 12 = 4\\,560$.\nc) « Un an plus tard, l'application compterait $4\\,560$ inscrits dans cette ville. »\nSur le dessin (en milliers d'inscrits, un point tous les deux mois), les points montent régulièrement.\n⚠️ Le conditionnel « compterait » rappelle que c'est une prévision du modèle.",
          schema: repere([-1, 13, -1, 5], [], [
            { x: 0, y: 2.4, label: "" },
            { x: 2, y: 2.76, label: "" },
            { x: 4, y: 3.12, label: "" },
            { x: 6, y: 3.48, label: "" },
            { x: 8, y: 3.84, label: "" },
            { x: 10, y: 4.2, label: "" },
            { x: 12, y: 4.56, label: "" },
          ], undefined, true),
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "Le remplissage d'un bassin",
          enonce:
            "Un bassin de jardin contient $4$ m³ d'eau. On le remplit avec un débit constant de $1{,}5$ m³ par heure.\na) Suite ou fonction ? Justifier, puis écrire le modèle.\nb) Quel volume au bout de $6$ heures ?\nc) Le bassin contient au plus $13$ m³. Rédiger une phrase qui dit quand il est plein.",
          correction:
            "a) Le volume change à chaque instant : une fonction du temps. $V(t) = 1{,}5t + 4$, avec $t$ en heures et $V$ en m³.\nb) $V(6) = 1{,}5 \\times 6 + 4 = 13$ m³.\nc) « Le bassin est plein au bout de $6$ heures de remplissage. »\nSur le dessin, la droite est tracée d'un trait continu, jusqu'à l'horizontale du bassin plein : le volume existe à tout instant, pas seulement toutes les heures.\n⭐ Continu : une droite. Discret : des points.",
          schema: repere([-1, 8, -1, 15], [{ q: [0, 1.5, 4] }], [{ x: 6, y: 13, label: "" }], 13, true),
          micros: ["lin_modele_choisir", "lin_modele_conclure", "lin_modele_reconnaitre"],
        },
        {
          titre: "Une piste cyclable",
          enonce:
            "Le diagramme donne le nombre moyen de cyclistes par jour sur une piste cyclable (chiffres d'un modèle).\na) La croissance est-elle linéaire ?\nb) Proposer un modèle, avec $n$ le nombre d'années après 2019.\nc) Si la tendance se poursuit, combien de cyclistes par jour en 2026 ? Conclure par une phrase.",
          figure: diagramme("barres", [
            { label: "2019", value: 1200 },
            { label: "2020", value: 1500 },
            { label: "2021", value: 1800 },
            { label: "2022", value: 2100 },
          ]),
          correction:
            "a) $1\\,500 - 1\\,200 = 300$, $1\\,800 - 1\\,500 = 300$, $2\\,100 - 1\\,800 = 300$ : on ajoute toujours $300$. Oui, la croissance est linéaire.\nb) Une mesure par an : une suite arithmétique, $u_n = 1\\,200 + 300n$.\nc) 2026, c'est $n = 7$ : $u_7 = 1\\,200 + 300 \\times 7 = 3\\,300$.\n« Si la tendance se poursuit, $3\\,300$ cyclistes par jour emprunteront la piste en 2026. »\n⚠️ 2026, c'est le rang $7$ : on compte les années APRÈS 2019.",
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "Un livret d'épargne",
          enonce:
            "Un capital de $1\\,000$ € est placé à $4$ % par an. Le tableau donne son évolution.\na) La croissance est-elle linéaire ?\nb) Un élève propose le modèle $u_n = 1\\,000 + 40n$. Que prévoit-il pour $n = 2$ ? Est-ce juste ?\nc) Conclure : pourquoi ce modèle ne convient-il pas ?",
          figure: tableau(["année n", "0", "1", "2"], ["capital (€)", "1 000", "1 040", "1 081,60"]),
          correction:
            "a) Écarts : $1\\,040 - 1\\,000 = 40$, puis $1\\,081{,}60 - 1\\,040 = 41{,}60$. Ils ne sont pas égaux : la croissance n'est PAS linéaire.\nb) $u_2 = 1\\,000 + 40 \\times 2 = 1\\,080$ €, au lieu de $1\\,081{,}60$ € : le modèle se trompe, de peu pour l'instant.\nc) Chaque année, les $4$ % s'appliquent à un capital plus grand : les intérêts grandissent. Le bon calcul multiplie par $1{,}04$ chaque année : $1\\,000 \\times 1{,}04 \\times 1{,}04 = 1\\,081{,}60$.\n« Le modèle linéaire ne convient pas, car le capital augmente d'un pourcentage fixe, et non d'une somme fixe. »\n⚠️ Un pourcentage constant donne une croissance exponentielle, pas linéaire.",
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "Le recul d'une falaise",
          enonce:
            "Sur une côte, une falaise recule sous l'effet de l'érosion. En 2025, son bord est à $50$ m d'un phare, et il recule de $0{,}3$ m par an (chiffres d'un modèle). On mesure la distance une fois par an.\na) Suite ou fonction ? Écrire le modèle.\nb) Quelle distance en 2055 ? Répondre par une phrase.\nc) Au bout de combien d'années le bord atteindrait-il le phare ? Ce modèle est-il fiable si loin ?",
          correction:
            "a) Une mesure par an : une suite. $u_n = 50 - 0{,}3n$, avec $n$ le nombre d'années après 2025 : suite arithmétique de raison $-0{,}3$.\nb) 2055, c'est $n = 30$ : $u_{30} = 50 - 0{,}3 \\times 30 = 41$. « En 2055, le bord de la falaise serait à $41$ m du phare. »\nc) $50 - 0{,}3n = 0$ donne $n = \\dfrac{50}{0{,}3} \\approx 167$ : dans environ $167$ ans. Si loin, le modèle n'est pas fiable : une tempête peut arracher plusieurs mètres d'un coup.\n⭐ En géographie, ce recul s'appelle le recul du trait de côte.",
          schema: ecranSeulement(tableau(["année", "2025", "2035", "2045", "2055"], ["distance (m)", 50, 47, 44, 41])),
          micros: ["lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "La recette d'un loueur de vélos",
          enonce:
            "Un loueur de vélos modélise sa recette par $f(x) = 0{,}8x + 2$, en milliers d'euros, pour $x$ centaines de locations. On calcule $f(15) = 14$. Rédiger une phrase qui donne ce résultat.",
          correction:
            "$x = 15$, ce sont $15$ centaines de locations, soit $1\\,500$ locations.\n$f(15) = 0{,}8 \\times 15 + 2 = 14$ : $14$ milliers d'euros, soit $14\\,000$ €.\nLa phrase : « Pour $1\\,500$ locations, la recette est de $14\\,000$ €. »\n⚠️ Le piège des unités : écrire « $15$ locations rapportent $14$ € » est faux deux fois.\n⭐ Avant de rédiger, on relit l'énoncé : en quelle unité sont $x$ et $f(x)$ ? Le tableau est écrit dans les unités de la phrase.",
          schema: ecranSeulement(tableau(["locations", "500", "1 000", "1 500"], ["recette (€)", "6 000", "10 000", "14 000"])),
          micros: ["lin_modele_conclure"],
        },
        {
          titre: "Une coureuse à allure constante",
          enonce:
            "En physique, un mouvement est uniforme quand la vitesse est constante. Une coureuse part de la borne du $2$e kilomètre d'une piste et court à $250$ m par minute.\na) Suite ou fonction ? Écrire la distance $d(t)$, en mètres, entre elle et le début de la piste au bout de $t$ minutes.\nb) Où est-elle au bout de $20$ minutes ? Répondre par une phrase.\nc) Pourquoi dit-on que c'est une croissance linéaire ?",
          correction:
            "a) La distance existe à tout instant : une fonction. Elle part de $2\\,000$ m et ajoute $250$ m chaque minute : $d(t) = 250t + 2\\,000$.\nb) $d(20) = 250 \\times 20 + 2\\,000 = 7\\,000$. « Au bout de $20$ minutes, elle est à la borne du $7$e kilomètre. »\nc) Chaque minute ajoute la même distance, $250$ m : c'est une croissance linéaire. $250$ m par minute est sa vitesse, soit $15$ km/h.\nSur le dessin (en dizaines de minutes et en km), la droite part de $2$.\n⚠️ En $20$ minutes, elle a couru $5$ km, pas $7$ : elle était partie de la borne $2$.",
          schema: repere([-1, 3, -1, 8], [{ q: [0, 2.5, 2] }], [{ x: 2, y: 7, label: "" }]),
          micros: ["lin_modele_choisir", "lin_modele_conclure", "lin_modele_reconnaitre"],
        },
        {
          titre: "Un parking à vélos agrandi",
          enonce:
            "Un parking à vélos compte $120$ places en 2025 ; chaque année, on en ajoute $40$ (chiffres d'un modèle).\na) Modéliser le nombre de places. Pourquoi une suite plutôt qu'une fonction ?\nb) Représenter les termes de 2025 à 2030.\nc) Combien de places en 2030 ? Répondre par une phrase.",
          correction:
            "a) Les places sont ajoutées une fois par an, par paquets : entre deux années, rien ne change. C'est une suite : $u_n = 120 + 40n$, avec $n$ le nombre d'années après 2025.\nb) Termes : $120$ ; $160$ ; $200$ ; $240$ ; $280$ ; $320$. Sur le dessin (en centaines), on place des POINTS, sans les relier.\nc) 2030, c'est $n = 5$ : $u_5 = 120 + 40 \\times 5 = 320$. « En 2030, le parking compterait $320$ places. »\n⚠️ Relier les points ferait croire qu'il y a $140$ places au milieu de l'année 2025, ce qui est faux.",
          schema: repere([-1, 6, -1, 4], [], [
            { x: 0, y: 1.2, label: "" },
            { x: 1, y: 1.6, label: "" },
            { x: 2, y: 2, label: "" },
            { x: 3, y: 2.4, label: "" },
            { x: 4, y: 2.8, label: "" },
            { x: 5, y: 3.2, label: "" },
          ]),
          micros: ["lin_modele_choisir", "lin_modele_reconnaitre", "lin_modele_conclure"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "Un bon modèle se justifie (quantité fixe ajoutée, discret ou continu), s'écrit, s'utilise, et a ses limites.",
        "Chaque résultat se rend par une phrase, avec les unités de l'énoncé.",
        "Deux modèles peuvent se confondre au début et s'écarter ensuite : on les compare sur plusieurs années.",
      ],
      exercices: [
        {
          titre: "Un troupeau de chèvres",
          enonce:
            "Une fromagerie possède $45$ chèvres en 2025 et en ajoute $5$ chaque année. Chaque chèvre donne environ $800$ L de lait par an (chiffres d'un modèle).\na) Le nombre de chèvres suit-il une croissance linéaire ? Choisir un modèle et le justifier.\nb) Montrer que la production de lait, en litres, vaut $L_n = 36\\,000 + 4\\,000n$. Est-ce aussi une suite arithmétique ?\nc) En quelle année le troupeau atteindra-t-il $80$ chèvres ? Quelle production de lait cette année-là ?\nd) Rédiger une phrase de conclusion pour l'éleveur.",
          correction:
            "a) On ajoute toujours $5$ chèvres par an : croissance linéaire. On compte les chèvres une fois par an : une suite, $u_n = 45 + 5n$, avec $n$ le nombre d'années après 2025.\nb) $L_n = 800 \\times u_n = 800 \\times (45 + 5n) = 36\\,000 + 4\\,000n$. Oui : c'est une suite arithmétique de raison $4\\,000$ L.\nc) $45 + 5n = 80$ donne $5n = 35$, donc $n = 7$ : en 2032. Production : $L_7 = 36\\,000 + 4\\,000 \\times 7 = 64\\,000$ L.\nd) « Si le troupeau grandit de $5$ chèvres par an, il comptera $80$ chèvres en 2032, qui produiront environ $64\\,000$ litres de lait. »\nSur le dessin (en dizaines de chèvres), huit points alignés, de 2025 à 2032.\n⭐ Multiplier une suite arithmétique par un nombre donne encore une suite arithmétique.",
          schema: repere([-1, 8, -1, 9], [], [
            { x: 0, y: 4.5, label: "" },
            { x: 1, y: 5, label: "" },
            { x: 2, y: 5.5, label: "" },
            { x: 3, y: 6, label: "" },
            { x: 4, y: 6.5, label: "" },
            { x: 5, y: 7, label: "" },
            { x: 6, y: 7.5, label: "" },
            { x: 7, y: 8, label: "" },
          ]),
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "La charge d'un vélo électrique",
          enonce:
            "La batterie d'un vélo électrique est chargée à $20$ %. Branchée sur le secteur, elle gagne $15$ points de pourcentage par heure (chiffres d'un modèle).\na) Suite ou fonction ? Écrire le modèle $B(t)$, avec $t$ en heures.\nb) Quelle charge au bout de $2$ heures ?\nc) Au bout de combien de temps est-elle pleine ? Donner la réponse en heures et minutes, dans une phrase.\nd) Que devient le modèle ensuite ?",
          correction:
            "a) La charge augmente à chaque instant : une fonction. $B(t) = 15t + 20$, en %.\nb) $B(2) = 15 \\times 2 + 20 = 50$ %.\nc) $15t + 20 = 100$ donne $15t = 80$, donc $t = \\dfrac{80}{15} \\approx 5{,}33$ h. $0{,}33$ h, c'est un tiers d'heure, soit $20$ minutes.\n« La batterie est pleine au bout d'environ $5$ h $20$ min de charge. »\nd) Ensuite, la charge reste à $100$ % : sur le dessin (en dizaines de %), la droite franchit l'horizontale des $100$ %, et au-delà elle n'a plus de sens. Le modèle affine ne vaut que tant que la batterie n'est pas pleine.\n⚠️ $5{,}33$ h ne font pas $5$ h $33$ min : un tiers d'heure, ce sont $20$ minutes.",
          schema: repere([-1, 7, -1, 12], [{ q: [0, 1.5, 2] }], [{ x: 2, y: 5, label: "" }], 10, true),
          micros: ["lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "Deux façons de réviser un loyer",
          enonce:
            "Un loyer de $750$ € par mois peut être révisé chaque année de deux façons (chiffres d'un modèle) : contrat A, $15$ € de plus par an ; contrat B, $2$ % de plus par an.\na) Lequel des deux contrats donne une croissance linéaire ? Écrire son modèle.\nb) Calculer les loyers des deux contrats au bout de $1$ an, puis de $2$ ans. Que remarque-t-on ?\nc) Au bout de $10$ ans, le contrat B donne $750 \\times 1{,}02^{10} \\approx 914{,}25$ €. Comparer avec A et conclure par une phrase.",
          correction:
            "a) A ajoute toujours $15$ € : croissance linéaire, $a_n = 750 + 15n$. B ajoute $2$ % d'un loyer qui grandit : pas linéaire.\nb) Au bout de $1$ an : A donne $750 + 15 = 765$ €, B donne $750 \\times 1{,}02 = 765$ € : égalité.\nAu bout de $2$ ans : A donne $750 + 15 \\times 2 = 780$ €, B donne $765 \\times 1{,}02 = 780{,}30$ €. B dépasse A de $0{,}30$ €.\nc) A : $750 + 15 \\times 10 = 900$ €, contre environ $914{,}25$ € pour B.\n« Au bout de $10$ ans, le contrat B coûterait environ $14$ € de plus par mois que le contrat A. »\n⭐ Au début, les deux modèles se confondent : c'est sur la durée qu'on voit la différence. Le tableau donne l'écart entre B et A.",
          schema: tableau(["années n", "1", "2", "10"], ["écart B − A (€)", 0, 0.3, 14.25]),
          micros: ["lin_modele_reconnaitre", "lin_modele_choisir", "lin_modele_conclure"],
        },
        {
          titre: "L'ascension d'un sommet",
          enonce:
            "Un randonneur part d'un refuge à $1\\,200$ m d'altitude à 8 h et monte vers un sommet à $2\\,800$ m. Il s'élève de $400$ m par heure (chiffres d'un modèle).\na) Modéliser l'altitude $h(t)$, en mètres, $t$ heures après le départ. Suite ou fonction ?\nb) À quelle heure atteint-il le sommet ?\nc) À quelle altitude est-il à 10 h 30 ?\nd) Rédiger une phrase pour prévenir le refuge de son heure d'arrivée au sommet.",
          correction:
            "a) L'altitude change à chaque instant : une fonction. $h(t) = 400t + 1\\,200$.\nb) $400t + 1\\,200 = 2\\,800$ donne $400t = 1\\,600$, donc $t = 4$ : il arrive à midi.\nc) 10 h 30, c'est $t = 2{,}5$ : $h(2{,}5) = 400 \\times 2{,}5 + 1\\,200 = 2\\,200$ m.\nd) « Parti à 8 h, j'atteindrai le sommet vers midi, après $4$ heures de montée. »\nSur le dessin (en milliers de mètres), la droite rejoint l'horizontale du sommet à $t = 4$.\n⚠️ $t = 4$ ne veut pas dire 4 h du matin : c'est $4$ heures APRÈS le départ de 8 h.",
          schema: repere([-1, 5, -1, 4], [{ q: [0, 0.4, 1.2] }], [
            { x: 2.5, y: 2.2, label: "" },
            { x: 4, y: 2.8, label: "" },
          ], 2.8),
          micros: ["lin_modele_choisir", "lin_modele_conclure"],
        },
      ],
    },
  ],
};
