// ─── Fiche d'exercices : espérance d'une variable aléatoire (STMG) — 20 exercices ─
//
// Notion va_esperance du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// demande : E(X) par la somme des valeurs × leur probabilité ; la mise équitable
// et la prime « juste » ; le total sur N répétitions (N × E(X)) ; le verdict
// équitable / favorable / défavorable sur le gain NET ; comparer deux options
// par leur espérance, un montant certain ayant pour espérance lui-même.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives.
//
// Domaines et métiers : un calcul nu (ex. 1) ; kermesse (animatrice), maintenance
// (technicien), épargne (épargnante), handball (entraîneur), boulangerie
// (boulanger), fête foraine (forain), pépinière (pépiniériste), assurance vélo
// (assureur), chamboule-tout (bénévole), parc d'attractions (gérant), radio
// (auditeur), agriculture (agricultrice), musique (groupe invité à un festival), service
// client (responsable), énergie solaire (technicienne), pêche aux canards
// (foraine), assurance smartphone (actuaire), architecture (architecte),
// festival (organisatrice).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Micro-compétences : va_esp_calculer (1, 2, 3, 4, 9, 10, 15, 16, 17, 18, 19),
// va_esp_interpreter (5, 6, 15, 16, 17, 18), va_esp_jeu_equitable (7, 10, 11, 12, 17),
// va_esp_decision (8, 13, 14, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesVaEsperanceStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-esperance",
  titre: "Espérance d'une variable aléatoire",
  accroche:
    "Vingt exercices pour calculer une espérance et s'en servir : prévoir un total sur un grand nombre de répétitions, juger si un jeu est équitable, fixer une mise ou une prime d'assurance, et choisir entre deux options. Une pêche aux canards, une assurance de smartphone, un festival en plein air, des panneaux solaires, un groupe de musique. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer une espérance, l'interpréter, ou comparer deux nombres.",
      rappel: [
        "$E(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n$ : chaque valeur multipliée par SA probabilité, puis on additionne.",
        "$E(X)$ est une moyenne sur un grand nombre de répétitions : sur $N$ répétitions, le total avoisine $N \\times E(X)$. Ce n'est pas une prévision pour une seule fois.",
        "Un jeu est équitable quand l'espérance du gain NET (mise déduite) vaut $0$. Positive : favorable au joueur. Négative : défavorable.",
        "Pour choisir entre deux options, on compare leurs espérances.",
      ],
      exercices: [
        {
          enonce: "La loi de $X$ est donnée par le tableau. Calcule $E(X)$.",
          figure: grille(["xᵢ", "1", "2", "3"], [["P(X = xᵢ)", "0,5", "0,3", "0,2"]]),
          reponses: [{ attendu: "1,7" }],
          correction:
            "On multiplie chaque valeur par sa probabilité, puis on additionne.\n$E(X) = 1 \\times 0{,}5 + 2 \\times 0{,}3 + 3 \\times 0{,}2$\n$E(X) = 0{,}5 + 0{,}6 + 0{,}6 = 1{,}7$.\n⛔ Le piège : additionner seulement les probabilités. Leur somme fait toujours $1$.\nRéponse : 1,7.",
          micros: ["va_esp_calculer"],
        },
        {
          enonce:
            "À un stand de kermesse, $X$ est le gain en euros d'une partie (modèle). Calcule $E(X)$.",
          figure: grille(["xᵢ", "0", "10", "20"], [["P(X = xᵢ)", "0,6", "0,3", "0,1"]]),
          reponses: [{ attendu: "5" }],
          correction:
            "$E(X) = 0 \\times 0{,}6 + 10 \\times 0{,}3 + 20 \\times 0{,}1$\n$E(X) = 0 + 3 + 2 = 5$.\n⛔ Le piège : faire la moyenne de $0$, $10$ et $20$, ce qui donne $10$. Les valeurs n'ont pas la même probabilité : le gain $0$ pèse beaucoup plus lourd.\nRéponse : 5 €.",
          micros: ["va_esp_calculer"],
        },
        {
          enonce:
            "Un technicien note $X$, le nombre de pannes d'une machine à café en une semaine (modèle). Calcule $E(X)$.",
          figure: grille(["xᵢ", "0", "1", "2", "3"], [["P(X = xᵢ)", "0,4", "0,3", "0,2", "0,1"]]),
          reponses: [{ attendu: "1" }],
          correction:
            "$E(X) = 0 \\times 0{,}4 + 1 \\times 0{,}3 + 2 \\times 0{,}2 + 3 \\times 0{,}1$\n$E(X) = 0 + 0{,}3 + 0{,}4 + 0{,}3 = 1$.\n⛔ Le piège : oublier une colonne. Même la valeur $0$ s'écrit, pour ne rien sauter.\nRéponse : 1 panne par semaine en moyenne.",
          micros: ["va_esp_calculer"],
        },
        {
          enonce:
            "Une épargnante place une somme sur un produit risqué. $X$ est son gain en euros au bout d'un an (modèle). Calcule $E(X)$.",
          figure: grille(["xᵢ", "−100", "0", "200"], [["P(X = xᵢ)", "0,3", "0,2", "0,5"]]),
          reponses: [{ attendu: "70" }],
          correction:
            "Une perte est une valeur négative.\n$E(X) = (-100) \\times 0{,}3 + 0 \\times 0{,}2 + 200 \\times 0{,}5$\n$E(X) = -30 + 0 + 100 = 70$.\n⛔ Le piège : oublier le signe moins et trouver $130$.\nRéponse : 70 €.",
          micros: ["va_esp_calculer"],
        },
        {
          enonce:
            "Un entraîneur de handball note $X$, le nombre de buts de sa meilleure joueuse par match. Il a calculé $E(X) = 1{,}5$ (modèle). Sur $40$ matchs, quel total de buts peut-il prévoir, environ ?",
          reponses: [{ attendu: ["60", "environ 60 buts"] }],
          correction:
            "Sur $N$ répétitions, le total avoisine $N \\times E(X)$.\n$40 \\times 1{,}5 = 60$.\n⛔ Le piège : ajouter au lieu de multiplier. $1{,}5$ buts, c'est PAR match.\nRéponse : environ 60 buts.",
          micros: ["va_esp_interpreter"],
        },
        {
          enonce:
            "Un boulanger note $X$, le nombre de clients qui attendent à un instant donné. Il trouve $E(X) = 2{,}3$ (modèle). Que veut dire ce résultat ? Écris la lettre.\nA : il y a toujours $2{,}3$ clients dans la file.\nB : sur un grand nombre d'instants, il y a en moyenne $2{,}3$ clients.\nC : $2{,}3$ est le nombre de clients le plus probable.",
          reponses: [{ attendu: "B" }],
          correction:
            "L'espérance est une MOYENNE sur un grand nombre de répétitions.\nElle n'annonce rien pour un instant précis : on ne voit jamais $2{,}3$ clients.\n⛔ Le piège : choisir A ou C. L'espérance n'est pas une valeur que $X$ doit prendre.\nRéponse : B.",
          micros: ["va_esp_interpreter"],
        },
        {
          enonce:
            "À la fête foraine, une partie coûte $2$ €. On gagne $10$ € avec la probabilité $0{,}2$, et rien sinon.\na) Calcule l'espérance du gain net.\nb) Le jeu est-il équitable, favorable ou défavorable au joueur ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: ["équitable", "il est équitable"] },
          ],
          correction:
            "a) La mise se retire dans les deux cas. Si l'on gagne, le gain net est $10 - 2 = 8$ €. Sinon, il est de $-2$ €.\n$E = 8 \\times 0{,}2 + (-2) \\times 0{,}8 = 1{,}6 - 1{,}6 = 0$.\nb) L'espérance du gain net est nulle : le jeu est équitable.\n⛔ Le piège : oublier la mise et trouver $E = 10 \\times 0{,}2 = 2$. C'est le gain brut.\nRéponse : a) 0 ; b) équitable.",
          micros: ["va_esp_jeu_equitable"],
        },
        {
          enonce:
            "Un pépiniériste hésite entre deux commandes. La commande A rapporterait $1\\,000$ € avec la probabilité $0{,}5$, et rien sinon. La commande B rapporterait $3\\,000$ € avec la probabilité $0{,}2$, et rien sinon.\na) Calcule l'espérance de A.\nb) Calcule l'espérance de B.\nc) Laquelle rapporte le plus en moyenne ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: "500 €" },
            { question: "b)", attendu: "600 €" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) $1\\,000 \\times 0{,}5 = 500$ €.\nb) $3\\,000 \\times 0{,}2 = 600$ €.\nc) $600$ est plus grand que $500$ : c'est B.\n⛔ Le piège : choisir A parce que sa probabilité est plus grande. On compare les espérances, pas les chances.\nRéponse : a) 500 € ; b) 600 € ; c) B.",
          micros: ["va_esp_decision"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on écrit la loi, on calcule l'espérance, puis on répond à la question posée.",
      rappel: [
        "La mise équitable est l'espérance du gain brut (avant de retirer la mise). La prime « juste » d'une assurance est l'espérance du montant remboursé.",
        "Gain net = gain reçu − mise : la mise se retire dans TOUS les cas, même quand on perd.",
        "Pour juger un jeu, on regarde les chances ET les montants.",
        "Un montant certain a pour espérance ce montant lui-même. Le plus gros gain possible n'est pas forcément le meilleur choix.",
      ],
      exercices: [
        {
          enonce:
            "Un assureur couvre le vol d'un vélo électrique. Dans l'année, le vélo est volé avec la probabilité $0{,}04$ (modèle). L'assureur verse alors $1\\,500$ €, et rien sinon. Quelle est la prime « juste », celle qui rend son bénéfice moyen nul ?",
          reponses: [{ attendu: "60 €" }],
          correction:
            "La prime juste est l'espérance du montant versé.\n$E(X) = 1\\,500 \\times 0{,}04 + 0 \\times 0{,}96 = 60$ €.\nEn pratique, l'assureur demande un peu plus pour couvrir ses frais.\n⛔ Le piège : calculer $1\\,500 \\times 4 = 6\\,000$. $4$ %, c'est $0{,}04$.\nRéponse : 60 €.",
          micros: ["va_esp_calculer"],
        },
        {
          enonce:
            "Au chamboule-tout d'une fête d'école, un bénévole annonce (modèle) : on gagne $20$ € avec la probabilité $0{,}1$, on gagne $5$ € avec la probabilité $0{,}2$, et rien sinon. Quelle mise faut-il demander pour que le jeu soit équitable ?",
          reponses: [{ attendu: "3 €" }],
          correction:
            "La mise équitable est l'espérance du gain brut.\n$E = 20 \\times 0{,}1 + 5 \\times 0{,}2 = 2 + 1 = 3$ €.\nAvec une mise de $3$ €, l'espérance du gain net vaut $3 - 3 = 0$. ✔\n⛔ Le piège : proposer la moitié de $20$ €. La mise se calcule avec les probabilités, pas seulement avec les lots.\nRéponse : 3 €.",
          micros: ["va_esp_calculer", "va_esp_jeu_equitable"],
        },
        {
          enonce:
            "Dans un parc d'attractions, un tour de roue coûte $4$ € (modèle). On gagne $20$ € avec la probabilité $0{,}1$, $10$ € avec la probabilité $0{,}1$, et rien sinon.\na) Écris les trois gains nets possibles : celui du lot de $20$ €, celui du lot de $10$ €, puis celui où l'on ne gagne rien, séparés par « ; ».\nb) Calcule l'espérance du gain net.\nc) Le jeu est-il équitable, favorable ou défavorable au joueur ? Écris le mot.",
          reponses: [
            { question: "a)", attendu: "16 ; 6 ; -4", ordre: true },
            { question: "b)", attendu: "-1" },
            { question: "c)", attendu: ["défavorable", "défavorable au joueur"] },
          ],
          correction:
            "a) On retire la mise partout : $20 - 4 = 16$ ; $10 - 4 = 6$ ; $0 - 4 = -4$.\nb) La probabilité de ne rien gagner est $1 - 0{,}1 - 0{,}1 = 0{,}8$.\n$E = 16 \\times 0{,}1 + 6 \\times 0{,}1 + (-4) \\times 0{,}8 = 1{,}6 + 0{,}6 - 3{,}2 = -1$.\nc) L'espérance est négative : le jeu est défavorable au joueur.\n⛔ Le piège au a) : écrire $0$ pour le dernier cas. Celui qui ne gagne rien a quand même payé $4$ €.\nRéponse : a) 16 ; 6 ; −4 ; b) −1 ; c) défavorable.",
          micros: ["va_esp_jeu_equitable"],
        },
        {
          enonce:
            "Une radio locale propose un jeu par téléphone (modèle). L'appel coûte $5$ €. On gagne $8$ € une fois sur deux, et rien sinon. Un auditeur affirme : « le jeu est équitable, puisqu'on gagne une fois sur deux ».\na) Calcule l'espérance du gain net.\nb) L'auditeur a-t-il raison ? Réponds oui ou non.\nc) Quel gain rendrait ce jeu équitable, pour une mise de $5$ € ?",
          reponses: [
            { question: "a)", attendu: "-1" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "10 €" },
          ],
          correction:
            "a) Gain net : $8 - 5 = 3$ € ou $-5$ €.\n$E = 3 \\times 0{,}5 + (-5) \\times 0{,}5 = 1{,}5 - 2{,}5 = -1$.\nb) L'espérance n'est pas nulle : il a tort.\nc) Avec une chance sur deux, il faut un gain égal au double de la mise : $2 \\times 5 = 10$ €. Vérification : $10 \\times 0{,}5 - 5 = 0$. ✔\n⛔ Le piège : juger un jeu sur les chances seules. Les montants comptent autant.\nRéponse : a) −1 ; b) non ; c) 10 €.",
          micros: ["va_esp_jeu_equitable"],
        },
        {
          enonce:
            "Une agricultrice choisit sa culture (modèle). La lavande rapporterait un bénéfice de $3\\,000$ € avec la probabilité $0{,}6$, et rien sinon. Le tournesol rapporterait $8\\,000$ € avec la probabilité $0{,}2$, et rien sinon.\na) Calcule l'espérance du bénéfice de la lavande.\nb) Calcule celle du tournesol.\nc) Quelle culture rapporte le plus en moyenne ? Écris son nom.",
          reponses: [
            { question: "a)", attendu: "1 800 €" },
            { question: "b)", attendu: "1 600 €" },
            { question: "c)", attendu: ["lavande", "la lavande"] },
          ],
          correction:
            "a) $3\\,000 \\times 0{,}6 = 1\\,800$ €.\nb) $8\\,000 \\times 0{,}2 = 1\\,600$ €.\nc) $1\\,800$ est plus grand que $1\\,600$ : c'est la lavande.\n⛔ Le piège : choisir le tournesol à cause de ses $8\\,000$ €. Le plus gros gain possible n'est pas ce qui décide.\nRéponse : a) 1 800 € ; b) 1 600 € ; c) lavande.",
          micros: ["va_esp_decision"],
        },
        {
          enonce:
            "Un groupe de musique est invité dans un festival (modèle). Option garantie : un cachet fixe de $900$ €. Option aléatoire : une part de la billetterie de $2\\,000$ € si le concert affiche complet, ce qui arrive avec la probabilité $0{,}4$, et rien sinon.\na) Calcule l'espérance de l'option aléatoire.\nb) Laquelle rapporte le plus en moyenne ? Écris garantie ou aléatoire.",
          reponses: [
            { question: "a)", attendu: "800 €" },
            { question: "b)", attendu: ["garantie", "option garantie", "l'option garantie"] },
          ],
          correction:
            "a) $2\\,000 \\times 0{,}4 = 800$ €.\nb) Un montant certain a pour espérance lui-même : $900$ €. Or $900$ est plus grand que $800$ : c'est l'option garantie.\n⛔ Le piège : croire qu'on ne peut pas comparer un gain sûr et un gain aléatoire. L'espérance sert justement à cela.\nRéponse : a) 800 € ; b) garantie.",
          micros: ["va_esp_decision"],
        },
        {
          enonce:
            "La responsable d'un service client note $X$, le nombre de réclamations reçues en un jour (modèle).\na) Calcule $E(X)$.\nb) Sur $250$ jours, combien de réclamations peut-elle prévoir au total, environ ?",
          figure: grille(["xᵢ", "0", "1", "2", "4"], [["P(X = xᵢ)", "0,3", "0,4", "0,2", "0,1"]]),
          reponses: [
            { question: "a)", attendu: "1,2" },
            { question: "b)", attendu: "300" },
          ],
          correction:
            "a) $E(X) = 0 \\times 0{,}3 + 1 \\times 0{,}4 + 2 \\times 0{,}2 + 4 \\times 0{,}1 = 0{,}4 + 0{,}4 + 0{,}4 = 1{,}2$.\nb) $250 \\times 1{,}2 = 300$ réclamations.\n⛔ Le piège au a) : refuser le résultat parce qu'on ne reçoit jamais $1{,}2$ réclamation. Une espérance n'a pas à être une valeur de $X$.\nRéponse : a) 1,2 ; b) environ 300.",
          micros: ["va_esp_calculer", "va_esp_interpreter"],
        },
        {
          enonce:
            "Une technicienne suit une installation solaire. $X$ est sa production d'un jour d'été, en kWh (modèle).\na) Calcule $E(X)$.\nb) Quelle production totale peut-elle prévoir sur $30$ jours, environ ?",
          figure: grille(["xᵢ", "10", "20", "30"], [["P(X = xᵢ)", "0,2", "0,5", "0,3"]]),
          reponses: [
            { question: "a)", attendu: "21 kWh" },
            { question: "b)", attendu: ["630 kWh", "environ 630 kWh"] },
          ],
          correction:
            "a) $E(X) = 10 \\times 0{,}2 + 20 \\times 0{,}5 + 30 \\times 0{,}3 = 2 + 10 + 9 = 21$ kWh.\nb) $30 \\times 21 = 630$ kWh.\n⛔ Le piège au a) : répondre $20$, la valeur du milieu. L'espérance tient compte des probabilités.\nRéponse : a) 21 kWh ; b) environ 630 kWh.",
          micros: ["va_esp_calculer", "va_esp_interpreter"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : écrire la loi, calculer l'espérance, décider, puis prévoir sur un grand nombre de cas.",
      rappel: [
        "Espérance du gain net = espérance du gain brut − mise.",
        "Une perte est une valeur négative dans la loi.",
        "Quand une probabilité change, l'espérance change : on refait le calcul avant de décider.",
      ],
      exercices: [
        {
          titre: "La pêche aux canards",
          enonce:
            "Une foraine met $50$ canards dans son bassin : $30$ ne rapportent rien, $15$ font gagner $2$ €, $4$ font gagner $10$ € et $1$ fait gagner $20$ €. Une partie coûte $2$ € : on pêche un canard au hasard. $X$ est le gain brut en euros.\na) Donne les probabilités des gains $0$, $2$, $10$ et $20$ dans cet ordre, séparées par « ; ».\nb) Calcule $E(X)$.\nc) Calcule l'espérance du gain net.\nd) Le jeu est-il équitable, favorable ou défavorable au joueur ? Écris le mot.\ne) Sur $500$ parties, quel bénéfice la foraine peut-elle attendre, environ ?",
          reponses: [
            { question: "a)", attendu: "0,6 ; 0,3 ; 0,08 ; 0,02", ordre: true },
            { question: "b)", attendu: "1,8" },
            { question: "c)", attendu: "-0,2" },
            { question: "d)", attendu: ["défavorable", "défavorable au joueur"] },
            { question: "e)", attendu: "100 €" },
          ],
          correction:
            "a) $30 \\div 50 = 0{,}6$ ; $15 \\div 50 = 0{,}3$ ; $4 \\div 50 = 0{,}08$ ; $1 \\div 50 = 0{,}02$.\nb) $E(X) = 0 \\times 0{,}6 + 2 \\times 0{,}3 + 10 \\times 0{,}08 + 20 \\times 0{,}02 = 0{,}6 + 0{,}8 + 0{,}4 = 1{,}8$.\nc) On retire la mise : $1{,}8 - 2 = -0{,}2$.\nd) L'espérance est négative : défavorable au joueur.\ne) Le joueur perd $0{,}20$ € par partie en moyenne : $500 \\times 0{,}2 = 100$ € pour la foraine.\n⛔ Le piège au e) : garder le signe moins. Ce que perd le joueur, la foraine le gagne.\nRéponse : a) 0,6 ; 0,3 ; 0,08 ; 0,02 ; b) 1,8 ; c) −0,2 ; d) défavorable ; e) 100 €.",
          micros: ["va_esp_calculer", "va_esp_jeu_equitable", "va_esp_interpreter"],
        },
        {
          titre: "L'assurance du smartphone",
          enonce:
            "Une actuaire étudie une assurance de smartphone (modèle). Dans l'année, l'assureur verse $200$ € en cas de casse (probabilité $0{,}1$), $600$ € en cas de vol (probabilité $0{,}02$), et rien sinon.\na) Calcule l'espérance du montant versé par contrat.\nb) Quelle est la prime « juste » ?\nc) L'assureur demande $40$ € par an. Quel est son bénéfice moyen par contrat ?\nd) Quel bénéfice peut-il attendre sur $5\\,000$ contrats, environ ?",
          reponses: [
            { question: "a)", attendu: "32 €" },
            { question: "b)", attendu: "32 €" },
            { question: "c)", attendu: "8 €" },
            { question: "d)", attendu: "40 000 €" },
          ],
          correction:
            "a) $200 \\times 0{,}1 + 600 \\times 0{,}02 = 20 + 12 = 32$ €.\nb) La prime juste est cette espérance : $32$ €.\nc) $40 - 32 = 8$ € par contrat en moyenne.\nd) $5\\,000 \\times 8 = 40\\,000$ €.\n⛔ Le piège au d) : multiplier $5\\,000$ par $40$. Cela donne les primes encaissées, pas le bénéfice.\nRéponse : a) 32 € ; b) 32 € ; c) 8 € ; d) 40 000 €.",
          micros: ["va_esp_calculer", "va_esp_interpreter"],
        },
        {
          titre: "Les deux projets de l'architecte",
          enonce:
            "Une architecte ne peut préparer qu'un seul concours (modèle). Le projet de la mairie rapporte $12\\,000$ € avec la probabilité $0{,}25$, sinon il fait perdre $1\\,000$ €. Le projet de l'école rapporte $5\\,000$ € avec la probabilité $0{,}6$, sinon il fait perdre $500$ €.\na) Calcule l'espérance du projet de la mairie.\nb) Calcule celle du projet de l'école.\nc) Lequel rapporte le plus en moyenne ? Écris mairie ou école.\nd) Sur $10$ concours semblables, quel écart peut-on attendre entre les deux choix, environ ?",
          reponses: [
            { question: "a)", attendu: "2 250 €" },
            { question: "b)", attendu: "2 800 €" },
            { question: "c)", attendu: ["école", "l'école"] },
            { question: "d)", attendu: "5 500 €" },
          ],
          correction:
            "a) La perte a la probabilité $1 - 0{,}25 = 0{,}75$. $12\\,000 \\times 0{,}25 + (-1\\,000) \\times 0{,}75 = 3\\,000 - 750 = 2\\,250$ €.\nb) La perte a la probabilité $0{,}4$. $5\\,000 \\times 0{,}6 + (-500) \\times 0{,}4 = 3\\,000 - 200 = 2\\,800$ €.\nc) $2\\,800$ est plus grand que $2\\,250$ : c'est l'école.\nd) Par concours : $2\\,800 - 2\\,250 = 550$ €. Sur $10$ : $5\\,500$ €.\n⛔ Le piège au a) : oublier la perte et s'arrêter à $3\\,000$ €. Les deux projets auraient alors la même espérance.\nRéponse : a) 2 250 € ; b) 2 800 € ; c) école ; d) 5 500 €.",
          micros: ["va_esp_decision", "va_esp_calculer"],
        },
        {
          titre: "Plein air ou salle",
          enonce:
            "L'organisatrice d'un festival compare deux formules (modèle). En plein air, elle gagne $20\\,000$ € s'il fait beau (probabilité $0{,}7$) et perd $5\\,000$ € s'il pleut. En salle, elle gagne $12\\,000$ € à coup sûr.\na) Calcule l'espérance de la formule en plein air.\nb) Quelle est l'espérance de la formule en salle ?\nc) Laquelle rapporte le plus en moyenne ? Écris plein air ou salle.\nd) Une nouvelle prévision donne $0{,}6$ comme probabilité de beau temps. Calcule la nouvelle espérance du plein air.\ne) Quelle formule choisir maintenant ? Écris plein air ou salle.",
          reponses: [
            { question: "a)", attendu: "12 500 €" },
            { question: "b)", attendu: "12 000 €" },
            { question: "c)", attendu: ["plein air", "en plein air", "le plein air"] },
            { question: "d)", attendu: "10 000 €" },
            { question: "e)", attendu: ["salle", "en salle", "la salle"] },
          ],
          correction:
            "a) La pluie a la probabilité $0{,}3$. $20\\,000 \\times 0{,}7 + (-5\\,000) \\times 0{,}3 = 14\\,000 - 1\\,500 = 12\\,500$ €.\nb) Un montant certain a pour espérance lui-même : $12\\,000$ €.\nc) $12\\,500$ est plus grand que $12\\,000$ : plein air.\nd) La pluie a maintenant la probabilité $0{,}4$. $20\\,000 \\times 0{,}6 + (-5\\,000) \\times 0{,}4 = 12\\,000 - 2\\,000 = 10\\,000$ €.\ne) $10\\,000$ est plus petit que $12\\,000$ : la salle.\n⛔ Le piège au d) : changer seulement la probabilité du beau temps et garder $0{,}3$ pour la pluie. Les deux doivent toujours faire $1$.\nRéponse : a) 12 500 € ; b) 12 000 € ; c) plein air ; d) 10 000 € ; e) salle.",
          micros: ["va_esp_decision"],
        },
      ],
    },
  ],
};
