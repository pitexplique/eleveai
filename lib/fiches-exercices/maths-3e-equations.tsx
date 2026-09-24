// ─── Fiche d'exercices : résoudre une équation (3e) — 20 exercices corrigés ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-equations.tsx` et sur les
// sept micros du coach de 3e (notionId equation_resolution). On reste dans le
// programme de 3e : reconnaître une équation, la résoudre (un geste, deux
// gestes, des x des deux côtés, des parenthèses, des fractions), vérifier une
// solution, l'équation produit nul, x² = a, et la mise en équation d'un problème.
// ⛔ Pas d'inéquation : aucune micro de 3e ne les porte (c'est la feuille de
// seconde, `maths-seconde-equations.tsx`). Pas de discriminant non plus.
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni x + 7 = 12, ni 4x = 28,
// ni 2(x + 3) = 14, ni (x − 3)(x + 5) = 0, ni 3x + 2 = 14, ni x² = 5 ou 9.
//
// ⭐ x² = a n'a PAS de micro au coach (trou signalé dans la fiche de cours) :
// l'exercice 8 la traite comme un produit nul déguisé, x² − 64 = (x − 8)(x + 8).
//
// Les pièges qui reviennent : le signe du facteur, (x + 8) s'annule en −8
// (exercices 6, 7) ; la solution perdue — x = 0 en divisant par x, la solution
// négative de x² = a (8, 11, 12, 14) ; le moins devant la parenthèse (9) ; « faire
// passer » sans changer le signe (5).
//
// Les chiffres du monde, et d'où ils viennent :
// - triathlon olympique : 1,5 km de natation, 40 km de vélo, 10 km de course
//   (World Triathlon, distance « standard ») — ex. 18 ;
// - chandelle : h = 5t(4 − t), soit une vitesse initiale de 20 m/s avec
//   g ≈ 10 m/s² (h = v t − ½ g t²) — ex. 19 ;
// - vitesses d'une étape du Tour : 45 km/h pour un échappé, 54 km/h pour un
//   peloton lancé, ordres de grandeur d'une fin d'étape de plaine — ex. 20.
//
// Les corrigés sont écrits à la première personne (« je retire »), comme la
// feuille de la racine carrée de 3e.
//
// ⭐ LA BALANCE (exercices 2, 3, 5, 9, 10, 15, 16, 18) : chaque ligne est un état
// de la balance, et l'opération qui y mène est écrite au-dessus, « des deux
// côtés ». Le script de recalcul RELIT chaque ligne : il vérifie que l'opération
// annoncée transforme bien un plateau en l'autre, et que la solution finale
// équilibre CHAQUE ligne.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-equations-3e.mjs` —
// chaque solution est remise dans l'équation en fractions exactes, chaque
// factorisation redéveloppée, chaque dessin relu (points sur les courbes, cases
// des tableaux, lignes des balances).
//
// Micro-compétences : equation_reconnaitre (1), equation_resoudre_simple (2, 3,
// 5), equation_resoudre_developper (9, 10, 15, 16), equation_produit_nul (6, 7,
// 8, 11, 12, 13, 19), equation_verifier (1, 4, 7, 13, 14, 20), equation_probleme
// (16, 17, 18, 19, 20), equation_defi (8, 12, 14, 19). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

// ⭐ LA BALANCE : une ligne par état, les deux plateaux à l'équilibre, et
// l'opération faite DES DEUX CÔTÉS écrite en orange au-dessus. La dernière
// ligne, « x = … », est en vert. Du SVG simple, texte nu (pas de `$`) : on écrit
// « x² », « - » et « . » dans la donnée, affichés « x² », « − » et « , ».
// ⭐ Le script de recalcul relit `g`, `d` et `op` : les écrire en clair.
const affiche = (s: string) => s.replace(/-/g, "−").replace(/\./g, ",");
const balance = (etapes: { g: string; d: string; op?: string }[]) => {
  const H = 62;
  return (
    <svg
      viewBox={`0 0 260 ${etapes.length * H + 4}`}
      role="img"
      aria-label={etapes.map((e) => `${e.op ? `${affiche(e.op)}, ` : ""}${affiche(e.g)} = ${affiche(e.d)}`).join(" ; ")}
      className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]"
    >
      {etapes.map((e, i) => {
        const y = i * H;
        const fin = i === etapes.length - 1;
        const fond = fin ? "#dcfce7" : "#dbeafe";
        const trait = fin ? "#16a34a" : "#2563eb";
        const op = e.op ? (/^[−+÷×]/.test(e.op) ? `${affiche(e.op)} des deux côtés` : e.op) : "";
        return (
          <g key={i}>
            {op && (
              <text x={130} y={y + 12} textAnchor="middle" fontSize={11} fontWeight={700} fill={ORANGE}>
                ↓ {op}
              </text>
            )}
            <rect x={8} y={y + 17} width={112} height={22} rx={5} fill={fond} stroke={trait} strokeWidth={1.3} />
            <rect x={140} y={y + 17} width={112} height={22} rx={5} fill={fond} stroke={trait} strokeWidth={1.3} />
            <text x={64} y={y + 32} textAnchor="middle" fontSize={12} fill="#0f172a">
              {affiche(e.g)}
            </text>
            <text x={196} y={y + 32} textAnchor="middle" fontSize={12} fill="#0f172a">
              {affiche(e.d)}
            </text>
            <line x1={34} y1={y + 43} x2={226} y2={y + 43} stroke="#475569" strokeWidth={2.4} />
            <polygon points={`130,${y + 43} 121,${y + 58} 139,${y + 58}`} fill="#94a3b8" />
          </g>
        );
      })}
    </svg>
  );
};

export const exercicesEquations3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "equation-resolution",
  titre: "Résoudre une équation",
  accroche:
    "Vingt exercices, du calcul seul au problème : résoudre en un geste puis en plusieurs, vérifier une solution, l'équation produit nul qui en donne deux, x² = a, et mettre un problème en équation, comme au brevet. Deux loueurs de vélos, un triathlon, une chandelle au football, une échappée du Tour de France. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la balance dessinée, le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/equation-resolution", titre: "Résoudre une équation" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je fais la même opération des deux côtés, et je vérifie.",
      rappel: [
        "Une ÉQUATION est une égalité avec une inconnue, souvent $x$. La résoudre, c'est trouver TOUTES les valeurs de $x$ qui rendent l'égalité vraie.",
        "LA BALANCE : je fais la MÊME opération des deux côtés, et l'égalité reste vraie. J'ajoute, je retire, je multiplie ou je divise (jamais par $0$).",
        "PRODUIT NUL : si $A \\times B = 0$, alors $A = 0$ ou $B = 0$. Une équation peut donc avoir DEUX solutions.",
        "Je VÉRIFIE en remplaçant $x$ par ma solution dans chaque membre : les deux calculs doivent donner le même nombre.",
      ],
      exercices: [
        {
          enonce:
            "Parmi ces écritures, lesquelles sont des équations ?\na) $3x + 4 = 19$\nb) $5x - 2$\nc) $7 \\times 8 = 56$\nd) $2(x - 1) = 10$\ne) Le nombre $5$ est-il solution de l'équation du a) ?",
          correction:
            "Une équation, c'est deux choses à la fois : un signe $=$ et une inconnue.\na) Il y a un $=$ et une inconnue $x$ : c'est une équation.\nb) Il y a une inconnue, mais pas de signe $=$ : c'est une EXPRESSION. On peut la calculer, pas la résoudre.\nc) Il y a un $=$, mais aucune inconnue : c'est une égalité entre nombres, vraie ici. Il n'y a rien à chercher.\nd) Un $=$ et une inconnue : c'est une équation.\ne) Je remplace $x$ par $5$ : $3 \\times 5 + 4 = 19$. J'obtiens bien $19$ : $5$ est solution.\n⭐ Le tableau d'essais montre que $5$ est la seule valeur de la ligne qui donne $19$ : quand $x$ augmente de $1$, $3x + 4$ augmente de $3$.\n⛔ Le piège : croire que toute écriture avec une lettre est une équation. Sans signe $=$, il n'y a rien à résoudre.\nRéponse : a) et d) sont des équations, et $5$ est solution du a).",
          schema: tableau(["x", "3", "4", "5", "6"], ["3x + 4", 13, 16, 19, 22]),
          micros: ["equation_reconnaitre", "equation_verifier"],
        },
        {
          enonce: "Résoudre.\na) $x + 9 = 4$\nb) $6x = 42$\nc) $x - 3{,}5 = 8$\nd) $-4x = 18$",
          correction:
            "Un seul geste par équation : je défais ce qui est fait à $x$, avec l'opération contraire, des deux côtés.\na) On a ajouté $9$ à $x$ : je retire $9$ des deux côtés. $x = 4 - 9$, donc $x = -5$.\nb) On a multiplié $x$ par $6$ : je divise les deux côtés par $6$. $x = 42 \\div 6$, donc $x = 7$.\nc) On a retiré $3{,}5$ : j'ajoute $3{,}5$ des deux côtés. $x = 8 + 3{,}5$, donc $x = 11{,}5$.\nd) On a multiplié $x$ par $-4$ : je divise par $-4$. $x = 18 \\div (-4)$, donc $x = -4{,}5$.\n⛔ Le piège au a) : répondre $x = 5$ parce que « $9 - 4 = 5$ ». Je vérifie : $5 + 9 = 14$, pas $4$. Le bon calcul est $4 - 9 = -5$.\nRéponse : $x = -5$ ; $x = 7$ ; $x = 11{,}5$ ; $x = -4{,}5$.",
          schema: balance([
            { g: "x + 9", d: "4" },
            { g: "x", d: "-5", op: "−9" },
          ]),
          micros: ["equation_resoudre_simple"],
        },
        {
          enonce: "Résoudre.\na) $5x - 8 = 27$\nb) $11 - 3x = 26$\nc) $\\dfrac{x}{4} + 1 = 3$",
          correction:
            "Deux gestes : d'abord j'enlève le nombre seul, ensuite je divise. Dans cet ordre, parce que le nombre seul est « le plus loin » de $x$.\na) J'ajoute $8$ des deux côtés : $5x = 35$. Je divise par $5$ : $x = 7$.\nb) Je retire $11$ des deux côtés : $-3x = 15$. Je divise par $-3$ : $x = -5$.\nc) Je retire $1$ : $\\dfrac{x}{4} = 2$. Je multiplie par $4$ : $x = 8$.\n⭐ Je vérifie le b) : $11 - 3 \\times (-5) = 11 + 15 = 26$. ✓\n⛔ Le piège au b) : diviser par $3$ au lieu de $-3$, et trouver $x = 5$. Le signe moins fait partie du nombre qui multiplie $x$.\nRéponse : $x = 7$ ; $x = -5$ ; $x = 8$.",
          schema: balance([
            { g: "5x - 8", d: "27" },
            { g: "5x", d: "35", op: "+8" },
            { g: "x", d: "7", op: "÷5" },
          ]),
          micros: ["equation_resoudre_simple"],
        },
        {
          enonce:
            "Sans résoudre, dire si le nombre proposé est solution.\na) $3$ est-il solution de $4x - 5 = 2x + 1$ ?\nb) $-2$ est-il solution de $x^2 + 3x = 2$ ?\nc) $-1$ est-il solution de $2x^2 - x = 3$ ?",
          correction:
            "Je remplace $x$ par le nombre dans CHAQUE membre, je calcule les deux côtés séparément, puis je compare.\na) À gauche : $4 \\times 3 - 5 = 7$. À droite : $2 \\times 3 + 1 = 7$. Les deux côtés sont égaux : $3$ est solution.\nb) À gauche : $(-2)^2 + 3 \\times (-2) = 4 - 6 = -2$. À droite : $2$. Les deux côtés diffèrent : $-2$ n'est pas solution.\nc) À gauche : $2 \\times (-1)^2 - (-1) = 2 + 1 = 3$. À droite : $3$. Égaux : $-1$ est solution.\n⛔ Le piège : écrire $(-2)^2 = -4$. Un carré n'est jamais négatif : $(-2)^2 = (-2) \\times (-2) = 4$. Sans parenthèses, la calculatrice se trompe aussi.\nRéponse : oui ; non ; oui.",
          micros: ["equation_verifier"],
        },
        {
          enonce: "Résoudre.\na) $7x + 2 = 3x + 22$\nb) $2x - 9 = 6x + 3$",
          correction:
            "Il y a des $x$ des deux côtés : je les regroupe d'abord du même côté, puis je fais comme avant.\na) Je retire $3x$ des deux côtés : $4x + 2 = 22$. Je retire $2$ : $4x = 20$. Je divise par $4$ : $x = 5$.\nb) Je retire $6x$ des deux côtés : $-4x - 9 = 3$. J'ajoute $9$ : $-4x = 12$. Je divise par $-4$ : $x = -3$.\n⭐ Je vérifie le b) : $2 \\times (-3) - 9 = -15$ et $6 \\times (-3) + 3 = -15$. ✓\n⛔ Le piège : « faire passer » $3x$ de l'autre côté sans changer son signe, et écrire $10x + 2 = 22$. Sur la balance, on ne déplace rien : on RETIRE $3x$ des deux plateaux.\nRéponse : $x = 5$ ; $x = -3$.",
          schema: balance([
            { g: "7x + 2", d: "3x + 22" },
            { g: "4x + 2", d: "22", op: "−3x" },
            { g: "4x", d: "20", op: "−2" },
            { g: "x", d: "5", op: "÷4" },
          ]),
          micros: ["equation_resoudre_simple"],
        },
        {
          enonce: "Résoudre.\na) $(x - 4)(x + 1) = 0$\nb) $x(2x - 5) = 0$\nc) $(3x + 12)(x - 7) = 0$",
          correction:
            "Un produit est nul si et seulement si l'un de ses facteurs est nul. Je sépare donc en deux petites équations du premier degré.\na) $x - 4 = 0$ ou $x + 1 = 0$, donc $x = 4$ ou $x = -1$.\nb) $x = 0$ ou $2x - 5 = 0$. La seconde donne $2x = 5$, donc $x = 2{,}5$. Les solutions : $x = 0$ ou $x = 2{,}5$.\nc) $3x + 12 = 0$ ou $x - 7 = 0$. La première donne $3x = -12$, donc $x = -4$ ; la seconde $x = 7$.\n⭐ Le dessin du a) : la courbe de $y = (x - 4)(x + 1)$ coupe l'axe des abscisses en DEUX points, $-1$ et $4$. Deux points, deux solutions.\n⛔ Le piège au b) : oublier la solution $x = 0$. Le facteur $x$ tout seul est un facteur comme les autres.\nRéponse : a) $-1$ et $4$ ; b) $0$ et $2{,}5$ ; c) $-4$ et $7$.",
          schema: repere([-2, 5, -7, 3], [{ q: [1, -3, -4] }], [{ x: -1, y: 0, label: "−1" }, { x: 4, y: 0, label: "4" }]),
          micros: ["equation_produit_nul"],
        },
        {
          enonce:
            "Un élève écrit : « $(x + 8)(x - 2) = 0$, donc $x = 8$ ou $x = 2$. »\na) Tester sa réponse en remplaçant $x$ par $8$.\nb) Corriger sa résolution.\nc) Résoudre $(x - 5)^2 = 0$ et $4(x - 9) = 0$. Combien de solutions chacune a-t-elle ?",
          correction:
            "a) Je remplace $x$ par $8$ : $(8 + 8)(8 - 2) = 16 \\times 6 = 96$, pas $0$. Donc $8$ n'est pas solution : l'élève s'est trompé.\nb) $x + 8 = 0$ donne $x = -8$ : pour annuler $x + 8$, il faut $x = -8$. Et $x - 2 = 0$ donne $x = 2$. Les solutions sont $x = -8$ ou $x = 2$.\nJe vérifie : $(-8 + 8)(-8 - 2) = 0 \\times (-10) = 0$. ✓\nc) $(x - 5)^2 = (x - 5)(x - 5)$ : les deux facteurs sont les MÊMES. $x - 5 = 0$ donne une seule solution, $x = 5$.\n$4(x - 9) = 0$ : le facteur $4$ n'est jamais nul, donc $x - 9 = 0$, et une seule solution, $x = 9$.\n⛔ Le piège : recopier le nombre du facteur sans changer son signe. Je cherche ce qui rend la parenthèse NULLE : $(x + 8)$ s'annule en $-8$, pas en $8$.\nRéponse : $(x + 8)(x - 2) = 0$ a pour solutions $-8$ et $2$ ; les deux autres n'ont qu'une solution, $5$ et $9$.",
          micros: ["equation_produit_nul", "equation_verifier"],
        },
        {
          enonce: "Résoudre.\na) $x^2 = 64$\nb) $x^2 = 6$\nc) $x^2 = -25$\nd) $2x^2 = 50$",
          correction:
            "Je cherche TOUS les nombres dont le carré vaut le nombre de droite. Un nombre et son opposé ont le même carré.\na) $8^2 = 64$ et $(-8)^2 = 64$ : $x = 8$ ou $x = -8$.\nb) $6$ n'est pas un carré parfait : $x = \\sqrt{6}$ ou $x = -\\sqrt{6}$.\nc) Un carré n'est jamais négatif : l'équation n'a pas de solution.\nd) Je divise d'abord par $2$ : $x^2 = 25$. Donc $x = 5$ ou $x = -5$.\n⭐ Pourquoi deux solutions ? $x^2 - 64 = (x - 8)(x + 8)$ : c'est un produit nul déguisé. Sur le dessin du b), la droite horizontale coupe la courbe de $y = x^2$ en deux points.\n⛔ Le piège : ne donner que la solution positive. $\\sqrt{64} = 8$, un seul nombre ; mais l'équation $x^2 = 64$ en a DEUX.\nRéponse : a) $8$ et $-8$ ; b) $\\sqrt{6}$ et $-\\sqrt{6}$ ; c) aucune ; d) $5$ et $-5$.",
          schema: repere([-4, 4, -1, 9], [{ q: [1, 0, 0] }], [{ x: -2.45, y: 6, label: "−√6" }, { x: 2.45, y: 6, label: "√6" }], 6),
          micros: ["equation_produit_nul", "equation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je développe ou je factorise d'abord, je vérifie à la fin.",
      rappel: [
        "DÉVELOPPER d'abord : $k(a + b) = ka + kb$. Un moins devant la parenthèse change TOUS les signes : $-2(x + 4) = -2x - 8$.",
        "Des fractions ? Je multiplie les DEUX membres, en entier, par un multiple commun des dénominateurs.",
        "FACTORISER pour obtenir un produit nul : par un facteur commun, ou avec $a^2 - b^2 = (a - b)(a + b)$.",
      ],
      exercices: [
        {
          enonce: "Résoudre.\na) $3(2x - 5) = 4x + 7$\nb) $5 - 2(x + 4) = x + 6$",
          correction:
            "Des parenthèses : je développe d'abord, pour retrouver une équation comme celles du niveau 1.\na) Je développe : $6x - 15 = 4x + 7$. Je retire $4x$ : $2x - 15 = 7$. J'ajoute $15$ : $2x = 22$. Donc $x = 11$.\nb) Je développe : $5 - 2x - 8 = x + 6$, soit $-2x - 3 = x + 6$. Je retire $x$ : $-3x - 3 = 6$. J'ajoute $3$ : $-3x = 9$. Donc $x = -3$.\n⭐ Je vérifie le b) : $5 - 2 \\times (-3 + 4) = 5 - 2 = 3$ et $-3 + 6 = 3$. ✓\n⛔ Le piège au b) : écrire $-2(x + 4) = -2x + 8$. Le $-2$ multiplie AUSSI le $4$ : $-2 \\times 4 = -8$.\nRéponse : $x = 11$ ; $x = -3$.",
          schema: balance([
            { g: "3(2x - 5)", d: "4x + 7" },
            { g: "6x - 15", d: "4x + 7", op: "je développe" },
            { g: "2x - 15", d: "7", op: "−4x" },
            { g: "2x", d: "22", op: "+15" },
            { g: "x", d: "11", op: "÷2" },
          ]),
          micros: ["equation_resoudre_developper"],
        },
        {
          enonce: "Résoudre. Les $x^2$ vont disparaître.\na) $(x + 3)(x - 2) = x^2 + 4$\nb) $(x - 4)^2 = x(x - 5)$",
          correction:
            "Je développe chaque membre. Les $x^2$ sont les mêmes des deux côtés : je les retire, et il reste une équation du premier degré.\na) $(x + 3)(x - 2) = x^2 - 2x + 3x - 6 = x^2 + x - 6$. L'équation devient $x^2 + x - 6 = x^2 + 4$. Je retire $x^2$ : $x - 6 = 4$, donc $x = 10$.\n⭐ Je vérifie : $(10 + 3)(10 - 2) = 13 \\times 8 = 104$ et $10^2 + 4 = 104$. ✓\nb) $(x - 4)^2 = x^2 - 8x + 16$ et $x(x - 5) = x^2 - 5x$. Je retire $x^2$ : $-8x + 16 = -5x$. J'ajoute $8x$ : $16 = 3x$. Donc $x = \\dfrac{16}{3}$.\n⛔ Le piège au b) : écrire $(x - 4)^2 = x^2 - 16$. Le carré d'une différence a TROIS termes : $(a - b)^2 = a^2 - 2ab + b^2$.\nRéponse : $x = 10$ ; $x = \\dfrac{16}{3}$.",
          schema: balance([
            { g: "(x + 3)(x - 2)", d: "x² + 4" },
            { g: "x² + x - 6", d: "x² + 4", op: "je développe" },
            { g: "x - 6", d: "4", op: "−x²" },
            { g: "x", d: "10", op: "+6" },
          ]),
          micros: ["equation_resoudre_developper"],
        },
        {
          enonce: "Factoriser, puis résoudre.\na) $x^2 - 7x = 0$\nb) $(2x + 1)(x - 3) + (2x + 1)(x + 5) = 0$",
          correction:
            "Pour utiliser le produit nul, il me faut un PRODUIT égal à $0$. Je cherche donc un facteur commun.\na) $x$ est dans les deux termes : $x^2 - 7x = x(x - 7)$. Donc $x(x - 7) = 0$ : $x = 0$ ou $x = 7$.\nb) $(2x + 1)$ est dans les deux termes : $(2x + 1)(x - 3) + (2x + 1)(x + 5) = (2x + 1)(x - 3 + x + 5) = (2x + 1)(2x + 2)$.\nDonc $2x + 1 = 0$ ou $2x + 2 = 0$, soit $x = -0{,}5$ ou $x = -1$.\n⭐ Je vérifie $x = -1$ dans l'équation de départ : $(-1)(-4) + (-1)(4) = 4 - 4 = 0$. ✓\n⛔ Le piège au a) : diviser les deux membres par $x$ pour obtenir $x = 7$. On perd la solution $x = 0$ : diviser par $x$, c'est peut-être diviser par $0$.\nRéponse : a) $0$ et $7$ ; b) $-1$ et $-0{,}5$.",
          micros: ["equation_produit_nul"],
        },
        {
          enonce: "Factoriser à l'aide de $a^2 - b^2 = (a - b)(a + b)$, puis résoudre.\na) $9x^2 - 16 = 0$\nb) $(x + 2)^2 - 36 = 0$",
          correction:
            "Une différence de deux carrés se factorise : c'est la troisième identité remarquable, lue de droite à gauche.\na) $9x^2 = (3x)^2$ et $16 = 4^2$. Donc $9x^2 - 16 = (3x - 4)(3x + 4)$.\n$3x - 4 = 0$ ou $3x + 4 = 0$, soit $x = \\dfrac{4}{3}$ ou $x = -\\dfrac{4}{3}$.\nb) $36 = 6^2$. Donc $(x + 2)^2 - 36 = (x + 2 - 6)(x + 2 + 6) = (x - 4)(x + 8)$.\n$x - 4 = 0$ ou $x + 8 = 0$, soit $x = 4$ ou $x = -8$.\n⭐ Autre chemin pour le b) : $(x + 2)^2 = 36$, donc $x + 2 = 6$ ou $x + 2 = -6$. Mêmes solutions.\n⛔ Le piège au b) : « prendre la racine » et écrire seulement $x + 2 = 6$. On perd $-8$, qui marche pourtant : $(-8 + 2)^2 = (-6)^2 = 36$.\nRéponse : a) $\\dfrac{4}{3}$ et $-\\dfrac{4}{3}$ ; b) $4$ et $-8$.",
          micros: ["equation_produit_nul", "equation_defi"],
        },
        {
          enonce:
            "Léa affirme que $2$ et $-3$ sont les solutions de $x^2 + x - 6 = 0$.\na) Vérifier que $2$ et $-3$ sont solutions.\nb) Développer $(x - 2)(x + 3)$. Pourquoi l'équation n'a-t-elle pas d'autre solution ?\nc) $1$ est-il solution ?",
          correction:
            "a) Je remplace $x$ par $2$ : $2^2 + 2 - 6 = 4 + 2 - 6 = 0$. ✓ Je remplace par $-3$ : $(-3)^2 + (-3) - 6 = 9 - 3 - 6 = 0$. ✓ Les deux sont solutions.\nb) $(x - 2)(x + 3) = x^2 + 3x - 2x - 6 = x^2 + x - 6$. L'équation s'écrit donc $(x - 2)(x + 3) = 0$ : un produit nul, qui ne s'annule que si $x = 2$ ou $x = -3$. Il n'y en a pas d'autre.\nc) $1^2 + 1 - 6 = -4$, pas $0$ : $1$ n'est pas solution.\n⭐ Le dessin : la courbe de $y = x^2 + x - 6$ coupe l'axe des abscisses en $-3$ et en $2$, et nulle part ailleurs.\n⛔ Le piège : croire que deux essais réussis prouvent qu'il n'y a pas d'autre solution. Les essais VÉRIFIENT ; c'est la factorisation qui PROUVE.\nRéponse : les solutions sont exactement $2$ et $-3$, et $1$ n'en est pas une.",
          schema: repere([-4, 3, -7, 3], [{ q: [1, 1, -6] }], [{ x: -3, y: 0, label: "−3" }, { x: 2, y: 0, label: "2" }]),
          micros: ["equation_verifier", "equation_produit_nul"],
        },
        {
          enonce:
            "On cherche deux nombres entiers CONSÉCUTIFS dont le produit vaut $132$. On appelle $x$ le plus petit.\na) Montrer que $x$ vérifie $x(x + 1) = 132$.\nb) Faire un tableau d'essais pour $x$ allant de $9$ à $12$, et trouver une solution.\nc) Vérifier que $-12$ est aussi solution. Quels sont alors les deux nombres ?",
          correction:
            "a) Le nombre qui suit $x$ est $x + 1$. Leur produit est $x(x + 1)$, qui doit valoir $132$ : $x(x + 1) = 132$.\nb) Je calcule $x(x + 1)$ pour chaque valeur : $9 \\times 10 = 90$ ; $10 \\times 11 = 110$ ; $11 \\times 12 = 132$ ; $12 \\times 13 = 156$. C'est $x = 11$ : les nombres sont $11$ et $12$.\n⭐ Le produit grandit avec $x$ : inutile d'essayer au-delà de $12$, on s'éloigne de $132$.\nc) $(-12) \\times (-12 + 1) = (-12) \\times (-11) = 132$. ✓ Les nombres sont alors $-12$ et $-11$.\n⛔ Le piège : s'arrêter à la première solution trouvée. Le produit de deux nombres négatifs est positif : il y a une deuxième réponse.\nRéponse : $11$ et $12$, ou $-12$ et $-11$.",
          schema: tableau(["x", "9", "10", "11", "12"], ["x(x + 1)", 90, 110, 132, 156]),
          micros: ["equation_verifier", "equation_defi"],
        },
        {
          enonce: "Résoudre.\na) $\\dfrac{x}{3} + \\dfrac{x}{4} = 14$\nb) $\\dfrac{2x - 1}{5} = \\dfrac{x + 4}{3}$",
          correction:
            "Pour chasser les fractions, je multiplie les DEUX membres, en entier, par un multiple commun des dénominateurs.\na) $12$ est un multiple de $3$ et de $4$. Je multiplie tout par $12$ : $4x + 3x = 168$, soit $7x = 168$. Donc $x = 24$.\n⭐ Je vérifie : $24 \\div 3 + 24 \\div 4 = 8 + 6 = 14$. ✓\nb) Je multiplie les deux membres par $15$ : $3(2x - 1) = 5(x + 4)$. Je développe : $6x - 3 = 5x + 20$. Je retire $5x$ : $x - 3 = 20$. Donc $x = 23$.\n⭐ Je vérifie : $\\dfrac{2 \\times 23 - 1}{5} = \\dfrac{45}{5} = 9$ et $\\dfrac{23 + 4}{3} = \\dfrac{27}{3} = 9$. ✓\n⛔ Le piège au b) : multiplier seulement le $2x$ par $3$ et écrire $6x - 1$. La barre de fraction est une parenthèse : TOUT le numérateur est multiplié.\nRéponse : $x = 24$ ; $x = 23$.",
          schema: balance([
            { g: "3(2x - 1)", d: "5(x + 4)" },
            { g: "6x - 3", d: "5x + 20", op: "je développe" },
            { g: "x - 3", d: "20", op: "−5x" },
            { g: "x", d: "23", op: "+3" },
          ]),
          micros: ["equation_resoudre_developper"],
        },
        {
          enonce:
            "Deux programmes de calcul.\nProgramme A : choisir un nombre, le multiplier par $4$, puis soustraire $7$.\nProgramme B : choisir un nombre, lui ajouter $2$, puis multiplier par $3$.\na) Calculer le résultat de chaque programme en partant de $5$.\nb) On appelle $x$ le nombre de départ. Écrire le résultat de chaque programme en fonction de $x$.\nc) Quel nombre de départ donne le même résultat avec les deux programmes ?",
          correction:
            "a) A : $5 \\times 4 - 7 = 13$. B : $(5 + 2) \\times 3 = 21$. Les résultats diffèrent.\nb) A donne $4x - 7$. B donne $(x + 2) \\times 3$, soit $3(x + 2)$ : les parenthèses sont indispensables, car on ajoute AVANT de multiplier.\nc) Je veux $4x - 7 = 3(x + 2)$. Je développe : $4x - 7 = 3x + 6$. Je retire $3x$ : $x - 7 = 6$. Donc $x = 13$.\n⭐ Je vérifie : A donne $13 \\times 4 - 7 = 45$ et B donne $(13 + 2) \\times 3 = 45$. ✓\n⛔ Le piège au b) : écrire $x + 2 \\times 3$ pour le programme B. Sans parenthèses, on ne multiplierait que le $2$.\nRéponse : en partant de $13$, les deux programmes donnent $45$.",
          schema: balance([
            { g: "4x - 7", d: "3(x + 2)" },
            { g: "4x - 7", d: "3x + 6", op: "je développe" },
            { g: "x - 7", d: "6", op: "−3x" },
            { g: "x", d: "13", op: "+7" },
          ]),
          micros: ["equation_probleme", "equation_resoudre_developper"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je nomme l'inconnue, j'écris l'équation, je résous, puis je réponds par une phrase.",
      rappel: [
        "METTRE EN ÉQUATION : je choisis l'inconnue et je l'écris (« soit $x$ le nombre d'heures »), je traduis l'énoncé par une égalité, puis je résous.",
        "Je VÉRIFIE dans l'énoncé, pas seulement dans l'équation, et je réponds par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Quel loueur de vélos ?",
          enonce:
            "Pour une balade à vélo, deux loueurs proposent :\n• loueur A : $3$ € par heure ;\n• loueur B : $6$ € de prise en charge, puis $1{,}50$ € par heure.\na) Calculer le prix de $2$ heures chez chacun.\nb) On note $x$ le nombre d'heures. Écrire le prix chez A et chez B en fonction de $x$.\nc) Pour quelle durée les deux prix sont-ils égaux ? Quel est alors ce prix ?\nd) Quel loueur choisir pour une journée de $6$ heures ?",
          correction:
            "a) A : $3 \\times 2 = 6$ €. B : $6 + 1{,}5 \\times 2 = 9$ €. Pour $2$ heures, A est moins cher.\nb) Chez A, le prix est $3x$. Chez B, il est $6 + 1{,}5x$.\nc) Je cherche $x$ tel que $3x = 6 + 1{,}5x$. Je retire $1{,}5x$ des deux côtés : $1{,}5x = 6$. Je divise par $1{,}5$ : $x = 4$.\nPour $4$ heures, A coûte $3 \\times 4 = 12$ € et B coûte $6 + 1{,}5 \\times 4 = 12$ €. ✓\nd) A : $3 \\times 6 = 18$ €. B : $6 + 1{,}5 \\times 6 = 15$ €. Pour $6$ heures, B est moins cher.\n⭐ Le dessin : la droite bleue (A) et la droite orange (B) se croisent au point $(4\\,;\\,12)$. Avant $4$ heures, la bleue est en dessous : A est moins cher ; après, c'est B.\n⛔ Le piège : conclure du a) que A est toujours moins cher. Le prix fixe de B pèse de moins en moins quand la durée grandit.\nRéponse : les prix sont égaux pour $4$ heures ($12$ €) ; pour $6$ heures, je choisis le loueur B ($15$ € contre $18$ €).",
          schema: repere([-1, 8, -2, 20], [{ q: [0, 3, 0] }, { q: [0, 1.5, 6], couleur: ORANGE }], [{ x: 4, y: 12, label: "4 ; 12" }]),
          micros: ["equation_probleme"],
        },
        {
          titre: "Le triathlon olympique",
          enonce:
            "Un triathlon enchaîne natation, vélo et course à pied, pour $51{,}5$ km au total. Le parcours à vélo fait $30$ km de plus que la course à pied, et la natation $8{,}5$ km de moins que la course à pied.\na) On note $x$ la longueur de la course à pied, en km. Exprimer les deux autres parcours en fonction de $x$.\nb) Écrire une équation, puis la résoudre.\nc) Donner la longueur de chaque parcours.",
          correction:
            "a) Vélo : $x + 30$. Natation : $x - 8{,}5$.\nb) La somme des trois parcours vaut $51{,}5$ km : $x + (x + 30) + (x - 8{,}5) = 51{,}5$.\nJe réduis : $3x + 21{,}5 = 51{,}5$. Je retire $21{,}5$ : $3x = 30$. Donc $x = 10$.\nc) Course à pied : $10$ km. Vélo : $10 + 30 = 40$ km. Natation : $10 - 8{,}5 = 1{,}5$ km.\n⭐ Je vérifie dans l'énoncé : $10 + 40 + 1{,}5 = 51{,}5$. ✓ Ce sont bien les distances d'un triathlon olympique.\n⛔ Le piège : écrire $x + 30 - 8{,}5 = 51{,}5$, en oubliant que chaque parcours contient un $x$. Il y a TROIS $x$, un par parcours.\nRéponse : $1{,}5$ km de natation, $40$ km de vélo et $10$ km de course à pied.",
          schema: balance([
            { g: "3x + 21.5", d: "51.5" },
            { g: "3x", d: "30", op: "−21.5" },
            { g: "x", d: "10", op: "÷3" },
          ]),
          micros: ["equation_probleme"],
        },
        {
          titre: "La chandelle",
          enonce:
            "Un footballeur frappe le ballon vers le haut. $t$ secondes après la frappe, le ballon est à la hauteur $h = 5t(4 - t)$, en mètres.\na) À quelle hauteur est le ballon au bout de $1$ seconde ?\nb) Au bout de combien de temps retombe-t-il au sol ?\nc) Vérifier que $5t(4 - t) - 15 = -5(t - 1)(t - 3)$.\nd) En déduire à quels instants le ballon est à $15$ m de haut.",
          correction:
            "a) Je remplace $t$ par $1$ : $h = 5 \\times 1 \\times (4 - 1) = 15$ m.\nb) Au sol, la hauteur est nulle : $5t(4 - t) = 0$. C'est un produit nul : $5t = 0$ ou $4 - t = 0$, soit $t = 0$ ou $t = 4$. À $t = 0$, c'est la frappe ; le ballon retombe au bout de $4$ secondes.\nc) Je développe chaque côté. À gauche : $5t(4 - t) - 15 = 20t - 5t^2 - 15$. À droite : $-5(t - 1)(t - 3) = -5(t^2 - 4t + 3) = -5t^2 + 20t - 15$. Les deux sont égaux. ✓\nd) Je cherche $5t(4 - t) = 15$, soit $5t(4 - t) - 15 = 0$, c'est-à-dire $-5(t - 1)(t - 3) = 0$. Produit nul : $t = 1$ ou $t = 3$.\n⭐ Le dessin : la courbe monte, redescend, et coupe la droite $h = 15$ deux fois, une fois à la montée, une fois à la descente.\n⛔ Le piège au b) : répondre $t = 0$. Cette solution existe, mais elle décrit la frappe, pas le retour au sol : je relis la question.\nRéponse : $15$ m au bout d'$1$ s ; retour au sol au bout de $4$ s ; à $15$ m de haut à $t = 1$ s et à $t = 3$ s.",
          schema: repere([-1, 5, -2, 22], [{ q: [-5, 20, 0] }], [{ x: 4, y: 0, label: "4" }, { x: 1, y: 15, label: "1 ; 15" }, { x: 3, y: 15, label: "3 ; 15" }], 15),
          micros: ["equation_produit_nul", "equation_probleme", "equation_defi"],
        },
        {
          titre: "L'échappée",
          enonce:
            "Dans une étape du Tour de France, un coureur échappé roule à $45$ km/h. Le peloton passe au même panneau $6$ minutes plus tard et roule à $54$ km/h. L'arrivée est à $25$ km de ce panneau.\na) Quelle avance, en km, l'échappé a-t-il quand le peloton passe au panneau ?\nb) On note $t$ le temps, en heures, depuis le passage du peloton. Exprimer la distance au panneau du peloton, puis celle de l'échappé.\nc) Au bout de combien de minutes le peloton rattrape-t-il l'échappé ? À quelle distance du panneau ?\nd) L'échappé gagne-t-il l'étape ?",
          correction:
            "a) $6$ min, c'est $\\dfrac{6}{60} = 0{,}1$ h. En $0{,}1$ h à $45$ km/h, l'échappé parcourt $45 \\times 0{,}1 = 4{,}5$ km.\nb) Distance = vitesse × temps. Le peloton est à $54t$ km du panneau ; l'échappé, parti avec $4{,}5$ km d'avance, est à $4{,}5 + 45t$ km.\nc) Le peloton rattrape l'échappé quand ils sont au même endroit : $54t = 4{,}5 + 45t$. Je retire $45t$ : $9t = 4{,}5$. Donc $t = 0{,}5$ h, soit $30$ min.\nÀ ce moment, le peloton est à $54 \\times 0{,}5 = 27$ km du panneau.\n⭐ Le tableau le confirme : toutes les $10$ minutes, le peloton reprend $1{,}5$ km, et l'écart de $4{,}5$ km est comblé en $30$ minutes.\nd) Le rattrapage aurait lieu à $27$ km, mais l'arrivée est à $25$ km : l'échappé franchit la ligne avant d'être repris. Il gagne.\n⛔ Le piège : écrire $54t = 45t$, en oubliant l'avance. Cette équation a pour seule solution $t = 0$ : elle dit que le peloton rattrape l'échappé au panneau, ce qui est faux.\nRéponse : le peloton le rattraperait au bout de $30$ minutes, à $27$ km du panneau ; l'arrivée étant à $25$ km, l'échappé gagne l'étape.",
          schema: tableauProba(
            ["t (min)", "0", "10", "20", "30"],
            [
              ["peloton (km)", "0", "9", "18", "27"],
              ["échappé (km)", "4,5", "12", "19,5", "27"],
            ],
          ),
          micros: ["equation_probleme", "equation_verifier"],
        },
      ],
    },
  ],
};
