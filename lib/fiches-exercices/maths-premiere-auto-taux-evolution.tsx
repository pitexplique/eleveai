// ─── Fiche d'exercices : le taux d'évolution (1re, automatismes) ──────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur le modèle de l'étalon
// `maths-premiere-auto-comparer.tsx`, et suite de la feuille « Coefficient
// multiplicateur ». Première partie de l'épreuve anticipée, SANS CALCULATRICE.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/evolutions.bank.ts`.
// L'exercice 6 est celui du sujet de Métropole de juin 2026 (« son prix diminue
// de 10 % puis augmente de 10 % »).
//
// ⭐⭐ LE FIL : LES TAUX NE S'ADDITIONNENT PAS, LES COEFFICIENTS SE MULTIPLIENT.
// Trois pièges, nommés à chaque fois : diviser par la valeur d'ARRIVÉE au lieu
// du départ (1, 9) ; additionner les taux (4, 5, 11, 12, 19, 20) ; croire que
// −t % se répare par +t % (6, 7, 13, 14, 16, 18, 20). Et un quatrième, cher
// aux journaux : « points » contre « pour cent » (10).
//
// ⭐ Frédéric, 28/09 : lien GRAPHIQUE (diagrammes, courbes, tableaux avant/après
// avec le coefficient) et lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (chiffre
// d'affaires, chômage, pouvoir d'achat, soldes, bourse, reconstruction d'après
// guerre, prix du blé, trafic aérien, démographie, loyer, forêt). Les chiffres
// sont des MODÈLES arrondis, jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-taux-evolution.mjs`.
//
// Micro-compétences : auto_evo_calculer_taux (1, 2, 3, 9, 10, 13, 16, 17, 19,
// 20), auto_evo_successives (4, 5, 6, 9, 11, 12, 14, 17, 18, 19, 20),
// auto_evo_reciproque (7, 8, 13, 15, 16, 17, 18, 20),
// auto_evo_piege_compensation (6, 14, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoTauxEvolutionPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-taux-evolution",
  titre: "Taux d'évolution",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer un taux d'évolution, enchaîner deux hausses ou une hausse et une baisse, trouver l'évolution qui ramène au départ. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Taux d'évolution $= \\dfrac{\\text{arrivée} - \\text{départ}}{\\text{départ}}$, écrit en pourcentage. S'il est négatif, c'est une baisse.",
        "Autre chemin : coefficient $= \\dfrac{\\text{arrivée}}{\\text{départ}}$, puis taux $=$ coefficient $- 1$.",
        "Évolutions successives : on MULTIPLIE les coefficients. Les taux ne s'additionnent pas.",
        "Pour annuler une évolution de coefficient $k$, on multiplie par $\\dfrac{1}{k}$ : c'est l'évolution réciproque.",
      ],
      exercices: [
        {
          enonce: "Un prix passe de $40$ € à $50$ €. Calculer le taux d'évolution.",
          correction:
            "Taux $= \\dfrac{50 - 40}{40} = \\dfrac{10}{40} = 0{,}25$, soit $+25$ %.\nOn divise par la valeur de DÉPART, $40$.\n⚠️ Diviser par $50$ donnerait $\\dfrac{10}{50} = 0{,}2$, soit $20$ % : c'est l'erreur la plus fréquente.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "départ", value: 40 },
              { label: "arrivée (× 1,25)", value: 50 },
            ]),
          ),
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce: "Une population passe de $250$ à $200$ habitants. Calculer le taux d'évolution.",
          correction:
            "Taux $= \\dfrac{200 - 250}{250} = \\dfrac{-50}{250} = -0{,}2$, soit $-20$ %.\nLe taux est négatif : c'est une baisse de $20$ %.\n⚠️ On écrit toujours « arrivée moins départ » : c'est cet ordre qui donne le bon signe.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce: "Un loyer passe de $800$ € à $1\\,200$ €. Calculer le coefficient multiplicateur, puis le taux d'évolution.",
          correction:
            "Coefficient : $\\dfrac{1\\,200}{800} = \\dfrac{12}{8} = 1{,}5$.\nTaux : $1{,}5 - 1 = 0{,}5$, soit $+50$ %.\n⭐ Les deux chemins, l'écart divisé par le départ ou le coefficient moins $1$, donnent le même taux : $\\dfrac{1\\,200 - 800}{800} = 0{,}5$.",
          micros: ["auto_evo_calculer_taux"],
        },
        {
          enonce: "Un prix augmente de $10$ %, puis de $20$ %. Quel est le taux d'évolution global ?",
          correction:
            "Coefficients : $1{,}1$ puis $1{,}2$.\nCoefficient global : $1{,}1 \\times 1{,}2 = 1{,}32$.\nTaux global : $1{,}32 - 1 = 0{,}32$, soit $+32$ %.\n⚠️ Pas $+30$ % : la deuxième hausse s'applique à un prix déjà augmenté.",
          schema: ecranSeulement(tableau(["étape", "départ", "× 1,1", "× 1,2"], ["prix (€)", 100, 110, 132])),
          micros: ["auto_evo_successives"],
        },
        {
          enonce: "Une quantité augmente de $50$ %, puis diminue de $20$ %. Quel est le taux d'évolution global ?",
          correction:
            "Coefficients : $1{,}5$ puis $0{,}8$.\nCoefficient global : $1{,}5 \\times 0{,}8 = 1{,}2$. Taux global : $+20$ %.\n⚠️ Pas $+30$ % ($50 - 20$) : les taux ne s'additionnent pas, les coefficients se multiplient.",
          micros: ["auto_evo_successives"],
        },
        {
          enonce: "Un article coûte $50$ €. Son prix diminue de $10$ %, puis augmente de $10$ %. Quel est son prix final ?",
          correction:
            "$50 \\times 0{,}9 = 45$ €, puis $45 \\times 1{,}1 = 49{,}5$ €.\nEn un seul calcul : $0{,}9 \\times 1{,}1 = 0{,}99$, et $50 \\times 0{,}99 = 49{,}5$.\nLe prix final est $49{,}50$ € : on ne revient PAS à $50$ €.\n⚠️ La hausse de $10$ % porte sur $45$ €, plus petit que $50$ € : elle rapporte $4{,}50$ €, moins que les $5$ € perdus.\n⭐ C'est une question du sujet de Métropole, juin 2026.",
          schema: diagramme("barres", [
            { label: "départ", value: 50 },
            { label: "× 0,9", value: 45 },
            { label: "puis × 1,1", value: 49.5 },
          ]),
          micros: ["auto_evo_piege_compensation", "auto_evo_successives"],
        },
        {
          enonce: "Un prix a augmenté de $25$ %. Par quel nombre faut-il le multiplier pour revenir au prix de départ ? Quelle baisse cela représente-t-il ?",
          correction:
            "La hausse a multiplié par $1{,}25$. Pour l'annuler : $\\dfrac{1}{1{,}25} = \\dfrac{100}{125} = 0{,}8$.\n$0{,}8 = 1 - 0{,}2$ : une baisse de $20$ %.\nVérification sur $100$ € : $100 \\times 1{,}25 = 125$, puis $125 \\times 0{,}8 = 100$. ✔️\n⚠️ Pas $-25$ % : $125 \\times 0{,}75 = 93{,}75$.",
          micros: ["auto_evo_reciproque"],
        },
        {
          enonce: "a) Un prix a doublé. De quel pourcentage doit-il baisser pour revenir à sa valeur de départ ?\nb) Un prix a baissé de $50$ %. De quel pourcentage doit-il augmenter pour revenir ?",
          correction:
            "a) Doubler, c'est multiplier par $2$. Pour revenir, on multiplie par $\\dfrac{1}{2} = 0{,}5$ : une baisse de $50$ %.\nb) $-50$ %, c'est multiplier par $0{,}5$. Pour revenir, on multiplie par $\\dfrac{1}{0{,}5} = 2$ : une hausse de $100$ %.\n⚠️ En a), baisser de $100$ % donnerait un prix nul : on ne peut pas perdre plus que tout.",
          micros: ["auto_evo_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire les données, écrire les coefficients, conclure par une phrase. Sans calculatrice.",
      rappel: [
        "On lit les deux valeurs, avec leur unité. La valeur de départ est la plus ANCIENNE.",
        "Taux global : on multiplie les coefficients, puis on retire $1$.",
        "Pour effacer une baisse de $t$ %, il faut une hausse PLUS forte que $t$ %.",
      ],
      exercices: [
        {
          titre: "Une boulangerie qui grandit",
          enonce:
            "Le diagramme donne le chiffre d'affaires d'une boulangerie, en milliers d'euros (chiffres d'un modèle).\na) Calculer le taux d'évolution de 2021 à 2022.\nb) Calculer le taux d'évolution de 2022 à 2023.\nc) Calculer le taux d'évolution de 2021 à 2023, de deux façons.",
          figure: diagramme("barres", [
            { label: "2021", value: 200 },
            { label: "2022", value: 240 },
            { label: "2023", value: 300 },
          ]),
          correction:
            "a) $\\dfrac{240 - 200}{200} = \\dfrac{40}{200} = 0{,}2$ : $+20$ %.\nb) $\\dfrac{300 - 240}{240} = \\dfrac{60}{240} = 0{,}25$ : $+25$ %.\nc) Directement : $\\dfrac{300 - 200}{200} = 0{,}5$ : $+50$ %.\nAvec les coefficients : $1{,}2 \\times 1{,}25 = 1{,}5$. On retrouve $+50$ %. ✔️\n⚠️ $+20$ % puis $+25$ % ne font pas $+45$ % : ils font $+50$ %.",
          micros: ["auto_evo_calculer_taux", "auto_evo_successives"],
        },
        {
          titre: "Le chômage : points ou pour cent ?",
          enonce:
            "Le tableau donne le taux de chômage d'un pays, en pourcentage de la population active (chiffres d'un modèle).\na) De combien de points le taux de chômage a-t-il baissé ?\nb) Quel est le taux d'évolution du taux de chômage ?",
          figure: tableau(["année", "2015", "2025"], ["taux de chômage (%)", 10, 8]),
          correction:
            "a) $10 - 8 = 2$ : le taux de chômage a baissé de $2$ POINTS.\nb) $\\dfrac{8 - 10}{10} = -0{,}2$ : le taux de chômage a baissé de $20$ %.\n⭐ Deux façons de dire la même chose. Les points : la différence de deux pourcentages. Le pourcentage : le taux d'évolution.\n⚠️ Un journal qui écrit « le chômage a baissé de $2$ % » se trompe : c'est $2$ points, ou $20$ %.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "2015", value: 10 },
              { label: "2025 (× 0,8)", value: 8 },
            ]),
          ),
          micros: ["auto_evo_calculer_taux"],
        },
        {
          titre: "Le salaire et les prix",
          enonce:
            "Pendant deux ans, les prix augmentent de $5$ %, puis de $2$ % (chiffres d'un modèle). Un salaire augmente de $7$ % sur les mêmes deux ans.\na) Quel est le taux d'évolution global des prix ?\nb) Le pouvoir d'achat de ce salarié a-t-il augmenté ?",
          correction:
            "a) $1{,}05 \\times 1{,}02 = 1{,}05 + 0{,}021 = 1{,}071$ : les prix ont augmenté de $7{,}1$ %.\nb) Le salaire est multiplié par $1{,}07$, les prix par $1{,}071$ : les prix ont monté un tout petit peu plus vite. Le pouvoir d'achat a très légèrement BAISSÉ.\n⚠️ Additionner $5$ et $2$ donnait $7$ %, et faisait croire que tout se compensait : c'est l'erreur d'additionner les taux.",
          schema: diagramme("barres", [
            { label: "prix (base 1 000)", value: 1071 },
            { label: "salaire (base 1 000)", value: 1070 },
          ]),
          micros: ["auto_evo_successives"],
        },
        {
          titre: "Les soldes en deux temps",
          enonce:
            "Un manteau coûte $200$ €. Il est soldé à $-30$ %, puis, la dernière semaine, une remise de $-20$ % s'ajoute sur le prix soldé.\na) Quel est le prix final ?\nb) Quel est le taux de remise global ? Est-ce $-50$ % ?",
          correction:
            "a) $200 \\times 0{,}7 = 140$ €, puis $140 \\times 0{,}8 = 112$ €.\nb) Coefficient global : $0{,}7 \\times 0{,}8 = 0{,}56$. Taux : $0{,}56 - 1 = -0{,}44$, soit $-44$ %.\nCe n'est pas $-50$ % : à $-50$ %, le manteau coûterait $100$ €, pas $112$ €.\n⚠️ La seconde remise porte sur $140$ €, pas sur $200$ €.",
          schema: tableau(["étape", "départ", "× 0,7", "× 0,8"], ["prix (€)", 200, 140, 112]),
          micros: ["auto_evo_successives"],
        },
        {
          titre: "Une action en bourse",
          enonce:
            "La courbe donne le cours d'une action, en euros, jour après jour (chiffres d'un modèle).\na) Lire le cours aux jours $1$ et $2$. Calculer le taux d'évolution.\nb) De quel pourcentage le cours doit-il remonter pour revenir à sa valeur du jour $1$ ?\nc) Vérifier avec le jour $4$.",
          figure: repere([-1, 5, -1, 13], [{ pts: [[0, 10], [1, 10], [2, 8], [3, 8], [4, 10]] }], [
            { x: 1, y: 10, label: "J1" },
            { x: 2, y: 8, label: "J2" },
          ]),
          correction:
            "a) Jour $1$ : $10$ €. Jour $2$ : $8$ €. Taux : $\\dfrac{8 - 10}{10} = -0{,}2$, soit $-20$ %.\nb) La baisse a multiplié par $0{,}8$. Pour l'annuler : $\\dfrac{1}{0{,}8} = \\dfrac{10}{8} = 1{,}25$, soit $+25$ %.\nc) Au jour $4$, on lit $10$ € : $8 \\times 1{,}25 = 10$. ✔️ Entre les jours $3$ et $4$, le cours a bien pris $25$ %.\n⚠️ Après $-20$ %, il faut $+25$ % pour revenir : la remontée part d'un nombre plus petit.",
          schema: repere([-1, 5, -1, 13], [{ pts: [[0, 10], [1, 10], [2, 8], [3, 8], [4, 10]] }], [
            { x: 2, y: 8, label: "−20 %" },
            { x: 4, y: 10, label: "+25 %" },
          ], 10),
          micros: ["auto_evo_calculer_taux", "auto_evo_reciproque"],
        },
        {
          titre: "Une ville détruite, puis reconstruite",
          enonce:
            "Pendant une guerre, une ville perd $20$ % de ses habitants ; pendant la reconstruction, sa population augmente de $20$ % (chiffres d'un modèle). Elle comptait $50\\,000$ habitants avant la guerre.\na) Combien d'habitants compte-t-elle après la reconstruction ?\nb) Quel est le taux d'évolution global ?",
          correction:
            "a) $50\\,000 \\times 0{,}8 = 40\\,000$, puis $40\\,000 \\times 1{,}2 = 48\\,000$ habitants.\nb) $0{,}8 \\times 1{,}2 = 0{,}96$ : taux global $-4$ %.\n⚠️ $-20$ % puis $+20$ % ne ramène pas au départ : les $20$ % de la reconstruction portent sur $40\\,000$ habitants, pas sur $50\\,000$.\n⭐ Pour revenir à $50\\,000$, il aurait fallu $+25$ % : $40\\,000 \\times 1{,}25 = 50\\,000$.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "avant (milliers)", value: 50 },
              { label: "× 0,8", value: 40 },
              { label: "puis × 1,2", value: 48 },
            ]),
          ),
          micros: ["auto_evo_piege_compensation", "auto_evo_successives"],
        },
        {
          titre: "Le prix du blé",
          enonce:
            "Pendant une crise, le prix du blé augmente de $60$ % (chiffres d'un modèle). De quel pourcentage doit-il baisser pour revenir à son prix d'avant la crise ?",
          correction:
            "La hausse multiplie par $1{,}6$. Pour l'annuler, on multiplie par $\\dfrac{1}{1{,}6} = \\dfrac{10}{16} = \\dfrac{5}{8} = 0{,}625$.\n$0{,}625 = 1 - 0{,}375$ : une baisse de $37{,}5$ %.\nVérification avec $200$ € la tonne : $200 \\times 1{,}6 = 320$, puis $320 \\times 0{,}625 = 200$. ✔️\n⚠️ Une baisse de $60$ % ferait tomber le prix à $320 \\times 0{,}4 = 128$ € : bien en dessous du prix de départ.",
          schema: tableau(["étape", "avant", "crise × 1,6", "retour × 0,625"], ["prix (€ la tonne)", 200, 320, 200]),
          micros: ["auto_evo_reciproque"],
        },
        {
          titre: "Un aéroport pendant la crise",
          enonce:
            "La courbe donne le nombre de passagers d'un aéroport, en millions (chiffres d'un modèle). L'abscisse $0$ correspond à 2018, $1$ à 2019, et ainsi de suite.\na) Calculer le taux d'évolution entre 2019 et 2020.\nb) Calculer le taux d'évolution entre 2020 et 2023.\nc) Expliquer pourquoi ces deux taux, si différents, se « compensent ».",
          figure: repere([-1, 6, -1, 14], [{ pts: [[0, 10], [1, 12], [2, 3], [3, 6], [4, 9], [5, 12]] }], [
            { x: 1, y: 12, label: "2019" },
            { x: 2, y: 3, label: "2020" },
          ]),
          correction:
            "a) 2019 : $12$ millions ; 2020 : $3$ millions. $\\dfrac{3 - 12}{12} = -0{,}75$ : $-75$ %.\nb) 2023 : $12$ millions. $\\dfrac{12 - 3}{3} = 3$ : $+300$ %.\nc) Coefficients : $0{,}25$ puis $4$. Et $0{,}25 \\times 4 = 1$ : le trafic est revenu exactement à son niveau de 2019.\n⭐ $4$ est l'inverse de $0{,}25$ : $+300$ % est l'évolution réciproque de $-75$ %.\n⚠️ Après une chute de $75$ %, il ne suffit pas de $+75$ % pour revenir : il faut $+300$ %.",
          schema: repere([-1, 6, -1, 14], [{ pts: [[0, 10], [1, 12], [2, 3], [3, 6], [4, 9], [5, 12]] }], [
            { x: 2, y: 3, label: "× 0,25" },
            { x: 5, y: 12, label: "× 4" },
          ], 12),
          micros: ["auto_evo_calculer_taux", "auto_evo_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "Plusieurs évolutions : on écrit chaque coefficient, on les multiplie, puis on retire $1$ pour lire le taux global.",
        "Pour revenir au départ, on multiplie par l'INVERSE du coefficient.",
        "On conclut par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Deux villes, deux destins",
          enonce:
            "Le diagramme donne la population de deux villes, en milliers d'habitants (chiffres d'un modèle).\na) Calculer le taux d'évolution de chaque ville entre 2000 et 2020.\nb) Si ces taux se répètent de 2020 à 2040, quelle sera la population de chaque ville en 2040 ?\nc) Pour la ville $A$, quel serait alors le taux global de 2000 à 2040 ?\nd) Quel taux faudrait-il à la ville $B$ entre 2020 et 2040 pour retrouver ses $60\\,000$ habitants ?",
          figure: diagramme("barres", [
            { label: "A 2000", value: 40 },
            { label: "A 2020", value: 50 },
            { label: "B 2000", value: 60 },
            { label: "B 2020", value: 54 },
          ]),
          correction:
            "a) $A$ : $\\dfrac{50 - 40}{40} = 0{,}25$, soit $+25$ %. $B$ : $\\dfrac{54 - 60}{60} = -0{,}1$, soit $-10$ %.\nb) $A$ : $50 \\times 1{,}25 = 62{,}5$ milliers. $B$ : $54 \\times 0{,}9 = 48{,}6$ milliers.\nc) $1{,}25 \\times 1{,}25 = 1{,}5625$ : $+56{,}25$ % en quarante ans, et non $+50$ %.\nd) Il faut multiplier par $\\dfrac{60}{54} = \\dfrac{10}{9}$, l'inverse de $0{,}9$. Or $\\dfrac{10}{9}$ vaut environ $1{,}11$ : une hausse d'environ $11$ %.\n⚠️ Pour effacer $-10$ %, $+10$ % ne suffit pas : $54 \\times 1{,}1 = 59{,}4$ milliers.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "A 2040", value: 62.5 },
              { label: "B 2040", value: 48.6 },
            ]),
          ),
          micros: ["auto_evo_calculer_taux", "auto_evo_successives", "auto_evo_reciproque"],
        },
        {
          titre: "La crise et la reprise",
          enonce:
            "Pendant une crise, la production d'une usine baisse de $40$ % ; l'année suivante, elle augmente de $40$ % (chiffres d'un modèle). Au départ, l'usine produit $1\\,000$ voitures par mois.\na) Combien de voitures produit-elle après ces deux années ?\nb) Quel est le taux d'évolution global ?\nc) Quelle hausse aurait-il fallu la deuxième année pour revenir à $1\\,000$ voitures ?",
          correction:
            "a) $1\\,000 \\times 0{,}6 = 600$, puis $600 \\times 1{,}4 = 840$ voitures.\nb) $0{,}6 \\times 1{,}4 = 0{,}84$ : taux global $-16$ %.\nc) Il faut multiplier par $\\dfrac{1}{0{,}6} = \\dfrac{10}{6} = \\dfrac{5}{3}$, qui vaut environ $1{,}667$ : une hausse d'environ $66{,}7$ %.\nVérification : $600 \\times \\dfrac{5}{3} = 1\\,000$. ✔️\n⚠️ Plus la chute est forte, plus la remontée nécessaire est grande : $-40$ % demande environ $+67$ %, et $-75$ % demande $+300$ %.",
          schema: diagramme("barres", [
            { label: "départ", value: 1000 },
            { label: "× 0,6", value: 600 },
            { label: "puis × 1,4", value: 840 },
          ]),
          micros: ["auto_evo_piege_compensation", "auto_evo_successives", "auto_evo_reciproque"],
        },
        {
          titre: "Un loyer qui grimpe",
          enonce:
            "Un loyer de $500$ € augmente de $10$ % par an pendant trois ans (chiffres d'un modèle).\na) Quel est le coefficient global ? le taux global ?\nb) Quel est le loyer au bout de trois ans ?\nc) Le locataire pensait : « $10$ % trois fois, c'est $30$ %. » Combien paie-t-il de plus, chaque mois, que ce qu'il croyait ?",
          correction:
            "a) $1{,}1 \\times 1{,}1 = 1{,}21$, puis $1{,}21 \\times 1{,}1 = 1{,}331$. Taux global : $+33{,}1$ %.\nb) $500 \\times 1{,}331 = 665{,}5$ : le loyer est de $665{,}50$ €.\nc) Il croyait payer $500 \\times 1{,}3 = 650$ €. L'écart : $665{,}5 - 650 = 15{,}5$, soit $15{,}50$ € par mois.\n⭐ Chaque hausse porte sur le loyer DÉJÀ augmenté : l'effet boule de neige, celui des intérêts composés.",
          schema: ecranSeulement(
            diagramme("batons", [
              { label: "départ", value: 500 },
              { label: "an 1", value: 550 },
              { label: "an 2", value: 605 },
              { label: "an 3", value: 665.5 },
            ]),
          ),
          micros: ["auto_evo_successives", "auto_evo_calculer_taux"],
        },
        {
          titre: "Une forêt qui recule",
          enonce:
            "La courbe donne la surface d'une forêt, en milliers d'hectares, à trois dates espacées de dix ans : abscisses $0$, $1$ et $2$ (chiffres d'un modèle).\na) Calculer le taux d'évolution de chaque décennie.\nb) En déduire le taux global sur vingt ans. Est-ce $-57{,}5$ % ?\nc) Un plan de reboisement promet $+50$ %. La forêt retrouvera-t-elle sa surface de départ ? Sinon, quel taux faudrait-il ?",
          figure: repere([-1, 4, -1, 13], [{ pts: [[0, 10], [1, 8], [2, 5]] }]),
          correction:
            "a) Première décennie : $\\dfrac{8 - 10}{10} = -0{,}2$, soit $-20$ %. Seconde : $\\dfrac{5 - 8}{8} = -\\dfrac{3}{8} = -0{,}375$, soit $-37{,}5$ %.\nb) $0{,}8 \\times 0{,}625 = 0{,}5$ : taux global $-50$ %. Pas $-57{,}5$ % : on ne fait pas la somme des taux.\n✔️ Sur le dessin : de $10$ à $5$, la forêt a bien perdu la moitié.\nc) $5 \\times 1{,}5 = 7{,}5$ milliers d'hectares : non, loin des $10$.\nPour revenir, il faut multiplier par $\\dfrac{1}{0{,}5} = 2$ : une hausse de $100$ %.\n⚠️ Après avoir perdu la moitié, il faut DOUBLER pour revenir : $-50$ % se répare par $+100$ %, pas par $+50$ %.",
          schema: repere([-1, 4, -1, 13], [{ pts: [[0, 10], [1, 8], [2, 5]] }, { pts: [[2, 5], [3, 7.5]], couleur: ORANGE }], [
            { x: 3, y: 7.5, label: "+50 %" },
          ], 10),
          micros: ["auto_evo_calculer_taux", "auto_evo_successives", "auto_evo_reciproque", "auto_evo_piege_compensation"],
        },
      ],
    },
  ],
};
