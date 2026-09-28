// ─── Fiche d'exercices : le tableau de variations (1re, sans spécialité) ──────
//                              20 exercices corrigés
//
// Sixième et dernière feuille du chapitre « Dérivation » de la première SANS
// spécialité (BOP1DE, 28/09/2026), notion `der_variations` du coach.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/derivee-calcul.bank.ts`.
//
// ⛔⛔ LE PROGRAMME : dérivées des polynômes de degré 3 au plus, signe sur une
// forme factorisée DONNÉE (« on admet que f′(x) = … »), tableau de variations,
// extremum, optimisation. PAS de discriminant, PAS de produit ni de quotient
// de fonctions.
//
// ⭐ Chaque tableau est DESSINÉ, avec la ligne de f′ au-dessus des flèches : le
// même canvas que le coach. L'aide locale `tableauVariations` le garde dans un
// cadre étroit (sept tableaux en pleine largeur portaient l'ancienne feuille à
// 14 pages, 28/09).
// Physique : le four (9), la plongeuse (11), le freinage (14). Histoire-géo :
// la population d'un pays (12), l'étape du Tour (15). Économie : l'atelier de
// céramique (10), les confitures (17), le festival (19). Écologie et nature :
// le polluant dans la rivière (13), l'enclos (16), le gel des abricotiers (20).
// Santé : l'épidémie (18). Les chiffres sont des MODÈLES arrondis.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-der-variations.mjs`.
//
// Micro-compétences : der_variations_deduire (1, 2, 5, 6, 8, 9, 12, 15),
// der_tableau_dresser (2, 4, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// der_extremum_determiner (3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
// 20), der_optimisation (10, 16, 17, 19), der_prevoir_evolution (12, 13, 14,
// 18, 20). 5/5.

import type { ReactNode } from "react";
import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes } from "@/lib/fiches-exercices/figures";

const nb = (n: number) => String(n).replace("-", "−").replace(".", ",");

/** Un dessin d'appoint, montré à l'écran et pas sur papier : il redit le
 *  corrigé (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins sous un même corrigé. */
const deux = (a: ReactNode, b: ReactNode) => (
  <>
    {a}
    {b}
  </>
);

/** Le tableau de variations : signe de la dérivée en haut, valeurs en bas.
 *  ⛔ Dans le cadre des aides de `figures.tsx` : sans lui, sept tableaux en
 *  pleine largeur portaient le PDF à 14 pages (28/09, limite 12).
 *  Chaque borne intérieure annule f′ (le « 0 » écrit sous elle). */
function tableauVariations(bornes: number[], signes: ("+" | "-")[], valeurs: number[], f = "f", variable = "x") {
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[14rem]">
      <CanvasRenderer
        figure={{
          kind: "tableau_variations",
          variable,
          bornes: bornes.map(nb),
          derivee: { label: `${f} ′(${variable})`, signes, marques: Array(bornes.length - 2).fill("0") },
          variations: { label: `${f}(${variable})`, valeurs: valeurs.map(nb) },
          size: { width: 380, height: 200 },
        }}
      />
    </div>
  );
}

export const exercicesDerVariationsPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "der-variations",
  titre: "Le tableau de variations",
  accroche:
    "Vingt exercices pour passer du signe de f′ aux variations de f : dresser le tableau, trouver un maximum ou un minimum, optimiser un bénéfice, prévoir une évolution. Un four, une plongeuse, un freinage, une étape du Tour, une épidémie, le gel des abricotiers. Cherche d'abord au brouillon, puis ouvre la correction : elle dessine le tableau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : déduire les variations, dresser le tableau, lire un extremum.",
      rappel: [
        "Si $f'(x) > 0$ sur un intervalle, $f$ y est croissante ; si $f'(x) < 0$, elle y est décroissante.",
        "Le tableau de variations : la ligne des signes de $f'$, puis des flèches, avec les images aux bornes et là où $f'$ s'annule.",
        "Maximum, minimum : on compare TOUTES les valeurs du tableau, y compris celles des bornes.",
      ],
      exercices: [
        {
          enonce: "Voici le tableau de signes de la dérivée d'une fonction $f$. En déduire les variations de $f$.",
          figure: tableauSignes(["−∞", "−1", "4", "+∞"], [["$f'(x)$", ["-", "+", "-"], ["0", "0"]]]),
          correction:
            "Un « $-$ » donne une flèche qui descend, un « $+$ » une flèche qui monte.\n$f$ est décroissante sur $]-\\infty ; -1]$, croissante sur $[-1 ; 4]$, décroissante sur $[4 ; +\\infty[$.\n⚠️ On ne peut pas dire quelles valeurs $f$ prend : le tableau de signes de $f'$ ne donne pas les images.",
          micros: ["der_variations_deduire"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 4x + 1$ sur $[-1 ; 5]$. On a $f'(x) = 2x - 4$. Dresser le tableau de variations de $f$.",
          correction:
            "$2x - 4 > 0$ équivaut à $x > 2$ : $f'(x)$ est négatif sur $[-1 ; 2[$, positif sur $]2 ; 5]$.\n$f$ décroît sur $[-1 ; 2]$, puis croît sur $[2 ; 5]$.\nImages : $f(-1) = 1 + 4 + 1 = 6$ ; $f(2) = 4 - 8 + 1 = -3$ ; $f(5) = 25 - 20 + 1 = 6$.\n⚠️ $(-1)^2 = 1$, et $-4 \\times (-1) = +4$ : deux signes à surveiller dans $f(-1)$.",
          schema: tableauVariations([-1, 2, 5], ["-", "+"], [6, -3, 6]),
          micros: ["der_variations_deduire", "der_tableau_dresser"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $f$ sur $[0 ; 6]$.\na) Quel est le maximum de $f$ ? Où est-il atteint ?\nb) Quel est le minimum de $f$ ? Où est-il atteint ?",
          figure: tableauVariations([0, 3, 6], ["+", "-"], [1, 5, 2]),
          correction:
            "a) La flèche monte jusqu'en $3$, puis descend : le maximum est $5$, atteint en $x = 3$.\nb) Le minimum est aux bornes : on compare $f(0) = 1$ et $f(6) = 2$. Le plus petit est $1$ : le minimum est $1$, atteint en $x = 0$.\n⚠️ Le minimum n'est pas forcément là où $f'$ s'annule : ici, il est au début de l'intervalle.",
          micros: ["der_extremum_determiner"],
        },
        {
          enonce: "Soit $f(x) = -x^2 + 6x$ sur $[0 ; 6]$. Calculer $f'(x)$, dresser le tableau de variations de $f$, et donner son maximum et son minimum.",
          correction:
            "$f'(x) = -2x + 6$, positif pour $x < 3$, négatif pour $x > 3$.\n$f$ croît sur $[0 ; 3]$, décroît sur $[3 ; 6]$.\nImages : $f(0) = 0$ ; $f(3) = -9 + 18 = 9$ ; $f(6) = -36 + 36 = 0$.\nLe maximum est $9$, atteint en $3$. Le minimum est $0$, atteint en $0$ et en $6$.\n⭐ La parabole est tournée vers le bas : son sommet est le maximum.",
          schema: ecranSeulement(tableauVariations([0, 3, 6], ["+", "-"], [0, 9, 0])),
          micros: ["der_tableau_dresser", "der_extremum_determiner"],
        },
        {
          enonce: "Une fonction $f$ est définie sur $[0 ; 10]$, et $f'(x) > 0$ pour tout $x$ de $[0 ; 10]$. Vrai ou faux ?\na) $f(2) < f(7)$.\nb) Le maximum de $f$ sur $[0 ; 10]$ est $f(10)$.\nc) $f(0) > 0$.",
          correction:
            "a) Vrai : $f' > 0$, donc $f$ est croissante sur $[0 ; 10]$. Comme $2 < 7$, $f(2) < f(7)$.\nb) Vrai : $f$ croît jusqu'au bout, son maximum est atteint en $10$.\nc) On ne peut pas savoir : le signe de $f'$ dit si $f$ MONTE, pas si elle est au-dessus de $0$. $f(0)$ peut être négatif.\n⚠️ Ne pas confondre le signe de $f'$, qui donne le sens de variation, et le signe de $f$, qui donne la position par rapport à l'axe.\n⭐ Sur le dessin, un exemple pour c) : $f(x) = x - 5$ monte sur tout $[0 ; 10]$, et pourtant $f(0) = -5$.",
          schema: ecranSeulement(
            repere(
              [-1, 11, -6, 6],
              [{ q: [0, 1, -5] }],
              [
                { x: 0, y: -5, label: "" },
                { x: 10, y: 5, label: "" },
              ],
              undefined,
              true,
            ),
          ),
          micros: ["der_variations_deduire"],
        },
        {
          enonce: "La dérivée d'une fonction $f$ est $f'(x) = (x - 1)(x - 5)$. Dresser le tableau de signes de $f'(x)$, puis donner les variations de $f$.",
          correction:
            "Chaque facteur change de signe en une valeur : $x - 1$ s'annule en $1$, $x - 5$ en $5$.\n$x - 1$ est négatif avant $1$, positif après. $x - 5$ est négatif avant $5$, positif après.\nLa règle des signes donne $f'(x)$ : positif avant $1$, négatif entre $1$ et $5$, positif après $5$.\n$f$ est croissante sur $]-\\infty ; 1]$, décroissante sur $[1 ; 5]$, croissante sur $[5 ; +\\infty[$.\n⚠️ Entre $1$ et $5$, les deux facteurs n'ont pas le même signe : le produit est NÉGATIF. Le tableau évite de le deviner.",
          schema: tableauSignes(["−∞", "1", "5", "+∞"], [
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 5$", ["-", "-", "+"], ["", "0"]],
            ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["der_variations_deduire"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 3x$ sur $[-2 ; 2]$. On admet que $f'(x) = 3(x - 1)(x + 1)$. Dresser le tableau de variations de $f$, puis donner son maximum et son minimum sur $[-2 ; 2]$.",
          correction:
            "$3(x - 1)(x + 1)$ est positif sur $[-2 ; -1[$, négatif sur $]-1 ; 1[$, positif sur $]1 ; 2]$.\n$f$ croît sur $[-2 ; -1]$, décroît sur $[-1 ; 1]$, croît sur $[1 ; 2]$.\nImages : $f(-2) = -8 + 6 = -2$ ; $f(-1) = -1 + 3 = 2$ ; $f(1) = 1 - 3 = -2$ ; $f(2) = 8 - 6 = 2$.\nLe maximum vaut $2$, atteint en $-1$ ET en $2$ ; le minimum vaut $-2$, atteint en $-2$ ET en $1$.\n⚠️ Un maximum peut être atteint deux fois : il faut toujours comparer avec les valeurs aux bornes.",
          schema: ecranSeulement(tableauVariations([-2, -1, 1, 2], ["+", "-", "+"], [-2, 2, -2, 2])),
          micros: ["der_tableau_dresser", "der_extremum_determiner"],
        },
        {
          enonce: "Une fonction $f$ est croissante sur $[1 ; 4]$, avec $f(1) = -3$ et $f(4) = 5$.\na) Encadrer $f(x)$ pour $x$ dans $[1 ; 4]$.\nb) Donner le maximum et le minimum de $f$ sur $[1 ; 4]$.\nc) Peut-on avoir $f(3) = 6$ ?",
          correction:
            "a) $f$ est croissante sur $[1 ; 4]$ : quand $x$ va de $1$ à $4$, $f(x)$ monte de $f(1) = -3$ à $f(4) = 5$. Donc $-3 \\leqslant f(x) \\leqslant 5$.\nb) Le maximum de $f$ est $5$, atteint en $4$ ; le minimum est $-3$, atteint en $1$.\nc) Non : $3 < 4$, donc $f(3) \\leqslant f(4) = 5$. $f(3)$ ne peut pas valoir $6$.\n⭐ Une fonction croissante sur un intervalle atteint son minimum au début et son maximum à la fin.",
          schema: ecranSeulement(tableauVariations([1, 4], ["+"], [-3, 5])),
          micros: ["der_extremum_determiner", "der_variations_deduire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Dériver, étudier le signe, dresser le tableau, puis répondre avec les mots de la situation.",
      rappel: [
        "Pour dresser le tableau de variations : $f'(x)$, son signe (sur la forme factorisée si elle est donnée), les flèches, puis les images.",
        "Le maximum est la plus grande valeur du tableau : on dit où il est atteint, avec l'unité de la situation.",
        "On reste dans l'intervalle de l'énoncé : hors de lui, le modèle n'a plus de sens.",
      ],
      exercices: [
        {
          titre: "Le four",
          enonce:
            "On allume un four, puis on l'éteint. Sa température, en °C, est $T(t) = -t^2 + 20t + 20$, où $t$ est le temps en minutes ($0 \\leqslant t \\leqslant 15$).\na) Calculer $T'(t)$ et étudier son signe.\nb) Dresser le tableau de variations de $T$ sur $[0 ; 15]$.\nc) Quelle est la température maximale ? Au bout de combien de temps est-elle atteinte ?",
          correction:
            "a) $T'(t) = -2t + 20$. $-2t + 20 > 0$ équivaut à $t < 10$ : $T'(t)$ est positif sur $[0 ; 10[$, négatif sur $]10 ; 15]$.\nb) $T$ croît sur $[0 ; 10]$, puis décroît sur $[10 ; 15]$.\nImages : $T(0) = 20$ ; $T(10) = -100 + 200 + 20 = 120$ ; $T(15) = -225 + 300 + 20 = 95$.\nc) La température maximale est $120$ °C, atteinte au bout de $10$ minutes. Ensuite, le four refroidit : $95$ °C à $15$ min.\n⚠️ $T(0) = 20$ °C : c'est la température de la cuisine, le point de départ, pas un minimum « trouvé » par la dérivée.",
          schema: tableauVariations([0, 10, 15], ["+", "-"], [20, 120, 95], "T", "t"),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_variations_deduire"],
        },
        {
          titre: "L'atelier de céramique",
          enonce:
            "Un atelier de céramique fabrique $x$ dizaines de bols par semaine ($0 \\leqslant x \\leqslant 15$). Son bénéfice, en dizaines d'euros, est $B(x) = -2x^2 + 40x - 100$.\na) Calculer $B'(x)$ et étudier son signe.\nb) Dresser le tableau de variations de $B$.\nc) Combien de bols faut-il fabriquer pour un bénéfice maximal ? Quel est ce bénéfice, en euros ?",
          correction:
            "a) $B'(x) = -4x + 40$, positif pour $x < 10$, négatif pour $x > 10$.\nb) $B$ croît sur $[0 ; 10]$, décroît sur $[10 ; 15]$.\n$B(0) = -100$ ; $B(10) = -200 + 400 - 100 = 100$ ; $B(15) = -450 + 600 - 100 = 50$.\nc) Le maximum est atteint en $x = 10$ : il faut fabriquer $100$ bols par semaine.\nLe bénéfice vaut alors $100$ dizaines d'euros, soit $1\\,000$ €.\n⚠️ $B(0) = -100$ : sans rien fabriquer, l'atelier PERD $1\\,000$ € (loyer, four, charges). Un bénéfice peut être négatif.\n⚠️ On répond en bols et en euros : « $x = 10$ » ne suffit pas.",
          schema: tableauVariations([0, 10, 15], ["+", "-"], [-100, 100, 50], "B"),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_optimisation"],
        },
        {
          titre: "La plongeuse",
          enonce:
            "Une plongeuse s'élance d'un plongeoir de $10$ m. Sa hauteur au-dessus de l'eau, en mètres, est $h(t) = -5t^2 + 5t + 10$, où $t$ est le temps en secondes ($0 \\leqslant t \\leqslant 2$).\na) Calculer $h'(t)$ et étudier son signe.\nb) Dresser le tableau de variations de $h$.\nc) Quelle hauteur maximale atteint-elle ? Quand entre-t-elle dans l'eau ?",
          correction:
            "a) $h'(t) = -10t + 5$ ; $-10t + 5 > 0$ équivaut à $t < 0{,}5$.\nb) $h$ croît sur $[0 ; 0{,}5]$, puis décroît sur $[0{,}5 ; 2]$.\n$h(0) = 10$ ; $h(0{,}5) = -1{,}25 + 2{,}5 + 10 = 11{,}25$ ; $h(2) = -20 + 10 + 10 = 0$.\nc) Son maximum est $11{,}25$ m, atteint à $0{,}5$ s. Elle entre dans l'eau à $t = 2$ s, quand $h(2) = 0$.\n⭐ En physique, la plongeuse s'élance vers le haut : c'est pourquoi elle dépasse $10$ m avant de tomber.\n⚠️ $5 \\times 0{,}5^2 = 5 \\times 0{,}25 = 1{,}25$ : on élève au carré avant de multiplier.",
          schema: tableauVariations([0, 0.5, 2], ["+", "-"], [10, 11.25, 0], "h", "t"),
          micros: ["der_tableau_dresser", "der_extremum_determiner"],
        },
        {
          titre: "La population d'un pays",
          enonce:
            "Dans un modèle, la population d'un pays, en millions d'habitants, est $P(t) = -0{,}5t^3 + 3t^2 + 10$, où $t$ est le nombre de décennies depuis 1950 ($0 \\leqslant t \\leqslant 5$). On admet que $P'(t) = -1{,}5t(t - 4)$.\na) Étudier le signe de $P'(t)$ sur $[0 ; 5]$, puis dresser le tableau de variations de $P$.\nb) En quelle année la population est-elle maximale ? Combien d'habitants a-t-elle alors ?\nc) Que devient-elle ensuite ? Est-elle revenue en 2000 à son niveau de 1950 ?",
          correction:
            "a) Sur $]0 ; 5]$, $-1{,}5t$ est négatif ; $t - 4$ s'annule en $4$. $P'(t)$ est positif sur $]0 ; 4[$, négatif sur $]4 ; 5]$.\n$P$ croît sur $[0 ; 4]$, décroît sur $[4 ; 5]$.\n$P(0) = 10$ ; $P(4) = -32 + 48 + 10 = 26$ ; $P(5) = -62{,}5 + 75 + 10 = 22{,}5$.\nb) Le maximum est atteint pour $t = 4$, en 1990 : $26$ millions d'habitants.\nc) Ensuite, la population baisse : $22{,}5$ millions en 2000. Elle reste bien au-dessus de $10$ millions, son niveau de 1950.\n⭐ Plusieurs pays d'Europe de l'Est ont perdu des habitants depuis 1990 : départs à l'étranger, moins de naissances.",
          schema: ecranSeulement(tableauVariations([0, 4, 5], ["+", "-"], [10, 26, 22.5], "P", "t")),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_prevoir_evolution", "der_variations_deduire"],
        },
        {
          titre: "Un polluant dans la rivière",
          enonce:
            "Après un rejet accidentel dans une rivière, la concentration d'un polluant, en microgrammes par litre, est $C(t) = t^3 - 12t^2 + 36t$, où $t$ est le temps en heures ($0 \\leqslant t \\leqslant 6$). On admet que $C'(t) = 3(t - 2)(t - 6)$.\na) Étudier le signe de $C'(t)$ sur $[0 ; 6]$ et dresser le tableau de variations de $C$.\nb) Quand la pollution est-elle la plus forte ? À quel niveau ?\nc) Que se passe-t-il au bout de $6$ heures ?",
          correction:
            "a) Sur $[0 ; 6[$, $t - 6$ est négatif ; $t - 2$ s'annule en $2$. $C'(t)$ est positif sur $[0 ; 2[$, négatif sur $]2 ; 6[$.\n$C$ croît sur $[0 ; 2]$, décroît sur $[2 ; 6]$.\n$C(0) = 0$ ; $C(2) = 8 - 48 + 72 = 32$ ; $C(6) = 216 - 432 + 216 = 0$.\nb) La pollution est maximale $2$ heures après le rejet : $32$ microgrammes par litre.\nc) $C(6) = 0$ : au bout de $6$ heures, le polluant a été emporté par le courant ; à cet endroit, l'eau est redevenue propre.\n⚠️ En $t = 6$, $C'(6) = 0$ aussi, mais c'est la BORNE de l'intervalle : le modèle s'arrête là.",
          schema: ecranSeulement(tableauVariations([0, 2, 6], ["+", "-"], [0, 32, 0], "C", "t")),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_prevoir_evolution"],
        },
        {
          titre: "Le freinage",
          enonce:
            "Une voiture roule sur une route mouillée ; le conducteur freine. La distance parcourue depuis le début du freinage, en mètres, est $d(t) = 20t - 2t^2$, où $t$ est le temps en secondes ($0 \\leqslant t \\leqslant 5$).\na) Calculer $d'(t)$ : c'est la vitesse. Vérifier qu'au début du freinage, la voiture roule à $72$ km/h.\nb) Étudier le signe de $d'(t)$ et dresser le tableau de variations de $d$.\nc) Quelle est la distance de freinage ?\nd) Un obstacle se trouve à $40$ m. La voiture s'arrête-t-elle avant ?",
          correction:
            "a) $d'(t) = 20 - 4t$. Au début, $d'(0) = 20$ m/s, soit $20 \\times 3{,}6 = 72$ km/h. ✔️\nb) $20 - 4t > 0$ équivaut à $t < 5$ : $d'(t)$ est positif sur $[0 ; 5[$, et s'annule en $5$ : la voiture s'arrête au bout de $5$ s.\n$d$ est croissante sur $[0 ; 5]$ : $d(0) = 0$ et $d(5) = 100 - 50 = 50$.\nc) La distance de freinage est le maximum de $d$ : $50$ m.\nd) Non : $50 > 40$. La voiture ne s'arrête pas à temps : elle roulait trop vite pour une route mouillée.\n⚠️ $d$ est croissante : la voiture avance toujours, même en freinant. C'est sa VITESSE $d'(t)$ qui diminue.",
          schema: ecranSeulement(tableauVariations([0, 5], ["+"], [0, 50], "d", "t")),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_prevoir_evolution"],
        },
        {
          titre: "Une étape du Tour de France",
          enonce:
            "Dans un modèle, l'altitude d'une étape de montagne, en centaines de mètres, est $a(x) = 0{,}5x^3 - 4{,}5x^2 + 12x + 3$, où $x$ est la distance en dizaines de kilomètres ($0 \\leqslant x \\leqslant 6$). On admet que $a'(x) = 1{,}5(x - 2)(x - 4)$.\na) Dresser le tableau de variations de $a$.\nb) Où est le col ? Où est la vallée ? Quel est le point le plus haut de l'étape ?",
          correction:
            "a) $1{,}5 > 0$ ; $(x - 2)(x - 4)$ est positif hors de $[2 ; 4]$, négatif entre $2$ et $4$.\n$a$ croît sur $[0 ; 2]$, décroît sur $[2 ; 4]$, croît sur $[4 ; 6]$.\n$a(0) = 3$ ; $a(2) = 4 - 18 + 24 + 3 = 13$ ; $a(4) = 32 - 72 + 48 + 3 = 11$ ; $a(6) = 108 - 162 + 72 + 3 = 21$.\nb) Le col est au km $20$, à $1\\,300$ m ; la vallée au km $40$, à $1\\,100$ m.\nLe point le plus haut de l'étape est l'ARRIVÉE, au km $60$, à $2\\,100$ m.\n⚠️ Le col est un maximum LOCAL : l'arrivée est plus haute. On compare toujours avec les bornes.",
          schema: tableauVariations([0, 2, 4, 6], ["+", "-", "+"], [3, 13, 11, 21], "a"),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_variations_deduire"],
        },
        {
          titre: "L'enclos le long de la rivière",
          enonce:
            "Un éleveur dispose de $40$ m de grillage pour fermer un enclos rectangulaire le long d'une rivière : le côté de la rivière n'a pas besoin de grillage. On note $x$ la largeur, en mètres ($0 \\leqslant x \\leqslant 20$) ; la longueur est alors $40 - 2x$.\na) Montrer que l'aire de l'enclos est $A(x) = -2x^2 + 40x$.\nb) Dresser le tableau de variations de $A$.\nc) Quelles dimensions donnent l'enclos le plus grand ? Quelle est son aire ?",
          correction:
            "a) $A(x) = x(40 - 2x) = 40x - 2x^2 = -2x^2 + 40x$. ✔️\nb) $A'(x) = -4x + 40$, positif pour $x < 10$, négatif pour $x > 10$.\n$A$ croît sur $[0 ; 10]$, décroît sur $[10 ; 20]$ ; $A(0) = 0$, $A(10) = -200 + 400 = 200$, $A(20) = 0$.\nc) L'aire est maximale pour $x = 10$ : un enclos de $10$ m de large et $40 - 20 = 20$ m de long, soit $200$ m².\n⭐ Le long de la rivière, le meilleur enclos est deux fois plus long que large.\n⚠️ Pourquoi $40 - 2x$ ? Les $40$ m de grillage font les DEUX largeurs et UNE longueur.",
          schema: ecranSeulement(tableauVariations([0, 10, 20], ["+", "-"], [0, 200, 0], "A")),
          micros: ["der_optimisation", "der_extremum_determiner", "der_tableau_dresser"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. On cherche le meilleur, ou on prévoit.",
      rappel: [
        "Pour trouver un maximum : on dérive, on étudie le signe de $f'$, on dresse le tableau de variations, et on calcule l'image au sommet.",
        "On donne l'intervalle où $x$ a un sens, et on répond à la question posée, avec son unité.",
        "Prévoir, c'est lire le tableau : quand la grandeur monte, quand elle redescend, jusqu'où.",
      ],
      exercices: [
        {
          titre: "La coopérative de confitures",
          enonce:
            "Une coopérative fabrique entre $0$ et $10$ milliers de pots de confiture par mois. Son bénéfice mensuel, en centaines d'euros, est $B(x) = -x^3 + 12x^2 - 21x - 10$, où $x$ est le nombre de milliers de pots.\na) Calculer $B'(x)$ et vérifier que $B'(x) = -3(x - 1)(x - 7)$.\nb) Dresser le tableau de variations de $B$ sur $[0 ; 10]$.\nc) Combien de pots faut-il fabriquer pour un bénéfice maximal ? Quel est ce bénéfice, en euros ?",
          correction:
            "a) $B'(x) = -3x^2 + 24x - 21$. Et $-3(x - 1)(x - 7) = -3(x^2 - 8x + 7) = -3x^2 + 24x - 21$. ✔️\nb) $(x - 1)(x - 7)$ est positif à l'extérieur de $[1 ; 7]$, négatif entre $1$ et $7$. Le facteur $-3$ retourne tout :\n$B'(x)$ est négatif sur $[0 ; 1[$, positif sur $]1 ; 7[$, négatif sur $]7 ; 10]$.\n$B$ décroît sur $[0 ; 1]$, croît sur $[1 ; 7]$, décroît sur $[7 ; 10]$.\nImages : $B(0) = -10$ ; $B(1) = -1 + 12 - 21 - 10 = -20$ ; $B(7) = -343 + 588 - 147 - 10 = 88$ ; $B(10) = -1000 + 1200 - 210 - 10 = -20$.\nc) Le maximum est atteint en $x = 7$ : il faut fabriquer $7\\,000$ pots par mois.\nLe bénéfice vaut alors $88$ centaines d'euros, soit $8\\,800$ euros.\n⚠️ Le facteur $-3$ RETOURNE tous les signes : oublié, il transforme le maximum en minimum.\n⚠️ On répond en pots et en euros : « $x = 7$ » ne répond pas à la question.",
          schema: deux(
            tableauSignes(["0", "1", "7", "10"], [
              ["$-3$", ["-", "-", "-"], ["", ""]],
              ["$x - 1$", ["-", "+", "+"], ["0", ""]],
              ["$x - 7$", ["-", "-", "+"], ["", "0"]],
              ["$B'(x)$", ["-", "+", "-"], ["0", "0"]],
            ]),
            tableauVariations([0, 1, 7, 10], ["-", "+", "-"], [-10, -20, 88, -20], "B"),
          ),
          micros: ["der_optimisation", "der_extremum_determiner", "der_tableau_dresser"],
        },
        {
          titre: "Une épidémie de grippe",
          enonce:
            "Pendant une épidémie de grippe, le nombre de malades dans une ville, $t$ jours après le premier cas signalé, est modélisé par $N(t) = -t^3 + 15t^2 + 100$, pour $t$ entre $0$ et $14$.\na) Calculer $N'(t)$ et vérifier que $N'(t) = -3t(t - 10)$.\nb) Dresser le tableau de variations de $N$. Quel jour l'épidémie atteint-elle son pic ? Combien y a-t-il alors de malades ?\nc) Calculer $N'(2)$, $N'(5)$ et $N'(8)$. Que représentent ces nombres ? Lequel de ces trois jours l'épidémie progresse-t-elle le plus vite ?",
          correction:
            "a) $N'(t) = -3t^2 + 30t$. Et $-3t(t - 10) = -3t^2 + 30t$. ✔️\nb) Sur $]0 ; 14]$, $-3t$ est négatif, et $t - 10$ change de signe en $10$ : le produit est positif sur $[0 ; 10]$, négatif sur $[10 ; 14]$.\n$N$ croît sur $[0 ; 10]$ puis décroît sur $[10 ; 14]$.\n$N(0) = 100$ ; $N(10) = -1000 + 1500 + 100 = 600$ ; $N(14) = -2744 + 2940 + 100 = 296$.\nLe pic est atteint le jour $10$, avec $600$ malades.\nc) $N'(2) = -12 + 60 = 48$ ; $N'(5) = -75 + 150 = 75$ ; $N'(8) = -192 + 240 = 48$.\n$N'(t)$ est la VITESSE de l'épidémie, en malades par jour. Le jour $5$, elle gagne environ $75$ malades par jour : c'est le plus rapide des trois.\n⭐ Le jour $8$, il y a plus de malades que le jour $5$ ($548$ contre $350$), mais l'épidémie ralentit déjà : c'est le signe que le pic approche.\n⚠️ Au pic, $N'(10) = 0$ : l'épidémie ne progresse plus, et pourtant il n'y a jamais eu autant de malades.",
          schema: tableauVariations([0, 10, 14], ["+", "-"], [100, 600, 296], "N", "t"),
          micros: ["der_prevoir_evolution", "der_tableau_dresser", "der_extremum_determiner"],
        },
        {
          titre: "Le prix des billets du festival",
          enonce:
            "Un festival vend $1\\,000$ billets à $40$ euros. Une étude montre que chaque euro d'augmentation du prix fait perdre $20$ spectateurs. On note $x$ l'augmentation, en euros ($0 \\leqslant x \\leqslant 50$).\na) Exprimer le prix du billet et le nombre de spectateurs en fonction de $x$.\nb) Montrer que la recette est $R(x) = -20x^2 + 200x + 40\\,000$.\nc) Quelle augmentation rend la recette maximale ? Donner le prix du billet, le nombre de spectateurs et la recette.",
          correction:
            "a) Le prix est $40 + x$ euros ; le nombre de spectateurs est $1\\,000 - 20x$.\nb) Recette = prix × nombre de billets : $R(x) = (40 + x)(1\\,000 - 20x)$.\nOn développe : $40\\,000 - 800x + 1\\,000x - 20x^2 = -20x^2 + 200x + 40\\,000$. ✔️\nc) $R'(x) = -40x + 200$. $R'(x) = 0$ pour $x = 5$ ; $R'$ est positive avant $5$, négative après.\n$R$ croît sur $[0 ; 5]$, décroît sur $[5 ; 50]$ : le maximum est en $x = 5$.\nLe billet coûte alors $45$ euros, il y a $1\\,000 - 100 = 900$ spectateurs, et la recette vaut $45 \\times 900 = 40\\,500$ euros.\n✔️ Avec la formule : $R(5) = -500 + 1\\,000 + 40\\,000 = 40\\,500$.\n⚠️ Augmenter le prix ne rapporte que jusqu'à un certain point : au-delà de $45$ euros, les spectateurs perdus coûtent plus que les euros gagnés.",
          schema: tableauVariations([0, 5, 50], ["+", "-"], [40000, 40500, 0], "R"),
          micros: ["der_optimisation", "der_tableau_dresser"],
        },
        {
          titre: "Le gel des abricotiers",
          enonce:
            "Au printemps, un arboriculteur craint le gel pour les fleurs de ses abricotiers. La température de la nuit, en °C, est $T(t) = 0{,}25t^2 - 2t + 3$, où $t$ est le nombre d'heures depuis $22$ h ($0 \\leqslant t \\leqslant 8$).\na) Calculer $T'(t)$, étudier son signe et dresser le tableau de variations de $T$.\nb) Quelle est la température la plus basse de la nuit ? À quelle heure ?\nc) Va-t-il geler ? On admet que $T(t) = 0{,}25(t - 2)(t - 6)$ : le vérifier, puis trouver entre quelles heures la température est négative.",
          correction:
            "a) $T'(t) = 0{,}5t - 2$, négatif pour $t < 4$, positif pour $t > 4$.\n$T$ décroît sur $[0 ; 4]$, croît sur $[4 ; 8]$ ; $T(0) = 3$, $T(4) = 4 - 8 + 3 = -1$, $T(8) = 16 - 16 + 3 = 3$.\nb) Le minimum est $-1$ °C, atteint pour $t = 4$, c'est-à-dire à $2$ h du matin.\nc) Oui, il va geler : le minimum est sous $0$.\n$0{,}25(t - 2)(t - 6) = 0{,}25(t^2 - 8t + 12) = 0{,}25t^2 - 2t + 3$. ✔️\n$(t - 2)(t - 6) < 0$ pour $t$ entre $2$ et $6$ : il gèle de minuit à $4$ h du matin.\n⭐ L'arboriculteur sait QUAND protéger ses fleurs (bougies, arrosage antigel) : c'est la prévision que donne l'étude de la dérivée.\n⚠️ $t$ compte les heures depuis $22$ h : $t = 4$, c'est $2$ h du matin, pas $4$ h.",
          schema: tableauVariations([0, 4, 8], ["-", "+"], [3, -1, 3], "T", "t"),
          micros: ["der_prevoir_evolution", "der_extremum_determiner", "der_tableau_dresser"],
        },
      ],
    },
  ],
};
