// ─── Fiche d'exercices : épreuves de Bernoulli, reconnaître (1re) ─────────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/bernoulli.bank.ts`
// (notionId alea_bernoulli) : reconnaître une épreuve de Bernoulli (deux
// issues, un paramètre p), reconnaître une répétition d'épreuves IDENTIQUES et
// INDÉPENDANTES, et distinguer le tirage avec remise (indépendance) du tirage
// sans remise. Le programme insiste sur la simulation « avec remise dans une
// urne » : c'est la remise qui garantit l'indépendance.
// ⛔ La loi binomiale n'est PAS au programme : aucun coefficient binomial,
// aucun « X suit B(n, p) ». Les calculs de répétitions sont la notion
// suivante, `alea_bernoulli_calcul`.
//
// ⭐⭐ LE FIL : TROIS QUESTIONS À SE POSER. Deux issues ? Toujours la même
// probabilité ? Les épreuves s'influencent-elles ? Trois « oui, oui, non » :
// c'est une répétition d'épreuves de Bernoulli.
// ⛔ LE PIÈGE CENTRAL : croire qu'un tirage sans remise est toujours une
// répétition indépendante (exercices 6, 13, 17, 18, 20) — ou, à l'inverse,
// refuser le modèle quand la population est immense (exercices 11, 13).
//
// ⭐ Frédéric, 28/09 : urnes, roues, dés, arbres « avec » et « sans » remise,
// et des contextes d'économie, d'écologie, de sport, de nature, de PHYSIQUE
// (carbone 14, exercice 10 ; thermocouples, exercice 18) et d'HISTOIRE-GÉO
// (sondage dans une ville, exercice 11 ; tirage au sort des conscrits au
// XIXᵉ siècle, exercice 17). Les chiffres sont des MODÈLES arrondis, jamais
// présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-bernoulli.mjs`.
//
// Micro-compétences : alea_bern_epreuve (1, 2, 3, 7, 8, 9, 16, 19),
// alea_bern_repetition (4, 8, 9, 10, 12, 14, 15, 16, 19), alea_bern_avec_sans_remise
// (4, 5, 6, 11, 12, 13, 17, 18, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, billes, de, diagramme, roue, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaBernoulliPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-bernoulli",
  titre: "Épreuves de Bernoulli : reconnaître",
  accroche:
    "Vingt exercices pour reconnaître une épreuve de Bernoulli (deux issues, succès ou échec), une répétition d'épreuves identiques et indépendantes, et la différence entre un tirage avec remise et un tirage sans remise. Urnes, roues, dés, tirs au but, carbone 14, sondages, contrôle qualité, météo, tortues marines, conscrits du XIXᵉ siècle, cartes à jouer. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Reconnaître l'épreuve, nommer le succès, donner sa probabilité.",
      rappel: [
        "Une épreuve de BERNOULLI est une expérience à DEUX issues : succès ($S$) ou échec ($\\overline{S}$). La probabilité du succès se note $p$ ; celle de l'échec est $1 - p$.",
        "On RÉPÈTE $n$ épreuves de Bernoulli IDENTIQUES (toujours le même $p$) et INDÉPENDANTES (aucune n'influence les autres).",
        "Tirer dans une urne AVEC remise : la composition ne change pas, les tirages sont indépendants. SANS remise : elle change, ils ne le sont pas.",
      ],
      exercices: [
        {
          enonce:
            "Lesquelles de ces expériences sont des épreuves de Bernoulli ?\na) Lancer une pièce et regarder si elle tombe sur « pile ».\nb) Lancer un dé et noter le résultat.\nc) Lancer un dé et regarder si l'on obtient $6$.\nd) Noter la température qu'il fera demain à midi.",
          correction:
            "Une épreuve de Bernoulli a exactement DEUX issues.\na) Pile ou face : deux issues. Oui, avec $p = \\dfrac{1}{2}$ si le succès est « pile ».\nb) Six résultats possibles : ce n'est pas une épreuve de Bernoulli.\nc) « $6$ » ou « pas $6$ » : deux issues. Oui, avec $p = \\dfrac{1}{6}$.\nd) Une température peut prendre beaucoup de valeurs : non.\n⭐ b) et c) utilisent le même dé : c'est la QUESTION posée qui fait l'épreuve de Bernoulli.",
          schema: ecranSeulement(de([6])),
          micros: ["alea_bern_epreuve"],
        },
        {
          enonce: "On fait tourner la roue, dont les huit secteurs ont la même taille. Le succès est « tomber sur un secteur rouge ». Justifier que c'est une épreuve de Bernoulli et donner $p$.",
          figure: roue([
            { label: "R", poids: 1, couleur: "#dc2626" },
            { label: "B", poids: 1, couleur: "#2563eb" },
            { label: "R", poids: 1, couleur: "#dc2626" },
            { label: "B", poids: 1, couleur: "#2563eb" },
            { label: "B", poids: 1, couleur: "#2563eb" },
            { label: "R", poids: 1, couleur: "#dc2626" },
            { label: "B", poids: 1, couleur: "#2563eb" },
            { label: "B", poids: 1, couleur: "#2563eb" },
          ]),
          correction:
            "Deux issues seulement : rouge (succès) ou bleu (échec). C'est une épreuve de Bernoulli.\nTrois secteurs rouges sur huit, tous de même taille : $p = \\dfrac{3}{8}$.\nL'échec a la probabilité $1 - \\dfrac{3}{8} = \\dfrac{5}{8}$.\n⚠️ Les deux issues n'ont pas besoin d'être équiprobables : $p$ peut valoir autre chose que $\\dfrac{1}{2}$.",
          micros: ["alea_bern_epreuve"],
        },
        {
          enonce: "Une urne contient trois billes rouges et deux billes bleues, indiscernables au toucher. On tire une bille ; le succès est « la bille est rouge ». Donner $p$ et $1 - p$.",
          figure: billes([
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "B", couleur: "#2563eb" },
            { label: "B", couleur: "#2563eb" },
          ]),
          correction:
            "Cinq billes, équiprobables car indiscernables au toucher. Trois sont rouges.\n$p = \\dfrac{3}{5} = 0{,}6$ et $1 - p = \\dfrac{2}{5} = 0{,}4$.\n⭐ « Indiscernables au toucher » : c'est la phrase qui garantit que chaque bille a la même chance.",
          micros: ["alea_bern_epreuve"],
        },
        {
          enonce:
            "Dans chaque cas, a-t-on une répétition d'épreuves de Bernoulli identiques et indépendantes ?\na) On lance $5$ fois la même pièce et on compte les « pile ».\nb) On tire $3$ cartes d'un jeu, sans les remettre, et on compte les cœurs.\nc) On tire $3$ cartes d'un jeu, en remettant chaque carte et en mélangeant, et on compte les cœurs.",
          correction:
            "a) Oui : deux issues à chaque lancer, toujours $p = \\dfrac{1}{2}$, et la pièce n'a pas de mémoire.\nb) Non : après un cœur tiré, il reste moins de cœurs. La probabilité change d'un tirage à l'autre : les tirages ne sont ni identiques ni indépendants.\nc) Oui : la remise rend au jeu sa composition de départ. Chaque tirage recommence à l'identique.\n⭐ b) et c) ne diffèrent que par la REMISE : c'est elle qui fait l'indépendance.\nL'arbre du cas b), avec un jeu de $32$ cartes ($8$ cœurs) : après un cœur, $\\dfrac{7}{31}$ ; après une autre carte, $\\dfrac{8}{31}$.",
          schema: ecranSeulement(arbre([{ label: "Cœur", proba: "8/32", enfants: [{ label: "Cœur", proba: "7/31" }, { label: "non", proba: "24/31" }] }, { label: "non", proba: "24/32", enfants: [{ label: "Cœur", proba: "8/31" }, { label: "non", proba: "23/31" }] }])),
          micros: ["alea_bern_repetition", "alea_bern_avec_sans_remise"],
        },
        {
          enonce:
            "On tire deux fois une bille dans l'urne de l'exercice 3 (trois rouges, deux bleues), en REMETTANT la bille après le premier tirage. Construire l'arbre, puis dire si les deux tirages sont indépendants.",
          correction:
            "Premier tirage : $R$ avec $0{,}6$, $B$ avec $0{,}4$.\nLa bille est remise : l'urne contient de nouveau $3$ rouges et $2$ bleues. Derrière $R$ comme derrière $B$ : $R$ avec $0{,}6$, $B$ avec $0{,}4$.\nLe second tirage a la même probabilité quoi qu'il soit arrivé au premier : les tirages sont indépendants.\n⭐ Avec remise, l'arbre REPRODUIT les mêmes branches à chaque niveau.",
          schema: arbre([
            { label: "R", proba: "0,6", enfants: [{ label: "R", proba: "0,6" }, { label: "B", proba: "0,4" }] },
            { label: "B", proba: "0,4", enfants: [{ label: "R", proba: "0,6" }, { label: "B", proba: "0,4" }] },
          ]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          enonce:
            "Même urne (trois rouges, deux bleues), mais on tire deux billes SANS remise. Construire l'arbre. Les deux tirages sont-ils indépendants ?",
          correction:
            "Premier tirage : $R$ avec $\\dfrac{3}{5}$, $B$ avec $\\dfrac{2}{5}$.\nSi la première est rouge, il reste $2$ rouges et $2$ bleues : $R$ avec $\\dfrac{2}{4}$, $B$ avec $\\dfrac{2}{4}$.\nSi la première est bleue, il reste $3$ rouges et $1$ bleue : $R$ avec $\\dfrac{3}{4}$, $B$ avec $\\dfrac{1}{4}$.\nLa probabilité d'une rouge au second tirage dépend du premier ($\\dfrac{2}{4}$ ou $\\dfrac{3}{4}$) : les tirages ne sont pas indépendants.\n⚠️ Ce n'est donc pas une répétition d'épreuves de Bernoulli identiques et indépendantes.",
          schema: arbre([
            { label: "R", proba: "3/5", enfants: [{ label: "R", proba: "2/4" }, { label: "B", proba: "2/4" }] },
            { label: "B", proba: "2/5", enfants: [{ label: "R", proba: "3/4" }, { label: "B", proba: "1/4" }] },
          ]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          enonce: "Un élève répond au hasard à une question d'un QCM à quatre propositions, dont une seule est juste. Décrire l'épreuve de Bernoulli : succès, $p$, échec.",
          correction:
            "Le succès : « répondre juste ». L'échec : « répondre faux ».\nQuatre propositions équiprobables, une seule juste : $p = \\dfrac{1}{4} = 0{,}25$.\nL'échec a la probabilité $1 - 0{,}25 = 0{,}75$.\n⚠️ Quatre propositions, mais DEUX issues : juste ou faux. C'est bien une épreuve de Bernoulli.",
          schema: ecranSeulement(roue([{ label: "Juste", poids: 1, couleur: "#16a34a" }, { label: "Faux", poids: 1, couleur: "#94a3b8" }, { label: "Faux", poids: 1, couleur: "#94a3b8" }, { label: "Faux", poids: 1, couleur: "#94a3b8" }])),
          micros: ["alea_bern_epreuve"],
        },
        {
          enonce: "On lance $3$ fois un dé équilibré et on compte le nombre de $6$ obtenus. Préciser : l'épreuve répétée, le succès, $p$, le nombre $n$ de répétitions, et pourquoi les épreuves sont indépendantes.",
          correction:
            "L'épreuve : lancer le dé une fois. Le succès : « obtenir $6$ », avec $p = \\dfrac{1}{6}$.\nOn la répète $n = 3$ fois, dans les mêmes conditions : les épreuves sont identiques.\nLe dé n'a pas de mémoire : un lancer n'influence pas les suivants. Elles sont indépendantes.\n⭐ Les quatre informations à donner : l'épreuve, le succès, $p$, et $n$.",
          schema: ecranSeulement(de([6])),
          micros: ["alea_bern_repetition", "alea_bern_epreuve"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Identifier l'épreuve, puis discuter les hypothèses : identiques ? indépendantes ?",
      rappel: [
        "On nomme le succès et on donne $p$. Puis on vérifie : même $p$ à chaque fois ? aucune influence d'une épreuve sur l'autre ?",
        "Un tirage SANS remise dans une TRÈS grande population change si peu la composition qu'on le traite comme un tirage avec remise.",
        "Un modèle est une hypothèse : on dit ce qu'il suppose, et quand il devient discutable.",
      ],
      exercices: [
        {
          titre: "La séance de tirs au but",
          enonce:
            "Un attaquant marque un penalty avec la probabilité $0{,}8$. À l'entraînement, il en tire cinq de suite. L'arbre montre les deux premiers tirs ; $T_1$, $T_2$ : « il marque le premier, le second ».\na) Décrire l'épreuve de Bernoulli d'un tir.\nb) Que montre l'arbre sur l'indépendance des tirs ?\nc) En match, pendant une séance de tirs au but décisive, le modèle vous paraît-il aussi bon ?",
          figure: arbre([
            { label: "T1", proba: "0,8", enfants: [{ label: "T2", proba: "0,8" }, { label: "non T2", proba: "0,2" }] },
            { label: "non T1", proba: "0,2", enfants: [{ label: "T2", proba: "0,8" }, { label: "non T2", proba: "0,2" }] },
          ]),
          correction:
            "a) Deux issues : marquer (succès) ou non. $p = 0{,}8$.\nb) Derrière $T_1$ comme derrière $\\overline{T_1}$, $T_2$ a la probabilité $0{,}8$ : le second tir ne dépend pas du premier. Les tirs sont supposés identiques et indépendants.\nc) Moins bon : la pression, la fatigue, ou un premier tir manqué peuvent changer $p$ d'un tir à l'autre.\n⭐ Le modèle « répétition d'épreuves de Bernoulli » est une HYPOTHÈSE : on la fait parce qu'elle est raisonnable, pas parce qu'elle est vraie à coup sûr.",
          micros: ["alea_bern_epreuve", "alea_bern_repetition"],
        },
        {
          titre: "Le carbone 14",
          enonce:
            "Le carbone 14 est radioactif : un noyau a une chance sur deux de se désintégrer en $5\\,730$ ans environ, sa demi-vie. On observe $3$ noyaux pendant $5\\,730$ ans, et on compte ceux qui se désintègrent.\na) Décrire l'épreuve de Bernoulli pour un noyau.\nb) Est-ce une répétition d'épreuves identiques et indépendantes ? Justifier.",
          correction:
            "a) Pour un noyau : « se désintégrer pendant les $5\\,730$ ans » (succès) ou non. $p = 0{,}5$.\nb) Identiques : les trois noyaux sont du même élément, ils ont la même demi-vie, donc le même $p$.\nIndépendantes : un noyau se désintègre au hasard, sans tenir compte des autres.\nC'est une répétition de $n = 3$ épreuves de Bernoulli identiques et indépendantes, avec $p = 0{,}5$.\n⭐ C'est ce hasard régulier qui permet de dater un os ou un morceau de bois avec le carbone 14.\nL'arbre des deux premiers noyaux ($D$ : désintégré) recopie les mêmes branches : c'est la marque d'épreuves identiques et indépendantes.",
          schema: ecranSeulement(arbre([{ label: "D1", proba: "0,5", enfants: [{ label: "D2", proba: "0,5" }, { label: "non D2", proba: "0,5" }] }, { label: "non D1", proba: "0,5", enfants: [{ label: "D2", proba: "0,5" }, { label: "non D2", proba: "0,5" }] }])),
          micros: ["alea_bern_repetition"],
        },
        {
          titre: "Le sondage dans une ville",
          enonce:
            "Dans une ville de $100\\,000$ électeurs, $40\\,000$ votent pour la liste A (modèle). Un sondeur interroge des électeurs au hasard, sans jamais interroger deux fois la même personne : c'est un tirage sans remise.\na) Le premier électeur interrogé vote A. Quelle est la probabilité que le second vote A ? Comparer à un tirage avec remise.\nb) Peut-on considérer les réponses comme une répétition d'épreuves de Bernoulli indépendantes ?",
          correction:
            "a) Après un électeur de A, il reste $39\\,999$ électeurs de A sur $99\\,999$ : $\\dfrac{39\\,999}{99\\,999} \\approx 0{,}399994$.\nAvec remise, ce serait exactement $\\dfrac{40\\,000}{100\\,000} = 0{,}4$.\nb) La différence est minuscule : on peut traiter ce tirage sans remise comme un tirage avec remise.\nLes réponses forment, en bonne approximation, une répétition d'épreuves de Bernoulli indépendantes, avec $p = 0{,}4$.\n⭐ C'est l'hypothèse qui fonde les sondages : on interroge peu de personnes dans une population immense.",
          schema: tableau(["", "Avec remise", "Sans remise"], ["2e vote A si 1er vote A", "0,4", "≈ 0,399994"]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          titre: "Le sachet de graines",
          enonce:
            "Un sachet contient $500$ graines de radis ; le fabricant annonce que $80$ % germent. Un jardinier sème $3$ graines prises au hasard dans le sachet, au même endroit du potager.\na) Décrire l'épreuve de Bernoulli pour une graine.\nb) Les trois épreuves sont-elles identiques ? indépendantes ? Discuter.",
          correction:
            "a) Pour une graine : « elle germe » (succès) ou non, avec $p = 0{,}8$.\nb) Les graines sont tirées sans remise, mais dans $500$ : la composition du sachet ne change presque pas. On peut les considérer comme identiques.\nIndépendance : elles sont semées au même endroit. Un coup de froid ou une sécheresse toucherait les trois ensemble : l'indépendance est une hypothèse, raisonnable si le sol et la météo sont bons.\n⭐ En pratique, on admet le modèle de Bernoulli, en sachant ce qu'il suppose.",
          schema: ecranSeulement(
            arbre([
              { label: "G1", proba: "0,8", enfants: [{ label: "G2", proba: "0,8" }, { label: "non G2", proba: "0,2" }] },
              { label: "non G1", proba: "0,2", enfants: [{ label: "G2", proba: "0,8" }, { label: "non G2", proba: "0,2" }] },
            ]),
          ),
          micros: ["alea_bern_repetition", "alea_bern_avec_sans_remise"],
        },
        {
          titre: "Le contrôle des pots de confiture",
          enonce:
            "Une confiturerie contrôle ses pots mal fermés ($D$), en prélevant des pots sans remise.\na) Dans un petit lot de $10$ pots dont $2$ mal fermés, le premier pot prélevé est mal fermé. Quelle est la probabilité que le second le soit aussi ?\nb) Dans un grand lot de $10\\,000$ pots dont $200$ mal fermés, même question.\nc) Dans quel cas peut-on modéliser les prélèvements par une répétition d'épreuves de Bernoulli indépendantes ?",
          correction:
            "a) Il reste $1$ pot mal fermé sur $9$ : $\\dfrac{1}{9} \\approx 0{,}11$. Au départ, c'était $\\dfrac{2}{10} = 0{,}2$ : la probabilité a presque été divisée par deux.\nb) Il reste $199$ pots mal fermés sur $9\\,999$ : $\\dfrac{199}{9\\,999} \\approx 0{,}0199$. Au départ, $\\dfrac{200}{10\\,000} = 0{,}02$ : presque rien n'a changé.\nc) Dans le grand lot seulement. Dans le petit lot, le premier prélèvement change beaucoup la composition : les épreuves ne sont ni identiques ni indépendantes.\n⭐ Ce qui compte n'est pas le mot « sans remise », c'est la TAILLE du lot par rapport au prélèvement.",
          schema: tableau(["", "10 pots", "10 000 pots"], ["2e mal fermé si 1er", "≈ 0,11", "≈ 0,0199"]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          titre: "La pluie d'un jour à l'autre",
          enonce:
            "Dans une ville (modèle), il pleut un jour donné ($P_1$) avec la probabilité $0{,}3$. L'arbre donne la probabilité qu'il pleuve le lendemain ($P_2$).\nPeut-on modéliser les jours de pluie d'une semaine par une répétition de $7$ épreuves de Bernoulli indépendantes ?",
          figure: arbre([
            { label: "P1", proba: "0,3", enfants: [{ label: "P2", proba: "0,6" }, { label: "non P2", proba: "0,4" }] },
            { label: "non P1", proba: "0,7", enfants: [{ label: "P2", proba: "0,15" }, { label: "non P2", proba: "0,85" }] },
          ]),
          correction:
            "Chaque jour, deux issues : il pleut ou non. Chaque jour est donc une épreuve de Bernoulli.\nMais derrière $P_1$, $P_2$ a la probabilité $0{,}6$ ; derrière $\\overline{P_1}$, seulement $0{,}15$.\nLa pluie du lendemain DÉPEND de celle du jour : les épreuves ne sont pas indépendantes.\nCe n'est donc pas une répétition d'épreuves de Bernoulli indépendantes.\n⭐ Le temps a de la « mémoire » : une perturbation dure souvent plusieurs jours. Un dé, lui, n'en a pas.",
          micros: ["alea_bern_repetition"],
        },
        {
          titre: "Le tir à l'arc",
          enonce:
            "Une archère touche le centre de la cible avec la probabilité $0{,}7$ quand elle est reposée. Elle tire $30$ flèches de suite. Après $20$ flèches, la fatigue fait baisser sa probabilité de toucher.\nLes $30$ tirs forment-ils une répétition d'épreuves de Bernoulli identiques et indépendantes ? Que faudrait-il changer à l'entraînement pour s'en rapprocher ?",
          correction:
            "Chaque tir est bien une épreuve de Bernoulli : centre touché (succès) ou non.\nMais $p$ n'est pas le même du début à la fin : $0{,}7$ au départ, moins après $20$ flèches. Les épreuves ne sont pas IDENTIQUES.\nCe n'est donc pas le modèle du cours.\nPour s'en rapprocher : faire des pauses, pour tirer chaque flèche dans les mêmes conditions.\n⚠️ Deux conditions à vérifier, pas une : même $p$ à chaque épreuve, ET aucune influence d'une épreuve sur l'autre.\nLe diagramme montre un exemple (modèle) : $70$ % de réussite au début, $55$ % après $20$ flèches.",
          schema: ecranSeulement(diagramme("barres", [{ label: "Flèches 1 à 20 (%)", value: 70 }, { label: "Après 20 (%)", value: 55 }])),
          micros: ["alea_bern_repetition"],
        },
        {
          titre: "Le jeu de dé",
          enonce:
            "À un jeu, on lance $4$ fois un dé équilibré ; on gagne un point à chaque « $5$ » ou « $6$ ».\na) Décrire l'épreuve de Bernoulli.\nb) Justifier qu'il s'agit d'une répétition d'épreuves identiques et indépendantes, et donner $n$ et $p$.",
          figure: de([5, 6]),
          correction:
            "a) Le succès : « obtenir $5$ ou $6$ ». Deux faces sur six : $p = \\dfrac{2}{6} = \\dfrac{1}{3}$. L'échec : $1 - \\dfrac{1}{3} = \\dfrac{2}{3}$.\nb) Même dé, même règle : chaque lancer a la même probabilité $\\dfrac{1}{3}$. Les lancers sont identiques.\nLe dé n'a pas de mémoire : ils sont indépendants.\nC'est une répétition de $n = 4$ épreuves de Bernoulli de paramètre $p = \\dfrac{1}{3}$.\n⭐ Le succès peut regrouper plusieurs faces : il suffit qu'il y ait deux issues, « succès » et « le reste ».",
          micros: ["alea_bern_epreuve", "alea_bern_repetition"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Modéliser, discuter les hypothèses, et calculer ce qui les départage.",
      rappel: [
        "Avec remise, ou dans une population immense : les tirages sont indépendants.",
        "Sans remise, dans un petit groupe : la probabilité change d'un tirage à l'autre, on le voit sur l'arbre.",
      ],
      exercices: [
        {
          titre: "Les conscrits du XIXᵉ siècle",
          enonce:
            "Au XIXᵉ siècle, en France, une partie des jeunes hommes est désignée pour le service militaire par tirage au sort : chacun tire un numéro, et un « mauvais numéro » l'envoie à l'armée. Dans un canton (modèle), l'urne contient $100$ numéros, dont $30$ mauvais. Chaque conscrit garde le numéro qu'il a tiré.\na) Pour le premier conscrit, décrire l'épreuve de Bernoulli.\nb) Les tirages des conscrits successifs sont-ils indépendants ? Construire l'arbre des deux premiers tirages.\nc) Calculer la probabilité que les deux premiers conscrits tirent un mauvais numéro, et comparer au cas « avec remise ».",
          correction:
            "a) Succès (du point de vue de l'armée) : « tirer un mauvais numéro », avec $p = \\dfrac{30}{100} = 0{,}3$.\nb) Chacun garde son numéro : c'est un tirage SANS remise. Si le premier tire un mauvais numéro, il en reste $29$ sur $99$ ; sinon, il en reste $30$ sur $99$.\nLa probabilité du second dépend du premier : les tirages ne sont pas indépendants.\nc) $0{,}3 \\times \\dfrac{29}{99} = \\dfrac{29}{330} \\approx 0{,}088$. Avec remise, ce serait $0{,}3 \\times 0{,}3 = 0{,}09$.\n⭐ L'écart est petit, car l'urne contient $100$ numéros. Mais le principe compte : un numéro tiré n'est plus disponible pour les suivants.",
          schema: arbre([
            { label: "Mauvais", proba: "0,3", enfants: [{ label: "Mauvais", proba: "29/99" }, { label: "Bon", proba: "70/99" }] },
            { label: "Bon", proba: "0,7", enfants: [{ label: "Mauvais", proba: "30/99" }, { label: "Bon", proba: "69/99" }] },
          ]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          titre: "Le carton de thermocouples",
          enonce:
            "Un laboratoire de physique reçoit un carton de $20$ thermocouples (des capteurs de température), dont $4$ sont défectueux ($D$). Un technicien en prend $2$ au hasard pour les tester.\na) Construire l'arbre des deux prélèvements.\nb) Calculer la probabilité que les deux soient défectueux.\nc) Le fournisseur affirme que $20$ % de sa production est défectueuse. Pour deux capteurs pris au hasard dans toute sa production, quelle serait cette probabilité ? Pourquoi le résultat diffère-t-il ?",
          correction:
            "a) Premier : $D$ avec $\\dfrac{4}{20} = 0{,}2$. Si le premier est défectueux, il en reste $3$ sur $19$ ; sinon, $4$ sur $19$.\nb) $0{,}2 \\times \\dfrac{3}{19} = \\dfrac{3}{95} \\approx 0{,}032$.\nc) Dans une production immense, les prélèvements sont indépendants : $0{,}2 \\times 0{,}2 = 0{,}04$.\nLe carton ne contient que $20$ capteurs : un défectueux retiré fait nettement baisser la part des défectueux restants.\n⭐ Le même « $20$ % » donne deux modèles différents selon qu'on puise dans un petit carton ou dans une production entière.",
          schema: arbre([
            { label: "D", proba: "0,2", enfants: [{ label: "D", proba: "3/19" }, { label: "non D", proba: "16/19" }] },
            { label: "non D", proba: "0,8", enfants: [{ label: "D", proba: "4/19" }, { label: "non D", proba: "15/19" }] },
          ]),
          micros: ["alea_bern_avec_sans_remise"],
        },
        {
          titre: "Les œufs de tortue",
          enonce:
            "Sur une plage (modèle), un œuf de tortue marine éclot avec la probabilité $0{,}8$. Une tortue pond $100$ œufs dans un même nid. Mais la température du sable compte : le diagramme donne le pourcentage d'éclosion dans un nid chaud et dans un nid frais.\na) Pour un œuf, décrire l'épreuve de Bernoulli.\nb) Les $100$ œufs d'un même nid forment-ils une répétition d'épreuves indépendantes de paramètre $0{,}8$ ? Discuter.",
          figure: diagramme("barres", [
            { label: "Nid chaud (%)", value: 60 },
            { label: "Nid frais (%)", value: 90 },
          ]),
          correction:
            "a) Pour un œuf : « il éclot » (succès) ou non, avec $p = 0{,}8$ sur l'ensemble de la plage.\nb) Pas vraiment. Les œufs d'un même nid partagent la même température : dans un nid chaud, $p$ vaut plutôt $0{,}6$ ; dans un nid frais, $0{,}9$.\nSi l'on sait qu'un œuf du nid a éclos, le nid est plutôt frais, et les autres ont plus de chances d'éclore : les œufs ne sont pas indépendants.\nLe modèle serait meilleur avec des œufs pris dans des nids différents.\n⭐ Chez les tortues marines, la température du sable décide aussi du sexe des petits : un détail de plus qui lie les œufs d'un même nid.",
          micros: ["alea_bern_epreuve", "alea_bern_repetition"],
        },
        {
          titre: "Deux as de suite",
          enonce:
            "Un jeu de $32$ cartes contient $4$ as. On tire deux cartes.\na) Avec remise : décrire la répétition d'épreuves de Bernoulli, puis calculer la probabilité de tirer deux as.\nb) Sans remise : construire l'arbre, puis calculer la probabilité de tirer deux as.\nc) Laquelle des deux situations est une répétition d'épreuves de Bernoulli indépendantes ?",
          correction:
            "a) Épreuve : tirer une carte ; succès : « un as », $p = \\dfrac{4}{32} = 0{,}125$. Avec remise : $n = 2$ épreuves identiques et indépendantes.\nDeux as : $0{,}125 \\times 0{,}125 = 0{,}015625 \\approx 0{,}016$.\nb) Premier as : $\\dfrac{4}{32}$. Il reste alors $3$ as sur $31$ cartes : $\\dfrac{3}{31}$.\nDeux as : $\\dfrac{4}{32} \\times \\dfrac{3}{31} = \\dfrac{3}{248} \\approx 0{,}012$.\nc) Seulement la situation avec remise. Sans remise, la probabilité d'un as au second tirage dépend du premier ($\\dfrac{3}{31}$ ou $\\dfrac{4}{31}$).\n⭐ Sans remise, deux as sont un peu moins probables : le premier as tiré « manque » au second tirage.",
          schema: arbre([
            { label: "As", proba: "0,125", enfants: [{ label: "As", proba: "3/31" }, { label: "non As", proba: "28/31" }] },
            { label: "non As", proba: "0,875", enfants: [{ label: "As", proba: "4/31" }, { label: "non As", proba: "27/31" }] },
          ]),
          micros: ["alea_bern_avec_sans_remise"],
        },
      ],
    },
  ],
};
