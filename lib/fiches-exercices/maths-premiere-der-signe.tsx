// ─── Fiche d'exercices : le signe de la dérivée (1re, sans spécialité) ────────
//                              20 exercices corrigés
//
// Cinquième des six feuilles du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026), notion `der_signe` du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/derivee-calcul.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : PAS de discriminant. Le signe de f′ se lit sur une forme
// affine (on résout une inéquation), sur la courbe de f′, ou sur une forme
// factorisée DONNÉE, qu'on vérifie en développant. Le drone (17) suit les
// quatre questions de l'exercice des Centres étrangers de juin 2026 cité par la
// banque : f′, vérifier (3x − 6)(1 − x), signe, sens de variation.
// Les variations et le tableau de variations sont la notion suivante
// (der-variations) : ici, on s'arrête au signe et à ce qu'il raconte.
//
// ⭐ Un tableau de signes DESSINÉ dans chaque corrigé qui en dresse un : le
// même canvas que le coach, une ligne par facteur.
// Physique : la balle (10), le panneau solaire (15), le drone (17).
// Histoire-géo : le lac de barrage (12), l'étape du Tour (13), la population
// d'un pays (14), le climat d'une ville (19). Économie : le maraîcher (9), la
// boulangerie (11), les vélos cargo (16), les trottinettes (20). Écologie : le
// panneau solaire (15), les saumons (18). Les chiffres sont des MODÈLES.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-signe.mjs`.
//
// Micro-compétences : der_signe_etudier (1, 2, 5, 6, 9, 10, 15, 17, 20),
// der_signe_factorisee (3, 7, 11, 12, 13, 14, 16, 17, 18, 19, 20),
// der_verifier_forme_factorisee (4, 8, 11, 13, 14, 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableauSignes } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDerSignePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-signe",
  titre: "Le signe de la dérivée",
  accroche:
    "Vingt exercices pour étudier le signe de f′ : une inéquation pour une forme affine, la courbe de f′, un tableau de signes sur une forme factorisée donnée, qu'on vérifie d'abord en développant. Un drone, une étape du Tour, un lac de barrage, des saumons, le climat d'une ville. Cherche d'abord au brouillon, puis ouvre la correction : elle dessine le tableau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : résoudre, lire, dresser ou vérifier.",
      rappel: [
        "Pour le signe de $ax + b$ : on résout $ax + b > 0$. ⚠️ Diviser par un nombre négatif RETOURNE l'inégalité.",
        "Pour un produit, un tableau de signes : une ligne par facteur, les valeurs qui annulent rangées dans l'ordre croissant, puis la règle des signes.",
        "« Vérifier que $f'(x) = \\dots$ » : on DÉVELOPPE la forme donnée, et on compare avec $f'(x)$.",
      ],
      exercices: [
        {
          enonce: "Étudier le signe de $f'(x) = 2x - 6$ selon les valeurs de $x$.",
          correction:
            "$2x - 6 > 0$ équivaut à $2x > 6$, soit $x > 3$.\n$f'(x)$ est négatif pour $x < 3$, nul en $3$, positif pour $x > 3$.\n⭐ Le coefficient de $x$ est positif ($2$) : le signe est « moins, puis plus ». La racine $3$ sépare les deux.",
          schema: tableauSignes(["−∞", "3", "+∞"], [["$2x - 6$", ["-", "+"], ["0"]]]),
          micros: ["der_signe_etudier"],
        },
        {
          enonce: "Étudier le signe de $f'(x) = -3x + 12$ selon les valeurs de $x$.",
          correction:
            "$-3x + 12 > 0$ équivaut à $-3x > -12$.\nOn divise par $-3$, qui est NÉGATIF : le sens de l'inégalité change, $x < 4$.\n$f'(x)$ est positif pour $x < 4$, nul en $4$, négatif pour $x > 4$.\n⚠️ Oublier de retourner l'inégalité inverse tout le tableau : c'est l'erreur la plus fréquente.",
          schema: ecranSeulement(tableauSignes(["−∞", "4", "+∞"], [["$-3x + 12$", ["+", "-"], ["0"]]])),
          micros: ["der_signe_etudier"],
        },
        {
          enonce: "La dérivée d'une fonction $f$ est $f'(x) = (x - 2)(x + 3)$. Dresser le tableau de signes de $f'(x)$.",
          correction:
            "$x - 2$ s'annule en $2$ ; $x + 3$ s'annule en $-3$.\nOn range ces valeurs dans l'ordre croissant : $-3$, puis $2$.\n$x + 3$ est négatif avant $-3$, positif après. $x - 2$ est négatif avant $2$, positif après.\nRègle des signes : $f'(x)$ est positif sur $]-\\infty ; -3[$, négatif sur $]-3 ; 2[$, positif sur $]2 ; +\\infty[$.\n⚠️ Les valeurs se rangent dans l'ordre CROISSANT : $-3$ avant $2$, même si $x - 2$ est écrit en premier.",
          schema: tableauSignes(["−∞", "−3", "2", "+∞"], [
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$x - 2$", ["-", "-", "+"], ["", "0"]],
            ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["der_signe_factorisee"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 3x^2$. Calculer $f'(x)$, puis vérifier que $f'(x) = 3x(x - 2)$.",
          correction:
            "D'abord la dérivée : $f'(x) = 3x^2 - 6x$.\nOn développe la forme proposée : $3x(x - 2) = 3x \\times x - 3x \\times 2 = 3x^2 - 6x$.\nOn retrouve $f'(x)$ : la forme factorisée est juste. ✔️\n⭐ On ne factorise pas soi-même : on développe ce qu'on nous donne. C'est toujours le sens le plus facile.\n⭐ Et la forme factorisée donne aussitôt le tableau de signes : $3x$ s'annule en $0$, $x - 2$ en $2$.",
          schema: ecranSeulement(
            tableauSignes(["−∞", "0", "2", "+∞"], [
              ["$3x$", ["-", "+", "+"], ["0", ""]],
              ["$x - 2$", ["-", "-", "+"], ["", "0"]],
              ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
            ]),
          ),
          micros: ["der_verifier_forme_factorisee"],
        },
        {
          enonce: "Voici la courbe de la fonction DÉRIVÉE $f'$ (et non celle de $f$). Donner le signe de $f'(x)$ selon les valeurs de $x$.",
          figure: repere([-3, 3, -5, 4], [{ q: [1, 0, -4], couleur: ORANGE }], [
            { x: -2, y: 0, label: "" },
            { x: 2, y: 0, label: "" },
          ]),
          correction:
            "On lit le signe de $f'(x)$ sur la position de SA courbe par rapport à l'axe des abscisses.\nAu-dessus de l'axe : $f'(x) > 0$, pour $x < -2$ et pour $x > 2$.\nEn dessous : $f'(x) < 0$, pour $-2 < x < 2$.\nSur l'axe : $f'(-2) = 0$ et $f'(2) = 0$.\n⛔ Ce n'est pas la courbe de $f$ : on ne regarde pas si elle monte ou descend, on regarde si elle est au-dessus ou en dessous de l'axe.",
          micros: ["der_signe_etudier"],
        },
        {
          enonce: "Étudier le signe de $f'(x) = x^2 + 1$.",
          correction:
            "Un carré est toujours positif ou nul : $x^2 \\geqslant 0$.\nDonc $x^2 + 1 \\geqslant 1$ : $f'(x)$ est strictement positif pour TOUT réel $x$.\nPas besoin de tableau : le signe ne change jamais.\n⭐ Avant de se lancer dans un tableau, on regarde si l'expression n'a pas un signe évident.\n⭐ Sur le dessin, la courbe de $f'$ reste tout entière AU-DESSUS de l'axe : son point le plus bas est $(0 ; 1)$.",
          schema: ecranSeulement(repere([-3, 3, -1, 6], [{ q: [1, 0, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }])),
          micros: ["der_signe_etudier"],
        },
        {
          enonce: "La dérivée d'une fonction $f$ est $f'(x) = -2(x - 1)(x - 4)$. Dresser le tableau de signes de $f'(x)$.",
          correction:
            "Trois facteurs : le nombre $-2$, toujours négatif ; $x - 1$, nul en $1$ ; $x - 4$, nul en $4$.\n$(x - 1)(x - 4)$ est positif avant $1$, négatif entre $1$ et $4$, positif après $4$.\nLe facteur $-2$ retourne tout : $f'(x)$ est négatif sur $]-\\infty ; 1[$, positif sur $]1 ; 4[$, négatif sur $]4 ; +\\infty[$.\n⚠️ Le nombre devant compte : il a sa propre ligne dans le tableau.",
          schema: ecranSeulement(
            tableauSignes(["−∞", "1", "4", "+∞"], [
              ["$-2$", ["-", "-", "-"], ["", ""]],
              ["$x - 1$", ["-", "+", "+"], ["0", ""]],
              ["$x - 4$", ["-", "-", "+"], ["", "0"]],
              ["$f'(x)$", ["-", "+", "-"], ["0", "0"]],
            ]),
          ),
          micros: ["der_signe_factorisee"],
        },
        {
          enonce: "On sait que $g'(x) = 2x^2 - 8$. Parmi ces trois formes, lesquelles sont égales à $g'(x)$ ?\na) $2(x - 2)(x + 2)$\nb) $(2x - 4)(x + 2)$\nc) $2(x - 2)^2$",
          correction:
            "On développe chaque forme.\na) $2(x - 2)(x + 2) = 2(x^2 - 4) = 2x^2 - 8$ : juste. ✔️\nb) $(2x - 4)(x + 2) = 2x^2 + 4x - 4x - 8 = 2x^2 - 8$ : juste aussi. ✔️\nc) $2(x - 2)^2 = 2(x^2 - 4x + 4) = 2x^2 - 8x + 8$ : FAUX, il y a un terme en $x$ de trop.\n⭐ Une expression peut avoir plusieurs formes factorisées : $2x - 4 = 2(x - 2)$, les formes a) et b) sont les mêmes.\n⚠️ $(x - 2)^2$ n'est pas $x^2 - 4$ : c'est $x^2 - 4x + 4$.\n⭐ Sur le dessin, $2x^2 - 8$ (bleue) et $2(x - 2)^2$ (orange) : deux paraboles différentes, qui se touchent seulement en $x = 2$. En $x = 1$, l'une vaut $-6$, l'autre $2$.",
          schema: ecranSeulement(
            repere(
              [-3, 4, -9, 6],
              [{ q: [2, 0, -8] }, { q: [2, -8, 8], couleur: ORANGE }],
              [
                { x: 2, y: 0, label: "" },
                { x: 1, y: -6, label: "" },
                { x: 1, y: 2, label: "" },
              ],
              undefined,
              true,
            ),
          ),
          micros: ["der_verifier_forme_factorisee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Vérifier, dresser le tableau, puis dire ce que le signe raconte dans la situation.",
      rappel: [
        "Le signe de $f'$ dit comment la grandeur évolue : $f' > 0$, elle augmente ; $f' < 0$, elle diminue.",
        "Sur une forme factorisée DONNÉE : on la vérifie en développant, puis une ligne par facteur dans le tableau.",
        "On étudie le signe sur l'intervalle de l'énoncé seulement : $[0 ; 10]$, par exemple, et pas sur tous les réels.",
      ],
      exercices: [
        {
          titre: "Le bénéfice d'un maraîcher",
          enonce:
            "Un maraîcher vend $x$ tonnes de tomates par saison, avec $0 \\leqslant x \\leqslant 6$. Son bénéfice $B(x)$, en milliers d'euros, a pour dérivée $B'(x) = -2x + 6$. La droite ci-dessous représente $B'$.\na) Étudier le signe de $B'(x)$, par le calcul puis sur le dessin.\nb) Pour quelles quantités le bénéfice augmente-t-il ? Combien de tonnes doit-il vendre pour que son bénéfice soit le plus grand possible ?",
          figure: repere([-1, 7, -7, 7], [{ q: [0, -2, 6], couleur: ORANGE }], [{ x: 3, y: 0, label: "" }], undefined, true),
          correction:
            "a) $-2x + 6 > 0$ donne $-2x > -6$, donc $x < 3$ : on divise par $-2$, qui est négatif, et le sens de l'inégalité s'inverse.\n$B'(x)$ est positif sur $[0 ; 3[$, nul en $3$, négatif sur $]3 ; 6]$.\nSur le dessin, c'est la même chose : la droite de $B'$ est AU-DESSUS de l'axe avant $3$, en dessous après.\nb) Le bénéfice augmente tant que $B'(x) > 0$, c'est-à-dire jusqu'à $3$ tonnes ; ensuite, il diminue. Le bénéfice est le plus grand pour $3$ tonnes.\nAu-delà, chaque tonne de plus fait BAISSER le bénéfice : il faut par exemple payer des saisonniers en plus, ou brader les tomates.\n⛔ Le dessin est celui de $B'$, pas de $B$ : la droite descend, et pourtant $B$ augmente tant qu'elle est au-dessus de l'axe.",
          schema: tableauSignes(["0", "3", "6"], [["$B'(x)$", ["+", "-"], ["0"]]]),
          micros: ["der_signe_etudier"],
        },
        {
          titre: "La balle lancée",
          enonce:
            "On lance une balle vers le haut. Sa vitesse verticale, en m/s, est $h'(t) = -10t + 15$, où $t$ est le temps en secondes ($0 \\leqslant t \\leqslant 3$).\na) Étudier le signe de $h'(t)$.\nb) Quand la balle monte-t-elle ? Quand redescend-elle ?\nc) À quel instant est-elle au plus haut ?",
          correction:
            "a) $-10t + 15 > 0$ équivaut à $-10t > -15$, soit $t < 1{,}5$ : on divise par $-10$, le sens change.\n$h'(t)$ est positif sur $[0 ; 1{,}5[$, nul en $1{,}5$, négatif sur $]1{,}5 ; 3]$.\nb) Tant que $h'(t) > 0$, la hauteur augmente : la balle monte pendant $1{,}5$ s. Ensuite, elle redescend.\nc) Elle est au plus haut à $t = 1{,}5$ s, quand sa vitesse s'annule.\n⭐ En physique, la vitesse verticale change de signe au sommet de la trajectoire.",
          schema: ecranSeulement(tableauSignes(["0", "$1{,}5$", "3"], [["$h'(t)$", ["+", "-"], ["0"]]], "t")),
          micros: ["der_signe_etudier"],
        },
        {
          titre: "La boulangerie",
          enonce:
            "Une boulangerie fabrique $x$ centaines de croissants par jour ($0 \\leqslant x \\leqslant 10$). La dérivée de son bénéfice est $B'(x) = -x^2 + 10x - 16$.\na) Vérifier que $B'(x) = (x - 2)(8 - x)$.\nb) Dresser le tableau de signes de $B'(x)$ sur $[0 ; 10]$.\nc) Pour quelles productions quelques croissants de plus font-ils augmenter le bénéfice ?",
          correction:
            "a) On développe : $(x - 2)(8 - x) = 8x - x^2 - 16 + 2x = -x^2 + 10x - 16$. ✔️\nb) $x - 2$ s'annule en $2$ ; $8 - x$ s'annule en $8$.\n⚠️ $8 - x$ est POSITIF avant $8$ et négatif après : c'est l'inverse de $x - 8$.\n$B'(x)$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 8[$, négatif sur $]8 ; 10]$.\nc) $B'(x) > 0$ entre $2$ et $8$ : entre $200$ et $800$ croissants par jour, en faire un peu plus augmente le bénéfice.\nEn dessous de $200$, les frais du four ne sont pas amortis ; au-dessus de $800$, les croissants ne se vendent plus.",
          schema: tableauSignes(["0", "2", "8", "10"], [
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$8 - x$", ["+", "+", "-"], ["", "0"]],
            ["$B'(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
        {
          titre: "Le lac de barrage",
          enonce:
            "Le niveau d'un lac de barrage, en mètres, est $h(t)$, où $t$ est le temps en mois depuis le 1ᵉʳ janvier ($0 \\leqslant t \\leqslant 12$). Dans un modèle, $h'(t) = (t - 2)(t - 9)$.\na) Dresser le tableau de signes de $h'(t)$ sur $[0 ; 12]$.\nb) Raconter l'année du lac : quand son niveau monte-t-il ? Quand baisse-t-il ?",
          correction:
            "a) $t - 2$ s'annule en $2$, $t - 9$ en $9$.\n$h'(t)$ est positif sur $[0 ; 2[$, négatif sur $]2 ; 9[$, positif sur $]9 ; 12]$.\nb) En janvier et février, le niveau monte : pluies d'hiver.\nDe début mars à début octobre, il baisse : moins de pluie, plus d'évaporation, l'eau part vers les turbines et les cultures.\nÀ partir d'octobre, il remonte avec les pluies d'automne.\n⚠️ $t = 2$, c'est la fin du deuxième mois, donc le début de mars : $t$ compte des mois ÉCOULÉS.",
          schema: ecranSeulement(
            tableauSignes(
              ["0", "2", "9", "12"],
              [
                ["$t - 2$", ["-", "+", "+"], ["0", ""]],
                ["$t - 9$", ["-", "-", "+"], ["", "0"]],
                ["$h'(t)$", ["+", "-", "+"], ["0", "0"]],
              ],
              "t",
            ),
          ),
          micros: ["der_signe_factorisee"],
        },
        {
          titre: "Une étape du Tour de France",
          enonce:
            "Dans un modèle, l'altitude d'une étape de montagne est $a(x)$, où $x$ est la distance parcourue en dizaines de kilomètres ($0 \\leqslant x \\leqslant 8$). Sa dérivée est $a'(x) = 0{,}75x^2 - 6x + 9$.\na) Vérifier que $a'(x) = 0{,}75(x - 2)(x - 6)$.\nb) Dresser le tableau de signes de $a'(x)$ sur $[0 ; 8]$.\nc) Décrire l'étape : où sont les montées, les descentes ?",
          correction:
            "a) $(x - 2)(x - 6) = x^2 - 8x + 12$, donc $0{,}75(x - 2)(x - 6) = 0{,}75x^2 - 6x + 9$. ✔️\nb) $0{,}75$ est positif : il ne change aucun signe.\n$a'(x)$ est positif sur $[0 ; 2[$, négatif sur $]2 ; 6[$, positif sur $]6 ; 8]$.\nc) La route monte pendant les $20$ premiers kilomètres : c'est un col, au km $20$.\nElle descend du km $20$ au km $60$, puis remonte jusqu'à l'arrivée, au km $80$ : une arrivée en montée.\n⚠️ $x$ est en DIZAINES de kilomètres : $x = 2$, c'est le km $20$.",
          schema: tableauSignes(["0", "2", "6", "8"], [
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 6$", ["-", "-", "+"], ["", "0"]],
            ["$a'(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
        {
          titre: "La population d'un pays",
          enonce:
            "Dans un modèle, la population d'un pays européen, en millions d'habitants, est $P(t)$, où $t$ est le nombre de décennies depuis 1950 ($0 \\leqslant t \\leqslant 10$). Sa dérivée est $P'(t) = -0{,}3t^2 + 2{,}4t$.\na) Vérifier que $P'(t) = -0{,}3t(t - 8)$.\nb) Dresser le tableau de signes de $P'(t)$ sur $[0 ; 10]$.\nc) Que prévoit le modèle pour la population de ce pays ?",
          correction:
            "a) $-0{,}3t(t - 8) = -0{,}3t^2 + 2{,}4t$. ✔️\nb) Sur $]0 ; 10]$, $-0{,}3t$ est négatif. $t - 8$ s'annule en $8$ : négatif avant, positif après.\n$P'(t)$ est positif sur $]0 ; 8[$, nul en $8$, négatif sur $]8 ; 10]$.\nc) La population augmente jusqu'à $t = 8$, c'est-à-dire jusqu'en 2030, puis elle diminue.\n⚠️ $t = 8$ décennies après 1950, c'est 2030, pas 1958.\n⭐ Plusieurs pays d'Europe voient déjà leur population baisser : il y a moins de naissances que de décès.",
          schema: tableauSignes(
            ["0", "8", "10"],
            [
              ["$-0{,}3t$", ["-", "-"], [""]],
              ["$t - 8$", ["-", "+"], ["0"]],
              ["$P'(t)$", ["+", "-"], ["0"]],
            ],
            "t",
          ),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
        {
          titre: "Le panneau solaire",
          enonce:
            "Un jour de printemps, la puissance produite par un panneau solaire est $P(t)$, en watts, où $t$ est l'heure ($6 \\leqslant t \\leqslant 20$). Dans un modèle, $P'(t) = -0{,}5t + 6{,}5$.\na) Étudier le signe de $P'(t)$ sur $[6 ; 20]$.\nb) Quand la puissance augmente-t-elle ? À quelle heure est-elle la plus forte ?",
          correction:
            "a) $-0{,}5t + 6{,}5 > 0$ équivaut à $-0{,}5t > -6{,}5$, soit $t < 13$ : on divise par $-0{,}5$, le sens change.\n$P'(t)$ est positif sur $[6 ; 13[$, nul en $13$, négatif sur $]13 ; 20]$.\nb) La puissance augmente de $6$ h à $13$ h, quand le soleil monte, puis elle diminue.\nElle est la plus forte à $13$ h, quand le soleil est au plus haut dans le ciel.\n⭐ En France, l'heure légale est en avance sur le soleil : le midi solaire tombe vers $13$ h ou $14$ h.",
          schema: ecranSeulement(tableauSignes(["6", "13", "20"], [["$P'(t)$", ["+", "-"], ["0"]]], "t")),
          micros: ["der_signe_etudier"],
        },
        {
          titre: "Les vélos cargo",
          enonce:
            "Une entreprise fabrique $x$ centaines de vélos cargo par an ($0 \\leqslant x \\leqslant 10$). La dérivée de son bénéfice est $B'(x) = -3x^2 + 30x - 48$.\na) Vérifier que $B'(x) = -3(x - 2)(x - 8)$.\nb) Dresser le tableau de signes de $B'(x)$ sur $[0 ; 10]$.\nc) Entre quelles productions le bénéfice augmente-t-il ?",
          correction:
            "a) $(x - 2)(x - 8) = x^2 - 10x + 16$, donc $-3(x - 2)(x - 8) = -3x^2 + 30x - 48$. ✔️\nb) Le facteur $-3$ est toujours négatif ; $x - 2$ s'annule en $2$, $x - 8$ en $8$.\n$B'(x)$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 8[$, négatif sur $]8 ; 10]$.\nc) Le bénéfice augmente entre $200$ et $800$ vélos par an.\n⚠️ Le facteur $-3$ RETOURNE tous les signes du produit : oublié, il inverse la réponse.",
          schema: tableauSignes(["0", "2", "8", "10"], [
            ["$-3$", ["-", "-", "-"], ["", ""]],
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 8$", ["-", "-", "+"], ["", "0"]],
            ["$B'(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle : calculer, vérifier, dresser le tableau, conclure.",
      rappel: [
        "Les questions s'enchaînent : $f'(x)$, puis « vérifier que », puis le tableau de signes, puis la conclusion.",
        "On ne cherche jamais le signe sur la forme développée : on se sert de la forme factorisée donnée.",
        "On conclut dans la langue de la situation : le drone monte, la population baisse, le mois le plus chaud.",
      ],
      exercices: [
        {
          titre: "Le vol d'un drone",
          enonce:
            "La hauteur d'un drone, en dizaines de mètres, est $h(t) = -t^3 + 4{,}5t^2 - 6t + 5$, où $t$ est le temps en minutes ($0 \\leqslant t \\leqslant 3$).\n1. Calculer $h'(t)$.\n2. Vérifier que $h'(t) = (3t - 6)(1 - t)$.\n3. Étudier le signe de $h'(t)$ sur $[0 ; 3]$.\n4. Quand le drone monte-t-il ? Quand descend-il ? Vérifier sur la courbe.",
          figure: repere([-1, 4, -1, 6], [{ p: [-1, 4.5, -6, 5] }], [
            { x: 1, y: 2.5, label: "" },
            { x: 2, y: 3, label: "" },
          ]),
          correction:
            "1. $h'(t) = -3t^2 + 9t - 6$.\n2. $(3t - 6)(1 - t) = 3t - 3t^2 - 6 + 6t = -3t^2 + 9t - 6$. ✔️\n3. $3t - 6$ s'annule en $2$ : négatif avant, positif après. $1 - t$ s'annule en $1$ : POSITIF avant, négatif après.\n$h'(t)$ est négatif sur $[0 ; 1[$, positif sur $]1 ; 2[$, négatif sur $]2 ; 3]$.\n4. Le drone descend pendant la première minute, de $50$ m à $25$ m. Il remonte entre $1$ et $2$ minutes, jusqu'à $30$ m, puis redescend pour se poser.\nSur la courbe : un creux en $t = 1$, une bosse en $t = 2$. ✔️\n⚠️ $1 - t$ n'est pas $t - 1$ : ses signes sont inversés. C'est le piège de cette forme.",
          schema: tableauSignes(
            ["0", "1", "2", "3"],
            [
              ["$3t - 6$", ["-", "-", "+"], ["", "0"]],
              ["$1 - t$", ["+", "-", "-"], ["0", ""]],
              ["$h'(t)$", ["-", "+", "-"], ["0", "0"]],
            ],
            "t",
          ),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee", "der_signe_etudier"],
        },
        {
          titre: "Le retour des saumons",
          enonce:
            "Après la suppression d'un barrage, des saumons recolonisent une rivière. Dans un modèle, leur nombre, en centaines, est $S(t)$, où $t$ est le nombre d'années depuis les travaux ($0 \\leqslant t \\leqslant 8$). Sa dérivée est $S'(t) = -2t^2 + 14t - 12$.\na) Vérifier que $S'(t) = -2(t - 1)(t - 6)$.\nb) Dresser le tableau de signes de $S'(t)$ sur $[0 ; 8]$.\nc) Raconter l'évolution de la population de saumons.",
          correction:
            "a) $(t - 1)(t - 6) = t^2 - 7t + 6$, donc $-2(t - 1)(t - 6) = -2t^2 + 14t - 12$. ✔️\nb) $-2$ est négatif ; $t - 1$ s'annule en $1$, $t - 6$ en $6$.\n$S'(t)$ est négatif sur $[0 ; 1[$, positif sur $]1 ; 6[$, négatif sur $]6 ; 8]$.\nc) La première année, la population baisse : la rivière est encore troublée par les travaux.\nDe la $1$ʳᵉ à la $6$ᵉ année, elle augmente : les saumons remontent frayer.\nAprès $6$ ans, elle baisse de nouveau : la rivière ne peut pas nourrir plus de poissons.\n⚠️ $S'(t) < 0$ après $6$ ans ne veut pas dire que la réintroduction a échoué : la population baisse, mais elle peut rester bien plus grande qu'au départ.",
          schema: ecranSeulement(
            tableauSignes(
              ["0", "1", "6", "8"],
              [
                ["$-2$", ["-", "-", "-"], ["", ""]],
                ["$t - 1$", ["-", "+", "+"], ["0", ""]],
                ["$t - 6$", ["-", "-", "+"], ["", "0"]],
                ["$S'(t)$", ["-", "+", "-"], ["0", "0"]],
              ],
              "t",
            ),
          ),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
        {
          titre: "Le climat d'une ville",
          enonce:
            "Dans un modèle, la température moyenne d'une ville de France, en °C, est $T(m)$, où $m$ est le numéro du mois ($m = 1$ pour janvier, $1 \\leqslant m \\leqslant 12$). Sa dérivée est $T'(m) = -0{,}6m^2 + 4{,}8m - 4{,}2$.\na) Vérifier que $T'(m) = -0{,}6(m - 1)(m - 7)$.\nb) Dresser le tableau de signes de $T'(m)$ sur $[1 ; 12]$.\nc) Quand la température moyenne augmente-t-elle ? Quel est le mois le plus chaud ?",
          correction:
            "a) $(m - 1)(m - 7) = m^2 - 8m + 7$, donc $-0{,}6(m - 1)(m - 7) = -0{,}6m^2 + 4{,}8m - 4{,}2$. ✔️\nb) Sur $]1 ; 12]$, $-0{,}6$ est négatif et $m - 1$ est positif ; $m - 7$ s'annule en $7$.\n$T'(m)$ est positif sur $]1 ; 7[$, nul en $7$, négatif sur $]7 ; 12]$.\nc) La température moyenne augmente de janvier à juillet, puis diminue jusqu'en décembre.\nLe mois le plus chaud est juillet ($m = 7$) ; janvier, en début d'intervalle, est le plus froid.\n⚠️ En $m = 1$, $T'(1) = 0$ aussi : c'est une BORNE de l'intervalle. On la place en tête du tableau, pas au milieu.",
          schema: tableauSignes(
            ["1", "7", "12"],
            [
              ["$-0{,}6$", ["-", "-"], [""]],
              ["$m - 1$", ["+", "+"], [""]],
              ["$m - 7$", ["-", "+"], ["0"]],
              ["$T'(m)$", ["+", "-"], ["0"]],
            ],
            "m",
          ),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee"],
        },
        {
          titre: "La flotte de trottinettes",
          enonce:
            "Une entreprise loue $x$ centaines de trottinettes électriques dans une ville ($0 \\leqslant x \\leqslant 8$). La dérivée de son bénéfice est $B'(x) = -1{,}5x^2 + 12x - 18$.\na) Vérifier que $B'(x) = -1{,}5(x - 2)(x - 6)$.\nb) Dresser le tableau de signes de $B'(x)$ sur $[0 ; 8]$.\nc) L'entreprise a $400$ trottinettes. A-t-elle intérêt à en ajouter quelques-unes ? Et si elle en avait $700$ ?",
          correction:
            "a) $(x - 2)(x - 6) = x^2 - 8x + 12$, donc $-1{,}5(x - 2)(x - 6) = -1{,}5x^2 + 12x - 18$. ✔️\nb) $-1{,}5$ est négatif ; $x - 2$ s'annule en $2$, $x - 6$ en $6$.\n$B'(x)$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 6[$, négatif sur $]6 ; 8]$.\nc) $400$ trottinettes : $x = 4$, et $B'(4) > 0$. Le bénéfice augmente : ajouter quelques trottinettes est rentable.\n$700$ trottinettes : $x = 7$, et $B'(7) < 0$. Le bénéfice diminue : il y en a trop, elles restent garées sans clients.\n⭐ Pour répondre, on n'a pas calculé $B'(4)$ : on a LU son signe dans le tableau.",
          schema: tableauSignes(["0", "2", "6", "8"], [
            ["$-1{,}5$", ["-", "-", "-"], ["", ""]],
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 6$", ["-", "-", "+"], ["", "0"]],
            ["$B'(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee", "der_signe_etudier"],
        },
      ],
    },
  ],
};
