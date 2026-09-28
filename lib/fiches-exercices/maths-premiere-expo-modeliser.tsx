// ─── Fiche d'exercices : modéliser une évolution exponentielle (1re, sans spé)
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), sixième feuille : reconnaître un phénomène
// exponentiel, choisir le modèle (suite géométrique ou x ↦ k × aˣ), le
// comparer à un modèle linéaire, estimer des ordres de grandeur. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts`.
//
// ⛔ Programme de première sans spé : pas de logarithme, pas de eˣ. Les
// seuils se trouvent en TESTANT des valeurs ou en lisant une courbe.
//
// ⭐⭐ LE FIL : AJOUTER OU MULTIPLIER — ET L'EXPONENTIELLE FINIT TOUJOURS
// DEVANT. Les situations du BO sont là : intérêts composés (9), modèle de
// Malthus (11), triangle de Sierpinski (8), propagation d'une rumeur (20),
// taux de reproduction d'une épidémie (15). Les pièges nommés : trois passages
// au moins pour distinguer les modèles (1), « +20 » lu pour « +20 % » (3),
// les pourcentages de baisse additionnés (4), la linéaire qui mène au début
// (12, 18), deux modèles qui collent aux mêmes premières données (19),
// « 2 personnes par heure » lu × 2 (20).
//
// ⭐ Contextes : économie (intérêts 9, salle de sport 18), physique
// (condensateur 10), histoire-géo (Malthus 11, lapins d'Australie 14,
// légende de l'échiquier 17), sport (clubs de volley 12, salle de sport 18),
// écologie (usine 13, frelons 19), santé (épidémie 15), numérique (loi de
// Moore 16). Faits réels cités : Malthus (1798) et son doublement en 25 ans
// (11) ; les 24 lapins relâchés en Australie en 1859 (14) ; la loi de Moore,
// les 2 300 transistors du premier microprocesseur d'Intel en 1971, des
// dizaines de milliards en 2021 (16) ; environ 800 millions de tonnes de blé
// récoltées par an dans le monde (17) ; environ 68 millions d'habitants en
// France (20).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-modeliser.mjs`.
//
// Micro-compétences : expo_modele_reconnaitre (1, 2, 8, 10, 13, 14, 17, 19,
// 20), expo_modele_choisir (3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
// 19, 20), expo_modele_comparer (6, 9, 11, 12, 18, 19), expo_ordre_grandeur
// (5, 7, 14, 15, 16, 17, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoModeliserPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-modeliser",
  titre: "Modéliser une évolution exponentielle",
  accroche:
    "Vingt exercices pour reconnaître une croissance exponentielle, choisir entre un modèle linéaire et un modèle exponentiel, les comparer, et estimer des ordres de grandeur : intérêts composés, Malthus, lapins d'Australie, épidémie, loi de Moore, légende de l'échiquier. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Calculatrice autorisée.",
      rappel: [
        "Croissance LINÉAIRE : on AJOUTE toujours la même quantité. Modèle $u_n = u_0 + r n$ : les points sont alignés.",
        "Croissance EXPONENTIELLE : on MULTIPLIE toujours par le même nombre. Modèle $u_n = u_0 \\times q^n$, ou $f(x) = k \\times a^x$.",
        "Sur des valeurs : différences constantes, linéaire ; quotients constants, exponentiel.",
        "Doubler $10$ fois, c'est multiplier par $2^{10} = 1\\,024$ : environ mille.",
      ],
      exercices: [
        {
          enonce: "Voici deux relevés.\nA : $100$ ; $150$ ; $225$ ; $337{,}5$.\nB : $100$ ; $150$ ; $200$ ; $250$.\nLequel correspond à une croissance exponentielle ?",
          correction:
            "Relevé A : quotients $\\dfrac{150}{100} = 1{,}5$ ; $\\dfrac{225}{150} = 1{,}5$ ; $\\dfrac{337{,}5}{225} = 1{,}5$. Ils sont constants : croissance exponentielle, on multiplie par $1{,}5$.\nRelevé B : différences $50$ ; $50$ ; $50$. Elles sont constantes : croissance linéaire, on ajoute $50$.\n⚠️ Les deux commencent pareil, $100$ puis $150$ : il faut regarder plusieurs passages pour les distinguer.\nSur le dessin, en centaines : les points rouges de A s'incurvent, la droite orange de B reste alignée.",
          schema: ecranSeulement(repere([-1, 4, -1, 4], [{ pts: [[0, 1], [1, 1.5], [2, 2], [3, 2.5]], couleur: ORANGE }], [{ x: 0, y: 1 }, { x: 1, y: 1.5 }, { x: 2, y: 2.25 }, { x: 3, y: 3.375 }])),
          micros: ["expo_modele_reconnaitre"],
        },
        {
          enonce: "Pour chaque situation, l'évolution est-elle linéaire ou exponentielle ?\na) Un salaire augmente de $50$ € par an.\nb) Une population augmente de $3$ % par an.\nc) Un taxi coûte $2$ € par kilomètre parcouru.\nd) La quantité d'une substance est divisée par $2$ chaque heure.",
          correction:
            "a) On ajoute $50$ € chaque année : linéaire.\nb) On multiplie par $1{,}03$ chaque année : exponentielle.\nc) On ajoute $2$ € par kilomètre : linéaire.\nd) On multiplie par $0{,}5$ chaque heure : décroissance exponentielle.\n⭐ « De … € » ou « de … km » annonce souvent un AJOUT ; « de … % » ou « divisé par » annonce une MULTIPLICATION.\nSur le dessin : le taxi (droite orange, $+2$ € par km) est linéaire ; la substance (points rouges, divisée par $2$ chaque heure, en partant de $8$) est exponentielle.",
          schema: ecranSeulement(repere([-1, 4, -1, 9], [{ pts: [[0, 0], [1, 2], [2, 4], [3, 6]], couleur: ORANGE }], [{ x: 0, y: 8 }, { x: 1, y: 4 }, { x: 2, y: 2 }, { x: 3, y: 1 }])),
          micros: ["expo_modele_reconnaitre"],
        },
        {
          enonce: "Une quantité vaut $50$ au départ et augmente de $20$ % à chaque étape. Quelle fonction donne sa valeur après $x$ étapes : $f(x) = 50 + 20x$, $f(x) = 50 \\times 1{,}2^x$ ou $f(x) = 50 \\times 1{,}2 \\times x$ ?",
          correction:
            "$+20$ % à chaque étape, c'est multiplier par $1{,}2$ à chaque étape : $f(x) = 50 \\times 1{,}2^x$.\n✔️ $f(0) = 50$ et $f(1) = 60$ : une hausse de $10$, soit $20$ % de $50$.\n⚠️ $50 + 20x$ ajoute $20$, pas $20$ %. Et $50 \\times 1{,}2 \\times x$ vaut $0$ au départ : impossible.\nSur le dessin, en dizaines : la bonne fonction en bleu, $50 + 20x$ en orange.",
          schema: ecranSeulement(repere([-1, 5, -1, 14], [{ pts: [[0, 5], [1, 6], [2, 7.2], [3, 8.64], [4, 10.37]] }, { pts: [[0, 5], [1, 7], [2, 9], [3, 11], [4, 13]], couleur: ORANGE }], [], undefined, true)),
          micros: ["expo_modele_choisir"],
        },
        {
          enonce: "Un appareil vaut $800$ € neuf et perd $25$ % de sa valeur chaque année. Modéliser sa valeur $u_n$ au bout de $n$ années, puis calculer $u_3$.",
          correction:
            "Perdre $25$ %, c'est multiplier par $0{,}75$ : suite géométrique, $u_n = 800 \\times 0{,}75^n$.\n$u_3 = 800 \\times 0{,}421875 = 337{,}5$ €.\n⚠️ Pas $800 - 3 \\times 200 = 200$ € : chaque année, les $25$ % portent sur une valeur plus petite.\nSur le dessin, en centaines : les points rouges du modèle, la droite orange du « $-200$ € par an » qui se trompe.",
          schema: ecranSeulement(repere([-1, 4, -1, 9], [{ pts: [[0, 8], [1, 6], [2, 4], [3, 2]], couleur: ORANGE }], [{ x: 0, y: 8 }, { x: 1, y: 6 }, { x: 2, y: 4.5 }, { x: 3, y: 3.375 }])),
          micros: ["expo_modele_choisir"],
        },
        {
          enonce: "Sachant que $2^{10} = 1\\,024$, donner un ordre de grandeur de $2^{20}$ et de $2^{30}$.",
          correction:
            "$2^{20} = 2^{10} \\times 2^{10} \\approx 1\\,000 \\times 1\\,000$ : environ un million. Exactement : $1\\,048\\,576$.\n$2^{30} = 2^{10} \\times 2^{10} \\times 2^{10}$ : environ un milliard. Exactement : $1\\,073\\,741\\,824$.\n⭐ À retenir : doubler $10$ fois, c'est multiplier par environ mille.",
          schema: ecranSeulement(tableau(["puissance", "2 puissance 10", "2 puissance 20", "2 puissance 30"], ["valeur", "1 024", "1 048 576", "1 073 741 824"], true)),
          micros: ["expo_ordre_grandeur"],
        },
        {
          enonce: "Deux quantités valent $100$ au départ. La première augmente de $10$ par an, la seconde de $10$ % par an.\na) Comparer leurs valeurs au bout d'un an.\nb) Comparer leurs valeurs au bout de $10$ ans (au centième).",
          correction:
            "a) Première : $100 + 10 = 110$. Seconde : $100 \\times 1{,}1 = 110$. Égales au bout d'un an.\nb) Première : $100 + 10 \\times 10 = 200$. Seconde : $100 \\times 1{,}1^{10} \\approx 259{,}37$.\n⭐ Même départ, même première hausse : puis l'exponentielle prend le large, car ses $10$ % portent sur une quantité de plus en plus grande.\nSur le dessin, en centaines : l'exponentielle en bleu passe au-dessus de la droite orange.",
          schema: ecranSeulement(repere([-1, 11, -1, 3], [{ pts: [[0, 1], [1, 1.1], [2, 1.21], [3, 1.33], [4, 1.46], [5, 1.61], [6, 1.77], [7, 1.95], [8, 2.14], [9, 2.36], [10, 2.59]] }, { pts: [[0, 1], [10, 2]], couleur: ORANGE }], [], undefined, true)),
          micros: ["expo_modele_comparer"],
        },
        {
          enonce: "On plie en deux, en pensée, une feuille de papier épaisse de $0{,}1$ mm. À chaque pliage, l'épaisseur double.\na) Quelle est l'épaisseur après $10$ pliages ? Donner un ordre de grandeur.\nb) Et après $20$ pliages ?",
          correction:
            "a) $0{,}1 \\times 2^{10} = 0{,}1 \\times 1\\,024 = 102{,}4$ mm : environ $10$ cm.\nb) $0{,}1 \\times 2^{20} = 0{,}1 \\times 1\\,048\\,576 = 104\\,857{,}6$ mm, soit environ $105$ m : la hauteur d'un immeuble d'une trentaine d'étages.\n⭐ En vrai, on ne peut plier une feuille que quelques fois : c'est une expérience de pensée, qui montre la puissance du doublement.",
          schema: ecranSeulement(tableau(["pliages", "0", "10", "20"], ["épaisseur", "0,1 mm", "≈ 10 cm", "≈ 105 m"])),
          micros: ["expo_ordre_grandeur"],
        },
        {
          enonce: "Le triangle de Sierpinski : on part d'un triangle noir d'aire $1$. À chaque étape, on retire le quart central de chaque triangle noir : l'aire noire est multipliée par $\\dfrac{3}{4}$.\na) Modéliser l'aire noire $A_n$ après $n$ étapes. Est-ce linéaire ou exponentiel ?\nb) Calculer $A_5$ au centième. Quelle part de l'aire reste-t-il ?",
          correction:
            "a) On multiplie par $\\dfrac{3}{4} = 0{,}75$ à chaque étape : $A_n = 0{,}75^n$. Décroissance exponentielle.\nb) $A_5 = 0{,}75^5 \\approx 0{,}24$ : il reste environ $24$ % de l'aire noire.\n⭐ L'aire tend vers $0$ sans jamais l'atteindre : il reste toujours des triangles noirs, de plus en plus petits.",
          schema: ecranSeulement(tableau(["étape", "0", "1", "2", "5"], ["aire noire", 1, 0.75, 0.5625, 0.24])),
          micros: ["expo_modele_choisir", "expo_modele_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Reconnaître le modèle, l'écrire, calculer, comparer, conclure.",
      rappel: [
        "On regarde si l'on AJOUTE (linéaire) ou si l'on MULTIPLIE (exponentiel), dans l'énoncé ou sur les valeurs.",
        "Modèle linéaire : $u_n = u_0 + r n$. Modèle exponentiel : $u_n = u_0 \\times q^n$.",
        "Une croissance exponentielle finit TOUJOURS par dépasser une croissance linéaire, même si elle part plus bas.",
      ],
      exercices: [
        {
          titre: "Intérêts simples ou composés",
          enonce:
            "On place $1\\,000$ €. Offre $A$ : intérêts simples, $+50$ € par an. Offre $B$ : intérêts composés, $+5$ % par an (modèles).\na) Modéliser le capital de chaque offre au bout de $n$ années. Quel modèle est linéaire ? exponentiel ?\nb) Comparer les deux capitaux au bout d'un an, puis de $20$ ans (au centime).\nc) Expliquer l'écart.",
          correction:
            "a) $A$ : $a_n = 1\\,000 + 50n$, linéaire. $B$ : $b_n = 1\\,000 \\times 1{,}05^n$, exponentiel.\nb) Au bout d'un an : $1\\,050$ € dans les deux cas.\nAu bout de $20$ ans : $a_{20} = 1\\,000 + 50 \\times 20 = 2\\,000$ € ; $b_{20} = 1\\,000 \\times 1{,}05^{20} \\approx 2\\,653{,}30$ €.\nc) En $B$, les intérêts de chaque année rapportent à leur tour des intérêts : l'écart grandit chaque année. Ici, plus de $650$ €.\n⭐ Le même « $5$ % » donne deux résultats très différents, selon qu'on ajoute ou qu'on multiplie.",
          schema: diagramme("barres", [
            { label: "A (simple)", value: 2000 },
            { label: "B (composé)", value: 2653.3 },
          ]),
          micros: ["expo_modele_comparer", "expo_modele_choisir"],
        },
        {
          titre: "Un condensateur se décharge",
          enonce:
            "On relève la tension aux bornes d'un condensateur qui se décharge, chaque seconde. Les valeurs sont arrondies au centième.\na) La décroissance est-elle linéaire ou exponentielle ? Justifier.\nb) Proposer un modèle $U(t)$, en volts, $t$ en secondes.\nc) Estimer la tension au bout de $5$ s, puis de $2{,}5$ s.",
          figure: tableau(["t (s)", "0", "1", "2", "3"], ["U (V)", 9, 6.3, 4.41, 3.09]),
          correction:
            "a) Différences : $-2{,}7$ ; $-1{,}89$ ; $-1{,}32$. Elles changent : pas linéaire.\nQuotients : $\\dfrac{6{,}3}{9} = 0{,}7$ ; $\\dfrac{4{,}41}{6{,}3} = 0{,}7$ ; $\\dfrac{3{,}09}{4{,}41} \\approx 0{,}7$. Ils sont constants : décroissance exponentielle.\nb) $U(t) = 9 \\times 0{,}7^t$.\nc) $U(5) = 9 \\times 0{,}7^5 \\approx 1{,}51$ V ; $U(2{,}5) = 9 \\times 0{,}7^{2{,}5} \\approx 3{,}69$ V.\n⭐ La tension perd $30$ % chaque seconde : de moins en moins de volts, car elle part d'une valeur de plus en plus petite.",
          micros: ["expo_modele_reconnaitre", "expo_modele_choisir"],
        },
        {
          titre: "Le modèle de Malthus",
          enonce:
            "En 1798, l'économiste Thomas Malthus affirme qu'une population qui ne rencontre aucun obstacle double tous les $25$ ans, alors que les ressources alimentaires n'augmentent que d'une quantité fixe. Modèle : un pays de $10$ millions d'habitants a de quoi nourrir $10$ millions de personnes ; tous les $25$ ans, la nourriture permet d'en nourrir $10$ millions de plus.\na) On note $n$ le nombre de périodes de $25$ ans. Modéliser la population $p_n$ et le nombre $r_n$ de personnes qu'on peut nourrir, en millions.\nb) Comparer $p_n$ et $r_n$ pour $n = 1$, $n = 2$ et $n = 4$.\nc) Quelle conclusion Malthus en tirait-il ?",
          correction:
            "a) La population double à chaque période : $p_n = 10 \\times 2^n$, exponentielle. La nourriture augmente de $10$ millions à chaque période : $r_n = 10 + 10n$, linéaire.\nb) $n = 1$ : $p_1 = 20$ et $r_1 = 20$, égalité.\n$n = 2$ : $p_2 = 40$ et $r_2 = 30$ : $10$ millions de personnes sans nourriture.\n$n = 4$ : $p_4 = 160$ et $r_4 = 50$ : plus de trois fois trop d'habitants.\nc) Pour Malthus, la population finit toujours par dépasser les ressources : famines et misère freinent alors sa croissance.\n⭐ L'histoire a nuancé sa prédiction : les progrès de l'agriculture ont fait croître les ressources bien plus vite qu'il ne le pensait.\nSur le dessin, en dizaines de millions : les points rouges pour la population, la droite orange pour la nourriture.",
          schema: repere([-1, 5, -1, 9], [{ pts: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]], couleur: ORANGE }], [
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 8 },
          ]),
          micros: ["expo_modele_comparer", "expo_modele_choisir"],
        },
        {
          titre: "Deux clubs de volley",
          enonce:
            "Deux clubs de volley ont chacun $100$ adhérents en 2025. Le club $A$ en gagne $15$ par an ; le club $B$ en gagne $10$ % par an (modèles).\na) Modéliser le nombre d'adhérents de chaque club au bout de $n$ années.\nb) Le tableau donne l'écart $A - B$, arrondi au centième. Qui est devant au bout de $5$ ans ? de $9$ ans ?\nc) À partir de quelle année $B$ dépasse-t-il $A$ ? Pourquoi était-ce prévisible ?",
          figure: tableau(["année n", "0", "5", "8", "9"], ["écart A − B", 0, 13.95, 5.64, -0.79]),
          correction:
            "a) $A$ : $a_n = 100 + 15n$, linéaire. $B$ : $b_n = 100 \\times 1{,}1^n$, exponentiel.\nb) Au bout de $5$ ans, l'écart est positif : $A$ est devant, $175$ contre environ $161$. Au bout de $9$ ans, il est négatif : $B$ est passé devant.\nc) $a_8 = 220$ et $b_8 \\approx 214{,}36$ : $A$ encore devant. $a_9 = 235$ et $b_9 \\approx 235{,}79$ : $B$ devant. C'est à partir de $n = 9$, soit en 2034.\nC'était prévisible : une croissance exponentielle finit toujours par dépasser une croissance linéaire.\n⚠️ Au début, $B$ gagne MOINS que $A$ : $10$ adhérents la première année, contre $15$. C'est ce qui trompe.",
          micros: ["expo_modele_comparer", "expo_modele_choisir"],
        },
        {
          titre: "Une usine plus sobre",
          enonce:
            "Après un plan de sobriété, une usine relève ses émissions de CO₂, en tonnes, chaque année.\na) Le directeur dit : « Nous baissons de $12$ tonnes par an. » Est-ce vrai ?\nb) Montrer que la baisse est exponentielle, et donner son taux.\nc) Modéliser les émissions, et estimer celles de l'année $10$, à la tonne près.",
          figure: tableau(["année", "0", "1", "2", "3"], ["CO₂ (t)", 240, 228, 216.6, 205.77]),
          correction:
            "a) Différences : $-12$ ; $-11{,}4$ ; $-10{,}83$. Vrai la première année seulement.\nb) Quotients : $\\dfrac{228}{240} = 0{,}95$ ; $\\dfrac{216{,}6}{228} = 0{,}95$ ; $\\dfrac{205{,}77}{216{,}6} = 0{,}95$. Une baisse de $5$ % par an : décroissance exponentielle.\nc) $E(n) = 240 \\times 0{,}95^n$. $E(10) = 240 \\times 0{,}95^{10} \\approx 144$ tonnes.\n⚠️ Le modèle linéaire, $240 - 12n$, donnerait $120$ tonnes : il surestimerait la baisse.",
          micros: ["expo_modele_reconnaitre", "expo_modele_choisir"],
        },
        {
          titre: "Les lapins d'Australie",
          enonce:
            "En 1859, $24$ lapins sont relâchés dans une ferme d'Australie, où ils n'ont presque aucun prédateur. Supposons (modèle) que leur nombre soit multiplié par $4$ chaque année.\na) Est-ce une croissance linéaire ou exponentielle ? Modéliser le nombre $L_n$ de lapins $n$ années après 1859.\nb) Calculer $L_1$ et $L_2$, puis donner un ordre de grandeur de $L_{10}$, en utilisant $4^{10} = 2^{20}$.\nc) Pourquoi ce modèle ne peut-il pas durer ?",
          correction:
            "a) On multiplie par $4$ chaque année : exponentielle. $L_n = 24 \\times 4^n$.\nb) $L_1 = 96$ ; $L_2 = 384$.\n$4^{10} = 2^{20}$, environ un million : $L_{10}$ vaut environ $24$ millions de lapins. Exactement : $25\\,165\\,824$.\nc) La nourriture et l'espace finissent par manquer : la croissance ralentit. Le modèle ne vaut que pour les premières années.\n⭐ Partis de $24$, des millions en dix ans : c'est la puissance d'une croissance exponentielle.",
          schema: tableau(["année", "1859", "1860", "1861", "1869"], ["lapins", "24", "96", "384", "25 165 824"], true),
          micros: ["expo_modele_reconnaitre", "expo_modele_choisir", "expo_ordre_grandeur"],
        },
        {
          titre: "Le début d'une épidémie",
          enonce:
            "Au début d'une épidémie, chaque malade contamine en moyenne $3$ personnes, puis guérit ; une « génération » de contamination dure environ $5$ jours (modèle). On part d'un seul malade.\na) Modéliser le nombre $c_n$ de nouveaux malades à la génération $n$.\nb) Combien de nouveaux malades à la génération $10$, soit environ $50$ jours plus tard ?\nc) Des gestes barrières font passer ce nombre moyen de $3$ à $1{,}5$. Combien de nouveaux malades à la génération $10$ ? Et s'il descend à $0{,}8$ ?",
          correction:
            "a) À chaque génération, on multiplie par $3$ : $c_n = 3^n$, croissance exponentielle.\nb) $c_{10} = 3^{10} = 59\\,049$ nouveaux malades.\nc) Avec $1{,}5$ : $1{,}5^{10} \\approx 57{,}7$, soit environ $58$ nouveaux malades. Avec $0{,}8$ : $0{,}8^{10} \\approx 0{,}11$ : l'épidémie s'éteint.\n⭐ Tout se joue autour de $1$ : au-dessus, l'épidémie explose ; en dessous, elle recule. Passer de $3$ à $1{,}5$ divise les malades de la génération $10$ par $2^{10} = 1\\,024$.\n⚠️ Le modèle ne vaut qu'au début : ensuite, beaucoup de gens sont déjà immunisés.",
          schema: ecranSeulement(tableau(["génération", "0", "5", "10"], ["nouveaux malades", 1, 243, 59049])),
          micros: ["expo_ordre_grandeur", "expo_modele_choisir"],
        },
        {
          titre: "La loi de Moore",
          enonce:
            "En 1971, le premier microprocesseur d'Intel comptait environ $2\\,300$ transistors. Selon la « loi de Moore », énoncée par l'ingénieur Gordon Moore, ce nombre double environ tous les deux ans.\na) Modéliser le nombre $T_n$ de transistors au bout de $n$ périodes de deux ans.\nb) Combien de périodes de deux ans entre 1971 et 2021 ? Estimer $T$ en 2021 à l'aide de $2^{25} = 2^{20} \\times 2^5$.\nc) Les processeurs de 2021 comptaient des dizaines de milliards de transistors. Le modèle est-il cohérent ?",
          correction:
            "a) Doubler, c'est multiplier par $2$ : $T_n = 2\\,300 \\times 2^n$.\nb) $2021 - 1971 = 50$ ans, soit $25$ périodes. $2^{25} = 2^{20} \\times 2^5$, environ un million fois $32$ : $32$ millions.\n$T_{25}$ vaut donc environ $2\\,300 \\times 32$ millions, soit environ $74$ milliards. Exactement : $2\\,300 \\times 2^{25} \\approx 77$ milliards.\nc) Oui : quelques dizaines de milliards, c'est bien l'ordre de grandeur.\n⭐ Un doublement tous les deux ans pendant $50$ ans : un facteur de plus de $30$ millions.",
          schema: ecranSeulement(tableau(["année", "1971", "1991", "2021"], ["transistors", "2 300", "≈ 2,4 millions", "≈ 77 milliards"])),
          micros: ["expo_ordre_grandeur", "expo_modele_choisir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "Choisir le modèle : ajout constant, linéaire ; pourcentage constant, exponentiel. On vérifie sur les données.",
        "Pour comparer deux modèles, on calcule quelques valeurs, ou on lit leurs courbes : l'exponentielle finit toujours devant.",
        "Ordre de grandeur : $2^{10} \\approx 10^3$, et on raisonne en puissances de $10$.",
      ],
      exercices: [
        {
          titre: "La légende de l'échiquier",
          enonce:
            "La légende de l'échiquier : $1$ grain de blé sur la première case, $2$ sur la deuxième, $4$ sur la troisième, et ainsi de suite en doublant, jusqu'à la $64$e case.\na) Combien de grains sur la case $n$ ? Est-ce un modèle linéaire ou exponentiel ?\nb) On admet que le total des $64$ cases vaut $2^{64} - 1$ grains. Avec $2^{10} \\approx 10^3$, donner un ordre de grandeur de $2^{64} = 2^4 \\times (2^{10})^6$.\nc) Un grain pèse environ $0{,}05$ g (modèle). Estimer la masse totale, en tonnes.\nd) Le monde récolte environ $800$ millions de tonnes de blé par an. Combien d'années de récolte faudrait-il ?",
          correction:
            "a) Case $n$ : $2^{n-1}$ grains. On multiplie par $2$ à chaque case : exponentiel.\nb) $2^{64} = 2^4 \\times (2^{10})^6 \\approx 16 \\times (10^3)^6 = 16 \\times 10^{18}$, soit environ $1{,}6 \\times 10^{19}$ grains. La calculatrice donne environ $1{,}8 \\times 10^{19}$.\nc) $1{,}6 \\times 10^{19} \\times 0{,}05 = 8 \\times 10^{17}$ g, soit $8 \\times 10^{11}$ tonnes : $800$ milliards de tonnes.\nd) $\\dfrac{800 \\text{ milliards}}{800 \\text{ millions}} = 1\\,000$ : environ mille ans de récoltes mondiales !\n⭐ Le roi croyait promettre un sac de blé : la croissance exponentielle trompe l'intuition.\n⚠️ $2^{10} \\approx 10^3$ sous-estime un peu, et l'erreur se répète six fois : d'où $1{,}6$ au lieu de $1{,}8$.",
          schema: tableau(["case", "1", "10", "20", "64"], ["grains", "1", "512", "524 288", "≈ 9,2 × 10¹⁸"], true),
          micros: ["expo_modele_reconnaitre", "expo_ordre_grandeur", "expo_modele_choisir"],
        },
        {
          titre: "L'abonnement à la salle de sport",
          enonce:
            "Une salle de sport propose deux formules d'abonnement, à $30$ € par mois aujourd'hui (modèles). Formule $A$ : le prix augmente de $3$ € par an. Formule $B$ : il augmente de $5$ % par an.\na) Modéliser le prix mensuel de chaque formule au bout de $n$ années.\nb) La courbe bleue représente $A$, l'orange $B$, en dizaines d'euros ; l'abscisse compte les périodes de $5$ ans. Lire au bout de combien d'années $B$ devient plus chère que $A$.\nc) Le vérifier par le calcul pour $n = 26$ et $n = 27$.\nd) Un client s'engage pour $10$ ans. Quelle formule choisir ?",
          figure: repere([-1, 7, -1, 14], [
            { pts: [[0, 3], [1, 4.5], [2, 6], [3, 7.5], [4, 9], [5, 10.5], [6, 12]] },
            { pts: [[0, 3], [1, 3.83], [2, 4.89], [3, 6.24], [4, 7.96], [5, 10.16], [6, 12.97]], couleur: ORANGE },
          ], [], undefined, true),
          correction:
            "a) $A$ : $a_n = 30 + 3n$, linéaire. $B$ : $b_n = 30 \\times 1{,}05^n$, exponentiel.\nb) Les courbes se croisent entre les abscisses $5$ et $6$ : entre $25$ et $30$ ans.\nc) $a_{26} = 108$ et $b_{26} \\approx 106{,}67$ : $A$ est encore plus chère. $a_{27} = 111$ et $b_{27} \\approx 112{,}00$ : $B$ est plus chère. C'est à partir de $27$ ans.\nd) Sur $10$ ans, $B$ reste la moins chère : $b_{10} \\approx 48{,}87$ €, contre $a_{10} = 60$ €.\n⭐ Le linéaire mène longtemps, l'exponentiel finit toujours par passer devant : ici, au bout de $27$ ans.\n⚠️ Sur le graphique, l'abscisse $5$ veut dire $25$ ans.",
          micros: ["expo_modele_comparer", "expo_modele_choisir"],
        },
        {
          titre: "Des frelons invasifs",
          enonce:
            "Une espèce de frelons invasive s'installe dans une région. Le tableau donne le nombre de nids recensés chaque année (modèle).\na) Montrer que la croissance est exponentielle. Modéliser le nombre de nids $N(n)$.\nb) Un agent propose le modèle linéaire $10 + 86{,}7n$, qui donne lui aussi environ $270$ nids l'année $3$. Comparer les deux modèles l'année $6$.\nc) Donner un ordre de grandeur du nombre de nids l'année $10$, selon le modèle exponentiel.\nd) Pourquoi faut-il agir dès les premières années ?",
          figure: tableau(["année", "0", "1", "2", "3"], ["nids", 10, 30, 90, 270]),
          correction:
            "a) $\\dfrac{30}{10} = \\dfrac{90}{30} = \\dfrac{270}{90} = 3$ : on multiplie par $3$ chaque année. $N(n) = 10 \\times 3^n$.\nb) Exponentiel : $N(6) = 10 \\times 729 = 7\\,290$ nids. Linéaire : $10 + 86{,}7 \\times 6$, environ $530$ nids. Plus de $13$ fois moins.\nc) $N(10) = 10 \\times 3^{10} = 590\\,490$ : de l'ordre de $600\\,000$ nids.\nd) Chaque année d'attente MULTIPLIE le problème par $3$ : détruire $10$ nids l'année $0$ en évite des centaines de milliers plus tard.\n⚠️ Deux modèles peuvent coller aux mêmes premières données, et s'écarter énormément ensuite.",
          micros: ["expo_modele_reconnaitre", "expo_modele_comparer", "expo_ordre_grandeur", "expo_modele_choisir"],
        },
        {
          titre: "Une rumeur",
          enonce:
            "Une rumeur se propage : chaque heure, chaque personne qui la connaît la raconte à $2$ personnes qui ne la connaissaient pas (modèle). À $8$ h, une seule personne la connaît.\na) Justifier que le nombre de personnes au courant est multiplié par $3$ chaque heure. Modéliser ce nombre $R_n$, $n$ heures après $8$ h.\nb) Combien de personnes la connaissent à $18$ h ?\nc) La France compte environ $68$ millions d'habitants. Selon le modèle, à quelle heure la rumeur dépasserait-elle ce nombre ? Tester des puissances de $3$.\nd) Pourquoi le modèle cesse-t-il d'être valable bien avant ?",
          correction:
            "a) Chaque personne au courant le reste, et en informe $2$ nouvelles : le nombre est multiplié par $1 + 2 = 3$. $R_n = 3^n$.\nb) $18$ h, c'est $n = 10$ : $R_{10} = 3^{10} = 59\\,049$ personnes.\nc) $3^{16} = 43\\,046\\,721$, moins de $68$ millions ; $3^{17} = 129\\,140\\,163$, plus. Donc pour $n = 17$, soit $8 + 17 = 25$ h : le lendemain, à $1$ h du matin.\nd) Il devient de plus en plus difficile de trouver des personnes qui ne la connaissent PAS : la propagation ralentit. Le modèle exponentiel ne vaut qu'au début.\n⚠️ « $2$ personnes par heure » ne donne pas $\\times 2$, mais $\\times 3$ : on n'oublie pas ceux qui savaient déjà.",
          schema: tableau(["heure", "8 h", "13 h", "18 h", "1 h"], ["au courant", "1", "243", "59 049", "129 140 163"], true),
          micros: ["expo_modele_choisir", "expo_ordre_grandeur", "expo_modele_reconnaitre"],
        },
      ],
    },
  ],
};
