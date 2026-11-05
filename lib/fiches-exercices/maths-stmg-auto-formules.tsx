// ─── Fiche d'exercices : formules et calcul littéral (STMG) — 20 exercices ──────
//
// Notion auto_formules du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts`). Le coach
// demande : réduire $(ax + b) - (cx + d)$ et repérer le moins mal distribué,
// isoler une lettre dans une égalité ($B = R - C$, $CA = p \times q$,
// $P = 2(L + l)$, $d = v \times t$, $T = A \div B$, $C = f + u \times x$), dire
// quelle opération on applique aux deux membres, remplacer les lettres par des
// valeurs, et remonter à une donnée manquante (prix HT depuis le prix TTC). Il
// ne demande pas d'isoler une lettre dans une inégalité : la feuille non plus.
//
// ⚠️ Correcteur : les MINUSCULES s'évaluent (a, b, c, d, f, p, q, t, u, v, x…),
// les majuscules se comparent au texte. D'où des minuscules quand l'écriture
// peut varier, et la liste des formes pour $B = R - C$, $M = V - A$ et $CA$.
//
// ⭐ DONNÉES RÉELLES, sourcées :
//   · ex. 14 — la TVA de 5,5 % sur le livre en France (taux réduit, article 278-0 bis
//     du Code général des impôts). Le prix du livre est fictif.
//   · ex. 20 — la formule de conversion °C → °F : F = 1,8 × C + 32 (définition de
//     l'échelle Fahrenheit : eau à 32 °F et 212 °F).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; stage en comptabilité (ex. 9),
// sérigraphie (imprimeuse), cyclisme (entraîneur), élevage (éleveuse), santé
// (infirmier), librairie (libraire), savonnerie (artisane), fleuristerie
// (fleuriste) ; plomberie (plombier), football (responsable billetterie),
// commerce équitable (trésorière d'association), climat (climatologue).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-1.mjs`.
//
// Micro-compétences : auto_alg_litteral (1, 2, 9, 10, 19), auto_alg_isoler_variable
// (3, 4, 5, 11, 12, 13, 15, 16, 17, 18, 20), auto_alg_application_formule (6, 7, 8,
// 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Une somme, dans tous ses ordres : la FORME compte (`exact`), pas l'ordre des termes. */
const ordres = (...termes: string[]): string[] =>
  termes.length <= 1
    ? termes
    : termes.flatMap((t, i) =>
        ordres(...termes.filter((_, j) => j !== i)).map((reste) => t + (reste.startsWith("-") ? reste : `+${reste}`)),
      );

export const exercicesAutoFormulesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-formules",
  titre: "Formules et calcul littéral",
  accroche:
    "Vingt exercices pour lire une formule dans tous les sens : réduire sans se tromper de signe, isoler une lettre, remplacer les lettres par des valeurs, retrouver la donnée qui manque. Un vélo, un enclos, une perfusion, un livre et sa TVA, le devis d'un plombier, un stade, et les degrés Fahrenheit. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : réduire, isoler une lettre, ou remplacer les lettres par des valeurs.",
      rappel: [
        "Un signe moins devant une parenthèse change le signe de TOUS les termes de la parenthèse : $-(x - 3) = -x + 3$.",
        "Isoler une lettre : on défait l'opération qui la gêne, des deux côtés. Une addition se défait par une soustraction, une multiplication par une division.",
        "Appliquer une formule : on remplace chaque lettre par sa valeur, PUIS on calcule.",
        "La multiplication passe avant l'addition : dans $f + u \\times x$, on calcule d'abord $u \\times x$.",
      ],
      exercices: [
        {
          enonce: "Réduis l'expression : $(4x + 7) - (x + 2)$.",
          reponses: [{ attendu: ordres("3x", "5"), exact: true }],
          correction:
            "Le moins change le signe de tous les termes de la seconde parenthèse : $4x + 7 - x - 2$.\nOn regroupe les $x$ : $4x - x = 3x$.\nOn regroupe les nombres : $7 - 2 = 5$.\n⛔ Le piège : écrire $3x + 9$. Le moins s'applique aussi au $2$.\nRéponse : $3x + 5$.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "Réduis l'expression : $(2x - 5) - (3x - 1)$.",
          reponses: [{ attendu: ordres("-x", "-4"), exact: true }],
          correction:
            "Le moins change les deux signes : $2x - 5 - 3x + 1$.\nLes $x$ : $2x - 3x = -x$.\nLes nombres : $-5 + 1 = -4$.\n⛔ Le piège : garder $-1$ et trouver $-6$. Moins par moins donne plus : $-(-1) = +1$.\nRéponse : $-x - 4$.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce: "Dans la formule du bénéfice $B = R - C$, exprime $R$ en fonction de $B$ et de $C$.",
          reponses: [{ attendu: ["R = B + C", "R = C + B"] }],
          correction:
            "$C$ est retranché à $R$ : on défait la soustraction par une addition.\nOn ajoute $C$ des deux côtés : $B + C = R$.\n⛔ Le piège : écrire $R = B - C$. On ne change pas l'opération en faisant passer la lettre : on la défait.\nRéponse : $R = B + C$.",
          micros: ["auto_alg_isoler_variable"],
        },
        {
          enonce: "Dans la formule $d = v \\times t$, exprime $t$ en fonction de $d$ et de $v$.",
          reponses: [{ attendu: "t = d/v" }],
          correction:
            "$t$ est multiplié par $v$ : on défait la multiplication par une division.\nOn divise les deux côtés par $v$ : $t = \\dfrac{d}{v}$.\n⛔ Le piège : écrire $t = \\dfrac{v}{d}$, la fraction renversée. Vérifie avec des nombres : $100$ km à $50$ km/h, cela fait $100 \\div 50 = 2$ h.\nRéponse : $t = \\dfrac{d}{v}$.",
          micros: ["auto_alg_isoler_variable"],
        },
        {
          enonce: "Le chiffre d'affaires vaut $CA = p \\times q$. On veut isoler $q$. Par quelle lettre divise-t-on les deux membres ? Écris cette lettre.",
          reponses: [{ attendu: "p" }],
          correction:
            "$q$ est multiplié par $p$.\nOn défait cette multiplication en divisant les deux membres par $p$ : $q = \\dfrac{CA}{p}$.\n⛔ Le piège : diviser par $CA$. On divise par ce qui gêne la lettre cherchée, ici $p$.\nRéponse : $p$.",
          micros: ["auto_alg_isoler_variable"],
        },
        {
          enonce: "Avec $B = R - C$, calcule $B$ pour $R = 2\\,400$ et $C = 1\\,400$.",
          reponses: [{ attendu: "1 000" }],
          correction:
            "On remplace les lettres : $B = 2\\,400 - 1\\,400$.\nOn calcule : $B = 1\\,000$.\n⛔ Le piège : additionner les deux nombres. La formule dit bien « moins ».\nRéponse : 1 000.",
          micros: ["auto_alg_application_formule"],
        },
        {
          enonce: "Le prix TTC se calcule par $P_{TTC} = P_{HT} \\times \\left(1 + \\dfrac{t}{100}\\right)$. Calcule $P_{TTC}$ pour $P_{HT} = 200$ et $t = 20$.",
          reponses: [{ attendu: "240" }],
          correction:
            "On remplace : $P_{TTC} = 200 \\times \\left(1 + \\dfrac{20}{100}\\right)$.\nOn calcule la parenthèse : $1 + 0{,}2 = 1{,}2$.\nPuis $200 \\times 1{,}2 = 240$.\n⛔ Le piège : calculer $200 + 20 = 220$. Le $20$ est un pourcentage, pas un nombre d'euros.\nRéponse : 240.",
          micros: ["auto_alg_application_formule"],
        },
        {
          enonce: "Le coût vaut $C = f + u \\times x$. Calcule $C$ pour $f = 300$, $u = 12$ et $x = 50$.",
          reponses: [{ attendu: "900" }],
          correction:
            "On remplace : $C = 300 + 12 \\times 50$.\nLa multiplication passe d'abord : $12 \\times 50 = 600$.\nPuis $300 + 600 = 900$.\n⛔ Le piège : calculer de gauche à droite, $(300 + 12) \\times 50 = 15\\,600$.\nRéponse : 900.",
          micros: ["auto_alg_application_formule"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : isoler la lettre cherchée, puis remplacer par les valeurs données.",
      rappel: [
        "Une formule se lit dans tous les sens : deux grandeurs connues donnent souvent la troisième.",
        "Deux opérations gênent la lettre ? On les défait dans l'ordre inverse. Exemple : $y = 2x + 1$ donne $y - 1 = 2x$, puis $x = \\dfrac{y - 1}{2}$.",
        "Pour revenir au prix HT, on DIVISE le prix TTC par $1 + \\dfrac{t}{100}$. On ne retire pas le pourcentage au prix TTC.",
      ],
      exercices: [
        {
          enonce:
            "Zoé, en stage en comptabilité, écrit : $(5x + 6) - (2x - 4) = 5x + 6 - 2x - 4 = 3x + 2$.\na) Quel est le résultat correct ?\nb) De combien son résultat est-il trop petit ?",
          reponses: [
            { question: "a)", attendu: ordres("3x", "10"), exact: true },
            { question: "b)", attendu: "8" },
          ],
          correction:
            "a) Le moins change le signe de $-4$, qui devient $+4$ : $5x + 6 - 2x + 4 = 3x + 10$.\nb) $(3x + 10) - (3x + 2) = 8$.\nC'est deux fois $4$ : Zoé a retranché $4$ au lieu de l'ajouter.\n⛔ Le piège : ne changer le signe que du premier terme de la parenthèse. Zoé a bien changé $2x$, mais pas $-4$.\nRéponse : a) $3x + 10$ ; b) 8.",
          micros: ["auto_alg_litteral"],
        },
        {
          enonce:
            "Une imprimeuse de tee-shirts a une recette $R = 15x + 200$ et un coût $C = 9x + 500$, où $x$ est le nombre de tee-shirts (modèle). Le bénéfice vaut $B = R - C$.\na) Écris $B$ sous forme réduite.\nb) Calcule $B$ pour $x = 100$.",
          reponses: [
            { question: "a)", attendu: ordres("6x", "-300"), exact: true },
            { question: "b)", attendu: "300 €" },
          ],
          correction:
            "a) $B = (15x + 200) - (9x + 500) = 15x + 200 - 9x - 500$.\nLes $x$ : $15x - 9x = 6x$. Les nombres : $200 - 500 = -300$.\nDonc $B = 6x - 300$.\nb) $B = 6 \\times 100 - 300 = 600 - 300 = 300$.\n⛔ Le piège au a) : écrire $6x + 700$. Le moins porte aussi sur le $500$.\nRéponse : a) $6x - 300$ ; b) 300 €.",
          micros: ["auto_alg_litteral", "auto_alg_application_formule"],
        },
        {
          enonce:
            "Un entraîneur de cyclisme utilise $d = v \\times t$, avec $d$ en km, $v$ en km/h et $t$ en heures.\na) Exprime $v$ en fonction de $d$ et de $t$.\nb) Une coureuse parcourt $90$ km en $2{,}5$ heures. Calcule sa vitesse moyenne.",
          reponses: [
            { question: "a)", attendu: "v = d/t" },
            { question: "b)", attendu: "36 km/h" },
          ],
          correction:
            "a) $v$ est multiplié par $t$ : on divise les deux côtés par $t$, donc $v = \\dfrac{d}{t}$.\nb) $v = 90 \\div 2{,}5 = 36$ km/h.\nVérification : $36 \\times 2{,}5 = 90$. ✔\n⛔ Le piège au b) : multiplier $90$ par $2{,}5$. Une vitesse de $225$ km/h à vélo doit alerter.\nRéponse : a) $v = \\dfrac{d}{t}$ ; b) 36 km/h.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          enonce:
            "Une éleveuse clôture un enclos rectangulaire. Le périmètre vaut $p = 2(a + b)$, où $a$ est la longueur et $b$ la largeur.\na) Exprime $a$ en fonction de $p$ et de $b$.\nb) Elle dispose de $46$ m de clôture et veut une largeur de $8$ m. Calcule la longueur.",
          reponses: [
            { question: "a)", attendu: "a = p/2 - b" },
            { question: "b)", attendu: "15 m" },
          ],
          correction:
            "a) La parenthèse est multipliée par $2$ : on divise d'abord par $2$, ce qui donne $\\dfrac{p}{2} = a + b$.\nPuis on retranche $b$ : $a = \\dfrac{p}{2} - b$.\nb) $a = 46 \\div 2 - 8 = 23 - 8 = 15$ m.\nVérification : $2 \\times (15 + 8) = 46$. ✔\n⛔ Le piège au a) : écrire $a = p - 2b$. Il manque la division par $2$ : ce résultat est le double de la longueur.\nRéponse : a) $a = \\dfrac{p}{2} - b$ ; b) 15 m.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          enonce:
            "Un infirmier règle une perfusion (modèle). Le débit $q$, en mL par heure, vaut $q = \\dfrac{v}{t}$, où $v$ est le volume en mL et $t$ la durée en heures.\na) Exprime $v$ en fonction de $q$ et de $t$.\nb) Le débit est de $125$ mL par heure pendant $8$ heures. Quel volume passe-t-il ?",
          reponses: [
            { question: "a)", attendu: "v = q × t" },
            { question: "b)", attendu: "1 000 mL" },
          ],
          correction:
            "a) $v$ est divisé par $t$ : on défait la division par une multiplication.\nOn multiplie les deux côtés par $t$ : $v = q \\times t$.\nb) $v = 125 \\times 8 = 1\\,000$ mL.\n⛔ Le piège au a) : écrire $v = \\dfrac{q}{t}$. On a recopié la forme de la formule sans défaire l'opération.\nRéponse : a) $v = q \\times t$ ; b) 1 000 mL.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          enonce:
            "Une libraire vend un livre $21{,}10$ € TTC. La TVA sur le livre est de $5{,}5\\,\\%$.\nOn rappelle que $P_{TTC} = P_{HT} \\times \\left(1 + \\dfrac{t}{100}\\right)$.\na) Quel est le nombre $1 + \\dfrac{t}{100}$ ici ?\nb) Quel est le prix HT du livre ?",
          reponses: [
            { question: "a)", attendu: "1,055", exact: true },
            { question: "b)", attendu: "20 €" },
          ],
          correction:
            "a) $1 + \\dfrac{5{,}5}{100} = 1 + 0{,}055 = 1{,}055$.\nb) On défait la multiplication par une division : $21{,}10 \\div 1{,}055 = 20$ €.\nVérification : $20 \\times 1{,}055 = 21{,}10$. ✔\n⛔ Le piège au b) : retirer $5{,}5\\,\\%$ au prix TTC. On trouverait environ $19{,}94$ €, et c'est faux : les $5{,}5\\,\\%$ se calculent sur le prix HT.\nRéponse : a) 1,055 ; b) 20 €.",
          micros: ["auto_alg_application_formule"],
        },
        {
          enonce:
            "Une artisane fabrique des savons (modèle). Son coût total vaut $c = f + u \\times x$, avec $f$ les frais fixes, $u$ le coût d'un savon et $x$ le nombre de savons.\na) Exprime $x$ en fonction de $c$, $f$ et $u$.\nb) Ses frais fixes sont de $800$ €, un savon lui coûte $15$ €, et son budget total est de $2\\,000$ €. Combien de savons peut-elle fabriquer ?",
          reponses: [
            { question: "a)", attendu: "x = (c - f)/u" },
            { question: "b)", attendu: "80" },
          ],
          correction:
            "a) Deux opérations gênent $x$. On retranche d'abord $f$ : $c - f = u \\times x$.\nPuis on divise par $u$ : $x = \\dfrac{c - f}{u}$.\nb) $x = (2\\,000 - 800) \\div 15 = 1\\,200 \\div 15 = 80$ savons.\nVérification : $800 + 15 \\times 80 = 2\\,000$. ✔\n⛔ Le piège au a) : diviser avant de retrancher, et écrire $x = \\dfrac{c}{u} - f$.\nRéponse : a) $x = \\dfrac{c - f}{u}$ ; b) 80 savons.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          enonce:
            "Un fleuriste calcule sa marge par $M = V - A$, avec $V$ le prix de vente et $A$ le prix d'achat.\na) Exprime $V$ en fonction de $M$ et de $A$.\nb) Exprime $A$ en fonction de $V$ et de $M$.\nc) Il veut une marge de $180$ € sur un lot acheté $420$ €. À quel prix doit-il le vendre ?",
          reponses: [
            { question: "a)", attendu: ["V = M + A", "V = A + M"] },
            { question: "b)", attendu: ["A = V - M", "A = -M + V"] },
            { question: "c)", attendu: "600 €" },
          ],
          correction:
            "a) On ajoute $A$ des deux côtés : $V = M + A$.\nb) On part de $V = M + A$ et on retranche $M$ : $A = V - M$.\nc) $V = 180 + 420 = 600$ €.\nVérification : $600 - 420 = 180$. ✔\n⛔ Le piège au b) : écrire $A = M - V$. Le prix d'achat serait négatif.\nRéponse : a) $V = M + A$ ; b) $A = V - M$ ; c) 600 €.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : choisir la formule, isoler la lettre, calculer, vérifier.",
      rappel: [
        "On isole d'abord la lettre cherchée, on remplace ensuite.",
        "Un quotient se lit dans les deux sens : $4 = \\dfrac{12}{3}$ donne $12 = 4 \\times 3$ et $3 = \\dfrac{12}{4}$.",
        "Pour vérifier, on remet le résultat dans la formule de départ : on doit retrouver la valeur donnée.",
      ],
      exercices: [
        {
          titre: "Le devis du plombier",
          enonce:
            "Un plombier facture $60$ € de déplacement et $45$ € de l'heure (modèle). Le prix hors taxes vaut $c = f + u \\times x$, avec $x$ le nombre d'heures.\na) Calcule le prix pour $3$ heures.\nb) Exprime $x$ en fonction de $c$, $f$ et $u$.\nc) Une facture s'élève à $285$ € hors taxes. Combien d'heures a-t-il travaillé ?\nd) La TVA sur ce chantier est de $10\\,\\%$ (modèle). Quel est le prix TTC de cette facture ?",
          reponses: [
            { question: "a)", attendu: "195 €" },
            { question: "b)", attendu: "x = (c - f)/u" },
            { question: "c)", attendu: "5 h" },
            { question: "d)", attendu: "313,50 €" },
          ],
          correction:
            "a) $c = 60 + 45 \\times 3 = 60 + 135 = 195$ €.\nb) On retranche $f$, puis on divise par $u$ : $x = \\dfrac{c - f}{u}$.\nc) $x = (285 - 60) \\div 45 = 225 \\div 45 = 5$ heures.\nd) $285 \\times \\left(1 + \\dfrac{10}{100}\\right) = 285 \\times 1{,}1 = 313{,}50$ €.\n⛔ Le piège au c) : diviser $285$ par $45$ sans retirer le déplacement.\nRéponse : a) 195 € ; b) $x = \\dfrac{c - f}{u}$ ; c) 5 h ; d) 313,50 €.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          titre: "Le stade presque plein",
          enonce:
            "Le responsable billetterie d'un club de football calcule le taux de remplissage par $t = \\dfrac{a}{b}$, avec $a$ le nombre de spectateurs et $b$ la capacité (modèle).\na) Exprime $a$ en fonction de $t$ et de $b$.\nb) Le stade contient $25\\,000$ places et le taux est de $0{,}8$. Combien y a-t-il de spectateurs ?\nc) Exprime $b$ en fonction de $a$ et de $t$.\nd) Un autre stade accueille $18\\,000$ spectateurs avec un taux de $0{,}72$. Quelle est sa capacité ?",
          reponses: [
            { question: "a)", attendu: "a = t × b" },
            { question: "b)", attendu: "20 000" },
            { question: "c)", attendu: "b = a/t" },
            { question: "d)", attendu: "25 000" },
          ],
          correction:
            "a) $a$ est divisé par $b$ : on multiplie les deux côtés par $b$, donc $a = t \\times b$.\nb) $a = 0{,}8 \\times 25\\,000 = 20\\,000$ spectateurs.\nc) On part de $a = t \\times b$ et on divise par $t$ : $b = \\dfrac{a}{t}$.\nd) $b = 18\\,000 \\div 0{,}72 = 25\\,000$ places.\nVérification : $0{,}72 \\times 25\\,000 = 18\\,000$. ✔\n⛔ Le piège au d) : multiplier $18\\,000$ par $0{,}72$. La capacité doit être plus grande que le nombre de spectateurs.\nRéponse : a) $a = t \\times b$ ; b) 20 000 ; c) $b = \\dfrac{a}{t}$ ; d) 25 000.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
        {
          titre: "Les paniers de l'association",
          enonce:
            "La trésorière d'une association de commerce équitable vend des paniers $25$ € pièce (modèle). Pour $x$ paniers, la recette vaut $R = 25x$ et le coût $C = 12x + 650$.\na) Écris le bénéfice $B = R - C$ sous forme réduite.\nb) Calcule le bénéfice pour $x = 100$.\nc) Pour combien de paniers le bénéfice est-il nul ?",
          reponses: [
            { question: "a)", attendu: ordres("13x", "-650"), exact: true },
            { question: "b)", attendu: "650 €" },
            { question: "c)", attendu: "50" },
          ],
          correction:
            "a) $B = 25x - (12x + 650) = 25x - 12x - 650 = 13x - 650$.\nb) $B = 13 \\times 100 - 650 = 1\\,300 - 650 = 650$ €.\nc) $13x - 650 = 0$ donne $13x = 650$, donc $x = 650 \\div 13 = 50$ paniers.\nVérification : recette $25 \\times 50 = 1\\,250$ et coût $12 \\times 50 + 650 = 1\\,250$. ✔\n⛔ Le piège au a) : écrire $13x + 650$. Le moins devant la parenthèse porte aussi sur le $650$.\nRéponse : a) $13x - 650$ ; b) 650 € ; c) 50 paniers.",
          micros: ["auto_alg_litteral", "auto_alg_application_formule"],
        },
        {
          titre: "Les degrés Fahrenheit",
          enonce:
            "Une climatologue lit des relevés américains. La température en degrés Fahrenheit $f$ et celle en degrés Celsius $c$ sont liées par $f = 1{,}8c + 32$.\na) Calcule $f$ pour $c = 30$.\nb) Exprime $c$ en fonction de $f$.\nc) Calcule $c$ pour $f = 212$.\nd) Un relevé indique $98{,}6$ degrés Fahrenheit. Combien cela fait-il de degrés Celsius ?",
          reponses: [
            { question: "a)", attendu: ["86", "86 °F"] },
            { question: "b)", attendu: "c = (f - 32)/1,8" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: "37" },
          ],
          correction:
            "a) $f = 1{,}8 \\times 30 + 32 = 54 + 32 = 86$.\nb) On retranche d'abord $32$ : $f - 32 = 1{,}8c$.\nPuis on divise par $1{,}8$ : $c = \\dfrac{f - 32}{1{,}8}$.\nc) $c = (212 - 32) \\div 1{,}8 = 180 \\div 1{,}8 = 100$. C'est l'eau qui bout.\nd) $c = (98{,}6 - 32) \\div 1{,}8 = 66{,}6 \\div 1{,}8 = 37$. C'est la température du corps humain.\n⛔ Le piège au b) : diviser d'abord par $1{,}8$ sans diviser le $32$. On retire d'abord ce qui est ajouté.\nRéponse : a) 86 ; b) $c = \\dfrac{f - 32}{1{,}8}$ ; c) 100 ; d) 37.",
          micros: ["auto_alg_isoler_variable", "auto_alg_application_formule"],
        },
      ],
    },
  ],
};
