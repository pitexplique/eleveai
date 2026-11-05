// ─── Fiche d'exercices : signe de la dérivée et variations (STMG) — 20 exercices
//
// Notion der_variations du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : le signe d'une dérivée affine ou
// factorisée (forme DONNÉE), le sens de variation qui s'en déduit (y compris depuis
// la courbe de f'), la valeur au bout des flèches, l'extremum (y compris « local »),
// et le contre-exemple f'(a) = 0 sans changement de signe.
//
// ⭐ Chaque étude de fonction montre son tableau dans le corrigé, avec la ligne de
// f' : le même canvas que le coach (`tableau_variations`).
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus et lectures (1 à 8) ; marché (analyste, 9),
// parapente (parapentiste, 10), fromagerie (fromagère, 11), économie (économiste,
// 12), acoustique (ingénieur, 13), tourisme (agente de voyages, 14), start-up
// (cofondatrice, 15), rivière (hydrologue, 16) ; serre (maraîcher, 17), étang
// (pisciculteur, 18), ventes en ligne (chargée d'études, 19), bureau d'études
// (Zélie et Karim, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_v_signe_derivee (1, 2, 9, 10, 12, 14, 19, 20), der_v_lien_signe
// (3, 4, 5, 9, 12, 16, 19), der_v_tableau (5, 6, 10, 11, 13, 15, 17, 18), der_v_extremum
// (7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 20). 4/4.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes } from "@/lib/fiches-exercices/figures";

const nb = (n: number) => String(n).replace("-", "−").replace(".", ",");

/** Le tableau de variations : signe de la dérivée en haut, valeurs en bas. Chaque
 *  borne intérieure annule la dérivée (le « 0 » écrit sous elle). */
function tableauDerivee(bornes: number[], signes: ("+" | "-")[], valeurs: number[], f = "f", variable = "x") {
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

export const exercicesDerVariationsStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-variations",
  titre: "Signe de la dérivée et variations",
  accroche:
    "Vingt exercices pour passer du signe de la dérivée au sens de variation : trouver où elle s'annule, dire si la fonction monte ou descend, dresser le tableau, lire un maximum ou un minimum. Un parapente, une cuve de lait, une serre, un étang à truites, une start-up. Un rappel de cours avant chaque niveau, une correction étape par étape avec le tableau dessiné et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : le signe de la dérivée, le sens de variation, ou la valeur de l'extremum.",
      rappel: [
        "Si $f'(x) > 0$ sur un intervalle, $f$ y est croissante ; si $f'(x) < 0$, $f$ y est décroissante. Dans l'autre sens : si $f$ est croissante, $f'(x) \\ge 0$.",
        "Le signe de $ax + b$ : on trouve où il s'annule. Si $a > 0$, il est négatif avant, positif après. Si $a < 0$, c'est l'inverse.",
        "Le tableau de variations : la ligne des signes de $f'$, puis les flèches, avec les valeurs de $f$ aux bornes et là où $f'$ s'annule. Pour le maximum ou le minimum, on compare toutes ces valeurs.",
        "$f'$ passe de + à $-$ : maximum. $f'$ passe de $-$ à + : minimum. Sa valeur se calcule avec $f$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f'(x) = 2x - 6$.\na) En quelle valeur $f'(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f'(x)$ après cette valeur ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: ["positif", "positive"] },
          ],
          correction:
            "a) $2x - 6 = 0$, donc $2x = 6$, donc $x = 3$.\nb) Le coefficient de $x$, 2, est positif : $f'$ est négatif avant 3, positif après.\nExemple : $f'(4) = 2$.\n⛔ Le piège au a) : répondre $-6$ ou 6. On résout l'équation, on ne recopie pas un nombre.\nRéponse : a) 3 ; b) positif.",
          micros: ["der_v_signe_derivee"],
        },
        {
          enonce:
            "Soit $f'(x) = -4x + 12$.\na) En quelle valeur $f'(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f'(x)$ avant cette valeur ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: ["positif", "positive"] },
          ],
          correction:
            "a) $-4x + 12 = 0$, donc $4x = 12$, donc $x = 3$.\nb) Le coefficient de $x$, $-4$, est négatif : $f'$ est positif avant 3, négatif après.\nExemple : $f'(0) = 12$.\n⛔ Le piège au b) : dire « négatif avant, positif après » sans regarder le signe de $-4$.\nRéponse : a) 3 ; b) positif.",
          micros: ["der_v_signe_derivee"],
        },
        {
          enonce:
            "Sur l'intervalle $[-3\\,;2]$, la dérivée $f'$ est strictement négative. Que peut-on dire de $f$ sur cet intervalle ? Réponds croissante, décroissante ou négative.",
          reponses: [{ attendu: ["décroissante", "décroissant"] }],
          correction:
            "Le signe de $f'$ donne le sens de variation de $f$.\n$f'$ négative : $f$ est décroissante.\n⛔ Le piège : répondre « négative ». C'est $f'$ qui est négative. La fonction $f$ peut très bien rester positive tout en descendant.\nRéponse : décroissante.",
          micros: ["der_v_lien_signe"],
        },
        {
          enonce:
            "Une fonction $f$ est croissante sur $[-5\\,;3]$. Quel est le signe de $f'(x)$ sur cet intervalle ? Réponds positif ou négatif.",
          reponses: [{ attendu: ["positif", "positive", "positif ou nul", "positive ou nulle", "≥ 0"] }],
          correction:
            "Le lien marche dans les deux sens.\n$f$ croissante : $f'(x) \\ge 0$ sur cet intervalle.\n⛔ Le piège : parler du signe de $f$. On ne sait rien du signe de $f(x)$ : une fonction croissante peut être négative.\nRéponse : positif.",
          micros: ["der_v_lien_signe"],
        },
        {
          enonce:
            "Le tableau donne le signe de la dérivée d'un bénéfice $B$. Pour chaque intervalle, réponds croissante ou décroissante.\na) Sens de variation de $B$ sur $[5\\,;12]$.\nb) Sens de variation de $B$ sur $[12\\,;20]$.",
          figure: tableauSignes(["5", "12", "20"], [["$B'(x)$", ["+", "-"], ["0"]]]),
          reponses: [
            { question: "a)", attendu: ["croissante", "croissant"] },
            { question: "b)", attendu: ["décroissante", "décroissant"] },
          ],
          correction:
            "a) Sur $[5\\,;12]$, $B'$ est positive : $B$ est croissante.\nb) Sur $[12\\,;20]$, $B'$ est négative : $B$ est décroissante.\n⛔ Le piège : lire les nombres 5, 12 et 20 comme des valeurs de $B$. Ce sont des valeurs de $x$.\nRéponse : a) croissante ; b) décroissante.",
          micros: ["der_v_lien_signe", "der_v_tableau"],
        },
        {
          enonce:
            "On veut dresser le tableau de variations de $f(x) = x^2 - 6x + 2$ sur $[-1\\,;7]$.\na) Donne l'expression de $f'(x)$.\nb) À quelle abscisse les flèches changent-elles de sens ?\nc) Quelle valeur écrit-on au bout des flèches, à cette abscisse ?",
          reponses: [
            { question: "a)", attendu: ["2x - 6", "f'(x) = 2x - 6"] },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "-7" },
          ],
          correction:
            "a) $f'(x) = 2x - 6$.\nb) $2x - 6 = 0$ pour $x = 3$. Avant 3, $f'$ est négative ; après, positive.\nc) $f(3) = 9 - 18 + 2 = -7$.\nAux bornes : $f(-1) = 1 + 6 + 2 = 9$ et $f(7) = 49 - 42 + 2 = 9$.\n⛔ Le piège au c) : écrire $f'(3) = 0$. Sous les flèches, on écrit les valeurs de $f$.\nRéponse : a) $2x - 6$ ; b) 3 ; c) $-7$.",
          schema: tableauDerivee([-1, 3, 7], ["-", "+"], [9, -7, 9]),
          micros: ["der_v_tableau"],
        },
        {
          enonce:
            "Soit $f(x) = 2x^2 - 8x$ sur $[0\\,;4]$.\na) En quelle valeur $f$ atteint-elle son minimum ?\nb) Quelle est la valeur de ce minimum ?",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "-8" },
          ],
          correction:
            "a) $f'(x) = 4x - 8$, qui s'annule en $x = 2$. $f'$ passe de $-$ à + : c'est un minimum.\nb) $f(2) = 2 \\times 4 - 16 = -8$.\n⛔ Le piège : confondre l'endroit, $x = 2$, et la valeur, $-8$.\nRéponse : a) 2 ; b) $-8$.",
          schema: tableauDerivee([0, 2, 4], ["-", "+"], [0, -8, 0]),
          micros: ["der_v_extremum"],
        },
        {
          enonce:
            "Voici le tableau de variations d'une fonction $f$ sur $[0\\,;8]$.\na) Quel est le maximum de $f$ ?\nb) En quelle valeur est-il atteint ?\nc) Quel est le minimum de $f$ ?\nd) En quelle valeur est-il atteint ?",
          figure: tableauDerivee([0, 4, 8], ["+", "-"], [-2, 6, 1]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "-2" },
            { question: "d)", attendu: "0" },
          ],
          correction:
            "a) et b) La flèche monte jusqu'en 4, puis descend : le maximum est 6, atteint en $x = 4$.\nc) et d) On compare les deux valeurs de bord : $f(0) = -2$ et $f(8) = 1$. Le plus petit est $-2$, atteint en $x = 0$.\n⛔ Le piège au c) : répondre 1, la dernière valeur. On compare toutes les valeurs du tableau.\nRéponse : a) 6 ; b) 4 ; c) $-2$ ; d) 0.",
          micros: ["der_v_extremum"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : la dérivée, son signe, le tableau, puis la conclusion.",
      rappel: [
        "La marche à suivre : dériver, trouver où $f'$ s'annule, donner son signe, dresser le tableau, calculer les valeurs.",
        "Une dérivée factorisée : on fait une ligne de signe par facteur, puis la règle des signes donne $f'$. Un nombre négatif devant change tous les signes.",
        "Un maximum local est le plus haut de son voisinage, sans être forcément le plus haut de tout l'intervalle. De même pour un minimum local.",
        "Sur la courbe de $f'$ : au-dessus de l'axe, $f'$ est positive ; en dessous, négative. Ce n'est pas la courbe de $f$.",
      ],
      exercices: [
        {
          enonce:
            "Une analyste de marché a tracé la courbe de la DÉRIVÉE $f'$ d'une fonction $f$, et non celle de $f$.\na) Quel est le signe de $f'(x)$ pour $x < 3$ ? Réponds positif ou négatif.\nb) Quel est le signe de $f'(x)$ pour $x > 3$ ? Réponds positif ou négatif.\nc) Sur $]-\\infty\\,;3]$, $f$ est-elle croissante ou décroissante ?\nd) En $x = 3$, $f$ a-t-elle un maximum ou un minimum ? Réponds maximum ou minimum.",
          figure: repere([-2, 6, -3, 5], [{ q: [0, -1, 3] }]),
          reponses: [
            { question: "a)", attendu: ["positif", "positive"] },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: ["croissante", "croissant"] },
            { question: "d)", attendu: "maximum" },
          ],
          correction:
            "a) Pour $x < 3$, la droite est au-dessus de l'axe : $f'(x)$ est positif.\nb) Pour $x > 3$, elle est en dessous : $f'(x)$ est négatif.\nc) $f'$ positive : $f$ est croissante.\nd) $f'$ passe de + à $-$ : $f$ monte, puis descend. C'est un maximum.\n⛔ Le piège au c) : lire le dessin comme la courbe de $f$, et dire « décroissante » parce que la droite descend.\nRéponse : a) positif ; b) négatif ; c) croissante ; d) maximum.",
          schema: tableauSignes(["−∞", "3", "+∞"], [["$f'(x)$", ["+", "-"], ["0"]]]),
          micros: ["der_v_signe_derivee", "der_v_lien_signe", "der_v_extremum"],
        },
        {
          enonce:
            "Une parapentiste modélise son altitude par $A(t) = t^2 - 8t + 30$, en hectomètres, où $t$ est le temps en minutes, sur $[0\\,;8]$.\na) Donne l'expression de $A'(t)$.\nb) En quelle valeur $A'(t)$ change-t-elle de signe ?\nc) Quel est le signe de $A'(t)$ avant cette valeur ? Réponds positif ou négatif.\nd) Quelle est l'altitude minimale ?",
          reponses: [
            { question: "a)", attendu: ["2t - 8", "A'(t) = 2t - 8"] },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: ["négatif", "négative"] },
            { question: "d)", attendu: "14" },
          ],
          correction:
            "a) $A'(t) = 2t - 8$.\nb) $2t - 8 = 0$ pour $t = 4$.\nc) Avant 4, $A'(t)$ est négatif : par exemple $A'(0) = -8$. L'altitude baisse.\nd) $A(4) = 16 - 32 + 30 = 14$ hectomètres.\nAux bornes : $A(0) = 30$ et $A(8) = 30$.\n⛔ Le piège au d) : répondre 4. Ce nombre est l'instant, l'altitude est $A(4)$.\nRéponse : a) $2t - 8$ ; b) 4 ; c) négatif ; d) 14.",
          schema: tableauDerivee([0, 4, 8], ["-", "+"], [30, 14, 30], "A", "t"),
          micros: ["der_v_signe_derivee", "der_v_tableau", "der_v_extremum"],
        },
        {
          enonce:
            "Une fromagère chauffe, puis laisse refroidir, une cuve de lait. La température est $T(t) = -2t^2 + 24t + 20$, en °C, où $t$ est le temps en minutes, sur $[0\\,;10]$ (modèle).\na) Donne l'expression de $T'(t)$.\nb) En quelle valeur $T'(t)$ s'annule-t-elle ?\nc) Quelle est la température maximale ?\nd) Quelle est la température à la fin, à $t = 10$ ?",
          reponses: [
            { question: "a)", attendu: ["-4t + 24", "T'(t) = -4t + 24"] },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "92" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "a) $T'(t) = -4t + 24$.\nb) $-4t + 24 = 0$ pour $t = 6$. Avant 6, $T'$ est positive ; après, négative.\nc) $T(6) = -72 + 144 + 20 = 92$ °C.\nd) $T(10) = -200 + 240 + 20 = 60$ °C.\nAu départ, $T(0) = 20$ °C.\n⛔ Le piège au c) : prendre la valeur à la fin, $T(10)$. Le maximum est là où la flèche change de sens.\nRéponse : a) $-4t + 24$ ; b) 6 ; c) 92 ; d) 60.",
          schema: tableauDerivee([0, 6, 10], ["+", "-"], [20, 92, 60], "T", "t"),
          micros: ["der_v_tableau", "der_v_extremum"],
        },
        {
          enonce:
            "Une économiste a factorisé une dérivée : $f'(x) = 2(x + 3)(x - 2)$.\na) En quelles valeurs $f'(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f'(x)$ entre ces deux valeurs ? Réponds positif ou négatif.\nc) Quel est le signe de $f'(x)$ après la plus grande de ces valeurs ? Réponds positif ou négatif.\nd) Entre ces deux valeurs, $f$ est-elle croissante ou décroissante ?",
          reponses: [
            { question: "a)", attendu: "-3 ; 2" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: ["positif", "positive"] },
            { question: "d)", attendu: ["décroissante", "décroissant"] },
          ],
          correction:
            "a) $x + 3 = 0$ pour $x = -3$, et $x - 2 = 0$ pour $x = 2$.\nb) Entre $-3$ et 2 : $x + 3$ est positif et $x - 2$ est négatif. Le produit est négatif.\nc) Pour $x > 2$ : les deux facteurs sont positifs, le produit aussi.\nd) $f'$ négative sur $[-3\\,;2]$ : $f$ est décroissante.\n⛔ Le piège au a) : répondre 3 et $-2$. On change le signe du nombre dans la parenthèse.\nRéponse : a) $-3$ et 2 ; b) négatif ; c) positif ; d) décroissante.",
          schema: tableauSignes(["−∞", "−3", "2", "+∞"], [
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$x - 2$", ["-", "-", "+"], ["", "0"]],
            ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["der_v_signe_derivee", "der_v_lien_signe"],
        },
        {
          enonce:
            "Un ingénieur acoustique modélise un signal par $h(x) = x^3 - 12x$ sur $[-4\\,;4]$. On admet que $h'(x) = 3(x + 2)(x - 2)$.\na) En quelle valeur $h$ a-t-elle un maximum local ?\nb) En quelle valeur $h$ a-t-elle un minimum local ?\nc) Calcule la valeur de ce maximum local.\nd) Calcule la valeur de ce minimum local.",
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "16" },
            { question: "d)", attendu: "-16" },
          ],
          correction:
            "$h'$ s'annule en $-2$ et en 2. Le signe est + avant $-2$, $-$ entre $-2$ et 2, + après 2.\na) En $-2$, $h'$ passe de + à $-$ : maximum local.\nb) En 2, $h'$ passe de $-$ à + : minimum local.\nc) $h(-2) = -8 + 24 = 16$.\nd) $h(2) = 8 - 24 = -16$.\nAux bornes : $h(-4) = -16$ et $h(4) = 16$.\n⛔ Le piège au c) : écrire $(-2)^3 = 8$. Un cube garde le signe : $(-2)^3 = -8$.\nRéponse : a) $-2$ ; b) 2 ; c) 16 ; d) $-16$.",
          schema: tableauDerivee([-4, -2, 2, 4], ["+", "-", "+"], [-16, 16, -16, 16], "h"),
          micros: ["der_v_tableau", "der_v_extremum"],
        },
        {
          enonce:
            "Une agente de voyages étudie $f$, le nombre de ses réservations, où $x$ est le temps en mois, sur $[0\\,;7]$ (modèle). Elle obtient $f'(x) = -(x - 2)(x - 5)$.\na) En quelles valeurs $f'(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f'(x)$ entre ces deux valeurs ? Réponds positif ou négatif.\nc) Quel est le signe de $f'(x)$ avant la plus petite de ces valeurs ? Réponds positif ou négatif.\nd) En quelle valeur $f$ a-t-elle un maximum local ?\ne) En quelle valeur $f$ a-t-elle un minimum local ?",
          reponses: [
            { question: "a)", attendu: "2 ; 5" },
            { question: "b)", attendu: ["positif", "positive"] },
            { question: "c)", attendu: ["négatif", "négative"] },
            { question: "d)", attendu: "5" },
            { question: "e)", attendu: "2" },
          ],
          correction:
            "a) $x - 2 = 0$ pour $x = 2$, et $x - 5 = 0$ pour $x = 5$.\nb) Entre 2 et 5, le produit $(x - 2)(x - 5)$ est négatif ; le moins devant le rend positif. Exemple : $f'(3) = -(1)(-2) = 2$.\nc) Sur $[0\\,;2[$, le produit est positif ; le moins devant le rend négatif. Exemple : $f'(0) = -10$.\nd) En 5, $f'$ passe de + à $-$ : maximum local.\ne) En 2, $f'$ passe de $-$ à + : minimum local.\n⛔ Le piège au b) : oublier le moins devant la parenthèse. Il inverse tous les signes.\nRéponse : a) 2 et 5 ; b) positif ; c) négatif ; d) 5 ; e) 2.",
          schema: tableauSignes(["0", "2", "5", "7"], [["$f'(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["der_v_signe_derivee", "der_v_extremum"],
        },
        {
          enonce:
            "La cofondatrice d'une start-up modélise son résultat par $g(x) = -x^2 + 10x - 16$, en milliers d'euros, où $x$ est le nombre de mois, sur $[0\\,;10]$.\na) Donne l'expression de $g'(x)$.\nb) En quelle valeur $g'(x)$ s'annule-t-elle ?\nc) Calcule le résultat à cette valeur.\nd) Calcule $g(0)$ et $g(10)$. Donne les deux nombres dans cet ordre.\ne) Sur quel intervalle le résultat augmente-t-il ?",
          reponses: [
            { question: "a)", attendu: ["-2x + 10", "g'(x) = -2x + 10"] },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "9" },
            { question: "d)", attendu: "-16 ; -16", ordre: true },
            { question: "e)", attendu: ["[0 ; 5]", "[0 ; 5[", "]0 ; 5[", "]0 ; 5]", "entre 0 et 5"] },
          ],
          correction:
            "a) $g'(x) = -2x + 10$.\nb) $-2x + 10 = 0$ pour $x = 5$.\nc) $g(5) = -25 + 50 - 16 = 9$.\nd) $g(0) = -16$ et $g(10) = -100 + 100 - 16 = -16$.\ne) Avant 5, $g'$ est positive : le résultat augmente sur $[0\\,;5]$.\n⛔ Le piège au e) : répondre avec les valeurs de $g$, $[-16\\,;9]$. Un intervalle de variation se donne en $x$.\nRéponse : a) $-2x + 10$ ; b) 5 ; c) 9 ; d) $-16$ ; $-16$ ; e) $[0\\,;5]$.",
          schema: tableauDerivee([0, 5, 10], ["+", "-"], [-16, 9, -16], "g"),
          micros: ["der_v_tableau", "der_v_extremum"],
        },
        {
          enonce:
            "Un hydrologue note $N(t)$ le niveau d'une rivière par rapport à un repère, où $t$ est le temps en jours. Sur $]1\\,;3[$, on a $N(t) > 0$ et $N'(t) < 0$.\na) Sur cet intervalle, la courbe de $N$ monte-t-elle ou descend-elle ? Réponds monte ou descend.\nb) Est-elle au-dessus ou au-dessous de l'axe des abscisses ? Réponds au-dessus ou au-dessous.\nc) Une autre fonction $g$, définie sur tous les réels, vérifie $g'(x) > 0$ pour tout $x$. A-t-elle un extremum ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "descend" },
            { question: "b)", attendu: ["au-dessus", "au dessus"] },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) $N'(t) < 0$ : la fonction est décroissante, la courbe descend.\nb) $N(t) > 0$ : la courbe est au-dessus de l'axe.\nc) Si $g'$ reste positive, $g$ monte tout le temps : elle n'a ni maximum ni minimum.\n⛔ Le piège au b) : confondre le signe de $N$ et celui de $N'$. Le premier donne la position, le second le sens.\nRéponse : a) descend ; b) au-dessus ; c) non.",
          micros: ["der_v_lien_signe"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une étude complète : dérivée, signe, tableau, extremum, et une réponse dans le contexte.",
      rappel: [
        "Le tableau complet contient toutes les bornes et tous les endroits où la dérivée s'annule.",
        "L'extremum sur un intervalle : on compare TOUTES les valeurs du tableau, il peut être atteint à une borne.",
        "$f'(a) = 0$ ne suffit pas : il y a un extremum seulement si $f'$ change de signe en $a$.",
      ],
      exercices: [
        {
          titre: "La serre du maraîcher",
          enonce:
            "Un maraîcher modélise la température de sa serre par $S(t) = -0{,}5t^2 + 6t + 10$, en °C, où $t$ est le nombre d'heures après 6 h du matin, sur $[0\\,;12]$.\na) Donne l'expression de $S'(t)$.\nb) En quelle valeur $S'(t)$ s'annule-t-elle ?\nc) Quelle est la température maximale ?\nd) À quelle heure de la journée est-elle atteinte ?\ne) Quelle est la température à 18 h ?",
          reponses: [
            { question: "a)", attendu: ["-t + 6", "S'(t) = -t + 6"] },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "28" },
            { question: "d)", attendu: ["12 h", "12h00", "midi", "à midi", "à 12 h"] },
            { question: "e)", attendu: "10" },
          ],
          correction:
            "a) $S'(t) = -t + 6$.\nb) $-t + 6 = 0$ pour $t = 6$. Avant, $S'$ est positive ; après, négative.\nc) $S(6) = -18 + 36 + 10 = 28$ °C.\nd) $t = 6$ veut dire 6 heures après 6 h : à 12 h, soit 12h00, midi.\ne) 18 h, c'est $t = 12$ : $S(12) = -72 + 72 + 10 = 10$ °C.\n⛔ Le piège au d) : répondre 6 h. Le $t$ compte les heures APRÈS 6 h du matin.\nRéponse : a) $-t + 6$ ; b) 6 ; c) 28 ; d) 12 h ; e) 10.",
          schema: tableauDerivee([0, 6, 12], ["+", "-"], [10, 28, 10], "S", "t"),
          micros: ["der_v_tableau", "der_v_extremum"],
        },
        {
          titre: "L'étang à truites",
          enonce:
            "Un pisciculteur modélise le nombre de truites par $P(t) = t^3 - 9t^2 + 24t + 10$, en centaines, où $t$ est le temps en années, sur $[0\\,;5]$. On admet que $P'(t) = 3(t - 2)(t - 4)$.\na) En quelles valeurs $P'(t)$ s'annule-t-elle ?\nb) Calcule $P$ à la plus petite de ces valeurs.\nc) Calcule $P$ à la plus grande de ces valeurs.\nd) Calcule $P(0)$ et $P(5)$. Donne les deux nombres dans cet ordre.\ne) Quel est le maximum de $P$ sur $[0\\,;5]$ ?\nf) En quelles valeurs est-il atteint ?\ng) Quel est le minimum de $P$ sur $[0\\,;5]$ ?",
          reponses: [
            { question: "a)", attendu: "2 ; 4" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "26" },
            { question: "d)", attendu: "10 ; 30", ordre: true },
            { question: "e)", attendu: "30" },
            { question: "f)", attendu: "2 ; 5" },
            { question: "g)", attendu: "10" },
          ],
          correction:
            "a) $t - 2 = 0$ ou $t - 4 = 0$, donc $t = 2$ ou $t = 4$.\nb) $P(2) = 8 - 36 + 48 + 10 = 30$.\nc) $P(4) = 64 - 144 + 96 + 10 = 26$.\nd) $P(0) = 10$ et $P(5) = 125 - 225 + 120 + 10 = 30$.\ne) et f) La plus grande valeur du tableau est 30, atteinte deux fois : en $t = 2$ et en $t = 5$.\ng) La plus petite valeur est 10, atteinte en $t = 0$.\n⛔ Le piège au g) : répondre 26, le minimum local. Sur tout l'intervalle, on compare aussi les bornes.\nRéponse : a) 2 et 4 ; b) 30 ; c) 26 ; d) 10 ; 30 ; e) 30 ; f) 2 et 5 ; g) 10.",
          schema: tableauDerivee([0, 2, 4, 5], ["+", "-", "+"], [10, 30, 26, 30], "P", "t"),
          micros: ["der_v_tableau", "der_v_extremum"],
        },
        {
          titre: "La courbe de la dérivée",
          enonce:
            "Une chargée d'études a tracé la courbe de la DÉRIVÉE $f'$ du chiffre d'affaires $f$ d'un site de vente en ligne (modèle).\na) En quelles valeurs $f'(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f'(x)$ entre ces deux valeurs ? Réponds positif ou négatif.\nc) Sur cet intervalle, $f$ est-elle croissante ou décroissante ?\nd) En quelle valeur $f$ a-t-elle un maximum local ?\ne) En quelle valeur $f$ a-t-elle un minimum local ?",
          figure: repere([-3, 5, -5, 6], [{ q: [1, -2, -3] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "-1 ; 3" },
            { question: "b)", attendu: ["négatif", "négative"] },
            { question: "c)", attendu: ["décroissante", "décroissant"] },
            { question: "d)", attendu: "-1" },
            { question: "e)", attendu: "3" },
          ],
          correction:
            "a) La courbe de $f'$ coupe l'axe en $-1$ et en 3.\nb) Entre les deux, elle est sous l'axe : $f'(x)$ est négatif.\nc) $f'$ négative : $f$ est décroissante.\nd) En $-1$, $f'$ passe de + à $-$ : maximum local.\ne) En 3, $f'$ passe de $-$ à + : minimum local.\n⛔ Le piège au e) : prendre le creux de la courbe, en $x = 1$, pour le minimum de $f$. Cette courbe est celle de $f'$ : on lit son SIGNE, pas son creux.\nRéponse : a) $-1$ et 3 ; b) négatif ; c) décroissante ; d) $-1$ ; e) 3.",
          schema: tableauSignes(["−∞", "−1", "3", "+∞"], [["$f'(x)$", ["+", "-", "+"], ["0", "0"]]]),
          micros: ["der_v_signe_derivee", "der_v_lien_signe", "der_v_extremum"],
        },
        {
          titre: "Zélie et Karim",
          enonce:
            "Dans un bureau d'études, Zélie étudie $f(x) = x^3 + 3x + 1$ et Karim étudie $g(x) = x^3$.\na) Donne l'expression de $f'(x)$.\nb) Quel est le signe de $f'(x)$, pour tout $x$ ? Réponds positif ou négatif.\nc) La fonction $f$ a-t-elle un extremum ? Réponds oui ou non.\nd) Calcule $g'(0)$.\ne) Quel est le signe de $g'(x)$ pour $x$ différent de 0 ? Réponds positif ou négatif.\nf) La fonction $g$ a-t-elle un extremum en 0 ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: ["3x^2 + 3", "f'(x) = 3x^2 + 3"] },
            { question: "b)", attendu: ["positif", "positive"] },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "0" },
            { question: "e)", attendu: ["positif", "positive"] },
            { question: "f)", attendu: "non" },
          ],
          correction:
            "a) $f'(x) = 3x^2 + 3$.\nb) Un carré est positif ou nul, donc $3x^2 + 3 \\ge 3 > 0$ : toujours positif.\nc) $f$ monte tout le temps : pas d'extremum.\nd) $g'(x) = 3x^2$, donc $g'(0) = 0$.\ne) Pour $x$ différent de 0, $3x^2$ est positif.\nf) $g'$ s'annule en 0 mais ne change pas de signe : $g$ monte avant et après. Pas d'extremum.\n⛔ Le piège au f) : conclure « extremum » dès que la dérivée s'annule. Il faut un changement de signe.\nRéponse : a) $3x^2 + 3$ ; b) positif ; c) non ; d) 0 ; e) positif ; f) non.",
          micros: ["der_v_signe_derivee", "der_v_extremum"],
        },
      ],
    },
  ],
};
