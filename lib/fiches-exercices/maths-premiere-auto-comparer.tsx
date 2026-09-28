// ─── Fiche d'exercices : comparer deux nombres (1re, automatismes) ────────────
//                              20 exercices corrigés
//
// ⭐ PREMIÈRE FEUILLE DES AUTOMATISMES DE PREMIÈRE (28/09/2026) — Frédéric :
// « première automatisme : 1 feuille d'exercice par notion comme d'habitude,
// même si cela prend du temps ». Dix-huit notions, dix-huit feuilles ; celle-ci
// sert d'ÉTALON aux dix-sept autres.
//
// Ce sont les questions de la première partie de l'épreuve anticipée de
// mathématiques, SANS CALCULATRICE : tous les nombres se manipulent de tête.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-calcul.bank.ts`.
// L'exercice 5 est celui des Antilles (« le plus petit de 1/8, 1/9, 1/12 et 0,1 »).
//
// ⭐⭐ LE FIL : DEUX OUTILS, ET LE BON DÉPEND DE LA QUESTION. La DIFFÉRENCE dit
// de combien l'un dépasse l'autre ; le QUOTIENT dit combien de fois. Les
// exercices 10 et 18 sont bâtis sur ce choix : la ville qui gagne le plus
// d'habitants n'est pas celle qui grandit le plus vite.
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (droites graduées, diagrammes) et un lien à l'ÉCONOMIE ou
// à l'HISTOIRE-GÉO (prix au kilo, densité de population, placements, budget
// d'une commune, forfaits). Les chiffres sont des MODÈLES arrondis, jamais
// présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-comparer.mjs` (un
// script par feuille, même nom que la feuille).
//
// Micro-compétences : auto_num_comparer_difference (1, 6, 7, 11, 12, 16, 19,
// 20), auto_num_comparer_quotient (2, 8, 9, 10, 13, 15, 17, 18),
// auto_num_fractions_comparer (3, 4, 5, 7, 11, 14, 19). 3/3.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Une droite graduée avec des nombres placés dessus (texte NU : SVG). */
const droiteGraduee = (min: number, max: number, step: number, points: { value: number; label: string }[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        size: { width: 260, height: 80 },
        points: points.map((p) => ({ ...p, color: "#dc2626" })),
        display: { showPoints: true, showPointLabels: true },
      }}
    />
  </div>
);

export const exercicesAutoComparerPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-comparer",
  titre: "Comparer deux nombres",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : comparer par la différence, par le quotient, ranger des fractions. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Par la DIFFÉRENCE : si $a - b > 0$, alors $a > b$ ; si $a - b < 0$, alors $a < b$.",
        "Par le QUOTIENT, pour deux nombres strictement positifs : si $\\dfrac{a}{b} > 1$, alors $a > b$ ; si $\\dfrac{a}{b} < 1$, alors $a < b$.",
        "Deux fractions de même dénominateur : la plus grande a le plus grand numérateur. De même numérateur : la plus grande a le plus PETIT dénominateur.",
        "Sinon, on les met au même dénominateur, ou on compare les produits en croix : $\\dfrac{a}{b} < \\dfrac{c}{d}$ quand $a \\times d < c \\times b$ (dénominateurs positifs).",
      ],
      exercices: [
        {
          enonce: "Comparer $a = \\dfrac{3}{7}$ et $b = \\dfrac{2}{5}$ en calculant $a - b$.",
          correction:
            "On met au même dénominateur, $35$ : $a - b = \\dfrac{15}{35} - \\dfrac{14}{35} = \\dfrac{1}{35}$.\nLa différence est positive, donc $a > b$ : $\\dfrac{3}{7} > \\dfrac{2}{5}$.\n⭐ On n'a pas besoin de la valeur exacte de la différence : seul son SIGNE compte.",
          schema: droiteGraduee(0.38, 0.44, 0.01, [
            { value: 2 / 5, label: "2/5" },
            { value: 3 / 7, label: "3/7" },
          ]),
          micros: ["auto_num_comparer_difference"],
        },
        {
          enonce: "Sans calculer $0{,}6^2$, dire lequel est le plus grand : $0{,}6$ ou $0{,}6^2$.",
          correction:
            "Les deux nombres sont positifs : on peut comparer par le quotient.\n$\\dfrac{0{,}6^2}{0{,}6} = 0{,}6$, qui est plus petit que $1$.\nDonc $0{,}6^2 < 0{,}6$.\n✔️ Vérification : $0{,}6^2 = 0{,}36$.\n⚠️ Élever au carré n'agrandit pas toujours : pour un nombre entre $0$ et $1$, le carré est PLUS PETIT que le nombre.",
          micros: ["auto_num_comparer_quotient"],
        },
        {
          enonce: "Ranger dans l'ordre croissant : $\\dfrac{5}{7}$, $\\dfrac{5}{9}$ et $\\dfrac{5}{6}$.",
          correction:
            "Les trois fractions ont le même numérateur, $5$ : on partage $5$ en parts plus ou moins nombreuses.\nPlus on partage en BEAUCOUP de parts, plus chaque part est petite.\nDonc $\\dfrac{5}{9} < \\dfrac{5}{7} < \\dfrac{5}{6}$.\n⚠️ Le piège : croire que $\\dfrac{5}{9}$ est la plus grande « parce que $9$ est le plus grand ».",
          // ⛔ Pas de 0,25 et non 0,1 : dix étiquettes « 0,1 … 0,9 » se touchaient à 375 px.
          schema: droiteGraduee(0, 1, 0.25, [
            { value: 5 / 9, label: "5/9" },
            { value: 5 / 7, label: "5/7" },
            { value: 5 / 6, label: "5/6" },
          ]),
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce: "Comparer $\\dfrac{7}{12}$ et $\\dfrac{5}{8}$.",
          correction:
            "Produits en croix : $7 \\times 8 = 56$ et $5 \\times 12 = 60$.\n$56 < 60$, donc $\\dfrac{7}{12} < \\dfrac{5}{8}$.\n✔️ Autre chemin, le même dénominateur $24$ : $\\dfrac{14}{24}$ et $\\dfrac{15}{24}$.\n⚠️ On croise : le numérateur de l'une avec le dénominateur de l'AUTRE.",
          schema: droiteGraduee(0.5, 0.7, 0.05, [
            { value: 7 / 12, label: "7/12" },
            { value: 5 / 8, label: "5/8" },
          ]),
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce: "Quel est le plus petit des nombres $\\dfrac{1}{8}$, $\\dfrac{1}{9}$, $\\dfrac{1}{12}$ et $0{,}1$ ?",
          correction:
            "Les trois fractions ont le numérateur $1$ : la plus petite a le plus grand dénominateur, c'est $\\dfrac{1}{12}$.\nReste à la comparer à $0{,}1 = \\dfrac{1}{10}$ : $12 > 10$, donc $\\dfrac{1}{12} < \\dfrac{1}{10}$.\nLe plus petit est $\\dfrac{1}{12}$.\nL'ordre complet : $\\dfrac{1}{12} < 0{,}1 < \\dfrac{1}{9} < \\dfrac{1}{8}$.\n⭐ Écrire $0{,}1$ sous la forme $\\dfrac{1}{10}$ ramène tout à la même famille.",
          schema: droiteGraduee(0, 0.15, 0.05, [
            { value: 1 / 12, label: "1/12" },
            { value: 0.1, label: "0,1" },
            { value: 1 / 9, label: "1/9" },
            { value: 1 / 8, label: "1/8" },
          ]),
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce: "Soit $x$ un nombre tel que $0 < x < 1$. Comparer $x^2$ et $x$ en étudiant le signe de $x^2 - x$.",
          correction:
            "On factorise la différence : $x^2 - x = x(x - 1)$.\n$x > 0$, et $x - 1 < 0$ puisque $x < 1$.\nUn produit d'un positif par un négatif est négatif : $x^2 - x < 0$.\nDonc $x^2 < x$.\n⭐ C'est la règle de l'exercice 2, démontrée pour TOUS les nombres entre $0$ et $1$, et pas seulement pour $0{,}6$.\nSur le dessin : entre $0$ et $1$, la courbe de $x^2$ (orange) passe SOUS la droite $y = x$ (bleue). Après $1$, c'est l'inverse.",
          schema: repere([-1, 2, -1, 2], [{ q: [0, 1, 0] }, { q: [1, 0, 0], couleur: ORANGE }], [
            { x: 0, y: 0, label: "" },
            { x: 1, y: 1, label: "" },
          ]),
          micros: ["auto_num_comparer_difference"],
        },
        {
          enonce: "Comparer $A = \\dfrac{1}{3} + \\dfrac{1}{4}$ et $B = \\dfrac{1}{2} + \\dfrac{1}{12}$.",
          correction:
            "Tout sur $12$ : $A = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$ et $B = \\dfrac{6}{12} + \\dfrac{1}{12} = \\dfrac{7}{12}$.\n$A - B = 0$ : les deux nombres sont ÉGAUX.\n⚠️ Une comparaison a trois réponses possibles : plus grand, plus petit… ou égal.",
          micros: ["auto_num_fractions_comparer", "auto_num_comparer_difference"],
        },
        {
          enonce: "Comparer $a = 3^{20}$ et $b = 9^{9}$, sans les calculer.",
          correction:
            "On écrit tout avec la même base : $9 = 3^2$, donc $b = (3^2)^9 = 3^{18}$.\nQuotient : $\\dfrac{a}{b} = \\dfrac{3^{20}}{3^{18}} = 3^2 = 9$.\n$9 > 1$, donc $a > b$ : $a$ vaut même $9$ fois $b$.\n⚠️ $9^9$ n'est pas « plus grand parce que $9 > 3$ » : l'exposant compte autant que la base.",
          micros: ["auto_num_comparer_quotient"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Choisir le bon outil, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "La DIFFÉRENCE $a - b$ dit de COMBIEN $a$ dépasse $b$ : c'est un écart, avec une unité (euros, habitants…).",
        "Le QUOTIENT $\\dfrac{a}{b}$ dit COMBIEN DE FOIS $a$ contient $b$ : il n'a pas d'unité. $\\dfrac{a}{b} = 1{,}25$ se lit « $25$ % de plus ».",
        "Pour comparer des prix, des densités, des proportions, on ramène à la même unité : prix au kilo, habitants par km², part sur $100$.",
      ],
      exercices: [
        {
          titre: "Le prix au kilo",
          enonce:
            "Au supermarché, un paquet de café de $750$ g coûte $4{,}50$ €, et un paquet de $1$ kg coûte $5{,}80$ €. Quel est le plus avantageux ?",
          correction:
            "On compare les prix AU KILO, pas les prix des paquets.\nLe paquet de $1$ kg : $5{,}80$ € le kilo.\nLe paquet de $750$ g $= 0{,}75$ kg : $\\dfrac{4{,}50}{0{,}75} = 6$ € le kilo (car $0{,}75 \\times 6 = 4{,}50$).\n$5{,}80 < 6$ : le paquet de $1$ kg est le plus avantageux.\n⚠️ Le petit paquet est moins CHER, mais pas moins CHER AU KILO. C'est l'argument de nombreuses promotions.",
          schema: diagramme("barres", [
            { label: "750 g", value: 6 },
            { label: "1 kg", value: 5.8 },
          ]),
          micros: ["auto_num_comparer_quotient"],
        },
        {
          titre: "Deux villes qui grandissent",
          enonce:
            "En dix ans, la ville $A$ est passée de $40\\,000$ à $50\\,000$ habitants, et la ville $B$ de $150\\,000$ à $180\\,000$.\na) Laquelle a gagné le plus d'habitants ?\nb) Laquelle a grandi le plus vite ?",
          correction:
            "a) On compare des GAINS : des différences. $A$ gagne $10\\,000$ habitants, $B$ en gagne $30\\,000$. C'est $B$.\nb) « Grandir vite » se mesure par rapport à la taille de départ : des quotients.\n$A$ : $\\dfrac{50\\,000}{40\\,000} = \\dfrac{5}{4} = 1{,}25$, soit $+25$ %.\n$B$ : $\\dfrac{180\\,000}{150\\,000} = \\dfrac{6}{5} = 1{,}2$, soit $+20$ %.\n$A$ a grandi le plus vite.\n⭐ Les deux réponses sont différentes, et toutes deux justes : tout dépend de la question.",
          schema: diagramme("barres", [
            { label: "A avant", value: 40 },
            { label: "A après", value: 50 },
            { label: "B avant", value: 150 },
            { label: "B après", value: 180 },
          ]),
          micros: ["auto_num_comparer_quotient", "auto_num_comparer_difference"],
        },
        {
          enonce: "Comparer $\\dfrac{2}{3}$ et $0{,}67$.",
          correction:
            "On écrit $0{,}67 = \\dfrac{67}{100}$, puis on calcule la différence sur $300$ :\n$0{,}67 - \\dfrac{2}{3} = \\dfrac{201}{300} - \\dfrac{200}{300} = \\dfrac{1}{300}$.\nElle est positive : $0{,}67 > \\dfrac{2}{3}$.\n⚠️ $\\dfrac{2}{3} = 0{,}666\\ldots$ : $0{,}67$ en est une valeur ARRONDIE, légèrement trop grande. Un arrondi n'est pas une égalité.",
          schema: droiteGraduee(0.66, 0.68, 0.005, [
            { value: 2 / 3, label: "2/3" },
            { value: 0.67, label: "0,67" },
          ]),
          micros: ["auto_num_fractions_comparer", "auto_num_comparer_difference"],
        },
        {
          enonce: "Comparer $A = \\dfrac{999}{1000}$ et $B = \\dfrac{1000}{1001}$.",
          correction:
            "Différence sur le dénominateur commun $1000 \\times 1001$ :\n$A - B = \\dfrac{999 \\times 1001 - 1000 \\times 1000}{1000 \\times 1001}$.\nAstuce : $999 \\times 1001 = (1000 - 1)(1000 + 1) = 1000^2 - 1$.\nLe numérateur vaut donc $1000^2 - 1 - 1000^2 = -1$ : $A - B < 0$, et $A < B$.\n⭐ Il manque $\\dfrac{1}{1000}$ à $A$ pour faire $1$, et seulement $\\dfrac{1}{1001}$ à $B$ : $B$ est plus près de $1$.",
          micros: ["auto_num_comparer_difference"],
        },
        {
          titre: "Qui est le plus densément peuplé ?",
          enonce:
            "On arrondit : la France métropolitaine compte environ $66$ millions d'habitants pour $550\\,000$ km², l'Allemagne environ $84$ millions pour $357\\,000$ km². Quel pays est le plus densément peuplé ? Répondre d'abord sans aucun calcul, puis calculer les deux densités à l'unité près.",
          correction:
            "Sans calcul : l'Allemagne a PLUS d'habitants sur MOINS de surface. Son quotient « habitants ÷ surface » a un plus grand numérateur et un plus petit dénominateur : il est forcément plus grand.\nLes densités : France $\\dfrac{66\\,000\\,000}{550\\,000} = \\dfrac{6600}{55} = 120$ habitants par km².\nAllemagne $\\dfrac{84\\,000\\,000}{357\\,000} \\approx 235$ habitants par km².\nL'Allemagne est environ deux fois plus densément peuplée.\n⭐ Comparer deux quotients sans les calculer : c'est souvent possible, et c'est exactement ce qu'on attend d'un automatisme.",
          schema: diagramme("barres", [
            { label: "France", value: 120 },
            { label: "Allemagne", value: 235 },
          ]),
          micros: ["auto_num_comparer_quotient"],
        },
        {
          enonce: "Dans la classe $A$, $18$ élèves sur $30$ font du sport en club ; dans la classe $B$, $14$ sur $25$. Dans quelle classe la PROPORTION de sportifs est-elle la plus grande ?",
          correction:
            "On compare $\\dfrac{18}{30}$ et $\\dfrac{14}{25}$.\n$\\dfrac{18}{30} = \\dfrac{3}{5} = \\dfrac{15}{25}$. Comme $\\dfrac{15}{25} > \\dfrac{14}{25}$, la proportion est plus grande dans la classe $A$.\nEn pourcentages : $60$ % contre $56$ %.\n⚠️ Comparer $18$ et $14$ ne suffit pas : les classes n'ont pas le même effectif.",
          schema: diagramme("barres", [
            { label: "Classe A (%)", value: 60 },
            { label: "Classe B (%)", value: 56 },
          ]),
          micros: ["auto_num_fractions_comparer"],
        },
        {
          titre: "Les grains de riz",
          enonce:
            "Une légende raconte qu'un roi devait donner un grain de riz le premier jour, deux le deuxième, quatre le troisième, et ainsi de suite en doublant. Le trentième jour, il doit donner $2^{29}$ grains, et au total depuis le début environ $2^{30}$. Ce total dépasse-t-il un milliard ? On utilisera $2^{10} = 1024$.",
          correction:
            "Un milliard, c'est $10^9 = (10^3)^3 = 1000^3$.\nEt $2^{30} = (2^{10})^3 = 1024^3$.\n$1024 > 1000$, donc $1024^3 > 1000^3$ : $2^{30} > 10^9$.\nOui : le total dépasse un milliard de grains, en un mois seulement.\n⭐ Doubler à chaque étape fait exploser les nombres : c'est la croissance exponentielle, qu'on retrouvera dans l'année.",
          micros: ["auto_num_comparer_quotient"],
        },
        {
          titre: "Deux forfaits",
          enonce:
            "Un forfait $A$ coûte $20$ € par mois plus $0{,}10$ € par minute d'appel ; un forfait $B$ coûte $30$ € par mois, appels illimités. Pour $x$ minutes d'appel par mois, lequel est le moins cher ?",
          correction:
            "Prix de $A$ : $20 + 0{,}1x$. Prix de $B$ : $30$.\nOn étudie le signe de la différence : $(20 + 0{,}1x) - 30 = 0{,}1x - 10$.\n$0{,}1x - 10 < 0$ quand $x < 100$ : $A$ est alors moins cher.\n$0{,}1x - 10 > 0$ quand $x > 100$ : $B$ est moins cher.\nPour exactement $100$ minutes, les deux coûtent $30$ €.\n⭐ La réponse n'est pas un forfait, c'est une RÈGLE : « moins de $100$ minutes, prendre $A$ ».",
          schema: tableau(["minutes", "50", "100", "150"], ["écart A − B (€)", -5, 0, 5]),
          micros: ["auto_num_comparer_difference"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice, sauf mention contraire.",
      rappel: [
        "On nomme ce que l'on compare, on choisit l'outil (différence ou quotient), on conclut par une phrase qui répond à la question.",
        "Un pourcentage d'augmentation se lit sur le quotient : $\\dfrac{\\text{après}}{\\text{avant}} = 1{,}06$ veut dire $+6$ %.",
      ],
      exercices: [
        {
          titre: "Deux placements",
          enonce:
            "Pour placer une somme pendant deux ans, une banque propose : placement $A$, $+3$ % par an pendant deux ans ; placement $B$, $+6$ % en une seule fois au bout de deux ans.\na) Par quel nombre est multipliée la somme avec $A$ ? avec $B$ ?\nb) Quel placement est le meilleur ? Pour $10\\,000$ €, de combien ?",
          correction:
            "a) $+3$ % revient à multiplier par $1{,}03$, deux fois : $1{,}03^2 = 1{,}0609$. Avec $B$ : $\\times 1{,}06$.\nb) $\\dfrac{1{,}0609}{1{,}06} > 1$ puisque $1{,}0609 > 1{,}06$ : $A$ est meilleur.\nPour $10\\,000$ € : $A$ donne $10\\,609$ €, $B$ donne $10\\,600$ €. L'écart est de $9$ €.\n⭐ La deuxième année, les $3$ % s'appliquent aussi aux intérêts de la première : ce sont les intérêts composés.\n⚠️ $3$ % puis $3$ %, ce n'est pas $6$ % : c'est un peu plus.",
          micros: ["auto_num_comparer_quotient"],
        },
        {
          titre: "Deux géants démographiques",
          enonce:
            "Deux pays, notés $A$ et $B$, comptent environ $1\\,430$ millions et $1\\,410$ millions d'habitants (chiffres d'un modèle, arrondis).\na) Quelle est la différence entre leurs populations ? Comparer à la population de la France, environ $68$ millions.\nb) Calculer le quotient $\\dfrac{A}{B}$, arrondi au millième (calculatrice autorisée). Combien $A$ a-t-il d'habitants « en plus », en pourcentage ?\nc) Un journaliste écrit : « $A$ est BEAUCOUP plus peuplé que $B$. » Un autre : « Ils sont À PEU PRÈS aussi peuplés. » Qui a raison ?",
          correction:
            "a) $1\\,430 - 1\\,410 = 20$ millions d'habitants : presque un tiers de la France.\nb) $\\dfrac{1\\,430}{1\\,410} \\approx 1{,}014$ : $A$ a environ $1{,}4$ % d'habitants en plus.\nc) Les deux, chacun avec son outil. En DIFFÉRENCE, l'écart est énorme ($20$ millions). En QUOTIENT, il est minuscule ($1{,}4$ %).\n⭐ Pour juger de la taille d'un écart, on le rapporte à la taille des nombres comparés. $20$ millions, c'est beaucoup pour un village, et peu pour un pays de $1{,}4$ milliard.\nSur le diagramme, les deux barres ont presque la même hauteur : c'est le point de vue du quotient.",
          schema: diagramme("barres", [
            { label: "A (millions)", value: 1430 },
            { label: "B (millions)", value: 1410 },
          ]),
          micros: ["auto_num_comparer_difference", "auto_num_comparer_quotient"],
        },
        {
          titre: "Le budget d'une commune",
          enonce:
            "Une commune consacre $\\dfrac{2}{5}$ de son budget aux écoles, $\\dfrac{1}{4}$ aux routes et $\\dfrac{3}{10}$ aux services sociaux. Le reste va à la culture.\na) Ranger les trois premières parts de la plus grande à la plus petite.\nb) Quelle fraction du budget va à la culture ?\nc) Le budget est de $2$ millions d'euros. Combien reçoit la culture ?",
          correction:
            "a) Tout sur $20$ : $\\dfrac{2}{5} = \\dfrac{8}{20}$, $\\dfrac{1}{4} = \\dfrac{5}{20}$, $\\dfrac{3}{10} = \\dfrac{6}{20}$.\nDonc écoles ($\\dfrac{8}{20}$) $>$ services sociaux ($\\dfrac{6}{20}$) $>$ routes ($\\dfrac{5}{20}$).\nb) $\\dfrac{8}{20} + \\dfrac{5}{20} + \\dfrac{6}{20} = \\dfrac{19}{20}$. Il reste $1 - \\dfrac{19}{20} = \\dfrac{1}{20}$ pour la culture.\nc) $\\dfrac{1}{20}$ de $2$ millions : $2\\,000\\,000 \\div 20 = 100\\,000$ euros.\n⭐ Le dénominateur commun $20$ a servi trois fois : pour ranger, pour additionner, pour trouver le reste.",
          schema: diagramme("camembert", [
            { label: "Écoles", value: 40 },
            { label: "Social", value: 30 },
            { label: "Routes", value: 25 },
            { label: "Culture", value: 5 },
          ]),
          micros: ["auto_num_fractions_comparer", "auto_num_comparer_difference"],
        },
        {
          titre: "Deux remises",
          enonce:
            "Un magasin propose, au choix : remise $A$, $20$ € de moins sur le prix ; remise $B$, $15$ % de moins.\na) Pour un article à $100$ €, puis à $200$ €, quelle remise est la meilleure ?\nb) On note $x$ le prix de départ, en euros. Exprimer le prix payé avec chaque remise.\nc) Étudier le signe de la différence, et dire pour quels prix la remise $A$ est la meilleure.",
          correction:
            "a) À $100$ € : $A$ fait payer $80$ €, $B$ fait payer $85$ € : $A$ est meilleure.\nÀ $200$ € : $A$ fait payer $180$ €, $B$ fait payer $170$ € : $B$ est meilleure.\nb) Avec $A$ : $x - 20$. Avec $B$ : $0{,}85x$ (on garde $85$ % du prix).\nc) $(x - 20) - 0{,}85x = 0{,}15x - 20$. Elle est négative quand $0{,}15x < 20$, soit $x < \\dfrac{20}{0{,}15} \\approx 133{,}33$.\nPour un prix inférieur à environ $133$ €, la remise $A$ fait payer moins : elle est la meilleure. Au-delà, c'est $B$.\n⭐ Une remise fixe avantage les petits prix, une remise en pourcentage les gros.",
          schema: tableau(["prix de départ (€)", "100", "133", "200"], ["payé avec A − payé avec B (€)", -5, "≈ 0", 10]),
          micros: ["auto_num_comparer_difference"],
        },
      ],
    },
  ],
};
