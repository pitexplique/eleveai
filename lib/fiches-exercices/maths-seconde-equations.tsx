// ─── Fiche d'exercices : équations et inéquations du 1er degré (seconde) ───────
//
// Sixième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/equations-inequations.bank.ts`
// (notionId equations_inequations_1er_degre) et sur la fiche de cours
// `lib/fiches/maths-seconde-equations.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni 5x + 3 = 2x + 12, ni
// −4x + 1 ≥ 9, ni ses dix exercices).
//
// ⭐ L'IDÉE DE LA FICHE : une équation a UNE solution, une inéquation en a une
// INFINITÉ — qu'on écrit en intervalle et qu'on DESSINE. D'où la droite graduée
// à intervalle, ajoutée au canvas `number_line` le même jour (Frédéric : « sinon
// tu crées un canvas spécial ») : le crochet du dessin est celui qu'on écrit.
//
// ⛔ LE PIÈGE CENTRAL : diviser une inéquation par un nombre NÉGATIF retourne
// le sens (exercices 5, 12). Et deux cas limites que l'élève ne rencontre
// jamais : aucune solution, tous les nombres (exercice 13).
//
// ⭐ La Réunion au réel : le marché de Saint-Paul, le froid au Piton des Neiges.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-equations.mjs` —
// l'ensemble des solutions d'une inéquation est RETROUVÉ en testant la
// condition sur une grille de nombres, puis comparé à l'intervalle écrit.
//
// ⚠️ ÉCRITURE DES INTERVALLES : `]{-\infty}` et `]{-3}`, le moins ENTRE
// ACCOLADES. Sans elles, KaTeX lit le « ] » comme une parenthèse fermante et
// le « − » comme une soustraction : il affichait « ] − ∞ », espacé (vu au
// rendu, 21/09).
//
// Micro-compétences : equation_resoudre (1, 2, 3, 13), equation_probleme (7,
// 15, 17, 19, 20), inequation_resoudre (4, 5, 9, 10, 12, 16, 17, 19, 20),
// inequation_intervalle (4, 6, 9, 11, 12, 16, 17), comparer_difference_quotient
// (8, 14, 18, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/** Une droite graduée et UN intervalle dessus. ⛔ Dix graduations au plus. */
const droite = (
  min: number,
  max: number,
  step: number,
  iv: { de?: number; a?: number; deInclus?: boolean; aInclus?: boolean; label?: string },
) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        // ⛔ 260 ET NON 300 — MESURÉ À 375 PX (21/09) : dans une correction, le
        // dessin fait 209 px de large ; un cadre de 300 y rendait les nombres
        // (écrits en 14) à 9,75 px. À 260 : 11,25 px, au-dessus du seuil de 11.
        // D'où aussi dix graduations au plus par axe.
        size: { width: 260, height: 80 },
        intervalles: [iv],
        display: { showPoints: false },
      }}
    />
  </div>
);

export const exercicesEquationsSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "equations-inequations-1er-degre",
  titre: "Équations et inéquations",
  accroche:
    "Vingt exercices, du calcul seul au problème : résoudre, écrire les solutions en intervalle et les dessiner, mettre un problème en équation. Le marché de Saint-Paul, le froid au sommet du Piton des Neiges, une course à rattraper. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/equations-inequations-1er-degre", titre: "Équations et inéquations du premier degré" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une résolution par exercice. On fait la même opération des deux côtés, et on vérifie.",
      rappel: [
        "ÉQUATION : on garde l'égalité en faisant la MÊME opération des deux côtés. On regroupe les $x$ d'un côté, les nombres de l'autre, puis on divise.",
        "INÉQUATION : mêmes gestes, avec une exception. Multiplier ou diviser par un nombre NÉGATIF retourne le sens : $-2x < 6$ donne $x > -3$.",
        "INTERVALLE : $x > 2$ s'écrit $]2\\,;\\,+\\infty[$ et $x \\leqslant 2$ s'écrit $]{-\\infty}\\,;\\,2]$. Le crochet est tourné vers le nombre s'il est compris, à l'envers sinon.",
      ],
      exercices: [
        {
          enonce: "Résoudre.\na) $3x - 7 = 11$\nb) $5 - 2x = 13$\nc) $6x + 1 = 2x - 11$",
          correction:
            "On isole $x$ en faisant la même opération des deux côtés.\na) On ajoute $7$ : $3x = 18$. On divise par $3$ : $x = 6$.\nb) On retire $5$ : $-2x = 8$. On divise par $-2$ : $x = -4$.\nc) On retire $2x$ : $4x + 1 = -11$. On retire $1$ : $4x = -12$. Donc $x = -3$.\n⭐ On vérifie le c) : $6 \\times (-3) + 1 = -17$ et $2 \\times (-3) - 11 = -17$. ✓\n⛔ Le piège au b) : oublier le signe et répondre $x = 4$. On divise par $-2$, pas par $2$.",
          micros: ["equation_resoudre"],
        },
        {
          enonce: "Résoudre.\na) $2(x - 3) = 5x + 9$\nb) $\\dfrac{x}{3} + 2 = 7$\nc) $\\dfrac{x + 4}{2} = \\dfrac{x - 1}{3}$",
          correction:
            "a) On développe d'abord : $2x - 6 = 5x + 9$. On retire $5x$ : $-3x - 6 = 9$. On ajoute $6$ : $-3x = 15$. Donc $x = -5$.\nb) On retire $2$ : $\\dfrac{x}{3} = 5$. On multiplie par $3$ : $x = 15$.\nc) On multiplie les deux côtés par $6$ pour chasser les fractions : $3(x + 4) = 2(x - 1)$.\nDonc $3x + 12 = 2x - 2$, puis $x = -14$.\n⭐ On vérifie le c) : $\\dfrac{-10}{2} = -5$ et $\\dfrac{-15}{3} = -5$. ✓\n⛔ Le piège au c) : multiplier seulement le $x$ par $3$. Tout le numérateur est multiplié.",
          micros: ["equation_resoudre"],
        },
        {
          enonce: "a) Le nombre $-2$ est-il solution de $3x + 5 = x + 1$ ?\nb) Le nombre $1$ est-il solution de $2x - 7 = 5x - 4$ ?\nc) Résoudre l'équation du b).",
          correction:
            "Un nombre est solution s'il rend l'égalité VRAIE : on calcule les deux côtés séparément.\na) À gauche : $3 \\times (-2) + 5 = -1$. À droite : $-2 + 1 = -1$. Les deux côtés sont égaux : $-2$ est solution.\nb) À gauche : $2 \\times 1 - 7 = -5$. À droite : $5 \\times 1 - 4 = 1$. Les deux côtés diffèrent : $1$ n'est pas solution.\nc) On retire $5x$ : $-3x - 7 = -4$. On ajoute $7$ : $-3x = 3$. Donc $x = -1$.\n⭐ On vérifie : $2 \\times (-1) - 7 = -9$ et $5 \\times (-1) - 4 = -9$. ✓",
          micros: ["equation_resoudre"],
        },
        {
          enonce: "Résoudre, puis écrire l'ensemble des solutions sous forme d'intervalle.\na) $3x - 4 < 11$\nb) $2x + 7 \\geqslant 1$",
          correction:
            "On divise par un nombre POSITIF : le sens ne change pas.\na) On ajoute $4$ : $3x < 15$. On divise par $3$ : $x < 5$. Les solutions forment $]{-\\infty}\\,;\\,5[$.\nb) On retire $7$ : $2x \\geqslant -6$. On divise par $2$ : $x \\geqslant -3$. Les solutions forment $[-3\\,;\\,+\\infty[$.\n⭐ Au a), $5$ n'est pas solution ($3 \\times 5 - 4 = 11$, qui n'est pas plus petit que $11$) : le crochet est tourné vers l'extérieur.",
          micros: ["inequation_resoudre", "inequation_intervalle"],
        },
        {
          enonce: "Résoudre.\na) $-5x > 20$\nb) $7 - 2x \\leqslant 17$",
          correction:
            "On divise par un nombre NÉGATIF : le sens de l'inégalité se RETOURNE.\na) On divise par $-5$ : $x < -4$. Les solutions forment $]{-\\infty}\\,;\\,-4[$.\nb) On retire $7$ : $-2x \\leqslant 10$. On divise par $-2$ : $x \\geqslant -5$. Les solutions forment $[-5\\,;\\,+\\infty[$.\n⭐ On vérifie le a) avec $x = -10$, qui est plus petit que $-4$ : $-5 \\times (-10) = 50$, qui est bien plus grand que $20$. ✓\n⛔ Le piège : garder le sens et répondre $x > -4$. Avec $x = 0$, on aurait $0 > 20$ : faux.",
          schema: droite(-7, 2, 1, { de: -5, deInclus: true, label: "x ≥ −5" }),
          micros: ["inequation_resoudre"],
        },
        {
          enonce: "a) Écrire sous forme d'intervalle : $x > -1$ ; $x \\leqslant 2{,}5$ ; $-3 < x \\leqslant 4$.\nb) Le nombre $4$ appartient-il à $]{-3}\\,;\\,4]$ ? Et à $]{-3}\\,;\\,4[$ ?",
          correction:
            "a) $x > -1$ : $]{-1}\\,;\\,+\\infty[$. Le $-1$ n'est pas compris, le crochet est à l'envers.\n$x \\leqslant 2{,}5$ : $]{-\\infty}\\,;\\,2{,}5]$. Du côté de l'infini, le crochet est toujours ouvert.\n$-3 < x \\leqslant 4$ : $]{-3}\\,;\\,4]$.\nb) $4$ appartient à $]{-3}\\,;\\,4]$, car le crochet est tourné vers $4$. Mais $4$ n'appartient pas à $]{-3}\\,;\\,4[$.\n⛔ Le piège : écrire $[-\\infty$. L'infini n'est pas un nombre qu'on atteint : son crochet est toujours ouvert.",
          schema: droite(-4, 5, 1, { de: -3, a: 4, deInclus: false, aInclus: true, label: "]−3 ; 4]" }),
          micros: ["inequation_intervalle"],
        },
        {
          enonce: "« Je pense à un nombre. Je le multiplie par $4$ et je retire $6$. Je trouve le même résultat qu'en ajoutant $9$ à mon nombre. » Quel est ce nombre ?",
          correction:
            "On appelle $x$ le nombre pensé, et on traduit chaque phrase.\n« Je le multiplie par $4$ et je retire $6$ » : $4x - 6$. « En ajoutant $9$ à mon nombre » : $x + 9$.\nL'équation : $4x - 6 = x + 9$. On retire $x$ : $3x - 6 = 9$. On ajoute $6$ : $3x = 15$. Donc $x = 5$.\nLe nombre pensé est $5$. Vérification : $4 \\times 5 - 6 = 14$ et $5 + 9 = 14$. ✓",
          micros: ["equation_probleme"],
        },
        {
          enonce: "a) Comparer $A = \\dfrac{7}{9}$ et $B = 0{,}78$ en étudiant le signe de $A - B$.\nb) Comparer $2^{10}$ et $10^3$ en étudiant leur quotient.",
          correction:
            "a) On met au même dénominateur : $\\dfrac{7}{9} = \\dfrac{700}{900}$ et $0{,}78 = \\dfrac{702}{900}$.\n$A - B = \\dfrac{700 - 702}{900} = -\\dfrac{2}{900}$, qui est négatif. Donc $A < B$.\nb) $\\dfrac{2^{10}}{10^3} = \\dfrac{1\\,024}{1\\,000} = 1{,}024$, qui est plus grand que $1$. Donc $2^{10} > 10^3$.\n⭐ La différence se compare à $0$, le quotient se compare à $1$ (pour deux nombres positifs).\n⛔ Le piège au a) : arrondir $\\dfrac{7}{9}$ à $0{,}78$ et conclure qu'ils sont égaux. $\\dfrac{7}{9} = 0{,}777\\ldots$",
          micros: ["comparer_difference_quotient"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. On développe, on regroupe, puis on regarde le signe avant de diviser.",
      rappel: [
        "On développe d'abord, puis on regroupe les $x$ d'un côté. Au moment de diviser, on regarde le SIGNE du nombre.",
        "Des fractions : on multiplie TOUS les termes, des deux côtés, par le dénominateur commun.",
        "Deux inégalités à la fois, $a \\leqslant 2x + 3 < b$ : on fait la même opération sur les TROIS morceaux.",
      ],
      exercices: [
        {
          enonce: "Résoudre $3(2x - 1) - 4 < 2(x + 5)$. Écrire les solutions en intervalle, puis donner le plus grand entier solution.",
          correction:
            "On développe : $6x - 3 - 4 < 2x + 10$, soit $6x - 7 < 2x + 10$.\nOn retire $2x$ : $4x - 7 < 10$. On ajoute $7$ : $4x < 17$. On divise par $4$, positif : $x < \\dfrac{17}{4}$, c'est-à-dire $x < 4{,}25$.\nLes solutions forment $]{-\\infty}\\,;\\,\\dfrac{17}{4}[$.\nLe plus grand entier solution est $4$.\n⛔ Le piège : répondre $4{,}25$ au plus grand entier. $4{,}25$ n'est pas solution (crochet ouvert), et ce n'est pas un entier.",
          schema: droite(0, 8, 1, { a: 4.25, aInclus: false, label: "x < 4,25" }),
          micros: ["inequation_resoudre", "inequation_intervalle"],
        },
        {
          enonce: "Résoudre $\\dfrac{x}{2} - 1 > \\dfrac{x}{3} + 1$.",
          correction:
            "On multiplie les DEUX côtés par $6$, positif : le sens ne change pas. Chaque terme est multiplié.\n$6 \\times \\dfrac{x}{2} - 6 \\times 1 > 6 \\times \\dfrac{x}{3} + 6 \\times 1$, soit $3x - 6 > 2x + 6$.\nOn retire $2x$ : $x - 6 > 6$. Donc $x > 12$.\nLes solutions forment $]12\\,;\\,+\\infty[$.\n⛔ Le piège : multiplier seulement les fractions par $6$ et oublier les $1$. On obtiendrait $3x - 1 > 2x + 1$, donc $x > 2$ : faux. Avec $x = 3$, on a $0{,}5 > 2$, ce qui est faux.",
          micros: ["inequation_resoudre"],
        },
        {
          enonce: "Résoudre $-1 \\leqslant 2x + 3 < 9$. Écrire les solutions en intervalle, puis donner tous les entiers solutions.",
          correction:
            "On fait la même opération sur les trois morceaux.\nOn retire $3$ : $-4 \\leqslant 2x < 6$. On divise par $2$, positif : $-2 \\leqslant x < 3$.\nLes solutions forment $[-2\\,;\\,3[$.\nLes entiers solutions sont $-2$, $-1$, $0$, $1$ et $2$. Le $3$ n'en fait pas partie : le crochet est ouvert.\n⭐ On vérifie les bornes : pour $x = -2$, $2x + 3 = -1$, qui est bien $\\geqslant -1$. Pour $x = 3$, $2x + 3 = 9$, qui n'est pas $< 9$.",
          schema: droite(-4, 5, 1, { de: -2, a: 3, deInclus: true, aInclus: false, label: "[−2 ; 3[" }),
          micros: ["inequation_intervalle"],
        },
        {
          enonce: "Résoudre $1 - 3(x + 2) \\leqslant x + 3$.",
          correction:
            "On développe, en distribuant le $-3$ sur les deux termes : $1 - 3x - 6 \\leqslant x + 3$, soit $-3x - 5 \\leqslant x + 3$.\nOn retire $x$ : $-4x - 5 \\leqslant 3$. On ajoute $5$ : $-4x \\leqslant 8$.\nOn divise par $-4$, NÉGATIF : le sens se retourne. $x \\geqslant -2$.\nLes solutions forment $[-2\\,;\\,+\\infty[$.\n⛔ Deux pièges se cumulent ici : écrire $-3x + 6$ en développant, et garder le sens en divisant par $-4$.",
          micros: ["inequation_resoudre", "inequation_intervalle"],
        },
        {
          enonce: "Résoudre, et interpréter le résultat.\na) $3(x + 2) = 3x + 5$\nb) $2(x - 1) + 4 = 2x + 2$",
          correction:
            "a) On développe : $3x + 6 = 3x + 5$. On retire $3x$ : $6 = 5$, ce qui est FAUX.\nL'égalité est fausse quel que soit $x$ : l'équation n'a AUCUNE solution.\nb) On développe : $2x - 2 + 4 = 2x + 2$, soit $2x + 2 = 2x + 2$. On retire $2x$ : $2 = 2$, ce qui est toujours VRAI.\nTOUS les nombres sont solutions.\n⭐ Quand les $x$ disparaissent, il reste une phrase vraie ou fausse : c'est elle qui donne la réponse.",
          micros: ["equation_resoudre"],
        },
        {
          enonce: "a) Comparer $A = (x + 3)^2$ et $B = x(x + 6)$, pour tout nombre $x$, en étudiant $A - B$.\nb) Comparer $3^{20}$ et $9^9$ en étudiant leur quotient.",
          correction:
            "a) On développe : $A = x^2 + 6x + 9$ et $B = x^2 + 6x$.\n$A - B = x^2 + 6x + 9 - x^2 - 6x = 9$, qui est positif. Donc $A > B$, pour tout nombre $x$.\nb) On écrit $9^9$ avec la base $3$ : $9^9 = \\left(3^2\\right)^9 = 3^{18}$.\n$\\dfrac{3^{20}}{3^{18}} = 3^2 = 9$, qui est plus grand que $1$. Donc $3^{20} > 9^9$.\n⭐ La calculatrice aurait du mal ; le quotient règle la question en une ligne.",
          micros: ["comparer_difference_quotient"],
        },
        {
          enonce: "Au marché de Saint-Paul, $3$ kg de letchis et $2$ ananas coûtent $19$ €. Un ananas coûte $2$ € de plus qu'un kilo de letchis. Quel est le prix d'un kilo de letchis ? Et d'un ananas ?",
          correction:
            "On appelle $x$ le prix d'un kilo de letchis, en euros. Un ananas coûte alors $x + 2$.\nL'équation : $3x + 2(x + 2) = 19$.\nOn développe : $3x + 2x + 4 = 19$, soit $5x + 4 = 19$. Donc $5x = 15$ et $x = 3$.\nUn kilo de letchis coûte $3$ € et un ananas $5$ €.\nVérification : $3 \\times 3 + 2 \\times 5 = 9 + 10 = 19$. ✓\n⛔ Le piège : écrire $2x + 2$ pour les deux ananas. Ce sont DEUX ananas à $x + 2$ chacun : $2(x + 2)$.",
          micros: ["equation_probleme"],
        },
        {
          enonce: "Au cinéma, deux tarifs.\n• Tarif A : $9$ € la place.\n• Tarif B : une carte à $30$ € par an, puis $6$ € la place.\nÀ partir de combien de places par an le tarif B est-il moins cher ?",
          correction:
            "On appelle $x$ le nombre de places. Tarif A : $9x$. Tarif B : $30 + 6x$.\nOn cherche quand B est moins cher : $30 + 6x < 9x$.\nOn retire $6x$ : $30 < 3x$. On divise par $3$ : $x > 10$.\nLe tarif B est moins cher à partir de $11$ places par an.\n⭐ À $10$ places, les deux tarifs coûtent pareil : $9 \\times 10 = 90$ € et $30 + 60 = 90$ €.\n⛔ Le piège : répondre « à partir de $10$ ». L'inégalité est stricte, et on compte des places entières.",
          schema: droite(7, 15, 1, { de: 10, deInclus: false, label: "B moins cher" }),
          micros: ["inequation_resoudre", "inequation_intervalle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes. On nomme l'inconnue, on écrit l'équation ou l'inéquation, et on conclut par une phrase.",
      rappel: [
        "On nomme l'inconnue avec son unité, on écrit l'équation ou l'inéquation, on la résout, et on répond à la QUESTION posée.",
        "Une réponse se vérifie dans l'énoncé, pas seulement dans l'équation.",
      ],
      exercices: [
        {
          titre: "Froid au sommet",
          enonce: "À Cilaos, à $1\\,200$ m d'altitude, il fait $20$ °C. La température baisse d'environ $0{,}6$ °C tous les $100$ m. À l'altitude $h$ (en m), elle vaut donc $T = 20 - 0{,}006(h - 1\\,200)$.\na) Quelle température fait-il au sommet du Piton des Neiges, à $3\\,070$ m ?\nb) À quelle altitude fait-il $11$ °C ?\nc) Sur le chemin du sommet, à partir de quelle altitude fait-il moins de $11$ °C ?",
          correction:
            "a) $T = 20 - 0{,}006 \\times 1\\,870 = 20 - 11{,}22 = 8{,}78$ °C. Il fait un peu moins de $9$ °C au sommet.\nb) On résout $20 - 0{,}006(h - 1\\,200) = 11$. On retire $20$ : $-0{,}006(h - 1\\,200) = -9$.\nOn divise par $-0{,}006$ : $h - 1\\,200 = 1\\,500$, donc $h = 2\\,700$ m.\nc) $T < 11$ donne $-0{,}006(h - 1\\,200) < -9$. On divise par $-0{,}006$, négatif : le sens se retourne. $h - 1\\,200 > 1\\,500$, donc $h > 2\\,700$.\nIl fait moins de $11$ °C au-dessus de $2\\,700$ m, jusqu'au sommet : $h$ est dans $]2\\,700\\,;\\,3\\,070]$.\n⭐ Plus on monte, plus il fait froid : c'est pour cela que le sens s'est retourné.",
          // Échelle resserrée sur le haut de la montagne (21/09) : de 1 200 à 3 200 m,
          // l'intervalle tenait dans un coin de l'axe, crochets collés aux nombres.
          schema: droite(2400, 3200, 200, { de: 2700, a: 3070, deInclus: false, aInclus: true, label: "moins de 11 °C" }),
          micros: ["equation_probleme", "inequation_resoudre", "inequation_intervalle"],
        },
        {
          titre: "Le rectangle ou le carré ?",
          enonce: "Soit $x > 1$. Un carré a pour côté $x$ cm. Un rectangle mesure $x + 5$ cm sur $x - 1$ cm.\na) Exprimer l'aire du rectangle, sous forme développée.\nb) Calculer la différence entre l'aire du rectangle et celle du carré.\nc) Pour quelles valeurs de $x$ le rectangle a-t-il la plus grande aire ?",
          correction:
            "a) $(x + 5)(x - 1) = x^2 - x + 5x - 5 = x^2 + 4x - 5$.\nb) On retire l'aire du carré, $x^2$ : $x^2 + 4x - 5 - x^2 = 4x - 5$.\nc) Le rectangle est plus grand quand la différence est positive : $4x - 5 > 0$, donc $4x > 5$ et $x > \\dfrac{5}{4}$, soit $x > 1{,}25$.\nPour $x = 1{,}25$, les deux aires sont égales ; en dessous, c'est le carré qui l'emporte.\n⭐ Vérification avec $x = 2$ : le rectangle fait $7 \\times 1 = 7$ cm² et le carré $4$ cm². ✓",
          micros: ["comparer_difference_quotient", "inequation_resoudre"],
        },
        {
          titre: "La note qu'il faut",
          enonce: "Léo a eu $8$, $12$ et $11$ à trois devoirs de coefficient $1$. Le dernier devoir du trimestre compte double (coefficient $2$).\na) On appelle $x$ sa note au dernier devoir. Exprimer sa moyenne en fonction de $x$.\nb) Quelle note doit-il obtenir pour avoir au moins $12$ de moyenne ?\nc) Peut-il encore atteindre $15$ de moyenne ?",
          correction:
            "a) On additionne les notes, la dernière comptée deux fois, et on divise par la somme des coefficients, $1 + 1 + 1 + 2 = 5$ : $\\dfrac{8 + 12 + 11 + 2x}{5} = \\dfrac{31 + 2x}{5}$.\nb) On résout $\\dfrac{31 + 2x}{5} \\geqslant 12$. On multiplie par $5$ : $31 + 2x \\geqslant 60$. Donc $2x \\geqslant 29$ et $x \\geqslant 14{,}5$.\nIl doit avoir au moins $14{,}5$ au dernier devoir.\nc) $\\dfrac{31 + 2x}{5} \\geqslant 15$ donne $31 + 2x \\geqslant 75$, donc $x \\geqslant 22$. C'est impossible : la note est au plus $20$.\n⛔ Le piège au a) : diviser par $4$, le nombre de devoirs. On divise par la somme des coefficients.",
          micros: ["equation_probleme", "inequation_resoudre"],
        },
        {
          titre: "La course à rattraper",
          enonce: "Sur une course de $10$ km, Tom part avec $2$ km d'avance et court à $9$ km/h. Léa part de la ligne de départ, en même temps, à $12$ km/h. Au bout de $t$ heures, Léa a parcouru $12t$ km et Tom se trouve à $2 + 9t$ km du départ.\na) Au bout de combien de temps Léa rattrape-t-elle Tom ? À quel kilomètre ?\nb) Qui franchit la ligne d'arrivée en premier ?\nc) Quelle avance faudrait-il donner à Tom pour qu'il gagne ?",
          correction:
            "a) On résout $12t = 2 + 9t$ : $3t = 2$, donc $t = \\dfrac{2}{3}$ h, soit $40$ min. Léa a alors couru $12 \\times \\dfrac{2}{3} = 8$ km.\nb) Léa met $\\dfrac{10}{12}$ h, soit $50$ min. Tom doit courir $8$ km : $\\dfrac{8}{9}$ h, soit $53$ min $20$ s. Léa gagne.\nc) Avec une avance de $d$ km, Tom court $10 - d$ km en $\\dfrac{10 - d}{9}$ h. Il gagne si $\\dfrac{10 - d}{9} < \\dfrac{10}{12}$.\nOn multiplie par $9$ : $10 - d < 7{,}5$, donc $-d < -2{,}5$ et $d > 2{,}5$.\nIl faudrait donner à Tom plus de $2{,}5$ km d'avance.\n⭐ Léa rattrape Tom au kilomètre $8$, avant l'arrivée : c'est pour cela qu'elle gagne.",
          micros: ["equation_probleme", "inequation_resoudre", "comparer_difference_quotient"],
        },
      ],
    },
  ],
};
