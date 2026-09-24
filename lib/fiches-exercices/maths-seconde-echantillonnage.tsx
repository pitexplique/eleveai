// ─── Fiche d'exercices : échantillonnage et simulation (seconde) ─────────────
//
// Dixième et DERNIÈRE feuille du lot de seconde (24/09/2026), sans fiche de
// cours. Alignée sur la banque
// `lib/tutor-v4/questionBank/seconde/maths/echantillonnage.bank.ts` (notionId
// echantillonnage_simulation) et sur SA convention : pour une expérience à deux
// issues de probabilité p, la fréquence f d'un échantillon de taille n vérifie
// le plus souvent |f − p| ≤ 1/√n (environ 95 % des échantillons, pour n ≥ 25 et
// p entre 0,2 et 0,8).
//
// ⭐ LE FIL : un échantillon FLUCTUE ; plus il est grand, moins il fluctue (la
// largeur de l'intervalle est en 1/√n : quatre fois plus de monde pour deux
// fois plus de précision) ; et une fréquence hors de l'intervalle ne PROUVE
// rien, elle fait DOUTER.
// ⛔ LES PIÈGES : croire qu'un échantillon donne la probabilité exacte ; croire
// qu'une fréquence hors intervalle est impossible ; oublier qu'un petit
// échantillon s'écarte plus souvent (l'hôpital, exercice 16).
// ⭐ LES SCHÉMAS : fréquences en barres, intervalle de fluctuation sur une droite
// graduée, programmes de simulation (exécutés par le vérificateur).
// ⭐ LES TIRAGES AFFICHÉS SONT DE VRAIS TIRAGES : Python, graine 2026, refaits
// par le script de recalcul (exercices 11, 12, 13, 19).
//
// ⭐ LE MONDE : un sondage à 48 / 52 (la marge d'erreur, voir la vidéo de la
// chaîne sur les sondages), les naissances de garçons (environ 105 garçons pour
// 100 filles en France, soit 51 %), π estimé par des points au hasard, et la
// population de truites d'un lac comptée par capture-recapture.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-echantillonnage.mjs`.
//
// Micro-compétences : echantillon_fluctuation (1, 3, 4, 9, 10, 12, 13, 14, 16,
// 17, 18), echantillon_loi_grands_nombres (2, 8, 12, 19, 20),
// simulation_frequence (7, 11, 15, 19), echantillon_interpreter (5, 6, 10, 13,
// 14, 16, 17, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, intervalles, programme, tableauProba, trace } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb", VERT = "#16a34a", ORANGE = "#ea580c";

export const exercicesEchantillonnageSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "echantillonnage-simulation",
  titre: "Échantillonnage et simulation",
  accroche:
    "Vingt exercices, du geste seul au problème : voir un échantillon fluctuer, calculer l'intervalle où tombe le plus souvent sa fréquence, décider si un résultat est surprenant, simuler au hasard avec Python, estimer une probabilité inconnue. Un sondage à 48 contre 52, les naissances de garçons, le nombre π trouvé en jetant des points au hasard, les truites d'un lac comptées sans les pêcher toutes. De vrais tirages, des barres et des intervalles dans les corrigés. Un rappel de cours avant chaque niveau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : calculer une fréquence, l'intervalle, et comparer.",
      rappel: [
        "Un ÉCHANTILLON de taille $n$ : $n$ répétitions d'une même expérience. Sa fréquence $f$ change d'un échantillon à l'autre : c'est la FLUCTUATION d'échantillonnage.",
        "Plus $n$ est grand, plus $f$ se rapproche de la probabilité $p$ : c'est la loi des grands nombres.",
        "Pour une expérience à deux issues, le plus souvent (dans environ $95$ % des échantillons, si $n \\geqslant 25$ et $p$ entre $0{,}2$ et $0{,}8$) : $p - \\dfrac{1}{\\sqrt{n}} \\leqslant f \\leqslant p + \\dfrac{1}{\\sqrt{n}}$.",
      ],
      exercices: [
        {
          enonce: "Cinq groupes d'élèves lancent chacun $20$ fois une pièce équilibrée. Ils obtiennent $9$, $12$, $8$, $11$ et $10$ fois pile.\na) Calculer la fréquence de pile de chaque groupe.\nb) Pourquoi ne trouvent-ils pas tous $0{,}5$ ?",
          correction:
            "a) On divise par $20$ : $\\dfrac{9}{20} = 0{,}45$ ; $0{,}6$ ; $0{,}4$ ; $0{,}55$ ; $0{,}5$.\nb) Chaque groupe a lancé SA série de $20$ lancers, au hasard : les résultats varient d'une série à l'autre. C'est la fluctuation d'échantillonnage. Personne ne s'est trompé.\n⭐ Les fréquences se répartissent autour de $0{,}5$, la probabilité, sans jamais la « viser » exactement.",
          schema: diagramme("barres", [{ label: "G1", value: 0.45 }, { label: "G2", value: 0.6 }, { label: "G3", value: 0.4 }, { label: "G4", value: 0.55 }, { label: "G5", value: 0.5 }]),
          micros: ["echantillon_fluctuation"],
        },
        {
          enonce: "On lance un dé équilibré et on note la fréquence du $6$. Sur $10$ lancers, on trouve $0{,}1$ ; sur $100$ lancers, $0{,}19$ ; sur $10\\,000$ lancers, $0{,}1646$.\na) Quelle est la probabilité d'obtenir $6$ ?\nb) Laquelle des trois fréquences est la meilleure estimation de cette probabilité ? Pourquoi ?",
          correction:
            "a) Le dé est équilibré : $P(6) = \\dfrac{1}{6} \\approx 0{,}1667$.\nb) Celle des $10\\,000$ lancers, $0{,}1646$ : d'après la loi des grands nombres, plus l'échantillon est grand, plus la fréquence se rapproche de la probabilité.\n⭐ Sur $10$ lancers, obtenir $0{,}1$ ou $0{,}3$ n'a rien d'anormal : un petit échantillon fluctue beaucoup.",
          schema: diagramme("barres", [{ label: "10 lancers", value: 0.1 }, { label: "100", value: 0.19 }, { label: "10 000", value: 0.1646 }, { label: "Proba 1/6", value: 0.167 }], 3),
          micros: ["echantillon_loi_grands_nombres"],
        },
        {
          enonce: "On lance $100$ fois une pièce équilibrée ($p = 0{,}5$). Calculer l'intervalle $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;\\,p + \\dfrac{1}{\\sqrt{n}}\\right]$ et dire ce qu'il signifie.",
          correction:
            "$n = 100$, donc $\\dfrac{1}{\\sqrt{100}} = \\dfrac{1}{10} = 0{,}1$.\nL'intervalle est $[0{,}5 - 0{,}1\\,;\\,0{,}5 + 0{,}1] = [0{,}4\\,;\\,0{,}6]$.\nDans environ $95$ % des séries de $100$ lancers, la fréquence de pile est entre $0{,}4$ et $0{,}6$, soit entre $40$ et $60$ piles.\n⛔ Le piège : croire que la fréquence y est TOUJOURS. Environ une série sur vingt en sort.",
          schema: intervalles(0, 1, [{ de: 0.4, a: 0.6, deInclus: true, aInclus: true, label: "95 % des séries", color: BLEU }], 0.2),
          micros: ["echantillon_fluctuation"],
        },
        {
          enonce: "Dans une ville, $30$ % des habitants font du vélo. On interroge $400$ habitants au hasard. Entre quelles fréquences doit se trouver, le plus souvent, la proportion de cyclistes de l'échantillon ?",
          correction:
            "$p = 0{,}3$ et $n = 400$ : $\\dfrac{1}{\\sqrt{400}} = \\dfrac{1}{20} = 0{,}05$.\nL'intervalle est $[0{,}3 - 0{,}05\\,;\\,0{,}3 + 0{,}05] = [0{,}25\\,;\\,0{,}35]$ : le plus souvent, entre $25$ % et $35$ % de cyclistes, soit entre $100$ et $140$ personnes sur $400$.\n⛔ Le piège : calculer $\\dfrac{1}{400}$ au lieu de $\\dfrac{1}{\\sqrt{400}}$. La largeur varie comme l'INVERSE DE LA RACINE de $n$.",
          schema: intervalles(0, 1, [{ de: 0.25, a: 0.35, deInclus: true, aInclus: true, label: "de 25 % à 35 %", color: BLEU }], 0.2),
          micros: ["echantillon_fluctuation"],
        },
        {
          enonce: "Léo lance $100$ fois une pièce et obtient $58$ fois pile. Ce résultat est-il compatible avec une pièce équilibrée ?",
          correction:
            "Sa fréquence : $f = \\dfrac{58}{100} = 0{,}58$.\nPour une pièce équilibrée, l'intervalle est $[0{,}4\\,;\\,0{,}6]$ (exercice 3). $0{,}58$ est DEDANS.\nLe résultat est compatible avec une pièce équilibrée : rien ne permet de la soupçonner.\n⭐ « Compatible » ne veut pas dire « prouvé équilibrée » : une pièce légèrement truquée aurait pu donner le même résultat.",
          schema: intervalles(0, 1, [{ de: 0.4, a: 0.6, deInclus: true, aInclus: true, label: "intervalle", color: BLEU }], 0.2, [{ value: 0.58, label: "f = 0,58", color: VERT }]),
          micros: ["echantillon_interpreter"],
        },
        {
          enonce: "Inès lance $100$ fois une pièce et obtient $67$ fois pile. Que peut-on en penser ?",
          correction:
            "$f = 0{,}67$, et $0{,}67 > 0{,}6$ : la fréquence est HORS de l'intervalle $[0{,}4\\,;\\,0{,}6]$.\nAvec une pièce équilibrée, cela n'arrive que dans environ $5$ % des séries. On a donc de bonnes raisons de DOUTER que la pièce soit équilibrée.\n⛔ Le piège : conclure « la pièce est truquée, c'est sûr ». Un résultat rare n'est pas impossible : on doute, on ne prouve pas. On pourrait relancer une série plus longue.",
          schema: intervalles(0, 1, [{ de: 0.4, a: 0.6, deInclus: true, aInclus: true, label: "intervalle", color: BLEU }], 0.2, [{ value: 0.67, label: "f = 0,67", color: ORANGE }]),
          micros: ["echantillon_interpreter"],
        },
        {
          enonce: "Que calcule ce programme ? Que renvoie, à peu près, l'appel « pile(1000) » ?",
          figure: programme(["from random import random", "", "def pile(n):", "    p = 0", "    for i in range(n):", "        if random() < 0.5:", "            p = p + 1", "    return p / n"]),
          correction:
            "« random() » donne un nombre au hasard entre $0$ et $1$ ; il est inférieur à $0{,}5$ une fois sur deux : c'est un lancer de pièce, « pile » quand le nombre est sous $0{,}5$.\nLa boucle fait $n$ lancers et compte les piles ; la fonction renvoie la FRÉQUENCE de pile sur $n$ lancers.\n« pile(1000) » renvoie une fréquence proche de $0{,}5$ : le plus souvent entre $0{,}5 - \\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}468$ et $0{,}532$.\n⭐ Changer « 0.5 » en « 0.3 » simulerait une expérience de probabilité $0{,}3$.",
          schema: intervalles(0, 1, [{ de: 0.468, a: 0.532, deInclus: true, aInclus: true, label: "le plus souvent", color: BLEU }], 0.2),
          micros: ["simulation_frequence"],
        },
        {
          enonce: "Une punaise peut tomber pointe en l'air ou sur le côté. Personne ne connaît la probabilité de « pointe en l'air ». On la lance $1\\,000$ fois : elle tombe $382$ fois pointe en l'air.\na) Estimer cette probabilité.\nb) Comment obtenir une meilleure estimation ?",
          correction:
            "a) On ne peut pas la calculer, mais la loi des grands nombres permet de l'ESTIMER par la fréquence : $\\dfrac{382}{1\\,000} = 0{,}382$, soit environ $0{,}38$.\nb) En lançant la punaise beaucoup plus de fois : la fréquence se rapproche de la probabilité quand $n$ grandit.\n⭐ C'est la seule façon de connaître une probabilité qu'aucun calcul ne donne : une punaise n'est pas un dé symétrique.",
          schema: diagramme("barres", [{ label: "Pointe en l'air", value: 382 }, { label: "Sur le côté", value: 618 }]),
          micros: ["echantillon_loi_grands_nombres"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : calculer l'intervalle, situer la fréquence, conclure prudemment.",
      rappel: [
        "La largeur de l'intervalle, $\\dfrac{2}{\\sqrt{n}}$, diminue quand $n$ augmente : quatre fois plus d'individus pour une largeur divisée par deux.",
        "Fréquence DANS l'intervalle : le résultat est compatible avec $p$. Fréquence HORS de l'intervalle : on doute de $p$ (avec un risque d'environ $5$ % de se tromper).",
        "Une simulation remplace une expérience réelle trop longue : on la programme, on la répète, on observe les fréquences.",
      ],
      exercices: [
        {
          enonce: "Pour $p = 0{,}5$, calculer l'intervalle de fluctuation pour $n = 25$, $n = 100$ et $n = 2\\,500$. Que remarque-t-on ?",
          correction:
            "$n = 25$ : $\\dfrac{1}{\\sqrt{25}} = 0{,}2$, intervalle $[0{,}3\\,;\\,0{,}7]$.\n$n = 100$ : $\\dfrac{1}{10} = 0{,}1$, intervalle $[0{,}4\\,;\\,0{,}6]$.\n$n = 2\\,500$ : $\\dfrac{1}{50} = 0{,}02$, intervalle $[0{,}48\\,;\\,0{,}52]$.\nPlus l'échantillon est grand, plus l'intervalle est étroit : la fréquence fluctue moins.\n⭐ De $25$ à $100$, on multiplie $n$ par $4$ et la largeur est divisée par $2$ : la précision coûte cher.",
          schema: intervalles(0, 1, [{ de: 0.3, a: 0.7, deInclus: true, aInclus: true, label: "n = 25", color: ORANGE }, { de: 0.4, a: 0.6, deInclus: true, aInclus: true, label: "n = 100", color: BLEU }, { de: 0.48, a: 0.52, deInclus: true, aInclus: true, label: "n = 2 500", color: VERT }], 0.2),
          micros: ["echantillon_fluctuation"],
        },
        {
          enonce: "Avant une élection à deux candidats, un sondage auprès de $1\\,000$ personnes tirées au hasard donne $52$ % pour le candidat A. Le journal titre : « A va gagner ». On suppose que les deux candidats sont en réalité à égalité ($p = 0{,}5$).\na) Calculer l'intervalle de fluctuation pour $n = 1\\,000$.\nb) Le résultat du sondage est-il compatible avec une égalité ? Le titre est-il justifié ?",
          correction:
            "a) $\\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}032$ : l'intervalle est environ $[0{,}468\\,;\\,0{,}532]$.\nb) $0{,}52$ est DANS l'intervalle : même si les candidats étaient à égalité, un sondage de $1\\,000$ personnes donnerait souvent $52$ %. Le résultat est compatible avec une égalité, et le titre n'est pas justifié.\n⭐ Les $3$ points de fluctuation, c'est ce que les instituts appellent la « marge d'erreur » : un écart de $52$ à $48$ est à l'intérieur.",
          schema: intervalles(0.4, 0.6, [{ de: 0.468, a: 0.532, deInclus: true, aInclus: true, label: "si égalité", color: BLEU }], 0.05, [{ value: 0.52, label: "sondage : 0,52", color: VERT }]),
          micros: ["echantillon_interpreter", "echantillon_fluctuation"],
        },
        {
          enonce: "En France, la probabilité qu'une naissance soit celle d'une fille est d'environ $0{,}49$. Ce programme simule $1\\,000$ naissances et renvoie la fréquence des filles. Lancé trois fois, il a affiché $0{,}484$, $0{,}504$ et $0{,}533$.\na) Expliquer la ligne « if random() < 0.49 ».\nb) Ces trois résultats sont-ils dans l'intervalle de fluctuation ? Commenter.",
          figure: programme(["from random import random", "", "def filles(n):", "    f = 0", "    for i in range(n):", "        if random() < 0.49:", "            f = f + 1", "    return f / n"]),
          correction:
            "a) « random() » tombe sous $0{,}49$ dans $49$ % des cas : c'est une naissance de fille avec la probabilité $0{,}49$.\nb) $\\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}032$ : l'intervalle est environ $[0{,}458\\,;\\,0{,}522]$.\n$0{,}484$ et $0{,}504$ y sont ; $0{,}533$ en sort, de peu.\nCe n'est pas une erreur du programme : environ un échantillon sur vingt sort de l'intervalle, et nous venons d'en voir un sur trois essais. Il faudrait beaucoup plus d'essais pour juger.",
          schema: diagramme("barres", [{ label: "Essai 1", value: 0.484 }, { label: "Essai 2", value: 0.504 }, { label: "Essai 3", value: 0.533 }, { label: "p", value: 0.49 }], 3),
          micros: ["simulation_frequence", "echantillon_interpreter"],
        },
        {
          enonce: "On simule quatre séries de $1\\,000$ lancers d'un dé équilibré. Fréquences du $6$ obtenues : $0{,}177$ ; $0{,}153$ ; $0{,}158$ ; $0{,}155$.\na) Calculer l'intervalle de fluctuation autour de $p = \\dfrac{1}{6}$.\nb) Les quatre fréquences y sont-elles ? Que montre cette expérience ?",
          correction:
            "a) $\\dfrac{1}{6} \\approx 0{,}167$ et $\\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}032$ : l'intervalle est environ $[0{,}135\\,;\\,0{,}198]$.\nb) Oui : les quatre fréquences sont entre $0{,}135$ et $0{,}198$.\nElles FLUCTUENT (de $0{,}153$ à $0{,}177$) mais restent toutes près de $\\dfrac{1}{6}$ : sur $1\\,000$ lancers, la loi des grands nombres est déjà bien visible.\n⭐ Sur $10$ lancers, on aurait vu des fréquences de $0$ ou de $0{,}4$.",
          schema: diagramme("barres", [{ label: "Série 1", value: 0.177 }, { label: "Série 2", value: 0.153 }, { label: "Série 3", value: 0.158 }, { label: "Série 4", value: 0.155 }, { label: "1/6", value: 0.167 }], 4),
          micros: ["echantillon_fluctuation", "echantillon_loi_grands_nombres"],
        },
        {
          enonce: "On a simulé $50$ séries de $100$ lancers d'une pièce équilibrée. Les fréquences de pile vont de $0{,}41$ à $0{,}64$, et $46$ séries sur $50$ ont une fréquence dans $[0{,}4\\,;\\,0{,}6]$.\na) Quel pourcentage des séries est dans l'intervalle ?\nb) Est-ce conforme à ce que dit le cours ?",
          correction:
            "a) $\\dfrac{46}{50} = 0{,}92$, soit $92$ % des séries.\nb) Le cours annonce « environ $95$ % ». $92$ % en est proche : avec seulement $50$ séries, ce pourcentage fluctue lui aussi ! Sur des milliers de séries, on s'approcherait de $95$ %.\n⭐ La fluctuation touche tout ce qu'on mesure sur un échantillon, même la proportion d'échantillons « dans l'intervalle ».",
          schema: diagramme("camembert", [{ label: "Dans [0,4 ; 0,6] : 46", value: 46 }, { label: "Dehors : 4", value: 4 }]),
          micros: ["echantillon_interpreter", "echantillon_fluctuation"],
        },
        {
          enonce: "Un joueur soupçonne un dé d'être truqué. Il le lance $600$ fois et obtient $130$ fois le $6$.\na) Calculer la fréquence du $6$.\nb) Calculer l'intervalle de fluctuation pour un dé équilibré ($p = \\dfrac{1}{6}$, $n = 600$).\nc) Que peut-il conclure ?",
          correction:
            "a) $f = \\dfrac{130}{600} \\approx 0{,}217$.\nb) $\\dfrac{1}{\\sqrt{600}} \\approx 0{,}041$ et $\\dfrac{1}{6} \\approx 0{,}167$ : l'intervalle est environ $[0{,}126\\,;\\,0{,}207]$.\nc) $0{,}217$ est AU-DESSUS de l'intervalle : un dé équilibré donnerait rarement autant de $6$. Le joueur a de bonnes raisons de penser que le dé favorise le $6$.\n⛔ Le piège : conclure dès $130 > 100$ (« on attendait $100$ six »). Un écart à l'attendu est normal ; c'est sa TAILLE, comparée à l'intervalle, qui compte.",
          schema: intervalles(0, 0.3, [{ de: 0.126, a: 0.207, deInclus: true, aInclus: true, label: "dé équilibré", color: BLEU }], 0.05, [{ value: 0.217, label: "f = 0,217", color: ORANGE }]),
          micros: ["echantillon_interpreter", "echantillon_fluctuation"],
        },
        {
          enonce: "On veut simuler une expérience où la probabilité de succès vaut $0{,}3$, avec des chiffres tirés au hasard de $0$ à $9$ : on décide que $0$, $1$ et $2$ sont des succès. Voici $20$ chiffres tirés au hasard : 7 2 9 0 4 4 8 1 5 3 6 2 9 7 0 5 8 3 1 6.\na) Pourquoi ce choix donne-t-il bien une probabilité de $0{,}3$ ?\nb) Calculer la fréquence de succès sur ces $20$ tirages.",
          correction:
            "a) Les dix chiffres sont équiprobables ; trois d'entre eux ($0$, $1$, $2$) sont des succès : $\\dfrac{3}{10} = 0{,}3$.\nb) Les succès : 2, 0, 1, 2, 0, 1, soit $6$ succès. Fréquence : $\\dfrac{6}{20} = 0{,}3$.\n⭐ Ici, la fréquence tombe pile sur la probabilité : c'est un hasard. Une autre série de $20$ chiffres aurait pu donner $0{,}2$ ou $0{,}45$.",
          schema: trace(["tirage", "chiffre", "succès ?"], [[2, 2, "oui"], [4, 0, "oui"], [8, 1, "oui"], [12, 2, "oui"], [15, 0, "oui"], [19, 1, "oui"]]),
          micros: ["simulation_frequence"],
        },
        {
          enonce: "Dans une ville, il y a deux maternités : une petite, où naissent $15$ bébés par jour, et une grande, où en naissent $45$. On suppose que la probabilité d'une fille est $0{,}5$. Laquelle des deux maternités compte le plus de jours où plus de $60$ % des bébés sont des filles ?",
          correction:
            "On compare les intervalles de fluctuation autour de $0{,}5$.\nPetite maternité : $\\dfrac{1}{\\sqrt{15}} \\approx 0{,}258$, intervalle environ $[0{,}24\\,;\\,0{,}76]$.\nGrande maternité : $\\dfrac{1}{\\sqrt{45}} \\approx 0{,}149$, intervalle environ $[0{,}35\\,;\\,0{,}65]$.\nL'échantillon de la petite maternité fluctue bien plus : c'est ELLE qui connaîtra le plus souvent des journées extrêmes, à plus de $60$ % de filles… ou à moins de $40$ %.\n⭐ C'est une question célèbre en psychologie : la plupart des gens répondent « autant l'une que l'autre », et se trompent. Un petit échantillon s'écarte plus souvent.",
          schema: intervalles(0, 1, [{ de: 0.24, a: 0.76, deInclus: true, aInclus: true, label: "petite (n = 15)", color: ORANGE }, { de: 0.35, a: 0.65, deInclus: true, aInclus: true, label: "grande (n = 45)", color: BLEU }], 0.2),
          micros: ["echantillon_fluctuation", "echantillon_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on choisit p et n, on calcule l'intervalle, on conclut avec prudence.",
      rappel: [
        "On repère d'abord la probabilité $p$ supposée et la taille $n$ de l'échantillon.",
        "Une fréquence estime une probabilité inconnue, d'autant mieux que $n$ est grand.",
        "Conclure, c'est dire « compatible » ou « on doute », jamais « c'est prouvé ».",
      ],
      exercices: [
        {
          titre: "La marge d'erreur d'un sondage",
          enonce: "Un institut interroge $1\\,000$ personnes au hasard : $48$ % pour B, $52$ % pour A.\na) Calculer $\\dfrac{1}{\\sqrt{n}}$ et l'exprimer en points de pourcentage : c'est l'ordre de grandeur de la « marge d'erreur ».\nb) Écrire, pour chaque candidat, l'intervalle « score annoncé plus ou moins la marge ». Que remarque-t-on ?\nc) Combien de personnes faudrait-il interroger pour une marge de $1$ point ?",
          correction:
            "a) $\\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}032$, soit environ $3$ points.\nb) A : de $49$ % à $55$ % ; B : de $45$ % à $51$ %. Les deux intervalles se CHEVAUCHENT (entre $49$ et $51$ %) : le sondage ne permet pas de dire qui est en tête.\nc) Il faut $\\dfrac{1}{\\sqrt{n}} = 0{,}01$, soit $\\sqrt{n} = 100$, donc $n = 10\\,000$ personnes : dix fois plus pour une marge trois fois plus petite.\n⭐ Voilà pourquoi les sondages se font presque tous sur environ $1\\,000$ personnes : au-delà, gagner en précision coûte très cher.",
          schema: intervalles(40, 60, [{ de: 49, a: 55, deInclus: true, aInclus: true, label: "A : 52 ± 3", color: BLEU }, { de: 45, a: 51, deInclus: true, aInclus: true, label: "B : 48 ± 3", color: ORANGE }], 2),
          micros: ["echantillon_interpreter", "echantillon_fluctuation"],
        },
        {
          titre: "Filles et garçons à la maternité",
          enonce: "En France, il naît environ $105$ garçons pour $100$ filles : la probabilité qu'un bébé soit un garçon est d'environ $0{,}512$. Une maternité a enregistré $400$ naissances en un an, dont $190$ garçons.\na) Calculer la fréquence des garçons dans cette maternité.\nb) Ce résultat est-il anormal ?",
          correction:
            "a) $f = \\dfrac{190}{400} = 0{,}475$.\nb) $\\dfrac{1}{\\sqrt{400}} = 0{,}05$ : l'intervalle est $[0{,}512 - 0{,}05\\,;\\,0{,}512 + 0{,}05] = [0{,}462\\,;\\,0{,}562]$.\n$0{,}475$ est dans l'intervalle : c'est une fluctuation ordinaire, sans rien d'anormal.\n⭐ Une maternité qui annonce « cette année, plus de filles ! » ne découvre rien : $400$ naissances fluctuent de plusieurs points.",
          schema: intervalles(0.4, 0.6, [{ de: 0.462, a: 0.562, deInclus: true, aInclus: true, label: "intervalle", color: BLEU }], 0.05, [{ value: 0.475, label: "f = 0,475", color: VERT }]),
          micros: ["echantillon_fluctuation", "echantillon_interpreter"],
        },
        {
          titre: "Trouver π au hasard",
          enonce: "On tire des points au hasard dans un carré de côté $1$. La probabilité qu'un point tombe dans le quart de disque de rayon $1$ est égale à l'aire de ce quart de disque, $\\dfrac{\\pi}{4}$.\na) Expliquer la condition « x * x + y * y <= 1 ».\nb) Le programme, lancé pour $100$, $1\\,000$ et $10\\,000$ points, a renvoyé $0{,}77$ ; $0{,}783$ ; $0{,}7885$. En déduire trois estimations de $\\pi$.\nc) Laquelle est la plus fiable ?",
          figure: programme(["from random import random", "", "def quart(n):", "    d = 0", "    for i in range(n):", "        x = random()", "        y = random()", "        if x * x + y * y <= 1:", "            d = d + 1", "    return d / n"]),
          correction:
            "a) Le point $(x\\,;\\,y)$ est à la distance $\\sqrt{x^2 + y^2}$ de l'origine. Il est dans le quart de disque si cette distance est au plus $1$, c'est-à-dire si $x^2 + y^2 \\leqslant 1$.\nb) La fréquence estime $\\dfrac{\\pi}{4}$, donc $\\pi \\approx 4f$ : $4 \\times 0{,}77 = 3{,}08$ ; $4 \\times 0{,}783 = 3{,}132$ ; $4 \\times 0{,}7885 = 3{,}154$.\nc) Celle des $10\\,000$ points, $3{,}154$ : plus il y a de points, plus la fréquence approche la probabilité. ($\\pi \\approx 3{,}1416$.)\n⭐ C'est la méthode de « Monte-Carlo », du nom du casino : calculer une grandeur exacte avec du hasard.",
          schema: diagramme("barres", [{ label: "100 points", value: 3.08 }, { label: "1 000", value: 3.132 }, { label: "10 000", value: 3.154 }, { label: "π", value: 3.1416 }], 3),
          micros: ["simulation_frequence", "echantillon_loi_grands_nombres"],
        },
        {
          titre: "Combien de truites dans le lac ?",
          enonce: "Pour estimer le nombre de truites d'un lac sans les pêcher toutes, des biologistes en capturent $200$, les marquent, puis les relâchent. Une semaine plus tard, ils en pêchent $150$ : $12$ portent la marque.\na) Calculer la fréquence des truites marquées dans la seconde pêche.\nb) On suppose que cette fréquence est proche de la proportion de truites marquées dans tout le lac. Estimer le nombre de truites du lac.\nc) Quelles conditions faut-il pour que cette méthode soit fiable ?",
          correction:
            "a) $f = \\dfrac{12}{150} = 0{,}08$ : $8$ % des truites pêchées sont marquées.\nb) Si $200$ truites représentent $8$ % du lac, le lac en compte environ $\\dfrac{200}{0{,}08} = 2\\,500$.\nc) Il faut que les truites marquées se soient bien mélangées aux autres, qu'elles ne soient ni plus faciles ni plus difficiles à pêcher, et que la population n'ait pas changé entre les deux pêches. Et un échantillon plus grand donnerait une estimation plus sûre.\n⭐ C'est la méthode de « capture-recapture », utilisée pour compter les poissons, les oiseaux ou les papillons d'une région.",
          schema: tableauProba(["", "Marquées", "Autres", "Total"], [["2e pêche", "12", "138", "150"], ["Lac (estimé)", "200", "2300", "2500"]], [[0, 1], [1, 1]]),
          micros: ["echantillon_loi_grands_nombres", "echantillon_interpreter"],
        },
      ],
    },
  ],
};
