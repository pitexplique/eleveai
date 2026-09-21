// ─── Fiche d'exercices : la racine carrée (seconde) — 20 exercices corrigés ────
//
// Deuxième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/racine-carree.bank.ts`
// (notionId racine_carree_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-racines.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni √8, √18, √32, √72, √200,
// ni √75 − √48, ni √50 + √8, ni les triangles 3-4-5, 6-8-10, 5-12-13.
//
// ⭐ LE FIL, LE MÊME QUE LA FICHE (Frédéric, 08/09/2026) : le PRODUIT passe sous
// la racine, la SOMME ne passe pas. √2 + √3 reste tel quel ; √2 + 3√2 = 4√2,
// parce que le radical se comporte comme une lettre. Et on SIMPLIFIE avant
// d'additionner — c'est la question 2.3 du contrôle commun.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-racines.mjs` — chaque
// simplification est refaite par une recherche du plus grand carré, chaque
// expression est évaluée en décimal et comparée à la forme a√b du corrigé.
//
// Micro-compétences : racine_calcul (1, 5, 20), racine_domaine (2, 16),
// racine_carre_de_a2 (3, 14), racine_produit (4, 5, 12, 13, 15, 18, 20),
// racine_simplification (6, 7, 9, 10, 11, 17, 19), racine_somme (8, 9, 10, 11,
// 15, 18). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (√, pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

// La courbe de la fonction racine carrée, la même que dans la fiche de cours :
// le canvas ne connaît pas la racine, on lui donne les points calculés.
// ⛔ CADRE DE 215, HUIT UNITÉS PAR AXE AU PLUS — la règle de la fiche de cours,
// MESURÉE À NOUVEAU le 21/09 : dans une correction à 375 px, le dessin fait
// 201 px ; un cadre de 300 rendait les nombres des axes à 8 px. À 215 : 11,2 px.
// D'où le point (2,25 ; 1,5) : (6,25 ; 2,5) voulait un axe jusqu'à 8.
function courbeRacine() {
  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= 7; x += 0.25) points.push({ x, y: Math.sqrt(x) });
  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <CanvasRenderer
        figure={{
          kind: "fonctionGraphique",
          size: { width: 215, height: 150 },
          xmin: -1,
          xmax: 7,
          ymin: -1,
          ymax: 3,
          grille: true,
          courbes: [{ id: "r", type: "points", couleur: "#2563eb", points }],
          misesEnEvidence: [
            { point: { x: 1, y: 1, label: "1", couleur: "#dc2626" } },
            { point: { x: 2.25, y: 1.5, label: "1,5", couleur: "#dc2626" } },
          ],
        }}
      />
    </div>
  );
}

export const exercicesRacinesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "racine-carree-2de",
  titre: "La racine carrée",
  accroche:
    "Vingt exercices, du calcul seul au problème : calculer, simplifier, additionner des racines comme au contrôle, puis mesurer une diagonale ou une feuille A4. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/seconde/racine-carree-2de", titre: "La racine carrée" }],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On vérifie toujours en élevant au carré.",
      rappel: [
        "$\\sqrt{a}$ est le nombre POSITIF dont le carré vaut $a$. Il n'existe que si $a \\geqslant 0$. Et $\\sqrt{x^2} = |x|$ : une racine n'est jamais négative.",
        "PRODUIT : $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$. SOMME : aucune règle, $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$.",
        "SIMPLIFIER : on sort un carré parfait de la racine. $\\sqrt{63} = \\sqrt{9 \\times 7} = 3\\sqrt{7}$.",
      ],
      exercices: [
        {
          enonce: "Calculer sans calculatrice.\na) $\\sqrt{81}$\nb) $\\sqrt{0{,}09}$\nc) $\\sqrt{\\dfrac{4}{9}}$\nd) $\\sqrt{0}$",
          correction:
            "On cherche le nombre POSITIF dont le carré vaut le nombre sous la racine.\na) $9^2 = 81$, donc $\\sqrt{81} = 9$.\nb) $0{,}3^2 = 0{,}09$, donc $\\sqrt{0{,}09} = 0{,}3$.\nc) $\\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{4}{9}$, donc $\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3}$.\nd) $0^2 = 0$, donc $\\sqrt{0} = 0$.\n⛔ Le piège au b) : répondre $0{,}03$. On vérifie en élevant au carré : $0{,}03^2 = 0{,}0009$, pas $0{,}09$.",
          micros: ["racine_calcul"],
        },
        {
          enonce: "Parmi ces écritures, lesquelles désignent un nombre ? Donner alors sa valeur.\na) $\\sqrt{-16}$\nb) $-\\sqrt{16}$\nc) $\\sqrt{3 - 5}$\nd) $\\sqrt{5 - 3}$",
          correction:
            "Une racine carrée n'existe que pour un nombre positif ou nul, parce qu'aucun carré n'est négatif.\na) $-16$ est négatif : $\\sqrt{-16}$ n'existe pas.\nb) On calcule d'abord $\\sqrt{16} = 4$, puis on prend l'opposé : $-\\sqrt{16} = -4$. Ce nombre existe.\nc) $3 - 5 = -2$, et $\\sqrt{-2}$ n'existe pas.\nd) $5 - 3 = 2$, donc $\\sqrt{5 - 3} = \\sqrt{2} \\approx 1{,}41$.\n⛔ Le piège : confondre le a) et le b). Le signe moins SOUS la racine interdit le calcul. Le signe moins DEVANT la racine s'applique au résultat.",
          micros: ["racine_domaine"],
        },
        {
          enonce: "Calculer.\na) $\\sqrt{(-6)^2}$\nb) $\\sqrt{3^2}$\nc) $\\sqrt{(-0{,}5)^2}$\nd) $\\sqrt{x^2}$ pour $x = -10$",
          correction:
            "On calcule d'abord le carré, qui est toujours positif, puis sa racine.\na) $(-6)^2 = 36$, donc $\\sqrt{(-6)^2} = \\sqrt{36} = 6$.\nb) $\\sqrt{3^2} = \\sqrt{9} = 3$.\nc) $(-0{,}5)^2 = 0{,}25$, donc $\\sqrt{(-0{,}5)^2} = 0{,}5$.\nd) $x^2 = (-10)^2 = 100$, donc $\\sqrt{x^2} = 10$.\n⭐ La règle : $\\sqrt{x^2} = |x|$. La racine rend toujours un nombre positif, elle efface le signe.\n⛔ Le piège : $\\sqrt{(-6)^2} = -6$. Une racine carrée n'est jamais négative.",
          micros: ["racine_carre_de_a2"],
        },
        {
          enonce: "Calculer sans calculatrice.\na) $\\sqrt{2} \\times \\sqrt{8}$\nb) $\\sqrt{3} \\times \\sqrt{27}$\nc) $\\sqrt{25 \\times 36}$",
          correction:
            "La racine d'un produit est le produit des racines : $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$.\na) $\\sqrt{2} \\times \\sqrt{8} = \\sqrt{2 \\times 8} = \\sqrt{16} = 4$.\nb) $\\sqrt{3} \\times \\sqrt{27} = \\sqrt{3 \\times 27} = \\sqrt{81} = 9$.\nc) $\\sqrt{25 \\times 36} = \\sqrt{25} \\times \\sqrt{36} = 5 \\times 6 = 30$.\n⭐ Au a) et au b), chaque racine seule n'est pas un nombre entier, mais leur produit, si. C'est pour cela qu'on regroupe sous une seule racine.",
          micros: ["racine_produit"],
        },
        {
          enonce: "Calculer.\na) $\\left(\\sqrt{7}\\right)^2$\nb) $\\sqrt{5} \\times \\sqrt{5}$\nc) $\\left(3\\sqrt{2}\\right)^2$",
          correction:
            "a) $\\sqrt{7}$ est le nombre dont le carré vaut $7$. Donc $\\left(\\sqrt{7}\\right)^2 = 7$.\nb) C'est la même chose : $\\sqrt{5} \\times \\sqrt{5} = \\left(\\sqrt{5}\\right)^2 = 5$.\nc) On élève les deux facteurs au carré : $\\left(3\\sqrt{2}\\right)^2 = 3^2 \\times \\left(\\sqrt{2}\\right)^2 = 9 \\times 2 = 18$.\n⛔ Le piège au c) : répondre $3 \\times 2 = 6$. Le $3$ aussi est au carré.",
          micros: ["racine_calcul", "racine_produit"],
        },
        {
          enonce: "Simplifier.\na) $\\sqrt{12}$\nb) $\\sqrt{45}$\nc) $\\sqrt{98}$",
          correction:
            "On cherche un carré parfait ($4$, $9$, $16$, $25$, $36$, $49$…) qui divise le nombre, puis on le sort de la racine.\na) $12 = 4 \\times 3$, donc $\\sqrt{12} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$.\nb) $45 = 9 \\times 5$, donc $\\sqrt{45} = \\sqrt{9} \\times \\sqrt{5} = 3\\sqrt{5}$.\nc) $98 = 49 \\times 2$, donc $\\sqrt{98} = \\sqrt{49} \\times \\sqrt{2} = 7\\sqrt{2}$.\n⛔ Le piège : sortir le nombre sans prendre sa racine, $\\sqrt{12} = 4\\sqrt{3}$. On sort $\\sqrt{4} = 2$, pas $4$.",
          micros: ["racine_simplification"],
        },
        {
          enonce: "a) Un élève écrit $\\sqrt{80} = 2\\sqrt{20}$. Est-ce juste ? Est-ce fini ?\nb) Simplifier $\\sqrt{300}$.",
          correction:
            "a) C'est juste : $80 = 4 \\times 20$, donc $\\sqrt{80} = 2\\sqrt{20}$. Mais ce n'est pas fini : $20 = 4 \\times 5$ contient encore un carré.\n$2\\sqrt{20} = 2 \\times 2\\sqrt{5} = 4\\sqrt{5}$.\nPlus rapide : on prend le PLUS GRAND carré. $80 = 16 \\times 5$, donc $\\sqrt{80} = 4\\sqrt{5}$ en une seule étape.\nb) $300 = 100 \\times 3$, donc $\\sqrt{300} = 10\\sqrt{3}$.\n⭐ On s'arrête quand le nombre sous la racine ne contient plus aucun carré parfait.",
          micros: ["racine_simplification"],
        },
        {
          enonce: "Calculer quand c'est possible.\na) $2\\sqrt{3} + 5\\sqrt{3}$\nb) $7\\sqrt{5} - \\sqrt{5}$\nc) $\\sqrt{2} + \\sqrt{7}$\nd) $\\sqrt{9} + \\sqrt{16}$, puis comparer avec $\\sqrt{9 + 16}$",
          correction:
            "On additionne des racines seulement si le radical est le MÊME, comme on additionne $2x + 5x$.\na) $2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}$.\nb) $\\sqrt{5}$ tout seul, c'est $1\\sqrt{5}$ : $7\\sqrt{5} - 1\\sqrt{5} = 6\\sqrt{5}$.\nc) Les radicaux sont différents : $\\sqrt{2} + \\sqrt{7}$ reste tel quel.\nd) $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$. Mais $\\sqrt{9 + 16} = \\sqrt{25} = 5$.\n⛔ Le piège : écrire $\\sqrt{2} + \\sqrt{7} = \\sqrt{9}$. Le d) prouve que c'est faux : la racine d'une somme n'est pas la somme des racines.",
          micros: ["racine_somme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. On simplifie d'abord, on regroupe ensuite.",
      rappel: [
        "SIMPLIFIER D'ABORD : chaque racine s'écrit $a\\sqrt{b}$, avec $b$ le plus petit possible. Ensuite seulement, on regroupe les radicaux identiques.",
        "Le radical se comporte comme une lettre : $3\\sqrt{2} + 5\\sqrt{2} = 8\\sqrt{2}$, comme $3x + 5x = 8x$. Et $\\sqrt{2}$ tout seul, c'est $1\\sqrt{2}$.",
        "$\\sqrt{a} \\times \\sqrt{a} = a$ : c'est ce qui fait disparaître une racine.",
      ],
      exercices: [
        {
          enonce: "Écrire $A = \\sqrt{45} + \\sqrt{20}$ sous la forme $a\\sqrt{5}$.",
          correction:
            "On simplifie chaque racine, puis on additionne.\n$\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$.\n$\\sqrt{20} = \\sqrt{4 \\times 5} = 2\\sqrt{5}$.\n$A = 3\\sqrt{5} + 2\\sqrt{5} = 5\\sqrt{5}$.\n⛔ Le piège : $\\sqrt{45} + \\sqrt{20} = \\sqrt{65}$. On n'additionne jamais sous la racine.",
          schema: tableau("A, étape par étape", ["devient", "parce que"], [
            { label: "√45", values: ["3√5", "45 = 9 × 5"] },
            { label: "√20", values: ["2√5", "20 = 4 × 5"] },
            { label: "A", values: ["5√5", "3 + 2 = 5"] },
          ]),
          micros: ["racine_simplification", "racine_somme"],
        },
        {
          enonce: "Écrire $B = \\sqrt{27} - \\sqrt{12} + \\sqrt{3}$ sous la forme $a\\sqrt{3}$.",
          correction:
            "$\\sqrt{27} = \\sqrt{9 \\times 3} = 3\\sqrt{3}$.\n$\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$.\n$\\sqrt{3}$ est déjà simplifié : c'est $1\\sqrt{3}$.\n$B = 3\\sqrt{3} - 2\\sqrt{3} + 1\\sqrt{3} = (3 - 2 + 1)\\sqrt{3} = 2\\sqrt{3}$.\n⛔ Le piège : compter $\\sqrt{3}$ pour zéro. Tout seul, $\\sqrt{3}$ vaut $1\\sqrt{3}$, comme $x$ vaut $1x$.",
          micros: ["racine_simplification", "racine_somme"],
        },
        {
          enonce: "Écrire $C = 2\\sqrt{50} - 3\\sqrt{18} + \\sqrt{32}$ sous la forme $a\\sqrt{2}$.",
          correction:
            "On simplifie chaque racine, en gardant le nombre qui est devant.\n$2\\sqrt{50} = 2 \\times 5\\sqrt{2} = 10\\sqrt{2}$.\n$3\\sqrt{18} = 3 \\times 3\\sqrt{2} = 9\\sqrt{2}$.\n$\\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$.\n$C = 10\\sqrt{2} - 9\\sqrt{2} + 4\\sqrt{2} = (10 - 9 + 4)\\sqrt{2} = 5\\sqrt{2}$.\n⛔ Le piège : oublier le nombre de départ. $2\\sqrt{50}$ ne vaut pas $5\\sqrt{2}$, mais deux fois $5\\sqrt{2}$.",
          schema: tableau("C, étape par étape", ["devient", "parce que"], [
            { label: "2√50", values: ["10√2", "√50 = 5√2"] },
            { label: "3√18", values: ["9√2", "√18 = 3√2"] },
            { label: "√32", values: ["4√2", "32 = 16 × 2"] },
            { label: "C", values: ["5√2", "10 − 9 + 4 = 5"] },
          ]),
          micros: ["racine_simplification", "racine_somme"],
        },
        {
          enonce: "Développer et réduire $D = \\sqrt{3}\\left(\\sqrt{12} - 2\\right)$.",
          correction:
            "On distribue $\\sqrt{3}$ sur les deux termes : $D = \\sqrt{3} \\times \\sqrt{12} - 2\\sqrt{3}$.\nLe premier produit : $\\sqrt{3} \\times \\sqrt{12} = \\sqrt{36} = 6$.\nDonc $D = 6 - 2\\sqrt{3}$.\n⛔ Le piège : aller plus loin et écrire $4\\sqrt{3}$. On ne peut pas soustraire un nombre et une racine : $6 - 2\\sqrt{3}$ est la réponse.",
          micros: ["racine_produit"],
        },
        {
          enonce: "Développer et réduire $E = \\left(\\sqrt{5} + 1\\right)\\left(\\sqrt{5} - 1\\right)$.",
          correction:
            "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.\n$E = \\sqrt{5} \\times \\sqrt{5} - \\sqrt{5} + \\sqrt{5} - 1$.\n$\\sqrt{5} \\times \\sqrt{5} = 5$, et $-\\sqrt{5} + \\sqrt{5} = 0$.\nDonc $E = 5 - 1 = 4$.\n⭐ Les racines ont disparu : le résultat est un entier. On retrouvera ce calcul avec l'identité remarquable $(a + b)(a - b) = a^2 - b^2$.",
          micros: ["racine_produit"],
        },
        {
          enonce: "On sait que $\\sqrt{5} \\approx 2{,}24$.\na) Quel est le signe de $2 - \\sqrt{5}$ ? Et celui de $3 - \\sqrt{5}$ ?\nb) En déduire $\\sqrt{\\left(2 - \\sqrt{5}\\right)^2}$ et $\\sqrt{\\left(3 - \\sqrt{5}\\right)^2}$, écrits sans racine du carré.",
          correction:
            "a) $2 - \\sqrt{5} \\approx 2 - 2{,}24 = -0{,}24$ : il est négatif. $3 - \\sqrt{5} \\approx 3 - 2{,}24 = 0{,}76$ : il est positif.\nb) On utilise $\\sqrt{x^2} = |x|$ : la racine du carré rend le nombre sans son signe.\n$2 - \\sqrt{5}$ est négatif, donc on prend son opposé : $\\sqrt{\\left(2 - \\sqrt{5}\\right)^2} = \\sqrt{5} - 2$.\n$3 - \\sqrt{5}$ est positif, donc il reste tel quel : $\\sqrt{\\left(3 - \\sqrt{5}\\right)^2} = 3 - \\sqrt{5}$.\n⛔ Le piège : répondre $2 - \\sqrt{5}$. Ce nombre est négatif, et une racine carrée ne l'est jamais.",
          micros: ["racine_carre_de_a2"],
        },
        {
          enonce: "Vrai ou faux ? Justifier par un calcul ou un contre-exemple.\na) Pour tous $a \\geqslant 0$ et $b \\geqslant 0$ : $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$.\nb) Pour tous $a \\geqslant 0$ et $b \\geqslant 0$ : $\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$.\nc) $\\sqrt{2} + \\sqrt{2} = \\sqrt{4}$\nd) $\\sqrt{2} + \\sqrt{2} = \\sqrt{8}$",
          correction:
            "a) FAUX. Un seul contre-exemple suffit : avec $a = 9$ et $b = 16$, $\\sqrt{9 + 16} = \\sqrt{25} = 5$, mais $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$.\nb) VRAI. C'est la règle du produit, vraie pour tous les nombres positifs.\nc) FAUX. $\\sqrt{2} + \\sqrt{2} = 2\\sqrt{2} \\approx 2{,}83$, alors que $\\sqrt{4} = 2$.\nd) VRAI. $\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$, et $\\sqrt{2} + \\sqrt{2} = 2\\sqrt{2}$ aussi.\n⭐ Le c) et le d) se ressemblent. Pour trancher, on simplifie les deux côtés et on compare.",
          micros: ["racine_somme", "racine_produit"],
        },
        {
          enonce: "On étudie la fonction racine carrée, $f(x) = \\sqrt{x}$.\na) Calculer l'image de $1$, puis celle de $2{,}25$.\nb) Quel nombre a pour image $3$ ?\nc) Quelle est l'image de $-2$ ?\nd) Ranger $0{,}5$ ; $0{,}5^2$ et $\\sqrt{0{,}5}$ du plus petit au plus grand.",
          correction:
            "a) $f(1) = \\sqrt{1} = 1$. Et $f(2{,}25) = \\sqrt{2{,}25} = 1{,}5$, car $1{,}5^2 = 2{,}25$.\nb) On cherche $x$ tel que $\\sqrt{x} = 3$. C'est $x = 3^2 = 9$.\nc) $-2$ n'a pas d'image : la courbe n'existe pas à gauche de zéro. Le domaine de $f$ est $[0\\,;\\,+\\infty[$.\nd) $0{,}5^2 = 0{,}25$ et $\\sqrt{0{,}5} \\approx 0{,}71$. Donc $0{,}5^2 < 0{,}5 < \\sqrt{0{,}5}$.\n⛔ Le piège au d) : croire que la racine rend toujours plus petit. Entre $0$ et $1$, c'est le contraire : la racine rend plus GRAND.",
          schema: courbeRacine(),
          micros: ["racine_domaine"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. On donne la valeur exacte, puis une valeur approchée, et on conclut par une phrase.",
      rappel: [
        "PYTHAGORE : dans un triangle rectangle, le carré de l'hypoténuse est la somme des carrés des deux autres côtés. On additionne les CARRÉS, puis on prend la racine.",
        "Une longueur EXACTE s'écrit simplifiée, comme $10\\sqrt{5}$. Une valeur approchée s'écrit avec $\\approx$ et un arrondi.",
      ],
      exercices: [
        {
          titre: "Traverser en diagonale",
          enonce: "Un terrain rectangulaire mesure $20$ m sur $10$ m.\na) Calculer la longueur exacte de sa diagonale, sous la forme $a\\sqrt{5}$.\nb) En donner une valeur arrondie au centimètre.\nc) Combien de mètres gagne-t-on en traversant en diagonale, plutôt qu'en longeant deux côtés ?",
          correction:
            "a) La diagonale est l'hypoténuse d'un triangle rectangle. Par le théorème de Pythagore : $d^2 = 20^2 + 10^2 = 400 + 100 = 500$.\nDonc $d = \\sqrt{500} = \\sqrt{100 \\times 5} = 10\\sqrt{5}$ m.\nb) $10\\sqrt{5} \\approx 22{,}36$ m.\nc) En longeant deux côtés, on fait $20 + 10 = 30$ m. On gagne $30 - 22{,}36 = 7{,}64$ m.\n⛔ Le piège : $\\sqrt{20^2 + 10^2} = 20 + 10 = 30$. La racine d'une somme n'est pas la somme des racines — et c'est justement ce qu'on gagne.",
          micros: ["racine_simplification"],
        },
        {
          titre: "Un triangle rectangle ?",
          enonce: "Dans un triangle $ABC$ : $AB = 2\\sqrt{3}$ cm, $BC = 3\\sqrt{3}$ cm et $AC = \\sqrt{39}$ cm.\na) Calculer $AB^2$, $BC^2$ et $AC^2$.\nb) Le triangle est-il rectangle ? Si oui, en quel sommet ?\nc) Calculer son périmètre exact. Peut-on le simplifier ?\nd) Calculer son aire.",
          correction:
            "a) $AB^2 = \\left(2\\sqrt{3}\\right)^2 = 4 \\times 3 = 12$. $BC^2 = \\left(3\\sqrt{3}\\right)^2 = 9 \\times 3 = 27$. $AC^2 = 39$.\nb) $AB^2 + BC^2 = 12 + 27 = 39 = AC^2$. D'après la réciproque du théorème de Pythagore, le triangle est rectangle en $B$, le sommet opposé au plus grand côté.\nc) $2\\sqrt{3} + 3\\sqrt{3} + \\sqrt{39} = 5\\sqrt{3} + \\sqrt{39}$ cm. On ne peut pas aller plus loin : $39 = 3 \\times 13$ ne contient aucun carré parfait, et les radicaux sont différents.\nd) Les côtés de l'angle droit sont $AB$ et $BC$. L'aire vaut $\\dfrac{AB \\times BC}{2} = \\dfrac{2\\sqrt{3} \\times 3\\sqrt{3}}{2} = \\dfrac{6 \\times 3}{2} = 9$ cm².\n⭐ Des longueurs avec des racines, et une aire entière : $\\sqrt{3} \\times \\sqrt{3} = 3$.",
          micros: ["racine_produit", "racine_somme"],
        },
        {
          titre: "Le carré construit sur la diagonale",
          enonce: "Un carré a une aire de $28$ cm².\na) Calculer la longueur exacte de son côté, sous forme simplifiée.\nb) Calculer la longueur exacte de sa diagonale.\nc) On construit un second carré sur cette diagonale. Quelle est son aire ?",
          correction:
            "a) Le côté $c$ vérifie $c^2 = 28$. Donc $c = \\sqrt{28} = \\sqrt{4 \\times 7} = 2\\sqrt{7}$ cm.\nb) Par Pythagore, la diagonale $d$ vérifie $d^2 = c^2 + c^2 = 28 + 28 = 56$.\nDonc $d = \\sqrt{56} = \\sqrt{4 \\times 14} = 2\\sqrt{14}$ cm.\nc) L'aire du second carré est $d^2 = 56$ cm² : exactement le double du premier.\n⭐ C'est vrai pour tous les carrés : $d^2 = c^2 + c^2 = 2c^2$. Le carré construit sur la diagonale a toujours une aire double.\n⛔ Le piège au b) : $d = 2\\sqrt{7} + 2\\sqrt{7} = 4\\sqrt{7}$. Pythagore additionne les CARRÉS des côtés, pas les côtés.",
          micros: ["racine_simplification"],
        },
        {
          titre: "Le secret de la feuille A4",
          enonce: "Une feuille A4 mesure $21$ cm sur $29{,}7$ cm.\na) Calculer $\\dfrac{29{,}7}{21}$, arrondi au millième. Comparer avec $\\sqrt{2}$.\nb) On coupe une feuille de côtés $1$ et $\\sqrt{2}$ en deux, au milieu de son grand côté. Quels sont les côtés de chaque moitié ?\nc) Montrer que, pour une moitié, le grand côté divisé par le petit vaut encore $\\sqrt{2}$.\nd) Sur une photocopieuse, le bouton « A4 vers A3 » règle le zoom sur $141\\,\\%$. Pourquoi ce nombre ?",
          correction:
            "a) $\\dfrac{29{,}7}{21} \\approx 1{,}414$. Et $\\sqrt{2} \\approx 1{,}414$ aussi : c'est $\\sqrt{2}$ au millième près.\nb) Le grand côté $\\sqrt{2}$ est coupé en deux. Chaque moitié mesure $1$ sur $\\dfrac{\\sqrt{2}}{2}$.\nc) Le grand côté est maintenant $1$, le petit $\\dfrac{\\sqrt{2}}{2}$. On calcule $1 \\div \\dfrac{\\sqrt{2}}{2} = \\dfrac{2}{\\sqrt{2}}$.\nOr $2 = \\sqrt{2} \\times \\sqrt{2}$, donc $\\dfrac{2}{\\sqrt{2}} = \\dfrac{\\sqrt{2} \\times \\sqrt{2}}{\\sqrt{2}} = \\sqrt{2}$.\nd) Une A3, c'est deux A4 côte à côte, et elle a la même forme. On passe donc de l'une à l'autre en multipliant chaque côté par $\\sqrt{2} \\approx 1{,}41$ : c'est le zoom de $141\\,\\%$.\n⭐ C'est la seule forme de feuille qui garde la même forme quand on la coupe en deux.",
          micros: ["racine_calcul", "racine_produit"],
        },
      ],
    },
  ],
};
