// ─── Fiche d'exercices : coefficient multiplicateur (STMG) — 20 exercices ───────
//
// Notion auto_evo_coefficient du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts` et son
// renfort `seconde/maths/evolutions-lycee-renfort.ts`). C'est un AUTOMATISME : le
// coach demande de traduire une hausse ou une baisse par un coefficient, de lire
// un coefficient, de calculer une valeur finale, de remonter à une valeur
// initiale en DIVISANT (dont prix TTC → prix HT). Rien de plus.
//
// ⭐ LES SEULES DONNÉES RÉELLES, sourcées :
//   · ex. 11 — TVA au taux normal de 20 % (Code général des impôts, art. 278) ;
//   · ex. 19 — TVA de 5,5 % sur les livres (CGI, art. 278-0 bis).
// Les montants de ces deux exercices sont fictifs ; tout le reste est un modèle
// ou une situation visiblement fictive.
//
// Domaines et métiers : boulangerie (boulangère), salle de sport (coach sportif),
// vélos (vélociste), musée (directrice), immobilier (agente) ; trois calculs nus
// (ex. 2, 5 et 8) ; hôpital (cadre de santé), climat (météorologue), garage
// (garagiste), concert (billetterie), verger (arboricultrice), vidéo (vidéaste),
// natation (entraîneuse), restauration (restauratrice), ressources humaines
// (responsable RH), forêt (ingénieure forestière), librairie (libraire), énergie
// (thermicienne et technicien).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-3.mjs`.
//
// Micro-compétences : auto_evo_additif_multiplicatif (1, 2, 3, 11, 14, 17, 19),
// auto_evo_diminution (4, 5, 6, 9, 10, 15, 18, 20), auto_evo_valeur_finale (7, 8,
// 9, 10, 11, 14, 15, 16, 17, 18, 19), auto_evo_valeur_initiale (11, 12, 13, 17,
// 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const exercicesAutoEvoCoefficientStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-evo-coefficient",
  titre: "Coefficient multiplicateur",
  accroche:
    "Vingt exercices pour qu'une hausse de 7 % appelle aussitôt « × 1,07 » : traduire une hausse ou une baisse par un coefficient, lire un coefficient, calculer une valeur finale, et remonter à la valeur de départ en divisant. Une boulangerie, un garage et sa TVA, une forêt après la tempête, une librairie, un bâtiment mieux isolé. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire un coefficient, lire un coefficient, ou calculer une valeur finale.",
      rappel: [
        "Une hausse de t % : on multiplie par 1 + t ÷ 100. Exemple : + 7 %, c'est × 1,07.",
        "Une baisse de t % : on multiplie par 1 − t ÷ 100. Exemple : − 7 %, c'est × 0,93.",
        "Lire un coefficient : au-dessus de 1, c'est une hausse ; en dessous de 1, c'est une baisse. L'écart à 1 donne le taux.",
        "Valeur finale = valeur initiale × coefficient.",
      ],
      exercices: [
        {
          enonce:
            "Une boulangère augmente le prix de sa baguette de 8 %. Par quel nombre le prix est-il multiplié ?",
          reponses: [{ attendu: ["1,08", "× 1,08"] }],
          correction:
            "Une hausse de 8 % : on garde le prix entier (1) et on ajoute la hausse.\n$1 + 8 \\div 100 = 1 + 0{,}08 = 1{,}08$.\n⛔ Le piège : répondre 0,08. Ce nombre donne seulement la hausse, il oublie le prix de départ.\nRéponse : 1,08.",
          micros: ["auto_evo_additif_multiplicatif"],
        },
        {
          enonce:
            "Écris le coefficient multiplicateur de chaque hausse.\na) + 30 %\nb) + 3 %\nc) + 100 %",
          reponses: [
            { question: "a)", attendu: "1,3" },
            { question: "b)", attendu: "1,03" },
            { question: "c)", attendu: "2" },
          ],
          correction:
            "On ajoute toujours t ÷ 100 à 1.\na) $1 + 0{,}3 = 1{,}3$.\nb) $1 + 0{,}03 = 1{,}03$.\nc) $1 + 1 = 2$ : une hausse de 100 %, c'est un doublement.\n⛔ Le piège au b) : écrire 1,3. Or 3 ÷ 100 = 0,03, et 1,3 correspond à une hausse de 30 %.\nRéponse : a) 1,3 ; b) 1,03 ; c) 2.",
          micros: ["auto_evo_additif_multiplicatif"],
        },
        {
          enonce:
            "Le coach d'une salle de sport constate que son nombre d'abonnés a été multiplié par 1,15. De combien de pour cent a-t-il augmenté ?",
          reponses: [{ attendu: "15 %" }],
          correction:
            "Ce qui dépasse 1 dans le coefficient, c'est la hausse.\n$1{,}15 - 1 = 0{,}15$, soit 15 %.\n⛔ Le piège : répondre 115 %. On oublierait de retirer le point de départ.\nRéponse : 15 %.",
          micros: ["auto_evo_additif_multiplicatif"],
        },
        {
          enonce:
            "Un vélociste applique une remise de 25 %. Par quel nombre le prix est-il multiplié ?",
          reponses: [{ attendu: ["0,75", "× 0,75"] }],
          correction:
            "Le client paie ce qui reste : on retire le taux à 1.\n$1 - 25 \\div 100 = 1 - 0{,}25 = 0{,}75$.\n⛔ Le piège : répondre 0,25. C'est la part retirée, pas celle que le client paie.\nRéponse : 0,75.",
          micros: ["auto_evo_diminution"],
        },
        {
          enonce:
            "Écris le coefficient multiplicateur de chaque baisse.\na) − 3 %\nb) − 40 %\nc) − 12,5 %",
          reponses: [
            { question: "a)", attendu: "0,97" },
            { question: "b)", attendu: "0,6" },
            { question: "c)", attendu: "0,875" },
          ],
          correction:
            "On retire toujours t ÷ 100 à 1.\na) $1 - 0{,}03 = 0{,}97$.\nb) $1 - 0{,}4 = 0{,}6$.\nc) $1 - 0{,}125 = 0{,}875$.\n⛔ Le piège au a) : écrire 0,3 ou 0,03. Une baisse de 3 % est toute petite : le coefficient reste tout proche de 1.\nRéponse : a) 0,97 ; b) 0,6 ; c) 0,875.",
          micros: ["auto_evo_diminution"],
        },
        {
          enonce:
            "La directrice d'un musée constate que la fréquentation a été multipliée par 0,85.\na) Est-ce une hausse ou une baisse ? Réponds hausse ou baisse.\nb) De combien de pour cent ?",
          reponses: [
            { question: "a)", attendu: ["baisse","une baisse"] },
            { question: "b)", attendu: ["15 %","−15 %"] },
          ],
          correction:
            "a) 0,85 est plus petit que 1 : c'est une baisse.\nb) L'écart à 1 donne le taux : $1 - 0{,}85 = 0{,}15$, soit 15 %.\n⛔ Le piège au b) : répondre 85 %. Le nombre 0,85 dit ce qui RESTE, pas ce qui est perdu.\nRéponse : a) baisse ; b) 15 %.",
          micros: ["auto_evo_diminution"],
        },
        {
          enonce:
            "Une agente immobilière gère un studio dont le loyer est de 600 €. Le loyer augmente de 5 %. Quel est le nouveau loyer ?",
          reponses: [{ attendu: "630 €" }],
          correction:
            "Une hausse de 5 % : le coefficient est 1,05.\nValeur finale = valeur initiale × coefficient : $600 \\times 1{,}05 = 630$ €.\n⛔ Le piège : calculer $600 + 5 = 605$. Un pourcentage n'est pas une somme en euros.\nRéponse : 630 €.",
          micros: ["auto_evo_valeur_finale"],
        },
        {
          enonce:
            "Calcule la valeur finale.\na) 200 augmente de 10 %.\nb) 120 baisse de 25 %.\nc) 40 baisse de 50 %.",
          reponses: [
            { question: "a)", attendu: "220" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "a) $200 \\times 1{,}1 = 220$.\nb) $120 \\times 0{,}75 = 90$.\nc) $40 \\times 0{,}5 = 20$.\n⛔ Le piège au b) : multiplier par 0,25. On obtiendrait 30, la baisse elle-même, et non ce qui reste.\nRéponse : a) 220 ; b) 90 ; c) 20.",
          micros: ["auto_evo_valeur_finale"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : écrire le coefficient d'abord, puis choisir entre multiplier et diviser.",
      rappel: [
        "Retrouver la valeur initiale : valeur initiale = valeur finale ÷ coefficient.",
        "Le pourcentage porte sur la valeur de DÉPART : on ne le retire pas à la valeur finale.",
        "Prix TTC = prix HT × (1 + taux de TVA) : la TVA est une hausse comme une autre.",
      ],
      exercices: [
        {
          enonce:
            "Une cadre de santé suit un service d'hôpital qui accueille 240 patients par mois (modèle). Ce nombre baisse de 15 %.\na) Quel est le coefficient multiplicateur ?\nb) Combien de patients le service accueille-t-il désormais par mois ?",
          reponses: [
            { question: "a)", attendu: "0,85" },
            { question: "b)", attendu: "204" },
          ],
          correction:
            "a) Une baisse de 15 % : $1 - 0{,}15 = 0{,}85$.\nb) $240 \\times 0{,}85 = 204$ patients.\n⛔ Le piège au b) : calculer $240 - 15 = 225$. On retire 15 % de 240, pas 15 patients.\nRéponse : a) 0,85 ; b) 204 patients.",
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale"],
        },
        {
          enonce:
            "Un météorologue étudie une station qui recevait 1 800 mm de pluie par an (modèle). La pluie baisse de 12 %.\na) Quel est le coefficient multiplicateur ?\nb) Quelle est la nouvelle hauteur de pluie annuelle ?\nc) De combien de millimètres la pluie a-t-elle baissé ?",
          reponses: [
            { question: "a)", attendu: "0,88" },
            { question: "b)", attendu: "1 584 mm" },
            { question: "c)", attendu: "216 mm" },
          ],
          correction:
            "a) $1 - 0{,}12 = 0{,}88$.\nb) $1\\,800 \\times 0{,}88 = 1\\,584$ mm.\nc) $1\\,800 - 1\\,584 = 216$ mm.\nVérification : 12 % de 1 800, c'est $1\\,800 \\times 0{,}12 = 216$. ✔\n⛔ Le piège au a) : écrire 0,12. C'est la part perdue ; il reste 88 %.\nRéponse : a) 0,88 ; b) 1 584 mm ; c) 216 mm.",
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale"],
        },
        {
          enonce:
            "Un garagiste facture une réparation 250 € hors taxes. La TVA est de 20 %.\na) Par quel coefficient passe-t-on du prix HT au prix TTC ?\nb) Quel est le prix TTC de cette réparation ?\nc) Sur une autre facture, le prix TTC est de 540 €. Quel est le prix HT ?",
          reponses: [
            { question: "a)", attendu: ["1,2","× 1,2"] },
            { question: "b)", attendu: "300 €" },
            { question: "c)", attendu: "450 €" },
          ],
          correction:
            "a) La TVA est une hausse de 20 % : $1 + 0{,}2 = 1{,}2$.\nb) $250 \\times 1{,}2 = 300$ €.\nc) Le prix TTC est la valeur finale. On remonte en divisant : $540 \\div 1{,}2 = 450$ €.\nVérification : $450 \\times 1{,}2 = 540$. ✔\n⛔ Le piège au c) : retirer 20 % de 540, ce qui donne 432 €. Les 20 % portent sur le prix HT, pas sur le prix TTC.\nRéponse : a) 1,2 ; b) 300 € ; c) 450 €.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
        {
          enonce:
            "Pour un concert, la billetterie fait une remise de 20 %. Après la remise, le billet coûte 36 €.\na) Quel est le coefficient de la remise ?\nb) Quel était le prix du billet avant la remise ?",
          reponses: [
            { question: "a)", attendu: "0,8" },
            { question: "b)", attendu: "45 €" },
          ],
          correction:
            "a) $1 - 0{,}2 = 0{,}8$.\nb) Prix avant × 0,8 = 36. On divise : $36 \\div 0{,}8 = 45$ €.\nVérification : $45 \\times 0{,}8 = 36$. ✔\n⛔ Le piège au b) : ajouter 20 % à 36 (ce qui donne 43,20 €). Les 20 % portent sur le prix d'avant la remise, pas sur 36 €.\nRéponse : a) 0,8 ; b) 45 €.",
          micros: ["auto_evo_valeur_initiale"],
        },
        {
          enonce:
            "Une arboricultrice voit sa récolte de pommes augmenter de 25 % (modèle). Elle atteint maintenant 15 tonnes.\na) Quel est le coefficient de la hausse ?\nb) Quelle était la récolte avant la hausse ?",
          reponses: [
            { question: "a)", attendu: "1,25" },
            { question: "b)", attendu: "12 t" },
          ],
          correction:
            "a) $1 + 0{,}25 = 1{,}25$.\nb) On connaît la valeur APRÈS la hausse : on divise. $15 \\div 1{,}25 = 12$ tonnes.\nVérification : $12 \\times 1{,}25 = 15$. ✔\n⛔ Le piège au b) : retirer 25 % de 15, ce qui donne 11,25 t. Le pourcentage porte sur l'ancienne valeur.\nRéponse : a) 1,25 ; b) 12 t.",
          micros: ["auto_evo_valeur_initiale"],
        },
        {
          enonce:
            "Une vidéaste compte 2 000 abonnés. En un an, ce nombre augmente de 150 % (modèle).\na) Quel est le coefficient multiplicateur ?\nb) Combien d'abonnés a-t-elle maintenant ?",
          reponses: [
            { question: "a)", attendu: "2,5" },
            { question: "b)", attendu: "5 000" },
          ],
          correction:
            "a) $1 + 150 \\div 100 = 1 + 1{,}5 = 2{,}5$.\nb) $2\\,000 \\times 2{,}5 = 5\\,000$ abonnés.\n⛔ Le piège au a) : écrire 1,5. Or 1,5, c'est une hausse de 50 %. Une hausse de 100 % double déjà : au-delà, le coefficient dépasse 2.\nRéponse : a) 2,5 ; b) 5 000 abonnés.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale"],
        },
        {
          enonce:
            "Une entraîneuse de natation vise une baisse de 5 % du temps de son nageur sur 100 m, aujourd'hui de 80 secondes.\na) Quel est le coefficient multiplicateur ?\nb) Quel temps vise-t-elle ?\nc) Le record du club est de 75 secondes. Ce temps visé bat-il le record ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,95" },
            { question: "b)", attendu: "76 s" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $1 - 0{,}05 = 0{,}95$.\nb) $80 \\times 0{,}95 = 76$ secondes.\nc) En natation, le meilleur temps est le plus petit. 76 est plus grand que 75 : le record n'est pas battu.\n⛔ Le piège au b) : calculer $80 - 5 = 75$ et croire le record égalé. On retire 5 % de 80, soit 4 secondes.\nRéponse : a) 0,95 ; b) 76 s ; c) non.",
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale"],
        },
        {
          enonce:
            "Une restauratrice augmente de 10 % le prix d'un plat à 18 €.\na) Quel calcul donne le nouveau prix ? Écris sa lettre.\nA : $18 + 10$\nB : $18 \\times 0{,}1$\nC : $18 \\times 1{,}1$\nD : $18 \\div 1{,}1$\nb) Quel est le nouveau prix ?",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "19,80 €" },
          ],
          correction:
            "a) Une hausse de 10 %, c'est × 1,1 : le bon calcul est le C.\nb) $18 \\times 1{,}1 = 19{,}80$ €.\n⛔ Le piège au a) : choisir le B. $18 \\times 0{,}1 = 1{,}80$ est seulement la hausse, sans le prix de départ. Le D sert à remonter en arrière.\nRéponse : a) C ; b) 19,80 €.",
          micros: ["auto_evo_valeur_finale"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : le coefficient d'abord, puis multiplier vers l'avant ou diviser vers l'arrière.",
      rappel: [
        "On connaît la valeur de départ : on multiplie par le coefficient.",
        "On connaît la valeur d'arrivée : on divise par le coefficient.",
        "Vérifier : on refait le calcul dans l'autre sens, on doit retomber sur le nombre de départ.",
      ],
      exercices: [
        {
          titre: "La hausse des salaires",
          enonce:
            "Une responsable RH applique une hausse de 3,5 % à tous les salaires (modèle). Sami gagnait 2 000 € par mois.\na) Quel est le coefficient multiplicateur ?\nb) Quel est le nouveau salaire de Sami ?\nc) Après la même hausse, Awa touche 1 863 €. Quel était son salaire avant ?\nd) Combien Awa gagne-t-elle de plus par mois ?",
          reponses: [
            { question: "a)", attendu: "1,035" },
            { question: "b)", attendu: "2 070 €" },
            { question: "c)", attendu: "1 800 €" },
            { question: "d)", attendu: "63 €" },
          ],
          correction:
            "a) $1 + 3{,}5 \\div 100 = 1 + 0{,}035 = 1{,}035$.\nb) $2\\,000 \\times 1{,}035 = 2\\,070$ €.\nc) 1 863 € est la valeur après la hausse : $1\\,863 \\div 1{,}035 = 1\\,800$ €.\nd) $1\\,863 - 1\\,800 = 63$ €.\nVérification : $1\\,800 \\times 1{,}035 = 1\\,863$. ✔\n⛔ Le piège au a) : écrire 1,35. Or 3,5 ÷ 100 = 0,035, et 1,35 serait une hausse de 35 %.\nRéponse : a) 1,035 ; b) 2 070 € ; c) 1 800 € ; d) 63 €.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
        {
          titre: "La forêt après la tempête",
          enonce:
            "Une ingénieure forestière fait le bilan d'une tempête (modèle). Une forêt de 5 000 arbres perd 12 % de ses arbres. Une forêt voisine perd 20 % de ses arbres, et il lui en reste 6 000.\na) Quel est le coefficient de la baisse pour la première forêt ?\nb) Combien d'arbres reste-t-il dans la première forêt ?\nc) Combien d'arbres la forêt voisine avait-elle avant la tempête ?\nd) Combien d'arbres la forêt voisine a-t-elle perdus ?",
          reponses: [
            { question: "a)", attendu: "0,88" },
            { question: "b)", attendu: "4 400" },
            { question: "c)", attendu: "7 500" },
            { question: "d)", attendu: "1 500" },
          ],
          correction:
            "a) $1 - 0{,}12 = 0{,}88$.\nb) $5\\,000 \\times 0{,}88 = 4\\,400$ arbres.\nc) Le coefficient est $1 - 0{,}2 = 0{,}8$, et 6 000 est la valeur d'arrivée : $6\\,000 \\div 0{,}8 = 7\\,500$ arbres.\nd) $7\\,500 - 6\\,000 = 1\\,500$ arbres.\nVérification : 20 % de 7 500, c'est $7\\,500 \\times 0{,}2 = 1\\,500$. ✔\n⛔ Le piège au c) : ajouter 20 % à 6 000, ce qui donne 7 200. Les 20 % portent sur le nombre d'arbres d'AVANT la tempête.\nRéponse : a) 0,88 ; b) 4 400 ; c) 7 500 ; d) 1 500.",
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
        {
          titre: "La TVA du livre",
          enonce:
            "Un libraire vend des livres, soumis à une TVA de 5,5 %.\na) Par quel coefficient passe-t-on du prix HT au prix TTC ?\nb) Un roman coûte 20 € HT. Quel est son prix TTC ?\nc) Une bande dessinée coûte 12,66 € TTC. Quel est son prix HT ?\nd) Quel est le montant de la TVA sur cette bande dessinée ?",
          reponses: [
            { question: "a)", attendu: "1,055" },
            { question: "b)", attendu: "21,10 €" },
            { question: "c)", attendu: "12 €" },
            { question: "d)", attendu: "0,66 €" },
          ],
          correction:
            "a) $1 + 5{,}5 \\div 100 = 1 + 0{,}055 = 1{,}055$.\nb) $20 \\times 1{,}055 = 21{,}10$ €.\nc) On remonte du TTC au HT en divisant : $12{,}66 \\div 1{,}055 = 12$ €.\nd) $12{,}66 - 12 = 0{,}66$ €.\nVérification : $12 \\times 0{,}055 = 0{,}66$. ✔\n⛔ Le piège au a) : écrire 1,55. Le taux de 5,5 % s'écrit 0,055, car on décale la virgule de deux rangs.\nRéponse : a) 1,055 ; b) 21,10 € ; c) 12 € ; d) 0,66 €.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
        {
          titre: "Le calcul du technicien",
          enonce:
            "Une thermicienne contrôle un bâtiment après isolation (modèle). Sa consommation a baissé de 30 % et vaut maintenant 8 400 kWh par an. Un technicien écrit : « avant, il consommait 8 400 + 30 %, soit 10 920 kWh ».\na) Quel est le coefficient de la baisse ?\nb) Quelle était la consommation avant l'isolation ?\nc) Le calcul du technicien est-il juste ? Réponds oui ou non.\nd) Combien de kWh l'isolation fait-elle économiser par an ?",
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "12 000 kWh" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "3 600 kWh" },
          ],
          correction:
            "a) $1 - 0{,}3 = 0{,}7$.\nb) 8 400 est la valeur d'arrivée : $8\\,400 \\div 0{,}7 = 12\\,000$ kWh.\nVérification : $12\\,000 \\times 0{,}7 = 8\\,400$. ✔\nc) Non : il a fait $8\\,400 \\times 1{,}3 = 10\\,920$, et 30 % de 8 400 n'est pas la baisse. Les 30 % portent sur la consommation d'avant.\nd) $12\\,000 - 8\\,400 = 3\\,600$ kWh.\n⛔ Le piège : remonter en ajoutant le pourcentage. Pour revenir en arrière, on divise par le coefficient.\nRéponse : a) 0,7 ; b) 12 000 kWh ; c) non ; d) 3 600 kWh.",
          micros: ["auto_evo_diminution", "auto_evo_valeur_initiale"],
        },
      ],
    },
  ],
};
