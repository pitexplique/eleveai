// ─── Fiche d'exercices : évolutions successives et réciproque (STMG) — 20 exercices
//
// Notion auto_evo_enchainees du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts` et son
// renfort `seconde/maths/evolutions-lycee-renfort.ts`, qui s'appuie sur les
// générateurs `genSuccessives`, `genTauxGlobal`, `genRetour`, `genDepart` de
// `4e/maths/proportionnalite.bank.ts`). Le coach demande : multiplier les
// coefficients de DEUX évolutions, lire le taux global, retrouver un coefficient
// manquant, revenir au départ par l'inverse, retrouver une valeur de départ, et
// voir qu'une baisse puis une hausse de même taux ne se compensent pas. Les
// réciproques sont celles du coach, qui tombent juste (25 → 20, 100 → 50,
// 150 → 60…) : aucun arrondi demandé. Situations de `situations.ts` : soldes
// successives, capitalisation et actualisation, TVA puis remise.
//
// ⭐ Une seule donnée réelle : ex. 19, TVA au taux normal de 20 % (Code général des
// impôts, art. 278). Tout le reste est un modèle ou une situation fictive.
//
// Domaines et métiers : fleuriste, piscine (maître-nageuse), ferry (armateur),
// garage (magasinière), immobilier (gestionnaire), mode (couturière), maraîchage
// (maraîcher) ; un calcul nu (ex. 3) ; soldes (vendeuse), banque (conseiller),
// céréales (agriculteur), démographie (démographe), coiffure (gérante), transports
// (conseiller en abonnements), escalade (club), industrie (ingénieure),
// café (torréfacteur), épargne (conseillère), électroménager (vendeur), oiseaux
// (ornithologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-3.mjs`.
//
// Micro-compétences : auto_evo_chaine_coefficients (1, 2, 3, 12, 14, 16, 19),
// auto_evo_successives (4, 5, 9, 10, 17, 18, 19), auto_evo_reciproque (6, 7, 11, 13,
// 14, 17, 18, 20), auto_evo_piege_compensation (8, 11, 15, 16, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesAutoEvoEnchaineesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-evo-enchainees",
  titre: "Évolutions successives et réciproque",
  accroche:
    "Vingt exercices pour ne plus additionner les pourcentages : multiplier deux coefficients, lire le taux global, revenir au départ par l'inverse, et comprendre pourquoi − 20 % puis + 20 % ne ramènent pas au prix de départ. Des soldes qui annoncent « − 50 % » à tort, un capital placé deux ans, une TVA suivie d'une remise, une colonie d'oiseaux. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : multiplier deux coefficients, lire un taux global, ou revenir au départ.",
      rappel: [
        "Deux évolutions de suite : on multiplie les coefficients. On n'additionne jamais les taux.",
        "Taux global = coefficient global − 1, écrit en pourcentage.",
        "Revenir au départ : le coefficient de retour est l'inverse, 1 ÷ k. Exemple : × 0,25 se défait par × 4.",
        "Une baisse puis une hausse de même taux ne ramènent pas au départ : la hausse porte sur une valeur déjà diminuée.",
      ],
      exercices: [
        {
          enonce:
            "Une fleuriste augmente le prix de ses roses de 10 %, puis de 20 %. Quel est le coefficient multiplicateur global ?",
          reponses: [{ attendu: "1,32" }],
          correction:
            "On écrit chaque coefficient : 1,1 pour + 10 %, et 1,2 pour + 20 %.\nOn les multiplie : $1{,}1 \\times 1{,}2 = 1{,}32$.\n⛔ Le piège : répondre 1,3, en additionnant les taux. La seconde hausse porte sur un prix déjà augmenté.\nRéponse : 1,32.",
          micros: ["auto_evo_chaine_coefficients"],
        },
        {
          enonce:
            "Une maître-nageuse voit la fréquentation de sa piscine baisser de 10 %, puis de 20 %. Quel est le coefficient multiplicateur global ?",
          reponses: [{ attendu: "0,72" }],
          correction:
            "Les coefficients sont 0,9 pour − 10 %, et 0,8 pour − 20 %.\n$0{,}9 \\times 0{,}8 = 0{,}72$.\n⛔ Le piège : répondre 0,7, en additionnant les baisses.\nRéponse : 0,72.",
          micros: ["auto_evo_chaine_coefficients"],
        },
        {
          enonce:
            "Écris le coefficient global.\na) + 50 %, puis − 20 %\nb) + 25 %, puis + 20 %\nc) − 50 %, puis + 10 %",
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "1,5" },
            { question: "c)", attendu: "0,55" },
          ],
          correction:
            "a) $1{,}5 \\times 0{,}8 = 1{,}2$.\nb) $1{,}25 \\times 1{,}2 = 1{,}5$.\nc) $0{,}5 \\times 1{,}1 = 0{,}55$.\n⛔ Le piège au a) : compter + 30 %, soit 1,3. Une hausse puis une baisse se multiplient, elles aussi.\nRéponse : a) 1,2 ; b) 1,5 ; c) 0,55.",
          micros: ["auto_evo_chaine_coefficients"],
        },
        {
          enonce:
            "Un armateur voit le nombre de passagers de son ferry multiplié par 1,44 en deux ans. Quel est le taux d'évolution global, en pourcentage ?",
          reponses: [{ attendu: "44 %" }],
          correction:
            "Taux global = coefficient global − 1.\n$1{,}44 - 1 = 0{,}44$, soit 44 %.\n⛔ Le piège : répondre 144 %, en oubliant de retirer le point de départ.\nRéponse : 44 %.",
          micros: ["auto_evo_successives"],
        },
        {
          enonce:
            "Une magasinière constate qu'après deux baisses, le stock de pneus de son garage a été multiplié par 0,68. Quel est le taux d'évolution global, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [{ attendu: "−32 %" }],
          correction:
            "$0{,}68 - 1 = -0{,}32$, soit −32 %.\n⛔ Le piège : répondre −68 %. Le nombre 0,68 dit ce qui reste, et il reste 68 % du stock.\nRéponse : −32 %.",
          micros: ["auto_evo_successives"],
        },
        {
          enonce:
            "Un gestionnaire d'immeuble a baissé un loyer : il l'a multiplié par 0,8. Par quel coefficient doit-il le multiplier pour revenir au loyer de départ ?",
          reponses: [{ attendu: ["1,25", "× 1,25"] }],
          correction:
            "Le coefficient de retour est l'inverse : $1 \\div 0{,}8 = 1{,}25$.\nVérification : $0{,}8 \\times 1{,}25 = 1$. ✔\n⛔ Le piège : répondre 1,2, c'est-à-dire une hausse de 20 % pour défaire une baisse de 20 %. L'inverse n'est pas l'opposé.\nRéponse : 1,25.",
          micros: ["auto_evo_reciproque"],
        },
        {
          enonce:
            "Un maraîcher voit le prix de ses tomates baisser de 50 %. De quel pourcentage ce prix doit-il augmenter pour revenir à sa valeur de départ ?",
          reponses: [{ attendu: "100 %" }],
          correction:
            "Le coefficient de la baisse est 0,5.\nLe coefficient de retour est $1 \\div 0{,}5 = 2$.\n$2 - 1 = 1$, soit une hausse de 100 %.\n⛔ Le piège : répondre 50 %. Une hausse de 50 % sur la moitié du prix ne donne que les trois quarts du prix de départ.\nRéponse : 100 %.",
          micros: ["auto_evo_reciproque"],
        },
        {
          enonce:
            "Une couturière vend un manteau 100 €. Elle baisse son prix de 20 %, puis l'augmente de 20 %.\na) Quel est le prix après la baisse ?\nb) Quel est le prix final ?\nc) Revient-elle au prix de départ ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "80 €" },
            { question: "b)", attendu: "96 €" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $100 \\times 0{,}8 = 80$ €.\nb) La hausse porte sur 80 € : $80 \\times 1{,}2 = 96$ €.\nc) Non : 96 € n'est pas 100 €.\n⛔ Le piège : croire que − 20 et + 20 s'annulent. La baisse retire 20 €, la hausse ne rend que 16 €.\nRéponse : a) 80 € ; b) 96 € ; c) non.",
          micros: ["auto_evo_piege_compensation"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on écrit les coefficients, on multiplie, puis on lit le résultat.",
      rappel: [
        "Le coefficient global s'applique directement : valeur finale = valeur de départ × coefficient global.",
        "Coefficient manquant : on divise le coefficient global par le coefficient connu.",
        "Valeur de départ : valeur finale ÷ coefficient global.",
      ],
      exercices: [
        {
          enonce:
            "Une vendeuse solde un jean à 80 € : − 30 %, puis − 20 % supplémentaires. L'affiche du magasin annonce « − 50 % ».\na) Quel est le coefficient global ?\nb) Quel est le prix final ?\nc) Quel est le taux d'évolution global, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)\nd) L'affiche dit-elle vrai ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,56" },
            { question: "b)", attendu: "44,80 €" },
            { question: "c)", attendu: "−44 %" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $0{,}7 \\times 0{,}8 = 0{,}56$.\nb) $80 \\times 0{,}56 = 44{,}80$ €.\nc) $0{,}56 - 1 = -0{,}44$, soit −44 %.\nd) Non : la baisse est de 44 %, pas de 50 %.\n⛔ Le piège : additionner 30 et 20. Les 20 % portent sur le prix déjà soldé.\nRéponse : a) 0,56 ; b) 44,80 € ; c) −44 % ; d) non.",
          micros: ["auto_evo_successives"],
        },
        {
          enonce:
            "Un conseiller bancaire place un capital de 1 000 € pendant deux ans, à 5 % par an, les intérêts restant sur le compte (modèle).\na) Quel est le coefficient global sur deux ans ?\nb) Quel est le capital au bout de deux ans ?\nc) Quel est le taux d'évolution global, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "1,1025" },
            { question: "b)", attendu: "1 102,50 €" },
            { question: "c)", attendu: "10,25 %" },
          ],
          correction:
            "a) Deux hausses de 5 % : $1{,}05 \\times 1{,}05 = 1{,}1025$.\nb) $1\\,000 \\times 1{,}1025 = 1\\,102{,}50$ €.\nc) $1{,}1025 - 1 = 0{,}1025$, soit 10,25 %.\n⛔ Le piège au c) : répondre 10 %. La seconde année, les intérêts portent aussi sur les intérêts de la première année.\nRéponse : a) 1,1025 ; b) 1 102,50 € ; c) 10,25 %.",
          micros: ["auto_evo_successives"],
        },
        {
          enonce:
            "Un agriculteur récolte 400 tonnes de céréales (modèle). La récolte augmente de 25 %, puis baisse de 20 %.\na) Quel est le coefficient global ?\nb) Quelle est la récolte finale ?\nc) Si la baisse avait été de 25 %, serait-il revenu à 400 tonnes ? Réponds oui ou non.\nd) Quelle aurait alors été la récolte finale ?",
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "400 t" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "375 t" },
          ],
          correction:
            "a) $1{,}25 \\times 0{,}8 = 1$.\nb) $400 \\times 1 = 400$ tonnes : on revient exactement au départ. Une baisse de 20 % défait une hausse de 25 %.\nc) Non.\nd) $1{,}25 \\times 0{,}75 = 0{,}9375$, et $400 \\times 0{,}9375 = 375$ tonnes.\n⛔ Le piège : penser que seul le même taux ramène au départ. C'est l'inverse du coefficient qui y ramène, et non le même pourcentage.\nRéponse : a) 1 ; b) 400 t ; c) non ; d) 375 t.",
          micros: ["auto_evo_reciproque", "auto_evo_piege_compensation"],
        },
        {
          enonce:
            "Une démographe étudie une commune sur deux périodes (modèle). La population augmente de 20 % sur la première période. Sur l'ensemble des deux périodes, le coefficient global vaut 0,9.\na) Quel est le coefficient de la première période ?\nb) Quel est le coefficient de la seconde période ?\nc) Quel est le taux d'évolution de la seconde période, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "0,75" },
            { question: "c)", attendu: "−25 %" },
          ],
          correction:
            "a) $1 + 0{,}2 = 1{,}2$.\nb) Les coefficients se multiplient, donc on divise : $0{,}9 \\div 1{,}2 = 0{,}75$.\nc) $0{,}75 - 1 = -0{,}25$, soit −25 %.\nVérification : $1{,}2 \\times 0{,}75 = 0{,}9$. ✔\n⛔ Le piège au b) : calculer $0{,}9 - 1{,}2$. Des coefficients ne se soustraient pas.\nRéponse : a) 1,2 ; b) 0,75 ; c) −25 %.",
          micros: ["auto_evo_chaine_coefficients"],
        },
        {
          enonce:
            "La gérante d'un salon de coiffure voit son chiffre d'affaires augmenter de 25 %.\na) Quel est le coefficient de la hausse ?\nb) Par quel coefficient faudrait-il multiplier pour revenir au chiffre d'affaires de départ ?\nc) Quel taux d'évolution ramène au départ, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "1,25" },
            { question: "b)", attendu: ["0,8","× 0,8"] },
            { question: "c)", attendu: "−20 %" },
          ],
          correction:
            "a) $1 + 0{,}25 = 1{,}25$.\nb) L'inverse : $1 \\div 1{,}25 = 0{,}8$.\nc) $0{,}8 - 1 = -0{,}2$, soit −20 %.\n⛔ Le piège au c) : répondre −25 %. La baisse porte sur une valeur plus grande : il faut moins de 25 % pour redescendre.\nRéponse : a) 1,25 ; b) 0,8 ; c) −20 %.",
          micros: ["auto_evo_reciproque"],
        },
        {
          enonce:
            "Un conseiller en abonnements de transport note qu'un abonnement a augmenté de 10 %, puis baissé de 20 %. Il coûte maintenant 110 €.\na) Quel est le coefficient global ?\nb) Combien l'abonnement coûtait-il au départ ?",
          reponses: [
            { question: "a)", attendu: "0,88" },
            { question: "b)", attendu: "125 €" },
          ],
          correction:
            "a) $1{,}1 \\times 0{,}8 = 0{,}88$.\nb) 110 € est la valeur finale, on divise : $110 \\div 0{,}88 = 125$ €.\nVérification : $125 \\times 1{,}1 = 137{,}50$, puis $137{,}50 \\times 0{,}8 = 110$. ✔\n⛔ Le piège au b) : ajouter 10 % à 110. Le global n'est pas − 10 %, c'est − 12 %, et on remonte en divisant.\nRéponse : a) 0,88 ; b) 125 €.",
          micros: ["auto_evo_chaine_coefficients", "auto_evo_reciproque"],
        },
        {
          enonce:
            "Un club d'escalade compte 400 adhérents (modèle). Leur nombre chute de 25 %, puis remonte de 25 %.\na) Combien y a-t-il d'adhérents à la fin ?\nb) Quel est le coefficient global ?\nc) Quel est le taux d'évolution global, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "375" },
            { question: "b)", attendu: "0,9375" },
            { question: "c)", attendu: "−6,25 %" },
          ],
          correction:
            "a) $400 \\times 0{,}75 = 300$, puis $300 \\times 1{,}25 = 375$ adhérents.\nb) $0{,}75 \\times 1{,}25 = 0{,}9375$.\nc) $0{,}9375 - 1 = -0{,}0625$, soit −6,25 %.\n⛔ Le piège : répondre 400 et 0 %. La remontée de 25 % porte sur 300 adhérents, pas sur 400.\nRéponse : a) 375 ; b) 0,9375 ; c) −6,25 %.",
          micros: ["auto_evo_piege_compensation"],
        },
        {
          enonce:
            "Une ingénieure compare deux usines (modèle). La production de l'usine A augmente de 10 %, puis baisse de 10 %. Celle de l'usine B baisse de 10 %, puis augmente de 10 %.\na) Quel est le coefficient global de A ?\nb) Quel est le coefficient global de B ?\nc) Les deux usines ont-elles la même évolution globale ? Réponds oui ou non.\nd) Quel est le taux global de l'usine A, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)",
          reponses: [
            { question: "a)", attendu: "0,99" },
            { question: "b)", attendu: "0,99" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "−1 %" },
          ],
          correction:
            "a) $1{,}1 \\times 0{,}9 = 0{,}99$.\nb) $0{,}9 \\times 1{,}1 = 0{,}99$ : l'ordre ne change pas un produit.\nc) Oui : les deux coefficients sont égaux.\nd) $0{,}99 - 1 = -0{,}01$, soit −1 %.\n⛔ Le piège : répondre 0 % pour les deux. Dans les deux ordres, la production finit par baisser.\nRéponse : a) 0,99 ; b) 0,99 ; c) oui ; d) −1 %.",
          micros: ["auto_evo_chaine_coefficients", "auto_evo_piege_compensation"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : coefficients, produit, puis retour en arrière si on le demande.",
      rappel: [
        "Capitaliser : on avance en multipliant. Actualiser : on recule en divisant par le coefficient global.",
        "Revenir au départ depuis n'importe quelle valeur : on divise la valeur de départ par la valeur actuelle, cela donne le coefficient de retour.",
        "Vérifier : valeur de départ × coefficient global doit redonner la valeur finale.",
      ],
      exercices: [
        {
          titre: "Le prix du café",
          enonce:
            "Un torréfacteur vend son café 20 € le kilo. Il augmente son prix de 25 % (modèle).\na) Quel est le nouveau prix du kilo ?\nb) Quel taux d'évolution le ramènerait à 20 € ? Donne-le en pourcentage (nombre négatif s'il s'agit d'une baisse).\nc) Finalement, il ne baisse que de 10 %. Quel est le prix du kilo ?\nd) Quel est le taux d'évolution global par rapport à 20 € ?",
          reponses: [
            { question: "a)", attendu: "25 €" },
            { question: "b)", attendu: "−20 %" },
            { question: "c)", attendu: "22,50 €" },
            { question: "d)", attendu: "12,5 %" },
          ],
          correction:
            "a) $20 \\times 1{,}25 = 25$ €.\nb) Le coefficient de retour est $1 \\div 1{,}25 = 0{,}8$, et $0{,}8 - 1 = -0{,}2$, soit −20 %.\nc) $25 \\times 0{,}9 = 22{,}50$ €.\nd) $1{,}25 \\times 0{,}9 = 1{,}125$, et $1{,}125 - 1 = 0{,}125$, soit 12,5 %.\nVérification : $20 \\times 1{,}125 = 22{,}50$. ✔\n⛔ Le piège au d) : calculer $25 - 10 = 15$ %. Les taux ne s'additionnent pas.\nRéponse : a) 25 € ; b) −20 % ; c) 22,50 € ; d) 12,5 %.",
          micros: ["auto_evo_successives", "auto_evo_reciproque"],
        },
        {
          titre: "Le projet d'Inaya",
          enonce:
            "Inaya veut disposer de 12 100 € dans deux ans. Sa conseillère lui propose un placement à 10 % par an, les intérêts restant sur le compte (modèle).\na) Quel est le coefficient global sur deux ans ?\nb) Quel est le taux global sur deux ans ?\nc) Quelle somme Inaya doit-elle placer aujourd'hui ?\nd) Combien d'intérêts aura-t-elle gagnés au bout de deux ans ?",
          reponses: [
            { question: "a)", attendu: "1,21" },
            { question: "b)", attendu: "21 %" },
            { question: "c)", attendu: "10 000 €" },
            { question: "d)", attendu: "2 100 €" },
          ],
          correction:
            "a) $1{,}1 \\times 1{,}1 = 1{,}21$.\nb) $1{,}21 - 1 = 0{,}21$, soit 21 %.\nc) On actualise : on recule en divisant. $12\\,100 \\div 1{,}21 = 10\\,000$ €.\nd) $12\\,100 - 10\\,000 = 2\\,100$ €.\nVérification : $10\\,000 \\times 1{,}21 = 12\\,100$. ✔\n⛔ Le piège au b) : répondre 20 %. La seconde année, les 10 % portent sur 11 000 €, et non sur 10 000 €.\nRéponse : a) 1,21 ; b) 21 % ; c) 10 000 € ; d) 2 100 €.",
          micros: ["auto_evo_successives", "auto_evo_reciproque"],
        },
        {
          titre: "La TVA et la remise",
          enonce:
            "Un vendeur d'électroménager propose un four à 200 € hors taxes. Il ajoute la TVA de 20 %, puis fait une remise de 25 % sur le prix TTC. Un client dit : « 20 − 25 = − 5, je paie donc 5 % de moins que le prix hors taxes ».\na) Quel est le coefficient global ?\nb) Quel est le prix payé ?\nc) Quel est le taux d'évolution par rapport au prix hors taxes ? (nombre négatif s'il s'agit d'une baisse)\nd) La phrase du client est-elle vraie ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: "0,9" },
            { question: "b)", attendu: "180 €" },
            { question: "c)", attendu: "−10 %" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) $1{,}2 \\times 0{,}75 = 0{,}9$.\nb) $200 \\times 0{,}9 = 180$ €.\nVérification : $200 \\times 1{,}2 = 240$, puis $240 \\times 0{,}75 = 180$. ✔\nc) $0{,}9 - 1 = -0{,}1$, soit −10 %.\nd) Faux : c'est 10 % de moins, pas 5 %.\n⛔ Le piège : additionner des taux. La remise porte sur le prix TTC, plus grand que le prix hors taxes.\nRéponse : a) 0,9 ; b) 180 € ; c) −10 % ; d) faux.",
          micros: ["auto_evo_chaine_coefficients", "auto_evo_successives"],
        },
        {
          titre: "La colonie d'oiseaux",
          enonce:
            "Un ornithologue suit une colonie de 500 oiseaux (modèle). Une tempête la fait baisser de 60 %. L'année suivante, la colonie augmente de 60 %.\na) Combien reste-t-il d'oiseaux après la tempête ?\nb) Combien y en a-t-il un an plus tard ?\nc) Quel est le taux d'évolution global, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)\nd) Juste après la tempête, quelle hausse, en pourcentage, aurait ramené la colonie à 500 oiseaux ?",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "320" },
            { question: "c)", attendu: "−36 %" },
            { question: "d)", attendu: "150 %" },
          ],
          correction:
            "a) $500 \\times 0{,}4 = 200$ oiseaux.\nb) $200 \\times 1{,}6 = 320$ oiseaux.\nc) $0{,}4 \\times 1{,}6 = 0{,}64$, et $0{,}64 - 1 = -0{,}36$, soit −36 %.\nd) Le coefficient de retour est $500 \\div 200 = 2{,}5$, et $2{,}5 - 1 = 1{,}5$, soit 150 %.\nVérification : $200 \\times 2{,}5 = 500$. ✔\n⛔ Le piège : croire que + 60 % répare − 60 %. Il faut une hausse bien plus forte, car elle part d'une colonie bien plus petite.\nRéponse : a) 200 ; b) 320 ; c) −36 % ; d) 150 %.",
          micros: ["auto_evo_reciproque", "auto_evo_piege_compensation"],
        },
      ],
    },
  ],
};
