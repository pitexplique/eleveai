// ─── Fiche d'exercices : le calcul littéral (3e) — 20 exercices corrigés ───────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-calcul-litteral.tsx` et sur
// les micros du coach de 3e (notionId litteral_calcul). Le fil de la fiche de
// cours : TROIS VERBES (développer, réduire, factoriser) et la différence de deux
// carrés. On reste en 3e : pas d'équation produit nul à résoudre (c'est la
// notion des équations), pas de racines dans les identités (c'est la seconde).
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni 3(x + 4), ni
// (2x + 1)(x + 3), ni (x + 3)², ni (x + 2)², ni (x − 5)², ni x² − 36, x² − 49,
// x² − 81, ni 7x + 21, 6x² + 4x, 5x² + 3x, ni -2(x − 5), ni (x + 4)(x + 2).
//
// ⭐⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : LE MODÈLE DES AIRES.
// Un produit (a + b)(c + d) est l'aire d'un rectangle découpé en quatre
// morceaux, un par produit ; (a + b)² est un carré découpé en a², ab, ab, b² —
// les deux rectangles du milieu SONT le double produit qu'on oublie. Les
// programmes de calcul sont testés dans un `tableau()` sur plusieurs nombres.
// 17 corrigés dessinés sur 20 (1, 12 et 16 n'en ont pas besoin).
//
// Les pièges qui reviennent : (a + b)² ≠ a² + b² (1, 7, 13, 16, 17), le moins
// devant une parenthèse (4, 10, 12, 14), des essais ne prouvent rien (11, 16, 19).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-calcul-litteral-3e.mjs` —
// chaque forme est lue telle qu'elle est écrite et comparée à l'expression de
// départ en neuf valeurs de x ; chaque case des dessins d'aires est relue et
// recalculée comme « côté × côté » ; chaque tableau est rejoué sur le programme.
//
// Micro-compétences : litteral_comprendre (1, 11, 16, 19), litteral_substituer
// (2, 9, 11, 15, 18, 20), litteral_reduire (3, 10, 15, 18), litteral_developper
// (4, 5, 7, 9, 10, 15, 17, 18), litteral_factoriser (6, 8, 9, 12, 20),
// litteral_identite (7, 8, 9, 10, 11, 13, 14, 17, 19, 20), litteral_defi (11,
// 13, 14, 16, 17, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

// ⭐ LE MODÈLE DES AIRES : un rectangle découpé. `haut` = les morceaux du côté
// du haut (étiquette, longueur dessinée), `cote` = ceux du côté gauche, `cases`
// = l'aire de chaque morceau, ligne par ligne. Un carré (même étiquette en
// ligne et en colonne) en bleu, un morceau négatif en rose, les autres en
// orange. Texte NU (x², pas `$`).
// ⛔ Le script de recalcul relit l'appel `aires(…)` : l'écrire sur UNE ligne,
// en tableaux JSON, et chaque case doit valoir « ligne × colonne ».
type Bord = [string, number];
const aires = (haut: Bord[], cote: Bord[], cases: string[][]) => {
  const G = 44;
  const T = 22;
  const W = haut.reduce((s, [, l]) => s + l, 0);
  const H = cote.reduce((s, [, l]) => s + l, 0);
  const xs = haut.map((_, j) => G + haut.slice(0, j).reduce((s, [, l]) => s + l, 0));
  const ys = cote.map((_, i) => T + cote.slice(0, i).reduce((s, [, l]) => s + l, 0));
  const fond = (texte: string, i: number, j: number) =>
    texte.startsWith("−") ? "#fee2e2" : cote[i][0] === haut[j][0] ? "#dbeafe" : "#ffedd5";
  return (
    <svg
      viewBox={`0 0 ${G + W + 6} ${T + H + 6}`}
      role="img"
      aria-label={`Rectangle de côtés ${haut.map((h) => h[0]).join(" + ")} et ${cote.map((c) => c[0]).join(" + ")}, découpé en morceaux d'aires ${cases.flat().join(", ")}`}
      className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]"
    >
      {haut.map(([t, l], j) => (
        <text key={`h${j}`} x={xs[j] + l / 2} y={T - 7} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1d4ed8">
          {t}
        </text>
      ))}
      {cote.map(([t, l], i) => (
        <text key={`c${i}`} x={G - 7} y={ys[i] + l / 2 + 4} textAnchor="end" fontSize={13} fontWeight={700} fill="#1d4ed8">
          {t}
        </text>
      ))}
      {cote.map(([, h], i) =>
        haut.map(([, w], j) => (
          <g key={`${i}-${j}`}>
            <rect x={xs[j]} y={ys[i]} width={w} height={h} fill={fond(cases[i][j], i, j)} stroke="#334155" strokeWidth={1.2} />
            <text x={xs[j] + w / 2} y={ys[i] + h / 2 + 4} textAnchor="middle" fontSize={12} fill="#0f172a">
              {cases[i][j]}
            </text>
          </g>
        )),
      )}
    </svg>
  );
};

export const exercicesCalculLitteral3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "litteral-calcul",
  titre: "Le calcul littéral",
  accroche:
    "Vingt exercices, du geste seul au problème de brevet : traduire une phrase en calcul, remplacer la lettre par un nombre, réduire, développer, factoriser, et les identités remarquables. Puis un potager, le cadre d'un tableau, deux programmes de calcul. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape, le piège nommé, et souvent un dessin où chaque produit devient une aire.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/litteral-calcul", titre: "Calcul littéral : développer, réduire, factoriser" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je vérifie en remplaçant la lettre par un nombre.",
      rappel: [
        "Une expression littérale est un calcul où une lettre remplace un nombre. $3x$ veut dire $3 \\times x$, et $x^2$ veut dire $x \\times x$.",
        "RÉDUIRE : je regroupe les termes de la même famille. $5x - 2x = 3x$, mais $x^2$ et $x$ ne s'additionnent pas.",
        "DÉVELOPPER : $k(a + b) = ka + kb$, et $(a + b)(c + d) = ac + ad + bc + bd$. FACTORISER, c'est le chemin inverse : $ka + kb = k(a + b)$.",
        "Les identités remarquables : $(a + b)^2 = a^2 + 2ab + b^2$ ; $(a - b)^2 = a^2 - 2ab + b^2$ ; $(a + b)(a - b) = a^2 - b^2$.",
      ],
      exercices: [
        {
          enonce:
            "Écrire chaque phrase avec la lettre $x$.\na) Le double de $x$, augmenté de $5$.\nb) Le carré de la somme de $x$ et de $4$.\nc) La somme du carré de $x$ et de $4$.\nd) Le triple de la différence de $x$ et de $1$.\ne) Pour $x = 2$, calculer les expressions b) et c). Sont-elles égales ?",
          correction:
            "Je repère la DERNIÈRE opération de la phrase : c'est elle qui commande l'écriture.\na) « Le double de $x$ » s'écrit $2x$ ; « augmenté de $5$ », j'ajoute $5$ à la fin : $2x + 5$.\nb) La dernière opération est « le carré » : je mets la somme entre parenthèses, puis au carré : $(x + 4)^2$.\nc) La dernière opération est « la somme » : $x^2 + 4$.\nd) « Le triple de » porte sur toute la différence, donc des parenthèses : $3(x - 1)$.\ne) Pour $x = 2$ : $(2 + 4)^2 = 6^2 = 36$, mais $2^2 + 4 = 4 + 4 = 8$. Elles ne sont pas égales.\n⛔ Le piège : écrire $3x - 1$ au d). Sans parenthèses, seul $x$ est triplé, pas la différence.\nRéponse : $2x + 5$ ; $(x + 4)^2$ ; $x^2 + 4$ ; $3(x - 1)$.",
          micros: ["litteral_comprendre"],
        },
        {
          enonce: "On donne $A = 3x^2 - 5x + 2$. Calculer $A$ pour :\na) $x = 2$\nb) $x = -1$\nc) $x = -3$",
          correction:
            "Je remplace $x$ par sa valeur, ENTRE PARENTHÈSES dès qu'elle est négative, puis je respecte les priorités : d'abord la puissance, ensuite les produits, enfin les sommes.\na) $3 \\times 2^2 - 5 \\times 2 + 2 = 12 - 10 + 2 = 4$.\nb) $3 \\times (-1)^2 - 5 \\times (-1) + 2 = 3 + 5 + 2 = 10$.\nc) $3 \\times (-3)^2 - 5 \\times (-3) + 2 = 27 + 15 + 2 = 44$.\n⛔ Le piège au c) : taper $-3^2$ au lieu de $(-3)^2$. Sans parenthèses, le carré ne porte que sur le $3$ : $-3^2 = -9$, alors que $(-3)^2 = 9$. On trouverait $-27 + 15 + 2 = -10$.\nRéponse : $A = 4$ ; $A = 10$ ; $A = 44$.",
          schema: tableau(["x", "2", "−1", "−3"], ["A", 4, 10, 44]),
          micros: ["litteral_substituer"],
        },
        {
          enonce: "Réduire.\na) $4x + 7 - x + 3$\nb) $2x^2 + 5x - x^2 - 8x$\nc) $6x \\times 3x$\nd) $5 - 2x + 3x^2 - 4 + x$",
          correction:
            "Réduire une somme, c'est regrouper les termes de la MÊME famille : les $x^2$ ensemble, les $x$ ensemble, les nombres seuls ensemble.\na) Les $x$ : $4x - x = 3x$. Les nombres : $7 + 3 = 10$. Donc $4x + 7 - x + 3 = 3x + 10$.\nb) Les $x^2$ : $2x^2 - x^2 = x^2$. Les $x$ : $5x - 8x = -3x$. Donc $2x^2 + 5x - x^2 - 8x = x^2 - 3x$.\nc) Un produit se calcule : je multiplie les nombres entre eux, puis les lettres. $6 \\times 3 = 18$ et $x \\times x = x^2$, donc $6x \\times 3x = 18x^2$. C'est l'aire du rectangle dessiné.\nd) $3x^2$ est seul de sa famille ; $-2x + x = -x$ ; $5 - 4 = 1$. Donc $5 - 2x + 3x^2 - 4 + x = 3x^2 - x + 1$.\n⛔ Le piège : mélanger les familles, par exemple écrire $3x + 10 = 13x$. On n'additionne que des termes de la même famille ; les $x^2$, les $x$ et les nombres restent séparés.\nRéponse : $3x + 10$ ; $x^2 - 3x$ ; $18x^2$ ; $3x^2 - x + 1$.",
          schema: aires([["6x", 150]], [["3x", 75]], [["18x²"]]),
          micros: ["litteral_reduire"],
        },
        {
          enonce: "Développer et réduire.\na) $7(x - 3)$\nb) $-4(2x - 5)$\nc) $3x(x + 6)$\nd) $12 - 2(x + 4)$",
          correction:
            "Le facteur devant la parenthèse multiplie CHAQUE terme de la parenthèse, avec son signe.\na) $7(x - 3) = 7 \\times x - 7 \\times 3 = 7x - 21$.\nb) $-4(2x - 5) = -4 \\times 2x - 4 \\times (-5) = -8x + 20$.\nc) $3x(x + 6) = 3x \\times x + 3x \\times 6 = 3x^2 + 18x$. Le dessin : un rectangle de hauteur $3x$, coupé en deux morceaux.\nd) Le facteur est $-2$, signe compris : $12 - 2(x + 4) = 12 - 2x - 8 = 4 - 2x$.\n⛔ Le piège au d) : calculer d'abord $12 - 2 = 10$, puis $10(x + 4)$. La multiplication passe AVANT la soustraction : le $2$ appartient à la parenthèse, pas au $12$.\nRéponse : $7x - 21$ ; $-8x + 20$ ; $3x^2 + 18x$ ; $4 - 2x$.",
          schema: aires([["x", 60], ["6", 50]], [["3x", 120]], [["3x²", "18x"]]),
          micros: ["litteral_developper"],
        },
        {
          enonce: "Développer et réduire.\na) $(x + 5)(x + 3)$\nb) $(2x - 1)(x + 4)$",
          correction:
            "Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits, que j'écris tous avant de réduire.\na) $(x + 5)(x + 3) = x^2 + 3x + 5x + 15 = x^2 + 8x + 15$.\nb) $(2x - 1)(x + 4) = 2x^2 + 8x - x - 4 = 2x^2 + 7x - 4$.\n⭐ Le dessin du a) : un rectangle de côtés $x + 5$ et $x + 3$ se découpe en quatre morceaux, un par produit. L'aire totale est la somme des quatre aires.\n⛔ Le piège : ne multiplier que les premiers entre eux et les derniers entre eux, et écrire $x^2 + 15$. Il manque les deux rectangles orange, $5x$ et $3x$.\nRéponse : $x^2 + 8x + 15$ ; $2x^2 + 7x - 4$.",
          schema: aires([["x", 110], ["5", 55]], [["x", 110], ["3", 40]], [["x²", "5x"], ["3x", "15"]]),
          micros: ["litteral_developper"],
        },
        {
          enonce: "Factoriser.\na) $8x + 20$\nb) $9x^2 - 15x$\nc) $x^2 + x$\nd) $(x + 1)(2x + 3) + (x + 1)(x - 5)$",
          correction:
            "Factoriser, c'est le chemin inverse de développer : je cherche le facteur commun à TOUS les termes et je le mets devant.\na) $8x = 4 \\times 2x$ et $20 = 4 \\times 5$ : $8x + 20 = 4(2x + 5)$. Le dessin : un rectangle de hauteur $4$, dont la longueur est $2x + 5$.\nb) $9x^2 = 3x \\times 3x$ et $15x = 3x \\times 5$ : $9x^2 - 15x = 3x(3x - 5)$.\nc) $x^2 = x \\times x$ et $x = x \\times 1$ : $x^2 + x = x(x + 1)$.\nd) Le facteur commun est la parenthèse $(x + 1)$ tout entière : $(x + 1)(2x + 3) + (x + 1)(x - 5) = (x + 1)(2x + 3 + x - 5) = (x + 1)(3x - 2)$.\n⭐ Je vérifie en redéveloppant : $4(2x + 5)$ redonne bien $8x + 20$.\n⛔ Le piège au c) : écrire $x^2 + x = x \\times x$. Quand je sors $x$ du terme $x$, il reste $1$, pas rien.\nRéponse : $4(2x + 5)$ ; $3x(3x - 5)$ ; $x(x + 1)$ ; $(x + 1)(3x - 2)$.",
          schema: aires([["2x", 120], ["5", 60]], [["4", 45]], [["8x", "20"]]),
          micros: ["litteral_factoriser"],
        },
        {
          enonce: "Développer à l'aide des identités remarquables.\na) $(x + 6)^2$\nb) $(x - 2)^2$\nc) $(x + 10)(x - 10)$",
          correction:
            "Je reconnais d'abord la forme, puis je nomme $a$ et $b$.\na) Ici $a = x$ et $b = 6$ : $(x + 6)^2 = x^2 + 2 \\times x \\times 6 + 6^2 = x^2 + 12x + 36$.\nb) Ici $a = x$ et $b = 2$ : $(x - 2)^2 = x^2 - 2 \\times x \\times 2 + 2^2 = x^2 - 4x + 4$.\nc) Ici $a = x$ et $b = 10$ : $(x + 10)(x - 10) = x^2 - 10^2 = x^2 - 100$.\n⭐ Le dessin du a) : le carré de côté $x + 6$ se découpe en un carré $x^2$, un petit carré $36$, et DEUX rectangles de $6x$. Voilà d'où vient le $12x$ du milieu.\n⛔ Le piège : écrire $(x + 6)^2 = x^2 + 36$. Il manque les deux rectangles : pour $x = 1$, $(1 + 6)^2 = 49$, mais $1^2 + 36 = 37$.\nRéponse : $x^2 + 12x + 36$ ; $x^2 - 4x + 4$ ; $x^2 - 100$.",
          schema: aires([["x", 110], ["6", 60]], [["x", 110], ["6", 60]], [["x²", "6x"], ["6x", "36"]]),
          micros: ["litteral_identite", "litteral_developper"],
        },
        {
          enonce: "Factoriser à l'aide d'une identité remarquable.\na) $x^2 - 25$\nb) $49 - x^2$\nc) $4x^2 - 9$",
          correction:
            "Une différence de deux carrés se factorise : $a^2 - b^2 = (a - b)(a + b)$. Je repère d'abord les deux carrés.\na) $x^2 - 25 = x^2 - 5^2 = (x - 5)(x + 5)$.\nb) $49 - x^2 = 7^2 - x^2 = (7 - x)(7 + x)$.\nc) $4x^2 = (2x)^2$ et $9 = 3^2$ : $4x^2 - 9 = (2x)^2 - 3^2 = (2x - 3)(2x + 3)$.\n⭐ Je vérifie le c) en redéveloppant, c'est le dessin : les deux rectangles $6x$ et $-6x$ s'annulent, il reste $4x^2 - 9$.\n⛔ Le piège : écrire $(x - 5)^2$ au a). Or $(x - 5)^2 = x^2 - 10x + 25$ : un terme en $x$ en trop, et $+25$ au lieu de $-25$.\n⛔ Autre piège au c) : écrire $(4x - 3)(4x + 3)$. Le carré de $4x$ vaut $16x^2$ : ce qui a pour carré $4x^2$, c'est $2x$.\nRéponse : $(x - 5)(x + 5)$ ; $(7 - x)(7 + x)$ ; $(2x - 3)(2x + 3)$.",
          schema: aires([["2x", 110], ["3", 50]], [["2x", 110], ["−3", 50]], [["4x²", "6x"], ["−6x", "−9"]]),
          micros: ["litteral_identite", "litteral_factoriser"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. J'écris chaque morceau à part avant de réduire.",
      rappel: [
        "Un moins devant une parenthèse change le signe de TOUS ses termes : $-(a - b + c) = -a + b - c$.",
        "Pour calculer une expression, je remplace la lettre par sa valeur, entre parenthèses si elle est négative, et je respecte les priorités.",
        "Une différence de deux carrés se factorise toujours : $a^2 - b^2 = (a - b)(a + b)$, même quand $a$ est toute une parenthèse.",
      ],
      exercices: [
        {
          enonce:
            "On donne $E = (2x - 3)^2 - 16$.\na) Développer et réduire $E$.\nb) Factoriser $E$.\nc) Calculer $E$ pour $x = 0$, puis pour $x = 3{,}5$, en choisissant à chaque fois la forme la plus pratique.",
          correction:
            "a) Je développe d'abord le carré, avec $(a - b)^2 = a^2 - 2ab + b^2$, où $a = 2x$ et $b = 3$ : $(2x - 3)^2 = 4x^2 - 12x + 9$.\nDonc $E = 4x^2 - 12x + 9 - 16 = 4x^2 - 12x - 7$.\nb) $16 = 4^2$ : $E$ est une différence de deux carrés, $a^2 - b^2$ avec $a = 2x - 3$ et $b = 4$.\n$E = (2x - 3 - 4)(2x - 3 + 4) = (2x - 7)(2x + 1)$.\nc) Pour $x = 0$, la forme développée : $E = 4 \\times 0^2 - 12 \\times 0 - 7 = -7$.\nPour $x = 3{,}5$, la forme factorisée : $2 \\times 3{,}5 - 7 = 0$, donc $E = 0 \\times 8 = 0$.\n⛔ Le piège au a) : écrire $(2x - 3)^2 = 4x^2 - 9$. Le carré d'une différence a TROIS termes : le dessin montre les deux rectangles de $-6x$.\nRéponse : $E = 4x^2 - 12x - 7 = (2x - 7)(2x + 1)$ ; $E = -7$ pour $x = 0$ et $E = 0$ pour $x = 3{,}5$.",
          schema: aires([["2x", 110], ["−3", 50]], [["2x", 110], ["−3", 50]], [["4x²", "−6x"], ["−6x", "9"]]),
          micros: ["litteral_identite", "litteral_developper", "litteral_factoriser", "litteral_substituer"],
        },
        {
          enonce: "Développer et réduire $B = (x + 4)(x - 2) - (x - 3)^2$.",
          correction:
            "Je développe chaque morceau À PART, entre parenthèses, et je ne retire les parenthèses qu'à la fin.\nPremier produit : $(x + 4)(x - 2) = x^2 - 2x + 4x - 8 = x^2 + 2x - 8$.\nLe carré : $(x - 3)^2 = x^2 - 6x + 9$.\nJe soustrais TOUT le carré : $B = (x^2 + 2x - 8) - (x^2 - 6x + 9) = x^2 + 2x - 8 - x^2 + 6x - 9 = 8x - 17$.\n⭐ Contrôle avec $x = 0$ : $4 \\times (-2) - (-3)^2 = -8 - 9 = -17$, et $8 \\times 0 - 17 = -17$.\n⛔ Le piège : écrire $- x^2 - 6x + 9$, en ne changeant que le premier signe. Le moins devant la parenthèse change le signe de TOUS ses termes.\nRéponse : $B = 8x - 17$.",
          schema: aires([["x", 110], ["4", 55]], [["x", 110], ["−2", 40]], [["x²", "4x"], ["−2x", "−8"]]),
          micros: ["litteral_developper", "litteral_reduire", "litteral_identite"],
        },
        {
          enonce:
            "Voici un programme de calcul.\n• Choisir un nombre.\n• Lui ajouter $5$.\n• Élever le résultat au carré.\n• Soustraire le carré du nombre de départ.\na) Tester le programme avec $1$, puis avec $-3$.\nb) On note $x$ le nombre de départ. Écrire le résultat en fonction de $x$, puis prouver qu'il est égal à $10x + 25$.\nc) Prouver que si l'on choisit un nombre entier, le résultat est toujours un multiple de $5$.",
          correction:
            "a) Avec $1$ : $1 + 5 = 6$, puis $6^2 = 36$, puis $36 - 1^2 = 35$.\nAvec $-3$ : $-3 + 5 = 2$, puis $2^2 = 4$, puis $4 - (-3)^2 = 4 - 9 = -5$.\nb) J'écris chaque étape avec $x$ : $x + 5$, puis $(x + 5)^2$, puis $(x + 5)^2 - x^2$.\nJe développe le carré, $(x + 5)^2 = x^2 + 10x + 25$, donc $(x + 5)^2 - x^2 = x^2 + 10x + 25 - x^2 = 10x + 25$.\nc) Je factorise par $5$ : $10x + 25 = 5(2x + 5)$. Si $x$ est entier, $2x + 5$ est entier, donc le résultat est $5$ fois un entier : un multiple de $5$.\n⭐ Le tableau teste quatre nombres : $35$, $45$, $-5$ et $125$ sont bien des multiples de $5$. Mais c'est le calcul du b) qui le PROUVE.\n⛔ Le piège : conclure « c'est toujours vrai » après deux essais. Des essais montrent des exemples ; seul le calcul avec la lettre $x$ prouve pour tous les nombres.\nRéponse : $35$ et $-5$ ; le résultat vaut $10x + 25 = 5(2x + 5)$, toujours un multiple de $5$.",
          schema: tableau(["Nombre choisi", "1", "2", "−3", "10"], ["Résultat", 35, 45, -5, 125]),
          micros: ["litteral_comprendre", "litteral_substituer", "litteral_identite", "litteral_defi"],
        },
        {
          enonce: "Factoriser $C = (2x + 1)(x - 4) - (2x + 1)(3x + 2)$.",
          correction:
            "Le facteur commun est la parenthèse $(2x + 1)$ : elle est dans les deux termes.\nJe la mets devant, et j'écris ce qui reste dans un crochet, SANS oublier le signe moins : $C = (2x + 1)\\left[(x - 4) - (3x + 2)\\right]$.\nJe réduis le crochet : $(x - 4) - (3x + 2) = x - 4 - 3x - 2 = -2x - 6$.\nDonc $C = (2x + 1)(-2x - 6)$.\n⭐ On peut aller plus loin : $-2x - 6 = -2(x + 3)$, donc $C = -2(2x + 1)(x + 3)$.\n⛔ Le piège : écrire le crochet $x - 4 - 3x + 2$. Le moins porte sur toute la parenthèse $(3x + 2)$ : il retire $3x$ ET il retire $2$.\nRéponse : $C = (2x + 1)(-2x - 6)$, ou $C = -2(2x + 1)(x + 3)$.",
          micros: ["litteral_factoriser"],
        },
        {
          enonce: "Sans calculatrice, à l'aide d'une identité remarquable.\na) $101^2$\nb) $99^2$\nc) $102 \\times 98$",
          correction:
            "J'écris chaque nombre autour de $100$, qui se calcule de tête, et j'applique une identité.\na) $101^2 = (100 + 1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2 = 10\\,000 + 200 + 1 = 10\\,201$.\nb) $99^2 = (100 - 1)^2 = 100^2 - 2 \\times 100 \\times 1 + 1^2 = 10\\,000 - 200 + 1 = 9\\,801$.\nc) $102 \\times 98 = (100 + 2)(100 - 2) = 100^2 - 2^2 = 10\\,000 - 4 = 9\\,996$.\n⭐ Le dessin du a) : le carré de côté $101$, c'est le grand carré de $10\\,000$, deux bandes de $100$ et un petit carré de $1$.\n⛔ Le piège : écrire $101^2 = 10\\,000 + 1 = 10\\,001$. On oublie les deux bandes de $100$ : le même oubli que $(a + b)^2 = a^2 + b^2$.\nRéponse : $10\\,201$ ; $9\\,801$ ; $9\\,996$.",
          schema: aires([["100", 150], ["1", 30]], [["100", 150], ["1", 30]], [["10 000", "100"], ["100", "1"]]),
          micros: ["litteral_identite", "litteral_defi"],
        },
        {
          enonce:
            "a) Prouver que, pour tout nombre $x$, $(x + 1)^2 - (x - 1)^2 = 4x$.\nb) En déduire, sans calculatrice, $1\\,001^2 - 999^2$.",
          correction:
            "a) Pour prouver une égalité « pour tout nombre », je pars du membre de gauche et je le transforme jusqu'à obtenir celui de droite.\n$(x + 1)^2 = x^2 + 2x + 1$ et $(x - 1)^2 = x^2 - 2x + 1$.\nDonc $(x + 1)^2 - (x - 1)^2 = x^2 + 2x + 1 - x^2 + 2x - 1 = 4x$.\nb) Je prends $x = 1\\,000$ : alors $1\\,001 = x + 1$ et $999 = x - 1$. Donc $1\\,001^2 - 999^2 = 4 \\times 1\\,000 = 4\\,000$.\n⭐ Le tableau essaie l'égalité sur trois nombres : elle tient à chaque fois. Mais seul le calcul du a) la prouve pour TOUS.\n⛔ Le piège : oublier que le moins porte sur tout le carré, et écrire $- x^2 - 2x + 1$. On trouverait $2$ au lieu de $4x$.\nRéponse : l'égalité est vraie pour tout $x$ ; $1\\,001^2 - 999^2 = 4\\,000$.",
          schema: tableau(["x", "1", "3", "10"], ["(x+1)² − (x−1)²", 4, 12, 40]),
          micros: ["litteral_identite", "litteral_defi"],
        },
        {
          enonce:
            "Un rectangle a pour longueur $2x + 3$ et pour largeur $x - 1$, en mètres ($x$ est plus grand que $1$).\na) Exprimer son périmètre en fonction de $x$, et réduire.\nb) Exprimer son aire en fonction de $x$, et développer.\nc) Calculer le périmètre et l'aire pour $x = 4$.",
          correction:
            "a) Le périmètre est deux fois la somme de la longueur et de la largeur : $2(2x + 3 + x - 1) = 2(3x + 2) = 6x + 4$.\nb) L'aire est longueur × largeur : $(2x + 3)(x - 1) = 2x^2 - 2x + 3x - 3 = 2x^2 + x - 3$.\nc) Pour $x = 4$ : périmètre $6 \\times 4 + 4 = 28$ m ; aire $2 \\times 4^2 + 4 - 3 = 33$ m².\n⭐ Contrôle avec les vraies dimensions : pour $x = 4$, le rectangle mesure $11$ m sur $3$ m, et $11 \\times 3 = 33$.\n⛔ Le piège : confondre périmètre et aire. Le périmètre ADDITIONNE des longueurs (des mètres), l'aire les MULTIPLIE (des mètres carrés) : l'un est en $x$, l'autre en $x^2$.\nRéponse : $P = 6x + 4$ ; $A = 2x^2 + x - 3$ ; pour $x = 4$, $28$ m et $33$ m².",
          schema: aires([["2x", 120], ["3", 45]], [["x", 60], ["−1", 30]], [["2x²", "3x"], ["−2x", "−3"]]),
          micros: ["litteral_reduire", "litteral_developper", "litteral_substituer"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier.\na) Pour tout nombre $x$, $(x + 5)^2 = x^2 + 25$.\nb) Pour tout nombre $x$, $2(x + 4) - 3 = 2x + 5$.\nc) Pour tout nombre $x$, $(x - 4)(x + 4) = x^2 - 16$.\nd) Pour tout nombre $x$, $x^2$ est plus grand que $x$.",
          correction:
            "Pour montrer qu'une égalité est FAUSSE, un seul contre-exemple suffit. Pour montrer qu'elle est VRAIE pour tout $x$, il faut un calcul avec la lettre.\na) FAUX. Pour $x = 1$ : $(1 + 5)^2 = 36$, mais $1^2 + 25 = 26$. Il manque le double produit : $(x + 5)^2 = x^2 + 10x + 25$.\nb) VRAI. Je développe : $2(x + 4) - 3 = 2x + 8 - 3 = 2x + 5$.\nc) VRAI. C'est l'identité $(a + b)(a - b) = a^2 - b^2$ : $(x - 4)(x + 4) = x^2 - 4^2 = x^2 - 16$.\nd) FAUX. Pour $x = 0{,}5$ : $0{,}5^2 = 0{,}25$, plus petit que $0{,}5$.\n⛔ Le piège : conclure « vrai » au d) après avoir essayé $x = 2$ ou $x = 3$. Un essai qui marche ne prouve rien ; un seul essai qui rate prouve « faux ».\nRéponse : faux, vrai, vrai, faux.",
          micros: ["litteral_comprendre", "litteral_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je nomme le nombre inconnu avec une lettre, je calcule, puis je réponds par une phrase.",
      rappel: [
        "PROUVER « pour tout nombre » : je nomme le nombre avec une lettre et je transforme l'expression jusqu'au résultat annoncé. Des essais ne prouvent rien ; un seul contre-exemple prouve « faux ».",
        "L'aire d'un rectangle, c'est longueur × largeur. Un rectangle découpé en morceaux a pour aire la somme des aires des morceaux : c'est le dessin du développement.",
      ],
      exercices: [
        {
          titre: "Le potager qui rétrécit",
          enonce:
            "Un potager est un carré de $x$ mètres de côté ($x$ est plus grand que $4$). Son propriétaire le transforme en rectangle : il allonge un côté de $4$ m et raccourcit l'autre de $4$ m. « L'aire ne change pas, je gagne d'un côté ce que je perds de l'autre », dit-il.\na) Tester avec $x = 10$.\nb) Exprimer l'aire du nouveau potager en fonction de $x$, et la développer.\nc) A-t-il raison ? De combien l'aire change-t-elle ?",
          correction:
            "a) Pour $x = 10$ : le carré a une aire de $10^2 = 100$ m². Le rectangle mesure $14$ m sur $6$ m : $14 \\times 6 = 84$ m². Il a perdu $16$ m².\nb) Le rectangle mesure $x + 4$ sur $x - 4$ : son aire est $(x + 4)(x - 4) = x^2 - 16$.\nc) Il a tort : l'aire passe de $x^2$ à $x^2 - 16$. Il perd TOUJOURS $16$ m², quelle que soit la taille du potager.\n⭐ Le dessin le montre : la bande gagnée ($4x$) et la bande perdue ($-4x$) se compensent, mais le petit carré de $4$ m sur $4$ m, lui, disparaît.\n⛔ Le piège : croire que « $+4$ et $-4$ s'annulent ». Ils s'annulent dans une somme, pas dans un produit : $(x + 4)(x - 4) = x^2 - 4^2$.\nRéponse : le nouveau potager a une aire de $x^2 - 16$ m² ; le propriétaire perd toujours $16$ m².",
          schema: aires([["x", 110], ["4", 45]], [["x", 110], ["−4", 45]], [["x²", "4x"], ["−4x", "−16"]]),
          micros: ["litteral_identite", "litteral_developper", "litteral_defi"],
        },
        {
          titre: "Le cadre du tableau",
          enonce:
            "Un peintre encadre une toile rectangulaire de $40$ cm sur $30$ cm avec une baguette de largeur $x$ cm, tout autour.\na) Exprimer les dimensions extérieures du tableau encadré en fonction de $x$.\nb) Montrer que l'aire du cadre seul est $4x^2 + 140x$.\nc) Calculer l'aire du cadre pour $x = 5$, de deux façons.",
          correction:
            "a) La baguette s'ajoute des DEUX côtés : la longueur devient $40 + 2x$ et la largeur $30 + 2x$.\nb) L'aire du cadre, c'est l'aire totale moins celle de la toile.\nAire totale : $(40 + 2x)(30 + 2x) = 1\\,200 + 80x + 60x + 4x^2 = 4x^2 + 140x + 1\\,200$.\nAire du cadre : $4x^2 + 140x + 1\\,200 - 1\\,200 = 4x^2 + 140x$.\n⭐ Le dessin découpe le cadre : quatre petits carrés de $x^2$ dans les coins, deux bandes de $40x$ et deux bandes de $30x$. En tout, $4x^2 + 80x + 60x = 4x^2 + 140x$.\nc) Avec la formule : $4 \\times 5^2 + 140 \\times 5 = 100 + 700 = 800$ cm².\nAvec les dimensions : le tableau encadré mesure $50$ cm sur $40$ cm, donc $50 \\times 40 - 1\\,200 = 2\\,000 - 1\\,200 = 800$ cm². Les deux calculs concordent.\n⛔ Le piège : n'ajouter $x$ qu'une fois, et écrire $40 + x$. La baguette est à gauche ET à droite, en haut ET en bas.\nRéponse : l'aire du cadre est $4x^2 + 140x$ cm², soit $800$ cm² pour $x = 5$.",
          schema: aires([["x", 40], ["40", 120], ["x", 40]], [["x", 40], ["30", 90], ["x", 40]], [["x²", "40x", "x²"], ["30x", "1 200", "30x"], ["x²", "40x", "x²"]]),
          micros: ["litteral_developper", "litteral_reduire", "litteral_substituer"],
        },
        {
          titre: "Deux entiers qui se suivent",
          enonce:
            "Léa remarque : $4^2 - 3^2 = 16 - 9 = 7$, et $3 + 4 = 7$.\na) Vérifier la même chose avec $9$ et $10$.\nb) On note $n$ un nombre entier. Écrire l'entier qui le suit, puis prouver que la différence de leurs carrés est égale à leur somme.\nc) En déduire, sans calculatrice, $500^2 - 499^2$.",
          correction:
            "a) $10^2 - 9^2 = 100 - 81 = 19$, et $9 + 10 = 19$. Ça marche encore.\nb) L'entier qui suit $n$ est $n + 1$.\nLa différence de leurs carrés : $(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1$.\nLeur somme : $n + (n + 1) = 2n + 1$.\nLes deux expressions valent $2n + 1$ : la propriété est vraie pour TOUS les entiers, pas seulement pour ceux qu'on a essayés.\nc) Avec $n = 499$ : $500^2 - 499^2 = 499 + 500 = 999$.\n⭐ Le tableau montre quelques essais ; la preuve du b), elle, couvre tous les entiers d'un coup.\n⛔ Le piège : appeler le suivant $m$, une autre lettre. Deux lettres différentes désignent deux nombres quelconques, qui ne se suivent pas forcément.\nRéponse : $(n + 1)^2 - n^2 = 2n + 1 = n + (n + 1)$ ; $500^2 - 499^2 = 999$.",
          schema: tableau(["n", "3", "9", "20", "99"], ["Écart des carrés", 7, 19, 41, 199]),
          micros: ["litteral_comprendre", "litteral_identite", "litteral_defi"],
        },
        {
          titre: "Deux programmes, un seul résultat",
          enonce:
            "Programme A : choisir un nombre ; lui ajouter $14$ ; multiplier le résultat par le nombre de départ ; ajouter $49$.\nProgramme B : choisir un nombre ; lui ajouter $7$ ; élever le résultat au carré.\na) Tester les deux programmes avec $1$, puis avec $-5$.\nb) Prouver que les deux programmes donnent toujours le même résultat.\nc) Le résultat peut-il être négatif ? Quel nombre faut-il choisir pour obtenir $0$ ?",
          correction:
            "a) Avec $1$ : A donne $(1 + 14) \\times 1 + 49 = 15 + 49 = 64$ ; B donne $(1 + 7)^2 = 8^2 = 64$.\nAvec $-5$ : A donne $(-5 + 14) \\times (-5) + 49 = -45 + 49 = 4$ ; B donne $(-5 + 7)^2 = 2^2 = 4$.\nb) Je note $x$ le nombre choisi. A donne $(x + 14)x + 49$, B donne $(x + 7)^2$.\nJe développe A : $(x + 14)x + 49 = x^2 + 14x + 49$.\nJe développe B : $(x + 7)^2 = x^2 + 14x + 49$.\nMême expression : les deux programmes donnent toujours le même résultat. Autrement dit, A est la forme développée et B la forme factorisée d'une même expression.\nc) Le résultat est un carré, $(x + 7)^2$ : il n'est jamais négatif. Il vaut $0$ seulement si $x + 7 = 0$, c'est-à-dire pour $x = -7$.\n⛔ Le piège au a) : oublier les parenthèses autour de $-5$, ou ne multiplier que le $14$ par le nombre de départ. C'est tout le résultat de l'étape, $x + 14$, qui est multiplié.\nRéponse : les deux programmes donnent $(x + 7)^2$ ; le résultat n'est jamais négatif ; il vaut $0$ pour $x = -7$.",
          schema: tableau(["Nombre choisi", "1", "3", "−5", "−7"], ["A et B", 64, 100, 4, 0]),
          micros: ["litteral_substituer", "litteral_identite", "litteral_factoriser", "litteral_defi"],
        },
      ],
    },
  ],
};
